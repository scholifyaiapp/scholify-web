import { beforeEach, describe, expect, it } from "vitest"
import { getLearnerBaseline, learnerBaselineLine, saveLearnerBaseline } from "./acca-learner-baseline"

beforeEach(() => localStorage.clear())

describe("learner journey persistence", () => {
  it("stores the selected journey and assessment path", () => {
    saveLearnerBaseline({
      route: "practice",
      englishLevel: "B2",
      englishEvidence: "self",
      assessmentPath: "timed-practice",
      updatedAt: "2026-07-27T00:00:00.000Z",
    })
    expect(getLearnerBaseline()).toMatchObject({
      route: "practice",
      assessmentPath: "timed-practice",
    })
    expect(learnerBaselineLine()).toContain("focused on exam practice")
  })

  it("migrates the previous retaker journey into exam practice", () => {
    localStorage.setItem("scholify-acca-learner-baseline", JSON.stringify({
      route: "retaker",
      englishLevel: "C1",
      englishEvidence: "self",
      updatedAt: "2026-07-01T00:00:00.000Z",
    }))
    expect(getLearnerBaseline()?.route).toBe("practice")
  })
})
