/*
 * Exam-plan census — how much of the library actually teaches the QUESTION.
 *
 * Every section of every chapter is supposed to carry an `examQuestion` block:
 * the important question that section is examined by, taught as a plan
 * (requirement → route → model answer → where the marks go). Without a count,
 * "we added exam plans to F1–F9" is a claim nobody can check, and the sections
 * that were skipped are invisible — they look exactly like the ones that were
 * done, because a missing block renders as nothing at all.
 *
 * So this prints coverage per paper and, with --gaps, names the sections that
 * are still bare. --min=<pct> exits non-zero below a threshold, so it can gate.
 *
 * Run: npm run census:plans          (coverage table)
 *      npm run census:plans -- --gaps --paper=BT
 */
import { loadPaperContent } from "@/lib/acca-paper-content"
import { paperContent } from "@/lib/acca-content-registry"
import { chapterKey } from "@/lib/acca-study-content"
import type { StudyBlock } from "@/lib/acca-study-content"

/** F1–F9: the Applied tier, which is what the plan layer covers first. */
const APPLIED = ["BT", "MA", "FA", "LW", "PM", "TX", "FR", "AA", "FM"]
const PROFESSIONAL = ["SBL", "SBR", "AFM", "APM", "ATX", "AAA"]

/**
 * The formats each paper's real exam actually uses, and the marks each is worth.
 *
 * A plan claiming "written, 8 marks" on BT teaches a question that paper has
 * never set, and the whole layer's credibility rests on the requirements being
 * ones a learner will really meet. This table is the guard; it is derived from
 * acca-exam-structure.ts and any disagreement is a bug in one of the two.
 */
const LEGAL: Record<string, Partial<Record<"ot" | "mtq" | "written", number[]>>> = {
  BT: { ot: [1, 2], mtq: [4] },
  MA: { ot: [2], mtq: [10] },
  FA: { ot: [2], mtq: [15] },
  LW: { ot: [1, 2], mtq: [6] },
  PM: { ot: [2], mtq: [10], written: [10, 15, 20] },
  TX: { ot: [2], mtq: [10], written: [10, 15, 20] },
  FR: { ot: [2], mtq: [10], written: [10, 15, 20] },
  AA: { mtq: [10], written: [4, 5, 6, 8, 10, 20] },
  FM: { ot: [2], mtq: [10], written: [10, 15, 20] },
}

const argv = process.argv.slice(2)
const flag = (name: string) => argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1]
const has = (name: string) => argv.includes(`--${name}`)

const only = flag("paper")?.toUpperCase().split(",")
const min = Number(flag("min") ?? NaN)
const papers = only ?? (has("all") ? [...APPLIED, ...PROFESSIONAL] : APPLIED)

const isPlan = (b: StudyBlock): b is Extract<StudyBlock, { kind: "examQuestion" }> => b.kind === "examQuestion"

async function main() {
  let totalSections = 0
  let totalCovered = 0
  const gaps: string[] = []
  const problems: string[] = []

  for (const id of papers) {
    await loadPaperContent(id)
    const chapters = paperContent(id).chapters

    let sections = 0
    let covered = 0
    let plans = 0
    let marks = 0
    let planSteps = 0
    let thin = 0
    let illegal = 0

    for (const ch of chapters) {
      for (const s of ch.sections) {
        sections++
        const found = s.blocks.filter(isPlan)
        if (found.length === 0) {
          gaps.push(`${id}  ${chapterKey(ch)}  ${s.id}  ${s.heading}`)
          continue
        }
        covered++
        plans += found.length
        for (const p of found) {
          marks += p.marks
          planSteps += p.plan.length
          // A plan of one or two steps is a label, not a route — flag it.
          if (p.plan.length < 3) thin++
          const allowed = LEGAL[id]?.[p.format]
          if (!allowed || !allowed.includes(p.marks)) {
            illegal++
            problems.push(`${id}  ${chapterKey(ch)}::${s.id}  ${p.format} @ ${p.marks} marks is not a ${id} question`)
          }
        }
      }
    }

    totalSections += sections
    totalCovered += covered
    const pct = sections === 0 ? 0 : (covered / sections) * 100

    console.log(
      [
        id.padEnd(4),
        `sec=${String(sections).padStart(3)}`,
        `withPlan=${String(covered).padStart(3)}`,
        `cover=${pct.toFixed(0).padStart(3)}%`,
        `plans=${String(plans).padStart(3)}`,
        `avgMarks=${(plans ? marks / plans : 0).toFixed(1).padStart(4)}`,
        `avgSteps=${(plans ? planSteps / plans : 0).toFixed(1).padStart(4)}`,
        `thin=${String(thin).padStart(3)}`,
        `bad=${String(illegal).padStart(3)}`,
        bar(pct),
      ].join("  "),
    )
  }

  const overall = totalSections === 0 ? 0 : (totalCovered / totalSections) * 100
  console.log(
    `\n${papers.length} paper(s): ${totalCovered}/${totalSections} sections carry an exam plan — ${overall.toFixed(1)}%`,
  )

  if (has("gaps")) {
    console.log(`\n── Sections still without a plan (${gaps.length}) ──`)
    for (const g of gaps) console.log("  " + g)
  } else if (gaps.length) {
    console.log(`Re-run with --gaps to list the ${gaps.length} section(s) still bare.`)
  }

  if (problems.length) {
    console.error(`\n── Plans whose format/marks are not that paper's exam (${problems.length}) ──`)
    for (const p of problems) console.error("  " + p)
    process.exit(1)
  }

  if (!Number.isNaN(min) && overall < min) {
    console.error(`\nFAIL: coverage ${overall.toFixed(1)}% is below the required ${min}%.`)
    process.exit(1)
  }
}

function bar(pct: number): string {
  const filled = Math.round(pct / 5)
  return "█".repeat(filled) + "·".repeat(20 - filled)
}

main()
