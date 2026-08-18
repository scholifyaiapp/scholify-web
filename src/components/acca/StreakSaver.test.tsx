// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"
import StreakSaver from "./StreakSaver"

/* Renders nothing and must never throw — it only manages the tab title. */
afterEach(cleanup)

describe("StreakSaver", () => {
  it("renders nothing and does not crash", () => {
    localStorage.clear()
    const { container } = render(<StreakSaver />)
    expect(container.firstChild).toBeNull()
  })
})
