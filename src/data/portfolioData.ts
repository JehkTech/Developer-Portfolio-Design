import aiDbTrackImg from "../assets/images/project_ai_db_track_1795018352779.jpg";
import luminousPixelsImg from "../assets/images/project_luminous_pixels_1795018353368.jpg";
import onboardAiImg from "../assets/images/project_onboard_ai_1795018354918.jpg";
import statusHubImg from "../assets/images/project_statushub_1795018354546.jpg";
import carGuyImg from "../assets/images/project_car_guy_1795018355851.jpg";
import joinTransitImg from "../assets/images/project_join_transit_1795018355810.jpg";
import joinMerchantPayImg from "../assets/images/project_join_merchant_pay_1795018356239.jpg";
import tradingImg from "../assets/images/project_trading_journal_1795009658883.jpg";
import cargoImg from "../assets/images/project_cargo_marketplace_1795009659378.jpg";
import type { ProjectNodeSpec } from "../three/portfolioGraph";

export interface ExternalSystemLink {
  label: string;
  url: string;
}

export interface PortfolioProject extends ProjectNodeSpec {
  typeLabel: string;
  statusLabel: string;
  description: string;
  architectureNotes: string;
  tech: string[];
  image: string;
  imageAlt: string;
  live?: string;
  secondaryLinks?: ExternalSystemLink[];
  github?: string;
}

export const PORTFOLIO_EMAIL = "jehoiachinkatemangwe1@gmail.com";
export const PORTFOLIO_PHONE = "+260 970 435 346";

export const HERO_METRICS = [
  { value: "3+", label: "Years in fintech" },
  { value: "5", label: "Live payment integrations" },
  { value: "10+", label: "UI modules shipped" },
  { value: "3", label: "SaaS & agency ventures" },
];

