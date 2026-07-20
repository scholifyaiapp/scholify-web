import type { StudyChapter } from "@/lib/acca-study-content"
import { TX_A } from "@/lib/acca-study-tx-a"
import { TX_B } from "@/lib/acca-study-tx-b"
import { TX_C } from "@/lib/acca-study-tx-c"
import { TX_D } from "@/lib/acca-study-tx-d"
import { TX_E } from "@/lib/acca-study-tx-e"

function nextExamYear(text: string): string {
  return text
    .replace(/\b20(2[0-6])(?:([/-])(2[1-7]))?\b/g, (_, start: string, separator?: string, end?: string) => separator && end ? `${Number(start) + 2001}${separator}${Number(end) + 1}` : String(Number(start) + 2001))
    .replace(/FA2024/g, "FA2025")
    .replace(/UK-domiciled/gi, "long-term UK resident")
    .replace(/UK domiciled/gi, "long-term UK resident")
}

const CHANGED_RATE = /2\.25%|13\.8%|£9,100|BADR[^\n]{0,100}10%|business asset disposal relief[^\n]{0,100}10%|CGT[^\n]{0,120}(?:10%|20%)/i

function migrateChapter(chapter: StudyChapter, area: string, title: string): StudyChapter {
  const migrated = JSON.parse(nextExamYear(JSON.stringify(chapter))) as StudyChapter
  migrated.area = area
  migrated.title = title
  migrated.sections = migrated.sections.map((section) => ({
    ...section,
    blocks: section.blocks
      .filter((block) => !CHANGED_RATE.test(JSON.stringify(block)))
      .map((block) => structuredClone(block)),
    check: section.check && !CHANGED_RATE.test(JSON.stringify(section.check)) ? section.check : undefined,
  }))
  return migrated
}

export const TX_OFFICIAL_A: StudyChapter = {
  paper: "TX", area: "A", title: "The UK tax system and its administration", minutes: 28,
  intro: "Tax computations sit inside an administrative system: identify the taxpayer, tax, period, filing and payment obligations before calculating liability.",
  outcomes: ["Explain the purpose and principal sources of UK tax law", "Explain taxpayer and HMRC obligations", "Apply filing, payment, enquiry, penalty and interest rules", "Distinguish tax avoidance from tax evasion"],
  sections: [
    { id: "system", heading: "Purpose, sources and administration", blocks: [
      { kind: "text", md: "The UK raises revenue and uses tax to redistribute income, influence behaviour and support economic and social policy. Parliament enacts primary legislation; delegated legislation and case law support application; HMRC administers and collects taxes. ACCA specifies an examinable Finance Act and excludes devolved taxes for TX‑UK." },
      { kind: "text", md: "Self-assessment places primary responsibility on taxpayers to notify chargeability, keep records, file accurate returns and pay on time. HMRC may correct obvious errors, open enquiries, make discovery assessments and charge interest and penalties. Agents assist but do not remove the taxpayer's legal responsibility." },
      { kind: "text", md: "Penalty analysis normally considers the obligation, failure, behaviour, disclosure and mitigation. Careless, deliberate and deliberate-and-concealed behaviour attract different ranges; prompt, unprompted and quality disclosure affect reduction." },
      { kind: "callout", tone: "warn", title: "Avoidance is not evasion", md: "Evasion is illegal concealment or misrepresentation. Avoidance seeks a tax advantage within legal form but may be counteracted by targeted rules or the GAAR. Legitimate planning applies reliefs consistently with their purpose." },
    ] },
  ], examTraps: [{ trap: "Assuming an adviser becomes liable for the client's filing obligation.", fix: "The taxpayer retains responsibility, although an adviser has separate professional and legal duties." }], keyTerms: [{ term: "Discovery assessment", def: "An HMRC assessment used where tax has been lost and statutory conditions are met." }], summary: ["Identify obligations and dates before computing.", "Apply enquiry, assessment, interest and penalty rules separately.", "Distinguish planning, avoidance and evasion."]
}

