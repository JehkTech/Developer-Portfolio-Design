import * as THREE from "three";
import {
  type ProjectNodeSpec,
  type SceneThemePalette,
  type Vec3Tuple,
  type WebEdge,
} from "./portfolioGraph";

export interface HubAnimatedParts {
  group: THREE.Group;
  outerWireframe: THREE.Mesh;
  outerWireMat: THREE.MeshBasicMaterial;
  outerRing: THREE.Mesh;
  silverRingMat: THREE.MeshStandardMaterial;
  innerRing: THREE.Mesh;
  goldRingMat: THREE.MeshStandardMaterial;
  markerMat: THREE.MeshStandardMaterial;
  coreLattice: THREE.Group;
  innerLatticeMat: THREE.LineBasicMaterial;
  coreCrystal: THREE.Mesh;
  coreCrystalMat: THREE.MeshPhysicalMaterial;
  coreEdgeMat: THREE.LineBasicMaterial;
}

export interface ProjectNodeHandle {
  id: string;
  isGoldAccent: boolean;
  accentKey: "gold" | "coral" | "cobalt" | "sage";
  group: THREE.Group;
  totemGroup: THREE.Group;
  collarRing: THREE.Mesh;
  obsidianMat: THREE.MeshStandardMaterial;
  beaconMat: THREE.MeshStandardMaterial;
  wireMat: THREE.LineBasicMaterial;
  hitMesh: THREE.Mesh;
  basePosition: THREE.Vector3;
}

export interface WebFilamentHandle {
  edge: WebEdge;
  curve: THREE.QuadraticBezierCurve3;
  material: THREE.LineBasicMaterial;
  beadMat: THREE.MeshBasicMaterial;
  pulseBead: THREE.Mesh;
  pulseOffset: number;
  pulseSpeed: number;
}

export interface StarfieldHandle {
  group: THREE.Group;
  points: THREE.Points;
  material: THREE.PointsMaterial;
  recolor: (primaryHex: number, accentHex: number, opacity: number) => void;
}

/**
 * Minimalist Wireframe Geodesic Core & Celestial Astrolabe Rings
 * Supports both Dark Obsidian & Light Alabaster theme palettes cleanly.
 */
export function createSacredHubGroup(
  metalBump: THREE.Texture,
  palette: SceneThemePalette
): HubAnimatedParts {
  const group = new THREE.Group();
  group.position.set(0, 0, 0);

  const silverRingMat = new THREE.MeshStandardMaterial({
    color: palette.coralWire,
    roughness: 0.26,
    metalness: 0.86,
    bumpMap: metalBump,
    bumpScale: 0.004,
    transparent: true,
    opacity: palette.ringOpacityOuter,
  });

  const goldRingMat = new THREE.MeshStandardMaterial({
    color: palette.goldWire,
    roughness: 0.22,
    metalness: 0.9,
    bumpMap: metalBump,
    bumpScale: 0.004,
    transparent: true,
    opacity: palette.ringOpacityInner,
  });

  const outerWireMat = new THREE.MeshBasicMaterial({
    color: palette.goldWire,
    wireframe: true,
    transparent: true,
    opacity: palette.outerIcoOpacity,
  });

  // 1. Primary Wireframe Icosahedron Shell
  const outerWireframe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.15, 1),
    outerWireMat
  );
  group.add(outerWireframe);

  // 2. Outer Hairline Orbital Ring (Warm Coral Accent)
  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.55, 0.011, 8, 180),
    silverRingMat
  );
  outerRing.rotation.x = 1.2;
  outerRing.rotation.y = 0.22;
  group.add(outerRing);

  // 3. Secondary Harmonic Meridian Ring + 3 Sacred 3-6-9 Markers
  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.78, 0.009, 8, 160),
    goldRingMat
  );
  innerRing.rotation.x = -0.78;
  innerRing.rotation.z = 0.48;

  const markerGeo = new THREE.OctahedronGeometry(0.055, 0);
  const markerMat = new THREE.MeshStandardMaterial({
    color: palette.coralWire,
    emissive: palette.coralWire,
    emissiveIntensity: 0.52,
    roughness: 0.2,
    metalness: 0.85,
  });
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.set(Math.cos(a) * 2.78, Math.sin(a) * 2.78, 0);
    innerRing.add(marker);
  }
  group.add(innerRing);

  // 4. Inner Precision Wireframe Octahedron + Crystal Core
  const coreLattice = new THREE.Group();

  const innerLatticeMat = new THREE.LineBasicMaterial({
    color: palette.cobaltWire,
    transparent: true,
    opacity: 0.56,
  });
  const innerLattice = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.18, 0)),
    innerLatticeMat
  );
  coreLattice.add(innerLattice);

  const coreCrystalMat = new THREE.MeshPhysicalMaterial({
    color: palette.kernelSurface,
    roughness: 0.2,
    metalness: 0.84,
    clearcoat: 1.0,
    clearcoatRoughness: 0.16,
    emissive: palette.cobaltWire,
    emissiveIntensity: 0.22,
  });
  const coreCrystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.64, 0),
    coreCrystalMat
  );
  coreLattice.add(coreCrystal);

  const coreEdgeMat = new THREE.LineBasicMaterial({
    color: palette.coralWire,
    transparent: true,
    opacity: 0.82,
  });
  const coreEdgeHighlight = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.65, 0)),
    coreEdgeMat
  );
  coreCrystal.add(coreEdgeHighlight);

  group.add(coreLattice);

  return {
    group,
    outerWireframe,
    outerWireMat,
    outerRing,
    silverRingMat,
    innerRing,
    goldRingMat,
    markerMat,
    coreLattice,
    innerLatticeMat,
    coreCrystal,
    coreCrystalMat,
    coreEdgeMat,
  };
}