export const PROJECTS: PortfolioProject[] = [
  {
    id: "ai-db-track",
    title: "AI-DB Track",
    shortLabel: "01 AI-DB",
    category: "saas",
    geometryStyle: "dbshield",
    orbitAngle: -0.55,
    orbitRadius: 4.5,
    elevation: 2.1,
    accentHex: 0xc9a96a,
    connections: ["statushub", "onboard-ai", "luminous-pixels"],
    typeLabel: "SaaS · Database AI",
    statusLabel: "Live Product",
    description:
      "AI-powered autopilot for PostgreSQL and MSSQL backups featuring automated scheduling, checksum integrity verification, test restores, and anomaly detection.",
    architectureNotes:
      "Automated pg_dump and native MSSQL snapshot orchestration paired with predictive storage analytics, self-healing integrity scripts, and compliance-ready audit trails.",
    tech: ["PostgreSQL", "MSSQL", "React", "TypeScript", "Automated Recovery"],
    image: aiDbTrackImg,
    imageAlt: "AI-DB Track automated database backup protection architecture",
    live: "https://ai-db-track.netlify.app/#features",
  },
  {
    id: "luminous-pixels",
    title: "Luminous Pixels",
    shortLabel: "02 Luminous",
    category: "saas",
    geometryStyle: "prism",
    orbitAngle: 0.25,
    orbitRadius: 5.0,
    elevation: 2.45,
    accentHex: 0xc9a96a,
    connections: ["onboard-ai", "ai-db-track", "malik-car-guy", "join-platform"],
    typeLabel: "Agency · AI Automation",
    statusLabel: "Live",
    description:
      "AI automation agency serving US-based businesses with custom workflow pipelines, Sanity CMS content architecture, lead capture, and automated outreach.",
    architectureNotes:
      "Mobile-first Vite + React front end integrated with Sanity CMS, Resend transactional pipelines, and multi-agent intake workflows from discovery to close.",
    tech: ["React", "Vite", "Sanity CMS", "Resend", "AI Workflows"],
    image: luminousPixelsImg,
    imageAlt: "Luminous Pixels multi-agent AI workflow lattice render",
    live: "https://luminouspixels.app/",
    secondaryLinks: [
      { label: "Netlify Mirror", url: "https://luminuouspixels.netlify.app/#" },
    ],
  },
  {
    id: "onboard-ai",
    title: "OnboardAI",
    shortLabel: "03 OnboardAI",
    category: "saas",
    geometryStyle: "pipeline",
    orbitAngle: 1.05,
    orbitRadius: 4.7,
    elevation: 1.95,
    accentHex: 0x60a5fa,
    connections: ["luminous-pixels", "statushub", "ai-db-track"],
    typeLabel: "SaaS · Client Intelligence",
    statusLabel: "Frontend Live",
    description:
      "AI-powered client onboarding intelligence platform transforming client intake forms into structured scoping briefs, project workflows, and conversion telemetry.",
    architectureNotes:
      "Interactive intake SaaS dashboard paired with a full backend architecture specification covering Redis/BullMQ queues, Stripe billing, and socket telemetry.",
    tech: ["React", "Vite", "Prisma", "Stripe", "BullMQ"],
    image: onboardAiImg,
    imageAlt: "OnboardAI layered client intake pipeline visualization",
    live: "https://ai-client-onboarding.netlify.app/",
  },
  {
    id: "statushub",
    title: "StatusHub",
    shortLabel: "04 StatusHub",
    category: "saas",
    geometryStyle: "beacon",
    orbitAngle: 1.85,
    orbitRadius: 4.8,
    elevation: 2.35,
    accentHex: 0x60a5fa,
    connections: ["ai-db-track", "onboard-ai", "join-platform", "trading"],
    typeLabel: "SaaS · Monitoring",
    statusLabel: "In Development",
    description:
      "Webhook management and API status monitoring platform with server-sent event streaming, PostgreSQL GIN full-text search, caching, and rate limiting.",
    architectureNotes:
      "Next.js 14 dashboard and Express ingestion workers backing real-time SSE incident updates, PostgreSQL pg_trgm search indexes, and Firebase authentication.",
    tech: ["Next.js 14", "Express", "Prisma", "PostgreSQL", "SSE"],
    image: statusHubImg,
    imageAlt: "StatusHub real-time webhook routing and uptime monitoring grid",
    live: "https://api-statushub.netlify.app/",
  },
  {
    id: "malik-car-guy",
    title: "Car Guy Zambia (Malik)",
    shortLabel: "05 Car Guy",
    category: "clients",
    geometryStyle: "audio",
    orbitAngle: 2.65,
    orbitRadius: 5.8,
    elevation: 2.05,
    accentHex: 0xc9a96a,
    connections: ["luminous-pixels", "join-platform"],
    typeLabel: "Client · Automotive Retail",
    statusLabel: "Client Live",
    description:
      "Brand storefront and installation booking platform for Car Guy in Lusaka, Zambia — showcasing Power X audio, Android Auto head units, and luxury interiors.",
    architectureNotes:
      "High-contrast editorial automotive showcase engineered with fast media presentation, category navigation, installation scheduling, and mobile responsiveness.",
    tech: ["React", "Vercel", "Responsive UI", "Conversion UX"],
    image: carGuyImg,
    imageAlt: "Car Guy Zambia custom automotive audio and head unit studio render",
    live: "https://malik-car-guy.vercel.app/",
  },
  {
    id: "join-platform",
    title: "JOIN Digital Solutions",
    shortLabel: "06 JOIN Ops",
    category: "clients",
    geometryStyle: "transit",
    orbitAngle: 3.45,
    orbitRadius: 5.9,
    elevation: 2.3,
    accentHex: 0x60a5fa,
    connections: ["join-merchant-pay", "statushub", "luminous-pixels", "mamastops"],
    typeLabel: "Client · Transit Operations",
    statusLabel: "Client Live",
    description:
      "Transport operations platform built for transit agencies and operators to deploy contactless fares, live route analytics, and automated fare reconciliation.",
    architectureNotes:
      "Modular operator architecture connecting passenger onboarding, real-time fleet telemetry, audit modules, and interactive system demo environments.",
    tech: ["React", "Transit Systems", "Analytics", "Workflow Automation"],
    image: joinTransitImg,
    imageAlt: "JOIN Digital Solutions contactless urban transit network visualization",
    live: "https://joindigitalsolutions.tech/",
    secondaryLinks: [
      { label: "Live Demo", url: "https://joindemo.netlify.app/" },
    ],
  },
  {
    id: "join-merchant-pay",
    title: "JOIN Smart Transit Merchant Pay",
    shortLabel: "07 JOIN Pay",
    category: "clients",
    geometryStyle: "terminal",
    orbitAngle: 4.15,
    orbitRadius: 5.7,
    elevation: 1.9,
    accentHex: 0xc9a96a,
    connections: ["join-platform", "mamastops"],
    typeLabel: "Client · Contactless Pay",
    statusLabel: "Client Live",
    description:
      "Tap. Pay. Go. Merchant payment interface for the JOIN Smart Transit network enabling instant passenger fare collection and real-time merchant settlement.",
    architectureNotes:
      "Cloud Run deployed contactless payment workflow optimized for rapid boarding verification, driver/merchant clarity, and low-latency fare confirmation.",
    tech: ["TypeScript", "Cloud Run", "Transit FinTech", "Merchant UX"],
    image: joinMerchantPayImg,
    imageAlt: "JOIN Smart Transit contactless NFC merchant payment terminal",
    live: "https://join-smart-transit-merchant-pay-354740630774.europe-west2.run.app/",
  },
  {
    id: "trading",
    title: "R0TK Trading Journal",
    shortLabel: "08 R0TK",
    category: "fintech",
    geometryStyle: "candlestick",
    orbitAngle: 4.9,
    orbitRadius: 4.7,
    elevation: 2.15,
    accentHex: 0xc9a96a,
    connections: ["statushub", "mamastops"],
    typeLabel: "Fintech · Trading",
    statusLabel: "Active Build",
    description:
      "Full-stack systematic trading journal and analytics engine backing the R0TK methodology with strict risk limits, drawdown telemetry, and session reviews.",
    architectureNotes:
      "Event-driven trade logging paired with PostgreSQL time-series aggregation, deterministic win-rate calculations, and 3-6-9 harmonic structural studies.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "WebSocket"],
    image: tradingImg,
    imageAlt: "R0TK Trading Journal candlestick analytics visualization",
    github: "https://github.com/JehkTech/r0tk_journal",
  },
  {
    id: "mamastops",
    title: "Mamastops Logistics & Payments",
    shortLabel: "09 Mamastops",
    category: "fintech",
    geometryStyle: "logistics",
    orbitAngle: 5.6,
    orbitRadius: 5.2,
    elevation: 2.25,
    accentHex: 0x60a5fa,
    connections: ["join-platform", "join-merchant-pay", "trading"],
    typeLabel: "Fintech · Logistics",
    statusLabel: "Production",
    description:
      "Cargo-Truck Marketplace UI/UX and five live cashless payment integrations (E-Toll, BookNow, NRFA, Airtel Money V2, M-Pesa Mozambique, WhatsApp OTP).",
    architectureNotes:
      "Multi-role dispatch flows, driver matching, and automated Playwright end-to-end QA verification across live mobile-money and tolling rails.",
    tech: ["Figma", "Playwright", "QA Automation", "Payment Rails"],
    image: cargoImg,
    imageAlt: "Mamastops Cargo-Truck Marketplace and payment rail UI architecture",
    github: "https://github.com/JehkTech/Mamastops-Cargo-Truck-Marketplace",
  },
];

