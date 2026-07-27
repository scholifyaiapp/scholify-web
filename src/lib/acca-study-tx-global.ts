import type { StudyChapter } from "@/lib/acca-study-content"
import type { TopicBrief } from "@/lib/acca-briefs"

const AREAS: { area: string; title: string; terms: [string, string][] }[] = [
  { area: "A", title: "Purpose and administration of taxation", terms: [
    ["Direct tax", "A tax imposed directly on income, profits, gains or wealth."], ["Indirect tax", "A tax collected through transactions, consumption or supplies."], ["Tax incidence", "The person who ultimately bears a tax's economic burden."], ["Self-assessment", "A system in which taxpayers calculate and report their liabilities."], ["Withholding tax", "Tax deducted at source and remitted by the payer."], ["Tax residence", "A connection determining the scope of a jurisdiction's tax claim."], ["Tax source", "The jurisdictional origin attributed to income, a gain or transaction."], ["Tax compliance", "Required registration, records, returns, payments and disclosures."],
  ] },
  { area: "B", title: "Individual income and employment", terms: [
    ["Gross income", "Income before permitted deductions, allowances or credits."], ["Taxable income", "The tax base after permitted deductions and exemptions."], ["Employment income", "Cash and non-cash remuneration arising from employment."], ["Benefit in kind", "Non-cash value provided by an employer and taxed under a stated rule."], ["Personal allowance", "Income excluded from tax under the supplied regime."], ["Progressive rate", "A structure in which marginal rates increase across bands."], ["Payroll contribution", "A social or employment levy calculated on earnings."], ["Tax credit", "An amount deducted from calculated tax rather than the tax base."],
  ] },
  { area: "C", title: "Capital gains and disposals", terms: [
    ["Disposal proceeds", "Consideration received or deemed received for an asset disposal."], ["Allowable cost", "Qualifying expenditure deducted in computing a gain."], ["Chargeable gain", "Proceeds less allowable cost, losses, exemptions and reliefs."], ["Capital loss", "An allowable negative result that may offset gains."], ["Annual exemption", "A yearly amount of net gains excluded from tax."], ["Rollover relief", "Deferral by transferring a qualifying gain into a replacement asset."], ["Market value rule", "Substitution of arm's-length value in specified transactions."], ["Residence principle", "The connection between residence and a jurisdiction's claim to tax gains."],
  ] },
  { area: "D", title: "Transfers of wealth and estates", terms: [
    ["Lifetime transfer", "A transfer of value made during a person's life."], ["Estate", "Assets and obligations considered on a person's death."], ["Nil-rate amount", "A cumulative amount taxed at zero."], ["Exempt transfer", "A transfer excluded from charge when stated conditions are met."], ["Taper mechanism", "A rule reducing tax according to a supplied elapsed period."], ["Valuation", "Determination of the taxable market value of property."], ["Double-tax relief", "Relief reducing overlapping taxation by two jurisdictions."], ["Donee liability", "A rule making a recipient responsible for specified tax."],
  ] },
  { area: "E", title: "Business and corporate taxation", terms: [
    ["Accounting profit", "Profit reported before tax adjustments."], ["Taxable business profit", "Accounting profit adjusted under the stated tax rules."], ["Capital allowance", "A tax deduction for qualifying capital expenditure."], ["Permanent difference", "An accounting item that never enters taxable profit."], ["Tax loss", "A negative taxable result available for relief under stated rules."], ["Corporate residence", "The connection determining the scope of entity taxation."], ["Transfer pricing", "Arm's-length pricing rules for related-party transactions."], ["Tax incentive", "A deduction, credit, exemption or reduced rate encouraging specified activity."],
  ] },
  { area: "F", title: "Consumption and indirect taxation", terms: [
    ["Output tax", "Indirect tax charged on taxable sales."], ["Input tax", "Indirect tax borne on purchases and recoverable when conditions are met."], ["Taxable supply", "A supply within the charge to indirect tax."], ["Exempt supply", "A supply on which output tax is not charged and input recovery may be restricted."], ["Registration threshold", "The turnover test triggering compulsory registration."], ["Tax point", "The time a transaction occurs for indirect-tax purposes."], ["Reverse charge", "A mechanism making the customer account for tax."], ["Place of supply", "The jurisdiction in which a transaction is treated as taxable."],
  ] },
  { area: "G", title: "Ethics, planning and cross-border tax", terms: [
    ["Tax planning", "Lawful organisation of affairs using choices intended by legislation."], ["Tax evasion", "Illegal concealment, misstatement or non-payment of tax."], ["Tax avoidance", "Arrangements seeking an advantage contrary to legislation's purpose."], ["Professional scepticism", "A questioning assessment of facts and evidence."], ["Treaty", "An agreement allocating taxing rights between jurisdictions."], ["Permanent establishment", "A business presence allowing source-country taxation of specified profits."], ["Foreign tax credit", "Credit for qualifying tax paid in another jurisdiction."], ["Disclosure", "Communication required by law, regulation or professional duties."],
  ] },
]

