/*
 * Scholify — ACCA exam-prep engine.
 *
 * The product's core loop: a learner picks a paper (FA, FR, …), practises real
 * exam-style questions, gets instant marking + explanation, and the engine
 * tracks accuracy per syllabus area to surface weak spots and estimate exam
 * readiness. Content lives in acca-content.ts; this file is types + logic.
 *
 * Design notes:
 *  - localStorage-first (matches the rest of the app). No backend dependency.
 *  - Content-agnostic: the same engine drives any paper, so adding CIMA/CFA
 *    later is just more data, not more code.
 *  - Questions are auto-markable objective tests (MCQ / multi-response / number).
 *    Written constructed-response marking (the "AI Examiner") is a separate,
 *    AI-backed flow layered on top later.
 */

import type { AccaPaper, AccaQuestion, Difficulty } from "@/lib/acca-content"
import { QUESTIONS } from "@/lib/acca-content"
import { ALL_PAPERS } from "@/lib/acca-qualification"

export type { AccaPaper, AccaQuestion } from "@/lib/acca-content"

/* ── Content lookup ───────────────────────────────────────────── */

/** Every ACCA paper (full qualification), in official order. */
export function getPapers(): AccaPaper[] {
  return ALL_PAPERS
}

export function getPaper(paperId: string): AccaPaper | undefined {
  return ALL_PAPERS.find((p) => p.id === paperId)
}

/** True when the paper has a curated seed question bank (vs AI-generated only). */
export function hasCuratedContent(paperId: string): boolean {
  return getQuestions(paperId).length > 0
}

export function getQuestions(paperId: string): AccaQuestion[] {
  return QUESTIONS.filter((q) => q.paper === paperId)
}

export function getSyllabusAreas(paperId: string): string[] {
  const p = getPaper(paperId)
  return p ? p.areas.map((a) => a.code) : []
}

/* ── Grading ──────────────────────────────────────────────────── */

export interface GradeResult {
  correct: boolean
  /** Human-readable correct answer, for the review card. */
  correctText: string
}

/** True numeric compare with a small tolerance (handles rounding / decimals). */
function numbersMatch(a: number, b: number, tolerance = 0.01): boolean {
  return Math.abs(a - b) <= tolerance
}

/**
 * Grade a learner response against a question. `response` is the selected
 * option index (mcq), a sorted list of indices (multi), or a number (number).
 */
export function gradeQuestion(q: AccaQuestion, response: number | number[]): GradeResult {
  if (q.type === "number") {
    const val = typeof response === "number" ? response : NaN
    return {
      correct: !Number.isNaN(val) && numbersMatch(val, q.numericAnswer ?? NaN, q.tolerance ?? 0.01),
      correctText: `${q.numericAnswer}${q.unit ? " " + q.unit : ""}`,
    }
  }

  if (q.type === "multi") {
    const picked = Array.isArray(response) ? [...response].sort((a, b) => a - b) : []
    const want = (Array.isArray(q.correct) ? [...q.correct] : []).sort((a, b) => a - b)
    const correct = picked.length === want.length && picked.every((v, i) => v === want[i])
    return { correct, correctText: want.map((i) => q.options?.[i]).filter(Boolean).join(", ") }
  }

  // mcq
  const picked = typeof response === "number" ? response : -1
  const want = Array.isArray(q.correct) ? q.correct[0] : q.correct ?? -1
  return { correct: picked === want, correctText: q.options?.[want] ?? "" }
}

/* ── Session building ─────────────────────────────────────────── */

export interface SessionOptions {
  /** Restrict to a single syllabus area code (e.g. "D"). */
  area?: string
  /** Prioritise questions from the learner's weakest areas. */
  weakFirst?: boolean
}

/** Deterministic-ish shuffle seeded by a rotating counter (no Math.random ban issues in tests). */
function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed || 1
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Build a practice session of up to `count` questions for a paper. When
 * `weakFirst` is set, areas with the lowest accuracy are drawn first.
 */
export function buildSession(
  paperId: string,
  count = 10,
  opts: SessionOptions = {},
  seed = 1,
): AccaQuestion[] {
  let pool = getQuestions(paperId)
  if (opts.area) pool = pool.filter((q) => q.area === opts.area)
  if (pool.length === 0) return []

  if (opts.weakFirst) {
    const stats = getPaperStats(paperId)
    const areaAcc = new Map(stats.areas.map((a) => [a.code, a.accuracy]))
    pool = [...pool].sort(
      (a, b) => (areaAcc.get(a.area) ?? 0) - (areaAcc.get(b.area) ?? 0),
    )
    return pool.slice(0, count)
  }

  return shuffle(pool, seed).slice(0, count)
}

