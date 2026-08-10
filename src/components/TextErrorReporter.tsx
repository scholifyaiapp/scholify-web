import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { AlertCircle, Check, Loader2, X } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { submitFeedback } from "@/lib/feedback"

/* ──────────────────────────────────────────────────────────────
 *  "Select the mistake, press Ctrl+Enter."
 *
 *  The Orphus convention, familiar from government and news sites
 *  across the region. It exists because the people best placed to
 *  find a typo in 15 papers of accounting content are the learners
 *  reading it — but only if reporting costs them nothing.
 *
 *  A feedback form asks someone to leave what they were doing,
 *  describe where the problem was, and retype the sentence. Almost
 *  nobody does. This asks for a highlight and two keys, and sends
 *  the exact text plus where it was, so we can find it without
 *  asking them anything else.
 * ────────────────────────────────────────────────────────────── */

const MAX_SELECTION = 400
/** Below this it is a stray click, not a report. */
const MIN_SELECTION = 3

type Phase = "idle" | "open" | "sending" | "sent" | "error"

export default function TextErrorReporter() {
  const { user } = useAuth()
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("idle")
  const [selection, setSelection] = useState("")
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [failure, setFailure] = useState<string | null>(null)
  const commentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || !(e.ctrlKey || e.metaKey)) return
      /*
       * Never steal the shortcut from somewhere it already means something.
       * Ctrl+Enter submits the quick-note panel and the tutor composer, and a
       * learner mid-sentence in a textarea is not reporting a typo.
       */
      const target = e.target as HTMLElement | null
      if (target && (target.closest("input, textarea, [contenteditable='true']") || target.isContentEditable)) return
      const text = String(window.getSelection?.() ?? "").trim()
      if (text.length < MIN_SELECTION) return
      e.preventDefault()
      setSelection(text.slice(0, MAX_SELECTION))
      setComment("")
      setFailure(null)
      setPhase("open")
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Focus the note box once the dialog is up, so the reporter can type
  // immediately instead of hunting for the field.
  useEffect(() => {
    if (phase === "open") commentRef.current?.focus()
  }, [phase])

  useEffect(() => {
    if (phase !== "open") return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhase("idle")
    }
    window.addEventListener("keydown", onEscape)
    return () => window.removeEventListener("keydown", onEscape)
  }, [phase])

  const send = useCallback(async () => {
    const reporterEmail = (user?.email || email).trim()
    if (!/^\S+@\S+\.\S+$/.test(reporterEmail)) {
      setFailure("Add an email so we can tell you when it's fixed.")
      return
    }
    setPhase("sending")
    setFailure(null)
    /*
     * The endpoint requires 10+ characters, and a bare highlight can be
     * shorter than that — so the message always carries the quoted text, the
     * page it came from and any note, which is also exactly what makes the
     * report actionable without a reply.
     */
    const message = [
      `Reported text error:`,
      `“${selection}”`,
      comment.trim() ? `\nWhat's wrong: ${comment.trim()}` : "",
      `\nPage: ${window.location.pathname}`,
    ]
      .filter(Boolean)
      .join("\n")

    const result = await submitFeedback({
      email: reporterEmail,
      category: "content",
      message,
      source: window.location.pathname.startsWith("/study") || window.location.pathname.startsWith("/dashboard") ? "app" : "landing",
      pageUrl: window.location.href,
    })
    if (result.ok) {
      setPhase("sent")
      window.setTimeout(() => setPhase("idle"), 2600)
      return
    }
    setPhase("error")
    setFailure(
      result.reason === "rate_limited"
        ? "That's a few reports in a short time — thank you. Try again in a little while."
        : "That didn't send. Check your connection and try once more.",
    )
  }, [comment, email, selection, user?.email])

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Report a text error"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            zIndex: 4000,
            left: "50%",
            bottom: "max(20px, env(safe-area-inset-bottom))",
            transform: "translateX(-50%)",
            width: "min(440px, calc(100vw - 32px))",
            borderRadius: 18,
            padding: 16,
            background: "var(--sch-card, #fff)",
            border: "1px solid var(--sch-border, rgba(20,20,26,.1))",
            boxShadow: "0 24px 60px -20px rgba(11,11,15,.4)",
          }}
        >
          {phase === "sent" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 2px" }}>
              <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, background: "rgba(30,158,90,.12)", color: "#1E9E5A" }}>
                <Check size={17} strokeWidth={2.6} />
              </span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--sch-text)" }}>Thank you — that's with us.</div>
                <div style={{ fontSize: 12.5, color: "var(--sch-tx-2)" }}>We read every one of these.</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span aria-hidden style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: "rgba(200,0,0,.09)", color: "#C80000" }}>
                  <AlertCircle size={17} strokeWidth={2.4} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--sch-text)", lineHeight: 1.3 }}>
                    Report this text
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--sch-tx-2)", marginTop: 2 }}>
                    We'll fix it and credit the catch.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPhase("idle")}
                  aria-label="Close"
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--sch-tx-2)", padding: 4, lineHeight: 0 }}
                >
                  <X size={17} />
                </button>
              </div>

              <blockquote
                style={{
                  margin: 0,
                  padding: "9px 11px",
                  borderRadius: 10,
                  borderLeft: "3px solid #C80000",
                  background: "var(--sch-bg, #FAFAF7)",
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "var(--sch-tx-1)",
                  maxHeight: 96,
                  overflowY: "auto",
                }}
              >
                {selection}
              </blockquote>

              <textarea
                ref={commentRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="What's wrong with it? (optional)"
                style={{
                  width: "100%", boxSizing: "border-box", marginTop: 10, padding: "9px 11px", borderRadius: 10,
                  border: "1px solid var(--sch-border, rgba(20,20,26,.12))", background: "var(--sch-bg, #FAFAF7)",
                  color: "var(--sch-text)", fontSize: 13.5, fontFamily: "inherit", resize: "vertical", outline: "none",
                }}
              />

              {/* Signed-in learners never see this — we already know where to reply. */}
              {!user?.email && (
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: "100%", boxSizing: "border-box", marginTop: 8, height: 42, padding: "0 11px", borderRadius: 10,
                    border: "1px solid var(--sch-border, rgba(20,20,26,.12))", background: "var(--sch-bg, #FAFAF7)",
                    color: "var(--sch-text)", fontSize: 13.5, fontFamily: "inherit", outline: "none",
                  }}
                />
              )}

              {failure && (
                <div style={{ fontSize: 12.5, color: "#C80000", marginTop: 8, lineHeight: 1.45 }}>{failure}</div>
              )}

              <button
                type="button"
                onClick={() => void send()}
                disabled={phase === "sending"}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", minHeight: 44, marginTop: 10, borderRadius: 11, border: "none",
                  background: "#C80000", color: "#fff", fontSize: 14, fontWeight: 700,
                  cursor: phase === "sending" ? "progress" : "pointer", fontFamily: "inherit",
                }}
              >
                {phase === "sending" && <Loader2 size={15} className="animate-spin" />}
                {phase === "sending" ? "Sending…" : "Send report"}
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
