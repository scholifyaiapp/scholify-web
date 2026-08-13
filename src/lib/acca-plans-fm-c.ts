/*
 * FM Area C — working-capital management.
 *
 * This is one of FM's dependable Section C territories. The 20-mark plans use
 * a spreadsheet route: assumptions and policy changes first, a labelled table
 * second, then discussion derived from the cash conversion mechanics. That
 * keeps method marks visible even when one input is wrong.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FM_PLANS_C: ExamPlanMap = {
  /* ── FM-04 · The working capital cycle and overtrading ────────────────── */

  "FM-04::the-cycle": {
    title: "Calculating and interpreting the cash operating cycle",
    format: "mtq",
    marks: 10,
    requirement:
      "A company has annual credit revenue of $12 million and cost of sales of $8 million. Average inventory is $1.2 million, receivables are $1.5 million and trade payables are $0.8 million. Using a 365-day year, calculate inventory days, receivable days, payable days, the cash operating cycle and the cash released by reducing receivable days by ten. (10 marks)",
    plan: [
      {
        step: "Match each balance to its flow",
        detail:
          "Inventory and payables arise from cost, so use cost of sales when purchases are unavailable. Receivables arise from customer invoices, so use credit revenue. Mixing these denominators creates the intended distractors.",
      },
      {
        step: "Calculate the three periods separately",
        detail:
          "Lay out inventory days, receivable days and payable days as labelled workings. Keep full precision until the cycle is calculated, since premature rounding can move an objective-test answer by a day.",
      },
      {
        step: "Build rather than memorise the cycle",
        detail:
          "Cash is tied up while inventory is held and customers owe money, then supplier credit delays payment. Therefore add inventory and receivable days and subtract payable days.",
      },
      {
        step: "Value the proposed day reduction",
        detail:
          "A ten-day receivables reduction releases ten days of credit sales, not ten days of cost of sales. State that it is a one-off release of investment, distinct from an annual profit saving.",
      },
    ],
    answer:
      "| Working | Calculation | Result |\n|---|---:|---:|\n| Inventory days | $1.2m / $8m × 365 | **54.75 days** |\n| Receivable days | $1.5m / $12m × 365 | **45.63 days** |\n| Payable days | $0.8m / $8m × 365 | **36.50 days** |\n| Cash operating cycle | 54.75 + 45.63 − 36.50 | **63.88 days**, about 64 |\n| Cash released | $12m / 365 × 10 | **$328,767** |\n\nNet working capital represented by the three balances is $1.2m + $1.5m − $0.8m = **$1.9m**. The common distractors use revenue for inventory and payables, add payable days rather than subtracting them, or value the ten-day receivable improvement at cost of sales. A shorter cycle normally releases finance, but it is beneficial only if lower inventory or tighter credit does not lose profitable sales or service reliability.",
    earns: [
      "Using cost of sales for inventory and payables and credit revenue for receivables",
      "Subtracting supplier-credit days when building the cycle",
      "Identifying the receivables reduction as a one-off cash release",
    ],
    loses: [
      "Using one denominator for all three ratios",
      "Adding payable days because payables appear as a positive balance",
      "Calling the $328,767 release an annual profit",
    ],
  },

  "FM-04::liquidity-profitability": {
    title: "Balancing working-capital liquidity and profitability",
    format: "written",
    marks: 10,
    requirement:
      "A retailer intends to reduce inventory holdings, tighten customer credit and delay payments to suppliers in order to improve profitability. Discuss the likely effects on profitability, liquidity and risk. (10 marks)",
    plan: [
      {
        step: "Use the three proposals as headings",
        detail:
          "For inventory, receivables and payables, give the financing benefit and the operational or relationship cost. This produces applied balance instead of a generic liquidity-versus-profitability paragraph.",
      },
      {
        step: "Trace each change through cash and profit",
        detail:
          "Lower investment releases cash and reduces financing cost, but stockouts, lost credit sales or forfeited supplier discounts can reduce contribution. Cash release and accounting profit are not the same effect.",
      },
      {
        step: "Identify the risk transfer",
        detail:
          "An aggressive policy accepts more disruption and refinancing risk for a lower expected funding cost. Ratios may improve temporarily while commercial relationships and resilience deteriorate.",
      },
      {
        step: "Recommend an optimum, not a minimum",
        detail:
          "The objective is the level that maximises value after service, default, discount and financing consequences. Use customer quality, supplier terms, lead times and demand variability to justify different limits.",
      },
    ],
    answer:
      "Reducing **inventory** releases cash, lowers storage, insurance, obsolescence and financing costs, and may improve margins. If cut too far it causes stockouts, emergency orders, idle production and lost customers; uncertain demand and long lead times require a buffer.\n\nTightening **receivables** reduces bad debts, administration and the investment financed while customers owe money. However, credit is part of the sales offer. Shorter terms or stricter limits can lose customers and contribution, especially if competitors remain generous. The policy should distinguish customer risk rather than apply one limit to all.\n\nDelaying **payables** is an apparently free source of finance and improves immediate liquidity. It may forfeit early-payment discounts, damage supply continuity and credit rating, lead to higher prices or breach agreed terms. It also shifts liquidity pressure to suppliers.\n\nThe proposals shorten the cash cycle and reduce finance cost, but greater profitability is not automatic. The retailer should compare the incremental financing and bad-debt savings with lost contribution, discounts and disruption costs, and maintain covenant and contingency headroom. The optimum working-capital level balances return and risk; driving every balance to its minimum can destroy value while making a period-end current ratio look better.",
    earns: [
      "Giving both cash/finance benefits and commercial costs for all three proposals",
      "Separating one-off cash release from recurring profit effects",
      "Recommending an optimum based on customer, supplier and operating evidence",
    ],
    loses: [
      "Assuming lower working capital always increases profitability",
      "Calling delayed payment free finance without testing discounts and relationships",
      "Discussing ratios without tracing effects into cash flow and contribution",
    ],
  },

  "FM-04::overtrading": {
    title: "Diagnosing overtrading before growth exhausts cash",
    format: "written",
    marks: 10,
    requirement:
      "A company reports rapidly rising sales and profit, but inventory and receivable days are increasing, the current ratio has fallen, the overdraft is at its limit and suppliers are being paid late. Explain whether the company is overtrading and recommend actions. (10 marks)",
    plan: [
      {
        step: "Define overtrading through the contradiction",
        detail:
          "Overtrading is profitable growth without enough long-term finance or working-capital capacity. The key signal is not loss but a widening cash requirement that outruns internally generated funds.",
      },
      {
        step: "Build an evidence chain from the facts",
        detail:
          "Growth puts cash into additional inventory and receivables before customer receipts arrive. Rising days show control is also weakening; the overdraft limit and late suppliers show the funding gap has become acute.",
      },
      {
        step: "Separate immediate stabilisation from structural repair",
        detail:
          "Immediate actions include cash forecasting, collection, stock control and negotiated supplier or bank arrangements. Structural actions include slower growth, longer-term finance, retained profit or equity and improved margins.",
      },
      {
        step: "Avoid a cure that creates a second failure",
        detail:
          "Do not demand customers pay instantly or stop all purchasing without assessing lost contribution and continuity. Select profitable orders, price for cash-cycle cost and align the growth rate with sustainable funding.",
      },
    ],
    answer:
      "The company shows classic **overtrading**: sales and accounting profit are growing faster than the finance available to support working capital. Each extra sale may require inventory to be bought and wages paid before the receivable is collected. Rising inventory and receivable **days**, not merely balances, show that operating control has weakened as volume grew. The falling current ratio, exhausted overdraft and late suppliers show that the resulting funding gap is now threatening solvency. A profitable company can fail because profit is not cash.\n\nImmediate action should begin with a rolling cash forecast, aggressive collection of overdue accounts, customer credit limits, removal of slow inventory and negotiated rather than unannounced extensions with suppliers. The company should speak to its bank before breaching the overdraft and arrange a committed facility if viable.\n\nStructurally, management can slow or phase growth, reject low-margin customers with long credit periods, improve pricing and deposits, retain more profit, inject equity or replace permanent overdraft use with long-term finance. Inventory and order systems need capacity to scale.\n\nThe aim is not to stop valuable growth but to ensure its contribution, cash cycle and permanent funding are compatible. Further volume that deepens the cash deficit is not value creation.",
    earns: [
      "Explaining why profitable growth can create an increasing cash deficit",
      "Using both rising days and exhausted facilities as diagnosis",
      "Separating immediate cash control from long-term finance and growth decisions",
    ],
    loses: [
      "Rejecting overtrading because reported profit is increasing",
      "Listing liquidity ratios without explaining the growth mechanism",
      "Recommending indiscriminate cuts that sacrifice profitable customers or supply continuity",
    ],
  },

  /* ── FM-05 · Managing inventory ───────────────────────────────────────── */

  "FM-05::costs": {
    title: "Using the provided EOQ formula without losing the bases",
    format: "ot",
    marks: 2,
    requirement:
      "Annual demand is 50,000 units, the cost of placing an order is $80 and annual holding cost is $5 per unit. What is the economic order quantity?\n\nA 894 units\nB 1,265 units\nC 1,789 units\nD 1,600 units",
    plan: [
      {
        step: "Pull the EOQ formula from the on-screen sheet",
        detail:
          "FM provides the formula, so copy its variable meanings before substituting: annual demand D, cost per order Co and annual holding cost per unit Ch. The exam tests selection and units, not formula memorisation.",
      },
      {
        step: "Substitute once and keep the square root visible",
        detail:
          "Calculate 2 × 80 × 50,000 / 5 = 1,600,000 and then take the square root. Writing the inside value separately prevents the calculator sequence from hiding an omitted factor of two.",
      },
      {
        step: "Use the cost equality as a check",
        detail:
          "At the EOQ, annual ordering cost and holding cost are approximately equal: 50,000/1,265 × $80 and 1,265/2 × $5 are both about $3,162.",
      },
    ],
    answer:
      "**B — 1,265 units.** The EOQ formula is provided on FM's on-screen formula sheet:\n\nEOQ = √(2CoD / Ch) = √(2 × $80 × 50,000 / $5) = √1,600,000 = **1,264.9 units**.\n\n**A (894)** omits the factor of two. **C (1,789)** effectively halves the holding-cost input. **D (1,600)** mishandles the square root/units. The check is that ordering cost is about 39.53 orders × $80 = **$3,162**, and holding cost is 632.45 units × $5 = **$3,162**. Equal relevant costs confirm the EOQ route.",
    earns: [
      "Selecting the provided EOQ formula and matching all three inputs to its variables",
      "Checking that annual ordering and holding costs are equal at the result",
    ],
    loses: [
      "Omitting the factor of two or failing to take the square root",
      "Using purchase price as holding cost when a per-unit annual holding amount is given",
    ],
  },

  "FM-05::discounts": {
    title: "Testing bulk discounts against total annual cost",
    format: "mtq",
    marks: 10,
    requirement:
      "A company requires 20,000 units a year. Ordering cost is $100. Unit price is $10 below 2,000 units, $9.80 for orders of at least 2,000 and $9.60 for orders of at least 5,000. Holding cost is 20% of unit price. Calculate the relevant EOQs, total annual costs at feasible candidates and the optimal order quantity. (10 marks)",
    plan: [
      {
        step: "Calculate an EOQ for each price band",
        detail:
          "Holding cost changes with price, so the EOQ changes too. Use the provided formula at each price, but discard an EOQ that does not satisfy the minimum quantity for its discount band.",
      },
      {
        step: "Retain boundary quantities as candidates",
        detail:
          "Where a discounted EOQ is infeasible, the minimum quantity that earns that price may still minimise total cost. Test 2,000 and 5,000 rather than assuming the undiscounted EOQ remains best.",
      },
      {
        step: "Use the full total-cost expression",
        detail:
          "Total annual cost equals purchase cost plus ordering cost plus holding cost. Purchase cost is constant only when unit price is constant; once a discount exists it dominates the comparison and cannot be omitted.",
      },
      {
        step: "Compare like with like and conclude",
        detail:
          "Present each candidate in the same four-column table. The lowest relevant total cost wins, even if that quantity is far above the stand-alone EOQ and has higher holding cost.",
      },
    ],
    answer:
      "The holding costs per unit are $2.00, $1.96 and $1.92. The EOQs are approximately **1,414**, **1,429** and **1,443** units respectively. Only 1,414 is feasible in its own price band; the discounted EOQs are below their minimum order sizes, so test the boundaries 2,000 and 5,000.\n\n| Order quantity | Purchase cost | Ordering cost | Holding cost | Total |\n|---:|---:|---:|---:|---:|\n| 1,414 at $10.00 | $200,000 | $1,414 | $1,414 | **$202,828** |\n| 2,000 at $9.80 | $196,000 | $1,000 | $1,960 | **$198,960** |\n| 5,000 at $9.60 | $192,000 | $400 | $4,800 | **$197,200** |\n\nThe optimal order quantity is **5,000 units**, with total annual cost $197,200. The larger batch increases holding cost, but the $8,000 purchase saving against the full-price option more than compensates. The standard distractor compares ordering plus holding cost only and wrongly chooses 1,414, treating purchase cost as constant after the unit price has changed.",
    earns: [
      "Recalculating holding cost and EOQ for each price band",
      "Testing discount boundary quantities when discounted EOQs are infeasible",
      "Including purchase cost in the total comparison and selecting $197,200",
    ],
    loses: [
      "Automatically choosing the stand-alone EOQ",
      "Applying the discount price to a quantity below its threshold",
      "Omitting purchase cost once quantity discounts make it relevant",
    ],
  },

  "FM-05::ebq-buffer": {
    title: "Combining batch production with reorder and buffer levels",
    format: "mtq",
    marks: 10,
    requirement:
      "Annual demand is 24,000 units, setup cost is $150, holding cost is $3 per unit and production capacity is 60,000 units a year. Maximum usage is 120 units a day, average usage 90, maximum lead time eight days and average lead time five days. Calculate the economic batch quantity, maximum batch inventory, reorder level and minimum inventory level, and explain one limitation. (10 marks)",
    plan: [
      {
        step: "Use the provided production-batch relationship",
        detail:
          "Select the economic batch quantity formula from the on-screen sheet and identify D/R as the fraction of production consumed while the batch is made. Do not apply ordinary EOQ when replenishment is gradual.",
      },
      {
        step: "Separate batch maximum from reorder safety",
        detail:
          "Maximum inventory generated by a production batch is EBQ × (1 − D/R), not the full batch. Reorder level concerns demand during lead time and is a separate stock-control calculation.",
      },
      {
        step: "Use conservative inputs for the reorder point",
        detail:
          "Reorder level uses maximum usage × maximum lead time. Minimum inventory then subtracts average usage during average lead time; mixing maxima and averages in the wrong places creates the case distractors.",
      },
      {
        step: "Interpret the assumptions",
        detail:
          "The model assumes stable demand, production rate, setup and holding costs with no shortage cost. A calculated buffer is only as reliable as the demand and lead-time observations supporting it.",
      },
    ],
    answer:
      "EBQ = √[2 × $150 × 24,000 / ($3 × (1 − 24,000/60,000))] = √4,000,000 = **2,000 units**.\n\nBecause production is gradual, maximum inventory from the batch is 2,000 × (1 − 24,000/60,000) = **1,200 units**, not 2,000.\n\nReorder level = maximum usage × maximum lead time = 120 × 8 = **960 units**.\n\nMinimum inventory = reorder level − average usage during average lead time = 960 − (90 × 5) = **510 units**.\n\nThe 2,000-unit distractor for maximum inventory assumes instantaneous delivery as under EOQ. A reorder point of 450 uses averages and provides no protection against the stated maximum. In practice, demand and lead time may be correlated or change over time, setup and holding costs are estimates, and stockouts have customer and production consequences not captured by the formula.",
    earns: [
      "Adjusting the batch quantity for simultaneous production and usage",
      "Using maximum conditions for reorder level and averages for the minimum level",
      "Explaining a limitation tied to uncertain demand, lead time or costs",
    ],
    loses: [
      "Treating the entire batch as maximum inventory",
      "Using average usage and lead time for the reorder trigger",
      "Combining the buffer-stock and batch-size calculations as though they were one model",
    ],
  },

  /* ── FM-06 · Managing receivables and payables ────────────────────────── */

  "FM-06::credit-policy": {
    title: "Evaluating a credit-policy change in the spreadsheet",
    format: "written",
    marks: 20,
    requirement:
      "A company has annual credit sales of $10 million, a contribution margin of 30%, receivable days of 40 and bad debts of 1% of sales. A more generous policy is forecast to increase sales to $12 million, receivable days to 60 and bad debts to 2.5%. Variable costs are 70% of sales, extra administration will cost $40,000 and the required return on receivables is 12%.\n\n(a) Calculate the net annual financial effect of the proposal. (12 marks)\n(b) Discuss whether the policy should be adopted. (8 marks)",
    plan: [
      {
        step: "Respect the 12 calculation, 8 discussion split",
        detail:
          "A perfect calculation with no discussion has a hard ceiling of twelve. Use the spreadsheet for a labelled current/proposed/incremental table, then reserve time for customer quality, assumptions and implementation.",
      },
      {
        step: "Take contribution only on incremental sales",
        detail:
          "The existing $10m sales already earn their contribution. The benefit is 30% of the $2m increase. Do not add the entire proposed contribution as though the current business disappears.",
      },
      {
        step: "Calculate the incremental investment at variable cost",
        detail:
          "Receivables contain profit that does not require financing. Compare current and proposed receivables using 70% variable cost × days/365, then apply 12% to the increase, not to the full proposed balance.",
      },
      {
        step: "Increment every changed cost",
        detail:
          "Bad-debt cost rises from 1% of current sales to 2.5% of proposed sales. Add the extra administration and financing cost; keep each line visible for method marks and reconcile to the net benefit.",
      },
      {
        step: "Derive the eight discussion marks from assumptions",
        detail:
          "Challenge forecast volume and margin, customer credit quality, collection capacity, funding availability and whether all customers need 60 days. Recommend limits, scoring and monitoring rather than a bare accept/reject.",
      },
    ],
    answer:
      "**Spreadsheet workings**\n\n| Annual effect | Working | $ |\n|---|---:|---:|\n| Incremental contribution | ($12m − $10m) × 30% | **600,000** |\n| Current bad debts | $10m × 1% | 100,000 |\n| Proposed bad debts | $12m × 2.5% | 300,000 |\n| Incremental bad debts | 300,000 − 100,000 | **(200,000)** |\n| Current receivables investment | $10m × 70% × 40/365 | 767,123 |\n| Proposed receivables investment | $12m × 70% × 60/365 | 1,380,822 |\n| Incremental investment | 1,380,822 − 767,123 | 613,699 |\n| Financing cost | $613,699 × 12% | **(73,644)** |\n| Extra administration | given | **(40,000)** |\n| **Net annual benefit** | 600,000 − 200,000 − 73,644 − 40,000 | **286,356** |\n\nOn the stated figures the proposal adds about **$286,000 a year**, so it is financially attractive. The table proves the result: the four incremental lines reconcile to the net benefit.\n\nAdoption still depends on the forecasts. The $2m sales increase must be caused by credit rather than general market growth, the 30% contribution must survive any collection and fulfilment cost, and the 2.5% bad-debt estimate must reflect the weaker customers attracted. A 60-day policy for every customer may give credit unnecessarily to buyers who would pay earlier. The company also needs $614,000 of additional finance and capacity to administer and collect the larger ledger.\n\nManagement should introduce credit scoring and limits, offer terms by customer risk, monitor ageing and bad debts, and pilot the change. Sensitivity analysis on incremental sales, margin and default should identify the break-even assumptions. Accept with these controls if funding is available; do not adopt solely because revenue rises.",
    earns: [
      "Twelve-mark calculation shown as labelled spreadsheet workings",
      "Financing only the variable-cost investment and only the incremental balance",
      "Comparing current and proposed bad debts rather than charging the full proposed amount",
      "Eight-mark discussion derived from the calculation's assumptions and controls",
    ],
    loses: [
      "Using the full $3.6m proposed contribution instead of the $600,000 increment",
      "Applying 12% to sales revenue or the full proposed receivable balance",
      "Stopping at a positive number and forfeiting the eight discussion marks",
      "Assuming all customers need the same 60-day terms",
    ],
  },

  "FM-06::discounts": {
    title: "Calculating the annual cost of refusing a settlement discount",
    format: "ot",
    marks: 2,
    requirement:
      "A supplier offers terms of 2% discount for payment within 10 days; otherwise the invoice is due in 50 days. What is the effective annual cost of not taking the discount, using a 365-day year?\n\nA 2.04%\nB 18.62%\nC 20.24%\nD 22.90%",
    plan: [
      {
        step: "Identify the finance obtained and its price",
        detail:
          "Refusing the discount borrows the net amount that could have settled the invoice — 98 — for 40 extra days, and costs 2. The period rate is therefore 2/98, not 2/100.",
      },
      {
        step: "Compound over the saved-payment periods",
        detail:
          "There are 365/40 equivalent periods in a year. The effective annual cost is (1 + 2/98)^(365/40) − 1; this relationship is not handed to the candidate as a named FM formula, so know the financing logic.",
      },
      {
        step: "Name the three distractors",
        detail:
          "2.04% is one 40-day period only; 18.62% simple-annualises 2.0408% without compounding; 22.90% uses the wrong number of credit days. Select the compounded answer.",
      },
    ],
    answer:
      "**C — approximately 20.24%.** The company gives up $2 to retain $98 for 50 − 10 = **40 days**. The 40-day financing rate is 2/98 = **2.0408%**.\n\nEffective annual cost = (1 + 2/98)^(365/40) − 1 = **approximately 20.24%**.\n\n**A** is the unannualised 40-day rate. **B** is the simple annual rate, 2/98 × 365/40 = 18.62%, which ignores compounding. **D** uses a wrong time interval or base. Compare the effective 20.24% with the company's alternative short-term borrowing cost: if it can borrow for less and cash permits, taking the discount creates value.",
    earns: [
      "Using 2/98 for the 40-day financing period",
      "Compounding over 365/40 periods and comparing with alternative finance",
    ],
    loses: [
      "Dividing the discount by the gross invoice amount",
      "Using 50 days instead of the extra 40 days",
      "Reporting the simple annual rate when the requirement asks for effective cost",
    ],
  },

  "FM-06::factoring-payables": {
    title: "Comparing factoring savings with its full annual cost",
    format: "mtq",
    marks: 10,
    requirement:
      "A company has credit sales of $6 million, receivable days of 60, bad debts of 2% and receivables administration cost of $80,000. A factor will advance 80% of receivables at 10% interest, charge a 1% service fee, reduce bad debts to 0.5% and take over administration. Calculate the average receivables, factor advance, annual factor charges and net benefit, then state one qualitative issue. (10 marks)",
    plan: [
      {
        step: "Build the current receivable balance",
        detail:
          "Use credit sales × 60/365. The advance is 80% of that balance; factor interest is charged on the advance, not on annual sales or the full receivable ledger.",
      },
      {
        step: "Keep service fee and finance charge separate",
        detail:
          "The 1% service fee is applied to annual credit sales, while 10% interest applies to the average cash advance. Combining their percentages before identifying their different bases is the main numerical trap.",
      },
      {
        step: "Value only incremental savings",
        detail:
          "Bad debts fall from 2% to 0.5%, and administration cost disappears. Compare these savings with the factor's two charges to reach the net benefit; show all lines so the result reconciles.",
      },
      {
        step: "Add the commercial judgement",
        detail:
          "Consider recourse, customer relationships, confidentiality, service quality, concentration limits and whether the advance replaces other borrowing. A positive arithmetic result does not settle contract risk.",
      },
    ],
    answer:
      "Average receivables = $6m × 60/365 = **$986,301**. The 80% average advance is **$789,041**.\n\n| Annual effect | $ |\n|---|---:|\n| Service fee: 1% × $6m | (60,000) |\n| Interest: 10% × $789,041 | (78,904) |\n| Bad-debt saving: (2% − 0.5%) × $6m | 90,000 |\n| Administration saving | 80,000 |\n| **Net annual benefit** | **31,096** |\n\nThe proposal gives a **$31,096 annual benefit** before considering any finance cost displaced by the advance. If the advance replaces an overdraft, the avoided overdraft interest is an additional benefit and should be compared consistently.\n\nThe company must establish whether factoring is with or without recourse, how disputed or concentrated invoices are treated, whether customers will accept the factor's collection approach, and whether service quality or confidential customer information may suffer. Payables should not be stretched merely to imitate factoring finance: agreed supplier terms, discount cost and supply continuity must be evaluated separately.",
    earns: [
      "Applying interest to the 80% average advance and commission to annual sales",
      "Reconciling bad-debt and administration savings to the $31,096 net benefit",
      "Raising a contract-specific issue such as recourse or customer collection",
    ],
    loses: [
      "Charging 10% interest on $6 million of annual sales",
      "Counting the full current bad-debt cost as a saving when 0.5% remains",
      "Ignoring finance displaced by the advance when comparing alternatives",
    ],
  },

  /* ── FM-07 · Managing cash ────────────────────────────────────────────── */

  "FM-07::motives-budget": {
    title: "Building a cash budget that exposes the funding peak",
    format: "written",
    marks: 20,
    requirement:
      "A company forecasts sales ($000) of December 300, January 360, February 420 and March 480. Twenty per cent is cash sales and 80% is collected one month later. Purchases paid one month later were December 180, January 220 and February 260. Wages are 50, 55 and 60; cash overhead is 30 each month; equipment costing 200 is paid in February and tax of 80 in March. Opening January cash is 50.\n\n(a) Prepare a cash budget for January to March and identify the maximum finance required. (14 marks)\n(b) Explain why the company may hold cash and recommend actions. (6 marks)",
    plan: [
      {
        step: "Protect the 14 calculation, 6 discussion split",
        detail:
          "Build the three-month spreadsheet first but leave time for the motives and recommendation. A fully correct budget with no narrative cannot earn more than fourteen of the twenty marks.",
      },
      {
        step: "Translate every timing rule before entering amounts",
        detail:
          "Each month's receipts are 20% of that month's sales plus 80% of the previous month's sales. Purchases use the given one-month lag. Non-cash items would be excluded; equipment and tax go in their stated months.",
      },
      {
        step: "Roll the balance rather than restarting each month",
        detail:
          "Opening plus receipts minus payments equals closing, and that closing becomes next month's opening. The maximum finance is the most negative cumulative balance, not the largest single monthly deficit.",
      },
      {
        step: "Prove the table with the movement",
        detail:
          "Across the quarter, opening 50 plus total net cash flow of negative 49 must equal closing 1. This reconciliation catches a missed receipt or a monthly balance that was not carried forward.",
      },
      {
        step: "Derive discussion from the shortfall",
        detail:
          "Explain transaction, precautionary and speculative motives, then recommend a committed facility above the $31,000 peak plus contingency, collection and payment actions without sacrificing profitable relationships.",
      },
    ],
    answer:
      "**Cash budget ($000)**\n\n| | January | February | March |\n|---|---:|---:|---:|\n| Cash sales (20%) | 72 | 84 | 96 |\n| Collection of prior-month credit sales (80%) | 240 | 288 | 336 |\n| **Total receipts** | **312** | **372** | **432** |\n| Purchases paid | (180) | (220) | (260) |\n| Wages | (50) | (55) | (60) |\n| Cash overhead | (30) | (30) | (30) |\n| Equipment | — | (200) | — |\n| Tax | — | — | (80) |\n| **Net cash flow** | **52** | **(133)** | **32** |\n| Opening cash/(overdraft) | 50 | 102 | (31) |\n| **Closing cash/(overdraft)** | **102** | **(31)** | **1** |\n\nThe maximum forecast finance requirement is **$31,000 at the end of February**. The table reconciles: opening $50,000 + quarterly net outflow $49,000 = closing $1,000. Arrange a facility above $31,000 because forecasts are uncertain and payments may fall earlier than expected.\n\nCash is held for the **transaction motive** (routine mismatches between receipts and payments), **precautionary motive** (unexpected delay or cost) and **speculative motive** (opportunities such as a supplier discount). Excess cash has an opportunity cost, so the company should combine a rolling forecast, faster collection, negotiated payment timing and a committed overdraft or short facility. The February equipment payment is predictable and might instead be matched with suitable longer finance. Do not delay suppliers unilaterally or cut the buffer to zero merely because the base forecast recovers in March.",
    earns: [
      "A labelled spreadsheet budget with collection and payment lags in the correct months",
      "Rolling cumulative balances to identify the $31,000 funding peak",
      "Reconciling opening cash, total net flow and closing cash",
      "Using the six discussion marks for cash motives and applied finance actions",
    ],
    loses: [
      "Treating all sales as collected in the month of sale",
      "Calling February's $133,000 net outflow the maximum finance requirement",
      "Failing to carry February's overdraft into March",
      "Writing only the calculation and accepting a hard ceiling of fourteen marks",
    ],
  },

  "FM-07::models": {
    title: "Using Baumol and Miller–Orr for the right cash pattern",
    format: "mtq",
    marks: 10,
    requirement:
      "A company uses cash at a steady rate of $9 million a year. Each transfer from investments costs $45 and the annual opportunity cost is 5%. Calculate the Baumol transfer size, average cash balance and annual relevant cost, and explain when Miller–Orr would be more suitable and what its limits mean. (10 marks)",
    plan: [
      {
        step: "Select the model from the cash pattern",
        detail:
          "Baumol assumes a predictable steady net cash outflow replenished by transfers. Miller–Orr is designed for uncertain daily changes within control limits. Choosing the model is examined before arithmetic.",
      },
      {
        step: "Use the on-screen formulae sheet",
        detail:
          "FM provides the Baumol and Miller–Orr relationships. Copy the variables and units, then substitute annual cash need, transfer cost and annual interest consistently rather than rewarding memorisation.",
      },
      {
        step: "Calculate and cross-check Baumol",
        detail:
          "At the optimal transfer size, annual transaction cost and holding/opportunity cost should be approximately equal. Use average cash of one-half the transfer amount, not the full amount.",
      },
      {
        step: "Interpret Miller–Orr actions",
        detail:
          "When cash hits the upper limit, invest enough to return to the return point; at the lower limit, raise cash to the return point. Wider uncertainty or higher transfer cost widens the spread; higher interest narrows it.",
      },
    ],
    answer:
      "Using the provided Baumol formula:\n\nOptimal transfer = √(2 × $45 × $9,000,000 / 0.05) = **$127,279**.\n\nAverage cash balance = $127,279/2 = **$63,640**. Number of transfers = $9,000,000/$127,279 = **70.71**.\n\nAnnual transaction cost = 70.71 × $45 = **$3,182**. Annual holding cost = $63,640 × 5% = **$3,182**. Total relevant cost is therefore **$6,364**, and the equality checks the result.\n\nBaumol is unsuitable where daily net cash flows are random rather than a smooth drain. **Miller–Orr** sets a lower limit, return point and upper limit using cash-flow variance, transaction cost and interest. Reaching the upper limit triggers investment down to the return point; reaching the lower limit triggers a sale of investments or borrowing up to it. The model depends on historic variance and ignores changing rates, bank constraints and management's minimum-liquidity judgement, so its calculated boundaries are decision aids, not automatic treasury instructions.",
    earns: [
      "Selecting Baumol for steady cash use and using the formula supplied on screen",
      "Checking the result through equal transaction and holding costs",
      "Explaining Miller–Orr control actions and why uncertainty changes the spread",
    ],
    loses: [
      "Using the full transfer amount as average cash",
      "Choosing Baumol merely because its inputs are available despite volatile cash flows",
      "Treating the Miller–Orr return point as a permanent minimum balance",
    ],
  },

  "FM-07::surplus": {
    title: "Matching a temporary cash surplus to a safe instrument",
    format: "ot",
    marks: 2,
    requirement:
      "A company has a known cash surplus for three months before a tax payment falls due. Which investment is most appropriate?\n\nA Ordinary shares in a rapidly growing listed company\nB A three-month Treasury bill or matching term deposit\nC A ten-year corporate bond with an active secondary market\nD Additional inventory with an uncertain selling period",
    plan: [
      {
        step: "Fix the treasury priorities",
        detail:
          "For a temporary surplus committed to a known payment, security and liquidity at the required date come before maximum return. The maturity should match the three-month horizon.",
      },
      {
        step: "Reject price and operating risk",
        detail:
          "Shares and a long bond can fall in value before the tax date; an active market does not guarantee the price. Inventory is illiquid and its sale timing is explicitly uncertain.",
      },
      {
        step: "Confirm counterparty and maturity fit",
        detail:
          "A Treasury bill or creditworthy matching deposit provides a known maturity close to the liability. The company should still test counterparty limits, access and net yield.",
      },
    ],
    answer:
      "**B — a three-month Treasury bill or matching term deposit.** The cash has a known use and date, so the investment should preserve capital and mature when the tax is payable. **A** exposes the tax money to equity-price volatility. **C** has interest-rate price risk if sold after three months; secondary-market liquidity does not remove that risk. **D** converts cash into an uncertain operating asset and may not be realised in time. The distractor is chasing return while ignoring the liability that determines the investment horizon.",
    earns: [
      "Matching instrument maturity to the known tax-payment date",
      "Prioritising capital security and liquidity over speculative return",
    ],
    loses: [
      "Assuming an active secondary market guarantees the bond's sale value",
      "Treating surplus cash as permanent and ignoring the three-month liability",
    ],
  },

  /* ── FM-08 · Working capital needs and funding strategy ───────────────── */

  "FM-08::permanent-fluctuating": {
    title: "Separating permanent from fluctuating current assets",
    format: "ot",
    marks: 2,
    requirement:
      "A seasonal business has current assets of at least $4 million throughout the year and a peak of $7 million. Which statement is correct?\n\nA Permanent current assets are $7 million and fluctuating current assets are nil\nB Permanent current assets are $4 million and fluctuating current assets peak at $3 million\nC Permanent current assets are $3 million and fluctuating current assets are $4 million\nD All $7 million are fluctuating because they are classified as current assets",
    plan: [
      {
        step: "Use behaviour rather than accounting classification",
        detail:
          "Permanent current assets are the minimum inventory, receivables and cash continually required for operations. Fluctuating current assets are the seasonal amount above that base.",
      },
      {
        step: "Read trough and peak directly",
        detail:
          "The $4m trough is the permanent requirement. At the $7m peak, the additional $3m is fluctuating. Current in the statement of financial position does not mean temporary in financing analysis.",
      },
      {
        step: "Connect the result to funding",
        detail:
          "A matching policy would fund the permanent $4m from long-term sources and use short-term finance for up to $3m seasonally, subject to refinancing risk and practical buffer needs.",
      },
    ],
    answer:
      "**B — permanent current assets are $4 million and fluctuating current assets peak at $3 million.** The minimum balance required all year behaves like a long-term asset for financing purposes even though inventory, receivables and cash are legally current assets. The seasonal excess is $7m − $4m = $3m. **A** mistakes the peak for the permanent base; **C** swaps the components; **D** confuses accounting classification with the duration of the finance need.",
    earns: [
      "Using the annual trough as the permanent current-asset requirement",
      "Calculating the seasonal excess and linking it to matching finance",
    ],
    loses: [
      "Treating every current asset as a short-term financing need",
      "Using the peak rather than the minimum as the permanent amount",
    ],
  },

  "FM-08::policies": {
    title: "Comparing aggressive, matching and conservative funding",
    format: "written",
    marks: 10,
    requirement:
      "Explain aggressive, matching and conservative working-capital funding policies and discuss their effects on profitability, liquidity and risk. (10 marks)",
    plan: [
      {
        step: "Draw the same asset layers for all three",
        detail:
          "Separate non-current assets, permanent current assets and fluctuating current assets. Then state which layer is funded long term or short term under each policy; labels without this mapping earn little.",
      },
      {
        step: "Derive return from the funding cost",
        detail:
          "Short-term finance is often cheaper and flexible, so more of it may raise expected profitability. Long-term finance provides certainty but can leave expensive surplus cash in seasonal troughs.",
      },
      {
        step: "Derive risk from maturity mismatch",
        detail:
          "Funding permanent assets with short maturities creates refinancing and interest-rate exposure. Funding temporary assets long term reduces that exposure but creates negative carry and temptation to misuse surplus funds.",
      },
      {
        step: "Reject a universal ranking",
        detail:
          "Recommend by cash-flow predictability, access to committed facilities, yield curve, covenant headroom and risk appetite. The cheapest expected policy may not maximise value once distress risk is included.",
      },
    ],
    answer:
      "A **matching policy** funds non-current and permanent current assets with long-term finance and fluctuating current assets with short-term finance. Asset life and finance maturity broadly align, balancing cost and refinancing risk.\n\nAn **aggressive policy** uses short-term finance for all fluctuating and part of permanent current assets. Because short rates are often lower, expected financing cost may fall and profitability rise. However, permanent needs must be repeatedly refinanced; rates may rise, facilities may be withdrawn and a liquidity crisis can occur even when assets remain productive.\n\nA **conservative policy** uses long-term finance for all permanent assets and part or all of the seasonal peak. It offers committed liquidity and low refinancing exposure. At the trough, unused long-term funds sit in low-return liquid investments, creating negative carry and lowering profitability; long-term debt may also carry covenants or early-repayment cost.\n\nNo policy is automatically best. Stable, forecastable seasonal cash flows and strong bank access can support more short finance; volatile demand, concentrated lenders or fragile credit quality justify a conservative buffer. The decision should compare expected after-tax cost with refinancing, rate, covenant and distress risk, then test the cash forecast under stress.",
    earns: [
      "Mapping each policy to permanent and fluctuating asset layers",
      "Deriving both cost and risk consequences from finance maturity",
      "Recommending according to cash-flow and facility evidence",
    ],
    loses: [
      "Defining aggressive as simply holding fewer current assets rather than a funding policy",
      "Claiming short-term finance is always cheaper and therefore optimal",
      "Ignoring surplus-fund cost under a conservative policy",
    ],
  },

  "FM-08::determinants": {
    title: "Explaining why working-capital needs differ by company",
    format: "written",
    marks: 10,
    requirement:
      "Two companies have equal annual sales: a supermarket selling for cash and a custom machinery manufacturer offering 60-day credit. Explain the factors that cause their working-capital requirements and cycles to differ. (10 marks)",
    plan: [
      {
        step: "Use paired comparisons throughout",
        detail:
          "For each factor state its effect on the supermarket and the manufacturer. Two generic lists lose the opportunity to show why equal revenue does not mean equal financing need.",
      },
      {
        step: "Start with operating-cycle mechanics",
        detail:
          "Compare production and inventory lead time, customer credit, supplier terms and cash-sales timing. These determine how long cash is committed before it returns.",
      },
      {
        step: "Add scale, variability and bargaining power",
        detail:
          "Seasonality, growth, product perishability, demand uncertainty, gross margin, purchasing terms and customer concentration change both the size and risk of balances.",
      },
      {
        step: "Separate policy from industry necessity",
        detail:
          "Some needs follow the business model, but credit limits, production scheduling, inventory systems and supplier negotiation remain management choices. Conclude on cash cycle rather than on sales alone.",
      },
    ],
    answer:
      "The supermarket receives cash or card proceeds immediately, so receivables are minimal. It may sell inventory before paying large suppliers, producing a short or even negative cash cycle. Fast turnover and perishability limit average inventory, while high purchasing power may secure long credit. Its needs still rise with seasonal stock builds, rapid growth or precautionary cash for daily transactions.\n\nThe machinery manufacturer buys specialist inputs, holds work in progress through a long production period and may retain finished equipment pending acceptance. Offering 60-day credit then extends the wait after delivery. Bespoke inventory is less saleable elsewhere and customer concentration makes late payment more damaging. Deposits and stage payments can shorten the cycle; supplier credit may be limited for specialised parts.\n\nOther determinants include sales growth, margin, demand variability, lead times, supply reliability, inflation, access to finance, bargaining power and management's risk appetite. Equal annual sales therefore say little about the investment required. The relevant measures are days and cash tied in inventory, receivables and payables, the variability of that cycle and the cost of operating policies used to control it.",
    earns: [
      "Contrasting the two business models factor by factor",
      "Explaining how cash sales, production time and credit terms drive the cycle",
      "Separating unavoidable industry features from controllable policies",
    ],
    loses: [
      "Assuming equal sales imply equal working-capital balances",
      "Listing factors without showing their direction for either company",
      "Ignoring work in progress and stage payments in a custom manufacturer",
    ],
  },

  "FM-08::identify-the-policy": {
    title: "Identifying a funding policy from the numbers",
    format: "written",
    marks: 20,
    requirement:
      "A company has non-current assets of $10 million. Current assets range from a permanent minimum of $4 million to a seasonal peak of $7 million and average $5.5 million. Long-term finance is $15 million; any remaining asset requirement is financed short term. Long-term finance costs 8% and short-term finance 5%.\n\n(a) Identify and quantify the current working-capital funding policy and compare its average annual financing cost with a matching policy. (12 marks)\n(b) Discuss the return and risk implications and recommend a policy. (8 marks)",
    plan: [
      {
        step: "Honour the 12 calculation, 8 discussion allocation",
        detail:
          "Use a labelled sources-and-uses table for the arithmetic, then write the risk analysis. A perfect $30,000 saving calculation without discussion cannot score above twelve.",
      },
      {
        step: "Strip long-term funds down to current assets",
        detail:
          "$15m long-term finance less $10m non-current assets leaves $5m for current assets. Compare that with the $4m permanent layer and the $7m peak to identify the policy from evidence.",
      },
      {
        step: "Calculate both policies on the same average base",
        detail:
          "Current policy funds $5m long term and the average excess $0.5m short term. Matching funds $4m long term and the average seasonal $1.5m short term. Apply the relevant rates to each source.",
      },
      {
        step: "Show the peak and trough exposure",
        detail:
          "At the peak current policy needs $2m short term; matching needs $3m. At the trough current policy carries $1m surplus long-term funding, explaining its higher cost and greater liquidity buffer.",
      },
      {
        step: "Derive discussion from the measured mismatch",
        detail:
          "Evaluate refinancing, rate and cash-flow risk against the $30,000 average saving, committed facilities and predictability. Recommend a controlled buffer rather than assuming either textbook label is automatically best.",
      },
    ],
    answer:
      "**(a) Funding analysis ($m)**\n\nLong-term finance available for current assets = $15m − $10m non-current assets = **$5m**. Permanent current assets are $4m, so $1m of the fluctuating layer is financed long term. The policy is therefore **conservative relative to matching**. At the $7m peak it uses $2m short-term finance; at the $4m trough it has $1m surplus long-term finance.\n\n| Average financing of current assets | Current policy | Matching policy |\n|---|---:|---:|\n| Long term | $5.0m × 8% = $400,000 | $4.0m × 8% = $320,000 |\n| Short term | $0.5m × 5% = $25,000 | $1.5m × 5% = $75,000 |\n| **Average annual cost** | **$425,000** | **$395,000** |\n\nA matching policy saves **$30,000 a year** on the stated average balances. The calculation foots: each column finances the same $5.5m average current assets.\n\n**(b) Discussion**\n\nThe current policy pays a higher rate on $1m that is only seasonally required and may earn a low deposit return at the trough, reducing profitability. In exchange it reduces the peak short-term requirement from $3m under matching to $2m and provides a liquidity buffer. That lowers refinancing and interest-rate risk if banks withdraw facilities or seasonal assets remain high longer than forecast.\n\nMatching improves expected return by $30,000 but makes the company more dependent on short-term markets precisely at its seasonal peak. The saving must be judged against facility commitment fees, rollover stress, rate volatility and the cost of disruption. If seasonal cash flows are predictable and a committed $3m facility has ample covenant headroom, moving towards matching is reasonable. If demand is volatile or bank access fragile, retain part of the $1m buffer. A policy between the two may maximise value after distress risk.",
    earns: [
      "Twelve-mark calculation that reconciles $5.5m of average current assets in both columns",
      "Identifying the $1m long-term funding of fluctuating assets as conservative",
      "Quantifying peak short-term needs and the $30,000 matching-policy saving",
      "Using eight discussion marks to evaluate the measured cost-risk trade-off",
    ],
    loses: [
      "Calling the policy aggressive because any short-term finance is used",
      "Comparing financing costs on different asset totals",
      "Ignoring the $1m trough surplus and $2m peak short-term requirement",
      "Giving a calculation-only answer and accepting the twelve-mark ceiling",
    ],
  },
}
