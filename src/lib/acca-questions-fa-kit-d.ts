import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fa-kit-builders"

/*
 * FA · Area D question kit — chapters 9 to 19.
 *
 * Area D is where FA becomes computational, so numeric entry carries most of the
 * weight here: a depreciation charge, an unrealised profit or an allowance movement
 * offered as four options can be reverse-engineered from the options, and the real
 * CBE tests these skills by number entry.
 *
 * Original Scholify content. No ACCA, Kaplan or BPP question is reproduced.
 */

/* ── Chapter 9 · Sales, purchases, sales tax and discounts ── */

const CH09: AccaQuestion[] = [
  num("FAK-09-01", "FA-09", "D", "easy",
    "A business makes a cash sale of $3,450 including sales tax at 15%. What is the revenue recognised, in $?",
    3000, "$", 1,
    "The figure is GROSS, so the tax is extracted: $3,450 × 15/115 = $450, leaving revenue of $3,000. Check forwards: $3,000 × 1.15 = $3,450. Applying 15% to the gross figure would give $517.50 of tax and understate revenue."),

  num("FAK-09-02", "FA-09", "D", "medium",
    "A credit sale is made for $7,200 excluding sales tax at 20%. What amount is debited to trade receivables, in $?",
    8640, "$", 1,
    "Receivables carry the GROSS amount — what the customer actually owes: $7,200 × 1.20 = $8,640. Revenue is credited with the net $7,200 and the sales tax account with $1,440. Recording receivables net of tax understates the asset by the tax."),

  q("FAK-09-03", "FA-09", "D", "medium",
    "Which statement about sales tax is correct for a registered business?",
    [
      "Output tax collected is income of the business",
      "The business is a collector, so the tax affects neither revenue nor expenses",
      "Input tax paid is always an expense of the period",
      "Sales tax is added to revenue and deducted from purchases",
    ],
    1,
    "A registered business COLLECTS output tax and RECLAIMS input tax, paying the difference over. The tax passes through without affecting profit. The exception the exam sets is IRRECOVERABLE input tax, which becomes part of the cost of the item purchased."),

  num("FAK-09-04", "FA-09", "D", "hard",
    "In a quarter a business had credit sales of $92,000 excluding tax, cash sales of $27,600 including tax, and credit purchases of $54,000 excluding tax. Sales tax is 20% and all input tax is recoverable. What is the net amount payable to the tax authority for the quarter, in $?",
    12200, "$", 1,
    "Output tax: $92,000 × 20% = $18,400 on the net credit sales, plus $27,600 × 20/120 = $4,600 extracted from the gross cash sales, giving $23,000. Input tax: $54,000 × 20% = $10,800. Payable = $23,000 − $10,800 = $12,200. The discipline is to MULTIPLY on a net figure and EXTRACT from a gross one."),

  q("FAK-09-05", "FA-09", "D", "medium",
    "How is a settlement discount received from a supplier recorded?",
    [
      "As a reduction of purchases",
      "As discounts received, an item of income",
      "As a reduction of the bank payment with no other entry",
      "As discounts allowed, an expense",
    ],
    1,
    "Debit payables with the full invoice amount, credit bank with the amount paid and credit DISCOUNTS RECEIVED — income — with the difference. \"Discounts allowed\" is what the business gives its own customers and sits on the opposite side of the trade."),

  q("FAK-09-06", "FA-09", "D", "medium",
    "In what order are trade discount, an expected settlement discount and sales tax applied to an invoice?",
    [
      "Sales tax, then trade discount, then settlement discount",
      "Trade discount, then settlement discount, then sales tax",
      "Settlement discount, then sales tax, then trade discount",
      "Trade discount, then sales tax, then settlement discount",
    ],
    1,
    "TRADE discount first, establishing the invoice value of the goods; then any settlement discount EXPECTED to be taken, which measures revenue at the amount expected to be received; then SALES TAX on the resulting figure. Applying tax before the discounts overstates all three figures."),

  num("FAK-09-07", "FA-09", "D", "hard",
    "Goods with a list price of $10,000 are sold with a 20% trade discount and a 5% settlement discount the seller expects the customer to take. Sales tax at 20% is charged on the amount after both discounts. What revenue is recognised, in $?",
    7600, "$", 1,
    "List $10,000 less 20% trade = $8,000; less 5% expected settlement discount = $7,600, which is the revenue measured at the amount expected to be received. Sales tax of $1,520 is then charged and receivables are debited with $9,120."),

  q("FAK-09-08", "FA-09", "D", "easy",
    "Which of these belongs in cost of sales rather than in distribution costs?",
    ["Carriage outwards", "Carriage inwards", "Delivery vehicle depreciation", "Sales commission"],
    1,
    "CARRIAGE INWARDS is the cost of bringing purchased goods in, so it is part of cost of sales. Carriage OUTWARDS, delivery vehicle costs and sales commission are all costs of getting goods to customers — distribution costs."),

  q("FAK-09-09", "FA-09", "D", "medium",
    "How are sales returns recorded?",
    [
      "Credited directly to revenue, with no separate account",
      "Debited to a sales returns account and credited to trade receivables",
      "Debited to purchases returns and credited to payables",
      "Credited to trade receivables only",
    ],
    1,
    "Debit SALES RETURNS and credit TRADE RECEIVABLES. The returns figure is deducted in presenting revenue, but it is recorded in its own account so the business can see whether returns are rising — which netting them off invisibly would hide."),

  num("FAK-09-10", "FA-09", "D", "medium",
    "Opening inventory was $46,000, purchases $318,000, purchase returns $12,000, carriage inwards $9,000 and closing inventory $53,000. What is cost of sales, in $?",
    308000, "$", 1,
    "$46,000 + ($318,000 − $12,000) + $9,000 − $53,000 = $308,000. Purchase returns are deducted from purchases and carriage INWARDS is added — carriage outwards would not belong here at all."),
]

/* ── Chapter 10 · Cash, bank and petty cash ── */

