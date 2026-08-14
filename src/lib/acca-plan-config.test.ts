import { describe, expect, it } from "vitest"
import { configuredStudyDays, derivePlanUpdate, weeklyStudyHours } from "@/lib/acca-plan-config"
import { shapeDay, ambitionFactor } from "@/lib/acca-schedule"
import type { PaperPlan } from "@/lib/acca-plan"

const plan: PaperPlan = {
  examDate: "2026-12-07",
  dailyGoal: 15,
  studyTime: "19:00",
  dailyMinutes: 60,
  daysPerWeek: 5,
  studyDays: [1, 2, 3, 4, 5],
  targetProb: 75,
}

describe("professional study-plan configuration", () => {
  it("recalculates the question target when daily study time changes", () => {
    const update = derivePlanUpdate(plan, { dailyMinutes: 90 })
    expect(update.dailyGoal).toBe(shapeDay(90, 75).questionGoal)
  })

  it("recalculates the question target when readiness ambition changes", () => {
    const update = derivePlanUpdate(plan, { targetProb: 85 })
    expect(update.dailyGoal).toBe(shapeDay(60, 85).questionGoal)
    expect(ambitionFactor(85)).toBeGreaterThan(ambitionFactor(75))
  })

  it("normalises study days and keeps the weekly count in step", () => {
    const update = derivePlanUpdate(plan, { studyDays: [6, 2, 2, 9, -1] })
    expect(update.studyDays).toEqual([2, 6])
    expect(update.daysPerWeek).toBe(2)
  })

  it("does not allow an edit to remove the learner's final study day", () => {
    const update = derivePlanUpdate(plan, { studyDays: [] })
    expect(update.studyDays).toEqual([1, 2, 3, 4, 5])
    expect(update.daysPerWeek).toBe(5)
  })

  it("turns legacy day counts into an explicit schedule and reports capacity", () => {
    const legacy = { ...plan, studyDays: undefined, daysPerWeek: 4, dailyMinutes: 45 }
    expect(configuredStudyDays(legacy)).toEqual([1, 2, 3, 4])
    expect(weeklyStudyHours(legacy)).toBe(3)
  })
})

