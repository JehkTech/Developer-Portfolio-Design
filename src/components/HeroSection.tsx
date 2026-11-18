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
  const copyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <section
      id="about"
      className="min-h-screen pt-20 pb-28 px-6 flex flex-col justify-between relative pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left editorial column — leaves right-center 3D Sacred Hub unobstructed */}
        <div className="lg:col-span-6 bg-[#101114]/90 border border-white/10 rounded-2xl p-6 md:p-8 pointer-events-auto">
          <p className="text-xs font-mono text-[#c9a96a] tracking-wide mb-3">
            Lusaka, Zambia · Technologist · Trader · Founder
          </p>

          <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight text-[#ededed] leading-[1.05] text-balance mb-4">
            Precision{" "}
            <strong className="font-semibold text-white">under pressure.</strong>
          </h1>

          <p className="text-[#c0c4cc] text-sm md:text-base leading-relaxed mb-5">
            I am Jehoiachin Katemangwe. I design and test payment systems that
            move real money, build SaaS products, and run a systematic trading
            operation. Structure first. Noise last.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#8b9099] mb-6 pb-5 border-b border-white/10">
            <span>Fintech &amp; QA Systems</span>
            <span aria-hidden="true">·</span>
            <span>9 Linked Web Nodes</span>
            <span aria-hidden="true">·</span>
            <span>R0TK Systematic Trading</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreProjects}
              className="px-5 py-2.5 bg-[#ededed] text-[#0a0a0a] text-sm font-semibold rounded-lg hover:bg-[#c9a96a] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onEnterOrbit}
              className="px-4 py-2.5 bg-[#16181c] border border-white/15 text-[#ededed] text-sm font-medium rounded-lg hover:border-[#c9a96a]/70 hover:text-[#c9a96a] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#c9a96a]" />
              <span>Orbit 3D Hub</span>
            </button>

            <button
              type="button"
              onClick={copyEmail}
              className="px-3.5 py-2.5 text-[#c0c4cc] hover:text-[#c9a96a] text-sm font-medium inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-width 4-column KPI strip matching index_3ace1b93.html */}
      <div className="max-w-7xl mx-auto w-full mt-6 pointer-events-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#101114]/90 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {HERO_METRICS.map((item) => (
            <div key={item.label} className="p-4 md:p-5">
              <div className="font-display text-2xl md:text-3xl font-light text-[#ededed] tabular-nums mb-1">
                {item.value}
              </div>
              <p className="text-xs font-mono text-[#8b9099]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}