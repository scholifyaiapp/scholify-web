import { describe, expect, it } from "vitest"
import { choiceTabIndex, nextChoiceIndex } from "@/lib/acca-onboarding-choice"

/*
 * These two functions are the whole keyboard contract of the onboarding
 * selection controls. There is no render test available (vitest runs in the
 * "node" environment), so this file is the only thing standing between a typo
 * and a radiogroup that keyboard users cannot escape or cannot enter.
 */

describe("nextChoiceIndex", () => {
  it("moves forward on both forward arrows, and wraps at the end", () => {
    for (const key of ["ArrowRight", "ArrowDown"]) {
      expect(nextChoiceIndex(key, 0, 4), key).toBe(1)
      expect(nextChoiceIndex(key, 3, 4), `${key} wraps`).toBe(0)
    }
  })

  it("moves backward on both backward arrows, and wraps at the start", () => {
    for (const key of ["ArrowLeft", "ArrowUp"]) {
      expect(nextChoiceIndex(key, 3, 4), key).toBe(2)
      expect(nextChoiceIndex(key, 0, 4), `${key} wraps`).toBe(3)
    }
  })

  it("enters an untouched group from either end", () => {
    // Nothing selected yet: forward starts at the top of the list, backward at
    // the bottom. Computing from -1 would give 0 for forward but -2 for
    // backward, which is not a valid index.
    expect(nextChoiceIndex("ArrowDown", -1, 4)).toBe(0)
    expect(nextChoiceIndex("ArrowUp", -1, 4)).toBe(3)
  })

  it("jumps to the ends with Home and End", () => {
    expect(nextChoiceIndex("Home", 2, 4)).toBe(0)
    expect(nextChoiceIndex("End", 2, 4)).toBe(3)
  })

  it("returns null for keys it does not own, so they stay usable", () => {
    // Swallowing these would trap focus in the group or break the flow's own
    // navigation — Enter and Space select, Tab leaves, Escape backs out.
    for (const key of ["Tab", "Enter", " ", "Escape", "a", "PageDown"]) {
      expect(nextChoiceIndex(key, 1, 4), key).toBeNull()
    }
  })

  it("never returns an out-of-range index", () => {
    for (const count of [1, 2, 3, 7]) {
      for (const current of [-1, 0, count - 1]) {
        for (const key of ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"]) {
          const next = nextChoiceIndex(key, current, count)
          expect(next, `${key} @ ${current}/${count}`).not.toBeNull()
          expect(next!, `${key} @ ${current}/${count}`).toBeGreaterThanOrEqual(0)
          expect(next!, `${key} @ ${current}/${count}`).toBeLessThan(count)
        }
      }
    }
  })

  it("is inert on an empty group rather than dividing by zero", () => {
    // A group can legitimately render empty for a moment — the paper list before
    // levels resolve. `% 0` yields NaN, which would become tabIndex={NaN}.
    for (const key of ["ArrowRight", "Home", "End"]) {
      expect(nextChoiceIndex(key, 0, 0), key).toBeNull()
    }
  })
})

describe("choiceTabIndex", () => {
  it("makes exactly one item tabbable once something is selected", () => {
    const count = 5
    const selected = 2
    const tabbable = Array.from({ length: count }, (_, i) => choiceTabIndex(i, selected)).filter((t) => t === 0)
    expect(tabbable).toHaveLength(1)
    expect(choiceTabIndex(selected, selected)).toBe(0)
  })

  it("makes the FIRST item tabbable when nothing is selected", () => {
    // Without this the whole group falls out of the tab order and a keyboard
    // user cannot reach it at all — the worst possible failure here.
    expect(choiceTabIndex(0, -1)).toBe(0)
    for (const i of [1, 2, 3]) expect(choiceTabIndex(i, -1)).toBe(-1)
  })

  it("keeps exactly one tab stop for every selection state a group can be in", () => {
    for (const count of [1, 2, 4, 9]) {
      for (let selected = -1; selected < count; selected++) {
        const zeros = Array.from({ length: count }, (_, i) => choiceTabIndex(i, selected)).filter((t) => t === 0)
        expect(zeros, `count=${count} selected=${selected}`).toHaveLength(1)
      }
    }
  })
})