function buildWireframeAndKernel(
  outerGeo: THREE.BufferGeometry,
  innerGeo: THREE.BufferGeometry,
  wireMat: THREE.LineBasicMaterial,
  obsidianMat: THREE.MeshStandardMaterial,
  beaconMat: THREE.MeshStandardMaterial,
  totemGroup: THREE.Group,
  useEmissiveCore = false
) {
  const wireFrame = new THREE.LineSegments(
    new THREE.EdgesGeometry(outerGeo),
    wireMat
  );
  totemGroup.add(wireFrame);

  const kernel = new THREE.Mesh(
    innerGeo,
    useEmissiveCore ? beaconMat : obsidianMat
  );
  totemGroup.add(kernel);
}

/**
 * Weightless Architectural Polyhedron Constellation Node (3-5 distinct composite layers)
 */
export function resolveNodeAccentKey(
  project: Pick<ProjectNodeSpec, "category" | "accentHex">
): "gold" | "coral" | "cobalt" | "sage" {
  if (project.category === "clients") {
    return project.accentHex === 0xc9a96a ? "coral" : "cobalt";
  }
  if (project.category === "fintech") {
    return project.accentHex === 0xc9a96a ? "gold" : "coral";
  }
  return project.accentHex === 0xc9a96a ? "gold" : "sage";
}

export function resolvePaletteAccentHex(
  palette: SceneThemePalette,
  key: "gold" | "coral" | "cobalt" | "sage"
): number {
  switch (key) {
    case "coral":
      return palette.coralWire;
    case "cobalt":
      return palette.cobaltWire;
    case "sage":
      return palette.sageWire;
    case "gold":
    default:
      return palette.goldWire;
  }
}

