// @vitest-environment jsdom
import { describe, expect, it, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/i18n/LanguageProvider"
import { MarketAtGlance } from "@/pages/Landing"
import {
  MARKET_HEADLINES,
  MEMBERS_BY_YEAR,
  MEMBER_GROWTH_PCT,
  MEMBER_GROWTH_CAGR_PCT,
  EXAMS_DEC_2025,
  EXAMS_JUN_2026,
} from "@/lib/acca-market-stats"

/*
 * The market-at-a-glance section puts audited ACCA figures on the front door,
 * so the same two-way pinning as the pass-rate section: the surface renders
 * every headline (LazyOnView hides it from the Landing render test), and every
 * COMPUTED figure stays consistent with the published figures it is derived
 * from — the section's promise is "only real numbers", so a stat that drifts
 * from its own components must fail the build, not ship.
 */
afterEach(cleanup)

const byLabel = (fragment: string) => {
  const stat = MARKET_HEADLINES.find((s) => s.label.includes(fragment))
  if (!stat) throw new Error(`no headline stat labelled like "${fragment}"`)
  return stat
}

describe("landing market-at-a-glance section", () => {
  it("renders all eight headline stats, the growth panel, and the sources", () => {
    render(
      <LanguageProvider>
        <MarketAtGlance />
      </LanguageProvider>,
    )
    expect(MARKET_HEADLINES).toHaveLength(8)
    for (const stat of MARKET_HEADLINES) {
      expect(screen.getByText(stat.label)).toBeTruthy()
    }
    expect(screen.getByText("Six years of members")).toBeTruthy()
    // The line chart's endpoint labels are static text — the audited first and
    // last members figures must be on the page even before any count-up runs.
    expect(screen.getByText(MEMBERS_BY_YEAR[0].members.toLocaleString("en-GB"))).toBeTruthy()
    expect(screen.getByText(MEMBERS_BY_YEAR[MEMBERS_BY_YEAR.length - 1].members.toLocaleString("en-GB"))).toBeTruthy()
    expect(screen.getByText(/ACCA Annual Integrated Report FY 2025–26/)).toBeTruthy()
  })

  it("total community equals members plus future members", () => {
    expect(byLabel("Total ACCA community").value).toBe(
      byLabel("members worldwide").value + byLabel("Future members").value,
    )
  })

  it("exams completed equals the sum of the two results releases", () => {
    expect(byLabel("Exams completed").value).toBe(EXAMS_DEC_2025 + EXAMS_JUN_2026)
  })

  it("the growth chips are derived from the audited series, not typed by hand", () => {
    const first = MEMBERS_BY_YEAR[0].members
    const last = MEMBERS_BY_YEAR[MEMBERS_BY_YEAR.length - 1].members
    const round1 = (n: number) => Math.round(n * 10) / 10
    expect(MEMBER_GROWTH_PCT).toBe(round1((last / first - 1) * 100))
    expect(MEMBER_GROWTH_CAGR_PCT).toBe(round1((Math.pow(last / first, 1 / (MEMBERS_BY_YEAR.length - 1)) - 1) * 100))
  })

  it("the members series matches the audited table: six years, strictly rising, ending at the headline figure", () => {
    expect(MEMBERS_BY_YEAR).toHaveLength(6)
    for (let i = 1; i < MEMBERS_BY_YEAR.length; i++) {
      expect(MEMBERS_BY_YEAR[i].members).toBeGreaterThan(MEMBERS_BY_YEAR[i - 1].members)
    }
    expect(MEMBERS_BY_YEAR[MEMBERS_BY_YEAR.length - 1].members).toBe(byLabel("members worldwide").value)
  })
})
