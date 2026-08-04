import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area A, second half — the types of information system, data visualisation, and
 * big data and data analytics.
 * Chapters 3–4 of the PM reading tree, mapped to syllabus groups A1(d)–(e), A2(d) and A3.
 *
 * Split from `acca-study-pm-tree-a.ts` for file size. Chapter 4 is the one most likely to
 * appear in Section C as a discussion requirement, because the syllabus asks for the
 * CHALLENGES AND RISKS of big data as explicitly as it asks for the benefits — and a
 * one-sided answer scores half the marks.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 3 · A1(d), A1(e), A2(d) ──────────────────────────── */

export const PM_TREE_03: StudyChapter = {
  id: "PM-03",
  number: 3,
  paper: "PM",
  area: "A",
  title: "The types of information system, and presenting what they produce",
  minutes: 16,
  syllabusRefs: ["A1(d)", "A1(e)", "A2(d)"],
  intro:
    "Five system types, each built for a different level of decision — and the exam question is almost never what they are, but which one a described organisation actually needs.",
  outcomes: [
    "Identify the accounting information requirements at strategic, tactical and operational level",
    "Describe the main characteristics of TPS, MIS, EIS, ERP and CRM systems",
    "Match a system type to a described requirement and justify the choice",
    "Explain the importance of data visualisation in presenting management information",
    "Identify when a visualisation misleads",
  ],
  sections: [
    {
      id: "system-types",
      heading: "The five system types",
      blocks: [
        {
          kind: "table",
          caption: "The characteristics that distinguish them",
          head: ["System", "What it does", "Level served", "Typical output"],
          rows: [
            ["**TPS** — transaction processing system", "**Captures and records individual transactions** — orders, receipts, payments, timesheets. It is the source of everything else", "**Operational**", "Detailed listings, day books, order confirmations"],
            ["**MIS** — management information system", "**Summarises TPS data into routine, structured reports** for recurring control decisions", "**Tactical**", "Periodic variance reports, budget statements, exception reports"],
            ["**EIS** — executive information system", "Gives senior management **highly summarised internal AND external data**, with the ability to **drill down** where something looks wrong", "**Strategic**", "Dashboards, trend and KPI summaries, external comparators"],
            ["**ERP** — enterprise resource planning", "**Integrates processes and data across the whole organisation** into one database, so a sales order updates stock, production, purchasing and the ledger together", "**All three**", "Whatever the module supports; the point is a single source of truth"],
            ["**CRM** — customer relationship management", "Holds **all interactions with each customer**, supporting retention, segmentation and customer profitability", "**Tactical and operational**", "Customer histories, pipeline, churn and profitability analysis"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The relationship between them is the examinable point",
          md: "These are not five alternatives — they are largely a **hierarchy fed by the TPS**. Without accurate transaction capture, the MIS summarises rubbish and the EIS dashboard displays it confidently. So when a scenario describes managers distrusting the reports, look **downwards** at data capture rather than upwards at the reporting tool. **ERP** cuts across the hierarchy by putting everything in one database, which is why its benefit is *consistency* and its cost is *disruption* — it changes how the whole organisation works, not just what it reports.",
        },
        {
          kind: "example",
          title: "Matching systems to requirements",
          scenario:
            "Kelbridge Ltd has four complaints. The sales director cannot tell which customers are profitable, because order history sits in one system and margins in another. The production manager gets a monthly cost report and says it arrives too late to act on. The board wants a single view of performance against strategy including market share, which nobody currently reports. And the finance team re-keys sales orders into the stock system by hand, causing frequent mismatches.",
          steps: [
            { label: "The customer profitability problem", detail: "A CRM need — all interactions and value per customer in one place, supporting segmentation and customer profitability analysis. Note the underlying cause is that order and margin data are SEPARATE, which also points at integration." },
            { label: "The late cost report", detail: "Not a system-type problem at all but a FREQUENCY mismatch: an operational manager is being served tactical-cycle information. The fix is more frequent MIS reporting, or operational exception reporting straight off the TPS." },
            { label: "The board's request", detail: "An EIS need — highly summarised internal AND EXTERNAL data (market share is external), with drill-down. An MIS cannot supply it because an MIS reports internal transactions." },
            { label: "The manual re-keying", detail: "The clearest ERP case: one database so that a sales order updates stock, production and the ledger together. Re-keying between systems is precisely the duplication and mismatch ERP removes." },
            { label: "Identify the common root", detail: "Three of the four trace back to FRAGMENTED data rather than a missing report. So the honest recommendation is to consider ERP as the underlying answer, with CRM functionality within it, rather than buying four tools." },
            { label: "State the cost of that recommendation", detail: "ERP is the most DISRUPTIVE option — data migration, process change, retraining, and a long implementation. So the recommendation must be paired with that, and with the observation that the late cost report could be fixed immediately and cheaply meanwhile." },
          ],
          result:
            "**ERP with CRM functionality** addresses the root, but the late report needs no system at all — only a change of frequency. Naming the **cheap immediate fix alongside the structural one** is what separates a good answer from a shopping list.",
        },
      ],
      check: {
        q: "A board wants one view of performance against strategy, including market share, with the ability to drill into anything that looks wrong. Which system?",
        options: ["TPS", "MIS", "EIS", "CRM"],
        correct: 2,
        explain:
          "An EIS. It serves STRATEGIC decisions with highly summarised INTERNAL AND EXTERNAL data — market share being external — and supports DRILL-DOWN. An MIS reports internal transaction summaries and could not supply the external comparator.",
      },
    },
    {
      id: "visualisation",
      heading: "Data visualisation",
      blocks: [
        {
          kind: "list",
          title: "Why visualisation matters to management information",
          items: [
            "It **compresses volume**: a pattern across thousands of rows can be read in a second from a chart and not at all from the rows.",
            "It **exposes relationships, trends and outliers** that a table conceals — a seasonal pattern, or one branch behaving differently from twenty others.",
            "It **speeds decisions**, which matters because late information has no value (chapter 1).",
            "It **reaches non-specialists**, so operational managers and non-financial directors can act on financial information.",
            "It supports **drill-down**, letting a viewer move from the summary to the transaction behind it.",
            "It makes **exception reporting** natural: the eye finds the point outside the band without being told where to look.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A dashboard is not evidence that the underlying data is controlled",
          md: "This is the trap the syllabus is pointing at. Visualisation makes information **more persuasive**, and it does that whether or not the information is any good — so a well-designed dashboard built on uncontrolled source data is *worse* than a table, because it invites confident action on a wrong number. Specific ways a chart misleads: a **truncated axis** that magnifies a trivial movement; a chart type that implies a relationship the data does not support; **omitting the comparator or the trend**, so a figure has no context; aggregating so far that the variation which mattered disappears; and choosing the flattering period. So an answer on visualisation should always pair the benefit with **the need for controlled source data** (chapter 2).",
        },
        {
          kind: "table",
          caption: "Choosing a form for the message",
          head: ["What is being shown", "Suitable form"],
          rows: [
            ["Movement **over time**", "Line chart, so the trend is the visual"],
            ["**Comparison** between categories", "Bar chart, with a common baseline"],
            ["**Contribution to a total**", "Stacked bar or, sparingly, a pie"],
            ["**Relationship** between two variables", "Scatter, which is also what a regression assumption should be checked against (chapter 21)"],
            ["**Performance against target**", "Bullet or variance chart showing actual, target and tolerance together"],
            ["**Geographic or organisational spread**", "Heat map, which makes an outlier branch obvious"],
          ],
        },
      ],
      check: {
        q: "A dashboard shows a sharp rise in unit cost, but its vertical axis begins at 94% of the prior figure. What is the concern?",
        options: [
          "The chart type is wrong for a time series",
          "A truncated axis magnifies a small movement, so the visual overstates the change",
          "The data is too aggregated to be useful",
          "There is no concern, since the underlying figure is correct",
        ],
        correct: 1,
        explain:
          "A TRUNCATED AXIS magnifies a trivial movement into an apparent crisis. The figure may be perfectly accurate — the problem is that visualisation makes information more PERSUASIVE regardless of whether the impression it creates is warranted.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Recommending a new reporting tool where the real fault is transaction capture.",
      fix: "The MIS and EIS are fed by the TPS. If managers distrust the reports, look DOWNWARDS at data quality.",
    },
    {
      trap: "Offering an MIS where the requirement includes external data.",
      fix: "An MIS reports internal transaction summaries. External comparators mean an EIS.",
    },
    {
      trap: "Recommending ERP without naming its cost.",
      fix: "Its benefit is one source of truth; its cost is organisation-wide disruption, migration and retraining.",
    },
    {
      trap: "Listing visualisation benefits without the data-quality caveat.",
      fix: "A dashboard makes information more persuasive whether or not it is sound, so pair it with controlled source data.",
    },
  ],
  keyTerms: [
    { term: "TPS", def: "Transaction processing system — captures individual transactions and feeds every other system." },
    { term: "MIS", def: "Management information system — summarises transaction data into routine structured reports for tactical control." },
    { term: "EIS", def: "Executive information system — highly summarised internal and external data with drill-down, for strategic decisions." },
    { term: "ERP", def: "Enterprise resource planning — integrates processes and data organisation-wide into a single database." },
    { term: "CRM", def: "Customer relationship management — holds all customer interactions, supporting retention and customer profitability." },
    { term: "Truncated axis", def: "A chart axis not starting at zero, which magnifies small movements and misleads." },
  ],
  summary: [
    "TPS captures transactions, MIS summarises them for tactical control, EIS serves strategy with internal and external data and drill-down.",
    "ERP integrates the organisation into one database; CRM holds customer interactions and profitability.",
    "The types form a hierarchy fed by the TPS, so poor transaction capture undermines every report above it.",
    "Visualisation compresses volume, exposes trends and outliers, and speeds decisions.",
    "It also makes information more persuasive regardless of quality, so it must be paired with controlled source data.",
  ],
  knowledgeDiagnostic: [
    { q: "Which system serves strategic decisions and why?", a: "An EIS, because it combines highly summarised internal and external data with drill-down, which an MIS cannot supply." },
    { q: "What is ERP's benefit and its cost?", a: "One integrated database giving a single source of truth; the cost is organisation-wide disruption, data migration and retraining." },
    { q: "Why does poor transaction capture matter to an EIS?", a: "Because the TPS feeds the hierarchy — an MIS summarises what the TPS captured, and the EIS displays that summary confidently whether or not it is sound." },
    { q: "Give three ways a visualisation can mislead.", a: "A truncated axis magnifying a small movement, omitting the comparator or trend so a figure lacks context, and aggregating until the variation that mattered disappears." },
  ],
}

/* ── Chapter 4 · A3 ───────────────────────────────────────────── */

export const PM_TREE_04: StudyChapter = {
  id: "PM-04",
  number: 4,
  paper: "PM",
  area: "A",
  title: "Big data and data analytics",
  minutes: 16,
  syllabusRefs: ["A3(a)", "A3(b)", "A3(c)", "A3(d)"],
  intro:
    "Big data is defined by five characteristics, only one of which is size — and the syllabus asks for the risks as plainly as for the benefits, so a one-sided answer throws away half the marks.",
  outcomes: [
    "Describe the five characteristics of big data",
    "Explain the purpose of the big data pyramid",
    "Explain the uses and benefits of big data, data mining and data analytics",
    "Distinguish descriptive, diagnostic, predictive and prescriptive analytics",
    "Discuss the challenges and risks of implementing and using big data",
  ],
  sections: [
    {
      id: "the-five-vs",
      heading: "The five Vs, and the pyramid",
      blocks: [
        {
          kind: "table",
          caption: "The characteristics of big data",
          head: ["Characteristic", "What it means", "Why it is a problem to solve"],
          rows: [
            ["**Volume**", "The sheer quantity of data — far beyond what a spreadsheet or conventional database handles", "Needs storage and processing capacity, and makes traditional analysis impractical"],
            ["**Velocity**", "The **speed** at which it arrives and must be processed, often continuously", "Batch reporting cannot keep up; the value may expire before the report"],
            ["**Variety**", "The range of forms — structured records, but also text, images, video, sensor readings, social media", "Unstructured data cannot simply be put in columns, so it needs different tools"],
            ["**Veracity**", "How far it can be **trusted** — completeness, accuracy, bias and provenance", "The most easily forgotten and the most dangerous: volume creates an illusion of reliability"],
            ["**Value**", "Whether analysing it actually **improves a decision**", "Everything else is cost. Data with no decision attached to it is an expense, not an asset"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Veracity and value are the two that answer exam questions",
          md: "Volume, velocity and variety describe the *data*; **veracity** and **value** describe whether it is worth anything, and they are where the marks are. A scenario boasting about the quantity of data captured is usually setting up one of two answers: that nobody has established whether the data is **reliable** (veracity), or that nobody has identified the **decision** it would improve (value). \"We collect a great deal of data\" is not an achievement.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The big data pyramid",
            caption: "Each level is worth more and there is less of it. Analysis moves upwards.",
            data: {
              levels: [
                { label: "Wisdom", sub: "Knowing which action to take, and why — judgement" },
                { label: "Knowledge", sub: "Patterns and relationships that explain what is happening" },
                { label: "Information", sub: "Processed data with context, capable of reducing uncertainty" },
                { label: "Data", sub: "Raw captured facts, in enormous quantity and of no use as they stand" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "What the pyramid is for",
          md: "It makes the point that **value is created by moving up, not by collecting more at the bottom**. Doubling the data doubles the storage cost and adds nothing until it becomes information, knowledge and finally a better decision. It also explains why an organisation can have vastly more data than its competitor and worse decisions: it has built a bigger base without climbing.",
        },
      ],
      check: {
        q: "An organisation captures millions of sensor readings daily but cannot say what decisions they inform. Which characteristic is lacking?",
        options: ["Volume", "Velocity", "Variety", "Value"],
        correct: 3,
        explain:
          "VALUE — whether analysing the data actually improves a decision. Volume, velocity and variety are all plainly present; without value they are simply cost. Data with no decision attached is an expense, not an asset.",
      },
    },
    {
      id: "analytics",
      heading: "Analytics, and what it costs to get wrong",
      blocks: [
        {
          kind: "table",
          caption: "The four types of analytics",
          head: ["Type", "Question answered", "PM example"],
          rows: [
            ["**Descriptive**", "**What happened?**", "Last quarter's sales by region and product"],
            ["**Diagnostic**", "**Why did it happen?**", "Which variances explain the margin fall, and how they interact (chapter 28)"],
            ["**Predictive**", "**What is likely to happen?**", "Forecast demand for budgeting, or expected churn by customer segment"],
            ["**Prescriptive**", "**What should we do about it?**", "The optimal production mix given constraints, or the profit-maximising price"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Predictive is not prescriptive",
          md: "The distinction is regularly examined and regularly muddled. **Predictive** analytics says what is likely: demand will fall 8%. **Prescriptive** says what to do: cut this product, reprice that one, run the line four days a week. Prescriptive requires an objective and the constraints, which is why so much of PM is prescriptive in substance — limiting factor analysis, linear programming and pricing decisions all answer \"what should we do\". A scenario that produces a forecast and stops has done predictive work and called it prescriptive.",
        },
        {
          kind: "definition",
          term: "Data mining",
          md: "Searching large data sets for **previously unsuspected patterns and relationships**, rather than testing a hypothesis somebody already had. Its strength is finding what nobody thought to look for; its weakness is that in a large enough data set some apparent relationships will be **coincidence**, which is why a mined pattern needs a plausible explanation before it is acted on.",
        },
        {
          kind: "list",
          title: "The benefits — what big data and analytics actually deliver",
          items: [
            "**Better forecasting** for budgeting, replacing extrapolation with modelled demand drivers (chapter 21).",
            "**More accurate costing**, since cost driver behaviour can be observed rather than assumed — which is the empirical case for ABC (chapter 5).",
            "**Customer-level insight**: profitability, segmentation, churn prediction and targeted pricing.",
            "**Operational optimisation** — maintenance before failure, yield improvement, and route or schedule optimisation.",
            "**Faster variance detection**, so control becomes closer to real time instead of monthly.",
            "**New products and services**, and evidence for entering or leaving a market.",
          ],
        },
        {
          kind: "list",
          title: "The challenges and risks — which the syllabus asks for explicitly",
          items: [
            "**Cost**: storage, tools, and above all the scarce specialist skills. The investment often precedes any identified benefit.",
            "**Data quality (veracity)**: incomplete, stale or inconsistent data produces confident wrong answers, and volume disguises it.",
            "**Bias**: a model trained on the past reproduces the past, including whatever bias was in it. A pricing or credit model can discriminate without anyone intending it.",
            "**Opaque assumptions**: where nobody can explain why the model recommends something, it cannot properly be challenged — and management remains accountable for it.",
            "**Confusing correlation with causation**, which data mining makes especially easy.",
            "**Privacy and data protection**, with legal and reputational consequences for holding or using personal data improperly.",
            "**Cyber risk**: a large concentrated data set is a more valuable target and a bigger loss if breached (chapter 2).",
            "**Organisational resistance and skills gaps**, so the tools are bought and not used.",
            "**Over-reliance**, displacing judgement where the data cannot capture what matters.",
          ],
        },
        {
          kind: "example",
          title: "Advising on a big data proposal",
          scenario:
            "Thornlea Retail proposes spending £900,000 on a data platform capturing every till transaction, loyalty card record, web session and store sensor reading. The IT director's case says the platform will \"give us big data\" and lists volume, velocity and variety as evidence. There is no stated use beyond \"better insight\". Marketing separately wants to use the loyalty data to set individual prices, and the finance director has asked whether last year's promotional data can be used to forecast next year's demand.",
          steps: [
            { label: "Test the case as presented", detail: "It establishes VOLUME, VELOCITY and VARIETY and says nothing about VERACITY or VALUE — the only two that determine whether the £900,000 is worth spending. \"Better insight\" is not a decision, so as stated this is £900,000 of cost with no identified benefit." },
            { label: "Reframe what would make the case", detail: "Identify the DECISIONS the data would improve and what each is worth: demand forecasting for budgeting, markdown timing, range and space allocation, and churn prevention. Then the pyramid point — value comes from climbing to information and knowledge, not from a bigger base of data." },
            { label: "Classify the finance director's request", detail: "Using promotional history to forecast demand is PREDICTIVE analytics, and a legitimate and immediately useful application feeding the budget (chapter 21). Note it needs no new platform if the promotional data already exists." },
            { label: "Classify and challenge the marketing request", detail: "Individual pricing from loyalty data is PRESCRIPTIVE. It carries the sharpest risks: PRIVACY and data protection, BIAS if the model prices by proxy characteristics, and reputational damage if customers discover they are charged differently. It needs a legal review and a transparency decision before any technical work." },
            { label: "Name the risks the case omits", detail: "Specialist SKILLS (the platform is useless without analysts), DATA QUALITY across four very different sources, CYBER RISK from concentrating personal data, and the possibility that patterns found by mining are COINCIDENCE." },
            { label: "Give a recommendation", detail: "Do not approve as presented. Approve a limited first phase tied to the FORECASTING use, which has an identifiable benefit and low legal risk; defer individual pricing pending legal and ethical review; and require a value case per use rather than one platform-wide case." },
          ],
          result:
            "The proposal proves the three Vs that describe the **data** and none of the two that establish it is **worth having**. The forecasting use is approvable now; individual pricing is the one that could cost more in reputation and regulatory exposure than the platform costs to build.",
        },
      ],
      check: {
        q: "A model recommends a specific production schedule given capacity constraints. Which type of analytics is that?",
        options: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
        correct: 3,
        explain:
          "PRESCRIPTIVE — it answers WHAT SHOULD WE DO, requiring an objective and constraints. Predictive would only say what is likely to happen. Much of PM is prescriptive in substance: limiting factor analysis, linear programming and pricing all recommend an action.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Listing volume, velocity and variety as proof that big data is worth having.",
      fix: "Those describe the data. VERACITY and VALUE decide whether it is worth anything.",
    },
    {
      trap: "Treating predictive analytics as prescriptive.",
      fix: "Predictive says what is likely; prescriptive says what to do, and needs an objective and constraints.",
    },
    {
      trap: "Answering a big data question with benefits only.",
      fix: "The syllabus asks for CHALLENGES AND RISKS explicitly — cost, quality, bias, opacity, privacy, cyber risk, skills and over-reliance.",
    },
    {
      trap: "Acting on a mined pattern because the data set is large.",
      fix: "In a large enough data set some relationships are coincidence. A mined pattern needs a plausible explanation first.",
    },
    {
      trap: "Assuming more data means better decisions.",
      fix: "The pyramid's point is that value comes from climbing to information and knowledge, not from enlarging the base.",
    },
  ],
  keyTerms: [
    { term: "Volume, velocity, variety", def: "The characteristics describing big data itself — quantity, speed of arrival, and range of forms." },
    { term: "Veracity", def: "How far the data can be trusted — completeness, accuracy, bias and provenance." },
    { term: "Value", def: "Whether analysing the data actually improves a decision; without it the data is only cost." },
    { term: "Big data pyramid", def: "Data to information to knowledge to wisdom — value comes from moving up, not enlarging the base." },
    { term: "Data mining", def: "Searching large data sets for previously unsuspected patterns rather than testing an existing hypothesis." },
    { term: "Predictive analytics", def: "Analysis answering what is likely to happen." },
    { term: "Prescriptive analytics", def: "Analysis answering what should be done, requiring an objective and constraints." },
  ],
  summary: [
    "Big data is characterised by volume, velocity, variety, veracity and value — the last two decide whether it is worth anything.",
    "The pyramid runs data, information, knowledge, wisdom, and value comes from climbing it rather than enlarging the base.",
    "Analytics is descriptive, diagnostic, predictive or prescriptive, and predictive is not prescriptive.",
    "Benefits include better forecasting, more accurate costing, customer insight, operational optimisation and faster control.",
    "Risks include cost, data quality, bias, opaque assumptions, correlation mistaken for causation, privacy, cyber risk, skills gaps and over-reliance.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five characteristics of big data and say which two matter most in an answer.", a: "Volume, velocity, variety, veracity and value. Veracity and value, because they determine whether the data can be trusted and whether it improves a decision." },
    { q: "What is the purpose of the big data pyramid?", a: "To show that value is created by moving from data to information, knowledge and wisdom, not by collecting more data at the base." },
    { q: "Distinguish predictive from prescriptive analytics.", a: "Predictive says what is likely to happen; prescriptive says what should be done, and requires an objective and the constraints." },
    { q: "Give four risks of big data.", a: "Cost and scarce skills, poor data quality disguised by volume, bias reproduced from historic data, and opaque model assumptions that cannot be challenged — plus privacy, cyber risk and over-reliance." },
    { q: "Why must a mined pattern be explained before it is acted on?", a: "Because in a large enough data set some apparent relationships are coincidence, so correlation may not be causation." },
  ],
}

export const PM_TREE_AREA_A_PART2: StudyChapter[] = [PM_TREE_03, PM_TREE_04]
