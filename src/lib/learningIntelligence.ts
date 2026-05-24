/*
 * Scholify — Learning Intelligence.
 *
 * Client-side pattern analyzer. Reads the user's plan + progress + session
 * notes from the existing scholify-data module and derives:
 *
 *   • the dominant learning style (visual / active / reflective / reading /
 *     mixed)
 *   • per-task-type completion rates
 *   • a small set of concrete, kind suggestions ("reduce_task_type",
 *     "reduce_time", "shift_to_best_day") with the action payload needed
 *     to apply them
 *
 * The optional AI-enhanced text comes from /api/lara?action=analyze-patterns
 * — when that endpoint is unavailable (no ANTHROPIC_API_KEY) the local
 * rule-based suggestions still render so the feature works in demo mode.
 *
 * Applied / dismissed state is persisted locally per plan + suggestion id
 * so the dashboard never re-shows a card the user already actioned.
 */

import {
  RESOURCE,
  readActivePlanId,
  readPlan,
  readProgress,
  updatePlan,
  type PlanTask,
  type ResourceType,
  type SessionMood,
  type StoredPlan,
} from "@/lib/scholify-data"
import { api } from "@/lib/api"

/* ── Public types ────────────────────────────────────────────────────── */

export type LearningStyle = "visual" | "active" | "reflective" | "reading" | "mixed"

export type SuggestionType =
  | "reduce_task_type"
  | "increase_task_type"
  | "reduce_time"
  | "shift_to_best_day"

export interface SuggestionAction {
  /** Resource type to swap out (when type === "reduce_task_type"). */
  replaceType?: ResourceType
  /** Resource type to swap in. */
  withType?: ResourceType
  /** New daily-minutes value (when type === "reduce_time"). */
  newDailyMinutes?: number
}

export interface Suggestion {
  id: string
  type: SuggestionType
  text: string
  action: SuggestionAction
}

export interface ProgressPattern {
  task_title: string
  resource_type: ResourceType
  minutes_spent: number
  completed: boolean
  day_number: number
  session_mood?: SessionMood
}

export interface TypeBreakdown {
  type: ResourceType
  total: number
  completed: number
  rate: number
  avgMinutes: number
}

export interface PatternAnalysis {
  dominantStyle: LearningStyle
  breakdown: TypeBreakdown[]
  suggestions: Suggestion[]
  insights: string[]
  totalSessions: number
  avgActualMinutes: number
  plannedDailyMinutes: number
}

/* ── Public API ──────────────────────────────────────────────────────── */

/** Lower bound: we need at least a week of data to say anything useful. */
export const MIN_SESSIONS_FOR_INSIGHTS = 7

/** Stricter bound for surfacing UI cards (Smart Suggestions, Style card). */
export const MIN_SESSIONS_FOR_UI = 14

/** Map our resource-types onto Scholify's learning-style vocabulary. */
const STYLE_MAP: Record<ResourceType, LearningStyle> = {
  video: "visual",
  reading: "reading",
  practice: "active",
  exercise: "active",
  reflection: "reflective",
}

/**
 * Build the input for `analyzePatterns` from the local plan + progress
 * stores. `minutes_spent` falls back to the planned `estimated_minutes`
 * for completed days when we have no precise focus-timer measurement.
 */
export function buildProgressPatterns(): ProgressPattern[] {
  const plan = readPlan()
  const progress = readProgress()
  const tasks: PlanTask[] = Array.isArray(plan.tasks) ? plan.tasks : []
  if (tasks.length === 0) return []
  const completedSet = new Set(progress.completed)
  const out: ProgressPattern[] = []
  // Iterate every task the user has been exposed to so far — anything past
  // the highest completed day counts as "not completed".
  const cutoff = Math.max(...progress.completed, progress.completed.length, 0) + 1
  for (const t of tasks) {
    if (t.day_number > cutoff) break
    const completed = completedSet.has(t.day_number)
    const note = progress.notes?.[t.day_number]
    out.push({
      task_title: t.task_title,
      resource_type: t.resource_type,
      minutes_spent: completed ? Math.max(1, t.estimated_minutes || 20) : 0,
      completed,
      day_number: t.day_number,
      session_mood: note?.mood || undefined,
    })
  }
  return out
}

/**
 * Pure analysis function. No I/O. The caller passes the patterns + the
 * plan's intended daily-minutes so we can decide whether tasks are
 * being finished faster than planned.
 */
