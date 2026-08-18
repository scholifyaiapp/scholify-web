// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup, screen, fireEvent } from "@testing-library/react"
import CharlesCompanion from "./CharlesCompanion"
import { setCurrentPaper } from "@/lib/acca-qualification"

/*
 * Render smoke test for the AI Study Companion, on the jsdom env the P6 work
 * added. Uses REAL state (setCurrentPaper) rather than module mocks — mocking a
 * whole module the real code depends on breaks its dependency graph.
 */
afterEach(cleanup)

describe("CharlesCompanion", () => {
  it("renders nothing when there is no active paper", () => {
    localStorage.clear()
    const { container } = render(<CharlesCompanion />)
    expect(container.firstChild).toBeNull()
  })

  it("renders the launcher for a learner on a paper", () => {
    localStorage.clear()
    setCurrentPaper("SBR")
    render(<CharlesCompanion />)
    expect(screen.getByRole("button", { name: /ask charles/i })).toBeTruthy()
  })

  it("opens the panel and shows the starter prompts", () => {
    localStorage.clear()
    setCurrentPaper("SBR")
    render(<CharlesCompanion />)
    fireEvent.click(screen.getByRole("button", { name: /ask charles/i }))
    expect(screen.getByRole("dialog", { name: /charles/i })).toBeTruthy()
    expect(screen.getByText(/how is this paper's exam structured/i)).toBeTruthy()
  })
})
