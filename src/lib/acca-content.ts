import { FA_WAVE2 } from "@/lib/acca-content-fa2"
import { FR_WAVE2 } from "@/lib/acca-content-fr2"
import { AA_WAVE2 } from "@/lib/acca-content-aa2"
import { BT_WAVE2 } from "@/lib/acca-content-bt2"
import { MA_WAVE2 } from "@/lib/acca-content-ma2"
import { FM_WAVE2 } from "@/lib/acca-content-fm2"
import { PM_WAVE2A } from "@/lib/acca-content-pm2"
import { PM_WAVE2B } from "@/lib/acca-content-pm3"
import { TX_WAVE2A } from "@/lib/acca-content-tx2"
import { TX_WAVE2B } from "@/lib/acca-content-tx3"
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
  /** Strategic Professional Options paper (student picks 2 of 4). */
  isOption?: boolean
  /** True once a curated question bank exists (vs AI-generated practice only). */
  hasCuratedContent?: boolean
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
    hasCuratedContent: true,
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
    hasCuratedContent: true,
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

  /* ───────────── FA — additional ───────────── */
  {
    id: "FA-A-02",
    paper: "FA",
    area: "A",
    type: "mcq",
    stem: "Which financial statement reports an entity's financial performance over a period of time?",
    options: [
      "The statement of financial position",
      "The statement of profit or loss",
      "The statement of financial position at the year end only",
      "The trial balance",
    ],
    correct: 1,
    explanation:
      "The statement of profit or loss reports performance (income less expenses) over a period. The statement of financial position shows position at a point in time.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-A-03",
    paper: "FA",
    area: "A",
    type: "mcq",
    stem: "The 'going concern' assumption means that financial statements are prepared on the basis that:",
    options: [
      "The business will be sold within 12 months",
      "The business will continue in operation for the foreseeable future",
      "All assets are measured at their break-up (liquidation) value",
      "Profits will always increase each year",
    ],
    correct: 1,
    explanation:
      "Going concern assumes the entity will continue to operate for the foreseeable future, so assets are not measured at break-up values.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-B-02",
    paper: "FA",
    area: "B",
    type: "mcq",
    stem: "Materiality is best described as an entity-specific aspect of which qualitative characteristic?",
    options: ["Comparability", "Relevance", "Verifiability", "Timeliness"],
    correct: 1,
    explanation:
      "Information is material if omitting or misstating it could influence users' decisions — this is an entity-specific aspect of relevance.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-C-03",
    paper: "FA",
    area: "C",
    type: "mcq",
    stem: "A credit balance brought down on a ledger account would normally represent:",
    options: ["An asset", "An expense", "A liability", "A drawing"],
    correct: 2,
    explanation:
      "Liabilities and income have credit balances; assets, expenses and drawings have debit balances.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-C-04",
    paper: "FA",
    area: "C",
    type: "mcq",
    stem: "A business buys goods for resale on credit. What is the double entry?",
    options: [
      "Dr Payables, Cr Purchases",
      "Dr Purchases, Cr Payables",
      "Dr Purchases, Cr Cash",
      "Dr Inventory, Cr Bank",
    ],
    correct: 1,
    explanation:
      "Purchases (an expense) are debited; the amount owed to the supplier increases trade payables (a liability), which is credited.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FA-D-07",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "An asset costing $20,000 is depreciated at 25% per year on the reducing-balance basis. What is the depreciation charge in YEAR 2, in $?",
    numericAnswer: 3750,
    unit: "$",
    explanation:
      "Year 1: 25% × 20,000 = 5,000, leaving a carrying amount of 15,000. Year 2: 25% × 15,000 = $3,750.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FA-D-08",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "A non-current asset with a carrying amount of $4,000 is sold for $5,000. What is the profit on disposal, in $?",
    numericAnswer: 1000,
    unit: "$",
    explanation:
      "Profit on disposal = proceeds − carrying amount = 5,000 − 4,000 = $1,000.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-D-09",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "Insurance of $2,400 is paid on 1 October covering the 12 months to 30 September. The year end is 31 December. What is the prepayment at the year end, in $?",
    numericAnswer: 1800,
    unit: "$",
    explanation:
      "Only 3 months (Oct–Dec) relate to this year. The remaining 9 months are prepaid: 2,400 × 9/12 = $1,800.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FA-D-10",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "A business buys 10 units at $5 each, then 10 units at $7 each, and sells 12 units. Using FIFO, what is the value of closing inventory, in $?",
    numericAnswer: 56,
    unit: "$",
    explanation:
      "Under FIFO the first 12 sold are the 10 at $5 plus 2 at $7. Closing inventory is the remaining 8 units at $7 = $56.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FA-D-11",
    paper: "FA",
    area: "D",
    type: "number",
    stem: "For a period, output (sales) tax is $3,000 and input (purchase) tax is $1,800. How much is payable to the tax authority, in $?",
    numericAnswer: 1200,
    unit: "$",
    explanation:
      "Amount payable = output tax − input tax = 3,000 − 1,800 = $1,200.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-D-12",
    paper: "FA",
    area: "D",
    type: "mcq",
    stem: "Carriage inwards (the cost of having goods delivered to the business) is included in:",
    options: ["Cost of sales", "Distribution costs", "Administrative expenses", "Finance costs"],
    correct: 0,
    explanation:
      "Carriage inwards is part of the cost of purchases and so is included in cost of sales. Carriage outwards (delivery to customers) is a distribution cost.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-E-01",
    paper: "FA",
    area: "E",
    type: "mcq",
    stem: "Which of the following errors would NOT cause the trial balance to disagree?",
    options: [
      "A one-sided entry",
      "An error of principle",
      "Adding up a ledger account incorrectly (a casting error)",
      "Recording a different amount on the debit and credit sides",
    ],
    correct: 1,
    explanation:
      "An error of principle (e.g. capital expenditure treated as revenue expenditure) still has equal debits and credits, so the trial balance agrees. The others create unequal totals.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FA-E-02",
    paper: "FA",
    area: "E",
    type: "mcq",
    stem: "A suspense account is opened when:",
    options: [
      "The business makes a loss",
      "The trial balance does not balance",
      "A customer fails to pay",
      "Inventory is counted at the year end",
    ],
    correct: 1,
    explanation:
      "A suspense account temporarily holds the difference when a trial balance fails to balance, until the errors are found and corrected.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-G-02",
    paper: "FA",
    area: "G",
    type: "mcq",
    stem: "When preparing a consolidated statement of financial position, the assets and liabilities of the parent and its subsidiary are:",
    options: [
      "Added together only in proportion to the parent's shareholding",
      "Added together in full (100%), regardless of the non-controlling interest",
      "Shown separately, never combined",
      "Only the parent's are included",
    ],
    correct: 1,
    explanation:
      "Because the parent controls the subsidiary, 100% of the subsidiary's assets and liabilities are added to the parent's. The non-controlling interest is then shown within equity.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FA-H-02",
    paper: "FA",
    area: "H",
    type: "number",
    stem: "Profit before interest and tax is $40,000 and capital employed is $200,000. What is the return on capital employed (ROCE), as a percentage?",
    numericAnswer: 20,
    unit: "%",
    explanation:
      "ROCE = (Profit before interest and tax ÷ Capital employed) × 100 = (40,000 ÷ 200,000) × 100 = 20%.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FA-H-03",
    paper: "FA",
    area: "H",
    type: "number",
    stem: "Inventory is $20,000 and cost of sales is $146,000. What is the inventory holding period, in days (use 365)? Round to the nearest day.",
    numericAnswer: 50,
    tolerance: 1,
    explanation:
      "Inventory days = (Inventory ÷ Cost of sales) × 365 = (20,000 ÷ 146,000) × 365 = 50 days.",
    marks: 2,
    difficulty: "hard",
  },

  /* ───────────── FR — additional ───────────── */
  {
    id: "FR-A-02",
    paper: "FR",
    area: "A",
    type: "mcq",
    stem: "According to the Conceptual Framework, what is the underlying assumption used in preparing financial statements?",
    options: ["Prudence", "Going concern", "Accruals", "Consistency"],
    correct: 1,
    explanation:
      "Going concern is the underlying assumption: statements assume the entity will continue in operation for the foreseeable future.",
    marks: 2,
    difficulty: "easy",
  },
  {
    id: "FR-B-05",
    paper: "FR",
    area: "B",
    type: "mcq",
    stem: "Under IFRS 16 Leases, a lessee generally recognises which of the following at the commencement of a lease?",
    options: [
      "Only an expense as lease payments are made",
      "A right-of-use asset and a lease liability",
      "Only a lease liability",
      "The leased asset at its full fair value and no liability",
    ],
    correct: 1,
    explanation:
      "IFRS 16 requires the lessee to recognise a right-of-use asset and a corresponding lease liability (subject to limited short-term/low-value exemptions).",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FR-B-06",
    paper: "FR",
    area: "B",
    type: "mcq",
    stem: "Under IAS 38 Intangible Assets, how is expenditure on the RESEARCH phase of an internal project treated?",
    options: [
      "Capitalised as an intangible asset",
      "Expensed to profit or loss as incurred",
      "Capitalised only if the project is profitable",
      "Recognised in other comprehensive income",
    ],
    correct: 1,
    explanation:
      "Research costs are expensed as incurred. Development costs are capitalised only once the strict IAS 38 criteria (the 'PIRATE'/development criteria) are met.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FR-B-07",
    paper: "FR",
    area: "B",
    type: "mcq",
    stem: "Under IAS 36, an asset is impaired when its carrying amount exceeds its recoverable amount. Recoverable amount is:",
    options: [
      "The lower of fair value less costs of disposal and value in use",
      "The higher of fair value less costs of disposal and value in use",
      "Always the asset's value in use",
      "Always the asset's fair value",
    ],
    correct: 1,
    explanation:
      "Recoverable amount is the HIGHER of (a) fair value less costs of disposal and (b) value in use. An impairment loss is the excess of carrying amount over this figure.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FR-B-08",
    paper: "FR",
    area: "B",
    type: "number",
    stem: "An asset has a carrying amount of $500,000. Its fair value less costs of disposal is $420,000 and its value in use is $460,000. What is the impairment loss, in $?",
    numericAnswer: 40000,
    unit: "$",
    explanation:
      "Recoverable amount = higher of 420,000 and 460,000 = 460,000. Impairment loss = 500,000 − 460,000 = $40,000.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FR-C-01",
    paper: "FR",
    area: "C",
    type: "mcq",
    stem: "A company's trade receivables collection period has increased from 40 days to 60 days. This most likely indicates:",
    options: [
      "Improved credit control",
      "Customers are paying more slowly / weaker credit control",
      "A fall in revenue",
      "An increase in inventory",
    ],
    correct: 1,
    explanation:
      "A longer collection period means receivables are outstanding longer — customers are paying more slowly, which may signal weaker credit control or cash-flow pressure.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FR-D-01",
    paper: "FR",
    area: "D",
    type: "mcq",
    stem: "Which of the following is reported in the statement of changes in equity?",
    options: ["Revenue for the year", "Dividends paid to shareholders", "Cost of sales", "Finance costs"],
    correct: 1,
    explanation:
      "Dividends paid are a distribution to owners and are shown in the statement of changes in equity, not in profit or loss.",
    marks: 2,
    difficulty: "medium",
  },
  {
    id: "FR-E-02",
    paper: "FR",
    area: "E",
    type: "mcq",
    stem: "On consolidation, unrealised profit included in closing inventory from an intra-group sale is:",
    options: [
      "Left in inventory as normal",
      "Eliminated (removed) on consolidation",
      "Added to goodwill",
      "Recognised as other income",
    ],
    correct: 1,
    explanation:
      "Profit on sales within the group is unrealised until sold outside the group, so it is eliminated from inventory and from the selling company's profit on consolidation.",
    marks: 2,
    difficulty: "hard",
  },
  {
    id: "FR-E-03",
    paper: "FR",
    area: "E",
    type: "number",
    stem: "A parent pays $1,000,000 for 75% of a subsidiary. The non-controlling interest is measured at $250,000 and the fair value of the subsidiary's identifiable net assets is $900,000. What is goodwill, in $?",
    numericAnswer: 350000,
    unit: "$",
    explanation:
      "Goodwill = consideration + NCI − fair value of net assets = 1,000,000 + 250,000 − 900,000 = $350,000.",
    marks: 2,
    difficulty: "hard",
  },

  /* ───────────── MA — Management Accounting ───────────── */
  {
    id: "MA-A-01", paper: "MA", area: "A", type: "mcq",
    stem: "A cost that remains the same in total regardless of the level of activity is best described as a:",
    options: ["Variable cost", "Fixed cost", "Semi-variable cost", "Direct cost"],
    correct: 1,
    explanation: "A fixed cost stays constant in total over a relevant range (e.g. rent). Variable costs change in total with activity; semi-variable costs have both elements.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "MA-A-02", paper: "MA", area: "A", type: "number",
    stem: "Using the high-low method: at 1,000 units total cost is $8,000; at 2,000 units total cost is $12,000. What is the variable cost per unit, in $?",
    numericAnswer: 4, unit: "$",
    explanation: "Variable cost per unit = change in cost ÷ change in units = (12,000 − 8,000) ÷ (2,000 − 1,000) = $4.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "MA-B-01", paper: "MA", area: "B", type: "mcq",
    stem: "Which costing method includes fixed production overheads in the cost of a unit of product?",
    options: ["Marginal costing", "Absorption costing", "Throughput accounting", "Variable costing"],
    correct: 1,
    explanation: "Absorption costing absorbs fixed production overheads into unit cost. Marginal (variable) costing treats them as period costs.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "MA-B-02", paper: "MA", area: "B", type: "number",
    stem: "Budgeted production overheads are $50,000 and budgeted labour hours are 10,000. What is the overhead absorption rate per labour hour, in $?",
    numericAnswer: 5, unit: "$",
    explanation: "OAR = budgeted overheads ÷ budgeted activity = 50,000 ÷ 10,000 = $5 per labour hour.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "MA-C-01", paper: "MA", area: "C", type: "number",
    stem: "Selling price is $25 per unit and variable cost is $15 per unit. What is the contribution per unit, in $?",
    numericAnswer: 10, unit: "$",
    explanation: "Contribution per unit = selling price − variable cost per unit = 25 − 15 = $10.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "MA-C-02", paper: "MA", area: "C", type: "number",
    stem: "Fixed costs are $20,000 and contribution is $10 per unit. What is the breakeven point, in units?",
    numericAnswer: 2000,
    explanation: "Breakeven (units) = fixed costs ÷ contribution per unit = 20,000 ÷ 10 = 2,000 units.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "MA-C-03", paper: "MA", area: "C", type: "mcq",
    stem: "The margin of safety is best described as:",
    options: [
      "The excess of budgeted (or actual) sales over the breakeven sales",
      "Total contribution less fixed costs",
      "Sales revenue less variable costs",
      "The breakeven point expressed in units",
    ],
    correct: 0,
    explanation: "The margin of safety is how far sales can fall before reaching breakeven — the excess of sales over the breakeven level.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "MA-D-01", paper: "MA", area: "D", type: "mcq",
    stem: "5,000 kg of material are bought at $5.20/kg; the standard price is $5.00/kg. What is the material price variance?",
    options: ["$1,000 favourable", "$1,000 adverse", "$200 adverse", "$260 adverse"],
    correct: 1,
    explanation: "Price variance = (standard price − actual price) × actual quantity = (5.00 − 5.20) × 5,000 = −$1,000, i.e. $1,000 adverse (paid more than standard).",
    marks: 2, difficulty: "hard",
  },
  {
    id: "MA-D-02", paper: "MA", area: "D", type: "mcq",
    stem: "A favourable variance is one where:",
    options: [
      "Actual cost exceeds standard cost",
      "Actual results are better than standard (higher profit)",
      "The budget was not met",
      "Sales volume falls below budget",
    ],
    correct: 1,
    explanation: "A favourable variance increases profit versus standard (e.g. lower cost or higher revenue than expected). An adverse variance reduces profit.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "MA-E-01", paper: "MA", area: "E", type: "number",
    stem: "A division has operating profit of $30,000 and capital employed of $150,000. What is its return on investment (ROI), as a percentage?",
    numericAnswer: 20, unit: "%",
    explanation: "ROI = (operating profit ÷ capital employed) × 100 = (30,000 ÷ 150,000) × 100 = 20%.",
    marks: 2, difficulty: "medium",
  },

  /* ───────────── AA — Audit and Assurance ───────────── */
  {
    id: "AA-A-01", paper: "AA", area: "A", type: "mcq",
    stem: "The primary objective of an external audit of financial statements is to:",
    options: [
      "Detect all fraud and error",
      "Express an opinion on whether the financial statements give a true and fair view",
      "Prepare the financial statements",
      "Guarantee the company is a going concern",
    ],
    correct: 1,
    explanation: "The auditor expresses an opinion on whether the financial statements give a true and fair view (are fairly presented). It is not their job to prepare them or to guarantee/detect all fraud.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "AA-A-02", paper: "AA", area: "A", type: "mcq",
    stem: "An external audit provides what level of assurance?",
    options: ["Absolute assurance", "Reasonable assurance", "Limited assurance", "No assurance"],
    correct: 1,
    explanation: "An audit gives reasonable (high but not absolute) assurance, due to inherent limitations such as sampling and judgement. A review engagement gives limited assurance.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "AA-B-01", paper: "AA", area: "B", type: "mcq",
    stem: "According to the audit risk model, audit risk is a function of:",
    options: [
      "Inherent risk, control risk and detection risk",
      "Business risk and financial risk",
      "Sampling risk only",
      "Materiality and performance materiality",
    ],
    correct: 0,
    explanation: "Audit risk = inherent risk × control risk × detection risk. The auditor sets detection risk (through the nature, timing and extent of procedures) to reduce audit risk to an acceptable level.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "AA-C-01", paper: "AA", area: "C", type: "mcq",
    stem: "A test of controls is designed to:",
    options: [
      "Detect material misstatements in account balances",
      "Evaluate the operating effectiveness of internal controls",
      "Confirm the existence of receivables",
      "Recalculate depreciation",
    ],
    correct: 1,
    explanation: "Tests of controls assess whether controls are operating effectively. Substantive procedures (the other options) test for misstatements in the figures themselves.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "AA-D-01", paper: "AA", area: "D", type: "mcq",
    stem: "For audit evidence to be 'appropriate', it must be:",
    options: [
      "Sufficient in quantity",
      "Relevant and reliable",
      "Obtained only from within the entity",
      "Documented in the engagement letter",
    ],
    correct: 1,
    explanation: "Appropriateness is the quality of evidence — its relevance and reliability. Sufficiency is the quantity. Both are needed to support the opinion.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "AA-D-02", paper: "AA", area: "D", type: "mcq",
    stem: "Which of the following would normally be the MOST reliable source of audit evidence?",
    options: [
      "An oral representation from management",
      "A document generated internally by the client",
      "A written confirmation obtained directly from an independent third party",
      "A photocopy provided by the client",
    ],
    correct: 2,
    explanation: "Evidence from independent external sources (e.g. a direct bank or receivables confirmation) is generally more reliable than internally-generated or oral evidence.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "AA-E-01", paper: "AA", area: "E", type: "mcq",
    stem: "An unmodified audit opinion states that the financial statements:",
    options: [
      "Contain no errors of any kind",
      "Give a true and fair view (are fairly presented) in all material respects",
      "Are guaranteed to be free from fraud",
      "Have been prepared by the auditor",
    ],
    correct: 1,
    explanation: "An unmodified (clean) opinion says the statements give a true and fair view in all material respects — not that they are perfect or fraud-free.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "AA-E-02", paper: "AA", area: "E", type: "mcq",
    stem: "The auditor finds a misstatement that is material but NOT pervasive. What opinion is appropriate?",
    options: [
      "Unmodified opinion",
      "Qualified ('except for') opinion",
      "Adverse opinion",
      "Disclaimer of opinion",
    ],
    correct: 1,
    explanation: "Material but not pervasive → a qualified 'except for' opinion. Material AND pervasive misstatement → adverse opinion.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "AA-E-03", paper: "AA", area: "E", type: "mcq",
    stem: "The auditor is unable to obtain sufficient appropriate evidence, and the possible effects are both material and pervasive. The appropriate opinion is a:",
    options: [
      "Qualified opinion",
      "Disclaimer of opinion",
      "Adverse opinion",
      "Unmodified opinion with an emphasis of matter",
    ],
    correct: 1,
    explanation: "A limitation of scope that is material and pervasive leads to a disclaimer of opinion (the auditor does not express an opinion). If only material, it would be qualified.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "AA-B-02", paper: "AA", area: "B", type: "mcq",
    stem: "In auditing, 'materiality' is best described as:",
    options: [
      "The total value of a company's assets",
      "The magnitude of a misstatement that could influence users' economic decisions",
      "The auditor's fee",
      "The number of items tested",
    ],
    correct: 1,
    explanation: "A misstatement is material if, individually or in aggregate, it could reasonably be expected to influence the economic decisions of users taken on the basis of the financial statements.",
    marks: 2, difficulty: "medium",
  },

  /* ───────────── PM — Performance Management ───────────── */
  {
    id: "PM-A-01", paper: "PM", area: "A", type: "mcq",
    stem: "Activity-based costing (ABC) assigns production overheads to products on the basis of:",
    options: ["Direct labour hours only", "Cost drivers that cause the activities", "Machine hours only", "Sales revenue"],
    correct: 1,
    explanation: "ABC traces overheads to cost pools and then to products using the cost drivers that actually cause the cost, giving more accurate product costs than a single volume-based rate.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM-A-02", paper: "PM", area: "A", type: "number",
    stem: "A product has a target selling price of $100 and the company requires a profit margin of 20% of the selling price. What is the target cost, in $?",
    numericAnswer: 80, unit: "$",
    explanation: "Target cost = target selling price − required profit = 100 − (20% × 100) = 100 − 20 = $80.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM-A-03", paper: "PM", area: "A", type: "number",
    stem: "A product sells for $50 and its direct material cost is $20. Under throughput accounting, what is the throughput per unit, in $?",
    numericAnswer: 30, unit: "$",
    explanation: "Throughput accounting treats only material as a variable cost: throughput = sales price − direct material cost = 50 − 20 = $30.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM-B-01", paper: "PM", area: "B", type: "mcq",
    stem: "In relevant costing, a 'sunk cost' is:",
    options: ["A future cost that will change with the decision", "A past cost that has already been incurred and is not relevant", "The benefit foregone from the next best alternative", "A cost that varies with output"],
    correct: 1,
    explanation: "A sunk cost is a past, already-incurred cost that cannot be changed by the decision, so it is ignored. Only future incremental cash flows are relevant.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM-B-02", paper: "PM", area: "B", type: "mcq",
    stem: "When one resource is a limiting factor (scarce), products should be ranked for production by:",
    options: ["Contribution per unit", "Contribution per unit of the limiting factor", "Selling price per unit", "Profit per unit after fixed costs"],
    correct: 1,
    explanation: "To maximise contribution when a resource is scarce, rank products by contribution earned per unit of the limiting factor, then produce in that order.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM-B-03", paper: "PM", area: "B", type: "mcq",
    stem: "Which of the following is a relevant cost for a decision?",
    options: ["A committed cost the company must pay regardless", "A future incremental cash flow arising from the decision", "Depreciation of existing equipment", "An allocated share of head-office overhead"],
    correct: 1,
    explanation: "Relevant costs are future, incremental cash flows that differ between alternatives. Committed costs, depreciation (non-cash) and general allocations are not relevant.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM-C-01", paper: "PM", area: "C", type: "mcq",
    stem: "A flexible budget is one that:",
    options: ["Never changes once approved", "Is adjusted to reflect the actual level of activity achieved", "Only covers cash flows", "Is prepared for a single fixed output level"],
    correct: 1,
    explanation: "A flexible budget is restated ('flexed') to the actual activity level so that like-for-like comparison with actual results gives meaningful variances.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM-D-01", paper: "PM", area: "D", type: "mcq",
    stem: "The four perspectives of the balanced scorecard are financial, customer, internal business process, and:",
    options: ["Environmental", "Learning and growth", "Competitor", "Regulatory"],
    correct: 1,
    explanation: "The balanced scorecard (Kaplan & Norton) uses four perspectives: financial, customer, internal business process, and learning and growth (innovation).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM-D-02", paper: "PM", area: "D", type: "mcq",
    stem: "Residual income (RI) for a division is calculated as:",
    options: ["Controllable profit ÷ capital employed", "Controllable profit − (imputed interest charge on the investment)", "Sales − variable costs", "Profit before interest and tax × capital employed"],
    correct: 1,
    explanation: "RI = controllable/divisional profit − an imputed interest (cost of capital × investment). Unlike ROI, it is an absolute money measure and discourages rejecting good projects.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM-B-04", paper: "PM", area: "B", type: "mcq",
    stem: "In a make-or-buy decision with no scarce resources, a company should generally buy externally when:",
    options: ["The external price is below the relevant (incremental) cost of making internally", "The external supplier is larger", "Making internally has any fixed costs at all", "The product is complex"],
    correct: 0,
    explanation: "Compare the external purchase price with the relevant (variable/incremental) cost of making. Buy when the external price is lower than the cost that would be saved by not making.",
    marks: 2, difficulty: "hard",
  },

  /* ───────────── FM — Financial Management ───────────── */
  {
    id: "FM-A-01", paper: "FM", area: "A", type: "mcq",
    stem: "The primary financial objective of a company is usually stated as:",
    options: ["Maximising sales revenue", "Maximising shareholder wealth", "Minimising costs", "Maximising market share"],
    correct: 1,
    explanation: "The conventional primary financial objective is the maximisation of shareholder wealth, usually reflected in the share price and dividends.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "FM-B-01", paper: "FM", area: "B", type: "mcq",
    stem: "Under the net present value (NPV) rule, a project should be accepted if its NPV is:",
    options: ["Negative", "Greater than zero", "Equal to the payback period", "Less than the IRR"],
    correct: 1,
    explanation: "A positive NPV means the project earns more than the cost of capital and adds to shareholder wealth, so it should be accepted.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "FM-B-02", paper: "FM", area: "B", type: "number",
    stem: "A project costs $20,000 and generates constant net cash inflows of $5,000 per year. What is the payback period, in years?",
    numericAnswer: 4,
    explanation: "Payback = initial investment ÷ annual cash inflow = 20,000 ÷ 5,000 = 4 years.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "FM-B-03", paper: "FM", area: "B", type: "number",
    stem: "What is the present value of $1,100 receivable in one year's time, using a discount rate of 10%? Give your answer in $.",
    numericAnswer: 1000, unit: "$",
    explanation: "PV = future value ÷ (1 + r)^n = 1,100 ÷ 1.10 = $1,000.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "FM-B-04", paper: "FM", area: "B", type: "mcq",
    stem: "The internal rate of return (IRR) of a project is:",
    options: ["The rate of inflation over the project life", "The discount rate at which the project's NPV is zero", "The company's cost of debt", "Always equal to the cost of capital"],
    correct: 1,
    explanation: "The IRR is the discount rate that gives a net present value of zero. A project is acceptable if its IRR exceeds the cost of capital.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "FM-C-01", paper: "FM", area: "C", type: "mcq",
    stem: "The working capital (cash operating) cycle is calculated as:",
    options: ["Inventory days + receivables days − payables days", "Receivables days + payables days − inventory days", "Inventory days − receivables days + payables days", "Current assets − current liabilities"],
    correct: 0,
    explanation: "The cash operating cycle = inventory holding days + receivables collection days − payables payment days. A longer cycle ties up more cash in working capital.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "FM-C-02", paper: "FM", area: "C", type: "mcq",
    stem: "The economic order quantity (EOQ) model determines the order size that:",
    options: ["Maximises the quantity discount", "Minimises total ordering plus holding costs", "Uses up the entire budget", "Matches the supplier's minimum order"],
    correct: 1,
    explanation: "EOQ is the order quantity that minimises the total of annual ordering costs and annual inventory holding costs.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "FM-D-01", paper: "FM", area: "D", type: "mcq",
    stem: "The weighted average cost of capital (WACC) is:",
    options: ["The cost of equity only", "The average cost of a company's sources of finance, weighted by their market values", "Always equal to the cost of debt", "The risk-free rate plus inflation"],
    correct: 1,
    explanation: "WACC blends the costs of equity and debt (and any other finance), weighted by the proportion each contributes at market value. It is often used as the discount rate for appraisal.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "FM-D-02", paper: "FM", area: "D", type: "mcq",
    stem: "The after-tax cost of irredeemable debt is calculated as:",
    options: ["Interest ÷ nominal value", "Interest × (1 − tax rate) ÷ market value of the debt", "Interest ÷ (market value × tax rate)", "Dividend ÷ share price"],
    correct: 1,
    explanation: "For irredeemable debt, after-tax cost = annual interest × (1 − tax rate) ÷ ex-interest market value, because debt interest is tax-deductible.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "FM-E-01", paper: "FM", area: "E", type: "mcq",
    stem: "Under the dividend growth model, the ex-dividend value of a share is:",
    options: ["D0 × (1 + g)", "D0(1 + g) ÷ (re − g)", "D0 ÷ re", "re − g"],
    correct: 1,
    explanation: "The dividend growth (Gordon) model gives P0 = D0(1 + g) ÷ (re − g), where D0 is the current dividend, g the growth rate and re the cost of equity (re must exceed g).",
    marks: 2, difficulty: "hard",
  },

  /* ───────────── BT — Business and Technology ───────────── */
  {
    id: "BT-A-01", paper: "BT", area: "A", type: "mcq",
    stem: "Which of the following is an INTERNAL stakeholder of a company?",
    options: ["A customer", "An employee", "A supplier", "The government"],
    correct: 1,
    explanation: "Internal stakeholders operate inside the organisation (employees, managers, directors). Customers, suppliers and government are external stakeholders.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "BT-A-02", paper: "BT", area: "A", type: "mcq",
    stem: "Which framework is used to analyse the external MACRO-environment of a business?",
    options: ["SWOT analysis", "PESTEL analysis", "Porter's five forces", "The Boston (BCG) matrix"],
    correct: 1,
    explanation: "PESTEL (Political, Economic, Social, Technological, Environmental, Legal) analyses the macro-environment. Porter's five forces analyses the industry; SWOT is internal/external combined.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "BT-B-01", paper: "BT", area: "B", type: "mcq",
    stem: "According to Maslow's hierarchy of needs, which level is at the BASE of the pyramid?",
    options: ["Self-actualisation", "Esteem needs", "Physiological needs", "Safety needs"],
    correct: 2,
    explanation: "Maslow's hierarchy rises from physiological needs (base) → safety → social → esteem → self-actualisation (top).",
    marks: 2, difficulty: "easy",
  },
  {
    id: "BT-B-02", paper: "BT", area: "B", type: "mcq",
    stem: "What is the correct order of Tuckman's stages of team development?",
    options: [
      "Forming, storming, norming, performing",
      "Storming, forming, performing, norming",
      "Norming, forming, storming, performing",
      "Forming, norming, storming, performing",
    ],
    correct: 0,
    explanation: "Tuckman's sequence is forming → storming → norming → performing (with 'adjourning' sometimes added as a fifth stage).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "BT-B-03", paper: "BT", area: "B", type: "mcq",
    stem: "Which of the following is one of Fayol's five functions of management?",
    options: ["Marketing", "Planning", "Auditing", "Purchasing"],
    correct: 1,
    explanation: "Fayol's five functions are planning, organising, commanding, coordinating and controlling.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "BT-C-01", paper: "BT", area: "C", type: "mcq",
    stem: "Separating the roles of Chief Executive (CEO) and Chairman is an example of good:",
    options: ["Marketing", "Corporate governance", "Cost control", "Inventory management"],
    correct: 1,
    explanation: "Splitting these roles prevents too much power resting with one person — a key corporate governance principle.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "BT-C-02", paper: "BT", area: "C", type: "mcq",
    stem: "The 'agency problem' in a company refers to the potential conflict between:",
    options: [
      "Customers and suppliers",
      "Directors (agents) and shareholders (principals)",
      "Employees and trade unions",
      "The company and the tax authority",
    ],
    correct: 1,
    explanation: "Directors act as agents for the shareholders (principals). The agency problem is that directors may pursue their own interests rather than maximising shareholder wealth.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "BT-C-03", paper: "BT", area: "C", type: "mcq",
    stem: "Which of the following is NOT one of the five fundamental principles of the ACCA Code of Ethics?",
    options: ["Integrity", "Objectivity", "Profitability", "Confidentiality"],
    correct: 2,
    explanation: "The five fundamental principles are integrity, objectivity, professional competence & due care, confidentiality, and professional behaviour. 'Profitability' is not one of them.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "BT-D-01", paper: "BT", area: "D", type: "mcq",
    stem: "Requiring that the person who authorises a payment is different from the person who records it is an example of:",
    options: ["Segregation of duties", "Depreciation", "A marketing control", "Budgeting"],
    correct: 0,
    explanation: "Segregation (separation) of duties is an internal control that reduces the risk of error and fraud by splitting related tasks between different people.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "BT-D-02", paper: "BT", area: "D", type: "mcq",
    stem: "The main purpose of an internal audit function is to:",
    options: [
      "Prepare the financial statements",
      "Provide independent assurance on risk management and internal controls",
      "Express an opinion for external shareholders",
      "Set the company's strategy",
    ],
    correct: 1,
    explanation: "Internal audit provides independent, objective assurance to management on the effectiveness of risk management, control and governance. The external auditor reports to shareholders.",
    marks: 2, difficulty: "medium",
  },

  /* ───────────── LW — Corporate and Business Law (English law) ───────────── */
  {
    id: "LW-A-01", paper: "LW", area: "A", type: "mcq",
    stem: "In the English legal system, the doctrine by which decisions of higher courts bind lower courts in later cases is known as:",
    options: ["Legislation", "Judicial precedent", "Delegated legislation", "Statutory interpretation"],
    correct: 1,
    explanation: "Judicial precedent (stare decisis) means the legal principle from a higher court's decision binds lower courts in similar future cases — the basis of common (case) law.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "LW-B-01", paper: "LW", area: "B", type: "mcq",
    stem: "Which of the following is NOT an essential element of a valid simple contract?",
    options: [
      "Offer and acceptance",
      "Consideration",
      "Intention to create legal relations",
      "Registration of the contract at court",
    ],
    correct: 3,
    explanation: "A valid simple contract needs offer, acceptance, consideration, intention to create legal relations and capacity. Contracts do not generally need to be registered at court.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "LW-B-02", paper: "LW", area: "B", type: "mcq",
    stem: "Goods displayed in a shop window with a price tag are generally treated in contract law as:",
    options: ["An offer", "An invitation to treat", "An acceptance", "A binding contract"],
    correct: 1,
    explanation: "A display of goods is an invitation to treat, inviting the customer to make an offer to buy, which the shop may then accept or reject.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "LW-B-03", paper: "LW", area: "B", type: "mcq",
    stem: "The rule that 'consideration must be sufficient but need not be adequate' means:",
    options: [
      "Consideration must always equal the market value",
      "Consideration must have some value in the eyes of the law, but need not be a fair price",
      "Consideration is not required at all",
      "Only money counts as consideration",
    ],
    correct: 1,
    explanation: "Consideration must be real and have some legal value (sufficient), but the courts do not require it to be economically adequate (a fair or market price).",
    marks: 2, difficulty: "hard",
  },
  {
    id: "LW-B-04", paper: "LW", area: "B", type: "mcq",
    stem: "To succeed in a claim for the tort of negligence, a claimant must establish that the defendant:",
    options: [
      "Intended to cause harm",
      "Owed a duty of care, breached it, and thereby caused loss",
      "Breached a written contract",
      "Made a false statement",
    ],
    correct: 1,
    explanation: "Negligence requires a duty of care owed to the claimant, a breach of that duty, and resulting loss/damage caused by the breach (causation, not too remote).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "LW-D-01", paper: "LW", area: "D", type: "mcq",
    stem: "The principle that a company is a legal person separate from its members was established in:",
    options: ["Donoghue v Stevenson", "Salomon v Salomon & Co Ltd", "Carlill v Carbolic Smoke Ball Co", "Hadley v Baxendale"],
    correct: 1,
    explanation: "Salomon v Salomon & Co Ltd established the principle of separate legal personality — a company is distinct from its shareholders (the 'veil of incorporation').",
    marks: 2, difficulty: "medium",
  },
  {
    id: "LW-D-02", paper: "LW", area: "D", type: "mcq",
    stem: "In a company limited by shares, the liability of a member is limited to:",
    options: [
      "The company's total debts",
      "Any amount unpaid on their shares",
      "The value of the company's assets",
      "Nothing — members have no liability",
    ],
    correct: 1,
    explanation: "A member's liability is limited to any amount unpaid on the shares they hold. Once shares are fully paid, the member has no further liability for the company's debts.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "LW-D-03", paper: "LW", area: "D", type: "mcq",
    stem: "A key difference between a public limited company (plc) and a private limited company is that a plc:",
    options: [
      "Cannot have shareholders",
      "May offer its shares to the public",
      "Pays no tax",
      "Does not need directors",
    ],
    correct: 1,
    explanation: "A public company (plc) may offer its shares to the public and can be listed; a private company cannot offer shares to the public.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "LW-D-04", paper: "LW", area: "D", type: "mcq",
    stem: "A company director owes their fiduciary duties primarily to:",
    options: ["Individual shareholders personally", "The company as a whole", "The company's creditors at all times", "Their fellow directors"],
    correct: 1,
    explanation: "Directors' duties (e.g. to promote the success of the company) are owed to the company itself, not to individual shareholders (though creditors' interests matter as insolvency approaches).",
    marks: 2, difficulty: "hard",
  },
  {
    id: "LW-C-01", paper: "LW", area: "C", type: "mcq",
    stem: "An employee dismissed without being given the notice they are contractually entitled to may bring a claim for:",
    options: ["Unfair dismissal only", "Wrongful dismissal", "Redundancy pay", "Breach of statutory duty"],
    correct: 1,
    explanation: "Wrongful dismissal is a common-law claim for dismissal in breach of the contract (e.g. without proper notice). Unfair dismissal is a separate statutory claim about the reason/fairness of the dismissal.",
    marks: 2, difficulty: "hard",
  },

  /* ───────────── TX — Taxation (UK) ─────────────
   * Rates/allowances are stated in the stem (as the real exam provides a tax
   * rates sheet), so these stay correct across Finance Acts. */
  {
    id: "TX-A-01", paper: "TX", area: "A", type: "mcq",
    stem: "Which of the following factors most strongly indicates that a worker is an EMPLOYEE rather than self-employed?",
    options: [
      "The worker provides their own equipment",
      "The worker bears the financial risk of the work",
      "The engager controls how, when and where the work is done",
      "The worker is free to send a substitute to do the work",
    ],
    correct: 2,
    explanation: "Control by the engager is a key indicator of employment. Providing own equipment, bearing financial risk and the right of substitution all point towards self-employment.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX-A-02", paper: "TX", area: "A", type: "number",
    stem: "The personal allowance is £12,570, reduced by £1 for every £2 of adjusted net income above £100,000. What personal allowance (in £) is available to an individual with adjusted net income of £110,000?",
    numericAnswer: 7570,
    unit: "£",
    explanation: "Income exceeds £100,000 by £10,000, so the allowance is reduced by £10,000 ÷ 2 = £5,000. Personal allowance = £12,570 − £5,000 = £7,570.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX-A-03", paper: "TX", area: "A", type: "number",
    stem: "An individual has taxable income (after deducting the personal allowance) of £40,000, all non-savings income. With a basic rate band of £37,700 taxed at 20% and a higher rate of 40% above that, what is the income tax liability in £?",
    numericAnswer: 8460,
    unit: "£",
    explanation: "£37,700 × 20% = £7,540, plus (£40,000 − £37,700) = £2,300 × 40% = £920. Total liability = £7,540 + £920 = £8,460.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX-A-04", paper: "TX", area: "A", type: "mcq",
    stem: "Which of the following sources of income is EXEMPT from income tax?",
    options: [
      "Interest received on an ISA",
      "Bank interest on an ordinary savings account",
      "Dividends from quoted shares held directly",
      "Rental income from a buy-to-let property",
    ],
    correct: 0,
    explanation: "Income arising within an ISA (interest or dividends) is exempt from income tax. Ordinary bank interest, dividends and rental income are all taxable (though allowances/rates may reduce the tax).",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX-B-01", paper: "TX", area: "B", type: "mcq",
    stem: "Which of the following assets is EXEMPT from capital gains tax on disposal by an individual?",
    options: [
      "A buy-to-let residential flat",
      "A private motor car",
      "Quoted shares held outside an ISA",
      "An antique table sold for £30,000",
    ],
    correct: 1,
    explanation: "Motor cars are exempt assets for CGT. Investment property, quoted shares held directly and non-wasting chattels sold for more than £6,000 are all chargeable.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX-B-02", paper: "TX", area: "B", type: "number",
    stem: "An individual makes a chargeable gain of £9,000 on quoted shares and has no other disposals in the tax year. Assuming an annual exempt amount of £3,000, what is the taxable gain in £?",
    numericAnswer: 6000,
    unit: "£",
    explanation: "The annual exempt amount is deducted from chargeable gains: £9,000 − £3,000 = £6,000 taxable gain.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX-B-03", paper: "TX", area: "B", type: "mcq",
    stem: "For CGT, a disposal of shares by an individual is matched with acquisitions in which order?",
    options: [
      "Share pool first, then same-day acquisitions, then the following 30 days",
      "Same-day acquisitions, then acquisitions in the following 30 days, then the share pool",
      "Acquisitions in the following 30 days, then same-day, then the share pool",
      "Strict first-in first-out across all acquisitions",
    ],
    correct: 1,
    explanation: "The share matching rules for individuals: (1) acquisitions on the same day as disposal, (2) acquisitions within the following 30 days, (3) the share pool of earlier acquisitions.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX-C-01", paper: "TX", area: "C", type: "mcq",
    stem: "In computing a company's tax-adjusted trading profit, which of the following expenses is NOT allowable?",
    options: [
      "Staff wages",
      "Entertaining customers",
      "Repairs to machinery",
      "An irrecoverable trade debt written off",
    ],
    correct: 1,
    explanation: "Entertaining anyone other than staff is specifically disallowed. Staff costs, genuine repairs and trade debts written off are all allowable deductions.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX-C-02", paper: "TX", area: "C", type: "number",
    stem: "A company's accounting profit is £100,000 after charging depreciation of £20,000 and customer entertaining of £5,000. Capital allowances for the period are £15,000. What is the tax-adjusted trading profit in £?",
    numericAnswer: 110000,
    unit: "£",
    explanation: "Add back the disallowed items (depreciation £20,000 + entertaining £5,000) and deduct capital allowances: £100,000 + £25,000 − £15,000 = £110,000.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX-D-01", paper: "TX", area: "D", type: "mcq",
    stem: "When applying the historic (12-month) test for compulsory VAT registration, 'taxable supplies' include:",
    options: [
      "Standard-rated supplies only",
      "Standard-rated, reduced-rated and zero-rated supplies",
      "Standard-rated and exempt supplies",
      "All supplies including exempt supplies",
    ],
    correct: 1,
    explanation: "Taxable supplies are all supplies that are not exempt — i.e. standard-rated, reduced-rated and zero-rated. Exempt supplies never count towards the registration threshold.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX-D-02", paper: "TX", area: "D", type: "mcq",
    stem: "A business makes ONLY zero-rated supplies. Which statement is correct?",
    options: [
      "It cannot register for VAT",
      "It can register for VAT and recover its input VAT",
      "It must charge VAT at the standard rate",
      "It can register but cannot recover any input VAT",
    ],
    correct: 1,
    explanation: "Zero-rated supplies are taxable supplies (at 0%), so the business can register (and may apply for exemption from registration) and recover input VAT. A business making only exempt supplies cannot register.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX-E-01", paper: "TX", area: "E", type: "mcq",
    stem: "For inheritance tax, a lifetime gift of cash from one individual to another individual is:",
    options: [
      "A chargeable lifetime transfer (CLT)",
      "A potentially exempt transfer (PET)",
      "Always completely exempt",
      "Taxed immediately at the death rate of 40%",
    ],
    correct: 1,
    explanation: "A lifetime gift to another individual is a PET — no IHT when made, and it becomes fully exempt if the donor survives 7 years. Gifts into most trusts are CLTs, chargeable when made.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX-E-02", paper: "TX", area: "E", type: "number",
    stem: "An individual dies with a chargeable estate of £500,000. The full nil rate band of £325,000 is available and no residence nil rate band applies. At a death rate of 40%, what is the IHT payable in £?",
    numericAnswer: 70000,
    unit: "£",
    explanation: "The estate above the nil rate band is £500,000 − £325,000 = £175,000, taxed at 40% = £70,000.",
    marks: 2, difficulty: "medium",
  },
  ...FA_WAVE2,
  ...FR_WAVE2,
  ...AA_WAVE2,
  ...BT_WAVE2,
  ...MA_WAVE2,
  ...FM_WAVE2,
  ...PM_WAVE2A,
  ...PM_WAVE2B,
  ...TX_WAVE2A,
  ...TX_WAVE2B,
]
