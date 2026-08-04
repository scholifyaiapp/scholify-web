import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area B, second part — life-cycle costing and throughput accounting.
 * Chapters 7–8 of the PM reading tree, mapped to syllabus groups B3–B4.
 *
 * Throughput accounting is the chapter where candidates most often produce a correct
 * ratio and the wrong decision, because the ranking rule differs from limiting-factor
 * analysis (chapter 14) in one specific way: throughput ranks by return per BOTTLENECK
 * hour, and treats all factory cost other than materials as fixed. So the chapter builds
 * both ratios and then spends a full example on the decision they support.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 7 · B3 ───────────────────────────────────────────── */

export const PM_TREE_07: StudyChapter = {
  id: "PM-07",
  number: 7,
  paper: "PM",
  area: "B",
  title: "Life-cycle costing",
  minutes: 16,
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)"],
  intro:
    "A product that looks profitable in its third year may never repay what it cost to develop. Life-cycle costing measures the whole cost from drawing board to withdrawal, which is the only basis on which a product can honestly be called profitable.",
  outcomes: [
    "Identify the stages of a product's life cycle and the costs arising at each",
    "Calculate a life-cycle cost per unit",
    "Explain why most costs are committed at the design stage",
    "Explain the implications of life-cycle costing for pricing and for performance measurement",
    "Explain how the life cycle can be extended and what that is worth",
  ],
  sections: [
    {
      id: "stages-and-calculation",
      heading: "The stages, and the calculation",
      blocks: [
        {
          kind: "table",
          caption: "The life-cycle stages, and the costs each brings",
          head: ["Stage", "What happens", "Costs incurred"],
          rows: [
            ["**Development**", "Research, design, prototyping, testing, tooling", "**Large, entirely up front, and before any revenue.** Design decisions here commit most later cost"],
            ["**Introduction**", "Launch, initial marketing, low volume, high unit cost", "Heavy **marketing**, learning-curve inefficiency, possible early warranty"],
            ["**Growth**", "Volume rises, unit cost falls, competitors appear", "Capacity expansion; marketing continues but spread over more units"],
            ["**Maturity**", "Volume plateaus, price competition, the profitable period", "Lowest unit cost; cost control and incremental improvement"],
            ["**Decline**", "Volume and price fall, product withdrawn", "**Decommissioning**, disposal, final warranty and support obligations"],
          ],
        },
        {
          kind: "formula",
          name: "Life-cycle cost per unit",
          expr: "Life-cycle cost per unit  =  Total costs over the WHOLE life cycle  ÷  Total units produced over the WHOLE life cycle\n\nwhere total costs  =  development  +  production  +  marketing  +  distribution  +  warranty and support  +  decommissioning",
          note: "Both the numerator and the denominator run over the ENTIRE life. The commonest error is including development cost in the numerator but only one year's units in the denominator, which grossly overstates the cost. Note that non-production costs — marketing, warranty, decommissioning — belong in here even though conventional product costing excludes them.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why 80% of cost is committed before production starts",
          md: "This is the point life-cycle costing exists to make. Decisions taken at the **design stage** — how many components, whether they are standard or bespoke, what tolerances, what materials, how the product is assembled, how it is serviced — determine the great majority of every later cost: production, warranty, spares and disposal. Once the design is frozen those costs are **committed**, and the production department can only manage what it was handed. That is why cost reduction belongs with the designers, and why life-cycle costing and **target costing** (chapter 6) are two halves of the same argument.",
        },
        {
          kind: "example",
          title: "Computing a life-cycle cost per unit",
          scenario:
            "Alderway Ltd is appraising a product with a four-year life. Development cost £1,400,000, incurred before launch. Expected volumes: year 1 20,000 units, year 2 55,000, year 3 70,000, year 4 30,000. Variable production cost is £24 a unit in year 1, falling to £21 from year 2 as the learning effect works through. Fixed production overhead attributable to the product is £480,000 a year for all four years. Marketing is £600,000 in year 1, £350,000 in year 2 and £150,000 a year thereafter. Warranty is estimated at 2% of the £45 selling price on every unit sold, and decommissioning will cost £250,000 at the end.",
          steps: [
            { label: "Total the units over the whole life", detail: "20,000 + 55,000 + 70,000 + 30,000 = 175,000 units. This is the denominator, and using any single year's figure is the classic error." },
            { label: "Total the variable production cost", detail: "Year 1: 20,000 x £24 = £480,000. Years 2-4: (55,000 + 70,000 + 30,000) x £21 = 155,000 x £21 = £3,255,000. Total £3,735,000." },
            { label: "Total the fixed production overhead", detail: "£480,000 x 4 years = £1,920,000." },
            { label: "Total marketing, warranty and decommissioning", detail: "Marketing: £600,000 + £350,000 + £150,000 + £150,000 = £1,250,000. Warranty: 2% x £45 = £0.90 per unit x 175,000 = £157,500. Decommissioning £250,000." },
            { label: "Compute the life-cycle cost per unit", detail: "Development £1,400,000 + variable £3,735,000 + fixed £1,920,000 + marketing £1,250,000 + warranty £157,500 + decommissioning £250,000 = £8,712,500. Divided by 175,000 units = £49.79 per unit." },
            { label: "Say what it means, which is the point", detail: "The life-cycle cost of £49.79 EXCEEDS the £45 selling price, so over its whole life this product LOSES about £4.79 a unit — roughly £838,000. Conventional costing would show it comfortably profitable in years 2 and 3, when development is already sunk and marketing has fallen, which is exactly how a loss-making product survives an annual review." },
          ],
          result:
            "**£49.79 against a £45 price** — the product is not viable as designed. The figure only appears once development, marketing, warranty and decommissioning are spread across the **whole** 175,000 units, which is what annual profit reporting never does.",
        },
      ],
      check: {
        q: "A product costs £2m to develop and will sell 400,000 units over five years, 60,000 of them in year 1. What development cost per unit does life-cycle costing show?",
        options: ["£33.33", "£5.00", "£2,000,000 in year 1", "£400,000 a year"],
        correct: 1,
        explain:
          "£5.00 — £2,000,000 spread over the WHOLE life volume of 400,000 units. Dividing by year 1's 60,000 units gives £33.33 and grossly overstates it; the numerator and denominator must both run over the entire life cycle.",
      },
    },
    {
      id: "implications",
      heading: "What it changes, and extending the cycle",
      blocks: [
        {
          kind: "table",
          caption: "The implications management should draw",
          head: ["Area", "What life-cycle costing changes"],
          rows: [
            ["**Pricing**", "A price must recover the WHOLE life cost, not the current period's. It also justifies **penetration pricing** early — a low introductory price is rational if the life-cycle total is recovered"],
            ["**Product viability**", "A product can be profitable every year after development and still lose money over its life. Only the life-cycle figure answers the question"],
            ["**Design focus**", "Since most cost is committed at design, that is where reduction effort belongs — the link to target costing"],
            ["**Performance measurement**", "Judging a product or a manager on **annual** profit rewards launching products that never repay development, and punishes the year in which development is charged"],
            ["**Cost visibility**", "It brings marketing, warranty, support and decommissioning into product cost, where conventional costing leaves them as period overhead"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The performance measurement problem is the examinable one",
          md: "If a divisional manager is judged on annual profit, life-cycle costing creates a genuine conflict. Development spending **depresses this year's profit** and benefits a successor, so a manager on a short horizon is rewarded for **not** developing products — and for launching a product whose warranty and decommissioning costs will fall on somebody else. That is a classic short-termism problem (chapter 29), and the answers are the same: measure over a longer horizon, capitalise and match development against the product's life, or hold managers to non-financial measures as well as profit.",
        },
        {
          kind: "list",
          title: "Extending the life cycle, and what it is worth",
          items: [
            "**Find new markets** — sell the existing product to a different geography or segment.",
            "**Find new uses** for the product, which costs nothing in design.",
            "**Modify or upgrade** it, refreshing the specification to restart growth.",
            "**Change the packaging or presentation**, or reposition the brand.",
            "**Adjust price** to reach a more price-sensitive segment as the product matures.",
            "**Why it pays:** development cost is already sunk, so extra volume in an extended maturity carries only variable cost and a share of ongoing marketing. Every additional unit spreads the fixed and development cost further, so extending the cycle reduces life-cycle cost per unit directly — which is often the cheapest way to close the gap the calculation reveals.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "How this connects to the rest of Area B",
          md: "The three techniques so far answer different questions about the same product. **ABC** (chapter 5) asks *what does it cost us to make, accurately*. **Target costing** (chapter 6) asks *what are we allowed to spend, given the market price*. **Life-cycle costing** asks *over its whole life, does it pay*. They are complementary rather than competing, and a Section C requirement that asks you to advise on a new product may well want all three: an ABC cost, tested against a target cost, appraised over the life cycle.",
        },
      ],
      check: {
        q: "A divisional manager judged on annual profit is reluctant to fund development. Why, and what is the fix?",
        options: [
          "Development is not a real cost; explain the accounting to them",
          "Development depresses current-year profit while the benefit accrues later, so measure over a longer horizon or match development against the product's life",
          "Development should be excluded from divisional profit entirely",
          "The manager should be replaced",
        ],
        correct: 1,
        explain:
          "Development DEPRESSES CURRENT PROFIT while the benefit falls in later periods and to a successor — a short-termism problem. The fixes are a longer measurement horizon, matching development cost against the product's life, or adding non-financial measures alongside profit.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Dividing whole-life costs by one year's volume.",
      fix: "Numerator and denominator both run over the ENTIRE life cycle.",
    },
    {
      trap: "Omitting marketing, warranty or decommissioning from life-cycle cost.",
      fix: "They belong in it, even though conventional product costing treats them as period overhead.",
    },
    {
      trap: "Concluding a product is profitable from its mature-year results.",
      fix: "Development is sunk by then. Only the whole-life figure answers whether it pays.",
    },
    {
      trap: "Treating the design stage as just the start of the cycle.",
      fix: "It COMMITS most later cost, which is why cost reduction belongs there and not in production.",
    },
  ],
  keyTerms: [
    { term: "Life-cycle cost", def: "All costs from development to decommissioning, divided by whole-life volume." },
    { term: "Committed cost", def: "Cost fixed by an earlier decision, chiefly design, which later stages cannot change." },
    { term: "Decommissioning cost", def: "The cost of withdrawing a product — disposal, final support and warranty obligations." },
    { term: "Penetration pricing", def: "A low introductory price, rational under life-cycle costing if the whole-life cost is still recovered." },
    { term: "Life-cycle extension", def: "New markets, new uses, modification or repositioning, which spread sunk development over more units." },
  ],
  summary: [
    "The stages are development, introduction, growth, maturity and decline, each with its own costs.",
    "Life-cycle cost per unit divides whole-life costs by whole-life volume, including marketing, warranty and decommissioning.",
    "Most cost is committed at the design stage, which is why reduction effort belongs there.",
    "A product profitable in every mature year can still lose money over its life.",
    "Annual profit measurement discourages development, and extending the cycle spreads sunk cost over more units.",
  ],
  knowledgeDiagnostic: [
    { q: "What goes into life-cycle cost that conventional product costing leaves out?", a: "Development, marketing, distribution, warranty and support, and decommissioning — spread across whole-life volume." },
    { q: "Why is the design stage decisive?", a: "Because component count, materials, tolerances and assembly method commit most production, warranty, spares and disposal cost before production begins." },
    { q: "How does life-cycle costing justify penetration pricing?", a: "Because the test is recovery of whole-life cost, so a low introductory price is rational if the total is still recovered over the life." },
    { q: "Why does extending the life cycle reduce cost per unit?", a: "Development is already sunk, so additional units in an extended maturity carry only variable cost and spread the fixed and development cost further." },
  ],
}

/* ── Chapter 8 · B4 ───────────────────────────────────────────── */

export const PM_TREE_08: StudyChapter = {
  id: "PM-08",
  number: 8,
  paper: "PM",
  area: "B",
  title: "Throughput accounting",
  minutes: 18,
  syllabusRefs: ["B4(a)", "B4(b)", "B4(c)", "B4(d)"],
  intro:
    "Throughput accounting starts from one observation: a factory earns money only as fast as its slowest process allows. So it treats everything except materials as fixed, and ranks products by what they return per hour of the bottleneck.",
  outcomes: [
    "Explain the theory of constraints and identify a bottleneck",
    "Calculate throughput per unit and per bottleneck hour",
    "Calculate and interpret the throughput accounting ratio",
    "Rank products and determine an optimal mix using throughput",
    "Explain how a bottleneck should be managed, and the limitations of the approach",
  ],
  sections: [
    {
      id: "theory-and-ratios",
      heading: "The theory of constraints, and the two ratios",
      blocks: [
        {
          kind: "definition",
          term: "The theory of constraints",
          md: "Every system has at least one **constraint** — a process whose capacity is lower than the demand placed on it — and the output of the whole system is limited by that constraint alone. Improving anything else changes nothing. So the way to increase profit is to **identify the bottleneck, exploit it fully, and then elevate it**, at which point the constraint moves somewhere else and the process repeats.",
        },
        {
          kind: "formula",
          name: "Throughput and the throughput accounting ratio",
          expr: "Throughput per unit  =  Selling price  −  Direct MATERIAL cost\n\nThroughput per bottleneck hour  =  Throughput per unit  ÷  Bottleneck hours per unit\n\nCost per bottleneck hour  =  Total factory cost  ÷  Total bottleneck hours available\n\nThroughput accounting ratio (TPAR)  =  Throughput per bottleneck hour  ÷  Cost per bottleneck hour",
          note: "Note what throughput deducts: MATERIALS ONLY. Labour and all overhead are treated as FIXED \"total factory cost\", which is the assumption that distinguishes throughput from contribution. Total factory cost therefore INCLUDES labour — a very common omission that makes the TPAR look far better than it is.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "What the TPAR means, and the number to compare it with",
          md: "The TPAR compares the rate at which a product **earns** money through the bottleneck with the rate at which the factory **spends** it. So a **TPAR above 1** means the product earns faster than the factory spends, and is worth making. **Below 1** means it consumes bottleneck time worth more than it generates, and at that rate the factory loses money making it. The decision rules follow: rank by TPAR (or equivalently by throughput per bottleneck hour, since the denominator is common to every product), and for a product below 1 either raise its price, reduce its material cost, or reduce the bottleneck time it needs — or stop making it.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Throughput ranking is NOT contribution ranking",
          md: "Both rank by return per unit of the scarce resource, so they look alike, but they deduct different things. **Limiting factor analysis** (chapter 14) ranks by **contribution** per unit of scarce resource, treating labour and variable overhead as variable. **Throughput** ranks by **throughput** — price less materials only — treating labour and all overhead as fixed. Where labour differs materially between products the two can rank them in a **different order**, and the exam exploits that. Read which basis the question asks for; do not deduct labour from throughput out of habit.",
        },
        {
          kind: "example",
          title: "Ranking products and computing the TPAR",
          scenario:
            "Kettleby Ltd makes three products, all passing through a finishing process which has 6,000 hours available a month and is the bottleneck. Total factory cost, including all labour and overhead, is £540,000 a month. Per unit: Product X sells for £90 with materials £30 and needs 0.5 finishing hours; Product Y sells for £140 with materials £50 and needs 1.5 hours; Product Z sells for £75 with materials £39 and needs 0.4 hours. Maximum monthly demand is 4,000 X, 2,500 Y and 5,000 Z.",
          steps: [
            { label: "Confirm the bottleneck is binding", detail: "Hours needed to meet all demand: X 4,000 x 0.5 = 2,000; Y 2,500 x 1.5 = 3,750; Z 5,000 x 0.4 = 2,000. Total 7,750 hours against 6,000 available, so finishing IS the constraint and a ranking decision is required." },
            { label: "Compute throughput per unit", detail: "Price less MATERIALS only. X: £90 - £30 = £60. Y: £140 - £50 = £90. Z: £75 - £39 = £36." },
            { label: "Compute throughput per bottleneck hour", detail: "X: £60 / 0.5 = £120. Y: £90 / 1.5 = £60. Z: £36 / 0.4 = £90. So the ranking is X first, Z second, Y last — note that Y has the highest throughput PER UNIT and is ranked LAST, because it consumes three times X's bottleneck time." },
            { label: "Compute cost per bottleneck hour", detail: "£540,000 / 6,000 hours = £90 per hour. This is the rate the factory spends, and every product's TPAR is measured against it." },
            { label: "Compute the TPAR for each", detail: "X: £120 / £90 = 1.33. Z: £90 / £90 = 1.00. Y: £60 / £90 = 0.67. So X earns comfortably faster than the factory spends, Z exactly breaks even at the margin, and Y DESTROYS value — every bottleneck hour spent on Y earns £60 against £90 of cost." },
            { label: "Allocate the 6,000 hours by rank", detail: "X first: 4,000 units x 0.5 = 2,000 hours, leaving 4,000. Z next: 5,000 units x 0.4 = 2,000 hours, leaving 2,000. Y last: 2,000 hours / 1.5 = 1,333 units of the 2,500 demanded." },
            { label: "Say what should be done about Y", detail: "Making 1,333 units of a product with a TPAR of 0.67 is not obviously right — those 2,000 hours generate £120,000 of throughput against £180,000 of factory cost. The real answers are to raise Y's price, cut its material cost, or above all REDUCE ITS BOTTLENECK TIME, since 1.5 hours is what condemns it. If none is possible, and the factory cost is genuinely fixed, making Y still contributes £120,000 towards it — but the strategic conclusion is that Y should be redesigned or dropped." },
          ],
          result:
            "Ranking **X, Z, Y** with TPARs of **1.33, 1.00 and 0.67**, and a mix of 4,000 X, 5,000 Z and 1,333 Y. The instructive part is Y: **highest throughput per unit, ranked last**, because throughput accounting ranks by the bottleneck, not by the product.",
        },
      ],
      check: {
        q: "A product has throughput of £90 per bottleneck hour. Factory cost is £540,000 for 6,000 bottleneck hours. What is its TPAR and what does it mean?",
        options: [
          "0.60 — the product should be discontinued",
          "1.00 — the product earns exactly the rate the factory spends",
          "1.67 — the product is highly profitable",
          "6.00 — the product earns six times its cost",
        ],
        correct: 1,
        explain:
          "Cost per bottleneck hour is £540,000/6,000 = £90, so the TPAR is £90/£90 = 1.00. The product earns through the bottleneck at exactly the rate the factory spends — break-even at the margin. Above 1 is worth making; below 1 destroys value at that rate.",
      },
    },
    {
      id: "managing-and-limits",
      heading: "Managing the bottleneck, and what throughput ignores",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The five steps of constraint management",
          items: [
            "**Identify** the constraint — the process whose capacity is below the demand on it.",
            "**Exploit** it: make sure it never stands idle. Stagger breaks, schedule maintenance outside production, inspect **before** the bottleneck so it never processes a part that will be scrapped, and keep a small buffer of work in front of it.",
            "**Subordinate** everything else to it. Non-bottleneck processes should run at the bottleneck's pace, not their own — running them flat out only builds inventory.",
            "**Elevate** the constraint: add capacity, buy another machine, outsource, or improve the process.",
            "**Repeat** — once elevated, the constraint moves somewhere else, and the exercise starts again. Not returning to step one is the classic failure.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "An hour lost at the bottleneck is an hour lost to the whole factory",
          md: "This asymmetry is the practical core of the theory. Time lost at the **bottleneck** can never be recovered — the output it would have produced is gone, and every downstream process and every sale depends on it. Time lost at a **non-bottleneck** costs nothing, because that process has spare capacity by definition. It follows that efficiency measures applied to non-bottleneck processes are worse than useless: they encourage managers to run those processes hard, which produces **inventory rather than throughput** and is exactly the behaviour throughput accounting exists to stop.",
        },
        {
          kind: "table",
          caption: "Throughput accounting weighed up",
          head: ["Advantages", "Limitations"],
          rows: [
            ["Focuses attention on the **one thing that limits profit**", "Treating all labour and overhead as **fixed** is only true in the SHORT run"],
            ["Discourages **producing for inventory**, since output is only throughput when sold", "Ignores **other constraints** — a market constraint, or a second near-bottleneck"],
            ["Simple to compute and easy to communicate", "**Short-term** by nature; it says nothing about product development or life-cycle cost"],
            ["Consistent with **just-in-time** and with lean thinking", "May under-cost products whose labour content genuinely varies, so it is a poor basis for **pricing**"],
            ["Makes the cost of bottleneck downtime visible and quantified", "The bottleneck can **move**, so a mix optimised for today's constraint may be wrong tomorrow"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Where a TPAR below 1 does not mean stop",
          md: "Worth saying in an answer, because the crude rule is often wrong. If factory cost is genuinely **fixed and unavoidable**, a product with a TPAR below 1 still generates throughput that contributes towards it — dropping it makes the loss bigger, not smaller, unless the bottleneck time can be used for something better. And a TPAR below 1 may be acceptable for a product that is **strategically necessary**: a loss-leader, a contractual obligation, or one that carries sales of others. So the right conclusion is usually to **fix the ratio** — price, materials, or bottleneck time — rather than to withdraw.",
        },
      ],
      check: {
        q: "Why does improving a non-bottleneck process usually not increase profit?",
        options: [
          "Because non-bottleneck processes are already efficient",
          "Because output is limited by the bottleneck, so the extra capacity only produces inventory",
          "Because non-bottleneck costs are variable",
          "Because it moves the bottleneck elsewhere",
        ],
        correct: 1,
        explain:
          "Because the BOTTLENECK limits system output, so extra capacity elsewhere produces INVENTORY rather than throughput. This is why efficiency measures on non-bottleneck processes are actively harmful — they reward the behaviour throughput accounting exists to stop.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deducting labour from throughput.",
      fix: "Throughput is price less MATERIALS only. Labour and all overhead sit in total factory cost.",
    },
    {
      trap: "Omitting labour from total factory cost.",
      fix: "It belongs there, and leaving it out inflates every TPAR.",
    },
    {
      trap: "Ranking by throughput per UNIT.",
      fix: "Rank by throughput per BOTTLENECK HOUR. The highest per unit is often ranked last.",
    },
    {
      trap: "Treating throughput ranking as identical to contribution ranking.",
      fix: "Contribution deducts labour and variable overhead; throughput does not. Where labour differs materially the rankings can differ.",
    },
    {
      trap: "Concluding automatically that a TPAR below 1 means withdraw.",
      fix: "If factory cost is unavoidable the product still contributes. Fix price, materials or bottleneck time first.",
    },
  ],
  keyTerms: [
    { term: "Theory of constraints", def: "System output is limited by its constraint alone, so improvement must target the constraint." },
    { term: "Bottleneck", def: "The process whose capacity is below the demand placed on it." },
    { term: "Throughput", def: "Selling price less direct material cost — all other factory cost being treated as fixed." },
    { term: "Cost per bottleneck hour", def: "Total factory cost, including labour, divided by bottleneck hours available." },
    { term: "Throughput accounting ratio", def: "Throughput per bottleneck hour divided by cost per bottleneck hour; above 1 is worth making." },
    { term: "Subordination", def: "Running non-bottleneck processes at the bottleneck's pace rather than their own." },
  ],
  summary: [
    "The theory of constraints holds that output is limited by the bottleneck alone, so improvement elsewhere changes nothing.",
    "Throughput is price less materials only; labour and overhead are treated as fixed factory cost.",
    "Rank by throughput per bottleneck hour, not per unit, and compare with cost per bottleneck hour to get the TPAR.",
    "A TPAR above 1 earns faster than the factory spends; below 1 the product destroys value at that rate.",
    "Manage the constraint by identifying, exploiting, subordinating, elevating and then repeating — and an hour lost at the bottleneck is lost to the whole factory.",
  ],
  knowledgeDiagnostic: [
    { q: "What does throughput deduct, and what does that imply for total factory cost?", a: "Materials only — so labour and all overhead are treated as fixed and belong in total factory cost." },
    { q: "State the TPAR and what a value below 1 means.", a: "Throughput per bottleneck hour divided by cost per bottleneck hour. Below 1, the product earns through the bottleneck more slowly than the factory spends." },
    { q: "Why can throughput and contribution rank products differently?", a: "Contribution deducts labour and variable overhead as well as materials, so where labour content differs materially between products the order can change." },
    { q: "Name the five steps of constraint management.", a: "Identify the constraint, exploit it fully, subordinate everything else to it, elevate it, then repeat — because the constraint moves." },
    { q: "Why is an hour lost at the bottleneck worse than an hour lost elsewhere?", a: "Because it is output the whole factory can never recover, whereas a non-bottleneck has spare capacity by definition." },
  ],
}

export const PM_TREE_AREA_B_PART2: StudyChapter[] = [PM_TREE_07, PM_TREE_08]
