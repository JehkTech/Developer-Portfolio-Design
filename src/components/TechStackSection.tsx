import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  CURRENT_BUILD_SNIPPET,
  PORTFOLIO_EMAIL,
  TECH_STACK,
} from "../data/portfolioData";

export function TechStackSection() {
  const copyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <section id="stack" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#090d16]/88 border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="mb-10 pb-8 border-b border-white/10 max-w-2xl">
          <p className="text-xs font-mono text-amber-400 mb-2">
            Engineering Architecture
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight text-balance mb-3">
            Technical Stack &amp; Active Workbench
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Grounded full-stack and protocol tooling across low-level Rust,
            Ethereum smart contracts, distributed Elixir backends, and modern
            TypeScript interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Active Build + Advisory */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0f1522] border border-white/10 rounded-xl p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-amber-400 mb-2">
                  Active Build · Trading Analytics
                </p>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  Currently Building a Trading Journal
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Developing a comprehensive trading journal application with
                  real-time portfolio tracking, drawdown analytics, and 3-6-9
                  harmonic ratio modeling.
                </p>
              </div>

              <pre className="bg-[#07090e] border border-white/10 rounded-lg p-4 text-xs font-mono text-amber-200 overflow-x-auto leading-relaxed">
                <code>{CURRENT_BUILD_SNIPPET}</code>
              </pre>
            </div>

            <div className="bg-[#121826] border border-amber-500/35 rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Trading &amp; Architecture Advisory
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                2 years of market trading experience combined with sacred
                geometry technical structure and full-stack implementation.
              </p>
              <button
                type="button"
                onClick={copyEmail}
                className="px-4 py-2 text-xs font-semibold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email to Book Session</span>
              </button>
            </div>
          </div>

          {/* Right Column: Structured Tech Stack Index */}
          <div className="lg:col-span-7 bg-[#0f1522] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">
                  Core Tooling
                </p>
                <h3 className="font-display text-xl font-semibold text-white">
                  Production Languages &amp; Frameworks
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                12 Core Technologies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TECH_STACK.map((tech, idx) => (
                <div
                  key={tech.name}
                  className="bg-[#141c2c] border border-white/8 rounded-lg p-4 hover:border-amber-400/45 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-sm font-semibold text-white">
                      {tech.name}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{tech.domain}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <span>
                Collaboration Principle: Open communication &amp; clean modular
                systems
              </span>
              <span className="font-mono text-slate-300">
                Express · Vue.js · Next.js · TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}