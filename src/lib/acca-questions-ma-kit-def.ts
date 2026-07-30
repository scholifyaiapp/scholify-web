import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-ma-kit-builders"

/*
 * MA · Areas D, E and F question kit — chapters 16 to 27.
 *
 * Area E is the most formula-dense in the paper, so many of these items are built
 * to test the STRUCTURE of a variance rather than recall of a formula: which
 * quantity is held constant, which price is applied, and whether the comparison
 * is against a flexed or an original budget.
 *
 * Original Scholify content.
 */

/* ── Chapter 16 · Nature and purpose of budgeting ──────────────── */

const CH16: AccaQuestion[] = [
  q("MAK-16-01", "MA-16", "D", "medium", 2,
    "A company can sell 90,000 units next year, but a component shortage limits production to 70,000. Which budget is prepared first?",
    [
      "The sales budget, because sales drive everything else",
      "The production budget, because the component shortage is the principal budget factor",
      "The cash budget, because cash is always the constraint",
      "The master budget, so the others can be worked back from it",
    ],
    1,
    "The PRINCIPAL BUDGET FACTOR is whatever constrains activity, and here it is the component shortage rather than sales demand. So production is budgeted first at 70,000 units and sales follow. Budgeting sales at 90,000 would produce a plan the business cannot execute."),

  q("MAK-16-02", "MA-16", "D", "medium", 2,
    "A manager deliberately overstates budgeted costs so the target will be easier to achieve. This is:",
    ["Feedforward control", "Budgetary slack", "A flexed budget", "Goal congruence"],
    1,
    "BUDGETARY SLACK. It is a rational response to being evaluated on a budget you were asked to set, which is why participative budgeting needs independent challenge of submissions. Goal congruence is the opposite — alignment between the manager's aims and the organisation's."),

  q("MAK-16-03", "MA-16", "D", "hard", 2,
    "Why do the purposes of budgeting conflict with one another?",
    [
      "Because budgets are prepared annually",
      "Because a motivating budget must be demanding, a cash forecast must be realistic, and evaluating a manager on their own budget invites slack",
      "Because different departments use different formats",
      "Because budgets are approved by a committee",
    ],
    1,
    "The requirements genuinely differ: motivation wants a demanding-but-attainable target, cash planning wants the best estimate, and evaluation creates an incentive to build in cushion. No single set of numbers serves all three well, which is why some organisations prepare an aspirational target and a separate realistic forecast."),

  q("MAK-16-04", "MA-16", "D", "medium", 2,
    "What is the difference between feedback and feedforward control?",
    [
      "Feedback is financial; feedforward is non-financial",
      "Feedback compares actual with plan after the event; feedforward compares a forecast with plan and acts before it",
      "Feedback is used by senior management; feedforward by supervisors",
      "They are alternative names for variance analysis",
    ],
    1,
    "FEEDBACK corrects after the event — variance reporting is feedback. FEEDFORWARD compares a FORECAST with the plan and acts before the event, as a cash flow forecast showing a shortfall in three months does. Feedforward is the more valuable, because the outcome can still be changed."),

  q("MAK-16-05", "MA-16", "D", "medium", 2,
    "Who sets a departmental budget, and what is the management accountant's role?",
    [
      "The accountant sets it; the budget holder implements it",
      "The budget holder sets and owns it; the accountant coordinates, advises and consolidates",
      "The budget committee sets every departmental budget in detail",
      "The external auditor approves it before use",
    ],
    1,
    "The BUDGET HOLDER sets and owns their budget; the accountant COORDINATES, ADVISES and CONSOLIDATES. This matters beyond tidiness: a budget imposed by the accounts department carries no commitment from the person expected to meet it, which destroys the motivation and responsibility purposes at once."),

  multi("MAK-16-06", "MA-16", "D", "medium", 2,
    "Which TWO are disadvantages of bottom-up (participative) budgeting?",
    ["It produces no commitment from budget holders", "It invites budgetary slack", "Departmental interests can override corporate strategy", "It makes no use of local operational knowledge"],
    [1, 2],
    "Participative budgeting invites SLACK and can let DEPARTMENTAL INTERESTS dominate. Options 1 and 4 describe TOP-DOWN budgeting's weaknesses — participation is precisely what builds commitment and captures local knowledge, which are its advantages."),

  q("MAK-16-07", "MA-16", "D", "hard", 2,
    "Every department has come in slightly under its cost budget every year for three years, and spending rises sharply in the final month. What does this indicate?",
    [
      "Uniformly excellent cost control across the organisation",
      "Budgetary slack, with year-end spending to avoid a cut next year",
      "That budgets are set top-down",
      "That the budget period is too long",
    ],
    1,
    "Coming in slightly under budget in EVERY department EVERY year is the signature of slack, not of uniform excellence. The final-month spike is the second symptom: managers with unspent budget spend it, because an underspend invites a cut — rational for the manager and wasteful for the organisation."),

  q("MAK-16-08", "MA-16", "D", "medium", 2,
    "What is a budget manual?",
    [
      "The consolidated master budget",
      "The document setting out budgeting procedures, responsibilities, timetable, formats and definitions",
      "The record of variances for the period",
      "The list of budget committee members",
    ],
    1,
    "The BUDGET MANUAL documents the procedures, responsibilities, timetable, formats and definitions, so every department submits on a consistent basis. Without it, submissions arrive on different assumptions and cannot be consolidated meaningfully."),

  q("MAK-16-09", "MA-16", "D", "hard", 2,
    "Which target is most likely to motivate a manager?",
    [
      "One that can be met with no additional effort",
      "One that is demanding but attainable with real effort",
      "One based on ideal conditions that has never been met",
      "One set by the accounts department without consultation",
    ],
    1,
    "A DEMANDING BUT ATTAINABLE target motivates best: too easy produces complacency, impossible is ignored, and imposed carries no commitment. Note the consequence — the most motivating budget is deliberately harder than the expected outcome, so it is the WRONG figure to use for a cash forecast."),

  q("MAK-16-10", "MA-16", "D", "medium", 2,
    "A manager defers necessary machine maintenance to protect this year's cost budget. This is an example of:",
    ["Feedforward control", "Goal congruence", "Dysfunctional behaviour", "Budgetary slack"],
    2,
    "DYSFUNCTIONAL BEHAVIOUR: acting to meet the budget at the organisation's expense. The cost is deferred rather than removed and breakdown risk rises. Budgetary slack is overstating the budget in the first place — a different act, though both arise from being judged on the same figure."),
]

/* ── Chapter 17 · Budget preparation ───────────────────────────── */

