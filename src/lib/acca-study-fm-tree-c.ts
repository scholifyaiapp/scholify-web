import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area C — working capital management.
 *
 * The most consistently examined area in FM: it appears in Section A and B
 * every sitting and is a regular Section C question. It was ONE chapter
 * covering C1, C2 and C3 together — the whole of inventory, receivables,
 * payables, cash AND funding strategy in a single sitting.
 *
 * Five chapters now, one per topic a question is actually set on:
 *
 *   FM-04  The working capital cycle and overtrading   (C1)
 *   FM-05  Managing inventory                          (C2)
 *   FM-06  Managing receivables and payables           (C2)
 *   FM-07  Managing cash                               (C2)
 *   FM-08  Working capital needs and funding strategy  (C3)
 *
 * Written against the official ACCA FM syllabus and study guide, not derived
 * from any approved-provider text — see the note in acca-study-fm-tree-a.ts.
 */

const FM_TREE_04: StudyChapter = {
  paper: "FM",
  id: "FM-04",
  number: 4,
  area: "C",
  syllabusRefs: ["C1(a)", "C1(b)", "C1(c)", "C1(d)"],
  title: "The working capital cycle and overtrading",
  minutes: 17,
  intro:
    "Profitable companies fail every year, and almost always for the same reason: the cash went out before it came in. This chapter is the arithmetic of that gap.",
  outcomes: [
    "Describe the elements of working capital and the cycle they form",
    "Calculate and interpret the cash operating cycle",
    "Explain the trade-off between liquidity and profitability",
    "Identify the symptoms of overtrading and explain how it is corrected",
  ],
  sections: [
    {
      id: "the-cycle",
      heading: "The cash operating cycle",
      blocks: [
        {
          kind: "text",
          md: "Working capital is **current assets less current liabilities** — inventory, receivables and cash on one side, payables and overdraft on the other. The cycle is the time between paying for goods and being paid for them, and every day of it has to be financed.",
        },
        {
          kind: "formula",
          name: "Cash operating cycle",
          expr: "Inventory days + Receivables days − Payables days",
          note: "Inventory days = Inventory / Cost of sales × 365 · Receivables days = Receivables / Credit sales × 365 · Payables days = Payables / Credit purchases × 365",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Which figure goes underneath",
          md: "Inventory and payables are measured against **cost of sales / purchases**; receivables against **credit sales**. Using revenue for inventory days is the most common error in this calculation and it changes the answer materially.",
        },
        {
          kind: "example",
          title: "Calculating the cycle",
          scenario:
            "Merrion Co: revenue £4.5m (all on credit), cost of sales £3.0m, purchases £2.7m. Inventory £480,000, receivables £675,000, payables £370,000.",
          steps: [
            { label: "Inventory days", detail: "480 / 3,000 × 365 = 58.4 days" },
            { label: "Receivables days", detail: "675 / 4,500 × 365 = 54.8 days" },
            { label: "Payables days", detail: "370 / 2,700 × 365 = 50.0 days" },
            { label: "Cycle", detail: "58.4 + 54.8 − 50.0 = 63.2 days" },
          ],
          result:
            "Merrion finances 63 days of trading. Shortening it — faster collection, leaner inventory, or longer credit taken — releases cash without any new finance. A question asking for the effect of a policy change wants the recalculated cycle and the cash released, not a description.",
        },
      ],
      check: {
        q: "A company reduces its inventory days from 60 to 45 and its receivables days from 50 to 40, while payables days stay at 30. What happens to the cash operating cycle?",
        options: ["It rises by 25 days", "It falls by 25 days", "It falls by 15 days", "It is unchanged"],
        correct: 1,
        explain:
          "Old cycle: 60 + 50 − 30 = 80 days. New cycle: 45 + 40 − 30 = 55 days. A fall of 25 days — and 25 days of trading no longer needs financing, which is real cash released.",
      },
    },
    {
      id: "liquidity-profitability",
      heading: "Liquidity against profitability",
      blocks: [
        {
          kind: "text",
          md: "Every working-capital decision trades one against the other, and the examiner wants the trade-off named rather than a preference asserted.",
        },
        {
          kind: "table",
          caption: "The same decision, both ways",
          head: ["Policy", "Liquidity effect", "Profitability effect"],
          rows: [
            ["Hold more inventory", "Fewer stockouts, safer", "Holding costs, capital tied up"],
            ["Offer longer credit", "Cash arrives later", "Sales may rise"],
            ["Take longer to pay", "Cash retained longer", "Lost discounts, supplier goodwill"],
            ["Hold more cash", "Safer against shocks", "Interest forgone"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "There is no optimal answer in the abstract",
          md: "The right level of working capital depends on the industry, the volatility of demand and the cost of finance. A supermarket runs a negative cycle — it is paid before it pays. A shipbuilder cannot. Say which the scenario is.",
        },
      ],
    },
    {
      id: "overtrading",
      heading: "Overtrading",
      blocks: [
        {
          kind: "definition",
          term: "Overtrading (undercapitalisation)",
          md: "Expanding sales faster than the long-term capital available to support the working capital that growth requires. The business is **profitable and illiquid at the same time** — which is why the income statement gives no warning.",
        },
        {
          kind: "list",
          style: "number",
          title: "The symptoms, in the order they appear",
          items: [
            "**Rapid revenue growth** with only a small increase in capital employed.",
            "**Inventory and receivables rising faster than revenue** — the growth is being carried on the balance sheet.",
            "**Payables days lengthening** — suppliers are financing the expansion, whether they agreed to or not.",
            "**Current and quick ratios falling**, and an increasing overdraft that never clears.",
            "**Falling profit margins**, often because discounts were used to win the extra volume in the first place.",
          ],
        },
        {
          kind: "illustration",
          title: "Why the accounts look fine until they don't",
          md: "A company doubles revenue in a year and reports record profit. But receivables have tripled, inventory has doubled, and the overdraft is at its limit.\n\nEvery extra sale consumed cash — goods bought and paid for now, cash collected in sixty days. Profit is an accrual; the overdraft is a fact. The bank withdraws the facility, and a business that has never made a loss stops trading.",
        },
        {
          kind: "table",
          caption: "How overtrading is corrected",
          head: ["Remedy", "What it does"],
          rows: [
            ["Introduce long-term finance (equity or long-term debt)", "Matches permanent working capital with permanent funding — the actual cure"],
            ["Slow the rate of growth", "Reduces the working-capital demand growth creates"],
            ["Tighten credit control", "Converts receivables to cash sooner"],
            ["Reduce inventory levels", "Releases cash tied up in stock"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The answer marks are in the diagnosis",
          md: "Do not just list remedies. Compute two or three ratios across the two years, state which ones moved and in which direction, THEN prescribe. A remedy with no evidence behind it reads as a memorised list.",
        },
      ],
      check: {
        q: "Which combination most strongly indicates overtrading?",
        options: [
          "Revenue up 60%, receivables days up from 45 to 78, current ratio down from 1.6 to 1.1",
          "Revenue up 60%, receivables days down from 45 to 30, current ratio up from 1.2 to 1.8",
          "Revenue flat, inventory days falling, cash balance rising",
          "Revenue down 20%, payables days falling, overdraft repaid",
        ],
        correct: 0,
        explain:
          "Sharp growth funded on the balance sheet: sales up, collection slowing and liquidity deteriorating together. Option 1 is growth with IMPROVING working capital — well managed, not overtrading. The others describe contraction.",
      },
    },
  ],
  examTraps: [
    { trap: "Using revenue instead of cost of sales for inventory days.", fix: "Inventory and payables sit on cost; only receivables sit on sales." },
    { trap: "Calling any company with a high overdraft an overtrader.", fix: "Overtrading is growth outrunning capital. Without rising revenue it is simply a liquidity problem." },
    { trap: "Prescribing remedies without evidence.", fix: "Compute the ratios across both years first, then diagnose." },
  ],
  keyTerms: [
    { term: "Working capital", def: "Current assets less current liabilities — the short-term capital tied up in trading." },
    { term: "Cash operating cycle", def: "Inventory days plus receivables days less payables days; the period that must be financed." },
    { term: "Overtrading", def: "Expanding sales faster than the long-term capital available to fund the resulting working capital." },
  ],
  summary: [
    "Working capital is inventory, receivables and cash less payables.",
    "The cash operating cycle is the financed gap between paying and being paid.",
    "Inventory and payables days use cost; receivables days use sales.",
    "Every policy trades liquidity against profitability — name the trade-off.",
    "Overtrading is profitable illiquidity; the cure is long-term capital, not a tighter overdraft.",
  ],
  knowledgeDiagnostic: [
    { q: "State the formula for the cash operating cycle.", a: "Inventory days + receivables days − payables days." },
    { q: "Which figure is used as the denominator for inventory days?", a: "Cost of sales — not revenue." },
    { q: "Name three symptoms of overtrading.", a: "Rapid revenue growth on little extra capital; receivables and inventory rising faster than revenue; lengthening payables and falling liquidity ratios. (Also falling margins.)" },
    { q: "What is the fundamental cure for overtrading?", a: "Introducing long-term finance so permanent working capital is permanently funded — or slowing growth to what current capital supports." },
  ],
  furtherStudy: [
    "FM-08 returns to this as a funding decision — which parts of working capital are permanent.",
    "The next three chapters manage each element in turn: inventory, receivables and payables, cash.",
  ],
}

const FM_TREE_05: StudyChapter = {
  paper: "FM",
  id: "FM-05",
  number: 5,
  area: "C",
  syllabusRefs: ["C2(a)", "C2(b)"],
  title: "Managing inventory",
  minutes: 18,
  intro:
    "Inventory is cash you have already spent and cannot use. The models here decide how much of it to hold — and the bulk-discount version is the one that separates candidates.",
  outcomes: [
    "Explain the costs of holding and of ordering inventory",
    "Calculate and apply the economic order quantity",
    "Evaluate bulk discounts using total cost, not EOQ alone",
    "Calculate the economic batch quantity and explain buffer inventory and reorder levels",
  ],
  sections: [
    {
      id: "costs",
      heading: "The two costs that pull against each other",
      blocks: [
        {
          kind: "table",
          caption: "Why there is an optimum at all",
          head: ["Order more often, in smaller amounts", "Order rarely, in large amounts"],
          rows: [
            ["Ordering costs rise (more orders)", "Ordering costs fall"],
            ["Holding costs fall (less average stock)", "Holding costs rise"],
            ["More risk of stockout", "More capital tied up, more obsolescence"],
          ],
        },
        {
          kind: "formula",
          name: "Economic order quantity",
          expr: "EOQ = √( 2·Co·D / Ch )",
          note: "Co = cost of placing ONE order · D = annual demand in units · Ch = cost of holding ONE unit for a year",
        },
        {
          kind: "example",
          title: "A straight EOQ",
          scenario: "Annual demand 40,000 units. Ordering cost £64 per order. Holding cost £2 per unit per year.",
          steps: [
            { label: "Substitute", detail: "EOQ = √(2 × 64 × 40,000 / 2)" },
            { label: "Numerator", detail: "2 × 64 × 40,000 = 5,120,000" },
            { label: "Divide", detail: "5,120,000 / 2 = 2,560,000" },
            { label: "Root", detail: "√2,560,000 = 1,600 units" },
          ],
          result:
            "Order 1,600 units at a time — 25 orders a year. At the EOQ, annual ordering cost (25 × £64 = £1,600) equals annual holding cost (1,600/2 × £2 = £1,600). That equality is a useful check on your answer.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Average inventory is HALF the order quantity",
          md: "Stock runs from Q down to zero and is replenished, so average holding is **Q/2**. Costing the full order quantity doubles the holding cost and is a frequent slip.",
        },
      ],
      check: {
        q: "Annual demand is 10,000 units, ordering cost £20, holding cost £1 per unit per year. What is the EOQ?",
        options: ["400 units", "632 units", "500 units", "1,000 units"],
        correct: 1,
        explain:
          "√(2 × 20 × 10,000 / 1) = √400,000 = 632 units. Check it: 10,000/632 ≈ 15.8 orders × £20 = £316; holding 632/2 × £1 = £316. The two costs match, so the answer is right.",
      },
    },
    {
      id: "discounts",
      heading: "Bulk discounts — where EOQ stops being the answer",
      blocks: [
        {
          kind: "text",
          md: "When a supplier offers a discount for ordering more, the EOQ is no longer automatically optimal: a larger order costs more to hold but less to buy. You must **compare total annual cost** at the EOQ and at each discount threshold.",
        },
        {
          kind: "list",
          style: "number",
          title: "The method, every time",
          items: [
            "Calculate the EOQ ignoring discounts.",
            "Calculate **total annual cost** at the EOQ: purchase cost + ordering cost + holding cost.",
            "For **each** discount level, calculate total annual cost at the **minimum quantity** that earns it — never at a quantity above the threshold, since more stock only adds holding cost.",
            "Choose the lowest total. Include the purchase cost: it is the whole reason a discount changes the answer.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two traps in one question",
          md: "First, **holding cost is often a percentage of purchase price** — so a discount reduces the holding cost per unit too, and you must recalculate it at each level. Second, candidates omit the purchase cost entirely, which makes every discount look worthless.",
        },
        {
          kind: "activity",
          title: "Check your method",
          prompt:
            "Demand 40,000 units, Co £64, Ch £2/unit/year, price £10. The supplier offers 1% off for orders of 5,000+. Which quantities do you need to test, and what must you include?",
          answer:
            "Test two: the EOQ of 1,600 units at £10, and 5,000 units at £9.90 — the minimum that earns the discount. At each, total = purchase (40,000 × price) + ordering (40,000/Q × 64) + holding (Q/2 × Ch). Since the purchase cost dominates at £400,000, a 1% saving is £4,000 — far more than the extra holding cost, so the discount wins. Testing 6,000 units would be wrong: it earns the same discount and holds more stock.",
        },
      ],
    },
    {
      id: "ebq-buffer",
      heading: "Batch production, buffer stock and reorder levels",
      blocks: [
        {
          kind: "formula",
          name: "Economic batch quantity",
          expr: "EBQ = √( 2·Co·D / (Ch·(1 − D/R)) )",
          note: "R = annual production (replenishment) rate. Co is the SET-UP cost of a production run rather than the cost of placing an order.",
        },
        {
          kind: "text",
          md: "EBQ applies where you **make** rather than buy: stock accumulates gradually while production runs and is consumed at the same time, so average inventory is lower than Q/2. That is exactly what the `(1 − D/R)` term captures.",
        },
        {
          kind: "formula",
          name: "Reorder level and buffer inventory",
          expr: "Reorder level = Maximum usage × Maximum lead time\nBuffer (safety) inventory = Reorder level − (Average usage × Average lead time)",
          note: "Buffer stock is the cushion against demand or lead time being worse than average.",
        },
        {
          kind: "text",
          md: "**Just-in-time** takes the opposite view: hold almost nothing, and rely on frequent, reliable, high-quality deliveries. It cuts holding cost and obsolescence to near zero and replaces them with dependence on a small number of suppliers — a stockout risk that a single disruption realises.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "A JIT discussion needs both sides",
          md: "Name the saving (holding cost, space, obsolescence, capital released) AND the exposure (supplier failure, transport disruption, no cushion for a demand spike, loss of bulk discounts). An answer with only the benefits does not score the discussion marks.",
        },
      ],
      check: {
        q: "Maximum usage is 400 units a week, maximum lead time 3 weeks, average usage 300 units a week, average lead time 2 weeks. What is the buffer inventory?",
        options: ["1,200 units", "600 units", "900 units", "300 units"],
        correct: 1,
        explain:
          "Reorder level = 400 × 3 = 1,200. Expected usage in an average lead time = 300 × 2 = 600. Buffer = 1,200 − 600 = 600 units — the cushion held for the case where both demand and lead time run worse than average.",
      },
    },
  ],
  examTraps: [
    { trap: "Using the full order quantity as average inventory.", fix: "Average is Q/2 — stock depletes to zero before reordering." },
    { trap: "Choosing the EOQ in a bulk-discount question without testing the thresholds.", fix: "Compare TOTAL annual cost, including purchase cost, at the EOQ and at each discount minimum." },
    { trap: "Forgetting that a percentage-based holding cost falls with the discounted price.", fix: "Recalculate Ch at each price level before comparing." },
  ],
  keyTerms: [
    { term: "Economic order quantity", def: "The order size minimising the total of ordering and holding costs." },
    { term: "Economic batch quantity", def: "The EOQ adapted for goods produced internally, where stock builds up while being consumed." },
    { term: "Buffer inventory", def: "Safety stock held to cover usage or lead time exceeding the average." },
    { term: "Just-in-time", def: "Holding minimal inventory and relying on frequent, reliable deliveries timed to production." },
  ],
  summary: [
    "Ordering and holding costs move in opposite directions; the EOQ is where their total is lowest.",
    "Average inventory is Q/2, and at the EOQ ordering cost equals holding cost.",
    "Bulk discounts are decided on total annual cost including purchase price, tested at each threshold minimum.",
    "EBQ applies to internally produced goods through the (1 − D/R) term.",
    "JIT trades holding cost for supply-chain risk; a good answer states both.",
  ],
  knowledgeDiagnostic: [
    { q: "Write the EOQ formula and define each term.", a: "√(2CoD/Ch): Co = cost per order, D = annual demand in units, Ch = holding cost per unit per year." },
    { q: "What is average inventory under the EOQ model?", a: "Half the order quantity, Q/2." },
    { q: "Why is the EOQ not automatically correct when a bulk discount is offered?", a: "The discount reduces purchase cost, which the EOQ formula ignores; the larger order may have a lower TOTAL cost despite higher holding cost." },
    { q: "How is the reorder level calculated?", a: "Maximum usage × maximum lead time." },
  ],
  furtherStudy: [
    "MA covers the same EOQ and EBQ models — the formulae are identical.",
    "FM-08 asks how the inventory investment these models produce should be funded.",
  ],
}

const FM_TREE_06: StudyChapter = {
  paper: "FM",
  id: "FM-06",
  number: 6,
  area: "C",
  syllabusRefs: ["C2(c)", "C2(d)"],
  title: "Managing receivables and payables",
  minutes: 18,
  intro:
    "Receivables are your cash in someone else's bank account. This chapter is about getting it back sooner, and what each method of doing so actually costs.",
  outcomes: [
    "Explain the elements of a credit control policy",
    "Evaluate a proposed change in credit terms using incremental costs and benefits",
    "Calculate the annualised cost of an early settlement discount",
    "Compare factoring and invoice discounting, and explain the management of payables",
  ],
  sections: [
    {
      id: "credit-policy",
      heading: "Credit control",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The four stages of a credit policy",
          items: [
            "**Assess creditworthiness** before granting credit — trade references, bank references, credit agency reports, published accounts, and the company's own experience of the customer.",
            "**Set credit limits and terms** appropriate to that assessment, and review them as the relationship develops.",
            "**Invoice promptly and chase systematically** — an aged receivables analysis, a defined escalation, and someone whose job it is.",
            "**Collect** — statements, reminders, telephone contact, then legal action or a debt collection agency as a last resort.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Every change is an INCREMENTAL calculation",
          md: "A question proposing looser or tighter credit terms is asking you to compare the extra contribution won against the extra financing cost, extra bad debts and extra administration. Compute the change, not the totals.",
        },
        {
          kind: "example",
          title: "Is a longer credit period worth it?",
          scenario:
            "Kelvin Co currently has revenue of £6m and receivables days of 45. It proposes extending credit to 60 days, which is expected to raise revenue by £600,000. Contribution is 25% of revenue. Bad debts run at 2% of revenue on the extra sales. Finance costs 8%.",
          steps: [
            { label: "Extra contribution", detail: "£600,000 × 25% = £150,000 gain" },
            { label: "New receivables", detail: "£6.6m × 60/365 = £1,084,932" },
            { label: "Old receivables", detail: "£6.0m × 45/365 = £739,726" },
            { label: "Extra investment", detail: "£1,084,932 − £739,726 = £345,206" },
            { label: "Financing cost", detail: "£345,206 × 8% = £27,616 cost" },
            { label: "Extra bad debts", detail: "£600,000 × 2% = £12,000 cost" },
            { label: "Net", detail: "£150,000 − £27,616 − £12,000 = £110,384" },
          ],
          result:
            "A net benefit of £110,384, so the change is worthwhile. Note the structure: contribution is the benefit, and the costs are financing the extra receivables plus the bad debts the extra sales bring. State any assumption — here, that the extra sales are genuinely incremental and capacity exists.",
        },
      ],
    },
    {
      id: "discounts",
      heading: "Early settlement discounts",
      blocks: [
        {
          kind: "text",
          md: "A discount buys cash sooner at the price of margin. Whether it is worth offering depends on the **annualised** cost — because a small percentage over a short period is a very large percentage over a year.",
        },
        {
          kind: "formula",
          name: "Annualised cost of a discount",
          expr: "[ 1 / (1 − d) ] ^ (365 / N) − 1",
          note: "d = discount as a decimal · N = days earlier the money is received (normal credit period − discount period)",
        },
        {
          kind: "example",
          title: "2% for paying 30 days early",
          scenario: "Terms are 2% discount for payment within 10 days, otherwise net 40 days. The company's overdraft costs 9%.",
          steps: [
            { label: "Days saved", detail: "40 − 10 = 30 days" },
            { label: "Substitute", detail: "[1 / (1 − 0.02)] ^ (365/30) − 1" },
            { label: "Inner term", detail: "1 / 0.98 = 1.020408" },
            { label: "Raise", detail: "1.020408 ^ 12.167 = 1.2786" },
            { label: "Cost", detail: "1.2786 − 1 = 27.9%" },
          ],
          result:
            "The discount costs 27.9% a year against overdraft finance at 9%. As the OFFERER, that is expensive — you are paying 27.9% to accelerate cash you could borrow at 9%. Reverse the perspective and the same figure makes it an excellent deal to ACCEPT as a customer.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Whose side are you on?",
          md: "The identical number means opposite things. Offering: it is a cost, compare against your borrowing rate. Accepting: it is a return, compare against what the cash would otherwise earn or cost. Read the question before you conclude.",
        },
      ],
      check: {
        q: "A supplier offers 1.5% for payment in 10 days instead of 45. Your overdraft costs 10%. Should you take it?",
        options: [
          "No — 1.5% is less than 10%",
          "Yes — the annualised return is roughly 17%, well above the 10% cost of the overdraft",
          "No — paying early always worsens the cash cycle",
          "Only if you have surplus cash",
        ],
        correct: 1,
        explain:
          "[1/(1−0.015)]^(365/35) − 1 ≈ 17%. Borrowing at 10% to earn 17% is worth doing. Comparing the raw 1.5% against 10% ignores that the 1.5% is earned in 35 days, not a year — the exact error the annualisation exists to prevent.",
      },
    },
    {
      id: "factoring-payables",
      heading: "Factoring, invoice discounting and payables",
      blocks: [
        {
          kind: "table",
          caption: "Two ways to turn receivables into cash",
          head: ["", "Factoring", "Invoice discounting"],
          rows: [
            ["What is sold", "The receivables and the collection function", "A loan secured on the receivables"],
            ["Who collects", "The factor", "You do"],
            ["Customer awareness", "Usually knows (unless confidential)", "Does not know"],
            ["Typical advance", "Around 80% of face value, immediately", "Similar, but repaid as you collect"],
            ["Bad debt risk", "Passes to the factor only if WITHOUT recourse", "Stays with you"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "With or without recourse",
          md: "**With recourse**: you carry the bad debt if the customer does not pay — it is finance only. **Without recourse**: the factor bears it, and charges more for doing so. Saying \"factoring removes bad debt risk\" without that condition is wrong.",
        },
        {
          kind: "example",
          title: "Factoring, priced properly",
          scenario:
            "Ashby Co has revenue of £7.3m, all on credit, and receivables days of 65. A factor offers to advance 80% of invoices immediately, charging 1.5% of revenue as a fee plus 9% on the advance, and will reduce collection to 40 days. Ashby's overdraft costs 11%. Its own credit control costs £45,000 a year, which would be saved.",
          steps: [
            { label: "Current receivables", detail: "£7.3m × 65/365 = £1,300,000" },
            { label: "New receivables", detail: "£7.3m × 40/365 = £800,000 — a reduction of £500,000" },
            { label: "Saving on financing", detail: "£500,000 × 11% overdraft saved = £55,000" },
            { label: "Plus administration saved", detail: "£45,000 of credit control costs" },
            { label: "Cost — the factor's fee", detail: "£7.3m × 1.5% = £109,500" },
            { label: "Cost — interest on the advance", detail: "80% × £800,000 = £640,000 advanced, at 9% = £57,600. But this REPLACES overdraft on the same money at 11% (£70,400), so it is a net saving of £12,800, not a cost" },
            { label: "Net", detail: "55,000 + 45,000 + 12,800 − 109,500 = £3,300 benefit" },
          ],
          result:
            "Marginally worthwhile — and the arithmetic is the point. The fee looks enormous next to the savings until you notice the advance is CHEAPER than the overdraft it displaces. Candidates who treat the 9% as a pure cost, rather than comparing it with the 11% it replaces, turn a positive answer negative.",
        },
        {
          kind: "text",
          md: "**Managing payables** is the mirror image. Trade credit is often described as free finance, and it is — right up to the point where it costs you a settlement discount, a supplier's goodwill, or your credit rating. Stretching payables is the cheapest short-term finance available and the easiest to overuse.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What delaying payment actually costs",
          items: [
            "**Lost settlement discounts** — quantifiable, and usually the largest cost.",
            "**Supplier relationship** — priority in a shortage, willingness to hold stock for you, future terms.",
            "**Loss of goodwill and reputation**, which reaches other suppliers and lenders.",
            "**Legal exposure** to statutory interest on late commercial payments.",
          ],
        },
      ],
      check: {
        q: "A factor advances 80% of invoices at 9% and charges a 1.5% fee, while the company's overdraft costs 11%. How should the 9% be treated in the evaluation?",
        options: [
          "As a cost, added to the 1.5% fee",
          "As a net saving, because it replaces overdraft borrowing on the same amount at 11%",
          "Ignored, because it is charged by the factor rather than the bank",
          "As a cost, but only on the 20% not advanced",
        ],
        correct: 1,
        explain:
          "The advance displaces overdraft on the same money, so the relevant figure is the 2% differential in the company's favour — not the 9% in isolation. Treating it as a pure cost is what turns a positive evaluation negative.",
      },
    },
  ],
  examTraps: [
    { trap: "Comparing a discount percentage directly with an annual interest rate.", fix: "Annualise the discount first — 2% over 30 days is nearly 28% a year." },
    { trap: "Claiming factoring transfers bad debt risk, unconditionally.", fix: "Only without recourse. With recourse, the risk stays with you." },
    { trap: "Evaluating a credit-terms change on total rather than incremental figures.", fix: "Compare only the extra contribution against the extra financing, bad debts and admin." },
  ],
  keyTerms: [
    { term: "Factoring", def: "Selling receivables to a third party who advances most of the value and usually takes over collection." },
    { term: "Invoice discounting", def: "Borrowing against the security of receivables while retaining collection, confidentially." },
    { term: "Without recourse", def: "The factor bears the loss if a customer defaults." },
    { term: "Settlement discount", def: "A reduction offered for payment before the normal credit period ends." },
  ],
  summary: [
    "Credit control is assessment, limits, prompt invoicing and systematic collection.",
    "Evaluate a credit-terms change incrementally: extra contribution vs extra financing and bad debts.",
    "Annualise settlement discounts before judging them — short-period percentages are deceptive.",
    "Factoring passes on collection and, only without recourse, bad debt risk.",
    "Trade credit is cheap until it costs discounts, goodwill or reputation.",
  ],
  knowledgeDiagnostic: [
    { q: "State the formula for the annualised cost of a settlement discount.", a: "[1/(1−d)]^(365/N) − 1, where d is the discount and N the days saved." },
    { q: "What distinguishes invoice discounting from factoring?", a: "Invoice discounting is borrowing secured on receivables, is confidential and leaves you collecting; factoring transfers the collection function and the customer usually knows." },
    { q: "When does factoring remove bad debt risk?", a: "Only when the arrangement is without recourse." },
    { q: "What are the benefits and costs in a credit-extension evaluation?", a: "Benefit: extra contribution from extra sales. Costs: financing the extra receivables, extra bad debts, extra administration." },
  ],
  furtherStudy: [
    "FM-07 handles the cash the collection produces.",
    "AFM extends receivables management to international trade and export finance.",
  ],
}

const FM_TREE_07: StudyChapter = {
  paper: "FM",
  id: "FM-07",
  number: 7,
  area: "C",
  syllabusRefs: ["C2(e)", "C2(f)"],
  title: "Managing cash",
  minutes: 17,
  intro:
    "Too little cash and you cannot trade; too much and you are earning nothing on it. Two models decide the balance, and a cash budget shows when the problem arrives.",
  outcomes: [
    "Explain the motives for holding cash",
    "Prepare and interpret a cash budget",
    "Apply the Baumol and Miller–Orr cash management models",
    "Describe appropriate investments for short-term cash surpluses",
  ],
  sections: [
    {
      id: "motives-budget",
      heading: "Why hold cash, and when will you run out",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Keynes's three motives",
          items: [
            "**Transactions** — to meet day-to-day payments as they fall due.",
            "**Precautionary** — a buffer against cash flows being worse than forecast.",
            "**Speculative** — to be able to take an opportunity that requires cash quickly.",
          ],
        },
        {
          kind: "text",
          md: "A **cash budget** is the practical tool: receipts and payments period by period, giving the closing balance and — the point of the exercise — **when** a shortfall appears and **how large** it is. Only cash flows go in it: depreciation never appears, and the timing of receipts and payments matters more than the amounts.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two errors that ruin a cash budget",
          md: "Including **non-cash items** such as depreciation, and putting sales in the month they were **made** rather than the month they are **collected**. A cash budget is about timing; get the lag wrong and every subsequent balance is wrong.",
        },
        {
          kind: "example",
          title: "Timing is the whole exercise",
          scenario:
            "Sales are £100,000 a month. 40% of customers pay in the month of sale, 60% the following month. Purchases are 60% of sales, paid one month in arrears. What is the cash from operations in month 2?",
          steps: [
            { label: "Receipts in month 2", detail: "40% of month 2 (£40,000) + 60% of month 1 (£60,000) = £100,000" },
            { label: "Payments in month 2", detail: "Month 1 purchases: £100,000 × 60% = £60,000" },
            { label: "Net", detail: "£100,000 − £60,000 = £40,000 inflow" },
          ],
          result:
            "Steady sales still produce an uneven cash profile in the early months, because month 1 collects only 40% while paying nothing, and month 2 collects the arrears. That shape — not the profit — is what determines the overdraft needed.",
        },
      ],
      check: {
        q: "Which item should NOT appear in a cash budget?",
        options: ["Payment for a new machine", "Depreciation of the machine", "Receipt from a rights issue", "Payment of corporation tax"],
        correct: 1,
        explain:
          "Depreciation is an accounting allocation, not a cash movement. The machine's PURCHASE is a cash outflow and belongs in the budget in the month it is paid; the depreciation of it never appears at all.",
      },
    },
    {
      id: "models",
      heading: "Baumol and Miller–Orr",
      blocks: [
        {
          kind: "text",
          md: "Both models answer the same question — how much cash to hold and when to top it up — under different assumptions about how predictable the cash flows are.",
        },
        {
          kind: "formula",
          name: "Baumol model",
          expr: "Q = √( 2·Co·D / Ch )",
          note: "Co = transaction cost of each sale of securities · D = total cash needed over the period · Ch = interest forgone per £1 per period. Structurally identical to the EOQ.",
        },
        {
          kind: "text",
          md: "Baumol treats cash like inventory: it is used at a **steady, predictable rate** and topped up in fixed amounts. Its weakness is exactly that assumption — few businesses have smooth, certain cash flows.",
        },
        {
          kind: "formula",
          name: "Miller–Orr model",
          expr: "Spread = 3 × [ (¾ × Transaction cost × Variance of cash flows) / Interest rate ] ^⅓\nUpper limit = Lower limit + Spread\nReturn point = Lower limit + (Spread / 3)",
          note: "All inputs must be on the same time basis — a daily variance needs a DAILY interest rate.",
        },
        {
          kind: "text",
          md: "Miller–Orr allows cash to **fluctuate randomly** between a lower and an upper limit, acting only when a limit is breached: at the upper limit invest the excess, at the lower limit sell securities — in both cases returning to the **return point**, not to the middle.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The return point is one THIRD up, not halfway",
          md: "Assuming the midpoint is the most common Miller–Orr error. The asymmetry is deliberate: it is cheaper to let a balance drift upward than to keep buying and selling securities, so the model returns to a point closer to the lower limit.",
        },
        {
          kind: "activity",
          title: "Which model fits?",
          prompt:
            "A subscription business receives level monthly income and pays predictable salaries. A construction firm receives large irregular stage payments. Which model suits each?",
          answer:
            "The subscription business fits Baumol — steady, predictable usage is precisely its assumption. The construction firm fits Miller–Orr, which is built for variable, unpredictable flows and only acts when a limit is hit. Naming the assumption is what earns the mark, not naming the model.",
        },
      ],
      check: {
        q: "Miller–Orr gives a lower limit of £10,000 and a spread of £18,000. What is the return point?",
        options: ["£19,000", "£16,000", "£28,000", "£14,000"],
        correct: 1,
        explain:
          "Return point = lower limit + spread/3 = £10,000 + £6,000 = £16,000. The midpoint answer (£19,000) is the distractor this question exists to catch.",
      },
    },
    {
      id: "surplus",
      heading: "Investing a surplus",
      blocks: [
        {
          kind: "text",
          md: "Surplus cash should earn a return without compromising the reason it is held. Three criteria decide where it goes, and they conflict.",
        },
        {
          kind: "table",
          caption: "Choosing a short-term investment",
          head: ["Criterion", "What it means"],
          rows: [
            ["Liquidity", "Can it be converted to cash when needed, without notice?"],
            ["Safety", "Is the capital secure? Working capital must not be at risk of loss."],
            ["Return", "What does it earn — always the LAST of the three, not the first."],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Typical instruments",
          items: [
            "**Treasury bills** — government-backed, highly liquid, low return.",
            "**Bank deposits** — instant access or fixed term; the rate rises with the notice period.",
            "**Certificates of deposit** — tradeable, so liquid before maturity.",
            "**Money market funds** — diversified and liquid, with a small management charge.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Never equities",
          md: "Shares are not appropriate for short-term surpluses however good the expected return: the capital can fall exactly when the cash is needed. A question offering equities among the options is testing whether you know that.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Putting depreciation in a cash budget.", fix: "Cash budgets carry cash only. Depreciation is an allocation, never a flow." },
    { trap: "Taking the Miller–Orr return point as the midpoint of the spread.", fix: "Lower limit plus one third of the spread." },
    { trap: "Mixing time bases in Miller–Orr.", fix: "A daily variance requires a daily interest rate; convert before substituting." },
    { trap: "Recommending equities for surplus working capital.", fix: "Liquidity and safety come before return." },
  ],
  keyTerms: [
    { term: "Cash budget", def: "A period-by-period forecast of cash receipts and payments showing the closing balance." },
    { term: "Baumol model", def: "A cash model treating cash like inventory, assuming steady predictable usage." },
    { term: "Miller–Orr model", def: "A cash model for variable flows, acting only when an upper or lower limit is reached." },
    { term: "Return point", def: "The balance restored after a limit is breached: lower limit plus one third of the spread." },
  ],
  summary: [
    "Cash is held for transactions, precaution and speculation.",
    "A cash budget shows when a shortfall arrives; timing matters more than amounts.",
    "Baumol assumes steady usage; Miller–Orr handles random fluctuation.",
    "The return point is one third of the spread above the lower limit.",
    "Invest surpluses for liquidity and safety first, return last.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the three motives for holding cash.", a: "Transactions, precautionary and speculative." },
    { q: "Why does depreciation not appear in a cash budget?", a: "It is an accounting allocation, not a movement of cash." },
    { q: "State the Miller–Orr return point.", a: "Lower limit plus one third of the spread." },
    { q: "In what order should short-term investment criteria be applied?", a: "Liquidity, then safety, then return." },
  ],
  furtherStudy: [
    "FM-08 decides how the resulting cash position should be funded.",
    "Area G covers hedging the interest rate that these models take as given.",
  ],
}

const FM_TREE_08: StudyChapter = {
  paper: "FM",
  id: "FM-08",
  number: 8,
  area: "C",
  syllabusRefs: ["C3(a)", "C3(b)", "C3(c)"],
  title: "Working capital needs and funding strategy",
  minutes: 16,
  intro:
    "Some working capital never goes away. Deciding how much of it to fund long term is a strategy question, and getting it wrong is what turns a profitable company into an insolvent one.",
  outcomes: [
    "Distinguish permanent from fluctuating current assets",
    "Explain and compare conservative, matching and aggressive funding policies",
    "Identify the factors determining a company's working capital needs",
    "Explain the risk-return trade-off in a funding policy choice",
  ],
  sections: [
    {
      id: "permanent-fluctuating",
      heading: "Permanent and fluctuating current assets",
      blocks: [
        {
          kind: "text",
          md: "Current assets look temporary because each individual item is. But a trading business always holds *some* inventory and always has *some* receivables — that base never falls to zero, so it is **permanent in aggregate** even though every unit within it turns over.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two kinds of current asset",
            data: {
              leftTitle: "Permanent",
              rightTitle: "Fluctuating",
              rows: [
                { aspect: "Nature", left: "The minimum base always held", right: "Seasonal or cyclical peaks" },
                { aspect: "Example", left: "Core inventory and ongoing receivables", right: "Christmas stock build, harvest financing" },
                { aspect: "Sensible funding", left: "Long-term finance", right: "Short-term finance" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "This is the whole idea",
          md: "Funding a permanent need with an overdraft is the mechanism behind overtrading: the requirement never goes away, but the facility is repayable on demand. The bank can withdraw funding that the business structurally cannot repay.",
        },
      ],
    },
    {
      id: "policies",
      heading: "Three funding policies",
      blocks: [
        {
          kind: "table",
          caption: "How much is funded long term",
          head: ["Policy", "Approach", "Risk", "Cost"],
          rows: [
            ["Conservative", "Long-term finance covers permanent AND part of the fluctuating need", "Low — surplus cash in troughs", "High — paying for finance not always used"],
            ["Matching", "Permanent funded long term, fluctuating funded short term", "Moderate", "Moderate"],
            ["Aggressive", "Short-term finance covers all fluctuating AND part of the permanent need", "High — refinancing and rate risk", "Low — short-term finance is usually cheaper"],
          ],
        },
        {
          kind: "text",
          md: "The trade-off runs on two facts about short-term finance: it is normally **cheaper** (the yield curve usually slopes upward) and it is **riskier** (it must be renewed, at a rate that may have moved, by a lender who may say no).",
        },
        {
          kind: "illustration",
          title: "The aggressive policy, in a bad month",
          md: "A retailer funds its core inventory on an overdraft because the rate is 2% below a term loan. For three years it saves money and looks well managed.\n\nThen credit conditions tighten. The bank reduces the facility at renewal. The inventory has not changed and cannot be liquidated quickly without discounting it heavily. The saving of the previous three years is lost in a fortnight.\n\nThat is not an argument against aggressive funding — it is the risk that the lower cost was paying for. A good answer prices both sides.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What a discussion question wants",
          md: "Identify the policy from the numbers first — compare short-term finance against the permanent asset base — then state the risk it carries and the saving it buys, and only then recommend, referring to the scenario's stability and access to credit.",
        },
      ],
      check: {
        q: "A company funds all its fluctuating current assets and part of its permanent current assets with short-term borrowing. Which policy is this?",
        options: ["Conservative", "Matching", "Aggressive", "Neutral"],
        correct: 2,
        explain:
          "Using short-term finance for part of the PERMANENT base is the aggressive policy: cheapest, and exposed to refinancing risk on a requirement that never goes away. Matching would fund the permanent base entirely long term.",
      },
    },
    {
      id: "determinants",
      heading: "What determines the level needed",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Factors driving working capital requirements",
          items: [
            "**Nature of the business** — a supermarket collects instantly and pays suppliers later, so it can run a negative cycle; a manufacturer with a long production process cannot.",
            "**Length of the operating cycle** — every extra day must be financed.",
            "**Level and growth of activity** — working capital scales with turnover, which is why rapid growth consumes cash.",
            "**Terms of trade** — what customers expect and what suppliers grant, both often set by industry convention rather than negotiation.",
            "**Inventory and credit policy** — the deliberate choices from the previous three chapters.",
            "**Seasonality** — the size of the peak determines the fluctuating element.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not benchmark across industries",
          md: "A current ratio of 1.1 is alarming for a shipbuilder and entirely normal for a supermarket. Comparison is only meaningful against the same industry or the same company over time — say which you are using.",
        },
      ],
      check: {
        q: "Why can a supermarket operate with a negative cash operating cycle?",
        options: [
          "It has no inventory",
          "It sells for cash and takes extended credit from suppliers, so it is paid before it pays",
          "Its profit margins are higher than a manufacturer's",
          "It uses aggressive short-term funding",
        ],
        correct: 1,
        explain:
          "Receivables days are near zero and payables days are long, so payables exceed inventory plus receivables days. Supermarkets hold substantial inventory — it simply turns over faster than the credit period they take.",
      },
    },
    {
      id: "identify-the-policy",
      heading: "Identifying the policy from the numbers",
      blocks: [
        {
          kind: "text",
          md: "Questions rarely say \"this company follows an aggressive policy\". They give a balance sheet and expect you to work it out — by comparing the **permanent** part of current assets with the **long-term finance** available to fund it.",
        },
        {
          kind: "example",
          title: "Two companies, same industry, opposite policies",
          scenario:
            "Both companies have current assets that never fall below £4m, peaking at £6m in the autumn. Company A has long-term finance of £7m and an overdraft facility of £1m. Company B has long-term finance of £3m and an overdraft facility of £3.5m.",
          steps: [
            { label: "The permanent element", detail: "£4m for both — the floor that never goes away, however fast individual items turn over." },
            { label: "The fluctuating element", detail: "Up to £2m in the autumn peak." },
            { label: "Company A", detail: "Long-term finance of £7m covers the £4m permanent base AND part of the fluctuating need. CONSERVATIVE: safe, with idle cash in the troughs, and paying for finance it does not always use." },
            { label: "Company B", detail: "Long-term finance of £3m does not even cover the £4m permanent base, so £1m of permanent need sits on an overdraft. AGGRESSIVE: cheapest, and exposed to a facility that is repayable on demand against assets it cannot liquidate quickly." },
            { label: "What would matching look like?", detail: "Long-term finance of about £4m, with the £2m seasonal peak on short-term facilities." },
          ],
          result:
            "Company B is the one to watch. Its position is not wrong — it may be entirely rational while credit is cheap and available — but it is the structure that turns a profitable year into an insolvency the moment a bank reduces a facility. That is the FM-04 overtrading mechanism, seen from the funding side.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The one comparison that answers the question",
          md: "**Long-term finance against the permanent element of current assets.** If long-term finance is less than the permanent base, the policy is aggressive. That single comparison identifies the policy, and everything else in the answer follows from it.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating all current assets as short-term needs.", fix: "A permanent base is always held; it needs permanent funding." },
    { trap: "Calling short-term finance simply \"better because cheaper\".", fix: "Cheaper AND riskier — it must be renewed at an unknown rate by a willing lender." },
    { trap: "Comparing liquidity ratios across different industries.", fix: "Benchmark within an industry, or against the same company over time." },
  ],
  keyTerms: [
    { term: "Permanent current assets", def: "The minimum level of current assets always held, however fast individual items turn over." },
    { term: "Matching policy", def: "Funding permanent assets with long-term finance and fluctuating assets with short-term finance." },
    { term: "Aggressive policy", def: "Using short-term finance for part of the permanent asset base — cheaper and riskier." },
    { term: "Conservative policy", def: "Using long-term finance beyond the permanent base — safer and more expensive." },
  ],
  summary: [
    "Part of current assets is permanent in aggregate and needs long-term funding.",
    "Conservative, matching and aggressive policies differ in how much is funded long term.",
    "Short-term finance is cheaper and carries refinancing and interest-rate risk.",
    "Requirements depend on industry, cycle length, growth, trade terms and seasonality.",
    "Liquidity ratios are only comparable within an industry or over time.",
  ],
  knowledgeDiagnostic: [
    { q: "What are permanent current assets?", a: "The minimum base of inventory and receivables always held, even though individual items turn over." },
    { q: "Describe the matching funding policy.", a: "Permanent current assets funded with long-term finance; fluctuating current assets funded with short-term finance." },
    { q: "Give one advantage and one disadvantage of an aggressive policy.", a: "Advantage: short-term finance is normally cheaper. Disadvantage: refinancing risk and exposure to rate rises on a need that never disappears." },
    { q: "Name three factors determining working capital needs.", a: "Nature of the business, length of the operating cycle, level and growth of activity. (Also trade terms, inventory and credit policy, seasonality.)" },
  ],
  furtherStudy: [
    "Area E supplies the long-term finance this policy calls for.",
    "FM-04's overtrading is what an aggressive policy produces when growth outruns capital.",
  ],
}

export const FM_TREE_AREA_C: StudyChapter[] = [FM_TREE_04, FM_TREE_05, FM_TREE_06, FM_TREE_07, FM_TREE_08]
