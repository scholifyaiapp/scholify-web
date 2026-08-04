import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area D, second part — learning curves, and standard costing with the basic variances.
 * Chapters 22–23 of the PM reading tree, mapped to syllabus groups D2(d) and D3.
 *
 * Chapter 22 sits deliberately BEFORE the variance chapters, because a learning effect changes
 * the standard that every later variance is measured against — and a labour efficiency variance
 * computed against a standard that ignored learning is measuring the wrong thing entirely, which
 * is the link chapter 27's planning and operational split then formalises.
 *
 * Chapter 23 is MA revision extended, so it moves quickly through the six basic variances and
 * spends its space on the two things MA does not cover: what each variance actually tells a
 * manager, and the interdependence between them.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 22 · D2(d) ───────────────────────────────────────── */

export const PM_TREE_22: StudyChapter = {
  id: "PM-22",
  number: 22,
  paper: "PM",
  area: "D",
  title: "Learning curves",
  minutes: 18,
  syllabusRefs: ["D2(d)", "D2(e)"],
  intro:
    "Where work is labour-intensive and repetitive, the time per unit falls predictably as cumulative output doubles. Budgeting on the first unit's time overstates cost enormously — and budgeting on the steady state understates it just as badly early on.",
  outcomes: [
    "Explain the learning effect and the conditions required for it",
    "Apply the learning curve formula to find average and total time",
    "Calculate incremental time and cost for a batch",
    "Explain when learning ends and what happens then",
    "Explain the implications of learning for standard costing and variance analysis",
  ],
  sections: [
    {
      id: "the-formula",
      heading: "The formula, and using it",
      blocks: [
        {
          kind: "definition",
          term: "The learning effect",
          md: "Where a task is **labour-intensive** and **repetitive**, the **cumulative average time per unit** falls by a constant percentage every time cumulative output **doubles**. An 80% learning curve means that when output doubles, the cumulative average time per unit becomes 80% of what it was — so the saving is real but **decelerating**, because each doubling takes progressively more units.",
        },
        {
          kind: "formula",
          name: "The learning curve",
          expr: "y  =  ax^b\n\nwhere  y  =  cumulative AVERAGE time per unit for x units\n       a  =  time taken for the FIRST unit\n       x  =  cumulative number of units produced\n       b  =  the learning index  =  log of the learning rate  ÷  log of 2\n\nTotal time for x units  =  y  ×  x\n\nIncremental time for a batch  =  total time for the new cumulative total  −  total time for the previous cumulative total",
          note: "Provided in the exam. The single most important point is that y is the cumulative AVERAGE, not the time for the xth unit — so the total must be found by multiplying, and an incremental batch time by SUBTRACTING two totals. For an 80% curve b = log 0.8 / log 2 = −0.3219; for 90%, b = −0.1520. Where x is an exact power of 2 the doubling shortcut avoids the formula altogether.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The doubling shortcut, and when it works",
          md: "Where cumulative output is **1, 2, 4, 8, 16, 32 …** the formula is unnecessary: just multiply the cumulative average by the learning rate for each doubling. On an 80% curve with a first unit of 100 hours, the cumulative average is 100 at 1 unit, 80 at 2, 64 at 4, 51.2 at 8, and 40.96 at 16. This is faster and less error-prone than logs, and exam questions are frequently set at exact powers of 2 precisely so it can be used. Reach for the formula only when x is not a power of 2.",
        },
        {
          kind: "example",
          title: "Costing a batch with a learning effect",
          scenario:
            "Yarnfield Ltd has just completed the first unit of a new product, taking 400 labour hours. An 85% learning curve is expected to apply until the 16th unit, after which the time per unit will remain constant at the level reached for the 16th unit. Labour costs £15 an hour. A customer wants a quotation for units 9 to 16 inclusive, and separately for a follow-on order of units 17 to 24.",
          steps: [
            { label: "Find the cumulative average at 8 and at 16 units", detail: "Use the doubling shortcut, since both are powers of 2. At 1 unit: 400 hours. At 2: 400 × 0.85 = 340. At 4: 289. At 8: 245.65. At 16: 208.8025 hours." },
            { label: "Convert to total times", detail: "Total for 8 units = 8 × 245.65 = 1,965.20 hours. Total for 16 units = 16 × 208.8025 = 3,340.84 hours." },
            { label: "Find the incremental time for units 9 to 16", detail: "3,340.84 − 1,965.20 = 1,375.64 hours for those 8 units — an average of 171.96 hours each, well below the cumulative average of 208.80. That gap is why the cumulative average must never be used directly for a batch." },
            { label: "Cost the quotation for units 9 to 16", detail: "1,375.64 hours × £15 = £20,634.60 of labour cost for the batch." },
            { label: "Find the steady-state time for units 17 onwards", detail: "Learning ends AT the 16th unit, so the time for every subsequent unit equals the time the 16TH unit took — not the cumulative average at 16. Time for the 16th unit alone = total for 16 less total for 15. For 15 units the formula is needed, 15 not being a power of 2: y = 400 × 15^(−0.2345) = 211.99 hours, so total = 3,179.79 hours. Time for the 16th unit = 3,340.84 − 3,179.79 = 161.05 hours." },
            { label: "Cost units 17 to 24", detail: "8 units × 161.05 hours = 1,288.38 hours × £15 = £19,325.76. Note the follow-on batch is still CHEAPER than units 9 to 16 (1,375.64 hours) even though no further learning occurs, because units 9 to 16 included the slower early part of that range." },
            { label: "State the trap the figures expose", detail: "Quoting units 17 to 24 at the cumulative average of 208.80 hours would give 1,670.42 hours and £25,056 — overstating the cost by £5,730 and very likely losing the order. The steady state is the time for the LAST unit made under learning, not the average of all of them." },
          ],
          result:
            "**Units 9–16: 1,375.64 hours, £20,634.60. Units 17–24: 1,288.38 hours, £19,325.76.** Two distinctions do the work: the cumulative average is never a batch cost, and the steady-state time is the **last unit's** time — 161.05 hours here, against a cumulative average of 208.80 that would have overstated the follow-on quote by £5,730.",
        },
      ],
      check: {
        q: "On a 90% learning curve the first unit takes 200 hours. What is the cumulative average time per unit at 4 units?",
        options: ["180 hours", "162 hours", "144 hours", "200 hours"],
        correct: 1,
        explain:
          "162 hours. Two doublings: at 2 units the cumulative average is 200 × 0.9 = 180, and at 4 units it is 180 × 0.9 = 162. The doubling shortcut avoids the formula entirely wherever cumulative output is a power of 2, and it is both faster and less error-prone than logs.",
      },
    },
    {
      id: "conditions-and-implications",
      heading: "When learning applies, and what it does to variances",
      blocks: [
        {
          kind: "list",
          title: "The conditions the learning effect requires",
          items: [
            "**Labour-intensive** work — the effect is in human skill, so a highly automated process learns little.",
            "**Repetitive** tasks, so there is something to get better at.",
            "**A new product or process**, since learning is already exhausted on established work.",
            "**No significant breaks** in production, because skill decays and a gap causes learning to be partly relost.",
            "**A stable workforce**, since learning is embodied in people and high turnover resets it.",
            "**No major changes** to the product or method, which would restart the curve.",
            "**Motivated staff** who are not being held back by machine pace or materials supply.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "What happens when learning ends",
          md: "The curve does not continue forever. Learning **ends** when the workforce reaches the fastest the task can reasonably be done, and thereafter the time per unit is **constant at the time achieved for the last unit made under learning** — a steady state, not a continuing decline and not the cumulative average. Two consequences follow. A budget that extends the curve indefinitely will **understate** cost badly. And the steady-state figure is the one to use for a **standard cost** going forward, which makes the point where learning ends a genuinely important estimate rather than a technicality.",
        },
        {
          kind: "table",
          caption: "What learning does to each part of the system",
          head: ["Area", "The implication"],
          rows: [
            ["**Standard costing**", "A single standard labour time is **wrong throughout** the learning period — too tight at first, too loose later. Either set standards per batch or use the steady-state time and treat the learning period separately"],
            ["**Variance analysis**", "An adverse labour efficiency variance in early production may be **entirely expected learning**, not poor performance. Reporting it as a controllable variance is misleading and demotivating"],
            ["**Planning and operational variances**", "The proper treatment: revise the standard for the learning effect and split the variance into a **planning** part (the standard was wrong) and an **operational** part (chapter 27)"],
            ["**Pricing and quotations**", "The incremental time for the specific batch is the relevant figure. Using the cumulative average overstates a later batch and can lose the order"],
            ["**Target costing**", "Learning is a legitimate route to closing a cost gap (chapter 6), but only if the volume that drives it is achievable"],
            ["**Budgeting and cash flow**", "Labour cost per unit falls through the period, so a flat budget misstates both the monthly cost and the cash outflow"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The connection worth making in an answer",
          md: "Learning is the clearest case in the whole paper of a **standard being wrong rather than performance being poor**. If the standard was set at 400 hours and the fourth unit took 289, the favourable variance measures the **estimator's** work, not the workforce's. That is exactly the situation planning and operational variances exist for, and saying so links chapter 22 to chapter 27 in a way that examiners reward — because the underlying principle is that a variance is only useful if it isolates something a named manager could have controlled.",
        },
      ],
      check: {
        q: "Learning ends at the 16th unit. What time should be used for the 20th unit?",
        options: [
          "The cumulative average time at 16 units",
          "The time taken for the 16th unit itself",
          "The time for the first unit multiplied by the learning rate",
          "The average of the times for units 1 to 16",
        ],
        correct: 1,
        explain:
          "The time for the 16TH UNIT ITSELF — the last unit made under learning — which becomes the constant steady-state time. Using the cumulative average at 16 units substantially OVERSTATES the cost, because the average includes all the slow early units.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating y as the time for the xth unit.",
      fix: "y is the CUMULATIVE AVERAGE. Multiply by x for a total, and subtract two totals for a batch.",
    },
    {
      trap: "Costing a batch at the cumulative average time.",
      fix: "Use the incremental time — total for the new cumulative output less total for the previous.",
    },
    {
      trap: "Using the cumulative average as the steady-state time.",
      fix: "The steady state is the time for the LAST unit made under learning.",
    },
    {
      trap: "Using logs where cumulative output is a power of 2.",
      fix: "Apply the learning rate once per doubling — faster and less error-prone.",
    },
    {
      trap: "Reporting an early adverse labour efficiency variance as poor performance.",
      fix: "It may be expected learning. Revise the standard and split into planning and operational variances.",
    },
  ],
  keyTerms: [
    { term: "Learning effect", def: "The cumulative average time per unit falling by a constant percentage each time cumulative output doubles." },
    { term: "Learning rate", def: "The percentage the cumulative average becomes on doubling output — 80% or 90%, for instance." },
    { term: "Learning index (b)", def: "log of the learning rate divided by log 2; −0.3219 for 80% and −0.1520 for 90%." },
    { term: "Cumulative average time", def: "The y in y = ax^b — the average over all units to date, never a single unit's time." },
    { term: "Incremental time", def: "Total time for the new cumulative output less total time for the previous — the batch figure." },
    { term: "Steady state", def: "The constant time per unit once learning ends, equal to the last learning unit's time." },
  ],
  summary: [
    "The cumulative average time per unit falls by the learning rate each time cumulative output doubles.",
    "y = ax^b gives the cumulative average, so totals need multiplying and batch times need subtracting.",
    "Where cumulative output is a power of 2, apply the rate once per doubling instead of using logs.",
    "Learning ends at a steady state equal to the time for the last unit made under learning.",
    "A single standard time is wrong throughout learning, so early efficiency variances measure the estimate rather than performance.",
  ],
  knowledgeDiagnostic: [
    { q: "What exactly does y represent in y = ax^b?", a: "The cumulative average time per unit for x units — not the time for the xth unit." },
    { q: "How is the labour time for a specific batch found?", a: "Total time for the new cumulative output less total time for the previous cumulative output." },
    { q: "What time applies once learning ends?", a: "The time taken for the last unit made under learning, held constant thereafter — not the cumulative average." },
    { q: "Why is an early adverse labour efficiency variance misleading?", a: "Because expected learning has not been built into the standard, so the variance measures the estimate rather than the workforce's performance." },
    { q: "Name four conditions the learning effect requires.", a: "Labour-intensive repetitive work, a new product or process, no significant production breaks, and a stable workforce with no major method changes." },
  ],
}

/* ── Chapter 23 · D3 ──────────────────────────────────────────── */

export const PM_TREE_23: StudyChapter = {
  id: "PM-23",
  number: 23,
  paper: "PM",
  area: "D",
  title: "Standard costing and the basic variances",
  minutes: 18,
  syllabusRefs: ["D3(a)", "D3(b)", "D3(c)"],
  intro:
    "The six basic variances are MA revision, so this chapter moves through the arithmetic quickly and spends its space on the two things that actually earn PM marks: what each variance tells a manager, and how they interact.",
  outcomes: [
    "Explain the types of standard and the effect of the type chosen",
    "Calculate the material, labour and variable overhead variances",
    "Calculate the sales price and sales volume variances",
    "Explain what causes each variance and who controls it",
    "Explain the interdependence between variances",
  ],
  sections: [
    {
      id: "standards-and-variances",
      heading: "Types of standard, and the six variances",
      blocks: [
        {
          kind: "table",
          caption: "The four types of standard, and what each does to motivation",
          head: ["Type", "Set at", "Effect"],
          rows: [
            ["**Ideal**", "Perfect conditions, no waste, no idle time", "**Demotivating** — never achievable, so every variance is adverse and the target is ignored. Useful only to show the theoretical maximum"],
            ["**Attainable**", "Efficient working with an allowance for **normal** waste and downtime", "**The best choice for control and motivation** — demanding but achievable, which is where motivation peaks"],
            ["**Current**", "Conditions as they actually are now, including existing inefficiency", "Realistic for planning, but **builds in waste** and provides no incentive to improve"],
            ["**Basic**", "Left unchanged over a long period", "Useful only for showing **trends** over time; useless for current control because it becomes badly out of date"],
          ],
        },
        {
          kind: "formula",
          name: "The cost variances",
          expr: "MATERIAL\n  Price     =  (Standard price  −  Actual price)  ×  Actual quantity PURCHASED\n  Usage     =  (Standard quantity for actual production  −  Actual quantity USED)  ×  Standard price\n\nLABOUR\n  Rate      =  (Standard rate  −  Actual rate)  ×  Actual hours PAID\n  Efficiency=  (Standard hours for actual production  −  Actual hours WORKED)  ×  Standard rate\n  Idle time =  Idle hours  ×  Standard rate                     (always adverse)\n\nVARIABLE OVERHEAD\n  Expenditure =  Budgeted variable overhead for actual hours  −  Actual variable overhead\n  Efficiency  =  (Standard hours for actual production  −  Actual hours worked)  ×  Standard variable overhead rate",
          note: "Watch the quantity in each: material PRICE uses quantity PURCHASED while USAGE uses quantity USED — they differ whenever inventory changes. Labour RATE uses hours PAID and EFFICIENCY uses hours WORKED, the difference being idle time, which is separated out and is always adverse. A positive result under this sign convention is FAVOURABLE.",
        },
        {
          kind: "formula",
          name: "The sales variances",
          expr: "Sales PRICE     =  (Actual price  −  Standard price)  ×  Actual units sold\n\nSales VOLUME    =  (Actual units  −  Budgeted units)  ×  standard CONTRIBUTION per unit   [marginal costing]\n                =  (Actual units  −  Budgeted units)  ×  standard PROFIT per unit         [absorption costing]",
          note: "The sales volume variance is valued at standard CONTRIBUTION under marginal costing and standard PROFIT under absorption costing — and the question will tell you which system is in use. Getting this wrong changes the figure and is one of the most frequent errors in a reconciliation.",
        },
        {
          kind: "example",
          title: "Computing and interpreting the basic variances",
          scenario:
            "Kingsholm Ltd budgeted to make and sell 5,000 units at £60 each. The standard cost per unit is 4 kg of material at £5 and 2 hours of labour at £11. Actual results: 5,400 units made and sold at £57 each; 22,300 kg of material purchased and used, costing £108,155; 11,200 hours paid at a total cost of £126,560, of which 250 hours were idle. Kingsholm uses marginal costing; standard variable overhead is £3 per labour hour and actual variable overhead was £33,900.",
          steps: [
            { label: "Material price and usage", detail: "Actual price = £108,155/22,300 = £4.85 per kg. PRICE = (£5.00 − £4.85) × 22,300 = £3,345 FAVOURABLE. Standard quantity for 5,400 units = 21,600 kg. USAGE = (21,600 − 22,300) × £5 = £3,500 ADVERSE." },
            { label: "Labour rate, idle time and efficiency", detail: "Actual rate = £126,560/11,200 = £11.30. RATE = (£11.00 − £11.30) × 11,200 = £3,360 ADVERSE. IDLE TIME = 250 × £11 = £2,750 ADVERSE. Hours WORKED = 11,200 − 250 = 10,950. Standard hours for 5,400 units = 10,800. EFFICIENCY = (10,800 − 10,950) × £11 = £1,650 ADVERSE." },
            { label: "Variable overhead", detail: "EXPENDITURE = (10,950 hours × £3) − £33,900 = £32,850 − £33,900 = £1,050 ADVERSE. EFFICIENCY = (10,800 − 10,950) × £3 = £450 ADVERSE." },
            { label: "Sales price and volume", detail: "PRICE = (£57 − £60) × 5,400 = £16,200 ADVERSE. Standard contribution per unit = £60 − (4 × £5) − (2 × £11) − (2 × £3) = £60 − £20 − £22 − £6 = £12. VOLUME = (5,400 − 5,000) × £12 = £4,800 FAVOURABLE." },
            { label: "Read the pattern rather than the individual figures", detail: "A £3,345 FAVOURABLE material price sits beside a £3,500 ADVERSE usage — cheaper material used wastefully, which is the classic interdependence and very likely one decision, not two. Meanwhile a £16,200 adverse sales price bought only £4,800 of favourable volume, so the price cut destroyed £11,400 of contribution net." },
            { label: "Say who controls what", detail: "MATERIAL PRICE belongs to purchasing, but if it bought substandard material the USAGE variance is also purchasing's, not production's. LABOUR RATE is usually outside the supervisor's control — a pay award or an unplanned grade mix. IDLE TIME is management's, being caused by scheduling, breakdowns or materials shortage. SALES PRICE is the sales director's, and the volume it bought did not pay for it." },
          ],
          result:
            "The individually largest variance is the **£16,200 adverse sales price**, and the most instructive pairing is the **favourable material price against the adverse usage**. Reporting eight figures without connecting them would miss both points — which is why interpretation, not calculation, is where PM's marks are.",
        },
      ],
      check: {
        q: "22,300 kg were purchased and used at £4.85 against a standard £5.00, and standard usage for actual output was 21,600 kg. What are the price and usage variances?",
        options: [
          "Price £3,345 favourable, usage £3,500 adverse",
          "Price £3,240 favourable, usage £3,500 adverse",
          "Price £3,345 adverse, usage £3,500 favourable",
          "Price £3,345 favourable, usage £3,395 adverse",
        ],
        correct: 0,
        explain:
          "PRICE = (£5.00 − £4.85) × 22,300 kg actually purchased = £3,345 favourable. USAGE = (21,600 − 22,300) × the STANDARD price of £5 = £3,500 adverse. Usage is always valued at standard price, so that the price effect appears only once — in the price variance.",
      },
    },
    {
      id: "interdependence",
      heading: "Causes, control and interdependence",
      blocks: [
        {
          kind: "table",
          caption: "What causes each variance, and who is answerable",
          head: ["Variance", "Typical causes", "Usually controlled by"],
          rows: [
            ["**Material price**", "Supplier price change, different supplier, discount taken or lost, quality grade bought, exchange rates", "Purchasing — though a market-wide price move is nobody's fault"],
            ["**Material usage**", "Waste, spoilage, quality of material, machine condition, operator skill, theft", "Production — unless caused by the material bought, when it is purchasing's"],
            ["**Labour rate**", "Pay award, overtime premium, different grade of labour used, use of agency staff", "Personnel or senior management, rarely the supervisor"],
            ["**Labour efficiency**", "Skill and motivation, supervision, machine reliability, material quality, learning effect (chapter 22)", "Production supervision"],
            ["**Idle time**", "Machine breakdown, materials shortage, scheduling failure, industrial action", "Management — the causes are almost all outside the operators' control"],
            ["**Variable overhead expenditure**", "Price changes in power, consumables and indirect materials", "Whoever authorises that spending"],
            ["**Sales price**", "Discounting, competitor pricing, mix of customers, price war", "Sales management"],
            ["**Sales volume**", "Market conditions, marketing effectiveness, price decisions, product availability", "Sales — though it may be caused by a production shortfall"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Interdependence is the point of a PM variance answer",
          md: "Variances are rarely independent, and identifying the links is what distinguishes a PM answer from an MA one. The recurring patterns: **cheap material** produces a favourable price and an adverse usage, and often adverse labour efficiency too as workers struggle with it. **Cheaper labour** gives a favourable rate and an adverse efficiency, because a lower grade works more slowly and wastes more material. **A price cut** gives an adverse sales price and a favourable volume, and the question is whether the volume paid for the price. **Overtime** gives an adverse rate but may produce favourable volume by meeting demand. In every case the useful conclusion is about the **decision** that caused both figures, not about either one alone.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Where standard costing struggles in a modern environment",
          md: "Worth knowing because it is a regular discussion requirement. Standard costing assumes **stable, repetitive production**, so it fits poorly where products are customised or short-lived. It focuses on **cost and variance** rather than quality, delivery and customer satisfaction — the non-financial measures of chapter 30. Where production is highly **automated**, labour variances are trivial and the meaningful costs are overhead and materials. It can drive **dysfunctional behaviour**: buying cheap material to gain a price variance, or producing for inventory to spread fixed overhead. And in a **continuous improvement** culture, holding cost to a fixed standard is at odds with expecting it to fall — which is why some businesses use rolling or target-based standards instead.",
        },
        {
          kind: "list",
          title: "Reporting variances so they are useful",
          items: [
            "**Report against a flexed budget** (chapter 20), or the figures mix volume with performance.",
            "**Separate controllable from uncontrollable** variances, and hold each manager only to the first.",
            "**Investigate by exception**, using a materiality threshold rather than reporting everything.",
            "**Look for the decision behind a pair** of related variances rather than explaining each alone.",
            "**Ask whether the standard was right** before blaming performance — the planning and operational split (chapter 27).",
            "**Pair the financial variance with a non-financial measure** where the cause is quality or delivery.",
          ],
        },
      ],
      check: {
        q: "A favourable material price variance appears with an adverse usage variance and adverse labour efficiency. What is the most likely single cause?",
        options: [
          "Poor production supervision",
          "Cheaper, lower-quality material was bought — causing more waste and slower working",
          "A pay award to production staff",
          "An error in the standard cost",
        ],
        correct: 1,
        explain:
          "CHEAPER, LOWER-QUALITY MATERIAL. One purchasing decision explains all three: the favourable price, the extra waste driving adverse usage, and the slower working as staff struggle with poor material. The interdependence means the usage and efficiency variances belong to PURCHASING, not production.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using quantity used for the material price variance.",
      fix: "Price uses quantity PURCHASED, usage uses quantity USED. They differ when inventory changes.",
    },
    {
      trap: "Computing labour efficiency on hours paid.",
      fix: "Efficiency uses hours WORKED; the difference from hours paid is idle time, reported separately.",
    },
    {
      trap: "Valuing the sales volume variance at standard profit under marginal costing.",
      fix: "Marginal costing values it at standard CONTRIBUTION; absorption costing at standard profit.",
    },
    {
      trap: "Valuing the usage variance at actual price.",
      fix: "Always at standard price, so the price effect is counted once only.",
    },
    {
      trap: "Explaining each variance in isolation.",
      fix: "Find the decision that caused a related pair — cheap material, cheaper labour, a price cut.",
    },
  ],
  keyTerms: [
    { term: "Attainable standard", def: "Set at efficient working with an allowance for normal waste; the best basis for control and motivation." },
    { term: "Ideal standard", def: "Set at perfect conditions; demotivating because it is never achievable." },
    { term: "Basic standard", def: "Left unchanged over a long period, useful only for showing trends." },
    { term: "Idle time variance", def: "Idle hours at the standard rate; always adverse and usually management's responsibility." },
    { term: "Interdependence", def: "The links between variances, where one decision produces a favourable variance and an adverse one." },
  ],
  summary: [
    "Attainable standards suit control and motivation; ideal standards demotivate and basic standards go stale.",
    "Material price uses quantity purchased and usage quantity used, valued at standard price.",
    "Labour rate uses hours paid and efficiency hours worked, with idle time separated and always adverse.",
    "Sales volume is valued at standard contribution under marginal costing and standard profit under absorption.",
    "Interdependence is where the marks are — find the decision behind a related pair of variances.",
  ],
  knowledgeDiagnostic: [
    { q: "Which quantity is used for the material price variance, and why does it matter?", a: "Quantity PURCHASED, because the price was paid on what was bought — which differs from what was used whenever inventory changes." },
    { q: "How do labour rate and efficiency variances differ in the hours used?", a: "Rate uses hours PAID and efficiency hours WORKED; the difference is idle time, reported as its own always-adverse variance." },
    { q: "How is the sales volume variance valued?", a: "At standard contribution per unit under marginal costing, and standard profit per unit under absorption costing." },
    { q: "Give three examples of variance interdependence.", a: "Cheap material giving favourable price with adverse usage and efficiency; cheaper labour giving favourable rate with adverse efficiency; a price cut giving adverse sales price with favourable volume." },
    { q: "Why does standard costing fit a modern environment poorly?", a: "It assumes stable repetitive production, focuses on cost rather than quality and delivery, is trivial where labour is automated away, and can drive dysfunctional behaviour." },
  ],
}

export const PM_TREE_AREA_D_PART2: StudyChapter[] = [PM_TREE_22, PM_TREE_23]
