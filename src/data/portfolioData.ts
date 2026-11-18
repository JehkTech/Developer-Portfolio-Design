import tradingImg from "../assets/images/project_trading_journal_1795009658883.jpg";
import lightningImg from "../assets/images/project_lightning_gateway_1795009659626.jpg";
import defiImg from "../assets/images/project_defi_suite_1795009659363.jpg";
import cargoImg from "../assets/images/project_cargo_marketplace_1795009659378.jpg";
import healingImg from "../assets/images/project_frequency_healing_1795009659981.jpg";
import type { ProjectNodeSpec } from "../three/portfolioGraph";

export interface PortfolioProject extends ProjectNodeSpec {
  typeLabel: string;
  description: string;
  architectureNotes: string;
  tech: string[];
  image: string;
  imageAlt: string;
  github: string;
  live?: string;
}

export const PORTFOLIO_EMAIL = "jehoiachinkatemangwe1@gmail.com";

export const PROJECTS: PortfolioProject[] = [
  {
    id: "trading",
    title: "Trading Journal & Analytics Platform",
    shortLabel: "01 Trading",
    category: "fullstack",
    geometryStyle: "candlestick",
    orbitAngle: -0.45,
    orbitRadius: 4.8,
    elevation: 2.0,
    accentHex: 0xf59e0b,
    connections: ["defi", "cymatics", "cargo"],
    typeLabel: "Full-Stack · Trading",
    description:
      "Full-stack trading journal with real-time portfolio tracking, performance analytics, and risk management tools integrating 3-6-9 harmonic ratios in chart studies.",
    architectureNotes:
      "Event-driven WebSocket trade feed paired with PostgreSQL time-series aggregation, deterministic win-rate and expectancy telemetry, and responsive multi-timeframe charting.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "WebSocket"],
    image: tradingImg,
    imageAlt: "Trading Journal & Analytics Platform candlestick visualization",
    github: "https://github.com/JehkTech/r0tk_journal",
  },
  {
    id: "lightning",
    title: "Lightning Network Payment Gateway",
    shortLabel: "02 Lightning",
    category: "blockchain",
    geometryStyle: "lightning",
    orbitAngle: 0.85,
    orbitRadius: 5.0,
    elevation: 2.55,
    accentHex: 0x38bdf8,
    connections: ["defi", "trading"],
    typeLabel: "Blockchain · Lightning",
    description:
      "High-performance Lightning Network payment processor built with Rust enabling instant Bitcoin microtransactions with minimal routing fees for web applications.",
    architectureNotes:
      "Asynchronous Rust invoice settlement engine over gRPC with WebAssembly client verification bindings and automated channel liquidity balancing.",
    tech: ["Rust", "Lightning", "Bitcoin", "WebAssembly", "gRPC"],
    image: lightningImg,
    imageAlt: "Lightning Network Payment Gateway node routing architecture",
    github: "https://github.com/JehkTech/lightning-gateway",
  },
  {
    id: "defi",
    title: "DeFi Smart Contracts Suite",
    shortLabel: "03 DeFi",
    category: "blockchain",
    geometryStyle: "vault",
    orbitAngle: 2.15,
    orbitRadius: 4.9,
    elevation: 1.85,
    accentHex: 0xf59e0b,
    connections: ["lightning", "trading"],
    typeLabel: "Smart Contracts · DeFi",
    description:
      "Comprehensive DeFi protocol with yield farming, staking, and on-chain governance implementing harmonic emission curves in tokenomics design.",
    architectureNotes:
      "Audited OpenZeppelin vault primitives, Chainlink oracle price guards, Hardhat deterministic fuzzing suites, and IPFS-pinned governance metadata.",
    tech: ["Solidity", "Hardhat", "OpenZeppelin", "Chainlink", "IPFS"],
    image: defiImg,
    imageAlt: "DeFi Smart Contracts Suite interlocking vault architecture",
    github: "https://github.com/JehkTech/defi-suite",
  },
  {
    id: "cargo",
    title: "Cargo-Truck Marketplace UI/UX",
    shortLabel: "04 Cargo UI",
    category: "design",
    geometryStyle: "logistics",
    orbitAngle: 3.45,
    orbitRadius: 5.1,
    elevation: 2.3,
    accentHex: 0x38bdf8,
    connections: ["trading", "cymatics"],
    typeLabel: "UI/UX Design · Logistics",
    description:
      "Complete design system for a freight logistics platform featuring driver matching, route optimization, and real-time fleet tracking grounded in proportional geometry.",
    architectureNotes:
      "Multi-role dispatch flows covering shipper bidding, carrier verification, live corridor telemetry, and administrative settlement consoles built in Figma.",
    tech: ["Figma", "Design System", "Prototyping", "User Research"],
    image: cargoImg,
    imageAlt: "Cargo-Truck Marketplace route optimization design system",
    github: "https://github.com/JehkTech/Mamastops-Cargo-Truck-Marketplace",
  },
  {
    id: "cymatics",
    title: "Frequency Healing Web App",
    shortLabel: "05 Healing",
    category: "design",
    geometryStyle: "cymatics",
    orbitAngle: 4.75,
    orbitRadius: 4.7,
    elevation: 2.1,
    accentHex: 0xf59e0b,
    connections: ["trading", "cargo"],
    typeLabel: "Web App · Acoustics",
    description:
      "Interactive sound therapy web application synthesizing calibrated binaural beat frequencies and harmonic resonance sessions directly in the browser.",
    architectureNotes:
      "Zero-latency Web Audio API dual-oscillator phase engine with smooth envelope ramping, session presets, and responsive TypeScript controls.",
    tech: ["TypeScript", "Web Audio API", "React", "Tailwind CSS"],
    image: healingImg,
    imageAlt: "Frequency Healing Web App standing wave cymatics pattern",
    github: "https://github.com/JehkTech/frequency-healer",
  },
];

