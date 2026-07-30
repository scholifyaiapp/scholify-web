import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * MA · Section B multi-task questions (MTQs) — the real exam format.
 *
 * MA's Section B is THREE multi-task questions worth TEN marks each, and the
 * blueprint names the areas they cover: budgeting, standard costing and
 * performance measurement. Each MTQ is one scenario with several linked tasks
 * read against it.
 *
 * There are 9 units here — three of each type — which is exactly three disjoint
 * sittings, so a learner attempting all three mocks never meets the same MTQ
 * twice and every sitting covers all three examined areas.
 *
 * These replace 350 generated 1-mark linked questions of the wrong shape. Every
 * scenario and task below is authored, and most tasks are numeric entry, because
 * MA's Section B is predominantly computational.
 */

/** A multiple-choice task within an MTQ. */
function task(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  marks: 1 | 2,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "MA",
    area,
    chapter,
    type: "mcq",
    stem,
    options,
    correct,
    explanation,
    marks,
    difficulty,
  }
}

/** A numeric-entry task within an MTQ. */
function calc(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  marks: 1 | 2,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  numericAnswer: number,
  unit: string,
  tolerance: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "MA",
    area,
    chapter,
    type: "number",
    stem,
    numericAnswer,
    unit,
    tolerance,
    explanation,
    marks,
    difficulty,
  }
}

/* ── Budgeting MTQs (Area D) ────────────────────────────────────── */

const MTQ_D1: OtCase = {
  id: "ma-mtq-d1",
  paper: "MA",
  area: "D",
  title: "Larchmere Ltd — building the budget",
  scenario:
    "Larchmere Ltd makes one product. Budgeted sales for next quarter are 24,000 units at $40 each. Opening finished goods inventory is 1,800 units and closing inventory is to be 2,500 units. Each unit requires 3 kg of material at $6 per kg; opening raw material inventory is 4,000 kg and closing is to be 5,200 kg. Each unit requires 0.4 direct labour hours. Five operators are each contracted for 1,750 hours per quarter at $16 per hour, with hours beyond that paid at one and a half times the basic rate. Fixed production overhead is budgeted at $96,000 for the quarter, including depreciation of $14,000.",
  questions: [
    calc("ma-mtq-d1", 1, "D", "MA-17", 2, "medium",
      "What is budgeted production for the quarter, in units?",
      24700, "units", 1,
      "Production = sales + closing inventory − opening inventory = 24,000 + 2,500 − 1,800 = 24,700 units. Finished goods stock is being built up by 700 units, so production must exceed sales by that amount."),
    calc("ma-mtq-d1", 2, "D", "MA-17", 2, "hard",
      "What is the materials purchases budget for the quarter, in kg?",
      75300, "kg", 1,
      "Usage = 24,700 units × 3 kg = 74,100 kg (driven by PRODUCTION, not sales). Purchases = usage + closing 5,200 − opening 4,000 = 75,300 kg. Two separate inventory adjustments are required — finished goods and raw materials."),
    calc("ma-mtq-d1", 3, "D", "MA-17", 2, "hard",
      "What is the total direct labour cost for the quarter, in $?",
      167120, "$", 5,
      "Hours needed = 24,700 × 0.4 = 9,880. Basic hours available = 5 × 1,750 = 8,750, so overtime = 1,130 hours. Basic 8,750 × $16 = $140,000; overtime 1,130 × $24 = $27,120. Total $167,120. Compare hours needed with hours available before assuming overtime."),
    calc("ma-mtq-d1", 4, "D", "MA-17", 2, "medium",
      "How much of the fixed production overhead should be EXCLUDED from the cash budget, in $?",
      14000, "$", 1,
      "Depreciation of $14,000 is an expense that involves no payment, so it is excluded from a cash budget entirely. The remaining $82,000 of fixed overhead represents cash costs and does belong in it."),
    task("ma-mtq-d1", 5, "D", "MA-16", 2, "medium",
      "Larchmere's sales director says demand could reach 30,000 units but the plant can produce at most 26,000. Which budget should be prepared first?",
      [
        "Sales, at 30,000 units, since demand determines revenue",
        "Production, because plant capacity is the principal budget factor",
        "Cash, because cash always constrains activity",
        "The master budget, working the others back from it",
      ],
      1,
      "The PRINCIPAL BUDGET FACTOR is whatever constrains activity, and here it is plant capacity at 26,000 units rather than demand at 30,000. Production is budgeted first and sales follow. Budgeting sales at 30,000 would produce a plan the business cannot execute."),
  ],
}

