import type { StudyChapter } from "@/lib/acca-study-content"

type AreaSource = {
  area: string
  title: string
  intro: string
  terms: [string, string][]
}

const AREAS: AreaSource[] = [
  {
    area: "A",
    title: "Essential elements of legal systems",
    intro: "Build the legal-system toolkit used throughout the Global variant.",
    terms: [
      ["Public international law", "Rules governing relations between states and international organisations."],
      ["Private international law", "Rules used to decide jurisdiction and applicable law where a dispute crosses borders."],
      ["Civil law system", "A legal tradition in which comprehensive codes and legislation are the primary sources of law."],
      ["Common law system", "A legal tradition shaped by legislation and binding judicial precedent."],
      ["Sharia law", "A legal tradition drawing principles from Islamic sources and jurisprudence."],
      ["Arbitration", "Private dispute resolution in which the parties authorise a tribunal to issue a binding award."],
      ["Mediation", "A confidential process in which a neutral facilitator helps parties seek a voluntary settlement."],
      ["UNCITRAL", "The United Nations body that develops instruments to harmonise international trade law."],
    ],
  },
  {
    area: "B",
    title: "International business transactions",
    intro: "Apply the international sale-of-goods framework to formation, obligations, risk and remedies.",
    terms: [
      ["CISG", "The UN Convention providing uniform rules for qualifying international sales of goods."],
      ["Offer", "A sufficiently definite proposal showing an intention to be bound if accepted."],
      ["Acceptance", "Assent to an offer that becomes effective under the applicable communication rule."],
      ["Fundamental breach", "A breach causing such detriment that it substantially deprives the other party of its expected bargain."],
      ["Specific performance", "A remedy requiring a party to perform its contractual obligation where the governing rules permit it."],
      ["Avoidance", "Termination of the contract under the CISG following a qualifying breach or failure within an additional period."],
      ["Damages", "Monetary compensation placing the claimant in the position performance would have produced, subject to limits."],
      ["Mitigation", "The injured party's duty to take reasonable measures to reduce loss caused by breach."],
    ],
  },
  {
    area: "C",
    title: "Transportation and payment in international trade",
    intro: "Connect trade terms, carriage documents and payment mechanisms to commercial risk.",
    terms: [
      ["Incoterms", "ICC rules allocating delivery tasks, costs and risk between seller and buyer."],
      ["Bill of lading", "A carriage document that may evidence receipt, the contract of carriage and title to goods."],
      ["Carrier", "The party undertaking the international carriage of goods under the transport contract."],
      ["Letter of credit", "A bank undertaking to pay against presentation of documents that comply with the credit."],
      ["Documentary collection", "A payment process in which banks handle documents but do not independently promise payment."],
      ["Strict compliance", "The principle that presented documents must comply with the terms of a documentary credit."],
      ["Transfer of risk", "The point at which accidental loss shifts from seller to buyer under the applicable trade rule."],
      ["Marine insurance", "Cover against specified risks affecting goods or interests during sea transit."],
    ],
  },
  {
    area: "D",
    title: "Formation and constitution of business organisations",
    intro: "Compare agency, partnerships and incorporated organisations across legal systems.",
    terms: [
      ["Agency", "A relationship in which an agent is authorised to affect the principal's legal position."],
      ["Actual authority", "Authority conferred expressly or impliedly by the principal on the agent."],
      ["Apparent authority", "Authority appearing to exist because of the principal's representation to a third party."],
      ["Partnership", "An unincorporated association of persons carrying on business together with a view to profit."],
      ["Separate legal personality", "The principle that an incorporated entity has rights and liabilities distinct from its members."],
      ["Limited liability", "A rule limiting an investor's exposure, normally to the agreed contribution or unpaid capital."],
      ["Promoter", "A person who undertakes to form an organisation and arrange its initial business and capital."],
      ["Constitution", "The rules allocating powers and regulating relationships within an organisation."],
    ],
  },
  {
    area: "E",
    title: "Capital and financing of companies",
    intro: "Distinguish ownership finance, debt finance and creditor-protection principles.",
    terms: [
      ["Equity capital", "Finance contributed in return for ownership rights and a residual claim."],
      ["Debt capital", "Borrowed finance carrying contractual repayment and return obligations."],
      ["Ordinary share", "An ownership interest normally carrying residual dividend and voting rights."],
      ["Preference share", "A share carrying preferential rights defined by its issue terms."],
      ["Debenture", "An instrument acknowledging or creating company debt, which may be secured."],
      ["Fixed security", "Security attached to an identified asset and restricting dealings without consent."],
      ["Floating security", "Security over a changing class of business assets until crystallisation."],
      ["Capital maintenance", "Principles restricting returns of protected company capital to safeguard creditors."],
    ],
  },
  {
    area: "F",
    title: "Management, administration and regulation",
    intro: "Understand directors, members, governance decisions and organisational accountability.",
    terms: [
      ["Director", "A person occupying the position responsible for directing and managing company affairs."],
      ["Fiduciary duty", "A loyalty obligation requiring a person to act for proper purposes and avoid undisclosed conflicts."],
      ["Duty of care", "An obligation to exercise the skill, care and diligence reasonably expected in the circumstances."],
      ["Board resolution", "A decision validly taken by the directors under the organisation's governance rules."],
      ["Member resolution", "A formal company decision taken by shareholders using the required voting threshold."],
      ["Quorum", "The minimum participation required for a meeting to transact valid business."],
      ["Auditor independence", "Freedom from interests or relationships that compromise objective audit judgement."],
      ["Corporate governance", "The system by which organisations are directed, controlled and held accountable."],
    ],
  },
  {
    area: "G",
    title: "Insolvency law",
    intro: "Recognise distress, collective procedures, creditor ranking and avoidance of improper transactions.",
    terms: [
      ["Insolvency", "Inability to pay debts when due or a state in which liabilities exceed assets under the applicable test."],
      ["Liquidation", "A collective procedure that realises assets, pays claims by priority and ends the entity."],
      ["Rescue procedure", "A process intended to preserve a viable business or produce a better creditor outcome than liquidation."],
      ["Secured creditor", "A creditor holding enforceable rights over identified or circulating assets."],
      ["Preferential creditor", "A creditor whose qualifying claim ranks ahead of ordinary unsecured claims."],
      ["Unsecured creditor", "A creditor without proprietary security for the debt."],
      ["Transaction at undervalue", "A pre-insolvency transaction for materially less than the value provided."],
      ["Preference", "A pre-insolvency act that improperly improves one creditor's position relative to others."],
    ],
  },
  {
    area: "H",
    title: "Corporate fraudulent and criminal behaviour",
    intro: "Apply the international principles used to prevent corruption, laundering, fraud and market abuse.",
    terms: [
      ["Fraud", "Intentional deception or dishonest conduct designed to secure gain or cause loss."],
      ["Bribery", "Offering, giving, requesting or receiving an improper advantage to influence conduct."],
      ["Money laundering", "Processes that conceal, convert, transfer or use property representing criminal proceeds."],
      ["Customer due diligence", "Risk-based identification and verification of customers and beneficial owners."],
      ["Beneficial owner", "The natural person who ultimately owns, controls or benefits from an arrangement."],
      ["Suspicious transaction report", "A protected report to the appropriate authority concerning suspected criminal property."],
      ["Insider dealing", "Prohibited dealing or related conduct using material non-public information."],
      ["Corporate compliance programme", "Risk-based policies, controls, training and monitoring designed to prevent misconduct."],
    ],
  },
]

