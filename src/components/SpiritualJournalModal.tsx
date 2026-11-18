import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  DEFAULT_JOURNAL_ENTRIES,
  GRABOVOI_CODES,
  SPIRITUAL_INSIGHTS,
  TESLA_NUMBERS,
} from "../data/portfolioData";
import {
  buildJournalSpreads,
  stepJournalPage,
  validateJournalEntryInput,
  type CustomJournalEntry,
  type JournalEntryCategory,
  type JournalEntryErrors,
  type PortfolioTheme,
} from "../three/portfolioGraph";

const JOURNAL_STORAGE_KEY = "jehktech-wisdom-journal-entries";

const ENTRY_CATEGORIES: JournalEntryCategory[] = [
  "Reflection",
  "Numeric Code",
  "Principle",
  "Quote",
];

export function loadStoredJournalEntries(): CustomJournalEntry[] {
  if (typeof window === "undefined") return DEFAULT_JOURNAL_ENTRIES;
  try {
    const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!raw) return DEFAULT_JOURNAL_ENTRIES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // fallback cleanly to seeded entries
  }
  return DEFAULT_JOURNAL_ENTRIES;
}

interface SpiritualJournalModalProps {
  open: boolean;
  theme: PortfolioTheme;
  onClose: () => void;
  onContinueDown: () => void;
  entries: CustomJournalEntry[];
  onEntriesChange: (next: CustomJournalEntry[]) => void;
}

