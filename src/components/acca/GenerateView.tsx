import { useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { generateQuestions } from "@/lib/acca-ai"
import type { AccaQuestion } from "@/lib/acca"

/*
 * Custom practice — generate original MCQs from a topic or the learner's own
 * notes. The "learn from your world" wedge applied to ACCA: infinite,
 * personalised practice. Needs a live AI key; degrades to a clear prompt.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function GenerateView({
  paperId,
  onBack,
  onReady,
}: {
  paperId: string
  onBack: () => void
  onReady: (qs: AccaQuestion[]) => void
}) {
  const [mode, setMode] = useState<"topic" | "notes">("topic")
  const [topic, setTopic] = useState("")
  const [notes, setNotes] = useState("")
  const [count, setCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canGo = mode === "topic" ? topic.trim().length > 1 : notes.trim().length > 20

  async function generate() {
    setLoading(true)
    setError(null)
    const res = await generateQuestions(paperId, {
      topic: mode === "topic" ? topic.trim() : "",
      notes: mode === "notes" ? notes.trim() : "",
      count,
    })
    setLoading(false)
    if (res.questions.length > 0) {
      onReady(res.questions)
      return
    }
    setError(
      res.reason === "missing_anthropic_key"
        ? "Custom question generation needs a live AI key. Ask the team to connect one, then this feature turns on."
        : "Couldn't generate questions just now. Try a clearer topic or shorter notes.",
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={backBtn}>← Back</button>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: TEXT }}>
        Custom <span style={iriText}>practice</span>
      </h1>
      <p style={{ color: MUTED, margin: "0 0 20px", fontSize: 15 }}>
        Generate fresh exam-style questions on any topic — or paste your own notes and practise exactly what you're revising.
      </p>

      {/* mode toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Toggle active={mode === "topic"} onClick={() => setMode("topic")}>By topic</Toggle>
        <Toggle active={mode === "notes"} onClick={() => setMode("notes")}>From my notes</Toggle>
      </div>

      {mode === "topic" ? (
        <input
          value={topic}
          disabled={loading}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. IAS 16 depreciation, consolidation goodwill, accruals…"
          style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 15, borderRadius: 12, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, outline: "none" }}
        />
      ) : (
        <textarea
          value={notes}
          disabled={loading}
          onChange={(e) => setNotes(e.target.value)}
          rows={7}
          placeholder="Paste your study notes here — Lara will turn them into practice questions."
          style={{ width: "100%", boxSizing: "border-box", padding: 16, fontSize: 15, lineHeight: 1.6, borderRadius: 12, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, outline: "none", resize: "vertical", fontFamily: "inherit" }}
        />
      )}

      {/* count */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }}>
        <span style={{ fontSize: 13.5, color: MUTED }}>How many?</span>
        {[3, 5, 8].map((n) => (
          <button
            key={n}
            onClick={() => setCount(n)}
            style={{ padding: "7px 16px", borderRadius: 999, border: `1.5px solid ${count === n ? "#A78BFA" : BORDER}`, background: count === n ? "rgba(167,139,250,0.1)" : CARD, color: count === n ? "#A78BFA" : TEXT, fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}
          >
            {n}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ ...card({ padding: 14, marginBottom: 14 }), border: "1px solid #F59E0B", background: "rgba(245,158,11,0.08)" }}>
          <div style={{ fontSize: 13.5, color: TEXT, lineHeight: 1.5 }}>{error}</div>
        </div>
      )}

      <motion.button
        whileTap={{ scale: canGo && !loading ? 0.99 : 1 }}
        disabled={!canGo || loading}
        onClick={generate}
        style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", background: canGo && !loading ? IRIDESCENT : "var(--sch-card-2)", color: canGo && !loading ? "#fff" : DIM, fontWeight: 750, fontSize: 16, cursor: canGo && !loading ? "pointer" : "not-allowed" }}
      >
        {loading ? "Lara is writing questions…" : "Generate & practise"}
      </motion.button>
    </motion.div>
  )
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: `1.5px solid ${active ? "#A78BFA" : BORDER}`, background: active ? "rgba(167,139,250,0.1)" : CARD, color: active ? "#A78BFA" : TEXT, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
    >
      {children}
    </button>
  )
}

const backBtn: CSSProperties = { background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 14, padding: 0, marginBottom: 14 }