const CH17: AccaQuestion[] = [
  num("MAK-17-01", "MA-17", "D", "medium", 2,
    "Budgeted sales are 50,000 units. Opening finished goods inventory is 6,000 units and closing is to be 4,000. What is budgeted production, in units?",
    48000, "units", 1,
    "Production = sales + closing − opening = 50,000 + 4,000 − 6,000 = 48,000 units. Inventory is being REDUCED by 2,000, so 2,000 sales come from existing stock. Reversing the signs gives 52,000 and is the commonest error in Area D, because it then corrupts the materials and labour budgets built on it."),

  num("MAK-17-02", "MA-17", "D", "hard", 2,
    "Production is 24,700 units, each needing 3 kg of material. Opening raw material inventory is 4,000 kg and closing is to be 5,200 kg. What are budgeted purchases, in kg?",
    75300, "kg", 1,
    "Usage = 24,700 × 3 = 74,100 kg. Purchases = usage + closing − opening = 74,100 + 5,200 − 4,000 = 75,300 kg. TWO inventory adjustments are needed in a full budget — one for finished goods to reach production, and this one for raw materials to reach purchases."),

  q("MAK-17-03", "MA-17", "D", "medium", 2,
    "The materials usage budget should be based on:",
    ["Budgeted sales units", "Budgeted production units", "Opening inventory", "The previous year's usage"],
    1,
    "Material is consumed when goods are MADE, so usage follows the PRODUCTION budget. Basing it on sales ignores that some sales may be met from opening finished goods inventory, which consumed material in an earlier period."),

  q("MAK-17-04", "MA-17", "D", "medium", 2,
    "Which of the following must be EXCLUDED from a cash budget?",
    ["Payment for new machinery", "Depreciation of machinery", "A loan repayment", "A dividend payment"],
    1,
    "DEPRECIATION is an accounting expense that never involves a payment, so it is excluded entirely. The other three are all genuine cash movements — and note that buying machinery and paying a dividend are not expenses in the profit calculation at all, yet both belong in the cash budget."),

  num("MAK-17-05", "MA-17", "D", "hard", 2,
    "January sales are $80,000. 30% is received in the month of sale and 70% the following month. December sales were $70,000. What are January cash receipts, in $?",
    73000, "$", 1,
    "Cash sales 30% × $80,000 = $24,000, plus 70% of December's $70,000 = $49,000. Total $73,000. The credit portion of January's own sales ($56,000) arrives in February — reading the lag correctly is what the question tests."),

  q("MAK-17-06", "MA-17", "D", "hard", 2,
    "A company budgets a profit of $240,000 yet its cash budget shows an overdraft developing. Which is a valid explanation?",
    [
      "Profit must have been calculated incorrectly",
      "Growth in receivables and inventory absorbs cash, and capital expenditure, tax and loan repayments consume cash without reducing profit",
      "Depreciation has been omitted from the cash budget",
      "Cash and profit should always be equal over a year",
    ],
    1,
    "Profit and cash answer different questions. Growing working capital absorbs cash; capital expenditure, tax, loan repayments and dividends consume cash without reducing profit; and depreciation reduces profit while consuming none. Note that OMITTING depreciation from a cash budget is correct, not an error."),

  num("MAK-17-07", "MA-17", "D", "hard", 2,
    "Production requires 9,880 labour hours. Five employees are each contracted for 1,750 hours at $16 per hour, with excess hours paid at one and a half times basic. What is the total labour cost, in $?",
    167120, "$", 1,
    "Basic hours available = 5 × 1,750 = 8,750, so overtime = 9,880 − 8,750 = 1,130 hours. Basic cost = 8,750 × $16 = $140,000. Overtime = 1,130 × $24 = $27,120. Total $167,120. Compare hours REQUIRED with hours AVAILABLE before assuming any overtime."),

  q("MAK-17-08", "MA-17", "D", "medium", 2,
    "What does the master budget consist of?",
    [
      "The sales and production budgets only",
      "Three consolidated summaries: forecast profit, forecast position, and the cash budget",
      "Every functional budget listed separately",
      "The capital expenditure budget alone",
    ],
    1,
    "The master budget is the CONSOLIDATION of all the functional budgets into three summary statements — a forecast profit or loss, a forecast position at the period end, and the cash budget. It is what goes to the board for approval."),

  q("MAK-17-09", "MA-17", "D", "medium", 2,
    "What is the difference between sensitivity ('what if') analysis and scenario analysis?",
    [
      "Sensitivity analysis is financial; scenario analysis is non-financial",
      "Sensitivity analysis changes one variable at a time; scenario analysis changes a coherent set together",
      "Sensitivity analysis is used for cash budgets only",
      "They are alternative names for the same technique",
    ],
    1,
    "SENSITIVITY analysis changes ONE variable to identify which assumptions matter most. SCENARIO analysis changes a COHERENT SET together — a recession affecting volume, price and collection period simultaneously. The first isolates; the second tests a plausible combination."),

  multi("MAK-17-10", "MA-17", "D", "medium", 2,
    "Which TWO items appear in a cash budget but not in a budgeted statement of profit or loss?",
    ["Depreciation", "Payment for capital expenditure", "Repayment of loan principal", "Cost of sales"],
    [1, 2],
    "CAPITAL EXPENDITURE and LOAN PRINCIPAL repayments are cash movements that are not expenses. Depreciation is the reverse — an expense that is not a cash movement, so it appears in profit and NOT in the cash budget. Cost of sales appears in both, though at different times."),
]

/* ── Chapter 18 · Flexible budgets and control ─────────────────── */

const CH18: AccaQuestion[] = [
  num("MAK-18-01", "MA-18", "D", "medium", 2,
    "A budget for 8,000 units includes variable cost of $48,000 and fixed cost of $25,000. Actual output was 9,000 units. What is the flexed budget total, in $?",
    79000, "$", 1,
    "Variable cost flexes: $48,000 × 9,000/8,000 = $54,000. Fixed cost does NOT flex and stays at $25,000. Flexed total = $79,000. Flexing BOTH gives $82,125 — the commonest error — and $73,000 is the original unflexed budget."),

  q("MAK-18-02", "MA-18", "D", "hard", 2,
    "Why must a budget be flexed before comparing it with actual results?",
    [
      "To adjust for inflation during the period",
      "Because comparing costs at one volume with a budget set for another mixes the volume effect with performance",
      "Because fixed costs change with activity",
      "To convert absorption costing to marginal costing",
    ],
    1,
    "Comparing actual cost at 12,000 units with a budget for 10,000 measures two things at once — how much was produced and how well — and reports the sum as performance. Flexing holds volume constant so only performance remains. Fixed costs do NOT change with activity, which is why they are not flexed."),

  q("MAK-18-03", "MA-18", "D", "medium", 2,
    "Which costs are flexed when preparing a flexible budget?",
    [
      "All costs, in proportion to activity",
      "Variable costs, and the variable element of semi-variable costs",
      "Fixed costs only",
      "Only direct materials",
    ],
    1,
    "VARIABLE costs flex in proportion to activity, and semi-variable costs flex only in their VARIABLE element — which is why they must be separated first using high/low or regression. Fixed costs stay at the original budget, and flexing them makes the whole exercise meaningless."),

  q("MAK-18-04", "MA-18", "D", "medium", 2,
    "A manager's cost centre report includes an apportioned share of head office costs. Why is this poor practice?",
    [
      "Head office costs are always immaterial",
      "The manager cannot influence them, so including them is neither fair nor useful",
      "Head office costs should be treated as variable",
      "It overstates the cost centre's output",
    ],
    1,
    "CONTROLLABILITY means a manager should be accountable only for what they can influence. An apportioned head office cost fails that test, so including it is unjust AND useless — no available action changes it, and its presence invites the manager to dismiss the whole report."),

  num("MAK-18-05", "MA-18", "D", "hard", 2,
    "A budget for 10,000 units had variable costs of $100,000 and fixed costs of $30,000. Actual output was 12,000 units at a total cost of $151,500. What is the total variance against the FLEXED budget, in $ (adverse as a positive figure)?",
    1500, "$", 1,
    "Flexed budget = variable $100,000 × 12/10 = $120,000, plus fixed $30,000 = $150,000. Actual $151,500 exceeds it by $1,500 ADVERSE. Against the ORIGINAL budget of $130,000 the gap looks like $21,500 — but $20,000 of that is simply the cost of making 2,000 more units."),

  q("MAK-18-06", "MA-18", "D", "medium", 2,
    "Actual revenue is less than the flexed budget. How is the variance labelled?",
    ["Favourable", "Adverse", "Neither, since revenue variances are not labelled", "It depends on the volume achieved"],
    1,
    "Earning LESS revenue than budgeted reduces profit, so the variance is ADVERSE. For COSTS the direction reverses: spending less is favourable. Decide every label by asking whether profit is higher or lower — that test never misleads, whereas applying one rule to both reverses half the labels."),

  q("MAK-18-07", "MA-18", "D", "hard", 2,
    "The difference between the FIXED budget and the FLEXED budget represents:",
    [
      "A performance variance requiring investigation",
      "The volume effect, which is not a performance failure",
      "An error in the original budget",
      "The uncontrollable element of cost",
    ],
    1,
    "Fixed budget to flexed budget is the VOLUME effect — the consequence of operating at a different activity level, not of managing costs well or badly. Only flexed budget to actual measures performance. Investigating the volume effect as though it were a cost failure is what flexing exists to prevent."),

  q("MAK-18-08", "MA-18", "D", "medium", 2,
    "When is a FIXED budget appropriate?",
    [
      "For control reporting against actual performance",
      "For planning and authorising resources against one expected activity level",
      "Wherever a significant part of cost is variable",
      "It is never appropriate",
    ],
    1,
    "The FIXED budget is the plan agreed at the start of the period and the basis for committing resources and authorising spend. The FLEXED budget is prepared afterwards to make control comparisons fair. A well-run system uses both, at different points."),

  multi("MAK-18-09", "MA-18", "D", "medium", 2,
    "Which TWO factors determine whether a variance is worth investigating?",
    ["Its size in absolute and percentage terms", "Whether it is favourable or adverse", "Whether it is controllable by the recipient", "Whether it appears in the first month of the year"],
    [0, 2],
    "SIZE (absolute and percentage) and CONTROLLABILITY are both relevant, along with whether it is a trend, the cost of investigating, and whether the standard is current. Direction is not a criterion — a large FAVOURABLE variance deserves investigation too, since it may reveal a stale standard or a quality shortcut."),

  q("MAK-18-10", "MA-18", "D", "hard", 2,
    "A semi-variable cost has not been split into its fixed and variable elements before flexing. What is the consequence?",
    [
      "None, provided the total is correct",
      "The flexed budget is wrong, because either the whole cost is flexed or none of it is",
      "The variance becomes favourable",
      "Fixed costs are double-counted",
    ],
    1,
    "Without the split, the cost is treated as wholly variable (over-flexed) or wholly fixed (under-flexed), so the flexed budget is wrong and every variance computed from it is wrong too. This is why high/low or regression comes FIRST — cost separation is a prerequisite for control, not a separate topic."),
]

