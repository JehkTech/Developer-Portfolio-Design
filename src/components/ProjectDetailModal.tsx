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
      className="fixed inset-x-0 top-16 bottom-24 z-50 flex items-center justify-end px-4 md:px-6 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="w-full max-w-lg bg-[#121418] border border-white/15 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-h-full flex flex-col">
        <div className="relative h-52 bg-[#16181c] shrink-0">
          <img
            src={project.image}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-black/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project inspector"
            className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#0a0a0a]/90 border border-white/15 text-[#ededed] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-5 right-5">
            <p className="text-xs font-mono text-[#c9a96a] mb-1">
              {project.typeLabel} · {project.statusLabel}
            </p>
            <h3
              id="project-modal-title"
              className="font-display text-xl font-semibold text-white"
            >
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto">
          <p className="text-sm text-[#c0c4cc] leading-relaxed">
            {project.description}
          </p>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-medium text-[#8b9099] mb-2">
              Architecture &amp; Design Notes
            </h4>
            <p className="text-sm text-[#c0c4cc] leading-relaxed">
              {project.architectureNotes}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-medium text-[#8b9099] mb-2">
              Stack Components
            </h4>
            <p className="text-sm font-mono text-[#ededed]">
              {project.tech.join(" · ")}
            </p>
          </div>

          {connectedProjects.length > 0 && (
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-xs font-medium text-[#8b9099] mb-2.5">
                Linked Web Nodes (Follow 3D Thread)
              </h4>
              <div className="flex flex-wrap gap-2">
                {connectedProjects.map((linked) => (
                  <button
                    key={linked.id}
                    type="button"
                    onClick={() => onSelectConnectedProject(linked.id)}
                    className="px-3 py-1.5 text-xs font-medium bg-[#181b21] border border-white/12 rounded-lg text-[#ededed] hover:border-[#c9a96a]/65 hover:text-[#c9a96a] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{linked.shortLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#c9a96a] text-[#0a0a0a] rounded-lg hover:bg-[#d8bc82] transition-colors whitespace-nowrap shrink-0"
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
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-[#181b21] border border-white/15 text-[#ededed] rounded-lg hover:border-[#c9a96a]/60 hover:text-[#c9a96a] transition-colors whitespace-nowrap shrink-0"
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
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#ededed] text-[#0a0a0a] rounded-lg hover:bg-[#c9a96a] transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#c0c4cc] border border-white/15 rounded-lg hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            >
              Return to Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
