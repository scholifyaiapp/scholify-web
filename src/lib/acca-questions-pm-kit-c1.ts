import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-pm-kit-builders"

/*
 * PM · Area C question kit, first part — chapters 11 to 15.
 *
 * Relevant costing, CVP for a single product and for many, limiting factors, and linear
 * programming formulation and graphical solution.
 *
 * Numeric entry throughout where the skill is the calculation. The MCQs are reserved for
 * the decisions candidates get wrong for a reason worth naming: including a sunk cost,
 * ranking on contribution per unit instead of per limiting factor, reversing an
 * inequality, or quoting a weighted average contribution derived from the wrong weights.
 *
 * Authored, applied, exam-standard at PM's uniform 2 marks. Original Scholify content.
 */

/* ── Chapter 11 · Relevant costing ── */

const CH11: AccaQuestion[] = [
  q("PMK-11-01", "PM-11", "C", "easy",
    "A company has already spent £42,000 on market research for a proposed product. How should this be treated in deciding whether to launch?",
    [
      "Included in full as a cost of the product",
      "Excluded entirely — it is a sunk cost and cannot be changed by the decision",
      "Included at half, as an apportionment",
      "Included only if the product is launched",
    ],
    1,
    "EXCLUDED. The £42,000 is spent whichever way the decision goes, so it cannot influence which option is better. A relevant cost must be FUTURE, INCREMENTAL and CASH — a sunk cost fails the first test, and including it is the most common error in the topic."),

  num("PMK-11-02", "PM-11", "C", "medium",
    "A contract needs 400 kg of material X. The company has 250 kg in stock, bought at £14 per kg, which has no other use and would otherwise be sold for scrap at £3 per kg. Further kg cost £16 to buy. What is the relevant cost of material X for the contract, in £?",
    3150, "£", 1,
    "The 250 kg in stock: its relevant cost is the £3 per kg scrap proceeds FORGONE = £750, not the £14 historical cost, which is sunk. The 150 kg to be bought: 150 × £16 = £2,400. Total relevant cost = £750 + £2,400 = £3,150."),

  num("PMK-11-03", "PM-11", "C", "medium",
    "A contract needs 300 kg of material Y, all of which is in stock at a book cost of £22 per kg. Material Y is in regular use and would be replaced at the current price of £27 per kg. What is the relevant cost, in £?",
    8100, "£", 1,
    "300 × £27 = £8,100. Where material is in REGULAR USE, taking it for the contract means it must be replaced, so the relevant cost is the REPLACEMENT price. Book cost is irrelevant. Contrast this with material that has no other use, where the relevant cost is the scrap value forgone."),

  q("PMK-11-04", "PM-11", "C", "medium",
    "Which is the one thing that is a relevant cost but is NOT a cash outflow?",
    [
      "Depreciation on the machine used",
      "The opportunity cost of a resource diverted from another use",
      "Apportioned head office overhead",
      "A committed lease payment",
    ],
    1,
    "OPPORTUNITY COST — the benefit forgone by not using a resource in its next-best way. No cash leaves the business, but the contribution given up is a genuine cost of the decision. Depreciation is never relevant; apportioned overhead and a committed payment fail the incremental test."),

  num("PMK-11-05", "PM-11", "C", "hard",
    "A job requires 60 hours of skilled labour. The workforce is fully employed on other work generating a contribution of £11 per labour hour after their £18 hourly wage. Taking the job means diverting them, and their wage will be paid either way. What is the relevant labour cost of the job, in £?",
    1740, "£", 1,
    "The wage is paid either way, but taking the job costs the £11 per hour of contribution the workers were earning elsewhere PLUS the £18 wage that the job now bears rather than the other work: 60 × (£11 + £18) = £1,740. Equivalently, the relevant cost is the £18 paid plus the £11 forgone. Where labour has SPARE capacity, the relevant cost would be nil."),

  q("PMK-11-06", "PM-11", "C", "medium",
    "How should DEPRECIATION on machinery used for a contract be treated in a relevant cost statement?",
    [
      "Included at the annual charge",
      "Excluded — it is not a cash flow. Any relevant machinery cost is the fall in the machine's resale value or the incremental running cost",
      "Included at half the annual charge",
      "Included only under absorption costing",
    ],
    1,
    "EXCLUDED, because it is an accounting allocation of a past cash outflow. If using the machine on the contract reduces what it could be sold for, THAT fall is relevant; so is any extra running or maintenance cost caused by the contract. Depreciation itself never is."),

  num("PMK-11-07", "PM-11", "C", "medium",
    "A special order will use 120 machine hours. The machine has spare capacity, and incremental power and maintenance cost £4.50 per hour. Fixed overhead is absorbed at £26 per machine hour. What is the relevant machine cost of the order, in £?",
    540, "£", 1,
    "120 × £4.50 = £540. Only the INCREMENTAL running cost is relevant. The £26 absorbed fixed overhead is an apportionment of costs that will be incurred whether or not the order is taken, so including it — which would give £3,120 — would wrongly make the order look unattractive."),

  multi("PMK-11-08", "PM-11", "C", "medium",
    "Which of the following are relevant to a decision? Select TWO.",
    [
      "Committed costs under a signed non-cancellable contract",
      "Incremental fixed costs caused specifically by the decision",
      "Historical cost of material already purchased and in regular use",
      "The contribution forgone from the alternative use of a scarce resource",
    ],
    [1, 3],
    "INCREMENTAL FIXED COSTS and OPPORTUNITY COST. Fixed costs are not automatically irrelevant — a fixed cost incurred BECAUSE of the decision is relevant. Committed costs and historical costs both fail the test, though note that material in regular use is relevant at REPLACEMENT price rather than at historical cost."),

  q("PMK-11-09", "PM-11", "C", "hard",
    "A relevant cost analysis shows a special order would generate £14,000 more cash than it costs. What does this tell management?",
    [
      "The order will increase reported profit by £14,000",
      "Accepting is better than rejecting by £14,000 in cash terms, but the figure says nothing about whether the price sets a precedent, offends existing customers, or uses capacity a better order might need",
      "The order's price is correct",
      "The order should be repeated annually",
    ],
    1,
    "IT RANKS THE TWO OPTIONS BY £14,000 AND NOTHING MORE. Relevant costing answers one narrow question. Precedent, existing customers' reaction, and the opportunity cost of committing capacity are all outside it — and in a Section C answer those qualitative points carry marks of their own."),

  num("PMK-11-10", "PM-11", "C", "hard",
    "A special order requires: material in stock, no other use, scrap value £900; 80 hours of labour with spare capacity paid £16 an hour; 40 machine hours at £6 incremental cost; a specialist tool costing £1,200 that has no other use; and apportioned fixed overhead of £3,400. What is the total relevant cost of the order, in £?",
    2340, "£", 1,
    "Material £900 (scrap forgone) + labour NIL (spare capacity, the wage is paid anyway) + machine 40 × £6 = £240 + tool £1,200 (incremental and specific) + apportioned overhead NIL = £2,340. Three of the five figures given are traps, which is what makes this a two-mark question rather than an arithmetic exercise."),

  q("PMK-11-11", "PM-11", "C", "medium",
    "In what circumstance is the relevant cost of labour NIL?",
    [
      "When labour is paid a fixed salary",
      "When there is spare labour capacity, so the wage is paid whether or not the work is done and no other work is displaced",
      "When labour is highly skilled",
      "Never — labour is always a relevant cost",
    ],
    1,
    "WHERE THERE IS SPARE CAPACITY AND NOTHING IS DISPLACED. The wage is being paid anyway and no contribution is forgone, so the decision causes no additional cost. If instead the workers must be diverted from other work, the forgone contribution becomes relevant."),

  q("PMK-11-12", "PM-11", "C", "hard",
    "Which is a valid limitation of relevant costing that an answer should state?",
    [
      "It cannot handle opportunity costs",
      "It is a SHORT-TERM technique: repeatedly pricing at relevant cost fails to recover fixed costs, and it ignores strategic and qualitative consequences",
      "It requires absorption costing to be abandoned",
      "It cannot be used where there is a scarce resource",
    ],
    1,
    "IT IS SHORT-TERM AND NARROW. A one-off order priced above relevant cost adds cash; a pricing POLICY built on relevant cost never recovers the fixed cost base. And the technique is silent on precedent, customer relationships and strategic fit, which frequently decide the answer."),
]

