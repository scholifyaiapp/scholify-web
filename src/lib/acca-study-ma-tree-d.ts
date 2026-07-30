import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area D — Budgeting.
 * Chapters 16–20 of the MA reading tree, mapped to syllabus groups D1–D5.
 *
 * Budgeting is planning expressed in numbers (Chapter 1). Capital budgeting is
 * split from the rest because discounting is a distinct skill with its own
 * formulae — and because putting relevant cash flows, payback, NPV and IRR into
 * one chapter with the operating budgets would produce a 40-minute read.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 16 · D1 ───────────────────────────────────────────── */

export const MA_TREE_16: StudyChapter = {
  id: "MA-16",
  number: 16,
  paper: "MA",
  area: "D",
  title: "The nature and purpose of budgeting",
  minutes: 15,
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)", "D1(d)"],
  intro:
    "A budget is a plan with numbers attached and a date by which it must be met. This chapter is why organisations bother, how the process is administered, and the behavioural problems it reliably creates.",
  outcomes: [
    "Explain why organisations prepare budgets",
    "Describe the planning and control cycle",
    "Explain the administrative procedures of the budgeting process, including the budget committee and manual",
    "Describe the stages in preparing a budget, and the role of the principal budget factor",
    "Distinguish top-down from bottom-up budgeting and explain participation",
    "Explain budgetary slack, dysfunctional behaviour and the conflict between a budget's purposes",
  ],
  sections: [
    {
      id: "why-budget",
      heading: "Why organisations budget",
      blocks: [
        {
          kind: "definition",
          term: "Budget",
          md: "A **quantified plan** for a defined future period, usually expressed in financial terms, setting out the resources to be used and the results to be achieved. Two features are essential: it is **quantified**, and it relates to a **future period**.",
        },
        {
          kind: "list",
          style: "number",
          title: "The purposes, which are usually remembered as PRIME CAP",
          items: [
            "**P**lanning — forcing management to think ahead rather than react.",
            "**R**esponsibility — assigning accountability by allocating resources to identified managers.",
            "**I**ntegration and coordination — making the parts of the organisation consistent with each other, so sales does not promise what production cannot make.",
            "**M**otivation — a target can motivate, if it is achievable and accepted.",
            "**E**valuation — providing the yardstick against which performance is later judged.",
            "**C**ommunication — telling managers what is expected of them and what others will do.",
            "**A**uthorisation — a budget approved is authority to spend within it.",
            "**P**lanning of cash and control — anticipating shortfalls early enough to arrange finance.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The purposes conflict with each other",
          md: "A budget used for **motivation** should be demanding but achievable. A budget used for **planning cash** should be the most realistic expectation available. A budget used for **evaluation** invites the manager being evaluated to build in slack. These are genuinely different requirements, and no single set of numbers satisfies all three perfectly — which is why some organisations prepare an aspirational target and a separate realistic forecast.",
        },
      ],
    },
    {
      id: "planning-control-cycle",
      heading: "The planning and control cycle",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "The cycle",
            caption: "The final step feeds the first: what control reveals changes the next plan.",
            data: {
              steps: [
                { label: "Identify objectives" },
                { label: "Identify alternative courses of action" },
                { label: "Evaluate and choose" },
                { label: "Prepare the budget" },
                { label: "Measure actual results" },
                { label: "Compare against budget" },
                { label: "Respond to divergence" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Feedback and feedforward",
          md: "**Feedback** control compares what happened with what was planned and corrects afterwards — variance reporting is feedback. **Feedforward** control compares a **forecast** of what will happen with the plan and acts **before** the event — a cash flow forecast showing a shortfall in three months is feedforward. Feedforward is the more valuable of the two, because the outcome can still be changed.",
        },
      ],
    },
    {
      id: "administration",
      heading: "Administering the process",
      blocks: [
        {
          kind: "table",
          caption: "Who and what runs the budget process",
          head: ["Element", "Role"],
          rows: [
            ["**Budget committee**", "Coordinates the process, issues guidelines, resolves conflicts between departments, and approves the final budget. Usually chaired by a senior executive and including functional heads"],
            ["**Budget officer / accountant**", "Administers the process day to day, supplies data and formats, chases submissions and prepares the consolidated budget. **Advises; does not set the departmental budgets**"],
            ["**Budget manual**", "Documents the procedures, responsibilities, timetable, formats and definitions, so every department submits on a consistent basis"],
            ["**Budget period**", "The period covered, typically a year subdivided into months or quarters for control"],
            ["**Budget holder**", "The manager responsible for the budget of a cost or profit centre, and accountable for performance against it"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The management accountant does not set the budget",
          md: "The **budget holder** sets and owns their budget; the accountant **coordinates, advises and consolidates**. This matters for a reason beyond tidiness: a budget imposed by the accounts department carries no commitment from the person expected to meet it, which destroys the motivation and responsibility purposes at a stroke.",
        },
      ],
    },
    {
      id: "the-stages",
      heading: "The stages of preparation, and the principal budget factor",
      blocks: [
        {
          kind: "definition",
          term: "Principal budget factor (limiting factor)",
          md: "The factor that **constrains the organisation's activity** in the budget period — most often sales demand, but it may be a scarce material, machine capacity, skilled labour or cash. The budget for the **principal budget factor is prepared FIRST**, because every other budget depends on it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Identify the constraint before anything else",
          md: "If **sales demand** is the constraint, budget sales first and produce to match. If **machine capacity** is the constraint, budget production first — because there is no point budgeting sales of 100,000 units when the plant can make 70,000. Preparing the budgets in the wrong order produces an internally inconsistent plan, and identifying the principal budget factor is frequently the first mark in a budgeting question.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The stages, assuming sales demand is the constraint",
            caption: "Each budget feeds the next, which is why the order matters.",
            data: {
              steps: [
                { label: "Communicate objectives and guidelines", sub: "the budget committee issues assumptions on prices, inflation and volumes" },
                { label: "Identify the principal budget factor", sub: "what actually limits activity" },
                { label: "Prepare the sales budget", sub: "the constraint here, so it comes first" },
                { label: "Prepare functional budgets", sub: "production, materials, labour, overheads, then non-production" },
                { label: "Negotiate and review", sub: "iterate until the parts are consistent with each other" },
                { label: "Prepare the master budget", sub: "the three consolidated summaries: forecast profit, forecast position, and cash month by month" },
                { label: "Obtain approval and monitor", sub: "the budget committee approves; actual results are then compared against it" },
              ],
            },
          },
        },
      ],
      check: {
        q: "A company can sell 90,000 units next year, but a shortage of a specialist component limits production to 70,000 units. Which budget should be prepared first?",
        options: [
          "The sales budget, because sales drive everything",
          "The production budget, because the component shortage is the principal budget factor",
          "The cash budget, because cash is always the constraint",
          "The master budget, so the others can be worked back from it",
        ],
        correct: 1,
        explain:
          "The PRINCIPAL BUDGET FACTOR is whatever constrains activity, and here it is the component shortage limiting production to 70,000 units — not sales demand of 90,000. So the production budget is prepared first and sales are budgeted at 70,000. Budgeting sales at 90,000 would produce a plan the business cannot execute.",
      },
    },
    {
      id: "behavioural",
      heading: "Participation and behaviour",
      blocks: [
        {
          kind: "table",
          caption: "Top-down and bottom-up budgeting",
          head: ["", "Top-down (imposed)", "Bottom-up (participative)"],
          rows: [
            ["Prepared by", "Senior management, then issued to budget holders", "Budget holders, then reviewed and consolidated upward"],
            ["Speed", "Faster", "Slower — needs negotiation and iteration"],
            ["Goal congruence", "Strong — reflects corporate strategy directly", "Weaker — departmental interests can dominate"],
            ["Commitment from the budget holder", "Low; the target is someone else's", "**High** — people commit to what they helped set"],
            ["Use of local knowledge", "Poor; senior management may not know operational detail", "Good; the people closest to the work contribute"],
            ["Risk of slack", "Low", "**High** — budget holders have an incentive to build in cushion"],
            ["Suits", "Crises, tight deadlines, inexperienced managers, or where strategy must dominate", "Stable conditions with capable, trusted managers"],
          ],
        },
        {
          kind: "definition",
          term: "Budgetary slack",
          md: "The deliberate **overstatement of budgeted costs** or **understatement of budgeted revenues** by a budget holder, so that the target is easier to meet. It is a rational response to being **evaluated** on the budget you were asked to **set** — which is the conflict of purposes from earlier in this chapter, appearing as a behaviour.",
        },
        {
          kind: "list",
          title: "The behavioural problems budgets create",
          items: [
            "**Budgetary slack** — easier targets bought at the cost of an unrealistic plan.",
            "**Dysfunctional behaviour** — acting to meet the budget at the expense of the organisation: deferring necessary maintenance to protect this year's figure, or spending a remaining budget in month 12 purely to avoid a cut next year.",
            "**Short-termism** — cutting training, development or advertising because the benefit falls outside the budget period.",
            "**Manipulation** — shifting revenue or cost between periods to hit a target, which is exactly the pressure the fraud triangle describes.",
            "**Demotivation from an unattainable target** — a budget nobody believes is achievable stops influencing behaviour at all.",
            "**Complacency from an undemanding target** — met early, and then no further effort is made.",
            "**Interdepartmental conflict**, where one department's budget can only be met at another's expense.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The target-setting insight worth carrying",
          md: "The most **motivating** budget is one that is **demanding but attainable** — roughly, a target the manager has a good chance of meeting with real effort. A target that is too easy produces complacency; one that is impossible is ignored. Note the consequence: the most motivating budget is **not** the most likely outcome, so it is the wrong figure to use for a cash forecast.",
        },
        {
          kind: "activity",
          title: "Activity 1 — diagnose the budget process",
          prompt:
            "A company sets budgets bottom-up. Reviewing the last three years, the finance director notices that every department has come in slightly under its cost budget every year, that departmental spending rises sharply in the final month, and that the annual cash forecast has consistently overstated the cash requirement.\n\nExplain what is happening and recommend three changes.",
          answer:
            "**What is happening: budgetary slack, and the behaviour it produces.** Coming in slightly under budget **every** department **every** year is not evidence of uniformly excellent cost control — it is the signature of budgets set with cushion built in. Bottom-up budgeting gives budget holders the opportunity, and being evaluated on a budget they set themselves gives them the incentive.\n\n**The sharp final-month spending is the second symptom.** Managers with unspent budget spend it before year end, because an underspend invites a cut next year. This is classic **dysfunctional behaviour**: the spending is rational for the manager and wasteful for the organisation.\n\n**And the overstated cash requirement follows directly.** If every cost budget contains slack, the consolidated cash forecast overstates outflows — so the company has been arranging or holding more finance than it needed, at a real cost.\n\n**Three changes.** (1) **Introduce independent review and challenge of submissions**, with the accountant comparing each proposal against prior-year actuals, activity levels and benchmarks — slack survives because nobody tests it. (2) **Separate the aspirational target from the realistic forecast.** Use a demanding-but-attainable budget for motivation and evaluation, and a separate best-estimate forecast for the cash plan, so the two conflicting purposes stop corrupting each other. (3) **Remove the incentive to spend in month 12** — stop treating an underspend as evidence that next year's budget should be cut, and allow a proportion to be carried forward or reinvested, so an underspend becomes something to report rather than to conceal.\n\n**Also creditable:** keep bottom-up preparation rather than reverting to imposed budgets, since the commitment it produces is worth having — the fault is the absence of challenge, not participation itself.",
        },
      ],
      check: {
        q: "A manager deliberately overstates budgeted costs so that the target will be easier to achieve. This is:",
        options: ["Feedforward control", "Budgetary slack", "A flexed budget", "Goal congruence"],
        correct: 1,
        explain:
          "Deliberately overstating budgeted costs or understating budgeted revenues to make a target easier is BUDGETARY SLACK. It is a rational response to being evaluated on a budget you were asked to set, which is why participative budgeting needs independent challenge of submissions. Goal congruence is the opposite — alignment of the manager's aims with the organisation's.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Listing budget purposes without noting that they conflict.",
      fix: "Motivation wants a demanding target, cash planning wants a realistic one, and evaluation invites slack. No single set of numbers serves all three.",
    },
    {
      trap: "Saying the management accountant sets departmental budgets.",
      fix: "The budget holder sets and owns their budget; the accountant coordinates, advises and consolidates. An imposed budget carries no commitment.",
    },
    {
      trap: "Assuming sales is always the principal budget factor.",
      fix: "It usually is, but a scarce material, machine capacity, skilled labour or cash may constrain instead — and the constrained budget is prepared FIRST.",
    },
    {
      trap: "Confusing feedback with feedforward control.",
      fix: "Feedback compares actual with plan after the event. Feedforward compares a FORECAST with plan and acts before it, which is why it is more valuable.",
    },
    {
      trap: "Treating participative budgeting as unambiguously better.",
      fix: "It builds commitment and uses local knowledge, but it invites slack and can let departmental interests override strategy.",
    },
    {
      trap: "Assuming the most motivating budget is the most likely outcome.",
      fix: "The most motivating target is demanding but attainable, which is deliberately harder than the expected result — so it is the wrong figure for a cash forecast.",
    },
  ],
  keyTerms: [
    { term: "Budget", def: "A quantified plan for a defined future period, setting out resources to be used and results to be achieved." },
    { term: "Budget committee", def: "The body coordinating the budget process, issuing guidelines, resolving conflicts and approving the budget." },
    { term: "Budget manual", def: "The document setting out budgeting procedures, responsibilities, timetable, formats and definitions." },
    { term: "Principal budget factor", def: "The factor constraining activity in the budget period, whose budget is prepared first." },
    { term: "Feedback control", def: "Comparing actual results with plan and correcting after the event." },
    { term: "Feedforward control", def: "Comparing a forecast of results with plan and acting before the event." },
    { term: "Budgetary slack", def: "Deliberate overstatement of budgeted costs or understatement of revenues to make a target easier to achieve." },
    { term: "Goal congruence", def: "Alignment between the objectives of an individual manager and those of the organisation." },
    { term: "Dysfunctional behaviour", def: "Action taken to meet a budget at the expense of the organisation's wider interests." },
  ],
  summary: [
    "A budget is a quantified plan for a future period, serving planning, responsibility, coordination, motivation, evaluation, communication and authorisation.",
    "Those purposes conflict: motivation wants a demanding target, cash planning a realistic one, evaluation invites slack.",
    "The planning and control cycle runs objectives, alternatives, choice, budget, measurement, comparison and response.",
    "Feedback corrects after the event; feedforward acts on a forecast before it, and is the more valuable.",
    "The budget committee coordinates and approves; the accountant advises and consolidates; the budget holder sets and owns.",
    "The principal budget factor constrains activity and its budget is prepared first — usually sales, but not always.",
    "Top-down budgeting is fast and strategically aligned; bottom-up builds commitment and uses local knowledge but invites slack.",
    "The most motivating budget is demanding but attainable, which is deliberately not the most likely outcome.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do the purposes of budgeting conflict?", a: "A motivating budget must be demanding but attainable; a cash forecast must be the most realistic expectation; and evaluating a manager on a budget they set invites slack. No single set of numbers serves all three well." },
    { q: "What is the principal budget factor, and why does it matter?", a: "The factor constraining activity in the period — usually sales demand, but possibly a scarce material, capacity, labour or cash. Its budget is prepared FIRST because every other budget depends on it." },
    { q: "What is the difference between feedback and feedforward control?", a: "Feedback compares actual results with plan and corrects afterwards, as variance reporting does. Feedforward compares a forecast with the plan and acts before the event, so the outcome can still be changed." },
    { q: "Who sets a departmental budget?", a: "The budget holder — the manager responsible for that cost or profit centre. The management accountant coordinates, advises and consolidates but does not set it, because an imposed budget carries no commitment." },
    { q: "What is budgetary slack and why does it arise?", a: "Deliberate overstatement of costs or understatement of revenues to make the target easier. It arises because the manager evaluated on the budget is often the one asked to set it." },
  ],
  furtherStudy: [
    "The behavioural consequences of budgeting are developed at length in **PM** and **APM**.",
    "Chapter 17 prepares the functional and master budgets this chapter has described.",
  ],
}

/* ── Chapter 17 · D2 ───────────────────────────────────────────── */

export const MA_TREE_17: StudyChapter = {
  id: "MA-17",
  number: 17,
  paper: "MA",
  area: "D",
  title: "Budget preparation",
  minutes: 20,
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)", "D2(d)", "D2(e)", "D2(f)"],
  intro:
    "This is the calculation chapter of Area D. Sales feeds production, production feeds materials and labour, and everything feeds cash — and the two adjustments that trip candidates up are inventory movements and the timing of cash.",
  outcomes: [
    "Prepare a sales budget",
    "Prepare a production budget allowing for finished goods inventory movements",
    "Prepare a materials usage and purchases budget allowing for raw material inventory movements",
    "Prepare a labour budget, including where overtime or idle time applies",
    "Prepare a cash budget and explain why it differs from budgeted profit",
    "Prepare a master budget and explain 'what if' and scenario analysis",
  ],
  sections: [
    {
      id: "sales-and-production",
      heading: "Sales and production budgets",
      blocks: [
        {
          kind: "formula",
          name: "The production budget",
          expr: "Production (units)  =  Sales units  +  Closing finished goods inventory  −  Opening finished goods inventory",
          note: "Build the stock you want to end with; you already have the opening stock. If closing inventory is to be HIGHER than opening, production must EXCEED sales.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The direction of the inventory adjustment",
          md: "Production = sales **plus** closing **minus** opening. Test it with a sanity check: if you want more stock at the end than you started with, you must make more than you sell. Reversing the signs is the commonest error in the whole of Area D, and it then corrupts the materials and labour budgets built on top of it.",
        },
        {
          kind: "example",
          title: "Worked example — sales, production and materials purchases",
          scenario:
            "Budgeted sales are 24,000 units at $40. Opening finished goods inventory is 1,800 units and closing is to be 2,500 units. Each unit needs 3 kg of material costing $6 per kg. Opening raw material inventory is 4,000 kg and closing is to be 5,200 kg. Prepare the sales, production, materials usage and materials purchases budgets.",
          steps: [
            { label: "Sales budget", detail: "24,000 units × $40 = $960,000." },
            { label: "Production budget in units", detail: "Sales 24,000 + closing 2,500 − opening 1,800 = 24,700 units. More than sales, because finished goods stock is being built up by 700 units." },
            { label: "Materials usage budget", detail: "24,700 units × 3 kg = 74,100 kg. Note this is based on PRODUCTION, not on sales — material is consumed when goods are made." },
            { label: "Materials purchases budget in kg", detail: "Usage 74,100 + closing 5,200 − opening 4,000 = 75,300 kg. The same add-closing, deduct-opening logic, applied one level down." },
            { label: "Materials purchases budget in $", detail: "75,300 kg × $6 = $451,800." },
          ],
          result:
            "Sales $960,000; production 24,700 units; usage 74,100 kg; purchases 75,300 kg or $451,800. The structure is the examinable content: **two separate inventory adjustments**, one for finished goods (to get from sales to production) and one for raw materials (to get from usage to purchases). Applying only one of the two is the standard way marks are lost, and materials usage must be driven by **production**, never by sales.",
        },
      ],
      check: {
        q: "Budgeted sales are 50,000 units. Opening finished goods inventory is 6,000 units and closing inventory is to be 4,000 units. What is budgeted production?",
        options: ["48,000 units", "50,000 units", "52,000 units", "60,000 units"],
        correct: 0,
        explain:
          "Production = sales + closing − opening = 50,000 + 4,000 − 6,000 = 48,000 units. Inventory is being REDUCED by 2,000 units, so 2,000 of the sales come out of existing stock and only 48,000 need to be made. The tempting wrong answer of 52,000 reverses the signs, which is the commonest error in Area D.",
      },
    },
    {
      id: "labour-budget",
      heading: "The labour budget",
      blocks: [
        {
          kind: "example",
          title: "Worked example — a labour budget with overtime",
          scenario:
            "Budgeted production is 24,700 units, each requiring 0.4 direct labour hours. The workforce of 22 people is contracted for 1,750 hours each per year at $16 per hour, with any hours beyond that paid at one and a half times the basic rate. Calculate the labour budget.",
          steps: [
            { label: "Hours required", detail: "24,700 units × 0.4 hours = 9,880 hours." },
            { label: "Hours available at basic rate", detail: "22 people × 1,750 hours = 38,500 hours. That comfortably exceeds 9,880, so no overtime is needed — check this before assuming any." },
            { label: "Reconsider with a realistic workforce", detail: "Suppose instead the workforce is 5 people: 5 × 1,750 = 8,750 basic hours, which is 1,130 hours short of the 9,880 required." },
            { label: "Basic and overtime cost", detail: "Basic: 8,750 × $16 = $140,000. Overtime: 1,130 × $24 (time-and-a-half) = $27,120. Total labour budget = $167,120." },
            { label: "Split for cost classification", detail: "Of the overtime payment, basic-rate pay of 1,130 × $16 = $18,080 is direct labour, and the premium of 1,130 × $8 = $9,040 is indirect (Chapter 11)." },
          ],
          result:
            "With 5 employees the labour budget is $167,120, of which $9,040 is the indirect overtime premium. The step to take deliberately is **comparing hours required against hours available at basic rate before assuming overtime** — a question that gives you a workforce size and contracted hours is asking you to make that comparison.",
        },
      ],
    },
    {
      id: "cash-budget",
      heading: "The cash budget",
      blocks: [
        {
          kind: "definition",
          term: "Cash budget",
          md: "A period-by-period forecast of cash **receipts and payments**, showing the closing cash balance each period. It records cash when it **moves**, not when the underlying sale or purchase is recognised.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why the cash budget differs from budgeted profit",
          md: "**Timing:** credit sales are received later, purchases paid later. **Non-cash items:** depreciation is an expense but never a payment, so it must be **excluded** from a cash budget. **Capital items:** buying equipment is a large payment but not an expense. **Financing:** loans received and repaid, dividends and tax paid are cash movements outside the profit calculation. A profitable business can run out of cash, and the cash budget is what reveals it in advance.",
        },
        {
          kind: "example",
          title: "Worked example — a three-month cash budget",
          scenario:
            "Sales are $80,000 in January, $100,000 in February and $120,000 in March. 30% of sales are for cash; the remaining 70% are collected the month after sale. December sales were $70,000. Purchases equal 50% of the following month's sales and are paid one month after purchase. Wages of $18,000 are paid in the month incurred. Depreciation is $4,000 a month. Opening cash at 1 January is $12,000. Prepare the cash budget for January to March.",
          steps: [
            { label: "January receipts", detail: "Cash sales 30% × $80,000 = $24,000, plus 70% of December's $70,000 = $49,000. Total $73,000." },
            { label: "February and March receipts", detail: "February: (30% × 100,000 = $30,000) + (70% × 80,000 = $56,000) = $86,000. March: (30% × 120,000 = $36,000) + (70% × 100,000 = $70,000) = $106,000." },
            { label: "Purchases and when they are paid", detail: "Purchases are 50% of the FOLLOWING month's sales, so December purchases = 50% × Jan sales $80,000 = $40,000, paid in January. January purchases = 50% × Feb $100,000 = $50,000, paid in February. February purchases = 50% × Mar $120,000 = $60,000, paid in March." },
            { label: "Build the budget", detail: "January: receipts $73,000 − purchases $40,000 − wages $18,000 = net inflow $15,000. February: $86,000 − $50,000 − $18,000 = $18,000. March: $106,000 − $60,000 − $18,000 = $28,000." },
            { label: "Closing balances", detail: "January: $12,000 + $15,000 = $27,000. February: $27,000 + $18,000 = $45,000. March: $45,000 + $28,000 = $73,000." },
            { label: "Note what was excluded", detail: "Depreciation of $4,000 a month is NOT in the cash budget — it is an expense but never a payment." },
          ],
          result:
            "Closing cash: January $27,000, February $45,000, March $73,000. Three mechanics carry the marks: **split each month's sales between cash and credit and lag the credit portion**; **read carefully which month's sales drive purchases and when they are paid** — here purchases lead sales by a month and are paid a month later, so December's purchases hit January; and **exclude depreciation entirely**.",
        },
      ],
      check: {
        q: "Which of the following should be EXCLUDED from a cash budget?",
        options: [
          "Payment for new machinery",
          "Depreciation of machinery",
          "A loan repayment",
          "Dividends paid to shareholders",
        ],
        correct: 1,
        explain:
          "DEPRECIATION is an accounting expense that never involves a cash payment, so it is excluded from a cash budget entirely. The other three are all genuine cash movements — buying machinery, repaying a loan and paying a dividend all reduce cash, even though the first and third are not expenses in the profit calculation at all.",
      },
    },
    {
      id: "master-and-whatif",
      heading: "The master budget and 'what if' analysis",
      blocks: [
        {
          kind: "definition",
          term: "Master budget",
          md: "What every functional budget adds up to, presented as three summary statements: a **forecast profit or loss** for the period, a **forecast position** at the end of it, and the **cash budget** showing the balance month by month. This is the package that goes to the board for approval.",
        },
        {
          kind: "definition",
          term: "'What if' and scenario analysis",
          md: "Recalculating the budget under **changed assumptions** to see how sensitive the outcome is. **'What if' (sensitivity) analysis** changes **one** variable at a time — what if sales volume is 10% lower? **Scenario analysis** changes a **coherent set** of variables together — a recession scenario with lower volume, lower prices and slower collections at once.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What sensitivity analysis is actually for",
          md: "It identifies **which assumptions matter**. If a 10% fall in volume wipes out the profit but a 10% rise in material prices barely dents it, then management's attention, contingency planning and information gathering should go to volume. This is why a budget built in a spreadsheet is worth far more than one built on paper — and it is Chapter 9's point applied.",
        },
        {
          kind: "activity",
          title: "Activity 2 — a profitable budget that runs out of cash",
          prompt:
            "A company's budgeted profit for the coming year is $240,000. Its cash budget shows the bank balance falling from $50,000 to an overdraft of $180,000 by month eight, before recovering. The finance director cannot understand how a profitable year produces a cash crisis.\n\nGive four reasons this can happen, and state what the company should do.",
          answer:
            "**Four reasons.**\n\n(1) **Growth in working capital.** If sales are rising, receivables and inventory rise with them. Cash is paid out for materials and wages months before customers pay — so a growing, profitable business absorbs cash rather than generating it. This is the commonest cause and it is worst when growth is fastest.\n\n(2) **Timing of receipts and payments.** Profit recognises a sale when it is made; cash arrives when the customer pays. If customers take 60 days and suppliers are paid in 30, the gap is funded from the bank every month regardless of margin.\n\n(3) **Capital expenditure.** Buying equipment is a large cash payment but reaches profit only gradually as depreciation. A year with significant capital spend can be highly profitable and deeply cash-negative.\n\n(4) **Payments outside the profit calculation** — loan repayments, tax and dividends. All consume cash; none reduces profit. Conversely, depreciation of, say, $60,000 reduces profit by $60,000 and consumes no cash at all.\n\n**What the company should do.** First, **arrange the finance now**, while it is planning from strength rather than asking a bank for help in month eight — that is the whole value of feedforward control. Then attack the causes: **tighten credit control** to shorten collection, **negotiate supplier terms** to lengthen payment, **reduce inventory** where service levels allow, **phase the capital expenditure** into the stronger months, and consider whether the **dividend** should be timed differently.\n\n**The point to state explicitly:** profit and cash answer different questions, and a business fails when it runs out of cash, not when it runs out of profit. That is precisely why the cash budget is prepared separately and why it is part of the master budget.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Reversing the inventory adjustment in the production budget.",
      fix: "Production = sales + CLOSING − OPENING. Sanity-check it: to end with more stock than you started with, you must make more than you sell.",
    },
    {
      trap: "Basing the materials usage budget on sales rather than production.",
      fix: "Material is consumed when goods are MADE, so usage follows the production budget.",
    },
    {
      trap: "Applying only one inventory adjustment.",
      fix: "Two are needed: finished goods (sales to production) and raw materials (usage to purchases).",
    },
    {
      trap: "Including depreciation in a cash budget.",
      fix: "It is an expense but never a payment. Exclude it entirely.",
    },
    {
      trap: "Omitting capital expenditure, loan repayments, tax or dividends from a cash budget.",
      fix: "All are real cash movements even though they are not expenses in the profit calculation.",
    },
    {
      trap: "Assuming overtime is needed without checking hours available.",
      fix: "Compare hours required with workforce × contracted hours first. Only the shortfall is overtime.",
    },
    {
      trap: "Misreading which month's sales drive purchases.",
      fix: "Read the question precisely — purchases often relate to the FOLLOWING month's sales and are then paid a month later, so two lags operate at once.",
    },
  ],
  keyTerms: [
    { term: "Production budget", def: "Sales units plus closing finished goods inventory less opening finished goods inventory." },
    { term: "Materials usage budget", def: "Production units multiplied by the material required per unit." },
    { term: "Materials purchases budget", def: "Materials usage plus closing raw material inventory less opening raw material inventory." },
    { term: "Cash budget", def: "A period-by-period forecast of cash receipts and payments, showing each period's closing balance." },
    { term: "Master budget", def: "The three consolidated summary statements a budget process produces: forecast profit or loss, forecast position, and the cash budget." },
    { term: "Sensitivity ('what if') analysis", def: "Recalculating a budget with one variable changed, to identify which assumptions matter most." },
    { term: "Scenario analysis", def: "Recalculating a budget with a coherent set of variables changed together." },
  ],
  summary: [
    "Production = sales + closing inventory − opening inventory, and reversing the signs corrupts everything built on it.",
    "Materials usage is driven by production, not sales; purchases then need their own raw material inventory adjustment.",
    "A labour budget requires comparing hours needed with hours available at basic rate before assuming overtime.",
    "A cash budget records cash when it moves, so it excludes depreciation and includes capital spend, loans, tax and dividends.",
    "A profitable business can run out of cash through working capital growth, timing, capital expenditure and non-profit payments.",
    "The master budget consolidates the profit or loss, financial position and cash budgets.",
    "Sensitivity analysis changes one variable to identify which assumptions matter; scenario analysis changes a coherent set together.",
  ],
  knowledgeDiagnostic: [
    { q: "State the production budget formula and the sanity check on it.", a: "Production = sales + closing finished goods inventory − opening finished goods inventory. The check: to finish with more stock than you started with, production must exceed sales." },
    { q: "Why is the materials usage budget based on production rather than sales?", a: "Because material is consumed when goods are MADE. Sales may be met partly from opening finished goods inventory, which consumed material in an earlier period." },
    { q: "Why must depreciation be excluded from a cash budget?", a: "It is an accounting expense that never involves a payment. A cash budget records only movements of cash." },
    { q: "Give three reasons a profitable business can run short of cash.", a: "Growth in working capital as receivables and inventory rise; the timing gap between paying suppliers and collecting from customers; capital expenditure; and payments outside profit such as loan repayments, tax and dividends." },
    { q: "What is the difference between sensitivity and scenario analysis?", a: "Sensitivity ('what if') analysis changes one variable at a time to see which assumptions matter most. Scenario analysis changes a coherent set of variables together, such as a recession affecting volume, price and collection period at once." },
  ],
  furtherStudy: [
    "Working capital management — the cause of most cash gaps — is examined quantitatively in **FM**.",
    "Chapter 18 flexes these budgets so that actual performance can be compared fairly.",
  ],
}

/* ── Chapter 18 · D3, D5 ───────────────────────────────────────── */

export const MA_TREE_18: StudyChapter = {
  id: "MA-18",
  number: 18,
  paper: "MA",
  area: "D",
  title: "Flexible budgets and budgetary control",
  minutes: 17,
  syllabusRefs: ["D3(a)", "D3(b)", "D3(c)", "D3(d)", "D5(a)", "D5(b)", "D5(c)"],
  intro:
    "Comparing actual costs at 11,000 units against a budget set for 10,000 units tells you almost nothing. Flexing the budget is what separates 'we made more than planned' from 'we spent more than we should have' — and it is the foundation of everything in Area E.",
  outcomes: [
    "Explain the limitation of comparing actual results with a fixed budget",
    "Explain the importance of flexible budgets in control",
    "Identify when a fixed and when a flexible budget is appropriate",
    "Flex a budget to the actual level of activity",
    "Split the gap between plan and outcome into the part caused by volume and the part caused by performance",
    "Explain the concept of responsibility accounting and controllability",
    "Apply the principle of exception reporting in budgetary control",
  ],
  sections: [
    {
      id: "why-flex",
      heading: "Why a fixed budget cannot control anything",
      blocks: [
        {
          kind: "definition",
          term: "Fixed and flexible budgets",
          md: "A **fixed budget** is set for one planned level of activity and is not changed. A **flexible budget** is **recalculated at the activity level actually achieved**, so that the comparison with actual results holds volume constant.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The whole idea in one sentence",
          md: "**Comparing actual cost at one volume with budgeted cost at a different volume mixes two effects — how much was produced and how well it was produced — and reports the sum as though it were performance.** Flexing separates them: the difference between the fixed and flexed budget is the **volume** effect, and the difference between the flexed budget and actual is the **performance** effect.",
        },
        {
          kind: "example",
          title: "Worked example — the same results, two conclusions",
          scenario:
            "The budget for 10,000 units was: materials $60,000 (variable), labour $40,000 (variable), fixed overhead $30,000. Actual output was 12,000 units and actual costs were materials $70,800, labour $49,200, fixed overhead $31,500. Compare actual against the fixed budget and against a flexed budget.",
          steps: [
            { label: "Against the FIXED budget", detail: "Total budget $130,000; total actual $151,500. Adverse by $21,500 — which looks like poor cost control." },
            { label: "Flex the budget to 12,000 units", detail: "Variable costs scale with volume: materials $60,000 × 12/10 = $72,000; labour $40,000 × 12/10 = $48,000. Fixed overhead does NOT scale: it stays at $30,000. Flexed total = $150,000." },
            { label: "Compare actual against the FLEXED budget", detail: "Materials: flexed $72,000 vs actual $70,800 = $1,200 FAVOURABLE. Labour: flexed $48,000 vs actual $49,200 = $1,200 adverse. Fixed overhead: $30,000 vs $31,500 = $1,500 adverse. Total = $1,500 adverse." },
            { label: "Reconcile the two comparisons", detail: "The $21,500 apparent overspend splits into a $20,000 VOLUME effect (the extra 2,000 units legitimately cost more: $12 × 2,000 in variable cost) and a $1,500 genuine performance overspend." },
          ],
          result:
            "Against the fixed budget, costs appear $21,500 adverse. Against the flexed budget the real performance shortfall is **$1,500 adverse** — and materials were actually managed **favourably**. The fixed-budget comparison would have prompted an investigation of materials, which was the one cost being controlled well. This is the single most important calculation in Area D.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "What flexes and what does not",
          md: "**Variable costs flex** in proportion to activity. **Fixed costs do NOT flex** — they stay at the original budget. **Semi-variable costs flex only in their variable element**, which is why Chapter 7's high/low analysis has to come first. Flexing a fixed cost is the commonest error, and it makes the whole exercise meaningless.",
        },
      ],
      check: {
        q: "A budget for 8,000 units includes variable cost of $48,000 and fixed cost of $25,000. Actual output was 9,000 units. What is the flexed budget total?",
        options: ["$73,000", "$82,125", "$79,000", "$54,000"],
        correct: 2,
        explain:
          "Variable cost flexes: $48,000 × 9,000/8,000 = $54,000. Fixed cost does NOT flex and stays at $25,000. Flexed total = $54,000 + $25,000 = $79,000. The distractor $82,125 flexes BOTH costs — the commonest error — and $73,000 is the original unflexed budget.",
      },
    },
    {
      id: "when-each",
      heading: "When each type of budget is appropriate",
      blocks: [
        {
          kind: "table",
          caption: "Fixed or flexible?",
          head: ["Use a FIXED budget", "Use a FLEXIBLE budget"],
          rows: [
            ["For **planning** — resources must be committed against one expected level", "For **control** — comparing actual performance fairly"],
            ["Where activity is genuinely stable and predictable", "Where activity varies from plan, which is usually"],
            ["For costs that do not vary with activity anyway, such as head office administration", "Wherever a significant part of cost is variable or semi-variable"],
            ["For authorising a capital or discretionary spend limit", "For any production, service or sales cost centre judged on efficiency"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Both, at different times",
          md: "The distinction is not either/or: the **fixed** budget is the plan agreed at the start of the year and the basis for committing resources, and the **flexed** budget is prepared **after** the period to make the control comparison fair. A well-run system uses the fixed budget for planning and authorisation and flexes it for reporting.",
        },
      ],
    },
    {
      id: "variances",
      heading: "Simple variances and the control report",
      blocks: [
        {
          kind: "formula",
          name: "The two-part split",
          expr: "Total difference  =  ( Fixed budget  −  Flexed budget )  +  ( Flexed budget  −  Actual )\n                     =        VOLUME effect        +      PERFORMANCE variances",
          note: "The volume effect is not a performance failure; it is the consequence of operating at a different activity level. Only the second term measures how well costs were managed.",
        },
        {
          kind: "table",
          caption: "Reading a variance",
          head: ["Situation", "Label", "Effect on profit"],
          rows: [
            ["Actual cost **less** than flexed budget", "**Favourable** (F)", "Increases profit"],
            ["Actual cost **more** than flexed budget", "**Adverse** (A)", "Reduces profit"],
            ["Actual revenue **more** than flexed budget", "**Favourable** (F)", "Increases profit"],
            ["Actual revenue **less** than flexed budget", "**Adverse** (A)", "Reduces profit"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Costs and revenues run in opposite directions",
          md: "For **costs**, spending less is favourable. For **revenues**, earning less is adverse. Candidates working quickly through a report apply one rule to both and reverse half the labels. Ask each time: **does this make profit higher or lower?** — the answer defines the label, and it never misleads.",
        },
        {
          kind: "definition",
          term: "Responsibility accounting and controllability",
          md: "**Responsibility accounting** reports costs and revenues to the manager who **controls** them. The principle of **controllability** is that a manager should be held accountable **only** for what they can influence — so an apportioned share of head office cost, or a material price rise set by a world market, does not belong in the assessment of a production manager's performance.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Controllability is what makes a variance report fair — and useful",
          md: "Charging a manager with uncontrollable costs does two kinds of damage: it is **unjust**, and it is **useless**, because no action the manager can take will change the number. Worse, it invites them to dismiss the whole report. A well-designed control report **separates controllable from uncontrollable** items and asks the manager to explain only the first.",
        },
        {
          kind: "definition",
          term: "Exception reporting and the significance of a variance",
          md: "Reporting only variances **outside a defined tolerance**, so management attention goes where it is needed. Whether a variance is worth investigating depends on its **size** (absolute and as a percentage), whether it is **controllable**, whether it is a **trend** or a one-off, the **cost of investigating** against the likely benefit, and whether the **standard itself** is out of date.",
        },
        {
          kind: "activity",
          title: "Activity 3 — critique a control report",
          prompt:
            "A production manager receives this monthly report:\n\nBudget (set for 20,000 units) $410,000. Actual (24,000 units produced) $487,000. Variance $77,000 ADVERSE.\n\nThe report includes an apportioned share of head office costs of $30,000 and a note that the world price of the main raw material rose 9% during the month. The manager is asked to explain the adverse variance.\n\nIdentify four faults in the report and state what it should show instead.",
          answer:
            "**Fault 1 — the budget has not been flexed.** Actual output was 24,000 units against a budget set for 20,000, so a substantial part of the $77,000 is simply the cost of making 20% more. Comparing costs at two different volumes measures nothing. The report must show a **flexed budget at 24,000 units** and compare actual against that.\n\n**Fault 2 — uncontrollable head office costs are included.** The $30,000 apportionment is not influenced by the production manager in any way, so including it is both unjust and useless: no action available to them changes it. It should be **shown separately** as an uncontrollable item, or excluded from their assessment entirely.\n\n**Fault 3 — the material price rise is not separated out.** A 9% rise in a world price is not the manager's doing. The variance should be **analysed between price and usage** (Chapter 22): the price element is largely uncontrollable, while usage — whether more material was consumed per unit than it should have been — is genuinely theirs to explain.\n\n**Fault 4 — a single total variance is not actionable.** One $77,000 figure gives no indication of where to look. The report should analyse the variance **by cost element** (materials, labour, overhead) and apply **exception reporting** so that only items outside tolerance are raised.\n\n**What it should show instead.** The fixed budget, the budget flexed to 24,000 units, and actual — with the difference split between the **volume** effect (not a performance issue) and **performance** variances by cost element, those variances separated into **controllable and uncontrollable**, and only the significant controllable ones flagged for explanation. On that basis the manager can actually answer, and the answer will be worth having.",
        },
      ],
      check: {
        q: "A manager's cost centre report includes an apportioned share of head office administration costs. Why is this poor practice?",
        options: [
          "Head office costs are always immaterial",
          "The manager cannot influence them, so including them is neither fair nor useful",
          "Head office costs should be treated as variable",
          "It overstates the cost centre's output",
        ],
        correct: 1,
        explain:
          "The principle of CONTROLLABILITY says a manager should be accountable only for what they can influence. An apportioned head office cost fails that test, so including it is unjust AND useless — no action available to the manager changes the figure, and its presence invites them to dismiss the whole report. Such items should be shown separately as uncontrollable.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Comparing actual results with an unflexed budget.",
      fix: "Flex the budget to actual activity first, or the comparison mixes the volume effect with performance and reports the sum as performance.",
    },
    {
      trap: "Flexing fixed costs.",
      fix: "Fixed costs do NOT flex — they stay at the original budget. Only variable costs, and the variable element of semi-variable costs, are flexed.",
    },
    {
      trap: "Forgetting to split a semi-variable cost before flexing.",
      fix: "Separate it into fixed and variable elements first, using high/low or regression from Chapter 7, then flex only the variable part.",
    },
    {
      trap: "Applying the same favourable/adverse rule to costs and revenues.",
      fix: "Ask whether profit is higher or lower. Spending less is favourable; earning less is adverse.",
    },
    {
      trap: "Holding a manager accountable for apportioned or externally-driven costs.",
      fix: "Report controllable and uncontrollable items separately, and ask for explanation of the controllable only.",
    },
    {
      trap: "Reporting one total variance and asking for an explanation.",
      fix: "Analyse by cost element and apply exception reporting, so attention goes to significant, controllable, actionable items.",
    },
  ],
  keyTerms: [
    { term: "Fixed budget", def: "A budget set for one planned level of activity and not subsequently changed." },
    { term: "Flexible budget", def: "A budget recalculated at the activity level actually achieved, so control comparisons hold volume constant." },
    { term: "Volume effect", def: "The difference between the fixed and flexed budget, caused by operating at a different activity level rather than by performance." },
    { term: "Favourable variance", def: "A difference from the flexed budget that increases profit." },
    { term: "Adverse variance", def: "A difference from the flexed budget that reduces profit." },
    { term: "Responsibility accounting", def: "Reporting costs and revenues to the manager who controls them." },
    { term: "Controllability", def: "The principle that a manager should be accountable only for costs and revenues they can influence." },
    { term: "Exception reporting", def: "Reporting only variances outside a defined tolerance, so attention goes where it is needed." },
  ],
  summary: [
    "A fixed budget cannot control performance, because comparing costs at two different volumes mixes volume with efficiency.",
    "Flexing recalculates the budget at actual activity, separating the volume effect from genuine performance variances.",
    "Variable costs flex; fixed costs do not; semi-variable costs flex only in their variable element.",
    "The fixed budget serves planning and authorisation; the flexed budget serves control reporting.",
    "For costs, spending less is favourable; for revenues, earning less is adverse — decide by asking what happens to profit.",
    "Responsibility accounting reports to the manager who controls the item, and controllability makes the report both fair and actionable.",
    "Exception reporting directs attention to significant variances, judged on size, controllability, trend, investigation cost and whether the standard is current.",
  ],
  knowledgeDiagnostic: [
    { q: "Why must a budget be flexed before comparing it with actual results?", a: "Because comparing costs at one volume with a budget set for another mixes two effects — how much was produced and how well — and reports the sum as performance. Flexing holds volume constant so only performance remains." },
    { q: "Which costs flex and which do not?", a: "Variable costs flex in proportion to activity. Fixed costs do not flex at all. Semi-variable costs flex only in their variable element, so they must be split first." },
    { q: "How does the total difference split when a budget is flexed?", a: "Fixed budget to flexed budget is the VOLUME effect, which is not a performance issue. Flexed budget to actual is the PERFORMANCE variance, which is." },
    { q: "What is the principle of controllability?", a: "A manager should be accountable only for costs and revenues they can influence. Including apportioned or externally-driven costs is unjust and useless, since no available action changes them." },
    { q: "What determines whether a variance should be investigated?", a: "Its size in absolute and percentage terms, whether it is controllable, whether it is a trend or a one-off, the cost of investigating against the likely benefit, and whether the standard itself is out of date." },
  ],
  furtherStudy: [
    "Flexing is the foundation of Area E: every variance in Chapter 22 is a comparison against a flexed standard.",
    "Behavioural aspects of control reporting are developed in **PM** and **APM**.",
  ],
}

/* ── Chapter 19 · D4(a)–(g) ────────────────────────────────────── */

export const MA_TREE_19: StudyChapter = {
  id: "MA-19",
  number: 19,
  paper: "MA",
  area: "D",
  title: "Capital budgeting: relevant cash flows and payback",
  minutes: 17,
  syllabusRefs: ["D4(a)", "D4(b)", "D4(c)", "D4(d)", "D4(e)", "D4(f)", "D4(g)"],
  intro:
    "A capital investment commits cash now for returns over years. Before any discounting can be done, two things must be right: which cash flows belong in the appraisal at all, and the difference between cash flow and profit.",
  outcomes: [
    "Explain the importance of capital investment planning and control",
    "Distinguish capital from revenue expenditure",
    "Outline the stages in the capital investment appraisal process",
    "Explain and calculate simple and compound interest",
    "Explain the distinction between cash flow and profit, and why appraisal uses cash flow",
    "Identify relevant cash flows, excluding sunk costs and including opportunity costs",
    "Calculate and interpret the payback period",
  ],
  sections: [
    {
      id: "capital-vs-revenue",
      heading: "Capital and revenue expenditure",
      blocks: [
        {
          kind: "definition",
          term: "Capital and revenue expenditure",
          md: "**Capital** expenditure acquires or improves a **non-current asset** and benefits more than one period; it is capitalised in the statement of financial position and depreciated. **Revenue** expenditure is incurred in running the business day to day and is charged in full to the period.",
        },
        {
          kind: "table",
          caption: "The borderline cases that get examined",
          head: ["Expenditure", "Treatment", "Why"],
          rows: [
            ["Purchase price of a machine", "**Capital**", "Acquires a non-current asset"],
            ["Delivery and installation of that machine", "**Capital**", "Cost of bringing the asset into working condition"],
            ["Routine servicing of the machine", "**Revenue**", "Maintains rather than enhances; benefits one period"],
            ["Major upgrade extending the machine's life or capacity", "**Capital**", "Improves the asset beyond its original condition"],
            ["Repainting the factory", "**Revenue**", "Maintenance"],
            ["Building an extension to the factory", "**Capital**", "Enhances the asset"],
            ["Staff training to operate a new machine", "**Revenue**, normally", "Not part of the asset's cost, though it is a relevant cash flow for the appraisal"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two different questions, and do not confuse them",
          md: "**Capital or revenue** is an ACCOUNTING classification, deciding where the cost appears in the financial statements. **Relevant or irrelevant** is an APPRAISAL question, deciding whether a cash flow belongs in the investment decision. Staff training is revenue expenditure and a relevant cash flow. Depreciation is neither capital nor revenue expenditure in cash terms and is never a relevant cash flow at all.",
        },
      ],
    },
    {
      id: "interest",
      heading: "Simple and compound interest",
      blocks: [
        {
          kind: "formula",
          name: "Simple and compound interest",
          expr: "Simple interest:    Value  =  P  ×  ( 1  +  rn )\n\nCompound interest:  Value  =  P  ×  ( 1  +  r )ⁿ",
          note: "P = principal · r = interest rate per period as a decimal · n = number of periods. SIMPLE interest is earned on the principal only; COMPOUND interest is earned on the principal plus accumulated interest.",
        },
        {
          kind: "example",
          title: "Worked example — the cost of the difference",
          scenario:
            "$50,000 is invested for 6 years at 8% a year. Calculate the value under simple and under compound interest, and explain the difference.",
          steps: [
            { label: "Simple interest", detail: "$50,000 × (1 + 0.08 × 6) = $50,000 × 1.48 = $74,000. Interest of $4,000 a year for six years, always on the original $50,000." },
            { label: "Compound interest", detail: "$50,000 × (1.08)⁶ = $50,000 × 1.586874 = $79,344." },
            { label: "The difference", detail: "$79,344 − $74,000 = $5,344, which is the interest earned ON earlier interest." },
            { label: "Why it matters here", detail: "Discounting (Chapter 20) is compounding run backwards. Getting the compound relationship right is therefore a prerequisite for everything in the next chapter." },
          ],
          result:
            "Simple $74,000; compound $79,344. The gap widens sharply with time and rate — over 20 years at 8% the compound figure is more than double the simple one. Financial appraisal always assumes **compounding**, so use $(1 + r)ⁿ$ unless a question specifically says simple interest.",
        },
      ],
    },
    {
      id: "cash-flow-vs-profit",
      heading: "Cash flow, not profit",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Investment appraisal uses CASH FLOW",
          md: "Profit is an accounting measure containing **non-cash items** and **judgements** — depreciation, accruals, provisions. Cash is a fact. Since the decision is whether committing cash now produces more cash later, appraisal works on cash flow throughout. **The single most important consequence: DEPRECIATION IS EXCLUDED** from every appraisal, because it is not a cash flow.",
        },
        {
          kind: "definition",
          term: "Relevant cash flows",
          md: "Cash flows that are **future**, **incremental** and **cash**. Each word does work: past flows are irrelevant, flows that arise anyway are irrelevant, and non-cash items are irrelevant.",
        },
        {
          kind: "table",
          caption: "What goes in and what stays out",
          head: ["Item", "Relevant?", "Reason"],
          rows: [
            ["Initial cost of the asset", "**Yes**", "Future, incremental cash outflow"],
            ["Incremental operating cash flows", "**Yes**", "The point of the investment"],
            ["Scrap or residual value", "**Yes**", "A future cash inflow arising from the decision"],
            ["Working capital invested at the start", "**Yes** (outflow), and **recovered** at the end", "Cash tied up, then released"],
            ["**Depreciation**", "**No**", "Not a cash flow"],
            ["**Sunk costs** — e.g. market research already paid for", "**No**", "Past; unaffected by the decision"],
            ["**Committed costs** — payable whatever is decided", "**No**", "Not incremental"],
            ["**Apportioned fixed overhead** that will not change", "**No**", "Not incremental"],
            ["**Opportunity cost** — e.g. rent forgone on a building to be used", "**Yes**", "A real cash consequence of choosing this project"],
            ["Interest payments on finance for the project", "**No**", "The cost of finance is reflected in the discount rate, so including it double-counts"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The four exclusions candidates get wrong most often",
          md: "**Depreciation** — never a cash flow. **Sunk costs** — money already spent cannot be recovered by any decision now. **Apportioned overhead that does not change** — allocation is not incrementality. **Interest** — because the discount rate already reflects the cost of finance, so including interest as a cash flow charges for it twice.\n\nAnd the one that gets **omitted** rather than wrongly included: **opportunity cost**. If a project uses a building the company could otherwise let for $40,000 a year, that forgone rent is a real cost of the project.",
        },
        {
          kind: "activity",
          title: "Activity 4 — identify the relevant cash flows",
          prompt:
            "A company is appraising a new product line. State whether each item is a relevant cash flow, with a one-line reason.\n\n(a) $60,000 of market research already commissioned and paid for.\n(b) $500,000 for new machinery, plus $20,000 delivery.\n(c) Depreciation of the machinery, $104,000 a year.\n(d) An existing warehouse would be used; it is currently let for $35,000 a year, and the tenancy would end.\n(e) A share of head office administration, apportioned at $45,000 a year, which will not change.\n(f) $80,000 of additional inventory and receivables needed from the start, recoverable when the line closes.\n(g) Interest of $30,000 a year on a loan raised to buy the machinery.",
          answer:
            "**(a) NOT relevant — sunk cost.** The $60,000 is already spent and no decision now can recover it. Whether the project proceeds or not, the cash has gone.\n\n**(b) RELEVANT — $520,000 outflow.** Future, incremental and cash. Delivery is included because it is part of the cost of bringing the asset into use.\n\n**(c) NOT relevant — depreciation is not a cash flow.** It is an accounting allocation of the $520,000 already counted in (b); including both would double-count the asset.\n\n**(d) RELEVANT — $35,000 a year opportunity cost.** Choosing the project forgoes real rental income, and that is a genuine cash consequence of the decision. This is the item most often omitted.\n\n**(e) NOT relevant.** It is apportioned and will not change, so it is not incremental. Note the qualification: if head office costs actually **rose** because of the project, the increase would be relevant.\n\n**(f) RELEVANT — $80,000 outflow at the start and an $80,000 inflow at the end.** Working capital is cash tied up and then released; both movements belong in the appraisal.\n\n**(g) NOT relevant.** The cost of finance is reflected in the **discount rate**, so including interest as a cash flow charges for it twice.\n\n**Total initial outflow: $600,000** ($520,000 plus $80,000 working capital), with $35,000 a year of opportunity cost in the annual flows.",
        },
      ],
      check: {
        q: "Which of the following is a relevant cash flow in an investment appraisal?",
        options: [
          "Depreciation of the new asset",
          "Market research paid for last year",
          "Rental income forgone by using a building the company already owns",
          "An apportioned share of head office cost that will not change",
        ],
        correct: 2,
        explain:
          "Forgone rental income is an OPPORTUNITY COST — a real cash consequence of choosing this project — so it is relevant, and it is the item candidates most often omit. Depreciation is not a cash flow, past market research is a sunk cost, and an unchanged apportioned overhead is not incremental.",
      },
    },
    {
      id: "payback",
      heading: "The payback period",
      blocks: [
        {
          kind: "definition",
          term: "Payback period",
          md: "The time taken for a project's **cumulative net cash inflows to recover the initial investment**. It measures how quickly the money comes back, not how much is earned.",
        },
        {
          kind: "example",
          title: "Worked example — payback with uneven cash flows",
          scenario:
            "A project costs $420,000 and generates net cash inflows of $120,000, $150,000, $160,000 and $110,000 in years 1 to 4. Calculate the payback period, assuming cash flows arise evenly through each year.",
          steps: [
            { label: "Build the cumulative cash flow", detail: "End of year 1: −$300,000. End of year 2: −$150,000. End of year 3: +$10,000." },
            { label: "Identify the year payback occurs", detail: "The cumulative figure turns positive during year 3, so payback is between 2 and 3 years." },
            { label: "Compute the fraction of year 3", detail: "$150,000 still to recover at the start of year 3, out of that year's $160,000 inflow: 150 ÷ 160 = 0.9375 of a year, or about 11.3 months." },
            { label: "State the payback period", detail: "2 years and approximately 11 months, or 2.94 years." },
          ],
          result:
            "Payback is **2.94 years**. The technique is to build the **cumulative** column first, find where it crosses zero, and then interpolate within that year. Note the assumption the interpolation requires — that cash arises evenly through the year — which is worth stating.",
        },
        {
          kind: "table",
          caption: "Payback, weighed up",
          head: ["Advantages", "Disadvantages"],
          rows: [
            ["Simple to calculate and to explain to non-financial managers", "**Ignores all cash flows after payback** — including a large inflow in year 5"],
            ["Emphasises liquidity, which matters to a cash-constrained business", "**Ignores the time value of money** (unless discounted payback is used)"],
            ["Reduces risk by favouring projects that recover cash quickly", "Takes no account of overall profitability, so it can reject the more valuable project"],
            ["Useful as an initial screen before fuller appraisal", "The target payback period is arbitrary"],
            ["Suits rapidly changing markets where distant forecasts are unreliable", "Biased against long-term strategic investment"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The decisive criticism, and the partial fix",
          md: "Payback **ignores everything after the payback point**. A project returning $50,000 a year for 3 years and one returning $50,000 a year for 30 years have identical payback and wildly different value. **Discounted payback** — the same calculation on discounted cash flows — fixes the time-value objection but not this one. Payback is therefore best used as a **screen alongside NPV**, never as the sole criterion.",
        },
      ],
      check: {
        q: "A project costs $300,000 and returns $100,000 a year for 10 years. Another costs $300,000 and returns $100,000 a year for 3 years. What does payback say?",
        options: [
          "The first project is better, because it runs longer",
          "Both have a payback of 3 years, so payback cannot distinguish them",
          "The second is better, because it recovers cash sooner",
          "Neither pays back",
        ],
        correct: 1,
        explain:
          "Both recover the $300,000 in exactly 3 years, so payback rates them identically — even though the first generates $700,000 more in total. This is payback's decisive weakness: it IGNORES ALL CASH FLOWS AFTER the payback point, which is why it should be used as a screen alongside NPV rather than as the sole decision criterion.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Including depreciation in an investment appraisal.",
      fix: "It is not a cash flow, and the asset's cost is already counted as the initial outflow. Including both double-counts.",
    },
    {
      trap: "Including a sunk cost such as research already paid for.",
      fix: "Past cash flows are irrelevant — no decision now can change them.",
    },
    {
      trap: "Omitting opportunity cost.",
      fix: "Rent or income forgone by using a resource the company already owns is a real cash consequence of the decision, and it is the most commonly missed relevant flow.",
    },
    {
      trap: "Including interest payments as a project cash flow.",
      fix: "The cost of finance is in the discount rate. Including interest as well charges for it twice.",
    },
    {
      trap: "Including apportioned fixed overhead that will not change.",
      fix: "Only INCREMENTAL cost is relevant. If head office cost genuinely rises because of the project, that increase is relevant — the apportionment is not.",
    },
    {
      trap: "Forgetting that working capital is recovered at the end.",
      fix: "It is an outflow at the start and an inflow when the project ends. Both belong in the appraisal.",
    },
    {
      trap: "Using payback as the sole decision criterion.",
      fix: "It ignores everything after the payback point and the time value of money. Use it as a screen alongside NPV.",
    },
  ],
  keyTerms: [
    { term: "Capital expenditure", def: "Expenditure acquiring or improving a non-current asset, benefiting more than one period." },
    { term: "Revenue expenditure", def: "Expenditure incurred in running the business day to day, charged in full to the period." },
    { term: "Compound interest", def: "Interest earned on the principal plus accumulated interest: P × (1 + r)ⁿ." },
    { term: "Relevant cash flow", def: "A cash flow that is future, incremental and cash." },
    { term: "Sunk cost", def: "A cost already incurred, which no current decision can change and which is therefore irrelevant." },
    { term: "Opportunity cost", def: "The value of the best alternative forgone by choosing a course of action; a relevant cash flow." },
    { term: "Payback period", def: "The time taken for cumulative net cash inflows to recover the initial investment." },
    { term: "Discounted payback", def: "Payback calculated on discounted cash flows, which addresses the time value objection but not the post-payback one." },
  ],
  summary: [
    "Capital expenditure acquires or improves a non-current asset; revenue expenditure is charged to the period.",
    "Capital-or-revenue is an accounting classification; relevant-or-irrelevant is an appraisal question, and they are not the same.",
    "Compound interest is P × (1 + r)ⁿ, and discounting is compounding run backwards.",
    "Appraisal uses cash flow rather than profit, so depreciation is always excluded.",
    "Relevant cash flows are future, incremental and cash — which excludes sunk costs, committed costs, unchanged apportioned overhead and interest.",
    "Opportunity cost IS relevant and is the flow most often omitted.",
    "Working capital is an outflow at the start and an inflow at the end.",
    "Payback measures how fast cash returns; it ignores everything after the payback point and the time value of money.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does investment appraisal use cash flow rather than profit?", a: "Because profit contains non-cash items and judgements — depreciation, accruals, provisions — while the decision is whether committing cash now produces more cash later. The main consequence is that depreciation is always excluded." },
    { q: "What three tests must a cash flow pass to be relevant?", a: "It must be FUTURE, INCREMENTAL and CASH. That excludes sunk costs, committed costs, unchanged apportioned overhead and any non-cash item." },
    { q: "Why is interest on project finance excluded from the cash flows?", a: "Because the cost of finance is already reflected in the discount rate. Including interest as a cash flow as well would charge for it twice." },
    { q: "How is opportunity cost treated, and why is it easily missed?", a: "It is a relevant cash flow — income genuinely forgone by choosing the project, such as rent on a building that would otherwise be let. It is missed because no payment is made, so it does not appear in any accounting record." },
    { q: "What is payback's decisive weakness?", a: "It ignores all cash flows after the payback point, so two projects with identical payback can differ enormously in total value. Discounted payback fixes the time-value objection but not this one." },
  ],
  furtherStudy: [
    "Relevant costing for short-run decisions is developed in **PM**; investment appraisal in **FM** and **AFM**.",
    "Chapter 20 applies discounting to these cash flows to produce NPV and IRR.",
  ],
}

/* ── Chapter 20 · D4(e)–(k) ────────────────────────────────────── */

export const MA_TREE_20: StudyChapter = {
  id: "MA-20",
  number: 20,
  paper: "MA",
  area: "D",
  title: "Discounted cash flow: NPV and IRR",
  minutes: 20,
  syllabusRefs: ["D4(e)", "D4(h)", "D4(i)", "D4(j)", "D4(k)"],
  intro:
    "A dollar next year is worth less than a dollar today. Discounting puts every cash flow on a comparable footing, and the two techniques built on it — net present value and internal rate of return — are how investments are properly appraised.",
  outcomes: [
    "Explain the time value of money and the principle of discounting",
    "Calculate a present value using discount factors, annuity factors and perpetuity factors",
    "Calculate and interpret net present value",
    "Calculate and interpret internal rate of return by interpolation",
    "Compare NPV and IRR and explain why NPV is theoretically superior",
    "Interpret the results of NPV, IRR and payback together",
  ],
  sections: [
    {
      id: "time-value",
      heading: "The time value of money",
      blocks: [
        {
          kind: "list",
          title: "Why a dollar today is worth more than a dollar next year",
          items: [
            "**It can be invested** and earn a return in the meantime — the opportunity cost of waiting.",
            "**Inflation** erodes purchasing power, so the same money buys less later.",
            "**Risk** — a future receipt may not arrive at all, while cash in hand is certain.",
            "**Preference** — people and businesses simply prefer consumption and liquidity sooner.",
          ],
        },
        {
          kind: "formula",
          name: "Discount factor and present value",
          expr: "Discount factor  =  1  ÷  ( 1 + r )ⁿ\n\nPresent value  =  Future cash flow  ×  Discount factor",
          note: "r = the discount rate (cost of capital) as a decimal · n = the number of years away. Discounting is compounding run backwards. Discount tables are PROVIDED in the MA exam.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The timing convention",
          md: "**Time 0 (T0) is now**, so a cash flow at T0 is **not discounted** — its discount factor is 1. A flow at the **end of year 1** is discounted one year, end of year 2 two years, and so on. Where a question says a flow occurs at the **start** of year 2, that is the **end of year 1** — the same point in time. Getting the timing wrong is more damaging than an arithmetic slip, because it shifts every subsequent factor.",
        },
      ],
    },
    {
      id: "annuities-perpetuities",
      heading: "Annuities and perpetuities",
      blocks: [
        {
          kind: "definition",
          term: "Annuity and perpetuity",
          md: "An **annuity** is an **equal** cash flow arising for a **fixed number** of consecutive periods. A **perpetuity** is an equal cash flow arising **forever**. Both have shortcut factors, so equal flows need not be discounted one year at a time.",
        },
        {
          kind: "formula",
          name: "Annuity and perpetuity factors",
          expr: "Annuity factor  =  [ 1  −  (1 + r)⁻ⁿ ]  ÷  r\n\nPerpetuity factor  =  1  ÷  r\n\nPerpetuity starting in one year, present value  =  Cash flow  ÷  r",
          note: "Both provided in the exam. An annuity factor is simply the SUM of the individual discount factors for those years — which is a useful check if you are unsure whether to use it.",
        },
        {
          kind: "example",
          title: "Worked example — annuity, delayed annuity and perpetuity",
          scenario:
            "The cost of capital is 10%. Calculate the present value of: (a) $40,000 a year for 5 years starting in one year; (b) $40,000 a year for 5 years but starting in year 4 (that is, years 4 to 8); (c) $25,000 a year in perpetuity starting in one year.",
          steps: [
            { label: "(a) Straightforward annuity", detail: "The 5-year annuity factor at 10% is 3.791. PV = $40,000 × 3.791 = $151,640." },
            { label: "(b) A delayed annuity — the technique", detail: "The flows run years 4 to 8. Take the annuity factor for the FULL period to the end (8 years, 5.335) and DEDUCT the factor for the years with no cash flow (3 years, 2.487): 5.335 − 2.487 = 2.848." },
            { label: "(b) Compute", detail: "PV = $40,000 × 2.848 = $113,920. Note it is lower than (a) despite identical cash flows, because they arrive three years later." },
            { label: "(c) Perpetuity", detail: "Perpetuity factor = 1 ÷ 0.10 = 10. PV = $25,000 × 10 = $250,000." },
            { label: "Sense-check (c)", detail: "$250,000 invested at 10% yields $25,000 a year forever without touching the capital — which is exactly what the perpetuity is worth." },
          ],
          result:
            "(a) $151,640 · (b) $113,920 · (c) $250,000. The **delayed annuity** is the examinable technique: take the annuity factor to the **last** year of the flows and subtract the factor for the years **before** they start. Discounting a 5-year annuity factor by a single year's discount factor is the alternative route and gives the same answer — but subtracting factors is less error-prone.",
        },
      ],
      check: {
        q: "The cost of capital is 8%. What is the present value of $12,000 receivable in perpetuity, first payment in one year?",
        options: ["$96,000", "$150,000", "$960", "$120,000"],
        correct: 1,
        explain:
          "The perpetuity factor is 1 ÷ r = 1 ÷ 0.08 = 12.5, so PV = $12,000 × 12.5 = $150,000. Sense-check it: $150,000 invested at 8% yields $12,000 a year indefinitely without touching the capital. The distractor $96,000 comes from multiplying by 8 rather than dividing by 0.08.",
      },
    },
    {
      id: "npv",
      heading: "Net present value",
      blocks: [
        {
          kind: "definition",
          term: "Net present value (NPV)",
          md: "The sum of the **present values of all a project's cash flows**, inflows less outflows. A **positive** NPV means the project earns more than the cost of capital and therefore **increases shareholder wealth**; a negative NPV means it destroys it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The decision rule",
          md: "**Accept a project with a positive NPV; reject a negative one.** Where projects compete and only one can be chosen, accept the **highest** NPV. The NPV is expressed in **today's dollars** and measures the absolute increase in wealth — which is what makes it the theoretically correct criterion.",
        },
        {
          kind: "example",
          title: "Worked example — a full NPV appraisal",
          scenario:
            "A project needs $500,000 of machinery now and $60,000 of working capital, recovered at the end. Net operating cash inflows are $180,000 a year for 4 years. The machinery has a scrap value of $50,000 at the end of year 4. The cost of capital is 10%. Depreciation on the machinery would be $112,500 a year. Calculate the NPV and advise.",
          steps: [
            { label: "Deal with depreciation first", detail: "EXCLUDE it. It is not a cash flow, and the machinery's $500,000 cost is already in the appraisal at T0. Including both would double-count." },
            { label: "T0 outflow", detail: "Machinery $500,000 + working capital $60,000 = $560,000. Not discounted — the factor at T0 is 1." },
            { label: "Years 1 to 4 operating flows", detail: "$180,000 a year for 4 years is an annuity. The 4-year factor at 10% is 3.170. PV = $180,000 × 3.170 = $570,600." },
            { label: "Year 4 terminal flows", detail: "Scrap $50,000 + working capital recovered $60,000 = $110,000 at the end of year 4. The single-year discount factor at 10% for year 4 is 0.683. PV = $110,000 × 0.683 = $75,130." },
            { label: "Net present value", detail: "−$560,000 + $570,600 + $75,130 = **+$85,730**." },
            { label: "Advise", detail: "The NPV is positive, so the project earns more than the 10% cost of capital and increases shareholder wealth by $85,730 in today's terms. ACCEPT." },
          ],
          result:
            "NPV **+$85,730 — accept.** Three mechanics carry the marks: **exclude depreciation**, **do not discount the T0 flow**, and **remember working capital is recovered** at the end. Note the structure: an annuity factor for the even annual flows and a single-year factor for the one-off terminal amounts.",
        },
        {
          kind: "table",
          caption: "NPV, weighed up",
          head: ["Advantages", "Disadvantages"],
          rows: [
            ["Accounts for the **time value of money**", "Requires an estimate of the cost of capital, which may be difficult"],
            ["Uses **all** the project's cash flows", "Depends entirely on cash flow forecasts, which are uncertain"],
            ["Measures the **absolute** increase in shareholder wealth", "Expressed in absolute dollars, so it does not show the return per dollar invested"],
            ["**Theoretically correct** — the decision rule maximises wealth", "Harder to explain to non-financial managers than payback or a percentage return"],
            ["Additive: the NPVs of independent projects can be summed", "Assumes the discount rate is constant over the project's life"],
          ],
        },
      ],
      check: {
        q: "A project has a positive net present value of $40,000 at a cost of capital of 12%. What does this mean?",
        options: [
          "The project earns exactly 12%",
          "The project earns more than 12% and increases shareholder wealth by $40,000 in today's terms",
          "The project will generate $40,000 of profit",
          "The project pays back in 12 years",
        ],
        correct: 1,
        explain:
          "A POSITIVE NPV means the project's returns exceed the cost of capital used to discount them, so it increases shareholder wealth — by $40,000 measured in TODAY'S dollars. An NPV of exactly zero would mean earning precisely 12%, which is the IRR condition. NPV is not accounting profit and has nothing to do with the payback period.",
      },
    },
    {
      id: "irr",
      heading: "Internal rate of return",
      blocks: [
        {
          kind: "definition",
          term: "Internal rate of return (IRR)",
          md: "The **discount rate at which a project's NPV is exactly zero** — the return the project itself generates. The decision rule: accept if the IRR **exceeds** the cost of capital.",
        },
        {
          kind: "formula",
          name: "IRR by linear interpolation",
          expr: "IRR  ≈  L  +  [  NPV_L  ÷  ( NPV_L  −  NPV_H )  ]  ×  ( H  −  L )",
          note: "L = the lower discount rate · H = the higher rate · NPV_L and NPV_H = the NPVs at those rates. Keep the SIGNS in the arithmetic. The result is an approximation, because the NPV/discount-rate relationship is a curve and interpolation assumes a straight line.",
        },
        {
          kind: "example",
          title: "Worked example — IRR by interpolation",
          scenario:
            "A project's NPV is +$48,000 at a discount rate of 10% and −$16,000 at 15%. Estimate the IRR and advise if the cost of capital is 12%.",
          steps: [
            { label: "Identify the inputs", detail: "L = 10%, NPV_L = +$48,000. H = 15%, NPV_H = −$16,000. The NPV changes sign between them, so the IRR lies in between." },
            { label: "Apply the formula, keeping the signs", detail: "IRR ≈ 10 + [48,000 ÷ (48,000 − (−16,000))] × (15 − 10) = 10 + [48,000 ÷ 64,000] × 5." },
            { label: "Compute", detail: "= 10 + (0.75 × 5) = 10 + 3.75 = 13.75%." },
            { label: "Advise", detail: "The IRR of 13.75% exceeds the 12% cost of capital, so ACCEPT — consistent with the fact that the NPV at 12% would be positive." },
            { label: "Note the approximation", detail: "The true relationship between NPV and the discount rate is a CURVE, so linear interpolation gives an estimate. The wider the gap between L and H, the less accurate it is." },
          ],
          result:
            "IRR ≈ **13.75% — accept**, since it exceeds the 12% cost of capital. The two things to get right are **keeping the signs** in the denominator (subtracting a negative makes it larger) and remembering that the answer is an **approximation** because the underlying relationship is not linear.",
        },
        {
          kind: "table",
          caption: "NPV and IRR compared",
          head: ["", "NPV", "IRR"],
          rows: [
            ["Expressed as", "An absolute amount of money", "A percentage return"],
            ["Decision rule", "Accept if positive", "Accept if it exceeds the cost of capital"],
            ["Needs the cost of capital to compute?", "**Yes**", "No — only to interpret the answer"],
            ["Intuitive appeal to non-financial managers", "Lower", "**Higher** — a percentage is easily understood"],
            ["Ranking competing projects", "**Reliable** — measures absolute wealth added", "**Unreliable** — a high percentage on a tiny project can beat a lower one on a large project worth far more"],
            ["Multiple answers possible?", "No", "**Yes**, where cash flows change sign more than once"],
            ["Reinvestment assumption", "Reinvestment at the cost of capital, which is realistic", "Reinvestment at the IRR itself, which is often unrealistic"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why NPV is theoretically superior",
          md: "**NPV measures the absolute increase in wealth, which is what shareholders actually receive.** IRR is a percentage, and a percentage is silent about scale: a 40% return on a $10,000 project adds $4,000 of value, while a 15% return on a $2m project adds far more. IRR can also produce **multiple answers** where cash flows change sign repeatedly, and it implicitly assumes cash can be reinvested at the IRR rather than at the cost of capital. Where the two techniques disagree on ranking, **follow the NPV**.",
        },
        {
          kind: "activity",
          title: "Activity 5 — the three techniques disagree",
          prompt:
            "Two mutually exclusive projects, with a cost of capital of 10%:\n\nProject A: initial cost $100,000; NPV +$28,000; IRR 24%; payback 2.1 years.\nProject B: initial cost $900,000; NPV +$95,000; IRR 15%; payback 4.3 years.\n\nOnly one can be undertaken. Which would you recommend, and what would make you change your mind?",
          answer:
            "**Recommend Project B.** Its NPV of $95,000 is more than three times A's $28,000, and NPV measures the **absolute increase in shareholder wealth** — which is what shareholders actually receive. On the correct criterion, B is clearly better.\n\n**Why A looks better on the other two measures, and why that is misleading.** A's IRR of 24% is far higher, but IRR is a **percentage** and says nothing about scale: a high return on $100,000 can add less wealth than a lower return on $900,000, which is exactly the case here. A's shorter payback reflects that it is smaller and faster, not that it is more valuable — and payback ignores everything after the payback point altogether.\n\n**What would change my mind — four things.**\n\n(1) **Capital rationing.** If the company cannot raise $900,000, B is not available and A is the best of what is. If several projects compete for limited funds, ranking by NPV per dollar invested becomes relevant.\n\n(2) **Severe cash constraint or liquidity risk.** A payback of 4.3 years may be unacceptable if the business needs cash back sooner to survive, in which case A's speed has real value that NPV does not capture.\n\n(3) **Risk and forecast reliability.** B's NPV depends on cash flows further into the future, which are less reliable. If B's forecasts are materially more uncertain, a sensitivity analysis showing how far its cash flows can fall before the NPV turns negative would matter — and if that margin is thin, A's smaller but safer gain may be preferable.\n\n(4) **Non-financial factors** — strategic fit, whether B commits the company to a market it does not want, or whether A can be repeated while B cannot.\n\n**The examinable point:** where the techniques disagree, **follow the NPV**, but state explicitly what could override it. An answer that just picks the higher NPV without acknowledging capital rationing and risk is incomplete.",
        },
      ],
      check: {
        q: "Two mutually exclusive projects: X has an IRR of 30% and an NPV of $20,000; Y has an IRR of 16% and an NPV of $85,000. The cost of capital is 10%. Which should be chosen?",
        options: [
          "X, because its IRR is much higher",
          "Y, because NPV measures the absolute increase in shareholder wealth",
          "Neither, because the two measures disagree",
          "Both, because both exceed the cost of capital",
        ],
        correct: 1,
        explain:
          "Where NPV and IRR conflict on RANKING mutually exclusive projects, follow the NPV — it measures the absolute wealth added, which is what shareholders receive. X's higher percentage is earned on a much smaller base. Both projects are individually acceptable (positive NPV, IRR above cost of capital), but they are mutually exclusive, so only one can be chosen.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Discounting the time 0 cash flow.",
      fix: "T0 is now, so its discount factor is 1. Only future flows are discounted.",
    },
    {
      trap: "Treating 'the start of year 2' as a different point from 'the end of year 1'.",
      fix: "They are the same instant. Read timing carefully, because an error there shifts every subsequent factor.",
    },
    {
      trap: "Including depreciation in an NPV calculation.",
      fix: "It is not a cash flow, and the asset's cost is already in the appraisal at T0. Including both double-counts.",
    },
    {
      trap: "Forgetting to bring working capital back in as an inflow.",
      fix: "It is an outflow at the start and is recovered when the project ends.",
    },
    {
      trap: "Using a full annuity factor for a delayed annuity.",
      fix: "Take the annuity factor to the LAST year of the flows and subtract the factor for the years before they begin.",
    },
    {
      trap: "Losing the signs in the IRR interpolation.",
      fix: "The denominator is NPV_L − NPV_H, and subtracting a negative NPV_H makes it larger. Keep the signs throughout.",
    },
    {
      trap: "Ranking mutually exclusive projects by IRR.",
      fix: "A percentage ignores scale. Rank by NPV, which measures absolute wealth added, and note capital rationing as the exception.",
    },
    {
      trap: "Multiplying by the interest rate instead of dividing for a perpetuity.",
      fix: "The perpetuity factor is 1 ÷ r. At 8% that is 12.5, not 8.",
    },
  ],
  keyTerms: [
    { term: "Time value of money", def: "The principle that a sum today is worth more than the same sum later, because it can be invested and because of inflation and risk." },
    { term: "Discount factor", def: "1 ÷ (1 + r)ⁿ, converting a future cash flow to its present value." },
    { term: "Annuity", def: "An equal cash flow arising for a fixed number of consecutive periods." },
    { term: "Perpetuity", def: "An equal cash flow arising indefinitely, valued at cash flow ÷ r when it starts in one year." },
    { term: "Net present value", def: "The sum of the present values of all a project's cash flows; positive means shareholder wealth increases." },
    { term: "Internal rate of return", def: "The discount rate at which a project's NPV is zero — the return the project itself generates." },
    { term: "Linear interpolation", def: "Estimating the IRR between two discount rates whose NPVs have opposite signs, assuming a straight-line relationship." },
    { term: "Capital rationing", def: "A limit on funds available for investment, which can make ranking by NPV per dollar invested relevant." },
  ],
  summary: [
    "Money has a time value because it can be invested, because of inflation and because of risk.",
    "A discount factor is 1 ÷ (1 + r)ⁿ; the T0 cash flow is never discounted.",
    "Annuity factors handle equal flows over a fixed period; a delayed annuity is the factor to the last year less the factor for the years before it starts.",
    "A perpetuity starting in one year is worth cash flow ÷ r.",
    "NPV sums the present values of all cash flows; positive means accept, and it measures the absolute increase in wealth.",
    "Depreciation is excluded and recovered working capital is included in every appraisal.",
    "IRR is the rate at which NPV is zero, estimated by interpolation, and accepted if it exceeds the cost of capital.",
    "NPV is theoretically superior for ranking, because IRR ignores scale, can give multiple answers and assumes reinvestment at the IRR.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a cash flow at time 0 not discounted?", a: "Because time 0 is now, so its present value is its face value — the discount factor is 1. Only future cash flows need converting to present value." },
    { q: "How do you find the present value of an annuity that starts in year 4 and runs to year 8?", a: "Take the annuity factor for the full period to the last year of the flows (8 years) and subtract the annuity factor for the years before they begin (3 years)." },
    { q: "What does a positive NPV tell you?", a: "That the project's returns exceed the cost of capital used to discount them, so it increases shareholder wealth — by the NPV amount, measured in today's dollars." },
    { q: "What is the IRR, and how is it estimated?", a: "The discount rate at which NPV is zero. It is estimated by linear interpolation between two rates whose NPVs have opposite signs — an approximation, because the true relationship is a curve." },
    { q: "Why is NPV preferred to IRR for ranking competing projects?", a: "NPV measures the absolute wealth added, which is what shareholders receive, while IRR is a percentage silent about scale. IRR can also give multiple answers where cash flows change sign repeatedly and assumes reinvestment at the IRR rather than the cost of capital." },
  ],
  furtherStudy: [
    "Investment appraisal with tax, inflation and risk is developed in **FM**, and with real options and complex financing in **AFM**.",
    "The cost of capital itself — how the discount rate is derived — is an **FM** topic.",
  ],
}

/* ── Area D chapter list, in reading order ─────────────────────── */

export const MA_TREE_AREA_D: StudyChapter[] = [
  MA_TREE_16,
  MA_TREE_17,
  MA_TREE_18,
  MA_TREE_19,
  MA_TREE_20,
]


