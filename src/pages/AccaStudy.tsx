import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"
import TutorPanel from "@/components/acca/TutorPanel"
import ExaminerView from "@/components/acca/ExaminerView"
import FlashcardsView from "@/components/acca/FlashcardsView"
import GenerateView from "@/components/acca/GenerateView"
import AccaOnboarding from "@/components/acca/AccaOnboarding"
import {
  getPaper,
  buildSession,
  gradeQuestion,
  recordAnswer,
  getPaperStats,
  getTodayStats,
  hasCuratedContent,
  recordMock,
  getMockHistory,
  type AccaPaper,
  type AccaQuestion,
} from "@/lib/acca"
import {
  getPlan,
  setPlan,
  daysUntilExam,
  getRecommendations,
  readinessBand,
  generateStudyPlan,
  currentPhase,
  todayMission,
  METHOD_PHASES,
  type Mission,
} from "@/lib/acca-plan"
import { paperLevels, getPassedPapers, getCurrentPaper, getStudyingPapers, qualificationProgress } from "@/lib/acca-qualification"
import { flashcardStats, getFlashcards } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getStudyPath, getTopicResult, recordTopicTest, pathProgress, TOPIC_PASS, TOPIC_TEST_SIZE, type TopicNode } from "@/lib/acca-topics"
import { getLatestDiagnostic, passBand } from "@/lib/acca-diagnostic"
import { syncAccaProgress, queueAccaProgressPush } from "@/lib/acca-cloud"

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

type Mode = "onboarding" | "picker" | "overview" | "topic" | "session" | "examiner" | "flashcards" | "generate" | "results"

const SESSION_SIZE = 8
const MOCK_SIZE = 12
const MOCK_SECONDS_PER_Q = 90
const ONBOARDED_KEY = "scholify-acca-onboarded"