/* ── Chapter 19 · Capital budgeting and payback ────────────────── */

const CH19: AccaQuestion[] = [
  q("MAK-19-01", "MA-19", "D", "medium", 2,
    "Which of the following is a relevant cash flow in an investment appraisal?",
    [
      "Depreciation of the new asset",
      "Market research paid for last year",
      "Rental income forgone by using a building the company already owns",
      "An apportioned share of head office cost that will not change",
    ],
    2,
    "Forgone rental income is an OPPORTUNITY COST — a real cash consequence of choosing the project — and it is the relevant flow candidates most often omit, because no payment is made so it appears in no accounting record. Depreciation is not cash, past research is sunk, and unchanged apportioned overhead is not incremental."),

  q("MAK-19-02", "MA-19", "D", "hard", 2,
    "Why is interest on finance raised for a project excluded from its cash flows?",
    [
      "Interest is not a cash payment",
      "The cost of finance is already reflected in the discount rate, so including interest would charge for it twice",
      "Interest is a sunk cost",
      "Interest is an apportioned overhead",
    ],
    1,
    "The DISCOUNT RATE represents the cost of capital, so the financing cost is already accounted for. Including interest as a project cash flow as well would double-count it. Interest certainly is a cash payment — that is exactly why the exclusion has to be a deliberate rule rather than an oversight."),

  num("MAK-19-03", "MA-19", "D", "medium", 2,
    "$50,000 is invested for 6 years at 8% compound interest. What is the terminal value, in $ to the nearest dollar?",
    79344, "$", 5,
    "Value = P × (1 + r)ⁿ = $50,000 × 1.08⁶ = $50,000 × 1.586874 = $79,344. Simple interest would give $50,000 × (1 + 0.08 × 6) = $74,000 — the $5,344 difference being interest earned on earlier interest. Financial appraisal always assumes compounding."),

  num("MAK-19-04", "MA-19", "D", "hard", 2,
    "A project costs $420,000 with net inflows of $120,000, $150,000, $160,000 and $110,000 in years 1 to 4. Cash arises evenly. What is the payback period, in years to two decimal places?",
    2.94, "years", 0.02,
    "Cumulative: −$300,000 after year 1, −$150,000 after year 2, +$10,000 after year 3. Payback falls in year 3: $150,000 still to recover from that year's $160,000 = 0.9375 of a year. Payback = 2.94 years. Build the cumulative column first, then interpolate within the year it turns positive."),

  q("MAK-19-05", "MA-19", "D", "hard", 2,
    "Project A returns $100,000 a year for 10 years; project B returns $100,000 a year for 3 years. Both cost $300,000. What does payback conclude?",
    [
      "Project A is better because it runs longer",
      "Both have a payback of 3 years, so payback cannot distinguish them",
      "Project B is better because it recovers cash sooner",
      "Neither project pays back",
    ],
    1,
    "Both recover $300,000 in exactly 3 years, so payback rates them identically — despite project A generating $700,000 more in total. This is payback's decisive weakness: it IGNORES ALL CASH FLOWS AFTER the payback point, which is why it belongs alongside NPV rather than instead of it."),

  q("MAK-19-06", "MA-19", "D", "medium", 2,
    "Why does investment appraisal use cash flow rather than accounting profit?",
    [
      "Because cash flow is always larger",
      "Because profit contains non-cash items and judgements, while the decision is whether cash committed now produces more cash later",
      "Because profit cannot be forecast",
      "Because cash flow is required by accounting standards",
    ],
    1,
    "Profit contains DEPRECIATION, accruals and provisions — non-cash items and judgements — whereas cash is a fact and is what the decision concerns. The most important consequence is that depreciation is excluded from every appraisal, since the asset's cost already appears as the initial outflow."),

  multi("MAK-19-07", "MA-19", "D", "medium", 2,
    "Which TWO items are relevant cash flows?",
    ["Working capital invested at the start and recovered at the end", "Depreciation charged over the asset's life", "Scrap proceeds on disposal at the end of the project", "Research costs already incurred"],
    [0, 2],
    "WORKING CAPITAL (an outflow at the start and an inflow when released) and SCRAP PROCEEDS are both future, incremental cash flows. Depreciation is not a cash flow at all, and already-incurred research is a SUNK cost that no present decision can change."),

  q("MAK-19-08", "MA-19", "D", "medium", 2,
    "Which is capital rather than revenue expenditure?",
    [
      "Routine servicing of a machine",
      "Delivery and installation costs of a new machine",
      "Repainting the factory",
      "Staff training to operate a new machine",
    ],
    1,
    "DELIVERY AND INSTALLATION are part of the cost of bringing the asset into working condition, so they are capitalised. Servicing and repainting maintain rather than enhance. Training is revenue expenditure — though note it IS a relevant cash flow for the appraisal, which is a different question."),

  q("MAK-19-09", "MA-19", "D", "hard", 2,
    "What three tests must a cash flow pass to be relevant to an investment decision?",
    [
      "Material, measurable and documented",
      "Future, incremental and cash",
      "Budgeted, approved and audited",
      "Fixed, variable and semi-variable",
    ],
    1,
    "FUTURE, INCREMENTAL and CASH. Each word excludes something specific: past flows (sunk costs), flows arising anyway (committed costs and unchanged apportioned overhead), and non-cash items (depreciation). Working through the three tests item by item is the reliable way to build the appraisal."),

  q("MAK-19-10", "MA-19", "D", "medium", 2,
    "Which is an advantage of the payback period?",
    [
      "It accounts for the time value of money",
      "It emphasises liquidity, which matters to a cash-constrained business",
      "It measures total project profitability",
      "It uses all of a project's cash flows",
    ],
    1,
    "Payback's genuine strengths are simplicity and its emphasis on LIQUIDITY and early cash recovery, which reduces risk and matters to a cash-constrained business. It ignores the time value of money (unless discounted), ignores everything after the payback point, and says nothing about total profitability."),
]

/* ── Chapter 20 · Discounted cash flow ─────────────────────────── */

