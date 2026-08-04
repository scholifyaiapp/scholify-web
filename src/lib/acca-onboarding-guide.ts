import type { CefrLevel, LearnerRoute } from "@/lib/acca-learner-baseline"

const PAPER_LOAD: Record<string, number> = {
  BT: 75, MA: 110, FA: 105, LW: 95,
  PM: 145, TX: 155, FR: 150, AA: 140, FM: 145,
  SBL: 175, SBR: 190, AFM: 190, APM: 180, ATX: 205, AAA: 190,
}

export interface OnboardingGuideInput {
  paperId: string
  route: LearnerRoute | null
  englishLevel: CefrLevel | null
  minutesPerDay: number
  daysPerWeek: number
  examDate: string | null
  /** Learner-selected readiness target. Omit only when Charles should recommend one. */
  targetPercentage?: number | null
}

/** The lowest daily commitment the onboarding picker offers. */
export const MIN_DAILY_MINUTES = 40
/** The daily commitment most passers protect — what Charles steers toward. */
export const TARGET_DAILY_MINUTES = 60

/**
 * A concrete, applicable change — not prose.
 *
 * The old guide only described the problem ("choose a later sitting or add
 * time"), which left the learner to work out the arithmetic and walk back
 * through the deck themselves. Each fix now carries the exact value that closes
 * the gap, so the UI can apply it in one tap.
 */
export type GuideFix =
  | { kind: "minutes"; to: number; from: number; label: string; detail: string }
  | { kind: "days"; to: number; from: number; label: string; detail: string }
  | { kind: "sitting"; weeksNeeded: number; label: string; detail: string }

export interface OnboardingGuide {
  recommendedHours: number
  weeklyHours: number
  recommendedWeeks: number
  /** The learner's selected readiness target, or Charles's recommendation as fallback. */
  recommendedTarget: number
  /** Provisional date; the live plan moves it as actual performance arrives. */
  recommendedExamDate: string
  recommendedExamLabel: string
  /** Exact date the estimated study load is completed at the chosen pace. */
  estimatedReadyDate: string
  estimatedReadyLabel: string
  availableWeeks: number | null
  status: "comfortable" | "focused" | "risky"
  headline: string
  advice: string[]
  /** Hours of the recommended load the current plan cannot cover. 0 when it can. */
  deficitHours: number
  /** How much of the recommended load the current plan covers, 0…1+. */
  coverage: number
  /** Ranked remedies. Empty unless the plan is short. */
  fixes: GuideFix[]
  /**
   * Set when the learner is sitting on the floor of the daily-time picker.
   * Independent of `status`: 40 min/day with a year to go is not a capacity
   * problem, but it is still below the pace that passes, and saying so is the
   * single most useful nudge in the whole deck.
   */
  minutesNudge: string | null
}

const KNOWLEDGE_PAPERS = new Set(["BT", "MA", "FA", "LW"])
const SESSION_PAPERS = new Set(["PM", "TX", "FR", "AA", "FM", "SBL", "SBR", "AFM", "APM", "ATX", "AAA"])