const MTQ_D2: OtCase = {
  id: "ma-mtq-d2",
  paper: "MA",
  area: "D",
  title: "Penhale Ltd — the cash budget",
  scenario:
    "Penhale Ltd is preparing a cash budget for January to March. Sales are $80,000 in January, $100,000 in February and $120,000 in March; December sales were $70,000. Thirty per cent of sales are for cash and the remaining 70% is collected in the month following sale. Purchases equal 50% of the FOLLOWING month's sales and are paid one month after purchase. Wages of $18,000 are paid in the month incurred. Depreciation is $4,000 per month. New equipment costing $45,000 will be paid for in February. Opening cash at 1 January is $12,000.",
  questions: [
    calc("ma-mtq-d2", 1, "D", "MA-17", 2, "medium",
      "What are total cash receipts in January, in $?",
      73000, "$", 1,
      "Cash sales 30% × $80,000 = $24,000, plus 70% of December's $70,000 = $49,000. Total $73,000. The credit portion of January's own sales arrives in February."),
    calc("ma-mtq-d2", 2, "D", "MA-17", 2, "hard",
      "What is the payment for purchases in February, in $?",
      50000, "$", 1,
      "February's payment relates to JANUARY's purchases, which were 50% of FEBRUARY's sales: 50% × $100,000 = $50,000. Two lags operate at once — purchases lead sales by a month and are then paid a month later."),
    calc("ma-mtq-d2", 3, "D", "MA-17", 2, "hard",
      "What is the closing cash balance at 31 January, in $?",
      27000, "$", 1,
      "Receipts $73,000, less December's purchases paid in January (50% × January sales $80,000 = $40,000) and wages $18,000 = net inflow $15,000. Opening $12,000 + $15,000 = $27,000. Depreciation is excluded."),
    calc("ma-mtq-d2", 4, "D", "MA-17", 2, "hard",
      "What is the closing cash balance at 28 February, in $?",
      0, "$", 1,
      "February receipts = (30% × 100,000 = $30,000) + (70% × 80,000 = $56,000) = $86,000. Payments: purchases $50,000, wages $18,000, equipment $45,000 = $113,000. Net outflow $27,000, so the balance falls from $27,000 to nil — the equipment purchase absorbs the whole surplus."),
    task("ma-mtq-d2", 5, "D", "MA-17", 2, "medium",
      "Penhale's budgeted profit for the quarter is healthy, yet cash falls to nil in February. Which explanation is valid?",
      [
        "The profit figure must be wrong",
        "Capital expenditure consumes cash without reducing profit, while depreciation reduces profit without consuming cash",
        "Depreciation should have been included in the cash budget",
        "Profit and cash should be equal over a quarter",
      ],
      1,
      "The $45,000 equipment payment reduces CASH but reaches profit only gradually as depreciation, while the $4,000 monthly depreciation reduces PROFIT and consumes no cash. Adding to that the timing gap on receivables, a profitable quarter can consume cash — which is precisely why the cash budget is prepared separately."),
  ],
}

