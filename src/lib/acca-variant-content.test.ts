import { beforeEach, describe, expect, it } from "vitest"
import { setPaperVariant, getPaperVariant, paperVariantLabel } from "@/lib/acca-profile"

/*
 * ── Why this file no longer tests an overlay ──────────────────────
 * It used to import applyVariantStudyContent from acca-variant-content.ts and assert that
 * a UK or Global orientation section was prepended to chapter 1. That module has been
 * DELETED, because every variant that ships now selects its own authored chapters:
 *
 *   LW-Global   33 authored chapters      acca-study-lw-global.ts
 *   LW-ENG      46 authored chapters      acca-study-lw-eng.ts
 *   TX-UK       29 authored chapters      acca-study-tx-tree.ts   (FA2025)
 *   TX-Global    7 chapters               acca-study-tx-global.ts (foundation track)
 *
 * The overlay existed for exactly one purpose: to give a variant reading the OTHER
 * variant's chapters some orientation about its own syllabus. LW stopped needing it when
 * both its variants got their own tree, and TX-UK — the last caller — stopped needing it
 * when it got its own FA2025 tree. Prepending a "United Kingdom variant" section to a tree
 * that is already entirely UK law would be the cosmetic-variant defect the rebuilds exist
 * to remove.
 *
 * What still matters, and is still tested here, is that the variant SELECTION itself works:
 * the defaults, the persistence and the labels.
 */

describe("LW and TX paper variants", () => {
  beforeEach(() => window.localStorage.clear())

  it("uses safe defaults for existing learners", () => {
    // LW defaults to GLOBAL and TX to UK, matching each paper's most-taken route.
    expect(getPaperVariant("LW")).toBe("GLOBAL")
    expect(getPaperVariant("TX")).toBe("UK")
  })

  it("persists and labels each selected system", () => {
    setPaperVariant("LW", "UK")
    setPaperVariant("TX", "GLOBAL")
    expect(getPaperVariant("LW")).toBe("UK")
    expect(getPaperVariant("TX")).toBe("GLOBAL")
    expect(paperVariantLabel("LW")).toBe("LW · United Kingdom")
    expect(paperVariantLabel("TX")).toBe("TX · Foundation")
  })

  it("keeps each paper's variant independent of the other's", () => {
    setPaperVariant("TX", "GLOBAL")
    expect(getPaperVariant("LW")).toBe("GLOBAL")
    setPaperVariant("LW", "UK")
    expect(getPaperVariant("TX")).toBe("GLOBAL")
  })
})
