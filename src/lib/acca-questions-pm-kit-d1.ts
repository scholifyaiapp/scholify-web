import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-pm-kit-builders"

/*
 * PM · Area D question kit, first part — chapters 20 to 23.
 *
 * Budgetary systems, quantitative analysis and forecasting, learning curves, and standard
 * costing with the basic variances.
 *
 * The learning curve questions test the two things that actually go wrong: reading a
 * cumulative-average figure as an incremental one, and forgetting that the formula gives
 * the AVERAGE time per unit so the total needs multiplying back up. The variance questions
 * are set so that a sign error produces a visibly different figure rather than a plausible
 * one.
 *
 * Authored, applied, exam-standard at PM's uniform 2 marks. Original Scholify content.
 */

/* ── Chapter 20 · Budgetary systems ── */

const CH20: AccaQuestion[] = [
  q("PMK-20-01", "PM-20", "D", "easy",
    "Which budgeting approach requires every item of expenditure to be justified from a zero base each period?",
    ["Incremental budgeting", "Zero-based budgeting", "Rolling budgeting", "Flexible budgeting"],
    1,
    "ZERO-BASED BUDGETING. Nothing is inherited: each activity must justify its existence and its cost as if it were new. That is its strength — it eliminates accumulated slack — and its weakness, since it is very time-consuming to operate."),

  q("PMK-20-02", "PM-20", "D", "medium",
    "A company's budget has been prepared by adding 3% to last year's figures for eight consecutive years. What is the principal criticism?",
    [
      "3% is too low an increase",
      "Incremental budgeting perpetuates existing inefficiency and any slack built in years ago, because it never asks whether the activity is needed at all",
      "It is too time-consuming",
      "It cannot accommodate inflation",
    ],
    1,
    "IT PERPETUATES INEFFICIENCY AND EMBEDDED SLACK. Each year's budget inherits every past error and never questions the underlying activity. It is quick and cheap, which is why it survives, and after eight years it describes history rather than a plan."),

  q("PMK-20-03", "PM-20", "D", "medium",
    "Which budgeting approach is most appropriate for a business whose input prices are repriced monthly and highly volatile?",
    ["Incremental budgeting", "Rolling budgets", "Zero-based budgeting", "Fixed annual budgeting"],
    1,
    "ROLLING BUDGETS. Continuously extending the budget — adding a new month as each one closes — keeps the plan current in a fast-moving market. A fixed annual budget set on January's prices is meaningless by June, and no amount of variance analysis against it helps."),

  q("PMK-20-04", "PM-20", "D", "medium",
    "A manager complains that his fixed-budget variances are meaningless because actual volume was 30% above budget. Is he right, and what is the remedy?",
    [
      "No — variances against the original budget are always valid",
      "Yes — cost variances must be measured against a budget FLEXED to actual volume, otherwise volume differences are reported as cost control failures",
      "Yes, but no remedy is available",
      "No — the budget should have been more accurate",
    ],
    1,
    "HE IS RIGHT, AND FLEXIBLE BUDGETING IS THE ANSWER. Comparing actual costs at 130% of volume with a budget set for 100% conflates volume with control. Flexing the budget to actual activity isolates the cost control question, which is the only one the manager can answer for."),

  multi("PMK-20-05", "PM-20", "D", "medium",
    "Which of the following are purposes of a budget that can CONFLICT with one another? Select TWO.",
    [
      "Planning, which requires the most realistic estimate available",
      "Recording historical transactions",
      "Motivation, which is often best served by a demanding target above the realistic estimate",
      "Complying with accounting standards",
    ],
    [0, 2],
    "PLANNING AND MOTIVATION. Planning needs the expected outcome; motivation is often best served by a stretching target. Both cannot be the same figure, which is the fundamental tension in budgeting — and evaluation is a third purpose that pulls in yet another direction."),

  q("PMK-20-06", "PM-20", "D", "hard",
    "What is BUDGETARY SLACK and why does it arise?",
    [
      "The unused portion of a budget at year end",
      "Deliberate overstatement of costs or understatement of revenues, so that favourable variances follow automatically — it arises because managers are appraised against the budget they help to set",
      "The difference between a fixed and a flexed budget",
      "The tolerance allowed before a variance is investigated",
    ],
    1,
    "DELIBERATE PADDING BY THE PEOPLE APPRAISED AGAINST IT. It is the direct consequence of participative budgeting combined with performance evaluation: a manager who negotiates their own target and is then judged on it has an obvious incentive to negotiate an easy one."),

  q("PMK-20-07", "PM-20", "D", "medium",
    "Which is a genuine ADVANTAGE of participative (bottom-up) budgeting?",
    [
      "It is quicker than top-down budgeting",
      "It uses the knowledge of those closest to operations and increases their commitment to the target",
      "It eliminates budgetary slack",
      "It removes the need for senior management review",
    ],
    1,
    "LOCAL KNOWLEDGE AND COMMITMENT. Those doing the work know the operational detail, and a target someone helped set is one they own. The cost is slack and a longer process, which is why participation needs senior review rather than being an alternative to it."),

  q("PMK-20-08", "PM-20", "D", "hard",
    "For which type of expenditure is zero-based budgeting most useful?",
    [
      "Direct materials in a stable production process",
      "DISCRETIONARY overheads such as training, marketing and research, where there is no clear input-output relationship to justify a figure",
      "Statutory audit fees",
      "Interest on existing borrowings",
    ],
    1,
    "DISCRETIONARY OVERHEADS. Where cost varies directly with output — direct material — there is little to debate and ZBB adds nothing. Where there is no natural link between spend and output, an incremental budget is pure inheritance and ZBB genuinely forces the question of what the money buys."),

  q("PMK-20-09", "PM-20", "D", "medium",
    "Which budgeting approach builds the budget from the activities that will be performed and their cost drivers?",
    ["Incremental budgeting", "Activity-based budgeting", "Rolling budgeting", "Zero-based budgeting"],
    1,
    "ACTIVITY-BASED BUDGETING. It is the budgeting counterpart of ABC: forecast the volume of each activity, apply the cost driver rate, and build the overhead budget from that. It gives a far better basis for challenging overhead than an incremental uplift."),

  q("PMK-20-10", "PM-20", "D", "hard",
    "A group is considering imposing one budgeting system across all its divisions. What is the strongest advice?",
    [
      "Impose zero-based budgeting, as the most rigorous system",
      "Match the system to each division's circumstances — ZBB where costs are discretionary and long unexamined, rolling budgets where the market moves fast, and flexible budgeting wherever volume is volatile",
      "Impose incremental budgeting, as the cheapest to run",
      "Leave each divisional manager to choose without guidance",
    ],
    1,
    "MATCH THE SYSTEM TO THE CIRCUMSTANCES. There is no best budgeting system in the abstract: the right choice depends on cost volatility, the nature of the expenditure and how fast the environment moves. A uniform system is administratively tidy and will be wrong for most divisions."),

  q("PMK-20-11", "PM-20", "D", "medium",
    "What is the principal DISADVANTAGE of rolling budgets?",
    [
      "They cannot accommodate volume changes",
      "They are costly and time-consuming, since a budget is prepared every period rather than once a year, and constant revision can make the target feel unstable",
      "They perpetuate existing inefficiency",
      "They require zero-based justification",
    ],
    1,
    "COST, TIME AND AN UNSTABLE TARGET. Rolling budgets keep the plan relevant at the price of continuous preparation effort, and a target that keeps moving can weaken its motivational force. The trade-off against relevance is the discussion the marks are for."),

  q("PMK-20-12", "PM-20", "D", "hard",
    "Which behavioural problem arises from using the budget as the basis for both PLANNING and PERFORMANCE EVALUATION?",
    [
      "Budgets become too detailed",
      "Managers bias the plan they submit — building in slack or, where they cannot, hitting the target by damaging actions such as deferring maintenance",
      "Budgets take longer to prepare",
      "Variances become impossible to compute",
    ],
    1,
    "THE PLAN GETS BIASED BY THE EVALUATION USE. If the number you propose becomes the number you are judged on, you propose a comfortable one — or, failing that, you find a way to hit it that damages the business. The remedies are separating the two figures, and using non-financial measures alongside."),
]