export function analyzePatterns(
  patterns: ProgressPattern[],
  plannedDailyMinutes: number,
): PatternAnalysis {
  // ── Empty / not-enough-data state ───────────────────────────────────
  if (patterns.length < MIN_SESSIONS_FOR_INSIGHTS) {
    return {
      dominantStyle: "mixed",
      breakdown: emptyBreakdown(),
      suggestions: [],
      insights: [],
      totalSessions: patterns.length,
      avgActualMinutes: 0,
      plannedDailyMinutes,
    }
  }

  // ── Per-type breakdown ─────────────────────────────────────────────
  const buckets: Record<ResourceType, { total: number; completed: number; minutesSum: number }> = {
    video: { total: 0, completed: 0, minutesSum: 0 },
    reading: { total: 0, completed: 0, minutesSum: 0 },
    practice: { total: 0, completed: 0, minutesSum: 0 },
    exercise: { total: 0, completed: 0, minutesSum: 0 },
    reflection: { total: 0, completed: 0, minutesSum: 0 },
  }
  for (const p of patterns) {
    const b = buckets[p.resource_type]
    if (!b) continue
    b.total++
    if (p.completed) {
      b.completed++
      b.minutesSum += p.minutes_spent || 0
    }
  }

  const breakdown: TypeBreakdown[] = (Object.keys(buckets) as ResourceType[])
    .map((type) => {
      const b = buckets[type]
      const rate = b.total > 0 ? b.completed / b.total : 0
      const avgMinutes = b.completed > 0 ? b.minutesSum / b.completed : 0
      return { type, total: b.total, completed: b.completed, rate, avgMinutes }
    })
    // Only consider types that actually appeared in the plan.
    .filter((b) => b.total > 0)
    .sort((a, b) => b.rate - a.rate)

  // ── Dominant style ─────────────────────────────────────────────────
  const bestType = breakdown[0]?.type
  const worstType = breakdown[breakdown.length - 1]?.type
  const topRate = breakdown[0]?.rate ?? 0
  const secondRate = breakdown[1]?.rate ?? 0

  let dominantStyle: LearningStyle = "mixed"
  if (bestType) {
    // Only call it dominant if there's a meaningful gap between #1 and #2.
    if (topRate - secondRate >= 0.15 || breakdown.length === 1) {
      dominantStyle = STYLE_MAP[bestType]
    } else {
      // Two close types: keep "mixed" unless both are active-style or both reading.
      const styleVotes = breakdown.slice(0, 2).map((b) => STYLE_MAP[b.type])
      dominantStyle = styleVotes[0] === styleVotes[1] ? styleVotes[0] : "mixed"
    }
  }

  // ── Stats ──────────────────────────────────────────────────────────
  const completedPatterns = patterns.filter((p) => p.completed)
  const avgActualMinutes =
    completedPatterns.length > 0
      ? completedPatterns.reduce((s, p) => s + (p.minutes_spent || 0), 0) / completedPatterns.length
      : 0

  // ── Insights ───────────────────────────────────────────────────────
  const insights: string[] = []
  if (bestType && topRate >= 0.85) {
    insights.push(
      `You consistently complete ${RESOURCE[bestType].label.toLowerCase()} tasks (${Math.round(topRate * 100)}% rate).`,
    )
  }
  if (worstType && bestType && worstType !== bestType) {
    const lowRate = breakdown[breakdown.length - 1].rate
    if (lowRate < 0.5) {
      insights.push(
        `${RESOURCE[worstType].label} tasks are harder for you to finish (${Math.round(lowRate * 100)}%). Shorter sessions usually help.`,
      )
    }
  }
  // Mood pattern — "struggling" / "okay" on >40% of days.
  const moodCounts = completedPatterns.reduce<Record<string, number>>((acc, p) => {
    if (p.session_mood) acc[p.session_mood] = (acc[p.session_mood] || 0) + 1
    return acc
  }, {})
  const moodTotal = Object.values(moodCounts).reduce((s, n) => s + n, 0)
  if (moodTotal >= 5) {
    const tough = (moodCounts["struggling"] || 0) + (moodCounts["okay"] || 0)
    if (tough / moodTotal > 0.4) {
      insights.push(
        "More than 40% of your sessions felt heavy. Worth pacing back a notch — consistency beats intensity.",
      )
    }
    const good = (moodCounts["great"] || 0) + (moodCounts["amazing"] || 0)
    if (good / moodTotal > 0.5) {
      insights.push(`Your best sessions are landing — momentum is real, not lucky.`)
    }
  }
  // Time-of-week pattern: early-week vs late-week completion.
  const earlyWeek = completedPatterns.filter((p) => (p.day_number - 1) % 7 < 3).length
  if (completedPatterns.length >= 7 && earlyWeek / completedPatterns.length > 0.7) {
    insights.push("You perform best early in the week — front-load your hardest tasks Mon–Wed.")
  }

  // ── Suggestions ────────────────────────────────────────────────────
  const suggestions: Suggestion[] = []

  if (worstType && bestType && breakdown[breakdown.length - 1].rate < 0.5 && breakdown[breakdown.length - 1].total >= 3) {
    suggestions.push({
      id: `reduce_${worstType}_to_${bestType}`,
      type: "reduce_task_type",
      text: `Your ${RESOURCE[worstType].label.toLowerCase()} tasks have a low completion rate (${Math.round(
        breakdown[breakdown.length - 1].rate * 100,
      )}%). Want me to replace some with ${RESOURCE[bestType].label.toLowerCase()} tasks instead?`,
      action: { replaceType: worstType, withType: bestType },
    })
  }

  if (avgActualMinutes > 0 && plannedDailyMinutes > 0) {
    const ratio = avgActualMinutes / plannedDailyMinutes
    if (ratio < 0.7 && plannedDailyMinutes >= 15) {
      const newMinutes = Math.max(10, Math.round(avgActualMinutes / 5) * 5)
      suggestions.push({
        id: `reduce_time_${newMinutes}`,
        type: "reduce_time",
        text: `You're finishing tasks in ~${Math.round(
          avgActualMinutes,
        )} minutes but planned ${plannedDailyMinutes}. Want me to retune your plan to ${newMinutes} min/day so it matches reality?`,
        action: { newDailyMinutes: newMinutes },
      })
    } else if (ratio > 1.4) {
      const newMinutes = Math.min(120, Math.round(avgActualMinutes / 5) * 5)
      suggestions.push({
        id: `increase_time_${newMinutes}`,
        type: "reduce_time",
        text: `Your sessions are running long (~${Math.round(
          avgActualMinutes,
        )} min vs planned ${plannedDailyMinutes}). Bump the plan to ${newMinutes} min so you stop feeling behind?`,
        action: { newDailyMinutes: newMinutes },
      })
    }
  }

  if (
    completedPatterns.length >= 7 &&
    earlyWeek / completedPatterns.length > 0.7 &&
    !suggestions.some((s) => s.type === "shift_to_best_day")
  ) {
    suggestions.push({
      id: `shift_hard_tasks_early`,
      type: "shift_to_best_day",
      text: `You complete way more tasks Mon–Wed than later in the week. Should Lara move the hardest tasks earlier so you stay on track?`,
      action: {},
    })
  }

  return {
    dominantStyle,
    breakdown,
    suggestions,
    insights,
    totalSessions: completedPatterns.length,
    avgActualMinutes,
    plannedDailyMinutes,
  }
}