const CH10: AccaQuestion[] = [
  q("FAK-10-01", "FA-10", "D", "easy",
    "At the year end the bank general ledger account has a credit balance of $9,200. How is this presented?",
    [
      "As a negative current asset",
      "As a bank overdraft within current liabilities",
      "As a non-current liability",
      "Netted against cash in hand",
    ],
    1,
    "A credit balance means the business owes the bank, so it is a BANK OVERDRAFT within current liabilities — repayable on demand. It is not a negative asset, and the offsetting principle prevents netting it against cash in hand."),

  num("FAK-10-02", "FA-10", "D", "medium",
    "A business runs a petty cash imprest of $500. At the period end the tin holds $118 and vouchers total $382. What reimbursement is required, in $?",
    382, "$", 1,
    "Reimbursement restores the float: imprest $500 − cash held $118 = $382, which here equals the voucher total exactly, so the float reconciles. The identity to test is always cash held plus vouchers equals the imprest: $118 + $382 = $500."),

  num("FAK-10-03", "FA-10", "D", "hard",
    "A petty cash imprest is $350. At the period end vouchers total $268 and the tin contains $75. What is the unexplained shortfall, in $?",
    7, "$", 0,
    "Cash held $75 + vouchers $268 = $343 against an imprest of $350, so $7 is unaccounted for and must be investigated. The reimbursement itself would be $350 − $75 = $275, which exceeds the vouchers by exactly that $7 — which is how the imprest system surfaces the discrepancy."),

  q("FAK-10-04", "FA-10", "D", "medium",
    "Why does a business keep a separate record of petty cash?",
    [
      "Because petty cash payments do not require double entry",
      "Because the payments are numerous and individually small, and would obscure the bank account",
      "Because petty cash is not part of the business's assets",
      "Because tax authorities require a separate cash ledger",
    ],
    1,
    "The payments are NUMEROUS AND SMALL, so processing each through the bank would cost more than the items are worth and would clutter the bank account. Petty cash is still an asset and still fully double-entered."),

  multi("FAK-10-05", "FA-10", "D", "medium",
    "Which TWO are controls over petty cash?",
    [
      "An approved voucher for every payment",
      "Allowing the custodian to set the imprest amount",
      "Regular independent counts of the float",
      "Recording petty cash only at the year end",
    ],
    [0, 2],
    "An APPROVED VOUCHER for every payment and REGULAR INDEPENDENT COUNTS are both standard controls, along with a fixed imprest, a per-payment limit and segregation of duties. Letting the custodian set the float, or recording only annually, removes control rather than adding it."),

  q("FAK-10-06", "FA-10", "D", "medium",
    "Which of these does NOT debit the bank account?",
    [
      "Capital introduced by the owner",
      "A payment to a supplier",
      "Proceeds from selling a non-current asset",
      "A loan received",
    ],
    1,
    "A PAYMENT TO A SUPPLIER is money out, so it CREDITS the bank. Capital introduced, asset disposal proceeds and a loan received are all money in and all debit the bank — and note that none of the three is income."),

  q("FAK-10-07", "FA-10", "D", "hard",
    "Under an imprest system, what does it mean if cash held plus vouchers EXCEEDS the imprest?",
    [
      "The float has been over-reimbursed or a receipt has been put in the tin, and it must be investigated",
      "Nothing — a surplus is always acceptable",
      "The vouchers should be destroyed to restore the balance",
      "The imprest amount must be permanently increased",
    ],
    0,
    "A surplus is a discrepancy just as a shortfall is: the float has been OVER-REIMBURSED or money that does not belong there has been put in the tin. Either way it is investigated and reported — the point of a fixed imprest is that any difference in either direction is visible."),

  q("FAK-10-08", "FA-10", "D", "easy",
    "A cash purchase of stationery for $64 is first recorded in which book?",
    ["Purchases day book", "Cash book", "Journal", "Sales day book"],
    1,
    "The CASH BOOK, because it was paid at once and no payable was created. The purchases day book records CREDIT purchases only. If it were paid from the tin rather than the bank it would go in the petty cash book."),

  q("FAK-10-09", "FA-10", "D", "medium",
    "Why do the bank general ledger account and the bank statement legitimately differ?",
    [
      "Because one is prepared on the accruals basis and the other on the cash basis",
      "Because the business records what it has processed and the bank records what it has processed, and the two are not simultaneous",
      "Because the bank statement excludes all payments",
      "Because the ledger includes petty cash and the statement does not",
    ],
    1,
    "They record the same cash from two sides at different moments — an unpresented cheque is recorded by the business and not yet by the bank. The reconciliation in Area E establishes which of the two is right about each individual difference."),

  num("FAK-10-10", "FA-10", "D", "medium",
    "The petty cash imprest is $400. During the month vouchers of $263 were approved and the float was reimbursed to the imprest at the month end with no discrepancy. What was in the tin immediately before reimbursement, in $?",
    137, "$", 1,
    "With no discrepancy, cash held + vouchers = imprest, so cash held = $400 − $263 = $137. The reimbursement of $263 then restores the float to $400 — which is why the reimbursement equals the voucher total whenever the float reconciles."),
]

/* ── Chapter 11 · Inventory ── */

const CH11: AccaQuestion[] = [
  num("FAK-11-01", "FA-11", "D", "medium",
    "Inventory cost $14,600. It can be sold for $16,000 but only after rectification costing $2,400 and selling costs of $500. At what amount is it carried, in $?",
    13100, "$", 1,
    "NRV = $16,000 − $2,400 − $500 = $13,100, below cost of $14,600, so inventory is carried at $13,100 and a $1,500 write-down is charged. ALL costs still to be incurred are deducted — omitting the selling costs would give $13,600 and understate the write-down."),

  num("FAK-11-02", "FA-11", "D", "hard",
    "A business holds three lines. A: cost $9,000, NRV $11,000. B: cost $6,400, NRV $4,900. C: cost $3,200, NRV $3,700. At what total amount is inventory carried, in $?",
    17100, "$", 1,
    "Item by item: A at cost $9,000, B at NRV $4,900, C at cost $3,200 = $17,100. Comparing TOTALS — cost $18,600 against NRV $19,600 — would carry inventory at $18,600 and let A and C's surpluses mask B's $1,500 shortfall."),

  q("FAK-11-03", "FA-11", "D", "medium",
    "Closing inventory has been overstated by $8,000. What is the effect on the financial statements?",
    [
      "Profit understated $8,000; net assets understated $8,000",
      "Profit overstated $8,000; net assets overstated $8,000",
      "Profit overstated $8,000; net assets understated $8,000",
      "No effect on profit; net assets overstated $8,000",
    ],
    1,
    "Overstating closing inventory understates cost of sales, so PROFIT is overstated by $8,000, and the inventory ASSET is overstated by the same amount. Both move together, and the error reverses next year through opening inventory."),

  num("FAK-11-04", "FA-11", "D", "hard",
    "A business had no opening inventory. It bought 200 units at $12, then 300 at $15, then 100 at $18. It sold 450 units in total. Using FIFO, what is the value of closing inventory, in $?",
    2550, "$", 1,
    "600 units cost $2,400 + $4,500 + $1,800 = $8,700. FIFO sells the oldest first, so the 450 sold are the 200 at $12 and 250 at $15, leaving the newest 150 units: 50 at $15 = $750 plus 100 at $18 = $1,800, so $2,550. Check: closing inventory $2,550 + cost of sales $6,150 = $8,700, the cost of goods available."),

  num("FAK-11-05", "FA-11", "D", "hard",
    "A business held 400 units at $9. It bought 600 at $14, then sold 700 units. Using CONTINUOUS AVCO, what is the value of closing inventory, in $?",
    3600, "$", 1,
    "Before the sale: 400 × $9 + 600 × $14 = $3,600 + $8,400 = $12,000 for 1,000 units, an average of $12.00. Selling 700 leaves 300 units at $12.00 = $3,600. The average is recalculated on each RECEIPT, and an issue leaves it unchanged."),

  q("FAK-11-06", "FA-11", "D", "medium",
    "Which cost is EXCLUDED from the cost of inventory?",
    [
      "Import duties on purchased goods",
      "Carriage inwards",
      "Selling and distribution costs",
      "A systematic share of production overheads",
    ],
    2,
    "SELLING AND DISTRIBUTION costs are excluded — they arise after the item is in its present location and condition. Duties, carriage inwards and a systematic share of production overheads are all included. Administrative overheads, abnormal waste and finance costs are also excluded."),

  q("FAK-11-07", "FA-11", "D", "hard",
    "Prices have been FALLING through the period. Which method gives the higher closing inventory, and why?",
    [
      "FIFO, because it leaves the newest units in inventory and those are now the cheapest",
      "AVCO, because averaging pulls in the earlier higher prices",
      "Both give the same figure whatever prices do",
      "FIFO, because it always gives the higher figure",
    ],
    1,
    "With FALLING prices, FIFO leaves the newest and therefore CHEAPEST units in inventory, so AVCO — which averages in the earlier higher prices — gives the higher figure. Reason from which prices the method leaves in inventory rather than memorising that FIFO gives more."),

  q("FAK-11-08", "FA-11", "D", "medium",
    "What is the double entry to recognise closing inventory?",
    [
      "Debit cost of sales, credit inventory",
      "Debit inventory, credit cost of sales",
      "Debit inventory, credit purchases",
      "Debit purchases, credit inventory",
    ],
    1,
    "Debit INVENTORY (a current asset) and credit COST OF SALES, which moves the cost of unsold goods out of this year's expense. The opposite entry releases opening inventory into the new year's cost of sales."),

  q("FAK-11-09", "FA-11", "D", "medium",
    "Which statement about a continuous inventory record is correct?",
    [
      "It replaces the need for any physical count",
      "It updates on every movement, giving a book quantity and value at any moment",
      "It is only permitted for manufacturing businesses",
      "It measures inventory at net realisable value",
    ],
    1,
    "A continuous record updates on EVERY MOVEMENT, so a book figure is always available — which is what supports control. It does not remove the need for a physical count: the count is what verifies the record, and most businesses do both."),

  num("FAK-11-10", "FA-11", "D", "medium",
    "Opening inventory was $38,000, purchases $246,000 and closing inventory $41,000. Revenue was $340,000. What is gross profit, in $?",
    97000, "$", 1,
    "Cost of sales = $38,000 + $246,000 − $41,000 = $243,000. Gross profit = $340,000 − $243,000 = $97,000, a margin of 28.5%. The inventory movement of $3,000 is what separates purchases from cost of sales."),
]

