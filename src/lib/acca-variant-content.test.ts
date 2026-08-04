import { beforeEach, describe, expect, it } from "vitest"
import { setPaperVariant, getPaperVariant, paperVariantLabel } from "@/lib/acca-profile"
import { applyVariantStudyContent } from "@/lib/acca-variant-content"
import type { StudyChapter } from "@/lib/acca-study-content"

const chapter = (paper: "LW" | "TX"): StudyChapter => ({
  paper, area: "A", title: "Foundation", minutes: 10, intro: "Base chapter.", outcomes: ["Learn"],
  sections: [{ id: "base", heading: "Base", blocks: [{ kind: "text", md: "Base content." }] }],
  examTraps: [], keyTerms: [], summary: ["Base"],
})

describe("LW and TX paper variants", () => {
  beforeEach(() => window.localStorage.clear())

  it("uses safe defaults for existing learners", () => {
    expect(getPaperVariant("LW")).toBe("GLOBAL")
    expect(getPaperVariant("TX")).toBe("UK")
  })

  it("persists and labels each selected system", () => {
    setPaperVariant("LW", "UK")
    setPaperVariant("TX", "GLOBAL")
    expect(paperVariantLabel("LW")).toBe("LW · United Kingdom")
    expect(paperVariantLabel("TX")).toBe("TX · Global")
  })

  it("injects different UK and Global study foundations for TX", () => {
    setPaperVariant("TX", "UK")
    const uk = applyVariantStudyContent("TX", [chapter("TX")])
    setPaperVariant("TX", "GLOBAL")
    const global = applyVariantStudyContent("TX", [chapter("TX")])
    expect(uk[0].sections[0].heading).toContain("United Kingdom")
    expect(global[0].sections[0].heading).toContain("Global")
    expect(JSON.stringify(uk)).not.toBe(JSON.stringify(global))
  })

  /*
   * LW is deliberately NOT overlaid. The overlay exists to orient a variant that is
   * reading the other variant's chapters, and both LW variants now have their own
   * authored tree — Global's 33 chapters and ENG's 46 — which acca-paper-content.ts
   * selects directly. Prepending a "United Kingdom variant foundation" section to a
   * tree that is already entirely English law would be misleading, so this asserts the
   * overlay leaves LW untouched.
   */
  it("leaves LW chapters untouched, both variants having their own tree", () => {
    const base = [chapter("LW")]
    setPaperVariant("LW", "UK")
    expect(applyVariantStudyContent("LW", base)).toEqual(base)
    setPaperVariant("LW", "GLOBAL")
    expect(applyVariantStudyContent("LW", base)).toEqual(base)
  })
})
