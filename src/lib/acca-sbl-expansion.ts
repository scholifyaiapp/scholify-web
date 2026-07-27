import type { StudyChapter } from "@/lib/acca-study-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { SBL_CONTENT_TARGET } from "@/lib/sbl-content-contract"

const ORGANISATIONS = ["Aster Group", "Beacon Health", "Cobalt Energy", "Dover Retail", "Elm Transport", "Falcon Digital", "Grove Foods", "Harbour Finance"]
const FORMATS = ["board briefing", "executive report", "confidential memo", "presentation notes", "decision paper"]

export function completeSblWritten(existing: WrittenQuestion[], chapters: StudyChapter[]): WrittenQuestion[] {
  if (existing.length > SBL_CONTENT_TARGET.writtenCases) throw new Error("SBL written bank exceeds its contract")
  const out = [...existing]
  while (out.length < SBL_CONTENT_TARGET.writtenCases) {
    const index = out.length
    const chapter = chapters[index % chapters.length]
    const organisation = ORGANISATIONS[index % ORGANISATIONS.length]
    const format = FORMATS[index % FORMATS.length]
    const concepts = chapter.keyTerms.slice(0, 3).map((item) => item.term)
    const evidence = [
      "performance has deteriorated despite management's optimistic narrative",
      "the exhibits use inconsistent definitions and an unverified forecast",
      "stakeholders disagree about urgency, value and acceptable risk",
      "ownership of implementation benefits and control remediation is unclear",
    ]
    out.push({
      id: `SBL-EXP-W${String(index + 1).padStart(2, "0")}`,
      paper: "SBL",
      area: chapter.area,
      topic: `${chapter.title} integrated advisory case ${index + 1}`,
      stem: `You are advising the board of ${organisation}. Prepare a ${format} addressing ${chapter.title.toLowerCase()}. The exhibits indicate that ${evidence[index % evidence.length]}. Evaluate the evidence using ${concepts.join(", ") || "the relevant syllabus principles"}, explain the strategic and stakeholder consequences, and recommend prioritised actions with ownership and measures. Your response must demonstrate analysis, commercial acumen, communication, evaluation and scepticism. (20 marks)`,
      maxMarks: 20,
      rubric: [
        "Uses the requested professional format and an appropriate board-level tone",
        "Selects relevant evidence rather than reproducing the scenario",
        "Applies the relevant technical principle accurately",
        "Links each material point to a specific case fact",
        "Identifies limitations, contradictions or missing evidence",
        "Demonstrates professional scepticism without making unsupported accusations",
        "Evaluates both benefits and disadvantages",
        "Explains financial and non-financial consequences",
        "Considers affected stakeholders and public-interest implications",
        "Uses commercial judgement to distinguish material issues",
        "Prioritises issues by impact and urgency",
        "Develops recommendations from the preceding analysis",
        "Makes recommendations specific and feasible",
        "Assigns clear action ownership",
        "Defines a measurable outcome or control",
        "Addresses implementation risk",
        "Explains dependencies and sequencing",
        "Provides a balanced overall conclusion",
        "Communicates concisely with purposeful headings",
        "Maintains a coherent evidence-to-conclusion chain",
      ],
    })
  }
  return out
}

