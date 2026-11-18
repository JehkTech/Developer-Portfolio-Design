import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  CURRENT_BUILD_SNIPPET,
  PORTFOLIO_EMAIL,
  SKILL_GROUPS,
  TECH_STACK,
} from "../data/portfolioData";
import { MotionReveal } from "./MotionReveal";

export function TechStackSection() {
  const copyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <section id="stack" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <MotionReveal className="mb-12 pb-8 border-b border-[var(--border-hairline)] max-w-2xl pointer-events-auto">
          <p className="text-xs font-mono uppercase tracking-[0.26em] text-[var(--accent-coral)] mb-3">
            Engineering Architecture
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight text-balance mb-3">
            Technical Stack &amp;{" "}
            <strong className="font-semibold">Active Workbench</strong>
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            Production full-stack tooling across React, Next.js, Node.js,
            PostgreSQL, Prisma, Python automation, and Playwright QA suites.
          </p>
        </MotionReveal>

        {/* 4 Skill Domains */}
        <MotionReveal delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 pointer-events-auto">
            {SKILL_GROUPS.map((group, idx) => {
              const borderTones = [
                "border-t-[var(--accent-coral)]",
                "border-t-[var(--accent-gold)]",
                "border-t-[var(--accent-sage)]",
                "border-t-[var(--accent-cobalt)]",
              ];
              return (
                <div
                  key={group.title}
                  className={`border-t-2 ${borderTones[idx % borderTones.length]} pt-4 bg-[var(--bg-surface)] px-4 pb-4 rounded-b-lg`}
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-primary)] mb-2">
                    {group.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {group.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pointer-events-auto">
          {/* Left Column: Active Build + Advisory */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[var(--accent-sage)] mb-2">
                  Active Build · Trading Analytics
                </p>
                <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3">
                  Currently Building R0TK Journal
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                  Developing a comprehensive trading journal with real-time
                  portfolio tracking, rule-adherence scoring, and 3-6-9 harmonic
                  ratio modeling.
                </p>
              </div>

              <pre className="bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-md p-4 text-xs font-mono text-[var(--accent-gold)] overflow-x-auto leading-relaxed">
                <code>{CURRENT_BUILD_SNIPPET}</code>
              </pre>
            </div>

            <div className="bg-[var(--bg-surface)] border border-[var(--accent-gold)]/45 rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2">
                Product &amp; QA Advisory
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                3+ years testing live payment flows and shipping AI SaaS
                interfaces with modular full-stack execution.
              </p>
              <button
                type="button"
                onClick={copyEmail}
                className="px-4 py-2 text-xs font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-md hover:bg-[var(--accent-gold-hover)] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email to Book Session</span>
              </button>
            </div>
          </div>

          {/* Right Column: Structured Tech Stack Index */}
          <div className="lg:col-span-7 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-mono text-[var(--text-muted)] mb-1">
                  Core Tooling
                </p>
                <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  Production Languages &amp; Frameworks
                </h3>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
                12 Core Technologies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TECH_STACK.map((tech, idx) => (
                <div
                  key={tech.name}
                  className="bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-md p-4 hover:border-[var(--accent-gold)]/50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-sm font-semibold text-[var(--text-primary)]">
                      {tech.name}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {tech.domain}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
              <span>
                Structure first. Noise last. Modular systems shipped cleanly.
              </span>
              <span className="font-mono text-[var(--text-secondary)]">
                React · Next.js · Express · Prisma · Playwright
              </span>
            </div>
          </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}