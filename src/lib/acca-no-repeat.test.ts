import { describe, it, expect, beforeEach } from "vitest"
import {
  pickFresh,
  markServed,
  servedIds,
  poolCycle,
  poolHealth,
  claimedToday,
  releaseClaims,
  startNewCycle,
  clearLedger,
} from "@/lib/acca-no-repeat"

/*
 * The no-repeat ledger.
 *
 * This is a CORRECTNESS contract, not a nicety. Every selection surface used to
 * shuffle the same pool with a fresh seed — which reorders it but excludes
 * nothing — so a learner could be re-served questions they had answered an hour
 * before. Repetition inflates accuracy (you remember the answer, not the rule),
 * accuracy drives the Exam Readiness Score, and the score is the one number the
 * learner is trusting. A regression here silently lies to them.
 */

interface Item {
  id: string
}

const pool = (n: number, prefix = "q"): Item[] => Array.from({ length: n }, (_, i) => ({ id: `${prefix}${i + 1}` }))

beforeEach(() => {
  window.localStorage.clear()
})

describe("pickFresh — nothing is served twice", () => {
  it("returns the requested count and claims it for the day", () => {
    const { items } = pickFresh({ paperId: "BT", kind: "practice", pool: pool(40), count: 12 })
    expect(items).toHaveLength(12)
    expect(new Set(items.map((i) => i.id)).size).toBe(12)
    // Claimed, so any other pick today sees them as taken.
    for (const item of items) expect(claimedToday().has(item.id)).toBe(true)
  })

  it("never overlaps two picks made on the same day, across different pools", () => {
    const bank = pool(40)
    const quiz = pickFresh({ paperId: "BT", kind: "quiz", pool: bank, count: 5 })
    const practice = pickFresh({ paperId: "BT", kind: "practice", pool: bank, count: 12 })
    const overlap = quiz.items.filter((q) => practice.items.some((p) => p.id === q.id))
    // THE bug this guards: 5 quizzes and 12 practice questions drawn from one bank
    // minutes apart. The ledger alone cannot stop it — quizzes are only marked
    // served once ANSWERED — so the day-claim set has to.
    expect(overlap).toEqual([])
  })

  it("excludes everything already served in this cycle", () => {
    const bank = pool(40)
    const first = pickFresh({ paperId: "BT", kind: "practice", pool: bank, count: 10 })
    markServed("BT", "practice", first.items.map((i) => i.id))
    // A new day: the day-claims expire, but the ledger does not.
    window.localStorage.removeItem("scholify-served-today")

    const second = pickFresh({ paperId: "BT", kind: "practice", pool: bank, count: 10 })
    const repeats = second.items.filter((s) => first.items.some((f) => f.id === s.id))
    expect(repeats).toEqual([])
    expect(second.recycled).toBe(false)
  })

  it("honours an explicit exclusion list on top of the ledger", () => {
    const bank = pool(20)
    const banned = ["q1", "q2", "q3"]
    const { items } = pickFresh({ paperId: "BT", kind: "practice", pool: bank, count: 10, exclude: banned })
    expect(items.map((i) => i.id).filter((id) => banned.includes(id))).toEqual([])
  })

  it("is stable within a day — a reload must not reshuffle a live session", () => {
    const bank = pool(30)
    const a = pickFresh({ paperId: "BT", kind: "practice", pool: bank, count: 8, claimForToday: false })
    const b = pickFresh({ paperId: "BT", kind: "practice", pool: bank, count: 8, claimForToday: false })
    expect(b.items.map((i) => i.id)).toEqual(a.items.map((i) => i.id))
  })

  it("ranks with the supplied ranker, preferring authored over derived items", () => {
    const mixed = [
      { id: "derived-1", recall: true },
      { id: "authored-1", recall: false },
      { id: "derived-2", recall: true },
      { id: "authored-2", recall: false },
    ]
    const { items } = pickFresh({
      paperId: "BT",
      kind: "practice",
      pool: mixed,
      count: 2,
      rank: (q) => (q.recall ? 10 : 0),
    })
    expect(items.every((i) => i.id.startsWith("authored"))).toBe(true)
  })
})

