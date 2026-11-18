import platinumCourierPreview from "../assets/previews/platinum_courier.png";
import malikCarGuyPreview from "../assets/previews/malik_car_guy.png";
import joinSolutionsPreview from "../assets/previews/join_solutions.png";
import joinMerchantPayPreview from "../assets/previews/join_merchant_pay_v2.png";
import aiDbTrackPreview from "../assets/previews/ai_db_track.png";
import luminousPixelsPreview from "../assets/previews/luminous_pixels.png";
import onboardAiPreview from "../assets/previews/onboard_ai.png";
import r0tkGithubPreview from "../assets/previews/r0tk_github.png";
import jehktechGithubPreview from "../assets/previews/jehktech_github.png";
import type {
  CustomJournalEntry,
  ProjectNodeSpec,
} from "../three/portfolioGraph";

export interface ExternalSystemLink {
  label: string;
  url: string;
}

export interface PortfolioProject extends ProjectNodeSpec {
  typeLabel: string;
  statusLabel: string;
  domainLabel: string;
  description: string;
  architectureNotes: string;
  tech: string[];
  image?: string;
  imageAlt: string;
  live?: string;
  secondaryLinks?: ExternalSystemLink[];
  github?: string;
  complexityScore: number;
}

export const PORTFOLIO_EMAIL = "jehoiachinkatemangwe1@gmail.com";
export const PORTFOLIO_GITHUB = "https://github.com/JehkTech";
export const MASKED_PHONE_DUMMY = "+260 000 000 000";

export const HERO_METRICS = [
  { value: "3+", label: "Years in fintech" },
  { value: "5", label: "Live payment integrations" },
  { value: "4", label: "Client systems shipped" },
  { value: "4", label: "SaaS & AI platforms" },
];

