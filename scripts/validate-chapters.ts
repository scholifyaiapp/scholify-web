import { chaptersForPaper, chapterKey } from "@/lib/acca-study-content"
import type { StudyChapter } from "@/lib/acca-study-content"
import { LW_ENG_CHAPTERS } from "@/lib/acca-study-lw-eng"

const PAPERS = ["FA", "FR", "MA", "BT", "TX", "LW", "PM", "FM", "AA", "SBR", "SBL", "AFM", "APM", "ATX", "AAA"]
const problems: string[] = []
let chapterCount = 0
let blockCount = 0

const isArr = (x: unknown): x is unknown[] => Array.isArray(x) && x.length > 0

/*
 * chaptersForPaper reads the registry, which the Node bootstrap fills at each paper's
 * DEFAULT variant — GLOBAL for LW. So the ENG tree would never be validated without
 * being added explicitly. Both LW variants ship, so both must be structurally sound.
 */
const EXTRA_TREES: Array<[string, StudyChapter[]]> = [["LW-ENG", LW_ENG_CHAPTERS]]

for (const p of [...PAPERS, ...EXTRA_TREES.map(([name]) => name)]) {
  const extra = EXTRA_TREES.find(([name]) => name === p)
  const chapters = extra ? extra[1] : chaptersForPaper(p)
  for (const ch of chapters) {
    chapterCount++
    const id = chapterKey(ch)
    // chapter-level arrays the reader maps over
    for (const field of ["outcomes", "sections", "examTraps", "keyTerms", "summary"] as const) {
      if (!Array.isArray((ch as any)[field])) problems.push(`${id}: chapter.${field} not an array`)
    }
    for (const t of ch.examTraps ?? []) if (t?.trap == null || t?.fix == null) problems.push(`${id}: examTrap missing trap/fix`)
    for (const t of ch.keyTerms ?? []) if (t?.term == null || t?.def == null) problems.push(`${id}: keyTerm missing term/def`)

    for (const sec of ch.sections ?? []) {
      if (!Array.isArray(sec.blocks)) { problems.push(`${id}/${sec.id}: section.blocks not an array`); continue }
      if (sec.check) {
        const c = sec.check
        if (!Array.isArray(c.options)) problems.push(`${id}/${sec.id}: check.options not array`)
        if (typeof c.correct !== "number" || c.correct < 0 || c.correct >= (c.options?.length ?? 0)) problems.push(`${id}/${sec.id}: check.correct out of range (${c.correct})`)
      }
      for (const b of sec.blocks as any[]) {
        blockCount++
        switch (b.kind) {
          case "text":
            if (typeof b.md !== "string") problems.push(`${id}/${sec.id}: text.md not a string`)
            break
          case "callout":
            if (typeof b.md !== "string") problems.push(`${id}/${sec.id}: callout.md not a string`)
            break
          case "formula":
            if (b.name == null || b.expr == null) problems.push(`${id}/${sec.id}: formula missing name/expr`)
            break
          case "table":
            if (!isArr(b.head) || !isArr(b.rows)) problems.push(`${id}/${sec.id}: table missing head/rows`)
            break
          case "example":
            if (!isArr(b.steps) || b.result == null) problems.push(`${id}/${sec.id}: example missing steps/result`)
            else for (const s of b.steps) if (s?.label == null || s?.detail == null) problems.push(`${id}/${sec.id}: example step missing label/detail`)
            break
          case "diagram": {
            const dia = b.diagram
            if (!dia || !dia.type) { problems.push(`${id}/${sec.id}: diagram missing type`); break }
            const d: any = dia.data
            const t = dia.type
            // check exactly what StudyDiagram reads UNGUARDED
            if (t === "radial" && (d?.centre == null || typeof d.centre !== "string")) problems.push(`${id}/${sec.id}: radial missing/invalid centre`)
            if (t === "scale" && (d?.assets == null || d?.liabilities == null || d?.equity == null)) problems.push(`${id}/${sec.id}: scale missing assets/liabilities/equity`)
            // arrays the renderers map over (guards fall back, but empty = blank)
            const arrField: Record<string, string> = { tAccount: "debits", radial: "nodes", compare: "rows", cards: "items", flow: "steps", cycle: "steps", waterfall: "items", bars: "items", donut: "items", pyramid: "levels", timeline: "points" }
            const f = arrField[t]
            if (f && !isArr(d?.[f]) && !(t === "tAccount" && isArr(d?.credits))) problems.push(`${id}/${sec.id}: ${t} missing/empty data.${f}`)
            // The renderers read `.label` off each entry unguarded, so an array of
            // plain STRINGS satisfies the check above and then renders a row of
            // empty boxes — visibly broken, but silent. SBL's "From strategy to
            // capability" flow shipped that way.
            // `cards` is the odd one out — its renderer reads `title`, every other
            // labelled shape reads `label`.
            const labelled: Record<string, [string, string]> = {
              flow: ["steps", "label"], cycle: ["steps", "label"], pyramid: ["levels", "label"],
              timeline: ["points", "label"], radial: ["nodes", "label"], cards: ["items", "title"],
            }
            if (labelled[t]) {
              const [field, key] = labelled[t]
              for (const entry of (d?.[field] ?? [])) {
                if (typeof entry?.[key] !== "string") problems.push(`${id}/${sec.id}: ${t} ${field} entry has no string ${key} (${JSON.stringify(entry)})`)
              }
            }
            // numeric values for value-based charts
            if ((t === "waterfall" || t === "bars" || t === "donut") && isArr(d?.items)) {
              for (const it of d.items) if (typeof it?.value !== "number") problems.push(`${id}/${sec.id}: ${t} item.value not a number (${JSON.stringify(it?.value)})`)
            }
            if (t === "tAccount") for (const side of ["debits", "credits"]) for (const r of (d?.[side] ?? [])) if (typeof r?.amount !== "number") problems.push(`${id}/${sec.id}: tAccount ${side} amount not a number`)
            break
          }
          case "list":
            if (!isArr(b.items)) problems.push(`${id}/${sec.id}: list missing/empty items`)
            else for (const it of b.items) if (typeof it !== "string") problems.push(`${id}/${sec.id}: list item not a string`)
            break
          case "definition":
            if (typeof b.term !== "string" || typeof b.md !== "string") problems.push(`${id}/${sec.id}: definition missing term/md`)
            break
          case "illustration":
            if (typeof b.title !== "string" || typeof b.md !== "string") problems.push(`${id}/${sec.id}: illustration missing title/md`)
            break
          case "activity":
            if (typeof b.title !== "string" || typeof b.prompt !== "string" || typeof b.answer !== "string") {
              problems.push(`${id}/${sec.id}: activity missing title/prompt/answer`)
            }
            break
          // The exam-plan layer (acca-plans-*.ts, merged in by applyExamPlans)
          // introduced this kind. It is merged into sections at LOAD time rather
          // than written into the tree files, so every one of the 772 planned
          // sections reached this switch and fell through to `default` — the
          // validator reported the whole library as broken and could no longer
          // catch a real defect in any paper.
          case "examQuestion":
            if (typeof b.title !== "string" || typeof b.requirement !== "string" || typeof b.answer !== "string") {
              problems.push(`${id}/${sec.id}: examQuestion missing title/requirement/answer`)
            }
            if (b.format !== "ot" && b.format !== "mtq" && b.format !== "written") {
              problems.push(`${id}/${sec.id}: examQuestion format not ot/mtq/written (${JSON.stringify(b.format)})`)
            }
            if (typeof b.marks !== "number") problems.push(`${id}/${sec.id}: examQuestion marks not a number`)
            // The reader renders requirement → plan → answer and gates in that
            // order, so an empty plan collapses the block to a model answer.
            if (!isArr(b.plan)) problems.push(`${id}/${sec.id}: examQuestion missing/empty plan`)
            else for (const s of b.plan) if (s?.step == null || s?.detail == null) problems.push(`${id}/${sec.id}: examQuestion plan step missing step/detail`)
            break
          default:
            problems.push(`${id}/${sec.id}: unknown block kind "${b.kind}"`)
        }
      }
    }
  }
}

console.log(`Validated ${chapterCount} chapters, ${blockCount} blocks.`)
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`)
  for (const p of problems) console.log("  ✗ " + p)
  process.exit(1)
} else {
  console.log("ALL CHAPTERS STRUCTURALLY VALID — no crash-causing shapes.")
}