export const TRADING_PILLARS = [
  {
    tag: "Framework",
    title: "R0TK",
    description:
      "Smart Money Concepts applied with strict risk limits across futures, metals, crypto, forex, and oil.",
    bullets: [
      "1% maximum risk per trade",
      "Daily and weekly loss limits enforced",
      "Oil workflow built around EIA inventory reports",
    ],
    chips: ["HTF Structure", "Liquidity", "Confirmation"],
  },
  {
    tag: "Research",
    title: "Midnight Opening Gap",
    description:
      "Published market microstructure research examining the Midnight Opening Gap, registered with a DOI on Zenodo.",
    bullets: [
      "Quantitative statistical open-gap behavior",
      "Cross-verified session liquidity timing",
    ],
    chips: ["Zenodo DOI", "Academia.edu"],
  },
  {
    tag: "Tooling",
    title: "MT5 Trade Copier",
    description:
      "Python trade copier mirroring positions across prop accounts while enforcing daily and per-trade risk caps automatically.",
    bullets: [
      "Code-level risk limit enforcement",
      "Automated trade journaling sync",
    ],
    chips: ["Python", "MetaTrader 5"],
  },
];

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    detail: "React, Vite, Next.js, TypeScript component architecture, accessible mobile-first CSS.",
  },
  {
    title: "Backend",
    detail: "Node.js, Express, Prisma, PostgreSQL, MySQL, JWT, server-sent events.",
  },
  {
    title: "Quality",
    detail: "Playwright end-to-end testing, payment flow verification, structured test reporting.",
  },
  {
    title: "Design",
    detail: "UI/UX for fintech, dark minimal systems, typography and spatial 3D direction.",
  },
];