describe("cycle exhaustion — a finite bank has to reopen", () => {
  it("reopens the pool rather than returning a short session", () => {
    const bank = pool(10)
    markServed("BT", "practice", bank.map((b) => b.id)) // whole bank seen
    window.localStorage.removeItem("scholify-served-today")

    const { items, recycled } = pickFresh({ paperId: "BT", kind: "practice", pool: bank, count: 8 })
    // A learner who has worked through a small area's whole bank still gets a
    // FULL set — being handed 2 questions because the bank is finite reads as
    // broken, and spaced revision on seen questions is genuinely valuable.
    expect(items).toHaveLength(8)
    expect(recycled).toBe(true)
    expect(poolCycle("BT", "practice")).toBe(1)
  })

  it("keeps a recency tail after a reset so nothing repeats back-to-back", () => {
    const bank = pool(30)
    markServed("BT", "practice", bank.map((b) => b.id))
    const lastFew = bank.slice(-5).map((b) => b.id)
    startNewCycle("BT", "practice")
    const kept = servedIds("BT", "practice")
    for (const id of lastFew) expect(kept.has(id)).toBe(true)
    // ...but the earliest ones are available again.
    expect(kept.has("q1")).toBe(false)
  })

  it("keeps pools independent — exhausting practice must not reset quizzes", () => {
    markServed("BT", "quiz", ["q1", "q2"])
    startNewCycle("BT", "practice")
    expect(servedIds("BT", "quiz").has("q1")).toBe(true)
    expect(poolCycle("BT", "quiz")).toBe(0)
  })
})

describe("day claims", () => {
  it("releases claims for an abandoned session so its questions come back", () => {
    const { items } = pickFresh({ paperId: "BT", kind: "practice", pool: pool(20), count: 6 })
    releaseClaims(items.map((i) => i.id))
    for (const item of items) expect(claimedToday().has(item.id)).toBe(false)
  })
})

describe("poolHealth — what the learner is shown", () => {
  it("reports served, fresh and percent against the real bank size", () => {
    markServed("BT", "practice", ["q1", "q2", "q3", "q4"])
    const health = poolHealth("BT", "practice", 20)
    expect(health).toMatchObject({ total: 20, served: 4, fresh: 16, percent: 20, cycle: 0 })
  })

  it("never reports more served than the pool holds", () => {
    // A shrinking bank (content edited, questions retired) must not produce
    // "served 30 of 20" or a percentage above 100.
    markServed("BT", "practice", pool(30).map((p) => p.id))
    const health = poolHealth("BT", "practice", 20)
    expect(health.served).toBe(20)
    expect(health.percent).toBeLessThanOrEqual(100)
  })
})

describe("clearLedger", () => {
  it("wipes only the named paper", () => {
    markServed("BT", "practice", ["q1"])
    markServed("MA", "practice", ["q1"])
    clearLedger("BT")
    expect(servedIds("BT", "practice").size).toBe(0)
    expect(servedIds("MA", "practice").has("q1")).toBe(true)
  })
})

describe("corrupt storage", () => {
  it("degrades to an empty ledger rather than throwing", () => {
    window.localStorage.setItem("scholify-served-ledger", "{not json")
    expect(() => servedIds("BT", "practice")).not.toThrow()
    expect(servedIds("BT", "practice").size).toBe(0)
  })

  it("ignores wrong-typed rows instead of poisoning the pick", () => {
    window.localStorage.setItem(
      "scholify-served-ledger",
      JSON.stringify({ "BT:practice": { ids: ["q1", 5, null, "q2"], cycle: "nope" } }),
    )
    const served = servedIds("BT", "practice")
    expect([...served].sort()).toEqual(["q1", "q2"])
    expect(poolCycle("BT", "practice")).toBe(0)
  })
})
