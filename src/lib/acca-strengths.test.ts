import { describe, expect, it } from "vitest"
import { RANKABLE_MIN_ANSWERS, strengthEmptyLine, strengthSplit } from "@/lib/acca-strengths"
import type { AreaStat } from "@/lib/acca"

/*
 * BEST AND WORST SECTION — and the reason it refuses to answer early.
 *
 * The failure this guards against is the flattering lie: one lucky answer in a
 * section the learner has barely touched reads as 100% and outranks the section
 * they have ground through for a fortnight. It is worst in week one, which is
 * exactly when someone is deciding whether this product knows anything about
 * them.
 */

const area = (code: string, label: string, seen: number, correct: number): AreaStat => ({
  code,
  label,
  seen,
  correct,
  accuracy: seen > 0 ? correct / seen : 0,
  weightedSeen: seen,
  weightedCorrect: correct,
})

describe("ranking sections", () => {
  it("names the strongest and the weakest once there is enough evidence", () => {
    const split = strengthSplit([
      area("A", "Business organisation", 40, 34), // 85%
      area("B", "Governance", 30, 15),            // 50%
      area("C", "Accounting", 20, 14),            // 70%
    ])
    expect(split.best?.code).toBe("A")
    expect(split.best?.accuracy).toBe(85)
    expect(split.worst?.code).toBe("B")
    expect(split.worst?.accuracy).toBe(50)
    expect(split.ranked).toBe(3)
  })

  it("IGNORES a section with too few answers, however flattering", () => {
    // The bug in one test: a single correct answer in D is a perfect score.
    const split = strengthSplit([
      area("A", "Business organisation", 90, 70), // 78% over real volume
      area("D", "Lucky", 1, 1),                   // 100% over nothing
    ])
    expect(split.best?.code).toBe("A")
    expect(split.pending).toBe(1)
    expect(split.ranked).toBe(1)
  })

  it("says nothing at all rather than guessing from noise", () => {
    const split = strengthSplit([area("A", "Barely started", 3, 3)])
    expect(split.best).toBeNull()
    expect(split.worst).toBeNull()
    expect(split.pending).toBe(1)
    expect(strengthEmptyLine(split)).toContain(String(RANKABLE_MIN_ANSWERS))
  })

  it("handles a learner who has answered nothing", () => {
    const split = strengthSplit([area("A", "Untouched", 0, 0), area("B", "Also untouched", 0, 0)])
    expect(split.best).toBeNull()
    expect(split.pending).toBe(0)
    expect(strengthEmptyLine(split)).toContain("once you've answered enough")
  })

  it("does not call one section both the best and the worst", () => {
    // Technically true, useless to read, and faintly insulting after a week of
    // work on the only section they have done.
    const split = strengthSplit([area("A", "The only one", 30, 20)])
    expect(split.best?.code).toBe("A")
    expect(split.worst).toBeNull()
  })

  it("breaks ties on volume, then stably — so it does not flicker between renders", () => {
    const areas = [
      area("A", "First", 10, 8),  // 80% over 10
      area("B", "Second", 40, 32), // 80% over 40 — better evidence, same score
    ]
    expect(strengthSplit(areas).best?.code).toBe("B")
    // Reversing the input must not change the answer.
    expect(strengthSplit([...areas].reverse()).best?.code).toBe("B")
  })

  it("is exactly at the threshold, not one either side", () => {
    const justUnder = strengthSplit([area("A", "x", RANKABLE_MIN_ANSWERS - 1, 4)])
    expect(justUnder.best).toBeNull()
    const justOn = strengthSplit([area("A", "x", RANKABLE_MIN_ANSWERS, 4)])
    expect(justOn.best?.code).toBe("A")
  })
})
