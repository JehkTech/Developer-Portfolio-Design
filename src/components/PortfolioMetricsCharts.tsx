import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PROJECTS } from "../data/portfolioData";
import {
  computeProjectComplexityMetrics,
  computeTechDistribution,
  type PortfolioTheme,
} from "../three/portfolioGraph";
import { MotionReveal } from "./MotionReveal";

interface PortfolioMetricsChartsProps {
  theme: PortfolioTheme;
}

export function PortfolioMetricsCharts({ theme }: PortfolioMetricsChartsProps) {
  const complexityData = computeProjectComplexityMetrics(PROJECTS);
  const techData = computeTechDistribution(PROJECTS, 8);

  const isDark = theme === "dark";
  const gridStroke = isDark
    ? "rgba(184, 212, 255, 0.1)"
    : "rgba(13, 21, 39, 0.08)";
  const tickColor = isDark ? "#83a1d1" : "#4e6287";
  const goldBar = isDark ? "#3b8eff" : "#1967dc";
  const silverBar = isDark ? "#b8d4ff" : "#647ea8";
  const emeraldBar = isDark ? "#38bdf8" : "#0284c7";

  const tooltipStyle = {
    backgroundColor: isDark ? "#121d33" : "#ffffff",
    border: isDark
      ? "1px solid rgba(184, 212, 255, 0.2)"
      : "1px solid rgba(13, 21, 39, 0.14)",
    borderRadius: "8px",
    color: isDark ? "#f0f5ff" : "#0d1527",
    fontSize: "12px",
  };

  return (
    <MotionReveal className="mt-16 pointer-events-auto" delay={0.08}>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent-gold)] mb-1">
            03 · Portfolio Analytics
          </p>
          <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
            System Complexity &amp; Tech Stack Distribution
          </h3>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)]">
          Computed across all {PROJECTS.length} linked deployments
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Project Complexity Score across all 10 systems */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-xl p-6 min-w-0">
          <div className="flex items-baseline justify-between gap-3 mb-5">
            <div>
              <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                Architecture Complexity Index
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Composite scope score across client, SaaS, and fintech builds
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--accent-gold)] tabular-nums shrink-0">
              0 – 100 Scale
            </span>
          </div>

          <div className="h-64 w-full min-w-0" data-testid="recharts-complexity">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={complexityData}
                margin={{ top: 6, right: 8, left: -18, bottom: 24 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={gridStroke}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: tickColor, fontSize: 10 }}
                  axisLine={{ stroke: gridStroke }}
                  tickLine={false}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={48}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{
                    fill: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(20,21,24,0.04)",
                  }}
                  contentStyle={tooltipStyle}
                  formatter={(value: number) => [`${value} / 100`, "Complexity"]}
                />
                <Bar dataKey="complexity" radius={[5, 5, 0, 0]} maxBarSize={28}>
                  {complexityData.map((entry) => {
                    const fill =
                      entry.category === "clients"
                        ? goldBar
                        : entry.category === "saas"
                        ? silverBar
                        : emeraldBar;
                    return <Cell key={entry.name} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: goldBar }}
              />
              Client Work
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: silverBar }}
              />
              SaaS &amp; AI
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: emeraldBar }}
              />
              Fintech &amp; Trading
            </span>
          </div>
        </div>

        {/* Chart 2: Tech Stack Distribution */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-xl p-6 min-w-0">
          <div className="flex items-baseline justify-between gap-3 mb-5">
            <div>
              <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                Tech Stack Distribution
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Most-deployed frameworks, databases, and automation layers
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--accent-gold)] tabular-nums shrink-0">
              Top 8 Technologies
            </span>
          </div>

          <div className="h-64 w-full min-w-0" data-testid="recharts-tech">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={techData}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 10, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={gridStroke}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={{ stroke: gridStroke }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="technology"
                  width={106}
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{
                    fill: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(20,21,24,0.04)",
                  }}
                  contentStyle={tooltipStyle}
                  formatter={(value: number) => [
                    `${value} system${value === 1 ? "" : "s"}`,
                    "Deployments",
                  ]}
                />
                <Bar
                  dataKey="count"
                  fill={goldBar}
                  radius={[0, 5, 5, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>React &amp; TypeScript lead frontend delivery</span>
            <span>PostgreSQL &amp; Prisma back core SaaS</span>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}
