/*
 * Scholify — ACCA study plan / readiness.
 *
 * Turns the raw practice stats into a coach's view: how ready you are, which
 * areas are weak, whether you're on track for your exam date, and what to do
 * next. The exam date + daily goal are stored per paper in localStorage.
 */

import { getPaper, getPaperStats, type PaperStats } from "@/lib/acca"
import { getLearnerBaseline } from "@/lib/acca-learner-baseline"
import { getLatestDiagnostic } from "@/lib/acca-diagnostic"

const KEY = "scholify-acca-plan"

export interface PaperPlan {
  /** yyyy-MM-dd target sitting date, or null. */
  examDate: string | null
  /** Target questions to attempt per day. */
  dailyGoal: number
  /**
   * Study time — the protected daily study slot ("19:00"), or null.
   * The commitment device: same time every day, life plans around it.
   */
  studyTime: string | null
  /** Minutes the learner committed to per day. */
  dailyMinutes: number
  /** Honest consistency commitment — always studyDays.length once picked. */
  daysPerWeek: number
  /**
   * WHICH days, 0=Sunday … 6=Saturday. `daysPerWeek: 5` never said which five,
   * so the plan could not line up with a real week and the reminder emails went
   * out on all seven regardless — and a learner emailed on days they never
   * agreed to study stops reading the emails.
   *
   * Optional: a plan saved before this existed has no opinion, and studyDaysOf()
   * reads that as every day rather than silently narrowing a live schedule.
   */
  studyDays?: number[]
  /**
   * Target pass probability before exam day (the learner's ambition, set at
   * onboarding: 65 pass-ready · 75 confident · 85 bulletproof). The
   * diagnostic "wow" moment and Charles's plan are framed against this number.
   */
  targetProb: number
}

/** Monday-first, the way a study week is actually read. 0=Sun per Date#getDay. */
export const WEEK_DAYS: Array<{ day: number; short: string; long: string }> = [
  { day: 1, short: "Mon", long: "Monday" },
  { day: 2, short: "Tue", long: "Tuesday" },
  { day: 3, short: "Wed", long: "Wednesday" },
  { day: 4, short: "Thu", long: "Thursday" },
  { day: 5, short: "Fri", long: "Friday" },
  { day: 6, short: "Sat", long: "Saturday" },
  { day: 0, short: "Sun", long: "Sunday" },
]

/** A sensible starting selection of `count` days: weekdays first, then weekend. */
export function defaultStudyDays(count: number): number[] {
  return WEEK_DAYS.slice(0, Math.max(1, Math.min(7, count))).map((d) => d.day).sort((a, b) => a - b)
}

/** The days this plan studies on — every day when it predates the picker. */
export function studyDaysOf(plan: PaperPlan): number[] {
  const days = plan.studyDays
  if (!Array.isArray(days) || days.length === 0) return [0, 1, 2, 3, 4, 5, 6]
  return days.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6)
}

/** Is `date` one of this plan's study days? */
export function isStudyDay(plan: PaperPlan, date: Date = new Date()): boolean {
  return studyDaysOf(plan).includes(date.getDay())
}

type Store = Record<string, PaperPlan>

const DEFAULT_PLAN: PaperPlan = { examDate: null, dailyGoal: 15, studyTime: null, dailyMinutes: 25, daysPerWeek: 6, targetProb: 75 }

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Store
  } catch {
    /* ignore */
  }
  return {}
}

function write(s: Store): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function getPlan(paperId: string): PaperPlan {
  return { ...DEFAULT_PLAN, ...(read()[paperId] ?? {}) }
}

export function setPlan(paperId: string, plan: Partial<PaperPlan>): PaperPlan {
  const store = read()
  const next = { ...DEFAULT_PLAN, ...(store[paperId] ?? {}), ...plan }
  store[paperId] = next
  write(store)
  return next
}