export const TECH_STACK = [
  { name: "TypeScript", domain: "Typed Frontend" },
  { name: "React", domain: "UI Engineering" },
  { name: "Next.js", domain: "Full-Stack SSR" },
  { name: "Node.js", domain: "APIs & Realtime" },
  { name: "PostgreSQL", domain: "Relational Store" },
  { name: "Prisma", domain: "Schema & ORM" },
  { name: "Python", domain: "Data & Trading" },
  { name: "Playwright", domain: "E2E QA Suite" },
  { name: "Express", domain: "Service Layer" },
  { name: "MySQL", domain: "Transactional DB" },
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
    title: "UI/UX Designer & QA Automation Engineer",
    company: "Mount Meru / Mamastops",
    period: "Current · 3 Years",
    description:
      "Designed interfaces including Cargo-Truck Marketplace and automated end-to-end Playwright verification across five live cashless logistics payment integrations (E-Toll, BookNow, NRFA, Airtel Money V2, M-Pesa Mozambique).",
    skills: ["Playwright QA", "UI/UX Design", "Figma", "Payment Rails"],
  },
  {
    index: "02",
    title: "Founder & Systems Architect",
    company: "JehKTech · KTMNGW · Luminous Pixels",
    period: "Ongoing",
    description:
      "Umbrella operation spanning full-stack SaaS software products (AI-DB Track, StatusHub, OnboardAI), client digital infrastructure (JOIN Transit, Car Guy), and systematic trading tooling.",
    skills: ["SaaS Architecture", "AI Automation", "Client Delivery", "R0TK"],
  },
  {
    index: "03",
    title: "Software Developer Intern",
    company: "Probase Ltd",
    period: "Aug 2024 – May 2025",
    description:
      "Contributed to the development and deployment of business applications interfacing with financial platforms for government revenue collection.",
    skills: ["Full-Stack", "Python", "System Integration", "Technical Writing"],
  },
  {
    index: "04",
    title: "Python Bootcamp Tutor & Web Intern",
    company: "Genius Education · Oasis Infobyte",
    period: "2023 – 2024",
    description:
      "Facilitated comprehensive Python bootcamps translating complex concepts into practical engineering workflows while shipping responsive frontend modules.",
    skills: ["Python", "JavaScript", "Curriculum Design", "Responsive Design"],
  },
];
