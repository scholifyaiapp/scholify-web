import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-ma-kit-builders"

/*
 * MA · Areas A and B question kit — chapters 1 to 9.
 *
 * Authored, applied, exam-standard. Numeric-entry items are used wherever the
 * skill being tested is a calculation, because a computation offered as four
 * options can be reverse-engineered from the options.
 *
 * Original Scholify content. No ACCA, Kaplan or BPP question is reproduced.
 */

/* ── Chapter 1 · Accounting for management ─────────────────────── */

const CH01: AccaQuestion[] = [
  q("MAK-01-01", "MA-01", "A", "easy", 2,
    "Which of the following is a characteristic of management accounting rather than financial accounting?",
    [
      "It is required by law for most entities",
      "Its format is prescribed by accounting standards",
      "It may be prepared for a single machine or customer",
      "It reports only on the entity as a whole",
    ],
    2,
    "Management accounting can be prepared at ANY level — one product, one machine, one customer, one shift — because its purpose is to support a specific internal decision and no external body prescribes its format. The other three options all describe financial accounting."),

  q("MAK-01-02", "MA-01", "A", "medium", 2,
    "A board is deciding whether to open operations in a new country. The information this decision needs is best described as:",
    [
      "Highly detailed, internal and near-certain",
      "Highly summarised, largely external, long-horizon and uncertain",
      "Detailed, external and available daily",
      "Summarised, internal and immediate",
    ],
    1,
    "Market entry is a STRATEGIC decision. Moving up the hierarchy, information becomes more summarised, more external, longer in horizon and less certain. Option 1 describes OPERATIONAL information — today's schedule or this invoice — and the level is set by the decision rather than by who takes it."),

  q("MAK-01-03", "MA-01", "A", "medium", 2,
    "A management report is entirely accurate but reaches the decision-maker two weeks after the decision had to be made. Which attribute of good information does it fail?",
    ["Accuracy", "Relevance", "Timeliness", "Cost-effectiveness"],
    2,
    "It fails TIMELINESS: information must arrive while the decision can still be influenced. Accuracy is precisely what the report has. This is the standard trade-off in management accounting — a good-enough figure available now beats a perfect one available too late, which is why management accounting resolves that trade-off in favour of speed."),

  q("MAK-01-04", "MA-01", "A", "easy", 2,
    "A complete and accurate list of all 4,000 transactions in a period, in reference-number order with no totals, is best described as:",
    ["Information", "Data", "A management report", "Inferential analysis"],
    1,
    "It is DATA — raw, unprocessed facts. Data becomes INFORMATION only when it has been selected, summarised, compared or interpreted so that a specific user can act on it. Completeness and accuracy do not make it information: a 4,000-line unsorted list cannot change any decision."),

  q("MAK-01-05", "MA-01", "A", "hard", 2,
    "Which statement about management accounting is correct?",
    [
      "It contains only financial information, since non-financial data belongs to operations",
      "It contains both financial and non-financial information, such as defect rates and labour hours",
      "It must follow the same recognition rules as financial accounting",
      "It is prepared annually to coincide with the statutory accounts",
    ],
    1,
    "Management accounting includes NON-FINANCIAL information — units produced, machine downtime, defect rates, complaints, on-time delivery — and that is why Area F measures performance on far more than profit. It follows no external recognition rules and is produced as frequently as decisions require, not annually."),

  multi("MAK-01-06", "MA-01", "A", "medium", 2,
    "Which TWO are among the attributes of good information?",
    ["Cost-effective to produce", "Prepared to statutory format", "Understandable to its user", "Audited by an external firm"],
    [0, 2],
    "COST-EFFECTIVE and UNDERSTANDABLE are both in the standard list (accurate, complete, cost-effective, understandable, relevant, accessible, timely, easy to use). Statutory format and external audit belong to FINANCIAL reporting — management information is deliberately free of both, because neither would make it more useful to a manager."),

  q("MAK-01-07", "MA-01", "A", "medium", 2,
    "Which of the following is the managerial process of CONTROL?",
    [
      "Deciding which of two machines to purchase",
      "Setting next year's departmental budgets",
      "Comparing actual costs against the budget flexed to actual output and investigating the difference",
      "Establishing the organisation's five-year objectives",
    ],
    2,
    "CONTROL is comparing what happened with what was planned and acting on the gap — here, the flexed-budget comparison. Option 1 is decision-making, and options 2 and 4 are planning at tactical and strategic level respectively. Identifying which process a scenario describes tells you which technique applies."),

  q("MAK-01-08", "MA-01", "A", "hard", 2,
    "Which is a genuine limitation of management information?",
    [
      "It cannot include non-financial measures",
      "It rests on estimates and assumptions, so an output is only as sound as the assumptions behind it",
      "It must be audited before use, which delays it",
      "It cannot be produced more often than annually",
    ],
    1,
    "Management information rests on ESTIMATES AND ASSUMPTIONS — absorption rates, forecast volumes, standard costs are all judgements — so it is only as reliable as they are. It also costs money, can be manipulated, and may omit what is hardest to measure. The other three options are simply false of management accounting."),

  q("MAK-01-09", "MA-01", "A", "easy", 2,
    "Cost accounting is best described as:",
    [
      "The preparation of statutory financial statements",
      "The part of management accounting concerned with establishing what things cost and valuing inventory",
      "The audit of a company's cost records",
      "The setting of selling prices",
    ],
    1,
    "COST ACCOUNTING establishes what things cost — a product, service, department or activity — and values inventory. It supplies much of the raw material that management accounting then uses for planning, decisions and control. Pricing draws on it but is a separate commercial decision."),

  q("MAK-01-10", "MA-01", "A", "medium", 2,
    "A supervisor decides whether to authorise two hours of overtime this evening to complete an order. At which level is this decision, and what information does it need?",
    [
      "Strategic; summarised external information",
      "Tactical; departmental budget information",
      "Operational; detailed, internal, immediate information",
      "Strategic; because it affects the customer relationship",
    ],
    2,
    "An immediate, day-to-day execution decision is OPERATIONAL, and it needs DETAILED, INTERNAL, IMMEDIATE and near-certain information — the order, the hours outstanding, the overtime rate. The fact that a customer is affected does not make it strategic; strategic decisions concern long-term direction for the organisation as a whole."),
]

/* ── Chapter 2 · Sources of data ───────────────────────────────── */

