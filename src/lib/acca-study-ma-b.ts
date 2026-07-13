import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area B — Costing techniques.
 * Absorption vs marginal costing, the overhead absorption rate and under/over
 * absorption, the profit reconciliation, ABC, and job/batch/process/service
 * costing. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const MA_B: StudyChapter = {
  paper: "MA",
  area: "B",
  title: "Costing techniques",
  minutes: 17,
  intro: "Direct costs are easy — you can point at the timber in the table. The hard part is the rent, the supervisor and the electricity that no single unit owns. Costing techniques are the disciplined ways we share those costs out, and the two rival philosophies for doing it.",
  outcomes: [
    "Allocate, apportion and reapportion production overheads to cost centres",
    "Calculate an overhead absorption rate (OAR) and the resulting under- or over-absorption",
    "Build a profit statement under both marginal and absorption costing",
    "Reconcile the two profits using the change in inventory and the fixed OAR",
    "Explain activity-based costing, and apply job, batch, process and service costing",
  ],
  sections: [
    {
      id: "absorption",
      heading: "Absorption costing — sharing out the overheads",
      blocks: [
        { kind: "text", md: "Every product carries **direct costs** you can trace straight to it — the materials and the labour that went into that exact unit. But a factory is full of costs that belong to **no single unit**: factory rent, the production manager's salary, machine depreciation, heating. These are **production overheads**, and **absorption costing** is the method that shares them across the units made so that each one carries a fair slice of the total cost of running the place." },
        { kind: "text", md: "The sharing happens in three deliberate steps. First **allocation**: a whole cost that belongs to one cost centre is charged straight to it — the wages of a machine-shop supervisor go entirely to the machine shop. Then **apportionment**: a shared cost that spans several centres is split between them on a fair **basis** — factory rent split by floor area, machine insurance split by machine value. Finally **reapportionment**: the costs piled up in **service** centres (stores, maintenance, the canteen) are pushed out to the **production** centres they serve, because only production centres make the units that will ultimately absorb the cost." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How an overhead reaches a unit of product",
          caption: "Allocate what belongs to one centre, apportion what is shared, reapportion the service centres, then absorb into units.",
          data: {
            steps: [
              { label: "Allocate", sub: "whole cost → its own cost centre" },
              { label: "Apportion", sub: "shared cost → split on a fair basis" },
              { label: "Reapportion", sub: "service centres → production centres" },
              { label: "Absorb", sub: "production-centre total → units via the OAR" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Allocation vs apportionment", md: "**Allocation** charges a whole cost to a single centre because it belongs there entirely. **Apportionment** splits one shared cost across several centres on a fair basis. The test is simply whether the cost belongs to **one** centre or **many**." },
        { kind: "table", caption: "Apportioning $60,000 of factory rent by floor area", head: ["Cost centre", "Floor area (sqm)", "Share", "Rent apportioned"], rows: [
          ["Machining", "4,000", "4,000 / 6,000", "$40,000"],
          ["Assembly", "2,000", "2,000 / 6,000", "$20,000"],
          ["Total", "6,000", "", "$60,000"],
        ] },
        { kind: "text", md: "Rent has nothing to do with how hard a machine works, so **floor area** is the fair basis: Machining takes $60,000 × 4,000 / 6,000 = **$40,000** and Assembly takes $60,000 × 2,000 / 6,000 = **$20,000**. Choosing a sensible basis (area for rent, machine value for insurance, number of employees for the canteen) is the whole skill of apportionment." },
      ],
    },
    {
      id: "oar",
      heading: "The overhead absorption rate — and getting it wrong",
      blocks: [
        { kind: "text", md: "Once every production overhead sits inside a production centre, we need a rate to charge it onto units. That rate is the **overhead absorption rate (OAR)**, and here is the twist that trips people up: it is set **before the year begins**, using **budgeted** figures. We cannot wait until year-end to know the true overhead and hours, because we must cost and price jobs as we go. So we predetermine the rate." },
        { kind: "formula", name: "Overhead absorption rate", expr: "OAR = Budgeted overhead / Budgeted activity", note: "Activity is usually budgeted labour hours or machine hours — never the actual figures. The rate is fixed in advance." },
        { kind: "example", title: "Worked example — setting the OAR and finding the (mis)absorption", scenario: "The machining centre budgets overheads of $240,000 and 30,000 labour hours for the year. In the event, it actually incurs $250,000 of overhead and works 32,000 labour hours. Find the OAR, the overhead absorbed, and the under- or over-absorption.", steps: [
          { label: "Set the OAR (budget ÷ budget)", detail: "OAR = $240,000 / 30,000 hours = $8.00 per labour hour. This is now locked for the whole year." },
          { label: "Absorb using the OAR × actual hours", detail: "Overhead absorbed = 32,000 actual hours × $8.00 = $256,000. Note we use ACTUAL hours but the PREDETERMINED rate." },
          { label: "Compare absorbed with actual", detail: "Under/over = absorbed − actual = $256,000 − $250,000 = +$6,000." },
          { label: "Name the direction", detail: "Absorbed exceeds actual, so overhead is OVER-absorbed by $6,000 — the units were charged more overhead than the centre actually spent." },
        ], result: "OAR = $8/hour; $256,000 absorbed against $250,000 incurred → $6,000 over-absorbed. Over-absorption is a credit in profit or loss: it ADDS $6,000 back to profit, because the product costs were overstated during the year." },
        { kind: "callout", tone: "rule", title: "The sign rule", md: "**Under/over-absorption = overhead absorbed − actual overhead.** A **positive** answer is **over**-absorbed (too much was charged to units → add to profit). A **negative** answer is **under**-absorbed (too little was charged → deduct from profit)." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Production overhead account",
          caption: "Actual overhead is debited in; absorbed overhead is credited out to work-in-progress. The gap is the over-absorption cleared to P/L.",
          data: {
            name: "Production overhead",
            debits: [
              { label: "Overhead incurred (actual)", amount: 250000 },
              { label: "Over-absorption to P/L", amount: 6000 },
            ],
            credits: [
              { label: "Absorbed to WIP (32,000 hrs x $8)", amount: 256000 },
            ],
          },
        } },
        { kind: "text", md: "Two forces drive a mis-absorption, and they can point in the same or opposite directions: the **overhead** turning out different from budget, and the **activity** (hours) turning out different from budget. Here activity ran 2,000 hours above budget, which pulled $16,000 of extra overhead onto units, while actual spend was only $10,000 above budget — the net effect is the $6,000 over-absorption." },
      ],
      check: {
        q: "A machine centre's OAR is $6 per machine hour. It actually incurs $145,000 of overhead and runs 24,000 machine hours. What is the under- or over-absorption?",
        options: [
          "$1,000 under-absorbed",
          "$1,000 over-absorbed",
          "$6,000 under-absorbed",
          "$145,000 over-absorbed",
        ],
        correct: 0,
        explain: "Absorbed = 24,000 hours × $6 = $144,000. Under/over = absorbed − actual = $144,000 − $145,000 = −$1,000. The answer is negative, so overhead is UNDER-absorbed by $1,000 — the units were charged $1,000 less than the centre actually spent, so profit must be reduced by $1,000.",
      },
    },
    {
      id: "marginal",
      heading: "Marginal costing — the contribution view",
      blocks: [
        { kind: "text", md: "**Marginal costing** refuses to share fixed overheads across units at all. Its logic: fixed costs (rent, salaries) are incurred to keep the doors open for the **period**, not to make any particular unit, so they should be charged as a lump against the period — never buried inside a product's cost or inside inventory. Only **variable** costs — the ones that rise and fall with each extra unit — attach to the product." },
        { kind: "formula", name: "Contribution", expr: "Contribution = Sales − All variable costs", note: "Each unit's contribution first covers fixed costs; once they are covered, every further unit's contribution is profit." },
        { kind: "text", md: "**Contribution** is the star of marginal costing: sales less all variable costs. It is what each sale **contributes** first towards the pool of fixed costs and then, once that pool is full, towards profit. So a marginal-costing profit statement reads: sales, less variable cost of sales, gives **contribution**; then a single deduction of the **whole period's** fixed costs gives profit." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Marginal vs absorption costing",
          data: {
            leftTitle: "Marginal costing",
            rightTitle: "Absorption costing",
            rows: [
              { aspect: "Fixed production overhead", left: "Period cost — charged in full", right: "Product cost — absorbed into units" },
              { aspect: "Cost per unit", left: "Variable cost only", right: "Variable + fixed OAR" },
              { aspect: "Inventory valued at", left: "Variable production cost", right: "Full production cost" },
              { aspect: "Key subtotal", left: "Contribution", right: "Gross profit" },
              { aspect: "Under/over-absorption", left: "Never arises", right: "Arises when activity differs from budget" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "The single dividing line is the **fixed production overhead**. Under marginal costing it hits profit in full every period; under absorption costing it is parcelled into each unit at the **fixed OAR** and rides in and out of inventory. Everything else follows from that one difference." },
      ],
    },
    {
      id: "reconcile",
      heading: "Why the two profits differ — and reconciling them",
      blocks: [
        { kind: "text", md: "Because absorption costing tucks fixed overhead **inside** inventory, the two methods report **different profits** whenever the inventory level moves. If inventory **rises** over the period, absorption costing carries some of this period's fixed overhead forward inside closing inventory (deferring it to next period), so absorption profit is **higher**. If inventory **falls**, fixed overhead held in opening inventory is released into this period's cost, so absorption profit is **lower**. If inventory is unchanged, the two profits are **equal**." },
        { kind: "formula", name: "Profit difference", expr: "Absorption profit − Marginal profit = Change in inventory units × Fixed OAR", note: "Only the FIXED overhead per unit matters — variable costs are treated identically by both methods." },
        { kind: "example", title: "Worked example — both statements, then the reconciliation", scenario: "A firm sells its product for $50. Variable production cost is $25 per unit (materials $12, labour $10, variable overhead $3). Budgeted fixed production overhead is $200,000 and budgeted production is 20,000 units. This period it produced 20,000 units and sold 18,000, leaving 2,000 units in closing inventory (opening inventory was nil). Prepare profit under both methods and reconcile.", steps: [
          { label: "Fixed OAR", detail: "$200,000 / 20,000 units = $10.00 fixed overhead per unit. Full absorption cost per unit = $25 variable + $10 fixed = $35." },
          { label: "Marginal profit", detail: "Sales 18,000 × $50 = $900,000. Variable cost of sales 18,000 × $25 = $450,000. Contribution = $450,000. Less fixed overhead $200,000 (all of it). Marginal profit = $250,000." },
          { label: "Absorption profit", detail: "Cost of production 20,000 × $35 = $700,000; less closing inventory 2,000 × $35 = $70,000; cost of sales = $630,000. Gross profit = $900,000 − $630,000 = $270,000. Absorbed fixed overhead = 20,000 × $10 = $200,000 = actual, so there is no under/over-absorption. Absorption profit = $270,000." },
          { label: "Reconcile", detail: "Inventory rose by 2,000 units. Difference = 2,000 × $10 fixed OAR = $20,000. Absorption $270,000 − marginal $250,000 = $20,000. ✓" },
        ], result: "Marginal profit $250,000; absorption profit $270,000. Absorption is $20,000 higher because 2,000 units of closing inventory each carry $10 of fixed overhead ($20,000) forward into next period instead of charging it now." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Bridging marginal profit to absorption profit",
          caption: "Inventory rose 2,000 units; each defers $10 of fixed overhead, so absorption profit is $20,000 higher.",
          data: {
            unit: "$",
            items: [
              { label: "Marginal costing profit", value: 250000, kind: "start" },
              { label: "Fixed o/h in closing inventory (2,000 x $10)", value: 20000, kind: "delta" },
              { label: "Absorption costing profit", value: 270000, kind: "total" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Direction matters", md: "Inventory **up** → absorption profit **higher**. Inventory **down** → absorption profit **lower**. Multiply the change in **units** by the **fixed** OAR only — using the full cost per unit or the variable cost is the classic reconciliation error." },
      ],
      check: {
        q: "In a period, production was 20,000 units and sales were 22,000 units, so inventory fell by 2,000 units. The fixed OAR is $10 per unit. Which profit is higher, and by how much?",
        options: [
          "Absorption profit is higher by $20,000",
          "Marginal profit is higher by $20,000",
          "The two profits are equal",
          "Marginal profit is higher by $2,000",
        ],
        correct: 1,
        explain: "Inventory FELL by 2,000 units, so fixed overhead held in opening inventory is released into this period's cost under absorption costing, dragging absorption profit down. Difference = 2,000 units × $10 = $20,000, and marginal profit is the higher of the two whenever inventory falls.",
      },
    },
    {
      id: "abc",
      heading: "Activity-based costing — a smarter absorption",
      blocks: [
        { kind: "text", md: "Traditional absorption costing usually absorbs **all** overhead on one volume measure — labour or machine hours. That was fine when overhead was mostly volume-driven. But in a modern factory, huge costs come from **activities** that have little to do with volume: setting up machines, processing purchase orders, inspecting quality. A low-volume, fussy product can trigger just as many set-ups as a high-volume one, yet a single hours-based rate would under-charge it and over-charge the simple high-volume line." },
        { kind: "text", md: "**Activity-based costing (ABC)** fixes this by grouping overhead into **cost pools** — one per major activity — and charging each pool to products using a **cost driver**, the factor that actually causes that activity's cost. The set-up pool is driven by the **number of set-ups**; the ordering pool by the **number of orders**; the inspection pool by the **number of inspections**. A product picks up cost in proportion to the activities it genuinely consumes." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The four steps of ABC",
          data: {
            items: [
              { title: "1. Identify activities", sub: "set-ups, ordering, inspection, handling" },
              { title: "2. Pool the costs", sub: "gather each activity's overhead into a cost pool" },
              { title: "3. Pick the driver", sub: "the factor that causes each pool's cost" },
              { title: "4. Charge products", sub: "cost per driver × drivers each product consumes" },
            ],
          },
        } },
        { kind: "text", md: "Worked mini-calc: the set-up cost pool is **$80,000** and there are **400** set-ups in the period, so the cost per set-up = $80,000 / 400 = **$200**. A product needing **30** set-ups absorbs 30 × $200 = **$6,000** of set-up overhead — regardless of how many units it makes. ABC does not create new overhead; it shares the **same** overhead more accurately, so complex low-volume products stop hiding behind simple ones." },
        { kind: "callout", tone: "key", title: "Pool and driver", md: "A **cost pool** is the overhead of one activity gathered together; a **cost driver** is what causes that cost. Get the driver right and ABC charges each product for the demands it really places on the business." },
      ],
    },
    {
      id: "specific",
      heading: "Costing by type of operation — job, batch, process, service",
      blocks: [
        { kind: "text", md: "The technique you use depends on **what is being made**. **Job costing** suits one-off, custom work (a bespoke machine, an audit) — each job is a separate cost unit with its own materials, labour and absorbed overhead. **Batch costing** is job costing for a group made together (a run of 500 identical shirts): total the batch cost, then divide by the number of good units for a cost per unit. **Process costing** suits continuous, identical output (litres of paint, tonnes of sugar) where you cannot point at one unit, so you average total process cost over total output." },
        { kind: "text", md: "Process costing has two wrinkles the exam loves. The first is **losses**. **Normal loss** is the unavoidable wastage expected in the process (evaporation, offcuts); it is not given a cost — any scrap proceeds reduce the cost of good output. **Abnormal loss** is loss **above** the normal level; it is costed just like good output and written off to profit or loss, so bad performance is not hidden inside inventory. (An abnormal **gain** — losing less than expected — works in reverse.)" },
        { kind: "text", md: "The second wrinkle is **equivalent units**. At period-end some units are only part-finished (**work-in-progress**), and you cannot average a half-made unit against a finished one. So you convert partly-complete work into **equivalent whole units**: 2,000 units that are 50% complete for conversion count as 1,000 equivalent units of conversion work. Crucially, materials and conversion (labour + overhead) are usually at **different** stages of completion, so each gets its **own** equivalent-unit total and its own cost per unit." },
        { kind: "example", title: "Worked example — equivalent units and cost per unit", scenario: "In a process, 8,000 units were completed and transferred out this period. Closing work-in-progress is 2,000 units, which are 100% complete for materials but only 50% complete for conversion. There was no opening WIP. Costs incurred: materials $50,000 and conversion $36,000. Value the completed units and the closing WIP.", steps: [
          { label: "Equivalent units — materials", detail: "Completed 8,000 (100%) + closing WIP 2,000 × 100% = 8,000 + 2,000 = 10,000 equivalent units." },
          { label: "Equivalent units — conversion", detail: "Completed 8,000 (100%) + closing WIP 2,000 × 50% = 8,000 + 1,000 = 9,000 equivalent units." },
          { label: "Cost per equivalent unit", detail: "Materials $50,000 / 10,000 = $5.00. Conversion $36,000 / 9,000 = $4.00. Full cost of a completed unit = $5.00 + $4.00 = $9.00." },
          { label: "Value the output", detail: "Completed 8,000 × $9.00 = $72,000. Closing WIP = materials 2,000 × $5.00 = $10,000 + conversion 1,000 × $4.00 = $4,000 = $14,000." },
        ], result: "Completed units $72,000 + closing WIP $14,000 = $86,000, which equals the $50,000 + $36,000 of cost put in — the process account balances. Splitting materials from conversion is what makes the numbers add up." },
        { kind: "text", md: "**Service costing** applies where there is no physical product at all — a hospital, a hotel, a transport firm. Because you cannot count identical units, service costing builds a **composite cost unit** that captures the two drivers of cost at once: cost per **patient-day**, per **passenger-mile**, per **occupied room-night**. Total cost divided by the number of composite units gives a figure you can track and compare over time." },
      ],
      check: {
        q: "Closing WIP is 2,000 units that are 100% complete for materials and 25% complete for conversion. How many equivalent units of CONVERSION does the closing WIP represent?",
        options: [
          "2,000 equivalent units",
          "500 equivalent units",
          "2,500 equivalent units",
          "1,000 equivalent units",
        ],
        correct: 1,
        explain: "Equivalent units of conversion = physical units × their percentage completion for conversion = 2,000 × 25% = 500. The 100% materials completion is irrelevant to the conversion total — each cost element is converted using its own completion percentage.",
      },
    },
  ],
  examTraps: [
    { trap: "Using actual overhead and actual hours to compute the OAR.", fix: "The OAR is predetermined: budgeted overhead ÷ budgeted activity. Actual figures are only used later, to work out the amount absorbed and the under/over." },
    { trap: "Getting under/over-absorption the wrong way round.", fix: "Under/over = absorbed − actual. Positive = over-absorbed (add to profit); negative = under-absorbed (deduct from profit). Absorbed uses the OAR × ACTUAL hours." },
    { trap: "Putting fixed overhead into unit cost or inventory under marginal costing.", fix: "Marginal costing charges all fixed overhead to the period. Only variable cost attaches to units and to inventory." },
    { trap: "Reconciling the two profits with the full cost per unit or the variable cost.", fix: "The profit difference is change in inventory units × FIXED OAR only. Inventory up → absorption higher; inventory down → absorption lower." },
    { trap: "Averaging part-finished units against finished ones in process costing.", fix: "Convert WIP to equivalent units first, and give materials and conversion their own completion percentages and their own cost per unit." },
  ],
  keyTerms: [
    { term: "Overhead absorption rate (OAR)", def: "A predetermined rate, budgeted overhead ÷ budgeted activity, used to charge production overhead onto units." },
    { term: "Apportionment", def: "Splitting one shared overhead across several cost centres on a fair basis, such as floor area or machine value — distinct from allocation, which charges a whole cost to one centre." },
    { term: "Under-/over-absorption", def: "The gap between overhead absorbed (OAR × actual activity) and actual overhead; over-absorbed adds to profit, under-absorbed reduces it." },
    { term: "Contribution", def: "Sales less all variable costs — what each sale contributes first to fixed costs and then to profit under marginal costing." },
    { term: "Cost driver", def: "In ABC, the factor that causes an activity's cost (e.g. number of set-ups), used to charge that cost pool to products." },
    { term: "Equivalent units", def: "Part-finished units restated as finished-unit equivalents by their percentage completion, calculated separately for materials and conversion." },
  ],
  summary: [
    "Absorption costing shares overheads out by allocate → apportion → reapportion → absorb; marginal costing charges all fixed overhead to the period instead.",
    "OAR = budgeted overhead ÷ budgeted activity; under/over-absorption = absorbed (OAR × actual activity) − actual overhead.",
    "Marginal costing gives contribution (sales − variable costs); absorption costing gives gross profit and values inventory at full cost.",
    "Absorption profit − marginal profit = change in inventory units × fixed OAR: inventory up → absorption higher, inventory down → absorption lower.",
    "ABC pools overhead by activity and charges it via cost drivers; job/batch/process/service costing each suit a different kind of output, with equivalent units and normal/abnormal loss governing process costing.",
  ],
}
