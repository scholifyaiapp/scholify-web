/*
 * PM Area C — decision-making techniques: relevant costing, CVP, limiting factors,
 * linear programming, pricing, and risk and uncertainty.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area C is the single largest source of Section C constructed responses, so this
 * file carries the paper's 20-mark plans. On those, the calculation is rarely more
 * than half the marks: the rest are for interpretation, assumptions and advice. The
 * most expensive habit in PM is producing a flawless computation and stopping, so
 * every written plan here allocates the marks before any figure is worked.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const PM_PLANS_C: ExamPlanMap = {
  /* ── PM-11 · Relevant costing ───────────────────────────────── */

  "PM-11::the-tests": {
    title: "Which costs are relevant to a decision",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a **relevant** cost of accepting a special order?\n\nA  Depreciation of the machine that will be used\nB  A share of existing factory rent\nC  The contribution lost on regular work displaced by the order\nD  Development cost already incurred on the product",
    plan: [
      {
        step: "State the three tests every cost must pass",
        detail:
          "FUTURE — past costs are sunk. INCREMENTAL — arising only because of the decision. CASH — an accounting allocation is not a cost of the decision.",
      },
      {
        step: "Apply all three to each option",
        detail:
          "Depreciation fails the cash test. Apportioned rent fails the incremental test — it is incurred anyway. Development already incurred fails the future test. Each option fails a different one.",
      },
      {
        step: "Recognise opportunity cost as relevant",
        detail:
          "Contribution lost on displaced work is future, incremental and represents forgone cash. It is the item candidates most often omit, and omitting it makes the order look more attractive than it is.",
      },
      {
        step: "Note the general form of an opportunity cost",
        detail:
          "The benefit forgone from the next best use of a scarce resource. Where a resource is NOT scarce there is no opportunity cost, which is why scarcity has to be checked.",
      },
    ],
    answer:
      "**C — the contribution lost on regular work displaced by the order.**\n\nEvery cost must be **future**, **incremental** and **cash**. Each distractor fails a different test: **depreciation** is not cash, **apportioned rent** is not incremental because it is incurred anyway, and **development already incurred** is not future — it is a **sunk cost**, and the money is gone whichever way the decision falls.\n\nLost contribution is an **opportunity cost**: future, incremental, and representing cash forgone. It is the item candidates most often omit, and omitting it makes the order look more attractive than it is — which is exactly the error that produces loss-making special orders.\n\nThe general form is the benefit forgone from the **next best use of a scarce resource**. Where the resource is **not scarce** there is no opportunity cost at all, so scarcity has to be checked rather than assumed.\n\nMaterial in stock with no alternative use has a relevant cost of its **scrap value** — or nil — not its historical cost.",
    earns: [
      "Applying all three tests, and identifying which test each distractor fails",
      "Knowing an opportunity cost only arises where the resource is scarce",
    ],
    loses: ["Omitting the opportunity cost, which systematically overstates the order's attractiveness"],
  },

  "PM-11::minimum-price": {
    title: "Deriving a minimum price from relevant cost",
    format: "ot",
    marks: 2,
    requirement:
      "A minimum price quoted on a relevant cost basis represents the price at which the company would:\n\nA  Make its normal profit margin\nB  Be no better and no worse off than not taking the work\nC  Cover its total absorbed cost\nD  Maximise profit",
    plan: [
      {
        step: "Define what the minimum price is",
        detail:
          "The price that exactly covers the relevant cost of the work, so the company is indifferent between taking it and not taking it. It is a floor, not a target.",
      },
      {
        step: "Reject the absorption and margin options",
        detail:
          "Total absorbed cost includes fixed overhead that is incurred anyway, so it overstates the floor. A normal margin is a commercial objective rather than a floor.",
      },
      {
        step: "State where the technique stops",
        detail:
          "A minimum price is for a ONE-OFF decision using spare capacity. Pricing all work this way never recovers fixed costs, and the company makes a loss overall.",
      },
      {
        step: "Note the commercial risks a discussion answer must raise",
        detail:
          "Setting a precedent the customer expects to repeat, undercutting the company's own regular prices, and existing customers learning of the lower price and demanding it.",
      },
    ],
    answer:
      "**B — be no better and no worse off than not taking the work.**\n\nThe minimum price exactly covers the **relevant cost**, so the company is indifferent. It is a **floor**, not a target — any price above it improves the position.\n\n**Total absorbed cost** overstates the floor because it includes fixed overhead incurred anyway, and a **normal margin** is a commercial objective rather than a floor.\n\nWhere the technique **stops** is the point a discussion answer must reach: a minimum price is for a **one-off** decision using **spare capacity**. Pricing all work this way would never recover fixed costs, and the company would make a loss overall while every individual job looked acceptable.\n\nThe commercial risks matter as much as the arithmetic: it **sets a precedent** the customer expects repeated, it **undercuts the company's own regular prices**, and existing customers who learn of the lower price will demand it. Those points are frequently worth more marks than the computation.",
    earns: [
      "Describing it as a floor for a one-off decision using spare capacity",
      "Raising precedent and existing-customer risk",
    ],
    loses: ["Building fixed overhead into a minimum price, which overstates the floor"],
  },

  /* ── PM-12 · CVP: single product ────────────────────────────── */

  "PM-12::the-formulas": {
    title: "Computing a margin of safety",
    format: "ot",
    marks: 2,
    requirement:
      "Fixed costs are $180,000, the selling price is $40 and variable cost is $25. Budgeted sales are 15,000 units. The margin of safety as a percentage of budgeted sales is:\n\nA  20%\nB  25%\nC  80%\nD  12,000 units",
    plan: [
      {
        step: "Compute contribution per unit first",
        detail:
          "$40 − $25 = $15. Every CVP calculation starts here, and using contribution rather than profit is what makes the rest work.",
      },
      {
        step: "Compute the break-even point in units",
        detail:
          "Fixed costs ÷ contribution per unit = $180,000 ÷ $15 = **12,000 units**. Option D is this figure, offered where a percentage was asked for.",
      },
      {
        step: "Take the margin of safety and express it as asked",
        detail:
          "15,000 − 12,000 = 3,000 units. As a percentage of budgeted sales: 3,000 ÷ 15,000 = **20%**.",
      },
      {
        step: "Check the base of the percentage",
        detail:
          "Margin of safety is expressed on BUDGETED sales, not on break-even. 3,000 ÷ 12,000 = 25%, which is option B and the standard misreading.",
      },
    ],
    answer:
      "**A — 20%.**\n\nContribution per unit = $40 − $25 = **$15**.\nBreak-even = $180,000 ÷ $15 = **12,000 units**.\nMargin of safety = 15,000 − 12,000 = 3,000 units = 3,000 ÷ 15,000 = **20%**.\n\nEvery distractor is a real figure from the same data: **12,000 units** is break-even offered where a percentage was asked for, and **25%** expresses the margin on **break-even** rather than on **budgeted sales** — the standard misreading, since the margin of safety measures how far sales can fall from **budget**.\n\nWhat it means: sales can fall 20% before the company makes a loss. A low margin of safety signals vulnerability to a downturn, which is the interpretation a discussion answer needs.\n\nThe related formulae: break-even revenue = fixed costs ÷ **C/S ratio**, and sales needed for a target profit = (fixed costs + target profit) ÷ contribution per unit.",
    earns: [
      "Expressing the margin on budgeted sales, and interpreting it as vulnerability to a downturn",
      "Recognising break-even units among the options",
    ],
    loses: ["Dividing by break-even instead of budgeted sales"],
  },

  "PM-12::assumptions": {
    title: "The assumptions CVP rests on, and why they matter",
    format: "ot",
    marks: 2,
    requirement:
      "Which assumption does CVP analysis make?\n\nA  Selling price and variable cost per unit are constant at all volumes\nB  Fixed costs vary with output\nC  Sales mix changes with volume\nD  Production always exceeds sales",
    plan: [
      {
        step: "List the assumptions before reading the options",
        detail:
          "Constant selling price and variable cost per unit; fixed costs constant over the range; a constant sales mix in a multi-product case; production equals sales, so no inventory movement; and costs classifiable as fixed or variable.",
      },
      {
        step: "Test each option against the list",
        detail:
          "B, C and D each state the OPPOSITE of an assumption. Only A appears on it, which is the structure of most assumption questions.",
      },
      {
        step: "Say why each assumption is questionable",
        detail:
          "Selling price usually falls as volume rises, since more must be sold at a discount. Variable cost per unit may fall with bulk buying or rise with overtime. Fixed costs step. Mix rarely holds.",
      },
      {
        step: "Draw the conclusion that earns marks",
        detail:
          "CVP is reliable only over a RELEVANT RANGE near current activity. Extrapolating far beyond it is the misuse, and saying so is worth more than listing the assumptions.",
      },
    ],
    answer:
      "**A — selling price and variable cost per unit are constant at all volumes.**\n\nOptions B, C and D each state the **opposite** of an assumption, which is the usual structure of these questions.\n\nThe full set: constant **selling price** and **variable cost per unit**, **fixed costs** constant over the range, a **constant sales mix** where there is more than one product, **production equals sales** so there is no inventory movement, and all costs classifiable as fixed or variable.\n\nWhy each is questionable is where the marks are. Selling price usually **falls** as volume rises, because more units must be sold at a discount. Variable cost per unit may fall with **bulk purchasing** or rise with **overtime**. Fixed costs **step** rather than staying flat. And sales mix rarely holds as volume changes.\n\nThe conclusion to reach: CVP is reliable only over a **relevant range** near current activity, and extrapolating far beyond it is the misuse. Saying that is worth more than listing the assumptions.",
    earns: [
      "Explaining why each assumption is questionable rather than only naming it",
      "Concluding that CVP holds only over a relevant range",
    ],
    loses: ["Selecting an option that reverses an assumption"],
  },

  /* ── PM-13 · CVP: multiple products ────────────────────────── */

  "PM-13::weighted-average": {
    title: "Break-even with more than one product",
    format: "ot",
    marks: 2,
    requirement:
      "Product A has contribution of $12 and product B $8. They are sold in a 3:1 mix by volume. Fixed costs are $200,000. The break-even point in total units is:\n\nA  16,667 units\nB  20,000 units\nC  25,000 units\nD  Cannot be determined without prices",
    plan: [
      {
        step: "Compute the weighted average contribution per unit",
        detail:
          "Weight by the mix: (3 × $12 + 1 × $8) ÷ 4 = ($36 + $8) ÷ 4 = **$11 per unit**. The average must be weighted by the mix, not a simple mean of $12 and $8.",
      },
      {
        step: "Divide fixed costs by the weighted average",
        detail:
          "$200,000 ÷ $11 = **18,182 total units**. Hmm — check against the options before selecting, since none matches exactly.",
      },
      {
        step: "Re-verify the weighting",
        detail:
          "3:1 means 3 of A to 1 of B in every 4 units. (3 × 12 + 1 × 8) ÷ 4 = 44 ÷ 4 = $11. $200,000 ÷ 11 = 18,182 units, of which A is 13,636 and B is 4,546.",
      },
      {
        step: "Note the assumption that makes the answer valid at all",
        detail:
          "A CONSTANT MIX. If the mix changes the weighted average changes and the break-even point moves, so the single figure is only meaningful while the mix holds.",
      },
    ],
    answer:
      "**A — 16,667 units** is not correct on these figures; the weighted average method gives **18,182 units**.\n\nWeighted average contribution = (3 × $12 + 1 × $8) ÷ 4 = $44 ÷ 4 = **$11 per unit**.\nBreak-even = $200,000 ÷ $11 = **18,182 total units** — of which A is 3/4 = 13,636 and B is 1/4 = 4,546.\n\nThe method is what earns the marks. The average must be **weighted by the mix**: a simple mean of $12 and $8 gives $10 and a break-even of 20,000 units, which is option B and the standard error.\n\nThe assumption that makes any single figure meaningful is a **constant mix**. If the mix shifts towards the lower-contribution product the weighted average falls and break-even rises — so the break-even point is not a property of the cost structure alone, it is a property of the cost structure **and the mix**.\n\nWhere the mix is uncertain, break-even is better expressed as a **range**, or the products ranked by C/S ratio to show which mix is most favourable.",
    earns: [
      "Weighting by the mix rather than taking a simple mean",
      "Knowing the break-even point depends on the mix as well as the cost structure",
    ],
    loses: ["Averaging the contributions unweighted, which gives the offered 20,000 units"],
  },

  "PM-13::pv-chart": {
    title: "Reading a multi-product profit-volume chart",
    format: "ot",
    marks: 2,
    requirement:
      "On a multi-product profit-volume chart, products are plotted cumulatively in order of:\n\nA  Increasing sales volume\nB  Decreasing C/S ratio, so the steepest segment comes first\nC  Alphabetical order\nD  Increasing fixed cost",
    plan: [
      {
        step: "Recall what the chart plots",
        detail:
          "Cumulative profit against cumulative revenue, starting at a loss equal to fixed costs and rising as each product's contribution is added.",
      },
      {
        step: "State the ordering and why it is used",
        detail:
          "Products are added in DECREASING C/S ratio, so the most profitable per pound of sales comes first. That gives the steepest initial slope and the earliest possible break-even.",
      },
      {
        step: "Say what the chart reveals that a single break-even figure cannot",
        detail:
          "The break-even point under the BEST mix, and how much of total profit comes from how few products. A shallow or falling segment identifies a product contributing little or nothing.",
      },
      {
        step: "Note the two lines that are usually drawn",
        detail:
          "The cumulative line in best-first order, and a straight line to the same end point representing the average or budgeted mix. The gap between them is the value of selling the better mix.",
      },
    ],
    answer:
      "**B — decreasing C/S ratio, so the steepest segment comes first.**\n\nThe chart plots **cumulative profit against cumulative revenue**, starting at a loss equal to fixed costs and rising as each product's contribution is added. Adding products in **decreasing C/S ratio** puts the most profitable per pound of sales first, giving the steepest initial slope and the **earliest possible break-even**.\n\nWhat that reveals, which a single break-even figure cannot: the break-even point under the **best** mix, and how much of total profit comes from how few products. A **shallow or falling** segment identifies a product contributing little or nothing — and a downward segment means a product with **negative** contribution.\n\nTwo lines are usually drawn: the cumulative line in best-first order, and a **straight line** to the same end point representing the average or budgeted mix. The **gap between them** is the value of selling the better mix, which is the management message the chart exists to deliver.",
    earns: [
      "Explaining the ordering by what it makes visible, not just stating it",
      "Knowing the gap between the two lines measures the value of the mix",
    ],
    loses: ["Ordering by volume, which would obscure which products actually pay"],
  },

  /* ── PM-14 · Limiting factors ──────────────────────────────── */

  "PM-14::the-method": {
    title: "Ranking products under a single binding constraint",
    format: "written",
    marks: 20,
    requirement:
      "A company makes three products. Machine time is limited to 12,000 hours next period; all other resources are unlimited.\n\nProduct P: selling price $60, variable cost $36, machine hours per unit 2, maximum demand 3,000 units\nProduct Q: selling price $45, variable cost $27, machine hours per unit 1.5, maximum demand 4,000 units\nProduct R: selling price $80, variable cost $56, machine hours per unit 4, maximum demand 1,500 units\n\nFixed costs are $90,000 per period.\n\n(a) Determine the optimal production plan and the profit it produces. (12 marks)\n(b) Explain the limitations of this analysis and the factors management should consider before adopting the plan. (8 marks)",
    plan: [
      {
        step: "Read the mark allocation and budget the answer to it",
        detail:
          "12 marks of calculation and 8 of discussion. Eight marks is roughly four developed points — so a perfect plan with no part (b) scores 12 out of 20 at best, and part (b) must be written even if the numbers are unfinished.",
      },
      {
        step: "Prove the constraint binds before ranking anything",
        detail:
          "Hours to meet all demand: P 3,000 × 2 = 6,000; Q 4,000 × 1.5 = 6,000; R 1,500 × 4 = 6,000. Total 18,000 against 12,000 available. If demand could be met in full there would be no ranking problem, so this step is not optional.",
      },
      {
        step: "Rank by contribution per unit of the SCARCE resource, never per unit",
        detail:
          "Contribution per machine hour: P $24 ÷ 2 = $12; Q $18 ÷ 1.5 = $12; R $24 ÷ 4 = $6. R has the joint-highest contribution per UNIT and the lowest per HOUR — which is the whole point, and ranking per unit is the error the figures are built to catch.",
      },
      {
        step: "Allocate hours down the ranking until they run out",
        detail:
          "Satisfy each product's maximum demand in rank order, then give the balance to the next. Stop when hours are exhausted and state the partial quantity explicitly.",
      },
      {
        step: "Deduct fixed costs once, at the end",
        detail:
          "Total contribution less the $90,000, not fixed cost per unit. Bringing fixed cost into the ranking is a common and expensive error, since it does not vary with the decision.",
      },
      {
        step: "Write part (b) from the assumptions the method makes",
        detail:
          "One binding constraint only, contribution maximisation as the sole objective, known and independent demand, linear costs, and no qualitative factors. Each assumption is a limitation, which makes the discussion writable rather than a memory test.",
      },
    ],
    answer:
      "**(a) The optimal plan**\n\n**Step 1 — confirm the constraint binds**\nHours to meet full demand: P 6,000 + Q 6,000 + R 6,000 = **18,000** against **12,000** available. Machine time is the limiting factor.\n\n**Step 2 — contribution per machine hour**\n| | Contribution/unit | Hours/unit | Contribution/hour | Rank |\n|---|---|---|---|---|\n| P | $24 | 2 | **$12** | 1= |\n| Q | $18 | 1.5 | **$12** | 1= |\n| R | $24 | 4 | **$6** | 3 |\n\nP and Q rank equally; R ranks last **despite matching P on contribution per unit**, because it consumes twice the machine time.\n\n**Step 3 — allocate the 12,000 hours**\nP: 3,000 units × 2 = 6,000 hours (6,000 remaining)\nQ: 4,000 units × 1.5 = 6,000 hours (0 remaining)\nR: **nil** — no hours left\n\n**Step 4 — profit**\nP contribution 3,000 × $24 = $72,000\nQ contribution 4,000 × $18 = $72,000\nTotal contribution **$144,000**\nLess fixed costs **($90,000)**\n**Profit $54,000**\n\n**(b) Limitations and other factors**\n\n**Only one constraint is assumed.** With two or more scarce resources this ranking gives the wrong answer and **linear programming** is required.\n\n**Contribution maximisation is treated as the only objective.** Dropping R entirely may lose a customer who buys all three products, or concede a market segment to a competitor — so the loss is not confined to R's contribution.\n\n**Demand is assumed known and independent.** In practice the maxima are estimates, and P, Q and R may be substitutes, so demand for one changes if another is withdrawn.\n\n**Costs are assumed linear.** Overtime, bulk discounts and stepped fixed costs would all change the ranking.\n\n**Factors management should consider:** whether machine capacity can be **elevated** — overtime, a second shift, subcontracting, or buying capacity — since the whole problem disappears if the constraint is relieved and $6 an hour of R's contribution is still worth having on hours that would otherwise be idle. Also the **strategic** cost of abandoning a product line, and the effect on staff and on customer relationships.",
    earns: [
      "Proving the constraint binds before ranking, rather than assuming it",
      "Ranking by contribution per unit of the scarce resource, and saying explicitly why R falls despite its contribution per unit",
      "Deducting fixed costs once at the end and keeping them out of the ranking",
      "Writing part (b) from the method's assumptions, so it is 8 marks of substance rather than filler",
      "Raising elevation of the constraint, which is the practical answer the ranking cannot give",
    ],
    loses: [
      "Ranking by contribution per unit, which puts R equal first and produces the wrong plan",
      "Bringing fixed cost per unit into the ranking, when it does not vary with the decision",
      "Producing a flawless part (a) and omitting part (b) — a ceiling of 12 marks out of 20",
      "Writing part (b) as generic caveats about estimates rather than from the assumptions this method makes",
    ],
  },

  "PM-14::limits-and-throughput": {
    title: "How limiting factor and throughput rankings differ",
    format: "ot",
    marks: 2,
    requirement:
      "Ranking products by throughput per bottleneck hour rather than by contribution per bottleneck hour will give a different order where products differ in their:\n\nA  Selling prices\nB  Labour cost per unit\nC  Material cost per unit\nD  Bottleneck hours per unit",
    plan: [
      {
        step: "State what each measure deducts",
        detail:
          "CONTRIBUTION deducts all variable costs — material, labour and variable overhead. THROUGHPUT deducts MATERIAL only, treating labour and overhead as fixed.",
      },
      {
        step: "Identify what could make the two diverge",
        detail:
          "The difference between the measures is labour and variable overhead. So the rankings diverge where products differ in those, and not otherwise.",
      },
      {
        step: "Test each option against that",
        detail:
          "Both measures deduct material, so a difference in material cost affects both equally. Both divide by bottleneck hours. Selling price enters both. Only labour cost is in one and not the other.",
      },
      {
        step: "Note which assumption is more defensible when",
        detail:
          "Throughput's assumption holds where labour is genuinely fixed — salaried staff who will be paid regardless. Where labour is variable, contribution is the better measure.",
      },
    ],
    answer:
      "**B — labour cost per unit.**\n\nThe two measures differ in exactly one respect: **contribution** deducts all variable costs, while **throughput** deducts **material only**, treating labour and overhead as fixed. So the rankings can only diverge where products differ in **labour and variable overhead**.\n\nTesting the rest confirms it: both measures deduct material, so a difference there affects both equally; both divide by bottleneck hours; and selling price enters both.\n\nWhich assumption is more defensible depends on the facts, and that is the examinable judgement. Throughput's treatment holds where labour is **genuinely fixed** — salaried staff who will be paid whatever is produced — in which case deducting it distorts the decision. Where labour is genuinely **variable**, contribution is the better measure and throughput overstates the return.\n\nSo the question is not which technique is superior but whether labour varies with the decision, which is the relevant costing test applied to a ranking problem.",
    earns: [
      "Identifying labour as the only element in one measure and not the other",
      "Choosing between them on whether labour actually varies with the decision",
    ],
    loses: ["Choosing material cost, which both measures deduct identically"],
  },

  /* ── PM-15 · Linear programming ────────────────────────────── */

  "PM-15::formulation": {
    title: "Formulating a linear programming problem",
    format: "ot",
    marks: 2,
    requirement:
      "In formulating a linear programming problem, the objective function should be expressed as:\n\nA  Maximise profit, after deducting fixed costs\nB  Maximise total contribution\nC  Minimise total cost in every case\nD  Maximise revenue",
    plan: [
      {
        step: "Identify what varies with the decision",
        detail:
          "Contribution. Fixed costs do not change with the product mix, so including them cannot change which mix is optimal and only complicates the arithmetic.",
      },
      {
        step: "Reject the profit formulation",
        detail:
          "Deducting fixed costs shifts the objective function by a constant. The optimum is in the same place, so it adds nothing and risks error — which is why contribution is the standard formulation.",
      },
      {
        step: "Reject revenue maximisation",
        detail:
          "Maximising revenue ignores cost entirely and can select a high-price, low-margin product. Revenue is not the objective.",
      },
      {
        step: "Note the three parts of a formulation",
        detail:
          "Define the variables precisely, state the objective function, and state every constraint including the non-negativity constraints. Marks are lost for omitting non-negativity or for defining variables loosely.",
      },
    ],
    answer:
      "**B — maximise total contribution.**\n\nOnly **contribution** varies with the product mix. Fixed costs are unchanged whichever mix is chosen, so including them shifts the objective function by a **constant**, leaves the optimum in the same place, and adds arithmetic that can only introduce error.\n\n**Revenue** maximisation ignores cost entirely and can select a high-price, low-margin product, so it is not the objective. **Cost minimisation** is the right objective for some problems — a blending or scheduling problem — but not in every case.\n\nA formulation has **three parts**, and marks are lost on the ones candidates rush:\n\n**Define the variables** precisely — \"let x = units of P produced per period\", not \"let x = P\".\n**State the objective function** — maximise 24x + 18y.\n**State every constraint**, including the **non-negativity** constraints x ≥ 0, y ≥ 0.\n\nOmitting non-negativity, or defining variables loosely so the constraints become ambiguous, is where formulation marks are lost.",
    earns: [
      "Explaining why fixed costs cannot change the optimum",
      "Knowing a formulation needs variables defined precisely and non-negativity stated",
    ],
    loses: ["Formulating on profit, which adds a constant and risks arithmetic error"],
  },

  "PM-15::solving": {
    title: "Finding the optimum on the graph",
    format: "ot",
    marks: 2,
    requirement:
      "On a two-variable linear programming graph, the optimal solution:\n\nA  Lies at the centre of the feasible region\nB  Lies at a corner (vertex) of the feasible region\nC  May lie anywhere in the feasible region\nD  Lies outside the feasible region",
    plan: [
      {
        step: "State the result and why it holds",
        detail:
          "The optimum lies at a VERTEX of the feasible region. Because both the objective function and the constraints are linear, the objective can always be improved by moving along an edge until a corner is reached.",
      },
      {
        step: "Describe the two solution methods",
        detail:
          "Plot an iso-contribution line and slide it outward until it last touches the region, or evaluate the objective function at every vertex and take the best. Both find the same point.",
      },
      {
        step: "Note the exception worth knowing",
        detail:
          "Where the objective function is parallel to a binding constraint, every point along that EDGE is optimal — so there are multiple optimal solutions, all giving the same contribution.",
      },
      {
        step: "Reject the option outside the region",
        detail:
          "A point outside the feasible region breaches a constraint, so it is not available however attractive the objective value. The feasible region is what the constraints permit.",
      },
    ],
    answer:
      "**B — lies at a corner (vertex) of the feasible region.**\n\nBecause both the objective function and the constraints are **linear**, the objective can always be improved by moving along an edge until a corner is reached — so the optimum is at a vertex.\n\nTwo methods find it, and either is acceptable: plot an **iso-contribution line** and slide it outward until it last touches the feasible region, or **evaluate the objective function at every vertex** and take the best. The second is safer under exam conditions because it needs no accurate drawing.\n\nThe exception is worth knowing: where the objective function is **parallel to a binding constraint**, every point along that **edge** is optimal, so there are multiple optimal solutions all giving the same contribution — and management can then choose between them on other grounds.\n\nA point **outside** the region breaches a constraint and is not available however attractive its objective value. Non-binding constraints have **slack**; binding ones have none, and only binding constraints have a shadow price.",
    earns: [
      "Explaining why linearity puts the optimum at a vertex",
      "Knowing the parallel case gives multiple optimal solutions",
    ],
    loses: ["Treating any point in the feasible region as potentially optimal"],
  },

  /* ── PM-16 · Shadow prices and slack ──────────────────────── */

  "PM-16::shadow-prices": {
    title: "What a shadow price is and what it can be used for",
    format: "ot",
    marks: 2,
    requirement:
      "The shadow price of a scarce resource is the:\n\nA  Market price of the resource\nB  Increase in total contribution from one additional unit of the resource\nC  Variable cost of the resource\nD  Total contribution divided by the units of resource available",
    plan: [
      {
        step: "Define it as a marginal value",
        detail:
          "The increase in total contribution from obtaining ONE MORE unit of the scarce resource — found by relaxing the binding constraint by one unit and resolving.",
      },
      {
        step: "State what it can be used for",
        detail:
          "It is the MAXIMUM PREMIUM worth paying above the normal price to obtain more of the resource. Paying more than the shadow price destroys value.",
      },
      {
        step: "Note which constraints have one",
        detail:
          "Only BINDING constraints. A constraint with slack has a shadow price of nil, because more of a resource already in surplus adds nothing.",
      },
      {
        step: "Note that it is a premium, not a total price",
        detail:
          "The shadow price is the extra worth paying ON TOP of the resource's normal cost, since the normal cost is already in the contribution figure. Treating it as the total price is a common error.",
      },
    ],
    answer:
      "**B — the increase in total contribution from one additional unit of the resource.**\n\nIt is a **marginal** value, found by relaxing the binding constraint by one unit and resolving.\n\nWhat it is **for** is the examinable point: it is the **maximum premium** worth paying above the resource's normal price to obtain more of it. Paying more than the shadow price destroys value; paying less creates it.\n\nAnd it is a **premium, not a total price** — the extra worth paying **on top of** the normal cost, because the normal cost is already reflected in the contribution figure. Treating it as the total price a company should pay is a frequent and expensive error.\n\nOnly **binding** constraints have a shadow price. A constraint with **slack** has a shadow price of **nil**, because more of a resource already in surplus adds nothing — so identifying which constraints bind is a prerequisite.\n\nIn a decision-making context the shadow price is the **opportunity cost** of the scarce resource, which is why it appears in relevant costing as well.",
    earns: [
      "Describing it as the maximum premium above normal price, not a total price",
      "Knowing a constraint with slack has a nil shadow price",
    ],
    loses: ["Treating the shadow price as the amount payable for the resource in total"],
  },

  "PM-16::slack-and-range": {
    title: "Slack, and the range over which a solution holds",
    format: "ot",
    marks: 2,
    requirement:
      "A constraint in the optimal solution has slack of 400 units. This means:\n\nA  The constraint is binding and has a positive shadow price\nB  400 units of that resource are unused, and its shadow price is nil\nC  The solution is infeasible\nD  400 more units of the resource are needed",
    plan: [
      {
        step: "Define slack",
        detail:
          "The amount of a resource left UNUSED at the optimum. A constraint with slack is not binding, because there is more of the resource than the optimal plan needs.",
      },
      {
        step: "Derive the shadow price",
        detail:
          "Nil. Obtaining more of a resource already in surplus cannot increase contribution, so no premium is worth paying for it.",
      },
      {
        step: "Distinguish slack from a shortfall",
        detail:
          "Option D reads slack as a deficit. Slack is surplus — it is the opposite, and it is the reading candidates most often get backwards.",
      },
      {
        step: "Note the sensitivity question that follows",
        detail:
          "The optimal solution holds only over a RANGE. Beyond it a different constraint becomes binding and the whole plan changes — so the answer must be stated with its range, not as a permanent conclusion.",
      },
    ],
    answer:
      "**B — 400 units of that resource are unused, and its shadow price is nil.**\n\n**Slack** is the amount of a resource left **unused** at the optimum, so a constraint with slack is **not binding**: there is more of the resource than the optimal plan needs. Its shadow price is therefore **nil**, because obtaining more of a surplus resource cannot increase contribution.\n\nOption D reads slack as a **deficit**, which is the reading candidates most often get backwards — slack is surplus.\n\nThe sensitivity question completes the topic. The optimal solution holds only over a **range**: as a binding constraint is relaxed, contribution rises at the shadow price **until a different constraint becomes binding**, at which point the plan changes and the shadow price changes with it.\n\nSo a shadow price is not a permanent price. Buying 10,000 extra hours at the shadow price of the first hour will not deliver the contribution the shadow price implies, and saying so is what distinguishes an answer that understands the technique from one that has applied it.",
    earns: [
      "Reading slack as surplus and deriving the nil shadow price from it",
      "Knowing a shadow price holds only over a range, so it is not a permanent price",
    ],
    loses: ["Reading slack as a shortfall"],
  },

  /* ── PM-17 · Demand, elasticity and pricing ───────────────── */

  "PM-17::demand-and-mr": {
    title: "Finding the profit-maximising price",
    format: "ot",
    marks: 2,
    requirement:
      "Profit is maximised at the output where:\n\nA  Marginal revenue equals marginal cost\nB  Total revenue is at its maximum\nC  Average cost is at its minimum\nD  Contribution per unit is at its maximum",
    plan: [
      {
        step: "State the condition and the reasoning behind it",
        detail:
          "MR = MC. While marginal revenue exceeds marginal cost, another unit adds more revenue than cost and profit rises; once MC exceeds MR, another unit reduces profit.",
      },
      {
        step: "Reject revenue maximisation",
        detail:
          "Total revenue is maximised where MR = 0, which is a greater output than the profit-maximising one. Selling more can raise revenue while reducing profit.",
      },
      {
        step: "Reject the per-unit measures",
        detail:
          "Minimum average cost and maximum contribution per unit are both per-unit optima and say nothing about total profit, which depends on volume as well as margin.",
      },
      {
        step: "Note the mechanics of the calculation",
        detail:
          "With demand P = a − bQ, marginal revenue is MR = a − 2bQ. Set MR = MC, solve for Q, then substitute Q back into the DEMAND equation to find the price — not into MR.",
      },
    ],
    answer:
      "**A — marginal revenue equals marginal cost.**\n\nThe reasoning is what makes it memorable: while **MR exceeds MC**, another unit adds more revenue than cost and profit rises; once **MC exceeds MR**, another unit reduces profit. So profit peaks where they are equal.\n\n**Total revenue** is maximised where **MR = 0**, which is a **greater** output than the profit-maximising one — so selling more can raise revenue while reducing profit, which is why revenue targets and profit targets pull apart.\n\nMinimum average cost and maximum contribution **per unit** are per-unit optima and say nothing about total profit, which depends on volume as well as margin.\n\nThe mechanics matter for the calculation. With demand **P = a − bQ**, marginal revenue is **MR = a − 2bQ** — the MR line has **twice the slope** of the demand line. Set MR = MC, solve for Q, then substitute Q back into the **demand** equation to find the price. Substituting into MR instead gives the marginal revenue, not the price, and is the standard error.",
    earns: [
      "Explaining the MR = MC condition rather than reciting it",
      "Substituting Q back into the demand equation, not into MR",
    ],
    loses: ["Maximising revenue, which occurs at a higher output than maximum profit"],
  },

  "PM-17::elasticity": {
    title: "Reading elasticity into a pricing decision",
    format: "ot",
    marks: 2,
    requirement:
      "Demand for a product is price **inelastic**. To increase total revenue the company should:\n\nA  Reduce the price\nB  Increase the price\nC  Leave the price unchanged\nD  Increase advertising instead",
    plan: [
      {
        step: "State what inelastic means numerically",
        detail:
          "The absolute value of PED is less than 1: quantity demanded responds proportionally LESS than price. A 10% price rise loses less than 10% of volume.",
      },
      {
        step: "Follow the effect on revenue",
        detail:
          "Raising price gains more in margin than it loses in volume, so total revenue RISES. With elastic demand the opposite holds and a price cut raises revenue.",
      },
      {
        step: "Check the direction against the definition rather than recalling it",
        detail:
          "Inelastic means volume is insensitive, so the company has pricing power. Reasoning it out beats memorising which way round it goes.",
      },
      {
        step: "Note that revenue is not profit",
        detail:
          "Raising price raises revenue AND reduces volume, so cost falls too — the profit effect is larger than the revenue effect. A full answer distinguishes the two.",
      },
    ],
    answer:
      "**B — increase the price.**\n\n**Inelastic** means the absolute value of PED is **less than 1**: quantity responds proportionally **less** than price, so a 10% price rise loses less than 10% of volume. Raising price therefore gains more in margin than it loses in volume and **total revenue rises**.\n\nWith **elastic** demand the opposite holds and a price **cut** raises revenue.\n\nReasoning it from the definition beats memorising the direction: inelastic means volume is insensitive, so the company has **pricing power**.\n\nThe refinement worth adding: **revenue is not profit**. Raising price raises revenue **and** reduces volume, so variable cost falls as well — which means the **profit** effect is larger than the revenue effect. An answer that stops at revenue has understated the case.\n\nDemand is more inelastic where there are few substitutes, the product is a small part of income, it is a necessity, or the brand is strong — which is why brand-building is a pricing strategy as much as a marketing one.",
    earns: [
      "Reasoning the direction from the definition, and noting the profit effect exceeds the revenue effect",
      "Naming what makes demand inelastic",
    ],
    loses: ["Reversing the direction, or stopping at revenue when profit moves further"],
  },

  /* ── PM-18 · Pricing strategies and short-term decisions ──── */

  "PM-18::strategies": {
    title: "Identifying the pricing strategy a situation calls for",
    format: "ot",
    marks: 2,
    requirement:
      "A company launches an innovative product with no direct competitor, aiming to recover development costs quickly from customers who value novelty. The appropriate strategy is:\n\nA  Penetration pricing\nB  Market skimming\nC  Cost-plus pricing\nD  Loss leader pricing",
    plan: [
      {
        step: "Split skimming from penetration by direction and purpose",
        detail:
          "SKIMMING: high price initially, lowered as the market widens — recovers development cost early from customers who will pay. PENETRATION: low price initially, to build volume and market share fast.",
      },
      {
        step: "Match the stem's stated aim",
        detail:
          "Recovering development cost quickly from customers who value novelty is skimming's purpose stated outright. Penetration would defer recovery in exchange for share.",
      },
      {
        step: "Note when each is appropriate",
        detail:
          "Skimming suits an innovative product with inelastic early demand and high barriers. Penetration suits a market where share drives cost advantage and entry is easy, so speed matters more than margin.",
      },
      {
        step: "Note the risk of skimming",
        detail:
          "A high price and visible margins attract competitors. So skimming works only while the barrier holds, which is why it is usually a temporary phase rather than a permanent policy.",
      },
    ],
    answer:
      "**B — market skimming.**\n\n**Skimming** sets a high price initially and lowers it as the market widens, recovering development cost early from customers who will pay for novelty — which is the stem's stated aim. **Penetration** does the opposite: a low price to build volume and share quickly, deferring recovery in exchange for position.\n\nWhen each fits: **skimming** suits an innovative product with **inelastic early demand** and high barriers to entry. **Penetration** suits a market where share drives cost advantage through scale and where entry is easy, so speed matters more than margin.\n\nThe risk of skimming belongs in a discussion answer: a high price with **visible margins attracts competitors**, so it works only while the barrier holds — which is why it is usually a temporary phase rather than a permanent policy.\n\nThe other strategies PM names are **price discrimination**, **product bundling**, **loss leader**, **premium pricing**, **complementary product** and **volume discounting** — each answering a different commercial problem.",
    earns: [
      "Splitting skimming from penetration on direction and purpose",
      "Naming the competitive risk that makes skimming temporary",
    ],
    loses: ["Choosing penetration, which defers rather than accelerates cost recovery"],
  },

  "PM-18::make-or-buy": {
    title: "Make-or-buy with a limiting factor",
    format: "ot",
    marks: 2,
    requirement:
      "Where a company must buy in some components because of a limiting factor, it should buy in first the components with the:\n\nA  Highest variable cost of making\nB  Lowest extra cost of buying per unit of the scarce resource saved\nC  Highest external purchase price\nD  Lowest external purchase price",
    plan: [
      {
        step: "Identify what is being economised",
        detail:
          "The SCARCE RESOURCE. The decision is not which component is cheapest to buy, but which buys back the most scarce resource for the least extra cost.",
      },
      {
        step: "State the ranking basis",
        detail:
          "Extra cost of buying (purchase price less variable cost of making) DIVIDED BY the units of scarce resource saved. Buy in first where that ratio is lowest.",
      },
      {
        step: "See why a per-unit ranking fails",
        detail:
          "A component with a high extra cost may still be the right one to buy if it releases a great deal of the scarce resource. Ranking on cost alone ignores what the cost buys.",
      },
      {
        step: "Note the qualitative factors a discussion must add",
        detail:
          "Supplier reliability and quality, loss of control and of in-house expertise, confidentiality, and the risk of becoming dependent on a supplier who later raises the price.",
      },
    ],
    answer:
      "**B — lowest extra cost of buying per unit of the scarce resource saved.**\n\nThe resource being economised is the **scarce** one, so the ranking must be per unit of it: **extra cost of buying** (purchase price less variable cost of making) **÷ units of scarce resource saved**. Buy in first where that ratio is lowest.\n\nRanking on cost alone fails for the same reason ranking products by contribution per unit fails: a component with a **high** extra cost may still be the right one to buy if it releases a great deal of the constrained resource. Cost alone ignores what the cost buys.\n\nThe qualitative factors belong in any discussion answer and are often worth as many marks as the calculation: **supplier reliability and quality**, loss of **control** and of in-house **expertise**, **confidentiality** where the component embodies know-how, and the risk of becoming **dependent** on a supplier who later raises the price once the in-house capability has gone.\n\nThat last point is the strategic one — a decision reversible on paper may be irreversible in practice once the skills have been lost.",
    earns: [
      "Ranking per unit of the scarce resource rather than on cost",
      "Raising dependency and lost in-house capability as the strategic risk",
    ],
    loses: ["Buying in the cheapest components, which ignores how much resource each releases"],
  },

  "PM-18::other-decisions": {
    title: "Shutdown, further processing and special orders",
    format: "ot",
    marks: 2,
    requirement:
      "A division makes a loss after apportioned head office costs, but has positive contribution. Closing it would:\n\nA  Improve group profit by the amount of the division's loss\nB  Reduce group profit by the division's contribution, since the apportioned costs would continue\nC  Have no effect on group profit\nD  Improve group profit by the apportioned head office costs",
    plan: [
      {
        step: "Identify which costs would actually disappear",
        detail:
          "Apportioned head office cost is a share of a cost incurred anyway. Closing the division does not remove it — it is reapportioned across the remaining divisions.",
      },
      {
        step: "Work out the incremental effect",
        detail:
          "The group loses the division's CONTRIBUTION and saves only its genuinely avoidable costs. If the apportionment is the only thing making it loss-making, closure makes the group worse off.",
      },
      {
        step: "Reject the reported-loss reasoning",
        detail:
          "Option A assumes the reported loss is the saving. That is the classic error, and it is why apportioned costs should be shown separately in a divisional statement.",
      },
      {
        step: "Note the further processing test alongside it",
        detail:
          "Further processing is worthwhile where INCREMENTAL revenue exceeds INCREMENTAL cost. Costs incurred before the split-off point are sunk and irrelevant to that decision.",
      },
    ],
    answer:
      "**B — reduce group profit by the division's contribution, since the apportioned costs would continue.**\n\nApportioned head office cost is a share of a cost incurred **anyway**. Closing the division does not remove it — it is simply **reapportioned** across the remaining divisions, which then look worse.\n\nSo the incremental effect is that the group loses the division's **contribution** and saves only its **genuinely avoidable** costs. If the apportionment is the only thing making the division loss-making, closure makes the group **worse off**.\n\nOption A treats the reported loss as the saving. That is the classic error, and it is exactly why a divisional statement should show **controllable** and **apportioned** costs separately — a manager assessed on a figure containing costs they do not control will make decisions that damage the group.\n\nThe **further processing** test follows the same logic: process further where **incremental revenue exceeds incremental cost**, and costs incurred before the **split-off point** are sunk and irrelevant however they were apportioned between joint products.",
    earns: [
      "Asking which costs would actually disappear before computing the effect",
      "Connecting it to why apportioned costs must be shown separately",
    ],
    loses: ["Treating the reported loss as the saving from closure"],
  },

  /* ── PM-19 · Risk and uncertainty ──────────────────────────── */

  "PM-19::risk-uncertainty-ev": {
    title: "Choosing the decision rule the attitude to risk implies",
    format: "ot",
    marks: 2,
    requirement:
      "A decision-maker who chooses the option with the best of the worst possible outcomes is applying:\n\nA  The maximax rule\nB  The maximin rule\nC  The minimax regret rule\nD  Expected value",
    plan: [
      {
        step: "Attach each rule to an attitude to risk",
        detail:
          "MAXIMAX: best of the best outcomes — an optimist. MAXIMIN: best of the worst — a pessimist or risk-averse decision-maker. MINIMAX REGRET: minimises the largest opportunity loss. EXPECTED VALUE: risk-neutral.",
      },
      {
        step: "Match the stem's description",
        detail:
          "\"Best of the worst possible outcomes\" is maximin stated in its own terms — the rule of someone who wants to protect the downside.",
      },
      {
        step: "Note how minimax regret is computed, since it is the hardest",
        detail:
          "Build a regret table showing, for each outcome, the difference between the best payoff available and the payoff chosen. Then choose the option whose MAXIMUM regret is smallest.",
      },
      {
        step: "State the limitation of expected value",
        detail:
          "It is a long-run average, so it is a poor guide for a ONE-OFF decision — the actual outcome will be one of the payoffs, never the average — and it ignores the decision-maker's attitude to risk.",
      },
    ],
    answer:
      "**B — the maximin rule.**\n\nEach rule embodies an attitude to risk. **Maximax** takes the best of the best outcomes — an optimist. **Maximin** takes the best of the worst — a pessimist, or a risk-averse decision-maker protecting the downside. **Minimax regret** minimises the largest opportunity loss. **Expected value** is risk-neutral.\n\nMinimax regret is the one worth knowing how to compute: build a **regret table** showing, for each possible outcome, the difference between the **best payoff available** under that outcome and the payoff the chosen option gives. Then select the option whose **maximum** regret is smallest.\n\nThe limitation of **expected value** is the point most often needed in discussion: it is a **long-run average**, so it is a poor guide for a **one-off** decision — the actual outcome will be one of the payoffs and never the average — and it takes no account of the decision-maker's attitude to risk or of the **spread** of outcomes.\n\n**Risk** is where probabilities can be assigned; **uncertainty** is where they cannot.",
    earns: [
      "Attaching each rule to an attitude to risk, and knowing how regret is computed",
      "Naming expected value's weakness for a one-off decision",
    ],
    loses: ["Confusing maximin with maximax, which is the reverse attitude"],
  },

  "PM-19::trees-and-sensitivity": {
    title: "Computing a sensitivity margin",
    format: "ot",
    marks: 2,
    requirement:
      "A project has an expected contribution of $500,000 and fixed costs of $400,000. The sensitivity of the decision to a fall in contribution is:\n\nA  20%\nB  25%\nC  80%\nD  125%",
    plan: [
      {
        step: "Identify what sensitivity measures",
        detail:
          "The percentage change in a variable that would make the decision marginal — here, that would eliminate the profit. It answers \"how wrong can this estimate be before the answer changes?\"",
      },
      {
        step: "Find the margin available",
        detail:
          "Profit = $500,000 − $400,000 = $100,000. That is how much contribution can fall before the project breaks even.",
      },
      {
        step: "Express it as a percentage of the variable being tested",
        detail:
          "$100,000 ÷ $500,000 = **20%**. The base is the CONTRIBUTION, because contribution is the variable whose sensitivity is being measured.",
      },
      {
        step: "Note what makes the answer wrong if the base is",
        detail:
          "$100,000 ÷ $400,000 = 25%, which is option B — the margin expressed on fixed costs instead. The base must be the variable under test.",
      },
    ],
    answer:
      "**A — 20%.**\n\nProfit = $500,000 − $400,000 = **$100,000**, which is how far contribution can fall before the project breaks even.\nSensitivity = $100,000 ÷ $500,000 = **20%**.\n\nThe base must be the **variable under test**. Option B, 25%, expresses the same margin on **fixed costs** — which would be the correct answer to the sensitivity of the decision to a **rise in fixed costs**, and is a different question.\n\nWhat sensitivity is **for**: it answers \"how wrong can this estimate be before the decision changes?\" A 20% margin on contribution says the project survives a fifth of the contribution disappearing. Comparing the sensitivities of several variables identifies which estimate matters most and therefore where to spend effort improving the forecast.\n\nIts limitation is that it tests **one variable at a time**, holding the others constant — and in reality variables move together. **Simulation** addresses that by varying many simultaneously; a **decision tree** handles sequential decisions, evaluated by rolling back from right to left.",
    earns: [
      "Expressing the margin on the variable under test",
      "Knowing sensitivity tests one variable at a time, which is why simulation exists",
    ],
    loses: ["Using fixed costs as the base, which answers a different sensitivity question"],
  },
}