/* ── Chapter 12 · Tangible non-current assets: acquisition ── */

const CH12: AccaQuestion[] = [
  num("FAK-12-01", "FA-12", "D", "medium",
    "A machine has a list price of $86,000 with a 10% trade discount. Delivery is $1,900, installation $4,300, staff training $2,800 and a one-year maintenance contract $1,500. What amount is capitalised, in $?",
    83600, "$", 1,
    "$86,000 × 90% = $77,400, plus delivery $1,900 and installation $4,300 = $83,600. Training and maintenance are EXPENSES — they are not costs of bringing the asset to its location and working condition, however necessary they are to operating it."),

  q("FAK-12-02", "FA-12", "D", "easy",
    "Which of these is capital expenditure?",
    [
      "Repainting the exterior of a building",
      "Building an extension that adds a new floor",
      "The annual service of a delivery vehicle",
      "Replacing a broken window to its original standard",
    ],
    1,
    "The EXTENSION enhances earning capacity, so it is capitalised. Repainting, servicing and replacing a part to restore the original standard all MAINTAIN the asset as it was, so all three are revenue expenditure."),

  q("FAK-12-03", "FA-12", "D", "hard",
    "A company charged $52,000 of machine installation costs to repairs two years ago and has not corrected it. What is the effect on the current financial statements?",
    [
      "Non-current assets are understated and cumulative profit is understated by $52,000",
      "Non-current assets are understated; profit was understated in the year of the error and has been overstated since, because no depreciation has been charged",
      "There is no effect, since the trial balance still balances",
      "Non-current assets are overstated and profit is overstated",
    ],
    1,
    "Non-current assets are understated by the net amount. Profit was UNDERSTATED by $52,000 in the year of the error and has been OVERSTATED in each year since, because the depreciation that should have been charged never was. One error, effects in every subsequent year."),

  q("FAK-12-04", "FA-12", "D", "medium",
    "Which cost is NOT capitalised as part of a building's cost?",
    [
      "Legal fees on the purchase",
      "Annual buildings insurance",
      "Stamp duty or transfer taxes on acquisition",
      "Site preparation necessary before construction",
    ],
    1,
    "ANNUAL INSURANCE is a cost of the period, not of acquiring the asset. Legal fees, transfer taxes and necessary site preparation are all directly attributable to bringing the asset into use and are capitalised."),

  q("FAK-12-05", "FA-12", "D", "medium",
    "Why is a non-current asset register maintained alongside the general ledger?",
    [
      "Because the ledger cannot record depreciation",
      "Because depreciation, disposals and physical control all need detail of each individual asset, while the ledger holds totals",
      "Because the register forms part of the double entry and the ledger does not",
      "Because accounting standards require it to be published",
    ],
    1,
    "The ledger holds TOTALS by class. Depreciating each asset over its own life, computing a gain on a specific disposal and checking that assets physically exist all need per-asset detail. The register is a MEMORANDUM record and is not published."),

  multi("FAK-12-06", "FA-12", "D", "medium",
    "Which TWO could explain a difference between the non-current asset register total and the general ledger?",
    [
      "An asset acquired but not entered in the register",
      "A change in the depreciation rate applied consistently to both",
      "A disposal recorded in the ledger but not removed from the register",
      "The asset being fully depreciated",
    ],
    [0, 2],
    "An UNRECORDED ACQUISITION and a DISPOSAL NOT REMOVED are both reconciling items. A rate change applied to both records affects them equally, and full depreciation is reflected in both — neither creates a difference."),

  num("FAK-12-07", "FA-12", "D", "hard",
    "A vehicle is bought for $41,000. Livery costs $1,200, the first year's insurance $1,400, the road licence $700 and a fuel card deposit $300. What amount is recognised as a non-current asset, in $?",
    42200, "$", 1,
    "$41,000 + livery $1,200 = $42,200. Livery brings the vehicle to the condition in which it will be used. Insurance, the licence and the deposit are all costs of OPERATING it — capitalising them would inflate the asset and every future depreciation charge."),

  q("FAK-12-08", "FA-12", "D", "easy",
    "A van dealer holds vans for resale. How are they classified?",
    ["Non-current assets", "Inventory", "Intangible assets", "Prepayments"],
    1,
    "INVENTORY. The test for a non-current asset is INTENDED USE over more than one period, not the nature of the item. The same van is a non-current asset to a delivery business and inventory to the dealer selling it."),

  q("FAK-12-09", "FA-12", "D", "medium",
    "Which statement best expresses the capital-or-revenue test?",
    [
      "Anything costing more than $1,000 is capital",
      "Does the expenditure make the asset better than it was, or keep it as it was?",
      "Anything paid in cash is revenue expenditure",
      "Anything relating to a non-current asset is capital",
    ],
    1,
    "BETTER is capital; KEEP is revenue. There is no universal money threshold — that is a materiality judgement, not the classification test — and plenty of spending on non-current assets, such as servicing and insurance, is revenue."),

  q("FAK-12-10", "FA-12", "D", "medium",
    "What is the entry to correct $3,400 of repairs wrongly debited to plant and machinery?",
    [
      "Debit plant and machinery $3,400, credit repairs $3,400",
      "Debit repairs $3,400, credit plant and machinery $3,400",
      "Debit repairs $6,800, credit plant and machinery $6,800",
      "Debit suspense $3,400, credit plant and machinery $3,400",
    ],
    1,
    "Debit REPAIRS and credit PLANT with $3,400 — an error of principle, where both a debit and a credit were originally posted, so the trial balance agreed and suspense is not involved. Any depreciation charged on the wrongly capitalised amount also needs reversing."),
]

/* ── Chapter 13 · Depreciation ── */