function emptyBreakdown(): TypeBreakdown[] {
  return []
}

/* ── Suggestion persistence (local) ──────────────────────────────────── */

const KEY_SUGGESTION_STATE = "scholify-suggestion-state"

interface SuggestionStateEntry {
  applied?: boolean
  dismissed?: boolean
  updatedAt: string
}

type SuggestionStateMap = Record<string, SuggestionStateEntry>

function readSuggestionState(): SuggestionStateMap {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(KEY_SUGGESTION_STATE)
    return raw ? (JSON.parse(raw) as SuggestionStateMap) : {}
  } catch {
    return {}
  }
}

function writeSuggestionState(map: SuggestionStateMap): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(KEY_SUGGESTION_STATE, JSON.stringify(map))
    window.dispatchEvent(new CustomEvent("scholify-intelligence-change"))
  } catch {
    /* ignore */
  }
}

function keyFor(planId: string | undefined, suggestionId: string): string {
  return `${planId || "active"}::${suggestionId}`
}

export function isSuggestionDismissed(planId: string | undefined, suggestionId: string): boolean {
  const map = readSuggestionState()
  const entry = map[keyFor(planId, suggestionId)]
  return !!entry?.dismissed
}

export function isSuggestionApplied(planId: string | undefined, suggestionId: string): boolean {
  const map = readSuggestionState()
  const entry = map[keyFor(planId, suggestionId)]
  return !!entry?.applied
}

export function markSuggestionDismissed(planId: string | undefined, suggestionId: string): void {
  const map = readSuggestionState()
  map[keyFor(planId, suggestionId)] = {
    ...(map[keyFor(planId, suggestionId)] || {}),
    dismissed: true,
    updatedAt: new Date().toISOString(),
  }
  writeSuggestionState(map)
}

