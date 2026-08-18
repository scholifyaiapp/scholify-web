// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup, screen } from "@testing-library/react"
import MockCentre from "./MockCentre"
import { recordMock } from "@/lib/acca"

/*
 * The FIRST render test in the repo. This repo shipped render-time crashes that
 * typecheck and the node-env logic suite could not catch (an unguarded diagram
 * cast, a null-subscription access). A jsdom render is the tool that catches
 * that whole class: if the component throws while rendering, render() throws and
 * the test fails. Start with the newest UI surface — the Mock Exam Centre.
 */
afterEach(cleanup)

const noop = () => {}

describe("MockCentre renders without crashing", () => {
  it("renders the empty state (no attempts yet)", () => {
    localStorage.clear()
    render(<MockCentre paperId="SBR" onBack={noop} onStart={noop} onStudyArea={noop} />)
    expect(screen.getByText("Mock Exam Centre")).toBeTruthy()
    // Empty-state CTA, not the "Start Mock — Form N" one.
    expect(screen.getByText(/sit your first mock/i)).toBeTruthy()
  })

  it("renders with a history of attempts (trend, stats, forms, focus areas)", () => {
    localStorage.clear()
    recordMock("SBR", 62, 100, 1)
    recordMock("SBR", 48, 100, 2)
    recordMock("SBR", 71, 100, 3)
    render(<MockCentre paperId="SBR" onBack={noop} onStart={noop} onStudyArea={noop} />)
    expect(screen.getByText("Mock Exam Centre")).toBeTruthy()
    // Best score (71%) surfaces somewhere in the stats/hero.
    expect(screen.getAllByText(/71/).length).toBeGreaterThan(0)
    // Recent sittings list is present.
    expect(screen.getByText(/recent sittings/i)).toBeTruthy()
  })

  it("renders for a paper with a different exam shape (SBL)", () => {
    localStorage.clear()
    recordMock("SBL", 55, 100, 1)
    render(<MockCentre paperId="SBL" onBack={noop} onStart={noop} onStudyArea={noop} />)
    expect(screen.getByText("Mock Exam Centre")).toBeTruthy()
  })
})