export function daysUntilExam(paperId: string): number | null {
  const plan = getPlan(paperId)
  if (!plan.examDate) return null
  // Parse the exam date at LOCAL midnight — a bare "YYYY-MM-DD" parses as UTC
  // midnight, and subtracting a local `now` drops a day for users far from UTC.
  // Compare local-exam-midnight against local-today-midnight so the result is a
  // whole-day calendar difference, never off by one and free of intra-day jitter.
  const exam = new Date(`${plan.examDate}T00:00:00`)
  if (Number.isNaN(exam.getTime())) return null
  const now = new Date()
  const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.max(0, Math.round((exam.getTime() - todayMid.getTime()) / 86400000))
}

export interface Recommendation {
  kind: "weak-area" | "coverage" | "ready" | "start"
  title: string
  detail: string
  /** Area code to drill, when relevant. */
  area?: string
}

/**
 * A short, prioritised list of what the learner should do next on this paper.
 * Deterministic from the current stats — no AI needed.
 */
export function getRecommendations(paperId: string): Recommendation[] {
  const stats = getPaperStats(paperId)
  const paper = getPaper(paperId)
  const recs: Recommendation[] = []

  if (stats.answered === 0) {
    recs.push({
      kind: "start",
      title: "Take a first practice set",
      detail: "Answer a few questions so Scholify can find your weak spots and estimate your readiness.",
    })
    return recs
  }

  // weakest seen areas first
  const weak = stats.areas
    .filter((a) => a.seen >= 2 && a.accuracy < 0.6)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 2)
  for (const a of weak) {
    recs.push({
      kind: "weak-area",
      title: `Strengthen area ${a.code}: ${a.label}`,
      detail: `You're at ${Math.round(a.accuracy * 100)}% here — target it directly to lift your score.`,
      area: a.code,
    })
  }

  // low coverage
  if (stats.coverage < 0.6) {
    const untouched = stats.areas.filter((a) => a.seen === 0)
    recs.push({
      kind: "coverage",
      title: "Widen your coverage",
      detail: untouched.length
        ? `You haven't practised ${untouched.length} area(s) yet, including ${untouched[0].label}.`
        : "Attempt more questions across every area so your readiness score is trustworthy.",
    })
  }

  if (recs.length === 0 && stats.readiness >= 75) {
    recs.push({
      kind: "ready",
      title: "You're tracking well 🎯",
      detail: `${stats.readiness}% ready on ${paper?.name ?? "this paper"}. Sit a full mock to test yourself under time.`,
    })
  }

  return recs
}

/* ── The Scholify Method: four mastery-driven phases ──────────────
 *
 * How a good tutor takes a student through one paper (~12 weeks):
 *   1. LEARN       — cover every syllabus area in order, with explanations.
 *   2. STRENGTHEN  — drill the weak areas until nothing is below ~65%.
 *   3. REVISE      — flashcards to zero-due, written answers, recall.
 *   4. REHEARSE    — timed mocks + exam technique until consistently
 *                    above the pass line.
 * Progression is by MASTERY SIGNALS, not the calendar — except that with
 * ≤14 days to the exam a tutor always switches to exam rehearsal.
 */

export type MethodPhaseKey = "learn" | "strengthen" | "revise" | "rehearse"

export interface MethodPhase {
  key: MethodPhaseKey
  label: string
  emoji: string
  /** Share of a paper's study time, for calendar plans. */
  share: number
  /** What the phase is for — one tutor sentence. */
  goal: string
}

export const METHOD_PHASES: MethodPhase[] = [
  { key: "learn", label: "Learn", emoji: "📚", share: 0.45, goal: "Cover every syllabus area, one at a time, until nothing is unfamiliar." },
  { key: "strengthen", label: "Strengthen", emoji: "🎯", share: 0.25, goal: "Drill your weakest areas until no area sits below ~65% accuracy." },
  { key: "revise", label: "Revise", emoji: "🧠", share: 0.15, goal: "Lock it in: flashcards to zero-due, written answers, active recall." },
  { key: "rehearse", label: "Rehearse", emoji: "⏱️", share: 0.15, goal: "Timed mocks under exam conditions until you're consistently above the pass line." },
]