/* ── Chapter 12 · CVP: a single product ── */

const CH12: AccaQuestion[] = [
  num("PMK-12-01", "PM-12", "C", "easy",
    "A product sells for £48 with variable cost £30. Fixed costs are £216,000. What is the breakeven point in units?",
    12000, "units", 1,
    "Contribution per unit = £48 − £30 = £18. Breakeven = £216,000/£18 = 12,000 units. The contribution per unit is always the first figure to compute — every other CVP measure depends on it."),

  num("PMK-12-02", "PM-12", "C", "easy",
    "A product sells for £48 with variable cost £30. What is the contribution to sales (C/S) ratio, as a percentage?",
    37.5, "%", 0.05,
    "£18/£48 = 37.5%. The C/S ratio is contribution as a proportion of SELLING PRICE, and it converts a revenue figure into a contribution figure — which is how breakeven revenue and multi-product analysis are computed."),

  num("PMK-12-03", "PM-12", "C", "medium",
    "Fixed costs are £216,000 and the C/S ratio is 37.5%. What is the breakeven point in sales REVENUE, in £?",
    576000, "£", 1,
    "£216,000/0.375 = £576,000. Check it against the unit answer: 12,000 units × £48 = £576,000 ✓. Dividing fixed costs by the C/S ratio gives revenue; dividing by contribution per unit gives units."),

  num("PMK-12-04", "PM-12", "C", "medium",
    "A company budgets to sell 15,000 units. Its breakeven point is 12,000 units. What is the margin of safety, as a percentage of budgeted sales? Give your answer to one decimal place.",
    20, "%", 0.05,
    "(15,000 − 12,000)/15,000 = 20.0%. The margin of safety says how far sales can fall before a loss begins — so 20% means a fifth of budgeted volume can be lost before the company is in trouble, which is a risk measure rather than a profitability one."),

  num("PMK-12-05", "PM-12", "C", "medium",
    "A product has contribution of £18 per unit and fixed costs of £216,000. How many units must be sold to achieve a target profit of £90,000?",
    17000, "units", 1,
    "(£216,000 + £90,000)/£18 = 17,000 units. Target profit volume adds the required profit to the fixed costs before dividing — the profit is treated exactly like an additional fixed cost that must be covered."),

  q("PMK-12-06", "PM-12", "C", "medium",
    "Which of the following is NOT an assumption of CVP analysis?",
    [
      "Selling price per unit is constant at all volumes",
      "Variable cost per unit is constant at all volumes",
      "Fixed costs may step up at higher volumes",
      "Sales volume equals production volume, so there is no inventory movement",
    ],
    2,
    "CVP assumes fixed costs are CONSTANT over the relevant range — a step in fixed cost breaks the model and is not one of its assumptions. The other three are all assumptions, and the constant-selling-price one is usually the weakest, since selling more normally requires a lower price."),

  num("PMK-12-07", "PM-12", "C", "hard",
    "A product sells for £75 with variable cost £45. Fixed costs are £378,000. The company wants a profit equal to 12% of sales revenue. How many units must it sell?",
    18000, "units", 1,
    "Required profit = 12% × £75 = £9 per unit, so the contribution left to cover fixed costs is £30 − £9 = £21 per unit. Units = £378,000/£21 = 18,000. Check: revenue £1,350,000, contribution £540,000, less fixed £378,000 = £162,000 profit = 12% of £1,350,000 ✓."),

  q("PMK-12-08", "PM-12", "C", "medium",
    "What does the margin of safety tell management that the breakeven point alone does not?",
    [
      "The level of fixed costs",
      "How much the budgeted or actual sales level exceeds breakeven, and therefore how much risk there is in the plan",
      "The contribution per unit",
      "The optimum selling price",
    ],
    1,
    "HOW MUCH ROOM THERE IS BEFORE A LOSS. Breakeven is a point; the margin of safety measures the distance between it and where sales are expected to be, which is what makes it a RISK measure. Two products with identical breakeven points can carry very different risk."),

  num("PMK-12-09", "PM-12", "C", "medium",
    "Fixed costs are £294,000, the selling price is £52 and variable cost is £31. If fixed costs rise by £42,000, by how many units does the breakeven point increase?",
    2000, "units", 1,
    "Contribution = £21. Original breakeven = £294,000/£21 = 14,000 units; new = £336,000/£21 = 16,000 units. The increase is 2,000 units — which is simply £42,000/£21, since each extra pound of fixed cost needs one more unit's worth of contribution to cover it."),

  q("PMK-12-10", "PM-12", "C", "hard",
    "On a breakeven chart, what does the vertical distance between the sales revenue line and the total cost line represent at a given volume?",
    [
      "The contribution at that volume",
      "The profit or loss at that volume",
      "The fixed cost",
      "The margin of safety",
    ],
    1,
    "PROFIT OR LOSS. Revenue less TOTAL cost is profit. The gap between the revenue line and the VARIABLE cost line is contribution, and the margin of safety is a horizontal distance along the volume axis — three different distances on the same chart, which is why chart questions are worth reading carefully."),

  num("PMK-12-11", "PM-12", "C", "hard",
    "A company sells 24,000 units at £36, with variable cost £22.50 and fixed costs £270,000. Management proposes cutting the price to £33 to raise volume to 30,000 units. What is the change in profit, in £? Give a fall as a negative number.",
    -9000, "£", 1,
    "Current: 24,000 × £13.50 = £324,000 contribution, less £270,000 = £54,000 profit. Proposed: contribution £33 − £22.50 = £10.50 × 30,000 = £315,000, less £270,000 = £45,000. Change = −£9,000, a FALL. Volume rose 25% but contribution per unit fell 22%, and the volume gain did not cover it."),

  q("PMK-12-12", "PM-12", "C", "medium",
    "Which CVP assumption is most vulnerable to attack in a Section C answer, and why?",
    [
      "That costs can be split into fixed and variable, because cost behaviour is rarely so clean",
      "That the selling price is constant at all volumes, because selling substantially more usually requires a lower price — which is the whole basis of the demand curve in chapter 17",
      "That inventory does not change",
      "That fixed costs are known with certainty",
    ],
    1,
    "THE CONSTANT SELLING PRICE. It contradicts the paper's own pricing chapter: if demand slopes downward, the extra volume that takes a company past breakeven can normally only be won at a lower price, so the linear revenue line is the model's weakest element. All four are legitimate criticisms, but this one has the most force."),
]

