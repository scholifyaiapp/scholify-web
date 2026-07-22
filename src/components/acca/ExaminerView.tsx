import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { Icon, Card, Button, C, SP, R } from "@/components/acca/ui"
import { getWrittenQuestions, type WrittenQuestion } from "@/lib/acca-written"
import { getPaper } from "@/lib/acca"
import { markAnswer, type ExaminerResult } from "@/lib/acca-ai"
import { examBlueprint, constructedSectionLabel, examSecondsFor } from "@/lib/acca-exam-structure"
import { serializeForMarking, type Cells } from "@/lib/spreadsheet"
import SpreadsheetPad from "@/components/acca/SpreadsheetPad"
import CbeToolsDock from "@/components/acca/CbeTools"

/*
 * The constructed-response studio — Scholify's CBE room for the written
 * sections (Section C in PM/TX/FR/FM, Section B in AA, everything at
 * Strategic Professional). The real exam answer tools are here: the word
 * processor, the answer spreadsheet, the calculator/formulae/notes dock,
 * and the exam clock priced at the official minutes-per-mark. Submit and
 * Charles marks the answer AND the spreadsheet workings against the marking
 * points — the feedback loop a paper mock can't give.
 */

function fmtClock(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, "0")}`
}

export default function ExaminerView({ paperId, onBack }: { paperId: string; onBack: () => void }) {
  const questions = useMemo(() => getWrittenQuestions(paperId), [paperId])
  const objectiveOnly = getPaper(paperId)?.objectiveOnly ?? false
  const bp = examBlueprint(paperId)
  const sectionLabel = constructedSectionLabel(paperId)
  const hasSheet = (bp?.cbeTools ?? []).includes("spreadsheet")

  const [active, setActive] = useState<WrittenQuestion | null>(null)
  const [answer, setAnswer] = useState("")
  const [cells, setCells] = useState<Cells>({})
  const [tab, setTab] = useState<"word" | "sheet">("word")
  const [marking, setMarking] = useState(false)
  const [result, setResult] = useState<ExaminerResult | null>(null)

  // Exam clock — null means untimed practice.
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [allowed, setAllowed] = useState(0)
  const timedRef = useRef(false)
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0 || result) return
    const t = setInterval(() => setSecondsLeft((s) => (s === null ? s : Math.max(0, s - 1))), 1000)
    return () => clearInterval(t)
  }, [secondsLeft !== null, result === null])
  const expired = secondsLeft === 0

  async function mark() {
    if (!active) return
    setMarking(true)
    setResult(null)
    const workings = serializeForMarking(cells)
    const submission = workings ? `${answer.trim()}\n\n${workings}` : answer
    const r = await markAnswer(active, submission)
    setResult(r)
    setMarking(false)
  }

  function pick(q: WrittenQuestion, examConditions: boolean) {
    setActive(q)
    setAnswer("")
    setCells({})
    setTab("word")
    setResult(null)
    timedRef.current = examConditions
    if (examConditions) {
      const secs = examSecondsFor(paperId, q.maxMarks)
      setAllowed(secs)
      setSecondsLeft(secs)
    } else {
      setSecondsLeft(null)
      setAllowed(0)
    }
  }

  const BackButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <Button variant="ghost" onClick={onClick} style={{ minHeight: 40, padding: "6px 0", marginBottom: SP.md }}>
      <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> {label}
    </Button>
  )

  /* ── list view ── */
  if (!active) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
        <BackButton label="Back" onClick={onBack} />
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: C.text }}>
          {sectionLabel} <span style={iriText}>studio</span>
        </h1>
        <p style={{ color: C.soft, margin: "0 0 8px", fontSize: 15, lineHeight: 1.55 }}>
          The constructed-response room, built like your real CBE: the word processor{hasSheet ? ", the answer spreadsheet" : ""}, the on-screen
          calculator — and the exam clock at {bp ? (bp.durationMin / 100).toFixed(2).replace(/0$/, "") : "1.8"} minutes a mark. Charles debriefs your answer
          {hasSheet ? " and your spreadsheet workings" : ""} against the marking points, instantly.
        </p>
        {bp && (
          <p style={{ color: C.faint, margin: "0 0 20px", fontSize: 12.5 }}>
            In the real {paperId} exam, {sectionLabel.toLowerCase()} is worth{" "}
            <b style={{ color: C.soft }}>{bp.sections.filter((s) => s.kind === "constructed").reduce((a, s) => a + s.marks, 0)} of the 100 marks</b>.
          </p>
        )}
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(0.05 * i, 0.4) }}
                style={{ textAlign: "left" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: SP.md, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{q.topic}</span>
                  <span style={{ fontSize: 12, color: C.faint, whiteSpace: "nowrap" }}>
                    {q.maxMarks} marks · {Math.round(examSecondsFor(paperId, q.maxMarks) / 60)} min
                  </span>
                </div>
                <div style={{ color: C.soft, fontSize: 13.5, lineHeight: 1.5, marginBottom: 12 }}>{q.stem}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Button onClick={() => pick(q, true)}>
                    <Icon name="time" size={15} color="#fff" /> Exam conditions
                  </Button>
                  <Button variant="secondary" onClick={() => pick(q, false)}>
                    Practise untimed
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    )
  }

  /* ── answer + marking view ── */
  const scorePct = result ? Math.round((result.marks / result.maxMarks) * 100) : 0
  const canMark = !marking && (!!answer.trim() || Object.keys(cells).length > 0)
  const clockTone = secondsLeft !== null && allowed > 0 ? (secondsLeft / allowed <= 0.2 ? C.red : secondsLeft / allowed <= 0.5 ? C.amber : C.text) : C.text

  const tabBtn = (id: "word" | "sheet"): CSSProperties => ({
    display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 750,
    cursor: "pointer", border: `1px solid ${tab === id ? C.brand : C.border}`,
    background: tab === id ? C.brandSoft : "var(--sch-card, #fff)", color: tab === id ? C.brand : C.soft,
  })

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <BackButton label="All questions" onClick={() => { setActive(null); setSecondsLeft(null) }} />
        {secondsLeft !== null && !result && (
          <motion.div
            animate={expired ? { scale: [1, 1.04, 1] } : undefined}
            transition={{ duration: 0.8, repeat: expired ? Infinity : 0 }}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, marginBottom: SP.md,
              border: `1.5px solid ${expired ? C.red : C.border}`, background: expired ? "rgba(200,0,0,0.06)" : "var(--sch-card, #fff)",
            }}
          >
            <Icon name="time" size={15} color={clockTone} />
            <span style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: clockTone }}>
              {fmtClock(secondsLeft)}
            </span>
            <span style={{ fontSize: 11, color: C.faint }}>of {fmtClock(allowed)}</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {expired && !result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "10px 14px", borderRadius: 12, background: "rgba(200,0,0,0.07)", border: `1px solid rgba(200,0,0,0.25)`, marginBottom: SP.md, fontSize: 13, color: C.text, lineHeight: 1.5 }}>
              <b>Time.</b> In the real CBE your answer is now what it is. Finish your sentence and mark it — the gap between
              what you wrote and the marking points IS the lesson.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card style={{ marginBottom: SP.lg }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: SP.md, marginBottom: SP.sm }}>
          <span style={{ fontWeight: 700, fontSize: 15, ...iriText }}>{active.topic}</span>
          <span style={{ fontSize: 12, color: C.faint, whiteSpace: "nowrap" }}>{active.maxMarks} marks</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: C.text, margin: 0 }}>{active.stem}</p>
      </Card>

      {/* CBE answer tools — word processor + spreadsheet, like the real thing */}
      {hasSheet && (
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button style={tabBtn("word")} onClick={() => setTab("word")}>
            <Icon name="practice" size={15} /> Word processor
          </button>
          <button style={tabBtn("sheet")} onClick={() => setTab("sheet")}>
            <Icon name="sheet" size={15} /> Spreadsheet
            {Object.keys(cells).length > 0 && (
              <span style={{ fontSize: 10, fontWeight: 800, background: C.brand, color: "#fff", borderRadius: 999, padding: "1px 7px" }}>
                {Object.keys(cells).filter((k) => cells[k].trim() !== "").length}
              </span>
            )}
          </button>
        </div>
      )}

      {tab === "word" || !hasSheet ? (
        <>
          <textarea
            value={answer}
            disabled={marking}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here. Address each point you can — you're marked per valid point, in your own words."
            rows={10}
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
            {hasSheet && (
              <span style={{ fontSize: 12, color: C.faint }}>Numbers belong in the spreadsheet tab — label every line.</span>
            )}
          </div>
        </>
      ) : (
        <SpreadsheetPad cells={cells} onChange={setCells} height={340} />
      )}

      <Button full size="lg" disabled={!canMark} onClick={mark} style={{ marginTop: SP.md }}>
        <Icon name="examiner" size={18} color={canMark ? "#fff" : C.faint} />
        {marking ? "Charles is analysing your answer…" : "Mark my answer"}
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
              {timedRef.current && (
                <div style={{ fontSize: 12, color: C.soft, marginTop: 6 }}>
                  Under exam conditions · {fmtClock(Math.max(0, allowed - (secondsLeft ?? 0)))} used of {fmtClock(allowed)}
                </div>
              )}
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

            <div style={{ display: "flex", gap: 8, marginTop: SP.lg, flexWrap: "wrap" }}>
              <Button variant="secondary" onClick={() => pick(active, true)} style={{ flex: 1, minWidth: 180 }}>
                <Icon name="time" size={15} /> Again, on the clock
              </Button>
              <Button variant="ghost" onClick={() => { setAnswer(""); setCells({}); setResult(null); setSecondsLeft(null) }} style={{ flex: 1, minWidth: 140 }}>
                <Icon name="loop" size={16} /> Untimed retry
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The exam toolbelt — calculator, formulae, notes — at the candidate's elbow. */}
      <CbeToolsDock paperId={paperId} area={active.area} context="examiner" />
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
