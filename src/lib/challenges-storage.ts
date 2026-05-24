/*
 * Scholify — Weekly Challenges + XP / Level system.
 *
 * 100% local-first, same pattern as the other storage modules:
 *  • Three deterministic challenges per ISO week, seeded by (year, week)
 *    so every user sees the same set without a server cron.
 *  • Progress, XP, and level live in localStorage with a best-effort
 *    Supabase mirror (writes are fire-and-forget).
 *  • Event-relevance router so the Dashboard's handleComplete (and the
 *    Speaking / Quiz screens, once wired) can call one function and
 *    the right challenges advance automatically.
 *  • Subscribe helper for cross-tab + same-tab UI refresh.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { readPlan, readProgress } from "@/lib/scholify-data"

/* ── Types ───────────────────────────────────────────────────────────── */

export type ChallengeType =
  | "streak"
  | "session"
  | "time"
  | "speaking"
  | "quiz"
  | "bonus_same_time"
  | "bonus_morning"

export type ChallengeDifficulty = "easy" | "medium" | "hard"

export type ChallengeEvent =
  | { kind: "task_complete"; minutes?: number; sameTime?: boolean; morning?: boolean; newStreak: number }
  | { kind: "speaking_session"; count?: number }
  | { kind: "quiz_completed"; score: number; total: number }

export interface Challenge {
  /** Stable id: `${year}-W${week}-${type}`. */
  id: string
  weekNumber: number
  year: number
  title: string
  description: string
  type: ChallengeType
  difficulty: ChallengeDifficulty
  targetValue: number
  unit: string
  xpReward: number
}

export interface UserChallengeState {
  challengeId: string
  progress: number
  completed: boolean
  completedAt?: string
  xpEarned: number
  updatedAt: string
}

export interface XPState {
  totalXp: number
  level: number
  /** XP into the current level (re-derived; cached for speed). */
  xpInLevel: number
  /** XP needed to reach next level. */
  xpForNext: number
}

/* ── XP / Level math ─────────────────────────────────────────────────── */

export interface LevelDef {
  level: number
  name: string
  minXp: number
}

export const LEVELS: LevelDef[] = [
  { level: 1, name: "Novice", minXp: 0 },
  { level: 2, name: "Student", minXp: 100 },
  { level: 3, name: "Learner", minXp: 300 },
  { level: 4, name: "Scholar", minXp: 600 },
  { level: 5, name: "Expert", minXp: 1000 },
  { level: 6, name: "Master", minXp: 1500 },
  { level: 7, name: "Elite", minXp: 2500 },
  { level: 8, name: "Legend", minXp: 4000 },
]

export function levelFor(totalXp: number): LevelDef {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (totalXp >= l.minXp) current = l
    else break
  }
  return current
}

export function nextLevelFor(level: number): LevelDef | null {
  return LEVELS.find((l) => l.level === level + 1) ?? null
}

export function deriveXPState(totalXp: number): XPState {
  const current = levelFor(totalXp)
  const next = nextLevelFor(current.level)
  const xpInLevel = totalXp - current.minXp
  const xpForNext = next ? next.minXp - current.minXp : xpInLevel
  return { totalXp, level: current.level, xpInLevel, xpForNext }
}

/** XP awarded for each named scoring event. */
export const XP = {
  taskComplete: 10,
  perfectWeekBonus: 100,
  speakingSession: 25,
  quiz4of5: 30,
  quiz5of5: 50,
  firstTaskBonus: 50,
  streakMilestone(streak: number): number {
    return streak * 5
  },
} as const

/* ── Storage keys ────────────────────────────────────────────────────── */

const KEY_XP = "scholify-xp-total"
const KEY_FIRST_TASK = "scholify-xp-first-task-bonus"
const KEY_STREAK_MILES = "scholify-xp-streak-milestones"
const KEY_PROGRESS_PREFIX = "scholify-challenge-progress-"
const KEY_PAST_WEEKS = "scholify-challenge-past-weeks"
const KEY_TASK_TIMES = "scholify-task-completion-times"

const MILESTONE_STREAKS = [7, 14, 30, 60, 90, 180, 365]

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent("scholify-challenges-change", { detail: key }))
  } catch {
    /* ignore */
  }
}

/* ── ISO week helpers ────────────────────────────────────────────────── */

export function isoWeek(d: Date = new Date()): { year: number; week: number } {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
  return { year: date.getUTCFullYear(), week }
}

