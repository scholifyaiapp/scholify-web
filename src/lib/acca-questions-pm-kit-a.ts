import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi } from "@/lib/acca-pm-kit-builders"

/*
 * PM · Area A question kit — chapters 1 to 4.
 *
 * Information, technologies and systems: what makes information useful and whether a
 * system is worth having, networks and the control of management information, the types
 * of system and how their output is presented, and big data and analytics.
 *
 * Area A is the one part of PM that is almost entirely discursive, so this section of the
 * kit is MCQ and multiple-response throughout — there is no calculation here to test with
 * numeric entry, and inventing one would misrepresent the paper.
 *
 * Authored, applied, exam-standard at PM's uniform 2 marks. Original Scholify content.
 * No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 1 · Information systems, and whether they are worth having ── */

const CH01: AccaQuestion[] = [
  q("PMK-01-01", "PM-01", "A", "easy",
    "A weekly sales report is accurate, complete and clearly presented, but reaches managers eleven days after the week it covers. Which quality of useful information does it fail?",
    ["Accuracy", "Timeliness", "Completeness", "Relevance"],
    1,
    "TIMELINESS. Information must arrive while a decision can still be changed by it. An eleven-day lag on a weekly report means the following week is already half over, so nothing in it can be acted on — and no amount of accuracy compensates for that."),

  q("PMK-01-02", "PM-01", "A", "medium",
    "A board asks for daily gross margin by product line for 400 products. The purchasing cycle for these products is quarterly. What is the most valid criticism of the request?",
    [
      "The information would not be accurate enough to rely on",
      "The frequency does not match the decision cycle, so the extra reporting cost buys no extra decisions",
      "Gross margin is the wrong measure for a board",
      "400 products is too many to report on at any frequency",
    ],
    1,
    "FREQUENCY MUST FOLLOW THE DECISION. If purchasing decisions are made quarterly, daily data cannot change any of them, so the reporting cost is incurred for nothing. Frequency should be set by how often a decision can actually be taken, not by how often the system is capable of producing a figure."),

  multi("PMK-01-03", "PM-01", "A", "medium",
    "Which of the following are costs of information that are frequently OMITTED from a system appraisal? Select TWO.",
    [
      "The software licence fee",
      "Management and staff time spent reading, interpreting and reconciling reports",
      "The hardware purchase price",
      "Loss of managerial attention to unmeasured aspects of performance",
    ],
    [1, 3],
    "MANAGEMENT TIME and DIVERTED ATTENTION. Licences and hardware appear in every business case because they are invoiced. The time managers spend consuming information, and the aspects of the business they stop watching because the new report does not cover them, are real costs that no supplier quotes and that appraisals routinely miss."),

  q("PMK-01-04", "PM-01", "A", "medium",
    "A proposed system's quantifiable savings are £180,000 a year against a cost of £220,000 a year. The finance director recommends rejection. What is the strongest counter-argument?",
    [
      "The savings estimate is probably conservative",
      "The unquantifiable benefits — better decisions, faster response, improved control — may exceed the £40,000 gap, and should be evaluated rather than valued at nil",
      "The costs will fall over time as the system is depreciated",
      "Competitors have already implemented similar systems",
    ],
    1,
    "The UNQUANTIFIABLE BENEFITS must be evaluated, not ignored. Rejecting on a £40,000 arithmetic gap treats every benefit that resists measurement as worth exactly zero, which is the commonest error in appraising an information system. The right approach is to state what those benefits are, judge whether they plausibly exceed £40,000, and decide explicitly."),

  q("PMK-01-05", "PM-01", "A", "medium",
    "Information is described as having 'value' only in a particular circumstance. Which?",
    [
      "When it is accurate",
      "When it changes a decision, or confirms one with enough confidence to act",
      "When it is produced more cheaply than before",
      "When it is available to all managers equally",
    ],
    1,
    "When it CHANGES A DECISION — or confirms one confidently enough to commit. Information that would not alter any action, however accurate and however cheap, has no decision value. This is the test to apply to any proposed report in an exam scenario."),

  q("PMK-01-06", "PM-01", "A", "hard",
    "A retailer's system produces a 90-page daily exception report. Managers say they read the first two pages. What has gone wrong, in performance management terms?",
    [
      "The system is inaccurate",
      "Exception reporting has been implemented without setting meaningful thresholds, so everything is an exception and nothing is",
      "Managers need more training",
      "The report should be produced weekly instead",
    ],
    1,
    "THE THRESHOLDS ARE MEANINGLESS. Exception reporting works by reporting only what needs action; if 90 pages qualify, the filter is not filtering. The fix is to set materiality and trend thresholds so the exceptions are genuinely exceptional — the same point that governs variance investigation in Area D."),

  q("PMK-01-07", "PM-01", "A", "easy",
    "Which of the following best describes 'granularity' of information?",
    [
      "How frequently it is reported",
      "The level of detail at which it is held and reported",
      "How accurate it is",
      "How many managers receive it",
    ],
    1,
    "THE LEVEL OF DETAIL. Granularity is about how finely the data is broken down — by product, by store, by hour, by customer. It is distinct from frequency (how often), and like frequency it should follow the decision being supported rather than the system's capability."),

  multi("PMK-01-08", "PM-01", "A", "medium",
    "Which of the following describe the relationship between DATA and INFORMATION? Select TWO.",
    [
      "Data and information are interchangeable terms",
      "Data are raw facts; information is data processed into a form useful for a decision",
      "Information always costs more to produce than the data it comes from",
      "The same data can produce different information depending on the decision it is processed for",
    ],
    [1, 3],
    "DATA ARE RAW FACTS PROCESSED INTO INFORMATION, and the SAME DATA CAN YIELD DIFFERENT INFORMATION depending on the question asked. The distinction matters in practice: an organisation can be rich in data and poor in information, which is precisely the big data problem of chapter 4."),

  q("PMK-01-09", "PM-01", "A", "medium",
    "A manufacturer's board receives a monthly pack containing 46 KPIs. Which criticism is most likely to earn marks in a PM answer?",
    [
      "46 is too few to manage a manufacturer",
      "Without a small number of prioritised measures there is no focus, and conflicts between the 46 are left for managers to resolve arbitrarily",
      "The pack should be produced weekly",
      "KPIs should be financial only at board level",
    ],
    1,
    "TOO MANY MEASURES MEANS NO FOCUS, and unresolved conflicts between them. Where 46 indicators are reported without priority, a manager who cannot satisfy them all chooses which to satisfy — so the measurement system has delegated the organisation's priorities by accident."),

  q("PMK-01-10", "PM-01", "A", "hard",
    "A company is deciding whether to invest in a system that will reduce stock-outs. Which is the most defensible way to appraise the benefit?",
    [
      "Value it at nil, since lost sales cannot be measured reliably",
      "Estimate the lost contribution on stock-outs from historical stock-out records and the products' contribution per unit, and state the estimate's basis and sensitivity",
      "Use the supplier's published customer benefit figures",
      "Assume the benefit equals the system's cost, so the decision is neutral",
    ],
    1,
    "ESTIMATE IT AND STATE THE BASIS. A benefit that resists precise measurement should be estimated from what the company does know — its own stock-out records and contribution per unit — with the assumptions and sensitivities disclosed. Valuing it at nil is a decision to ignore it, and using a supplier's figures imports an interested party's estimate."),

  q("PMK-01-11", "PM-01", "A", "medium",
    "Which quality of information is compromised when a divisional manager excludes an unfavourable product line from a report on the grounds that it is being discontinued?",
    ["Timeliness", "Completeness", "Cost-effectiveness", "Granularity"],
    1,
    "COMPLETENESS. The report omits information a user needs to understand the position, and the manager's reason — that the line is being discontinued — is exactly the kind of judgement the reader should be allowed to make for themselves. Note that the omission also makes the report misleading without making any individual figure inaccurate."),

  q("PMK-01-12", "PM-01", "A", "hard",
    "A CEO says: 'Our new system gives us information in real time, so our decisions will be better.' What is the flaw in this reasoning?",
    [
      "Real-time data is always less accurate",
      "Speed of information does not improve a decision unless the decision can be made and acted on at that speed",
      "Real-time systems are too expensive to justify",
      "Managers prefer weekly reporting",
    ],
    1,
    "SPEED ONLY HELPS IF THE DECISION CAN MOVE AT THAT SPEED. Real-time information about a variable that is reviewed monthly, or governed by a quarterly contract, changes nothing. Worse, real-time data invites reaction to random fluctuation — the same error as investigating every small variance in Area D."),
]