/**
 * Build an ADAPTIVE session — the loop's engine. Instead of random, it ranks
 * every question by how useful it is to this student right now:
 *  - weak areas first (low per-area accuracy; unseen areas count as moderately
 *    weak so coverage grows),
 *  - difficulty matched to the area's competence (build easy where they're lost,
 *    stretch hard where they're strong — the zone of proximal development),
 *  - unseen > previously-wrong > already-correct (reinforce, don't re-quiz mastery).
 * A small seeded jitter keeps repeat sessions from being identical.
 */
export function buildAdaptiveSession(paperId: string, count = 8, seed = Date.now()): AccaQuestion[] {
  const pool = getQuestions(paperId)
  if (pool.length === 0) return []

  const stats = getPaperStats(paperId)
  const areaInfo = new Map(stats.areas.map((a) => [a.code, { acc: a.accuracy, seen: a.seen }]))
  const qStats = getQuestionStats(paperId)

  function targetDifficulty(acc: number): Difficulty {
    if (acc < 0.45) return "easy"
    if (acc < 0.7) return "medium"
    return "hard"
  }

  function priority(q: AccaQuestion): number {
    const a = areaInfo.get(q.area) ?? { acc: 0.5, seen: 0 }
    const areaWeakness = a.seen === 0 ? 0.6 : 1 - a.acc // 0..1, higher = drill this
    const diffMatch = q.difficulty === targetDifficulty(a.acc) ? 1 : 0.5
    const qs = qStats[q.id]
    const familiarity = !qs || qs.attempts === 0 ? 1 : qs.correct < qs.attempts ? 0.8 : 0.25
    return areaWeakness * 2 + diffMatch + familiarity
  }

  let s = seed || 1
  const scored = pool.map((q) => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return { q, p: priority(q) + (s % 100) / 1000 }
  })
  scored.sort((a, b) => b.p - a.p)
  return scored.slice(0, count).map((x) => x.q)
}

/* ── Progress (localStorage-first) ────────────────────────────── */

const KEY_PROGRESS = "scholify-acca-progress"

export interface AreaStat {
  code: string
  label: string
  seen: number
  correct: number
  /** 0–1 accuracy; 0 when unseen. */
  accuracy: number
}

export interface PaperStats {
  paperId: string
  answered: number
  correct: number
  accuracy: number
  /** Distinct questions attempted / total available. */
  coverage: number
  /** 0–100 estimated readiness (accuracy × coverage weighting). */
  readiness: number
  areas: AreaStat[]
}

interface RawProgress {
  /** paperId → { questionId → { attempts, correct } } */
  questions: Record<string, Record<string, { attempts: number; correct: number }>>
  /** paperId → { areaCode → { seen, correct } } */
  areas: Record<string, Record<string, { seen: number; correct: number }>>
  totalAnswered: number
  totalCorrect: number
  lastStudied: string | null
  /** yyyy-MM-dd list of days a session was completed (last ~120). */
  history: string[]
  streak: number
  /** yyyy-MM-dd → questions answered that day. */
  daily: Record<string, number>
  /** yyyy-MM-dd → questions answered CORRECTLY that day (subset of daily). */
  dailyCorrect: Record<string, number>
}

const EMPTY: RawProgress = {
  questions: {},
  areas: {},
  totalAnswered: 0,
  totalCorrect: 0,
  lastStudied: null,
  history: [],
  streak: 0,
  daily: {},
  dailyCorrect: {},
}

function readRaw(): RawProgress {
  try {
    const raw = window.localStorage.getItem(KEY_PROGRESS)
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Partial<RawProgress>) }
  } catch {
    /* ignore */
  }
  return structuredCloneSafe(EMPTY)
}

function structuredCloneSafe<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T
}

function writeRaw(p: RawProgress): void {
  try {
    window.localStorage.setItem(KEY_PROGRESS, JSON.stringify(p))
  } catch {
    /* storage unavailable — non-fatal */
  }
}

function todayStr(): string {
  const d = new Date()
  const m = `${d.getMonth() + 1}`.padStart(2, "0")
  const day = `${d.getDate()}`.padStart(2, "0")
  return `${d.getFullYear()}-${m}-${day}`
}

