/*
 * Topic Briefs — APM (Advanced Performance Management).
 * One brief per syllabus area (A–D). Same shape and register as the
 * core briefs in acca-briefs.ts: concept in plain language, the
 * structures/formulas, a short worked example, then the classic traps.
 */

import type { TopicBrief } from "@/lib/acca-briefs"

export const APM_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── APM — Area A ───────────────────────── */
  {
    paper: "APM",
    area: "A",
    title: "Strategic planning & control",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Planning sets the direction; control keeps you on it",
        body: `Think of a business as a ship. Strategic planning is deciding the destination and the route — where the market is going, what would make customers choose us, how we will win over the next three to five years. Control is everything that happens after you leave port: checking the compass, comparing where you actually are against where the plan said you would be, and steering back on course. APM Area A is about designing that whole loop so it fits the organisation and the world it operates in.

A useful map of the loop is Anthony's hierarchy. Strategic planning is long-term and set by senior management (which markets, which products, what capacity). Management (tactical) control turns strategy into resources and budgets for the year. Operational control is the day-to-day, short-cycle checking that individual tasks are done efficiently. Problems arise when a system built for one level is used to judge another — for example, using a rigid annual budget, a management-control tool, to police fast-moving operational decisions.

The big APM idea is that there is no single "best" planning and control system. The right design depends on the environment. In a stable, predictable market a detailed annual budget works well. In a turbulent market — fast technology change, unpredictable demand — a fixed budget is out of date the moment it is signed, so rolling forecasts and looser, more strategic control fit better. Your job in the exam is usually to judge whether an organisation's system matches its circumstances, and to recommend improvements, not to recite definitions.`,
      },
      {
        kind: "structure",
        heading: "The planning and control toolkit",
        body: `Budgeting approaches (know when each suits):
Incremental — last year's figures plus a percentage. Fast and stable, but carries forward waste and past errors.
Zero-based (ZBB) — every activity justified from nothing each cycle. Cuts slack and forces priorities, but is time-consuming; suits discretionary/support costs.
Rolling (continuous) — the budget is extended a period as each period ends, so there is always a full horizon ahead. Suits fast-changing conditions; costly to keep updating.
Flexible — costs flexed to the actual activity level so like is compared with like. Essential for meaningful variance analysis.
Activity-based (ABB) — budgets built from activities and cost drivers; aligns with ABC.
Beyond Budgeting — replace the annual fixed budget with relative targets, rolling forecasts and devolved decisions; suits volatile, knowledge-based firms.

Ferreira & Otley — a 12-question framework for describing and diagnosing a performance management system: vision and mission; key success factors; organisation structure; strategies and plans; key performance measures; target setting; performance evaluation; reward systems; information flows/systems; use of the system; system change; and the strength and coherence of the whole. It is a lens for critiquing a real system, not a scoring sheet.

McKinsey 7S — checks that an organisation is internally aligned, especially during change. Hard elements: Strategy, Structure, Systems. Soft elements: Shared values (central), Skills, Staff, Style. A new strategy fails if the soft S's are ignored.

Environmental analysis feeding the plan: PEST/PESTEL (macro factors), Porter's five forces (industry attractiveness), SWOT (pulling internal and external together).`,
      },
      {
        kind: "example",
        heading: "Worked example — why you must flex the budget",
        body: `A division budgets to make 1,000 units. Its cost model is variable cost $8 per unit plus fixed cost $5,000. It actually makes 1,200 units and spends $14,000.

The naive (and wrong) comparison uses the original fixed budget:
Original budget cost = (1,000 × 8) + 5,000 = $13,000
Actual = $14,000
"Overspend" = $1,000 adverse — and the manager looks careless.

Now flex the budget to the volume actually achieved:
Flexed budget = (1,200 × 8) + 5,000 = $14,600
Actual = $14,000
Variance = 14,600 − 14,000 = $600 favourable.

Flexing tells the true story: making 200 extra units should have cost another $1,600, but only $1,000 more was spent, so the division was actually $600 better than expected. Judging actual results against a budget set for a different activity level is one of the most common control errors — flexible budgeting is the fix.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Comparing actual results with the original fixed budget when volume has changed — always flex first, or the variance is meaningless.

Treating zero-based budgeting as "start every number at zero." It means every activity must be justified afresh; it is about challenge, not literally rebuilding every figure from nil.

Using the McKinsey 7S but only listing the three hard S's — the exam marks come from the soft ones (shared values, skills, staff, style), which is where change programmes usually break.

Reciting Ferreira & Otley as a checklist. It is a diagnostic lens: apply the questions to the scenario and comment on gaps and incoherence.

Assuming a detailed annual budget is always best. In a turbulent environment it locks in stale assumptions — rolling forecasts or a Beyond Budgeting approach may fit better.

Confusing the levels of Anthony's hierarchy — strategic, management (tactical) and operational control answer different questions over different time horizons.`,
      },
    ],
  },

  /* ───────────────────────── APM — Area B ───────────────────────── */
  {
    paper: "APM",
    area: "B",
    title: "Performance management systems & design",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Building systems that capture the right costs and behaviour",
        body: `Once the direction is set, someone has to build the machinery that measures cost and coordinates the parts of the business. That is Area B: the design of the performance management system itself — the costing techniques it uses, how it prices transfers between divisions, and the information systems that feed it.

Why do modern costing techniques matter? Traditional absorption costing was built for a world of direct labour and simple products. Today, overheads dominate, product ranges are wide, and much of a product's cost is locked in long before it is ever made. Techniques such as activity-based, target, lifecycle and throughput costing exist to give managers a truer picture of where money is really consumed and where it can be influenced.

Transfer pricing is the second big design problem. When one division sells to another inside the same group, the internal price is not a real market transaction — but it decides each division's reported profit, and it drives behaviour. Set it badly and a manager will make a decision that flatters their own division while damaging the group. The whole point of good transfer pricing is goal congruence: each division, acting in its own interest, still does what is best for the group as a whole.

Underneath all of this sits information: transaction systems, management information, and increasingly big data. A performance management system is only as good as the data flowing through it, so its design (accuracy, timeliness, integration) is itself an exam theme.`,
      },
      {
        kind: "structure",
        heading: "Costing techniques, transfer pricing and systems",
        body: `Modern costing techniques:
Activity-based costing (ABC) — traces overheads to activities, then to products via cost drivers. Better product costs where overheads are high and diverse.
Target costing — start from the price the market will pay, deduct the required profit margin to get a target cost, then engineer the product down to it. Cost gap = expected cost − target cost.
Lifecycle costing — accumulate all costs over the whole life (design, launch, production, decommissioning), not just the production phase; much cost is committed at the design stage.
Throughput accounting (from the theory of constraints) — treat only material as truly variable; maximise throughput through the bottleneck.
Kaizen costing — continuous small cost reductions during production.

Throughput accounting ratio (TPAR):
Throughput per unit = selling price − direct material cost
Return per factory hour = throughput per unit ÷ bottleneck hours per unit
Cost per factory hour = total factory (operating) cost ÷ total bottleneck hours
TPAR = return per factory hour ÷ cost per factory hour
A TPAR above 1 means the product earns more per bottleneck hour than it costs to run — worth making.

Transfer pricing methods: market-based, cost-based (marginal or full cost, with or without a mark-up), negotiated, and dual pricing.
General rule for the minimum acceptable transfer price:
Minimum transfer price = marginal cost of the unit + opportunity cost to the selling division
With spare capacity the opportunity cost is nil, so the floor is marginal cost. At a bottleneck it is marginal cost plus the lost contribution.

Information systems feeding the design: transaction processing systems (TPS), management information systems (MIS), executive information systems (EIS), enterprise resource planning (ERP), and big data (volume, velocity, variety, veracity).`,
      },
      {
        kind: "example",
        heading: "Worked example — throughput accounting ratio",
        body: `A factory makes one product on a bottleneck machine.
Selling price = $50 per unit
Direct material = $20 per unit
Bottleneck machine time = 0.5 hours per unit
Total factory operating cost (all labour and overhead) = $400,000
Total bottleneck hours available = 10,000

Step 1 — throughput per unit:
50 − 20 = $30 (only material is deducted; labour is treated as a fixed factory cost)

Step 2 — return per factory hour:
30 ÷ 0.5 = $60 per bottleneck hour

Step 3 — cost per factory hour:
400,000 ÷ 10,000 = $40 per bottleneck hour

Step 4 — TPAR:
60 ÷ 40 = 1.5

A TPAR of 1.5 is above 1, so each hour on the bottleneck generates $1.50 of throughput for every $1 of factory cost — the product is worth making. To improve it you would raise price, cut material cost, or speed the product through the bottleneck.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Deducting labour in throughput. In throughput accounting only direct material is variable — labour and overheads are fixed factory costs, so throughput = sales − material only.

Getting the target costing subtraction backwards. Target cost = market price − required margin; the cost gap = expected cost − target cost (the amount you still need to design out).

Setting a transfer price that ignores opportunity cost. The floor is marginal cost only when there is spare capacity; at a bottleneck you must add the contribution given up.

Treating lifecycle costing as production costs only. Its whole value is including design, launch and end-of-life costs — most of which are committed before production starts.

Applying ABC everywhere. Its benefit appears where overheads are large and diverse; for a simple, labour-driven product it adds cost without insight.

Confusing a TPAR below 1 with "loss-making." It means the product is not covering factory cost per bottleneck hour — a ranking and capacity signal, not a statutory loss.`,
      },
    ],
  },

  /* ───────────────────────── APM — Area C ───────────────────────── */
  {
    paper: "APM",
    area: "C",
    title: "Strategic performance measurement",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Measuring whether the strategy is actually working",
        body: `A plan is only as good as the way you measure its delivery. Area C is about choosing measures that tell you whether the strategy is succeeding — and, just as important, that do not quietly push managers into the wrong behaviour.

The core problem is that a single financial number, on its own, is dangerous. Judge a division only on this year's profit or return and its manager will cut training, defer maintenance and skip research — all of which flatter today's figure and starve tomorrow's business. This is short-termism, and it is why APM keeps returning to two ideas: better financial measures that charge for the capital used, and multi-dimensional frameworks that sit non-financial measures (quality, customers, innovation, people) alongside the money.

So the area has two halves. First, sharper financial performance measures — return on investment, residual income and economic value added — each an attempt to answer "did this division earn more than the cost of the money tied up in it?" Second, balanced frameworks — the balanced scorecard, the performance pyramid, the building block model, and value-for-money measures for the public and not-for-profit sector — each a way to make sure the picture is complete, links back to strategy, and looks forward as well as back.`,
      },
      {
        kind: "structure",
        heading: "Financial measures and balanced frameworks",
        body: `Divisional financial measures:
Return on investment (ROI) = controllable (operating) profit ÷ capital employed, as a percentage. Simple and comparable, but can make managers reject good projects that would dilute a high ROI.
Residual income (RI) = controllable profit − (cost of capital × capital employed). An absolute money figure; a positive RI means value added above the capital charge, so managers accept any project earning above the cost of capital.
Economic value added (EVA) = NOPAT − (WACC × capital employed).
  NOPAT (net operating profit after tax): start from profit, add back interest net of tax (financing sits in WACC), add back non-cash items such as increases in provisions and any development/marketing spend that builds the business (capitalise and amortise it), and use cash taxes.
  Capital employed: adjust the book figure by adding back those same cumulative items (e.g. capitalised R&D, provisions); use opening capital for the year.
  WACC = (E/V × cost of equity) + (D/V × cost of debt × (1 − tax)).

Balanced frameworks:
Balanced scorecard (Kaplan & Norton) — four perspectives: Financial; Customer; Internal business process; Learning and growth. Each carries objectives and measures linked to strategy.
Performance pyramid (Lynch & Cross) — vision at the apex; below it business-unit market and financial objectives; then business operating systems (customer satisfaction, flexibility, productivity); then departmental measures (quality, delivery, cycle time, waste). The left side is external effectiveness, the right side internal efficiency.
Building block model (Fitzgerald & Moon) — for service businesses. Dimensions (results: financial performance, competitiveness; determinants: quality, flexibility, resource utilisation, innovation); Standards (ownership, achievability, equity/fairness); Rewards (clarity, motivation, controllability).
Not-for-profit / public sector — value for money via the 3 Es: Economy (buying inputs cheaply), Efficiency (output per input), Effectiveness (meeting objectives).`,
      },
      {
        kind: "example",
        heading: "Worked example — economic value added (EVA)",
        body: `A division reports:
Profit after tax = $700
Interest paid (net of tax) = $140
Non-cash adjustments to add back (increase in provisions plus development spend written off) = $60
Opening capital employed (already adjusted for the cumulative add-backs) = $5,000
WACC = 8%

Step 1 — build NOPAT:
Profit after tax 700
Add back interest net of tax 140 (its cost is captured in WACC)
Add back non-cash items 60
NOPAT = 700 + 140 + 60 = $900

Step 2 — capital charge:
WACC × capital employed = 8% × 5,000 = $400

Step 3 — EVA:
NOPAT − capital charge = 900 − 400 = $500

EVA is positive, so the division has created $500 of value above the cost of all the capital tied up in it — a genuine wealth gain, not just an accounting profit. A positive EVA is a stronger signal than a positive accounting profit because it has already charged for the capital.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Forgetting to add back interest (net of tax) when building NOPAT. Financing cost is already inside WACC, so leaving interest in double-counts it.

Using closing capital employed for the capital charge. EVA (and RI) normally charge on opening capital — the capital that was available to earn the year's return.

Listing the balanced scorecard perspectives wrongly. They are Financial, Customer, Internal business process, and Learning and growth — not four kinds of financial measure.

Confusing residual income with ROI. RI is an absolute money amount after a capital charge; ROI is a percentage and can wrongly push managers to reject value-adding projects.

Muddling economy, efficiency and effectiveness. Economy is input cost, efficiency is output per input, effectiveness is whether objectives were met — effectiveness is the one most often dropped.

Treating any multi-dimensional model as a fixed template. The balanced scorecard, performance pyramid and building block model must be tailored to the organisation's own strategy and sector.`,
      },
    ],
  },

  /* ───────────────────────── APM — Area D ───────────────────────── */
  {
    paper: "APM",
    area: "D",
    title: "Performance evaluation & corporate failure",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Judging performance fairly — and spotting failure early",
        body: `Measuring performance and evaluating people with it are two different things. Area D is about the second, and about the ultimate performance question: is this business heading for collapse?

The behavioural half matters because how a manager is judged changes how they behave. Lean on a manager purely for hitting this month's budget and you may get exactly the wrong response — data manipulation, gaming, defensive short-termism — even if costs look controlled on paper. So a good evaluation system distinguishes what a manager can actually control from what they cannot, and chooses a style of using the numbers that fits the situation.

The failure-prediction half gives you structured ways to answer "how close to the edge is this company?" before the obvious signs appear. Some models are quantitative, distilling several ratios into a single score (Altman's Z-score). Others are qualitative, scoring the management defects and mistakes that tend to precede collapse (Argenti's A-score). Neither is a crystal ball, but each forces a disciplined look at warning signs a single profit figure would hide.

The exam link between the two halves is that failure is rarely just financial. It grows out of weak management, poor control systems and an evaluation culture that rewards the wrong things — which is exactly what the behavioural material and the A-score describe.`,
      },
      {
        kind: "structure",
        heading: "Behavioural styles and failure models",
        body: `Hopwood's styles of using budget/accounting information to evaluate managers:
Budget-constrained — judged mainly on meeting the short-term budget. Produces high job-related tension, mistrust and data manipulation, though not necessarily worse cost control.
Profit-conscious — judged on longer-term effectiveness and general success; accounting data used with judgement. Lower tension.
Non-accounting — accounting data plays little part in evaluation. Low tension but weak cost awareness.
The lesson: a rigid, budget-constrained style can damage behaviour even when the numbers look met.

Altman's Z-score (original public-manufacturer model):
Z = 1.2X1 + 1.4X2 + 3.3X3 + 0.6X4 + 1.0X5
X1 = working capital ÷ total assets
X2 = retained earnings ÷ total assets
X3 = EBIT ÷ total assets
X4 = market value of equity ÷ book value of total liabilities
X5 = sales ÷ total assets
Interpretation: Z above 2.99 = safe; Z below 1.81 = high failure risk; 1.81–2.99 = grey zone.

Argenti's A-score — a qualitative model scoring the path to failure in three stages:
Defects — management weaknesses (autocratic chief executive, non-participating board, weak finance function, lack of management depth) and accounting weaknesses (no budgetary control, no cash-flow plans, no costing system), plus failure to respond to change.
Mistakes — high gearing, overtrading, and a single big project that could sink the firm.
Symptoms — deteriorating financial signs, creative accounting, declining morale, and finally terminal signs.
Scores are added; a total above about 25 signals real danger. Weak defects or a serious mistake alone can be enough.`,
      },
      {
        kind: "example",
        heading: "Worked example — Altman Z-score",
        body: `A listed manufacturer reports ($000):
Working capital = 200, Total assets = 1,000
Retained earnings = 150
EBIT = 180
Market value of equity = 600, Book value of total liabilities = 400
Sales = 900

Compute each ratio and weight it:
X1 = 200 ÷ 1,000 = 0.20 → 1.2 × 0.20 = 0.24
X2 = 150 ÷ 1,000 = 0.15 → 1.4 × 0.15 = 0.21
X3 = 180 ÷ 1,000 = 0.18 → 3.3 × 0.18 = 0.594
X4 = 600 ÷ 400 = 1.50 → 0.6 × 1.50 = 0.900
X5 = 900 ÷ 1,000 = 0.90 → 1.0 × 0.90 = 0.900

Z = 0.24 + 0.21 + 0.594 + 0.900 + 0.900 = 2.844

At 2.844 the company sits in the grey zone (1.81 to 2.99): not in immediate danger, but not clearly safe either. The score would warn management to watch liquidity (X1) and profitability (X3), and it flags that a single year's profit figure alone would have missed the caution.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Mixing up the Z-score coefficients. The weights are fixed (1.2, 1.4, 3.3, 0.6, 1.0) and pair with specific ratios — X3 (EBIT/total assets) carries the heaviest weight at 3.3.

Using book value for X4's numerator. X4 uses the market value of equity over the book value of total liabilities — market value of equity, book value of debt.

Applying the original Z-score to any company. It was calibrated on listed manufacturers; private companies and service/financial firms need the revised versions, and a market value is needed at all.

Calling the A-score purely objective. Argenti is a qualitative, judgement-based model — its scores for defects, mistakes and symptoms are assigned by assessment, not read off the accounts.

Assuming the budget-constrained style always gives the worst results. Hopwood found it produced high tension and data manipulation, but cost control was not necessarily worse — the harm is behavioural.

Treating failure as a purely financial event. The A-score's whole point is that management and accounting defects come first; the financial symptoms appear late.`,
      },
    ],
  },
]