const CH13: AccaQuestion[] = [
  num("FAK-13-01", "FA-13", "D", "easy",
    "An asset costs $72,000, has a residual value of $9,000 and a useful life of seven years. What is the annual straight-line depreciation charge, in $?",
    9000, "$", 1,
    "($72,000 − $9,000) ÷ 7 = $9,000 a year. Straight line deducts residual value before dividing by the life; the charge is then identical in every full year of use."),

  num("FAK-13-02", "FA-13", "D", "medium",
    "An asset costing $96,000 with a residual value of $10,000 is depreciated at 30% reducing balance. What is the charge in the SECOND full year, in $?",
    20160, "$", 1,
    "Year 1: $96,000 × 30% = $28,800, leaving a carrying amount of $67,200. Year 2: $67,200 × 30% = $20,160. Residual value is NOT deducted under reducing balance — deducting it first is the single most common error on this method."),

  num("FAK-13-03", "FA-13", "D", "hard",
    "A machine is bought on 1 May 20X5 for $54,000, with a residual value of $4,000 and a six-year life, depreciated straight line on a monthly basis. The year end is 31 December. What is the charge for 20X5, in $?",
    5555.56, "$", 0.05,
    "Annual charge = ($54,000 − $4,000) ÷ 6 = $8,333.33. Eight months from 1 May: $8,333.33 × 8/12 = $5,555.56. Read the policy in the question before calculating — a full-year convention would give $8,333 from the same facts."),

  num("FAK-13-04", "FA-13", "D", "hard",
    "An asset cost $200,000 on 1 January 20X1 and was depreciated straight line over ten years with no residual value. On 1 January 20X5 the total useful life is revised to seven years and a residual value of $12,000 is estimated. What is the annual charge from 20X5, in $?",
    36000, "$", 1,
    "Charged to date: $20,000 × 4 = $80,000, so the carrying amount is $120,000. Revised remaining life is 7 − 4 = 3 years. ($120,000 − $12,000) ÷ 3 = $36,000. Prove it: $80,000 + $108,000 = $188,000 total depreciation, leaving exactly the $12,000 residual value."),

  q("FAK-13-05", "FA-13", "D", "medium",
    "What is depreciation?",
    [
      "A measure of the fall in an asset's market value",
      "The systematic allocation of an asset's depreciable amount over its useful life",
      "A fund set aside to replace the asset",
      "A provision for the asset's eventual disposal costs",
    ],
    1,
    "Depreciation ALLOCATES cost over the periods that benefit from using the asset — an application of the accruals basis. It is not a valuation, and it creates no fund: the entry never touches the bank."),

  q("FAK-13-06", "FA-13", "D", "medium",
    "A company's property has risen in market value each year and is not revalued. What depreciation is charged on the buildings?",
    [
      "None, because no value has been lost",
      "Depreciation continues over the buildings' useful life",
      "Only the amount by which value has not risen",
      "Depreciation resumes only when the value falls",
    ],
    1,
    "Depreciation CONTINUES. It allocates the cost of using the building over the periods benefiting, and a rising market price is irrelevant to that. Note that the LAND element is not depreciated, because land has no limited useful life."),

  q("FAK-13-07", "FA-13", "D", "medium",
    "Which account is credited with the annual depreciation charge?",
    ["The asset at cost account", "Accumulated depreciation", "Bank", "Retained earnings",
    ],
    1,
    "ACCUMULATED DEPRECIATION. The cost account holds original cost until the asset leaves, because the disposal calculation and the disclosure note both need cost and accumulated depreciation separately. Crediting cost destroys both figures."),

  q("FAK-13-08", "FA-13", "D", "hard",
    "For which asset is the reducing-balance method most appropriate?",
    [
      "A freehold building used evenly over fifty years",
      "IT equipment whose benefit is greatest in its early years and whose maintenance rises with age",
      "A ten-year operating licence",
      "Office partitioning replaced on a fixed cycle",
    ],
    1,
    "REDUCING BALANCE suits an asset whose benefit is greatest early or whose maintenance costs rise with age — IT equipment and vehicles are the standard examples. Buildings, licences and fittings consumed evenly suit straight line."),

  num("FAK-13-09", "FA-13", "D", "medium",
    "An asset cost $60,000 and has accumulated depreciation of $37,500. What is its carrying amount, in $?",
    22500, "$", 1,
    "$60,000 − $37,500 = $22,500. Cost always equals accumulated depreciation plus carrying amount, which is the arithmetic check on every depreciation and disposal computation."),

  q("FAK-13-10", "FA-13", "D", "hard",
    "How is a revision to an asset's estimated useful life accounted for?",
    [
      "Prior years are restated as though the new life had always applied",
      "The remaining carrying amount less any revised residual value is spread over the revised remaining life",
      "The whole original cost is spread over the revised total life",
      "A provision is made for the difference",
    ],
    1,
    "PROSPECTIVELY: the carrying amount at the date of change, less any revised residual value, is spread over the REMAINING life. The depreciation already charged was the best estimate at the time and is not restated."),
]

/* ── Chapter 14 · Disposals, part-exchange and revaluation ── */

