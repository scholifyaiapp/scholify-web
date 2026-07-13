import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area A — Specialist cost & management accounting techniques.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Matches the FA_A
 * exemplar for depth, tone and visual mix. Every calculation re-solved.
 */

export const PM_A: StudyChapter = {
  paper: "PM",
  area: "A",
  title: "Specialist cost & management accounting techniques",
  minutes: 17,
  intro: "A single blanket overhead rate was fine when factories were mostly direct labour. Modern businesses run on machines, short runs and complex products — so PM opens with five sharper tools that cost, price and prioritise better.",
  outcomes: [
    "Explain why volume-based absorption distorts modern product costs, and cost a product with activity-based costing",
    "Derive a target cost from a market price and required margin, and quantify the cost gap",
    "Apply lifecycle costing to see the whole cost of a product, not just the production phase",
    "Use throughput accounting and the theory of constraints to rank products by the bottleneck",
    "Calculate and interpret the throughput accounting ratio (TPAR)",
    "Describe environmental management accounting and why hidden environmental costs matter",
  ],
  sections: [
    {
      id: "why",
      heading: "Why one overhead rate is no longer enough",
      blocks: [
        { kind: "text", md: "Traditional **absorption costing** spreads all production overhead across products using a single volume-based rate — usually labour hours or machine hours. That worked when overheads were small and driven by how long a product sat on the line. Today overheads are large and driven by **complexity**: setups, inspections, order handling, design changes. A low-volume, fussy product can consume those activities out of all proportion to its labour hours — yet a blanket rate charges it the same per hour as a simple, high-volume product." },
        { kind: "text", md: "The result is **cross-subsidy**: the simple product looks dearer than it is and the complex one looks cheaper than it is. Prices are set on wrong costs, loss-making lines survive and profitable lines get dropped. The techniques in this area all attack that problem from different angles — better cost tracing (**ABC**), designing to a price (**target costing**), costing the whole life (**lifecycle costing**), managing the constraint (**throughput accounting**) and pricing in the environment (**EMA**)." },
        { kind: "callout", tone: "key", title: "The one idea", md: "Overheads are caused by **activities**, not by volume. Cost systems that ignore that will over-cost simple products and under-cost complex ones — and every downstream decision inherits the error." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Five specialist techniques — and the question each answers",
          data: {
            items: [
              { title: "Activity-based costing", sub: "What does this product REALLY cost to make?" },
              { title: "Target costing", sub: "What must it cost, given the price the market will pay?" },
              { title: "Lifecycle costing", sub: "What does it cost across its whole life, not just production?" },
              { title: "Throughput accounting", sub: "Which product should the bottleneck make first?" },
              { title: "Environmental management accounting", sub: "What do our environmental costs really add up to?" },
            ],
          },
        } },
      ],
    },
    {
      id: "abc",
      heading: "Activity-based costing (ABC)",
      blocks: [
        { kind: "text", md: "ABC replaces the single blanket rate with **many** rates — one per activity. It collects overhead into **cost pools** (one per major activity, such as machine setups or order handling), finds the **cost driver** that actually causes each pool to grow, and charges products by how much of each driver they use. A product that triggers lots of setups is charged for lots of setups, full stop." },
        { kind: "callout", tone: "rule", title: "Cost pool vs cost driver", md: "A **cost pool** is the total cost of one activity (e.g. all setup costs). A **cost driver** is the factor that causes that cost to change (e.g. the number of setups). One pool, one driver, one rate." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The five steps of ABC",
          caption: "From identifying activities to a cost per unit.",
          data: {
            steps: [
              { label: "Identify activities", sub: "e.g. setups, machining, order handling" },
              { label: "Pool the costs", sub: "gather each activity's overhead" },
              { label: "Choose the driver", sub: "what makes the pool grow?" },
              { label: "Driver rate", sub: "pool cost / total driver volume" },
              { label: "Absorb to products", sub: "rate x driver usage per product" },
            ],
          },
        } },
        { kind: "formula", name: "Cost driver rate", expr: "Cost driver rate = Activity cost pool / Total volume of the cost driver", note: "One rate per activity — not one rate for the whole factory." },
        { kind: "formula", name: "Overhead per unit (ABC)", expr: "Overhead per unit = Sum of (driver rate x driver units used) / Units produced" },
        { kind: "text", md: "Contrast this with the traditional rate, which uses a **single** volume base for **all** overhead:" },
        { kind: "formula", name: "Overhead absorption rate (traditional)", expr: "OAR = Total production overhead / Total labour (or machine) hours" },
        { kind: "example", title: "Worked example — ABC vs absorption", scenario: "A factory makes two products. **Standard** (high volume): 10,000 units, 0.5 labour hours and 2 machine hours each, uses 10 setups and 20 orders. **Deluxe** (low volume, fiddly): 5,000 units, 0.5 labour hours and 2 machine hours each, but uses 40 setups and 60 orders. Total production overhead of $300,000 splits into three pools: setup costs $90,000 (driver: number of setups), machining $150,000 (driver: machine hours), order handling $60,000 (driver: number of orders). Compare the overhead cost per unit under traditional labour-hour absorption and under ABC.", steps: [
          { label: "Traditional OAR", detail: "Labour hours: Standard 10,000 x 0.5 = 5,000; Deluxe 5,000 x 0.5 = 2,500; total 7,500 hours. OAR = 300,000 / 7,500 = **$40 per labour hour**." },
          { label: "Traditional per unit", detail: "Each product uses 0.5 labour hours, so each is charged 40 x 0.5 = **$20 per unit** — identical, regardless of complexity." },
          { label: "ABC — setup rate", detail: "Total setups = 10 + 40 = 50. Rate = 90,000 / 50 = **$1,800 per setup**." },
          { label: "ABC — machining rate", detail: "Machine hours: Standard 10,000 x 2 = 20,000; Deluxe 5,000 x 2 = 10,000; total 30,000. Rate = 150,000 / 30,000 = **$5 per machine hour**." },
          { label: "ABC — order rate", detail: "Total orders = 20 + 60 = 80. Rate = 60,000 / 80 = **$750 per order**." },
          { label: "ABC — Standard per unit", detail: "Setups 10 x 1,800 = 18,000; machining 20,000 x 5 = 100,000; orders 20 x 750 = 15,000. Total 133,000 / 10,000 units = **$13.30 per unit**." },
          { label: "ABC — Deluxe per unit", detail: "Setups 40 x 1,800 = 72,000; machining 10,000 x 5 = 50,000; orders 60 x 750 = 45,000. Total 167,000 / 5,000 units = **$33.40 per unit**." },
        ], result: "Absorption charged both products $20. ABC reveals the truth: Standard costs only $13.30, Deluxe costs $33.40. The high-volume Standard was subsidising the low-volume, setup-hungry Deluxe by $6.70 a unit. Note the pools still add to $133,000 + $167,000 = $300,000 — ABC redistributes the same total, it does not change it." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Traditional absorption vs ABC",
          caption: "Same total overhead, very different per-unit answers.",
          data: {
            leftTitle: "Absorption costing",
            rightTitle: "Activity-based costing",
            rows: [
              { aspect: "Overhead base", left: "One volume rate (labour hrs)", right: "One rate per activity" },
              { aspect: "What drives cost", left: "Assumed: volume", right: "Identified: the real driver" },
              { aspect: "Standard per unit", left: "$20.00", right: "$13.30" },
              { aspect: "Deluxe per unit", left: "$20.00", right: "$33.40" },
              { aspect: "Best for", left: "Simple, uniform products", right: "Diverse, complex product mix" },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Overhead per unit — absorption vs ABC",
          caption: "The Deluxe product's true cost is 67% higher than absorption suggested.",
          data: {
            unit: "$/unit",
            items: [
              { label: "Standard (absorption)", value: 20 },
              { label: "Standard (ABC)", value: 13.3 },
              { label: "Deluxe (absorption)", value: 20 },
              { label: "Deluxe (ABC)", value: 33.4 },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "ABC's power is **decision** information, not just tidier costs. If Deluxe is priced on a $20 cost but actually costs $33.40, every unit sold at a $20-based margin may be losing money. ABC lets you re-price, redesign, or reconsider the line." },
      ],
      check: {
        q: "Under ABC, the setup cost pool is $90,000 and there are 50 setups in total. The Deluxe product triggers 40 of them across 5,000 units. What is the setup cost per Deluxe unit?",
        options: [
          "$1,800.00",
          "$18.00",
          "$14.40",
          "$7.20",
        ],
        correct: 2,
        explain: "Setup driver rate = 90,000 / 50 = $1,800 per setup. Deluxe absorbs 40 x 1,800 = $72,000, spread over 5,000 units = 72,000 / 5,000 = $14.40 per unit. $1,800 is the rate per setup (not per unit); $18.00 would come from misallocating; $7.20 halves the answer wrongly.",
      },
    },
    {
      id: "target",
      heading: "Target costing — designing to a price",
      blocks: [
        { kind: "text", md: "Traditional costing works **cost-first**: build the product, add up the cost, add a margin, arrive at a price. Target costing flips this. In a competitive market the **price is given** — customers and rivals set it. So you start from the price the market will pay, subtract the profit you require, and the answer is the **most you are allowed to spend** making it: the target cost. Then you engineer the product down to that cost." },
        { kind: "formula", name: "Target cost", expr: "Target cost = Target selling price - Required (target) profit margin" },
        { kind: "formula", name: "Cost gap", expr: "Cost gap = Estimated (current) cost - Target cost", note: "The gap is the cost that must be designed out before launch." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "From market price to target cost",
          caption: "Price is the starting point, not the finish line.",
          data: {
            unit: "$/unit",
            items: [
              { label: "Target selling price", value: 50, kind: "start" },
              { label: "Less required margin (30%)", value: -15, kind: "delta" },
              { label: "Target cost", value: 35, kind: "total" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — the cost gap", scenario: "Market research shows a new gadget must sell at **$50** to win share. The company requires a margin of **30% of the selling price**. Its current design and process are estimated to cost **$42 per unit**. Find the target cost and the cost gap.", steps: [
          { label: "Required profit", detail: "30% of the $50 price = 0.30 x 50 = **$15 per unit**." },
          { label: "Target cost", detail: "Target price - required profit = 50 - 15 = **$35 per unit**." },
          { label: "Compare to current cost", detail: "Estimated cost today is $42, which is above the $35 ceiling." },
          { label: "Cost gap", detail: "Cost gap = current cost - target cost = 42 - 35 = **$7 per unit**." },
        ], result: "There is a $7 cost gap. The product cannot launch profitably at $50 until $7 of cost per unit is engineered out — through cheaper materials, design simplification, fewer components, or process improvement. Target costing forces that work to happen **before** production, when 80%+ of cost is still designable." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Closing the cost gap",
          caption: "Current cost must fall to the target ceiling.",
          data: {
            unit: "$/unit",
            items: [
              { label: "Current cost", value: 42 },
              { label: "Cost gap", value: 7 },
              { label: "Target cost", value: 35 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Don't invert the formula", md: "Target cost is derived from the **price and the margin**, never from the current cost. A common error is to call the current cost the target — but the whole point is that the current cost is usually too high, and the gap is what you must close." },
      ],
      check: {
        q: "A product will sell for $80. The company needs a margin of 25% of the selling price. Current estimated cost is $68. What is the cost gap?",
        options: [
          "$8",
          "$12",
          "$20",
          "$0 — there is no gap",
        ],
        correct: 0,
        explain: "Required profit = 25% x 80 = $20, so target cost = 80 - 20 = $60. Cost gap = current cost - target cost = 68 - 60 = $8. $12 wrongly uses 80 - 68; $20 is the required profit, not the gap.",
      },
    },
    {
      id: "lifecycle",
      heading: "Lifecycle costing — the whole life, not just production",
      blocks: [
        { kind: "text", md: "Conventional costing looks only at the **production** phase. Lifecycle costing tracks **all** costs a product causes, from the first design sketch to the final decommissioning — research and development, design, testing, marketing, distribution, customer service and end-of-life disposal. Many of these are incurred **before** a single unit is sold, and a large share of them are **committed** (locked in) at the design stage, long before they are actually spent." },
        { kind: "formula", name: "Lifecycle cost per unit", expr: "Lifecycle cost per unit = Total costs over the whole life / Total units over the whole life" },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The product lifecycle",
          caption: "Costs are committed early, but spread across every phase.",
          data: {
            steps: [
              { label: "Development", sub: "R&D, design, testing" },
              { label: "Introduction", sub: "launch & marketing" },
              { label: "Growth", sub: "scaling production" },
              { label: "Maturity", sub: "peak sales, cost focus" },
              { label: "Decline", sub: "run-down & disposal" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — true cost per unit", scenario: "A product is expected to sell 40,000 units over its life. Costs across the whole life: design and development $600,000, production $1,800,000, marketing $200,000, customer service and disposal $200,000. What is the lifecycle cost per unit, and how does it compare with the production-only cost?", steps: [
          { label: "Total lifecycle cost", detail: "600,000 + 1,800,000 + 200,000 + 200,000 = **$2,800,000**." },
          { label: "Lifecycle cost per unit", detail: "2,800,000 / 40,000 = **$70 per unit**." },
          { label: "Production-only cost per unit", detail: "1,800,000 / 40,000 = **$45 per unit**." },
        ], result: "Judged on production cost alone the product looks like it costs $45; over its whole life it costs $70 — 56% more. Pricing on the $45 figure could set a price that never recovers the $1,000,000 of non-production costs. Lifecycle costing keeps those in view from day one." },
        { kind: "callout", tone: "key", title: "Why it links to target costing", md: "Because most cost is **committed at the design stage**, the cheapest place to close a cost gap is on the drawing board. Lifecycle costing and target costing are partners: design the product once, cheaply and completely, before commitments harden." },
      ],
    },
    {
      id: "throughput",
      heading: "Throughput accounting & the theory of constraints",
      blocks: [
        { kind: "text", md: "The **theory of constraints (TOC)** says every system has one **bottleneck** — the single resource that limits output. Making anything faster than the bottleneck just piles up inventory in front of it; only speeding up the bottleneck itself raises total output. Throughput accounting turns that insight into numbers." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The five focusing steps of TOC",
          caption: "Manage the constraint, then repeat.",
          data: {
            steps: [
              { label: "Identify", sub: "find the bottleneck" },
              { label: "Exploit", sub: "get the most from it" },
              { label: "Subordinate", sub: "pace everything else to it" },
              { label: "Elevate", sub: "add capacity to it" },
              { label: "Repeat", sub: "the constraint has moved" },
            ],
          },
        } },
        { kind: "text", md: "Throughput accounting treats only **materials** as truly variable. Everything else — labour, overhead — is a fixed **operating expense** in the short run (you pay the workforce whether or not the bottleneck is busy). So profit is driven by **throughput**: the rate at which the business turns materials into sales." },
        { kind: "formula", name: "Throughput per unit", expr: "Throughput = Selling price per unit - Direct material cost per unit", note: "Labour and overheads are NOT deducted here — they are fixed operating expenses." },
        { kind: "formula", name: "Return per bottleneck hour", expr: "Return per bottleneck hour = Throughput per unit / Bottleneck hours per unit" },
        { kind: "formula", name: "Cost per bottleneck hour", expr: "Cost per bottleneck hour = Total factory operating expenses / Total bottleneck hours available" },
        { kind: "formula", name: "Throughput accounting ratio (TPAR)", expr: "TPAR = Return per bottleneck hour / Cost per bottleneck hour", note: "TPAR > 1 = the product earns throughput faster than it incurs cost (viable). TPAR < 1 = it loses money on the constraint." },
        { kind: "example", title: "Worked example — a TPAR calculation", scenario: "Product Z sells for **$85** and uses **$25** of materials. The bottleneck is a machine; Z needs **0.5 hours** of it per unit. The factory has **10,000** bottleneck hours available per period, and total factory operating expenses (all labour and overhead) are **$900,000** per period. Calculate Z's throughput, its return per bottleneck hour, the cost per bottleneck hour, and the TPAR.", steps: [
          { label: "Throughput per unit", detail: "Selling price - materials = 85 - 25 = **$60 per unit**." },
          { label: "Return per bottleneck hour", detail: "Throughput / bottleneck hours per unit = 60 / 0.5 = **$120 per hour**." },
          { label: "Cost per bottleneck hour", detail: "Total factory cost / total bottleneck hours = 900,000 / 10,000 = **$90 per hour**." },
          { label: "TPAR", detail: "Return per hour / cost per hour = 120 / 90 = **1.33**." },
        ], result: "The TPAR of 1.33 is above 1, so on the bottleneck Product Z earns $1.33 of throughput for every $1 of factory cost it consumes — it is worth making. If two products competed for the same machine, you would rank them by **return per bottleneck hour**, giving the constraint's time to the highest earner first." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Ranking products by return per bottleneck hour",
          caption: "The bottleneck should make the highest earner per hour first.",
          data: {
            unit: "$/bottleneck hour",
            items: [
              { label: "Product X", value: 150 },
              { label: "Product Z", value: 120 },
              { label: "Product Y", value: 90 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Rank by the hour, not the unit", md: "The product with the biggest throughput **per unit** is not always best — what matters is throughput **per bottleneck hour**. A high-throughput product that hogs the constraint can earn less per scarce hour than a modest product that flies through it." },
      ],
      check: {
        q: "A product has a throughput of $48 per unit and needs 0.4 bottleneck hours per unit. The factory cost per bottleneck hour is $100. What is its TPAR?",
        options: [
          "0.48",
          "1.00",
          "1.20",
          "4.80",
        ],
        correct: 2,
        explain: "Return per bottleneck hour = throughput / hours per unit = 48 / 0.4 = $120. TPAR = return per hour / cost per hour = 120 / 100 = 1.20. Above 1, so the product is viable. 0.48 forgets to divide by the hours; 4.80 divides the wrong way round.",
      },
    },
    {
      id: "ema",
      heading: "Environmental management accounting (EMA)",
      blocks: [
        { kind: "text", md: "Environmental costs — energy, water, waste disposal, emissions permits, cleanup, regulatory fines — are often **buried** inside general overhead, so managers cannot see or manage them. **Environmental management accounting** pulls them out into the open so they can be measured, reduced and priced into decisions. Much of the environmental cost of a product, like its lifecycle cost, is committed at the design stage." },
        { kind: "table", caption: "Four categories of environmental cost (US EPA / UNDSD style)", head: ["Category", "Meaning", "Examples"], rows: [
          ["Conventional", "Costs already captured, but not flagged as environmental", "Energy, water, raw materials"],
          ["Potentially hidden", "Buried in general overhead", "Waste disposal, permits, monitoring, reporting"],
          ["Contingent", "May or may not arise in future", "Cleanup, remediation, fines and penalties"],
          ["Image & relationship", "Spent to maintain reputation", "Sustainability reports, community programmes"],
        ] },
        { kind: "text", md: "EMA borrows the tools already in this chapter. **Input/output flow analysis** traces materials in against products and waste out — what goes in must come out as product or as waste, and waste is money leaving the building. **ABC** can be pointed at environmental activities, giving them their own cost pools and drivers instead of hiding them in a blanket rate. **Lifecycle costing** captures disposal and decommissioning costs that conventional costing ignores." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Input/output flow analysis",
          caption: "Every kilogram bought leaves as product or as waste.",
          data: {
            steps: [
              { label: "Inputs", sub: "materials, energy, water" },
              { label: "Process", sub: "production" },
              { label: "Product output", sub: "what is sold" },
              { label: "Waste output", sub: "the cost of what is thrown away" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "In the exam, EMA answers usually come back to one line: **waste is not free.** Every unit of material that leaves as waste was paid for on the way in, handled while inside, and paid for again on the way out. Making waste visible is the first step to cutting it." },
      ],
    },
  ],
  examTraps: [
    { trap: "Using one blanket rate but calling it ABC.", fix: "ABC needs a separate cost pool and its own cost driver for each major activity. One volume-based rate is just traditional absorption." },
    { trap: "Thinking ABC changes total overhead.", fix: "ABC redistributes the same total overhead more accurately — it does not increase or reduce it. Your pools must still add back to the original total." },
    { trap: "Setting the target cost equal to the current cost.", fix: "Target cost = target selling price - required margin, derived from the market. The current cost is usually higher, and the difference is the cost gap to close." },
    { trap: "Deducting labour and overhead when finding throughput.", fix: "Throughput = sales - materials only. In throughput accounting all other costs are fixed factory operating expenses, deducted later, not per unit." },
    { trap: "Ranking products by throughput per unit instead of per bottleneck hour.", fix: "The constraint is scarce, so rank by return per BOTTLENECK HOUR. A high per-unit product that hogs the bottleneck can earn less per scarce hour." },
  ],
  keyTerms: [
    { term: "Cost pool", def: "The total overhead cost of a single activity (e.g. all machine-setup costs), gathered before it is charged to products." },
    { term: "Cost driver", def: "The factor that causes an activity's cost to change (e.g. number of setups) — used to charge the pool to products." },
    { term: "Cost gap", def: "The amount by which a product's current estimated cost exceeds its target cost; the cost that must be engineered out." },
    { term: "Throughput", def: "Sales revenue less direct material cost — the rate at which a business turns materials into sales; all other costs are treated as fixed." },
    { term: "TPAR", def: "Throughput accounting ratio: return per bottleneck hour divided by cost per bottleneck hour. Above 1 is viable; below 1 loses money on the constraint." },
  ],
  summary: [
    "ABC pools overhead by activity and charges it out on real cost drivers, correcting the cross-subsidy a single volume rate creates — but it redistributes the same total, it does not change it.",
    "Target costing starts from the market price, subtracts the required margin to get the target cost, and drives out the resulting cost gap before launch.",
    "Lifecycle costing captures every cost a product causes from design to disposal, so pricing recovers non-production costs too; most cost is committed at the design stage.",
    "The theory of constraints manages the bottleneck; throughput = sales - materials, and products are ranked by return per bottleneck hour, with TPAR = return per hour / cost per hour.",
    "Environmental management accounting drags hidden environmental costs out of general overhead so waste and emissions can be measured, priced and reduced.",
  ],
}
