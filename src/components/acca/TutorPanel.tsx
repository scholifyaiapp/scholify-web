import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { askTutor } from "@/lib/acca-ai"
import type { AccaQuestion } from "@/lib/acca"

/*
 * Inline "Ask Lara" tutor — appears under a graded question. The learner can
 * ask a follow-up ("why is B wrong?", "explain simpler") and Lara answers,
 * grounded in the question. Degrades to the model explanation with no API key.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const BORDER = "var(--sch-border)"
const PURPLE = "#A78BFA"

const QUICK = ["Explain more simply", "Why is that the answer?", "Give me a memory tip"]

export default function TutorPanel({ q, correctText }: { q: AccaQuestion; correctText: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [input, setInput] = useState("")

  async function ask(question: string) {
    setLoading(true)
    setAnswer(null)
    const res = await askTutor(q, correctText, question)
    setAnswer(res.answer)
    setLoading(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true)
          void ask("Explain this clearly.")
        }}
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 12,
          border: `1px solid ${PURPLE}`,
          background: "rgba(167,139,250,0.08)",
          color: PURPLE,
          fontWeight: 650,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        ✨ Ask Lara
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 12,
        padding: 16,
        borderRadius: 14,
        border: `1px solid ${PURPLE}`,
        background: "rgba(167,139,250,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 15 }}>✨</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: PURPLE }}>Lara — your ACCA tutor</span>
      </div>

      <div style={{ minHeight: 24 }}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: MUTED, fontSize: 14 }}>
              Thinking…
            </motion.div>
          ) : (
            answer && (
              <motion.div
                key="a"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 14, lineHeight: 1.6, color: TEXT, whiteSpace: "pre-wrap" }}
              >
                {answer}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
        {QUICK.map((qk) => (
          <button
            key={qk}
            disabled={loading}
            onClick={() => void ask(qk)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: `1px solid ${BORDER}`,
              background: "var(--sch-card)",
              color: TEXT,
              fontSize: 12.5,
              cursor: loading ? "default" : "pointer",
            }}
          >
            {qk}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              void ask(input.trim())
              setInput("")
            }
          }}
          placeholder="Ask a follow-up…"
          style={{
            flex: 1,
            padding: "9px 12px",
            fontSize: 13.5,
            borderRadius: 10,
            border: `1px solid ${BORDER}`,
            background: "var(--sch-bg)",
            color: TEXT,
            outline: "none",
          }}
        />
      </div>
    </motion.div>
  )
}
