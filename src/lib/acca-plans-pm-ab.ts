/*
 * PM Areas A and B — information, technologies and systems, and specialist cost
 * and management accounting techniques.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * PM is the first paper in this layer with a CONSTRUCTED RESPONSE section, and that
 * changes what a plan is for. Section A is 15 objective tests at 2 marks, Section B
 * is 3 OT cases at 10 marks, and Section C is 2 constructed responses at 20 marks
 * each — 40 of the 100 marks written into the CBE word processor and spreadsheet.
 *
 * On a Section C question the calculation is rarely more than half the marks. The
 * rest are for interpretation, implications and advice, and the single most
 * expensive habit in this paper is producing a perfect computation and stopping.
 * So every `written` plan here allocates the marks explicitly before any figure is
 * worked, and says what the discussion has to contain.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const PM_PLANS_AB: ExamPlanMap = {
  /* ── PM-01 · Information systems ─────────────────────────────── */

  "PM-01::role": {
    title: "What management information has to do to be worth producing",
    format: "ot",
    marks: 2,
    requirement:
      "A monthly report is accurate, complete and well presented, but reaches managers six weeks after the period it covers. Its principal defect is that it lacks:\n\nA  Accuracy\nB  Timeliness, so it cannot support any decision about the period it reports\nC  Completeness\nD  Relevance",
    plan: [
      {
        step: "Read what the stem concedes as well as what it withholds",
        detail:
          "It grants accuracy, completeness and presentation outright, and states a six-week delay. Three qualities are expressly present, so the defect must be the fourth.",
      },
      {
        step: "Name the quality the delay destroys",
        detail:
          "Timeliness. Information arriving after the moment it could have been acted on cannot influence anything, whatever else is true of it.",
      },
      {
        step: "Separate timeliness from relevance",
        detail:
          "Relevance is about whether the CONTENT bears on the decision. This report's content may be entirely relevant; it simply arrives too late to be used, which is a different failure.",
      },
      {
        step: "Note the trade-off, since PM examines it",
        detail:
          "Accuracy and timeliness pull against each other — precision takes time. For control purposes an approximate figure now beats an exact one next month.",
      },
    ],
    answer:
      "**B — timeliness, so it cannot support any decision about the period it reports.**\n\nThe stem grants accuracy, completeness and presentation explicitly, so the defect has to be the remaining quality. A report on a period that closed six weeks ago cannot influence anything that happened in it.\n\n**Relevance** is the distractor worth separating out: relevance is about whether the **content** bears on the decision, and this report's content may be entirely relevant. It simply arrives too late to be used — a different failure.\n\nThe trade-off is what PM actually examines: **accuracy and timeliness pull against each other**, because precision takes time. For control purposes an approximate figure available now beats an exact one available next month, which is why good management information is often deliberately less precise than it could be.\n\nGood information is accurate, complete, cost-beneficial, user-targeted, relevant, authoritative, timely and easy to use.",
    earns: ["Reading what the stem concedes, and separating timeliness from relevance"],
    loses: ["Choosing relevance, which concerns content rather than timing"],
  },

  "PM-01::costs-benefits": {
    title: "Applying the cost-benefit test to an information system",
    format: "ot",
    marks: 2,
    requirement:
      "A proposed reporting system would cost $80,000 a year to run and is expected to improve decisions worth $60,000 a year in additional contribution. The system should:\n\nA  Be implemented, because better information is always worthwhile\nB  Not be implemented on these figures, because the cost exceeds the benefit\nC  Be implemented, because the cost is a fixed cost\nD  Be implemented if the directors prefer it",
    plan: [
      {
        step: "Apply the cost-benefit constraint",
        detail:
          "Information is only worth producing where the benefit exceeds the cost. $80,000 of cost against $60,000 of benefit fails that test as the figures stand.",
      },
      {
        step: "Reject the \"information is always good\" reasoning",
        detail:
          "Option A is the instinct the constraint exists to correct. More information costs money to collect, process and read, and can produce overload rather than better decisions.",
      },
      {
        step: "Note what would change the answer",
        detail:
          "Benefits that are real but unquantified — better risk management, faster response, improved customer service. A full answer says the decision turns on whether those close a $20,000 gap.",
      },
      {
        step: "Reject the fixed-cost and preference options",
        detail:
          "Whether a cost is fixed says nothing about whether it is worth incurring. And a directors' preference is not an appraisal.",
      },
    ],
    answer:
      "**B — not be implemented on these figures, because the cost exceeds the benefit.**\n\nInformation is subject to a **cost-benefit constraint**: it is worth producing only where the benefit exceeds the cost of producing it. $80,000 against $60,000 fails on the figures given.\n\nOption A is the instinct the constraint exists to correct. More information costs money to collect, process and read, and beyond a point produces **overload** rather than better decisions.\n\nThe qualification matters and would earn credit in a discussion: the $60,000 captures only **quantified** benefits. Better risk management, faster response to problems and improved customer service are real and hard to value, so the honest conclusion is that the decision turns on whether those unquantified benefits close a $20,000 gap.\n\nWhether the cost is fixed says nothing about whether it is worth incurring, and a preference is not an appraisal.",
    earns: [
      "Applying the constraint and then qualifying it with the unquantified benefits",
      "Rejecting \"more information is always better\"",
    ],
    loses: ["Treating better information as self-justifying"],
  },

  /* ── PM-02 · Networks and control of information ─────────────── */

  "PM-02::networks": {
    title: "Which technology suits which requirement",
    format: "ot",
    marks: 2,
    requirement:
      "A group wants every subsidiary's transactions to update one shared database so that consolidated figures are available immediately. The appropriate solution is:\n\nA  A spreadsheet emailed between subsidiaries\nB  An integrated enterprise resource planning system on a shared database\nC  A separate accounting package in each subsidiary\nD  A monthly paper return",
    plan: [
      {
        step: "Identify the requirement precisely",
        detail:
          "One shared database, transactions entered once, consolidated figures available immediately. Integration across entities is the requirement, not merely computerisation.",
      },
      {
        step: "Match it to the system built for it",
        detail:
          "An ERP system integrates functions and entities on a single database, so a transaction entered once updates every affected module and the consolidated position is always current.",
      },
      {
        step: "Reject the options that reintroduce reconciliation",
        detail:
          "Separate packages and emailed spreadsheets each create multiple versions of the truth that must be reconciled — which is exactly the problem the requirement rules out.",
      },
      {
        step: "Name the cost, since a discussion question wants it",
        detail:
          "ERP is expensive, disruptive to implement, and imposes one way of working on every subsidiary. The benefit is a single source of truth; the cost is flexibility and implementation risk.",
      },
    ],
    answer:
      "**B — an integrated enterprise resource planning system on a shared database.**\n\nThe requirement is **integration**, not computerisation: one shared database, transactions entered once, consolidated figures current. ERP is defined by exactly that.\n\nOptions A and C both reintroduce the problem the requirement excludes — separate packages and emailed spreadsheets create **multiple versions of the truth** that must be reconciled, and reconciliation is what makes immediate consolidation impossible.\n\nThe cost belongs in any discussion answer: ERP is **expensive**, **disruptive** to implement, and imposes one way of working on every subsidiary. The benefit is a single source of truth; the price is flexibility and implementation risk.\n\nThe supporting technologies PM names are **networks** (LAN and WAN), **intranets** and **extranets**, **cloud** computing, **big data** platforms and **blockchain** — each answering a different question about where data lives and who can reach it.",
    earns: [
      "Reading the requirement as integration and naming ERP's cost as well as its benefit",
      "Identifying reconciliation as what the alternatives reintroduce",
    ],
    loses: ["Treating any computerised solution as satisfying an integration requirement"],
  },

  "PM-02::controls": {
    title: "Matching a control to the information risk it addresses",
    format: "ot",
    marks: 2,
    requirement:
      "Which control most directly addresses the risk that management information is accurate but reaches people not entitled to see it?\n\nA  Input validation checks\nB  Access controls and user permissions\nC  Regular backups\nD  Reconciliation to the general ledger",
    plan: [
      {
        step: "Name the risk exactly before matching a control",
        detail:
          "The risk is unauthorised ACCESS, not inaccuracy, loss or misposting. The stem expressly concedes the information is accurate, which rules out three of the four controls.",
      },
      {
        step: "Say what each control protects against",
        detail:
          "Validation: input accuracy. Backups: loss. Reconciliation: completeness and accuracy of recording. Access controls: who may see and change what.",
      },
      {
        step: "Match on the stated risk rather than general merit",
        detail:
          "Three options are genuine and important controls that would do nothing about confidentiality. A good control is not the same as the right control.",
      },
      {
        step: "Note why confidentiality matters for management information",
        detail:
          "It includes margins, costs and plans. Leakage to a competitor or a supplier is commercially damaging even though every figure is correct.",
      },
    ],
    answer:
      "**B — access controls and user permissions.**\n\nThe stem concedes the information is **accurate**, so the risk is unauthorised **access** — which rules out the three controls aimed at accuracy and availability.\n\nInput **validation** protects input accuracy. **Backups** protect against loss. **Reconciliation** protects completeness and accuracy of recording. Only access controls govern **who may see and change what**.\n\nAll three distractors are genuine and important, which is the point: a good control is not the same as the right control for the stated risk.\n\nWhy it matters for management information specifically: it contains **margins, costs, plans and forecasts**, so leakage to a competitor, a customer or a supplier is commercially damaging even though every figure in it is correct.\n\nThe wider control set is access control, input validation, processing and output controls, backup and recovery, audit trails, and segregation of duties.",
    earns: [
      "Naming the risk precisely before matching, and using the stem's concession",
      "Explaining why confidentiality of management information has commercial value",
    ],
    loses: ["Choosing a strong control that does not address the risk described"],
  },

  /* ── PM-03 · Types of system, and presenting output ──────────── */

  "PM-03::system-types": {
    title: "Identifying the system from what it does",
    format: "ot",
    marks: 2,
    requirement:
      "A system that helps senior management analyse an unstructured, one-off strategic decision by modelling scenarios is a:\n\nA  Transaction processing system\nB  Decision support system\nC  Management information system\nD  Expert system",
    plan: [
      {
        step: "Match each system to the decision it serves",
        detail:
          "Transaction processing: routine operational transactions. Management information: routine summary reports for tactical control. Decision support: modelling for unstructured one-off decisions. Executive information: high-level strategic overview. Expert system: applies encoded specialist knowledge.",
      },
      {
        step: "Read the stem for structure and frequency",
        detail:
          "Unstructured, one-off, scenario modelling. Unstructured plus one-off is the decision support profile — routine and structured would point elsewhere.",
      },
      {
        step: "Split decision support from an expert system",
        detail:
          "A DSS helps a HUMAN decide by modelling alternatives. An expert system supplies an ANSWER from encoded rules. The stem says the system helps management analyse, so the human decides.",
      },
      {
        step: "Connect system type to management level",
        detail:
          "Operational level uses transaction processing, tactical uses management information, strategic uses decision support and executive information. Anthony's hierarchy maps directly onto the system types.",
      },
    ],
    answer:
      "**B — a decision support system.**\n\nThe systems map onto the decisions they serve: **transaction processing** for routine operational transactions, **management information** for routine summary reports supporting tactical control, **decision support** for modelling unstructured one-off decisions, **executive information** for high-level strategic overview, and **expert systems** for applying encoded specialist knowledge.\n\n\"Unstructured\" and \"one-off\" together give the DSS profile — routine and structured would point at a management information system.\n\nThe distinction from an **expert system** carries the marks: a DSS helps a **human** decide by modelling alternatives, while an expert system supplies an **answer** from encoded rules. The stem says the system helps management **analyse**, so the human decides.\n\nThe mapping onto **Anthony's hierarchy** is worth holding: operational level uses transaction processing, tactical uses management information, strategic uses decision support and executive information.",
    earns: [
      "Reading structure and frequency, and splitting DSS from an expert system on who decides",
      "Mapping the system types onto management levels",
    ],
    loses: ["Choosing an expert system for a tool that supports rather than makes the decision"],
  },

  "PM-03::visualisation": {
    title: "Choosing a visualisation that answers the question asked",
    format: "ot",
    marks: 2,
    requirement:
      "A manager wants to see which of twelve product lines contribute most to total profit, and in what proportions. The most appropriate visualisation is:\n\nA  A line graph of total profit over time\nB  A bar chart ranked by contribution, or a Pareto chart\nC  A scatter diagram of price against volume\nD  A single summary figure of total profit",
    plan: [
      {
        step: "Identify what the question asks the picture to show",
        detail:
          "Comparison and ranking across twelve categories, with proportions. That is a comparison question, not a trend question and not a relationship question.",
      },
      {
        step: "Match the chart to the job",
        detail:
          "Ranked bar chart or Pareto chart for comparison and ranking. Line graph for a trend over time. Scatter diagram for a relationship between two variables. A single figure answers nothing about the mix.",
      },
      {
        step: "Note why Pareto suits this case particularly",
        detail:
          "It ranks and shows cumulative contribution, so it reveals whether a small number of lines produce most of the profit — the 80/20 insight that drives the management action.",
      },
      {
        step: "State the general rule",
        detail:
          "Choose from the QUESTION, not from the data. The same twelve numbers support several charts, and only one answers what was asked.",
      },
    ],
    answer:
      "**B — a bar chart ranked by contribution, or a Pareto chart.**\n\nThe question asks for **comparison and ranking** across twelve categories with proportions — not a trend, and not a relationship.\n\nA **line graph** shows a value over time. A **scatter diagram** shows a relationship between two variables. A single summary figure answers nothing about the mix.\n\n**Pareto** suits this case particularly because it ranks and shows **cumulative** contribution, revealing whether a small number of lines produce most of the profit. That 80/20 insight is what drives the management action, so the chart does more than display the data.\n\nThe general rule for the whole topic: choose from the **question**, not from the data. The same twelve numbers support several charts and only one answers what was asked.\n\nVisualisation matters in PM because a manager who cannot read the analysis will not act on it, so presentation is part of the accountant's job rather than decoration.",
    earns: [
      "Choosing from the question being answered, and naming Pareto's cumulative insight",
      "Framing presentation as part of the work rather than decoration",
    ],
    loses: ["Selecting a trend chart for a comparison question"],
  },

  /* ── PM-04 · Big data and analytics ─────────────────────────── */

  "PM-04::the-five-vs": {
    title: "The characteristics of big data, and what they cost",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** one of the commonly cited characteristics of big data?\n\nA  Volume\nB  Velocity\nC  Variety\nD  Validation",
    plan: [
      {
        step: "List the Vs before reading the options",
        detail:
          "Volume, velocity, variety, veracity and value. All begin with V, which is exactly what the question exploits.",
      },
      {
        step: "Define each so a near-miss cannot pass",
        detail:
          "Volume: quantity. Velocity: speed of arrival and required processing. Variety: range of structured and unstructured forms. Veracity: whether it can be trusted. Value: whether it yields anything useful.",
      },
      {
        step: "Test the fourth option",
        detail:
          "Validation is an ACTIVITY performed on data. Veracity is a PROPERTY the data has. The option substitutes an action for a characteristic, which is the trick.",
      },
      {
        step: "Note the PM angle",
        detail:
          "Big data enables more granular cost drivers, faster forecasting and richer non-financial measures. Its risks are overload, cost, skills shortage, and decisions built on poor-quality input.",
      },
    ],
    answer:
      "**D — validation.**\n\nThe five Vs are **volume**, **velocity**, **variety**, **veracity** and **value**. Validation is close enough to veracity to pass unexamined, and the difference is the whole question: **veracity is a property** the data has, **validation is an activity** performed on it.\n\nThe management accounting angle is what PM actually rewards. Big data enables **more granular cost drivers** for ABC, **faster forecasting**, and richer **non-financial** measures for a balanced scorecard.\n\nIts risks are equally examinable: **overload**, the **cost** of collection and storage, a **skills** shortage, data **protection** obligations, and — the serious one — decisions built on poor-quality input, where volume creates false confidence in a conclusion the data cannot support.\n\nThe **DIKW** progression from data to information to knowledge to wisdom is the frame: volume alone adds data, and the accountant's job is turning it into something a manager can act on.",
    earns: [
      "Separating a property of the data from an activity performed on it",
      "Naming the management accounting uses and the risks",
    ],
    loses: ["Accepting any V-word as one of the characteristics"],
  },

  "PM-04::analytics": {
    title: "Which kind of analytics answers which question",
    format: "ot",
    marks: 2,
    requirement:
      "Analysis that recommends the action a manager should take, given the predicted outcome, is:\n\nA  Descriptive analytics\nB  Diagnostic analytics\nC  Predictive analytics\nD  Prescriptive analytics",
    plan: [
      {
        step: "Set the four types out in order with their question",
        detail:
          "Descriptive: what happened? Diagnostic: why did it happen? Predictive: what will happen? Prescriptive: what should we do about it? Each builds on the one before.",
      },
      {
        step: "Match the stem's verb",
        detail:
          "\"Recommends the action\" is prescriptive. The stem also says \"given the predicted outcome\", which places it one stage beyond prediction.",
      },
      {
        step: "Note where the accountant's value sits",
        detail:
          "Descriptive analysis is largely automated. The value lies in diagnostic and prescriptive work — explaining why and advising what to do — which is precisely what Section C asks for.",
      },
      {
        step: "Connect it back to the paper's structure",
        detail:
          "PM's constructed responses are prescriptive questions: compute, then explain, then recommend. A calculation alone is descriptive analysis, and it is why calculation-only answers score badly.",
      },
    ],
    answer:
      "**D — prescriptive analytics.**\n\nThe four types build on each other, each answering a different question: **descriptive** (what happened?), **diagnostic** (why did it happen?), **predictive** (what will happen?) and **prescriptive** (what should we do?). The stem's \"given the predicted outcome\" places it one stage beyond prediction.\n\nWhere the accountant's value sits is the point worth carrying. **Descriptive** analysis is largely automated — a system produces the variance report without help. The value lies in **diagnostic** and **prescriptive** work: explaining why the variance arose and advising what to do about it.\n\nThat maps directly onto this paper's structure. A PM constructed response is a prescriptive question — compute, then explain, then recommend — which is exactly why an answer that stops at the calculation has delivered only descriptive analysis and scores accordingly.",
    earns: [
      "Ordering the four types by the question each answers",
      "Connecting prescriptive analysis to what a Section C answer must do",
    ],
    loses: ["Choosing predictive, when the stem says the prediction has already been made"],
  },

  /* ── PM-05 · Activity-based costing ─────────────────────────── */

  "PM-05::mechanics": {
    title: "Computing a cost driver rate and applying it",
    format: "ot",
    marks: 2,
    requirement:
      "Setup costs are $240,000 a year across 600 setups. Product X needs 40 setups and produces 8,000 units. Under ABC the setup cost per unit of X is:\n\nA  $2.00\nB  $0.40\nC  $30.00\nD  $400.00",
    plan: [
      {
        step: "Compute the cost per driver first, never per unit",
        detail:
          "$240,000 ÷ 600 setups = $400 per setup. The driver rate always comes first in ABC, because the cost is caused by the activity rather than by output volume.",
      },
      {
        step: "Charge the product with the activity it consumed",
        detail:
          "40 setups × $400 = $16,000 of setup cost caused by X, independent of how many units it made.",
      },
      {
        step: "Only now divide by units",
        detail:
          "$16,000 ÷ 8,000 units = **$2.00 per unit**. The two-stage sequence is what ABC is, and option D is the driver rate reported as a unit cost.",
      },
      {
        step: "State the insight the numbers carry",
        detail:
          "A product needing the same 40 setups but making only 1,000 units would carry $16 per unit — eight times as much. Absorption on labour hours would spread setup cost by volume and hide that entirely.",
      },
    ],
    answer:
      "**A — $2.00.**\n\nCost per driver: $240,000 ÷ 600 = **$400 per setup**.\nCharged to X: 40 × $400 = **$16,000**.\nPer unit: $16,000 ÷ 8,000 = **$2.00**.\n\nOption D is the driver rate mistaken for a unit cost, and option B divides total setup cost by all units. The **two-stage sequence** — cost per driver, then cost per unit — is the whole method.\n\nThe insight is what a discussion answer must state: a product needing the same **40 setups** but making only **1,000 units** would carry **$16 per unit**, eight times as much. Traditional absorption on labour hours spreads setup cost by **volume** and hides that completely, which is why low-volume complex products are systematically **undercosted** and high-volume simple ones **overcosted**.\n\nThat cross-subsidy is what ABC exists to correct, and it changes pricing and product-mix decisions rather than merely restating the same total.",
    earns: [
      "Computing the driver rate before touching unit volumes",
      "Explaining the cross-subsidy with a concrete low-volume comparison",
    ],
    loses: ["Dividing total activity cost by total units, which reproduces the averaging ABC exists to avoid"],
  },

  "PM-05::implications": {
    title: "When ABC is worth implementing",
    format: "ot",
    marks: 2,
    requirement:
      "ABC is **least** likely to be worth implementing where a company:\n\nA  Has high overheads relative to direct costs\nB  Produces a single product in a single process\nC  Produces many products of differing volumes and complexity\nD  Faces price competition and needs accurate product costs",
    plan: [
      {
        step: "Identify what ABC delivers",
        detail:
          "A better allocation of overhead between DIFFERENT products. Its whole value is in the differences it reveals between them.",
      },
      {
        step: "Read the stem's polarity and find the case with no differences",
        detail:
          "Least likely. With a single product in a single process, all overhead attaches to that product however it is allocated — so ABC and absorption costing give the identical answer.",
      },
      {
        step: "Confirm the other three are conditions FOR ABC",
        detail:
          "High overheads relative to direct costs, product diversity, and a commercial need for accurate costs are all reasons to adopt it. Three point one way and one points the other.",
      },
      {
        step: "Name the costs of ABC for a discussion answer",
        detail:
          "Expensive to design and maintain, requires identifying drivers and collecting driver data, and many costs still have no clear driver. It does not remove arbitrariness — it reduces it.",
      },
    ],
    answer:
      "**B — produces a single product in a single process.**\n\nABC's value lies entirely in the **differences it reveals between products**. With one product, all overhead attaches to it however it is allocated, so ABC and absorption costing produce the **identical** answer and the implementation cost buys nothing.\n\nThe other three options are conditions **for** adopting ABC: high overheads relative to direct costs (so the allocation matters), product diversity in volume and complexity (so the cross-subsidy is large), and commercial need for accurate costs.\n\nThe costs belong in any discussion: ABC is **expensive to design and maintain**, requires identifying appropriate **drivers** and collecting driver data the system may not capture, and many costs — factory rates, the finance director's salary — still have **no clear driver** and must be apportioned arbitrarily.\n\nSo ABC does not remove arbitrariness; it **reduces** it, and only where the reduction is worth paying for.",
    earns: [
      "Recognising that ABC and absorption costing coincide with a single product",
      "Naming ABC's costs and that it reduces rather than removes arbitrariness",
    ],
    loses: ["Treating ABC as universally superior regardless of the production setting"],
  },

  /* ── PM-06 · Target costing ─────────────────────────────────── */

  "PM-06::mechanics": {
    title: "Deriving the target cost and the cost gap",
    format: "ot",
    marks: 2,
    requirement:
      "A product will sell for $80 and the company requires a margin of 30% of the selling price. Estimated cost is $62. The cost gap is:\n\nA  $6\nB  $18\nC  $56\nD  $24",
    plan: [
      {
        step: "Note the direction target costing works in",
        detail:
          "Market price first, then deduct the required margin, and the remainder is what the product MAY cost. Cost is the output of the calculation, not the input.",
      },
      {
        step: "Compute the margin on the stated base",
        detail:
          "30% OF SELLING PRICE = 30% × $80 = $24. Read the base carefully — 30% on cost would be a different figure and is the standard misreading.",
      },
      {
        step: "Derive the target cost, then the gap",
        detail:
          "Target cost = $80 − $24 = $56. Cost gap = estimated $62 − target $56 = **$6**.",
      },
      {
        step: "Name each intermediate figure, because they are all offered",
        detail:
          "$56 is the target cost, $24 is the margin, $18 is the profit at the estimated cost. Labelling each keeps the gap distinct from the target.",
      },
    ],
    answer:
      "**A — $6.**\n\nRequired margin = 30% × $80 = **$24**.\nTarget cost = $80 − $24 = **$56**.\nCost gap = $62 − $56 = **$6**.\n\nEvery figure in the calculation appears as an option — $56 is the target cost, $24 the margin, $18 the profit at the estimated cost — so naming each one before selecting is what keeps them apart.\n\nThe **direction** is what makes the technique examinable. **Cost-plus** starts from cost and adds a margin, so the market may simply refuse the resulting price. **Target costing starts from the market** and works back, so the gap must be closed **before production begins** — which is when most of a product's cost is still determined by design decisions.\n\nThat timing is the point: once the product is in production, the cost is largely locked in.",
    earns: [
      "Computing the margin on the stated base and naming each intermediate figure",
      "Explaining why working backwards from the market matters",
    ],
    loses: ["Reporting the target cost as the gap, or taking the margin on cost"],
  },

  "PM-06::closing-and-limits": {
    title: "How a cost gap is closed, and what will not close it",
    format: "ot",
    marks: 2,
    requirement:
      "Which is **least** likely to be an acceptable way of closing a cost gap?\n\nA  Redesigning the product to use fewer or cheaper components\nB  Negotiating better terms with suppliers or changing the production process\nC  Reducing the quality of the product below what the customer expects\nD  Removing features the customer does not value",
    plan: [
      {
        step: "Recall that target costing is customer-driven",
        detail:
          "The target price reflects what the customer will pay for a product with certain features. Cutting below what the customer expects destroys the price assumption the whole calculation rests on.",
      },
      {
        step: "See why option C is self-defeating",
        detail:
          "Reduce quality below expectations and the $80 price is no longer achievable. Closing the gap by breaking the assumption that generated the target is not closing it.",
      },
      {
        step: "Confirm the three legitimate routes",
        detail:
          "Value engineering and redesign, better procurement and process improvement, and removing features the customer does not value — which is value analysis applied at the design stage.",
      },
      {
        step: "Note what happens if the gap cannot be closed",
        detail:
          "The product should not be launched. That is a legitimate and important conclusion, and a discussion answer that never reaches it has missed the discipline the technique imposes.",
      },
    ],
    answer:
      "**C — reducing the quality of the product below what the customer expects.**\n\nTarget costing is **customer-driven**: the target price reflects what the customer will pay for a product with certain features. Cutting quality below expectations destroys that price assumption, so the $80 is no longer achievable and the gap has not been closed — it has been moved.\n\nThe legitimate routes are **value engineering and redesign**, **better procurement and process improvement**, and **removing features the customer does not value** — which is value analysis applied before production starts.\n\nThe conclusion a discussion answer must be willing to reach: if the gap **cannot** be closed, the product should **not be launched**. That is the discipline target costing imposes, and an answer that lists cost-cutting ideas indefinitely without contemplating abandonment has missed it.\n\nTarget costing works best on a new product with a long design phase; it struggles where the price is volatile or the product is already in production.",
    earns: [
      "Explaining why cutting quality breaks the price assumption",
      "Being willing to conclude the product should not be launched",
    ],
    loses: ["Treating any cost reduction as an acceptable way of closing the gap"],
  },

  /* ── PM-07 · Life-cycle costing ─────────────────────────────── */

  "PM-07::stages-and-calculation": {
    title: "Computing a life-cycle cost per unit",
    format: "ot",
    marks: 2,
    requirement:
      "A product will incur $600,000 of design and development cost, $1,400,000 of production cost and $200,000 of decommissioning cost over a total output of 50,000 units. The life-cycle cost per unit is:\n\nA  $28.00\nB  $44.00\nC  $40.00\nD  $12.00",
    plan: [
      {
        step: "Include every stage, which is the whole point of the technique",
        detail:
          "Design and development, manufacturing, and decommissioning. Omitting the pre-production or post-production cost is the error the technique exists to prevent.",
      },
      {
        step: "Total the costs across the whole life",
        detail:
          "$600,000 + $1,400,000 + $200,000 = **$2,200,000** total life-cycle cost.",
      },
      {
        step: "Divide by total lifetime output, not annual output",
        detail:
          "$2,200,000 ÷ 50,000 units = **$44.00 per unit**. The denominator must be lifetime output to match a lifetime numerator.",
      },
      {
        step: "Read the distractors as the omissions",
        detail:
          "$28.00 is production cost alone. $40.00 omits decommissioning. Each option drops one stage, which is exactly the mistake being tested.",
      },
    ],
    answer:
      "**B — $44.00.**\n\n($600,000 + $1,400,000 + $200,000) ÷ 50,000 = $2,200,000 ÷ 50,000 = **$44.00 per unit**.\n\nEach distractor omits a stage: **$28.00** is production cost alone, **$40.00** drops decommissioning. Those omissions are precisely what life-cycle costing exists to prevent.\n\nThe insight the figures deliver: production cost alone is $28, so a price set on production cost plus a margin could look profitable while the product **never recovers its $600,000 of development spend**. A product can show a profit in every period of its selling life and still destroy value over its life.\n\nThe corollary is that **most of a product's cost is committed at the design stage**, long before it is incurred — which is why life-cycle costing pairs naturally with target costing, and why cost reduction attempted during production is attacking cost that is already locked in.",
    earns: [
      "Including every stage and dividing by lifetime output",
      "Explaining that a product profitable each period can still fail over its life",
    ],
    loses: ["Omitting development or decommissioning cost, which is what each distractor does"],
  },

  "PM-07::implications": {
    title: "What life-cycle costing changes about a decision",
    format: "ot",
    marks: 2,
    requirement:
      "The principal management implication of life-cycle costing is that:\n\nA  Costs should be monitored monthly\nB  Most costs are committed at the design stage, so that is where cost reduction must happen\nC  Development costs should be written off immediately\nD  Products should be priced at production cost plus a margin",
    plan: [
      {
        step: "Identify what the technique reveals",
        detail:
          "The proportion of total cost determined before production starts. Once the design is fixed, the materials, the process and much of the support cost are fixed with it.",
      },
      {
        step: "Draw the management consequence",
        detail:
          "Cost reduction must happen at the DESIGN stage. Efforts during production attack cost that is already locked in, which is why they achieve so little.",
      },
      {
        step: "Reject the option the technique contradicts",
        detail:
          "Option D prices on production cost, which ignores the development and decommissioning spend life-cycle costing exists to bring into view.",
      },
      {
        step: "Note the extension of the cycle",
        detail:
          "Life cycles are shortening in many industries, which raises the proportion of cost that is development and makes recovering it harder — a point a discussion answer should reach.",
      },
    ],
    answer:
      "**B — most costs are committed at the design stage, so that is where cost reduction must happen.**\n\nThe technique reveals how much of total cost is **determined before production begins**: once the design is fixed, the materials, the process and much of the support cost are fixed with it.\n\nThe consequence is where the management effort must go. Cost reduction attempted **during production** attacks cost that is already committed, which is why it achieves so little — and why value engineering at the design stage achieves so much more.\n\nOption D is the practice the technique argues against: pricing on production cost ignores exactly the development and decommissioning spend that life-cycle costing brings into view.\n\nThe extension worth adding: life cycles are **shortening** in many industries, which raises the proportion of total cost that is development and makes recovery over a shorter selling period harder. That strengthens the case for the technique rather than weakening it.",
    earns: [
      "Drawing the design-stage consequence rather than restating the definition",
      "Noting shortening life cycles as a reason the technique matters more",
    ],
    loses: ["Choosing an option the technique exists to argue against"],
  },

  /* ── PM-08 · Throughput accounting ─────────────────────────── */

  "PM-08::theory-and-ratios": {
    title: "Computing the throughput accounting ratio",
    format: "ot",
    marks: 2,
    requirement:
      "A product sells for $50 with material cost of $20. It uses 0.5 hours on the bottleneck. Total factory costs are $180,000 for 3,000 bottleneck hours. The throughput accounting ratio is:\n\nA  1.00\nB  0.60\nC  1.67\nD  0.50",
    plan: [
      {
        step: "Compute the return per bottleneck hour",
        detail:
          "Throughput per unit = selling price − MATERIAL cost only = $50 − $20 = $30. Divided by 0.5 bottleneck hours = $60 per bottleneck hour. Only material is deducted; labour and overhead are treated as fixed.",
      },
      {
        step: "Compute the cost per bottleneck hour",
        detail:
          "$180,000 ÷ 3,000 hours = $60 per bottleneck hour. Total factory cost, not just overhead.",
      },
      {
        step: "Divide the first by the second",
        detail:
          "TPAR = return per bottleneck hour ÷ cost per bottleneck hour = $60 ÷ $60 = **1.00**.",
      },
      {
        step: "Interpret the result against 1",
        detail:
          "Above 1 the product is profitable, below 1 it is not, and exactly 1 is break-even. So this product covers its factory cost and no more.",
      },
    ],
    answer:
      "**A — 1.00.**\n\nThroughput per unit = $50 − **$20 material only** = $30. Return per bottleneck hour = $30 ÷ 0.5 = **$60**.\nCost per bottleneck hour = $180,000 ÷ 3,000 = **$60**.\nTPAR = $60 ÷ $60 = **1.00**.\n\nThe deduction of **material only** is what distinguishes throughput accounting from marginal costing. It treats labour and overhead as **fixed in the short term**, on the argument that they are committed and do not vary with the decision — so throughput is a wider figure than contribution.\n\nInterpretation against 1 is the second half: **above 1** the product earns more per bottleneck hour than the factory costs to run, **below 1** it does not, and **exactly 1** is break-even. This product covers its factory cost and no more.\n\nProducts are **ranked by return per bottleneck hour**, which can give a different order from ranking by contribution per unit of a limiting factor.",
    earns: [
      "Deducting material only, and knowing why labour is treated as fixed",
      "Interpreting the ratio against 1 rather than reporting a bare number",
    ],
    loses: ["Deducting labour as well, which computes contribution rather than throughput"],
  },

  "PM-08::managing-and-limits": {
    title: "The steps for managing a bottleneck, and what throughput ignores",
    format: "ot",
    marks: 2,
    requirement:
      "Under the theory of constraints, once a bottleneck has been identified and exploited to its maximum, the next step is to:\n\nA  Ignore it, as it cannot be changed\nB  Subordinate everything else to the bottleneck, then elevate it\nC  Increase production at every other stage\nD  Reduce the selling price",
    plan: [
      {
        step: "Recall the five steps in order",
        detail:
          "Identify the constraint; exploit it to its maximum; subordinate everything else to it; elevate it by increasing its capacity; then return to step one, because a new constraint will have appeared.",
      },
      {
        step: "Read the stem's position in the sequence",
        detail:
          "Identified and exploited, so the next step is to subordinate, then elevate. The order matters, and the question tests it.",
      },
      {
        step: "See why option C is precisely wrong",
        detail:
          "Increasing output at non-bottleneck stages produces inventory that cannot be processed. Subordination means the rest of the plant runs at the BOTTLENECK's pace, not its own maximum.",
      },
      {
        step: "Note what throughput accounting ignores",
        detail:
          "It treats all non-material cost as fixed, which is short-term. Over a longer horizon labour and overhead are variable, so throughput can justify decisions that lose money over time.",
      },
    ],
    answer:
      "**B — subordinate everything else to the bottleneck, then elevate it.**\n\nThe five steps run: **identify** the constraint, **exploit** it to its maximum, **subordinate** everything else to it, **elevate** it by increasing its capacity, and then **return to step one** — because once the constraint is relieved, a new one appears somewhere else.\n\nOption C is the instructive error. Increasing output at **non-bottleneck** stages produces work in progress that cannot be processed, so it converts cash into inventory and achieves nothing. **Subordination means the rest of the plant runs at the bottleneck's pace**, not at its own maximum — which is counter-intuitive to anyone measured on local efficiency, and is why the approach conflicts with traditional utilisation measures.\n\nWhat throughput accounting ignores is worth stating: it treats **all non-material cost as fixed**, which is a short-term assumption. Over a longer horizon labour and overhead are variable, so a decision justified by TPAR alone can lose money over time.",
    earns: [
      "Getting the five steps in order, and explaining why subordination means running slower",
      "Naming the short-term assumption as throughput accounting's limitation",
    ],
    loses: ["Maximising output at every stage, which converts cash into unusable inventory"],
  },

  /* ── PM-09 · Environmental and sustainability accounting ─────── */

  "PM-09::why-and-categories": {
    title: "Classifying an environmental cost",
    format: "ot",
    marks: 2,
    requirement:
      "The cost of cleaning up contaminated land after a spillage is which category of environmental cost?\n\nA  Prevention\nB  Detection\nC  Internal failure\nD  External failure",
    plan: [
      {
        step: "Set the four categories out with their timing",
        detail:
          "PREVENTION: spent to stop the damage occurring. DETECTION: spent to check compliance. INTERNAL FAILURE: damage has occurred and the cost falls on the company. EXTERNAL FAILURE: damage has occurred and the cost falls on society.",
      },
      {
        step: "Ask who bears this particular cost",
        detail:
          "The company pays for the clean-up, so the cost has been internalised. That makes it internal failure rather than external.",
      },
      {
        step: "Note the significance of the internal/external split",
        detail:
          "External failure costs — emissions, resource depletion — are borne by society and appear in no ledger. That invisibility is precisely why environmental management accounting exists.",
      },
      {
        step: "Note the prevention economics",
        detail:
          "Prevention is usually far cheaper than failure, but prevention is a visible discretionary spend while failure is a contingency — which is why prevention gets cut first.",
      },
    ],
    answer:
      "**C — internal failure.**\n\nThe four categories split on timing and on who bears the cost. **Prevention**: spent to stop damage occurring. **Detection**: spent to check compliance. **Internal failure**: damage has occurred and the company bears the cost. **External failure**: damage has occurred and **society** bears it.\n\nThe company pays for this clean-up, so the cost is **internalised** — internal failure.\n\nThe significance of the split is the examinable point: **external failure costs** such as emissions and resource depletion are borne by society and appear in **no ledger at all**. That invisibility is why environmental management accounting exists — a company optimising only the costs it can see will systematically over-pollute.\n\nThe economics follow: **prevention is usually far cheaper than failure**, but prevention is a visible discretionary spend while failure is a contingency that may never materialise — which is exactly why prevention budgets are cut first.",
    earns: [
      "Classifying by who bears the cost, and explaining why external costs are invisible",
      "Naming the prevention-versus-failure economics",
    ],
    loses: ["Calling a clean-up external failure because the damage was environmental"],
  },

  "PM-09::techniques": {
    title: "Which environmental accounting technique to use",
    format: "ot",
    marks: 2,
    requirement:
      "A company wants to trace the physical flow of materials through its processes to identify waste in quantity terms as well as in money. The appropriate technique is:\n\nA  Input-output analysis\nB  Environmental activity-based costing\nC  Life-cycle costing\nD  Target costing",
    plan: [
      {
        step: "Read what the requirement asks for",
        detail:
          "Physical flow, in quantity terms as well as money. That is a materials-tracing requirement, not a cost-allocation one.",
      },
      {
        step: "Match the technique to it",
        detail:
          "Input-output analysis balances what goes in against what comes out — what is not in the product is waste, and it is measured in physical units as well as cost.",
      },
      {
        step: "Place the other techniques correctly",
        detail:
          "Environmental ABC allocates environmental costs to cost drivers rather than absorbing them into general overhead. Life-cycle costing extends the horizon. Flow cost accounting divides material flows into material, system and delivery costs.",
      },
      {
        step: "Note why physical measurement matters",
        detail:
          "Waste measured in money is easy to overlook when input prices are low. Measured in tonnes it is visible, and it also feeds the reporting obligations.",
      },
    ],
    answer:
      "**A — input-output analysis.**\n\nInput-output analysis balances **what goes in against what comes out**: what does not leave in the product is waste. It measures in **physical units as well as money**, which is exactly the requirement stated.\n\nThe other techniques answer different questions. **Environmental ABC** allocates environmental costs to their **drivers** rather than burying them in general overhead — which stops a clean product subsidising a dirty one. **Life-cycle costing** extends the horizon to include decommissioning. **Flow cost accounting** divides material flows into material, system and delivery costs.\n\nWhy physical measurement matters: waste expressed in money is easy to overlook when input prices are low, while waste expressed in **tonnes** is visible and hard to argue with. It also feeds the reporting obligations, and it makes the business case — waste is material paid for and not sold, so reducing it improves margin as well as environmental performance.",
    earns: [
      "Matching a physical-flow requirement to input-output analysis",
      "Naming what environmental ABC prevents — a clean product subsidising a dirty one",
    ],
    loses: ["Choosing a cost-allocation technique for a physical measurement requirement"],
  },

  "PM-09::sustainability": {
    title: "What sustainability reporting adds",
    format: "ot",
    marks: 2,
    requirement:
      "The concept of the triple bottom line requires an organisation to report on:\n\nA  Profit, cash and net assets\nB  Economic, social and environmental performance\nC  Revenue, cost and profit\nD  Past, present and forecast profit",
    plan: [
      {
        step: "Recall the three dimensions",
        detail:
          "Economic, social and environmental performance — often summarised as profit, people and planet. Three dimensions, not three financial measures.",
      },
      {
        step: "Reject the options that are all financial",
        detail:
          "A, C and D each offer three FINANCIAL measures. The whole point of the triple bottom line is that financial performance alone is an inadequate account.",
      },
      {
        step: "Note why organisations report it",
        detail:
          "Investor and lender demand, regulatory requirement in some jurisdictions, reputational management, and because what is measured gets managed.",
      },
      {
        step: "Note the criticism a discussion answer should raise",
        detail:
          "Social and environmental performance is hard to measure and easy to present selectively. Voluntary reporting invites greenwashing, which is why comparability and assurance matter.",
      },
    ],
    answer:
      "**B — economic, social and environmental performance.**\n\nOften summarised as **profit, people and planet**. Options A, C and D each offer three **financial** measures, which is precisely the account the triple bottom line says is inadequate.\n\nOrganisations report it because of investor and lender demand, regulatory requirement in some jurisdictions, reputational management, and because **what is measured gets managed** — the same principle that runs through the whole of Area E.\n\nThe criticism belongs in a discussion answer: social and environmental performance is **hard to measure** and **easy to present selectively**, and voluntary reporting invites **greenwashing** — reporting the favourable metrics and omitting the rest. That is why **comparability**, a recognised framework and **external assurance** matter, and why sustainability reporting is moving from voluntary narrative towards regulated disclosure.\n\nFor a management accountant the practical link is that sustainability targets need the same properties as any performance measure: relevant, controllable, timely and resistant to manipulation.",
    earns: [
      "Naming the three dimensions and why financial measures alone are inadequate",
      "Raising greenwashing and the need for assurance",
    ],
    loses: ["Choosing three financial measures, which is the position the concept argues against"],
  },

  /* ── PM-10 · Choosing between the Area B techniques ──────────── */

  "PM-10::which-question": {
    title: "Selecting the technique the problem calls for",
    format: "ot",
    marks: 2,
    requirement:
      "A company's production is constrained by one machine, and it must decide which products to make. The most appropriate technique is:\n\nA  Target costing\nB  Throughput accounting, ranking products by return per bottleneck hour\nC  Life-cycle costing\nD  Activity-based costing",
    plan: [
      {
        step: "Read the problem, then pick the technique",
        detail:
          "One binding constraint and a product-mix decision. That is a limiting factor problem, and throughput accounting is the Area B technique built for it.",
      },
      {
        step: "Match each technique to its own question",
        detail:
          "ABC: what does each product really cost, where overheads are large and products differ? Target costing: what may this product cost if the market sets the price? Life-cycle costing: is this product worth making over its whole life? Throughput: which products, given a bottleneck?",
      },
      {
        step: "Note that the techniques are not alternatives",
        detail:
          "They answer different questions and a company may use several. A question naming a constraint is asking for throughput or limiting factor analysis specifically.",
      },
      {
        step: "Note the ranking basis, since it is the examinable detail",
        detail:
          "Rank by return per BOTTLENECK hour, not by contribution per unit. The two can give different orders, and the bottleneck ranking is the one that maximises profit when capacity binds.",
      },
    ],
    answer:
      "**B — throughput accounting, ranking products by return per bottleneck hour.**\n\nRead the problem before reaching for a technique. One binding constraint plus a product-mix decision is a **limiting factor** problem, and throughput accounting is the Area B technique built for it.\n\nEach technique answers its own question: **ABC** — what does each product really cost, where overheads are large and products differ in volume and complexity? **Target costing** — what may this product cost, if the market sets the price? **Life-cycle costing** — is this product worth making across its whole life? **Throughput** — which products should we make, given a bottleneck?\n\nThey are **not alternatives**; a company may use several, and a question naming a constraint is asking for this one specifically.\n\nThe examinable detail is the ranking basis: rank by **return per bottleneck hour**, not by contribution per unit. The two can produce different orders, and when capacity binds it is the bottleneck ranking that maximises profit.",
    earns: [
      "Reading the problem first, and knowing the techniques answer different questions",
      "Ranking by return per bottleneck hour rather than by contribution per unit",
    ],
    loses: ["Selecting a costing technique for what is a capacity allocation problem"],
  },
}
