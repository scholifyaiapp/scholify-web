/*
 * MA Area D — Budgeting.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Budgeting is one of MA's three multi-task question topics, so this area is
 * where the 10-mark format legitimately appears — and where the plan changes
 * shape. On an MTQ the tasks are marked independently, so a wrong figure in task
 * (i) does not have to cost the marks in (iii): the discipline is to carry your
 * own figure forward and keep going, which is the opposite of the OT instinct to
 * stop when a number looks wrong.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const MA_PLANS_D: ExamPlanMap = {
  /* ── MA-16 · The nature and purpose of budgeting ─────────────── */

  "MA-16::why-budget": {
    title: "Naming the purpose a budget is serving",
    format: "ot",
    marks: 2,
    requirement:
      "A company sets departmental budgets and requires managers to explain any variance above 5%. This use of budgeting is principally for:\n\nA  Planning\nB  Control\nC  Communication\nD  Authorisation",
    plan: [
      {
        step: "List the purposes budgets serve",
        detail:
          "Planning, control, communication, co-ordination, motivation, performance evaluation and authorisation of spending. A budget serves several at once, so the question is which one the described ACTIVITY belongs to.",
      },
      {
        step: "Split planning from control on timing",
        detail:
          "Planning happens before the period — setting out what should occur. Control happens during and after — comparing what did occur with what should have, and acting on the difference.",
      },
      {
        step: "Locate the described activity in that sequence",
        detail:
          "Explaining variances happens after the event and compares actual with budget. That is control, and specifically control by exception, since only variances above a threshold are pursued.",
      },
      {
        step: "Acknowledge that setting the budget was planning",
        detail:
          "The stem contains both activities. Setting departmental budgets is planning; requiring explanations of variances is control. The word \"principally\" points at the second, which is the distinctive one.",
      },
    ],
    answer:
      "**B — control.**\n\nControl is the comparison of actual results with the budget and the action taken on the difference. Requiring managers to explain variances above 5% is precisely that — and specifically **management by exception**, since only variances large enough to matter are investigated.\n\nThe stem contains both activities: setting the budgets was planning, which happens before the period. Control happens during and after it. The distinguishing test is always timing.\n\nThe 5% threshold is itself examinable: it exists because investigating every variance would cost more than it saves, and small variances are usually random rather than controllable.",
    earns: [
      "Splitting planning from control on when the activity happens",
      "Naming the threshold as management by exception rather than an arbitrary rule",
    ],
    loses: ["Answering planning because the stem opens with budgets being set"],
  },

  "MA-16::planning-control-cycle": {
    title: "Placing a step in the planning and control cycle",
    format: "ot",
    marks: 2,
    requirement:
      "In the planning and control cycle, what should immediately follow the identification of a significant adverse variance?\n\nA  Setting next year's budget\nB  Investigating the cause and taking corrective action\nC  Revising the objective\nD  Recording the transaction in the ledger",
    plan: [
      {
        step: "Set the cycle out in order",
        detail:
          "Set objectives → identify alternatives → select a course of action → implement it → measure actual results → compare with plan → take corrective action → feed back into objectives, and round again.",
      },
      {
        step: "Locate the stem's step in the cycle",
        detail:
          "Identifying a variance is the comparison stage. The step that immediately follows comparison is corrective action, which is what makes the cycle a control mechanism rather than a reporting one.",
      },
      {
        step: "See why a variance alone achieves nothing",
        detail:
          "A variance identified and not acted on has cost the effort of measuring and produced no benefit. The loop only closes when something changes as a result.",
      },
      {
        step: "Test the tempting alternative",
        detail:
          "Revising the objective may follow eventually, if investigation shows the plan was unachievable. But it comes AFTER investigation, and revising a target because it was missed is how budgets stop meaning anything.",
      },
    ],
    answer:
      "**B — investigating the cause and taking corrective action.**\n\nThe cycle runs: set objectives → identify alternatives → select → implement → measure actual results → compare with plan → **take corrective action** → feed back. Identifying a variance is the comparison stage, and corrective action immediately follows it.\n\nA variance identified and not acted upon has consumed the cost of measurement and produced nothing — the loop only closes when something changes.\n\nRevising the objective may follow eventually, if investigation shows the plan was unachievable. But it comes **after** investigation, and revising targets simply because they were missed is how a budget stops meaning anything.",
    earns: ["Knowing corrective action is what makes the cycle a control mechanism"],
    loses: ["Revising the objective first, which resolves the variance by moving the target"],
  },

  "MA-16::administration": {
    title: "Who does what in administering the budget process",
    format: "ot",
    marks: 2,
    requirement:
      "The document setting out the budget timetable, responsibilities and procedures for all managers involved is the:\n\nA  Master budget\nB  Budget manual\nC  Principal budget factor\nD  Budget committee's minutes",
    plan: [
      {
        step: "Identify what the described document contains",
        detail:
          "Timetable, responsibilities and procedures — instructions on how the process is to be run. That is administrative guidance, not a set of figures.",
      },
      {
        step: "Separate documents of instruction from documents of numbers",
        detail:
          "The budget manual instructs. The master budget is the resulting set of figures — the budgeted profit or loss, statement of financial position and cash budget.",
      },
      {
        step: "Rule out the option that is not a document at all",
        detail:
          "The principal budget factor is the constraint limiting activity, usually sales demand. It is a concept, not a document, and is offered because the phrase sounds procedural.",
      },
      {
        step: "Place the budget committee correctly",
        detail:
          "The committee co-ordinates the process and resolves conflicts between departments; the budget officer administers it day to day. Minutes record its meetings rather than governing the process.",
      },
    ],
    answer:
      "**B — the budget manual.**\n\nThe budget manual is the process document: the timetable, who is responsible for preparing what, the procedures to follow and the formats to use. It instructs rather than reporting figures.\n\nThe **master budget** is the output — the budgeted statement of profit or loss, statement of financial position and cash budget consolidated. The **principal budget factor** is the constraint limiting activity, usually sales demand, and is a concept rather than a document.\n\nThe **budget committee** co-ordinates the process and resolves conflicts between departments, with the budget officer administering it day to day.",
    earns: ["Separating documents of instruction from documents of figures"],
    loses: ["Choosing the master budget, which is the process's output rather than its rulebook"],
  },

  "MA-16::the-stages": {
    title: "Identifying the principal budget factor and budgeting from it",
    format: "ot",
    marks: 2,
    requirement:
      "A company can sell 50,000 units, has machine capacity for 40,000 units, and could obtain materials for 60,000 units. The principal budget factor is:\n\nA  Sales demand\nB  Machine capacity\nC  Material availability\nD  There is no principal budget factor",
    plan: [
      {
        step: "Define the principal budget factor as the binding constraint",
        detail:
          "It is the factor limiting the organisation's activity — the tightest constraint, not the largest number. Everything else must be budgeted around it.",
      },
      {
        step: "List the three limits and take the smallest",
        detail:
          "Sales 50,000, machines 40,000, materials 60,000. The smallest is machine capacity at 40,000 units, so that is what limits activity.",
      },
      {
        step: "Confirm by asking what happens if it is relaxed",
        detail:
          "Adding machine capacity would let output rise toward 50,000, the next constraint. Adding materials would change nothing, which proves materials is not binding.",
      },
      {
        step: "Know why it must be budgeted first",
        detail:
          "Every other budget flows from it. Budgeting production at 50,000 when only 40,000 can be made produces a plan that cannot be executed, and every downstream budget inherits the error.",
      },
    ],
    answer:
      "**B — machine capacity.**\n\nThe principal budget factor is the **binding constraint** — the tightest limit on activity, not the largest figure. Sales allow 50,000, materials allow 60,000, machines allow only 40,000, so machines bind.\n\nThe confirming test is to ask what relaxing each would achieve. More machine capacity would let output rise toward 50,000, the next constraint; more material would achieve nothing.\n\nIt must be budgeted **first** because every other budget flows from it. Budgeting production at 50,000 units when only 40,000 can be made produces a plan that cannot be executed, and each downstream budget — materials, labour, cash — inherits the error.\n\nSales demand is the principal budget factor in most organisations, which is why option A is offered.",
    earns: [
      "Taking the smallest limit rather than the most familiar one",
      "Confirming with the relaxation test",
    ],
    loses: ["Answering sales demand from the general rule without checking the numbers given"],
  },

  "MA-16::behavioural": {
    title: "The behavioural consequence of how a budget is set",
    format: "ot",
    marks: 2,
    requirement:
      "Managers who participate in setting their own budgets may build in **budgetary slack**. This means they:\n\nA  Set targets that are impossible to achieve\nB  Deliberately understate revenue or overstate cost, making the target easier to meet\nC  Fail to submit their budgets on time\nD  Spend the entire budget regardless of need",
    plan: [
      {
        step: "Define slack precisely",
        detail:
          "Deliberately building in easement — understating revenue or overstating cost — so that the target can be met comfortably and a favourable variance is likely.",
      },
      {
        step: "Connect it to the participation trade-off",
        detail:
          "Participation improves acceptance, motivation and the quality of information, because managers know their own operations. Its cost is that the same managers have an incentive to make their own target easy.",
      },
      {
        step: "Reject the option describing the opposite",
        detail:
          "A describes an impossible target, which is the failure of an imposed top-down budget rather than a participative one. It is the mirror-image error.",
      },
      {
        step: "Note the related but distinct behaviour",
        detail:
          "D describes spending the whole budget so next year's allocation is not cut — a real behavioural problem, and a different one. Slack is about how the target was SET, not how the money was spent.",
      },
    ],
    answer:
      "**B — deliberately understate revenue or overstate cost, making the target easier to meet.**\n\nSlack is easement built into the budget so the target can be met comfortably and a favourable variance is likely.\n\nIt is the specific cost of **participative** budgeting. Participation improves acceptance, motivation and information quality — managers know their own operations better than head office does — but those same managers have an incentive to make their own targets easy.\n\nOption A is the mirror-image failure, belonging to an **imposed** top-down budget: unachievable targets demotivate, because a manager who believes the target is impossible stops trying at all. Option D describes spending the full allocation to protect next year's budget — a real problem, but about how money is spent rather than how the target was set.",
    earns: ["Tying slack to participation and the opposite failure to imposition"],
    loses: ["Confusing slack with an unachievable target, which is the reverse defect"],
  },

  /* ── MA-17 · Budget preparation ──────────────────────────────── */

  "MA-17::sales-and-production": {
    title: "Deriving the production budget from sales and inventory",
    format: "ot",
    marks: 2,
    requirement:
      "Budgeted sales are 24,000 units. Opening finished goods inventory is 3,000 units and closing inventory is budgeted at 5,000 units. The production budget is:\n\nA  22,000 units\nB  24,000 units\nC  26,000 units\nD  32,000 units",
    plan: [
      {
        step: "Write the relationship out rather than recalling a formula",
        detail:
          "Opening inventory + production = sales + closing inventory. Everything available must equal everything used, and rearranging this beats memorising a sign convention.",
      },
      {
        step: "Rearrange for production",
        detail:
          "Production = sales + closing inventory − opening inventory = 24,000 + 5,000 − 3,000 = **26,000 units**.",
      },
      {
        step: "Sanity-check the direction",
        detail:
          "Inventory is being built up by 2,000 units, so production must exceed sales by 2,000. 26,000 is 2,000 above 24,000, which agrees.",
      },
      {
        step: "Identify the reversed answer",
        detail:
          "22,000 comes from reversing the two inventory figures — the answer if inventory were being run down. The direction check catches it in one line.",
      },
    ],
    answer:
      "**C — 26,000 units.**\n\nProduction = sales + closing inventory − opening inventory = 24,000 + 5,000 − 3,000 = **26,000 units**.\n\nThe reliable way to get the signs right is to write the identity out: opening inventory + production = sales + closing inventory. Rearranging it is safer than recalling which figure is added.\n\nThe direction check confirms it: inventory rises by 2,000 units, so production must exceed sales by 2,000. Option A, 22,000, reverses the inventory figures and would mean running inventory down.\n\nThe same structure drives the materials purchases budget one step later: purchases = material usage + closing material inventory − opening material inventory.",
    earns: [
      "Writing the identity rather than recalling a sign convention",
      "Checking the answer against the direction of the inventory movement",
    ],
    loses: ["Reversing opening and closing inventory, which is the offered wrong answer"],
  },

  "MA-17::labour-budget": {
    title: "Building the labour budget including idle time",
    format: "ot",
    marks: 2,
    requirement:
      "Production is budgeted at 8,000 units, each requiring 0.5 productive hours. Idle time is expected to be 20% of total hours paid. Total hours to be paid for are:\n\nA  3,200 hours\nB  4,000 hours\nC  4,800 hours\nD  5,000 hours",
    plan: [
      {
        step: "Compute productive hours first",
        detail:
          "8,000 units × 0.5 hours = 4,000 productive hours. This is the work actually needed on the product, before any allowance.",
      },
      {
        step: "Read what the 20% is a percentage OF",
        detail:
          "Idle time is 20% of hours PAID, not 20% of productive hours. That means productive hours are the remaining 80% of hours paid, and this is the whole question.",
      },
      {
        step: "Gross up rather than adding on",
        detail:
          "Hours paid = 4,000 ÷ 0.8 = **5,000 hours**. Idle time is then 1,000 hours, which is 20% of 5,000 ✓.",
      },
      {
        step: "Compute the wrong version to see the distractor",
        detail:
          "Adding 20% of productive hours gives 4,000 × 1.2 = 4,800, which is option C. It looks right and fails the check — 800 idle out of 4,800 is 16.7%, not 20%.",
      },
    ],
    answer:
      "**D — 5,000 hours.**\n\nProductive hours = 8,000 × 0.5 = **4,000**. Idle time is 20% of hours **paid**, so productive hours are the other 80%:\n\nHours paid = 4,000 ÷ 0.8 = **5,000 hours**, of which 1,000 are idle.\n\nCheck: 1,000 ÷ 5,000 = 20% ✓.\n\nOption C, 4,800, comes from adding 20% to productive hours — and fails its own check, since 800 ÷ 4,800 = 16.7%. Whenever a percentage is quoted **of the total**, gross up by dividing; only add on when it is quoted of the base.\n\nThe same gross-up appears in the materials budget where a wastage percentage is expressed as a proportion of input.",
    earns: [
      "Reading what the percentage is a percentage of, then dividing rather than adding",
      "Verifying the idle percentage against the grossed-up total",
    ],
    loses: ["Adding 20% to productive hours, which produces the plausible offered wrong answer"],
  },

  "MA-17::cash-budget": {
    title: "Building a cash budget with credit terms",
    format: "mtq",
    marks: 10,
    requirement:
      "A company's budgeted sales are: April $80,000, May $100,000, June $120,000. 30% of customers pay in the month of sale and 70% in the following month. Purchases equal 60% of the same month's sales and are paid one month after purchase. Wages of $15,000 are paid in the month incurred. A machine costing $60,000 will be paid for in June. The opening cash balance at 1 June is $12,000.\n\n(i) Calculate the cash received from customers in June.\n(ii) Calculate the cash paid to suppliers in June.\n(iii) Calculate the closing cash balance at 30 June.\n(iv) State ONE action the company could take in response to the balance you have calculated.",
    plan: [
      {
        step: "Separate the profit question from the cash question first",
        detail:
          "A cash budget records money moving, not income earned. Sales enter when CASH arrives and purchases when cash is paid. Depreciation would never appear; the machine appears in full when paid.",
      },
      {
        step: "Build a receipts line by tracing each month's sales forward",
        detail:
          "June receipts come from two months: 30% of June's sales, plus 70% of May's. Writing which month each element comes from prevents the whole timing error the question is built on.",
      },
      {
        step: "Do the same for payments, remembering purchases lag a month",
        detail:
          "June's payment is for MAY's purchases, which are 60% of May's sales. Using June's own purchases is the standard error and produces a plausible wrong figure.",
      },
      {
        step: "Total, and carry your own figures forward",
        detail:
          "Opening balance + receipts − payments = closing balance. Each task is marked independently, so even if (i) is wrong, using your own figure in (iii) still earns the marks for the method.",
      },
      {
        step: "Answer part (iv) with something specific",
        detail:
          "\"Improve cash flow\" earns nothing. Name an action: arrange an overdraft, defer the machine purchase, tighten credit control, or negotiate longer supplier terms.",
      },
    ],
    answer:
      "**(i) Cash received from customers in June**\n30% of June sales: 30% × $120,000 = $36,000\n70% of May sales: 70% × $100,000 = $70,000\nTotal received = **$106,000**\n\n**(ii) Cash paid to suppliers in June**\nJune pays for MAY's purchases: 60% × $100,000 = **$60,000**\n\n**(iii) Closing balance at 30 June**\nOpening balance $12,000\nAdd receipts $106,000\nLess suppliers ($60,000)\nLess wages ($15,000)\nLess machine ($60,000)\nClosing balance = **$(17,000)** — an overdrawn balance\n\n**(iv)** Arrange an overdraft facility to cover the month, or defer the machine payment to July when no capital payment falls due. Either is acceptable, and both are specific; \"improve cash flow\" would earn nothing.\n\nApril's sales are given but are never used — the 70% from April was collected in May. Data that is not needed is deliberate, and reaching for it is how the timing error starts.",
    earns: [
      "Recording cash when it moves rather than when the sale or purchase occurs",
      "Sourcing June's supplier payment from May's purchases",
      "Carrying your own figures into later tasks, since each is marked independently",
      "Naming a specific action in (iv) rather than a general aspiration",
    ],
    loses: [
      "Paying for June's purchases in June, ignoring the one-month credit period",
      "Omitting the machine because it is capital rather than revenue expenditure — a cash budget records every payment",
      "Abandoning parts (iii) and (iv) after an error in (i), when they are separately marked",
    ],
  },

  "MA-17::master-and-whatif": {
    title: "What the master budget consists of, and what 'what if' adds",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** normally part of the master budget?\n\nA  The budgeted statement of profit or loss\nB  The budgeted statement of financial position\nC  The cash budget\nD  The budget manual",
    plan: [
      {
        step: "Recall the three components",
        detail:
          "Budgeted statement of profit or loss, budgeted statement of financial position, and the cash budget. Three summary statements consolidating every functional budget.",
      },
      {
        step: "Register the NOT and look for the outsider",
        detail:
          "Three options will be the components. The fourth will be something budget-related that is not one of the summary statements.",
      },
      {
        step: "Identify the budget manual's role",
        detail:
          "It sets out the process — timetable, responsibilities, procedures. It is an input to preparing the master budget, not part of it.",
      },
      {
        step: "Note why the cash budget is separate from the profit statement",
        detail:
          "Profit and cash differ in timing and in what they include. A company can budget a profit and run out of cash, which is why the cash budget is a component in its own right.",
      },
    ],
    answer:
      "**D — the budget manual.**\n\nThe master budget has three components: the **budgeted statement of profit or loss**, the **budgeted statement of financial position** and the **cash budget**. They consolidate every functional budget into a summary of the plan.\n\nThe budget manual sets out how the process is run — timetable, responsibilities, procedures — and is an input to preparing the master budget rather than part of it.\n\nThe cash budget is a component in its own right because profit and cash differ in both timing and content: a company can budget a healthy profit and still run out of cash, which is the single most useful thing a cash budget reveals.\n\n**\"What if\" analysis** then flexes the assumptions — what if sales fall 10%, what if material prices rise 5% — which spreadsheets make practical.",
    earns: ["Knowing the master budget is three statements, with cash as one of them"],
    loses: ["Treating any budget-related document as part of the master budget"],
  },

  /* ── MA-18 · Flexible budgets and budgetary control ──────────── */

  "MA-18::why-flex": {
    title: "Why a fixed budget cannot control anything",
    format: "ot",
    marks: 2,
    requirement:
      "Budgeted output was 10,000 units with variable cost of $50,000. Actual output was 12,000 units with variable cost of $57,000. Comparing actual cost with the ORIGINAL budget suggests an adverse variance of $7,000. The correct variance, on a flexed budget, is:\n\nA  $7,000 adverse\nB  $3,000 favourable\nC  $3,000 adverse\nD  $10,000 favourable",
    plan: [
      {
        step: "See why the original comparison is meaningless",
        detail:
          "It compares the cost of making 12,000 units with the budget for making 10,000. More units must cost more, so the variance measures the volume difference rather than any control failure.",
      },
      {
        step: "Flex the budget to actual activity",
        detail:
          "Budgeted variable cost per unit = $50,000 ÷ 10,000 = $5. Flexed budget for 12,000 units = 12,000 × $5 = **$60,000**.",
      },
      {
        step: "Compare like with like",
        detail:
          "Actual $57,000 against flexed budget $60,000 = **$3,000 FAVOURABLE**. The sign reverses entirely once the comparison is valid.",
      },
      {
        step: "Say what the flexing has separated",
        detail:
          "The $7,000 apparent overspend was really a $10,000 volume effect and a $3,000 favourable expenditure effect. Only the second is something a manager controlled.",
      },
    ],
    answer:
      "**B — $3,000 favourable.**\n\nBudgeted variable cost per unit = $50,000 ÷ 10,000 = **$5**.\nFlexed budget for actual output = 12,000 × $5 = **$60,000**.\nActual cost $57,000 against flexed budget $60,000 = **$3,000 favourable**.\n\nThe original comparison reversed the sign completely, because it compared the cost of making 12,000 units against a budget for 10,000. More units must cost more, so an \"adverse\" result was inevitable regardless of how well cost was controlled.\n\nFlexing separates the two effects: a **$10,000 volume** effect and a **$3,000 favourable expenditure** effect. Only the second is something the manager controlled, which is the entire point of a flexible budget.",
    earns: [
      "Flexing before comparing, so like is compared with like",
      "Naming what the flexing separates — volume effect from expenditure effect",
    ],
    loses: ["Reporting the unflexed variance, which measures activity rather than performance"],
  },

  "MA-18::when-each": {
    title: "Choosing between a fixed and a flexible budget",
    format: "ot",
    marks: 2,
    requirement:
      "For which purpose is a **fixed** budget more appropriate than a flexible one?\n\nA  Assessing whether a production manager controlled costs\nB  Setting the original plan against which the company's overall performance is judged\nC  Explaining why material cost exceeded expectations\nD  Comparing actual cost at an output level different from budget",
    plan: [
      {
        step: "State what each budget is for",
        detail:
          "A fixed budget is set at one activity level and is the PLAN. A flexible budget is restated at actual activity and is the CONTROL comparison.",
      },
      {
        step: "Read each option for which job it describes",
        detail:
          "A, C and D are all control tasks — judging performance, explaining a variance, comparing at a different output. All require flexing before the comparison means anything.",
      },
      {
        step: "Identify the planning task",
        detail:
          "Only B describes the original plan and the overall target the company set itself. That is what a fixed budget is, and it is not superseded by flexing.",
      },
      {
        step: "Note that both are used, in sequence",
        detail:
          "The fixed budget sets the plan; the flexed budget controls against it. The full operating statement reconciles from one to the other, which is Area E's work.",
      },
    ],
    answer:
      "**B — setting the original plan against which the company's overall performance is judged.**\n\nA **fixed** budget is prepared at one activity level and represents the plan — the target the company committed to. A **flexible** budget restates it at the actual activity achieved, which is what makes a control comparison valid.\n\nA, C and D are all control tasks and all require flexing first: judging whether a manager controlled cost, explaining a cost overrun, or comparing at a different output level.\n\nThe two are used in sequence rather than as alternatives. The fixed budget sets the plan, the flexed budget controls against it, and the operating statement in Area E reconciles from one to the other — with the difference between fixed and flexed budget being the **volume** effect.",
    earns: ["Separating the planning role from the control role"],
    loses: ["Assuming the flexible budget replaces the fixed one for all purposes"],
  },

  "MA-18::variances": {
    title: "Reading a control report and knowing what to investigate",
    format: "ot",
    marks: 2,
    requirement:
      "A control report shows four variances: material price $200 adverse, material usage $8,000 adverse, labour rate $150 favourable and labour efficiency $300 adverse. Total budgeted cost was $400,000. Which should be investigated first?\n\nA  Material price, because any adverse variance matters\nB  Material usage, because it is both large in absolute terms and material relative to budget\nC  Labour rate, because a favourable variance may indicate poor quality labour\nD  All four equally",
    plan: [
      {
        step: "Apply management by exception",
        detail:
          "Not every variance is investigated, because investigation costs time and small variances are usually random. The report is a filter, not a list of tasks.",
      },
      {
        step: "Test each variance on size and on significance",
        detail:
          "Absolute size and size relative to the budget both matter. $8,000 is by far the largest and is 2% of total budgeted cost; $200 is 0.05% and is noise.",
      },
      {
        step: "Reject the option demanding equal treatment",
        detail:
          "D contradicts the principle outright. Treating a $200 variance with the same effort as an $8,000 one wastes the investigation resource on the wrong thing.",
      },
      {
        step: "Acknowledge the point option C is making",
        detail:
          "A favourable rate variance CAN indicate cheaper, less skilled labour, and that interdependence is genuinely examinable. But it is $150 against $8,000 — a real point about the wrong variance.",
      },
    ],
    answer:
      "**B — material usage, because it is both large in absolute terms and material relative to budget.**\n\n**Management by exception** means investigating what is significant, since investigation consumes management time and small variances are usually random. $8,000 is 2% of total budgeted cost; the $200 price variance is 0.05% and is noise.\n\nOption D contradicts the principle. Option C makes a genuine point — a favourable labour rate variance can mean cheaper, less skilled workers were used, and that interdependence matters — but at $150 against $8,000 it is a real observation about the wrong variance.\n\nThe criteria for investigation are size, whether it is material relative to budget, whether it is controllable, whether it is a trend rather than a one-off, and whether the cost of investigating is justified by the likely saving.",
    earns: [
      "Judging significance on both absolute size and proportion of budget",
      "Recognising that a valid point about a trivial variance is still the wrong priority",
    ],
    loses: ["Investigating every adverse variance, which is what management by exception exists to prevent"],
  },

  /* ── MA-19 · Capital budgeting: relevant flows and payback ───── */

  "MA-19::capital-vs-revenue": {
    title: "Classifying expenditure as capital or revenue",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **capital** expenditure?\n\nA  Repairs to the roof of the factory\nB  Installation costs of a new production machine\nC  Insurance of the delivery fleet\nD  Wages of the maintenance department",
    plan: [
      {
        step: "State the test",
        detail:
          "Capital expenditure acquires or improves a non-current asset and provides benefit over more than one period. Revenue expenditure is consumed within the period, maintaining rather than improving.",
      },
      {
        step: "Watch for costs that attach to an asset",
        detail:
          "Installation, delivery and testing costs of bringing an asset into working condition are capitalised as part of the asset. They are the option candidates most often misclassified.",
      },
      {
        step: "Split repair from improvement",
        detail:
          "Repairing a roof restores it to its previous condition, so it is revenue. Replacing it with a better one that extends the building's life would be capital. The word \"repairs\" decides it.",
      },
      {
        step: "Note the consequence of misclassifying",
        detail:
          "Capital expenditure treated as revenue understates both profit and assets; revenue treated as capital overstates both. That is why the distinction is examined rather than being merely tidy.",
      },
    ],
    answer:
      "**B — installation costs of a new production machine.**\n\nCosts of bringing an asset into working condition — delivery, installation, testing — are capitalised as part of the asset's cost, because they are necessary to obtain the multi-period benefit.\n\n**Repairs** restore an asset to its previous condition and are revenue; an improvement extending its life or capacity would be capital, and the word \"repairs\" is what settles option A. Insurance and maintenance wages are consumed within the period.\n\nThe consequence is why it matters: capital expenditure wrongly treated as revenue understates both profit and non-current assets, while revenue treated as capital overstates both.",
    earns: ["Knowing that costs of bringing an asset into use are capitalised"],
    loses: ["Classifying installation as revenue because it is a service rather than a thing"],
  },

  "MA-19::interest": {
    title: "Compounding a sum forward",
    format: "ot",
    marks: 2,
    requirement:
      "$5,000 is invested for 3 years at 8% compound interest per year. The value at the end of year 3 is:\n\nA  $6,200\nB  $6,299\nC  $6,400\nD  $5,400",
    plan: [
      {
        step: "Write the compounding formula",
        detail:
          "Future value = P(1 + r)ⁿ. Compound interest earns interest on interest, which is what separates it from simple interest and creates the whole difference.",
      },
      {
        step: "Substitute and compute the factor first",
        detail:
          "1.08³ = 1.08 × 1.08 × 1.08 = 1.2597. Computing the factor separately makes the arithmetic checkable and reusable.",
      },
      {
        step: "Apply to the principal",
        detail:
          "$5,000 × 1.2597 = **$6,299** (to the nearest dollar).",
      },
      {
        step: "Compute the simple interest answer to see the distractor",
        detail:
          "Simple interest would be $5,000 × 8% × 3 = $1,200, giving $6,200 — which is option A. The $99 difference is the interest earned on interest, and that gap is exactly what the question tests.",
      },
    ],
    answer:
      "**B — $6,299.**\n\nFuture value = $5,000 × 1.08³ = $5,000 × 1.2597 = **$6,299**.\n\nOption A, $6,200, is the **simple interest** answer: $5,000 × 8% × 3 = $1,200 of interest. The $99 difference is interest earned on interest, and it is the whole distinction the question is built on. Over longer periods that gap grows sharply.\n\nComputing the factor 1.2597 separately before applying it makes the arithmetic checkable — and it is the same idea inverted in discounting, where the discount factor is 1 ÷ (1 + r)ⁿ. Compounding moves money forward in time; discounting moves it back.",
    earns: [
      "Computing the compound factor separately, so it can be checked",
      "Recognising the simple interest figure among the options",
    ],
    loses: ["Applying simple interest, which produces the offered $6,200"],
  },

  "MA-19::cash-flow-vs-profit": {
    title: "Identifying relevant cash flows for an investment decision",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following should be **included** in the cash flows used to appraise a new project?\n\nA  Depreciation of the new machine\nB  Market research already commissioned and paid for\nC  The contribution lost on an existing product the new one will replace\nD  A share of existing head office overhead",
    plan: [
      {
        step: "State the two tests every flow must pass",
        detail:
          "It must be a CASH flow, and it must be FUTURE and INCREMENTAL — arising only because the project goes ahead. A flow failing either test is excluded.",
      },
      {
        step: "Strike depreciation on the first test",
        detail:
          "Depreciation is an accounting allocation, not a movement of cash. The machine's purchase price is the cash flow, recorded when paid.",
      },
      {
        step: "Strike the sunk cost and the apportioned overhead",
        detail:
          "Market research already paid for is sunk — the money is gone whatever is decided. Existing head office overhead would be incurred anyway, so it is not incremental.",
      },
      {
        step: "Recognise the opportunity cost as a real flow",
        detail:
          "Contribution lost on a displaced product is a genuine consequence of going ahead. It is future, it is incremental, and omitting it overstates the project — this is the option candidates most often exclude.",
      },
    ],
    answer:
      "**C — the contribution lost on an existing product the new one will replace.**\n\nEvery flow must pass two tests: it must be **cash**, and it must be **future and incremental**.\n\n**Depreciation** fails the first — it is an accounting allocation, and the cash flow is the machine's purchase price when paid. **Market research already paid for** is a **sunk cost**: the money is gone whichever way the decision falls. **Apportioned head office overhead** would be incurred anyway, so it is not incremental.\n\nLost contribution is an **opportunity cost** — a real consequence of proceeding, future and incremental — and it is the item candidates most often omit, which systematically overstates projects that cannibalise existing sales.",
    earns: [
      "Applying both tests to every item rather than judging by whether it feels like a cost",
      "Recognising opportunity cost as a relevant flow",
    ],
    loses: ["Including depreciation, which is not cash, or a sunk cost already paid"],
  },

  "MA-19::payback": {
    title: "Calculating payback with uneven cash flows",
    format: "ot",
    marks: 2,
    requirement:
      "A project costs $100,000 and generates net cash inflows of $30,000, $40,000, $50,000 and $60,000 in years 1 to 4. Assuming even flows within each year, the payback period is:\n\nA  2.0 years\nB  2.6 years\nC  3.0 years\nD  3.4 years",
    plan: [
      {
        step: "Accumulate the flows year by year",
        detail:
          "End of year 1: $30,000. End of year 2: $70,000. End of year 3: $120,000. The outlay of $100,000 is passed during year 3, so payback lies between 2 and 3 years.",
      },
      {
        step: "Find how much is still outstanding at the start of that year",
        detail:
          "$100,000 − $70,000 = **$30,000** still to recover at the start of year 3.",
      },
      {
        step: "Take the fraction of that year's inflow",
        detail:
          "$30,000 ÷ $50,000 = 0.6 of year 3. Payback = 2 + 0.6 = **2.6 years**. The fraction uses year 3's inflow, not any other year's.",
      },
      {
        step: "Be ready to state the method's weaknesses",
        detail:
          "Payback ignores everything after the payback point and ignores the time value of money. It measures liquidity and risk exposure rather than profitability — which is why it is used alongside NPV, not instead of it.",
      },
    ],
    answer:
      "**B — 2.6 years.**\n\nCumulative flows: year 1 $30,000; year 2 $70,000; year 3 $120,000. The $100,000 outlay is recovered during **year 3**.\n\nOutstanding at the start of year 3 = $100,000 − $70,000 = $30,000.\nFraction of year 3 = $30,000 ÷ $50,000 = **0.6**.\nPayback = **2.6 years**.\n\nThe fraction must use **that year's** inflow — using year 2's or an average is the standard slip.\n\nThe method's weaknesses are examined as often as the calculation: payback ignores every cash flow after the payback point, so a project generating $500,000 in year 5 ranks below one that stops at year 3; and it ignores the time value of money entirely. It measures **liquidity and risk exposure**, not profitability, which is why it complements NPV rather than replacing it.",
    earns: [
      "Using the recovery year's own inflow for the fractional part",
      "Being able to state both weaknesses, since they carry as many marks as the calculation",
    ],
    loses: ["Rounding to a whole year, or taking the fraction from the wrong year's inflow"],
  },

  /* ── MA-20 · Discounted cash flow ────────────────────────────── */

  "MA-20::time-value": {
    title: "Why a future cash flow is worth less than a present one",
    format: "ot",
    marks: 2,
    requirement:
      "The principal reason a cash flow received in three years is worth less than the same amount today is that:\n\nA  Inflation will certainly reduce its purchasing power\nB  Money available today could be invested to earn a return\nC  The project might fail\nD  Accounting standards require future flows to be discounted",
    plan: [
      {
        step: "Name the core idea before evaluating the options",
        detail:
          "Money has a time value because it can be put to work. A sum today can be invested and become a larger sum by the future date, so the two are not equivalent.",
      },
      {
        step: "Distinguish the core reason from the additional ones",
        detail:
          "Inflation and risk both reduce the value of a future flow and both are real. But they are additional reasons — the opportunity to earn a return exists even with zero inflation and zero risk.",
      },
      {
        step: "Test with the zero-inflation case",
        detail:
          "With no inflation at all, $100 today invested at 5% still becomes $105 in a year. So $100 in a year is still worth less than $100 now, which proves inflation is not the fundamental reason.",
      },
      {
        step: "Strike the false regulatory claim",
        detail:
          "No accounting standard governs investment appraisal, which is a management accounting technique for internal decisions rather than a reporting requirement.",
      },
    ],
    answer:
      "**B — money available today could be invested to earn a return.**\n\nThe fundamental reason is the **opportunity to earn a return**. The zero-inflation test proves it: with no inflation at all, $100 invested today at 5% becomes $105 in a year, so $100 receivable in a year is still worth less than $100 now.\n\nInflation and risk are genuine additional reasons and both push the same way, but neither is the core — the time value would exist without either.\n\nD is false: investment appraisal is a management accounting technique for internal decisions, and no accounting standard governs it.\n\nDiscounting is compounding reversed: the discount factor is 1 ÷ (1 + r)ⁿ.",
    earns: ["Using the zero-inflation test to isolate the fundamental reason"],
    loses: ["Answering inflation, which is a real but additional reason"],
  },

  "MA-20::annuities-perpetuities": {
    title: "Valuing an annuity and a perpetuity",
    format: "ot",
    marks: 2,
    requirement:
      "A project generates $20,000 per year in perpetuity, starting in one year's time. At a cost of capital of 10%, the present value is:\n\nA  $18,182\nB  $121,000\nC  $200,000\nD  $2,000,000",
    plan: [
      {
        step: "Identify the pattern before choosing a formula",
        detail:
          "Equal amounts, every year, forever, starting in one year. Equal amounts for a FIXED number of years would be an annuity; forever makes it a perpetuity.",
      },
      {
        step: "Apply the perpetuity formula",
        detail:
          "Present value = annual cash flow ÷ r = $20,000 ÷ 0.10 = **$200,000**. It is the simplest formula in the paper and the most often inverted.",
      },
      {
        step: "Sanity-check the magnitude",
        detail:
          "At 10%, $200,000 invested yields $20,000 a year forever without touching the capital — which is exactly the cash flow being valued. The answer must be around ten times the annual flow.",
      },
      {
        step: "Read the distractors",
        detail:
          "$18,182 is one year's flow discounted once. $2,000,000 multiplies by 100 instead of dividing by 0.10. Each is a specific misuse of the same two numbers.",
      },
    ],
    answer:
      "**C — $200,000.**\n\nPerpetuity: PV = cash flow ÷ r = $20,000 ÷ 0.10 = **$200,000**.\n\nThe sanity check is decisive: at 10%, $200,000 generates $20,000 a year forever without the capital being touched — which is precisely the cash flow being valued. A perpetuity's value is always the annual flow divided by the rate, so at 10% it is ten times the flow.\n\nOption A discounts a single year's flow. Option D multiplies by 100 rather than dividing by 0.10.\n\nThe related forms are worth holding together. An **annuity** — equal flows for a fixed number of years — uses the annuity factor from the tables. A perpetuity **starting later than year 1** is valued with the formula and then discounted back the extra years.",
    earns: [
      "Identifying the pattern — annuity, perpetuity or delayed perpetuity — before reaching for a formula",
      "Sanity-checking that the capital would genuinely yield the flow at that rate",
    ],
    loses: ["Multiplying by the rate rather than dividing, which is the offered $2,000,000"],
  },

  "MA-20::npv": {
    title: "Computing NPV and stating the decision rule",
    format: "ot",
    marks: 2,
    requirement:
      "A project costs $50,000 now and returns $30,000 at the end of each of years 1 and 2. At a cost of capital of 10%, the discount factors are 0.909 and 0.826. The NPV is:\n\nA  $2,050 negative\nB  $2,050 positive\nC  $10,000 positive\nD  $52,050 positive",
    plan: [
      {
        step: "Set the outlay at time 0 with no discounting",
        detail:
          "The $50,000 is paid now, so its discount factor is 1.000. Discounting the initial outlay is a common and expensive slip.",
      },
      {
        step: "Discount each inflow by its own year's factor",
        detail:
          "Year 1: $30,000 × 0.909 = $27,270. Year 2: $30,000 × 0.826 = $24,780. Total present value of inflows = $52,050.",
      },
      {
        step: "Subtract the outlay",
        detail:
          "NPV = $52,050 − $50,000 = **$2,050 positive**. Option D is the inflow total with the outlay never deducted.",
      },
      {
        step: "State the decision rule, since it carries the second mark",
        detail:
          "A positive NPV means the project earns more than the cost of capital and increases shareholder wealth, so accept it. Option C is the undiscounted surplus, which ignores the time value entirely.",
      },
    ],
    answer:
      "**B — $2,050 positive.**\n\nYear 0: ($50,000) × 1.000 = ($50,000)\nYear 1: $30,000 × 0.909 = $27,270\nYear 2: $30,000 × 0.826 = $24,780\n**NPV = $2,050 positive**\n\nOption D, $52,050, is the present value of inflows with the outlay never deducted. Option C, $10,000, is the undiscounted surplus of $60,000 over $50,000 — the answer that ignores the time value of money completely.\n\nThe decision rule is the second half of the question: a **positive NPV** means the project earns more than the cost of capital and increases shareholder wealth, so it should be accepted. NPV is theoretically superior to payback and IRR because it uses every cash flow, accounts for timing, and gives an absolute measure of the wealth created.",
    earns: [
      "Leaving the initial outlay undiscounted at time 0",
      "Stating the decision rule, not just the number",
    ],
    loses: ["Omitting the outlay, or discounting it as though it fell in year 1"],
  },

  "MA-20::irr": {
    title: "Estimating IRR by interpolation",
    format: "ot",
    marks: 2,
    requirement:
      "A project has an NPV of $8,000 at 10% and an NPV of $(2,000) at 15%. The approximate internal rate of return is:\n\nA  11.0%\nB  12.5%\nC  14.0%\nD  15.0%",
    plan: [
      {
        step: "Define what IRR is before computing",
        detail:
          "The discount rate at which NPV is zero. The NPV turns from positive to negative between 10% and 15%, so the IRR lies inside that range — which already eliminates option D.",
      },
      {
        step: "Write the interpolation formula",
        detail:
          "IRR ≈ a + [NPVa ÷ (NPVa − NPVb)] × (b − a), where a is the lower rate and b the higher. The denominator is the RANGE between the two NPVs, so the signs must be handled with care.",
      },
      {
        step: "Substitute, treating the negative NPV as negative",
        detail:
          "IRR ≈ 10 + [8,000 ÷ (8,000 − (−2,000))] × 5 = 10 + (8,000 ÷ 10,000) × 5 = 10 + 4 = **14%**.",
      },
      {
        step: "Sanity-check the position within the range",
        detail:
          "The NPV at 10% is four times the size of the NPV at 15%, so zero must lie much closer to 15% than to 10%. 14% sits where expected; 11% would imply the reverse.",
      },
    ],
    answer:
      "**C — 14.0%.**\n\nIRR ≈ 10% + [8,000 ÷ (8,000 + 2,000)] × 5% = 10% + 0.8 × 5% = **14%**.\n\nThe denominator is the **range** between the two NPVs, so $8,000 − ($2,000) = $10,000. Treating the negative as positive there is the standard error.\n\nThe position check confirms it: the NPV at 10% is four times the magnitude of the NPV at 15%, so zero lies much nearer 15%. 14% sits exactly where that reasoning predicts, and 11% would imply the opposite.\n\nThe decision rule is to accept where IRR exceeds the cost of capital. IRR's weaknesses are that it is a percentage and so ignores project scale, that it can give multiple answers where cash flows change sign more than once, and that it can rank mutually exclusive projects differently from NPV — where they conflict, NPV is correct.",
    earns: [
      "Using the range between the two NPVs as the denominator",
      "Checking the answer's position within the range against the relative NPV sizes",
    ],
    loses: ["Adding the NPVs' absolute values incorrectly, or picking a rate outside the bracketing range"],
  },
}
