import { useState, type MouseEvent } from "react";
import { Compass, ExternalLink, Github, Globe } from "lucide-react";
import { PROJECTS, type PortfolioProject } from "../data/portfolioData";
import {
  filterProjects,
  type PortfolioTheme,
  type ProjectCategory,
} from "../three/portfolioGraph";
import { MotionReveal } from "./MotionReveal";
import { PortfolioMetricsCharts } from "./PortfolioMetricsCharts";

interface ProjectsSectionProps {
  theme: PortfolioTheme;
  activeFilter: ProjectCategory;
  focusedProjectId: string | null;
  onFilterChange: (category: ProjectCategory) => void;
  onFocusProject: (projectId: string) => void;
  onHoverProject: (projectId: string | null) => void;
}

const FILTER_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Work (10)" },
  { id: "clients", label: "Client Work (4)" },
  { id: "saas", label: "SaaS & AI (4)" },
  { id: "fintech", label: "Fintech & Trading (2)" },
];

function WebsitePreviewFrame({
  project,
  onFocus,
}: {
  project: PortfolioProject;
  onFocus: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="p-3 pb-0 bg-[var(--bg-inset)]/60">
      <div className="rounded-lg border border-[var(--border-hairline)] overflow-hidden bg-[var(--bg-surface-solid)] shadow-sm">
        {/* Minimalist getdesign-inspired browser chrome */}
        <div className="h-7 px-3 flex items-center justify-between gap-2 border-b border-[var(--border-hairline)] bg-[var(--bg-inset)]">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]/35" />
            <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]/35" />
            <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]/35" />
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)] truncate">
            {project.domainLabel}
          </span>
          <Globe className="w-3 h-3 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={onFocus}
          aria-label={`Inspect ${project.title} preview and 3D node`}
          className="block w-full aspect-[16/10] overflow-hidden bg-[var(--bg-inset)] relative cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--accent-gold)]"
        >
          {project.image && !imgFailed ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            /* Authentic live architecture endpoint view for sites without a hydrated static frame */
            <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0f1116] text-[#ededed]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#c9a96a]">
                <span>{project.title}</span>
                <span>{project.statusLabel}</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px] text-[#c0c4cc] border border-white/10 rounded-md p-3 bg-[#151820]">
                <div className="text-[#ededed] font-semibold">
                  api-statushub.netlify.app
                </div>
                <div>POST /webhooks/ingest · HMAC Verified</div>
                <div>GET /events/stream · Server-Sent Events</div>
                <div className="text-[#8b9099]">
                  PostgreSQL GIN Search · Express Workers
                </div>
              </div>
              <div className="text-[11px] text-[#8b9099] font-mono">
                Click to inspect 3D node &amp; live link
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

function PortfolioCard({
  project,
  index,
  isFocused,
  onFocusProject,
  onHoverProject,
}: {
  project: PortfolioProject;
  index: number;
  isFocused: boolean;
  onFocusProject: (projectId: string) => void;
  onHoverProject: (projectId: string | null) => void;
}) {
  const [tilt, setTilt] = useState<string>("");

  const linkedTitles = project.connections
    .map((cid) => PROJECTS.find((p) => p.id === cid)?.shortLabel)
    .filter(Boolean);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt(
      `perspective(1000px) rotateY(${(x * 4.5).toFixed(2)}deg) rotateX(${(-y * 4.5).toFixed(2)}deg) translateY(-4px)`
    );
  };

  return (
    <article
      onMouseEnter={() => onHoverProject(project.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        onHoverProject(null);
        setTilt("");
      }}
      style={tilt ? { transform: tilt } : undefined}
      className={`group flex flex-col bg-[var(--bg-surface)] border rounded-xl overflow-hidden transition-[border-color,transform,box-shadow] duration-200 will-change-transform ${
        isFocused
          ? "border-[var(--accent-gold)] shadow-lg"
          : "border-[var(--border-hairline)] hover:border-[var(--accent-gold)]/65 hover:shadow-md"
      }`}
    >
      <WebsitePreviewFrame
        project={project}
        onFocus={() => onFocusProject(project.id)}
      />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 text-xs font-mono mb-2">
          <span className="text-[var(--accent-gold)] tabular-nums">
            {String(index + 1).padStart(2, "0")} · {project.typeLabel}
          </span>
          <span className="text-[var(--text-muted)] whitespace-nowrap">
            {project.statusLabel}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="space-y-1.5 pt-4 border-t border-[var(--border-hairline)] mb-5">
          <p className="text-xs font-mono text-[var(--text-secondary)]">
            {project.tech.join(" · ")}
          </p>
          {linkedTitles.length > 0 && (
            <p className="text-xs text-[var(--text-muted)]">
              Web links: {linkedTitles.join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onFocusProject(project.id)}
            className="px-3.5 py-2 text-xs font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Focus in 3D</span>
          </button>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live deployment for ${project.title}`}
              className="px-3 py-2 text-xs font-medium text-[var(--text-primary)] border border-[var(--border-hairline)] rounded-lg hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>
          )}

          {project.secondaryLinks?.map((sec) => (
            <a
              key={sec.url}
              href={sec.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${sec.label} for ${project.title}`}
              className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-hairline)] rounded-lg hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </a>
          ))}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-hairline)] rounded-lg hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({
  theme,
  activeFilter,
  focusedProjectId,
  onFilterChange,
  onFocusProject,
  onHoverProject,
}: ProjectsSectionProps) {
  const visibleProjects = filterProjects(PROJECTS, activeFilter);
  const clientProjects = PROJECTS.filter((p) => p.category === "clients");
  const productProjects = PROJECTS.filter((p) => p.category !== "clients");

  return (
    <section id="projects" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <MotionReveal className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12 pb-8 border-b border-[var(--border-hairline)] pointer-events-auto">
          <div className="max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.26em] text-[var(--accent-gold)] mb-3">
              Portfolio · Client Work &amp; Shipped Systems
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight text-balance mb-3">
              Client Deployments &amp;{" "}
              <strong className="font-semibold">Products</strong>
            </h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
              Live website previews from production client deployments, AI SaaS
              products, and fintech tooling — synchronized with the 3D web.
            </p>
          </div>

          <div
            className="flex flex-nowrap overflow-x-auto max-w-full items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-lg border border-[var(--border-hairline)] self-start xl:self-end shrink-0"
            role="group"
            aria-label="Filter portfolio by category"
          >
            {FILTER_OPTIONS.map((opt) => {
              const isSelected = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onFilterChange(opt.id)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {activeFilter === "all" ? (
          <div className="space-y-16 pointer-events-auto">
            {/* Explicit Client Work Portfolio Group */}
            <MotionReveal className="scroll-mt-20">
              <div id="clients" className="scroll-mt-20">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent-gold)] mb-1">
                      01 · Client Work
                    </p>
                    <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
                      Live Client Deployments &amp; Logistics Systems
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Platinum Courier · Car Guy · JOIN Transit · JOIN Pay
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clientProjects.map((project, idx) => (
                    <PortfolioCard
                      key={project.id}
                      project={project}
                      index={idx}
                      isFocused={focusedProjectId === project.id}
                      onFocusProject={onFocusProject}
                      onHoverProject={onHoverProject}
                    />
                  ))}
                </div>
              </div>
            </MotionReveal>

            {/* SaaS Products, AI & Fintech Portfolio Group */}
            <MotionReveal delay={0.05}>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent-gold)] mb-1">
                      02 · SaaS, AI &amp; Fintech Systems
                    </p>
                    <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
                      Proprietary Products &amp; Platform Builds
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    AI-DB Track · Luminous Pixels · OnboardAI · StatusHub · R0TK · Mamastops
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productProjects.map((project, idx) => (
                    <PortfolioCard
                      key={project.id}
                      project={project}
                      index={idx + clientProjects.length}
                      isFocused={focusedProjectId === project.id}
                      onFocusProject={onFocusProject}
                      onHoverProject={onHoverProject}
                    />
                  ))}
                </div>
              </div>
            </MotionReveal>
          </div>
        ) : (
          <MotionReveal>
            <div
              id="clients"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto scroll-mt-20"
            >
              {visibleProjects.map((project, idx) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={idx}
                  isFocused={focusedProjectId === project.id}
                  onFocusProject={onFocusProject}
                  onHoverProject={onHoverProject}
                />
              ))}
            </div>
          </MotionReveal>
        )}

        {/* Recharts Project Complexity & Tech Stack Distribution Section */}
        <PortfolioMetricsCharts theme={theme} />
      </div>
    </section>
  );
}