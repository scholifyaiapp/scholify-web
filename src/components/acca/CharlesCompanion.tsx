import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Icon, C, R, SHADOW } from "@/components/acca/ui"
import { askCharles } from "@/lib/acca-ai"
import { getCurrentPaper } from "@/lib/acca-qualification"
import { getPaper } from "@/lib/acca"
import { learnerProfileSummary } from "@/lib/acca-diagnostic"

/*
 * Charles — the AI Study Companion. A persistent, ask-anything panel that
 * floats on every app screen. It reuses the metered, authenticated acca-tutor
 * endpoint (via askCharles), so cost is capped per user per day and it degrades
 * to a friendly fallback with no key or over the cap. Conversation is kept per
 * paper in localStorage, and the learner's weak areas ride along as context so
 * Charles can tie answers to what they're getting wrong.
 */

interface Msg {
  role: "user" | "charles"
  text: string
  fallback?: boolean
}

const MAX_STORED = 24
const storeKey = (paper: string) => `scholify-charles-chat:${paper}`

function loadMsgs(paper: string): Msg[] {
  try {
    const raw = window.localStorage.getItem(storeKey(paper))
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((m): m is Msg => Boolean(m) && (m.role === "user" || m.role === "charles") && typeof m.text === "string")
      .slice(-MAX_STORED)
  } catch {
    return []
  }
}

function saveMsgs(paper: string, msgs: Msg[]): void {
  try {
    window.localStorage.setItem(storeKey(paper), JSON.stringify(msgs.slice(-MAX_STORED)))
  } catch {
    /* ignore */
  }
}

const STARTERS = [
  "Explain a topic I find tricky",
  "How is this paper's exam structured?",
  "Give me a quick exam-technique tip",
  "What should I focus on next?",
]

