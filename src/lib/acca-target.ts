import { ambitionFactor, shapeDay } from "@/lib/acca-schedule"

/*
 * THE TARGET — the readiness score a learner aims at before exam day.
 *
 * It is not decoration. `targetProb` scales daily practice volume through
 * ambitionFactor, moves the recommended exam date, and sets the line every
 * readiness meter in the app is measured against. Until now nobody was asked
 * for it: the control existed on a slide that onboardingSteps filtered out, so
 * every learner in production silently got the `?? 75` fallback.
 *
 * ── WHY THE PRESETS ARE 65 / 75 / 85 ────────────────────────────
 * Because those are the engine's actual gears. ambitionFactor has exactly three
 * bands (≥85 → 1.35, ≥75 → 1.10, else 1.00), so a fourth preset would be a
 * choice that changes the wording and nothing else. 90% was offered before and
 * built precisely the same day as 85%.
 *
 * ── WHY CUSTOM STOPS AT 50 AND 95 ───────────────────────────────
 * buildOnboardingGuide accepts a selected target only when it is finite and
 * within 50–95; anything else falls back to Charles's recommendation. A picker
 * that let someone choose 100 would appear to accept it and then quietly store
 * a different number. 50 is also the ACCA pass mark, so aiming below it is not
 * a target, it is a plan to fail.
 */

export const TARGET_MIN = 50
export const TARGET_MAX = 95

/** Charles's recommendation, and the value every fallback in the app uses. */
export const TARGET_DEFAULT = 75

export interface TargetPreset {
  value: number
  label: string
  blurb: string
}

/** The three presets, one per ambitionFactor band. */
export const TARGET_PRESETS: readonly TargetPreset[] = [
  { value: 65, label: "Pass-ready", blurb: "Clear of the 50% pass mark, with margin for a bad question." },
  { value: 75, label: "Confident", blurb: "Where most people who pass first time sit. Charles recommends this." },
  { value: 85, label: "Bulletproof", blurb: "Room to lose marks on the day and still pass comfortably." },
] as const

export type TargetBandKey = "steady" | "confident" | "bulletproof"

export interface TargetBand {
  key: TargetBandKey
  label: string
  /** Practice multiplier this band applies to the day — straight from the scheduler. */
  factor: number
  /**
   * Extra practice versus the baseline band, as a whole percentage.
   * 65 → 0, 75 → 10, 85 → 35. Shown to the learner so the choice is honest
   * about what it costs them daily.
   */
  upliftPercent: number
}

/** Clamp any input (slider, typed, restored draft) into the accepted range. */
export function clampTarget(value: number): number {
  if (!Number.isFinite(value)) return TARGET_DEFAULT
  return Math.min(TARGET_MAX, Math.max(TARGET_MIN, Math.round(value)))
}

/**
 * Which band a target lands in, and what it does to the day.
 *
 * Derived from ambitionFactor rather than restating its thresholds, so the
 * sentence the learner reads cannot disagree with the plan they are given.
 */
export function targetBand(value: number): TargetBand {
  const target = clampTarget(value)
  const factor = ambitionFactor(target)
  const baseline = ambitionFactor(TARGET_MIN)
  const upliftPercent = Math.round((factor / baseline - 1) * 100)

  const key: TargetBandKey = factor >= ambitionFactor(85) ? "bulletproof" : factor >= ambitionFactor(75) ? "confident" : "steady"
  const label = key === "bulletproof" ? "Bulletproof" : key === "confident" ? "Confident" : "Pass-ready"

  return { key, label, factor, upliftPercent }
}

/**
 * One line describing what this target does to THIS learner's day.
 *
 * ── WHY IT TAKES THEIR MINUTES ──────────────────────────────────
 * The obvious version of this sentence — "about 35% more practice a day" —
 * is false for most people. ambitionFactor raises the practice CEILING, so it
 * only changes anything once the daily budget is big enough for that cap to
 * bind. Measured against the real allocator:
 *
 *     40 min → 22 / 22 / 22 questions   (target changes nothing)
 *     60 min → 34 / 34 / 34             (target changes nothing)
 *     90 min → 34 / 37 / 45
 *    180 min → 68 / 74 / 87
 *
 * 40 and 60 minutes are the two commonest answers on the previous step, so the
 * percentage line would have been wrong for most learners on the slide where
 * we ask them to trust the plan. This asks the scheduler instead and reports
 * what it actually returns.
 */
export function targetConsequence(value: number, minutesPerDay: number): string {
  const here = dailyQuestions(minutesPerDay, value)
  const base = dailyQuestions(minutesPerDay, TARGET_MIN)
  const extra = here - base
  if (extra > 0) return `${here} questions a day — ${extra} more than a 65% target.`
  return `${here} questions a day, at the time you've set aside.`
}

/** Questions the scheduler actually puts in a day at this pace and target. */
export function dailyQuestions(minutesPerDay: number, value: number): number {
  return shapeDay(minutesPerDay, clampTarget(value)).questionGoal
}
