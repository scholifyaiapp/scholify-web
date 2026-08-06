/* Structural validation of the FR question kit before it is wired into the loader. */
import { FR_KIT_A } from "@/lib/acca-questions-fr-kit-a"
import { FR_KIT_B1 } from "@/lib/acca-questions-fr-kit-b1"
import { FR_KIT_B2 } from "@/lib/acca-questions-fr-kit-b2"
import { FR_KIT_B3 } from "@/lib/acca-questions-fr-kit-b3"
import { FR_KIT_D } from "@/lib/acca-questions-fr-kit-d"
import { FR_KIT_CE } from "@/lib/acca-questions-fr-kit-ce"
import { FR_KIT_DEPTH } from "@/lib/acca-questions-fr-kit-depth"
import { FR_TREE } from "@/lib/acca-study-fr-tree"

const kit = [...FR_KIT_A, ...FR_KIT_B1, ...FR_KIT_B2, ...FR_KIT_B3, ...FR_KIT_D, ...FR_KIT_CE, ...FR_KIT_DEPTH]
const chapterIds = new Set(FR_TREE.map((c) => c.id!))
const perChapter = new Map<string, number>()
const perArea = new Map<string, number>()
const byType = new Map<string, number>()
const byDifficulty = new Map<string, number>()
const problems: string[] = []

for (const item of kit) {
  perChapter.set(item.chapter!, (perChapter.get(item.chapter!) ?? 0) + 1)
  perArea.set(item.area, (perArea.get(item.area) ?? 0) + 1)
  byType.set(item.type, (byType.get(item.type) ?? 0) + 1)
  byDifficulty.set(item.difficulty, (byDifficulty.get(item.difficulty) ?? 0) + 1)
  if (item.paper !== "FR") problems.push(`${item.id}: paper is ${item.paper}`)
  if (item.marks !== 2) problems.push(`${item.id}: marks ${item.marks}, expected 2`)
  if (!item.chapter) problems.push(`${item.id}: no chapter`)
  else if (!chapterIds.has(item.chapter)) problems.push(`${item.id}: chapter ${item.chapter} is not in the tree`)
  if (item.explanation.trim().length < 40) problems.push(`${item.id}: explanation too short`)
  if (item.type === "mcq") {
    if (!item.options || item.options.length !== 4) problems.push(`${item.id}: mcq needs 4 options`)
    if (typeof item.correct !== "number") problems.push(`${item.id}: mcq correct must be a number`)
  }
  if (item.type === "multi") {
    if (!Array.isArray(item.correct) || item.correct.length < 2) problems.push(`${item.id}: multi needs 2+ correct`)
    if (!item.options || item.options.length < 4) problems.push(`${item.id}: multi needs 4+ options`)
  }
  if (item.type === "number") {
    if (typeof item.numericAnswer !== "number") problems.push(`${item.id}: numericAnswer missing`)
    if (!item.unit) problems.push(`${item.id}: unit missing`)
  }
  // The chapter's area must match the question's area.
  const chapter = FR_TREE.find((c) => c.id === item.chapter)
  if (chapter && chapter.area !== item.area) problems.push(`${item.id}: area ${item.area} but chapter ${item.chapter} is area ${chapter.area}`)
}

const ids = kit.map((i) => i.id)
if (new Set(ids).size !== ids.length) problems.push("duplicate question ids")
const stems = kit.map((i) => i.stem.trim().toLowerCase())
if (new Set(stems).size !== stems.length) problems.push("duplicate question stems")

for (const chapter of FR_TREE) {
  const n = perChapter.get(chapter.id!) ?? 0
  if (n < 5) problems.push(`${chapter.id}: only ${n} question(s), floor is 5`)
}

console.log(`kit questions        ${kit.length}`)
console.log(`areas                ${[...perArea.entries()].sort().map(([a, n]) => `${a}:${n}`).join("  ")}`)
console.log(`types                ${[...byType.entries()].sort().map(([t, n]) => `${t}:${n}`).join("  ")}`)
console.log(`difficulty           ${[...byDifficulty.entries()].sort().map(([d, n]) => `${d}:${n}`).join("  ")}`)
console.log(`chapters covered     ${perChapter.size} of ${FR_TREE.length}`)
console.log(`per-chapter range    ${Math.min(...[...perChapter.values()])} to ${Math.max(...[...perChapter.values()])}`)
console.log(`numeric questions    ${byType.get("number") ?? 0}`)

if (problems.length) {
  console.log(`\n✖ ${problems.length} problem(s):`)
  for (const p of problems.slice(0, 30)) console.log(`  · ${p}`)
  process.exit(1)
}
console.log("\n✓ FR kit structurally valid")
