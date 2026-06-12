import { addDays, differenceInCalendarDays } from "date-fns"
import type { VocabDeck } from "@/lib/vocab"

/*
 * Fluency + compound-growth framing — the "1% better every day" math.
 *
 * The brand promise (Atomic Habits): 1.01^365 ≈ 37.8× in a year. The product
 * unit that makes it real is a word: ~3,000 well-chosen words cover ~90% of
 * everyday speech, so a steady daily session is a concrete, visible path to
 * conversational fluency. These helpers turn deck + progress state into that
 * story for the UI.
 */

/** Words that cover ~90% of everyday speech — the "conversational fluency" bar. */
export const FLUENCY_WORDS = 3000

/** Words the learner has started studying (SRS keeps them alive thereafter). */
export function wordsLearned(deck: VocabDeck): number {
  return deck.words.filter((w) => w.status !== "new").length
}

/** Percent of the conversational-fluency benchmark reached (0–100, one decimal under 10%). */
export function fluencyPercent(deck: VocabDeck): number {
  const learned = wordsLearned(deck)
  const pct = (learned / FLUENCY_WORDS) * 100
  if (learned >= FLUENCY_WORDS) return 100
  // Never show 100% until the bar is actually reached (rounding can lie).
  return Math.min(99, pct < 10 ? Math.round(pct * 10) / 10 : Math.round(pct))
}

/** 1-based day of the journey (day 1 = the day the deck was created). */
export function dayNumber(deck: VocabDeck): number {
  if (Number.isNaN(new Date(deck.createdAt).getTime())) return 1
  const day = Math.max(1, differenceInCalendarDays(new Date(), new Date(deck.createdAt)) + 1)
  return Number.isNaN(day) ? 1 : day
}

/** The Atomic Habits multiple: 1.01^day ("×1.6 the day-one you"). */
export function growthMultiple(day: number): number {
  return Math.pow(1.01, Math.max(0, day))
}

/** Projected date of hitting FLUENCY_WORDS at the deck's daily pace (null once reached). */
export function projectedFluencyDate(deck: VocabDeck): Date | null {
  const remaining = FLUENCY_WORDS - wordsLearned(deck)
  if (remaining <= 0) return null
  const perDay = Math.max(1, deck.dailyNewWords)
  return addDays(new Date(), Math.ceil(remaining / perDay))
}

/**
 * Points for the 1.01^t curve over a year, normalized to a 0–1 box
 * (x: day/365, y: 0 at 1×, 1 at 37.8×). For the progress-page SVG.
 */
export function compoundCurvePoints(samples = 74): { x: number; y: number }[] {
  const max = growthMultiple(365)
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * 365
    pts.push({ x: t / 365, y: (growthMultiple(t) - 1) / (max - 1) })
  }
  return pts
}