export const LW_GLOBAL_CHAPTERS: StudyChapter[] = AREAS.map((source) => ({
  paper: "LW",
  area: source.area,
  title: source.title,
  minutes: 30,
  intro: source.intro,
  outcomes: [
    `Explain the core principles in ${source.title.toLowerCase()}`,
    "Apply the principles to a cross-border business scenario",
    "Distinguish the most commonly confused rules and remedies",
  ],
  sections: [{
    id: `lw-glo-${source.area.toLowerCase()}-core`,
    heading: "Core principles and application",
    blocks: [
      { kind: "text", md: source.intro },
      { kind: "table", caption: "Global variant knowledge map", head: ["Concept", "Exam meaning"], rows: source.terms },
      { kind: "callout", tone: "tip", title: "Application method", md: "Identify the governing instrument or legal principle, connect it to the stated facts, and conclude on the parties' rights, liabilities or remedy. Do not import a domestic rule unless the question supplies it." },
    ],
    check: {
      q: `Which approach is most appropriate when answering ${/^[aeiou]/i.test(source.title) ? "an" : "a"} ${source.title.toLowerCase()} scenario in LW Global?`,
      options: [
        "Apply the relevant international principle to the facts and reach a supported conclusion",
        "Assume English domestic legislation always governs",
        "Ignore the governing instrument named in the scenario",
        "State a conclusion without identifying a rule",
      ],
      correct: 0,
      explain: "The Global variant tests rule identification, fact-based application and a supported conclusion.",
    },
  }],
  examTraps: [
    { trap: "Importing an English domestic rule into a Global-variant scenario.", fix: "Use the international instrument or general principle specified by the syllabus and the question." },
    { trap: "Giving a rule without applying it to the scenario facts.", fix: "Link every material element of the rule to a stated fact before concluding." },
  ],
  keyTerms: source.terms.map(([term, def]) => ({ term, def })),
  summary: source.terms.map(([term, def]) => `${term}: ${def}`),
}))

