import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area C, first part — relevant costing and cost-volume-profit analysis.
 * Chapters 11–13 of the PM reading tree, mapped to syllabus groups C1–C2.
 *
 * ── The hardest habit to break in the whole paper ─────────────
 * Relevant costing is where candidates lose marks by doing MORE work than the question
 * asks: they cost the labour that would be paid anyway, depreciate the machine, absorb the
 * overhead, and reach a confident wrong answer. So chapter 11 is built as an exclusion
 * exercise — it spends as much space on what to LEAVE OUT as on what to include, because
 * that is where the marks are.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 11 · C1 ──────────────────────────────────────────── */

export const PM_TREE_11: StudyChapter = {
  id: "PM-11",
  number: 11,
  paper: "PM",
  area: "C",
  title: "Relevant costing",
  minutes: 18,
  syllabusRefs: ["C1(a)", "C1(b)", "C1(c)"],
  intro:
    "A relevant cost is future, incremental and cash. Everything else — the machine already bought, the salary already committed, the overhead already absorbed — is irrelevant, and putting it in is the commonest way to get a decision wrong.",
  outcomes: [
    "State the three tests a cost must pass to be relevant",
    "Identify sunk, committed and non-cash costs and exclude them",
    "Determine the relevant cost of materials, labour and machinery",
    "Explain and apply opportunity cost",
    "Build a relevant cost statement for a decision",
  ],
  sections: [
    {
      id: "the-tests",
      heading: "The three tests, and what fails them",
      blocks: [
        {
          kind: "definition",
          term: "Relevant cost",
          md: "A cost that is **future**, **incremental** and **cash**. All three must hold. *Future*, because the past cannot be changed by a decision taken now. *Incremental*, because only a cost that **differs between the alternatives** can affect which is better. *Cash*, because a bookkeeping entry that moves no money changes nothing.",
        },
        {
          kind: "table",
          caption: "What each test excludes",
          head: ["Test", "Excludes", "Example"],
          rows: [
            ["**Future**", "**Sunk costs** — already incurred, whatever happens next", "Development already spent, market research already commissioned, material already bought"],
            ["**Incremental**", "**Committed costs** — will be incurred either way — and **absorbed** or apportioned overhead", "A supervisor's salary that will be paid whichever option is chosen; a share of factory rent"],
            ["**Cash**", "**Non-cash items**", "Depreciation, amortisation, notional interest, an internal charge between divisions"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The one thing that is relevant but is not a cash outflow",
          md: "**Opportunity cost** — the benefit forgone by using a resource in this decision rather than its best alternative use. It passes all three tests, because the cash the alternative would have generated is future, incremental and real. It is also the item most often *omitted*, so the two failure modes are symmetrical: candidates put in depreciation, which does not belong, and leave out opportunity cost, which does.",
        },
        {
          kind: "table",
          caption: "The relevant cost of MATERIALS",
          head: ["Situation", "Relevant cost"],
          rows: [
            ["Not in stock", "**Current purchase price** — the cash that must be spent"],
            ["In stock and **used regularly**", "**Replacement cost**, because using it here means buying more"],
            ["In stock, **not** used again, and **can be sold**", "**Net realisable value** — the sale forgone"],
            ["In stock, **not** used again, **no alternative use**", "**Nil** — the cost is sunk. But add any **disposal cost saved** as a benefit if using it avoids paying to scrap it"],
          ],
        },
        {
          kind: "table",
          caption: "The relevant cost of LABOUR",
          head: ["Situation", "Relevant cost"],
          rows: [
            ["**Spare capacity**, workers paid anyway", "**Nil** — the wage is committed"],
            ["Must be **hired**", "The **incremental wage** paid"],
            ["**Overtime** required", "The **overtime premium** as well as the basic rate"],
            ["**Taken from other work**", "The wage **plus the contribution forgone** on the work displaced — the opportunity cost"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Machinery: never depreciation",
          md: "The relevant cost of using a machine is **not** its depreciation, and never its net book value. If the machine is **already owned and has no alternative use**, the relevant cost of using it is **nil**. If it would otherwise be **sold**, the relevant cost is the **sale proceeds forgone**. If it would otherwise be **hired out**, the relevant cost is the **hire income forgone**. If it must be **bought or hired** for the decision, the relevant cost is what is paid. Depreciation and NBV are accounting allocations of a **past** purchase, so they fail the future and cash tests both.",
        },
        {
          kind: "example",
          title: "Building a relevant cost statement",
          scenario:
            "Thurleigh Ltd has been asked to quote for a one-off contract. Material P: 400 kg needed; 250 kg is in stock, bought at £14/kg, used regularly, current price £17/kg. Material Q: 300 kg needed, all in stock, bought at £9/kg, no other use, and would cost £600 in total to dispose of if not used; it cannot be sold. Labour: 500 skilled hours at £18/hour — the workforce is fully occupied and would be moved off other work that earns £11 contribution per hour after labour cost; 300 unskilled hours at £12/hour, and there is spare unskilled capacity. A specialist machine already owned would be used; it could otherwise be hired out for £2,400 during the contract period. Fixed overhead is absorbed at £6 per skilled labour hour. £8,000 has already been spent on a feasibility study.",
          steps: [
            { label: "Material P", detail: "Used REGULARLY, so using stock means replacing it: value all 400 kg at REPLACEMENT cost of £17. 400 x £17 = £6,800. The £14 historic cost is sunk and irrelevant." },
            { label: "Material Q", detail: "In stock, NO other use and cannot be sold, so the purchase cost is SUNK — relevant cost nil. But using it AVOIDS the £600 disposal cost, so that is a relevant BENEFIT: include (£600) as a saving." },
            { label: "Skilled labour", detail: "Fully occupied, so taken from other work: relevant cost is the wage PLUS the contribution forgone. The £11 is contribution AFTER labour cost, so total = 500 x (£18 + £11) = 500 x £29 = £14,500. Reading the £11 as already including labour and using only £11 is the classic error." },
            { label: "Unskilled labour", detail: "SPARE capacity, so the wage is committed and would be paid anyway. Relevant cost NIL. Not £3,600." },
            { label: "The machine", detail: "Already owned, but hiring out is forgone: relevant cost is the £2,400 hire income lost. NOT depreciation, and not net book value." },
            { label: "Fixed overhead and the feasibility study", detail: "Absorbed overhead of £6 per hour is an APPORTIONMENT, not incremental — exclude. The £8,000 study is SUNK — exclude. Both are included by candidates far more often than they are excluded." },
            { label: "Total the statement", detail: "Material P £6,800 + Material Q (£600) + skilled labour £14,500 + unskilled nil + machine £2,400 = £23,100. That is the minimum price at which the contract leaves Thurleigh no worse off." },
          ],
          result:
            "**£23,100.** Note what was excluded and why: £8,000 sunk study, £3,600 of committed unskilled wages, £3,000 of absorbed overhead, and any depreciation — around £14,600 of cost that a full-costing approach would have added, and which would have made a profitable contract look marginal.",
        },
      ],
      check: {
        q: "A contract needs 200 skilled hours. The workforce is fully occupied on work earning £14 contribution per hour after labour cost of £20. What is the relevant labour cost?",
        options: ["£2,800", "£4,000", "£6,800", "£2,800 plus overtime premium"],
        correct: 2,
        explain:
          "£6,800 — 200 × (£20 wage + £14 contribution forgone). The labour must be PAID and the displaced work's contribution is LOST, so both are relevant. Because the £14 is stated as contribution AFTER labour cost, adding the two is correct; using £14 alone, or £20 alone, is the classic error.",
      },
    },
    {
      id: "minimum-price",
      heading: "Using relevant cost, and where it stops",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "What a relevant cost total actually tells you",
          md: "It gives the **minimum price** at which the organisation is no worse off for taking the work — the point of indifference, not a price to quote. So a relevant cost statement answers \"what is the floor?\", and the actual quote depends on the market, the customer relationship, spare capacity and whether the price will set a precedent. An answer that presents the relevant cost as the price to charge has stopped one step early.",
        },
        {
          kind: "list",
          title: "Where relevant costing must be used with care",
          items: [
            "**It is short-run.** Fixed costs excluded as committed are only committed for now; a business pricing every contract at relevant cost never covers them and eventually fails.",
            "**Precedent.** A price accepted once is hard to raise, and other customers find out.",
            "**Spare capacity is temporary.** Labour idle this month may not be next, so the nil relevant cost expires.",
            "**Qualitative factors** sit outside the numbers: reputation, the customer's importance, the effect on staff of displacing other work, and whether accepting crowds out better work later.",
            "**Opportunity cost assumes the alternative is real.** Contribution forgone only counts if the displaced work genuinely existed and would have been done.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to present it so the marks are visible",
          md: "In Section C the workings carry as much credit as the answer, so **show every line, including the ones valued at nil, with a one-line reason**. \"Unskilled labour — nil, spare capacity\" earns the mark that omitting the line silently does not. The same applies to the sunk study: writing \"feasibility study — excluded, sunk\" demonstrates the judgement, whereas leaving it out looks indistinguishable from forgetting it.",
        },
      ],
      check: {
        q: "Material in stock cost £5,000, has no alternative use, cannot be sold, and would cost £400 to dispose of. What is its relevant cost if used?",
        options: ["£5,000", "Nil", "A benefit of £400", "£5,400"],
        correct: 2,
        explain:
          "A BENEFIT of £400. The £5,000 purchase cost is SUNK and the material cannot be sold, so it has no opportunity cost — but using it AVOIDS the £400 disposal cost, which is a future incremental cash saving and therefore relevant. It reduces the contract's relevant cost.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Including absorbed or apportioned fixed overhead.",
      fix: "It is not incremental. Only overhead that genuinely changes because of the decision is relevant.",
    },
    {
      trap: "Including depreciation or net book value for a machine.",
      fix: "Both allocate a PAST purchase. Use sale proceeds or hire income forgone, or nil if there is no alternative use.",
    },
    {
      trap: "Costing labour that has spare capacity.",
      fix: "Nil — the wage is committed. Only hires, overtime premium, or displaced contribution are relevant.",
    },
    {
      trap: "Omitting the contribution forgone when labour is taken off other work.",
      fix: "Wage PLUS contribution forgone. Check whether the stated contribution is before or after labour cost.",
    },
    {
      trap: "Valuing regularly used stock at its historic cost.",
      fix: "Replacement cost, because using it means buying more.",
    },
    {
      trap: "Presenting relevant cost as the price to quote.",
      fix: "It is the minimum price — the floor. The quote depends on market, precedent and capacity.",
    },
  ],
  keyTerms: [
    { term: "Relevant cost", def: "A cost that is future, incremental and cash." },
    { term: "Sunk cost", def: "A cost already incurred, which no future decision can change." },
    { term: "Committed cost", def: "A cost that will be incurred whichever alternative is chosen." },
    { term: "Opportunity cost", def: "The benefit forgone by using a resource here rather than in its best alternative use." },
    { term: "Replacement cost", def: "The relevant cost of material used regularly, because consuming stock means buying more." },
    { term: "Minimum price", def: "The relevant cost total — the price at which the organisation is no worse off for taking the work." },
  ],
  summary: [
    "A relevant cost is future, incremental and cash; sunk, committed and non-cash items all fail.",
    "Opportunity cost is relevant and is the item most often omitted.",
    "Material is valued at replacement cost if used regularly, net realisable value if saleable, nil if neither.",
    "Labour with spare capacity is nil; labour taken from other work costs its wage plus contribution forgone.",
    "A machine's relevant cost is the sale or hire income forgone, never depreciation, and the total gives a minimum price rather than a quote.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three tests for a relevant cost.", a: "It must be future, incremental and cash — all three." },
    { q: "How is material in regular use valued, and why?", a: "At replacement cost, because using existing stock means buying more." },
    { q: "What is the relevant cost of an owned machine that could be hired out?", a: "The hire income forgone — never its depreciation or net book value." },
    { q: "What does a relevant cost total tell you?", a: "The minimum price at which the organisation is no worse off, not the price to quote — which also depends on market, precedent and capacity." },
    { q: "Why show lines valued at nil?", a: "Because in Section C the reasoning earns the marks, and stating \"nil, spare capacity\" proves judgement where omitting the line looks like forgetting it." },
  ],
}

/* ── Chapter 12 · C2, single product ──────────────────────────── */

export const PM_TREE_12: StudyChapter = {
  id: "PM-12",
  number: 12,
  paper: "PM",
  area: "C",
  title: "Cost-volume-profit analysis: a single product",
  minutes: 16,
  syllabusRefs: ["C2(a)", "C2(b)"],
  intro:
    "Four formulas, all built from contribution, that answer how much must be sold to break even, to hit a target, and how much room there is before a loss starts.",
  outcomes: [
    "Calculate contribution per unit and the contribution to sales ratio",
    "Calculate the breakeven point in units and in revenue",
    "Calculate the margin of safety and interpret it",
    "Calculate the volume needed for a target profit",
    "Explain the assumptions of CVP analysis and their consequences",
  ],
  sections: [
    {
      id: "the-formulas",
      heading: "The calculations",
      blocks: [
        {
          kind: "formula",
          name: "The CVP set",
          expr: "Contribution per unit  =  Selling price  −  Variable cost per unit\n\nC/S ratio  =  Contribution per unit  ÷  Selling price\n\nBreakeven units  =  Fixed costs  ÷  Contribution per unit\n\nBreakeven revenue  =  Fixed costs  ÷  C/S ratio\n\nUnits for target profit  =  (Fixed costs  +  Target profit)  ÷  Contribution per unit\n\nMargin of safety (units)  =  Budgeted sales  −  Breakeven sales\n\nMargin of safety (%)  =  Margin of safety (units)  ÷  Budgeted sales  ×  100",
          note: "Everything divides fixed cost by a measure of contribution. Divide by contribution PER UNIT to get units; divide by the C/S RATIO to get revenue. The margin of safety percentage is expressed on BUDGETED sales, not on breakeven — dividing by the wrong denominator is a frequent slip.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "What the margin of safety is actually telling you",
          md: "It is a **risk** measure, not a profit measure: the percentage by which sales could fall before the business makes a loss. A margin of safety of 40% is comfortable; 5% means a small downturn produces a loss. That makes it the natural figure to quote when a scenario asks how risky a plan is — and it is more informative than the breakeven point alone, because breakeven means nothing without knowing how far above it the business expects to trade.",
        },
        {
          kind: "example",
          title: "Working the full set",
          scenario:
            "Cranfield Ltd sells one product at £48. Variable costs are materials £16, labour £9 and variable overhead £5. Fixed costs are £392,000 a year. Budgeted sales are 28,000 units. The board wants a target profit of £150,000, and separately asks what happens to breakeven if a proposed automation project raises fixed costs by £80,000 while cutting variable labour to £4.",
          steps: [
            { label: "Contribution per unit and the C/S ratio", detail: "Variable cost = £16 + £9 + £5 = £30. Contribution = £48 − £30 = £18 per unit. C/S ratio = £18/£48 = 0.375, or 37.5%." },
            { label: "Breakeven", detail: "Units: £392,000 / £18 = 21,778 units (round UP — 21,777 units makes a small loss). Revenue: £392,000 / 0.375 = £1,045,333, which checks against 21,778 × £48 = £1,045,344, the difference being the rounding." },
            { label: "Margin of safety", detail: "28,000 − 21,778 = 6,222 units. As a percentage of BUDGETED sales: 6,222 / 28,000 = 22.2%. So sales could fall by a fifth before Cranfield makes a loss." },
            { label: "Volume for the target profit", detail: "(£392,000 + £150,000) / £18 = £542,000 / £18 = 30,111 units — which is 2,111 units ABOVE budget, so the target is not achievable on current plans without extra volume or a better margin." },
            { label: "Test the automation proposal", detail: "New contribution = £48 − (£16 + £4 + £5) = £23. New fixed costs = £392,000 + £80,000 = £472,000. New breakeven = £472,000 / £23 = 20,522 units — LOWER than before, and the margin of safety rises to (28,000 − 20,522)/28,000 = 26.7%." },
            { label: "Say what the change means for risk, not just for breakeven", detail: "Breakeven falls and the margin of safety improves, so at budgeted volume automation is better. But OPERATING GEARING has risen — fixed costs are now a larger share, so profit is more sensitive to volume in BOTH directions. At 28,000 units profit rises from £112,000 to £172,000; but each unit lost now costs £23 of profit rather than £18." },
          ],
          result:
            "Breakeven **21,778 units / £1,045,333**, margin of safety **22.2%**, target profit needs **30,111 units** — above budget. Automation **lowers** breakeven to 20,522 units, but the higher **operating gearing** means the plan is more profitable *and* more volatile, which is the point worth making rather than the breakeven figure alone.",
        },
      ],
      check: {
        q: "Fixed costs are £360,000, price £40 and variable cost £25. Budgeted sales are 30,000 units. What is the margin of safety percentage?",
        options: ["20.0%", "24,000 units", "80.0%", "16.7%"],
        correct: 0,
        explain:
          "20.0%. Contribution is £15, so breakeven is £360,000/£15 = 24,000 units. Margin of safety is 30,000 − 24,000 = 6,000 units, expressed on BUDGETED sales: 6,000/30,000 = 20%. Dividing by breakeven instead gives 25% — the frequent slip.",
      },
    },
    {
      id: "assumptions",
      heading: "The assumptions, and why they matter",
      blocks: [
        {
          kind: "list",
          title: "What CVP analysis assumes",
          items: [
            "**Selling price is constant** at all volumes — so no bulk discounts and no price cut to shift extra units, which contradicts the demand curve in chapter 17.",
            "**Variable cost per unit is constant**, so no learning effect (chapter 22) and no quantity discounts on materials.",
            "**Fixed costs are constant** over the whole range, ignoring stepped fixed costs.",
            "**Costs are either fixed or variable**, with nothing genuinely semi-variable.",
            "**Everything produced is sold**, so inventory does not change.",
            "**A single product**, or an unchanging sales mix (chapter 13).",
            "**Efficiency and productivity are unchanged** whatever the volume.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Which assumption to attack, and how",
          md: "An answer that lists all seven earns less than one that says which **matters here**. Constant selling price is the most commonly violated, because selling substantially more usually requires a price cut — and once price falls, contribution per unit falls and breakeven rises, so the extra volume may not help at all. **Stepped fixed costs** are the next: if the plan needs a second supervisor or a second machine beyond a certain volume, breakeven has to be computed for each step separately. And **constant mix** is the assumption that quietly breaks in multi-product analysis, which is why chapter 13 exists.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The breakeven chart, and what to put on it",
          md: "A breakeven chart plots **revenue** and **total cost** against volume, with breakeven where they cross and the **margin of safety** shown as the gap between breakeven and budgeted volume. A **profit-volume chart** plots profit directly against volume as a single line, starting at minus fixed cost and crossing zero at breakeven — usually the clearer of the two, because the profit at any volume can be read off without subtracting. The gradient of that line is the **C/S ratio**, which is worth stating if asked to interpret one.",
        },
      ],
      check: {
        q: "A plan requires selling 40% more units. Which CVP assumption most threatens the analysis?",
        options: [
          "That all output is sold",
          "That selling price is constant — a large volume increase usually needs a price cut, which lowers contribution and raises breakeven",
          "That costs are either fixed or variable",
          "That efficiency is unchanged",
        ],
        correct: 1,
        explain:
          "CONSTANT SELLING PRICE. Shifting substantially more volume normally requires a lower price, which cuts contribution per unit and RAISES breakeven — so the extra volume may not improve profit at all. Naming the assumption that matters beats listing all of them.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Rounding breakeven units down.",
      fix: "Round UP. A fraction below breakeven still makes a loss.",
    },
    {
      trap: "Expressing the margin of safety on breakeven sales.",
      fix: "It is expressed on BUDGETED sales.",
    },
    {
      trap: "Dividing fixed cost by the C/S ratio to get units.",
      fix: "The C/S ratio gives REVENUE; contribution per unit gives UNITS.",
    },
    {
      trap: "Listing all the assumptions without saying which bites.",
      fix: "Name the one the scenario violates — usually constant price, stepped fixed costs, or constant mix.",
    },
    {
      trap: "Reporting that automation lowers breakeven and stopping.",
      fix: "Higher fixed costs raise operating gearing, so profit becomes more sensitive to volume in both directions.",
    },
  ],
  keyTerms: [
    { term: "Contribution", def: "Selling price less variable cost, the amount each unit contributes to fixed costs and profit." },
    { term: "C/S ratio", def: "Contribution divided by selling price; used to convert fixed cost into breakeven REVENUE." },
    { term: "Breakeven point", def: "Fixed costs divided by contribution per unit, rounded up." },
    { term: "Margin of safety", def: "The amount by which budgeted sales exceed breakeven, expressed on budgeted sales — a risk measure." },
    { term: "Operating gearing", def: "The proportion of fixed to variable cost; higher gearing makes profit more sensitive to volume." },
    { term: "Profit-volume chart", def: "Profit plotted directly against volume, starting at minus fixed cost with gradient equal to the C/S ratio." },
  ],
  summary: [
    "Contribution is price less variable cost; the C/S ratio is contribution divided by price.",
    "Breakeven units divide fixed cost by contribution per unit; breakeven revenue divides by the C/S ratio.",
    "The margin of safety measures risk, and is expressed on budgeted sales.",
    "Target profit volume adds the target to fixed costs before dividing.",
    "CVP assumes constant price, constant unit variable cost, constant fixed cost and constant mix — and the one that bites should be named.",
  ],
  knowledgeDiagnostic: [
    { q: "How do breakeven units and breakeven revenue differ in calculation?", a: "Units divide fixed cost by contribution per unit; revenue divides fixed cost by the C/S ratio." },
    { q: "What does the margin of safety measure, and on what base?", a: "How far sales could fall before a loss, expressed as a percentage of BUDGETED sales." },
    { q: "Why should a breakeven improvement from automation be qualified?", a: "Because higher fixed costs raise operating gearing, making profit more sensitive to volume in both directions." },
    { q: "Which CVP assumption is most often violated by a volume-growth plan?", a: "Constant selling price — extra volume usually needs a price cut, which reduces contribution and raises breakeven." },
  ],
}

export const PM_TREE_AREA_C_PART1: StudyChapter[] = [PM_TREE_11, PM_TREE_12]
