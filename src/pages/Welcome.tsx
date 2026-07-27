import { useCallback, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { Icon, type IconName } from "@/components/acca/ui"
import { ScholifyMark } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { paperLevels, setPassedPapers, setStudyingPapers } from "@/lib/acca-qualification"
import { setPlan } from "@/lib/acca-plan"
import { setDailyGoal } from "@/lib/acca"
import { GOAL_OPTIONS, setGoal, setExperience, getExperience, setStartMode, isAccaOnboarded, markAccaOnboarded, setPaperVariant, type Goal, type PaperVariant } from "@/lib/acca-profile"
import { trackEvent } from "@/lib/analytics"
import { persistAccountSetup } from "@/lib/account-state"
import { DurationPicker } from "@/components/ui/duration-picker"
import { ExamCalendar } from "@/components/ui/exam-calendar"
import {
  MATERIAL_LABEL,
  PROVIDER_LABEL,
  resourceSummary,
  setStudyResource,
  type ResourceMaterial,
  type ResourceProvider,
  type StudyResourceProfile,
} from "@/lib/acca-study-resources"
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
} from "@/lib/acca-learner-baseline"
import { buildOnboardingGuide } from "@/lib/acca-onboarding-guide"

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
]

const TOTAL = 10
const ADVANCED_ONBOARDING_LAUNCH_AT = Date.parse("2026-08-09T19:00:00.000Z")

