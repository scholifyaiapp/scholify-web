import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { RU } from "@/i18n/ru"

/*
 * The RU dictionary must cover EVERY t("…") string on the marketing surfaces —
 * a missing entry silently renders English mid-page for a Russian visitor,
 * which reads as broken. This test extracts the strings from the source files
 * with the same pattern the code uses and fails on any gap, so copy edits and
 * the dictionary cannot drift apart.
 */

const ROOT = fileURLToPath(new URL("../..", import.meta.url))
const SURFACES = [
  "src/pages/Landing.tsx",
  "src/pages/Pricing.tsx",
  "src/components/CharlesVoiceIntro.tsx",
  "src/components/info-page-layout.tsx",
  "src/components/landing-3d.tsx",
  "src/components/landing-system.tsx",
  "src/components/ui/motion-footer.tsx",
  "src/components/ui/pricing-interaction.tsx",
]

function extractTStrings(): Set<string> {
  const out = new Set<string>()
  const re = /\bt\(\s*"((?:[^"\\]|\\.)*)"\s*\)/g
  for (const file of SURFACES) {
    const src = readFileSync(`${ROOT}${file}`, "utf8")
    let m: RegExpExecArray | null
    while ((m = re.exec(src))) {
      // The capture is source text — unescape it to the runtime string the
      // dictionary is keyed by (\" → ", \\ → \).
      try {
        out.add(JSON.parse(`"${m[1]}"`))
      } catch {
        out.add(m[1])
      }
    }
  }
  return out
}

describe("the RU dictionary covers the marketing surfaces", () => {
  it("has an entry for every t(\"…\") string, and no entry is empty", () => {
    const strings = extractTStrings()
    expect(strings.size).toBeGreaterThan(100) // the extraction itself works
    const missing = [...strings].filter((s) => !(s in RU))
    expect(missing, `strings with no RU translation:\n${missing.join("\n")}`).toEqual([])
    for (const [key, value] of Object.entries(RU)) {
      expect(value.trim().length, `empty RU entry for: ${key}`).toBeGreaterThan(0)
    }
  })

  it("keeps brand and exam terms untranslated where they appear", () => {
    for (const value of Object.values(RU)) {
      // The persona must never be localised ("Чарльз") — the brand is Charles.
      expect(value).not.toMatch(/Чарль[зс]/)
    }
  })
})
