/*
 * Scholify — ACCA diagnostic & pass-probability engine.
 *
 * The product reframe: instead of "here are 2,000 questions", the platform
 * says "based on this assessment you have a 68% chance of passing FM — here's
 * how we get you to 85%." This file turns a short, syllabus-spanning diagnostic
 * into a defensible pass-probability estimate, an estimated exam score, and a
 * ranked view of weak vs strong areas.
 *
 * The model (v1 — honest heuristic, not a black box):
 *  1. Per area, a DIFFICULTY-WEIGHTED accuracy (a correct hard question counts
 *     for more than a correct easy one).
 *  2. BAYESIAN SHRINKAGE toward the 0.5 pass line so a lucky 1/1 in an area
 *     doesn't read as 100% mastery.
 *  3. COVERAGE-CONFIDENCE regression: a diagnostic that only touched half the
 *     syllabus pulls the overall estimate back toward neutral — we don't claim
 *     certainty we didn't earn.
 *  4. A LOGISTIC map from competence → pass probability, centred on the 50%
 *     ACCA pass mark.
 *  5. A COUNTERFACTUAL target: lift the two weakest areas to a goal and show
 *     the resulting pass probability — the concrete "68% → 85%" promise.
 *
 * localStorage-first like the rest of the ACCA engine; server sync (the real
 * learning-data moat) lives in acca-cloud.ts and layers on top of this.
 */

import { getPaper, getQuestions, getPaperStats } from "@/lib/acca"
import { experienceLine } from "@/lib/acca-profile"
import type { AccaQuestion, Difficulty } from "@/lib/acca-content"

/* ── Tunables ─────────────────────────────────────────────────── */

/** A correct hard question is stronger evidence of competence than an easy one. */
const DIFFICULTY_WEIGHT: Record<Difficulty, number> = { easy: 0.8, medium: 1.0, hard: 1.3 }

/** Prior belief before evidence: the pass line. */
const PRIOR = 0.5
/** Pseudo-count controlling how fast evidence overrides the prior (~1.5 questions). */
const ALPHA = 1.5
/** Logistic slope: score 60→~75%, 70→~90%, 40→~25% pass probability. */
const LOGISTIC_K = 0.11
/** Questions sampled per syllabus area (capped by what the bank holds). */
const PER_AREA = 3
/** Hard ceiling on diagnostic length so it stays ~15–20 min. */
const MAX_QUESTIONS = 25
/** The improvement target we coach toward for weak areas. */
export const TARGET_AREA_SCORE = 0.7

/* ── Types ────────────────────────────────────────────────────── */

export interface DiagnosticAreaResult {
  code: string
  label: string
  seen: number
  correct: number
  /** Difficulty-weighted, prior-shrunk competence, 0–1. */
  score: number
  band: "weak" | "moderate" | "strong"
}

export interface DiagnosticTarget {
  /** Human labels of the areas to focus on. */
  focusAreas: string[]
  /** The per-area score we coach toward (e.g. 0.7). */
  targetScore: number
  /** Pass probability if those areas reach the target. */
  projectedPassProbability: number
}

export interface DiagnosticResult {
  paperId: string
  /** ISO timestamp. */
  answeredAt: string
  questionsAnswered: number
  rawCorrect: number
  /** 0–100 estimated exam score. */
  estimatedScore: number
  /** 0–100 probability of passing. */
  passProbability: number
  /** 0–1 fraction of the syllabus the diagnostic actually assessed. */
  confidence: number
  areas: DiagnosticAreaResult[]
  /** Up to 3 assessed areas, lowest score first. */
  weakest: DiagnosticAreaResult[]
  /** Up to 3 assessed areas, highest score first. */
  strongest: DiagnosticAreaResult[]
  target: DiagnosticTarget
}

/** One graded diagnostic answer. */
export interface AnsweredDiagnostic {
  q: AccaQuestion
  correct: boolean
}

/* ── Building the diagnostic ──────────────────────────────────── */

/** Deterministic shuffle (seeded) — mirrors acca.ts, avoids Math.random bans in tests. */
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
 * Pick a stratified difficulty ladder from a pool: exactly one easy, one
 * medium, one hard when available — falling back to the nearest difficulty
 * so every area still contributes PER_AREA questions on a thin bank.
 */
function pickLadder(pool: AccaQuestion[], seed: number): AccaQuestion[] {
  const buckets: Record<Difficulty, AccaQuestion[]> = {
    easy: shuffle(pool.filter((q) => q.difficulty === "easy"), seed),
    medium: shuffle(pool.filter((q) => q.difficulty === "medium"), seed + 1),
    hard: shuffle(pool.filter((q) => q.difficulty === "hard"), seed + 2),
  }
  const fallback: Record<Difficulty, Difficulty[]> = {
    easy: ["easy", "medium", "hard"],
    medium: ["medium", "easy", "hard"],
    hard: ["hard", "medium", "easy"],
  }
  const out: AccaQuestion[] = []
  for (const want of ["easy", "medium", "hard"] as Difficulty[]) {
    for (const d of fallback[want]) {
      const next = buckets[d].shift()
      if (next) {
        out.push(next)
        break
      }
    }
  }
  return out
}