// The split-screen needs real width; below 1080 the phone layout reads better.
function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 1080px)").matches)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1080px)")
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
  const { user, startTrial } = useAuth()
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const [step, setStep] = useState(0)
  const advancedOnboardingVisible = Date.now() >= ADVANCED_ONBOARDING_LAUNCH_AT
  const visibleSteps = useMemo(
    () => advancedOnboardingVisible ? Array.from({ length: TOTAL }, (_, index) => index) : [0, 3, 4, 5, 6, 7, 9],
    [advancedOnboardingVisible],
  )
  const visibleStepIndex = Math.max(0, visibleSteps.indexOf(step))

  const [dir, setDir] = useState(1)
  const [passed, setPassed] = useState<Set<string>>(new Set())
  const [showPassed, setShowPassed] = useState(false)
  const [paper, setPaper] = useState<string | null>(null)
  const [paperVariant, setPaperVariantState] = useState<PaperVariant | null>(null)
  const [providers, setProviders] = useState<ResourceProvider[]>([])
  const [primaryProvider, setPrimaryProvider] = useState<ResourceProvider>("kaplan")
  const [materials, setMaterials] = useState<ResourceMaterial[]>(["study-text"])
  const [resourceEdition, setResourceEdition] = useState("September 2026 – June 2027")
  const [totalChapters, setTotalChapters] = useState<number | null>(null)
  const [completedChapters, setCompletedChapters] = useState(0)
  const [minutes, setMinutes] = useState(60)
  const [daysPerWeek, setDaysPerWeek] = useState(6)
  const [slot, setSlot] = useState("19:00")
  const [examDate, setExamDate] = useState("")
  const [pickedSitting, setPickedSitting] = useState<string | null>(null)
  const [goal, setGoalState] = useState<Goal | null>(null)
  const [target, setTarget] = useState(75)
  const [learnerRoute, setLearnerRoute] = useState<LearnerRoute | null>(null)
  const [englishLevel, setEnglishLevel] = useState<CefrLevel | null>(null)
  const [englishEvidence, setEnglishEvidence] = useState<EnglishEvidence | null>(null)
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [certificateType, setCertificateType] = useState<"IELTS" | "TOEFL" | "Cambridge" | "Other">("IELTS")
  const [certificateBusy, setCertificateBusy] = useState(false)
  const [certificateError, setCertificateError] = useState("")
  const [resultChoice, setResultChoice] = useState<"diagnostic" | "uploaded" | null>(null)
  const [resultFile, setResultFile] = useState<File | null>(null)
  const [resultAnalysis, setResultAnalysis] = useState<ResultUploadAnalysis | null>(null)
  const [resultBusy, setResultBusy] = useState(false)
  const [resultError, setResultError] = useState("")
  const [finishBusy, setFinishBusy] = useState(false)
  const [finishError, setFinishError] = useState("")
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

  const canAdvance = step === 1
    ? learnerRoute !== null
    : step === 2
      ? englishLevel !== null && englishEvidence !== null
    : step === 3
    ? paper !== null && (!["LW", "TX"].includes(paper) || paperVariant !== null)
    : step === 4
      ? providers.length > 0 && (providers.includes("none") || materials.length > 0)
      : step === 7
        ? goal !== null
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

  function selectPaper(nextPaper: string | null) {
    if (nextPaper !== paper) {
      setExamDate("")
      setPickedSitting(null)
      setTotalChapters(null)
      setCompletedChapters(0)
    }
    setPaper(nextPaper)
    setPaperVariantState(null)
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
    if (!paper) return false
    setPassedPapers([...passed])
    setStudyingPapers([paper])
    if (paperVariant) setPaperVariant(paper, paperVariant)
    setStudyResource(paper, {
      providers,
      primaryProvider,
      materials: providers.includes("none") ? [] : materials,
      edition: resourceEdition,
      totalChapters,
      completedChapters,
    })
    if (goal) setGoal(goal)
    if (learnerRoute && englishLevel && englishEvidence) {
      saveLearnerBaseline({
        route: learnerRoute,
        englishLevel,
        englishEvidence,
        certificateName: certificateFile?.name,
        certificateType: englishEvidence === "certificate" ? certificateType : undefined,
        updatedAt: new Date().toISOString(),
      })
      if (getExperience() !== "professional") {
        setExperience(learnerRoute === "new" ? "new" : "some")
      }
    }
    if (goal === "career") setExperience("professional")
    const questionsPerDay = minutes >= 120 ? 55 : minutes >= 90 ? 42 : minutes >= 60 ? 30 : 22
    setPlan(paper, { examDate: examDate || null, studyTime: slot, dailyMinutes: minutes, daysPerWeek, dailyGoal: questionsPerDay, targetProb: target })
    setDailyGoal(questionsPerDay)
    if (complete) markAccaOnboarded()
    if (complete) void persistAccountSetup()
    // Onboarding is done → start the 3-day free trial now. Fire-and-forget:
    // it's idempotent server-side, and the auth effect re-grants as a safety net.
    if (complete) void startTrial()
    return true
  }

  const onboardingProps = () => ({ paper, minutes, target, goal, hasExamDate: Boolean(examDate) })
  // Each finish path IS the experience answer, so the loop knows the persona from
  // the learner's actual choice (career→professional is already set in persist()).
  const finishToDiagnostic = () => {
    if (finishBusy) return
    setFinishError("")
    if (getExperience() !== "professional") setExperience("some")
    if (!persist()) return
    setStartMode("assess")
    trackEvent("onboarding_complete", { ...onboardingProps(), exit: "diagnostic" })
    navigate("/study/diagnostic?next=paywall")
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
      void startTrial()
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
    setResultBusy(true)
    try {
      const analysis = await analyseResultPdf(file, paper)
      setResultAnalysis(analysis)
      setResultChoice("uploaded")
    } catch (error) {
      setResultError(error instanceof Error ? error.message : "Charles couldn't analyse this result.")
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
      <LearnerRouteSlide value={learnerRoute} onChange={setLearnerRoute} />
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
    4: (
      <ResourceSlide
        providers={providers}
        setProviders={setProviders}
        primaryProvider={primaryProvider}
        setPrimaryProvider={setPrimaryProvider}
        materials={materials}
        setMaterials={setMaterials}
        edition={resourceEdition}
        setEdition={setResourceEdition}
        totalChapters={totalChapters}
        setTotalChapters={setTotalChapters}
        completedChapters={completedChapters}
        setCompletedChapters={setCompletedChapters}
      />
    ),
    5: <TimeSlide minutes={minutes} setMinutes={setMinutes} slot={slot} setSlot={setSlot} daysPerWeek={daysPerWeek} setDaysPerWeek={setDaysPerWeek} />,
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
        onFile={onResultFile}
        onDiagnostic={() => {
          setResultChoice("diagnostic")
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
        uploadedResult={resultAnalysis}
        onDiagnostic={finishToDiagnostic}
        onUploaded={finishWithResult}
        finishBusy={finishBusy}
        finishError={finishError}
        isMobile={isMobile}
        resource={{
          paperId: paper ?? "",
          providers,
          primaryProvider,
          materials,
          edition: resourceEdition,
          totalChapters,
          completedChapters,
          updatedAt: "",
        }}
        learnerRoute={learnerRoute}
        englishLevel={englishLevel}
        daysPerWeek={daysPerWeek}
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
    "What are you studying with?",
    "How much time can you protect, daily?",
    sessionPaper ? "Which sitting are you taking?" : "When's your exam?",
    "What are you here for?",
    "Already have a result?",
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
    "Upload a detailed mock or failed-exam PDF. If Charles can verify it, it replaces the diagnostic.",
    "",
  ]

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
            <span style={{ font: `500 11px/1 ${MONO}`, color: GHOST }}>{`0${visibleStepIndex + 1}`} / {String(visibleSteps.length + 2).padStart(2, "0")}</span>
          </div>
          <div style={{ marginTop: 14, height: 4, borderRadius: 99, background: TRACK, overflow: "hidden" }}>
            <motion.div animate={{ width: `${((visibleStepIndex + 1) / (visibleSteps.length + 2)) * 100}%` }} transition={{ type: "spring", stiffness: 170, damping: 26 }} style={{ height: "100%", background: RED, borderRadius: 99 }} />
          </div>
        </div>

        {/* content */}
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <AnimatePresence custom={dir} initial={false} mode="wait">
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
                  <h1 style={{ margin: 0, font: `800 32px/1.06 ${SANS}`, letterSpacing: "-1px", color: INK }}>
                    Welcome to Scholify.<br />Let's pass your<br />next paper.
                  </h1>
                  <p style={{ margin: "16px 0 0", font: `400 15px/1.5 ${SANS}`, color: BODY, maxWidth: 300 }}>
                    A GPS for ACCA: it measures where you are, hands you the next task daily, and recalculates until you pass.
                  </p>
                  <ValueTrio style={{ marginTop: 18 }} />
                  <WaypointChips style={{ marginTop: 24 }} />
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
              : <PrimaryBtn onClick={finishToDiagnostic} big disabled={finishBusy}>Continue to Learning</PrimaryBtn>
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

  /* ═══ DESKTOP · 55/45 split ═══ */
  return (
    <div style={{ position: "fixed", inset: 0, background: PAGE, display: "flex", overflow: "hidden", fontFamily: SANS }}>
      {/* left — question panel */}
      <div style={{ width: "55%", flex: "none", display: "flex", flexDirection: "column", padding: "40px clamp(32px, 4vw, 60px) 54px", position: "relative", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <ScholifyMark size={30} />
          <span style={{ font: `800 21px/1 ${SANS}`, letterSpacing: "-0.6px", color: INK }}>Scholify</span>
        </div>
        <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ font: `600 12px/1 ${MONO}`, color: MUTE, letterSpacing: "0.05em" }}>{visibleStepIndex + 1} / {visibleSteps.length}</span>
          <div style={{ flex: 1, maxWidth: 340, height: 5, borderRadius: 99, background: TRACK, overflow: "hidden" }}>
            <motion.div animate={{ width: `${((visibleStepIndex + 1) / visibleSteps.length) * 100}%` }} transition={{ type: "spring", stiffness: 170, damping: 26 }} style={{ height: "100%", background: RED, borderRadius: 99 }} />
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <AnimatePresence custom={dir} initial={false} mode="wait">
            <motion.div
              key={step}
              {...slideAnim}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", maxWidth: 620, overflowY: "auto", paddingRight: 8 }}
            >
              {step === 0 ? (
                <div style={{ margin: "auto 0", paddingBottom: 12 }}>
                  <div style={kicker}>A GPS for ACCA</div>
                  <h1 style={{ margin: 0, font: `800 clamp(32px, 3vw, 43px)/1.05 ${SANS}`, letterSpacing: "-1.4px", color: INK }}>
                    Welcome to Scholify. Let's pass your next paper.
                  </h1>
                  <p style={{ margin: "20px 0 0", font: `400 18px/1.5 ${SANS}`, color: BODY, maxWidth: 460 }}>
                    It measures where you are, hands you the next task daily, and recalculates until you pass.
                  </p>
                  <ValueTrio style={{ marginTop: 22 }} big />
                  <WaypointChips style={{ marginTop: 30 }} big />
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
          <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => go(-1)}
              disabled={step === 0}
              style={{ padding: "15px 22px", borderRadius: 14, background: "transparent", border: `1.5px solid ${BORDER}`, color: step === 0 ? "#CFC7BF" : MUTE, font: `700 14px/1 ${SANS}`, cursor: step === 0 ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              <Icon name="arrow" size={16} color={step === 0 ? "#CFC7BF" : MUTE} style={{ transform: "rotate(180deg)" }} /> Back
            </button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => (canAdvance ? go(1) : undefined)}
              disabled={!canAdvance}
              style={{ padding: "16px 30px", borderRadius: 14, background: RED, border: "none", color: "#fff", font: `800 15px/1 ${SANS}`, cursor: canAdvance ? "pointer" : "default", opacity: canAdvance ? 1 : 0.45, boxShadow: "0 12px 24px -12px rgba(200,0,0,.5)", display: "flex", alignItems: "center", gap: 9 }}
            >
              {step === 0 ? "Start — it takes a minute" : "Continue"} <Icon name="arrow" size={17} color="#fff" />
            </motion.button>
          </div>
        )}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center", font: `500 10px/1 ${MONO}`, letterSpacing: "0.2em", textTransform: "uppercase", color: HINT, pointerEvents: "none" }}>
          ← → or swipe
        </div>
      </div>

      {/* right — visual panel */}
      <div style={{ width: "45%", flex: "none", position: "relative", overflow: "hidden" }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={step}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <VisualPanel step={step} paper={paper} sitting={sittings.find((s) => s.date === pickedSitting) ?? null} sittings={sittings} levels={levels} />
          </motion.div>
        </AnimatePresence>
        <div style={{ position: "absolute", right: 20, bottom: 16, zIndex: 6, pointerEvents: "none" }}>
          <CharlesMascot
            pose={(["wave", "idea", "thinking", "present", "plan", "calm", "chart", "run", "thinking", "success"] as const)[step] ?? "wave"}
            size="clamp(82px,9vw,118px)"
            delay={0.12}
          />
        </div>
      </div>
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
    { value: "new", icon: "rocket", title: "New to ACCA", detail: "Start with foundations and clearer English support.", path: ["English baseline", "Foundations", "Diagnostic"] },
    { value: "course", icon: "study", title: "Already learning", detail: "I use a course, tutor, books, or self-study.", path: ["Map resources", "Measure gaps", "Daily plan"] },
    { value: "retaker", icon: "loop", title: "Retaking a paper", detail: "Use previous evidence and rebuild weak areas.", path: ["Read result", "Find lost marks", "Comeback plan"] },
  ]
  return <div style={{ display: "grid", gap: 11, maxWidth: 570 }}>
    {routes.map((route, index) => {
      const active = value === route.value
      return <motion.button key={route.value} type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }} whileTap={{ scale: .99 }} onClick={() => onChange(route.value)} style={{ padding: "17px 18px", borderRadius: 17, border: `1.5px solid ${active ? RED : BORDER}`, background: active ? "rgba(200,0,0,.045)" : "#fff", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: active ? RED : PANEL, display: "grid", placeItems: "center" }}><Icon name={route.icon} size={19} color={active ? "#fff" : BODY} /></span>
          <div style={{ flex: 1 }}><div style={{ font: `800 15px/1.25 ${SANS}`, color: INK }}>{route.title}</div><div style={{ marginTop: 4, font: `500 12.5px/1.4 ${SANS}`, color: MUTE }}>{route.detail}</div></div>
          {active && <Icon name="done" size={19} color={RED} />}
        </div>
        <AnimatePresence>{active && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, paddingTop: 13, borderTop: `1px solid ${BORDER}`, flexWrap: "wrap" }}>{route.path.map((item, i) => <span key={item} style={{ display: "flex", alignItems: "center", gap: 6, font: `700 10.5px/1 ${MONO}`, color: i === 0 ? RED : META }}>{i > 0 && <Icon name="arrow" size={11} color={GHOST} />}{item}</span>)}</div>
        </motion.div>}</AnimatePresence>
      </motion.button>
    })}
  </div>
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

