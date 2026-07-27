import { describe, expect, it } from "vitest"
import { buildOnboardingGuide } from "@/lib/acca-onboarding-guide"

describe("Charles onboarding study guide", () => {
  it("requires more runway for a new learner on a harder paper", () => {
    const newSbr = buildOnboardingGuide({ paperId: "SBR", route: "new", englishLevel: "B1", minutesPerDay: 60, daysPerWeek: 6, examDate: null })
    const retakeBt = buildOnboardingGuide({ paperId: "BT", route: "practice", englishLevel: "C1", minutesPerDay: 60, daysPerWeek: 6, examDate: null })
    expect(newSbr.recommendedWeeks).toBeGreaterThan(retakeBt.recommendedWeeks)
  })

  it("flags a date that cannot fit the estimated preparation", () => {
    const guide = buildOnboardingGuide(
      { paperId: "ATX", route: "new", englishLevel: "B1", minutesPerDay: 40, daysPerWeek: 4, examDate: "2026-08-20" },
      new Date("2026-07-26T12:00:00Z"),
    )
    expect(guide.status).toBe("risky")
    expect(guide.availableWeeks).toBeLessThan(guide.recommendedWeeks)
  })

  it("treats a three-month TX plan at two hours a day as focused, not aggressive", () => {
    const guide = buildOnboardingGuide(
      { paperId: "TX", route: "new", englishLevel: "B2", minutesPerDay: 120, daysPerWeek: 6, examDate: "2026-12-02" },
      new Date("2026-09-01T12:00:00Z"),
    )
    expect(guide.status).toBe("focused")
    expect(guide.headline).toContain("realistic")
    expect(guide.advice.join(" ")).not.toContain("later sitting")
  })
})
