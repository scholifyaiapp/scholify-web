import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Areas E and F — Standard costing, and performance measurement.
 * Chapters 21–27 of the MA reading tree, mapped to E1–E3 and F1–F4.
 *
 * Area E is the most formula-dense part of the paper and the one candidates most
 * often learn by rote. The chapters here deliberately teach each variance from
 * the SAME underlying structure — compare like with like, then multiply by the
 * other factor — so that eight formulae become one idea applied eight times.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 21 · E1 ───────────────────────────────────────────── */

export const MA_TREE_21: StudyChapter = {
  id: "MA-21",
  number: 21,
  paper: "MA",
  area: "E",
  title: "Standard costing systems",
  minutes: 15,
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)", "E1(d)"],
  intro:
    "A standard cost is what a unit should cost. Setting it is what makes control by variance possible — and choosing the wrong kind of standard makes every variance that follows meaningless.",
  outcomes: [
    "Explain the purpose and principles of standard costing",
    "Describe how a standard cost card is built up",
    "Distinguish ideal, attainable, current and basic standards and explain the motivational effect of each",
    "Explain how standards are set and why they must be reviewed",
    "Explain the advantages and limitations of standard costing, including where it fits modern manufacturing",
  ],
  sections: [
    {
      id: "purpose",
      heading: "What a standard cost is for",
      blocks: [
        {
          kind: "definition",
          term: "Standard cost",
          md: "The **planned unit cost** of a product or service — a carefully estimated cost of the materials, labour and overhead a single unit **should** consume, at the prices and rates it **should** be charged. It is a benchmark, not a forecast of what will happen.",
        },
        {
          kind: "list",
          title: "What standard costing makes possible",
          items: [
            "**Control by exception** — differences from standard (variances) direct attention to where investigation is worthwhile.",
            "**Budget preparation** — a standard cost per unit multiplied by budgeted volume gives the cost budget directly.",
            "**Inventory valuation** — a consistent unit cost, without recalculating actual cost for every batch.",
            "**Performance measurement** — a yardstick against which managers can be assessed.",
            "**Decision-making** — a reliable unit cost for pricing and quotations.",
            "**Motivation** — a target to work toward, provided it is realistic.",
            "**Simplifying accounting** — issues and output can be recorded at standard, with differences taken to variance accounts.",
          ],
        },
        {
          kind: "table",
          caption: "A standard cost card",
          head: ["Element", "Standard quantity", "Standard price/rate", "Standard cost"],
          rows: [
            ["Direct materials", "4 kg", "$7.50 per kg", "$30.00"],
            ["Direct labour", "1.5 hours", "$16.00 per hour", "$24.00"],
            ["Variable overhead", "1.5 hours", "$6.00 per hour", "$9.00"],
            ["**Standard variable cost**", "", "", "**$63.00**"],
            ["Fixed overhead", "1.5 hours", "$10.00 per hour", "$15.00"],
            ["**Standard full production cost**", "", "", "**$78.00**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Every standard is TWO estimates",
          md: "A **quantity** (how much material or time a unit should take) and a **price** (what that material or time should cost). This is the structural reason every cost variance splits in two — a **price/rate** variance and a **usage/efficiency** variance — and why the person responsible differs between them: purchasing owns price, production owns usage.",
        },
      ],
    },
    {
      id: "types-of-standard",
      heading: "The four types of standard",
      blocks: [
        {
          kind: "table",
          caption: "The four types and their motivational effect",
          head: ["Type", "Assumes", "Motivational effect"],
          rows: [
            ["**Ideal**", "Perfect conditions — no waste, no idle time, no breakdowns, no learning", "**Demotivating**: it can never be met, so variances are always adverse and staff stop treating them as meaningful"],
            ["**Attainable**", "Efficient working, but allowing for **normal** levels of waste, idle time and breakdown", "**Most motivating**: demanding but achievable with real effort — the standard usually recommended"],
            ["**Current**", "Conditions as they actually are now, including any current inefficiency", "Realistic for forecasting, but provides **no incentive to improve**, since existing inefficiency is built in"],
            ["**Basic**", "Left unchanged over a long period, as a fixed historical benchmark", "Useful only for showing **long-run trends**; useless for current control because it becomes out of date"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The examinable judgement",
          md: "**An ATTAINABLE standard is normally recommended.** An ideal standard produces permanently adverse variances that managers learn to ignore; a current standard rewards the status quo; a basic standard drifts out of date. Note the corollary: with an attainable standard, a **small adverse variance is normal**, and only a significant one is worth investigating.",
        },
        {
          kind: "illustration",
          title: "Why an ideal standard stops working",
          md: "A factory sets its material standard on the assumption of zero wastage, because \"that is what we should be aiming at\". Normal, unavoidable wastage runs at 4%.\n\nEvery month thereafter shows an adverse usage variance of roughly 4%, in every department, regardless of how well anyone performed. Within two quarters, managers have learned that the variance says nothing about their work — so a month where wastage genuinely rose to 9% produces a bigger number that nobody investigates, because the report has been noise for six months.\n\nThe standard was not too ambitious. It was **uninformative**, which is worse: it destroyed the control system's ability to signal.",
        },
      ],
      check: {
        q: "Which type of standard is normally recommended for control purposes, and why?",
        options: [
          "Ideal, because it maximises the pressure to improve",
          "Attainable, because it is demanding but achievable, so variances remain meaningful",
          "Current, because it reflects conditions as they are",
          "Basic, because it allows long-run comparison",
        ],
        correct: 1,
        explain:
          "An ATTAINABLE standard assumes efficient working while allowing for normal waste and downtime, so it is demanding but achievable — which keeps variances informative. An IDEAL standard produces permanently adverse variances that managers learn to ignore, a CURRENT standard builds existing inefficiency in, and a BASIC standard becomes out of date.",
      },
    },
    {
      id: "setting-and-reviewing",
      heading: "Setting and reviewing standards",
      blocks: [
        {
          kind: "table",
          caption: "Where each standard comes from",
          head: ["Standard", "Set by reference to"],
          rows: [
            ["Material quantity", "Product specification, engineering estimates, trial runs, historic usage adjusted for normal loss"],
            ["Material price", "Supplier quotations and price lists, current contracts, expected price movements over the period"],
            ["Labour time", "Time and motion study, historic performance adjusted for expected efficiency, allowing for learning on new products"],
            ["Labour rate", "Wage agreements, expected pay awards, the mix of grades expected to do the work"],
            ["Variable overhead rate", "Analysis of overhead behaviour against activity (Chapter 7's high/low or regression)"],
            ["Fixed overhead rate", "Budgeted fixed overhead divided by budgeted activity (Chapter 12's absorption rate)"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An out-of-date standard produces a meaningless variance",
          md: "If a material price standard was set nine months ago and market prices have risen 7%, the resulting adverse price variance measures **inflation, not purchasing performance**. Standards must be **reviewed regularly** — and where a change is permanent, the standard should be revised rather than left to generate the same explained variance every month. This is Chapter 8's index numbers put to use.",
        },
        {
          kind: "table",
          caption: "Standard costing, weighed up",
          head: ["Advantages", "Limitations"],
          rows: [
            ["Enables control by exception, focusing attention where it pays", "Costly and time-consuming to set up and maintain"],
            ["Simplifies inventory valuation and bookkeeping", "**Suits stable, repetitive production** — much less useful for bespoke or rapidly changing output"],
            ["Provides a basis for budgeting and for pricing", "Can encourage dysfunctional behaviour: buying cheap poor-quality material to gain a favourable price variance"],
            ["Assigns responsibility, since price and usage have different owners", "Standards go out of date, and variances then measure the standard rather than performance"],
            ["Motivates, where the standard is attainable", "Emphasises cost at the expense of quality, delivery and customer satisfaction"],
            ["Makes the cost of inefficiency visible in money terms", "Sits awkwardly with continuous improvement, which targets a moving standard rather than a fixed one"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The tension with modern manufacturing worth naming",
          md: "Standard costing assumes a **stable, repeatable** process and a **fixed** benchmark. Total quality management and continuous improvement assume the opposite: that the target should keep moving. Standard costing also emphasises **cost**, which can conflict with quality and delivery — the classic case being a purchasing manager earning a favourable price variance by buying inferior material that then causes an adverse usage variance in production and a warranty cost later.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Describing a standard cost as a forecast of actual cost.",
      fix: "It is what a unit SHOULD cost under specified conditions — a benchmark for control, not a prediction.",
    },
    {
      trap: "Recommending an ideal standard because it is most demanding.",
      fix: "It is demotivating and uninformative: variances are permanently adverse, so managers stop reading them. An attainable standard is normally recommended.",
    },
    {
      trap: "Forgetting that every standard has a quantity AND a price element.",
      fix: "That is exactly why each cost variance splits into a price/rate and a usage/efficiency part, with different managers responsible.",
    },
    {
      trap: "Treating an adverse variance from an out-of-date standard as poor performance.",
      fix: "If the standard is stale, the variance measures the standard rather than the manager. Review and revise standards regularly.",
    },
    {
      trap: "Presenting standard costing as universally applicable.",
      fix: "It suits stable, repetitive production. It fits bespoke work and continuous-improvement environments poorly, and it can drive cost at the expense of quality.",
    },
  ],
  keyTerms: [
    { term: "Standard cost", def: "The planned unit cost of a product — what it should cost in materials, labour and overhead under specified conditions." },
    { term: "Standard cost card", def: "The statement building up a unit's standard cost from the standard quantity and standard price of each element." },
    { term: "Ideal standard", def: "A standard assuming perfect conditions, which is demotivating because it can never be achieved." },
    { term: "Attainable standard", def: "A standard assuming efficient working with normal allowances for waste and downtime; usually the recommended basis." },
    { term: "Current standard", def: "A standard reflecting conditions as they are, including existing inefficiency, so it gives no incentive to improve." },
    { term: "Basic standard", def: "A standard left unchanged over a long period, useful only for showing long-run trends." },
  ],
  summary: [
    "A standard cost is what a unit should cost — a benchmark, not a forecast.",
    "It enables control by exception, budgeting, inventory valuation, performance measurement, pricing and motivation.",
    "Every standard combines a quantity and a price, which is why each cost variance splits into two with different owners.",
    "The four types are ideal, attainable, current and basic; an attainable standard is normally recommended.",
    "An ideal standard produces permanently adverse variances that managers learn to ignore.",
    "Standards must be reviewed, or a variance measures the staleness of the standard rather than performance.",
    "Standard costing suits stable repetitive production, and sits awkwardly with continuous improvement and with quality objectives.",
  ],
  knowledgeDiagnostic: [
    { q: "What is a standard cost?", a: "The planned unit cost of a product — what the materials, labour and overhead for one unit SHOULD cost under specified conditions. It is a control benchmark rather than a forecast." },
    { q: "Why does every cost variance split into two parts?", a: "Because every standard combines a QUANTITY and a PRICE. The price/rate element and the usage/efficiency element have different causes and different managers responsible." },
    { q: "Name the four types of standard and their motivational effect.", a: "Ideal (perfect conditions — demotivating), attainable (efficient with normal allowances — most motivating), current (as things are — no incentive to improve) and basic (unchanged long term — becomes out of date)." },
    { q: "What happens if a standard is not kept up to date?", a: "The variance measures the staleness of the standard rather than performance — an adverse price variance may simply reflect inflation since the standard was set." },
    { q: "Where does standard costing fit poorly?", a: "In bespoke or rapidly changing production, and in continuous-improvement environments where the target should keep moving. It also emphasises cost, which can conflict with quality and delivery." },
  ],
  furtherStudy: [
    "Chapter 22 calculates the variances this chapter's standards make possible.",
    "Advanced variance analysis, including planning and operational variances, is examined in **PM**.",
  ],
}

/* ── Chapter 22 · E2 ───────────────────────────────────────────── */

export const MA_TREE_22: StudyChapter = {
  id: "MA-22",
  number: 22,
  paper: "MA",
  area: "E",
  title: "Variance calculation and analysis",
  minutes: 20,
  syllabusRefs: ["E2(a)", "E2(b)", "E2(c)", "E2(d)", "E2(e)"],
  intro:
    "Eight formulae that most candidates memorise separately are really one idea used eight times: hold one factor constant, compare the other, and multiply. Learn the structure and the formulae stop needing to be remembered.",
  outcomes: [
    "Calculate material price and usage variances",
    "Calculate labour rate, efficiency and idle time variances",
    "Calculate variable overhead expenditure and efficiency variances",
    "Calculate fixed overhead expenditure and volume variances, and split volume into capacity and efficiency",
    "Calculate sales price and sales volume variances",
    "Identify the likely causes of each variance and who is responsible",
    "Explain the interdependence of variances",
  ],
  sections: [
    {
      id: "the-structure",
      heading: "The one structure behind every variance",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The idea to learn instead of the formulae",
          md: "Every cost variance answers one of two questions.\n\n**A PRICE question:** did we pay the right amount per unit of input? → hold the **quantity actually used** constant, compare **actual price with standard price**, multiply by that actual quantity.\n\n**A QUANTITY question:** did we use the right amount of input for what we produced? → hold the **standard price** constant, compare **actual quantity with the standard quantity for actual output**, multiply by the standard price.\n\nNote the crucial phrase: **standard quantity for ACTUAL OUTPUT**. That is the flexed budget from Chapter 18 doing its work — every variance compares against what output actually was, never against the original budget.",
        },
        {
          kind: "formula",
          name: "Material variances",
          expr: "Price     =  Actual quantity purchased  ×  ( Standard price  −  Actual price )\n\nUsage     =  Standard price  ×  ( Standard quantity for actual output  −  Actual quantity used )",
          note: "A positive result under this arrangement is FAVOURABLE. Standard quantity for actual output = units produced × standard quantity per unit.",
        },
        {
          kind: "example",
          title: "Worked example — material price and usage",
          scenario:
            "The standard is 4 kg per unit at $7.50 per kg. Actual production was 5,200 units. 21,500 kg were purchased and used, at a total cost of $158,000. Calculate the price and usage variances.",
          steps: [
            { label: "Actual price per kg", detail: "$158,000 ÷ 21,500 kg = $7.3488 per kg." },
            { label: "Price variance", detail: "21,500 × ($7.50 − $7.3488) = 21,500 × $0.1512 = $3,250 FAVOURABLE. Easier route: standard cost of actual quantity (21,500 × $7.50 = $161,250) less actual cost $158,000 = $3,250 F." },
            { label: "Standard quantity for actual output", detail: "5,200 units × 4 kg = 20,800 kg." },
            { label: "Usage variance", detail: "$7.50 × (20,800 − 21,500) = $7.50 × (−700) = $5,250 ADVERSE. 700 kg more was used than the output warranted." },
            { label: "Total material variance", detail: "$3,250 F − $5,250 A = $2,000 ADVERSE." },
            { label: "Cross-check", detail: "Standard cost of actual output = 5,200 × 4 × $7.50 = $156,000. Actual cost $158,000. Total variance $2,000 adverse. Agrees." },
          ],
          result:
            "Price $3,250 favourable; usage $5,250 adverse; total $2,000 adverse. The cross-check — **standard cost of actual output against actual cost must equal the sum of the two variances** — catches almost every error, and it takes seconds.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Price on QUANTITY PURCHASED, usage on QUANTITY USED",
          md: "Where purchases and usage differ because inventory changed, the **price** variance is calculated on the quantity **purchased** (that is when the price was paid) and the **usage** variance on the quantity **used**. Where a question gives one figure for both, the distinction does not bite — but when it gives two, using the wrong one is a deliberate trap.",
        },
      ],
      check: {
        q: "Standard material cost is 3 kg at $5 per kg. Actual output was 2,000 units using 6,300 kg costing $30,870. What is the material usage variance?",
        options: ["$1,500 adverse", "$1,500 favourable", "$630 adverse", "$870 adverse"],
        correct: 0,
        explain:
          "Standard quantity for actual output = 2,000 × 3 = 6,000 kg. Actual used 6,300 kg, so 300 kg too much. Usage variance = 300 × $5 (STANDARD price) = $1,500 ADVERSE. Note the usage variance is always valued at the STANDARD price — using the actual price of $4.90 would give $1,470 and mix the price effect into the usage variance.",
      },
    },
    {
      id: "labour-variances",
      heading: "Labour variances",
      blocks: [
        {
          kind: "formula",
          name: "Labour variances",
          expr: "Rate         =  Actual hours PAID  ×  ( Standard rate  −  Actual rate )\n\nIdle time    =  Idle hours  ×  Standard rate      (always ADVERSE)\n\nEfficiency   =  Standard rate  ×  ( Standard hours for actual output  −  Actual hours WORKED )",
          note: "Where idle time exists, the rate variance uses hours PAID and the efficiency variance uses hours WORKED — the difference between them being the idle hours, which are isolated in their own variance.",
        },
        {
          kind: "example",
          title: "Worked example — labour with idle time",
          scenario:
            "The standard is 1.5 hours per unit at $16 per hour. Actual output was 5,200 units. 8,100 hours were paid for at a total cost of $132,030, of which 240 hours were idle time.",
          steps: [
            { label: "Actual rate per hour", detail: "$132,030 ÷ 8,100 = $16.30 per hour." },
            { label: "Rate variance — on hours PAID", detail: "8,100 × ($16.00 − $16.30) = 8,100 × (−$0.30) = $2,430 ADVERSE." },
            { label: "Idle time variance", detail: "240 idle hours × $16.00 = $3,840 ADVERSE. Idle time is always adverse — paid hours produced nothing." },
            { label: "Hours actually worked", detail: "8,100 paid − 240 idle = 7,860 hours worked." },
            { label: "Standard hours for actual output", detail: "5,200 units × 1.5 hours = 7,800 hours." },
            { label: "Efficiency variance — on hours WORKED", detail: "$16.00 × (7,800 − 7,860) = $16.00 × (−60) = $960 ADVERSE." },
            { label: "Cross-check", detail: "Standard cost of actual output = 5,200 × 1.5 × $16 = $124,800. Actual cost $132,030. Total variance $7,230 adverse. Sum of variances: $2,430 + $3,840 + $960 = $7,230 adverse. Agrees." },
          ],
          result:
            "Rate $2,430 A; idle time $3,840 A; efficiency $960 A; total $7,230 A. Two points carry the marks: the rate variance uses hours **paid** while efficiency uses hours **worked**, and **idle time is always adverse**. Note that had idle time not been separated, the efficiency variance would have absorbed it and reported $4,800 adverse — concealing that most of the problem was downtime rather than working pace.",
        },
      ],
    },
    {
      id: "overhead-variances",
      heading: "Overhead variances",
      blocks: [
        {
          kind: "formula",
          name: "Variable overhead variances",
          expr: "Expenditure  =  Actual hours worked  ×  Standard VOAR  −  Actual variable overhead\n\nEfficiency   =  Standard VOAR  ×  ( Standard hours for actual output  −  Actual hours worked )",
          note: "VOAR = variable overhead absorption rate per hour. The efficiency variance mirrors the labour efficiency variance exactly, because variable overhead is absorbed on the same hours.",
        },
        {
          kind: "formula",
          name: "Fixed overhead variances",
          expr: "Expenditure  =  Budgeted fixed overhead  −  Actual fixed overhead\n\nVolume       =  Standard FOAR  ×  ( Standard hours for actual output  −  Budgeted hours )\n\n  of which  Capacity    =  Standard FOAR  ×  ( Actual hours worked  −  Budgeted hours )\n            Efficiency  =  Standard FOAR  ×  ( Standard hours for actual output  −  Actual hours worked )",
          note: "The fixed overhead EXPENDITURE variance compares BUDGETED with ACTUAL — it is not flexed, because fixed overhead does not flex. The VOLUME variance is the under/over absorption caused by activity, and it splits into capacity and efficiency.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Fixed overhead is the exception",
          md: "Every other variance compares actual against a **flexed** standard. The fixed overhead **expenditure** variance compares actual against the **original budget**, because fixed overhead is not expected to change with activity. And the **volume** variance is simply Chapter 12's under- or over-absorption arising from activity, now given a name — which is why the total of the two fixed overhead variances equals the total under- or over-absorption for the period.",
        },
        {
          kind: "example",
          title: "Worked example — fixed overhead expenditure and volume",
          scenario:
            "Budgeted fixed overhead was $120,000 for a budgeted 8,000 labour hours, so the standard rate is $15 per hour and the standard is 1.5 hours per unit. Actual fixed overhead was $126,000. Actual output was 5,200 units, produced in 7,860 hours worked.",
          steps: [
            { label: "Expenditure variance", detail: "Budgeted $120,000 − actual $126,000 = $6,000 ADVERSE. Not flexed — fixed overhead was expected to be $120,000 whatever the output." },
            { label: "Standard hours for actual output", detail: "5,200 × 1.5 = 7,800 hours." },
            { label: "Volume variance", detail: "$15 × (7,800 − 8,000 budgeted hours) = $15 × (−200) = $3,000 ADVERSE. Output measured in standard hours fell short of budget, so overhead was under-absorbed." },
            { label: "Split volume — capacity", detail: "$15 × (7,860 actual hours worked − 8,000 budgeted) = $15 × (−140) = $2,100 ADVERSE. Fewer hours were worked than budgeted." },
            { label: "Split volume — efficiency", detail: "$15 × (7,800 standard hours − 7,860 actual hours) = $15 × (−60) = $900 ADVERSE. The hours worked produced slightly less than they should have." },
            { label: "Check the split and the total", detail: "Capacity $2,100 A + efficiency $900 A = volume $3,000 A. Total fixed overhead variance = $6,000 + $3,000 = $9,000 adverse — which equals the period's total under-absorption." },
          ],
          result:
            "Expenditure $6,000 A; volume $3,000 A (capacity $2,100 A, efficiency $900 A); total $9,000 A. The interpretation is what a strong answer adds: overhead was under-absorbed for **two independent reasons** — the company **spent** $6,000 more than budgeted, and it **operated below planned activity**, working 140 fewer hours and getting slightly less from those it did work.",
        },
      ],
      check: {
        q: "Budgeted fixed overhead is $90,000 and actual fixed overhead is $94,000. What is the fixed overhead expenditure variance?",
        options: [
          "$4,000 adverse",
          "$4,000 favourable",
          "It depends on the activity level achieved",
          "Nil, because fixed overhead does not vary",
        ],
        correct: 0,
        explain:
          "The fixed overhead EXPENDITURE variance is simply budgeted less actual: $90,000 − $94,000 = $4,000 ADVERSE. It is the one variance NOT flexed to actual activity, because fixed overhead is not expected to change with output — which is why the activity level is irrelevant to this particular variance, though it drives the separate VOLUME variance.",
      },
    },
    {
      id: "sales-variances",
      heading: "Sales variances",
      blocks: [
        {
          kind: "formula",
          name: "Sales variances",
          expr: "Price   =  Actual units sold  ×  ( Actual selling price  −  Standard selling price )\n\nVolume  =  ( Actual units sold  −  Budgeted units sold )  ×  Standard PROFIT or CONTRIBUTION per unit",
          note: "The volume variance is valued at standard MARGIN, not at selling price — because selling one more unit gains its margin, not its whole revenue. Use standard PROFIT per unit under absorption costing and standard CONTRIBUTION per unit under marginal costing.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The most common sales variance error",
          md: "**Value the sales volume variance at the standard margin, never at the selling price.** Selling 500 extra units at a $12 standard contribution gains $6,000, not $500 × the selling price — the extra units also brought extra variable cost with them. And note the direction reverses from cost variances: selling **more** than budget is **favourable**.",
        },
        {
          kind: "example",
          title: "Worked example — sales price and volume",
          scenario:
            "Budgeted sales were 5,000 units at $95 each. Standard full cost is $78, so standard profit is $17 per unit. Actual sales were 5,200 units at an average price of $93.",
          steps: [
            { label: "Sales price variance", detail: "5,200 × ($93 − $95) = 5,200 × (−$2) = $10,400 ADVERSE. Every unit sold was $2 below standard price." },
            { label: "Sales volume variance", detail: "(5,200 − 5,000) × $17 standard profit = 200 × $17 = $3,400 FAVOURABLE." },
            { label: "Net effect", detail: "$10,400 A − $3,400 F = $7,000 adverse overall on the sales side." },
            { label: "Interpret the pair together", detail: "The company cut its price by about 2% and gained 4% more volume. On these figures the trade was NOT worthwhile — the price reduction cost more than the extra volume earned." },
          ],
          result:
            "Price $10,400 adverse; volume $3,400 favourable; net $7,000 adverse. Note the analytical point: the two variances are **connected**, because the price cut is the likely cause of the volume gain. Reporting them without linking them would miss the actual finding — that the discount did not pay for itself.",
        },
      ],
    },
    {
      id: "causes-and-interdependence",
      heading: "Causes, responsibility and interdependence",
      blocks: [
        {
          kind: "table",
          caption: "Likely causes and who is normally responsible",
          head: ["Variance", "Possible causes", "Normally responsible"],
          rows: [
            ["Material price", "Supplier price change, different supplier, bulk discount taken or lost, different quality bought, exchange rate movement, out-of-date standard", "Purchasing"],
            ["Material usage", "Wastage, poor-quality material, machine problems, untrained staff, theft, incorrect standard", "Production"],
            ["Labour rate", "Pay award, different grade of staff used, unplanned overtime, out-of-date standard", "HR / production management"],
            ["Labour efficiency", "Staff experience and motivation, machine reliability, material quality, learning on a new product", "Production"],
            ["Idle time", "Machine breakdown, material shortage, power failure, lack of orders", "Production / purchasing / management"],
            ["Fixed overhead expenditure", "Cost increases, unplanned spending, out-of-date budget", "The budget holder for each cost"],
            ["Fixed overhead volume", "Output above or below budget, capacity problems, demand shortfall", "Production and sales jointly"],
            ["Sales price", "Discounting, competitive pressure, change in mix, price rise achieved", "Sales"],
            ["Sales volume", "Demand, marketing effectiveness, competitor action, availability of product", "Sales (and production, if supply constrained)"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Variances are interdependent — this is where the marks are",
          md: "One decision commonly causes several variances, with opposite signs:\n\n**Buying cheaper, lower-grade material** → favourable material price, but adverse material usage (more wastage) and adverse labour efficiency (harder to work).\n\n**Using a more senior grade of labour** → adverse labour rate, but favourable labour efficiency and possibly favourable material usage.\n\n**Cutting the selling price** → adverse sales price, favourable sales volume.\n\n**Running overtime to meet demand** → adverse labour rate, favourable sales volume, favourable fixed overhead volume.\n\nInvestigating any one of these in isolation gives the wrong answer. **Always look for the offsetting variance**, and name the decision that produced both.",
        },
        {
          kind: "activity",
          title: "Activity 1 — interpret a set of variances",
          prompt:
            "A month's variances are: material price $8,400 FAVOURABLE; material usage $11,200 ADVERSE; labour rate $600 adverse; labour efficiency $7,300 ADVERSE; idle time $2,900 adverse.\n\nThe purchasing manager is claiming a bonus for the favourable price variance. Advise.",
          answer:
            "**Do not pay the bonus on this evidence, and investigate the material substitution.**\n\n**The pattern is diagnostic.** A large favourable material price variance sitting alongside a large adverse usage variance and a large adverse labour efficiency variance is the classic signature of **buying cheaper, lower-grade material**. The likely chain is: inferior material wastes more in production (adverse usage $11,200), is harder and slower to work (adverse efficiency $7,300), and may cause stoppages (adverse idle time $2,900).\n\n**The arithmetic settles it.** The $8,400 saved on price is set against $21,400 of adverse usage, efficiency and idle time. Even if only part of that is attributable to material quality, the decision has cost the company money. Rewarding the price variance in isolation would pay a bonus for a decision that reduced profit.\n\n**What I would do.** Establish whether the material specification or supplier changed in the month — the purchasing records will show it in minutes. If it did, report the variances **together** as the consequence of one decision, and assess purchasing on the **net** effect rather than on the price variance alone. If the specification did NOT change, then the price gain is genuine (a market fall or a negotiated discount) and the usage and efficiency problems have a separate cause in production — which is a different investigation and a different conversation.\n\n**The wider point.** A bonus scheme paying on a single variance creates exactly this incentive: it rewards a manager for optimising their own measure at another department's expense. That is Chapter 25's territory, and it is the underlying fault here rather than the purchasing manager's judgement.",
        },
      ],
      check: {
        q: "A favourable material price variance appears alongside adverse material usage and adverse labour efficiency variances. What is the most likely single explanation?",
        options: [
          "Production staff were poorly trained",
          "Cheaper, lower-quality material was purchased",
          "The selling price was reduced",
          "Fixed overheads were overspent",
        ],
        correct: 1,
        explain:
          "Buying CHEAPER, LOWER-QUALITY material produces exactly this pattern: a favourable price variance, then adverse usage as more is wasted and adverse labour efficiency as it is harder to work. This is why variances are interdependent and must be interpreted together — investigating the favourable price variance alone would reward a decision that cost the company money overall.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Valuing the material usage variance at the actual price.",
      fix: "Usage is always valued at the STANDARD price, or the price effect contaminates the usage variance.",
    },
    {
      trap: "Comparing actual usage with the ORIGINAL budgeted quantity.",
      fix: "Compare with the standard quantity for ACTUAL OUTPUT — the flexed standard. Every variance except fixed overhead expenditure works this way.",
    },
    {
      trap: "Using hours worked for the labour rate variance.",
      fix: "The rate variance uses hours PAID; the efficiency variance uses hours WORKED. The difference is the idle time, isolated in its own variance.",
    },
    {
      trap: "Flexing the fixed overhead expenditure variance.",
      fix: "It compares BUDGETED with ACTUAL, because fixed overhead is not expected to change with activity.",
    },
    {
      trap: "Valuing the sales volume variance at selling price.",
      fix: "Value it at standard PROFIT (absorption) or standard CONTRIBUTION (marginal) per unit — extra units bring extra variable cost too.",
    },
    {
      trap: "Reporting an idle time variance as favourable.",
      fix: "Idle time is always adverse — hours were paid for and produced nothing.",
    },
    {
      trap: "Investigating a variance in isolation.",
      fix: "Look for the offsetting variance and name the decision that caused both. A favourable price beside adverse usage usually means cheaper, poorer material.",
    },
  ],
  keyTerms: [
    { term: "Material price variance", def: "Actual quantity purchased × (standard price − actual price)." },
    { term: "Material usage variance", def: "Standard price × (standard quantity for actual output − actual quantity used)." },
    { term: "Labour rate variance", def: "Actual hours PAID × (standard rate − actual rate)." },
    { term: "Idle time variance", def: "Idle hours × standard rate; always adverse, since paid hours produced nothing." },
    { term: "Labour efficiency variance", def: "Standard rate × (standard hours for actual output − actual hours WORKED)." },
    { term: "Fixed overhead expenditure variance", def: "Budgeted fixed overhead less actual fixed overhead; the one variance not flexed to actual activity." },
    { term: "Fixed overhead volume variance", def: "The under- or over-absorption arising from activity differing from budget, splitting into capacity and efficiency." },
    { term: "Sales price variance", def: "Actual units sold × (actual selling price − standard selling price)." },
    { term: "Sales volume variance", def: "(Actual units − budgeted units) × standard profit or contribution per unit." },
    { term: "Interdependence of variances", def: "The effect whereby one decision causes several variances with opposite signs, so they must be interpreted together." },
  ],
  summary: [
    "Every variance holds one factor constant and compares the other — a price question or a quantity question.",
    "All comparisons are against the standard for ACTUAL OUTPUT, which is the flexed budget applied.",
    "Material usage is valued at standard price; price on quantity purchased, usage on quantity used.",
    "Labour rate uses hours paid, efficiency uses hours worked, and the difference is idle time, always adverse.",
    "Fixed overhead expenditure is the one unflexed variance — budgeted against actual.",
    "Fixed overhead volume is the under/over absorption caused by activity, splitting into capacity and efficiency.",
    "Sales volume variance is valued at standard margin, never at selling price.",
    "Variances are interdependent: always look for the offsetting variance and name the decision that caused both.",
    "The cross-check — standard cost of actual output against actual cost — must equal the sum of the variances.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the single structure behind every cost variance?", a: "Hold one factor constant and compare the other. A price variance holds actual quantity and compares prices; a quantity variance holds standard price and compares actual quantity with the standard quantity for ACTUAL OUTPUT." },
    { q: "At what price is the material usage variance valued, and why?", a: "The STANDARD price. Using the actual price would let the price effect contaminate the usage variance, so the two would no longer separate cleanly." },
    { q: "Which hours are used for the labour rate and efficiency variances?", a: "Rate uses hours PAID; efficiency uses hours WORKED. The difference between them is idle time, isolated in its own always-adverse variance." },
    { q: "Why is the fixed overhead expenditure variance not flexed?", a: "Because fixed overhead is not expected to change with activity, so the correct comparison is budgeted against actual. The activity effect is captured separately in the volume variance." },
    { q: "What does a favourable material price variance alongside adverse usage and labour efficiency variances usually indicate?", a: "That cheaper, lower-quality material was bought: it wastes more in production and is harder to work. The variances must be interpreted together, and the net effect assessed rather than the price gain alone." },
  ],
  furtherStudy: [
    "Mix and yield variances, planning and operational variances, and variance investigation are developed in **PM**.",
    "Chapter 23 assembles these variances into a reconciliation of budgeted to actual profit.",
  ],
}

/* ── Chapter 23 · E3 ───────────────────────────────────────────── */

export const MA_TREE_23: StudyChapter = {
  id: "MA-23",
  number: 23,
  paper: "MA",
  area: "E",
  title: "Reconciling budgeted and actual profit",
  minutes: 16,
  syllabusRefs: ["E3(a)", "E3(b)", "E3(c)"],
  intro:
    "Individually the variances explain pieces. Assembled into an operating statement they explain the whole gap between the profit that was planned and the profit that was earned — which is the report a board actually wants.",
  outcomes: [
    "Prepare an operating statement reconciling budgeted to actual profit under absorption costing",
    "Prepare an operating statement under marginal costing",
    "Explain why the two statements differ",
    "Interpret an operating statement and identify what management should investigate",
  ],
  sections: [
    {
      id: "absorption-statement",
      heading: "The operating statement under absorption costing",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The structure",
          md: "Start with **budgeted profit**. Add the **sales volume variance** (at standard profit) to reach the **standard profit on actual sales**. Then add the **sales price variance** and every **cost variance**, favourable adding and adverse deducting, to arrive at **actual profit**.",
        },
        {
          kind: "example",
          title: "Worked example — absorption costing operating statement",
          scenario:
            "Budgeted profit was $85,000. Variances for the month: sales volume $3,400 F; sales price $10,400 A; material price $3,250 F; material usage $5,250 A; labour rate $2,430 A; labour idle time $3,840 A; labour efficiency $960 A; fixed overhead expenditure $6,000 A; fixed overhead volume $3,000 A. Prepare the operating statement.",
          steps: [
            { label: "Budgeted profit", detail: "$85,000." },
            { label: "Add the sales volume variance", detail: "+$3,400 F, giving standard profit on actual sales of $88,400. This step restates the budget for the volume actually sold — the flexing step." },
            { label: "Add the sales price variance", detail: "−$10,400 A, giving $78,000." },
            { label: "Add the material variances", detail: "+$3,250 F − $5,250 A = −$2,000, giving $76,000." },
            { label: "Add the labour variances", detail: "−$2,430 − $3,840 − $960 = −$7,230, giving $68,770." },
            { label: "Add the fixed overhead variances", detail: "−$6,000 − $3,000 = −$9,000, giving actual profit of $59,770." },
          ],
          result:
            "Actual profit **$59,770**, against a budget of $85,000 — a shortfall of $25,230. The statement shows where it went: the price reduction cost $10,400, labour problems $7,230 (mostly idle time), fixed overhead $9,000, materials $2,000 net, partly offset by $3,400 of extra volume. That is a board-level answer; a list of nine variances is not.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Direction of the adjustment",
          md: "**Favourable variances ADD to profit; adverse variances DEDUCT.** This holds for every variance in the statement, cost and sales alike, because the label already encodes the profit effect. If your statement does not arrive at the actual profit given in the question, check the signs before checking the arithmetic — a reversed sign is far more common than a mis-addition.",
        },
      ],
      check: {
        q: "In an operating statement, budgeted profit is $60,000 and the only variances are sales volume $5,000 favourable and material usage $8,000 adverse. What is the actual profit?",
        options: ["$57,000", "$63,000", "$73,000", "$47,000"],
        correct: 0,
        explain:
          "$60,000 + $5,000 favourable − $8,000 adverse = $57,000. Favourable variances ADD to profit and adverse variances DEDUCT, because the label already encodes the profit effect. If a reconciliation does not arrive at the stated actual profit, check the signs first — a reversed sign is more common than an arithmetic error.",
      },
    },
    {
      id: "marginal-statement",
      heading: "The operating statement under marginal costing",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The two differences from the absorption statement",
          md: "**1. The sales volume variance is valued at standard CONTRIBUTION**, not standard profit — because under marginal costing an extra unit sold gains its contribution, and fixed overhead is unaffected by volume.\n\n**2. There is NO fixed overhead volume variance.** Fixed overhead is not absorbed at all under marginal costing, so activity cannot cause under- or over-absorption. Only the **expenditure** variance exists.\n\nThe statement therefore runs: budgeted contribution → volume and price variances → variable cost variances → actual contribution, then deduct actual fixed overhead to reach actual profit.",
        },
        {
          kind: "example",
          title: "Worked example — the same month under marginal costing",
          scenario:
            "Using the same data, standard contribution is $32 per unit (rather than $17 standard profit) and budgeted fixed overhead was $120,000 against actual of $126,000. Budgeted sales were 5,000 units and actual 5,200. Budgeted contribution was therefore $160,000. Prepare the marginal costing statement.",
          steps: [
            { label: "Budgeted contribution", detail: "5,000 units × $32 = $160,000." },
            { label: "Sales volume variance at CONTRIBUTION", detail: "200 extra units × $32 = $6,400 F — note this is larger than the $3,400 under absorption costing, because contribution per unit exceeds profit per unit by the fixed overhead of $15." },
            { label: "Sales price variance", detail: "−$10,400 A, unchanged: the price variance does not depend on the costing method." },
            { label: "Variable cost variances", detail: "Materials −$2,000 net; labour −$7,230. Total −$9,230, giving actual contribution of $146,770." },
            { label: "Deduct ACTUAL fixed overhead", detail: "$146,770 − $126,000 = actual profit $20,770." },
            { label: "Reconcile with the absorption figure", detail: "Absorption profit was $59,770 and marginal $20,770 — a $39,000 difference. Under absorption, closing inventory rose and carried fixed overhead forward; here, output of 5,200 units against sales of 5,200 with the budgeted absorption difference accounts for it, and the fixed overhead volume variance disappears because nothing is absorbed." },
          ],
          result:
            "Actual profit under marginal costing $20,770. The structural differences are what carry the marks: **volume valued at contribution** and **no fixed overhead volume variance**, with actual fixed overhead deducted in full at the foot of the statement.",
        },
      ],
    },
    {
      id: "interpretation",
      heading: "Interpreting the statement",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "How to read an operating statement",
          items: [
            "**Start with the total gap** — how far actual profit fell short of, or exceeded, budget, in money and in percentage terms.",
            "**Rank the variances by size**, not by the order they appear. Attention belongs on the largest, and on trends across months.",
            "**Look for offsetting pairs** — a favourable variance beside an adverse one usually means one decision caused both, so they must be read together (Chapter 22).",
            "**Separate volume effects from performance effects.** The sales volume variance is a demand and selling story; the cost variances are an operational one.",
            "**Ask whether each variance is controllable** by the manager receiving the report (Chapter 18).",
            "**Question the standard** — a persistent same-signed variance every month usually means the standard is wrong, not that performance is consistently poor.",
            "**Recommend actions**, and say what further information is needed where the cause cannot be identified from the statement alone.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The most valuable observation in an interpretation answer",
          md: "**A variance that recurs with the same sign every month is evidence about the STANDARD, not about the manager.** Twelve consecutive adverse material price variances means the standard price is out of date. Recommending an investigation of purchasing performance in month twelve, when the same variance has appeared eleven times, is the wrong recommendation — the standard should have been revised in month three.",
        },
        {
          kind: "activity",
          title: "Activity 1 — interpret and advise",
          prompt:
            "A monthly operating statement shows budgeted profit $200,000 and actual profit $158,000. The variances are: sales volume $18,000 F; sales price $46,000 A; material price $9,000 F; material usage $14,000 A; labour rate $3,000 A; labour efficiency $2,000 F; fixed overhead expenditure $4,000 A.\n\nThis is the fourth consecutive month in which the sales price variance has been adverse and the sales volume variance favourable.\n\nInterpret the statement and advise management.",
          answer:
            "**The gap.** Actual profit is $42,000 below budget, a shortfall of 21%.\n\n**The dominant item is the sales price variance at $46,000 adverse** — larger than every other variance combined. Everything else is secondary and should be reported as such.\n\n**The key finding is the pattern, not the month.** For four consecutive months the price variance has been adverse and the volume variance favourable. That is not a series of coincidences: it is a **sustained discounting strategy**, deliberate or drifting, in which price is being traded for volume. And the trade is **losing money** — $46,000 given away to gain $18,000, a net loss of $28,000 this month and, on this pattern, something similar in each of the previous three.\n\n**Management should therefore decide whether the discounting is intentional.** If it is a deliberate strategy to win share, its cost should be recognised and measured against the share actually gained; if it is sales staff discounting to close deals, discount authority needs tightening.\n\n**The second finding: material.** A $9,000 favourable price variance beside a $14,000 adverse usage variance is the substitution pattern from Chapter 22 — cheaper material wasting more. Net $5,000 adverse, so worth investigating whether the specification changed. Note that labour efficiency is favourable, which argues **against** poor-quality material being hard to work, so this may instead be a genuine wastage or process problem in production.\n\n**Minor items.** Labour rate $3,000 A and overhead expenditure $4,000 A are individually small; report them but do not investigate at this size unless they too are trending.\n\n**A question about the standard.** Four months of the same-signed price variance also raises whether the **standard selling price** still reflects the market. If competitive conditions have permanently changed, the budget is measuring the company against a price it can no longer achieve, and the standard should be revised so that future variances measure performance rather than an out-of-date assumption.",
        },
      ],
      check: {
        q: "The same adverse material price variance has appeared every month for a year. What is the most likely conclusion?",
        options: [
          "The purchasing manager has performed poorly for twelve consecutive months",
          "The standard price is out of date and should be revised",
          "The material usage variance must be favourable",
          "The variance should be ignored because it is consistent",
        ],
        correct: 1,
        explain:
          "A variance recurring with the same sign every month is evidence about the STANDARD rather than about performance — the standard price no longer reflects what the material actually costs. It should have been revised long before month twelve. Ignoring it is also wrong: while the standard is stale, every material variance the system produces is uninformative.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deducting favourable variances or adding adverse ones.",
      fix: "Favourable adds to profit, adverse deducts. If the statement does not reach the given actual profit, check signs before arithmetic.",
    },
    {
      trap: "Valuing the sales volume variance at standard profit in a MARGINAL costing statement.",
      fix: "Under marginal costing it is valued at standard CONTRIBUTION, because fixed overhead does not change with volume.",
    },
    {
      trap: "Including a fixed overhead volume variance in a marginal costing statement.",
      fix: "There is none — fixed overhead is not absorbed, so activity cannot cause under- or over-absorption. Only the expenditure variance exists.",
    },
    {
      trap: "Deducting budgeted rather than actual fixed overhead in a marginal statement.",
      fix: "Actual fixed overhead is deducted in full from actual contribution.",
    },
    {
      trap: "Listing variances without ranking or linking them.",
      fix: "Rank by size, identify offsetting pairs caused by one decision, and separate volume from performance effects.",
    },
    {
      trap: "Recommending an investigation of a variance that has recurred all year.",
      fix: "A persistently same-signed variance is evidence the STANDARD is wrong. Recommend revising it.",
    },
  ],
  keyTerms: [
    { term: "Operating statement", def: "A statement reconciling budgeted profit to actual profit through the sales and cost variances." },
    { term: "Standard profit on actual sales", def: "Budgeted profit adjusted by the sales volume variance — the budget restated for the volume actually sold." },
    { term: "Actual contribution", def: "In a marginal costing statement, budgeted contribution adjusted for sales and variable cost variances." },
  ],
  summary: [
    "An operating statement runs from budgeted profit through the variances to actual profit.",
    "Favourable variances add and adverse variances deduct, because the label already encodes the profit effect.",
    "Adding the sales volume variance gives standard profit on actual sales — the flexing step.",
    "Under marginal costing, volume is valued at contribution and there is no fixed overhead volume variance.",
    "A marginal statement deducts ACTUAL fixed overhead in full from actual contribution.",
    "Interpretation means ranking by size, finding offsetting pairs, separating volume from performance, and testing controllability.",
    "A variance recurring with the same sign every month is evidence the standard is out of date, not that performance is consistently poor.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the structure of an absorption costing operating statement?", a: "Budgeted profit, plus the sales volume variance to give standard profit on actual sales, then the sales price variance and all cost variances — favourable adding, adverse deducting — to reach actual profit." },
    { q: "How does a marginal costing operating statement differ?", a: "The sales volume variance is valued at standard CONTRIBUTION rather than profit, there is no fixed overhead volume variance, and actual fixed overhead is deducted in full from actual contribution." },
    { q: "Why is there no fixed overhead volume variance under marginal costing?", a: "Because fixed overhead is not absorbed into units at all, so a difference between actual and budgeted activity cannot cause under- or over-absorption." },
    { q: "How should an operating statement be interpreted?", a: "State the total gap, rank variances by size, look for offsetting pairs caused by one decision, separate volume effects from performance, test controllability, question the standard, and recommend action." },
    { q: "What does a persistently same-signed variance tell you?", a: "That the standard is wrong rather than that performance is consistently poor. It should be revised, because while it is stale every variance it produces is uninformative." },
  ],
  furtherStudy: [
    "Variance investigation and the behavioural consequences of variance reporting are developed in **PM**.",
    "Chapters 24 to 27 extend performance measurement beyond cost variances.",
  ],
}

/* ── Chapter 24 · F1 ───────────────────────────────────────────── */

export const MA_TREE_24: StudyChapter = {
  id: "MA-24",
  number: 24,
  paper: "MA",
  area: "F",
  title: "Performance measurement: concepts and framework",
  minutes: 15,
  syllabusRefs: ["F1(a)", "F1(b)", "F1(c)", "F1(d)"],
  intro:
    "Variances measure cost against a standard. Performance measurement is wider: what should be measured at all, in a business where the things that matter most are often the hardest to put a number on.",
  outcomes: [
    "Explain the purpose of performance measurement",
    "Distinguish financial from non-financial performance measures",
    "Explain economy, efficiency and effectiveness and apply them",
    "Explain the characteristics of a good performance measure",
    "Explain the problems of measuring performance, including goal displacement and short-termism",
    "Explain how performance measurement differs between manufacturing, service and not-for-profit organisations",
  ],
  sections: [
    {
      id: "purpose",
      heading: "Why measure performance",
      blocks: [
        {
          kind: "list",
          title: "What performance measurement is for",
          items: [
            "**Control** — establishing whether objectives are being met and acting where they are not.",
            "**Planning** — providing the basis for realistic targets.",
            "**Motivation** — a measured target directs effort, for better or worse.",
            "**Accountability** — linking results to the manager responsible.",
            "**Comparison** — against budget, against prior periods, against other units, against competitors.",
            "**Communication** — a measure tells everyone what the organisation actually values.",
            "**Decision-making** — identifying which products, customers or units to expand or withdraw from.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The consequence that runs through the whole area",
          md: "**What gets measured gets managed — and what does not get measured gets neglected.** A measure is not a neutral observation; it is an instruction. Every choice about what to measure is therefore a choice about what people will do, which is why a badly chosen measure does active harm rather than simply failing to help.",
        },
      ],
    },
    {
      id: "financial-nonfinancial",
      heading: "Financial and non-financial measures",
      blocks: [
        {
          kind: "table",
          caption: "The two kinds, and why both are needed",
          head: ["", "Financial measures", "Non-financial measures"],
          rows: [
            ["Examples", "Profit, margin, return on capital employed, cost per unit, cash flow", "Defect rate, on-time delivery, customer complaints, staff turnover, lead time, market share"],
            ["Strength", "Objective, comparable, aggregate, understood by all users", "Capture what drives future financial results, and are more actionable by front-line staff"],
            ["Weakness", "**Backward-looking**; can be manipulated; aggregate figures hide the causes", "Harder to compare; can proliferate; may be subjective"],
            ["Time horizon", "Reports the past", "Often **leading** indicators of the future"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why non-financial measures matter to an accountant",
          md: "A financial measure tells you the **result**; a non-financial measure tells you **why**. Falling profit is a fact; a rising defect rate, lengthening lead times and rising staff turnover are the reasons — and they were visible before the profit fell. Non-financial measures are also **harder to manipulate** and more meaningful to the people who can actually change them.",
        },
      ],
    },
    {
      id: "three-es",
      heading: "Economy, efficiency and effectiveness",
      blocks: [
        {
          kind: "definition",
          term: "The three Es",
          md: "**Economy** — obtaining the required inputs at the lowest cost. **Efficiency** — obtaining the maximum output from a given input, or a given output from minimum input. **Effectiveness** — the extent to which the organisation achieves its **objectives**.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Where each E applies",
            caption: "Economy is about buying inputs, efficiency about converting them, effectiveness about whether the output achieved the aim.",
            data: {
              steps: [
                { label: "Inputs", sub: "ECONOMY — did we obtain them at the lowest cost?" },
                { label: "Process", sub: "EFFICIENCY — did we get the most output from them?" },
                { label: "Outputs", sub: "the goods or services produced" },
                { label: "Outcomes", sub: "EFFECTIVENESS — did the output achieve the objective?" },
              ],
            },
          },
        },
        {
          kind: "illustration",
          title: "All three, in one training department",
          md: "A company's training department is asked to improve staff competence.\n\n**Economy:** it negotiates a trainer's fee down from $1,200 to $900 a day. Cheaper input — economical.\n\n**Efficiency:** it raises the number of staff trained per course day from 8 to 14. More output per unit of input — efficient.\n\n**Effectiveness:** competence assessments afterwards show no improvement, because the larger groups and cheaper trainer produced worse learning.\n\nThe department is economical and efficient and has **failed**. This is the standard reason all three are needed: economy and efficiency can both be improved in ways that damage effectiveness, and effectiveness is the only one that measures whether the objective was met.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The three Es can conflict",
          md: "Pursuing **economy** (buying cheaper) can damage **efficiency** (poorer material wastes more — Chapter 22's variance pattern) and **effectiveness** (worse product). This is exactly why performance should never be judged on one measure alone, and why the three Es are examined as a set.",
        },
      ],
      check: {
        q: "A hospital reduces the average cost per operation by 12% while the proportion of patients requiring readmission rises sharply. Which of the three Es has been achieved and which has failed?",
        options: [
          "Effectiveness achieved; economy failed",
          "Economy and efficiency achieved; effectiveness failed",
          "Efficiency achieved; economy failed",
          "All three achieved, since cost per operation fell",
        ],
        correct: 1,
        explain:
          "Lower cost per operation shows ECONOMY and EFFICIENCY — more output for less input. But a hospital's objective is to treat patients successfully, and rising readmissions mean that objective is not being met, so EFFECTIVENESS has failed. This is the classic illustration of why the three Es must be judged together: economy and efficiency can be improved in ways that defeat the purpose.",
      },
    },
    {
      id: "good-measures",
      heading: "What makes a good performance measure",
      blocks: [
        {
          kind: "list",
          title: "The characteristics",
          items: [
            "**Relevant** to the objective it is meant to support.",
            "**Controllable** by the person being assessed on it (Chapter 18).",
            "**Objective and verifiable**, so it cannot be argued with or quietly redefined.",
            "**Understandable** to the person whose behaviour it is meant to influence.",
            "**Timely** — available soon enough to act on.",
            "**Cost-effective** to produce.",
            "**Consistent over time**, so trends are meaningful.",
            "**Resistant to manipulation** — the harder to game, the better.",
            "**Balanced** — part of a set that covers the objective from more than one angle.",
          ],
        },
        {
          kind: "definition",
          term: "Goal displacement (dysfunctional behaviour)",
          md: "Where a manager pursues the **measure** rather than the **objective** the measure was meant to represent. The measure improves and the organisation is worse off — which is a failure of measure design, not usually of the manager's integrity.",
        },
        {
          kind: "table",
          caption: "Measures and the behaviour they invite",
          head: ["Measure", "The behaviour it can produce", "Consequence"],
          rows: [
            ["Cost per unit", "Producing more than can be sold, to spread fixed cost", "Excess inventory, tied-up cash, obsolescence (Chapter 13's perverse incentive)"],
            ["Material price variance", "Buying cheaper, lower-grade material", "Adverse usage and efficiency variances, and warranty cost later"],
            ["Number of calls handled per hour", "Ending calls quickly regardless of resolution", "Repeat calls and dissatisfied customers"],
            ["Short-term profit", "Cutting training, maintenance and advertising", "Long-term capability and revenue damaged — short-termism"],
            ["On-time delivery percentage", "Quoting long lead times so they are easy to meet", "Lost orders to faster competitors"],
            ["Return on capital employed", "Declining a good project that would lower the current average ROCE", "Profitable investment rejected — examined further in **APM**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The design principle that follows",
          md: "Use a **balanced set** of measures rather than one, and include at least one measure that would **deteriorate** if the primary one were gamed. Pair cost per unit with inventory days; pair calls per hour with first-contact resolution; pair short-term profit with a measure of investment in capability. A single measure, however well chosen, is an instruction to optimise one thing at everything else's expense.",
        },
      ],
    },
    {
      id: "context",
      heading: "Manufacturing, service and not-for-profit",
      blocks: [
        {
          kind: "table",
          caption: "Why the context changes the measures",
          head: ["Context", "Characteristics", "Measurement consequence"],
          rows: [
            ["**Manufacturing**", "Tangible, countable output; measurable inputs", "Cost per unit, defect rate, capacity utilisation and yield all work directly"],
            ["**Service**", "Intangible, simultaneous, perishable, heterogeneous (Chapter 14)", "Output is harder to define, so quality measures (satisfaction, complaints, resolution) and composite units matter more"],
            ["**Not-for-profit**", "No profit measure; objectives are often qualitative and multiple", "**Value for money** through the three Es; needs proxy and outcome measures, and effectiveness is the hard one"],
          ],
        },
        {
          kind: "definition",
          term: "Value for money",
          md: "The standard against which a not-for-profit or public sector body is judged, expressed as the achievement of **economy, efficiency and effectiveness** together. It substitutes for the profit measure that such a body does not have.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Why not-for-profit measurement is genuinely harder",
          md: "There is **no single bottom line**: a charity's objectives may be multiple, qualitative and in tension. **Outputs are not outcomes** — a training charity can count courses delivered (output) far more easily than lives improved (outcome), and the easy measure is the less important one. So there is a standing risk of managing what can be counted, which is goal displacement built into the sector's structure.",
        },
        {
          kind: "activity",
          title: "Activity 1 — design the measures",
          prompt:
            "A customer service centre currently assesses staff solely on the number of calls handled per hour. Management is concerned that customer satisfaction is falling while the calls-per-hour figure improves every month.\n\nExplain what is happening and recommend a balanced set of measures.",
          answer:
            "**What is happening: goal displacement.** Staff are pursuing the measure rather than the objective. Calls per hour rewards **ending** calls, not **resolving** them — so the rational response is to close calls quickly, which produces exactly the observed pattern: the measure improves and satisfaction falls. Note that this is a failure of measure design, not of the staff, who are behaving as the incentive instructs.\n\n**It is also self-defeating arithmetically.** Unresolved calls generate repeat calls, so the measure is partly counting the same problem twice — the improvement is in some degree an illusion created by the failure it caused.\n\n**A balanced set — four measures covering the objective from different angles.** (1) **First-contact resolution rate** — the proportion of issues resolved without a further call. This is the measure that would DETERIORATE if calls per hour were gamed, which is precisely why it must be there. (2) **Customer satisfaction**, from post-call survey, measuring the outcome rather than the activity. (3) **Average speed of answer or queue time**, retaining a legitimate efficiency measure so that resolution is not pursued at unlimited cost. (4) **Staff turnover or absence**, because a centre driven only on throughput burns staff out, and that damages service with a lag.\n\n**How to use them.** Assess on the **set**, not on any one member, and do not weight calls per hour so heavily that it dominates. Keep an efficiency measure — the answer is not to abandon productivity but to stop measuring it alone.\n\n**The general principle worth stating:** include at least one measure that gets worse if the primary measure is gamed. That is what makes a set balanced rather than merely numerous.",
        },
      ],
      check: {
        q: "A manager improves the measured cost per unit by producing far more than the company can sell. This is an example of:",
        options: [
          "Effectiveness",
          "Goal displacement, where the measure improves and the organisation is worse off",
          "Economy",
          "Value for money",
        ],
        correct: 1,
        explain:
          "This is GOAL DISPLACEMENT: the manager pursues the MEASURE (cost per unit, improved by spreading fixed costs over more units) rather than the OBJECTIVE, and the organisation ends up with excess inventory, tied-up cash and obsolescence risk. It is a failure of measure design, and the remedy is a balanced set including something — such as inventory days — that deteriorates when cost per unit is gamed this way.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Confusing efficiency with effectiveness.",
      fix: "Efficiency is output per unit of input. Effectiveness is whether the OBJECTIVE was achieved. An organisation can be highly efficient at the wrong thing.",
    },
    {
      trap: "Treating financial measures as sufficient.",
      fix: "They report the past and can be manipulated. Non-financial measures explain WHY and often lead the financial result.",
    },
    {
      trap: "Assuming goal displacement means the manager acted improperly.",
      fix: "It is usually a rational response to a badly designed measure. Fix the measure rather than blaming the behaviour.",
    },
    {
      trap: "Recommending a single 'better' measure.",
      fix: "Recommend a BALANCED SET, including at least one measure that would deteriorate if the primary one were gamed.",
    },
    {
      trap: "Applying profit-based measures to a not-for-profit body.",
      fix: "Use value for money — economy, efficiency and effectiveness — and distinguish outputs from outcomes.",
    },
  ],
  keyTerms: [
    { term: "Economy", def: "Obtaining the required inputs at the lowest cost." },
    { term: "Efficiency", def: "Obtaining maximum output from a given input, or a given output from minimum input." },
    { term: "Effectiveness", def: "The extent to which an organisation achieves its objectives." },
    { term: "Value for money", def: "The achievement of economy, efficiency and effectiveness together, used where there is no profit measure." },
    { term: "Goal displacement", def: "Pursuing a performance measure rather than the objective it represents, so the measure improves while the organisation suffers." },
    { term: "Short-termism", def: "Sacrificing long-term capability — training, maintenance, development — to improve a short-term measured result." },
    { term: "Leading indicator", def: "A non-financial measure that changes before the financial result it predicts." },
  ],
  summary: [
    "Performance measurement supports control, planning, motivation, accountability, comparison, communication and decisions.",
    "What gets measured gets managed, so a measure is an instruction rather than a neutral observation.",
    "Financial measures report the past and can be manipulated; non-financial measures explain why and often lead the result.",
    "Economy concerns inputs, efficiency the conversion, effectiveness whether the objective was achieved — and they can conflict.",
    "A good measure is relevant, controllable, objective, understandable, timely, cost-effective, consistent, hard to game and part of a balanced set.",
    "Goal displacement is a failure of measure design: fix the measure, not the behaviour.",
    "Service measurement is harder because output is intangible; not-for-profit measurement uses value for money and must distinguish outputs from outcomes.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three Es and what does each concern?", a: "Economy — obtaining inputs at lowest cost. Efficiency — maximum output from given inputs. Effectiveness — whether the organisation's objectives were achieved. They can conflict, so all three are needed." },
    { q: "Why are non-financial measures important to an accountant?", a: "A financial measure gives the result; a non-financial one gives the reason and often changes first. They are also harder to manipulate and more actionable by the staff who can change them." },
    { q: "What is goal displacement?", a: "Pursuing the measure rather than the objective it represents, so the measure improves while the organisation is worse off. It is usually a rational response to a poorly designed measure." },
    { q: "How should a set of performance measures be designed?", a: "As a balanced set covering the objective from several angles, including at least one measure that would deteriorate if the primary measure were gamed." },
    { q: "Why is performance measurement harder in a not-for-profit organisation?", a: "There is no single bottom line, objectives are often multiple and qualitative, and outputs are far easier to count than outcomes — so there is a structural risk of managing what can be measured." },
  ],
  furtherStudy: [
    "The balanced scorecard, and performance measurement in divisionalised businesses, are examined in **PM** and **APM**.",
    "Chapter 25 applies these principles as specific ratios and calculations.",
  ],
}

/* ── Chapter 25 · F2 ───────────────────────────────────────────── */

export const MA_TREE_25: StudyChapter = {
  id: "MA-25",
  number: 25,
  paper: "MA",
  area: "F",
  title: "Performance measurement in application",
  minutes: 19,
  syllabusRefs: ["F2(a)", "F2(b)", "F2(c)", "F2(d)"],
  intro:
    "The calculation chapter of Area F. Profitability, liquidity, activity and gearing ratios, the divisional measures that follow from them, and the resource-utilisation measures that matter in manufacturing and service settings.",
  outcomes: [
    "Calculate and interpret profitability ratios including gross and operating margin and ROCE",
    "Calculate and interpret liquidity and working capital ratios",
    "Calculate and interpret activity and gearing ratios",
    "Calculate and interpret return on investment and residual income for a division",
    "Calculate and interpret resource utilisation and productivity measures",
    "Explain the limitations of ratio analysis",
  ],
  sections: [
    {
      id: "profitability",
      heading: "Profitability ratios",
      blocks: [
        {
          kind: "formula",
          name: "The profitability ratios",
          expr: "Gross profit margin      =  Gross profit  ÷  Revenue  ×  100\n\nOperating profit margin  =  Operating profit  ÷  Revenue  ×  100\n\nReturn on capital employed (ROCE)  =  Operating profit  ÷  Capital employed  ×  100\n\nAsset turnover  =  Revenue  ÷  Capital employed  (times)",
          note: "Capital employed = total equity plus long-term debt, or equivalently total assets less current liabilities. Operating profit is profit before interest and tax, so ROCE is unaffected by how the business is financed.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "ROCE decomposes, and that is where interpretation comes from",
          md: "**ROCE = operating margin × asset turnover.** So a change in ROCE has exactly two possible sources: the business earned a different **margin** on each sale, or it generated a different volume of **sales from its assets**. Splitting it tells you which — and a supermarket (thin margin, high turnover) and a jeweller (fat margin, low turnover) can reach the same ROCE by opposite routes.",
        },
        {
          kind: "example",
          title: "Worked example — decomposing a fall in ROCE",
          scenario:
            "Year 1: revenue $4.0m, operating profit $480,000, capital employed $2.4m. Year 2: revenue $5.2m, operating profit $520,000, capital employed $3.4m. Analyse the change in ROCE.",
          steps: [
            { label: "ROCE", detail: "Year 1: 480 ÷ 2,400 = 20.0%. Year 2: 520 ÷ 3,400 = 15.3%. ROCE has fallen 4.7 percentage points despite profit rising." },
            { label: "Operating margin", detail: "Year 1: 480 ÷ 4,000 = 12.0%. Year 2: 520 ÷ 5,200 = 10.0%. Margin fell 2 points." },
            { label: "Asset turnover", detail: "Year 1: 4,000 ÷ 2,400 = 1.67 times. Year 2: 5,200 ÷ 3,400 = 1.53 times. Turnover also fell." },
            { label: "Confirm the decomposition", detail: "Year 1: 12.0% × 1.67 = 20.0%. Year 2: 10.0% × 1.53 = 15.3%. Both agree." },
            { label: "Interpret", detail: "BOTH components deteriorated. Revenue grew 30% but profit only 8%, so the extra sales were won at a lower margin — possibly through discounting. And capital employed grew 42%, faster than revenue, so the new investment is not yet generating proportionate sales." },
          ],
          result:
            "ROCE fell from 20.0% to 15.3%, and the decomposition shows **both** margin and asset turnover fell. The likely story — growth bought with discounting, on an asset base that has expanded faster than sales — is what management needs; \"ROCE fell\" is not. Note the honest qualification: if the new capital was invested late in year 2, the turnover figure understates its eventual contribution.",
        },
      ],
      check: {
        q: "A company's operating margin is 8% and its asset turnover is 2.5 times. What is its ROCE?",
        options: ["3.2%", "20%", "10.5%", "32%"],
        correct: 1,
        explain:
          "ROCE = operating margin × asset turnover = 8% × 2.5 = 20%. This decomposition is the basis of ROCE interpretation: any change must come either from the margin earned on each sale or from the sales generated per dollar of capital — and identifying which is what makes the analysis useful.",
      },
    },
    {
      id: "liquidity-activity",
      heading: "Liquidity, working capital and activity ratios",
      blocks: [
        {
          kind: "formula",
          name: "Liquidity and working capital ratios",
          expr: "Current ratio  =  Current assets  ÷  Current liabilities\n\nQuick (acid test) ratio  =  ( Current assets − Inventory )  ÷  Current liabilities\n\nInventory days  =  Inventory  ÷  Cost of sales  ×  365\n\nReceivables days  =  Trade receivables  ÷  Credit revenue  ×  365\n\nPayables days  =  Trade payables  ÷  Credit purchases  ×  365\n\nWorking capital (cash operating) cycle  =  Inventory days  +  Receivables days  −  Payables days",
          note: "Note the denominators: inventory days uses COST OF SALES, receivables days uses REVENUE, payables days uses PURCHASES. Using revenue for inventory days is a very common error.",
        },
        {
          kind: "example",
          title: "Worked example — the working capital cycle",
          scenario:
            "Inventory $420,000; trade receivables $610,000; trade payables $380,000; revenue $5,200,000; cost of sales $3,640,000; credit purchases $3,500,000. Calculate the working capital cycle and interpret it.",
          steps: [
            { label: "Inventory days", detail: "420 ÷ 3,640 × 365 = 42.1 days. Note cost of sales, not revenue, is the denominator — inventory is held at cost." },
            { label: "Receivables days", detail: "610 ÷ 5,200 × 365 = 42.8 days." },
            { label: "Payables days", detail: "380 ÷ 3,500 × 365 = 39.6 days." },
            { label: "Working capital cycle", detail: "42.1 + 42.8 − 39.6 = 45.3 days." },
            { label: "Interpret", detail: "Cash is tied up for about 45 days between paying suppliers and collecting from customers. Every day of the cycle has to be financed — so shortening it by 10 days would release roughly 10 ÷ 365 × $3,640,000 ≈ $100,000 of cash." },
          ],
          result:
            "A cycle of **45.3 days**. The commercial reading matters more than the number: this is the period the business must fund from its own resources or its overdraft, and it is why a profitable, growing company can run short of cash (Chapter 17). Shortening it releases cash without earning an extra dollar of profit.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A high current ratio is not automatically good",
          md: "A current ratio of 4:1 may mean **excessive inventory** that is not selling, or **receivables** that are not being collected, or **idle cash** earning nothing. Liquidity ratios must be read alongside the activity ratios that explain what the current assets consist of — a rising current ratio driven by rising inventory days is a warning, not a reassurance.",
        },
        {
          kind: "formula",
          name: "Gearing and interest cover",
          expr: "Gearing  =  Debt  ÷  Equity  ×  100     or     Debt  ÷  ( Debt + Equity )  ×  100\n\nInterest cover  =  Operating profit  ÷  Finance cost  (times)",
          note: "Two definitions of gearing are in use, so STATE which you have applied. High gearing raises financial risk: fixed interest must be paid whatever profit does.",
        },
      ],
    },
    {
      id: "divisional",
      heading: "Divisional performance: ROI and residual income",
      blocks: [
        {
          kind: "formula",
          name: "Return on investment and residual income",
          expr: "Return on investment (ROI)  =  Divisional profit  ÷  Divisional capital employed  ×  100\n\nResidual income (RI)  =  Divisional profit  −  ( Divisional capital employed  ×  Imputed interest rate )",
          note: "ROI is a percentage; RI is an absolute amount. The imputed interest charge represents the cost of the capital the division uses.",
        },
        {
          kind: "example",
          title: "Worked example — why ROI and RI can disagree",
          scenario:
            "A division has profit of $600,000 on capital employed of $3,000,000, so its current ROI is 20%. The group's cost of capital is 12%. A new project would add $140,000 of profit on $1,000,000 of additional capital. Evaluate under ROI and under RI.",
          steps: [
            { label: "The project's own return", detail: "$140,000 ÷ $1,000,000 = 14%, which EXCEEDS the 12% cost of capital, so the group should want it." },
            { label: "Divisional ROI if accepted", detail: "New profit $740,000 ÷ new capital $4,000,000 = 18.5%, DOWN from 20%." },
            { label: "The ROI incentive", detail: "A manager judged on ROI would REJECT the project, because accepting it lowers their measured performance from 20% to 18.5%." },
            { label: "Residual income now", detail: "$600,000 − (12% × $3,000,000 = $360,000) = $240,000." },
            { label: "Residual income if accepted", detail: "$740,000 − (12% × $4,000,000 = $480,000) = $260,000 — an INCREASE of $20,000." },
            { label: "The RI incentive", detail: "A manager judged on RI would ACCEPT, because RI rises. And RI gives the group-congruent answer: the project earns 14% against a 12% cost of capital, so it adds value." },
          ],
          result:
            "ROI says reject; RI says accept; and **RI is right**. This is the decisive argument for residual income: **ROI can lead a division to reject a project that would benefit the group**, purely because it would dilute a high existing average. RI charges the capital at the group's cost, so any project earning above that raises RI — which makes the manager's incentive congruent with the group's interest.",
        },
        {
          kind: "table",
          caption: "ROI and RI compared",
          head: ["", "ROI", "Residual income"],
          rows: [
            ["Expressed as", "A percentage", "An absolute amount"],
            ["Comparing divisions of different sizes", "**Easy** — percentages are directly comparable", "Harder — a large division will show a larger RI"],
            ["Goal congruence", "**Poor** — can reject group-beneficial projects that dilute a high ROI", "**Good** — any project above the cost of capital raises RI"],
            ["Intuitive appeal", "High; widely understood", "Lower; needs the imputed interest explained"],
            ["Sensitivity to the capital base", "Both are distorted by asset age: older, more depreciated assets flatter both measures", "Same weakness"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The shared weakness worth naming",
          md: "**Both** measures are distorted by the **age of the asset base.** A division with old, heavily depreciated assets shows a small capital employed figure and therefore a flattering ROI and RI — while a division that has just invested in new equipment looks worse, precisely because it invested. Comparing two divisions on either measure without considering asset age is unsound, and it also discourages replacement investment.",
        },
      ],
      check: {
        q: "A division's current ROI is 22%. A project offering a 16% return is available, and the group's cost of capital is 12%. What is the risk of judging the manager on ROI?",
        options: [
          "The manager will accept the project, correctly",
          "The manager may reject it, because it would dilute the divisional ROI from 22% toward 16%",
          "ROI and residual income would give the same answer",
          "There is no risk, because 16% exceeds 12%",
        ],
        correct: 1,
        explain:
          "The project earns 16% against a 12% cost of capital, so the GROUP benefits — but accepting it pulls the division's average ROI down from 22%, so a manager judged on ROI has an incentive to REJECT it. Residual income avoids this: charging capital at 12% means any project earning above that raises RI, making the manager's incentive congruent with the group's.",
      },
    },
    {
      id: "resource-utilisation",
      heading: "Resource utilisation and productivity",
      blocks: [
        {
          kind: "table",
          caption: "Measures beyond the financial statements",
          head: ["Measure", "Calculation", "Tells you"],
          rows: [
            ["Capacity utilisation", "Actual output ÷ maximum possible output × 100", "How fully the available capacity is being used"],
            ["Labour productivity", "Output ÷ labour hours (or per employee)", "Output achieved per unit of labour"],
            ["Machine utilisation", "Machine hours run ÷ machine hours available × 100", "Whether equipment is idle"],
            ["Yield", "Good output ÷ input × 100", "How much of the material input became saleable product"],
            ["Idle time percentage", "Idle hours ÷ total hours paid × 100", "Paid time producing nothing (Chapter 11)"],
            ["Room occupancy (hotel)", "Rooms occupied ÷ rooms available × 100", "The service equivalent of capacity utilisation"],
            ["Defect / reject rate", "Defective units ÷ total units × 100", "Quality, and a leading indicator of warranty cost"],
            ["On-time delivery", "Deliveries on time ÷ total deliveries × 100", "Reliability as the customer experiences it"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Pair a utilisation measure with a quality measure",
          md: "**Capacity utilisation of 98% is only good news if the reject rate has not risen.** Running equipment or people at full stretch commonly raises defects, maintenance failures and staff turnover — so a utilisation measure reported alone invites exactly the trade-off it cannot see. This is Chapter 24's balanced-set principle applied to operations.",
        },
        {
          kind: "list",
          title: "The limitations of ratio analysis",
          items: [
            "**A ratio raises a question; it does not answer it.** It shows that something changed, not why.",
            "**Comparability** — different accounting policies, year ends, or definitions make two companies' ratios non-comparable (Chapter 2's point about published data).",
            "**Historic** — ratios describe a period that has ended.",
            "**A single period is not a trend.** One year's figures can be distorted by a one-off event.",
            "**Averages hide variation** — a year-end inventory figure may be unrepresentative of the year.",
            "**Manipulation** — window dressing near a year end can improve liquidity ratios temporarily.",
            "**Non-financial factors** are invisible: staff morale, brand strength, customer loyalty and product pipeline do not appear.",
            "**Inflation** distorts comparison across years unless figures are restated (Chapter 8).",
          ],
        },
        {
          kind: "activity",
          title: "Activity 2 — interpret a divisional report",
          prompt:
            "Two divisions of the same group, both assessed on ROI:\n\nDivision P: profit $900,000; capital employed $3,000,000; ROI 30%. Its plant is 11 years old and largely written down.\nDivision Q: profit $1,400,000; capital employed $8,000,000; ROI 17.5%. Its plant was replaced last year.\n\nThe group cost of capital is 12%. Head office concludes that P is the better-managed division and is considering transferring investment funds from Q to P.\n\nEvaluate that conclusion.",
          answer:
            "**The conclusion is unsafe, for three reasons.**\n\n**1 — Asset age distorts both ROI figures.** P's plant is 11 years old and largely written down, so its capital employed is small and its ROI correspondingly flattered. Q has just invested, so its capital employed is at close to full cost and its ROI is depressed — **because it invested**, not because it is worse managed. Comparing the two percentages without adjusting for asset age compares accounting depreciation, not management.\n\n**2 — Residual income tells a different story.** P: $900,000 − (12% × $3m = $360,000) = **$540,000**. Q: $1,400,000 − (12% × $8m = $960,000) = **$440,000**. P is still ahead but by far less than the ROI gap of 30% against 17.5% suggests — and in absolute terms Q generates $500,000 more profit. ROI's percentage form exaggerates the difference.\n\n**3 — The proposed action makes the problem worse.** Transferring funds to P adds capital to a division whose high ROI means any new project will **dilute** its average — so P's manager is already incentivised to reject good projects (the goal-congruence problem). Meanwhile Q, which has just modernised, would be starved of funds for reasons that are an artefact of the measure.\n\n**Recommendations.** Assess divisions on **residual income** alongside ROI, so that any project above the 12% cost of capital is rewarded. Adjust for **asset age** — comparing at gross book value, or noting the difference explicitly — before drawing conclusions. And add **non-financial measures** so that Q's new plant is credited with the capacity, quality and reliability it should deliver, which the ROI figure cannot see.\n\n**Also creditable:** P's 11-year-old plant may be approaching replacement, so its current high ROI is partly borrowed from a capital expenditure that is still to come.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Using revenue rather than cost of sales in inventory days.",
      fix: "Inventory is held at cost, so the denominator is COST OF SALES. Receivables days uses revenue and payables days uses purchases.",
    },
    {
      trap: "Reading a high current ratio as unambiguously healthy.",
      fix: "It may reflect unsold inventory, uncollected receivables or idle cash. Read it with the activity ratios that explain the composition.",
    },
    {
      trap: "Reporting a change in ROCE without decomposing it.",
      fix: "ROCE = operating margin × asset turnover. Splitting it identifies whether margin or asset productivity moved.",
    },
    {
      trap: "Comparing divisions on ROI without considering asset age.",
      fix: "Old, written-down assets flatter ROI and RI alike. A division that has just invested looks worse precisely because it invested.",
    },
    {
      trap: "Assuming ROI produces goal-congruent decisions.",
      fix: "It can lead a division to reject a project earning above the cost of capital, because it dilutes a high average. Residual income does not.",
    },
    {
      trap: "Reporting capacity utilisation without a quality measure.",
      fix: "High utilisation often raises defects, breakdowns and turnover. Pair it with reject rate or on-time delivery.",
    },
    {
      trap: "Treating a ratio as an answer.",
      fix: "A ratio raises a question. Marks come from a possible cause tied to the scenario and an action or the further information needed.",
    },
  ],
  keyTerms: [
    { term: "Return on capital employed", def: "Operating profit ÷ capital employed × 100; equal to operating margin × asset turnover." },
    { term: "Asset turnover", def: "Revenue ÷ capital employed, measuring sales generated per dollar of capital." },
    { term: "Quick (acid test) ratio", def: "Current assets less inventory, divided by current liabilities." },
    { term: "Working capital cycle", def: "Inventory days plus receivables days less payables days — the period cash is tied up." },
    { term: "Gearing", def: "The proportion of debt in a company's capital structure, raising financial risk because interest is fixed." },
    { term: "Return on investment (ROI)", def: "Divisional profit ÷ divisional capital employed × 100." },
    { term: "Residual income (RI)", def: "Divisional profit less an imputed interest charge on divisional capital employed." },
    { term: "Capacity utilisation", def: "Actual output as a percentage of maximum possible output." },
    { term: "Yield", def: "Good output as a percentage of input." },
  ],
  summary: [
    "ROCE decomposes into operating margin × asset turnover, and the split is where interpretation comes from.",
    "Inventory days uses cost of sales, receivables days uses revenue, payables days uses purchases.",
    "The working capital cycle is inventory plus receivables less payables days, and it is the period cash must be funded.",
    "A high current ratio may signal unsold inventory or uncollected receivables rather than health.",
    "ROI is a percentage that can lead a division to reject group-beneficial projects; residual income is goal-congruent.",
    "Both ROI and RI are distorted by asset age, so a recently-invested division looks worse for having invested.",
    "Utilisation and productivity measures should be paired with quality measures, or the trade-off is invisible.",
    "Ratios raise questions rather than answering them, and are limited by comparability, historic basis, single periods, manipulation and inflation.",
  ],
  knowledgeDiagnostic: [
    { q: "How does ROCE decompose, and why does it matter?", a: "ROCE = operating margin × asset turnover. Any change must come either from the margin earned per sale or from the sales generated per dollar of capital, and identifying which is what makes the analysis useful." },
    { q: "Which denominators do the three activity ratios use?", a: "Inventory days uses COST OF SALES, receivables days uses REVENUE, and payables days uses PURCHASES. Using revenue for inventory days is a common error." },
    { q: "Why can ROI produce a decision against the group's interest?", a: "Because a project earning above the cost of capital but below the division's current ROI dilutes the measured average, so a manager judged on ROI has an incentive to reject it. Residual income avoids this." },
    { q: "What weakness do ROI and residual income share?", a: "Both are distorted by the age of the asset base: old, heavily depreciated assets flatter the measure, so a division that has recently invested appears worse precisely because it invested." },
    { q: "Give four limitations of ratio analysis.", a: "A ratio raises a question rather than answering it; comparability is undermined by different policies and definitions; ratios are historic and a single period is not a trend; they can be manipulated by window dressing; and non-financial factors and inflation are invisible." },
  ],
  furtherStudy: [
    "Divisional performance measurement, transfer pricing and the balanced scorecard are core **PM** and **APM** topics.",
    "Working capital management and ratio interpretation are developed in **FM** and **FA**.",
  ],
}

/* ── Chapter 26 · F3 ───────────────────────────────────────────── */

export const MA_TREE_26: StudyChapter = {
  id: "MA-26",
  number: 26,
  paper: "MA",
  area: "F",
  title: "Cost reduction and value enhancement",
  minutes: 15,
  syllabusRefs: ["F3(a)", "F3(b)", "F3(c)"],
  intro:
    "Measuring performance is useful only if something is done about it. This chapter is the difference between cutting cost and reducing it — and the four techniques that reduce cost without reducing what the customer receives.",
  outcomes: [
    "Distinguish cost reduction from cost control",
    "Explain and apply value analysis and value engineering",
    "Explain the four types of value in value analysis",
    "Explain business process re-engineering and continuous improvement",
    "Identify the risks of poorly-executed cost reduction",
  ],
  sections: [
    {
      id: "reduction-vs-control",
      heading: "Cost reduction is not cost control",
      blocks: [
        {
          kind: "definition",
          term: "Cost control and cost reduction",
          md: "**Cost control** keeps costs **within** a predetermined standard or budget — it accepts the standard and manages against it. **Cost reduction** lowers the **standard itself**, by finding a permanently cheaper way of achieving the same output without sacrificing quality or function.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction that matters commercially",
          md: "Cost **control** asks: are we spending what we said we would? Cost **reduction** asks: should the amount we said we would spend be lower? Control can only ever deliver the standard; reduction changes what is achievable. Note the crucial qualifier in the definition — **without sacrificing quality or function**. Spending less by delivering less is not cost reduction, it is a price cut disguised as an efficiency.",
        },
        {
          kind: "table",
          caption: "Genuine reduction against false economy",
          head: ["Action", "Genuine cost reduction?", "Why"],
          rows: [
            ["Redesigning a component to use less material for the same strength", "**Yes**", "Permanently lower cost, unchanged function"],
            ["Negotiating a lower price on the same specification", "**Yes**", "Lower cost, nothing given up"],
            ["Eliminating a process step that adds no value to the customer", "**Yes**", "Cost removed, output unaffected"],
            ["Buying inferior material", "**No**", "Cost transfers to wastage, rework and warranty (Chapter 22)"],
            ["Deferring maintenance", "**No**", "Defers cost and raises breakdown risk — short-termism"],
            ["Cutting training", "**No**", "Reduces future capability; damage appears with a lag"],
            ["Reducing staff without removing the work", "**No**", "Reappears as overtime, errors, turnover or missed delivery"],
          ],
        },
      ],
      check: {
        q: "Which of the following is a genuine cost reduction rather than a false economy?",
        options: [
          "Deferring planned machine maintenance to next year",
          "Redesigning a product to use fewer components while maintaining its function",
          "Switching to a cheaper, lower-grade raw material",
          "Reducing the training budget by half",
        ],
        correct: 1,
        explain:
          "Redesigning to use fewer components while MAINTAINING FUNCTION lowers the standard cost permanently without giving anything up — the definition of cost reduction. The other three defer or transfer cost rather than removing it: maintenance deferral raises breakdown risk, cheaper material reappears as wastage and warranty cost, and cutting training damages future capability.",
      },
    },
    {
      id: "value-analysis",
      heading: "Value analysis and value engineering",
      blocks: [
        {
          kind: "definition",
          term: "Value analysis and value engineering",
          md: "**Value analysis** is a systematic examination of an **existing** product or service to identify and remove cost that does not contribute to value. **Value engineering** applies the same thinking to a product **still in design**, before its cost is locked in.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction is WHEN, and it matters enormously",
          md: "**Value engineering acts at the design stage; value analysis acts afterwards.** Because the majority of a product's cost is determined by decisions taken during design, value **engineering** has far greater scope — which is exactly why it pairs with target costing (Chapter 15). Value analysis is worth doing and is working against a cost structure already largely committed.",
        },
        {
          kind: "table",
          caption: "The four types of value",
          head: ["Type", "Is", "Example"],
          rows: [
            ["**Cost value**", "The cost of producing and selling the item", "$18 of material, labour and overhead in a kettle"],
            ["**Exchange value**", "The market value — what a customer will pay", "The $40 retail price"],
            ["**Use value**", "What the item does; its function and performance", "Boils water quickly and safely, holds 1.7 litres"],
            ["**Esteem value**", "The prestige or attractiveness the item confers, beyond function", "Brand, finish, design; the reason two functionally identical kettles sell at different prices"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "How the four types are used",
          md: "Value analysis asks, of every feature: does it add **use** value, **esteem** value, or **neither**? Cost that supports neither should be **removed** — that is pure waste. Cost supporting esteem value must be judged commercially rather than eliminated automatically: a customer genuinely paying for finish or brand is paying for esteem value, and stripping it out reduces exchange value along with cost. Removing esteem value from a premium product is the classic value-analysis mistake.",
        },
        {
          kind: "illustration",
          title: "The same cost, two verdicts",
          md: "A kettle's cost includes $1.40 for a brushed-steel finish on the base plate, which the customer never sees, and $2.10 for a brushed-steel finish on the visible body.\n\nThe hidden base plate finish adds **neither use nor esteem value** — nobody sees it and it does not affect performance. It is waste, and removing it saves $1.40 with no effect on what the customer will pay.\n\nThe visible body finish adds **esteem value**, and is part of why this kettle sells at $40 rather than $28. Removing it would save $2.10 and cost far more than that in exchange value.\n\nIdentical materials, identical cost per square centimetre, opposite conclusions — because value analysis judges cost against **what the customer values**, not against the cost itself.",
        },
        {
          kind: "activity",
          title: "Activity 1 — apply value analysis",
          prompt:
            "A manufacturer of office chairs is under margin pressure. A value analysis exercise identifies four candidates for cost reduction:\n\n(a) A chromed metal plate under the seat, invisible in use, costing $3.20 per chair.\n(b) Gas-lift height adjustment, costing $8.50, which 90% of customers cite as a reason for buying.\n(c) Packaging with three layers of protective foam, costing $2.40; damage in transit is currently 0.1%.\n(d) A stitched fabric finish costing $6.00, which the sales team says distinguishes the chair from cheaper competitors.\n\nAdvise on each.",
          answer:
            "**(a) Remove it — $3.20 saved.** Invisible in use, so it adds no **esteem** value; and unless it is structural it adds no **use** value either. This is cost supporting neither type of value, which is the clearest case value analysis identifies. **One check first:** confirm with engineering that it plays no structural or safety role — 'invisible' is not the same as 'unnecessary'.\n\n**(b) Retain.** It is $8.50 of pure **use value**, cited by 90% of customers as a reason for buying. Removing it would reduce **exchange value** by far more than $8.50, and would likely lose sales outright. Cost that customers are demonstrably buying is not a cost-reduction candidate.\n\n**(c) Investigate — likely partial reduction.** Three layers of foam for a 0.1% damage rate suggests the packaging may be over-specified. Test two layers on a sample: if damage stays acceptably low, the saving is genuine. But quantify the trade-off before acting — a rise from 0.1% to 1% in damage would cost replacement chairs, freight and customer goodwill that could easily exceed the $2.40. This is the case where the answer is 'test it', not 'cut it'.\n\n**(d) Retain, and be sceptical of the reasoning.** $6.00 of **esteem value** that differentiates the chair from cheaper competitors is exactly the cost value analysis should NOT strip out — removing it would move the product toward the segment it currently escapes. Note the qualification, though: the sales team's view is an assertion. If customer research or a price test showed buyers do not actually pay for it, the conclusion would change.\n\n**The principle to state:** remove cost that supports neither use nor esteem value; test cost that may be over-specified; and protect cost the customer is demonstrably paying for. Cutting (b) and (d) would save $14.50 a chair and would be the fastest available route to losing the product's market.",
        },
      ],
      check: {
        q: "In value analysis, a feature is found to add no use value and no esteem value. What should be done?",
        options: [
          "Retain it, because removing features always reduces quality",
          "Remove it, since cost supporting neither type of value is waste",
          "Retain it if it is cheap",
          "Increase spending on it to add esteem value",
        ],
        correct: 1,
        explain:
          "Cost that supports neither USE value (what the item does) nor ESTEEM value (the prestige or attractiveness the customer pays for) contributes nothing the customer values — it is waste, and removing it lowers cost without reducing exchange value. Cost supporting esteem value must be judged commercially rather than cut, which is the distinction the technique exists to draw.",
      },
    },
    {
      id: "bpr-and-ci",
      heading: "Business process re-engineering and continuous improvement",
      blocks: [
        {
          kind: "definition",
          term: "Business process re-engineering (BPR)",
          md: "The **fundamental rethinking and radical redesign** of business processes to achieve dramatic improvement in cost, quality, service or speed. It asks not \"how can this process be made more efficient?\" but \"**why does this process exist at all, and what would we design if we were starting now?**\"",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two philosophies of improvement",
            caption: "They are not alternatives so much as different tools for different situations.",
            data: {
              leftTitle: "Business process re-engineering",
              rightTitle: "Continuous improvement (kaizen)",
              rows: [
                { aspect: "Scale of change", left: "Radical, discontinuous", left2: "", right: "Incremental, many small changes" },
                { aspect: "Frequency", left: "One-off, project-based", right: "Continuous and ongoing" },
                { aspect: "Driven by", left: "Senior management, top-down", right: "The people doing the work, bottom-up" },
                { aspect: "Risk", left: "High — disruptive, expensive, can fail outright", right: "Low — each change is small and reversible" },
                { aspect: "Speed of benefit", left: "Fast if it works", right: "Slow to accumulate but compounds" },
                { aspect: "Effect on staff", left: "Threatening; often involves job losses", right: "Engaging; relies on staff contribution" },
                { aspect: "Suits", right: "Stable processes needing steady refinement", left: "A process that is fundamentally the wrong shape" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "What BPR typically produces",
          items: [
            "**Elimination of non-value-adding steps** — checks, approvals, hand-offs and queues that exist for historic reasons.",
            "**Fewer hand-offs**, because each one adds delay and a chance of error.",
            "**Case workers** replacing assembly-line processing, so one person owns a transaction end to end.",
            "**Work performed where it makes most sense**, which may be by the customer (self-service) or by the supplier.",
            "**Parallel rather than sequential** processing, cutting elapsed time sharply.",
            "**Technology as an enabler** rather than as the objective — automating a bad process makes it faster, not better.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The risks of cost reduction done badly",
          md: "**Quality and reputation damage** that costs more than the saving. **Loss of capability** that is expensive and slow to rebuild. **Morale and turnover effects**, especially where BPR is a redundancy exercise wearing a technical name. **Short-termism**, deferring rather than removing cost. **False economy**, where cost moves to another department and the group saves nothing. And **customer defection**, where the removed cost turned out to be something customers were paying for.\n\nThe test to apply: has the cost been **removed**, or merely **moved or deferred**?",
        },
      ],
      check: {
        q: "Which best distinguishes business process re-engineering from continuous improvement?",
        options: [
          "BPR is driven by staff; continuous improvement by senior management",
          "BPR makes radical, one-off changes to process design; continuous improvement makes many small incremental changes",
          "BPR is low risk; continuous improvement is high risk",
          "They are alternative names for the same technique",
        ],
        correct: 1,
        explain:
          "BPR is RADICAL and DISCONTINUOUS — a fundamental redesign of the process, usually driven top-down and carrying high risk. Continuous improvement (kaizen) makes MANY SMALL incremental changes, usually driven by the people doing the work and carrying low risk per change. Options 1 and 3 reverse the characteristics of each.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating any spending cut as cost reduction.",
      fix: "Cost reduction lowers the standard permanently WITHOUT sacrificing quality or function. Spending less by delivering less is not reduction.",
    },
    {
      trap: "Confusing cost control with cost reduction.",
      fix: "Control keeps costs within the existing standard; reduction lowers the standard itself.",
    },
    {
      trap: "Recommending removal of all cost that does not add use value.",
      fix: "Esteem value is genuine value the customer pays for. Remove cost that adds NEITHER use nor esteem value.",
    },
    {
      trap: "Confusing value analysis with value engineering.",
      fix: "Value engineering acts at the DESIGN stage, where most cost is still determined. Value analysis examines an existing product.",
    },
    {
      trap: "Describing BPR as incremental improvement.",
      fix: "BPR is radical, discontinuous redesign. Incremental change is continuous improvement, and the two carry very different risks.",
    },
    {
      trap: "Failing to test whether a cost has been removed or merely moved.",
      fix: "A saving in one department that reappears as overtime, rework or warranty cost elsewhere is not a saving at all.",
    },
  ],
  keyTerms: [
    { term: "Cost control", def: "Keeping costs within a predetermined standard or budget." },
    { term: "Cost reduction", def: "Permanently lowering the standard cost of achieving the same output, without sacrificing quality or function." },
    { term: "Value analysis", def: "Systematic examination of an existing product to remove cost that does not contribute to value." },
    { term: "Value engineering", def: "The same examination applied at the design stage, before cost is committed." },
    { term: "Use value", def: "The value arising from what an item does — its function and performance." },
    { term: "Esteem value", def: "The value arising from the prestige or attractiveness an item confers beyond its function." },
    { term: "Exchange value", def: "The market value of an item — what a customer will pay for it." },
    { term: "Business process re-engineering", def: "Fundamental rethinking and radical redesign of a process to achieve dramatic improvement." },
    { term: "Continuous improvement", def: "Ongoing incremental improvement driven by the people performing the work." },
  ],
  summary: [
    "Cost control keeps spending within the standard; cost reduction lowers the standard permanently without sacrificing quality or function.",
    "Deferring maintenance, cutting training or buying inferior material moves or defers cost rather than removing it.",
    "Value analysis examines an existing product; value engineering acts at the design stage, where scope is far greater.",
    "The four types of value are cost, exchange, use and esteem.",
    "Remove cost that adds neither use nor esteem value; judge esteem-value cost commercially rather than cutting it.",
    "BPR is radical, top-down, high-risk redesign; continuous improvement is incremental, bottom-up and low-risk.",
    "The test of any cost reduction is whether the cost has been removed, or merely moved or deferred.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between cost control and cost reduction?", a: "Control keeps costs within an existing standard or budget. Reduction lowers the standard itself, finding a permanently cheaper way to achieve the same output without sacrificing quality or function." },
    { q: "What are the four types of value in value analysis?", a: "Cost value (what it costs to produce), exchange value (what a customer will pay), use value (what it does) and esteem value (the prestige or attractiveness it confers)." },
    { q: "Which cost should value analysis remove?", a: "Cost supporting NEITHER use nor esteem value — that is pure waste. Cost supporting esteem value must be judged commercially, because removing it reduces exchange value too." },
    { q: "How do value analysis and value engineering differ?", a: "Timing. Value engineering acts at the design stage, when most of the cost is still determined, so its scope is far greater. Value analysis examines a product already in production." },
    { q: "What is the test of whether a cost reduction is genuine?", a: "Whether the cost has been REMOVED rather than moved or deferred. A saving that reappears as overtime, wastage, warranty cost or lost customers is not a saving." },
  ],
  furtherStudy: [
    "Value analysis, target costing and throughput accounting are developed in **PM**; strategic cost management in **APM**.",
    "The quality cost categories that justify prevention spending are in Chapter 15.",
  ],
}

/* ── Chapter 27 · F4 ───────────────────────────────────────────── */

export const MA_TREE_27: StudyChapter = {
  id: "MA-27",
  number: 27,
  paper: "MA",
  area: "F",
  title: "Monitoring performance and reporting",
  minutes: 15,
  syllabusRefs: ["F4(a)", "F4(b)", "F4(c)"],
  intro:
    "The closing chapter, and it returns to where the paper began. A management report exists so that somebody can act — and the whole of MA is only useful if the numbers reach the right person, at the right time, in a form they can use.",
  outcomes: [
    "Explain the purpose and design of a performance report",
    "Apply the principles of exception reporting and reporting by responsibility",
    "Explain the frequency and level of detail appropriate to each management level",
    "Interpret a performance report and recommend action",
    "Explain the behavioural consequences of performance reporting",
  ],
  sections: [
    {
      id: "designing-a-report",
      heading: "Designing a performance report",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "What a performance report must do",
          items: [
            "**Address one identified recipient**, and contain what that person can act on.",
            "**Compare** actual against a valid benchmark — a flexed budget, the prior period, or a target (Chapter 18).",
            "**Separate controllable from uncontrollable** items, and ask for explanation only of the first.",
            "**Highlight exceptions**, so attention is directed rather than dispersed.",
            "**Show trends**, not just this period — one month is an observation, three is a pattern.",
            "**Combine financial with non-financial** measures, so causes appear alongside results (Chapter 24).",
            "**Arrive in time to act**, which usually outranks perfect accuracy.",
            "**State the action required**, or the further information needed to determine it.",
          ],
        },
        {
          kind: "table",
          caption: "Frequency and detail by management level (Chapter 1's hierarchy applied)",
          head: ["Level", "Frequency", "Detail", "Typical content"],
          rows: [
            ["**Operational**", "Daily or weekly", "**High** — individual items", "Output, downtime, rejects, hours, individual variances"],
            ["**Tactical / middle**", "Monthly", "Summarised by department", "Departmental variances against flexed budget, key ratios, headcount"],
            ["**Strategic / board**", "Monthly, quarterly or annually", "**Highly summarised**, with external comparison", "Profit against budget, ROCE, cash, market share, major exceptions only"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The design principle",
          md: "**Detail decreases and summarisation increases as the report goes up the organisation.** A board receiving 40 pages of departmental variances will read none of them; a supervisor receiving only a group ROCE figure can act on nothing. Matching the level of detail to the recipient's decisions is the single most important design choice — and the commonest failure.",
        },
      ],
    },
    {
      id: "exception-and-responsibility",
      heading: "Exception reporting and responsibility",
      blocks: [
        {
          kind: "definition",
          term: "Management by exception",
          md: "Reporting and investigating only those items falling **outside a defined tolerance**, on the basis that management attention is scarce and should be spent where it can change something. Items within tolerance are recorded but not raised.",
        },
        {
          kind: "list",
          title: "Setting the tolerance, and deciding what to investigate",
          items: [
            "**Absolute size** — a $200 variance rarely justifies an investigation.",
            "**Percentage size** — $5,000 on a $10,000 budget is far more significant than on a $2m budget.",
            "**Controllability** — no point raising what the recipient cannot influence.",
            "**Trend** — a small variance recurring every month may matter more than a larger one-off.",
            "**Cost of investigation** against the likely benefit of finding the cause.",
            "**Whether the standard is current** — a persistently same-signed variance indicts the standard, not the manager (Chapter 23).",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Favourable variances also deserve investigation",
          md: "Exception reporting is commonly applied only to adverse items, which is a mistake. A large **favourable** variance may reveal an out-of-date standard, a quality shortcut that will cost more later, deferred spending, or a genuinely better method that should be **adopted elsewhere**. Investigating only bad news means the organisation never learns from good news, and never detects manipulation.",
        },
      ],
      check: {
        q: "A monthly report shows a $300 favourable variance on a $2m budget, and a $4,000 adverse variance that has recurred in each of the last five months. Which should be investigated?",
        options: [
          "Both, since all variances require explanation",
          "The $4,000 recurring variance, because a persistent trend matters more than a trivial one-off",
          "The $300 favourable variance, because favourable variances are always suspicious",
          "Neither, as both are immaterial against a $2m budget",
        ],
        correct: 1,
        explain:
          "Significance depends on size, TREND and controllability. $300 on $2m is trivial in both absolute and percentage terms. A $4,000 variance recurring for five consecutive months is a pattern — and a persistently same-signed variance usually indicates the STANDARD is out of date rather than that performance is consistently poor, which is itself worth finding out.",
      },
    },
    {
      id: "interpreting-and-acting",
      heading: "Interpreting a report and recommending action",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "From a report to an action",
            caption: "The last two steps are where marks are earned and where most answers stop short.",
            data: {
              steps: [
                { label: "State the position", sub: "the overall gap, in money and in percentage terms" },
                { label: "Rank what matters", sub: "largest items and clearest trends first" },
                { label: "Link related items", sub: "offsetting variances usually share one cause" },
                { label: "Identify a likely cause", sub: "tied to something specific in the scenario" },
                { label: "Recommend an action", sub: "or state precisely what further information is needed" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The difference between description and interpretation",
          md: "**\"Material cost was $14,000 above budget\"** is description — the reader could see that. **\"Material cost was $14,000 above the flexed budget, almost entirely usage rather than price, coinciding with the switch to the new supplier in week 2; I recommend testing a batch of the previous specification and quantifying the wastage difference before the annual contract is signed\"** is interpretation. The second earns the marks, and it is the one a manager can act on.",
        },
        {
          kind: "activity",
          title: "Activity 1 — write the report",
          prompt:
            "You are the management accountant of a manufacturing division. This month: sales volume 8% above budget; sales price variance $18,000 adverse; material usage variance $11,000 adverse (fourth consecutive adverse month, worsening each time); labour efficiency $2,000 favourable; fixed overhead expenditure $1,500 adverse; on-time delivery down from 96% to 88%; customer complaints up 40%.\n\nOutline what you would report to the divisional manager, and what you would report to the board.",
          answer:
            "**To the DIVISIONAL MANAGER — detailed, actionable, this month.**\n\nLead with the **material usage variance**: $11,000 adverse and, more importantly, the **fourth consecutive adverse month and worsening**. A deteriorating trend is a process problem, not a bad month, and it is the item most worth acting on. Note that labour efficiency is **favourable**, which argues against poor-quality material being hard to work — so the likely cause is a process, machine or specification issue rather than a purchasing one. Recommend: establish when the deterioration began, whether it coincides with a machine, shift, batch or specification change, and quantify the wastage by cause.\n\nSecond, link **on-time delivery down 8 points and complaints up 40%** to the volume increase. Selling 8% more than budget while delivery reliability falls suggests capacity is being stretched — the classic utilisation-versus-quality trade-off from Chapter 25. These non-financial measures are **leading indicators**: they will show up in lost orders and returns before they show up in the profit figure.\n\nThird, the **$18,000 adverse sales price variance alongside 8% extra volume** is a price-for-volume trade. Ask whether it was authorised, and whether it paid: the extra volume's contribution needs comparing against the $18,000 given away.\n\nNote the small items — labour efficiency $2,000 F and overhead expenditure $1,500 A — but do not raise them for investigation at that size.\n\n**To the BOARD — highly summarised, exceptions and trends only.**\n\nOne short statement: volume ahead of budget but achieved at a lower price, so margin is under pressure; and **two deteriorating trends worth their attention** — a worsening material usage problem now in its fourth month, and a fall in delivery reliability with rising complaints as the division runs closer to capacity. State what is being done about each and when the board will next hear about it.\n\n**What the board should NOT receive:** the individual variance figures. They are the divisional manager's to act on, and a board that receives them either ignores them or starts managing at the wrong level. That matching of detail to the recipient's decisions is the design principle of this chapter.",
        },
      ],
    },
    {
      id: "behavioural",
      heading: "The behavioural consequences of reporting",
      blocks: [
        {
          kind: "table",
          caption: "How reporting style changes behaviour",
          head: ["Style", "Effect"],
          rows: [
            ["Report used **punitively**, to allocate blame", "Managers conceal problems, dispute figures, and build slack into next year's budget"],
            ["Report used **diagnostically**, to find causes", "Managers surface problems early, because doing so is safe and useful"],
            ["Only **adverse** items investigated", "Favourable variances are never questioned, so out-of-date standards and quality shortcuts go undetected"],
            ["**Uncontrollable** items included in the assessment", "The whole report loses credibility, and the controllable items are dismissed with the rest"],
            ["**Single** measure emphasised", "Goal displacement — that measure is optimised at everything else's expense (Chapter 24)"],
            ["**Too much detail** for the level", "The report is not read, so no behaviour changes at all"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The point the whole paper has been building toward",
          md: "**A management accounting system is only as good as the decisions it changes.** The costing may be immaculate, the variances arithmetically perfect and the ratios correctly computed — and if the report reaches the wrong person, too late, in too much detail, or in a form that punishes rather than diagnoses, none of it alters a single decision. Getting the number right is the first half of the job; getting it used is the second, and it is the half that determines whether the first mattered.",
        },
      ],
      check: {
        q: "A company investigates only adverse variances. What is the principal risk?",
        options: [
          "Favourable variances will become adverse over time",
          "Out-of-date standards, quality shortcuts and manipulation go undetected, and better methods are never adopted elsewhere",
          "Managers will stop reporting favourable variances",
          "There is no risk, since favourable variances are by definition good news",
        ],
        correct: 1,
        explain:
          "A large FAVOURABLE variance may reveal an out-of-date standard, a quality shortcut that will cost more later, deferred spending, or a genuinely better method that ought to be adopted elsewhere. Investigating only bad news means the organisation never learns from good news and never detects manipulation — which is why exception reporting should apply to significant variances in BOTH directions.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Sending the same level of detail to every management level.",
      fix: "Detail decreases and summarisation increases up the organisation. Match the report to the recipient's decisions.",
    },
    {
      trap: "Applying exception reporting only to adverse variances.",
      fix: "A large favourable variance may reveal a stale standard, a quality shortcut or a better method worth copying.",
    },
    {
      trap: "Judging significance by absolute size alone.",
      fix: "Weigh percentage size, controllability, trend, the cost of investigating, and whether the standard is current.",
    },
    {
      trap: "Describing a report instead of interpreting it.",
      fix: "State the gap, rank what matters, link related items, identify a likely cause tied to the scenario, and recommend an action.",
    },
    {
      trap: "Including uncontrollable items in a manager's assessment.",
      fix: "It costs the whole report its credibility, so the controllable items get dismissed alongside the rest.",
    },
    {
      trap: "Treating one period's variance as a finding.",
      fix: "One month is an observation; a trend across several is a finding. Show trends in the report.",
    },
  ],
  keyTerms: [
    { term: "Management by exception", def: "Reporting and investigating only items outside a defined tolerance, so scarce management attention is directed usefully." },
    { term: "Tolerance", def: "The threshold beyond which a variance is reported as an exception." },
    { term: "Controllable item", def: "A cost or revenue the report's recipient can influence, and therefore the only kind they should be asked to explain." },
    { term: "Leading indicator", def: "A measure such as delivery reliability or complaints that changes before the financial result it predicts." },
  ],
  summary: [
    "A performance report must address one recipient, compare against a valid benchmark, and separate controllable from uncontrollable items.",
    "Detail decreases and summarisation increases as reports move up the organisation.",
    "Management by exception directs attention to items outside tolerance, judged on size, percentage, controllability, trend and investigation cost.",
    "Favourable variances deserve investigation too — they can reveal stale standards, quality shortcuts or better methods.",
    "Interpretation means stating the gap, ranking what matters, linking related items, identifying a cause and recommending action.",
    "Non-financial measures are leading indicators and belong in the report alongside the financial ones.",
    "Reporting style changes behaviour: punitive reporting conceals problems, diagnostic reporting surfaces them.",
    "A management accounting system is only as good as the decisions it changes.",
  ],
  knowledgeDiagnostic: [
    { q: "How should the level of detail in a report vary by management level?", a: "Operational reports are frequent and highly detailed; tactical reports are monthly and summarised by department; strategic reports are highly summarised with external comparison and exceptions only." },
    { q: "What factors determine whether a variance should be investigated?", a: "Absolute and percentage size, controllability by the recipient, whether it is a trend or a one-off, the cost of investigating against the likely benefit, and whether the standard is still current." },
    { q: "Why should favourable variances be investigated?", a: "They may reveal an out-of-date standard, a quality shortcut that will cost more later, deferred spending, manipulation, or a genuinely better method that should be adopted elsewhere." },
    { q: "What distinguishes interpretation from description?", a: "Description restates what the report shows. Interpretation identifies the magnitude, links related items, offers a cause tied to something specific in the scenario, and recommends an action or states what further information is needed." },
    { q: "How does reporting style affect behaviour?", a: "Punitive reporting makes managers conceal problems, dispute figures and build slack. Diagnostic reporting makes early disclosure safe. Including uncontrollable items costs the report its credibility altogether." },
  ],
  furtherStudy: [
    "Performance reporting, the balanced scorecard and behavioural consequences are examined in depth in **PM** and **APM**.",
    "This chapter closes the loop opened in Chapter 1: management accounting exists so that someone can decide something.",
  ],
}

/* ── Areas E and F chapter lists, in reading order ─────────────── */

export const MA_TREE_AREA_E: StudyChapter[] = [MA_TREE_21, MA_TREE_22, MA_TREE_23]
export const MA_TREE_AREA_F: StudyChapter[] = [MA_TREE_24, MA_TREE_25, MA_TREE_26, MA_TREE_27]


