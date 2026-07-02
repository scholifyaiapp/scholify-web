/*
 * Scholify — ACCA written (constructed-response) questions for the AI Examiner.
 *
 * These are the questions the giants can't give instant feedback on:
 * discursive answers (FR and Strategic Professional SBR) marked per valid
 * point. Each carries a rubric (marking points) the AI Examiner marks
 * against. All ORIGINAL and syllabus-aligned — no ACCA IP reproduced.
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
]

export function getWrittenQuestions(paperId: string): WrittenQuestion[] {
  return WRITTEN_QUESTIONS.filter((q) => q.paper === paperId)
}

export function getWrittenQuestion(id: string): WrittenQuestion | undefined {
  return WRITTEN_QUESTIONS.find((q) => q.id === id)
}
