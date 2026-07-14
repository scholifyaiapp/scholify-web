import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Answer-position de-biasing.
 *
 * Authored content is not position-neutral (FR keys ~45% of its MCQs as option
 * A), which makes a bank guessable without reading it. Rather than re-keying
 * thousands of questions, every option list is shuffled at render time and the
 * correct index is remapped with it — so grading stays honest and any future
 * question inherits the fix for free.
 *
 * The shuffle is seeded from the question id, so a question always presents its
 * options in the same order (no jumping on re-render) while being effectively
 * random across the bank.
 */

export interface ShuffledOptions {
  options: string[]
  correct: number | number[]
}

/** djb2 — stable positive seed from a question id. */
function hashId(id: string): number {
  let h = 5381
  for (let i = 0; i < id.length; i++) h = ((h * 33) ^ id.charCodeAt(i)) & 0x7fffffff
  return h || 1
}

/*
 * Seeded PRNG (mulberry32). The session shuffle in acca.ts uses a plain LCG
 * whose multiplier is 1 (mod 4), so its low bits barely move — `s % 4` on a
 * 4-option list just rotates the bias instead of removing it (verified: it sent
 * FR's 45% of A-keys to 45% of D-keys). Question order is long enough not to
 * care; option order is not, so it needs bits that actually mix.
 */
function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Seeded Fisher-Yates over indices — deterministic for a given seed. */
function shuffledOrder(n: number, seed: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i)
  const next = rng(seed || 1)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * A deterministically shuffled view of a question's options, with `correct`
 * remapped to the new positions. Numeric-entry questions pass through untouched.
 */
export function shuffledOptions(q: AccaQuestion, seed?: number): ShuffledOptions {
  const opts = q.options ?? []
  const correct = q.correct ?? -1
  if (q.type === "number" || opts.length < 2) return { options: opts, correct }

  const order = shuffledOrder(opts.length, seed ?? hashId(q.id)) // order[new] = old
  const newIndex = new Map<number, number>()
  order.forEach((old, i) => newIndex.set(old, i))
  const remap = (i: number) => newIndex.get(i) ?? i

  return {
    options: order.map((old) => opts[old]),
    correct: Array.isArray(correct)
      ? correct.map(remap).sort((a, b) => a - b)
      : remap(correct),
  }
}

/**
 * The question, cloned with its options shuffled and `correct` remapped to
 * match. Render AND grade against this object — never the raw authored one.
 */
export function withShuffledOptions<T extends AccaQuestion>(q: T, seed?: number): T {
  if (q.type === "number" || !q.options?.length) return q
  const { options, correct } = shuffledOptions(q, seed)
  return { ...q, options, correct }
}