const MTQ_D3: OtCase = {
  id: "ma-mtq-d3",
  paper: "MA",
  area: "D",
  title: "Rossmere Ltd — flexing the budget",
  scenario:
    "Rossmere Ltd budgeted to produce 10,000 units. Its budget was: direct materials $60,000, direct labour $40,000, variable overhead $20,000 and fixed overhead $30,000. Actual output was 12,000 units, and actual costs were direct materials $70,800, direct labour $49,200, variable overhead $25,000 and fixed overhead $31,500. The production manager's report includes an apportioned share of head office administration of $18,000, which is unaffected by output.",
  questions: [
    calc("ma-mtq-d3", 1, "D", "MA-18", 2, "medium",
      "What is the total FLEXED budget cost for 12,000 units, in $?",
      174000, "$", 1,
      "Variable costs flex by 12/10: materials $72,000, labour $48,000, variable overhead $24,000 = $144,000. Fixed overhead does NOT flex and stays at $30,000. Flexed total = $174,000."),
    calc("ma-mtq-d3", 2, "D", "MA-18", 2, "hard",
      "What is the total variance against the FLEXED budget, in $, treating adverse as a positive figure?",
      2500, "$", 1,
      "Actual total = $70,800 + $49,200 + $25,000 + $31,500 = $176,500, against the flexed $174,000 — $2,500 ADVERSE. Against the ORIGINAL budget of $150,000 the gap appears to be $26,500, but $24,000 of that is simply the cost of making 2,000 more units."),
    calc("ma-mtq-d3", 3, "D", "MA-18", 2, "medium",
      "What is the direct materials variance against the flexed budget, in $, treating favourable as a positive figure?",
      1200, "$", 1,
      "Flexed materials = $60,000 × 12/10 = $72,000, against actual $70,800 — $1,200 FAVOURABLE. Note that the fixed-budget comparison would have shown materials $10,800 adverse and prompted an investigation of the one cost being managed well."),
    task("ma-mtq-d3", 4, "D", "MA-18", 2, "hard",
      "Why should the apportioned head office charge be reported separately from the manager's assessed costs?",
      [
        "Because it is immaterial in size",
        "Because the manager cannot influence it, so including it is neither fair nor useful",
        "Because head office costs are variable",
        "Because it duplicates the fixed overhead already reported",
      ],
      1,
      "CONTROLLABILITY: a manager should be accountable only for what they can influence. An apportioned charge unaffected by output fails that test, so including it is unjust and useless — no available action changes it, and its presence invites the manager to dismiss the whole report."),
    task("ma-mtq-d3", 5, "D", "MA-18", 2, "medium",
      "What does the difference between Rossmere's fixed budget and its flexed budget represent?",
      [
        "A performance failure requiring investigation",
        "The volume effect of producing 2,000 more units than planned",
        "An error in the original budget",
        "The uncontrollable element of cost",
      ],
      1,
      "Fixed budget to flexed budget is the VOLUME effect — the consequence of operating at a different activity level, not of managing costs well or badly. Only flexed budget to actual measures performance, and separating the two is the whole purpose of flexing."),
  ],
}

/* ── Standard costing MTQs (Area E) ─────────────────────────────── */

const MTQ_E1: OtCase = {
  id: "ma-mtq-e1",
  paper: "MA",
  area: "E",
  title: "Cranmoor Ltd — material and labour variances",
  scenario:
    "Cranmoor Ltd's standard cost card shows 4 kg of material at $7.50 per kg and 1.5 direct labour hours at $16 per hour. In the period, actual production was 5,200 units. 21,500 kg of material were purchased and used at a total cost of $158,000. 8,100 labour hours were paid at a total cost of $132,030, of which 240 hours were idle time caused by a machine breakdown. The purchasing manager has applied for a bonus on the strength of a favourable material price variance.",
  questions: [
    calc("ma-mtq-e1", 1, "E", "MA-22", 2, "medium",
      "What is the material PRICE variance, in $, treating favourable as a positive figure?",
      3250, "$", 5,
      "Standard cost of the actual quantity = 21,500 × $7.50 = $161,250, against actual $158,000 = $3,250 FAVOURABLE. The price variance is computed on the quantity purchased, because that is when the price was paid."),
    calc("ma-mtq-e1", 2, "E", "MA-22", 2, "hard",
      "What is the material USAGE variance, in $, treating adverse as a positive figure?",
      5250, "$", 5,
      "Standard quantity for actual output = 5,200 × 4 kg = 20,800 kg. Actual 21,500 kg, so 700 kg too much × $7.50 STANDARD price = $5,250 ADVERSE. Valuing it at the actual price would let the price effect contaminate the usage variance."),
    calc("ma-mtq-e1", 3, "E", "MA-22", 2, "hard",
      "What is the labour IDLE TIME variance, in $, treating adverse as a positive figure?",
      3840, "$", 5,
      "240 idle hours × $16 standard rate = $3,840 ADVERSE. Idle time is always adverse — hours were paid for and produced nothing. Isolating it prevents the efficiency variance absorbing it and concealing that the cause was downtime rather than working pace."),
    calc("ma-mtq-e1", 4, "E", "MA-22", 2, "hard",
      "What is the labour EFFICIENCY variance, in $, treating adverse as a positive figure?",
      960, "$", 5,
      "Hours WORKED = 8,100 paid − 240 idle = 7,860. Standard hours for actual output = 5,200 × 1.5 = 7,800. Efficiency = $16 × (7,800 − 7,860) = $960 ADVERSE. Efficiency uses hours WORKED; the rate variance uses hours PAID."),
    task("ma-mtq-e1", 5, "E", "MA-22", 2, "hard",
      "How should the purchasing manager's bonus application be assessed?",
      [
        "Pay it, since the price variance is favourable by $3,250",
        "Assess the net effect: the $3,250 price gain sits against $5,250 of adverse usage, suggesting cheaper, poorer material",
        "Refuse it, because bonuses should never be paid on variances",
        "Defer it until the labour variances are resolved",
      ],
      1,
      "Variances are INTERDEPENDENT. A favourable price variance beside a materially larger adverse usage variance is the classic signature of buying cheaper, lower-grade material. Paying on the price variance alone would reward a decision that cost the company money overall — assess the net effect and establish whether the specification changed."),
  ],
}

