/*
 * Per-paper launch-readiness audit (Doc 10, Phase 2 — "journey correctness").
 *
 * The promise every promoted paper must keep: a student who picks it gets a
 * REAL diagnostic on THEIR syllabus, a bank deep enough to practise against,
 * flashcards, written questions, a brief per area, and a study chapter per
 * area — never an empty tile and never another paper's questions.
 *
 * Run: npm run audit:content   (exits 1 on any launch-blocking gap)
 */

import { getPapers, getQuestions } from "@/lib/acca"
import { buildDiagnostic } from "@/lib/acca-diagnostic"
import { getFlashcards } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getTopicBrief } from "@/lib/acca-briefs"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { questionCount } from "@/lib/acca-content-counts"

/** The practice-ladder floor a promoted paper must clear. */
const MIN_BANK = 150
const MIN_CARDS = 40
/**
 * A paper whose real exam HAS a constructed-response section must have written
 * questions to practise against — anything less and we advertise an AI Examiner
 * we can't feed. Papers flagged objectiveOnly (BT/MA/FA/LW) are exempt: their
 * exams are 100% objective-test, so zero written questions is the correct number.
 */
const MIN_WRITTEN = 15
/** A diagnostic that samples fewer areas than this can't speak honestly. */
const MIN_DIAGNOSTIC = 8

const blocking: string[] = []
const warnings: string[] = []
const rows: string[][] = []

for (const paper of getPapers()) {
  const id = paper.id
  const areas = paper.areas.map((a) => a.code)
  const bank = getQuestions(id)
  const diagnostic = buildDiagnostic(id, 42)
  const cards = getFlashcards(id)
  const written = getWrittenQuestions(id)
  const briefs = areas.filter((a) => getTopicBrief(id, a))
  const chapters = chaptersForPaper(id)

  // Every question must belong to a real syllabus area of THIS paper —
  // this is what makes a per-paper diagnostic trustworthy.
  const areaSet = new Set(areas)
  const orphans = bank.filter((q) => !areaSet.has(q.area))
  const wrongPaper = bank.filter((q) => q.paper !== id)
  // The diagnostic must draw only from this paper's bank (the FA-trap check).
  const foreign = diagnostic.filter((q) => q.paper !== id)
  // Areas the diagnostic actually reaches — coverage drives the confidence score.
  const diagAreas = new Set(diagnostic.map((q) => q.area))

  if (bank.length < MIN_BANK) blocking.push(`${id}: bank ${bank.length} < ${MIN_BANK}`)
  /*
   * Content loads per paper now, so a paper the student has NOT opened has no bank
   * in memory — and the picker still has to show its readiness %. Coverage there
   * reads the eager bank-size map in acca-content-counts.ts. If that map drifts
   * from the real banks, every unloaded paper's readiness silently lies, so the
   * two are asserted against each other here rather than trusted.
   */
  if (questionCount(id) !== bank.length)
    blocking.push(
      `${id}: QUESTION_COUNTS says ${questionCount(id)} but the bank holds ${bank.length} — update src/lib/acca-content-counts.ts`,
    )
  // A paper that advertises a curated bank must have one: hasCuratedContent() is
  // answered from this flag now (the picker reads it before any content loads).
  if (Boolean(paper.hasCuratedContent) !== bank.length > 0)
    blocking.push(
      `${id}: hasCuratedContent=${Boolean(paper.hasCuratedContent)} but the bank holds ${bank.length} question(s)`,
    )
  if (cards.length < MIN_CARDS) blocking.push(`${id}: flashcards ${cards.length} < ${MIN_CARDS}`)
  if (paper.objectiveOnly) {
    // The exam has no written section; the AI Examiner is hidden for this paper.
    if (written.length > 0)
      warnings.push(`${id}: flagged objectiveOnly but has ${written.length} written question(s) — one of the two is wrong`)
  } else if (written.length < MIN_WRITTEN) {
    blocking.push(
      `${id}: ${written.length} written question(s) < ${MIN_WRITTEN} — its exam HAS a constructed-response section, so the AI Examiner is underfed`,
    )
  }
  if (diagnostic.length < MIN_DIAGNOSTIC) blocking.push(`${id}: diagnostic only ${diagnostic.length} questions`)
  if (foreign.length) blocking.push(`${id}: diagnostic contains ${foreign.length} question(s) from another paper`)
  if (wrongPaper.length) blocking.push(`${id}: ${wrongPaper.length} bank question(s) tagged to another paper`)
  if (orphans.length) blocking.push(`${id}: ${orphans.length} question(s) in an unknown syllabus area`)
  if (diagAreas.size < areas.length)
    blocking.push(`${id}: diagnostic misses ${areas.length - diagAreas.size} of ${areas.length} syllabus areas`)
  if (briefs.length < areas.length) warnings.push(`${id}: briefs cover ${briefs.length}/${areas.length} areas`)
  if (chapters.length < areas.length) warnings.push(`${id}: study chapters cover ${chapters.length}/${areas.length} areas`)

  rows.push([
    id.padEnd(4),
    String(bank.length).padStart(4),
    `${diagnostic.length}q/${diagAreas.size}of${areas.length}`.padStart(12),
    String(cards.length).padStart(6),
    (paper.objectiveOnly ? "n/a" : String(written.length)).padStart(8),
    `${briefs.length}/${areas.length}`.padStart(7),
    `${chapters.length}/${areas.length}`.padStart(9),
  ])
}

console.log("paper  bank    diagnostic  cards  written  briefs  chapters")
for (const r of rows) console.log(r.join("  "))

if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`)
  for (const w of warnings) console.log(`  · ${w}`)
}

if (blocking.length) {
  console.error(`\n✖ ${blocking.length} launch-blocking gap(s):`)
  for (const b of blocking) console.error(`  · ${b}`)
  process.exit(1)
}

console.log(
  `\n✓ All ${rows.length} papers clear the launch floor (bank ≥ ${MIN_BANK}, cards ≥ ${MIN_CARDS}, ` +
    `written ≥ ${MIN_WRITTEN} where the exam has a written section, full-syllabus diagnostic).`,
)