/**
 * Build the diagnostic form: a stratified difficulty ladder — one easy, one
 * medium, one hard — from EVERY syllabus area (fair, syllabus-spanning, and
 * comparable between takes), capped at MAX_QUESTIONS. FA's 8 areas → 24
 * questions; the exam-style budget is 100 seconds per question (see
 * diagnosticSeconds). Returns [] when the paper has no seed bank.
 */
export function buildDiagnostic(paperId: string, seed = Date.now()): AccaQuestion[] {
  const paper = getPaper(paperId)
  const all = getQuestions(paperId)
  if (!paper || all.length === 0) return []

  const byArea = new Map<string, AccaQuestion[]>()
  for (const q of all) {
    const list = byArea.get(q.area) ?? []
    list.push(q)
    byArea.set(q.area, list)
  }

  const picked: AccaQuestion[] = []
  for (const area of paper.areas) {
    const pool = byArea.get(area.code)
    if (pool && pool.length) picked.push(...pickLadder(pool, seed + area.code.charCodeAt(0)))
  }

  // If we're under the cap and the bank has spares, that's fine — a shorter
  // diagnostic on a thin paper still reports honestly (lower confidence).
  return shuffle(picked.slice(0, MAX_QUESTIONS), seed + 7)
}

/** Exam-style time budget for a diagnostic form: 100s per question (24 → 40 min). */
export function diagnosticSeconds(questionCount: number): number {
  return questionCount * 100
}

/* ── Scoring & the pass-probability model ─────────────────────── */

function logistic(score0to100: number): number {
  return 100 / (1 + Math.exp(-LOGISTIC_K * (score0to100 - 50)))
}

function bandFor(score: number): DiagnosticAreaResult["band"] {
  if (score < 0.5) return "weak"
  if (score < 0.7) return "moderate"
  return "strong"
}

/** Difficulty-weighted, prior-shrunk competence for one area's answers. */
function areaScore(answers: AnsweredDiagnostic[]): number {
  let wSum = 0
  let wCorrect = 0
  for (const { q, correct } of answers) {
    const w = DIFFICULTY_WEIGHT[q.difficulty] ?? 1
    wSum += w
    if (correct) wCorrect += w
  }
  if (wSum === 0) return PRIOR
  return (wCorrect + ALPHA * PRIOR) / (wSum + ALPHA)
}

/** Prior-shrunk competence from plain seen/correct counts (no difficulty detail). */
function areaScoreFromCounts(seen: number, correct: number): number {
  if (seen === 0) return PRIOR
  return (correct + ALPHA * PRIOR) / (seen + ALPHA)
}

/** Mean of assessed-area scores, regressed toward neutral by coverage confidence. */
function overallCompetence(
  assessed: { score: number }[],
  confidence: number,
): number {
  if (assessed.length === 0) return PRIOR
  const mean = assessed.reduce((s, a) => s + a.score, 0) / assessed.length
  return mean * confidence + PRIOR * (1 - confidence)
}

/**
 * Assemble a full result from already-scored areas: pass probability, estimated
 * score, weakest/strongest, and the counterfactual "get to X%" target. Shared
 * by the formal diagnostic and the live-from-practice estimate so both speak the
 * exact same model.
 */
function assembleResult(
  paperId: string,
  areas: DiagnosticAreaResult[],
  totalAreas: number,
  meta: { questionsAnswered: number; rawCorrect: number },
): DiagnosticResult {
  const assessed = areas.filter((a) => a.seen > 0)
  const confidence = totalAreas > 0 ? assessed.length / totalAreas : 0

  const competence = overallCompetence(assessed, confidence)
  const estimatedScore = Math.round(competence * 100)
  const passProbability = Math.round(logistic(estimatedScore))

  const weakest = [...assessed].sort((a, b) => a.score - b.score).slice(0, 3)
  const strongest = [...assessed].sort((a, b) => b.score - a.score).slice(0, 3)

  // Counterfactual: if the two weakest areas reached TARGET_AREA_SCORE, what
  // pass probability would this student have? This is the concrete promise.
  const focus = weakest.slice(0, 2)
  const focusCodes = new Set(focus.map((a) => a.code))
  const projectedAssessed = assessed.map((a) =>
    focusCodes.has(a.code) ? { score: Math.max(a.score, TARGET_AREA_SCORE) } : { score: a.score },
  )
  const projectedCompetence = overallCompetence(projectedAssessed, confidence)
  const projectedPassProbability = Math.round(logistic(Math.round(projectedCompetence * 100)))

  return {
    paperId,
    answeredAt: new Date().toISOString(),
    questionsAnswered: meta.questionsAnswered,
    rawCorrect: meta.rawCorrect,
    estimatedScore,
    passProbability,
    confidence,
    areas,
    weakest,
    strongest,
    target: {
      focusAreas: focus.map((a) => a.label),
      targetScore: TARGET_AREA_SCORE,
      projectedPassProbability: Math.max(projectedPassProbability, passProbability),
    },
  }
}

