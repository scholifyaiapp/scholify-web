import type { AccaQuestion } from "@/lib/acca-content"
/* PM bank wave 3b — areas C+D, 70 verified originals (2026-07-10). */
export const PM_WAVE2B: AccaQuestion[] = [
  /* ───────────── C — Budgeting & control (36) ───────────── */
  {
    id: "PM2-C-01", paper: "PM", area: "C", type: "mcq",
    stem: "Which of the following best describes a rolling (continuous) budget?",
    options: [
      "A budget that is restated to reflect the actual activity level achieved",
      "A budget in which every activity must be justified from a zero base each period",
      "A budget that is continuously updated by adding a further accounting period as the earliest period expires",
      "A budget built by taking the prior year's figures and adjusting for inflation",
    ],
    correct: 2,
    explanation:
      "A rolling budget always extends a constant planning horizon (e.g. 12 months ahead) by adding a new quarter or month as the oldest one lapses. The distractors describe a flexible budget, zero-based budgeting and incremental budgeting respectively — a classic definitions mix-up.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-02", paper: "PM", area: "C", type: "mcq",
    stem: "Under zero-based budgeting (ZBB), the budget for each activity is:",
    options: [
      "Justified in full for each budget period, as though the activity were being undertaken for the first time",
      "Set at last year's amount plus an allowance for inflation",
      "Prepared only for activities that are new in the period",
      "Fixed at zero growth over the prior year",
    ],
    correct: 0,
    explanation:
      "ZBB requires every activity (usually packaged as 'decision packages') to be justified from a nil base each period — nothing is carried forward automatically. It applies to ALL activities, not just new ones, and 'zero' refers to the starting base, not zero growth.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-03", paper: "PM", area: "C", type: "mcq",
    stem: "The main criticism of incremental budgeting is that it:",
    options: [
      "Is extremely time-consuming because every cost must be justified from scratch",
      "Carries forward past inefficiencies and budgetary slack without challenge",
      "Cannot incorporate an allowance for inflation",
      "Requires a detailed analysis of activities and cost drivers",
    ],
    correct: 1,
    explanation:
      "Because incremental budgets start from last year's figures, any waste or padding built into the base is perpetuated and never questioned. 'Time-consuming justification from scratch' is the drawback of ZBB, and activity analysis is a feature of activity-based budgeting — incremental budgeting is actually quick and does handle inflation (crudely).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-04", paper: "PM", area: "C", type: "mcq",
    stem: "Nexa Co uses activity-based budgeting. Budgeted production is 60,000 units, made in batches of 500 units. Each batch requires one machine set-up, and the budgeted cost per set-up is $240. What is the budgeted set-up cost for the period?",
    options: ["$240", "$28,800", "$120,000", "$14,400,000"],
    correct: 1,
    explanation:
      "Set-ups are driven by batches, not units: 60,000 ÷ 500 = 120 set-ups × $240 = $28,800. $14,400,000 comes from multiplying units by the set-up cost; $120,000 comes from multiplying the batch SIZE (500) by $240 as if it were the number of batches; $240 is just the rate per set-up.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-05", paper: "PM", area: "C", type: "mcq",
    stem: "A technology company operates in a fast-moving market where an annual budget set in January is unreliable by June. Which budgeting system most directly addresses this problem?",
    options: [
      "Incremental budgeting",
      "Zero-based budgeting",
      "A fixed annual budget with quarterly variance reports",
      "Rolling budgets",
    ],
    correct: 3,
    explanation:
      "Rolling budgets are re-forecast regularly (e.g. every quarter), so plans always reflect current conditions — the remedy for budgets that go stale in a dynamic environment. ZBB tackles unjustified base costs, not staleness; incremental and fixed annual budgets make the staleness problem worse.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-06", paper: "PM", area: "C", type: "number",
    stem: "Total production overhead was $86,000 at an output of 12,000 units and $110,000 at 18,000 units. There are no step costs in this range. Using the high–low method, estimate total overhead at 15,000 units, in $.",
    numericAnswer: 98000, unit: "$",
    explanation:
      "Variable cost per unit = (110,000 − 86,000) ÷ (18,000 − 12,000) = $4. Fixed cost = 86,000 − (12,000 × 4) = $38,000. At 15,000 units: 38,000 + (15,000 × 4) = $98,000. The trap is forgetting to strip the fixed element before extrapolating.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-07", paper: "PM", area: "C", type: "mcq",
    stem: "Total costs were $70,000 at 10,000 units and $94,000 at 16,000 units. Fixed costs step up by $6,000 once output exceeds 14,000 units. What is the estimated total cost of producing 17,000 units?",
    options: ["$91,000", "$97,000", "$98,000", "$103,000"],
    correct: 1,
    explanation:
      "Remove the step from the high point first: 94,000 − 6,000 = 88,000. Variable cost = (88,000 − 70,000) ÷ 6,000 = $3/unit; fixed (below step) = 70,000 − 30,000 = $40,000. At 17,000 units (above the step): 40,000 + 6,000 + (17,000 × 3) = $97,000. $98,000 ignores the step entirely; $91,000 removes the step but forgets to add it back at 17,000 units; $103,000 adds the step twice.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-08", paper: "PM", area: "C", type: "number",
    stem: "The first unit of a new product took 100 hours. A 90% learning curve applies (cumulative-average-time model). What is the TOTAL time for the first 4 units, in hours?",
    numericAnswer: 324, unit: "hours",
    explanation:
      "Each doubling of cumulative output multiplies the cumulative AVERAGE time by 90%: average at 2 units = 90 hrs; at 4 units = 81 hrs. Total = 4 × 81 = 324 hours. The trap is treating 81 hours as the total, or applying the rate to total time instead of the average.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-09", paper: "PM", area: "C", type: "mcq",
    stem: "The first unit of a product took 500 hours and an 80% learning curve applies (cumulative-average-time model). How long will the third and fourth units take IN TOTAL?",
    options: ["320 hours", "480 hours", "800 hours", "1,280 hours"],
    correct: 1,
    explanation:
      "Total for 4 units = 4 × 500 × 0.8² = 1,280 hrs. Total for 2 units = 2 × 500 × 0.8 = 800 hrs. Units 3 and 4 = 1,280 − 800 = 480 hours. Choosing 1,280 gives the total for all four units; 800 is the total for the first two; 320 is the cumulative average time per unit at 4 units, not an incremental time.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-10", paper: "PM", area: "C", type: "number",
    stem: "The first unit of a product took 200 hours. The first TWO units took 360 hours in total. Under the cumulative-average-time model, what is the learning rate, in % (e.g. enter 85 for 85%)?",
    numericAnswer: 90, unit: "%",
    explanation:
      "Cumulative average at 2 units = 360 ÷ 2 = 180 hrs. Learning rate = 180 ÷ 200 = 90%. The classic error is dividing the second unit's incremental time (160 hrs) by the first unit's time, which gives 80% — the rate compares cumulative AVERAGES, not individual unit times.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-11", paper: "PM", area: "C", type: "mcq",
    stem: "In which of the following situations is a learning-curve effect LEAST likely to arise?",
    options: [
      "A complex manual assembly task being performed for the first time",
      "A repetitive labour-intensive process with a stable workforce",
      "A highly automated process where output speed is machine-paced",
      "Early production of a new hand-built product",
    ],
    correct: 2,
    explanation:
      "Learning arises from human repetition; where the machine dictates the pace, workers becoming faster cannot shorten cycle time, so no learning effect is observed. The other three are precisely the conditions (labour-intensive, repetitive, early-stage, low turnover) under which learning IS expected — reversing this is the common error.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-12", paper: "PM", area: "C", type: "mcq",
    stem: "Using time-series analysis with an ADDITIVE model, the trend value of sales for Quarter 4 is 1,000 units and the seasonal variation for Quarter 4 is −80. What is the forecast for Quarter 4?",
    options: ["800 units", "920 units", "1,000 units", "1,080 units"],
    correct: 1,
    explanation:
      "Additive model: forecast = trend + seasonal variation = 1,000 + (−80) = 920 units. 1,080 adds instead of subtracting (sign error); 1,000 ignores seasonality; 800 treats the −80 as a multiplicative index of 80%.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-13", paper: "PM", area: "C", type: "mcq",
    stem: "A trend line is given by y = 400 + 20x, where x is the quarter number. The seasonal index for Quarter x = 15 is 110% (multiplicative model). What is the sales forecast for that quarter?",
    options: ["630 units", "700 units", "770 units", "810 units"],
    correct: 2,
    explanation:
      "Trend at x = 15: 400 + (20 × 15) = 700. Multiplicative model: 700 × 1.10 = 770 units. 700 forgets the seasonal adjustment; 630 applies the index the wrong way (×0.90); 810 adds 110 as if the index were an additive variation.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-14", paper: "PM", area: "C", type: "mcq",
    stem: "A standard cost card shows: materials 3 kg at $4/kg; labour 2 hours at $9/hour; variable overhead $3 per labour hour; fixed overhead absorbed at $5 per labour hour. What is the standard MARGINAL cost per unit?",
    options: ["$30", "$36", "$40", "$46"],
    correct: 1,
    explanation:
      "Marginal cost includes only variable items: materials 12 + labour 18 + variable overhead (2 × 3) 6 = $36. $46 wrongly includes the absorbed fixed overhead (that is the full absorption cost); $30 omits variable overhead as well; $40 excludes variable overhead but includes fixed overhead — the exact reverse of the rule.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-15", paper: "PM", area: "C", type: "mcq",
    stem: "An 'ideal' standard is best described as a standard that:",
    options: [
      "Is based on current working conditions, including current inefficiencies",
      "Is left unchanged over long periods so trends can be observed",
      "Is achievable under efficient, but realistic, operating conditions",
      "Assumes perfect operating conditions with no allowance for waste or idle time",
    ],
    correct: 3,
    explanation:
      "Ideal standards assume perfection — no wastage, breakdowns or idle time — and therefore usually generate adverse variances and can demotivate staff. The distractors define current, basic and attainable standards; matching each name to its definition is the tested skill.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-16", paper: "PM", area: "C", type: "mcq",
    stem: "Brixa Co purchased and used 5,000 kg of material for $21,500. The standard is 4 kg per unit at $4.20 per kg, and 1,300 units were produced. What is the material PRICE variance?",
    options: ["$500 favourable", "$340 favourable", "$500 adverse", "$840 favourable"],
    correct: 2,
    explanation:
      "Price variance = (standard price − actual price) × actual quantity = (5,000 × 4.20) − 21,500 = 21,000 − 21,500 = $500 adverse (paid more than standard). $500 favourable flips the sign; $840 favourable is the usage variance ((5,200 − 5,000) × 4.20); $340 favourable is the TOTAL material cost variance (21,840 − 21,500).",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-17", paper: "PM", area: "C", type: "mcq",
    stem: "The standard material usage is 3 kg per unit at a standard price of $5 per kg. Actual output was 2,000 units, using 6,400 kg purchased at $5.25 per kg. What is the material USAGE variance?",
    options: ["$2,000 favourable", "$400 adverse", "$2,000 adverse", "$2,100 adverse"],
    correct: 2,
    explanation:
      "Usage variance = (standard quantity for actual output − actual quantity) × STANDARD price = (6,000 − 6,400) × 5 = $2,000 adverse (used more than standard). $2,100 adverse wrongly values the excess kg at the ACTUAL price of $5.25; $400 adverse is the unvalued kg difference presented as dollars; the favourable option flips the sign convention.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-18", paper: "PM", area: "C", type: "mcq",
    stem: "Standard labour is 2 hours per unit at $12 per hour. Actual results: 2,000 units produced in 4,200 hours, with total wages of $52,500. What is the labour EFFICIENCY variance?",
    options: ["$2,400 adverse", "$2,100 adverse", "$2,400 favourable", "$2,500 adverse"],
    correct: 0,
    explanation:
      "Efficiency variance = (standard hours for actual output − actual hours) × standard rate = (4,000 − 4,200) × 12 = $2,400 adverse (took longer than standard). $2,100 adverse is the RATE variance (50,400 − 52,500); $2,500 adverse values the 200 excess hours at the actual rate of $12.50 instead of standard; the favourable option flips the sign.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-19", paper: "PM", area: "C", type: "mcq",
    stem: "Workers were paid for 4,000 hours ($44,000) but only worked 3,800 hours; 1,900 units were produced against a standard of 2 hours per unit at a standard rate of $10 per hour. Idle time is not built into the standard. What is the idle time variance?",
    options: ["$2,000 adverse", "$0", "$2,000 favourable", "$2,200 adverse"],
    correct: 0,
    explanation:
      "Idle time variance = idle hours × standard rate = (4,000 − 3,800) × 10 = $2,000 adverse — hours paid for but not worked are always adverse. $0 is the efficiency variance (3,800 standard hours vs 3,800 worked), which is calculated separately on hours WORKED; $2,200 wrongly values idle hours at the actual rate of $11; idle time can never be favourable here.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-20", paper: "PM", area: "C", type: "mcq",
    stem: "A blended product uses materials in a standard mix of 60% Alpha ($10/kg) and 40% Beta ($5/kg). Actual input was 250 kg of Alpha and 250 kg of Beta. What is the material MIX variance?",
    options: ["$0", "$250 adverse", "$500 favourable", "$250 favourable"],
    correct: 3,
    explanation:
      "Standard mix of the 500 kg actual input = 300 kg Alpha + 200 kg Beta. Mix variance = (300 − 250) × 10 favourable for Alpha ($500 F, less of the expensive material) plus (200 − 250) × 5 adverse for Beta ($250 A, more of the cheap material) = $250 favourable overall. $500 favourable stops after Alpha; $250 adverse flips the convention; $0 comes from comparing total actual input with total standard-mix input — those totals are always equal by construction, so that difference belongs to the yield variance, not the mix.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-21", paper: "PM", area: "C", type: "mcq",
    stem: "A process has a standard input of 10 kg per unit of output at a weighted-average standard cost of $8 per kg. Actual input was 5,200 kg and output was 500 units. What is the material YIELD variance?",
    options: ["$1,600 adverse", "$200 adverse", "$1,600 favourable", "$16,000 adverse"],
    correct: 0,
    explanation:
      "Yield variance = (standard input for actual output − actual input) × weighted-average standard cost = (5,000 − 5,200) × 8 = $1,600 adverse (the process consumed 200 kg more than standard for the output achieved). $200 adverse forgets to value the kg difference; $16,000 adverse values the kg at the $80 standard cost per unit of OUTPUT instead of per kg; favourable flips the sign.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-22", paper: "PM", area: "C", type: "mcq",
    stem: "Budgeted sales were 1,000 units of X (standard contribution $8) and 1,000 units of Y (standard contribution $4). Actual sales were 900 units of X and 1,300 units of Y. What is the sales MIX contribution variance?",
    options: ["$800 adverse", "$400 favourable", "$800 favourable", "$1,200 favourable"],
    correct: 0,
    explanation:
      "Standard mix of the 2,200 actual units = 1,100 each. Mix variance = (900 − 1,100) × 8 + (1,300 − 1,100) × 4 = −1,600 + 800 = $800 adverse — the mix shifted towards the lower-contribution product. $1,200 favourable is the sales QUANTITY variance (200 extra units × $6 weighted-average contribution); $400 favourable is the TOTAL sales volume variance (mix + quantity); favourable flips the sign.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-23", paper: "PM", area: "C", type: "mcq",
    stem: "Budgeted sales: 600 units of P (contribution $10/unit) and 400 units of Q (contribution $5/unit). Actual total sales volume was 1,150 units. What is the sales QUANTITY contribution variance?",
    options: ["$750 favourable", "$1,200 adverse", "$1,200 favourable", "$1,500 favourable"],
    correct: 2,
    explanation:
      "Weighted-average standard contribution = (600 × 10 + 400 × 5) ÷ 1,000 = $8. Quantity variance = (1,150 − 1,000) × 8 = $1,200 favourable (more total units sold, in the standard mix). $1,500 wrongly values the extra 150 units at P's $10 contribution; $750 uses Q's $5; adverse flips the sign — selling MORE units is favourable.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-24", paper: "PM", area: "C", type: "mcq",
    stem: "The original standard price of a material was $6.00/kg. A world shortage (outside the buyer's control) raised the general market price, and the standard was revised to $6.50/kg. The company then bought 10,000 kg at $6.80/kg. What is the OPERATIONAL material price variance?",
    options: ["$3,000 adverse", "$3,000 favourable", "$5,000 adverse", "$8,000 adverse"],
    correct: 0,
    explanation:
      "Operational variance compares actual against the REVISED standard: (6.50 − 6.80) × 10,000 = $3,000 adverse — this part is within the buyer's control. $5,000 adverse is the PLANNING variance ((6.00 − 6.50) × 10,000); $8,000 adverse is the traditional total variance measured against the outdated original standard; favourable flips the sign.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-25", paper: "PM", area: "C", type: "mcq",
    stem: "What is the principal argument FOR analysing variances into planning and operational elements?",
    options: [
      "It reduces the total variance reported to senior management",
      "Managers are assessed only on variances that were controllable once the standard is revised for factors outside their control",
      "It removes the need ever to revise standards",
      "It ensures that all adverse variances are attributed to the purchasing department",
    ],
    correct: 1,
    explanation:
      "Splitting out the planning element (caused by an unrealistic original standard) leaves an operational variance that reflects controllable performance, which is fairer and more motivating. The total variance is unchanged, standards must actually BE revised for the split to work, and blame is not automatically assigned to any one department.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-26", paper: "PM", area: "C", type: "mcq",
    stem: "Under absorption costing, budgeted fixed overhead is $120,000 for budgeted output of 20,000 units. Actual output was 22,000 units and actual fixed overhead was $126,000. What is the fixed overhead VOLUME variance?",
    options: ["$6,000 adverse", "$6,000 favourable", "$12,000 adverse", "$12,000 favourable"],
    correct: 3,
    explanation:
      "OAR = 120,000 ÷ 20,000 = $6/unit. Volume variance = (actual output − budgeted output) × OAR = (22,000 − 20,000) × 6 = $12,000 favourable — producing more than budget over-absorbs fixed overhead. $6,000 adverse is the EXPENDITURE variance (126,000 vs 120,000); $6,000 favourable is the net over-absorption (132,000 absorbed − 126,000 incurred); adverse on the volume flips the convention.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-27", paper: "PM", area: "C", type: "mcq",
    stem: "Budgeted fixed overhead is $50,000 for 10,000 budgeted labour hours (standard: 2 hours per unit). Actual: 9,600 hours worked, 5,000 units produced, fixed overhead incurred $53,000. What is the fixed overhead CAPACITY variance?",
    options: ["$2,000 adverse", "$0", "$2,000 favourable", "$3,000 adverse"],
    correct: 0,
    explanation:
      "OAR = $5 per hour. Capacity variance = (actual hours worked − budgeted hours) × OAR = (9,600 − 10,000) × 5 = $2,000 adverse — fewer hours were worked than budgeted. $2,000 favourable is the EFFICIENCY variance ((10,000 standard hours − 9,600) × 5); $0 is the volume variance (capacity and efficiency cancel); $3,000 adverse is the expenditure variance (53,000 vs 50,000).",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-28", paper: "PM", area: "C", type: "mcq",
    stem: "The fixed budget for 10,000 units shows variable costs of $40,000 and fixed costs of $25,000. Actual output was 12,000 units. What is the total cost allowance in the FLEXED budget?",
    options: ["$65,000", "$70,000", "$73,000", "$78,000"],
    correct: 2,
    explanation:
      "Flex only the variable costs: (40,000 × 12,000/10,000) + 25,000 = 48,000 + 25,000 = $73,000. $78,000 flexes the fixed costs as well (65,000 × 1.2); $65,000 fails to flex at all; $70,000 flexes the fixed costs but not the variable — the reverse error.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-29", paper: "PM", area: "C", type: "mcq",
    stem: "The main purpose of flexing the budget before calculating variances is to:",
    options: [
      "Reward managers for producing more than the original budget",
      "Remove the effect of the difference in activity level, so remaining variances reflect price and efficiency",
      "Adjust all costs for inflation since the budget was set",
      "Convert fixed costs into variable costs",
    ],
    correct: 1,
    explanation:
      "Comparing actual costs at one output with a budget set for a different output mixes volume effects into every variance. Flexing restates the budget at ACTUAL activity so like is compared with like; it is not an inflation adjustment and does not change cost behaviour.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-30", paper: "PM", area: "C", type: "mcq",
    stem: "Which of the following is the most significant RISK of participative (bottom-up) budgeting?",
    options: [
      "Managers may build slack into their budgets to make targets easier to achieve",
      "Managers will feel less ownership of the targets",
      "Budgets will be quicker to prepare than imposed budgets",
      "Senior management will no longer need to coordinate departmental budgets",
    ],
    correct: 0,
    explanation:
      "When managers set their own targets and are judged against them, they have an incentive to pad costs or understate revenues (budgetary slack). Reduced ownership is a feature of TOP-DOWN budgeting, participation is typically slower not quicker, and coordination is still required.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-31", paper: "PM", area: "C", type: "mcq",
    stem: "Which of the following is NOT normally a purpose of budgeting?",
    options: [
      "Planning the use of resources",
      "Coordinating the activities of different departments",
      "Authorising expenditure by managers",
      "Determining the figures reported in the statutory financial statements",
    ],
    correct: 3,
    explanation:
      "Budgets serve planning, coordination, communication, authorisation, motivation, control and evaluation (PRIME-style purposes). Statutory financial statements report ACTUAL results under accounting standards — budgets are internal management tools and do not determine them.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-C-32", paper: "PM", area: "C", type: "number",
    stem: "The first unit of a product took 120 hours and an 85% learning curve applies (cumulative-average-time model). What is the TOTAL time for the first 8 units, to the nearest whole hour?",
    numericAnswer: 590, unit: "hours", tolerance: 1,
    explanation:
      "Eight units is three doublings (1→2→4→8), so cumulative average = 120 × 0.85³ = 120 × 0.614125 = 73.695 hours. Total = 8 × 73.695 = 589.56 ≈ 590 hours. The trap is applying the 85% only once or twice, or reporting the cumulative average (74 hours) instead of the total.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-C-33", paper: "PM", area: "C", type: "mcq",
    stem: "Which criticism of traditional annual budgeting is made by advocates of the 'Beyond Budgeting' approach?",
    options: [
      "Annual budgets give managers too much flexibility to respond to change",
      "Annual budgets are too cheap and quick to prepare to be taken seriously",
      "Fixed annual targets quickly become outdated and encourage dysfunctional 'gaming', such as spend-it-or-lose-it behaviour",
      "Annual budgets place too much emphasis on external market conditions",
    ],
    correct: 2,
    explanation:
      "Beyond Budgeting argues the annual fixed performance contract is rigid, rapidly obsolete and drives gaming (padding, spending to protect next year's allocation). The distractors invert the actual criticisms: budgets are inflexible (not too flexible), costly and time-consuming (not cheap), and internally focused (not externally).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-34", paper: "PM", area: "C", type: "mcq",
    stem: "Variable overhead is absorbed on labour hours. Standard: 0.5 hours per unit at $6 per hour. Actual: 10,000 units produced in 5,400 hours; actual variable overhead $33,480. What is the variable overhead EXPENDITURE variance?",
    options: ["$1,080 adverse", "$1,080 favourable", "$2,400 adverse", "$3,480 adverse"],
    correct: 0,
    explanation:
      "Expenditure variance = (actual hours × standard rate) − actual cost = (5,400 × 6) − 33,480 = 32,400 − 33,480 = $1,080 adverse (spent more per hour worked than standard). $2,400 adverse is the EFFICIENCY variance ((5,000 − 5,400) × 6); $3,480 adverse is the total variable overhead variance; favourable flips the sign.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-35", paper: "PM", area: "C", type: "mcq",
    stem: "Which of the following is the major practical disadvantage of zero-based budgeting?",
    options: [
      "It is very time-consuming and costly because every activity must be re-justified each period",
      "It perpetuates past inefficiencies in the budget base",
      "It cannot be applied to discretionary costs such as research or training",
      "It fails to distinguish between different levels of activity",
    ],
    correct: 0,
    explanation:
      "Building and ranking decision packages from scratch every period demands enormous management time and skill — the main reason ZBB is used selectively or periodically. Perpetuating inefficiency is INCREMENTAL budgeting's flaw, and discretionary costs are where ZBB works BEST, not worst.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-C-36", paper: "PM", area: "C", type: "mcq",
    stem: "The original labour standard was 3.0 hours per unit at $10/hour. After an unavoidable machine fault (outside the production manager's control), the standard was revised to 3.5 hours per unit. Actual: 1,000 units in 3,600 hours at $10/hour. What is the OPERATIONAL labour efficiency variance?",
    options: ["$1,000 adverse", "$1,000 favourable", "$5,000 adverse", "$6,000 adverse"],
    correct: 0,
    explanation:
      "Operational efficiency = (revised standard hours − actual hours) × standard rate = (3,500 − 3,600) × 10 = $1,000 adverse — the only part the manager controls. $5,000 adverse is the PLANNING variance ((3,000 − 3,500) × 10); $6,000 adverse is the traditional variance against the outdated original standard; favourable flips the sign.",
    marks: 2, difficulty: "hard",
  },

  /* ───────────── D — Performance measurement & control (34) ───────────── */
  {
    id: "PM2-D-01", paper: "PM", area: "D", type: "mcq",
    stem: "A state school reports its exam pass rate against a government target. Within the 'value for money' (3Es) framework, this is primarily a measure of:",
    options: ["Economy", "Efficiency", "Equity", "Effectiveness"],
    correct: 3,
    explanation:
      "Effectiveness measures how well OUTPUTS achieve the organisation's objectives — here, educational attainment against target. Economy is about acquiring inputs cheaply, and efficiency is the ratio of outputs to inputs; confusing the three Es is the standard trap.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-02", paper: "PM", area: "D", type: "mcq",
    stem: "Clinic A treats 9,600 patients per year with 40 clinical staff. Clinic B treats 13,200 patients with 60 staff. Which clinic is more EFFICIENT on this data?",
    options: [
      "Clinic A — 240 patients per staff member versus 220 for Clinic B",
      "Clinic B — it treats more patients in total",
      "Clinic B — 220 patients per staff member",
      "They are equally efficient because both meet demand",
    ],
    correct: 0,
    explanation:
      "Efficiency is output per unit of input: A = 9,600 ÷ 40 = 240 patients per staff member; B = 13,200 ÷ 60 = 220. A is more efficient. Choosing B because it treats more patients confuses SCALE with efficiency — total output says nothing about resource use.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-03", paper: "PM", area: "D", type: "mcq",
    stem: "Why is performance measurement particularly difficult in not-for-profit organisations?",
    options: [
      "They are prohibited from preparing management accounts",
      "They pursue multiple, often non-financial objectives whose outputs are hard to value in monetary terms",
      "They have no input costs to measure",
      "Profit is their only objective, but it cannot be calculated",
    ],
    correct: 1,
    explanation:
      "A charity or hospital has many stakeholders and objectives (care quality, access, outcomes) that lack a market price, so there is no single 'bottom line'. That is why the 3Es/value-for-money framework is used. NFPs certainly have costs, can prepare management accounts, and do not pursue profit as their objective.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-04", paper: "PM", area: "D", type: "number",
    stem: "A division has controllable operating profit of $360,000 and controllable capital employed of $2,400,000. What is its return on investment (ROI), in % ?",
    numericAnswer: 15, unit: "%",
    explanation:
      "ROI = controllable profit ÷ controllable capital employed = 360,000 ÷ 2,400,000 = 15%. For manager appraisal, both the profit and the asset base should be restricted to items the manager controls.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-05", paper: "PM", area: "D", type: "mcq",
    stem: "A division reports controllable profit of $500,000 before an allocation of $80,000 of head-office costs. Assets controlled by the divisional manager are $2,000,000; a further $500,000 of head-office assets are apportioned to the division. For appraising the divisional MANAGER, ROI should be calculated as:",
    options: ["16.8%", "20%", "21%", "25%"],
    correct: 3,
    explanation:
      "The manager should be judged on controllable profit over controllable investment: 500,000 ÷ 2,000,000 = 25%. 16.8% deducts the uncontrollable head-office costs AND uses the inflated asset base (420,000 ÷ 2,500,000); 20% uses total apportioned assets; 21% deducts allocated head-office costs (420,000 ÷ 2,000,000). Allocated items are outside the manager's control and distort appraisal.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-06", paper: "PM", area: "D", type: "number",
    stem: "A division has controllable profit of $450,000 and divisional investment of $3,000,000. The company's cost of capital is 12%. What is the division's residual income (RI), in $?",
    numericAnswer: 90000, unit: "$",
    explanation:
      "RI = controllable profit − imputed interest = 450,000 − (12% × 3,000,000) = 450,000 − 360,000 = $90,000. The classic error is forgetting the imputed interest charge or applying the percentage to profit rather than to the investment.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-07", paper: "PM", area: "D", type: "mcq",
    stem: "A division currently earns $440,000 on assets of $2,000,000 (ROI 22%). A proposed project needs $200,000 of assets and will earn $36,000 a year (ROI 18%). The company's cost of capital is 15%. The divisional manager is appraised solely on ROI. What is the most likely outcome?",
    options: [
      "The manager accepts the project because 18% exceeds the 15% cost of capital",
      "The manager rejects the project, and this rejection is in the company's best interests",
      "The manager rejects the project even though it would add value for the company — a dysfunctional decision",
      "The manager is indifferent because divisional ROI is unaffected",
    ],
    correct: 2,
    explanation:
      "The project would dilute divisional ROI (476,000 ÷ 2,200,000 ≈ 21.6% < 22%), so an ROI-appraised manager rejects it. Yet its 18% return beats the 15% cost of capital (RI = 36,000 − 30,000 = +$6,000), so the company WANTS it accepted. Assuming the manager acts on the company's interest, or benchmarking against current ROI instead of the cost of capital, are the classic errors.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-D-08", paper: "PM", area: "D", type: "mcq",
    stem: "A divisional manager is appraised on RESIDUAL INCOME. The division's current ROI is 20%, the cost of capital is 10%, and a new project offers a 14% return. The manager will most likely:",
    options: [
      "Reject the project because it lowers average divisional ROI",
      "Accept the project because it earns more than the 10% imputed interest charge, so RI increases",
      "Reject the project because 14% is below the division's current 20% return",
      "Accept the project because RI ignores the cost of financing",
    ],
    correct: 1,
    explanation:
      "Under RI, any project returning more than the cost of capital adds to residual income, so the manager accepts — this is why RI promotes goal congruence where ROI does not. Rejecting because ROI falls, or benchmarking against the current 20%, are ROI-style errors; and RI explicitly INCLUDES a financing charge, it does not ignore it.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-09", paper: "PM", area: "D", type: "mcq",
    stem: "Which of the following is a genuine limitation of ROI as a divisional performance measure?",
    options: [
      "ROI rises automatically as assets age and their net book value falls, which can discourage asset replacement",
      "ROI is an absolute measure, so it cannot be used to compare divisions of different sizes",
      "ROI includes an imputed interest charge that managers cannot control",
      "ROI cannot be analysed into profit margin and asset turnover",
    ],
    correct: 0,
    explanation:
      "With NBV in the denominator, an ageing asset base inflates ROI, tempting managers to hold on to old assets. The other options attach RI's features to ROI: ROI is a RELATIVE (percentage) measure that is good for comparing different-sized divisions, the imputed interest charge belongs to RI, and ROI famously DOES decompose into margin × asset turnover.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-10", paper: "PM", area: "D", type: "number",
    stem: "A division has an operating profit margin of 8% and an asset turnover of 2.5 times. What is its ROI, in %?",
    numericAnswer: 20, unit: "%",
    explanation:
      "ROI = profit margin × asset turnover = 8% × 2.5 = 20%. This decomposition shows the two routes to a given ROI: high margin/low volume or low margin/high volume. Adding the two figures instead of multiplying is the usual slip.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-11", paper: "PM", area: "D", type: "mcq",
    stem: "When measuring the performance of a divisional MANAGER, which of the following should be EXCLUDED?",
    options: [
      "Direct materials used by the division",
      "Divisional advertising authorised by the manager",
      "An apportioned share of head-office insurance costs",
      "Bonuses the manager awarded to divisional staff",
    ],
    correct: 2,
    explanation:
      "The controllability principle: managers should be judged only on items they can influence. Apportioned head-office costs are outside the manager's control and should be excluded from controllable profit. Materials, authorised advertising and staff bonuses are all decisions within the manager's remit.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-12", paper: "PM", area: "D", type: "mcq",
    stem: "A division reports: revenue $900,000; divisional variable costs $400,000; fixed costs controllable by the manager $150,000; rent on premises imposed by head office but traceable to the division $80,000; apportioned head-office administration $60,000. What profit figure should be used to appraise the divisional MANAGER?",
    options: ["$210,000", "$270,000", "$350,000", "$500,000"],
    correct: 2,
    explanation:
      "Controllable profit = 900,000 − 400,000 − 150,000 = $350,000. The traceable-but-imposed rent ($80,000) is deducted only when appraising the DIVISION as an economic unit ($270,000), and apportioned head-office costs are excluded from both ($210,000 double-penalises the manager). $500,000 ignores the controllable fixed costs.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-13", paper: "PM", area: "D", type: "mcq",
    stem: "Division S makes a component at a variable cost of $30 per unit and has significant spare capacity. It also sells the component externally at $50, incurring fixed costs of $8 per unit at normal volumes. What is the MINIMUM transfer price Division S should accept for an internal transfer?",
    options: ["$30", "$38", "$48", "$50"],
    correct: 0,
    explanation:
      "With spare capacity, no external sale is displaced, so the opportunity cost is nil and the minimum acceptable price is marginal (variable) cost = $30. $38 wrongly adds unit fixed costs, which are unaffected by the transfer; $50 applies the market price, correct only at full capacity; $48 adjusts the market price without any basis here.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-D-14", paper: "PM", area: "D", type: "mcq",
    stem: "Division S is at FULL capacity. It sells its component externally at $50 per unit, incurring a variable selling cost of $3 per unit that is avoided on internal transfers. Variable production cost is $30. The minimum transfer price per unit is:",
    options: ["$30", "$47", "$50", "$53"],
    correct: 1,
    explanation:
      "At full capacity every transfer displaces an external sale, so minimum TP = variable cost + lost contribution = 30 + (50 − 3 − 30) = $47 — equivalently, market price less the selling costs saved internally (50 − 3). $50 ignores the avoided selling costs; $30 uses marginal cost as if there were spare capacity; $53 ADDS the selling cost instead of deducting it.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-D-15", paper: "PM", area: "D", type: "mcq",
    stem: "Which of the following is a key objective of a well-designed transfer pricing system?",
    options: [
      "Ensuring both divisions always report identical profits",
      "Promoting goal congruence, so decisions that benefit each division also benefit the company as a whole",
      "Maximising the selling division's profit at the expense of the buying division",
      "Removing the need to measure divisional performance",
    ],
    correct: 1,
    explanation:
      "A good transfer price should lead autonomous managers, acting in their own division's interest, to the decision the group would want — goal congruence — while permitting fair performance evaluation and divisional autonomy. It is not meant to equalise profits, favour one side, or replace performance measurement.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-16", paper: "PM", area: "D", type: "mcq",
    stem: "Division A (spare capacity, variable cost $40) proposes a transfer price of $55. Division B can buy the same item externally for $52. If both managers act in their own division's interest, the group consequence is:",
    options: [
      "B buys internally, so group profit is unaffected",
      "B buys externally and the group is better off",
      "There is no effect on group profit wherever B buys",
      "B buys externally, making the group worse off by $12 per unit",
    ],
    correct: 3,
    explanation:
      "At a $55 transfer price B rationally buys outside at $52. But the group then pays $52 cash for something it could have made for a $40 incremental cost — a loss of $12 per unit. A transfer price set above the external market price with spare capacity destroys goal congruence; assuming the sourcing decision is neutral for the group is the trap.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-D-17", paper: "PM", area: "D", type: "number",
    stem: "Division X is capacity-constrained: every unit transferred internally displaces an external sale that earns a contribution of $16 per unit. The variable cost per unit is $24. What is the minimum transfer price per unit, in $?",
    numericAnswer: 40, unit: "$",
    explanation:
      "Minimum TP = marginal cost + opportunity cost of the transfer = 24 + 16 = $40. Quoting only the $24 variable cost ignores the contribution forgone on the displaced external sale — the opportunity cost is the whole point at full capacity.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-18", paper: "PM", area: "D", type: "mcq",
    stem: "A market-based transfer price is most appropriate when:",
    options: [
      "A perfectly competitive external market exists for the intermediate product",
      "There is no external market for the intermediate product",
      "The transferring division has substantial spare capacity",
      "The product is bespoke and made only for the internal customer",
    ],
    correct: 0,
    explanation:
      "Where a competitive external market price exists, it is objective, preserves autonomy and leads both divisions to decisions consistent with the group's interest. With no external market or a bespoke product there is no market price to use, and with spare capacity a marginal-cost-based price better reflects the true opportunity cost.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-19", paper: "PM", area: "D", type: "mcq",
    stem: "In a balanced scorecard, which of the following measures belongs to the INTERNAL BUSINESS PROCESS perspective?",
    options: [
      "Customer retention rate",
      "Return on capital employed",
      "Manufacturing defect rate per 1,000 units",
      "Training days per employee",
    ],
    correct: 2,
    explanation:
      "Defect rates, cycle times and throughput measure how well internal processes run. Customer retention sits in the customer perspective, ROCE in the financial perspective, and training days in learning & growth — mapping measures to the wrong perspective is the standard trap.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-20", paper: "PM", area: "D", type: "mcq",
    stem: "The principal advantage of the balanced scorecard over reliance on profit-based measures alone is that it:",
    options: [
      "Eliminates the need for any financial measures",
      "Links financial results with the non-financial drivers of future performance, discouraging short-termism",
      "Focuses management attention exclusively on customers",
      "Guarantees an improvement in reported profit",
    ],
    correct: 1,
    explanation:
      "The scorecard balances lagging financial outcomes with leading indicators (customer, internal process, learning & growth) so managers cannot boost short-term profit by starving the drivers of long-term success. It RETAINS the financial perspective — 'replaces financial measures' is the classic misstatement — and it guarantees nothing by itself.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-21", paper: "PM", area: "D", type: "mcq",
    stem: "In Fitzgerald and Moon's building block model, the 'standards' block requires that targets should be:",
    options: [
      "Financial, quantitative and reported monthly",
      "Clear, linked to bonuses and controllable",
      "Split between results and determinants",
      "Ones staff take ownership of, achievable, and equitable between units",
    ],
    correct: 3,
    explanation:
      "Standards (the targets set) should exhibit ownership, achievability and equity/fairness. 'Clarity, motivation, controllability' describes the REWARDS block, and 'results vs determinants' describes the DIMENSIONS block — swapping the three blocks' properties is the classic error.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-22", paper: "PM", area: "D", type: "mcq",
    stem: "In the building block model, which of the following dimensions of performance is a RESULT rather than a determinant?",
    options: [
      "Quality of service",
      "Competitiveness",
      "Flexibility",
      "Innovation",
    ],
    correct: 1,
    explanation:
      "The dimensions block splits into results (financial performance and competitiveness) and determinants (quality, flexibility, resource utilisation and innovation) — the determinants drive the results, with a time lag. Treating quality or innovation as a result reverses the causal logic of the model.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-23", paper: "PM", area: "D", type: "number",
    stem: "A publicly funded training programme cost $240,000. 800 people enrolled and 600 completed it successfully. What is the cost per successful completion, in $?",
    numericAnswer: 400, unit: "$",
    explanation:
      "Cost per successful outcome = 240,000 ÷ 600 = $400. Dividing by the 800 enrolments ($300) measures cost per participant, not per successful outcome — in value-for-money analysis the denominator must match the objective being measured.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-24", paper: "PM", area: "D", type: "mcq",
    stem: "Division P: profit $200,000, net assets $1,000,000. Division Q: profit $750,000, net assets $5,000,000. Cost of capital is 10%. Which statement is correct?",
    options: [
      "Q outperforms P on both ROI and residual income",
      "P outperforms Q on both ROI and residual income",
      "P has the higher ROI (20% vs 15%), but Q has the higher RI ($250,000 vs $100,000) because RI is an absolute measure that favours larger divisions",
      "P has the higher RI because its ROI is higher",
    ],
    correct: 2,
    explanation:
      "ROI: P = 20%, Q = 15%. RI: P = 200,000 − 100,000 = $100,000; Q = 750,000 − 500,000 = $250,000. The measures rank the divisions differently: ROI is size-neutral (relative), while RI, being absolute, tends to favour the bigger asset base. Inferring RI ranking from ROI is the trap.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-25", paper: "PM", area: "D", type: "mcq",
    stem: "A divisional manager, close to the year end and slightly below the annual ROI target, is considering several actions. Which one indicates measure-induced SHORT-TERMISM?",
    options: [
      "Cancelling this year's preventive maintenance programme to cut costs before the year end",
      "Negotiating a cheaper three-year supply contract",
      "Investing in staff training scheduled for next quarter",
      "Replacing an unreliable machine that causes frequent stoppages",
    ],
    correct: 0,
    explanation:
      "Skipping preventive maintenance boosts this year's profit and ROI while storing up breakdown costs for future periods — a textbook dysfunctional response to an annual financial target. The other three sacrifice little or nothing today and improve long-term performance.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-26", paper: "PM", area: "D", type: "mcq",
    stem: "A division missed its annual profit target solely because a new import tariff, introduced mid-year by the government, raised its raw material costs. When appraising the divisional manager, head office should:",
    options: [
      "Hold the manager fully accountable — targets should never be changed",
      "Excuse the entire profit shortfall automatically, without further analysis",
      "Switch the division's appraisal to cash flow measures",
      "Adjust the benchmark for the uncontrollable external factor, then appraise the manager against the revised target",
    ],
    correct: 3,
    explanation:
      "The controllability principle says external, uncontrollable events (tariffs, economic shocks) should be stripped out — e.g. via a planning/operational split or a revised standard — before judging the manager. Holding the manager accountable for the tariff is unfair and demotivating; but excusing the WHOLE shortfall without analysis could hide genuine operational failings.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-27", paper: "PM", area: "D", type: "mcq",
    stem: "A subscription business started the year with 2,400 customers. During the year it lost 576 of them and acquired 240 new ones. What is its customer RETENTION rate for the year?",
    options: ["24%", "76%", "86%", "131.6%"],
    correct: 1,
    explanation:
      "Retention = customers retained ÷ opening customers = (2,400 − 576) ÷ 2,400 = 1,824 ÷ 2,400 = 76%. 24% is the churn rate presented as retention; 86% wrongly counts the 240 NEW customers as retained ((1,824 + 240) ÷ 2,400); 131.6% inverts the division.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-28", paper: "PM", area: "D", type: "mcq",
    stem: "Division B needs 2,000 components a year and can buy them externally at $45 each. Division A could supply them from spare capacity at a variable cost of $28 each. If no agreement is reached and B buys externally, the annual cost to the GROUP of this decision is:",
    options: ["$0", "$34,000", "$56,000", "$90,000"],
    correct: 1,
    explanation:
      "With spare capacity, internal supply costs the group only the incremental $28 per unit versus $45 externally, so buying outside costs the group (45 − 28) × 2,000 = $34,000. $90,000 is the total external spend, not the incremental loss; $56,000 treats A's own cost as the loss; $0 assumes the sourcing decision is neutral for the group — it is not.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-29", paper: "PM", area: "D", type: "mcq",
    stem: "A machine cost $500,000 and is depreciated straight-line over 5 years (no residual value). It generates a constant profit of $60,000 a year after depreciation. Using OPENING net book value as the asset base, what is the ROI in Year 4?",
    options: ["12%", "20%", "30%", "60%"],
    correct: 2,
    explanation:
      "Opening NBV in Year 4 = 500,000 − (3 × 100,000) = $200,000, so ROI = 60,000 ÷ 200,000 = 30%. This shows ROI rising each year purely because the asset ages — the behavioural flaw of NBV-based ROI. 12% uses original cost, 20% miscounts the depreciation years (uses Year 3's opening NBV of $300,000), and 60% uses the CLOSING NBV of $100,000.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-D-30", paper: "PM", area: "D", type: "mcq",
    stem: "'Value for money' in a public-sector organisation is best described as:",
    options: [
      "Spending as little as possible, regardless of what is achieved",
      "Maximising output regardless of the resources consumed",
      "Maximising the surplus of income over expenditure",
      "Achieving economy, efficiency and effectiveness in the use of resources",
    ],
    correct: 3,
    explanation:
      "VFM is the combination of all three Es: buying inputs economically, converting them efficiently into outputs, and ensuring those outputs achieve the objectives (effectiveness). Minimising spend alone is economy without effectiveness; maximising output alone ignores cost; surplus maximisation imports a profit objective that public bodies do not have.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-31", paper: "PM", area: "D", type: "mcq",
    stem: "A retail division has an ROI of 18% and an asset turnover of 3.0 times. What is its operating profit margin?",
    options: ["6%", "16.7%", "21%", "54%"],
    correct: 0,
    explanation:
      "ROI = margin × asset turnover, so margin = 18% ÷ 3.0 = 6% — a typical high-volume, low-margin retail profile. 54% multiplies instead of dividing; 21% adds the two figures; 16.7% divides the asset turnover by the ROI (the inversion error).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "PM2-D-32", paper: "PM", area: "D", type: "mcq",
    stem: "Which of the following is a genuine limitation of RESIDUAL INCOME as a divisional performance measure?",
    options: [
      "It ignores the company's cost of capital",
      "It always leads managers to reject projects that benefit the company",
      "It is a percentage, so it is distorted when the asset base is small",
      "As an absolute measure, it makes comparison between divisions of different sizes difficult",
    ],
    correct: 3,
    explanation:
      "RI is expressed in dollars, so a large division will normally show a bigger RI than a small one even if it is managed less well — size must be considered when comparing. The other options invert the facts: RI explicitly charges for the cost of capital, generally IMPROVES goal congruence versus ROI, and it is ROI that is the percentage measure.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "PM2-D-33", paper: "PM", area: "D", type: "mcq",
    stem: "An online retailer received 108 complaints on 45,000 orders. Expressed per 10,000 orders — a common non-financial quality indicator — the complaint rate is:",
    options: ["2.4", "24", "108", "417"],
    correct: 1,
    explanation:
      "Rate = (108 ÷ 45,000) × 10,000 = 24 complaints per 10,000 orders. 2.4 scales per 1,000 instead of per 10,000; 417 inverts the ratio (45,000 ÷ 108 is orders per complaint); 108 is the raw count with no scaling, which cannot be compared across periods with different volumes.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "PM2-D-34", paper: "PM", area: "D", type: "mcq",
    stem: "Division A has capacity of 20,000 units, external demand of 18,000 units at $18 per unit, and a variable cost of $10 per unit. Division B asks for 5,000 units. What is the minimum AVERAGE transfer price per unit at which Division A is no worse off?",
    options: ["$10.00", "$14.00", "$14.80", "$18.00"],
    correct: 2,
    explanation:
      "Spare capacity = 20,000 − 18,000 = 2,000 units, priced at variable cost $10; the other 3,000 units displace external sales, so they need $10 + ($18 − $10) = $18 each. Minimum total = (2,000 × 10) + (3,000 × 18) = $74,000, i.e. $14.80 average. $10 assumes all units come from spare capacity; $18 assumes none do; $14 is a simple average of the two prices, ignoring the 2,000/3,000 quantity split.",
    marks: 2, difficulty: "hard",
  },
]
