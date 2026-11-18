import { EXPERIENCES } from "../data/portfolioData";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 px-6 relative pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#101114]/92 border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="mb-10 pb-8 border-b border-white/10 max-w-2xl">
          <p className="text-xs font-mono text-[#c9a96a] mb-2">
            Experience
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-[#ededed] tracking-tight text-balance mb-3">
            Background &amp;{" "}
            <strong className="font-semibold text-white">Career Orbit</strong>
          </h2>
          <p className="text-[#c0c4cc] text-sm md:text-base leading-relaxed">
            Three years designing cashless logistics interfaces and automating QA
            for live payment flows, alongside SaaS product founding and fintech
            engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.index}
              className="bg-[#14161a] border border-white/10 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <span className="font-mono text-xs text-[#c9a96a] tabular-nums">
                    {exp.index} · {exp.company}
                  </span>
                  <span className="font-mono text-xs text-[#8b9099] tabular-nums">
                    {exp.period}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-[#ededed] mb-3">
                  {exp.title}
                </h3>

                <p className="text-sm text-[#c0c4cc] leading-relaxed mb-5">
                  {exp.description}
                </p>
              </div>

              <p className="text-xs font-mono text-[#8b9099] pt-4 border-t border-white/10">
                {exp.skills.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}