export const TX_GLOBAL_CHAPTERS: StudyChapter[] = AREAS.map((source) => ({
  paper: "TX", area: source.area, title: source.title, minutes: 30,
  intro: `Learn portable ${source.title.toLowerCase()} principles without assuming one jurisdiction's law or rates.`,
  outcomes: ["Explain the core concepts", "Apply supplied thresholds and rates", "Identify residence, source and compliance consequences", "Distinguish the tax base from the tax liability", "Document a transparent calculation and supported conclusion"],
  sections: [{ id: `tx-global-${source.area.toLowerCase()}`, heading: "International foundation", blocks: [
    { kind: "text", md: "This is a transferable tax-foundation track, not an official ACCA jurisdiction exam variant. For final exam preparation, select the jurisdiction shown on your exam entry." },
    { kind: "table", caption: "Portable concepts", head: ["Concept", "Meaning"], rows: source.terms },
    { kind: "callout", tone: "rule", title: "Calculation rule", md: "Use only the rates, thresholds, currency and relief conditions supplied in the question." },
  ], check: { q: "How should a jurisdiction-neutral calculation be solved?", options: ["Use only the supplied rules and rates", "Assume UK rates", "Choose a rate from memory", "Ignore the stated threshold"], correct: 0, explain: "Every rate required for a portable calculation is supplied." } }],
  examTraps: [
    { trap: "Treating this foundation as an official ACCA exam variant.", fix: "Select the exact jurisdiction on the ACCA exam entry for final exam prep." },
    { trap: "Importing an unstated domestic rate.", fix: "Use only the scenario's explicit rates and thresholds." },
  ],
  keyTerms: source.terms.map(([term, def]) => ({ term, def })),
  summary: source.terms.map(([term, def]) => `${term}: ${def}`),
}))

export const TX_GLOBAL_BRIEFS: TopicBrief[] = AREAS.map((source) => ({
  paper: "TX",
  area: source.area,
  title: source.title,
  minutes: 7,
  sections: [
    {
      kind: "concept",
      heading: "Portable tax logic",
      body: `This foundation develops transferable reasoning for ${source.title.toLowerCase()}. It deliberately avoids assuming a country's legislation: every assessable rate, threshold, time limit and relief condition must be supplied by the scenario.`,
    },
    {
      kind: "structure",
      heading: "Calculation and advice map",
      body: "Identify the taxpayer, period, residence and source. Classify each item, calculate the gross base, apply permitted deductions and exemptions in the stated order, then apply the supplied rate. Separate the resulting liability from filing and payment obligations. For cross-border facts, allocate taxing rights before applying double-tax relief.",
    },
    {
      kind: "example",
      heading: "Applied method",
      body: `If a scenario supplies a gross ${source.area === "F" ? "transaction value" : "tax base"} of CU 50,000, a CU 5,000 deduction and a 20% rate, show CU 50,000 − CU 5,000 = CU 45,000, then CU 45,000 × 20% = CU 9,000. State who reports and pays it using only the supplied compliance rule.`,
    },
    {
      kind: "traps",
      heading: "Classic traps",
      body: "Importing UK or another domestic rate; applying a rate before deductions; confusing an exemption with a tax credit; ignoring residence and source; calculating correctly but failing to state the compliance consequence; or treating this foundation as an official ACCA jurisdiction variant.",
    },
  ],
}))
