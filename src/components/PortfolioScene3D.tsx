import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { PROJECTS } from "../data/portfolioData";
import {
  buildWebEdges,
  computeFocusCameraForNode,
  computeProjectNodePosition,
  computeScrollSceneTransform,
  getSceneThemePalette,
  interpolateCameraState,
  SECTION_WAYPOINTS,
  type PortfolioTheme,
  type ProjectCategory,
} from "../three/portfolioGraph";
import { createBrushedMetalBumpTexture } from "../three/proceduralTextures";
import {
  createAtmosphericStarfield,
  createProjectNodeGroup,
  createSacredHubGroup,
  createWebFilaments,
  type ProjectNodeHandle,
} from "../three/hubModels";

export interface PortfolioScene3DProps {
  theme: PortfolioTheme;
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
const _focusWorldPos = new THREE.Vector3();

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
  theme,
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

  const propsRef = useRef({
    theme,
    activeFilter,
    focusedProjectId,
    hoveredProjectId,
    cameraMode,
    onSelectProject,
    onHoverProject,
    onActiveSectionChange,
  });
  propsRef.current = {
    theme,
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

    let appliedTheme: PortfolioTheme = propsRef.current.theme;
    let palette = getSceneThemePalette(appliedTheme);

    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(palette.background);
    scene.background = bgColor;
    const fog = new THREE.FogExp2(palette.fogColor, palette.fogDensity);
    scene.fog = fog;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 140);
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
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const hemiLight = new THREE.HemisphereLight(
      palette.hemiSky,
      palette.hemiGround,
      palette.hemiIntensity
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d6, palette.keyIntensity);
    keyLight.position.set(7, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8b9099, 0.95);
    rimLight.position.set(-8, -5, -9);
    scene.add(rimLight);

    const hubAccentLight = new THREE.PointLight(palette.goldWire, 1.8, 15, 1.6);
    hubAccentLight.position.set(0, 0.4, 0);
    scene.add(hubAccentLight);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const metalBump = createBrushedMetalBumpTexture(maxAnisotropy);

    const starfield = createAtmosphericStarfield(palette);
    scene.add(starfield.group);

    // Master Constellation Root rotated & glided synchronously with scroll
    const constellationRoot = new THREE.Group();
    scene.add(constellationRoot);

    const hub = createSacredHubGroup(metalBump, palette);
    constellationRoot.add(hub.group);

    const nodeHandles = new Map<string, ProjectNodeHandle>();
    const raycastTargets: THREE.Object3D[] = [];

    PROJECTS.forEach((project) => {
      const pos = computeProjectNodePosition(
        project.orbitAngle,
        project.orbitRadius,
        project.elevation
      );
      const handle = createProjectNodeGroup(project, pos, metalBump, palette);
      constellationRoot.add(handle.group);
      nodeHandles.set(project.id, handle);
      raycastTargets.push(handle.hitMesh);
    });

    const edges = buildWebEdges(PROJECTS);
    const filaments = createWebFilaments(edges, palette);
    constellationRoot.add(filaments.group);