const CH02: AccaQuestion[] = [
  q("MAK-02-01", "MA-02", "A", "easy", 2,
    "A timesheet completed by an employee at the end of each week is an example of:",
    ["Machine and sensor data", "Transactional data", "Human data", "Published statistics"],
    2,
    "A timesheet is HUMAN data — supplied by a person, and where it is completed retrospectively it is an estimate rather than a record. That is why it is the least reliable of the three sources and can be influenced by what the person expects to gain. A clock-in system reading a badge would be machine data."),

  q("MAK-02-02", "MA-02", "A", "medium", 2,
    "What is the principal limitation of using published industry statistics for a management decision?",
    [
      "They are usually inaccurate",
      "They were compiled for another purpose, so definitions, periods and aggregation may not match the decision",
      "They are confidential and cannot be used commercially",
      "They contain no numerical data",
    ],
    1,
    "Published statistics are usually compiled carefully and are reasonably ACCURATE. The problem is COMPARABILITY: they were gathered for someone else's purpose, so definitions differ, periods do not align, aggregation may hide what you need, and the basis can change between editions without notice."),

  q("MAK-02-03", "MA-02", "A", "hard", 2,
    "A company's own records show a gross margin of 31%. An industry survey reports an average of 24%, but computes margin after deducting outbound distribution, which the company treats as a selling cost. What should be concluded?",
    [
      "The company outperforms the industry by 7 percentage points",
      "Nothing can be concluded until both figures are restated on the same basis",
      "The survey is inaccurate and should be disregarded",
      "The company should reclassify distribution to match the survey permanently",
    ],
    1,
    "Neither figure is wrong; the COMPARISON is. A definitional mismatch means the two margins measure different things, so the 7-point gap is meaningless until the company's figure is restated on the survey's basis. This is how external data most often misleads — not through error, but through a definition nobody checked."),

  multi("MAK-02-04", "MA-02", "A", "medium", 2,
    "Which TWO are internal sources of information?",
    ["Government inflation statistics", "The company's own production and scrap records", "A competitor's published financial statements", "Timesheets and clock cards"],
    [1, 3],
    "PRODUCTION RECORDS and TIMESHEETS both come from within the organisation's own systems. Government statistics and a competitor's published accounts are EXTERNAL — and note that a competitor's accounts, though about another company, are still an external source for the company using them."),

  q("MAK-02-05", "MA-02", "A", "medium", 2,
    "A material price standard was set nine months ago. Market prices have since risen 6%. What does the resulting adverse material price variance chiefly measure?",
    [
      "The purchasing department's performance",
      "Inflation since the standard was set, rather than purchasing performance",
      "An error in the material usage records",
      "A fall in the quality of material purchased",
    ],
    1,
    "The variance is measuring INFLATION rather than performance, because the benchmark is out of date. The standard should be revised, or the same explained variance appears every month and the report stops signalling anything. Index numbers are the tool for keeping standards current."),

  q("MAK-02-06", "MA-02", "A", "easy", 2,
    "Which of the following is machine or sensor data?",
    ["A customer satisfaction survey response", "A sales invoice", "Automatic readings of machine running hours", "A supplier's price list"],
    2,
    "Automatically captured MACHINE HOURS are machine and sensor data — objective, continuous and cheap once installed, though limited to what the sensor was built to measure. A survey response is human data, an invoice is transactional data, and a supplier's price list is an external source."),

  q("MAK-02-07", "MA-02", "A", "hard", 2,
    "What is transactional data unable to tell a business?",
    [
      "What was sold and at what price",
      "What business was lost, because no transaction was recorded",
      "Which customers bought which products",
      "The total value of purchases in the period",
    ],
    1,
    "Transactional data records what WAS transacted, so it is silent on business that did not happen — the customers who asked for a price and went elsewhere. That is why almost every decision needs information the accounting records do not contain, and why external sources and human judgement cannot be dispensed with."),

  q("MAK-02-08", "MA-02", "A", "medium", 2,
    "A trade association publishes a forecast that its own sector will grow 12% next year. How should an analyst treat it?",
    [
      "As fully reliable, since the association holds the best sector data",
      "With care: it has the best data AND an interest in the conclusion, so check basis, date and coverage",
      "As worthless, because all external forecasts are unreliable",
      "As an internal source, since member companies supply the underlying figures",
    ],
    1,
    "Both things are true simultaneously: the association genuinely has the best data, and it is not disinterested in the answer. Judge any external source on who produced it and why, when, on what basis, and whether it is comparable with your own figures. It remains an external source regardless of where its inputs came from."),

  q("MAK-02-09", "MA-02", "A", "medium", 2,
    "How does a rise in interest rates most directly affect a management accountant's work?",
    [
      "It changes the standard material price",
      "It changes the discount rate used in investment appraisal, so projects that previously cleared the hurdle may not",
      "It changes the basis of overhead absorption",
      "It has no effect, since interest is a financing rather than an operating cost",
    ],
    1,
    "Interest rates set the cost of capital, which is the DISCOUNT RATE in investment appraisal — so a rise means a project that cleared its hurdle last year may not now. It also raises the cost of financing working capital. It does not alter material standards or absorption bases, which are driven by other factors."),

  q("MAK-02-10", "MA-02", "A", "easy", 2,
    "Which of the following best describes the strength of transactional data?",
    [
      "It captures customer opinions and intentions",
      "It is complete, verifiable and reconcilable to the financial records",
      "It measures machine performance continuously",
      "It requires no processing before use",
    ],
    1,
    "Transactional data's strength is that it is COMPLETE, VERIFIABLE and RECONCILABLE to the accounting records, because it is what drove those records. Opinions come from human sources, continuous machine measurement from sensors, and all data requires processing before it becomes information."),
]

/* ── Chapter 3 · Cost classification and behaviour ─────────────── */

