import { describe, it, expect, beforeEach } from "vitest"
import {
  recordDayComplete,
  todayCompletion,
  completionHistory,
  tomorrowGate,
  isMilestone,
  markCongratulationSent,
  congratulationSent,
} from "@/lib/acca-day-gate"
import { setPlan } from "@/lib/acca-plan"

/*
 * The DAY GATE — finishing today closes today.
 *
 * The behaviour this replaces: completing the day congratulated the learner and
 * then left every surface open, so the diligent ones did tomorrow's work tonight,
 * arrived tomorrow with nothing to do, and the daily loop — the entire retention
 * mechanism — died in week two. It hurt the committed learners most.
 *
 * The two properties that have to hold: the completion flips EXACTLY ONCE per
 * calendar day (or the congratulation email fires on every reload), and the lock
 * opens at the study time the learner themselves chose (or the promise the reminder
 * emails make is a different promise from the one the button keeps).
 */

beforeEach(() => {
  window.localStorage.clear()
})

describe("recordDayComplete — exactly once a day", () => {
  it("flips the day and starts the streak", () => {
    const first = recordDayComplete("BT")
    expect(first.firstTime).toBe(true)
    expect(first.streak).toBeGreaterThanOrEqual(1)
    expect(todayCompletion("BT")).toBeTruthy()
  })

  it("is idempotent — a reload must not fire the congratulation twice", () => {
    const first = recordDayComplete("BT")
    const second = recordDayComplete("BT")
    expect(second.firstTime).toBe(false)
    expect(second.streak).toBe(first.streak)
    expect(second.milestone).toBe(false)
    expect(completionHistory("BT")).toHaveLength(1)
  })

  it("keeps papers independent", () => {
    recordDayComplete("BT")
    expect(todayCompletion("MA")).toBeNull()
    expect(recordDayComplete("MA").firstTime).toBe(true)
  })

  it("records the congratulation as sent, once", () => {
    recordDayComplete("BT")
    expect(congratulationSent("BT")).toBe(false)
    markCongratulationSent("BT")
    expect(congratulationSent("BT")).toBe(true)
  })

  it("does not mark a congratulation for a day that was never completed", () => {
    markCongratulationSent("BT")
    expect(congratulationSent("BT")).toBe(false)
  })
})

describe("isMilestone — escalation, so streak mail does not become wallpaper", () => {
  it("celebrates the days that actually mean something", () => {
    for (const n of [2, 3, 7, 14, 21, 30, 60, 90]) expect(isMilestone(n), `day ${n}`).toBe(true)
  })

  it("stays quiet on the days in between", () => {
    for (const n of [1, 4, 5, 8, 15, 29, 31, 45]) expect(isMilestone(n), `day ${n}`).toBe(false)
  })
})

describe("tomorrowGate — the lock", () => {
  it("opens at the study time the learner chose, tomorrow", () => {
    setPlan("BT", { studyTime: "07:30" })
    const gate = tomorrowGate("BT")
    expect(gate.unlocksAt.getHours()).toBe(7)
    expect(gate.unlocksAt.getMinutes()).toBe(30)
    expect(gate.timeLabel).toBe("07:30 tomorrow")
    const today = new Date()
    expect(gate.unlocksAt.getDate()).toBe(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getDate())
  })

  it("defaults to 19:00 on a missing or malformed time rather than throwing", () => {
    for (const studyTime of [null, "", "nonsense", "25:00", "12:99"]) {
      setPlan("BT", { studyTime: studyTime as string | null })
      expect(tomorrowGate("BT").unlocksAt.getHours(), String(studyTime)).toBe(19)
    }
  })

  it("is locked with a countdown while the time is still ahead", () => {
    setPlan("BT", { studyTime: "08:00" })
    const gate = tomorrowGate("BT", new Date())
    expect(gate.locked).toBe(true)
    expect(gate.secondsUntil).toBeGreaterThan(0)
    expect(gate.countdownLabel).toMatch(/in \d+/)
  })

  it("reports open once the moment has passed", () => {
    setPlan("BT", { studyTime: "08:00" })
    const gate = tomorrowGate("BT")
    // "Now" moved past the unlock moment.
    const after = tomorrowGate("BT", new Date(gate.unlocksAt.getTime() + 60_000))
    expect(after.locked).toBe(false)
    expect(after.secondsUntil).toBe(0)
    expect(after.countdownLabel).toBe("open now")
  })

  it("carries the rest note, naming the time and tomorrow's streak day", () => {
    setPlan("BT", { studyTime: "06:15" })
    recordDayComplete("BT")
    const gate = tomorrowGate("BT")
    // The note IS the instruction — the lock must never read as a punishment.
    expect(gate.restNote).toContain("relax")
    expect(gate.restNote).toContain("06:15")
    expect(gate.restNote).toContain(`day ${gate.tomorrowStreakDay}`)
    expect(gate.tomorrowStreakDay).toBeGreaterThanOrEqual(2)
  })

  it("counts tomorrow as the day after the current streak", () => {
    setPlan("BT", { studyTime: "19:00" })
    const before = tomorrowGate("BT").tomorrowStreakDay
    recordDayComplete("BT")
    expect(tomorrowGate("BT").tomorrowStreakDay).toBe(before + 1)
  })
})
