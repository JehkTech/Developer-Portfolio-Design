import * as THREE from "three";
import {
  HUB_CORE_POSITION,
  type ProjectNodeSpec,
  type Vec3Tuple,
  type WebEdge,
} from "./portfolioGraph";

export interface HubAnimatedParts {
  group: THREE.Group;
  outerGimbal: THREE.Mesh;
  innerGimbal: THREE.Mesh;
  harmonicRing: THREE.Mesh;
  coreLattice: THREE.Group;
  coreCrystal: THREE.Mesh;
}

export interface ProjectNodeHandle {
  id: string;
  group: THREE.Group;
  totemGroup: THREE.Group;
  collarRing: THREE.Mesh;
  beaconMat: THREE.MeshStandardMaterial;
  hitMesh: THREE.Mesh;
  basePosition: THREE.Vector3;
}

export interface WebFilamentHandle {
  edge: WebEdge;
  curve: THREE.QuadraticBezierCurve3;
  material: THREE.MeshStandardMaterial;
  pulseBead: THREE.Mesh;
  pulseOffset: number;
  pulseSpeed: number;
}

export function createSacredHubGroup(
  metalBump: THREE.Texture,
  shadowTex: THREE.Texture
): HubAnimatedParts {
  const group = new THREE.Group();
  group.position.set(0, 0, 0);

  const obsidianMat = new THREE.MeshStandardMaterial({
    color: 0x121418,
    roughness: 0.78,
    metalness: 0.22,
  });

  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x8b9099,
    roughness: 0.36,
    metalness: 0.86,
    bumpMap: metalBump,
    bumpScale: 0.008,
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc9a96a,
    roughness: 0.2,
    metalness: 0.94,
    bumpMap: metalBump,
    bumpScale: 0.006,
  });

  const silverTrimMat = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    roughness: 0.24,
    metalness: 0.72,
    emissive: 0x2563eb,
    emissiveIntensity: 0.35,
  });

  // 1. Contact shadow disc grounded just above y=0
  const shadowDisc = new THREE.Mesh(
    new THREE.CircleGeometry(2.3, 40),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
  );
  shadowDisc.rotation.x = -Math.PI / 2;
  shadowDisc.position.y = 0.015;
  group.add(shadowDisc);

  // 2. Stepped lathe obsidian pedestal (bottom-center pivot at y=0)
  const plinthPoints = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1.48, 0),
    new THREE.Vector2(1.42, 0.14),
    new THREE.Vector2(1.12, 0.18),
    new THREE.Vector2(1.02, 0.34),
    new THREE.Vector2(0.55, 0.38),
    new THREE.Vector2(0.45, 0.58),
    new THREE.Vector2(0, 0.58),
  ];
  const plinthGeo = new THREE.LatheGeometry(plinthPoints, 36);
  const plinth = new THREE.Mesh(plinthGeo, obsidianMat);
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // 3. Brushed titanium collar ring on plinth
  const baseCollar = new THREE.Mesh(
    new THREE.TorusGeometry(1.08, 0.045, 16, 48),
    titaniumMat
  );
  baseCollar.rotation.x = Math.PI / 2;
  baseCollar.position.y = 0.36;
  group.add(baseCollar);

  // 4. Three symmetric support pylons (3-fold symmetry)
  const pylonGeo = new THREE.CylinderGeometry(0.045, 0.07, 1.05, 12);
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const pylon = new THREE.Mesh(pylonGeo, titaniumMat);
    pylon.position.set(Math.cos(angle) * 0.88, 0.72, Math.sin(angle) * 0.88);
    pylon.rotation.z = Math.cos(angle) * 0.28;
    pylon.rotation.x = -Math.sin(angle) * 0.28;
    pylon.castShadow = true;
    group.add(pylon);
  }

  // 5. Outer Champagne Gold Gimbal Ring centered at HUB_CORE_POSITION.y
  const outerGimbal = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.052, 18, 64),
    brassMat
  );
  outerGimbal.position.set(0, HUB_CORE_POSITION.y, 0);
  outerGimbal.castShadow = true;
  group.add(outerGimbal);

  // 6. Inner Titanium Gimbal Ring
  const innerGimbal = new THREE.Mesh(
    new THREE.TorusGeometry(1.16, 0.038, 16, 56),
    titaniumMat
  );
  innerGimbal.position.set(0, HUB_CORE_POSITION.y, 0);
  innerGimbal.rotation.y = Math.PI / 3;
  group.add(innerGimbal);

  // 7. Harmonic 3-6-9 Orbital Ring with 3 gold node beads
  const harmonicRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.022, 12, 72),
    silverTrimMat
  );
  harmonicRing.position.set(0, HUB_CORE_POSITION.y, 0);
  harmonicRing.rotation.x = Math.PI * 0.38;

  const orbGeo = new THREE.OctahedronGeometry(0.11, 1);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const orb = new THREE.Mesh(orbGeo, brassMat);
    orb.position.set(Math.cos(a) * 1.75, Math.sin(a) * 1.75, 0);
    harmonicRing.add(orb);
  }
  group.add(harmonicRing);

  // 8. Core Sacred Lattice + Central Faceted Crystal
  const coreLattice = new THREE.Group();
  coreLattice.position.set(0, HUB_CORE_POSITION.y, 0);

  const wireGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.86, 0));
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xc9a96a,
    transparent: true,
    opacity: 0.78,
  });
  const icosaWire = new THREE.LineSegments(wireGeo, wireMat);
  coreLattice.add(icosaWire);

  const coreCrystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.54, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0xc9a96a,
      roughness: 0.14,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      emissive: 0x785928,
      emissiveIntensity: 0.32,
    })
  );
  coreCrystal.castShadow = true;
  coreLattice.add(coreCrystal);

  group.add(coreLattice);

  return {
    group,
    outerGimbal,
    innerGimbal,
    harmonicRing,
    coreLattice,
    coreCrystal,
  };
}