const CH14: AccaQuestion[] = [
  num("FAK-14-01", "FA-14", "D", "easy",
    "An asset costing $58,000 with accumulated depreciation of $39,000 is sold for $23,000. What is the gain on disposal, in $?",
    4000, "$", 1,
    "Carrying amount = $58,000 − $39,000 = $19,000. Proceeds $23,000 − $19,000 = a gain of $4,000. Comparing proceeds with COST would suggest a $35,000 loss and ignore every year of depreciation already charged."),

  num("FAK-14-02", "FA-14", "D", "hard",
    "A machine bought on 1 January 20X3 for $50,000 is depreciated at 20% straight line with no residual value. It is sold on 30 June 20X6 for $13,000. Depreciation is charged monthly, including in the year of disposal. What is the result on disposal, in $ (enter a loss as a negative)?",
    -2000, "$", 1,
    "Annual charge $10,000. Three full years 20X3–20X5 = $30,000, plus six months of 20X6 = $5,000, so accumulated depreciation is $35,000 and the carrying amount $15,000. Proceeds $13,000 − $15,000 = a LOSS of $2,000. Omitting the part-year charge would give a $5,000 loss."),

  num("FAK-14-03", "FA-14", "D", "medium",
    "A machine with a carrying amount of $9,400 is part-exchanged against a new machine priced at $36,000. The supplier allows $8,000 for the old machine and the balance is paid in cash. At what amount is the new machine recognised, in $?",
    36000, "$", 1,
    "The new machine is recognised at its FULL cost of $36,000 — the $8,000 allowance plus $28,000 cash. The allowance is simultaneously the proceeds on the old machine, giving a loss on disposal of $8,000 − $9,400 = $1,400."),

  num("FAK-14-04", "FA-14", "D", "hard",
    "A van cost $30,000 on 1 July 20X4 and is depreciated at 25% reducing balance, charging a full year whenever an asset is bought and nothing in the year it leaves. It is traded in on 1 July 20X7 for an allowance of $11,000. What is the result on disposal, in $ (enter a loss as a negative)?",
    -1656.25, "$", 0.05,
    "20X4: $7,500, carrying amount $22,500. 20X5: $5,625, carrying amount $16,875. 20X6: $4,218.75, carrying amount $12,656.25. No charge in 20X7, the year of disposal. Allowance $11,000 − $12,656.25 = a loss of $1,656.25."),

  q("FAK-14-05", "FA-14", "D", "medium",
    "A property with a carrying amount of $420,000 is revalued to $560,000. How is the $140,000 reported?",
    [
      "As a gain in profit or loss",
      "In other comprehensive income, accumulating in a revaluation surplus within equity",
      "As deferred income within liabilities",
      "As a reduction of accumulated depreciation with no gain reported",
    ],
    1,
    "The uplift goes to OTHER COMPREHENSIVE INCOME and accumulates in the REVALUATION SURPLUS within equity. Nothing has been sold and no income earned, so routing it through profit would overstate distributable profit by an entirely unrealised gain."),

  num("FAK-14-06", "FA-14", "D", "hard",
    "A building cost $600,000 and was depreciated straight line over 40 years. After 10 years it is revalued to $750,000 with 30 years of life remaining. What is the annual depreciation charge after the revaluation, in $?",
    25000, "$", 1,
    "$750,000 ÷ 30 remaining years = $25,000. The revalued amount is depreciated over the remaining life. The old charge was $600,000 ÷ 40 = $15,000, so $10,000 a year of excess depreciation moves out of the revaluation surplus and into retained earnings, entirely inside equity."),

  q("FAK-14-07", "FA-14", "D", "hard",
    "How is the excess depreciation on a revalued asset dealt with?",
    [
      "Credited to profit or loss to offset the higher charge",
      "Transferred from the revaluation surplus to retained earnings, within equity",
      "Deducted from the asset's cost",
      "Ignored — no adjustment is made",
    ],
    1,
    "It is transferred from REVALUATION SURPLUS to RETAINED EARNINGS. Both are equity, so total equity and profit are unchanged; the transfer moves an amount now realised through use out of a non-distributable surplus into distributable reserves."),

  q("FAK-14-08", "FA-14", "D", "medium",
    "A revalued asset is sold for exactly its carrying amount. What is reported in profit or loss, and what happens to the revaluation surplus?",
    [
      "A gain equal to the surplus; the surplus is released to profit",
      "No gain or loss; the remaining surplus is transferred to retained earnings within equity",
      "A loss equal to the surplus; the surplus is written off",
      "A gain equal to the original cost less proceeds",
    ],
    1,
    "NO gain or loss — the gain is always proceeds less carrying amount, and here they are equal. The balance in the revaluation surplus for that asset is transferred DIRECTLY to retained earnings, inside equity, and never passes through profit."),

  multi("FAK-14-09", "FA-14", "D", "medium",
    "Which TWO entries form part of recording a disposal?",
    [
      "Debit disposals with the asset's original cost",
      "Debit the asset at cost with the proceeds",
      "Debit accumulated depreciation with the depreciation charged on that asset",
      "Credit profit or loss with the full proceeds",
    ],
    [0, 2],
    "The cost is DEBITED to disposals (and credited out of the cost account), and the accumulated depreciation on that asset is DEBITED out of its account and credited to disposals. Proceeds are then credited to disposals, and only the resulting BALANCE — the gain or loss — reaches profit or loss."),

  q("FAK-14-10", "FA-14", "D", "medium",
    "How should a gain on disposal be presented?",
    [
      "Within revenue",
      "As other income, or separately where material, below gross profit",
      "As other comprehensive income",
      "As a reduction of cost of sales",
    ],
    1,
    "As OTHER INCOME, disclosed separately if material. It is not revenue — including it there overstates revenue and distorts every margin. It is also not other comprehensive income, which is where an unrealised revaluation gain goes."),
]

/* ── Chapter 15 · Intangibles and amortisation ── */

const CH15: AccaQuestion[] = [
  q("FAK-15-01", "FA-15", "D", "easy",
    "How is research expenditure treated?",
    [
      "Capitalised and amortised over the resulting product's life",
      "Written off as an expense as incurred",
      "Capitalised only if the project later succeeds",
      "Deferred until commercial production begins",
    ],
    1,
    "Research is ALWAYS an expense as incurred, and it is never reinstated as an asset even if the project succeeds. Only DEVELOPMENT expenditure — applying findings to a specific product — can be capitalised, and only where every criterion is met."),

  num("FAK-15-02", "FA-15", "D", "hard",
    "A company spent $720,000 evenly through the year on one development project. All six capitalisation criteria were first met on 1 September, and the year end is 31 December. How much is capitalised, in $?",
    240000, "$", 1,
    "$720,000 ÷ 12 = $60,000 a month. Four months from 1 September = $240,000 capitalised; the $480,000 spent before the criteria were met stays in profit or loss and cannot be reinstated. Capitalisation runs from the date the criteria are FIRST met."),

  q("FAK-15-03", "FA-15", "D", "medium",
    "A development project is technically feasible, management intends to complete it and a market exists, but the company cannot secure the funding to finish it. How is the expenditure treated?",
    [
      "Capitalised, since most criteria are met",
      "Expensed in full, because the criteria are cumulative",
      "Half capitalised and half expensed",
      "Capitalised then immediately written down to nil",
    ],
    1,
    "EXPENSED IN FULL. The criteria are CUMULATIVE — failing the requirement for adequate technical, financial and other resources is enough on its own, however strong the other five look. There is no partial capitalisation."),

  q("FAK-15-04", "FA-15", "D", "medium",
    "A company has built a widely recognised brand internally, valued by an adviser at $6m. What appears in the statement of financial position?",
    ["$6m as an intangible asset", "Nothing", "$6m as a contingent asset", "$6m added to equity"],
    1,
    "NOTHING. An internally generated brand is not recognised: its cost cannot be separated from the cost of running the business and its value cannot be verified. A brand PURCHASED from another party would be recognised at its cost."),

  num("FAK-15-05", "FA-15", "D", "hard",
    "Development costs of $480,000 were capitalised during the year. The product became available for sale on 1 October and is amortised over five years on a monthly basis. The year end is 31 December. What is the amortisation charge for the year, in $?",
    24000, "$", 1,
    "Annual charge = $480,000 ÷ 5 = $96,000. Three months from 1 October = $24,000. Amortisation begins when the asset is AVAILABLE FOR USE OR SALE, not when the expenditure was incurred — charging a full year is the standard error."),

  q("FAK-15-06", "FA-15", "D", "medium",
    "Which is an intangible asset that WOULD be recognised?",
    [
      "Internally generated goodwill",
      "A patent purchased from another company",
      "An internally generated customer list",
      "The skill of the workforce",
    ],
    1,
    "A PURCHASED PATENT has a verifiable cost that someone was independently willing to pay, so it is recognised. Internally generated goodwill and customer lists are not recognised, and a workforce is not controlled by the entity at all."),

  num("FAK-15-07", "FA-15", "D", "medium",
    "A ten-year licence is bought on 1 April for $240,000 and amortised monthly on a straight-line basis. The year end is 31 December. What is the charge for the first year, in $?",
    18000, "$", 1,
    "Annual charge = $240,000 ÷ 10 = $24,000. Nine months from 1 April = $18,000, leaving a carrying amount of $222,000. Where an intangible has a legal life, that life caps the useful life over which it is amortised."),

  q("FAK-15-08", "FA-15", "D", "medium",
    "What distinguishes research from development?",
    [
      "Research is undertaken by scientists; development by engineers",
      "Research seeks new knowledge with no certain outcome; development applies findings to a specific product or process",
      "Research is capitalised; development is expensed",
      "Research relates to services; development to goods",
    ],
    1,
    "RESEARCH is original planned investigation to gain new knowledge, with no certainty anything will come of it. DEVELOPMENT applies those findings to a plan or design for a specific new or improved product or process before commercial production."),

  multi("FAK-15-09", "FA-15", "D", "hard",
    "Which TWO are among the criteria for capitalising development expenditure?",
    [
      "The project is expected to be completed within twelve months",
      "The entity has adequate technical, financial and other resources to complete it",
      "The expenditure attributable to the asset can be measured reliably",
      "The board has approved a budget for the project",
    ],
    [1, 2],
    "ADEQUATE RESOURCES and RELIABLE MEASUREMENT are two of the six, alongside technical feasibility, intention to complete, ability to use or sell, and probable future economic benefits. There is no twelve-month test, and a board budget is not one of the criteria."),

  q("FAK-15-10", "FA-15", "D", "easy",
    "The charge spreading an intangible asset's cost over its useful life is called:",
    ["Depreciation", "Amortisation", "Impairment", "A provision"],
    1,
    "AMORTISATION — the same idea as depreciation, applied to an asset with no physical substance. It begins when the asset is available for use, and where the asset has a legal life that life caps the amortisation period."),
]