/* ── Chapter 2 · Networks, and the control of management information ── */

const CH02: AccaQuestion[] = [
  q("PMK-02-01", "PM-02", "A", "easy",
    "What distinguishes an INTRANET from an EXTRANET?",
    [
      "An intranet uses the internet and an extranet does not",
      "An intranet is internal to the organisation; an extranet extends controlled access to selected external parties such as suppliers or customers",
      "An extranet is available to the general public",
      "An intranet cannot host financial information",
    ],
    1,
    "AN EXTRANET EXTENDS CONTROLLED ACCESS OUTSIDE. An intranet serves the organisation's own staff; an extranet lets named external parties — suppliers checking stock, customers tracking orders — into a defined part of it. Neither is public, which is what distinguishes both from a website."),

  q("PMK-02-02", "PM-02", "A", "medium",
    "A company moves its management accounts to a public cloud provider. Which control concern is MOST specific to that decision, rather than being present in any system?",
    [
      "Users may choose weak passwords",
      "Data is held by a third party in an unknown location, so the company must rely on the provider's controls and may face data-residency and continuity risk",
      "Reports may contain errors",
      "Staff may need training",
    ],
    1,
    "RELIANCE ON A THIRD PARTY, in an unknown jurisdiction. Weak passwords, report errors and training needs exist in any system. What cloud adds is that the company no longer holds its own data: continuity depends on the provider's solvency and service levels, and data-residency rules may restrict where it can legally sit."),

  multi("PMK-02-03", "PM-02", "A", "medium",
    "Which of the following are GENERAL controls rather than application controls? Select TWO.",
    [
      "A check that a purchase order total agrees to the sum of its lines",
      "Physical access restrictions to the server room",
      "A range check rejecting a labour rate above £200 an hour",
      "Segregation of duties between systems development and operations",
    ],
    [1, 3],
    "PHYSICAL ACCESS and SEGREGATION OF DUTIES are GENERAL controls — they protect the environment in which all applications run. The order-total check and the range check are APPLICATION controls, operating inside one process on one type of transaction."),

  q("PMK-02-04", "PM-02", "A", "medium",
    "A management accountant emails a spreadsheet of divisional results to twelve managers each month. Which is the most significant control weakness?",
    [
      "Email is slow",
      "There is no version control, so twelve copies can be edited independently and no one figure is authoritative",
      "Spreadsheets cannot hold enough data",
      "Managers may not read it",
    ],
    1,
    "NO VERSION CONTROL. Once twelve copies exist they diverge, each manager can amend theirs, and there is no single authoritative figure — so a meeting can be held in which two managers quote different numbers for the same division. The remedy is a single controlled source that everyone reads rather than a file that everyone holds."),

  q("PMK-02-05", "PM-02", "A", "hard",
    "A company's payroll data is described as 'highly confidential'. Which control best reflects that classification, beyond the general controls applying to all data?",
    [
      "Daily backup of the payroll files",
      "Access restricted by role to named individuals, with access logged and the log independently reviewed",
      "Antivirus software on all workstations",
      "A documented disaster recovery plan",
    ],
    1,
    "ROLE-BASED ACCESS THAT IS LOGGED AND REVIEWED. Backup, antivirus and disaster recovery protect availability and integrity for all data. Confidentiality specifically requires that access be restricted to those who need it and that the restriction be MONITORED — an unreviewed access log deters nobody."),

  q("PMK-02-06", "PM-02", "A", "medium",
    "Which describes the principal management information risk of a WIDE AREA NETWORK connecting overseas subsidiaries?",
    [
      "Data cannot be consolidated across a WAN",
      "Data in transit passes over links the company may not control, and inconsistent local practices can make consolidated information unreliable",
      "WANs are slower than local networks, so information is never timely",
      "Currency translation cannot be automated",
    ],
    1,
    "TRANSIT OVER UNCONTROLLED LINKS, plus INCONSISTENT LOCAL PRACTICE. The security exposure is the obvious half; the management accounting half is that a consolidated report is only as good as the least consistent subsidiary's coding and cut-off, which is a control problem rather than a network one."),

  q("PMK-02-07", "PM-02", "A", "easy",
    "Which of these is an INTERNAL source of management information?",
    ["A trade association benchmarking survey", "The payroll system", "A competitor's published financial statements", "Government inflation statistics"],
    1,
    "THE PAYROLL SYSTEM. The other three are external sources. The distinction matters because internal sources are controllable and consistent but inward-looking, while external sources give context the organisation's own records can never supply."),

  multi("PMK-02-08", "PM-02", "A", "medium",
    "Which of the following are legitimate management uses of EXTERNAL information sources? Select TWO.",
    [
      "Benchmarking cost per unit against a trade association average",
      "Replacing the internal costing system with published industry figures",
      "Adjusting a sales forecast for published economic growth projections",
      "Setting standard costs from a competitor's financial statements",
    ],
    [0, 2],
    "BENCHMARKING and ADJUSTING A FORECAST. External data supplies context the company cannot generate internally. It cannot replace an internal costing system, and a competitor's published statements are far too aggregated and too differently constructed to set standards from."),

  q("PMK-02-09", "PM-02", "A", "hard",
    "A CFO wants to reduce information system control costs. Which principle should guide which controls to cut?",
    [
      "Cut application controls first, since general controls are mandatory",
      "Controls should be proportionate to the value and sensitivity of what they protect, so cut where the exposure is smallest",
      "Cut whichever controls staff complain about most",
      "Controls should never be reduced",
    ],
    1,
    "PROPORTIONALITY to value and sensitivity. A control costing more than the exposure it prevents is not worth having, so the question is where the exposure is smallest — not which category is nominally more important, and certainly not which is least popular."),

  q("PMK-02-10", "PM-02", "A", "medium",
    "Staff routinely share a single login for a reporting system 'because it is quicker'. What is the principal consequence for management information?",
    [
      "Reports will contain arithmetic errors",
      "Accountability is lost — no action can be traced to an individual, so neither error nor misuse can be investigated",
      "The system will run more slowly",
      "Backups will be incomplete",
    ],
    1,
    "ACCOUNTABILITY IS LOST. A shared login makes the audit trail useless: an incorrect or improper change cannot be traced to anyone, so neither honest error nor deliberate misuse can be followed up. The convenience is real and the control cost is total."),

  q("PMK-02-11", "PM-02", "A", "medium",
    "What is the main management information advantage of an integrated ERP system over separate functional systems?",
    [
      "It is always cheaper to run",
      "A single data source removes reconciliation between functions, so one authoritative figure serves finance, operations and sales",
      "It requires no controls",
      "It eliminates the need for management judgement",
    ],
    1,
    "A SINGLE AUTHORITATIVE DATA SOURCE. Separate systems must be reconciled, and reconciliation both costs time and produces arguments about which figure is right. Integration removes that — at the cost of much greater dependence on the one system, which is the corresponding disadvantage."),

  q("PMK-02-12", "PM-02", "A", "hard",
    "A company discovers a divisional manager altered a spreadsheet formula so that a cost allocation favoured their division. Which control would MOST directly have prevented it?",
    [
      "More frequent reporting",
      "Locking the calculation logic so the reported figure is produced centrally, with input cells the only editable part",
      "Additional staff training on spreadsheet use",
      "A stronger password policy",
    ],
    1,
    "LOCKING THE CALCULATION LOGIC. If a manager can edit the formula that computes their own result, no amount of training, frequency or password strength addresses the exposure. Centralising the logic and leaving only inputs editable removes the opportunity — which is why spreadsheet control is a real management information issue and not a technicality."),
]

