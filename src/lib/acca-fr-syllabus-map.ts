import type { AccaQuestion } from "@/lib/acca-content"
import type { Flashcard } from "@/lib/acca-flashcards"
import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * Relabel the LEGACY FR content onto the official five-area syllabus.
 *
 * FR's old content was authored when the fifth area was "Preparation of financial
 * statements" rather than "Employability and technology skills". So legacy items tagged
 * area "E" are preparation content and belong in area D; items written for the new Area E
 * are identified by id prefix and left alone.
 *
 * ── Why the `chapter` guard matters ────────────────────────────
 * Anything carrying a `chapter` belongs to the per-chapter question kit, the OT cases or the
 * authored Section C bank, all of which were written against the OFFICIAL syllabus and
 * already hold the correct area. Without the guard the E→D shift below would silently move
 * every authored Area E item — the whole employability chapter's kit — into area D, and the
 * chapter's own area would then disagree with its questions'.
 *
 * That is exactly the defect that bit the TX rebuild, where a mapper without this guard
 * shifted areas, bumped tax years and silently filtered out twenty authored questions. Here
 * it was caught by the contract test's assertion that a question's area must match its
 * chapter's — which is why that assertion exists.
 *
 * The map now applies only to the legacy FLASHCARD set, the sole remaining FR content still
 * relabelled: the legacy question bank was retired when the authored kit replaced it. The
 * guard is retained on all three functions so the mistake cannot be reintroduced by a future
 * edit to the module list.
 */

const preparationArea = (area: string) => (area === "E" ? "D" : area)

/** Authored content carries a `chapter` and is already on the official syllabus. */
function isAuthoredForOfficialSyllabus(item: { id: string; chapter?: string }): boolean {
  return Boolean(item.chapter) || item.id.startsWith("FR-E-O")
}

export function mapFrQuestionsToOfficialSyllabus(items: AccaQuestion[]): AccaQuestion[] {
  return items.map((item) =>
    isAuthoredForOfficialSyllabus(item) ? item : { ...item, area: preparationArea(item.area) },
  )
}

export function mapFrFlashcardsToOfficialSyllabus(items: Flashcard[]): Flashcard[] {
  return items.map((item) =>
    item.id.startsWith("FR-E-FC-") ? item : { ...item, area: preparationArea(item.area) },
  )
}

export function mapFrWrittenToOfficialSyllabus(items: WrittenQuestion[]): WrittenQuestion[] {
  return items.map((item) =>
    isAuthoredForOfficialSyllabus(item) ? item : { ...item, area: preparationArea(item.area) },
  )
}