const CH03: AccaQuestion[] = [
  q("MAK-03-01", "MA-03", "A", "medium", 2,
    "A cost remains constant per unit as output increases. How does it behave?",
    ["Fixed", "Variable", "Semi-variable", "Stepped fixed"],
    1,
    "A VARIABLE cost is constant PER UNIT and rises in direct proportion in total. A FIXED cost is the inversion — constant in TOTAL and falling per unit as output is spread over more units. Objective-test questions are routinely built on this inversion, so read carefully whether the stem says 'per unit' or 'in total'."),

  num("MAK-03-02", "MA-03", "A", "medium", 2,
    "A machine's running cost is $3,600 per month fixed plus $2.80 per machine hour. An additional supervisor costing $1,400 per month is required once monthly hours exceed 2,000. What is the total cost in a month of 2,600 machine hours, in $?",
    12280, "$", 0.5,
    "2,600 hours exceeds the 2,000-hour threshold, so the stepped cost IS incurred. Total = fixed $3,600 + variable (2,600 × $2.80 = $7,280) + step $1,400 = $12,280. Omitting the step gives $10,880, which is the error the threshold is there to test — always check the activity level against every threshold before computing."),

  q("MAK-03-03", "MA-03", "A", "hard", 2,
    "Machine operators work directly on the product and are paid a fixed annual salary. How is their cost classified?",
    ["Direct and variable", "Direct and fixed", "Indirect and fixed", "Indirect and variable"],
    1,
    "DIRECT because they work on the product, so the cost is traceable to units; and FIXED because a salary does not change with output. Direct/indirect and variable/fixed are INDEPENDENT classifications, and 'direct labour is always variable' is a common and expensive misconception."),

  q("MAK-03-04", "MA-03", "A", "easy", 2,
    "A furniture maker pays a $9 royalty to a designer for each chair produced. How is this classified?",
    ["Production overhead", "A direct expense, forming part of prime cost", "An administration cost", "A selling cost"],
    1,
    "A cost traceable to each individual unit that is neither material nor labour is a DIRECT EXPENSE, and it forms part of prime cost. Overhead is by definition indirect — it cannot be traced to one unit — and tracing $9 per chair is trivial, which settles it."),

  num("MAK-03-05", "MA-03", "A", "medium", 2,
    "Direct materials are $16 per unit, direct labour $11 per unit, direct expenses $2 per unit, production overhead $7 per unit and selling costs $4 per unit. What is the production cost per unit, in $?",
    36, "$", 0.01,
    "Prime cost = direct materials $16 + direct labour $11 + direct expenses $2 = $29. Production cost = prime cost + production overhead $7 = $36. Selling costs are NON-production and are excluded — they would take total cost to $40, but only production cost is used to value inventory."),

  q("MAK-03-06", "MA-03", "A", "hard", 2,
    "Which costs may be included in the value of closing inventory?",
    [
      "All costs incurred in the period",
      "Production costs only",
      "Production and selling costs",
      "Variable costs only, in every case",
    ],
    1,
    "Only PRODUCTION costs are absorbed into inventory. Selling, distribution, administration and finance costs are period costs, written off as incurred. Option 4 describes MARGINAL costing specifically, which is one valuation basis rather than a general rule — and it is not permitted for statutory reporting."),

  q("MAK-03-07", "MA-03", "A", "medium", 2,
    "A divisional manager sets selling prices, controls divisional costs and authorises capital expenditure on new equipment. What type of responsibility centre is the division?",
    ["Cost centre", "Revenue centre", "Profit centre", "Investment centre"],
    3,
    "Controlling costs, revenue AND the capital invested makes it an INVESTMENT centre, so return on capital employed and residual income become appropriate measures. A PROFIT centre manager controls costs and revenue but not capital investment — which is the distinction being tested."),

  q("MAK-03-08", "MA-03", "A", "medium", 2,
    "Which is the most appropriate cost unit for a road haulage business?",
    ["Cost per tonne carried", "Cost per kilometre run", "Cost per tonne-kilometre", "Cost per vehicle owned"],
    2,
    "A COMPOSITE unit is needed because neither weight nor distance alone measures the work: carrying 1 tonne 400 km and 40 tonnes 10 km are very different jobs. Only the tonne-kilometre lets the business price a job with a different combination of weight and distance, which is what it must do to quote."),

  multi("MAK-03-09", "MA-03", "A", "medium", 2,
    "Which TWO costs behave as stepped fixed costs?",
    ["Direct material at $5 per unit", "One supervisor required for every 15 production workers", "Factory rent of $9,000 per month", "Warehouse rental, where a second warehouse is needed above 20,000 units of storage"],
    [1, 3],
    "A STEPPED FIXED cost is constant within a range and jumps at a threshold — one supervisor per 15 workers, and a second warehouse above a storage level. Direct material at a rate per unit is purely VARIABLE, and a flat monthly rent with no threshold is purely FIXED."),

  q("MAK-03-10", "MA-03", "A", "hard", 2,
    "A factory supervisor's salary is being classified. Which statement is correct?",
    [
      "It is always an indirect cost",
      "It is indirect to an individual unit but direct to the department as a cost centre",
      "It is always a direct cost, because supervision is essential to production",
      "It is a direct expense, because it is traceable to the factory",
    ],
    1,
    "The classification depends on the COST OBJECT. The salary cannot be traced to one chair, so it is INDIRECT to a unit; it can be traced in full to the department, so it is DIRECT to that cost centre. The right question is never 'is this direct?' but 'direct to WHAT?' — and a question naming the cost object is telling you how to answer."),
]

/* ── Chapter 4 · Presenting information ────────────────────────── */

