import type { TopicBrief } from "@/lib/acca-briefs"

/* Topic Briefs — PM (A-D) + TX-UK (A-E), wave 3 (2026-07-10). */
export const SKILLS_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── PM — Performance Management ───────────────────────── */
  {
    paper: "PM",
    area: "A",
    title: "Specialist cost & management accounting",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "When traditional costing starts to lie",
        body: `In MA you learned absorption costing: pile all the overheads into one pot and spread them over units using labour or machine hours. That works when overheads really are driven by volume. In a modern factory they usually are not — set-ups, inspections, order handling and design work are driven by the NUMBER of batches, orders and product lines, not by how many hours the machines run. Spread those costs on an hours basis and high-volume simple products subsidise low-volume complex ones, and every price you quote is quietly wrong.

Activity-based costing (ABC) fixes the spreading. Instead of one overhead rate, you trace overheads to the activities that cause them (setting up, ordering, inspecting), find the cost driver of each activity, and charge products for the drivers they actually consume. A product made in tiny fussy batches now carries its fair share of set-up cost.

The rest of this area changes the question rather than the spreading. Target costing works backwards from the market: the price is given, the required margin is given, so cost becomes the variable you must engineer down. Life-cycle costing widens the lens from one year to the product's whole life, from design to withdrawal — crucial because most cost is locked in at the design stage, long before production starts. Throughput accounting narrows the lens to a factory with a bottleneck: in the very short term only material cost is truly variable, so the game is maximising throughput per bottleneck hour. Environmental management accounting makes visible the costs conventional systems bury in overheads — waste, energy, regulatory clean-up — so managers can act on them.`,
      },
      {
        kind: "structure",
        heading: "The techniques, one screen",
        body: `ABC in five steps:
1 Identify the major activities. 2 Pool the overhead cost of each activity. 3 Identify each pool's cost driver. 4 Driver rate = pool cost ÷ total driver volume. 5 Charge products by the drivers they use.

Target costing:
Target cost = market selling price − required profit margin.
Cost gap = estimated (current) cost − target cost.
Close the gap by redesigning the PRODUCT or process — not by raising the price.

Life-cycle costing:
Stages: development → introduction → growth → maturity → decline.
Life-cycle cost per unit = total costs over the whole life ÷ total lifetime units.
Around 70-90% of cost is COMMITTED at the design stage.

Throughput accounting:
Throughput = sales revenue − direct material cost (ONLY materials are variable).
Return per factory (bottleneck) hour = throughput per unit ÷ bottleneck time per unit.
Cost per factory hour = total factory cost ÷ total bottleneck hours.
TPAR = return per factory hour ÷ cost per factory hour — must exceed 1.

Environmental management accounting techniques: input/output analysis, flow cost accounting, environmental activity-based costing, life-cycle costing.`,
      },
      {
        kind: "example",
        heading: "Worked example — ABC exposes a cross-subsidy",
        body: `Kestrel Co makes two products. X: 10,000 units a year in 10 large batches. Y: 2,000 units a year in 30 small batches. Each unit of either product takes 1 machine hour. Overheads are $360,000: set-up costs $120,000 and machining costs $240,000.

Step 1 — traditional absorption (machine hours):
Total hours = 10,000 + 2,000 = 12,000. OAR = 360,000 ÷ 12,000 = $30 per hour.
Both X and Y absorb $30 per unit.

Step 2 — ABC driver rates:
Set-ups: 10 + 30 = 40 set-ups, so 120,000 ÷ 40 = $3,000 per set-up.
Machining: 240,000 ÷ 12,000 hours = $20 per hour.

Step 3 — ABC cost per unit of X:
Set-ups 10 × 3,000 = 30,000, spread over 10,000 units = $3 per unit.
Plus machining $20 = $23 per unit.

Step 4 — ABC cost per unit of Y:
Set-ups 30 × 3,000 = 90,000, spread over 2,000 units = $45 per unit.
Plus machining $20 = $65 per unit.

Step 5 — reconcile: (10,000 × 23) + (2,000 × 65) = 230,000 + 130,000 = $360,000. All overhead accounted for.

Under absorption costing both products looked like $30. ABC shows X really costs $23 and Y costs $65 — the high-volume product was subsidising the fussy low-volume one by $35 a unit. Any price set on the old figures undercharged Y on every sale.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Absorbing transaction-driven overheads (set-ups, orders, inspections) on a volume basis — the whole point of ABC is that batch-level costs do not vary with units.

Closing a target-cost gap by raising the selling price — the price is set by the market; the gap must be closed through design and process changes.

Treating labour as a variable cost in throughput accounting — in the TA world only direct materials are variable; labour is part of fixed factory cost.

Trying to improve the TPAR by producing more on non-bottleneck machines — that just builds inventory; the ratio improves only via more throughput per bottleneck hour or lower factory costs.

Ignoring the design stage in life-cycle costing — by the time production starts, most of the lifetime cost is already committed and can no longer be managed away.`,
      },
    ],
  },
  {
    paper: "PM",
    area: "B",
    title: "Decision-making techniques",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Only the future, only the difference",
        body: `Every decision question in PM obeys one rule: a cost matters only if it is a FUTURE, INCREMENTAL CASH FLOW of the decision. Money already spent (sunk cost) is gone whichever way you decide. Costs you are committed to paying anyway are equally irrelevant. Depreciation is not a cash flow at all. What IS relevant can be invisible in the ledger: an opportunity cost — the contribution you give up elsewhere by using a resource here — is a real cost of the decision even though no invoice ever arrives.

Cost-volume-profit analysis is the first application. Contribution (selling price minus variable cost) is the engine: every unit sold contributes that amount towards fixed costs, and once fixed costs are covered, towards profit. From this one idea flow breakeven volume, margin of safety, and the sales needed for a target profit.

When a resource runs short — machine hours, a material, skilled labour — the question becomes rationing. The instinct is to make the product with the biggest contribution per unit; the correct answer is the biggest contribution per unit of the SCARCE RESOURCE, because that is what you are actually spending. With two or more scarce resources the same logic scales up into linear programming. Beyond that sit make-or-buy and shutdown decisions (the same relevant-cost test in different clothes), pricing theory (demand curves, marginal revenue equals marginal cost), and decision-making under uncertainty, where expected values, maximax, maximin and minimax regret each encode a different attitude to risk.`,
      },
      {
        kind: "structure",
        heading: "The decision toolkit",
        body: `Relevant cost rules:
Sunk costs — never relevant. Committed costs — not relevant. Depreciation and apportioned fixed overheads — not relevant. Opportunity costs — always relevant. Incremental fixed costs — relevant.
Materials in regular use — relevant cost is replacement cost. Materials not replaced — higher of scrap value and value in alternative use.
Labour with spare capacity — nil. Labour at full capacity — cost plus contribution lost from diverted work.

CVP:
Contribution per unit = selling price − variable cost.
Breakeven units = fixed costs ÷ contribution per unit.
C/S ratio = contribution ÷ sales. Breakeven revenue = fixed costs ÷ C/S ratio.
Units for target profit = (fixed costs + target profit) ÷ contribution per unit.
Margin of safety % = (budgeted sales − breakeven sales) ÷ budgeted sales × 100.

Single limiting factor:
1 Contribution per unit. 2 Divide by scarce resource per unit. 3 Rank. 4 Allocate the resource down the ranking, up to each product's demand.

Pricing: P = a − bQ; MR = a − 2bQ; profit is maximised where MR = MC.

Risk rules: expected value = sum of (outcome × probability) — risk-neutral, repeated decisions. Maximax — optimist. Maximin — pessimist. Minimax regret — minimise the maximum opportunity loss.`,
      },
      {
        kind: "example",
        heading: "Worked example — ranking with a scarce material",
        body: `Merle Co makes two products from the same material, which is limited to 9,000 kg this period. Product A: contribution $12 per unit, 3 kg per unit, maximum demand 2,000 units. Product B: contribution $10 per unit, 2 kg per unit, maximum demand 3,000 units. Fixed costs are $25,000.

Step 1 — contribution per kg (the scarce resource):
A: 12 ÷ 3 = $4 per kg.
B: 10 ÷ 2 = $5 per kg.
B ranks first even though A earns more per UNIT.

Step 2 — allocate the material:
B first: 3,000 units × 2 kg = 6,000 kg used. Contribution = 3,000 × 10 = $30,000.
Remaining material: 9,000 − 6,000 = 3,000 kg.
A next: 3,000 kg ÷ 3 kg = 1,000 units (demand of 2,000 not fully met). Contribution = 1,000 × 12 = $12,000.

Step 3 — optimal profit:
Total contribution = 30,000 + 12,000 = $42,000.
Profit = 42,000 − 25,000 = $17,000.

Step 4 — what is one more kg worth?
An extra kg would go to product A (the marginal product) and earn its contribution per kg: $4. That $4 is the SHADOW PRICE of the material — the maximum premium above the normal price worth paying for one more kg.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Ranking products by contribution per unit instead of contribution per unit of the scarce resource — the classic distractor in every limiting-factor question.

Including sunk costs (past research, materials already bought and unusable elsewhere) or apportioned head-office overheads in a relevant-cost quote.

Forgetting the opportunity cost of diverted labour or materials in regular use — the ledger shows nothing, but the contribution lost elsewhere is a real cost.

Computing units for a target profit as fixed costs divided by contribution, forgetting to add the target profit to the numerator.

Using expected values for a one-off decision or a risk-averse decision-maker — EV assumes risk neutrality and many repetitions, which the scenario often contradicts.`,
      },
    ],
  },
  {
    paper: "PM",
    area: "C",
    title: "Budgeting & control",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Plan, flex, explain",
        body: `A budget does three jobs: it forces planning, it coordinates departments, and it sets the benchmark that control is measured against. PM examines the choice of budgeting SYSTEM as much as the numbers. Incremental budgeting takes last year and adds a percentage — quick, but it bakes in old inefficiency. Zero-based budgeting starts every line at nil and makes each activity justify its existence — rigorous, but expensive in management time. Rolling budgets add a new quarter as each one closes, keeping the plan permanently twelve months long — ideal in fast-changing environments. Beyond the mechanics sit behavioural questions: targets that are too tight demotivate, budgets built by the people they judge invite slack, and top-down versus participative budgeting trades speed against ownership.

Control begins with a comparison that is fair. Comparing actual costs at 1,200 units against a budget built for 1,000 units mixes up volume effects with efficiency effects, so the budget is FLEXED first: restate it at the actual activity level, then compare. Every difference that remains is a variance with a nameable cause.

Standard costing then splits each variance into price and quantity elements: did we pay a different rate, or use a different amount? PM pushes two levels deeper than MA. Mix and yield variances split the usage variance when materials can substitute for each other. Planning and operational variances split each variance into the part caused by a standard that turned out to be wrong (planning — not the manager's fault) and the part caused by real operational performance against the corrected standard. Learning curves complete the area: where labour time per unit falls predictably as cumulative output doubles, the standard itself must be built on the curve, or every labour variance is fiction.`,
      },
      {
        kind: "structure",
        heading: "The variance formula family",
        body: `Materials:
Price = (standard price − actual price) × actual quantity bought.
Usage = (standard quantity for actual output − actual quantity used) × standard price.
Mix and yield split the usage variance when inputs are substitutable.

Labour:
Rate = (standard rate − actual rate) × actual hours paid.
Efficiency = (standard hours for actual output − actual hours worked) × standard rate.
Idle time = idle hours × standard rate (adverse).

Variable overhead: expenditure and efficiency, mirroring labour, based on hours worked.

Fixed overhead:
Expenditure = budgeted − actual fixed overhead.
Volume = (actual units − budgeted units) × standard fixed overhead per unit (absorption costing only; no volume variance under marginal costing).

Sales:
Price = (actual price − standard price) × actual units sold.
Volume = (actual units − budgeted units) × standard CONTRIBUTION per unit (marginal) or standard PROFIT per unit (absorption).

Planning vs operational: planning variance = original standard vs revised standard; operational variance = revised standard vs actual.

Learning curve: y = ax^b, where y = cumulative average time per unit, a = time for the first unit, x = cumulative units, b = log r ÷ log 2 for learning rate r.

Budget systems: incremental (last year plus), zero-based (justify from nil), rolling (continuously extended), activity-based (budgets built from cost drivers).`,
      },
      {
        kind: "example",
        heading: "Worked example — flex first, then explain",
        body: `Standard material cost: 2 kg per unit at $5 per kg, so $10 per unit. The original budget was 1,000 units. Actual results: 1,200 units produced, using 2,500 kg which cost $11,875.

Step 1 — flex the budget to actual output:
Flexed material cost = 1,200 units × $10 = $12,000. (Comparing $11,875 with the original 1,000-unit budget of $10,000 would wrongly signal $1,875 of overspend.)

Step 2 — total material cost variance:
12,000 − 11,875 = $125 favourable.

Step 3 — price variance:
Actual quantity at standard price = 2,500 × 5 = 12,500.
Actual cost = 11,875 (actual price 11,875 ÷ 2,500 = $4.75 per kg).
Price variance = 12,500 − 11,875 = $625 favourable.

Step 4 — usage variance:
Standard quantity for actual output = 1,200 × 2 = 2,400 kg. Actual usage = 2,500 kg.
Usage variance = (2,400 − 2,500) × 5 = $500 adverse.

Step 5 — check: 625 F + 500 A = $125 favourable, agreeing with step 2.

Step 6 — the interpretation mark: a favourable price variance alongside an adverse usage variance often tells ONE story — cheaper, lower-grade material was bought and more of it was wasted. Variances are interdependent; a good answer links them.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Comparing actual costs against the original fixed budget instead of a budget flexed to actual output — the volume effect masquerades as an efficiency effect.

Valuing the sales volume variance at selling price or at contribution under absorption costing — it is standard PROFIT per unit under absorption and standard CONTRIBUTION under marginal.

Calculating a fixed overhead volume variance under marginal costing — it exists only when fixed overheads are absorbed into units.

Using hours PAID for labour efficiency — efficiency uses hours WORKED; the gap between paid and worked is the idle time variance.

Blaming a manager for a planning variance — a standard that was wrong from the start is a standard-setting failure, not an operational one.

Applying the learning-curve formula to the last unit instead of the cumulative average — y in y = ax^b is the cumulative AVERAGE time per unit.`,
      },
    ],
  },
  {
    paper: "PM",
    area: "D",
    title: "Performance measurement & control",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Measure what managers control — and watch what the measure does",
        body: `Once a business splits into divisions, head office faces a design problem: how do you judge a divisional manager so that doing well on the measure means doing well for the company? The first principle is controllability — a manager should be judged only on revenues, costs and assets they can actually influence. Charging a division with head-office costs it cannot control tells you nothing about the manager.

The two workhorse measures are return on investment (ROI) and residual income (RI). ROI expresses divisional profit as a percentage of divisional capital, which makes divisions of different sizes comparable — but it has a famous flaw: a manager judged on ROI will reject any project earning less than their CURRENT ROI, even when it earns comfortably more than the company's cost of capital. RI fixes this by charging profit with a notional interest cost on capital; anything left is value created, so any project with positive RI is worth taking. RI's own weakness is that an absolute dollar figure cannot compare divisions of different sizes.

When divisions trade with each other, the transfer price decides how profit is shared — and a bad one drives bad decisions, such as a division buying outside while a sister division sits with spare capacity. Finally, financial measures alone are backward-looking and gameable, so PM adds multidimensional frameworks: the balanced scorecard (financial, customer, internal process, learning and growth), Fitzgerald and Moon's building blocks for services, and the three Es — economy, efficiency, effectiveness — for not-for-profit bodies where profit is not the point.`,
      },
      {
        kind: "structure",
        heading: "The divisional measurement kit",
        body: `ROI = controllable divisional profit ÷ controllable capital employed × 100.
RI = controllable divisional profit − (capital employed × notional cost of capital).
Decision rule conflict: ROI motivates rejecting projects below current ROI; RI motivates accepting anything above the cost of capital — RI is goal-congruent.

Transfer pricing range:
Minimum (seller will accept) = marginal cost + any contribution lost on outside sales displaced.
With spare capacity, lost contribution = 0, so minimum = marginal cost.
Maximum (buyer will pay) = the lower of the external market price and the buying division's net revenue from using the item.
A price outside this range pushes one division to trade externally against the group's interest.

Balanced scorecard perspectives: financial; customer; internal business process; learning and growth — each with objectives and measures.

Building blocks (Fitzgerald & Moon, service businesses): dimensions (results: financial performance, competitiveness; determinants: quality, flexibility, resource utilisation, innovation); standards (ownership, achievability, equity); rewards (clarity, motivation, controllability).

Not-for-profit — value for money (3Es): economy = cheap inputs; efficiency = output per unit of input; effectiveness = outputs achieving objectives.`,
      },
      {
        kind: "example",
        heading: "Worked example — the ROI trap and the RI fix",
        body: `A division has net assets of $2,000,000 and controllable profit of $500,000. The company's cost of capital is 15%. The manager, judged on ROI, is offered a project needing $400,000 of investment and generating $80,000 of profit a year.

Step 1 — current ROI:
500,000 ÷ 2,000,000 = 25%.

Step 2 — the project's own ROI:
80,000 ÷ 400,000 = 20%.

Step 3 — ROI after accepting:
(500,000 + 80,000) ÷ (2,000,000 + 400,000) = 580,000 ÷ 2,400,000 = 24.2%.
The manager's ROI FALLS from 25% to 24.2%, so a manager judged on ROI rejects the project.

Step 4 — but is rejection right for the company?
The project earns 20% against a 15% cost of capital — it creates value. Rejecting it is dysfunctional.

Step 5 — residual income shows this directly:
RI before = 500,000 − (2,000,000 × 15%) = 500,000 − 300,000 = $200,000.
Project RI = 80,000 − (400,000 × 15%) = 80,000 − 60,000 = $20,000 positive.
RI after = 580,000 − (2,400,000 × 15%) = 580,000 − 360,000 = $220,000.

RI rises by exactly the project's $20,000 of value creation, so a manager judged on RI accepts — the measure and the company's interest now point the same way.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Judging a manager on items they cannot control — apportioned head-office costs and centrally imposed assets belong in the DIVISION's performance, not the MANAGER's.

Assuming ROI and RI always agree — the exam's favourite scenario is a project earning above the cost of capital but below current ROI, where the two measures give opposite signals.

Forgetting that ROI improves as assets age — accumulated depreciation shrinks the denominator, so ROI can rise while the division merely gets older, discouraging reinvestment.

Setting the minimum transfer price at full cost plus a mark-up when the seller has spare capacity — the floor is marginal cost, since no outside contribution is lost.

Treating the balanced scorecard as four unrelated lists — measures should link cause to effect (learning drives processes, processes drive customers, customers drive financials).

Applying profit measures to a not-for-profit body — the question is value for money, judged through economy, efficiency and effectiveness.`,
      },
    ],
  },

  /* ───────────────────────── TX — Taxation (UK, FA2024) ───────────────────────── */
  {
    paper: "TX",
    area: "A",
    title: "Income tax & NIC",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "How the UK taxes an individual's income",
        body: `Start from zero: in the UK, individuals pay income tax on their income for a TAX YEAR, which runs from 6 April to 5 April (so 2024/25 means 6 April 2024 to 5 April 2025). The computation is a single, repeatable routine. First, gather every source of income — employment income, trading profits, property income, bank interest, dividends — into one statement, arranged in three columns: non-savings income, savings income and dividend income. The column order matters, because each type is taxed at its own rates, in that order, as if stacked in layers.

Second, deduct the personal allowance: every individual can receive £12,570 of income tax-free. High earners lose it — the allowance is reduced by £1 for every £2 of income above £100,000, so it disappears entirely at £125,140. What remains after the allowance is taxable income, and it is fed through the rate bands: the first £37,700 at basic rate, then higher rate up to £125,140, then additional rate.

Savings and dividends get softeners. Savings income enjoys a nil-rate band (£1,000 for basic-rate taxpayers, £500 for higher-rate, nil for additional-rate), and dividends a £500 nil-rate band for everyone — amounts inside these bands are taxed at 0% but still occupy the rate bands.

National insurance contributions (NIC) are a separate levy on EARNINGS, not a second income tax: employees pay Class 1 on salary, employers pay Class 1 secondary on top, and the self-employed pay Class 4 on trading profits. Dividends and interest attract no NIC at all — one reason owner-managers care about how they extract money from their companies. Employment income also brings taxable benefits (company cars, loans, accommodation), valued under specific rules and taxed as extra salary through PAYE.`,
      },
      {
        kind: "structure",
        heading: "The computation proforma and 2024/25 rate card",
        body: `Income tax computation (per tax year):
Total income (non-savings / savings / dividends, in three columns)
less reliefs = net income
less personal allowance £12,570 = taxable income.
PA taper: reduce by £1 per £2 of adjusted net income above £100,000; nil from £125,140.

Rate bands on taxable income:
Basic rate: first £37,700 — non-savings and savings 20%, dividends 8.75%.
Higher rate: £37,701 to £125,140 — non-savings and savings 40%, dividends 33.75%.
Additional rate: above £125,140 — non-savings and savings 45%, dividends 39.35%.
Bands are extended by gross gift aid donations and gross personal pension contributions.

Nil-rate bands (use band capacity but tax at 0%):
Savings: £1,000 basic-rate taxpayer / £500 higher-rate / nil additional-rate. Plus the £5,000 starting rate for savings where non-savings taxable income is below £5,000.
Dividends: £500 for all taxpayers.

NIC 2024/25:
Class 1 employee: 8% on earnings between £12,570 and £50,270; 2% above £50,270.
Class 1 employer: 13.8% on earnings above £9,100 (less £5,000 employment allowance for most small employers).
Class 1A employer, on taxable benefits: 13.8%.
Class 4 self-employed: 6% on profits between £12,570 and £50,270; 2% above.`,
      },
      {
        kind: "example",
        heading: "Worked example — salary plus dividends, tax and NIC",
        body: `In 2024/25 Nadia earns a salary of £55,000 and receives dividends of £3,000. Compute her income tax and Class 1 NIC.

Step 1 — taxable income:
Total income = 55,000 + 3,000 = £58,000.
Less personal allowance 12,570 = taxable income £45,430, of which non-savings £42,430 and dividends £3,000 (dividends form the top slice).

Step 2 — tax the non-savings layer:
First 37,700 × 20% = £7,540.
Remaining 42,430 − 37,700 = 4,730 × 40% = £1,892.

Step 3 — tax the dividend layer (all in the higher-rate band):
First £500 at the dividend nil rate = £0.
Remaining 2,500 × 33.75% = £843.75.

Step 4 — income tax liability:
7,540 + 1,892 + 0 + 843.75 = £10,275.75.

Step 5 — Class 1 employee NIC (on salary only — dividends carry no NIC):
(50,270 − 12,570) = 37,700 × 8% = £3,016.00.
(55,000 − 50,270) = 4,730 × 2% = £94.60.
Total NIC = £3,110.60.

Step 6 — sense check: Nadia is a higher-rate taxpayer, so her dividend nil band is £500 and her savings nil band would have been £500 had she any interest. Salary suffers both tax and NIC; the dividends suffered tax only.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Taxing income in the wrong order — the stack is always non-savings, then savings, then dividends; reordering changes which bands each layer falls into.

Forgetting the personal allowance taper above £100,000 of adjusted net income — between £100,000 and £125,140 the effective marginal rate reaches 60%.

Treating the savings and dividend nil-rate bands as deductions from income — they tax the income at 0% but still USE UP band capacity, pushing later income higher up the bands.

Charging NIC on dividends, interest or property income — NIC applies to earnings (salary, benefits for Class 1A, trading profits) only.

Forgetting to extend the basic-rate band for gross gift aid and personal pension contributions — the payment is made net of 20%, and relief for higher rates comes through the band extension.

Using the employee NIC thresholds for the employer — employer contributions start at £9,100, not £12,570, and have no upper limit.`,
      },
    ],
  },
  {
    paper: "TX",
    area: "B",
    title: "Chargeable gains",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Taxing profits on selling things",
        body: `Income tax catches what you EARN; capital gains tax (CGT) catches what you GAIN when you sell something for more than it cost. A charge arises when a chargeable PERSON (a UK-resident individual — companies pay corporation tax on their gains instead) makes a chargeable DISPOSAL (a sale or a gift, but not death) of a chargeable ASSET (most things, with notable exemptions: cars, main homes covered by private residence relief, gilts, ISAs, and most chattels sold for £6,000 or less).

The gain itself is simple subtraction: disposal proceeds, less incidental selling costs, less the original cost of the asset and any enhancement expenditure. Gifts do not escape — a gift is taxed as if sold at MARKET VALUE, which surprises every new student. Losses net off against gains of the same year automatically; unused losses carry forward.

Each individual then deducts the annual exempt amount — £3,000 for 2024/25 — from net gains, and the remainder is taxed at rates that piggyback on the income tax bands: gains filling whatever remains of the basic-rate band are taxed at 10% (18% for residential property), and gains above it at 20% (24% for residential property).

Two families of rules add depth. Shares need MATCHING rules, because identical shares bought over years are indistinguishable: disposals are matched first with same-day purchases, then purchases in the following 30 days, then the section 104 pool holding everything else at average cost. And a set of RELIEFS defers or reduces gains where charging tax now would be unfair or would strangle business life: business asset disposal relief (a 10% rate on the first £1 million of qualifying business disposals, lifetime limit), rollover relief on replacing business assets, gift holdover relief on business gifts, and private residence relief on the family home.`,
      },
      {
        kind: "structure",
        heading: "Proforma, rates and the matching rules",
        body: `Gain on one disposal:
Disposal proceeds (market value if gift or sale to a connected person)
less incidental costs of disposal
less allowable cost (plus incidental acquisition costs)
less enhancement expenditure = chargeable gain.

CGT for the year (2024/25):
Total gains − current-year losses − losses brought forward − annual exempt amount £3,000 = taxable gains.
Rates: within any unused basic-rate band (£37,700 less taxable income) — 10%, or 18% for residential property. Above the band — 20%, or 24% for residential property.
Business asset disposal relief: qualifying gains taxed at 10%, £1,000,000 lifetime limit; these gains use the basic-rate band first.
Payment: with self-assessment by 31 January after the tax year; UK residential property gains need a 60-day return and payment on account.

Share matching (individuals): 1 same-day acquisitions; 2 acquisitions in the NEXT 30 days; 3 the section 104 pool (all other shares, at average cost).

Part disposal: allowable cost = total cost × A ÷ (A + B), where A = proceeds of the part sold and B = market value of the part kept.

Chattels: exempt if bought and sold for £6,000 or less; if sold above, gain capped at 5/3 × (gross proceeds − £6,000). Wasting chattels exempt.

Main reliefs: private residence relief (main home, occupation periods plus final 9 months); rollover relief (replace business assets, gain deferred into new asset); gift holdover relief (business assets, gain passed to donee); business asset disposal relief.`,
      },
      {
        kind: "example",
        heading: "Worked example — gains, a loss and the rate bands",
        body: `In 2024/25 Priya sells shares (not her employer's, no reliefs available) for £50,000; they cost her £20,000. She also sells an antique table at a loss of £5,000. Her taxable income for the year (after the personal allowance) is £30,000. Compute her CGT.

Step 1 — gain on the shares:
50,000 − 20,000 = £30,000.

Step 2 — net off the current-year loss:
30,000 − 5,000 = £25,000.

Step 3 — deduct the annual exempt amount:
25,000 − 3,000 = £22,000 taxable gains.

Step 4 — how much basic-rate band is left?
37,700 − 30,000 taxable income = £7,700.

Step 5 — apply the rates (non-residential, so 10% and 20%):
7,700 × 10% = £770.
(22,000 − 7,700) = 14,300 × 20% = £2,860.

Step 6 — CGT liability:
770 + 2,860 = £3,630, payable by 31 January 2026 under self-assessment.

Note the mechanics: her INCOME determined the rate on her GAINS. Had these been residential property gains, the same two slices would have been taxed at 18% and 24%, and a 60-day return would have been due.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Using actual proceeds for a gift — gifts and disposals to connected persons are deemed to occur at market value.

Forgetting that current-year losses are set off BEFORE the annual exempt amount, wasting it, whereas brought-forward losses are used only to bring gains down TO the exempt amount.

Ignoring remaining basic-rate band and taxing all gains at 20% — the 10% slice depends on taxable income, so the income tax computation feeds the CGT one.

Matching share disposals straight to the section 104 pool — same-day and next-30-day acquisitions come first, in that order.

Applying CGT to a company — companies pay corporation tax on chargeable gains, with indexation allowance frozen at December 2017, and get no annual exempt amount.

Missing the 60-day reporting and payment deadline for UK residential property disposals — the normal 31 January date does not apply to the payment on account.`,
      },
    ],
  },
  {
    paper: "TX",
    area: "C",
    title: "Corporation tax",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "How a company is taxed",
        body: `A UK company pays corporation tax on its TAXABLE TOTAL PROFITS — trading profits, property income, interest income and chargeable gains, all added together for an ACCOUNTING PERIOD (normally the 12 months for which it prepares accounts). There is no personal allowance and no separate capital gains tax: everything lands in one pot.

The heart of every question is adjusting the accounting profit. The profit in the accounts follows accounting rules; tax has its own. So you start with profit before tax and add back expenses that tax does not allow — depreciation (tax has its own regime instead), client entertaining, most fines, capital expenditure in the expense lines — and deduct income that is not taxed as trading income (rent, interest, dividends received) so it can be taxed under its own heading or, for most dividends, not at all.

Depreciation's replacement is CAPITAL ALLOWANCES, a standardised tax depreciation on plant and machinery. The annual investment allowance gives 100% relief on the first £1,000,000 of most plant per year; companies buying NEW main-rate plant can instead claim full expensing at 100% with no cap. What is not fully relieved enters pools — the main pool attracting an 18% writing-down allowance each year, the special rate pool (integral features, cars over 50g/km) 6%.

The rate then depends on size. For 2024/25 (FY2024): profits of £50,000 or less pay 19%; profits of £250,000 or more pay 25%; in between, tax is computed at 25% and reduced by MARGINAL RELIEF, producing an effective rate that climbs from 19% to 25% — and a marginal rate of 26.5% on each pound inside the band. The limits are divided by the number of associated companies and prorated for short periods. Tax is normally due nine months and one day after the period ends; large companies (profits over £1.5 million) pay by quarterly instalments.`,
      },
      {
        kind: "structure",
        heading: "Adjustment proforma, allowances and the rate card",
        body: `Adjustment of trading profits:
Profit before tax per accounts
ADD BACK: depreciation and amortisation; client entertaining (staff entertaining is allowed); most fines and penalties; capital items expensed; 15% of leased car costs where CO2 exceeds 50g/km
DEDUCT: income taxed elsewhere (property income, interest) and non-taxable income (most dividends received); capital allowances
= tax-adjusted trading profit.

Capital allowances (per 12-month period):
AIA: 100% on the first £1,000,000 of plant (not cars).
Full expensing: 100% on NEW main-rate plant for companies, uncapped (50% first-year for new special-rate assets).
Main pool WDA 18%; special rate pool WDA 6% (reducing balance).
Cars: 0g/km new — 100% FYA; 1-50g/km — main pool 18%; over 50g/km — special rate pool 6%.

Taxable total profits (TTP) = trading profit + property income + interest income + chargeable gains − qualifying donations.

Corporation tax FY2024:
Augmented profits (TTP + dividends received) ≤ £50,000 → 19%.
≥ £250,000 → 25%.
Between: 25% × TTP − marginal relief, where marginal relief = 3/200 × (250,000 − augmented profits) × TTP ÷ augmented profits.
Limits shared between associated companies and prorated for short periods.

Payment: 9 months + 1 day after the period end; large companies by instalments. Return due 12 months after the period end.`,
      },
      {
        kind: "example",
        heading: "Worked example — from accounting profit to tax payable",
        body: `Brome Ltd, a standalone company, prepares accounts for the year to 31 March 2025 showing profit before tax of £110,000, after charging depreciation of £15,000. Capital allowances for the period are £25,000. It received no dividends. Compute the corporation tax.

Step 1 — adjust the trading profit:
110,000 + depreciation 15,000 − capital allowances 25,000 = taxable total profits £100,000.

Step 2 — which rate applies?
Augmented profits = 100,000 (no dividends). This sits between £50,000 and £250,000, so tax is 25% less marginal relief.

Step 3 — tax at the main rate:
100,000 × 25% = £25,000.

Step 4 — marginal relief:
3/200 × (250,000 − 100,000) = 3/200 × 150,000 = £2,250.

Step 5 — corporation tax liability:
25,000 − 2,250 = £22,750. Effective rate = 22.75%.

Step 6 — payment: due 9 months and 1 day after the period end, so 1 January 2026.

Sense check the marginal band: the first £50,000 effectively bears 19% (= £9,500) and the next £50,000 bears the marginal 26.5% (= £13,250); 9,500 + 13,250 = £22,750. Inside the band every extra pound of profit costs 26.5p — higher than the main rate itself, which is exactly why the examiner loves this zone.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Deducting depreciation for tax, or forgetting to add it back — tax relief for plant comes only through capital allowances.

Allowing client entertaining — it is never deductible, while STAFF entertaining is; the two are placed side by side in questions deliberately.

Claiming AIA or full expensing on cars — cars only ever get writing-down allowances (or the 100% FYA for new zero-emission cars).

Comparing the £50,000/£250,000 limits with TTP instead of AUGMENTED profits — dividends received push a company up the rate scale even though they are not themselves taxed.

Forgetting to divide the limits by the number of associated companies, or to prorate them for a short accounting period.

Giving a company a personal allowance, an annual exempt amount, or charging its gains to CGT — none of these exist for companies.`,
      },
    ],
  },
  {
    paper: "TX",
    area: "D",
    title: "Value added tax (VAT)",
    minutes: 5,
    sections: [
      {
        kind: "concept",
        heading: "A tax collected by businesses, borne by consumers",
        body: `VAT is different in kind from every other tax in this paper: the business is not really the taxpayer, it is the COLLECTOR. A VAT-registered business charges VAT on its sales (output tax), reclaims the VAT on its purchases (input tax), and pays HMRC only the difference. The tax rolls down the supply chain until it rests on the final consumer, who reclaims nothing.

Registration is the gateway. A business MUST register once its taxable turnover in any rolling 12-month period exceeds £90,000 (the historic test — checked at the end of every month, with registration effective from the start of the second month after), or as soon as it expects to exceed £90,000 in the next 30 days alone (the future test). Voluntary registration below the threshold can pay off when customers are themselves registered, because input tax becomes recoverable. Deregistration is available when expected turnover falls below £88,000.

Supplies come in four flavours, and the distinctions carry marks. Standard-rated (20%) and reduced-rated (5%, such as domestic fuel) are straightforward. Zero-rated (0% — food, books, children's clothing, exports) still counts as TAXABLE: the business charges no VAT yet recovers all its input tax, the best position available. Exempt supplies (insurance, finance, education) look similar to the customer but are the opposite for the business: no output tax, and no input tax recovery either — and an exclusively exempt business cannot register at all.

The routine mechanics are quarterly returns filed and paid electronically one month and seven days after the quarter ends, tax points deciding which quarter a supply belongs to, and special schemes — cash accounting, annual accounting, the flat rate scheme — easing life for smaller businesses.`,
      },
      {
        kind: "structure",
        heading: "Rates, thresholds and recovery rules",
        body: `Registration (2024/25): compulsory when taxable supplies exceed £90,000 in any rolling 12 months (register within 30 days; effective from the start of the second month after), or when the next 30 days ALONE are expected to exceed £90,000 (effective immediately). Deregistration threshold £88,000.

Categories of supply:
Standard-rated 20%. Reduced-rated 5% (domestic fuel and power). Zero-rated 0% — taxable, so input tax IS recoverable (food, books, children's clothing, new dwellings, exports). Exempt — no output tax, input tax NOT recoverable (insurance, finance, education, land).
VAT fraction from gross amounts: gross × 1/6 at 20%.

Input tax never recoverable (blocked): cars with any private use; client entertaining (UK customers).
Bad debt relief: reclaim output VAT once the debt is 6 months overdue from the due date and written off in the books.

Tax point: basic = delivery date; overridden by earlier invoice or payment; a 14-day invoice moves it to the invoice date.

Returns and payment: quarterly, filed and paid electronically 1 month + 7 days after the period end (Making Tax Digital).

Special schemes (annual taxable turnover limits to join):
Cash accounting ≤ £1,350,000 — VAT on cash received/paid; automatic bad debt relief.
Annual accounting ≤ £1,350,000 — one return, instalments.
Flat rate scheme ≤ £150,000 — pay a flat percentage of VAT-INCLUSIVE turnover; no input recovery (except capital assets ≥ £2,000).`,
      },
      {
        kind: "example",
        heading: "Worked example — one quarter's VAT return",
        body: `Torva Ltd is VAT-registered. For the quarter ended 31 March 2025: standard-rated sales of £60,000 INCLUDING VAT; zero-rated sales of £8,000; standard-rated purchases of £24,000 excluding VAT; a new machine bought for £10,000 plus VAT of £2,000; a company car with private use bought carrying VAT of £1,200; client entertaining carrying VAT of £300.

Step 1 — output tax on standard-rated sales (gross figure, so use the VAT fraction):
60,000 × 1/6 = £10,000.

Step 2 — output tax on zero-rated sales:
8,000 × 0% = £0 (but these are still TAXABLE supplies — input recovery is unaffected).

Step 3 — recoverable input tax:
Purchases 24,000 × 20% = £4,800.
Machine = £2,000.
Car = blocked (private use) — £0.
Client entertaining = blocked — £0.
Total input tax = 4,800 + 2,000 = £6,800.

Step 4 — VAT payable:
10,000 − 6,800 = £3,200, due with the electronic return by 7 May 2025 (one month and seven days after the quarter end).

Sense check: the two blocked items (1,200 + 300 = £1,500) are real costs to Torva — irrecoverable VAT simply becomes part of the expense.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Confusing zero-rated with exempt — both charge no VAT, but zero-rated supplies are taxable, preserve input tax recovery and count towards the registration threshold; exempt supplies do none of these.

Multiplying a VAT-INCLUSIVE figure by 20% — from gross you take the VAT fraction, 1/6.

Reclaiming input VAT on a car with private use or on client entertaining — both are blocked, however business-related they feel.

Applying the £90,000 test to a calendar year — it is a ROLLING 12-month test, checked at the end of every month.

Claiming bad debt relief too early — the debt must be at least 6 months overdue from the due date AND written off in the accounts.

Recovering input tax under the flat rate scheme — the flat percentage replaces input recovery entirely, apart from single capital purchases of £2,000 or more including VAT.`,
      },
    ],
  },
  {
    paper: "TX",
    area: "E",
    title: "Inheritance tax",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Taxing wealth as it passes on",
        body: `Inheritance tax (IHT) is a tax on GIVING wealth away — during life, and above all at death. The measuring stick is the TRANSFER OF VALUE: the fall in the donor's wealth caused by a gift.

Lifetime gifts split into two kinds. A gift from one individual to another is a POTENTIALLY EXEMPT TRANSFER (PET): no tax when made, and completely exempt if the donor survives SEVEN YEARS; die sooner and it becomes chargeable after all. A gift into most trusts is a CHARGEABLE LIFETIME TRANSFER (CLT): taxed immediately at 20% above the available nil rate band (25% if the donor pays, because the tax itself is a further loss of wealth), and taxed AGAIN at death rates on death within seven years, with credit for the lifetime tax.

Death pulls everything together. First, gifts made in the seven years before death are taxed in chronological order at 40% above the nil rate band, with TAPER RELIEF reducing the tax (not the gift) once the donor survived at least three years. Then the death estate — everything owned at death, less debts and funeral costs — is taxed at 40% on top.

The reliefs shape every question. Each person has a nil rate band of £325,000 (refreshed on a seven-year cycle, with any unused proportion transferring to a surviving spouse), plus a residence nil rate band of up to £175,000 when a home passes to direct descendants. Transfers between spouses are wholly exempt. Lifetime giving enjoys an annual exemption of £3,000 (one year's unused amount carries forward), small gifts of £250 per person per year, marriage gifts, and normal expenditure out of income.`,
      },
      {
        kind: "structure",
        heading: "The seven-year rules, taper and the death proforma",
        body: `Lifetime transfers:
PET (individual to individual): no lifetime tax; exempt if donor survives 7 years; chargeable at death rates if not.
CLT (into most trusts): lifetime tax at 20% above the available nil rate band (25% grossed up if the DONOR pays); recomputed at 40% on death within 7 years, credit for lifetime tax paid, no refunds.
Nil rate band available to a gift = £325,000 minus chargeable transfers in the 7 years before it.

Lifetime exemptions:
Spouse/civil partner — unlimited. Annual exemption £3,000, current year first, then one year brought forward. Small gifts £250 per donee per year (all or nothing). Marriage: £5,000 parent / £2,500 grandparent or party / £1,000 other. Normal expenditure out of income.

Taper relief — reduces the TAX on death for gifts made 3+ years before death:
3-4 years: 20% reduction. 4-5 years: 40%. 5-6 years: 60%. 6-7 years: 80%.

Death estate proforma:
All assets at death − debts and funeral expenses − spouse and charity exemptions = chargeable estate.
Tax at 40% above whatever nil rate band remains (£325,000 + up to £175,000 residence NRB where a home passes to direct descendants; both bands inheritable from a deceased spouse; RNRB tapered above a £2m estate). 36% rate where at least 10% of the baseline estate goes to charity.

Who pays: lifetime tax on a CLT — donor (grossed) or trustees; death tax on lifetime gifts — the DONEE; estate tax — the personal representatives.`,
      },
      {
        kind: "example",
        heading: "Worked example — a PET caught by death",
        body: `In August 2019 Hugh gave £400,000 in cash to his daughter, having made no earlier gifts. He died in March 2025, leaving an estate of £500,000 (no residence passes to descendants, so no residence nil rate band). Compute the IHT.

Step 1 — the lifetime position:
The gift is a PET. Deduct annual exemptions: 2019/20 £3,000 plus 2018/19 brought forward £3,000 = £6,000.
PET = 400,000 − 6,000 = £394,000. No tax in lifetime.

Step 2 — death within 7 years makes the PET chargeable:
Nil rate band at death = £325,000, fully available (no chargeable transfers in the 7 years before August 2019).
Taxable = 394,000 − 325,000 = £69,000.
Tax at death rate = 69,000 × 40% = £27,600.

Step 3 — taper relief:
August 2019 to March 2025 is between 5 and 6 years, so the TAX is reduced by 60%.
Tax payable = 27,600 × 40% = £11,040 — payable by the daughter.

Step 4 — the death estate:
The PET has consumed the entire £325,000 nil rate band (gifts use it first, in date order).
Estate tax = 500,000 × 40% = £200,000, payable by the personal representatives.

Had Hugh survived to August 2026, the PET would have dropped out entirely and the estate would have kept the full nil rate band — a £131,040 difference.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Applying taper relief to the GIFT instead of the TAX — taper reduces the tax on a lifetime gift, never the transfer of value, and does nothing for gifts within 3 years of death.

Giving the death estate the full nil rate band when lifetime gifts within 7 years have already consumed it — gifts take the band first, in chronological order.

Forgetting the brought-forward annual exemption — up to £6,000 can shelter a gift, but the brought-forward £3,000 lapses if unused for one year.

Treating the small gifts exemption as a deduction from a larger gift — £250 per donee is all or nothing; a £300 gift gets no small-gift relief at all.

Grossing up a CLT at 25% when the TRUSTEES pay the lifetime tax — grossing applies only when the donor pays.

Claiming the residence nil rate band for any estate — it needs a residence passing to direct descendants, and tapers away above a £2 million estate.`,
      },
    ],
  },
]