/**
 * Turn a set of graded diagnostic answers into a full result: per-area
 * competence, an estimated exam score, a pass probability, and a counterfactual
 * "get to X%" target built from the weakest areas.
 */
export function scoreDiagnostic(paperId: string, answers: AnsweredDiagnostic[]): DiagnosticResult {
  const areasMeta = getPaper(paperId)?.areas ?? []

  const byArea = new Map<string, AnsweredDiagnostic[]>()
  for (const a of answers) {
    const list = byArea.get(a.q.area) ?? []
    list.push(a)
    byArea.set(a.q.area, list)
  }

  const areas: DiagnosticAreaResult[] = areasMeta.map((meta) => {
    const list = byArea.get(meta.code) ?? []
    const score = areaScore(list)
    return {
      code: meta.code,
      label: meta.label,
      seen: list.length,
      correct: list.filter((a) => a.correct).length,
      score,
      band: bandFor(score),
    }
  })

  return assembleResult(paperId, areas, areasMeta.length, {
    questionsAnswered: answers.length,
    rawCorrect: answers.filter((a) => a.correct).length,
  })
}

/**
 * A LIVE pass-probability estimate computed from cumulative practice (the same
 * model as the formal diagnostic, minus difficulty weighting since practice
 * counts don't retain it). This is what closes the loop: as the student drills
 * their weak areas, this number moves. Returns null until they've practised.
 */
export function estimateFromPractice(paperId: string): DiagnosticResult | null {
  const stats = getPaperStats(paperId)
  if (stats.answered === 0) return null

  const areas: DiagnosticAreaResult[] = stats.areas.map((a) => {
    const score = areaScoreFromCounts(a.seen, a.correct)
    return { code: a.code, label: a.label, seen: a.seen, correct: a.correct, score, band: bandFor(score) }
  })

  return assembleResult(paperId, areas, stats.areas.length, {
    questionsAnswered: stats.answered,
    rawCorrect: stats.correct,
  })
}

/** UI band for a pass probability: colour + short verdict. */
export function passBand(prob: number): { label: string; color: string } {
  if (prob >= 70) return { label: "On track to pass", color: "#10B981" }
  if (prob >= 45) return { label: "On the borderline", color: "#F59E0B" }
  if (prob > 0) return { label: "Not ready yet", color: "#EF4444" }
  return { label: "Take the diagnostic", color: "#94A3B8" }
}

/* ── Local persistence (offline-first) ────────────────────────── */

const KEY = "scholify-acca-diagnostics"

type Store = Record<string, DiagnosticResult>

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Store
  } catch {
    /* ignore */
  }
  return {}
}

/** Persist the latest diagnostic for a paper locally. */
export function saveDiagnosticLocal(result: DiagnosticResult): void {
  try {
    const store = read()
    store[result.paperId] = result
    window.localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/** The most recent diagnostic for a paper, or null if never taken. */
export function getLatestDiagnostic(paperId: string): DiagnosticResult | null {
  return read()[paperId] ?? null
}

/** Merge a cloud-fetched result in when it's newer than what's local. */
export function mergeDiagnostic(result: DiagnosticResult): void {
  const existing = getLatestDiagnostic(result.paperId)
  if (!existing || result.answeredAt > existing.answeredAt) saveDiagnosticLocal(result)
}

/* ── Learner profile (what Lara "remembers" about you) ────────── */

/**
 * A compact, prompt-ready summary of a student's weaknesses on a paper — drawn
 * from their latest diagnostic and their live per-area practice accuracy. This
 * is what makes Lara stateful: fed into the tutor, she can tie explanations to
 * the areas this student actually struggles with, across sessions. Returns ""
 * when there's nothing learned yet.
 */
export function learnerProfileSummary(paperId: string): string {
  const lines: string[] = []

  // Background from onboarding — pitches every explanation at the right level.
  const exp = experienceLine()
  if (exp) lines.push(exp)

  const diag = getLatestDiagnostic(paperId)
  if (diag) {
    lines.push(`Latest diagnostic: ${diag.passProbability}% pass probability (estimated exam score ${diag.estimatedScore}%).`)
    if (diag.weakest.length) {
      lines.push(
        `Weakest areas from that diagnostic: ${diag.weakest
          .map((a) => `${a.code} ${a.label} (${Math.round(a.score * 100)}%)`)
          .join("; ")}.`,
      )
    }
  }

  // Live practice signal — areas attempted at least twice, weakest first.
  const attempted = getPaperStats(paperId)
    .areas.filter((a) => a.seen >= 2)
    .sort((a, b) => a.accuracy - b.accuracy)
  const weakPractice = attempted.slice(0, 3).filter((a) => a.accuracy < 0.7)
  if (weakPractice.length) {
    lines.push(
      `Recent practice shows they struggle with: ${weakPractice
        .map((a) => `${a.code} ${a.label} (${Math.round(a.accuracy * 100)}%)`)
        .join("; ")}.`,
    )
  }

  return lines.join("\n")
}
