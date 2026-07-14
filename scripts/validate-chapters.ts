import { chaptersForPaper } from "@/lib/acca-study-content"

const PAPERS = ["FA", "FR", "MA", "BT", "TX", "LW", "PM", "FM", "AA", "SBR", "SBL", "AFM", "APM", "ATX", "AAA"]
const problems: string[] = []
let chapterCount = 0
let blockCount = 0

const isArr = (x: unknown): x is unknown[] => Array.isArray(x) && x.length > 0

for (const p of PAPERS) {
  const chapters = chaptersForPaper(p)
  for (const ch of chapters) {
    chapterCount++
    const id = `${p}-${ch.area}`
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
            // numeric values for value-based charts
            if ((t === "waterfall" || t === "bars" || t === "donut") && isArr(d?.items)) {
              for (const it of d.items) if (typeof it?.value !== "number") problems.push(`${id}/${sec.id}: ${t} item.value not a number (${JSON.stringify(it?.value)})`)
            }
            if (t === "tAccount") for (const side of ["debits", "credits"]) for (const r of (d?.[side] ?? [])) if (typeof r?.amount !== "number") problems.push(`${id}/${sec.id}: tAccount ${side} amount not a number`)
            break
          }
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