/* ── Chapter 16 · Accruals, prepayments, accrued and deferred income ── */

const CH16: AccaQuestion[] = [
  num("FAK-16-01", "FA-16", "D", "medium",
    "Insurance paid during the year was $19,200. There was a prepayment of $3,400 at the start and $4,100 at the end. What is the expense for the year, in $?",
    18500, "$", 1,
    "Expense = cash $19,200 + opening prepayment $3,400 − closing prepayment $4,100 = $18,500. The opening prepayment is consumed this year so it is added; the closing prepayment belongs to next year so it is deducted."),

  num("FAK-16-02", "FA-16", "D", "medium",
    "Cash paid for electricity was $24,600. The accrual was $1,900 at the start of the year and $2,750 at the end. What is the expense for the year, in $?",
    25450, "$", 1,
    "Expense = cash $24,600 + closing accrual $2,750 − opening accrual $1,900 = $25,450. The expense EXCEEDS the cash paid because the accrual grew — more was consumed than was paid for."),

  q("FAK-16-03", "FA-16", "D", "medium",
    "A business receives $18,000 on 1 October for a twelve-month service contract starting that day. Its year end is 31 December. What appears in the statement of financial position?",
    [
      "Accrued income of $13,500 as an asset",
      "Deferred income of $13,500 as a liability",
      "A prepayment of $4,500 as an asset",
      "Nothing — the full $18,000 is income",
    ],
    1,
    "Three months have been earned ($4,500 of income); the remaining $13,500 has been received but not earned, so it is DEFERRED INCOME — a liability, because the business still owes nine months of service."),

  q("FAK-16-04", "FA-16", "D", "hard",
    "A business has failed to record an accrual of $6,200 for wages. What is the effect?",
    [
      "Profit overstated $6,200; net assets overstated $6,200",
      "Profit understated $6,200; net assets overstated $6,200",
      "Profit overstated $6,200; net assets understated $6,200",
      "No effect on profit; net assets overstated $6,200",
    ],
    0,
    "The expense is missing, so profit is OVERSTATED by $6,200, and the liability is missing, so net assets are OVERSTATED by the same amount. All four accruals adjustments move profit and net assets in the SAME direction."),

  q("FAK-16-05", "FA-16", "D", "medium",
    "Which pair correctly describes accrued income and deferred income?",
    [
      "Accrued income is a liability; deferred income is an asset",
      "Accrued income is an asset; deferred income is a liability",
      "Both are liabilities",
      "Both are assets",
    ],
    1,
    "ACCRUED income has been earned but not received — an ASSET. DEFERRED income has been received but not earned — a LIABILITY, because the obligation to the customer is outstanding. Reversing them is the commonest confusion in this chapter."),

  num("FAK-16-06", "FA-16", "D", "hard",
    "Rent is paid quarterly in advance. There was a prepayment of $5,100 at 1 January. Payments in the year were $5,100, $5,400, $5,400 and $5,700, the last covering the quarter beginning 1 January next year. What is the rent expense for the year, in $?",
    21000, "$", 1,
    "Cash paid = $5,100 + $5,400 + $5,400 + $5,700 = $21,600. Expense = $21,600 + opening prepayment $5,100 − closing prepayment $5,700 = $21,000. Prove it by adding the quarters that belong to this year: $5,100 + $5,100 + $5,400 + $5,400 = $21,000."),

  q("FAK-16-07", "FA-16", "D", "medium",
    "Why must an accrual raised at the year end be reversed in the following period?",
    [
      "Because the accrual was only an estimate",
      "Because the later payment settles the liability already recognised, and without the reversal the cost is charged twice",
      "Because accruals may not be carried forward",
      "Because the auditor requires it",
    ],
    1,
    "The payment SETTLES A LIABILITY that has already been expensed. Without the reversal, the payment would be charged to profit again — so the same cost would appear in two periods, which is exactly what questions spanning two years test."),

  q("FAK-16-08", "FA-16", "D", "easy",
    "Where is a prepayment presented?",
    [
      "Within current liabilities",
      "Within trade and other receivables, in current assets",
      "As a deduction from revenue",
      "Within equity",
    ],
    1,
    "A prepayment is an ASSET — a right to a benefit already paid for — presented within trade and other receivables. Accruals and deferred income are the two items in this chapter that sit in liabilities."),

  num("FAK-16-09", "FA-16", "D", "medium",
    "A business rents out part of its premises for $2,400 a month. At the year end one month's rent is outstanding and has not been invoiced. How much rental income is recognised for a full year, in $?",
    28800, "$", 1,
    "Twelve months at $2,400 = $28,800 of income, of which $2,400 is ACCRUED INCOME — earned but not yet received or invoiced, so an asset. Recognising only the eleven months received would understate income and omit the asset."),

  multi("FAK-16-10", "FA-16", "D", "hard",
    "Which TWO adjustments REDUCE profit and net assets?",
    ["Recognising a prepayment", "Raising an accrual", "Recognising accrued income", "Recognising deferred income"],
    [1, 3],
    "An ACCRUAL adds an expense and a liability; DEFERRED INCOME removes income and adds a liability. Both reduce profit and net assets. Prepayments and accrued income are assets and both increase profit and net assets."),
]

/* ── Chapter 17 · Receivables, irrecoverable debts and allowances ── */

