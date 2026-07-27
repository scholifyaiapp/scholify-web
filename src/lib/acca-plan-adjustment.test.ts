import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  getPaperPause,
  getPaperSwitches,
  pausePaper,
  recordPaperSwitch,
  resumePaper,
} from "@/lib/acca-plan-adjustment"

describe("plan adjustments preserve paper history", () => {
  beforeEach(() => window.localStorage.clear())

  it("pauses and resumes without touching learning-data keys", () => {
    window.localStorage.setItem("scholify-acca-stats", JSON.stringify({ FA: { answered: 42 } }))
    vi.setSystemTime(new Date("2026-07-26T12:00:00Z"))

    pausePaper("FA", "illness", "2026-08-10")
    expect(getPaperPause("FA")).toMatchObject({ paperId: "FA", reason: "illness", returnDate: "2026-08-10" })
    expect(window.localStorage.getItem("scholify-acca-stats")).toBe(JSON.stringify({ FA: { answered: 42 } }))

    resumePaper("FA")
    expect(getPaperPause("FA")).toBeNull()
    expect(window.localStorage.getItem("scholify-acca-stats")).toBe(JSON.stringify({ FA: { answered: 42 } }))
    vi.useRealTimers()
  })

  it("archives a paper switch as history and leaves both plans untouched", () => {
    const plans = JSON.stringify({ FA: { targetProb: 75 }, LW: { targetProb: 85 } })
    window.localStorage.setItem("scholify-acca-plan", plans)

    recordPaperSwitch("FA", "LW", "difficulty")

    expect(getPaperSwitches()).toHaveLength(1)
    expect(getPaperSwitches()[0]).toMatchObject({ fromPaper: "FA", toPaper: "LW", reason: "difficulty" })
    expect(window.localStorage.getItem("scholify-acca-plan")).toBe(plans)
  })
})