const CH20: AccaQuestion[] = [
  num("MAK-20-01", "MA-20", "D", "medium", 2,
    "The cost of capital is 8%. What is the present value of $12,000 receivable in perpetuity, first payment in one year, in $?",
    150000, "$", 1,
    "Perpetuity factor = 1 ÷ r = 1 ÷ 0.08 = 12.5. PV = $12,000 × 12.5 = $150,000. Sense-check it: $150,000 invested at 8% yields $12,000 a year indefinitely without touching the capital. Multiplying by 8 instead of dividing by 0.08 gives $96,000 and is the standard error."),

  q("MAK-20-02", "MA-20", "D", "medium", 2,
    "A cash flow arising at time 0 is discounted at what factor?",
    ["1 ÷ (1 + r)", "1", "r", "It is excluded from the appraisal"],
    1,
    "Time 0 is NOW, so its present value equals its face value and the discount factor is 1 — it is not discounted at all. Only future flows are converted to present value. Note also that 'the start of year 2' is the same instant as 'the end of year 1'."),

  num("MAK-20-03", "MA-20", "D", "hard", 2,
    "The 5-year annuity factor at 10% is 3.791 and the 8-year factor is 5.335. The 3-year factor is 2.487. What is the present value of $40,000 a year received in years 4 to 8, in $?",
    113920, "$", 50,
    "This is a DELAYED annuity. Take the factor to the LAST year of the flows (8 years, 5.335) and deduct the factor for the years with no flows (3 years, 2.487): 5.335 − 2.487 = 2.848. PV = $40,000 × 2.848 = $113,920. Using the 5-year factor of 3.791 would ignore the three-year delay entirely."),

  num("MAK-20-04", "MA-20", "D", "hard", 2,
    "NPV is +$48,000 at 10% and −$16,000 at 15%. Using linear interpolation, what is the IRR, as a percentage to two decimal places?",
    13.75, "%", 0.05,
    "IRR ≈ L + [NPV_L ÷ (NPV_L − NPV_H)] × (H − L) = 10 + [48,000 ÷ (48,000 − (−16,000))] × 5 = 10 + (48,000 ÷ 64,000) × 5 = 10 + 3.75 = 13.75%. Keep the SIGNS: subtracting a negative NPV_H makes the denominator larger, which is where marks are lost."),

  q("MAK-20-05", "MA-20", "D", "medium", 2,
    "A project has a positive NPV of $40,000 at a 12% cost of capital. What does this mean?",
    [
      "The project earns exactly 12%",
      "The project earns more than 12% and increases shareholder wealth by $40,000 in today's terms",
      "The project will generate $40,000 of accounting profit",
      "The project pays back in 12 years",
    ],
    1,
    "A POSITIVE NPV means returns exceed the cost of capital used to discount them, so shareholder wealth rises — by $40,000 measured in TODAY'S dollars. An NPV of exactly zero would mean earning precisely 12%, which is the IRR condition. NPV is not accounting profit."),

  q("MAK-20-06", "MA-20", "D", "hard", 2,
    "Two mutually exclusive projects: X has IRR 30% and NPV $20,000; Y has IRR 16% and NPV $85,000. The cost of capital is 10%. Which should be chosen?",
    [
      "X, because its IRR is far higher",
      "Y, because NPV measures the absolute increase in shareholder wealth",
      "Neither, because the measures conflict",
      "Both, since both exceed the cost of capital",
    ],
    1,
    "Where NPV and IRR conflict on RANKING mutually exclusive projects, follow the NPV — it measures absolute wealth added, which is what shareholders receive, while IRR is a percentage silent about scale. X's 30% is earned on a much smaller base. Both are individually acceptable, but only one can be chosen."),

  num("MAK-20-07", "MA-20", "D", "hard", 2,
    "A project needs $500,000 of machinery and $60,000 of working capital now. Annual inflows are $180,000 for 4 years (4-year annuity factor 3.170). Scrap of $50,000 and the working capital are recovered at the end of year 4 (year 4 factor 0.683). What is the NPV, in $?",
    85730, "$", 100,
    "T0 = −$560,000 (not discounted). Years 1–4: $180,000 × 3.170 = $570,600. Year 4 terminal: ($50,000 + $60,000) × 0.683 = $75,130. NPV = −560,000 + 570,600 + 75,130 = +$85,730. Depreciation is excluded and working capital IS recovered — the two adjustments most often missed."),

  q("MAK-20-08", "MA-20", "D", "medium", 2,
    "What is the internal rate of return?",
    [
      "The cost of capital used to discount a project",
      "The discount rate at which a project's NPV is exactly zero",
      "The accounting rate of return on the investment",
      "The rate at which the project pays back",
    ],
    1,
    "The IRR is the discount rate at which NPV is ZERO — the return the project itself generates. The decision rule is to accept if it exceeds the cost of capital. It is estimated by interpolation between two rates whose NPVs have opposite signs, and the result is an approximation because the true relationship is a curve."),

  multi("MAK-20-09", "MA-20", "D", "medium", 2,
    "Which TWO are limitations of the IRR?",
    ["It ignores the time value of money", "It can produce multiple answers where cash flows change sign more than once", "It ignores the scale of a project, so it ranks unreliably", "It requires the cost of capital to be known before it can be calculated"],
    [1, 2],
    "IRR can give MULTIPLE answers where cash flows change sign repeatedly, and being a percentage it IGNORES SCALE so it ranks competing projects unreliably. It does account for the time value of money, and it needs the cost of capital only to INTERPRET the result, not to compute it."),

  q("MAK-20-10", "MA-20", "D", "hard", 2,
    "Why is a dollar received in one year worth less than a dollar today?",
    [
      "Because interest rates are always positive",
      "Because it could have been invested, because inflation erodes purchasing power, and because a future receipt carries risk",
      "Because accounting standards require discounting",
      "Because money loses value only through inflation",
    ],
    1,
    "Three reasons together: the OPPORTUNITY to invest in the meantime, INFLATION eroding purchasing power, and the RISK that a future receipt may not arrive — plus a simple preference for liquidity sooner. Option 4 names only one of them, which is why it is incomplete rather than wrong."),
]

/* ── Chapter 21 · Standard costing systems ─────────────────────── */

const CH21: AccaQuestion[] = [
  q("MAK-21-01", "MA-21", "E", "medium", 2,
    "Which type of standard is normally recommended for control purposes?",
    [
      "Ideal, because it maximises pressure to improve",
      "Attainable, because it is demanding but achievable so variances remain meaningful",
      "Current, because it reflects conditions as they are",
      "Basic, because it permits long-run comparison",
    ],
    1,
    "An ATTAINABLE standard assumes efficient working with normal allowances for waste and downtime, keeping variances informative. An IDEAL standard produces permanently adverse variances that managers learn to ignore, a CURRENT standard builds existing inefficiency in, and a BASIC standard drifts out of date."),

  q("MAK-21-02", "MA-21", "E", "hard", 2,
    "A factory sets its material standard assuming zero wastage, though normal unavoidable wastage is 4%. What is the consequence?",
    [
      "Wastage will fall to zero as staff respond to the target",
      "Every month shows an adverse usage variance regardless of performance, so the report stops signalling anything",
      "The standard cost will be too high",
      "Favourable usage variances will arise",
    ],
    1,
    "An IDEAL standard produces a permanently adverse variance of about 4% in every department, whatever anyone did. Within two quarters managers learn the variance says nothing about their work — so a genuine rise in wastage produces a bigger number nobody investigates. The standard was uninformative, which is worse than merely ambitious."),

  q("MAK-21-03", "MA-21", "E", "medium", 2,
    "Why does every cost variance split into two parts?",
    [
      "To separate controllable from uncontrollable costs",
      "Because every standard combines a quantity and a price, which have different causes and different managers responsible",
      "To satisfy accounting standards",
      "Because variances must always net to zero",
    ],
    1,
    "A standard is TWO estimates — how much input a unit should take, and what that input should cost. So each cost variance divides into a PRICE/RATE element and a USAGE/EFFICIENCY element, and purchasing owns the first while production owns the second."),

  q("MAK-21-04", "MA-21", "E", "medium", 2,
    "A standard cost is best described as:",
    [
      "A forecast of what a unit will actually cost",
      "The planned unit cost — what a unit should cost under specified conditions",
      "The lowest cost achieved in any previous period",
      "The cost of the cheapest available materials",
    ],
    1,
    "A standard cost is what a unit SHOULD cost under specified conditions — a control BENCHMARK, not a prediction of the actual outcome. That distinction matters because an attainable standard is deliberately slightly more demanding than the expected result."),

  q("MAK-21-05", "MA-21", "E", "hard", 2,
    "The same adverse material price variance has appeared every month for a year. What is the most likely conclusion?",
    [
      "The purchasing manager has performed poorly for twelve consecutive months",
      "The standard price is out of date and should be revised",
      "The material usage variance must be favourable",
      "The variance should be ignored because it is consistent",
    ],
    1,
    "A variance recurring with the same sign every month is evidence about the STANDARD, not about performance. It should have been revised long before month twelve — and while it is stale, every material variance the system produces is uninformative, so ignoring it is not an option either."),

  multi("MAK-21-06", "MA-21", "E", "medium", 2,
    "Which TWO are limitations of standard costing?",
    ["It cannot be used to value inventory", "It suits stable repetitive production and fits bespoke work poorly", "It can encourage dysfunctional behaviour, such as buying cheap poor-quality material", "It cannot be used for budgeting"],
    [1, 2],
    "Standard costing assumes STABLE, REPETITIVE processes and fits bespoke or fast-changing output poorly; and it can drive DYSFUNCTIONAL behaviour, the classic case being a favourable price variance won by buying inferior material. Inventory valuation and budgeting are two of its main USES."),

  q("MAK-21-07", "MA-21", "E", "medium", 2,
    "Which standard reflects conditions as they currently are, including existing inefficiency?",
    ["Ideal", "Attainable", "Current", "Basic"],
    2,
    "A CURRENT standard reflects conditions as they actually are, including any existing inefficiency — which makes it realistic for forecasting but useless as an incentive, since the inefficiency is built into the target. An ATTAINABLE standard allows only for NORMAL waste, not for avoidable inefficiency."),

  q("MAK-21-08", "MA-21", "E", "hard", 2,
    "Why does standard costing sit awkwardly with total quality management?",
    [
      "TQM does not measure costs",
      "Standard costing assumes a fixed benchmark, while continuous improvement assumes the target should keep moving",
      "Standard costing cannot handle quality costs",
      "TQM requires marginal costing",
    ],
    1,
    "Standard costing assumes a stable process and a FIXED benchmark; continuous improvement assumes the target should keep moving. Standard costing also emphasises COST, which can conflict with quality — a favourable price variance from inferior material being the classic example of the tension."),

  q("MAK-21-09", "MA-21", "E", "medium", 2,
    "What information source is normally used to set a standard LABOUR TIME?",
    [
      "Supplier quotations",
      "Time and motion study, and historic performance adjusted for expected efficiency",
      "The wage agreement",
      "The overhead absorption rate",
    ],
    1,
    "Standard TIME comes from time and motion study and adjusted historic performance, allowing for learning on a new product. The wage agreement sets the standard RATE — the two halves of the labour standard, which is why the labour variance splits into rate and efficiency."),

  q("MAK-21-10", "MA-21", "E", "hard", 2,
    "With an attainable standard in use, how should a small adverse variance be interpreted?",
    [
      "As evidence of poor performance requiring investigation",
      "As normal, since an attainable standard allows for normal waste but expects efficient working",
      "As an error in the standard",
      "As evidence that the standard is ideal rather than attainable",
    ],
    1,
    "An attainable standard is demanding but achievable, so small variances in either direction are NORMAL and only significant ones warrant investigation. That is precisely what makes the variances informative — a standard producing permanently large adverse figures has stopped being a signal."),
]

