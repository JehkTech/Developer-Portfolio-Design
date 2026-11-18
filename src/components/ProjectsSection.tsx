import { useState, type MouseEvent } from "react";
import { Compass, ExternalLink, Github, Layers } from "lucide-react";
import { PROJECTS, type PortfolioProject } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { filterProjects, type ProjectCategory } from "../three/portfolioGraph";

interface ProjectsSectionProps {
  activeFilter: ProjectCategory;
  focusedProjectId: string | null;
  onFilterChange: (category: ProjectCategory) => void;
  onFocusProject: (projectId: string) => void;
  onHoverProject: (projectId: string | null) => void;
}

const FILTER_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Work (9)" },
  { id: "clients", label: "Client Work (3)" },
  { id: "saas", label: "SaaS & AI (4)" },
  { id: "fintech", label: "Fintech & Trading (2)" },
];

function ProjectImageFrame({ project }: { project: PortfolioProject }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className="aspect-[4/3] w-full bg-[var(--bg-inset)] flex flex-col items-center justify-center p-6 text-center border-b border-[var(--border-hairline)]">
        <Layers className="w-8 h-8 text-[var(--accent-gold)] mb-2" />
        <p className="text-xs font-mono text-[var(--text-secondary)]">
          {project.title}
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--bg-inset)] border-b border-[var(--border-hairline)] relative">
      <img
        src={project.image}
        alt={project.imageAlt}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
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
      `perspective(900px) rotateY(${(x * 5).toFixed(2)}deg) rotateX(${(-y * 5).toFixed(2)}deg) translateY(-3px)`
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
      className={`group flex flex-col bg-[var(--bg-surface)] border rounded-lg overflow-hidden transition-[border-color,transform] duration-200 will-change-transform ${
        isFocused
          ? "border-[var(--accent-gold)]"
          : "border-[var(--border-hairline)] hover:border-[var(--accent-gold)]/60"
      }`}
    >
      <ProjectImageFrame project={project} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 text-xs font-mono mb-2">
          <span className="text-[var(--accent-gold)] tabular-nums">
            {String(index + 1).padStart(2, "0")} · {project.typeLabel}
          </span>
          <span className="text-[var(--text-muted)] whitespace-nowrap">
            {project.statusLabel}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2.5">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="space-y-2 pt-4 border-t border-[var(--border-hairline)] mb-5">
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
  activeFilter,
  focusedProjectId,
  onFilterChange,
  onFocusProject,
  onHoverProject,
}: ProjectsSectionProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const visibleProjects = filterProjects(PROJECTS, activeFilter);
  const clientProjects = PROJECTS.filter((p) => p.category === "clients");
  const productProjects = PROJECTS.filter((p) => p.category !== "clients");

  return (
    <section
      id="projects"
      className="py-24 px-6 relative pointer-events-none"
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto reveal-block ${visible ? "is-visible" : ""}`}
      >
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12 pb-8 border-b border-[var(--border-hairline)] pointer-events-auto">
          <div className="max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.26em] text-[var(--accent-gold)] mb-3">
              Portfolio · Client Work &amp; Shipped Systems
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight text-balance mb-3">
              Client Deployments &amp;{" "}
              <strong className="font-semibold">Products</strong>
            </h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
              Production client platforms, AI SaaS products, and fintech tooling
              — click any node in the 3D web or focus a card below to inspect
              its connections.
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
        </div>

        {activeFilter === "all" ? (
          <div className="space-y-16 pointer-events-auto">
            {/* Explicit Client Work Portfolio Group */}
            <div id="clients" className="scroll-mt-20">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent-gold)] mb-1">
                    01 · Client Work
                  </p>
                  <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
                    Live Client Deployments &amp; Transit Infrastructure
                  </h3>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Car Guy Zambia · JOIN Transit · JOIN Merchant Pay
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* SaaS Products, AI & Fintech Portfolio Group */}
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
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}