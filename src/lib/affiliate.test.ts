import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  AFFILIATE_ATTRIBUTION_DAYS,
  captureAffiliateRef,
  clearCapturedAffiliate,
  dollarsFromCents,
  getCapturedAffiliate,
} from "@/lib/affiliate"

beforeEach(() => {
  localStorage.clear()
  Object.assign(window, { location: { search: "" } })
  vi.restoreAllMocks()
})

describe("partner attribution capture", () => {
  it("keeps database cents and dashboard dollars on the same money scale", () => {
    expect(dollarsFromCents(405)).toBe(4.05)
    expect(dollarsFromCents(3240)).toBe(32.4)
    expect(dollarsFromCents(Number.NaN)).toBe(0)
  })
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

  it("keeps the first partner when another link is opened inside the attribution window", () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }))
    Object.assign(window, { location: { search: "?aff=FIRST27" } })
    captureAffiliateRef()
    Object.assign(window, { location: { search: "?aff=SECOND27" } })
    captureAffiliateRef()

    expect(getCapturedAffiliate()).toBe("FIRST27")
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it("expires an anonymous first touch after the published 90-day window", () => {
    const now = Date.parse("2026-08-14T00:00:00Z")
    localStorage.setItem(
      "scholify-affiliate-code",
      JSON.stringify({ code: "OLD27", capturedAt: now - (AFFILIATE_ATTRIBUTION_DAYS * 86_400_000 + 1) }),
    )
    vi.spyOn(Date, "now").mockReturnValue(now)

    expect(getCapturedAffiliate()).toBeNull()
    expect(localStorage.getItem("scholify-affiliate-code")).toBeNull()
  })
})
