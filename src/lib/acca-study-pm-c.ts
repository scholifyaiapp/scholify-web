import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area C — Budgeting & control.
 * Budgeting systems and their behavioural effects, the learning curve as a
 * forecasting tool, standard costing with basic and advanced variances
 * (mix & yield, sales mix & quantity, planning vs operational) and the flexed
 * budget reconciliation. Original, syllabus-aligned; every figure re-solved.
 */

export const PM_C: StudyChapter = {
  paper: "PM",
  area: "C",
  title: "Budgeting & control",
  minutes: 17,
  intro: "A budget is a plan written in money — but the plan is only half the job. Control is what happens when the real world disagrees with it, and variance analysis is how you find out why.",
  outcomes: [
    "Choose and criticise budgeting systems — incremental, zero-based, activity-based, rolling and beyond budgeting — and explain their behavioural effects",
    "Use the learning curve model Y = ax^b to forecast labour hours and cost",
    "Calculate the basic material, labour, overhead and sales variances from a standard cost card",
    "Calculate advanced variances: materials mix & yield and sales mix & quantity",
    "Split a variance into its planning and operational parts and reconcile budget to actual profit through a flexed budget",
  ],
  sections: [
    {
      id: "systems",
      heading: "Budgeting systems — and how people react to them",
      blocks: [
        { kind: "text", md: "Every budget answers the same question — **what do we plan to spend and earn?** — but the *system* used to build it changes the answer, the effort and the behaviour it provokes. Five systems dominate the PM syllabus, and each trades ease against rigour." },
        { kind: "table", caption: "The five budgeting systems at a glance", head: ["System", "How the number is built", "Best suited to"], rows: [
          ["Incremental", "Last year's figure, adjusted for inflation and known changes", "Stable, predictable costs"],
          ["Zero-based (ZBB)", "Start from a zero base; every cost justified from scratch", "Discretionary spend — marketing, R&D, training"],
          ["Activity-based (ABB)", "Budget the cost drivers, then the activities they trigger", "Overhead-heavy, complex operations"],
          ["Rolling", "Continuously add a new period as the last one ends", "Fast-changing or uncertain conditions"],
          ["Beyond budgeting", "Abandon the fixed annual budget for rolling forecasts and relative targets", "Dynamic firms wanting agility, not a fixed contract"],
        ] },
        { kind: "text", md: "**Incremental** budgeting is cheap and quick, but it carries forward last year's inefficiency — including any **budgetary slack**. **Zero-based** budgeting attacks exactly that: it forces managers to build **decision packages** and rank them, so nothing survives unless it earns its place. The cost is time — ZBB is slow and demanding to run." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Zero-based vs incremental budgeting",
          data: {
            leftTitle: "Incremental",
            rightTitle: "Zero-based",
            rows: [
              { aspect: "Starting point", left: "Last year's figures", right: "A zero base — justify every cost" },
              { aspect: "Effort & cost", left: "Low, fast to prepare", right: "High, time-consuming" },
              { aspect: "Budgetary slack", left: "Carried forward unnoticed", right: "Challenged and stripped out" },
              { aspect: "Focus", left: "Inputs (what we spent before)", right: "Value (why this spend earns its place)" },
              { aspect: "Best for", left: "Stable, ongoing costs", right: "Discretionary spend" },
            ],
          },
        } },
        { kind: "text", md: "**Zero-based budgeting** runs as a repeatable process — this is the sequence an examiner expects you to describe:" },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The zero-based budgeting process",
          caption: "Nothing is assumed; every activity is defended, ranked and funded only as far as the money reaches.",
          data: {
            steps: [
              { label: "Define decision units", sub: "the activities that could be cut" },
              { label: "Build decision packages", sub: "cost & benefit of each, at service levels" },
              { label: "Rank packages", sub: "by value for money across the firm" },
              { label: "Allocate funds", sub: "down the ranking until money runs out" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Behavioural aspects", md: "How a budget is set changes how people behave. **Participative (bottom-up)** budgeting improves motivation and buy-in but makes **slack** easy to hide. **Imposed (top-down)** budgeting is fast and slack-free but can demotivate. A budget used **punitively** as a rigid target breeds dysfunctional behaviour — gaming, short-termism and slack-building — whereas a budget used for **planning and learning** supports control." },
        { kind: "callout", tone: "warn", title: "Beyond budgeting", md: "**Beyond budgeting** argues the annual fixed budget is the problem itself — it locks in assumptions, encourages gaming and goes stale within weeks. It replaces the fixed contract with **rolling forecasts** and **relative targets** (beat the market, not a number agreed a year ago)." },
      ],
      check: {
        q: "Which budgeting system is MOST appropriate for controlling discretionary spend such as marketing and R&D, where the risk of carried-forward slack is high?",
        options: [
          "Incremental budgeting",
          "Zero-based budgeting",
          "A fixed annual budget",
          "Rolling budgeting",
        ],
        correct: 1,
        explain: "Zero-based budgeting starts from a zero base and forces every cost to be justified from scratch, so no prior-year slack survives. That makes it ideal for discretionary spend, where incremental budgeting would simply carry forward last year's padding. Rolling budgeting addresses uncertainty, not slack.",
      },
    },
    {
      id: "learning-curve",
      heading: "The learning curve — forecasting labour that speeds up",
      blocks: [
        { kind: "text", md: "When a task is new and labour-intensive, workers get **faster the more times they do it**. The learning curve captures this: every time **cumulative output doubles**, the **cumulative average time per unit** falls to a fixed percentage of what it was — the **learning rate**. An 80% curve means each doubling cuts the cumulative average time to 80% of the previous average." },
        { kind: "formula", name: "Learning curve model", expr: "Y = a x^b", note: "Y = cumulative average time per unit for x units; a = time for the first unit; x = cumulative units; b = the learning index." },
        { kind: "formula", name: "The learning index b", expr: "b = log(learning rate) / log 2", note: "For an 80% curve: b = log(0.8) / log(2) = (-0.09691) / (0.30103) = -0.3219." },
        { kind: "text", md: "The doubling rule is the fast route when output lands exactly on a power of two. Start with the first-unit time and multiply by the learning rate at every doubling:" },
        { kind: "example", title: "Worked example — forecasting labour for 8 batches (80% curve)", scenario: "The first batch of a new product takes **1,000 labour hours**. An **80% learning curve** applies. Labour is paid **$12 per hour**. Forecast the total hours and labour cost for the first 8 batches, and the incremental hours for batches 5-8.", steps: [
          { label: "1 batch", detail: "Cumulative average = 1,000 hrs → cumulative total = 1 × 1,000 = 1,000 hrs." },
          { label: "2 batches", detail: "Average = 1,000 × 0.80 = 800 hrs → total = 2 × 800 = 1,600 hrs." },
          { label: "4 batches", detail: "Average = 800 × 0.80 = 640 hrs → total = 4 × 640 = 2,560 hrs." },
          { label: "8 batches", detail: "Average = 640 × 0.80 = 512 hrs → total = 8 × 512 = 4,096 hrs." },
          { label: "Total cost (8 batches)", detail: "4,096 hrs × $12 = $49,152." },
          { label: "Incremental for batches 5-8", detail: "Total(8) − total(4) = 4,096 − 2,560 = 1,536 hrs." },
        ], result: "The first 8 batches need 4,096 hours costing $49,152; batches 5-8 alone add only 1,536 hours — because by then the crew is far down the curve." },
        { kind: "text", md: "When output is **not** a power of two, the doubling shortcut fails and you use the formula directly. Check the model against the 8-batch answer and then push it to 5 batches:" },
        { kind: "formula", name: "Cumulative average at x = 8", expr: "Y = 1000 x 8^(-0.3219) = 1000 x 0.512 = 512 hrs", note: "Matches the doubling table exactly — confirms b is right." },
        { kind: "formula", name: "Cumulative average at x = 5", expr: "Y = 1000 x 5^(-0.3219) = 1000 x 0.5957 = 595.7 hrs", note: "Cumulative total for 5 batches = 5 x 595.7 = 2,978 hrs; so batch 5 alone = 2,978 - 2,560 = 418 hrs." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Cumulative average hours per batch (80% curve)",
          caption: "Each doubling of output knocks the cumulative average down to 80% of the prior level — the curve flattens as learning is exhausted.",
          data: {
            unit: "hrs",
            items: [
              { label: "1 batch", value: 1000 },
              { label: "2 batches", value: 800 },
              { label: "4 batches", value: 640 },
              { label: "8 batches", value: 512 },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Where it bites", md: "The learning effect **ends** once the process is mastered (the **steady state**) — beyond that, times stop falling. In variance analysis, a learning curve is a classic cause of a **planning** error: if the standard ignored learning, the resulting efficiency variance is not the workers' fault." },
      ],
      check: {
        q: "A first unit takes 200 hours and a 90% learning curve applies. What is the cumulative average time per unit once 4 units have been made?",
        options: [
          "180 hours",
          "162 hours",
          "200 hours",
          "The learning curve does not apply to 4 units",
        ],
        correct: 1,
        explain: "Each doubling multiplies the cumulative average by 0.90. From 1 to 2 units: 200 × 0.90 = 180. From 2 to 4 units: 180 × 0.90 = 162 hours. Four units is two doublings, so 200 × 0.90 × 0.90 = 162 hours.",
      },
    },
    {
      id: "basic-variances",
      heading: "Standard costing & the basic variances",
      blocks: [
        { kind: "text", md: "A **standard cost** is the planned cost of one unit — a benchmark set before production. Control means comparing that benchmark, **flexed to the actual output**, against what really happened. The gap is a **variance**, labelled **F** (favourable — profit higher than standard) or **A** (adverse — profit lower)." },
        { kind: "callout", tone: "rule", title: "Always flex first", md: "Never compare actual cost against the **original** budget — that mixes volume with performance. Flex the budget to the **actual** activity level first: variable costs are recalculated at cost-per-unit × actual units; fixed costs stay put." },
        { kind: "formula", name: "Material price variance", expr: "(std price - actual price) x actual quantity", note: "How much of the cost gap is due to paying a different price per unit of input." },
        { kind: "formula", name: "Material usage variance", expr: "(std qty for actual output - actual qty) x std price", note: "How much is due to using more or fewer units of input than the standard allows." },
        { kind: "formula", name: "Labour rate & efficiency", expr: "Rate = (std rate - actual rate) x actual hrs ; Efficiency = (std hrs for output - actual hrs) x std rate", note: "Idle time, if given, is split out of efficiency as its own adverse variance." },
        { kind: "formula", name: "Sales price & volume", expr: "Price = (actual price - std price) x actual units ; Volume = (actual units - budget units) x std contribution", note: "Under marginal costing the volume variance is valued at standard CONTRIBUTION per unit; under absorption costing, at standard profit." },
        { kind: "example", title: "Worked example — material variances", scenario: "Standard: each unit needs **3 kg** of material at **$4/kg**. Actual output was **1,100 units**, using **3,400 kg** that cost **$13,940** in total. Split the total material cost variance into price and usage.", steps: [
          { label: "Actual price per kg", detail: "$13,940 ÷ 3,400 kg = $4.10/kg." },
          { label: "Price variance", detail: "(std $4.00 − actual $4.10) × 3,400 kg = (−0.10) × 3,400 = −$340 → $340 A." },
          { label: "Std qty for actual output", detail: "1,100 units × 3 kg = 3,300 kg allowed." },
          { label: "Usage variance", detail: "(3,300 − 3,400) × $4.00 = (−100) × 4 = −$400 → $400 A." },
          { label: "Cross-check", detail: "Std cost of output = 3,300 × $4 = $13,200; actual = $13,940; total variance = $13,200 − $13,940 = −$740 A = $340 A + $400 A." },
        ], result: "Total material cost variance $740 A, made up of $340 A price and $400 A usage — the firm both paid more per kg and used more kg than standard." },
      ],
    },
    {
      id: "mix-yield",
      heading: "Advanced variances — mix & yield, sales mix & quantity",
      blocks: [
        { kind: "text", md: "When inputs are **substitutable** — different grades of flour, blends of chemicals — the usage variance splits further. The **mix variance** asks whether the recipe's proportions were kept; the **yield variance** asks whether the total input produced the expected output. Together they equal the total usage variance." },
        { kind: "formula", name: "Materials mix variance", expr: "(actual qty in std mix - actual qty in actual mix) x std price", note: "Compare the actual TOTAL input split in the standard proportions against how it was really split, each valued at that material's standard price." },
        { kind: "formula", name: "Materials yield variance", expr: "(actual output - std output from actual input) x std cost per unit of output", note: "Equivalently: (std input for actual output - actual input) x std cost per unit of input." },
        { kind: "example", title: "Worked example — mix & yield", scenario: "Standard: **10 kg** of input yields **8 kg** of output — **6 kg of A at $3/kg** and **4 kg of B at $5/kg** (std input cost $38, so $3.80/kg of input and $4.75/kg of output). Actual: **720 kg of A** and **530 kg of B** (1,250 kg input total) produced **1,020 kg** of output.", steps: [
          { label: "Standard proportions", detail: "A = 6/10 = 60%, B = 4/10 = 40%." },
          { label: "Actual input in std mix (of 1,250 kg)", detail: "A = 60% × 1,250 = 750 kg; B = 40% × 1,250 = 500 kg." },
          { label: "Mix variance — A", detail: "(750 std-mix − 720 actual) × $3 = 30 × 3 = +$90 F." },
          { label: "Mix variance — B", detail: "(500 std-mix − 530 actual) × $5 = (−30) × 5 = −$150 → $150 A." },
          { label: "Total mix variance", detail: "$90 F − $150 A = −$60 → $60 A (too little of cheap A, too much of dear B)." },
          { label: "Std output from actual input", detail: "1,250 kg × (8/10) = 1,000 kg expected." },
          { label: "Yield variance", detail: "(1,020 actual − 1,000 expected) × $4.75 per kg output = 20 × 4.75 = +$95 F." },
          { label: "Cross-check to usage", detail: "Std input for 1,020 kg output = 1,020 × (10/8) = 1,275 kg. Usage: A (765−720)×3 = $135 F; B (510−530)×5 = $100 A → $35 F = $60 A mix + $95 F yield." },
        ], result: "Mix $60 A + yield $95 F = usage $35 F. The blend drifted to the expensive material, but the total input yielded more good output than expected, and the yield gain outweighed the mix cost." },
        { kind: "text", md: "The **sales** volume variance splits the same way. The **sales mix variance** measures whether the product blend sold matched the budgeted blend; the **sales quantity variance** measures whether the total volume sold differed from budget — both valued at standard contribution per unit." },
        { kind: "formula", name: "Sales mix variance", expr: "(actual units in actual mix - actual units in std mix) x std contribution per unit", note: "Did we sell a richer or poorer blend than planned?" },
        { kind: "formula", name: "Sales quantity variance", expr: "(actual units in std mix - budgeted units) x std contribution per unit", note: "Did the overall market volume rise or fall versus budget?" },
        { kind: "example", title: "Worked example — sales mix & quantity", scenario: "Budget: **P 600 units** (contribution **$20**) and **Q 400 units** (contribution **$30**) — total 1,000, a 60:40 mix. Actual sales: **P 700** and **Q 400** (1,100 units total).", steps: [
          { label: "Actual total in std mix (of 1,100)", detail: "P = 60% × 1,100 = 660; Q = 40% × 1,100 = 440." },
          { label: "Mix variance — P", detail: "(700 actual − 660 std-mix) × $20 = 40 × 20 = +$800 F." },
          { label: "Mix variance — Q", detail: "(400 actual − 440 std-mix) × $30 = (−40) × 30 = −$1,200 → $1,200 A." },
          { label: "Total mix variance", detail: "$800 F − $1,200 A = −$400 → $400 A (skewed to the lower-contribution product P)." },
          { label: "Quantity variance — P", detail: "(660 std-mix − 600 budget) × $20 = 60 × 20 = +$1,200 F." },
          { label: "Quantity variance — Q", detail: "(440 std-mix − 400 budget) × $30 = 40 × 30 = +$1,200 F." },
          { label: "Cross-check to volume", detail: "Volume: P (700−600)×20 = $2,000 F; Q (400−400)×30 = $0 → $2,000 F = $400 A mix + $2,400 F quantity." },
        ], result: "Mix $400 A + quantity $2,400 F = sales volume $2,000 F. Selling more overall drove profit up, but the extra sales leaned to the cheaper product, clawing $400 back." },
      ],
      check: {
        q: "Two materials are used. Total actual input equals the total input the standard mix would prescribe, but more of the expensive material and less of the cheap one was used. What does this tell you about the mix variance?",
        options: [
          "It must be favourable",
          "It must be adverse",
          "It must be nil because total input matched",
          "It cannot be calculated without the yield",
        ],
        correct: 1,
        explain: "The mix variance compares the actual split against the standard split at standard prices. Using more of the expensive material and less of the cheap one raises cost above what the standard blend would have cost, so the mix variance is adverse. Total input matching only guarantees the individual mix variances net across materials — it does not make the mix variance nil.",
      },
    },
    {
      id: "planning-operational",
      heading: "Planning vs operational variances",
      blocks: [
        { kind: "text", md: "A variance is only fair if the **standard** was fair. When the original standard was set on assumptions that later proved wrong for reasons **outside the manager's control** — a market price shift, a strike, a raw-material shortage — the standard should be **revised** to what it *ought* to have been. The total variance then splits in two." },
        { kind: "formula", name: "Planning variance", expr: "(original std - revised std) x actual quantity", note: "The part caused by the standard being wrong — uncontrollable. Measures original vs a realistic, revised standard." },
        { kind: "formula", name: "Operational variance", expr: "(revised std - actual) x actual quantity", note: "The part caused by real performance against a realistic standard — controllable, the manager's responsibility." },
        { kind: "example", title: "Worked example — splitting a price variance", scenario: "A material's **original standard** price was **$10/kg**. After budgeting, a global shortage moved the realistic market price to **$12/kg** — the **revised standard**. The buyer actually paid **$12.50/kg** for **2,000 kg** used. Split the total price variance into planning and operational.", steps: [
          { label: "Total price variance", detail: "(original $10 − actual $12.50) × 2,000 = (−2.50) × 2,000 = −$5,000 → $5,000 A." },
          { label: "Planning variance", detail: "(original $10 − revised $12) × 2,000 = (−2) × 2,000 = −$4,000 → $4,000 A (the market moved — uncontrollable)." },
          { label: "Operational variance", detail: "(revised $12 − actual $12.50) × 2,000 = (−0.50) × 2,000 = −$1,000 → $1,000 A (buyer paid above the realistic price — controllable)." },
          { label: "Cross-check", detail: "$4,000 A planning + $1,000 A operational = $5,000 A total. ✓" },
        ], result: "Of the $5,000 A total, $4,000 A is a planning error (the market shifted and no one could stop it) and only $1,000 A reflects the buyer's own performance against a fair, revised standard." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Planning vs operational variances",
          data: {
            leftTitle: "Planning variance",
            rightTitle: "Operational variance",
            rows: [
              { aspect: "Compares", left: "Original std vs revised std", right: "Revised std vs actual" },
              { aspect: "Cause", left: "A faulty or outdated standard", right: "Real operating performance" },
              { aspect: "Controllable?", left: "No — external, uncontrollable", right: "Yes — the manager's responsibility" },
              { aspect: "Used to judge", left: "The standard-setting process", right: "The operational manager" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The manipulation risk", md: "Revising standards is powerful but open to abuse: a manager may reclassify a genuine **operational** failure as a **planning** error to escape blame. Revisions must be justified as genuinely uncontrollable and agreed independently, or the split loses its integrity." },
      ],
    },
    {
      id: "reconciliation",
      heading: "The flexed budget & the profit reconciliation",
      blocks: [
        { kind: "text", md: "All the variances come together in the **operating statement**: a bridge from the **flexed budget profit** to the **actual profit**, one variance at a time. First flex the budget to the actual output; the difference between that and actual profit is fully explained by the variances." },
        { kind: "example", title: "Worked example — flexing the budget", scenario: "Budget: **1,000 units** at **$100** selling price; standard variable cost **$70/unit** (contribution **$30**); fixed overhead **$20,000**. Actual output and sales were **1,100 units**. Flex the budget.", steps: [
          { label: "Budget profit (1,000 units)", detail: "1,000 × $30 contribution − $20,000 fixed = $30,000 − $20,000 = $10,000." },
          { label: "Flexed contribution (1,100 units)", detail: "1,100 × $30 = $33,000 — variable items flex with volume." },
          { label: "Fixed cost", detail: "Stays at $20,000 — fixed costs do not flex." },
          { label: "Flexed budget profit", detail: "$33,000 − $20,000 = $13,000." },
        ], result: "The flexed budget profit is $13,000 — the profit the business *should* have made at the actual volume of 1,100 units. This is the starting point of the reconciliation." },
        { kind: "text", md: "Now bridge from that **$13,000** flexed profit to actual profit. Suppose the period's variances were: sales price **$2,200 F**, materials price **$1,500 A**, materials usage **$800 F**, labour rate **$1,200 A**, labour efficiency **$1,000 F**, variable overhead **$300 A** and fixed overhead expenditure **$500 A**." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Reconciliation — flexed budget profit to actual profit",
          caption: "Favourable variances lift the bar; adverse variances (shown negative) pull it down. The bars net to the actual profit of $13,500.",
          data: {
            unit: "$",
            items: [
              { label: "Flexed budget profit", value: 13000, kind: "start" },
              { label: "Sales price", value: 2200, kind: "delta" },
              { label: "Materials price", value: -1500, kind: "delta" },
              { label: "Materials usage", value: 800, kind: "delta" },
              { label: "Labour rate", value: -1200, kind: "delta" },
              { label: "Labour efficiency", value: 1000, kind: "delta" },
              { label: "Variable overhead", value: -300, kind: "delta" },
              { label: "Fixed overhead", value: -500, kind: "delta" },
              { label: "Actual profit", value: 13500, kind: "total" },
            ],
          },
        } },
        { kind: "formula", name: "The reconciliation check", expr: "13,000 + 2,200 - 1,500 + 800 - 1,200 + 1,000 - 300 - 500 = 13,500", note: "Net variance = +$500, so actual profit = $13,500. If it does not tie, a variance is missing or mis-signed." },
        { kind: "callout", tone: "key", title: "The one idea", md: "Control is a closed loop: **flex** the budget to actual volume, **explain** the remaining gap with priced variances, then **act** — investigate the material ones, feed the causes back into next period's standards, and separate what the manager controlled from what the plan got wrong." },
      ],
    },
  ],
  examTraps: [
    { trap: "Comparing actual cost against the ORIGINAL budget instead of the flexed budget.", fix: "Always flex to the actual output level first — otherwise the volume difference contaminates every cost variance." },
    { trap: "Valuing the sales volume (or quantity) variance at selling price or at profit under marginal costing.", fix: "Under marginal costing, value sales volume, mix and quantity variances at standard CONTRIBUTION per unit; use standard profit only under absorption costing." },
    { trap: "Using actual quantity in the standard mix wrongly — splitting the standard input rather than the actual total input.", fix: "The mix variance splits the ACTUAL total input into standard proportions, then compares to the actual split, each at standard price." },
    { trap: "Treating a planning variance as controllable and blaming the manager for it.", fix: "Planning = original std vs revised std = uncontrollable. Only the operational variance (revised std vs actual) judges the manager." },
    { trap: "Forgetting the learning effect ends, and extrapolating the curve forever.", fix: "Learning stops at the steady state; beyond it, times are constant. Also remember b = log(learning rate)/log 2, not the learning rate itself." },
  ],
  keyTerms: [
    { term: "Zero-based budgeting", def: "Building each budget from a zero base, with every cost justified through ranked decision packages rather than carried forward." },
    { term: "Budgetary slack", def: "Deliberate margin built into a budget — understated income or padded costs — to make the target easier to achieve." },
    { term: "Learning curve", def: "The model Y = ax^b: each doubling of cumulative output cuts the cumulative average time per unit to the learning-rate percentage." },
    { term: "Mix variance", def: "The part of the usage (or sales volume) variance caused by combining inputs, or selling products, in different proportions than standard." },
    { term: "Yield variance", def: "The part of the materials usage variance caused by the total input producing more or less output than the standard yield." },
    { term: "Planning variance", def: "The part of a total variance caused by an unrealistic original standard — original std vs a revised, realistic standard; uncontrollable." },
  ],
  summary: [
    "Budgeting systems trade effort for rigour: incremental is cheap but carries slack; ZBB, ABB, rolling and beyond budgeting each attack a specific weakness, and how a budget is set drives behaviour.",
    "The learning curve Y = ax^b (with b = log(learning rate)/log 2) forecasts falling labour times; each doubling of output cuts the cumulative average to the learning-rate percentage.",
    "Basic variances flex the budget to actual output, then split each cost and sales gap into price/rate and usage/efficiency/volume, labelled F or A.",
    "Advanced variances split usage into mix & yield and sales volume into mix & quantity — the mix uses standard vs actual proportions of the actual total, valued at standard price or contribution.",
    "Planning variances (revised vs original standard, uncontrollable) separate from operational variances (actual vs revised standard, controllable), and the operating statement reconciles flexed budget profit to actual profit.",
  ],
}
