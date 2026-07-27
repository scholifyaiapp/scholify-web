import { describe, expect, it } from "vitest"
import { safeInternalPath, ownsAuthHash } from "./navigation"

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

/*
 * Supabase sends password recovery to redirectTo with the same
 * `#access_token=…` hash an OAuth return uses, so App's OAuthReturnHandler
 * cannot distinguish them by hash — it must skip by path. Without the skip it
 * stripped the hash and navigated to /dashboard or /auth/callback, so a reset
 * link just signed the user in and left the OLD password valid.
 */
describe("ownsAuthHash", () => {
  it("claims the password-recovery route", () => {
    expect(ownsAuthHash("/reset-password")).toBe(true)
  })

  it("tolerates a trailing slash and casing", () => {
    expect(ownsAuthHash("/reset-password/")).toBe(true)
    expect(ownsAuthHash("/Reset-Password")).toBe(true)
  })

  it("leaves the real OAuth return and every other route to the handler", () => {
    expect(ownsAuthHash("/auth/callback")).toBe(false)
    expect(ownsAuthHash("/")).toBe(false)
    expect(ownsAuthHash("/dashboard")).toBe(false)
    expect(ownsAuthHash("/reset-password-extra")).toBe(false)
  })

  it("is safe on missing input", () => {
    expect(ownsAuthHash(null)).toBe(false)
    expect(ownsAuthHash(undefined)).toBe(false)
    expect(ownsAuthHash("")).toBe(false)
  })
})