function wasOnboarded(): boolean {
  try {
    return window.localStorage.getItem(ONBOARDED_KEY) === "1"
  } catch {
    return false
  }
}

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function AccaStudy() {
  const { toast } = useToast()
  const { user } = useAuth()
  const isPro = Boolean(user?.user_metadata?.plan && user.user_metadata.plan !== "free")
  const { showPaywall, paywallType, triggerFeaturePaywall, closePaywall } = usePaywall()

  const [paperId, setPaperId] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>(() => (wasOnboarded() ? "picker" : "onboarding"))
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

  // topic path (Kaplan-style chapter flow)
  const [topicArea, setTopicArea] = useState<string | null>(null)
  const [isTopicTest, setIsTopicTest] = useState(false)

  const paper = paperId ? getPaper(paperId) : undefined

  // Reconcile with the server-side learner record on load: if the cloud copy
  // is more complete (fresh device / cleared browser), hydrate local from it.
  useEffect(() => {
    let alive = true
    void syncAccaProgress().then((hydrated) => {
      if (hydrated && alive) setTick((t) => t + 1)
    })
    return () => {
      alive = false
    }
  }, [])

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

  // Record a mock / knowledge check the moment its results screen appears.
  useEffect(() => {
    if (mode === "results" && paperId && questions.length) {
      if (isTopicTest && topicArea) {
        recordTopicTest(paperId, topicArea, correctCount / questions.length)
      } else if (isMock) {
        recordMock(paperId, correctCount, questions.length)
      }
      queueAccaProgressPush()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  function openPaper(id: string) {
    setPaperId(id)
    setMode("overview")
  }

  function finishOnboarding(pid: string, examDate: string | null) {
    try {
      window.localStorage.setItem(ONBOARDED_KEY, "1")
    } catch {
      /* ignore */
    }
    if (examDate) setPlan(pid, { examDate })
    setPaperId(pid)
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
    setIsTopicTest(false)
    setTopicArea(null)
    setTimeLeft(mock ? qs.length * MOCK_SECONDS_PER_Q : 0)
    resetQuestion()
    setMode("session")
  }

  /** Topic flow: practise one syllabus area, or sit its knowledge check. */
  function startTopicSession(area: string, test: boolean) {
    if (!paperId) return
    const seed = (Date.now() % 100000) + 1
    const qs = buildSession(paperId, test ? TOPIC_TEST_SIZE : SESSION_SIZE, { area }, seed)
    if (qs.length === 0) {
      toast.info("No curated questions for this topic yet — try Custom practice.")
      return
    }
    setQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(test) // knowledge checks run under exam conditions: timed, no hints
    setIsTopicTest(test)
    setTopicArea(area)
    setTimeLeft(test ? qs.length * MOCK_SECONDS_PER_Q : 0)
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

  function openGenerate() {
    if (!isPro) {
      triggerFeaturePaywall()
      return
    }
    setMode("generate")
  }

  /** Start a practice session from an externally-supplied set (AI-generated). */
  function startCustomSession(qs: AccaQuestion[]) {
    setQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(false)
    setTimeLeft(0)
    resetQuestion()
    setMode("session")
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
    queueAccaProgressPush()
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
    queueAccaProgressPush()
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
    setMode(topicArea ? "topic" : "overview")
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 0 40px" }} key={tick}>
        <AnimatePresence mode="wait">
          {mode === "onboarding" && <AccaOnboarding key="onboarding" onDone={finishOnboarding} />}

          {mode === "picker" && <Picker key="picker" onPick={openPaper} />}

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
              onGenerate={openGenerate}
              onFlashcards={() => { setTopicArea(null); setMode("flashcards") }}
              onTopic={(area) => { setTopicArea(area); setIsTopicTest(false); setMode("topic") }}
            />
          )}

          {mode === "topic" && paper && topicArea && (
            <TopicView
              key={`topic-${topicArea}`}
              paper={paper}
              area={topicArea}
              onBack={() => { setTopicArea(null); setTick((t) => t + 1); setMode("overview") }}
              onLearn={() => startTopicSession(topicArea, false)}
              onTest={() => startTopicSession(topicArea, true)}
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
            <FlashcardsView
              key={`flashcards-${topicArea ?? "all"}`}
              paperId={paperId}
              area={topicArea ?? undefined}
              onBack={() => { setTick((t) => t + 1); setMode(topicArea ? "topic" : "overview") }}
            />
          )}

          {mode === "generate" && paperId && (
            <GenerateView key="generate" paperId={paperId} onBack={() => setMode("overview")} onReady={startCustomSession} />
          )}

          {mode === "results" && paper && (
            <Results
              key="results"
              paper={paper}
              correct={correctCount}
              total={questions.length}
              isMock={isMock}
              isTopicTest={isTopicTest}
              topicArea={topicArea}
              log={log}
              onAgain={() => (isTopicTest && topicArea ? startTopicSession(topicArea, true) : startSession(false, isMock))}
              onOverview={leaveSession}
            />
          )}
        </AnimatePresence>
      </div>

      <PaywallModal open={showPaywall} type={paywallType} onClose={closePaywall} />
    </DashboardLayout>
  )
}

/* ── Dashboard: journey bar + continue card ───────────────────── */

function JourneyBar() {
  const q = qualificationProgress()
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ ...card({ padding: 16, marginBottom: 12 }) }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontWeight: 750, fontSize: 13.5, color: TEXT }}>Journey to membership</span>
        <span style={{ fontSize: 12.5, color: MUTED }}>
          <b style={{ color: "#C80000" }}>{q.passedCount}</b> of {q.totalExams} exams · {q.percent}%
        </span>
      </div>
      <div style={{ height: 8, marginTop: 10, borderRadius: 999, background: "var(--sch-card-2)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(2, q.percent)}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ height: "100%", borderRadius: 999, background: IRIDESCENT }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: DIM }}>
        <span>Knowledge</span><span>Skills</span><span>Strategic Professional</span><span>ACCA ✓</span>
      </div>
    </motion.div>
  )
}

function ContinueCards({ onPick }: { onPick: (id: string) => void }) {
  const studying = getStudyingPapers().filter((id) => !getPassedPapers().includes(id))
  if (studying.length === 0) return null
  return (
    <>
      {studying.map((pid) => (
        <ContinueCard key={pid} pid={pid} onPick={onPick} />
      ))}
    </>
  )
}

