import { EXPERIENCES } from "../data/portfolioData";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 px-6 relative pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#090d16]/88 border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="mb-10 pb-8 border-b border-white/10 max-w-2xl">
          <p className="text-xs font-mono text-amber-400 mb-2">
            Career Timeline
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight text-balance mb-3">
            Professional Journey
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Progression from responsive web engineering and Python bootcamp
            mentoring to government revenue infrastructure and multi-sided
            product design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.index}
              className="bg-[#0f1522] border border-white/10 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <span className="font-mono text-xs text-amber-400 tabular-nums">
                    {exp.index} · {exp.company}
                  </span>
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    {exp.period}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {exp.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {exp.description}
                </p>
              </div>

              <p className="text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
                {exp.skills.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}