import { describe, it, expect, beforeEach } from "vitest"
import {
  saveOnboardingDraft,
  readOnboardingDraft,
  clearOnboardingDraft,
  type OnboardingDraft,
} from "@/lib/acca-onboarding-draft"
import { onboardingSteps, STEP_LABELS, ONBOARDING_TOTAL } from "@/lib/acca-onboarding-steps"

/*
 * THE GAP THIS CLOSES. Every /welcome answer lived in component useState and
 * nowhere else, so a reload, a closed tab, or a phone dropping the page out of
 * memory threw all of it away and restarted the learner at step 0 — after they
 * had already picked their papers passed, their English level and their sitting.
 * On a nine-step form that is the single most likely place to lose someone, and
 * it failed silently.
 */

const KEY = "scholify-onboarding-draft"

const FULL: OnboardingDraft = {
  step: 5,
  learnerRoute: "practice",
  passed: ["BT", "MA"],
  paper: "FR",
  paperVariant: null,
  minutes: 90,
  daysPerWeek: 5,
  slot: "06:40",
  examDate: "2026-12-02",
  pickedSitting: "2026-12-02",
  goal: "first-pass",
  target: 85,
  englishLevel: "B2",
  englishEvidence: "self",
  resultChoice: "diagnostic",
}

describe("onboarding draft", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("round-trips every answer a learner has given", () => {
    saveOnboardingDraft(FULL)
    expect(readOnboardingDraft()).toEqual(FULL)
  })

  it("returns nothing when there is no draft", () => {
    expect(readOnboardingDraft()).toBeNull()
  })

  it("is cleared once onboarding is committed", () => {
    saveOnboardingDraft(FULL)
    clearOnboardingDraft()
    expect(readOnboardingDraft(), "a finished run must not offer to resume").toBeNull()
  })

  /*
   * "Step 0, nothing answered" is indistinguishable from a fresh start, and a
   * route-less draft has nothing the learner would recognise as progress.
   * Restoring either would make resume fire for people who answered nothing.
   */
  it("ignores a draft with no real progress in it", () => {
    saveOnboardingDraft({ ...FULL, step: 0 })
    expect(readOnboardingDraft()).toBeNull()
    saveOnboardingDraft({ ...FULL, learnerRoute: null })
    expect(readOnboardingDraft()).toBeNull()
  })

  it("discards a draft written by a different version of the form", () => {
    saveOnboardingDraft(FULL)
    const stored = JSON.parse(window.localStorage.getItem(KEY) as string)
    window.localStorage.setItem(KEY, JSON.stringify({ ...stored, v: 999 }))
    expect(readOnboardingDraft(), "a shape change must not half-restore").toBeNull()
  })

  it("expires a long-abandoned draft rather than resuming it months later", () => {
    saveOnboardingDraft(FULL)
    const stored = JSON.parse(window.localStorage.getItem(KEY) as string)
    const old = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    window.localStorage.setItem(KEY, JSON.stringify({ ...stored, savedAt: old }))
    expect(readOnboardingDraft()).toBeNull()
  })

  it("survives corrupted storage without throwing", () => {
    window.localStorage.setItem(KEY, "{not json")
    expect(() => readOnboardingDraft()).not.toThrow()
    expect(readOnboardingDraft()).toBeNull()
  })

  it("falls back to sane defaults for a partially-written draft", () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ v: 1, savedAt: new Date().toISOString(), step: 3, learnerRoute: "new" }),
    )
    const restored = readOnboardingDraft()
    expect(restored).not.toBeNull()
    expect(restored!.minutes).toBe(60)
    expect(restored!.daysPerWeek).toBe(6)
    expect(restored!.target).toBe(75)
    expect(restored!.passed).toEqual([])
  })
})

/*
 * The progress rail names steps by STEP NUMBER, not by position — the same
 * reason SLIDE_POSES does. A route that hides a slide must not shift every label
 * after it onto the wrong question.
 */
describe("step labels", () => {
  it("has a label for every step the deck can author", () => {
    expect(STEP_LABELS).toHaveLength(ONBOARDING_TOTAL)
    for (const label of STEP_LABELS) expect(label.length).toBeGreaterThan(0)
  })

  it("labels every step each route actually shows", () => {
    for (const route of [null, "new", "course", "practice"] as const) {
      for (const step of onboardingSteps(route)) {
        expect(STEP_LABELS[step], `route=${route} step=${step}`).toBeTruthy()
      }
    }
  })

  it("stays aligned to step numbers when a route hides a slide", () => {
    // "new" hides the baseline step (8). The label for every visible step must
    // still be that step's own name, not its neighbour's.
    const visible = onboardingSteps("new")
    expect(visible).not.toContain(8)
    expect(STEP_LABELS[visible[visible.length - 1]]).toBe("Ready")
    expect(STEP_LABELS[5]).toBe("Time")
  })
})
