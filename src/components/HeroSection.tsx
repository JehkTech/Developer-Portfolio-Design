import { ArrowDown, Compass, Copy } from "lucide-react";
import { toast } from "sonner";
import { PORTFOLIO_EMAIL } from "../data/portfolioData";

interface HeroSectionProps {
  onExploreProjects: () => void;
  onEnterOrbit: () => void;
}

const CAPABILITY_STRIP = [
  { index: "01", title: "Full-Stack Systems", detail: "Python · TypeScript · React" },
  { index: "02", title: "Bitcoin & Lightning", detail: "Rust · gRPC · Micro-payments" },
  { index: "03", title: "DeFi Architecture", detail: "Solidity · Hardhat · Oracles" },
  { index: "04", title: "Sacred 3-6-9 Design", detail: "Harmonic Ratios · UI/UX" },
];

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
        <div className="lg:col-span-6 bg-[#090d16]/88 border border-white/10 rounded-2xl p-6 md:p-8 pointer-events-auto">
          <p className="text-xs font-mono text-amber-400 tracking-wide mb-3">
            Jeh · Full-Stack, Lightning &amp; Spatial Systems
          </p>

          <h1 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white leading-[1.08] text-balance mb-4">
            Transforming Concepts into Seamless User Experiences
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5">
            I&apos;m Jeh, a Full-Stack Developer specializing in Python, JavaScript,
            UI/UX Design, and Lightning &amp; Bitcoin Engineering with Rust and
            Solidity — linking technical architecture with sacred geometry.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-400 mb-6 pb-5 border-b border-white/10">
            <span>2 Years Market Trading</span>
            <span aria-hidden="true">·</span>
            <span>Lusaka, Zambia</span>
            <span aria-hidden="true">·</span>
            <span>Available for Remote Collaboration</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreProjects}
              className="px-5 py-2.5 bg-amber-500 text-slate-950 text-sm font-semibold rounded-lg hover:bg-amber-400 transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Project Web</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onEnterOrbit}
              className="px-4 py-2.5 bg-[#121826] border border-white/15 text-slate-200 text-sm font-medium rounded-lg hover:border-amber-400/60 hover:text-white transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Orbit 3D Hub</span>
            </button>

            <button
              type="button"
              onClick={copyEmail}
              className="px-3.5 py-2.5 text-slate-300 hover:text-amber-300 text-sm font-medium inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-width 4-column capability strip positioned cleanly above bottom dock */}
      <div className="max-w-7xl mx-auto w-full mt-6 pointer-events-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#090d16]/88 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {CAPABILITY_STRIP.map((item) => (
            <div key={item.index} className="p-4 md:p-5">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-xs text-amber-400 tabular-nums">
                  {item.index}
                </span>
              </div>
              <h2 className="font-display text-sm md:text-base font-semibold text-white mb-0.5">
                {item.title}
              </h2>
              <p className="text-xs font-mono text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}