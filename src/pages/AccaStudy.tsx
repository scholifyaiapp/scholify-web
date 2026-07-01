import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"
import TutorPanel from "@/components/acca/TutorPanel"
import ExaminerView from "@/components/acca/ExaminerView"
import FlashcardsView from "@/components/acca/FlashcardsView"
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
import {
  getPlan,
  setPlan,
  daysUntilExam,
  getRecommendations,
  readinessBand,
} from "@/lib/acca-plan"
import { flashcardStats } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"

/* ──────────────────────────────────────────────────────────────
 *  /study — Scholify's ACCA exam-prep home.
 *
 *  Hub → per-paper overview (readiness, study plan, recommendations) →
 *  four practice modes: Practice (with AI Tutor), timed Mock exam,
 *  AI Examiner (written marking), and Flashcards. Mock + Examiner are Pro.
 *  localStorage-first; works with zero API keys via the seed content.
 * ────────────────────────────────────────────────────────────── */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const GREEN = "#10B981"
const RED = "#EF4444"

type Mode = "picker" | "overview" | "session" | "examiner" | "flashcards" | "results"

const SESSION_SIZE = 8
const MOCK_SIZE = 12
const MOCK_SECONDS_PER_Q = 90

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function AccaStudy() {
  const { toast } = useToast()
  const { user } = useAuth()
  const isPro = Boolean(user?.user_metadata?.plan && user.user_metadata.plan !== "free")
  const { showPaywall, paywallType, triggerFeaturePaywall, closePaywall } = usePaywall()
  const papers = getPapers()

  const [paperId, setPaperId] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>("picker")
  const [tick, setTick] = useState(0) // force stats refresh after a session

  // session state
  const [questions, setQuestions] = useState<AccaQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [numInput, setNumInput] = useState("")
  const [graded, setGraded] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [log, setLog] = useState<{ area: string; correct: boolean }[]>([])
  const [isMock, setIsMock] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const paper = paperId ? getPaper(paperId) : undefined

  // mock countdown
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (mode === "session" && isMock) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            if (timerRef.current) clearInterval(timerRef.current)
            setMode("results")
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [mode, isMock])

  function openPaper(id: string) {
    setPaperId(id)
    setMode("overview")
  }

  function startSession(weakFirst = false, mock = false) {
    if (!paperId) return
    if (mock && !isPro) {
      triggerFeaturePaywall()
      return
    }
    const seed = (Date.now() % 100000) + 1
    const size = mock ? MOCK_SIZE : SESSION_SIZE
    const qs = buildSession(paperId, size, { weakFirst }, seed)
    if (qs.length === 0) {
      toast.info("No questions available yet for this paper.")
      return
    }
    setQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(mock)
    setTimeLeft(mock ? qs.length * MOCK_SECONDS_PER_Q : 0)
    resetQuestion()
    setMode("session")
  }

  function openExaminer() {
    if (!isPro) {
      triggerFeaturePaywall()
      return
    }
    setMode("examiner")
  }

  function resetQuestion() {
    setChoice(null)
    setNumInput("")
    setGraded(false)
    setWasCorrect(false)
  }

  function currentResponse(q: AccaQuestion): number | number[] {
    return q.type === "number" ? parseFloat(numInput.replace(/,/g, "")) : choice ?? -1
  }

  function submit() {
    const q = questions[idx]
    if (!q) return
    const result = gradeQuestion(q, currentResponse(q))
    recordAnswer(q.paper, q, result.correct)
    setLog((l) => [...l, { area: q.area, correct: result.correct }])
    setWasCorrect(result.correct)
    setGraded(true)
    if (result.correct) setCorrectCount((c) => c + 1)
  }

  // mock: record silently and advance with no feedback
  function mockNext() {
    const q = questions[idx]
    if (!q) return
    const result = gradeQuestion(q, currentResponse(q))
    recordAnswer(q.paper, q, result.correct)
    setLog((l) => [...l, { area: q.area, correct: result.correct }])
    if (result.correct) setCorrectCount((c) => c + 1)
    advance()
  }

  function advance() {
    if (idx + 1 >= questions.length) {
      if (timerRef.current) clearInterval(timerRef.current)
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

  function leaveSession() {
    if (timerRef.current) clearInterval(timerRef.current)
    setTick((t) => t + 1)
    setMode("overview")
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 0 40px" }} key={tick}>
        <AnimatePresence mode="wait">
          {mode === "picker" && <Picker key="picker" papers={papers} onPick={openPaper} />}

          {mode === "overview" && paper && (
            <Overview
              key="overview"
              paper={paper}
              isPro={isPro}
              onBack={() => { setPaperId(null); setMode("picker") }}
              onPractice={() => startSession(false, false)}
              onWeak={() => startSession(true, false)}
              onMock={() => startSession(false, true)}
              onExaminer={openExaminer}
              onFlashcards={() => setMode("flashcards")}
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
              isMock={isMock}
              timeLeft={timeLeft}
              onChoice={setChoice}
              onNum={setNumInput}
              onSubmit={submit}
              onNext={advance}
              onMockNext={mockNext}
              onQuit={leaveSession}
            />
          )}

          {mode === "examiner" && paperId && (
            <ExaminerView key="examiner" paperId={paperId} onBack={() => setMode("overview")} />
          )}

          {mode === "flashcards" && paperId && (
            <FlashcardsView key="flashcards" paperId={paperId} onBack={() => { setTick((t) => t + 1); setMode("overview") }} />
          )}

          {mode === "results" && paper && (
            <Results
              key="results"
              paper={paper}
              correct={correctCount}
              total={questions.length}
              isMock={isMock}
              log={log}
              onAgain={() => startSession(false, isMock)}
              onOverview={leaveSession}
            />
          )}
        </AnimatePresence>
      </div>

      <PaywallModal open={showPaywall} type={paywallType} onClose={closePaywall} />
    </DashboardLayout>
  )
}

/* ── Paper picker ─────────────────────────────────────────────── */

function Picker({ papers, onPick }: { papers: AccaPaper[]; onPick: (id: string) => void }) {
  const overall = getOverallProgress()
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <p style={{ color: DIM, fontSize: 13, fontWeight: 600, letterSpacing: 0.4, margin: "0 0 6px" }}>
        ACCA EXAM PREP
      </p>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 6px", color: TEXT }}>
        Choose your <span style={iriText}>paper</span>
      </h1>
      <p style={{ color: MUTED, margin: "0 0 24px", fontSize: 15 }}>
        Practise exam-style questions with instant AI marking, mock exams and flashcards.
        {overall.streak > 0 && (<> 🔥 <strong style={{ color: TEXT }}>{overall.streak}-day streak</strong>.</>)}
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        {papers.map((p, i) => {
          const stats = getPaperStats(p.id)
          const band = readinessBand(stats.readiness)
          return (
            <motion.button
              key={p.id}
              onClick={() => onPick(p.id)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              style={{ ...card({ textAlign: "left", cursor: "pointer" }), display: "flex", alignItems: "center", gap: 16 }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: IRIDESCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 17, color: "#fff", flexShrink: 0 }}>
                {p.id}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 750, fontSize: 16, color: TEXT }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: DIM }}>{p.code}</span>
                </div>
                <div style={{ color: MUTED, fontSize: 13, marginTop: 3, lineHeight: 1.45 }}>{p.blurb}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 18, ...iriText }}>{stats.readiness}%</div>
                <div style={{ color: band.color, fontSize: 11, fontWeight: 600 }}>{band.label}</div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ── Paper overview (readiness + plan + modes) ────────────────── */

function Overview({
  paper,
  isPro,
  onBack,
  onPractice,
  onWeak,
  onMock,
  onExaminer,
  onFlashcards,
}: {
  paper: AccaPaper
  isPro: boolean
  onBack: () => void
  onPractice: () => void
  onWeak: () => void
  onMock: () => void
  onExaminer: () => void
  onFlashcards: () => void
}) {
  const stats = getPaperStats(paper.id)
  const band = readinessBand(stats.readiness)
  const hasHistory = stats.answered > 0
  const recs = getRecommendations(paper.id)
  const fcStats = flashcardStats(paper.id)
  const writtenCount = getWrittenQuestions(paper.id).length
  const [plan, setPlanState] = useState(() => getPlan(paper.id))
  const days = daysUntilExam(paper.id)

  function updateExamDate(date: string) {
    setPlanState(setPlan(paper.id, { examDate: date || null }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={backBtn}>← All papers</button>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 2px", color: TEXT }}>{paper.name}</h1>
      <p style={{ color: DIM, margin: "0 0 20px", fontSize: 13 }}>{paper.code} · {paper.level}</p>

      {/* readiness */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        <Stat label={band.label} value={`${stats.readiness}%`} accent />
        <Stat label="Accuracy" value={hasHistory ? `${Math.round(stats.accuracy * 100)}%` : "—"} />
        <Stat label="Answered" value={`${stats.answered}`} />
      </div>

      {/* study plan */}
      <div style={card({ marginBottom: 16 })}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>📅 Exam date</div>
            <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>
              {days === null ? "Set your sitting to get a countdown." : days === 0 ? "That's today — good luck!" : `${days} days to go`}
            </div>
          </div>
          <input
            type="date"
            value={plan.examDate ?? ""}
            onChange={(e) => updateExamDate(e.target.value)}
            style={{ padding: "9px 12px", borderRadius: 10, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, fontSize: 13.5, colorScheme: "dark light" }}
          />
        </div>
      </div>

      {/* recommendations */}
      {recs.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={sectionH}>WHAT TO DO NEXT</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {recs.map((r, i) => (
              <div key={i} style={card({ padding: 14 })}>
                <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>{r.title}</div>
                <div style={{ fontSize: 13, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>{r.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* modes */}
      <h3 style={sectionH}>PRACTICE MODES</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        <ModeTile emoji="✏️" title={`Practice · ${SESSION_SIZE} questions`} sub="Instant marking, explanations & AI tutor" onClick={onPractice} primary />
        {hasHistory && <ModeTile emoji="🎯" title="Target my weak areas" sub="Drill your lowest-scoring topics first" onClick={onWeak} />}
        <ModeTile emoji="⏱️" title="Mock exam" sub={`${MOCK_SIZE} questions, timed, no hints`} onClick={onMock} locked={!isPro} />
        <ModeTile emoji="📝" title="AI Examiner" sub={writtenCount ? `Mark a written answer · ${writtenCount} questions` : "Written marking — coming soon"} onClick={onExaminer} locked={!isPro} />
        <ModeTile emoji="🧠" title="Flashcards" sub={`${fcStats.due} due · ${fcStats.mastered}/${fcStats.total} mastered`} onClick={onFlashcards} />
      </div>

      {/* syllabus areas */}
      <h3 style={sectionH}>SYLLABUS AREAS</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {stats.areas.map((a) => (
          <div key={a.code} style={{ ...card({ padding: 14 }), display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--sch-card-2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: TEXT, flexShrink: 0 }}>
              {a.code}
            </span>
            <span style={{ flex: 1, fontSize: 14, color: TEXT }}>{a.label}</span>
            <span style={{ fontSize: 12, color: a.seen ? MUTED : DIM }}>{a.seen ? `${Math.round(a.accuracy * 100)}%` : "—"}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ModeTile({
  emoji, title, sub, onClick, primary, locked,
}: { emoji: string; title: string; sub: string; onClick: () => void; primary?: boolean; locked?: boolean }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      style={{
        ...card({ cursor: "pointer", padding: 16 }),
        display: "flex",
        alignItems: "center",
        gap: 14,
        textAlign: "left",
        ...(primary ? { background: IRIDESCENT, border: "none" } : {}),
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: primary ? "#fff" : TEXT, display: "flex", alignItems: "center", gap: 8 }}>
          {title} {locked && <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 999, background: "rgba(167,139,250,0.15)", color: "#A78BFA", fontWeight: 700 }}>PRO</span>}
        </div>
        <div style={{ fontSize: 12.5, color: primary ? "rgba(255,255,255,0.85)" : MUTED, marginTop: 2 }}>{sub}</div>
      </div>
      <span style={{ color: primary ? "#fff" : DIM, fontSize: 18 }}>›</span>
    </motion.button>
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

function fmtTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${`${sec}`.padStart(2, "0")}`
}

function SessionView({
  q, index, total, choice, numInput, graded, wasCorrect, canSubmit, isMock, timeLeft,
  onChoice, onNum, onSubmit, onNext, onMockNext, onQuit,
}: {
  q: AccaQuestion
  index: number
  total: number
  choice: number | null
  numInput: string
  graded: boolean
  wasCorrect: boolean
  canSubmit: boolean
  isMock: boolean
  timeLeft: number
  onChoice: (i: number) => void
  onNum: (v: string) => void
  onSubmit: () => void
  onNext: () => void
  onMockNext: () => void
  onQuit: () => void
}) {
  const correctIdx = Array.isArray(q.correct) ? q.correct[0] : q.correct
  const pct = (index / total) * 100
  const lowTime = isMock && timeLeft <= 60

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={onQuit} style={{ ...backBtn, marginBottom: 0 }}>← Exit</button>
        <span style={{ color: DIM, fontSize: 13, fontWeight: 600 }}>Question {index + 1} / {total}</span>
        {isMock ? (
          <span style={{ fontWeight: 800, fontSize: 14, color: lowTime ? RED : TEXT, fontVariantNumeric: "tabular-nums" }}>⏱ {fmtTime(timeLeft)}</span>
        ) : (
          <span style={{ color: DIM, fontSize: 12 }}>Area {q.area}</span>
        )}
      </div>

      <div style={{ height: 6, background: "var(--sch-card-2)", borderRadius: 999, marginBottom: 22, overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} style={{ height: "100%", background: IRIDESCENT, borderRadius: 999 }} />
      </div>

      <div style={card({ padding: 22 })}>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: TEXT, fontWeight: 550, margin: "0 0 20px" }}>{q.stem}</p>

        {q.type === "number" ? (
          <input
            type="text"
            inputMode="decimal"
            value={numInput}
            disabled={graded}
            onChange={(e) => onNum(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canSubmit && !graded && !isMock && onSubmit()}
            placeholder={q.unit ? `Enter amount (${q.unit})` : "Enter your answer"}
            style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 16, borderRadius: 12, border: `1.5px solid ${graded ? (wasCorrect ? GREEN : RED) : BORDER}`, background: "var(--sch-bg)", color: TEXT, outline: "none" }}
          />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {q.options?.map((opt, i) => {
              const isChosen = choice === i
              const isCorrect = i === correctIdx
              let bd = BORDER
              let bg = CARD
              if (graded && isCorrect) { bd = GREEN; bg = "rgba(16,185,129,0.08)" }
              else if (graded && isChosen && !isCorrect) { bd = RED; bg = "rgba(239,68,68,0.08)" }
              else if (isChosen) { bd = "#A78BFA" }
              return (
                <button
                  key={i}
                  onClick={() => !graded && onChoice(i)}
                  disabled={graded}
                  style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${bd}`, background: bg, color: TEXT, fontSize: 15, cursor: graded ? "default" : "pointer", transition: "border-color .15s, background .15s" }}
                >
                  <span style={{ width: 26, height: 26, borderRadius: 7, border: `1.5px solid ${bd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* explanation + tutor (practice only) */}
        <AnimatePresence>
          {graded && !isMock && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ overflow: "hidden" }}>
              <div style={{ marginTop: 18, padding: 16, borderRadius: 12, background: wasCorrect ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)", border: `1px solid ${wasCorrect ? GREEN : RED}` }}>
                <div style={{ fontWeight: 750, color: wasCorrect ? GREEN : RED, fontSize: 14, marginBottom: 6 }}>
                  {wasCorrect ? "✓ Correct" : "✗ Not quite"}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: TEXT }}>{q.explanation}</div>
              </div>
              <TutorPanel q={q} correctText={q.options?.[correctIdx ?? -1] ?? `${q.numericAnswer ?? ""}`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* action bar */}
      <div style={{ marginTop: 16 }}>
        {isMock ? (
          <motion.button whileTap={{ scale: 0.99 }} disabled={!canSubmit} onClick={onMockNext} style={actionBtn(canSubmit)}>
            {index + 1 >= total ? "Finish mock" : "Next →"}
          </motion.button>
        ) : !graded ? (
          <motion.button whileTap={{ scale: 0.99 }} disabled={!canSubmit} onClick={onSubmit} style={actionBtn(canSubmit)}>
            Check answer
          </motion.button>
        ) : (
          <motion.button whileTap={{ scale: 0.99 }} onClick={onNext} style={actionBtn(true)}>
            {index + 1 >= total ? "See results" : "Next question →"}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

function actionBtn(active: boolean): CSSProperties {
  return {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    border: "none",
    background: active ? IRIDESCENT : "var(--sch-card-2)",
    color: active ? "#fff" : DIM,
    fontWeight: 750,
    fontSize: 16,
    cursor: active ? "pointer" : "not-allowed",
  }
}

/* ── Results ──────────────────────────────────────────────────── */

function Results({
  paper, correct, total, isMock, log, onAgain, onOverview,
}: {
  paper: AccaPaper
  correct: number
  total: number
  isMock: boolean
  log: { area: string; correct: boolean }[]
  onAgain: () => void
  onOverview: () => void
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = pct >= 50

  // per-area breakdown from this session's log
  const areaRows = useMemo(() => {
    const map = new Map<string, { seen: number; correct: number }>()
    for (const e of log) {
      const r = map.get(e.area) ?? { seen: 0, correct: 0 }
      r.seen += 1
      if (e.correct) r.correct += 1
      map.set(e.area, r)
    }
    const labels = new Map(paper.areas.map((a) => [a.code, a.label]))
    return [...map.entries()]
      .map(([code, r]) => ({ code, label: labels.get(code) ?? code, ...r, pct: Math.round((r.correct / r.seen) * 100) }))
      .sort((a, b) => a.pct - b.pct)
  }, [log, paper])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", paddingTop: 20 }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} style={{ fontSize: 56, marginBottom: 8 }}>
        {passed ? "🎉" : "💪"}
      </motion.div>
      <div style={{ fontSize: 13, color: DIM, letterSpacing: 0.4, fontWeight: 600 }}>{isMock ? "MOCK EXAM RESULT" : "PRACTICE COMPLETE"}</div>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: "4px 0", color: TEXT }}>
        <span style={iriText}>{correct}</span> / {total} correct
      </h1>
      <p style={{ color: MUTED, margin: "0 0 24px", fontSize: 15 }}>
        {passed ? `That's a ${pct}% pass on ${paper.name}.` : `${pct}% this round. Keep going — repetition is how the marks come.`}
      </p>

      {areaRows.length > 0 && (
        <div style={{ maxWidth: 420, margin: "0 auto 24px", textAlign: "left" }}>
          <h3 style={{ ...sectionH, textAlign: "center" }}>BY SYLLABUS AREA</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {areaRows.map((a) => (
              <div key={a.code} style={{ ...card({ padding: "10px 14px" }), display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 24, height: 24, borderRadius: 7, background: "var(--sch-card-2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: TEXT, flexShrink: 0 }}>{a.code}</span>
                <span style={{ flex: 1, fontSize: 13, color: TEXT }}>{a.label}</span>
                <div style={{ width: 60, height: 6, background: "var(--sch-card-2)", borderRadius: 999, overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ height: "100%", width: `${a.pct}%`, background: a.pct >= 50 ? GREEN : RED, borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 12, color: a.pct >= 50 ? GREEN : RED, fontWeight: 650, width: 60, textAlign: "right" }}>{a.correct}/{a.seen}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 10, maxWidth: 340, margin: "0 auto" }}>
        <motion.button whileTap={{ scale: 0.99 }} onClick={onAgain} style={{ padding: 16, borderRadius: 14, border: "none", background: IRIDESCENT, color: "#fff", fontWeight: 750, fontSize: 16, cursor: "pointer" }}>
          {isMock ? "New mock" : "Practise again"}
        </motion.button>
        <button onClick={onOverview} style={{ padding: 16, borderRadius: 14, border: `1px solid ${BORDER}`, background: CARD, color: TEXT, fontWeight: 650, fontSize: 15, cursor: "pointer" }}>
          Back to {paper.id} overview
        </button>
      </div>
    </motion.div>
  )
}

const backBtn: CSSProperties = { background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 14, padding: 0, marginBottom: 14 }
const sectionH: CSSProperties = { fontSize: 13, fontWeight: 700, color: DIM, letterSpacing: 0.4, margin: "0 0 10px" }
