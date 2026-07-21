import { describe, it, expect } from "vitest"
import { buildCbeMock, cbeObjectiveMarks, drawOts } from "@/lib/acca-cbe-mock"
import { EXAM_BLUEPRINTS } from "@/lib/acca-exam-structure"
import { ALL_PAPERS } from "@/lib/acca-qualification"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import type { AccaQuestion } from "@/lib/acca-content"

/*
 * The sectioned CBE mock composer — the invariants that make a composed mock
 * TRUSTWORTHY: blueprint-shaped, no duplicate questions, marks that add up,
 * a clock priced off what was actually composed, and authored cases that are
 * internally sound.
 */

const CURATED = ALL_PAPERS.filter((p) => p.hasCuratedContent).map((p) => p.id)

describe("buildCbeMock", () => {
  it("composes a non-empty, blueprint-shaped mock for every curated paper", () => {
    for (const id of CURATED) {
      const mock = buildCbeMock(id, 1)
      const bp = EXAM_BLUEPRINTS[id]
      expect(mock.itemCount, id).toBeGreaterThan(0)
      expect(mock.totalMarks, id).toBeGreaterThan(0)
      expect(mock.seconds, id).toBeGreaterThan(0)

      // Sections appear in blueprint order, as a subset (empty ones drop).
      const bpIds = bp.sections.map((s) => s.id)
      const gotIds = mock.sections.map((s) => s.id)
      expect(gotIds, id).toEqual(bpIds.filter((x) => gotIds.includes(x)))

      // A composed section never exceeds its blueprint marks by more than the
      // constructed-fill slack, and marks always add up.
      for (const s of mock.sections) {
        const bpSection = bp.sections.find((b) => b.id === s.id)!
        expect(s.marks, `${id} section ${s.id}`).toBeLessThanOrEqual(bpSection.marks + 5)
        const itemMarks = s.items.reduce((a, it) => a + (it.kind === "task" ? it.task.maxMarks : it.q.marks), 0)
        expect(itemMarks, `${id} section ${s.id}`).toBe(s.marks)
      }
      expect(mock.sections.reduce((a, s) => a + s.marks, 0), id).toBe(mock.totalMarks)
    }
  })

  it("never repeats a question or task within a mock", () => {
    for (const id of CURATED) {
      const mock = buildCbeMock(id, 2)
      const ids = mock.sections.flatMap((s) => s.items.map((it) => (it.kind === "task" ? it.task.id : it.q.id)))
      expect(new Set(ids).size, id).toBe(ids.length)
    }
  })

  it("is deterministic per (paper, form) and varies Section A by form", () => {
    const a = buildCbeMock("FR", 1)
    const b = buildCbeMock("FR", 1)
    const flat = (m: typeof a) => m.sections.flatMap((s) => s.items.map((it) => (it.kind === "task" ? it.task.id : it.q.id)))
    expect(flat(a)).toEqual(flat(b))

    const form2 = buildCbeMock("FR", 2)
    const aIds = a.sections.find((s) => s.id === "A")!.items.map((it) => (it.kind === "ot" ? it.q.id : ""))
    const a2Ids = form2.sections.find((s) => s.id === "A")!.items.map((it) => (it.kind === "ot" ? it.q.id : ""))
    // Mock forms are disjoint by construction — Section A shares nothing.
    expect(aIds.filter((x) => a2Ids.includes(x))).toEqual([])
  })

  it("FR composes the real exam shape: A (30 OT) + B (3 authored cases, 30) + C (constructed ≈ 40)", () => {
    const mock = buildCbeMock("FR", 1)
    const [A, B, C] = ["A", "B", "C"].map((x) => mock.sections.find((s) => s.id === x)!)
    expect(A.items.every((it) => it.kind === "ot")).toBe(true)
    expect(A.marks).toBeGreaterThanOrEqual(26)
    expect(A.marks).toBeLessThanOrEqual(30)

    expect(B.otFallback).toBeUndefined()
    expect(B.items.every((it) => it.kind === "caseq")).toBe(true)
    expect(B.marks).toBe(30)
    expect(new Set(B.items.map((it) => (it.kind === "caseq" ? it.caseRef.id : ""))).size).toBe(3)

    expect(C.items.every((it) => it.kind === "task")).toBe(true)
    expect(C.marks).toBeGreaterThanOrEqual(30)
    expect(C.marks).toBeLessThanOrEqual(45)
  })

  it("FA composes A (70 OT) + B (2 authored MTQ cases, 30) — and no constructed section", () => {
    const mock = buildCbeMock("FA", 1)
    expect(mock.sections.map((s) => s.id)).toEqual(["A", "B"])
    const [A, B] = mock.sections
    expect(A.marks).toBeGreaterThanOrEqual(66)
    expect(A.marks).toBeLessThanOrEqual(70)
    expect(B.marks).toBe(30)
    expect(B.items).toHaveLength(10)
    expect(B.items.every((it) => it.kind === "caseq")).toBe(true)
    expect(cbeObjectiveMarks(mock)).toBe(mock.totalMarks)
  })

  it("falls back honestly to standalone OTs where a paper has no authored cases yet", () => {
    const mock = buildCbeMock("PM", 1) // PM's Section B has no authored cases yet
    const B = mock.sections.find((s) => s.id === "B")
    if (B) {
      expect(B.otFallback).toBe(true)
      expect(B.items.every((it) => it.kind === "ot")).toBe(true)
    }
  })

  it("Strategic papers compose fully constructed sittings from the written bank", () => {
    const mock = buildCbeMock("SBR", 1)
    expect(mock.sections.length).toBeGreaterThan(0)
    for (const s of mock.sections) {
      expect(s.kind).toBe("constructed")
      expect(s.items.every((it) => it.kind === "task")).toBe(true)
    }
  })

  it("prices the clock off composed marks at the official minutes-per-mark", () => {
    const mock = buildCbeMock("FR", 1)
    // FR is 180 min / 100 marks = 1.8 min per mark.
    expect(Math.abs(mock.seconds - mock.totalMarks * 1.8 * 60)).toBeLessThanOrEqual(30)
  })

  it("returns an empty mock for an unknown paper", () => {
    expect(buildCbeMock("XX", 1).itemCount).toBe(0)
  })
})

