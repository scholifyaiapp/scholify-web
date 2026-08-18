import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getFlashcards } from "@/lib/acca-flashcards"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

describe("ATX-UK June 2026–June 2027 Finance Act 2025", () => {
  const areas = ["A", "B", "C", "D", "E"]

  /*
   * The authored-tree ratchet. Every area is now an authored tree written for
   * Finance Act 2025 and all five legacy files are deleted. Raise a floor if an
   * area grows; never lower one.
   */
  const CHAPTER_FLOOR: Record<string, number> = {
    A: 20, // trees a..a5 — ATX-01..20, one chapter group per syllabus subsection (A1 ×5, A2 ×4, A3 ×4, A4 ×4, A5, A6 ×2)
    B: 6, // tree b — ATX-21..26, one per subsection B1..B5 plus the identification chapter
    C: 5, // trees c + d — ATX-27..31, ending with the ethics chapter
    D: 1, // ATX-32 — professional skills
    E: 1, // ATX-33 — employability and technology skills
  }

  it("covers all five official capabilities", () => {
    expect(new Set(getQuestions("ATX").map((x) => x.area))).toEqual(new Set(areas))
    expect([...new Set(chaptersForPaper("ATX").map((x) => x.area))].sort()).toEqual(areas)
  })

  it("keeps the authored chapter tree from regressing", () => {
    for (const area of areas) {
      const count = chaptersForPaper("ATX").filter((x) => x.area === area).length
      expect(count, `ATX area ${area} chapter count`).toBeGreaterThanOrEqual(CHAPTER_FLOOR[area])
    }
  })

  it("gives every authored tree chapter a stable id, number and syllabus references", () => {
    const authored = chaptersForPaper("ATX").filter((x) => x.id?.startsWith("ATX-"))
    expect(authored.length).toBeGreaterThanOrEqual(33)
    const numbers = new Set<number>()
    for (const chapter of authored) {
      expect(typeof chapter.number, `${chapter.id} number`).toBe("number")
      expect(chapter.syllabusRefs?.length ?? 0, `${chapter.id} syllabusRefs`).toBeGreaterThan(0)
      expect(numbers.has(chapter.number as number), `${chapter.id} duplicate number`).toBe(false)
      numbers.add(chapter.number as number)
    }
  })

  it("uses the current four-year FIG regime", () => {
    const text = JSON.stringify(chaptersForPaper("ATX")).toLowerCase()
    expect(text).toContain("four-year foreign income and gains")
    expect(text).toContain("ten consecutive tax years")
  })

  /*
   * ── WHY THIS GUARD CHANGED SHAPE ────────────────────────────────
   * Finance Act 2025 abolished domicile, deemed domicile and the remittance
   * basis for income tax and capital gains tax. Until Aug 2026 this test banned
   * the STRINGS outright from questions and flashcards, which was the right
   * guard while the content was pre-FA2025 legacy material being filtered at
   * load time by a `currentOnly()` helper.
   *
   * The rebuilt content teaches the abolition explicitly — a candidate revising
   * from a 2023 or 2024 text needs to be told, by name, that the regime they
   * are reading about is gone. Those items are correct and valuable, and a
   * blanket string ban would reject them.
   *
   * So the guard is now about MEANING rather than vocabulary: wherever an
   * obsolete concept is named in a practice item, that item must also carry an
   * abolition marker. An item presenting the remittance basis as live law still
   * fails, which is what the original test was protecting against.
   */
  it("never presents the abolished domicile or remittance rules as live law", () => {
    const obsolete = ["remittance basis", "non-domicil", "deemed domicile"]
    // Kept deliberately broad. The guard is against an item teaching the old
    // regime as live, so any acknowledgement that it has ended satisfies it —
    // "gone" alone rather than each conjugation, since the first draft of this
    // list matched "are gone" and "is gone" and missed a correct card saying
    // "have gone".
    const abolitionMarkers = ["abolish", "no longer", "replaced", "gone", "removed", "withdrawn", "pre-2025", "pre-fa2025", "before fa2025"]

    const items: { kind: string; id: string; text: string }[] = [
      ...getQuestions("ATX").map((q) => ({ kind: "question", id: q.id, text: JSON.stringify(q).toLowerCase() })),
      ...getFlashcards("ATX").map((c, i) => ({ kind: "flashcard", id: String((c as { id?: string }).id ?? i), text: JSON.stringify(c).toLowerCase() })),
    ]

    const offenders = items
      .filter((item) => obsolete.some((term) => item.text.includes(term)))
      .filter((item) => !abolitionMarkers.some((marker) => item.text.includes(marker)))
      .map((item) => `${item.kind} ${item.id}`)

    if (offenders.length) console.log(`OBSOLETE TAX RULES PRESENTED AS LIVE (${offenders.length}):\n` + offenders.join("\n"))
    expect(offenders).toEqual([])
  })

  it("represents interaction, planning, professional and digital capability", () => {
    const text = JSON.stringify(chaptersForPaper("ATX")).toLowerCase()
    for (const term of ["tax interaction", "tax planning", "professional skills", "employability and technology"]) {
      expect(text, `ATX should cover ${term}`).toContain(term)
    }
  })

  it("teaches the ethics marks Section A awards every sitting", () => {
    // 35 technical, 5 ethics, 10 professional skills — the ethics marks are
    // separately identified in the syllabus and are the most predictable on the
    // paper, so the tree must teach the sequence rather than just the Code.
    const areaC = JSON.stringify(chaptersForPaper("ATX").filter((x) => x.area === "C")).toLowerCase()
    for (const term of ["tipping off", "money laundering", "cease to act", "professional clearance", "contingent fee"]) {
      expect(areaC, `Area C should teach ${term}`).toContain(term)
    }
  })

  it("builds three distinct exact mocks with compulsory Section A ethics", () => {
    const seen = new Set<string>()
    for (const form of [1, 2, 3]) {
      const mock = buildCbeMock("ATX", form)
      expect(mock.totalMarks).toBe(100)
      expect(mock.sections.map((section) => section.marks)).toEqual([50, 50])
      const tasks = mock.sections.flatMap((section) => section.items.flatMap((item) => (item.kind === "task" ? [item.task] : [])))
      expect(tasks.map((task) => task.maxMarks)).toEqual([50, 25, 25])
      expect(tasks[0].stem.toLowerCase()).toContain("ethics requirement")
      expect(tasks[0].stem).toContain("(5 marks)")
      for (const task of tasks) {
        expect(seen.has(task.id)).toBe(false)
        seen.add(task.id)
      }
    }
  })
})