export function createProjectNodeGroup(
  project: ProjectNodeSpec,
  position: Vec3Tuple,
  metalBump: THREE.Texture,
  shadowTex: THREE.Texture
): ProjectNodeHandle {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x16181c,
    roughness: 0.76,
    metalness: 0.25,
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: project.accentHex,
    roughness: 0.22,
    metalness: 0.9,
    bumpMap: metalBump,
    bumpScale: 0.005,
  });

  const beaconMat = new THREE.MeshStandardMaterial({
    color: project.accentHex,
    roughness: 0.25,
    metalness: 0.42,
    emissive: project.accentHex,
    emissiveIntensity: 0.38,
  });

  // Ground shadow disc projected down to stage floor relative to node elevation
  const groundShadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.92, 24),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    })
  );
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.position.y = -position.y + 0.015;
  group.add(groundShadow);

  // Part 1: Orbital Socket Disc
  const socketDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.64, 0.74, 0.13, 24),
    baseMat
  );
  socketDisc.position.y = -0.52;
  socketDisc.castShadow = true;
  group.add(socketDisc);

  // Part 2: Glowing Orbital Collar Ring
  const collarRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.03, 12, 40),
    beaconMat
  );
  collarRing.rotation.x = Math.PI / 2;
  collarRing.position.y = -0.44;
  group.add(collarRing);

  // Part 3+: Domain-specific composite totem (3+ distinct meshes)
  const totemGroup = new THREE.Group();
  totemGroup.position.y = 0.05;

  switch (project.geometryStyle) {
    case "dbshield": {
      // Stacked database platters + vertical integrity shield ribs + crown ring
      [-0.22, 0, 0.22].forEach((y, idx) => {
        const platter = new THREE.Mesh(
          new THREE.CylinderGeometry(0.36, 0.36, 0.11, 24),
          idx === 1 ? trimMat : baseMat
        );
        platter.position.y = y;
        platter.castShadow = true;
        totemGroup.add(platter);
      });
      const shieldRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.032, 12, 36),
        beaconMat
      );
      shieldRing.rotation.x = Math.PI / 3;
      totemGroup.add(shieldRing);
      break;
    }

    case "prism": {
      // Dual interlocked automation cubes + vertical optical prism core
      const cubeA = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), baseMat);
      cubeA.rotation.set(0.4, 0.5, 0);
      totemGroup.add(cubeA);

      const cubeB = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), trimMat);
      cubeB.rotation.set(-0.5, 0.9, 0.3);
      totemGroup.add(cubeB);

      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), beaconMat);
      core.position.y = 0.44;
      totemGroup.add(core);
      break;
    }

    case "pipeline": {
      // Layered glass/slate intake planes + ascending routing spindle
      [-0.24, 0, 0.24].forEach((y, idx) => {
        const tier = new THREE.Mesh(
          new THREE.BoxGeometry(0.56 - idx * 0.08, 0.07, 0.44 - idx * 0.06),
          idx === 1 ? trimMat : baseMat
        );
        tier.position.y = y;
        tier.rotation.y = idx * 0.35;
        totemGroup.add(tier);
      });
      const spindle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.72, 12),
        beaconMat
      );
      totemGroup.add(spindle);
      break;
    }

    case "beacon": {
      // Webhook monitoring mast + dual orthogonal telemetry rings
      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.11, 0.68, 12),
        baseMat
      );
      totemGroup.add(mast);

      const ringA = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.035, 12, 36), trimMat);
      ringA.rotation.x = Math.PI / 2;
      ringA.position.y = 0.06;
      totemGroup.add(ringA);

      const ringB = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.028, 12, 30), beaconMat);
      ringB.rotation.x = Math.PI / 2;
      ringB.position.y = 0.24;
      totemGroup.add(ringB);

      const cap = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), beaconMat);
      cap.position.y = 0.42;
      totemGroup.add(cap);
      break;
    }

    case "candlestick": {
      const heights = [0.42, 0.72, 0.56, 0.88];
      heights.forEach((h, i) => {
        const xOff = (i - 1.5) * 0.22;
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(0.13, h, 0.13),
          i % 2 === 0 ? trimMat : baseMat
        );
        body.position.set(xOff, h * 0.5 - 0.36, 0);
        body.castShadow = true;
        totemGroup.add(body);

        const wick = new THREE.Mesh(
          new THREE.CylinderGeometry(0.018, 0.018, h + 0.26, 8),
          beaconMat
        );
        wick.position.set(xOff, h * 0.5 - 0.32, 0);
        totemGroup.add(wick);
      });
      break;
    }

    case "audio": {
      // Coaxial speaker baffle + acoustic ring + brass phase bullet
      const baffle = new THREE.Mesh(
        new THREE.BoxGeometry(0.56, 0.56, 0.16),
        baseMat
      );
      baffle.rotation.y = 0.2;
      totemGroup.add(baffle);

      const surround = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.045, 14, 32),
        trimMat
      );
      surround.position.z = 0.1;
      surround.rotation.y = 0.2;
      totemGroup.add(surround);

      const phasePlug = new THREE.Mesh(
        new THREE.ConeGeometry(0.09, 0.22, 16),
        beaconMat
      );
      phasePlug.rotation.x = Math.PI / 2;
      phasePlug.position.z = 0.16;
      totemGroup.add(phasePlug);
      break;
    }

    case "transit": {
      // Twin transit portals + arched corridor + shuttle capsule
      [-0.26, 0.26].forEach((x) => {
        const pier = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.44, 0.24), baseMat);
        pier.position.set(x, -0.14, 0);
        totemGroup.add(pier);
      });
      const arch = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.045, 12, 28, Math.PI),
        trimMat
      );
      arch.position.y = 0.05;
      totemGroup.add(arch);

      const capsule = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.16), beaconMat);
      capsule.position.y = 0.08;
      totemGroup.add(capsule);
      break;
    }

    case "terminal": {
      // Contactless NFC merchant pay reader + concentric verification wave rings
      const slateBody = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.54, 0.12), baseMat);
      slateBody.rotation.x = -0.35;
      totemGroup.add(slateBody);

      const screen = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.03), trimMat);
      screen.rotation.x = -0.35;
      screen.position.set(0, 0.02, 0.07);
      totemGroup.add(screen);

      [0.24, 0.36].forEach((r) => {
        const wave = new THREE.Mesh(
          new THREE.TorusGeometry(r, 0.022, 10, 32),
          beaconMat
        );
        wave.position.set(0, 0.22, 0.14);
        wave.rotation.x = -0.35;
        totemGroup.add(wave);
      });
      break;
    }

    case "logistics":
    default: {
      const archBase = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.12, 0.34), baseMat);
      archBase.position.y = -0.25;
      totemGroup.add(archBase);

      const arc = new THREE.Mesh(
        new THREE.TorusGeometry(0.36, 0.05, 12, 28, Math.PI),
        trimMat
      );
      arc.position.y = -0.18;
      totemGroup.add(arc);

      [-0.28, 0, 0.28].forEach((x, idx) => {
        const cargo = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.16, 0.16),
          idx === 1 ? beaconMat : trimMat
        );
        cargo.position.set(x, -0.08, 0);
        totemGroup.add(cargo);
      });
      break;
    }
  }

  group.add(totemGroup);

  // Invisible proxy hit sphere on Layer 1 for crisp, fast raycasting
  const hitMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 12, 12),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.layers.set(1);
  hitMesh.userData.projectId = project.id;
  group.add(hitMesh);

  return {
    id: project.id,
    group,
    totemGroup,
    collarRing,
    beaconMat,
    hitMesh,
    basePosition: new THREE.Vector3(position.x, position.y, position.z),
  };
}