export const TECH_STACK = [
  { name: "Rust", domain: "Lightning & Systems" },
  { name: "Solidity", domain: "Smart Contracts" },
  { name: "Python", domain: "Backend & Data" },
  { name: "TypeScript", domain: "Typed Frontend" },
  { name: "JavaScript", domain: "Web Runtime" },
  { name: "React", domain: "UI Engineering" },
  { name: "Next.js", domain: "Full-Stack SSR" },
  { name: "Node.js", domain: "APIs & Realtime" },
  { name: "PostgreSQL", domain: "Relational Store" },
  { name: "Elixir", domain: "Fault-Tolerant" },
  { name: "Figma", domain: "Design Systems" },
  { name: "Git", domain: "Version Control" },
];

export const CURRENT_BUILD_SNIPPET = `const analyzePerformance = (trades: Trade[]) => {
  const winRate = calculateWinRate(trades);
  const profitLoss = calculatePnL(trades);

  return {
    winRate,
    profitLoss,
    frequency: 369, // Tesla harmonic ratio
  };
};`;

export const TESLA_NUMBERS = [
  { digit: 3, role: "Creation & Intent" },
  { digit: 6, role: "Harmonic Flow" },
  { digit: 9, role: "Completion & Synthesis" },
];

export const GRABOVOI_CODES = [
  { code: "17517038", purpose: "Unexpected Wealth" },
  { code: "73200180", purpose: "Unlimited Money" },
  { code: "5207418", purpose: "Unexpected Money" },
  { code: "917604", purpose: "Quantum Jump" },
];

export const SPIRITUAL_INSIGHTS = [
  "What Did I Do Right? (In that situation)",
  "What Would I Do Differently Next Time?",
  "Whatsoever and wherever my focus goes, that's what I'll see in my world",
  "Frequency: Align your frequency with your DR (Aim for Love - Peace - Joy)",
  "Act as if you're that person · Speak as if you're that person · Walk as if you're that person",
  "When you want to create something just do one thing and that's focus on it everyday",
  "Whatever you focus on, you energize into existence",
  "Circumstances don't matter — the outer reflection follows internal state",
  "Take Accountability and Responsibility",
  "You always, always have the choice of what to think",
];

export const EXPERIENCES = [
  {
    index: "01",
    title: "Software Developer Intern",
    company: "Probase Ltd",
    period: "Aug 2024 – May 2025",
    description:
      "Contributed to the development and deployment of critical business applications interfacing with financial platforms for government revenue collection.",
    skills: ["Full-Stack Development", "Python", "System Integration", "Technical Writing"],
  },
  {
    index: "02",
    title: "Technical Support Intern",
    company: "Mamastops",
    period: "2024",
    description:
      "Led UI/UX design for multiple platforms including Cargo-Truck Marketplace, designing complete user journeys and administrative dashboards.",
    skills: ["UI/UX Design", "Figma", "User Journey", "Quality Assurance"],
  },
  {
    index: "03",
    title: "Python Development Bootcamp Tutor",
    company: "Genius Education Zambia",
    period: "Feb 2024 – Jun 2024",
    description:
      "Facilitated comprehensive Python programming bootcamp, translating complex coding concepts into accessible lessons for junior tech professionals.",
    skills: ["Python", "Teaching", "Curriculum Design", "Mentoring"],
  },
  {
    index: "04",
    title: "Web Development Intern",
    company: "Oasis Infobyte & Code Alpha",
    period: "May 2023 – Nov 2023",
    description:
      "Gained extensive hands-on experience in web technologies, collaborating on website functionality improvements with a focus on responsive design.",
    skills: ["HTML/CSS", "JavaScript", "Responsive Design", "Debugging"],
  },
];
