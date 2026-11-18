# JehkTech — 3D Portfolio Hub & Spatial Systems

Interactive 3D portfolio hub for **Jeh (JehkTech)** combining full-stack systems engineering, Bitcoin & Lightning infrastructure, DeFi smart contract architecture, and Tesla `3 · 6 · 9` sacred geometry in a unified Three.js spatial graph.

## Architecture Overview

- **Persistent 3D Spatial Hub (`src/components/PortfolioScene3D.tsx`)**
  - **Sacred Geometry Core (`createSacredHubGroup`)**: Multi-layered 3-6-9 harmonic gyroscope rings, faceted inner octahedron core, and brass orbital markers.
  - **5 Composite Satellite Nodes (`createProjectNodeGroup`)**: Procedural 3D assemblies for each featured project (`Trading Journal`, `Lightning Gateway`, `DeFi Suite`, `Cargo UI/UX`, `Frequency Healer`) with invisible raycast picking proxies on Layer 1.
  - **Glowing Web Filaments (`createWebFilaments`)**: Curved quadratic/cubic bezier spline tubes linking projects to the central hub and to each other based on shared technical domains, complete with traveling signal pulse beads.
  - **Scroll-Linked Camera & Free Orbit**: Exponentially damped camera waypoints (`SECTION_WAYPOINTS`) synchronized with scroll progress, plus `Free Orbit` (`OrbitControls`) and click-to-focus node inspection (`ProjectDetailModal`).
  - **Adaptive Rendering**: Automatic software WebGL detection (`isSoftwareGl`) switching to `afterDraw()` pacing, `pixelRatio: 1`, and reduced overhead in headless/software environments, plus `webglcontextlost`/`restored` recovery and `prefers-reduced-motion` support.
- **Pure Spatial Graph & Domain Logic (`src/three/portfolioGraph.ts`)**
  - Pure TypeScript math and state utilities for camera interpolation, satellite placement, focus camera framing, web-edge graph generation, project category filtering, and contact form validation.
- **Interactive Sections (`src/components/`)**
  - `Navigation`: Single-line top navigation bar with mobile drawer.
  - `HubControlDock`: Collapsible bottom spatial controller (`Scroll Sync` / `Free Orbit`, direct node focus shortcuts, reset view, and `H` keyboard toggle). Collapsed by default on mobile viewports (`< 768px`).
  - `HeroSection`, `ProjectsSection`, `TechStackSection`, `SpiritualSection`, `ExperienceSection`, `ContactSection`, `ProjectDetailModal`.

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