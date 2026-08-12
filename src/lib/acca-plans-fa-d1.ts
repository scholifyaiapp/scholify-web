/*
 * FA Area D, first half — recording transactions and events: sales and purchases,
 * cash, inventory, tangible non-current assets, depreciation and disposals.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * The computational heart of FA. Two distractor patterns dominate and the plans
 * name both: the ENTRY REVERSED (debit and credit transposed, offered on almost
 * every transaction question) and the RIGHT ANSWER TO THE WRONG YEAR — a figure
 * that would be correct if the asset had been owned all year, or if the estimate
 * had been revised at a different date.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FA_PLANS_D1: ExamPlanMap = {
  /* ── FA-09 · Sales, purchases, returns, sales tax, discounts ─── */

  "FA-09::sales-and-purchases": {
    title: "Recording a return and knowing which account it hits",
    format: "ot",
    marks: 2,
    requirement:
      "A customer returns goods sold on credit for $600. The entries in the seller's books are:\n\nA  Debit sales returns $600, credit receivables $600\nB  Debit receivables $600, credit sales returns $600\nC  Debit purchases returns $600, credit payables $600\nD  Debit sales $600, credit bank $600",
    plan: [
      {
        step: "Establish whose books and which direction",
        detail:
          "The SELLER's books, and goods are coming back. So the original sale is being partly reversed: the customer owes less, and revenue is reduced.",
      },
      {
        step: "Reverse the original entry",
        detail:
          "The sale was debit receivables, credit sales. Reversing it means credit receivables and debit sales returns — a separate account rather than crediting sales directly, so the gross figures survive.",
      },
      {
        step: "Reject the buyer's entry",
        detail:
          "Option C uses purchases returns and payables, which is the BUYER's side of the same event. Reading whose books it is disposes of it immediately.",
      },
      {
        step: "Reject the entry that assumes a refund",
        detail:
          "Option D credits bank, which would be right only if cash had been repaid. The stem says the sale was on credit and says nothing about a refund.",
      },
    ],
    answer:
      "**A — debit sales returns $600, credit receivables $600.**\n\nThe original sale was debit receivables, credit sales. A return partly reverses it, so receivables is **credited** and the reversal is **debited** to a separate sales returns account rather than against sales itself — which preserves the gross revenue and returns figures for analysis.\n\nOption B is the entry reversed, offered as always. Option C is the **buyer's** side of the same event, using purchases returns and payables. Option D credits bank, which would be right only if a cash refund had been made, and the stem describes a credit sale with no refund.\n\nAsking whose books, and whether cash moved, settles this whole family of questions.",
    earns: ["Establishing whose books it is and whether cash moved before selecting"],
    loses: ["Using the buyer's entry for the seller, or assuming a refund the stem never mentions"],
  },

  "FA-09::sales-tax": {
    title: "Extracting sales tax from a gross figure",
    format: "ot",
    marks: 2,
    requirement:
      "A business makes credit sales of $23,400 including sales tax at 17%. The sales figure to be recorded in the statement of profit or loss is:\n\nA  $19,422\nB  $20,000\nC  $23,400\nD  $27,378",
    plan: [
      {
        step: "Decide whether the figure is gross or net first",
        detail:
          "\"Including sales tax\" means GROSS — it is 117% of the net amount. If it had said \"excluding\", the figure would be 100% and tax would be added. That one word determines the whole method.",
      },
      {
        step: "Divide by the gross fraction, do not take a percentage of the gross",
        detail:
          "Net = $23,400 × 100/117 = **$20,000**. Taking 17% of $23,400 gives $3,978 of tax and $19,422 of net — which is option A and is the standard error.",
      },
      {
        step: "Check the tax and prove it back",
        detail:
          "Tax = $23,400 − $20,000 = $3,400, and 17% of $20,000 = $3,400 ✓. Proving it back on the NET figure is what catches the wrong-fraction error.",
      },
      {
        step: "Know where each amount belongs",
        detail:
          "Revenue is recorded NET at $20,000. The tax of $3,400 is a liability to the tax authority, not income. Receivables are recorded at the full $23,400, because that is what the customer owes.",
      },
    ],
    answer:
      "**B — $20,000.**\n\n\"Including sales tax\" means the $23,400 is **117%** of the net amount, so net = $23,400 × 100/117 = **$20,000** and tax = **$3,400**.\n\nProve it back on the net figure: 17% × $20,000 = $3,400 ✓. That check is what exposes option A, $19,422, which comes from taking 17% of the gross figure — the single most common error in the topic.\n\nWhere each amount goes matters as much as the arithmetic:\n\nDebit receivables **$23,400** (what the customer owes)\nCredit revenue **$20,000** (net — the business never earned the tax)\nCredit sales tax control **$3,400** (a liability to the tax authority)\n\nA registered business is a collector, not a bearer, of the tax, which is why it appears nowhere in profit.",
    earns: [
      "Reading \"including\" or \"excluding\" as the fact that determines the method",
      "Proving the tax back on the net figure",
    ],
    loses: ["Taking the tax rate as a percentage of the gross amount"],
  },

  "FA-09::discounts": {
    title: "Telling a trade discount from a settlement discount",
    format: "ot",
    marks: 2,
    requirement:
      "A business is offered a **trade** discount of 10% on a list price of $4,000, and a settlement discount of 2% for payment within 14 days. Assuming the settlement discount is not expected to be taken, the purchase is recorded at:\n\nA  $3,528\nB  $3,600\nC  $3,920\nD  $4,000",
    plan: [
      {
        step: "Separate the two discounts by when they are certain",
        detail:
          "A TRADE discount is a reduction in the price itself and is always deducted. A SETTLEMENT discount is conditional on paying early, so it depends on what the buyer is expected to do.",
      },
      {
        step: "Deduct the trade discount",
        detail:
          "$4,000 × 90% = **$3,600**. This is the actual price of the goods, and it is the figure recorded whatever happens about settlement.",
      },
      {
        step: "Apply the expectation test to the settlement discount",
        detail:
          "The stem says it is not expected to be taken, so no further deduction is made. Had it been expected, the purchase would be recorded net of it as well.",
      },
      {
        step: "Read the distractors as the wrong combinations",
        detail:
          "$3,528 deducts both discounts. $3,920 deducts only the settlement discount. $4,000 deducts neither. Each option is one specific misreading of which discounts apply.",
      },
    ],
    answer:
      "**B — $3,600.**\n\n$4,000 × 90% = **$3,600**. The **trade** discount reduces the price itself and is always deducted.\n\nThe **settlement** discount is conditional on early payment, so its treatment follows expectation: recorded net of it if it is expected to be taken, and at the full amount if not. Here it is not expected, so no further deduction is made.\n\nEvery distractor is a specific misreading: **$3,528** deducts both, **$3,920** deducts only the settlement discount, **$4,000** deducts neither.\n\nIf the buyer then pays early after all, the discount received is recorded when taken. The reason the two are treated differently is certainty — a trade discount is certain at the point of purchase, a settlement discount is not.",
    earns: [
      "Deducting the trade discount unconditionally and testing the settlement discount against expectation",
      "Explaining the difference as one of certainty",
    ],
    loses: ["Deducting both discounts automatically"],
  },

  /* ── FA-10 · Cash, the bank account and petty cash ───────────── */

  "FA-10::the-bank-account": {
    title: "What a credit balance on the bank account means",
    format: "ot",
    marks: 2,
    requirement:
      "The bank account in a company's general ledger shows a credit balance of $3,000. This means the company:\n\nA  Has $3,000 in the bank\nB  Is overdrawn by $3,000\nC  Has made an error, as bank cannot have a credit balance\nD  Is owed $3,000 by the bank",
    plan: [
      {
        step: "Recall which balance an asset carries",
        detail:
          "Assets carry debit balances. So a debit balance on bank means cash held; a credit balance means the reverse — the bank is owed money, which is an overdraft and a liability.",
      },
      {
        step: "Translate the balance into the relationship",
        detail:
          "A credit balance means the entity owes the bank $3,000. The account has flipped from asset to liability, and that is a perfectly normal position rather than an error.",
      },
      {
        step: "Reject the option claiming impossibility",
        detail:
          "C says a credit balance cannot arise. It arises whenever an account is overdrawn, so an option asserting impossibility is wrong on the facts.",
      },
      {
        step: "Note where the balance is presented",
        detail:
          "An overdraft is a current liability in the statement of financial position, not a negative asset. Presentation follows the substance of the balance.",
      },
    ],
    answer:
      "**B — is overdrawn by $3,000.**\n\nAssets carry **debit** balances, so a debit balance on bank means cash held. A **credit** balance means the entity owes the bank — an overdraft, which is a liability.\n\nOption C asserts this cannot happen, but it happens whenever an account is overdrawn, and options claiming impossibility are wrong on the facts.\n\nThe presentation follows the substance: an overdraft is shown as a **current liability**, not as a negative asset. And bear in mind the bank's own statement shows the mirror image — the bank's records are kept from its side, which is one of the reasons the two never agree without a reconciliation.",
    earns: ["Reading the balance's side to determine whether it is an asset or a liability"],
    loses: ["Assuming a bank balance must be an asset, so a credit balance must be an error"],
  },

  "FA-10::petty-cash": {
    title: "Restoring an imprest",
    format: "ot",
    marks: 2,
    requirement:
      "A petty cash imprest is $250. At the month end, vouchers total $186 and cash in the tin is $64. The amount required to restore the imprest is:\n\nA  $64\nB  $186\nC  $250\nD  $314",
    plan: [
      {
        step: "Understand what the imprest system fixes",
        detail:
          "The float is restored to the same amount every period. So the reimbursement always equals what was SPENT, which restores the tin to its fixed level.",
      },
      {
        step: "Check the tin proves itself before computing",
        detail:
          "Vouchers $186 + cash $64 = $250, which equals the imprest ✓. That check is the control the system exists for — a shortfall would indicate missing cash or a missing voucher.",
      },
      {
        step: "Reimburse the amount spent",
        detail:
          "$186 restores the tin from $64 back to $250. The answer is always the total of the vouchers, which is why the check in the previous step also confirms the answer.",
      },
      {
        step: "Read the distractors",
        detail:
          "$64 is the cash remaining, $250 is the imprest itself, and $314 is imprest plus cash. Only $186 restores the float to its fixed level.",
      },
    ],
    answer:
      "**B — $186.**\n\nUnder the **imprest** system the float is restored to the same fixed amount each period, so the reimbursement equals what was spent: $186 takes the tin from $64 back to $250.\n\nThe self-check comes first and confirms the answer at the same time: vouchers $186 + cash $64 = $250 = the imprest ✓. If the two did not sum to the imprest, cash or a voucher would be missing — and that is precisely the control the system provides.\n\nThe entries are debit the individual expenses $186, credit bank $186.\n\nThe reason the imprest system is preferred to simply topping up ad hoc is that it forces the reconciliation every period, and the amount at risk is capped at the float.",
    earns: [
      "Proving vouchers plus cash equals the imprest before answering",
      "Naming the built-in control as the reason for the system",
    ],
    loses: ["Reimbursing the cash remaining or the imprest total"],
  },

  "FA-10::cash-equivalents-and-controls": {
    title: "What qualifies as a cash equivalent",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would be classified as a **cash equivalent**?\n\nA  A three-month treasury bill acquired one month before maturity\nB  A five-year government bond acquired three years ago\nC  Equity shares held as a short-term investment\nD  A trade receivable due in 30 days",
    plan: [
      {
        step: "State the definition's two tests",
        detail:
          "Short-term, highly liquid investments readily convertible to known amounts of cash, and subject to insignificant risk of changes in value. Both tests must be met.",
      },
      {
        step: "Apply the maturity convention",
        detail:
          "The usual benchmark is three months or less from the DATE OF ACQUISITION. A bill acquired one month before maturity meets it; the original term is irrelevant.",
      },
      {
        step: "Reject the investment whose value can move",
        detail:
          "Equity shares fail the second test outright — their value fluctuates, so the amount of cash they convert to is not known. Being easy to sell is not the same as being a cash equivalent.",
      },
      {
        step: "Reject the receivable",
        detail:
          "A trade receivable is not an investment at all. It is an operating asset arising from a sale, and it is classified as a receivable however soon it falls due.",
      },
    ],
    answer:
      "**A — a three-month treasury bill acquired one month before maturity.**\n\nCash equivalents are short-term, highly liquid investments **readily convertible to known amounts of cash** and subject to **insignificant risk of changes in value**. Both tests must be satisfied.\n\nThe maturity test runs from the date of **acquisition**, with three months or less the usual benchmark. A bill acquired one month before maturity qualifies; the bond acquired three years ago does not, even though only two years remain, because the test is applied when it was bought.\n\n**Equity shares** fail the second test — their value fluctuates, so the cash they convert to is not a known amount. Liquidity alone is not enough.\n\nA **trade receivable** is an operating asset, not an investment, whatever its due date.",
    earns: [
      "Applying the maturity test from the date of acquisition",
      "Rejecting shares on value risk rather than on liquidity",
    ],
    loses: ["Treating any easily-sold investment as a cash equivalent"],
  },

  /* ── FA-11 · Inventory ───────────────────────────────────────── */

  "FA-11::why-adjust": {
    title: "Why closing inventory has to be adjusted for",
    format: "ot",
    marks: 2,
    requirement:
      "The adjustment for closing inventory is required in order to:\n\nA  Value the business accurately\nB  Match the cost of goods sold against the revenue earned from selling them\nC  Comply with the prudence concept only\nD  Reduce the entity's tax liability",
    plan: [
      {
        step: "Identify the mismatch the adjustment corrects",
        detail:
          "Purchases records everything bought in the period. Some of it is still unsold at the year end, so charging all purchases against this year's revenue would overstate cost of sales.",
      },
      {
        step: "Name the concept doing the work",
        detail:
          "Accruals, or matching: cost is recognised in the period in which the related revenue is recognised. Unsold goods are carried forward as an asset until they are sold.",
      },
      {
        step: "Confirm the two-sided effect",
        detail:
          "Closing inventory reduces cost of sales and appears as a current asset. The same figure carries forward as opening inventory next year and increases cost of sales then.",
      },
      {
        step: "Reject the three that describe side effects",
        detail:
          "Prudence governs the lower-of rule rather than the adjustment itself. Valuing the business is not what the statements do. And tax follows the accounts rather than the accounts following tax.",
      },
    ],
    answer:
      "**B — match the cost of goods sold against the revenue earned from selling them.**\n\nPurchases records everything bought in the period, but some is still unsold at the year end. Charging all of it against this year's revenue would overstate cost of sales, so the unsold portion is carried forward.\n\nThe concept is **accruals**, or matching: cost is recognised in the period the related revenue is recognised.\n\nThe effect is two-sided — closing inventory **reduces cost of sales** and appears as a **current asset** — and it reverses next year, when the same figure becomes opening inventory and increases cost of sales.\n\nProviding for damaged or obsolete inventory is where **prudence** operates, through the lower of cost and net realisable value rule; it governs the measurement, not the need for the adjustment.",
    earns: ["Naming accruals as the driver and prudence as governing measurement only"],
    loses: ["Answering prudence, which explains the lower-of rule rather than the adjustment"],
  },

  "FA-11::measurement": {
    title: "Applying the lower of cost and net realisable value",
    format: "ot",
    marks: 2,
    requirement:
      "Three inventory lines have the following cost and net realisable value: X cost $4,000, NRV $4,500; Y cost $3,000, NRV $2,200; Z cost $5,000, NRV $5,100. Total inventory should be measured at:\n\nA  $11,800\nB  $12,000\nC  $11,200\nD  $12,700",
    plan: [
      {
        step: "Apply the rule LINE BY LINE, not to the total",
        detail:
          "The comparison is made for each item separately. Comparing total cost with total NRV would let a profitable line hide a loss-making one, which is exactly what prudence forbids.",
      },
      {
        step: "Take the lower figure for each line",
        detail:
          "X: cost $4,000 is lower. Y: NRV $2,200 is lower. Z: cost $5,000 is lower. Only Y is written down.",
      },
      {
        step: "Add the three chosen figures",
        detail:
          "$4,000 + $2,200 + $5,000 = **$11,200**.",
      },
      {
        step: "Compute the aggregate answer to expose the trap",
        detail:
          "Total cost $12,000 against total NRV $11,800 would give $11,800, which is option A. That method understates the write-down by letting X and Z's headroom absorb Y's loss.",
      },
    ],
    answer:
      "**C — $11,200.**\n\nApply the lower of cost and NRV **line by line**:\n\nX: lower of $4,000 and $4,500 = $4,000\nY: lower of $3,000 and $2,200 = **$2,200** (written down $800)\nZ: lower of $5,000 and $5,100 = $5,000\n**Total $11,200**\n\nOption A, $11,800, comes from comparing total cost $12,000 with total NRV $11,800. That is the trap: aggregating lets the headroom on X and Z absorb the loss on Y, understating the write-down by $600 and recognising a profit on X and Z that has not yet been earned.\n\nOption B, $12,000, is cost throughout and ignores the rule entirely.\n\nNRV is estimated selling price less costs to complete and costs to sell — so selling costs must be deducted before the comparison is made.",
    earns: [
      "Applying the rule line by line and being able to say what aggregating would conceal",
      "Deducting selling costs when computing NRV",
    ],
    loses: ["Comparing totals, which is the offered $11,800"],
  },

  "FA-11::fifo-avco": {
    title: "Valuing closing inventory under AVCO",
    format: "ot",
    marks: 2,
    requirement:
      "Opening inventory is 200 units at $6. 300 units are purchased at $8. 350 units are sold. Using the weighted average cost method, closing inventory is:\n\nA  $1,080\nB  $1,200\nC  $1,050\nD  $900",
    plan: [
      {
        step: "Compute the weighted average before any issue",
        detail:
          "Total cost = (200 × $6) + (300 × $8) = $1,200 + $2,400 = $3,600 over 500 units = **$7.20 per unit**. The average is weighted by quantity, not a simple mean of $6 and $8.",
      },
      {
        step: "Establish the closing quantity",
        detail:
          "500 available less 350 sold = **150 units** remaining.",
      },
      {
        step: "Value the closing units at the average",
        detail:
          "150 × $7.20 = **$1,080**. Under AVCO both the issue and the closing balance carry the same rate.",
      },
      {
        step: "Compute the FIFO answer to identify the distractor",
        detail:
          "FIFO issues the oldest first, so the 150 remaining are all from the $8 purchase: 150 × $8 = $1,200, which is option B. It is the right answer to the other method.",
      },
    ],
    answer:
      "**A — $1,080.**\n\nWeighted average = [(200 × $6) + (300 × $8)] ÷ 500 = $3,600 ÷ 500 = **$7.20 per unit**.\nClosing quantity = 500 − 350 = **150 units**.\nClosing inventory = 150 × $7.20 = **$1,080**.\n\nThe average must be **weighted by quantity**. The simple mean of $6 and $8 is $7, which gives $1,050 — option C, and the reason that figure is in the list.\n\nOption B, $1,200, is the **FIFO** answer: oldest issued first, so the 150 units remaining all come from the $8 purchase.\n\nIn a period of rising prices FIFO gives the higher closing inventory and therefore the higher profit, with AVCO sitting between FIFO and the cost of the newest purchases. Whichever method is chosen must be applied **consistently**, and LIFO is not permitted.",
    earns: [
      "Weighting the average by quantity rather than taking a simple mean",
      "Recognising the FIFO figure among the options",
    ],
    loses: ["Averaging $6 and $8 unweighted, which produces the offered $1,050"],
  },

  /* ── FA-12 · Tangible non-current assets ─────────────────────── */

  "FA-12::capital-or-revenue": {
    title: "Deciding what forms part of an asset's cost",
    format: "ot",
    marks: 2,
    requirement:
      "A company buys a machine for $80,000, pays $3,000 delivery, $5,000 installation and testing, and $2,000 for a one-year maintenance contract. The amount capitalised is:\n\nA  $80,000\nB  $83,000\nC  $88,000\nD  $90,000",
    plan: [
      {
        step: "State the capitalisation test",
        detail:
          "Purchase price plus any cost directly attributable to bringing the asset to the location and condition necessary for it to operate as intended.",
      },
      {
        step: "Test each cost against \"necessary to bring it into use\"",
        detail:
          "Delivery gets it to the location — capitalise. Installation and testing get it into working condition — capitalise. Maintenance keeps it working once it is already in use — expense.",
      },
      {
        step: "Total the qualifying costs",
        detail:
          "$80,000 + $3,000 + $5,000 = **$88,000**. The $2,000 maintenance is charged to profit or loss, and being for one year would be a prepayment if paid in advance.",
      },
      {
        step: "Name the consequence of getting it wrong",
        detail:
          "Capitalising the maintenance would overstate assets and profit this year and overstate depreciation for the rest of the asset's life. The error persists rather than reversing next period.",
      },
    ],
    answer:
      "**C — $88,000.**\n\nCapitalise the purchase price plus every cost **directly attributable to bringing the asset to the location and condition necessary for it to operate as intended**:\n\nPurchase price $80,000\nDelivery $3,000 — gets it to the location\nInstallation and testing $5,000 — gets it into working condition\n**Capitalised $88,000**\n\nThe **$2,000 maintenance contract** is expensed: it keeps the asset working once it is already in use, which is a different thing from getting it into use. Paid in advance for a year, part of it would be a prepayment.\n\nThe consequence of capitalising it wrongly is worth knowing — assets and profit overstated this year, and depreciation overstated for the rest of the asset's life. The error does not reverse next period; it persists.",
    earns: [
      "Testing each cost against \"necessary to bring it into use\"",
      "Spotting that the maintenance contract may also involve a prepayment",
    ],
    loses: ["Capitalising the maintenance contract because it was paid at the same time"],
  },

  "FA-12::recording-and-register": {
    title: "What the asset register is for",
    format: "ot",
    marks: 2,
    requirement:
      "The asset register is reconciled to the general ledger. The primary purpose of this reconciliation is to:\n\nA  Calculate the depreciation charge\nB  Confirm that the assets recorded in the ledger physically exist and are completely recorded\nC  Determine the market value of the assets\nD  Comply with an accounting standard",
    plan: [
      {
        step: "Say what each record holds",
        detail:
          "The general ledger holds TOTALS for cost and accumulated depreciation by class. The asset register holds an entry for each INDIVIDUAL asset — description, location, cost, date, depreciation and carrying amount.",
      },
      {
        step: "Identify what comparing them tests",
        detail:
          "Two independent records of the same population. Agreement supports completeness and existence; disagreement means an asset is missing from one of them.",
      },
      {
        step: "Connect it to physical verification",
        detail:
          "The register enables an inspection of the assets themselves, since it says where each one is. Ledger totals alone cannot be physically verified — you cannot inspect a total.",
      },
      {
        step: "Reject the three that describe other things",
        detail:
          "Depreciation is calculated from the register's data but is not why the reconciliation is performed. Market value is not what either record holds. And no accounting standard mandates an asset register.",
      },
    ],
    answer:
      "**B — confirm that the assets recorded in the ledger physically exist and are completely recorded.**\n\nThe general ledger holds **totals** by class; the asset register holds an entry per **individual** asset with its description, location, cost, acquisition date, depreciation and carrying amount. Comparing two independent records of the same population tests **existence** and **completeness**, and a difference means an asset is missing from one of them.\n\nIt also makes physical verification possible, because the register says where each asset is. A ledger total cannot be inspected.\n\nDepreciation is calculated using the register's data but that is not why the reconciliation is done. Neither record holds market value, and no accounting standard requires a register — it is a control, kept because it is useful.",
    earns: ["Explaining that two independent records of one population is what makes the check work"],
    loses: ["Answering compliance, when the register is a control rather than a requirement"],
  },

  "FA-12::subsequent-expenditure": {
    title: "Capitalising or expensing spending on an asset in use",
    format: "ot",
    marks: 2,
    requirement:
      "A company spends $30,000 on a delivery vehicle. Which treatment is correct?\n\nA  Replacing the engine, extending the vehicle's useful life by three years — expense in full\nB  Adding a refrigeration unit, allowing the vehicle to carry chilled goods — capitalise\nC  Annual servicing and replacement of tyres — capitalise\nD  Repainting the vehicle in the company's livery — capitalise as an intangible asset",
    plan: [
      {
        step: "State the test for subsequent expenditure",
        detail:
          "Capitalise where it ENHANCES the asset — extends its useful life, increases its capacity, or improves the quality of its output. Expense where it merely MAINTAINS the asset's existing capability.",
      },
      {
        step: "Test each option against enhance-or-maintain",
        detail:
          "A refrigeration unit lets the vehicle do something it could not do before — enhancement. Servicing and tyres maintain existing capability — expense. Repainting maintains appearance — expense, and certainly not an intangible.",
      },
      {
        step: "Notice option A is correctly described and wrongly treated",
        detail:
          "Extending the useful life by three years IS enhancement, so it should be capitalised. The option pairs the right facts with the wrong treatment, which is a common construction.",
      },
      {
        step: "Read the treatment as well as the transaction",
        detail:
          "Every option here names a transaction AND a treatment, so both halves must be checked. An option can describe a genuine enhancement and still be wrong because it prescribes the wrong entry.",
      },
    ],
    answer:
      "**B — adding a refrigeration unit, allowing the vehicle to carry chilled goods — capitalise.**\n\nSubsequent expenditure is **capitalised** where it enhances the asset — extending useful life, increasing capacity, or improving output quality — and **expensed** where it merely maintains existing capability.\n\nA refrigeration unit lets the vehicle do something it previously could not, so it is an enhancement.\n\nOption A is the instructive distractor: extending the useful life by three years **is** enhancement and should be capitalised, so the option pairs correct facts with the wrong treatment. Each option here names a transaction and a treatment, and both halves have to be checked.\n\nServicing and tyres maintain existing capability. Repainting maintains appearance and creates no intangible asset — livery is not a separable resource.",
    earns: [
      "Applying enhance-versus-maintain, and checking the prescribed treatment as well as the facts",
      "Recognising that a life extension qualifies as enhancement",
    ],
    loses: ["Selecting an option whose facts are right but whose treatment is wrong"],
  },

  /* ── FA-13 · Depreciation ────────────────────────────────────── */

  "FA-13::purpose": {
    title: "What depreciation is, and what it is not",
    format: "ot",
    marks: 2,
    requirement:
      "Depreciation is best described as:\n\nA  A provision of cash to replace the asset when it wears out\nB  The systematic allocation of an asset's depreciable amount over its useful life\nC  The fall in the asset's market value during the period\nD  An estimate of the asset's remaining value",
    plan: [
      {
        step: "State the definition precisely",
        detail:
          "The systematic allocation of the depreciable amount of an asset over its useful life. It is an ALLOCATION of cost, not a measurement of anything external.",
      },
      {
        step: "Kill the cash misconception",
        detail:
          "Depreciation is a book entry and moves no money. Nothing is set aside, and the entity may have no cash at all to replace the asset. Option A is the most persistent misconception in FA.",
      },
      {
        step: "Kill the valuation misconception",
        detail:
          "Depreciation does not track market value. A property might rise in value and still be depreciated, because the charge allocates cost over the period of use rather than measuring worth.",
      },
      {
        step: "Name the concept it serves",
        detail:
          "Accruals. The asset earns revenue over several years, so its cost is spread across those years rather than charged entirely to the year of purchase.",
      },
    ],
    answer:
      "**B — the systematic allocation of an asset's depreciable amount over its useful life.**\n\nDepreciation is an **allocation of cost**, serving the accruals concept: the asset earns revenue over several years, so its cost is spread across those years rather than charged wholly to the year of purchase.\n\nOption A is the most persistent misconception in FA. Depreciation is a book entry and moves no cash — nothing is set aside, and the entity may have nothing available to replace the asset when it wears out.\n\nOption C is the second. Depreciation does not track market value: a property may rise in value and still be depreciated, because the charge reflects the consumption of the asset's benefit rather than its worth.\n\nDepreciable amount is cost less residual value, and the charge begins when the asset is available for use.",
    earns: ["Rejecting both the cash and the valuation misconceptions explicitly"],
    loses: ["Choosing the cash provision answer, which is what the word suggests in ordinary use"],
  },

  "FA-13::computing": {
    title: "Computing a reducing balance charge",
    format: "ot",
    marks: 2,
    requirement:
      "An asset costing $50,000 is depreciated at 20% per year on the **reducing balance** basis. The charge for the third year is:\n\nA  $10,000\nB  $8,000\nC  $6,400\nD  $5,120",
    plan: [
      {
        step: "Confirm which method the stem specifies",
        detail:
          "Reducing balance, so the charge is a percentage of the CARRYING AMOUNT and falls each year. Straight line would give the same charge every year, and $10,000 is that answer.",
      },
      {
        step: "Work the carrying amount forward year by year",
        detail:
          "Year 1: 20% × $50,000 = $10,000, carrying amount $40,000. Year 2: 20% × $40,000 = $8,000, carrying amount $32,000. Never jump to year 3 directly.",
      },
      {
        step: "Take the third year's charge",
        detail:
          "Year 3: 20% × $32,000 = **$6,400**, leaving a carrying amount of $25,600.",
      },
      {
        step: "Read the distractors as the wrong years",
        detail:
          "$10,000 is year 1 (and the straight line charge). $8,000 is year 2. $5,120 is year 4. Every option is a real charge from a different year, which is why working the table matters.",
      },
    ],
    answer:
      "**C — $6,400.**\n\nYear 1: 20% × $50,000 = $10,000 → carrying amount $40,000\nYear 2: 20% × $40,000 = $8,000 → carrying amount $32,000\n**Year 3: 20% × $32,000 = $6,400** → carrying amount $25,600\n\nEvery distractor is a genuine charge from a different year: $10,000 is year 1 — which is also the straight line charge, offered for anyone who missed the method — $8,000 is year 2, and $5,120 is year 4.\n\nReducing balance charges more in the early years, which suits assets that lose most benefit early or need rising maintenance later, such as vehicles. Straight line suits assets consumed evenly, such as buildings and fixtures.\n\nNote that residual value is **not** deducted before applying the percentage under reducing balance, whereas it is under straight line.",
    earns: [
      "Working the carrying amount forward year by year rather than jumping to the year asked for",
      "Knowing residual value is not deducted first under reducing balance",
    ],
    loses: ["Reporting the wrong year's charge, since every option is one of them"],
  },

  "FA-13::changes-in-estimate": {
    title: "Revising a useful life part-way through an asset's life",
    format: "ot",
    marks: 2,
    requirement:
      "An asset cost $60,000 with a ten-year life and no residual value. After four years the remaining useful life is revised to three years. The charge for year five is:\n\nA  $6,000\nB  $12,000\nC  $20,000\nD  $8,571",
    plan: [
      {
        step: "Establish the carrying amount at the date of revision",
        detail:
          "Four years at $6,000 = $24,000 depreciation, so carrying amount = $60,000 − $24,000 = **$36,000**. The revision applies to what is left, not to the original cost.",
      },
      {
        step: "Spread that carrying amount over the REVISED remaining life",
        detail:
          "$36,000 ÷ 3 remaining years = **$12,000 per year**.",
      },
      {
        step: "Confirm no prior-year adjustment is made",
        detail:
          "A change in an accounting ESTIMATE is applied prospectively. Earlier years are not restated, because the earlier charges were the best estimate on the information then available.",
      },
      {
        step: "Read the distractors",
        detail:
          "$6,000 is the original charge, unrevised. $20,000 is $60,000 ÷ 3, applying the new life to the original cost. $8,571 is $60,000 ÷ 7, using a revised total life instead of the remaining one.",
      },
    ],
    answer:
      "**B — $12,000.**\n\nCarrying amount at the date of revision = $60,000 − (4 × $6,000) = **$36,000**.\nRevised charge = $36,000 ÷ 3 remaining years = **$12,000 per year**.\n\nEach distractor is a specific error: **$6,000** ignores the revision, **$20,000** applies the new life to the original cost, **$8,571** divides cost by a revised total life rather than spreading the carrying amount over the remaining one.\n\nThe principle is that a change in an accounting **estimate** — useful life, residual value, depreciation method — is applied **prospectively**. Earlier years are not restated, because the earlier charges were the best estimate on the information then available, and revising them would suggest an error where there was none.\n\nA change in accounting **policy** is different: that requires retrospective restatement.",
    earns: [
      "Spreading the carrying amount over the remaining life, not cost over a new life",
      "Distinguishing a change in estimate (prospective) from a change in policy (retrospective)",
    ],
    loses: ["Applying the revised life to the original cost, which is the offered $20,000"],
  },

  "FA-13::depreciating-a-class": {
    title: "Depreciating a class with additions and disposals in the year",
    format: "ot",
    marks: 2,
    requirement:
      "A class of plant had a cost of $200,000 at the start of the year. An addition of $60,000 was made on 1 July and an asset costing $40,000 was disposed of on 30 September. Depreciation is 10% per year on cost, charged **pro rata** in the year of acquisition and disposal. The year ends 31 December. The charge for the year is:\n\nA  $20,000\nB  $22,000\nC  $23,000\nD  $26,000",
    plan: [
      {
        step: "Split the class into three populations before computing",
        detail:
          "Assets held all year, the addition held part of the year, and the disposal held part of the year. Treating the class as one figure is what makes this question hard when it need not be.",
      },
      {
        step: "Charge the assets held throughout",
        detail:
          "$200,000 less the $40,000 disposed = $160,000 held all year × 10% = $16,000.",
      },
      {
        step: "Charge the addition and the disposal for their own periods",
        detail:
          "Addition: $60,000 × 10% × 6/12 (1 July to 31 December) = $3,000. Disposal: $40,000 × 10% × 9/12 (1 January to 30 September) = $3,000.",
      },
      {
        step: "Total and check the pro rata months",
        detail:
          "$16,000 + $3,000 + $3,000 = **$22,000**. Miscounting the months is the usual error — the addition is owned for 6 months and the disposal for 9.",
      },
    ],
    answer:
      "**B — $22,000.**\n\nSplit the class into three populations:\n\nHeld all year: ($200,000 − $40,000) × 10% = **$16,000**\nAddition, 1 July to 31 December: $60,000 × 10% × 6/12 = **$3,000**\nDisposal, 1 January to 30 September: $40,000 × 10% × 9/12 = **$3,000**\n**Total charge $22,000**\n\nOption A, $20,000, charges 10% on the opening $200,000 and ignores both movements. Option D charges a full year on everything.\n\nThe part that goes wrong is the month count: the addition is owned for **6** months and the disposal for **9**. Writing the dates beside each figure before multiplying is what prevents it.\n\nWhere the policy instead charges a **full year** in the year of acquisition and **none** in the year of disposal, the answer changes to $160,000 × 10% + $60,000 × 10% = $22,000 — the same here by coincidence, which is why the policy must be read rather than assumed.",
    earns: [
      "Splitting the class into assets held all year, additions and disposals",
      "Reading the depreciation policy rather than assuming pro rata",
    ],
    loses: ["Charging a full year on the addition and nothing on the disposal without checking the policy"],
  },

  /* ── FA-14 · Disposals, part-exchange and revaluation ────────── */

  "FA-14::disposals": {
    title: "Computing the profit or loss on disposal",
    format: "ot",
    marks: 2,
    requirement:
      "An asset costing $25,000 with accumulated depreciation of $18,000 is sold for $9,000. The result on disposal is:\n\nA  A profit of $2,000\nB  A loss of $2,000\nC  A profit of $9,000\nD  A loss of $16,000",
    plan: [
      {
        step: "Find the carrying amount first",
        detail:
          "Cost $25,000 − accumulated depreciation $18,000 = **$7,000**. Every disposal question starts here, and skipping it is what produces the wildly wrong options.",
      },
      {
        step: "Compare proceeds with carrying amount",
        detail:
          "$9,000 proceeds against $7,000 carrying amount = **$2,000 profit**. Proceeds above carrying amount is a profit; below is a loss.",
      },
      {
        step: "Interpret what the profit actually means",
        detail:
          "It is not a trading profit — it means depreciation charged over the asset's life was more than the loss in value actually turned out to be. It is a correction of estimate, appearing in profit or loss.",
      },
      {
        step: "Read the distractors",
        detail:
          "$9,000 profit treats the whole proceeds as profit. $16,000 loss compares proceeds with cost rather than carrying amount. Both come from omitting the accumulated depreciation.",
      },
    ],
    answer:
      "**A — a profit of $2,000.**\n\nCarrying amount = $25,000 − $18,000 = **$7,000**. Proceeds $9,000 exceed it by **$2,000**, so a profit on disposal.\n\nThe mechanics run through a disposal account: debit disposals with cost $25,000, credit disposals with accumulated depreciation $18,000 and with proceeds $9,000, leaving a $2,000 credit balance transferred to profit or loss.\n\nWhat the profit **means** is worth stating: it is not a trading profit but a signal that depreciation charged over the asset's life exceeded the value actually lost. It is a correction of an estimate, which is why a large profit on disposal invites a review of the depreciation policy.\n\nOptions C and D both come from omitting accumulated depreciation — one treating all proceeds as profit, the other comparing proceeds with cost.",
    earns: [
      "Computing the carrying amount before anything else",
      "Explaining a disposal profit as a correction of estimate rather than a trading gain",
    ],
    loses: ["Comparing proceeds with cost instead of carrying amount"],
  },

  "FA-14::part-exchange": {
    title: "Handling a part-exchange allowance",
    format: "ot",
    marks: 2,
    requirement:
      "An old vehicle with a carrying amount of $4,000 is part-exchanged for a new one. The dealer allows $5,500 against a list price of $22,000, and the balance is paid in cash. The cost of the new vehicle to be capitalised is:\n\nA  $16,500\nB  $20,500\nC  $22,000\nD  $26,000",
    plan: [
      {
        step: "Separate the two transactions the deal contains",
        detail:
          "A DISPOSAL of the old asset, with the part-exchange allowance acting as proceeds, and an ACQUISITION of the new one at its full cost. One deal, two transactions.",
      },
      {
        step: "Capitalise the new asset at its full cost",
        detail:
          "The new vehicle cost **$22,000** — that is what was given for it, made up of the $5,500 allowance and $16,500 cash. The allowance is consideration, not a discount.",
      },
      {
        step: "Deal with the old asset separately",
        detail:
          "Proceeds $5,500 against carrying amount $4,000 = **$1,500 profit on disposal**, recognised in profit or loss.",
      },
      {
        step: "Reject the netted answer",
        detail:
          "Option A, $16,500, capitalises only the cash paid. That understates the asset, understates future depreciation, and never recognises the $1,500 profit — one error producing three consequences.",
      },
    ],
    answer:
      "**C — $22,000.**\n\nA part-exchange is **two transactions in one deal**: the disposal of the old asset, with the allowance acting as proceeds, and the acquisition of the new one at its full cost.\n\nThe new vehicle is capitalised at **$22,000**, being the $5,500 allowance plus $16,500 cash. The allowance is consideration given, not a discount on the price.\n\nSeparately, the old vehicle: proceeds $5,500 against carrying amount $4,000 = **$1,500 profit on disposal**.\n\nOption A, $16,500, capitalises only the cash. That single error understates the asset, understates depreciation for the whole of its life, and loses the $1,500 profit — which is why netting the two transactions is the mistake the question exists to catch.",
    earns: [
      "Treating the deal as two transactions and capitalising the full cost",
      "Recognising the disposal profit separately",
    ],
    loses: ["Capitalising only the cash paid, which produces three errors from one"],
  },

  "FA-14::revaluation": {
    title: "Recording a revaluation and the depreciation that follows",
    format: "ot",
    marks: 2,
    requirement:
      "A building with a carrying amount of $300,000 is revalued to $450,000. The revaluation is recorded as:\n\nA  Credit profit or loss $150,000\nB  Credit revaluation surplus $150,000, within other comprehensive income\nC  Credit retained earnings $150,000\nD  Debit revaluation surplus $150,000",
    plan: [
      {
        step: "Identify the gain and its direction",
        detail:
          "The carrying amount rises by $150,000, so the asset is debited and something must be credited. The question is which reserve.",
      },
      {
        step: "Route the gain away from profit or loss",
        detail:
          "An upward revaluation gain goes to a **revaluation surplus** through other comprehensive income, not through profit or loss — because it is unrealised. The asset has not been sold.",
      },
      {
        step: "Reject the retained earnings route",
        detail:
          "Retained earnings holds realised profits available for distribution. An unrealised gain must not be routed there, or it could be paid out as a dividend on a profit that does not exist in cash.",
      },
      {
        step: "Note the consequence for future depreciation",
        detail:
          "Depreciation is charged on the REVALUED amount, so the annual charge rises. The excess over the old charge may be transferred from the revaluation surplus to retained earnings as it is realised through use.",
      },
    ],
    answer:
      "**B — credit revaluation surplus $150,000, within other comprehensive income.**\n\nThe entries are debit the asset $150,000, credit revaluation surplus $150,000, presented in **other comprehensive income** rather than profit or loss — because the gain is **unrealised**. The asset has not been sold and no cash has arisen.\n\nOption C is the dangerous one. Retained earnings holds **realised** profits available for distribution, and routing an unrealised gain there would allow a dividend to be paid on a profit that exists only as a valuation.\n\nDepreciation then follows the **revalued** amount, so the annual charge rises. The **excess depreciation** — the difference between the new charge and what the old carrying amount would have produced — may be transferred from the revaluation surplus to retained earnings, recognising the gain as it is realised through use.\n\nA downward revaluation reverses any surplus on that asset first, and only the balance goes to profit or loss.",
    earns: [
      "Routing an unrealised gain to other comprehensive income and saying why",
      "Knowing depreciation follows the revalued amount and the excess may be transferred",
    ],
    loses: ["Crediting retained earnings, which would make an unrealised gain distributable"],
  },
}
