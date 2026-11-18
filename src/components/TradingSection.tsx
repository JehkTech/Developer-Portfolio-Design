import { TRADING_PILLARS } from "../data/portfolioData";
import { MotionReveal } from "./MotionReveal";

export function TradingSection() {
  return (
    <section id="trading" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <MotionReveal className="mb-12 pb-8 border-b border-[var(--border-hairline)] max-w-2xl pointer-events-auto">
          <p className="text-xs font-mono uppercase tracking-[0.26em] text-[var(--accent-gold)] mb-3">
            Systematic Trading
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight text-balance mb-3">
            R0TK <strong className="font-semibold">Framework</strong>
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            A rules-based prop trading operation. Higher-timeframe structure,
            intermediate liquidity, lower-timeframe entry. No confirmation, no
            trade.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          {TRADING_PILLARS.map((pillar, index) => (
            <MotionReveal key={pillar.title} delay={index * 0.06}>
              <article className="h-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg p-6 flex flex-col justify-between hover:border-[var(--accent-gold)]/55 transition-colors duration-150">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent-gold)] mb-2">
                    {pillar.tag}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)] list-disc pl-4 mb-5">
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs font-mono text-[var(--text-muted)] pt-4 border-t border-[var(--border-hairline)]">
                  {pillar.chips.join(" · ")}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={0.12}>
          <p className="mt-12 font-display text-2xl md:text-3xl font-light text-[var(--text-secondary)] pointer-events-auto">
            Stillness is also a position.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
