import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  captureAffiliateRef,
  clearCapturedAffiliate,
  getCapturedAffiliate,
} from "@/lib/affiliate"

beforeEach(() => {
  localStorage.clear()
  Object.assign(window, { location: { search: "" } })
  vi.restoreAllMocks()
})

describe("partner attribution capture", () => {
  it("normalizes and stores an affiliate code", () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }))
    Object.assign(window, { location: { search: "?aff=partner-27" } })

    captureAffiliateRef()

    expect(getCapturedAffiliate()).toBe("PARTNER27")
    expect(fetch).toHaveBeenCalledOnce()
  })

  it("persists until successfully claimed or explicitly cleared", () => {
    localStorage.setItem("scholify-affiliate-code", "EXACT27")
    expect(getCapturedAffiliate()).toBe("EXACT27")
    clearCapturedAffiliate()
    expect(getCapturedAffiliate()).toBeNull()
  })
})
