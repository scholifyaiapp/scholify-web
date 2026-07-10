import type { TopicBrief } from "@/lib/acca-briefs"

/* Topic Briefs — MA (A-E) + BT (A-D) + LW (A-D), wave 6 (2026-07-10). */
export const KNOWLEDGE_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── MA — Management Accounting ───────────────────────── */
  {
    paper: "MA",
    area: "A",
    title: "Cost accounting & classification",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why managers slice costs differently",
        body: `A bakery owner asks a simple question: if I bake 500 more loaves next week, what will it cost me? The annual accounts cannot answer that — they lump everything together. Management accounting exists to answer exactly these forward-looking questions, and the first tool is classification: sorting costs by how they BEHAVE when activity changes.

A variable cost rises in a straight line with output — flour doubles when loaves double. A fixed cost stays flat within a range — the bakery's rent is the same whether you bake 100 loaves or 10,000. A stepped fixed cost is flat until capacity runs out, then jumps — one supervisor covers up to three bakers, a fourth baker forces a second supervisor. A semi-variable cost mixes both — a phone bill with a standing charge plus a rate per call.

Costs are also classified by traceability. A direct cost can be traced to one unit of product — the flour in a specific loaf, the wages of the baker who shaped it. An indirect cost (an overhead) benefits many products at once — rent, the manager's salary, machine depreciation. Direct materials plus direct labour plus direct expenses make prime cost; add production overheads and you have full production cost.

One more classification runs through every later chapter: cost centres collect costs (the ovens department), profit centres collect costs and revenues (a shop), and investment centres also control their own capital (a whole division). Get the vocabulary fixed now, because costing, budgeting and variances all assume you can say instantly whether a cost is fixed or variable, direct or indirect.`,
      },
      {
        kind: "structure",
        heading: "The classification and high-low kit",
        body: `Cost behaviour:
Variable — total cost rises proportionally with output; cost PER UNIT is constant.
Fixed — total cost constant within the relevant range; cost PER UNIT falls as output rises.
Stepped fixed — constant, then jumps at a capacity threshold.
Semi-variable — fixed element plus variable element.

High-low method (splitting a semi-variable cost):
1 Take the HIGHEST and LOWEST activity levels (not the highest and lowest costs).
2 Variable cost per unit = (cost at high − cost at low) ÷ (high units − low units).
3 Fixed cost = total cost at either level − (units at that level × variable cost per unit).
4 Forecast: total cost = fixed cost + (forecast units × variable cost per unit).

Traceability:
Direct materials + direct labour + direct expenses = prime cost.
Prime cost + production overheads = production cost.

Inventory ordering — the EOQ kit:
Holding cost rises with bigger orders, ordering cost falls with fewer orders; EOQ balances them.
EOQ = square root of (2 × Co × D ÷ Ch), where Co = cost per order, D = annual demand, Ch = holding cost per unit per year.
At the EOQ, total annual ordering cost = total annual holding cost.

Responsibility centres: cost centre (costs only) → profit centre (costs + revenues) → investment centre (costs + revenues + capital employed).`,
      },
      {
        kind: "example",
        heading: "Worked example — high-low with a forecast",
        body: `Marlin Co's maintenance cost over four months: 1,000 units cost $7,000; 1,800 units cost $10,200; 2,400 units cost $12,600; 3,000 units cost $15,000. Forecast the cost of 2,500 units.

Step 1 — pick the extremes of ACTIVITY: high = 3,000 units at $15,000; low = 1,000 units at $7,000. The middle months are ignored entirely.

Step 2 — variable cost per unit:
(15,000 − 7,000) ÷ (3,000 − 1,000) = 8,000 ÷ 2,000 = $4 per unit.

Step 3 — fixed cost, using the high point:
15,000 − (3,000 × 4) = 15,000 − 12,000 = $3,000.
Check with the low point: 7,000 − (1,000 × 4) = $3,000. Same answer — it must be, because both points sit on the same line.

Step 4 — forecast for 2,500 units:
3,000 + (2,500 × 4) = 3,000 + 10,000 = $13,000.

Notice what the method assumes: a straight line between the two extremes, and that 2,500 units sits inside the range we observed (1,000 to 3,000). Forecasting 8,000 units from this data would be extrapolating far outside the relevant range — the fixed cost has probably stepped up by then, and the answer would be fiction.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Picking the highest and lowest COSTS instead of the highest and lowest ACTIVITY levels in high-low — the method is defined by activity, and the two orderings do not always agree.

Saying fixed cost per unit is constant — total fixed cost is constant; per unit it FALLS as output rises. Distractors love the per-unit inversion.

Classifying supervisor salaries or factory rent as direct costs — they cannot be traced to a single unit, so they are indirect production overheads.

Using annual demand and PER-ORDER holding cost the wrong way round in EOQ — Co is the cost of placing one order, Ch is the cost of holding one unit for one year.

Extrapolating a high-low cost line outside the observed activity range — the linearity assumption only holds within the relevant range.`,
      },
    ],
  },
  {
    paper: "MA",
    area: "B",
    title: "Costing techniques",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Getting overheads into unit costs — and knowing when not to",
        body: `Direct costs attach themselves to products naturally: you can see the flour in the loaf. Overheads do not — nobody can point at the slice of factory rent inside one unit. Absorption costing is the machinery for forcing overheads into unit costs anyway: allocate and apportion overheads to departments, then absorb them into units using a predetermined overhead absorption rate (OAR), usually per labour hour or machine hour.

The word predetermined matters. The OAR is set BEFORE the year starts, from budgeted figures, so that jobs can be priced all year without waiting for actual overheads. The cost of that convenience is that budget and reality never match exactly, so at the year end there is over- or under-absorbed overhead to adjust in the profit statement.

Marginal costing takes the opposite view: fixed production overheads are a cost of the PERIOD, not the product, so units carry only variable cost. The star of marginal costing is contribution — selling price minus variable cost — the amount each unit contributes towards fixed costs and then profit. Contribution powers cost-volume-profit analysis: breakeven points, margins of safety, and target-profit volumes.

The two systems report different profits whenever inventory levels change, because absorption costing carries some fixed overhead forward inside closing inventory while marginal costing expenses it immediately.

Finally, the method must fit the work. Job costing prices one-off jobs; batch costing spreads a batch's cost over the units in it; service costing uses composite units like the tonne-kilometre; and process costing handles continuous flows where identical units pour out of a process, using equivalent units to value work still only part-finished at the period end.`,
      },
      {
        kind: "structure",
        heading: "OAR, reconciliation, EU table and the CVP kit",
        body: `Absorption costing:
OAR = budgeted overheads ÷ budgeted activity (labour hours, machine hours or units).
Overhead absorbed = OAR × ACTUAL activity.
Over-absorption: absorbed MORE than actual overhead → ADD to profit.
Under-absorption: absorbed LESS than actual overhead → DEDUCT from profit.

Absorption vs marginal profit:
Inventory rises → absorption profit HIGHER, by units of increase × fixed overhead per unit.
Inventory falls → absorption profit LOWER by the same logic.
Inventory unchanged → identical profits.

Process costing — equivalent units table, four steps:
1 Physical flow: units in = units out (finished + closing WIP + losses).
2 Equivalent units: finished units count fully; closing WIP counts at its percentage complete, per cost element (materials often 100%, conversion less).
3 Cost per EU = costs for the element ÷ equivalent units for the element.
4 Value outputs: finished goods and WIP at cost per EU. Normal loss carries no cost (scrap value reduces process cost); abnormal loss or gain is valued like a good unit.

CVP kit (marginal costing in action):
Contribution per unit = selling price − variable cost per unit.
Breakeven (units) = fixed costs ÷ contribution per unit.
Breakeven (revenue) = fixed costs ÷ C/S ratio, where C/S ratio = contribution ÷ sales.
Margin of safety = (budgeted sales − breakeven sales) ÷ budgeted sales.
Target profit volume = (fixed costs + target profit) ÷ contribution per unit.`,
      },
      {
        kind: "example",
        heading: "Worked example — OAR, over-absorption and the profit gap",
        body: `Tern Co budgets overheads of $100,000 and 20,000 machine hours. During the year actual overheads were $108,000 and actual machine hours 22,000. Each unit takes 2 machine hours; production was 10,000 units, sales 9,000 units, and fixed overhead per unit is $10 (2 hours at the $5 rate).

Step 1 — the OAR, from BUDGET only:
100,000 ÷ 20,000 = $5 per machine hour.

Step 2 — overhead absorbed, using ACTUAL hours:
22,000 × 5 = $110,000.

Step 3 — compare with actual overhead:
Absorbed 110,000 vs actual 108,000 → over-absorbed by $2,000. Too much cost was pushed into products, so the $2,000 is added back to profit.

Step 4 — absorption vs marginal profit:
Production 10,000 − sales 9,000 = inventory UP by 1,000 units.
Each unit in closing inventory carries $10 of fixed overhead under absorption costing, so absorption profit is 1,000 × 10 = $10,000 HIGHER than marginal profit this period. That $10,000 has not vanished — it is parked in inventory and will hit profit when the units are sold.

The rhythm to memorise: OAR from budget, absorb with actual activity, compare with actual spend, then let the inventory movement tell you which profit figure is bigger.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Calculating the OAR from actual figures — it is budgeted overheads over budgeted activity, set in advance; that is the whole point of a predetermined rate.

Adjusting profit the wrong way — over-absorption is ADDED to profit, under-absorption deducted. Distractors always offer the reversed sign.

Forgetting that absorption and marginal profits differ ONLY through the inventory movement — the difference is always change in units × fixed production overhead per unit, nothing else.

Giving normal loss a share of process cost — normal loss is expected and absorbed by good units; only ABNORMAL losses and gains are valued at full cost per equivalent unit.

Computing breakeven with profit per unit instead of contribution per unit — fixed costs are covered by contribution; using profit double-counts the fixed costs.`,
      },
    ],
  },
  {
    paper: "MA",
    area: "C",
    title: "Budgeting",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "The plan before the year begins",
        body: `A budget is the organisation's plan written in numbers: what we intend to sell, make, buy and spend next period. It exists for more than forecasting — the classic list of purposes is planning, coordination, communication, motivation, authorisation, control and evaluation. Control is the big one: once the year starts, actual results are compared with the budget and the differences drive management action.

Budgets are built in a strict order, because each one feeds the next. It starts from the principal budget factor — the thing that limits activity, almost always sales demand. The sales budget therefore comes first. From sales you derive the production budget, adjusting for the finished goods inventory you want to hold. From production you derive the materials USAGE budget, and from usage — adjusting again for raw materials inventory — the materials PURCHASES budget. Labour and overhead budgets follow production too. Everything then rolls up into a master budget: budgeted profit or loss, budgeted statement of financial position, and the cash budget.

The cash budget deserves respect because it obeys different rules: it records money when it MOVES, not when it is earned. Credit sales arrive a month or two late; depreciation never appears at all because no cash leaves.

For control, a fixed budget is useless if actual volume differs from plan — comparing the cost of making 12,000 units against a budget for 10,000 punishes managers for success. A flexible (flexed) budget restates the budget at ACTUAL volume: variable costs are scaled, fixed costs stay put, and only then is the comparison fair.`,
      },
      {
        kind: "structure",
        heading: "The budget chain and its proformas",
        body: `Order of preparation:
Sales budget → production budget → materials usage → materials purchases; also labour and overhead budgets from production → cash budget → master budget.

Production budget (units):
Production = sales + closing finished goods inventory − opening finished goods inventory.

Materials budgets:
Usage (kg) = production units × kg per unit.
Purchases (kg) = usage + closing raw materials inventory − opening raw materials inventory.
Purchases ($) = purchases (kg) × cost per kg.

Cash budget proforma (per month):
Receipts (cash sales, receipts from credit customers by lag, other cash in)
less Payments (payments to suppliers by lag, wages, expenses excluding depreciation, capital spend)
= Net cash flow; opening balance + net cash flow = closing balance.

Flexing a budget:
Variable costs: budgeted cost per unit × ACTUAL units.
Fixed costs: unchanged.
Semi-variable: split first (high-low), then flex only the variable element.

Budget styles worth naming: fixed vs flexible; incremental (last year plus a bit) vs zero-based (justify everything from scratch); rolling (continuously add a new period); top-down (imposed) vs bottom-up (participative).`,
      },
      {
        kind: "example",
        heading: "Worked example — from sales to purchases",
        body: `Osprey Co expects to sell 12,000 units next quarter. It wants closing finished goods inventory of 2,000 units and has 1,500 units in stock now. Each unit needs 3 kg of material costing $2 per kg. Raw materials inventory is 5,000 kg now and should be 4,000 kg at the quarter end.

Step 1 — production budget:
Production = 12,000 + 2,000 − 1,500 = 12,500 units.
Sense check: we sell 12,000 and want inventory to GROW by 500, so we must make 12,500.

Step 2 — materials usage:
12,500 units × 3 kg = 37,500 kg.

Step 3 — materials purchases:
Purchases = 37,500 + 4,000 − 5,000 = 36,500 kg.
Sense check: raw materials inventory is FALLING by 1,000 kg, so we can buy 1,000 kg less than we use.

Step 4 — purchases in dollars:
36,500 × 2 = $73,000.

The pattern repeats twice: need + closing inventory − opening inventory. Finished goods inventory adjusts sales into production; raw materials inventory adjusts usage into purchases. Every budgeting question in the exam is some walk along this chain, so practise until the two inventory adjustments feel automatic.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Reversing the inventory adjustment — it is ADD closing, SUBTRACT opening. Adding opening inventory instead is the single most common budgeting error.

Adjusting usage for finished goods inventory or production for raw materials inventory — finished goods inventory belongs in the production budget, raw materials inventory in the purchases budget. Mixing the two is a favourite distractor.

Putting depreciation in the cash budget — depreciation is not a cash flow. Neither are irrecoverable debts written off; the cash effect is simply that the money never arrives.

Comparing actual costs with the original FIXED budget when volume changed — flex the budget to actual volume first, or the volume difference masquerades as good or bad cost control.

Flexing fixed costs — when you restate the budget at actual volume, only variable (and the variable part of semi-variable) costs scale.`,
      },
    ],
  },
  {
    paper: "MA",
    area: "D",
    title: "Standard costing & variances",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "A target for every unit, a name for every miss",
        body: `Standard costing gives every unit of product a target cost card before production starts: this unit SHOULD use 2 kg of material at $5 per kg, 3 hours of labour at $10 per hour, and so on. Then, when actual results arrive, the differences from standard are calculated, named and handed to whoever can act on them. Each named difference is a variance, and each is favourable (F) if it improves profit or adverse (A) if it hurts it.

The genius of the system is the split. Total material cost might be over budget for two very different reasons: the buyer paid more per kg (a PRICE problem, owned by purchasing) or production used more kg than standard (a USAGE problem, owned by the factory). Variance analysis separates them so each manager answers only for what they control. Labour splits the same way into rate and efficiency; variable overhead into expenditure and efficiency; fixed overhead into expenditure and — under absorption costing — volume. Sales variances split into price and volume.

One idea unlocks every formula: flex to ACTUAL output first. The question is never what did we budget for the year but what SHOULD this actual production have cost. Standard quantity always means the standard allowance FOR ACTUAL OUTPUT.

Interpreting variances matters as much as computing them. Variances interconnect: cheap material (favourable price) may be poor quality and cause adverse usage and adverse labour efficiency. And a variance is only worth investigating if it is significant, persistent and controllable — chasing every small random wobble costs more than it saves.`,
      },
      {
        kind: "structure",
        heading: "The variance family",
        body: `Notation: SP/AP = standard/actual price; SQ = standard quantity for ACTUAL output; AQ = actual quantity; SR/AR = standard/actual rate; SH = standard hours for actual output; AH = actual hours.

Materials:
Price = (SP − AP) × AQ purchased, or AQ × SP − actual cost.
Usage = (SQ − AQ) × SP.

Labour:
Rate = AH × SR − actual wages.
Efficiency = (SH − AH) × SR.
Idle time (if given) = idle hours × SR, always adverse.

Variable overhead:
Expenditure = AH × standard variable OAR − actual variable overhead.
Efficiency = (SH − AH) × standard variable OAR.

Fixed overhead:
Expenditure = budgeted fixed overhead − actual fixed overhead.
Volume (absorption costing only) = (actual output − budgeted output) × fixed OAR per unit.

Sales:
Price = (actual price − standard price) × actual units sold.
Volume = (actual units − budgeted units) × standard contribution per unit (marginal) or standard profit per unit (absorption).

Sign discipline: if the bracket computes to a positive number with the standard figure first, the variance is favourable for costs; for sales price and volume, actual comes first.`,
      },
      {
        kind: "example",
        heading: "Worked example — materials and labour, all four variances",
        body: `Standard cost card per unit: materials 2 kg at $5 per kg; labour 3 hours at $10 per hour. Actual results for the period: 1,000 units produced; 2,100 kg bought and used for $10,920; 3,100 hours worked and paid, costing $30,380.

Step 1 — flex the standards to actual output (1,000 units):
SQ = 1,000 × 2 = 2,000 kg. SH = 1,000 × 3 = 3,000 hours.

Step 2 — material price:
2,100 kg SHOULD cost 2,100 × 5 = 10,500. It DID cost 10,920.
Variance = 10,500 − 10,920 = 420 ADVERSE (paid more per kg than standard).

Step 3 — material usage:
1,000 units SHOULD use 2,000 kg. They DID use 2,100 kg.
Variance = (2,000 − 2,100) × 5 = 500 ADVERSE.

Step 4 — labour rate:
3,100 hours SHOULD cost 3,100 × 10 = 31,000. They DID cost 30,380.
Variance = 31,000 − 30,380 = 620 FAVOURABLE (paid below standard rate).

Step 5 — labour efficiency:
1,000 units SHOULD take 3,000 hours. They DID take 3,100.
Variance = (3,000 − 3,100) × 10 = 1,000 ADVERSE.

Step 6 — read the story: cheaper labour (620 F) that worked slower (1,000 A) — possibly less-skilled workers hired at a lower rate, also wasting material (500 A). One decision, three connected variances.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Comparing actuals with the ORIGINAL budget quantity instead of the standard allowance for actual output — always flex first; SQ and SH are for what was actually produced.

Valuing the usage and efficiency variances at actual price or rate — quantity variances are always valued at STANDARD price or rate, so the price effect is not counted twice.

Getting the sign backwards — spending less than standard or using less than standard is favourable; many distractors present the right number with the wrong direction.

Including a fixed overhead volume variance under marginal costing — marginal costing does not absorb fixed overheads into units, so there is expenditure variance only.

Valuing the sales volume variance at selling price — it is standard contribution (marginal) or standard profit (absorption) per unit; extra units do not add the whole selling price to profit.`,
      },
    ],
  },
  {
    paper: "MA",
    area: "E",
    title: "Performance measurement",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Measuring what managers actually control",
        body: `Once an organisation splits into divisions, head office needs a fair way to answer two questions: how is the DIVISION doing, and how is its MANAGER doing? They are not the same question — a manager may be doing brilliantly in a dying market — and the golden rule is controllability: judge people only on what they can influence.

The measurement toolkit starts with money. Profit margin tells you how much of each sales dollar survives as profit; asset turnover tells you how hard the assets are worked; multiply them and you get return on capital employed (ROCE), the headline percentage return on the money tied up. For investment centres, ROCE (often called ROI at divisional level) has a famous flaw: a manager judged on a percentage will reject any project that earns less than their CURRENT percentage, even when the project earns more than the company's cost of capital. Residual income (RI) fixes this by charging the division notional interest on its capital and looking at the absolute surplus left over.

Money alone is not enough — profits are short-term and easy to massage — so the balanced scorecard adds three non-financial perspectives: customer, internal business process, and innovation and learning, each with its own goals and measures. For not-for-profit organisations, where there is no profit to measure, performance is judged by the three Es: economy (buying inputs cheaply), efficiency (turning inputs into outputs well) and effectiveness (achieving the objectives). Whatever the measure, the same warning applies: what gets measured gets managed, so a bad metric buys you bad behaviour.`,
      },
      {
        kind: "structure",
        heading: "The ratio and scorecard kit",
        body: `Profitability chain:
Profit margin = operating profit ÷ sales × 100.
Asset turnover = sales ÷ capital employed.
ROCE = operating profit ÷ capital employed × 100 = margin × asset turnover.

Divisional measures:
ROI = divisional profit ÷ divisional capital employed × 100.
RI = divisional profit − (capital employed × cost of capital).
Accept a project when RI is positive; ROI can wrongly reject it.

Liquidity (for completeness): current ratio = current assets ÷ current liabilities; quick ratio excludes inventory.

Balanced scorecard perspectives:
Financial — how do shareholders see us? (ROCE, margin, cash flow)
Customer — how do customers see us? (satisfaction, retention, delivery time)
Internal business process — what must we excel at? (quality, cycle time, unit cost)
Innovation and learning — can we keep improving? (new products, training, staff retention)

Not-for-profit — the three Es:
Economy — minimise cost of INPUTS at a given quality.
Efficiency — maximise OUTPUT per unit of input.
Effectiveness — achieve the OBJECTIVES.

Responsibility pairing: cost centre → cost per unit and variances; profit centre → controllable profit; investment centre → ROI and RI on controllable capital.`,
      },
      {
        kind: "example",
        heading: "Worked example — ROI says no, RI says yes",
        body: `The Delta division of Heron Co earns a profit of $60,000 on capital employed of $400,000. Head office's cost of capital is 12%. The divisional manager, whose bonus depends on ROI, is offered a new project: profit of $13,000 per year on additional capital of $100,000.

Step 1 — current performance:
ROI = 60,000 ÷ 400,000 = 15%.
RI = 60,000 − (400,000 × 12%) = 60,000 − 48,000 = $12,000.

Step 2 — the project on its own:
Project ROI = 13,000 ÷ 100,000 = 13%.
Project RI = 13,000 − (100,000 × 12%) = 13,000 − 12,000 = $1,000 positive.

Step 3 — the division WITH the project:
New ROI = 73,000 ÷ 500,000 = 14.6% — LOWER than the current 15%, so an ROI-judged manager rejects it.
New RI = 73,000 − (500,000 × 12%) = 73,000 − 60,000 = $13,000 — HIGHER than the current 12,000.

Step 4 — the verdict: the project earns 13% against a 12% cost of capital, so it creates value and the company wants it. ROI motivates the manager to turn it down; RI motivates acceptance. This is goal congruence in one page: the measure you choose decides the decision you get.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Judging a manager on non-controllable items — head office recharges or inherited assets belong in the DIVISION's evaluation, not the MANAGER's.

Assuming a higher ROI always means a better decision — a project above the cost of capital but below current ROI is value-creating yet ROI-rejected; RI gets it right.

Comparing RI between divisions of different sizes — RI is an absolute number, so big divisions produce big RIs; use it over time within one division, not across divisions.

Confusing efficiency with effectiveness — efficiency is output per input; effectiveness is whether objectives were met. A hospital that treats patients cheaply but badly is efficient, not effective.

Treating the balanced scorecard as financial measures plus decoration — each perspective needs specific goals and measures, and the scorecard fails if only the financial numbers carry consequences.`,
      },
    ],
  },
  /* ───────────────────────── BT — Business & Technology ───────────────────────── */
  {
    paper: "BT",
    area: "A",
    title: "Business organisation & environment",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "The organisation and the world pressing in on it",
        body: `An organisation is simply people brought together to achieve what none of them could achieve alone — a supermarket, a charity, a tax office. BT starts by mapping the varieties: commercial businesses exist to make profit for owners; not-for-profit organisations (charities, clubs) pursue a cause; public sector bodies deliver services funded by taxation; mutuals and cooperatives are owned by their members. Ownership shapes everything else — a sole trader answers to no one, a partnership shares control, a limited company separates the owners (shareholders) from the managers who run it.

No organisation floats free of its surroundings, and BT gives you a nested set of lenses for scanning them. Closest in are the stakeholders — every group with an interest in what the organisation does: shareholders, employees, customers, suppliers, lenders, government, the community. Their interests conflict (workers want higher pay; shareholders want lower costs), so Mendelow's matrix ranks them by power and interest to decide who must be actively managed and who merely informed.

Further out sits the macro-environment, scanned with PESTEL: political, economic, social, technological, environmental and legal factors, none of which the organisation controls but all of which it must anticipate. Between the two sits the industry, whose profitability Porter's five forces explains: the fiercer the competition, the stronger the buyers and suppliers, and the easier it is for new entrants and substitutes to appear, the thinner everyone's margins. SWOT then pulls the whole scan together — internal strengths and weaknesses against external opportunities and threats.`,
      },
      {
        kind: "structure",
        heading: "The scanning models, one screen",
        body: `Mendelow's power-interest matrix:
Low power, low interest → minimal effort.
Low power, high interest → keep informed.
High power, low interest → keep satisfied.
High power, high interest → key players: engage and involve.

PESTEL factors:
Political — government stability, tax policy, trade rules.
Economic — interest rates, inflation, exchange rates, unemployment.
Social — demographics, lifestyles, attitudes, education.
Technological — automation, e-commerce, R&D, disruption.
Environmental — climate, sustainability pressure, waste rules.
Legal — employment law, health and safety, consumer protection, data protection.

Porter's five forces (industry profitability):
1 Threat of new entrants — weak barriers invite competition.
2 Threat of substitutes — different products meeting the same need.
3 Bargaining power of buyers — few, large or price-sensitive customers.
4 Bargaining power of suppliers — few or critical suppliers.
5 Competitive rivalry — the intensity of the fight among existing firms.

SWOT: strengths and weaknesses are INTERNAL (resources, brand, systems); opportunities and threats are EXTERNAL (market shifts, regulation, rivals).

Organisation types: sole trader (unlimited liability) → partnership (shared, usually unlimited) → limited company (separate legal person, limited liability); plus not-for-profit, public sector, cooperatives and NGOs.`,
      },
      {
        kind: "example",
        heading: "Worked mini-scenario — Mendelow at a supermarket chain",
        body: `Grovemart, a national supermarket chain, announces it will close 40 small-town stores and move online. Classify four stakeholders on Mendelow's matrix and state the management strategy for each.

Step 1 — the food safety regulator. Power: high — it can suspend licences. Interest in THIS decision: low — store closures are not a safety issue. Quadrant: keep satisfied. Strategy: stay compliant, no special campaign.

Step 2 — employees of the closing stores. Power: low individually. Interest: very high — their jobs are at stake. Quadrant: keep informed. Strategy: early, honest communication, redeployment offers, consultation. If they unionise, their power rises and they migrate toward key player — the matrix is a snapshot, not a life sentence.

Step 3 — the pension funds holding 30% of Grovemart's shares. Power: high — they vote and can unseat the board. Interest: high — the strategy shift changes the risk profile. Quadrant: key players. Strategy: engage directly, involve in the strategy narrative before the announcement.

Step 4 — a small-town customer who shops there twice a year. Power: negligible. Interest: mild. Quadrant: minimal effort — monitor sentiment, nothing more.

The exam skill is the two-question habit: how much POWER does this group have over the decision, and how much INTEREST in it? Answer those and the quadrant, and the strategy, falls out.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Placing a stakeholder by importance in general rather than power and interest in THE decision at hand — the regulator is mighty, but if it does not care about this issue, it is keep satisfied, not key player.

Listing internal factors under opportunities or threats in SWOT — a strong brand is a strength, not an opportunity; opportunities and threats live OUTSIDE the organisation.

Confusing substitutes with competitors in Porter's model — a rival supermarket is rivalry; a meal-delivery app replacing shopping trips is a substitute. Substitutes come from OUTSIDE the industry.

Reading PESTEL factors as things the firm should change — PESTEL is the uncontrollable macro-environment; the firm anticipates and adapts, it does not manage inflation.

Assuming every organisation exists for profit — objectives differ by type; a charity's primary objective is its cause, and value-for-money replaces profit as the yardstick.`,
      },
    ],
  },
  {
    paper: "BT",
    area: "B",
    title: "People in organisations",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why people work hard — and why teams work at all",
        body: `Strip any organisation to its core and you find the same puzzle: how do you get ordinary people to give sustained effort toward someone else's goals? BT approaches it from three angles — leadership, motivation and teams.

Leadership and management are related but distinct: managers plan, organise and control the existing machine; leaders set direction and inspire movement. Writers slice management differently — Fayol's five functions, Mintzberg's roles, Taylor's scientific management — but the exam mostly wants you to recognise whose theory is whose.

Motivation theories answer the effort question. Content theories say people are driven by needs: Maslow stacks five needs in a hierarchy that must be climbed in order, and Herzberg splits the workplace in two — hygiene factors (pay, conditions, supervision) whose absence demotivates but whose presence merely prevents complaint, and motivators (achievement, recognition, the work itself, responsibility, growth) which alone create satisfaction. Process theories describe the calculation instead: Vroom's expectancy theory says effort flows only when the person believes effort leads to performance, performance leads to reward, and the reward is worth having — and the relationship is multiplicative, so one zero kills the whole product.

Teams add the social layer. Belbin showed that a high-performing team needs a balance of ROLES — not nine people, but nine tendencies covered. Tuckman showed teams mature through predictable stages — forming, storming, norming, performing (and eventually adjourning) — and that the conflict of storming is a stage to be managed through, not proof the team has failed.`,
      },
      {
        kind: "structure",
        heading: "The people models, one screen",
        body: `Maslow's hierarchy (climb in order):
Physiological → safety → social (belonging) → esteem → self-actualisation.

Herzberg's two factors:
Hygiene (prevent dissatisfaction only): pay, working conditions, company policy, supervision, job security.
Motivators (create satisfaction): achievement, recognition, the work itself, responsibility, advancement, growth.

Vroom's expectancy theory:
Force (motivation) = valence × expectancy — where valence is how much the reward is wanted and expectancy is the believed effort-to-outcome link. Any factor at zero → motivation is zero.

Belbin's nine team roles:
Plant (creative ideas), Resource investigator (contacts), Coordinator (chairs), Shaper (drives), Monitor-evaluator (judges), Teamworker (harmonises), Implementer (organises), Completer-finisher (polishes), Specialist (expert knowledge).

Tuckman's stages:
Forming (polite, unclear) → storming (conflict over roles and power) → norming (rules and trust settle) → performing (energy flows to the task) → adjourning (disband and review).

Leadership reference points: Fayol — plan, organise, command, coordinate, control. Mintzberg — interpersonal, informational, decisional roles. Blake and Mouton — concern for people vs concern for production grid.`,
      },
      {
        kind: "example",
        heading: "Worked mini-scenario — diagnosing a flat team",
        body: `A finance shared-services team was formed four months ago. Pay is competitive and the office is comfortable, yet output is mediocre. Meetings are argumentative — two senior members openly compete to set the agenda. Staff describe the work as repetitive and say nobody notices when they do it well. Diagnose with Tuckman and Herzberg, and prescribe.

Step 1 — locate the team on Tuckman. Open conflict over who leads, four months in: the team is stuck in STORMING. It never agreed norms, so energy goes into the power contest instead of the work. Prescription: the manager facilitates — clarify roles, agree ground rules, push the team into norming. Suppressing the conflict skips the stage rather than resolving it.

Step 2 — run Herzberg over the motivation complaint. Pay and conditions are fine — hygiene factors are satisfied, which explains why nobody is quitting, but hygiene cannot create drive. What is missing is the motivator list: recognition (nobody notices good work), the work itself (repetitive), responsibility and growth. Prescription: job enrichment — give members ownership of whole processes, feedback on results, visible recognition. A pay rise would act on hygiene and change nothing.

Step 3 — one Belbin observation: two Shapers and no Coordinator is a recipe for exactly this storming. Adding coordination — not another driver — balances the roles.

The exam pattern: name the model, place the scenario in it, and let the model dictate the fix.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Calling pay a motivator under Herzberg — pay is a hygiene factor; fixing it removes dissatisfaction but does not create satisfaction. This is the most-tested line in the area.

Treating Maslow's levels as simultaneous — the hierarchy is climbed in order; a higher need only motivates once the lower ones are broadly met.

Reading storming as team failure — Tuckman's conflict stage is normal and necessary; the error is managing it by suppression instead of facilitation.

Assuming Belbin requires nine people — one person can cover several roles; the requirement is that the ROLES are covered and balanced, not the headcount.

Averaging Vroom's factors instead of multiplying — expectancy theory is multiplicative, so a reward nobody values (valence zero) produces zero motivation no matter how achievable the target.`,
      },
    ],
  },
  {
    paper: "BT",
    area: "C",
    title: "Governance, ethics & professional behaviour",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Watching the watchmen",
        body: `In a large company the people who OWN it (shareholders) are not the people who RUN it (directors and managers). That separation creates the agency problem: the agents may quietly serve themselves — fat pay, empire building, massaged numbers — at the principals' expense. Corporate governance is the system of rules and structures that keeps the agents honest and the company directed toward its stakeholders' interests.

The structural answers are consistent across governance codes. Split the roles of chair (runs the board) and chief executive (runs the business) so no individual has unfettered power. Balance the executive directors with independent non-executive directors (NEDs) who bring outside judgement and no pay-cheque dependence. Delegate the sensitive jobs to committees of NEDs: the audit committee oversees financial reporting, internal control and the external auditor; the remuneration committee sets executive pay (so executives do not set their own); the nomination committee manages board appointments.

Structures alone are not enough, which is why the profession adds a personal layer. ACCA's Code of Ethics rests on five fundamental principles — integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour — and, because rules cannot list every temptation, it uses a conceptual framework: identify THREATS to the principles, evaluate their significance, and apply SAFEGUARDS to eliminate or reduce them. The five threat families — self-interest, self-review, advocacy, familiarity and intimidation — are the vocabulary of nearly every ethics question, and the skill is naming which threat a scenario contains before reaching for a safeguard.`,
      },
      {
        kind: "structure",
        heading: "The governance and ethics kit",
        body: `Governance structures:
Chair ≠ CEO — separate the board's leader from the business's leader.
NEDs — independent outsiders; governance codes expect a strong independent element on the board.
Audit committee (NEDs) — financial reporting, internal control, liaison with external audit, whistleblowing route.
Remuneration committee (NEDs) — sets directors' pay; no one decides their own reward.
Nomination committee — board composition and succession.

The five fundamental principles:
Integrity — straightforward and honest.
Objectivity — no bias, conflict of interest or undue influence.
Professional competence and due care — keep skills current; act diligently.
Confidentiality — no disclosure or personal use of information without authority.
Professional behaviour — comply with law and regulation; avoid discrediting the profession.

The five threats, with a signature example each:
Self-interest — a financial stake in the outcome (bonus, fee dependence, shares).
Self-review — checking your own earlier work.
Advocacy — promoting a client's position so hard you compromise objectivity.
Familiarity — too close for too long (friend, family, long association).
Intimidation — pressure through threats, real or perceived.

Safeguards ladder: apply the reporting hierarchy → consult the audit committee or those charged with governance → take ACCA or legal advice → decline or resign as the last resort. Document every step.`,
      },
      {
        kind: "example",
        heading: "Worked mini-scenario — naming the threats",
        body: `Priya is a part-qualified ACCA accountant at Quilby Ltd. Year-end is close, and the finance director tells her to hold the ledger open and record January sales in December so the company hits a revenue target tied to the FD's bonus. He adds, smiling, that people who are flexible get promoted here — and people who are not, do not. Identify the threats and the response.

Step 1 — name what is being asked: recording next year's sales this year is deliberate misstatement. Complying would breach integrity (dishonest reporting) and professional behaviour, and doing it under pressure breaches objectivity.

Step 2 — classify the threats. The promotion hint and the veiled warning about her job are an INTIMIDATION threat — pressure through perceived consequences. Her own interest in being promoted is a SELF-INTEREST threat. Note the FD's bonus is HIS self-interest, which explains his behaviour but is not a threat to Priya's compliance; the exam wants the threats to HER principles.

Step 3 — apply the safeguards ladder. Refuse politely and explain the cut-off rule; raise the matter with a more senior person outside the FD's line, or the audit committee where one exists; consult ACCA's ethics helpline; document each conversation with dates. If the company insists and no safeguard reduces the threat, resignation is the final safeguard — an unpleasant answer the examiner fully accepts.

The mark-winning habit: name each threat with its technical label, then match safeguards to the threat, in escalating order.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Confusing governance with management — governance DIRECTS and OVERSEES (the board's job); management RUNS operations. Answers that give the audit committee operational duties get this wrong.

Putting executives on the remuneration or audit committee — these committees exist precisely so that independent NEDs, not executives, oversee pay and reporting.

Treating confidentiality as absolute — disclosure is permitted or required when authorised by the client, required by law, or when there is a professional duty. The trap runs both ways: leaking is a breach, but so is hiding behind confidentiality when the law compels disclosure.

Labelling every pressure scenario self-interest — if the pressure comes from someone else's threats, it is intimidation; self-interest is your own stake in the outcome. Examiners separate the two deliberately.

Jumping straight to resignation — resignation is the LAST safeguard. Marks sit in the escalation ladder: refuse, report internally, consult, document, and only then walk.`,
      },
    ],
  },
  {
    paper: "BT",
    area: "D",
    title: "Accounting, internal control & technology",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Trustworthy numbers do not happen by accident",
        body: `Every decision in a business leans on numbers produced by the accounting function: financial accounting reports to outsiders, management accounting informs insiders, treasury manages cash and funding, payroll pays people correctly, and internal audit checks that the whole machine works. For those numbers to be worth trusting, the organisation needs internal control — the policies and procedures that keep operations effective, reporting reliable, and laws complied with.

Controls exist because things go wrong in two ways: error (honest mistakes) and fraud (deliberate deception for gain). Fraud needs three ingredients at once — dishonesty in the person, opportunity in the system, and motive in their circumstances. A business cannot fix people's honesty or their debts, but it CAN close opportunity, and that is what control activities do. The most powerful single control is segregation of duties: split a transaction so that no one person can authorise it, record it and custody the asset. One person with all three hats can steal and cover the theft indefinitely.

Technology now carries most of this. Automation and integrated systems remove manual error and leave audit trails; big data and analytics let firms spot patterns humans miss; cloud computing moves systems to third-party providers, trading capital cost for dependence on someone else's security. All of it raises cyber risk — phishing, malware and ransomware, hacking and denial-of-service — met by cyber security controls: access management and strong authentication, encryption, firewalls, patching, backups and staff training, because the weakest component of any secure system is usually a helpful human with a password.`,
      },
      {
        kind: "structure",
        heading: "The control and fraud kit",
        body: `Components of an internal control system:
Control environment (tone at the top) → risk assessment → control activities → information and communication → monitoring.

Control activities checklist:
Segregation of duties — split authorisation, recording and custody.
Authorisation — approval limits for transactions.
Physical controls — locks, safes, restricted access.
Arithmetic and accounting checks — reconciliations, control accounts, trial balance.
Personnel controls — recruitment screening, training, rotation.
Supervision and management review — oversight, exception reports, internal audit.

Fraud prerequisites (all three needed): dishonesty + opportunity + motive.
Fraud types: misappropriation of assets (theft, teeming and lading, ghost employees) vs fraudulent financial reporting (overstating revenue or assets to hit targets).

Cyber threats:
Phishing — fraudulent messages harvesting credentials.
Malware / ransomware — malicious software; ransomware encrypts data for payment.
Hacking — unauthorised access to systems.
Denial-of-service — flooding systems to take them offline.

Cyber and IT controls: access controls and multi-factor authentication, encryption, firewalls, patch management, backups (tested), security training.

Technology themes: automation of routine accounting, big data and analytics for decision-making, cloud (scalable, but provider-dependent), and the finance role shifting from recording to interpreting.`,
      },
      {
        kind: "example",
        heading: "Worked mini-scenario — one clerk, three hats",
        body: `At Bramford Ltd, a small wholesaler, purchasing clerk Dan raises purchase orders, receives the goods into the warehouse, approves suppliers' invoices for payment, and posts the payments in the ledger. Internal audit is asked what could go wrong and what to change.

Step 1 — name the weakness: total absence of segregation of duties. Dan authorises (raises orders, approves invoices), has custody (receives goods) and records (posts payments) — all three roles in one person.

Step 2 — spell out the fraud opportunity: Dan could create a fictitious supplier, raise orders to it, confirm ghost deliveries, approve the invoices and post the payments — and the books would balance perfectly. All three fraud prerequisites can align: the OPPORTUNITY is wide open, and the company controls neither his honesty nor his motives.

Step 3 — recommend controls, matched to the gap:
Segregate — ordering, goods receipt, invoice approval and ledger posting go to different people; in a small firm, at minimum separate approval and payment from ordering.
Authorise — approval limits; orders above a threshold need a manager's sign-off.
Check — match invoice to order and goods received note (three-way match) before payment; a supplier statement reconciliation monthly, done by someone other than Dan.
Supervise — management review of new suppliers added to the master file.

Step 4 — the exam-shaped conclusion: controls are recommended per weakness, not as a generic list — every recommendation above answers a specific door left open.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Believing controls eliminate fraud — controls give reasonable, not absolute, assurance; collusion between two people defeats segregation of duties.

Confusing internal audit with external audit — internal audit reports to management or the audit committee on controls and operations; external audit reports to SHAREHOLDERS on the financial statements. Different customer, different question.

Treating fraud and error as the same risk — error is unintentional, fraud is deliberate; controls that catch mistakes (reconciliations) may not catch someone actively concealing.

Answering every cyber question with a firewall — match the control to the threat: phishing is beaten by training and multi-factor authentication; ransomware by patching and tested backups; a firewall does not stop an employee emailing their password.

Forgetting all three fraud prerequisites — dishonesty, opportunity AND motive must coincide; exam scenarios often show two and ask what is missing, and the business can usually only remove opportunity.`,
      },
    ],
  },
  /* ───────────────────────── LW — Corporate & Business Law (ENG) ───────────────────────── */
  {
    paper: "LW",
    area: "A",
    title: "Essential elements of the legal system",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Where English law comes from and who decides it",
        body: `English law grows from two great roots. The first is case law: for centuries judges have decided disputes and, through the doctrine of precedent, their reasoning binds later courts. The common law grew this way, later supplemented by equity — a parallel body of fairness-based rules (and remedies like injunctions and specific performance) developed to soften the common law's rigidity. The second root is legislation: Acts of Parliament, which outrank everything, plus delegated legislation — rules made by ministers, local authorities and others under powers an Act grants them.

Precedent has a precise mechanism. Only the ratio decidendi — the legal reason essential to the decision — binds; everything else a judge says (obiter dicta) is merely persuasive. Whether a precedent binds depends on the court hierarchy: the Supreme Court binds everyone below; the Court of Appeal binds itself and below; decisions bind downwards, never upwards. A later court can escape a precedent by distinguishing it (the material facts differ), and a higher court can overrule an old precedent or reverse the actual decision under appeal.

Because Parliament's words must be applied to situations Parliament never imagined, judges use rules of statutory interpretation: the literal rule (ordinary meaning, even if absurd), the golden rule (avoid absurdity), the mischief rule (ask what wrong the Act was passed to cure) and the modern purposive approach (interpret to achieve the Act's purpose).

One distinction frames the whole paper: criminal law is the state punishing wrongs (prosecution must prove guilt beyond reasonable doubt), while civil law compensates individuals (the claimant proves the case on the balance of probabilities). Same event, two possible trials, two standards of proof.`,
      },
      {
        kind: "structure",
        heading: "The system in tables",
        body: `Sources of law, ranked:
Acts of Parliament (supreme) → delegated legislation (valid only within the enabling Act; challengeable as ultra vires) → case law (common law and equity).

Court hierarchy (civil): Supreme Court → Court of Appeal (Civil Division) → High Court → County Court.
Court hierarchy (criminal): Supreme Court → Court of Appeal (Criminal Division) → Crown Court → Magistrates' Court.

Precedent rules:
Ratio decidendi — binding on lower courts.
Obiter dicta — persuasive only.
Avoiding precedent: distinguish (facts materially different), overrule (higher court kills the old rule), reverse (appeal court changes THIS case's outcome).

Statutory interpretation:
Literal rule — words given their plain, ordinary meaning.
Golden rule — literal meaning modified to avoid absurdity.
Mischief rule — interpret to suppress the mischief the Act targeted.
Purposive approach — give effect to the purpose of the legislation.
Aids: intrinsic (the Act itself — long title, definitions) and extrinsic (dictionaries, Hansard, reports).

Criminal vs civil:
Criminal — state v defendant; prosecution; guilt beyond reasonable doubt; fines and imprisonment.
Civil — claimant v defendant; liability on the balance of probabilities; damages and equitable remedies.`,
      },
      {
        kind: "example",
        heading: "Worked application — a bicycle and a statute",
        body: `A statute makes it an offence to be drunk in charge of a carriage on the highway. Corbett is arrested wheeling his bicycle along a road while drunk. Is a bicycle a carriage? Work it as a lawyer would.

Issue: does the offence extend to a bicycle — is a bicycle within the statutory word carriage?

Rule: the court may apply the literal rule (ordinary meaning of carriage — a horse-drawn or motor vehicle, which a bicycle arguably is not), or the mischief rule — ask what wrong Parliament was trying to cure, and read the words to suppress it.

Application: on the literal rule Corbett may escape: nobody in ordinary speech calls a bicycle a carriage, and if the words are clear the court applies them even if the outcome looks odd. On the mischief rule the analysis flips: the Act's mischief is drunken people in control of transport endangering road users; a drunk cyclist is squarely within that danger, so carriage is read to include a bicycle. This mirrors Corkery v Carpenter, where the court used the mischief approach and the cyclist was convicted.

Conclusion: under the mischief rule (and the modern purposive approach, which reaches the same place), Corbett is guilty; the interpretation rule chosen decides the case.

The exam takeaway: name the rule, show what each rule does to THESE facts, and let the comparison earn the marks — interpretation questions reward the contrast, not just the conclusion.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Treating everything a judge says as binding — only the ratio decidendi binds; obiter dicta, however eminent, is persuasive.

Saying precedent binds upwards or sideways from lower courts — the Supreme Court is not bound by the Court of Appeal; binding force flows DOWN the hierarchy.

Confusing overruling with reversing — overruling rejects the RULE from an earlier, different case; reversing changes the outcome of THE case on appeal.

Calling delegated legislation inferior in force — while it can be struck down as ultra vires, valid delegated legislation has the full force of law; the trap is the opposite one too: unlike an Act, it CAN be challenged in the courts.

Mixing the standards of proof — beyond reasonable doubt belongs to criminal trials only; a civil claimant wins on the balance of probabilities. Answers that demand the criminal standard in a contract dispute lose easy marks.`,
      },
    ],
  },
  {
    paper: "LW",
    area: "B",
    title: "The law of obligations — contract & tort",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Promises the law will enforce, and harms it will remedy",
        body: `The law of obligations answers two everyday questions. First: when does a promise become legally binding? That is contract. Second: when must you compensate someone you harmed without any contract at all? That is tort, and for this exam, chiefly the tort of negligence.

A contract needs three elements. AGREEMENT: an offer — a definite willingness to be bound — met by an unqualified acceptance. Offers must be separated from invitations to treat (shop displays, advertisements, auctions), which merely invite offers; yet an advertisement CAN be an offer if it shows clear willingness to be bound, as in Carlill v Carbolic Smoke Ball Co, where the company promised 100 pounds to anyone who used its remedy and still caught flu. CONSIDERATION: each side must give something of value — the law enforces bargains, not gratuitous promises. Consideration must be sufficient (have some value) but need not be adequate (a fair price), it must not be past, and performing an existing duty is normally no consideration. INTENTION to create legal relations: presumed present in commercial dealings, presumed absent in domestic ones — both presumptions rebuttable.

Negligence needs three elements of its own: a duty of care owed to the claimant — the neighbour principle of Donoghue v Stevenson, refined by Caparo v Dickman into foreseeability, proximity, and fairness; breach of that duty, judged against the reasonable person, weighing the likelihood and seriousness of harm against the cost of precautions; and damage caused by the breach — factual causation (the but-for test) plus legal remoteness (only reasonably foreseeable kinds of loss are recoverable).`,
      },
      {
        kind: "structure",
        heading: "The rule tables",
        body: `Offer and acceptance:
Invitations to treat, not offers: shop displays (Fisher v Bell; Pharmaceutical Society v Boots), most advertisements, auctions.
Unilateral offer to the world — valid; acceptance by performance (Carlill v Carbolic Smoke Ball Co).
Counter-offer kills the original offer (Hyde v Wrench); a mere request for information does not.
Acceptance must be communicated; silence cannot be imposed as acceptance (Felthouse v Bindley).
Postal rule — a posted acceptance is effective when POSTED, if post is a reasonable means (Adams v Lindsell).
Offers end by: revocation before acceptance (communicated), rejection or counter-offer, lapse of time, death.

Consideration:
Must be sufficient, need not be adequate (Chappell v Nestle — chocolate wrappers sufficed).
Past consideration is no consideration (Re McArdle).
Existing contractual duty is no consideration (Stilk v Myrick), unless the duty is exceeded (Hartley v Ponsonby) or the promisor gains a practical benefit (Williams v Roffey).
Part payment of a debt does not discharge it (Pinnel's case; Foakes v Beer), subject to promissory estoppel.

Intention: domestic — presumed NO intention (Balfour v Balfour), rebuttable (Merritt v Merritt); commercial — presumed intention.

Negligence elements:
1 Duty of care — Caparo: foreseeability + proximity + fair, just and reasonable.
2 Breach — the reasonable person standard; professionals judged against their profession.
3 Damage — but-for causation, no break in the chain, loss not too remote (The Wagon Mound).
Defences: contributory negligence (damages reduced), consent (volenti).`,
      },
      {
        kind: "example",
        heading: "Worked application — an offer, a counter-offer and a letter",
        body: `On Monday, Rana writes to Sam offering to sell her van for 9,000 pounds. On Tuesday, Sam replies: I will pay 8,000. On Wednesday, hearing nothing, Sam posts a letter saying: I accept your 9,000 offer after all. On Thursday, before the letter arrives, Rana sells the van to Tara and phones Sam to withdraw. Sam claims a binding contract. Advise Rana. IRAC:

Issue: was Rana's offer still open when Sam purported to accept, and did the postal rule create a contract before revocation?

Rule: a counter-offer destroys the original offer (Hyde v Wrench); once destroyed, it cannot be accepted later. The postal rule (Adams v Lindsell) makes a posted acceptance effective on posting — but only where there is a live offer capable of acceptance.

Application: Sam's Tuesday reply of 8,000 was not a request for information but a new proposed price — a counter-offer, which killed Rana's 9,000 offer on Tuesday. Sam's Wednesday letter is therefore not an acceptance at all; at best it is a fresh offer from Sam to buy at 9,000, which Rana never accepted. The postal rule cannot rescue Sam: posting only perfects acceptance of an EXISTING offer, and none existed by Wednesday. Rana's Thursday phone call is legally unnecessary — by then there was nothing left to revoke.

Conclusion: no contract. The offer died with the counter-offer on Tuesday; Rana is free to sell to Tara, and Sam has no claim.

The habit to copy: date-order the events, test each communication against the rules, and cite one case per rule applied.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Treating shop displays and advertisements as offers — they are invitations to treat (Fisher v Bell); the customer makes the offer at the till. Carlill is the EXCEPTION, for clear unilateral promises.

Reading a counter-offer as keeping the original offer alive — it destroys it (Hyde v Wrench); only a genuine request for information leaves the offer standing.

Applying the postal rule to everything — it covers ACCEPTANCE by post only; revocations are effective on receipt, and instantaneous communications fall outside the rule.

Confusing sufficiency with adequacy of consideration — the law never asks whether the bargain was fair (Chappell v Nestle), only whether something of value moved. Adequate is the distractor word.

Stopping negligence analysis at duty — marks require all three elements: duty (Caparo), breach (reasonable person) and causation plus remoteness; a foreseeable claimant who suffered unforeseeable KINDS of loss still fails on remoteness.`,
      },
    ],
  },
  {
    paper: "LW",
    area: "C",
    title: "Employment law",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Employee or not — and what happens when it ends",
        body: `Employment law hinges on a single classification with expensive consequences: is this person an employee working under a contract OF service, or an independent contractor providing a contract FOR services? Employees get unfair dismissal protection, redundancy pay, statutory sick pay and working-time rights; their employer deducts tax at source and is vicariously liable for their torts. Contractors get almost none of that. Because labels can be self-serving, courts look at substance through a series of tests: the control test (who decides what, how and when), the integration test (is the person part of the organisation), and the modern multiple or economic-reality test from Ready Mixed Concrete, which asks whether personal service is given for a wage, whether there is sufficient control, and whether the other terms — who bears financial risk, who supplies equipment, whether a substitute can be sent, whether there is mutuality of obligation — are consistent with employment.

When employment ends badly, the law offers two very different claims. Wrongful dismissal is the old common law action: dismissal in breach of contract, classically without proper notice, remedied by damages for the notice period. Unfair dismissal is statutory: after qualifying service, an employee may only be dismissed for one of the potentially fair reasons — capability, conduct, redundancy, statutory illegality, or some other substantial reason — AND via a fair procedure. Even a fair reason fails if the procedure was unfair. Constructive dismissal covers the resignation forced by the employer's own repudiatory breach — cutting pay, destroying trust — where the employee resigns and claims as if dismissed. Redundancy — the job disappearing — carries its own statutory payment based on age, service and pay.`,
      },
      {
        kind: "structure",
        heading: "The tests and claims, tabulated",
        body: `Employment status tests:
Control — how much direction over what, how, when, where the work is done.
Integration — is the person part and parcel of the organisation?
Multiple / economic reality (Ready Mixed Concrete): 1 personal service in exchange for a wage; 2 control; 3 other terms consistent with employment.
Pointers to self-employment: sends substitutes, owns the tools, bears financial risk, invoices for work, works for many clients, no mutuality of obligation.

Why status matters: unfair dismissal and redundancy rights, statutory notice, sick and holiday pay, PAYE deduction at source, employer's vicarious liability — employees only.

Wrongful vs unfair dismissal:
Wrongful — common law, breach of contract (usually no or short notice), any court, damages limited to the notice period, no service requirement.
Unfair — statutory, employment tribunal, qualifying service required, employer must show a fair REASON and a fair PROCEDURE.

Potentially fair reasons: capability or qualifications; conduct; redundancy; statutory illegality; some other substantial reason. Automatically unfair (no service needed): pregnancy, whistleblowing, trade union membership, asserting statutory rights.

Constructive dismissal: employer's repudiatory breach → employee resigns promptly → treated as dismissed.

Remedies for unfair dismissal: reinstatement (same job back), re-engagement (comparable job), compensation (basic award — formula by age, service, capped weekly pay — plus compensatory award for loss).`,
      },
      {
        kind: "example",
        heading: "Worked application — the courier who never sends a substitute",
        body: `Speedigo engages Lena as a courier. The contract calls her a self-employed contractor. In practice: she wears Speedigo's uniform, rides a Speedigo-branded bike, works fixed shifts set by a supervisor who tracks her route, is paid a fixed weekly amount, and must do the work personally — the contract's substitution clause has never been usable in practice because substitutes must be pre-approved and none ever has been. Speedigo terminates her without notice; she wants unfair dismissal protection. Is she an employee? IRAC:

Issue: is Lena an employee under a contract of service, despite the contractual label?

Rule: the label is not decisive; courts apply the multiple test (Ready Mixed Concrete): personal service for remuneration, control, and terms consistent with employment. Substitution rights, financial risk and equipment ownership point away from employment only if they are real.

Application: personal service — satisfied; the substitution clause is practically illusory, so service is personal. Remuneration — a fixed weekly wage, not payment by invoice or job. Control — high: fixed shifts, a supervisor, monitored routes. Other terms — uniform and branded equipment supplied by Speedigo, no financial risk borne by Lena, mutual obligations each shift. Every real-world factor points to employment; only the self-serving label points the other way.

Conclusion: Lena is an employee. Subject to qualifying service she may claim unfair dismissal, and the no-notice termination also grounds wrongful dismissal for her notice period.

Exam habit: march through the three limbs of the multiple test in order, and say explicitly that the label loses to substance.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Deciding status from the contract's label — courts look at the reality; a self-employed label on a controlled, personal-service relationship changes nothing.

Merging wrongful and unfair dismissal — wrongful is breach of CONTRACT (notice), damages only, no service threshold; unfair is STATUTORY, needs qualifying service, and turns on reason plus procedure. Exam questions test the pairing constantly.

Assuming a fair reason guarantees a fair dismissal — procedure matters independently; a genuine misconduct dismissal executed without investigation or hearing is still unfair.

Missing the automatically unfair reasons — pregnancy, whistleblowing and union membership need NO qualifying service; distractors rely on you applying the service requirement anyway.

Treating any resignation under unhappiness as constructive dismissal — it requires the employer's REPUDIATORY breach (going to the root of the contract) and a prompt resignation in response; delay looks like affirmation.`,
      },
    ],
  },
  {
    paper: "LW",
    area: "D",
    title: "Company law & corporate governance",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "The company as a separate person",
        body: `Company law begins with one case and one idea. In Salomon v Salomon & Co, the House of Lords held that a properly registered company is a legal person entirely separate from the people who own and run it. Mr Salomon's boot business failed, but the debts were the COMPANY's debts, not his. From separate personality flows everything students find surprising: the company owns its own property, sues and is sued in its own name, survives changes of shareholders (perpetual succession), and its members enjoy limited liability — they can lose their investment, never more.

The veil of incorporation — the screen between company and members — is lifted only exceptionally: by statute, where directors trade fraudulently or wrongfully as insolvency approaches, and at common law where the company is a mere façade used to evade an existing obligation (Gilford Motor v Horne; Jones v Lipman).

Directors could abuse their position, so the Companies Act 2006 codified their duties — owed to the COMPANY, not to shareholders individually — in sections 171 to 177, running from acting within powers and promoting the company's success through to avoiding conflicts and declaring interests in proposed transactions.

Finance splits the same way: share capital brings members; loan capital brings creditors, who protect themselves with fixed charges nailed to specific assets or floating charges hovering over a shifting class such as inventory.`,
      },
      {
        kind: "structure",
        heading: "The company law tables",
        body: `Consequences of incorporation (Salomon): separate legal personality; limited liability of members; perpetual succession; company owns its property; company sues and is sued; transferable shares.

Lifting the veil:
Statutory — fraudulent trading (intent to defraud creditors) and wrongful trading (trading on when insolvent liquidation was unavoidable): directors may be made to contribute personally.
Common law — the company is a façade or sham to evade an existing personal obligation (Gilford Motor v Horne — non-compete dodge; Jones v Lipman — escaping a sale contract).

Directors' duties, CA 2006:
s171 — act within powers (the constitution, proper purposes).
s172 — promote the success of the company for the members, considering the long term, employees, suppliers, community and reputation.
s173 — exercise independent judgement.
s174 — reasonable care, skill and diligence (objective floor + subjective uplift for actual skills).
s175 — avoid conflicts of interest (authorisable by the board).
s176 — not accept benefits from third parties.
s177 — declare any interest in a PROPOSED transaction with the company.

Fixed vs floating charges:
Fixed — attaches to a specific asset; company cannot deal with it without consent; highest priority.
Floating — floats over a class of changing assets (inventory, receivables); company trades them freely; crystallises on default or liquidation.
Priority: fixed charge → preferential creditors → floating charge → unsecured creditors. Charges must be registered at Companies House within 21 days or they are void against a liquidator and creditors.

Company types: private (Ltd — no public share offers) vs public (plc — minimum capital, may list its shares).`,
      },
      {
        kind: "example",
        heading: "Worked application — the one-person company that failed",
        body: `Nadia ran a bakery as a sole trader, then incorporated Nadia's Bakes Ltd, taking 99 shares (her brother holds 1) as sole director. She sold her ovens to the company at fair value and lent it money secured by a registered floating charge. The company has failed owing 80,000 pounds to suppliers, who argue Nadia and the company are really the same person, so she should pay personally. Advise. IRAC:

Issue: can the suppliers reach Nadia's personal assets, and does her secured loan rank ahead of them?

Rule: a validly registered company is a separate legal person, even a one-person company controlled entirely by its founder (Salomon v Salomon). The veil is lifted only for fraudulent or wrongful trading, or where the company is a façade concealing an existing obligation (Gilford v Horne; Jones v Lipman). A member may lawfully also be a secured creditor.

Application: incorporating to obtain limited liability is not a sham — it is the very purpose Parliament provides, and nothing suggests the company was formed to evade an EXISTING obligation. The assets were sold at fair value and the charge registered — matching Salomon itself, where the founder's secured debenture ranked ahead of unsecured creditors. Only if Nadia kept incurring credit after insolvent liquidation became unavoidable could wrongful trading make her contribute personally.

Conclusion: the suppliers' claim fails; the debts are the company's, and Nadia's registered floating charge ranks ahead of the unsecured suppliers, absent fraudulent or wrongful trading.

Exam habit: state Salomon first, then test each veil-lifting ground against the facts — most scenarios are designed so none of them bites.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Saying shareholders are liable for the company's debts — limited liability means members lose at most their investment; the company alone owes its creditors (Salomon).

Lifting the veil merely because one person controls the company — a one-person company is exactly what Salomon protects; lifting needs fraud, wrongful trading, or a façade evading an existing obligation.

Stating directors owe their duties to shareholders — the CA 2006 duties are owed to the COMPANY; shareholders enforce them only exceptionally (derivative claims).

Ranking a floating charge above a fixed charge — fixed charges (and preferential creditors) come first; flexibility is bought with lower priority, and an unregistered charge is void against the liquidator.

Confusing s175 with s177 — s175 is the general duty to AVOID conflicts (outside opportunities), authorisable by the board; s177 is the duty to DECLARE an interest in a proposed transaction WITH the company.`,
      },
    ],
  },
]