function EnglishBaselineSlide({ route, level, evidence, certificate, certificateBusy, certificateError, certificateType, onLevel, onEvidence, onCertificate, onCertificateType }: {
  route: LearnerRoute | null; level: CefrLevel | null; evidence: EnglishEvidence | null; certificate: File | null
  certificateBusy: boolean; certificateError: string
  certificateType: "IELTS" | "TOEFL" | "Cambridge" | "Other"; onLevel: (value: CefrLevel | null) => void; onEvidence: (value: EnglishEvidence) => void
  onCertificate: (value: File | null) => void; onCertificateType: (value: "IELTS" | "TOEFL" | "Cambridge" | "Other") => void
}) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const modes: { id: EnglishEvidence; label: string; icon: IconName }[] = [
    { id: "certificate", label: "Use certificate", icon: "upload" }, { id: "self", label: "Select A1–C2", icon: "stats" }, { id: "vocabulary", label: "Vocabulary check", icon: "tutor" },
  ]
  const finishQuiz = () => {
    const correct = Object.values(answers).filter(Boolean).length
    onLevel(CEFR_LEVELS[Math.max(0, Math.min(5, correct - 1))])
    onEvidence("vocabulary")
  }
  const levelButtons = (disabled = false) => <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
    {CEFR_LEVELS.map((item) => <button key={item} type="button" disabled={disabled} onClick={() => onLevel(item)} style={{ padding: "11px 2px", borderRadius: 9, border: `1px solid ${level === item ? RED : BORDER}`, background: level === item ? RED : "#fff", color: level === item ? "#fff" : INK, opacity: disabled ? .4 : 1, font: `800 11px/1 ${MONO}`, cursor: disabled ? "default" : "pointer" }}>{item}</button>)}
  </div>
  return <div style={{ maxWidth: 590 }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 8 }}>{modes.map((mode) => <button key={mode.id} type="button" onClick={() => { onEvidence(mode.id); onLevel(null) }} style={{ padding: "13px 6px", borderRadius: 13, border: `1.5px solid ${evidence === mode.id ? RED : BORDER}`, background: evidence === mode.id ? "rgba(200,0,0,.05)" : "#fff", color: evidence === mode.id ? RED : BODY, cursor: "pointer", font: `750 11.5px/1.25 ${SANS}` }}><Icon name={mode.icon} size={17} color="currentColor" style={{ margin: "0 auto 7px" }} />{mode.label}</button>)}</div>
    {evidence === "self" && <div style={{ marginTop: 14 }}>{levelButtons()}<p style={{ margin: "9px 0 0", font: `500 11.5px/1.45 ${SANS}`, color: MUTE }}>A1–A2 gets short explanations and defined terminology. B1–B2 gets plain exam English. C1–C2 uses full examiner language.</p></div>}
    {evidence === "certificate" && <div style={{ marginTop: 14, padding: 14, borderRadius: 14, border: `1px solid ${BORDER}`, background: "#fff" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 6, marginBottom: 9 }}>{(["IELTS", "TOEFL", "Cambridge", "Other"] as const).map((type) => <button key={type} type="button" onClick={() => onCertificateType(type)} style={{ padding: "8px 2px", borderRadius: 8, border: `1px solid ${certificateType === type ? RED : BORDER}`, background: "#fff", color: certificateType === type ? RED : META, font: `700 9.5px/1 ${SANS}` }}>{type}</button>)}</div>
      <label style={{ display: "block", padding: 11, borderRadius: 10, border: `1.5px dashed ${level ? GREEN : certificateError ? RED : "#D7CCC4"}`, cursor: certificateBusy ? "wait" : "pointer", font: `650 11.5px/1.3 ${SANS}`, color: level ? GREEN : BODY }}><input type="file" accept=".pdf,application/pdf" disabled={certificateBusy} onChange={(event) => void onCertificate(event.target.files?.[0] ?? null)} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />{certificateBusy ? "Charles is reading the certificate…" : level ? `${certificate?.name} · ${level} equivalent verified` : "Attach original text-based certificate PDF"}</label>
      {certificateError && <div role="alert" style={{ marginTop: 7, color: RED, font: `600 10.5px/1.4 ${SANS}` }}>{certificateError}</div>}
      <div style={{ margin: "9px 0 0", font: `500 10px/1.4 ${SANS}`, color: MUTE }}>Scholify reads the score and derives A1–C2; it does not verify the issuer’s authenticity. The original PDF is not retained.</div>
    </div>}
    {evidence === "vocabulary" && <div style={{ marginTop: 13, display: "grid", gap: 6 }}>{VOCAB_CHECK.map(([word, correct, wrong], index) => <div key={word} style={{ display: "grid", gridTemplateColumns: "82px 1fr 1fr", gap: 5, alignItems: "center" }}><strong style={{ font: `800 11px/1 ${MONO}` }}>{word}</strong>{[correct, wrong].map((option) => { const isCorrect = option === correct; const chosen = answers[index] === isCorrect; return <button key={option} type="button" onClick={() => setAnswers((old) => ({ ...old, [index]: isCorrect }))} style={{ padding: "8px 5px", borderRadius: 8, border: `1px solid ${chosen ? RED : BORDER}`, background: chosen ? "rgba(200,0,0,.05)" : "#fff", color: chosen ? RED : META, font: `600 9.5px/1.2 ${SANS}` }}>{option}</button> })}</div>)}<button type="button" disabled={Object.keys(answers).length < 6} onClick={finishQuiz} style={{ padding: 11, border: 0, borderRadius: 10, background: RED, color: "#fff", opacity: Object.keys(answers).length < 6 ? .4 : 1, font: `800 11px/1 ${SANS}` }}>Set my support level</button></div>}
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

