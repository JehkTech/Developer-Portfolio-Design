import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "trading", label: "Trading" },
  { id: "stack", label: "Architecture" },
  { id: "experience", label: "Experience" },
];

export function Navigation({
  activeSection,
  onNavigateSection,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a]/95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("about");
          }}
          className="font-display text-lg font-semibold tracking-tight text-[#ededed] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a96a]"
        >
          Jeh<span className="text-[#c9a96a]">K</span>Tech
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
                    ? "text-[#c9a96a] border-[#c9a96a]"
                    : "text-[#c0c4cc] border-transparent hover:text-[#ededed] hover:border-white/30"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            className="hidden md:inline-flex items-center px-4 py-2 text-xs font-semibold bg-[#c9a96a] text-[#0a0a0a] rounded-lg hover:bg-[#d8bc82] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 text-[#c0c4cc] hover:text-white rounded-lg border border-white/10"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#121212] border-t border-white/10 px-6 py-4 space-y-2">
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className={`block py-2 text-sm font-medium ${
                activeSection === item.id ? "text-[#c9a96a]" : "text-[#c0c4cc]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            className="w-full mt-2 px-4 py-2.5 text-sm font-semibold bg-[#c9a96a] text-[#0a0a0a] rounded-lg"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}