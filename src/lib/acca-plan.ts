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
 * Build a three-phase plan (Learn → Practice → Revise & mock) from the paper's
 * exam date. Split 50/30/20 of the remaining time. Deterministic and offline.
 */
export function generateStudyPlan(paperId: string): StudyPlan {
  const days = daysUntilExam(paperId)
  if (days === null || days <= 0) {
    return { hasDate: days === 0, daysLeft: days, dailyTarget: 15, phases: [] }
  }

  const learn = Math.max(1, Math.round(days * 0.5))
  const practice = Math.max(1, Math.round(days * 0.3))
  const revise = Math.max(1, days - learn - practice)

  const now = new Date()
  const start = new Date(now)
  const p1End = new Date(now); p1End.setDate(now.getDate() + learn)
  const p2End = new Date(p1End); p2End.setDate(p1End.getDate() + practice)
  const exam = new Date(p2End); exam.setDate(p2End.getDate() + revise)

  // Aim to cover the syllabus with steady daily practice; scale with time left.
  const dailyTarget = days > 60 ? 12 : days > 30 ? 18 : days > 14 ? 25 : 30

  return {
    hasDate: true,
    daysLeft: days,
    dailyTarget,
    phases: [
      { emoji: "📚", label: "Learn the syllabus", focus: "Work through each syllabus area with practice + Ask Lara on anything unclear.", days: learn, range: `${fmtDate(start)} – ${fmtDate(p1End)}` },
      { emoji: "🎯", label: "Practice & target weak areas", focus: "Drill questions, use weak-area targeting, and generate custom sets on shaky topics.", days: practice, range: `${fmtDate(p1End)} – ${fmtDate(p2End)}` },
      { emoji: "⏱️", label: "Revise & mock", focus: "Sit timed mocks, mark written answers with the AI Examiner, and close the last gaps.", days: revise, range: `${fmtDate(p2End)} – ${fmtDate(exam)}` },
    ],
  }
}

/** Human label for a readiness band. */
export function readinessBand(readiness: number): { label: string; color: string } {
  if (readiness >= 75) return { label: "On track", color: "#10B981" }
  if (readiness >= 50) return { label: "Getting there", color: "#F59E0B" }
  if (readiness > 0) return { label: "Early days", color: "#EF4444" }
  return { label: "Not started", color: "#94A3B8" }
}

export type { PaperStats }
