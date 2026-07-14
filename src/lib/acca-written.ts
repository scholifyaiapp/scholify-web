import { WRITTEN_WAVE2 } from "@/lib/acca-written-wave2"
import { WRITTEN_S1 } from "@/lib/acca-written-s1"
import { WRITTEN_S2 } from "@/lib/acca-written-s2"
import { WRITTEN_S3 } from "@/lib/acca-written-s3"
// Wave 3 — the Applied Skills papers whose real exam HAS a constructed-response
// section (PM, TX, FM, AA, FR). Before this, the AI Examiner was advertised to
// them with an empty bank behind it.
import { WRITTEN_W3_PM } from "@/lib/acca-written-w3-pm"
import { WRITTEN_W3_TX } from "@/lib/acca-written-w3-tx"
import { WRITTEN_W3_FM } from "@/lib/acca-written-w3-fm"
import { WRITTEN_W3_AA } from "@/lib/acca-written-w3-aa"
import { WRITTEN_W3_FR } from "@/lib/acca-written-w3-fr"
/*
 * Scholify — ACCA written (constructed-response) questions for the AI Examiner.
 *
 * These are the questions the giants can't give instant feedback on: discursive
 * answers marked per valid point. Each carries a rubric (marking points) the AI
 * Examiner marks against. All ORIGINAL and syllabus-aligned — no ACCA IP
 * reproduced.
 *
 * Coverage follows the real exams: every paper with a constructed-response
 * section (FR, PM, TX, FM, AA and all six Strategic Professional papers) has a
 * written set. BT, MA, FA and LW are 100% objective-test exams — they carry no
 * written questions BY DESIGN, and the app hides the AI Examiner for them
 * rather than promising marking their exam will never ask for.
 */

export interface WrittenQuestion {
  id: string
  paper: string
  area: string
  /** Short topic label for lists. */
  topic: string
  /** The full question text. */
  stem: string
  maxMarks: number
  /** Marking points — the examiner awards ~1 mark per valid point covered. */
  rubric: string[]
}

