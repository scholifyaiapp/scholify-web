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

/*
 * Each case renders a whole paper's tree, so it is inherently slower than a unit
 * test — SBL alone is 46 chapters of diagrams and tables. Vitest's 5s default
 * was close enough to the real cost that these passed alone and failed under
 * full-suite load, which is a flake, not a signal. The explicit budget is
 * generous on purpose: it exists to catch a render CRASH, and a genuine crash
 * fails immediately rather than slowly. Raise it rather than trimming coverage
 * as more authored trees land.
 */
const RENDER_BUDGET_MS = 60_000

describe("StudyChapterReader renders authored chapters without crashing", () => {
  it("renders every SBR chapter", () => {
    renderEveryChapter("SBR")
  }, RENDER_BUDGET_MS)

  it("renders every SBL chapter", () => {
    renderEveryChapter("SBL")
  }, RENDER_BUDGET_MS)

  // AFM's rebuild is in progress: this covers the authored Area A tree today and
  // grows with each area that lands.
  it("renders every AFM chapter", () => {
    renderEveryChapter("AFM")
  }, RENDER_BUDGET_MS)
})
