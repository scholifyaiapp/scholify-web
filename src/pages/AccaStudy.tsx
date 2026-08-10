import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { canUsePlanFeature, canAccessPaper } from "@/lib/entitlement"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { usePaywall } from "@/hooks/usePaywall"
import { usePaperContent } from "@/hooks/usePaperContent"
import { PaperContentSkeleton, PaperContentError } from "@/components/acca/PaperContentGate"
import { DailyMissionCelebration } from "@/components/acca/DailyMissionCelebration"
import { ProCountdown } from "@/components/acca/ProCountdown"
import PaywallModal from "@/components/PaywallModal"
import ExaminerView from "@/components/acca/ExaminerView"
import CbeMockRunner from "@/components/acca/CbeMockRunner"
import CbeToolsDock, { CbeBlueprintCard } from "@/components/acca/CbeTools"
import { constructedSectionLabel, examBlueprint } from "@/lib/acca-exam-structure"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
import FlashcardsView from "@/components/acca/FlashcardsView"
import GenerateView from "@/components/acca/GenerateView"
import ExamDayFlow from "@/components/acca/ExamDayFlow"
import JourneyMap from "@/components/acca/JourneyMap"
import PostMortemPanel from "@/components/acca/PostMortemPanel"
import { getQuestions,
  getPaper,
  getPracticeInventory,
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
import { markFirstTaskCompleted } from "@/lib/retention"
import { greeting, todayHeadline, MISSION_MINUTES, getTodayDone, markTodayTaskDone, setPendingTodayTask, resolvePendingTodayTask, completePendingTodayTask, startFocusSession, resumeFocusSession, pauseFocusSession, clearFocusSession, focusSecondsLeft, type TodayAction, type TodayTask } from "@/lib/acca-today"
import { recordDayActive, shieldState } from "@/lib/acca-schedule"
import { getStudyChapter, chaptersForArea, getChapterByKey, chapterKey, chaptersForPaper, type StudyChapter } from "@/lib/acca-study-content"
/* ── The rebuilt Learning section ──────────────────────────────────
 * Today / Plan / Practice / Progress are now driven by the chapter-level plan
 * engine rather than by syllabus areas. See acca-topic-plan (what to study and
 * when), acca-today-composer (the five blocks of one day), acca-no-repeat (why
 * nothing is served twice), acca-day-gate (why tomorrow is locked) and
 * acca-strategy (which paper comes next). */
import { TodayBoard } from "@/components/acca/TodayBoard"
import { ArticleReader } from "@/components/acca/ArticleReader"
import { PlanBoard } from "@/components/acca/PlanBoard"
import { PracticeHub } from "@/components/acca/PracticeHub"
import { ProgressBoard } from "@/components/acca/ProgressBoard"
import { composeToday, dayProgress, type TodayBlock, type TodayComposition } from "@/lib/acca-today-composer"
import { markChapterRead, recordChapterPace, nextChapter } from "@/lib/acca-topic-plan"
import { recordDayComplete, congratulationSent, markCongratulationSent, tomorrowGate } from "@/lib/acca-day-gate"
import { notifyDayComplete } from "@/lib/reminders"
import { markServed, servedIds, type PoolKind } from "@/lib/acca-no-repeat"
import type { TechArticle } from "@/lib/acca-tech-article"
import { StudyChapterReader } from "@/components/acca/StudyChapterReader"
import { TaxBasisNote } from "@/components/acca/TaxBasisNote"
import { mockGate, MOCK_GATE, MOCK_PASS, mockProgress, MOCKS_REQUIRED, examDayDue, currentStage, recoveryState, getJourneyStages, passProbability } from "@/lib/acca-loop"
import { recordMistake, snapshotProbability, recordAnswerTiming } from "@/lib/acca-analytics"
import { isAccaOnboarded, getStartMode } from "@/lib/acca-profile"
import { getTopicBrief } from "@/lib/acca-briefs"
import { BANK_RUN_SIZE, BANK_RUN_SECONDS_PER_Q, MIXED_BANK_SIZES, recordBankRun, bankRunProgress, bankRunTarget, type MixedBankSize } from "@/lib/acca-bankruns"
import { officialResources } from "@/lib/acca-resources"
import { nextMockForm } from "@/lib/acca-mockforms"
import { withShuffledOptions } from "@/lib/acca-options"
import type { PostMortemAction } from "@/lib/acca-ai"
import { Icon, IconBadge, Badge, Button, SectionHead, C, SP, R, SHADOW, GRAD, type IconName } from "@/components/acca/ui"
import { QuestionNavBar } from "@/components/acca/QuestionNavigator"
import CharlesMascot from "@/components/CharlesMascot"
import StudyCommandHero from "@/components/acca/StudyCommandHero"
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

type Mode = "onboarding" | "picker" | "overview" | "topic" | "brief" | "session" | "cbemock" | "examiner" | "flashcards" | "generate" | "results" | "journey" | "article"

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
  const canUseMocks = canUsePlanFeature(user, "timed_mocks")
  const canUseExaminer = canUsePlanFeature(user, "ai_examiner")
  const canUseCustomPractice = canUsePlanFeature(user, "custom_practice")
  const isPro = canUseMocks && canUseExaminer && canUseCustomPractice
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
    if (!wasOnboarded()) {
      navigate("/welcome", { replace: true })
      return
    }
    // A measure-first learner must finish the diagnostic (→ results → plan reveal)
    // before the study app. Total beginners (startMode "zero") are exempt — their
    // wow is the onboarding plan-reveal. Once the diagnostic is done passProbability
    // is set, so this never loops.
    const pid = getCurrentPaper()
    if (pid && getStartMode() !== "zero" && passProbability(pid) === null) {
      navigate("/study/diagnostic?next=paywall", { replace: true })
    }
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
  // Exam-style: answers live per index so the learner can jump around with the
  // question map and change any answer; grading happens once, at Finish.
  const [answersMap, setAnswersMap] = useState<Record<number, number | number[] | string>>({})
  const [flagsMap, setFlagsMap] = useState<Record<number, boolean>>({})
  const [correctCount, setCorrectCount] = useState(0)
  const [log, setLog] = useState<{ area: string; correct: boolean }[]>([])
  const [reviewItems, setReviewItems] = useState<{ q: AccaQuestion; response: number | number[] | string | undefined; correct: boolean }[]>([])
  const [isMock, setIsMock] = useState(false)
  const [isBankRun, setIsBankRun] = useState(false)
  const [bankRunSize, setBankRunSize] = useState<MixedBankSize>(BANK_RUN_SIZE)
  // Wall-clock DEADLINE, not a ticking count. Holding the remaining seconds in
  // page state meant every tick re-rendered this ~2,700-line page — the question
  // card, the option buttons, the navigator — to repaint one number, which is
  // what made a timed session feel like it was stuttering. ProCountdown ticks
  // itself from this; the page only needs to know when the clock ends.
  const [deadline, setDeadline] = useState<number | null>(null)
  /** Set when the clock actually ran out, so results can attribute lost marks to time. */
  const expiredRef = useRef(false)
  const finishRef = useRef<() => void>(() => {})
  /**
   * Which no-repeat pool this session came from, so its questions can be marked
   * SERVED when the session is graded (not when it is composed — a session the
   * learner abandons must stay available). See acca-no-repeat.
   */
  const [sessionPool, setSessionPool] = useState<PoolKind | null>(null)
  /** The technical article currently open, when mode === "article". */
  const [activeArticle, setActiveArticle] = useState<TechArticle | null>(null)
  /**
   * Per-question timing for ordinary practice. Only the CBE mock recorded this
   * before, so the per-section pace read (Progress → "time per question by
   * section") stayed empty for every learner who had not sat a mock — which is
   * every learner in their first month, i.e. the ones who most need to know they
   * are slow.
   */
  const shownAt = useRef<number>(0)
  const timedIdx = useRef<Set<number>>(new Set())
  /**
   * When the current chapter was opened, so a finished read can feed this
   * learner's own READING PACE (acca-topic-plan). The authored `minutes` on a
   * chapter is an average student's time; a learner who consistently differs from
   * it should see their own number, or every future estimate is wrong by exactly
   * the amount they differ.
   */
  const chapterOpenedAt = useRef<number>(0)
  const chapterReadMinutes = (): number =>
    chapterOpenedAt.current ? Math.max(1, Math.round((Date.now() - chapterOpenedAt.current) / 60000)) : 0

  // topic path (Kaplan-style chapter flow)
  const [topicArea, setTopicArea] = useState<string | null>(null)
  /**
   * Which chapter the reader is showing, for a paper authored as a chapter TREE.
   *
   * A paper with one chapter per syllabus area needs no such state — the area IS
   * the chapter. BT now has 26 chapters across six areas, so an area maps to a
   * LIST and the learner picks from it. `null` means "show the list"; on a
   * single-chapter area the list is skipped and that chapter opens directly.
   */
  const [studyChapterKey, setStudyChapterKey] = useState<string | null>(null)
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

  // Stripe checkout lands back on /study?upgraded=true. The webhook writes
  // the plan onto the user server-side, so refresh the session (with a
  // couple of retries — the webhook can lag the redirect by a few seconds)
  // until the entitlement shows up.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("upgraded") !== "true") return
    window.history.replaceState({}, "", window.location.pathname)
    trackEvent("subscription_activated")
    toast.success("Payment received — welcome aboard! Unlocking your plan…")
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

  /*
   * ── Deep links ──────────────────────────────────────────────────
   *
   *   ?do=weak|practice|mock|flashcards|diagnostic|bank|essentials|study[&area=]
   *        the legacy action links — land INSIDE the task, not on a picker.
   *   ?tab=today|plan|practice|progress|tomorrow
   *        which Learning tab to open. `tomorrow` is an alias for `today`: the
   *        congratulation email links to it, and when the day is complete the Today
   *        board IS tomorrow's card, so the two are the same destination.
   *   ?tab=today&block=quiz|practice|flashcards|article
   *   ?tab=today&chapter=<chapterKey>[&area=]
   *        the Dashboard's "Continue mission" CTA, which knows the exact block the
   *        learner is on because it reads the same composed day.
   *
   * The block/chapter forms are resolved here rather than by the board so the CTA
   * lands in ONE tap — routing to the board and making the learner tap the step
   * again would be two.
   */
  /*
   * Read SYNCHRONOUSLY, in a lazy initialiser, not in the effect below. Overview
   * seeds its own tab state from this on FIRST render; an effect runs after that
   * render, so by the time it called setInitialTab the tab had already defaulted to
   * "today" and the ?tab= in the link was silently ignored.
   */
  const [initialTab] = useState<StudyTab | null>(() => {
    try {
      const value = new URLSearchParams(window.location.search).get("tab")?.toLowerCase()
      if (!value) return null
      // `tomorrow` is an alias for `today`: the congratulation email links to it,
      // and a completed day renders the Today board AS tomorrow's card.
      const tabs: Record<string, StudyTab> = { today: "today", tomorrow: "today", plan: "plan", practice: "practice", progress: "progress" }
      return tabs[value] ?? null
    } catch {
      return null
    }
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const action = params.get("do") as TodayAction | null
    const linkArea = params.get("area")
    const linkTab = params.get("tab")
    const linkBlock = params.get("block")
    const linkChapter = params.get("chapter")
    const clearUrl = () => window.history.replaceState({}, "", window.location.pathname)

    if (!action && !linkBlock && !linkChapter) {
      if (linkTab) clearUrl()
      return
    }
    if (!wasOnboarded()) { clearUrl(); return }
    if (!paperId) { clearUrl(); return }
    // Paper-scoped work needs the paper's content chunk (see the note below).
    if (!content.ready) return

    // A chapter link opens that exact chapter — the study block of today's plan.
    if (linkChapter) {
      clearUrl()
      const chapter = getChapterByKey(paperId, linkChapter)
      if (chapter) startStudyChapter(linkChapter, chapter.area)
      else if (linkArea) startStudyChapter(linkChapter, linkArea)
      return
    }

    // A block link launches that block from TODAY's composed set, so the learner
    // gets the same five questions the board promised them.
    if (linkBlock) {
      clearUrl()
      const composed = composeToday(paperId)
      const block = composed.blocks.find((b) => b.kind === linkBlock)
      if (!block) return
      if (block.kind === "quiz") onComposedFromLink(composed.quiz, "quiz", block.area ?? null, block.id)
      else if (block.kind === "practice") onComposedFromLink(composed.practice, "practice", block.area ?? null, block.id)
      else if (block.kind === "flashcards") { setPendingTodayTask(paperId, block.id); setTopicArea(null); setMode("flashcards") }
      else if (block.kind === "article" && composed.article) { setActiveArticle(composed.article); setMode("article") }
      else if (block.kind === "study" && block.chapterKey && composed.chapter) startStudyChapter(block.chapterKey, composed.chapter.area)
      return
    }
    if (!action) return
    if (!wasOnboarded()) { clearUrl(); return }
    if (action === "diagnostic") {
      clearUrl()
      navigate("/study/diagnostic")
      return
    }
    /*
     * Paper-scoped actions read the loaded paper's content (buildSession,
     * getFlashcards, briefs…). On a cold content chunk this effect fires before
     * content.ready — acting now would silently drop the intent and show a
     * spurious "No questions available yet". The guard above waits and re-runs when
     * readiness flips, so the deep-linked action always lands.
     */
    clearUrl()
    if (action === "weak") startSession(true, false)
    else if (action === "practice") startSession(false, false)
    else if (action === "mock") startSession(false, true)
    else if (action === "flashcards") setMode("flashcards")
    else if (action === "bank") startBankRun()
    else if (action === "essentials") startEssentials(linkArea)
    else if (action === "study" && linkArea) {
      setTopicArea(linkArea)
      setStudyChapterKey(null)
      setIsTopicTest(false)
      setMode("brief")
    }
    // action === "study" without an area falls through → the study hub
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.ready, paperId])

  /*
   * Per-question timing for ordinary practice. Recorded on LEAVING a question
   * (index change or finish), once per question, with the question's marks so the
   * per-section pace read is measured against ACCA's minutes-per-mark rather than
   * a flat number. Marks-based bucketing is inferred here (see sectionForMarks) —
   * the CBE mock knows the real section and passes it explicitly.
   */
  useEffect(() => {
    if (mode !== "session") {
      timedIdx.current = new Set()
      return
    }
    const previous = idx
    shownAt.current = performance.now()
    return () => {
      const q = questions[previous]
      if (!q || !paperId || timedIdx.current.has(previous)) return
      timedIdx.current.add(previous)
      recordAnswerTiming(paperId, (performance.now() - shownAt.current) / 1000, q.marks)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, idx])

  // One exam-paced countdown for every objective practice session — a single
  // timeout at the deadline, replacing a per-second interval that re-rendered
  // the entire page on every tick.
  useEffect(() => {
    if (mode !== "session" || deadline == null) return
    const t = window.setTimeout(() => {
      expiredRef.current = true
      finishRef.current()
    }, Math.max(0, deadline - Date.now()))
    return () => window.clearTimeout(t)
  }, [mode, deadline])

  // Record a mock / knowledge check the moment its results screen appears.
  useEffect(() => {
    if (mode === "results" && paperId && questions.length) {
      if (isTopicTest && topicArea) {
        recordTopicTest(paperId, topicArea, correctCount / questions.length)
      } else if (isBankRun) {
        recordBankRun(paperId, correctCount, questions.length)
        if (expiredRef.current && log.length < questions.length) {
          recordMistake(paperId, "time", questions.length - log.length)
        }
      } else if (isMock) {
        recordMock(paperId, correctCount, questions.length)
        // Questions the clock took are lost-to-time marks, not knowledge gaps.
        if (expiredRef.current && log.length < questions.length) {
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
      void markFirstTaskCompleted()
      // Every finished session updates the learner model — snapshot it for
      // the Pass Momentum trend.
      snapshotProbability(paperId)
      queueAccaProgressPush()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  function openPaper(id: string) {
    // Free/trial learners are limited to their onboarding target paper; the
    // other 14 need a paid plan. Tapping a locked paper offers the upgrade.
    if (!canAccessPaper(user, id, getStudyingPapers())) {
      triggerFeaturePaywall()
      return
    }
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
        toast.info(`The mock room unlocks at a ${MOCK_GATE}% Exam Readiness Score — you're at ${gate.prob}%. Today's plan is aimed at getting you there.`)
        return
      }
      if (!canUseMocks) {
        triggerFeaturePaywall()
        return
      }
      // The mock IS the sectioned CBE now — the full exam shape (A → B → C),
      // one clock, navigator, Charles marking constructed answers into the score.
      setMode("cbemock")
      return
    }
    const seed = (Date.now() % 100000) + 1
    const size = SESSION_SIZE
    // Nothing the learner has already worked through this cycle: a fresh seed
    // reshuffles the pool, it does not exclude anything (see acca-no-repeat).
    const served = servedIds(paperId, weakFirst ? "drill" : "practice")
    // "Target my weak areas" uses the adaptive engine (weak areas + matched
    // difficulty + spaced reinforcement); plain practice stays a fresh shuffle.
    const qs = weakFirst
      ? buildAdaptiveSession(paperId, size, seed, served)
      : buildSession(paperId, size, { weakFirst, excludeIds: served }, seed)
    if (qs.length === 0) {
      toast.info("No questions available yet for this paper.")
      return
    }
    loadQuestions(qs)
    setSessionPool(weakFirst ? "drill" : "practice")
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(false)
    setIsBankRun(false)
    setIsTopicTest(false)
    setTopicArea(null)
    setDeadline(Date.now() + qs.length * MOCK_SECONDS_PER_Q * 1000); expiredRef.current = false
    resetQuestion()
    setMode("session")
  }

  /* ── Today's composed blocks ────────────────────────────────────
   *
   * The quiz and practice blocks of the daily plan are launched from the set the
   * composer ALREADY selected (acca-today-composer), not rebuilt here. That is
   * what makes the counts on the Today board true: the card says "12 practice
   * questions" because there are twelve, and they are the twelve that have been
   * claimed for today and excluded from every other pick.
   */
  function startComposedSession(qs: AccaQuestion[], pool: PoolKind, area: string | null, timed = true) {
    if (!paperId) return
    if (qs.length === 0) {
      toast.info("No curated questions for this topic yet — try Custom practice.")
      return
    }
    loadQuestions(qs)
    setSessionPool(pool)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(false)
    setIsBankRun(false)
    setIsTopicTest(false)
    setTopicArea(area)
    setDeadline(timed ? Date.now() + qs.length * MOCK_SECONDS_PER_Q * 1000 : null)
    expiredRef.current = false
    resetQuestion()
    setMode("session")
  }

  /** Open one EXACT chapter in the reader (the Today plan's study block). */
  function startStudyChapter(key: string, area: string) {
    setTopicArea(area)
    setStudyChapterKey(key)
    setIsTopicTest(false)
    chapterOpenedAt.current = Date.now()
    setMode("brief")
  }

  /**
   * A deep-linked block launch: stamps the block pending (so returning to the
   * board marks it done and unlocks the next) and starts the composed set.
   */
  function onComposedFromLink(qs: AccaQuestion[], pool: PoolKind, area: string | null, blockId: string) {
    if (!paperId) return
    setPendingTodayTask(paperId, blockId)
    startComposedSession(qs, pool, area)
  }

  /** "Test yourself" on one chapter — the ACCA Study Hub's per-chapter check. */
  function startChapterTest(key: string, area: string, count: number) {
    if (!paperId) return
    const pool = getPracticeInventory(paperId).filter((q) => q.chapter === key)
    const scoped = pool.length >= 3 ? pool : getPracticeInventory(paperId).filter((q) => q.area === area)
    const served = servedIds(paperId, "practice")
    const fresh = scoped.filter((q) => !served.has(q.id))
    const chosen = [...(fresh.length >= count ? fresh : [...fresh, ...scoped.filter((q) => served.has(q.id))])].slice(0, count)
    startComposedSession(chosen, "practice", area)
  }

  /** A daily practice block for one official exam section only. */
  function startSectionSession(sectionId: "A" | "B" | "C") {
    if (!paperId) return
    const section = examBlueprint(paperId)?.sections.find((item) => item.id === sectionId)
    if (!section) return
    if (section.kind === "constructed") {
      openExaminer()
      return
    }
    const composed = buildCbeMock(paperId, nextMockForm(getMockHistory(paperId).length)).sections.find((item) => item.id === sectionId)
    const qs = (composed?.items ?? []).flatMap((item) => {
      if (item.kind === "ot") return [item.q]
      if (item.kind === "caseq") return [{ ...item.q, stem: `${item.caseRef.title}\n\n${item.caseRef.scenario}\n\n${item.q.stem}` }]
      return []
    }).slice(0, SESSION_SIZE)
    if (qs.length === 0) {
      toast.info(`Section ${sectionId} practice is not available for this paper yet.`)
      return
    }
    loadQuestions(qs)
    setIdx(0); setCorrectCount(0); setLog([])
    setIsMock(false); setIsBankRun(false); setIsTopicTest(false); setTopicArea(null)
    setDeadline(Date.now() + qs.length * MOCK_SECONDS_PER_Q * 1000); expiredRef.current = false
    resetQuestion()
    setMode("session")
  }

  /**
   * The five quizzes on today's studied topic, for callers that only know "the
   * quizzes" (the ?do=essentials deep link, the brief reader's end-of-lesson CTA).
   *
   * The area falls back to TODAY'S CHAPTER rather than to the old plan's essentials
   * task — that lookup was the last place buildTodayPlan still decided anything, and
   * it could name a different area than the chapter the learner had just read.
   */
  function startEssentials(area?: string | null) {
    if (!paperId) return
    const target = area ?? composeToday(paperId, /* dryRun */ true).chapter?.area ?? getPaper(paperId)?.areas[0]?.code
    if (!target) return
    startTopicSession(target, false, LEARN_SIZE)
  }

  /** Topic flow: practise one syllabus area, or sit its knowledge check. */
  function startTopicSession(area: string, test: boolean, size = SESSION_SIZE) {
    if (!paperId) return
    const seed = (Date.now() % 100000) + 1
    // A knowledge CHECK is a measurement, so it must not re-ask questions the
    // learner has already answered — that would measure memory of the answer.
    const qs = buildSession(paperId, test ? TOPIC_TEST_SIZE : size, { area, excludeIds: servedIds(paperId, test ? "quiz" : "practice") }, seed)
    if (qs.length === 0) {
      toast.info("No curated questions for this topic yet — try Custom practice.")
      return
    }
    loadQuestions(qs)
    setSessionPool(test ? "quiz" : "practice")
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(test) // knowledge checks run under exam conditions: timed, no hints
    setIsBankRun(false)
    setIsTopicTest(test)
    setTopicArea(area)
    setDeadline(Date.now() + qs.length * MOCK_SECONDS_PER_Q * 1000); expiredRef.current = false
    resetQuestion()
    setMode("session")
  }

  /** Bank Run — 50 whole-paper questions under the clock (75 min). Free,
   * pre-gate: the bridge from Learn to the Mock room. */
  function startBankRun(size: MixedBankSize = bankRunSize) {
    if (!paperId) return
    const seed = (Date.now() % 100000) + 1
    const qs = buildSession(paperId, size, { excludeIds: servedIds(paperId, "bank") }, seed)
    if (qs.length < 10) {
      toast.info("Not enough questions in this paper's bank yet for a bank run.")
      return
    }
    loadQuestions(qs)
    setSessionPool("bank")
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(false)
    setIsBankRun(true)
    setBankRunSize(size)
    setIsTopicTest(false)
    setTopicArea(null)
    setDeadline(Date.now() + qs.length * BANK_RUN_SECONDS_PER_Q * 1000); expiredRef.current = false
    resetQuestion()
    setMode("session")
  }

  function openExaminer() {
    if (!canUseExaminer) {
      triggerFeaturePaywall()
      return
    }
    setMode("examiner")
  }

  function openGenerate() {
    if (!canUseCustomPractice) {
      triggerFeaturePaywall()
      return
    }
    setMode("generate")
  }

  /** Start a practice session from an externally-supplied set (AI-generated). */
  function startCustomSession(qs: AccaQuestion[]) {
    if (qs.length === 0) {
      toast.info("No questions were generated — try a different topic or your own notes.")
      return
    }
    loadQuestions(qs)
    setIdx(0)
    setCorrectCount(0)
    setLog([])
    setIsMock(false)
    // Reset the other mode flags too — otherwise a custom AI set opened right
    // after a Bank Run / knowledge check inherits isBankRun/isTopicTest and gets
    // recorded as bank-run progress and mislabelled on the results screen.
    setIsBankRun(false)
    setIsTopicTest(false)
    setTopicArea(null)
    setDeadline(Date.now() + qs.length * MOCK_SECONDS_PER_Q * 1000); expiredRef.current = false
    resetQuestion()
    setMode("session")
  }

  function resetQuestion() {
    setAnswersMap({})
    setFlagsMap({})
    setReviewItems([])
  }

  function setAnswer(i: number, v: number | number[] | string) {
    setAnswersMap((m) => ({ ...m, [i]: v }))
  }
  function toggleFlag(i: number) {
    setFlagsMap((m) => ({ ...m, [i]: !m[i] }))
  }
  function isAnswered(i: number): boolean {
    const r = answersMap[i]
    const q = questions[i]
    if (r === undefined || !q) return false
    if (q.type === "number") return typeof r === "string" && r.trim() !== "" && !Number.isNaN(parseFloat(r.replace(/,/g, "")))
    if (q.type === "multi") return Array.isArray(r) && r.length > 0
    return typeof r === "number" && r >= 0
  }
  const answeredCount = questions.reduce((n, _q, i) => n + (isAnswered(i) ? 1 : 0), 0)

  // Exam-style finish: grade every ANSWERED question once, build the score, the
  // area log (answered-only, so the results effect can still attribute unanswered
  // questions to the clock), and the explained review, then show results.
  function finishSession() {
    setDeadline(null) // stops both the expiry timeout and the dial
    let correct = 0
    const newLog: { area: string; correct: boolean }[] = []
    const review: { q: AccaQuestion; response: number | number[] | string | undefined; correct: boolean }[] = []
    questions.forEach((q, i) => {
      const r = answersMap[i]
      let resp: number | number[] | null = null
      if (q.type === "number") {
        if (typeof r === "string" && r.trim() !== "") {
          const n = parseFloat(r.replace(/,/g, ""))
          if (!Number.isNaN(n)) resp = n
        }
      } else if (q.type === "multi") {
        if (Array.isArray(r) && r.length > 0) resp = r
      } else if (typeof r === "number") {
        resp = r
      }
      if (resp !== null) {
        const g = gradeQuestion(q, resp)
        recordAnswer(q.paper, q, g.correct)
        recordDayActive(q.paper)
        if (g.correct) correct++
        newLog.push({ area: q.area, correct: g.correct })
        review.push({ q, response: r, correct: g.correct })
      } else {
        review.push({ q, response: undefined, correct: false })
      }
    })
    /*
     * Mark the whole set SERVED now, at grading — not at composition. A session
     * the learner opens and abandons must stay available (otherwise a mis-tap
     * burns twelve questions), and a session they finished must never come back,
     * whether or not each individual question was answered.
     */
    if (paperId && sessionPool) markServed(paperId, sessionPool, questions.map((q) => q.id))
    queueAccaProgressPush()
    setCorrectCount(correct)
    setLog(newLog)
    setReviewItems(review)
    setMode("results")
  }
  finishRef.current = finishSession

  function leaveSession() {
    setDeadline(null) // stops both the expiry timeout and the dial
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
              onSection={startSectionSession}
              onBankRun={startBankRun}
              onWeak={() => startSession(true, false)}
              onMock={() => startSession(false, true)}
              onExaminer={openExaminer}
              onGenerate={openGenerate}
              onFlashcards={() => { setTopicArea(null); setMode("flashcards") }}
              onTopic={(area) => { setTopicArea(area); setIsTopicTest(false); setMode("topic") }}
              onStudyTopic={(area) => { setTopicArea(area); setStudyChapterKey(null); setIsTopicTest(false); chapterOpenedAt.current = Date.now(); setMode("brief") }}
              onEssentials={startEssentials}
              onJourney={() => setMode("journey")}
              onLoopAction={runLoopAction}
              onRefresh={() => setTick((t) => t + 1)}
              onSwitchPaper={(pid) => { setPaperId(pid); setTick((t) => t + 1); setMode("overview") }}
              /* ── the rebuilt Learning section ── */
              onStudyChapter={startStudyChapter}
              onTestChapter={startChapterTest}
              onComposed={startComposedSession}
              onOpenArticle={(article) => { setActiveArticle(article); setMode("article") }}
              initialTab={initialTab}
              onUpgrade={triggerFeaturePaywall}
            />
          )}

          {mode === "journey" && paperId && (
            <JourneyMap key="journey" paperId={paperId} onBack={() => setMode("overview")} />
          )}

          {mode === "brief" && paper && topicArea && (() => {
            const areaChapters = chaptersForArea(paper.id, topicArea)
            // A tree area with no chapter chosen yet shows its contents page.
            if (areaChapters.length > 1 && !studyChapterKey) {
              return (
                <ChapterList
                  key={`chapters-${topicArea}`}
                  paper={paper}
                  area={topicArea}
                  chapters={areaChapters}
                  onOpen={(key) => setStudyChapterKey(key)}
                  onBack={() => setMode("topic")}
                />
              )
            }
            const chapter = studyChapterKey
              ? getChapterByKey(paper.id, studyChapterKey) ?? areaChapters[0]
              : areaChapters[0]
            if (!chapter) {
              return (
                <BriefReader
                  key={`brief-${topicArea}`}
                  paper={paper}
                  area={topicArea}
                  onBack={() => setMode("topic")}
                  onLearn={() => { completePendingTodayTask(paper.id); startTopicSession(topicArea, false, LEARN_SIZE) }}
                />
              )
            }
            return (
              <StudyChapterReader
                key={`chapter-${chapterKey(chapter)}`}
                chapter={chapter}
                // Back returns to the chapter list where there is one, and to the
                // topic hub where the area holds a single chapter.
                onBack={() => {
                  if (areaChapters.length > 1) setStudyChapterKey(null)
                  else setMode("topic")
                }}
                onPractice={() => {
                  /*
                   * Reaching the end of a chapter is what "read" means. Recording
                   * it here is what lets tomorrow's plan advance to the NEXT
                   * chapter — before this, chapter-level progress did not exist at
                   * all, so the daily study block repeated the same area for days.
                   */
                  markChapterRead(paper.id, chapterKey(chapter))
                  recordChapterPace(paper.id, chapter.minutes, chapterReadMinutes())
                  markTodayTaskDone(paper.id, `study-${chapterKey(chapter)}`)
                  completePendingTodayTask(paper.id)
                  setTick((t) => t + 1)
                  setMode("overview")
                }}
              />
            )
          })()}

          {mode === "article" && paperId && activeArticle && (
            <ArticleReader
              key={`article-${activeArticle.id}`}
              article={activeArticle}
              paperId={paperId}
              onBack={() => { setActiveArticle(null); setMode("overview") }}
              onDone={() => {
                markTodayTaskDone(paperId, activeArticle.id)
                recordDayActive(paperId)
                setActiveArticle(null)
                setTick((t) => t + 1)
                setMode("overview")
              }}
            />
          )}

          {mode === "topic" && paper && topicArea && (
            <TopicView
              key={`topic-${topicArea}`}
              paper={paper}
              area={topicArea}
              onBack={() => { setTopicArea(null); setTick((t) => t + 1); setMode("overview") }}
              onBrief={() => { setStudyChapterKey(null); setMode("brief") }}
              onLearn={() => startTopicSession(topicArea, false, LEARN_SIZE)}
              onDrill={() => startTopicSession(topicArea, false)}
              onTest={() => startTopicSession(topicArea, true)}
              onFlashcards={() => setMode("flashcards")}
            />
          )}

          {mode === "session" && questions[idx] && (
            <SessionView
              q={questions[idx]}
              index={idx}
              total={questions.length}
              value={answersMap[idx]}
              isTimed
              deadline={deadline}
              timerTotal={questions.length * (isBankRun ? BANK_RUN_SECONDS_PER_Q : MOCK_SECONDS_PER_Q)}
              answeredCount={answeredCount}
              isAnswered={isAnswered}
              isFlagged={(i) => !!flagsMap[i]}
              currentFlagged={!!flagsMap[idx]}
              onChange={(v) => setAnswer(idx, v)}
              onGo={(i) => setIdx(Math.max(0, Math.min(questions.length - 1, i)))}
              onToggleFlag={() => toggleFlag(idx)}
              onFinish={finishSession}
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
              review={reviewItems}
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
          <div style={{ color: DIM, fontSize: 10.5 }}>exam readiness</div>
        </div>
        <Icon name="arrow" size={20} color={C.brand} style={{ flexShrink: 0 }} />
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
            <Icon name="arrow" size={14} color={DIM} style={{ flexShrink: 0 }} />
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
  const { user } = useAuth()
  const levels = paperLevels()
  const passed = new Set(getPassedPapers())
  const current = getCurrentPaper()
  // Free/trial learners study only their onboarding target; the rest are Pro.
  const studyingSet = getStudyingPapers()
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
                const locked = !isPassed && !canAccessPaper(user, p.id, studyingSet)
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => onPick(p.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    style={{ ...card({ textAlign: "left", cursor: "pointer", padding: 14, border: `1px solid ${isCurrent ? "#C80000" : BORDER}` }), display: "flex", alignItems: "center", gap: 13 }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: isPassed ? "var(--sch-card-2)" : IRIDESCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: isPassed ? C.green : "#fff", flexShrink: 0 }}>
                      {isPassed ? "✓" : p.id}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: 14.5, color: TEXT }}>{p.name}</span>
                        {isCurrent && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 999, background: "rgba(200,0,0,0.08)", color: "#C80000", fontWeight: 700 }}>STUDYING</span>}
                        {locked && <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, padding: "1px 7px", borderRadius: 999, background: "var(--sch-card-2)", color: MUTED, fontWeight: 700 }}><Icon name="lock" size={9} color={MUTED} /> PRO</span>}
                        {p.hasCuratedContent && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 999, background: "var(--sch-card-2)", color: MUTED, fontWeight: 700 }}>BANK</span>}
                      </div>
                      <div style={{ color: DIM, fontSize: 11.5, marginTop: 1 }}>{p.code}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      {isPassed ? (
                        <span style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>Passed</span>
                      ) : locked ? (
                        <Icon name="lock" size={15} color={DIM} />
                      ) : stats.answered > 0 ? (
                        <span style={{ fontSize: 14, fontWeight: 800, ...iriText }}>{stats.readiness}%</span>
                      ) : (
                        <Icon name="chevron" size={16} color={DIM} />
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

// The study section split into four clear, low-clutter parts, driven by the
// onboarding results — Today (what to do now), Plan (dates + phases),
// Practice (every study/drill mode), Progress (readiness + mocks).
type StudyTab = "today" | "plan" | "practice" | "progress"
const STUDY_TABS: { key: StudyTab; label: string; icon: IconName }[] = [
  { key: "today", label: "Today", icon: "mission" },
  { key: "plan", label: "Plan", icon: "calendar" },
  { key: "practice", label: "Practice", icon: "practice" },
  { key: "progress", label: "Progress", icon: "stats" },
]

function Overview({
  paper,
  isPro,
  onBack,
  onPractice,
  onSection,
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
  onStudyChapter,
  onTestChapter,
  onComposed,
  onOpenArticle,
  onUpgrade,
  initialTab,
}: {
  paper: AccaPaper
  isPro: boolean
  onBack: () => void
  onPractice: () => void
  onSection: (section: "A" | "B" | "C") => void
  onBankRun: (size?: MixedBankSize) => void
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
  onStudyChapter: (chapterKey: string, area: string) => void
  onTestChapter: (chapterKey: string, area: string, count: number) => void
  onComposed: (qs: AccaQuestion[], pool: PoolKind, area: string | null, timed?: boolean) => void
  onOpenArticle: (article: TechArticle) => void
  onUpgrade: () => void
  /** Tab named by a ?tab= deep link (the Dashboard CTA, the congratulation email). */
  initialTab: StudyTab | null
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
  /*
   * `initialTab` seeds the state rather than driving it, because the learner must
   * stay in control after they arrive: a deep link chooses where they LAND, and
   * every tap after that is theirs. Syncing the tab to the prop would snap them
   * back to `plan` on the next re-render.
   */
  const [tab, setTab] = useState<StudyTab>(initialTab ?? "today")
  const days = daysUntilExam(paper.id)
  const studyPlan = generateStudyPlan(paper.id)
  const mocks = getMockHistory(paper.id)
  const phase = currentPhase(paper.id)
  // The journey loop: the 60% gate on the exam room + the exam-day decision point.
  const gate = mockGate(paper.id)
  const examDue = examDayDue(paper.id)
  const stage = currentStage(paper.id)
  const recovery = recoveryState(paper.id)
  /*
   * The old action-based today plan (buildTodayPlan → runToday → MissionTasks) is
   * gone from this screen. It built a SECOND definition of today alongside the
   * composer's, in a different vocabulary (actions and syllabus areas rather than
   * blocks and chapters), and the two disagreed on the counts, the topic and on
   * what "done" meant. Today's blocks now come from acca-today-composer, and
   * runComposedBlock below is the single launcher. See the composed-day block.
   */

  // Sequential unlock — only the first unfinished task is active; later ones wait.
  // On mount, resolve any task the learner just returned from (runToday stamped
  // it "pending" before launching), which marks it done and reveals the next.
  const [todayDone, setTodayDone] = useState<string[]>(() => getTodayDone(paper.id))
  useEffect(() => {
    resolvePendingTodayTask(paper.id)
    setTodayDone(getTodayDone(paper.id))
  }, [paper.id])

  /* ── The composed day ───────────────────────────────────────────
   *
   * Today's five blocks come from acca-today-composer, which has ALREADY selected
   * the exact questions and cards (and claimed them against the no-repeat ledger).
   * So launching a block hands over that set rather than rebuilding one — which is
   * what makes the count on the card true.
   */
  const todayComposition = useMemo(() => composeToday(paper.id, /* dryRun */ true), [paper.id, todayDone.length])
  const todayDayProgress = dayProgress(paper.id, todayComposition, todayDone)
  const dayIsComplete = todayDayProgress.complete

  function runComposedBlock(block: TodayBlock, composition: TodayComposition) {
    switch (block.kind) {
      case "study":
        if (block.chapterKey && composition.chapter) onStudyChapter(block.chapterKey, composition.chapter.area)
        else onPractice()
        return
      case "quiz":
        setPendingTodayTask(paper.id, block.id)
        onComposed(composition.quiz, "quiz", block.area ?? null)
        return
      case "practice":
        setPendingTodayTask(paper.id, block.id)
        onComposed(composition.practice, "practice", block.area ?? null)
        return
      case "flashcards":
        setPendingTodayTask(paper.id, block.id)
        onFlashcards()
        return
      case "article":
        if (composition.article) onOpenArticle(composition.article)
        return
    }
  }

  /*
   * The day just completed. Three things happen exactly once: the streak advances
   * through the shield scheme, Charles's congratulation email goes out with
   * tomorrow's start time and topic, and the confetti fires. recordDayComplete is
   * idempotent per calendar day, so a reload cannot repeat any of it.
   */
  function handleDayComplete(composition: TodayComposition) {
    const result = recordDayComplete(paper.id)
    if (!result.firstTime) return
    trackEvent("day_completed", { paper: paper.id, streak: result.streak, minutes: composition.totalMinutes })
    void import("canvas-confetti").then((m) => {
      m.default({ particleCount: result.milestone ? 160 : 90, spread: 78, origin: { y: 0.65 }, disableForReducedMotion: true })
    }).catch(() => { /* confetti is decoration — never let it break the day */ })
    if (!congratulationSent(paper.id)) {
      const gate = tomorrowGate(paper.id)
      const preview = composeToday(paper.id, true)
      void notifyDayComplete({
        paperId: paper.id,
        streak: result.streak,
        nextStartTime: `${`${gate.unlocksAt.getHours()}`.padStart(2, "0")}:${`${gate.unlocksAt.getMinutes()}`.padStart(2, "0")}`,
        nextTopic: preview.chapter?.title ?? "",
        minutes: composition.totalMinutes,
        questions: composition.quiz.length + composition.practice.length,
      }).then((ok) => {
        if (ok) markCongratulationSent(paper.id)
      })
    }
  }

  // "Locked In" focus mode: full-focus takeover with a countdown. It persists in
  // localStorage, so launching a task (which unmounts this view) and coming back
  // keeps the session running; the corner timer resumes from the time left.
  const [lockedIn, setLockedIn] = useState(() => focusSecondsLeft() > 0)
  const [focusLeft, setFocusLeft] = useState(() => focusSecondsLeft())
  useEffect(() => {
    if (!lockedIn) return
    resumeFocusSession()
    const tick = () => {
      const left = focusSecondsLeft()
      setFocusLeft(left)
      if (left <= 0) {
        clearFocusSession()
        setLockedIn(false)
      }
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => {
      window.clearInterval(id)
      pauseFocusSession()
    }
  }, [lockedIn])
  function enterLockedIn() {
    startFocusSession(plan.dailyMinutes || 60)
    setFocusLeft((plan.dailyMinutes || 60) * 60)
    setLockedIn(true)
  }
  function exitLockedIn() {
    clearFocusSession()
    setLockedIn(false)
  }
  // Charles's honest exam-timing read, from readiness vs target + daily pace.
  const targetProb = plan.targetProb ?? 75
  const examTimingLine =
    prob === null
      ? `Do today's plan and take the diagnostic — then I'll tell you when to book ${paper.id}.`
      : prob >= targetProb && gate.unlocked
        ? `You're at ${prob}%, above your ${targetProb}% target — you're in sitting range. Prove it across the mocks, then book ${paper.id}.`
        : prob >= targetProb
          ? `You're at ${prob}% — above target on knowledge. Clear the mock gate and you're ready to book ${paper.id}.`
          : `You're at ${prob}% vs a ${targetProb}% target. At ${plan.dailyMinutes || 60} min/day, keep the loop — I'll green-light your ${paper.id} sitting the moment your readiness holds there.`
  /*
   * Today-mission completion — read from the COMPOSED day (acca-today-composer),
   * which is the same source the Today board, the Locked In overlay and tomorrow's
   * preview all render from.
   *
   * It used to be counted from a second, independently-built plan. Two sources of
   * truth for "what is today" is how the board came to say "12 practice questions
   * on chapter BT-04" while the focus overlay said "practise 8 — area A focus", and
   * how the celebration could fire on one definition of done and not the other.
   */
  const missionDone = todayDayProgress.done
  const missionTotal = todayDayProgress.total
  const missionPct = todayDayProgress.percent
  const [showMissionCelebration, setShowMissionCelebration] = useState(false)
  useEffect(() => {
    if (missionPct < 100) return
    const now = new Date()
    const day = `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, "0")}-${`${now.getDate()}`.padStart(2, "0")}`
    const key = `scholify-mission-celebrated-${paper.id}-${day}`
    try {
      if (window.localStorage.getItem(key)) return
      window.localStorage.setItem(key, "1")
    } catch { /* a private session can still celebrate */ }
    recordDayActive(paper.id)
    trackEvent("daily_mission_completed", { paper: paper.id, tasks: missionTotal, readiness: prob })
    setShowMissionCelebration(true)
  }, [missionPct, missionTotal, paper.id, prob])

  // Keep the Pass Momentum trend fed even on read-only visits.
  useEffect(() => {
    snapshotProbability(paper.id)
  }, [paper.id])

  function updateExamDate(date: string) {
    setPlanState(setPlan(paper.id, { examDate: date || null }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <DailyMissionCelebration
        open={showMissionCelebration}
        paperId={paper.id}
        paperName={paper.name}
        streak={shieldState(paper.id).streak}
        readiness={prob}
        targetReadiness={plan.targetProb ?? 75}
        daysToExam={days}
        completedTasks={missionTotal}
        onClose={() => setShowMissionCelebration(false)}
        onRoadmap={() => { setShowMissionCelebration(false); setTab("plan") }}
      />
      {/* ── "Locked In" — full-focus takeover: only today's mission on screen,
          an animated countdown in the corner. Covers the app chrome; returns
          when the timer's done (or Exit). Persists across launching a task. ── */}
      {lockedIn && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "var(--sch-bg)", overflowY: "auto" }}>
          <div style={{ position: "fixed", top: 16, right: 16, zIndex: 1210, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <CircleTimer secondsLeft={focusLeft} totalSeconds={(plan.dailyMinutes || 60) * 60} size={78} />
            <button onClick={exitLockedIn} style={{ fontSize: 11, fontWeight: 700, color: DIM, background: "transparent", border: "none", cursor: "pointer" }}>Exit</button>
          </div>
          <div style={{ width: "100%", maxWidth: 520, margin: "0 auto", padding: "44px 20px 48px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <CharlesMascot pose="present" size="clamp(76px, 24vw, 92px)" />
            </div>
            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: "#C80000" }}><Icon name="lock" size={13} color="#C80000" /> LOCKED IN</div>
              <div style={{ fontSize: 20, fontWeight: 850, color: TEXT, marginTop: 6 }}>Full focus — today's mission only</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 4, lineHeight: 1.5 }}>Work each step. Everything else comes back when the timer's done.</div>
            </div>
            {/*
              The SAME board the Today tab renders. Locked In is a frame around the
              day — a countdown and no chrome — not a second rendering of it, because
              a second rendering is a second definition of what today contains.
            */}
            <TodayBoard
              paperId={paper.id}
              paperName={paper.name}
              firstName={firstName}
              done={todayDone}
              onRun={runComposedBlock}
              onArticle={onOpenArticle}
              onDayComplete={handleDayComplete}
            />
          </div>
        </div>
      )}
      <button onClick={onBack} style={backBtn}>← All papers</button>
      <StudyCommandHero
        paperId={paper.id}
        paperName={paper.name}
        paperCode={paper.code}
        level={paper.level}
        readiness={prob}
        missionPercent={missionPct}
        answered={stats.answered}
        daysToExam={days}
        dailyMinutes={plan.dailyMinutes || 60}
        onStart={enterLockedIn}
      />

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

      {/* study tabs — the section split into Today / Plan / Practice / Progress */}
      <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--sch-card-2)", borderRadius: 14, marginBottom: 16 }}>
        {STUDY_TABS.map((tb) => {
          const on = tab === tb.key
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              style={{ flex: 1, minWidth: 0, padding: "9px 4px", borderRadius: 10, border: "none", cursor: "pointer", background: on ? CARD : "transparent", color: on ? "#C80000" : MUTED, boxShadow: on ? "0 1px 2px rgba(51,43,40,0.07)" : "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 700, transition: "color .15s, background .15s" }}
            >
              <Icon name={tb.icon} size={15} color={on ? "#C80000" : DIM} />
              <span>{tb.label}</span>
            </button>
          )
        })}
      </div>

      {tab === "today" && (
      <motion.div key="today-tab" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {/* The day itself — one topic, five ways. See TodayBoard. */}
        <TodayBoard
          paperId={paper.id}
          paperName={paper.name}
          firstName={firstName}
          done={todayDone}
          onRun={runComposedBlock}
          onArticle={onOpenArticle}
          onDayComplete={handleDayComplete}
        />

        {/* Locked In stays available as an OPTION, not the only way in. */}
        {!dayIsComplete && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={enterLockedIn}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
              padding: "11px 18px",
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              background: CARD,
              color: TEXT,
              fontWeight: 750,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <Icon name="mock" size={15} color="#C80000" /> Work it in Locked In mode ({plan.dailyMinutes || 60} min)
          </motion.button>
        )}
      </motion.div>
      )}

      {tab === "progress" && (
        <ProgressBoard
          key="progress-tab"
          paperId={paper.id}
          isPro={isPro}
          onDiagnostic={() => navigate("/study/diagnostic")}
          onFullAnalytics={() => navigate("/study/analytics")}
          onWeak={onWeak}
          onUpgrade={onUpgrade}
        />
      )}

      {tab === "plan" && (
        <PlanBoard
          key="plan-tab"
          paperId={paper.id}
          paperName={paper.name}
          onRefresh={onRefresh}
          onJourney={onJourney}
          onSwitchPaper={onSwitchPaper}
        />
      )}

      {tab === "practice" && (
        <PracticeHub
          key="practice-tab"
          paperId={paper.id}
          isPro={isPro}
          onStudyChapter={onStudyChapter}
          onTestChapter={onTestChapter}
          onArea={(area) => onStudyTopic(area)}
          onWeak={onWeak}
          onSection={onSection}
          onBankRun={(size) => onBankRun(size as MixedBankSize | undefined)}
          onMock={onMock}
          onExaminer={onExaminer}
          onGenerate={onGenerate}
          onFlashcards={() => onFlashcards()}
        />
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
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 750, color: DIM, flexShrink: 0 }}>accaglobal.com <Icon name="arrow" size={12} color={DIM} /></span>
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
                    <Icon name="done" size={13} color={C.green} />
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
  if (t.state === "mastered") return { icon: "done", ring: C.green, sub: `Mastered · best ${Math.round(t.best * 100)}%` }
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
                  : <Icon name={v.icon} size={18} color={t.state === "mastered" ? C.green : "#C80000"} />}
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

/* ── Chapter list: the contents page of one syllabus area ─────────
 * Shown only where an area holds MORE than one chapter. A paper with one
 * chapter per area skips this entirely and opens the reader directly, so the
 * experience on those papers is byte-identical to before.
 */

function ChapterList({
  paper, area, chapters, onOpen, onBack,
}: {
  paper: AccaPaper
  area: string
  chapters: StudyChapter[]
  onOpen: (key: string) => void
  onBack: () => void
}) {
  const areaInfo = paper.areas.find((a) => a.code === area)
  const totalMinutes = chapters.reduce((total, c) => total + c.minutes, 0)
  const totalSections = chapters.reduce((total, c) => total + c.sections.length, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={backBtn}>← Topic</button>
      <p style={{ color: DIM, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, margin: "0 0 4px" }}>
        {paper.id} · AREA {area} · STUDY TEXT
      </p>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px", color: TEXT, lineHeight: 1.25 }}>{areaInfo?.label ?? area}</h1>
      <p style={{ color: MUTED, margin: "0 0 18px", fontSize: 13.5, lineHeight: 1.55 }}>
        {chapters.length} chapters · {totalSections} sections · about {totalMinutes} minutes of reading.
        Work through them in order — each one builds on the last.
      </p>

      <div style={{ display: "grid", gap: 10 }}>
        {chapters.map((chapter, index) => {
          const key = chapterKey(chapter)
          return (
            <motion.button
              key={key}
              onClick={() => onOpen(key)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.995 }}
              style={{
                ...card({ padding: 15 }),
                display: "flex",
                alignItems: "flex-start",
                gap: 13,
                textAlign: "left",
                border: `1px solid var(--sch-border)`,
                cursor: "pointer",
                width: "100%",
              }}
            >
              <span style={{
                flex: "none", width: 30, height: 30, borderRadius: 9,
                background: "var(--sch-card-2)", color: "#C80000",
                fontSize: 13, fontWeight: 800, display: "grid", placeItems: "center",
                fontVariantNumeric: "tabular-nums",
              }}>
                {chapter.number ?? index + 1}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontWeight: 750, fontSize: 14.5, color: TEXT, lineHeight: 1.3 }}>
                  {chapter.title}
                </span>
                <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>
                  {chapter.sections.length} sections · {chapter.minutes} min
                  {chapter.syllabusRefs && chapter.syllabusRefs.length > 0 && ` · ${chapter.syllabusRefs[0]}–${chapter.syllabusRefs[chapter.syllabusRefs.length - 1]}`}
                </span>
              </span>
              <Icon name="chevron" size={16} color={DIM} />
            </motion.button>
          )
        })}
      </div>
    </motion.div>
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
  // A tree area holds several chapters; the tile then advertises the whole
  // reading list and its total time rather than one chapter's.
  const areaChapters = chaptersForArea(paper.id, area)
  const areaMinutes = areaChapters.reduce((total, item) => total + item.minutes, 0)

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
          title={
            areaChapters.length > 1
              ? `${areaChapters.length} study chapters · ${areaMinutes} min`
              : chapter
                ? `Study chapter · ${chapter.minutes} min`
                : brief
                  ? `Topic brief · ${brief.minutes} min read`
                  : "Topic brief"
          }
          sub={
            areaChapters.length > 1
              ? "This syllabus area is taught as a full reading list — one chapter per topic, each with theory, worked examples, activities, exam traps and a knowledge diagnostic"
              : chapter
                ? "Full theory, worked examples, interactive diagrams, exam traps and quick checks — learn every aspect here first"
                : "The concept, the formulas, one worked example, and the classic traps — read this first"
          }
          onClick={onBrief}
          primary={(areaStats?.seen ?? 0) === 0}
        />
      </div>

      <h3 style={sectionH}>2 · QUIZZES</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        <ModeTile icon="practice" title={`${LEARN_SIZE} Quizzes — guided`} sub="Unlocked after the lesson, with instant marking, explanations and Ask Charles" onClick={onLearn} primary={!result.mastered && (areaStats?.seen ?? 0) > 0 && (areaStats?.seen ?? 0) < LEARN_SIZE} />
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
          <span style={{ fontSize: 12.5, fontWeight: 800, color: (areaStats?.seen ?? 0) >= 65 ? C.green : TEXT, fontVariantNumeric: "tabular-nums" }}>{Math.min(65, areaStats?.seen ?? 0)} / 65</span>
        </div>
        <div style={{ height: 7, background: "var(--sch-card-2)", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, ((areaStats?.seen ?? 0) / 65) * 100)}%` }} transition={{ duration: 0.8 }} style={{ height: "100%", background: (areaStats?.seen ?? 0) >= 65 ? C.green : IRIDESCENT, borderRadius: 999 }} />
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
        <Button onClick={onLearn} size="lg" full>Start {LEARN_SIZE} Quizzes</Button>
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
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: sec.kind === "traps" ? C.red : C.brand, marginBottom: 8 }}>
                <Icon name={meta.icon} size={14} color={sec.kind === "traps" ? C.red : C.brand} /> {meta.label}
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
          Complete lesson — unlock {LEARN_SIZE} Quizzes <Icon name="arrow" size={17} color="#fff" />
        </Button>
        <p style={{ fontSize: 11.5, color: DIM, textAlign: "center", margin: "10px 0 0" }}>
          Reaching this point completes the lesson and unlocks today&apos;s Quizzes.
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
          Qualifying mock
          <Badge tone="amber">UNLOCKS AT {MOCK_GATE}%</Badge>
        </div>
        <div style={{ fontSize: 12.5, color: MUTED, margin: "4px 0 8px" }}>
          You're at <b style={{ color: TEXT }}>{prob}%</b> Exam Readiness Score — I'm steering your daily plan at your weak
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
      <Icon name="chevron" size={18} color={DIM} style={{ flexShrink: 0 }} />
    </motion.button>
  )
}

/* ── Session (one question) ───────────────────────────────────── */

function fmtTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${`${sec}`.padStart(2, "0")}`
}

/* Animated circular countdown — the "Locked In" corner timer. */
function CircleTimer({ secondsLeft, totalSeconds, size = 72 }: { secondsLeft: number; totalSeconds: number; size?: number }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const pct = totalSeconds > 0 ? Math.min(1, (totalSeconds - secondsLeft) / totalSeconds) : 0
  const done = secondsLeft <= 0
  const mm = Math.floor(secondsLeft / 60)
  const ss = secondsLeft % 60
  const low = secondsLeft > 0 && secondsLeft <= 60
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sch-card-2)" strokeWidth={6} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={done ? C.green : low ? C.red : "#C80000"} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={circ}
          animate={{ strokeDashoffset: circ * (1 - pct) }}
          transition={{ duration: 0.6, ease: "linear" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <motion.div
        animate={low ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
        transition={{ duration: 1, repeat: low ? Infinity : 0 }}
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      >
        <span style={{ fontSize: size * 0.24, fontWeight: 850, color: done ? C.green : TEXT, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
          {done ? "✓" : `${mm}:${String(ss).padStart(2, "0")}`}
        </span>
      </motion.div>
    </div>
  )
}

/* The today-mission task list + optional ACCA technical article — shared by the
 * normal Today card and the Locked-In focus overlay so both stay in sync. */
/**
 * NO LONGER MOUNTED — replaced by TodayBoard (components/acca/TodayBoard).
 *
 * It rendered the action-based today list ("Practise 8 questions — A focus"), a
 * second definition of today alongside the composer’s chapter-based one. Do not
 * wire it back in: two renderings of one day is how the board and the Locked In
 * overlay came to show different counts for the same afternoon.
 */
function MissionTasks({
  tasks, done, activeIdx, mins, icons, onRun, techArticle, articleMinutes, articleDone, onArticle, paperId,
}: {
  tasks: TodayTask[]
  done: string[]
  activeIdx: number
  mins: number[]
  icons: Record<TodayAction, IconName>
  onRun: (t: TodayTask) => void
  techArticle?: { title: string; detail: string; url: string }
  articleMinutes: number
  articleDone: boolean
  onArticle: () => void
  paperId: string
}) {
  const articleLocked = activeIdx !== -1
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map((t, i) => {
          const isDone = done.includes(t.id)
          const isActive = i === activeIdx
          const locked = activeIdx !== -1 && i > activeIdx
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={locked ? undefined : { x: 2 }}
              whileTap={locked ? undefined : { scale: 0.99 }}
              aria-disabled={locked}
              onClick={() => { if (!locked) onRun(t) }}
              style={{
                display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "12px 14px", borderRadius: 12,
                cursor: locked ? "default" : "pointer", opacity: locked ? 0.6 : 1,
                border: `1px solid ${isActive ? "rgba(200,0,0,0.3)" : isDone ? C.green : BORDER}`,
                background: isActive ? "rgba(200,0,0,0.05)" : "var(--sch-bg)",
              }}
            >
              <IconBadge name={isDone ? "done" : icons[t.action]} tone={isActive ? "brand" : "neutral"} size={38} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: TEXT }}>
                  {i + 1}. {t.title}
                </span>
                <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 1 }}>
                  {locked ? "Finish the step above to unlock this" : `${t.detail} · ~${mins[i] ?? MISSION_MINUTES[t.action]} min`}
                </span>
              </span>
              {isDone ? (
                <Icon name="done" size={18} color={C.green} style={{ flexShrink: 0 }} />
              ) : isActive ? (
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", background: IRIDESCENT, padding: "4px 10px", borderRadius: 999, flexShrink: 0 }}>START</span>
              ) : locked ? (
                <Icon name="lock" size={16} color={DIM} style={{ flexShrink: 0 }} />
              ) : null}
            </motion.button>
          )
        })}
      </div>
      {techArticle && (
        <motion.a
          href={techArticle.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={articleLocked}
          onClick={(event) => {
            if (articleLocked) {
              event.preventDefault()
              return
            }
            onArticle()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", marginTop: 8, padding: "12px 14px", borderRadius: 12, border: `1px dashed ${articleDone ? C.green : BORDER}`, background: "var(--sch-bg)", opacity: articleLocked ? 0.6 : 1, cursor: articleLocked ? "default" : "pointer" }}
        >
          <IconBadge name={articleDone ? "done" : "learn"} tone={articleDone ? "green" : "neutral"} size={38} />
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: TEXT }}>
              {tasks.length + 1}. Technical Article <span style={{ fontSize: 11, fontWeight: 700, color: DIM }}>· ACCA official</span>
            </span>
            <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 1 }}>{articleLocked ? "Finish the step above to unlock this" : `Examining-team explainer for ${paperId} · ~${articleMinutes} min`}</span>
          </span>
          {articleDone ? <Icon name="done" size={16} color={C.green} style={{ flexShrink: 0 }} /> : <Icon name="arrow" size={14} color={DIM} style={{ flexShrink: 0 }} />}
        </motion.a>
      )}
    </>
  )
}

