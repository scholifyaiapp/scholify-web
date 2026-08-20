// @vitest-environment jsdom
import { describe, expect, it, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/i18n/LanguageProvider"
import { PassRates } from "@/pages/Landing"
import { JUNE_2026_PASS_RATES } from "@/lib/acca-pass-rates"

/*
 * The June 2026 pass-rate section makes a factual marketing claim on the
 * front door, so it gets two kinds of pinning: the surface renders every
 * paper (the Landing render test can't reach it — LazyOnView children stay
 * unmounted behind the IntersectionObserver stub), and the per-level average
 * chips stay honest against the per-paper figures they summarise.
 */
afterEach(cleanup)

describe("landing pass-rate section", () => {
  it("renders all fifteen papers under their three level headings", () => {
    render(
      <LanguageProvider>
        <PassRates />
      </LanguageProvider>,
    )
    for (const level of JUNE_2026_PASS_RATES) {
      expect(screen.getByText(level.level)).toBeTruthy()
      for (const paper of level.papers) {
        expect(screen.getByText(paper.name)).toBeTruthy()
        expect(screen.getByText(paper.code)).toBeTruthy()
      }
    }
    expect(JUNE_2026_PASS_RATES.flatMap((l) => l.papers)).toHaveLength(15)
    expect(screen.getByText(/June 2026 sitting/)).toBeTruthy()
  })

  it("every average chip is the rounded mean of its own papers — the claim can't drift", () => {
    for (const level of JUNE_2026_PASS_RATES) {
      const mean = level.papers.reduce((sum, p) => sum + p.rate, 0) / level.papers.length
      expect(level.average).toBe(Math.round(mean))
    }
  })

  it("pass rates are sane percentages, sorted hardest-last like the source table", () => {
    for (const level of JUNE_2026_PASS_RATES) {
      for (const paper of level.papers) {
        expect(paper.rate).toBeGreaterThan(0)
        expect(paper.rate).toBeLessThanOrEqual(100)
      }
      const rates = level.papers.map((p) => p.rate)
      expect([...rates].sort((a, b) => b - a)).toEqual(rates)
    }
  })
})
