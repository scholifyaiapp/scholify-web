/*
 * Scholify — the DAY GATE: finish today, and tomorrow is genuinely closed.
 *
 * ── Why a lock is the right design ────────────────────────────────
 * When a learner finished the day, the app congratulated them and then left every
 * surface open. So the diligent learner did tomorrow's work tonight, arrived
 * tomorrow with nothing to do, and the daily loop — the whole retention
 * mechanism — quietly died in week two. The learners this hurt most were the
 * committed ones.
 *
 * So: completing today reveals TOMORROW in full (the exact chapter, the exact
 * counts) and locks its Start button until the study time they themselves chose
 * at onboarding. The lock is not a punishment and must never read as one. It
 * carries the founder's line — rest, you've done today's mission, tomorrow you
 * unlock day 2 and take the streak — because that IS the message: the plan is
 * finite, the day is over, and stopping is the correct move.
 *
 * Everything here is local-clock arithmetic. The gate can be inspected without
 * side effects (`tomorrowGate`) and advanced exactly once per day
 * (`recordDayComplete`), which is what stops the congratulation email firing
 * twice.
 */

import { getPlan } from "@/lib/acca-plan"
import { recordDayActive, shieldState } from "@/lib/acca-schedule"

const COMPLETE_KEY = "scholify-day-complete"

function ymd(d = new Date()): string {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

function tomorrowDate(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1)
}

/** "19:00" → minutes past midnight. Defaults to 19:00 on anything unparseable. */
function parseTime(value: string | null | undefined): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(value ?? "").trim())
  if (!m) return 19 * 60
  const h = Number(m[1])
  const mi = Number(m[2])
  if (!Number.isFinite(h) || !Number.isFinite(mi) || h > 23 || mi > 59) return 19 * 60
  return h * 60 + mi
}

interface CompleteRec {
  /** Local date the day was completed. */
  day: string
  /** ISO timestamp of the moment it flipped. */
  at: string
  /** Streak after this completion. */
  streak: number
  /** Congratulation email already requested for this day. */
  mailed?: boolean
}

type CompleteStore = Record<string, CompleteRec[]> // paperId → newest first

function read(): CompleteStore {
  try {
    const raw = window.localStorage.getItem(COMPLETE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as CompleteStore
  } catch {
    /* ignore */
  }
  return {}
}

function write(store: CompleteStore): void {
  try {
    window.localStorage.setItem(COMPLETE_KEY, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}

/** Today's completion record for a paper, or null if the day is still open. */
export function todayCompletion(paperId: string): CompleteRec | null {
  const today = ymd()
  return (read()[paperId] ?? []).find((r) => r.day === today) ?? null
}

/** Every completed day on this paper, newest first (capped at 120 rows). */
export function completionHistory(paperId: string): CompleteRec[] {
  return read()[paperId] ?? []
}

export interface DayCompleteResult {
  /** True only on the call that actually flipped the day. */
  firstTime: boolean
  streak: number
  /** True when this completion hit a milestone worth an email (3/7/14/30/…). */
  milestone: boolean
}

/**
 * Flip today to complete. Idempotent: the second call in a day reports
 * `firstTime: false` and changes nothing, which is what keeps the congratulation
 * email and the confetti to one each.
 */
export function recordDayComplete(paperId: string): DayCompleteResult {
  const existing = todayCompletion(paperId)
  if (existing) return { firstTime: false, streak: existing.streak, milestone: false }

  // Advance the streak through the shield scheme so missed days stay absorbed.
  const shield = recordDayActive(paperId)
  const store = read()
  const rows = store[paperId] ?? []
  rows.unshift({ day: ymd(), at: new Date().toISOString(), streak: shield.streak })
  store[paperId] = rows.slice(0, 120)
  write(store)

  return {
    firstTime: true,
    streak: shield.streak,
    milestone: isMilestone(shield.streak),
  }
}

/** Streaks worth telling someone about — the shape retention research keeps finding. */
export function isMilestone(streak: number): boolean {
  return streak === 2 || streak === 3 || streak === 7 || streak === 14 || streak === 21 || streak === 30 || (streak > 30 && streak % 30 === 0)
}

/** Mark the congratulation email as requested for today, so it is sent once. */
export function markCongratulationSent(paperId: string): void {
  const store = read()
  const rows = store[paperId] ?? []
  const today = ymd()
  const idx = rows.findIndex((r) => r.day === today)
  if (idx === -1) return
  rows[idx] = { ...rows[idx], mailed: true }
  store[paperId] = rows
  write(store)
}

export function congratulationSent(paperId: string): boolean {
  return Boolean(todayCompletion(paperId)?.mailed)
}

/* ── The gate ─────────────────────────────────────────────────────*/

export interface TomorrowGate {
  /** The moment tomorrow's session opens, in the learner's own clock. */
  unlocksAt: Date
  /** "07:00 tomorrow" / "in 9h 20m". */
  timeLabel: string
  countdownLabel: string
  secondsUntil: number
  /** False once the planned time has arrived. */
  locked: boolean
  /** Which day of the streak tomorrow will be. */
  tomorrowStreakDay: number
  /** The note under the lock. */
  restNote: string
  /** The line the learner reads when the lock has opened. */
  openNote: string
}

/**
 * Tomorrow's gate for a paper. Reads the study time the learner committed to at
 * onboarding — the same field the reminder emails are offset from, so the email
 * that says "you start in 30 minutes" and the button that unlocks agree.
 */
export function tomorrowGate(paperId: string, now = new Date()): TomorrowGate {
  const plan = getPlan(paperId)
  const minutes = parseTime(plan.studyTime)
  const t = tomorrowDate()
  const unlocksAt = new Date(t.getFullYear(), t.getMonth(), t.getDate(), Math.floor(minutes / 60), minutes % 60, 0, 0)
  const secondsUntil = Math.max(0, Math.round((unlocksAt.getTime() - now.getTime()) / 1000))
  const hh = `${Math.floor(minutes / 60)}`.padStart(2, "0")
  const mm = `${minutes % 60}`.padStart(2, "0")
  const hours = Math.floor(secondsUntil / 3600)
  const mins = Math.floor((secondsUntil % 3600) / 60)

  const streak = shieldState(paperId).streak
  const tomorrowStreakDay = streak + 1

  return {
    unlocksAt,
    timeLabel: `${hh}:${mm} tomorrow`,
    countdownLabel: secondsUntil <= 0 ? "open now" : hours >= 1 ? `in ${hours}h ${mins}m` : `in ${mins}m`,
    secondsUntil,
    locked: secondsUntil > 0,
    tomorrowStreakDay,
    restNote: `Please relax and take care of yourself — you've done today's mission. Tomorrow at ${hh}:${mm} this unlocks day ${tomorrowStreakDay} and your streak goes with it.`,
    openNote: `Day ${tomorrowStreakDay} is open. Same time, same plan — press start when you're ready.`,
  }
}
