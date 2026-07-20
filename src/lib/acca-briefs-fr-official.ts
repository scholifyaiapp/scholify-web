import type { TopicBrief } from "@/lib/acca-briefs"
import { CORE_BRIEFS } from "@/lib/acca-briefs-core"

const fr = CORE_BRIEFS.filter((brief) => brief.paper === "FR")
const originalD = fr.find((brief) => brief.area === "D")!
const originalE = fr.find((brief) => brief.area === "E")!

export const FR_OFFICIAL_BRIEFS: TopicBrief[] = [
  ...fr.filter((brief) => ["A", "B", "C"].includes(brief.area)),
  { ...originalD, title: "Preparation of single-entity and consolidated financial statements", minutes: originalD.minutes + originalE.minutes, sections: [...originalD.sections, ...originalE.sections] },
  { paper: "FR", area: "E", title: "Employability and technology skills", minutes: 5, sections: [
    { kind: "concept", heading: "Reporting work must be usable", body: "Digital competence in FR means selecting the correct source data, producing traceable calculations and communicating the result for a stakeholder. Accuracy without an audit trail is difficult to review; a ratio without explanation is not analysis." },
    { kind: "structure", heading: "Controlled workflow", body: "Confirm entity, period, currency and units.\nSeparate inputs, formulas and outputs.\nUse cell references, labels and control totals.\nCalculate and compare.\nExplain the scenario cause and stakeholder implication.\nConclude clearly." },
    { kind: "example", heading: "From spreadsheet to conclusion", body: "Revenue rises from $10m to $12m while operating profit remains $1.2m. Margin falls from 12% to 10%. State both the 2 percentage-point fall and the evidence that costs grew as fast as the extra revenue, then explain why that matters to management or lenders." },
    { kind: "traps", heading: "Common failures", body: "Using the wrong period or units.\nHard-coding a total.\nHiding an error with rounding.\nPresenting an unlabeled chart.\nDescribing a movement without explaining its cause or implication." },
  ] },
]
