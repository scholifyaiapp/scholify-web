import { useState } from "react"
import { motion } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { Icon, Card, Button, C, SP, R } from "@/components/acca/ui"
import { generateQuestions } from "@/lib/acca-ai"
import type { AccaQuestion } from "@/lib/acca"

/*
 * Custom practice — generate original MCQs from a topic or the learner's own
 * notes. The "learn from your world" wedge applied to ACCA: infinite,
 * personalised practice. Needs a live AI key; degrades to a clear prompt.
 */

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
        : res.reason === "limit_reached"
          ? "You've used today's custom-practice allowance — it resets tomorrow."
          : res.reason === "plan_required"
            ? "Custom practice is a Pro feature — upgrade to unlock it."
            : res.reason === "auth_required"
              ? "Please sign in to generate custom questions."
              : "Couldn't generate questions just now. Try a clearer topic or shorter notes.",
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <Button variant="ghost" onClick={onBack} style={{ minHeight: 40, padding: "6px 0", marginBottom: SP.md }}>
        <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> Back
      </Button>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: C.text }}>
        Custom <span style={iriText}>practice</span>
      </h1>
      <p style={{ color: C.soft, margin: "0 0 20px", fontSize: 15 }}>
        Generate fresh exam-style questions on any topic — or paste your own notes and practise exactly what you're revising.
      </p>

      {/* mode toggle */}
      <div style={{ display: "flex", gap: SP.sm, marginBottom: SP.lg }}>
        <Toggle active={mode === "topic"} onClick={() => setMode("topic")}>By topic</Toggle>
        <Toggle active={mode === "notes"} onClick={() => setMode("notes")}>From my notes</Toggle>
      </div>

      {mode === "topic" ? (
        <input
          value={topic}
          disabled={loading}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. IAS 16 depreciation, consolidation goodwill, accruals…"
          style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 15, borderRadius: R.md, border: `1px solid ${C.border}`, background: C.bg, color: C.text, outline: "none" }}
        />
      ) : (
        <textarea
          value={notes}
          disabled={loading}
          onChange={(e) => setNotes(e.target.value)}
          rows={7}
          placeholder="Paste your study notes here — Lara will turn them into practice questions."
          style={{ width: "100%", boxSizing: "border-box", padding: SP.lg, fontSize: 15, lineHeight: 1.6, borderRadius: R.md, border: `1px solid ${C.border}`, background: C.bg, color: C.text, outline: "none", resize: "vertical", fontFamily: "inherit" }}
        />
      )}

      {/* count */}
      <div style={{ display: "flex", alignItems: "center", gap: SP.sm + 2, margin: "16px 0" }}>
        <span style={{ fontSize: 13.5, color: C.soft }}>How many?</span>
        {[3, 5, 8].map((n) => {
          const on = count === n
          return (
            <motion.button
              key={n}
              onClick={() => setCount(n)}
              whileTap={{ scale: 0.97 }}
              style={{ minWidth: 44, minHeight: 40, padding: "7px 16px", borderRadius: R.pill, border: `1.5px solid ${on ? C.brand : C.border}`, background: on ? C.brandSoft : C.card, color: on ? C.brand : C.text, fontWeight: 700, fontSize: 13.5, cursor: "pointer", transition: "background .18s ease, border-color .18s ease, color .18s ease" }}
            >
              {n}
            </motion.button>
          )
        })}
      </div>

      {error && (
        <Card style={{ padding: SP.lg - 2, marginBottom: SP.lg, border: `1px solid ${C.amber}`, background: C.amberSoft }}>
          <div style={{ display: "flex", gap: SP.sm, alignItems: "flex-start", fontSize: 13.5, color: C.text, lineHeight: 1.5 }}>
            <Icon name="shield" size={17} color={C.amber} style={{ marginTop: 1 }} />
            <span>{error}</span>
          </div>
        </Card>
      )}

      <Button full size="lg" disabled={!canGo || loading} onClick={generate}>
        <Icon name="generate" size={18} color={canGo && !loading ? "#fff" : C.faint} />
        {loading ? "Lara is writing questions…" : "Generate & practise"}
      </Button>
    </motion.div>
  )
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      style={{ flex: 1, minHeight: 44, padding: "11px 0", borderRadius: R.md, border: `1.5px solid ${active ? C.brand : C.border}`, background: active ? C.brandSoft : C.card, color: active ? C.brand : C.text, fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background .18s ease, border-color .18s ease, color .18s ease" }}
    >
      {children}
    </motion.button>
  )
}