export function endOfIsoWeek(year: number, week: number): Date {
  // Find Monday of this ISO week, add 6 days, end-of-day UTC.
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = jan4.getUTCDay() || 7
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - (jan4Day - 1) + (week - 1) * 7)
  const sunday = new Date(monday)
  sunday.setUTCDate(sunday.getUTCDate() + 6)
  sunday.setUTCHours(23, 59, 59, 999)
  return sunday
}

export function daysUntilWeekEnd(): number {
  const { year, week } = isoWeek()
  const end = endOfIsoWeek(year, week).getTime()
  return Math.max(0, Math.ceil((end - Date.now()) / 86_400_000))
}

function progressKeyFor(year: number, week: number): string {
  return `${KEY_PROGRESS_PREFIX}${year}-W${week}`
}

/* ── Deterministic seeded RNG for stable weekly variety ──────────────── */

function seed(year: number, week: number): number {
  // Mulberry32 seeded by year + week.
  return (year * 1000 + week) >>> 0
}

function mulberry32(s: number): () => number {
  let t = s >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let x = t
    x = Math.imul(x ^ (x >>> 15), x | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rng: () => number, list: T[]): T {
  return list[Math.floor(rng() * list.length)]
}

/* ── Challenge generation ────────────────────────────────────────────── */

const DIFFICULTY_ORDER: ChallengeDifficulty[] = ["easy", "medium", "hard"]

/**
 * Returns the 3 challenges for the given ISO week, deterministic per
 * (year, week). The selection adapts to the active plan's daily_minutes
 * (so the "minutes" challenge stays roughly attainable) but the choices
 * themselves don't move once the week starts.
 */
export function generateChallenges(year: number, week: number, dailyMinutes = 20): Challenge[] {
  const rng = mulberry32(seed(year, week))

  // Always include a streak challenge — the headline metric of the app.
  const streakTarget = pick(rng, [5, 6, 7])
  const streakXP = streakTarget === 7 ? 150 : streakTarget === 6 ? 100 : 75

  const streak: Challenge = {
    id: `${year}-W${week}-streak`,
    weekNumber: week,
    year,
    title: `${streakTarget}-day streak this week`,
    description: `Complete a focused task on ${streakTarget} different days between Monday and Sunday.`,
    type: "streak",
    difficulty: streakTarget === 7 ? "hard" : streakTarget === 6 ? "medium" : "easy",
    targetValue: streakTarget,
    unit: "days",
    xpReward: streakXP,
  }

  // Pool of "challenge #2" — one of session / time / speaking.
  const secondaryType: "session" | "time" | "speaking" = pick(rng, ["session", "time", "speaking"])
  let secondary: Challenge
  if (secondaryType === "session") {
    const target = pick(rng, [5, 6, 7])
    secondary = {
      id: `${year}-W${week}-session`,
      weekNumber: week,
      year,
      title: `${target} study sessions this week`,
      description: `Mark ${target} daily tasks complete in any order.`,
      type: "session",
      difficulty: target === 7 ? "hard" : target === 6 ? "medium" : "easy",
      targetValue: target,
      unit: "sessions",
      xpReward: target === 7 ? 100 : target === 6 ? 80 : 60,
    }
  } else if (secondaryType === "time") {
    const multiplier = pick(rng, [5, 6, 7])
    const target = Math.round(dailyMinutes * multiplier)
    secondary = {
      id: `${year}-W${week}-time`,
      weekNumber: week,
      year,
      title: `Invest ${target} focused minutes`,
      description: `${dailyMinutes} min × ${multiplier} days. Quality minutes count more than calendar time.`,
      type: "time",
      difficulty: multiplier === 7 ? "hard" : multiplier === 6 ? "medium" : "easy",
      targetValue: target,
      unit: "min",
      xpReward: multiplier === 7 ? 120 : multiplier === 6 ? 100 : 80,
    }
  } else {
    const target = pick(rng, [1, 2, 3])
    secondary = {
      id: `${year}-W${week}-speaking`,
      weekNumber: week,
      year,
      title:
        target === 1
          ? "Record one speaking session"
          : `${target} speaking practice sessions`,
      description:
        "Open the Speaking Practice modal and finish a full recording — Claude will score it.",
      type: "speaking",
      difficulty: target === 3 ? "hard" : target === 2 ? "medium" : "easy",
      targetValue: target,
      unit: target === 1 ? "session" : "sessions",
      xpReward: target === 3 ? 200 : target === 2 ? 150 : 100,
    }
  }

  // Pool of "challenge #3" — quiz or a bonus.
  const tertiaryRoll = rng()
  let tertiary: Challenge
  if (tertiaryRoll < 0.55) {
    const score = pick(rng, [3, 4, 5])
    tertiary = {
      id: `${year}-W${week}-quiz`,
      weekNumber: week,
      year,
      title: `Score ${score}+ on the weekly quiz`,
      description: `Take the Sunday weekly quiz and hit at least ${score} out of 5 correct.`,
      type: "quiz",
      difficulty: score === 5 ? "hard" : score === 4 ? "medium" : "easy",
      targetValue: score,
      unit: "correct",
      xpReward: score === 5 ? 150 : score === 4 ? 100 : 50,
    }
  } else if (tertiaryRoll < 0.78) {
    tertiary = {
      id: `${year}-W${week}-bonus-same-time`,
      weekNumber: week,
      year,
      title: "Same time, 3 days in a row",
      description:
        "Complete your task within the same hour of the day for three consecutive days. Rhythm is the secret.",
      type: "bonus_same_time",
      difficulty: "hard",
      targetValue: 3,
      unit: "streak",
      xpReward: 200,
    }
  } else {
    tertiary = {
      id: `${year}-W${week}-bonus-morning`,
      weekNumber: week,
      year,
      title: "Five mornings before noon",
      description:
        "Finish your daily task before 12:00 on five different days this week. Sets the tone.",
      type: "bonus_morning",
      difficulty: "hard",
      targetValue: 5,
      unit: "mornings",
      xpReward: 200,
    }
  }

  return [streak, secondary, tertiary].map((c, i) => ({
    ...c,
    difficulty: c.difficulty || DIFFICULTY_ORDER[i],
  }))
}

export function getCurrentChallenges(): Challenge[] {
  const { year, week } = isoWeek()
  const plan = readPlan()
  return generateChallenges(year, week, Math.max(5, Number(plan.daily_minutes) || 20))
}

/* ── Progress state ──────────────────────────────────────────────────── */

export function readProgressMap(year: number, week: number): Record<string, UserChallengeState> {
  return readJSON<Record<string, UserChallengeState>>(progressKeyFor(year, week), {})
}

function writeProgressMap(year: number, week: number, map: Record<string, UserChallengeState>): void {
  writeJSON(progressKeyFor(year, week), map)
}

export function getUserState(challenge: Challenge): UserChallengeState {
  const map = readProgressMap(challenge.year, challenge.weekNumber)
  return (
    map[challenge.id] || {
      challengeId: challenge.id,
      progress: 0,
      completed: false,
      xpEarned: 0,
      updatedAt: new Date(0).toISOString(),
    }
  )
}

function setUserState(challenge: Challenge, next: UserChallengeState): void {
  const map = readProgressMap(challenge.year, challenge.weekNumber)
  map[challenge.id] = next
  writeProgressMap(challenge.year, challenge.weekNumber, map)
  if (isSupabaseConfigured) {
    // Best-effort mirror; tables may not exist yet.
    supabase
      .from("user_challenges")
      .upsert(
        {
          challenge_id: challenge.id,
          progress: next.progress,
          completed: next.completed,
          completed_at: next.completedAt,
          xp_earned: next.xpEarned,
        },
        { onConflict: "user_id,challenge_id" },
      )
      .then(
        () => {},
        () => {},
      )
  }
}

/* ── XP state ────────────────────────────────────────────────────────── */

export function readTotalXP(): number {
  return Math.max(0, Number(readJSON<number>(KEY_XP, 0)) || 0)
}

export function readXPState(): XPState {
  return deriveXPState(readTotalXP())
}

/**
 * Adds XP and returns the new state along with whether the user just
 * leveled up. Callers can use the `leveledUp` flag to fire the overlay
 * once per level change.
 */
export function addXP(amount: number): {
  before: XPState
  after: XPState
  leveledUp: boolean
  newLevel?: LevelDef
} {
  const before = readXPState()
  const next = Math.max(0, before.totalXp + Math.round(amount))
  writeJSON(KEY_XP, next)
  const after = deriveXPState(next)
  const leveledUp = after.level > before.level
  return { before, after, leveledUp, newLevel: leveledUp ? levelFor(next) : undefined }
}

/* ── Event router ────────────────────────────────────────────────────── */

/**
 * Returns true when this event is relevant to the challenge.
 * "Relevance" is a small switch keyed on type — the actual increment
 * size happens inside `applyEvent`.
 */
function isChallengeRelevant(challenge: Challenge, event: ChallengeEvent): boolean {
  if (event.kind === "task_complete") {
    return (
      challenge.type === "streak" ||
      challenge.type === "session" ||
      challenge.type === "time" ||
      challenge.type === "bonus_same_time" ||
      challenge.type === "bonus_morning"
    )
  }
  if (event.kind === "speaking_session") return challenge.type === "speaking"
  if (event.kind === "quiz_completed") return challenge.type === "quiz"
  return false
}

/** Result of `applyEvent`. */
export interface ApplyEventResult {
  xpGained: number
  leveledUp: boolean
  newLevel?: LevelDef
  completedChallenges: Challenge[]
}

/**
 * Single source of truth for advancing challenge progress and awarding
 * XP. Called from Dashboard's handleComplete (task_complete event) and
 * — once wired — from SpeakingPractice + WeeklyQuiz.
 */
export function applyEvent(event: ChallengeEvent): ApplyEventResult {
  let xpGained = 0

  if (event.kind === "task_complete") {
    xpGained += XP.taskComplete
    // First-ever task bonus.
    if (readJSON<boolean>(KEY_FIRST_TASK, false) === false) {
      xpGained += XP.firstTaskBonus
      writeJSON(KEY_FIRST_TASK, true)
    }
    // Streak milestone bonus (idempotent via ledger).
    if (MILESTONE_STREAKS.includes(event.newStreak)) {
      const seen = readJSON<Record<string, boolean>>(KEY_STREAK_MILES, {})
      const k = String(event.newStreak)
      if (!seen[k]) {
        seen[k] = true
        writeJSON(KEY_STREAK_MILES, seen)
        xpGained += XP.streakMilestone(event.newStreak)
      }
    }
  } else if (event.kind === "speaking_session") {
    xpGained += XP.speakingSession
  } else if (event.kind === "quiz_completed") {
    if (event.score >= 5) xpGained += XP.quiz5of5
    else if (event.score >= 4) xpGained += XP.quiz4of5
  }

  // Progress every relevant active challenge.
  const challenges = getCurrentChallenges()
  const completedChallenges: Challenge[] = []
  for (const c of challenges) {
    if (!isChallengeRelevant(c, event)) continue
    const state = getUserState(c)
    if (state.completed) continue

    let next = state.progress
    if (event.kind === "task_complete") {
      if (c.type === "streak" || c.type === "session") next += 1
      else if (c.type === "time") next += Math.max(1, Math.round(event.minutes || 0))
      else if (c.type === "bonus_same_time" && event.sameTime) next += 1
      else if (c.type === "bonus_morning" && event.morning) next += 1
    } else if (event.kind === "speaking_session") {
      next += Math.max(1, event.count || 1)
    } else if (event.kind === "quiz_completed") {
      // "Score X+ on the quiz" — completed if score ≥ target, in one go.
      next = Math.max(state.progress, event.score)
    }

    const completed = next >= c.targetValue
    setUserState(c, {
      challengeId: c.id,
      progress: Math.min(next, c.targetValue),
      completed,
      completedAt: completed ? new Date().toISOString() : state.completedAt,
      xpEarned: completed ? c.xpReward : state.xpEarned,
      updatedAt: new Date().toISOString(),
    })

    if (completed) {
      xpGained += c.xpReward
      completedChallenges.push(c)
    }
  }

  // Perfect-week bonus: if all challenges of this week are completed.
  if (completedChallenges.length > 0) {
    const map = readProgressMap(challenges[0].year, challenges[0].weekNumber)
    const allDone = challenges.every((c) => map[c.id]?.completed)
    if (allDone) {
      const bonusKey = `bonus:${challenges[0].year}-W${challenges[0].weekNumber}`
      const seenBonus = readJSON<Record<string, boolean>>("scholify-perfect-week-bonus", {})
      if (!seenBonus[bonusKey]) {
        seenBonus[bonusKey] = true
        writeJSON("scholify-perfect-week-bonus", seenBonus)
        xpGained += XP.perfectWeekBonus
      }
    }
  }

  const { after, leveledUp, newLevel } = addXP(xpGained)
  // Mark this week as having activity so the "past challenges" history
  // can later list it.
  if (event.kind !== "speaking_session") rememberPastWeek(challenges[0].year, challenges[0].weekNumber)
  void after // returned via separate call site if needed
  return { xpGained, leveledUp, newLevel, completedChallenges }
}

/* ── Task time tracking (for "same time" / "morning" bonuses) ────────── */

export function recordTaskCompletionTime(date: Date = new Date()): {
  sameTime: boolean
  morning: boolean
} {
  const isoDay = date.toISOString().slice(0, 10)
  const hour = date.getHours()
  const morning = hour < 12

  const map = readJSON<Record<string, number>>(KEY_TASK_TIMES, {})
  // Reject duplicates for the same day.
  if (map[isoDay] !== undefined) {
    // sameTime is computed over the last 3 entries' hours.
    return { sameTime: false, morning }
  }
  map[isoDay] = hour
  writeJSON(KEY_TASK_TIMES, map)

  // Compute sameTime by looking at the last 3 days (including today).
  const last3 = Object.keys(map)
    .sort()
    .slice(-3)
    .map((k) => map[k])
  const sameTime =
    last3.length === 3 && Math.abs(last3[0] - last3[1]) <= 1 && Math.abs(last3[1] - last3[2]) <= 1

  return { sameTime, morning }
}

/* ── Past challenges history ─────────────────────────────────────────── */

interface PastWeekKey {
  year: number
  week: number
}

function rememberPastWeek(year: number, week: number): void {
  const list = readJSON<PastWeekKey[]>(KEY_PAST_WEEKS, [])
  if (!list.some((p) => p.year === year && p.week === week)) {
    list.push({ year, week })
    writeJSON(KEY_PAST_WEEKS, list)
  }
}

export interface PastWeekSummary {
  year: number
  week: number
  challenges: Challenge[]
  states: Record<string, UserChallengeState>
  completed: number
  total: number
  xpEarned: number
}

export function readPastWeeks(limit = 4): PastWeekSummary[] {
  const now = isoWeek()
  const known = readJSON<PastWeekKey[]>(KEY_PAST_WEEKS, [])
  // Synthesize the last `limit` weeks regardless of activity so the
  // history list isn't empty for new users.
  const synthesized: PastWeekKey[] = []
  for (let i = 1; i <= limit + 4; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i * 7)
    const wk = isoWeek(d)
    if (wk.year === now.year && wk.week === now.week) continue
    synthesized.push(wk)
  }
  const map = new Map<string, PastWeekKey>()
  for (const w of [...known, ...synthesized]) map.set(`${w.year}-${w.week}`, w)

  const all = Array.from(map.values())
    .filter((w) => w.year !== now.year || w.week !== now.week)
    .sort((a, b) => (b.year - a.year) * 100 + (b.week - a.week))
    .slice(0, limit)

  return all.map((w) => {
    const challenges = generateChallenges(w.year, w.week)
    const states = readProgressMap(w.year, w.week)
    let completed = 0
    let xpEarned = 0
    for (const c of challenges) {
      const s = states[c.id]
      if (s?.completed) {
        completed++
        xpEarned += s.xpEarned || c.xpReward
      }
    }
    return {
      year: w.year,
      week: w.week,
      challenges,
      states,
      completed,
      total: challenges.length,
      xpEarned,
    }
  })
}