export function createWebFilaments(edges: WebEdge[]): {
  group: THREE.Group;
  handles: WebFilamentHandle[];
} {
  const group = new THREE.Group();
  const handles: WebFilamentHandle[] = [];
  const beadGeo = new THREE.SphereGeometry(0.055, 10, 10);

  edges.forEach((edge, idx) => {
    const start = new THREE.Vector3(edge.from.x, edge.from.y, edge.from.z);
    const ctrl = new THREE.Vector3(
      edge.controlPoint.x,
      edge.controlPoint.y,
      edge.controlPoint.z
    );
    const end = new THREE.Vector3(edge.to.x, edge.to.y, edge.to.z);

    const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);
    const radius = edge.kind === "hub-link" ? 0.022 : 0.014;
    const tubeGeo = new THREE.TubeGeometry(curve, 32, radius, 8, false);

    const baseColor = edge.kind === "hub-link" ? 0xc9a96a : 0x60a5fa;
    const material = new THREE.MeshStandardMaterial({
      color: baseColor,
      emissive: baseColor,
      emissiveIntensity: edge.kind === "hub-link" ? 0.42 : 0.25,
      roughness: 0.35,
      metalness: 0.65,
      transparent: true,
      opacity: edge.kind === "hub-link" ? 0.78 : 0.46,
    });

    const tube = new THREE.Mesh(tubeGeo, material);
    group.add(tube);

    const beadMat = new THREE.MeshBasicMaterial({
      color: edge.kind === "hub-link" ? 0xf5e6c8 : 0xbfdbfe,
    });
    const pulseBead = new THREE.Mesh(beadGeo, beadMat);
    group.add(pulseBead);

    handles.push({
      edge,
      curve,
      material,
      pulseBead,
      pulseOffset: (idx * 0.17) % 1,
      pulseSpeed: edge.kind === "hub-link" ? 0.24 : 0.18,
    });
  });

  return { group, handles };
}

