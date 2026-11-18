# JehKTech — 3D Portfolio & Spatial Systems

Interactive 3D portfolio for **JehKTech (Jehoiachin Katemangwe)** blending a scroll-coupled Three.js wireframe constellation directly behind **Client Work**, **SaaS & AI products**, and the **R0TK** systematic trading operation — with full Dark (Obsidian) and Light (Alabaster) theme parity.

## Architecture Overview

- **Scroll-Coupled 3D Spatial Canvas (`src/components/PortfolioScene3D.tsx`)**
  - **Wireframe Sacred Geometry Core (`createSacredHubGroup`)**: Champagne-gold / antique-bronze wireframe icosahedron (`IcosahedronGeometry`), hairline orbital astrolabe rings, and faceted crystal core suspended inside a dual-theme void (`#0a0a0a` Dark / `#f6f5f1` Light) with matching exponential fog.
  - **10 Constellation Polyhedra (`createProjectNodeGroup`)**: Minimalist architectural wireframe polyhedron assemblies for Client Deployments (*Platinum Courier Services*, *Car Guy Zambia*, *JOIN Digital Solutions*, *JOIN Smart Transit Merchant Pay*), SaaS & AI (*AI-DB Track*, *Luminous Pixels*, *OnboardAI*, *StatusHub*), and Fintech (*R0TK Trading Journal*, *Mamastops Logistics & Payments*), each with Layer-1 raycast picking proxies.
  - **Spline Constellation Web & Starfield (`createWebFilaments`, `createAtmosphericStarfield`)**: Curved spline filaments with traveling signal motes linking every node to the core and connected systems, backed by a 1,400-point starfield.
  - **Direct Scroll Synchronization**: Scrolling smoothly glides and rotates the constellation (`computeScrollSceneTransform`) while advancing camera waypoints (`SECTION_WAYPOINTS`) and pointer parallax — with no distracting bottom 3D dock. Closing `ProjectDetailModal` automatically restores scroll-coupled camera tracking.
  - **Dual-Theme Live 3D Recoloring**: `getSceneThemePalette("dark" | "light")` recolors background, fog, lights, starfield, wireframes, and splines in real time without tearing down the WebGL context.
- **Pure Spatial Graph, Analytics & Domain Logic (`src/three/portfolioGraph.ts`)**
  - Unit-tested math, chart aggregators, and theme palettes (`computeProjectNodePosition`, `computeScrollSceneTransform`, `getSceneThemePalette`, `buildWebEdges`, `interpolateCameraState`, `filterProjects`, `computeProjectComplexityMetrics`, `computeTechDistribution`, `validateContactForm`).
- **Portfolio Sections & Analytics (`src/components/`)**
  - **Framer Motion Scroll Reveals (`MotionReveal.tsx`)**: Smooth GPU-composited `whileInView` fade + slide entrances across Hero, Projects, Portfolio Analytics, Trading, Tech Stack, Wisdom, Experience, and Contact sections (honoring `prefers-reduced-motion`).
  - **Real Website Previews & Recharts Analytics (`ProjectsSection.tsx`, `PortfolioMetricsCharts.tsx`, `ProjectDetailModal.tsx`)**: Minimalist browser-framed captures of actual live deployments plus Snapshot / Live Frame `iframe` toggle in `ProjectDetailModal`, and dual theme-aware Recharts visualizations (`Architecture Complexity Index` & `Tech Stack Distribution`).
  - `Navigation` (with Sun/Moon Dark & Light mode toggle), `HeroSection`, `ProjectsSection`, `TradingSection`, `TechStackSection`, `SpiritualSection`, `ExperienceSection`, `ContactSection`, and `ProjectDetailModal`.

## Commands

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm run build

# Run spatial graph & theme unit tests
npx --yes tsx --test src/three/portfolioGraph.test.ts
```