/* ── Chapter 22 · Variance calculation ─────────────────────────── */

const CH22: AccaQuestion[] = [
  num("MAK-22-01", "MA-22", "E", "medium", 2,
    "Standard material is 3 kg at $5 per kg. Actual output was 2,000 units using 6,300 kg. What is the material USAGE variance, in $ (adverse as a positive figure)?",
    1500, "$", 1,
    "Standard quantity for actual output = 2,000 × 3 = 6,000 kg. Actual 6,300 kg, so 300 kg too much. Usage variance = 300 × $5 STANDARD price = $1,500 adverse. Valuing it at the actual price would let the price effect contaminate the usage variance."),

  num("MAK-22-02", "MA-22", "E", "hard", 2,
    "21,500 kg were purchased and used for a total of $158,000. The standard price is $7.50 per kg. What is the material PRICE variance, in $ (favourable as a positive figure)?",
    3250, "$", 5,
    "Standard cost of the actual quantity = 21,500 × $7.50 = $161,250, against actual cost $158,000 — so $3,250 FAVOURABLE. The price variance is computed on the quantity PURCHASED, because that is when the price was paid; usage is computed on the quantity USED."),

  q("MAK-22-03", "MA-22", "E", "hard", 2,
    "Which hours are used for the labour RATE variance and which for the labour EFFICIENCY variance?",
    [
      "Both use hours worked",
      "Rate uses hours PAID; efficiency uses hours WORKED",
      "Rate uses hours WORKED; efficiency uses hours PAID",
      "Both use standard hours for actual output",
    ],
    1,
    "The RATE variance uses hours PAID, because that is what the rate was paid on. The EFFICIENCY variance uses hours WORKED, because that is the time actually spent producing. The difference between them is the idle time, isolated in its own always-adverse variance."),

  num("MAK-22-04", "MA-22", "E", "hard", 2,
    "240 hours were idle at a standard rate of $16 per hour. What is the idle time variance, in $ (adverse as a positive figure)?",
    3840, "$", 1,
    "Idle time variance = idle hours × standard rate = 240 × $16 = $3,840 ADVERSE. Idle time is always adverse — hours were paid for and produced nothing. Separating it matters: without it the efficiency variance absorbs the idle time and conceals that the problem was downtime rather than working pace."),

  q("MAK-22-05", "MA-22", "E", "hard", 2,
    "Budgeted fixed overhead is $90,000 and actual fixed overhead $94,000. What is the fixed overhead EXPENDITURE variance?",
    [
      "$4,000 adverse",
      "$4,000 favourable",
      "It depends on the activity level achieved",
      "Nil, because fixed overhead does not vary",
    ],
    0,
    "Budgeted less actual = $90,000 − $94,000 = $4,000 ADVERSE. This is the ONE variance not flexed to actual activity, because fixed overhead is not expected to change with output — so the activity level is irrelevant here, though it drives the separate VOLUME variance."),

  num("MAK-22-06", "MA-22", "E", "hard", 2,
    "Standard fixed overhead rate is $15 per hour. Standard hours for actual output are 7,800 and budgeted hours were 8,000. What is the fixed overhead VOLUME variance, in $ (adverse as a positive figure)?",
    3000, "$", 1,
    "Volume variance = $15 × (7,800 − 8,000) = $15 × (−200) = $3,000 ADVERSE. Output measured in standard hours fell short of budget, so overhead was under-absorbed. It splits further into capacity (hours worked vs budgeted) and efficiency (standard hours vs hours worked)."),

  q("MAK-22-07", "MA-22", "E", "hard", 2,
    "At what value is the sales VOLUME variance calculated?",
    [
      "Standard selling price per unit",
      "Standard profit or contribution per unit",
      "Actual selling price per unit",
      "Standard variable cost per unit",
    ],
    1,
    "At standard MARGIN — standard PROFIT per unit under absorption costing, or standard CONTRIBUTION under marginal. Selling one more unit gains its margin, not its whole revenue, because the extra unit brought extra variable cost with it. Valuing at selling price is the commonest sales variance error."),

  q("MAK-22-08", "MA-22", "E", "hard", 2,
    "A favourable material price variance appears alongside adverse material usage and adverse labour efficiency variances. What is the most likely single cause?",
    [
      "Production staff were poorly trained",
      "Cheaper, lower-quality material was purchased",
      "The selling price was reduced",
      "Fixed overheads were overspent",
    ],
    1,
    "Buying CHEAPER, LOWER-QUALITY material produces exactly this pattern: favourable price, then adverse usage as more is wasted and adverse efficiency as it is harder to work. Variances are interdependent — investigating the favourable price variance alone would reward a decision that cost money overall."),

  num("MAK-22-09", "MA-22", "E", "medium", 2,
    "Budgeted sales were 5,000 units at $95. Actual sales were 5,200 units at an average $93. What is the sales PRICE variance, in $ (adverse as a positive figure)?",
    10400, "$", 1,
    "Sales price variance = actual units × (actual price − standard price) = 5,200 × ($93 − $95) = $10,400 ADVERSE. It is computed on the units ACTUALLY sold, not on budgeted units — every unit sold was $2 below standard price."),

  q("MAK-22-10", "MA-22", "E", "medium", 2,
    "What check confirms that a set of material variances has been calculated correctly?",
    [
      "The variances should net to zero",
      "Standard cost of actual output less actual cost should equal the sum of the price and usage variances",
      "The price variance should always exceed the usage variance",
      "The variances should equal the change in inventory",
    ],
    1,
    "Standard cost of ACTUAL OUTPUT less actual cost must equal the SUM of the two variances. It takes seconds and catches almost every error — most often a usage variance valued at actual rather than standard price, or a comparison made against the original budget instead of actual output."),
]

/* ── Chapter 23 · Reconciling budgeted and actual profit ───────── */