function SessionView({
  q, index, total, value, isTimed, deadline, timerTotal, answeredCount,
  isAnswered, isFlagged, currentFlagged, onChange, onGo, onToggleFlag, onFinish, onQuit,
}: {
  q: AccaQuestion
  index: number
  total: number
  value: number | number[] | string | undefined
  isTimed: boolean
  deadline: number | null
  timerTotal: number
  answeredCount: number
  isAnswered: (i: number) => boolean
  isFlagged: (i: number) => boolean
  currentFlagged: boolean
  onChange: (v: number | number[] | string) => void
  onGo: (i: number) => void
  onToggleFlag: () => void
  onFinish: () => void
  onQuit: () => void
}) {
  // Controlled by the parent's per-index answer store — jumping back restores
  // the pick. Exam-style: nothing grades here; the map + Finish do the work.
  const numStr = typeof value === "string" ? value : ""
  const single = typeof value === "number" ? value : null
  const multi = Array.isArray(value) ? value : []
  const pct = total > 0 ? (answeredCount / total) * 100 : 0

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
      {isTimed && <ProCountdown deadline={deadline} totalSeconds={Math.max(1, timerTotal)} label="Practice" />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={onQuit} style={{ ...backBtn, marginBottom: 0 }}>← Exit</button>
        <span style={{ color: DIM, fontSize: 13, fontWeight: 600 }}>Question {index + 1} / {total}</span>
        {/* The urgency cue lives in ProCountdown (red ring, pulse, "FINAL PUSH").
            Tinting this label too meant the whole page needed the remaining
            seconds every second — the cost of that outweighed a second signal. */}
        <span style={{ color: DIM, fontSize: 12, fontWeight: 600 }}>Area {q.area}</span>
      </div>

      <div style={{ height: 6, background: "var(--sch-card-2)", borderRadius: 999, marginBottom: 22, overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} style={{ height: "100%", background: IRIDESCENT, borderRadius: 999 }} />
      </div>

      <div style={card({ padding: 22 })}>
        {q.type === "multi" && (
          <div style={{ fontSize: 11, fontWeight: 700, color: DIM, marginBottom: 8, letterSpacing: 0.4 }}>SELECT ALL THAT APPLY</div>
        )}
        <p style={{ fontSize: 17, lineHeight: 1.55, color: TEXT, fontWeight: 550, margin: "0 0 20px" }}>{q.stem}</p>

        {q.type === "number" ? (
          <input
            type="text"
            inputMode="decimal"
            value={numStr}
            onChange={(e) => onChange(e.target.value)}
            placeholder={q.unit ? `Enter amount (${q.unit})` : "Enter your answer"}
            style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 16, borderRadius: 12, border: `1.5px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, outline: "none" }}
          />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {q.options?.map((opt, i) => {
              const picked = q.type === "multi" ? multi.includes(i) : single === i
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (q.type === "multi") onChange(multi.includes(i) ? multi.filter((x) => x !== i) : [...multi, i].sort((a, b) => a - b))
                    else onChange(i)
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${picked ? "#C80000" : BORDER}`, background: picked ? "rgba(200,0,0,0.06)" : CARD, color: TEXT, fontSize: 15, cursor: "pointer", transition: "border-color .15s, background .15s" }}
                >
                  <span style={{ width: 26, height: 26, borderRadius: q.type === "multi" ? 7 : 999, border: `1.5px solid ${picked ? "#C80000" : BORDER}`, background: picked && q.type === "multi" ? "#C80000" : "transparent", color: picked && q.type === "multi" ? "#fff" : TEXT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                    {q.type === "multi" ? (picked ? "✓" : "") : String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <QuestionNavBar
        cursor={index}
        total={total}
        answeredCount={answeredCount}
        isAnswered={isAnswered}
        isFlagged={isFlagged}
        currentFlagged={currentFlagged}
        onGo={onGo}
        onToggleFlag={onToggleFlag}
        onFinish={onFinish}
        finishLabel={isTimed ? "Submit" : "Finish & see answers"}
      />
    </motion.div>
  )
}

/* ── Results ──────────────────────────────────────────────────── */

/** Human text for a learner's stored answer in the review list. */
function reviewAnswerText(q: AccaQuestion, r: number | number[] | string | undefined): string {
  if (r === undefined || r === "") return "—"
  if (q.type === "number") return String(r)
  if (Array.isArray(r)) return r.map((i) => q.options?.[i] ?? String(i)).join(", ")
  if (typeof r === "number") return q.options?.[r] ?? String(r)
  return String(r)
}
/** Human text for the correct answer in the review list. */
function reviewCorrectText(q: AccaQuestion): string {
  if (q.type === "number") return q.numericAnswer !== undefined && q.numericAnswer !== null ? String(q.numericAnswer) : "—"
  const c = q.correct
  if (Array.isArray(c)) return c.map((i) => q.options?.[i] ?? String(i)).join(", ")
  if (typeof c === "number") return q.options?.[c] ?? String(c)
  return "—"
}

function Results({
  paper, correct, total, isMock, isBankRun = false, isTopicTest, topicArea, log, review = [], onAgain, onOverview, onAction,
}: {
  paper: AccaPaper
  correct: number
  total: number
  isMock: boolean
  isBankRun?: boolean
  isTopicTest?: boolean
  topicArea?: string | null
  log: { area: string; correct: boolean }[]
  review?: { q: AccaQuestion; response: number | number[] | string | undefined; correct: boolean }[]
  onAgain: () => void
  onOverview: () => void
  onAction: (a: PostMortemAction) => void
}) {
  // Bank-run number: the parent records the run in an effect AFTER first
  // paint, so a live read here would show the PREVIOUS count. Capture the
  // pre-record count at mount: this run is number (done + 1).
  const bankRunNo = useMemo(
    () => (isBankRun ? Math.min(bankRunProgress(paper.id).done + 1, bankRunTarget(paper.id)) : 0),
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
      {/* Charles reacts to the result — celebrating a pass, steady after a miss */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <CharlesMascot pose={passed ? "success" : "calm"} size="clamp(80px, 26vw, 96px)" />
      </div>
      <div style={{ fontSize: 13, color: DIM, letterSpacing: 0.4, fontWeight: 600, marginBottom: 14 }}>
        {isTopicTest ? `KNOWLEDGE CHECK · TOPIC ${topicArea}` : isMock ? "MOCK EXAM RESULT" : isBankRun ? `BANK RUN ${bankRunNo} OF ${bankRunTarget(paper.id)} COMPLETE` : "PRACTICE COMPLETE"}
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

      {/* Answers & explanations — the exam-style review, every question in order */}
      {review.length > 0 && (
        <div style={{ maxWidth: 560, margin: "0 auto 24px", textAlign: "left" }}>
          <h3 style={{ ...sectionH, textAlign: "center" }}>ANSWERS &amp; EXPLANATIONS</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {review.map((it, i) => {
              const answered = it.response !== undefined && it.response !== ""
              return (
                <div key={i} style={{ ...card({ padding: 14 }), borderLeft: `3px solid ${it.correct ? C.green : answered ? C.red : BORDER}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Icon name={it.correct ? "done" : "close"} size={15} color={it.correct ? C.green : answered ? C.red : DIM} />
                    <span style={{ fontSize: 12, fontWeight: 800, color: it.correct ? C.green : answered ? C.red : DIM }}>
                      Q{i + 1} · {it.correct ? "Correct" : answered ? "Incorrect" : "Not answered"}
                    </span>
                  </div>
                  <div style={{ fontSize: 13.5, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{it.q.stem}</div>
                  {answered && !it.correct && (
                    <div style={{ fontSize: 12.5, color: MUTED }}>Your answer: {reviewAnswerText(it.q, it.response)}</div>
                  )}
                  <div style={{ fontSize: 12.5, color: MUTED }}>
                    Correct answer: <span style={{ color: C.green, fontWeight: 700 }}>{reviewCorrectText(it.q)}</span>
                  </div>
                  {it.q.explanation && (
                    <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.5, marginTop: 6 }}>{it.q.explanation}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

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
