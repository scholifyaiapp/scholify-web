import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area C, second part — multi-product CVP and limiting factor analysis.
 * Chapters 13–14 of the PM reading tree, mapped to syllabus groups C2 and C3.
 *
 * Chapter 14 must be read alongside chapter 8: both rank products by return per unit of a
 * scarce resource, but limiting factor analysis ranks by CONTRIBUTION (deducting labour and
 * variable overhead) where throughput ranks by THROUGHPUT (deducting materials only). Where
 * labour content differs materially the two produce different orders, and the exam exploits
 * it — so the difference is stated explicitly in both chapters rather than left to be
 * noticed.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 13 · C2, multi-product ───────────────────────────── */

export const PM_TREE_13: StudyChapter = {
  id: "PM-13",
  number: 13,
  paper: "PM",
  area: "C",
  title: "Cost-volume-profit analysis: multiple products",
  minutes: 17,
  syllabusRefs: ["C2(c)", "C2(d)"],
  intro:
    "With more than one product there is no single breakeven point, because the answer depends on the mix. So the technique changes: weight the contribution by the mix, and accept that the answer holds only while that mix does.",
  outcomes: [
    "Calculate a weighted average contribution per unit and a weighted average C/S ratio",
    "Calculate a multi-product breakeven point in units and revenue",
    "Construct and interpret a multi-product profit-volume chart",
    "Explain why the constant mix assumption is critical",
    "Explain the effect of a change in mix on breakeven",
  ],
  sections: [
    {
      id: "weighted-average",
      heading: "Weighting by the mix",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Why there is no single breakeven point",
          md: "With two products, the business could break even by selling a great many of the low-contribution one or rather few of the high-contribution one. Both are breakeven points, so the question \"what is the breakeven point?\" has no answer until the **mix** is fixed. Every multi-product technique therefore starts by assuming a constant mix, computes an average contribution weighted by it, and treats the result as one composite product. The answer is only valid for **that** mix, which is the assumption an examiner expects you to name.",
        },
        {
          kind: "formula",
          name: "Multi-product CVP",
          expr: "Weighted average contribution per unit  =  Total contribution from the mix  ÷  Total units in the mix\n\nBreakeven units (total)  =  Fixed costs  ÷  Weighted average contribution per unit\n\nWeighted average C/S ratio  =  Total contribution from the mix  ÷  Total revenue from the mix\n\nBreakeven revenue  =  Fixed costs  ÷  Weighted average C/S ratio\n\nUnits of each product at breakeven  =  Breakeven total units  ×  that product's share of the mix",
          note: "Two different weightings, and mixing them up is the standard error. Weight by UNITS to get a contribution per unit and hence breakeven UNITS; weight by REVENUE to get a C/S ratio and hence breakeven REVENUE. Note the weighted average C/S ratio is NOT the simple average of the individual C/S ratios — it must be weighted by each product's sales value."
        },
        {
          kind: "example",
          title: "Working a three-product breakeven",
          scenario:
            "Pinvin Ltd sells three products in a constant mix of 5 : 3 : 2 by units. Product A sells at £30 with variable cost £18; B at £50 with variable cost £26; C at £80 with variable cost £56. Fixed costs are £522,000 a year. Budgeted sales are 100,000 units in total. The sales director then asks what happens if the mix shifts to 3 : 3 : 4 because C is growing.",
          steps: [
            { label: "Contribution per unit of each product", detail: "A: £30 − £18 = £12. B: £50 − £26 = £24. C: £80 − £56 = £24." },
            { label: "Weighted average contribution per unit", detail: "Take one batch of the mix — 5A + 3B + 2C = 10 units. Contribution = (5 × £12) + (3 × £24) + (2 × £24) = £60 + £72 + £48 = £180 for 10 units, so £18.00 per unit." },
            { label: "Breakeven in units, and split by product", detail: "£522,000 / £18.00 = 29,000 units in total. Split by the mix: A = 29,000 × 5/10 = 14,500; B = 8,700; C = 5,800." },
            { label: "Weighted average C/S ratio and breakeven revenue", detail: "Revenue per batch = (5 × £30) + (3 × £50) + (2 × £80) = £150 + £150 + £160 = £460. C/S ratio = £180 / £460 = 39.13%. Breakeven revenue = £522,000 / 0.3913 = £1,334,015 — which checks against (14,500 × £30) + (8,700 × £50) + (5,800 × £80) = £1,334,000, the difference being rounding." },
            { label: "Margin of safety", detail: "Budget 100,000 units against breakeven 29,000, so the margin of safety is 71,000 units, or 71% of budget — very comfortable." },
            { label: "Test the new mix of 3 : 3 : 4", detail: "Per 10-unit batch: (3 × £12) + (3 × £24) + (4 × £24) = £36 + £72 + £96 = £204, so £20.40 per unit. New breakeven = £522,000 / £20.40 = 25,589 units — LOWER, because the mix has shifted towards the higher-contribution products." },
            { label: "State the point the arithmetic makes", detail: "Nothing about cost, price or fixed cost changed, yet breakeven fell by 3,411 units purely because of MIX. That is why the constant-mix assumption matters: a breakeven figure quoted without its mix is close to meaningless, and a favourable mix shift improves profit without any operational improvement at all — which is also the sales mix variance of chapter 26." },
          ],
          result:
            "Breakeven **29,000 units / £1,334,015** on the 5:3:2 mix, falling to **25,589 units** on 3:3:4. The instructive part is that **only the mix changed** — which is why the assumption has to be stated whenever a multi-product breakeven is quoted.",
        },
      ],
      check: {
        q: "Products X and Y sell in a 3:1 unit mix with contributions of £8 and £20. Fixed costs are £33,000. What is the total breakeven volume?",
        options: ["3,000 units", "2,357 units", "4,125 units", "1,650 units"],
        correct: 0,
        explain:
          "3,000 units. Take one batch of the mix: (3 × £8) + (1 × £20) = £44 of contribution from 4 units, so the weighted average is £11 per unit and £33,000/£11 = 3,000. The distractors are the three standard errors — £14 is the SIMPLE average of £8 and £20, while £8 and £20 alone ignore the other product entirely.",
      },
    },
    {
      id: "pv-chart",
      heading: "The multi-product profit-volume chart",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "What the chart shows that the arithmetic does not",
          md: "A multi-product profit-volume chart is drawn twice over, and the gap between the two lines is the insight. First plot products in **descending order of C/S ratio**, cumulating revenue on the x-axis and profit on the y-axis: the line starts at minus fixed cost, rises steeply for the most profitable product, then flattens. Then plot the **constant-mix** line as a single straight line from minus fixed cost to the total profit. The **bow** between them shows how much of the profit comes from the best products — and the wider the bow, the more the business depends on selling the right mix rather than simply selling more.",
        },
        {
          kind: "list",
          style: "number",
          title: "Drawing it",
          items: [
            "Rank the products by **C/S ratio, highest first**.",
            "Start at **minus total fixed cost** on the vertical axis, at zero revenue.",
            "Plot each product in turn, moving right by its **revenue** and up by its **contribution**, so the gradient of each segment is that product's C/S ratio.",
            "Join the points to give the **individual-product line**, which is concave — steep first, flattening as the poorer products are added.",
            "Draw a **straight line** from the same start point to the final total profit: that is the **constant-mix** line.",
            "Read the two breakeven points where each line crosses zero. The individual line crosses **earlier**, because the best products come first.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two breakeven points are both real, and mean different things",
          md: "The **constant-mix** breakeven assumes products are sold in the budgeted proportions throughout — realistic for a business whose customers buy a standard basket. The **individual-product** breakeven assumes the best products are sold first, which is optimistic but relevant where the business can push its high-margin lines. Quoting only one is incomplete; the honest answer is that breakeven lies **between** them depending on how much control the business has over its mix. A scenario where a sales team is paid on revenue rather than margin will tend towards the pessimistic end, which is a performance measurement point (chapter 29).",
        },
        {
          kind: "table",
          caption: "Multi-product CVP: the limitations worth naming",
          head: ["Limitation", "Consequence"],
          rows: [
            ["**Constant mix** is assumed", "The breakeven figure is valid only for that mix, and mix shifts alone can move it materially"],
            ["Products may be **interdependent**", "Dropping a poor-margin product may lose sales of a good one — so a product-by-product ranking can mislead"],
            ["Fixed costs are treated as **wholly common**", "Where a fixed cost is specific to one product it should be deducted from that product, which changes the analysis"],
            ["All the **single-product assumptions still apply**", "Constant price, constant unit variable cost, everything produced is sold (chapter 12)"],
          ],
        },
      ],
      check: {
        q: "On a multi-product profit-volume chart, why does the individual-product line cross breakeven earlier than the constant-mix line?",
        options: [
          "Because it excludes fixed costs",
          "Because products are plotted in descending order of C/S ratio, so the most profitable are sold first",
          "Because it uses revenue rather than units",
          "Because it assumes a higher total profit",
        ],
        correct: 1,
        explain:
          "Because products are plotted in DESCENDING C/S RATIO order, so the highest-margin products are assumed sold first and fixed costs are covered sooner. Both lines start at the same point and end at the same total profit — the difference is the ORDER, and the bow between them shows how dependent profit is on mix.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Averaging the individual C/S ratios arithmetically.",
      fix: "Weight by each product's SALES VALUE — total contribution over total revenue for the mix.",
    },
    {
      trap: "Using a unit-weighted contribution to find breakeven revenue.",
      fix: "Unit weighting gives UNITS; revenue weighting gives REVENUE.",
    },
    {
      trap: "Quoting a multi-product breakeven without stating the mix.",
      fix: "A mix change alone moves breakeven, so the figure is meaningless without its mix.",
    },
    {
      trap: "Treating a product-specific fixed cost as common.",
      fix: "Deduct it from that product's contribution before weighting.",
    },
  ],
  keyTerms: [
    { term: "Weighted average contribution per unit", def: "Total contribution from one batch of the mix divided by the units in that batch." },
    { term: "Weighted average C/S ratio", def: "Total contribution from the mix divided by total revenue from the mix — never the simple average of individual ratios." },
    { term: "Constant mix assumption", def: "That products are sold in fixed proportions, without which no single breakeven point exists." },
    { term: "Multi-product profit-volume chart", def: "Profit against cumulative revenue, plotted both in descending C/S order and as a constant-mix straight line." },
  ],
  summary: [
    "With several products there is no single breakeven point until the mix is fixed.",
    "Weight contribution by units for breakeven units and by revenue for breakeven revenue.",
    "The weighted average C/S ratio is total contribution over total revenue, not an average of ratios.",
    "A mix shift alone changes breakeven, so the mix must be stated with the figure.",
    "The profit-volume chart's bow between the individual and constant-mix lines shows how far profit depends on mix.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is there no single multi-product breakeven point?", a: "Because the business could break even on many low-contribution units or few high-contribution ones, so the answer depends entirely on the mix." },
    { q: "How is the weighted average C/S ratio calculated?", a: "Total contribution from the mix divided by total revenue from the mix — not by averaging the individual ratios." },
    { q: "What does the bow on a multi-product profit-volume chart show?", a: "How much of the profit comes from the highest-margin products, and therefore how dependent the business is on selling the right mix." },
    { q: "Why do the two lines give different breakeven points?", a: "The individual line assumes the best products are sold first; the constant-mix line assumes budgeted proportions throughout. Breakeven lies between them." },
  ],
}