function ContinueCard({ pid, onPick }: { pid: string; onPick: (id: string) => void }) {
  const current = pid
  const paper = getPaper(current)
  if (!paper) return null
  const mission = todayMission(current)
  const stats = getPaperStats(current)
  const days = daysUntilExam(current)
  return (
    <motion.button
      type="button"
      onClick={() => onPick(current)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      style={{ ...card({ padding: 18, marginBottom: 20, cursor: "pointer", textAlign: "left", width: "100%", border: "1px solid rgba(200,0,0,0.25)" }), display: "block" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: "#C80000" }}>CONTINUE · {paper.id}</span>
        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "rgba(200,0,0,0.08)", color: "#C80000" }}>
          {mission.phase.emoji} {mission.phase.label.toUpperCase()} PHASE
        </span>
        {days !== null && (
          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "var(--sch-card-2)", color: MUTED }}>
            {days === 0 ? "EXAM TODAY" : `${days} DAYS TO EXAM`}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 16.5, color: TEXT, lineHeight: 1.3 }}>{mission.title}</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>{mission.detail}</div>
        </div>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 20, ...iriText }}>{stats.readiness}%</div>
          <div style={{ color: DIM, fontSize: 10.5 }}>ready</div>
        </div>
        <span style={{ fontSize: 20, color: "#C80000", flexShrink: 0 }}>→</span>
      </div>
    </motion.button>
  )
}

/* ── Paper picker ─────────────────────────────────────────────── */

function TodayCard() {
  const t = getTodayStats()
  const currentPid = getCurrentPaper()
  const shieldTime = currentPid ? getPlan(currentPid).studyTime : null
  const r = 26
  const circ = 2 * Math.PI * r
  const dash = circ * t.progress
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ ...card({ padding: 16, marginBottom: 20 }), display: "flex", alignItems: "center", gap: 16 }}
    >
      {/* progress ring */}
      <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
        <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--sch-card-2)" strokeWidth="6" />
          <circle cx="32" cy="32" r={r} fill="none" stroke="#C80000" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
          {t.goalMet ? "✅" : "🎯"}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 750, fontSize: 15, color: TEXT }}>
          {t.goalMet ? "Daily goal complete!" : `${t.answered} / ${t.goal} questions today`}
        </div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>
          {t.goalMet ? "Come back tomorrow to keep the streak alive." : "Keep going to hit today's goal."}
        </div>
      </div>
      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 22 }}>🔥 {t.streak}</div>
        <div style={{ color: DIM, fontSize: 11 }}>day streak</div>
      </div>
      {shieldTime && (
        <div style={{ textAlign: "center", flexShrink: 0, paddingLeft: 12, borderLeft: `1px solid ${BORDER}` }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#C80000" }}>🛡️ {shieldTime}</div>
          <div style={{ color: DIM, fontSize: 11 }}>shield time</div>
        </div>
      )}
    </motion.div>
  )
}

/* ── Official ACCA news (curated from accaglobal.com) ─────────── */

const ACCA_NEWS: { date: string; title: string; url: string }[] = [
  {
    date: "26 Jun",
    title: "AFIAAR and ACCA form strategic partnership to strengthen accountancy quality across Africa",
    url: "https://www.accaglobal.com/gb/en/news/2026/June/AFIAAR-MoU.html",
  },
  {
    date: "24 Jun",
    title: "Keep opportunities in focus when reporting, new ACCA research urges business leaders",
    url: "https://www.accaglobal.com/gb/en/news/2026/June/reporting-opportunities.html",
  },
  {
    date: "15 Jun",
    title: "From number crunchers to storytellers: communication skills are becoming critical for finance professionals",
    url: "https://www.accaglobal.com/gb/en/news/2026/June/number-crunchers.html",
  },
  {
    date: "11 Jun",
    title: "ACCA partners with UNITAR to expand global capacity-building for sustainable development",
    url: "https://www.accaglobal.com/gb/en/news/2026/June/ACCA_UNITAR.html",
  },
  {
    date: "1 Jun",
    title: "ACCA strengthens strategic partnership with Uzbekistan",
    url: "https://www.accaglobal.com/gb/en/news/2026/June/partner_Uzbekistan.html",
  },
]