export function createProjectNodeGroup(
  project: ProjectNodeSpec,
  position: Vec3Tuple,
  metalBump: THREE.Texture,
  palette: SceneThemePalette
): ProjectNodeHandle {
  const isGoldAccent = project.accentHex === 0xc9a96a;
  const accentKey = resolveNodeAccentKey(project);
  const accentColor = resolvePaletteAccentHex(palette, accentKey);

  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);

  const obsidianMat = new THREE.MeshStandardMaterial({
    color: palette.kernelSurface,
    roughness: 0.68,
    metalness: 0.35,
  });

  const wireMat = new THREE.LineBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: palette.wireOpacityBase,
  });

  const beaconMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    roughness: 0.24,
    metalness: 0.85,
    bumpMap: metalBump,
    bumpScale: 0.004,
    emissive: accentColor,
    emissiveIntensity: 0.26,
  });

  // 1. Hairline Equatorial Halo Ring
  const collarRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.009, 8, 56),
    beaconMat
  );
  collarRing.rotation.x = Math.PI * 0.42;
  group.add(collarRing);

  // 2. Domain-inspired Architectural Geometric Polyhedron Totem
  const totemGroup = new THREE.Group();

  switch (project.geometryStyle) {
    case "dbshield": {
      buildWireframeAndKernel(
        new THREE.CylinderGeometry(0.36, 0.36, 0.56, 6),
        new THREE.CylinderGeometry(0.18, 0.18, 0.32, 6),
        wireMat,
        obsidianMat,
        beaconMat,
        totemGroup
      );
      const innerPlate = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.44, 0.44, 0.08, 6)),
        wireMat
      );
      totemGroup.add(innerPlate);
      break;
    }

    case "prism": {
      const boxA = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.48, 0.48, 0.48)),
        wireMat
      );
      boxA.rotation.set(0.45, 0.55, 0);
      totemGroup.add(boxA);

      const boxB = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.36, 0.36, 0.36)),
        wireMat
      );
      boxB.rotation.set(-0.4, 0.9, 0.35);
      totemGroup.add(boxB);

      const kernel = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), beaconMat);
      totemGroup.add(kernel);
      break;
    }

    case "pipeline": {
      [-0.2, 0, 0.2].forEach((y, idx) => {
        const tier = new THREE.LineSegments(
          new THREE.EdgesGeometry(
            new THREE.BoxGeometry(0.56 - idx * 0.1, 0.06, 0.56 - idx * 0.1)
          ),
          wireMat
        );
        tier.position.y = y;
        tier.rotation.y = idx * 0.45;
        totemGroup.add(tier);
      });
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), beaconMat);
      totemGroup.add(core);
      break;
    }

    case "beacon": {
      buildWireframeAndKernel(
        new THREE.OctahedronGeometry(0.48, 0),
        new THREE.OctahedronGeometry(0.2, 0),
        wireMat,
        obsidianMat,
        beaconMat,
        totemGroup,
        true
      );
      const radarLoop = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.TorusGeometry(0.38, 0.01, 6, 24)),
        wireMat
      );
      radarLoop.rotation.x = Math.PI / 2;
      totemGroup.add(radarLoop);
      break;
    }

    case "candlestick": {
      [-0.22, 0, 0.22].forEach((x, idx) => {
        const h = idx === 1 ? 0.64 : idx === 0 ? 0.42 : 0.54;
        const barFrame = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(0.14, h, 0.14)),
          wireMat
        );
        barFrame.position.set(x, (idx - 1) * 0.08, 0);
        totemGroup.add(barFrame);
      });
      const core = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.46, 0.12), beaconMat);
      totemGroup.add(core);
      break;
    }

    case "audio": {
      buildWireframeAndKernel(
        new THREE.IcosahedronGeometry(0.44, 0),
        new THREE.ConeGeometry(0.16, 0.34, 8),
        wireMat,
        obsidianMat,
        beaconMat,
        totemGroup,
        true
      );
      const ringFrame = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.012, 8, 36),
        obsidianMat
      );
      totemGroup.add(ringFrame);
      break;
    }

    case "transit": {
      buildWireframeAndKernel(
        new THREE.DodecahedronGeometry(0.44, 0),
        new THREE.IcosahedronGeometry(0.2, 0),
        wireMat,
        obsidianMat,
        beaconMat,
        totemGroup,
        true
      );
      const railArc = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.01, 8, 36, Math.PI),
        beaconMat
      );
      totemGroup.add(railArc);
      break;
    }

    case "terminal": {
      const frame = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.42, 0.58, 0.08)),
        wireMat
      );
      frame.rotation.x = -0.25;
      totemGroup.add(frame);

      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.42, 0.04),
        obsidianMat
      );
      plate.rotation.x = -0.25;
      totemGroup.add(plate);

      const wave = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.012, 8, 32),
        beaconMat
      );
      wave.position.set(0, 0.12, 0.1);
      wave.rotation.x = -0.25;
      totemGroup.add(wave);
      break;
    }

    case "courier": {
      buildWireframeAndKernel(
        new THREE.OctahedronGeometry(0.46, 0),
        new THREE.BoxGeometry(0.24, 0.24, 0.24),
        wireMat,
        obsidianMat,
        beaconMat,
        totemGroup,
        true
      );
      const wingArc = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.01, 8, 32, Math.PI * 1.35),
        beaconMat
      );
      wingArc.rotation.z = 0.6;
      totemGroup.add(wingArc);
      break;
    }

    case "logistics":
    default: {
      buildWireframeAndKernel(
        new THREE.TetrahedronGeometry(0.52, 0),
        new THREE.OctahedronGeometry(0.22, 0),
        wireMat,
        obsidianMat,
        beaconMat,
        totemGroup,
        true
      );
      const counterTetra = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.48, 0)),
        wireMat
      );
      counterTetra.rotation.set(Math.PI, Math.PI / 3, 0);
      totemGroup.add(counterTetra);
      break;
    }
  }

  group.add(totemGroup);

  // Layer 1 Proxy Hit Sphere
  const hitMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 10, 10),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.layers.set(1);
  hitMesh.userData.projectId = project.id;
  group.add(hitMesh);

  return {
    id: project.id,
    isGoldAccent,
    accentKey,
    group,
    totemGroup,
    collarRing,
    obsidianMat,
    beaconMat,
    wireMat,
    hitMesh,
    basePosition: new THREE.Vector3(position.x, position.y, position.z),
  };
}

