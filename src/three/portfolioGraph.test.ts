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
    id: "trading",
    title: "Trading Journal",
    shortLabel: "01 Trading",
    category: "fullstack",
    geometryStyle: "candlestick",
    orbitAngle: 0,
    orbitRadius: 4.5,
    elevation: 2.0,
    accentHex: 0xf59e0b,
    connections: ["defi", "cymatics"],
  },
  {
    id: "lightning",
    title: "Lightning Gateway",
    shortLabel: "02 Lightning",
    category: "blockchain",
    geometryStyle: "lightning",
    orbitAngle: (Math.PI * 2) / 3,
    orbitRadius: 4.5,
    elevation: 2.4,
    accentHex: 0x38bdf8,
    connections: ["defi"],
  },
  {
    id: "defi",
    title: "DeFi Suite",
    shortLabel: "03 DeFi",
    category: "blockchain",
    geometryStyle: "vault",
    orbitAngle: (Math.PI * 4) / 3,
    orbitRadius: 4.5,
    elevation: 1.8,
    accentHex: 0xf59e0b,
    connections: ["trading", "lightning"],
  },
  {
    id: "cymatics",
    title: "Frequency Healer",
    shortLabel: "04 Healing",
    category: "design",
    geometryStyle: "cymatics",
    orbitAngle: Math.PI * 1.75,
    orbitRadius: 4.5,
    elevation: 2.2,
    accentHex: 0x38bdf8,
    connections: ["trading"],
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

  // Unique pairs: (trading, defi), (trading, cymatics), (lightning, defi) => 3 unique cross-links
  assert.equal(crossLinks.length, 3);
  const ids = new Set(crossLinks.map((e) => e.id));
  assert.equal(ids.size, 3);
});

test("interpolateCameraState clamps at boundaries and transitions smoothly", () => {
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
  assert.equal(filterProjects(sampleNodes, "all").length, 4);
  assert.equal(filterProjects(sampleNodes, "blockchain").length, 2);
  assert.equal(filterProjects(sampleNodes, "fullstack").length, 1);
  assert.equal(filterProjects(sampleNodes, "design").length, 1);
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
    subject: "Lightning Integration",
    message: "Looking to collaborate on a Rust Lightning payment router.",
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