const MTQ_E2: OtCase = {
  id: "ma-mtq-e2",
  paper: "MA",
  area: "E",
  title: "Aldermoor Ltd — overhead and sales variances",
  scenario:
    "Aldermoor Ltd budgeted fixed production overhead of $120,000 for a budgeted 8,000 labour hours, giving a standard rate of $15 per hour; the standard is 1.5 hours per unit. Budgeted sales were 5,000 units at $95 each, with a standard full cost of $78, so standard profit is $17 per unit. Actual results: output and sales 5,200 units at an average selling price of $93, produced in 7,860 labour hours, with actual fixed overhead of $126,000.",
  questions: [
    calc("ma-mtq-e2", 1, "E", "MA-22", 2, "medium",
      "What is the fixed overhead EXPENDITURE variance, in $, treating adverse as a positive figure?",
      6000, "$", 1,
      "Budgeted $120,000 less actual $126,000 = $6,000 ADVERSE. This is the ONE variance not flexed to actual activity, because fixed overhead was expected to be $120,000 whatever the output — the activity effect appears separately as the volume variance."),
    calc("ma-mtq-e2", 2, "E", "MA-22", 2, "hard",
      "What is the fixed overhead VOLUME variance, in $, treating adverse as a positive figure?",
      3000, "$", 1,
      "Standard hours for actual output = 5,200 × 1.5 = 7,800. Volume variance = $15 × (7,800 − 8,000 budgeted hours) = $3,000 ADVERSE. Output measured in standard hours fell short of budget, so overhead was under-absorbed."),
    calc("ma-mtq-e2", 3, "E", "MA-22", 2, "hard",
      "What is the fixed overhead CAPACITY variance, in $, treating adverse as a positive figure?",
      2100, "$", 1,
      "Capacity = $15 × (7,860 actual hours worked − 8,000 budgeted) = $2,100 ADVERSE — fewer hours were worked than budgeted. The remaining $900 of the volume variance is the efficiency element, and $2,100 + $900 = the $3,000 volume variance."),
    calc("ma-mtq-e2", 4, "E", "MA-22", 2, "medium",
      "What is the sales PRICE variance, in $, treating adverse as a positive figure?",
      10400, "$", 1,
      "Actual units sold × (actual price − standard price) = 5,200 × ($93 − $95) = $10,400 ADVERSE. It is computed on units ACTUALLY sold, not budgeted units."),
    calc("ma-mtq-e2", 5, "E", "MA-22", 2, "hard",
      "What is the sales VOLUME variance, in $, treating favourable as a positive figure?",
      3400, "$", 1,
      "(5,200 actual − 5,000 budgeted) × $17 standard PROFIT per unit = 200 × $17 = $3,400 FAVOURABLE. It is valued at standard MARGIN, not selling price, because the extra units brought extra variable cost with them. Note the price cut of $2 cost more than the volume gain earned."),
  ],
}