/* ── Chapter 3 · Types of information system, and presentation ── */

const CH03: AccaQuestion[] = [
  q("PMK-03-01", "PM-03", "A", "easy",
    "Which system is designed to record and process the routine high-volume transactions of a business?",
    ["An executive information system", "A transaction processing system", "A decision support system", "An expert system"],
    1,
    "A TRANSACTION PROCESSING SYSTEM. It handles the routine, structured, high-volume work — sales orders, payments, payroll — and it is the foundation the others draw on. Every higher-level system is only as reliable as the TPS beneath it."),

  q("PMK-03-02", "PM-03", "A", "medium",
    "Which best describes the relationship between the levels of information system, and is the examinable point?",
    [
      "They operate independently of each other",
      "Each level draws its data from the level below, so an executive information system inherits every weakness in the transaction processing system feeding it",
      "Higher-level systems replace lower-level ones",
      "Only the executive information system needs controls",
    ],
    1,
    "EACH LEVEL DRAWS ON THE ONE BELOW, so weaknesses propagate UPWARDS. A polished executive dashboard built on badly coded transactions is confidently wrong, and that dependency is the point exam questions are built on."),

  q("PMK-03-03", "PM-03", "A", "medium",
    "A production director needs to compare the cost of five different shift patterns under varying demand assumptions. Which system is most appropriate?",
    ["A transaction processing system", "A decision support system", "An executive information system", "An office automation system"],
    1,
    "A DECISION SUPPORT SYSTEM. It exists for exactly this — modelling semi-structured problems with what-if analysis over alternatives and assumptions. A TPS records what happened, and an EIS summarises it; neither models alternatives that have not happened."),

  multi("PMK-03-04", "PM-03", "A", "medium",
    "Which of the following are characteristic of an EXECUTIVE INFORMATION SYSTEM? Select TWO.",
    [
      "Highly summarised information with the ability to drill down to detail",
      "Detailed transaction-level recording of every sale",
      "Integration of external data with internal results",
      "Automated approval of purchase orders below a threshold",
    ],
    [0, 2],
    "SUMMARY WITH DRILL-DOWN, and INTEGRATION OF EXTERNAL DATA. An EIS serves senior management, so it presents a small number of high-level indicators while allowing the user to go deeper on anything that looks wrong, and it sets internal results against market and competitor context. Transaction recording and order approval are TPS functions."),

  q("PMK-03-05", "PM-03", "A", "hard",
    "A board's dashboard shows all indicators green while the company is losing market share. What is the most likely explanation?",
    [
      "The dashboard software is faulty",
      "The dashboard measures what the internal systems capture, and market share depends on external data that has not been integrated",
      "The board is not reading it correctly",
      "Market share is not a valid measure",
    ],
    1,
    "IT MEASURES ONLY WHAT THE INTERNAL SYSTEMS CAPTURE. Internal data can only report the company's own performance, so a business can hit every internal target while a growing market leaves it behind. Integrating external market data is what makes a dashboard capable of reporting relative performance at all."),

  q("PMK-03-06", "PM-03", "A", "medium",
    "Why does data VISUALISATION matter to management information, in performance management terms?",
    [
      "It makes reports look more professional",
      "It lets a manager perceive trend, exception and relationship faster than a table permits, so more of the available attention goes on deciding rather than reading",
      "It removes the need for accuracy",
      "It reduces the volume of data that must be collected",
    ],
    1,
    "IT CONVERTS READING TIME INTO DECIDING TIME. Management attention is the scarce resource; a chart that reveals a trend at a glance leaves more of that attention for the decision. It does not reduce the data needed, and it certainly does not excuse inaccuracy — a well-designed chart of wrong data is more persuasive and therefore more dangerous."),

  q("PMK-03-07", "PM-03", "A", "medium",
    "Which criticism of a well-designed dashboard is valid?",
    [
      "It cannot display financial information",
      "A polished presentation implies the underlying data is controlled, and it may not be",
      "It is always slower than a printed report",
      "It cannot be used by senior management",
    ],
    1,
    "PRESENTATION IMPLIES CONTROL THAT MAY NOT EXIST. The quality of the visual carries an unearned assurance about the quality of the data, which is why a dashboard implementation should be accompanied by work on the data feeding it rather than instead of it."),

  q("PMK-03-08", "PM-03", "A", "easy",
    "What is the primary purpose of a KNOWLEDGE MANAGEMENT system?",
    [
      "To process transactions more quickly",
      "To capture, store and make available the organisation's expertise and experience so it is not lost with individuals",
      "To produce statutory financial statements",
      "To monitor network security",
    ],
    1,
    "TO RETAIN AND SHARE EXPERTISE. Its value is that knowledge held only in individuals' heads leaves when they do, and knowledge held in one office does not benefit another. This matters for performance because it is what allows learning in one part of a business to reach the rest of it."),

  q("PMK-03-09", "PM-03", "A", "medium",
    "An EXPERT SYSTEM differs from a decision support system principally because it:",
    [
      "Handles larger volumes of data",
      "Applies encoded rules and expertise to reach a recommendation, rather than helping a user model alternatives",
      "Is used only by senior management",
      "Does not require any data input",
    ],
    1,
    "IT APPLIES ENCODED EXPERTISE TO RECOMMEND. A DSS puts the modelling in the user's hands; an expert system holds the specialist rules itself and produces a conclusion — credit scoring or diagnostic systems being the standard examples. The trade-off is transparency: a user may not be able to see why it concluded what it did."),

  q("PMK-03-10", "PM-03", "A", "hard",
    "A company selects a system principally because of its reporting features, and finds after implementation that data entry takes operational staff twice as long. What error was made in the selection?",
    [
      "Insufficient attention to the reporting requirement",
      "The appraisal weighed the benefit to information users without costing the burden on the data producers",
      "The wrong type of system was chosen",
      "Training was inadequate",
    ],
    1,
    "THE COST TO DATA PRODUCERS WAS NOT COUNTED. Every management information system is fed by operational staff, and a design that shifts effort onto them to make reporting elegant can easily cost more than it delivers — and tends to degrade data quality as well, as pressured staff take shortcuts."),

  multi("PMK-03-11", "PM-03", "A", "medium",
    "Which of the following are appropriate uses of a decision support system in a PM context? Select TWO.",
    [
      "Testing the sensitivity of a breakeven point to a change in selling price",
      "Recording the daily cash receipts",
      "Modelling the profit effect of alternative product mixes under a machine constraint",
      "Producing the statutory annual accounts",
    ],
    [0, 2],
    "SENSITIVITY TESTING and MIX MODELLING under a constraint. Both are semi-structured problems with alternatives to compare, which is what a DSS is for. Recording receipts is transaction processing and statutory accounts are a reporting output, neither of which involves modelling alternatives."),

  q("PMK-03-12", "PM-03", "A", "medium",
    "A manager asks for a report to be presented as a table of 200 rows rather than a chart, saying charts 'hide the detail'. What is the balanced response?",
    [
      "The manager is wrong; charts are always superior",
      "Both are needed — a chart to identify where attention should go, with the detail available beneath it for the items the chart flags",
      "The manager is right; tables should always be used for management information",
      "Neither is suitable; a written narrative should be used",
    ],
    1,
    "BOTH, LAYERED. The chart directs attention and the table answers the question the chart raises — which is exactly the drill-down principle of an executive information system. Choosing one and abandoning the other loses either the overview or the evidence."),
]

