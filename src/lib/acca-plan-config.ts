import { defaultStudyDays, type PaperPlan } from "@/lib/acca-plan"
import { shapeDay } from "@/lib/acca-schedule"

/**
 * The days a settings screen should show for a plan. Older plans stored only a
 * count, so turn that count into an explicit, predictable Monday-first choice.
 */
export function configuredStudyDays(plan: PaperPlan): number[] {
  const stored = Array.isArray(plan.studyDays)
    ? [...new Set(plan.studyDays.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6))].sort((a, b) => a - b)
    : []
  return stored.length > 0 ? stored : defaultStudyDays(plan.daysPerWeek || 6)
}

/**
 * Resolve one user edit into a coherent plan update.
 *
 * Daily questions are an OUTPUT of the minute budget and readiness target, not
 * a third independent promise. Keeping that derivation here prevents Settings,
 * Analytics and the scheduler from offering three different versions of today.
 */
export function derivePlanUpdate(current: PaperPlan, patch: Partial<PaperPlan>): Partial<PaperPlan> {
  const update: Partial<PaperPlan> = { ...patch }

  if (patch.studyDays) {
    const requested = [...new Set(patch.studyDays.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6))].sort((a, b) => a - b)
    const days = requested.length > 0 ? requested : configuredStudyDays(current)
    update.studyDays = days
    update.daysPerWeek = days.length
  }

  const next = { ...current, ...update }
  if (patch.dailyMinutes !== undefined || patch.targetProb !== undefined) {
    update.dailyGoal = shapeDay(next.dailyMinutes, next.targetProb).questionGoal
  }

  return update
}

export function weeklyStudyHours(plan: PaperPlan): number {
  return Math.round(((plan.dailyMinutes * configuredStudyDays(plan).length) / 60) * 10) / 10
}

