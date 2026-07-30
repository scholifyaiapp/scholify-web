import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area A — The nature, source and purpose of management information.
 * Chapters 1–4 of the MA reading tree, mapped to syllabus groups A1–A4.
 *
 * MA differs from BT in kind, not just in content: it is a COMPUTATIONAL paper.
 * Where BT's chapters lean on discussion and named models, these lean on formula
 * blocks and worked-example steppers, because a learner who has read about
 * high/low analysis and never performed it cannot do the exam.
 *
 * Structure follows the official ACCA MA/FMA study guide. All wording is ORIGINAL
 * Scholify teaching text — the approved-provider texts were used only as a
 * benchmark for structure and depth, never as a source of prose.
 */

/* ── Chapter 1 · A1 ────────────────────────────────────────────── */

export const MA_TREE_01: StudyChapter = {
  id: "MA-01",
  number: 1,
  paper: "MA",
  area: "A",
  title: "Accounting for management",
  minutes: 15,
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)", "A1(d)", "A1(e)", "A1(f)", "A1(g)"],
  intro:
    "Management accounting exists to help someone decide something. That sentence explains every difference between it and financial accounting, and it is why this paper spends its time on techniques rather than on rules.",
  outcomes: [
    "State the purpose and role of cost accounting and management accounting within a business",
    "Compare financial accounting with cost and management accounting on the points that get examined",
    "Say what a manager is doing when they plan, when they decide and when they control",
    "Distinguish strategic, tactical and operational planning and the information each needs",
    "Distinguish data from information, and list the attributes of good information",
    "Explain the limitations of management information",
  ],
  sections: [
    {
      id: "purpose",
      heading: "What management accounting is for",
      blocks: [
        {
          kind: "definition",
          term: "Management accounting",
          md: "The preparation and use of financial and non-financial information to help managers **plan**, **decide** and **control**. Its defining feature is that it is produced for someone **inside** the business who is about to take an action.",
        },
        {
          kind: "definition",
          term: "Cost accounting",
          md: "The part of management accounting concerned with establishing what things **cost** — a product, a service, a department, an activity — and with valuing inventory. Cost accounting supplies much of the raw material management accounting then uses.",
        },
        {
          kind: "text",
          md: "Managers need three quite different things from the numbers, and the whole syllabus is organised around them.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "Planning, decision-making and control",
            caption: "A loop, not a sequence: what control reveals feeds the next plan.",
            data: {
              steps: [
                { label: "Set objectives" },
                { label: "Plan — budgets and targets" },
                { label: "Decide — choose between options" },
                { label: "Act" },
                { label: "Measure actual results" },
                { label: "Compare and correct" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "number",
          title: "The three managerial processes, and where each is taught",
          items: [
            "**Planning** — deciding objectives and how resources will be used to reach them. Budgeting is planning expressed in numbers (Area D).",
            "**Decision-making** — choosing between alternatives, which needs the cost of each option and specifically the costs that would actually change (Area C, and relevant cash flows in Area D).",
            "**Control** — comparing what happened with what was planned, and acting on the gap. Variance analysis is control expressed in numbers (Area E), and performance measurement extends it beyond cost (Area F).",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this framing is worth holding on to",
          md: "Every technique in MA answers one of those three questions. When a scenario asks what a manager should do, identify whether they are **planning**, **deciding** or **controlling** first — the technique follows from that, and it is how you avoid running a variance calculation on a decision problem.",
        },
      ],
      check: {
        q: "A production manager compares last month's actual material cost with the budget for the volume actually produced, and investigates the difference. Which managerial process is this?",
        options: ["Planning", "Decision-making", "Control", "Cost classification"],
        correct: 2,
        explain:
          "Comparing actual results with what was planned and acting on the difference is CONTROL — and specifically the flexed-budget comparison that Area D and Area E develop. Planning would be setting the budget in the first place; decision-making would be choosing between alternatives, such as whether to switch supplier.",
      },
    },
    {
      id: "financial-vs-management",
      heading: "Financial accounting compared with cost and management accounting",
      blocks: [
        {
          kind: "table",
          caption: "The comparison examiners return to most often",
          head: ["", "Financial accounting", "Cost and management accounting"],
          rows: [
            ["Prepared for", "External users — shareholders, lenders, tax authorities", "Internal managers"],
            ["Purpose", "Stewardship: reporting on what was done with the resources", "Planning, decision-making and control"],
            ["Legal status", "Required by law for most entities", "Entirely optional — it exists because it is useful"],
            ["Format", "Prescribed by accounting standards and law", "Whatever the manager needs"],
            ["Time focus", "Historic", "Historic **and** forward-looking — forecasts, budgets, projections"],
            ["Frequency", "Annual, with interim reporting for listed entities", "Continuous: daily, weekly, monthly as required"],
            ["Level of detail", "The whole entity", "Any level — a product, a machine, a customer, a shift"],
            ["Precision", "Accurate and auditable", "Relevance and speed outrank precision"],
            ["Content", "Financial only", "Financial **and non-financial** — units, hours, defect rates, complaints"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two rows candidates most often get wrong",
          md: "**Management accounting is not legally required.** No statute compels a business to prepare a budget or a variance report.\n\n**Management accounting includes NON-FINANCIAL information.** Units produced, labour hours, machine downtime, customer complaints and defect rates all belong to it — which is why Area F measures performance on much more than profit.",
        },
        {
          kind: "illustration",
          title: "The same month, two reports",
          md: "A bakery's **financial** accounts will eventually report revenue, cost of sales and profit for the year, in a format any bank or tax authority will recognise.\n\nIts **management** accounts this morning show that oven 2 produced 240 fewer loaves per shift than oven 1 last week, that yesterday's flour delivery was 4% over the standard price, and that wastage on the sourdough line is running at 6% against a 3% standard.\n\nOnly the second set can be acted on today, and none of it would appear in the financial statements. That is the distinction in practice.",
        },
      ],
    },
    {
      id: "levels-of-planning",
      heading: "Strategic, tactical and operational",
      blocks: [
        {
          kind: "definition",
          term: "The three planning levels",
          md: "**Strategic** planning sets long-term direction for the whole organisation. **Tactical** planning turns that direction into medium-term plans and resource allocations. **Operational** planning covers day-to-day execution and immediate control.",
        },
        {
          kind: "table",
          caption: "What each level decides, and what information it needs",
          head: ["Level", "Typical decision", "Information: source, detail, horizon, certainty"],
          rows: [
            ["**Strategic**", "Whether to open a second factory; which markets to enter", "Largely **external**, highly **summarised**, long horizon, **high uncertainty**"],
            ["**Tactical**", "Next year's departmental budgets; staffing levels; pricing policy", "Mixed internal and external, moderately detailed, medium horizon"],
            ["**Operational**", "Today's production schedule; whether to authorise overtime tonight", "**Internal**, highly **detailed**, immediate, **near-certain**"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How this is examined",
          md: "You will be given a decision and asked to classify it, or given a level and asked what information it needs. The reliable test is the **horizon** and the **source**: long and external is strategic, immediate and internal is operational. Note that the level is set by the DECISION, not by the seniority of whoever happens to take it.",
        },
      ],
    },
    {
      id: "data-and-information",
      heading: "Data, information, and what makes information good",
      blocks: [
        {
          kind: "definition",
          term: "Data and information",
          md: "**Data** are raw, unprocessed facts — a list of 4,000 invoice values. **Information** is data that has been **processed** so that it means something to someone and can change what they do. Data becomes information only in the hands of a specific user with a specific question.",
        },
        {
          kind: "definition",
          term: "The attributes of good information — ACCURATE",
          md: "**A**ccurate · **C**omplete · **C**ost-effective (worth more than it costs to produce) · **U**nderstandable to its user · **R**elevant to the decision · **A**ccessible to whoever needs it · **T**imely · **E**asy to use. A single memorable list, and each attribute is examinable on its own.",
        },
        {
          kind: "table",
          caption: "What each attribute means in practice, and how it fails",
          head: ["Attribute", "Means", "A typical failure"],
          rows: [
            ["Accurate", "Correct to the degree the decision requires", "Reported to the nearest cent when the decision turns on thousands"],
            ["Complete", "Everything the user needs to act", "A cost report omitting the overheads the decision would change"],
            ["Cost-effective", "The benefit exceeds the cost of producing it", "A weekly analysis nobody reads, costing two days of an analyst's time"],
            ["Understandable", "Expressed in terms the user knows", "A regression output sent to a production supervisor with no explanation"],
            ["Relevant", "Bears on the decision at hand", "Last year's figures when the question is about next quarter"],
            ["Accessible", "Reaches the right person by the right route", "Held in a system the decision-maker cannot open"],
            ["Timely", "Arrives while the decision can still be influenced", "Month-end variances issued six weeks later"],
            ["Easy to use", "Presented so the point can be found", "A 40-page appendix with no summary"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Accuracy and timeliness pull against each other",
          md: "A more accurate figure usually takes longer to produce. Management accounting deliberately resolves that trade-off in favour of **timeliness**, because a good-enough number today can change a decision and a perfect one next month cannot. Financial accounting resolves it the other way. Saying so explicitly earns the mark.",
        },
        {
          kind: "activity",
          title: "Activity 1 — diagnose the report",
          prompt:
            "A regional manager receives, on the 28th of the following month, a report listing every one of the 1,840 transactions in her region in reference-number order, showing value only. It contains no totals, no comparison with budget, and no margin figures.\n\nName four attributes of good information this report fails, and say what would fix each.",
          answer:
            "**Timely** — it arrives on the 28th, so nearly a month has passed and the period it describes can no longer be influenced. *Fix:* report within a few working days of period end, even if some figures are estimated.\n\n**Relevant** — it shows value only, when what bears on her decisions is margin and variance against budget. *Fix:* add budget comparison and margin by customer or product.\n\n**Easy to use** (and arguably **understandable**) — 1,840 unsorted lines with no totals means the point cannot be found. *Fix:* summarise, and use exception reporting so only items outside expected limits appear.\n\n**Complete** — it omits margin entirely, so a customer whose volume is rising on loss-making terms reads as good news. *Fix:* include the dimension the decision actually turns on.\n\n**Note what the report is not:** inaccurate. Every figure in it may be correct to the penny. That is the point of the ACCURATE list — accuracy alone does not make information useful, and a report can fail on four attributes while being entirely true.",
        },
      ],
      check: {
        q: "A management report is completely accurate but reaches the decision-maker three weeks after the decision had to be taken. Which attribute of good information does it primarily fail?",
        options: ["Accuracy", "Timeliness", "Completeness", "Cost-effectiveness"],
        correct: 1,
        explain:
          "It fails TIMELINESS: information must arrive while the decision can still be influenced. This is the standard trade-off in management accounting — accuracy takes time, and a good-enough figure available today is worth more than a perfect one available too late. Accuracy is precisely what the report does have.",
      },
    },
    {
      id: "limitations",
      heading: "The limitations of management information",
      blocks: [
        {
          kind: "list",
          title: "Where management information falls short",
          items: [
            "**It relies on estimates and assumptions** — absorption rates, forecast volumes and standard costs are all judgements, and an output is only as sound as the assumptions behind it.",
            "**It is historic in part** — the past is a guide to the future only while conditions hold.",
            "**It costs money** to collect, process and present, and beyond a point the cost exceeds the benefit.",
            "**It can be manipulated** by whoever prepares it, especially where a bonus depends on the result.",
            "**It may exclude what is hardest to measure** — staff morale, brand strength, customer goodwill — and so quietly direct attention away from things that matter.",
            "**It can be misinterpreted** by a user who does not understand how it was produced.",
            "**Non-financial factors** — legal, ethical, reputational — may outweigh the numbers entirely, and the report will not say so.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The habit this should build",
          md: "Every calculation in this paper rests on assumptions. When you present a figure, be ready to say **what would have to be true** for it to hold — and in a written or MTQ answer, stating the key assumption is frequently worth a mark in itself.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Saying management accounting is legally required.",
      fix: "It is entirely optional and exists because it is useful. Financial accounting is the legally required one, in a prescribed format.",
    },
    {
      trap: "Treating management accounting as financial information only.",
      fix: "It includes non-financial information — units, hours, defect rates, complaints — which is why Area F measures far more than profit.",
    },
    {
      trap: "Classifying a decision by the seniority of who takes it rather than by the decision itself.",
      fix: "Strategic, tactical and operational are defined by horizon, source and detail of the information the DECISION needs.",
    },
    {
      trap: "Confusing data with information.",
      fix: "Data are raw facts; information is data processed so that a specific user can act on it. A complete, accurate transaction listing is still data.",
    },
    {
      trap: "Assuming more accurate always means better.",
      fix: "Accuracy trades against timeliness, and management accounting favours timeliness. It must also be cost-effective — information nobody reads fails whatever its precision.",
    },
  ],
  keyTerms: [
    { term: "Management accounting", def: "The preparation and use of financial and non-financial information to help internal managers plan, decide and control." },
    { term: "Cost accounting", def: "The part of management accounting concerned with establishing what things cost and with valuing inventory." },
    { term: "Planning", def: "Deciding objectives and how resources will be used to achieve them." },
    { term: "Control", def: "Comparing actual results with plan and acting on the difference." },
    { term: "Strategic planning", def: "Long-term, whole-organisation planning using summarised, largely external and uncertain information." },
    { term: "Operational planning", def: "Day-to-day planning and control using detailed, internal, immediate and near-certain information." },
    { term: "Data", def: "Raw, unprocessed facts, not yet capable of directing a decision." },
    { term: "Information", def: "Data processed so that it means something to a specific user and can change what they do." },
  ],
  summary: [
    "Management accounting serves internal managers doing three things: planning, decision-making and control — and every MA technique answers one of them.",
    "Cost accounting establishes what things cost and values inventory; it feeds management accounting.",
    "Financial accounting is external, historic, legally required and prescribed in format; management accounting is internal, forward-looking, optional and free in format.",
    "Management accounting includes non-financial information and can be prepared at any level of the business.",
    "Strategic, tactical and operational levels differ in horizon, source, detail and certainty of information — set by the decision, not by job title.",
    "Data are raw facts; information is processed data a specific user can act on.",
    "Good information is Accurate, Complete, Cost-effective, Understandable, Relevant, Accessible, Timely and Easy to use.",
    "Management information rests on estimates and assumptions, costs money, can be manipulated, and may omit what is hardest to measure.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three managerial processes management accounting supports?", a: "Planning (setting objectives and resource use), decision-making (choosing between alternatives) and control (comparing actual with plan and acting on the gap)." },
    { q: "Give four differences between financial and management accounting.", a: "Users (external vs internal), legal status (required vs optional), format (prescribed vs free), time focus (historic vs also forward-looking). Also frequency, level of detail, precision, and financial-only vs including non-financial." },
    { q: "How do the three planning levels differ in their information needs?", a: "Strategic uses summarised, largely external, long-horizon and uncertain information. Tactical is mixed and medium-term. Operational is detailed, internal, immediate and near-certain." },
    { q: "What is the difference between data and information?", a: "Data are raw unprocessed facts. Information is data processed so it means something to a specific user and can change what they do — so a complete, accurate transaction listing is still only data." },
    { q: "What are the attributes of good information?", a: "ACCURATE: Accurate, Complete, Cost-effective, Understandable, Relevant, Accessible, Timely and Easy to use. Note that accuracy trades against timeliness, and management accounting favours timeliness." },
  ],
  furtherStudy: [
    "Planning becomes Area D (budgeting), control becomes Area E (variances) and Area F (performance measurement) — this chapter is the map of the paper.",
    "The same planning/control framework is developed much further in **PM** and **APM**.",
  ],
}

/* ── Chapter 2 · A2 ────────────────────────────────────────────── */

export const MA_TREE_02: StudyChapter = {
  id: "MA-02",
  number: 2,
  paper: "MA",
  area: "A",
  title: "Sources of data",
  minutes: 13,
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)", "A2(d)"],
  intro:
    "Before any of this paper's techniques can be applied, the numbers have to come from somewhere. Where they come from determines how far they can be trusted — and every source has a limitation worth naming.",
  outcomes: [
    "Describe the three main data sources: machine and sensor, transactional, and human",
    "Distinguish internal from external sources of information and give examples of each",
    "Explain the uses and limitations of published statistics and other external data",
    "Describe how the general economic environment affects the data a business relies on",
  ],
  sections: [
    {
      id: "three-sources",
      heading: "The three main data sources",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "Where data originates",
            caption: "Each source has a characteristic strength and a characteristic weakness.",
            data: {
              items: [
                { title: "Machine and sensor", sub: "Automatically captured by equipment — machine hours, temperatures, output counts, scanner reads, vehicle telematics. High volume, continuous, objective." },
                { title: "Transactional", sub: "Generated by the business doing business — sales orders, invoices, payroll, purchase orders, till receipts. Complete and auditable, because it drives the accounting records." },
                { title: "Human", sub: "Supplied by people — timesheets, surveys, appraisals, customer feedback, expert estimates. The only source for judgement and opinion, and the least reliable." },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Strengths and limitations",
          head: ["Source", "Strength", "Limitation"],
          rows: [
            ["Machine and sensor", "Objective, continuous, cheap once installed, very high volume", "Captures only what it was built to measure; a faulty sensor produces confident nonsense; volume can overwhelm"],
            ["Transactional", "Complete, verifiable and reconcilable to the financial records", "Records only what was actually transacted — it is silent on the sale that was lost"],
            ["Human", "The only route to judgement, intention, opinion and explanation", "Subjective, inconsistent, and can be biased by what the person expects to gain — a timesheet completed at the end of the week is an estimate"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The limitation that matters most in MA",
          md: "**Transactional data records what happened, not what could have happened.** Your sales ledger shows every order taken; it says nothing about the customers who asked for a price and went elsewhere. Almost every decision in this paper needs information the accounting records do not contain, which is why external sources and human judgement cannot be dispensed with.",
        },
      ],
    },
    {
      id: "internal-external",
      heading: "Internal and external sources",
      blocks: [
        {
          kind: "table",
          caption: "Where a management accountant actually gets figures",
          head: ["Internal", "External"],
          rows: [
            ["The accounting system — ledgers, invoices, payroll", "Government statistics on inflation, wages, output and employment"],
            ["Production records — output, machine hours, scrap and rework", "Trade association and industry data"],
            ["Inventory records and stores requisitions", "Competitors' published financial statements"],
            ["Timesheets, clock cards and HR records", "Suppliers' price lists and quotations"],
            ["Sales orders and the customer database", "Market research and consumer surveys"],
            ["Prior budgets, forecasts and management reports", "Banks, brokers, professional advisers and the trade press"],
          ],
        },
        {
          kind: "list",
          title: "Judging any external source",
          items: [
            "**Who produced it, and why?** A trade body forecasting its own industry's growth has the best data and an interest in the answer. Both are true at once.",
            "**When?** A statistic gathered two years ago may describe a world that has changed.",
            "**On what basis?** Sample size, definitions and coverage decide whether the figure means what you think. Two sources can disagree simply because they define \"employed\" differently.",
            "**Is it comparable with our own data?** A published industry margin computed after distribution costs cannot be compared with ours computed before them.",
          ],
        },
        {
          kind: "definition",
          term: "Published statistics — the standing limitation",
          md: "They were collected for **someone else's purpose**. That single fact generates most of their problems: the definitions will not match yours exactly, the period will not align with yours, the level of aggregation may hide what you need, and the basis may change between editions without warning.",
        },
        {
          kind: "illustration",
          title: "Two true figures that cannot be compared",
          md: "A manufacturer's own records show a gross margin of 31%. A published industry survey reports an average of 24%, and management concludes it is out-performing the sector.\n\nIt may be. But the survey computes margin **after** deducting outbound distribution, which the manufacturer treats as a selling cost below the gross margin line. Restated on the survey's basis the manufacturer's figure is 25%.\n\nNeither number was wrong. The comparison was — and that is the ordinary way external data misleads: not through error, but through a definitional mismatch nobody checked.",
        },
      ],
      check: {
        q: "Which is the principal limitation of using published government statistics for a management decision?",
        options: [
          "They are usually inaccurate",
          "They were collected for another purpose, so definitions, timing and aggregation may not match the decision",
          "They are confidential and cannot be used commercially",
          "They contain no numerical data",
        ],
        correct: 1,
        explain:
          "Published statistics are typically compiled carefully and are reasonably ACCURATE — the problem is that they were gathered for SOMEONE ELSE'S PURPOSE. Definitions will not match yours exactly, periods will not align, aggregation may hide what you need, and the basis can change between editions. That is why comparability, not accuracy, is the thing to check.",
      },
    },
    {
      id: "economic-environment",
      heading: "How the economic environment reaches the data",
      blocks: [
        {
          kind: "table",
          caption: "The four factors MA expects you to connect to the numbers",
          head: ["Factor", "Effect on the business and its data"],
          rows: [
            ["**Inflation**", "Historic costs understate what replacement will cost, so a budget built on last year's prices is wrong before it starts. Comparisons across years become meaningless unless the figures are restated — which is what index numbers in Chapter 8 are for"],
            ["**Interest rates**", "Change the cost of borrowing and therefore the discount rate used in investment appraisal (Chapter 20). A project that cleared its hurdle last year may not clear it now"],
            ["**Exchange rates**", "Change the cost of imported materials and the revenue from exports, so a standard cost set in one currency drifts as the rate moves"],
            ["**The level of economic activity**", "Drives sales volume, which drives every volume-based figure in the paper — absorption rates, break-even, and every variance measured against a budgeted activity level"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The connection to make in an answer",
          md: "Do not stop at \"inflation affects costs\". Say **which figure** it invalidates and **what to do about it**: \"a standard material price set nine months ago now understates the actual price, so the resulting adverse price variance reflects inflation rather than poor purchasing, and the standard should be revised\". That reasoning is the point of the topic, and it recurs in Chapter 22.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Treating published statistics as unreliable because they are inaccurate.",
      fix: "They are usually accurate. The problem is comparability — different definitions, periods and aggregation, because they were collected for another purpose.",
    },
    {
      trap: "Assuming transactional data is a complete picture of the business.",
      fix: "It records what was transacted, not what was lost. Nothing in the sales ledger shows the customers who went elsewhere.",
    },
    {
      trap: "Treating a timesheet as objective machine data.",
      fix: "It is a HUMAN source — often completed retrospectively, so it is an estimate and can be biased by what the person expects to gain.",
    },
    {
      trap: "Answering 'inflation affects costs' without connecting it to a figure.",
      fix: "Name what it invalidates and the action: an out-of-date standard price produces an adverse price variance that reflects inflation, not purchasing performance.",
    },
  ],
  keyTerms: [
    { term: "Machine and sensor data", def: "Data captured automatically by equipment, such as machine hours, output counts and scanner reads." },
    { term: "Transactional data", def: "Data generated by the business transacting — orders, invoices, payroll, receipts — which drives the accounting records." },
    { term: "Human data", def: "Data supplied by people, such as timesheets, surveys and estimates; the only source of judgement and the least reliable." },
    { term: "Internal source", def: "A source of information from inside the organisation, such as the accounting system or production records." },
    { term: "External source", def: "A source from outside the organisation, such as government statistics, trade data or competitors' published accounts." },
    { term: "Published statistics", def: "Externally compiled data whose principal limitation is that it was collected for another purpose, so definitions and periods may not match." },
  ],
  summary: [
    "The three main data sources are machine and sensor, transactional, and human.",
    "Machine data is objective but captures only what it measures; transactional data is complete but silent on lost business; human data supplies judgement but is subjective.",
    "Internal sources come from the organisation's own systems; external sources include government statistics, trade data and competitors' accounts.",
    "Judge any external source on who produced it, when, on what basis, and whether it is comparable with your own figures.",
    "Published statistics were collected for another purpose, so comparability rather than accuracy is the risk.",
    "Inflation, interest rates, exchange rates and the level of economic activity all reach the business through specific figures — say which figure and what to do about it.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three main sources of data?", a: "Machine and sensor data (captured automatically by equipment), transactional data (generated by the business transacting) and human data (supplied by people through timesheets, surveys and estimates)." },
    { q: "What is transactional data silent on?", a: "Business that did not happen. It records every order taken and nothing about the customers who asked for a price and went elsewhere." },
    { q: "What is the principal limitation of published statistics?", a: "They were collected for someone else's purpose, so definitions, periods and levels of aggregation may not match your decision — a comparability problem rather than an accuracy one." },
    { q: "What four questions should be asked of any external source?", a: "Who produced it and why (any interest in the conclusion?), when, on what basis (sample, definitions, coverage), and is it comparable with our own data?" },
    { q: "How does inflation affect a standard cost?", a: "A standard price set months earlier understates the current actual price, so an adverse price variance arises from inflation rather than from purchasing performance — and the standard should be revised." },
  ],
  furtherStudy: [
    "Index numbers (Chapter 8) are the technique for making figures from different periods comparable.",
    "Big data and the five Vs are developed in Chapter 6; spreadsheets as the tool for handling it in Chapter 9.",
  ],
}

/* ── Chapter 3 · A3 ────────────────────────────────────────────── */

export const MA_TREE_03: StudyChapter = {
  id: "MA-03",
  number: 3,
  paper: "MA",
  area: "A",
  title: "Cost classification and cost behaviour",
  minutes: 19,
  syllabusRefs: ["A3(a)", "A3(b)", "A3(c)", "A3(d)", "A3(e)", "A3(f)", "A3(g)", "A3(h)", "A3(i)", "A3(j)"],
  intro:
    "This is the most load-bearing chapter in the paper. Almost every calculation that follows starts by sorting costs into the right box, and a cost put in the wrong box produces an answer that is arithmetically perfect and completely wrong.",
  outcomes: [
    "Distinguish production from non-production costs and describe the elements of each",
    "Explain the distinction between direct and indirect costs and why it matters",
    "Classify costs by behaviour as fixed, variable, semi-variable or stepped, and sketch each",
    "Calculate a total cost at a given activity level from its fixed and variable elements",
    "Explain cost objects, cost centres and cost units",
    "Distinguish cost, profit, investment and revenue centres and the information each needs",
    "Explain the use of codes in categorising and retrieving cost data",
  ],
  sections: [
    {
      id: "production-nonproduction",
      heading: "Production and non-production costs",
      blocks: [
        {
          kind: "definition",
          term: "Production and non-production costs",
          md: "**Production** (or manufacturing) costs are incurred in **making** the product. **Non-production** costs are everything else — selling, distribution, administration and finance. The distinction matters because only production costs are absorbed into inventory values; non-production costs are written off in the period.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Building up total cost",
            caption: "Prime cost, then production cost, then total cost. Learn the order — questions test it directly.",
            data: {
              steps: [
                { label: "Direct materials", sub: "+ direct labour + direct expenses" },
                { label: "= PRIME COST", sub: "the total of all direct costs" },
                { label: "+ production overhead", sub: "indirect factory costs — rent, supervision, depreciation of plant" },
                { label: "= PRODUCTION COST", sub: "the figure inventory is valued at" },
                { label: "+ non-production costs", sub: "selling, distribution, administration, finance" },
                { label: "= TOTAL COST", sub: "the full cost of getting the product to the customer" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The elements of each",
          head: ["Category", "Contains"],
          rows: [
            ["**Direct materials**", "Materials that become part of the product, traceable to it — timber in a table"],
            ["**Direct labour**", "Labour working directly on the product — the machinist, the assembler"],
            ["**Direct expenses**", "Other costs traceable to one unit or job — a royalty per unit, hire of a machine for one job"],
            ["**Production overhead**", "Indirect factory costs — factory rent and rates, supervisors' salaries, machine depreciation, indirect materials such as lubricants"],
            ["**Selling and distribution**", "Advertising, sales salaries and commission, delivery, warehousing of finished goods"],
            ["**Administration**", "Head office salaries, office rent, audit fees, general management"],
            ["**Finance**", "Interest and the cost of raising funds"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The rule that decides inventory value",
          md: "**Only PRODUCTION costs are included in the cost of inventory.** Selling, distribution, administration and finance costs are period costs, expensed as incurred. Getting this wrong overstates or understates both inventory and profit — and it is the foundation of the absorption-versus-marginal-costing comparison in Chapter 13.",
        },
      ],
      check: {
        q: "A furniture maker pays a $12 royalty to a designer for every chair it produces. How is this classified?",
        options: [
          "Production overhead, because it is not a material or a wage",
          "A direct expense, because it is traceable to each individual unit",
          "An administration cost, because the designer is not an employee",
          "A selling cost, because it relates to the product being sold",
        ],
        correct: 1,
        explain:
          "A cost that can be traced to EACH INDIVIDUAL UNIT, but which is neither material nor labour, is a DIRECT EXPENSE — and it forms part of prime cost. Overhead is by definition INDIRECT: it cannot be traced to one unit. The royalty here is $12 per chair, so tracing it is trivial, which settles the classification.",
      },
    },
    {
      id: "direct-indirect",
      heading: "Direct and indirect costs",
      blocks: [
        {
          kind: "definition",
          term: "Direct and indirect costs",
          md: "A **direct** cost can be **traced in full** to one cost unit. An **indirect** cost (an **overhead**) cannot, and must therefore be **shared** across units by some method. The distinction is about **traceability**, not about size or importance.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The same cost can be direct or indirect — it depends on the cost object",
          md: "A factory supervisor's salary is **indirect** to any individual chair (you cannot trace part of it to one chair) but **direct** to the factory as a cost centre. So the question is never simply \"is this direct?\" — it is \"**direct to what?**\" A question that names the cost object is telling you how to answer.",
        },
        {
          kind: "illustration",
          title: "One salary, two classifications",
          md: "A quality inspector is paid $36,000 a year and inspects every product line in the factory.\n\nAsked to cost **one unit of product X**, her salary is an **indirect** cost — production overhead, absorbed across output on some basis.\n\nAsked to report the cost of running the **quality department**, the same salary is a **direct** cost of that department, traceable to it in full.\n\nNothing about the salary changed. Only the cost object did.",
        },
        {
          kind: "list",
          title: "Why the distinction carries so much weight in MA",
          items: [
            "**Direct costs need no apportionment**, so they can be measured accurately per unit.",
            "**Indirect costs must be absorbed** using a rate, which is an estimate — and Chapter 12 is entirely about how that rate is built and what happens when it is wrong.",
            "**Prime cost** is the sum of direct costs, and several exam formats ask for it specifically.",
            "**Marginal costing** (Chapter 13) treats only variable costs as product costs — a different cut of the same data, which is why the two classifications must be kept apart in your head.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Direct/indirect is NOT the same as variable/fixed",
          md: "They are two independent classifications, and confusing them is one of the most expensive errors in this paper. Direct labour paid a fixed monthly salary is **direct** and **fixed**. Factory power is **indirect** and largely **variable**. Always ask which classification the question wants.",
        },
      ],
    },
    {
      id: "cost-behaviour",
      heading: "Cost behaviour",
      blocks: [
        {
          kind: "text",
          md: "Classification by **behaviour** asks a single question: what happens to this cost as **activity** changes? Everything in break-even analysis, flexible budgeting and variance analysis depends on the answer.",
        },
        {
          kind: "table",
          caption: "The four behaviour patterns",
          head: ["Type", "In TOTAL as activity rises", "PER UNIT as activity rises", "Examples"],
          rows: [
            ["**Variable**", "Rises in direct proportion", "**Constant**", "Direct materials; piecework labour; sales commission per unit"],
            ["**Fixed**", "**Unchanged**", "Falls", "Factory rent; insurance; salaried supervision; straight-line depreciation"],
            ["**Semi-variable** (mixed)", "Rises, but not from zero", "Falls, approaching the variable rate", "A phone bill with a standing charge plus usage; a machine hire with a fixed fee plus a rate per hour"],
            ["**Stepped fixed**", "Constant, then jumps at a threshold", "Falls, then jumps", "One supervisor per 20 workers; renting a second warehouse; a machine that handles up to 10,000 units"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two rows of that table to memorise",
          md: "**A variable cost is constant PER UNIT and rises in total.** **A fixed cost is constant IN TOTAL and falls per unit.** Objective-test questions are frequently built on precisely this inversion — they tell you a cost \"per unit stays the same\" and ask what kind it is.",
        },
        {
          kind: "formula",
          name: "Total cost of a semi-variable cost",
          expr: "Total cost  =  Fixed cost  +  (Variable cost per unit  ×  Activity level)",
          note: "Written y = a + bx: a is the fixed element, b the variable rate per unit, x the activity. Every high/low calculation and every flexed budget rests on this single equation.",
        },
        {
          kind: "example",
          title: "Worked example — total cost at a new activity level",
          scenario:
            "A machine's running cost has a fixed element of $4,200 per month plus $3.60 per machine hour. Additional supervision costing $1,800 per month is needed once monthly hours exceed 2,500. Calculate the total cost at (a) 2,000 hours and (b) 3,200 hours.",
          steps: [
            { label: "(a) Identify which elements apply at 2,000 hours", detail: "2,000 hours does not exceed the 2,500-hour threshold, so the stepped supervision cost is NOT incurred. Only the fixed element and the variable element apply." },
            { label: "(a) Compute", detail: "Fixed $4,200 + variable (2,000 × $3.60 = $7,200) = $11,400." },
            { label: "(b) Identify which elements apply at 3,200 hours", detail: "3,200 exceeds 2,500, so the step is triggered and the $1,800 supervision cost IS incurred." },
            { label: "(b) Compute", detail: "Fixed $4,200 + variable (3,200 × $3.60 = $11,520) + step $1,800 = $17,520." },
            { label: "Sense-check the per-unit figures", detail: "At 2,000 hours: $11,400 ÷ 2,000 = $5.70 per hour. At 3,200: $17,520 ÷ 3,200 = $5.475 per hour. Cost per hour has FALLEN despite the step, because the fixed element is spread over more hours." },
          ],
          result:
            "(a) $11,400 and (b) $17,520. The examinable trap is the STEP: a candidate who applies only the fixed and variable elements at 3,200 hours gets $15,720 and loses the mark. Read the activity level against every threshold in the question before computing.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "bars",
            title: "Total cost against activity — the step is visible",
            caption: "Total cost at 500-hour intervals for the machine above. Note the jump between 2,500 and 3,000 hours.",
            data: {
              unit: "$ total cost",
              items: [
                { label: "1,000 h", value: 7800 },
                { label: "1,500 h", value: 9600 },
                { label: "2,000 h", value: 11400 },
                { label: "2,500 h", value: 13200 },
                { label: "3,000 h", value: 16800 },
                { label: "3,500 h", value: 18600 },
              ],
            },
          },
        },
        {
          kind: "activity",
          title: "Activity 2 — classify by behaviour",
          prompt:
            "Classify each by behaviour, and say what happens to it per unit as output rises.\n\n(a) Rent of the factory, $8,000 per month.\n(b) Direct material at $4.20 per unit.\n(c) A delivery contract: $500 per month plus $1.10 per parcel.\n(d) One quality inspector required for every 5,000 units produced.\n(e) Machine operators paid a fixed annual salary.",
          answer:
            "**(a) Fixed.** Unchanged in total; falls per unit as output rises.\n\n**(b) Variable.** Rises in direct proportion in total; **constant** at $4.20 per unit.\n\n**(c) Semi-variable.** Rises in total but not from zero; per unit it falls, approaching $1.10 as volume grows.\n\n**(d) Stepped fixed.** Constant in total within each 5,000-unit band, then jumps; per unit it falls across a band and jumps at each threshold.\n\n**(e) Fixed — and note it is also DIRECT.** This is the case that catches people: the operators work directly on the product, so their cost is a **direct** cost, but it is paid as a salary, so it is **fixed** in behaviour. Direct/indirect and fixed/variable are independent classifications, and 'direct labour is always variable' is simply false.",
        },
      ],
      check: {
        q: "A cost remains constant per unit as production volume increases. How does it behave?",
        options: ["Fixed", "Variable", "Semi-variable", "Stepped fixed"],
        correct: 1,
        explain:
          "A VARIABLE cost is constant PER UNIT and rises in direct proportion in total. A FIXED cost is the inversion — constant in TOTAL and falling per unit. Objective-test questions are routinely built on this inversion, so read carefully whether the question says 'per unit' or 'in total'.",
      },
    },
    {
      id: "objects-centres-units",
      heading: "Cost objects, cost centres, cost units and responsibility centres",
      blocks: [
        {
          kind: "definition",
          term: "Cost object, cost centre and cost unit",
          md: "A **cost object** is anything for which a cost is separately measured — a product, a service, a project, a customer, a department. A **cost centre** is a location, function or item of equipment to which costs are **charged and accumulated**. A **cost unit** is the **unit of output** whose cost is measured.",
        },
        {
          kind: "table",
          caption: "Cost units differ by industry, and questions rely on the right one",
          head: ["Business", "Typical cost unit"],
          rows: [
            ["Furniture manufacturer", "One chair, or one batch"],
            ["Brewery", "Barrel or hectolitre"],
            ["Hospital", "Patient-day, or one treated patient"],
            ["Hotel", "Occupied room-night"],
            ["Road haulage", "Tonne-kilometre"],
            ["Electricity generator", "Kilowatt-hour"],
            ["Accountancy practice", "Chargeable hour"],
            ["Passenger airline", "Passenger-kilometre, or available seat-kilometre"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Composite cost units",
          md: "Several of those are **composite** — tonne-kilometre, patient-day, passenger-kilometre — because one dimension alone would not capture the work done. Carrying one tonne 400 km is not the same job as carrying 40 tonnes 10 km, though both are 400 tonne-kilometres in total. Composite units matter in service and operation costing (Chapter 14).",
        },
        {
          kind: "table",
          caption: "The four responsibility centres — what the manager controls decides the type",
          head: ["Centre", "Manager is accountable for", "Principal performance measure"],
          rows: [
            ["**Cost centre**", "Costs only", "Actual cost against budget; cost variances"],
            ["**Revenue centre**", "Revenue only", "Actual revenue against target"],
            ["**Profit centre**", "Costs **and** revenue", "Profit against budget; margins"],
            ["**Investment centre**", "Costs, revenue **and** the capital invested", "Return on capital employed; residual income"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The classification rule, and why it is a fairness rule",
          md: "A manager should be judged only on what they can **control**. Charging a cost-centre manager with a share of head-office costs they cannot influence measures the allocation, not the manager. This is the principle of **controllability**, and it drives Chapter 25's performance measures: return on capital employed is meaningful for an investment centre and meaningless for a cost centre, because the latter's manager does not decide the capital.",
        },
        {
          kind: "definition",
          term: "Coding",
          md: "A **code** is a short symbolic reference attached to each transaction identifying what it is and where it belongs — typically a cost centre and an expense type, such as 320-4150. Codes make data **classifiable, retrievable and summarisable** at any level, and they are what allows a system to produce a departmental report and a product cost from the same entries.",
        },
        {
          kind: "list",
          title: "What a good coding system delivers",
          items: [
            "**Unique** — one code means exactly one thing.",
            "**Consistent** — the same item is always coded the same way, so comparisons hold over time.",
            "**Flexible** — new codes can be added without restructuring, and there is room to expand.",
            "**Concise but meaningful** — long enough to distinguish, short enough to enter accurately.",
            "**Mnemonic where possible** — a code with a recognisable structure produces fewer keying errors.",
            "The main **risk** is miscoding: a correctly-recorded cost charged to the wrong centre corrupts two reports at once and is difficult to find.",
          ],
        },
      ],
      check: {
        q: "A divisional manager decides selling prices, controls the division's costs, and authorises capital expenditure on new equipment. What type of responsibility centre is the division?",
        options: ["Cost centre", "Revenue centre", "Profit centre", "Investment centre"],
        correct: 3,
        explain:
          "The manager controls costs, revenue AND the capital invested, which makes it an INVESTMENT centre — and the appropriate measures are return on capital employed and residual income. A PROFIT centre manager controls costs and revenue but not capital investment, which is exactly the distinction being tested here.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating direct/indirect as the same distinction as variable/fixed.",
      fix: "They are independent. Salaried machine operators are DIRECT and FIXED; factory power is INDIRECT and largely VARIABLE.",
    },
    {
      trap: "Including selling or administration costs in the value of inventory.",
      fix: "Only PRODUCTION costs are absorbed into inventory. Non-production costs are period costs, written off as incurred.",
    },
    {
      trap: "Forgetting a stepped cost when computing total cost at a higher activity level.",
      fix: "Check the activity level against every threshold in the question before calculating, or the step is silently omitted.",
    },
    {
      trap: "Reading 'constant per unit' as a fixed cost.",
      fix: "Constant PER UNIT is VARIABLE. Constant IN TOTAL is fixed. Questions are deliberately built on this inversion.",
    },
    {
      trap: "Asking whether a cost is direct without asking direct to WHAT.",
      fix: "The classification depends on the cost object. A supervisor's salary is indirect to a unit and direct to the department.",
    },
    {
      trap: "Using return on capital employed to judge a cost centre manager.",
      fix: "Judge a manager only on what they control. ROCE suits an investment centre, whose manager decides the capital.",
    },
  ],
  keyTerms: [
    { term: "Prime cost", def: "The total of all direct costs: direct materials plus direct labour plus direct expenses." },
    { term: "Production cost", def: "Prime cost plus production overhead — the figure at which inventory is valued." },
    { term: "Direct cost", def: "A cost that can be traced in full to one cost unit." },
    { term: "Indirect cost (overhead)", def: "A cost that cannot be traced to one cost unit and must be shared across units." },
    { term: "Variable cost", def: "A cost that rises in direct proportion to activity in total and is constant per unit." },
    { term: "Fixed cost", def: "A cost that is unchanged in total as activity varies and therefore falls per unit." },
    { term: "Semi-variable cost", def: "A cost with both a fixed and a variable element, so it rises with activity but not from zero." },
    { term: "Stepped fixed cost", def: "A cost that is fixed within a range of activity and jumps to a new level once a threshold is passed." },
    { term: "Cost object", def: "Anything for which a cost is separately measured — a product, service, project, customer or department." },
    { term: "Cost centre", def: "A location, function or item of equipment to which costs are charged and accumulated." },
    { term: "Cost unit", def: "The unit of output whose cost is being measured." },
    { term: "Investment centre", def: "A responsibility centre whose manager controls costs, revenue and the capital invested." },
    { term: "Controllability", def: "The principle that a manager should be judged only on costs and revenues they can influence." },
  ],
  summary: [
    "Prime cost is all direct costs; production cost adds production overhead; total cost adds non-production costs.",
    "Only production costs are absorbed into inventory — selling, distribution, administration and finance are period costs.",
    "Direct means traceable in full to one cost unit; indirect must be shared. The classification depends on the cost object.",
    "Direct/indirect and variable/fixed are independent classifications and must not be conflated.",
    "Variable costs are constant per unit and rise in total; fixed costs are constant in total and fall per unit.",
    "Total cost = fixed + (variable per unit × activity), and stepped costs jump at a threshold that must be checked.",
    "Cost objects, cost centres and cost units are distinct; several industries use composite units such as tonne-kilometres.",
    "Cost, revenue, profit and investment centres are distinguished by what the manager controls, and controllability decides which measure is fair.",
    "Codes make cost data classifiable and retrievable; the main risk is miscoding, which corrupts two reports at once.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes up prime cost, and what does production cost add?", a: "Prime cost is direct materials plus direct labour plus direct expenses. Production cost adds production overhead, and is the figure inventory is valued at." },
    { q: "Which costs may be included in the value of inventory?", a: "Only production costs. Selling, distribution, administration and finance costs are period costs, written off as incurred." },
    { q: "How does a variable cost behave in total and per unit?", a: "In total it rises in direct proportion to activity; per unit it is constant. A fixed cost is the inversion: constant in total, falling per unit." },
    { q: "Write the equation for a semi-variable cost.", a: "Total cost = fixed cost + (variable cost per unit × activity level), or y = a + bx. Every high/low calculation and flexed budget rests on it." },
    { q: "What distinguishes a profit centre from an investment centre?", a: "A profit centre manager controls costs and revenue. An investment centre manager also controls the capital invested, so return on capital employed and residual income become appropriate measures." },
  ],
  furtherStudy: [
    "Cost behaviour is separated numerically by high/low analysis and regression in Chapter 7, and drives break-even analysis and flexible budgets in Chapters 13 and 18.",
    "Overhead absorption — the mechanics of sharing indirect costs — is Chapter 12.",
  ],
}

/* ── Chapter 4 · A4 ────────────────────────────────────────────── */

export const MA_TREE_04: StudyChapter = {
  id: "MA-04",
  number: 4,
  paper: "MA",
  area: "A",
  title: "Presenting information",
  minutes: 14,
  syllabusRefs: ["A4(a)", "A4(b)", "A4(c)"],
  intro:
    "A correct figure that its reader cannot use has failed. This chapter covers writing a management report, choosing a chart that fits the data, and — the part that carries the marks — interpreting what a table or chart actually shows.",
  outcomes: [
    "Prepare a written report presenting management information",
    "Select an appropriate table, chart or graph for a given type of data",
    "Interpret tables, charts and graphs and state what they show",
    "Recognise how a chart can mislead, and avoid doing so",
  ],
  sections: [
    {
      id: "reports",
      heading: "Writing a management report",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The structure of a formal report",
          items: [
            "**Title, addressee, author and date** — who it is for, who wrote it, and when. A report without a date cannot be relied on later.",
            "**Terms of reference** — what was asked, and any limits on scope. This is what protects you when the question asked was narrower than the reader remembers.",
            "**Method or sources** — where the figures came from, so the reader can judge them.",
            "**Findings** — the analysis, in numbered sections with headings, each covering one idea.",
            "**Conclusions** — what the findings mean.",
            "**Recommendations** — what should be done, stated as actions.",
            "**Appendices** — detailed workings, so the main body stays readable.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Conclusions and recommendations are not the same thing",
          md: "A **conclusion** says what the figures mean (\"unit cost rose 8% because volume fell below the level the fixed overhead was absorbed at\"). A **recommendation** says what to do about it (\"revise the absorption rate at the half-year and review the pricing of the affected line\"). Marks are commonly allocated separately to each, and an answer that stops at the conclusion leaves the recommendation marks on the table.",
        },
        {
          kind: "table",
          caption: "Three report formats and when each fits",
          head: ["Format", "Use", "Character"],
          rows: [
            ["Short **formal** report", "Middle management reporting to senior management; anything that will be filed and referred back to", "Full structure with terms of reference and numbered sections"],
            ["Short **informal** report", "A colleague or immediate superior, on a limited question", "Introduction, findings, conclusion — fewer headings, plainer tone"],
            ["**Memorandum** report", "Brief internal communication, often a single issue", "To / From / Date / Subject, then a few short paragraphs"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What earns marks in an MTQ or written requirement",
          md: "Write for the **named reader**. A production supervisor needs the unit-cost effect and what to change on the line; a finance director needs the profit effect and the assumption behind it. Same figures, different report — and stating the **assumption** you relied on is very often worth a mark on its own.",
        },
      ],
    },
    {
      id: "choosing-a-chart",
      heading: "Choosing the right chart",
      blocks: [
        {
          kind: "text",
          md: "Each chart type answers one kind of question. Choosing by appearance rather than by question is how a presentation obscures the point it was meant to make.",
        },
        {
          kind: "table",
          caption: "Match the chart to the question",
          head: ["Chart", "Answers", "Watch out for"],
          rows: [
            ["**Table**", "What are the exact values?", "Too many rows and the pattern disappears — summarise or use exception reporting"],
            ["**Bar chart**", "How do categories compare in size?", "A vertical axis that does not start at zero exaggerates differences"],
            ["**Component (stacked) bar**", "How does the total split, and how does the split change?", "Only the bottom segment sits on a common baseline, so middle segments are hard to compare"],
            ["**Line graph**", "How has this moved over time?", "Needs a genuine time or continuous axis — not categories"],
            ["**Pie chart**", "What share of one total is each part?", "Useless beyond about six slices, and cannot compare two totals"],
            ["**Scatter diagram**", "Is there a relationship between two variables?", "A relationship is not causation (Chapter 7)"],
            ["**Histogram**", "How is a continuous variable distributed?", "Not a bar chart: bars touch, and AREA represents frequency"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Histogram and bar chart are different tools",
          md: "A **bar chart** compares **separate categories**, so its bars have gaps. A **histogram** shows the **distribution of a continuous variable**, so its bars touch and it is the **area** — not the height alone — that represents frequency. With unequal class widths, height must be adjusted or the chart lies. This distinction is examined directly.",
        },
        {
          kind: "activity",
          title: "Activity 3 — choose and justify",
          prompt:
            "Name the most suitable presentation for each, and say why.\n\n(a) Monthly sales revenue for the last three years, to show the trend and its seasonality.\n(b) The proportion of total production cost made up of materials, labour and overhead in one period.\n(c) Whether machine maintenance cost is related to machine hours run.\n(d) Total cost and revenue by product line, where the reader needs exact figures for a budget submission.",
          answer:
            "**(a) Line graph.** Time on the horizontal axis is continuous, and a line makes both the underlying trend and the repeating seasonal pattern visible — which a bar chart of 36 bars would not.\n\n**(b) Pie chart.** One total split into three parts is exactly what a pie does well, and three slices is well within the limit where it stays readable. A component bar chart would also be defensible, and would be **preferable** if you needed to compare the split across several periods.\n\n**(c) Scatter diagram.** Two variables, and the question is whether a relationship exists — which is precisely what a scatter plot shows, and the visual precursor to the correlation and regression work in Chapter 7.\n\n**(d) Table.** The reader needs **exact values** to build a budget. Any chart trades precision for pattern, and here precision is the requirement. Note the general rule this illustrates: use a chart to show a **pattern**, a table to give a **number**.",
        },
      ],
      check: {
        q: "Which presentation is most appropriate for showing whether two variables are related to each other?",
        options: ["A pie chart", "A component bar chart", "A scatter diagram", "A histogram"],
        correct: 2,
        explain:
          "A SCATTER DIAGRAM plots paired observations of two variables and reveals whether they move together — the visual precursor to correlation and regression. A pie chart shows one total's composition, a component bar chart shows how a total splits, and a histogram shows the distribution of a single continuous variable.",
      },
    },
    {
      id: "interpretation",
      heading: "Interpreting what you are shown",
      blocks: [
        {
          kind: "text",
          md: "Interpretation is where the marks are, and it is a skill with a method. Given a table or chart, work through four questions in order.",
        },
        {
          kind: "list",
          style: "number",
          title: "The four interpretation questions",
          items: [
            "**What is the overall picture?** Direction and magnitude first: is it rising, falling or flat, and by how much?",
            "**What stands out?** The largest item, the sharpest movement, the exception to the pattern, the outlier.",
            "**What might explain it?** Link the movement to something in the scenario — a price rise, a volume fall, a new competitor, a change in mix.",
            "**What should be done, or what more is needed?** A recommendation, or an honest statement of the further information required to reach one.",
          ],
        },
        {
          kind: "example",
          title: "Worked example — interpreting a cost table",
          scenario:
            "A company reports the following for one product over three quarters. Q1: output 10,000 units, total cost $86,000. Q2: output 12,000 units, total cost $96,000. Q3: output 8,000 units, total cost $79,000. Interpret the figures and state what they reveal about cost behaviour and unit cost.",
          steps: [
            { label: "Overall picture", detail: "Total cost moves with output but by much less than proportionately: output fell 33% from Q2 to Q3 while total cost fell only 18%. That is the signature of a SEMI-VARIABLE cost." },
            { label: "Separate the elements using the highest and lowest activity", detail: "Highest 12,000 units at $96,000; lowest 8,000 units at $79,000. Difference: 4,000 units and $17,000, so variable cost = $17,000 ÷ 4,000 = $4.25 per unit." },
            { label: "Find the fixed element", detail: "At 12,000 units, variable cost = 12,000 × $4.25 = $51,000. Fixed cost = $96,000 − $51,000 = $45,000 per quarter. Check at 8,000: $45,000 + (8,000 × $4.25 = $34,000) = $79,000. Agrees." },
            { label: "Verify the middle point", detail: "At 10,000: $45,000 + $42,500 = $87,500, against actual $86,000 — $1,500 lower than the model predicts, so Q1 was $1,500 favourable against this cost structure and is worth investigating." },
            { label: "What stands out — unit cost", detail: "Q1 $8.60, Q2 $8.00, Q3 $9.88 per unit. Unit cost is highest at the LOWEST volume, because $45,000 of fixed cost is spread over fewer units." },
          ],
          result:
            "The cost is semi-variable: $45,000 fixed per quarter plus $4.25 per unit. The examinable interpretation is that Q3's high unit cost of $9.88 is **not evidence of inefficiency** — it is what happens when fixed cost is spread over 8,000 units instead of 12,000. Concluding that Q3 was badly run would be exactly the wrong reading, and this confusion between volume effects and efficiency is what flexible budgeting (Chapter 18) exists to prevent.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The interpretation trap that recurs all through MA",
          md: "**A rising unit cost does not prove inefficiency.** It may simply mean volume fell and fixed costs were spread more thinly. Before criticising performance, ask whether the comparison holds volume constant — which is precisely what a flexed budget does.",
        },
        {
          kind: "list",
          title: "How a chart misleads, usually without anyone intending it",
          items: [
            "**A vertical axis that does not start at zero**, turning a 2% movement into a visual cliff.",
            "**A truncated or selective time period** — starting the series at a convenient point.",
            "**Inconsistent scales** on two charts placed side by side.",
            "**Absolute figures where proportions matter**, or the reverse.",
            "**Unequal histogram class widths** with unadjusted heights, so area no longer represents frequency.",
            "**3-D effects and volume distortion**, which make the nearer or larger segments look bigger than they are.",
            "**Omitting the base data**, so nobody can check what the picture is built on.",
          ],
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Stopping at a conclusion without giving a recommendation.",
      fix: "A conclusion says what the figures mean; a recommendation says what to do. Marks are usually allocated to each separately.",
    },
    {
      trap: "Confusing a histogram with a bar chart.",
      fix: "A bar chart compares separate categories and has gaps. A histogram shows a continuous distribution, its bars touch, and AREA represents frequency.",
    },
    {
      trap: "Using a pie chart to compare two different totals.",
      fix: "A pie shows the composition of ONE total. To compare totals or track a changing split, use a component bar chart.",
    },
    {
      trap: "Reading a rising unit cost as evidence of inefficiency.",
      fix: "It may simply be lower volume spreading fixed costs over fewer units. Hold volume constant — flex the budget — before judging performance.",
    },
    {
      trap: "Describing a chart instead of interpreting it.",
      fix: "'Sales rose' is description. Marks come from magnitude, what stands out, a possible cause tied to the scenario, and an action or the further information needed.",
    },
  ],
  keyTerms: [
    { term: "Terms of reference", def: "The statement in a report of what was asked and any limits on its scope." },
    { term: "Conclusion", def: "A statement of what the findings mean." },
    { term: "Recommendation", def: "A statement of the action that should be taken as a result." },
    { term: "Component bar chart", def: "A bar chart whose bars are subdivided to show how each total splits between components." },
    { term: "Scatter diagram", def: "A plot of paired observations of two variables, used to see whether a relationship exists between them." },
    { term: "Histogram", def: "A chart showing the distribution of a continuous variable, in which bars touch and area represents frequency." },
  ],
  summary: [
    "A formal report runs title and addressee, terms of reference, method, findings, conclusions, recommendations and appendices.",
    "Conclusions state what the figures mean; recommendations state what to do — and marks are allocated to each.",
    "Write for the named reader: the same figures need a different report for a supervisor and a finance director.",
    "Match the chart to the question: line for time, pie for one total's composition, scatter for a relationship, table when exact values are needed.",
    "A histogram is not a bar chart — its bars touch and area, not height alone, represents frequency.",
    "Interpretation has a method: overall picture, what stands out, possible cause tied to the scenario, then action or further information needed.",
    "A rising unit cost may reflect lower volume spreading fixed costs, not inefficiency — hold volume constant before judging.",
    "Charts mislead most often through a non-zero axis, a selective period, inconsistent scales or unadjusted histogram widths.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the main sections of a formal management report?", a: "Title with addressee, author and date; terms of reference; method or sources; findings in numbered sections; conclusions; recommendations; appendices for detailed workings." },
    { q: "What is the difference between a conclusion and a recommendation?", a: "A conclusion states what the findings mean. A recommendation states the action to take. Both usually carry marks, so an answer must give each." },
    { q: "When should a table be used rather than a chart?", a: "When the reader needs exact values — for example to build a budget. Use a chart to show a pattern and a table to give a number." },
    { q: "How does a histogram differ from a bar chart?", a: "A bar chart compares separate categories and its bars have gaps. A histogram shows the distribution of a continuous variable, its bars touch, and area represents frequency — so unequal class widths need adjusted heights." },
    { q: "Why might unit cost rise without any loss of efficiency?", a: "Because volume fell, so the same fixed cost is spread over fewer units. Comparing performance requires holding volume constant, which is what a flexed budget does." },
  ],
  furtherStudy: [
    "Interpretation of ratios and performance measures is developed in Chapters 24 to 27, and much further in **PM** and **APM**.",
    "The presentation of data using spreadsheets is Chapter 9.",
  ],
}

/* ── Area A chapter list, in reading order ─────────────────────── */

export const MA_TREE_AREA_A: StudyChapter[] = [
  MA_TREE_01,
  MA_TREE_02,
  MA_TREE_03,
  MA_TREE_04,
]