function WaypointChips({ style, big }: { style?: CSSProperties; big?: boolean }) {
  const chip = (label: string, filled = false): CSSProperties => ({
    padding: big ? "9px 14px" : "8px 12px",
    borderRadius: 99,
    background: filled ? RED : "#fff",
    border: `1px solid ${filled ? RED : BORDER}`,
    font: `${filled ? 700 : 600} ${big ? 13 : 12}px/1 ${SANS}`,
    color: filled ? "#fff" : INK,
  })
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: big ? 9 : 7, ...style }}>
      {["Diagnostic", "Daily missions", "3 mocks"].map((l, i) => (
        <motion.span key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.12 }} style={{ display: "inline-flex", alignItems: "center", gap: big ? 9 : 7 }}>
          <span style={chip(l)}>{l}</span>
          <span style={{ color: "#C9C0B8", fontSize: 12 }}>→</span>
        </motion.span>
      ))}
      <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.61 }} style={chip("Pass", true)}>Pass</motion.span>
    </div>
  )
}

function tileStyle(on: boolean): CSSProperties {
  return {
    textAlign: "left",
    borderRadius: 14,
    transition: "all .18s",
    cursor: "pointer",
    border: `1.5px solid ${on ? RED : BORDER}`,
    background: on ? "rgba(200,0,0,.05)" : "#fff",
    boxShadow: on ? "0 0 0 3px rgba(200,0,0,.07)" : "none",
  }
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
      <div style={{ display: isMobile ? "block" : "flex", gap: 18 }}>
        {levels.map((g) => (
          <div key={g.key} style={{ flex: 1, marginBottom: isMobile ? 18 : 0 }}>
            <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.12em", textTransform: "uppercase", color: FAINT, marginBottom: 9 }}>{g.label}</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr", gap: 8 }}>
              {g.papers.map((p) => {
                const on = paper === p.id
                const done = passed.has(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => !done && setPaper(p.id)}
                    disabled={done}
                    style={{ ...tileStyle(on), padding: isMobile ? "12px 12px" : "10px 12px", opacity: done ? 0.5 : 1, cursor: done ? "default" : "pointer" }}
                  >
                    <div style={{ font: `700 ${isMobile ? 13 : 12}px/1 ${MONO}`, color: RED, marginBottom: 5 }}>{p.id}</div>
                    <div style={{ font: `600 ${isMobile ? 11.5 : 11}px/1.25 ${SANS}`, color: INK }}>{done ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>Passed <Icon name="done" size={12} /></span> : p.name}</div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {paper && ["LW", "TX"].includes(paper) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 16, padding: 14, border: `1px solid ${BORDER}`, borderRadius: 14, background: "#FAFAF9" }}
        >
          <div style={{ font: `700 11px/1 ${MONO}`, letterSpacing: ".08em", color: INK, marginBottom: 9 }}>CHOOSE {paper} VARIANT</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {([
              ["UK", "United Kingdom", paper === "LW" ? "English legal system and UK business law" : "UK taxation and Finance Act rules"],
              ["GLOBAL", "Global", paper === "LW" ? "Official LW Global syllabus" : "Global taxation route"],
            ] as const).map(([value, label, blurb]) => {
              const active = variant === value
              return (
                <button key={value} type="button" onClick={() => setVariant(value)} style={{ ...tileStyle(active), padding: 12 }}>
                  <div style={{ font: `700 12px/1 ${MONO}`, color: active ? RED : INK, marginBottom: 6 }}>{label}</div>
                  <div style={{ font: `500 11px/1.35 ${SANS}`, color: MUTE }}>{blurb}</div>
                </button>
              )
            })}
          </div>
        </motion.div>
      )}
      <button
        onClick={() => setShowPassed((v) => !v)}
        style={{ display: "inline-block", marginTop: isMobile ? 4 : 20, font: `600 ${isMobile ? 12 : 13}px/1 ${SANS}`, color: MUTE, textDecoration: "underline", textUnderlineOffset: 3, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        {showPassed ? "Done marking passed papers" : "I've already passed some papers"}
      </button>
      {showPassed && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {levels.flatMap((g) => g.papers).map((p) => {
            const on = passed.has(p.id)
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPassed((prev) => {
                    const n = new Set(prev)
                    if (n.has(p.id)) n.delete(p.id)
                    else n.add(p.id)
                    return n
                  })
                  if (paper === p.id) setPaper(null)
                }}
                style={{ padding: "6px 11px", borderRadius: 99, border: `1.5px solid ${on ? RED : BORDER}`, background: on ? "rgba(200,0,0,.05)" : "#fff", color: on ? RED : INK, font: `700 12px/1 ${MONO}`, cursor: "pointer" }}
              >
                {p.id}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ResourceSlide({
  providers,
  setProviders,
  primaryProvider,
  setPrimaryProvider,
  materials,
  setMaterials,
  edition,
  setEdition,
  totalChapters,
  setTotalChapters,
  completedChapters,
  setCompletedChapters,
}: {
  providers: ResourceProvider[]
  setProviders: (providers: ResourceProvider[]) => void
  primaryProvider: ResourceProvider
  setPrimaryProvider: (provider: ResourceProvider) => void
  materials: ResourceMaterial[]
  setMaterials: (materials: ResourceMaterial[]) => void
  edition: string
  setEdition: (edition: string) => void
  totalChapters: number | null
  setTotalChapters: (count: number | null) => void
  completedChapters: number
  setCompletedChapters: (count: number) => void
}) {
  const providerOptions: ResourceProvider[] = ["kaplan", "bpp", "acca-study-hub", "other", "none"]
  const materialOptions: ResourceMaterial[] = ["study-text", "practice-kit", "pocket-notes", "online-course"]
  const hasResource = providers.length > 0 && !providers.includes("none")

  const toggleProvider = (provider: ResourceProvider) => {
    if (provider === "none") {
      setProviders(["none"])
      setPrimaryProvider("none")
      return
    }
    const withoutNone: ResourceProvider[] = providers.filter((item) => item !== "none")
    const next = withoutNone.includes(provider)
      ? withoutNone.filter((item) => item !== provider)
      : [...withoutNone, provider]
    setProviders(next)
    if (!next.includes(primaryProvider)) setPrimaryProvider(next[0] ?? "kaplan")
  }

  const toggleMaterial = (material: ResourceMaterial) => {
    setMaterials(materials.includes(material)
      ? materials.filter((item) => item !== material)
      : [...materials, material])
  }

  return (
    <div style={{ maxWidth: 540 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 9 }}>
        {providerOptions.map((provider) => {
          const on = providers.includes(provider)
          return (
            <button
              key={provider}
              type="button"
              onClick={() => toggleProvider(provider)}
              style={{ ...tileStyle(on), minHeight: 50, padding: "12px 14px", font: `700 13px/1.25 ${SANS}`, color: on ? RED : INK }}
            >
              {PROVIDER_LABEL[provider]}
              {provider === "none" && <span style={{ display: "block", marginTop: 3, font: `500 10px/1.3 ${SANS}`, color: META }}>Charles will use Scholify</span>}
            </button>
          )
        })}
      </div>
      {hasResource && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 18 }}>
          {providers.length > 1 && (
            <>
              <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.12em", textTransform: "uppercase", color: FAINT, marginBottom: 8 }}>Primary learning resource</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}>
                {providers.map((provider) => (
                  <button key={provider} type="button" onClick={() => setPrimaryProvider(provider)} style={{ ...tileStyle(primaryProvider === provider), padding: "9px 13px", font: `700 12px/1 ${SANS}`, color: primaryProvider === provider ? RED : INK }}>
                    {PROVIDER_LABEL[provider]}
                  </button>
                ))}
              </div>
            </>
          )}
          <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.12em", textTransform: "uppercase", color: FAINT, marginBottom: 8 }}>What do you use?</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {materialOptions.map((material) => {
              const on = materials.includes(material)
              return (
                <button key={material} type="button" onClick={() => toggleMaterial(material)} style={{ ...tileStyle(on), padding: "9px 12px", font: `700 11.5px/1 ${SANS}`, color: on ? RED : INK }}>
                  {MATERIAL_LABEL[material]}
                </button>
              )
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 92px 92px", gap: 9, marginTop: 16 }}>
            <label style={{ display: "grid", gap: 6, font: `600 10px/1 ${MONO}`, color: FAINT, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Edition
              <select value={edition} onChange={(event) => setEdition(event.target.value)} style={{ minHeight: 44, borderRadius: 11, border: `1.5px solid ${BORDER}`, background: "#fff", padding: "0 10px", font: `600 11.5px/1 ${SANS}`, color: INK }}>
                <option>September 2025 – June 2026</option>
                <option>September 2026 – June 2027</option>
                <option>Not sure</option>
              </select>
            </label>
            <NumberField label="Chapters" value={totalChapters} min={1} onChange={(value) => {
              setTotalChapters(value)
              if (value !== null) setCompletedChapters(Math.min(completedChapters, value))
            }} />
            <NumberField label="Completed" value={completedChapters} min={0} max={totalChapters ?? undefined} onChange={(value) => setCompletedChapters(value ?? 0)} />
          </div>
          <p style={{ margin: "9px 0 0", font: `500 11px/1.4 ${SANS}`, color: MUTE }}>
            Chapter counts are optional and refer to your own copy. Scholify stores planning progress, not publisher content.
          </p>
        </motion.div>
      )}
    </div>
  )
}

function NumberField({ label, value, min, max, onChange }: { label: string; value: number | null; min: number; max?: number; onChange: (value: number | null) => void }) {
  return (
    <label style={{ display: "grid", gap: 6, font: `600 10px/1 ${MONO}`, color: FAINT, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value ?? ""}
        placeholder="—"
        onChange={(event) => {
          const next = event.target.value === "" ? null : Number(event.target.value)
          onChange(next === null || Number.isFinite(next) ? next : null)
        }}
        style={{ width: "100%", minHeight: 44, boxSizing: "border-box", borderRadius: 11, border: `1.5px solid ${BORDER}`, background: "#fff", padding: "0 10px", font: `700 13px/1 ${MONO}`, color: INK }}
      />
    </label>
  )
}

function TimeSlide({
  minutes, setMinutes, slot, setSlot, daysPerWeek, setDaysPerWeek,
}: {
  minutes: number
  setMinutes: (n: number) => void
  slot: string
  setSlot: (s: string) => void
  daysPerWeek: number
  setDaysPerWeek: (n: number) => void
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
      <div style={{ marginTop: 4, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        {MINUTE_OPTIONS.map((m) => {
          const on = minutes === m.v
          return (
            <button
              key={m.v}
              onClick={() => setMinutes(m.v)}
              style={{
                minHeight: 44,
                padding: "8px 14px",
                borderRadius: 999,
                font: `600 12.5px/1 ${SANS}`,
                cursor: "pointer",
                transition: "all .18s",
                border: `1.5px solid ${on ? RED : BORDER}`,
                background: on ? "rgba(200,0,0,.05)" : "#fff",
                color: on ? RED : INK,
              }}
            >
              {m.v} min · {m.label}
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: 11, padding: "14px 16px", borderRadius: 14, background: "rgba(200,0,0,.05)", border: "1px solid rgba(200,0,0,.14)", font: `500 13px/1.45 ${SANS}`, color: "#8A2222" }}>
        {micro}
      </div>
      <div style={{ marginTop: 22, font: `600 10px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 10 }}>My daily slot</div>
      <div style={{ display: "flex", gap: 8 }}>
        {SLOT_OPTIONS.map((s) => {
          const on = slot === s.time
          return (
            <button
              key={s.time}
              onClick={() => setSlot(s.time)}
              style={{ flex: 1, minHeight: 44, padding: "12px 6px", borderRadius: 12, font: `600 12px/1.2 ${SANS}`, cursor: "pointer", transition: "all .18s", border: `1.5px solid ${on ? RED : BORDER}`, background: on ? "rgba(200,0,0,.05)" : "#fff", color: on ? RED : INK }}
            >
              {s.label}
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: 18, font: `600 10px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 10 }}>Days I can honestly protect</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[4, 5, 6, 7].map((days) => (
          <button key={days} onClick={() => setDaysPerWeek(days)} style={{ flex: 1, minHeight: 42, borderRadius: 12, border: `1.5px solid ${daysPerWeek === days ? RED : BORDER}`, background: daysPerWeek === days ? "rgba(200,0,0,.05)" : "#fff", color: daysPerWeek === days ? RED : INK, font: `700 12px/1 ${SANS}`, cursor: "pointer" }}>
            {days} days
          </button>
        ))}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {sittings.map((s) => {
              const on = pickedSitting === s.date
              return (
                <button key={s.date} onClick={() => onPick(s.date)} style={{ ...tileStyle(on), display: "flex", gap: 14, alignItems: "center", padding: "16px 18px" }}>
                  <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: "rgba(200,0,0,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="calendar" size={20} color={RED} />
                  </span>
                  <span>
                    <span style={{ display: "block", font: `700 15px/1.15 ${SANS}`, color: INK }}>{s.label} sitting</span>
                    <span style={{ display: "block", marginTop: 3, font: `500 12px/1.35 ${SANS}`, color: META }}>Exam week {s.week} · plan counts back from it</span>
                  </span>
                </button>
              )
            })}
          </div>
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
  target: number
  setTarget: (n: number) => void
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11, maxWidth: 500 }}>
      {GOAL_OPTIONS.map((o) => {
        const on = goal === o.value
        return (
          <button key={o.value} onClick={() => set(o.value)} style={{ ...tileStyle(on), display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px" }}>
            <span style={{ flex: "none", width: 42, height: 42, borderRadius: 12, background: on ? RED : "rgba(200,0,0,.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .18s" }}>
              <Icon name={GOAL_ICON[o.value]} size={18} color={on ? "#fff" : RED} />
            </span>
            <span>
              <span style={{ display: "block", font: `700 15px/1.15 ${SANS}`, color: INK }}>{o.label}</span>
              <span style={{ display: "block", marginTop: 3, font: `500 12px/1.4 ${SANS}`, color: on ? "#8A2222" : META }}>{o.blurb}</span>
            </span>
          </button>
        )
      })}

      {/* target pass probability — the number the whole plan will chase */}
      <div style={{ marginTop: 10 }}>
        <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 10 }}>
          Your target before exam day
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {TARGET_OPTIONS.map((t) => {
            const on = target === t.v
            return (
              <button
                key={t.v}
                onClick={() => setTarget(t.v)}
                style={{ flex: 1, minHeight: 44, padding: "13px 6px", borderRadius: 12, cursor: "pointer", transition: "all .18s", border: `1.5px solid ${on ? RED : BORDER}`, background: on ? "rgba(200,0,0,.05)" : "#fff", textAlign: "center" }}
              >
                <span style={{ display: "block", font: `800 17px/1 ${SANS}`, color: on ? RED : INK }}>{t.label}</span>
                <span style={{ display: "block", marginTop: 4, font: `600 10.5px/1.2 ${SANS}`, color: on ? "#8A2222" : META }}>{t.blurb}</span>
              </button>
            )
          })}
        </div>
        <p style={{ margin: "8px 0 0", font: `500 12px/1.4 ${SANS}`, color: MUTE }}>
          Exam Readiness Score — the number your diagnostic sets and your plan pushes to this line.
        </p>
      </div>
    </div>
  )
}

function ResultUploadSlide({
  paper, file, analysis, busy, error, choice, onFile, onDiagnostic,
}: {
  paper: string
  file: File | null
  analysis: ResultUploadAnalysis | null
  busy: boolean
  error: string
  choice: "diagnostic" | "uploaded" | null
  onFile: (file: File | null) => void
  onDiagnostic: () => void
}) {
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
                ? `${analysis.score}% · ${analysis.areas.length} syllabus areas verified. This can replace the diagnostic.`
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
          {error} The diagnostic remains required.
        </div>
      )}
      <button
        type="button"
        onClick={onDiagnostic}
        style={{ width: "100%", marginTop: 14, padding: "15px 17px", borderRadius: 14, border: `1.5px solid ${choice === "diagnostic" ? RED : BORDER}`, background: choice === "diagnostic" ? "rgba(200,0,0,.05)" : "transparent", color: choice === "diagnostic" ? RED : BODY, font: `750 13px/1.3 ${SANS}`, cursor: "pointer", textAlign: "left" }}
      >
        I don't have a detailed result PDF — take the compulsory diagnostic
      </button>
      <p style={{ margin: "12px 2px 0", font: `500 11.5px/1.45 ${SANS}`, color: FAINT }}>
        Privacy: Scholify extracts the evidence needed for your plan and does not retain the original PDF.
      </p>
    </div>
  )
}

function ReadySlide({
  paper, minutes, slot, examDate, sitting, goal, uploadedResult, onDiagnostic, onUploaded, finishBusy, finishError, isMobile, resource, learnerRoute, englishLevel, daysPerWeek,
}: {
  paper: string
  minutes: number
  slot: string
  examDate: string
  sitting: Sitting | null
  goal: Goal | null
  uploadedResult: ResultUploadAnalysis | null
  onDiagnostic: () => void
  onUploaded: () => void
  finishBusy: boolean
  finishError: string
  isMobile: boolean
  resource: StudyResourceProfile
  learnerRoute: LearnerRoute | null
  englishLevel: CefrLevel | null
  daysPerWeek: number
}) {
  const guide = buildOnboardingGuide({ paperId: paper, route: learnerRoute, englishLevel, minutesPerDay: minutes, daysPerWeek, examDate: examDate || null })
  const slotLabel = SLOT_OPTIONS.find((s) => s.time === slot)?.label ?? slot
  const goalLabel = GOAL_OPTIONS.find((g) => g.value === goal)?.label
  const rows: [string, string][] = [
    ["Paper", paper],
    ["Resources", resourceSummary(resource)],
    ["Daily", `${minutes} min · ${slotLabel}`],
    ["Exam", sitting ? `${sitting.label} (wk ${sitting.week})` : examDate || "Paced by mastery"],
    ...(goalLabel ? ([["Goal", goalLabel]] as [string, string][]) : []),
  ]
  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ display: "flex", justifyContent: "center", height: 82, marginBottom: 4 }}>
        <CharlesMascot
          pose={guide.status === "risky" ? "thinking" : guide.status === "comfortable" ? "thumbsup" : "plan"}
          size={82}
        />
      </div>
      <div style={{ marginBottom: 16, padding: "18px 20px", borderRadius: 17, background: guide.status === "risky" ? "rgba(200,0,0,.06)" : "rgba(14,159,110,.07)", border: `1px solid ${guide.status === "risky" ? "rgba(200,0,0,.22)" : "rgba(14,159,110,.25)"}` }}>
        <div style={{ font: `800 15px/1.25 ${SANS}`, color: guide.status === "risky" ? RED : GREEN }}>Charles recommends · {guide.headline}</div>
        <div style={{ marginTop: 9, display: "grid", gap: 7 }}>
          {guide.advice.map((tip) => <div key={tip} style={{ display: "flex", gap: 8, font: `500 12.5px/1.4 ${SANS}`, color: BODY }}><span style={{ color: guide.status === "risky" ? RED : GREEN }}>●</span>{tip}</div>)}
        </div>
      </div>
      <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 30px -22px rgba(20,20,26,.4)" }}>
        {rows.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.08 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "16px 18px" : "18px 22px", borderTop: i > 0 ? `1px solid ${BORDER}` : "none" }}
          >
            <span style={{ font: `600 12px/1 ${MONO}`, letterSpacing: "0.06em", textTransform: "uppercase", color: FAINT }}>{k}</span>
            <span style={{ font: `700 ${isMobile ? 14 : 15}px/1.2 ${SANS}`, color: INK, textAlign: "right" }}>{v}</span>
          </motion.div>
        ))}
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
              No verified result was supplied, so the <b style={{ fontWeight: 700, color: "#4E3A0D" }}>diagnostic is compulsory</b>. It gives Charles the baseline needed to target your weak spots instead of guessing.
            </>
          )}
        </span>
      </div>
      {!isMobile && (
        <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
          <motion.button whileTap={finishBusy ? undefined : { scale: 0.98 }} disabled={finishBusy} onClick={uploadedResult ? onUploaded : onDiagnostic} style={{ padding: "17px 32px", borderRadius: 14, background: RED, border: "none", color: "#fff", font: `800 16px/1 ${SANS}`, cursor: finishBusy ? "wait" : "pointer", opacity: finishBusy ? .7 : 1, boxShadow: "0 14px 28px -12px rgba(200,0,0,.55)" }}>
            {finishBusy ? "Building your plan…" : uploadedResult ? "Build my plan from this result" : "Continue to Learning"}
          </motion.button>
          {finishError && <p role="alert" style={{ margin: "10px 0 0", color: RED, font: `600 12px/1.4 ${SANS}` }}>{finishError}</p>}
        </div>
      )}
    </div>
  )
}

