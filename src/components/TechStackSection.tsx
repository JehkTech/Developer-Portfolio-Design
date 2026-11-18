import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  CURRENT_BUILD_SNIPPET,
  PORTFOLIO_EMAIL,
  SKILL_GROUPS,
  TECH_STACK,
} from "../data/portfolioData";

export function TechStackSection() {
  const copyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <section id="stack" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#101114]/92 border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="mb-10 pb-8 border-b border-white/10 max-w-2xl">
          <p className="text-xs font-mono text-[#c9a96a] mb-2">
            Engineering Architecture
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-[#ededed] tracking-tight text-balance mb-3">
            Technical Stack &amp;{" "}
            <strong className="font-semibold text-white">Active Workbench</strong>
          </h2>
          <p className="text-[#c0c4cc] text-sm md:text-base leading-relaxed">
            Production full-stack tooling across React, Next.js, Node.js,
            PostgreSQL, Prisma, Python automation, and Playwright QA suites.
          </p>
        </div>

        {/* 4 Skill Domains from index_3ace1b93.html */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="border-t border-[#c9a96a] pt-4"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#ededed] mb-2">
                {group.title}
              </h3>
              <p className="text-sm text-[#c0c4cc] leading-relaxed">
                {group.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Active Build + Advisory */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#14161a] border border-white/10 rounded-xl p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#c9a96a] mb-2">
                  Active Build · Trading Analytics
                </p>
                <h3 className="font-display text-xl font-semibold text-[#ededed] mb-3">
                  Currently Building R0TK Journal
                </h3>
                <p className="text-sm text-[#c0c4cc] leading-relaxed mb-5">
                  Developing a comprehensive trading journal with real-time
                  portfolio tracking, rule-adherence scoring, and 3-6-9 harmonic
                  ratio modeling.
                </p>
              </div>

              <pre className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-xs font-mono text-[#e5cfa3] overflow-x-auto leading-relaxed">
                <code>{CURRENT_BUILD_SNIPPET}</code>
              </pre>
            </div>

            <div className="bg-[#16181c] border border-[#c9a96a]/40 rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-[#ededed] mb-2">
                Product &amp; QA Advisory
              </h3>
              <p className="text-sm text-[#c0c4cc] leading-relaxed mb-4">
                3+ years testing live payment flows and shipping AI SaaS
                interfaces with modular full-stack execution.
              </p>
              <button
                type="button"
                onClick={copyEmail}
                className="px-4 py-2 text-xs font-semibold bg-[#c9a96a] text-[#0a0a0a] rounded-lg hover:bg-[#d8bc82] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email to Book Session</span>
              </button>
            </div>
          </div>

          {/* Right Column: Structured Tech Stack Index */}
          <div className="lg:col-span-7 bg-[#14161a] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-mono text-[#8b9099] mb-1">
                  Core Tooling
                </p>
                <h3 className="font-display text-xl font-semibold text-[#ededed]">
                  Production Languages &amp; Frameworks
                </h3>
              </div>
              <span className="text-xs font-mono text-[#8b9099] tabular-nums">
                12 Core Technologies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TECH_STACK.map((tech, idx) => (
                <div
                  key={tech.name}
                  className="bg-[#181b20] border border-white/8 rounded-lg p-4 hover:border-[#c9a96a]/45 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-sm font-semibold text-[#ededed]">
                      {tech.name}
                    </span>
                    <span className="font-mono text-[11px] text-[#8b9099] tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-[#8b9099]">{tech.domain}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8b9099]">
              <span>
                Structure first. Noise last. Modular systems shipped cleanly.
              </span>
              <span className="font-mono text-[#c0c4cc]">
                React · Next.js · Express · Prisma · Playwright
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}