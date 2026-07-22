/*
 * Scholify — the AI Study OS daily plan.
 *
 * The signature moment: a student opens the app and sees a greeting, their live
 * pass probability, and a SHORT ordered plan for today — they never choose what
 * to study. This assembles the engines we already have (diagnostic, adaptive,
 * flashcards, mocks) into one prioritised "do this now" list.
 *
 * Rules of thumb, in priority order:
 *  1. No baseline yet → take the diagnostic (can't personalise without it).
 *  2. Strengthen the weakest area (the needle-mover).
 *  3. Clear due flashcards (spaced revision keeps mastery warm).
 *  4. Ready enough → prove it with a timed mock; otherwise keep practising.
 * Kept to 3 tasks max so it never feels like a wall.
 */

import { getPaper } from "@/lib/acca"
import { readinessState, recoveryState } from "@/lib/acca-loop"
import { buildDailyTasks } from "@/lib/acca-schedule"

export type TodayAction = "diagnostic" | "weak" | "practice" | "essentials" | "flashcards" | "mock" | "study" | "bank"

/** Rough per-task durations — the single source for "~25 min" labels. */
export const MISSION_MINUTES: Record<TodayAction, number> = {
  diagnostic: 15, weak: 25, practice: 20, essentials: 6, flashcards: 12, mock: 30, study: 7, bank: 40,
}

export interface TodayTask {
  id: string
  icon: string
  title: string
  detail: string
  action: TodayAction
  /** Syllabus area the task targets (essentials/study carry it). */
  area?: string
}

/** Time-of-day greeting, personalised when we know the name. */
export function greeting(name?: string): string {
  const h = new Date().getHours()
  const part = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"
  const who = name?.trim()
  return who ? `${part}, ${who}` : part
}

/** The line under the greeting — honest, evidence-tied pass framing. */
export function todayHeadline(paperId: string): string {
  const paper = getPaper(paperId)
  const name = paper?.id ?? "this paper"
  const { prob, measuring, answered, answersNeeded, areasSeen, areasTotal } = readinessState(paperId)
  // No number until the evidence earns one. A handful of answers in one corner of
  // the syllabus sits near the 50% prior by construction — quoting it would be a
  // confident claim we haven't measured. Say what's still missing instead.
  if (measuring) {
    if (answered === 0) return `Let's find out where you stand on ${name}.`
    return `Still measuring you on ${name} — ${answered} of ${answersNeeded} answers in, ${areasSeen}/${areasTotal} syllabus areas touched. Keep going and your pass number appears.`
  }
  const rec = recoveryState(paperId)
  if (rec.active) {
    return `Retake run on ${name}: you're at ${prob}% and every answer recovers lost marks. Today's plan is the way back.`
  }
  return `You're at ${prob}% to pass ${name}. Finish today's plan to push it higher.`
}

/**
 * Build today's ordered plan for a paper. Delegates to the distributed
 * schedule engine (acca-schedule) — which handles the zero/assess personas,
 * the A·B·C deferred-diagnostic gate, the current method phase, the daily time
 * budget and the target %, and self-heals around missed days.
 */
export function buildTodayPlan(paperId: string): TodayTask[] {
  return buildDailyTasks(paperId).map((t) => ({
    id: t.id,
    icon: t.icon,
    title: t.title,
    detail: t.detail,
    action: t.action,
    area: t.area,
  }))
}

/* ── Sequential unlock: one task at a time ────────────────────────────────
 *
 * Today's tasks unlock in order — the learner finishes the active one before the
 * next opens. "Finished" is proved by RETURNING to the plan after doing the task:
 * runToday() stamps the launched task as pending; when the learner lands back on
 * the Today tab, the pending task is marked done and the next unlocks. Completion
 * is per-paper, per-calendar-day, in localStorage (offline-first like the rest).
 */
const doneKey = (paperId: string) => `scholify-today-done-${paperId}-${new Date().toISOString().slice(0, 10)}`
const PENDING_KEY = "scholify-today-pending"

export function getTodayDone(paperId: string): string[] {
  try {
    const raw = window.localStorage.getItem(doneKey(paperId))
    const arr = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : []
  } catch {
    return []
  }
}

export function markTodayTaskDone(paperId: string, taskId: string): void {
  try {
    const done = new Set(getTodayDone(paperId))
    done.add(taskId)
    window.localStorage.setItem(doneKey(paperId), JSON.stringify([...done]))
  } catch {
    /* localStorage unavailable — sequential lock just won't persist */
  }
}

/** Remember which task the learner just launched, so we can complete it on return. */
export function setPendingTodayTask(paperId: string, taskId: string): void {
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify({ paperId, taskId, day: new Date().toISOString().slice(0, 10) }))
  } catch {
    /* ignore */
  }
}

/**
 * Resolve a pending task into "done" (call on Today-tab mount). Returns true if a
 * task was just completed, so the caller can refresh its view.
 */
export function resolvePendingTodayTask(paperId: string): boolean {
  try {
    const raw = window.localStorage.getItem(PENDING_KEY)
    if (!raw) return false
    const p = JSON.parse(raw) as { paperId?: string; taskId?: string; day?: string }
    window.localStorage.removeItem(PENDING_KEY)
    const today = new Date().toISOString().slice(0, 10)
    if (p.paperId === paperId && typeof p.taskId === "string" && p.day === today) {
      markTodayTaskDone(paperId, p.taskId)
      return true
    }
  } catch {
    /* ignore */
  }
  return false
}
