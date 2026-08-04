import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area B, first part — activity-based costing, target costing and life-cycle costing.
 * Chapters 5–7 of the PM reading tree, mapped to syllabus groups B1–B3.
 *
 * ── Where PM becomes computational ────────────────────────────
 * Area A was discursive. From here on the marks are in the arithmetic, so these chapters
 * follow MA's shape: a `formula` block stating the calculation and what each symbol is,
 * then an `example` stepper that WORKS a full set of figures to a numbered answer. A
 * chapter that states a technique without computing it teaches nothing an exam rewards.
 *
 * The examples are deliberately built so the final figure is not the whole answer: each
 * ends on what the number MEANS for a decision, because Section C asks for workings AND
 * commentary and candidates routinely supply only the first.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 5 · B1 ───────────────────────────────────────────── */

export const PM_TREE_05: StudyChapter = {
  id: "PM-05",
  number: 5,
  paper: "PM",
  area: "B",
  title: "Activity-based costing",
  minutes: 18,
  syllabusRefs: ["B1(a)", "B1(b)", "B1(c)"],
  intro:
    "Absorption costing spreads overhead by volume, which was fine when overhead was small and driven by labour. ABC asks what actually causes each pool of overhead — and the answer usually redistributes cost from high-volume products to low-volume ones.",
  outcomes: [
    "Identify appropriate cost drivers for given overhead pools",
    "Calculate costs per driver and per unit using ABC",
    "Compare an ABC cost with an absorption cost and explain the difference",
    "Explain the implications of ABC for pricing, product mix and profitability",
    "State the drawbacks and the circumstances in which ABC is worth its cost",
  ],
  sections: [
    {
      id: "mechanics",
      heading: "How ABC works, and why the answer moves",
      blocks: [
        {
          kind: "definition",
          term: "Activity-based costing",
          md: "A costing method that assigns overhead to products by **the activities that cause it**, rather than by a volume measure such as labour or machine hours. Overheads are collected into **cost pools**, each pool has a **cost driver** — the factor that actually causes that cost to be incurred — and cost is charged to products in proportion to their use of the driver.",
        },
        {
          kind: "formula",
          name: "The ABC calculation",
          expr: "Cost per driver  =  Total cost of the activity pool  ÷  Total number of driver units\n\nOverhead charged to a product  =  Cost per driver  ×  Driver units that product consumes\n\nOverhead per unit  =  Overhead charged to the product  ÷  Units produced",
          note: "Do it pool by pool and add. The commonest arithmetic error is dividing by the wrong denominator — the pool's own driver total, not total production. Note the last step: examiners frequently ask for cost PER UNIT, and a candidate who stops at the product total loses the mark.",
        },
        {
          kind: "list",
          style: "number",
          title: "The four steps",
          items: [
            "**Identify the major activities** that consume resources — machine set-ups, purchase ordering, quality inspection, materials handling, despatch.",
            "**Collect the overhead into a cost pool** for each activity.",
            "**Choose a cost driver** for each pool: the factor whose variation actually causes the cost. Number of set-ups for set-up cost, number of orders for ordering cost, number of inspections for inspection cost.",
            "**Charge each product** with cost per driver × the driver units it consumes, then divide by units to get cost per unit.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why ABC moves cost from high-volume to low-volume products",
          md: "This is the insight the exam tests, and it follows from arithmetic rather than opinion. Many overheads are driven by **transactions, not volume**: a set-up costs the same whether the batch that follows is 10 units or 10,000, and so does a purchase order or an inspection. Absorption costing spreads that cost by volume, so the 10,000-unit product absorbs a thousand times as much as the 10-unit product for **identical work done**. ABC charges each batch with its own set-up, so the **low-volume product picks up far more cost per unit** and the high-volume product less. Whenever a scenario has one high-volume and one low-volume product with similar batch counts, expect exactly that shift — and expect the low-volume product to turn out unprofitable.",
        },
        {
          kind: "example",
          title: "Working an ABC calculation against absorption costing",
          scenario:
            "Denholm Ltd makes two products. Standard, 40,000 units a year in batches of 4,000; Premium, 5,000 units a year in batches of 250. Each unit of either takes 0.5 machine hours. Overheads are: machine-related £360,000, driven by machine hours; set-up costs £240,000, driven by number of set-ups (one per batch); purchase ordering £150,000, driven by number of orders — Standard needs 40 orders a year, Premium 160. Direct cost is £22 a unit for Standard and £30 for Premium. Denholm currently absorbs all overhead on machine hours.",
          steps: [
            { label: "Absorption costing first, for comparison", detail: "Total machine hours = (40,000 + 5,000) x 0.5 = 22,500. Total overhead = £360,000 + £240,000 + £150,000 = £750,000. Rate = £750,000 / 22,500 = £33.33 per machine hour, so £16.67 per unit for BOTH products (each uses 0.5 hours). Total cost: Standard £38.67, Premium £46.67." },
            { label: "ABC — machine-related pool", detail: "Driven by machine hours: £360,000 / 22,500 hours = £16 per hour, so £8 per unit for each product. This is the only pool volume-driven, so it does not move." },
            { label: "ABC — set-up pool", detail: "Set-ups: Standard 40,000/4,000 = 10; Premium 5,000/250 = 20. Total 30. Cost per set-up = £240,000 / 30 = £8,000. Standard: 10 x £8,000 = £80,000, over 40,000 units = £2.00 per unit. Premium: 20 x £8,000 = £160,000, over 5,000 units = £32.00 per unit." },
            { label: "ABC — ordering pool", detail: "Orders: 40 + 160 = 200. Cost per order = £150,000 / 200 = £750. Standard: 40 x £750 = £30,000, over 40,000 units = £0.75 per unit. Premium: 160 x £750 = £120,000, over 5,000 units = £24.00 per unit." },
            { label: "Build the ABC cost per unit", detail: "Standard: £22 direct + £8 machine + £2.00 set-up + £0.75 ordering = £32.75. Premium: £30 + £8 + £32.00 + £24.00 = £94.00." },
            { label: "Compare, and say what it means", detail: "Standard falls from £38.67 to £32.75 (down £5.92); Premium rises from £46.67 to £94.00 (up £47.33). Premium consumes TWICE the set-ups and FOUR TIMES the orders of a product producing an EIGHTH of the volume, and absorption costing hid all of it. If Premium sells anywhere near £46.67 it is being sold at a substantial loss, and the cross-subsidy has been funded by Standard." },
          ],
          result:
            "**Standard £32.75, Premium £94.00** on ABC, against £38.67 and £46.67 on absorption. The whole shift comes from the two **transaction-driven** pools: Premium's tiny batches and frequent ordering cost real money that volume-based absorption charged to Standard instead.",
        },
      ],
      check: {
        q: "Product A makes 40,000 units in batches of 4,000; Product B makes 5,000 units in batches of 250. Set-up cost is £8,000 per set-up. What is set-up cost per unit for each?",
        options: [
          "£2.00 for A and £2.00 for B",
          "£2.00 for A and £32.00 for B",
          "£8,000 for A and £8,000 for B",
          "£1.78 for both, spread by volume",
        ],
        correct: 1,
        explain:
          "A has 10 set-ups (40,000/4,000) costing £80,000 over 40,000 units = £2.00. B has 20 set-ups (5,000/250) costing £160,000 over 5,000 units = £32.00. B does MORE set-ups on an EIGHTH of the volume, which is exactly the cost that volume-based absorption hides.",
      },
    },
    {
      id: "implications",
      heading: "What ABC is for, and when it is not worth it",
      blocks: [
        {
          kind: "table",
          caption: "The implications management should act on",
          head: ["Area", "What ABC changes"],
          rows: [
            ["**Pricing**", "A product shown to cost far more may be **underpriced**. But note the price is set by the market, so the answer may be to raise price, reduce cost, or withdraw — not automatically to reprice"],
            ["**Product mix**", "Low-volume, high-complexity products often turn out unprofitable, so the range may need pruning — carefully, since some may be strategically necessary"],
            ["**Cost reduction**", "The most valuable use. Knowing that set-ups cost £8,000 each makes **larger batches** or **faster changeovers** an obvious target, which absorption costing never revealed"],
            ["**Customer profitability**", "The same logic applied to customers rather than products: small frequent orders cost more to serve than the margin suggests"],
            ["**Performance measurement**", "Managers can be held to driver volumes — number of set-ups, orders, inspections — which are things they can actually influence"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"ABC shows Premium loses money, so withdraw it\" is usually the wrong answer",
          md: "Three reasons, and an exam answer should give them. First, much of the overhead is **not avoidable in the short run** — withdrawing Premium does not immediately remove the purchasing department, so the cost would simply be reabsorbed by Standard. Second, ABC gives **more accurate cost, not a decision rule**: the relevant question for a withdrawal is incremental cash flow (chapter 11). Third, the better response is often to **change the cost driver behaviour** — fewer, larger batches, or consolidated ordering — which keeps the product and removes the cost.",
        },
        {
          kind: "table",
          caption: "Advantages and drawbacks",
          head: ["Advantages", "Drawbacks"],
          rows: [
            ["**More accurate product cost** where overheads are large and not volume-driven", "**Costly to implement and maintain** — every driver has to be measured continuously"],
            ["**Reveals what drives cost**, so it supports genuine cost reduction", "**Choosing drivers involves judgement**, and a poor driver gives confidently wrong answers"],
            ["**Better pricing and mix decisions**, especially with a diverse product range", "Some overhead is **facility-level** and driven by nothing in particular, so it still has to be apportioned arbitrarily"],
            ["**Applies to services and customers**, not just manufacturing", "Still an **absorption** method: it does not make fixed costs relevant to a short-run decision"],
            ["Supports **performance measurement** on things managers control", "**Little benefit where overhead is small** or genuinely volume-driven — then it is cost without gain"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "When ABC is worth having",
          md: "Four conditions, and the more that hold the stronger the case: **overheads are a large share of total cost**; the product range is **diverse in volume or complexity**; overheads are driven by **transactions rather than volume**; and the organisation faces decisions — pricing, mix, cost reduction — where cost accuracy changes the answer. Where a single product is made in long runs with small overheads, ABC costs money and tells you what you already knew.",
        },
      ],
      check: {
        q: "ABC shows a low-volume product costs far more than absorption costing suggested. What is the best first response?",
        options: [
          "Withdraw the product immediately",
          "Investigate whether driver consumption can be reduced — larger batches, consolidated ordering — since much overhead is not avoidable in the short run",
          "Raise the price to cover the ABC cost",
          "Reallocate the overhead back to the high-volume product",
        ],
        correct: 1,
        explain:
          "Attack the DRIVER CONSUMPTION. Withdrawal does not immediately remove the overhead, which would simply be reabsorbed by the remaining product, and price is set by the market. ABC gives more accurate cost, not a decision rule — a withdrawal decision needs incremental cash flow.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Dividing a cost pool by total production rather than by its own driver total.",
      fix: "Each pool is divided by ITS driver units — set-ups, orders, inspections — not by units produced.",
    },
    {
      trap: "Stopping at overhead charged to the product.",
      fix: "Divide by units produced. Examiners ask for cost PER UNIT, which is where the low-volume product's cost explodes.",
    },
    {
      trap: "Concluding that an unprofitable product should be withdrawn.",
      fix: "Much overhead is unavoidable short-run and would be reabsorbed. Attack driver consumption, or test the decision on incremental cash flow.",
    },
    {
      trap: "Recommending ABC in every scenario.",
      fix: "It needs large, transaction-driven overheads and a diverse range. With small volume-driven overheads it is cost without gain.",
    },
  ],
  keyTerms: [
    { term: "Cost pool", def: "The overhead collected for one activity, to be charged out by that activity's driver." },
    { term: "Cost driver", def: "The factor whose variation actually causes an activity's cost to be incurred." },
    { term: "Cost per driver", def: "Pool cost divided by total driver units, charged to products by their driver consumption." },
    { term: "Transaction-driven cost", def: "Cost incurred per event rather than per unit — a set-up or an order costs the same whatever the batch size." },
    { term: "Facility-level cost", def: "Overhead driven by nothing in particular, which must still be apportioned on some arbitrary basis." },
  ],
  summary: [
    "ABC collects overhead into activity pools and charges it by the driver that causes it, not by volume.",
    "Cost per driver is pool cost divided by that pool's driver units, then charged by consumption and divided by units.",
    "Because many overheads are transaction-driven, ABC moves cost from high-volume to low-volume products.",
    "Its most valuable use is cost reduction, because it shows what driving the cost actually costs.",
    "It is worth having where overheads are large, transaction-driven, and the product range is diverse.",
  ],
  knowledgeDiagnostic: [
    { q: "State the four steps of ABC.", a: "Identify major activities, collect overhead into a pool per activity, choose a driver for each pool, then charge products by driver consumption and divide by units." },
    { q: "Why does ABC shift cost to low-volume products?", a: "Because transaction-driven costs like set-ups and orders are the same whatever the batch size, so a low-volume product doing similar transaction counts picks up far more cost per unit." },
    { q: "What is ABC's most valuable application?", a: "Cost reduction — knowing the cost per set-up or per order makes larger batches, faster changeovers or consolidated ordering an obvious target." },
    { q: "When is ABC not worth implementing?", a: "Where overheads are a small share of cost or genuinely volume-driven, and the product range is not diverse — then it adds cost without changing any decision." },
  ],
}

/* ── Chapter 6 · B2 ───────────────────────────────────────────── */

export const PM_TREE_06: StudyChapter = {
  id: "PM-06",
  number: 6,
  paper: "PM",
  area: "B",
  title: "Target costing",
  minutes: 16,
  syllabusRefs: ["B2(a)", "B2(b)", "B2(c)", "B2(d)"],
  intro:
    "Conventional costing works out what a product costs and adds a margin. Target costing starts from the price the market will pay, subtracts the margin the business requires, and treats what remains as a cost the product is not allowed to exceed.",
  outcomes: [
    "Derive a target cost from a market price and a required margin",
    "Calculate a cost gap and explain what it means",
    "Explain how a cost gap may be closed, and the risks of each route",
    "Explain the implications of target costing for pricing, cost control and performance",
    "Describe the difficulties of applying target costing to services",
  ],
  sections: [
    {
      id: "mechanics",
      heading: "The calculation, and the cost gap",
      blocks: [
        {
          kind: "formula",
          name: "Target cost and the cost gap",
          expr: "Target cost  =  Target selling price  −  Required profit margin\n\nCost gap  =  Estimated current cost  −  Target cost",
          note: "Watch how the margin is expressed. A margin ON SALES of 30% means profit is 30% of PRICE, so target cost is 70% of price. A MARK-UP on cost of 30% means price is 130% of cost, so target cost is price ÷ 1.30. Getting these two the wrong way round is the single commonest error in the topic.",
        },
        {
          kind: "list",
          style: "number",
          title: "The process",
          items: [
            "**Determine the market price** at which the product will sell, from market research — this is a demand-side figure, not a cost-plus one.",
            "**Deduct the required profit**, whether stated as a margin on sales or a return on investment.",
            "**Arrive at the target cost** — the maximum the product may cost.",
            "**Estimate the actual cost** of the product as currently designed.",
            "**Compute the cost gap**, and close it before launch — principally by redesign.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the gap must be closed BEFORE launch",
          md: "Target costing is a **design-stage** technique, and that is the whole point of it. By the time a product is in production, the great majority of its cost is already locked in by decisions about materials, components, tolerances and process — so cost reduction afterwards can only nibble at the margins. Closing the gap at the design stage means changing the product, not exhorting the factory. This is also why target costing sits naturally alongside **life-cycle costing** (chapter 7), which makes the same point about the whole cost being determined early.",
        },
        {
          kind: "example",
          title: "Deriving a target cost and closing the gap",
          scenario:
            "Ravensworth Ltd is designing a new domestic appliance. Market research indicates it will sell 60,000 units a year at £180. The company requires a profit margin of 25% on selling price. Current design estimates are: materials £68, direct labour £22, variable overhead £14, and fixed production overhead of £3,600,000 a year attributable to the product. The design team believes a redesign could remove £9 of material cost, that a supplier will reduce component prices by 5% for a three-year commitment, and that a simplified assembly would cut labour time by 15%.",
          steps: [
            { label: "Compute the target cost", detail: "Margin is 25% ON SELLING PRICE, so profit is £180 x 25% = £45 and target cost is £180 - £45 = £135. (Had it been a 25% MARK-UP on cost, target cost would have been £180/1.25 = £144 — a £9 difference that changes the answer.)" },
            { label: "Compute the current estimated cost per unit", detail: "Variable: £68 + £22 + £14 = £104. Fixed: £3,600,000 / 60,000 units = £60. Total current cost = £164 per unit." },
            { label: "Compute the cost gap", detail: "£164 - £135 = a cost gap of £29 PER UNIT — which across 60,000 units is £1,740,000 a year. As designed, the product misses the required margin by that much." },
            { label: "Quantify the proposed savings", detail: "Material redesign £9.00. Supplier discount: 5% of the £68 materials less the £9 already removed = 5% x £59 = £2.95. Labour: 15% of £22 = £3.30. Total identified savings = £15.25." },
            { label: "Recompute the remaining gap", detail: "£29.00 - £15.25 = £13.75 per unit still unclosed, or £825,000 a year. So the identified measures close just over half the gap." },
            { label: "Say what should happen next, and what each route risks", detail: "The remaining £13.75 must come from further DESIGN change, higher VOLUME (which spreads the £3,600,000 fixed overhead — 70,000 units would cut fixed cost per unit to £51.43, closing £8.57 of the gap by itself), or a higher PRICE if the market will bear it. Cutting quality to close it risks warranty cost and reputation, and the supplier discount locks Ravensworth into a three-year commitment." },
          ],
          result:
            "A target cost of **£135** against a current **£164** — a **£29 gap**, of which the identified measures close **£15.25**, leaving **£13.75**. Note how much of the gap is driven by **fixed overhead per unit**, so the volume assumption matters as much as the design work.",
        },
      ],
      check: {
        q: "A product will sell for £200 and the company requires a 30% margin on selling price. What is the target cost?",
        options: ["£140", "£153.85", "£170", "£260"],
        correct: 0,
        explain:
          "£140. A margin ON SELLING PRICE of 30% means profit is £200 x 30% = £60, so target cost is £200 - £60 = £140. £153.85 would be the answer for a 30% MARK-UP ON COST (£200/1.30) — mixing the two up is the commonest error in this topic.",
      },
    },
    {
      id: "closing-and-limits",
      heading: "Closing the gap, and where target costing struggles",
      blocks: [
        {
          kind: "table",
          caption: "How a cost gap may be closed, and what each risks",
          head: ["Route", "The risk"],
          rows: [
            ["**Redesign the product** — fewer components, standard parts, simpler assembly", "The best route, but takes time and may reduce features customers value"],
            ["**Value analysis** — remove cost that adds no customer value", "Requires knowing what customers actually value; easy to remove something that mattered"],
            ["**Negotiate with suppliers**, or change supplier", "May demand volume commitments, and concentrates supply risk"],
            ["**Improve process efficiency** and reduce waste", "Real but usually smaller than design savings, since cost is already committed"],
            ["**Increase volume**, spreading fixed overhead", "The volume must be achievable — assuming it to close a gap is circular"],
            ["**Raise the price**", "Contradicts the market research the target cost was built on, unless something has changed"],
            ["**Reduce quality or specification**", "Warranty, returns, reputation and lost future sales. Usually a false economy, and worth saying so"],
            ["**Accept a lower margin**, or abandon the product", "Legitimate conclusions. A product that cannot meet its target cost may simply not be viable"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Closing a gap by assuming volume is circular",
          md: "The tempting move in a scenario is to close the remaining gap with higher volume, because fixed cost per unit falls and the arithmetic works. But the target price came from market research **at a given volume** — so raising the volume assumption to make the cost work, without evidence that the extra units can be sold at that price, is assuming the conclusion. Where a scenario does this, saying so is worth a mark.",
        },
        {
          kind: "list",
          title: "Applying target costing to services",
          items: [
            "**No physical product to redesign**, so the largest lever — design change — is much weaker.",
            "Service cost is dominated by **staff time**, which is harder to reduce without reducing what the customer receives.",
            "Services are **heterogeneous**: each delivery differs, so a single unit cost is a bigger abstraction than for a manufactured item.",
            "**Simultaneity** — services are produced and consumed together, so there is no inventory stage at which cost can be worked out and refined.",
            "**Intangibility** makes it hard to say which features customers value, which is what value analysis depends on.",
            "It can still be applied — standardising the service, redesigning the process, and using technology to substitute for staff time are the service equivalents of redesign.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "What target costing does to behaviour, and why that is the point",
          md: "Its real effect is not arithmetical but organisational. Conventional cost-plus lets a business set a price that covers whatever the product happened to cost, so inefficiency is passed to the customer. Target costing makes the **market price a constraint and cost the variable**, which forces design, engineering, purchasing and production to work on cost together and **before** commitments are made. That is why it is associated with cross-functional teams and with suppliers being involved early — and why the answer to \"how should the gap be closed\" is rarely a single department's job.",
        },
      ],
      check: {
        q: "Why is target costing harder to apply to a service?",
        options: [
          "Services have no cost",
          "There is no physical product to redesign, cost is dominated by staff time, and each delivery differs",
          "Services cannot be priced by market research",
          "Services have no fixed overhead to spread",
        ],
        correct: 1,
        explain:
          "There is NO PHYSICAL PRODUCT to redesign — which removes the strongest lever — cost is dominated by STAFF TIME that is hard to cut without reducing the service, and HETEROGENEITY makes a single unit cost a bigger abstraction. It can still be applied by standardising and redesigning the process.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Confusing a margin on selling price with a mark-up on cost.",
      fix: "A 30% margin means target cost is 70% of price; a 30% mark-up means price ÷ 1.30. This is the topic's commonest error.",
    },
    {
      trap: "Omitting fixed overhead per unit from the current cost estimate.",
      fix: "Include it, and note that it depends on the volume assumption — which is often where most of the gap sits.",
    },
    {
      trap: "Closing the remaining gap by assuming more volume.",
      fix: "The target price came from research at a given volume, so raising volume to make the cost work is circular.",
    },
    {
      trap: "Treating target costing as a cost-control technique for production.",
      fix: "It is a DESIGN-STAGE technique. Most cost is locked in before production starts.",
    },
  ],
  keyTerms: [
    { term: "Target cost", def: "Target selling price less the required profit — the maximum a product may cost." },
    { term: "Cost gap", def: "Estimated current cost less target cost, to be closed before launch." },
    { term: "Value analysis", def: "Systematically removing cost that adds no value the customer is willing to pay for." },
    { term: "Margin on selling price", def: "Profit expressed as a percentage of price, so target cost is price less that percentage of price." },
    { term: "Mark-up on cost", def: "Profit expressed as a percentage of cost, so target cost is price divided by one plus that percentage." },
  ],
  summary: [
    "Target cost is the market price less the required profit; the cost gap is current estimated cost less target cost.",
    "A margin on selling price and a mark-up on cost give different answers — read which is meant.",
    "The gap must be closed at the design stage, because most cost is locked in before production.",
    "Routes include redesign, value analysis, supplier negotiation, process improvement and volume — each with its own risk.",
    "Services are harder because there is no product to redesign, cost is staff time, and each delivery differs.",
  ],
  knowledgeDiagnostic: [
    { q: "How is a target cost derived?", a: "From the market price the product will sell at, less the profit the business requires — a demand-side figure, not cost-plus." },
    { q: "Why must the cost gap be closed before launch?", a: "Because most of a product's cost is locked in by design decisions, so post-launch reduction can only nibble at the margins." },
    { q: "What is wrong with closing a gap by assuming higher volume?", a: "The target price came from research at a given volume, so raising the volume assumption to make the cost work assumes the conclusion." },
    { q: "How does target costing change behaviour?", a: "It makes market price a constraint and cost the variable, forcing design, purchasing and production to work on cost together and before commitments are made." },
  ],
}

export const PM_TREE_AREA_B_PART1: StudyChapter[] = [PM_TREE_05, PM_TREE_06]
