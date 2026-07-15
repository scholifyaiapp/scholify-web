import { describe, it, expect } from "vitest"
import { startModeForExperience } from "@/lib/acca-profile"

/*
 * Doc 12, Phase 1 — onboarding routes by experience.
 * A "new" learner must never be dropped into a cold diagnostic; a returner or a
 * professional should be measured. This is the pure decision behind that fork.
 */
describe("startModeForExperience", () => {
  it("sends a brand-new learner to learn-first (zero)", () => {
    expect(startModeForExperience("new")).toBe("zero")
  })

  it("sends anyone with a foundation straight to the diagnostic (assess)", () => {
    expect(startModeForExperience("some")).toBe("assess")
    expect(startModeForExperience("professional")).toBe("assess")
  })

  it("defaults an unknown learner to the diagnostic (the safe general default)", () => {
    expect(startModeForExperience(null)).toBe("assess")
  })
})
