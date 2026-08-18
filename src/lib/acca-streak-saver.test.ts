import { describe, it, expect, vi, afterEach } from "vitest"
import { recordDayActive, streakAtRisk } from "@/lib/acca-schedule"

/*
 * The streak-at-risk signal behind the in-app streak-saver tab nudge: true only
 * when a 2+ day streak is not yet secured TODAY.
 */
afterEach(() => vi.useRealTimers())

describe("streakAtRisk", () => {
  it("is false when there is no streak yet", () => {
    expect(streakAtRisk("BT").atRisk).toBe(false)
  })

  it("is true when a 2+ day streak is unsecured today", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 8, 1, 9, 0, 0))
    recordDayActive("BT") // day 1 → streak 1
    vi.setSystemTime(new Date(2026, 8, 2, 9, 0, 0))
    recordDayActive("BT") // day 2 → streak 2
    vi.setSystemTime(new Date(2026, 8, 3, 9, 0, 0)) // day 3 — not active yet
    const r = streakAtRisk("BT")
    expect(r.streak).toBeGreaterThanOrEqual(2)
    expect(r.atRisk).toBe(true)
  })

  it("is false once today is secured", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 8, 1, 9, 0, 0))
    recordDayActive("BT")
    vi.setSystemTime(new Date(2026, 8, 2, 9, 0, 0))
    recordDayActive("BT")
    vi.setSystemTime(new Date(2026, 8, 3, 9, 0, 0))
    recordDayActive("BT") // secured today
    expect(streakAtRisk("BT").atRisk).toBe(false)
  })

  it("is false for a 1-day streak — not yet worth the nudge", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 8, 1, 9, 0, 0))
    recordDayActive("BT") // streak 1
    vi.setSystemTime(new Date(2026, 8, 2, 9, 0, 0)) // day 2, not active
    expect(streakAtRisk("BT").atRisk).toBe(false)
  })
})
