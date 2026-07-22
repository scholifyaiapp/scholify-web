import { describe, it, expect } from "vitest"
import {
  getTodayDone,
  markTodayTaskDone,
  setPendingTodayTask,
  resolvePendingTodayTask,
} from "@/lib/acca-today"

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
})
