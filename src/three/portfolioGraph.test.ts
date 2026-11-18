import test from "node:test";
import assert from "node:assert/strict";
import {
  buildWebEdges,
  computeFocusCameraForNode,
  computeProjectNodePosition,
  dampValue,
  filterProjects,
  HUB_CORE_POSITION,
  interpolateCameraState,
  SECTION_WAYPOINTS,
  validateContactForm,
  type ProjectNodeSpec,
} from "./portfolioGraph";

const sampleNodes: ProjectNodeSpec[] = [
  {
    id: "ai-db-track",
    title: "AI-DB Track",
    shortLabel: "01 AI-DB",
    category: "saas",
    geometryStyle: "dbshield",
    orbitAngle: 0,
    orbitRadius: 4.6,
    elevation: 2.1,
    accentHex: 0xc9a96a,
    connections: ["statushub", "onboard-ai"],
  },
  {
    id: "onboard-ai",
    title: "OnboardAI",
    shortLabel: "02 OnboardAI",
    category: "saas",
    geometryStyle: "pipeline",
    orbitAngle: (Math.PI * 2) / 4,
    orbitRadius: 4.6,
    elevation: 2.4,
    accentHex: 0x60a5fa,
    connections: ["ai-db-track"],
  },
  {
    id: "join-platform",
    title: "JOIN Digital Solutions",
    shortLabel: "03 JOIN Ops",
    category: "clients",
    geometryStyle: "transit",
    orbitAngle: Math.PI,
    orbitRadius: 5.8,
    elevation: 2.0,
    accentHex: 0xc9a96a,
    connections: ["statushub"],
  },
  {
    id: "statushub",
    title: "StatusHub",
    shortLabel: "04 StatusHub",
    category: "saas",
    geometryStyle: "beacon",
    orbitAngle: Math.PI * 1.4,
    orbitRadius: 4.6,
    elevation: 2.2,
    accentHex: 0x60a5fa,
    connections: ["ai-db-track", "join-platform"],
  },
  {
    id: "trading",
    title: "R0TK Trading Journal",
    shortLabel: "05 R0TK",
    category: "fintech",
    geometryStyle: "candlestick",
    orbitAngle: Math.PI * 1.75,
    orbitRadius: 4.8,
    elevation: 2.0,
    accentHex: 0xc9a96a,
    connections: ["statushub"],
  },
];

test("computeProjectNodePosition returns deterministic orbital coordinates", () => {
  const pos = computeProjectNodePosition(0, 5, 2.3);
  assert.equal(pos.x, 5);
  assert.equal(pos.y, 2.3);
  assert.equal(pos.z, 0);

  const quarter = computeProjectNodePosition(Math.PI / 2, 5, 1.5);
  assert.ok(Math.abs(quarter.x) < 0.001);
  assert.equal(quarter.y, 1.5);
  assert.equal(quarter.z, 5);
});

test("buildWebEdges links every project to the hub and deduplicates cross-links", () => {
  const edges = buildWebEdges(sampleNodes);
  const hubLinks = edges.filter((e) => e.kind === "hub-link");
  const crossLinks = edges.filter((e) => e.kind === "cross-link");

  assert.equal(hubLinks.length, sampleNodes.length);
  for (const link of hubLinks) {
    assert.deepEqual(link.from, HUB_CORE_POSITION);
  }

  // Unique pairs: (ai-db-track, statushub), (ai-db-track, onboard-ai), (join-platform, statushub), (statushub, trading)
  assert.equal(crossLinks.length, 4);
  const ids = new Set(crossLinks.map((e) => e.id));
  assert.equal(ids.size, 4);
});

test("interpolateCameraState clamps at boundaries and includes trading waypoint", () => {
  assert.ok(SECTION_WAYPOINTS.some((w) => w.sectionId === "trading"));

  const start = interpolateCameraState(-0.5, SECTION_WAYPOINTS);
  assert.deepEqual(start.position, SECTION_WAYPOINTS[0].position);
  assert.equal(start.activeSectionId, "about");

  const end = interpolateCameraState(1.5, SECTION_WAYPOINTS);
  const last = SECTION_WAYPOINTS[SECTION_WAYPOINTS.length - 1];
  assert.deepEqual(end.position, last.position);
  assert.equal(end.activeSectionId, last.sectionId);

  const mid = interpolateCameraState(0.5, SECTION_WAYPOINTS);
  assert.ok(Number.isFinite(mid.position.x));
  assert.ok(Number.isFinite(mid.position.y));
  assert.ok(Number.isFinite(mid.position.z));
});

test("computeFocusCameraForNode frames target node cleanly", () => {
  const focus = computeFocusCameraForNode({ x: 4, y: 2, z: 0 }, 4);
  assert.deepEqual(focus.target, { x: 4, y: 2, z: 0 });
  assert.ok(focus.position.x > 4);
  assert.ok(focus.position.y > 2);
});

test("dampValue converges smoothly toward target without overshooting", () => {
  const v1 = dampValue(0, 10, 6, 0.016);
  assert.ok(v1 > 0 && v1 < 10);
  const vSame = dampValue(5, 10, 6, 0);
  assert.equal(vSame, 5);
});

test("filterProjects filters by category and preserves all on 'all'", () => {
  assert.equal(filterProjects(sampleNodes, "all").length, 5);
  assert.equal(filterProjects(sampleNodes, "saas").length, 3);
  assert.equal(filterProjects(sampleNodes, "clients").length, 1);
  assert.equal(filterProjects(sampleNodes, "fintech").length, 1);
});

test("validateContactForm rejects invalid inputs and accepts complete valid submissions", () => {
  const invalid = validateContactForm({
    name: "J",
    email: "not-an-email",
    subject: "Hi",
    message: "Too short",
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: "Jehoiachin",
    email: "jehoiachinkatemangwe1@gmail.com",
    subject: "Transit Payment Integration",
    message: "Looking to collaborate on StatusHub webhook automation.",
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
