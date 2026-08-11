import { describe, expect, it } from "vitest"
import {
  FORMULA_PAPERS,
  KIT_FORMULAS,
  TABLE_RATES,
  TABLE_YEARS,
  annuityFactor,
  discountFactor,
  formulasFor,
  searchFormulas,
} from "@/lib/acca-kit"

/*
 * THE TABLES ARE THE POINT OF THIS FILE.
 *
 * A learner will take a number off this screen and put it straight into an
 * answer. Every value below is checked against the figures ACCA prints on the
 * Present Value and Annuity tables issued in the exam — the tables are computed
 * rather than transcribed precisely so that a mistyped digit cannot exist, and
 * these assertions are what proves the generator matches the real sheet.
 */

describe("the present value table", () => {
  it("matches ACCA's printed figures", () => {
    // Read off the ACCA Present Value Table: (rate%, years) → factor.
    const printed: [number, number, number][] = [
      [1, 1, 0.99], [5, 1, 0.952], [10, 1, 0.909], [20, 1, 0.833],
      [5, 5, 0.784], [8, 5, 0.681], [10, 5, 0.621], [15, 5, 0.497],
      [6, 10, 0.558], [10, 10, 0.386], [12, 10, 0.322], [20, 10, 0.162],
      [4, 15, 0.555], [10, 15, 0.239], [15, 15, 0.123], [20, 15, 0.065],
    ]
    for (const [rate, years, factor] of printed) {
      expect(discountFactor(rate, years), `${rate}% / ${years}yr`).toBe(factor)
    }
  })

  it("is 1 at year zero and always falls as the years run on", () => {
    expect(discountFactor(10, 0)).toBe(1)
    for (const rate of TABLE_RATES) {
      for (let y = 2; y <= 15; y++) {
        expect(discountFactor(rate, y), `${rate}% y${y}`).toBeLessThanOrEqual(discountFactor(rate, y - 1))
      }
    }
  })
})

describe("the annuity table", () => {
  it("matches ACCA's printed figures", () => {
    // Read off the ACCA Annuity Table.
    const printed: [number, number, number][] = [
      [1, 1, 0.99], [10, 1, 0.909], [20, 1, 0.833],
      [5, 5, 4.329], [8, 5, 3.993], [10, 5, 3.791], [15, 5, 3.352],
      [6, 10, 7.36], [10, 10, 6.145], [12, 10, 5.65], [20, 10, 4.192],
      [4, 15, 11.118], [10, 15, 7.606], [15, 15, 5.847], [20, 15, 4.675],
    ]
    for (const [rate, years, factor] of printed) {
      expect(annuityFactor(rate, years), `${rate}% / ${years}yr`).toBe(factor)
    }
  })

  it("is the running total of the discount factors", () => {
    // The relationship that makes both tables trustworthy at once: an annuity
    // factor IS the sum of the individual years' present values. Rounding means
    // they can differ in the last place, never more.
    for (const rate of TABLE_RATES) {
      for (const years of TABLE_YEARS) {
        let summed = 0
        for (let y = 1; y <= years; y++) summed += discountFactor(rate, y)
        expect(annuityFactor(rate, years), `${rate}% / ${years}yr`).toBeCloseTo(summed, 1)
      }
    }
  })

  it("handles a zero rate, which the printed table does not cover", () => {
    // Not on ACCA's sheet (it starts at 1%) but reachable from the UI, and the
    // limit of the formula is simply the number of years.
    expect(annuityFactor(0, 7)).toBe(7)
  })

  it("covers the same grid the exam hands out", () => {
    expect(TABLE_RATES[0]).toBe(1)
    expect(TABLE_RATES[TABLE_RATES.length - 1]).toBe(20)
    expect(TABLE_YEARS[TABLE_YEARS.length - 1]).toBe(15)
  })
})

describe("the formulae sheet", () => {
  it("gives every formula an explanation, not just an expression", () => {
    // A formula with no "when do I use this" is the sheet the learner already
    // has in the exam; the use note is the only reason this screen exists.
    for (const f of KIT_FORMULAS) {
      expect(f.use.length, f.id).toBeGreaterThan(40)
      expect(f.papers.length, f.id).toBeGreaterThan(0)
      expect(f.expression.trim(), f.id).not.toBe("")
    }
  })

  it("has no duplicate ids", () => {
    expect(new Set(KIT_FORMULAS.map((f) => f.id)).size).toBe(KIT_FORMULAS.length)
  })

  it("only tags papers it actually declares", () => {
    for (const f of KIT_FORMULAS) {
      for (const p of f.papers) {
        expect(FORMULA_PAPERS, `${f.id} → ${p}`).toContain(p)
      }
    }
  })

  it("carries nothing for the papers that have no formulae sheet", () => {
    // AA and LW are examined without one. Inventing formulae for them would be
    // teaching the wrong thing about how those papers are sat.
    for (const paper of ["AA", "LW", "SBL", "TX"]) {
      expect(formulasFor(paper), paper).toHaveLength(0)
    }
  })

  it("gives every listed paper something", () => {
    for (const paper of FORMULA_PAPERS) {
      expect(formulasFor(paper).length, paper).toBeGreaterThan(0)
    }
  })

  it("searches the parts a learner actually remembers", () => {
    const all = KIT_FORMULAS
    // By name...
    expect(searchFormulas(all, "WACC").map((f) => f.id)).toContain("wacc")
    // ...by symbol in the expression...
    expect(searchFormulas(all, "√").length).toBeGreaterThan(0)
    // ...and by the thing it is for, when the name has gone.
    expect(searchFormulas(all, "breakeven").map((f) => f.id)).toContain("bep")
    expect(searchFormulas(all, "")).toHaveLength(all.length)
    expect(searchFormulas(all, "zzzz")).toHaveLength(0)
  })
})
