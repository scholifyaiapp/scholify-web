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

  it("injects different UK and Global study foundations", () => {
    setPaperVariant("LW", "UK")
    const uk = applyVariantStudyContent("LW", [chapter("LW")])
    setPaperVariant("LW", "GLOBAL")
    const global = applyVariantStudyContent("LW", [chapter("LW")])
    expect(uk[0].sections[0].heading).toContain("United Kingdom")
    expect(global[0].sections[0].heading).toContain("Global")
    expect(JSON.stringify(uk)).not.toBe(JSON.stringify(global))
  })
})