/*
 * drawOts feeds every section that shares a standalone-OT pool in the same
 * composed mock. It used to shift a question off the pool to test whether it
 * overshot the section target, then discard it silently when it did — never
 * pushed to the section, never returned to the pool — so a later section
 * drawing from the same pool had strictly less content than the bank
 * actually had, exactly on the thin-bank papers this is meant to degrade
 * honestly for.
 */
const otq = (id: string, marks: number): AccaQuestion => ({
  id,
  paper: "XX",
  area: "A",
  type: "mcq",
  stem: "?",
  options: ["a", "b", "c", "d"],
  correct: 0,
  explanation: "x",
  marks,
  difficulty: "easy",
})

describe("drawOts", () => {
  it("returns an overshooting question to the pool instead of losing it", () => {
    const q1 = otq("q1", 3)
    const q2 = otq("q2", 3)
    const pool = [q1, q2]
    const out = drawOts(pool, 5)
    expect(out).toEqual([q1])
    // q2 overshot this draw's target and must remain available for whatever
    // section draws from this same shared pool next.
    expect(pool).toEqual([q2])
  })

  it("still draws everything when nothing overshoots", () => {
    const qs = [otq("a", 2), otq("b", 2), otq("c", 2)]
    const out = drawOts([...qs], 6)
    expect(out).toHaveLength(3)
  })
})

describe("authored OT cases", () => {
  it("are internally sound: linked questions belong to the case's paper, marks add up, answers are in range", () => {
    for (const id of CURATED) {
      for (const c of getOtCases(id)) {
        expect(c.paper).toBe(id)
        expect(c.scenario.length, c.id).toBeGreaterThan(80)
        expect(c.questions.length, c.id).toBeGreaterThanOrEqual(4)
        expect(otCaseMarks(c), c.id).toBeGreaterThan(0)
        for (const q of c.questions) {
          expect(q.paper, q.id).toBe(id)
          expect(q.explanation.length, q.id).toBeGreaterThan(40)
          if (q.type === "mcq") {
            expect(Array.isArray(q.options), q.id).toBe(true)
            expect(typeof q.correct, q.id).toBe("number")
            expect(q.correct as number, q.id).toBeLessThan(q.options!.length)
          } else if (q.type === "number") {
            expect(typeof q.numericAnswer, q.id).toBe("number")
          }
        }
      }
    }
  })

  it("FR has 3 × 10-mark cases and FA has 2 × 15-mark MTQ cases", () => {
    const fr = getOtCases("FR")
    expect(fr).toHaveLength(3)
    for (const c of fr) expect(otCaseMarks(c)).toBe(10)
    const fa = getOtCases("FA")
    expect(fa).toHaveLength(2)
    for (const c of fa) expect(otCaseMarks(c)).toBe(15)
  })
})