/**
 * Readiness at which a learner who has already covered the syllabus is ready to
 * rehearse rather than revise. Deliberately the same number as MOCK_GATE in
 * acca-loop — a learner sent to Rehearse must find the mock room unlocked — but
 * declared here because acca-loop imports THIS module, so importing it back
 * would be a cycle. Keep the two in step.
 */
const REHEARSAL_READY = 60
/**
 * Below this, a returner's diagnostic has contradicted their own account of
 * themselves: whatever they covered has not stuck, and Learn is the honest
 * answer however much material they have been through.
 */
const REPAIR_FLOOR = 40

/**
 * Which phase the learner is in on this paper.
 *
 * Driven by the learner's own EVIDENCE, then by the route they declared at
 * onboarding — in that order, because a self-report is a starting hypothesis and
 * a diagnostic is a measurement.
 *
 * The volume gate below (`coverage < 0.85`) is right for someone starting from
 * zero and wrong for everyone else: `coverage` counts questions attempted IN
 * SCHOLIFY, so a learner who has finished Kaplan, BPP and the ACCA Study Hub sits
 * at ~7% after a 25-question diagnostic and would be held in Learn for ~300
 * questions — told to study area A a month before their exam. That is the single
 * fastest way to lose the learner who needs us least and pays most readily.
 */
export function currentPhase(paperId: string): MethodPhase {
  const stats = getPaperStats(paperId)
  const days = daysUntilExam(paperId)

  // Two weeks out, a tutor always switches to exam rehearsal.
  if (days !== null && days <= 14 && stats.answered > 0) return METHOD_PHASES[3]

  const route = getLearnerBaseline()?.route ?? null
  const diagnostic = getLatestDiagnostic(paperId)

  // A learner who arrived having already studied — "course" (part-way through a
  // course or self-study) or "practice" (finished the material) — is placed by
  // what the diagnostic proved, not by how much of OUR bank they have seen.
  if (diagnostic && route && route !== "new") {
    const proven = diagnostic.passProbability
    // Finished the material and demonstrably at the pass line → rehearse. The
    // rehearse day is a timed mock plus a post-mortem on what it exposed, which
    // is exactly the right month for someone with weeks left and no gaps to fill.
    if (route === "practice" && proven >= REHEARSAL_READY) return METHOD_PHASES[3]
    // Covered ground but not yet exam-ready → strengthen: keep progressing while
    // the daily drill attacks the diagnostic's pain points.
    if (proven >= REPAIR_FLOOR) return METHOD_PHASES[1]
    return METHOD_PHASES[0]
  }

  if (stats.answered < 20 || stats.coverage < 0.85) return METHOD_PHASES[0]

  const weak = stats.areas.filter((a) => a.seen >= 2 && a.accuracy < 0.6)
  if (weak.length > 0) return METHOD_PHASES[1]

  if (stats.readiness < 75) return METHOD_PHASES[2]
  return METHOD_PHASES[3]
}

export interface Mission {
  phase: MethodPhase
  title: string
  detail: string
  /** Which app mode fulfils the mission. */
  action: "practice" | "weak" | "flashcards" | "mock" | "examiner"
}