const CH04: AccaQuestion[] = [
  q("MAK-04-01", "MA-04", "A", "medium", 2,
    "Which presentation is most appropriate for showing whether machine maintenance cost is related to machine hours run?",
    ["A pie chart", "A component bar chart", "A scatter diagram", "A histogram"],
    2,
    "A SCATTER DIAGRAM plots paired observations of two variables and shows whether they move together — the visual precursor to correlation and regression. A pie chart shows one total's composition, a component bar chart how a total splits, and a histogram the distribution of a single continuous variable."),

  q("MAK-04-02", "MA-04", "A", "medium", 2,
    "How does a histogram differ from a bar chart?",
    [
      "A histogram uses horizontal bars",
      "A histogram shows a continuous distribution, its bars touch, and area represents frequency",
      "A histogram can only display financial data",
      "A histogram cannot show more than five categories",
    ],
    1,
    "A BAR CHART compares separate categories, so its bars have gaps. A HISTOGRAM shows the distribution of a CONTINUOUS variable, its bars touch, and it is the AREA rather than height alone that represents frequency — so unequal class widths require adjusted heights or the chart misleads."),

  q("MAK-04-03", "MA-04", "A", "hard", 2,
    "Output was 10,000 units at a total cost of $86,000 in Q1, and 8,000 units at $79,000 in Q3. Unit cost rose from $8.60 to $9.88. What does this most likely indicate?",
    [
      "Production efficiency deteriorated significantly",
      "Fixed costs were spread over fewer units, so the higher unit cost reflects volume rather than inefficiency",
      "Material prices rose by 15%",
      "The cost is purely variable",
    ],
    1,
    "A rising unit cost does NOT prove inefficiency. With a substantial fixed element, producing 8,000 instead of 10,000 units spreads the same fixed cost over fewer units and raises cost per unit automatically. Judging performance requires holding volume constant — which is exactly what a flexed budget does."),

  q("MAK-04-04", "MA-04", "A", "easy", 2,
    "What is the difference between a conclusion and a recommendation in a management report?",
    [
      "They are alternative names for the same section",
      "A conclusion states what the findings mean; a recommendation states the action to take",
      "A conclusion is for the board; a recommendation for operational staff",
      "A recommendation must always be financial",
    ],
    1,
    "A CONCLUSION says what the figures mean; a RECOMMENDATION says what should be done about it. Marks are commonly allocated separately to each, so an answer stopping at the conclusion leaves the recommendation marks unclaimed."),

  q("MAK-04-05", "MA-04", "A", "medium", 2,
    "A manager needs exact figures for a budget submission covering revenue and cost by product line. Which presentation is most appropriate?",
    ["A line graph", "A pie chart", "A table", "A histogram"],
    2,
    "A TABLE, because the requirement is EXACT VALUES. Any chart trades precision for pattern. The general rule: use a chart to show a pattern and a table to give a number — and here a number is what the budget submission needs."),

  multi("MAK-04-06", "MA-04", "A", "medium", 2,
    "Which TWO features of a chart can make it misleading?",
    ["A vertical axis that does not start at zero", "Labelling each axis clearly", "Unequal histogram class widths with unadjusted heights", "Including the source of the data"],
    [0, 2],
    "A NON-ZERO vertical axis exaggerates small movements visually, and UNEQUAL HISTOGRAM CLASS WIDTHS with unadjusted heights break the rule that area represents frequency. Clear axis labels and a stated data source both make a chart MORE trustworthy, not less."),

  q("MAK-04-07", "MA-04", "A", "medium", 2,
    "Which section of a formal report sets out what was asked and any limits on its scope?",
    ["Findings", "Terms of reference", "Appendices", "Recommendations"],
    1,
    "TERMS OF REFERENCE state the purpose of the report and any restrictions on its scope. They matter in practice because they protect the author when the question actually asked was narrower than the reader later remembers requesting."),

  q("MAK-04-08", "MA-04", "A", "hard", 2,
    "Which of the following is interpretation rather than description?",
    [
      "Material cost was $14,000 above budget",
      "Material cost was 9% above the flexed budget",
      "Material cost was $14,000 above the flexed budget, almost entirely usage rather than price, coinciding with the change of supplier in week 2",
      "Material cost for the period was $168,000",
    ],
    2,
    "Only the third option INTERPRETS: it quantifies against a valid benchmark, isolates which element moved, and links it to something specific in the scenario. The others restate figures the reader can already see. Marks come from magnitude, cause and action — not from repeating the report back."),

  q("MAK-04-09", "MA-04", "A", "easy", 2,
    "Which chart is most appropriate for showing monthly sales over three years, to reveal both the trend and its seasonality?",
    ["A pie chart", "A line graph", "A histogram", "A scatter diagram"],
    1,
    "A LINE GRAPH suits a continuous time axis and makes both the underlying trend and the repeating seasonal pattern visible. Thirty-six bars would obscure both, a pie chart cannot show change over time, and a scatter diagram is for the relationship between two variables."),

  q("MAK-04-10", "MA-04", "A", "hard", 2,
    "Why can a pie chart not be used to compare two periods' cost structures?",
    [
      "Pie charts cannot display percentages",
      "A pie shows the composition of ONE total, so two pies cannot compare the totals themselves",
      "Pie charts are limited to two categories",
      "Pie charts require continuous data",
    ],
    1,
    "A pie chart shows how a SINGLE total divides. Two pies show two compositions but give no visual comparison of the totals — a segment could be a larger share of a much smaller total. To compare totals or track a changing split, use a COMPONENT BAR CHART, where both are visible at once."),
]

/* ── Chapter 5 · Sampling methods ──────────────────────────────── */

const CH05: AccaQuestion[] = [
  q("MAK-05-01", "MA-05", "B", "medium", 2,
    "A population contains three departments known to behave very differently from one another. Which sampling method best ensures each is represented?",
    ["Simple random", "Systematic", "Stratified", "Quota"],
    2,
    "STRATIFIED sampling divides the population into strata and samples within each, usually in proportion to size, which guarantees every distinct subgroup appears. Simple random and systematic sampling could by chance under-represent a small subgroup, and quota sampling is non-random."),

  q("MAK-05-02", "MA-05", "B", "hard", 2,
    "An auditor samples every 20th delivery note from a date-ordered list. Unknown to them, every 20th note is the Friday bulk consignment to one large customer. What has gone wrong?",
    [
      "The sample is too small",
      "A repeating pattern in the list aligns with the sampling interval, so the sample captures only one type of item",
      "Systematic sampling is never appropriate for audit work",
      "The sample should have been stratified by value",
    ],
    1,
    "Systematic sampling is only safe where the population list contains NO REPEATING PATTERN aligned with the interval. Here it does, so the sample is 100% Friday bulk deliveries and says nothing about the rest. Checking the list for periodicity before choosing the interval takes a minute and prevents it."),

  q("MAK-05-03", "MA-05", "B", "medium", 2,
    "Why can quota sampling not support statistical inference about a population?",
    [
      "The sample size is always too small",
      "It is non-probability: interviewers choose whom to approach, so each item's chance of selection is unknown",
      "It cannot be used for numerical data",
      "It requires a complete sampling frame",
    ],
    1,
    "Quota sampling is NON-PROBABILITY — interviewers fill their quotas by choosing whom to approach, so selection probabilities are unknown and interviewer bias enters. Only probability methods support inference. Its compensating virtue is speed and low cost, which is why it persists in market research."),

  q("MAK-05-04", "MA-05", "B", "medium", 2,
    "A sample is found to be biased. What is the effect of doubling its size?",
    [
      "The bias is halved",
      "The bias is eliminated",
      "The bias remains; only the precision improves, so it becomes a more confident wrong answer",
      "The sample becomes representative",
    ],
    2,
    "Sample SIZE affects PRECISION; the SELECTION METHOD affects BIAS. They are different problems, and no amount of additional observations corrects a systematically unrepresentative selection — it simply narrows the confidence interval around the wrong figure."),

  q("MAK-05-05", "MA-05", "B", "easy", 2,
    "Which sampling method requires a complete list of the population?",
    ["Quota sampling", "Cluster sampling", "Simple random sampling", "Multi-stage sampling"],
    2,
    "SIMPLE RANDOM sampling needs a complete SAMPLING FRAME, because every item must have a known equal chance of selection. Cluster sampling exists precisely for situations where no full list is available but natural groupings are, and quota sampling needs no frame at all."),

  q("MAK-05-06", "MA-05", "B", "medium", 2,
    "Quality inspection is required on a production line whose output is effectively unlimited and for which no list of units can exist. Which method is most practical?",
    ["Simple random sampling", "Systematic sampling — every nth unit off the line", "Stratified sampling", "Quota sampling"],
    1,
    "With an effectively infinite population and NO SAMPLING FRAME, simple random sampling is impossible — there is nothing to draw from. Taking every nth unit off the line is SYSTEMATIC and practical. Note this is also a case where destructive testing may rule out complete examination in principle."),

  multi("MAK-05-07", "MA-05", "B", "medium", 2,
    "Which TWO are reasons for sampling rather than examining a whole population?",
    ["Sampling always gives a more accurate answer than a full examination", "Examining every item may be uneconomic", "Some testing destroys the item tested", "Sampling removes the need for judgement"],
    [1, 2],
    "COST and DESTRUCTIVE TESTING are both genuine reasons, alongside time, practicality and the fact that a well-chosen sample is accurate enough for the decision. Option 1 is false — a complete examination is more accurate, just usually not worth it — and sampling requires MORE judgement, not less."),

  q("MAK-05-08", "MA-05", "B", "hard", 2,
    "How does cluster sampling differ from stratified sampling?",
    [
      "Cluster sampling divides the population into strata and samples within each",
      "Cluster sampling examines every item within a few selected groups, rather than sampling within every group",
      "Cluster sampling is a non-probability method",
      "They are alternative names for the same technique",
    ],
    1,
    "STRATIFIED sampling samples WITHIN EVERY subgroup, ensuring all are represented. CLUSTER sampling selects a few clusters and examines ALL items in them — cheaper, and less representative because clusters tend to be internally similar, so the effective sample is smaller than the count suggests."),

  q("MAK-05-09", "MA-05", "B", "easy", 2,
    "What is a sampling frame?",
    [
      "The tolerance applied to a sample result",
      "A complete list of the population from which a random sample can be drawn",
      "The period over which sampling takes place",
      "The minimum acceptable sample size",
    ],
    1,
    "A SAMPLING FRAME is the complete list of the population, and it is what makes a random selection possible — every item must be identifiable to have a known chance of selection. Its absence is precisely why cluster and systematic methods exist."),

  q("MAK-05-10", "MA-05", "B", "medium", 2,
    "Which of the following is a NON-probability sampling method?",
    ["Systematic", "Stratified", "Cluster", "Quota"],
    3,
    "QUOTA sampling is the syllabus's non-probability method: interviewers decide who fills each quota, so selection probabilities are unknown. Systematic, stratified and cluster sampling are all probability methods, in which every item's chance of selection is known and non-zero."),
]

