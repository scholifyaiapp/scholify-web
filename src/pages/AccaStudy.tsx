import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import {
  getPapers,
  getPaper,
  buildSession,
  gradeQuestion,
  recordAnswer,
  getPaperStats,
  getOverallProgress,
  type AccaPaper,
  type AccaQuestion,
} from "@/lib/acca"

/* ──────────────────────────────────────────────────────────────
 *  /study — Scholify's ACCA exam-prep home.
 *
 *  The core loop (Makon-style): pick a paper → practise real exam-style
 *  questions → instant marking + explanation → readiness tracked per area.
 *  localStorage-first; works with zero API keys via the seed question bank.
 * ────────────────────────────────────────────────────────────── */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"

const GREEN = "#10B981"
const RED = "#EF4444"

type Mode = "picker" | "overview" | "session" | "results"

const SESSION_SIZE = 8

function card(extra?: CSSProperties): CSSProperties {
  return {
    background: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    ...extra,
  }
}

export default function AccaStudy() {
  const { toast } = useToast()
  const papers = getPapers()

  const [paperId, setPaperId] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>("picker")

  // active session state
  const [questions, setQuestions] = useState<AccaQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [numInput, setNumInput] = useState("")
  const [graded, setGraded] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const paper = paperId ? getPaper(paperId) : undefined

  function openPaper(id: string) {
    setPaperId(id)
    setMode("overview")
  }

  function startSession(weakFirst = false) {
    if (!paperId) return
    const seed = (Date.now() % 100000) + 1
    const qs = buildSession(paperId, SESSION_SIZE, { weakFirst }, seed)
    if (qs.length === 0) {
      toast("No questions available yet for this paper.")
      return
    }
    setQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    resetQuestion()
    setMode("session")
  }

  function resetQuestion() {
    setChoice(null)
    setNumInput("")
    setGraded(false)
    setWasCorrect(false)
  }

  function submit() {
    const q = questions[idx]
    if (!q) return
    const response: number | number[] =
      q.type === "number" ? parseFloat(numInput.replace(/,/g, "")) : choice ?? -1
    const result = gradeQuestion(q, response)
    recordAnswer(q.paper, q, result.correct)
    setWasCorrect(result.correct)
    setGraded(true)
    if (result.correct) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setMode("results")
      return
    }
    setIdx((i) => i + 1)
    resetQuestion()
  }

  const canSubmit = useMemo(() => {
    const q = questions[idx]
    if (!q) return false
    if (q.type === "number") return numInput.trim() !== "" && !Number.isNaN(parseFloat(numInput))
    return choice !== null
  }, [questions, idx, numInput, choice])

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 0 40px" }}>
        <AnimatePresence mode="wait">
          {mode === "picker" && (
            <Picker key="picker" papers={papers} onPick={openPaper} />
          )}
          {mode === "overview" && paper && (
            <Overview
              key="overview"
              paper={paper}
              onBack={() => {
                setPaperId(null)
                setMode("picker")
              }}
              onStart={() => startSession(false)}
              onWeak={() => startSession(true)}
            />
          )}
          {mode === "session" && questions[idx] && (
            <SessionView
              key={`q-${idx}`}
              q={questions[idx]}
              index={idx}
              total={questions.length}
              choice={choice}
              numInput={numInput}
              graded={graded}
              wasCorrect={wasCorrect}
              canSubmit={canSubmit}
              onChoice={setChoice}
              onNum={setNumInput}
              onSubmit={submit}
              onNext={next}
            />
          )}
          {mode === "results" && paper && (
            <Results
              key="results"
              paper={paper}
              correct={correctCount}
              total={questions.length}
              onAgain={() => startSession(false)}
              onOverview={() => setMode("overview")}
            />
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}

/* ── Paper picker ─────────────────────────────────────────────── */

function Picker({ papers, onPick }: { papers: AccaPaper[]; onPick: (id: string) => void }) {
  const overall = getOverallProgress()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
    >
      <p style={{ color: DIM, fontSize: 13, fontWeight: 600, letterSpacing: 0.4, margin: "0 0 6px" }}>
        ACCA EXAM PREP
      </p>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 6px", color: TEXT }}>
        Choose your <span style={iriText}>paper</span>
      </h1>
      <p style={{ color: MUTED, margin: "0 0 24px", fontSize: 15 }}>
        Practise real exam-style questions with instant marking and explanations.
        {overall.streak > 0 && (
          <>
            {" "}
            🔥 <strong style={{ color: TEXT }}>{overall.streak}-day streak</strong>.
          </>
        )}
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        {papers.map((p, i) => {
          const stats = getPaperStats(p.id)
          return (
            <motion.button
              key={p.id}
              onClick={() => onPick(p.id)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              style={{
                ...card({ textAlign: "left", cursor: "pointer" }),
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: IRIDESCENT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 17,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {p.id}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 750, fontSize: 16, color: TEXT }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: DIM }}>{p.code}</span>
                </div>
                <div style={{ color: MUTED, fontSize: 13, marginTop: 3, lineHeight: 1.45 }}>
                  {p.blurb}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 18, ...iriText }}>{stats.readiness}%</div>
                <div style={{ color: DIM, fontSize: 11 }}>ready</div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ── Paper overview ───────────────────────────────────────────── */

function Overview({
  paper,
  onBack,
  onStart,
  onWeak,
}: {
  paper: AccaPaper
  onBack: () => void
  onStart: () => void
  onWeak: () => void
}) {
  const stats = getPaperStats(paper.id)
  const hasHistory = stats.answered > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
    >
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 14, padding: 0, marginBottom: 14 }}
      >
        ← All papers
      </button>

      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 2px", color: TEXT }}>
        {paper.name}
      </h1>
      <p style={{ color: DIM, margin: "0 0 20px", fontSize: 13 }}>
        {paper.code} · {paper.level}
      </p>

      {/* readiness stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        <Stat label="Readiness" value={`${stats.readiness}%`} accent />
        <Stat label="Accuracy" value={hasHistory ? `${Math.round(stats.accuracy * 100)}%` : "—"} />
        <Stat label="Answered" value={`${stats.answered}`} />
      </div>

      {/* actions */}
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={onStart}
          style={{
            ...card({ cursor: "pointer" }),
            background: IRIDESCENT,
            border: "none",
            color: "#fff",
            fontWeight: 750,
            fontSize: 16,
            padding: 18,
          }}
        >
          Start practice · {SESSION_SIZE} questions
        </motion.button>
        {hasHistory && (
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={onWeak}
            style={{ ...card({ cursor: "pointer" }), fontWeight: 650, fontSize: 15, color: TEXT }}
          >
            🎯 Target my weak areas
          </motion.button>
        )}
      </div>

      {/* syllabus areas */}
      <h3 style={{ fontSize: 13, fontWeight: 700, color: DIM, letterSpacing: 0.4, margin: "0 0 10px" }}>
        SYLLABUS AREAS
      </h3>
      <div style={{ display: "grid", gap: 8 }}>
        {stats.areas.map((a) => (
          <div
            key={a.code}
            style={{ ...card({ padding: 14 }), display: "flex", alignItems: "center", gap: 12 }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "var(--sch-card-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                color: TEXT,
                flexShrink: 0,
              }}
            >
              {a.code}
            </span>
            <span style={{ flex: 1, fontSize: 14, color: TEXT }}>{a.label}</span>
            <span style={{ fontSize: 12, color: a.seen ? MUTED : DIM }}>
              {a.seen ? `${Math.round(a.accuracy * 100)}%` : "—"}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={card({ padding: 14, textAlign: "center" })}>
      <div style={{ fontWeight: 800, fontSize: 22, ...(accent ? iriText : { color: TEXT }) }}>{value}</div>
      <div style={{ color: DIM, fontSize: 11, marginTop: 2 }}>{label}</div>
    </div>
  )
}

/* ── Session (one question) ───────────────────────────────────── */

function SessionView({
  q,
  index,
  total,
  choice,
  numInput,
  graded,
  wasCorrect,
  canSubmit,
  onChoice,
  onNum,
  onSubmit,
  onNext,
}: {
  q: AccaQuestion
  index: number
  total: number
  choice: number | null
  numInput: string
  graded: boolean
  wasCorrect: boolean
  canSubmit: boolean
  onChoice: (i: number) => void
  onNum: (v: string) => void
  onSubmit: () => void
  onNext: () => void
}) {
  const correctIdx = Array.isArray(q.correct) ? q.correct[0] : q.correct
  const pct = ((index) / total) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
    >
      {/* progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: DIM, fontSize: 13, fontWeight: 600 }}>
          Question {index + 1} / {total}
        </span>
        <span style={{ color: DIM, fontSize: 12 }}>Area {q.area} · {q.marks} marks</span>
      </div>
      <div style={{ height: 6, background: "var(--sch-card-2)", borderRadius: 999, marginBottom: 22, overflow: "hidden" }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          style={{ height: "100%", background: IRIDESCENT, borderRadius: 999 }}
        />
      </div>

      <div style={card({ padding: 22 })}>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: TEXT, fontWeight: 550, margin: "0 0 20px" }}>
          {q.stem}
        </p>

        {q.type === "number" ? (
          <input
            type="text"
            inputMode="decimal"
            value={numInput}
            disabled={graded}
            onChange={(e) => onNum(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canSubmit && !graded && onSubmit()}
            placeholder={q.unit ? `Enter amount (${q.unit})` : "Enter your answer"}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              fontSize: 16,
              borderRadius: 12,
              border: `1.5px solid ${graded ? (wasCorrect ? GREEN : RED) : BORDER}`,
              background: "var(--sch-bg)",
              color: TEXT,
              outline: "none",
            }}
          />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {q.options?.map((opt, i) => {
              const isChosen = choice === i
              const isCorrect = i === correctIdx
              let bd = BORDER
              let bg = CARD
              if (graded && isCorrect) {
                bd = GREEN
                bg = "rgba(16,185,129,0.08)"
              } else if (graded && isChosen && !isCorrect) {
                bd = RED
                bg = "rgba(239,68,68,0.08)"
              } else if (isChosen) {
                bd = "#A78BFA"
              }
              return (
                <button
                  key={i}
                  onClick={() => !graded && onChoice(i)}
                  disabled={graded}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "left",
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: `1.5px solid ${bd}`,
                    background: bg,
                    color: TEXT,
                    fontSize: 15,
                    cursor: graded ? "default" : "pointer",
                    transition: "border-color .15s, background .15s",
                  }}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      border: `1.5px solid ${bd}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* explanation */}
        <AnimatePresence>
          {graded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  marginTop: 18,
                  padding: 16,
                  borderRadius: 12,
                  background: wasCorrect ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
                  border: `1px solid ${wasCorrect ? GREEN : RED}`,
                }}
              >
                <div style={{ fontWeight: 750, color: wasCorrect ? GREEN : RED, fontSize: 14, marginBottom: 6 }}>
                  {wasCorrect ? "✓ Correct" : "✗ Not quite"}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: TEXT }}>{q.explanation}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* action bar */}
      <div style={{ marginTop: 16 }}>
        {!graded ? (
          <motion.button
            whileTap={{ scale: 0.99 }}
            disabled={!canSubmit}
            onClick={onSubmit}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 14,
              border: "none",
              background: canSubmit ? IRIDESCENT : "var(--sch-card-2)",
              color: canSubmit ? "#fff" : DIM,
              fontWeight: 750,
              fontSize: 16,
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            Check answer
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={onNext}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 14,
              border: "none",
              background: IRIDESCENT,
              color: "#fff",
              fontWeight: 750,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {index + 1 >= total ? "See results" : "Next question →"}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

/* ── Results ──────────────────────────────────────────────────── */

function Results({
  paper,
  correct,
  total,
  onAgain,
  onOverview,
}: {
  paper: AccaPaper
  correct: number
  total: number
  onAgain: () => void
  onOverview: () => void
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = pct >= 50
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: "center", paddingTop: 20 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        style={{ fontSize: 56, marginBottom: 8 }}
      >
        {passed ? "🎉" : "💪"}
      </motion.div>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 4px", color: TEXT }}>
        <span style={iriText}>{correct}</span> / {total} correct
      </h1>
      <p style={{ color: MUTED, margin: "0 0 28px", fontSize: 15 }}>
        {passed
          ? `Nice — that's a ${pct}% pass mark on ${paper.name}.`
          : `${pct}% this round. Keep going — repetition is how the marks come.`}
      </p>

      <div style={{ display: "grid", gap: 10, maxWidth: 340, margin: "0 auto" }}>
        <motion.button
          whileTap={{ scale: 0.99 }}
          onClick={onAgain}
          style={{
            padding: 16,
            borderRadius: 14,
            border: "none",
            background: IRIDESCENT,
            color: "#fff",
            fontWeight: 750,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Practise again
        </motion.button>
        <button
          onClick={onOverview}
          style={{
            padding: 16,
            borderRadius: 14,
            border: `1px solid ${BORDER}`,
            background: CARD,
            color: TEXT,
            fontWeight: 650,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Back to {paper.id} overview
        </button>
      </div>
    </motion.div>
  )
}
