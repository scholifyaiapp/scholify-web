import type { Flashcard } from "@/lib/acca-flashcards"
import type { StudyChapter } from "@/lib/acca-study-content"

const F1_F4 = new Set(["BT", "MA", "FA", "LW"])
export const F1_F4_FLASHCARD_TARGET = 120

function clean(value: string): string {
  return value.replace(/\*\*/g, "").replace(/\s+/g, " ").trim()
}

/**
 * Complete an F1–F4 deck from already-reviewed chapter content. This does not
 * invent facts: every derived card points back to a key term, exam trap,
 * learning outcome, recap, or authored mini-check in the paper's study text.
 */
export function completeStudyFlashcards(
  paperId: string,
  existing: Flashcard[],
  chapters: StudyChapter[],
  target = F1_F4_FLASHCARD_TARGET,
): Flashcard[] {
  const explicitlyExpanded = target !== F1_F4_FLASHCARD_TARGET
  if ((!F1_F4.has(paperId) && !explicitlyExpanded) || existing.length >= target) {
    return existing.slice(0, Math.max(existing.length, target))
  }
  const used = new Set(existing.map((card) => `${clean(card.front).toLowerCase()}|${clean(card.back).toLowerCase()}`))
  const candidates: Omit<Flashcard, "id">[] = []

  for (const chapter of chapters) {
    for (const item of chapter.keyTerms) candidates.push({ paper: paperId, area: chapter.area, front: clean(item.term), back: clean(item.def) })
    for (const item of chapter.examTraps) candidates.push({ paper: paperId, area: chapter.area, front: `Exam trap: ${clean(item.trap)}`, back: clean(item.fix) })
    chapter.outcomes.forEach((item, index) => candidates.push({
      paper: paperId,
      area: chapter.area,
      front: `${chapter.title}: skill ${index + 1}`,
      back: clean(item),
    }))
    chapter.summary.forEach((item, index) => candidates.push({
      paper: paperId,
      area: chapter.area,
      front: `${chapter.title}: recap ${index + 1}`,
      back: clean(item),
    }))
    for (const section of chapter.sections) {
      if (!section.check) continue
      candidates.push({
        paper: paperId,
        area: chapter.area,
        front: clean(section.check.q),
        back: clean(section.check.explain),
      })
    }
  }

  const out = [...existing]
  for (const candidate of candidates) {
    if (out.length >= target) break
    if (!candidate.front || !candidate.back) continue
    const signature = `${candidate.front.toLowerCase()}|${candidate.back.toLowerCase()}`
    if (used.has(signature)) continue
    used.add(signature)
    out.push({ ...candidate, id: `${paperId}-STUDY-FC-${String(out.length + 1).padStart(3, "0")}` })
  }
  return out
}