const CH17: AccaQuestion[] = [
  num("FAK-17-01", "FA-17", "D", "hard",
    "Opening allowance for receivables was $7,000. Write-offs during the year were $5,400. Closing receivables after those write-offs are $210,000 and the required allowance is 5%. What is charged to profit or loss, in $?",
    8900, "$", 1,
    "Required closing allowance = $210,000 × 5% = $10,500, so the MOVEMENT is $10,500 − $7,000 = $3,500. Charge = write-offs $5,400 + increase $3,500 = $8,900. Charging the whole $10,500 allowance would give $15,900 and double-count the opening balance."),

  q("FAK-17-02", "FA-17", "D", "medium",
    "A debt of $3,100 written off two years ago is unexpectedly received in full. What is the entry?",
    [
      "Debit receivables $3,100, credit irrecoverable debts; then debit bank, credit receivables",
      "Debit bank $3,100, credit irrecoverable debts recovered $3,100",
      "Debit bank $3,100, credit trade receivables $3,100",
      "Debit bank $3,100, credit allowance for receivables $3,100",
    ],
    1,
    "One entry: debit bank and credit IRRECOVERABLE DEBTS RECOVERED, income of the current period. The receivable was removed two years ago and does not exist, so crediting receivables would create a negative balance."),

  q("FAK-17-03", "FA-17", "D", "medium",
    "What part of the allowance for receivables is charged to profit or loss?",
    [
      "The whole closing allowance",
      "Only the movement between the opening and closing allowance",
      "The opening allowance only",
      "Nothing — the allowance never affects profit",
    ],
    1,
    "Only the MOVEMENT. The closing allowance is a deduction from receivables in the statement of financial position; profit is charged with the increase, or credited with the decrease, since last year. This is the highest-yield rule in the chapter."),

  q("FAK-17-04", "FA-17", "D", "hard",
    "A business is owed $9,600 by a party to whom it owes $4,200, and the two agree a contra. What is the effect on profit?",
    [
      "Profit falls by $4,200",
      "There is no effect on profit",
      "Profit rises by $4,200",
      "Profit falls by $5,400",
    ],
    1,
    "NO EFFECT. A contra debits payables and credits receivables — an asset and a liability both fall by $4,200. No cash moves and no income or expense arises, so routing it through profit invents income out of an administrative convenience."),

  num("FAK-17-05", "FA-17", "D", "hard",
    "Receivables before adjustment are $186,000, including a specific balance of $6,000 now considered irrecoverable. The allowance is to be 4% of the remainder, and the opening allowance was $8,400. What is the total charge to profit or loss, in $?",
    4800, "$", 1,
    "Write off $6,000, leaving $180,000. Required allowance $180,000 × 4% = $7,200, against an opening $8,400 — a DECREASE of $1,200, which is a credit. Charge = $6,000 − $1,200 = $4,800. The percentage is applied AFTER the write-off, or the same debt is provided for twice."),

  q("FAK-17-06", "FA-17", "D", "medium",
    "When is a receivable written off rather than allowed against?",
    [
      "Whenever it is more than 90 days overdue",
      "When the business has concluded the debt will not be collected",
      "Whenever the customer disputes the invoice",
      "Only at the direction of the auditor",
    ],
    1,
    "A WRITE-OFF is for a debt CONCLUDED to have failed — liquidation, disappearance, a failed claim. A balance that is merely old or disputed is DOUBTFUL, so it stays on the books with an allowance against it."),

  q("FAK-17-07", "FA-17", "D", "easy",
    "What is the purpose of an aged receivables analysis?",
    [
      "To calculate the sales tax due on credit sales",
      "To show how long each balance has been outstanding, directing collection effort and informing the allowance",
      "To record the double entry for credit sales",
      "To reconcile the bank account",
    ],
    1,
    "It splits balances by HOW LONG THEY HAVE BEEN OUTSTANDING, because an old balance is far more likely to be uncollectable than a recent one. It is the schedule from which the allowance for receivables is set."),

  num("FAK-17-08", "FA-17", "D", "medium",
    "Trade receivables are $164,000 and the allowance for receivables is $6,560. What figure appears in current assets, in $?",
    157440, "$", 1,
    "$164,000 − $6,560 = $157,440. The receivable stays on the books at its full amount and the allowance is DEDUCTED on presentation — which is also why the allowance never enters the receivables control account."),

  multi("FAK-17-09", "FA-17", "D", "medium",
    "Which TWO are costs of offering credit to customers?",
    [
      "Cash is tied up between the sale and the receipt",
      "Sales volumes are reduced",
      "Some debts are never collected",
      "Sales tax becomes payable earlier",
    ],
    [0, 2],
    "Credit ties up CASH and produces IRRECOVERABLE DEBTS, along with the administrative cost of invoicing, statements and chasing. Credit generally INCREASES sales rather than reducing them, and it does not change when sales tax falls due."),

  q("FAK-17-10", "FA-17", "D", "hard",
    "The required allowance for receivables has FALLEN since last year. What is the effect on profit or loss?",
    [
      "An additional expense equal to the closing allowance",
      "A credit, which reduces the year's irrecoverable debts charge",
      "No effect, since only increases are recorded",
      "An expense equal to the decrease",
    ],
    1,
    "A DECREASE in the required allowance is a CREDIT to profit or loss, reducing the year's charge — and where the fall is large enough, the net charge can be negative. The movement can go either way; only increases being recorded is a misreading of the rule."),
]

/* ── Chapter 18 · Payables, provisions and contingencies ── */

const CH18: AccaQuestion[] = [
  q("FAK-18-01", "FA-18", "D", "medium",
    "A company is defending a claim it will probably lose, reliably estimated at $85,000, and is pursuing a claim of $50,000 its lawyers say it will probably win. What is recognised?",
    [
      "A provision of $85,000 and an asset of $50,000",
      "A provision of $85,000 only; the $50,000 is disclosed",
      "A net provision of $35,000",
      "Neither; both are disclosed",
    ],
    1,
    "The probable OBLIGATION is recognised as a provision of $85,000. The probable INFLOW is a contingent ASSET, which is only DISCLOSED — recognition requires virtual certainty. The asymmetry is deliberate prudence."),

  q("FAK-18-02", "FA-18", "D", "easy",
    "What are the three conditions for recognising a provision?",
    [
      "A possible obligation, a possible outflow and an estimate",
      "A present obligation from a past event, a probable outflow, and a reliable estimate",
      "A future obligation, a certain outflow and an exact amount",
      "Board approval, an outflow within twelve months and a legal claim",
    ],
    1,
    "A PRESENT OBLIGATION from a PAST EVENT, a PROBABLE outflow of economic benefits, and a RELIABLE ESTIMATE of the amount. All three, or no provision arises."),

  q("FAK-18-03", "FA-18", "D", "medium",
    "An obligation is possible but not probable, and the possibility is not remote. How is it reported?",
    [
      "Recognised as a provision",
      "Disclosed as a contingent liability",
      "Ignored entirely",
      "Recognised as a note within equity",
    ],
    1,
    "DISCLOSED as a contingent liability, describing the nature, the amount and the uncertainty. A PROBABLE obligation would be recognised; a REMOTE one would be ignored altogether, with no provision and no disclosure."),

  num("FAK-18-04", "FA-18", "D", "medium",
    "A warranty provision stood at $42,000 at the start of the year. The required balance at the year end is $57,500. What is charged to profit or loss, in $?",
    15500, "$", 1,
    "Only the MOVEMENT: $57,500 − $42,000 = $15,500. Charging the whole closing provision would overstate the expense by the $42,000 already charged in earlier years — the same principle as the allowance for receivables."),

  q("FAK-18-05", "FA-18", "D", "hard",
    "A contingent asset becomes virtually certain. What happens?",
    [
      "It continues to be disclosed only",
      "It is recognised as an asset, because it is no longer contingent",
      "It is recognised at half its value",
      "It is recognised only when cash is received",
    ],
    1,
    "It is RECOGNISED. Virtual certainty is the recognition threshold for an asset — at that point it is no longer contingent at all. A merely PROBABLE inflow stays a disclosure, which is where the asymmetry with liabilities lies."),

  q("FAK-18-06", "FA-18", "D", "medium",
    "What distinguishes a provision from an accrual?",
    [
      "A provision is always larger",
      "An accrual is certain to exist with only the amount estimated; a provision is uncertain in amount or timing",
      "An accrual relates to suppliers and a provision to customers",
      "A provision is a current liability and an accrual is non-current",
    ],
    1,
    "The UNCERTAINTY. A trade payable is certain in amount and timing, an accrual is certain to exist with an estimated amount, and a PROVISION is uncertain in AMOUNT OR TIMING. That is why provisions attract a standard of their own."),

  q("FAK-18-07", "FA-18", "D", "hard",
    "A board has decided to restructure a division next year but has announced nothing and entered no commitments. Is a provision recognised?",
    [
      "Yes, because the decision has been taken",
      "No, because there is no present obligation arising from a past event",
      "Yes, at half the expected cost",
      "Yes, but only if the amount is material",
    ],
    1,
    "NO. A provision needs a PRESENT OBLIGATION from a PAST EVENT that the entity has no practical ability to avoid. A board decision the entity could still reverse is an intention, not an obligation — and the same reasoning rules out provisions for future operating losses."),

  q("FAK-18-08", "FA-18", "D", "medium",
    "An obligation is remote. What is reported?",
    ["A provision", "A disclosure only", "Nothing at all", "A note within equity"],
    2,
    "NOTHING. Remote means no provision and no disclosure — the only one of the four likelihood bands that requires silence. Disclosing every remote possibility would bury the genuinely relevant contingencies."),

  multi("FAK-18-09", "FA-18", "D", "medium",
    "Which TWO are liabilities of a limited liability company?",
    [
      "Redeemable preference shares",
      "Share premium",
      "Income tax payable on the year's profit",
      "The revaluation surplus",
    ],
    [0, 2],
    "REDEEMABLE preference shares must be repaid, so they are a liability, and INCOME TAX PAYABLE is an obligation to the tax authority. Share premium and the revaluation surplus are both components of EQUITY."),

  num("FAK-18-10", "FA-18", "D", "hard",
    "A provision of $60,000 was carried at the start of the year. $22,000 was paid out in settlement during the year and the required closing provision is $71,000. What is charged to profit or loss for the year, in $?",
    33000, "$", 1,
    "Opening $60,000 less the $22,000 utilised = $38,000 remaining. To reach a required $71,000, a further $33,000 is charged. The settlement debits the provision and credits bank; only the top-up reaches profit."),
]