export function createOrbitalStage(
  floorTex: THREE.Texture,
  metalBump: THREE.Texture
): { group: THREE.Group; starMesh: THREE.InstancedMesh } {
  const group = new THREE.Group();

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(11.4, 72),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: floorTex,
      roughness: 0.85,
      metalness: 0.18,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  group.add(floor);

  const rimRing = new THREE.Mesh(
    new THREE.TorusGeometry(11.35, 0.08, 14, 96),
    new THREE.MeshStandardMaterial({
      color: 0x333842,
      roughness: 0.45,
      metalness: 0.82,
      bumpMap: metalBump,
      bumpScale: 0.004,
    })
  );
  rimRing.rotation.x = Math.PI / 2;
  rimRing.position.y = 0.03;
  group.add(rimRing);

  const count = 96;
  const starGeo = new THREE.OctahedronGeometry(0.065, 0);
  const starMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.65,
    emissive: 0x16181c,
    emissiveIntensity: 0.3,
  });
  const starMesh = new THREE.InstancedMesh(starGeo, starMat, count);

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2 * 3;
    const radius = 9.0 + ((i * 17) % 14);
    const y = 0.6 + ((i * 29) % 9) * 0.72;
    const s = 0.65 + ((i * 13) % 7) * 0.15;

    dummy.position.set(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
    dummy.rotation.set(i * 0.5, i * 0.7, 0);
    dummy.scale.setScalar(s);
    dummy.updateMatrix();
    starMesh.setMatrixAt(i, dummy.matrix);

    color.setHex(i % 3 === 0 ? 0xc9a96a : i % 3 === 1 ? 0x60a5fa : 0x64748b);
    starMesh.setColorAt(i, color);
  }
  starMesh.instanceMatrix.needsUpdate = true;
  if (starMesh.instanceColor) starMesh.instanceColor.needsUpdate = true;
  starMesh.computeBoundingSphere();
  group.add(starMesh);

  return { group, starMesh };
}