/* ── Chapter 13 · CVP: multiple products ── */

const CH13: AccaQuestion[] = [
  q("PMK-13-01", "PM-13", "C", "medium",
    "Why is there no single breakeven point for a multi-product company?",
    [
      "Because fixed costs cannot be measured",
      "Because breakeven depends on the SALES MIX, and a different mix gives a different breakeven volume and revenue",
      "Because contribution cannot be computed per product",
      "Because products share variable costs",
    ],
    1,
    "BECAUSE IT DEPENDS ON THE MIX. Selling the same total units in a richer mix breaks even sooner. So a multi-product breakeven figure is only valid FOR A STATED MIX, and saying so is part of the answer."),

  num("PMK-13-02", "PM-13", "C", "medium",
    "Products A and B sell in a 3:1 volume mix, with contributions of £8 and £20 per unit. What is the weighted average contribution per unit, in £?",
    11, "£ per unit", 0.01,
    "(3 × £8 + 1 × £20)/4 = £44/4 = £11.00. The weights are the MIX ratio, not the number of products — the simple average of £14 is the classic wrong answer and would understate the breakeven point badly."),

  num("PMK-13-03", "PM-13", "C", "medium",
    "Products A and B sell in a 3:1 mix with contributions of £8 and £20. Fixed costs are £33,000. What is the breakeven point in TOTAL units?",
    3000, "units", 1,
    "Weighted average contribution = £11. Breakeven = £33,000/£11 = 3,000 total units, being 2,250 of A and 750 of B. Using the simple average of £14 would give 2,357 units and understate the requirement by more than 600 units."),

  num("PMK-13-04", "PM-13", "C", "medium",
    "A company sells three products with total budgeted contribution of £840,000 on total budgeted revenue of £2,400,000. Fixed costs are £630,000. What is the breakeven revenue, in £?",
    1800000, "£", 1,
    "Weighted average C/S ratio = £840,000/£2,400,000 = 35%. Breakeven revenue = £630,000/0.35 = £1,800,000. Working in revenue with a weighted average C/S ratio is usually quicker than working in units when there are several products."),

  q("PMK-13-05", "PM-13", "C", "hard",
    "A multi-product breakeven chart is drawn with products in order of DECREASING C/S ratio. What does the resulting shape show?",
    [
      "A single straight contribution line",
      "A concave contribution line whose gradient falls as each less profitable product is added, giving the EARLIEST possible breakeven point",
      "A convex line giving the latest breakeven point",
      "A horizontal line at the level of fixed costs",
    ],
    1,
    "A CONCAVE LINE AND THE EARLIEST BREAKEVEN. Selling the most profitable products first recovers fixed cost fastest. Reversing the order gives the LATEST breakeven, and the two together bracket the range within which the actual breakeven point must lie — which is the chart's real value."),

  q("PMK-13-06", "PM-13", "C", "medium",
    "A multi-product breakeven chart shows two breakeven points when products are plotted in different orders. What is the correct interpretation?",
    [
      "One of the calculations must be wrong",
      "Both are real: they show the earliest and latest points at which breakeven could occur depending on the order in which products sell, so the actual point depends on the mix achieved",
      "The average of the two is the breakeven point",
      "The chart cannot be used with more than one product",
    ],
    1,
    "BOTH ARE REAL, and they bracket the answer. The earliest assumes the best products sell first, the latest assumes the worst do. Management's useful conclusion is that mix, not just volume, determines when the company starts making money."),

  num("PMK-13-07", "PM-13", "C", "hard",
    "Products P, Q and R sell in a 5:3:2 volume mix with contributions of £6, £15 and £24 respectively. Fixed costs are £246,000. What is the breakeven point in total units?",
    20000, "units", 1,
    "Weighted average contribution = (5 × £6 + 3 × £15 + 2 × £24)/10 = (£30 + £45 + £48)/10 = £123/10 = £12.30. Breakeven = £246,000/£12.30 = 20,000 total units, comprising 10,000 P, 6,000 Q and 4,000 R. Divide by the SUM of the mix weights, which is 10 here, not by the number of products."),

  num("PMK-13-08", "PM-13", "C", "medium",
    "Total budgeted contribution is £840,000, total budgeted revenue £2,400,000 and fixed costs £630,000. Budgeted revenue is £2,400,000. What is the margin of safety as a percentage of budgeted revenue? Give your answer to one decimal place.",
    25, "%", 0.05,
    "Breakeven revenue = £630,000/0.35 = £1,800,000. Margin of safety = (£2,400,000 − £1,800,000)/£2,400,000 = 25.0%. Note the margin of safety can be expressed in units, revenue or as a percentage, and the percentage is the one that allows comparison between products or periods."),

  q("PMK-13-09", "PM-13", "C", "medium",
    "A company's sales mix shifts towards its lowest-margin product while total volume is unchanged. What happens to the breakeven point?",
    [
      "It falls, because volume is unchanged",
      "It rises, because the weighted average contribution per unit falls so more units are needed to cover fixed costs",
      "It is unchanged, because fixed costs are unchanged",
      "It cannot be determined",
    ],
    1,
    "IT RISES. The weighted average contribution per unit falls, so each unit sold contributes less towards the same fixed cost and more units are needed. This is the same mechanism as the adverse sales mix variance in Area D, viewed through CVP."),

  multi("PMK-13-10", "PM-13", "C", "medium",
    "Which of the following are TRUE of multi-product CVP analysis? Select TWO.",
    [
      "It requires the sales mix to be assumed constant",
      "It produces a single breakeven point valid for any mix",
      "Working in revenue with a weighted average C/S ratio avoids the need for a unit mix",
      "It cannot accommodate more than three products",
    ],
    [0, 2],
    "IT ASSUMES A CONSTANT MIX, and WORKING IN REVENUE avoids needing a unit mix. The breakeven point is mix-dependent, not universal, and there is no limit on the number of products — the weighted average simply has more terms."),

  num("PMK-13-11", "PM-13", "C", "hard",
    "A company sells 8,000 units of X at £40 (variable cost £25) and 12,000 units of Y at £30 (variable cost £21). Fixed costs are £171,000. What is the breakeven point in total units?",
    15000, "units", 1,
    "Total contribution = (8,000 × £15) + (12,000 × £9) = £120,000 + £108,000 = £228,000 over 20,000 units, so the weighted average is £11.40. Breakeven = £171,000/£11.40 = 15,000 total units, being 6,000 of X and 9,000 of Y in the budgeted 2:3 mix. Deriving the weighted average from the BUDGETED totals is quicker than working from the mix ratio."),

  q("PMK-13-12", "PM-13", "C", "medium",
    "What does the multi-product breakeven CHART show that the arithmetic does not?",
    [
      "The exact breakeven point",
      "The RANGE within which breakeven falls, and how much of total profit comes from which products — so it shows which products actually carry the company",
      "The level of fixed costs",
      "The contribution per unit of each product",
    ],
    1,
    "THE RANGE, AND WHERE THE PROFIT COMES FROM. The chart's gradient changes at each product, so it shows visually that a small number of products may generate most of the contribution — information a single weighted average figure conceals entirely."),
]

