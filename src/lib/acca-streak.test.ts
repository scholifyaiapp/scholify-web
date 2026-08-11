import { describe, expect, it } from "vitest"
import {
  STREAK_CYCLE,
  STREAK_PRIZES,
  lifetimePrizeCount,
  prizeAwardedAt,
  streakProgress,
} from "@/lib/acca-streak"
import { isMilestone } from "@/lib/acca-day-gate"

/*
 * THE LAP. A streak that only counts upwards has one moment of meaning and then
 * becomes a number that can only be lost. Thirty days is a lap with a finish
 * line, and the four prizes sit where the drop-off actually is.
 *
 * What matters here is that the ring and the count agree, that day 30 shows the
 * finish rather than rolling to an empty ring, and that a learner sitting still
 * is never told they have won something.
 */

describe("where you are on the lap", () => {
  it("starts empty and fills one day at a time", () => {
    expect(streakProgress(0).cycleDay).toBe(0)
    expect(streakProgress(0).fraction).toBe(0)
    expect(streakProgress(1).cycleDay).toBe(1)
    expect(streakProgress(17).cycleDay).toBe(17)
  })

  it("shows day 30 as a finish line, not an empty ring", () => {
    // A plain modulo would read 30 as 0/30 — the learner completes the lap and
    // the ring goes blank on exactly the day it should be full.
    const p = streakProgress(STREAK_CYCLE)
    expect(p.cycleDay).toBe(STREAK_CYCLE)
    expect(p.fraction).toBe(1)
    expect(p.next).toBeNull()
  })

  it("starts a fresh lap the day after", () => {
    const p = streakProgress(STREAK_CYCLE + 1)
    expect(p.cycleDay).toBe(1)
    expect(p.lapsDone).toBe(1)
    expect(p.earned).toHaveLength(0)
  })

  it("counts full laps without ever exceeding the ring", () => {
    for (const streak of [0, 1, 29, 30, 31, 59, 60, 61, 200]) {
      const p = streakProgress(streak)
      expect(p.fraction, `streak=${streak}`).toBeGreaterThanOrEqual(0)
      expect(p.fraction, `streak=${streak}`).toBeLessThanOrEqual(1)
      expect(p.cycleDay, `streak=${streak}`).toBeLessThanOrEqual(STREAK_CYCLE)
    }
    expect(streakProgress(60).lapsDone).toBe(2)
  })

  it("survives nonsense rather than rendering NaN into the ring", () => {
    for (const bad of [-5, Number.NaN, Number.POSITIVE_INFINITY]) {
      const p = streakProgress(bad as number)
      expect(p.cycleDay).toBe(0)
      expect(Number.isFinite(p.fraction)).toBe(true)
    }
  })
})

describe("the four prizes", () => {
  it("sits at 3, 7, 14 and 30", () => {
    expect(STREAK_PRIZES.map((p) => p.day)).toEqual([3, 7, 14, 30])
  })

  it("banks each one as it is passed, and counts down to the next", () => {
    expect(streakProgress(2).earned).toHaveLength(0)
    expect(streakProgress(2).next?.day).toBe(3)
    expect(streakProgress(2).daysToNext).toBe(1)

    expect(streakProgress(3).earned.map((p) => p.day)).toEqual([3])
    expect(streakProgress(14).earned.map((p) => p.day)).toEqual([3, 7, 14])
    expect(streakProgress(30).earned).toHaveLength(4)
  })

  it("awards only on the exact day, so standing still wins nothing", () => {
    // The celebration hook fires off this. If it returned a prize for every day
    // past a milestone, day 8 through 13 would all "win" the week award.
    expect(prizeAwardedAt(7)?.day).toBe(7)
    expect(prizeAwardedAt(8)).toBeNull()
    expect(prizeAwardedAt(29)).toBeNull()
    expect(prizeAwardedAt(30)?.day).toBe(30)
    // ...and again on the next lap, which is the point of a lap.
    expect(prizeAwardedAt(37)?.day).toBe(7)
  })

  it("accumulates across laps for the analytics count", () => {
    expect(lifetimePrizeCount(0)).toBe(0)
    expect(lifetimePrizeCount(7)).toBe(2)          // 3d + 7d
    expect(lifetimePrizeCount(30)).toBe(4)         // one full lap
    expect(lifetimePrizeCount(37)).toBe(4 + 2)     // a lap, then 3d + 7d again
    expect(lifetimePrizeCount(60)).toBe(8)         // two full laps
  })
})

describe("prizes and streak EMAIL are deliberately different lists", () => {
  it("does not silently couple the on-screen reward to the mail cadence", () => {
    /*
     * isMilestone (acca-day-gate) drives email and includes 2 and 21, which are
     * good moments to write to someone and poor moments to hand out a prize.
     * If these ever merge, one of the two behaviours changes without anyone
     * deciding to: either a silent prize, or an unwanted email.
     */
    expect(isMilestone(2)).toBe(true)
    expect(prizeAwardedAt(2)).toBeNull()

    expect(isMilestone(21)).toBe(true)
    expect(prizeAwardedAt(21)).toBeNull()

    // Where they DO agree, they agree.
    for (const day of [3, 7, 14, 30]) {
      expect(isMilestone(day), `day=${day}`).toBe(true)
      expect(prizeAwardedAt(day), `day=${day}`).not.toBeNull()
    }
  })
})
