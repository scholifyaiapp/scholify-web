import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { isProUser } from "@/lib/entitlement"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { usePaywall } from "@/hooks/usePaywall"
import { usePaperContent } from "@/hooks/usePaperContent"
import { PaperContentSkeleton, PaperContentError } from "@/components/acca/PaperContentGate"
import PaywallModal from "@/components/PaywallModal"
import TutorPanel from "@/components/acca/TutorPanel"
import ExaminerView from "@/components/acca/ExaminerView"
import CbeMockRunner from "@/components/acca/CbeMockRunner"
import CbeToolsDock, { CbeBlueprintCard } from "@/components/acca/CbeTools"
import { constructedSectionLabel, examBlueprint } from "@/lib/acca-exam-structure"
import FlashcardsView from "@/components/acca/FlashcardsView"
import GenerateView from "@/components/acca/GenerateView"
import ExamDayFlow from "@/components/acca/ExamDayFlow"
import JourneyMap from "@/components/acca/JourneyMap"
import PostMortemPanel from "@/components/acca/PostMortemPanel"
import { getQuestions,
  getPaper,
  buildSession,
  buildAdaptiveSession,
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
} from "@/lib/acca-plan"
import { paperLevels, getPassedPapers, getCurrentPaper, getStudyingPapers, qualificationProgress } from "@/lib/acca-qualification"
import { flashcardStats, getFlashcards } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getStudyPath, getTopicResult, recordTopicTest, pathProgress, TOPIC_PASS, TOPIC_TEST_SIZE, type TopicNode } from "@/lib/acca-topics"
import { getLatestDiagnostic, estimateFromPractice, passBand } from "@/lib/acca-diagnostic"
import { syncAccaProgress, queueAccaProgressPush } from "@/lib/acca-cloud"
import { trackEvent } from "@/lib/analytics"
import { buildTodayPlan, greeting, todayHeadline, MISSION_MINUTES, type TodayAction } from "@/lib/acca-today"
import { recordDayActive } from "@/lib/acca-schedule"
import { getStudyChapter } from "@/lib/acca-study-content"
import { StudyChapterReader } from "@/components/acca/StudyChapterReader"
import { TaxBasisNote } from "@/components/acca/TaxBasisNote"
import { mockGate, MOCK_GATE, MOCK_PASS, mockProgress, MOCKS_REQUIRED, examDayDue, currentStage, recoveryState, getJourneyStages, passProbability } from "@/lib/acca-loop"
import { recordAnswerTiming, recordConfidence, recordMistake, snapshotProbability, MISTAKE_LABELS, type MistakeTag } from "@/lib/acca-analytics"
import { isAccaOnboarded } from "@/lib/acca-profile"
import { getTopicBrief } from "@/lib/acca-briefs"
import { BANK_RUN_SIZE, BANK_RUN_SECONDS_PER_Q, BANK_RUNS_TARGET, recordBankRun, bankRunProgress } from "@/lib/acca-bankruns"
import { officialResources } from "@/lib/acca-resources"
import { nextMockForm } from "@/lib/acca-mockforms"
import { withShuffledOptions } from "@/lib/acca-options"
import type { PostMortemAction } from "@/lib/acca-ai"
import { Icon, IconBadge, Badge, Button, SectionHead, C, SP, R, SHADOW, GRAD, type IconName } from "@/components/acca/ui"
import { RingGauge, BreakdownList, TrendBars, MeterBar, StatCard, bandColor } from "@/components/acca/charts"

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

type Mode = "onboarding" | "picker" | "overview" | "topic" | "brief" | "session" | "cbemock" | "examiner" | "flashcards" | "generate" | "results" | "journey"

