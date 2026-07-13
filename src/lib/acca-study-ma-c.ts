import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area C — Budgeting.
 * Original, syllabus-aligned rich study chapter. No ACCA/Kaplan/BPP text.
 * Every calculation is re-solved and footed; diagrams carry the numbers.
 */

export const MA_C: StudyChapter = {
  paper: "MA",
  area: "C",
  title: "Budgeting",
  minutes: 16,
  intro: "A budget is a business making its next year happen on paper first. Get the order right — start with what limits you, cascade through every function, and end with cash — and the whole plan holds together.",
  outcomes: [
    "Explain why organisations budget: planning, coordination, communication, motivation, control and authorisation",
    "Describe the budget-preparation process and identify the principal budget factor",
    "Build the functional budgets — sales, production, materials usage and purchases, and labour",
    "Prepare a cash budget from timed receipts and payments and read its closing balance",
    "Flex a budget correctly and compare incremental, zero-based and rolling methods",
  ],
  sections: [
    {
      id: "why",
      heading: "Why budget, and where to start",
      blocks: [
        { kind: "text", md: "A **budget** is a quantified plan for a future period — usually expressed in money, sometimes in units or hours. Managers do not budget for the paperwork; they budget because writing next year down in numbers forces decisions to be made *before* the money is spent, not after. The classic reasons spell out as **planning, coordinating, communicating, motivating, controlling and authorising** — often remembered by the fact that a budget both sets targets (motivate) and gives managers formal permission to spend up to a limit (authorise)." },
        { kind: "text", md: "Budget preparation is not a free-for-all. It follows an order, and that order is dictated by one thing: the **principal budget factor** — the factor that limits the organisation's activity. In most businesses this is **sales demand** (you can only make what you can sell), but it could be a scarce material, machine capacity, cash or labour. The principal budget factor must be identified **first**, because every other budget is built to fit around it." },
        { kind: "callout", tone: "rule", title: "Start with the constraint", md: "The **principal budget factor** is prepared first and everything else cascades from it. If sales demand is the limit, the **sales budget** comes first; only if, say, a material is scarce would production be capped by that material instead." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The budget cascade",
          caption: "Sales demand (the usual principal budget factor) sets the pace; each budget feeds the next, ending in cash and the master budget.",
          data: {
            steps: [
              { label: "Sales budget", sub: "units & revenue — the starting point" },
              { label: "Production budget", sub: "adjust sales for inventory movement" },
              { label: "Materials & labour budgets", sub: "resources to make that output" },
              { label: "Cash budget", sub: "time the money in and out" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Budgeting is planning the future in numbers, in a fixed order: identify the **principal budget factor**, budget it first, then cascade through every function to a **master budget** (budgeted P/L, position and cash)." },
      ],
    },
    {
      id: "functional",
      heading: "Functional budgets — from sales to labour",
      blocks: [
        { kind: "text", md: "A **functional budget** is a budget for one function or activity — sales, production, materials, labour. The trickiest handover is from **sales** to **production**, because a business rarely makes exactly what it sells: it also builds up or runs down **finished-goods inventory**. That is why the production budget adjusts sales for the planned inventory change." },
        { kind: "formula", name: "Production budget (units)", expr: "Production = Sales + Closing inventory − Opening inventory", note: "Add what you want left at the end; subtract what you already start with." },
        { kind: "example", title: "Worked example — production with inventory adjustment", scenario: "Zephyr Ltd makes one product, the Z1. Budgeted sales for next quarter are 20,000 units. It holds 2,500 units of opening finished goods and wants 3,000 units in stock at the quarter end. How many units must it produce?", steps: [
          { label: "Start with sales", detail: "It must have 20,000 units available to sell." },
          { label: "Add desired closing inventory", detail: "It also wants 3,000 units left in the warehouse → + 3,000." },
          { label: "Deduct opening inventory", detail: "It already starts the quarter with 2,500 units, so it need not make those → − 2,500." },
          { label: "Production required", detail: "20,000 + 3,000 − 2,500 = 20,500 units." },
        ], result: "Zephyr must produce 20,500 units — 500 more than it sells — because it is deliberately building finished-goods inventory from 2,500 up to 3,000 units." },
        { kind: "table", caption: "Production budget over three quarters (units) — each quarter's closing inventory becomes the next quarter's opening inventory, so the rows chain together.", head: ["Line", "Q1", "Q2", "Q3"], rows: [
          ["Sales demand", "12,000", "14,000", "15,000"],
          ["+ Closing inventory", "1,400", "1,500", "1,600"],
          ["− Opening inventory", "(1,200)", "(1,400)", "(1,500)"],
          ["= Production (units)", "12,200", "14,100", "15,100"],
        ] },
        { kind: "text", md: "Once production units are set, the **materials** and **labour** budgets fall out of them. Materials has the *same* inventory twist as production — but on **raw materials**: the quantity you must **buy** differs from the quantity you **use**, because you also adjust raw-material inventory." },
        { kind: "formula", name: "Materials purchases (units of material)", expr: "Purchases = Usage + Closing materials − Opening materials", note: "Usage = production units × quantity of material per unit." },
        { kind: "table", caption: "Materials & labour for Zephyr's 20,500 production units (Z1 uses 4 kg at $3/kg and 0.25 hrs at $16/hr; opening RM 6,000 kg, closing RM 7,000 kg)", head: ["Step", "Working", "Result"], rows: [
          ["Materials usage", "20,500 units × 4 kg", "82,000 kg"],
          ["Materials purchases", "82,000 + 7,000 − 6,000 kg", "83,000 kg"],
          ["Purchases cost", "83,000 kg × $3", "$249,000"],
          ["Labour hours", "20,500 units × 0.25 hrs", "5,125 hrs"],
          ["Labour cost", "5,125 hrs × $16", "$82,000"],
        ] },
        { kind: "callout", tone: "warn", title: "Usage is not purchases", md: "**Usage** is what production consumes; **purchases** is what you buy — and they differ by the change in raw-material inventory. Flip that adjustment (or apply the production rule to purchases) and every downstream cost is wrong." },
      ],
      check: {
        q: "Budgeted sales are 9,000 units. Opening finished goods are 800 units and the business wants 1,100 units in closing inventory. What is the production budget?",
        options: ["8,700 units", "9,000 units", "9,300 units", "10,900 units"],
        correct: 2,
        explain: "Production = Sales + Closing − Opening = 9,000 + 1,100 − 800 = 9,300 units. The trap answer 8,700 flips the signs (subtracting closing, adding opening); 9,000 ignores inventory altogether. Because closing (1,100) exceeds opening (800), production must exceed sales to build stock.",
      },
    },
    {
      id: "cash",
      heading: "The cash budget",
      blocks: [
        { kind: "text", md: "The **cash budget** is the one budget everyone reads twice, because a business can be profitable on paper and still run out of money. It records the **actual cash** expected to flow in and out, month by month, and — crucially — records it in the month the **cash moves**, not the month the sale or purchase is made. Credit terms shift the timing." },
        { kind: "callout", tone: "rule", title: "Cash, and only cash", md: "A cash budget contains **only cash flows**, timed to when they happen. **Depreciation is never in a cash budget** — it is a non-cash accounting entry. Credit sales appear when customers *pay*; credit purchases appear when the business *pays* its suppliers." },
        { kind: "example", title: "Worked example — a three-month cash budget", scenario: "Prepare Marlow Ltd's cash budget for Jan–Mar. Sales: Dec $70,000, Jan $80,000, Feb $100,000, Mar $120,000 — customers pay 40% in the month of sale and 60% the following month. Purchases (paid one month in arrears): Dec $50,000, Jan $55,000, Feb $60,000. Wages (paid in month): Jan 15,000, Feb 18,000, Mar 20,000. Other overheads $8,000 cash each month. New equipment $30,000 is paid in February. Opening cash at 1 Jan is $10,000.", steps: [
          { label: "Receipts from customers", detail: "Jan: (40% × 80,000) + (60% × 70,000) = 32,000 + 42,000 = 74,000. Feb: (40% × 100,000) + (60% × 80,000) = 40,000 + 48,000 = 88,000. Mar: (40% × 120,000) + (60% × 100,000) = 48,000 + 60,000 = 108,000." },
          { label: "Payments to suppliers", detail: "One month in arrears, so Jan pays Dec's 50,000; Feb pays Jan's 55,000; Mar pays Feb's 60,000." },
          { label: "Total payments each month", detail: "Jan: 50,000 + 15,000 + 8,000 = 73,000. Feb: 55,000 + 18,000 + 8,000 + 30,000 equipment = 111,000. Mar: 60,000 + 20,000 + 8,000 = 88,000." },
          { label: "Roll the balance forward", detail: "Jan: 10,000 + 74,000 − 73,000 = 11,000. Feb: 11,000 + 88,000 − 111,000 = (12,000). Mar: (12,000) + 108,000 − 88,000 = 8,000. Each month's closing becomes the next month's opening." },
        ], result: "Closing balances are $11,000, $(12,000) and $8,000. Marlow dips into a $12,000 overdraft at end-February — driven by the equipment payment landing in the same month as heavy supplier and wage outflows — even though sales are growing. The budget flags the need to arrange finance before February, not after." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "February cash bridge",
          caption: "Opening cash + receipts − each payment = closing cash. The bar crosses below zero — February ends in overdraft.",
          data: {
            unit: "$",
            items: [
              { label: "Opening cash (1 Feb)", value: 11000, kind: "start" },
              { label: "Cash from customers", value: 88000, kind: "delta" },
              { label: "Payments to suppliers", value: -55000, kind: "delta" },
              { label: "Wages & overheads", value: -26000, kind: "delta" },
              { label: "Equipment purchase", value: -30000, kind: "delta" },
              { label: "Closing cash (28 Feb)", value: -12000, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "Read the closing balance line like a heartbeat: a **positive** balance may mean idle cash to invest; a **negative** balance means an overdraft or other finance must be arranged **in advance**. The value of the cash budget is the warning it gives — Marlow has weeks, not days, to secure that overdraft facility." },
      ],
      check: {
        q: "Sales are $50,000 in month 1 and $60,000 in month 2. Customers pay 30% in the month of sale and 70% in the following month. How much cash is received in month 2?",
        options: ["$42,000", "$53,000", "$57,000", "$60,000"],
        correct: 1,
        explain: "Month 2 receipts = 30% of month 2's sales + 70% of month 1's sales = (30% × 60,000) + (70% × 50,000) = 18,000 + 35,000 = 53,000. The trap $42,000 is just 70% × 60,000 (wrong month); $60,000 ignores the credit timing entirely.",
      },
    },
    {
      id: "flexible",
      heading: "Fixed vs flexible budgets — and flexing",
      blocks: [
        { kind: "text", md: "A **fixed budget** is set for **one** level of activity and never changed, whatever actually happens. It is fine for planning, but useless for fair **control**: if you budgeted for 10,000 units and made 12,000, of course your total costs are higher — that tells you nothing about whether the factory was efficient. To judge performance you first **flex** the budget to the activity level actually achieved." },
        { kind: "callout", tone: "rule", title: "The golden rule of flexing", md: "**Flex the variable costs to the actual activity level; hold the fixed costs constant.** Variable cost per unit stays the same and is multiplied by actual units; fixed costs are, by definition, unchanged by volume." },
        { kind: "example", title: "Worked example — flexing the budget", scenario: "Orwell Ltd set a fixed budget for 10,000 units: direct materials $5/unit, direct labour $8/unit, variable overhead $2/unit, and fixed overhead $30,000. Actual output was 12,000 units and actual total cost was $216,000. Flex the budget and find the meaningful variance.", steps: [
          { label: "Original fixed budget (10,000 units)", detail: "Materials 50,000 + Labour 80,000 + Variable o/h 20,000 + Fixed o/h 30,000 = $180,000 total." },
          { label: "Flex variable costs to 12,000 units", detail: "Materials 5 × 12,000 = 60,000; Labour 8 × 12,000 = 96,000; Variable o/h 2 × 12,000 = 24,000." },
          { label: "Hold fixed cost", detail: "Fixed overhead stays at $30,000 — volume does not change it." },
          { label: "Flexed budget", detail: "60,000 + 96,000 + 24,000 + 30,000 = $210,000." },
          { label: "Meaningful variance", detail: "Actual 216,000 − Flexed 210,000 = $6,000 Adverse." },
        ], result: "Comparing actual $216,000 to the original fixed budget $180,000 shows a scary $36,000 'overspend' — but $30,000 of that is simply because 2,000 more units were made. Flexed, the real controllable variance is only $6,000 Adverse. Flexing separates 'we made more' from 'we were inefficient'." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Fixed vs flexible budget",
          data: {
            leftTitle: "Fixed budget",
            rightTitle: "Flexible budget",
            rows: [
              { aspect: "Activity level", left: "One planned level, never changed", right: "Recalculated to the actual level" },
              { aspect: "Variable costs", left: "Held at the planned volume", right: "Flexed: cost/unit × actual units" },
              { aspect: "Fixed costs", left: "Unchanged", right: "Unchanged (do not flex)" },
              { aspect: "Best for", left: "Planning & authorising spend", right: "Control & fair variance analysis" },
              { aspect: "Comparison risk", left: "Mixes volume with efficiency", right: "Isolates true cost performance" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Flexing only makes sense once you have split costs into **variable** and **fixed**. If a cost is semi-variable, break it (often with the high-low method) before you flex." },
      ],
      check: {
        q: "A fixed budget for 8,000 units has variable costs of $4/unit and fixed costs of $20,000. Actual output was 9,000 units. What is the flexed budget total cost?",
        options: ["$52,000", "$56,000", "$58,500", "$63,000"],
        correct: 1,
        explain: "Flex variable costs to 9,000 units (4 × 9,000 = 36,000) and hold fixed costs at 20,000 → 36,000 + 20,000 = $56,000. The trap $52,000 is the original budget (never flexed); $58,500 wrongly flexes the fixed cost too (20,000 × 9/8 = 22,500). Only variable costs flex.",
      },
    },
    {
      id: "methods",
      heading: "Budgeting methods & behavioural aspects",
      blocks: [
        { kind: "text", md: "How is a budget figure *arrived at*? The default is **incremental budgeting** — take last year's figures and adjust for inflation and known changes. It is quick and stable, but it quietly carries forward last year's waste (it 'budgets for the padding'), because nobody re-justifies the base." },
        { kind: "text", md: "**Zero-based budgeting (ZBB)** starts every activity from a **zero base**: each cost must be justified from scratch as if the activity were brand new, ranked against alternatives for the funds. It roots out slack and suits discretionary areas (marketing, R&D, admin), but it is time-consuming and demands real management effort. **Rolling (continuous) budgets** keep a full budget period always in view: as each month or quarter passes, a new one is added to the end, so the plan is continuously updated — valuable when the future is hard to predict, at the cost of frequent re-budgeting." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Incremental vs zero-based budgeting",
          data: {
            leftTitle: "Incremental",
            rightTitle: "Zero-based",
            rows: [
              { aspect: "Starting point", left: "Last year's figures", right: "A zero base — justify everything" },
              { aspect: "Effort & cost", left: "Low, quick to prepare", right: "High, time-consuming" },
              { aspect: "Treatment of slack", left: "Carries it forward", right: "Challenges and removes it" },
              { aspect: "Best suited to", left: "Stable, ongoing costs", right: "Discretionary spend (marketing, R&D)" },
            ],
          },
        } },
        { kind: "text", md: "Finally, budgets are set by people and act on people — the **behavioural** dimension. Where a budget is imposed from the top down, managers may feel no ownership and disengage. **Participative (bottom-up) budgeting** — involving the managers who must deliver the numbers — usually improves commitment and accuracy, but it opens the door to **budgetary slack**: managers deliberately understate revenue or overstate costs to give themselves an easy target. A budget also needs to be a realistic **motivator**: a target set too high demotivates, one set too low breeds complacency. The art is a target that stretches without breaking." },
        { kind: "callout", tone: "warn", title: "Budgetary slack", md: "**Slack** is deliberate margin built into a budget to make it easier to hit — understated income or padded costs. Participation improves buy-in but makes slack easier to hide, which is one reason ZBB is used to challenge the base." },
      ],
    },
  ],
  examTraps: [
    { trap: "Flexing the fixed costs along with the variable costs.", fix: "Only variable costs flex (cost per unit × actual activity). Fixed costs are held constant — that is what makes them fixed." },
    { trap: "Getting the production/purchases inventory sign wrong.", fix: "Production = Sales + Closing − Opening; Purchases = Usage + Closing − Opening. ADD desired closing, SUBTRACT opening." },
    { trap: "Putting depreciation, or the sale/purchase in the wrong month, into a cash budget.", fix: "A cash budget holds only cash flows, timed to when cash moves. Exclude depreciation; apply the credit terms to time receipts and payments." },
    { trap: "Assuming production is always the first budget to prepare.", fix: "Identify the principal budget factor first. Usually it is sales demand, so the sales budget comes first — but a scarce resource can be the limit instead." },
    { trap: "Confusing materials usage with materials purchases.", fix: "Usage = production × quantity per unit. Purchases adjust usage for the change in raw-material inventory — they are not the same number." },
  ],
  keyTerms: [
    { term: "Principal budget factor", def: "The factor that limits activity (usually sales demand). It is identified and budgeted first, and every other budget is built around it." },
    { term: "Functional budget", def: "A budget for a single function or activity — for example the sales, production, materials, labour or overhead budget." },
    { term: "Cash budget", def: "A month-by-month plan of actual cash receipts and payments, timed to when cash moves, revealing the closing balance and any financing need." },
    { term: "Flexed budget", def: "A budget recalculated to the activity level actually achieved by flexing variable costs and holding fixed costs, used for fair variance analysis." },
    { term: "Zero-based budgeting", def: "A method that starts each activity from a zero base, requiring every cost to be justified from scratch rather than rolled forward from last year." },
  ],
  summary: [
    "Organisations budget to plan, coordinate, communicate, motivate, control and authorise; preparation starts with the principal budget factor (usually sales demand).",
    "Functional budgets cascade: sales → production → materials & labour → cash → master budget.",
    "Production = Sales + Closing inventory − Opening inventory; Purchases = Usage + Closing − Opening (add closing, subtract opening).",
    "The cash budget times only cash flows (no depreciation) to a closing balance that warns of overdraft or surplus in advance.",
    "Flex before you judge — flex variable costs to actual activity, hold fixed costs; methods include incremental, zero-based and rolling budgets, all shaped by behavioural factors like slack.",
  ],
}
