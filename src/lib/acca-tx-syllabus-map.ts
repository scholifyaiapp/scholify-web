import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

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

function migrateQuestion(item: AccaQuestion): AccaQuestion {
  const migrated = JSON.parse(nextExamYear(JSON.stringify(item))) as AccaQuestion
  const isOfficialAddition = item.id.startsWith("TX-A-O") || item.id.startsWith("TX-G-O")
  return { ...migrated, id: item.id, area: isOfficialAddition ? item.area : official(item.area) }
}

export function mapTxQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items
    .filter((item) => item.id.startsWith("TX-A-O") || item.id.startsWith("TX-G-O") || !hasChangedFa2025Rate(item))
    .map(migrateQuestion)
}
export function mapTxFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items
    .filter((item) => item.id.includes("-FC-FA25-") || item.id.startsWith("TX-A-FC-") || item.id.startsWith("TX-G-FC-") || !/2\.25%|13\.8%|£9,100|BADR[^\n]{0,100}10%|business asset disposal relief[^\n]{0,100}10%|CGT[^\n]{0,120}(?:10%|20%)/i.test(`${item.front} ${item.back}`))
    .map((item) => item.id.includes("-FC-FA25-") || item.id.startsWith("TX-A-FC-") || item.id.startsWith("TX-G-FC-") ? item : { ...item, area: official(item.area), front: nextExamYear(item.front), back: nextExamYear(item.back) })
}
export function mapTxWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] { return items.map((item) => ({ ...item, area: official(item.area) })) }
