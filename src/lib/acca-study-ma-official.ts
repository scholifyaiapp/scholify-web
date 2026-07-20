import type { StudyChapter, StudySection } from "@/lib/acca-study-content"
import { MA_A as LEGACY_A } from "@/lib/acca-study-ma-a"
import { MA_B as LEGACY_B } from "@/lib/acca-study-ma-b"
import { MA_C as LEGACY_C } from "@/lib/acca-study-ma-c"
import { MA_D as LEGACY_D } from "@/lib/acca-study-ma-d"
import { MA_E as LEGACY_E } from "@/lib/acca-study-ma-e"

function pick(chapter: StudyChapter, ids: string[]): StudySection[] {
  return ids.map((id) => {
    const section = chapter.sections.find((candidate) => candidate.id === id)
    if (!section) throw new Error(`MA Study migration: missing section ${chapter.area}/${id}`)
    return section
  })
}

export const MA_OFFICIAL_A: StudyChapter = {
  paper: "MA",
  area: "A",
  title: "The nature, source and purpose of management information",
  minutes: 25,
  intro: "Management accounting turns raw observations into decision-useful information—classified, proportionate and presented for the manager who must act.",
  outcomes: [
    "Distinguish financial, cost and management accounting and connect planning, decision-making and control",
    "Distinguish data from information and evaluate information quality and limitations",
    "Classify machine, transactional, human, internal, external, primary and secondary data",
    "Classify costs and responsibility centres for management purposes",
    "Select reports and visualisations appropriate to purpose and audience",
  ],
  sections: [
    ...pick(LEGACY_A, ["purpose", "classify", "behaviour", "centres"]),
    {
      id: "data-sources-presentation",
      heading: "Data sources, information quality and presentation",
      blocks: [
        { kind: "text", md: "**Data** are unprocessed observations; **information** is data organised and interpreted for a purpose. Sources may be machine or sensor data, transaction records, or human and social input. They may also be internal or external, and primary (collected for the present purpose) or secondary (originally collected for another purpose)." },
        { kind: "callout", tone: "key", title: "Published information is useful, not automatically reliable", md: "Assess authority, purpose, method, definitions, coverage, date, comparability and bias. Internet availability does not remove capture, cleaning, licensing, security or interpretation costs." },
        { kind: "table", caption: "Information by management level", head: ["Level", "Typical characteristics"], rows: [
          ["Strategic", "Summarised, external, forward-looking, long-term and relatively uncertain"],
          ["Tactical", "Periodic analysis for resource plans, targets and management control"],
          ["Operational", "Detailed, frequent, timely and transaction- or exception-focused"],
        ] },
        { kind: "text", md: "Reports should state purpose, scope, material findings and action. Use tables for exact comparisons, line charts for trends, bar charts for categories, pie charts only for a small part-to-whole comparison, and scatter graphs for possible relationships. A visually impressive chart that hides scale, uncertainty or definitions is poor information." },
      ],
    },
  ],
  examTraps: LEGACY_A.examTraps.filter((item) => !/high.?low/i.test(`${item.trap} ${item.fix}`)),
  keyTerms: LEGACY_A.keyTerms.filter((item) => !/high.?low/i.test(`${item.term} ${item.def}`)),
  summary: [
    "Management accounting supports planning, decisions and control; its reports are internal, purpose-specific and not confined to historical money values.",
    "Information quality depends on relevance, accuracy, completeness, timeliness, clarity and cost-benefit—not volume.",
    "Costs and responsibility centres are classified differently for different decisions and accountabilities.",
    "Presentation should make the decision easier without concealing definitions, scale, uncertainty or exceptions.",
  ],
}

