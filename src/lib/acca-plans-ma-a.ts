/*
 * MA Area A — The nature, source and purpose of management information.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * MA sets 35 objective tests at 2 marks and 3 multi-task questions at 10 marks,
 * and the MTQs sit in budgeting, standard costing and performance measurement —
 * Areas D, E and F. So every plan in Areas A to C is written as a 2-mark OT,
 * because that is the only thing this part of the syllabus is ever asked as.
 *
 * MA is computational, and its distractors are mostly ARITHMETIC: the answer you
 * get from inverting a ratio, from using the wrong denominator, or from stopping
 * one step early. Where that is so, the plan says which wrong answer each option
 * corresponds to, since recognising your own slip is what stops it recurring.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const MA_PLANS_A: ExamPlanMap = {
  /* ── MA-01 · Accounting for management ───────────────────────── */

  "MA-01::purpose": {
    title: "What management accounting information is produced for",
    format: "ot",
    marks: 2,
    requirement:
      "Management accounting information is produced principally to:\n\nA  Meet the requirements of company law and accounting standards\nB  Help managers plan, control and make decisions\nC  Provide shareholders with a statement of financial position\nD  Calculate the company's tax liability",
    plan: [
      {
        step: "Identify the audience, because everything follows from it",
        detail:
          "Management accounting reports INWARD to managers. Financial accounting reports OUTWARD to shareholders, lenders and regulators. Almost every difference between the two is a consequence of who is reading.",
      },
      {
        step: "Name the three uses",
        detail:
          "Planning, control and decision-making. Any option not describing one of those three is answering for the financial accounting side of the syllabus.",
      },
      {
        step: "Sort the options by audience",
        detail:
          "Company law, a statement of financial position and the tax computation are all external requirements. Only B names an internal use.",
      },
      {
        step: "Note the freedom this buys, since it is the follow-on",
        detail:
          "Because the audience is internal, there is no prescribed format, no statutory deadline and no requirement to be historical — which is why management accounts can be forecasts, and why they can be produced weekly.",
      },
    ],
    answer:
      "**B — help managers plan, control and make decisions.**\n\nManagement accounting reports inward. Its three uses are **planning** (setting out what should happen), **control** (comparing what did happen with what should have) and **decision-making** (choosing between courses of action).\n\nEverything else about it follows from that internal audience: no prescribed format, no statutory deadline, no requirement to be historical, and no external audit. Company law, the statement of financial position and the tax computation all belong to financial accounting, which reports outward and is regulated because outsiders cannot verify it.",
    earns: ["Deriving the differences from who reads the information"],
    loses: ["Choosing an external requirement, which is what financial accounting exists for"],
  },

  "MA-01::financial-vs-management": {
    title: "Telling the two accounting systems apart on a specific feature",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following statements about management accounts is correct?\n\nA  They must be prepared in a format prescribed by accounting standards\nB  They may include forecasts of future results\nC  They must be audited before use\nD  They must be prepared annually",
    plan: [
      {
        step: "Build the comparison as a table before reading the options",
        detail:
          "Users, regulation, format, timing, time focus, audit. Financial: external, regulated, prescribed, annual, historical, audited. Management: internal, unregulated, any format, any frequency, forward and backward, unaudited.",
      },
      {
        step: "Read each option against the management column",
        detail:
          "Prescribed format, mandatory audit and annual preparation are all financial accounting requirements. Three of the four options are drawn straight from the other column.",
      },
      {
        step: "Confirm the survivor against the time-focus row",
        detail:
          "Management accounts may be forward-looking, and typically are — budgets, forecasts and projections are management accounting outputs, which is impossible in a system reporting what has already happened.",
      },
      {
        step: "Watch the word \"may\" against \"must\"",
        detail:
          "Three options say MUST and describe requirements that do not exist. The correct one says MAY, describing a freedom. On this comparison, that pattern holds more often than not.",
      },
    ],
    answer:
      "**B — they may include forecasts of future results.**\n\nManagement accounts are unregulated and internal, so they can take any format, be produced at any frequency, and cover the future as well as the past. Budgets and forecasts are management accounting outputs and could not exist in a system limited to what has already happened.\n\nA prescribed format, mandatory audit and annual preparation are all **financial** accounting requirements, imposed because external users cannot verify what they are given. Note the grammar too: the three wrong options assert a requirement that does not exist, while the right one describes a freedom.",
    earns: ["Holding the full comparison table so a wrong-column option is recognised instantly"],
    loses: ["Assuming management accounts must be audited because they are prepared by accountants"],
  },

  "MA-01::levels-of-planning": {
    title: "Placing a decision at the right planning level",
    format: "ot",
    marks: 2,
    requirement:
      "Deciding the quantity of raw material to order this week is a decision at which planning level?\n\nA  Strategic\nB  Tactical\nC  Operational\nD  Corporate",
    plan: [
      {
        step: "Set the three levels against horizon, scope and information",
        detail:
          "Strategic: long term, whole organisation, largely external information. Tactical: medium term, departmental, mixed internal and external. Operational: short term, task level, detailed internal information.",
      },
      {
        step: "Read the decision's horizon",
        detail:
          "\"This week\" settles it before anything else is considered. A decision measured in days is operational whatever it concerns and whoever takes it.",
      },
      {
        step: "Check the information the decision needs",
        detail:
          "Current inventory levels, this week's production schedule, reorder levels — all detailed, internal and immediate, which is the operational information profile.",
      },
      {
        step: "Strike the option that is not a level",
        detail:
          "Corporate is not one of the three planning levels. As in BT, an option imported from adjacent vocabulary is a free elimination.",
      },
    ],
    answer:
      "**C — operational.**\n\nThe three levels are **strategic** (long term, whole organisation, mainly external information), **tactical** (medium term, departmental, mixed) and **operational** (short term, task level, detailed internal information).\n\nA weekly ordering decision is measured in days, uses detailed internal data — current inventory, this week's schedule, reorder levels — and concerns one task. All three tests agree. \"Corporate\" is not a level of the model.\n\nThe practical point is that the level determines what information is needed: strategic decisions cannot be made from operational detail, and operational ones cannot be made from summaries.",
    earns: ["Using horizon, scope and information type as three converging tests"],
    loses: ["Classifying by who takes the decision rather than by its horizon"],
  },

  "MA-01::data-and-information": {
    title: "The qualities that make information good",
    format: "ot",
    marks: 2,
    requirement:
      "A production report is accurate to four decimal places but reaches the manager three weeks after the period it covers. Which quality of good information is most clearly lacking?\n\nA  Accuracy\nB  Timeliness\nC  Relevance\nD  Completeness",
    plan: [
      {
        step: "Recall the qualities, commonly remembered as ACCURATE",
        detail:
          "Accurate, Complete, Cost-beneficial, User-targeted, Relevant, Authoritative, Timely, Easy to use. The mnemonic matters only because it stops a quality being forgotten.",
      },
      {
        step: "Read the stem for what it grants and what it withholds",
        detail:
          "It explicitly grants accuracy — four decimal places — and states a three-week delay. The question is constructed so that the strongest quality is present and the failing one is separate.",
      },
      {
        step: "Match the delay to its quality",
        detail:
          "Information arriving after the moment it could have been acted on has failed on timeliness, whatever else is true of it.",
      },
      {
        step: "Note the trade-off, which is the follow-on point",
        detail:
          "Accuracy and timeliness pull against each other: more precision takes longer. For control purposes an approximate figure today beats an exact one next month, and four decimal places is itself a sign of misplaced effort.",
      },
    ],
    answer:
      "**B — timeliness.**\n\nInformation must arrive while it can still be acted on. A report covering a period that closed three weeks ago cannot influence anything in that period, so its accuracy is wasted.\n\nThe stem grants accuracy outright, which is what makes the question about the trade-off between the two: precision takes time, and for control purposes an approximate figure available today beats an exact one available next month. Four decimal places on a production report is itself a sign that effort has gone into the wrong quality.",
    earns: ["Reading what the stem concedes as well as what it complains of"],
    loses: ["Choosing accuracy because the excessive decimal places look like the defect"],
  },

  "MA-01::limitations": {
    title: "Recognising a genuine limitation of management information",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a limitation of management accounting information?\n\nA  It is prepared for internal users\nB  It may rely on estimates and assumptions that later prove wrong\nC  It can be produced more frequently than annually\nD  It is not required to follow a prescribed format",
    plan: [
      {
        step: "Separate limitations from features",
        detail:
          "Three of these options describe management accounting's characteristic freedoms. A freedom is only a limitation if it produces a disadvantage, and the option has to state the disadvantage.",
      },
      {
        step: "Recall the genuine limitations",
        detail:
          "Reliance on estimates and forecasts that may prove wrong; the cost of producing it; the risk of information overload; unaudited and so unverified; and being historical where it looks backward.",
      },
      {
        step: "Test each option for a stated disadvantage",
        detail:
          "Internal preparation, frequent production and format freedom are all stated as neutral facts, and each is an advantage. Only B names something that can go wrong.",
      },
      {
        step: "Say why the limitation is unavoidable",
        detail:
          "Forward-looking information must rest on assumptions, and assumptions can be wrong. It is the price of usefulness — the alternative is information that is certain and too late.",
      },
    ],
    answer:
      "**B — it may rely on estimates and assumptions that later prove wrong.**\n\nThe genuine limitations are reliance on estimates and forecasts, the cost of production, the risk of overload, and the absence of any audit to verify it.\n\nThe estimate problem is unavoidable rather than a defect of practice: information about the future must rest on assumptions, and assumptions can be wrong. That is the price of usefulness — certainty is only available about the past, by which time it is too late to act.\n\nA, C and D describe management accounting's freedoms, each stated neutrally and each an advantage.",
    earns: ["Requiring the option to name a disadvantage, not merely a characteristic"],
    loses: ["Reading \"not required to follow a prescribed format\" as a weakness"],
  },

  /* ── MA-02 · Sources of data ─────────────────────────────────── */

  "MA-02::three-sources": {
    title: "Classifying a source as primary or secondary",
    format: "ot",
    marks: 2,
    requirement:
      "A company uses government statistics on industry output to estimate the size of its market. In relation to this company, that data is:\n\nA  Primary and internal\nB  Primary and external\nC  Secondary and internal\nD  Secondary and external",
    plan: [
      {
        step: "Take the two classifications separately",
        detail:
          "Internal or external asks where the data originated. Primary or secondary asks whether it was gathered for THIS purpose or already existed for another. Resolving both at once is what causes errors.",
      },
      {
        step: "Settle origin first",
        detail:
          "Government statistics originate outside the company, so external. Nothing about the company using them makes them internal.",
      },
      {
        step: "Settle purpose second",
        detail:
          "The statistics were collected by government for its own purposes and are being reused. Data gathered for someone else's purpose is secondary by definition.",
      },
      {
        step: "Compare with the primary version of the same question",
        detail:
          "Had the company commissioned its own market survey, that would be primary and external. Recognising that pair keeps the two axes from collapsing into one.",
      },
    ],
    answer:
      "**D — secondary and external.**\n\nThe two axes are independent. **External** because the data originates outside the company. **Secondary** because it was collected by government for its own purposes and is being reused, rather than gathered to answer this question.\n\nThe contrast that fixes it: a market survey the company commissions itself would be **primary and external** — same origin, different purpose. Its own sales records would be internal and, for most uses, secondary, since they were created to record transactions rather than to answer the question being asked of them.",
    earns: ["Resolving origin and purpose as two separate questions"],
    loses: ["Calling it primary because the company is using it directly"],
  },

  "MA-02::internal-external": {
    title: "Identifying an internal source of cost data",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an **internal** source of data for calculating the cost of a product?\n\nA  A supplier's published price list\nB  Timesheets completed by production staff\nC  A trade association's industry cost survey\nD  Published inflation statistics",
    plan: [
      {
        step: "Apply the origin test to every option",
        detail:
          "Ask who created the record. If the organisation's own systems and people produced it, it is internal; if it came from outside, external, however routinely it is used.",
      },
      {
        step: "Recall the internal sources for costing",
        detail:
          "Timesheets and job cards for labour, materials requisitions and goods received notes for materials, the payroll for wage rates, and the nominal ledger for overheads.",
      },
      {
        step: "Note that a supplier price list is external even though it is essential",
        detail:
          "It is created by the supplier. Being indispensable to the costing does not make a document internal — origin is the only classifier.",
      },
      {
        step: "Confirm the survivor",
        detail:
          "Timesheets are completed by the organisation's own staff on its own forms, so they are internal, and they are the principal internal source of direct labour data.",
      },
    ],
    answer:
      "**B — timesheets completed by production staff.**\n\nInternal sources are records the organisation's own systems and people create: timesheets and job cards for labour, materials requisitions and goods received notes for materials, the payroll for rates, and the nominal ledger for overheads.\n\nA supplier's price list is created by the supplier and is external, however essential it is to the costing. Trade association surveys and inflation statistics are external too. Origin is the only classifier — how heavily the organisation depends on a source has no bearing on it.",
    earns: ["Classifying strictly on who created the record"],
    loses: ["Treating a supplier price list as internal because it is used in the organisation's own costing"],
  },

  "MA-02::economic-environment": {
    title: "How an external economic factor reaches the cost figures",
    format: "ot",
    marks: 2,
    requirement:
      "A rise in the general rate of inflation is most likely to affect a company's standard costs by:\n\nA  Making the standard material price out of date\nB  Changing the number of units produced\nC  Altering the method of overhead absorption\nD  Changing the classification of costs as direct or indirect",
    plan: [
      {
        step: "Ask what inflation actually changes",
        detail:
          "Prices. It changes what a given quantity of a resource costs, and leaves quantities, methods and classifications untouched.",
      },
      {
        step: "Split a standard cost into its two halves",
        detail:
          "Every standard is a quantity times a price. Inflation acts on the price half only, so the standard price becomes out of date while the standard usage remains valid.",
      },
      {
        step: "Test the remaining options against that",
        detail:
          "Output volume is driven by demand and capacity. The absorption method is an accounting policy choice. Direct or indirect classification depends on traceability. None of the three is a price.",
      },
      {
        step: "Name the consequence, since it recurs in Area E",
        detail:
          "Out-of-date standard prices produce persistent adverse material price variances that reflect the standard being stale rather than any failure of purchasing — which is why standards must be reviewed.",
      },
    ],
    answer:
      "**A — making the standard material price out of date.**\n\nA standard cost is a **quantity × a price**. Inflation acts on the price half, leaving the standard usage valid and the standard price stale.\n\nThe consequence matters more than the classification and reappears in Area E: an out-of-date standard price produces persistent **adverse material price variances** that reflect the age of the standard rather than any failure of purchasing. Investigating the buyer would be investigating the wrong thing, which is why standards must be reviewed as conditions change.\n\nOutput volume follows demand and capacity, the absorption method is a policy choice, and direct or indirect classification depends on traceability.",
    earns: [
      "Splitting the standard into quantity and price and asking which half moved",
      "Naming the variance the staleness would produce",
    ],
    loses: ["Choosing an option that describes an accounting policy rather than a price"],
  },

  /* ── MA-03 · Cost classification and cost behaviour ──────────── */

  "MA-03::production-nonproduction": {
    title: "Sorting production cost from non-production cost",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a **non-production** cost?\n\nA  Factory supervisor's salary\nB  Depreciation of production machinery\nC  Sales commission paid to representatives\nD  Indirect materials used in the factory",
    plan: [
      {
        step: "Draw the line at the factory door",
        detail:
          "Production costs are incurred in making the product: direct materials, direct labour, direct expenses and production overhead. Everything else — selling, distribution, administration and finance — is non-production.",
      },
      {
        step: "Notice that production cost includes overhead",
        detail:
          "The distractors are all production OVERHEAD, not direct cost. A supervisor's salary, machinery depreciation and indirect materials are indirect but still incurred inside production.",
      },
      {
        step: "Locate the survivor outside the factory",
        detail:
          "Sales commission is incurred to sell the product, after it exists. That places it in selling costs, which is non-production.",
      },
      {
        step: "Note why the split matters",
        detail:
          "Production costs attach to the product and can sit in inventory; non-production costs are written off in the period. That is the whole reason the classification is examinable.",
      },
    ],
    answer:
      "**C — sales commission paid to representatives.**\n\nThe line is drawn at the factory: production cost covers direct materials, direct labour, direct expenses and **production overhead**. Selling, distribution, administration and finance costs are all non-production.\n\nA, B and D are all production overhead — indirect, but incurred inside production, which is exactly why they are offered. Sales commission is incurred to sell a product that already exists.\n\nThe split matters because production costs attach to the product and can be carried in inventory, while non-production costs are written off in the period they arise.",
    earns: [
      "Remembering that production cost includes overhead, not only direct cost",
      "Knowing the inventory consequence, which is what makes the split examinable",
    ],
    loses: ["Equating production cost with direct cost, which puts three options in the wrong category"],
  },

  "MA-03::direct-indirect": {
    title: "Whether a cost is direct depends on the cost object",
    format: "ot",
    marks: 2,
    requirement:
      "The salary of a supervisor who oversees one production department is:\n\nA  A direct cost of the department and a direct cost of each unit produced\nB  A direct cost of the department but an indirect cost of each unit produced\nC  An indirect cost of the department and an indirect cost of each unit\nD  A direct cost of each unit but an indirect cost of the department",
    plan: [
      {
        step: "State the rule as a relationship, not a property",
        detail:
          "A cost is direct if it can be traced in full to the cost object under consideration. Change the object and the same cost can change classification, which is precisely what this question tests.",
      },
      {
        step: "Take each cost object in turn",
        detail:
          "Against the DEPARTMENT: the supervisor works only for it, so the whole salary traces there — direct. Against a UNIT of output: the salary does not vary with, and cannot be traced to, any individual unit — indirect.",
      },
      {
        step: "Combine into the answer before reading the options",
        detail:
          "Direct to the department, indirect to the unit. Deriving it first prevents the option list from suggesting a combination.",
      },
      {
        step: "Recognise the trap in options A and C",
        detail:
          "Each applies one classification to both objects. They are the answers of a candidate treating direct and indirect as a fixed property of the cost itself.",
      },
    ],
    answer:
      "**B — a direct cost of the department but an indirect cost of each unit produced.**\n\nDirect and indirect are not properties of a cost — they describe its relationship to a chosen **cost object**. The same cost changes classification when the object changes.\n\nAgainst the department, the supervisor works for it alone and the entire salary traces there, so it is direct. Against a unit of output, the salary cannot be traced to any individual unit and does not vary with them, so it is indirect and must be absorbed as overhead.\n\nA and C apply one classification to both objects, which is the answer of anyone treating the label as fixed.",
    earns: ["Naming the cost object before classifying, every time"],
    loses: ["Treating direct and indirect as a permanent property of the cost"],
  },

  "MA-03::cost-behaviour": {
    title: "Identifying a stepped fixed cost from its pattern",
    format: "ot",
    marks: 2,
    requirement:
      "A company rents one machine for every 5,000 units of monthly output. Each machine costs $2,000 per month. This cost is best described as:\n\nA  Variable\nB  Fixed\nC  Semi-variable\nD  Stepped fixed",
    plan: [
      {
        step: "Recall the four behaviours",
        detail:
          "Variable: changes in proportion to activity. Fixed: constant over the relevant range. Semi-variable: a fixed element plus a variable element. Stepped fixed: constant over a band, then jumping to a new constant level.",
      },
      {
        step: "Test the cost at two output levels",
        detail:
          "At 4,000 units one machine costs $2,000. At 6,000 units two machines cost $4,000. The cost did not rise proportionally — it jumped at a threshold and is flat between thresholds.",
      },
      {
        step: "Rule out variable using the proportionality test",
        detail:
          "Output rose 50% from 4,000 to 6,000 and cost rose 100%. Variable costs move in proportion, so the pattern is not variable however much it changes with volume.",
      },
      {
        step: "Rule out semi-variable on structure",
        detail:
          "Semi-variable is a constant plus a per-unit amount and produces a smooth sloping line. This produces a staircase, which is a different shape entirely.",
      },
    ],
    answer:
      "**D — stepped fixed.**\n\nThe cost is constant within a band of output and jumps to a new constant level at a threshold. At 4,000 units it is $2,000; at 6,000 units it is $4,000; at 5,001 units it has already jumped.\n\nIt is not **variable**, because the change is not proportional — output rising 50% doubled the cost. It is not **semi-variable**, which is a fixed amount plus a per-unit amount and plots as a smooth sloping line rather than a staircase.\n\nSupervision, rented machinery and warehouse space are the standard examples, and the practical point is that output pushed just past a step carries a full step's cost.",
    earns: ["Testing the cost at two output levels rather than judging the pattern by feel"],
    loses: ["Calling it variable because the cost rises as output rises"],
  },

  "MA-03::objects-centres-units": {
    title: "Distinguishing a cost centre from a profit or investment centre",
    format: "ot",
    marks: 2,
    requirement:
      "A divisional manager is accountable for revenues, costs and the level of capital investment in the division. The division is:\n\nA  A cost centre\nB  A revenue centre\nC  A profit centre\nD  An investment centre",
    plan: [
      {
        step: "Order the centres by what the manager controls",
        detail:
          "Cost centre: costs only. Revenue centre: revenues only. Profit centre: both, so profit. Investment centre: profit AND the capital employed. Each level adds one responsibility to the one before.",
      },
      {
        step: "Read the stem's list and count the responsibilities",
        detail:
          "Revenues, costs and capital investment — three things, which is the full set. The stem is effectively reciting the definition of the top level.",
      },
      {
        step: "Identify the word that separates the top two",
        detail:
          "Capital investment. Without it the answer would be profit centre, and the entire question turns on that one clause.",
      },
      {
        step: "Connect it to the right performance measure",
        detail:
          "Investment centres are measured by return on investment or residual income, because a profit figure alone says nothing about the capital used to earn it. This is the follow-on question in Area F.",
      },
    ],
    answer:
      "**D — an investment centre.**\n\nThe hierarchy runs by what the manager controls: **cost centre** (costs), **revenue centre** (revenues), **profit centre** (both, hence profit) and **investment centre** (profit plus the capital employed).\n\nThe stem lists all three responsibilities, and the deciding clause is capital investment — without it the answer is profit centre.\n\nThe classification determines the measure, which is why it matters. An investment centre is assessed on **return on investment** or **residual income**, because profit alone says nothing about the capital used to generate it. That reappears directly in Area F.",
    earns: ["Counting the responsibilities the stem grants rather than judging the division's size"],
    loses: ["Answering profit centre by overlooking the capital investment clause"],
  },

  /* ── MA-04 · Presenting information ──────────────────────────── */

  "MA-04::reports": {
    title: "What a management report must do to be usable",
    format: "ot",
    marks: 2,
    requirement:
      "A monthly cost report is sent to every departmental manager showing all costs for the whole organisation in full detail. The main weakness of this report is that it:\n\nA  Is produced too frequently\nB  Is not user-targeted, so each manager must search for what concerns them\nC  Contains inaccurate figures\nD  Uses the wrong basis of cost classification",
    plan: [
      {
        step: "Read what the stem actually asserts",
        detail:
          "Everyone receives everything, in full detail. Nothing is said about accuracy, frequency or classification, so options resting on those are assumptions rather than conclusions.",
      },
      {
        step: "Match the described fault to a quality of good information",
        detail:
          "The failure is that the report is not targeted at its user. Each manager has to extract the small part that concerns them from a document mostly about other people.",
      },
      {
        step: "Name the consequence, since it is what makes it a weakness",
        detail:
          "Information overload. A report that is too large to read is not read, so the control it was supposed to enable does not happen.",
      },
      {
        step: "Recall the standard remedy",
        detail:
          "Responsibility reporting — each manager sees the costs they control — combined with exception reporting, which shows only significant variances. Both reappear in Area F.",
      },
    ],
    answer:
      "**B — it is not user-targeted, so each manager must search for what concerns them.**\n\nInformation must be targeted at its user. A report containing everything for everybody forces each reader to extract the fraction that concerns them, and the predictable result is **information overload** — a report too large to read is not read, and the control it was meant to enable never happens.\n\nThe remedies are **responsibility reporting**, where each manager sees only the costs they control, and **exception reporting**, which shows only variances large enough to act on. Both return in Area F.\n\nNothing in the stem supports the claims about accuracy, frequency or classification.",
    earns: ["Answering only from what the stem establishes"],
    loses: ["Choosing accuracy or frequency, neither of which the stem mentions"],
  },

  "MA-04::choosing-a-chart": {
    title: "Choosing the chart the data and the question require",
    format: "ot",
    marks: 2,
    requirement:
      "A manager wants to show how total production cost has changed over the last twelve months. The most appropriate chart is:\n\nA  A pie chart\nB  A line graph\nC  A scatter diagram\nD  A component bar chart of one month's costs",
    plan: [
      {
        step: "Identify what the chart must show",
        detail:
          "One measure, tracked over time. Change across a sequence of periods, which is a different job from comparing parts of a whole or from testing a relationship.",
      },
      {
        step: "Match each chart type to its job",
        detail:
          "Line graph: a value over time. Pie chart: parts of one whole at one moment. Scatter diagram: the relationship between two variables. Component bar chart: composition, compared across categories.",
      },
      {
        step: "Reject the charts that lose the time dimension",
        detail:
          "A pie chart shows one point in time and cannot express a trend. A component bar chart of a single month does the same. Both answer a question that was not asked.",
      },
      {
        step: "Separate a scatter diagram from a line graph carefully",
        detail:
          "A scatter diagram plots two variables to test a relationship, as in the high/low and regression work later. Time on one axis with a single measure on the other is a line graph.",
      },
    ],
    answer:
      "**B — a line graph.**\n\nA line graph shows one measure over a sequence of periods, so the trend, the turning points and the volatility are all visible at once. That is exactly the question asked.\n\nA **pie chart** shows the composition of one whole at one moment and cannot express a trend. A **component bar chart of one month** has the same limitation. A **scatter diagram** plots two variables against each other to test whether a relationship exists — its role in MA is in cost separation, not in showing a series over time.\n\nThe general rule is to choose from the question, not from the data.",
    earns: ["Choosing from the question being answered rather than from the shape of the data"],
    loses: ["Selecting the scatter diagram because the data is numerical and paired with periods"],
  },

  "MA-04::interpretation": {
    title: "Reading what a chart does and does not establish",
    format: "ot",
    marks: 2,
    requirement:
      "A scatter diagram of monthly advertising spend against monthly sales shows the points lying close to an upward-sloping straight line. This shows that:\n\nA  Advertising causes sales to rise\nB  There is strong positive correlation between the two variables\nC  Sales would be zero if advertising were zero\nD  Advertising is the only factor affecting sales",
    plan: [
      {
        step: "State what a scatter diagram measures",
        detail:
          "Whether two variables move together, and how tightly. Points close to an upward line means strong positive correlation, and that is the whole of what the picture establishes.",
      },
      {
        step: "Refuse the causal reading",
        detail:
          "Correlation is not causation. Both variables may respond to a third — a growing market lifts sales and funds more advertising — or the causation may run the other way, with high sales financing high advertising budgets.",
      },
      {
        step: "Reject the extrapolation",
        detail:
          "C reads the line beyond the observed data. The relationship is only evidenced within the range observed, and behaviour outside it is unknown.",
      },
      {
        step: "Reject the exclusivity claim",
        detail:
          "D says advertising is the ONLY factor. Strong correlation is entirely consistent with many other influences, and no scatter diagram can rule them out.",
      },
    ],
    answer:
      "**B — there is strong positive correlation between the two variables.**\n\nThat is precisely what the picture shows: the two move together, and tightly. Everything else offered goes beyond the evidence.\n\n**Correlation is not causation.** Both variables may be driven by a third, such as a growing market that both lifts sales and funds larger advertising budgets, or the causation may run backwards — strong sales financing more advertising.\n\nC extrapolates outside the observed range, where the relationship is untested. D claims exclusivity, which correlation of any strength cannot establish.",
    earns: [
      "Stating exactly what correlation establishes and refusing to extend it",
      "Naming a plausible third variable rather than merely asserting the caution",
    ],
    loses: ["Reading a strong relationship as proof that one variable causes the other"],
  },
}
