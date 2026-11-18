import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import {
  MASKED_PHONE_DUMMY,
  PORTFOLIO_EMAIL,
  PORTFOLIO_GITHUB,
} from "../data/portfolioData";
import { MotionReveal } from "./MotionReveal";
import {
  validateContactForm,
  type ContactFormErrors,
} from "../three/portfolioGraph";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm({ name, email, subject, message });
    setErrors(result.errors);
    if (!result.valid) {
      toast.error("Please review the highlighted fields before sending.");
      return;
    }

    setSubmitted(true);
    toast.success("Message recorded! I will respond via email shortly.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <section
      id="contact"
      className="py-24 pb-24 px-6 relative pointer-events-none"
    >
      <div className="max-w-7xl mx-auto">
        <MotionReveal className="mb-12 pb-8 border-b border-[var(--border-hairline)] max-w-2xl pointer-events-auto">
          <p className="text-xs font-mono uppercase tracking-[0.26em] text-[var(--accent-gold)] mb-3">
            Direct Collaboration
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight text-balance mb-3">
            Let us build{" "}
            <strong className="font-semibold">something precise.</strong>
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            Open to client engineering, AI workflow automation, QA automation,
            and fintech collaboration.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.06}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pointer-events-auto">
          {/* Left Column: Direct Details & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg p-6 space-y-5">
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Contact Channels
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-[var(--bg-inset)] border border-[var(--border-hairline)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[var(--accent-gold)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">Email</p>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 break-all text-left cursor-pointer"
                  >
                    <span>{PORTFOLIO_EMAIL}</span>
                    <Copy className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-[var(--bg-inset)] border border-[var(--border-hairline)] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[var(--text-secondary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">
                    Direct Line
                  </p>
                  <a
                    href={PORTFOLIO_GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Direct line protected — open JehKTech on GitHub"
                    className="text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 font-mono tabular-nums"
                  >
                    <span
                      aria-hidden="true"
                      className="blur-[4px] select-none"
                    >
                      {MASKED_PHONE_DUMMY}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-gold)]">
                      Open GitHub →
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-[var(--bg-inset)] border border-[var(--border-hairline)] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">
                    Location
                  </p>
                  <p className="text-sm text-[var(--text-primary)]">
                    Lusaka, Zambia · Remote Collaboration
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">
                Profiles
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/JehkTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-md text-sm text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2.5"
                >
                  <Github className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/jkatemangwe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-md text-sm text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2.5"
                >
                  <Linkedin className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://instagram.com/_jeh.k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-md text-sm text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2.5"
                >
                  <Instagram className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://reddit.com/u/JehkTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-md text-sm text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2.5"
                >
                  <span className="w-4 h-4 rounded-full bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] font-bold text-[10px] flex items-center justify-center shrink-0">
                    R
                  </span>
                  <span>Reddit</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-6">
              Send a Message
            </h3>

            {submitted && (
              <div
                role="status"
                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/35 rounded-lg flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-950 dark:text-emerald-100">
                  <p className="font-medium">Message queued for Jeh</p>
                  <p className="text-emerald-800 dark:text-emerald-200/80 text-xs mt-0.5">
                    Thank you for reaching out. For urgent inquiries, copy{" "}
                    {PORTFOLIO_EMAIL}.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    aria-invalid={Boolean(errors.name)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                  {errors.name && (
                    <p
                      role="alert"
                      className="text-xs text-rose-600 dark:text-rose-400 mt-1.5"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                  {errors.email && (
                    <p
                      role="alert"
                      className="text-xs text-rose-600 dark:text-rose-400 mt-1.5"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject)
                      setErrors((p) => ({ ...p, subject: undefined }));
                  }}
                  aria-invalid={Boolean(errors.subject)}
                  placeholder="Project collaboration or advisory"
                  className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
                {errors.subject && (
                  <p
                    role="alert"
                    className="text-xs text-rose-600 dark:text-rose-400 mt-1.5"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  aria-invalid={Boolean(errors.message)}
                  placeholder="Share details about your system, timeline, or idea..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-inset)] border border-[var(--border-hairline)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] resize-none"
                />
                {errors.message && (
                  <p
                    role="alert"
                    className="text-xs text-rose-600 dark:text-rose-400 mt-1.5"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] text-sm font-semibold rounded-lg hover:bg-[var(--accent-gold-hover)] transition-colors duration-150 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}