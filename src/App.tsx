import { useCallback, useEffect, useState } from "react";
import { PortfolioScene3D } from "./components/PortfolioScene3D";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { TradingSection } from "./components/TradingSection";
import { TechStackSection } from "./components/TechStackSection";
import { SpiritualSection } from "./components/SpiritualSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { HubControlDock } from "./components/HubControlDock";
import { ProjectDetailModal } from "./components/ProjectDetailModal";
import { Toaster } from "./components/ui/sonner";
import { PROJECTS } from "./data/portfolioData";
import type { ProjectCategory } from "./three/portfolioGraph";

export default function App() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<"scroll" | "orbit">("scroll");
  const [activeSection, setActiveSection] = useState<string>("about");
  const [zenMode, setZenMode] = useState(false);

  // Support ?autostart=1 to inspect the pure 3D hub immediately if desired
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autostart") === "1") {
      setCameraMode("orbit");
    }
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setZenMode(false);
    setFocusedProjectId(null);
    setCameraMode("scroll");
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSelectProject = useCallback((projectId: string | null) => {
    setFocusedProjectId(projectId);
    if (projectId) {
      setCameraMode("orbit");
    }
  }, []);

  const handleResetView = useCallback(() => {
    setFocusedProjectId(null);
    setHoveredProjectId(null);
    setActiveFilter("all");
    setCameraMode("scroll");
    setZenMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const inspectedProject =
    PROJECTS.find((p) => p.id === focusedProjectId) ?? null;

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#ededed] relative overflow-x-hidden"
      data-active-section={activeSection}
      data-camera-mode={cameraMode}
    >
      {/* Persistent Interactive 3D Hub & Project Web Layer */}
      <PortfolioScene3D
        activeFilter={activeFilter}
        focusedProjectId={focusedProjectId}
        hoveredProjectId={hoveredProjectId}
        cameraMode={cameraMode}
        onSelectProject={handleSelectProject}
        onHoverProject={setHoveredProjectId}
        onActiveSectionChange={setActiveSection}
      />

      {/* Top Bar */}
      <Navigation
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
      />

      {/* Foreground Portfolio Sections (hidden cleanly in Inspect 3D / Zen Mode) */}
      <main
        className={`relative z-10 pointer-events-none transition-opacity duration-200 ${
          zenMode ? "opacity-0 pointer-events-none select-none" : "opacity-100"
        }`}
        aria-hidden={zenMode}
      >
        <HeroSection
          onExploreProjects={() => scrollToSection("projects")}
          onEnterOrbit={() => {
            setCameraMode("orbit");
            setZenMode(true);
          }}
        />

        <ProjectsSection
          activeFilter={activeFilter}
          focusedProjectId={focusedProjectId}
          onFilterChange={setActiveFilter}
          onFocusProject={handleSelectProject}
          onHoverProject={setHoveredProjectId}
        />

        <TradingSection />

        <TechStackSection />

        <SpiritualSection />

        <ExperienceSection />

        <ContactSection />

        <footer className="bg-[#0a0a0a]/95 border-t border-white/10 py-8 px-6 pb-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8b9099]">
            <p>© 2026 JehKTech · Trade clarity.</p>
            <p className="font-mono text-[#c9a96a]">
              3 · 6 · 9 Sacred Geometry &amp; Spatial Systems
            </p>
          </div>
        </footer>
      </main>

      {/* Collapsible Bottom 3D Hub Dock */}
      <HubControlDock
        cameraMode={cameraMode}
        focusedProjectId={focusedProjectId}
        zenMode={zenMode}
        onToggleCameraMode={(mode) => {
          setCameraMode(mode);
          if (mode === "scroll") setFocusedProjectId(null);
        }}
        onFocusProject={handleSelectProject}
        onToggleZenMode={() => setZenMode((prev) => !prev)}
        onResetView={handleResetView}
      />

      {/* Project Detail Inspector Modal (when focusing a 3D node) */}
      <ProjectDetailModal
        project={inspectedProject}
        onClose={() => setFocusedProjectId(null)}
        onSelectConnectedProject={handleSelectProject}
      />

      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#121418",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            color: "#ededed",
          },
        }}
      />
    </div>
  );
}