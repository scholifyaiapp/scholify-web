import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

const riskPattern = /foreign exchange|currency|exchange rate|interest rate (?:risk|hedg|future|option|swap|cap|floor|collar)|money.market hedge|forward contract|transaction risk|translation risk|economic risk|\bFRA\b|purchasing power parity|interest rate parity/i

function officialArea(area: string, text: string): string {
  if (area === "B") return "D"
  if (area === "D") return "E"
  if (area === "E") return riskPattern.test(text) ? "G" : "F"
  return area
}

export function mapFmQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items.map((item) => item.id.startsWith("FM-B-O") || item.id.startsWith("FM-H-O") ? item : { ...item, area: officialArea(item.area, `${item.stem} ${item.explanation}`) })
}
export function mapFmFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items.map((item) => item.id.startsWith("FM-B-FC-") || item.id.startsWith("FM-H-FC-") ? item : { ...item, area: officialArea(item.area, `${item.front} ${item.back}`) })
}
export function mapFmWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] {
  return items.map((item) => ({ ...item, area: officialArea(item.area, `${item.topic} ${item.stem}`) }))
}
