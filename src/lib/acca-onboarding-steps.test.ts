import { describe, expect, it } from "vitest"
import {
  onboardingSteps,
  ONBOARDING_TOTAL,
  ROUTE_STEP,
  RESOURCE_STEP,
  ASSESSMENT_STEP,
  EXAM_DATE_STEP,
  TARGET_STEP,
  SLIDE_POSES,
} from "@/lib/acca-onboarding-steps"

/*
 * The onboarding deck is a CONTRACT with the study engine: currentPhase() and the
 * study-order logic are both built from the route this deck collects.
 *
 * The bug this pins was invisible and expensive. A second, shorter flow sat behind
 * a date gate and skipped the route question — and that shorter flow was the one
 * that shipped. persist() only calls saveLearnerBaseline when a route, an English
 * level and its evidence are all present, so it never fired: getLearnerBaseline()
 * returned null for every learner in production, and the entire route-based plan
 * was dead code while looking perfectly healthy in tests.
 */

describe("onboarding flow", () => {
  it("ALWAYS asks the route question — the plan is built from it", () => {
    for (const route of [null, "new", "course", "practice"] as const) {
      expect(onboardingSteps(route), `route=${route}`).toContain(ROUTE_STEP)
    }
  })

  it("never shows the Kaplan/BPP resource picker", () => {
    for (const route of [null, "new", "course", "practice"] as const) {
      expect(onboardingSteps(route), `route=${route}`).not.toContain(RESOURCE_STEP)
    }
  })

  it("lets Charles choose the exam window instead of asking the learner", () => {
    for (const route of [null, "new", "course", "practice"] as const) {
      expect(onboardingSteps(route)).not.toContain(EXAM_DATE_STEP)
    }
  })

  it("ASKS for the target, on every route", () => {
    /*
     * This used to assert the opposite, on the reasoning that Charles could
     * pick the target too. He could not: the target control lived on the same
     * hidden slide as the goal question, so nobody was asked and every plan
     * used the `?? 75` fallback while the app displayed "THE ROAD TO 75%" as
     * though the learner had chosen it.
     *
     * targetProb scales daily practice volume (ambitionFactor), moves the
     * recommended exam date, and is the line every readiness meter is measured
     * against. It is the one number in the plan that is purely the learner's
     * call, so it has its own step now.
     */
    for (const route of [null, "new", "course", "practice"] as const) {
      expect(onboardingSteps(route), `route=${route}`).toContain(TARGET_STEP)
    }
  })

  it("asks a returner how to baseline themselves, and spares a beginner", () => {
    expect(onboardingSteps("course")).toContain(ASSESSMENT_STEP)
    expect(onboardingSteps("practice")).toContain(ASSESSMENT_STEP)
    expect(onboardingSteps("new")).not.toContain(ASSESSMENT_STEP)
  })

  it("is one flow, in order, with no duplicates and nothing out of range", () => {
    for (const route of [null, "new", "course", "practice"] as const) {
      const steps = onboardingSteps(route)
      expect(new Set(steps).size, `route=${route}`).toBe(steps.length)
      expect([...steps].sort((a, b) => a - b), `route=${route}`).toEqual(steps)
      for (const step of steps) {
        expect(step).toBeGreaterThanOrEqual(0)
        expect(step).toBeLessThan(ONBOARDING_TOTAL)
      }
    }
  })

  it("opens on the welcome slide and closes on the summary", () => {
    const steps = onboardingSteps("course")
    expect(steps[0]).toBe(0)
    expect(steps[steps.length - 1]).toBe(ONBOARDING_TOTAL - 1)
  })
})

/*
 * Charles appears in the corner of the WRITING panel on every slide, in both the
 * desktop and mobile layouts. He previously lived in the desktop visual panel and
 * was absent from mobile entirely.
 *
 * The renderer falls back to "wave" for a missing pose, so a slide added without
 * one would silently get the wrong expression rather than failing — this is what
 * catches that.
 */
describe("the slide mascot", () => {
  it("has an explicit pose for every step the flow can show", () => {
    for (const route of [null, "new", "course", "practice"] as const) {
      for (const step of onboardingSteps(route)) {
        expect(SLIDE_POSES[step], `step ${step} (route=${route}) has no pose`).toBeTruthy()
      }
    }
  })

  it("covers every authored slide index, so adding a step cannot outrun it", () => {
    expect(SLIDE_POSES).toHaveLength(ONBOARDING_TOTAL)
  })

  it("opens on a greeting and closes on a celebration", () => {
    expect(SLIDE_POSES[0]).toBe("wave")
    expect(SLIDE_POSES[ONBOARDING_TOTAL - 1]).toBe("success")
  })
})
