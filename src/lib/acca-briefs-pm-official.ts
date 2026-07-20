import type { TopicBrief } from "@/lib/acca-briefs"
import { SKILLS_BRIEFS } from "@/lib/acca-briefs-skills"

function old(area: string): TopicBrief {
  const item = SKILLS_BRIEFS.find((brief) => brief.paper === "PM" && brief.area === area)
  if (!item) throw new Error(`PM brief migration: missing former Area ${area}`)
  return item
}

export const PM_OFFICIAL_BRIEFS: TopicBrief[] = [
  { paper: "PM", area: "A", title: "Management information systems and data analytics", minutes: 7, sections: [
    { kind: "concept", heading: "Information is a controlled performance resource", body: "TPS captures events; MIS supports recurring control; EIS supports strategic oversight; ERP integrates organisational processes and data; CRM supports customer management. The useful system is the one whose decision benefits justify cost, risk and organisational disruption." },
    { kind: "structure", heading: "System and analytics map", body: "Match strategic, tactical and operational needs to granularity, frequency, horizon and uncertainty. Control input, processing, output, access, transfer, retention and recovery. Big data: volume, variety, velocity, veracity and value. Analytics: descriptive, diagnostic, predictive and prescriptive." },
    { kind: "traps", heading: "Classic traps", body: "Equating volume with quality; treating a dashboard as proof of controlled source data; confusing prediction with recommendation; and ignoring bias, privacy, cyber risk or opaque model assumptions." },
  ] },
  { ...old("A"), area: "B", title: "Specialist cost and management accounting techniques" },
  { ...old("B"), area: "C", title: "Decision-making techniques" },
  { ...old("C"), area: "D", title: "Budgeting and control" },
  { ...old("D"), area: "E", title: "Performance measurement and control" },
  { paper: "PM", area: "F", title: "Employability and technology skills", minutes: 5, sections: [
    { kind: "concept", heading: "Professional digital evidence", body: "A correct answer must also be traceable, navigable and responsive to the requirement. Digital skills are demonstrated through visible logic, controlled workings, efficient tool use and concise scenario application." },
    { kind: "structure", heading: "Response workflow", body: "Read the verb and marks; structure the response; separate spreadsheet inputs, workings and outputs; label units and formulas; apply narrative points to evidence; then review requirements, signs, reconciliations and reasonableness." },
    { kind: "traps", heading: "Classic traps", body: "Hard-coded repeated values, unexplained numbers, generic theory, hidden workings, missing units, duplicate drafts and spending time polishing beyond the marks available." },
  ] },
]
