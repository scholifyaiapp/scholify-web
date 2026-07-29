/*
 * Content census — the real depth of every paper, counted from the loaded library
 * rather than from documentation.
 *
 * Reports, per paper: study-chapter depth (chapters, sections, blocks, words,
 * inline checks) and question inventory split into AUTHORED exam-standard
 * questions vs derived recall DRILLS. That split is the point: the two used to be
 * one number, which made a paper padded with permuted glossary prompts read as
 * identical to a paper with a real bank.
 *
 * Run: npm run census:content
 */
import { loadPaperContent } from "@/lib/acca-paper-content"
import { paperContent } from "@/lib/acca-content-registry"

const PAPERS = ["BT", "MA", "FA", "LW", "PM", "TX", "FR", "AA", "FM", "SBL", "SBR", "AFM", "APM", "ATX", "AAA"]

async function main() {
  for (const id of PAPERS) {
    await loadPaperContent(id)
    const c = paperContent(id)
    const authored = c.questions.filter((q) => !q.recall)
    const recall = c.questions.filter((q) => q.recall)
    const caseQs = c.cases.flatMap((k) => k.questions)
    const caseRecall = caseQs.filter((q) => q.recall)
    const blocks = c.chapters.reduce((a, ch) => a + ch.sections.reduce((b, s) => b + s.blocks.length, 0), 0)
    const words = c.chapters.reduce(
      (a, ch) => a + ch.sections.reduce((b, s) => b + JSON.stringify(s.blocks).split(/\s+/).length, 0),
      0,
    )
    const checks = c.chapters.reduce((a, ch) => a + ch.sections.filter((s) => s.check).length, 0)
    console.log(
      [
        id.padEnd(4),
        `ch=${String(c.chapters.length).padStart(2)}`,
        `sec=${String(c.chapters.reduce((a, ch) => a + ch.sections.length, 0)).padStart(3)}`,
        `blocks=${String(blocks).padStart(4)}`,
        `words≈${String(words).padStart(6)}`,
        `checks=${String(checks).padStart(3)}`,
        `bankOT=${String(c.questions.length).padStart(4)}`,
        `authored=${String(authored.length).padStart(4)}`,
        `recall=${String(recall.length).padStart(4)}`,
        `caseOT=${String(caseQs.length).padStart(4)}`,
        `caseRecall=${String(caseRecall.length).padStart(4)}`,
        `drills=${String(c.drills.length).padStart(4)}`,
        `cards=${String(c.flashcards.length).padStart(4)}`,
        `written=${String(c.written.length).padStart(3)}`,
      ].join("  "),
    )
  }
}

main()
