import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { PROJECTS } from "../data/portfolioData";
import {
  buildWebEdges,
  computeFocusCameraForNode,
  computeProjectNodePosition,
  interpolateCameraState,
  SECTION_WAYPOINTS,
  type ProjectCategory,
} from "../three/portfolioGraph";
import {
  createBrushedMetalBumpTexture,
  createContactShadowTexture,
  createSacredFloorTexture,
} from "../three/proceduralTextures";
import {
  createOrbitalStage,
  createProjectNodeGroup,
  createSacredHubGroup,
  createWebFilaments,
  type ProjectNodeHandle,
} from "../three/hubModels";

export interface PortfolioScene3DProps {
  activeFilter: ProjectCategory;
  focusedProjectId: string | null;
  hoveredProjectId: string | null;
  cameraMode: "scroll" | "orbit";
  onSelectProject: (projectId: string | null) => void;
  onHoverProject: (projectId: string | null) => void;
  onActiveSectionChange?: (sectionId: string) => void;
}

const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _beadPoint = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement("canvas");
    const gl = probeCanvas.getContext("webgl2");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function PortfolioScene3D({
  activeFilter,
  focusedProjectId,
  hoveredProjectId,
  cameraMode,
  onSelectProject,
  onHoverProject,
  onActiveSectionChange,
}: PortfolioScene3DProps) {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [contextLost, setContextLost] = useState(false);

  // Store latest React props in refs so the mounted WebGL scene is never torn down
  const propsRef = useRef({
    activeFilter,
    focusedProjectId,
    hoveredProjectId,
    cameraMode,
    onSelectProject,
    onHoverProject,
    onActiveSectionChange,
  });
  propsRef.current = {
    activeFilter,
    focusedProjectId,
    hoveredProjectId,
    cameraMode,
    onSelectProject,
    onHoverProject,
    onActiveSectionChange,
  };

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);
    scene.fog = new THREE.FogExp2(0x07090e, 0.022);

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 140);
    camera.position.set(
      SECTION_WAYPOINTS[0].position.x,
      SECTION_WAYPOINTS[0].position.y,
      SECTION_WAYPOINTS[0].position.z
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // Studio PBR environment reflections (kept on every device)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Warm/cool 3-point architectural lighting rig
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.2);
    keyLight.position.set(7, 12, 8);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 36;
      keyLight.shadow.camera.left = -12;
      keyLight.shadow.camera.right = 12;
      keyLight.shadow.camera.top = 12;
      keyLight.shadow.camera.bottom = -12;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.15);
    rimLight.position.set(-8, 6, -9);
    scene.add(rimLight);

    const hubAccentLight = new THREE.PointLight(0xf59e0b, 2.4, 16, 1.6);
    hubAccentLight.position.set(0, 2.6, 0);
    scene.add(hubAccentLight);

    // Procedural textures & composite 3D world
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const floorTex = createSacredFloorTexture(maxAnisotropy);
    const shadowTex = createContactShadowTexture();
    const metalBump = createBrushedMetalBumpTexture(maxAnisotropy);

    const stage = createOrbitalStage(floorTex, metalBump);
    scene.add(stage.group);

    const hub = createSacredHubGroup(metalBump, shadowTex);
    scene.add(hub.group);

    const nodePositions = new Map<string, ReturnType<typeof computeProjectNodePosition>>();
    const nodeHandles = new Map<string, ProjectNodeHandle>();
    const raycastTargets: THREE.Object3D[] = [];

    PROJECTS.forEach((project) => {
      const pos = computeProjectNodePosition(
        project.orbitAngle,
        project.orbitRadius,
        project.elevation
      );
      nodePositions.set(project.id, pos);
      const handle = createProjectNodeGroup(project, pos, metalBump, shadowTex);
      scene.add(handle.group);
      nodeHandles.set(project.id, handle);
      raycastTargets.push(handle.hitMesh);
    });

    const edges = buildWebEdges(PROJECTS);
    const filaments = createWebFilaments(edges);
    scene.add(filaments.group);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.minPolarAngle = 0.25;
    controls.target.set(
      SECTION_WAYPOINTS[0].target.x,
      SECTION_WAYPOINTS[0].target.y,
      SECTION_WAYPOINTS[0].target.z
    );

    // Disable wheel zoom while in Scroll Sync so page scrolling never gets trapped
    controls.enableZoom = propsRef.current.cameraMode === "orbit";

    let userDraggingOrbit = false;
    const onControlsStart = () => {
      userDraggingOrbit = true;
    };
    const onControlsEnd = () => {
      userDraggingOrbit = false;
    };
    controls.addEventListener("start", onControlsStart);
    controls.addEventListener("end", onControlsEnd);

    // Pre-warm shaders on real GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycasting on Layer 1 proxy hit spheres
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointer = new THREE.Vector2();
    let lastRaycastTime = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;

    const updatePointer = (ev: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (ev: PointerEvent) => {
      pointerDownX = ev.clientX;
      pointerDownY = ev.clientY;
    };

    const onPointerMove = (ev: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycastTime < 50) return;
      lastRaycastTime = now;

      updatePointer(ev);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(raycastTargets, false);
      const hitId =
        hits.length > 0 ? String(hits[0].object.userData.projectId ?? "") : null;
      if (hitId !== propsRef.current.hoveredProjectId) {
        propsRef.current.onHoverProject(hitId || null);
      }
      renderer.domElement.style.cursor = hitId ? "pointer" : "grab";
    };

    const onPointerUp = (ev: PointerEvent) => {
      const moved = Math.hypot(ev.clientX - pointerDownX, ev.clientY - pointerDownY);
      if (moved > 6) return; // Ignore orbit drag releases

      updatePointer(ev);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(raycastTargets, false);
      if (hits.length > 0) {
        const hitId = String(hits[0].object.userData.projectId ?? "");
        if (hitId) {
          propsRef.current.onSelectProject(hitId);
        }
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    // WebGL context loss safety
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      onContextRestored
    );

    // Resize listener
    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Scroll progress tracker
    let lastReportedSection = "about";
    const getScrollProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      return Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    // Frame loop with Software-WebGL afterDraw pacing
    let disposed = false;
    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;

      const now = performance.now();
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const motionScale = prefersReducedMotion ? 0 : 1;
      elapsed += delta * motionScale;

      const {
        activeFilter: filter,
        focusedProjectId: focusId,
        hoveredProjectId: hoverId,
        cameraMode: mode,
        onActiveSectionChange: reportSection,
      } = propsRef.current;

      controls.enableZoom = mode === "orbit";

      // 1. Animate Sacred Hub gimbals and crystal
      hub.outerGimbal.rotation.y = elapsed * 0.22;
      hub.outerGimbal.rotation.x = Math.sin(elapsed * 0.35) * 0.28;
      hub.innerGimbal.rotation.z = -elapsed * 0.31;
      hub.innerGimbal.rotation.x = Math.cos(elapsed * 0.25) * 0.4;
      hub.harmonicRing.rotation.z = elapsed * 0.18;
      hub.coreLattice.rotation.y = -elapsed * 0.28;
      hub.coreCrystal.rotation.y = elapsed * 0.55;
      hub.coreCrystal.position.y = Math.sin(elapsed * 1.4) * 0.08 * motionScale;

      // 2. Animate Project Satellite totems & filter/focus emphasis
      PROJECTS.forEach((proj, idx) => {
        const handle = nodeHandles.get(proj.id);
        if (!handle) return;

        const matchesFilter = filter === "all" || proj.category === filter;
        const isFocused = focusId === proj.id;
        const isHovered = hoverId === proj.id;

        const targetScale = isFocused
          ? 1.24
          : isHovered
          ? 1.14
          : matchesFilter
          ? 1.0
          : 0.72;
        const nextScale = THREE.MathUtils.damp(
          handle.group.scale.x,
          targetScale,
          8,
          delta
        );
        handle.group.scale.setScalar(nextScale);

        const floatOffset =
          Math.sin(elapsed * 1.25 + idx * 1.3) * 0.12 * motionScale;
        handle.totemGroup.position.y = 0.05 + floatOffset;
        handle.totemGroup.rotation.y = elapsed * 0.36 + idx * 0.8;
        handle.collarRing.rotation.z = elapsed * 0.5;

        const targetEmissive = isFocused
          ? 1.15
          : isHovered
          ? 0.85
          : matchesFilter
          ? 0.42
          : 0.08;
        handle.beaconMat.emissiveIntensity = THREE.MathUtils.damp(
          handle.beaconMat.emissiveIntensity,
          targetEmissive,
          8,
          delta
        );
      });

      // 3. Animate Web Filament pulses & link highlights
      filaments.handles.forEach((fh) => {
        const t = (fh.pulseOffset + elapsed * fh.pulseSpeed) % 1;
        fh.curve.getPointAt(t, _beadPoint);
        fh.pulseBead.position.copy(_beadPoint);

        const activeId = focusId || hoverId;
        const connectedToActive =
          activeId !== null &&
          (fh.edge.fromId === activeId || fh.edge.toId === activeId);

        const targetOpacity = activeId
          ? connectedToActive
            ? 0.95
            : 0.16
          : fh.edge.kind === "hub-link"
          ? 0.78
          : 0.44;
        fh.material.opacity = THREE.MathUtils.damp(
          fh.material.opacity,
          targetOpacity,
          8,
          delta
        );
        fh.pulseBead.visible = !activeId || connectedToActive;
      });

      // 4. Camera Choreography (Focus Node OR Scroll-Linked Waypoints)
      const scrollProgress = getScrollProgress();
      const scrollCam = interpolateCameraState(scrollProgress, SECTION_WAYPOINTS);
      if (scrollCam.activeSectionId !== lastReportedSection) {
        lastReportedSection = scrollCam.activeSectionId;
        reportSection?.(scrollCam.activeSectionId);
      }

      if (focusId) {
        const focusPos = nodePositions.get(focusId);
        if (focusPos) {
          const framed = computeFocusCameraForNode(focusPos, 4.4);
          _targetCamPos.set(
            framed.position.x,
            framed.position.y,
            framed.position.z
          );
          _targetLookAt.set(
            framed.target.x,
            framed.target.y,
            framed.target.z
          );
          if (!userDraggingOrbit) {
            camera.position.x = THREE.MathUtils.damp(
              camera.position.x,
              _targetCamPos.x,
              5.5,
              delta
            );
            camera.position.y = THREE.MathUtils.damp(
              camera.position.y,
              _targetCamPos.y,
              5.5,
              delta
            );
            camera.position.z = THREE.MathUtils.damp(
              camera.position.z,
              _targetCamPos.z,
              5.5,
              delta
            );
            controls.target.x = THREE.MathUtils.damp(
              controls.target.x,
              _targetLookAt.x,
              6.5,
              delta
            );
            controls.target.y = THREE.MathUtils.damp(
              controls.target.y,
              _targetLookAt.y,
              6.5,
              delta
            );
            controls.target.z = THREE.MathUtils.damp(
              controls.target.z,
              _targetLookAt.z,
              6.5,
              delta
            );
          }
        }
      } else if (mode === "scroll" && !userDraggingOrbit) {
        _targetCamPos.set(
          scrollCam.position.x,
          scrollCam.position.y,
          scrollCam.position.z
        );
        _targetLookAt.set(
          scrollCam.target.x,
          scrollCam.target.y,
          scrollCam.target.z
        );
        camera.position.x = THREE.MathUtils.damp(
          camera.position.x,
          _targetCamPos.x,
          4.5,
          delta
        );
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          _targetCamPos.y,
          4.5,
          delta
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          _targetCamPos.z,
          4.5,
          delta
        );
        controls.target.x = THREE.MathUtils.damp(
          controls.target.x,
          _targetLookAt.x,
          5.5,
          delta
        );
        controls.target.y = THREE.MathUtils.damp(
          controls.target.y,
          _targetLookAt.y,
          5.5,
          delta
        );
        controls.target.z = THREE.MathUtils.damp(
          controls.target.z,
          _targetLookAt.z,
          5.5,
          delta
        );
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      window.removeEventListener("resize", onResize);
      controls.removeEventListener("start", onControlsStart);
      controls.removeEventListener("end", onControlsEnd);
      controls.dispose();

      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        onContextRestored
      );

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      floorTex.dispose();
      shadowTex.dispose();
      metalBump.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={canvasMountRef}
      data-testid="portfolio-3d-canvas"
      className="fixed inset-0 z-0 pointer-events-auto"
      aria-label="Interactive 3D sacred geometry and project web hub"
    >
      {contextLost && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#07090e] text-[#edf0f5] p-6">
          <div className="max-w-md border border-white/10 bg-[#111724] p-6 text-center rounded-xl">
            <h2 className="text-lg font-semibold mb-2">3D Viewport Paused</h2>
            <p className="text-sm text-slate-400">
              WebGL context was temporarily suspended by the browser. Reload or
              scroll to continue exploring JehkTech.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
