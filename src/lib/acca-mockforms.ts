/*
 * Mock Forms — three fixed, exam-shaped mock papers per ACCA paper.
 *
 * The doc-9 requirement: Mock 1, Mock 2 and Mock 3 must be REAL forms —
 * stable, balanced, non-overlapping — not three random draws that might
 * repeat questions or cluster on one syllabus area.
 *
 * Construction (deterministic, no stored id lists to maintain):
 *  - The paper's bank is split by syllabus area, each area shuffled with a
 *    FIXED per-form seed (same form → same questions, forever).
 *  - Questions are dealt to forms 1→2→3 round-robin per area, so the three
 *    forms are DISJOINT and each mirrors the syllabus spread of the bank —
 *    exam-blueprint behaviour by construction.
 *  - Within a form, a difficulty ladder orders the sitting: a gentle
 *    opening, a medium core, a hard back half — like the real exam's feel.
 *
 * Growing the bank changes future dealing (acceptable: forms improve as
 * content deepens); shipped results are unaffected (stored as scores).
 */

import { getPaper, getQuestions } from "@/lib/acca"
import type { AccaQuestion, Difficulty } from "@/lib/acca-content"

export const MOCK_FORMS = 3

/** Same seeded shuffle as the rest of the engine. */
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

/** Stable numeric seed per paper (form seeds derive from it). */
function paperSeed(paperId: string): number {
  let h = 7
  for (const ch of paperId) h = (h * 31 + ch.charCodeAt(0)) & 0x7fffffff
  return h
}

const LADDER: Difficulty[] = ["easy", "medium", "hard"]

/**
 * Build mock form 1, 2 or 3 for a paper: disjoint from the other forms,
 * area-balanced, difficulty-laddered, sized like the paper's mock
 * (the caller passes the size — e.g. 30 on deep banks).
 */
export function buildMockForm(paperId: string, form: number, size: number): AccaQuestion[] {
  const paper = getPaper(paperId)
  const all = getQuestions(paperId)
  if (!paper || all.length === 0) return []
  const f = ((Math.round(form) - 1) % MOCK_FORMS + MOCK_FORMS) % MOCK_FORMS // 0..2

  // Deal each area's (deterministically shuffled) questions round-robin
  // across the three forms — disjoint by construction.
  const mine: AccaQuestion[] = []
  for (const area of paper.areas) {
    const pool = shuffle(
      all.filter((q) => q.area === area.code),
      paperSeed(paperId) + area.code.charCodeAt(0) * 131,
    )
    for (let i = f; i < pool.length; i += MOCK_FORMS) mine.push(pool[i])
  }

  // Trim to size preserving area spread: take proportionally from each area.
  let picked = mine
  if (mine.length > size) {
    const byArea = new Map<string, AccaQuestion[]>()
    for (const q of mine) {
      const list = byArea.get(q.area) ?? []
      list.push(q)
      byArea.set(q.area, list)
    }
    picked = []
    const areas = [...byArea.values()]
    let i = 0
    while (picked.length < size) {
      const pool = areas[i % areas.length]
      const next = pool.shift()
      if (next) picked.push(next)
      i++
      if (areas.every((p) => p.length === 0)) break
    }
  }

  // The sitting's shape: easy opening, medium core, hard back half —
  // stable order within the form (no reshuffle between attempts).
  return [...picked].sort((a, b) => LADDER.indexOf(a.difficulty) - LADDER.indexOf(b.difficulty))
}

/** Which form the learner's next mock should use (Mock N → Form N, cycling). */
export function nextMockForm(attempts: number): number {
  return (Math.max(0, attempts) % MOCK_FORMS) + 1
}