/* ── Chapter 21 · Quantitative analysis and forecasting ── */

const CH21: AccaQuestion[] = [
  num("PMK-21-01", "PM-21", "D", "medium",
    "Using the high-low method: at 12,000 units total cost is £188,000 and at 20,000 units it is £252,000. What is the variable cost per unit, in £?",
    8, "£ per unit", 0.01,
    "(£252,000 − £188,000)/(20,000 − 12,000) = £64,000/8,000 = £8.00 per unit. The high-low method uses only the two extreme observations, which is both its simplicity and its weakness — either extreme could be an outlier."),

  num("PMK-21-02", "PM-21", "D", "medium",
    "Variable cost is £8 per unit and total cost at 12,000 units is £188,000. What are the fixed costs, in £?",
    92000, "£", 1,
    "£188,000 − (12,000 × £8) = £188,000 − £96,000 = £92,000. Substitute back into EITHER of the two observations — both must give the same fixed cost, and checking against the second is a free arithmetic check."),

  num("PMK-21-03", "PM-21", "D", "hard",
    "At 10,000 units total cost is £166,000; at 18,000 units it is £254,000. A step in fixed costs of £24,000 occurs once output exceeds 14,000 units. What is the variable cost per unit, in £?",
    8, "£ per unit", 0.01,
    "Remove the step BEFORE dividing: the high observation includes £24,000 of extra fixed cost, so adjust it to £254,000 − £24,000 = £230,000. Then (£230,000 − £166,000)/8,000 = £64,000/8,000 = £8.00. Ignoring the step gives £11.00 — a 37% overstatement, and the single most examinable trap in high-low."),

  num("PMK-21-04", "PM-21", "D", "medium",
    "A time series has an additive model with trend of 4,800 units and a seasonal variation of −620 for the quarter. What is the forecast, in units?",
    4180, "units", 1,
    "4,800 − 620 = 4,180 units. In the ADDITIVE model the seasonal factor is added to the trend; in the MULTIPLICATIVE model it is a percentage or index applied to it. Read which model the question uses — the two give different answers from the same data."),

  num("PMK-21-05", "PM-21", "D", "medium",
    "A multiplicative time series has a trend of 5,200 units and a seasonal index of 1.15 for the quarter. What is the forecast, in units?",
    5980, "units", 1,
    "5,200 × 1.15 = 5,980 units. In the multiplicative model the seasonal factors must average 1.00 across the cycle (or sum to 4.00 over four quarters), which is the arithmetic check to run before forecasting anything."),

  q("PMK-21-06", "PM-21", "D", "medium",
    "In a multiplicative time series model with quarterly data, what must the four seasonal factors sum to?",
    ["1.00", "4.00", "100", "0"],
    1,
    "4.00, so they average 1.00. If they do not, they must be proportionately adjusted before use. In the ADDITIVE model the equivalent check is that the four seasonal variations sum to ZERO."),

  num("PMK-21-07", "PM-21", "D", "hard",
    "Quarterly seasonal variations in an additive model are +540, +180, −390 and X. What is the value of X?",
    -330, "units", 1,
    "The four must sum to ZERO: 540 + 180 − 390 + X = 0, so X = −330. This is the standard way the missing factor is tested, and running the check also catches an error in any of the other three."),

  q("PMK-21-08", "PM-21", "D", "medium",
    "What is the principal LIMITATION of the high-low method?",
    [
      "It cannot compute fixed costs",
      "It uses only two observations, so an outlier at either extreme distorts the whole result, and it assumes a linear relationship across the entire range",
      "It requires more than twelve observations",
      "It cannot handle stepped fixed costs at all",
    ],
    1,
    "IT USES ONLY TWO OBSERVATIONS. Every intermediate data point is discarded, so an unrepresentative high or low period drives the answer. Regression analysis uses all the observations and is statistically superior — high-low survives because it is quick and needs no software."),

  num("PMK-21-09", "PM-21", "D", "hard",
    "A trend line is y = 2,400 + 65x where x is the quarter number and quarter 1 of 20X1 is x = 1. Seasonal variation for quarter 3 is +310 in an additive model. What is the forecast for quarter 3 of 20X4, in units?",
    3685, "units", 1,
    "First get the quarter NUMBER right: 20X1 is quarters 1–4, 20X2 is 5–8, 20X3 is 9–12, so quarter 3 of 20X4 is x = 15. Trend = 2,400 + (65 × 15) = 3,375. Forecast = 3,375 + 310 = 3,685 units. Miscounting x is the commonest error here and it moves the answer by 65 units per quarter."),

  q("PMK-21-10", "PM-21", "D", "medium",
    "How should an index be used to adjust a forecast for inflation?",
    [
      "Add the inflation percentage to the forecast",
      "Multiply the forecast by the ratio of the FORECAST period's index to the BASE period's index",
      "Deduct inflation from the trend before adding seasonal variation",
      "Inflation should be ignored in short-term forecasts",
    ],
    1,
    "MULTIPLY BY THE RATIO OF THE TWO INDICES. Adjusting from a period with index 120 to one with index 138 means multiplying by 138/120 = 1.15. Getting the ratio the wrong way round deflates instead of inflating, and the resulting figure is roughly as far wrong in the opposite direction."),

  multi("PMK-21-11", "PM-21", "D", "medium",
    "Which of the following limit the reliability of any time series forecast? Select TWO.",
    [
      "It assumes the past pattern of trend and seasonality will continue",
      "It cannot be used for quarterly data",
      "A structural change in the market — a new competitor, a new technology — invalidates the historical relationship",
      "It requires a multiplicative model",
    ],
    [0, 2],
    "IT ASSUMES THE PAST CONTINUES, and a STRUCTURAL CHANGE BREAKS IT. Both are the standard limitations: extrapolation is only as good as the stability of the underlying relationship, and the further ahead the forecast, the weaker that assumption becomes."),

  q("PMK-21-12", "PM-21", "D", "hard",
    "Which self-checks should be run on a completed time series forecast?",
    [
      "None are available",
      "That the seasonal factors sum to zero (additive) or four (multiplicative), and that the four quarterly forecasts reconcile approximately to four times the mid-year trend",
      "That the trend is always increasing",
      "That each quarter exceeds the previous one",
    ],
    1,
    "THE FACTOR SUM AND THE ANNUAL RECONCILIATION. Both are quick and both catch real errors: if the factors do not sum correctly they have not been adjusted, and if the year's four forecasts do not come to roughly four times the mid-year trend, a seasonal factor has been applied to the wrong quarter."),
]

