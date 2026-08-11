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

export type TodayAction = "diagnostic" | "weak" | "practice" | "section" | "essentials" | "flashcards" | "mock" | "study" | "bank"

/** Rough per-task durations — the single source for "~25 min" labels. */
export const MISSION_MINUTES: Record<TodayAction, number> = {
  diagnostic: 15, weak: 25, practice: 20, section: 15, essentials: 6, flashcards: 12, mock: 30, study: 7, bank: 40,
}

/**
 * Split the learner's daily time budget across today's tasks, weighted by each
 * task's rough duration, so the minutes shown sum to roughly their onboarding
 * commitment (60 min → ~10 learn / ~10 essentials / ~20 practice / …). The
 * structure follows whatever tasks the schedule engine built for this paper and
 * phase, so it naturally shifts between papers and A/B/C section work.
 */
export function allocateTaskMinutes(tasks: TodayTask[], dailyMinutes: number): number[] {
  if (tasks.length === 0) return []
  const budget = Math.max(tasks.length, dailyMinutes) // at least ~1 min/task
  const weights = tasks.map((t) => MISSION_MINUTES[t.action] ?? 10)
  const sum = weights.reduce((a, b) => a + b, 0) || 1
  const allocation = weights.map((w) => Math.max(1, Math.floor((w / sum) * budget)))
  let remaining = budget - allocation.reduce((a, b) => a + b, 0)
  const priority = weights.map((w, i) => ({ i, fraction: (w / sum) * budget - Math.floor((w / sum) * budget) })).sort((a, b) => b.fraction - a.fraction)
  for (let cursor = 0; remaining > 0; cursor += 1, remaining -= 1) allocation[priority[cursor % priority.length].i] += 1
  return allocation
}

