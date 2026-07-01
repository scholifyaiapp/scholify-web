/*
 * Scholify — ACCA written (constructed-response) questions for the AI Examiner.
 *
 * These are the questions the giants can't give instant feedback on: FR-style
 * discursive answers marked per valid point. Each carries a rubric (marking
 * points) the AI Examiner marks against. All ORIGINAL and syllabus-aligned —
 * no ACCA IP reproduced.
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
]

export function getWrittenQuestions(paperId: string): WrittenQuestion[] {
  return WRITTEN_QUESTIONS.filter((q) => q.paper === paperId)
}

export function getWrittenQuestion(id: string): WrittenQuestion | undefined {
  return WRITTEN_QUESTIONS.find((q) => q.id === id)
}