/* ── Chapter 14 · Limiting factors ── */

const CH14: AccaQuestion[] = [
  num("PMK-14-01", "PM-14", "C", "easy",
    "A product has a contribution of £45 per unit and uses 3 kg of a scarce material. What is its contribution per kg of the limiting factor, in £?",
    15, "£ per kg", 0.01,
    "£45/3 kg = £15 per kg. This is the ranking measure whenever a single resource is scarce: what matters is the contribution earned per unit of the SCARCE resource, not per unit of product."),

  q("PMK-14-02", "PM-14", "C", "medium",
    "Product J has a contribution of £60 per unit and uses 5 hours of the scarce resource; product K has a contribution of £28 and uses 2 hours. Which should be made first?",
    [
      "J, because its contribution per unit is higher",
      "K, at £14 per hour against J's £12",
      "J, because it uses more of the scarce resource",
      "Either — the ranking is the same either way",
    ],
    1,
    "K, at £14 per scarce hour against J's £12. Ranking on contribution per UNIT puts J first and is wrong. This reversal is the single most examinable point in the chapter, and it is the same logic as throughput per bottleneck hour in chapter 8."),

  num("PMK-14-03", "PM-14", "C", "medium",
    "There are 4,000 kg of scarce material. Product A (contribution £15 per kg of material, 2 kg per unit) has maximum demand of 1,200 units, and product B earns £11 per kg. How many kg remain for B after satisfying A's maximum demand?",
    1600, "kg", 1,
    "A's maximum demand uses 1,200 × 2 kg = 2,400 kg, leaving 4,000 − 2,400 = 1,600 kg for B. The method is: rank by contribution per limiting factor, then allocate to maximum demand in rank order until the resource runs out."),

  num("PMK-14-04", "PM-14", "C", "hard",
    "A company has 5,400 machine hours. Product X: contribution £36, 2 hours each, demand 1,500 units. Product Y: contribution £45, 3 hours each, demand 1,400 units. What is the maximum total contribution achievable, in £?",
    90000, "£", 1,
    "X earns £36/2 = £18 per hour; Y earns £45/3 = £15. So make X first: 1,500 units × 2 = 3,000 hours, contribution £54,000. Remaining hours 2,400, so Y = 2,400/3 = 800 units × £45 = £36,000. Total £90,000. Y's demand is only part-met, which is what makes it the marginal product."),

  q("PMK-14-05", "PM-14", "C", "medium",
    "Which of the following is an assumption of limiting factor analysis?",
    [
      "There is more than one binding constraint",
      "Only ONE resource is scarce; if two or more bind simultaneously, linear programming is required",
      "Contribution per unit varies with volume",
      "Fixed costs change with the product mix",
    ],
    1,
    "ONLY ONE SCARCE RESOURCE. The ranking method works because there is a single denominator to rank by; with two binding constraints a product can rank first on one and last on the other, which is exactly why linear programming exists (chapter 15)."),

  q("PMK-14-06", "PM-14", "C", "hard",
    "In a limiting factor question, what is usually the most valuable part of the answer?",
    [
      "The optimal production plan itself",
      "What could be done to RELAX the constraint — overtime, outsourcing, an additional machine, or a supplier for the scarce material — and what that would be worth",
      "The contribution per unit of each product",
      "The list of assumptions",
    ],
    1,
    "HOW TO RELAX THE CONSTRAINT, and what relaxing it is worth. The optimal plan makes the best of a fixed limitation; the more valuable management question is whether the limitation needs to exist. That is the same insight as 'elevate the constraint' in the theory of constraints, and it is where the shadow price of chapter 16 becomes the price worth paying."),

  num("PMK-14-07", "PM-14", "C", "medium",
    "A product sells for £84 with variable costs of £48 and requires 1.5 kg of a material limited to 9,000 kg. Demand is unlimited. What is the maximum contribution obtainable, in £?",
    216000, "£", 1,
    "Contribution per unit = £36, per kg = £36/1.5 = £24. With 9,000 kg available and unlimited demand, maximum contribution = 9,000 × £24 = £216,000, from 6,000 units. Computing it as contribution per kg times kg available is quicker than finding the unit volume first."),

  multi("PMK-14-08", "PM-14", "C", "medium",
    "Which of the following are limitations of limiting factor analysis? Select TWO.",
    [
      "It cannot rank products",
      "It assumes contribution per unit is constant, so it ignores that selling more may require a lower price",
      "It cannot be used in service businesses",
      "It ignores qualitative factors such as the need to supply a full product range to key customers",
    ],
    [1, 3],
    "CONSTANT CONTRIBUTION PER UNIT, and IGNORING QUALITATIVE FACTORS. Both matter in practice: the optimal plan may require dropping a product a major customer expects to be able to buy, which can cost far more than the contribution the plan gains."),

  q("PMK-14-09", "PM-14", "C", "medium",
    "How does limiting factor analysis differ from throughput accounting in its treatment of labour?",
    [
      "They treat it identically",
      "Limiting factor analysis deducts labour in computing contribution; throughput accounting treats it as a fixed operating expense and deducts only material",
      "Throughput accounting deducts labour twice",
      "Limiting factor analysis ignores labour",
    ],
    1,
    "LIMITING FACTOR DEDUCTS LABOUR; THROUGHPUT DOES NOT. That single difference can reverse a ranking, so a question must be read for which basis it wants. Throughput's justification is that in the short run the workforce is paid whether the bottleneck runs or not."),

  num("PMK-14-10", "PM-14", "C", "hard",
    "Three products compete for 12,000 labour hours. P: contribution £24, 1.5 hours, demand 3,000. Q: contribution £30, 2.5 hours, demand 2,000. R: contribution £14, 1 hour, demand 4,000. What is the maximum total contribution, in £?",
    170000, "£", 1,
    "Contribution per hour: P £24/1.5 = £16, Q £30/2.5 = £12, R £14/1 = £14 — so rank P, R, Q. P takes 3,000 × 1.5 = 4,500 hours for £72,000. R takes 4,000 × 1 = 4,000 hours for £56,000. That leaves 3,500 hours, giving Q 3,500/2.5 = 1,400 units for £42,000. Total = £170,000, with Q's demand only 70% met. Note Q has the HIGHEST unit contribution and comes last."),

  q("PMK-14-11", "PM-14", "C", "medium",
    "A company identifies that skilled labour is its limiting factor. Which action would NOT relax the constraint?",
    [
      "Paying overtime",
      "Recruiting and training additional staff",
      "Reducing the selling price to increase demand",
      "Subcontracting part of the work",
    ],
    2,
    "REDUCING THE PRICE. Extra demand is the last thing a capacity-constrained company needs — it cannot satisfy the demand it already has. Overtime, recruitment and subcontracting all add capacity; a price cut adds pressure to a constraint while giving away contribution."),

  q("PMK-14-12", "PM-14", "C", "hard",
    "Why is the product with the HIGHEST contribution per unit often not made first?",
    [
      "Because it is usually the most expensive to make",
      "Because it may consume disproportionately more of the scarce resource, so it earns less per unit of that resource than a product with a lower unit contribution",
      "Because demand for it is usually lower",
      "Because fixed costs must be covered first",
    ],
    1,
    "BECAUSE IT MAY CONSUME MORE OF THE SCARCE RESOURCE. What is being maximised is contribution from a fixed quantity of the constrained resource, so the ranking must be per unit of that resource. A £60 contribution over 5 hours loses to a £28 contribution over 2."),
]

