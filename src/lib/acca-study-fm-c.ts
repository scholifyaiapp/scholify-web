import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area C — Working capital management.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Every figure re-solved
 * from first principles.
 */

export const FM_C: StudyChapter = {
  paper: "FM",
  area: "C",
  title: "Working capital management",
  minutes: 18,
  intro: "Profit is an opinion; cash is a fact. A business can be profitable on paper and still fail because it runs out of money — working capital management is how you stop that happening.",
  outcomes: [
    "Explain the objectives of working capital and the trade-off between liquidity and profitability",
    "Calculate the cash operating cycle and interpret what lengthens or shortens it",
    "Apply the EOQ model, bulk-discount logic and JIT to managing inventory",
    "Evaluate an early settlement discount and choose between factoring with and without recourse",
    "Use the Baumol and Miller-Orr models to manage cash, and recognise the signs of overtrading",
    "Distinguish aggressive, conservative and matching working-capital funding strategies",
  ],
  sections: [
    {
      id: "nature",
      heading: "The nature and objectives of working capital",
      blocks: [
        { kind: "text", md: "**Working capital** is the money tied up in the day-to-day running of a business: **inventory + receivables − payables**, plus the cash buffer that oils the machine. Net working capital is simply **current assets − current liabilities**. It is not idle — it is constantly cycling: cash buys inventory, inventory is sold on credit to create receivables, receivables turn back into cash, and suppliers (payables) fund part of the loop for free." },
        { kind: "text", md: "Every working-capital decision is a tug-of-war between two goals that pull in opposite directions. Hold plenty of inventory, offer generous credit and sit on a fat cash balance and you are highly **liquid** — you will always be able to pay your bills — but every dollar parked in a current asset earns nothing, so **profitability** falls. Squeeze inventory, chase debtors hard and run cash to the bone and profitability rises, but one bad month and you cannot pay a supplier. Good management finds the point where the business is liquid enough to survive and lean enough to prosper." },
        { kind: "callout", tone: "key", title: "The central trade-off", md: "**Liquidity vs profitability.** More working capital = safer but less profitable; less working capital = more profitable but riskier. The objective is the optimum level, not the maximum or the minimum." },
        { kind: "formula", name: "Net working capital", expr: "Net working capital = Current assets − Current liabilities" },
        { kind: "formula", name: "Current ratio", expr: "Current ratio = Current assets ÷ Current liabilities", note: "A broad measure of short-term solvency; a ratio well below 1 signals liquidity strain." },
        { kind: "formula", name: "Quick (acid-test) ratio", expr: "Quick ratio = (Current assets − Inventory) ÷ Current liabilities", note: "Strips out inventory, the least liquid current asset, for a tougher test." },
        { kind: "text", md: "The single most useful measure of how much working capital a business needs is the **cash operating cycle** (also called the working-capital cycle or cash conversion cycle): the number of days between paying a supplier for goods and collecting the cash from selling them. The longer the cycle, the longer the business must finance itself, and the more working capital it ties up." },
        { kind: "formula", name: "Cash operating cycle", expr: "Cash operating cycle = Inventory days + Receivables days − Payables days" },
        { kind: "formula", name: "Inventory days", expr: "Inventory days = (Average inventory ÷ Cost of sales) × 365" },
        { kind: "formula", name: "Receivables days", expr: "Receivables days = (Average receivables ÷ Credit sales) × 365" },
        { kind: "formula", name: "Payables days", expr: "Payables days = (Average payables ÷ Credit purchases) × 365", note: "Payables are SUBTRACTED — supplier credit is free finance that shortens the cycle." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How the cash operating cycle builds up",
          caption: "Cash is locked up while goods sit in the store and while customers owe you; supplier credit gives some of it back.",
          data: {
            steps: [
              { label: "Buy inventory on credit", sub: "cash not yet paid" },
              { label: "Hold inventory", sub: "+ inventory days" },
              { label: "Sell on credit", sub: "+ receivables days" },
              { label: "Pay supplier", sub: "− payables days" },
              { label: "Collect cash", sub: "= cash operating cycle" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — computing the cash operating cycle", scenario: "Delta Trading reports: average inventory $120,000; cost of sales $730,000; average trade receivables $135,000; credit sales $1,095,000; average trade payables $80,000; credit purchases $584,000. Calculate the cash operating cycle in days (use a 365-day year).", steps: [
          { label: "Inventory days", detail: "(120,000 ÷ 730,000) × 365. Cost of sales per day = 730,000 ÷ 365 = 2,000. So 120,000 ÷ 2,000 = **60 days**." },
          { label: "Receivables days", detail: "(135,000 ÷ 1,095,000) × 365. Credit sales per day = 1,095,000 ÷ 365 = 3,000. So 135,000 ÷ 3,000 = **45 days**." },
          { label: "Payables days", detail: "(80,000 ÷ 584,000) × 365. Credit purchases per day = 584,000 ÷ 365 = 1,600. So 80,000 ÷ 1,600 = **50 days**." },
          { label: "Combine", detail: "Cycle = 60 + 45 − 50 = **55 days**." },
        ], result: "The cash operating cycle is 55 days: Delta finances itself for 55 days between paying suppliers and collecting from customers. Cutting inventory or receivables days, or stretching payables days, would shorten it and release cash." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "The 55-day cycle as a bridge",
          caption: "Inventory and receivables add days; payables (free supplier finance) take them away.",
          data: {
            unit: "days",
            items: [
              { label: "Inventory days", value: 60, kind: "start" },
              { label: "+ Receivables days", value: 45, kind: "delta" },
              { label: "− Payables days", value: -50, kind: "delta" },
              { label: "Cash operating cycle", value: 55, kind: "total" },
            ],
          },
        } },
      ],
      check: {
        q: "A company shortens its cash operating cycle from 55 days to 40 days. Holding everything else constant, what is the most likely effect?",
        options: [
          "It needs MORE working capital finance",
          "It needs LESS working capital finance and frees up cash",
          "Its profit automatically doubles",
          "Its payables days must have fallen",
        ],
        correct: 1,
        explain: "A shorter cycle means cash is tied up for fewer days, so the business finances itself for less time and releases cash — it needs LESS working-capital finance. Note a shorter cycle can come from FEWER inventory or receivables days OR MORE payables days, so option 4 is wrong; and the cycle length says nothing directly about profit doubling.",
      },
    },
    {
      id: "inventory",
      heading: "Managing inventory — EOQ, bulk discounts and JIT",
      blocks: [
        { kind: "text", md: "Inventory is expensive to hold — warehousing, insurance, obsolescence and the finance cost of the cash locked inside it — but expensive to run short of, because each delivery carries an ordering cost and a stock-out loses sales. The **Economic Order Quantity (EOQ)** is the order size that minimises the total of **holding costs + ordering costs**. It is the point where, as order size rises, the falling ordering cost exactly offsets the rising holding cost." },
        { kind: "formula", name: "Economic Order Quantity (EOQ)", expr: "EOQ = √( 2 × C0 × D ÷ Ch )", note: "C0 = cost per order; D = annual demand (units); Ch = holding cost per unit per year." },
        { kind: "formula", name: "Total annual ordering cost", expr: "Ordering cost = (D ÷ Q) × C0", note: "D ÷ Q = number of orders placed per year." },
        { kind: "formula", name: "Total annual holding cost", expr: "Holding cost = (Q ÷ 2) × Ch", note: "Q ÷ 2 = average inventory held, assuming steady demand and no buffer stock." },
        { kind: "callout", tone: "rule", title: "The EOQ signature", md: "At the EOQ, **total annual ordering cost equals total annual holding cost**. If a calculation gives you two very different figures, re-check the arithmetic — at the true optimum they match." },
        { kind: "example", title: "Worked example — finding the EOQ", scenario: "Orion Ltd uses 40,000 units of a component per year. Each order costs $50 to place and process. Holding one unit for a year costs $4. Find the EOQ, the number of orders per year, and the total annual ordering and holding cost.", steps: [
          { label: "Plug into the EOQ formula", detail: "EOQ = √(2 × 50 × 40,000 ÷ 4)." },
          { label: "Work the top line", detail: "2 × 50 × 40,000 = 4,000,000." },
          { label: "Divide by Ch", detail: "4,000,000 ÷ 4 = 1,000,000." },
          { label: "Square root", detail: "√1,000,000 = **1,000 units** per order." },
          { label: "Orders per year", detail: "D ÷ Q = 40,000 ÷ 1,000 = 40 orders. Ordering cost = 40 × 50 = **$2,000**." },
          { label: "Holding cost", detail: "Average inventory = 1,000 ÷ 2 = 500 units. Holding cost = 500 × 4 = **$2,000**." },
        ], result: "EOQ = 1,000 units, ordered 40 times a year. Ordering cost ($2,000) equals holding cost ($2,000) — the tell-tale sign of the true optimum — for a total relevant cost of $4,000." },
        { kind: "text", md: "**Bulk discounts** break the tidy EOQ answer. A supplier offering a lower unit price for larger orders tempts you above the EOQ. You cannot just take the discount — you must compare the **total annual cost** (purchase cost + ordering cost + holding cost) at the EOQ against the total cost at each discount threshold, and pick the lowest. The discount saves on purchase price but raises holding cost (bigger average inventory) and cuts ordering cost (fewer orders); only the total tells you which wins." },
        { kind: "text", md: "**Just-in-time (JIT)** attacks the problem from the other side: instead of optimising the order size, eliminate the inventory. Goods arrive from suppliers exactly when production or a sale needs them, so holding costs collapse toward zero and the cash cycle shortens dramatically. The price is fragility — JIT demands utterly reliable suppliers and predictable demand, because there is no buffer stock to absorb a late delivery or a demand spike." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "EOQ buffer-stock approach vs JIT",
          data: {
            leftTitle: "EOQ / buffer stock",
            rightTitle: "Just-in-time (JIT)",
            rows: [
              { aspect: "Inventory held", left: "Optimised, not eliminated", right: "Driven toward zero" },
              { aspect: "Holding cost", left: "Minimised via order size", right: "Almost removed" },
              { aspect: "Supplier need", left: "Tolerates ordinary suppliers", right: "Needs total reliability" },
              { aspect: "Resilience", left: "Buffer absorbs shocks", right: "Fragile to any disruption" },
              { aspect: "Cash cycle", left: "Shorter than over-stocking", right: "Shortest possible" },
            ],
          },
        } },
      ],
      check: {
        q: "Annual demand is 40,000 units, the cost per order is $50 and the holding cost is $4 per unit per year, giving an EOQ of 1,000 units. If the holding cost per unit RISES to $16, what happens to the EOQ?",
        options: [
          "It stays at 1,000 units",
          "It falls to 500 units",
          "It rises to 2,000 units",
          "It falls to 250 units",
        ],
        correct: 1,
        explain: "Ch is under the square-root sign, so quadrupling it (from 4 to 16) divides the EOQ by √4 = 2. New EOQ = √(2 × 50 × 40,000 ÷ 16) = √250,000 = 500 units. Higher holding costs make it optimal to order smaller amounts more often — exactly what you'd expect intuitively.",
      },
    },
    {
      id: "receivables",
      heading: "Managing receivables — credit policy, discounts and factoring",
      blocks: [
        { kind: "text", md: "Selling on credit wins customers but creates receivables — cash you have earned but not yet collected — plus the risk that some never pay. A sound **credit policy** has four parts: assessing new customers' creditworthiness before granting credit, setting sensible credit limits and terms, collecting promptly, and dealing decisively with defaulters. Every loosening of policy boosts sales but lengthens receivables days and raises bad debts." },
        { kind: "text", md: "An **early settlement discount** is a carrot: pay within, say, 10 days and take 2% off, rather than the normal 40 days. It pulls cash in faster (shorter receivables days, lower financing cost, sometimes fewer bad debts) but it is genuinely expensive, because you surrender the discount on every invoice to bring the cash forward by only a few weeks. Always convert the discount into an **effective annual cost of finance** and compare it with your cost of borrowing." },
        { kind: "formula", name: "Effective annual cost of a discount (approximate)", expr: "Cost ≈ ( d ÷ (1 − d) ) × ( 365 ÷ N )", note: "d = discount as a decimal; N = normal credit days − discount period days." },
        { kind: "formula", name: "Effective annual cost of a discount (compound)", expr: "Cost = ( 1 ÷ (1 − d) ) ^ (365 ÷ N) − 1", note: "The precise version, compounding the saving over the year." },
        { kind: "example", title: "Worked example — evaluating a settlement discount", scenario: "Vega Ltd offers customers terms of \"2% discount if paid within 10 days, otherwise net 40 days\". Its overdraft costs 8% per year. Is the discount an expensive way to raise finance? Assume a customer who would otherwise pay on day 40 now pays on day 10.", steps: [
          { label: "Identify the inputs", detail: "d = 0.02. Days saved N = 40 − 10 = 30 days. The company gives up 2% to be paid 30 days early." },
          { label: "The 2% is on the amount NET of discount", detail: "Paying $98 now instead of $100 in 30 days means the cost of the funds is 2 ÷ 98 = 0.020408 for 30 days." },
          { label: "Approximate annual cost", detail: "(0.02 ÷ 0.98) × (365 ÷ 30) = 0.020408 × 12.1667 = 0.2483 = **24.83%**." },
          { label: "Compound (precise) annual cost", detail: "(1 ÷ 0.98) ^ (365 ÷ 30) − 1 = 1.020408 ^ 12.1667 − 1 = 1.2786 − 1 = **27.86%**." },
          { label: "Compare with the cost of finance", detail: "24.83% (or 27.86% compounded) is far above the 8% overdraft rate." },
        ], result: "The discount costs roughly 25–28% a year — over three times the 8% cost of an overdraft. As a pure financing decision it is poor value; it would only be worth offering if it also cut bad debts or freed capacity worth the difference." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Cost of the 2/10 net 40 discount vs the overdraft",
          caption: "Bringing cash in via the discount costs far more than simply borrowing on overdraft.",
          data: {
            unit: "% per year",
            items: [
              { label: "Overdraft rate", value: 8 },
              { label: "Discount cost (approx)", value: 24.83 },
              { label: "Discount cost (compound)", value: 27.86 },
            ],
          },
        } },
        { kind: "text", md: "**Factoring** hands the whole receivables ledger to a specialist. The factor advances most of the invoice value at once (typically 80%), chases and collects the debts, and can insure against non-payment — for a service fee and interest on the advance. The pivotal exam distinction is **recourse**: with a **recourse** arrangement the factor can reclaim from you any debt the customer never pays, so YOU keep the bad-debt risk (cheaper fee). With a **non-recourse** arrangement the factor bears the bad debts (credit protection), so it charges more. **Invoice discounting** is the quiet cousin — you borrow against the invoices confidentially but keep collecting the debts yourself." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Factoring: with recourse vs without recourse",
          data: {
            leftTitle: "With recourse",
            rightTitle: "Without recourse (non-recourse)",
            rows: [
              { aspect: "Bad-debt risk", left: "Stays with the seller", right: "Passes to the factor" },
              { aspect: "Fee charged", left: "Lower", right: "Higher (buys protection)" },
              { aspect: "Credit protection", left: "None", right: "Yes — factor absorbs defaults" },
              { aspect: "Factor can reclaim?", left: "Yes, for unpaid debts", right: "No" },
              { aspect: "Best when", left: "Debts are reliable, cost matters", right: "Bad-debt risk is real and worrying" },
            ],
          },
        } },
      ],
      check: {
        q: "A supplier offers \"1% discount for payment in 15 days, otherwise net 45 days\". Using the approximate formula, roughly what is the effective annual cost of taking finance by NOT paying early (i.e. the cost of the discount)?",
        options: [
          "About 1%",
          "About 8%",
          "About 12%",
          "About 25%",
        ],
        correct: 2,
        explain: "d = 0.01 and N = 45 − 15 = 30 days. Cost ≈ (0.01 ÷ 0.99) × (365 ÷ 30) = 0.010101 × 12.1667 = 0.1229 ≈ 12.3%. The 1% discount is smaller than a 2% one, so its annual cost (~12%) is roughly half the ~25% of a 2/10 net 40 deal — but still well above a typical borrowing rate.",
      },
    },
    {
      id: "payables-cash",
      heading: "Managing payables and cash — Baumol and Miller-Orr",
      blocks: [
        { kind: "text", md: "**Trade payables** are the cheapest finance a business has: interest-free credit from suppliers. Stretching payment terms (taking full credit before paying) lengthens payables days and shortens the cash cycle — but taken too far it means missing settlement discounts, losing supplier goodwill, risking supply cut-off and damaging your credit reputation. The art is to use the free credit fully without abusing it." },
        { kind: "text", md: "Holding **cash** has three classic **motives**: the **transactions** motive (routine day-to-day payments), the **precautionary** motive (a buffer for the unexpected), and the **speculative** motive (funds ready to seize a bargain or investment). Too little cash risks insolvency; too much cash earns nothing. Two models help set the optimum." },
        { kind: "text", md: "The **Baumol model** treats cash exactly like inventory: you \"order\" cash by selling marketable securities in fixed lumps, incurring a transaction cost each time, while holding cash means losing interest. It finds the optimal transfer size — the same square-root shape as the EOQ. Its weakness is the assumption of **steady, predictable** cash outflows." },
        { kind: "formula", name: "Baumol optimal cash transfer", expr: "Q = √( 2 × C0 × D ÷ i )", note: "C0 = cost per transaction; D = total annual cash needed; i = interest rate forgone on cash." },
        { kind: "example", title: "Worked example — Baumol transfer size", scenario: "Sirius Ltd needs $1,000,000 of cash over the year, drawn down evenly. Each sale of securities to raise cash costs $100. Marketable securities yield 8% a year. What is the optimal amount to transfer each time, and how often?", steps: [
          { label: "Apply the formula", detail: "Q = √(2 × 100 × 1,000,000 ÷ 0.08)." },
          { label: "Top line", detail: "2 × 100 × 1,000,000 = 200,000,000." },
          { label: "Divide by i", detail: "200,000,000 ÷ 0.08 = 2,500,000,000." },
          { label: "Square root", detail: "√2,500,000,000 = **$50,000** per transfer." },
          { label: "Frequency", detail: "Transfers per year = 1,000,000 ÷ 50,000 = 20. Average cash held = 50,000 ÷ 2 = $25,000." },
        ], result: "Sirius should convert $50,000 of securities into cash about 20 times a year, holding $25,000 on average — the size that balances transaction costs against lost interest." },
        { kind: "text", md: "The **Miller-Orr model** is more realistic: cash flows are assumed to move **randomly** (up and down) rather than steadily. Management sets a **lower limit** (a minimum buffer). The model then computes a **spread** between the lower and upper limits and a **return point** to aim for. When cash hits the **upper limit**, buy securities to fall back to the return point; when it hits the **lower limit**, sell securities to rise back to the return point. The more volatile the cash flows (higher variance), the wider the spread." },
        { kind: "formula", name: "Miller-Orr spread", expr: "Spread = 3 × [ ( ¾ × transaction cost × variance of cash flows ) ÷ interest rate ] ^ (1/3)", note: "Interest rate and variance are per day; spread = upper limit − lower limit." },
        { kind: "formula", name: "Miller-Orr return point", expr: "Return point = Lower limit + ( Spread ÷ 3 )" },
        { kind: "formula", name: "Miller-Orr upper limit", expr: "Upper limit = Lower limit + Spread" },
        { kind: "example", title: "Worked example — Miller-Orr limits", scenario: "Lyra Ltd sets a minimum cash balance (lower limit) of $5,000. Each securities transaction costs $40. The variance of daily cash flows is $1,440,000. The daily interest rate is 0.02% (0.0002). Find the spread, the return point and the upper limit.", steps: [
          { label: "Build the bracket", detail: "¾ × 40 × 1,440,000 = 0.75 × 40 × 1,440,000 = 43,200,000." },
          { label: "Divide by the interest rate", detail: "43,200,000 ÷ 0.0002 = 216,000,000,000." },
          { label: "Cube root", detail: "216,000,000,000 ^ (1/3) = 6,000 (since 6,000 × 6,000 × 6,000 = 216,000,000,000)." },
          { label: "Spread", detail: "Spread = 3 × 6,000 = **$18,000**." },
          { label: "Return point", detail: "Lower limit + Spread ÷ 3 = 5,000 + 18,000 ÷ 3 = 5,000 + 6,000 = **$11,000**." },
          { label: "Upper limit", detail: "Lower limit + Spread = 5,000 + 18,000 = **$23,000**." },
        ], result: "Lyra lets cash float freely between $5,000 and $23,000. At $23,000 it invests $12,000 to return to $11,000; at $5,000 it sells $6,000 of securities to return to $11,000. No action is taken in between — the bands do the work." },
      ],
      check: {
        q: "In a Miller-Orr model the lower limit is $5,000 and the spread is $18,000. If the cash balance hits the UPPER limit, what does the company do?",
        options: [
          "Sell $18,000 of securities to reach the lower limit",
          "Invest $12,000 in securities to return to the $11,000 return point",
          "Do nothing until cash reaches the lower limit",
          "Invest all cash above $5,000",
        ],
        correct: 1,
        explain: "Upper limit = 5,000 + 18,000 = 23,000; return point = 5,000 + 18,000 ÷ 3 = 11,000. Hitting the upper limit means investing enough to fall back to the RETURN point, not the lower limit: 23,000 − 11,000 = $12,000 into securities. The firm always aims for the return point, never the boundary it just touched.",
      },
    },
    {
      id: "overtrading-funding",
      heading: "Overtrading and working-capital funding strategies",
      blocks: [
        { kind: "text", md: "**Overtrading** (also called under-capitalisation) is the trap of growing sales faster than the long-term finance to support them. The business wins orders, buys inventory and offers credit — but the cash cycle swallows more working capital than it has, so it leans ever harder on the overdraft and its suppliers. It is dangerous precisely because it looks like success: rising revenue masking a deepening cash crisis. Overtrading is a failure of financing, not of trading." },
        { kind: "callout", tone: "warn", title: "The signs of overtrading", md: "**Rapid revenue growth** with **little or no rise in equity/long-term finance**; **rising inventory and receivables days**; a **fast-growing overdraft** and **lengthening payables days**; **falling current and quick ratios**; and a **worsening cash position** despite reported profits. The fix is more long-term finance, tighter working-capital control, or slower growth." },
        { kind: "text", md: "Working capital splits into two layers. **Permanent** current assets are the base level of inventory, receivables and cash the business always carries. **Fluctuating** (temporary) current assets are the seasonal peaks on top. How you finance these two layers defines your funding strategy — a trade-off between cheaper short-term finance (which is riskier: it can be withdrawn or repriced) and dearer long-term finance (which is safer and locked in)." },
        { kind: "formula", name: "The funding split", expr: "Total assets = Non-current assets + Permanent current assets + Fluctuating current assets" },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Aggressive vs conservative funding",
          data: {
            leftTitle: "Aggressive",
            rightTitle: "Conservative",
            rows: [
              { aspect: "Short-term finance used", left: "High — funds all fluctuating AND some permanent assets", right: "Low — used only for peak fluctuating needs" },
              { aspect: "Cost", left: "Lower (short-term is cheaper)", right: "Higher (relies on long-term)" },
              { aspect: "Risk", left: "Higher — refinancing & liquidity risk", right: "Lower — finance is locked in" },
              { aspect: "Cash buffer", left: "Thin, runs lean", right: "Ample, often surplus cash to invest" },
              { aspect: "Profitability", left: "Higher (less idle capital)", right: "Lower (safety costs return)" },
            ],
          },
        } },
        { kind: "text", md: "Between the two extremes sits the **matching** (or hedging) policy — the textbook compromise: finance **long-term** assets (non-current + permanent current assets) with **long-term** finance, and finance only the **fluctuating** current assets with **short-term** finance. Each asset is matched to a liability of similar maturity, so the business is neither paying for idle long-term funds nor exposed to refinancing a permanent need with a facility that could vanish overnight. It is the balanced middle of the same liquidity-vs-profitability trade-off that runs through the whole of working-capital management." },
      ],
    },
  ],
  examTraps: [
    { trap: "Adding payables days when computing the cash operating cycle.", fix: "Payables are SUBTRACTED. Cycle = inventory days + receivables days − payables days; supplier credit shortens the cycle." },
    { trap: "Putting holding cost on the top of the EOQ formula.", fix: "Ch goes UNDERNEATH the square root: EOQ = √(2 × C0 × D ÷ Ch). At the EOQ, ordering cost equals holding cost." },
    { trap: "Costing a settlement discount as a flat percentage instead of an annual rate.", fix: "Annualise it: a 2% discount for paying 30 days early is ~24.8% a year, not 2%. Base it on the amount net of discount (d ÷ (1 − d))." },
    { trap: "Mixing up recourse and non-recourse factoring.", fix: "WITH recourse = seller keeps the bad-debt risk (cheaper). WITHOUT recourse (non-recourse) = factor bears bad debts (dearer, buys protection)." },
    { trap: "In Miller-Orr, returning cash to the limit that was hit rather than to the return point.", fix: "Always transact back to the RETURN POINT (lower + spread ÷ 3), not to the upper or lower boundary." },
  ],
  keyTerms: [
    { term: "Cash operating cycle", def: "The days between paying suppliers and collecting cash from customers: inventory days + receivables days − payables days. Longer cycle = more working capital tied up." },
    { term: "Economic Order Quantity (EOQ)", def: "The order size that minimises total ordering plus holding costs: √(2 × C0 × D ÷ Ch). At the EOQ the two costs are equal." },
    { term: "Effective annual cost of a discount", def: "A settlement discount expressed as an annualised financing rate, so it can be compared with the cost of borrowing; ≈ (d ÷ (1 − d)) × (365 ÷ N)." },
    { term: "Factoring (recourse vs non-recourse)", def: "Outsourcing the receivables ledger for an advance and a fee. With recourse the seller keeps bad-debt risk; without recourse the factor absorbs it for a higher charge." },
    { term: "Miller-Orr model", def: "A cash-management model for random cash flows: cash floats between a lower and an upper limit, returning to a computed return point when a limit is hit." },
    { term: "Overtrading", def: "Expanding sales faster than the long-term finance to support the working capital they need — rising revenue masking a worsening cash and liquidity position." },
  ],
  summary: [
    "Working capital = inventory + receivables − payables + cash; the core tension is liquidity vs profitability, and the goal is the optimum, not the extreme.",
    "The cash operating cycle (inventory + receivables − payables days) measures how long the business must self-finance; shortening it releases cash.",
    "Inventory: EOQ = √(2 × C0 × D ÷ Ch) minimises ordering + holding cost; bulk discounts need a total-cost comparison; JIT slashes stock but demands reliable suppliers.",
    "Receivables: convert settlement discounts to an annual cost before offering them; choose factoring with recourse (cheaper, keep bad-debt risk) or without (dearer, transfer it).",
    "Cash: use Baumol for steady flows and Miller-Orr for random flows; watch for overtrading; match asset maturities to finance under an aggressive, conservative or matching funding strategy.",
  ],
}