export interface TodayTask {
  id: string
  icon: string
  title: string
  detail: string
  action: TodayAction
  /** Syllabus area the task targets (essentials/study carry it). */
  area?: string
  /** Official exam section for a section-specific practice block. */
  section?: "A" | "B" | "C"
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
 * Build the four in-app steps of the universal daily loop. The fifth step,
 * Technical Article, is rendered from the paper's official ACCA resource in
 * AccaStudy. The shape never changes: limited-time learners should understand
 * the routine instantly. The schedule engine personalises the CONTENT inside
 * Study and Practice (topic, weak area and volume), not the number of tasks.
 */
export function buildTodayPlan(paperId: string): TodayTask[] {
  const scheduled: TodayTask[] = buildDailyTasks(paperId).map((t) => ({
    id: t.id,
    icon: t.icon,
    title: t.title.replace(/^Drill\b/i, "Practice"),
    detail: t.detail,
    action: t.action,
    area: t.area,
  }))
  const paper = getPaper(paperId)
  const studySource = scheduled.find((task) => task.action === "study")
  const practiceSource = scheduled.find((task) => task.action === "weak" || task.action === "practice" || task.action === "bank")
  const cardSource = scheduled.find((task) => task.action === "flashcards")
  const area = studySource?.area ?? practiceSource?.area ?? paper?.areas[0]?.code
  const areaLabel = paper?.areas.find((item) => item.code === area)?.label
  const topic = area ? `${area}${areaLabel ? ` · ${areaLabel}` : ""}` : paperId

  return [
    {
      id: "study",
      icon: "📖",
      title: "Study",
      detail: studySource?.detail ?? `Learn today's priority topic: ${topic}`,
      action: "study",
      area,
    },
    {
      id: "essentials",
      icon: "🎯",
      title: "Quiz",
      detail: `Check the essential ideas from ${topic} with instant explanations`,
      action: "essentials",
      area,
    },
    {
      id: "practice",
      icon: "✏️",
      title: "Practice",
      detail: practiceSource?.detail ?? `Apply ${topic} in targeted exam-style questions`,
      action: practiceSource?.action === "weak" ? "weak" : "practice",
      area: practiceSource?.area ?? area,
    },
    {
      id: "flashcards",
      icon: "🧠",
      title: "Flashcards",
      detail: cardSource?.detail ?? "Review the facts, formulas and rules due today",
      action: "flashcards",
      area,
    },
  ]
}

/* ── Sequential unlock: one task at a time ────────────────────────────────
 *
 * Today's tasks unlock in order — the learner finishes the active one before the
 * next opens. "Finished" is proved by RETURNING to the plan after doing the task:
 * runToday() stamps the launched task as pending; when the learner lands back on
 * the Today tab, the pending task is marked done and the next unlocks. Completion
 * is per-paper, per-calendar-day, in localStorage (offline-first like the rest).
 */
/** Local calendar date (YYYY-MM-DD). NEVER toISOString() here — that returns the
 *  UTC date, which desyncs an evening user west of Greenwich (and rolls a day
 *  early east of it) from the daily plan and every other date store, so today's
 *  "done"/pending marks split across two keys. Matches acca.ts/acca-loop todayStr. */
function localDay(): string {
  const d = new Date()
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

const doneKey = (paperId: string) => `scholify-today-done-${paperId}-${localDay()}`
const PENDING_KEY = "scholify-today-pending"

/*
 * ── DAY-SCOPED KEYS ARE GARBAGE AFTER THE DAY ────────────────────
 *
 * Both ledgers below are keyed by calendar day, and nothing ever read a past
 * day — getTodayDone only looks at today, and the streak lives in its own
 * shield store. So they accumulated forever: one key per paper per day, for as
 * long as someone studies.
 *
 * On its own that is slow growth, but the failure mode at the end of it is
 * nasty and silent. Every write in this file is wrapped in a catch that
 * ignores the error, so once localStorage hits quota the app does not warn —
 * it just quietly stops recording that anything was completed, and the
 * learner's day stops saving with no message.
 *
 * A fortnight of retention is far more than anything reads, and small enough
 * that the store cannot grow without bound.
 */
const DAY_KEY_PREFIXES = ["scholify-today-done-", "scholify-block-time-"]
const RETAIN_DAYS = 14

/** Drop day-scoped ledgers older than the retention window. Safe to call often. */
export function pruneOldDayKeys(now = new Date()): number {
  try {
    const cutoff = new Date(now)
    cutoff.setDate(cutoff.getDate() - RETAIN_DAYS)
    const cutoffStamp = `${cutoff.getFullYear()}-${`${cutoff.getMonth() + 1}`.padStart(2, "0")}-${`${cutoff.getDate()}`.padStart(2, "0")}`

    const doomed: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (!key || !DAY_KEY_PREFIXES.some((p) => key.startsWith(p))) continue
      // The date is the last 10 characters — YYYY-MM-DD sorts lexically, which
      // is the whole reason the key is built that way round.
      const stamp = key.slice(-10)
      if (/^\d{4}-\d{2}-\d{2}$/.test(stamp) && stamp < cutoffStamp) doomed.push(key)
    }
    for (const key of doomed) window.localStorage.removeItem(key)
    return doomed.length
  } catch {
    return 0
  }
}

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

/* ── "Locked In" focus session ────────────────────────────────────────────
 *
 * The learner presses Start and the app enters full-focus mode: only today's
 * mission on screen, a countdown in the corner. The session is stored as an END
 * remaining-time record. It pauses when this view unmounts and resumes from
 * that exact saved point when the learner returns. */
const FOCUS_KEY = "scholify-focus-session"

export function startFocusSession(minutes: number): void {
  try {
    window.localStorage.setItem(FOCUS_KEY, JSON.stringify({ remainingSeconds: Math.max(1, minutes) * 60, startedAt: Date.now() }))
  } catch {
    /* ignore */
  }
}
export function resumeFocusSession(): void {
  try {
    const remainingSeconds = focusSecondsLeft()
    if (remainingSeconds > 0) window.localStorage.setItem(FOCUS_KEY, JSON.stringify({ remainingSeconds, startedAt: Date.now() }))
  } catch { /* ignore */ }
}
export function pauseFocusSession(): void {
  try {
    const remainingSeconds = focusSecondsLeft()
    if (remainingSeconds > 0) window.localStorage.setItem(FOCUS_KEY, JSON.stringify({ remainingSeconds }))
  } catch { /* ignore */ }
}
export function clearFocusSession(): void {
  try {
    window.localStorage.removeItem(FOCUS_KEY)
  } catch {
    /* ignore */
  }
}
/** Whole seconds left in the active focus session, or 0 if none / expired. */
export function focusSecondsLeft(): number {
  try {
    const raw = window.localStorage.getItem(FOCUS_KEY)
    if (!raw) return 0
    const state = JSON.parse(raw) as { remainingSeconds?: number; startedAt?: number; endsAt?: number }
    // Migrate a session created by the previous deadline-based implementation.
    if (typeof state.remainingSeconds !== "number" && typeof state.endsAt === "number") {
      return Math.max(0, Math.round((state.endsAt - Date.now()) / 1000))
    }
    if (typeof state.remainingSeconds !== "number") return 0
    const elapsed = typeof state.startedAt === "number" ? Math.floor((Date.now() - state.startedAt) / 1000) : 0
    return Math.max(0, state.remainingSeconds - elapsed)
  } catch {
    return 0
  }
}

/** Remember which task the learner just launched, so we can complete it on return. */
export function setPendingTodayTask(paperId: string, taskId: string, requiresExplicitCompletion = false): void {
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify({ paperId, taskId, day: localDay(), requiresExplicitCompletion }))
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
    const p = JSON.parse(raw) as { paperId?: string; taskId?: string; day?: string; requiresExplicitCompletion?: boolean }
    const today = localDay()
    // A stale marker from a previous day is useless — discard it.
    if (p.day !== today) {
      window.localStorage.removeItem(PENDING_KEY)
      return false
    }
    // Belongs to a different paper — leave it for that paper's tab to resolve.
    if (p.paperId !== paperId || typeof p.taskId !== "string") return false
    if (p.requiresExplicitCompletion) return false
    window.localStorage.removeItem(PENDING_KEY)
    markTodayTaskDone(paperId, p.taskId)
    return true
  } catch {
    /* ignore */
  }
  return false
}

/** Complete a reading task only from its end-of-lesson action. */
export function completePendingTodayTask(paperId: string): boolean {
  try {
    const raw = window.localStorage.getItem(PENDING_KEY)
    if (!raw) return false
    const p = JSON.parse(raw) as { paperId?: string; taskId?: string; day?: string; requiresExplicitCompletion?: boolean }
    if (p.day !== localDay()) {
      window.localStorage.removeItem(PENDING_KEY)
      return false
    }
    if (p.paperId !== paperId || typeof p.taskId !== "string" || !p.requiresExplicitCompletion) return false
    window.localStorage.removeItem(PENDING_KEY)
    markTodayTaskDone(paperId, p.taskId)
    return true
  } catch {
    return false
  }
}
