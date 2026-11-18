import { EXPERIENCES } from "../data/portfolioData";
import { MotionReveal } from "./MotionReveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <MotionReveal className="mb-12 pb-8 border-b border-[var(--border-hairline)] max-w-2xl pointer-events-auto">
          <p className="text-xs font-mono uppercase tracking-[0.26em] text-[var(--accent-coral)] mb-3">
            Experience
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight text-balance mb-3">
            Background &amp; <strong className="font-semibold">Career Orbit</strong>
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            Three years designing cashless logistics interfaces and automating QA
            for live payment flows, alongside SaaS product founding and fintech
            engineering.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
          {EXPERIENCES.map((exp, idx) => (
            <MotionReveal key={exp.index} delay={idx * 0.05}>
              <article className="h-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg p-6 flex flex-col justify-between hover:border-[var(--accent-gold)]/55 transition-colors duration-150">
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <span className="font-mono text-xs text-[var(--accent-gold)] tabular-nums">
                      {exp.index} · {exp.company}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3">
                    {exp.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                    {exp.description}
                  </p>
                </div>

                <p className="text-xs font-mono text-[var(--text-muted)] pt-4 border-t border-[var(--border-hairline)]">
                  {exp.skills.join(" · ")}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}