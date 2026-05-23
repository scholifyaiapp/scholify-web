/*
 * Plan recalibration — client wrapper.
 *
 * Calls /api/recalibrate-plan to ask Claude for an adjusted tail of the
 * plan. The resulting tasks REPLACE the not-yet-completed tail of the
 * active plan (or the plan identified by planId).
 */

import {
  readActivePlan,
  readActivePlanId,
  readPlans,
  readProgress,
  readProgressForPlan,
  setActivePlan,
  updatePlan,
  type PlanTask,
  type StoredPlan,
} from "@/lib/scholify-data"

export type RecalibrationReason = "missed_days" | "manual" | "deadline_change"

export interface RecalibrateInput {
  planId?: string
  newDeadline?: string | null
  newDailyMinutes?: number
  reason: RecalibrationReason
}

export interface RecalibrateResult {
  plan: StoredPlan
  newTasks: PlanTask[]
  remainingDays: number
  isMock?: boolean
}

interface RecalibrateApiResponse {
  tasks: PlanTask[]
  isMock?: boolean
  error?: string
}

const RECAL_KEY = "scholify-recalibrations"

interface RecalEvent {
  planId: string
  at: string
  reason: RecalibrationReason
  newDeadline: string | null
  remaining: number
}

export function logRecalibration(event: RecalEvent): void {
  try {
    const raw = window.localStorage.getItem(RECAL_KEY)
    const list: RecalEvent[] = raw ? JSON.parse(raw) : []
    list.push(event)
    window.localStorage.setItem(RECAL_KEY, JSON.stringify(list.slice(-20)))
  } catch {
    /* ignore */
  }
}

export function readLatestRecalibration(planId: string): RecalEvent | null {
  try {
    const raw = window.localStorage.getItem(RECAL_KEY)
    if (!raw) return null
    const list: RecalEvent[] = JSON.parse(raw)
    return [...list].reverse().find((e) => e.planId === planId) ?? null
  } catch {
    return null
  }
}

export async function recalibratePlan(
  input: RecalibrateInput,
): Promise<RecalibrateResult | null> {
  const planId = input.planId ?? readActivePlanId() ?? null
  const plans = readPlans()
  const plan =
    plans.find((p) => p.id === planId) ?? readActivePlan() ?? plans[0]
  if (!plan || !plan.id) return null

  const progress =
    planId && readActivePlanId() !== planId
      ? readProgressForPlan(planId)
      : readProgress()

  const deadlineIso = input.newDeadline ?? plan.deadline ?? null
  const dailyMinutes = input.newDailyMinutes ?? plan.daily_minutes ?? 20

  const today = new Date()
  const deadlineDate = deadlineIso ? new Date(deadlineIso) : null
  const remainingDays =
    deadlineDate && !Number.isNaN(deadlineDate.getTime())
      ? Math.max(
          0,
          Math.ceil((deadlineDate.getTime() - today.getTime()) / 86_400_000),
        )
      : 30

  if (remainingDays <= 0) return null

  const completed = Array.isArray(progress.completed) ? progress.completed : []
  const lastCompletedDay = completed.length ? Math.max(...completed) : 0
  const startDayNumber = lastCompletedDay + 1
  const currentWeek = Math.ceil(startDayNumber / 7)

  // Best-effort gap calculation: days between today and the last completion.
  let missedDays = 0
  if (progress.lastDate) {
    const last = new Date(progress.lastDate).getTime()
    const gap = Math.floor((today.getTime() - last) / 86_400_000)
    missedDays = Math.max(0, gap - 1)
  }

  const res = await fetch("/api/recalibrate-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      goal: plan.goal,
      deadline: deadlineIso,
      dailyMinutes,
      startDayNumber,
      remainingDays,
      currentWeek,
      reason: input.reason,
      missedDays,
    }),
  })

  let payload: RecalibrateApiResponse
  try {
    payload = (await res.json()) as RecalibrateApiResponse
  } catch {
    return null
  }
  if (!res.ok || payload.error) return null
  const newTasks = Array.isArray(payload.tasks) ? payload.tasks : []
  if (newTasks.length === 0) return null

  // Splice — keep tasks the user already completed, replace the rest.
  const existingTasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const preserved = existingTasks.filter((t) => t.day_number < startDayNumber)
  const merged = [...preserved, ...newTasks]

  const updated = updatePlan(plan.id, {
    tasks: merged,
    daily_minutes: dailyMinutes,
    deadline: deadlineIso,
  })
  if (!updated) return null

  // Keep the legacy mirror in sync if this is the active plan.
  if (readActivePlanId() === plan.id) {
    setActivePlan(plan.id)
  }

  logRecalibration({
    planId: plan.id,
    at: new Date().toISOString(),
    reason: input.reason,
    newDeadline: deadlineIso,
    remaining: remainingDays,
  })

  return {
    plan: updated,
    newTasks,
    remainingDays,
    isMock: payload.isMock,
  }
}

/**
 * Decide whether the dashboard should auto-recalibrate on load.
 * Triggers when there's an active plan with a non-zero streak that has
 * gone unanswered for 3+ days.
 */
export function shouldAutoRecalibrate(): boolean {
  const plan = readActivePlan()
  if (!plan || !plan.id || plan.status !== "active") return false
  const progress = readProgress()
  if (progress.streak <= 0) return false
  if (!progress.lastDate) return false
  const lastTs = new Date(progress.lastDate).getTime()
  if (Number.isNaN(lastTs)) return false
  const gapDays = Math.floor((Date.now() - lastTs) / 86_400_000)
  return gapDays >= 3
}
