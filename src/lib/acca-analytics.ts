/*
 * Scholify — analytics instrumentation for the 4-section dashboard
 * (Progress · Learning · Study · Exam). What gets measured gets done.
 *
 * New signals captured here, all localStorage-first like the rest of the
 * ACCA engine, all starting from zero and degrading to honest empty states:
 *
 *   • Pass-probability history  → Pass Momentum™ (Δ pts vs last week)
 *   • Per-question timing       → pace vs the 90s exam budget + study time
 *   • Mistake tags              → where the marks were lost, by cause
 *   • Confidence marks          → calibration (how you feel vs how you score)
 *
 * Plus derived reads over existing stores: mastery score, learning velocity
 * (masteredAt timestamps), and forgetting risk (stale mastered topics).
 */

import { getPaper, getPaperStats } from "@/lib/acca"
import { getStudyPath, getTopicResults, TOPIC_PASS } from "@/lib/acca-topics"
import { passProbability } from "@/lib/acca-loop"

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

function readStore<T>(key: string, empty: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw) return { ...empty, ...(JSON.parse(raw) as T) }
  } catch {
    /* ignore */
  }
  return empty
}

function writeStore(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/* ── Pass-probability history → Pass Momentum™ ────────────────── */

const KEY_PROB = "scholify-acca-prob-history"

type ProbHistory = Record<string, Record<string, number>> // paperId → date → prob

/** Snapshot today's pass probability (call on overview load / results). */
export function snapshotProbability(paperId: string): void {
  const prob = passProbability(paperId)
  if (prob === null) return
  const store = readStore<ProbHistory>(KEY_PROB, {})
  const byDate = { ...(store[paperId] ?? {}), [todayStr()]: prob }
  // keep ~90 days
  const keys = Object.keys(byDate).sort()
  for (const k of keys.slice(0, Math.max(0, keys.length - 90))) delete byDate[k]
  store[paperId] = byDate
  writeStore(KEY_PROB, store)
}

export interface Momentum {
  current: number
  /** Signed change in points vs ~a week ago; null until 2+ days of history. */
  deltaPts: number | null
  /** Daily series for the sparkline (oldest → newest, gaps carried forward). */
  series: { date: string; prob: number }[]
}

export function probabilityMomentum(paperId: string, days = 14): Momentum | null {
  const current = passProbability(paperId)
  if (current === null) return null
  const byDate = readStore<ProbHistory>(KEY_PROB, {})[paperId] ?? {}
  const dates = Object.keys(byDate).sort()

  // series: carry the last known value forward across gaps
  const series: { date: string; prob: number }[] = []
  const now = new Date()
  let last: number | null = null
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const key = `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
    if (byDate[key] != null) last = byDate[key]
    if (last != null) series.push({ date: key, prob: last })
  }

  // momentum: compare with the closest snapshot ≥5 days old
  const cutoff = new Date(now)
  cutoff.setDate(now.getDate() - 5)
  const cutoffKey = `${cutoff.getFullYear()}-${`${cutoff.getMonth() + 1}`.padStart(2, "0")}-${`${cutoff.getDate()}`.padStart(2, "0")}`
  const old = [...dates].reverse().find((d) => d <= cutoffKey)
  return {
    current,
    deltaPts: old != null ? current - byDate[old] : null,
    series,
  }
}

/* ── Per-question timing → pace + study time ──────────────────── */

const KEY_PACE = "scholify-acca-pace"

/** The exam budget per objective-test question, in seconds. */
export const QUESTION_BUDGET_SEC = 90
const RUSHED_SEC = 30

interface PaceStore {
  [paperId: string]: {
    count: number
    totalSec: number
    rushed: number
    onpace: number
    overtime: number
    /** yyyy-MM-dd → study seconds that day (all modes). */
    daily: Record<string, number>
  }
}

export function recordAnswerTiming(paperId: string, seconds: number): void {
  const sec = Math.max(1, Math.min(600, Math.round(seconds)))
  const store = readStore<PaceStore>(KEY_PACE, {})
  const p = store[paperId] ?? { count: 0, totalSec: 0, rushed: 0, onpace: 0, overtime: 0, daily: {} }
  p.count += 1
  p.totalSec += sec
  if (sec < RUSHED_SEC) p.rushed += 1
  else if (sec <= QUESTION_BUDGET_SEC) p.onpace += 1
  else p.overtime += 1
  p.daily = p.daily ?? {}
  p.daily[todayStr()] = (p.daily[todayStr()] ?? 0) + sec
  const keys = Object.keys(p.daily).sort()
  for (const k of keys.slice(0, Math.max(0, keys.length - 60))) delete p.daily[k]
  store[paperId] = p
  writeStore(KEY_PACE, store)
}

export interface Pace {
  avgSec: number
  count: number
  rushed: number
  onpace: number
  overtime: number
}

export function getPace(paperId: string): Pace | null {
  const p = readStore<PaceStore>(KEY_PACE, {})[paperId]
  if (!p || p.count === 0) return null
  return { avgSec: Math.round(p.totalSec / p.count), count: p.count, rushed: p.rushed, onpace: p.onpace, overtime: p.overtime }
}

/** Minutes studied today on a paper (from answer timing). */
export function studyMinutesToday(paperId: string): number {
  const p = readStore<PaceStore>(KEY_PACE, {})[paperId]
  return p ? Math.round((p.daily?.[todayStr()] ?? 0) / 60) : 0
}

/* ── Mistake analysis — where the marks were lost, by cause ────── */

const KEY_MISTAKES = "scholify-acca-mistakes"

export type MistakeTag = "knowledge" | "misread" | "time" | "slip"

export const MISTAKE_LABELS: Record<MistakeTag, string> = {
  knowledge: "Knowledge gaps",
  misread: "Misread the question",
  time: "Ran out of time",
  slip: "Calculation slips",
}

type MistakeStore = Record<string, Partial<Record<MistakeTag, number>>>

export function recordMistake(paperId: string, tag: MistakeTag, n = 1): void {
  const store = readStore<MistakeStore>(KEY_MISTAKES, {})
  const p = store[paperId] ?? {}
  p[tag] = (p[tag] ?? 0) + n
  store[paperId] = p
  writeStore(KEY_MISTAKES, store)
}

export interface MistakeRow {
  tag: MistakeTag
  label: string
  count: number
  /** Share of all tagged mistakes, 0–100. */
  share: number
}

export function getMistakes(paperId: string): MistakeRow[] {
  const p = readStore<MistakeStore>(KEY_MISTAKES, {})[paperId] ?? {}
  const total = Object.values(p).reduce((s, n) => s + (n ?? 0), 0)
  if (total === 0) return []
  return (Object.keys(MISTAKE_LABELS) as MistakeTag[])
    .map((tag) => ({ tag, label: MISTAKE_LABELS[tag], count: p[tag] ?? 0, share: Math.round(((p[tag] ?? 0) / total) * 100) }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
}

/* ── Confidence calibration — how you feel vs how you score ────── */

const KEY_CONF = "scholify-acca-confidence"

interface ConfStore {
  [paperId: string]: { sureSeen: number; sureCorrect: number; unsureSeen: number; unsureCorrect: number }
}

export function recordConfidence(paperId: string, sure: boolean, correct: boolean): void {
  const store = readStore<ConfStore>(KEY_CONF, {})
  const p = store[paperId] ?? { sureSeen: 0, sureCorrect: 0, unsureSeen: 0, unsureCorrect: 0 }
  if (sure) {
    p.sureSeen += 1
    if (correct) p.sureCorrect += 1
  } else {
    p.unsureSeen += 1
    if (correct) p.unsureCorrect += 1
  }
  store[paperId] = p
  writeStore(KEY_CONF, store)
}

export interface Calibration {
  /** How often the learner marked themselves sure, 0–100. */
  claimed: number
  /** Accuracy when they felt sure, 0–100. */
  deliveredWhenSure: number
  /** Accuracy when unsure, 0–100 (null if never unsure). */
  deliveredWhenUnsure: number | null
  /** claimed − deliveredWhenSure: positive = overconfident. */
  gapPts: number
  tagged: number
}

/** Needs ≥10 confidence-tagged answers before it reads anything. */
export function getCalibration(paperId: string): Calibration | null {
  const p = readStore<ConfStore>(KEY_CONF, {})[paperId]
  if (!p) return null
  const tagged = p.sureSeen + p.unsureSeen
  if (tagged < 10 || p.sureSeen === 0) return null
  const claimed = Math.round((p.sureSeen / tagged) * 100)
  const deliveredWhenSure = Math.round((p.sureCorrect / p.sureSeen) * 100)
  return {
    claimed,
    deliveredWhenSure,
    deliveredWhenUnsure: p.unsureSeen > 0 ? Math.round((p.unsureCorrect / p.unsureSeen) * 100) : null,
    gapPts: claimed - deliveredWhenSure,
    tagged,
  }
}

/* ── Derived reads over existing stores ───────────────────────── */

export interface MasteryScore {
  /** Average topic mastery across the whole syllabus, 0–100. */
  score: number
  /** Topics at 80%+ mastery. */
  strong: number
  total: number
}

/** Per-topic mastery = the better of practice accuracy and best check. */
export function masteryScore(paperId: string): MasteryScore | null {
  const path = getStudyPath(paperId)
  if (path.length === 0) return null
  const per = path.map((t) => Math.max(t.accuracy, t.best))
  const score = Math.round((per.reduce((s, m) => s + m, 0) / path.length) * 100)
  return { score, strong: per.filter((m) => m >= 0.8).length, total: path.length }
}

export interface VelocityRead {
  /** Topics mastered in the last 7 days / the 7 before that. */
  thisWeek: number
  lastWeek: number
  totalMastered: number
}

export function learningVelocity(paperId: string): VelocityRead {
  const results = getTopicResults(paperId)
  const now = Date.now()
  const WEEK = 7 * 86400000
  let thisWeek = 0
  let lastWeek = 0
  let totalMastered = 0
  for (const r of Object.values(results)) {
    if (!r.mastered) continue
    totalMastered += 1
    if (!r.masteredAt) continue
    const age = now - new Date(r.masteredAt).getTime()
    if (age <= WEEK) thisWeek += 1
    else if (age <= 2 * WEEK) lastWeek += 1
  }
  return { thisWeek, lastWeek, totalMastered }
}

export interface CoolingTopic {
  code: string
  label: string
  daysSince: number
}

/** Mastered topics not touched in `staleDays`+ — the forgetting risk. */
export function forgettingRisk(paperId: string, staleDays = 7): CoolingTopic[] {
  const paper = getPaper(paperId)
  if (!paper) return []
  const results = getTopicResults(paperId)
  const now = Date.now()
  const out: CoolingTopic[] = []
  for (const area of paper.areas) {
    const r = results[area.code]
    if (!r?.mastered || !r.lastAt) continue
    const daysSince = Math.floor((now - new Date(r.lastAt).getTime()) / 86400000)
    if (daysSince >= staleDays) out.push({ code: area.code, label: area.label, daysSince })
  }
  return out.sort((a, b) => b.daysSince - a.daysSince)
}

/** The palest band on the knowledge map — where the marks are hiding. */
export function palestArea(paperId: string): { code: string; label: string; pct: number } | null {
  const stats = getPaperStats(paperId)
  const seen = stats.areas.filter((a) => a.seen > 0)
  if (seen.length === 0) return null
  const worst = [...seen].sort((a, b) => a.accuracy - b.accuracy)[0]
  return { code: worst.code, label: worst.label, pct: Math.round(worst.accuracy * 100) }
}

export { TOPIC_PASS }