function isoDay(date: Date): string {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`
}

/** First realistic exam date/window after Charles's estimated preparation. */
function recommendedExamFor(paperId: string, weeks: number, now: Date): { date: string; label: string } {
  const ready = new Date(now)
  ready.setHours(12, 0, 0, 0)
  ready.setDate(ready.getDate() + weeks * 7)
  if (!SESSION_PAPERS.has(paperId)) {
    return { date: isoDay(ready), label: `Ready from ${ready.toLocaleDateString(undefined, { month: "long", year: "numeric" })}` }
  }
  // Session exams run in March, June, September and December. Use the first
  // window with a small revision buffer after the estimated learning finish.
  for (let offset = 0; offset < 8; offset += 1) {
    const year = ready.getFullYear() + Math.floor((ready.getMonth() + offset * 3) / 12)
    const month = ((Math.floor(ready.getMonth() / 3) * 3 + offset * 3) % 12 + 12) % 12
    const sessionMonth = [2, 5, 8, 11].find((candidate) => candidate >= month) ?? 2
    const sessionYear = sessionMonth < month ? year + 1 : year
    const candidate = new Date(sessionYear, sessionMonth, 7, 12)
    if (candidate.getTime() >= ready.getTime() + 7 * 86400000) {
      return { date: isoDay(candidate), label: `${candidate.toLocaleDateString(undefined, { month: "long", year: "numeric" })} exam window` }
    }
  }
  return { date: isoDay(ready), label: ready.toLocaleDateString(undefined, { month: "long", year: "numeric" }) }
}

/** Protected hours a week, from the two things the learner actually chose. */
function weeklyHoursFor(minutesPerDay: number, daysPerWeek: number): number {
  return Math.max(1, Math.round(((minutesPerDay * daysPerWeek) / 60) * 10) / 10)
}

/** Weeks the route needs at this pace. The ceil is why fixes must be searched. */
function weeksNeededFor(recommendedHours: number, weeklyHours: number): number {
  return Math.max(4, Math.ceil(recommendedHours / weeklyHours))
}

/**
 * The verdict, as one function so nothing can disagree with it.
 *
 * Extracted because the fixes have to be checked AGAINST it rather than derived
 * from a rearrangement of it. Solving the continuous equation for "minutes that
 * reach ratio 0.7" gave answers that were still risky once evaluated: the real
 * rule divides by a CEIL'd week count, so a value that satisfies the algebra can
 * land the wrong side of the threshold. A test caught it proposing 180 min/day as
 * the fix for a case that was still short at 180 min/day — advice that would have
 * sent the learner back to the summary to be told they had failed to fix it.
 */
function statusFor(
  recommendedHours: number,
  weeklyHours: number,
  availableWeeks: number | null,
): OnboardingGuide["status"] {
  if (availableWeeks === null) return "focused"
  const ratio = availableWeeks / weeksNeededFor(recommendedHours, weeklyHours)
  return ratio >= 1.1 ? "comfortable" : ratio >= 0.7 ? "focused" : "risky"
}

export function buildOnboardingGuide(input: OnboardingGuideInput, now = new Date()): OnboardingGuide {
  const base = PAPER_LOAD[input.paperId] ?? 150
  const routeFactor = input.route === "practice" ? 0.72 : input.route === "course" ? 0.85 : 1.12
  const languageFactor = input.englishLevel === "A1" || input.englishLevel === "A2"
    ? 1.2
    : input.englishLevel === "B1" ? 1.1 : 1
  const recommendedHours = Math.round(base * routeFactor * languageFactor)
  const weeklyHours = weeklyHoursFor(input.minutesPerDay, input.daysPerWeek)
  const recommendedWeeks = weeksNeededFor(recommendedHours, weeklyHours)
  const estimatedReady = new Date(now)
  estimatedReady.setHours(12, 0, 0, 0)
  estimatedReady.setDate(estimatedReady.getDate() + recommendedWeeks * 7)
  const charlesTarget = Math.min(82,
    (KNOWLEDGE_PAPERS.has(input.paperId) ? 72 : input.paperId === "SBL" || input.paperId === "SBR" || ["AFM", "APM", "ATX", "AAA"].includes(input.paperId) ? 79 : 76)
    + (input.route === "practice" ? 3 : input.route === "course" ? 1 : 0),
  )
  const exam = input.examDate ? new Date(`${input.examDate}T12:00:00`) : null
  const validExam = exam && !Number.isNaN(exam.getTime()) ? exam : null
  const recommendedExam = validExam
    ? {
        date: isoDay(validExam),
        label: validExam.toLocaleDateString("en-GB", {
          weekday: "long", day: "numeric", month: "long", year: "numeric",
        }),
      }
    : recommendedExamFor(input.paperId, recommendedWeeks, now)
  const selectedTarget = Number(input.targetPercentage)
  const recommendedTarget = Number.isFinite(selectedTarget) && selectedTarget >= 50 && selectedTarget <= 95
    ? Math.round(selectedTarget)
    : charlesTarget
  const availableWeeks = validExam
    ? Math.max(0, Math.ceil((validExam.getTime() - now.getTime()) / 604800000))
    : null

  // This is a conservative planning estimate, not a pass/fail prediction.
  // The diagnostic can remove work the learner already knows, so reserve the
  // warning state for a material capacity gap rather than a modest shortfall.
  //
  // No date → "focused": there is no deadline to be short against, so a verdict
  // either way would be inventing a judgement the inputs cannot support.
  const status = availableWeeks === null
    ? "comfortable"
    : statusFor(recommendedHours, weeklyHours, availableWeeks)
  const headline = status === "comfortable"
    ? "Your timing has a healthy buffer."
    : status === "focused"
      ? "Your sitting is realistic with consistency."
      : "This sitting has a serious time shortfall."
  const advice = [
    `${input.daysPerWeek} consistent days gives you about ${weeklyHours} protected hours each week.`,
    `${input.paperId} may need up to ${recommendedHours} guided hours from your starting point—about ${recommendedWeeks} weeks at this pace before the diagnostic personalises it.`,
    status === "risky"
      ? "There is not enough protected time for the full route. Choose a later sitting or add time only if you can sustain it."
      : status === "focused"
        ? "Keep this sitting. Consistency matters more than adding unsustainable hours; Charles will prioritise weak areas after your diagnostic."
        : "Charles will use short daily missions, weekly review and timed practice rather than one long catch-up day.",
  ]

  /*
   * The gap, in the units the learner chose. `availableWeeks === null` means no
   * exam date — there is no deadline to be short against, so the only thing
   * worth saying is about daily pace.
   */
  const coverage = availableWeeks === null ? 1 : Math.min(2, (availableWeeks * weeklyHours) / recommendedHours)
  const deficitHours =
    availableWeeks === null ? 0 : Math.max(0, Math.round(recommendedHours - availableWeeks * weeklyHours))

  const fixes: GuideFix[] = []
  if (status === "risky" && availableWeeks !== null && availableWeeks > 0) {
    /*
     * SEARCH each lever for the smallest value that genuinely clears the warning,
     * checking statusFor() rather than inverting it. See the note on statusFor:
     * the algebraic inverse is off by a ceil and produced fixes that did not fix
     * anything.
     *
     * Ordered cheapest-effort-first. Keeping the sitting is what the learner
     * wants, so the two time levers lead and moving the exam is the fallback
     * rather than the opening advice.
     */
    const clears = (minutesPerDay: number, daysPerWeek: number): boolean =>
      statusFor(recommendedHours, weeklyHoursFor(minutesPerDay, daysPerWeek), availableWeeks) !== "risky"

    // Only offer a daily load a person can actually keep. Telling someone to
    // study six hours a day is not advice, it is a way of losing them — so if
    // nothing up to 3 hours clears it, this lever is simply not offered.
    let minutesFix: number | null = null
    for (let m = Math.max(input.minutesPerDay + 5, MIN_DAILY_MINUTES); m <= 180; m += 5) {
      if (m > input.minutesPerDay && clears(m, input.daysPerWeek)) { minutesFix = m; break }
    }
    if (minutesFix !== null) {
      fixes.push({
        kind: "minutes",
        from: input.minutesPerDay,
        to: minutesFix,
        label: `Study ${minutesFix} min a day`,
        detail: `${minutesFix - input.minutesPerDay} more minutes daily covers the shortfall at this sitting.`,
      })
    }

    let daysFix: number | null = null
    for (let d = input.daysPerWeek + 1; d <= 7; d += 1) {
      if (clears(input.minutesPerDay, d)) { daysFix = d; break }
    }
    if (daysFix !== null) {
      const added = daysFix - input.daysPerWeek
      fixes.push({
        kind: "days",
        from: input.daysPerWeek,
        to: daysFix,
        label: `Study ${daysFix} days a week`,
        detail: `Keeping ${input.minutesPerDay} min a day and adding ${added} day${added > 1 ? "s" : ""} closes the gap.`,
      })
    }

    /*
     * Always offered, and always honest: more calendar is the one lever that asks
     * nothing extra of the learner each day, and for a two-week-to-Strategic case
     * it is the only truthful answer. Searched the same way so the number of weeks
     * quoted is one that actually clears it.
     */
    let weeksNeeded = 1
    while (weeksNeeded < 104 && statusFor(recommendedHours, weeklyHours, availableWeeks + weeksNeeded) === "risky") {
      weeksNeeded += 1
    }
    fixes.push({
      kind: "sitting",
      weeksNeeded,
      label: "Move to a later sitting",
      detail: `About ${weeksNeeded} more week${weeksNeeded > 1 ? "s" : ""} would put this plan back in range at your current pace.`,
    })
  }

  const minutesNudge =
    input.minutesPerDay <= MIN_DAILY_MINUTES
      ? `${input.minutesPerDay} minutes is the floor, not the target. Try to protect more than ${TARGET_DAILY_MINUTES} minutes a day — that is the pace most passers keep, and it is what lets Charles fit a topic, its practice and your flashcards into one sitting.`
      : null

  return {
    recommendedHours,
    weeklyHours,
    recommendedWeeks,
    recommendedTarget,
    recommendedExamDate: recommendedExam.date,
    recommendedExamLabel: recommendedExam.label,
    estimatedReadyDate: isoDay(estimatedReady),
    estimatedReadyLabel: estimatedReady.toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }),
    availableWeeks,
    status,
    headline,
    advice,
    deficitHours,
    coverage,
    fixes,
    minutesNudge,
  }
}
