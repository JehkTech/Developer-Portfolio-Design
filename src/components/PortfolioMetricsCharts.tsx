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
    ? "rgba(244, 239, 230, 0.1)"
    : "rgba(17, 17, 22, 0.08)";
  const tickColor = isDark ? "#938fa6" : "#5d596b";
  const coralBar = isDark ? "#ff7162" : "#be3426";
  const violetBar = isDark ? "#9d6bff" : "#6d3cf2";
  const sageBar = isDark ? "#57d9a3" : "#178260";
  const cobaltBar = isDark ? "#5c8aff" : "#2457e6";
  const amberBar = isDark ? "#ffad66" : "#c76a1e";
  const techBarSequence = [violetBar, coralBar, cobaltBar, sageBar, amberBar];

  const tooltipStyle = {
    backgroundColor: isDark ? "#17171f" : "#fbf9f5",
    border: isDark
      ? "1px solid rgba(244, 239, 230, 0.18)"
      : "1px solid rgba(17, 17, 22, 0.14)",
    borderRadius: "8px",
    color: isDark ? "#f4efe6" : "#111116",
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
                        ? coralBar
                        : entry.category === "saas"
                        ? violetBar
                        : sageBar;
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
                style={{ backgroundColor: coralBar }}
              />
              Client Work
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: violetBar }}
              />
              SaaS &amp; AI
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: sageBar }}
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
                <Bar dataKey="count" radius={[0, 5, 5, 0]} barSize={16}>
                  {techData.map((item, idx) => (
                    <Cell
                      key={item.technology}
                      fill={techBarSequence[idx % techBarSequence.length]}
                    />
                  ))}
                </Bar>
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