/* ── Chapter 15 · Linear programming: formulation and graphical solution ── */

const CH15: AccaQuestion[] = [
  q("PMK-15-01", "PM-15", "C", "medium",
    "When is linear programming needed rather than limiting factor analysis?",
    [
      "Whenever there is more than one product",
      "When TWO OR MORE resources are scarce simultaneously, so no single denominator can rank the products",
      "When contribution per unit is unknown",
      "When demand is unlimited",
    ],
    1,
    "WHEN TWO OR MORE CONSTRAINTS BIND AT ONCE. Limiting factor ranking needs a single scarce resource to rank by; with two, a product can rank first on one and last on the other, so the optimum must be found by considering both together."),

  q("PMK-15-02", "PM-15", "C", "medium",
    "A company maximises contribution of £14x + £22y. Which is the correct form of a constraint stating that machine time of 3 hours per x and 5 hours per y cannot exceed 4,500 hours?",
    ["3x + 5y ≥ 4,500", "3x + 5y ≤ 4,500", "3x + 5y = 4,500", "5x + 3y ≤ 4,500"],
    1,
    "3x + 5y ≤ 4,500. A resource limit is a LESS-THAN-OR-EQUAL constraint: the plan may use less than the available hours but cannot use more. Reversing the inequality — a very common slip — turns a capacity limit into a minimum production requirement."),

  q("PMK-15-03", "PM-15", "C", "medium",
    "Which of the following would be expressed as a GREATER-than-or-equal constraint?",
    [
      "Available material of 8,000 kg",
      "A contractual obligation to supply at least 500 units of product X",
      "Maximum market demand for product Y of 3,000 units",
      "Available labour of 12,000 hours",
    ],
    1,
    "A MINIMUM SUPPLY OBLIGATION. 'At least 500' is x ≥ 500. Resource availability and maximum demand are both upper limits and therefore ≤. Getting the direction right is worth doing carefully, because a reversed inequality produces a feasible region in the wrong place."),

  q("PMK-15-04", "PM-15", "C", "medium",
    "Which sequence describes the five steps of linear programming formulation?",
    [
      "Draw the graph, define variables, solve, interpret, check",
      "Define the variables, state the objective function, state the constraints including non-negativity, graph the feasible region, then find the optimal vertex",
      "State the constraints, define the objective, solve algebraically, draw the graph, interpret",
      "Rank products by contribution, allocate resources, graph, solve, interpret",
    ],
    1,
    "DEFINE VARIABLES, OBJECTIVE, CONSTRAINTS (with non-negativity), GRAPH, OPTIMISE. Defining the variables precisely — including their units and time period — comes first because everything else is written in terms of them, and a vague definition produces constraints that cannot be checked."),

  q("PMK-15-05", "PM-15", "C", "hard",
    "Why is the optimal solution to a linear programming problem always at a VERTEX of the feasible region?",
    [
      "Because the constraints are linear",
      "Because the objective function is linear, so moving along any edge of the region changes the objective monotonically — the best point on an edge is therefore at one of its ends",
      "Because the feasible region is always a triangle",
      "Because non-negativity constraints exclude the interior",
    ],
    1,
    "BECAUSE THE OBJECTIVE IS LINEAR, so it improves continuously in one direction along any edge and its best value on an edge must be at an endpoint. This is why the solution method is to identify the vertices and evaluate the objective at each — an interior point can never beat the boundary."),

  num("PMK-15-06", "PM-15", "C", "hard",
    "Two constraints bind at the optimum: 2x + 4y = 40 and 5x + 3y = 60. Solve for x.",
    8.571428571, "units", 0.01,
    "From the first, x = 20 − 2y. Substituting: 5(20 − 2y) + 3y = 60, so 100 − 10y + 3y = 60, giving 7y = 40 and y = 5.714. Then x = 20 − 2(5.714) = 8.571. Solving the two binding constraints simultaneously is how the optimal vertex is found precisely — reading it off a graph is not accurate enough for the marks."),

  num("PMK-15-07", "PM-15", "C", "hard",
    "The optimum is x = 8.571 and y = 5.714 units. Contribution is £14 per x and £22 per y. What is the total contribution, in £ to the nearest pound?",
    246, "£", 1,
    "(8.571 × £14) + (5.714 × £22) = £120.00 + £125.71 = £245.71, so £246 to the nearest pound. Always compute the objective at the vertex you have identified — and if the question offers several vertices, evaluate the objective at each rather than assuming the one furthest from the origin wins."),

  multi("PMK-15-08", "PM-15", "C", "medium",
    "Which are practical points that earn or lose marks in a linear programming answer? Select TWO.",
    [
      "Defining the decision variables with their units and time period",
      "Drawing the graph in colour",
      "Stating the non-negativity constraints explicitly",
      "Using a computer package rather than a graph",
    ],
    [0, 2],
    "PRECISE VARIABLE DEFINITIONS and EXPLICIT NON-NEGATIVITY constraints. Both are marks routinely dropped: 'let x = product X' is not a definition, and omitting x, y ≥ 0 leaves the formulation incomplete even though the graph implies it."),

  q("PMK-15-09", "PM-15", "C", "medium",
    "A linear programming solution gives x = 8.571 units. What should an answer say about this?",
    [
      "Round to 9 units, since fractional units cannot be made",
      "Acknowledge the divisibility assumption: if the product is genuinely indivisible, the solution must be tested at feasible integer points, since rounding may breach a constraint",
      "The solution is invalid and must be recomputed",
      "Fractional solutions are always acceptable",
    ],
    1,
    "ACKNOWLEDGE DIVISIBILITY AND TEST INTEGER POINTS. Rounding UP may breach a constraint and rounding DOWN may not be optimal, so the correct treatment is to test the feasible integer combinations near the vertex. The assumption is genuinely harmless for continuous outputs like litres and genuinely material for whole machines."),

  q("PMK-15-10", "PM-15", "C", "hard",
    "Which linear programming assumption most often fails in practice?",
    [
      "That the objective is to maximise contribution",
      "LINEARITY — that contribution per unit and resource usage per unit stay constant at all volumes, when in reality bulk discounts, learning effects and price reductions all break it",
      "That resources are limited",
      "That there are only two products",
    ],
    1,
    "LINEARITY. Contribution per unit falls if extra volume needs a lower price; resource usage per unit falls as learning takes effect; material cost per unit falls with bulk discounts. Each makes the true relationship curved, so the model's answer is an approximation over a range rather than a universal optimum."),

  q("PMK-15-11", "PM-15", "C", "medium",
    "In a two-product graphical solution, how is the optimal vertex identified?",
    [
      "It is always the vertex furthest from the origin",
      "By sliding the objective function line outwards until it last touches the feasible region, or by evaluating the objective at each vertex and choosing the best",
      "It is where the two steepest constraints cross",
      "It is the midpoint of the feasible region",
    ],
    1,
    "SLIDE THE ISO-CONTRIBUTION LINE, or evaluate every vertex. The vertex furthest from the origin is not necessarily optimal — it depends on the objective function's gradient, which is why the iso-contribution line's slope matters and why evaluating each vertex is the safer method under exam pressure."),

  q("PMK-15-12", "PM-15", "C", "medium",
    "A formulation includes the constraint 'y ≤ 1,200' where y is units of product Y. What does this most likely represent?",
    [
      "A minimum contractual supply",
      "Maximum market demand for Y",
      "The contribution per unit of Y",
      "A non-negativity requirement",
    ],
    1,
    "MAXIMUM MARKET DEMAND. A constraint on a single variable with no resource coefficients is a demand or policy limit rather than a resource constraint — and it is worth including, because a solution that produces more than the market will buy is not a solution."),
]

export const PM_KIT_AREA_C_PART1: AccaQuestion[] = [...CH11, ...CH12, ...CH13, ...CH14, ...CH15]
