import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import type { PortfolioTheme } from "../three/portfolioGraph";

interface NavigationProps {
  theme: PortfolioTheme;
  activeSection: string;
  onToggleTheme: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "clients", label: "Clients" },
  { id: "projects", label: "Projects" },
  { id: "trading", label: "Trading" },
  { id: "experience", label: "Experience" },
];

export function Navigation({
  theme,
  activeSection,
  onToggleTheme,
  onNavigateSection,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--bg-canvas)]/95 border-b border-[var(--border-hairline)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("about");
          }}
          className="font-display text-lg font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-gold)]"
        >
          Jeh<span className="text-[var(--accent-gold)]">K</span>Tech
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 pb-0.5 border-b ${
                  isActive
                    ? "text-[var(--accent-gold)] border-[var(--accent-gold)]"
                    : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Single Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={theme === "light"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors duration-150 cursor-pointer shrink-0"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            className="hidden md:inline-flex items-center px-4 py-2 text-xs font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg border border-[var(--border-hairline)] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-surface-solid)] border-t border-[var(--border-hairline)] px-6 py-4 space-y-2">
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className={`block py-2 text-sm font-medium ${
                activeSection === item.id
                  ? "text-[var(--accent-gold)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            className="w-full mt-2 px-4 py-2.5 text-sm font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-lg cursor-pointer"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}