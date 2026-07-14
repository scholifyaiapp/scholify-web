import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { Icon, Card, Button, C, SP, R, SHADOW } from "@/components/acca/ui"
import { getWrittenQuestions, type WrittenQuestion } from "@/lib/acca-written"
import { getPaper } from "@/lib/acca"
import { markAnswer, type ExaminerResult } from "@/lib/acca-ai"

/*
 * AI Examiner — the differentiator. A learner writes a constructed-response
 * answer; Lara marks it against the marking points and returns marks + specific
 * feedback. No other ACCA tool gives instant feedback on written answers.
 */

export default function ExaminerView({ paperId, onBack }: { paperId: string; onBack: () => void }) {
  const questions = useMemo(() => getWrittenQuestions(paperId), [paperId])
  const objectiveOnly = getPaper(paperId)?.objectiveOnly ?? false
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

  const BackButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <Button variant="ghost" onClick={onClick} style={{ minHeight: 40, padding: "6px 0", marginBottom: SP.md }}>
      <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> {label}
    </Button>
  )

  // list view
  if (!active) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
        <BackButton label="Back" onClick={onBack} />
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: C.text }}>
          AI <span style={iriText}>Examiner</span>
        </h1>
        <p style={{ color: C.soft, margin: "0 0 20px", fontSize: 15 }}>
          Write a full answer and get it marked instantly against the examiner's marking points —
          the feedback no PDF or video can give you.
        </p>
        {questions.length === 0 ? (
          <Card>
            {/* Never promise written marking on a paper whose exam has none. */}
            <p style={{ color: C.soft, margin: 0 }}>
              {objectiveOnly
                ? `The real ${paperId} exam is entirely objective-test — there is no written section to mark, so your time is better spent in the question bank and mocks.`
                : "Written questions for this paper are coming soon."}
            </p>
          </Card>
        ) : (
          <div style={{ display: "grid", gap: SP.md }}>
            {questions.map((q, i) => (
              <Card
                key={q.id}
                interactive
                onClick={() => pick(q)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                style={{ textAlign: "left" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: SP.md, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{q.topic}</span>
                  <span style={{ fontSize: 12, color: C.faint, whiteSpace: "nowrap" }}>{q.maxMarks} marks</span>
                </div>
                <div style={{ color: C.soft, fontSize: 13.5, lineHeight: 1.5 }}>{q.stem}</div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    )
  }

  // answer + marking view
  const scorePct = result ? Math.round((result.marks / result.maxMarks) * 100) : 0
  const canMark = !marking && !!answer.trim()
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <BackButton label="All written questions" onClick={() => setActive(null)} />

      <Card style={{ marginBottom: SP.lg }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: SP.md, marginBottom: SP.sm }}>
          <span style={{ fontWeight: 700, fontSize: 15, ...iriText }}>{active.topic}</span>
          <span style={{ fontSize: 12, color: C.faint }}>{active.maxMarks} marks</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: C.text, margin: 0 }}>{active.stem}</p>
      </Card>

      <textarea
        value={answer}
        disabled={marking}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here. Address each point you can — you're marked per valid point, in your own words."
        rows={8}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: SP.lg,
          fontSize: 15,
          lineHeight: 1.6,
          borderRadius: R.lg,
          border: `1px solid ${C.border}`,
          background: C.bg,
          color: C.text,
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
        <span style={{ fontSize: 12, color: C.faint }}>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
      </div>

      <Button full size="lg" disabled={!canMark} onClick={mark} style={{ marginTop: SP.md }}>
        <Icon name="examiner" size={18} color={canMark ? "#fff" : C.faint} />
        {marking ? "Lara is marking…" : "Mark my answer"}
      </Button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: SP.xl }}
          >
            {/* score */}
            <Card style={{ textAlign: "center", marginBottom: SP.lg }}>
              <div style={{ fontSize: 13, color: C.faint, marginBottom: 4 }}>YOUR MARK</div>
              <div style={{ fontSize: 40, fontWeight: 850, ...iriText }}>
                {result.marks}<span style={{ fontSize: 22, color: C.faint }}> / {result.maxMarks}</span>
              </div>
              <div style={{ fontSize: 13, color: scorePct >= 50 ? C.green : C.red, fontWeight: 650, marginTop: 2 }}>
                {scorePct}% · {scorePct >= 50 ? "Pass standard" : "Below pass"}
              </div>
              {result.isFallback && (
                <div style={{ fontSize: 11, color: C.faint, marginTop: SP.sm }}>
                  Demo marking (no live AI key connected)
                </div>
              )}
            </Card>

            {result.feedback && (
              <Card style={{ marginBottom: SP.lg }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.faint, marginBottom: 6 }}>EXAMINER FEEDBACK</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.6, color: C.text }}>{result.feedback}</div>
              </Card>
            )}

            <div style={{ display: "grid", gap: SP.sm }}>
              {result.hit.map((p, i) => (
                <PointRow key={`h-${i}`} text={p} ok />
              ))}
              {result.missed.map((p, i) => (
                <PointRow key={`m-${i}`} text={p} ok={false} />
              ))}
            </div>

            <Button variant="secondary" full onClick={() => { setAnswer(""); setResult(null) }} style={{ marginTop: SP.lg }}>
              <Icon name="loop" size={16} /> Try again
            </Button>
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
        alignItems: "flex-start",
        gap: SP.sm,
        padding: "12px 14px",
        borderRadius: R.md,
        border: `1px solid ${ok ? C.green : C.border}`,
        background: ok ? C.greenSoft : C.card,
      }}
    >
      <Icon name={ok ? "done" : "chevron"} size={17} color={ok ? C.green : C.red} style={{ marginTop: 1 }} />
      <span style={{ fontSize: 13.5, lineHeight: 1.5, color: ok ? C.text : C.soft }}>{text}</span>
    </div>
  )
}
