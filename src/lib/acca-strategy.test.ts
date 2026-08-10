import { describe, it, expect, beforeEach } from "vitest"
import { strategicRoute, qualificationRoute, unlockedBy, prerequisitesOf } from "@/lib/acca-strategy"
import { setPassedPapers } from "@/lib/acca-qualification"

/*
 * The STRATEGIC route — which paper to sit next, and why.
 *
 * ACCA lets you take the Applied Skills papers in any order, which is precisely why
 * students choose badly: they pick by reputation ("FM is hard, leave it") rather than
 * by knowledge flow, then meet FR having forgotten FA, or APM having never sat PM.
 *
 * The founder's own example is the canonical case and the first test below: finish
 * MA (F2) and the recommendation should be PM (F5) and FM (F9) — where MA's costing
 * and relevant-cost machinery is directly reused — alongside FA (F3), the Knowledge
 * paper that completes the level. Every recommendation must carry a reason the
 * learner can check, because an unexplained ordering is indistinguishable from a
 * random one.
 */

beforeEach(() => {
  window.localStorage.clear()
})

describe("strategicRoute — the founder's MA example", () => {
  it("points a learner finishing MA at PM, FM and FA", () => {
    setPassedPapers([])
    const route = strategicRoute("MA", 3)
    const ids = route.map((s) => s.paper.id)
    expect(ids).toHaveLength(3)
    // PM and FM are MA's direct successors; FA is its Knowledge-level companion.
    expect(ids).toContain("PM")
    expect(ids).toContain("FM")
    expect(ids).toContain("FA")
  })

  it("leads with the direct successors, because warm knowledge is perishable", () => {
    setPassedPapers([])
    const route = strategicRoute("MA", 3)
    expect(route[0].kind).toBe("successor")
    expect(["PM", "FM"]).toContain(route[0].paper.id)
  })

  it("gives every step a checkable reason and a sitting", () => {
    setPassedPapers([])
    for (const step of strategicRoute("MA", 3)) {
      expect(step.why.length).toBeGreaterThan(40)
      expect(step.when.length).toBeGreaterThan(3)
      expect(step.position).toBeGreaterThan(0)
    }
  })
})

describe("strategicRoute — the other canonical chains", () => {
  const chains: [string, string][] = [
    ["FA", "FR"],
    ["FR", "SBR"],
    ["PM", "APM"],
    ["FM", "AFM"],
    ["TX", "ATX"],
    ["AA", "AAA"],
    ["BT", "SBL"],
  ]

  it("follows the knowledge flow of each chain", () => {
    setPassedPapers([])
    for (const [from, to] of chains) {
      const ids = strategicRoute(from, 3).map((s) => s.paper.id)
      expect(ids, `${from} → ${to}`).toContain(to)
    }
  })

  it("never recommends the paper the learner is already on", () => {
    setPassedPapers([])
    for (const [from] of chains) {
      expect(strategicRoute(from, 3).map((s) => s.paper.id)).not.toContain(from)
    }
  })

  it("never recommends a paper already passed", () => {
    setPassedPapers(["BT", "MA", "FA", "PM"])
    const ids = strategicRoute("FM", 3).map((s) => s.paper.id)
    for (const passed of ["BT", "MA", "FA", "PM"]) expect(ids).not.toContain(passed)
  })

  it("never repeats a paper within one route", () => {
    setPassedPapers([])
    for (const [from] of chains) {
      const ids = strategicRoute(from, 3).map((s) => s.paper.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it("flags outstanding prerequisites rather than hiding them", () => {
    setPassedPapers([])
    // SBR needs FR. Recommending it to someone straight out of BT without saying
    // so would be the exact mistake this module exists to prevent.
    const route = strategicRoute("BT", 3)
    for (const step of route) {
      if (step.missing.length > 0) expect(step.why).toMatch(/needs|first/i)
    }
  })
})

describe("qualificationRoute — the whole map", () => {
  it("groups all 15 papers into the four ACCA stages", () => {
    setPassedPapers(["BT", "MA"])
    const stages = qualificationRoute("FA")
    expect(stages.map((s) => s.key)).toEqual(["AK", "AS", "SPE", "SPO"])
    expect(stages.flatMap((s) => s.papers)).toHaveLength(15)
    expect(stages[3].note).toContain("2 of 4")
  })

  it("marks passed, current, next and later correctly", () => {
    setPassedPapers(["BT", "MA"])
    const stages = qualificationRoute("FA")
    const all = stages.flatMap((s) => s.papers)
    expect(all.find((p) => p.paper.id === "BT")!.state).toBe("passed")
    expect(all.find((p) => p.paper.id === "FA")!.state).toBe("current")
    // Something must be flagged as next, or the map has no forward direction.
    expect(all.some((p) => p.state === "next")).toBe(true)
  })

  it("does not report the current paper as blocking its own successors", () => {
    setPassedPapers([])
    const all = qualificationRoute("FA").flatMap((s) => s.papers)
    // FR is blocked by FA — but the learner is sitting FA now, so listing it as a
    // blocker would tell them they are blocked by the thing they are doing.
    expect(all.find((p) => p.paper.id === "FR")!.blockedBy).not.toContain("FA")
  })
})

describe("the dependency graph itself", () => {
  it("knows what today's paper unlocks", () => {
    expect(unlockedBy("MA").map((p) => p.id).sort()).toEqual(["FM", "PM"])
    expect(unlockedBy("FR").map((p) => p.id)).toEqual(["SBR"])
    // A Knowledge paper with no dependants is fine; an Options paper is a leaf.
    expect(unlockedBy("AAA")).toEqual([])
  })

  it("knows what today's paper leans on", () => {
    expect(prerequisitesOf("SBR").map((p) => p.id)).toEqual(["FR"])
    expect(prerequisitesOf("FM").map((p) => p.id).sort()).toEqual(["FA", "MA"])
    expect(prerequisitesOf("BT")).toEqual([])
  })
})