function PrimaryBtn({ children, onClick, big, disabled }: { children: ReactNode; onClick: () => void; big?: boolean; disabled?: boolean }) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%",
        padding: big ? 17 : 16, borderRadius: 15, background: RED, color: "#fff",
        font: `800 ${big ? 16 : 15}px/1 ${SANS}`, border: "none", cursor: disabled ? "default" : "pointer",
        letterSpacing: "-0.2px", opacity: disabled ? 0.45 : 1,
        boxShadow: disabled ? "none" : "0 12px 24px -10px rgba(200,0,0,.5)",
      }}
    >
      {children}
    </motion.button>
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
  step, paper, sitting, sittings, levels,
}: {
  step: number
  paper: string | null
  sitting: Sitting | null
  sittings: Sitting[]
  levels: ReturnType<typeof paperLevels>
}) {
  const reducedLoop = useReducedMotion()
  /* 0 · welcome photo + brand chip */
  if (step === 0) {
    return (
      <div style={{ position: "absolute", inset: 0, background: PANEL }}>
        <img src="/onboarding/welcome-d.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 28, bottom: 28, display: "flex", alignItems: "center", gap: 13, padding: "12px 18px 12px 12px", borderRadius: 16, background: RED, boxShadow: "0 18px 44px -16px rgba(200,0,0,.7)" }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ScholifyMark size={27} variant="white" />
          </div>
          <div>
            <div style={{ font: `800 14px/1 ${SANS}`, color: "#fff" }}>Scholify</div>
            <div style={{ font: `500 11px/1.3 ${MONO}`, color: "rgba(255,255,255,.78)", marginTop: 4 }}>measure · task · recalculate</div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 1 || step === 2) {
    const labels = step === 1 ? ["NEW", "LEARNING", "RETAKER"] : ["A1", "A2", "B1", "B2", "C1", "C2"]
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 48 }}>
          <div style={{ width: "min(84%,430px)", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 16, right: 16, height: 2, background: "linear-gradient(90deg,#E7CFC9,#EBD9A9)" }} />
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {labels.map((label, index) => <motion.div key={label} initial={{ opacity: 0, scale: .7, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: index * .1, type: "spring" }} style={{ width: step === 1 ? 94 : 48, height: step === 1 ? 94 : 48, borderRadius: "50%", background: index === 0 ? RED : "#fff", color: index === 0 ? "#fff" : META, border: `1.5px solid ${index === 0 ? RED : BORDER}`, display: "grid", placeItems: "center", font: `800 ${step === 1 ? 11 : 12}px/1 ${MONO}`, boxShadow: "0 12px 28px -20px rgba(20,20,26,.5)" }}>{label}</motion.div>)}
            </div>
            <div style={{ marginTop: 38, textAlign: "center", color: MUTE, font: `600 12px/1.5 ${SANS}` }}>{step === 1 ? "Three starting points. One route to a pass." : "Charles adapts the language—not the exam standard."}</div>
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
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 0" }}>
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
        <div style={{ position: "absolute", left: 28, bottom: 28, display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", borderRadius: 14, background: "rgba(20,20,26,.72)", backdropFilter: "blur(6px)" }}>
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
                  <div style={{ borderRadius: "50%", transition: "all .2s", width: on ? 30 : 14, height: on ? 30 : 14, background: on ? RED : "#fff", border: `2px solid ${on ? RED : "#DED2C8"}`, boxShadow: on ? "0 12px 26px -10px rgba(200,0,0,.6)" : "none", marginTop: on ? 0 : 8 }} />
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
