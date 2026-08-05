import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * Migrate the LEGACY TX bank onto the official seven-area syllabus and the FA2025 basis.
 *
 * The legacy content was authored against an older area ordering and an older Finance Act, so
 * three transformations are applied to it: the area is remapped, years and FA references are
 * bumped, and questions whose figures changed in FA2025 are WITHHELD until a recomputed
 * replacement exists.
 *
 * ── Why the `chapter` guard is load-bearing ─────────────────────
 * Anything carrying a `chapter` belongs to the per-chapter question kit, which was authored
 * directly against the official syllabus ON the FA2025 basis. Running kit content through
 * this migration does three separate kinds of damage, and all three were observed before the
 * guard was added:
 *
 *   1. AREA SHIFTING. `official()` maps A→B, B→C, C→E, D→F and E→D, so every kit question
 *      landed in the wrong area — the administration questions appeared under income tax, and
 *      Area A ended up with no numeric questions at all.
 *   2. TEXT REWRITING. `nextExamYear` bumps every year it finds. A kit question that correctly
 *      says "the year ended 30 September 2025" became a different year, which breaks a
 *      tax-year-basis apportionment outright.
 *   3. SILENT DELETION. `hasChangedFa2025Rate` withholds anything mentioning business asset
 *      disposal relief at 10% or CGT at 10%/20%. The kit mentions those figures DELIBERATELY,
 *      as the superseded rates a candidate must not use — so twenty authored questions were
 *      being filtered out for teaching the very point they exist to teach.
 *
 * So kit content passes through untouched. This map exists solely for the legacy bank.
 */

function official(area: string): string {
  return ({ A: "B", B: "C", C: "E", D: "F", E: "D" } as Record<string, string>)[area] ?? area
}

function nextExamYear(text: string): string {
  return text
    .replace(/\b20(2[0-8])(?:([/-])(2[1-9]))?\b/g, (_, start: string, separator?: string, end?: string) => separator && end ? `${Number(start) + 2001}${separator}${Number(end) + 1}` : String(Number(start) + 2001))
    .replace(/FA2024/g, "FA2025")
    .replace(/UK-domiciled/gi, "long-term UK resident")
    .replace(/UK domiciled/gi, "long-term UK resident")
}

function questionText(item: AccaQuestion): string {
  return `${item.stem} ${item.explanation} ${item.options?.join(" ") ?? ""}`
}

/** Rate-sensitive FA2024 questions are withheld until a recomputed FA2025 replacement exists. */
function hasChangedFa2025Rate(item: AccaQuestion): boolean {
  const text = questionText(item)
  return /2\.25%|13\.8%|£9,100|employment allowance[^.\n]{0,60}£5,000/i.test(text)
    || /(?:BADR|business asset disposal relief)[^.\n]{0,120}(?:10%|at a flat 10%)/i.test(text)
    || /(?:capital gains tax|CGT|chargeable gain)[^.\n]{0,160}(?:10%\/?20%|10% and 20%|at 10%|at 20%)/i.test(text)
}

/**
 * Content authored against the official syllabus ON the FA2025 basis, which must pass through
 * every transformation untouched. The `chapter` field marks the per-chapter kits and the
 * authored Section C; the two id prefixes are the earlier hand-migrated additions for Areas
 * A and G.
 */
function isAuthoredForOfficialSyllabus(item: { id: string; chapter?: string }): boolean {
  return Boolean(item.chapter) || item.id.startsWith("TX-A-O") || item.id.startsWith("TX-G-O")
}

function migrateQuestion(item: AccaQuestion): AccaQuestion {
  const migrated = JSON.parse(nextExamYear(JSON.stringify(item))) as AccaQuestion
  return { ...migrated, id: item.id, area: official(item.area) }
}

export function mapTxQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items
    .filter((item) => isAuthoredForOfficialSyllabus(item) || !hasChangedFa2025Rate(item))
    .map((item) => (isAuthoredForOfficialSyllabus(item) ? item : migrateQuestion(item)))
}

export function mapTxFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items
    .filter((item) => item.id.includes("-FC-FA25-") || item.id.startsWith("TX-A-FC-") || item.id.startsWith("TX-G-FC-") || !/2\.25%|13\.8%|£9,100|BADR[^\n]{0,100}10%|business asset disposal relief[^\n]{0,100}10%|CGT[^\n]{0,120}(?:10%|20%)/i.test(`${item.front} ${item.back}`))
    .map((item) => item.id.includes("-FC-FA25-") || item.id.startsWith("TX-A-FC-") || item.id.startsWith("TX-G-FC-") ? item : { ...item, area: official(item.area), front: nextExamYear(item.front), back: nextExamYear(item.back) })
}

/*
 * The written mapper needs the same guard. TX-UK's nine authored constructed responses carry
 * a `chapter`, and without it the Area A administration and ethics question was relabelled as
 * Area B — so Section C appeared to cover no Area A at all.
 */
export function mapTxWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] {
  return items.map((item) => (isAuthoredForOfficialSyllabus(item) ? item : { ...item, area: official(item.area) }))
}
