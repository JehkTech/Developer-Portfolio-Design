import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  GRABOVOI_CODES,
  SPIRITUAL_INSIGHTS,
  TESLA_NUMBERS,
} from "../data/portfolioData";

export function SpiritualSection() {
  const [revealedCodes, setRevealedCodes] = useState<Record<string, boolean>>({});

  const toggleCode = (code: string) => {
    setRevealedCodes((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  return (
    <section id="wisdom" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#090d16]/88 border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="mb-10 pb-8 border-b border-white/10 max-w-2xl">
          <p className="text-xs font-mono text-amber-400 mb-2">
            Harmonic Philosophy &amp; Sacred Geometry
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight text-balance mb-3">
            Universal Codes &amp; Wisdom
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Integrating Tesla&apos;s 3-6-9 harmonic ratios and intentional focus
            principles alongside disciplined engineering execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tesla 3-6-9 Harmonic Card */}
          <div className="bg-[#0f1522] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-white mb-6">
                Universe Wisdom · 3 · 6 · 9
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {TESLA_NUMBERS.map((item) => (
                  <div
                    key={item.digit}
                    className="bg-[#141c2c] border border-white/10 rounded-lg p-4 text-center"
                  >
                    <div className="font-display text-2xl font-semibold text-amber-400 tabular-nums mb-1">
                      {item.digit}
                    </div>
                    <p className="text-xs text-slate-300">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 border-t border-white/10 pt-5">
              <p className="italic leading-relaxed">
                &ldquo;If you only knew the magnificence of the 3, 6 and 9, then
                you would have the key to the universe.&rdquo; — Nikola Tesla
              </p>
              <p className="italic leading-relaxed border-t border-white/8 pt-4">
                &ldquo;If you want to find the secrets of the universe, think in
                terms of energy, frequency and vibration.&rdquo; — Nikola Tesla
              </p>
              <p className="italic leading-relaxed border-t border-white/8 pt-4">
                &ldquo;Whatever the mind of man can imagine, man can
                realise.&rdquo; — Neville Goddard
              </p>
              <p className="font-display text-base font-medium text-amber-300 border-t border-white/8 pt-4">
                Quid Est Veritas?
              </p>
            </div>
          </div>

          {/* Grabovoi Quantum Healing Codes (Accessible click + hover reveal) */}
          <div className="bg-[#0f1522] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="font-display text-xl font-semibold text-white">
                  Quantum Healing Codes
                </h3>
                <span className="text-xs text-slate-400">
                  Select or hover to reveal
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Numerical resonance sequences focused on clarity, abundance,
                and deliberate state shifts.
              </p>

              <div className="space-y-3">
                {GRABOVOI_CODES.map((item) => {
                  const isRevealed = Boolean(revealedCodes[item.code]);
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => toggleCode(item.code)}
                      aria-pressed={isRevealed}
                      className="group w-full flex items-center justify-between gap-4 p-4 bg-[#141c2c] border border-white/10 rounded-lg hover:border-amber-400/50 transition-colors duration-150 text-left cursor-pointer"
                    >
                      <span
                        className={`font-mono text-base font-medium tabular-nums text-amber-300 transition-all duration-200 ${
                          isRevealed
                            ? "blur-none"
                            : "blur-sm group-hover:blur-none group-focus-visible:blur-none"
                        }`}
                      >
                        {item.code}
                      </span>

                      <span className="flex items-center gap-3">
                        <span
                          className={`text-sm text-slate-200 transition-all duration-200 ${
                            isRevealed
                              ? "blur-none"
                              : "blur-sm group-hover:blur-none group-focus-visible:blur-none"
                          }`}
                        >
                          {item.purpose}
                        </span>
                        {isRevealed ? (
                          <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 text-xs text-slate-400">
              Click any sequence row to lock its visibility state.
            </div>
          </div>
        </div>

        {/* Manifestation Principles (No border-l-4 cliché) */}
        <div className="bg-[#0f1522] border border-white/10 rounded-xl p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <h3 className="font-display text-xl font-semibold text-white">
              Manifestation Principles
            </h3>
            <p className="text-xs font-mono text-amber-400">
              Whatever you focus on, you energize into existence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SPIRITUAL_INSIGHTS.map((insight, index) => (
              <div
                key={index}
                className="bg-[#141c2c] border border-white/8 rounded-lg p-4 flex items-start gap-3.5"
              >
                <span className="font-mono text-xs text-amber-400 tabular-nums pt-0.5 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}