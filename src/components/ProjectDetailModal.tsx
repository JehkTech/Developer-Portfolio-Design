import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Github, Globe, X } from "lucide-react";
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
  const [previewMode, setPreviewMode] = useState<"snapshot" | "iframe">("snapshot");

  useEffect(() => {
    setPreviewMode("snapshot");
  }, [project?.id]);

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
      <div className="w-full max-w-xl bg-[var(--bg-surface-solid)] border border-[var(--border-hairline)] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-h-full flex flex-col">
        {/* Browser Chrome Header + Live Preview Toggle */}
        <div className="px-4 py-2.5 bg-[var(--bg-inset)] border-b border-[var(--border-hairline)] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
            <span className="font-mono text-xs text-[var(--text-secondary)] truncate">
              {project.domainLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.live && (
              <div
                className="flex items-center bg-[var(--bg-surface-solid)] border border-[var(--border-hairline)] rounded-md p-0.5"
                role="group"
                aria-label="Preview mode"
              >
                <button
                  type="button"
                  onClick={() => setPreviewMode("snapshot")}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                    previewMode === "snapshot"
                      ? "bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  Snapshot
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("iframe")}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                    previewMode === "iframe"
                      ? "bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  Live Frame
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project inspector"
              className="w-8 h-8 rounded-lg bg-[var(--bg-surface-solid)] border border-[var(--border-hairline)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Viewport */}
        <div className="relative h-60 bg-[#0f1116] shrink-0 border-b border-[var(--border-hairline)]">
          {previewMode === "iframe" && project.live ? (
            <iframe
              src={project.live}
              title={`Live website preview of ${project.title}`}
              className="w-full h-full bg-white border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : project.image ? (
            <>
              <img
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
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
            </>
          ) : (
            <div className="w-full h-full p-6 flex flex-col justify-between bg-[#0f1116] text-white">
              <p className="text-xs font-mono text-[#e5cfa3]">
                {project.typeLabel} · {project.statusLabel}
              </p>
              <div className="font-mono text-xs text-[#c0c4cc] border border-white/10 rounded-lg p-3 bg-[#151820]">
                POST /webhooks/ingest · GET /events/stream · PostgreSQL GIN
              </div>
              <h2
                id="project-modal-title"
                className="font-display text-xl font-semibold text-white"
              >
                {project.title}
              </h2>
            </div>
          )}
        </div>

        <div className="p-5 space-y-5 overflow-y-auto">
          {previewMode === "iframe" && (
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--border-hairline)]">
              <h2
                id="project-modal-title"
                className="font-display text-lg font-semibold text-[var(--text-primary)]"
              >
                {project.title}
              </h2>
              <span className="text-xs font-mono text-[var(--accent-gold)]">
                {project.statusLabel}
              </span>
            </div>
          )}

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
