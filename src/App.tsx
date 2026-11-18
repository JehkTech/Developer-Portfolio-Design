import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PortfolioScene3D } from "./components/PortfolioScene3D";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { TradingSection } from "./components/TradingSection";
import { TechStackSection } from "./components/TechStackSection";
import { SpiritualSection } from "./components/SpiritualSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { ProjectDetailModal } from "./components/ProjectDetailModal";
import { Toaster } from "./components/ui/sonner";
import { PROJECTS } from "./data/portfolioData";
import type { PortfolioTheme, ProjectCategory } from "./three/portfolioGraph";

const THEME_STORAGE_KEY = "jehktech-theme";

function getInitialTheme(): PortfolioTheme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // ignore storage errors
  }
  return "dark";
}

export default function App() {
  const [theme, setTheme] = useState<PortfolioTheme>(getInitialTheme);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<"scroll" | "orbit">("scroll");
  const [activeSection, setActiveSection] = useState<string>("about");
  const [zenMode, setZenMode] = useState(false);

  // Sync <html class="dark"> and colorScheme with active theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Support ?autostart=1 to inspect the pure 3D hub immediately if desired
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autostart") === "1") {
      setCameraMode("orbit");
      setZenMode(true);
    }
  }, []);

  // Allow Escape key to exit pure 3D orbit view cleanly
  useEffect(() => {
    if (!zenMode) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZenMode(false);
        setFocusedProjectId(null);
        setCameraMode("scroll");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zenMode]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
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
    setCameraMode(projectId ? "orbit" : "scroll");
  }, []);

  const handleCloseModal = useCallback(() => {
    setFocusedProjectId(null);
    if (!zenMode) {
      setCameraMode("scroll");
    }
  }, [zenMode]);

  const handleExitOrbit = useCallback(() => {
    setZenMode(false);
    setFocusedProjectId(null);
    setCameraMode("scroll");
  }, []);

  const inspectedProject =
    PROJECTS.find((p) => p.id === focusedProjectId) ?? null;

  return (
    <div
      className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] relative overflow-x-hidden transition-colors duration-200"
      data-theme={theme}
      data-active-section={activeSection}
      data-camera-mode={cameraMode}
    >
      {/* Persistent Scroll-Coupled Interactive 3D Hub & Project Web Layer */}
      <PortfolioScene3D
        theme={theme}
        activeFilter={activeFilter}
        focusedProjectId={focusedProjectId}
        hoveredProjectId={hoveredProjectId}
        cameraMode={cameraMode}
        onSelectProject={handleSelectProject}
        onHoverProject={setHoveredProjectId}
        onActiveSectionChange={setActiveSection}
      />

      <div className="grain-overlay" aria-hidden="true" />

      {/* Top Bar */}
      <Navigation
        theme={theme}
        activeSection={activeSection}
        onToggleTheme={toggleTheme}
        onNavigateSection={scrollToSection}
      />

      {/* Minimalist exit control shown ONLY during full-screen 3D Orbit inspection */}
      {zenMode && (
        <button
          type="button"
          onClick={handleExitOrbit}
          className="fixed top-20 right-6 z-40 px-4 py-2 text-xs font-semibold bg-[var(--bg-surface-solid)] text-[var(--text-primary)] border border-[var(--border-hairline)] rounded-lg hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors duration-150 inline-flex items-center gap-2 shadow-lg cursor-pointer pointer-events-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>
      )}

      {/* Blended Foreground Portfolio Content (hidden during Orbit 3D Hub mode) */}
      <main
        className={`relative z-10 pointer-events-none transition-opacity duration-200 ${
          zenMode ? "opacity-0 pointer-events-none select-none" : "opacity-100"
        }`}
        aria-hidden={zenMode}
      >
        <HeroSection
          onExploreProjects={() => scrollToSection("clients")}
          onEnterOrbit={() => {
            setCameraMode("orbit");
            setZenMode(true);
          }}
        />

        <ProjectsSection
          theme={theme}
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

        <footer className="bg-[var(--bg-canvas)]/95 border-t border-[var(--border-hairline)] py-8 px-6 pointer-events-auto transition-colors duration-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>© 2026 JehKTech · Trade clarity.</p>
            <p className="font-mono text-[var(--accent-gold)]">
              3 · 6 · 9 Sacred Geometry &amp; Spatial Systems
            </p>
          </div>
        </footer>
      </main>

      {/* Project Detail Inspector Modal (when focusing a 3D node) */}
      <ProjectDetailModal
        project={inspectedProject}
        onClose={handleCloseModal}
        onSelectConnectedProject={handleSelectProject}
      />

      <Toaster
        theme={theme}
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--bg-surface-solid)",
            border: "1px solid var(--border-hairline)",
            color: "var(--text-primary)",
          },
        }}
      />
    </div>
  );
}