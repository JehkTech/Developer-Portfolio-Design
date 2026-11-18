import { useEffect } from "react";
import { ArrowRight, ExternalLink, Github, X } from "lucide-react";
import { PROJECTS, type PortfolioProject } from "../data/portfolioData";

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectConnectedProject: (projectId: string) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onSelectConnectedProject,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const connectedProjects = project.connections
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is PortfolioProject => Boolean(p));

  return (
    <div
      className="fixed inset-x-0 top-16 bottom-6 z-50 flex items-center justify-end px-4 md:px-6 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="w-full max-w-lg bg-[var(--bg-surface-solid)] border border-[var(--border-hairline)] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-h-full flex flex-col">
        <div className="relative h-52 bg-[var(--bg-inset)] shrink-0">
          <img
            src={project.image}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project inspector"
            className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/75 border border-white/20 text-white hover:bg-black flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-5 right-5">
            <p className="text-xs font-mono text-[#e5cfa3] mb-1">
              {project.typeLabel} · {project.statusLabel}
            </p>
            <h2
              id="project-modal-title"
              className="font-display text-xl font-semibold text-white"
            >
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {project.description}
          </p>

          <div className="border-t border-[var(--border-hairline)] pt-4">
            <h3 className="text-xs font-medium text-[var(--text-muted)] mb-2">
              Architecture &amp; Design Notes
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.architectureNotes}
            </p>
          </div>

          <div className="border-t border-[var(--border-hairline)] pt-4">
            <h3 className="text-xs font-medium text-[var(--text-muted)] mb-2">
              Stack Components
            </h3>
            <p className="text-sm font-mono text-[var(--text-primary)]">
              {project.tech.join(" · ")}
            </p>
          </div>

          {connectedProjects.length > 0 && (
            <div className="border-t border-[var(--border-hairline)] pt-4">
              <h3 className="text-xs font-medium text-[var(--text-muted)] mb-2.5">
                Linked Web Nodes (Follow 3D Thread)
              </h3>
              <div className="flex flex-wrap gap-2">
                {connectedProjects.map((linked) => (
                  <button
                    key={linked.id}
                    type="button"
                    onClick={() => onSelectConnectedProject(linked.id)}
                    className="px-3 py-1.5 text-xs font-medium bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-lg text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{linked.shortLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[var(--border-hairline)] pt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Site</span>
                </a>
              )}

              {project.secondaryLinks?.map((sec) => (
                <a
                  key={sec.url}
                  href={sec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-[var(--bg-inset)] border border-[var(--border-hairline)] text-[var(--text-primary)] rounded-lg hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors whitespace-nowrap shrink-0"
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
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[var(--text-primary)] text-[var(--bg-canvas)] rounded-lg hover:bg-[var(--accent-gold)] hover:text-[var(--accent-gold-contrast)] transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] border border-[var(--border-hairline)] rounded-lg hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              Return to Scroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