function AccaNews() {
  return (
    <div style={{ marginTop: 26 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
        <h3 style={{ ...sectionH, margin: 0 }}>OFFICIAL ACCA NEWS</h3>
        <span style={{ fontSize: 11, color: DIM }}>· accaglobal.com</span>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {ACCA_NEWS.map((n, i) => (
          <motion.a
            key={n.url}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            style={{
              ...card({ padding: "12px 14px", cursor: "pointer" }),
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              borderLeft: "3px solid #C80000",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, color: "#C80000", whiteSpace: "nowrap", flexShrink: 0, width: 44 }}>
              {n.date}
            </span>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: TEXT, lineHeight: 1.45 }}>{n.title}</span>
            <span aria-hidden style={{ color: DIM, fontSize: 14, flexShrink: 0 }}>↗</span>
          </motion.a>
        ))}
      </div>
      <p style={{ fontSize: 11, color: DIM, marginTop: 8 }}>
        Headlines link to ACCA's official newsroom. Scholify is independent and not affiliated with ACCA.
      </p>
    </div>
  )
}

function Picker({ onPick }: { onPick: (id: string) => void }) {
  const levels = paperLevels()
  const passed = new Set(getPassedPapers())
  const current = getCurrentPaper()
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <p style={{ color: DIM, fontSize: 13, fontWeight: 600, letterSpacing: 0.4, margin: "0 0 6px" }}>
        ACCA QUALIFICATION
      </p>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 6px", color: TEXT }}>
        Your <span style={iriText}>journey</span>
      </h1>
      <p style={{ color: MUTED, margin: "0 0 14px", fontSize: 15 }}>
        Everything you need to pass ACCA in one place — practice, AI tutor, mocks, AI examiner, custom questions, flashcards and a plan.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
        {["✏️ Practice", "✨ AI Tutor", "⏱️ Mocks", "📝 AI Examiner", "🧩 Custom AI", "🧠 Flashcards", "📅 Study plan"].map((t) => (
          <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 999, background: "var(--sch-card-2)", color: MUTED }}>{t}</span>
        ))}
      </div>

      <JourneyBar />
      <TodayCard />
      <ContinueCards onPick={onPick} />

      <div style={{ display: "grid", gap: 20 }}>
        {levels.map((g) => (
          <div key={g.key}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
              <h3 style={{ ...sectionH, margin: 0 }}>{g.label.toUpperCase()}</h3>
              {g.note && <span style={{ fontSize: 11, color: DIM }}>· {g.note}</span>}
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {g.papers.map((p) => {
                const stats = getPaperStats(p.id)
                const isPassed = passed.has(p.id)
                const isCurrent = current === p.id
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => onPick(p.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    style={{ ...card({ textAlign: "left", cursor: "pointer", padding: 14, border: `1px solid ${isCurrent ? "#C80000" : BORDER}` }), display: "flex", alignItems: "center", gap: 13 }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: isPassed ? "var(--sch-card-2)" : IRIDESCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: isPassed ? "#10B981" : "#fff", flexShrink: 0 }}>
                      {isPassed ? "✓" : p.id}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: 14.5, color: TEXT }}>{p.name}</span>
                        {isCurrent && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 999, background: "rgba(200,0,0,0.08)", color: "#C80000", fontWeight: 700 }}>STUDYING</span>}
                        {p.hasCuratedContent && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 999, background: "var(--sch-card-2)", color: MUTED, fontWeight: 700 }}>BANK</span>}
                      </div>
                      <div style={{ color: DIM, fontSize: 11.5, marginTop: 1 }}>{p.code}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      {isPassed ? (
                        <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>Passed</span>
                      ) : stats.answered > 0 ? (
                        <span style={{ fontSize: 14, fontWeight: 800, ...iriText }}>{stats.readiness}%</span>
                      ) : (
                        <span style={{ fontSize: 16, color: DIM }}>›</span>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <AccaNews />
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
  onGenerate,
  onFlashcards,
  onTopic,
}: {
  paper: AccaPaper
  isPro: boolean
  onBack: () => void
  onPractice: () => void
  onWeak: () => void
  onMock: () => void
  onExaminer: () => void
  onGenerate: () => void
  onFlashcards: () => void
  onTopic: (area: string) => void
}) {
  const navigate = useNavigate()
  const stats = getPaperStats(paper.id)
  const band = readinessBand(stats.readiness)
  const diagnostic = getLatestDiagnostic(paper.id)
  const hasHistory = stats.answered > 0
  const curated = hasCuratedContent(paper.id)
  const recs = getRecommendations(paper.id)
  const fcStats = flashcardStats(paper.id)
  const writtenCount = getWrittenQuestions(paper.id).length
  const [plan, setPlanState] = useState(() => getPlan(paper.id))
  const days = daysUntilExam(paper.id)
  const studyPlan = generateStudyPlan(paper.id)
  const mocks = getMockHistory(paper.id)
  const phase = currentPhase(paper.id)
  const mission = todayMission(paper.id)
  const missionHandlers: Record<Mission["action"], () => void> = {
    practice: onPractice,
    weak: onWeak,
    flashcards: onFlashcards,
    mock: onMock,
    examiner: onExaminer,
  }

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

      {/* pass-probability diagnostic — the headline number */}
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => navigate("/study/diagnostic")}
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 16px",
          marginBottom: 16,
          borderRadius: 14,
          cursor: "pointer",
          border: diagnostic ? `1px solid ${BORDER}` : "1px solid rgba(200,0,0,0.25)",
          background: diagnostic ? CARD : "linear-gradient(135deg, rgba(200,0,0,0.06), rgba(200,0,0,0.02))",
        }}
      >
        {diagnostic ? (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 12, background: "var(--sch-card-2)", flexShrink: 0 }}>
              <span style={{ fontSize: 19, fontWeight: 800, color: passBand(diagnostic.passProbability).color, lineHeight: 1 }}>{diagnostic.passProbability}%</span>
              <span style={{ fontSize: 8.5, fontWeight: 700, color: MUTED, marginTop: 2 }}>PASS</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 750, fontSize: 14.5, color: TEXT }}>{passBand(diagnostic.passProbability).label}</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>Est. score {diagnostic.estimatedScore}% · tap to retake the diagnostic</div>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 26, flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14.5, color: "#C80000" }}>What's your chance of passing?</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>Take the ~15-min diagnostic → pass probability + your weakest areas</div>
            </div>
          </>
        )}
        <span style={{ fontSize: 18, color: MUTED, flexShrink: 0 }}>→</span>
      </motion.button>

      {/* the method — where you are in the 4 phases */}
      <MethodTracker activeKey={phase.key} />

      {/* today's mission */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ ...card({ padding: 16, marginBottom: 20, border: "1px solid rgba(200,0,0,0.25)" }) }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: "#C80000" }}>
          {mission.phase.emoji} TODAY'S MISSION · {mission.phase.label.toUpperCase()} PHASE
        </div>
        <div style={{ fontWeight: 800, fontSize: 16, color: TEXT, marginTop: 6, lineHeight: 1.35 }}>{mission.title}</div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>{mission.detail}</div>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={missionHandlers[mission.action]}
          style={{ marginTop: 12, padding: "10px 22px", borderRadius: 999, border: "none", background: IRIDESCENT, color: "#fff", fontWeight: 750, fontSize: 13.5, cursor: "pointer" }}
        >
          Start the mission →
        </motion.button>
      </motion.div>

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

      {/* personalised plan */}
      {studyPlan.phases.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={sectionH}>YOUR PLAN{studyPlan.daysLeft ? ` · ${studyPlan.daysLeft} DAYS · ~${studyPlan.dailyTarget}/DAY` : ""}</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {studyPlan.phases.map((ph) => (
              <div key={ph.label} style={{ ...card({ padding: 14 }), display: "flex", gap: 12 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{ph.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>{ph.label}</span>
                    <span style={{ fontSize: 11.5, color: "#C80000", whiteSpace: "nowrap" }}>{ph.range}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>{ph.focus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* recommendations */}
      {recs.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={sectionH}>COACH'S NOTES</h3>
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

      {/* study rooms — grouped by what they're FOR in the method */}
      <h3 style={sectionH}>📚 LEARN & PRACTISE</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
        {curated ? (
          <>
            <ModeTile emoji="✏️" title={`Practice · ${SESSION_SIZE} questions`} sub="Instant marking, explanations & AI tutor" onClick={onPractice} primary={phase.key === "learn"} />
            {hasHistory && <ModeTile emoji="🎯" title="Target my weak areas" sub="Drill your lowest-scoring topics first" onClick={onWeak} primary={phase.key === "strengthen"} />}
          </>
        ) : (
          <>
            <ModeTile emoji="✨" title="Custom practice" sub="Lara writes exam-style questions on any topic — or from your notes" onClick={onGenerate} primary locked={!isPro} />
            <div style={{ ...card({ padding: 14 }), fontSize: 12.5, color: MUTED, lineHeight: 1.5 }}>
              📚 A curated question bank for {paper.id} is on the way. Meanwhile, Custom practice gives you unlimited AI-generated questions for this paper.
            </div>
          </>
        )}
      </div>

      <h3 style={sectionH}>🧠 STRENGTHEN & REVISE</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
        <ModeTile emoji="🧠" title="Flashcards" sub={fcStats.total ? `${fcStats.due} due · ${fcStats.mastered}/${fcStats.total} mastered` : "Coming soon"} onClick={onFlashcards} primary={phase.key === "revise" && fcStats.due > 0} />
        {curated && <ModeTile emoji="✨" title="Custom practice" sub="Generate questions from a topic or your own notes" onClick={onGenerate} locked={!isPro} />}
      </div>

      <h3 style={sectionH}>⏱️ EXAM ROOM</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {curated && <ModeTile emoji="⏱️" title="Mock exam" sub={`${MOCK_SIZE} questions, timed, no hints — pass line 50%`} onClick={onMock} locked={!isPro} primary={phase.key === "rehearse"} />}
        <ModeTile emoji="📝" title="AI Examiner" sub={writtenCount ? `Mark a written answer · ${writtenCount} questions` : "Written marking — coming soon"} onClick={onExaminer} locked={!isPro} />
      </div>

      {/* mock history */}
      {mocks.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={sectionH}>RECENT MOCKS</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {mocks.slice(0, 5).map((m, i) => (
              <div key={i} style={{ ...card({ padding: "12px 14px" }), display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18 }}>{m.percent >= 50 ? "✅" : "📈"}</span>
                <span style={{ flex: 1, fontSize: 13.5, color: TEXT }}>{m.date}</span>
                <span style={{ fontSize: 13, color: MUTED }}>{m.correct}/{m.total}</span>
                <span style={{ fontWeight: 800, fontSize: 15, color: m.percent >= 50 ? GREEN : RED, width: 48, textAlign: "right" }}>{m.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* the study path — topic by topic, Kaplan-style */}
      <StudyPathSection paperId={paper.id} curated={curated} onTopic={onTopic} />
    </motion.div>
  )
}

/* ── Study path (chapters → knowledge checks, like the tuition providers) ── */

function topicVisual(t: TopicNode): { emoji: string; ring: string; sub: string } {
  if (t.state === "mastered") return { emoji: "✅", ring: "#10B981", sub: `Mastered · best ${Math.round(t.best * 100)}%` }
  if (t.state === "in-progress") {
    return {
      emoji: "📖",
      ring: "#C80000",
      sub: t.best > 0
        ? `Best check ${Math.round(t.best * 100)}% · need ${Math.round(TOPIC_PASS * 100)}%`
        : t.seen > 0
          ? `${t.seen} answered · ${Math.round(t.accuracy * 100)}% accuracy`
          : "In progress",
    }
  }
  if (t.state === "available") return { emoji: "▶️", ring: "#C80000", sub: "Up next — start here" }
  return { emoji: "•", ring: "var(--sch-border)", sub: "Coming up" }
}

function StudyPathSection({ paperId, curated, onTopic }: { paperId: string; curated: boolean; onTopic: (area: string) => void }) {
  if (!curated) return null
  const path = getStudyPath(paperId)
  const prog = pathProgress(paperId)
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <h3 style={sectionH}>🗺️ STUDY PATH · TOPIC BY TOPIC</h3>
        <span style={{ fontSize: 12, color: MUTED }}>
          <b style={{ color: "#C80000" }}>{prog.mastered}</b>/{prog.total} mastered
        </span>
      </div>
      <p style={{ fontSize: 12.5, color: DIM, margin: "0 0 12px", lineHeight: 1.5 }}>
        Learn each topic, then pass its knowledge check ({Math.round(TOPIC_PASS * 100)}%+) to master it — the way the
        top tuition providers structure every paper. Master them all, then the full mock is a formality.
      </p>
      <div style={{ display: "grid", gap: 8 }}>
        {path.map((t, i) => {
          const v = topicVisual(t)
          const dim = t.state === "upcoming"
          return (
            <motion.button
              key={t.code}
              type="button"
              onClick={() => onTopic(t.code)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              style={{
                ...card({ padding: 14, cursor: "pointer", textAlign: "left" }),
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: dim ? 0.6 : 1,
                border: `1px solid ${t.state === "available" ? "rgba(200,0,0,0.35)" : BORDER}`,
              }}
            >
              <div
                style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
                  background: t.state === "mastered" ? "rgba(16,185,129,0.1)" : "var(--sch-card-2)",
                  border: `2px solid ${v.ring}`,
                }}
              >
                {t.state === "upcoming" ? <span style={{ fontWeight: 800, fontSize: 13, color: DIM }}>{t.code}</span> : v.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>
                  <span style={{ color: "#C80000", marginRight: 6 }}>{t.code}</span>
                  {t.label}
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 1 }}>{v.sub}</div>
              </div>
              <span style={{ fontSize: 16, color: DIM, flexShrink: 0 }}>›</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Topic hub: learn → flashcards → knowledge check ──────────── */

function TopicView({
  paper, area, onBack, onLearn, onTest, onFlashcards,
}: {
  paper: AccaPaper
  area: string
  onBack: () => void
  onLearn: () => void
  onTest: () => void
  onFlashcards: () => void
}) {
  const areaInfo = paper.areas.find((a) => a.code === area)
  const result = getTopicResult(paper.id, area)
  const stats = getPaperStats(paper.id)
  const areaStats = stats.areas.find((a) => a.code === area)
  const areaCards = getFlashcards(paper.id).filter((c) => c.area === area).length

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={backBtn}>← Study path</button>
      <p style={{ color: DIM, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, margin: "0 0 4px" }}>
        {paper.id} · TOPIC {area}
      </p>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px", color: TEXT, lineHeight: 1.25 }}>{areaInfo?.label ?? area}</h1>
      <p style={{ color: MUTED, margin: "0 0 16px", fontSize: 13.5, lineHeight: 1.55 }}>
        {result.mastered
          ? <>Mastered — best check {Math.round(result.best * 100)}%. Revisit anytime; mastery is kept warm by your flashcards.</>
          : <>Learn it, drill it, then pass the knowledge check ({Math.round(TOPIC_PASS * 100)}%+) to master this topic.</>}
      </p>

      {/* topic stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
        <Stat label="Answered" value={`${areaStats?.seen ?? 0}`} />
        <Stat label="Accuracy" value={areaStats?.seen ? `${Math.round((areaStats.accuracy) * 100)}%` : "—"} />
        <Stat label={result.mastered ? "Mastered" : "Best check"} value={result.attempts > 0 ? `${Math.round(result.best * 100)}%` : "—"} accent={result.mastered} />
      </div>

      {/* the topic loop */}
      <h3 style={sectionH}>1 · LEARN</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        <ModeTile emoji="📖" title={`Practise this topic · ${SESSION_SIZE} questions`} sub="Instant marking, explanations & Ask Lara — questions from this topic only" onClick={onLearn} primary={!result.mastered} />
      </div>

      <h3 style={sectionH}>2 · MEMORISE</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        <ModeTile emoji="🧠" title="Topic flashcards" sub={areaCards > 0 ? `${areaCards} card${areaCards === 1 ? "" : "s"} for this topic — swipe to review` : "No cards for this topic yet — practice still counts"} onClick={onFlashcards} />
      </div>

      <h3 style={sectionH}>3 · PROVE IT</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 8 }}>
        <ModeTile
          emoji="🎓"
          title={`Knowledge check · ${TOPIC_TEST_SIZE} questions, timed`}
          sub={`Exam conditions, no hints. Score ${Math.round(TOPIC_PASS * 100)}%+ to master the topic${result.attempts > 0 ? ` · ${result.attempts} attempt${result.attempts === 1 ? "" : "s"} so far` : ""}`}
          onClick={onTest}
          primary={result.mastered ? false : (areaStats?.seen ?? 0) >= 4}
        />
      </div>
      <p style={{ fontSize: 11.5, color: DIM, lineHeight: 1.5, margin: 0 }}>
        The tuition-provider loop: learn the chapter, check your knowledge, only then move on. Retakes are unlimited — the best score counts.
      </p>
    </motion.div>
  )
}

/** The four-phase method stepper — where the learner is on this paper. */
function MethodTracker({ activeKey }: { activeKey: string }) {
  const activeIdx = METHOD_PHASES.findIndex((p) => p.key === activeKey)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      style={{ ...card({ padding: "14px 16px", marginBottom: 12 }) }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: DIM, marginBottom: 10 }}>THE METHOD</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {METHOD_PHASES.map((p, i) => {
          const done = i < activeIdx
          const active = i === activeIdx
          return (
            <div key={p.key} style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}>
                <motion.div
                  animate={active ? { scale: [1, 1.12, 1] } : {}}
                  transition={{ duration: 2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                  style={{
                    width: 30, height: 30, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
                    background: done || active ? IRIDESCENT : "var(--sch-card-2)",
                    opacity: done ? 0.55 : 1,
                    boxShadow: active ? "0 4px 14px rgba(200,0,0,0.35)" : "none",
                  }}
                >
                  {done ? <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>✓</span> : <span>{p.emoji}</span>}
                </motion.div>
                <span style={{ fontSize: 10.5, fontWeight: active ? 800 : 600, color: active ? "#C80000" : done ? MUTED : DIM, whiteSpace: "nowrap" }}>
                  {p.label}
                </span>
              </div>
              {i < METHOD_PHASES.length - 1 && (
                <div style={{ height: 2, flexShrink: 0, width: 14, borderRadius: 1, background: i < activeIdx ? "#C80000" : "var(--sch-card-2)", marginBottom: 16 }} />
              )}
            </div>
          )
        })}
      </div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 10, lineHeight: 1.5 }}>
        {METHOD_PHASES[Math.max(0, activeIdx)].goal}
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
          {title} {locked && <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 999, background: "rgba(200,0,0,0.08)", color: "#C80000", fontWeight: 700 }}>PRO</span>}
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
              else if (isChosen) { bd = "#C80000" }
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
  paper, correct, total, isMock, isTopicTest, topicArea, log, onAgain, onOverview,
}: {
  paper: AccaPaper
  correct: number
  total: number
  isMock: boolean
  isTopicTest?: boolean
  topicArea?: string | null
  log: { area: string; correct: boolean }[]
  onAgain: () => void
  onOverview: () => void
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const passLine = isTopicTest ? Math.round(TOPIC_PASS * 100) : 50
  const passed = pct >= passLine
  const topicLabel = isTopicTest && topicArea ? paper.areas.find((a) => a.code === topicArea)?.label ?? topicArea : null

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
      <div style={{ fontSize: 13, color: DIM, letterSpacing: 0.4, fontWeight: 600 }}>
        {isTopicTest ? `KNOWLEDGE CHECK · TOPIC ${topicArea}` : isMock ? "MOCK EXAM RESULT" : "PRACTICE COMPLETE"}
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: "4px 0", color: TEXT }}>
        <span style={iriText}>{correct}</span> / {total} correct
      </h1>
      <p style={{ color: MUTED, margin: "0 0 24px", fontSize: 15 }}>
        {isTopicTest
          ? passed
            ? `${pct}% — topic mastered! ${topicLabel} is locked in. On to the next one.`
            : `${pct}% — not there yet. You need ${passLine}% to master ${topicLabel}. Practise it once more, then retake.`
          : passed
            ? `That's a ${pct}% pass on ${paper.name}.`
            : `${pct}% this round. Keep going — repetition is how the marks come.`}
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