export const PROJECTS: PortfolioProject[] = [
  {
    id: "platinum-courier",
    title: "Platinum Courier Services",
    shortLabel: "01 Platinum",
    category: "clients",
    geometryStyle: "courier",
    orbitAngle: 2.15,
    orbitRadius: 5.5,
    elevation: 1.55,
    accentHex: 0xc9a96a,
    connections: ["join-platform", "mamastops", "ai-db-track"],
    typeLabel: "Client · Nationwide Logistics",
    statusLabel: "Client Live",
    domainLabel: "platinum-courier-services.jehoiachinkatemangwe1.workers.dev",
    description:
      "Nationwide parcel courier and dispatch platform covering all 10 provinces of Zambia with live waybill tracking, quote estimation, pickup scheduling, and staff operations.",
    architectureNotes:
      "Edge-deployed on Cloudflare Workers with instant waybill lookup (PCS tracking), multi-province branch routing, automated dispatch intake, and light/dark UI modes.",
    tech: ["React", "TypeScript", "Cloudflare Workers", "Tracking UX"],
    image: platinumCourierPreview,
    imageAlt: "Live website preview of Platinum Courier Services parcel tracking portal",
    live: "https://platinum-courier-services.jehoiachinkatemangwe1.workers.dev/",
    complexityScore: 86,
  },
  {
    id: "malik-car-guy",
    title: "Car Guy Zambia (Malik)",
    shortLabel: "02 Car Guy",
    category: "clients",
    geometryStyle: "audio",
    orbitAngle: 2.85,
    orbitRadius: 5.6,
    elevation: -0.95,
    accentHex: 0xc9a96a,
    connections: ["luminous-pixels", "join-platform"],
    typeLabel: "Client · Automotive Retail",
    statusLabel: "Client Live",
    domainLabel: "malik-car-guy.vercel.app",
    description:
      "Brand storefront and installation booking platform for Car Guy in Lusaka, Zambia — showcasing Power X audio, Android Auto head units, and custom vehicle interiors.",
    architectureNotes:
      "High-contrast editorial automotive storefront deployed on Vercel with rapid WhatsApp quote conversion, model-fit catalog views, and mobile-first navigation.",
    tech: ["React", "Vercel", "Responsive UI", "Conversion UX"],
    image: malikCarGuyPreview,
    imageAlt: "Live website preview of Car Guy Zambia automotive accessories storefront",
    live: "https://malik-car-guy.vercel.app/",
    complexityScore: 76,
  },
  {
    id: "join-platform",
    title: "JOIN Digital Solutions",
    shortLabel: "03 JOIN Ops",
    category: "clients",
    geometryStyle: "transit",
    orbitAngle: 3.55,
    orbitRadius: 5.8,
    elevation: 2.0,
    accentHex: 0xc0c4cc,
    connections: ["join-merchant-pay", "platinum-courier", "statushub", "luminous-pixels", "mamastops"],
    typeLabel: "Client · Transit Operations",
    statusLabel: "Client Live",
    domainLabel: "joindigitalsolutions.tech",
    description:
      "Transport operations platform built for transit agencies and operators to deploy contactless fares, live route analytics, AI verification, and automated compliance reconciliation.",
    architectureNotes:
      "Modular operator architecture connecting fleet input, AI autofill & verification, payment rail switching, compliance logging, and an interactive system demo.",
    tech: ["React", "Transit Systems", "Analytics", "Workflow Automation"],
    image: joinSolutionsPreview,
    imageAlt: "Live website preview of JOIN Digital Solutions transit platform",
    live: "https://joindigitalsolutions.tech/",
    secondaryLinks: [
      { label: "Live Demo", url: "https://joindemo.netlify.app/" },
    ],
    complexityScore: 92,
  },
  {
    id: "join-merchant-pay",
    title: "JOIN Smart Transit Merchant Pay",
    shortLabel: "04 JOIN Pay",
    category: "clients",
    geometryStyle: "terminal",
    orbitAngle: 4.2,
    orbitRadius: 5.4,
    elevation: -1.45,
    accentHex: 0xc9a96a,
    connections: ["join-platform", "mamastops"],
    typeLabel: "Client · Contactless Pay",
    statusLabel: "Client Live",
    domainLabel: "join-smart-transit-merchant-pay.run.app",
    description:
      "Tap. Pay. Go. Merchant and driver payment interface for the JOIN Smart Transit network featuring OTP onboarding, role presets, and real-time fare settlement.",
    architectureNotes:
      "Cloud Run deployed contactless transit application designed for rapid OTP verification, admin/fleet/driver role flows, and low-latency fare confirmation.",
    tech: ["TypeScript", "Cloud Run", "Transit FinTech", "Merchant UX"],
    image: joinMerchantPayPreview,
    imageAlt: "Live website preview of JOIN Smart Transit Merchant Pay mobile portal",
    live: "https://join-smart-transit-merchant-pay-354740630774.europe-west2.run.app/",
    complexityScore: 88,
  },
  {
    id: "ai-db-track",
    title: "AI-DB Track",
    shortLabel: "05 AI-DB",
    category: "saas",
    geometryStyle: "dbshield",
    orbitAngle: -0.55,
    orbitRadius: 4.6,
    elevation: 1.4,
    accentHex: 0xc9a96a,
    connections: ["statushub", "onboard-ai", "luminous-pixels", "platinum-courier"],
    typeLabel: "SaaS · Database AI",
    statusLabel: "Live Product",
    domainLabel: "ai-db-track.netlify.app",
    description:
      "AI-powered autopilot for PostgreSQL and MSSQL backups featuring automated scheduling, checksum integrity verification, test restores, and compliance tracking.",
    architectureNotes:
      "Automated pg_dump and native MSSQL snapshot orchestration paired with predictive storage analytics, automated test restores, and GDPR/HIPAA audit trails.",
    tech: ["PostgreSQL", "MSSQL", "React", "TypeScript", "Automated Recovery"],
    image: aiDbTrackPreview,
    imageAlt: "Live website preview of AI-DB Track PostgreSQL and MSSQL backup autopilot",
    live: "https://ai-db-track.netlify.app/#features",
    complexityScore: 90,
  },
  {
    id: "luminous-pixels",
    title: "Luminous Pixels",
    shortLabel: "06 Luminous",
    category: "saas",
    geometryStyle: "prism",
    orbitAngle: 0.25,
    orbitRadius: 5.1,
    elevation: -1.1,
    accentHex: 0xc9a96a,
    connections: ["onboard-ai", "ai-db-track", "malik-car-guy", "join-platform"],
    typeLabel: "Agency · AI Automation",
    statusLabel: "Live",
    domainLabel: "luminouspixels.app",
    description:
      "AI automation agency serving ambitious businesses globally with custom workflow pipelines, Sanity CMS content architecture, lead capture, and automated outreach.",
    architectureNotes:
      "Vite + React front end integrated with Sanity CMS, Resend transactional pipelines, WhatsApp concierge intake, and multi-agent sales automation.",
    tech: ["React", "Vite", "Sanity CMS", "Resend", "AI Workflows"],
    image: luminousPixelsPreview,
    imageAlt: "Live website preview of Luminous Pixels AI automation agency",
    live: "https://luminouspixels.app/",
    secondaryLinks: [
      { label: "Netlify Mirror", url: "https://luminuouspixels.netlify.app/#" },
    ],
    complexityScore: 84,
  },
  {
    id: "onboard-ai",
    title: "OnboardAI",
    shortLabel: "07 OnboardAI",
    category: "saas",
    geometryStyle: "pipeline",
    orbitAngle: 1.0,
    orbitRadius: 4.7,
    elevation: 1.85,
    accentHex: 0xc0c4cc,
    connections: ["luminous-pixels", "statushub", "ai-db-track"],
    typeLabel: "SaaS · Client Intelligence",
    statusLabel: "Frontend Live",
    domainLabel: "ai-client-onboarding.netlify.app",
    description:
      "AI-powered client onboarding intelligence platform turning client intake forms into structured scoping reports, project workflows, and conversion telemetry.",
    architectureNotes:
      "Interactive intake SaaS dashboard backed by a production architecture specification covering Redis/BullMQ queues, Prisma ORM, Stripe billing, and WebSockets.",
    tech: ["React", "Vite", "Prisma", "Stripe", "BullMQ"],
    image: onboardAiPreview,
    imageAlt: "Live website preview of OnboardAI intelligence platform",
    live: "https://ai-client-onboarding.netlify.app/",
    complexityScore: 89,
  },
  {
    id: "statushub",
    title: "StatusHub",
    shortLabel: "08 StatusHub",
    category: "saas",
    geometryStyle: "beacon",
    orbitAngle: 1.65,
    orbitRadius: 4.9,
    elevation: -1.65,
    accentHex: 0xc0c4cc,
    connections: ["ai-db-track", "onboard-ai", "join-platform", "trading"],
    typeLabel: "SaaS · Monitoring",
    statusLabel: "In Development",
    domainLabel: "api-statushub.netlify.app",
    description:
      "Webhook management and API status monitoring platform with server-sent event streaming, PostgreSQL GIN full-text search, caching, and rate limiting.",
    architectureNotes:
      "Next.js 14 dashboard and Express ingestion workers backing real-time SSE incident updates, PostgreSQL pg_trgm search indexes, and Firebase authentication.",
    tech: ["Next.js 14", "Express", "Prisma", "PostgreSQL", "SSE"],
    imageAlt: "StatusHub webhook monitoring platform live deployment preview",
    live: "https://api-statushub.netlify.app/",
    complexityScore: 93,
  },
  {
    id: "trading",
    title: "R0TK Trading Journal",
    shortLabel: "09 R0TK",
    category: "fintech",
    geometryStyle: "candlestick",
    orbitAngle: 4.9,
    orbitRadius: 4.8,
    elevation: 1.15,
    accentHex: 0xc9a96a,
    connections: ["statushub", "mamastops"],
    typeLabel: "Fintech · Trading",
    statusLabel: "Active Build",
    domainLabel: "github.com/JehkTech/r0tk_journal",
    description:
      "Full-stack systematic trading journal and analytics engine backing the R0TK methodology with strict risk limits, drawdown telemetry, and session reviews.",
    architectureNotes:
      "Event-driven trade logging paired with PostgreSQL/Supabase backend aggregation, deterministic win-rate calculations, and 3-6-9 harmonic structural studies.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "WebSocket"],
    image: r0tkGithubPreview,
    imageAlt: "GitHub repository preview of JehkTech r0tk_journal systematic trading project",
    github: "https://github.com/JehkTech/r0tk_journal",
    complexityScore: 87,
  },
  {
    id: "mamastops",
    title: "Mamastops Logistics & Payments",
    shortLabel: "10 Mamastops",
    category: "fintech",
    geometryStyle: "logistics",
    orbitAngle: 5.6,
    orbitRadius: 5.3,
    elevation: -0.95,
    accentHex: 0xc0c4cc,
    connections: ["platinum-courier", "join-platform", "join-merchant-pay", "trading"],
    typeLabel: "Fintech · Logistics",
    statusLabel: "Production",
    domainLabel: "github.com/JehkTech",
    description:
      "Cargo-Truck Marketplace UI/UX and five live cashless payment integrations (E-Toll, BookNow, NRFA, Airtel Money V2, M-Pesa Mozambique, WhatsApp OTP).",
    architectureNotes:
      "Multi-role dispatch flows, driver matching, and automated Playwright end-to-end QA verification across live mobile-money and tolling rails.",
    tech: ["Figma", "Playwright", "QA Automation", "Payment Rails"],
    image: jehktechGithubPreview,
    imageAlt: "GitHub profile preview showcasing JehkTech production fintech and Mamastops engineering work",
    github: "https://github.com/JehkTech",
    complexityScore: 95,
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
      "Umbrella operation spanning full-stack SaaS software products (AI-DB Track, StatusHub, OnboardAI), client digital infrastructure (Platinum Courier, JOIN Transit, Car Guy), and systematic trading tooling.",
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

export const DEFAULT_JOURNAL_ENTRIES: CustomJournalEntry[] = [
  {
    id: "seed-1",
    title: "Stillness Before Execution",
    category: "Reflection",
    body: "Structure precedes speed. Before deploying any payment flow or entering an R0TK setup, define invalidation first and let noise pass.",
    createdAt: "2026-11-12",
  },
  {
    id: "seed-2",
    title: "Harmonic Alignment Sequence",
    category: "Numeric Code",
    code: "369 818 719",
    body: "Morning calibration note: clear intent (3), uninterrupted cadence (6), finished release (9).",
    createdAt: "2026-11-15",
  },
];

