import { describe, expect, it } from "vitest"
import { safeInternalPath } from "./navigation"

describe("safeInternalPath", () => {
  it("keeps normal internal destinations", () => {
    expect(safeInternalPath("/admin?tab=users")).toBe("/admin?tab=users")
  })

  it("rejects protocol-relative, absolute and backslash redirects", () => {
    expect(safeInternalPath("//evil.example")).toBe("/dashboard")
    expect(safeInternalPath("https://evil.example")).toBe("/dashboard")
    expect(safeInternalPath("/\\evil.example")).toBe("/dashboard")
  })
})