/* ── Chapter 22 · Learning curves ── */

const CH22: AccaQuestion[] = [
  num("PMK-22-01", "PM-22", "D", "medium",
    "The first unit takes 400 hours and an 80% learning curve applies. What is the CUMULATIVE AVERAGE time per unit after 4 units, in hours?",
    256, "hours", 0.01,
    "Doubling from 1 to 2 units gives 400 × 0.8 = 320; doubling again from 2 to 4 gives 320 × 0.8 = 256 hours. The doubling method works only at exact doublings of output — for any other quantity the formula y = ax^b is needed."),

  num("PMK-22-02", "PM-22", "D", "medium",
    "The cumulative average time for 4 units is 256 hours. What is the TOTAL time for 4 units, in hours?",
    1024, "hours", 1,
    "256 × 4 = 1,024 hours. The learning curve gives an AVERAGE per unit, so it must always be multiplied back up by the number of units to get a total. Forgetting this step is the most frequent error in the topic."),

  num("PMK-22-03", "PM-22", "D", "hard",
    "The first unit takes 400 hours with an 80% curve (b = −0.3219). What is the time for the 4th unit ALONE, in hours to one decimal place?",
    181.5, "hours", 0.5,
    "Total for 4 units = 256 × 4 = 1,024 hours. Total for 3 units: cumulative average = 400 × 3^(−0.3219) = 400 × 0.70213 = 280.85, so the total is 842.55 hours. The 4th unit alone = 1,024 − 842.55 = 181.5 hours. Note the cumulative-average figure of 256 is NOT the 4th unit's time — reading it as such is exactly the error this tests."),

  q("PMK-22-04", "PM-22", "D", "medium",
    "An 80% learning curve is quoted. What does the 80% refer to?",
    [
      "Each unit takes 80% of the time of the previous unit",
      "Each time CUMULATIVE OUTPUT DOUBLES, the cumulative average time per unit falls to 80% of its previous level",
      "Total time falls by 20% each period",
      "80% of the workforce achieves the standard",
    ],
    1,
    "CUMULATIVE AVERAGE TIME FALLS TO 80% AT EACH DOUBLING OF CUMULATIVE OUTPUT. Not each unit against the previous one, and not per period. Because doublings get further apart, the rate of improvement slows dramatically as output builds — which is why a steady state is eventually reached."),

  num("PMK-22-05", "PM-22", "D", "medium",
    "In y = ax^b, an 80% learning curve gives b = −0.3219. If the first unit takes 250 hours, what is the cumulative average time per unit for 10 units, in hours to two decimal places?",
    119.13, "hours", 0.05,
    "y = 250 × 10^(−0.3219) = 250 × 0.47652 = 119.13 hours. Use the formula whenever the quantity is not an exact doubling of one unit — here 10 is not a power of 2, so the doubling shortcut cannot reach it."),

  num("PMK-22-06", "PM-22", "D", "hard",
    "Cumulative average time for 10 units is 119.14 hours and for 9 units it is 123.25 hours. What is the time for the 10th unit alone, in hours to one decimal place?",
    82.2, "hours", 0.5,
    "Total for 10 units = 10 × 119.135 = 1,191.35 hours; total for 9 = 9 × 123.245 = 1,109.21 hours. The 10th unit alone = 1,191.35 − 1,109.21 = 82.2 hours. The method is always TOTAL MINUS TOTAL — subtracting the two averages instead gives 4.11 hours, which is nonsense but is a real and common answer."),

  q("PMK-22-07", "PM-22", "D", "hard",
    "Why is a learning curve placed BEFORE the variance chapters in a performance management syllabus?",
    [
      "Because it is easier than variance analysis",
      "Because learning changes the standard against which every later variance is measured — a favourable labour efficiency variance improving each month may be the learning effect, not improving performance",
      "Because variances cannot be computed while learning continues",
      "Because learning curves apply only to labour",
    ],
    1,
    "BECAUSE IT CHANGES THE STANDARD. A standard set on early units becomes progressively easier to beat as learning takes effect, so the resulting favourable variances measure the standard's staleness rather than the workforce's performance. The remedy is to revise the standard to the steady-state rate."),

  multi("PMK-22-08", "PM-22", "D", "medium",
    "In which conditions does a learning curve apply? Select TWO.",
    [
      "The process is highly automated with little human input",
      "The product is new and made by a largely manual process, with a repetitive operation to learn",
      "There is high labour turnover with constant retraining",
      "Production is continuous, without long breaks that would allow learning to be forgotten",
    ],
    [1, 3],
    "A NEW MANUAL, REPETITIVE PROCESS, and CONTINUOUS PRODUCTION. Automation leaves nothing to learn, and high turnover or long breaks mean the learning is lost as fast as it is gained. Stating these conditions is often worth more marks than the arithmetic."),

  num("PMK-22-09", "PM-22", "D", "hard",
    "The first batch takes 800 hours with a 90% learning curve. What is the total time for 8 batches, in hours?",
    4665.6, "hours", 1,
    "Cumulative average after 8 batches (three doublings): 800 × 0.9 = 720, × 0.9 = 648, × 0.9 = 583.2 hours. Total = 583.2 × 8 = 4,665.60 hours. Three doublings, so the factor is applied three times — applying it once is the error to avoid."),

  q("PMK-22-10", "PM-22", "D", "medium",
    "What happens when the learning effect reaches STEADY STATE?",
    [
      "The cumulative average time continues to fall indefinitely",
      "Learning stops and time per unit becomes constant, so the standard should be reset to that steady-state time",
      "The learning rate percentage increases",
      "Total time per batch falls to zero",
    ],
    1,
    "TIME PER UNIT BECOMES CONSTANT AND THE STANDARD SHOULD BE RESET TO IT. Beyond the steady-state point there is no further improvement to be had, so continuing to apply the curve overstates the expected improvement and understates the labour cost of later units."),

  num("PMK-22-11", "PM-22", "D", "hard",
    "Steady state is reached after 12 units at a time of 160 hours per unit, and labour costs £15 an hour. What is the labour cost of units 13 to 20, in £?",
    19200, "£", 1,
    "8 units × 160 hours = 1,280 hours × £15 = £19,200. Once steady state is reached the arithmetic becomes simple multiplication — and the point of the question is that continuing to apply a learning curve beyond steady state would understate this cost."),

  q("PMK-22-12", "PM-22", "D", "hard",
    "A quotation is prepared using the CUMULATIVE AVERAGE time for the units in an order, but the order continues from previous production. What error does this introduce?",
    [
      "None — the cumulative average is the correct basis",
      "It overstates the time, because the earlier units' learning has already occurred, so the correct basis is total time for all units to date less total time for units already made",
      "It understates the time",
      "It has no effect provided the learning rate is above 80%",
    ],
    1,
    "IT OVERSTATES THE TIME AND THE QUOTE. Where production continues, the incremental time is the total for (previous + new) units LESS the total for the previous units. Using the cumulative average for the new batch alone charges the customer for learning that has already happened, and can lose the order."),
]

