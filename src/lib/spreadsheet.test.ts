import { describe, it, expect } from "vitest"
import { evalSheet, displayValue, serializeForMarking, colName, parseRef } from "@/lib/spreadsheet"
import { EXAM_BLUEPRINTS, hasConstructedSection, constructedSectionLabel, examSecondsFor } from "@/lib/acca-exam-structure"

/*
 * The CBE spreadsheet marks real exam workings — a wrong SUM here grades a
 * student's NPV wrong. And the exam blueprints are shown as OFFICIAL
 * structure — every one must sum to 100 marks and match the real CBE shape.
 */

describe("spreadsheet engine", () => {
  it("evaluates plain numbers, commas and text", () => {
    const s = evalSheet({ A1: "500", A2: "1,250.5", A3: "Sales revenue" })
    expect(s.A1.value).toBe(500)
    expect(s.A2.value).toBe(1250.5)
    expect(s.A3.value).toBe("Sales revenue")
  })

  it("computes arithmetic with precedence and parentheses", () => {
    const s = evalSheet({ A1: "=2+3*4", A2: "=(2+3)*4", A3: "=2^3^2", A4: "=-A1+1" })
    expect(s.A1.value).toBe(14)
    expect(s.A2.value).toBe(20)
    expect(s.A3.value).toBe(512) // right-associative like Excel's caret chain
    expect(s.A4.value).toBe(-13)
  })

  it("resolves cell references and ranges through SUM/AVERAGE", () => {
    const s = evalSheet({ A1: "100", A2: "200", A3: "300", B1: "=SUM(A1:A3)", B2: "=AVERAGE(A1:A3)", B3: "=B1-B2" })
    expect(s.B1.value).toBe(600)
    expect(s.B2.value).toBe(200)
    expect(s.B3.value).toBe(400)
  })

  it("treats empty referenced cells as zero, like the CBE grid", () => {
    const s = evalSheet({ B1: "=A1+5" })
    expect(s.B1.value).toBe(5)
  })

  it("supports MIN, MAX, COUNT, ROUND, ABS and mixed args", () => {
    const s = evalSheet({ A1: "10", A2: "20", B1: "=MAX(A1:A2, 15)", B2: "=ROUND(2.675, 2)", B3: "=ABS(0-A2)", B4: "=COUNT(A1:A2)" })
    expect(s.B1.value).toBe(20)
    expect(s.B2.value).toBeCloseTo(2.68, 2)
    expect(s.B3.value).toBe(20)
    expect(s.B4.value).toBe(2)
  })

  it("flags division by zero and circular references instead of crashing", () => {
    const s = evalSheet({ A1: "=1/0", B1: "=B2", B2: "=B1" })
    expect(s.A1.error).toBe("#DIV/0")
    expect(s.B1.error).toBeTruthy()
  })

  it("flags text used in arithmetic as an error", () => {
    const s = evalSheet({ A1: "label", B1: "=A1+1" })
    expect(s.B1.error).toBe("#ERR")
  })

  it("formats display values with separators and shows errors", () => {
    const s = evalSheet({ A1: "=1000*1250", A2: "=1/0" })
    expect(displayValue(s.A1)).toBe("1,250,000")
    expect(displayValue(s.A2)).toBe("#DIV/0")
  })

  it("serialises workings for the AI Examiner in reading order", () => {
    const text = serializeForMarking({ B2: "=SUM(A1:A2)", A1: "100", A2: "250", A3: "Total" })
    expect(text).toContain("[Spreadsheet workings]")
    expect(text.indexOf("A1: 100")).toBeLessThan(text.indexOf("B2: =SUM(A1:A2) → 350"))
    expect(text).toContain("A3: Total")
  })

  it("round-trips column names and refs", () => {
    expect(colName(0)).toBe("A")
    expect(colName(25)).toBe("Z")
    expect(colName(26)).toBe("AA")
    expect(parseRef("B7")).toEqual({ col: 1, row: 6 })
    expect(parseRef("7B")).toBeNull()
  })
})

describe("official exam blueprints", () => {
  const ALL = ["BT", "MA", "FA", "LW", "PM", "TX", "FR", "AA", "FM", "SBR", "SBL", "AFM", "APM", "ATX", "AAA"]

  it("covers all fifteen papers and each sums to exactly 100 marks", () => {
    for (const id of ALL) {
      const bp = EXAM_BLUEPRINTS[id]
      expect(bp, `${id} missing`).toBeTruthy()
      expect(bp.sections.reduce((a, s) => a + s.marks, 0), `${id} marks`).toBe(100)
      expect(bp.durationMin).toBeGreaterThanOrEqual(120)
    }
  })

  it("keeps the knowledge papers and LW 100% objective-test (A + B only)", () => {
    for (const id of ["BT", "MA", "FA", "LW"]) {
      expect(hasConstructedSection(id), id).toBe(false)
      expect(EXAM_BLUEPRINTS[id].sections.map((s) => s.id)).toEqual(["A", "B"])
      expect(EXAM_BLUEPRINTS[id].cbeTools).toEqual([])
    }
  })

  it("gives PM/TX/FR/FM a Section C and AA a constructed Section B — never a Section C", () => {
    for (const id of ["PM", "TX", "FR", "FM"]) {
      expect(constructedSectionLabel(id), id).toBe("Section C")
    }
    expect(constructedSectionLabel("AA")).toBe("Section B")
    expect(EXAM_BLUEPRINTS.AA.sections.some((s) => s.id === "C")).toBe(false)
  })

  it("makes every Strategic Professional paper fully constructed", () => {
    for (const id of ["SBR", "SBL", "AFM", "APM", "ATX", "AAA"]) {
      expect(EXAM_BLUEPRINTS[id].sections.every((s) => s.kind === "constructed"), id).toBe(true)
    }
  })

  it("prices question time at the official minutes-per-mark", () => {
    expect(examSecondsFor("FR", 20)).toBe(36 * 60) // 1.8 min/mark at Applied Skills
    expect(examSecondsFor("AAA", 25)).toBe(Math.round((1.95 * 25 * 60) / 30) * 30)
    expect(examSecondsFor("SBL", 100)).toBe(240 * 60)
  })
})
