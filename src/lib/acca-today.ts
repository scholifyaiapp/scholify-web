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

import { getPaperStats, getPaper } from "@/lib/acca"
import { getLatestDiagnostic, estimateFromPractice } from "@/lib/acca-diagnostic"
import { flashcardStats } from "@/lib/acca-flashcards"

export type TodayAction = "diagnostic" | "weak" | "practice" | "flashcards" | "mock"

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
  const est = estimateFromPractice(paperId) ?? getLatestDiagnostic(paperId)
  const paper = getPaper(paperId)
  const name = paper?.id ?? "this paper"
  if (!est) return `Let's find out where you stand on ${name}.`
  return `You're at ${est.passProbability}% to pass ${name}. Finish today's plan to push it higher.`
}

/** Build today's ordered plan for a paper (max 3 tasks). */
export function buildTodayPlan(paperId: string): TodayTask[] {
  const diag = getLatestDiagnostic(paperId)
  const live = estimateFromPractice(paperId)
  const stats = getPaperStats(paperId)
  const fc = flashcardStats(paperId)
  const est = live ?? diag

  // 1. No baseline → diagnose first, and nothing else (keep it focused).
  if (!diag && stats.answered < 5) {
    return [
      {
        id: "diagnostic",
        icon: "🎯",
        title: "Take your diagnostic",
        detail: "~15 min · get your pass probability and your weak areas",
        action: "diagnostic",
      },
    ]
  }

  const tasks: TodayTask[] = []

  // 2. Strengthen the weakest area.
  const weakest = est?.weakest?.[0]
  if (weakest) {
    tasks.push({
      id: "weak",
      icon: "💪",
      title: `Strengthen ${weakest.label}`,
      detail: `Your weakest area (${Math.round(weakest.score * 100)}%) — a targeted, adaptive drill`,
      action: "weak",
    })
  }

  // 3. Spaced revision when cards are due.
  if (fc.due > 0) {
    tasks.push({
      id: "flashcards",
      icon: "🧠",
      title: `Review ${fc.due} flashcard${fc.due === 1 ? "" : "s"}`,
      detail: "Spaced repetition — lock in what you've already learned",
      action: "flashcards",
    })
  }

  // 4. Ready enough → mock; otherwise keep practising to build coverage.
  const pass = est?.passProbability ?? 0
  if (pass >= 60 && stats.answered >= 20) {
    tasks.push({
      id: "mock",
      icon: "⏱️",
      title: "Sit a timed mock",
      detail: "Exam conditions — confirm you're genuinely on track",
      action: "mock",
    })
  } else if (tasks.length < 2) {
    tasks.push({
      id: "practice",
      icon: "✏️",
      title: "Practice questions",
      detail: "Build coverage across the syllabus with instant marking",
      action: "practice",
    })
  }

  return tasks.slice(0, 3)
}