/* ── Chapter 6 · Summarising and analysing data ────────────────── */

const CH06: AccaQuestion[] = [
  q("MAK-06-01", "MA-06", "B", "easy", 2,
    "How many characteristics of big data does the MA syllabus specify, and what are they?",
    [
      "Four: volume, velocity, variety, veracity",
      "Five: volume, velocity, variety, veracity and value",
      "Three: volume, variety and value",
      "Six: the five Vs plus visualisation",
    ],
    1,
    "MA specifies FIVE: volume, velocity, variety, veracity and VALUE. Value is the one candidates omit and the most commercially important — data that cannot change a decision is a cost rather than an asset, however much of it there is."),

  num("MAK-06-02", "MA-06", "B", "medium", 2,
    "Weekly output over five weeks was 420, 460, 440, 480 and 450 units. What is the mean weekly output, in units?",
    450, "units", 0.5,
    "Sum = 420 + 460 + 440 + 480 + 450 = 2,250. Mean = 2,250 ÷ 5 = 450 units. Note that here the mean is representative because the distribution is tight and contains no outlier — where one extreme value exists, the median is the honest measure instead."),

  q("MAK-06-03", "MA-06", "B", "hard", 2,
    "Weekly earnings of seven staff are $420, $440, $440, $460, $480, $500 and $3,200. Which average best represents typical earnings, and why?",
    [
      "The mean, because it uses every value",
      "The median, because it is unaffected by the single extreme value",
      "The mode, because it is the most common value",
      "The mean, because it is the only average suitable for money",
    ],
    1,
    "The mean of $848.57 is HIGHER than six of the seven actual earnings, because one extreme value has pulled it above almost the whole distribution. The MEDIAN of $460 is unaffected by outliers and represents typical earnings honestly. Reporting the mean here would be technically correct and materially misleading."),

  q("MAK-06-04", "MA-06", "B", "medium", 2,
    "A survey records each respondent's department, which is nominal data. Which average can meaningfully be calculated?",
    ["The mean", "The median", "The mode", "The standard deviation"],
    2,
    "For NOMINAL data — categories with no order — only the MODE is meaningful. A mean requires arithmetic on the values and there is no 'average department'; a median requires the data to be ordered, which nominal categories are not; and standard deviation measures dispersion of numerical values."),

  num("MAK-06-05", "MA-06", "B", "hard", 2,
    "Delivery times over five deliveries were 4, 15, 6, 14 and 11 days. What is the standard deviation, in days, to two decimal places?",
    4.34, "days", 0.02,
    "Mean = 50 ÷ 5 = 10 days. Squared deviations: (4−10)²=36, (15−10)²=25, (6−10)²=16, (14−10)²=16, (11−10)²=1. Sum = 94. Variance = 94 ÷ 5 = 18.8. Standard deviation = √18.8 = 4.34 days. A supplier with the same mean but a standard deviation of 0.63 would be far preferable — which is why dispersion often decides the answer."),

  num("MAK-06-06", "MA-06", "B", "medium", 2,
    "A project has a 0.3 probability of $80,000 profit, 0.5 of $40,000 profit and 0.2 of a $10,000 loss. What is the expected value, in $?",
    42000, "$", 1,
    "EV = (0.3 × 80,000) + (0.5 × 40,000) + (0.2 × −10,000) = 24,000 + 20,000 − 2,000 = $42,000. Two things to check: the probabilities sum to 1.0, and the LOSS enters as a NEGATIVE. Note the EV is a long-run average and will never actually occur on a one-off decision."),

  multi("MAK-06-07", "MA-06", "B", "medium", 2,
    "Which TWO are genuine limitations of expected value?",
    ["It ignores the decision-maker's attitude to risk", "It cannot handle more than three outcomes", "It rests on estimated probabilities that may be subjective", "It cannot be applied to financial data"],
    [0, 2],
    "EV ignores RISK ATTITUDE and the spread of outcomes entirely, and it depends on ESTIMATED PROBABILITIES that are often judgements. It is also a long-run average, so it is weak justification for a one-off decision. It handles any number of outcomes and is routinely applied to financial data."),

  q("MAK-06-08", "MA-06", "B", "medium", 2,
    "In a normal distribution, approximately what proportion of values lies within two standard deviations of the mean?",
    ["50%", "68%", "95%", "99.7%"],
    2,
    "Approximately 95% lies within TWO standard deviations. The full set to remember is 68% within one, 95% within two and 99.7% within three — worth memorising because it lets you sense-check any z-table answer for plausibility."),

  num("MAK-06-09", "MA-06", "B", "hard", 2,
    "Daily output is normally distributed with a mean of 500 units and a standard deviation of 20. What is the z score for an output of 545 units?",
    2.25, "", 0.01,
    "z = (x − μ) ÷ σ = (545 − 500) ÷ 20 = 45 ÷ 20 = 2.25. The value lies 2.25 standard deviations above the mean, and since about 95% of values fall within two, an output above 545 is comfortably in the upper tail — roughly a 1.2% chance."),

  q("MAK-06-10", "MA-06", "B", "hard", 2,
    "A standard deviation of $400 on a mean of $2,000 is compared with one of $900 on a mean of $30,000. Which measure makes the comparison meaningful?",
    ["The range", "The variance", "The coefficient of variation", "The interquartile range"],
    2,
    "The COEFFICIENT OF VARIATION (standard deviation ÷ mean) gives RELATIVE dispersion: 20% against 3%. Comparing the raw standard deviations of $400 and $900 is meaningless when the means differ by a factor of 15 — the second dataset is far more consistent despite the larger absolute figure."),
]

