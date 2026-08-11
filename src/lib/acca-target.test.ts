import { describe, expect, it } from "vitest"
import {
  TARGET_DEFAULT,
  TARGET_MAX,
  TARGET_MIN,
  TARGET_PRESETS,
  clampTarget,
  targetBand,
  targetConsequence,
} from "@/lib/acca-target"
import { ambitionFactor, shapeDay } from "@/lib/acca-schedule"
import { buildOnboardingGuide } from "@/lib/acca-onboarding-guide"

/*
 * THE TARGET the learner actually chooses.
 *
 * Until this step existed, nobody was asked: the control sat on a slide that
 * onboardingSteps filtered out, so every plan in production used the `?? 75`
 * fallback while the app showed "THE ROAD TO 75%" as though it had been chosen.
 *
 * What these tests protect is that the number is REAL — that picking 85 changes
 * the day, that a chosen value survives into the stored plan rather than being
 * quietly replaced, and that the sentence shown to the learner matches what the
 * scheduler then does.
 */

describe("the accepted range", () => {
  it("stops at the pass mark and at 95", () => {
    // buildOnboardingGuide only honours a selected target within 50-95; outside
    // that it silently substitutes Charles's recommendation. A picker offering
    // 100 would appear to accept it and store something else.
    expect(TARGET_MIN).toBe(50)
    expect(TARGET_MAX).toBe(95)
  })

  it("clamps anything out of range instead of passing it through", () => {
    expect(clampTarget(10)).toBe(TARGET_MIN)
    expect(clampTarget(100)).toBe(TARGET_MAX)
    expect(clampTarget(73.4)).toBe(73)
    expect(clampTarget(Number.NaN)).toBe(TARGET_DEFAULT)
    expect(clampTarget(Number.POSITIVE_INFINITY)).toBe(TARGET_DEFAULT)
  })

  it("keeps every clamped value inside what the guide will honour", () => {
    for (const raw of [-50, 0, 49, 50, 75, 95, 96, 1000]) {
      const value = clampTarget(raw)
      expect(value, `raw=${raw}`).toBeGreaterThanOrEqual(50)
      expect(value, `raw=${raw}`).toBeLessThanOrEqual(95)
    }
  })
})

describe("the three presets", () => {
  it("is exactly three, one per gear the scheduler actually has", () => {
    // A fourth option (90% "Ambitious" used to exist) builds an identical day
    // to 85% — ambitionFactor has three bands, so a fourth choice would change
    // the wording and nothing else.
    expect(TARGET_PRESETS).toHaveLength(3)
    const factors = TARGET_PRESETS.map((p) => ambitionFactor(p.value))
    expect(new Set(factors).size).toBe(3)
  })

  it("puts each preset in a different band, in ascending order", () => {
    const values = TARGET_PRESETS.map((p) => p.value)
    expect(values).toEqual([...values].sort((a, b) => a - b))
    expect(new Set(TARGET_PRESETS.map((p) => targetBand(p.value).key)).size).toBe(3)
  })

  it("offers the recommended default as one of them", () => {
    expect(TARGET_PRESETS.some((p) => p.value === TARGET_DEFAULT)).toBe(true)
  })
})

describe("what a target does to the day", () => {
  it("reports the uplift the scheduler will actually apply", () => {
    expect(targetBand(65).upliftPercent).toBe(0)
    expect(targetBand(75).upliftPercent).toBe(10)
    expect(targetBand(85).upliftPercent).toBe(35)
  })

  it("derives bands from ambitionFactor rather than restating its thresholds", () => {
    // The boundary cases are where a second copy of the thresholds would drift.
    expect(targetBand(74).key).toBe("steady")
    expect(targetBand(75).key).toBe("confident")
    expect(targetBand(84).key).toBe("confident")
    expect(targetBand(85).key).toBe("bulletproof")
  })

  it("NEVER gives a higher target a smaller day", () => {
    /*
     * The inversion this caught. Ambition raises the practice ceiling, so a
     * bigger cap made the first topic cycle eat minutes the second needed: at
     * 120 minutes an 85% target returned 45 questions where 65% returned 53.
     * Asking for more got you 15% less.
     *
     * It only became reachable when the target became a real question — before
     * that every learner sat on the 75% fallback.
     */
    for (const minutes of [12, 25, 40, 60, 75, 90, 120, 150, 180, 240]) {
      const goals = [50, 65, 75, 85, 95].map((t) => shapeDay(minutes, t).questionGoal)
      for (let i = 1; i < goals.length; i++) {
        expect(goals[i], `${minutes} min: aiming higher must not shrink the day (${goals.join(" → ")})`)
          .toBeGreaterThanOrEqual(goals[i - 1])
      }
    }
  })

  it("quotes the learner's real day rather than a percentage that is usually false", () => {
    /*
     * "About 35% more practice a day" reads well and is wrong for most people:
     * ambition raises a CEILING, so below roughly 90 minutes the minute budget
     * binds first and the target changes nothing. 40 and 60 are the two
     * commonest answers on the previous step.
     */
    expect(shapeDay(40, 65).questionGoal).toBe(shapeDay(40, 85).questionGoal)
    expect(shapeDay(60, 65).questionGoal).toBe(shapeDay(60, 85).questionGoal)

    // So the line must not claim a difference at 60 minutes...
    expect(targetConsequence(85, 60)).not.toContain("more than")
    expect(targetConsequence(85, 60)).toContain(`${shapeDay(60, 85).questionGoal} questions`)

    // ...and must report the real one where it exists.
    expect(targetConsequence(85, 180)).toContain("more than a 65% target")
  })

  it("never promises a mark, at any target or pace", () => {
    for (const value of [50, 65, 75, 85, 95]) {
      for (const minutes of [40, 60, 120]) {
        const line = targetConsequence(value, minutes).toLowerCase()
        for (const claim of ["guarantee", "will pass", "ensures"]) {
          expect(line, `value=${value} minutes=${minutes}`).not.toContain(claim)
        }
      }
    }
  })
})

describe("the chosen number survives into the plan", () => {
  /*
   * THE POINT OF THE WHOLE STEP. Welcome feeds the learner's target into
   * buildOnboardingGuide and then stores `recommendedTarget` back onto the
   * plan. That round-trip is only faithful while the value is inside 50-95 —
   * outside it, the guide substitutes Charles's own number and the learner's
   * explicit choice disappears with nothing logged.
   */
  const guideFor = (targetPercentage: number) =>
    buildOnboardingGuide({
      paperId: "BT",
      route: "new",
      englishLevel: "B2",
      minutesPerDay: 60,
      daysPerWeek: 6,
      examDate: "",
      targetPercentage,
      contentHours: 120,
    })

  it("echoes back every value the picker can produce", () => {
    for (const raw of [-10, 0, 49, 50, 51, 65, 75, 85, 94, 95, 96, 200]) {
      const chosen = clampTarget(raw)
      expect(guideFor(chosen).recommendedTarget, `raw=${raw} → ${chosen}`).toBe(chosen)
    }
  })

  it("would have lost the choice without the clamp", () => {
    // Proof the range matters rather than being decorative: an unclamped 100
    // does NOT come back as 100.
    expect(guideFor(100).recommendedTarget).not.toBe(100)
  })
})
