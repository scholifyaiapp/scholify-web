import { useCallback, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import confetti from "canvas-confetti"
import { useAuth } from "@/lib/auth"
import { Icon, type IconName } from "@/components/acca/ui"
import { ScholifyMark } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { paperLevels, setPassedPapers, setStudyingPapers } from "@/lib/acca-qualification"
import { METHOD_PHASES, setPlan } from "@/lib/acca-plan"
import { paperWorkHours } from "@/lib/acca-topic-plan"
import { setDailyGoal } from "@/lib/acca"
import { WEEK_DAYS, defaultStudyDays } from "@/lib/acca-plan"
import { GOAL_OPTIONS, setGoal, setExperience, getExperience, setStartMode, isAccaOnboarded, markAccaOnboarded, setPaperVariant, type Goal, type PaperVariant } from "@/lib/acca-profile"
import { trackEvent } from "@/lib/analytics"
import { persistAccountSetup } from "@/lib/account-state"
import { DurationPicker } from "@/components/ui/duration-picker"
import { ExamCalendar } from "@/components/ui/exam-calendar"
// Nothing from acca-study-resources is imported here any more: onboarding no
// longer collects a third-party study resource. See the note on visibleSteps.
import {
  analyseResultPdf,
  analyseEnglishCertificate,
  RESULT_PDF_MAX_BYTES,
  useUploadedResult,
  type ResultUploadAnalysis,
} from "@/lib/acca-result-upload"
import {
  saveLearnerBaseline,
  type CefrLevel,
  type EnglishEvidence,
  type LearnerRoute,
  type AssessmentPath,
} from "@/lib/acca-learner-baseline"
import { shapeDay } from "@/lib/acca-schedule"
import { registerPracticeTime } from "@/lib/reminders"
import { buildOnboardingGuide, MIN_DAILY_MINUTES, TARGET_DAILY_MINUTES, type GuideFix, type OnboardingGuide } from "@/lib/acca-onboarding-guide"
import { onboardingSteps, SLIDE_POSES, STEP_LABELS, TIME_STEP, EXAM_DATE_STEP, PAPER_STEP, GOAL_STEP } from "@/lib/acca-onboarding-steps"
import { AnimatedHeadline, GlassButton, RouteClimb } from "@/components/acca/onboarding-ui"
import { CapacityPlan, MinutesNudge } from "@/components/acca/CapacityPlan"
import { OnboardingStepper } from "@/components/acca/OnboardingStepper"
import { readOnboardingDraft, saveOnboardingDraft, clearOnboardingDraft } from "@/lib/acca-onboarding-draft"
import ZeroPlanReveal from "@/components/acca/ZeroPlanReveal"
import {
  ChoiceCard,
  ChoiceGroup,
  ChoicePill,
  ChoiceTile,
  FieldLabel,
  TogglePill,
} from "@/components/acca/onboarding-choice-ui"

/*
 * /welcome — post-sign-in onboarding, implemented from the approved design
 * export ("Scholify post-sign-in onboarding", 2026-07-09).
 *
 *   0 hero → 1 target paper → 2 resources → 3 daily time → 4 exam date
 *   → 5 goal → 6 ready
 *   → /study/diagnostic?next=paywall → results → trial paywall → /dashboard
 *
 * Mobile (≤900px): single-column phone layout, photo hero on the welcome
 * screen, pinned CTA, mono counter "01 / 08" (the funnel is 8 steps —
 * diagnostic is 07, the trial paywall 08).
 * Desktop: 55/45 split-screen — question panel left, visual panel right
 * (photo or branded circuit illustration, crossfading per step).
 *
 * ACCA exam logic: BT·MA·FA·LW are on-demand CBEs (any date); all other
 * papers are session exams — Mar/Jun/Sep/Dec, exam week = first full
 * Mon–Fri week of the month.
 */

/* ── design tokens (from the design export) ──────────────────── */
const INK = "#14141A"
const BODY = "#5F584F"
const SUB = "#6B6259"
const META = "#7A7168"
const MUTE = "#8B837C"
const FAINT = "#A79E96"
const GHOST = "#B9B0A8"
const HINT = "#C3BAB2"
const RED = "#C80000"
/* Brand Board secondary — the gradient partner to RED, used by the method
   phase bar on step 1 so it matches the loop diagram's own palette. */
const MAGENTA = "#E50068"
const GREEN = "#0E9F6E"
const BORDER = "#ECE4DE"
const TRACK = "#EAE2DB"
const PAGE = "#FAFAF7"
const PANEL = "#F6F1ED"
const MONO = "'JetBrains Mono', ui-monospace, monospace"
const SANS = "'Plus Jakarta Sans', sans-serif"

const ON_DEMAND = new Set(["BT", "MA", "FA", "LW"])
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface Sitting {
  label: string // "September 2026"
  week: string // "7–11 Sep"
  date: string // nominal Wednesday of exam week
}

function nextSittings(count = 3): Sitting[] {
  const SITTING_MONTHS = [2, 5, 8, 11]
  const now = new Date()
  const out: Sitting[] = []
  let year = now.getFullYear()
  let idx = SITTING_MONTHS.findIndex((m) => m > now.getMonth())
  if (idx === -1) { idx = 0; year += 1 }
  while (out.length < count) {
    const m = SITTING_MONTHS[idx]
    const first = new Date(year, m, 1)
    const firstMonday = 1 + ((8 - first.getDay()) % 7)
    const pad = (n: number) => `${n}`.padStart(2, "0")
    out.push({
      label: `${MONTHS[m]} ${year}`,
      week: `${firstMonday}–${firstMonday + 4} ${MONTHS[m].slice(0, 3)}`,
      date: `${year}-${pad(m + 1)}-${pad(firstMonday + 2)}`,
    })
    idx += 1
    if (idx >= SITTING_MONTHS.length) { idx = 0; year += 1 }
  }
  return out
}

const MINUTE_OPTIONS: { v: number; label: string; micro: string }[] = [
  { v: 40, label: "Committed", micro: "The honest minimum for real ACCA progress — steady mastery every week." },
  { v: 60, label: "All in", micro: "The sweet spot most passers protect. We'll aim here." },
  { v: 90, label: "Intensive", micro: "Serious pace — mock-ready weeks early." },
  { v: 120, label: "Full throttle", micro: "Maximum push — for a close exam date." },
]

const SLOT_OPTIONS: { label: string; time: string }[] = [
  { label: "Morning", time: "08:00" },
  { label: "Lunch", time: "13:00" },
  { label: "Evening", time: "19:00" },
  { label: "Night", time: "21:30" },
]

const GOAL_ICON: Record<Goal, IconName> = {
  "first-pass": "done",
  recovery: "loop",
  level: "roadmap",
  career: "study",
}

/** Target pass probability before exam day — the ambition the plan aims at. */
const TARGET_OPTIONS: { v: number; label: string; blurb: string }[] = [
  { v: 65, label: "65%", blurb: "Pass-ready" },
  { v: 75, label: "75%", blurb: "Confident · recommended" },
  { v: 85, label: "85%", blurb: "Bulletproof" },
  { v: 90, label: "90%", blurb: "Ambitious" },
]


/*
 * Which shell: the single-column flow, or the two-pane split?
 *
 * The split needs real width AND real height. It is position:fixed inset:0
 * with overflow:hidden, so it cannot grow — everything (brand, progress,
 * slide, Back/Continue, keyboard hint) has to fit in one viewport or it gets
 * clipped with no way to scroll to it.
 *
 *  · max-width 1080  — below this the writing pane is narrower than its own
 *    620px measure and the visual pane can't hold its scenes.
 *  · max-height 620  — the axis this hook ignored entirely. A landscape phone
 *    (~390px) or a half-height desktop window is wide enough for the split and
 *    far too short for it: Back/Continue sat below the fold with no scroll to
 *    reach them. Short-and-wide now gets the single-column flow instead.
 *
 * A 1366×768 laptop (~650px of viewport after browser chrome) deliberately
 * stays on the split — it is genuinely wide, and the vh-clamped padding in the
 * writing pane below is what buys back the room it needs.
 */
const COMPACT_SHELL_QUERY = "(max-width: 1080px), (max-height: 620px)"

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(() => window.matchMedia(COMPACT_SHELL_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_SHELL_QUERY)
    const on = () => setMobile(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return mobile
}

const PHOTOS = ["/onboarding/welcome-m.webp", "/onboarding/welcome-d.webp", "/onboarding/time-d.webp", "/onboarding/goal-d.webp"]

/* Directional slide variants — enter and exit run SIMULTANEOUSLY (no
   mode="wait" gap), so steps hand over in one continuous motion. */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -36 : 36 }),
}
const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

/* ── page ────────────────────────────────────────────────────── */

