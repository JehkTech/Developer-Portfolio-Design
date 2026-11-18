import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Compass, Copy } from "lucide-react";
import { toast } from "sonner";
import { HERO_METRICS, PORTFOLIO_EMAIL } from "../data/portfolioData";

interface HeroSectionProps {
  onExploreProjects: () => void;
  onEnterOrbit: () => void;
}

export function HeroSection({
  onExploreProjects,
  onEnterOrbit,
}: HeroSectionProps) {
  const prefersReduced = useReducedMotion();

  const copyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <section
      id="about"
      className="min-h-screen pt-24 pb-20 px-6 flex flex-col justify-between relative pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left editorial column — blended cleanly over the 3D scene */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 pointer-events-auto relative py-4 pr-6"
          style={{ background: "var(--hero-scrim)" }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-[var(--accent-gold)] mb-5">
            Lusaka, Zambia · Engineering &amp; Client Portfolio
          </p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-[4.5rem] font-light tracking-tight text-[var(--text-primary)] leading-[1.02] text-balance mb-6">
            Precision
            <br />
            <strong className="font-semibold">under pressure.</strong>
          </h1>

          <p className="max-w-xl text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-6">
            I am Jehoiachin Katemangwe. I design and test payment systems that
            move real money, ship production client deployments and AI SaaS
            products, and run a systematic trading operation. Structure first.
            Noise last.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[var(--text-muted)] mb-8">
            <span>4 Client Deployments</span>
            <span aria-hidden="true">·</span>
            <span>4 SaaS &amp; AI Builds</span>
            <span aria-hidden="true">·</span>
            <span>R0TK Systematic Trading</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreProjects}
              className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-canvas)] text-xs font-semibold uppercase tracking-[0.18em] rounded-md hover:bg-[var(--accent-gold)] hover:text-[var(--accent-gold-contrast)] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onEnterOrbit}
              className="px-5 py-3 bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-primary)] text-xs font-medium uppercase tracking-[0.18em] rounded-md hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Orbit 3D Hub</span>
            </button>

            <button
              type="button"
              onClick={copyEmail}
              className="px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] text-xs font-medium uppercase tracking-[0.16em] inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Email</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Full-width 4-column KPI strip */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full mt-10 pointer-events-auto"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-hairline)] border border-[var(--border-hairline)]">
          {HERO_METRICS.map((item) => (
            <div key={item.label} className="bg-[var(--bg-surface)] p-5 md:p-6">
              <div className="font-display text-2xl md:text-3xl font-light text-[var(--text-primary)] tabular-nums mb-1">
                {item.value}
              </div>
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}