/**
 * Slender Architectural Spline Web Filaments connecting the Core & Linked Systems
 */
export function createWebFilaments(
  edges: WebEdge[],
  palette: SceneThemePalette
): {
  group: THREE.Group;
  handles: WebFilamentHandle[];
} {
  const group = new THREE.Group();
  const handles: WebFilamentHandle[] = [];
  const beadGeo = new THREE.SphereGeometry(0.032, 8, 8);

  edges.forEach((edge, idx) => {
    const start = new THREE.Vector3(edge.from.x, edge.from.y, edge.from.z);
    const ctrl = new THREE.Vector3(
      edge.controlPoint.x,
      edge.controlPoint.y,
      edge.controlPoint.z
    );
    const end = new THREE.Vector3(edge.to.x, edge.to.y, edge.to.z);

    const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);
    const points = curve.getPoints(36);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

    const baseColor = edge.kind === "hub-link" ? palette.hubLink : palette.crossLink;
    const material = new THREE.LineBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity:
        edge.kind === "hub-link"
          ? palette.hubLinkOpacity
          : palette.crossLinkOpacity,
    });

    const line = new THREE.Line(lineGeo, material);
    group.add(line);

    const beadMat = new THREE.MeshBasicMaterial({
      color: edge.kind === "hub-link" ? palette.beadHub : palette.beadCross,
    });
    const pulseBead = new THREE.Mesh(beadGeo, beadMat);
    group.add(pulseBead);

    handles.push({
      edge,
      curve,
      material,
      beadMat,
      pulseBead,
      pulseOffset: (idx * 0.17) % 1,
      pulseSpeed: edge.kind === "hub-link" ? 0.2 : 0.14,
    });
  });

  return { group, handles };
}

/**
 * Expansive Atmospheric Starfield (1,400 drifting points, theme-recolorable)
 */
export function createAtmosphericStarfield(
  palette: SceneThemePalette
): StarfieldHandle {
  const group = new THREE.Group();
  const count = 1400;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const h1 = Math.sin(i * 12.9898 + 1.23) * 43758.5453;
    const h2 = Math.sin(i * 78.233 + 4.56) * 23421.631;
    const h3 = Math.sin(i * 39.425 + 7.89) * 19283.412;
    const rx = h1 - Math.floor(h1) - 0.5;
    const ry = h2 - Math.floor(h2) - 0.5;
    const rz = h3 - Math.floor(h3) - 0.5;

    positions[i * 3] = rx * 30;
    positions[i * 3 + 1] = ry * 26;
    positions[i * 3 + 2] = rz * 30;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const colorAttr = new THREE.BufferAttribute(colors, 3);
  geometry.setAttribute("color", colorAttr);

  const material = new THREE.PointsMaterial({
    size: 0.036,
    vertexColors: true,
    transparent: true,
    opacity: palette.starOpacity,
    sizeAttenuation: true,
  });

  const recolor = (primaryHex: number, accentHex: number, opacity: number) => {
    const primary = new THREE.Color(primaryHex);
    const accent = new THREE.Color(accentHex);
    for (let i = 0; i < count; i++) {
      const c = i % 5 === 0 ? accent : primary;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    colorAttr.needsUpdate = true;
    material.opacity = opacity;
  };

  recolor(palette.starPrimary, palette.starAccent, palette.starOpacity);

  const points = new THREE.Points(geometry, material);
  group.add(points);

  return { group, points, material, recolor };
}
