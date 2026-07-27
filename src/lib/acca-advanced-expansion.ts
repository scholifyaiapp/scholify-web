import type { StudyChapter } from "@/lib/acca-study-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { ADVANCED_CONTENT_TARGET, ADVANCED_PAPERS } from "@/lib/advanced-content-contract"

const TARGETS = new Set<string>(ADVANCED_PAPERS)
const CLIENTS = ["Alder Group", "Beacon plc", "Cobalt Group", "Dover Co", "Elm Group", "Falcon plc", "Grove Co", "Harbour Group"]
const ROLES: Record<string, string> = {
  SBR: "financial reporting adviser",
  AFM: "senior financial adviser",
  APM: "performance management consultant",
  ATX: "senior tax adviser",
  AAA: "audit engagement manager",
}

export function completeAdvancedWritten(
  paper: string,
  existing: WrittenQuestion[],
  chapters: StudyChapter[],
): WrittenQuestion[] {
  if (!TARGETS.has(paper)) return existing
  if (existing.length > ADVANCED_CONTENT_TARGET.writtenCases) throw new Error(`${paper} written bank exceeds its contract`)
  const markCycle =
    paper === "SBR" ? [30, 20, 25, 25]
      : paper === "AFM" || paper === "APM" || paper === "ATX" || paper === "AAA" ? [50, 25, 25]
        : null
  const out = markCycle
    ? existing.map((item, index) => {
        const maxMarks = markCycle[index % markCycle.length]
        return {
          ...item,
          maxMarks,
          stem:
            paper === "ATX" && maxMarks === 50
              ? `${item.stem}\n\nEthics requirement: identify and explain the relevant fundamental ethical principles, threats and appropriate safeguards in the tax-advice scenario. (5 marks)`
              : paper === "AAA" && maxMarks === 50
                ? `${item.stem}\n\nPlanning requirement: evaluate the engagement-specific business and risks of material misstatement, determine their audit-planning implications and design responsive procedures using the exhibits.`
              : item.stem,
        }
      })
    : [...existing]
  while (out.length < ADVANCED_CONTENT_TARGET.writtenCases) {
    const index = out.length
    const chapter = chapters[index % chapters.length]
    const terms = chapter.keyTerms.slice(0, 3).map((item) => item.term)
    const client = CLIENTS[index % CLIENTS.length]
    out.push({
      id: `${paper}-ADV-W${String(index + 1).padStart(2, "0")}`,
      paper,
      area: chapter.area,
      topic: `${chapter.title} advanced case ${index + 1}`,
      stem:
        `You are the ${ROLES[paper]} to ${client}. The exhibits contain incomplete assumptions, conflicting management explanations and significant ${chapter.title.toLowerCase()} implications. Prepare professional advice that applies ${terms.join(", ") || "the relevant technical requirements"} to the specific evidence, performs or interprets the necessary analysis, evaluates alternatives and recommends a defensible course of action. State further evidence required and implementation consequences.` +
        (paper === "ATX" && markCycle?.[index % markCycle.length] === 50
          ? "\n\nEthics requirement: identify and explain the relevant fundamental ethical principles, threats and appropriate safeguards in the tax-advice scenario. (5 marks)"
          : paper === "AAA" && markCycle?.[index % markCycle.length] === 50
            ? "\n\nPlanning requirement: evaluate the engagement-specific business and risks of material misstatement, determine their audit-planning implications and design responsive procedures using the exhibits."
          : ""),
      maxMarks: markCycle ? markCycle[index % markCycle.length] : 20,
      rubric: [
        "Identifies the relevant technical issue",
        "Applies the correct principle or requirement",
        "Uses specific scenario evidence",
        "Performs or interprets the necessary calculation",
        "Explains assumptions transparently",
        "Challenges inconsistent or incomplete evidence",
        "Identifies further information required",
        "Evaluates the first material alternative",
        "Evaluates the second material alternative",
        "Explains financial consequences",
        "Explains strategic or operational consequences",
        "Considers risk and uncertainty",
        "Considers ethical and stakeholder implications",
        "Uses professional judgement",
        "Prioritises material matters",
        "Gives a specific recommendation",
        "Explains implementation actions",
        "Assigns responsibility or control",
        "Uses an appropriate professional format",
        "Concludes consistently with the analysis",
      ],
    })
  }
  return out
}
