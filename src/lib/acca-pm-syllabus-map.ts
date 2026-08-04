import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * Relabel the LEGACY PM bank onto the official six-area syllabus.
 *
 * PM's old content was authored when the paper had five areas, before "Management
 * information systems and data analytics" became Area A and "Employability and
 * technology skills" Area F. So every legacy item sits one area too low and has to shift
 * up: former A→B, B→C, C→D, D→E. Items already written for the new Areas A and F are
 * identified by id prefix and left alone.
 *
 * ── Why the `chapter` guard matters ────────────────────────────
 * Anything carrying a `chapter` belongs to the per-chapter question kit, which was
 * authored against the OFFICIAL syllabus and already holds the correct area. Without the
 * guard the shift below would scramble the whole kit — moving every Area B question to C,
 * C to D and so on — which is the trap that bit each earlier rebuild. This map exists
 * solely for the legacy bank; authored kit content passes through untouched.
 */

function shifted(area: string): string {
  if (area === "A") return "B"
  if (area === "B") return "C"
  if (area === "C") return "D"
  if (area === "D") return "E"
  return area
}

export function mapPmQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items.map((item) =>
    item.chapter || item.id.startsWith("PM-A-O") || item.id.startsWith("PM-F-O")
      ? item
      : { ...item, area: shifted(item.area) },
  )
}

export function mapPmFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items.map((item) =>
    item.id.startsWith("PM-A-FC-") || item.id.startsWith("PM-F-FC-")
      ? item
      : { ...item, area: shifted(item.area) },
  )
}

export function mapPmWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] {
  return items.map((item) => (item.chapter ? item : { ...item, area: shifted(item.area) }))
}
