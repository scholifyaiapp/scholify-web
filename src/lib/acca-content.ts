/*
 * Scholify — ACCA content: papers, syllabus areas, and a seed question bank.
 *
 * IMPORTANT (legal): every question here is ORIGINAL and written to align with
 * the public ACCA syllabus. We do NOT reproduce ACCA's official exam questions
 * or marking schemes (their IP). "ACCA" is used descriptively only — Scholify
 * is not affiliated with or endorsed by ACCA.
 *
 * Accuracy is existential: one wrong answer destroys trust. Every item below
 * has a verified answer + a teaching explanation. New questions come from the
 * AI generator later; these seeds make the loop work with zero API keys.
 */

export type QuestionType = "mcq" | "multi" | "number"
export type Difficulty = "easy" | "medium" | "hard"

export interface SyllabusArea {
  /** Single-letter area code used across the syllabus, e.g. "D". */
  code: string
  label: string
}

export interface AccaPaper {
  /** Short id used in routes + storage, e.g. "FA". */
  id: string
  /** Display code, e.g. "FA (F3)". */
  code: string
  name: string
  /** ACCA level. */
  level: "Applied Knowledge" | "Applied Skills" | "Strategic Professional"
  blurb: string
  areas: SyllabusArea[]
}

export interface AccaQuestion {
  id: string
  /** Paper id this belongs to (matches AccaPaper.id). */
  paper: string
  /** Syllabus area code (matches a SyllabusArea.code on the paper). */
  area: string
  type: QuestionType
  /** The question text/stem. */
  stem: string
  /** Answer options (mcq / multi). */
  options?: string[]
  /** Correct option index (mcq) or indices (multi). */
  correct?: number | number[]
  /** Correct value for a numeric-entry question. */
  numericAnswer?: number
  /** Unit shown alongside a numeric answer, e.g. "$". */
  unit?: string
  /** Accepted +/- tolerance for numeric answers. */
  tolerance?: number
  /** Why the answer is correct — shown after grading. */
  explanation: string
  /** Marks the question is worth (OT questions are typically 2). */
  marks: number
  difficulty: Difficulty
}

/* ── Papers ───────────────────────────────────────────────────── */

export const PAPERS: AccaPaper[] = [
  {
    id: "FA",
    code: "FA (F3)",
    name: "Financial Accounting",
    level: "Applied Knowledge",
    blurb:
      "The foundations: double-entry, recording transactions, trial balance, and preparing basic financial statements.",
    areas: [
      { code: "A", label: "Context & purpose of financial reporting" },
      { code: "B", label: "Qualitative characteristics of financial information" },
      { code: "C", label: "Double-entry & accounting systems" },
      { code: "D", label: "Recording transactions & events" },
      { code: "E", label: "Preparing a trial balance" },
      { code: "F", label: "Preparing basic financial statements" },
      { code: "G", label: "Simple consolidated financial statements" },
      { code: "H", label: "Interpretation of financial statements" },
    ],
  },
  {
    id: "FR",
    code: "FR (F7)",
    name: "Financial Reporting",
    level: "Applied Skills",
    blurb:
      "Applying IFRS Accounting Standards to transactions, and preparing & interpreting financial statements including groups.",
    areas: [
      { code: "A", label: "The conceptual & regulatory framework" },
      { code: "B", label: "Accounting for transactions (IFRS)" },
      { code: "C", label: "Analysing & interpreting financial statements" },
      { code: "D", label: "Preparation of financial statements" },
      { code: "E", label: "Consolidated financial statements" },
    ],
  },
]

/* ── Question bank ────────────────────────────────────────────── */