/* ── Chapter 14 · C3, single limiting factor ──────────────────── */

export const PM_TREE_14: StudyChapter = {
  id: "PM-14",
  number: 14,
  paper: "PM",
  area: "C",
  title: "Limiting factors and the single binding constraint",
  minutes: 17,
  syllabusRefs: ["C3(a)", "C3(b)"],
  intro:
    "When one resource runs short, the products worth making are not the ones with the highest contribution — they are the ones that generate the most contribution per unit of whatever is scarce.",
  outcomes: [
    "Identify the limiting factor in a given situation",
    "Calculate contribution per unit of the limiting factor and rank products",
    "Determine the optimal production plan and the resulting profit",
    "Explain the relationship to throughput accounting and why the rankings can differ",
    "Explain the assumptions and limitations of single limiting factor analysis",
  ],
  sections: [
    {
      id: "the-method",
      heading: "Identifying the constraint and ranking",
      blocks: [
        {
          kind: "definition",
          term: "Limiting factor",
          md: "A resource whose availability is **less than the amount needed to satisfy maximum demand** — labour hours, machine hours, a material in short supply, or cash. It is only a limiting factor if it is genuinely **binding**: a resource with slack constrains nothing, however scarce it sounds.",
        },
        {
          kind: "formula",
          name: "Ranking by the limiting factor",
          expr: "Contribution per unit of limiting factor  =  Contribution per unit  ÷  Units of the limiting factor per unit of product\n\nThen: rank highest first, and allocate the scarce resource in rank order up to each product's maximum demand.",
          note: "Two checks before ranking. FIRST establish that the resource is actually binding, by computing the total requirement to meet full demand and comparing it with availability. SECOND make sure only ONE resource is short — if two or more are binding, this method fails and linear programming is needed (chapter 15).",
        },
        {
          kind: "list",
          style: "number",
          title: "The method",
          items: [
            "**Confirm the constraint binds**: total resource needed for maximum demand against resource available. If supply exceeds demand there is no ranking problem — make everything.",
            "**Check only one resource is short.** More than one binding constraint means linear programming.",
            "**Compute contribution per unit** for each product.",
            "**Divide by the limiting factor** used per unit, to get contribution per hour or per kilogram.",
            "**Rank** highest first.",
            "**Allocate** the scarce resource in rank order, each product up to its maximum demand, until the resource runs out.",
            "**Compute total contribution and profit**, remembering that fixed costs are unaffected by the mix.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why the highest-contribution product is often not first",
          md: "Because contribution per **unit** and contribution per **hour** answer different questions. A product earning £60 of contribution but needing 4 hours returns £15 an hour; one earning £30 in 1.5 hours returns £20 an hour. With hours scarce, the second is better — the business can make more of them. Whenever a scenario gives you an obviously high-contribution product that is also slow, expect it to rank **last**, and expect that to be the point of the question.",
        },
        {
          kind: "example",
          title: "Working an optimal plan",
          scenario:
            "Marden Ltd makes four products, all using the same skilled labour, of which only 9,000 hours are available next quarter. Per unit: P sells at £70, variable cost £46, 1.5 labour hours; Q sells at £120, variable cost £72, 4.0 hours; R sells at £45, variable cost £27, 0.75 hours; S sells at £95, variable cost £71, 1.0 hour. Maximum demand is 2,000 P, 1,200 Q, 3,000 R and 1,500 S. Fixed costs are £95,000 a quarter. A customer then offers to buy 400 extra units of Q at the normal price.",
          steps: [
            { label: "Confirm labour is binding", detail: "Hours to meet full demand: P 2,000 × 1.5 = 3,000; Q 1,200 × 4.0 = 4,800; R 3,000 × 0.75 = 2,250; S 1,500 × 1.0 = 1,500. Total 11,550 hours against 9,000 available — a shortfall of 2,550 hours, so labour binds and a ranking is needed." },
            { label: "Contribution per unit", detail: "P: £70 − £46 = £24. Q: £120 − £72 = £48. R: £45 − £27 = £18. S: £95 − £71 = £24." },
            { label: "Contribution per labour hour, and rank", detail: "P: £24/1.5 = £16.00. Q: £48/4.0 = £12.00. R: £18/0.75 = £24.00. S: £24/1.0 = £24.00. Ranking: R and S equal first at £24, then P at £16, then Q LAST at £12 — despite Q having by far the highest contribution per unit." },
            { label: "Allocate the 9,000 hours", detail: "R (3,000 units × 0.75) = 2,250 hours, leaving 6,750. S (1,500 × 1.0) = 1,500 hours, leaving 5,250. P (2,000 × 1.5) = 3,000 hours, leaving 2,250. Q gets the remaining 2,250 hours / 4.0 = 562 units of the 1,200 demanded." },
            { label: "Compute contribution and profit", detail: "R 3,000 × £18 = £54,000; S 1,500 × £24 = £36,000; P 2,000 × £24 = £48,000; Q 562 × £48 = £26,976. Total contribution £164,976, less fixed costs £95,000 = profit £69,976." },
            { label: "Answer the extra-Q question properly", detail: "There are no spare hours, so 400 more units of Q (1,600 hours) can only come from DISPLACING something. Q returns £12 an hour and the marginal product currently made is Q itself — so the extra units would displace Q already planned, achieving nothing. Accepting means either turning down higher-ranked work at £16-£24 an hour to earn £12, or buying more labour: worth paying up to £12 an hour ABOVE the normal rate for extra hours used on Q, and more if used on the better products." },
          ],
          result:
            "**R 3,000, S 1,500, P 2,000, Q 562** — contribution £164,976 and profit **£69,976**. Q has the highest contribution per unit at £48 and ranks **last** at £12 an hour, which is the whole lesson; and the extra order should be **declined** unless more labour can be obtained.",
        },
      ],
      check: {
        q: "Product J earns £60 contribution using 4 machine hours; product K earns £30 using 1.5 hours. Machine hours are scarce. Which ranks higher?",
        options: [
          "J, with the higher contribution per unit",
          "K, returning £20 per hour against J's £15",
          "They rank equally",
          "J, unless demand for K is higher",
        ],
        correct: 1,
        explain:
          "K. Contribution per HOUR is what matters when hours are scarce: K returns £30/1.5 = £20 against J's £60/4 = £15. J's higher contribution per UNIT is irrelevant, because the constraint is hours and K generates more contribution from each one.",
      },
    },
    {
      id: "limits-and-throughput",
      heading: "Limitations, and the throughput comparison",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "Limiting factor analysis against throughput accounting",
          md: "The two methods look identical — rank by return per unit of the scarce resource — but they **deduct different costs**, so they can rank products differently. **Limiting factor** ranks by **contribution**: price less materials, labour and variable overhead. **Throughput** (chapter 8) ranks by **throughput**: price less **materials only**, treating labour and overhead as fixed. Where labour content varies materially between products the orders diverge, and a question may give figures designed to produce exactly that. So read which basis is asked for, and if a question asks you to compare the two, the point being tested is usually that **throughput favours products with high labour content**, because it does not charge them for it.",
        },
        {
          kind: "list",
          title: "Assumptions and limitations",
          items: [
            "**Only one resource is scarce.** Two or more binding constraints require linear programming (chapter 15).",
            "**Fixed costs are unaffected** by the mix chosen — untrue if a product carries a specific fixed cost, which should then be deducted from its contribution.",
            "**Contribution per unit is constant**, so no discounts and no learning effect.",
            "**Products are independent**: making less of one does not reduce demand for another. Where products are complements, ranking can destroy sales elsewhere.",
            "**Output is divisible** — the method happily recommends 562 units, whereas a real batch size may not allow it.",
            "**Qualitative factors sit outside the ranking**: a key customer's product may have to be made whatever its rank, and dropping a product may lose a relationship or a market position.",
            "**It is short-run.** The right long-run response to a binding constraint is usually to **remove it** — buy capacity, subcontract, or work overtime — not to optimise around it forever.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The most valuable answer is usually about relaxing the constraint",
          md: "Ranking optimises within the constraint; it does not question the constraint. So an answer that also asks **how much extra capacity is worth** is worth more marks. The rule is that extra units of the scarce resource are worth the **contribution per unit of the marginal product** — the one being made last — so in the example above an extra labour hour earns £12 while Q is marginal, and Marden should pay up to £12 an hour **above** the normal rate for it. Once Q's full demand is met, the next hour is worth nothing, because there is nothing left to make. That figure is the **shadow price**, which chapter 16 develops properly.",
        },
      ],
      check: {
        q: "In an optimal plan the marginal product earns £9 contribution per scarce labour hour. What is an extra hour worth?",
        options: [
          "£9 in total",
          "Up to £9 above the normal wage rate, until the marginal product's demand is satisfied",
          "The average contribution per hour across all products",
          "Nothing, since the plan is already optimal",
        ],
        correct: 1,
        explain:
          "Up to £9 ABOVE the normal rate — the contribution the marginal product generates per hour. Once that product's full demand is met the next hour is worth nothing, because there is nothing further to make. This is the shadow price of the constraint.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Ranking by contribution per unit.",
      fix: "Rank by contribution per unit of the LIMITING FACTOR.",
    },
    {
      trap: "Ranking without checking the resource is actually binding.",
      fix: "Compare total requirement for full demand with availability first. No shortfall means no ranking problem.",
    },
    {
      trap: "Using the method when two resources are short.",
      fix: "Two or more binding constraints need linear programming.",
    },
    {
      trap: "Treating limiting factor and throughput rankings as interchangeable.",
      fix: "Contribution deducts labour and variable overhead; throughput does not. The orders can differ.",
    },
    {
      trap: "Stopping at the optimal plan.",
      fix: "Say what extra capacity is worth — the marginal product's contribution per unit of the resource.",
    },
  ],
  keyTerms: [
    { term: "Limiting factor", def: "A resource whose availability is less than that needed to meet maximum demand, and which therefore binds." },
    { term: "Contribution per unit of limiting factor", def: "Contribution per unit divided by the scarce resource used per unit; the ranking basis." },
    { term: "Marginal product", def: "The product being made last in the optimal plan, whose return sets the value of extra capacity." },
    { term: "Shadow price", def: "The value of one extra unit of a binding constraint — the marginal product's contribution per unit of it." },
  ],
  summary: [
    "Confirm the resource binds and that only one is short before ranking.",
    "Rank by contribution per unit of the limiting factor, not per unit of product.",
    "Allocate in rank order up to each product's maximum demand.",
    "The rankings can differ from throughput accounting, which deducts materials only.",
    "Extra capacity is worth the marginal product's contribution per unit of the scarce resource, and nothing once its demand is met.",
  ],
  knowledgeDiagnostic: [
    { q: "What two checks come before ranking?", a: "That the resource genuinely binds — total requirement for full demand exceeds availability — and that only one resource is short." },
    { q: "Why can the highest-contribution product rank last?", a: "Because it may consume so much of the scarce resource that its contribution per hour or kilogram is the lowest." },
    { q: "How does this differ from throughput ranking?", a: "Contribution deducts labour and variable overhead; throughput deducts materials only, so throughput favours labour-intensive products." },
    { q: "What is an extra unit of the scarce resource worth?", a: "The marginal product's contribution per unit of that resource, and nothing once the marginal product's demand is fully met." },
  ],
}

export const PM_TREE_AREA_C_PART2: StudyChapter[] = [PM_TREE_13, PM_TREE_14]
