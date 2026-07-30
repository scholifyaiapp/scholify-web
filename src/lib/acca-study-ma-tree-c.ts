import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area C — Cost accounting techniques.
 * Chapters 10–15 of the MA reading tree, mapped to syllabus groups C1–C4.
 *
 * The computational core of the paper, and the area most heavily examined. C1
 * alone covers materials, labour and overheads, which is far too much for one
 * chapter — each gets its own here, because each carries its own formulae and its
 * own characteristic exam traps.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 10 · C1(a) ────────────────────────────────────────── */

export const MA_TREE_10: StudyChapter = {
  id: "MA-10",
  number: 10,
  paper: "MA",
  area: "C",
  title: "Accounting for materials",
  minutes: 20,
  syllabusRefs: ["C1(a)"],
  intro:
    "Materials are usually the largest single cost in a manufacturing business, and the questions are always the same three: how much to order, when to order it, and what value to put on what is left.",
  outcomes: [
    "Describe the documents and procedures in the materials cycle",
    "Calculate reorder level, minimum, maximum and average inventory levels",
    "Calculate and interpret the economic order quantity, including with bulk discounts",
    "Calculate the economic batch quantity",
    "Value inventory issues and closing inventory using FIFO, LIFO and AVCO, and compare their effects",
    "Explain the costs of holding and of ordering inventory",
  ],
  sections: [
    {
      id: "the-cycle",
      heading: "The materials cycle and its documents",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "From requisition to issue",
            caption: "Each document is a control point as well as a record — the audit trail of Chapter 1's 'good information'.",
            data: {
              steps: [
                { label: "Purchase requisition", sub: "stores identifies a need and requests a purchase" },
                { label: "Purchase order", sub: "authorised order placed with an approved supplier" },
                { label: "Goods received note", sub: "delivery checked for quantity, quality and against the order" },
                { label: "Stores record / bin card", sub: "receipt recorded; the running balance updated" },
                { label: "Materials requisition", sub: "production requests materials from stores" },
                { label: "Issue to production", sub: "materials issued, valued, and charged to the job or cost centre" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The two inventory records candidates are asked to distinguish",
          head: ["Record", "Held by", "Contains"],
          rows: [
            ["**Bin card**", "Stores", "Quantities only — receipts, issues and the running balance for one item"],
            ["**Stores ledger account**", "The accounts department", "Quantities **and values** — receipts, issues and balance, priced under the chosen valuation method"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why a perpetual system needs both",
          md: "The bin card is a physical control kept where the goods are; the stores ledger is the accounting record. Agreeing one to the other is a genuine control — a discrepancy means goods have moved without a document, or a document has been raised without goods moving. This is the materials equivalent of the control account reconciliation.",
        },
      ],
    },
    {
      id: "inventory-levels",
      heading: "Inventory control levels",
      blocks: [
        {
          kind: "text",
          md: "Holding too little risks stopping production; holding too much ties up cash and incurs storage cost. Control levels are the mechanism for staying between the two.",
        },
        {
          kind: "formula",
          name: "The control levels",
          expr: "Reorder level  =  Maximum usage  ×  Maximum lead time\n\nMinimum level  =  Reorder level  −  (Average usage  ×  Average lead time)\n\nMaximum level  =  Reorder level  +  Reorder quantity  −  (Minimum usage  ×  Minimum lead time)\n\nAverage inventory  =  Buffer (minimum) inventory  +  ½ Reorder quantity",
          note: "Note which extreme each uses: the reorder level assumes the WORST case (maximum usage over maximum lead time), so that stock does not run out. The maximum level assumes the BEST case, because that is when stock peaks highest.",
        },
        {
          kind: "example",
          title: "Worked example — all four control levels",
          scenario:
            "A component is used at between 300 and 500 units a week, averaging 400. Lead time is between 2 and 4 weeks, averaging 3. The reorder quantity is 2,500 units. Calculate the reorder level, minimum level, maximum level and average inventory.",
          steps: [
            { label: "Reorder level — plan for the worst case", detail: "Maximum usage × maximum lead time = 500 × 4 = 2,000 units. Order when stock falls to 2,000, so that even at maximum usage and maximum delay, stock reaches zero exactly as the delivery arrives." },
            { label: "Minimum level (buffer stock)", detail: "Reorder level − (average usage × average lead time) = 2,000 − (400 × 3 = 1,200) = 800 units. This is the cushion expected to remain when a normal delivery arrives." },
            { label: "Maximum level — the best case, when stock peaks", detail: "Reorder level + reorder quantity − (minimum usage × minimum lead time) = 2,000 + 2,500 − (300 × 2 = 600) = 3,900 units. Stock is highest when usage was slowest and the delivery arrived soonest." },
            { label: "Average inventory", detail: "Buffer + half the reorder quantity = 800 + (2,500 ÷ 2 = 1,250) = 2,050 units." },
          ],
          result:
            "Reorder level 2,000; minimum 800; maximum 3,900; average 2,050 units. The examinable logic is which extreme each formula uses: **reorder level takes the maximums** because it protects against running out, while **maximum level takes the minimums** because that is the combination under which stock climbs highest. Candidates who use averages throughout get plausible figures that defeat the purpose of the levels.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The buffer inventory point",
          md: "**Average inventory is buffer stock plus HALF the reorder quantity**, not half the reorder quantity alone. Stock cycles between the buffer and buffer-plus-order-quantity, so the average sits in the middle of that band — above the buffer, not above zero. Omitting the buffer is a very common error, and it understates holding cost.",
        },
      ],
      check: {
        q: "Maximum usage is 600 units per week and maximum lead time is 3 weeks. Average usage is 450 units and average lead time 2 weeks. What is the reorder level?",
        options: ["900 units", "1,350 units", "1,800 units", "2,700 units"],
        correct: 2,
        explain:
          "Reorder level = MAXIMUM usage × MAXIMUM lead time = 600 × 3 = 1,800 units. The formula deliberately uses the worst case, so that stock does not run out even if consumption is at its fastest and the delivery at its slowest. Using averages gives 900 and would leave the business exposed roughly half the time.",
      },
    },
    {
      id: "eoq",
      heading: "The economic order quantity",
      blocks: [
        {
          kind: "text",
          md: "Ordering in large quantities means few orders but high average stock; ordering in small quantities means low stock but many orders. The EOQ is the order size at which the **total** of the two costs is lowest.",
        },
        {
          kind: "table",
          caption: "The two costs that pull against each other",
          head: ["Ordering costs — fall as order size rises", "Holding costs — rise as order size rises"],
          rows: [
            ["Placing and processing each order", "Warehousing, rent and storage space"],
            ["Delivery and carriage per order", "Insurance of inventory"],
            ["Goods inwards inspection per delivery", "The cost of capital tied up in stock"],
            ["Invoice processing and payment per order", "Deterioration, obsolescence, theft and damage"],
          ],
        },
        {
          kind: "formula",
          name: "Economic order quantity",
          expr: "EOQ  =  √( 2 C₀ D  ÷  C h )",
          note: "C₀ = cost of placing ONE order · D = annual DEMAND in units · Ch = cost of holding ONE unit for a YEAR. Provided on the exam formulae sheet. At the EOQ, total ordering cost equals total holding cost — a useful check on your answer.",
        },
        {
          kind: "example",
          title: "Worked example — EOQ and the total cost check",
          scenario:
            "Annual demand is 40,000 units. Each order costs $80 to place. Holding cost is $2.50 per unit per year. Calculate the EOQ, the number of orders a year, and total ordering and holding cost.",
          steps: [
            { label: "Apply the formula", detail: "EOQ = √(2 × 80 × 40,000 ÷ 2.50) = √(6,400,000 ÷ 2.50) = √2,560,000 = 1,600 units." },
            { label: "Number of orders a year", detail: "Annual demand ÷ order size = 40,000 ÷ 1,600 = 25 orders." },
            { label: "Total ordering cost", detail: "25 orders × $80 = $2,000." },
            { label: "Total holding cost", detail: "Average inventory is half the order quantity (no buffer stated) = 1,600 ÷ 2 = 800 units. Holding cost = 800 × $2.50 = $2,000." },
            { label: "Check", detail: "Ordering cost $2,000 equals holding cost $2,000, which is the defining property of the EOQ. Total inventory cost = $4,000." },
          ],
          result:
            "EOQ 1,600 units, 25 orders a year, total cost $4,000. Note the check: **at the EOQ the two costs are equal.** If your ordering and holding costs come out materially different, the EOQ is wrong — usually because holding cost was applied to the full order quantity rather than to the average.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Holding cost applies to AVERAGE inventory",
          md: "Average inventory is **half** the order quantity (plus any buffer stock). Applying the holding cost to the whole order quantity doubles it and is the single commonest EOQ error. Think about why: stock arrives at Q and is consumed to zero, so on average you hold Q ÷ 2.",
        },
        {
          kind: "example",
          title: "Worked example — EOQ with a bulk discount",
          scenario:
            "Using the figures above (demand 40,000; order cost $80; holding cost $2.50 per unit per year; purchase price $20 per unit), the supplier offers a 1% discount on orders of 4,000 units or more. Should the offer be accepted?",
          steps: [
            { label: "Recognise that the EOQ alone cannot answer this", detail: "The EOQ minimises ordering plus holding cost. A discount changes the PURCHASE cost, which the EOQ formula ignores — so all three costs must be compared at each candidate order size." },
            { label: "Total cost at the EOQ of 1,600 units", detail: "Purchase: 40,000 × $20 = $800,000. Ordering: 25 × $80 = $2,000. Holding: 800 × $2.50 = $2,000. Total = $804,000." },
            { label: "Total cost at 4,000 units with the 1% discount", detail: "Price becomes $19.80. Purchase: 40,000 × $19.80 = $792,000. Orders: 40,000 ÷ 4,000 = 10, so ordering = 10 × $80 = $800. Holding: average 2,000 units × $2.50 = $5,000. Total = $797,800." },
            { label: "Compare", detail: "$797,800 against $804,000 — the discount saves $6,200 a year." },
            { label: "Note where the saving comes from", detail: "The discount saves $8,000 of purchase cost and $1,200 of ordering cost, but costs $3,000 more in holding. The purchase saving dominates, which is typical: a 1% discount on a large annual spend usually outweighs the extra holding cost." },
          ],
          result:
            "**Accept the discount** — total annual cost falls by $6,200. The method is the examinable part: compare **purchase + ordering + holding** at the EOQ and at each discount threshold, and choose the lowest total. Comparing only ordering and holding cost, or only the discount, both give the wrong answer. Where holding cost is stated as a percentage of purchase price, remember it falls with the discounted price too.",
        },
        {
          kind: "formula",
          name: "Economic batch quantity",
          expr: "EBQ  =  √[ 2 C₀ D  ÷  Ch (1 − D/R) ]",
          note: "R = the annual production RATE. Used where a business MAKES rather than buys, so stock builds up gradually while being consumed. Because stock never reaches the full batch size, average inventory is lower and the EBQ is LARGER than the equivalent EOQ. Provided in the exam.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "EOQ or EBQ?",
          md: "**Buying** in from a supplier, so the whole quantity arrives at once → **EOQ**. **Making** it internally, so stock accumulates while being used → **EBQ**. The giveaway in a question is a stated **production rate** (R) alongside demand: that is the term only the EBQ uses.",
        },
      ],
      check: {
        q: "Annual demand is 12,500 units, each order costs $40 to place and holding cost is $1.60 per unit per year. What is the EOQ?",
        options: ["559 units", "790 units", "625 units", "1,118 units"],
        correct: 0,
        explain:
          "EOQ = √(2 × 40 × 12,500 ÷ 1.60) = √(1,000,000 ÷ 1.60) = √625,000 = 790.6, so 790 units — wait, check the arithmetic: 2 × 40 × 12,500 = 1,000,000; ÷ 1.60 = 625,000; √625,000 = 790.6. The correct answer is 790 units. Note how the distractors are built: 559 is the result of omitting the 2 in the numerator, 625 is the un-square-rooted intermediate figure divided by 1,000, and 1,118 is the result of doubling before the root. Always compute the bracket fully, then take the root.",
      },
    },
    {
      id: "valuation",
      heading: "Valuing issues and closing inventory",
      blocks: [
        {
          kind: "definition",
          term: "The three valuation methods",
          md: "**FIFO** (first in, first out) issues the **oldest** stock first. **LIFO** (last in, first out) issues the **newest** first. **AVCO** (weighted average cost) issues at a **weighted average**, recalculated after each receipt.",
        },
        {
          kind: "example",
          title: "Worked example — FIFO, LIFO and AVCO compared",
          scenario:
            "Opening inventory nil. Receipts: 1 March 200 units at $10; 8 March 300 units at $12. Issue: 15 March 400 units. Receipt: 22 March 200 units at $13. Value the 15 March issue and the closing inventory under each method.",
          steps: [
            { label: "FIFO — issue the oldest first", detail: "Issue of 400 takes all 200 at $10 = $2,000, then 200 of the $12 batch = $2,400. Issue value $4,400. Remaining: 100 at $12 = $1,200, plus 200 at $13 = $2,600. Closing inventory = $3,800." },
            { label: "LIFO — issue the newest first", detail: "At 15 March the newest available is the $12 batch: 300 at $12 = $3,600, then 100 at $10 = $1,000. Issue value $4,600. Remaining: 100 at $10 = $1,000, plus the later 200 at $13 = $2,600. Closing inventory = $3,600." },
            { label: "AVCO — weighted average at the date of issue", detail: "Before the issue: 200 at $10 ($2,000) + 300 at $12 ($3,600) = 500 units, $5,600, so $11.20 per unit. Issue of 400 × $11.20 = $4,480. Remaining 100 × $11.20 = $1,120, plus 200 at $13 = $2,600. Closing inventory = $3,720." },
            { label: "Check that each method's figures reconcile", detail: "Total cost of purchases = $2,000 + $3,600 + $2,600 = $8,200 under every method. FIFO: 4,400 + 3,800 = 8,200. LIFO: 4,600 + 3,600 = 8,200. AVCO: 4,480 + 3,720 = 8,200. All agree." },
          ],
          result:
            "FIFO issue $4,400, closing $3,800. LIFO issue $4,600, closing $3,600. AVCO issue $4,480, closing $3,720. **Total cost is identical under all three** — the methods only decide how it is SPLIT between cost of sales and closing inventory, and that reconciliation is the fastest way to check your answer.",
        },
        {
          kind: "table",
          caption: "The effect of each method when prices are RISING",
          head: ["", "FIFO", "LIFO", "AVCO"],
          rows: [
            ["Issues valued at", "Older, **lower** prices", "Newer, **higher** prices", "Between the two"],
            ["Closing inventory valued at", "Newer, **higher** prices", "Older, **lower** prices", "Between the two"],
            ["Reported profit", "**Highest**", "**Lowest**", "Between the two"],
            ["Balance sheet inventory", "Closest to current value", "Understated against current value", "Between the two"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The rising-prices table is the examinable content",
          md: "When prices are **rising**: FIFO gives the **lowest cost of sales and the highest profit**, and the closing inventory closest to current cost. LIFO does the reverse. Reverse the whole table if prices are falling. Note also that **IAS 2 does not permit LIFO** for financial reporting — but MA still examines it as a cost accounting technique, so learn it.",
        },
        {
          kind: "activity",
          title: "Activity 1 — advise on the method",
          prompt:
            "A company's material prices have risen sharply during the year. The production director argues for LIFO so that 'the cost charged to production reflects what we would actually pay to replace the material'. The finance director objects.\n\nEvaluate the argument and state the objections.",
          answer:
            "**The production director has a genuine point on relevance.** LIFO charges production at the most recent prices, so the cost of sales is closer to the **replacement cost** of the material consumed. For a decision about whether a product is still worth making at current prices, that is the more useful figure — pricing a job at costs from six months ago will systematically under-recover.\n\n**Three objections.**\n\n(1) **It is not permitted for financial reporting.** IAS 2 does not allow LIFO, so the company would need FIFO or AVCO for its statutory accounts and would be maintaining two valuations — extra cost and a reconciliation to explain.\n\n(2) **It understates closing inventory.** LIFO leaves the oldest, cheapest prices in the balance sheet, so with sharply rising prices the inventory figure drifts further from any current value the longer old layers remain — which misleads anyone reading the statement of financial position.\n\n(3) **It reduces reported profit** in a period of rising prices. That is not itself an objection to accuracy, and there are tax arguments either way, but the finance director will note that it makes the year look worse and that the difference is a valuation choice rather than a real change in performance.\n\n**Recommendation.** Use FIFO or AVCO for the accounting records, and give the production director what he actually needs — a **replacement cost** figure for pricing and make-or-buy decisions — as separate management information. The valuation method for the ledger and the cost basis for a decision do not have to be the same thing, and that distinction is the answer the examiner is looking for.",
        },
      ],
      check: {
        q: "During a period of rising material prices, which valuation method produces the highest reported profit?",
        options: ["LIFO", "FIFO", "AVCO", "All three give the same profit"],
        correct: 1,
        explain:
          "FIFO issues the OLDEST, cheapest stock first, so cost of sales is lowest and reported profit is HIGHEST when prices are rising. LIFO issues the newest and dearest, giving the lowest profit, and AVCO falls between them. Note that total cost over the whole period is identical under all three — the methods only decide how it splits between cost of sales and closing inventory.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using average usage and average lead time to compute the reorder level.",
      fix: "The reorder level uses MAXIMUM usage × MAXIMUM lead time, because it exists to prevent a stockout in the worst case.",
    },
    {
      trap: "Taking average inventory as half the reorder quantity, ignoring buffer stock.",
      fix: "Average inventory = buffer stock + half the reorder quantity. Stock cycles above the buffer, not above zero.",
    },
    {
      trap: "Applying holding cost to the full order quantity in an EOQ calculation.",
      fix: "Holding cost applies to AVERAGE inventory, which is half the order quantity. Applying it to the whole quantity doubles it.",
    },
    {
      trap: "Using the EOQ formula to decide whether to accept a bulk discount.",
      fix: "The EOQ ignores purchase price. Compare purchase + ordering + holding cost at the EOQ and at each discount threshold, and pick the lowest total.",
    },
    {
      trap: "Using EOQ where the business manufactures the item itself.",
      fix: "Use the EBQ, which allows for stock building up gradually while being consumed. A stated production rate R is the giveaway.",
    },
    {
      trap: "Thinking FIFO, LIFO and AVCO change the total cost of materials.",
      fix: "Total cost is identical. They only decide how it splits between cost of sales and closing inventory — and that reconciliation checks your answer.",
    },
    {
      trap: "Reversing the profit effect of FIFO and LIFO.",
      fix: "With RISING prices, FIFO gives the lowest cost of sales and highest profit; LIFO the reverse. Reverse it all if prices are falling.",
    },
  ],
  keyTerms: [
    { term: "Reorder level", def: "The inventory level at which a new order is placed: maximum usage × maximum lead time." },
    { term: "Buffer (minimum) inventory", def: "The cushion of stock expected to remain when a delivery arrives under average conditions." },
    { term: "Economic order quantity", def: "The order size minimising the total of ordering and holding costs, √(2C₀D ÷ Ch)." },
    { term: "Economic batch quantity", def: "The production batch size minimising total set-up and holding costs where stock builds up while being consumed." },
    { term: "Holding cost", def: "The cost of keeping one unit of inventory for a year — storage, insurance, capital tied up, obsolescence." },
    { term: "Ordering cost", def: "The cost of placing and processing one order, including delivery and goods inwards inspection." },
    { term: "FIFO", def: "First in, first out — issues are valued at the cost of the oldest inventory held." },
    { term: "LIFO", def: "Last in, first out — issues are valued at the cost of the most recently acquired inventory." },
    { term: "AVCO", def: "Weighted average cost — issues are valued at a weighted average recalculated after each receipt." },
    { term: "Bin card", def: "A stores record showing quantities only of receipts, issues and the running balance for one item." },
  ],
  summary: [
    "The materials cycle runs requisition, order, goods received note, stores record, materials requisition and issue.",
    "A bin card records quantities; the stores ledger records quantities and values, and agreeing them is a real control.",
    "Reorder level uses maximum usage × maximum lead time; maximum level uses the minimums, because that is when stock peaks.",
    "Average inventory is buffer stock plus half the reorder quantity.",
    "The EOQ balances ordering against holding cost, and at the EOQ the two are equal — a useful check.",
    "Holding cost applies to average inventory, which is half the order quantity.",
    "A bulk discount decision needs purchase, ordering and holding cost compared at each candidate order size.",
    "The EBQ applies where the business manufactures the item, so stock builds up while being consumed.",
    "FIFO, LIFO and AVCO give the same total cost but split it differently; with rising prices FIFO gives the highest profit.",
  ],
  knowledgeDiagnostic: [
    { q: "How is the reorder level calculated, and why does it use maximums?", a: "Maximum usage × maximum lead time. It uses the worst case so that stock does not run out even if consumption is fastest and delivery slowest." },
    { q: "What is average inventory, and what is the common error?", a: "Buffer stock plus half the reorder quantity. The common error is taking half the reorder quantity alone, which omits the buffer and understates holding cost." },
    { q: "State the EOQ formula and the check on your answer.", a: "EOQ = √(2C₀D ÷ Ch). At the EOQ, total ordering cost equals total holding cost — if they differ materially, holding cost was probably applied to the full order quantity rather than the average." },
    { q: "How do you decide whether to accept a bulk discount?", a: "Compare the total of purchase cost, ordering cost and holding cost at the EOQ and at each discount threshold, and choose the lowest. The EOQ formula alone cannot answer it, because it ignores purchase price." },
    { q: "With prices rising, what does FIFO do to profit and closing inventory?", a: "It issues the oldest, cheapest stock first, so cost of sales is lowest, reported profit is highest, and closing inventory is valued at the newest and therefore most current prices." },
  ],
  furtherStudy: [
    "Inventory control connects to working capital management, examined quantitatively in **FM**.",
    "Material price and usage variances, which measure performance against a standard cost, are Chapter 22.",
  ],
}

/* ── Chapter 11 · C1(b) ────────────────────────────────────────── */

export const MA_TREE_11: StudyChapter = {
  id: "MA-11",
  number: 11,
  paper: "MA",
  area: "C",
  title: "Accounting for labour",
  minutes: 18,
  syllabusRefs: ["C1(b)"],
  intro:
    "Labour raises a question materials do not: the same hour can be productive, idle or overtime, and how it is classified decides which product bears it — and whether a manager is judged fairly.",
  outcomes: [
    "Distinguish direct from indirect labour cost, including the treatment of overtime and idle time",
    "Calculate labour cost under time-based, piecework and bonus schemes",
    "Calculate and interpret labour turnover and explain its causes and costs",
    "Calculate and interpret the efficiency, capacity and production volume ratios",
    "Account for labour in the cost ledger",
  ],
  sections: [
    {
      id: "direct-indirect-labour",
      heading: "Direct and indirect labour cost",
      blocks: [
        {
          kind: "definition",
          term: "Direct and indirect labour",
          md: "**Direct labour** works on the product and its cost is traceable to cost units — the machinist, the assembler. **Indirect labour** supports production without working on the product — supervisors, storekeepers, maintenance staff, cleaners.",
        },
        {
          kind: "table",
          caption: "The classification rules that get examined",
          head: ["Item", "Treatment", "Why"],
          rows: [
            ["Basic pay of production workers", "**Direct**", "Traceable to the units worked on"],
            ["Basic pay of supervisors, storekeepers, maintenance", "**Indirect** (production overhead)", "Cannot be traced to individual units"],
            ["**Overtime premium** — the extra above basic rate", "**Indirect**, normally", "The premium arises from when the work was done, not from the product; charging it to whichever job happened to run late would be arbitrary"],
            ["Overtime premium where the **customer specifically requested** urgent completion", "**Direct** to that job", "The premium is directly attributable to that customer's requirement"],
            ["**Idle time** payments", "**Indirect**", "No product was worked on, so there is nothing to trace it to"],
            ["Basic pay for overtime hours (not the premium)", "**Direct**, if the worker is direct labour", "It is time spent on the product at the normal rate"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Overtime: split the payment in two",
          md: "An overtime hour paid at time-and-a-half is **two** things: the **basic rate** for an hour worked on the product (direct), plus the **premium** of half an hour's pay arising from the timing (indirect). Treating the whole payment as direct overstates the cost of whichever job happened to be running at the time — and the split is a standard one-mark question.",
        },
        {
          kind: "example",
          title: "Worked example — splitting an overtime payment",
          scenario:
            "A direct worker is paid $14 per hour for a 37-hour week. In one week she works 45 hours, with overtime paid at time-and-a-half. Of the 45 hours, 3 were idle time caused by a machine breakdown. Analyse the total pay between direct and indirect cost.",
          steps: [
            { label: "Total pay", detail: "Basic 37 hours × $14 = $518. Overtime 8 hours at $21 (time-and-a-half) = $168. Total pay = $686." },
            { label: "Separate the overtime premium", detail: "The 8 overtime hours contain basic pay of 8 × $14 = $112 and a premium of 8 × $7 = $56. So the whole 45 hours carries basic pay of 45 × $14 = $630, plus a $56 premium." },
            { label: "Deal with idle time", detail: "3 of the 45 hours were idle. Their basic pay of 3 × $14 = $42 is INDIRECT, because no product was worked on." },
            { label: "Direct labour cost", detail: "Productive hours 45 − 3 = 42, at the basic rate: 42 × $14 = $588." },
            { label: "Indirect labour cost", detail: "Overtime premium $56 + idle time $42 = $98." },
            { label: "Check", detail: "$588 + $98 = $686, agreeing to total pay." },
          ],
          result:
            "Direct labour $588; indirect labour $98. Two separate splits are needed and candidates typically make only one: **strip out the overtime PREMIUM**, and **strip out the IDLE hours' basic pay**. The reconciliation back to total pay of $686 is what confirms both were done.",
        },
      ],
      check: {
        q: "A direct worker's overtime premium arises because the factory was generally behind schedule. How should the premium be treated?",
        options: [
          "Direct cost of the job worked on during the overtime hours",
          "Indirect cost, charged to production overhead",
          "Excluded from cost accounting entirely",
          "Direct cost, split equally between all jobs in progress",
        ],
        correct: 1,
        explain:
          "The premium arises from WHEN the work was done rather than from any particular product, so it is INDIRECT and charged to production overhead. Charging it to whichever job happened to run into the evening would be arbitrary. The exception is where a specific customer requested urgent completion — then the premium is directly attributable to that job.",
      },
    },
    {
      id: "remuneration",
      heading: "Remuneration methods",
      blocks: [
        {
          kind: "table",
          caption: "The three basic schemes",
          head: ["Scheme", "How pay is calculated", "Advantages", "Disadvantages"],
          rows: [
            ["**Time-based**", "Hours worked × rate per hour", "Simple; suits work where quality or pace cannot be rushed; predictable pay", "No incentive to be productive; needs supervision; cost per unit rises if output falls"],
            ["**Piecework**", "Units produced × rate per unit", "Direct incentive to produce; labour cost per unit is fixed and predictable", "Quality may suffer; unsuitable where output is outside the worker's control; earnings vary, so a guaranteed minimum is often needed"],
            ["**Bonus / incentive**", "Basic pay plus a bonus for output or time saved above a target", "Combines security with incentive; shares the gain between worker and employer", "More complex to administer; the target must be fair and kept current"],
          ],
        },
        {
          kind: "formula",
          name: "A typical time-saved bonus",
          expr: "Bonus  =  Time saved  ×  Basic rate  ×  Proportion shared with the employee",
          note: "Time saved = standard time allowed for the output produced, less actual time taken. Read the proportion from the question — 50% is common but never assume it.",
        },
        {
          kind: "example",
          title: "Worked example — piecework with a guarantee, and a bonus scheme",
          scenario:
            "(a) A worker is paid $1.20 per unit with a guaranteed minimum of $420 per week. In one week she produces 320 units. What is her pay? (b) Another worker is paid $15 per hour and receives 60% of the value of time saved. The standard time is 15 minutes per unit; she produces 180 units in 38 hours. Calculate her total pay.",
          steps: [
            { label: "(a) Piecework earnings", detail: "320 units × $1.20 = $384." },
            { label: "(a) Apply the guarantee", detail: "$384 is below the $420 guaranteed minimum, so she is paid $420. The extra $36 is INDIRECT labour cost, because it does not relate to units produced." },
            { label: "(b) Standard time allowed for the output", detail: "180 units × 15 minutes = 2,700 minutes = 45 hours." },
            { label: "(b) Time saved", detail: "Standard 45 hours − actual 38 hours = 7 hours saved." },
            { label: "(b) Bonus", detail: "7 hours × $15 × 60% = $63." },
            { label: "(b) Total pay", detail: "Basic 38 hours × $15 = $570, plus bonus $63 = $633." },
          ],
          result:
            "(a) $420, of which $36 is indirect. (b) $633. Note the two things questions test here: a **guaranteed minimum** creates an indirect element when output falls short, and time saved is measured against the **standard time for the output actually produced** — not against the contracted hours.",
        },
      ],
    },
    {
      id: "labour-turnover",
      heading: "Labour turnover",
      blocks: [
        {
          kind: "formula",
          name: "Labour turnover rate",
          expr: "Labour turnover  =  ( Number of leavers REPLACED  ÷  Average number of employees )  ×  100",
          note: "Only leavers who had to be REPLACED count. Someone leaving a post that is then abolished is not a turnover problem, because no replacement cost is incurred.",
        },
        {
          kind: "example",
          title: "Worked example — labour turnover",
          scenario:
            "A department began the year with 240 employees and ended with 260. During the year 46 people left, of whom 8 left posts that were then closed. Calculate the labour turnover rate.",
          steps: [
            { label: "Average number of employees", detail: "(240 + 260) ÷ 2 = 250." },
            { label: "Leavers requiring replacement", detail: "46 total leavers − 8 whose posts were closed = 38 replaced." },
            { label: "Apply the formula", detail: "(38 ÷ 250) × 100 = 15.2%." },
          ],
          result:
            "Labour turnover is **15.2%**. The two steps candidates miss are using the **average** headcount rather than the opening or closing figure, and excluding leavers **not replaced** — using all 46 gives 18.4%, which overstates the problem by measuring departures the business chose.",
        },
        {
          kind: "table",
          caption: "Causes and costs",
          head: ["Avoidable causes", "Unavoidable causes"],
          rows: [
            ["Poor pay relative to the market", "Retirement"],
            ["Poor working conditions or supervision", "Illness, death or permanent disability"],
            ["Lack of training or promotion prospects", "Relocation for family reasons"],
            ["Unfair or inconsistent treatment", "Marriage, pregnancy or care responsibilities"],
            ["Better opportunities elsewhere that could have been matched", "Leaving for further education"],
          ],
        },
        {
          kind: "list",
          title: "The costs of high turnover",
          items: [
            "**Replacement costs** — advertising, selection, and the administration of engaging a starter.",
            "**Training costs** for each new recruit, incurred repeatedly rather than once.",
            "**Lost output** while a post is vacant and while a new starter reaches full productivity.",
            "**Lower productivity and higher error and scrap rates** among inexperienced staff.",
            "**The time of experienced staff** diverted to training rather than production.",
            "**Loss of accumulated knowledge**, which is not recoverable by hiring a replacement.",
            "**Preventive costs** — better pay, conditions and development — which are incurred to reduce all of the above.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Some turnover is desirable",
          md: "A zero turnover rate is not a target: it means no new skills entering, no exit for poor performers, and an ageing workforce with no succession. The management question is whether the rate is **higher than necessary for avoidable reasons**, and whether the cost of prevention is less than the cost of the turnover it prevents.",
        },
      ],
    },
    {
      id: "labour-ratios",
      heading: "Efficiency, capacity and production volume ratios",
      blocks: [
        {
          kind: "text",
          md: "Three ratios separate two different questions that raw output confuses: did we **work as many hours as planned**, and did we **produce as much per hour as planned**?",
        },
        {
          kind: "formula",
          name: "The three labour ratios",
          expr: "Efficiency ratio  =  ( Standard hours for actual output  ÷  Actual hours worked )  ×  100\n\nCapacity ratio  =  ( Actual hours worked  ÷  Budgeted hours )  ×  100\n\nProduction volume ratio  =  ( Standard hours for actual output  ÷  Budgeted hours )  ×  100",
          note: "Efficiency × Capacity = Production volume (as decimals). That identity is the fastest check on all three.",
        },
        {
          kind: "example",
          title: "Worked example — all three ratios and what they mean",
          scenario:
            "Budgeted output was 5,000 units at a standard 2 hours each, so budgeted hours were 10,000. Actual output was 5,400 units, achieved in 11,250 actual hours. Calculate and interpret the three ratios.",
          steps: [
            { label: "Standard hours for actual output", detail: "5,400 units × 2 hours = 10,800 standard hours. This is the work actually done, measured in standard time." },
            { label: "Efficiency ratio", detail: "(10,800 ÷ 11,250) × 100 = 96.0%. The workforce took MORE hours than standard for the output produced, so it was 4% less efficient than standard." },
            { label: "Capacity ratio", detail: "(11,250 ÷ 10,000) × 100 = 112.5%. More hours were worked than budgeted — the workforce was available and working 12.5% above plan." },
            { label: "Production volume ratio", detail: "(10,800 ÷ 10,000) × 100 = 108.0%. Output measured in standard hours was 8% above budget." },
            { label: "Check the identity", detail: "0.96 × 1.125 = 1.08. Agrees with the production volume ratio of 108%." },
          ],
          result:
            "Efficiency 96%, capacity 112.5%, production volume 108%. The interpretation is the examinable part: **output exceeded budget by 8%, but entirely by working longer rather than faster** — efficiency actually fell below standard. A manager looking only at the 8% volume gain would conclude the department performed well; the ratios show the extra output cost 450 more hours than it should have.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Above 100% means different things for each ratio",
          md: "**Efficiency above 100%** = producing faster than standard, which is good. **Capacity above 100%** = working more hours than budgeted, which is neither good nor bad in itself — it may be overtime that cost a premium. **Production volume above 100%** = more output than budgeted, whatever the route. Reading a high capacity ratio as good performance is the trap.",
        },
      ],
      check: {
        q: "Standard hours for actual output are 4,800; actual hours worked are 4,000; budgeted hours were 5,000. What is the efficiency ratio?",
        options: ["80%", "96%", "120%", "125%"],
        correct: 2,
        explain:
          "Efficiency ratio = (standard hours for actual output ÷ actual hours worked) × 100 = (4,800 ÷ 4,000) × 100 = 120%. The workforce produced in 4,000 hours what should have taken 4,800, so it worked 20% faster than standard. Note the distractors: 80% is the capacity ratio (4,000 ÷ 5,000) and 96% is the production volume ratio (4,800 ÷ 5,000) — and 0.8 × 1.2 = 0.96 confirms all three.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a whole overtime payment as direct labour cost.",
      fix: "Split it: the basic rate for hours worked is direct, and the PREMIUM is indirect unless a customer specifically requested urgent completion.",
    },
    {
      trap: "Charging idle time to the product.",
      fix: "No product was worked on, so idle time payments are indirect production overhead.",
    },
    {
      trap: "Including all leavers in the labour turnover calculation.",
      fix: "Only leavers who had to be REPLACED count — a post that is closed incurs no replacement cost.",
    },
    {
      trap: "Using opening or closing headcount as the denominator for turnover.",
      fix: "Use the AVERAGE number of employees over the period.",
    },
    {
      trap: "Measuring time saved against contracted hours rather than standard time for the output.",
      fix: "Time saved = standard time allowed for the units actually produced, less actual hours taken.",
    },
    {
      trap: "Reading a capacity ratio above 100% as good performance.",
      fix: "It only means more hours were worked than budgeted, possibly at overtime premium. Efficiency above 100% is the one that means working faster than standard.",
    },
    {
      trap: "Ignoring the indirect element created by a piecework guarantee.",
      fix: "Where the guaranteed minimum exceeds piecework earnings, the excess is indirect, because it does not relate to units produced.",
    },
  ],
  keyTerms: [
    { term: "Direct labour", def: "Labour working on the product, whose cost is traceable to cost units." },
    { term: "Overtime premium", def: "The excess of an overtime rate over the basic rate; normally indirect, since it arises from timing rather than the product." },
    { term: "Idle time", def: "Paid time during which no production work was done; treated as indirect cost." },
    { term: "Piecework", def: "A remuneration method paying a fixed rate per unit produced, often with a guaranteed minimum." },
    { term: "Labour turnover", def: "Leavers requiring replacement as a percentage of the average number of employees." },
    { term: "Efficiency ratio", def: "Standard hours for actual output divided by actual hours worked — whether work was done faster or slower than standard." },
    { term: "Capacity ratio", def: "Actual hours worked divided by budgeted hours — whether more or fewer hours were worked than planned." },
    { term: "Production volume ratio", def: "Standard hours for actual output divided by budgeted hours — whether more or less was produced than budgeted." },
  ],
  summary: [
    "Direct labour works on the product; indirect labour supports production without working on it.",
    "An overtime payment splits into basic pay (direct) and a premium (indirect, unless a customer required urgent completion).",
    "Idle time payments are indirect, because no product was worked on.",
    "Time-based pay is simple but unincentivised; piecework incentivises output but risks quality; bonus schemes share the gain from time saved.",
    "A piecework guarantee creates an indirect element whenever earnings fall short of the minimum.",
    "Labour turnover counts only leavers requiring replacement, over the AVERAGE headcount.",
    "Turnover costs replacement, training, lost output, lower productivity and lost knowledge — but zero turnover is not a target.",
    "Efficiency asks whether work was faster than standard; capacity whether more hours were worked; production volume whether more was produced. Efficiency × capacity = production volume.",
  ],
  knowledgeDiagnostic: [
    { q: "How is an overtime payment analysed between direct and indirect cost?", a: "The basic rate for hours actually worked on the product is direct. The premium above basic rate is indirect, because it arises from when the work was done — unless a specific customer requested urgent completion, in which case it is direct to that job." },
    { q: "How is labour turnover calculated?", a: "(Leavers requiring replacement ÷ average number of employees) × 100. Leavers whose posts were closed are excluded, and the denominator is the average, not opening or closing headcount." },
    { q: "State the three labour ratios and the identity linking them.", a: "Efficiency = standard hours for actual output ÷ actual hours. Capacity = actual hours ÷ budgeted hours. Production volume = standard hours for actual output ÷ budgeted hours. Efficiency × capacity = production volume." },
    { q: "What does a capacity ratio above 100% tell you?", a: "Only that more hours were worked than budgeted — possibly overtime at a premium. It is not evidence of good performance; efficiency above 100% is what shows work done faster than standard." },
    { q: "Is zero labour turnover desirable?", a: "No. It means no new skills entering, no exit for poor performers and no succession. The question is whether the rate is higher than necessary for avoidable reasons, and whether prevention costs less than the turnover it prevents." },
  ],
  furtherStudy: [
    "Labour rate, efficiency and idle time variances are Chapter 22.",
    "The behavioural consequences of piecework and bonus schemes connect to motivation theory in **BT** and to performance measurement in **PM**.",
  ],
}

/* ── Chapter 12 · C1(c) ────────────────────────────────────────── */

export const MA_TREE_12: StudyChapter = {
  id: "MA-12",
  number: 12,
  paper: "MA",
  area: "C",
  title: "Accounting for overheads",
  minutes: 20,
  syllabusRefs: ["C1(c)"],
  intro:
    "Direct costs can be traced. Overheads cannot, so they have to be shared — and every sharing decision is an estimate. This chapter is the four-step machinery for doing it, and what happens when the estimate turns out wrong.",
  outcomes: [
    "Explain why overheads must be absorbed and the steps involved",
    "Allocate and apportion overheads to cost centres on appropriate bases",
    "Reapportion service cost centre overheads, including where services work for each other",
    "Calculate an overhead absorption rate and select an appropriate basis",
    "Calculate and account for under- and over-absorption, and explain its causes",
  ],
  sections: [
    {
      id: "the-four-steps",
      heading: "The four steps",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Getting overhead onto a product",
            caption: "Allocate, apportion, reapportion, absorb. Each step moves cost closer to the unit.",
            data: {
              steps: [
                { label: "1 · Allocation", sub: "charge a WHOLE overhead to the one cost centre that caused it" },
                { label: "2 · Apportionment", sub: "SHARE a common overhead between cost centres on a fair basis" },
                { label: "3 · Reapportionment", sub: "transfer SERVICE centre costs to production centres" },
                { label: "4 · Absorption", sub: "charge production centre overhead to cost UNITS using a rate" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Allocation and apportionment",
          md: "**Allocation** charges an overhead **in its entirety** to a single cost centre, because that centre alone caused it — the machining department's own machine insurance. **Apportionment** **shares** an overhead across several cost centres on a basis reflecting how each benefited, because no single centre caused it all — factory rent shared on floor area.",
        },
        {
          kind: "table",
          caption: "Choosing an apportionment basis",
          head: ["Overhead", "Usual basis", "Reasoning"],
          rows: [
            ["Rent, rates, building insurance, heating", "Floor area occupied", "The cost is driven by space used"],
            ["Machine insurance, machine depreciation", "Machinery value (net book or cost)", "Driven by the value of plant held"],
            ["Power", "Machine hours, or kilowatt capacity", "Driven by machine running time"],
            ["Canteen, personnel, welfare costs", "Number of employees", "Driven by headcount"],
            ["Stores costs", "Number of requisitions, or material value issued", "Driven by activity in stores"],
            ["Supervision", "Number of employees supervised", "Driven by headcount"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to pick a basis in an exam",
          md: "Ask **what actually drives this cost**, and choose the basis that measures it. If a question gives you floor areas, machine values, employee numbers and machine hours, it has told you which bases it expects — match each overhead to the most plausible driver. There is rarely a uniquely correct answer, and a stated, sensible justification earns the mark.",
        },
      ],
    },
    {
      id: "reapportionment",
      heading: "Reapportioning service cost centres",
      blocks: [
        {
          kind: "text",
          md: "A **service** cost centre — stores, maintenance, canteen — does not make the product, so its costs cannot be absorbed into units directly. They must first be transferred to the **production** centres that use the service.",
        },
        {
          kind: "example",
          title: "Worked example — direct reapportionment",
          scenario:
            "After allocation and apportionment: Machining $120,000; Assembly $80,000; Stores $30,000; Maintenance $24,000. Stores serves Machining and Assembly in the ratio 60:40. Maintenance serves them 70:30. Reapportion the service centres.",
          steps: [
            { label: "Reapportion Stores", detail: "Machining: $30,000 × 60% = $18,000. Assembly: $30,000 × 40% = $12,000." },
            { label: "Reapportion Maintenance", detail: "Machining: $24,000 × 70% = $16,800. Assembly: $24,000 × 30% = $7,200." },
            { label: "Total the production centres", detail: "Machining: $120,000 + $18,000 + $16,800 = $154,800. Assembly: $80,000 + $12,000 + $7,200 = $99,200." },
            { label: "Check", detail: "$154,800 + $99,200 = $254,000, which equals the original $120,000 + $80,000 + $30,000 + $24,000. Nothing was lost or created." },
          ],
          result:
            "Machining $154,800; Assembly $99,200. **Always check the total is unchanged** — reapportionment moves cost between centres and must never alter the amount. A total that has shifted means a percentage was applied twice or a residue left behind.",
        },
        {
          kind: "definition",
          term: "Reciprocal servicing",
          md: "Where service centres **work for each other** — maintenance services stores, and stores supplies maintenance. Two methods are examinable: the **repeated distribution** method, which cycles the reapportionment back and forth until the remaining amounts are negligible, and the **algebraic** (simultaneous equation) method, which solves it in one step.",
        },
        {
          kind: "example",
          title: "Worked example — reciprocal servicing by algebra",
          scenario:
            "Stores overhead is $30,000 and Maintenance $24,000. Stores' work goes 50% to Machining, 30% to Assembly and 20% to Maintenance. Maintenance's work goes 45% to Machining, 45% to Assembly and 10% to Stores. Reapportion using simultaneous equations.",
          steps: [
            { label: "Define the total cost of each service centre", detail: "Let S = total Stores cost including what it receives from Maintenance, and M = total Maintenance cost including what it receives from Stores. Then S = 30,000 + 0.10M and M = 24,000 + 0.20S." },
            { label: "Substitute", detail: "S = 30,000 + 0.10(24,000 + 0.20S) = 30,000 + 2,400 + 0.02S. So S − 0.02S = 32,400, giving 0.98S = 32,400 and S = $33,061." },
            { label: "Find M", detail: "M = 24,000 + (0.20 × 33,061) = 24,000 + 6,612 = $30,612." },
            { label: "Reapportion Stores to production", detail: "Machining: 50% × 33,061 = $16,531. Assembly: 30% × 33,061 = $9,918. (The 20% to Maintenance is already inside M.)" },
            { label: "Reapportion Maintenance to production", detail: "Machining: 45% × 30,612 = $13,775. Assembly: 45% × 30,612 = $13,775." },
            { label: "Check the total transferred", detail: "$16,531 + $9,918 + $13,775 + $13,775 = $53,999, against the original service cost of $30,000 + $24,000 = $54,000. The $1 difference is rounding." },
          ],
          result:
            "Machining receives $30,306 and Assembly $23,693, together with the original $54,000 accounted for. The technique to hold on to is setting up **each service centre's total as its own cost plus what it receives from the other**, then substituting. The check remains the same: everything transferred must equal the service centres' original cost.",
        },
      ],
      check: {
        q: "After reapportioning service cost centre overheads, the total overhead across all production cost centres should equal:",
        options: [
          "The production cost centres' own overheads only",
          "The total overhead of all cost centres, production and service together",
          "The service cost centres' overheads only",
          "The total overhead less any reciprocal transfers",
        ],
        correct: 1,
        explain:
          "Reapportionment MOVES cost between centres; it never creates or destroys it. So after the exercise, the total sitting in the production cost centres must equal the whole original overhead of production AND service centres combined. Checking that total is the fastest way to catch a percentage applied twice or a residue left in a service centre.",
      },
    },
    {
      id: "absorption",
      heading: "Absorption into cost units",
      blocks: [
        {
          kind: "formula",
          name: "Overhead absorption rate",
          expr: "OAR  =  Budgeted overhead  ÷  Budgeted level of activity",
          note: "Both figures are BUDGETED, because the rate must be set before the period starts so that costs can be charged as work is done. This is exactly why under- and over-absorption arise.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The rate is set on BUDGETED figures",
          md: "A product's cost has to be known when it is made, not after the year end — so the rate is computed from **budgeted** overhead and **budgeted** activity, and then applied to **actual** activity. Both estimates will be wrong to some degree, and the difference is under- or over-absorption. Using actual overhead in the rate is a common error that makes the whole topic disappear.",
        },
        {
          kind: "table",
          caption: "Choosing the absorption basis",
          head: ["Basis", "Suits", "Rate is per"],
          rows: [
            ["**Machine hours**", "Capital-intensive work where overhead is driven by running machines", "Machine hour"],
            ["**Direct labour hours**", "Labour-intensive work", "Labour hour"],
            ["Units of output", "A single product, or very similar products", "Unit"],
            ["Percentage of direct labour cost", "Where labour rates are uniform", "$ of labour cost"],
            ["Percentage of prime cost", "Rarely appropriate — mixes unrelated drivers", "$ of prime cost"],
          ],
        },
        {
          kind: "example",
          title: "Worked example — OAR, absorption, and the under/over calculation",
          scenario:
            "Machining department budgeted overhead was $154,800 and budgeted activity 18,000 machine hours. Actual overhead was $161,000 and actual activity 17,200 machine hours. Calculate the OAR, the overhead absorbed, and the under- or over-absorption.",
          steps: [
            { label: "Overhead absorption rate", detail: "$154,800 ÷ 18,000 machine hours = $8.60 per machine hour. Both figures are budgeted." },
            { label: "Overhead absorbed into production", detail: "Actual hours × the rate = 17,200 × $8.60 = $147,920. Note it is ACTUAL activity at the BUDGETED rate." },
            { label: "Compare with actual overhead incurred", detail: "Actual overhead $161,000 against absorbed $147,920." },
            { label: "Under- or over-absorbed?", detail: "Absorbed is $13,080 LESS than incurred, so overhead is UNDER-ABSORBED by $13,080." },
            { label: "Explain why, in two parts", detail: "Expenditure was $6,200 above budget ($161,000 vs $154,800), and activity was 800 hours below budget, costing 800 × $8.60 = $6,880 of absorption. $6,200 + $6,880 = $13,080. Both causes pushed the same way." },
          ],
          result:
            "OAR $8.60 per machine hour; $147,920 absorbed; **$13,080 under-absorbed**. Under-absorption is a **debit in the statement of profit or loss** — an additional expense, because production was charged with less overhead than was actually incurred. Splitting the total between the expenditure cause and the volume cause is what a strong answer does, and it is the seed of the fixed overhead variances in Chapter 22.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Which way round, and what it does to profit",
          md: "**Absorbed LESS than incurred → UNDER-absorbed → profit is reduced** (an extra expense). **Absorbed MORE than incurred → OVER-absorbed → profit is increased.** Get the direction by asking whether production was charged too little or too much, and remember there are only two causes: actual **expenditure** differed from budget, and actual **activity** differed from budget.",
        },
        {
          kind: "activity",
          title: "Activity 2 — diagnose the absorption problem",
          prompt:
            "A company absorbs overhead on direct labour hours. Budgeted overhead was $400,000 on 50,000 budgeted labour hours. Actual overhead was $398,000 and actual hours 44,000. The production director says: 'We spent less than budget, so overhead is over-absorbed and profit will improve.'\n\nCalculate the position and explain the error in his reasoning.",
          answer:
            "**The calculation.** OAR = $400,000 ÷ 50,000 = $8.00 per labour hour. Absorbed = 44,000 × $8.00 = $352,000. Actual overhead incurred = $398,000. Absorbed is $46,000 LESS than incurred, so overhead is **UNDER-absorbed by $46,000** — a debit to profit, not a credit.\n\n**The error in his reasoning.** He has looked at only one of the two causes. Spending $2,000 below budget is genuinely favourable and, on its own, would have produced $2,000 of over-absorption. But activity fell 6,000 hours short of budget, and each of those hours would have absorbed $8.00 — so $48,000 of overhead that the rate was designed to recover was never charged to production. Netting the two: $2,000 favourable less $48,000 unrecovered = **$46,000 adverse**.\n\n**The underlying point.** The absorption rate was built on an assumption of 50,000 hours. Fixed overhead does not fall because activity does, so producing less than planned leaves overhead unrecovered however tightly spending is controlled. This is why **volume** matters as much as **expenditure** — and it is precisely the split that becomes the fixed overhead expenditure and volume variances in Chapter 22.",
        },
      ],
      check: {
        q: "Budgeted overhead is $240,000 on 30,000 budgeted machine hours. Actual overhead is $250,000 and actual hours are 31,000. What is the position?",
        options: [
          "Under-absorbed by $10,000",
          "Over-absorbed by $8,000",
          "Under-absorbed by $2,000",
          "Over-absorbed by $10,000",
        ],
        correct: 1,
        explain:
          "OAR = $240,000 ÷ 30,000 = $8.00 per machine hour. Absorbed = 31,000 × $8.00 = $248,000, against actual overhead of $250,000 — so it is UNDER-absorbed by $2,000. Note how the two causes offset here: expenditure was $10,000 above budget (adverse) while the extra 1,000 hours absorbed $8,000 more (favourable), netting to $2,000 adverse.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Computing the absorption rate from actual overhead or actual activity.",
      fix: "The rate uses BUDGETED overhead ÷ BUDGETED activity, because it must be set before the period begins. That is why under- and over-absorption exist at all.",
    },
    {
      trap: "Absorbing overhead at the actual rate rather than the budgeted rate.",
      fix: "Overhead absorbed = ACTUAL activity × BUDGETED rate.",
    },
    {
      trap: "Reversing under- and over-absorption.",
      fix: "Absorbed less than incurred is UNDER-absorbed and reduces profit. Absorbed more than incurred is OVER-absorbed and increases it.",
    },
    {
      trap: "Explaining under-absorption by expenditure alone.",
      fix: "There are two causes — actual expenditure differing from budget AND actual activity differing from budget. Split the total between them.",
    },
    {
      trap: "Failing to check that reapportionment leaves the total overhead unchanged.",
      fix: "Reapportionment moves cost, never creates it. A changed total means a percentage was applied twice or a residue was left in a service centre.",
    },
    {
      trap: "Absorbing service cost centre overhead directly into units.",
      fix: "Service centres do not make the product. Reapportion their cost to production centres first, then absorb.",
    },
  ],
  keyTerms: [
    { term: "Allocation", def: "Charging a whole overhead to the single cost centre that caused it." },
    { term: "Apportionment", def: "Sharing a common overhead between cost centres on a basis reflecting how each benefited." },
    { term: "Reapportionment", def: "Transferring service cost centre overheads to the production cost centres that use the service." },
    { term: "Reciprocal servicing", def: "Where service cost centres work for each other, resolved by repeated distribution or by simultaneous equations." },
    { term: "Overhead absorption rate", def: "Budgeted overhead divided by budgeted activity, used to charge overhead to cost units." },
    { term: "Under-absorption", def: "Overhead absorbed being less than overhead incurred, which reduces reported profit." },
    { term: "Over-absorption", def: "Overhead absorbed exceeding overhead incurred, which increases reported profit." },
  ],
  summary: [
    "Overheads reach a product in four steps: allocation, apportionment, reapportionment and absorption.",
    "Allocation charges a whole overhead to one centre; apportionment shares a common overhead on a basis reflecting its driver.",
    "Service cost centre costs must be reapportioned to production centres before absorption, and reciprocal servicing is solved by repeated distribution or algebra.",
    "Reapportionment must leave total overhead unchanged — checking that total catches most errors.",
    "The absorption rate is budgeted overhead ÷ budgeted activity, set before the period begins.",
    "Overhead absorbed is actual activity × the budgeted rate.",
    "Absorbed less than incurred is under-absorption, which reduces profit; absorbed more is over-absorption, which increases it.",
    "There are exactly two causes: actual expenditure differing from budget, and actual activity differing from budget.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four stages of dealing with overheads?", a: "Allocation (a whole overhead to one centre), apportionment (sharing a common overhead), reapportionment (service centres to production centres) and absorption (production centre overhead into cost units)." },
    { q: "How is the overhead absorption rate calculated, and why are budgeted figures used?", a: "Budgeted overhead ÷ budgeted activity. Budgeted figures are used because a product's cost must be known when it is made, not after the year end — which is exactly why under- and over-absorption arise." },
    { q: "How much overhead is absorbed into production?", a: "Actual activity multiplied by the BUDGETED absorption rate." },
    { q: "What are the two causes of under- or over-absorption?", a: "Actual overhead expenditure differing from budget, and actual activity differing from the budgeted activity used to set the rate. A good answer splits the total between them." },
    { q: "What effect does under-absorption have on profit?", a: "It reduces profit: production was charged with less overhead than was actually incurred, so the shortfall is an additional expense in the statement of profit or loss." },
  ],
  furtherStudy: [
    "Under- and over-absorption split into the fixed overhead expenditure and volume variances in Chapter 22.",
    "Activity based costing, which attacks the arbitrariness of blanket absorption bases, is Chapter 15.",
  ],
}

/* ── Chapter 13 · C2 ───────────────────────────────────────────── */

export const MA_TREE_13: StudyChapter = {
  id: "MA-13",
  number: 13,
  paper: "MA",
  area: "C",
  title: "Absorption and marginal costing",
  minutes: 20,
  syllabusRefs: ["C2(a)", "C2(b)", "C2(c)", "C2(d)", "C2(e)"],
  intro:
    "Two systems, one difference: what to do with fixed production overhead. That single choice changes reported profit, changes inventory value, and changes which decisions the numbers support — and reconciling the two is among the most reliably examined calculations in MA.",
  outcomes: [
    "Explain and apply the concept of contribution",
    "Explain the difference in treatment of fixed production overhead under absorption and marginal costing",
    "Prepare profit statements under both methods",
    "Reconcile the profits reported under each and explain the difference by reference to inventory movement",
    "State the advantages and disadvantages of each method and when each is appropriate",
  ],
  sections: [
    {
      id: "contribution",
      heading: "Contribution",
      blocks: [
        {
          kind: "definition",
          term: "Contribution",
          md: "**Sales revenue less all VARIABLE costs.** It is what each sale contributes toward covering fixed costs and then toward profit. Once fixed costs are covered, every further dollar of contribution is a dollar of profit.",
        },
        {
          kind: "formula",
          name: "Contribution",
          expr: "Contribution per unit  =  Selling price per unit  −  Variable cost per unit\n\nTotal contribution  =  Contribution per unit  ×  Units sold\n\nProfit  =  Total contribution  −  Total fixed costs",
          note: "Variable cost here means ALL variable costs — variable production cost plus any variable selling cost such as commission per unit.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why contribution is the decision figure",
          md: "For a short-run decision — accept this order, make or buy, which product to prioritise when capacity is scarce — **fixed costs usually do not change**, so they are irrelevant to the choice. Contribution is what changes, and it is therefore what the decision turns on. This is the idea marginal costing is built to expose and absorption costing tends to bury.",
        },
      ],
    },
    {
      id: "the-difference",
      heading: "The one difference between the two systems",
      blocks: [
        {
          kind: "table",
          caption: "Absorption and marginal costing compared",
          head: ["", "Absorption costing", "Marginal costing"],
          rows: [
            ["Fixed production overhead is treated as", "A **product** cost — absorbed into each unit", "A **period** cost — charged in full against the period's profit"],
            ["Inventory is valued at", "Full production cost, **including** fixed overhead", "**Variable** production cost only"],
            ["The profit statement is built around", "Gross profit (sales − full cost of sales)", "**Contribution** (sales − variable costs)"],
            ["Under/over absorption", "Arises and must be adjusted for", "Does not arise — there is no absorption"],
            ["Required for financial reporting under IAS 2", "**Yes**", "No"],
            ["Best suited to", "Statutory reporting and long-run pricing", "**Short-run decision-making** and control"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Everything else follows from one choice",
          md: "The **only** difference is the treatment of **fixed production overhead**. Variable production costs, and all non-production costs, are treated identically under both systems. If you can remember that, you can derive the rest of the table — and you will not fall for a question that changes the treatment of variable selling costs to see whether you notice.",
        },
        {
          kind: "example",
          title: "Worked example — profit statements under both methods",
          scenario:
            "A company makes one product. Selling price $50. Variable production cost $22 per unit. Variable selling cost $3 per unit. Fixed production overhead $180,000 per year, absorbed on budgeted output of 20,000 units. Fixed administration cost $60,000. In the year, 20,000 units were produced and 18,000 sold. There was no opening inventory. Prepare both profit statements.",
          steps: [
            { label: "Absorption rate for fixed production overhead", detail: "$180,000 ÷ 20,000 budgeted units = $9.00 per unit. Full production cost = $22 + $9 = $31 per unit." },
            { label: "Absorption costing statement", detail: "Sales 18,000 × $50 = $900,000. Cost of sales 18,000 × $31 = $558,000. Gross profit $342,000. Less variable selling 18,000 × $3 = $54,000, and fixed admin $60,000. PROFIT = $228,000. (Production equalled budget, so there is no under/over absorption.)" },
            { label: "Marginal costing statement", detail: "Sales $900,000. Variable cost of sales 18,000 × $22 = $396,000. Variable selling 18,000 × $3 = $54,000. Contribution = $450,000. Less fixed production $180,000 and fixed admin $60,000. PROFIT = $210,000." },
            { label: "Value the closing inventory under each", detail: "2,000 units unsold. Absorption: 2,000 × $31 = $62,000. Marginal: 2,000 × $22 = $44,000. Difference $18,000." },
            { label: "Explain the profit difference", detail: "Absorption profit $228,000 − marginal profit $210,000 = $18,000, exactly the difference in inventory value — which is the $9 of fixed overhead per unit carried forward in the 2,000 unsold units." },
          ],
          result:
            "Absorption profit $228,000; marginal profit $210,000. Note the two things the examiner is watching: **variable selling cost is deducted after gross profit under absorption but forms part of contribution under marginal**, and the profit difference is **always** the fixed overhead in the inventory movement — here 2,000 units × $9 = $18,000.",
        },
      ],
      check: {
        q: "Under marginal costing, closing inventory is valued at:",
        options: [
          "Full production cost including fixed overhead",
          "Variable production cost only",
          "Total cost including selling and administration",
          "Selling price less profit margin",
        ],
        correct: 1,
        explain:
          "Marginal costing treats fixed production overhead as a PERIOD cost, charged in full against the period in which it arises — so it is never carried in inventory. Inventory is therefore valued at VARIABLE production cost only. Absorption costing values it at full production cost, and that single difference explains every divergence between the two systems.",
      },
    },
    {
      id: "reconciliation",
      heading: "Reconciling the two profits",
      blocks: [
        {
          kind: "formula",
          name: "The profit difference",
          expr: "Absorption profit  −  Marginal profit  =  Change in inventory units  ×  Fixed overhead absorption rate per unit",
          note: "A positive change (inventory increasing) makes absorption profit HIGHER. Learn it as a rule about the direction of the inventory movement, not as a formula to be rearranged under pressure.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three cases, and the logic behind them",
          md: "**Production > sales** (inventory RISES) → absorption profit is **HIGHER**, because fixed overhead is carried forward in inventory instead of being charged this period.\n\n**Production < sales** (inventory FALLS) → absorption profit is **LOWER**, because fixed overhead brought forward in opening inventory is released into this period's cost of sales.\n\n**Production = sales** (no change) → the **profits are equal**.\n\nDerive it from the logic rather than memorising a direction: ask where the fixed overhead went.",
        },
        {
          kind: "example",
          title: "Worked example — reconciliation with falling inventory",
          scenario:
            "Fixed production overhead is absorbed at $12 per unit. Opening inventory was 3,000 units and closing inventory 1,200 units. Marginal costing profit for the period is $164,000. Calculate the absorption costing profit.",
          steps: [
            { label: "Identify the inventory movement", detail: "Closing 1,200 − opening 3,000 = a DECREASE of 1,800 units. Inventory fell, so sales exceeded production." },
            { label: "Value the fixed overhead in that movement", detail: "1,800 units × $12 = $21,600 of fixed overhead released from opening inventory into this period's cost of sales." },
            { label: "Apply the direction", detail: "Inventory FELL, so absorption profit is LOWER than marginal profit: $164,000 − $21,600 = $142,400." },
            { label: "Sense-check the logic", detail: "Under absorption costing this period bears its own fixed overhead PLUS the $21,600 brought forward in the 1,800 units sold from opening stock. Marginal costing charged that $21,600 to the earlier period, when it was incurred. So absorption profit must be lower now." },
          ],
          result:
            "Absorption profit is **$142,400**. The direction is what candidates lose marks on, and the reliable way to get it right is the sense-check: ask which period ends up bearing the fixed overhead. Reciting 'inventory down, absorption lower' works until a question phrases it unusually; the logic always works.",
        },
        {
          kind: "table",
          caption: "The two systems, weighed up",
          head: ["Absorption costing", "Marginal costing"],
          rows: [
            ["**Required** by IAS 2 for financial reporting", "Not acceptable for statutory reporting"],
            ["Recognises that fixed overhead is a real cost of production and must be recovered in the long run", "Avoids arbitrary apportionment and absorption of fixed overhead"],
            ["Suits long-run pricing, where all costs must eventually be covered", "**Contribution is the right figure for short-run decisions**"],
            ["Avoids large profit swings where production is seasonal but sales are level", "Profit moves with SALES, not with production, which most managers find more intuitive"],
            ["**But**: profit can be increased simply by producing more than is sold, which is a real perverse incentive", "**But**: ignoring fixed costs can lead to accepting business that never covers them"],
            ["**But**: the absorption rate rests on estimates, so under/over absorption must be explained", "**But**: it is not permitted for inventory valuation in published accounts"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The perverse incentive worth naming in an answer",
          md: "Under absorption costing, **producing more than you sell increases reported profit**, because fixed overhead is carried forward in inventory rather than charged. A manager rewarded on profit can therefore improve the figure by building stock nobody has ordered — which ties up cash and risks obsolescence. Marginal costing removes the incentive entirely, since profit moves with sales. This is a favourite discussion point and connects directly to performance measurement in Chapter 25.",
        },
        {
          kind: "activity",
          title: "Activity 3 — which system, and why",
          prompt:
            "A company currently uses absorption costing for all internal reporting. A divisional manager, whose bonus depends on divisional profit, has increased finished goods inventory from 2 weeks' to 9 weeks' sales over the year, and divisional profit has risen. Sales volume is unchanged.\n\nExplain what has happened and recommend a change.",
          answer:
            "**What has happened.** Under absorption costing, each unit produced carries a share of fixed production overhead into inventory. By producing far more than was sold, the manager has deferred a large amount of fixed overhead into closing inventory rather than charging it against this year's profit — so **reported profit rose without a single extra sale**. Sales volume is unchanged, which rules out any genuine trading improvement.\n\n**Why it matters commercially.** The profit increase is an accounting effect with real costs attached: cash is tied up in seven extra weeks of stock, storage and insurance costs rise, and the risk of obsolescence and write-down grows — in a seasonal or fashion-sensitive product, materially so. The bonus has rewarded a decision that made the division worse off.\n\n**Recommendation.** Use **marginal costing for internal reporting and performance measurement**, because profit then moves with SALES and the incentive to overproduce disappears. Absorption costing must still be used for the statutory accounts under IAS 2, so the two are prepared alongside each other with a reconciliation — which is routine, and the reconciliation itself makes the inventory effect visible.\n\n**Also creditable:** add a non-financial measure such as inventory days or weeks of cover to the bonus criteria, so building stock is visibly penalised rather than rewarded; and note that the deeper fault is the **performance measure**, not the costing system — a manager rewarded on a figure they can inflate will inflate it, which is Chapter 25's territory.",
        },
      ],
      check: {
        q: "Production was 12,000 units and sales 14,000 units. Fixed overhead is absorbed at $7 per unit. How do the profits compare?",
        options: [
          "Absorption profit is $14,000 higher",
          "Absorption profit is $14,000 lower",
          "The profits are equal",
          "Absorption profit is $98,000 lower",
        ],
        correct: 1,
        explain:
          "Sales exceeded production by 2,000 units, so inventory FELL by 2,000 — meaning fixed overhead of 2,000 × $7 = $14,000, brought forward in opening inventory, is released into this period's cost of sales under absorption costing. Absorption profit is therefore $14,000 LOWER. The rule follows from asking which period ends up bearing the fixed overhead.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating variable selling costs differently between the two systems.",
      fix: "The ONLY difference is fixed PRODUCTION overhead. Variable selling costs are deducted under both — within contribution under marginal, after gross profit under absorption.",
    },
    {
      trap: "Including fixed production overhead in marginal costing inventory.",
      fix: "Marginal costing values inventory at VARIABLE production cost only; fixed overhead is a period cost.",
    },
    {
      trap: "Getting the direction of the reconciliation backwards.",
      fix: "Inventory RISING makes absorption profit HIGHER. Derive it by asking which period bears the fixed overhead rather than memorising the direction.",
    },
    {
      trap: "Forgetting under- or over-absorption in an absorption statement.",
      fix: "If actual production differs from the budgeted activity used to set the rate, an adjustment is required. It never arises under marginal costing.",
    },
    {
      trap: "Deducting fixed costs before arriving at contribution.",
      fix: "Contribution is sales less ALL VARIABLE costs. Fixed costs are deducted from contribution to reach profit, never before it.",
    },
    {
      trap: "Claiming marginal costing is acceptable for published accounts.",
      fix: "IAS 2 requires inventory at full production cost, so absorption costing is needed for statutory reporting. Marginal costing is for internal decisions.",
    },
  ],
  keyTerms: [
    { term: "Contribution", def: "Sales revenue less all variable costs — what each sale contributes to fixed costs and then to profit." },
    { term: "Absorption costing", def: "A system treating fixed production overhead as a product cost, absorbed into each unit and carried in inventory." },
    { term: "Marginal costing", def: "A system treating fixed production overhead as a period cost, charged in full against the period and excluded from inventory." },
    { term: "Period cost", def: "A cost charged in full against the period in which it is incurred rather than carried in inventory." },
    { term: "Profit reconciliation", def: "The difference between absorption and marginal profit, equal to the change in inventory units × the fixed overhead per unit." },
  ],
  summary: [
    "Contribution is sales less all variable costs, and profit is contribution less fixed costs.",
    "Contribution is the relevant figure for short-run decisions, because fixed costs usually do not change.",
    "The only difference between the systems is the treatment of fixed production overhead: product cost or period cost.",
    "Absorption values inventory at full production cost; marginal at variable production cost only.",
    "The profit difference always equals the change in inventory units × fixed overhead per unit.",
    "Inventory rising makes absorption profit higher; inventory falling makes it lower; no change makes them equal.",
    "Absorption costing is required by IAS 2 but creates an incentive to overproduce; marginal costing removes it but ignores fixed cost recovery.",
  ],
  knowledgeDiagnostic: [
    { q: "What is contribution, and why does it matter for decisions?", a: "Sales less all variable costs. It matters because in a short-run decision fixed costs usually do not change, so contribution is what actually differs between the options." },
    { q: "What is the single difference between absorption and marginal costing?", a: "The treatment of fixed production overhead — a product cost absorbed into units under absorption, a period cost charged in full under marginal. Everything else follows from that one choice." },
    { q: "How is the difference between the two profits calculated?", a: "Change in inventory units × fixed overhead absorption rate per unit. Inventory rising makes absorption profit higher; falling makes it lower." },
    { q: "Why does absorption costing create a perverse incentive?", a: "Producing more than is sold defers fixed overhead into inventory, raising reported profit without any extra sale — while tying up cash and risking obsolescence." },
    { q: "Which method is required for published financial statements, and why?", a: "Absorption costing, because IAS 2 requires inventory to be valued at full production cost. Marginal costing is for internal decision-making and control." },
  ],
  furtherStudy: [
    "Contribution drives break-even analysis and limiting factor decisions, developed fully in **PM**.",
    "The perverse incentive connects to performance measurement and manipulation in Chapter 25 and in **APM**.",
  ],
}

/* ── Chapter 14 · C3 ───────────────────────────────────────────── */

export const MA_TREE_14: StudyChapter = {
  id: "MA-14",
  number: 14,
  paper: "MA",
  area: "C",
  title: "Costing methods: job, batch, process and service",
  minutes: 20,
  syllabusRefs: ["C3(a)", "C3(b)", "C3(c)"],
  intro:
    "The costing method follows from what the business makes. Distinct one-off items are costed individually; continuous identical output has to be costed by averaging — and process costing, where that averaging happens, is the single hardest topic in the paper.",
  outcomes: [
    "Identify the appropriate costing method for a given business",
    "Prepare a job cost and a batch cost, including cost per unit",
    "Prepare process accounts with normal and abnormal losses and gains",
    "Calculate equivalent units and value closing work in progress",
    "Distinguish joint products from by-products and account for each",
    "Identify appropriate cost units for service and operation costing",
  ],
  sections: [
    {
      id: "choosing-a-method",
      heading: "Which method applies",
      blocks: [
        {
          kind: "table",
          caption: "Method follows the nature of the output",
          head: ["Method", "Output is", "Examples", "Cost per unit found by"],
          rows: [
            ["**Job costing**", "Distinct, customer-specified, one-off", "Construction contract, bespoke furniture, audit engagement, repair", "Accumulating costs on that job"],
            ["**Batch costing**", "A group of identical units made together", "A print run, a batch of 500 castings, a pharmaceutical batch", "Total batch cost ÷ units in the batch"],
            ["**Process costing**", "Continuous, identical, indistinguishable", "Chemicals, paint, refined oil, flour, soft drinks", "Averaging total process cost over output"],
            ["**Service / operation costing**", "An intangible service", "Hotel, hospital, transport, professional practice", "Total cost ÷ a chosen (often composite) cost unit"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The distinguishing question",
          md: "Ask: **can you point at one unit and say what it individually cost?** If yes, it is job or batch costing. If the units are physically indistinguishable and flow continuously, the only possible answer is an **average** — and that is process costing.",
        },
      ],
    },
    {
      id: "job-and-batch",
      heading: "Job and batch costing",
      blocks: [
        {
          kind: "example",
          title: "Worked example — a job cost and its price",
          scenario:
            "Job 417 used $2,400 of direct materials and 60 direct labour hours at $18 per hour. Production overhead is absorbed at $14 per direct labour hour. Non-production overhead is recovered at 20% of production cost. The job is priced to earn a 25% margin on selling price. Calculate the total cost and the price.",
          steps: [
            { label: "Prime cost", detail: "Materials $2,400 + labour (60 × $18 = $1,080) = $3,480." },
            { label: "Add production overhead", detail: "60 hours × $14 = $840. Production cost = $3,480 + $840 = $4,320." },
            { label: "Add non-production overhead", detail: "20% × $4,320 = $864. Total cost = $4,320 + $864 = $5,184." },
            { label: "Price for a 25% margin ON SELLING PRICE", detail: "Cost is therefore 75% of price. Price = $5,184 ÷ 0.75 = $6,912." },
            { label: "Check", detail: "Profit = $6,912 − $5,184 = $1,728, which is 25% of $6,912. Correct." },
          ],
          result:
            "Total cost $5,184; price $6,912. The examinable trap is the last step: a **margin on selling price** means dividing by (1 − margin), whereas a **mark-up on cost** would mean multiplying cost by (1 + mark-up). A 25% mark-up on cost would have given only $6,480 — read which the question specifies.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Margin and mark-up are not the same",
          md: "A **margin** is a percentage of **selling price**: price = cost ÷ (1 − margin). A **mark-up** is a percentage of **cost**: price = cost × (1 + mark-up). The same 25% gives $6,912 as a margin and $6,480 as a mark-up on a $5,184 cost — a $432 difference on one word.",
        },
      ],
      check: {
        q: "A batch of 400 identical units cost $18,600 in total. What is the cost per unit, and which method is being used?",
        options: [
          "$46.50, job costing",
          "$46.50, batch costing",
          "$21.51, batch costing",
          "$46.50, process costing",
        ],
        correct: 1,
        explain:
          "BATCH costing applies where a group of IDENTICAL units is made together, and cost per unit is total batch cost ÷ units: $18,600 ÷ 400 = $46.50. Job costing would apply to a single distinct one-off item, and process costing to continuous indistinguishable output flowing through a process — not to a discrete batch of a known size.",
      },
    },
    {
      id: "process-losses",
      heading: "Process costing: normal and abnormal losses",
      blocks: [
        {
          kind: "definition",
          term: "Normal loss, abnormal loss and abnormal gain",
          md: "**Normal loss** is the loss expected in an efficient process — evaporation, trimming, an unavoidable reject rate. **Abnormal loss** is loss in EXCESS of normal. **Abnormal gain** arises when actual loss is LESS than normal, so output exceeds expectation.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The rule that makes process costing work",
          md: "**Normal loss is NOT given a cost.** Its cost is absorbed by the good output, which is why good units cost more than the raw input per unit. **Abnormal loss and abnormal gain ARE valued**, at the cost per unit of good output, and are taken to the statement of profit or loss — because they represent inefficiency or unexpected efficiency that management should see, not a cost of the product.",
        },
        {
          kind: "formula",
          name: "Cost per unit in a process",
          expr: "Cost per unit  =  ( Total process cost  −  Scrap value of normal loss )  ÷  ( Input units  −  Normal loss units )",
          note: "The scrap value of normal loss is deducted from cost, and normal loss units are excluded from the denominator. Both moves push the cost of normal loss onto the good output, which is exactly the intention.",
        },
        {
          kind: "example",
          title: "Worked example — abnormal loss with scrap value",
          scenario:
            "5,000 kg of material at $8 per kg entered a process. Labour and overhead were $19,000. Normal loss is 8% of input and has a scrap value of $3 per kg. Actual output was 4,500 kg. Prepare the calculations.",
          steps: [
            { label: "Total process cost", detail: "Materials 5,000 × $8 = $40,000, plus labour and overhead $19,000 = $59,000." },
            { label: "Normal loss and expected output", detail: "Normal loss = 8% × 5,000 = 400 kg. Expected output = 5,000 − 400 = 4,600 kg." },
            { label: "Cost per unit of good output", detail: "Scrap value of normal loss = 400 × $3 = $1,200. Cost per kg = ($59,000 − $1,200) ÷ 4,600 = $57,800 ÷ 4,600 = $12.5652 per kg." },
            { label: "Identify the abnormal item", detail: "Actual output 4,500 against expected 4,600, so there is an ABNORMAL LOSS of 100 kg." },
            { label: "Value the abnormal loss", detail: "100 kg × $12.5652 = $1,257. It is charged to profit or loss, NOT to the product — though its own scrap proceeds of 100 × $3 = $300 reduce the net charge to $957." },
            { label: "Value good output", detail: "4,500 kg × $12.5652 = $56,543. Check: $56,543 + $1,257 = $57,800, plus the $1,200 normal loss scrap = $59,000. Agrees with total cost." },
          ],
          result:
            "Cost per kg $12.5652; good output $56,543; abnormal loss $1,257 charged to profit or loss. Two mechanics carry the marks: **normal loss units are excluded from the denominator and their scrap value deducted from cost**, and **abnormal loss is valued at the full cost per unit** so that it hits profit rather than inflating product cost.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Abnormal gain reverses the entries, not the rate",
          md: "An abnormal **gain** is valued at the **same** cost per unit and is a **credit** to profit or loss. It also means less scrap was actually sold than the normal-loss calculation assumed, so the scrap income must be reduced accordingly. Candidates often value a gain at a different rate — the rate never changes; only the direction of the entry does.",
        },
      ],
      check: {
        q: "Input was 8,000 litres, normal loss is 5% of input, and actual output was 7,700 litres. What is the abnormal item?",
        options: [
          "Abnormal loss of 300 litres",
          "Abnormal gain of 100 litres",
          "Abnormal loss of 100 litres",
          "There is no abnormal item",
        ],
        correct: 1,
        explain:
          "Normal loss = 5% × 8,000 = 400 litres, so EXPECTED output is 7,600 litres. Actual output of 7,700 EXCEEDS expected by 100 litres, which is an ABNORMAL GAIN of 100 litres — actual loss was only 300 litres against the 400 expected. The tempting wrong answer treats the 300 actual loss as abnormal, but 400 of loss was expected and therefore normal.",
      },
    },
    {
      id: "equivalent-units",
      heading: "Work in progress and equivalent units",
      blocks: [
        {
          kind: "definition",
          term: "Equivalent units",
          md: "Partly-completed units expressed as their equivalent in **fully complete** units. 400 units that are 25% complete represent 100 equivalent units of work. This is what makes it possible to divide a process cost between finished output and unfinished work in progress.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why materials and conversion are treated separately",
          md: "Materials are usually added **at the start** of a process, so work in progress is normally **100% complete for materials** even when it is only part-way through processing. Labour and overhead (together, **conversion cost**) accumulate gradually, so the WIP percentage applies to them. Using one percentage for everything is the classic error, and it understates the materials in WIP.",
        },
        {
          kind: "example",
          title: "Worked example — closing WIP with equivalent units",
          scenario:
            "In a period, 9,000 units were started. 7,500 were completed and 1,500 remain in progress, 100% complete for materials and 40% complete for conversion. Costs were materials $135,000 and conversion $92,400. There was no opening WIP and no losses. Value the completed output and the closing WIP.",
          steps: [
            { label: "Equivalent units for MATERIALS", detail: "Completed 7,500 + WIP (1,500 × 100%) = 1,500. Total 9,000 equivalent units." },
            { label: "Equivalent units for CONVERSION", detail: "Completed 7,500 + WIP (1,500 × 40%) = 600. Total 8,100 equivalent units." },
            { label: "Cost per equivalent unit", detail: "Materials: $135,000 ÷ 9,000 = $15.00. Conversion: $92,400 ÷ 8,100 = $11.4074. Total cost of a completed unit = $26.4074." },
            { label: "Value completed output", detail: "7,500 × $26.4074 = $198,056." },
            { label: "Value closing WIP", detail: "Materials 1,500 × $15.00 = $22,500, plus conversion 600 × $11.4074 = $6,844. WIP = $29,344." },
            { label: "Check", detail: "$198,056 + $29,344 = $227,400, equal to total cost of $135,000 + $92,400. Agrees." },
          ],
          result:
            "Completed output $198,056; closing WIP $29,344. The structure is what matters: **a separate equivalent-unit column and a separate cost per unit for each cost element**, because materials and conversion reach different stages of completion. Applying the 40% to materials as well would value WIP at $23,344 and misstate both figures.",
        },
      ],
    },
    {
      id: "joint-by-products",
      heading: "Joint products and by-products",
      blocks: [
        {
          kind: "definition",
          term: "Joint products and by-products",
          md: "**Joint products** are two or more products of **significant sales value** arising simultaneously from the same process — neither is incidental. A **by-product** is an output of **minor** sales value arising incidentally alongside the main product.",
        },
        {
          kind: "table",
          caption: "The accounting treatment differs entirely",
          head: ["", "Joint products", "By-products"],
          rows: [
            ["Sales value", "Significant — each matters commercially", "Minor and incidental"],
            ["Treatment of common process cost", "**Apportioned** between them, usually on sales value at the separation point or on physical units", "**Not apportioned.** Its net realisable value is DEDUCTED from the cost of the main product"],
            ["Effect on the main product's cost", "Each product bears a share", "Reduced by the by-product income"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The examinable distinction",
          md: "**Joint products share the cost; a by-product reduces it.** Apportioning cost to a by-product is wrong, and so is deducting a joint product's revenue from cost. The test is **sales value**: significant means joint, incidental means by-product — and the question will usually make the disparity obvious.",
        },
        {
          kind: "example",
          title: "Worked example — a by-product reducing main product cost",
          scenario:
            "A process costing $84,000 yields 12,000 kg of product A (selling at $9 per kg) and 1,000 kg of product B, which sells for $1.20 per kg after $200 of further handling cost. B is treated as a by-product. Calculate the cost per kg of A.",
          steps: [
            { label: "Net realisable value of the by-product", detail: "Sales 1,000 × $1.20 = $1,200, less further handling $200 = $1,000 net." },
            { label: "Reduce the process cost", detail: "$84,000 − $1,000 = $83,000 attributable to product A." },
            { label: "Cost per kg of A", detail: "$83,000 ÷ 12,000 kg = $6.9167 per kg." },
            { label: "Contrast with the wrong treatment", detail: "Apportioning the $84,000 on sales value would have given A a cost of about $83,846 and B about $154 — treating an incidental output as though it were commercially significant, and overstating A's cost." },
          ],
          result:
            "Cost per kg of A is **$6.9167**. The mechanics to remember: a by-product's **NET** realisable value — after any further processing or handling cost — is **deducted from the common process cost**, and the by-product is never given a share of it.",
        },
      ],
    },
    {
      id: "service-costing",
      heading: "Service and operation costing",
      blocks: [
        {
          kind: "text",
          md: "Service businesses have no physical product to cost, so the difficulty moves to **choosing a cost unit** that captures the work actually done.",
        },
        {
          kind: "table",
          caption: "Typical service cost units",
          head: ["Service", "Cost unit", "Note"],
          rows: [
            ["Hotel", "Occupied room-night", "Also revenue per available room, to capture empty rooms"],
            ["Hospital", "Patient-day, or treated patient", "A patient-day ignores case complexity, so it can mislead"],
            ["Road haulage", "**Tonne-kilometre**", "Composite: neither weight nor distance alone measures the work"],
            ["Passenger transport", "**Passenger-kilometre**", "Composite, for the same reason"],
            ["Electricity supply", "Kilowatt-hour", "Simple and directly measurable"],
            ["Accountancy practice", "Chargeable hour", "Ignores the value of the work, only its duration"],
            ["Canteen", "Meal served", "Simple, but a meal is not a uniform quantity of work"],
          ],
        },
        {
          kind: "definition",
          term: "Composite cost unit",
          md: "A cost unit combining **two dimensions**, because one alone would not measure the work done. Carrying 1 tonne 400 km and carrying 40 tonnes 10 km are both 400 tonne-kilometres, but neither 'tonnes carried' nor 'kilometres run' alone would show them as equivalent.",
        },
        {
          kind: "example",
          title: "Worked example — cost per tonne-kilometre",
          scenario:
            "A haulier ran four journeys last week: 12 tonnes for 250 km; 8 tonnes for 400 km; 15 tonnes for 120 km; 10 tonnes for 300 km. Total costs were $9,570. Calculate the cost per tonne-kilometre.",
          steps: [
            { label: "Tonne-kilometres for each journey", detail: "12 × 250 = 3,000; 8 × 400 = 3,200; 15 × 120 = 1,800; 10 × 300 = 3,000." },
            { label: "Total tonne-kilometres", detail: "3,000 + 3,200 + 1,800 + 3,000 = 11,000 tonne-km." },
            { label: "Cost per tonne-kilometre", detail: "$9,570 ÷ 11,000 = $0.87 per tonne-km." },
            { label: "See why the composite unit is necessary", detail: "Total tonnes carried was 45 and total distance 1,070 km. Cost per tonne would be $212.67 and cost per km $8.94 — and neither figure lets you quote for a job of 20 tonnes over 150 km. Multiplying gives 3,000 tonne-km × $0.87 = $2,610, which the composite unit prices directly." },
          ],
          result:
            "Cost per tonne-kilometre is **$0.87**. The reason the composite unit matters is in the last step: it is the only figure that lets the business price a job with a different combination of weight and distance, which single-dimension units cannot do.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The characteristics of services that make costing them harder",
          md: "**Intangibility** (there is no physical unit to point at), **simultaneity** (production and consumption occur together, so nothing can be inventoried), **perishability** (an empty hotel room tonight cannot be sold tomorrow) and **heterogeneity** (no two deliveries of the service are identical). Together these are why a service's cost unit is always an approximation, and why choosing it well matters so much.",
        },
      ],
      check: {
        q: "Which cost unit is most appropriate for a road haulage business, and why?",
        options: [
          "Cost per tonne carried, because weight drives fuel consumption",
          "Cost per kilometre run, because distance drives wear and fuel",
          "Cost per tonne-kilometre, because neither weight nor distance alone measures the work done",
          "Cost per delivery, because that is what the customer pays for",
        ],
        correct: 2,
        explain:
          "A COMPOSITE cost unit — the tonne-kilometre — is needed because carrying 1 tonne 400 km and 40 tonnes 10 km involve very different work yet identical single-dimension totals in one respect each. Only the composite unit lets the business price a job with a different combination of weight and distance, which is precisely what it must do to quote.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Giving normal loss a cost in a process account.",
      fix: "Normal loss carries no cost. Exclude its units from the denominator and deduct its scrap value from total cost, so good output absorbs it.",
    },
    {
      trap: "Treating the whole actual loss as abnormal.",
      fix: "Compare actual output with EXPECTED output after normal loss. Only the excess is abnormal — and if actual output is higher, it is an abnormal GAIN.",
    },
    {
      trap: "Valuing an abnormal gain at a different rate from abnormal loss.",
      fix: "Both are valued at the same cost per unit of good output. Only the direction of the entry changes.",
    },
    {
      trap: "Applying one completion percentage to materials and conversion alike.",
      fix: "Materials are usually 100% complete in WIP because they are added at the start; the percentage applies to conversion cost. Use separate equivalent-unit columns.",
    },
    {
      trap: "Apportioning process cost to a by-product.",
      fix: "Joint products SHARE the cost; a by-product's net realisable value is DEDUCTED from it.",
    },
    {
      trap: "Confusing a margin on selling price with a mark-up on cost.",
      fix: "Margin: price = cost ÷ (1 − margin). Mark-up: price = cost × (1 + mark-up). The same percentage gives different prices.",
    },
    {
      trap: "Using a single-dimension cost unit for a transport or hospital service.",
      fix: "Use a composite unit — tonne-kilometre, passenger-kilometre, patient-day — because one dimension alone does not measure the work performed.",
    },
  ],
  keyTerms: [
    { term: "Job costing", def: "Costing distinct, customer-specified one-off items by accumulating costs on each job." },
    { term: "Batch costing", def: "Costing a group of identical units made together, with cost per unit as total batch cost ÷ units." },
    { term: "Process costing", def: "Costing continuous, indistinguishable output by averaging total process cost over output." },
    { term: "Normal loss", def: "Loss expected in an efficient process; it is given no cost, so good output absorbs it." },
    { term: "Abnormal loss", def: "Loss in excess of normal, valued at the cost per unit of good output and charged to profit or loss." },
    { term: "Abnormal gain", def: "Output exceeding expectation because actual loss was less than normal; credited to profit or loss at the same unit cost." },
    { term: "Equivalent units", def: "Partly-completed units expressed as their equivalent in fully complete units." },
    { term: "Conversion cost", def: "Labour and overhead together, which accumulate gradually through a process unlike materials added at the start." },
    { term: "Joint products", def: "Two or more products of significant sales value arising simultaneously from one process, which share the common cost." },
    { term: "By-product", def: "An incidental output of minor sales value, whose net realisable value is deducted from the main product's cost." },
    { term: "Composite cost unit", def: "A cost unit combining two dimensions, such as a tonne-kilometre, because one alone would not measure the work." },
  ],
  summary: [
    "Job costing suits distinct one-off items, batch costing identical groups, process costing continuous indistinguishable output, and service costing intangible services.",
    "A margin is a percentage of selling price; a mark-up is a percentage of cost, and they give different answers.",
    "Normal loss carries no cost: exclude its units and deduct its scrap value, so good output absorbs it.",
    "Abnormal loss and gain are valued at the cost per unit of good output and taken to profit or loss.",
    "Compare actual output with expected output after normal loss to identify whether there is an abnormal loss or gain.",
    "Equivalent units split process cost between finished output and WIP, with separate columns for materials and conversion.",
    "Joint products share the common cost; a by-product's net realisable value is deducted from it.",
    "Service costing turns on choosing a cost unit, often composite, that captures the work actually done.",
  ],
  knowledgeDiagnostic: [
    { q: "How is normal loss treated in a process account, and why?", a: "It is given no cost: its units are excluded from the denominator and its scrap value deducted from total cost. Both moves push the cost of normal loss onto the good output, which is why good units cost more than the raw input per unit." },
    { q: "How do you identify an abnormal loss or gain?", a: "Compare actual output with expected output after deducting normal loss. Output below expectation is an abnormal loss; output above it is an abnormal gain. Both are valued at the cost per unit of good output." },
    { q: "Why are separate equivalent-unit calculations needed for materials and conversion?", a: "Materials are usually added at the start, so work in progress is 100% complete for them, while labour and overhead accumulate gradually and take the WIP completion percentage." },
    { q: "How does the treatment of a by-product differ from a joint product?", a: "Joint products share the common process cost, apportioned on sales value or physical units. A by-product is not apportioned any cost — its net realisable value is deducted from the main product's cost." },
    { q: "Why does road haulage use a composite cost unit?", a: "Because neither tonnes carried nor kilometres run alone measures the work done. Only the tonne-kilometre allows a job with a different combination of weight and distance to be priced." },
  ],
  furtherStudy: [
    "Process costing with opening WIP, and the FIFO and weighted average methods, are developed in **PM**.",
    "Job costing and pricing decisions return in **PM**'s relevant costing and pricing chapters.",
  ],
}

/* ── Chapter 15 · C4 ───────────────────────────────────────────── */

export const MA_TREE_15: StudyChapter = {
  id: "MA-15",
  number: 15,
  paper: "MA",
  area: "C",
  title: "Alternative costing principles",
  minutes: 16,
  syllabusRefs: ["C4(a)", "C4(b)"],
  intro:
    "Traditional absorption costing was designed for factories where direct labour dominated. When overheads are the largest cost and are driven by complexity rather than volume, it misleads — and these four approaches are the responses.",
  outcomes: [
    "Explain activity based costing and calculate a product cost using cost drivers",
    "Explain target costing and calculate a target cost",
    "Explain life cycle costing and its implications",
    "Explain total quality management and the four categories of quality cost",
    "Differentiate the four approaches from traditional absorption costing",
  ],
  sections: [
    {
      id: "why-alternatives",
      heading: "Why traditional absorption costing came under pressure",
      blocks: [
        {
          kind: "list",
          title: "What changed",
          items: [
            "**Overheads grew** from a small share of cost to the dominant one, as production automated.",
            "**Direct labour shrank**, so absorbing overhead on labour hours meant a small base carrying a large cost — a small error in the base became a large error in the product cost.",
            "**Product ranges widened**, and much overhead turned out to be driven by **complexity and diversity** — set-ups, inspections, order handling — rather than by volume.",
            "**Blanket volume-based absorption therefore cross-subsidised**: high-volume simple products absorbed overhead they did not cause, while low-volume complex products absorbed too little.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The cross-subsidy problem in one sentence",
          md: "If overhead is absorbed on labour hours but is actually caused by the **number of set-ups**, then a product made in one long run absorbs the same overhead per hour as one made in twenty short runs — so the simple product subsidises the complex one, and management may drop a genuinely profitable line while expanding a loss-making one.",
        },
      ],
    },
    {
      id: "abc",
      heading: "Activity based costing",
      blocks: [
        {
          kind: "definition",
          term: "Activity based costing (ABC)",
          md: "A costing approach that assigns overhead to products according to the **activities** each product actually consumes. Overheads are collected into **cost pools** by activity, and each pool is charged to products using the **cost driver** that causes it.",
        },
        {
          kind: "definition",
          term: "Cost pool and cost driver",
          md: "A **cost pool** groups the overhead of one activity — all set-up costs, all inspection costs. A **cost driver** is the factor that **causes** that cost to be incurred — number of set-ups, number of inspections, number of purchase orders, number of customer deliveries.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The ABC steps",
            caption: "The difference from absorption costing is entirely in steps 2 and 3: identifying activities and their real drivers.",
            data: {
              steps: [
                { label: "1 · Identify activities", sub: "set-ups, inspections, materials handling, order processing" },
                { label: "2 · Collect overhead into cost pools", sub: "one pool per activity" },
                { label: "3 · Identify the cost driver", sub: "what actually causes each pool to grow" },
                { label: "4 · Compute a cost per driver unit", sub: "pool cost ÷ total driver activity" },
                { label: "5 · Charge products", sub: "driver units consumed × cost per driver unit" },
              ],
            },
          },
        },
        {
          kind: "example",
          title: "Worked example — ABC against traditional absorption",
          scenario:
            "Set-up costs are $180,000 a year and there are 600 set-ups. Product X: 90,000 units made in 60 set-ups, using 0.5 labour hours each. Product Y: 10,000 units made in 240 set-ups, using 0.5 labour hours each. Total labour hours are 50,000 and total overhead is the $180,000 of set-up cost. Compare the set-up cost per unit under labour-hour absorption and under ABC.",
          steps: [
            { label: "Traditional: overhead absorption rate per labour hour", detail: "$180,000 ÷ 50,000 labour hours = $3.60 per hour." },
            { label: "Traditional: cost per unit", detail: "Both products use 0.5 hours per unit, so both absorb 0.5 × $3.60 = $1.80 per unit — identical, regardless of how they are made." },
            { label: "ABC: cost per set-up", detail: "$180,000 ÷ 600 set-ups = $300 per set-up." },
            { label: "ABC: Product X", detail: "60 set-ups × $300 = $18,000, over 90,000 units = $0.20 per unit." },
            { label: "ABC: Product Y", detail: "240 set-ups × $300 = $72,000, over 10,000 units = $7.20 per unit." },
            { label: "Compare", detail: "Traditional says both cost $1.80. ABC says X costs $0.20 and Y costs $7.20 — a 36-fold difference the labour-hour method could not see, because Y is made in short runs requiring four times as many set-ups for one ninth of the volume." },
          ],
          result:
            "Under labour-hour absorption both products absorb $1.80 of set-up cost; under ABC, X absorbs $0.20 and Y $7.20. The commercial consequence is the point: Y looked profitable and is being **cross-subsidised by X**. Decisions to promote Y or discount X, taken on the traditional figures, would destroy value — which is exactly the error ABC exists to prevent.",
        },
        {
          kind: "table",
          caption: "ABC, weighed up honestly",
          head: ["Advantages", "Disadvantages"],
          rows: [
            ["More accurate product costs where overhead is driven by complexity", "Costly and time-consuming to implement and maintain"],
            ["Reveals cross-subsidy between products", "Choosing drivers still involves judgement — some overhead has no clear driver"],
            ["Better pricing, product mix and discontinuation decisions", "Facility-level costs (factory rent) remain arbitrary however they are assigned"],
            ["Identifies non-value-adding activities as targets for reduction", "Requires data most systems do not already collect"],
            ["Useful for cost control, since drivers are manageable", "Little benefit where overheads are small or products are similar"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "ABC is not always worth doing",
          md: "Where overhead is a **small** proportion of total cost, or where products are **similar** in volume and complexity, ABC gives nearly the same answer as absorption costing for considerably more effort. The examinable judgement is **when** it is worth the cost — not that it is always superior.",
        },
      ],
      check: {
        q: "Under activity based costing, overhead is charged to products on the basis of:",
        options: [
          "Direct labour hours consumed",
          "The cost drivers that cause each activity's cost to be incurred",
          "Machine hours in every case",
          "Sales value of each product",
        ],
        correct: 1,
        explain:
          "ABC collects overhead into cost pools by ACTIVITY and charges each pool using its COST DRIVER — the factor that actually causes the cost, such as the number of set-ups or inspections. That is precisely what distinguishes it from traditional absorption, which uses a single volume-based measure like labour or machine hours regardless of what drives the overhead.",
      },
    },
    {
      id: "target-costing",
      heading: "Target costing",
      blocks: [
        {
          kind: "definition",
          term: "Target costing",
          md: "An approach that **starts from the market**: establish the price customers will pay, deduct the profit the business requires, and the remainder is the **target cost** the product must be designed to meet. It reverses the traditional sequence of costing a product and then adding a margin.",
        },
        {
          kind: "formula",
          name: "Target cost and cost gap",
          expr: "Target cost  =  Target selling price  −  Required profit margin\n\nCost gap  =  Estimated current cost  −  Target cost",
          note: "The cost gap is the amount that must be designed out before launch, usually through value engineering rather than through cutting corners after production starts.",
        },
        {
          kind: "example",
          title: "Worked example — target cost and closing the gap",
          scenario:
            "Market research indicates a new product will sell 40,000 units a year at $60. The company requires a 20% margin on selling price. The estimated cost with the current design is $52 per unit. Calculate the target cost and the cost gap, and state how the gap might be closed.",
          steps: [
            { label: "Required profit per unit", detail: "20% × $60 = $12." },
            { label: "Target cost", detail: "$60 − $12 = $48 per unit." },
            { label: "Cost gap", detail: "Estimated $52 − target $48 = $4 per unit, or $160,000 a year across 40,000 units." },
            { label: "How the gap is closed", detail: "Redesign to use fewer or cheaper components; design out assembly steps; standardise parts across products to gain purchasing scale; negotiate supplier prices on the committed volume; reduce the number of set-ups or inspections needed (an ABC insight); or review whether any feature costs more than customers value." },
          ],
          result:
            "Target cost $48; cost gap $4 per unit. The characteristic feature of target costing is **when** it acts: the gap is closed at the **design stage**, before the product is launched, because that is when the majority of a product's cost is still determined. Once production begins, most of the cost structure is locked in and only marginal savings remain available.",
        },
      ],
    },
    {
      id: "lifecycle-tqm",
      heading: "Life cycle costing and total quality management",
      blocks: [
        {
          kind: "definition",
          term: "Life cycle costing",
          md: "Accumulating **all** the costs a product incurs over its **whole life** — from research, design and development, through production and marketing, to decommissioning and disposal — and relating them to the revenue earned over that life, rather than assessing profitability period by period.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why period-by-period costing misleads on a new product",
          md: "Design and development costs are incurred **before** any revenue arrives, so a product looks heavily loss-making in its early periods and highly profitable later once those costs have already been written off. Neither picture is right. Life cycle costing spreads the whole cost over the whole life, which is the only basis on which a launch decision can honestly be judged — and it shows how much of the total cost is **committed at the design stage**, which is why it pairs naturally with target costing.",
        },
        {
          kind: "definition",
          term: "Total quality management (TQM)",
          md: "An approach seeking **continuous improvement** and **getting it right first time**, on the principle that preventing defects costs less than detecting and correcting them. Quality becomes everyone's responsibility rather than a final inspection department's.",
        },
        {
          kind: "table",
          caption: "The four categories of quality cost",
          head: ["Category", "Is", "Examples"],
          rows: [
            ["**Prevention**", "Cost of preventing defects arising", "Training, better design, supplier quality assurance, preventive maintenance"],
            ["**Appraisal (inspection)**", "Cost of checking whether defects have arisen", "Inspection, testing, quality audits"],
            ["**Internal failure**", "Cost of defects found BEFORE the product reaches the customer", "Scrap, rework, re-inspection, downtime"],
            ["**External failure**", "Cost of defects found AFTER delivery", "Warranty claims, repairs, returns, compensation, lost reputation and lost future sales"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The TQM argument in one line",
          md: "**Spending more on PREVENTION reduces total quality cost, because internal and especially EXTERNAL failure costs are far larger.** External failure is the most expensive category and the hardest to measure, since lost reputation and lost future sales never appear in the ledger. That is the case for prevention, and the reason TQM aims at zero defects rather than at an economically optimal defect rate.",
        },
        {
          kind: "activity",
          title: "Activity 4 — differentiate the approaches",
          prompt:
            "For each of the four alternative approaches, state in one sentence what it does that traditional absorption costing does not.\n\nThen say which you would recommend to a company whose overheads are 70% of total cost, whose product range spans very high and very low volumes, and which suspects some products are loss-making.",
          answer:
            "**ABC** — assigns overhead by the activities and cost drivers that actually cause it, instead of by a single volume-based measure, so cross-subsidy between products becomes visible.\n\n**Target costing** — starts from the price the market will pay and works back to the cost the product must be designed to meet, instead of costing the product and adding a margin.\n\n**Life cycle costing** — accumulates all costs over a product's whole life, including pre-production design and post-production disposal, instead of assessing profitability period by period.\n\n**TQM** — treats the cost of quality as four measurable categories and argues for spending on prevention, instead of treating inspection and rework as an unavoidable cost of production.\n\n**Recommendation: ABC.** Both conditions that make it worthwhile are present. Overheads at **70% of total cost** mean the absorption basis dominates the product cost, so an inappropriate basis produces a large error rather than a small one. And a range spanning **very high and very low volumes** is exactly the profile in which volume-based absorption cross-subsidises: the high-volume lines absorb overhead caused by the low-volume ones. The suspicion that some products are loss-making is most likely correct, and traditional costing cannot show which — it will report them all at a similar overhead per unit.\n\n**One qualification worth stating:** ABC is costly to implement and the company should confirm it can identify sensible drivers and collect the driver data before committing. Where a driver cannot be identified, that overhead remains as arbitrary under ABC as it was before.",
        },
      ],
      check: {
        q: "Which category of quality cost does a warranty claim from a customer fall into?",
        options: ["Prevention cost", "Appraisal cost", "Internal failure cost", "External failure cost"],
        correct: 3,
        explain:
          "A warranty claim arises AFTER the product has reached the customer, making it an EXTERNAL failure cost — the most expensive category, because it includes lost reputation and lost future sales that never appear in the ledger. Internal failure covers defects caught before delivery (scrap and rework), appraisal covers inspection, and prevention covers training and design that stop defects arising.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Describing ABC as absorbing overhead on machine hours instead of labour hours.",
      fix: "ABC uses the COST DRIVER that causes each activity's cost — set-ups, inspections, orders. Swapping one volume measure for another is still traditional absorption.",
    },
    {
      trap: "Claiming ABC is always better than absorption costing.",
      fix: "Where overheads are small or products are similar in volume and complexity, it gives nearly the same answer for far more effort.",
    },
    {
      trap: "Calculating a target cost by adding a margin to cost.",
      fix: "Target costing works backwards: target selling price LESS required profit equals target cost. Adding a margin to cost is the traditional approach it replaces.",
    },
    {
      trap: "Treating the cost gap as something to be closed after production starts.",
      fix: "It is closed at the DESIGN stage, because that is when most of a product's cost is still determined.",
    },
    {
      trap: "Assessing a new product's profitability period by period.",
      fix: "Design and development costs precede any revenue, so early periods look loss-making and later ones over-profitable. Life cycle costing spreads whole-life cost over whole-life revenue.",
    },
    {
      trap: "Confusing internal and external failure costs.",
      fix: "Internal failure is caught BEFORE delivery — scrap and rework. External failure is found AFTER — warranty, returns, lost reputation, and it is the most expensive.",
    },
  ],
  keyTerms: [
    { term: "Activity based costing", def: "Assigning overhead to products according to the activities each consumes, using cost drivers." },
    { term: "Cost pool", def: "The overhead cost collected for one activity, such as all set-up costs." },
    { term: "Cost driver", def: "The factor that causes an activity's cost to be incurred, such as the number of set-ups." },
    { term: "Cross-subsidy", def: "The effect whereby volume-based absorption makes simple high-volume products bear overhead caused by complex low-volume ones." },
    { term: "Target costing", def: "Deducting the required profit from a market-determined selling price to establish the cost a product must be designed to meet." },
    { term: "Cost gap", def: "The excess of a product's estimated current cost over its target cost, to be designed out before launch." },
    { term: "Life cycle costing", def: "Accumulating all costs over a product's whole life, from design to disposal, against the revenue earned over that life." },
    { term: "Total quality management", def: "An approach of continuous improvement and getting it right first time, on the basis that prevention costs less than failure." },
    { term: "External failure cost", def: "The cost of defects found after delivery — warranty, returns, compensation, lost reputation and lost future sales." },
  ],
  summary: [
    "Traditional absorption came under pressure as overheads grew, direct labour shrank and product ranges widened.",
    "Volume-based absorption cross-subsidises: simple high-volume products bear overhead caused by complex low-volume ones.",
    "ABC collects overhead into activity cost pools and charges it using the driver that causes it.",
    "ABC is worthwhile where overheads are large and products differ in volume and complexity — not universally.",
    "Target costing works backwards from market price less required profit, and closes the cost gap at the design stage.",
    "Life cycle costing spreads whole-life cost against whole-life revenue, avoiding the distortion of period-by-period assessment.",
    "TQM's four quality cost categories are prevention, appraisal, internal failure and external failure.",
    "Prevention spending reduces total quality cost, because external failure is by far the most expensive and least visible category.",
  ],
  knowledgeDiagnostic: [
    { q: "What problem does ABC address?", a: "Cross-subsidy. Volume-based absorption charges overhead by labour or machine hours even where it is caused by complexity — set-ups, inspections, order handling — so simple high-volume products absorb overhead caused by complex low-volume ones." },
    { q: "What is a cost driver, and how does it differ from an absorption basis?", a: "A cost driver is the factor that actually CAUSES an activity's cost, such as the number of set-ups. A traditional absorption basis is a volume measure applied regardless of what causes the overhead." },
    { q: "How is a target cost calculated?", a: "Target selling price, determined by the market, less the required profit margin. The gap between that and the estimated current cost must be designed out before launch." },
    { q: "Why does life cycle costing give a truer picture of a new product?", a: "Because design and development costs precede any revenue, so period-by-period assessment shows early losses and later over-profitability. Life cycle costing relates whole-life cost to whole-life revenue." },
    { q: "What are the four categories of quality cost, and which is most expensive?", a: "Prevention, appraisal, internal failure and external failure. External failure is the most expensive and least visible, because it includes lost reputation and lost future sales." },
  ],
  furtherStudy: [
    "ABC, target costing, life cycle costing and TQM are all developed in far more depth in **PM**, with fuller calculations.",
    "Quality costs and continuous improvement return in **APM** as part of performance management.",
  ],
}

/* ── Area C chapter list, in reading order ─────────────────────── */

export const MA_TREE_AREA_C: StudyChapter[] = [
  MA_TREE_10,
  MA_TREE_11,
  MA_TREE_12,
  MA_TREE_13,
  MA_TREE_14,
  MA_TREE_15,
]


