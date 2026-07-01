/*
 * Scholify — ACCA study plan / readiness.
 *
 * Turns the raw practice stats into a coach's view: how ready you are, which
 * areas are weak, whether you're on track for your exam date, and what to do
 * next. The exam date + daily goal are stored per paper in localStorage.
 */

import { getPaper, getPaperStats, type PaperStats } from "@/lib/acca"

const KEY = "scholify-acca-plan"

export interface PaperPlan {
  /** yyyy-MM-dd target sitting date, or null. */
  examDate: string | null
  /** Target questions to attempt per day. */
  dailyGoal: number
}

type Store = Record<string, PaperPlan>

const DEFAULT_PLAN: PaperPlan = { examDate: null, dailyGoal: 15 }

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
  const exam = new Date(plan.examDate)
  if (Number.isNaN(exam.getTime())) return null
  const now = new Date()
  return Math.max(0, Math.round((exam.getTime() - now.getTime()) / 86400000))
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

/** Human label for a readiness band. */
export function readinessBand(readiness: number): { label: string; color: string } {
  if (readiness >= 75) return { label: "On track", color: "#10B981" }
  if (readiness >= 50) return { label: "Getting there", color: "#F59E0B" }
  if (readiness > 0) return { label: "Early days", color: "#EF4444" }
  return { label: "Not started", color: "#94A3B8" }
}

export type { PaperStats }