const MTQ_E3: OtCase = {
  id: "ma-mtq-e3",
  paper: "MA",
  area: "E",
  title: "Wenmere Ltd — reconciling budgeted to actual profit",
  scenario:
    "Wenmere Ltd budgeted a profit of $85,000 for the period under absorption costing. The variances for the period were: sales volume $3,400 favourable; sales price $10,400 adverse; material price $3,250 favourable; material usage $5,250 adverse; labour rate $2,430 adverse; labour idle time $3,840 adverse; labour efficiency $960 adverse; fixed overhead expenditure $6,000 adverse; fixed overhead volume $3,000 adverse. Wenmere's material usage variance has been adverse and worsening in each of the last four periods.",
  questions: [
    calc("ma-mtq-e3", 1, "E", "MA-23", 2, "medium",
      "What is the standard profit on actual sales, in $?",
      88400, "$", 1,
      "Budgeted profit $85,000 plus the sales volume variance $3,400 favourable = $88,400. Adding the volume variance restates the budget for the volume actually SOLD — this is the flexing step in an operating statement."),
    calc("ma-mtq-e3", 2, "E", "MA-23", 2, "hard",
      "What is actual profit for the period, in $?",
      59770, "$", 10,
      "$85,000 + 3,400 − 10,400 + 3,250 − 5,250 − 2,430 − 3,840 − 960 − 6,000 − 3,000 = $59,770. Favourable variances ADD and adverse DEDUCT. If the reconciliation does not reach the stated actual profit, check the signs before the arithmetic."),
    calc("ma-mtq-e3", 3, "E", "MA-23", 2, "medium",
      "What is the total of the LABOUR variances, in $, treating adverse as a positive figure?",
      7230, "$", 1,
      "Rate $2,430 + idle time $3,840 + efficiency $960 = $7,230 ADVERSE, of which more than half is idle time. Grouping variances by cost element is what makes an operating statement actionable rather than a list of nine numbers."),
    task("ma-mtq-e3", 4, "E", "MA-23", 2, "hard",
      "Which item should be raised first with management, and why?",
      [
        "The sales price variance, because it is the largest single figure",
        "The material usage variance, because it is adverse and WORSENING across four periods",
        "The labour rate variance, because pay rates are controllable",
        "The fixed overhead volume variance, because it reflects capacity",
      ],
      1,
      "A deteriorating TREND across four periods indicates a process problem rather than a bad month, and it will keep growing until addressed. Size alone would point to the sales price variance — but one month's largest figure is an observation, whereas four periods of worsening is a finding."),
    task("ma-mtq-e3", 5, "E", "MA-23", 2, "hard",
      "If Wenmere prepared this statement under MARGINAL costing instead, which change would occur?",
      [
        "The sales price variance would be valued differently",
        "The sales volume variance would be valued at contribution, and there would be no fixed overhead volume variance",
        "The material variances would be excluded",
        "Actual profit would be unchanged",
      ],
      1,
      "Two changes only: the sales volume variance is valued at CONTRIBUTION rather than profit, and there is NO fixed overhead volume variance because nothing is absorbed. Actual profit would also differ, since fixed overhead in the inventory movement is treated differently."),
  ],
}

/* ── Performance measurement MTQs (Area F) ──────────────────────── */

const MTQ_F1: OtCase = {
  id: "ma-mtq-f1",
  paper: "MA",
  area: "F",
  title: "Barrowfield Ltd — ratio analysis",
  scenario:
    "Barrowfield Ltd reports for the year: revenue $5,200,000; cost of sales $3,640,000; operating profit $520,000; capital employed $3,400,000; inventory $420,000; trade receivables $610,000; trade payables $380,000; credit purchases $3,500,000. In the prior year revenue was $4,000,000, operating profit $480,000 and capital employed $2,400,000. All sales are on credit.",
  questions: [
    calc("ma-mtq-f1", 1, "F", "MA-25", 2, "medium",
      "What is ROCE for the current year, as a percentage to one decimal place?",
      15.3, "%", 0.1,
      "ROCE = operating profit ÷ capital employed × 100 = 520 ÷ 3,400 × 100 = 15.3%. In the prior year it was 480 ÷ 2,400 = 20.0%, so ROCE has fallen 4.7 percentage points despite profit rising — which is why the decomposition matters."),
    calc("ma-mtq-f1", 2, "F", "MA-25", 2, "medium",
      "What is the operating profit margin for the current year, as a percentage to one decimal place?",
      10, "%", 0.1,
      "520 ÷ 5,200 × 100 = 10.0%, down from 480 ÷ 4,000 = 12.0%. Revenue grew 30% while profit grew only 8%, so the extra sales were won at a lower margin — possibly through discounting."),
    calc("ma-mtq-f1", 3, "F", "MA-25", 2, "hard",
      "What is inventory holding days, to one decimal place?",
      42.1, "days", 0.2,
      "Inventory ÷ COST OF SALES × 365 = 420 ÷ 3,640 × 365 = 42.1 days. The denominator is cost of sales because inventory is held at cost; using revenue would give 29.5 days and understate the holding period."),
    calc("ma-mtq-f1", 4, "F", "MA-25", 2, "hard",
      "What is the working capital cycle, in days to one decimal place?",
      45.3, "days", 0.3,
      "Inventory 42.1 + receivables (610 ÷ 5,200 × 365 = 42.8) − payables (380 ÷ 3,500 × 365 = 39.6) = 45.3 days. This is the period cash is tied up and must be financed — shortening it by 10 days would release roughly $100,000."),
    task("ma-mtq-f1", 5, "F", "MA-25", 2, "hard",
      "What does the decomposition of the fall in ROCE reveal?",
      [
        "Only the margin deteriorated; asset productivity was unchanged",
        "Both margin and asset turnover fell — sales grew at lower margin on an asset base that grew faster than revenue",
        "Only asset turnover deteriorated; the margin was unchanged",
        "ROCE fell because capital employed was measured inconsistently",
      ],
      1,
      "Margin fell from 12.0% to 10.0% AND asset turnover from 1.67 to 1.53 times (5,200 ÷ 3,400). Capital employed grew 42% against revenue growth of 30%, so the new investment is not yet generating proportionate sales. Both components deteriorating is the finding — 'ROCE fell' is not."),
  ],
}

