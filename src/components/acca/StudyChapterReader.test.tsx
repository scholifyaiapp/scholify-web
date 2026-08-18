// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"
import { StudyChapterReader } from "./StudyChapterReader"
import { chaptersForPaper } from "@/lib/acca-study-content"

/*
 * Renders REAL authored chapters — the SBR and SBL trees carry flow / compare /
 * radial / pyramid / cards diagrams, tables, examQuestion blocks and inline
 * checks, all cast from `data: unknown`. This is exactly the surface that
 * shipped render crashes typecheck could not see. If any block throws while
 * rendering, render() throws and this fails.
 */
afterEach(cleanup)
const noop = () => {}

function renderEveryChapter(paperId: string) {
  const chapters = chaptersForPaper(paperId)
  expect(chapters.length, `${paperId} has authored chapters`).toBeGreaterThan(0)
  for (const chapter of chapters) {
    const { unmount } = render(<StudyChapterReader chapter={chapter} onBack={noop} onPractice={noop} />)
    unmount()
  }
}

describe("StudyChapterReader renders authored chapters without crashing", () => {
  it("renders every SBR chapter", () => {
    renderEveryChapter("SBR")
  })

  it("renders every SBL chapter", () => {
    renderEveryChapter("SBL")
  })
})