const FA2025_INCOME_RATES = {
  id: "fa2025-income-rates", heading: "FA2025 controlling rates and changed examples", blocks: [
    { kind: "text" as const, md: "For 2025/26 the personal allowance remains £12,570, the basic-rate band £37,700, the dividend nil-rate band £500 and the normal/dividend rates remain 20%/8.75%, 40%/33.75% and 45%/39.35%. The official rate of interest is **3.75%**." },
    { kind: "text" as const, md: "Employee Class 1 remains 8% between £12,570 and £50,270 and 2% above. Employer Class 1 is **15% above £5,000**, the employment allowance is **£10,500**, and Class 1A is **15%**. Class 4 remains 6% then 2%." },
    { kind: "example" as const, title: "Employer NIC — FA2025", scenario: "An employee earns £60,000 in 2025/26 and no employment allowance is available. Calculate employer Class 1 NIC.", steps: [{ label: "Earnings above secondary threshold", detail: "£60,000 − £5,000 = £55,000." }, { label: "Apply 15%", detail: "£55,000 × 15% = £8,250." }], result: "Employer Class 1 NIC is £8,250." },
  ],
}
const FA2025_CGT_RATES = {
  id: "fa2025-cgt-rates", heading: "FA2025 capital gains rates", blocks: [
    { kind: "text" as const, md: "For 2025/26 the annual exempt amount is £3,000. Chargeable gains are taxed at **18%** to the extent the basic-rate band remains and **24%** above it. Qualifying business asset disposal relief and investors' relief gains are taxed at **14%**, subject to their £1 million lifetime limits." },
    { kind: "example" as const, title: "BADR — FA2025", scenario: "A higher-rate taxpayer realises a qualifying BADR gain of £180,000 and has no other gains or losses.", steps: [{ label: "Deduct annual exempt amount", detail: "£180,000 − £3,000 = £177,000." }, { label: "Apply BADR rate", detail: "£177,000 × 14% = £24,780." }], result: "The FA2025 CGT liability is £24,780." },
  ],
}

export const TX_OFFICIAL_B: StudyChapter = { ...migrateChapter(TX_A, "B", "Income tax liabilities and national insurance contributions"), sections: [FA2025_INCOME_RATES, ...migrateChapter(TX_A, "B", "Income tax liabilities and national insurance contributions").sections] }
export const TX_OFFICIAL_C: StudyChapter = { ...migrateChapter(TX_B, "C", "Chargeable gains for individuals"), sections: [FA2025_CGT_RATES, ...migrateChapter(TX_B, "C", "Chargeable gains for individuals").sections] }
export const TX_OFFICIAL_D: StudyChapter = migrateChapter(TX_E, "D", "Inheritance tax liabilities")
export const TX_OFFICIAL_E: StudyChapter = migrateChapter(TX_C, "E", "Corporation tax liabilities")
export const TX_OFFICIAL_F: StudyChapter = migrateChapter(TX_D, "F", "Value added tax")

export const TX_OFFICIAL_G: StudyChapter = {
  paper: "TX", area: "G", title: "Employability and technology skills", minutes: 16,
  intro: "Tax work must be numerically correct, period-specific, traceable and presented so that a client, reviewer or marker can follow it.",
  outcomes: ["Navigate digital tax exhibits and requirements", "Use spreadsheet and response tools", "Present tax computations with dates, bases and labels", "Review calculations and advice professionally"],
  sections: [{ id: "digital-tax-response", heading: "Professional digital tax responses", blocks: [
    { kind: "text", md: "Start with the correct person, period and Finance Act. Structure computations using conventional proformas; label exemptions, reliefs, rates and dates; show workings once; and cross-reference them. Separate liability, payment date and filing obligations." },
    { kind: "text", md: "Use spreadsheet formulas for repeated bases and rates, preserve an audit trail and test thresholds. In narrative advice, identify the rule, apply facts, quantify where possible and conclude with the action and deadline." },
    { kind: "callout", tone: "rule", title: "Version control is a tax skill", md: "A perfectly calculated answer using the wrong tax year is wrong. Record the examinable Finance Act and tax year on every rate sheet, model and review checklist." },
  ] }], examTraps: [{ trap: "Mixing liability calculations with payment dates or using a rate from another tax year.", fix: "Label the tax, taxpayer, period, Finance Act, liability and due date explicitly." }], keyTerms: [{ term: "Tax proforma", def: "A standard, reviewable calculation structure that separates components, reliefs, rates and liability." }], summary: ["Anchor every response to the correct period.", "Keep calculations traceable.", "Conclude with action and deadline."]
}
