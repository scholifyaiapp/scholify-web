import type { TopicBrief } from "@/lib/acca-briefs"
import { SKILLS_BRIEFS } from "@/lib/acca-briefs-skills"
function old(area: string): TopicBrief { const item = SKILLS_BRIEFS.find((brief) => brief.paper === "TX" && brief.area === area); if (!item) throw new Error(`TX brief migration: missing former Area ${area}`); return item }
function nextExamYear(text: string): string { return text.replace(/\b20(2[0-6])(?:([/-])(2[1-7]))?\b/g, (_, start: string, separator?: string, end?: string) => separator && end ? `${Number(start) + 2001}${separator}${Number(end) + 1}` : String(Number(start) + 2001)).replace(/FA2024/g, "FA2025") }
const CHANGED_RATE = /2\.25%|13\.8%|£9,100|BADR[^\n]{0,100}10%|business asset disposal relief[^\n]{0,100}10%|CGT[^\n]{0,120}(?:10%|20%)/i
function migrated(area: string, newArea: string, title: string): TopicBrief { const item = old(area); return { ...item, area: newArea, title, sections: item.sections.filter((section) => !CHANGED_RATE.test(section.body)).map((section) => ({ ...section, heading: nextExamYear(section.heading), body: nextExamYear(section.body) })) } }
export const TX_OFFICIAL_BRIEFS: TopicBrief[] = [
  { paper: "TX", area: "A", title: "The UK tax system and its administration", minutes: 6, sections: [
    { kind: "concept", heading: "Obligations before calculations", body: "Identify the taxpayer, tax, period and examinable Finance Act. Taxpayers retain responsibility for notification, records, returns and payment even when an agent acts. HMRC administers, enquires, assesses, charges interest and applies penalties under statutory conditions." },
    { kind: "structure", heading: "Administration workflow", body: "For each issue establish obligation and deadline; determine whether a failure occurred; identify behaviour and disclosure; calculate tax, interest and penalty separately; then state appeal or correction action. Distinguish legitimate planning, avoidance and illegal evasion." },
    { kind: "traps", heading: "Classic traps", body: "Using the wrong Finance Act, transferring responsibility to the agent, merging interest with penalties, ignoring record-keeping periods, or treating all tax planning as evasion." },
  ] },
  { ...migrated("A", "B", "Income tax liabilities and national insurance contributions"), sections: [{ kind: "structure", heading: "FA2025 controlling changes", body: "2025/26: personal allowance £12,570; basic-rate band £37,700; dividend nil-rate band £500. Official interest 3.75%. Employee Class 1 remains 8%/2%; employer Class 1 is 15% above £5,000, employment allowance £10,500, Class 1A 15%; Class 4 remains 6%/2%." }, ...migrated("A", "B", "Income tax liabilities and national insurance contributions").sections] },
  { ...migrated("B", "C", "Chargeable gains for individuals"), sections: [{ kind: "structure", heading: "FA2025 controlling changes", body: "2025/26: annual exempt amount £3,000; individual gains 18% within unused basic-rate band and 24% above; BADR and investors' relief 14%, subject to their £1 million lifetime limits." }, ...migrated("B", "C", "Chargeable gains for individuals").sections] },
  migrated("E", "D", "Inheritance tax liabilities"),
  migrated("C", "E", "Corporation tax liabilities"),
  migrated("D", "F", "Value added tax"),
  { paper: "TX", area: "G", title: "Employability and technology skills", minutes: 5, sections: [
    { kind: "concept", heading: "Period-specific professional evidence", body: "A tax response must be technically correct for the stated period, traceable through labelled workings and useful to its reader. Version control is substantive: the wrong Finance Act makes an otherwise flawless computation wrong." },
    { kind: "structure", heading: "Digital response workflow", body: "Confirm period; read the requirement; use a conventional proforma; separate inputs, workings and output; label rates and dates; apply narrative to facts; review thresholds, signs, totals and deadlines." },
    { kind: "traps", heading: "Classic traps", body: "Unlabelled rates, hidden hard-coded figures, mixing liability and payment dates, generic advice, and carrying an old tax-year template forward without a controlled update." },
  ] },
]