/* ── Chapter 23 · Standard costing and the basic variances ── */

const CH23: AccaQuestion[] = [
  num("PMK-23-01", "PM-23", "D", "easy",
    "18,400 kg of material was purchased for £117,760. The standard price is £6.20 per kg. What is the material PRICE variance, in £? Give an adverse variance as a negative number.",
    -3680, "£", 1,
    "Standard cost of actual quantity = 18,400 × £6.20 = £114,080, against £117,760 actually paid. The variance is £3,680 ADVERSE. Actual price was £117,760/18,400 = £6.40, so 20p per kg over standard across 18,400 kg."),

  num("PMK-23-02", "PM-23", "D", "medium",
    "Standard usage is 4 kg per unit at £6.20 per kg. 4,400 units were made using 18,400 kg. What is the material USAGE variance, in £? Give an adverse variance as a negative number.",
    -4960, "£", 1,
    "Standard quantity for actual output = 4,400 × 4 = 17,600 kg, against 18,400 kg used — 800 kg too many. Valued at the STANDARD price: 800 × £6.20 = £4,960 ADVERSE. Always value the usage variance at standard price, so the price effect is not double-counted."),

  num("PMK-23-03", "PM-23", "D", "medium",
    "9,300 labour hours were worked at a total cost of £120,900. The standard rate is £12.80 per hour. What is the labour RATE variance, in £? Give an adverse variance as a negative number.",
    -1860, "£", 1,
    "Standard cost of actual hours = 9,300 × £12.80 = £119,040, against £120,900 paid — £1,860 ADVERSE. The actual rate was £13.00 an hour, 20p above standard."),

  num("PMK-23-04", "PM-23", "D", "medium",
    "Standard time is 2 hours per unit at £12.80 an hour. 4,400 units were made in 9,300 hours. What is the labour EFFICIENCY variance, in £? Give an adverse variance as a negative number.",
    -6400, "£", 1,
    "Standard hours for actual output = 4,400 × 2 = 8,800, against 9,300 hours worked — 500 hours more than the output warranted. Valued at the standard rate: 500 × £12.80 = £6,400 ADVERSE. Value the efficiency variance at the STANDARD rate, so the rate variance is not double-counted."),

  q("PMK-23-05", "PM-23", "D", "medium",
    "A favourable material price variance of £3,345 appears alongside an adverse material usage variance of £3,500. What is the most likely single cause?",
    [
      "Two unrelated events in purchasing and production",
      "One decision to buy a cheaper, lower-grade material, which saved on price and wasted more in use — a net loss of £155",
      "An error in the standard cost",
      "A change in production volume",
    ],
    1,
    "ONE PURCHASING DECISION. A cheaper grade saves on price and wastes more in use, so the two variances are the two halves of one event and must be netted — here a £155 loss. Reporting purchasing as the winner and production as the loser blames the wrong manager."),

  num("PMK-23-06", "PM-23", "D", "medium",
    "Budgeted sales were 5,000 units and actual sales 5,400 units. Standard contribution is £24 per unit. What is the sales VOLUME variance under marginal costing, in £?",
    9600, "£", 1,
    "(5,400 − 5,000) × £24 = £9,600 FAVOURABLE. Under MARGINAL costing the sales volume variance is valued at standard CONTRIBUTION; under absorption costing it is valued at standard PROFIT. Using the wrong one is wrong by the fixed overhead per unit."),

  num("PMK-23-07", "PM-23", "D", "medium",
    "5,400 units were sold for £399,600. The standard selling price is £76. What is the sales PRICE variance, in £? Give an adverse variance as a negative number.",
    -10800, "£", 1,
    "Standard revenue for actual sales = 5,400 × £76 = £410,400, against £399,600 received — £10,800 ADVERSE. The actual price was £74, £2 below standard on every unit sold."),

  q("PMK-23-08", "PM-23", "D", "hard",
    "An adverse sales price variance of £16,200 appears with a favourable sales volume variance of £4,800. What should be concluded?",
    [
      "The sales team performed well on volume",
      "Discounting cost £16,200 and bought only £4,800 of extra contribution — a net loss of £11,400, so the price cut was not worthwhile",
      "The two variances are unrelated",
      "The standard selling price is wrong",
    ],
    1,
    "THE DISCOUNT LOST £11,400 NET. One decision to cut price produced both variances, and the extra volume it won recovered less than a third of the contribution given away. This is the interdependent pair to look for whenever price and volume variances have opposite signs."),

  num("PMK-23-09", "PM-23", "D", "hard",
    "Standard cost is 3 kg at £5.50 per kg. Actual production was 7,200 units, using 22,320 kg costing £119,412. What is the total material COST variance, in £? Give an adverse variance as a negative number.",
    -612, "£", 1,
    "Standard cost of actual output = 7,200 × 3 × £5.50 = £118,800, against £119,412 incurred — £612 ADVERSE. Check it by splitting: price = (22,320 × £5.50 = £122,760) − £119,412 = £3,348 FAVOURABLE; usage = (21,600 − 22,320) × £5.50 = £3,960 ADVERSE; net £612 ADVERSE ✓. And note what the split reveals that the total hides — a cheaper material used wastefully."),

  multi("PMK-23-10", "PM-23", "D", "medium",
    "Which of the following are valid reasons for an ADVERSE labour efficiency variance? Select TWO.",
    [
      "A wage rise agreed after the standard was set",
      "Poor-quality material that was harder to work with",
      "A change in the standard selling price",
      "Machine breakdown causing idle time within the hours worked",
    ],
    [1, 3],
    "POOR-QUALITY MATERIAL and MACHINE BREAKDOWN. Both make the hours worked produce less than standard. A wage rise affects the RATE variance, not efficiency, and the selling price has nothing to do with either."),

  q("PMK-23-11", "PM-23", "D", "medium",
    "Why is the material usage variance valued at the STANDARD price rather than the actual price?",
    [
      "Because the standard price is more accurate",
      "So that the price effect is reported once, in the price variance, and is not double-counted in the usage variance",
      "Because the actual price is not known until later",
      "Because usage variances are always favourable",
    ],
    1,
    "TO AVOID DOUBLE-COUNTING THE PRICE EFFECT. The price variance already captures the difference between standard and actual price on everything bought, so the usage variance must isolate the QUANTITY effect alone — which means valuing the excess quantity at standard price."),

  q("PMK-23-12", "PM-23", "D", "hard",
    "An adverse labour rate variance appears with a favourable labour efficiency variance. What is the likely cause and the correct analysis?",
    [
      "An error in the payroll",
      "More skilled or experienced staff were used: compare the extra rate paid against the value of the hours saved, and the trade-off may well be worthwhile",
      "The standard hours per unit are wrong",
      "Overtime was worked, which affects only the rate variance",
    ],
    1,
    "MORE SKILLED STAFF — and it may be a good decision. Higher-grade labour costs more per hour and takes fewer hours, so the two variances are the two halves of one staffing choice. Netting them shows whether the time saved was worth the premium paid."),
]

export const PM_KIT_AREA_D_PART1: AccaQuestion[] = [...CH20, ...CH21, ...CH22, ...CH23]