export function markSuggestionApplied(planId: string | undefined, suggestionId: string): void {
  const map = readSuggestionState()
  map[keyFor(planId, suggestionId)] = {
    ...(map[keyFor(planId, suggestionId)] || {}),
    applied: true,
    updatedAt: new Date().toISOString(),
  }
  writeSuggestionState(map)
}

export function subscribeIntelligence(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const fn = () => handler()
  window.addEventListener("scholify-intelligence-change", fn)
  window.addEventListener("storage", fn)
  return () => {
    window.removeEventListener("scholify-intelligence-change", fn)
    window.removeEventListener("storage", fn)
  }
}

/* ── Apply a suggestion to the active plan ───────────────────────────── */

export function applySuggestion(suggestion: Suggestion): StoredPlan | null {
  const plan = readPlan()
  const planId = readActivePlanId() || plan.id
  if (!planId) {
    markSuggestionApplied(planId || undefined, suggestion.id)
    return null
  }
  const tasks: PlanTask[] = Array.isArray(plan.tasks) ? plan.tasks.map((t) => ({ ...t })) : []
  const prevDaily = plan.daily_minutes || 20
  let nextDaily = prevDaily

  if (suggestion.action.newDailyMinutes && suggestion.action.newDailyMinutes >= 5) {
    nextDaily = suggestion.action.newDailyMinutes
    // Scale each task's estimated minutes proportionally so the UI matches.
    for (const t of tasks) {
      const before = t.estimated_minutes || prevDaily
      t.estimated_minutes = Math.max(5, Math.round((before / prevDaily) * nextDaily))
    }
  }

  if (suggestion.action.replaceType && suggestion.action.withType) {
    const from = suggestion.action.replaceType
    const to = suggestion.action.withType
    const progress = readProgress()
    const futureFromTasks = tasks.filter(
      (t) => t.resource_type === from && !progress.completed.includes(t.day_number),
    )
    const swapCount = Math.ceil(futureFromTasks.length / 2)
    for (let i = 0; i < swapCount; i++) {
      futureFromTasks[i].resource_type = to
    }
  }

  if (suggestion.type === "shift_to_best_day") {
    const progress = readProgress()
    const completedSet = new Set(progress.completed)
    const grouped = new Map<number, PlanTask[]>()
    for (const t of tasks) {
      if (completedSet.has(t.day_number)) continue
      const week = t.week_number || Math.ceil(t.day_number / 7)
      const list = grouped.get(week) || []
      list.push(t)
      grouped.set(week, list)
    }
    for (const [, list] of grouped) {
      list.sort((a, b) => (b.estimated_minutes || 0) - (a.estimated_minutes || 0))
      const days = list.map((t) => t.day_number).sort((a, b) => a - b)
      list.forEach((t, idx) => {
        t.day_number = days[idx]
      })
    }
  }

  const updated = updatePlan(planId, { tasks, daily_minutes: nextDaily })
  markSuggestionApplied(planId, suggestion.id)
  return updated
}

/* ── AI-enhanced suggestions (optional) ──────────────────────────────── */

/**
 * Ask Claude Haiku (server-side) to rewrite the suggestion list with
 * warmer, goal-aware language. Falls back to the local suggestions if
 * the server returns nothing useful.
 */
export async function refineSuggestionsWithAI(
  goal: string,
  analysis: PatternAnalysis,
): Promise<Suggestion[]> {
  if (analysis.suggestions.length === 0) return analysis.suggestions
  try {
    const result = await api.analyzePatterns({
      goal,
      dominantStyle: analysis.dominantStyle,
      breakdown: analysis.breakdown.map((b) => ({
        type: b.type,
        rate: Math.round(b.rate * 100) / 100,
        completed: b.completed,
        total: b.total,
        avgMinutes: Math.round(b.avgMinutes),
      })),
      avgActualMinutes: Math.round(analysis.avgActualMinutes),
      plannedDailyMinutes: analysis.plannedDailyMinutes,
      seedSuggestions: analysis.suggestions.map((s) => ({ id: s.id, type: s.type, text: s.text })),
    })
    if (result.isFallback || !Array.isArray(result.suggestions) || result.suggestions.length === 0) {
      return analysis.suggestions
    }
    // Merge: keep our suggestion ids + actions, swap in AI-rewritten text.
    return analysis.suggestions.map((local) => {
      const ai = result.suggestions.find((s) => s.id === local.id)
      return ai && typeof ai.text === "string" && ai.text.trim().length > 10
        ? { ...local, text: ai.text.trim() }
        : local
    })
  } catch {
    return analysis.suggestions
  }
}