/* ── Chapter 19 · Capital structure, dividends and finance costs ── */

const CH19: AccaQuestion[] = [
  num("FAK-19-01", "FA-19", "D", "medium",
    "A company issues 500,000 ordinary shares of $0.20 each at $0.95 per share, fully paid in cash. What amount is credited to share premium, in $?",
    375000, "$", 1,
    "Proceeds 500,000 × $0.95 = $475,000. Share capital takes the NOMINAL amount 500,000 × $0.20 = $100,000, so share premium takes $375,000. Crediting the whole $475,000 to share capital would overstate it by exactly the premium."),

  q("FAK-19-02", "FA-19", "D", "medium",
    "How is the dividend on REDEEMABLE preference shares reported?",
    [
      "As a deduction from retained earnings in the statement of changes in equity",
      "As a finance cost in profit or loss",
      "As other comprehensive income",
      "It is not reported until redemption",
    ],
    1,
    "Redeemable preference shares are a LIABILITY, because the company must repay them, so the dividend is a FINANCE COST reducing profit. Only dividends on equity instruments — including irredeemable preference shares — are distributions."),

  num("FAK-19-03", "FA-19", "D", "hard",
    "A company has 800,000 $0.50 ordinary shares and share premium of $90,000. It makes a 1-for-10 bonus issue, using share premium as far as possible. What is the share premium balance afterwards, in $?",
    50000, "$", 1,
    "800,000 ÷ 10 = 80,000 bonus shares at $0.50 nominal = $40,000 credited to share capital, funded from share premium: $90,000 − $40,000 = $50,000. No cash arises and TOTAL EQUITY IS UNCHANGED — that is the defining feature of a bonus issue."),

  num("FAK-19-04", "FA-19", "D", "hard",
    "A company has 900,000 $1 ordinary shares. It makes a 1-for-3 rights issue at $1.60 per share, fully taken up. What cash is raised, in $?",
    480000, "$", 1,
    "900,000 ÷ 3 = 300,000 new shares × $1.60 = $480,000. Share capital rises by the nominal $300,000 and share premium by $180,000. Unlike a bonus issue, a rights issue does raise cash and does increase total equity."),

  num("FAK-19-05", "FA-19", "D", "medium",
    "Last year's income tax liability was estimated at $92,000 and eventually settled at $98,000. This year's estimated charge is $115,000. What is the income tax expense for this year, in $?",
    121000, "$", 1,
    "Last year was UNDER-provided by $6,000, and an under-provision INCREASES this year's charge: $115,000 + $6,000 = $121,000. Deducting it instead gives $109,000 — a $12,000 error from one reversed sign."),

  q("FAK-19-06", "FA-19", "D", "medium",
    "What test determines whether an instrument is equity or a liability?",
    [
      "Whether it is called a share or a loan",
      "Whether the company is obliged to hand the money back",
      "Whether it pays a fixed or a variable return",
      "Whether it is listed on an exchange",
    ],
    1,
    "Whether the company MUST REPAY IT. If yes it is a liability and the return on it is a finance cost reducing profit; if no it is equity and the return is a distribution. This is substance over form — redeemable preference shares are called shares and behave like debt."),

  q("FAK-19-07", "FA-19", "D", "hard",
    "A dividend is proposed by the directors AFTER the reporting date. How is it treated in the statements for the year just ended?",
    [
      "Recognised as a liability and deducted from retained earnings",
      "Disclosed, but not recognised, because no obligation existed at the reporting date",
      "Recognised as an expense in profit or loss",
      "Ignored entirely",
    ],
    1,
    "DISCLOSED, NOT RECOGNISED. There was no obligation at the reporting date, so there is no liability at that date. Only dividends declared before the year end are deducted from retained earnings for that year."),

  q("FAK-19-08", "FA-19", "D", "medium",
    "Which row in the statement of changes in equity must total NIL?",
    [
      "Profit for the year",
      "A bonus issue",
      "Dividends paid",
      "A share issue for cash",
    ],
    1,
    "A BONUS ISSUE moves an amount from a reserve into share capital, so the row's TOTAL is nil. A transfer of excess depreciation is the other such row. Profit, dividends and a cash share issue all change total equity."),

  multi("FAK-19-09", "FA-19", "D", "medium",
    "Which TWO are components of equity?",
    ["Share premium", "Loan notes", "Revaluation surplus", "Income tax payable"],
    [0, 2],
    "SHARE PREMIUM and the REVALUATION SURPLUS are equity components, along with share capital and retained earnings. Loan notes and income tax payable are liabilities — the company must hand both amounts over."),

  num("FAK-19-10", "FA-19", "D", "hard",
    "A company has $400,000 of 7% loan notes and $150,000 of 6% redeemable preference shares. What are total finance costs for the year, in $?",
    37000, "$", 1,
    "Loan note interest $400,000 × 7% = $28,000, plus the preference dividend $150,000 × 6% = $9,000 — a finance cost because the shares are REDEEMABLE and therefore a liability. Total $37,000. Had the preference shares been irredeemable, finance costs would be $28,000 and the $9,000 a distribution."),
]

/** FA's authored question kit for Area D — chapters 9 to 19. */
export const FA_KIT_D: AccaQuestion[] = [
  ...CH09,
  ...CH10,
  ...CH11,
  ...CH12,
  ...CH13,
  ...CH14,
  ...CH15,
  ...CH16,
  ...CH17,
  ...CH18,
  ...CH19,
]
