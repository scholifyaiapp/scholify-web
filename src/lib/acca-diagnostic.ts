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

import { getPaper, getQuestions, getPaperStats, DIFFICULTY_WEIGHT } from "@/lib/acca"
import { experienceLine } from "@/lib/acca-profile"
import type { AccaQuestion, Difficulty } from "@/lib/acca-content"

/* ── Tunables ─────────────────────────────────────────────────── */

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

/*
 * How much evidence the LIVE PRACTICE estimate needs before it is allowed to
 * speak as a pass probability (headline, mock gate).
 *
 * The estimate regresses toward PRIOR (0.5) when syllabus coverage is thin — but
 * 50 is already most of the way to the 60 mock gate, so on thin evidence the
 * regression that is supposed to express DOUBT reads as near-readiness instead:
 * two correct answers in one of eight areas used to land at 61% and unlock the
 * mock room. Below these thresholds we publish no number at all and the UI says
 * "still measuring" (see readinessState in acca-loop).
 *
 * The formal diagnostic is exempt: it is a stratified, syllabus-spanning
 * instrument (one easy/medium/hard per area) — a deliberate measurement, not an
 * accident of what the student happened to click. It is the intended route to a
 * number, and it clears both bars on any paper with a real bank anyway.
 */
/** Answers on record before practice alone can claim a pass probability. */
export const PRACTICE_MIN_ANSWERED = 20
/** Fraction of syllabus areas that must have been touched (≥ half the paper). */
export const PRACTICE_MIN_CONFIDENCE = 0.5

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
  /**
   * True when the evidence behind this estimate is too thin to publish as a pass
   * probability — the numbers are still populated (the areas breakdown is useful)
   * but the headline and the mock gate must ignore them. Absent on results stored
   * before this flag existed, which were all formal diagnostics → not provisional.
   */
  provisional?: boolean
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

  const ladders: AccaQuestion[][] = []
  for (const area of paper.areas) {
    const pool = byArea.get(area.code)
    if (pool && pool.length) ladders.push(pickLadder(pool, seed + area.code.charCodeAt(0)))
  }

  // Round-robin by ladder depth so a broad syllabus cannot lose its final
  // areas when the hard cap is applied (SBL has 10 areas: 3 each would be 30).
  // Every represented area gets one question before any area gets a second.
  const picked: AccaQuestion[] = []
  for (let depth = 0; depth < PER_AREA; depth += 1) {
    for (const ladder of ladders) {
      if (ladder[depth]) picked.push(ladder[depth])
    }
  }

  // If we're under the cap and the bank has spares, that's fine — a shorter
  // diagnostic on a thin paper still reports honestly (lower confidence).
  return shuffle(picked.slice(0, MAX_QUESTIONS), seed + 7)
}

/** Exam-style time budget for a diagnostic form: 100s per question (24 → 40 min). */
export function diagnosticSeconds(questionCount: number): number {
  return questionCount * 100
}

/**
 * Honest ± margin (percentage points, ~80% interval) on a diagnostic's pass
 * probability: binomial standard error on the observed proportion, widened
 * when syllabus coverage is partial. More questions → tighter band.
 *   n=24, p=0.5, full coverage → ±13; n=12, half coverage → ±26 (capped 30).
 */
export function diagnosticMargin(passProbability: number, questionsAnswered: number, coverage: number): number {
  if (questionsAnswered <= 0) return 30
  const prob = Math.min(0.95, Math.max(0.05, passProbability / 100))
  const se = Math.sqrt((prob * (1 - prob)) / questionsAnswered)
  const coveragePenalty = 1 + (1 - Math.min(1, Math.max(0, coverage)))
  return Math.min(30, Math.max(3, Math.round(100 * 1.28 * se * coveragePenalty)))
}

/** A pass-probability estimate as an honest interval. */
export interface ProbabilityRange {
  /** The point estimate, 0–100. */
  prob: number
  /** The ± margin in points (unclamped — what "±N" prints). */
  margin: number
  /** Lower bound, clamped into [0, 100]. */
  lo: number
  /** Upper bound, clamped into [0, 100]. */
  hi: number
}

/**
 * The interval a student should actually be shown. A probability is bounded by
 * the scale, so a symmetric ± near the ends spills off it: a perfect diagnostic
 * printed "98% ±7" (105%) and an all-wrong one "2% ±6" (−4%). Render [lo, hi],
 * never prob ± margin.
 */
export function diagnosticRange(passProbability: number, questionsAnswered: number, coverage: number): ProbabilityRange {
  const prob = Math.max(0, Math.min(100, Math.round(passProbability)))
  const margin = diagnosticMargin(prob, questionsAnswered, coverage)
  return { prob, margin, lo: Math.max(0, prob - margin), hi: Math.min(100, prob + margin) }
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

/**
 * Prior-shrunk competence from the stored DIFFICULTY-WEIGHTED sums. Identical
 * formula to areaScore above — that is the point: practice progress now records
 * the weighted sums (acca.ts recordAnswer), so the live estimate and the formal
 * diagnostic score the same answers to the same number. They used to disagree by
 * up to 14 points on one answer set, which meant the headline moved when the
 * student merely navigated between the results screen and the dashboard.
 */
function areaScoreFromWeighted(weightedSeen: number, weightedCorrect: number): number {
  if (weightedSeen <= 0) return PRIOR
  return (weightedCorrect + ALPHA * PRIOR) / (weightedSeen + ALPHA)
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
  meta: { questionsAnswered: number; rawCorrect: number; provisional?: boolean },
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
    provisional: meta.provisional ?? false,
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
 * A LIVE pass-probability estimate computed from cumulative practice — the exact
 * same model as the formal diagnostic, difficulty weighting included (progress
 * now stores the weighted sums). This is what closes the loop: as the student
 * drills their weak areas, this number moves.
 *
 * Returns null until they've practised. Below the evidence thresholds the result
 * is still returned (the per-area breakdown is honest and useful) but flagged
 * `provisional` — callers that publish a NUMBER must respect that flag; the mock
 * gate and the headline go through passProbability/readinessState in acca-loop,
 * which do.
 */
export function estimateFromPractice(paperId: string): DiagnosticResult | null {
  const stats = getPaperStats(paperId)
  if (stats.answered === 0) return null

  const areas: DiagnosticAreaResult[] = stats.areas.map((a) => {
    const score = areaScoreFromWeighted(a.weightedSeen, a.weightedCorrect)
    return { code: a.code, label: a.label, seen: a.seen, correct: a.correct, score, band: bandFor(score) }
  })

  const totalAreas = stats.areas.length
  const assessedAreas = areas.filter((a) => a.seen > 0).length
  const confidence = totalAreas > 0 ? assessedAreas / totalAreas : 0

  // Coverage is non-negotiable: you cannot estimate a paper from a corner of it.
  // The volume bar is waived once a formal diagnostic is on record — that IS the
  // measurement (a stratified easy/medium/hard ladder across every area, and its
  // answers are inside these very counts), so practice on top only refines it. A
  // 4-area paper's diagnostic is 12 questions; without the waiver the number would
  // freeze at the stored diagnostic until 8 more answers arrived, then jump.
  const volume = stats.answered >= PRACTICE_MIN_ANSWERED || getLatestDiagnostic(paperId) !== null
  const provisional = !volume || confidence < PRACTICE_MIN_CONFIDENCE

  return assembleResult(paperId, areas, totalAreas, {
    questionsAnswered: stats.answered,
    rawCorrect: stats.correct,
    provisional,
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
