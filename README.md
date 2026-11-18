# JehKTech — 3D Portfolio Hub & Spatial Systems

Interactive 3D portfolio hub for **JehKTech (Jehoiachin Katemangwe)** linking SaaS products, AI automation infrastructure, client transit & automotive deployments, and the **R0TK** systematic trading operation inside an interconnected Three.js spatial web.

## Architecture Overview

- **Persistent 3D Spatial Hub (`src/components/PortfolioScene3D.tsx`)**
  - **Sacred Geometry Core (`createSacredHubGroup`)**: Multi-layered 3-6-9 harmonic gimbal rings, faceted inner octahedron core, and champagne-gold orbital markers (`#0a0a0a` obsidian + `#c9a96a` champagne gold palette).
  - **9 Composite Satellite Nodes (`createProjectNodeGroup`)**: Bespoke procedural 3D assemblies for *AI-DB Track*, *Luminous Pixels*, *OnboardAI*, *StatusHub*, *Car Guy Zambia*, *JOIN Digital Solutions*, *JOIN Smart Transit Merchant Pay*, *R0TK Trading Journal*, and *Mamastops Logistics & Payments*, each with Layer-1 raycast picking proxies.
  - **Glowing Web Filaments (`createWebFilaments`)**: Curved quadratic bezier spline filaments with animated traveling pulse beads linking every system to the central core and cross-linking related platforms.
  - **Scroll-Linked Camera & Free Orbit**: Exponentially damped camera waypoints (`SECTION_WAYPOINTS`) across 7 sections (`about`, `projects`, `trading`, `stack`, `wisdom`, `experience`, `contact`), plus `Free Orbit` (`OrbitControls`) and click-to-focus node inspection (`ProjectDetailModal`).
  - **Adaptive Rendering**: Software WebGL detection (`isSoftwareGl`) switching to `afterDraw()` pacing, `pixelRatio: 1`, and reduced overhead in headless/software environments, plus `webglcontextlost`/`restored` recovery and `prefers-reduced-motion` support.
- **Pure Spatial Graph & Domain Logic (`src/three/portfolioGraph.ts`)**
  - Pure TypeScript math and state utilities for orbital placement, focus camera framing, deduplicated web-edge generation, boundary-clamped camera interpolation, project category filtering (`all`, `saas`, `clients`, `fintech`), and contact form validation.
- **Portfolio Sections (`src/components/`)**
  - `Navigation`, `HeroSection` (precision-under-pressure framing & 4 KPI metrics), `ProjectsSection` (9 linked live & GitHub systems), `TradingSection` (R0TK, Midnight Opening Gap DOI, MT5 Trade Copier), `TechStackSection`, `SpiritualSection`, `ExperienceSection`, `ContactSection`, `HubControlDock`, and `ProjectDetailModal`.

## Commands

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm run build

# Run spatial graph & portfolio unit tests
npx --yes tsx --test src/three/portfolioGraph.test.ts
```