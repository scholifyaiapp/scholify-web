/*
 * Prove the DYNAMIC content loader actually works — the path the browser takes.
 *
 * The vitest suite loads content through an eager bootstrap (Node has no loader
 * lifecycle), so it cannot see a failure in `loadPaperContent()`. But that async
 * path is exactly what a real student hits: if one paper's dynamic import is
 * missing a module, the browser shows an empty bank and a blank study screen, and
 * every synchronous test still passes. So it gets its own check.
 *
 * This starts from an EMPTY registry, loads each paper one at a time, and asserts
 * the loaded slice matches what that paper is supposed to have.
 *
 * Run: npm run verify:loading   (exits 1 on any paper that fails to load)
 */

import { ALL_PAPERS } from "@/lib/acca-qualification"
import { loadPaperContent } from "@/lib/acca-paper-content"
import { isPaperContentLoaded, paperContent } from "@/lib/acca-content-registry"
import { questionCount } from "@/lib/acca-content-counts"

const problems: string[] = []
const rows: string[] = []

for (const paper of ALL_PAPERS) {
  const id = paper.id
  try {
    await loadPaperContent(id)
  } catch (err) {
    problems.push(`${id}: loadPaperContent threw — ${err instanceof Error ? err.message : String(err)}`)
    continue
  }

  if (!isPaperContentLoaded(id)) {
    problems.push(`${id}: loader resolved but the registry says the paper isn't loaded`)
    continue
  }

  const c = paperContent(id)

  // A student who opens this paper must find a real bank behind it.
  if (c.questions.length === 0) problems.push(`${id}: loaded with ZERO questions — the study screen would be empty`)
  // The eager count map drives the picker's readiness % for unloaded papers; if it
  // disagrees with what actually loads, the picker lies.
  if (c.questions.length !== questionCount(id))
    problems.push(`${id}: loaded ${c.questions.length} questions but acca-content-counts says ${questionCount(id)}`)
  // A paper must never be handed another paper's content.
  const foreign = c.questions.filter((q) => q.paper !== id).length
  if (foreign) problems.push(`${id}: ${foreign} loaded question(s) belong to another paper`)

  const areas = new Set(paper.areas.map((a) => a.code))
  const orphan = c.questions.filter((q) => !areas.has(q.area)).length
  if (orphan) problems.push(`${id}: ${orphan} loaded question(s) sit in an area this paper doesn't have`)

  if (c.flashcards.length === 0) problems.push(`${id}: loaded with zero flashcards`)
  if (c.chapters.length === 0) problems.push(`${id}: loaded with zero study chapters`)
  if (!paper.objectiveOnly && c.written.length === 0)
    problems.push(`${id}: loaded with zero written questions, but its exam has a written section`)

  rows.push(
    `${id.padEnd(4)} ${String(c.questions.length).padStart(4)}q  ${String(c.flashcards.length).padStart(3)} cards  ` +
      `${String(c.written.length).padStart(2)} written  ${String(c.chapters.length).padStart(2)} chapters  ` +
      `${String(c.briefs.length).padStart(2)} briefs`,
  )
}

console.log("Dynamically loaded, one paper at a time:\n")
for (const r of rows) console.log("  " + r)

if (problems.length) {
  console.error(`\n✖ ${problems.length} paper(s) fail to load correctly:`)
  for (const p of problems) console.error(`  · ${p}`)
  process.exit(1)
}

console.log(`\n✓ All ${rows.length} papers load their own content dynamically, and only their own.`)
