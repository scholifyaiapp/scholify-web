/*
 * Structural validation of the FR reading tree, run before it is wired into the loader.
 *
 * It checks the invariants the app relies on — contiguous numbering, unique ids (which are
 * learner-progress keys), full area coverage — and reports the depth figures so a
 * regression in content volume is visible rather than silent.
 */
import { FR_TREE } from "@/lib/acca-study-fr-tree"

const areas = new Map<string, number>()
let blocks = 0
let sectionChecks = 0
let diagnostics = 0
let examples = 0
let activities = 0

for (const chapter of FR_TREE) {
  areas.set(chapter.area, (areas.get(chapter.area) ?? 0) + 1)
  for (const section of chapter.sections) {
    blocks += section.blocks.length
    if (section.check) sectionChecks++
    for (const block of section.blocks) {
      if (block.kind === "example") examples++
      if (block.kind === "activity") activities++
    }
  }
  diagnostics += chapter.knowledgeDiagnostic?.length ?? 0
}

const numbers = FR_TREE.map((c) => c.number)
const expected = Array.from({ length: FR_TREE.length }, (_, i) => i + 1)

const problems: string[] = []
if (JSON.stringify(numbers) !== JSON.stringify(expected)) problems.push("chapter numbers are not contiguous from 1")
if (new Set(FR_TREE.map((c) => c.id)).size !== FR_TREE.length) problems.push("duplicate chapter ids")
if ([...areas.keys()].sort().join("") !== "ABCDE") problems.push(`areas covered are ${[...areas.keys()].sort().join(",")}, expected A to E`)
for (const chapter of FR_TREE) {
  const where = `${chapter.id} ${chapter.title}`
  if (!chapter.syllabusRefs?.length) problems.push(`${where}: no syllabusRefs`)
  if (!chapter.examTraps.length) problems.push(`${where}: no examTraps`)
  if (!chapter.keyTerms.length) problems.push(`${where}: no keyTerms`)
  if (!chapter.summary.length) problems.push(`${where}: no summary`)
  if (!chapter.knowledgeDiagnostic?.length) problems.push(`${where}: no knowledgeDiagnostic`)
  if (chapter.sections.length < 2) problems.push(`${where}: fewer than two sections`)
  if (chapter.minutes < 10 || chapter.minutes > 20) problems.push(`${where}: minutes ${chapter.minutes} outside 10-20`)
  if (!chapter.sections.some((s) => s.check)) problems.push(`${where}: no section carries a check`)
}

console.log(`chapters              ${FR_TREE.length}`)
console.log(`areas                 ${[...areas.entries()].sort().map(([a, n]) => `${a}:${n}`).join("  ")}`)
console.log(`blocks                ${blocks}`)
console.log(`worked examples       ${examples}`)
console.log(`activities            ${activities}`)
console.log(`section checks        ${sectionChecks}`)
console.log(`diagnostic Q&A        ${diagnostics}`)
console.log(`total reading minutes ${FR_TREE.reduce((a, c) => a + c.minutes, 0)}`)

if (problems.length) {
  console.log(`\n✖ ${problems.length} problem(s):`)
  for (const p of problems) console.log(`  · ${p}`)
  process.exit(1)
}
console.log("\n✓ FR tree structurally valid")
