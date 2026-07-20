import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"

describe("SBR-INT September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G"]
  it("covers all seven official capabilities in questions and chapters", () => {
    expect(new Set(getQuestions("SBR").map((item) => item.area))).toEqual(new Set(areas))
    expect(chaptersForPaper("SBR").map((item) => item.area).sort()).toEqual(areas)
  })
  it("includes written practice for ethics, sustainability regulation and digital skills", () => {
    const represented = new Set(getWrittenQuestions("SBR").map((item) => item.area))
    for (const area of ["A", "F", "G"]) expect(represented.has(area)).toBe(true)
  })
  it("includes the current sustainability disclosure architecture", () => {
    const currentIssues = JSON.stringify(chaptersForPaper("SBR").find((item) => item.area === "F")).toLowerCase()
    for (const term of ["ifrs s1", "ifrs s2", "governance", "strategy", "risk management", "metrics", "esrs"]) expect(currentIssues).toContain(term)
  })
  it("keeps financial instruments and employee benefits in official Area C", () => {
    const performance = JSON.stringify(chaptersForPaper("SBR").find((item) => item.area === "C")).toLowerCase()
    expect(performance).toContain("financial instrument")
    expect(performance).toContain("employee benefit")
  })
})