    const applySceneTheme = (nextTheme: PortfolioTheme) => {
      palette = getSceneThemePalette(nextTheme);
      bgColor.setHex(palette.background);
      fog.color.setHex(palette.fogColor);
      fog.density = palette.fogDensity;

      hemiLight.color.setHex(palette.hemiSky);
      hemiLight.groundColor.setHex(palette.hemiGround);
      hemiLight.intensity = palette.hemiIntensity;
      keyLight.intensity = palette.keyIntensity;
      hubAccentLight.color.setHex(palette.goldWire);

      starfield.recolor(palette.starPrimary, palette.starAccent, palette.starOpacity);

      hub.outerWireMat.color.setHex(palette.goldWire);
      hub.outerWireMat.opacity = palette.outerIcoOpacity;
      hub.silverRingMat.color.setHex(palette.silverWire);
      hub.silverRingMat.opacity = palette.ringOpacityOuter;
      hub.goldRingMat.color.setHex(palette.goldWire);
      hub.goldRingMat.opacity = palette.ringOpacityInner;
      hub.markerMat.color.setHex(palette.goldWire);
      hub.markerMat.emissive.setHex(palette.goldWire);
      hub.innerLatticeMat.color.setHex(palette.silverWire);
      hub.coreCrystalMat.color.setHex(palette.kernelSurface);
      hub.coreCrystalMat.emissive.setHex(palette.goldWire);
      hub.coreEdgeMat.color.setHex(palette.goldWire);

      nodeHandles.forEach((handle) => {
        const accentColor = handle.isGoldAccent
          ? palette.goldWire
          : palette.silverWire;
        handle.obsidianMat.color.setHex(palette.kernelSurface);
        handle.wireMat.color.setHex(accentColor);
        handle.beaconMat.color.setHex(accentColor);
        handle.beaconMat.emissive.setHex(accentColor);
      });

      filaments.handles.forEach((fh) => {
        const lineColor =
          fh.edge.kind === "hub-link" ? palette.hubLink : palette.crossLink;
        const beadColor =
          fh.edge.kind === "hub-link" ? palette.beadHub : palette.beadCross;
        fh.material.color.setHex(lineColor);
        fh.beadMat.color.setHex(beadColor);
      });
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 2.8;
    controls.maxDistance = 15;
    controls.minPolarAngle = 0.15;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.target.set(
      SECTION_WAYPOINTS[0].target.x,
      SECTION_WAYPOINTS[0].target.y,
      SECTION_WAYPOINTS[0].target.z
    );
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

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointer = new THREE.Vector2();
    let parallaxX = 0;
    let parallaxY = 0;
    let lastRaycastTime = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;

    const onWindowMouseMove = (ev: MouseEvent) => {
      parallaxX = ev.clientX / Math.max(1, window.innerWidth) - 0.5;
      parallaxY = ev.clientY / Math.max(1, window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", onWindowMouseMove, { passive: true });

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
      if (moved > 6) return;

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

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let lastReportedSection = "about";
    const getScrollProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      return Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const getVisibleSectionId = (): string | null => {
      const probeY = window.innerHeight * 0.34;
      for (const wp of SECTION_WAYPOINTS) {
        const el = document.getElementById(wp.sectionId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          return wp.sectionId;
        }
      }
      return null;
    };

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
        theme: currentTheme,
        activeFilter: filter,
        focusedProjectId: focusId,
        hoveredProjectId: hoverId,
        cameraMode: mode,
        onActiveSectionChange: reportSection,
      } = propsRef.current;

      if (currentTheme !== appliedTheme) {
        appliedTheme = currentTheme;
        applySceneTheme(currentTheme);
      }

      controls.enableZoom = mode === "orbit";

      const scrollProgress = getScrollProgress();
      const scrollTransform = computeScrollSceneTransform(scrollProgress);

      // 1. Scroll-Coupled Constellation Choreography + Ambient Drift
      starfield.points.rotation.y = elapsed * 0.036 + scrollTransform.constellationYaw * 0.25;
      starfield.points.rotation.x = elapsed * 0.012 + scrollTransform.starTiltZ * 0.4;

      if (mode === "scroll" && !focusId) {
        constellationRoot.rotation.y = THREE.MathUtils.damp(
          constellationRoot.rotation.y,
          scrollTransform.constellationYaw,
          7.0,
          delta
        );
        constellationRoot.rotation.x = THREE.MathUtils.damp(
          constellationRoot.rotation.x,
          scrollTransform.hubTiltX,
          7.0,
          delta
        );
        constellationRoot.position.y = THREE.MathUtils.damp(
          constellationRoot.position.y,
          scrollTransform.hubPosY,
          7.0,
          delta
        );
      }

      hub.outerWireframe.rotation.y = elapsed * 0.14;
      hub.outerWireframe.rotation.x = elapsed * 0.07;
      hub.outerRing.rotation.z = elapsed * 0.095;
      hub.innerRing.rotation.y = -elapsed * 0.12;
      hub.coreLattice.rotation.y = -elapsed * 0.22;
      hub.coreCrystal.rotation.x = elapsed * 0.26;
      hub.coreCrystal.position.y = Math.sin(elapsed * 1.1) * 0.05 * motionScale;

      // 2. Constellation Project Polyhedra (hover & category filter emphasis)
      PROJECTS.forEach((proj, idx) => {
        const handle = nodeHandles.get(proj.id);
        if (!handle) return;

        const matchesFilter = filter === "all" || proj.category === filter;
        const isFocused = focusId === proj.id;
        const isHovered = hoverId === proj.id;

        const targetScale = isFocused
          ? 1.28
          : isHovered
          ? 1.16
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
          Math.sin(elapsed * 0.9 + idx * 1.3) * 0.08 * motionScale;
        handle.totemGroup.position.y = floatOffset;
        handle.totemGroup.rotation.y = elapsed * 0.28 + idx * 0.8;
        handle.totemGroup.rotation.x = Math.sin(elapsed * 0.35 + idx) * 0.18;
        handle.collarRing.rotation.z = elapsed * 0.34;

        const targetEmissive = isFocused
          ? 1.05
          : isHovered
          ? 0.8
          : matchesFilter
          ? 0.28
          : 0.08;
        handle.beaconMat.emissiveIntensity = THREE.MathUtils.damp(
          handle.beaconMat.emissiveIntensity,
          targetEmissive,
          8,
          delta
        );

        const targetWireOpacity = isFocused
          ? 0.96
          : isHovered
          ? 0.88
          : matchesFilter
          ? palette.wireOpacityBase
          : 0.2;
        handle.wireMat.opacity = THREE.MathUtils.damp(
          handle.wireMat.opacity,
          targetWireOpacity,
          8,
          delta
        );
      });

      // 3. Slender Spline Web Filaments & Traveling Motes
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
            ? 0.92
            : 0.1
          : fh.edge.kind === "hub-link"
          ? palette.hubLinkOpacity
          : palette.crossLinkOpacity;
        fh.material.opacity = THREE.MathUtils.damp(
          fh.material.opacity,
          targetOpacity,
          8,
          delta
        );
        fh.pulseBead.visible = !activeId || connectedToActive;
      });