const CH23: AccaQuestion[] = [
  num("MAK-23-01", "MA-23", "E", "medium", 2,
    "Budgeted profit is $60,000. The only variances are sales volume $5,000 favourable and material usage $8,000 adverse. What is actual profit, in $?",
    57000, "$", 1,
    "$60,000 + $5,000 F − $8,000 A = $57,000. Favourable variances ADD and adverse DEDUCT, because the label already encodes the profit effect. If a reconciliation does not reach the stated actual profit, check the SIGNS before the arithmetic — a reversed sign is far more common than a mis-addition."),

  q("MAK-23-02", "MA-23", "E", "hard", 2,
    "In a MARGINAL costing operating statement, at what value is the sales volume variance stated?",
    ["Standard profit per unit", "Standard contribution per unit", "Standard selling price", "Actual contribution per unit"],
    1,
    "At standard CONTRIBUTION, because under marginal costing fixed overhead does not change with volume — so an extra unit sold gains its contribution in full. Under ABSORPTION costing it is valued at standard PROFIT, which is lower by the fixed overhead per unit."),

  q("MAK-23-03", "MA-23", "E", "hard", 2,
    "Why is there no fixed overhead VOLUME variance in a marginal costing operating statement?",
    [
      "Because fixed overhead is always equal to budget",
      "Because fixed overhead is not absorbed into units, so a difference in activity cannot cause under- or over-absorption",
      "Because volume variances apply only to sales",
      "Because marginal costing ignores fixed overhead entirely",
    ],
    1,
    "Marginal costing does not ABSORB fixed overhead into units, so activity differing from budget cannot produce under- or over-absorption. Only the EXPENDITURE variance exists. Note that marginal costing does not ignore fixed overhead — it deducts the actual amount in full from contribution."),

  q("MAK-23-04", "MA-23", "E", "medium", 2,
    "In an operating statement, adding the sales volume variance to budgeted profit gives:",
    [
      "Actual profit",
      "Standard profit on actual sales",
      "Actual contribution",
      "The flexed budget total cost",
    ],
    1,
    "Budgeted profit plus the sales volume variance gives STANDARD PROFIT ON ACTUAL SALES — the budget restated for the volume actually sold, which is the flexing step. The price and cost variances are then applied to reach actual profit."),

  num("MAK-23-05", "MA-23", "E", "hard", 2,
    "Budgeted contribution is $160,000. Sales volume variance $6,400 F, sales price $10,400 A, variable cost variances $9,230 A. Actual fixed overhead is $126,000. What is actual profit under marginal costing, in $?",
    20770, "$", 10,
    "Actual contribution = $160,000 + $6,400 − $10,400 − $9,230 = $146,770. Deduct ACTUAL fixed overhead $126,000 = $20,770. Note it is ACTUAL fixed overhead deducted in full, not budgeted — the expenditure variance is captured automatically by using the actual figure."),

  q("MAK-23-06", "MA-23", "E", "medium", 2,
    "How is a favourable variance treated in an operating statement?",
    ["Deducted from profit", "Added to profit", "Ignored", "Added only if it exceeds a tolerance"],
    1,
    "A FAVOURABLE variance ADDS to profit and an ADVERSE variance DEDUCTS, because the label already encodes the profit effect. Tolerances govern whether a variance is INVESTIGATED, not whether it enters the reconciliation — every variance appears."),

  q("MAK-23-07", "MA-23", "E", "hard", 2,
    "Actual profit is $42,000 below budget. The largest single variance is a $46,000 adverse sales price variance, and this is the fourth consecutive month of adverse price and favourable volume variances. What is the key finding?",
    [
      "Costs are out of control",
      "A sustained discounting strategy is trading price for volume, and on these figures losing money",
      "The sales team is underperforming on volume",
      "The standard cost is out of date",
    ],
    1,
    "Four consecutive months of adverse price with favourable volume is a PATTERN, not four coincidences: price is being traded for volume. And it is losing money — $46,000 given away this month to gain a smaller volume benefit. The pattern across months is the finding; the single month's figures are not."),

  multi("MAK-23-08", "MA-23", "E", "medium", 2,
    "Which TWO differences distinguish a marginal from an absorption costing operating statement?",
    ["The sales price variance is valued differently", "The sales volume variance is valued at contribution rather than profit", "There is no fixed overhead volume variance", "Variable cost variances are excluded"],
    [1, 2],
    "Only two things change: the sales VOLUME variance is valued at CONTRIBUTION, and there is NO fixed overhead VOLUME variance. The sales price variance is identical under both methods, and variable cost variances appear in both."),

  q("MAK-23-09", "MA-23", "E", "medium", 2,
    "What should be done first when interpreting an operating statement?",
    [
      "Investigate every variance in the order listed",
      "State the overall gap between budgeted and actual profit, in money and percentage terms",
      "Recalculate each variance to confirm accuracy",
      "Identify which manager is responsible for each item",
    ],
    1,
    "Start with the OVERALL GAP, then rank variances by size, link offsetting pairs, identify a likely cause tied to the scenario, and recommend action. Investigating in the order listed disperses attention, and recalculating everything is not interpretation."),

  q("MAK-23-10", "MA-23", "E", "hard", 2,
    "An operating statement does not reconcile to the actual profit given in the question. What should be checked first?",
    [
      "Whether the budgeted profit figure is correct",
      "Whether any favourable or adverse sign has been reversed",
      "Whether the sales volume variance was omitted",
      "Whether fixed overhead was flexed",
    ],
    1,
    "A REVERSED SIGN is far more common than an arithmetic error, because the direction has to be decided for every line. Check signs before recomputing anything — and note the useful property that a single reversed sign produces a discrepancy of exactly twice that variance."),
]

/* ── Chapter 24 · Performance measurement concepts ─────────────── */

const CH24: AccaQuestion[] = [
  q("MAK-24-01", "MA-24", "F", "medium", 2,
    "A hospital reduces cost per operation by 12% while readmissions rise sharply. Which of the three Es has failed?",
    ["Economy", "Efficiency", "Effectiveness", "None — cost fell"],
    2,
    "Lower cost per operation demonstrates ECONOMY and EFFICIENCY. But a hospital's objective is to treat patients successfully, and rising readmissions mean that objective is not met — so EFFECTIVENESS has failed. Economy and efficiency can both be improved in ways that defeat the purpose."),

  q("MAK-24-02", "MA-24", "F", "medium", 2,
    "What does effectiveness measure?",
    [
      "Obtaining inputs at the lowest cost",
      "Maximum output from a given input",
      "The extent to which the organisation achieves its objectives",
      "The ratio of output to capacity",
    ],
    2,
    "EFFECTIVENESS is achievement of OBJECTIVES. Economy concerns the cost of inputs and efficiency the conversion of inputs into outputs — an organisation can be highly economical and efficient at doing the wrong thing, which is precisely why all three Es are needed together."),

  q("MAK-24-03", "MA-24", "F", "hard", 2,
    "A manager improves the measured cost per unit by producing far more than can be sold. This is:",
    ["Effectiveness", "Goal displacement", "Economy", "Value for money"],
    1,
    "GOAL DISPLACEMENT: the manager pursues the MEASURE rather than the objective, so cost per unit improves while the organisation carries excess inventory, tied-up cash and obsolescence risk. It is a failure of measure DESIGN, and the remedy is a balanced set including something like inventory days."),

  q("MAK-24-04", "MA-24", "F", "hard", 2,
    "Why should a performance measurement set include a measure that would deteriorate if the primary measure were gamed?",
    [
      "To increase the number of measures reported",
      "Because it makes gaming visible, which is what makes a set balanced rather than merely numerous",
      "Because accounting standards require it",
      "To allow comparison with competitors",
    ],
    1,
    "That is precisely what makes a set BALANCED: pairing cost per unit with inventory days, or calls per hour with first-contact resolution, means optimising one at the other's expense shows up. A set of measures that all move together is numerous rather than balanced."),

  q("MAK-24-05", "MA-24", "F", "medium", 2,
    "Why are non-financial measures valuable alongside financial ones?",
    [
      "They are easier to calculate",
      "They explain why the financial result occurred and often change before it does",
      "They are required for statutory reporting",
      "They cannot be manipulated at all",
    ],
    1,
    "A financial measure gives the RESULT; a non-financial one gives the REASON and often moves FIRST — a rising defect rate and lengthening lead times are visible before profit falls. They are also harder to manipulate than financial figures, though not impossible."),

  q("MAK-24-06", "MA-24", "F", "medium", 2,
    "What is 'value for money' in a not-for-profit organisation?",
    [
      "Minimising total expenditure",
      "The achievement of economy, efficiency and effectiveness together",
      "Maximising the surplus generated",
      "Matching income to expenditure exactly",
    ],
    1,
    "VALUE FOR MONEY is the achievement of all three Es together, and it substitutes for the profit measure such a body does not have. Simply minimising expenditure would be economy alone, which can easily defeat effectiveness."),

  multi("MAK-24-07", "MA-24", "F", "medium", 2,
    "Which TWO characteristics should a good performance measure have?",
    ["Controllable by the person assessed on it", "Difficult for anyone to understand", "Resistant to manipulation", "Reported once a year only"],
    [0, 2],
    "CONTROLLABILITY and RESISTANCE TO MANIPULATION are both essential, alongside relevance, objectivity, understandability, timeliness, cost-effectiveness and consistency. A measure its subject cannot understand cannot change their behaviour, and annual reporting is far too infrequent to influence anything."),

  q("MAK-24-08", "MA-24", "F", "hard", 2,
    "Why is performance measurement harder in a not-for-profit organisation?",
    [
      "Its objectives are always financial",
      "There is no single bottom line, objectives are often multiple and qualitative, and outputs are far easier to count than outcomes",
      "It has no performance data available",
      "It cannot use non-financial measures",
    ],
    1,
    "There is no single bottom line; objectives may be multiple, qualitative and in tension; and OUTPUTS are much easier to count than OUTCOMES — a training charity can count courses delivered far more easily than lives improved. That creates a structural risk of managing what can be measured."),

  q("MAK-24-09", "MA-24", "F", "medium", 2,
    "A call centre assesses staff solely on calls handled per hour. Customer satisfaction falls while the measure improves. Why?",
    [
      "Staff are deliberately underperforming",
      "The measure rewards ENDING calls rather than RESOLVING them, so it is being pursued at satisfaction's expense",
      "Satisfaction surveys are unreliable",
      "Call volumes have risen beyond capacity",
    ],
    1,
    "Calls per hour rewards ending calls, so the rational response is to close them quickly — which produces exactly this pattern. It is also self-defeating: unresolved calls generate repeat calls, so the measure partly counts the same problem twice. The fault is the measure, not the staff."),

  q("MAK-24-10", "MA-24", "F", "hard", 2,
    "Which pairing describes economy correctly?",
    [
      "Obtaining the required inputs at the lowest cost",
      "Producing the maximum output from a given input",
      "Achieving the organisation's stated objectives",
      "Reducing total expenditure regardless of output",
    ],
    0,
    "ECONOMY is obtaining the REQUIRED inputs at the lowest cost — the word 'required' matters, because simply spending less by buying less or worse is not economy. Option 2 is efficiency, option 3 effectiveness, and option 4 is the false economy the three Es exist to expose."),
]

/* ── Chapter 25 · Performance measurement in application ───────── */

