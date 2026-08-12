/*
 * Dump every section of a paper as `chapterKey::sectionId  heading`.
 *
 * This is the worksheet for authoring the exam-plan layer: the plan map is keyed
 * by exactly this string, and a key typed from memory rather than copied is the
 * one mistake that makes a plan silently never render.
 *
 * Run: npm run dump:sections -- --paper=BT
 *      npm run dump:sections -- --variant=LW-ENG
 *
 * ── WHY --variant EXISTS ────────────────────────────────────────
 * LW and TX each ship as two whole papers under one paper id, and the Node
 * bootstrap only ever loads the DEFAULT variant. So `--paper=LW` dumps LW-Global's
 * 80 sections and cannot see LW-ENG's 87 at all — which would mean authoring the
 * other variant's plan keys from the tree files by eye, and a key typed rather than
 * copied is the one mistake that makes a plan silently never render.
 */
import { loadPaperContent } from "@/lib/acca-paper-content"
import { paperContent } from "@/lib/acca-content-registry"
import { chapterKey } from "@/lib/acca-study-content"
import type { StudyChapter } from "@/lib/acca-study-content"

const argv = process.argv.slice(2)
const flag = (name: string) => argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1]

/** Variant trees the registry will not load at its default setting. */
const VARIANTS: Record<string, () => Promise<StudyChapter[]>> = {
  "LW-ENG": async () => (await import("@/lib/acca-study-lw-eng")).LW_ENG_CHAPTERS,
  "LW-GLOBAL": async () => (await import("@/lib/acca-study-lw-global")).LW_GLOBAL_CHAPTERS,
}

function print(chapters: StudyChapter[]) {
  for (const ch of chapters) {
    console.log(`\n## ${chapterKey(ch)}  [Area ${ch.area}]  ${ch.title}`)
    for (const s of ch.sections) console.log(`${chapterKey(ch)}::${s.id}  |  ${s.heading}`)
  }
}

async function main() {
  const variant = flag("variant")?.toUpperCase()
  if (variant) {
    const load = VARIANTS[variant]
    if (!load) {
      console.error(`Unknown variant "${variant}". Known: ${Object.keys(VARIANTS).join(", ")}`)
      process.exit(1)
    }
    const chapters = await load()
    print(chapters)
    console.log(
      `\n${variant}: ${chapters.length} chapters, ${chapters.reduce((n, c) => n + c.sections.length, 0)} sections`,
    )
    return
  }

  for (const id of (flag("paper") ?? "BT").toUpperCase().split(",")) {
    await loadPaperContent(id)
    print(paperContent(id).chapters)
  }
}

main()
