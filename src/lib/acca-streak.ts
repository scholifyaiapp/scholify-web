/*
 * THE 30-DAY STREAK CYCLE, and the four prizes along it.
 *
 * A streak that only ever counts upwards has one moment of meaning — the day
 * you start — and then becomes a number that can only ever be lost. Thirty days
 * is a lap: it has a finish line, the finish line arrives often enough to be
 * believed on day one, and crossing it starts a fresh one rather than leaving
 * the learner with nothing left to reach.
 *
 * The four prizes sit where the drop-off actually is. Three days is the first
 * one most people miss; a week is the first that feels like a habit; a
 * fortnight is where the plan starts predicting them accurately; thirty is the
 * lap. They are per CYCLE, not lifetime — that is what makes day 31 a fresh
 * start rather than an anticlimax.
 *
 * The existing isMilestone() in acca-day-gate governs which streaks trigger an
 * EMAIL, and is deliberately not the same list (it includes 2 and 21). Mail
 * cadence and on-screen reward are different jobs, and merging them would mean
 * either a silent prize or an unwanted email.
 */

export const STREAK_CYCLE = 30

export interface StreakPrize {
  /** Day within the cycle this is awarded on. */
  day: number
  name: string
  /** What the learner actually gets — kept honest; these are recognition, not features. */
  blurb: string
}

export const STREAK_PRIZES: readonly StreakPrize[] = [
  { day: 3, name: "Ignition", blurb: "Three days. The one most people never get past." },
  { day: 7, name: "First week", blurb: "A full week. This is where it stops being motivation and starts being routine." },
  { day: 14, name: "Fortnight", blurb: "Two weeks. Your plan can now predict your pace properly." },
  { day: STREAK_CYCLE, name: "Full lap", blurb: "Thirty days. A complete cycle — the next one starts tomorrow." },
] as const

export interface StreakProgress {
  /** Raw consecutive active days, unbounded. */
  streak: number
  /** Day within the current 30-day lap, 0…30. */
  cycleDay: number
  /** Laps completed in full. */
  lapsDone: number
  /** cycleDay / STREAK_CYCLE, 0…1 — what the ring fills to. */
  fraction: number
  /** Prizes reached in THIS lap. */
  earned: StreakPrize[]
  /** The next prize in this lap, or null on the final day of a lap. */
  next: StreakPrize | null
  /** Days until `next`, or null when there is none. */
  daysToNext: number | null
}

/**
 * Where a learner is on the current lap.
 *
 * Day 30 reads as 30/30 rather than rolling to 0 — finishing a lap should show
 * the finish line, not an empty ring. The next active day starts lap two at
 * 1/30, which is why the modulo is offset rather than plain.
 */
export function streakProgress(streak: number): StreakProgress {
  const safe = Number.isFinite(streak) && streak > 0 ? Math.floor(streak) : 0
  const cycleDay = safe === 0 ? 0 : ((safe - 1) % STREAK_CYCLE) + 1
  const lapsDone = Math.floor(safe / STREAK_CYCLE)

  const earned = STREAK_PRIZES.filter((p) => cycleDay >= p.day)
  const next = STREAK_PRIZES.find((p) => p.day > cycleDay) ?? null

  return {
    streak: safe,
    cycleDay,
    lapsDone,
    fraction: cycleDay / STREAK_CYCLE,
    earned,
    next,
    daysToNext: next ? next.day - cycleDay : null,
  }
}

/**
 * True when this exact streak lands on a prize — the moment to celebrate.
 *
 * Takes the streak rather than the cycle day so callers cannot accidentally
 * fire it every lap for a learner sitting still.
 */
export function prizeAwardedAt(streak: number): StreakPrize | null {
  const { cycleDay } = streakProgress(streak)
  return STREAK_PRIZES.find((p) => p.day === cycleDay) ?? null
}

/** Every prize a learner has ever banked, across all laps — for analytics. */
export function lifetimePrizeCount(streak: number): number {
  const { lapsDone, earned } = streakProgress(streak)
  return lapsDone * STREAK_PRIZES.length + (streak % STREAK_CYCLE === 0 ? 0 : earned.length)
}