const SESSION_SIZE = 8
const LEARN_SIZE = 5 // the guided first questions after a Topic Brief
// Topic knowledge checks run under the clock at exam OT pacing. (The mock
// itself is the sectioned CBE now — see CbeMockRunner, which prices its one
// exam clock at the official minutes-per-mark.)
const MOCK_SECONDS_PER_Q = 90
// Single source of truth for the onboarding flag (shared with Dashboard).
const wasOnboarded = isAccaOnboarded

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function AccaStudy() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isPro = isProUser(user)
  const { showPaywall, paywallType, triggerFeaturePaywall, closePaywall } = usePaywall()

  // Land where the loop is: the current paper's overview. The picker stays
  // one tap away ("← All papers"); new users go to the /welcome flow.
  const [paperId, setPaperId] = useState<string | null>(() => (wasOnboarded() ? getCurrentPaper() : null))
  const [mode, setMode] = useState<Mode>(() =>
    wasOnboarded() ? (getCurrentPaper() ? "overview" : "picker") : "onboarding",
  )

  /*
   * The ACTIVE paper's content (questions, chapters, cards, written, briefs) is
   * fetched on demand — a student downloads their own paper, not all fifteen.
   * Every synchronous getter below (getQuestions, buildSession, getStudyChapter,
   * getFlashcards, getTopicBrief …) reads the loaded paper, so this one await is
   * the only change the study surfaces needed. The PICKER needs no content: it
   * renders from paper metadata + the eager bank-size counts.
   */
  const content = usePaperContent(paperId)

  // The onboarding experience lives at /welcome (full-screen flow).
  useEffect(() => {
    if (!wasOnboarded()) navigate("/welcome", { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [tick, setTick] = useState(0) // force stats refresh after a session

  // session state
  const [questions, setQuestions] = useState<AccaQuestion[]>([])

  /* Every question enters the session de-biased: options deterministically
   * shuffled, `correct` remapped. Render and grading both use these clones, so
   * "always pick A" stops paying. */
  function loadQuestions(qs: AccaQuestion[]) {
    setQuestions(qs.map((q) => withShuffledOptions(q)))
  }
  const [idx, setIdx] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [numInput, setNumInput] = useState("")
  const [graded, setGraded] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [log, setLog] = useState<{ area: string; correct: boolean }[]>([])
  const [isMock, setIsMock] = useState(false)
  const [isBankRun, setIsBankRun] = useState(false)
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

  // Paddle checkout lands back on /study?upgraded=true. The webhook writes
  // the plan onto the user server-side, so refresh the session (with a
  // couple of retries — the webhook can lag the redirect by a few seconds)
  // until the entitlement shows up.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("upgraded") !== "true") return
    window.history.replaceState({}, "", window.location.pathname)
    trackEvent("subscription_activated")
    toast.success("Payment received — welcome aboard! Unlocking Pro…")
    if (!isSupabaseConfigured) return
    let cancelled = false
    const attempt = async (retriesLeft: number) => {
      try {
        const { data } = await supabase.auth.refreshSession()
        const plan = data.session?.user?.app_metadata?.plan
        if (plan && plan !== "free") return
      } catch {
        /* transient — retry below */
      }
      if (!cancelled && retriesLeft > 0) setTimeout(() => void attempt(retriesLeft - 1), 4000)
    }
    void attempt(4)
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Deep links: /study?do=weak|practice|mock|flashcards|diagnostic — the
  // Dashboard/Analytics "Start now" buttons land INSIDE the task, not on a
  // picker. The loop hands the student the next best action in one tap.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const action = params.get("do") as TodayAction | null
    const linkArea = params.get("area")
    if (!action) return
    window.history.replaceState({}, "", window.location.pathname)
    if (!wasOnboarded()) return
    if (action === "diagnostic") {
      navigate("/study/diagnostic")
      return
    }
    if (!paperId) return
    if (action === "weak") startSession(true, false)
    else if (action === "practice") startSession(false, false)
    else if (action === "mock") startSession(false, true)
    else if (action === "flashcards") setMode("flashcards")
    else if (action === "bank") startBankRun()
    else if (action === "essentials") startEssentials(linkArea)
    else if (action === "study" && linkArea) {
      setTopicArea(linkArea)
      setIsTopicTest(false)
      setMode("brief")
    }
    // action === "study" without an area falls through → the study hub
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // mock countdown
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (mode === "session" && (isMock || isBankRun)) {
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
  }, [mode, isMock, isBankRun])

  // Record a mock / knowledge check the moment its results screen appears.
  useEffect(() => {
    if (mode === "results" && paperId && questions.length) {
      if (isTopicTest && topicArea) {
        recordTopicTest(paperId, topicArea, correctCount / questions.length)
      } else if (isBankRun) {
        recordBankRun(paperId, correctCount, questions.length)
        if (timeLeft === 0 && log.length < questions.length) {
          recordMistake(paperId, "time", questions.length - log.length)
        }
      } else if (isMock) {
        recordMock(paperId, correctCount, questions.length)
        // Questions the clock took are lost-to-time marks, not knowledge gaps.
        if (timeLeft === 0 && log.length < questions.length) {
          recordMistake(paperId, "time", questions.length - log.length)
        }
      }
      // The engagement signal — the north-star is a learner completing a
      // model-assigned session. Mode + score make the funnel and retention
      // insights specific.
      trackEvent("session_completed", {
        paper: paperId,
        mode: isTopicTest ? "topic" : isBankRun ? "bank_run" : isMock ? "mock" : "practice",
        questions: questions.length,
        correct: correctCount,
        scorePct: questions.length ? Math.round((correctCount / questions.length) * 100) : 0,
      })
      // Every finished session updates the learner model — snapshot it for
      // the Pass Momentum trend.
      snapshotProbability(paperId)
      queueAccaProgressPush()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  function openPaper(id: string) {
    setPaperId(id)
    setMode("overview")
  }

  function startSession(weakFirst = false, mock = false) {
    if (!paperId) return
    if (mock) {
      // The loop's gate (MOCK_GATE = 60%): mocks stay locked until the learner's pass
      // probability has earned them (see acca-loop.ts).
      const gate = mockGate(paperId)
      if (!gate.unlocked) {
        toast.info(`The mock room unlocks at ${MOCK_GATE}% pass probability — you're at ${gate.prob}%. Today's plan is aimed at getting you there.`)
        return
      }
      if (!isPro) {
        triggerFeaturePaywall()
        return
      }
      // The mock IS the sectioned CBE now — the full exam shape (A → B → C),
      // one clock, navigator, Lara marking constructed answers into the score.
      setMode("cbemock")
      return
    }
    const seed = (Date.now() % 100000) + 1
    const size = SESSION_SIZE
    // "Target my weak areas" uses the adaptive engine (weak areas + matched
    // difficulty + spaced reinforcement); plain practice stays a fresh shuffle.
    const qs = weakFirst ? buildAdaptiveSession(paperId, size, seed) : buildSession(paperId, size, { weakFirst }, seed)
    if (qs.length === 0) {
      toast.info("No questions available yet for this paper.")
      return
    }
    loadQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(false)
    setIsBankRun(false)
    setIsTopicTest(false)
    setTopicArea(null)
    setTimeLeft(0)
    resetQuestion()
    setMode("session")
  }

  /** Category 2 — the five essential questions on today's studied topic. */
  function startEssentials(area?: string | null) {
    if (!paperId) return
    const target =
      area ??
      buildTodayPlan(paperId).find((t) => t.action === "essentials")?.area ??
      getPaper(paperId)?.areas[0]?.code
    if (!target) return
    startTopicSession(target, false, LEARN_SIZE)
  }

  /** Topic flow: practise one syllabus area, or sit its knowledge check. */
  function startTopicSession(area: string, test: boolean, size = SESSION_SIZE) {
    if (!paperId) return
    const seed = (Date.now() % 100000) + 1
    const qs = buildSession(paperId, test ? TOPIC_TEST_SIZE : size, { area }, seed)
    if (qs.length === 0) {
      toast.info("No curated questions for this topic yet — try Custom practice.")
      return
    }
    loadQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(test) // knowledge checks run under exam conditions: timed, no hints
    setIsBankRun(false)
    setIsTopicTest(test)
    setTopicArea(area)
    setTimeLeft(test ? qs.length * MOCK_SECONDS_PER_Q : 0)
    resetQuestion()
    setMode("session")
  }

  /** Bank Run — 50 whole-paper questions under the clock (75 min). Free,
   * pre-gate: the bridge from Learn to the Mock room. */
  function startBankRun() {
    if (!paperId) return
    const seed = (Date.now() % 100000) + 1
    const qs = buildSession(paperId, BANK_RUN_SIZE, {}, seed)
    if (qs.length < 10) {
      toast.info("Not enough questions in this paper's bank yet for a bank run.")
      return
    }
    loadQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(false)
    setIsBankRun(true)
    setIsTopicTest(false)
    setTopicArea(null)
    setTimeLeft(qs.length * BANK_RUN_SECONDS_PER_Q)
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
    loadQuestions(qs)
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
    recordDayActive(q.paper)
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
    recordDayActive(q.paper)
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

  /** Jump into a practice mode from a post-mortem / reflection plan step. */
  function runLoopAction(a: PostMortemAction) {
    if (a === "weak") startSession(true, false)
    else if (a === "practice") startSession(false, false)
    else if (a === "mock") startSession(false, true)
    else {
      setTopicArea(null)
      setMode("flashcards")
    }
  }

  // Hold every paper-scoped surface until that paper's content chunk has landed.
  // Skeleton, never a blank screen; a failed chunk offers a retry.
  if (paperId && !content.ready) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 0 40px" }}>
          <AnimatePresence mode="wait">
            {content.error ? (
              <PaperContentError key="content-error" paperId={paperId} onRetry={content.retry} />
            ) : (
              <PaperContentSkeleton key="content-loading" paperId={paperId} />
            )}
          </AnimatePresence>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 0 40px" }} key={tick}>
        <AnimatePresence mode="wait">
          {mode === "picker" && <Picker key="picker" onPick={openPaper} />}

          {mode === "overview" && paper && (
            <Overview
              key="overview"
              paper={paper}
              isPro={isPro}
              onBack={() => { setPaperId(null); setMode("picker") }}
              onPractice={() => startSession(false, false)}
              onBankRun={startBankRun}
              onWeak={() => startSession(true, false)}
              onMock={() => startSession(false, true)}
              onExaminer={openExaminer}
              onGenerate={openGenerate}
              onFlashcards={() => { setTopicArea(null); setMode("flashcards") }}
              onTopic={(area) => { setTopicArea(area); setIsTopicTest(false); setMode("topic") }}
              onStudyTopic={(area) => { setTopicArea(area); setIsTopicTest(false); setMode("brief") }}
              onEssentials={startEssentials}
              onJourney={() => setMode("journey")}
              onLoopAction={runLoopAction}
              onRefresh={() => setTick((t) => t + 1)}
              onSwitchPaper={(pid) => { setPaperId(pid); setTick((t) => t + 1); setMode("overview") }}
            />
          )}

          {mode === "journey" && paperId && (
            <JourneyMap key="journey" paperId={paperId} onBack={() => setMode("overview")} />
          )}

          {mode === "brief" && paper && topicArea && (
            getStudyChapter(paper.id, topicArea) ? (
              <StudyChapterReader
                key={`chapter-${topicArea}`}
                chapter={getStudyChapter(paper.id, topicArea)!}
                onBack={() => setMode("topic")}
                onPractice={() => startTopicSession(topicArea, false, LEARN_SIZE)}
              />
            ) : (
              <BriefReader
                key={`brief-${topicArea}`}
                paper={paper}
                area={topicArea}
                onBack={() => setMode("topic")}
                onLearn={() => startTopicSession(topicArea, false, LEARN_SIZE)}
              />
            )
          )}

          {mode === "topic" && paper && topicArea && (
            <TopicView
              key={`topic-${topicArea}`}
              paper={paper}
              area={topicArea}
              onBack={() => { setTopicArea(null); setTick((t) => t + 1); setMode("overview") }}
              onBrief={() => setMode("brief")}
              onLearn={() => startTopicSession(topicArea, false, LEARN_SIZE)}
              onDrill={() => startTopicSession(topicArea, false)}
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
              isMock={isMock || isBankRun}
              timeLeft={timeLeft}
              onChoice={setChoice}
              onNum={setNumInput}
              onSubmit={submit}
              onNext={advance}
              onMockNext={mockNext}
              onQuit={leaveSession}
            />
          )}

          {mode === "cbemock" && paperId && (
            <CbeMockRunner key="cbemock" paperId={paperId} onBack={() => { setTick((t) => t + 1); setMode("overview") }} />
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
              isBankRun={isBankRun}
              isTopicTest={isTopicTest}
              topicArea={topicArea}
              log={log}
              onAgain={() => (isTopicTest && topicArea ? startTopicSession(topicArea, true) : isBankRun ? startBankRun() : startSession(false, isMock))}
              onOverview={leaveSession}
              onAction={runLoopAction}
            />
          )}
        </AnimatePresence>
      </div>

      {/* The CBE toolbelt — calculator, formulae sheet, quick notes — at the
          learner's elbow wherever they answer or study. The constructed-
          response studio mounts its own (with question-area context). */}
      {(mode === "session" || mode === "topic" || mode === "brief") && paperId && (
        <CbeToolsDock
          paperId={paperId}
          area={mode === "session" ? (questions[idx]?.area ?? topicArea) : topicArea}
          context={mode === "session" ? (isMock ? "mock" : "practice") : "study"}
        />
      )}

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
          {mission.phase.label.toUpperCase()} PHASE
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
          {/* same canonical number as Dashboard/Analytics/Overview */}
          <div style={{ fontWeight: 800, fontSize: 20, ...iriText }}>{passProbability(current) ?? stats.readiness}%</div>
          <div style={{ color: DIM, fontSize: 10.5 }}>{passProbability(current) !== null ? "to pass" : "ready"}</div>
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
  const studyTime = currentPid ? getPlan(currentPid).studyTime : null
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
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <Icon name={t.goalMet ? "done" : "diagnostic"} size={20} color="#C80000" />
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
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 800, fontSize: 22, color: TEXT }}>
          <Icon name="streak" size={18} color="#C80000" /> {t.streak}
        </div>
        <div style={{ color: DIM, fontSize: 11 }}>day streak</div>
      </div>
      {studyTime && (
        <div style={{ textAlign: "center", flexShrink: 0, paddingLeft: 12, borderLeft: `1px solid ${BORDER}` }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 800, fontSize: 15, color: "#C80000" }}>
            <Icon name="time" size={15} color="#C80000" /> {studyTime}
          </div>
          <div style={{ color: DIM, fontSize: 11 }}>study time</div>
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
        {([
          ["practice", "Practice"], ["tutor", "AI Tutor"], ["mock", "Mocks"], ["examiner", "AI Examiner"],
          ["generate", "Custom AI"], ["flashcards", "Flashcards"], ["calendar", "Study plan"],
        ] as [IconName, string][]).map(([ic, t]) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 999, background: "var(--sch-card-2)", color: MUTED }}>
            <Icon name={ic} size={13} color={C.soft} /> {t}
          </span>
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
  onBankRun,
  onWeak,
  onMock,
  onExaminer,
  onGenerate,
  onFlashcards,
  onTopic,
  onStudyTopic,
  onEssentials,
  onJourney,
  onLoopAction,
  onRefresh,
  onSwitchPaper,
}: {
  paper: AccaPaper
  isPro: boolean
  onBack: () => void
  onPractice: () => void
  onBankRun: () => void
  onWeak: () => void
  onMock: () => void
  onExaminer: () => void
  onGenerate: () => void
  onFlashcards: () => void
  onTopic: (area: string) => void
  onStudyTopic: (area: string) => void
  onEssentials: (area?: string | null) => void
  onJourney: () => void
  onLoopAction: (a: PostMortemAction) => void
  onRefresh: () => void
  onSwitchPaper: (pid: string) => void
}) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const firstName = (user?.user_metadata?.first_name as string) || ""
  const stats = getPaperStats(paper.id)
  const diagnostic = getLatestDiagnostic(paper.id)
  const live = estimateFromPractice(paper.id)
  // THE pass-probability read — same source as Dashboard/Analytics/Journey,
  // including the real-exam recalibration during a recovery run.
  const prob = passProbability(paper.id)
  const band = prob !== null ? passBand(prob) : readinessBand(stats.readiness)
  const readinessValue = prob !== null ? `${prob}%` : `${stats.readiness}%`
  // The diagnostic CTA anchors on a formal diagnostic if taken, else the live read.
  const passShown = diagnostic ?? live
  const passIsLive = !diagnostic && !!live
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
  // The journey loop: the 60% gate on the exam room + the exam-day decision point.
  const gate = mockGate(paper.id)
  const examDue = examDayDue(paper.id)
  const stage = currentStage(paper.id)
  const recovery = recoveryState(paper.id)
  // AI Study OS: today's auto-generated plan — the student never has to choose.
  const todayPlan = buildTodayPlan(paper.id)
  // Task → surface. Study opens the CHAPTER (the main content), essentials the
  // 5-question guided set — both carry the plan's area so the tap lands exactly
  // on today's topic.
  function runToday(t: (typeof todayPlan)[number]) {
    if (t.action === "diagnostic") navigate("/study/diagnostic")
    else if (t.action === "weak") onWeak()
    else if (t.action === "practice") onPractice()
    else if (t.action === "essentials") onEssentials(t.area)
    else if (t.action === "flashcards") onFlashcards()
    else if (t.action === "mock") onMock()
    else if (t.action === "study") (t.area ? onStudyTopic(t.area) : onPractice())
    else if (t.action === "bank") onBankRun()
  }
  const todayIcons: Record<TodayAction, IconName> = {
    diagnostic: "diagnostic", weak: "weak", practice: "practice", essentials: "mission", flashcards: "flashcards", mock: "mock", study: "study", bank: "practice",
  }

  // Keep the Pass Momentum trend fed even on read-only visits.
  useEffect(() => {
    snapshotProbability(paper.id)
  }, [paper.id])

  function updateExamDate(date: string) {
    setPlanState(setPlan(paper.id, { examDate: date || null }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={backBtn}>← All papers</button>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 2px", color: TEXT }}>{paper.name}</h1>
      <p style={{ color: DIM, margin: "0 0 14px", fontSize: 13 }}>{paper.code} · {paper.level}</p>

      {/* Tax papers state their Finance Act basis honestly (TX/ATX only) */}
      <TaxBasisNote paperId={paper.id} />

      {/* You are here — the loop as a compact strip (the GPS) */}
      <LoopStrip paperId={paper.id} onJourney={onJourney} />

      {/* Exam day — the loop's decision point: celebrate or reflect */}
      {examDue && (
        <ExamDayFlow paperId={paper.id} onDone={onRefresh} onStartPaper={onSwitchPaper} onAction={onLoopAction} />
      )}

      {/* Retake run — the recovery loop stays visible until the paper is won */}
      {!examDue && recovery.active && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          onClick={onJourney}
          style={{
            ...card({ padding: "14px 16px", marginBottom: 16, cursor: "pointer" }),
            display: "flex",
            alignItems: "center",
            gap: 13,
            width: "100%",
            textAlign: "left",
            borderLeft: `3px solid ${C.amber}`,
          }}
        >
          <IconBadge name="reflect" tone="amber" size={42} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: TEXT, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              Retake run — {paper.id}
              {recovery.provenAgain && <Badge tone="green">PROVEN AGAIN</Badge>}
            </div>
            <div style={{ fontSize: 12.5, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>
              {recovery.provenAgain
                ? `Fresh mock passed — hold it warm until the retake${days != null ? ` in ${days} days` : ""}.`
                : `You know exactly where the marks were lost — ${recovery.answeredSince > 0 ? `${recovery.answeredSince} answers into recovering them` : "today's plan starts recovering them"}. Then a fresh mock, then the retake${days != null ? ` in ${days} days` : ""}.`}
            </div>
          </div>
          <Icon name="chevron" size={17} color={DIM} style={{ flexShrink: 0 }} />
        </motion.button>
      )}

      {/* AI Study OS — your plan for today */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ ...card({ padding: 18, marginBottom: 16 }), background: "linear-gradient(135deg, rgba(200,0,0,0.05), var(--sch-card))" }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: TEXT }}>{greeting(firstName)}</div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>{todayHeadline(paper.id)}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 7, margin: "16px 0 8px" }}>
          <Icon name="mission" size={14} color="#C80000" strokeWidth={2.4} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: "#C80000" }}>TODAY'S PLAN · THE PLAN ALREADY CHOSE FOR YOU</span>
          <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 750, color: DIM }}>
            {(() => {
              const t = getTodayStats()
              return t.goalMet ? "goal met" : t.answered > 0 ? `${t.answered}/${t.goal} today` : `0 of ${todayPlan.length} done`
            })()}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {todayPlan.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => runToday(t)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: 12,
                cursor: "pointer",
                border: `1px solid ${i === 0 ? "rgba(200,0,0,0.3)" : BORDER}`,
                background: i === 0 ? "rgba(200,0,0,0.05)" : "var(--sch-bg)",
              }}
            >
              <IconBadge name={todayIcons[t.action]} tone={i === 0 ? "brand" : "neutral"} size={38} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: TEXT }}>
                  {["①", "②", "③", "④", "⑤"][i] ?? ""} {t.title}
                </span>
                <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 1 }}>
                  {t.detail} · ~{MISSION_MINUTES[t.action]} min
                </span>
              </span>
              {i === 0 && (
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", background: IRIDESCENT, padding: "4px 10px", borderRadius: 999, flexShrink: 0 }}>
                  START
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* readiness — live pass probability once there's practice, else coverage-based */}
      <SectionHead
        icon="stats"
        right={
          <button onClick={() => navigate("/study/analytics")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 750, color: "#C80000", display: "inline-flex", alignItems: "center", gap: 4, padding: 0, textTransform: "none", letterSpacing: 0 }}>
            Full analytics <Icon name="arrow" size={12} color="#C80000" />
          </button>
        }
      >
        Progress check
      </SectionHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 16 }}>
        <StatCard
          index={0}
          icon="diagnostic"
          label={band.label}
          value={readinessValue}
          footnote={live ? "live from your practice" : hasHistory ? "readiness from coverage" : "start practising to measure"}
        />
        <StatCard
          index={1}
          icon="done"
          label="Accuracy"
          value={hasHistory ? Math.round(stats.accuracy * 100) : "—"}
          suffix={hasHistory ? "%" : undefined}
          footnote={hasHistory ? `${stats.correct} of ${stats.answered} correct` : undefined}
        />
        <StatCard
          index={2}
          icon="practice"
          label="Answered"
          value={stats.answered}
          footnote={`${Math.round(stats.coverage * 100)}% of the bank seen`}
        />
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
          border: passShown ? `1px solid ${BORDER}` : "1px solid rgba(200,0,0,0.25)",
          background: passShown ? CARD : "linear-gradient(135deg, rgba(200,0,0,0.06), rgba(200,0,0,0.02))",
        }}
      >
        {passShown ? (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 12, background: "var(--sch-card-2)", flexShrink: 0 }}>
              <span style={{ fontSize: 19, fontWeight: 800, color: passBand(passShown.passProbability).color, lineHeight: 1 }}>{passShown.passProbability}%</span>
              <span style={{ fontSize: 8.5, fontWeight: 700, color: MUTED, marginTop: 2 }}>PASS</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 750, fontSize: 14.5, color: TEXT }}>{passBand(passShown.passProbability).label}</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>
                {passIsLive
                  ? "Live estimate from practice · tap for the full diagnostic"
                  : `Est. score ${passShown.estimatedScore}% · tap to retake the diagnostic`}
              </div>
            </div>
          </>
        ) : (
          <>
            <IconBadge name="diagnostic" tone="brand" size={44} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14.5, color: "#C80000" }}>What's your chance of passing?</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>Take the ~15-min diagnostic → pass probability + your weakest areas</div>
            </div>
          </>
        )}
        <Icon name="arrow" size={17} color={MUTED} />
      </motion.button>

      {/* the method — where you are in the 4 phases */}
      <MethodTracker activeKey={phase.key} />

      {/* the journey loop — where you are in the whole arc of this paper */}
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        onClick={onJourney}
        style={{ ...card({ padding: "13px 16px", marginBottom: 12, cursor: "pointer" }), display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left" }}
      >
        <IconBadge name="loop" tone="brand" size={38} />
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontWeight: 750, fontSize: 13.5, color: TEXT }}>The journey loop</span>
          <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 1 }}>
            You are here: <b style={{ color: "#C80000" }}>{stage.label}</b>
          </span>
        </span>
        <Icon name="chevron" size={16} color={C.faint} />
      </motion.button>

      {/* study plan */}
      <div style={card({ marginBottom: 16 })}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 700, fontSize: 14, color: TEXT }}><Icon name="calendar" size={16} color={C.brand} /> Exam date</div>
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
                <IconBadge name={PHASE_ICON[ph.label.toLowerCase()] ?? "learn"} tone="brand" size={36} />
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

      {/* ── THE STUDY CATEGORIES — the founder's five, in daily order, each
             proportioned from the onboarding answers (today's plan carries the
             exact minutes; the chips repeat them here so the weighting is
             visible, not implied). ─────────────────────────────────────── */}
      {(() => {
        const minutesFor = (ids: string[]) => {
          const m = todayPlan.filter((t) => ids.includes(t.action)).reduce((a, t) => a + MISSION_MINUTES[t.action], 0)
          return m > 0 ? `~${m} min today` : undefined
        }
        const studyTask = todayPlan.find((t) => t.action === "study")
        const essTask = todayPlan.find((t) => t.action === "essentials")
        const minChip = (label?: string) =>
          label ? <span style={{ fontSize: 11, fontWeight: 750, color: DIM, textTransform: "none", letterSpacing: 0 }}>{label}</span> : undefined
        return (
          <>
            {/* 1 · Topic learning — the main content */}
            <SectionHead icon="learn" right={minChip(minutesFor(["study"]))}>1 · Topic learning</SectionHead>
            <div style={{ display: "grid", gap: 10, marginBottom: 6 }}>
              {studyTask?.area ? (
                <ModeTile
                  icon="study"
                  title={`Continue: ${studyTask.area} · ${paper.areas.find((a) => a.code === studyTask.area)?.label ?? "next topic"}`}
                  sub="Today's chapter — concept, formulas, worked example, the classic traps"
                  onClick={() => onStudyTopic(studyTask.area!)}
                  primary={phase.key === "learn"}
                />
              ) : (
                <ModeTile icon="study" title="Continue the study path" sub="Pick up the next topic below" onClick={() => onTopic(paper.areas[0].code)} />
              )}
            </div>
            {/* the full path — topic by topic, Kaplan-style (the main content lives here) */}
            <StudyPathSection paperId={paper.id} curated={curated} onTopic={onTopic} />

            {/* 2 · Essentials after study */}
            <SectionHead icon="mission" right={minChip(minutesFor(["essentials"]))}>2 · Essentials after study</SectionHead>
            <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
              <ModeTile
                icon="mission"
                title={`${LEARN_SIZE} essential questions${essTask?.area ? ` — ${essTask.area}` : ""}`}
                sub="The five most essential points of what you just studied, as guided questions"
                onClick={() => onEssentials(essTask?.area)}
                primary={Boolean(essTask) && phase.key === "learn"}
              />
            </div>

            {/* 3 · Daily practice — the pain point leads */}
            <SectionHead icon="practice" right={minChip(minutesFor(["weak", "practice"]))}>3 · Daily practice</SectionHead>
            <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
              {curated ? (
                <>
                  {hasHistory && <ModeTile icon="weak" title="Target my pain points" sub="Adaptive drill on your lowest-scoring areas — the plan's biggest block" onClick={onWeak} primary={phase.key === "strengthen"} />}
                  <ModeTile icon="practice" title={`Practice · ${SESSION_SIZE} questions`} sub="Instant marking, explanations & AI tutor" onClick={onPractice} primary={phase.key === "learn" && !hasHistory} />
                  <ModeTile icon="generate" title="Custom practice" sub="Charles generates fresh training laps on any topic — or from your notes" onClick={onGenerate} locked={!isPro} />
                </>
              ) : (
                <>
                  <ModeTile icon="generate" title="Custom practice" sub="Charles generates fresh training laps on any topic — or from your notes" onClick={onGenerate} primary locked={!isPro} />
                  <div style={{ ...card({ padding: 14 }), display: "flex", gap: 10, fontSize: 12.5, color: MUTED, lineHeight: 1.5 }}>
                    <Icon name="learn" size={16} color={C.soft} style={{ marginTop: 1 }} />
                    <span>
                      A curated question bank for {paper.id} is on the way. Meanwhile, Custom practice (Pro) generates
                      unlimited AI questions for this paper — or switch to a paper with a full bank from <b style={{ color: TEXT }}>← All papers</b>.
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* 4 · Flashcards daily */}
            <SectionHead icon="flashcards" right={minChip(minutesFor(["flashcards"]))}>4 · Flashcards daily</SectionHead>
            <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
              <ModeTile icon="flashcards" title="Flashcards" sub={fcStats.total ? `${fcStats.due} due · ${fcStats.mastered}/${fcStats.total} mastered` : "Coming soon"} onClick={onFlashcards} primary={fcStats.due > 0} />
            </div>

            {/* 5 · Official resources */}
            <SectionHead icon="exam">5 · Official ACCA resources</SectionHead>
            <OfficialResourcesSection paperId={paper.id} />
          </>
        )
      })()}

      <SectionHead icon="mock">Exam room</SectionHead>
      {/* The official CBE shape of THIS paper — what exam day actually looks
          like, so every rehearsal below is aimed at the real thing. */}
      <CbeBlueprintCard paperId={paper.id} />
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {curated && (() => {
          const br = bankRunProgress(paper.id)
          return (
            <ModeTile
              icon="check"
              title={br.done >= BANK_RUNS_TARGET ? "Bank run — stay sharp" : `Bank run ${br.done + 1} of ${BANK_RUNS_TARGET} · ${BANK_RUN_SIZE} questions`}
              sub={`The whole paper under the clock (${Math.round((BANK_RUN_SIZE * BANK_RUN_SECONDS_PER_Q) / 60)} min) — the bridge from Learn to the mock gate${br.best !== null ? ` · best ${br.best}%` : ""}`}
              onClick={onBankRun}
              primary={!gate.unlocked && br.done < BANK_RUNS_TARGET && phase.key !== "learn"}
            />
          )
        })()}
        {curated && (
          gate.unlocked ? (
            (() => {
              const bp = examBlueprint(paper.id)
              const sectionsLabel = bp ? bp.sections.map((s) => `Section ${s.id}`).join(" → ") : "the official sections"
              const hours = bp ? `${Math.floor(bp.durationMin / 60)}h${bp.durationMin % 60 ? String(bp.durationMin % 60).padStart(2, "0") : ""}` : ""
              return (
                <ModeTile
                  icon="mock"
                  title={mockProgress(paper.id).examReady ? `CBE mock — keep it warm · Form ${nextMockForm(mockProgress(paper.id).attempts)}` : `CBE mock ${Math.min(mockProgress(paper.id).attempts + 1, MOCKS_REQUIRED)} of ${MOCKS_REQUIRED} · Form ${nextMockForm(mockProgress(paper.id).attempts)}`}
                  sub={`The full sitting: ${sectionsLabel} · ${hours} clock, navigator, flag for review — pass line ${MOCK_PASS}%`}
                  onClick={onMock}
                  locked={!isPro}
                  primary={phase.key === "rehearse"}
                />
              )
            })()
          ) : (
            <MockGateTile prob={gate.prob} onWeak={onWeak} />
          )
        )}
        {/* BT/MA/FA/LW are 100% objective-test exams — there is no written section
            to mark, so we hide the Examiner rather than promise it forever. */}
        {!paper.objectiveOnly && writtenCount > 0 && (
          <ModeTile
            icon="examiner"
            title={`${constructedSectionLabel(paper.id)} studio — CBE`}
            sub={`Word processor + spreadsheet + exam clock · Charles debriefs your answer · ${writtenCount} questions`}
            onClick={onExaminer}
            locked={!isPro}
          />
        )}
      </div>

      {/* mock history — score trend against the pass line, then the receipts */}
      {mocks.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <SectionHead icon="mock" right={<span style={{ fontSize: 12, color: MUTED, textTransform: "none", letterSpacing: 0 }}>best <b style={{ color: TEXT }}>{Math.max(...mocks.map((m) => m.percent))}%</b></span>}>
            Recent mocks
          </SectionHead>
          {mocks.length >= 2 && (
            <div style={{ ...card({ padding: 16 }), marginBottom: 8 }}>
              <TrendBars
                points={[...mocks].reverse().map((m) => ({ date: m.date, percent: m.percent }))}
                passLine={MOCK_PASS}
                unit="mock score"
              />
            </div>
          )}
          <div style={{ display: "grid", gap: 8 }}>
            {mocks.slice(0, 5).map((m, i) => (
              <div key={i} style={{ ...card({ padding: "12px 14px" }), display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name={m.percent >= MOCK_PASS ? "done" : "stats"} size={17} color={m.percent >= MOCK_PASS ? GREEN : "#C2740B"} />
                <span style={{ flex: 1, fontSize: 13.5, color: TEXT }}>{m.date}</span>
                <span style={{ fontSize: 13, color: MUTED }}>{m.correct}/{m.total}</span>
                <MeterBar value={m.percent} color={bandColor(m.percent, MOCK_PASS)} target={MOCK_PASS} height={6} style={{ width: 56, flexShrink: 0 }} />
                <span style={{ fontWeight: 800, fontSize: 14, color: TEXT, width: 44, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{m.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  )
}

/* ── Category 5: official ACCA resources — verified links out ──── */

function OfficialResourcesSection({ paperId }: { paperId: string }) {
  const links = officialResources(paperId)
  if (!links.length) return null
  return (
    <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
      {links.map((r, i) => (
        <motion.a
          key={r.url}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i }}
          whileHover={{ x: 2 }}
          style={{ ...card({ padding: "13px 15px" }), display: "flex", alignItems: "center", gap: 12, textDecoration: "none", cursor: "pointer" }}
        >
          <IconBadge name="exam" tone="neutral" size={38} />
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: TEXT }}>{r.title}</span>
            <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 1, lineHeight: 1.45 }}>{r.detail}</span>
          </span>
          <span style={{ fontSize: 11, fontWeight: 750, color: DIM, flexShrink: 0 }}>accaglobal.com ↗</span>
        </motion.a>
      ))}
    </div>
  )
}

/* ── The loop strip — "you are here", one glance ──────────────── */

const LOOP_ICONS: Record<string, IconName> = {
  onboarding: "study", diagnostic: "diagnostic", roadmap: "roadmap", missions: "mission",
  progress: "stats", mock: "mock", exam: "exam", recovery: "reflect", next: "loop",
}
const LOOP_SHORT: Record<string, string> = {
  onboarding: "Onboard", diagnostic: "Diagnostic", roadmap: "Roadmap", missions: "Mission",
  progress: "Progress", mock: "Mocks", exam: "Real exam", recovery: "Recovery", next: "Next paper",
}

function LoopStrip({ paperId, onJourney }: { paperId: string; onJourney: () => void }) {
  const stages = getJourneyStages(paperId)
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.995 }}
      onClick={onJourney}
      style={{ ...card({ padding: "12px 16px", marginBottom: 14, cursor: "pointer" }), width: "100%", textAlign: "left" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
        <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, color: DIM }}>YOU ARE HERE · {paperId} LOOP</span>
        <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 750, color: "#C80000", display: "inline-flex", alignItems: "center", gap: 4 }}>
          Journey map <Icon name="chevron" size={13} color="#C80000" />
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 2, overflowX: "auto", paddingBottom: 2 }}>
        {stages.map((s, i) => {
          const current = s.status === "current"
          const done = s.status === "done"
          return (
            <div key={s.key} style={{ display: "flex", alignItems: "flex-start", flex: 1, minWidth: 52 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
                <span
                  style={{
                    width: current ? 30 : 24,
                    height: current ? 30 : 24,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    background: done ? "rgba(16,185,129,0.12)" : current ? IRIDESCENT : "var(--sch-card-2)",
                    boxShadow: current ? "0 4px 12px rgba(200,0,0,0.3)" : undefined,
                  }}
                >
                  {done ? (
                    <Icon name="done" size={13} color={GREEN} />
                  ) : s.status === "locked" ? (
                    <Icon name="lock" size={10} color={DIM} />
                  ) : (
                    <Icon name={LOOP_ICONS[s.key] ?? "study"} size={current ? 14 : 12} color={current ? "#fff" : MUTED} />
                  )}
                </span>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: current ? 800 : 600,
                    color: current ? TEXT : done ? MUTED : DIM,
                    textAlign: "center",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {LOOP_SHORT[s.key] ?? s.label}
                </span>
              </div>
              {i < stages.length - 1 && (
                <span style={{ height: 2, flex: 0.6, minWidth: 6, borderRadius: 2, background: done ? "rgba(16,185,129,0.35)" : "var(--sch-border)", marginTop: current ? 14 : 11 }} />
              )}
            </div>
          )
        })}
      </div>
    </motion.button>
  )
}

