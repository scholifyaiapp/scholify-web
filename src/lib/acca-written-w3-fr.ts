import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * Scholify — FR (Financial Reporting) written questions, wave 3.
 *
 * FR's existing written set leaned heavily on area B (individual IFRS
 * transactions) while carrying only one question each on area C (analysing and
 * interpreting) and area D (preparation) — the two areas that ARE the exam's
 * constructed-response section. These two close that gap.
 *
 * Every scenario, name and figure is INVENTED; all technical content is drawn
 * from the public syllabus only. No ACCA, Kaplan or BPP material is reproduced.
 * Each carries a rubric of marking points (~1 mark each).
 */

export const WRITTEN_W3_FR: WrittenQuestion[] = [
  {
    id: "FR-W3-01",
    paper: "FR",
    area: "C",
    topic: "Interpretation — why a rising margin can hide a worsening position",
    stem: "Halvard Interiors Co reports revenue up 18% on the prior year and a gross margin that has improved from 31% to 38%. Yet its overdraft has grown, its inventory holding period has risen from 52 to 91 days, and its receivables collection period from 44 to 78 days. The finance director is presenting the margin improvement to the board as evidence of a successful year. Explain what the ratios taken together suggest about Halvard's performance and position, and the further information you would need before accepting the finance director's conclusion. (10 marks)",
    maxMarks: 10,
    rubric: [
      "A higher gross margin with sharply rising inventory days may indicate that goods are not selling and inventory is being carried at cost rather than written down to net realisable value, overstating both margin and assets.",
      "The lengthening receivables collection period suggests revenue growth may have been bought by relaxing credit terms, so some of the 18% growth may not convert into cash.",
      "Growing inventory and receivables days together are the classic signature of overtrading — expanding revenue faster than the working capital available to support it.",
      "The growing overdraft is consistent with this: profit is being reported but cash is being absorbed into working capital rather than generated.",
      "The margin improvement should be tested against a change in sales mix, a change in cost classification between cost of sales and operating expenses, or capitalisation of costs that were previously expensed.",
      "A change in accounting policy or estimate (for example useful lives or an inventory valuation method) could improve margin without any underlying improvement in trading.",
      "Ratios are only comparable if the prior-year figures are on the same basis; the effect of any acquisition, disposal or new IFRS applied in the year must be isolated.",
      "Further information needed: an aged inventory and aged receivables analysis, to see whether the balances are old and potentially irrecoverable or unsaleable.",
      "Further information needed: the statement of cash flows, to compare operating cash flow with reported profit — the single most direct test of earnings quality here.",
      "Conclusion: the margin improvement alone does not evidence a successful year; the position appears to be deteriorating and the company may face a liquidity problem despite reporting higher profit.",
    ],
  },
  {
    id: "FR-W3-02",
    paper: "FR",
    area: "D",
    topic: "Preparation — adjustments between the trial balance and the financial statements",
    stem: "You are preparing the financial statements of Redmoor Trading Co for the year ended 31 December. The draft trial balance has been extracted, but the following are unadjusted: (i) a machine purchased on 1 July for $240,000 with a five-year life on which no depreciation has been charged; (ii) the year-end inventory count, which valued a damaged batch at its cost of $30,000 although it can only be sold for $18,000 after $2,000 of rectification; (iii) a $60,000 receipt from a customer in December for goods to be delivered in February, credited to revenue; and (iv) an unpaid, unrecorded electricity invoice of $9,000 relating to the year. Explain the adjustment required for each item and its effect on profit and on the statement of financial position. (10 marks)",
    maxMarks: 10,
    rubric: [
      "Machine: depreciation must be charged from the date the asset is available for use, so a half-year charge of $24,000 ($240,000 ÷ 5 × 6/12) is required.",
      "Machine: this reduces profit by $24,000 and reduces the carrying amount of property, plant and equipment to $216,000 through accumulated depreciation.",
      "Inventory: IAS 2 requires inventory to be measured at the lower of cost and net realisable value, item by item — not in aggregate.",
      "Inventory: net realisable value of the damaged batch is $16,000 ($18,000 selling price less $2,000 rectification cost), so it is written down from $30,000 to $16,000.",
      "Inventory: the $14,000 write-down is charged to cost of sales, reducing profit and reducing current assets by the same amount.",
      "Customer receipt: under IFRS 15 revenue is recognised when the performance obligation is satisfied, which is on delivery in February, not on receipt of cash.",
      "Customer receipt: the $60,000 must be removed from revenue (reducing profit) and recognised as a contract liability (deferred income) within current liabilities.",
      "Electricity: the expense relates to the period and must be accrued under the accruals concept, whether or not an invoice has been received or paid.",
      "Electricity: profit is reduced by $9,000 and an accrual of $9,000 is recognised within current liabilities.",
      "Overall effect: profit falls by $107,000 ($24,000 + $14,000 + $60,000 + $9,000); net assets fall by the same amount, keeping the statement of financial position in balance.",
    ],
  },
]