/** Today's mission on a paper — the ONE thing a tutor would assign today. */
export function todayMission(paperId: string): Mission {
  const phase = currentPhase(paperId)
  const stats = getPaperStats(paperId)
  const plan = getPlan(paperId)

  if (phase.key === "learn") {
    const next = stats.areas.find((a) => a.seen === 0) ?? stats.areas.find((a) => a.seen < 3)
    return {
      phase,
      title: next ? `Learn area ${next.code} — ${next.label}` : `Practise ${plan.dailyGoal} questions`,
      detail: next
        ? "Work through it question by question — ask Charles the moment anything is unclear."
        : "Steady coverage across the syllabus builds the base everything else stands on.",
      action: "practice",
    }
  }

  if (phase.key === "strengthen") {
    const weakest = [...stats.areas].filter((a) => a.seen >= 2).sort((a, b) => a.accuracy - b.accuracy)[0]
    return {
      phase,
      title: weakest ? `Drill area ${weakest.code} — currently ${Math.round(weakest.accuracy * 100)}%` : "Target your weak areas",
      detail: "Marks live in your weakest areas, not your strongest. Lift the floor.",
      action: "weak",
    }
  }

  if (phase.key === "revise") {
    return {
      phase,
      title: "Clear your due flashcards, then one written answer",
      detail: "Active recall today is marks on exam day. Finish with the AI Examiner.",
      action: "flashcards",
    }
  }

  return {
    phase,
    title: "Sit a timed mock",
    detail: "Exam conditions, no hints. Review every wrong answer — that review IS the study.",
    action: "mock",
  }
}

/* ── Phased study plan ────────────────────────────────────────── */

export interface PlanPhase {
  label: string
  focus: string
  /** Number of days this phase spans. */
  days: number
  /** Human date range, e.g. "1 Jul – 20 Jul". */
  range: string
  emoji: string
}

export interface StudyPlan {
  hasDate: boolean
  daysLeft: number | null
  /** Suggested questions per day to be ready in time. */
  dailyTarget: number
  phases: PlanPhase[]
}

function fmtDate(d: Date): string {
  return `${d.getDate()} ${d.toLocaleString("en-GB", { month: "short" })}`
}

/**
 * Build the four-phase calendar plan (Learn → Strengthen → Revise → Rehearse)
 * from the paper's exam date, split by METHOD_PHASES shares (45/25/15/15).
 * Deterministic and offline.
 */
export function generateStudyPlan(paperId: string): StudyPlan {
  const days = daysUntilExam(paperId)
  if (days === null || days <= 0) {
    return { hasDate: days === 0, daysLeft: days, dailyTarget: 15, phases: [] }
  }

  // Aim to cover the syllabus with steady daily practice; scale with time left.
  const dailyTarget = days > 60 ? 12 : days > 30 ? 18 : days > 14 ? 25 : 30

  const focuses: Record<MethodPhaseKey, string> = {
    learn: "Work through each syllabus area in order — practice with explanations, Ask Charles on anything unclear.",
    strengthen: "Drill your weakest areas with targeted sets and custom AI questions until nothing sits below ~65%.",
    revise: "Flashcards to zero-due, written answers with the AI Examiner, and a second pass on your two weakest areas.",
    rehearse: "Timed mocks under exam conditions every 2–3 days. Review every wrong answer in full.",
  }

  const phases: PlanPhase[] = []
  let cursor = new Date()
  let remaining = days
  for (let i = 0; i < METHOD_PHASES.length; i++) {
    const m = METHOD_PHASES[i]
    const span = i === METHOD_PHASES.length - 1 ? Math.max(1, remaining) : Math.max(1, Math.round(days * m.share))
    const end = new Date(cursor)
    end.setDate(cursor.getDate() + span)
    phases.push({
      emoji: m.emoji,
      label: m.label,
      focus: focuses[m.key],
      days: span,
      range: `${fmtDate(cursor)} – ${fmtDate(end)}`,
    })
    cursor = end
    remaining -= span
  }

  return { hasDate: true, daysLeft: days, dailyTarget, phases }
}

/** Human label for a readiness band.
 * Colours mirror the app palette `C` (green/amber/red) — hardcoded here because
 * `C` lives in a component module (`acca/ui`) we don't import into lib code. */
export function readinessBand(readiness: number): { label: string; color: string } {
  if (readiness >= 75) return { label: "On track", color: "#0E9F6E" }
  if (readiness >= 50) return { label: "Getting there", color: "#C2740B" }
  if (readiness > 0) return { label: "Early days", color: "#DC2626" }
  return { label: "Not started", color: "#94A3B8" }
}

export type { PaperStats }