export function SpiritualJournalModal({
  open,
  theme,
  onClose,
  onContinueDown,
  entries,
  onEntriesChange,
}: SpiritualJournalModalProps) {
  const prefersReduced = useReducedMotion();
  const spreads = useMemo(() => buildJournalSpreads(entries, 4), [entries]);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [revealedCodes, setRevealedCodes] = useState<Record<string, boolean>>({});
  const [composerOpen, setComposerOpen] = useState(false);

  // New journal entry form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<JournalEntryCategory>("Reflection");
  const [code, setCode] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<JournalEntryErrors>({});

  const lastWheelAtRef = useRef<number>(0);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  // Clamp pageIndex if entries deleted
  useEffect(() => {
    if (pageIndex >= spreads.length) {
      setPageIndex(Math.max(0, spreads.length - 1));
    }
  }, [pageIndex, spreads.length]);

  // Reset to opening spread when opened & lock background scroll
  useEffect(() => {
    if (!open) return;
    setPageIndex(0);
    setDirection(1);
    setComposerOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const turnPage = useCallback(
    (delta: 1 | -1) => {
      const step = stepJournalPage(pageIndex, spreads.length, delta);
      if (step.outcome === "continue-down") {
        onContinueDown();
        return;
      }
      if (step.outcome === "flipped") {
        setDirection(delta);
        setPageIndex(step.nextIndex);
      }
    },
    [onContinueDown, pageIndex, spreads.length]
  );

  const jumpToPage = useCallback(
    (targetIdx: number) => {
      if (targetIdx === pageIndex) return;
      const clamped = Math.max(0, Math.min(spreads.length - 1, targetIdx));
      setDirection(clamped > pageIndex ? 1 : -1);
      setPageIndex(clamped);
    },
    [pageIndex, spreads.length]
  );

  const openComposerSpread = useCallback(() => {
    const notesIdx = spreads.findIndex((s) => s.kind === "notes");
    if (notesIdx !== -1 && notesIdx !== pageIndex) {
      setDirection(notesIdx > pageIndex ? 1 : -1);
      setPageIndex(notesIdx);
    }
    setComposerOpen(true);
    setTimeout(() => titleInputRef.current?.focus(), 140);
  }, [pageIndex, spreads]);

  // Keyboard navigation inside open journal
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (isEditing) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        turnPage(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        turnPage(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open, turnPage]);

  // Wheel / trackpad flips sideways, and continues down once past the final spread
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (composerOpen) return;
    const target = e.target as HTMLElement | null;
    if (
      target?.tagName === "INPUT" ||
      target?.tagName === "TEXTAREA" ||
      target?.closest("[data-journal-scrollable='true']")
    ) {
      const scrollHost = target?.closest(
        "[data-journal-scrollable='true']"
      ) as HTMLElement | null;
      if (scrollHost && scrollHost.scrollHeight > scrollHost.clientHeight + 4) {
        const atBottom =
          scrollHost.scrollTop + scrollHost.clientHeight >=
          scrollHost.scrollHeight - 4;
        const atTop = scrollHost.scrollTop <= 4;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          return;
        }
      }
    }

    const dominantDelta =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(dominantDelta) < 28) return;

    const now = Date.now();
    if (now - lastWheelAtRef.current < 480) return;
    lastWheelAtRef.current = now;

    turnPage(dominantDelta > 0 ? 1 : -1);
  };

  const toggleCode = (targetCode: string) => {
    setRevealedCodes((prev) => ({ ...prev, [targetCode]: !prev[targetCode] }));
  };

  const toggleAllCodes = () => {
    const allOpen = GRABOVOI_CODES.every((c) => revealedCodes[c.code]);
    const next: Record<string, boolean> = {};
    for (const item of GRABOVOI_CODES) {
      next[item.code] = !allOpen;
    }
    setRevealedCodes(next);
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateJournalEntryInput({ title, category, code, body });
    setErrors(validation.errors);
    if (!validation.valid) {
      toast.error("Please enter both a heading and your journal note.");
      return;
    }

    const newEntry: CustomJournalEntry = {
      id: `entry-${Date.now()}`,
      title: title.trim(),
      category,
      code: code.trim() || undefined,
      body: body.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const nextEntries = [newEntry, ...entries];
    onEntriesChange(nextEntries);
    try {
      window.localStorage.setItem(
        JOURNAL_STORAGE_KEY,
        JSON.stringify(nextEntries)
      );
    } catch {
      // ignore storage errors
    }

    setTitle("");
    setCode("");
    setBody("");
    setErrors({});
    setComposerOpen(false);
    toast.success("Added entry to your Wisdom Journal");

    const notesIdx = spreads.findIndex((s) => s.kind === "notes");
    if (notesIdx !== -1) {
      setPageIndex(notesIdx);
    }
  };

  const handleDeleteEntry = (entryId: string) => {
    const nextEntries = entries.filter((item) => item.id !== entryId);
    onEntriesChange(nextEntries);
    try {
      window.localStorage.setItem(
        JOURNAL_STORAGE_KEY,
        JSON.stringify(nextEntries)
      );
    } catch {
      // ignore storage errors
    }
    toast.success("Journal entry removed");
  };

  if (!open) return null;

  const currentSpread = spreads[pageIndex] ?? spreads[0];
  const isFirst = pageIndex === 0;
  const isLast = pageIndex === spreads.length - 1;
  const isDark = theme === "dark";

  // Archival book surface palette tailored to obsidian Dark & warm parchment Light themes
  const paperBg = isDark ? "bg-[#14141b]" : "bg-[#fbf9f5]";
  const paperRightBg = isDark ? "bg-[#191923]" : "bg-[#f2ede2]";
  const paperRule = isDark
    ? "border-[#f4efe6]/14"
    : "border-[#111116]/12";
  const paperText = isDark ? "text-[#f4efe6]" : "text-[#111116]";
  const paperSecondary = isDark ? "text-[#cbc8d8]" : "text-[#363440]";
  const paperMuted = isDark ? "text-[#938fa6]" : "text-[#5d596b]";

  const pageVariants = {
    enter: (dir: number) =>
      prefersReduced
        ? { opacity: 0 }
        : {
            opacity: 0,
            rotateY: dir > 0 ? 44 : -44,
            x: dir > 0 ? 48 : -48,
            scale: 0.985,
          },
    center: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) =>
      prefersReduced
        ? { opacity: 0 }
        : {
            opacity: 0,
            rotateY: dir > 0 ? -44 : 44,
            x: dir > 0 ? -48 : 48,
            scale: 0.985,
          },
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] bg-[var(--bg-canvas)]/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-5 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wisdom-journal-modal-title"
      onWheel={handleWheel}
      data-testid="wisdom-journal-modal"
      data-journal-page={pageIndex + 1}
      data-journal-total={spreads.length}
    >
      {/* Top Reader Controls Bar */}
      <header className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-hairline)] shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <BookOpen
            className="w-4 h-4 text-[var(--accent-gold)] shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h2
              id="wisdom-journal-modal-title"
              className="font-display text-base sm:text-lg font-semibold text-[var(--text-primary)] truncate"
            >
              Universal Codes &amp; Wisdom · Field Journal
            </h2>
            <p className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
              Folio {currentSpread.folio} of{" "}
              {String(spreads.length).padStart(2, "0")} · {currentSpread.chapter}
            </p>
          </div>
        </div>

        {/* Chapter Jump Tabs */}
        <nav
          aria-label="Journal chapters"
          className="hidden md:flex items-center gap-1 bg-[var(--bg-surface-solid)] border border-[var(--border-hairline)] rounded-lg p-1"
        >
          {spreads.map((sp, idx) => {
            const active = idx === pageIndex;
            return (
              <button
                key={sp.id}
                type="button"
                onClick={() => jumpToPage(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? "bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {sp.folio} ·{" "}
                {sp.kind === "tesla"
                  ? "3-6-9"
                  : sp.kind === "codes"
                  ? "Codes"
                  : sp.kind === "principles"
                  ? "Principles"
                  : sp.pageSliceIndex === 0
                  ? "Added Notes"
                  : `Notes ${sp.pageSliceIndex + 1}`}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={openComposerSpread}
            className="px-3.5 py-2 text-xs font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Entry</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close wisdom journal"
            className="px-3 py-2 text-xs font-medium bg-[var(--bg-surface-solid)] border border-[var(--border-hairline)] text-[var(--text-primary)] rounded-lg hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* Open Two-Page Book Spread with Sideways 3D Flip Animation */}
      <div
        className="flex-1 min-h-0 max-w-7xl w-full mx-auto py-4 sm:py-6 flex items-stretch justify-center"
        style={{ perspective: "2200px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSpread.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: prefersReduced ? 0.12 : 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
            className={`w-full h-full rounded-2xl border ${paperRule} shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative`}
          >
            {/* Central Book Spine Shadow on Desktop */}
            <div
              aria-hidden="true"
              className={`hidden lg:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 z-10 ${
                isDark
                  ? "bg-gradient-to-r from-black/45 via-black/75 to-black/45"
                  : "bg-gradient-to-r from-[#141518]/6 via-[#141518]/18 to-[#141518]/6"
              }`}
            />

            {/* LEFT FOLIO PAGE */}
            <div
              data-journal-scrollable="true"
              className={`${paperBg} p-6 sm:p-8 lg:p-10 lg:pr-12 flex flex-col justify-between overflow-y-auto border-b lg:border-b-0 lg:border-r ${paperRule}`}
            >
              {currentSpread.kind === "tesla" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>{currentSpread.chapter} · Left Folio</span>
                      <span>Tesla 3 · 6 · 9</span>
                    </div>
                    <h3
                      className={`font-display text-2xl sm:text-3xl font-light tracking-tight mb-4 ${paperText}`}
                    >
                      Harmonic{" "}
                      <strong className="font-semibold">
                        Energy, Frequency &amp; Vibration
                      </strong>
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-8 ${paperSecondary}`}
                    >
                      Engineering precision begins with internal stillness and
                      deliberate pattern recognition. The 3-6-9 harmonic model
                      anchors creative intent, uninterrupted flow, and finished
                      execution.
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {TESLA_NUMBERS.map((item) => (
                        <div
                          key={item.digit}
                          className={`rounded-lg border ${paperRule} p-4 text-center ${
                            isDark ? "bg-white/[0.02]" : "bg-[#141518]/[0.025]"
                          }`}
                        >
                          <div className="font-display text-3xl font-semibold text-[var(--accent-gold)] tabular-nums mb-1">
                            {item.digit}
                          </div>
                          <p className={`text-xs ${paperSecondary}`}>
                            {item.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`pt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>Universal Codes &amp; Wisdom</span>
                    <span className="tabular-nums">Page 01</span>
                  </div>
                </>
              )}

              {currentSpread.kind === "codes" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>{currentSpread.chapter} · Left Folio</span>
                      <span>Resonance Index</span>
                    </div>
                    <h3
                      className={`font-display text-2xl sm:text-3xl font-light tracking-tight mb-4 ${paperText}`}
                    >
                      Quantum{" "}
                      <strong className="font-semibold">Healing Codes</strong>
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-6 ${paperSecondary}`}
                    >
                      Numerical sequences curated for clarity, abundance, and
                      intentional state calibration. Each sequence stays veiled
                      until hovered or locked open for mindful focus.
                    </p>

                    <button
                      type="button"
                      onClick={toggleAllCodes}
                      className={`px-4 py-2 text-xs font-medium border ${paperRule} rounded-lg hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 cursor-pointer ${paperText}`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>
                        {GRABOVOI_CODES.every((c) => revealedCodes[c.code])
                          ? "Veil All Sequences"
                          : "Reveal All Sequences"}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`pt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>Select any row on right folio to lock</span>
                    <span className="tabular-nums">Page 03</span>
                  </div>
                </>
              )}

              {currentSpread.kind === "principles" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>{currentSpread.chapter} · Left Folio</span>
                      <span>Rules 01 – 05</span>
                    </div>
                    <h3
                      className={`font-display text-2xl sm:text-3xl font-light tracking-tight mb-6 ${paperText}`}
                    >
                      Manifestation{" "}
                      <strong className="font-semibold">Principles</strong>
                    </h3>

                    <ol className="space-y-4">
                      {SPIRITUAL_INSIGHTS.slice(0, 5).map((insight, idx) => (
                        <li
                          key={insight}
                          className={`pb-3.5 border-b ${paperRule} flex items-start gap-3.5`}
                        >
                          <span className="font-mono text-xs text-[var(--accent-gold)] tabular-nums pt-0.5 shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <p
                            className={`text-sm leading-relaxed ${paperSecondary}`}
                          >
                            {insight}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div
                    className={`pt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>Mindset &amp; Internal Accountability</span>
                    <span className="tabular-nums">Page 05</span>
                  </div>
                </>
              )}

              {currentSpread.kind === "notes" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>{currentSpread.chapter} · Left Folio</span>
                      <span className="tabular-nums">
                        {entries.length}{" "}
                        {entries.length === 1 ? "Entry" : "Entries"}
                      </span>
                    </div>
                    <h3
                      className={`font-display text-2xl sm:text-3xl font-light tracking-tight mb-5 ${paperText}`}
                    >
                      Recorded{" "}
                      <strong className="font-semibold">Field Notes</strong>
                    </h3>

                    {currentSpread.entries.length === 0 ? (
                      <div
                        className={`p-6 rounded-xl border border-dashed ${paperRule} text-sm ${paperMuted}`}
                      >
                        No custom entries recorded yet. Use the form on the
                        right page to add a reflection, code, or principle to
                        your journal.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {currentSpread.entries.map((entry) => (
                          <article
                            key={entry.id}
                            className={`p-4 rounded-lg border ${paperRule} ${
                              isDark ? "bg-white/[0.02]" : "bg-[#141518]/[0.02]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[11px] font-mono text-[var(--accent-gold)]">
                                {entry.category} · {entry.createdAt}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteEntry(entry.id)}
                                aria-label={`Remove journal entry ${entry.title}`}
                                className={`p-1 rounded hover:text-rose-500 transition-colors cursor-pointer ${paperMuted}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex items-baseline justify-between gap-3 mb-1">
                              <h4
                                className={`font-display text-base font-semibold ${paperText}`}
                              >
                                {entry.title}
                              </h4>
                              {entry.code && (
                                <span className="font-mono text-xs text-[var(--accent-gold)] tabular-nums shrink-0">
                                  {entry.code}
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-sm leading-relaxed ${paperSecondary}`}
                            >
                              {entry.body}
                            </p>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`pt-4 mt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>Saved locally in browser journal</span>
                    <span className="tabular-nums">
                      Page {String(pageIndex * 2 + 1).padStart(2, "0")}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT FOLIO PAGE */}
            <div
              data-journal-scrollable="true"
              className={`${paperRightBg} p-6 sm:p-8 lg:p-10 lg:pl-12 flex flex-col justify-between overflow-y-auto`}
            >
              {currentSpread.kind === "tesla" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>Right Folio · Primary Axioms</span>
                      <span>Quid Est Veritas?</span>
                    </div>

                    <div className="space-y-6 mt-2">
                      <blockquote className={`pb-5 border-b ${paperRule}`}>
                        <p
                          className={`font-display text-lg sm:text-xl font-light italic leading-relaxed mb-2 ${paperText}`}
                        >
                          &ldquo;If you only knew the magnificence of the 3, 6
                          and 9, then you would have the key to the
                          universe.&rdquo;
                        </p>
                        <footer className={`text-xs font-mono ${paperMuted}`}>
                          — Nikola Tesla
                        </footer>
                      </blockquote>

                      <blockquote className={`pb-5 border-b ${paperRule}`}>
                        <p
                          className={`font-display text-lg sm:text-xl font-light italic leading-relaxed mb-2 ${paperText}`}
                        >
                          &ldquo;If you want to find the secrets of the
                          universe, think in terms of energy, frequency and
                          vibration.&rdquo;
                        </p>
                        <footer className={`text-xs font-mono ${paperMuted}`}>
                          — Nikola Tesla
                        </footer>
                      </blockquote>

                      <blockquote className={`pb-5 border-b ${paperRule}`}>
                        <p
                          className={`font-display text-lg sm:text-xl font-light italic leading-relaxed mb-2 ${paperText}`}
                        >
                          &ldquo;Whatever the mind of man can imagine, man can
                          realise.&rdquo;
                        </p>
                        <footer className={`text-xs font-mono ${paperMuted}`}>
                          — Neville Goddard
                        </footer>
                      </blockquote>

                      <p className="font-display text-xl font-medium text-[var(--accent-gold)]">
                        Quid Est Veritas?
                      </p>
                    </div>
                  </div>

                  <div
                    className={`pt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>Flip sideways for Quantum Codes</span>
                    <span className="tabular-nums">Page 02</span>
                  </div>
                </>
              )}

              {currentSpread.kind === "codes" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>Right Folio · Active Sequences</span>
                      <span>4 Sequences</span>
                    </div>

                    <div className="space-y-3.5 mt-2">
                      {GRABOVOI_CODES.map((item) => {
                        const isRevealed = Boolean(revealedCodes[item.code]);
                        return (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => toggleCode(item.code)}
                            aria-pressed={isRevealed}
                            className={`group w-full flex items-center justify-between gap-4 p-4 border ${paperRule} rounded-lg hover:border-[var(--accent-gold)]/65 transition-colors duration-150 text-left cursor-pointer ${
                              isDark ? "bg-white/[0.02]" : "bg-[#141518]/[0.02]"
                            }`}
                          >
                            <span
                              className={`font-mono text-lg font-semibold tabular-nums text-[var(--accent-gold)] transition-all duration-200 ${
                                isRevealed
                                  ? "blur-none"
                                  : "blur-sm group-hover:blur-none group-focus-visible:blur-none"
                              }`}
                            >
                              {item.code}
                            </span>

                            <span className="flex items-center gap-3">
                              <span
                                className={`text-sm transition-all duration-200 ${paperSecondary} ${
                                  isRevealed
                                    ? "blur-none"
                                    : "blur-sm group-hover:blur-none group-focus-visible:blur-none"
                                }`}
                              >
                                {item.purpose}
                              </span>
                              {isRevealed ? (
                                <Eye className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                              ) : (
                                <EyeOff
                                  className={`w-4 h-4 group-hover:text-[var(--accent-gold)] shrink-0 ${paperMuted}`}
                                />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className={`pt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>Click any sequence to lock</span>
                    <span className="tabular-nums">Page 04</span>
                  </div>
                </>
              )}

              {currentSpread.kind === "principles" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>Right Folio · Rules 06 – 10</span>
                      <span>Focus Discipline</span>
                    </div>

                    <p
                      className={`font-mono text-xs mb-6 text-[var(--accent-gold)]`}
                    >
                      Whatever you focus on, you energize into existence.
                    </p>

                    <ol className="space-y-4">
                      {SPIRITUAL_INSIGHTS.slice(5, 10).map((insight, idx) => (
                        <li
                          key={insight}
                          className={`pb-3.5 border-b ${paperRule} flex items-start gap-3.5`}
                        >
                          <span className="font-mono text-xs text-[var(--accent-gold)] tabular-nums pt-0.5 shrink-0">
                            {String(idx + 6).padStart(2, "0")}
                          </span>
                          <p
                            className={`text-sm leading-relaxed ${paperSecondary}`}
                          >
                            {insight}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div
                    className={`pt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>Next: Your Personal Field Notes</span>
                    <span className="tabular-nums">Page 06</span>
                  </div>
                </>
              )}

              {currentSpread.kind === "notes" && (
                <>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] mb-5">
                      <span>Right Folio · Write in Journal</span>
                      <span>{isLast ? "Final Spread" : "More Notes →"}</span>
                    </div>

                    <h3
                      className={`font-display text-2xl font-light tracking-tight mb-2 ${paperText}`}
                    >
                      Add to Your{" "}
                      <strong className="font-semibold">Wisdom Journal</strong>
                    </h3>
                    <p className={`text-xs mb-5 ${paperMuted}`}>
                      Record a reflection, resonance sequence, or rule. New
                      entries appear live in your journal pages.
                    </p>

                    <form
                      onSubmit={handleAddEntry}
                      noValidate
                      className="space-y-3.5"
                    >
                      <div>
                        <label
                          htmlFor="journal-entry-title"
                          className={`block text-xs font-medium mb-1 ${paperSecondary}`}
                        >
                          Heading
                        </label>
                        <input
                          ref={titleInputRef}
                          id="journal-entry-title"
                          type="text"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                            if (errors.title)
                              setErrors((p) => ({ ...p, title: undefined }));
                          }}
                          placeholder="e.g. Morning Intention or Focus Sequence"
                          className={`w-full px-3 py-2 text-sm rounded-lg border ${paperRule} ${
                            isDark ? "bg-[#0f0f13]" : "bg-white"
                          } ${paperText} focus:outline-none focus:border-[var(--accent-gold)]`}
                        />
                        {errors.title && (
                          <p
                            role="alert"
                            className="text-xs text-rose-500 mt-1"
                          >
                            {errors.title}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="journal-entry-category"
                            className={`block text-xs font-medium mb-1 ${paperSecondary}`}
                          >
                            Type
                          </label>
                          <select
                            id="journal-entry-category"
                            value={category}
                            onChange={(e) =>
                              setCategory(
                                e.target.value as JournalEntryCategory
                              )
                            }
                            className={`w-full px-3 py-2 text-sm rounded-lg border ${paperRule} ${
                              isDark ? "bg-[#0f0f13]" : "bg-white"
                            } ${paperText} focus:outline-none focus:border-[var(--accent-gold)]`}
                          >
                            {ENTRY_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="journal-entry-code"
                            className={`block text-xs font-medium mb-1 ${paperSecondary}`}
                          >
                            Numeric Code (Optional)
                          </label>
                          <input
                            id="journal-entry-code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="e.g. 369 917"
                            className={`w-full px-3 py-2 text-sm font-mono rounded-lg border ${paperRule} ${
                              isDark ? "bg-[#0f0f13]" : "bg-white"
                            } ${paperText} focus:outline-none focus:border-[var(--accent-gold)]`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="journal-entry-body"
                          className={`block text-xs font-medium mb-1 ${paperSecondary}`}
                        >
                          Journal Note
                        </label>
                        <textarea
                          id="journal-entry-body"
                          rows={3}
                          value={body}
                          onChange={(e) => {
                            setBody(e.target.value);
                            if (errors.body)
                              setErrors((p) => ({ ...p, body: undefined }));
                          }}
                          placeholder="Write your reflection, affirmation, or harmonic note..."
                          className={`w-full px-3 py-2 text-sm rounded-lg border ${paperRule} ${
                            isDark ? "bg-[#0f0f13]" : "bg-white"
                          } ${paperText} resize-none focus:outline-none focus:border-[var(--accent-gold)]`}
                        />
                        {errors.body && (
                          <p role="alert" className="text-xs text-rose-500 mt-1">
                            {errors.body}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Save to Journal</span>
                        </button>

                        {isLast && (
                          <button
                            type="button"
                            onClick={onContinueDown}
                            className="px-4 py-2 text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-canvas)] rounded-lg hover:bg-[var(--accent-gold)] hover:text-[var(--accent-gold-contrast)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Continue Down to Experience</span>
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div
                    className={`pt-4 mt-4 border-t ${paperRule} flex items-center justify-between text-xs font-mono ${paperMuted}`}
                  >
                    <span>
                      {isLast
                        ? "End of pages · Scroll down or click Continue"
                        : "Flip sideways for older notes"}
                    </span>
                    <span className="tabular-nums">
                      Page {String(pageIndex * 2 + 2).padStart(2, "0")}
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Sideways Page-Turn Footer */}
      <footer className="max-w-7xl w-full mx-auto pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <button
          type="button"
          onClick={() => turnPage(-1)}
          disabled={isFirst}
          className={`px-4 py-2 text-xs font-medium border border-[var(--border-hairline)] rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
            isFirst
              ? "opacity-40 cursor-not-allowed text-[var(--text-muted)]"
              : "bg-[var(--bg-surface-solid)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] cursor-pointer"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous Page</span>
        </button>

        {/* Page Dot / Progress Indicator */}
        <div className="flex items-center gap-2" aria-label="Journal page progress">
          {spreads.map((sp, idx) => (
            <button
              key={sp.id}
              type="button"
              onClick={() => jumpToPage(idx)}
              aria-label={`Go to ${sp.title}`}
              aria-current={idx === pageIndex ? "page" : undefined}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                idx === pageIndex
                  ? "w-7 bg-[var(--accent-gold)]"
                  : "w-2 bg-[var(--border-strong)] hover:bg-[var(--accent-gold)]/60"
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            type="button"
            onClick={onContinueDown}
            className="px-4 py-2 text-xs font-semibold bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Continue Down</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => turnPage(1)}
            className="px-4 py-2 text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-canvas)] rounded-lg hover:bg-[var(--accent-gold)] hover:text-[var(--accent-gold-contrast)] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Flip Next Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>
    </div>
  );

  if (typeof document === "undefined") return modalContent;
  return createPortal(modalContent, document.body);
}