/* ── Study path (chapters → knowledge checks, like the tuition providers) ── */

function topicVisual(t: TopicNode): { icon: IconName; ring: string; sub: string } {
  if (t.state === "mastered") return { icon: "done", ring: "#10B981", sub: `Mastered · best ${Math.round(t.best * 100)}%` }
  if (t.state === "in-progress") {
    return {
      icon: "learn",
      ring: "#C80000",
      sub: t.best > 0
        ? `Best check ${Math.round(t.best * 100)}% · need ${Math.round(TOPIC_PASS * 100)}%`
        : t.seen > 0
          ? `${t.seen} answered · ${Math.round(t.accuracy * 100)}% accuracy`
          : "In progress",
    }
  }
  if (t.state === "available") return { icon: "arrow", ring: "#C80000", sub: "Up next — start here" }
  return { icon: "topics", ring: "var(--sch-border)", sub: "Coming up" }
}

function StudyPathSection({ paperId, curated, onTopic }: { paperId: string; curated: boolean; onTopic: (area: string) => void }) {
  if (!curated) return null
  const path = getStudyPath(paperId)
  const prog = pathProgress(paperId)
  return (
    <div>
      <SectionHead icon="roadmap" right={<span style={{ fontSize: 12, color: MUTED, textTransform: "none", letterSpacing: 0 }}><b style={{ color: "#C80000" }}>{prog.mastered}</b>/{prog.total} mastered</span>}>
        Study path · topic by topic
      </SectionHead>
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
                  display: "grid", placeItems: "center",
                  background: t.state === "mastered" ? "rgba(16,185,129,0.1)" : "var(--sch-card-2)",
                  border: `2px solid ${v.ring}`,
                }}
              >
                {t.state === "upcoming"
                  ? <span style={{ fontWeight: 800, fontSize: 13, color: DIM }}>{t.code}</span>
                  : <Icon name={v.icon} size={18} color={t.state === "mastered" ? GREEN : "#C80000"} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>
                  <span style={{ color: "#C80000", marginRight: 6 }}>{t.code}</span>
                  {t.label}
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 1 }}>{v.sub}</div>
              </div>
              <Icon name="chevron" size={16} color={DIM} />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Topic hub: learn → flashcards → knowledge check ──────────── */

