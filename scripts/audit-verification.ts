/*
 * Runtime integrity audit. Unlike the old registry-only audit, this verifies
 * the exact content objects and mock forms shipped to learners.
 */
import { ALL_PAPERS } from "@/lib/acca-qualification"
import { loadPaperContent } from "@/lib/acca-paper-content"
import { paperContent } from "@/lib/acca-content-registry"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

const problems: string[] = []

for (const paper of ALL_PAPERS) {
  await loadPaperContent(paper.id)
  const content = paperContent(paper.id)
  const areas = new Set(paper.areas.map((area) => area.code))
  const ids = new Set<string>()

  for (const question of content.questions) {
    if (ids.has(question.id)) problems.push(`${paper.id}: duplicate question id ${question.id}`)
    ids.add(question.id)
    if (!question.stem.trim()) problems.push(`${paper.id}: ${question.id} has an empty stem`)
    if (!question.explanation.trim()) problems.push(`${paper.id}: ${question.id} has no explanation`)
    if (!areas.has(question.area)) problems.push(`${paper.id}: ${question.id} uses unknown Area ${question.area}`)
    if (question.paper !== paper.id) problems.push(`${paper.id}: ${question.id} is tagged ${question.paper}`)
    if (question.marks <= 0) problems.push(`${paper.id}: ${question.id} has invalid marks`)
    if (question.type === "mcq") {
      if (!question.options || question.options.length < 2) problems.push(`${paper.id}: ${question.id} has insufficient options`)
      if (typeof question.correct !== "number" || question.correct < 0 || question.correct >= (question.options?.length ?? 0))
        problems.push(`${paper.id}: ${question.id} has an invalid correct option`)
    }
    if (question.type === "multi") {
      if (!Array.isArray(question.correct) || !question.correct.length) problems.push(`${paper.id}: ${question.id} has no correct selections`)
      if ((question.correct as number[] | undefined)?.some((answer) => answer < 0 || answer >= (question.options?.length ?? 0)))
        problems.push(`${paper.id}: ${question.id} has an invalid correct selection`)
    }
    if (question.type === "number" && !Number.isFinite(question.numericAnswer))
      problems.push(`${paper.id}: ${question.id} has an invalid numeric answer`)
  }

  for (const card of content.flashcards) {
    if (!card.front.trim() || !card.back.trim()) problems.push(`${paper.id}: flashcard ${card.id} has an empty side`)
    if (!areas.has(card.area)) problems.push(`${paper.id}: flashcard ${card.id} uses unknown Area ${card.area}`)
  }

  if (!paper.objectiveOnly) {
    const writtenIds = new Set<string>()
    for (const task of content.written) {
      if (writtenIds.has(task.id)) problems.push(`${paper.id}: duplicate written id ${task.id}`)
      writtenIds.add(task.id)
      if (!task.stem.trim() || !task.rubric.length || task.maxMarks <= 0)
        problems.push(`${paper.id}: written task ${task.id} is incomplete`)
    }
  }

  for (const form of [1, 2, 3]) {
    const mock = buildCbeMock(paper.id, form)
    if (mock.totalMarks !== 100) problems.push(`${paper.id}: mock form ${form} totals ${mock.totalMarks} (${mock.sections.map((section) => `${section.id}:${section.marks}`).join(", ")}), expected 100`)
    if (mock.seconds <= 0 || !mock.sections.length) problems.push(`${paper.id}: mock form ${form} is not runnable`)
  }
}

if (problems.length) {
  console.error(`${problems.length} runtime verification problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log(`Runtime verification passed: ${ALL_PAPERS.length} papers, valid banks/cards/written tasks, and 45 exact 100-mark mocks.`)