/* ── Chapter 7 · High/low and regression ───────────────────────── */

const CH07: AccaQuestion[] = [
  num("MAK-07-01", "MA-07", "B", "medium", 2,
    "Total cost was $74,000 at 9,000 units and $69,800 at 7,500 units. Separate the cost by high/low and state the variable element per unit, in $.",
    2.8, "$", 0.01,
    "($74,000 − $69,800) ÷ (9,000 − 7,500) = $4,200 ÷ 1,500 = $2.80 per unit. Note the method: the change in COST over the change in ACTIVITY. Dividing total cost by volume would give full cost per unit including the fixed element, which is a different figure entirely."),

  num("MAK-07-02", "MA-07", "B", "hard", 2,
    "Overhead was $56,000 at 4,000 units and $91,000 at 9,000 units. Fixed costs include a step of $6,000 incurred once output exceeds 6,000 units. What is the variable cost per unit, in $?",
    5.8, "$", 0.01,
    "The two observations sit on DIFFERENT fixed bases, because the high point includes the step. Adjust first: $91,000 − $6,000 = $85,000. Then ($85,000 − $56,000) ÷ 5,000 = $5.80. Ignoring the step gives $7.00 — a 21% overstatement, because the step would be treated as variable cost."),

  q("MAK-07-03", "MA-07", "B", "medium", 2,
    "In high/low analysis, which two observations should be used?",
    [
      "The highest and lowest COST periods",
      "The highest and lowest ACTIVITY periods",
      "The first and last periods observed",
      "The two periods closest to average activity",
    ],
    1,
    "Select on highest and lowest ACTIVITY. Questions are deliberately built so the highest-cost period is not the highest-activity one — usually because a stepped cost was triggered — and choosing on cost then gives a plausible but wrong variable rate."),

  q("MAK-07-04", "MA-07", "B", "medium", 2,
    "A regression gives r = 0.8. What proportion of the variation in y is explained by variation in x?",
    ["80%", "64%", "89%", "20%"],
    1,
    "The proportion explained is r², not r: 0.8² = 0.64, so 64% is explained and 36% is due to other factors. Answering 80% confuses the correlation coefficient with the coefficient of determination, which is precisely the distinction being tested."),

  q("MAK-07-05", "MA-07", "B", "hard", 2,
    "A regression of maintenance cost on machine hours was fitted over an observed range of 1,500 to 4,000 hours. A forecast is required at 9,000 hours. What should be said?",
    [
      "The forecast is reliable, because the regression fits well",
      "The forecast extrapolates far beyond the observed range and should not be relied on",
      "The forecast should be doubled to allow for the extra hours",
      "Regression cannot produce a forecast at all",
    ],
    1,
    "This is EXTRAPOLATION: the relationship was only ever established between 1,500 and 4,000 hours, and nothing in the data says it continues to 9,000 — where the business would likely need extra shifts, more machines or a maintenance contract, a different cost structure entirely. Identifying the extrapolation is a reliable mark."),

  q("MAK-07-06", "MA-07", "B", "medium", 2,
    "In the cost function y = 14,000 + 4.5x, what do the two figures represent?",
    [
      "Fixed cost of $4.50 per unit and variable cost of $14,000 in total",
      "Total fixed cost of $14,000 and variable cost of $4.50 per unit",
      "Total cost of $14,000 at an activity of 4.5 units",
      "Variable cost of $14,000 and a step of $4.50",
    ],
    1,
    "a is TOTAL FIXED cost — the intercept, the cost at zero activity — and b is VARIABLE cost PER UNIT, the gradient. So fixed cost is $14,000 in total and the variable rate is $4.50 per unit. Swapping a and b is the commonest error in this chapter and corrupts every figure built on it."),

  num("MAK-07-07", "MA-07", "B", "hard", 2,
    "Costs were $60,000 in 20X1 when the cost index was 100, and $75,900 in 20X4 when it was 115. Activity was 10,000 and 12,000 units. What is the variable cost per unit at 20X1 prices, in $?",
    3, "$", 0.01,
    "Restate 20X4 to 20X1 prices first: $75,900 × (100 ÷ 115) = $66,000. Now high/low on a common price basis: ($66,000 − $60,000) ÷ 2,000 = $3.00. Skipping the adjustment gives $7.95 — 165% too high, because three years of inflation would be attributed to 2,000 extra units."),

  q("MAK-07-08", "MA-07", "B", "hard", 2,
    "An analysis finds a correlation of 0.88 between ice-cream sales and factory absenteeism. What can legitimately be concluded?",
    [
      "Ice-cream consumption causes absence, so it should be discouraged",
      "The two move together and one can forecast the other, but no causal link is established",
      "The correlation must be a calculation error",
      "Absence causes ice-cream sales",
    ],
    1,
    "Correlation licenses PREDICTION, not INTERVENTION. Both variables are almost certainly driven by a third — summer weather — so ice-cream sales could still forecast absence usefully while discouraging ice cream would change nothing. Establishing a mechanism, not a coefficient, is what justifies acting."),

  multi("MAK-07-09", "MA-07", "B", "medium", 2,
    "Which TWO are disadvantages of high/low analysis?",
    ["It requires specialist statistical software", "It uses only two observations and discards the rest", "Those two observations are the extremes, which are the likeliest to be untypical", "It cannot be used where costs are semi-variable"],
    [1, 2],
    "High/low uses only TWO observations, and they are the EXTREMES — the most likely to be atypical. It also gives no measure of reliability and assumes strict linearity. It needs no software at all, and separating semi-variable costs is precisely what it is FOR."),

  num("MAK-07-10", "MA-07", "B", "medium", 2,
    "A regression gives a = 8,400 and b = 6.25, with cost in $ and x in machine hours. What is the forecast total cost at 3,000 machine hours, in $?",
    27150, "$", 1,
    "y = a + bx = 8,400 + (6.25 × 3,000) = 8,400 + 18,750 = $27,150. Fixed cost is $8,400 in total per period and the variable rate is $6.25 per machine hour. Since 3,000 hours sits inside a typical observed range, this is interpolation and reasonably reliable."),
]