const CH25: AccaQuestion[] = [
  num("MAK-25-01", "MA-25", "F", "medium", 2,
    "Operating margin is 8% and asset turnover is 2.5 times. What is ROCE, as a percentage?",
    20, "%", 0.1,
    "ROCE = operating margin × asset turnover = 8% × 2.5 = 20%. This decomposition is the basis of interpretation: any change in ROCE must come either from the margin earned per sale or from the sales generated per dollar of capital, and identifying which is what makes the analysis useful."),

  num("MAK-25-02", "MA-25", "F", "hard", 2,
    "Inventory $420,000; cost of sales $3,640,000. What is inventory days, to one decimal place?",
    42.1, "days", 0.2,
    "Inventory days = inventory ÷ COST OF SALES × 365 = 420 ÷ 3,640 × 365 = 42.1 days. The denominator is cost of sales because inventory is held at cost — using revenue is a very common error and understates the figure."),

  num("MAK-25-03", "MA-25", "F", "hard", 2,
    "Inventory days 42.1, receivables days 42.8, payables days 39.6. What is the working capital cycle, in days to one decimal place?",
    45.3, "days", 0.2,
    "Cycle = inventory days + receivables days − payables days = 42.1 + 42.8 − 39.6 = 45.3 days. This is the period cash is tied up between paying suppliers and collecting from customers, and every day of it must be financed — which is why a growing profitable business can run short of cash."),

  num("MAK-25-04", "MA-25", "F", "hard", 2,
    "A division has profit of $600,000 on capital employed of $3,000,000. The group's cost of capital is 12%. What is residual income, in $?",
    240000, "$", 1,
    "RI = divisional profit − (capital employed × imputed interest rate) = $600,000 − (12% × $3,000,000 = $360,000) = $240,000. RI is an ABSOLUTE amount; ROI here would be 20%, a percentage — which is why the two can rank projects differently."),

  q("MAK-25-05", "MA-25", "F", "hard", 2,
    "A division's ROI is 22%. A project offering 16% is available and the group's cost of capital is 12%. What is the risk of judging the manager on ROI?",
    [
      "The manager will accept the project, correctly",
      "The manager may reject it, because it would dilute the divisional ROI from 22% toward 16%",
      "ROI and residual income would agree",
      "There is no risk, since 16% exceeds 12%",
    ],
    1,
    "The project earns above the 12% cost of capital so the GROUP benefits, but accepting it lowers the division's measured average from 22% — giving a manager judged on ROI an incentive to REJECT it. Residual income avoids this, because any project above 12% raises RI."),

  q("MAK-25-06", "MA-25", "F", "hard", 2,
    "What weakness do ROI and residual income share?",
    [
      "Both ignore the cost of capital",
      "Both are distorted by asset age, so a division that has recently invested appears worse for having invested",
      "Neither can be calculated for a division",
      "Both are percentages, so neither shows scale",
    ],
    1,
    "Old, heavily depreciated assets give a small capital employed figure and flatter BOTH measures, while a division that has just invested shows a larger capital base and looks worse — precisely because it invested. This also discourages replacement. Note RI is an absolute amount, not a percentage."),

  q("MAK-25-07", "MA-25", "F", "medium", 2,
    "A company's current ratio is 4:1. Why might this not be good news?",
    [
      "A high current ratio always indicates insolvency",
      "It may reflect excessive inventory, uncollected receivables or idle cash earning nothing",
      "Current ratios above 2:1 breach accounting standards",
      "It means current liabilities have been understated",
    ],
    1,
    "A high current ratio can mean unsold INVENTORY, uncollected RECEIVABLES or idle CASH — none of which is healthy. Liquidity ratios must be read alongside the ACTIVITY ratios that explain what the current assets consist of; a rising current ratio driven by rising inventory days is a warning."),

  num("MAK-25-08", "MA-25", "F", "medium", 2,
    "Revenue $5,200,000 and capital employed $3,400,000. What is asset turnover, in times to two decimal places?",
    1.53, "times", 0.02,
    "Asset turnover = revenue ÷ capital employed = 5,200 ÷ 3,400 = 1.53 times. It measures sales generated per dollar of capital, and multiplied by the operating margin it gives ROCE — so a fall in asset turnover with a stable margin means the asset base has grown faster than sales."),

  multi("MAK-25-09", "MA-25", "F", "medium", 2,
    "Which TWO are limitations of ratio analysis?",
    ["A ratio raises a question rather than answering it", "Ratios cannot be calculated for service businesses", "Different accounting policies make ratios non-comparable between companies", "Ratios are always manipulated"],
    [0, 2],
    "A ratio SHOWS that something changed without explaining why, and different POLICIES, year ends and definitions undermine comparability between companies. Ratios apply perfectly well to service businesses, and while they CAN be manipulated through window dressing, saying they always are overstates it."),

  q("MAK-25-10", "MA-25", "F", "hard", 2,
    "Capacity utilisation has risen to 98%. Which measure should be reported alongside it, and why?",
    [
      "Revenue, to show the benefit",
      "Reject rate or on-time delivery, because running at full stretch commonly raises defects and unreliability",
      "Asset turnover, because it uses the same capital base",
      "Gearing, because capacity requires investment",
    ],
    1,
    "High utilisation is only good news if QUALITY has held. Running equipment and people at full stretch commonly raises defects, breakdowns and staff turnover — so a utilisation measure reported alone invites a trade-off it cannot see. Pair it with reject rate or on-time delivery."),
]

/* ── Chapter 26 · Cost reduction and value enhancement ─────────── */

const CH26: AccaQuestion[] = [
  q("MAK-26-01", "MA-26", "F", "medium", 2,
    "Which is a genuine cost reduction rather than a false economy?",
    [
      "Deferring planned machine maintenance",
      "Redesigning a product to use fewer components while maintaining its function",
      "Switching to cheaper, lower-grade raw material",
      "Halving the training budget",
    ],
    1,
    "Redesigning to use fewer components while MAINTAINING FUNCTION lowers the standard cost permanently with nothing given up — the definition of cost reduction. The others defer or transfer cost: maintenance deferral raises breakdown risk, cheap material reappears as wastage and warranty, and cutting training damages future capability."),

  q("MAK-26-02", "MA-26", "F", "medium", 2,
    "What is the difference between cost control and cost reduction?",
    [
      "They are alternative names for the same activity",
      "Control keeps costs within an existing standard; reduction lowers the standard itself",
      "Control applies to variable costs; reduction to fixed costs",
      "Control is short term; reduction is impossible in the short term",
    ],
    1,
    "CONTROL asks whether we are spending what we said we would; REDUCTION asks whether the amount we said we would spend should be lower. Control can only ever deliver the existing standard — reduction changes what is achievable, and the qualifier is 'without sacrificing quality or function'."),

  q("MAK-26-03", "MA-26", "F", "hard", 2,
    "In value analysis, a feature adds no use value and no esteem value. What should be done?",
    [
      "Retain it, because removing features reduces quality",
      "Remove it, since cost supporting neither type of value is waste",
      "Retain it if it is inexpensive",
      "Increase spending on it to create esteem value",
    ],
    1,
    "Cost supporting NEITHER use value (what the item does) nor esteem value (what the customer pays a premium for) contributes nothing the customer values — it is waste, and removing it lowers cost without reducing exchange value. Cost supporting ESTEEM value must be judged commercially rather than cut."),

  q("MAK-26-04", "MA-26", "F", "hard", 2,
    "A kettle's visible brushed-steel body finish costs $2.10 and is part of why it sells at $40 rather than $28. What type of value does it add, and should it be removed?",
    [
      "Use value; remove it, since it does not affect performance",
      "Esteem value; retain it, since removing it would reduce exchange value by more than $2.10",
      "Cost value; remove it to reduce the standard cost",
      "No value; remove it immediately",
    ],
    1,
    "It adds ESTEEM value — the prestige or attractiveness the customer is demonstrably paying for, given the $12 price differential. Removing it would save $2.10 and cost far more in exchange value. Stripping esteem value from a premium product is the classic value-analysis mistake."),

  q("MAK-26-05", "MA-26", "F", "medium", 2,
    "How do value analysis and value engineering differ?",
    [
      "Value analysis applies to services; value engineering to products",
      "Value engineering acts at the design stage; value analysis examines an existing product",
      "Value engineering is performed by accountants; value analysis by engineers",
      "They are alternative names for the same technique",
    ],
    1,
    "The difference is TIMING, and it matters enormously: value ENGINEERING acts at the DESIGN stage, where most of a product's cost is still determined, so its scope is far greater. Value ANALYSIS works on an existing product against a cost structure already largely committed."),

  q("MAK-26-06", "MA-26", "F", "medium", 2,
    "Which best distinguishes business process re-engineering from continuous improvement?",
    [
      "BPR is driven by staff; continuous improvement by senior management",
      "BPR makes radical one-off changes to process design; continuous improvement makes many small incremental changes",
      "BPR is low risk; continuous improvement is high risk",
      "They are alternative names for the same technique",
    ],
    1,
    "BPR is RADICAL and DISCONTINUOUS — a fundamental redesign, usually top-down and high risk. Continuous improvement makes MANY SMALL changes, usually bottom-up and low risk per change. Options 1 and 3 reverse the characteristics of each."),

  multi("MAK-26-07", "MA-26", "F", "medium", 2,
    "Which TWO are the four types of value in value analysis?",
    ["Use value", "Market share value", "Esteem value", "Depreciated value"],
    [0, 2],
    "The four types are COST value (what it costs to produce), EXCHANGE value (what a customer will pay), USE value (what it does) and ESTEEM value (the prestige it confers). Market share and depreciated value are not among them."),

  q("MAK-26-08", "MA-26", "F", "hard", 2,
    "What is the test of whether a cost reduction is genuine?",
    [
      "Whether the reported cost figure has fallen",
      "Whether the cost has been removed, rather than merely moved or deferred",
      "Whether it was approved by the budget committee",
      "Whether it exceeds 5% of the original cost",
    ],
    1,
    "A saving that reappears as overtime, wastage, warranty cost, lost customers or next year's deferred maintenance is not a saving. The test is whether the cost was REMOVED — which is why a fall in one department's figure proves nothing until you check the rest of the group."),

  q("MAK-26-09", "MA-26", "F", "medium", 2,
    "Packaging costs $2.40 per unit using three layers of foam, and transit damage is 0.1%. What is the appropriate response in a value analysis?",
    [
      "Remove all packaging, since damage is negligible",
      "Test a reduced specification and quantify the damage trade-off before deciding",
      "Retain it unchanged, since damage is already low",
      "Increase packaging, since damage is not zero",
    ],
    1,
    "Three layers for a 0.1% damage rate suggests over-specification, but the answer is TEST rather than CUT: a rise from 0.1% to 1% in damage could easily cost more than the $2.40 saved in replacement chairs, freight and goodwill. Quantify the trade-off before acting."),

  q("MAK-26-10", "MA-26", "F", "hard", 2,
    "Which is a risk of poorly-executed cost reduction?",
    [
      "It always increases reported profit",
      "Cost is moved to another department or deferred to a later period, so the group saves nothing",
      "It reduces the number of performance measures needed",
      "It has no effect on quality",
    ],
    1,
    "The characteristic failure is cost being MOVED or DEFERRED rather than removed — a saving in purchasing reappearing as wastage in production, or maintenance deferred into next year. Quality damage, lost capability, morale effects and customer defection are the other risks, and none of them is visible in the department that made the saving."),
]

