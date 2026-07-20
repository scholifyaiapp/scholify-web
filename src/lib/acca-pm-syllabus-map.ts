import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

function shifted(area: string): string {
  if (area === "A") return "B"
  if (area === "B") return "C"
  if (area === "C") return "D"
  if (area === "D") return "E"
  return area
}

export function mapPmQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] { return items.map((item) => item.id.startsWith("PM-A-O") || item.id.startsWith("PM-F-O") ? item : ({ ...item, area: shifted(item.area) })) }
export function mapPmFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] { return items.map((item) => item.id.startsWith("PM-A-FC-") || item.id.startsWith("PM-F-FC-") ? item : ({ ...item, area: shifted(item.area) })) }
export function mapPmWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] { return items.map((item) => ({ ...item, area: shifted(item.area) })) }