const MTQ_F2: OtCase = {
  id: "ma-mtq-f2",
  paper: "MA",
  area: "F",
  title: "Thornmere Group — divisional performance",
  scenario:
    "Thornmere Group assesses both its divisions on return on investment. Division P reports profit of $900,000 on capital employed of $3,000,000; its plant is eleven years old and largely written down. Division Q reports profit of $1,400,000 on capital employed of $8,000,000; its plant was replaced last year. The group's cost of capital is 12%. Head office has concluded that P is better managed and is considering transferring investment funds from Q to P. Division P has also declined a project offering a 16% return.",
  questions: [
    calc("ma-mtq-f2", 1, "F", "MA-25", 2, "easy",
      "What is Division P's return on investment, as a percentage?",
      30, "%", 0.1,
      "ROI = $900,000 ÷ $3,000,000 × 100 = 30%. Division Q's is $1,400,000 ÷ $8,000,000 = 17.5%, so on ROI alone P appears far superior — which is the conclusion the scenario is testing."),
    calc("ma-mtq-f2", 2, "F", "MA-25", 2, "medium",
      "What is Division P's residual income, in $?",
      540000, "$", 1,
      "RI = $900,000 − (12% × $3,000,000 = $360,000) = $540,000. Division Q's is $1,400,000 − (12% × $8,000,000 = $960,000) = $440,000 — so P is still ahead but by far less than the ROI gap of 30% against 17.5% suggests."),
    task("ma-mtq-f2", 3, "F", "MA-25", 2, "hard",
      "Why is comparing the two divisions on ROI unsound?",
      [
        "Because the divisions are different sizes",
        "Because asset age distorts both measures: P's written-down plant flatters its ROI while Q looks worse for having invested",
        "Because ROI ignores the cost of capital entirely",
        "Because ROI cannot be calculated for a division",
      ],
      1,
      "P's eleven-year-old plant gives a small capital employed figure and a flattered ROI; Q's newly replaced plant sits near full cost and depresses its ROI — precisely BECAUSE it invested. The comparison measures accounting depreciation rather than management, and it also discourages replacement."),
    task("ma-mtq-f2", 4, "F", "MA-25", 2, "hard",
      "Why did Division P decline a project offering a 16% return?",
      [
        "Because 16% is below the group's 12% cost of capital",
        "Because accepting it would dilute P's measured ROI from 30% toward 16%, even though the group benefits",
        "Because the project's residual income would be negative",
        "Because P has no capital available",
      ],
      1,
      "The project earns above the 12% cost of capital so the GROUP gains, but accepting it lowers P's measured average — giving a manager judged on ROI an incentive to reject it. Residual income would rise, which is why RI is the goal-congruent measure."),
    task("ma-mtq-f2", 5, "F", "MA-25", 2, "hard",
      "What is the principal objection to transferring funds from Q to P?",
      [
        "P has insufficient management capacity",
        "It adds capital to a division already incentivised to reject good projects, and starves one whose low ROI is an artefact of recent investment",
        "Transfers between divisions are not permitted",
        "Q's residual income exceeds P's",
      ],
      1,
      "The proposal makes both problems worse: P's high ROI means any new project dilutes its average, so it will keep rejecting group-beneficial investment; and Q would be starved of funds for a reason that is an accounting artefact rather than a performance failure. Note Q's RI is lower than P's, so option 4 is factually wrong."),
  ],
}