/* ── Chapter 8 · Time series and index numbers ─────────────────── */

const CH08: AccaQuestion[] = [
  q("MAK-08-01", "MA-08", "B", "medium", 2,
    "Which component of a time series has no fixed length and is therefore not forecast in MA?",
    ["Trend", "Seasonal variation", "Cyclical variation", "Random variation"],
    2,
    "CYCLICAL variation follows the economic cycle, lasts several years and has NO FIXED LENGTH, so it cannot be measured and projected as seasonality can. Seasonal variation repeats over a fixed known period, which is exactly what makes it forecastable."),

  num("MAK-08-02", "MA-08", "B", "medium", 2,
    "The trend for next quarter is forecast at $84,000 and that quarter's additive seasonal variation is −$7,000. What is the forecast, in $?",
    77000, "$", 1,
    "Under the ADDITIVE model, forecast = trend + seasonal variation = $84,000 − $7,000 = $77,000. Project the trend first, then apply the seasonal adjustment. Under a MULTIPLICATIVE model the seasonal element would be a factor and would be multiplied instead."),

  q("MAK-08-03", "MA-08", "B", "hard", 2,
    "Why must a four-quarter moving average be centred?",
    [
      "To remove the random component",
      "Because an even-numbered window produces averages falling between two quarters, so they must be aligned with an actual quarter",
      "To convert the additive model to multiplicative",
      "Because quarterly data is always seasonal",
    ],
    1,
    "With an EVEN number of periods each moving average falls BETWEEN two periods, so it cannot be compared with an actual quarter's figure until adjacent pairs are averaged. Quarterly (4) and monthly (12) windows both need centring; an odd window such as 3 or 7 already sits on a period."),

  num("MAK-08-04", "MA-08", "B", "medium", 2,
    "An index stood at 120 in 20X3 and 150 in 20X6. By what percentage did prices rise between those years?",
    25, "%", 0.1,
    "150 ÷ 120 = 1.25, so a 25% rise. It is NOT 30%: that is the difference in index POINTS, and the base for this comparison is 120 rather than 100. Comparing two non-base years requires dividing the indices, never subtracting them."),

  num("MAK-08-05", "MA-08", "B", "hard", 2,
    "Materials index 130 (weight 5), labour index 112 (weight 3), energy index 160 (weight 2). What is the weighted index, to one decimal place?",
    130.6, "", 0.05,
    "Σ(index × weight) = (130 × 5) + (112 × 3) + (160 × 2) = 650 + 336 + 320 = 1,306. Σweights = 10. Weighted index = 1,306 ÷ 10 = 130.6. The unweighted average would be 134 — higher, because it gives energy, the smallest input, the same influence as materials, the largest."),

  q("MAK-08-06", "MA-08", "B", "medium", 2,
    "Under the additive model, what must the average seasonal variations sum to?",
    ["One", "Zero", "The number of periods", "The trend value"],
    1,
    "ADDITIVE seasonal variations are absolute amounts and must sum to ZERO across a full cycle, so that the seasonal element nets out and the total of the forecasts equals the total of the trend. Under the MULTIPLICATIVE model the factors are ratios and average ONE instead."),

  q("MAK-08-07", "MA-08", "B", "hard", 2,
    "A product's sales have risen steadily for eight quarters. Management believes it is entering maturity and two competitors have launched substitutes. What does this mean for a trend extrapolation?",
    [
      "It remains reliable, because eight quarters is a substantial dataset",
      "It will overstate sales, because a growth-stage trend does not continue into maturity",
      "It will understate sales, because competition raises market awareness",
      "The trend should be doubled to reflect the competition",
    ],
    1,
    "Time series analysis assumes the past pattern CONTINUES, and that only holds within a life-cycle stage. A growth-stage trend projected into maturity systematically OVERSTATES sales — and the historic data cannot reflect two substitutes that did not exist while it was recorded."),

  q("MAK-08-08", "MA-08", "B", "medium", 2,
    "What is the purpose of an index number?",
    [
      "To forecast future prices",
      "To express a value as a percentage of a base period, making figures from different periods comparable",
      "To measure the correlation between two variables",
      "To remove seasonality from a time series",
    ],
    1,
    "An index expresses a value as a percentage of a chosen BASE period set at 100, and its purpose is COMPARABILITY — stripping out price changes so that real movements can be seen. It is a restatement tool rather than a forecasting one, and it is what makes multi-year cost analysis valid."),

  multi("MAK-08-09", "MA-08", "B", "medium", 2,
    "Which TWO stages of the product life cycle are correctly described?",
    ["Introduction: low sales, high unit cost, heavy promotion", "Growth: sales plateau and price competition intensifies", "Maturity: sales stable at a peak, unit cost at its lowest", "Decline: unit cost falls as volume falls"],
    [0, 2],
    "INTRODUCTION has low sales, high unit cost and heavy promotion; MATURITY has stable peak sales and the lowest unit cost from full economies of scale. Option 2 describes maturity, not growth. Option 4 is inverted: in DECLINE unit cost RISES as falling volume spreads fixed costs more thinly."),

  num("MAK-08-10", "MA-08", "B", "hard", 2,
    "Quarterly sales were 48, 62, 78 and 52 ($000) in the four quarters of 20X3. What is the four-quarter moving average total for those quarters, in $000?",
    240, "$000", 0.5,
    "48 + 62 + 78 + 52 = 240 ($000), giving a moving average of 60.0. Averaging over exactly one full cycle is what cancels the seasonal element and leaves the trend — which is why the window must span four quarters for quarterly data and twelve months for monthly."),
]

