import test from "node:test";
import assert from "node:assert/strict";
import {
  buildJournalSpreads,
  buildWebEdges,
  computeFocusCameraForNode,
  computeProjectComplexityMetrics,
  computeProjectNodePosition,
  computeScrollSceneTransform,
  computeTechDistribution,
  dampValue,
  filterProjects,
  getSceneThemePalette,
  HUB_CORE_POSITION,
  interpolateCameraState,
  SECTION_WAYPOINTS,
  stepJournalPage,
  validateContactForm,
  validateJournalEntryInput,
  type CustomJournalEntry,
  type ProjectNodeSpec,
} from "./portfolioGraph";

const sampleNodes: Array<ProjectNodeSpec & { tech: string[] }> = [
  {
    id: "platinum-courier",
    title: "Platinum Courier Services",
    shortLabel: "01 Platinum",
    category: "clients",
    geometryStyle: "courier",
    orbitAngle: 2.15,
    orbitRadius: 5.5,
    elevation: 1.55,
    accentHex: 0xc9a96a,
    connections: ["join-platform"],
    complexityScore: 86,
    tech: ["React", "TypeScript", "Cloudflare Workers"],
  },
  {
    id: "ai-db-track",
    title: "AI-DB Track",
    shortLabel: "02 AI-DB",
    category: "saas",
    geometryStyle: "dbshield",
    orbitAngle: 0,
    orbitRadius: 4.6,
    elevation: 2.1,
    accentHex: 0xc9a96a,
    connections: ["statushub", "onboard-ai"],
    complexityScore: 90,
    tech: ["PostgreSQL", "React", "TypeScript"],
  },
  {
    id: "onboard-ai",
    title: "OnboardAI",
    shortLabel: "03 OnboardAI",
    category: "saas",
    geometryStyle: "pipeline",
    orbitAngle: (Math.PI * 2) / 4,
    orbitRadius: 4.6,
    elevation: 2.4,
    accentHex: 0xc0c4cc,
    connections: ["ai-db-track"],
    complexityScore: 89,
    tech: ["React", "Vite", "Prisma"],
  },
  {
    id: "join-platform",
    title: "JOIN Digital Solutions",
    shortLabel: "04 JOIN Ops",
    category: "clients",
    geometryStyle: "transit",
    orbitAngle: Math.PI,
    orbitRadius: 5.8,
    elevation: 2.0,
    accentHex: 0xc9a96a,
    connections: ["statushub", "platinum-courier"],
    complexityScore: 92,
    tech: ["React", "Transit Systems"],
  },
  {
    id: "statushub",
    title: "StatusHub",
    shortLabel: "05 StatusHub",
    category: "saas",
    geometryStyle: "beacon",
    orbitAngle: Math.PI * 1.4,
    orbitRadius: 4.6,
    elevation: 2.2,
    accentHex: 0xc0c4cc,
    connections: ["ai-db-track", "join-platform"],
    complexityScore: 93,
    tech: ["Next.js 14", "PostgreSQL", "Prisma"],
  },
  {
    id: "trading",
    title: "R0TK Trading Journal",
    shortLabel: "06 R0TK",
    category: "fintech",
    geometryStyle: "candlestick",
    orbitAngle: Math.PI * 1.75,
    orbitRadius: 4.8,
    elevation: 2.0,
    accentHex: 0xc9a96a,
    connections: ["statushub"],
    complexityScore: 87,
    tech: ["React", "Node.js", "PostgreSQL"],
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

  // Unique pairs: (platinum-courier, join-platform), (ai-db-track, statushub), (ai-db-track, onboard-ai), (join-platform, statushub), (statushub, trading)
  assert.equal(crossLinks.length, 5);
  const ids = new Set(crossLinks.map((e) => e.id));
  assert.equal(ids.size, 5);
});

test("computeTechDistribution aggregates and sorts top technologies deterministically", () => {
  const dist = computeTechDistribution(sampleNodes, 4);
  assert.equal(dist[0].technology, "React");
  assert.equal(dist[0].count, 5);
  assert.equal(dist[1].technology, "PostgreSQL");
  assert.equal(dist[1].count, 3);
  assert.equal(dist.length, 4);
});