/* ── Chapter 4 · Big data and data analytics ── */

const CH04: AccaQuestion[] = [
  q("PMK-04-01", "PM-04", "A", "easy",
    "Which of the 'V's of big data refers to the TRUSTWORTHINESS of the data?",
    ["Volume", "Velocity", "Veracity", "Variety"],
    2,
    "VERACITY. Volume is how much, velocity is how fast it arrives, variety is how many forms it takes. Veracity — whether it can be trusted — and value are the two that answer exam questions, because they decide whether any of the other three is worth having."),

  q("PMK-04-02", "PM-04", "A", "medium",
    "A retailer holds 40 terabytes of clickstream data and has made no decision differently as a result. Which 'V' is the problem?",
    ["Volume", "Value", "Velocity", "Variety"],
    1,
    "VALUE. The volume is impressive and irrelevant. Value asks whether the data supports a decision, and data that has changed nothing has produced none — which is the most common real-world failure of a big data investment and the one an exam scenario usually describes."),

  multi("PMK-04-03", "PM-04", "A", "medium",
    "Which of the following are examples of UNSTRUCTURED data? Select TWO.",
    [
      "A sales ledger balance",
      "Customer service call recordings",
      "Free-text responses to a satisfaction survey",
      "A monthly trial balance",
    ],
    [1, 2],
    "CALL RECORDINGS and FREE-TEXT RESPONSES. Neither fits rows and columns, which is what makes 'variety' a genuine challenge: extracting anything usable requires analysis techniques quite different from those a ledger needs. Ledger balances and a trial balance are structured."),

  q("PMK-04-04", "PM-04", "A", "medium",
    "What distinguishes PREDICTIVE from PRESCRIPTIVE analytics?",
    [
      "Predictive uses more data",
      "Predictive estimates what is likely to happen; prescriptive recommends what to do about it",
      "Prescriptive is only used in manufacturing",
      "They are alternative names for the same technique",
    ],
    1,
    "PREDICTIVE FORECASTS, PRESCRIPTIVE RECOMMENDS. Predicting that a customer is likely to leave is not the same as recommending which retention offer to make to them. The distinction matters because organisations frequently buy predictive capability and then have no process for acting on what it says."),

  q("PMK-04-05", "PM-04", "A", "easy",
    "Which type of analytics answers the question 'why did this happen'?",
    ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
    1,
    "DIAGNOSTIC. Descriptive reports what happened, diagnostic explains why, predictive estimates what will happen next, and prescriptive recommends the action. The four form a ladder of increasing value and increasing difficulty."),

  multi("PMK-04-06", "PM-04", "A", "medium",
    "Which of the following are genuine BENEFITS of big data analytics for performance management? Select TWO.",
    [
      "It removes the need for management judgement",
      "Customer behaviour can be analysed at individual rather than segment level, supporting targeted pricing and retention",
      "It guarantees the accuracy of the underlying data",
      "Operational data such as machine sensor output allows failures to be predicted before they occur",
    ],
    [1, 3],
    "INDIVIDUAL-LEVEL CUSTOMER ANALYSIS and PREDICTIVE MAINTENANCE. Both are real and both change decisions. Analytics does not replace judgement — it informs it — and it certainly cannot make untrustworthy source data accurate."),

  q("PMK-04-07", "PM-04", "A", "hard",
    "An analytics team reports that customers who buy product A are 40% more likely to buy product B. Management proposes to promote B to every buyer of A. What is the principal analytical caution?",
    [
      "The sample is probably too small",
      "Correlation is not causation — the association may reflect a common cause, so the promotion may change nothing",
      "40% is not a material difference",
      "Product B may be unprofitable",
    ],
    1,
    "CORRELATION IS NOT CAUSATION. Buyers of A may simply be a type of customer who also wants B, in which case promoting B to them changes nothing they were not already going to do. The way to find out is a controlled test on part of the population before spending on all of it."),

  multi("PMK-04-08", "PM-04", "A", "medium",
    "Which of the following are CHALLENGES the syllabus expects to be raised about big data? Select TWO.",
    [
      "Data protection and privacy obligations, and the reputational risk of intrusive analysis",
      "Big data is only available to very large companies",
      "The skills to interpret the analysis are scarce and expensive, and analysis without them can mislead",
      "Big data cannot be stored securely",
    ],
    [0, 2],
    "PRIVACY AND REPUTATION, and SCARCE INTERPRETIVE SKILLS. Both are real constraints on realising value. Big data is not confined to large companies, and it can be stored securely — the difficulty is legal and interpretive rather than technical storage."),

  q("PMK-04-09", "PM-04", "A", "medium",
    "A company's analytics show that a promotional discount raised volume by 22%. Which further information is MOST necessary before calling the promotion a success?",
    [
      "The number of customers who saw the promotion",
      "The contribution given away in the discount, and whether the extra volume covered it",
      "The competitor's response",
      "The cost of the analytics platform",
    ],
    1,
    "THE CONTRIBUTION GIVEN AWAY. Volume is not profit: a discount that lifts volume 22% while cutting contribution per unit by a third destroys value. This is the same analysis as the adverse sales price against favourable volume variance pair in Area D."),

  q("PMK-04-10", "PM-04", "A", "hard",
    "A board is asked to approve £2.4m for a big data platform on the strength of a supplier's case study. What should the management accountant advise?",
    [
      "Approve, since the case study evidences the benefit",
      "Identify which specific decisions the company would make differently, estimate the value of those, and pilot on one decision before committing the full amount",
      "Reject, since big data benefits cannot be quantified",
      "Approve a smaller amount and revisit annually",
    ],
    1,
    "NAME THE DECISIONS, VALUE THEM, AND PILOT. A supplier's case study evidences a benefit in another company's circumstances. The test is which of THIS company's decisions would change, which is both the value question of chapter 1 and the way to size a pilot that proves it cheaply."),

  q("PMK-04-11", "PM-04", "A", "medium",
    "In the data-information-knowledge hierarchy, what does moving UP a level involve?",
    [
      "Collecting more data",
      "Adding context, interpretation and experience, so there is progressively less of it and each item is worth more",
      "Reducing the accuracy required",
      "Moving from external to internal sources",
    ],
    1,
    "ADDING CONTEXT AND INTERPRETATION, with less volume and more value at each level. That shape is why an organisation can hold vastly more data than before and be no better informed: volume accumulates at the bottom of the pyramid, and the work of moving it upward is what actually produces decisions."),

  q("PMK-04-12", "PM-04", "A", "medium",
    "Which is the strongest argument that big data analytics is relevant to PERFORMANCE MANAGEMENT specifically, rather than to IT?",
    [
      "It requires significant capital investment",
      "It can supply the leading, non-financial and external measures that financial reporting cannot — customer behaviour, quality signals, market movement",
      "It reduces the cost of the finance function",
      "It automates the production of variance reports",
    ],
    1,
    "IT SUPPLIES LEADING, NON-FINANCIAL AND EXTERNAL MEASURES. That is precisely the gap identified in Area E: financial measures are lagging, internal and manipulable. Analytics is a way of populating a balanced scorecard's customer and process perspectives with something better than an annual survey."),
]

export const PM_KIT_AREA_A: AccaQuestion[] = [...CH01, ...CH02, ...CH03, ...CH04]