/* ── Subscribe ───────────────────────────────────────────────────────── */

export function subscribeChallenges(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const fn = () => handler()
  window.addEventListener("scholify-challenges-change", fn)
  window.addEventListener("storage", fn)
  return () => {
    window.removeEventListener("scholify-challenges-change", fn)
    window.removeEventListener("storage", fn)
  }
}

/* ── Misc helpers used by the UI ─────────────────────────────────────── */

export function totalCompletedAcrossWeeks(): { completed: number; total: number } {
  const past = readPastWeeks(8)
  const current = getCurrentChallenges()
  const currentStates = readProgressMap(current[0].year, current[0].weekNumber)
  let completed = past.reduce((s, w) => s + w.completed, 0)
  let total = past.reduce((s, w) => s + w.total, 0)
  for (const c of current) {
    total += 1
    if (currentStates[c.id]?.completed) completed += 1
  }
  return { completed, total }
}

/** Quick helper for the dashboard widget — three booleans + progress. */
export function readCurrentSummary(): {
  challenges: Challenge[]
  states: Record<string, UserChallengeState>
  daysLeft: number
} {
  const challenges = getCurrentChallenges()
  const states = readProgressMap(challenges[0].year, challenges[0].weekNumber)
  return { challenges, states, daysLeft: daysUntilWeekEnd() }
}

/** Suppress unused-var lint for readProgress in some code paths. */
void readProgress