export const WRITTEN_QUESTIONS: WrittenQuestion[] = [
  {
    id: "FR-W-01",
    paper: "FR",
    area: "B",
    topic: "IAS 16 — subsequent measurement",
    stem: "Explain the two models permitted under IAS 16 for the subsequent measurement of property, plant and equipment, and outline how a revaluation surplus and any subsequent deficit are accounted for. (6 marks)",
    maxMarks: 6,
    rubric: [
      "The cost model: asset carried at cost less accumulated depreciation and accumulated impairment losses.",
      "The revaluation model: asset carried at fair value at the revaluation date less subsequent depreciation and impairment.",
      "Under the revaluation model, revaluations must be kept sufficiently up to date and applied to the whole class of assets.",
      "A revaluation gain is recognised in other comprehensive income and accumulated in a revaluation surplus (within equity).",
      "A gain is recognised in profit or loss only to the extent it reverses a previous revaluation decrease of the same asset charged to P/L.",
      "A revaluation deficit is charged to profit or loss, except to the extent it reverses a surplus previously recognised in OCI for that asset.",
    ],
  },
  {
    id: "FR-W-02",
    paper: "FR",
    area: "B",
    topic: "IFRS 15 — five-step model",
    stem: "Describe the five-step model in IFRS 15 Revenue from Contracts with Customers, and briefly explain what happens at each step. (5 marks)",
    maxMarks: 5,
    rubric: [
      "Step 1: Identify the contract with the customer (enforceable rights and obligations, commercial substance, probable collection).",
      "Step 2: Identify the separate performance obligations (distinct promises to transfer goods or services).",
      "Step 3: Determine the transaction price (including variable consideration and the time value of money where significant).",
      "Step 4: Allocate the transaction price to the performance obligations, usually on a relative stand-alone selling price basis.",
      "Step 5: Recognise revenue as (or when) each performance obligation is satisfied — over time or at a point in time.",
    ],
  },
  {
    id: "FR-W-03",
    paper: "FR",
    area: "B",
    topic: "IAS 37 — provisions",
    stem: "Explain the criteria in IAS 37 for recognising a provision, and distinguish a provision from a contingent liability. (6 marks)",
    maxMarks: 6,
    rubric: [
      "A provision is recognised when there is a present obligation (legal or constructive) arising from a past event.",
      "It is probable (more likely than not) that an outflow of economic benefits will be required to settle it.",
      "A reliable estimate can be made of the amount of the obligation.",
      "If all three criteria are met, a provision is recognised as a liability at the best estimate of the expenditure.",
      "A contingent liability is a possible obligation, or a present obligation where an outflow is not probable or cannot be measured reliably.",
      "A contingent liability is not recognised but is disclosed, unless the possibility of outflow is remote.",
    ],
  },
  {
    id: "FR-W-04",
    paper: "FR",
    area: "A",
    topic: "Qualitative characteristics",
    stem: "The Conceptual Framework identifies fundamental and enhancing qualitative characteristics of useful financial information. Explain the two fundamental characteristics and give the four enhancing characteristics. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Relevance: information is capable of making a difference to users' decisions (has predictive and/or confirmatory value).",
      "Materiality is an entity-specific aspect of relevance based on the nature or magnitude of the item.",
      "Faithful representation: information is complete, neutral and free from error.",
      "Comparability: users can identify similarities and differences between items and across periods/entities.",
      "Verifiability: knowledgeable, independent observers could reach consensus that information is faithfully represented.",
      "Timeliness and understandability are the remaining two enhancing characteristics.",
    ],
  },
  {
    id: "FR-W-05",
    paper: "FR",
    area: "B",
    topic: "IAS 36 — impairment",
    stem: "Explain what is meant by an impairment loss under IAS 36 Impairment of Assets, how the recoverable amount is determined, and how an impairment loss is accounted for. (6 marks)",
    maxMarks: 6,
    rubric: [
      "An impairment loss arises when an asset's carrying amount exceeds its recoverable amount.",
      "Recoverable amount is the higher of fair value less costs of disposal and value in use.",
      "Value in use is the present value of the future cash flows expected from the asset.",
      "Entities must assess at each reporting date whether there is any indication of impairment.",
      "For a non-revalued asset, the impairment loss is charged to profit or loss.",
      "For a revalued asset, the loss is first offset against any revaluation surplus for that asset (in OCI), with any excess to profit or loss.",
    ],
  },
  {
    id: "FR-W-06",
    paper: "FR",
    area: "E",
    topic: "Goodwill on consolidation",
    stem: "Explain how goodwill arising on the acquisition of a subsidiary is calculated, and how it is subsequently treated in the consolidated financial statements. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Goodwill = consideration transferred + non-controlling interest − fair value of identifiable net assets acquired.",
      "Consideration transferred is measured at fair value at the acquisition date.",
      "The non-controlling interest may be measured at fair value (full goodwill) or at its proportionate share of net assets (partial goodwill).",
      "The subsidiary's identifiable net assets are measured at fair value at the acquisition date.",
      "Goodwill is not amortised.",
      "Goodwill is tested for impairment at least annually, and any impairment is charged to profit or loss.",
    ],
  },

  /* ───────────── SBR — Strategic Business Reporting ─────────────
   * The moat content: Strategic Professional written answers have no
   * instant-feedback tool anywhere else. */
  {
    id: "SBR-W-01",
    paper: "SBR",
    area: "A",
    topic: "Conceptual Framework — elements & recognition",
    stem: "Define an asset and a liability under the IASB Conceptual Framework (2018), and explain when an element is recognised in the financial statements. (6 marks)",
    maxMarks: 6,
    rubric: [
      "An asset is a present economic resource controlled by the entity as a result of past events.",
      "An economic resource is a right that has the potential to produce economic benefits.",
      "A liability is a present obligation of the entity to transfer an economic resource as a result of past events.",
      "An obligation is a duty or responsibility the entity has no practical ability to avoid.",
      "An element is recognised if recognition provides users with relevant information about the element.",
      "Recognition must also provide a faithful representation of the element, and the benefits of the information should justify the cost.",
    ],
  },
  {
    id: "SBR-W-02",
    paper: "SBR",
    area: "B",
    topic: "IFRS 16 — lessee accounting",
    stem: "Explain how a lessee accounts for a lease under IFRS 16 Leases, both at the commencement date and subsequently, and identify the recognition exemptions available. (6 marks)",
    maxMarks: 6,
    rubric: [
      "At commencement the lessee recognises a right-of-use asset and a lease liability.",
      "The lease liability is the present value of unpaid lease payments, discounted at the rate implicit in the lease or, if not readily determinable, the lessee's incremental borrowing rate.",
      "The right-of-use asset comprises the liability plus initial direct costs, payments made at or before commencement and estimated restoration costs, less lease incentives received.",
      "Subsequently the liability is measured at amortised cost: interest accrues on the outstanding balance and payments reduce it.",
      "The right-of-use asset is depreciated over the shorter of the lease term and the asset's useful life (over useful life if ownership transfers).",
      "Recognition exemptions: short-term leases (12 months or less, no purchase option) and leases of low-value assets may instead be expensed, normally straight-line.",
    ],
  },
  {
    id: "SBR-W-03",
    paper: "SBR",
    area: "C",
    topic: "IFRS 10 — control",
    stem: "Explain the three elements of control in IFRS 10 Consolidated Financial Statements, and discuss how an investor holding less than half of the voting rights could still control an investee. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Control requires power over the investee — existing rights giving the current ability to direct the relevant activities.",
      "Control requires exposure, or rights, to variable returns from involvement with the investee.",
      "Control requires the ability to use power over the investee to affect the amount of the investor's returns.",
      "All three elements must be present, and control is reassessed when facts and circumstances change.",
      "With less than half the voting rights, de facto control can exist where the remaining holdings are widely dispersed and the investor's stake is dominant in practice.",
      "Power can also arise from potential voting rights that are substantive, or from contractual arrangements directing the relevant activities.",
    ],
  },
  {
    id: "SBR-W-04",
    paper: "SBR",
    area: "D",
    topic: "IFRS 9 — classification & impairment",
    stem: "Explain how financial assets are classified under IFRS 9 Financial Instruments, and outline the expected credit loss model for impairment. (7 marks)",
    maxMarks: 7,
    rubric: [
      "Classification depends on the entity's business model for managing the asset and the asset's contractual cash flow characteristics (the SPPI test — solely payments of principal and interest).",
      "Amortised cost: held within a business model to collect contractual cash flows, and cash flows are SPPI.",
      "Fair value through OCI (debt): held to both collect contractual cash flows and sell, and cash flows are SPPI.",
      "Fair value through profit or loss is the residual category (e.g. held for trading, or SPPI failed); an irrevocable FVOCI election exists for equity investments not held for trading (no recycling).",
      "Impairment uses a forward-looking expected credit loss (ECL) model — losses are recognised before a default occurs.",
      "At initial recognition, 12-month ECL is recognised (stage 1).",
      "If credit risk increases significantly since initial recognition, lifetime ECL is recognised (stage 2); credit-impaired assets (stage 3) also compute interest on the net carrying amount.",
    ],
  },
  {
    id: "SBR-W-05",
    paper: "SBR",
    area: "B",
    topic: "IFRS 2 — share-based payment",
    stem: "Distinguish between equity-settled and cash-settled share-based payment transactions under IFRS 2, explaining how each is measured and how vesting conditions are treated. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Equity-settled transactions with employees are measured at the grant-date fair value of the equity instruments granted, and this fair value is not subsequently remeasured.",
      "The expense is spread over the vesting period, with a corresponding credit to equity.",
      "Service and non-market performance conditions are reflected by adjusting the number of instruments expected to vest, trued up each period to actual outcomes.",
      "Market conditions (e.g. a share-price target) are built into the grant-date fair value and are NOT subsequently adjusted, whether or not the condition is met.",
      "Cash-settled transactions (e.g. share appreciation rights) are recognised as a liability measured at fair value.",
      "The liability is remeasured at each reporting date (and at settlement), with changes recognised in profit or loss.",
    ],
  },
  {
    id: "SBR-W-06",
    paper: "SBR",
    area: "E",
    topic: "Ethics — management bias in estimates",
    stem: "Accounting estimates such as impairments, provisions and expected credit losses involve significant judgement. Discuss the ethical issues that arise when management may be biased in making such estimates, and the actions a professional accountant should take. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Estimates rely on judgement and assumptions, so they are inherently susceptible to management bias.",
      "Bias may be driven by self-interest: bonus or profit targets, loan covenants, or meeting market expectations (a self-interest threat).",
      "Deliberate bias contravenes the fundamental principles of integrity and objectivity in the ACCA Code of Ethics.",
      "Biased estimates mean the financial statements are not neutral or faithfully representative, misleading investors and other users.",
      "The accountant should apply professional scepticism and ensure estimates are based on reasonable and supportable assumptions, with appropriate disclosure of uncertainty.",
      "If bias persists, escalate: discuss with senior management or those charged with governance, seek professional advice, and consider resignation or other formal action as a last resort.",
    ],
  },

  /* ───────────── SBL — Strategic Business Leader ───────────── */
  {
    id: "SBL-W-01",
    paper: "SBL",
    area: "A",
    topic: "Non-executive directors & governance",
    stem: "Explain the roles of non-executive directors (NEDs) on a listed company's board, and discuss how they contribute to good corporate governance. (6 marks)",
    maxMarks: 6,
    rubric: [
      "NEDs provide independent oversight of executive management while having no day-to-day operational role.",
      "Strategy role: constructively challenge and help develop proposals on strategy.",
      "Scrutiny role: monitor the performance of executive management against agreed goals and objectives.",
      "Risk role: satisfy themselves that financial information is accurate and that financial controls and risk management systems are robust.",
      "People role: determine executive remuneration and play a leading part in board appointments and succession (remuneration and nomination committees).",
      "Their independence reduces the agency problem and balances power on the board — e.g. staffing the audit, remuneration and nomination committees.",
    ],
  },
  {
    id: "SBL-W-02",
    paper: "SBL",
    area: "B",
    topic: "Porter's five forces",
    stem: "Describe the five forces in Porter's model of industry competition, and explain how a board can use the model when setting strategy. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Threat of new entrants — determined by barriers to entry such as capital requirements, economies of scale, regulation and brand loyalty.",
      "Bargaining power of suppliers — high when suppliers are concentrated or inputs are critical and hard to substitute.",
      "Bargaining power of buyers — high when buyers are large, concentrated, price-sensitive or face low switching costs.",
      "Threat of substitute products or services meeting the same customer need.",
      "Intensity of competitive rivalry among existing firms (growth rates, exit barriers, differentiation).",
      "Use: assess the attractiveness/profit potential of an industry and design strategies that weaken adverse forces — e.g. differentiation to soften rivalry, raising switching costs, diversifying suppliers.",
    ],
  },
  {
    id: "SBL-W-03",
    paper: "SBL",
    area: "C",
    topic: "Risk management process & TARA",
    stem: "Describe the main stages of an effective risk management process, including the four TARA responses to identified risks. (7 marks)",
    maxMarks: 7,
    rubric: [
      "Identification: systematically identify internal and external risks facing the organisation (e.g. registers, workshops, scenario analysis).",
      "Assessment: evaluate each risk's likelihood and impact, typically mapped on a risk heat map.",
      "Transfer: shift the risk to a third party, e.g. insurance or outsourcing.",
      "Avoid: withdraw from the activity giving rise to a risk that is outside appetite.",
      "Reduce: implement internal controls to lower likelihood or impact.",
      "Accept: retain risks that are low likelihood and low impact where mitigation isn't cost-effective; responses should reflect the board's risk appetite.",
      "Monitoring and reporting: maintain the risk register, review responses regularly, and escalate changes to the board/risk committee.",
    ],
  },
  {
    id: "SBL-W-04",
    paper: "SBL",
    area: "D",
    topic: "Big data — benefits & risks",
    stem: "Discuss the potential benefits and risks to a large retail company of investing in big data analytics. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Benefit: customer insight and personalisation — targeted offers and recommendations that increase revenue and loyalty.",
      "Benefit: improved demand forecasting and inventory optimisation, reducing stockouts and holding costs.",
      "Benefit: faster, evidence-based decisions (e.g. dynamic pricing, store location analytics) as a source of competitive advantage.",
      "Risk: data quality/veracity — analytics built on incomplete or biased data leads to poor decisions.",
      "Risk: privacy and regulatory compliance (e.g. data protection law); breaches cause fines and reputational damage.",
      "Risk: significant cost and scarce skills — infrastructure investment and competition for data specialists, plus cyber-security exposure.",
    ],
  },
  {
    id: "SBL-W-05",
    paper: "SBL",
    area: "B",
    topic: "Mendelow's stakeholder matrix",
    stem: "Explain Mendelow's matrix, and describe how management should respond to stakeholders in each quadrant. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Mendelow's matrix maps stakeholders on two dimensions: their power over the organisation and their level of interest in its activities.",
      "Key players (high power, high interest): engage closely — their participation or approval is central to strategy (e.g. major shareholders, regulators in regulated industries).",
      "Keep satisfied (high power, low interest): meet their needs so they don't become active opponents (e.g. institutional investors, some regulators).",
      "Keep informed (low power, high interest): communicate openly — they can influence others (e.g. employees, community groups, pressure groups).",
      "Minimal effort (low power, low interest): monitor without over-investing management time.",
      "The matrix is dynamic — stakeholders move between quadrants as issues develop, so the mapping must be revisited.",
    ],
  },
  {
    id: "SBL-W-06",
    paper: "SBL",
    area: "C",
    topic: "Internal audit effectiveness",
    stem: "Describe the factors that determine whether an internal audit function is effective. (6 marks)",
    maxMarks: 6,
    rubric: [
      "Independence: internal audit should report to the audit committee, not to the executives whose activities it audits.",
      "Objectivity: staff should have no operational responsibilities and should not audit work they previously performed.",
      "Competence and resources: appropriately qualified, trained staff with sufficient budget.",
      "Scope and access: unrestricted access to records, personnel and all areas of the business, with a risk-based work plan.",
      "Reporting and follow-up: findings reported clearly with recommendations tracked to implementation.",
      "Standing and quality: board support, adherence to professional standards, and periodic external quality review.",
    ],
  },
  ...WRITTEN_WAVE2,
  ...WRITTEN_S1,
  ...WRITTEN_S2,
  ...WRITTEN_S3,
  ...WRITTEN_W3_PM,
  ...WRITTEN_W3_TX,
  ...WRITTEN_W3_FM,
  ...WRITTEN_W3_AA,
  ...WRITTEN_W3_FR,
]

export function getWrittenQuestions(paperId: string): WrittenQuestion[] {
  return WRITTEN_QUESTIONS.filter((q) => q.paper === paperId)
}

export function getWrittenQuestion(id: string): WrittenQuestion | undefined {
  return WRITTEN_QUESTIONS.find((q) => q.id === id)
}
