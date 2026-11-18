import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Compass, Eye, EyeOff, RotateCcw } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";

interface HubControlDockProps {
  cameraMode: "scroll" | "orbit";
  focusedProjectId: string | null;
  zenMode: boolean;
  onToggleCameraMode: (mode: "scroll" | "orbit") => void;
  onFocusProject: (projectId: string | null) => void;
  onToggleZenMode: () => void;
  onResetView: () => void;
}

export function HubControlDock({
  cameraMode,
  focusedProjectId,
  zenMode,
  onToggleCameraMode,
  onFocusProject,
  onToggleZenMode,
  onResetView,
}: HubControlDockProps) {
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "h" || e.key === "H") {
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] pointer-events-auto"
      role="region"
      aria-label="3D Portfolio Hub Controls"
    >
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
          className="px-3 py-1 text-xs font-medium text-slate-300 bg-[#0c111b] border border-b-0 border-white/15 rounded-t-lg hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {collapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Show 3D Dock</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Hide 3D Dock</span>
            </>
          )}
        </button>

        {!collapsed && (
          <div className="bg-[#0b101a]/95 border border-white/15 rounded-xl px-3 py-2 shadow-2xl flex items-center gap-2 overflow-x-auto max-w-full">
            {/* Scroll Sync vs Free Orbit segmented toggle */}
            <div
              className="flex items-center bg-[#131a29] p-0.5 rounded-lg border border-white/10 shrink-0"
              role="group"
              aria-label="Camera navigation mode"
            >
              <button
                type="button"
                onClick={() => onToggleCameraMode("scroll")}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  cameraMode === "scroll"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Scroll Sync
              </button>
              <button
                type="button"
                onClick={() => onToggleCameraMode("orbit")}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  cameraMode === "orbit"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Free Orbit
              </button>
            </div>

            <div className="h-5 w-px bg-white/10 shrink-0" aria-hidden="true" />

            {/* Node web jump buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onFocusProject(null)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  focusedProjectId === null
                    ? "border-amber-500/70 bg-amber-500/15 text-amber-300"
                    : "border-white/10 text-slate-300 hover:text-white hover:border-white/25"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Hub Core</span>
              </button>

              {PROJECTS.map((proj) => {
                const isActive = focusedProjectId === proj.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => onFocusProject(proj.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? "border-amber-500 bg-amber-500 text-slate-950"
                        : "border-white/10 text-slate-300 hover:text-white hover:border-white/25"
                    }`}
                  >
                    {proj.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="h-5 w-px bg-white/10 shrink-0" aria-hidden="true" />

            {/* 3D Canvas Inspection & Reset */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onToggleZenMode}
                aria-pressed={zenMode}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  zenMode
                    ? "border-sky-400 bg-sky-400/20 text-sky-200"
                    : "border-white/10 text-slate-300 hover:text-white hover:border-white/25"
                }`}
              >
                {zenMode ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
                <span>{zenMode ? "Show Overlay" : "Inspect 3D"}</span>
              </button>

              <button
                type="button"
                onClick={onResetView}
                aria-label="Reset 3D hub view"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg border border-white/10 hover:border-white/25 transition-colors duration-150 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
