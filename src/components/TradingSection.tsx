import { TRADING_PILLARS } from "../data/portfolioData";

export function TradingSection() {
  return (
    <section
      id="trading"
      className="py-24 px-6 relative pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#101114]/92 border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="mb-10 pb-8 border-b border-white/10 max-w-2xl">
          <p className="text-xs font-mono text-[#c9a96a] mb-2">
            Systematic Trading
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-[#ededed] tracking-tight text-balance mb-3">
            R0TK <strong className="font-semibold text-white">Framework</strong>
          </h2>
          <p className="text-[#c0c4cc] text-sm md:text-base leading-relaxed">
            A rules-based prop trading operation. Higher-timeframe structure,
            intermediate liquidity, lower-timeframe entry. No confirmation, no
            trade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRADING_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="bg-[#14161a] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-[#c9a96a]/45 transition-colors duration-150"
            >
              <div>
                <p className="text-xs font-mono text-[#c9a96a] mb-2">
                  {pillar.tag}
                </p>
                <h3 className="font-display text-xl font-semibold text-[#ededed] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#c0c4cc] leading-relaxed mb-4">
                  {pillar.description}
                </p>
                <ul className="space-y-2 text-sm text-[#c0c4cc] list-disc pl-4 mb-5">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <p className="text-xs font-mono text-[#8b9099] pt-4 border-t border-white/10">
                {pillar.chips.join(" · ")}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 pt-6 border-t border-white/10 font-display text-xl md:text-2xl font-light text-[#c0c4cc]">
          Stillness is also a position.
        </p>
      </div>
    </section>
  );
}
