import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area B — Decision-making techniques.
 * CVP analysis, relevant costing, limiting factors, make-or-buy / further
 * processing / shutdown, and risk & uncertainty. Original, syllabus-aligned;
 * no ACCA/Kaplan/BPP text. Every figure is re-solved from first principles.
 */

export const PM_B: StudyChapter = {
  paper: "PM",
  area: "B",
  title: "Decision-making techniques",
  minutes: 18,
  intro: "A good decision isn't the one with the biggest revenue — it's the one that leaves the business better off than every alternative. This area is the toolkit for proving which option that is.",
  outcomes: [
    "Build cost-volume-profit relationships: contribution, breakeven, C/S ratio, margin of safety and target profit",
    "Solve multi-product breakeven and read the breakeven and profit-volume charts",
    "Identify relevant costs — and reject sunk, committed and non-cash costs",
    "Rank products by contribution per unit of a single limiting factor",
    "Evaluate make-or-buy, further-processing and shutdown decisions on incremental cash flows",
    "Handle risk and uncertainty with expected values, perfect information, decision trees, and the maximax/maximin/minimax-regret rules",
  ],
  sections: [
    {
      id: "cvp",
      heading: "Cost-volume-profit analysis",
      blocks: [
        { kind: "text", md: "Every CVP question rests on one number: **contribution**. Contribution is what each unit throws off **after** its own variable cost, and it is the pot from which fixed costs are paid. Once fixed costs are covered, every further pound of contribution is profit. Master that sentence and the whole area unlocks." },
        { kind: "formula", name: "Contribution per unit", expr: "Selling price per unit − Variable cost per unit" },
        { kind: "formula", name: "Profit", expr: "Total contribution − Fixed costs  =  (Units × contribution per unit) − Fixed costs" },
        { kind: "text", md: "The **breakeven point** is the activity level where total contribution exactly equals fixed costs, so profit is nil. If each unit contributes a fixed slice, the number of units you need is simply the fixed costs divided by that slice." },
        { kind: "formula", name: "Breakeven point (units)", expr: "Fixed costs ÷ Contribution per unit" },
        { kind: "formula", name: "Contribution to sales (C/S) ratio", expr: "Contribution per unit ÷ Selling price per unit  (= total contribution ÷ total sales)" },
        { kind: "formula", name: "Breakeven point (revenue)", expr: "Fixed costs ÷ C/S ratio" },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How the CVP numbers connect",
          caption: "Every CVP figure is one step from contribution.",
          data: {
            steps: [
              { label: "Selling price − variable cost", sub: "= contribution per unit" },
              { label: "Fixed costs ÷ contribution", sub: "= breakeven point (units)" },
              { label: "Budgeted sales − breakeven", sub: "= margin of safety" },
              { label: "Contribution − fixed costs", sub: "= profit" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — the core CVP set", scenario: "Lumo sells one product for **$50**. Variable cost is **$30** per unit and fixed costs are **$80,000** per year. Budgeted sales are **10,000** units. Find contribution, the C/S ratio, breakeven (units and revenue), the margin of safety, and the units needed for a **$50,000** target profit.", steps: [
          { label: "Contribution per unit", detail: "$50 − $30 = **$20** per unit." },
          { label: "C/S ratio", detail: "$20 ÷ $50 = 0.4, i.e. **40%**. Every $1 of sales yields $0.40 of contribution." },
          { label: "Breakeven (units)", detail: "$80,000 ÷ $20 = **4,000 units**." },
          { label: "Breakeven (revenue)", detail: "$80,000 ÷ 0.4 = **$200,000** — and as a check, 4,000 units × $50 = $200,000." },
          { label: "Margin of safety", detail: "Budgeted 10,000 − breakeven 4,000 = **6,000 units**, i.e. 6,000 ÷ 10,000 = **60%**. Sales could fall 60% before a loss." },
          { label: "Target-profit units", detail: "(Fixed + target) ÷ contribution = ($80,000 + $50,000) ÷ $20 = 130,000 ÷ 20 = **6,500 units** (= $325,000 revenue)." },
        ], result: "Contribution $20 (40%); breakeven 4,000 units / $200,000; margin of safety 6,000 units (60%); 6,500 units earn the $50,000 target." },
        { kind: "formula", name: "Margin of safety", expr: "Budgeted sales − Breakeven sales   (as % = margin of safety ÷ budgeted sales)" },
        { kind: "formula", name: "Units for a target profit", expr: "(Fixed costs + Target profit) ÷ Contribution per unit" },
        { kind: "text", md: "At the budgeted 10,000 units the profit is (10,000 × $20) − $80,000 = $200,000 − $80,000 = **$120,000**. The waterfall below shows the same result as a bridge from sales to profit." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Sales to profit at 10,000 units",
          caption: "Sales − variable costs − fixed costs = profit ($).",
          data: {
            unit: "$",
            items: [
              { label: "Sales (10,000 × $50)", value: 500000, kind: "start" },
              { label: "Variable costs (10,000 × $30)", value: -300000, kind: "delta" },
              { label: "Fixed costs", value: -80000, kind: "delta" },
              { label: "Profit", value: 120000, kind: "total" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Contribution first, always", md: "In any short-run decision, **ignore fixed costs until the end**. Fixed costs don't change with the decision, so the option that maximises **contribution** is the option that maximises **profit**." },
      ],
      check: {
        q: "A product sells for $40 with variable cost $24. Fixed costs are $96,000 and budgeted sales are 8,000 units. What is the margin of safety in units?",
        options: [
          "2,000 units",
          "6,000 units",
          "4,000 units",
          "8,000 units",
        ],
        correct: 0,
        explain: "Contribution = $40 − $24 = $16. Breakeven = $96,000 ÷ $16 = 6,000 units. Margin of safety = budgeted 8,000 − breakeven 6,000 = 2,000 units. The 6,000 distractor is the breakeven point itself, not the margin of safety.",
      },
    },
    {
      id: "multi-cvp",
      heading: "Multi-product breakeven and the charts",
      blocks: [
        { kind: "text", md: "With more than one product there is no single contribution per unit, so breakeven is expressed in **revenue** using a **weighted average C/S ratio** — weighted by the planned **sales mix**. The key assumption is that the mix stays constant; change the mix and the breakeven point moves." },
        { kind: "formula", name: "Multi-product breakeven (revenue)", expr: "Fixed costs ÷ Weighted average C/S ratio" },
        { kind: "formula", name: "Weighted average C/S ratio", expr: "Total contribution of the mix ÷ Total revenue of the mix" },
        { kind: "example", title: "Worked example — two products, one mix", scenario: "Duo makes **X** (price $20, variable cost $12) and **Y** (price $30, variable cost $18). They are always sold **3 units of X to every 2 of Y**. Fixed costs are **$96,000**. Find the breakeven point in units of each product.", steps: [
          { label: "Contribution per unit", detail: "X: $20 − $12 = **$8**.  Y: $30 − $18 = **$12**." },
          { label: "Build one mix 'package' (3X + 2Y)", detail: "Contribution = (3 × $8) + (2 × $12) = $24 + $24 = **$48** per package." },
          { label: "Package revenue and weighted C/S", detail: "Revenue = (3 × $20) + (2 × $30) = $60 + $60 = $120. Weighted C/S = $48 ÷ $120 = **0.40 (40%)**." },
          { label: "Breakeven packages", detail: "Fixed ÷ package contribution = $96,000 ÷ $48 = **2,000 packages**." },
          { label: "Convert to units", detail: "X = 2,000 × 3 = **6,000 units**;  Y = 2,000 × 2 = **4,000 units**." },
          { label: "Check via revenue", detail: "$96,000 ÷ 0.40 = $240,000 breakeven revenue = 2,000 × $120. Agrees." },
        ], result: "Breakeven at 6,000 units of X and 4,000 units of Y ($240,000 of revenue), assuming the 3:2 mix holds." },
        { kind: "text", md: "Two charts visualise CVP. The **breakeven chart** plots total revenue and total cost against output; they cross at breakeven, and the vertical gap beyond that is profit. The **profit-volume (P/V) chart** cuts out the middle step and plots **profit** directly against sales — it starts at a loss equal to fixed costs, crosses zero at breakeven, and rises at the C/S ratio. The bars below trace Lumo's P/V line from the first example (contribution $20, fixed $80,000)." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Profit-volume profile (Lumo)",
          caption: "Profit ($) = units × $20 contribution − $80,000 fixed. Zero at 4,000 units.",
          data: {
            unit: "$",
            items: [
              { label: "0 units", value: -80000 },
              { label: "2,000", value: -40000 },
              { label: "4,000 (breakeven)", value: 0 },
              { label: "6,000", value: 40000 },
              { label: "8,000", value: 80000 },
              { label: "10,000", value: 120000 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The mix assumption bites", md: "Multi-product breakeven only holds while the **sales mix is constant**. If customers buy relatively more of the low-margin product, the weighted C/S ratio falls and the real breakeven revenue rises above the number you calculated." },
      ],
    },
    {
      id: "relevant",
      heading: "Relevant costing",
      blocks: [
        { kind: "text", md: "A **relevant cost** is a **future, incremental cash flow** that changes **because of** the decision. Three tests, all of which must pass: is it in the **future** (not already spent), is it **cash** (not a book entry), and does it **differ** between the options? Anything failing a test is irrelevant and must be stripped out." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Relevant vs irrelevant costs",
          data: {
            leftTitle: "Relevant — include",
            rightTitle: "Irrelevant — exclude",
            rows: [
              { aspect: "Timing", left: "Future costs", right: "Sunk (already incurred) costs" },
              { aspect: "Nature", left: "Cash flows", right: "Non-cash (depreciation, notional rent)" },
              { aspect: "Behaviour", left: "Differs between options", right: "Committed — unavoidable either way" },
              { aspect: "Best forgone use", left: "Opportunity cost of a scarce resource", right: "Historical purchase price of stock" },
            ],
          },
        } },
        { kind: "formula", name: "Opportunity cost", expr: "The net benefit (contribution) forgone by using a resource for this decision instead of its best alternative use" },
        { kind: "callout", tone: "rule", title: "The materials rule", md: "For material already held: if it is in **regular use**, the relevant cost is the **replacement cost** (you must buy more to replace what you consume). If it has **no other use**, the relevant cost is the **scrap/disposal value forgone** — often nil. The original purchase price is **sunk** and never relevant." },
        { kind: "example", title: "Worked example — relevant cost of a one-off contract", scenario: "A contract needs: **Material P** — 400 kg, all in regular use, in stock at an original $3/kg but now costing $5/kg to buy. **Material Q** — 200 kg in stock, bought for $600, with no other use and a scrap value of $150. **Labour** — 300 hours; the workforce is paid $12/hour and currently has spare capacity. Depreciation on the machine used is $2,000. What is the relevant cost?", steps: [
          { label: "Material P", detail: "In regular use → relevant cost = replacement cost = 400 kg × $5 = **$2,000**. The $3 historical cost is sunk and ignored." },
          { label: "Material Q", detail: "No other use → relevant cost = scrap value forgone = **$150**. The $600 paid is sunk." },
          { label: "Labour", detail: "Spare capacity means the workers are paid whether or not they do this contract → **$0** incremental. (If they had to be diverted from other paid work, we'd add the contribution lost.)" },
          { label: "Depreciation", detail: "A non-cash book entry, not a future cash flow → **$0**." },
        ], result: "Relevant cost = $2,000 + $150 + $0 + $0 = **$2,150**. The contract should be priced above this floor, not above the misleading full cost." },
      ],
    },
    {
      id: "limiting",
      heading: "Limiting-factor analysis",
      blocks: [
        { kind: "text", md: "A **limiting factor** (scarce resource) is anything that caps output below demand — machine hours, skilled labour, or a raw material in short supply. With a **single** limiting factor, you cannot make everything, so you make what earns the most **per unit of the scarce resource** — not per unit of product." },
        { kind: "formula", name: "Contribution per unit of limiting factor", expr: "Contribution per unit ÷ Units of scarce resource per unit of product" },
        { kind: "callout", tone: "key", title: "The ranking rule", md: "Rank products by **contribution per unit of the limiting factor** (highest first). Allocate the scarce resource to the top-ranked product up to its maximum demand, then the next, until the resource runs out. Fixed costs are ignored — they don't change with the mix." },
        { kind: "example", title: "Worked example — machine hours are scarce", scenario: "Nova makes **P** and **Q**. P: contribution **$20**/unit, **2** machine hours/unit, max demand **3,000** units. Q: contribution **$18**/unit, **1.5** machine hours/unit, max demand **4,000** units. Only **9,000** machine hours are available. What production plan maximises contribution?", steps: [
          { label: "Contribution per machine hour", detail: "P: $20 ÷ 2 = **$10/hr**.  Q: $18 ÷ 1.5 = **$12/hr**." },
          { label: "Rank", detail: "Q ($12/hr) is ranked **first**, P ($10/hr) second — even though P has the higher contribution per unit." },
          { label: "Make Q to its demand", detail: "4,000 units × 1.5 hrs = 6,000 hrs. Hours left = 9,000 − 6,000 = **3,000 hrs**." },
          { label: "Make P with the rest", detail: "3,000 hrs ÷ 2 hrs = **1,500 units** of P (below its 3,000 demand — P is squeezed by the shortage)." },
          { label: "Total contribution", detail: "Q: 4,000 × $18 = $72,000.  P: 1,500 × $20 = $30,000.  Total = **$102,000**." },
        ], result: "Make 4,000 Q and 1,500 P for $102,000 contribution. Ranking by contribution per unit (P first) would have been wrong and less profitable." },
        { kind: "callout", tone: "tip", title: "Two constraints → linear programming", md: "With **two** scarce resources you can't rank on a single ratio. Instead formulate **linear programming**: define variables, write each constraint as an inequality, graph the **feasible region**, and slide the **iso-contribution line** outward to the last corner it touches — that vertex is the optimum. The binding constraints there have a **shadow price** (the extra contribution from one more unit of that resource)." },
      ],
      check: {
        q: "Product R contributes $24/unit and uses 4 kg of a scarce material; Product S contributes $15/unit and uses 2 kg. Which is ranked first under limiting-factor analysis?",
        options: [
          "R, because its contribution per unit is higher",
          "S, because it earns $7.50 per kg versus R's $6.00 per kg",
          "R, because it uses more material",
          "They rank equally",
        ],
        correct: 1,
        explain: "Rank by contribution per unit of the scarce resource. R = $24 ÷ 4 kg = $6.00/kg; S = $15 ÷ 2 kg = $7.50/kg. S earns more per kg of the limiting factor, so S is ranked first — the higher per-unit contribution of R is a classic trap.",
      },
    },
    {
      id: "specific",
      heading: "Make-or-buy, further processing and shutdown",
      blocks: [
        { kind: "text", md: "These are all the same idea wearing different clothes: compare only the **cash flows that change**. Sunk costs, absorbed fixed overhead and joint costs already spent are noise." },
        { kind: "text", md: "**Make or buy.** Compare the **variable cost to make** with the **buy-in price**, plus any change in fixed costs. Only **avoidable** fixed costs count; unavoidable fixed overhead continues whichever way you go." },
        { kind: "example", title: "Worked example — make or buy", scenario: "A component costs **$18** to make in-house (materials $8 + labour $6 + variable overhead $4). It absorbs **$5** of fixed overhead per unit, all of which is unavoidable. A supplier offers it at **$16**. Should the firm buy it in?", steps: [
          { label: "Relevant cost to make", detail: "Only the variable cost changes: $8 + $6 + $4 = **$18** per unit. The $5 fixed overhead is unavoidable → irrelevant." },
          { label: "Relevant cost to buy", detail: "**$16** purchase price (the $5 fixed overhead still continues)." },
          { label: "Compare", detail: "Buying saves $18 − $16 = **$2 per unit**." },
        ], result: "On cost alone, buy in and save $2/unit. But watch the traps: if the freed capacity earns contribution elsewhere, add that to the case for buying; if part of the $5 fixed cost were avoidable, subtract it from the make cost." },
        { kind: "text", md: "**Further processing (joint products).** At the split-off point, joint costs are already **sunk**. Process a product further only if the **incremental revenue** beats the **incremental (further processing) cost**." },
        { kind: "formula", name: "Process-further test", expr: "Process further if:  Incremental revenue > Incremental further-processing cost" },
        { kind: "example", title: "Worked example — sell or process further", scenario: "1,000 litres of a joint product can be sold at split-off for **$10**/litre. Alternatively it can be refined at an extra **$3**/litre and sold for **$15**/litre. The joint costs allocated to it are **$9,000**. Refine or sell now?", steps: [
          { label: "Ignore the joint cost", detail: "The $9,000 is incurred before split-off — **sunk** and irrelevant to this choice." },
          { label: "Incremental revenue", detail: "$15 − $10 = **$5**/litre." },
          { label: "Incremental cost", detail: "**$3**/litre of further processing." },
          { label: "Net benefit", detail: "($5 − $3) × 1,000 litres = **$2,000** in favour of processing further." },
        ], result: "Process further: +$2,000. Had the extra cost exceeded the extra $5 revenue, selling at split-off would win." },
        { kind: "text", md: "**Shutdown.** To close a product line or segment, weigh the **contribution lost** against the **fixed costs saved**. Keep it open while it earns more contribution than the fixed cost its closure would avoid." },
        { kind: "example", title: "Worked example — shutdown decision", scenario: "A department earns annual contribution of **$40,000**. Closing it would save **$30,000** of avoidable fixed costs; the remaining fixed costs are apportioned from head office and would continue. Should it close?", steps: [
          { label: "Contribution lost on closure", detail: "**$40,000** disappears if the department shuts." },
          { label: "Fixed costs saved", detail: "Only the **avoidable $30,000** is saved; apportioned head-office cost stays." },
          { label: "Net effect of closing", detail: "Save $30,000 − lose $40,000 = **−$10,000**. Closure makes the firm $10,000 worse off." },
        ], result: "Keep the department open: it covers its own avoidable fixed costs and still contributes $10,000 towards head-office overhead." },
      ],
    },
    {
      id: "risk",
      heading: "Risk and uncertainty",
      blocks: [
        { kind: "text", md: "**Risk** means the outcomes and their **probabilities** are known; **uncertainty** means the probabilities are not. The tool for risk is the **expected value** — the long-run average outcome, weighting each result by its probability." },
        { kind: "formula", name: "Expected value (EV)", expr: "Σ (probability × outcome)" },
        { kind: "example", title: "Worked example — a payoff table and expected values", scenario: "A baker chooses a batch size — **Small**, **Medium** or **Large**. Profit ($) depends on demand being **Low**, **Medium** or **High**. The payoff table is: Small → 90, 90, 90;  Medium → 60, 120, 120;  Large → 20, 100, 160. Probabilities are Low **0.3**, Medium **0.4**, High **0.3**. Which batch maximises expected value?", steps: [
          { label: "EV of Small", detail: "(0.3 × 90) + (0.4 × 90) + (0.3 × 90) = 27 + 36 + 27 = **$90**." },
          { label: "EV of Medium", detail: "(0.3 × 60) + (0.4 × 120) + (0.3 × 120) = 18 + 48 + 36 = **$102**." },
          { label: "EV of Large", detail: "(0.3 × 20) + (0.4 × 100) + (0.3 × 160) = 6 + 40 + 48 = **$94**." },
        ], result: "The Medium batch has the highest expected value ($102), so a risk-neutral baker chooses Medium." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Expected value by batch size",
          caption: "EV ($) = Σ probability × payoff. Medium wins.",
          data: {
            unit: "$",
            items: [
              { label: "Small", value: 90 },
              { label: "Medium", value: 102 },
              { label: "Large", value: 94 },
            ],
          },
        } },
        { kind: "text", md: "**The value of perfect information (VOPI).** Imagine a forecaster who could tell you demand in advance, letting you pick the best batch for each state. The most you'd rationally pay for that forecast is the extra expected profit it unlocks." },
        { kind: "formula", name: "Value of perfect information", expr: "EV with perfect information − EV of the best decision without it" },
        { kind: "example", title: "Worked example — VOPI", scenario: "Using the baker's table, what is the value of perfect information?", steps: [
          { label: "Best choice for each state", detail: "Low → Small (90);  Medium → Medium (120);  High → Large (160)." },
          { label: "EV with perfect information", detail: "(0.3 × 90) + (0.4 × 120) + (0.3 × 160) = 27 + 48 + 48 = **$123**." },
          { label: "EV without it (best plain decision)", detail: "Medium batch = **$102** (from the previous example)." },
          { label: "VOPI", detail: "$123 − $102 = **$21**." },
        ], result: "Perfect information is worth up to $21. The baker should pay no more than $21 for the forecast." },
        { kind: "text", md: "When probabilities are **unknown**, EV can't be used. Instead the decision reflects the manager's **attitude to risk**, using one of three rules on the same payoff table." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two attitudes to uncertainty",
          caption: "Applied to the baker's payoff table.",
          data: {
            leftTitle: "Maximax — the optimist",
            rightTitle: "Maximin — the pessimist",
            rows: [
              { aspect: "Focuses on", left: "The best possible outcome", right: "The worst possible outcome" },
              { aspect: "Rule", left: "Choose the highest maximum payoff", right: "Choose the highest minimum payoff" },
              { aspect: "Row values used", left: "Small 90, Medium 120, Large 160", right: "Small 90, Medium 60, Large 20" },
              { aspect: "Choice", left: "Large (best max = 160)", right: "Small (best min = 90)" },
              { aspect: "Attitude to risk", left: "Risk-seeking", right: "Risk-averse" },
            ],
          },
        } },
        { kind: "text", md: "The third rule, **minimax regret**, suits a decision-maker who hates hindsight. **Regret** is the payoff you gave up in each state by not choosing that state's best option. You build a **regret table** (column-best minus each payoff), find each option's **maximum** regret, and pick the option whose maximum regret is **smallest**." },
        { kind: "table", caption: "Regret table (column best − payoff) and the maximum regret per option", head: ["Batch", "Low regret", "Medium regret", "High regret", "Max regret"], rows: [
          ["Small", "90 − 90 = 0", "120 − 90 = 30", "160 − 90 = 70", "70"],
          ["Medium", "90 − 60 = 30", "120 − 120 = 0", "160 − 120 = 40", "40"],
          ["Large", "90 − 20 = 70", "120 − 100 = 20", "160 − 160 = 0", "70"],
        ] },
        { kind: "text", md: "The smallest maximum regret is **40**, so **minimax regret chooses the Medium batch**. Notice the three rules can disagree: **maximax → Large**, **maximin → Small**, **minimax regret → Medium**. The 'right' answer depends entirely on the decision-maker's appetite for risk." },
        { kind: "text", md: "**Decision trees** handle sequential choices under risk. Draw decisions as **squares** and chance events as **circles**, write probabilities and payoffs on the branches, then **roll back** from right to left: at each circle take the expected value, at each square take the best expected value." },
        { kind: "example", title: "Worked example — rolling back a decision tree", scenario: "A firm chooses a **Big plant** or a **Small plant** (figures in $000). Big: High demand (0.6) → 100; Low (0.4) → −20. Small: High (0.6) → 40; Low (0.4) → 30. Which plant?", steps: [
          { label: "EV of Big (a chance node)", detail: "(0.6 × 100) + (0.4 × −20) = 60 − 8 = **$52,000**." },
          { label: "EV of Small (a chance node)", detail: "(0.6 × 40) + (0.4 × 30) = 24 + 12 = **$36,000**." },
          { label: "Roll back to the decision node", detail: "Take the higher EV: $52,000 > $36,000." },
        ], result: "Build the Big plant — its expected value of $52,000 beats the Small plant's $36,000, accepting the risk of the −$20,000 low-demand outcome." },
      ],
      check: {
        q: "An investment yields $60,000 with probability 0.3, $30,000 with probability 0.5 and −$10,000 with probability 0.2. What is its expected value?",
        options: [
          "$31,000",
          "$26,667",
          "$80,000",
          "$33,000",
        ],
        correct: 0,
        explain: "EV = Σ(probability × outcome) = (0.3 × 60,000) + (0.5 × 30,000) + (0.2 × −10,000) = 18,000 + 15,000 − 2,000 = $31,000. The −$10,000 branch reduces the EV; forgetting its negative sign gives the wrong $33,000, and $26,667 is a simple average that wrongly ignores the probabilities.",
      },
    },
  ],
  examTraps: [
    { trap: "Ranking limiting-factor products by contribution per unit instead of per unit of the scarce resource.", fix: "Always divide contribution by the resource each product consumes. The winner per hour/kg can differ from the winner per unit." },
    { trap: "Including sunk costs, absorbed fixed overhead or depreciation in a relevant-cost answer.", fix: "Relevant costs are future, incremental cash flows only. Strip out anything already spent, unavoidable, or non-cash." },
    { trap: "Treating margin of safety and breakeven as the same thing.", fix: "Breakeven is where profit is nil; margin of safety is how far budgeted sales sit ABOVE breakeven (budgeted − breakeven)." },
    { trap: "Dropping the negative sign on loss outcomes when computing an expected value.", fix: "EV = Σ(probability × outcome), and a loss enters as a negative number — a −$10,000 branch reduces the EV." },
    { trap: "Assuming multi-product breakeven revenue holds whatever the sales mix.", fix: "The weighted C/S ratio depends on the mix. If the mix shifts towards low-margin products, the real breakeven revenue rises." },
  ],
  keyTerms: [
    { term: "Contribution", def: "Selling price less variable cost — the amount each unit contributes towards fixed costs and then profit." },
    { term: "C/S ratio", def: "Contribution as a proportion of sales; used to find breakeven and target revenue for multi-product firms." },
    { term: "Margin of safety", def: "How far budgeted (or actual) sales exceed the breakeven point, in units, revenue or as a percentage." },
    { term: "Relevant cost", def: "A future incremental cash flow that differs between the options — the only kind of cost that should enter a decision." },
    { term: "Limiting factor", def: "A scarce resource that caps output below demand; products are ranked by contribution per unit of it." },
    { term: "Expected value", def: "The probability-weighted average of the possible outcomes, Σ(probability × outcome) — the tool for decisions under risk." },
  ],
  summary: [
    "CVP rests on contribution: breakeven = fixed ÷ contribution per unit, and profit = total contribution − fixed costs.",
    "Margin of safety = budgeted − breakeven sales; target-profit units = (fixed + target) ÷ contribution per unit; multi-product breakeven uses the weighted average C/S ratio and assumes a constant mix.",
    "Relevant costs are future, incremental cash flows; sunk, committed and non-cash costs are excluded, and forgone benefits enter as opportunity costs.",
    "With one scarce resource, rank by contribution per unit of the limiting factor; two constraints need linear programming.",
    "Make-or-buy, further-processing and shutdown decisions all compare only the cash flows that change between the options.",
    "Under risk use expected values and the value of perfect information; under uncertainty apply maximax (optimist), maximin (pessimist) or minimax regret to match the attitude to risk.",
  ],
}