const DATA_ANALYSIS_SECTIONS: StudySection[] = [
  {
    id: "sampling-data-types",
    heading: "Sampling, data types and descriptive analysis",
    blocks: [
      { kind: "text", md: "Sampling reduces the cost and time of studying a population, but the method must fit the population. **Random** gives each unit a known chance; **systematic** selects every nth unit after a random start; **stratified** samples within important subgroups; **cluster** selects whole natural groups; **multistage** samples in successive layers; **quota** fills category targets without random selection." },
      { kind: "table", caption: "Classifying data", head: ["Type", "Meaning", "Example"], rows: [
        ["Nominal", "Categories with no order", "Department"],
        ["Ordinal", "Ordered categories without equal intervals", "Satisfaction rating"],
        ["Discrete", "Countable numerical values", "Number of defects"],
        ["Continuous", "Measured values on a continuum", "Processing time"],
      ] },
      { kind: "text", md: "The **mean** uses every value but is sensitive to extremes; the **median** is the middle and is robust to skew; the **mode** is most frequent and works for categories. Variance and standard deviation measure absolute dispersion around the mean; coefficient of variation compares relative dispersion across series with different means or units." },
      { kind: "formula", name: "Coefficient of variation", expr: "standard deviation ÷ mean × 100%" },
    ],
  },
  {
    id: "forecasting",
    heading: "Cost estimation, regression and time series",
    blocks: [
      ...pick(LEGACY_A, ["highlow"])[0].blocks,
      { kind: "text", md: "A scatter graph tests whether a linear relationship is plausible. The correlation coefficient r ranges from −1 to +1 and measures direction and strength of linear association; r² is the proportion of variation in the dependent variable associated with the fitted linear relationship. Neither proves causation." },
      { kind: "formula", name: "Linear regression forecast", expr: "y = a + bx" },
      { kind: "text", md: "A time series may contain trend, seasonal, cyclical and random components. Moving averages smooth short-term noise to estimate trend. Under an **additive** model, seasonal effects are amounts added or subtracted; under a **multiplicative** model, they are proportions or indices applied to trend." },
      { kind: "callout", tone: "warn", title: "Forecasts inherit model assumptions", md: "High-low uses only two observations. Regression assumes the fitted relationship remains relevant. Time-series extrapolation assumes past structure persists. Always consider range, outliers, structural change and data quality." },
    ],
  },
  {
    id: "indices-uncertainty",
    heading: "Indices, expected values and distributions",
    blocks: [
      { kind: "text", md: "Index numbers express a value relative to a base, normally 100. A simple index follows current value ÷ base value × 100. Weighted indices reflect the relative importance of items. Laspeyres uses base-period quantities as weights; Paasche uses current-period quantities." },
      { kind: "formula", name: "Expected value", expr: "Σ(probability × outcome)" },
      { kind: "text", md: "Expected value is a long-run probability-weighted average, not the result that must occur once. A normal distribution is symmetric and bell-shaped, with mean, median and mode equal; interpretation depends on distance from the mean in standard-deviation units." },
      { kind: "text", md: "The product life cycle—introduction, growth, maturity and decline—changes the relevance of historical demand, margins and marketing assumptions. Forecasting should reflect the product's stage rather than extrapolating one growth rate indefinitely." },
    ],
  },
  {
    id: "big-data-spreadsheets",
    heading: "Big data, analytics and spreadsheets",
    blocks: [
      { kind: "text", md: "Big data is described through volume, variety, velocity, veracity and value. Data may be structured, semi-structured or unstructured. **Descriptive analytics** summarises what has happened; **inferential analysis** uses a sample to draw reasoned conclusions about a wider population." },
      { kind: "text", md: "Spreadsheets support models, scenarios, budgets and data analysis through formulas, functions, references, validation, sorting, filtering and charts. Their flexibility also creates risks: hard-coded assumptions, broken references, duplicated versions, hidden changes and weak access control." },
      { kind: "callout", tone: "rule", title: "A professional spreadsheet separates inputs, logic and outputs", md: "Label assumptions and units, use consistent formulas, validate inputs, protect critical cells, test boundary cases, reconcile totals and maintain version control and review evidence." },
    ],
  },
]

