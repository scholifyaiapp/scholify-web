/*
 * CROSS-DEVICE PROGRESS MERGE — closing the "no lost work" hole.
 *
 * ── The defect (train-and-test batch 4, 19 Aug 2026) ─────────────
 * syncAccaProgress reconciled devices by comparing ONE number (totalAnswered)
 * and letting the bigger snapshot REPLACE the smaller one wholesale. The
 * comment promised "the more-complete copy wins with no lost work" — but work
 * is lost whenever BOTH sides hold unsynced answers. The realistic case: a
 * student's laptop holds 300 MA answers in the cloud; on a new phone they
 * answer 50 FM questions before their first sync; the sync sees 300 > 50,
 * hydrates the phone from the cloud, and the 50 FM answers are destroyed.
 *
 * ── The merge ────────────────────────────────────────────────────
 * Merge at PAPER granularity: for each paper, keep whichever side's record
 * holds more attempts for THAT paper. This makes the different-papers-on-
 * different-devices fork (the common one) completely lossless, and degrades
 * to "richer side wins per paper" when the same paper was studied on both —
 * never worse than the old whole-snapshot rule, strictly better everywhere
 * else. Totals are recomputed from the merged question stats so they can
 * never drift from their parts.
 *
 * Day-keyed effort (daily counts, history, streak) merges by MAX per key:
 * the same person on two devices the same day should never SUM (a re-synced
 * device would double-count itself) — max can only under-credit, never
 * inflate, and under-crediting effort is the safe direction.
 *
 * Pure function, node-testable; syncAccaProgress feeds it both snapshots.
 */

import type { AccaProgressSnapshot } from "@/lib/acca"

type QuestionStats = Record<string, { attempts: number; correct: number }>

function paperAttempts(qs: QuestionStats | undefined): number {
  if (!qs) return 0
  return Object.values(qs).reduce((sum, q) => sum + (Number(q?.attempts) || 0), 0)
}

const laterDay = (a: string | null, b: string | null): string | null => {
  if (!a) return b
  if (!b) return a
  return a >= b ? a : b
}

export function mergeProgressSnapshots(local: AccaProgressSnapshot, cloud: AccaProgressSnapshot): AccaProgressSnapshot {
  /* Per paper: the side with more attempts on THAT paper carries both its
   * question stats and its area stats — they were measured together and must
   * never be mixed across sides for one paper. */
  const questions: AccaProgressSnapshot["questions"] = {}
  const areas: AccaProgressSnapshot["areas"] = {}
  const papers = new Set([...Object.keys(local.questions ?? {}), ...Object.keys(cloud.questions ?? {})])
  for (const paper of papers) {
    const useLocal = paperAttempts(local.questions?.[paper]) >= paperAttempts(cloud.questions?.[paper])
    const side = useLocal ? local : cloud
    if (side.questions?.[paper]) questions[paper] = side.questions[paper]
    if (side.areas?.[paper]) areas[paper] = side.areas[paper]
  }
  // An areas entry can exist without questions (edge shapes from old versions):
  // carry any not already claimed, preferring the side with question evidence.
  for (const src of [local, cloud]) {
    for (const paper of Object.keys(src.areas ?? {})) {
      if (!areas[paper]) areas[paper] = src.areas[paper]
    }
  }

  /* Totals recomputed from the merged parts — never trusted from either side. */
  let totalAnswered = 0
  let totalCorrect = 0
  for (const qs of Object.values(questions)) {
    for (const q of Object.values(qs)) {
      totalAnswered += Number(q?.attempts) || 0
      totalCorrect += Number(q?.correct) || 0
    }
  }

  /* Effort by day: MAX per key — one person, two devices, no double counting. */
  const daily: Record<string, number> = { ...(cloud.daily ?? {}) }
  for (const [day, n] of Object.entries(local.daily ?? {})) daily[day] = Math.max(daily[day] ?? 0, n)
  const dailyCorrect: Record<string, number> = { ...(cloud.dailyCorrect ?? {}) }
  for (const [day, n] of Object.entries(local.dailyCorrect ?? {})) dailyCorrect[day] = Math.max(dailyCorrect[day] ?? 0, n)

  const history = [...new Set([...(cloud.history ?? []), ...(local.history ?? [])])].sort().slice(-120)

  return {
    questions,
    areas,
    totalAnswered,
    totalCorrect,
    lastStudied: laterDay(local.lastStudied ?? null, cloud.lastStudied ?? null),
    history,
    streak: Math.max(Number(local.streak) || 0, Number(cloud.streak) || 0),
    daily,
    dailyCorrect,
  }
}