export const QUESTIONS: AccaQuestion[] = [
  /* ───────────── FA — Financial Accounting ───────────── */
  {
    id: "FA-C-01",
    paper: "FA",
    area: "C",
    type: "mcq",
    stem: "A business pays $500 for rent by cheque. What is the correct double entry?",
    options: [
      "Dr Bank $500, Cr Rent $500",
      "Dr Rent $500, Cr Bank $500",
      "Dr Rent $500, Cr Cash $500",
      "Dr Cash $500, Cr Rent $500",
    ],
    correct: 1,
    explanation:
      "Rent is an expense, so it is debited (expenses increase on the debit side). Paying by cheque reduces the bank asset, so bank is credited.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-A-01",
    paper: "FA",
    area: "A",
    type: "number",
    stem: "A business has assets of $50,000 and liabilities of $20,000. What is the capital (owner's equity), in $?",
    numericAnswer: 30000,
    unit: "$",
    explanation:
      "The accounting equation: Assets = Capital + Liabilities, so Capital = Assets − Liabilities = 50,000 − 20,000 = $30,000.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-D-01",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "Goods are sold for $1,200 including sales tax at 20%. How much sales tax is included, in $?",
    numericAnswer: 200,
    unit: "$",
    explanation:
      "The $1,200 is tax-inclusive. Net amount = 1,200 ÷ 1.20 = 1,000. Sales tax = 1,200 − 1,000 = $200.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-D-02",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "An asset costs $10,000, has a residual value of $1,000 and a useful life of 5 years. Using the straight-line method, what is the annual depreciation charge, in $?",
    numericAnswer: 1800,
    unit: "$",
    explanation:
      "Straight-line depreciation = (Cost − Residual value) ÷ Useful life = (10,000 − 1,000) ÷ 5 = $1,800 per year.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-D-03",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "During the year a business paid $4,400 for electricity. At the year end $600 is still owing (accrued). What is the electricity expense charged to the statement of profit or loss, in $?",
    numericAnswer: 5000,
    unit: "$",
    explanation:
      "The expense is what was incurred, not just paid: 4,400 paid + 600 accrued = $5,000. The $600 is also shown as an accrual (current liability).",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-D-04",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "Trade receivables are $40,000. A specific debt of $2,000 is to be written off as irrecoverable, and an allowance of 5% is required on the remaining receivables. What is the allowance for receivables, in $?",
    numericAnswer: 1900,
    unit: "$",
    explanation:
      "First remove the irrecoverable debt: 40,000 − 2,000 = 38,000. Allowance = 5% × 38,000 = $1,900.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FA-B-01",
    paper: "FA",
    area: "B",
    type: "mcq",
    stem: "Per the IASB Conceptual Framework, which of the following is a FUNDAMENTAL qualitative characteristic of useful financial information?",
    options: ["Comparability", "Faithful representation", "Timeliness", "Verifiability"],
    correct: 1,
    explanation:
      "The two fundamental characteristics are relevance and faithful representation. Comparability, verifiability, timeliness and understandability are enhancing characteristics.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-D-05",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "Under IAS 2, inventory is measured at the lower of cost and net realisable value. An item has a cost of $8,000 and a net realisable value of $7,500. At what amount is it stated, in $?",
    numericAnswer: 7500,
    unit: "$",
    explanation:
      "IAS 2 requires the lower of cost ($8,000) and NRV ($7,500). The lower figure is $7,500.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-H-01",
    paper: "FA",
    area: "H",
    type: "number",
    stem: "A business has current assets of $60,000 and current liabilities of $24,000. What is the current ratio (to 1 decimal place)?",
    numericAnswer: 2.5,
    tolerance: 0.05,
    explanation:
      "Current ratio = Current assets ÷ Current liabilities = 60,000 ÷ 24,000 = 2.5:1.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-C-02",
    paper: "FA",
    area: "C",
    type: "mcq",
    stem: "In which book of prime entry is a credit sale first recorded?",
    options: ["The cash book", "The sales day book", "The purchase day book", "The journal"],
    correct: 1,
    explanation:
      "Credit sales are first listed in the sales day book (sales journal). The cash book records cash/bank transactions; credit purchases go to the purchase day book.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-F-01",
    paper: "FA",
    area: "F",
    type: "mcq",
    stem: "Which of the following would appear in the statement of financial position (not the statement of profit or loss)?",
    options: ["Revenue", "Cost of sales", "Retained earnings", "Depreciation charge for the year"],
    correct: 2,
    explanation:
      "Retained earnings is a component of equity in the statement of financial position. Revenue, cost of sales and the year's depreciation charge are all in profit or loss.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-G-01",
    paper: "FA",
    area: "G",
    type: "number",
    stem: "A parent company acquires 80% of the ordinary shares of a subsidiary. What percentage of the subsidiary is the non-controlling interest (NCI)?",
    numericAnswer: 20,
    unit: "%",
    explanation:
      "The NCI is the share not owned by the parent: 100% − 80% = 20%.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-D-06",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "The cash book shows a balance of $1,200. There are unpresented cheques of $300 and no other reconciling items. What is the balance shown on the bank statement, in $?",
    numericAnswer: 1500,
    unit: "$",
    explanation:
      "Unpresented cheques have reduced the cash book but not yet cleared the bank, so the bank statement is higher: 1,200 + 300 = $1,500.",
    marks: 2,
    difficulty: "hard",
  },

  /* ───────────── FR — Financial Reporting ───────────── */
  {
    id: "FR-B-01",
    paper: "FR",
    area: "B",
    type: "mcq",
    stem: "Under IAS 16 Property, Plant and Equipment, which of the following IS capitalised as part of the cost of an asset?",
    options: [
      "Staff training on how to use the asset",
      "The initial estimate of dismantling and site restoration costs",
      "General administrative overheads",
      "Costs of abnormal wastage of materials",
    ],
    correct: 1,
    explanation:
      "IAS 16 includes the initial estimate of dismantling/restoration costs (where an obligation exists) in cost. Training, admin overheads and abnormal wastage are expensed.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FR-B-02",
    paper: "FR",
    area: "B",
    type: "number",
    stem: "IFRS 15 Revenue from Contracts with Customers is built around a model with how many steps?",
    numericAnswer: 5,
    explanation:
      "The IFRS 15 model has 5 steps: (1) identify the contract, (2) identify performance obligations, (3) determine the transaction price, (4) allocate the price, (5) recognise revenue as obligations are satisfied.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FR-B-03",
    paper: "FR",
    area: "B",
    type: "number",
    stem: "Under IAS 2, an item of inventory has a selling price of $50, costs to complete of $8 and selling costs of $2. What is its net realisable value (NRV), in $?",
    numericAnswer: 40,
    unit: "$",
    explanation:
      "NRV = estimated selling price − costs to complete − costs to sell = 50 − 8 − 2 = $40.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FR-E-01",
    paper: "FR",
    area: "E",
    type: "number",
    stem: "A parent pays $800,000 for a subsidiary. The non-controlling interest is measured at $150,000 and the fair value of the subsidiary's net assets at acquisition is $700,000. What is goodwill on acquisition, in $?",
    numericAnswer: 250000,
    unit: "$",
    explanation:
      "Goodwill = Consideration + NCI − fair value of net assets acquired = 800,000 + 150,000 − 700,000 = $250,000.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FR-B-04",
    paper: "FR",
    area: "B",
    type: "mcq",
    stem: "Under IAS 37, which of the following is NOT a condition required to recognise a provision?",
    options: [
      "A present obligation arising from a past event",
      "A probable outflow of economic resources",
      "A reliable estimate of the amount can be made",
      "The outflow of resources is virtually certain",
    ],
    correct: 3,
    explanation:
      "A provision needs a present obligation, a probable (more likely than not) outflow, and a reliable estimate. 'Virtually certain' is the threshold for recognising a reimbursement/contingent asset, not a provision.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FR-A-01",
    paper: "FR",
    area: "A",
    type: "mcq",
    stem: "Which body is responsible for issuing IFRS Accounting Standards?",
    options: [
      "The IASB (International Accounting Standards Board)",
      "The FASB (Financial Accounting Standards Board)",
      "IFAC (International Federation of Accountants)",
      "IOSCO",
    ],
    correct: 0,
    explanation:
      "IFRS Accounting Standards are issued by the IASB. The FASB issues US GAAP; IFAC and IOSCO are separate international bodies.",
    marks: 2,
    difficulty: "easy",
  },
]
