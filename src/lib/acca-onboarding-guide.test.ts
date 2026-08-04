import { describe, it, expect } from "vitest"
import {
  buildOnboardingGuide,
  MIN_DAILY_MINUTES,
  TARGET_DAILY_MINUTES,
  type OnboardingGuideInput,
} from "@/lib/acca-onboarding-guide"

/*
 * Charles's capacity verdict, and the fixes he offers for it.
 *
 * The old guide only DESCRIBED a shortfall ("Choose a later sitting or add time
 * only if you can sustain it"), leaving the learner to do the arithmetic and walk
 * back through the deck themselves. These tests pin the property that makes the
 * new version a recommendation rather than a warning: every fix, if applied,
 * actually clears the warning.
 */

const NOW = new Date("2026-08-01T12:00:00Z")

/** An exam date `weeks` from NOW, as the deck would store it. */
const inWeeks = (weeks: number) =>
  new Date(NOW.getTime() + weeks * 604800000).toISOString().slice(0, 10)

const base: OnboardingGuideInput = {
  paperId: "FR",
  route: "new",
  englishLevel: "B2",
  minutesPerDay: 60,
  daysPerWeek: 6,
  examDate: inWeeks(30),
}

describe("buildOnboardingGuide — the capacity verdict", () => {
  it("lets Charles choose a paper-aware target and future exam window", () => {
    const knowledge = buildOnboardingGuide({ ...base, paperId: "BT", route: "new", examDate: null }, NOW)
    const strategicRetake = buildOnboardingGuide({ ...base, paperId: "AAA", route: "practice", examDate: null }, NOW)
    expect(knowledge.recommendedTarget).toBe(72)
    expect(strategicRetake.recommendedTarget).toBe(82)
    expect(new Date(strategicRetake.recommendedExamDate).getTime()).toBeGreaterThan(NOW.getTime())
    expect(strategicRetake.recommendedExamLabel).toContain("exam window")
  })

  it("honours the learner's ambitious target and exact exam date", () => {
    const g = buildOnboardingGuide({
      ...base,
      targetPercentage: 85,
      examDate: "2026-12-02",
    }, NOW)
    expect(g.recommendedTarget).toBe(85)
    expect(g.recommendedExamDate).toBe("2026-12-02")
    expect(g.recommendedExamLabel).toBe("Wednesday, 2 December 2026")
  })
  it("offers no fixes when there is enough time", () => {
    const g = buildOnboardingGuide(base, NOW)
    expect(g.status).not.toBe("risky")
    expect(g.fixes).toHaveLength(0)
    expect(g.deficitHours).toBe(0)
  })

  it("flags a real shortfall and names it in hours", () => {
    const g = buildOnboardingGuide({ ...base, minutesPerDay: 40, examDate: inWeeks(6) }, NOW)
    expect(g.status).toBe("risky")
    expect(g.deficitHours).toBeGreaterThan(0)
    expect(g.coverage).toBeLessThan(1)
    expect(g.fixes.length).toBeGreaterThan(0)
  })

  /*
   * The property that matters. A fix that does not clear the warning is worse
   * than no fix: the learner taps it, is returned to the summary, and is told
   * they are still short.
   */
  it("every offered fix actually clears the warning when applied", () => {
    const tight = { ...base, minutesPerDay: 40, daysPerWeek: 5, examDate: inWeeks(8) }
    const g = buildOnboardingGuide(tight, NOW)
    expect(g.status).toBe("risky")
    expect(g.fixes.length).toBeGreaterThan(0)

    for (const fix of g.fixes) {
      if (fix.kind === "minutes") {
        const after = buildOnboardingGuide({ ...tight, minutesPerDay: fix.to }, NOW)
        expect(after.status, `minutes -> ${fix.to}`).not.toBe("risky")
      }
      if (fix.kind === "days") {
        const after = buildOnboardingGuide({ ...tight, daysPerWeek: fix.to }, NOW)
        expect(after.status, `days -> ${fix.to}`).not.toBe("risky")
      }
      if (fix.kind === "sitting") {
        // Moving the exam out by the weeks Charles asked for must be enough.
        const after = buildOnboardingGuide(
          { ...tight, examDate: inWeeks(8 + fix.weeksNeeded) },
          NOW,
        )
        expect(after.status, `+${fix.weeksNeeded} weeks`).not.toBe("risky")
      }
    }
  })

  it("never proposes an unsustainable daily load", () => {
    // Two weeks to a Strategic paper cannot be fixed with minutes, and pretending
    // it can ("study 9 hours a day") is how you lose the learner entirely.
    const g = buildOnboardingGuide(
      { ...base, paperId: "AAA", minutesPerDay: 40, examDate: inWeeks(2) },
      NOW,
    )
    expect(g.status).toBe("risky")
    for (const fix of g.fixes) {
      if (fix.kind === "minutes") expect(fix.to).toBeLessThanOrEqual(180)
    }
    // Moving the sitting must always remain on the table as the honest option.
    expect(g.fixes.some((f) => f.kind === "sitting")).toBe(true)
  })

  it("always offers a later sitting, and lists it last", () => {
    const g = buildOnboardingGuide({ ...base, minutesPerDay: 40, examDate: inWeeks(6) }, NOW)
    expect(g.fixes[g.fixes.length - 1].kind, "keeping the sitting is what the learner wants").toBe("sitting")
  })

  it("never offers a fix that is not an increase", () => {
    const g = buildOnboardingGuide({ ...base, minutesPerDay: 120, daysPerWeek: 7, examDate: inWeeks(5) }, NOW)
    for (const fix of g.fixes) {
      if (fix.kind === "minutes") expect(fix.to).toBeGreaterThan(120)
      if (fix.kind === "days") expect(fix.to).toBeGreaterThan(7)
    }
  })

  describe("the minimum-time nudge", () => {
    it("fires at the floor of the picker", () => {
      const g = buildOnboardingGuide({ ...base, minutesPerDay: MIN_DAILY_MINUTES }, NOW)
      expect(g.minutesNudge).toBeTruthy()
      expect(g.minutesNudge).toContain(String(TARGET_DAILY_MINUTES))
    })

    it("is independent of the capacity verdict", () => {
      // A year to go is not a capacity problem, but the floor is still below the
      // pace that passes — so the nudge stands while the status is comfortable.
      const g = buildOnboardingGuide(
        { ...base, minutesPerDay: MIN_DAILY_MINUTES, examDate: inWeeks(52) },
        NOW,
      )
      expect(g.status).toBe("comfortable")
      expect(g.minutesNudge).toBeTruthy()
    })

    it("stops once the learner is above the floor", () => {
      expect(buildOnboardingGuide({ ...base, minutesPerDay: 60 }, NOW).minutesNudge).toBeNull()
    })
  })

  it("says nothing about a deficit when there is no exam date to be short against", () => {
    const g = buildOnboardingGuide({ ...base, examDate: null }, NOW)
    expect(g.availableWeeks).toBeNull()
    expect(g.deficitHours).toBe(0)
    expect(g.fixes).toHaveLength(0)
  })
})

/*
 * The original three cases for this module, kept verbatim: the load model
 * (harder paper + new learner = more runway), the date-cannot-fit flag, and the
 * "focused is not a warning" boundary. The suite above adds the fixes; these
 * still pin the estimate they are computed from.
 */
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
