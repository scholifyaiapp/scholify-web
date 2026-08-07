import { describe, it, expect } from "vitest"
import {
  getTodayDone,
  markTodayTaskDone,
  setPendingTodayTask,
  resolvePendingTodayTask,
  completePendingTodayTask,
  allocateTaskMinutes,
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
  it("uses the adaptive schedule instead of injecting every exam section each day", () => {
    const plan = buildTodayPlan("PM")
    expect(plan.some((item) => item.action === "study" || item.action === "diagnostic")).toBe(true)
    expect(plan.filter((item) => item.action === "section")).toHaveLength(0)
  })

  it("uses learner-facing Practice language instead of Drill", () => {
    expect(buildTodayPlan("BT").every((item) => !/^Drill\b/i.test(item.title))).toBe(true)
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