/** Record the outcome of a single answered question and persist. */
export function recordAnswer(paperId: string, q: AccaQuestion, correct: boolean): void {
  const p = readRaw()

  const qByPaper = (p.questions[paperId] ??= {})
  const qs = (qByPaper[q.id] ??= { attempts: 0, correct: 0 })
  qs.attempts += 1
  if (correct) qs.correct += 1

  const aByPaper = (p.areas[paperId] ??= {})
  const ar = (aByPaper[q.area] ??= { seen: 0, correct: 0 })
  ar.seen += 1
  if (correct) ar.correct += 1

  p.totalAnswered += 1
  if (correct) p.totalCorrect += 1

  const today = todayStr()
  if (!p.daily) p.daily = {}
  p.daily[today] = (p.daily[today] ?? 0) + 1
  if (!p.dailyCorrect) p.dailyCorrect = {}
  if (correct) p.dailyCorrect[today] = (p.dailyCorrect[today] ?? 0) + 1
  // keep the maps small — drop entries older than ~120 days
  const keys = Object.keys(p.daily)
  if (keys.length > 140) {
    for (const k of keys.sort().slice(0, keys.length - 120)) {
      delete p.daily[k]
      delete p.dailyCorrect[k]
    }
  }
  if (p.lastStudied !== today) {
    if (!p.history.includes(today)) p.history = [...p.history, today].slice(-120)
    // streak: consecutive calendar days
    if (p.lastStudied) {
      const prev = new Date(p.lastStudied)
      const gapDays = Math.round((new Date(today).getTime() - prev.getTime()) / 86400000)
      p.streak = gapDays === 1 ? p.streak + 1 : gapDays <= 0 ? p.streak : 1
    } else {
      p.streak = 1
    }
    p.lastStudied = today
  }

  writeRaw(p)
}

/** Compute derived stats for a paper (accuracy, coverage, readiness, per-area). */
export function getPaperStats(paperId: string): PaperStats {
  const p = readRaw()
  const paper = getPaper(paperId)
  const areasMeta = paper?.areas ?? []
  const areaRaw = p.areas[paperId] ?? {}
  const qRaw = p.questions[paperId] ?? {}

  const areas: AreaStat[] = areasMeta.map((a) => {
    const r = areaRaw[a.code] ?? { seen: 0, correct: 0 }
    return {
      code: a.code,
      label: a.label,
      seen: r.seen,
      correct: r.correct,
      accuracy: r.seen > 0 ? r.correct / r.seen : 0,
    }
  })

  let answered = 0
  let correct = 0
  for (const s of Object.values(areaRaw)) {
    answered += s.seen
    correct += s.correct
  }
  const accuracy = answered > 0 ? correct / answered : 0

  const totalQuestions = getQuestions(paperId).length
  // Count only attempts against the seed bank; AI-generated question ids
  // (prefixed "gen-") aren't part of coverage and must not inflate it past 1.
  const distinctAttempted = Object.keys(qRaw).filter((id) => !id.startsWith("gen-")).length
  const coverage = totalQuestions > 0 ? Math.min(1, distinctAttempted / totalQuestions) : 0

  // Readiness: you must both know the material (accuracy) AND have covered it
  // (coverage). Weighted so a high score with thin coverage can't fake ready.
  const readiness = Math.round(accuracy * 70 + coverage * 30)

  return { paperId, answered, correct, accuracy, coverage, readiness, areas }
}

/** Per-question {attempts, correct} for a paper — powers adaptive selection. */
export function getQuestionStats(paperId: string): Record<string, { attempts: number; correct: number }> {
  return readRaw().questions[paperId] ?? {}
}

export interface OverallProgress {
  totalAnswered: number
  totalCorrect: number
  accuracy: number
  streak: number
  lastStudied: string | null
  history: string[]
}

export function getOverallProgress(): OverallProgress {
  const p = readRaw()
  return {
    totalAnswered: p.totalAnswered,
    totalCorrect: p.totalCorrect,
    accuracy: p.totalAnswered > 0 ? p.totalCorrect / p.totalAnswered : 0,
    streak: p.streak,
    lastStudied: p.lastStudied,
    history: p.history,
  }
}

export function clearAccaProgress(): void {
  try {
    window.localStorage.removeItem(KEY_PROGRESS)
  } catch {
    /* ignore */
  }
}

/* ── Sync surface (used by acca-cloud for server persistence) ──── */

/** Opaque progress snapshot — persisted verbatim to the server. */
export type AccaProgressSnapshot = RawProgress

/** The full local progress blob, for pushing to the cloud. */
export function snapshotProgress(): AccaProgressSnapshot {
  return readRaw()
}

/** Overwrite local progress from a cloud snapshot (hydrate a fresh device). */
export function restoreProgress(raw: Partial<AccaProgressSnapshot>): void {
  writeRaw({ ...EMPTY, ...raw })
}

/** Total questions answered — a monotonic signal for safe cross-device merges. */
export function progressAnsweredCount(): number {
  return readRaw().totalAnswered
}