test("computeProjectComplexityMetrics returns numeric complexity and connection counts", () => {
  const metrics = computeProjectComplexityMetrics(sampleNodes);
  assert.equal(metrics.length, sampleNodes.length);
  assert.equal(metrics[0].name, "Platinum");
  assert.equal(metrics[0].complexity, 86);
  assert.equal(metrics[0].connections, 1);
  assert.equal(metrics[3].connections, 2);
});

test("interpolateCameraState clamps at boundaries and includes clients & trading waypoints", () => {
  assert.ok(SECTION_WAYPOINTS.some((w) => w.sectionId === "clients"));
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

test("computeScrollSceneTransform rotates and elevates constellation smoothly with scroll", () => {
  const top = computeScrollSceneTransform(0);
  const mid = computeScrollSceneTransform(0.5);
  const bottom = computeScrollSceneTransform(1);

  assert.equal(top.constellationYaw, 0);
  assert.ok(mid.constellationYaw > top.constellationYaw);
  assert.ok(bottom.constellationYaw > mid.constellationYaw);
  assert.ok(mid.hubPosY < 0);
  assert.ok(bottom.hubTiltX > top.hubTiltX);
});

test("getSceneThemePalette produces distinct calibrated dark and light palettes", () => {
  const dark = getSceneThemePalette("dark");
  const light = getSceneThemePalette("light");

  assert.equal(dark.background, 0x0d1527);
  assert.equal(light.background, 0xf3f6fc);
  assert.notEqual(dark.goldWire, light.goldWire);
  assert.notEqual(dark.starPrimary, light.starPrimary);
  assert.ok(light.hemiIntensity > dark.hemiIntensity);
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
  assert.equal(filterProjects(sampleNodes, "all").length, 6);
  assert.equal(filterProjects(sampleNodes, "saas").length, 3);
  assert.equal(filterProjects(sampleNodes, "clients").length, 2);
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

test("buildJournalSpreads creates 4 base chapters and paginates custom entries", () => {
  const emptySpreads = buildJournalSpreads([]);
  assert.equal(emptySpreads.length, 4);
  assert.equal(emptySpreads[0].kind, "tesla");
  assert.equal(emptySpreads[3].kind, "notes");

  const fiveEntries: CustomJournalEntry[] = Array.from({ length: 5 }, (_, i) => ({
    id: `entry-${i}`,
    title: `Note ${i + 1}`,
    category: "Reflection",
    body: "Deliberate focus reveals system architecture.",
    createdAt: "2026-11-18",
  }));
  const multiSpreads = buildJournalSpreads(fiveEntries, 4);
  assert.equal(multiSpreads.length, 5);
  assert.equal(multiSpreads[3].kind, "notes");
  assert.equal(multiSpreads[4].kind, "notes");
  if (multiSpreads[3].kind === "notes" && multiSpreads[4].kind === "notes") {
    assert.equal(multiSpreads[3].entries.length, 4);
    assert.equal(multiSpreads[4].entries.length, 1);
  }
});

test("stepJournalPage flips sideways across pages and signals continue-down past final page", () => {
  assert.deepEqual(stepJournalPage(0, 4, -1), {
    nextIndex: 0,
    outcome: "boundary-start",
  });
  assert.deepEqual(stepJournalPage(0, 4, 1), {
    nextIndex: 1,
    outcome: "flipped",
  });
  assert.deepEqual(stepJournalPage(3, 4, 1), {
    nextIndex: 3,
    outcome: "continue-down",
  });
});

test("validateJournalEntryInput enforces title and body constraints", () => {
  const bad = validateJournalEntryInput({
    title: "A",
    category: "Quote",
    body: "Ok",
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.title);
  assert.ok(bad.errors.body);

  const ok = validateJournalEntryInput({
    title: "3-6-9 Alignment",
    category: "Numeric Code",
    code: "369963",
    body: "Focus daily on deliberate creative engineering.",
  });
  assert.equal(ok.valid, true);
  assert.deepEqual(ok.errors, {});
});