function TopicView({
  paper, area, onBack, onBrief, onLearn, onDrill, onTest, onFlashcards,
}: {
  paper: AccaPaper
  area: string
  onBack: () => void
  onBrief: () => void
  onLearn: () => void
  onDrill: () => void
  onTest: () => void
  onFlashcards: () => void
}) {
  const areaInfo = paper.areas.find((a) => a.code === area)
  const result = getTopicResult(paper.id, area)
  const stats = getPaperStats(paper.id)
  const areaStats = stats.areas.find((a) => a.code === area)
  const areaCards = getFlashcards(paper.id).filter((c) => c.area === area).length
  const brief = getTopicBrief(paper.id, area)
  const chapter = getStudyChapter(paper.id, area)

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 18 }}>
        <StatCard index={0} icon="practice" label="Answered" value={areaStats?.seen ?? 0} />
        <StatCard
          index={1}
          icon="done"
          label="Accuracy"
          value={areaStats?.seen ? Math.round(areaStats.accuracy * 100) : "—"}
          suffix={areaStats?.seen ? "%" : undefined}
        />
        <StatCard
          index={2}
          icon={result.mastered ? "trophy" : "diagnostic"}
          label={result.mastered ? "Mastered" : "Best check"}
          value={result.attempts > 0 ? Math.round(result.best * 100) : "—"}
          suffix={result.attempts > 0 ? "%" : undefined}
          footnote={result.mastered ? undefined : `need ${Math.round(TOPIC_PASS * 100)}% to master`}
        />
      </div>

      {/* the topic loop — understand → learn 5 → memorise → prove → drill */}
      <h3 style={sectionH}>1 · UNDERSTAND</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        <ModeTile
          icon="learn"
          title={chapter ? `Study chapter · ${chapter.minutes} min` : brief ? `Topic brief · ${brief.minutes} min read` : "Topic brief"}
          sub={chapter ? "Full theory, worked examples, interactive diagrams, exam traps and quick checks — learn every aspect here first" : "The concept, the formulas, one worked example, and the classic traps — read this first"}
          onClick={onBrief}
          primary={(areaStats?.seen ?? 0) === 0}
        />
      </div>

      <h3 style={sectionH}>2 · LEARN THE ESSENTIALS</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        <ModeTile icon="practice" title={`First ${LEARN_SIZE} questions — guided`} sub="Instant marking, explanations & Ask Charles — the essentials of this sector only" onClick={onLearn} primary={!result.mastered && (areaStats?.seen ?? 0) > 0 && (areaStats?.seen ?? 0) < LEARN_SIZE} />
      </div>

      <h3 style={sectionH}>3 · MEMORISE</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        <ModeTile icon="flashcards" title="Topic flashcards" sub={areaCards > 0 ? `${areaCards} card${areaCards === 1 ? "" : "s"} for this topic — swipe to review` : "No cards for this topic yet — practice still counts"} onClick={onFlashcards} />
      </div>

      <h3 style={sectionH}>4 · PROVE IT</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 8 }}>
        <ModeTile
          icon="check"
          title={`Knowledge check · ${TOPIC_TEST_SIZE} questions, timed`}
          sub={`Exam conditions, no hints. Score ${Math.round(TOPIC_PASS * 100)}%+ to master the topic${result.attempts > 0 ? ` · ${result.attempts} attempt${result.attempts === 1 ? "" : "s"} so far` : ""}`}
          onClick={onTest}
          primary={result.mastered ? false : (areaStats?.seen ?? 0) >= 4}
        />
      </div>
      <h3 style={{ ...sectionH, marginTop: 16 }}>5 · DRILL TO DEPTH</h3>
      <div style={{ ...card({ padding: 16 }), marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 750, color: TEXT }}>Practice ladder</span>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: (areaStats?.seen ?? 0) >= 65 ? GREEN : TEXT, fontVariantNumeric: "tabular-nums" }}>{Math.min(65, areaStats?.seen ?? 0)} / 65</span>
        </div>
        <div style={{ height: 7, background: "var(--sch-card-2)", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, ((areaStats?.seen ?? 0) / 65) * 100)}%` }} transition={{ duration: 0.8 }} style={{ height: "100%", background: (areaStats?.seen ?? 0) >= 65 ? GREEN : IRIDESCENT, borderRadius: 999 }} />
        </div>
        <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.5, margin: "0 0 12px" }}>
          {(areaStats?.seen ?? 0) >= 65
            ? "Depth reached — this topic can carry exam marks. Keep it warm with flashcards."
            : "Mastery is proven at the check — depth is built here. 65 questions on one topic is where passers live."}
        </p>
        <ModeTile icon="weak" title={`Drill ${SESSION_SIZE} more`} sub="Fresh questions from this topic — Custom practice (Pro) adds unlimited more" onClick={onDrill} primary={result.mastered && (areaStats?.seen ?? 0) < 65} />
      </div>
      <p style={{ fontSize: 11.5, color: DIM, lineHeight: 1.5, margin: 0 }}>
        The tuition-provider loop: understand the chapter, learn by doing, check your knowledge, then drill to depth. Retakes are unlimited — the best score counts.
      </p>
    </motion.div>
  )
}

/** The Topic Brief — the "understand first" layer of the Learn stage. */
const BRIEF_SECTION_META: Record<string, { icon: IconName; label: string }> = {
  concept: { icon: "learn", label: "THE IDEA" },
  structure: { icon: "stats", label: "RULES & FORMULAS" },
  example: { icon: "practice", label: "WORKED EXAMPLE" },
  traps: { icon: "weak", label: "CLASSIC TRAPS" },
}

function BriefReader({
  paper, area, onBack, onLearn,
}: {
  paper: AccaPaper
  area: string
  onBack: () => void
  onLearn: () => void
}) {
  const brief = getTopicBrief(paper.id, area)
  if (!brief) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={onBack} style={backBtn}>← Topic</button>
        <p style={{ color: MUTED, fontSize: 14 }}>No brief for this topic yet — jump straight into the guided questions.</p>
        <Button onClick={onLearn} size="lg" full>Start the first {LEARN_SIZE} questions</Button>
      </motion.div>
    )
  }
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={backBtn}>← Topic</button>
      <p style={{ color: DIM, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, margin: "0 0 4px" }}>
        {paper.id} · TOPIC {area} · {brief.minutes} MIN READ
      </p>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 18px", color: TEXT, lineHeight: 1.25 }}>{brief.title}</h1>

      <div style={{ display: "grid", gap: 14 }}>
        {brief.sections.map((sec, i) => {
          const meta = BRIEF_SECTION_META[sec.kind] ?? BRIEF_SECTION_META.concept
          const isStructure = sec.kind === "structure"
          return (
            <motion.div
              key={sec.kind + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              style={card({ padding: 18, borderLeft: sec.kind === "traps" ? "3px solid #C80000" : undefined })}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: sec.kind === "traps" ? RED : C.brand, marginBottom: 8 }}>
                <Icon name={meta.icon} size={14} color={sec.kind === "traps" ? RED : C.brand} /> {meta.label}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 750, color: TEXT, marginBottom: 6 }}>{sec.heading}</div>
              {sec.body.split("\n\n").map((para, j) => (
                <p
                  key={j}
                  style={{
                    fontSize: isStructure ? 13 : 14,
                    color: isStructure ? TEXT : MUTED,
                    lineHeight: 1.65,
                    margin: j === 0 ? 0 : "10px 0 0",
                    fontFamily: isStructure ? "'JetBrains Mono', ui-monospace, monospace" : undefined,
                    background: isStructure ? "var(--sch-card-2)" : undefined,
                    padding: isStructure ? "10px 12px" : undefined,
                    borderRadius: isStructure ? 10 : undefined,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {para}
                </p>
              ))}
            </motion.div>
          )
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <Button onClick={onLearn} size="lg" full>
          Got it — first {LEARN_SIZE} questions <Icon name="arrow" size={17} color="#fff" />
        </Button>
        <p style={{ fontSize: 11.5, color: DIM, textAlign: "center", margin: "10px 0 0" }}>
          Learn by doing: the questions teach the rest.
        </p>
      </div>
    </motion.div>
  )
}

/** Method phase key → semantic Lucide icon (replaces the phase emoji). */
const PHASE_ICON: Record<string, IconName> = { learn: "learn", strengthen: "weak", revise: "flashcards", rehearse: "mock" }

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
                <div
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    display: "grid", placeItems: "center",
                    background: done || active ? IRIDESCENT : "var(--sch-card-2)",
                    opacity: done ? 0.6 : 1,
                    boxShadow: active ? "0 4px 14px rgba(200,0,0,0.30)" : "none",
                  }}
                >
                  {done
                    ? <Icon name="done" size={15} color="#fff" />
                    : <Icon name={PHASE_ICON[p.key] ?? "learn"} size={15} color={active ? "#fff" : C.soft} />}
                </div>
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
  icon, title, sub, onClick, primary, locked,
}: { icon: IconName; title: string; sub: string; onClick: () => void; primary?: boolean; locked?: boolean }) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: SHADOW.md }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14, textAlign: "left", width: "100%",
        cursor: "pointer", padding: 16, borderRadius: R["2xl"], boxShadow: primary ? SHADOW.brand : SHADOW.sm,
        background: primary ? GRAD : C.card, border: primary ? "none" : `1px solid ${C.border}`,
      }}
    >
      {primary ? (
        <span style={{ width: 40, height: 40, borderRadius: R.md, background: "rgba(255,255,255,0.18)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <Icon name={icon} size={20} color="#fff" />
        </span>
      ) : (
        <IconBadge name={icon} tone="brand" />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: primary ? "#fff" : C.text, display: "flex", alignItems: "center", gap: 8 }}>
          {title} {locked && <Badge tone="brand">PRO</Badge>}
        </div>
        <div style={{ fontSize: 12.5, color: primary ? "rgba(255,255,255,0.9)" : C.soft, marginTop: 2, lineHeight: 1.45 }}>{sub}</div>
      </div>
      <Icon name="chevron" size={18} color={primary ? "#fff" : C.faint} />
    </motion.button>
  )
}

/**
 * The gate (MOCK_GATE = 60%), visible: the mock room locked, with live progress toward the
 * unlock. Tapping it routes the learner where the marks actually are — the
 * adaptive weak-area drill.
 */
function MockGateTile({ prob, onWeak }: { prob: number; onWeak: () => void }) {
  const progress = Math.min(100, Math.round((prob / MOCK_GATE) * 100))
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onWeak}
      style={{ ...card({ cursor: "pointer", padding: 16 }), display: "flex", alignItems: "center", gap: 14, textAlign: "left", borderStyle: "dashed" }}
    >
      <IconBadge name="lock" tone="amber" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: TEXT, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          Mock exam
          <Badge tone="amber">UNLOCKS AT {MOCK_GATE}%</Badge>
        </div>
        <div style={{ fontSize: 12.5, color: MUTED, margin: "4px 0 8px" }}>
          You're at <b style={{ color: TEXT }}>{prob}%</b> pass probability — I'm steering your daily plan at your weak
          areas to close the gap. Tap to drill them now.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 999, background: "var(--sch-card-2)", overflow: "hidden", position: "relative" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "100%", borderRadius: 999, background: IRIDESCENT }}
            />
          </div>
          <span style={{ fontSize: 11, fontWeight: 750, color: MUTED, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
            {prob}/{MOCK_GATE}%
          </span>
        </div>
      </div>
      <span style={{ color: DIM, fontSize: 18, flexShrink: 0 }}>›</span>
    </motion.button>
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

  // ── Analytics instrumentation (all optional, never blocks the flow) ──
  const shownAtRef = useRef(performance.now())
  const [sure, setSure] = useState<boolean | null>(null)
  const [mistakeTag, setMistakeTag] = useState<MistakeTag | null>(null)
  const confidenceRecorded = useRef(false)
  useEffect(() => {
    shownAtRef.current = performance.now()
    setSure(null)
    setMistakeTag(null)
    confidenceRecorded.current = false
  }, [q.id])

  // Confidence resolves the moment the answer is graded.
  useEffect(() => {
    if (graded && sure !== null && !confidenceRecorded.current) {
      confidenceRecorded.current = true
      recordConfidence(q.paper, sure, wasCorrect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graded])

  function recordTiming() {
    recordAnswerTiming(q.paper, (performance.now() - shownAtRef.current) / 1000)
  }
  function handleSubmit() {
    recordTiming()
    onSubmit()
  }
  function handleMockNext() {
    recordTiming()
    onMockNext()
  }
  function handleNext() {
    // A missed question defaults to a knowledge gap unless the learner said why.
    if (!wasCorrect && mistakeTag === null) recordMistake(q.paper, "knowledge")
    onNext()
  }
  function tagMistake(tag: MistakeTag) {
    if (mistakeTag !== null) return
    setMistakeTag(tag)
    recordMistake(q.paper, tag)
  }

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

        {/* optional one-tap confidence mark — feeds calibration analytics */}
        {!isMock && !graded && canSubmit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}
          >
            <span style={{ fontSize: 11.5, color: DIM, fontWeight: 650 }}>How sure are you?</span>
            {([true, false] as const).map((v) => {
              const on = sure === v
              return (
                <button
                  key={String(v)}
                  onClick={() => setSure(on ? null : v)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    border: `1.5px solid ${on ? "#C80000" : BORDER}`,
                    background: on ? "rgba(200,0,0,0.07)" : CARD,
                    color: on ? "#C80000" : MUTED,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "border-color .15s, background .15s, color .15s",
                  }}
                >
                  {v ? "Sure" : "Not sure"}
                </button>
              )
            })}
          </motion.div>
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
                {!wasCorrect && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: 11.5, color: DIM, fontWeight: 700, marginBottom: 7 }}>
                      {mistakeTag ? "Noted — this sharpens your mistake analysis." : "Why did this one slip? (one tap — improves your plan)"}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {(Object.keys(MISTAKE_LABELS) as MistakeTag[]).map((tag) => {
                        const on = mistakeTag === tag
                        return (
                          <button
                            key={tag}
                            onClick={() => tagMistake(tag)}
                            disabled={mistakeTag !== null}
                            style={{
                              padding: "5px 11px",
                              borderRadius: 999,
                              border: `1.5px solid ${on ? RED : BORDER}`,
                              background: on ? "rgba(239,68,68,0.08)" : CARD,
                              color: on ? RED : mistakeTag !== null ? DIM : MUTED,
                              fontSize: 12,
                              fontWeight: 650,
                              cursor: mistakeTag === null ? "pointer" : "default",
                              transition: "border-color .15s, background .15s",
                            }}
                          >
                            {MISTAKE_LABELS[tag]}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              <TutorPanel q={q} correctText={q.options?.[correctIdx ?? -1] ?? `${q.numericAnswer ?? ""}`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* action bar */}
      <div style={{ marginTop: 16 }}>
        {isMock ? (
          <motion.button whileTap={{ scale: 0.99 }} disabled={!canSubmit} onClick={handleMockNext} style={actionBtn(canSubmit)}>
            {index + 1 >= total ? "Finish mock" : "Next →"}
          </motion.button>
        ) : !graded ? (
          <motion.button whileTap={{ scale: 0.99 }} disabled={!canSubmit} onClick={handleSubmit} style={actionBtn(canSubmit)}>
            Check answer
          </motion.button>
        ) : (
          <motion.button whileTap={{ scale: 0.99 }} onClick={handleNext} style={actionBtn(true)}>
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
  paper, correct, total, isMock, isBankRun = false, isTopicTest, topicArea, log, onAgain, onOverview, onAction,
}: {
  paper: AccaPaper
  correct: number
  total: number
  isMock: boolean
  isBankRun?: boolean
  isTopicTest?: boolean
  topicArea?: string | null
  log: { area: string; correct: boolean }[]
  onAgain: () => void
  onOverview: () => void
  onAction: (a: PostMortemAction) => void
}) {
  // Bank-run number: the parent records the run in an effect AFTER first
  // paint, so a live read here would show the PREVIOUS count. Capture the
  // pre-record count at mount: this run is number (done + 1).
  const bankRunNo = useMemo(
    () => (isBankRun ? Math.min(bankRunProgress(paper.id).done + 1, BANK_RUNS_TARGET) : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const passLine = isTopicTest ? Math.round(TOPIC_PASS * 100) : MOCK_PASS
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
      <div style={{ fontSize: 13, color: DIM, letterSpacing: 0.4, fontWeight: 600, marginBottom: 14 }}>
        {isTopicTest ? `KNOWLEDGE CHECK · TOPIC ${topicArea}` : isMock ? "MOCK EXAM RESULT" : isBankRun ? `BANK RUN ${bankRunNo} OF ${BANK_RUNS_TARGET} COMPLETE` : "PRACTICE COMPLETE"}
      </div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.05 }}
        style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}
      >
        <RingGauge
          value={pct}
          size={172}
          target={passLine}
          label={passed ? (isMock ? "mock passed" : isTopicTest ? "topic mastered" : "pass-level score") : `pass line ${passLine}%`}
          sublabel={`${correct}/${total} correct`}
        />
      </motion.div>
      <p style={{ color: MUTED, margin: "0 0 24px", fontSize: 15 }}>
        {isTopicTest
          ? passed
            ? `${pct}% — topic mastered! ${topicLabel} is locked in. On to the next one.`
            : `${pct}% — not there yet. You need ${passLine}% to master ${topicLabel}. Practise it once more, then retake.`
          : passed
            ? `That's a ${pct}% pass on ${paper.name}.`
            : `${pct}% this round. Keep going — repetition is how the marks come.`}
      </p>

      {/* mock failed → the loop's post-mortem: lost marks, weak topics, recovery plan */}
      {isMock && !isTopicTest && !passed && (
        <PostMortemPanel
          input={{
            kind: "mock",
            paperId: paper.id,
            percent: pct,
            areas: areaRows.map((a) => ({ code: a.code, label: a.label, correct: a.correct, seen: a.seen })),
            mockHistory: getMockHistory(paper.id).map((m) => ({ date: m.date, percent: m.percent })),
          }}
          onAction={onAction}
        />
      )}

      {/* mock passed → the next stage of the loop: more mocks or the real thing */}
      {isMock && !isTopicTest && passed && (() => {
        const mp = mockProgress(paper.id)
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ ...card({ padding: 16 }), maxWidth: 420, margin: "0 auto 24px", textAlign: "left", display: "flex", gap: 12, alignItems: "center", borderColor: "rgba(16,185,129,0.4)" }}
          >
            <IconBadge name="exam" tone="green" size={40} />
            <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.55 }}>
              {mp.examReady ? (
                <>
                  <b style={{ color: TEXT }}>Mock {Math.min(mp.attempts, MOCKS_REQUIRED)} of {MOCKS_REQUIRED} — sequence complete.</b>{" "}
                  You're proven under exam conditions; the real {paper.id} sitting is next. Keep a mock every 2–3
                  days until exam day so this stays sharp.
                </>
              ) : (
                <>
                  <b style={{ color: TEXT }}>Mock {mp.attempts} of {MOCKS_REQUIRED} passed.</b>{" "}
                  {MOCKS_REQUIRED - mp.attempts} more to go before the real {paper.id} sitting — sit the next one in
                  2–3 days.
                </>
              )}
            </span>
          </motion.div>
        )
      })()}

      {areaRows.length > 0 && (
        <div style={{ maxWidth: 420, margin: "0 auto 24px", textAlign: "left" }}>
          <h3 style={{ ...sectionH, textAlign: "center" }}>BY SYLLABUS AREA</h3>
          <div style={card({ padding: "8px 16px" })}>
            <BreakdownList
              items={areaRows.map((a) => ({
                code: a.code,
                label: a.label,
                pct: a.pct,
                valueText: `${a.correct}/${a.seen}`,
              }))}
              passLine={passLine}
            />
          </div>
        </div>
      )}

      {/* mock score trend — every attempt against the pass line */}
      {isMock && !isTopicTest && (() => {
        const history = getMockHistory(paper.id)
        if (history.length < 2) return null
        return (
          <div style={{ maxWidth: 420, margin: "0 auto 24px", textAlign: "left" }}>
            <h3 style={{ ...sectionH, textAlign: "center" }}>MOCK TREND</h3>
            <div style={card({ padding: 16 })}>
              <TrendBars
                points={[...history].reverse().map((m) => ({ date: m.date, percent: m.percent }))}
                passLine={passLine}
                unit="mock score"
              />
            </div>
          </div>
        )
      })()}

      <div style={{ display: "grid", gap: 10, maxWidth: 340, margin: "0 auto" }}>
        <motion.button whileTap={{ scale: 0.99 }} onClick={onAgain} style={{ padding: 16, borderRadius: 14, border: "none", background: IRIDESCENT, color: "#fff", fontWeight: 750, fontSize: 16, cursor: "pointer" }}>
          {isMock ? "New mock" : isBankRun ? "Another bank run" : "Practise again"}
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