      // 4. Camera Choreography (Node Focus OR Scroll-Linked + Pointer Parallax)
      const scrollCam = interpolateCameraState(scrollProgress, SECTION_WAYPOINTS);
      const visibleSection = getVisibleSectionId() ?? scrollCam.activeSectionId;
      if (visibleSection !== lastReportedSection) {
        lastReportedSection = visibleSection;
        reportSection?.(visibleSection);
      }

      if (focusId) {
        const focusHandle = nodeHandles.get(focusId);
        if (focusHandle) {
          focusHandle.group.getWorldPosition(_focusWorldPos);
          const framed = computeFocusCameraForNode(
            {
              x: _focusWorldPos.x,
              y: _focusWorldPos.y,
              z: _focusWorldPos.z,
            },
            3.6
          );
          _targetCamPos.set(
            framed.position.x,
            framed.position.y,
            framed.position.z
          );
          _targetLookAt.set(framed.target.x, framed.target.y, framed.target.z);
          if (!userDraggingOrbit) {
            camera.position.x = THREE.MathUtils.damp(
              camera.position.x,
              _targetCamPos.x,
              6.5,
              delta
            );
            camera.position.y = THREE.MathUtils.damp(
              camera.position.y,
              _targetCamPos.y,
              6.5,
              delta
            );
            camera.position.z = THREE.MathUtils.damp(
              camera.position.z,
              _targetCamPos.z,
              6.5,
              delta
            );
            controls.target.x = THREE.MathUtils.damp(
              controls.target.x,
              _targetLookAt.x,
              7.5,
              delta
            );
            controls.target.y = THREE.MathUtils.damp(
              controls.target.y,
              _targetLookAt.y,
              7.5,
              delta
            );
            controls.target.z = THREE.MathUtils.damp(
              controls.target.z,
              _targetLookAt.z,
              7.5,
              delta
            );
          }
        }
      } else if (mode === "scroll" && !userDraggingOrbit) {
        const px = prefersReducedMotion ? 0 : parallaxX * 1.1;
        const py = prefersReducedMotion ? 0 : -parallaxY * 0.7;

        _targetCamPos.set(
          scrollCam.position.x + px,
          scrollCam.position.y + py,
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
          7.0,
          delta
        );
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          _targetCamPos.y,
          7.0,
          delta
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          _targetCamPos.z,
          7.0,
          delta
        );
        controls.target.x = THREE.MathUtils.damp(
          controls.target.x,
          _targetLookAt.x,
          7.5,
          delta
        );
        controls.target.y = THREE.MathUtils.damp(
          controls.target.y,
          _targetLookAt.y,
          7.5,
          delta
        );
        controls.target.z = THREE.MathUtils.damp(
          controls.target.z,
          _targetLookAt.z,
          7.5,
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
      window.removeEventListener("mousemove", onWindowMouseMove);
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
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.LineSegments ||
          obj instanceof THREE.Line ||
          obj instanceof THREE.Points
        ) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

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
      data-theme={theme}
      className="fixed inset-0 z-0 pointer-events-auto"
      aria-label="Interactive 3D wireframe sacred geometry and project web constellation"
    >
      {contextLost && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-canvas)] text-[var(--text-primary)] p-6">
          <div className="max-w-md border border-[var(--border-hairline)] bg-[var(--bg-surface-solid)] p-6 text-center rounded-xl">
            <h2 className="text-lg font-semibold mb-2">3D Viewport Paused</h2>
            <p className="text-sm text-[var(--text-muted)]">
              WebGL context was temporarily suspended by the browser. Reload or
              scroll to continue exploring JehKTech.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
