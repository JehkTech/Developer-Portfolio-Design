import { useEffect } from "react";
import { ArrowRight, Github, X } from "lucide-react";
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
      <div
        className="w-full max-w-lg bg-[#0d121d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-h-full flex flex-col"
      >
        <div className="relative h-52 bg-[#131a29] shrink-0">
          <img
            src={project.image}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-black/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project inspector"
            className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#07090e]/90 border border-white/15 text-slate-200 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-5 right-5">
            <p className="text-xs font-mono text-amber-400 mb-1">
              {project.typeLabel}
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
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-medium text-slate-400 mb-2">
              Architecture &amp; Design Notes
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.architectureNotes}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-medium text-slate-400 mb-2">
              Stack Components
            </h4>
            <p className="text-sm font-mono text-slate-200">
              {project.tech.join(" · ")}
            </p>
          </div>

          {connectedProjects.length > 0 && (
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-xs font-medium text-slate-400 mb-2.5">
                Linked Web Nodes (Follow 3D Thread)
              </h4>
              <div className="flex flex-wrap gap-2">
                {connectedProjects.map((linked) => (
                  <button
                    key={linked.id}
                    type="button"
                    onClick={() => onSelectConnectedProject(linked.id)}
                    className="px-3 py-1.5 text-xs font-medium bg-[#141c2c] border border-white/12 rounded-lg text-slate-200 hover:border-amber-400/60 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{linked.shortLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              <Github className="w-4 h-4" />
              <span>View Repository</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 border border-white/15 rounded-lg hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            >
              Return to Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