export const MA_OFFICIAL_B: StudyChapter = {
  paper: "MA",
  area: "B",
  title: "Data analysis and statistical techniques",
  minutes: 38,
  intro: "A forecast is not a guess with decimals: it is a transparent model built from suitable data, tested assumptions and proportionate statistical tools.",
  outcomes: [
    "Select an appropriate sampling method and classify categorical and numerical data",
    "Apply high-low, correlation, regression, time-series and index-number techniques",
    "Calculate and interpret averages, dispersion, expected values and normal-distribution information",
    "Explain big-data characteristics, data structures and analytical uses",
    "Use and control spreadsheets for management accounting analysis",
  ],
  sections: DATA_ANALYSIS_SECTIONS,
  examTraps: [
    { trap: "Treating correlation as proof that one variable causes another.", fix: "Correlation measures linear association; causation needs a credible mechanism and control of other explanations." },
    { trap: "Using expected value as the guaranteed outcome of one decision.", fix: "It is a probability-weighted long-run average, useful for repeated or comparable decisions." },
    { trap: "Mixing additive and multiplicative seasonal adjustments.", fix: "Additive seasonality uses amounts; multiplicative seasonality uses proportions or indices." },
  ],
  keyTerms: [
    { term: "Stratified sampling", def: "Dividing a population into relevant subgroups and sampling within each so important strata are represented." },
    { term: "Coefficient of determination", def: "r²: the proportion of variation in the dependent variable associated with the fitted linear relationship." },
    { term: "Expected value", def: "The probability-weighted average of possible outcomes." },
  ],
  summary: [
    "Choose sampling and summary methods to match the population, data type and decision.",
    "Forecasting models are useful only within defensible assumptions and relevant data ranges.",
    "Dispersion and uncertainty matter alongside averages.",
    "Spreadsheets require explicit assumptions, controlled logic, testing, reconciliation and review.",
  ],
}

const COST_INPUT_SECTION: StudySection = {
  id: "materials-labour-overheads",
  heading: "Materials, labour and overhead accounting",
  blocks: [
    { kind: "text", md: "Material control links ordering, receipt, storage and issue records. Reorder level manages the risk of running out; economic order quantity balances annual ordering cost against holding cost under simplifying assumptions. Inventory records must be reconciled with physical counts and investigated for loss, damage and recording error." },
    { kind: "formula", name: "Economic order quantity", expr: "√(2 × annual demand × ordering cost per order ÷ annual holding cost per unit)" },
    { kind: "text", md: "Labour cost separates productive time from idle time and distinguishes direct labour from indirect labour. Remuneration may use time rates, piecework or bonus schemes; incentives must be evaluated for quality, safety and behavioural effects as well as output." },
    { kind: "text", md: "Production overhead is allocated where wholly attributable, apportioned using a fair basis where shared, and service-centre cost is reapportioned to production centres. The direct method ignores services exchanged between service centres; step-down recognises some exchanges in sequence; the reciprocal (simultaneous-equation) method recognises services exchanged in both directions. An absorption rate then charges overhead to units; actual and absorbed overhead are compared to identify under- or over-absorption." },
  ],
}

const MODERN_COSTING_SECTION: StudySection = {
  id: "target-life-cycle-costing",
  heading: "Target and life-cycle costing",
  blocks: [
    { kind: "text", md: "**Target costing** begins with a competitive market price, deducts the required profit and derives the maximum target cost. If the estimated cost is higher, the cost gap must be closed through value engineering and cross-functional design decisions before production locks most costs in." },
    { kind: "formula", name: "Target cost", expr: "target selling price − required profit" },
    { kind: "text", md: "**Life-cycle costing** accumulates cost and revenue across research, design, launch, production, service and withdrawal. It prevents a low manufacturing cost from disguising high development, warranty, support or disposal cost and supports decisions while costs can still be influenced." },
    { kind: "callout", tone: "warn", title: "Do not cut customer-required function", md: "Closing a target-cost gap is value engineering, not indiscriminate cost cutting. Preserve the functions, quality, safety and compliance that create value." },
  ],
}

export const MA_OFFICIAL_C: StudyChapter = {
  paper: "MA",
  area: "C",
  title: "Cost accounting techniques",
  minutes: 40,
  intro: "Costing follows resources from purchase and work through overhead allocation to the product, service, job or process whose economics management needs to understand.",
  outcomes: [
    "Account for materials, labour and overheads and apply appropriate control procedures",
    "Apply absorption and marginal costing and reconcile their profit difference",
    "Apply job, batch, process and service costing",
    "Explain and apply activity-based, target and life-cycle costing principles",
  ],
  sections: [COST_INPUT_SECTION, ...pick(LEGACY_B, ["absorption", "oar", "marginal", "reconcile", "abc", "specific"]), MODERN_COSTING_SECTION],
  examTraps: LEGACY_B.examTraps,
  keyTerms: LEGACY_B.keyTerms,
  summary: LEGACY_B.summary,
}

