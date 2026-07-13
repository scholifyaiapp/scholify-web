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
import { passProbability, recoveryState } from "@/lib/acca-loop"
import { buildDailyTasks } from "@/lib/acca-schedule"

export type TodayAction = "diagnostic" | "weak" | "practice" | "flashcards" | "mock" | "study" | "bank"

/** Rough per-task durations — the single source for "~25 min" labels. */
export const MISSION_MINUTES: Record<TodayAction, number> = {
  diagnostic: 15, weak: 25, practice: 20, flashcards: 12, mock: 30, study: 7, bank: 40,
}

export interface TodayTask {
  id: string
  icon: string
  title: string
  detail: string
  action: TodayAction
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
  const prob = passProbability(paperId)
  if (prob === null) return `Let's find out where you stand on ${name}.`
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
  }))
}