const MTQ_F3: OtCase = {
  id: "ma-mtq-f3",
  paper: "MA",
  area: "F",
  title: "Kelsmere Services — measures and behaviour",
  scenario:
    "Kelsmere Services runs a customer contact centre. Staff are assessed solely on calls handled per hour, and that figure has improved every month for six months. Over the same period, customer satisfaction has fallen from 84% to 67%, repeat contacts about the same issue have risen 40%, and staff turnover has risen from 14% to 26%. A manager proposes raising the calls-per-hour target further. Separately, the operations director has reduced the packaging specification on a despatch line from three protective layers to one, saving $2.40 per parcel; transit damage has risen from 0.1% to 2.4%.",
  questions: [
    task("ma-mtq-f3", 1, "F", "MA-24", 2, "medium",
      "What is happening in the contact centre?",
      [
        "Staff are deliberately underperforming",
        "Goal displacement: the measure rewards ENDING calls rather than resolving them, so it improves while the objective is defeated",
        "The satisfaction survey is unreliable",
        "Call volumes have exceeded capacity",
      ],
      1,
      "GOAL DISPLACEMENT. Calls per hour rewards ending calls, so the rational response is to close them quickly — producing exactly this pattern. It is also self-defeating, because unresolved calls generate the repeat contacts, so the measure is partly counting the same problem twice."),
    task("ma-mtq-f3", 2, "F", "MA-24", 2, "hard",
      "Which additional measure would most effectively prevent the gaming?",
      [
        "Total calls received per day",
        "First-contact resolution rate, because it deteriorates precisely when calls per hour is gamed",
        "Average call cost",
        "Number of staff employed",
      ],
      1,
      "A balanced set needs at least one measure that gets WORSE when the primary one is gamed. FIRST-CONTACT RESOLUTION is exactly that: closing calls quickly without resolving them raises calls per hour and lowers resolution. The others move with volume or cost and would not expose the trade-off."),
    task("ma-mtq-f3", 3, "F", "MA-24", 2, "medium",
      "What does the rise in staff turnover from 14% to 26% most likely represent?",
      [
        "An unrelated labour market change",
        "A consequence of driving throughput alone, and a leading indicator of further service deterioration",
        "Evidence that the calls-per-hour target is too low",
        "A measurement error",
      ],
      1,
      "Driving throughput alone burns staff out, and turnover is a LEADING indicator: replacing experienced staff will worsen resolution and satisfaction further with a lag. It also carries direct costs in recruitment, training and lost productivity."),
    calc("ma-mtq-f3", 4, "F", "MA-26", 2, "hard",
      "The despatch line handles 50,000 parcels a year and a damaged parcel costs $180 to replace and redeliver. What is the annual NET effect of the packaging change, in $ (a cost as a positive figure)?",
      87000, "$", 500,
      "Packaging saving = 50,000 × $2.40 = $120,000. Damage rose from 0.1% (50 parcels) to 2.4% (1,200), so 1,150 extra failures × $180 = $207,000. Net effect = $207,000 − $120,000 = $87,000 ADDITIONAL cost. The 'saving' moved cost rather than removing it."),
    task("ma-mtq-f3", 5, "F", "MA-26", 2, "hard",
      "How should the packaging change be described?",
      [
        "A genuine cost reduction, since the standard cost per parcel fell",
        "A false economy: cost was transferred to replacement and redelivery rather than removed",
        "Value engineering, since the specification was redesigned",
        "Business process re-engineering",
      ],
      1,
      "A FALSE ECONOMY. Genuine cost reduction lowers the standard permanently WITHOUT sacrificing quality or function — here function was sacrificed and the cost reappeared, larger, as replacement and redelivery, plus unmeasured reputational damage. The test is always whether cost was removed or merely moved."),
  ],
}

/*
 * Three disjoint mock forms of three MTQs each, and every form contains one
 * budgeting, one standard costing and one performance measurement unit — which is
 * how the real MA Section B is composed.
 */
export const MA_MTQ_CASES: OtCase[] = [
  // Form 1
  MTQ_D1, MTQ_E1, MTQ_F1,
  // Form 2
  MTQ_D2, MTQ_E2, MTQ_F2,
  // Form 3
  MTQ_D3, MTQ_E3, MTQ_F3,
]