/* ── Daily goal + today ───────────────────────────────────────── */

const KEY_DAILY_GOAL = "scholify-acca-daily-goal"
const DEFAULT_DAILY_GOAL = 15

export function getDailyGoal(): number {
  try {
    const raw = window.localStorage.getItem(KEY_DAILY_GOAL)
    const n = raw ? parseInt(raw, 10) : NaN
    if (!Number.isNaN(n) && n > 0) return n
  } catch {
    /* ignore */
  }
  return DEFAULT_DAILY_GOAL
}

export function setDailyGoal(n: number): void {
  try {
    window.localStorage.setItem(KEY_DAILY_GOAL, String(Math.max(1, Math.min(100, Math.round(n) || DEFAULT_DAILY_GOAL))))
  } catch {
    /* ignore */
  }
}

export interface TodayStats {
  answered: number
  goal: number
  /** 0–1 progress toward the daily goal. */
  progress: number
  streak: number
  goalMet: boolean
}

export function getTodayStats(): TodayStats {
  const p = readRaw()
  const answered = p.daily?.[todayStr()] ?? 0
  const goal = getDailyGoal()
  return {
    answered,
    goal,
    progress: Math.min(1, goal > 0 ? answered / goal : 0),
    streak: p.streak,
    goalMet: answered >= goal,
  }
}

/* ── Mock exam history ────────────────────────────────────────── */

const KEY_MOCKS = "scholify-acca-mocks"

export interface MockResult {
  date: string
  correct: number
  total: number
  percent: number
}

type MockStore = Record<string, MockResult[]>

function readMocks(): MockStore {
  try {
    const raw = window.localStorage.getItem(KEY_MOCKS)
    if (raw) return JSON.parse(raw) as MockStore
  } catch {
    /* ignore */
  }
  return {}
}

/** Record a completed mock for a paper (keeps the last 20). */
export function recordMock(paperId: string, correct: number, total: number): void {
  if (total <= 0) return
  const store = readMocks()
  const list = store[paperId] ?? []
  list.push({ date: todayStr(), correct, total, percent: Math.round((correct / total) * 100) })
  store[paperId] = list.slice(-20)
  try {
    window.localStorage.setItem(KEY_MOCKS, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}

/** Mock attempts for a paper, most recent first. */
export function getMockHistory(paperId: string): MockResult[] {
  return [...(readMocks()[paperId] ?? [])].reverse()
}

/** Per-day activity for the last `days` days (oldest → newest). */
export interface DayActivity {
  date: string
  count: number
  /** Correct answers that day — 0 for days recorded before per-day accuracy tracking. */
  correct: number
}

export function getDailyActivity(days = 35): DayActivity[] {
  const p = readRaw()
  const daily = p.daily ?? {}
  const dailyCorrect = p.dailyCorrect ?? {}
  const out: DayActivity[] = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const key = `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
    out.push({ date: key, count: daily[key] ?? 0, correct: dailyCorrect[key] ?? 0 })
  }
  return out
}

/* ── Week-over-week comparison (feeds the dashboard delta chips) ── */

export interface WeekComparison {
  /** Questions answered in the last 7 days / the 7 days before that. */
  answered: number
  prevAnswered: number
  /** Signed % change in volume vs the prior week — null when the prior week is empty. */
  answeredDeltaPct: number | null
  /** Accuracy (0–100) over the last 7 days — null when nothing was answered. */
  accuracy: number | null
  /** Signed accuracy change in percentage points vs the prior week — null without both windows. */
  accuracyDeltaPts: number | null
  /** Days studied out of the last 7. */
  activeDays: number
}

export function getWeekComparison(): WeekComparison {
  const days = getDailyActivity(14)
  const prev = days.slice(0, 7)
  const cur = days.slice(7)
  const sum = (xs: DayActivity[], f: (d: DayActivity) => number) => xs.reduce((a, d) => a + f(d), 0)
  const answered = sum(cur, (d) => d.count)
  const prevAnswered = sum(prev, (d) => d.count)
  const correct = sum(cur, (d) => d.correct)
  const prevCorrect = sum(prev, (d) => d.correct)
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : null
  const prevAccuracy = prevAnswered > 0 ? Math.round((prevCorrect / prevAnswered) * 100) : null
  return {
    answered,
    prevAnswered,
    answeredDeltaPct: prevAnswered > 0 ? Math.round(((answered - prevAnswered) / prevAnswered) * 100) : null,
    accuracy,
    accuracyDeltaPts: accuracy != null && prevAccuracy != null ? accuracy - prevAccuracy : null,
    activeDays: cur.filter((d) => d.count > 0).length,
  }
}
