import { describe, expect, it } from "vitest"
import { SETUP_KEYS } from "@/lib/account-state"

/*
 * SETUP_KEYS is the one definition of "setup, not progress". Two consumers rely
 * on it meaning exactly that:
 *
 *   · account-state syncs these keys to durable auth metadata,
 *   · Settings' "reset my progress" preserves them (RESET_KEEP is built from it).
 *
 * Those were separate hand-maintained lists and they drifted:
 * scholify-acca-learner-baseline and scholify-acca-study-resources were added to
 * the sync list but not the keep list, so a reset deleted the learner's route,
 * English level and study-resource profile while KEEPING
 * scholify-acca-onboarded — so onboarding never re-ran and there was no way to
 * re-enter any of it. This pins the contents so a new setup key cannot be added
 * to one place and silently forgotten in the other.
 */

const EXPECTED = [
  "scholify-acca-onboarded",
  "scholify-acca-current-paper",
  "scholify-acca-studying",
  "scholify-acca-passed",
  "scholify-acca-paper-variants",
  "scholify-acca-startmode",
  "scholify-acca-experience",
  "scholify-acca-goal",
  "scholify-acca-plan",
  "scholify-acca-daily-goal",
  "scholify-acca-learner-baseline",
  "scholify-acca-study-resources",
]

describe("SETUP_KEYS", () => {
  it("is exactly the onboarding setup set", () => {
    expect([...SETUP_KEYS].sort()).toEqual([...EXPECTED].sort())
  })

  it("includes the onboarding profile a reset must never destroy", () => {
    // These two are the ones that had drifted. Losing them leaves the learner
    // onboarded-but-unprofiled: Charles silently reverts to advanced English and
    // the daily plan loses the provider and chapter it was sequencing against.
    expect(SETUP_KEYS).toContain("scholify-acca-learner-baseline")
    expect(SETUP_KEYS).toContain("scholify-acca-study-resources")
  })

  it("contains no duplicates and only acca-namespaced keys", () => {
    expect(new Set(SETUP_KEYS).size).toBe(SETUP_KEYS.length)
    for (const key of SETUP_KEYS) expect(key.startsWith("scholify-acca-")).toBe(true)
  })

  it("holds setup only — never a progress or history store", () => {
    // Question history, notes, streaks and diagnostics have their own sync paths
    // and must not ride along in auth JWT metadata (size) or survive a reset
    // (that is what the learner asked to clear).
    for (const banned of [
      "scholify-acca-progress",
      "scholify-acca-shield",
      "scholify-acca-diagnostics",
      "scholify-acca-notes",
      "scholify-acca-flashcards",
      "scholify-acca-bankruns",
      "scholify-acca-plan-adjustments",
    ]) {
      expect(SETUP_KEYS, `${banned} is progress, not setup`).not.toContain(banned)
    }
  })
})
