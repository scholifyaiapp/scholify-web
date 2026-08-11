import { beforeEach, describe, it, expect } from "vitest"
import {
  getTodayDone,
  markTodayTaskDone,
  setPendingTodayTask,
  resolvePendingTodayTask,
  completePendingTodayTask,
  allocateTaskMinutes,
  pruneOldDayKeys,
  type TodayTask,
  buildTodayPlan,
} from "@/lib/acca-today"

const task = (action: TodayTask["action"]): TodayTask => ({ id: action, icon: "", title: action, detail: "", action })

describe("allocateTaskMinutes", () => {
  it("splits the daily budget across tasks, roughly summing to it", () => {
    const tasks = [task("study"), task("essentials"), task("practice"), task("flashcards")]
    const mins = allocateTaskMinutes(tasks, 60)
    expect(mins).toHaveLength(4)
    expect(mins.every((m) => m >= 1)).toBe(true)
    const total = mins.reduce((a, b) => a + b, 0)
    expect(total).toBe(60)
    // practice (heaviest weight) gets the biggest slice
    expect(Math.max(...mins)).toBe(mins[2])
  })

  it("never returns zero minutes and handles an empty plan", () => {
    expect(allocateTaskMinutes([], 60)).toEqual([])
    expect(allocateTaskMinutes([task("study")], 60)).toEqual([60])
  })

  it("allocates the complete budget exactly across a longer sectioned plan", () => {
    const tasks = [task("study"), task("essentials"), task("section"), task("section"), task("section"), task("flashcards")]
    expect(allocateTaskMinutes(tasks, 54).reduce((sum, minutes) => sum + minutes, 0)).toBe(54)
  })
})

describe("adaptive daily-plan structure", () => {
  it("always exposes one clear four-step in-app loop", () => {
    for (const paper of ["BT", "PM", "SBR", "AAA"]) {
      expect(buildTodayPlan(paper).map((item) => item.title)).toEqual(["Study", "Quiz", "Practice", "Flashcards"])
    }
  })

  it("keeps stable task ids so completion never duplicates or re-locks steps", () => {
    expect(buildTodayPlan("PM").map((item) => item.id)).toEqual(["study", "essentials", "practice", "flashcards"])
  })

  it("targets a real syllabus area while keeping the universal labels", () => {
    const plan = buildTodayPlan("BT")
    expect(plan.every((item) => item.area)).toBe(true)
    expect(plan[1].detail).toContain(plan[0].area)
  })
})

/*
 * Sequential daily-task unlock. The Today tab reveals the next task only once
 * the active one is finished — "finished" being proved by returning to the plan
 * after doing it (runToday stamps it pending; the tab resolves it on mount).
 * These are the store guarantees that machinery relies on.
 */

describe("today-plan sequential completion store", () => {
  it("starts empty and records completed tasks", () => {
    expect(getTodayDone("FA")).toEqual([])
    markTodayTaskDone("FA", "task-1")
    expect(getTodayDone("FA")).toEqual(["task-1"])
    markTodayTaskDone("FA", "task-2")
    expect(getTodayDone("FA")).toContain("task-1")
    expect(getTodayDone("FA")).toContain("task-2")
  })

  it("does not double-record the same task", () => {
    markTodayTaskDone("FA", "task-1")
    markTodayTaskDone("FA", "task-1")
    expect(getTodayDone("FA")).toEqual(["task-1"])
  })

  it("keeps completion separate per paper", () => {
    markTodayTaskDone("FA", "task-1")
    expect(getTodayDone("AA")).toEqual([])
  })

  it("resolves a pending task into done exactly once (the return-to-plan proof)", () => {
    setPendingTodayTask("FA", "task-1")
    expect(getTodayDone("FA")).toEqual([]) // launching alone doesn't complete it
    expect(resolvePendingTodayTask("FA")).toBe(true) // returning to the plan does
    expect(getTodayDone("FA")).toEqual(["task-1"])
    expect(resolvePendingTodayTask("FA")).toBe(false) // pending is consumed, no re-fire
  })

  it("only resolves a pending task for the paper it belongs to", () => {
    setPendingTodayTask("FA", "task-1")
    expect(resolvePendingTodayTask("AA")).toBe(false) // wrong paper — leaves it pending
    expect(getTodayDone("AA")).toEqual([])
    expect(resolvePendingTodayTask("FA")).toBe(true) // still resolvable for the right paper
    expect(getTodayDone("FA")).toEqual(["task-1"])
  })

  it("does not complete a reading task merely because the learner exits", () => {
    setPendingTodayTask("FA", "study-1", true)
    expect(resolvePendingTodayTask("FA")).toBe(false)
    expect(getTodayDone("FA")).toEqual([])
    expect(completePendingTodayTask("FA")).toBe(true)
    expect(getTodayDone("FA")).toEqual(["study-1"])
  })

  it("cannot explicitly complete another paper's reading task", () => {
    setPendingTodayTask("FA", "study-1", true)
    expect(completePendingTodayTask("AA")).toBe(false)
    expect(getTodayDone("FA")).toEqual([])
    expect(completePendingTodayTask("FA")).toBe(true)
  })
})

/*
 * DAY-SCOPED KEYS ARE GARBAGE AFTER THE DAY.
 *
 * Nothing reads a past day — getTodayDone looks at today only, and the streak
 * lives in its own store — so these ledgers grew one key per paper per day
 * forever. Every write here is inside a catch that ignores the error, so the
 * end of that road is localStorage hitting quota and the app silently ceasing
 * to record that anything was completed.
 */
describe("pruning old day ledgers", () => {
  const put = (key: string) => window.localStorage.setItem(key, "[]")

  beforeEach(() => window.localStorage.clear())

  it("drops ledgers past the retention window and keeps recent ones", () => {
    const now = new Date("2026-08-20T10:00:00")
    put("scholify-today-done-BT-2026-08-20") // today
    put("scholify-today-done-BT-2026-08-12") // 8 days — inside the window
    put("scholify-today-done-BT-2026-07-01") // ancient
    put("scholify-block-time-MA-2026-07-02") // ancient, other family

    expect(pruneOldDayKeys(now)).toBe(2)
    expect(window.localStorage.getItem("scholify-today-done-BT-2026-08-20")).not.toBeNull()
    expect(window.localStorage.getItem("scholify-today-done-BT-2026-08-12")).not.toBeNull()
    expect(window.localStorage.getItem("scholify-today-done-BT-2026-07-01")).toBeNull()
    expect(window.localStorage.getItem("scholify-block-time-MA-2026-07-02")).toBeNull()
  })

  it("never touches anything that is not a dated ledger", () => {
    // The plan, the profile, the shields, the notes — losing any of these to an
    // over-eager prune would be far worse than the leak it fixes.
    for (const key of ["scholify-plan-BT", "scholify-profile", "scholify-shields", "scholify-notes-BT"]) put(key)
    pruneOldDayKeys(new Date("2030-01-01T00:00:00"))
    for (const key of ["scholify-plan-BT", "scholify-profile", "scholify-shields", "scholify-notes-BT"]) {
      expect(window.localStorage.getItem(key), key).not.toBeNull()
    }
  })

  it("ignores a key whose tail is not a date", () => {
    put("scholify-today-done-BT-not-a-date")
    pruneOldDayKeys(new Date("2030-01-01T00:00:00"))
    expect(window.localStorage.getItem("scholify-today-done-BT-not-a-date")).not.toBeNull()
  })
})