export default function Welcome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  /*
   * Restore an interrupted run. Read ONCE into the initial state rather than in
   * an effect, so the first paint is already the learner's own answers — an
   * effect-based restore would flash step 0 and then jump, which reads as a bug.
   */
  const draft = useMemo(() => readOnboardingDraft(), [])

  const [step, setStep] = useState(draft?.step ?? 0)
  const [learnerRoute, setLearnerRoute] = useState<LearnerRoute | null>(draft?.learnerRoute ?? null)
  // Step 4 ("What are you studying with?" — the Kaplan/BPP/Study Hub picker) is
  // deliberately OUT of the flow. Scholify is not yet an official Kaplan or BPP
  // partner, so asking learners to register third-party materials implied a
  // partnership and an integration that does not exist, and the plan can only
  // sequence Scholify's own content anyway. Restore 4 to these lists (and the
  // ResourceSlide, its state and the setStudyResource call in persist()) once
  // those partnerships are signed — acca-study-resources.ts and the
  // provider-aware plan titles in acca-schedule.ts are all still in place and
  // fall back cleanly to Scholify content while no resource is recorded.
  // ONE onboarding flow, defined in acca-onboarding-steps.ts. There used to be a
  // second, shorter one behind a date gate (9 Aug) that skipped the route and
  // language questions — and that shorter flow was what actually shipped, which
  // is why the route-based plan never ran in production. See the note there.
  const visibleSteps = useMemo(() => onboardingSteps(learnerRoute), [learnerRoute])
  const visibleStepIndex = Math.max(0, visibleSteps.indexOf(step))
  /* Labels for the steps this route actually shows, in order — indexed by step
     NUMBER upstream so a hidden slide cannot shift the rest onto wrong names. */
  const stepLabels = useMemo(() => visibleSteps.map((s) => STEP_LABELS[s] ?? `Step ${s + 1}`), [visibleSteps])

  const [dir, setDir] = useState(1)
  const [passed, setPassed] = useState<Set<string>>(new Set(draft?.passed ?? []))
  const [showPassed, setShowPassed] = useState(false)
  const [paper, setPaper] = useState<string | null>(draft?.paper ?? null)
  const [paperVariant, setPaperVariantState] = useState<PaperVariant | null>(draft?.paperVariant ?? null)
  const [minutes, setMinutes] = useState(draft?.minutes ?? 60)
  const [studyDays, setStudyDays] = useState<number[]>(
    () => draft?.studyDays ?? defaultStudyDays(draft?.daysPerWeek ?? 6),
  )
  // The count is DERIVED — never stored separately, so it cannot drift.
  const daysPerWeek = studyDays.length
  const toggleStudyDay = (day: number) =>
    setStudyDays((current) =>
      current.includes(day) ? current.filter((d) => d !== day) : [...current, day].sort((a, b) => a - b),
    )
  const [slot, setSlot] = useState(draft?.slot ?? "19:00")
  const [examDate, setExamDate] = useState(draft?.examDate ?? "")
  const [pickedSitting, setPickedSitting] = useState<string | null>(draft?.pickedSitting ?? null)
  const [goal, setGoalState] = useState<Goal | null>(draft?.goal ?? null)
  const [target, setTarget] = useState<number | null>(draft?.target ?? null)
  const [englishLevel, setEnglishLevel] = useState<CefrLevel | null>(draft?.englishLevel ?? null)
  const [englishEvidence, setEnglishEvidence] = useState<EnglishEvidence | null>(draft?.englishEvidence ?? null)
  // Files are NOT restored — see the note in acca-onboarding-draft. The upload
  // steps re-ask rather than showing a filename with no file behind it.
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [certificateType, setCertificateType] = useState<"IELTS" | "TOEFL" | "Cambridge" | "Other">("IELTS")
  const [certificateBusy, setCertificateBusy] = useState(false)
  const [certificateError, setCertificateError] = useState("")
  const [resultChoice, setResultChoice] = useState<AssessmentPath | null>(draft?.resultChoice ?? null)
  const [resultFile, setResultFile] = useState<File | null>(null)
  const [resultAnalysis, setResultAnalysis] = useState<ResultUploadAnalysis | null>(null)
  const [resultBusy, setResultBusy] = useState(false)
  const [resultError, setResultError] = useState("")
  const [finishBusy, setFinishBusy] = useState(false)
  const [finishError, setFinishError] = useState("")
  /** New-learner exit: hand over to the plan build → reveal → commit sequence. */
  const [planReveal, setPlanReveal] = useState(false)
  const levels = useMemo(() => paperLevels(), [])
  const sittings = useMemo(() => nextSittings(3), [])
  const sessionPaper = paper !== null && !ON_DEMAND.has(paper)

  useEffect(() => {
    if (isAccaOnboarded()) navigate("/dashboard", { replace: true })
    const preload = () => PHOTOS.forEach((src) => { const img = new Image(); img.src = src })
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const idleId = idleWindow.requestIdleCallback?.(preload, { timeout: 2500 })
    const timerId = idleId === undefined ? window.setTimeout(preload, 900) : undefined
    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId)
      if (timerId !== undefined) window.clearTimeout(timerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
   * Persist every answer as it changes, so an interrupted run resumes instead of
   * restarting. Cheap (one small JSON write) and not worth debouncing: these are
   * discrete choices, not keystrokes.
   *
   * Skipped while step is 0 — writing a draft nobody has answered anything into
   * would make the restore path fire for people who only glanced at the welcome
   * slide.
   */
  useEffect(() => {
    if (step === 0) return
    saveOnboardingDraft({
      step, learnerRoute, passed: [...passed], paper, paperVariant, minutes, daysPerWeek, studyDays,
      slot, examDate, pickedSitting, goal, target, englishLevel, englishEvidence, resultChoice,
    })
  }, [step, learnerRoute, passed, paper, paperVariant, minutes, daysPerWeek, slot, examDate, pickedSitting, goal, target, englishLevel, englishEvidence, resultChoice, studyDays])

  const canAdvance = step === 1
    ? learnerRoute !== null
    : step === 2
      ? englishLevel !== null && englishEvidence !== null
    : step === 3
    ? paper !== null && (!["LW", "TX"].includes(paper) || paperVariant !== null)
      : step === 6
        ? examDate !== ""
      : step === 7
        ? goal !== null && target !== null
        : step === 8
          ? resultChoice !== null
        : true

  const go = useCallback((delta: number) => {
    setDir(delta)
    setStep((s) => {
      const current = Math.max(0, visibleSteps.indexOf(s))
      const next = visibleSteps[Math.min(visibleSteps.length - 1, Math.max(0, current + delta))]
      if (next !== s) trackEvent("onboarding_step", { step: next, direction: delta > 0 ? "forward" : "back" })
      return next
    })
  }, [visibleSteps])

  /** Jump straight to a step by its index in the deck (not a relative move). */
  const goToStep = useCallback((target: number) => {
    setStep((s) => {
      if (!visibleSteps.includes(target) || target === s) return s
      setDir(target > s ? 1 : -1)
      trackEvent("onboarding_step", { step: target, direction: target > s ? "forward" : "back" })
      return target
    })
  }, [visibleSteps])

  /*
   * Apply one of Charles's capacity fixes, then land the learner on the step that
   * owns the value so they can see what changed and adjust it further.
   *
   * Deliberately NOT silent: changing the answer under them and staying on the
   * summary would leave them unsure what happened, and the daily-time and
   * exam-date steps both carry context (the micro-copy, the sitting weeks) that
   * makes the new number make sense. The exception is "move to a later sitting",
   * where Charles cannot pick FOR them — which sitting to take is a real-world
   * decision about their own year, so that one only navigates.
   */
  const applyGuideFix = useCallback((fix: GuideFix) => {
    trackEvent("onboarding_capacity_fix", {
      kind: fix.kind,
      paper,
      from: fix.kind === "sitting" ? null : fix.from,
      to: fix.kind === "sitting" ? fix.weeksNeeded : fix.to,
    })
    if (fix.kind === "minutes") {
      setMinutes(fix.to)
      goToStep(TIME_STEP)
      return
    }
    if (fix.kind === "days") {
      // "days" fixes now adjust the SELECTION; the count follows from it.
      setStudyDays(defaultStudyDays(fix.to))
      goToStep(TIME_STEP)
      return
    }
    goToStep(EXAM_DATE_STEP)
  }, [goToStep, paper])

  function selectPaper(nextPaper: string | null) {
    if (nextPaper !== paper) {
      setExamDate("")
      setPickedSitting(null)
    }
    setPaper(nextPaper)
    setPaperVariantState(null)
  }

  function selectLearnerRoute(nextRoute: LearnerRoute) {
    if (learnerRoute !== nextRoute) {
      trackEvent(learnerRoute ? "onboarding_route_changed" : "onboarding_route_selected", {
        route: nextRoute,
        previousRoute: learnerRoute,
      })
      setResultChoice(nextRoute === "new" ? "embedded" : null)
      setResultFile(null)
      setResultAnalysis(null)
      setResultError("")
    }
    setLearnerRoute(nextRoute)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) return
      if (e.key === "ArrowRight" && canAdvance && visibleStepIndex < visibleSteps.length - 1) go(1)
      if (e.key === "ArrowLeft" && visibleStepIndex > 0) go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [canAdvance, go, visibleStepIndex, visibleSteps.length])

  function persist(complete = true) {
    if (!paper) {
      setFinishError("Please choose your ACCA paper before Charles builds the plan.")
      goToStep(PAPER_STEP)
      return false
    }
    // Older interrupted drafts can reach the summary without a target. The
    // summary already presents 75% as the recommended default, so persist that
    // same value instead of making the final CTA silently do nothing.
    const effectiveTarget = target ?? 75
    const charlesPlan = buildOnboardingGuide({
      paperId: paper,
      route: learnerRoute,
      englishLevel,
      minutesPerDay: minutes,
      daysPerWeek,
      examDate,
      targetPercentage: effectiveTarget,
      // Hours measured from THIS paper's real chapters and their hardness, not a
      // hand-maintained table — see paperWorkHours in acca-topic-plan.
      contentHours: paperWorkHours(paper),
    })
    setPassedPapers([...passed])
    setStudyingPapers([paper])
    if (paperVariant) setPaperVariant(paper, paperVariant)
    // No third-party resource is recorded while Scholify is the only content
    // source — getStudyResource() returning null is what makes the daily plan
    // sequence Scholify's own chapters. See the note on visibleSteps.
    if (goal) setGoal(goal)
    if (learnerRoute && englishLevel && englishEvidence) {
      saveLearnerBaseline({
        route: learnerRoute,
        englishLevel,
        englishEvidence,
        certificateName: certificateFile?.name,
        certificateType: englishEvidence === "certificate" ? certificateType : undefined,
        assessmentPath: learnerRoute === "new" ? "embedded" : resultChoice ?? "diagnostic",
        updatedAt: new Date().toISOString(),
      })
      if (getExperience() !== "professional") {
        setExperience(learnerRoute === "new" ? "new" : "some")
      }
    }
    if (goal === "career") setExperience("professional")
    /*
     * Derived from the SAME allocator that builds the day (acca-schedule
     * shapeDay), not a separate lookup table. The old table said 55 questions
     * for a 120-min learner while the scheduler only ever scheduled 30 — so the
     * dashboard's daily goal and the plan disagreed, and neither matched the
     * minutes the learner had actually promised.
     */
    const questionsPerDay = shapeDay(minutes, effectiveTarget).questionGoal
    setPlan(paper, { examDate: charlesPlan.recommendedExamDate, studyTime: slot, dailyMinutes: minutes, daysPerWeek, studyDays, dailyGoal: questionsPerDay, targetProb: charlesPlan.recommendedTarget })
    setDailyGoal(questionsPerDay)
    if (complete) markAccaOnboarded()
    if (complete) void persistAccountSetup()
    /*
     * Create the reminder row NOW, with the clock they just set and their
     * browser's timezone. Without this the row only appeared if the learner
     * happened to open Settings and touch the toggle — so for a brand-new
     * learner the three daily reminders had nothing to fire from.
     */
    if (complete) registerPracticeTime(slot)
    // The answers are now committed to the real stores, so the draft has served
    // its purpose. Leaving it would offer to "resume" a finished onboarding.
    if (complete) clearOnboardingDraft()
    return true
  }

  const onboardingProps = () => ({ paper, minutes, learnerRoute, assessmentPath: resultChoice, scheduling: "charles_recommended" })
  // Each finish path IS the experience answer, so the loop knows the persona from
  // the learner's actual choice (career→professional is already set in persist()).
  const finishToDiagnostic = () => {
    if (finishBusy) return
    setFinishError("")
    if (getExperience() !== "professional") setExperience("some")
    if (!persist()) return
    setStartMode("assess")
    trackEvent("onboarding_complete", { ...onboardingProps(), exit: "diagnostic" })
    const mode = learnerRoute === "practice" ? "readiness" : "gaps"
    trackEvent("diagnostic_offered", { paper, learnerRoute, mode, assessmentPath: resultChoice })
    navigate(`/study/diagnostic?mode=${mode}&next=paywall`)
  }
  /*
   * The new-learner exit. This used to navigate straight to /dashboard, so the
   * learner pressed "Build my plan and start learning" and simply landed in the
   * app — no generation, no plan, no ask. ZeroPlanReveal (which already
   * existed but was never mounted anywhere) is that missing sequence: build →
   * plan → commit → paywall. It renders in place rather than as a route so the
   * handover from the last onboarding slide has no navigation flash.
   *
   * persist() has already run by then, including markAccaOnboarded(), so a
   * reload mid-reveal lands the learner in their finished plan rather than back
   * at step 1.
   */
  const finishNewLearner = () => {
    if (finishBusy) return
    setFinishError("")
    setResultChoice("embedded")
    setExperience("new")
    if (!persist()) return
    setStartMode("zero")
    trackEvent("personalised_plan_generated", { ...onboardingProps(), route: "new", assessmentPath: "embedded" })
    trackEvent("onboarding_complete", { ...onboardingProps(), learnerRoute: "new", exit: "learning" })
    setPlanReveal(true)
  }
  const finishWithResult = async () => {
    if (!resultAnalysis || !resultFile || finishBusy) return
    setFinishBusy(true)
    setFinishError("")
    if (!persist(false)) { setFinishBusy(false); return }
    try {
      await useUploadedResult(resultAnalysis, resultFile.name)
      markAccaOnboarded()
      void persistAccountSetup()
      setStartMode("assess")
      trackEvent("onboarding_complete", { ...onboardingProps(), exit: "uploaded_result", resultKind: resultAnalysis.resultKind })
      navigate("/dashboard")
    } catch {
      setFinishError("Charles couldn't save this result. Your file is safe—please try again.")
      setFinishBusy(false)
    }
  }

  const onResultFile = async (file: File | null) => {
    setResultFile(file)
    setResultAnalysis(null)
    setResultChoice(null)
    setResultError("")
    if (!file || !paper) return
    trackEvent("onboarding_document_upload_started", { paper, learnerRoute })
    setResultBusy(true)
    try {
      const analysis = await analyseResultPdf(file, paper)
      setResultAnalysis(analysis)
      setResultChoice("uploaded")
      trackEvent("onboarding_document_analysed", { paper, learnerRoute, resultKind: analysis.resultKind, areas: analysis.areas.length })
    } catch (error) {
      setResultError(error instanceof Error ? error.message : "Charles couldn't analyse this result.")
      trackEvent("onboarding_document_analysis_failed", { paper, learnerRoute })
    } finally {
      setResultBusy(false)
    }
  }

  const onCertificateFile = async (file: File | null, selectedType = certificateType) => {
    setCertificateFile(file)
    setEnglishLevel(null)
    setCertificateError("")
    if (!file) return
    setCertificateBusy(true)
    try {
      const result = await analyseEnglishCertificate(file, selectedType)
      setEnglishLevel(result.level)
      if (["IELTS", "TOEFL", "Cambridge", "Other"].includes(result.certificateType)) {
        setCertificateType(result.certificateType as typeof certificateType)
      }
    } catch (error) {
      setCertificateError(error instanceof Error ? error.message : "Charles couldn't read this certificate.")
    } finally {
      setCertificateBusy(false)
    }
  }

  const slideAnim = {
    variants: reduced ? fadeVariants : slideVariants,
    initial: "enter" as const,
    animate: "center" as const,
    exit: "exit" as const,
    custom: dir,
  }

  /* shared slide bodies (question controls only — chrome differs per device) */
  const body: Record<number, ReactNode> = {
    1: (
      <LearnerRouteSlide value={learnerRoute} onChange={selectLearnerRoute} />
    ),
    2: (
      <EnglishBaselineSlide
        route={learnerRoute}
        level={englishLevel}
        evidence={englishEvidence}
        certificate={certificateFile}
        certificateBusy={certificateBusy}
        certificateError={certificateError}
        certificateType={certificateType}
        onLevel={setEnglishLevel}
        onEvidence={setEnglishEvidence}
        onCertificate={onCertificateFile}
        onCertificateType={(nextType) => {
          setCertificateType(nextType)
          if (certificateFile) void onCertificateFile(certificateFile, nextType)
        }}
      />
    ),
    3: (
      <PaperSlide
        levels={levels}
        paper={paper}
        setPaper={selectPaper}
        variant={paperVariant}
        setVariant={setPaperVariantState}
        passed={passed}
        setPassed={setPassed}
        showPassed={showPassed}
        setShowPassed={setShowPassed}
        isMobile={isMobile}
      />
    ),
    5: <TimeSlide minutes={minutes} setMinutes={setMinutes} slot={slot} setSlot={setSlot} studyDays={studyDays} setStudyDays={setStudyDays} toggleStudyDay={toggleStudyDay} />,
    6: (
      <SittingSlide
        sessionPaper={sessionPaper}
        paper={paper}
        sittings={sittings}
        pickedSitting={pickedSitting}
        onPick={(d) => { setPickedSitting(d); setExamDate(d) }}
        examDate={examDate}
        setExamDate={setExamDate}
      />
    ),
    7: <GoalSlide goal={goal} setGoal={setGoalState} target={target} setTarget={setTarget} />,
    8: (
      <ResultUploadSlide
        paper={paper ?? ""}
        file={resultFile}
        analysis={resultAnalysis}
        busy={resultBusy}
        error={resultError}
        choice={resultChoice}
        route={learnerRoute}
        onFile={onResultFile}
        onChoice={(choice) => {
          setResultChoice(choice)
          setResultFile(null)
          setResultAnalysis(null)
          setResultError("")
        }}
      />
    ),
    9: (
      <ReadySlide
        paper={paper ?? ""}
        minutes={minutes}
        slot={slot}
        examDate={examDate}
        sitting={sittings.find((s) => s.date === pickedSitting) ?? null}
        goal={goal}
        target={target ?? 75}
        uploadedResult={resultAnalysis}
        onDiagnostic={learnerRoute === "new" ? finishNewLearner : finishToDiagnostic}
        onUploaded={finishWithResult}
        finishBusy={finishBusy}
        finishError={finishError}
        isMobile={isMobile}
        learnerRoute={learnerRoute}
        englishLevel={englishLevel}
        daysPerWeek={daysPerWeek}
        onApplyFix={applyGuideFix}
        onEdit={goToStep}
      />
    ),
  }

  const KICKERS = ["A GPS for ACCA", "Your starting point", "English support", "Your target", "Your study stack", "Protect your time", "Lock your date", "Your why", "Optional shortcut", ""]
  // Step 3's question depends on the paper: session exams pick a sitting,
  // on-demand CBEs (BT·MA·FA·LW) pick any date.
  const TITLES = [
    "",
    "Where are you starting from?",
    "How should Charles explain things?",
    "Which paper are we passing?",
    // Index 4 is UNREACHABLE — the study-resource step is out of the flow until
    // the Kaplan/BPP partnerships exist (see visibleSteps). Kept as a
    // placeholder because TITLES and SUBS are indexed by step number, so
    // deleting it would silently shift every step after it.
    "What are you studying with?",
    "How much time can you protect, daily?",
    sessionPaper ? "Which sitting are you taking?" : "When's your exam?",
    "What are you here for?",
    learnerRoute === "practice" ? "How should we assess your readiness?" : "How should we map your current progress?",
    "Your loop is set.",
  ]
  const SUBS = [
    "",
    "This changes your route—not your potential.",
    "ACCA is examined in English. Choose evidence, self-rate, or take a short vocabulary check.",
    "Pick one to start. You can add more later.",
    "Charles will fit the books you already own into your daily plan.",
    "Honest beats ambitious. We build the plan around this.",
    sessionPaper
      ? "Your plan counts back from exam week."
      : `${paper ?? "Your paper"} is an on-demand computer exam — book any date at your local centre.`,
    "This shapes the tone I'll coach you in.",
    learnerRoute === "practice"
      ? "Use a recent result or choose a short exam-focused readiness route. Uploading is optional."
      : "Use course progress, a targeted gap check, or an optional detailed result PDF.",
    "",
  ]

  /* ═══ PLAN BUILD → REVEAL → COMMIT → PAYWALL ═══
     Takes over both shells once the new learner finishes onboarding. Its own
     layout is fixed/inset-0 and scrolls, so it works at any viewport. */
  if (planReveal && paper) {
    return (
      <ZeroPlanReveal
        paperId={paper}
        onDone={(dest) => navigate(dest === "study" ? "/study" : "/dashboard")}
      />
    )
  }

  /* ═══ MOBILE ═══ */
  if (isMobile) {
    return (
      <div style={{ position: "fixed", inset: 0, background: PAGE, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: SANS }}>
        {step === 0 && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 264, overflow: "hidden", background: PANEL }}>
            <img src="/onboarding/welcome-m.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(20,20,26,.12) 0%, rgba(250,250,247,0) 34%, rgba(250,250,247,.65) 82%, ${PAGE} 100%)`, pointerEvents: "none" }} />
          </div>
        )}

        {/* header */}
        <div style={{ position: "relative", padding: "22px 24px 0", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <motion.div
              initial={reduced ? undefined : { opacity: 0, scale: 0.4, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ display: "flex", alignItems: "center", gap: 9 }}
            >
              <ScholifyMark size={24} />
              <span style={{ font: `800 17px/1 ${SANS}`, letterSpacing: "-0.6px", color: INK }}>Scholify</span>
            </motion.div>
            {/* Same denominator as the desktop header below: visibleSteps.length.
                The `+ 2` here counted two steps that aren't in this flow, so the
                mobile counter read "01 / 11" for a 9-step onboarding and its bar
                stopped at ~82% on the final step — the user never saw it
                complete. String() both sides too: the old `0${n}` template
                rendered step 10 as "010". */}
          </div>
          {/* compact: counter + bar + the step's own NAME, no labelled rail —
              eight labels do not fit across 320px. */}
          <div style={{ marginTop: 14 }}>
            <OnboardingStepper
              labels={stepLabels}
              index={visibleStepIndex}
              total={visibleSteps.length}
              onJump={(i) => goToStep(visibleSteps[i])}
              compact
            />
          </div>
        </div>

        {/* content */}
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          {/* NOT mode="wait". The slide is position:absolute inset:0 inside a
              relative parent, so the outgoing and incoming steps can occupy the
              same space and cross over. mode="wait" held the new step back until
              the old one had fully left, which doubled every transition and left
              a stretch where NEITHER slide was on screen — the pause. */}
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={step}
              {...slideAnim}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 && canAdvance && visibleStepIndex < visibleSteps.length - 1) go(1)
                else if (info.offset.x > 70 && visibleStepIndex > 0) go(-1)
              }}
              style={{ position: "absolute", inset: 0, overflowY: "auto", padding: step === 0 ? "284px 24px 56px" : "22px 24px 56px", display: "flex", flexDirection: "column" }}
            >
              {step === 0 ? (
                <>
                  <AnimatedHeadline
                    text="Welcome to Scholify. Let's pass your next paper."
                    delay={0.06}
                    style={{ font: `800 32px/1.06 ${SANS}`, letterSpacing: "-1px", color: INK }}
                  />
                  <motion.p
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ margin: "16px 0 0", font: `400 15px/1.5 ${SANS}`, color: BODY, maxWidth: 300 }}
                  >
                    A GPS for ACCA: it measures where you are, hands you the next task daily, and recalculates until you pass.
                  </motion.p>
                  <ValueTrio style={{ marginTop: 18 }} />
                  <RouteClimb style={{ marginTop: 24 }} />
                </>
              ) : (
                <>
                  {step === 9 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 7, font: `600 11px/1 ${MONO}`, letterSpacing: "0.13em", textTransform: "uppercase", color: GREEN, marginBottom: 12 }}>
                      <Icon name="done" size={15} color={GREEN} /> Ready
                    </div>
                  ) : null}
                  <h2 style={{ margin: "0 0 5px", font: `800 ${step === 9 ? 29 : step === 1 ? 25 : 26}px/1.1 ${SANS}`, letterSpacing: "-0.7px", color: INK }}>{TITLES[step]}</h2>
                  {SUBS[step] && <p style={{ margin: "0 0 18px", font: `400 13px/1.45 ${SANS}`, color: SUB }}>{SUBS[step]}</p>}
                  {step === 9 && <div style={{ height: 10 }} />}
                  {body[step]}
                </>
              )}
            </motion.div>
          </AnimatePresence>
          {/* Charles sits in this panel's bottom-right on mobile too — he was
              absent from this layout entirely before. */}
          <SlideMascot step={step} size="clamp(64px,17vw,88px)" right={14} bottom={8} />
        </div>

        {/* pinned footer */}
        <div style={{ padding: step === 9 ? "14px 24px 24px" : "12px 24px 24px", background: `linear-gradient(180deg, rgba(250,250,247,0), ${PAGE} 30%)`, position: "relative", zIndex: 2 }}>
          {step === 5 && (
            <div style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 14, padding: "0 2px" }}>
              <span style={{ color: RED, fontSize: 15, lineHeight: 1.2 }}>“</span>
              <span style={{ font: `600 13px/1.4 ${SANS}`, color: "#3E3831" }}>The students who pass don't find time — they protect it.</span>
            </div>
          )}
          {step === 6 && (
            <div style={{ marginBottom: 12, font: `500 12px/1.4 ${SANS}`, color: MUTE, textAlign: "center" }}>Not booked yet? I'll pace you by mastery.</div>
          )}
          {step === 9 ? (
            resultAnalysis
              ? <PrimaryBtn onClick={() => void finishWithResult()} big disabled={finishBusy}>{finishBusy ? "Building your plan…" : "Build my plan from this result"}</PrimaryBtn>
              : <PrimaryBtn onClick={learnerRoute === "new" ? finishNewLearner : finishToDiagnostic} big disabled={finishBusy}>
                  {learnerRoute === "new" ? "Build my plan and start learning" : learnerRoute === "practice" ? "Assess readiness and start practising" : "Map my gaps and build my plan"}
                </PrimaryBtn>
          ) : (
            <>
              <PrimaryBtn onClick={() => (canAdvance ? go(1) : undefined)} big={step === 0} disabled={!canAdvance}>
                {step === 0 ? "Start — it takes a minute" : "Continue"}
              </PrimaryBtn>
              <div style={{ display: "flex", alignItems: "center", marginTop: 12, minHeight: 22, position: "relative" }}>
                {visibleStepIndex > 0 && (
                  <button onClick={() => go(-1)} style={{ background: "none", border: "none", color: MUTE, font: `600 12px/1 ${SANS}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: "4px 6px 4px 0" }}>
                    <Icon name="arrow" size={13} color={MUTE} style={{ transform: "rotate(180deg)" }} /> Back
                  </button>
                )}
                <div style={{ position: "absolute", left: 0, right: 0, textAlign: "center", font: `500 10px/1 ${MONO}`, letterSpacing: "0.2em", color: HINT, textTransform: "uppercase", pointerEvents: "none" }}>
                  swipe →
                </div>
              </div>
            </>
          )}
          {finishError && <p role="alert" style={{ margin: "10px 0 0", color: RED, font: `600 12px/1.4 ${SANS}`, textAlign: "center" }}>{finishError}</p>}
        </div>
      </div>
    )
  }

  /* ═══ DESKTOP · fluid split (see --onb-writing) ═══ */
  return (
    <div style={{ position: "fixed", inset: 0, background: PAGE, display: "flex", overflow: "hidden", fontFamily: SANS }}>
      {/* left — question panel.
          Every vertical measurement here is vh-relative rather than fixed,
          because this pane cannot scroll: on a 660px-tall laptop the old flat
          40/54px padding plus 26px and 30px gaps spent ~150px on whitespace
          and pushed Continue against the fold. The clamps keep the desktop
          spacing at full height and give it back where there is none. */}
      <div style={{ width: "var(--onb-writing)", flex: "none", display: "flex", flexDirection: "column", padding: "clamp(20px, 3.6vh, 40px) clamp(28px, 3.5vw, 60px) clamp(30px, 5vh, 54px)", position: "relative", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <ScholifyMark size={30} />
          <span style={{ font: `800 21px/1 ${SANS}`, letterSpacing: "-0.6px", color: INK }}>Scholify</span>
        </div>
        <div style={{ marginTop: "clamp(14px, 2.4vh, 26px)" }}>
          <OnboardingStepper
            labels={stepLabels}
            index={visibleStepIndex}
            total={visibleSteps.length}
            onJump={(i) => goToStep(visibleSteps[i])}
          />
        </div>

        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          {/* NOT mode="wait". The slide is position:absolute inset:0 inside a
              relative parent, so the outgoing and incoming steps can occupy the
              same space and cross over. mode="wait" held the new step back until
              the old one had fully left, which doubled every transition and left
              a stretch where NEITHER slide was on screen — the pause. */}
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={step}
              {...slideAnim}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", maxWidth: 620, overflowY: "auto", paddingRight: 8 }}
            >
              {step === 0 ? (
                <div style={{ margin: "auto 0", paddingBottom: 12 }}>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} style={kicker}>
                    A GPS for ACCA
                  </motion.div>
                  <AnimatedHeadline
                    text="Welcome to Scholify. Let's pass your next paper."
                    delay={0.08}
                    style={{ font: `800 clamp(32px, 3vw, 43px)/1.05 ${SANS}`, letterSpacing: "-1.4px", color: INK }}
                  />
                  <motion.p
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ margin: "20px 0 0", font: `400 18px/1.5 ${SANS}`, color: BODY, maxWidth: 460 }}
                  >
                    It measures where you are, hands you the next task daily, and recalculates until you pass.
                  </motion.p>
                  <ValueTrio style={{ marginTop: 22 }} big />
                  {/* The universal route, in perspective — the same four stages
                      for every learner, which is this slide's whole argument. */}
                  <RouteClimb style={{ marginTop: 30, maxWidth: 560 }} />
                </div>
              ) : (
                <div style={{ margin: "auto 0", padding: "18px 0 24px" }}>
                  {step === 9 ? (
                    <div style={{ ...kicker, color: GREEN, display: "flex", alignItems: "center", gap: 7 }}>
                      <Icon name="done" size={14} color={GREEN} /> Ready
                    </div>
                  ) : (
                    <div style={kicker}>{KICKERS[step]}</div>
                  )}
                  <h1 style={{ margin: 0, font: `800 clamp(30px, ${step === 9 ? "3vw" : step === 1 ? "2.6vw" : "2.8vw"}, ${step === 9 ? 43 : step === 1 ? 38 : 40}px)/1.05 ${SANS}`, letterSpacing: "-1.6px", color: INK, marginBottom: step === 9 ? 24 : 0 }}>
                    {TITLES[step]}
                  </h1>
                  {SUBS[step] && <p style={{ margin: "12px 0 0", font: `400 15px/1.5 ${SANS}`, color: SUB }}>{SUBS[step]}</p>}
                  <div style={{ marginTop: 26 }}>{body[step]}</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* footer buttons */}
        {step < 9 && (
          <div style={{ marginTop: "clamp(16px, 2.6vh, 30px)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <GlassButton variant="ghost" onClick={() => go(-1)} disabled={step === 0} ariaLabel="Previous step">
              <Icon name="arrow" size={16} color={step === 0 ? "#CFC7BF" : MUTE} style={{ transform: "rotate(180deg)" }} /> Back
            </GlassButton>
            <GlassButton onClick={() => (canAdvance ? go(1) : undefined)} disabled={!canAdvance}>
              {step === 0 ? "Start — it takes a minute" : "Continue"} <Icon name="arrow" size={17} color="#fff" />
            </GlassButton>
          </div>
        )}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "clamp(6px, 1.4vh, 22px)", textAlign: "center", font: `500 10px/1 ${MONO}`, letterSpacing: "0.2em", textTransform: "uppercase", color: HINT, pointerEvents: "none" }}>
          ← → or swipe
        </div>
        {/* Charles is absolutely positioned over this pane, so on a short
            screen he crept up into the Back/Continue row. Tie his offset to
            the same vh rhythm the padding uses. */}
        <SlideMascot step={step} size="clamp(64px,7vw,112px)" right="clamp(16px,2.5vw,36px)" bottom="clamp(22px, 4.4vh, 40px)" />
      </div>

      {/* right — visual panel */}
      <div style={{ width: "calc(100% - var(--onb-writing))", flex: "none", position: "relative", overflow: "hidden" }}>
        {/* Same reasoning, and this was the worst of the three: at 0.5s each way
            mode="wait" made the visual panel take a FULL SECOND to swap, half of
            it blank. Crossing over also halves the duration to 0.36 so it lands
            with the writing panel instead of trailing it. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <VisualPanel step={step} paper={paper} sitting={sittings.find((s) => s.date === pickedSitting) ?? null} sittings={sittings} levels={levels} learnerRoute={learnerRoute} englishLevel={englishLevel} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Charles in the BOTTOM-RIGHT corner of the writing panel, on every slide.
 *
 * He used to live in the right-hand visual panel on desktop, and not at all on
 * mobile. He now sits in the corner of the panel the learner is actually reading
 * and answering in, identically in both layouts.
 *
 * Bottom-right rather than top-right: the mobile header already carries the step
 * counter on the right, and on desktop the footer buttons are left-aligned with
 * the swipe hint centred — so this corner is the one genuinely free space in both.
 * pointerEvents stays off so he can never intercept a tap on an answer.
 */
function SlideMascot({ step, size, right, bottom }: { step: number; size: string; right: number | string; bottom: number | string }) {
  return (
    <div style={{ position: "absolute", right, bottom, zIndex: 3, pointerEvents: "none" }} aria-hidden>
      <CharlesMascot pose={SLIDE_POSES[step] ?? "wave"} size={size} delay={0.12} />
    </div>
  )
}

const kicker: CSSProperties = {
  font: `600 11px/1 ${MONO}`,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: RED,
  marginBottom: 16,
}

/* ── shared slide bodies ─────────────────────────────────────── */

/** What Scholify actually gives you — shown on the hero so the value is explicit. */
function LearnerRouteSlide({ value, onChange }: { value: LearnerRoute | null; onChange: (value: LearnerRoute) => void }) {
  const routes: { value: LearnerRoute; icon: IconName; title: string; detail: string; path: string[] }[] = [
    { value: "new", icon: "rocket", title: "Learn from the beginning", detail: "I am starting this paper from zero or near zero.", path: ["Foundations", "Daily lessons", "Checks as I learn"] },
    { value: "course", icon: "study", title: "Continue my current studies", detail: "I already use a course, tutor, books, or self-study.", path: ["Map progress", "Verify gaps", "Complement my course"] },
    { value: "practice", icon: "mock", title: "Practise for my exam", detail: "I have covered most of the syllabus and need practice and mocks.", path: ["Readiness check", "Timed practice", "Mock plan"] },
  ]
  return (
    <ChoiceGroup
      label="Where are you starting from?"
      values={routes.map((route) => route.value)}
      value={value}
      onChange={(next) => onChange(next as LearnerRoute)}
      gap={11}
      style={{ maxWidth: 570 }}
    >
      {routes.map((route) => (
        <ChoiceCard
          key={route.value}
          value={route.value}
          title={route.title}
          detail={route.detail}
          icon={<Icon name={route.icon} size={19} color={value === route.value ? "#fff" : BODY} />}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {route.path.map((item, i) => (
              <span
                key={item}
                style={{ display: "flex", alignItems: "center", gap: 6, font: `700 10.5px/1 ${MONO}`, color: i === 0 ? RED : META }}
              >
                {i > 0 && <Icon name="arrow" size={11} color={GHOST} />}
                {item}
              </span>
            ))}
          </span>
        </ChoiceCard>
      ))}
    </ChoiceGroup>
  )
}

const CEFR_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
const VOCAB_CHECK = [
  ["buy", "pay money to get something", "return something"],
  ["increase", "become larger", "become hidden"],
  ["reliable", "can be trusted", "very expensive"],
  ["allocate", "assign for a purpose", "remove permanently"],
  ["ambiguous", "open to more than one meaning", "proven beyond doubt"],
  ["circumspect", "careful to consider risks", "eager to act immediately"],
] as const

/**
 * Which rows render the CORRECT definition second (i.e. on the right).
 *
 * Rendering `[correct, wrong]` put the right answer in the left button on every
 * single row, so tapping left six times scored 6/6 → C2 — and C2 tells Charles
 * to explain everything in full examiner language, the exact opposite of the
 * support a learner who guessed actually needs. This is the same answer-position
 * bias that withShuffledOptions() exists to prevent in the question banks.
 *
 * Kept as an explicit, balanced mask rather than a hash: over six fixed rows a
 * hash lands 5–1 as easily as 3–3, and this is auditable at a glance. Extend it
 * whenever a row is added to VOCAB_CHECK (the render falls back to correct-first
 * for any index past the end, so keep the lengths in step).
 */
const VOCAB_CORRECT_SECOND: readonly boolean[] = [false, true, false, true, true, false]

function EnglishBaselineSlide({ route, level, evidence, certificate, certificateBusy, certificateError, certificateType, onLevel, onEvidence, onCertificate, onCertificateType }: {
  route: LearnerRoute | null; level: CefrLevel | null; evidence: EnglishEvidence | null; certificate: File | null
  certificateBusy: boolean; certificateError: string
  certificateType: "IELTS" | "TOEFL" | "Cambridge" | "Other"; onLevel: (value: CefrLevel | null) => void; onEvidence: (value: EnglishEvidence) => void
  onCertificate: (value: File | null) => void; onCertificateType: (value: "IELTS" | "TOEFL" | "Cambridge" | "Other") => void
}) {
  /*
   * The chosen DEFINITION per row, not whether it happened to be right.
   *
   * Storing the boolean meant the control had no value of its own to be selected
   * against, which is why it could not become a radiogroup. Scoring moves to
   * finishQuiz, where it belongs, and the behaviour is unchanged: n correct maps
   * to CEFR_LEVELS[n - 1], clamped.
   */
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const modes: { id: EnglishEvidence; label: string; icon: IconName }[] = [
    { id: "certificate", label: "Use certificate", icon: "upload" }, { id: "self", label: "Select A1–C2", icon: "stats" }, { id: "vocabulary", label: "Vocabulary check", icon: "tutor" },
  ]
  const answered = Object.keys(answers).length
  const finishQuiz = () => {
    const correct = VOCAB_CHECK.filter(([, right], index) => answers[index] === right).length
    onLevel(CEFR_LEVELS[Math.max(0, Math.min(CEFR_LEVELS.length - 1, correct - 1))])
    onEvidence("vocabulary")
  }
  return <div style={{ maxWidth: 590 }}>
    <ChoiceGroup
      label="How should we set your English level?"
      values={modes.map((mode) => mode.id)}
      value={evidence}
      onChange={(next) => { onEvidence(next as EnglishEvidence); onLevel(null) }}
      layout="grid"
      columns={3}
      gap={8}
    >
      {modes.map((mode) => (
        <ChoiceTile
          key={mode.id}
          value={mode.id}
          label={mode.label}
          icon={<Icon name={mode.icon} size={17} color={evidence === mode.id ? RED : BODY} />}
        />
      ))}
    </ChoiceGroup>
    {evidence === "self" && <div style={{ marginTop: 14 }}>
      <ChoiceGroup label="Your CEFR English level" values={CEFR_LEVELS} value={level} onChange={(next) => onLevel(next as CefrLevel)} layout="row" gap={7}>
        {CEFR_LEVELS.map((item) => <ChoicePill key={item} value={item} label={item} mono />)}
      </ChoiceGroup>
      <p style={{ margin: "9px 0 0", font: `500 11.5px/1.45 ${SANS}`, color: MUTE }}>A1–A2 gets short explanations and defined terminology. B1–B2 gets plain exam English. C1–C2 uses full examiner language.</p>
    </div>}
    {evidence === "certificate" && <div style={{ marginTop: 14, padding: 14, borderRadius: 14, border: `1px solid ${BORDER}`, background: "#fff" }}>
      <ChoiceGroup
        label="Certificate type"
        values={["IELTS", "TOEFL", "Cambridge", "Other"]}
        value={certificateType}
        onChange={(next) => onCertificateType(next as "IELTS" | "TOEFL" | "Cambridge" | "Other")}
        layout="grid"
        columns={2}
        gap={6}
        style={{ marginBottom: 9 }}
      >
        {(["IELTS", "TOEFL", "Cambridge", "Other"] as const).map((type) => <ChoiceTile key={type} value={type} label={type} />)}
      </ChoiceGroup>
      <label style={{ display: "block", padding: 11, borderRadius: 10, border: `1.5px dashed ${level ? GREEN : certificateError ? RED : "#D7CCC4"}`, cursor: certificateBusy ? "wait" : "pointer", font: `650 11.5px/1.3 ${SANS}`, color: level ? GREEN : BODY }}><input type="file" accept=".pdf,application/pdf" disabled={certificateBusy} onChange={(event) => void onCertificate(event.target.files?.[0] ?? null)} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />{certificateBusy ? "Charles is reading the certificate…" : level ? `${certificate?.name} · ${level} equivalent verified` : "Attach original text-based certificate PDF"}</label>
      {certificateError && <div role="alert" style={{ marginTop: 7, color: RED, font: `600 10.5px/1.4 ${SANS}` }}>{certificateError}</div>}
      <div style={{ margin: "9px 0 0", font: `500 10px/1.4 ${SANS}`, color: MUTE }}>Scholify reads the score and derives A1–C2; it does not verify the issuer’s authenticity. The original PDF is not retained.</div>
    </div>}
    {evidence === "vocabulary" && <div style={{ marginTop: 13, display: "grid", gap: 9 }}>
      {VOCAB_CHECK.map(([word, correct, wrong], index) => {
        // VOCAB_CORRECT_SECOND balances which side holds the right answer; see
        // its declaration for why answer-position bias matters here.
        const options = VOCAB_CORRECT_SECOND[index] ? [wrong, correct] : [correct, wrong]
        return (
          <div key={word} style={{ display: "grid", gridTemplateColumns: "82px 1fr", gap: 8, alignItems: "center" }}>
            <strong style={{ font: `800 11px/1.3 ${MONO}` }}>{word}</strong>
            <ChoiceGroup
              label={`What does "${word}" mean?`}
              values={options}
              value={answers[index] ?? null}
              onChange={(next) => setAnswers((old) => ({ ...old, [index]: next }))}
              layout="grid"
              columns={2}
              gap={6}
            >
              {options.map((option) => <ChoiceTile key={option} value={option} label={option} />)}
            </ChoiceGroup>
          </div>
        )
      })}
      <GlassButton onClick={finishQuiz} disabled={answered < VOCAB_CHECK.length} full>
        Set my support level
      </GlassButton>
    </div>}
    {level && <div style={{ marginTop: 11, padding: "10px 12px", borderRadius: 10, background: "rgba(14,159,110,.08)", color: "#177054", font: `700 11.5px/1.4 ${SANS}` }}>Charles will coach you at {level} English{route === "new" ? " while teaching ACCA foundations" : ""}.</div>}
  </div>
}

function ValueTrio({ style, big }: { style?: CSSProperties; big?: boolean }) {
  const items: { icon: IconName; text: string }[] = [
    { icon: "diagnostic", text: "A live Exam Readiness Score — know where you stand every day" },
    { icon: "mission", text: "Daily missions built from YOUR weakest areas" },
    { icon: "tutor", text: "Charles: your AI race engineer on every question + examiner-style marking" },
  ]
  return (
    <div style={{ display: "grid", gap: big ? 9 : 8, ...style }}>
      {items.map((it, i) => (
        <motion.div key={it.text} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.12 }} style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ flex: "none", width: big ? 26 : 24, height: big ? 26 : 24, borderRadius: 8, background: "rgba(200,0,0,.08)", display: "grid", placeItems: "center" }}>
            <Icon name={it.icon} size={big ? 14 : 13} color={RED} />
          </span>
          <span style={{ font: `600 ${big ? 13.5 : 12.5}px/1.4 ${SANS}`, color: "#3E3831" }}>{it.text}</span>
        </motion.div>
      ))}
    </div>
  )
}

function PaperSlide({
  levels, paper, setPaper, variant, setVariant, passed, setPassed, showPassed, setShowPassed, isMobile,
}: {
  levels: ReturnType<typeof paperLevels>
  paper: string | null
  setPaper: (p: string | null) => void
  variant: PaperVariant | null
  setVariant: (variant: PaperVariant) => void
  passed: Set<string>
  setPassed: (fn: (prev: Set<string>) => Set<string>) => void
  showPassed: boolean
  setShowPassed: (fn: (v: boolean) => boolean) => void
  isMobile: boolean
}) {
  return (
    <div>
      {/* ONE radiogroup across all three level columns, because it is one
          decision. The `style` override supplies the column layout; ChoiceGroup
          finds its radios at any nesting depth, so arrow keys walk the papers in
          reading order. */}
      <ChoiceGroup
        label="Which paper are you preparing for?"
        values={levels.flatMap((g) => g.papers.map((p) => p.id))}
        value={paper}
        onChange={setPaper}
        style={{ display: isMobile ? "block" : "flex", gap: 18 }}
      >
        {levels.map((g) => (
          <div key={g.key} style={{ flex: 1, marginBottom: isMobile ? 18 : 0 }}>
            <FieldLabel style={{ color: FAINT, letterSpacing: "0.12em", marginBottom: 9 }}>{g.label}</FieldLabel>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr", gap: 8 }}>
              {g.papers.map((p) => (
                <ChoiceTile
                  key={p.id}
                  value={p.id}
                  label={p.id}
                  sub={passed.has(p.id) ? "Already passed" : p.name}
                  disabled={passed.has(p.id)}
                  mono
                />
              ))}
            </div>
          </div>
        ))}
      </ChoiceGroup>
      {paper && ["LW", "TX"].includes(paper) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 16, padding: 14, border: `1px solid ${BORDER}`, borderRadius: 14, background: "#FAFAF9" }}
        >
          <FieldLabel style={{ color: INK, letterSpacing: ".08em", marginBottom: 9 }}>
            {paper === "LW" ? `Choose ${paper} variant` : `Choose ${paper} route`}
          </FieldLabel>
          <ChoiceGroup
            label={paper === "LW" ? `${paper} syllabus variant` : `${paper} study route`}
            values={["UK", "GLOBAL"]}
            value={variant}
            onChange={(next) => setVariant(next as PaperVariant)}
            layout="grid"
            columns={2}
            gap={8}
          >
            {/*
              LW's two options are both OFFICIAL ACCA exam variants, so either is a valid
              exam route. TX's are not symmetrical: TX-UK is the exam (FA2025), while
              TX-Global is a jurisdiction-neutral FOUNDATION track with no ACCA exam behind
              it — so it offers no mocks. The copy has to say so, or a learner sitting a
              non-UK TX variant will pick it expecting exam preparation and get principles.
            */}
            {([
              ["UK", "United Kingdom", paper === "LW" ? "English legal system and UK business law" : "The TX-UK exam — Finance Act 2025 rates and rules"],
              ["GLOBAL", paper === "LW" ? "Global" : "Foundation", paper === "LW" ? "Official LW Global syllabus" : "Jurisdiction-neutral principles · not an ACCA exam variant, so no mocks"],
            ] as const).map(([value, label, blurb]) => (
              <ChoiceTile key={value} value={value} label={label} sub={blurb} />
            ))}
          </ChoiceGroup>
        </motion.div>
      )}
      <button
        onClick={() => setShowPassed((v) => !v)}
        style={{ display: "inline-block", marginTop: isMobile ? 4 : 20, font: `600 ${isMobile ? 12 : 13}px/1 ${SANS}`, color: MUTE, textDecoration: "underline", textUnderlineOffset: 3, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        {showPassed ? "Done marking passed papers" : "I've already passed some papers"}
      </button>
      {/* Multi-select, so these are aria-pressed toggles rather than radios —
          any number of papers can already be passed. */}
      {showPassed && (
        <div role="group" aria-label="Papers I have already passed" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {levels.flatMap((g) => g.papers).map((p) => (
            <TogglePill
              key={p.id}
              label={p.id}
              on={passed.has(p.id)}
              ariaLabel={`${p.id} — ${p.name}`}
              onToggle={() => {
                setPassed((prev) => {
                  const n = new Set(prev)
                  if (n.has(p.id)) n.delete(p.id)
                  else n.add(p.id)
                  return n
                })
                if (paper === p.id) setPaper(null)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TimeSlide({
  minutes, setMinutes, slot, setSlot, studyDays, setStudyDays, toggleStudyDay,
}: {
  minutes: number
  setMinutes: (n: number) => void
  slot: string
  setSlot: (s: string) => void
  studyDays: number[]
  setStudyDays: (days: number[]) => void
  toggleStudyDay: (day: number) => void
}) {
  const preset = MINUTE_OPTIONS.find((m) => m.v === minutes)
  const micro =
    preset?.micro ??
    (minutes >= 90
      ? "Marathon pace — remember: consistency beats intensity. Daily beats heroic."
      : `${minutes} minutes, every day, protected — the loop will size your missions to fit.`)
  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DurationPicker value={minutes} onChange={setMinutes} min={40} max={240} />
      </div>
      {/* Numeric values cross the group boundary as strings — ChoiceGroup keys on
          identity, and a string keeps the DOM value and the aria state in step. */}
      <ChoiceGroup
        label="Minutes a day"
        values={MINUTE_OPTIONS.map((m) => String(m.v))}
        value={String(minutes)}
        onChange={(next) => setMinutes(Number(next))}
        layout="row"
        gap={8}
        style={{ marginTop: 4, justifyContent: "center" }}
      >
        {MINUTE_OPTIONS.map((m) => <ChoicePill key={m.v} value={String(m.v)} label={`${m.v} min · ${m.label}`} />)}
      </ChoiceGroup>
      <div style={{ marginTop: 11, padding: "14px 16px", borderRadius: 14, background: "rgba(200,0,0,.05)", border: "1px solid rgba(200,0,0,.14)", font: `500 13px/1.45 ${SANS}`, color: "#8A2222" }}>
        {micro}
      </div>
      {/* Sitting on the floor of the picker gets said HERE, while the control is
          still in front of the learner — not saved for the summary slide, where
          acting on it means walking back through the deck. */}
      {minutes <= MIN_DAILY_MINUTES && (
        <MinutesNudge
          text={`${minutes} minutes is the floor, not the target. Try to protect more than ${TARGET_DAILY_MINUTES} minutes a day — that is the pace most passers keep, and it is what lets Charles fit a topic, its practice and your flashcards into one sitting.`}
        />
      )}
      {/*
        * The exact start time. The four tiles are shortcuts, not the answer —
        * the clock below is, and it is what the three daily reminders are all
        * measured from (−3h, −10min, and a late catch-up). A learner who trains
        * at 06:40 could not previously say so: the tiles were the only input, so
        * every reminder would have been aimed at 08:00.
        *
        * A native <input type="time"> on purpose: it gets the platform's own
        * spinner/keypad, respects the device's 12h/24h convention, is keyboard
        * and screen-reader complete, and cannot drift from the value we store.
        */}
      <FieldLabel style={{ marginTop: 22, color: FAINT }}>My practice time starts at</FieldLabel>
      <ChoiceGroup
        label="Quick presets"
        values={SLOT_OPTIONS.map((s) => s.time)}
        value={slot}
        onChange={setSlot}
        layout="grid"
        columns={SLOT_OPTIONS.length}
        gap={8}
      >
        {SLOT_OPTIONS.map((s) => <ChoiceTile key={s.time} value={s.time} label={s.label} />)}
      </ChoiceGroup>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
        <label
          htmlFor="practice-clock"
          style={{ font: `700 12.5px/1.3 ${SANS}`, color: MUTE, flex: "1 1 auto", minWidth: 130 }}
        >
          Exact start time
        </label>
        <input
          id="practice-clock"
          type="time"
          value={slot}
          onChange={(e) => { if (e.target.value) setSlot(e.target.value) }}
          step={300}
          style={{
            font: `800 17px/1 ${MONO}`, color: INK, background: "#fff",
            border: `1.5px solid ${BORDER}`, borderRadius: 12,
            padding: "12px 14px", minHeight: 48, minWidth: 124,
            fontVariantNumeric: "tabular-nums",
          }}
        />
      </div>
      <div style={{ marginTop: 8, font: `500 12px/1.5 ${SANS}`, color: FAINT }}>
        Charles will remind you 3 hours ahead, 10 minutes before you start, and once more
        later if the day gets away from you. You can change all of this in Settings.
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 18 }}>
        <FieldLabel style={{ color: FAINT, margin: 0 }}>Days I can honestly protect</FieldLabel>
        {/* 05 / 07 — the count reads off the days, so the two can never
            disagree. Zero-padded and monospaced so it does not jitter as it
            changes. */}
        <motion.span
          key={studyDays.length}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ font: `800 13px/1 ${MONO}`, color: studyDays.length ? RED : FAINT, fontVariantNumeric: "tabular-nums" }}
        >
          {String(studyDays.length).padStart(2, "0")} / 07
        </motion.span>
      </div>

      {/*
        The count tiles are PRESETS, not a separate answer. Tapping "5 days"
        fills five days; tapping a day adjusts the count. Version one of this
        let the two contradict each other and then printed a warning about it,
        which is the app arguing with the learner about something only the app
        cared about.
      */}
      <ChoiceGroup
        label="Days a week I can protect"
        values={["4", "5", "6", "7"]}
        value={String(studyDays.length)}
        onChange={(next) => setStudyDays(defaultStudyDays(Number(next)))}
        layout="grid"
        columns={4}
        gap={8}
      >
        {[4, 5, 6, 7].map((days) => <ChoiceTile key={days} value={String(days)} label={`${days} days`} />)}
      </ChoiceGroup>

      <FieldLabel style={{ marginTop: 16, color: FAINT }}>Which days?</FieldLabel>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {WEEK_DAYS.map(({ day, short, long }, i) => {
          const on = studyDays.includes(day)
          return (
            <motion.button
              key={day}
              type="button"
              onClick={() => toggleStudyDay(day)}
              aria-pressed={on}
              aria-label={long}
              // Stagger in left-to-right so the week reads as a week.
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.93 }}
              style={{
                flex: "1 1 60px", minWidth: 56, minHeight: 50, borderRadius: 12, cursor: "pointer",
                font: `800 12.5px/1 ${MONO}`,
                letterSpacing: "0.04em",
                color: on ? "#fff" : INK,
                background: on ? RED : "#fff",
                border: `1.5px solid ${on ? RED : BORDER}`,
                boxShadow: on ? "0 6px 16px -8px rgba(200,0,0,.55)" : "none",
                transition: "background .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease",
              }}
            >
              {short.toUpperCase()}
            </motion.button>
          )
        })}
      </div>
      <div style={{ marginTop: 8, font: `500 12px/1.5 ${SANS}`, color: FAINT }}>
        {studyDays.length === 0
          ? "Pick at least one day — the plan needs somewhere to put the work."
          : `Charles plans around these days, and only emails you on them.`}
      </div>
    </div>
  )
}

function SittingSlide({
  sessionPaper, paper, sittings, pickedSitting, onPick, examDate, setExamDate,
}: {
  sessionPaper: boolean
  paper: string | null
  sittings: Sitting[]
  pickedSitting: string | null
  onPick: (date: string) => void
  examDate: string
  setExamDate: (d: string) => void
}) {
  return (
    <div style={{ maxWidth: 480 }}>
      {sessionPaper ? (
        <>
          <ChoiceGroup
            label="Which sitting are you entering?"
            values={sittings.map((s) => s.date)}
            value={pickedSitting}
            onChange={onPick}
            gap={11}
          >
            {sittings.map((s) => (
              <ChoiceCard
                key={s.date}
                value={s.date}
                title={`${s.label} sitting`}
                detail={`Exam week ${s.week} · plan counts back from it`}
                icon={<Icon name="calendar" size={20} color={pickedSitting === s.date ? "#fff" : RED} />}
              />
            ))}
          </ChoiceGroup>
          {/* Once a sitting is chosen, the calendar animates to that month and
              highlights the exam week the whole plan counts back from. */}
          {pickedSitting && (
            <div style={{ marginTop: 14 }}>
              <ExamCalendar value={pickedSitting} highlightWeek />
            </div>
          )}
        </>
      ) : (
        <div>
          <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.13em", textTransform: "uppercase", color: FAINT, marginBottom: 10 }}>
            {paper ?? "Your paper"} · on-demand computer exam — pick your date
          </div>
          <ExamCalendar value={examDate} onSelect={setExamDate} />
          <div style={{ marginTop: 10, font: `500 12px/1.35 ${SANS}`, color: META }}>Book any date at your local centre — your plan counts back from it.</div>
        </div>
      )}
    </div>
  )
}

function GoalSlide({
  goal, setGoal: set, target, setTarget,
}: {
  goal: Goal | null
  setGoal: (g: Goal) => void
  target: number | null
  setTarget: (n: number) => void
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11, maxWidth: 500 }}>
      <ChoiceGroup
        label="What is your goal for this paper?"
        values={GOAL_OPTIONS.map((o) => o.value)}
        value={goal}
        onChange={(next) => set(next as Goal)}
        gap={11}
      >
        {GOAL_OPTIONS.map((o) => (
          <ChoiceCard
            key={o.value}
            value={o.value}
            title={o.label}
            detail={o.blurb}
            icon={<Icon name={GOAL_ICON[o.value]} size={18} color={goal === o.value ? "#fff" : RED} />}
          />
        ))}
      </ChoiceGroup>

      {/* target pass probability — the number the whole plan will chase */}
      <div style={{ marginTop: 10 }}>
        <FieldLabel style={{ color: FAINT }}>Your target before exam day</FieldLabel>
        <ChoiceGroup
          label="Target Exam Readiness Score"
          values={TARGET_OPTIONS.map((t) => String(t.v))}
          value={target === null ? null : String(target)}
          onChange={(next) => setTarget(Number(next))}
          layout="grid"
          columns={TARGET_OPTIONS.length}
          gap={8}
        >
          {TARGET_OPTIONS.map((t, index) => {
            const selected = target === t.v
            return (
              <motion.div
                key={t.v}
                layout
                animate={{
                  y: selected ? -4 : 0,
                  scale: selected ? 1.035 : 1,
                  filter: selected ? "drop-shadow(0 10px 14px rgba(200,0,0,.16))" : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                }}
                transition={{ type: "spring", stiffness: 360, damping: 24, delay: selected ? index * 0.025 : 0 }}
              >
                <ChoiceTile value={String(t.v)} label={t.label} sub={t.blurb} />
              </motion.div>
            )
          })}
        </ChoiceGroup>
        <p style={{ margin: "8px 0 0", font: `500 12px/1.4 ${SANS}`, color: MUTE }}>
          Exam Readiness Score — the number your diagnostic sets and your plan pushes to this line.
        </p>
      </div>
    </div>
  )
}

function ResultUploadSlide({
  paper, file, analysis, busy, error, choice, route, onFile, onChoice,
}: {
  paper: string
  file: File | null
  analysis: ResultUploadAnalysis | null
  busy: boolean
  error: string
  choice: AssessmentPath | null
  route: LearnerRoute | null
  onFile: (file: File | null) => void
  onChoice: (choice: AssessmentPath) => void
}) {
  const options: { value: AssessmentPath; title: string; detail: string }[] = route === "practice"
    ? [
        { value: "diagnostic", title: "Take a readiness check", detail: "A short mixed assessment of coverage, accuracy, pace, and exam technique." },
        { value: "timed-practice", title: "Start with timed mixed practice", detail: "Use a timed readiness set when you do not have a recent result." },
      ]
    : [
        { value: "diagnostic", title: "Take a targeted gap check", detail: "Sample studied areas and find what needs reinforcement." },
        { value: "reported", title: "Map what I have completed", detail: "Use my course progress, then verify claimed topics gradually through questions." },
      ]
  return (
    <div style={{ maxWidth: 540 }}>
      <label style={{ display: "block", padding: "22px", borderRadius: 18, border: `1.5px dashed ${analysis ? GREEN : error ? RED : "#D7CCC4"}`, background: analysis ? "rgba(14,159,110,.06)" : "#fff", cursor: busy ? "wait" : "pointer" }}>
        <input
          type="file"
          accept="application/pdf,.pdf"
          disabled={busy}
          onChange={(event) => void onFile(event.target.files?.[0] ?? null)}
          style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0 }}
        />
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ width: 42, height: 42, borderRadius: 13, background: analysis ? "rgba(14,159,110,.12)" : "rgba(200,0,0,.08)", display: "grid", placeItems: "center", flex: "none" }}>
            <Icon name={analysis ? "done" : "upload"} size={21} color={analysis ? GREEN : RED} />
          </span>
          <div>
            <div style={{ font: `800 15px/1.3 ${SANS}`, color: INK }}>
              {busy ? "Charles is reading your result…" : analysis ? analysis.headline : file ? file.name : "Choose result PDF"}
            </div>
            <div style={{ marginTop: 6, font: `500 12.5px/1.5 ${SANS}`, color: analysis ? "#24745B" : MUTE }}>
              {analysis
                ? `${analysis.score}% · ${analysis.areas.length} syllabus areas found. Charles will use this evidence and verify it through practice.`
                : `Text-based PDF · ${Math.round(RESULT_PDF_MAX_BYTES / 1024 / 1024)} MB max · ${paper} score plus topic or section breakdown required.`}
            </div>
          </div>
        </div>
      </label>
      {analysis && (
        <div style={{ marginTop: 12, padding: "15px 17px", borderRadius: 14, background: "rgba(244,164,5,.09)", border: "1px solid rgba(244,164,5,.24)", font: `500 13px/1.5 ${SANS}`, color: "#6B4E12" }}>
          {analysis.feedback}
        </div>
      )}
      {error && (
        <div role="alert" style={{ marginTop: 12, padding: "13px 15px", borderRadius: 13, background: "rgba(200,0,0,.06)", color: "#8E1B1B", font: `600 12.5px/1.45 ${SANS}` }}>
          {error} You can continue without a document using one of the assessment choices below.
        </div>
      )}
      <ChoiceGroup
        label="How should we set your baseline?"
        values={options.map((option) => option.value)}
        value={choice}
        onChange={(next) => onChoice(next as AssessmentPath)}
        gap={9}
        style={{ marginTop: 14 }}
      >
        {options.map((option) => (
          <ChoiceCard key={option.value} value={option.value} title={option.title} detail={option.detail} />
        ))}
      </ChoiceGroup>
      <p style={{ margin: "12px 2px 0", font: `500 11.5px/1.45 ${SANS}`, color: FAINT }}>
        Upload is optional. Scholify extracts planning evidence and does not retain the original PDF.
      </p>
    </div>
  )
}

/**
 * CapacityPlan plus the one analytics event that matters: how often Charles tells
 * a learner their plan is short, and with what numbers. Paired with
 * `onboarding_capacity_fix` (fired in applyGuideFix) this answers whether the
 * recommendation is actually acted on, or whether learners read the warning and
 * carry on regardless — which would mean the copy, not the maths, needs work.
 */
function CapacityCoach({
  guide, onApplyFix, compact, paper,
}: {
  guide: OnboardingGuide
  onApplyFix: (fix: GuideFix) => void
  compact: boolean
  paper: string
}) {
  useEffect(() => {
    if (guide.status !== "risky") return
    trackEvent("onboarding_capacity_warning", {
      paper,
      status: guide.status,
      deficitHours: guide.deficitHours,
      coverage: Math.round(guide.coverage * 100),
      availableWeeks: guide.availableWeeks,
      recommendedWeeks: guide.recommendedWeeks,
      fixes: guide.fixes.map((f) => f.kind).join(","),
    })
    // Once per verdict, not once per render — the numbers ARE the identity here.
  }, [guide.status, guide.deficitHours, guide.coverage, guide.availableWeeks, guide.recommendedWeeks, guide.fixes, paper])

  return <CapacityPlan guide={guide} onApplyFix={onApplyFix} compact={compact} />
}

function ReadySlide({
  paper, minutes, slot, examDate, sitting, goal, target, uploadedResult, onDiagnostic, onUploaded, finishBusy, finishError, isMobile, learnerRoute, englishLevel, daysPerWeek, onApplyFix, onEdit,
}: {
  paper: string
  minutes: number
  slot: string
  examDate: string
  sitting: Sitting | null
  goal: Goal | null
  target: number
  uploadedResult: ResultUploadAnalysis | null
  onDiagnostic: () => void
  onUploaded: () => void
  finishBusy: boolean
  finishError: string
  isMobile: boolean
  learnerRoute: LearnerRoute | null
  englishLevel: CefrLevel | null
  daysPerWeek: number
  onApplyFix: (fix: GuideFix) => void
  /** Jump to the step that owns a summary row. */
  onEdit: (step: number) => void
}) {
  const reducedMotion = useReducedMotion()
  const [recommendationReady, setRecommendationReady] = useState(Boolean(reducedMotion))
  const guide = buildOnboardingGuide({ paperId: paper, route: learnerRoute, englishLevel, minutesPerDay: minutes, daysPerWeek, examDate, targetPercentage: target, contentHours: paperWorkHours(paper) })
  const slotLabel = SLOT_OPTIONS.find((s) => s.time === slot)?.label ?? slot
  const goalLabel = GOAL_OPTIONS.find((g) => g.value === goal)?.label
  /** label, value, and the step that owns it — the third field makes it editable. */
  const rows: [string, string, number | null][] = [
    ["Paper", paper, PAPER_STEP],
    ["Schedule", `${minutes} min · ${daysPerWeek} days · ${slotLabel}`, TIME_STEP],
    ["Your target", `${guide.recommendedTarget}% readiness`, 7],
    ["Ready from", guide.estimatedReadyLabel, null],
  ]

  useEffect(() => {
    if (reducedMotion) {
      setRecommendationReady(true)
      return
    }
    setRecommendationReady(false)
    const timer = window.setTimeout(() => {
      setRecommendationReady(true)
      try {
        void confetti({ particleCount: 110, spread: 78, startVelocity: 32, origin: { x: 0.62, y: 0.34 }, colors: [RED, "#E50068", "#F4A405", "#10B981"] })
      } catch { /* celebration is decorative */ }
    }, 1150)
    return () => window.clearTimeout(timer)
  }, [paper, target, examDate, minutes, daysPerWeek, reducedMotion])

  if (!recommendationReady) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 500, minHeight: 330, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ rotate: { duration: 1.15, repeat: Infinity, ease: "linear" }, scale: { duration: .8, repeat: Infinity } }}
            style={{ width: 66, height: 66, margin: "0 auto 20px", borderRadius: 22, display: "grid", placeItems: "center", background: "rgba(200,0,0,.07)", border: "1px solid rgba(200,0,0,.16)" }}
          >
            <Icon name="tutor" size={30} color={RED} />
          </motion.div>
          <div style={{ font: `800 20px/1.25 ${SANS}`, color: INK }}>Charles is calculating your finish line…</div>
          <div style={{ marginTop: 9, font: `500 13px/1.5 ${SANS}`, color: MUTE }}>Balancing your target and sustainable study pace.</div>
          <motion.div style={{ width: 220, height: 4, margin: "20px auto 0", borderRadius: 99, overflow: "hidden", background: BORDER }}>
            <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} style={{ width: "100%", height: "100%", background: "linear-gradient(90deg,#C80000,#E50068,#F4A405)" }} />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 230, damping: 22 }} style={{ maxWidth: 500 }}>
      <motion.div initial={reducedMotion ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .08, type: "spring", stiffness: 300, damping: 20 }} style={{ marginBottom: 14, padding: "14px 17px", borderRadius: 16, background: "linear-gradient(135deg,rgba(16,185,129,.13),rgba(244,164,5,.10))", border: "1px solid rgba(16,185,129,.25)", display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ width: 38, height: 38, borderRadius: 99, display: "grid", placeItems: "center", background: "#10B981", flex: "none" }}><Icon name="done" size={20} color="#fff" /></span>
        <span>
          <span style={{ display: "block", font: `850 15px/1.25 ${SANS}`, color: "#087A55" }}>Good news — your route is ready.</span>
          <span style={{ display: "block", marginTop: 3, font: `600 12.5px/1.4 ${SANS}`, color: BODY }}>From {guide.estimatedReadyLabel}, you’ll be ready to perform at your {target}% target.</span>
        </span>
      </motion.div>
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }} role="note" style={{ margin: "-4px 0 14px", padding: "11px 14px", borderRadius: 13, background: "rgba(244,164,5,.10)", border: "1px solid rgba(244,164,5,.30)", color: "#6B4E12", font: `700 12px/1.45 ${SANS}`, display: "flex", gap: 9, alignItems: "flex-start" }}>
        <Icon name="diagnostic" size={16} color="#B37503" style={{ marginTop: 1, flex: "none" }} />
        <span><b>Important:</b> it is just an estimated roadmap if you stay consistent.</span>
      </motion.div>
      {/* No mascot here any more. Charles now sits in this panel's corner on every
          slide including this one, so a second centred Charles put two of him on
          the final screen. The capacity verdict he used to signal by pose is still
          carried by this card's colour and its "Charles recommends" headline — and
          the 82px it frees goes to the busiest slide in the flow. */}
      <CapacityCoach guide={guide} onApplyFix={onApplyFix} compact={isMobile} paper={paper} />
      <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 30px -22px rgba(20,20,26,.4)" }}>
        {/*
          * Each row is now a BUTTON back to the step that owns it.
          *
          * This is the last screen before the plan is built, and it was read-only:
          * a learner who noticed the wrong paper or the wrong sitting here had to
          * work out how many Back presses that was and hope. A summary that shows
          * a mistake but will not let you correct it is worse than one that shows
          * nothing — it puts the error in front of someone and then blocks them.
          */}
        {rows.map(([k, v, jumpTo], i) => (
          <motion.button
            key={k}
            type="button"
            onClick={() => { if (jumpTo !== null) onEdit(jumpTo) }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.08 }}
            whileTap={{ scale: 0.995 }}
            aria-label={`${k}: ${v}${jumpTo !== null ? ". Tap to change." : ". Recommended by Charles."}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              width: "100%", textAlign: "left", background: "transparent", cursor: jumpTo !== null ? "pointer" : "default",
              padding: isMobile ? "16px 18px" : "18px 22px", minHeight: 56,
              border: "none", borderTop: i > 0 ? `1px solid ${BORDER}` : "none", font: "inherit",
            }}
          >
            <span style={{ font: `600 12px/1 ${MONO}`, letterSpacing: "0.06em", textTransform: "uppercase", color: FAINT, flexShrink: 0 }}>{k}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ font: `700 ${isMobile ? 14 : 15}px/1.2 ${SANS}`, color: INK, textAlign: "right" }}>{v}</span>
              {jumpTo !== null ? <Icon name="chevron" size={14} color={FAINT} /> : <Icon name="tutor" size={14} color="#C80000" />}
            </span>
          </motion.button>
        ))}
        <div style={{ padding: isMobile ? "10px 18px 14px" : "10px 22px 16px", borderTop: `1px solid ${BORDER}`, font: `500 11.5px/1.4 ${SANS}`, color: FAINT }}>
          Charles builds the plan around your chosen target and exact exam date, then adjusts the daily route as your readiness changes.
        </div>
      </div>
      {/* Charles's "why", warm and honest — the reason the recommended path
          below follows from what the learner just told us about themselves. */}
      <div style={{ marginTop: 18, display: "flex", gap: 12, padding: "16px 18px", borderRadius: 16, background: "rgba(244,164,5,.09)", border: "1px solid rgba(244,164,5,.28)" }}>
        <Icon name={uploadedResult ? "done" : "diagnostic"} size={18} color="#B37503" style={{ marginTop: 1 }} />
        <span style={{ font: `500 13px/1.45 ${SANS}`, color: "#6B4E12" }}>
          {uploadedResult ? (
            <>
              Charles verified your {uploadedResult.resultKind === "mock" ? "mock" : "exam"} result and found <b style={{ fontWeight: 700, color: "#4E3A0D" }}>{uploadedResult.areas.length} usable syllabus areas</b>. Your plan will begin with the weakest evidence from that PDF.
            </>
          ) : (
            <>
              {learnerRoute === "new"
                ? <>You are starting from the beginning, so Charles will <b style={{ fontWeight: 700, color: "#4E3A0D" }}>teach first and measure as you learn</b>. No pointless entry test is required.</>
                : learnerRoute === "practice"
                  ? <>Your short <b style={{ fontWeight: 700, color: "#4E3A0D" }}>exam-readiness check</b> will focus on coverage, pace, accuracy, and exam technique—not beginner lessons.</>
                  : <>Charles will use a <b style={{ fontWeight: 700, color: "#4E3A0D" }}>targeted gap check</b> to complement your current studies without restarting the syllabus.</>}
            </>
          )}
        </span>
      </div>
      {!isMobile && (
        <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
          <GlassButton big disabled={finishBusy} onClick={uploadedResult ? onUploaded : onDiagnostic}>
            {finishBusy
              ? "Building your plan…"
              : uploadedResult
                ? "Build my plan from this result"
                : learnerRoute === "new"
                  ? "Build my plan and start learning"
                  : learnerRoute === "practice"
                    ? "Assess my readiness and start practising"
                    : "Map my gaps and build my plan"}
          </GlassButton>
          {finishError && <p role="alert" style={{ margin: "10px 0 0", color: RED, font: `600 12px/1.4 ${SANS}` }}>{finishError}</p>}
        </div>
      )}
    </motion.div>
  )
}

