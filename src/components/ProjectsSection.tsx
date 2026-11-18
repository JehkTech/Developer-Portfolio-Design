import { useState } from "react";
import { Compass, Github, Layers } from "lucide-react";
import { PROJECTS, type PortfolioProject } from "../data/portfolioData";
import { filterProjects, type ProjectCategory } from "../three/portfolioGraph";

interface ProjectsSectionProps {
  activeFilter: ProjectCategory;
  focusedProjectId: string | null;
  onFilterChange: (category: ProjectCategory) => void;
  onFocusProject: (projectId: string) => void;
  onHoverProject: (projectId: string | null) => void;
}

const FILTER_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "blockchain", label: "Blockchain" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "design", label: "Design & Audio" },
];

function ProjectImageFrame({ project }: { project: PortfolioProject }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className="aspect-[4/3] w-full bg-[#131a29] flex flex-col items-center justify-center p-6 text-center border-b border-white/10">
        <Layers className="w-8 h-8 text-amber-400 mb-2" />
        <p className="text-xs font-mono text-slate-300">{project.title}</p>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full overflow-hidden bg-[#131a29] border-b border-white/10 relative">
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

export function ProjectsSection({
  activeFilter,
  focusedProjectId,
  onFilterChange,
  onFocusProject,
  onHoverProject,
}: ProjectsSectionProps) {
  const visibleProjects = filterProjects(PROJECTS, activeFilter);

  return (
    <section
      id="projects"
      className="py-24 px-6 relative pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#090d16]/88 border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div className="max-w-xl">
            <p className="text-xs font-mono text-amber-400 mb-2">
              Interconnected Portfolio Web
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight text-balance mb-3">
              Featured Engineering &amp; Spatial Projects
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Each project forms a satellite node in the 3D hub above, linked by
              shared technical architecture across Rust, Bitcoin Lightning, DeFi,
              trading systems, and sacred geometry.
            </p>
          </div>

          {/* Interactive segmented filter tabs */}
          <div
            className="flex flex-nowrap overflow-x-auto max-w-full items-center gap-1 bg-[#111726] p-1 rounded-xl border border-white/10 self-start xl:self-end shrink-0"
            role="group"
            aria-label="Filter projects by category"
          >
            {FILTER_OPTIONS.map((opt) => {
              const isSelected = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onFilterChange(opt.id)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-slate-950"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, idx) => {
            const isFocused = focusedProjectId === project.id;
            const linkedTitles = project.connections
              .map((cid) => PROJECTS.find((p) => p.id === cid)?.shortLabel)
              .filter(Boolean);

            return (
              <article
                key={project.id}
                onMouseEnter={() => onHoverProject(project.id)}
                onMouseLeave={() => onHoverProject(null)}
                className={`group flex flex-col bg-[#0f1522] border rounded-xl overflow-hidden transition-colors duration-150 ${
                  isFocused
                    ? "border-amber-400"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <ProjectImageFrame project={project} />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-2">
                    <span className="text-amber-400">
                      {String(idx + 1).padStart(2, "0")} · {project.typeLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-white mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 mb-5">
                    <p className="text-xs font-mono text-slate-300">
                      {project.tech.join(" · ")}
                    </p>
                    {linkedTitles.length > 0 && (
                      <p className="text-xs text-sky-300/90">
                        Web links: {linkedTitles.join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onFocusProject(project.id)}
                      className="px-4 py-2 text-xs font-semibold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Focus in 3D</span>
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                      className="px-3 py-2 text-xs font-medium text-slate-300 border border-white/12 rounded-lg hover:text-white hover:border-white/30 transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}