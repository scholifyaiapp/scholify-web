import { getQuestions } from "@/lib/acca"
import { getFlashcards } from "@/lib/acca-flashcards"
import { getTopicBrief } from "@/lib/acca-briefs"
import { chaptersForPaper } from "@/lib/acca-study-content"

const stale = [
  /FA2024/g,
  /official rate of interest of 2\.25%/gi,
  /(?:employer|secondary|Class 1A)[^\n]{0,80}13\.8%/gi,
  /BADR[^\n]{0,100}(?:rate |at )10%/gi,
  /domicil/gi,
]

const payloads: Array<[string, string]> = [
  ...getQuestions("TX").map((item) => [`question ${item.id}/${item.area}`, JSON.stringify(item)] as [string, string]),
  ...getFlashcards("TX").map((item) => [`flashcard ${item.id}`, JSON.stringify(item)] as [string, string]),
  ...chaptersForPaper("TX").flatMap((chapter) => chapter.sections.map((section) => [`chapter ${chapter.area}/${section.id}`, JSON.stringify(section)] as [string, string])),
  ...["A", "B", "C", "D", "E", "F", "G"].map((area) => [`brief ${area}`, JSON.stringify(getTopicBrief("TX", area))] as [string, string]),
]

const findings: string[] = []
for (const [label, text] of payloads) {
  for (const pattern of stale) {
    const matches = text.match(pattern)
    if (matches?.length) {
      const first = text.search(pattern)
      const context = first >= 0 ? text.slice(Math.max(0, first - 70), first + 130) : ""
      findings.push(`${label}: ${matches.length} match(es) for ${pattern.source} — ${[...new Set(matches)].slice(0, 4).join(" | ")} — ${context}`)
    }
  }
}

if (findings.length) {
  console.error(`TX-UK FA2025 migration incomplete (${findings.length} stale-pattern groups):`)
  for (const finding of findings) console.error(`  - ${finding}`)
  process.exit(1)
}

console.log("TX-UK content contains no known FA2024/stale-rate markers.")
