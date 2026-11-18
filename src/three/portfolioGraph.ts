export type ProjectCategory = "all" | "saas" | "clients" | "fintech";

export type GeometryStyle =
  | "dbshield"
  | "prism"
  | "pipeline"
  | "beacon"
  | "candlestick"
  | "audio"
  | "transit"
  | "terminal"
  | "logistics";

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface ProjectNodeSpec {
  id: string;
  title: string;
  shortLabel: string;
  category: Exclude<ProjectCategory, "all">;
  geometryStyle: GeometryStyle;
  orbitAngle: number;
  orbitRadius: number;
  elevation: number;
  accentHex: number;
  connections: string[];
}

export interface WebEdge {
  id: string;
  fromId: string;
  toId: string;
  from: Vec3Tuple;
  to: Vec3Tuple;
  controlPoint: Vec3Tuple;
  kind: "hub-link" | "cross-link";
}

export interface CameraWaypoint {
  sectionId: string;
  label: string;
  position: Vec3Tuple;
  target: Vec3Tuple;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const HUB_CORE_POSITION: Vec3Tuple = { x: 0, y: 2.1, z: 0 };

export const SECTION_WAYPOINTS: CameraWaypoint[] = [
  {
    sectionId: "about",
    label: "Hub Core",
    position: { x: -2.4, y: 3.5, z: 11.2 },
    target: { x: -1.4, y: 1.9, z: 0 },
  },
  {
    sectionId: "projects",
    label: "Systems Web",
    position: { x: 5.2, y: 4.8, z: 9.2 },
    target: { x: 0, y: 1.8, z: 0 },
  },
  {
    sectionId: "trading",
    label: "R0TK Orbit",
    position: { x: 8.6, y: 3.4, z: 1.4 },
    target: { x: 0, y: 1.9, z: 0 },
  },
  {
    sectionId: "stack",
    label: "Architecture",
    position: { x: 6.4, y: 3.6, z: -6.2 },
    target: { x: 0, y: 1.9, z: 0 },
  },
  {
    sectionId: "wisdom",
    label: "3-6-9 Resonance",
    position: { x: 0.4, y: 7.2, z: -7.4 },
    target: { x: 0, y: 2.0, z: 0 },
  },
  {
    sectionId: "experience",
    label: "Journey Orbit",
    position: { x: -7.8, y: 3.8, z: -3.4 },
    target: { x: 0, y: 1.8, z: 0 },
  },
  {
    sectionId: "contact",
    label: "Connect",
    position: { x: -4.4, y: 3.2, z: 9.4 },
    target: { x: 0, y: 2.0, z: 0 },
  },
];

export function computeProjectNodePosition(
  orbitAngle: number,
  orbitRadius: number,
  elevation: number
): Vec3Tuple {
  return {
    x: Number((Math.cos(orbitAngle) * orbitRadius).toFixed(4)),
    y: Number(elevation.toFixed(4)),
    z: Number((Math.sin(orbitAngle) * orbitRadius).toFixed(4)),
  };
}

export function computeFocusCameraForNode(
  nodePos: Vec3Tuple,
  distance = 4.6
): { position: Vec3Tuple; target: Vec3Tuple } {
  const len = Math.hypot(nodePos.x, nodePos.z) || 1;
  const dirX = nodePos.x / len;
  const dirZ = nodePos.z / len;
  const sideX = -dirZ * 1.4;
  const sideZ = dirX * 1.4;

  return {
    position: {
      x: Number((nodePos.x + dirX * distance + sideX).toFixed(4)),
      y: Number((nodePos.y + 1.55).toFixed(4)),
      z: Number((nodePos.z + dirZ * distance + sideZ).toFixed(4)),
    },
    target: {
      x: nodePos.x,
      y: nodePos.y,
      z: nodePos.z,
    },
  };
}

export function buildWebEdges(nodes: ProjectNodeSpec[]): WebEdge[] {
  const positions = new Map<string, Vec3Tuple>();
  for (const node of nodes) {
    positions.set(
      node.id,
      computeProjectNodePosition(node.orbitAngle, node.orbitRadius, node.elevation)
    );
  }

  const edges: WebEdge[] = [];
  const seenCrossPairs = new Set<string>();

  for (const node of nodes) {
    const pos = positions.get(node.id)!;
    const midX = (HUB_CORE_POSITION.x + pos.x) * 0.5;
    const midZ = (HUB_CORE_POSITION.z + pos.z) * 0.5;
    const midY = Math.max(HUB_CORE_POSITION.y, pos.y) + 0.95;

    edges.push({
      id: `hub->${node.id}`,
      fromId: "hub",
      toId: node.id,
      from: HUB_CORE_POSITION,
      to: pos,
      controlPoint: { x: midX, y: midY, z: midZ },
      kind: "hub-link",
    });
  }

  for (const node of nodes) {
    const fromPos = positions.get(node.id);
    if (!fromPos) continue;

    for (const targetId of node.connections) {
      if (targetId === node.id) continue;
      const toPos = positions.get(targetId);
      if (!toPos) continue;

      const pairKey = [node.id, targetId].sort().join("<->");
      if (seenCrossPairs.has(pairKey)) continue;
      seenCrossPairs.add(pairKey);

      const midX = (fromPos.x + toPos.x) * 0.5;
      const midZ = (fromPos.z + toPos.z) * 0.5;
      const midY = Math.min(fromPos.y, toPos.y) - 0.55;

      edges.push({
        id: pairKey,
        fromId: node.id,
        toId: targetId,
        from: fromPos,
        to: toPos,
        controlPoint: { x: midX * 0.88, y: Math.max(0.45, midY), z: midZ * 0.88 },
        kind: "cross-link",
      });
    }
  }

  return edges;
}

export function smoothstep01(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

export function interpolateCameraState(
  scrollProgress: number,
  waypoints: CameraWaypoint[] = SECTION_WAYPOINTS
): { position: Vec3Tuple; target: Vec3Tuple; activeSectionId: string } {
  if (waypoints.length === 0) {
    return {
      position: { x: 0, y: 3.4, z: 10 },
      target: { x: 0, y: 1.8, z: 0 },
      activeSectionId: "about",
    };
  }

  if (waypoints.length === 1) {
    return {
      position: { ...waypoints[0].position },
      target: { ...waypoints[0].target },
      activeSectionId: waypoints[0].sectionId,
    };
  }

  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const scaled = clamped * (waypoints.length - 1);
  const idx = Math.min(waypoints.length - 2, Math.floor(scaled));
  const localT = smoothstep01(scaled - idx);

  const a = waypoints[idx];
  const b = waypoints[idx + 1];
  const activeIdx = Math.round(scaled);

  return {
    position: {
      x: a.position.x + (b.position.x - a.position.x) * localT,
      y: a.position.y + (b.position.y - a.position.y) * localT,
      z: a.position.z + (b.position.z - a.position.z) * localT,
    },
    target: {
      x: a.target.x + (b.target.x - a.target.x) * localT,
      y: a.target.y + (b.target.y - a.target.y) * localT,
      z: a.target.z + (b.target.z - a.target.z) * localT,
    },
    activeSectionId: waypoints[Math.min(waypoints.length - 1, activeIdx)].sectionId,
  };
}

export function dampValue(
  current: number,
  target: number,
  lambda: number,
  deltaSeconds: number
): number {
  if (deltaSeconds <= 0) return current;
  return current + (target - current) * (1 - Math.exp(-lambda * deltaSeconds));
}

export function filterProjects<T extends { category: Exclude<ProjectCategory, "all"> }>(
  projects: T[],
  category: ProjectCategory
): T[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export function validateContactForm(input: ContactFormInput): {
  valid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (subject.length < 3) {
    errors.subject = "Please enter a short subject (at least 3 characters).";
  }

  if (message.length < 10) {
    errors.message = "Please include a message of at least 10 characters.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