/** Mobile primary action — the shared glass control, full width. */
function PrimaryBtn({ children, onClick, big, disabled }: { children: ReactNode; onClick: () => void; big?: boolean; disabled?: boolean }) {
  return (
    <GlassButton onClick={onClick} disabled={disabled} big={big} full>
      {children}
    </GlassButton>
  )
}

/* ── desktop right visual panels ─────────────────────────────── */

function IllusBase({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 90% at 78% 16%, rgba(200,0,0,.10), transparent 58%), radial-gradient(100% 80% at 12% 92%, rgba(244,164,5,.13), transparent 55%), ${PANEL}` }} />
      <div style={{ position: "absolute", right: -80, top: -60, opacity: 0.05, pointerEvents: "none" }}>
        <ScholifyMark size={400} variant="ink" />
      </div>
      {children}
    </div>
  )
}

function VisualPanel({
  step, paper, sitting, sittings, levels, learnerRoute, englishLevel,
}: {
  step: number
  paper: string | null
  sitting: Sitting | null
  sittings: Sitting[]
  levels: ReturnType<typeof paperLevels>
  /* Steps 1 and 2 used to fall through to the generic loop panel, so the visual
     side sat inert while the learner was choosing — the paper step (3) reacted
     live and the two before it did not. These two props are what let them. */
  learnerRoute: LearnerRoute | null
  englishLevel: CefrLevel | null
}) {
  const reducedLoop = useReducedMotion()
  /* 0 · welcome photo + brand chip */
  if (step === 0) {
    return (
      <div style={{ position: "absolute", inset: 0, background: PANEL }}>
        <img src="/onboarding/welcome-d.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: "clamp(16px, 2.4vw, 28px)", bottom: "clamp(16px, 3vh, 28px)", display: "flex", alignItems: "center", gap: 13, padding: "12px 18px 12px 12px", borderRadius: 16, background: RED, boxShadow: "0 18px 44px -16px rgba(200,0,0,.7)" }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ScholifyMark size={27} variant="white" />
          </div>
          <div>
            <div style={{ font: `800 14px/1 ${SANS}`, color: "#fff" }}>Scholify</div>
            <div style={{ font: `500 11px/1.3 ${MONO}`, color: "rgba(255,255,255,.78)", marginTop: 4 }}>learn daily · grow steadily</div>
          </div>
        </div>
      </div>
    )
  }

  /* The old shared step 1 + 2 panel is gone. It drew three circles (NEW /
     LEARNING / RETAKER) or six (A1…C2) and hardcoded `index === 0` as the lit
     one — so it highlighted the FIRST option forever, whatever the learner
     actually chose. It looked responsive and never was, which is why the paper
     step felt alive and these two felt dead. Replaced by the two dedicated
     panels below, which read learnerRoute and englishLevel. */

  /* 1 · the method, with the learner's ENTRY POINT lit as they choose.
     The four phases are drawn at their real share of study time (0.45 / 0.25 /
     0.15 / 0.15 from METHOD_PHASES), so the bar is not decoration — it is the
     plan's actual shape. Choosing a route dims the phases you skip, which is
     the whole promise of the question: your answer changes the plan. */
  if (step === 1) {
    const ENTRY: Record<LearnerRoute, number> = { new: 0, course: 1, practice: 3 }
    const entry = learnerRoute ? ENTRY[learnerRoute] : -1
    const PHASE_ICON: IconName[] = ["learn", "practice", "flashcards", "mock"]
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(26px, 5vh, 48px) clamp(24px, 3.4vw, 46px)" }}>
          <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 16 }}>
            The Scholify method
          </div>
          {/* Proportional phase bar. flex-grow carries the share, so the widths
              stay true if a share is ever retuned. */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {METHOD_PHASES.map((phase, i) => (
              <motion.div
                key={phase.key}
                animate={{ opacity: entry < 0 ? 0.55 : i < entry ? 0.22 : 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex: phase.share,
                  height: 8,
                  borderRadius: 99,
                  background: entry >= 0 && i >= entry ? `linear-gradient(90deg,${RED},${MAGENTA})` : "#E3D7CF",
                }}
              />
            ))}
          </div>
          {METHOD_PHASES.map((phase, i) => {
            const on = i === entry
            const skipped = entry >= 0 && i < entry
            return (
              <motion.div
                key={phase.key}
                animate={{ opacity: skipped ? 0.34 : 1, x: on ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                style={{
                  display: "flex", gap: 11, alignItems: "center", marginBottom: 6,
                  padding: "10px 12px", borderRadius: 14,
                  background: on ? "#fff" : "transparent",
                  border: `1px solid ${on ? RED : "transparent"}`,
                  boxShadow: on ? "0 14px 30px -18px rgba(200,0,0,.5)" : "none",
                  transition: "background-color .2s ease, border-color .2s ease, box-shadow .2s ease",
                }}
              >
                <span style={{ flex: "none", width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", background: on ? RED : "rgba(200,0,0,.07)", transition: "background-color .2s ease" }}>
                  <Icon name={PHASE_ICON[i]} size={15} color={on ? "#fff" : RED} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", font: `800 13px/1.2 ${SANS}`, color: INK }}>{phase.label}</span>
                  <span style={{ display: "block", marginTop: 2, font: `500 11px/1.4 ${SANS}`, color: MUTE }}>{phase.goal}</span>
                </span>
                {on && (
                  <span style={{ marginLeft: "auto", flex: "none", font: `700 8.5px/1 ${MONO}`, letterSpacing: "0.1em", color: RED }}>
                    START
                  </span>
                )}
              </motion.div>
            )
          })}
          <div style={{ marginTop: 12, font: `500 12px/1.45 ${SANS}`, color: META }}>
            {entry >= 0
              ? `Your plan opens in ${METHOD_PHASES[entry].label} — the phases above it are already behind you.`
              : "Tell us where you're starting and the plan reshapes around it."}
          </div>
        </div>
      </IllusBase>
    )
  }

  /* 2 · Charles's actual voice at the chosen level — a live preview.
     The same idea explained three ways, swapping as the learner picks a band.
     This is the one question in the flow whose answer is otherwise invisible
     until long after onboarding, so showing it now is the point. */
  if (step === 2) {
    const band =
      englishLevel === null ? -1 : englishLevel === "A1" || englishLevel === "A2" ? 0 : englishLevel === "B1" || englishLevel === "B2" ? 1 : 2
    const SAMPLES = [
      { tag: "A1–A2 · short, with terms defined", text: "An accrual is a cost you have used but not paid yet. You still record it in this year." },
      { tag: "B1–B2 · plain exam English", text: "An accrual recognises an expense in the period it was incurred, even if the invoice has not yet been paid." },
      { tag: "C1–C2 · full examiner language", text: "Accruals apply the matching principle: expenses are recognised in the period in which the related economic benefit is consumed, irrespective of settlement timing." },
    ]
    const shown = band < 0 ? null : SAMPLES[band]
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(26px, 5vh, 48px) clamp(24px, 3.4vw, 46px)" }}>
          <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 16 }}>
            How Charles will explain things
          </div>
          <div style={{ display: "flex", gap: 5, marginBottom: 18 }}>
            {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((lvl) => {
              const on = englishLevel === lvl
              return (
                <div
                  key={lvl}
                  style={{
                    flex: 1, textAlign: "center", padding: "7px 0", borderRadius: 9,
                    font: `700 10.5px/1 ${MONO}`,
                    background: on ? RED : "rgba(255,255,255,.7)",
                    color: on ? "#fff" : "#9A8F86",
                    border: `1px solid ${on ? RED : BORDER}`,
                    transition: "background-color .2s ease, color .2s ease, border-color .2s ease",
                  }}
                >
                  {lvl}
                </div>
              )
            })}
          </div>
          {/* The bubble swaps on band change. mode="wait" is right HERE — unlike
              the slide shell, these two are in normal flow and would stack. */}
          <div style={{ minHeight: 168 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={band}
                initial={reducedLoop ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedLoop ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: "16px 18px", borderRadius: 18, background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 18px 40px -26px rgba(20,20,26,.45)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                  <span style={{ flex: "none", width: 28, height: 28, borderRadius: 9, background: RED, display: "grid", placeItems: "center" }}>
                    <Icon name="tutor" size={14} color="#fff" />
                  </span>
                  <span style={{ font: `800 12px/1 ${SANS}`, color: INK }}>Charles</span>
                  <span style={{ marginLeft: "auto", font: `600 9px/1 ${MONO}`, letterSpacing: "0.07em", color: FAINT }}>
                    {shown ? shown.tag.split(" · ")[1].toUpperCase() : "PICK A LEVEL"}
                  </span>
                </div>
                <p style={{ margin: 0, font: `500 13.5px/1.55 ${SANS}`, color: BODY }}>
                  {shown
                    ? shown.text
                    : "Choose a level and Charles will answer this in your English — the same idea, pitched three different ways."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ marginTop: 14, font: `500 12px/1.45 ${SANS}`, color: META }}>
            {shown ? `“Accrual”, explained at ${shown.tag.split(" · ")[0]}.` : "Every explanation and every marked answer follows this setting."}
          </div>
        </div>
      </IllusBase>
    )
  }

  /* 3 · the ACCA paper path */
  if (step === 3) {
    const all = levels.flatMap((g) => g.papers.map((p) => p.id))
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(30px, 6vh, 56px) 0" }}>
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", maxHeight: 640 }}>
            <div style={{ position: "absolute", top: 6, bottom: 6, width: 2, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(#E7CFC9,#EBD9A9)" }} />
            {all.map((code) => {
              const on = paper === code
              return (
                <div
                  key={code}
                  style={{
                    position: "relative", padding: "6px 13px", borderRadius: 99, font: `600 12px/1 ${MONO}`, transition: "all .2s",
                    background: on ? RED : "#fff", color: on ? "#fff" : "#9A8F86",
                    border: `1px solid ${on ? RED : BORDER}`,
                    boxShadow: on ? "0 10px 24px -10px rgba(200,0,0,.6)" : "none",
                    transform: on ? "scale(1.22)" : "none",
                  }}
                >
                  {code}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 22, font: `500 12px/1 ${MONO}`, color: "#9A8F86", letterSpacing: "0.04em" }}>
            {paper ? `Your route runs through ${paper}.` : "BT → AAA · one loop at a time"}
          </div>
        </div>
      </IllusBase>
    )
  }

  /* 2 · learner-owned resource stack */
  if (step === 4) {
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 48 }}>
          <div style={{ width: "min(84%, 390px)" }}>
            {["YOUR BOOK", "CHARLES RECALL", "SCHOLIFY PRACTICE", "EXAM-READY"].map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24, rotate: index % 2 ? 1.5 : -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: index % 2 ? 1.5 : -1.5 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                style={{ marginTop: index ? -8 : 0, padding: "22px 24px", borderRadius: 18, background: index === 3 ? RED : "#fff", border: `1px solid ${index === 3 ? RED : BORDER}`, color: index === 3 ? "#fff" : INK, font: `800 13px/1 ${MONO}`, letterSpacing: "0.1em", boxShadow: "0 18px 40px -28px rgba(20,20,26,.45)" }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </IllusBase>
    )
  }

  /* 3 · time photo + caption chip */
  if (step === 5) {
    return (
      <div style={{ position: "absolute", inset: 0, background: PANEL }}>
        <img src="/onboarding/time-d.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: "clamp(16px, 2.4vw, 28px)", bottom: "clamp(16px, 3vh, 28px)", display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", borderRadius: 14, background: "rgba(20,20,26,.72)", backdropFilter: "blur(6px)" }}>
          <Icon name="time" size={16} color="#F4A405" />
          <span style={{ font: `600 13px/1.3 ${SANS}`, color: "#fff" }}>Small but daily beats big but rarely.</span>
        </div>
      </div>
    )
  }

  /* 4 · sitting calendar */
  if (step === 6) {
    const year = (sitting ?? sittings[0])?.label.split(" ")[1] ?? `${new Date().getFullYear()}`
    const monthsRow = ["Mar", "Jun", "Sep", "Dec"]
    const activeMonth = (sitting ?? sittings[0])?.label.slice(0, 3)
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ font: `600 11px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 44 }}>
            ACCA sitting calendar · {year}
          </div>
          <div style={{ position: "relative", width: "78%", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ position: "absolute", top: 15, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#E7CFC9,#EBD9A9)" }} />
            {monthsRow.map((m) => {
              const on = m === activeMonth
              return (
                <div key={m} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  {on && sitting && (
                    <div style={{ position: "absolute", top: -34, font: `700 10px/1 ${MONO}`, color: RED, whiteSpace: "nowrap" }}>
                      EXAM WEEK {sitting.week.toUpperCase()}
                    </div>
                  )}
                  {/* Fixed 30px box scaled by transform rather than animating
                      width/height/marginTop. The old version transitioned all
                      three, laying out this row on every frame whenever the
                      sitting changed; 14/30 reproduces the small dot exactly and
                      both sizes share the same centre, so nothing moves. */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      transform: on ? "scale(1)" : "scale(0.4667)",
                      transition: "transform .2s ease, background-color .2s ease, border-color .2s ease, box-shadow .2s ease",
                      background: on ? RED : "#fff",
                      border: `2px solid ${on ? RED : "#DED2C8"}`,
                      boxShadow: on ? "0 12px 26px -10px rgba(200,0,0,.6)" : "none",
                    }}
                  />
                  <div style={{ font: `600 14px/1 ${SANS}`, color: on ? INK : "#B4A99F", fontWeight: on ? 800 : 600 }}>{m}</div>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 46, font: `500 12px/1.4 ${SANS}`, color: "#9A8F86", maxWidth: 300, textAlign: "center" }}>
            Your plan counts back from exam week — every mission dated to the day.
          </div>
        </div>
      </IllusBase>
    )
  }

  /* 5 · goal photo */
  if (step === 7) {
    return (
      <div style={{ position: "absolute", inset: 0, background: PANEL }}>
        <img src="/onboarding/goal-d.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    )
  }

  /* 6 · the loop — the REAL structure, six waypoints (matches the
     hexagonal brand mark), positioned trigonometrically so the ring
     scales with the panel instead of clipping at hardcoded pixels. */
  const LOOP_STAGES: { label: string; sub: string; icon: IconName; gate?: boolean; win?: boolean }[] = [
    { label: "Diagnose", sub: "40-min baseline", icon: "diagnostic" },
    { label: "Learn", sub: "brief · 5 Qs · cards", icon: "learn" },
    { label: "Drill", sub: "65 per topic", icon: "practice" },
    { label: "Bank runs", sub: "3 × 50 timed", icon: "check" },
    { label: "Mock 1·2·3", sub: "opens at 60%", icon: "mock", gate: true },
    { label: "Exam day", sub: "pass → next paper", icon: "celebrate", win: true },
  ]
  return (
    <IllusBase>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        {/* The stage. Width is ALSO capped by viewport height (60vh) so the
            square can never be squashed by a short window — aspect-ratio then
            always holds and the ring is always a true circle, dead-centre of
            the panel. */}
        <div style={{ position: "relative", width: "min(76%, 440px, 60vh)", aspectRatio: "1", flexShrink: 0 }}>
          {/* the track — one shared radius (42%): the waypoints sit exactly
              ON this line, so the loop reads as stations on one circuit */}
          <motion.div
            animate={reducedLoop ? undefined : { rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: "8%", borderRadius: "50%", border: "2px dashed #E0C9C3" }}
          />
          {/* the runner — today's mission travelling the loop, clockwise.
              Anchored to the SAME inset as the track, so its orbit traces the
              dashed line exactly. */}
          {reducedLoop ? (
            <span style={{ position: "absolute", left: "50%", top: "8%", transform: "translate(-50%,-50%)", width: 11, height: 11, borderRadius: "50%", background: RED, boxShadow: "0 0 0 5px rgba(200,0,0,.12)" }} />
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: "8%", pointerEvents: "none" }}
            >
              <span style={{ position: "absolute", left: "50%", top: 0, transform: "translate(-50%,-50%)", width: 11, height: 11, borderRadius: "50%", background: RED, boxShadow: "0 0 0 5px rgba(200,0,0,.12), 0 0 16px 3px rgba(200,0,0,.4)" }} />
            </motion.div>
          )}
          {/* centre medallion — breathes gently. Positioned with left/top
              maths (35% = 50% − half its 30% size), NOT a translate transform:
              framer owns the transform once scale animates. */}
          <motion.div
            animate={reducedLoop ? undefined : { scale: [1, 1.035, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", left: "35%", top: "35%", width: "30%", aspectRatio: "1", borderRadius: "50%", background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 16px 40px -18px rgba(200,0,0,.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}
          >
            <ScholifyMark size={30} />
            <span style={{ font: `800 17px/1 ${MONO}`, color: RED, letterSpacing: "0.02em" }}>{paper ?? "FR"}</span>
          </motion.div>
          {LOOP_STAGES.map((o, i) => {
            // 6 waypoints, clockwise from the top (-90°), 60° apart — the
            // same geometry as the brand's hexagonal circuit, on the SAME
            // radius as the dashed track.
            const angle = ((-90 + i * 60) * Math.PI) / 180
            const R = 42 // % of container — matches the track (inset 8%)
            const left = 50 + R * Math.cos(angle)
            const top = 50 + R * Math.sin(angle)
            return (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                // Centring lives in framer's x/y, NOT style.transform — framer
                // rebuilds the transform while animating scale and would drop
                // a hand-written translate, anchoring chips by their corner
                // (the off-centre skew this replaced).
                style={{ position: "absolute", left: `${left}%`, top: `${top}%`, x: "-50%", y: "-50%", width: 160, boxSizing: "border-box" }}
              >
                <motion.div
                  animate={reducedLoop ? undefined : { y: [0, -3.5, 0] }}
                  transition={{ duration: 5.2 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "8px 10px 8px 9px",
                    borderRadius: 99,
                    background: o.win ? "rgba(14,159,110,0.1)" : o.gate ? "rgba(200,0,0,0.06)" : "#fff",
                    border: o.win ? "1.5px solid #0E9F6E" : o.gate ? `1.5px dashed ${RED}` : `1px solid ${BORDER}`,
                    boxShadow: "0 10px 24px -14px rgba(20,20,26,.5)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: o.win ? "rgba(14,159,110,0.14)" : "rgba(200,0,0,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={o.icon} size={13} color={o.win ? GREEN : RED} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", font: `750 11.5px/1.1 ${SANS}`, color: INK }}>{o.label}</span>
                    <span style={{ display: "block", font: `600 8.5px/1.2 ${MONO}`, color: o.gate ? RED : FAINT, letterSpacing: "0.04em", marginTop: 1 }}>{o.sub}</span>
                  </span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
        <div style={{ marginTop: 22, font: `500 11.5px/1.5 ${SANS}`, color: "#9A8F86", maxWidth: 320, textAlign: "center" }}>
          The loop never stops until you pass — a stumble becomes a recovery run, not an ending.
        </div>
      </div>
    </IllusBase>
  )
}
