/*
 * Dump every section of a paper as `chapterKey::sectionId  heading`.
 *
 * This is the worksheet for authoring the exam-plan layer: the plan map is keyed
 * by exactly this string, and a key typed from memory rather than copied is the
 * one mistake that makes a plan silently never render.
 *
 * Run: npm run dump:sections -- --paper=BT
 */
import { loadPaperContent } from "@/lib/acca-paper-content"
import { paperContent } from "@/lib/acca-content-registry"
import { chapterKey } from "@/lib/acca-study-content"

const arg = process.argv.slice(2).find((a) => a.startsWith("--paper="))?.split("=")[1]
const papers = (arg ?? "BT").toUpperCase().split(",")

async function main() {
  for (const id of papers) {
    await loadPaperContent(id)
    for (const ch of paperContent(id).chapters) {
      console.log(`\n## ${chapterKey(ch)}  [Area ${ch.area}]  ${ch.title}`)
      for (const s of ch.sections) console.log(`${chapterKey(ch)}::${s.id}  |  ${s.heading}`)
    }
  }
}

main()