/* ── Chapter 9 · Spreadsheets ──────────────────────────────────── */

const CH09: AccaQuestion[] = [
  q("MAK-09-01", "MA-09", "B", "medium", 2,
    "What is the principal control weakness of relying on a spreadsheet as the record for a material figure?",
    [
      "Spreadsheets cannot perform complex calculations reliably",
      "There is typically no audit trail, no version control and weak access control",
      "Spreadsheets cannot produce charts",
      "Spreadsheet files cannot be backed up",
    ],
    1,
    "The weakness is CONTROL, not capability: no audit trail, weak version and access control, so a change cannot be traced and a single wrong formula is applied consistently to everything. Spreadsheet arithmetic is entirely reliable — which is exactly why an error in it goes unnoticed."),

  q("MAK-09-02", "MA-09", "B", "medium", 2,
    "Which is the most common single error found in real spreadsheet models?",
    [
      "Incorrect arithmetic in the software",
      "A total whose range stops short of the rows it should cover",
      "Using too many worksheets",
      "Formatting cells as text",
    ],
    1,
    "A SUM covering 11 of 12 months, because a row was inserted just outside the range, is the classic spreadsheet error — invisible on the face of the output and easy to introduce. The software's arithmetic is not the risk; the RANGE and the FORMULA are."),

  q("MAK-09-03", "MA-09", "B", "hard", 2,
    "Why is a hard-coded number typed over a formula particularly dangerous in a budget model?",
    [
      "It makes the file larger",
      "The cell no longer responds to its inputs, so every subsequent 'what if' test is wrong",
      "It prevents the workbook being saved",
      "It changes the cell's formatting",
    ],
    1,
    "The whole value of a model is that changing an assumption reworks the result. A hard-coded cell is FROZEN, so it does not respond — and because sensitivity analysis then produces confident wrong answers, the defect is worse than an obvious error would be. Someone who could not make a figure agree has usually typed the answer in."),

  multi("MAK-09-04", "MA-09", "B", "medium", 2,
    "Which TWO controls reduce spreadsheet risk?",
    ["Separating inputs from workings from outputs", "Increasing the number of worksheets", "Locking formula cells", "Removing all charts from the model"],
    [0, 2],
    "SEPARATING INPUTS from workings and outputs makes a model reviewable — you can see what is an assumption and what is derived — and LOCKING FORMULA CELLS prevents accidental overwriting. Worksheet count is irrelevant, and charts aid interpretation rather than creating risk."),

  q("MAK-09-05", "MA-09", "B", "easy", 2,
    "What is the defining feature of a spreadsheet?",
    [
      "It can store large volumes of data",
      "Cells contain formulae referencing other cells, so changing an input recalculates every dependent figure automatically",
      "It produces charts",
      "It can be shared between users",
    ],
    1,
    "AUTOMATIC RECALCULATION through cell references is the defining feature, and it is what makes 'what if' and sensitivity analysis practical. Storage, charting and sharing are useful but are not what distinguishes a spreadsheet from a table of numbers."),

  q("MAK-09-06", "MA-09", "B", "medium", 2,
    "A relative cell reference is copied across a row when it should have been absolute. What happens?",
    [
      "The formula returns an error message",
      "The formula silently shifts what it points at, producing wrong results that look plausible",
      "The workbook will not recalculate",
      "The cell reverts to its original value",
    ],
    1,
    "The formula SILENTLY points at the wrong cells. No error appears, the figures look plausible, and the model must be traced formula by formula to find it — which is why reviewing consistency along a row is a standard check. An error message would at least announce itself."),

  q("MAK-09-07", "MA-09", "B", "medium", 2,
    "Which of these is a legitimate spreadsheet application in management accounting?",
    [
      "Replacing the statutory financial statements",
      "Flexing a budget and computing variances automatically",
      "Acting as the audited accounting record",
      "Eliminating the need for internal control",
    ],
    1,
    "FLEXING A BUDGET and computing variances is exactly what spreadsheets are for — the recalculation is instant and the model can be reused each period. They should not serve as the system of record for material balances, and they certainly do not remove the need for control; they relocate it onto the model."),

  q("MAK-09-08", "MA-09", "B", "hard", 2,
    "In reviewing a colleague's budget model, which check is most likely to reveal a material error?",
    [
      "Re-performing the arithmetic manually",
      "Tracing each total against the range it covers, and testing whether changing one assumption reflows the whole model",
      "Checking the fonts and formatting are consistent",
      "Counting the number of formulae used",
    ],
    1,
    "Look for the errors spreadsheets CHARACTERISTICALLY make: short ranges, hard-coded overrides, inconsistent formulae along a row. Changing one assumption tests both at once — if the output barely moves something is hard-coded, and if it moves absurdly a reference is wrong. Re-performing arithmetic tests the one thing the machine does reliably."),

  q("MAK-09-09", "MA-09", "B", "easy", 2,
    "What does 'what if' analysis in a spreadsheet allow a manager to do?",
    [
      "Correct errors automatically",
      "See the effect on the result of changing one or more assumptions",
      "Produce statutory accounts",
      "Audit the model's formulae",
    ],
    1,
    "'What if' analysis changes an ASSUMPTION and shows the effect on the outcome, which is what identifies WHICH assumptions matter. If a 10% volume fall wipes out profit but a 10% material price rise barely dents it, management's attention belongs on volume."),

  q("MAK-09-10", "MA-09", "B", "medium", 2,
    "Why is mixing $ and $000 within one spreadsheet calculation a significant risk?",
    [
      "Spreadsheets cannot handle different units",
      "The arithmetic is performed regardless, producing a figure wrong by a factor of 1,000 that looks superficially reasonable",
      "It prevents the file from being shared",
      "It causes a circular reference",
    ],
    1,
    "The spreadsheet performs the arithmetic without objection, so the result is wrong by three orders of magnitude and no error is flagged. Whether it looks obviously wrong depends entirely on which figures are involved — which is why consistent units, and a stated convention on the face of the model, are basic controls."),
]

export const MA_KIT_CH01_09: AccaQuestion[] = [
  ...CH01, ...CH02, ...CH03, ...CH04, ...CH05, ...CH06, ...CH07, ...CH08, ...CH09,
]