/* ── Chapter 27 · Monitoring performance and reporting ─────────── */

const CH27: AccaQuestion[] = [
  q("MAK-27-01", "MA-27", "F", "medium", 2,
    "A report shows a $300 favourable variance on a $2m budget, and a $4,000 adverse variance recurring for five consecutive months. Which should be investigated?",
    [
      "Both, since all variances require explanation",
      "The recurring $4,000 variance, because a persistent trend matters more than a trivial one-off",
      "The $300 favourable variance, because favourable variances are always suspicious",
      "Neither, as both are immaterial against $2m",
    ],
    1,
    "Significance depends on size, TREND and controllability. $300 on $2m is trivial in both absolute and percentage terms, while a $4,000 variance recurring for five months is a pattern — and a persistently same-signed variance usually indicates the STANDARD is out of date, which is itself worth knowing."),

  q("MAK-27-02", "MA-27", "F", "hard", 2,
    "A company investigates only adverse variances. What is the principal risk?",
    [
      "Favourable variances will become adverse over time",
      "Out-of-date standards, quality shortcuts and manipulation go undetected, and better methods are never adopted elsewhere",
      "Managers will stop reporting favourable variances",
      "There is no risk, since favourable variances are good news",
    ],
    1,
    "A large FAVOURABLE variance may reveal a stale standard, a quality shortcut that will cost more later, deferred spending, or a genuinely better method worth copying. Investigating only bad news means the organisation never learns from good news and never detects manipulation."),

  q("MAK-27-03", "MA-27", "F", "medium", 2,
    "How should the level of detail in a performance report vary by management level?",
    [
      "It should be identical at every level for consistency",
      "Detail decreases and summarisation increases as reports move up the organisation",
      "Detail increases as reports move up the organisation",
      "Only financial detail should reach senior management",
    ],
    1,
    "Detail DECREASES and summarisation INCREASES up the organisation. A board receiving 40 pages of departmental variances will read none of them; a supervisor receiving only group ROCE can act on nothing. Matching detail to the recipient's decisions is the most important design choice and the commonest failure."),

  q("MAK-27-04", "MA-27", "F", "medium", 2,
    "What is management by exception?",
    [
      "Reporting only to exceptional managers",
      "Reporting and investigating only items falling outside a defined tolerance",
      "Excluding exceptional items from the accounts",
      "Reporting only favourable results",
    ],
    1,
    "MANAGEMENT BY EXCEPTION reports and investigates only items outside a defined TOLERANCE, on the basis that management attention is scarce and belongs where it can change something. Items within tolerance are recorded but not raised."),

  q("MAK-27-05", "MA-27", "F", "hard", 2,
    "Which is interpretation rather than description of a variance report?",
    [
      "Material cost exceeded budget by $14,000",
      "Material cost was 9% above budget",
      "Material cost was $14,000 above the flexed budget, almost all usage rather than price, coinciding with the supplier change in week 2; I recommend testing the previous specification",
      "Total costs were $486,000 against a budget of $472,000",
    ],
    2,
    "Only the third option INTERPRETS: it uses a valid benchmark, isolates which element moved, links it to something specific in the scenario, and recommends an action. The others restate figures the reader can already see."),

  q("MAK-27-06", "MA-27", "F", "hard", 2,
    "How does a punitive reporting style affect behaviour?",
    [
      "It improves accuracy, since managers check figures carefully",
      "Managers conceal problems, dispute figures and build slack into next year's budget",
      "It has no effect on behaviour",
      "It encourages early disclosure of problems",
    ],
    1,
    "Where a report is used to allocate BLAME, managers conceal problems, dispute the figures and build slack into future budgets. A DIAGNOSTIC style — used to find causes — makes early disclosure safe and useful. The style changes behaviour as much as the measures do."),

  q("MAK-27-07", "MA-27", "F", "medium", 2,
    "Which item should be reported separately in a manager's performance report?",
    [
      "Direct materials used in their department",
      "Costs the manager cannot control, such as apportioned head office charges",
      "Output achieved against target",
      "Labour hours worked",
    ],
    1,
    "UNCONTROLLABLE items should be shown separately, or the whole report loses credibility and the controllable items get dismissed alongside them. The other three are all within the manager's influence and belong in the assessed section."),

  multi("MAK-27-08", "MA-27", "F", "medium", 2,
    "Which TWO features should a performance report have?",
    ["Comparison against a valid benchmark such as a flexed budget", "The same content for every recipient", "Trends across several periods rather than one", "Maximum possible detail, so nothing is omitted"],
    [0, 2],
    "A valid BENCHMARK and TRENDS across periods are both essential — one month is an observation, three is a pattern. Identical content for every recipient ignores what each can act on, and maximum detail guarantees the report is not read."),

  q("MAK-27-09", "MA-27", "F", "hard", 2,
    "On-time delivery has fallen from 96% to 88% while sales volume ran 8% above budget. What does this most likely indicate, and why does it matter?",
    [
      "A data error, since higher volume should improve delivery",
      "Capacity is being stretched, and delivery reliability is a leading indicator that will reach the financial results later",
      "Customers have become more demanding",
      "Nothing, since the financial results are ahead of budget",
    ],
    1,
    "Selling 8% above budget while reliability falls 8 points suggests capacity is stretched — the utilisation-versus-quality trade-off. Delivery reliability is a LEADING indicator: it will show up as lost orders and returns before it shows up in profit, which is exactly why non-financial measures belong in the report."),

  q("MAK-27-10", "MA-27", "F", "hard", 2,
    "What is the ultimate test of a management accounting system?",
    [
      "The accuracy of its cost allocations",
      "Whether the decisions it changes are better than the ones that would have been taken without it",
      "The speed with which it closes the month",
      "Its compliance with accounting standards",
    ],
    1,
    "A system is only as good as the DECISIONS it changes. The costing may be immaculate and the variances arithmetically perfect, and if the report reaches the wrong person, too late, in too much detail or in a form that punishes rather than diagnoses, none of it alters a single decision."),
]

export const MA_KIT_CH16_27: AccaQuestion[] = [
  ...CH16, ...CH17, ...CH18, ...CH19, ...CH20, ...CH21,
  ...CH22, ...CH23, ...CH24, ...CH25, ...CH26, ...CH27,
]
