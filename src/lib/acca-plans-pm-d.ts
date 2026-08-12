/*
 * PM Area D — budgeting and control: budgetary systems, quantitative analysis,
 * learning curves, and the advanced variances.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * The advanced variances are where PM candidates lose most marks, and almost never
 * because they cannot subtract. They lose them by using actual quantity where
 * standard quantity belongs, by valuing a mix variance at the wrong price, and — on
 * planning and operational variances — by getting the direction of the revision
 * backwards. So every variance plan here imposes the same two disciplines: identify
 * which quantity each element uses, and assign the direction in words rather than
 * by tracking a sign.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const PM_PLANS_D: ExamPlanMap = {
  /* ── PM-20 · Budgetary systems ─────────────────────────────── */

  "PM-20::purposes": {
    title: "Why a budget's purposes conflict",
    format: "ot",
    marks: 2,
    requirement:
      "A budget used both to plan operations and to evaluate managers' performance creates a conflict because managers have an incentive to:\n\nA  Forecast as accurately as possible\nB  Build in slack, producing a budget that is easy to beat rather than an accurate plan\nC  Reduce their departmental costs\nD  Increase output beyond the budget",
    plan: [
      {
        step: "Name the purposes and why they pull apart",
        detail:
          "PLANNING needs the most accurate forecast available. EVALUATION means the manager is judged against the figure they supplied. The two demand different behaviour from the same person.",
      },
      {
        step: "Follow the incentive",
        detail:
          "A manager judged against their own budget will understate revenue and overstate cost — budgetary slack — because an easy target is safer than an accurate one.",
      },
      {
        step: "State the consequence for the organisation",
        detail:
          "The plan built from those budgets is systematically pessimistic, so resources are misallocated and the whole planning process is degraded by the evaluation use.",
      },
      {
        step: "Name the remedies a discussion answer should reach",
        detail:
          "Separate the planning budget from the target used for evaluation, evaluate against a flexed budget or a rolling forecast, use non-financial measures alongside, and avoid tying pay solely to budget variances.",
      },
    ],
    answer:
      "**B — build in slack, producing a budget that is easy to beat rather than an accurate plan.**\n\n**Planning** needs the most accurate forecast available. **Evaluation** means the manager is judged against the figure they themselves supplied. The same document is being asked to do two things that demand opposite behaviour.\n\nA manager judged against their own budget will understate revenue and overstate cost — **budgetary slack** — because an easy target is safer than an accurate one. The organisation then plans from systematically pessimistic figures, misallocates resources, and the planning purpose is degraded by the evaluation purpose.\n\nThe remedies are what earn discussion marks: **separate** the planning budget from the evaluation target, evaluate against a **flexed** budget or a **rolling forecast** rather than an annual figure set months earlier, use **non-financial** measures alongside financial ones, and avoid tying pay **solely** to budget variances.\n\nA budget also serves co-ordination, communication, motivation and authorisation — and each of those can conflict with the others too.",
    earns: [
      "Naming both purposes and explaining why they demand opposite behaviour",
      "Giving remedies that change the system rather than exhorting honesty",
    ],
    loses: ["Choosing accurate forecasting, which is what the conflict prevents"],
  },

  "PM-20::behaviour": {
    title: "The behavioural effect of how a budget is set",
    format: "ot",
    marks: 2,
    requirement:
      "An imposed top-down budget sets targets managers believe are unachievable. The most likely consequence is that managers:\n\nA  Work harder to achieve them\nB  Stop trying, because a target believed impossible does not motivate\nC  Build in budgetary slack\nD  Request more resources",
    plan: [
      {
        step: "Recall the relationship between difficulty and motivation",
        detail:
          "A target motivates where it is demanding but believed achievable. Too easy produces no effort; believed impossible produces disengagement, because effort seems pointless either way.",
      },
      {
        step: "Match the consequence to the budget style",
        detail:
          "IMPOSED budgets risk unachievable targets and disengagement. PARTICIPATIVE budgets risk slack. Each style has its own characteristic failure, and option C belongs to the other one.",
      },
      {
        step: "Note the compensating advantages of each",
        detail:
          "Imposed: faster, uses senior strategic knowledge, avoids slack. Participative: better information from those who know the operations, and greater acceptance and commitment.",
      },
      {
        step: "Note the compromise used in practice",
        detail:
          "Negotiated budgeting — targets set through discussion between levels — which is why the exam usually recommends it rather than either extreme.",
      },
    ],
    answer:
      "**B — stop trying, because a target believed impossible does not motivate.**\n\nA target motivates where it is **demanding but believed achievable**. Too easy produces no effort; believed **impossible** produces disengagement, because effort appears pointless whether it is made or not.\n\nOption C is the characteristic failure of the **other** style: **participative** budgets risk **slack**, while **imposed** budgets risk **unachievable targets and disengagement**. Matching the failure to the style is the whole question.\n\nEach style has compensating advantages. **Imposed**: faster to produce, uses senior management's strategic knowledge, and avoids slack. **Participative**: better information from the people who know the operations, and greater acceptance and commitment to a figure they helped set.\n\nWhich is why practice usually lands on **negotiated** budgeting — targets set through discussion between levels — and why the exam normally recommends that rather than either extreme.\n\nThe related failure is spending the whole allocation to protect next year's budget, which is about how money is spent rather than how the target was set.",
    earns: [
      "Matching the failure to the budget style rather than mixing them",
      "Naming negotiated budgeting as the practical compromise",
    ],
    loses: ["Attributing slack to an imposed budget, which is the participative failure"],
  },

  /* ── PM-21 · Quantitative analysis ─────────────────────────── */

  "PM-21::high-low-regression": {
    title: "Separating fixed and variable cost, and reading the reliability",
    format: "ot",
    marks: 2,
    requirement:
      "A regression of total cost on output gives y = 40,000 + 6x with r² = 0.31. The most appropriate conclusion is that:\n\nA  Fixed cost is $40,000 and the relationship explains most of the variation in cost\nB  Fixed cost is $40,000 and variable cost is $6 per unit, but output explains only 31% of the variation in cost, so the estimate is unreliable\nC  Variable cost is $40,000 per unit\nD  The relationship is strong because r² is positive",
    plan: [
      {
        step: "Read the equation's two coefficients",
        detail:
          "In y = a + bx, a is total FIXED cost and b is variable cost PER UNIT. So $40,000 is a total and $6 is a rate — inverting them is the standard slip.",
      },
      {
        step: "Read r² for what it actually measures",
        detail:
          "The coefficient of determination: the proportion of variation in the dependent variable explained by the independent one. 0.31 means 31% is explained and 69% is not.",
      },
      {
        step: "Draw the honest conclusion",
        detail:
          "A forecast built on this relationship is unreliable. Something other than output is driving most of the cost variation, so the equation should not be used without investigating what.",
      },
      {
        step: "Reject the option that reads positivity as strength",
        detail:
          "r² is always positive, since it is a square. So being positive says nothing at all about strength, which is what option D assumes.",
      },
    ],
    answer:
      "**B — fixed cost is $40,000 and variable cost is $6 per unit, but output explains only 31% of the variation in cost, so the estimate is unreliable.**\n\nIn **y = a + bx**, the constant **a** is total fixed cost and the coefficient **b** is variable cost **per unit**. So $40,000 is a total and $6 is a rate.\n\n**r² = 0.31** means output explains **31%** of the variation in cost and **69% is unexplained** — so something other than output is driving most of the cost movement, and a forecast built on this equation is unreliable without finding out what.\n\nOption D is the trap: **r² is always positive** because it is a square, so positivity says nothing whatever about strength.\n\n**High-low** analysis is the cruder alternative: cost difference ÷ activity difference gives the variable rate, then substitute back to find fixed cost. Its weakness is that it uses only **two** observations and both are extremes, so an unrepresentative high or low point corrupts the whole estimate — which is why regression, using every observation, is preferred where the data allows.",
    earns: [
      "Reading a as a total and b as a rate, and interpreting r² as the proportion explained",
      "Knowing r² is always positive, so its sign carries no information",
    ],
    loses: ["Reporting the coefficients without reading r², which is where the conclusion lies"],
  },

  "PM-21::time-series": {
    title: "Applying a seasonal adjustment in the right direction",
    format: "ot",
    marks: 2,
    requirement:
      "Under the multiplicative model the trend for a quarter is forecast at 8,000 units and the seasonal index is 0.85. The forecast for the quarter is:\n\nA  6,800 units\nB  9,411 units\nC  7,150 units\nD  8,000 units",
    plan: [
      {
        step: "Identify the model from the form of the seasonal figure",
        detail:
          "An index of 0.85 is a proportion, so this is MULTIPLICATIVE: actual = trend × index. An additive model uses a figure in units that can be negative.",
      },
      {
        step: "Multiply, and check the direction first",
        detail:
          "The index is below 1, so the quarter runs below trend and the forecast must be below 8,000. 8,000 × 0.85 = **6,800 units**.",
      },
      {
        step: "Identify the inverted answer",
        detail:
          "8,000 ÷ 0.85 = 9,411, which is option B — and the direction check kills it before any arithmetic, since it is above trend when the index says below.",
      },
      {
        step: "Note when the multiplicative model is preferred",
        detail:
          "Where seasonal variation grows in proportion to the trend, which is usually the case in a growing business. The additive model assumes a constant absolute variation regardless of level.",
      },
    ],
    answer:
      "**A — 6,800 units.**\n\nAn index of **0.85** is a proportion, so the model is **multiplicative**: forecast = trend × index = 8,000 × 0.85 = **6,800 units**.\n\nThe direction check settles it before any arithmetic: the index is **below 1**, so the quarter runs below trend and the forecast must be below 8,000. Option B, 9,411, divides instead of multiplying and fails that check immediately.\n\nThe model is identifiable from the **form of the seasonal figure**: a proportion or percentage is multiplicative, a figure in units that can go negative is additive.\n\nWhen each is preferred: the **multiplicative** model assumes seasonal variation grows **in proportion** to the trend, which is usually right in a growing business — a January dip of 15% stays 15% as the business doubles. The **additive** model assumes a **constant absolute** variation regardless of level, which understates seasonality as the business grows.\n\nThe trend itself is found by **moving averages**, centred where the number of periods is even.",
    earns: [
      "Identifying the model from the form of the figure, and using a direction check",
      "Knowing when the multiplicative model is the more defensible assumption",
    ],
    loses: ["Dividing by the index, which the direction check catches in one line"],
  },

  /* ── PM-22 · Learning curves ───────────────────────────────── */

  "PM-22::the-formula": {
    title: "Using the learning curve formula",
    format: "ot",
    marks: 2,
    requirement:
      "The first unit takes 100 hours and an 80% learning curve applies. The **total** time for the first four units is:\n\nA  256 hours\nB  320 hours\nC  400 hours\nD  64 hours",
    plan: [
      {
        step: "State what the learning rate applies to",
        detail:
          "An 80% curve means the CUMULATIVE AVERAGE time per unit falls to 80% of its previous level each time cumulative output DOUBLES. It is the cumulative average, not the incremental time.",
      },
      {
        step: "Double from one unit to four",
        detail:
          "1 unit: average 100 hours. 2 units: average 80. 4 units: average 64. Two doublings, so 100 × 0.8 × 0.8 = 64 hours average.",
      },
      {
        step: "Convert the average to a total",
        detail:
          "4 units × 64 hours = **256 hours** total. Option D reports the average where a total was asked for, which is the standard slip.",
      },
      {
        step: "Note how to find an incremental time",
        detail:
          "Total for n units less total for (n−1) units. The fourth unit alone takes 256 less the total for three units — never the cumulative average, which is a different figure.",
      },
    ],
    answer:
      "**A — 256 hours.**\n\nAn 80% curve means the **cumulative average** time per unit falls to 80% of its previous level each time cumulative output **doubles**.\n\n1 unit: average **100** hours. 2 units: average **80**. 4 units: average **64**.\nTotal for 4 units = 4 × 64 = **256 hours**.\n\nOption D reports the **average** where a **total** was asked for, and option B applies only one doubling.\n\nTwo things to keep straight. The rate applies to the **cumulative average**, not to the incremental time — so the fourth unit does not take 64 hours. To find an **incremental** time, take the total for n units less the total for (n−1) units.\n\nWhere output is not a doubling, use the formula **y = axᵇ**, where y is the cumulative average time for x units, a is the time for the first unit, and b = log(learning rate) ÷ log 2. For an 80% curve b = −0.3219.",
    earns: [
      "Applying the rate to the cumulative average and converting to a total",
      "Knowing how to derive an incremental time from two cumulative totals",
    ],
    loses: ["Reporting the cumulative average where a total was asked for"],
  },

  "PM-22::conditions-and-implications": {
    title: "When learning applies, and what it does to a standard",
    format: "ot",
    marks: 2,
    requirement:
      "A standard labour time is set at the time taken for the first batch, but learning is occurring. The result will be:\n\nA  Persistent adverse labour efficiency variances\nB  Persistent favourable labour efficiency variances that reflect the stale standard rather than good performance\nC  No variance at all\nD  Adverse labour rate variances",
    plan: [
      {
        step: "Work out which way the standard is wrong",
        detail:
          "If the standard is the FIRST batch's time and workers are getting faster, actual time is consistently LESS than standard. That produces favourable variances.",
      },
      {
        step: "Say what the variance actually measures",
        detail:
          "Learning, not performance. The variance measures the gap between a stale standard and improving reality, so it tells management nothing about whether the workforce did well this period.",
      },
      {
        step: "State the remedy",
        detail:
          "Build the learning curve INTO the standard, so the standard time falls as output accumulates. Then a variance measures departure from expected learning, which is informative.",
      },
      {
        step: "Note the conditions learning requires",
        detail:
          "A labour-intensive process, a new product or process, no significant breaks in production, a stable and motivated workforce, and no change in method. Learning also eventually reaches a STEADY STATE.",
      },
    ],
    answer:
      "**B — persistent favourable labour efficiency variances that reflect the stale standard rather than good performance.**\n\nIf the standard is the **first batch's** time and workers are getting faster, actual time is consistently **less** than standard, so the variances are favourable — and persistent one-directional variances always point at the **standard** rather than at performance.\n\nWhat the variance measures is **learning**, not performance. So it tells management nothing about whether the workforce did well this period, and rewarding managers on it rewards the passage of time.\n\nThe remedy is to build the learning curve **into the standard**, so the standard time falls as cumulative output rises. A variance then measures departure from **expected learning**, which is genuinely informative — the workforce learned faster or slower than anticipated.\n\nThe conditions learning requires: a **labour-intensive** process, a **new** product or process, **no significant breaks** in production, a **stable and motivated** workforce, and **no change in method**. And learning eventually reaches a **steady state**, after which the standard should stop falling — continuing to reduce it produces adverse variances that are equally uninformative.",
    earns: [
      "Working out the direction from how the standard is wrong",
      "Naming the steady state, so the standard stops falling at the right point",
    ],
    loses: ["Reading a favourable variance as evidence of good performance"],
  },

  /* ── PM-23 · Standard costing and basic variances ──────────── */

  "PM-23::standards-and-variances": {
    title: "The one structure behind every variance",
    format: "ot",
    marks: 2,
    requirement:
      "Standard material cost is 5 kg at $8 per kg. Actual production was 3,000 units using 15,600 kg costing $122,000. The material **usage** variance is:\n\nA  $4,800 adverse\nB  $4,800 favourable\nC  $2,000 favourable\nD  $600 adverse",
    plan: [
      {
        step: "Fix the two-variance structure and use it everywhere",
        detail:
          "PRICE compares what was paid with what should have been paid for the ACTUAL quantity. USAGE compares actual quantity with the quantity the ACTUAL OUTPUT should have taken, valued at STANDARD price.",
      },
      {
        step: "Compute the standard quantity for actual output",
        detail:
          "3,000 units × 5 kg = 15,000 kg. This is the figure candidates omit — comparing 15,600 kg against a budgeted quantity for a different output level is the classic error.",
      },
      {
        step: "Take the quantity difference at standard price",
        detail:
          "15,600 − 15,000 = 600 kg extra × $8 standard = **$4,800 adverse**. Usage variances are always valued at standard price, so the price effect cannot contaminate them.",
      },
      {
        step: "Assign the direction in words, never by sign",
        detail:
          "More material was used than the output should have needed, which costs money, so it is adverse. Saying it in words is faster and safer than tracking a sign convention.",
      },
    ],
    answer:
      "**A — $4,800 adverse.**\n\nStandard quantity for actual output = 3,000 × 5 kg = **15,000 kg**.\nActual 15,600 kg, so 600 kg more was used.\nValued at standard price: 600 × $8 = **$4,800 adverse**.\n\nThe usage variance is always valued at **standard** price, so the price effect stays out of it — otherwise one variance would blend two unrelated causes and neither manager could be held to it.\n\nFor completeness, the price variance: 15,600 kg should have cost 15,600 × $8 = $124,800; it cost $122,000; so **$2,800 favourable**. Total material variance = $4,800 A − $2,800 F = **$2,000 adverse**.\n\nThat total is offered as option C with the sign reversed — check: standard cost for actual output is 3,000 × 5 × $8 = $120,000 against actual $122,000, so $2,000 **adverse** ✓.\n\nThe same structure drives every variance in the paper: **quantity difference × standard rate**, and **rate difference × actual quantity**.",
    earns: [
      "Computing the standard quantity for ACTUAL output before anything else",
      "Valuing usage at standard price, and cross-checking the total against actual cost",
    ],
    loses: ["Comparing actual usage against a budgeted quantity for a different output level"],
  },

  "PM-23::interdependence": {
    title: "Explaining a linked pair of variances",
    format: "ot",
    marks: 2,
    requirement:
      "A favourable material price variance is reported with an adverse material usage variance. The single most likely explanation is that:\n\nA  Purchasing performed well and production performed badly\nB  Cheaper, lower-grade material was bought, which wasted more in production\nC  The standard price is out of date\nD  Output exceeded budget",
    plan: [
      {
        step: "Notice the stem asks for ONE explanation covering both",
        detail:
          "Two variances, one cause. That rules out any answer giving a separate explanation for each, however true each half might be.",
      },
      {
        step: "Find the mechanism that links price to usage",
        detail:
          "Buying below standard price usually means buying lower quality, and lower-quality material wastes more. One purchasing decision produces both variances, in opposite directions.",
      },
      {
        step: "Assign responsibility to the decision, not the department",
        detail:
          "If the purchase caused the waste, the adverse usage variance belongs to PURCHASING. Holding production responsible measures them on someone else's decision, which is the real error option A makes.",
      },
      {
        step: "Judge whether the trade paid",
        detail:
          "Compare the price saving with the usage loss. If usage exceeds the saving, the purchase destroyed value — and that net judgement is what a discussion answer must reach.",
      },
    ],
    answer:
      "**B — cheaper, lower-grade material was bought, which wasted more in production.**\n\nOne decision produces both variances: buying below standard price usually means buying lower quality, which then wastes more in production. Favourable on price, adverse on usage, from a single cause.\n\nOption A gives a **separate** explanation for each and treats them as unrelated, which the stem's \"single\" excludes — and it also **misassigns responsibility**. If the purchase caused the waste, the adverse usage variance belongs to **purchasing**, and holding production accountable measures them on a decision they did not make.\n\nThe judgement a discussion answer must reach is whether the trade **paid**: compare the price saving with the usage loss, and if usage exceeds the saving the purchase destroyed value.\n\nThe other standard pairs are a **favourable labour rate** with an **adverse labour efficiency** variance — cheaper, less skilled workers — and an **adverse sales price** with a **favourable sales volume** variance, which is a price cut. In each case the two must be read and netted together.",
    earns: [
      "Requiring one cause to explain both, and reassigning responsibility to the deciding department",
      "Netting the two to judge whether the trade paid",
    ],
    loses: ["Choosing the option that explains each variance separately"],
  },

  /* ── PM-24 · Fixed overhead variances ──────────────────────── */

  "PM-24::the-variances": {
    title: "Splitting fixed overhead into expenditure, capacity and efficiency",
    format: "ot",
    marks: 2,
    requirement:
      "Budgeted fixed overhead was $150,000 for 30,000 budgeted labour hours. Actual overhead was $156,000, actual hours worked were 28,000, and the standard hours for actual output were 29,000. The fixed overhead **capacity** variance is:\n\nA  $10,000 adverse\nB  $5,000 favourable\nC  $6,000 adverse\nD  $5,000 adverse",
    plan: [
      {
        step: "Set out the three variances and what each compares",
        detail:
          "EXPENDITURE: actual overhead against budgeted overhead. CAPACITY: actual hours WORKED against BUDGETED hours. EFFICIENCY: standard hours for actual output against actual hours WORKED. Capacity and efficiency together make the volume variance.",
      },
      {
        step: "Compute the absorption rate",
        detail:
          "$150,000 ÷ 30,000 hours = **$5 per hour**. Both capacity and efficiency are measured at this rate.",
      },
      {
        step: "Compute capacity using hours worked against budgeted hours",
        detail:
          "(28,000 worked − 30,000 budgeted) × $5 = **$10,000 adverse**. Fewer hours were worked than budgeted, so less overhead was absorbed — adverse.",
      },
      {
        step: "Compute the others to identify the distractors",
        detail:
          "Efficiency = (29,000 standard − 28,000 worked) × $5 = $5,000 favourable, which is option B. Expenditure = $156,000 − $150,000 = $6,000 adverse, which is option C.",
      },
    ],
    answer:
      "**A — $10,000 adverse.**\n\nAbsorption rate = $150,000 ÷ 30,000 = **$5 per hour**.\nCapacity = (28,000 hours worked − 30,000 budgeted) × $5 = **$10,000 adverse** — fewer hours were worked than budgeted, so less overhead was absorbed.\n\nEvery distractor is one of the other variances from the same data:\n\n**Efficiency** = (29,000 standard hours for actual output − 28,000 worked) × $5 = **$5,000 favourable** (option B)\n**Expenditure** = $156,000 − $150,000 = **$6,000 adverse** (option C)\n\nAnd they reconcile: capacity $10,000 A + efficiency $5,000 F = **volume variance $5,000 adverse**, and total fixed overhead variance = volume $5,000 A + expenditure $6,000 A = **$11,000 adverse**. Check: absorbed 29,000 × $5 = $145,000 against actual $156,000 = $11,000 under-absorbed ✓.\n\nThat reconciliation confirms all three figures at once, which is why it is worth doing.\n\nNote these variances exist only under **absorption** costing — under marginal costing fixed overhead is a period cost and there is no volume variance.",
    earns: [
      "Knowing which two quantities each variance compares",
      "Reconciling capacity and efficiency to the volume variance and to total under-absorption",
    ],
    loses: ["Reporting the efficiency or expenditure variance when capacity was asked for"],
  },

  "PM-24::statement-and-limits": {
    title: "What the fixed overhead volume variance is actually worth",
    format: "ot",
    marks: 2,
    requirement:
      "A criticism of the fixed overhead volume variance is that it:\n\nA  Is difficult to calculate\nB  Measures only whether output differed from budget, and does not represent a real cash saving or cost\nC  Cannot be split further\nD  Only arises under marginal costing",
    plan: [
      {
        step: "Ask what the variance represents in cash",
        detail:
          "Nothing. Fixed overhead was incurred at whatever the actual figure was; the volume variance measures how much of it was ABSORBED into units, which is an accounting effect.",
      },
      {
        step: "See why that limits its usefulness",
        detail:
          "A favourable volume variance means more units were produced, not that any cost was saved. Producing for inventory generates a favourable variance while consuming cash.",
      },
      {
        step: "Reject the calculation and splitting options",
        detail:
          "It is straightforward to compute and it DOES split, into capacity and efficiency. Both options state the opposite of the position.",
      },
      {
        step: "Reject the marginal costing option",
        detail:
          "It arises only under ABSORPTION costing. Under marginal costing fixed overhead is a period cost, so there is nothing to absorb and no volume variance at all.",
      },
    ],
    answer:
      "**B — measures only whether output differed from budget, and does not represent a real cash saving or cost.**\n\nFixed overhead was incurred at whatever the actual figure was. The volume variance measures how much of it was **absorbed** into units, which is an accounting effect rather than a cash one.\n\nThat is what limits its usefulness. A **favourable** volume variance means more units were produced — it does not mean any cost was saved. Worse, producing **for inventory** generates a favourable volume variance while consuming cash, so the measure can reward exactly the wrong behaviour.\n\nOption D reverses the position: the variance arises only under **absorption** costing, because under marginal costing fixed overhead is a period cost and there is nothing to absorb.\n\nOptions A and C are both false — it is straightforward to compute and it does split, into **capacity** and **efficiency**.\n\nThe **expenditure** variance is the more useful of the two, because it compares actual spending with what was budgeted and that is something management controls.",
    earns: [
      "Explaining that the variance is an absorption effect, not a cash effect",
      "Naming the perverse incentive to produce for inventory",
    ],
    loses: ["Attributing the volume variance to marginal costing, which cannot generate one"],
  },

  /* ── PM-25 · Material mix and yield ────────────────────────── */

  "PM-25::the-calculation": {
    title: "Splitting the usage variance into mix and yield",
    format: "ot",
    marks: 2,
    requirement:
      "The material **mix** variance is calculated as the difference between the actual quantities used and the:\n\nA  Standard quantities for actual output, valued at actual prices\nB  Actual total quantity split in standard proportions, valued at standard prices\nC  Budgeted quantities, valued at standard prices\nD  Standard quantities for budgeted output, valued at actual prices",
    plan: [
      {
        step: "Understand what the split separates",
        detail:
          "The usage variance divides into MIX — was the blend right? — and YIELD — did the total input produce the expected output? Two different questions about the same total usage.",
      },
      {
        step: "State the mix comparison precisely",
        detail:
          "Actual quantities used, against the ACTUAL TOTAL quantity re-split in STANDARD PROPORTIONS, valued at STANDARD prices. Holding the total constant is what isolates the mix.",
      },
      {
        step: "See why the total must be held constant",
        detail:
          "If the total changed, the comparison would capture yield as well and the two variances would overlap. Fixing the total at actual is what makes mix a pure measure of proportions.",
      },
      {
        step: "State the yield comparison for contrast",
        detail:
          "The actual total input in standard proportions, against the standard input for actual output. That holds the PROPORTIONS constant and lets the total vary — the mirror image.",
      },
    ],
    answer:
      "**B — actual total quantity split in standard proportions, valued at standard prices.**\n\nThe usage variance divides into two different questions about the same total usage: **mix** — was the blend right? — and **yield** — did the total input produce the expected output?\n\nThe **mix** comparison holds the **total constant at actual** and re-splits it in **standard proportions**, valued at standard prices. Holding the total constant is what makes mix a pure measure of **proportions** — if the total were allowed to change, the comparison would pick up yield as well and the two variances would overlap.\n\nThe **yield** comparison is the mirror image: the actual total input in standard proportions, against the standard input for actual output. That holds the **proportions** constant and lets the **total** vary.\n\nBoth are valued at **standard** prices, so the price effect stays in the price variance.\n\nThe two must sum to the usage variance, and checking that they do is the fastest way to catch an error in either.",
    earns: [
      "Knowing mix holds the total constant and yield holds the proportions constant",
      "Checking that mix plus yield equals the usage variance",
    ],
    loses: ["Valuing either variance at actual prices, which imports the price effect"],
  },

  "PM-25::interpretation": {
    title: "Reading mix and yield together",
    format: "ot",
    marks: 2,
    requirement:
      "A favourable mix variance is reported with an adverse yield variance. The most likely explanation is that:\n\nA  Both purchasing and production performed well\nB  A cheaper blend was used, which produced less output than the standard input should have yielded\nC  The standard mix is out of date\nD  Output exceeded budget",
    plan: [
      {
        step: "Read what each variance is saying",
        detail:
          "Favourable mix: the blend used was cheaper than the standard blend. Adverse yield: the total input produced less output than it should have. Together they describe one decision and its consequence.",
      },
      {
        step: "Identify the linking mechanism",
        detail:
          "Substituting more of a cheap ingredient for a dear one saves money on the blend and can reduce the yield — the cheaper input performs less well in the process.",
      },
      {
        step: "Judge whether the substitution paid",
        detail:
          "Net the two. If the adverse yield exceeds the favourable mix, the substitution destroyed value — and that net judgement is the answer management needs.",
      },
      {
        step: "Note the qualitative consequence",
        detail:
          "A cheaper blend may also affect product quality, which shows up later as returns, complaints or lost customers rather than in this period's variances at all.",
      },
    ],
    answer:
      "**B — a cheaper blend was used, which produced less output than the standard input should have yielded.**\n\nA **favourable mix** says the blend used was cheaper than standard; an **adverse yield** says the total input produced less output than it should have. Together they describe **one decision and its consequence**: substituting more of a cheap ingredient for a dear one saves on the blend and reduces the yield, because the cheaper input performs less well in the process.\n\nThe judgement management needs is whether the substitution **paid**: net the two, and if the adverse yield exceeds the favourable mix, it destroyed value.\n\nThe qualitative consequence is the point a good answer adds. A cheaper blend may also affect **product quality**, which surfaces later as returns, complaints or lost customers — and none of that appears in this period's variances at all. So a substitution that nets out favourable can still be the wrong decision.\n\nMix and yield only make sense where inputs are genuinely **substitutable**. Where a recipe is fixed, the split is meaningless and reporting it invites managers to game a variance they should not be able to influence.",
    earns: [
      "Netting the two and adding the quality consequence that appears in neither",
      "Knowing the split requires genuinely substitutable inputs",
    ],
    loses: ["Reading the favourable mix as good performance without netting the yield"],
  },

  /* ── PM-26 · Sales mix and quantity ────────────────────────── */

  "PM-26::the-calculation": {
    title: "Splitting the sales volume variance",
    format: "ot",
    marks: 2,
    requirement:
      "The sales **quantity** variance measures the effect on contribution of:\n\nA  Selling a different mix of products from standard\nB  Selling a different total volume from budget, at the standard mix\nC  Selling at a different price from standard\nD  A change in standard cost",
    plan: [
      {
        step: "Split the sales volume variance in two",
        detail:
          "MIX: the effect of selling a different PROPORTION of products. QUANTITY: the effect of selling a different TOTAL volume at the standard mix. Together they equal the sales volume variance.",
      },
      {
        step: "Match the stem to the right half",
        detail:
          "Total volume at the standard mix is the quantity variance. Option A describes mix, which is the other half.",
      },
      {
        step: "Confirm both are valued at standard contribution",
        detail:
          "Under marginal costing both are valued at standard CONTRIBUTION, not at selling price. The price effect belongs to the separate sales price variance, which option C describes.",
      },
      {
        step: "Note what the split is for",
        detail:
          "It separates a sales team's success in selling MORE from its success in selling the RIGHT THINGS. Total volume can rise while profit falls, if the mix shifted to low-contribution products.",
      },
    ],
    answer:
      "**B — selling a different total volume from budget, at the standard mix.**\n\nThe sales volume variance splits into **mix** — the effect of selling different **proportions** — and **quantity** — the effect of selling a different **total** volume at the standard mix. The two sum to the sales volume variance.\n\nOption A describes **mix**, the other half. Option C describes the separate **sales price** variance.\n\nBoth halves are valued at standard **contribution** under marginal costing — never at selling price — because the price effect belongs to the price variance. Under absorption costing they would be valued at standard **profit** instead.\n\nWhat the split is **for** is the examinable point: it separates the sales team's success in selling **more** from its success in selling **the right things**. Total volume can rise while profit falls, if the mix shifted towards low-contribution products — and a single volume variance would hide that entirely, while the split shows a favourable quantity variance alongside an adverse mix one.",
    earns: [
      "Splitting mix from quantity on proportions versus total, and valuing both at standard contribution",
      "Explaining that total volume can rise while profit falls",
    ],
    loses: ["Valuing either half at selling price, which double-counts the price effect"],
  },

  "PM-26::interpretation": {
    title: "What the split tells management",
    format: "ot",
    marks: 2,
    requirement:
      "A company reports a favourable sales quantity variance and an adverse sales mix variance. This indicates that:\n\nA  Total sales volume fell and the mix improved\nB  Total sales volume rose, but the extra sales were weighted towards lower-contribution products\nC  Selling prices were reduced\nD  Costs increased",
    plan: [
      {
        step: "Read each variance's direction into a plain statement",
        detail:
          "Favourable quantity: total volume rose above budget. Adverse mix: the proportions shifted towards lower-contribution products. Translate before interpreting.",
      },
      {
        step: "Combine them into one commercial story",
        detail:
          "The sales team sold more, but sold more of the wrong things. Volume growth came disproportionately from low-margin lines.",
      },
      {
        step: "Net them to judge the outcome",
        detail:
          "Whether the company is better off depends on which is larger. A large adverse mix can outweigh a favourable quantity, so more sales can mean less profit.",
      },
      {
        step: "Draw the management action",
        detail:
          "Investigate why the mix shifted — pricing, incentives, availability of the high-margin lines — and consider whether sales incentives reward volume rather than contribution.",
      },
    ],
    answer:
      "**B — total sales volume rose, but the extra sales were weighted towards lower-contribution products.**\n\nTranslate each direction before interpreting: **favourable quantity** means total volume rose above budget; **adverse mix** means the proportions shifted towards lower-contribution products.\n\nThe commercial story is one sentence: the sales team sold **more**, but sold more of the **wrong things**.\n\nWhether the company is better off depends on which variance is larger — a large adverse mix can outweigh a favourable quantity, so **more sales can mean less profit**. Netting them is what produces an answer rather than an observation.\n\nThe management action follows: investigate **why** the mix shifted — was the high-margin line out of stock, was it priced too high, or are **sales incentives** paying on revenue or volume rather than on contribution? That last possibility is the most common and the most fixable, and it is the point a discussion answer should reach: the mix shifted because the incentive scheme asked for it.",
    earns: [
      "Netting the two and reaching a management action",
      "Identifying volume-based sales incentives as the likely cause",
    ],
    loses: ["Reading a favourable quantity variance as good news without examining the mix"],
  },

  /* ── PM-27 · Planning and operational variances ────────────── */

  "PM-27::why-split": {
    title: "Why variances are split into planning and operational",
    format: "ot",
    marks: 2,
    requirement:
      "The purpose of splitting a variance into planning and operational elements is to:\n\nA  Increase the total variance\nB  Separate the part caused by a faulty or out-of-date standard from the part the manager controlled\nC  Remove the need for a standard\nD  Make the variance favourable",
    plan: [
      {
        step: "Identify the problem the split solves",
        detail:
          "A variance measured against a stale standard blames the manager for the standard's error. Nobody can control the fact that the market price moved after the standard was set.",
      },
      {
        step: "Name what each element measures",
        detail:
          "PLANNING variance: original standard against a REVISED, realistic standard — the standard's error, not controllable. OPERATIONAL variance: revised standard against actual — the manager's performance, controllable.",
      },
      {
        step: "State the control consequence",
        detail:
          "Only the operational variance should be used to evaluate the manager. Reporting a total variance dominated by a planning element destroys the credibility of the whole control system.",
      },
      {
        step: "Note the danger of the technique",
        detail:
          "Managers may seek to reclassify their own poor performance as a planning variance. So the revision must be justified and approved independently, not left to the manager being assessed.",
      },
    ],
    answer:
      "**B — separate the part caused by a faulty or out-of-date standard from the part the manager controlled.**\n\nThe problem it solves is real: a variance measured against a **stale standard** blames the manager for the standard's error, and nobody controls the fact that a market price moved after the standard was set.\n\nThe **planning** variance compares the original standard with a **revised, realistic** standard — the standard's error, not controllable. The **operational** variance compares the revised standard with actual — the manager's performance, controllable.\n\nOnly the **operational** variance should be used to evaluate the manager, and reporting a total variance dominated by a planning element destroys the credibility of the control system.\n\nThe danger is what a discussion answer must raise: managers have an incentive to **reclassify their own poor performance as a planning variance**. So the revision must be **justified and approved independently** rather than left to the person being assessed — and revising standards too readily removes any target at all.",
    earns: [
      "Naming what each element compares and that only the operational one evaluates the manager",
      "Raising the reclassification risk and the need for independent approval",
    ],
    loses: ["Describing the split as changing the total variance, which it does not"],
  },

  "PM-27::sales-and-evaluation": {
    title: "Computing a planning variance in the right direction",
    format: "ot",
    marks: 2,
    requirement:
      "The original standard price was $10 per kg. A revised realistic standard is $12. Actual price paid was $12.50 for 1,000 kg. The material price **planning** variance is:\n\nA  $2,000 adverse\nB  $2,500 adverse\nC  $500 adverse\nD  $2,000 favourable",
    plan: [
      {
        step: "Identify which two standards the planning variance compares",
        detail:
          "ORIGINAL standard against REVISED standard. Actual cost plays no part in the planning variance — it belongs to the operational variance.",
      },
      {
        step: "Compute it on the quantity involved",
        detail:
          "($10 original − $12 revised) × 1,000 kg = **$2,000 adverse**. Adverse because the revised standard is higher, so the original was understated.",
      },
      {
        step: "Compute the operational variance to see the split",
        detail:
          "($12 revised − $12.50 actual) × 1,000 = $500 adverse, which is option C. The manager overspent by $500 against a realistic standard.",
      },
      {
        step: "Check the two sum to the total",
        detail:
          "$2,000 A + $500 A = $2,500 A total, which is option B — and that reconciliation confirms both figures. Most of the total was the standard's error, not the manager's.",
      },
    ],
    answer:
      "**A — $2,000 adverse.**\n\nThe **planning** variance compares the **original** standard with the **revised** standard, and actual cost plays no part in it:\n\n($10 − $12) × 1,000 kg = **$2,000 adverse** — adverse because the revised standard is higher, so the original was understated.\n\nThe **operational** variance completes the split: ($12 − $12.50) × 1,000 = **$500 adverse**, which is option C. That is the manager's performance against a realistic standard.\n\nThe two reconcile to the total: $2,000 A + $500 A = **$2,500 A**, which is option B and is the variance that would have been reported without the split. Checking that they sum confirms both figures.\n\nAnd the management conclusion follows immediately: **$2,000 of the $2,500 was the standard's error**, not the buyer's. Reporting $2,500 adverse against the buyer would be reporting mostly someone else's mistake — which is precisely the failure the split exists to correct.",
    earns: [
      "Comparing the two standards only, with actual cost excluded",
      "Reconciling the two elements to the total and drawing the management conclusion",
    ],
    loses: ["Bringing actual cost into the planning variance, which conflates the two elements"],
  },

  /* ── PM-28 · Investigation, interdependence and limits ─────── */

  "PM-28::investigation": {
    title: "Deciding which variances to investigate",
    format: "ot",
    marks: 2,
    requirement:
      "Which factor is **least** relevant to deciding whether to investigate a variance?\n\nA  Its size relative to the budget\nB  Whether it is controllable\nC  Whether it is favourable or adverse\nD  Whether it is part of a trend",
    plan: [
      {
        step: "Recall the investigation criteria",
        detail:
          "Absolute size, size relative to budget, controllability, whether it is a trend rather than a one-off, the reliability of the standard, and whether the likely saving justifies the cost of investigating.",
      },
      {
        step: "Read the stem's polarity and find the outsider",
        detail:
          "Least relevant. Three options are on the list, so the answer is the one that is not — and direction is not a criterion.",
      },
      {
        step: "Explain why direction does not matter",
        detail:
          "A large FAVOURABLE variance also needs investigating: it may reveal a stale standard, a cost wrongly omitted, corner-cutting, or a genuine improvement worth replicating elsewhere.",
      },
      {
        step: "Note the cost-benefit constraint",
        detail:
          "Investigation consumes management time, so it is only worth doing where the likely benefit exceeds that cost. That is what management by exception economises on.",
      },
    ],
    answer:
      "**C — whether it is favourable or adverse.**\n\nThe criteria are **absolute size**, **size relative to budget**, **controllability**, whether it is a **trend** rather than a one-off, the **reliability of the standard**, and whether the likely saving **justifies the cost** of investigating.\n\nDirection is not among them, and that is the examinable point. A large **favourable** variance needs investigating too: it may reveal a **stale standard**, a cost wrongly **omitted**, **corner-cutting** that will show up later as poor quality, or a **genuine improvement worth replicating** elsewhere in the business.\n\nInvestigating only adverse variances therefore misses information in every one of those cases — and it also signals to managers that favourable variances are never examined, which is an invitation to manufacture them.\n\nThe cost-benefit constraint underpins the whole approach: investigation consumes scarce management time, so **management by exception** exists to spend that time where it will earn a return.",
    earns: [
      "Knowing direction is not a criterion, and naming what a favourable variance can reveal",
      "Framing the whole approach as a cost-benefit judgement on management time",
    ],
    loses: ["Treating adverse variances as the only ones worth examining"],
  },

  "PM-28::interdependence": {
    title: "Tracing several variances to one decision",
    format: "ot",
    marks: 2,
    requirement:
      "A decision to buy cheaper material is most likely to produce which combination of variances?\n\nA  Favourable price, adverse usage, and possibly adverse labour efficiency\nB  Adverse price and favourable usage\nC  Favourable price and favourable usage\nD  No variances at all",
    plan: [
      {
        step: "Trace the decision through the process",
        detail:
          "Cheaper material: favourable PRICE variance. Lower quality wastes more: adverse USAGE. And harder-to-work material takes longer: adverse LABOUR EFFICIENCY.",
      },
      {
        step: "Notice the chain extends beyond materials",
        detail:
          "One purchasing decision can move a LABOUR variance. That is what makes interdependence worth teaching — variances do not stay inside their own cost category.",
      },
      {
        step: "Assign responsibility to the decision",
        detail:
          "All three belong to purchasing, not to production or the workforce. Holding production accountable for the usage and efficiency variances measures them on someone else's decision.",
      },
      {
        step: "Net all three to judge the decision",
        detail:
          "The price saving must be compared with the usage AND efficiency losses. Netting only the material variances understates the cost of the substitution.",
      },
    ],
    answer:
      "**A — favourable price, adverse usage, and possibly adverse labour efficiency.**\n\nTrace the decision through the process. Cheaper material gives a **favourable price** variance. Lower quality wastes more, giving an **adverse usage** variance. And material that is harder to work takes longer, giving an **adverse labour efficiency** variance.\n\nThe chain extending **beyond materials** into a labour variance is what makes interdependence worth teaching: variances do not stay inside their own cost category, so a report read line by line will attribute the labour problem to the workforce.\n\nAll three belong to **purchasing**. Holding production or the workforce accountable for the usage and efficiency variances measures them on a decision they did not make — and a control system that does that reliably produces managers who stop co-operating with it.\n\nJudging the decision requires netting **all three**: the price saving against the usage **and** efficiency losses. Netting only the material variances understates the cost of the substitution, and can make a value-destroying purchase look successful.",
    earns: [
      "Following the chain into a labour variance, not just the material pair",
      "Netting all three variances to judge the purchasing decision",
    ],
    loses: ["Confining the analysis to material variances, which understates the cost"],
  },

  "PM-28::limits": {
    title: "Where standard costing stops working",
    format: "ot",
    marks: 2,
    requirement:
      "Standard costing is **least** useful in an environment characterised by:\n\nA  Repetitive production of a standard product\nB  Rapidly changing products, customised output and continuous improvement\nC  Stable input prices\nD  A labour-intensive process",
    plan: [
      {
        step: "Identify what standard costing requires",
        detail:
          "A repetitive process producing a comparable output, so a meaningful standard can be set and held for long enough to compare against. Stability is the precondition.",
      },
      {
        step: "Read the polarity and find the unstable environment",
        detail:
          "Least useful. Rapidly changing products and customised output mean no standard survives long enough to be a benchmark, and continuous improvement means the standard should be falling constantly.",
      },
      {
        step: "Name the specific conflicts",
        detail:
          "Continuous improvement makes a fixed standard a ceiling rather than a target. A short product life cycle means learning is still occurring. And customised output has no repeated unit to standardise.",
      },
      {
        step: "Note what is used instead",
        detail:
          "Target costing, life-cycle costing, throughput accounting, non-financial and quality measures, and a balanced scorecard — which is why Areas B and E exist alongside this one.",
      },
    ],
    answer:
      "**B — rapidly changing products, customised output and continuous improvement.**\n\nStandard costing requires a **repetitive** process producing a **comparable** output, so a meaningful standard can be set and held long enough to compare against. Stability is the precondition, which is why options A, C and D all describe environments where it works well.\n\nThe conflicts in an unstable environment are specific. **Continuous improvement** makes a fixed standard a **ceiling** rather than a target, since meeting it exactly is now the wrong ambition. A **short product life cycle** means learning is still occurring, so any standard is stale as soon as it is set. And **customised** output has no repeated unit to standardise at all.\n\nStandard costing also focuses attention on **cost** rather than on quality, delivery and customer satisfaction — and in a competitive market those may matter more.\n\nWhat replaces it is the rest of the paper: **target costing**, **life-cycle costing**, **throughput accounting**, non-financial and quality measures, and a **balanced scorecard**. Which is why Areas B and E exist alongside this one rather than as alternatives to it.",
    earns: [
      "Naming stability as the precondition and the specific conflicts with continuous improvement",
      "Connecting the limitation to the techniques in Areas B and E",
    ],
    loses: ["Choosing a stable environment, which is where standard costing works best"],
  },
}