const INVESTMENT_SECTION: StudySection = {
  id: "asset-budgeting",
  heading: "Asset budgets and investment appraisal",
  blocks: [
    { kind: "text", md: "Capital expenditure commits resources for long-term benefit and must be integrated with operating and cash budgets. Relevant appraisal cash flows are incremental, future and cash-based; sunk costs are excluded, while opportunity costs and working-capital effects are included." },
    { kind: "formula", name: "Payback period", expr: "time until cumulative project cash inflows recover the initial investment" },
    { kind: "formula", name: "Accounting rate of return", expr: "average annual accounting profit ÷ average investment × 100%" },
    { kind: "formula", name: "Net present value", expr: "Σ(cash flow at time t ÷ (1 + discount rate)^t)" },
    { kind: "callout", tone: "key", title: "Decision logic", md: "Payback prefers faster recovery but ignores later cash flows and time value. ARR uses accounting profit. NPV discounts all relevant cash flows and accepts a project when value added is positive, subject to capital and risk considerations." },
  ],
}

const BUDGET_CONTROL_SECTION: StudySection = {
  id: "budget-control-feedback",
  heading: "Budgetary control, feedback and uncertainty",
  blocks: [
    { kind: "text", md: "A budgetary-control report compares actual results with a flexed budget at the actual activity level, highlights material exceptions and assigns investigation to a manager able to influence the cause. **Feedback control** reacts after an outcome; **feedforward control** updates forecasts and acts before the final outcome occurs." },
    { kind: "text", md: "Sensitivity or what-if analysis changes one assumption at a time; scenario analysis changes a coherent set of assumptions to describe plausible combined futures. Both expose vulnerable assumptions but do not remove uncertainty or attach probabilities automatically." },
  ],
}

export const MA_OFFICIAL_D: StudyChapter = {
  ...LEGACY_C,
  area: "D",
  title: "Budgeting",
  minutes: 36,
  sections: [...LEGACY_C.sections, INVESTMENT_SECTION, BUDGET_CONTROL_SECTION],
}

export const MA_OFFICIAL_E: StudyChapter = {
  ...LEGACY_D,
  area: "E",
  title: "Standard costing",
  minutes: 34,
}

const PERFORMANCE_GAPS: StudySection = {
  id: "cost-quality-value-reporting",
  heading: "Cost reduction, quality, sustainability and reporting",
  blocks: [
    { kind: "text", md: "**Cost control** keeps costs within an existing standard; **cost reduction** seeks a real and sustained lower cost without unacceptable loss of function or quality. **Value analysis** examines whether each feature or activity delivers customer-required function at appropriate whole-life cost." },
    { kind: "text", md: "Total quality management treats quality as organisation-wide prevention and continuous improvement rather than final inspection. Measures should reflect defects, rework, complaints, returns, delivery reliability and process capability, recognising that service quality is often simultaneous, intangible and shaped by customer experience." },
    { kind: "callout", tone: "key", title: "Performance is multi-period and multi-stakeholder", md: "Short-term profit can be improved by cutting maintenance, learning or environmental investment while damaging long-term capability and risk. Sustainability measures connect resource use, resilience, impact and stakeholder expectations to the objectives being managed." },
    { kind: "text", md: "Management reports should highlight material exceptions, explain drivers rather than merely repeat numbers, distinguish controllable from uncontrollable factors, show trends and benchmarks, and recommend proportionate action. Measures for public and not-for-profit organisations emphasise economy, efficiency, effectiveness, service quality and mission outcomes." },
    { kind: "text", md: "Financial performance needs a balanced ratio set: profitability (margin and return), liquidity (current and quick ratios), activity or efficiency (inventory, receivables and asset use), and gearing (long-term financing risk). Definitions and accounting policies must be consistent before comparing periods or organisations." },
    { kind: "formula", name: "Production volume ratio", expr: "standard hours of actual output ÷ budgeted hours × 100%" },
    { kind: "formula", name: "Capacity ratio", expr: "actual hours worked ÷ budgeted hours × 100%" },
    { kind: "formula", name: "Efficiency ratio", expr: "standard hours of actual output ÷ actual hours worked × 100%" },
  ],
}

export const MA_OFFICIAL_F: StudyChapter = {
  ...LEGACY_E,
  area: "F",
  title: "Performance measurement",
  minutes: 32,
  sections: [...LEGACY_E.sections, PERFORMANCE_GAPS],
}
