import { getPapers, getQuestions } from "@/lib/acca"
import { getFlashcards } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getTopicBrief } from "@/lib/acca-briefs"
import { chaptersForPaper } from "@/lib/acca-study-content"
const rows: string[] = []
for (const p of getPapers()) {
  const briefs = p.areas.filter((a) => getTopicBrief(p.id, a.code)).length
  rows.push(`${p.id}\tq=${getQuestions(p.id).length}\tfc=${getFlashcards(p.id).length}\twr=${getWrittenQuestions(p.id).length}\tbr=${briefs}\tch=${chaptersForPaper(p.id).length}\tfirstQ=${getQuestions(p.id)[0]?.id}\tlastQ=${getQuestions(p.id).at(-1)?.id}`)
}
console.log(rows.join("\n"))
