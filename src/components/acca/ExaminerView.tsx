import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { getWrittenQuestions, type WrittenQuestion } from "@/lib/acca-written"
import { markAnswer, type ExaminerResult } from "@/lib/acca-ai"

/*
 * AI Examiner — the differentiator. A learner writes a constructed-response
 * answer; Lara marks it against the marking points and returns marks + specific
 * feedback. No other ACCA tool gives instant feedback on written answers.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const GREEN = "#10B981"
const RED = "#EF4444"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function ExaminerView({ paperId, onBack }: { paperId: string; onBack: () => void }) {
  const questions = useMemo(() => getWrittenQuestions(paperId), [paperId])
  const [active, setActive] = useState<WrittenQuestion | null>(null)
  const [answer, setAnswer] = useState("")
  const [marking, setMarking] = useState(false)
  const [result, setResult] = useState<ExaminerResult | null>(null)

  async function mark() {
    if (!active) return
    setMarking(true)
    setResult(null)
    const r = await markAnswer(active, answer)
    setResult(r)
    setMarking(false)
  }

  function pick(q: WrittenQuestion) {
    setActive(q)
    setAnswer("")
    setResult(null)
  }

  // list view
  if (!active) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
        <button onClick={onBack} style={backBtn}>← Back</button>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: TEXT }}>
          AI <span style={iriText}>Examiner</span>
        </h1>
        <p style={{ color: MUTED, margin: "0 0 20px", fontSize: 15 }}>
          Write a full answer and get it marked instantly against the examiner's marking points —
          the feedback no PDF or video can give you.
        </p>
        {questions.length === 0 ? (
          <div style={card()}>
            <p style={{ color: MUTED, margin: 0 }}>Written questions for this paper are coming soon.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {questions.map((q, i) => (
              <motion.button
                key={q.id}
                onClick={() => pick(q)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                style={{ ...card({ textAlign: "left", cursor: "pointer" }) }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: TEXT }}>{q.topic}</span>
                  <span style={{ fontSize: 12, color: DIM, whiteSpace: "nowrap" }}>{q.maxMarks} marks</span>
                </div>
                <div style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.5 }}>{q.stem}</div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    )
  }

  // answer + marking view
  const scorePct = result ? Math.round((result.marks / result.maxMarks) * 100) : 0
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={() => setActive(null)} style={backBtn}>← All written questions</button>

      <div style={card({ marginBottom: 16 })}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 15, ...iriText }}>{active.topic}</span>
          <span style={{ fontSize: 12, color: DIM }}>{active.maxMarks} marks</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: TEXT, margin: 0 }}>{active.stem}</p>
      </div>

      <textarea
        value={answer}
        disabled={marking}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here. Address each point you can — you're marked per valid point, in your own words."
        rows={8}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: 16,
          fontSize: 15,
          lineHeight: 1.6,
          borderRadius: 14,
          border: `1px solid ${BORDER}`,
          background: "var(--sch-bg)",
          color: TEXT,
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
        <span style={{ fontSize: 12, color: DIM }}>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
      </div>

      <motion.button
        whileTap={{ scale: 0.99 }}
        disabled={marking || !answer.trim()}
        onClick={mark}
        style={{
          width: "100%",
          marginTop: 12,
          padding: 16,
          borderRadius: 14,
          border: "none",
          background: marking || !answer.trim() ? "var(--sch-card-2)" : IRIDESCENT,
          color: marking || !answer.trim() ? DIM : "#fff",
          fontWeight: 750,
          fontSize: 16,
          cursor: marking || !answer.trim() ? "not-allowed" : "pointer",
        }}
      >
        {marking ? "Lara is marking…" : "Mark my answer"}
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 20 }}
          >
            {/* score */}
            <div style={{ ...card({ textAlign: "center", marginBottom: 14 }) }}>
              <div style={{ fontSize: 13, color: DIM, marginBottom: 4 }}>YOUR MARK</div>
              <div style={{ fontSize: 40, fontWeight: 850, ...iriText }}>
                {result.marks}<span style={{ fontSize: 22, color: DIM }}> / {result.maxMarks}</span>
              </div>
              <div style={{ fontSize: 13, color: scorePct >= 50 ? GREEN : RED, fontWeight: 650, marginTop: 2 }}>
                {scorePct}% · {scorePct >= 50 ? "Pass standard" : "Below pass"}
              </div>
              {result.isFallback && (
                <div style={{ fontSize: 11, color: DIM, marginTop: 8 }}>
                  Demo marking (no live AI key connected)
                </div>
              )}
            </div>

            {result.feedback && (
              <div style={card({ marginBottom: 14 })}>
                <div style={{ fontWeight: 700, fontSize: 13, color: DIM, marginBottom: 6 }}>EXAMINER FEEDBACK</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.6, color: TEXT }}>{result.feedback}</div>
              </div>
            )}

            <div style={{ display: "grid", gap: 8 }}>
              {result.hit.map((p, i) => (
                <PointRow key={`h-${i}`} text={p} ok />
              ))}
              {result.missed.map((p, i) => (
                <PointRow key={`m-${i}`} text={p} ok={false} />
              ))}
            </div>

            <button
              onClick={() => { setAnswer(""); setResult(null) }}
              style={{ ...card({ cursor: "pointer", marginTop: 14, width: "100%", textAlign: "center" }), fontWeight: 650, color: TEXT }}
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function PointRow({ text, ok }: { text: string; ok: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 14px",
        borderRadius: 12,
        border: `1px solid ${ok ? GREEN : BORDER}`,
        background: ok ? "rgba(16,185,129,0.06)" : "var(--sch-card)",
      }}
    >
      <span style={{ color: ok ? GREEN : RED, fontWeight: 800, flexShrink: 0 }}>{ok ? "✓" : "○"}</span>
      <span style={{ fontSize: 13.5, lineHeight: 1.5, color: ok ? TEXT : MUTED }}>{text}</span>
    </div>
  )
}

const backBtn: CSSProperties = {
  background: "none",
  border: "none",
  color: MUTED,
  cursor: "pointer",
  fontSize: 14,
  padding: 0,
  marginBottom: 14,
}
