import { useState } from "react";
import { ArrowDown, BookOpen } from "lucide-react";
import {
  GRABOVOI_CODES,
  SPIRITUAL_INSIGHTS,
  TESLA_NUMBERS,
} from "../data/portfolioData";
import type { PortfolioTheme } from "../three/portfolioGraph";
import { MotionReveal } from "./MotionReveal";
import {
  loadStoredJournalEntries,
  SpiritualJournalModal,
} from "./SpiritualJournalModal";

interface SpiritualSectionProps {
  theme: PortfolioTheme;
}

export function SpiritualSection({ theme }: SpiritualSectionProps) {
  const [journalOpen, setJournalOpen] = useState(false);
  const [entries, setEntries] = useState(() => loadStoredJournalEntries());

  const handleContinueDown = () => {
    setJournalOpen(false);
    setTimeout(() => {
      document
        .getElementById("experience")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 180);
  };

  return (
    <section id="wisdom" className="py-24 px-6 relative pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pointer-events-auto">
          {/* Left Column: Editorial Introduction & Primary Journal Trigger */}
          <MotionReveal className="lg:col-span-6">
            <div
              className="py-4 pr-6 rounded-2xl"
              style={{ background: "var(--hero-scrim)" }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.26em] text-[var(--accent-coral)] mb-3">
                Harmonic Philosophy &amp; Field Journal
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight text-balance mb-4">
                Universal Codes &amp;{" "}
                <strong className="font-semibold">Wisdom</strong>
              </h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-6 max-w-xl">
              Explore the private codex covering Tesla&apos;s 3-6-9 harmonic
              ratios, Quantum Resonance sequences, manifestation principles, and
              personal field notes. Open the journal to flip sideways through
              every folio spread, add new entries, or continue directly to the
              experience orbit once finished.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[var(--text-secondary)] mb-8">
              <span>{TESLA_NUMBERS.length} Harmonic Pillars</span>
              <span aria-hidden="true">·</span>
              <span>{GRABOVOI_CODES.length} Quantum Codes</span>
              <span aria-hidden="true">·</span>
              <span>{SPIRITUAL_INSIGHTS.length} Focus Principles</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{entries.length} Added Notes</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setJournalOpen(true)}
                className="px-6 py-3 bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] text-xs font-semibold uppercase tracking-[0.16em] rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Wisdom Journal</span>
              </button>

              <button
                type="button"
                onClick={handleContinueDown}
                className="px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)] text-xs font-medium uppercase tracking-[0.14em] rounded-lg transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Skip to Experience</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              </div>
            </div>
          </MotionReveal>

          {/* Right Column: Interactive Hardcover Journal Mockup */}
          <MotionReveal delay={0.08} className="lg:col-span-6 flex justify-center lg:justify-end">
            <button
              type="button"
              onClick={() => setJournalOpen(true)}
              aria-label="Open Universal Codes and Wisdom hardcover journal"
              className="group relative w-full max-w-md aspect-[4/5] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-gold)]"
            >
              {/* Layered Page Edges Underneath Cover */}
              <div
                aria-hidden="true"
                className="absolute inset-y-3 -right-2.5 left-4 rounded-r-2xl bg-[var(--bg-inset)] border border-[var(--border-hairline)] transition-transform duration-300 group-hover:translate-x-1"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-1.5 -right-1.5 left-2 rounded-r-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-hairline)] transition-transform duration-300 group-hover:translate-x-0.5"
              />

              {/* Main Hardcover Front */}
              <div className="relative h-full w-full rounded-r-2xl rounded-l-md bg-[var(--bg-surface-solid)] border border-[var(--border-strong)] p-7 sm:p-9 pl-10 sm:pl-12 flex flex-col justify-between shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
                {/* Bound Spine Ridge */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-5 rounded-l-md border-r border-[var(--border-hairline)] bg-[var(--bg-inset)]"
                />

                {/* Bookmark Ribbon Tab */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-2 right-10 w-5 h-10 bg-gradient-to-b from-[#ff7162] via-[#9d6bff] to-[#49c99b] rounded-b-sm shadow-md transition-transform duration-300 group-hover:translate-y-1"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--accent-gold)] uppercase tracking-[0.2em]">
                  <span>Codex 3 · 6 · 9</span>
                  <span>Interactive</span>
                </div>

                {/* Blind-debossed Sacred Geometry Cover Emblem */}
                <div className="my-auto py-6 border-y border-[var(--border-hairline)]">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full border border-[var(--accent-gold)]/60 flex items-center justify-center font-mono text-sm text-[var(--accent-gold)] tabular-nums shrink-0">
                      369
                    </div>
                    <p className="text-xs font-mono text-[var(--text-muted)] leading-relaxed">
                      Energy · Frequency · Vibration
                    </p>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-light text-[var(--text-primary)] leading-tight mb-2">
                    Universal Codes &amp;{" "}
                    <strong className="font-semibold">Wisdom Journal</strong>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    Click to open full-screen spreads · Flip sideways through
                    Tesla axioms, Grabovoi codes, rules, and custom entries.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] pr-10">
                  <span>JehKTech · Field Archive</span>
                  <span className="text-[var(--accent-gold)] group-hover:underline">
                    Open →
                  </span>
                </div>
              </div>
            </button>
          </MotionReveal>
        </div>
      </div>

      <SpiritualJournalModal
        open={journalOpen}
        theme={theme}
        onClose={() => setJournalOpen(false)}
        onContinueDown={handleContinueDown}
        entries={entries}
        onEntriesChange={setEntries}
      />
    </section>
  );
}