export default function CharlesCompanion() {
  const paper = getCurrentPaper()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Load this paper's conversation whenever the panel opens or the paper changes.
  useEffect(() => {
    if (paper) setMsgs(loadMsgs(paper))
  }, [paper])

  // Any surface can invite the learner to Charles — e.g. the completed-day card
  // offering "ask about today" instead of a dead end.
  useEffect(() => {
    const openHandler = () => setOpen(true)
    window.addEventListener("scholify:open-charles", openHandler)
    return () => window.removeEventListener("scholify:open-charles", openHandler)
  }, [])

  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [open, msgs, sending])

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim()
      if (!text || sending || !paper) return
      setInput("")
      const withUser: Msg[] = [...msgs, { role: "user", text }]
      setMsgs(withUser)
      saveMsgs(paper, withUser)
      setSending(true)
      const { answer, isFallback } = await askCharles(paper, text, learnerProfileSummary(paper))
      const withReply: Msg[] = [...withUser, { role: "charles", text: answer, fallback: isFallback }]
      setMsgs(withReply)
      saveMsgs(paper, withReply)
      setSending(false)
    },
    [msgs, sending, paper],
  )

  // Two-step clear so a single mis-tap on mobile can't erase the whole thread.
  const clear = useCallback(() => {
    if (!paper) return
    if (!confirmingClear) {
      setConfirmingClear(true)
      window.setTimeout(() => setConfirmingClear(false), 3500)
      return
    }
    setConfirmingClear(false)
    setMsgs([])
    saveMsgs(paper, [])
    inputRef.current?.focus()
  }, [paper, confirmingClear])

  // Only for onboarded learners on a paper.
  if (!paper) return null
  const paperName = getPaper(paper)?.name ?? "your paper"

  return (
    <>
      {/* ── Launcher ── stacked ABOVE the feedback button, which is fixed at
          bottom:24 on desktop and pushed to bottom:78 on mobile (≤1023px, see
          dashboard-layout LAYOUT_CSS). So Charles clears it at both sizes:
          bottom-[140px] on mobile, lg:bottom-[86px] on desktop. */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Charles" : "Ask Charles"}
        whileTap={{ scale: 0.95 }}
        whileHover={{ y: -2 }}
        className="fixed right-[18px] z-[39] bottom-[140px] lg:bottom-[86px]"
        style={{
          display: open ? "none" : "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 16px 11px 12px",
          borderRadius: R.pill,
          border: "none",
          background: "linear-gradient(135deg,#C80000 0%,#E50068 55%,#F4A405 100%)",
          color: "#fff",
          boxShadow: SHADOW.md,
          cursor: "pointer",
          fontWeight: 750,
          fontSize: 14,
        }}
      >
        <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "grid", placeItems: "center" }}>
          <Icon name="tutor" size={15} color="#fff" strokeWidth={2.4} />
        </span>
        Ask Charles
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop on mobile only — desktop keeps the app visible behind. */}
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(20,20,26,0.35)", zIndex: 45 }}
            />
            <motion.div
              role="dialog"
              aria-label="Charles study companion"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-4 left-4 bottom-4 lg:left-auto lg:bottom-6 z-50"
              style={{
                width: "auto",
                maxWidth: 400,
                marginLeft: "auto",
                height: "min(560px, 78vh)",
                display: "flex",
                flexDirection: "column",
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: R["2xl"],
                boxShadow: SHADOW.lg ?? SHADOW.md,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: `1px solid ${C.hairline}`, background: C.card }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#C80000,#E50068,#F4A405)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Icon name="tutor" size={17} color="#fff" strokeWidth={2.4} />
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 800, color: C.text, fontSize: 15, lineHeight: 1.1 }}>Charles</div>
                  <div style={{ fontSize: 11.5, color: C.faint }}>Your {paper} study companion</div>
                </div>
                {msgs.length > 0 && (
                  confirmingClear ? (
                    <button type="button" onClick={clear} aria-label="Confirm clear conversation" style={{ background: C.brandSoft, border: `1px solid ${C.brandLine}`, borderRadius: R.pill, cursor: "pointer", color: C.brand, padding: "4px 10px", fontSize: 11.5, fontWeight: 800, whiteSpace: "nowrap" }}>
                      Clear all?
                    </button>
                  ) : (
                    <button type="button" onClick={clear} aria-label="Clear conversation" style={{ background: "none", border: "none", cursor: "pointer", color: C.faint, padding: 6, display: "grid", placeItems: "center" }}>
                      <Icon name="trash" size={15} color={C.faint} strokeWidth={2.2} />
                    </button>
                  )
                )}
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: C.soft, padding: 6, display: "grid", placeItems: "center" }}>
                  <Icon name="close" size={18} color={C.soft} strokeWidth={2.2} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {msgs.length === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "auto 0" }}>
                    <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6, margin: 0, textAlign: "center" }}>
                      Ask me anything about <b style={{ color: C.text }}>{paperName}</b> — a concept, a calculation, an exam-technique question. I'll keep it concise and tied to the ACCA syllabus.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {STARTERS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => void send(s)}
                          style={{
                            textAlign: "left",
                            padding: "10px 13px",
                            borderRadius: R.md,
                            border: `1px solid ${C.border}`,
                            background: C.card2,
                            color: C.text,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {msgs.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "10px 13px",
                        borderRadius: 14,
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        background: m.role === "user" ? "linear-gradient(135deg,#C80000,#E50068)" : C.card2,
                        color: m.role === "user" ? "#fff" : C.text,
                        border: m.role === "charles" ? `1px solid ${C.hairline}` : "none",
                        borderBottomRightRadius: m.role === "user" ? 4 : 14,
                        borderBottomLeftRadius: m.role === "charles" ? 4 : 14,
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "10px 14px", borderRadius: 14, background: C.card2, border: `1px solid ${C.hairline}`, display: "inline-flex", gap: 4 }}>
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                          style={{ width: 6, height: 6, borderRadius: "50%", background: C.soft }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{ padding: 12, borderTop: `1px solid ${C.hairline}`, display: "flex", gap: 8, alignItems: "flex-end" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 500))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      void send(input)
                    }
                  }}
                  rows={1}
                  placeholder={`Ask about ${paper}…`}
                  style={{
                    flex: 1,
                    resize: "none",
                    maxHeight: 96,
                    padding: "10px 12px",
                    borderRadius: R.md,
                    border: `1px solid ${C.border}`,
                    background: C.bg,
                    color: C.text,
                    fontSize: 13.5,
                    fontFamily: "inherit",
                    lineHeight: 1.4,
                    outline: "none",
                  }}
                />
                <motion.button
                  type="button"
                  onClick={() => void send(input)}
                  disabled={sending || !input.trim()}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Send"
                  style={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    borderRadius: R.md,
                    border: "none",
                    display: "grid",
                    placeItems: "center",
                    cursor: sending || !input.trim() ? "not-allowed" : "pointer",
                    background: sending || !input.trim() ? C.card2 : "linear-gradient(135deg,#C80000,#E50068)",
                    color: sending || !input.trim() ? C.faint : "#fff",
                  }}
                >
                  <Icon name="arrow" size={18} color={sending || !input.trim() ? C.faint : "#fff"} strokeWidth={2.4} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
