import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area B — Data analysis and statistical techniques.
 * Chapters 5–9 of the MA reading tree, mapped to syllabus groups B1–B4.
 *
 * The most formula-dense area of the paper. Note the deliberate ordering: the
 * syllabus lists forecasting (B2) before summarising data (B3), but regression
 * cannot be taught before the learner can compute a mean, so the reading order
 * here is sampling → summarising → regression → time series → spreadsheets.
 *
 * MA provides a FORMULAE SHEET in the exam. Where a formula is given, the
 * chapters say so — the marks are for knowing WHEN to use it, not for recall.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 5 · B1 ────────────────────────────────────────────── */

export const MA_TREE_05: StudyChapter = {
  id: "MA-05",
  number: 5,
  paper: "MA",
  area: "B",
  title: "Sampling methods",
  minutes: 12,
  syllabusRefs: ["B1(a)", "B1(b)"],
  intro:
    "Examining every item is usually impossible and always expensive, so management accounting works from samples. Which sampling method you choose decides whether the conclusion can be relied on at all.",
  outcomes: [
    "Explain why sampling is used rather than examining a whole population",
    "Describe random, systematic, stratified, multi-stage, cluster and quota sampling",
    "Distinguish probability from non-probability sampling methods",
    "Choose an appropriate sampling method for a given situation and justify the choice",
  ],
  sections: [
    {
      id: "why-sample",
      heading: "Why sample at all",
      blocks: [
        {
          kind: "definition",
          term: "Population and sample",
          md: "The **population** is every item you could examine — all 40,000 invoices, all 900 employees, every unit produced. A **sample** is the subset actually examined, from which a conclusion about the whole population is drawn.",
        },
        {
          kind: "list",
          title: "Why a sample rather than the whole population",
          items: [
            "**Cost** — examining everything is usually uneconomic, and information must be cost-effective.",
            "**Time** — a complete examination may take so long that the conclusion arrives too late to act on.",
            "**Practicality** — the population may be effectively infinite (every future unit) or impossible to list.",
            "**Destructive testing** — testing every unit to failure would leave nothing to sell.",
            "**Sufficient accuracy** — a well-chosen sample answers the question closely enough for the decision.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "What a sample must be",
          md: "**Representative** of the population it stands for. A sample that systematically over- or under-represents part of the population is **biased**, and a biased sample cannot be rescued by making it larger — it simply becomes a more confident wrong answer. Size affects precision; **selection method** affects bias, and they are different problems.",
        },
      ],
    },
    {
      id: "methods",
      heading: "The sampling methods",
      blocks: [
        {
          kind: "table",
          caption: "The six methods MA examines",
          head: ["Method", "How it works", "Suits", "Weakness"],
          rows: [
            ["**Simple random**", "Every item has an equal chance of selection, drawn from a complete list (a sampling frame)", "Homogeneous populations where a full list exists", "Needs a complete sampling frame; may by chance miss a small important subgroup"],
            ["**Systematic**", "Take every nth item after a random start — every 50th invoice", "Large ordered populations; quick and easy to administer", "Dangerous if the list has a repeating pattern matching the interval"],
            ["**Stratified**", "Split the population into strata, then sample randomly within each, usually in proportion to size", "Populations with distinct subgroups that differ from each other", "Requires knowing the strata in advance"],
            ["**Multi-stage**", "Sample progressively narrower units — regions, then branches within them, then items", "Large, geographically dispersed populations", "Error compounds at each stage"],
            ["**Cluster**", "Divide into clusters and examine every item in the selected clusters", "Where a full list is unavailable but natural groupings exist", "Clusters may be internally similar, so the effective sample is smaller than it looks"],
            ["**Quota**", "Interviewers fill fixed quotas of each category, choosing whom they like within them", "Fast, cheap market research", "**Non-random** — the interviewer's choice introduces bias"],
          ],
        },
        {
          kind: "definition",
          term: "Probability and non-probability sampling",
          md: "In a **probability** (random) method, every item's chance of selection is known and non-zero — random, systematic, stratified, multi-stage and cluster sampling all qualify. In a **non-probability** method it is not: **quota** sampling is the syllabus's example, because the interviewer decides who fills the quota. Only probability samples support statistical inference about the population.",
        },
        {
          kind: "illustration",
          title: "Why systematic sampling can fail badly",
          md: "An auditor tests every 20th delivery note from a list held in date order. The warehouse dispatches in a weekly cycle in which the 20th note each cycle is always the Friday bulk consignment to a single large customer.\n\nThe sample is now 100% Friday bulk deliveries. It is systematic, it looks methodical, and it tells the auditor nothing about the other 95% of dispatches.\n\nThe lesson is specific: systematic sampling is safe only when the list has **no repeating pattern** aligned with the sampling interval. Checking that before choosing the interval takes a minute.",
        },
        {
          kind: "activity",
          title: "Activity 1 — choose a method and justify it",
          prompt:
            "Recommend a sampling method for each, with a one-line justification.\n\n(a) Testing 200 of 60,000 sales invoices for correct authorisation. A complete numbered list exists.\n(b) Surveying employee satisfaction where 700 staff work in production, 180 in sales and 120 in administration, and the three groups are expected to differ sharply.\n(c) Interviewing 400 shoppers about a new product, quickly and cheaply, in four cities.\n(d) Inspecting output quality where the population is every unit the line will ever produce.",
          answer:
            "**(a) Systematic** (or simple random). A complete numbered list means a sampling frame exists, so either works; systematic is quicker to administer — take every 300th invoice after a random start. **Check first** that invoice numbering carries no repeating pattern, such as one branch always occupying certain endings.\n\n**(b) Stratified.** The three groups are expected to DIFFER, which is exactly the condition stratification is for: sample randomly within each stratum, proportionately (roughly 70/18/12), so no group is under-represented. Simple random sampling could easily under-sample administration and miss its distinct view.\n\n**(c) Quota**, and note the trade-off explicitly. It is the fastest and cheapest way to fill 400 interviews across four cities, but it is **non-probability**: interviewers choose whom to approach, which introduces bias, so the results cannot support statistical inference about all shoppers. Multi-stage sampling would be more rigorous and slower.\n\n**(d) Systematic**, because the population is effectively infinite and has no list — so there is no sampling frame to draw a random sample from. Taking every nth unit off the line is the practical answer, and note this is also a case where destructive testing may make a complete examination impossible in principle.",
        },
      ],
      check: {
        q: "A population contains three subgroups known to behave very differently from one another. Which sampling method best ensures each is properly represented?",
        options: ["Simple random sampling", "Systematic sampling", "Stratified sampling", "Quota sampling"],
        correct: 2,
        explain:
          "STRATIFIED sampling divides the population into strata and samples within each, usually in proportion to size — which guarantees every distinct subgroup is represented. Simple random and systematic sampling could by chance under-represent a small subgroup, and quota sampling is non-random, so it introduces interviewer bias.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Believing a larger sample corrects bias.",
      fix: "Size affects PRECISION; the selection method affects BIAS. A biased sample made larger is just a more confident wrong answer.",
    },
    {
      trap: "Treating quota sampling as a random method.",
      fix: "It is NON-probability: interviewers choose who fills the quota, so it cannot support statistical inference about the population.",
    },
    {
      trap: "Using systematic sampling without checking the list for a repeating pattern.",
      fix: "If the pattern aligns with the sampling interval, the sample captures only one kind of item and is worthless.",
    },
    {
      trap: "Confusing cluster with stratified sampling.",
      fix: "Stratified samples WITHIN every subgroup. Cluster examines ALL items in a few selected groups, which is cheaper but less representative.",
    },
  ],
  keyTerms: [
    { term: "Population", def: "Every item that could be examined in a given investigation." },
    { term: "Sampling frame", def: "A complete list of the population from which a random sample can be drawn." },
    { term: "Simple random sampling", def: "A method in which every item has an equal chance of selection." },
    { term: "Systematic sampling", def: "Selecting every nth item after a random start." },
    { term: "Stratified sampling", def: "Dividing the population into strata and sampling randomly within each, usually in proportion to size." },
    { term: "Cluster sampling", def: "Dividing the population into clusters and examining every item within the selected clusters." },
    { term: "Quota sampling", def: "A non-probability method in which interviewers fill fixed quotas of each category, choosing whom to approach." },
    { term: "Bias", def: "Systematic over- or under-representation of part of a population, which a larger sample cannot correct." },
  ],
  summary: [
    "Sampling is used because examining a whole population is usually too costly, too slow, impractical or destructive.",
    "A sample must be representative; sample size affects precision while the selection method affects bias.",
    "Simple random sampling needs a complete sampling frame and gives every item an equal chance.",
    "Systematic sampling takes every nth item and fails where the list has a repeating pattern matching the interval.",
    "Stratified sampling guarantees representation of distinct subgroups; cluster sampling examines all items in selected groups.",
    "Quota sampling is fast and cheap but non-probability, so it cannot support statistical inference.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is sampling used instead of examining a whole population?", a: "Cost, time, practicality (the population may be effectively infinite or unlistable), the destructiveness of some testing, and because a well-chosen sample is accurate enough for the decision." },
    { q: "Does a larger sample reduce bias?", a: "No. Size improves precision; only the selection method affects bias. A biased sample made larger becomes a more confident wrong answer." },
    { q: "When is stratified sampling the right choice?", a: "When the population contains distinct subgroups expected to differ from each other — sampling within each stratum, usually in proportion to size, guarantees each is represented." },
    { q: "What is the risk in systematic sampling?", a: "If the population list contains a repeating pattern aligned with the sampling interval, the sample captures only one kind of item and tells you nothing about the rest." },
    { q: "Why can quota sampling not support statistical inference?", a: "Because it is non-probability: the interviewer chooses whom to approach within each quota, so each item's chance of selection is unknown and bias is introduced." },
  ],
  furtherStudy: [
    "Sampling underpins audit testing, examined in far more depth in **AA**.",
    "The statistics computed from samples — mean, dispersion, expected values — are Chapter 6.",
  ],
}

/* ── Chapter 6 · B3 ────────────────────────────────────────────── */

export const MA_TREE_06: StudyChapter = {
  id: "MA-06",
  number: 6,
  paper: "MA",
  area: "B",
  title: "Summarising and analysing data",
  minutes: 19,
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)", "B3(d)", "B3(e)", "B3(f)", "B3(g)", "B3(h)", "B3(i)", "B3(j)"],
  intro:
    "Averages, spread, expected values and the normal distribution. This chapter turns a column of numbers into a statement a manager can act on — and shows why the average alone is rarely enough to act on.",
  outcomes: [
    "Describe the five characteristics of big data and its three types",
    "Say what a business actually does with big data, and what it costs to do it",
    "Distinguish categorical from continuous data, and descriptive from inferential analysis",
    "Work out a mean, a mode and a median, from a raw list and from grouped frequencies",
    "Calculate measures of dispersion including range, variance and standard deviation",
    "Calculate expected values and use them in decision-making",
    "Explain the properties of a normal distribution and interpret normal distribution tables",
  ],
  sections: [
    {
      id: "big-data",
      heading: "Big data",
      blocks: [
        {
          kind: "definition",
          term: "Big data — the five characteristics",
          md: "**Volume** (far more than conventional systems handle) · **Velocity** (arriving continuously, needing near-real-time processing) · **Variety** (many forms at once) · **Veracity** (uncertain accuracy, so quality must be managed) · **Value** (it is worth collecting only if it changes a decision).",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Five, not four",
          md: "MA's syllabus specifies **five** characteristics: the four Vs plus **VALUE**. Value is the one candidates omit, and it is the most commercially important — data that cannot change a decision is a cost, not an asset, however much of it there is.",
        },
        {
          kind: "table",
          caption: "The three types of big data",
          head: ["Type", "Means", "Examples"],
          rows: [
            ["**Structured**", "Organised in a defined format with fixed fields — it fits a table", "Sales ledger entries, payroll records, sensor readings, spreadsheet data"],
            ["**Semi-structured**", "Has some organising markers but no rigid schema", "Emails (headers structured, body not), XML and JSON files, tagged documents"],
            ["**Unstructured**", "No predefined format at all", "Free-text customer reviews, images, video, audio, social media posts"],
          ],
        },
        {
          kind: "list",
          title: "What a business actually uses big data and analytics for",
          items: [
            "**Understanding customers** — buying patterns, segmentation, churn prediction, personalisation.",
            "**Forecasting demand** more accurately, feeding directly into the budgets of Area D.",
            "**Optimising operations** — scheduling, routing, inventory levels, predictive maintenance from sensor data.",
            "**Pricing** — measuring how demand actually responds rather than assuming.",
            "**Detecting anomalies** — unusual transactions, expense claims or payments, which is a genuine fraud control.",
            "**Managing risk** — credit scoring and early warning indicators.",
          ],
        },
        {
          kind: "table",
          caption: "The honest limitations",
          head: ["Benefit", "Limitation"],
          rows: [
            ["Better and faster decisions from more evidence", "Cost of systems, storage and the skills to use them"],
            ["Patterns invisible in summarised data", "Correlation is not causation — a real relationship can support a wrong action"],
            ["Near-real-time response", "Veracity: high volume includes high volumes of error"],
            ["Competitive advantage from insight rivals lack", "Data protection and privacy obligations, which grow with the data held"],
            ["Automation of routine analysis", "Skills gap: output nobody can challenge is output nobody should trust"],
          ],
        },
      ],
    },
    {
      id: "data-types",
      heading: "Types of data and types of analysis",
      blocks: [
        {
          kind: "definition",
          term: "Categorical and continuous data",
          md: "**Categorical** data places items in categories. **Nominal** categories have no order (department, colour, supplier); **ordinal** categories have an order but no measurable interval (satisfaction rated poor/fair/good). **Continuous** (quantitative) data is measured on a scale where arithmetic is meaningful — hours, kilograms, dollars.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why the distinction constrains what you may calculate",
          md: "You can compute a **mean** only for data where arithmetic means something. The mean of a nominal variable is meaningless — the \"average department\" does not exist. For nominal data the only average available is the **MODE**. This is a favourite one-mark question.",
        },
        {
          kind: "definition",
          term: "Descriptive and inferential analysis",
          md: "**Descriptive** analysis summarises the data you have — totals, averages, spread, charts. **Inferential** analysis draws conclusions about a wider **population** from a sample, and so carries a stated degree of uncertainty. Describing 200 invoices is descriptive; concluding something about all 60,000 from those 200 is inferential.",
        },
      ],
      check: {
        q: "A survey records each respondent's department, which is nominal categorical data. Which measure of average can meaningfully be calculated?",
        options: ["The mean", "The median", "The mode", "The standard deviation"],
        correct: 2,
        explain:
          "For NOMINAL data — categories with no order — only the MODE is meaningful: the most frequently occurring category. A mean requires arithmetic on the values, and there is no 'average department'. A median requires the data to be ordered, which nominal categories are not, and standard deviation is a measure of dispersion requiring numerical values.",
      },
    },
    {
      id: "averages",
      heading: "Measures of average",
      blocks: [
        {
          kind: "formula",
          name: "Arithmetic mean",
          expr: "Mean  =  Σx  ÷  n",
          note: "Σx is the sum of all the values; n is the number of values. For grouped data, use Σfx ÷ Σf, where f is each class's frequency and x its midpoint.",
        },
        {
          kind: "table",
          caption: "The three averages compared",
          head: ["Measure", "Is", "Strength", "Weakness"],
          rows: [
            ["**Mean**", "The arithmetic average", "Uses every value; suits further calculation", "**Distorted by extreme values**; may not be an actual observation (2.4 employees)"],
            ["**Median**", "The middle value when arranged in order", "**Unaffected by extremes**; always a realistic value", "Ignores the size of all other values; awkward for further calculation"],
            ["**Mode**", "The most frequently occurring value", "The only average available for nominal data; useful for stock ranges and sizes", "May not exist, or there may be several; ignores most of the data"],
          ],
        },
        {
          kind: "example",
          title: "Worked example — mean, median and mode, and which to report",
          scenario:
            "Weekly earnings of seven staff in a department are $420, $440, $440, $460, $480, $500 and $3,200 (the last being the department manager). Calculate the mean, median and mode, and advise which best represents typical earnings.",
          steps: [
            { label: "Mean", detail: "Sum = 420 + 440 + 440 + 460 + 480 + 500 + 3,200 = $5,940. Mean = $5,940 ÷ 7 = $848.57." },
            { label: "Median", detail: "Already in order; with 7 values the middle one is the 4th: $460." },
            { label: "Mode", detail: "$440 occurs twice and every other value once, so the mode is $440." },
            { label: "Compare them", detail: "The mean of $848.57 is HIGHER than six of the seven actual earnings. One extreme value has pulled it above almost the whole distribution." },
          ],
          result:
            "Mean $848.57, median $460, mode $440. The **median** best represents typical earnings, because it is unaffected by the single extreme value. Reporting the mean here would be technically correct and materially misleading — which is the examinable point: choose the average that answers the question, and where a distribution is skewed by outliers, the median is the honest one.",
        },
        {
          kind: "example",
          title: "Worked example — mean of grouped data",
          scenario:
            "Machine downtime last month was recorded as: 0–10 minutes, 12 occasions; 10–20 minutes, 20 occasions; 20–30 minutes, 15 occasions; 30–40 minutes, 3 occasions. Calculate the mean downtime per occasion.",
          steps: [
            { label: "Take the midpoint of each class", detail: "0–10 → 5; 10–20 → 15; 20–30 → 25; 30–40 → 35. Grouped data hides the individual values, so the midpoint is assumed to represent each class." },
            { label: "Multiply each midpoint by its frequency (fx)", detail: "5 × 12 = 60; 15 × 20 = 300; 25 × 15 = 375; 35 × 3 = 105." },
            { label: "Sum Σfx and Σf", detail: "Σfx = 60 + 300 + 375 + 105 = 840. Σf = 12 + 20 + 15 + 3 = 50 occasions." },
            { label: "Divide", detail: "Mean = 840 ÷ 50 = 16.8 minutes per occasion." },
          ],
          result:
            "Mean downtime is 16.8 minutes per occasion. Note the assumption the method requires: that values are **evenly spread within each class**, so the midpoint represents it. If downtime actually clusters at the bottom of each band, the grouped mean overstates it — and stating that assumption is worth a mark.",
        },
      ],
    },
    {
      id: "dispersion",
      heading: "Measures of dispersion",
      blocks: [
        {
          kind: "text",
          md: "Two processes can share an identical mean and behave completely differently. Dispersion measures how **spread out** the values are, and in a management context spread usually matters more than the average — because it is variability that causes stockouts, missed deadlines and quality failures.",
        },
        {
          kind: "table",
          caption: "The measures",
          head: ["Measure", "Definition", "Comment"],
          rows: [
            ["**Range**", "Highest value − lowest value", "Trivial to compute; uses only two values, so one outlier dictates it"],
            ["**Interquartile range**", "Upper quartile − lower quartile", "Covers the middle 50%, so it ignores extremes"],
            ["**Variance**", "The mean of the squared deviations from the mean", "In squared units, so it cannot be read directly against the data"],
            ["**Standard deviation**", "The square root of the variance", "In the SAME units as the data, which is why it is the measure normally reported"],
            ["**Coefficient of variation**", "Standard deviation ÷ mean", "Relative spread — the right measure when comparing dispersion between datasets of different sizes"],
          ],
        },
        {
          kind: "formula",
          name: "Variance and standard deviation",
          expr: "Variance  =  Σ(x − x̄)²  ÷  n          Standard deviation  =  √Variance",
          note: "x̄ is the mean. For grouped data use Σf(x − x̄)² ÷ Σf. Standard deviation is reported in preference to variance because it shares the units of the original data.",
        },
        {
          kind: "example",
          title: "Worked example — standard deviation, and why it changes the decision",
          scenario:
            "Two suppliers quote the same average delivery time of 10 days. Supplier A's last five deliveries took 9, 10, 10, 11 and 10 days. Supplier B's took 4, 15, 6, 14 and 11 days. Calculate each standard deviation and advise.",
          steps: [
            { label: "Confirm both means are 10", detail: "A: (9+10+10+11+10) ÷ 5 = 50 ÷ 5 = 10. B: (4+15+6+14+11) ÷ 5 = 50 ÷ 5 = 10. Identical." },
            { label: "Supplier A — squared deviations from the mean", detail: "(9−10)² = 1; (10−10)² = 0; (10−10)² = 0; (11−10)² = 1; (10−10)² = 0. Sum = 2." },
            { label: "Supplier A — variance and standard deviation", detail: "Variance = 2 ÷ 5 = 0.4. Standard deviation = √0.4 = 0.63 days." },
            { label: "Supplier B — squared deviations", detail: "(4−10)² = 36; (15−10)² = 25; (6−10)² = 16; (14−10)² = 16; (11−10)² = 1. Sum = 94." },
            { label: "Supplier B — variance and standard deviation", detail: "Variance = 94 ÷ 5 = 18.8. Standard deviation = √18.8 = 4.34 days." },
          ],
          result:
            "A: 0.63 days. B: 4.34 days — nearly seven times the variability on an identical average. **Choose supplier A.** The management consequence is concrete: B's spread means production planning must hold buffer inventory to cover a delivery arriving five days late, and that buffer has a real cost. This is why dispersion, not the average, often decides the answer.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "When to use the coefficient of variation",
          md: "Comparing a standard deviation of $400 on a mean of $2,000 with one of $900 on a mean of $30,000 tells you nothing directly. Divide: 20% against 3%. The **coefficient of variation** is what makes dispersion comparable across datasets of different magnitude, and questions asking which of two processes is \"more variable\" usually want it.",
        },
      ],
      check: {
        q: "Two machines produce output with the same mean weight, but machine X has a standard deviation of 0.4g and machine Y of 2.6g. What does this tell you?",
        options: [
          "Machine X produces heavier output",
          "Machine Y is more consistent",
          "Machine X is more consistent, so machine Y is likelier to breach a tolerance limit",
          "Nothing, because the means are equal",
        ],
        correct: 2,
        explain:
          "Standard deviation measures VARIABILITY, not level — so with equal means, the LOWER standard deviation (machine X) is the more consistent. That matters commercially: machine Y's greater spread makes it far likelier to produce units outside a tolerance limit, causing rejects and rework even though its average is identical.",
      },
    },
    {
      id: "expected-values",
      heading: "Expected values",
      blocks: [
        {
          kind: "definition",
          term: "Expected value",
          md: "The **weighted average** of the possible outcomes of a decision, each weighted by its probability. It is the long-run average result if the same decision were repeated many times under the same conditions.",
        },
        {
          kind: "formula",
          name: "Expected value",
          expr: "EV  =  Σ (probability  ×  outcome)",
          note: "Probabilities must sum to 1. The EV is not a possible outcome in itself — it is an average, and it may be a value that could never actually occur.",
        },
        {
          kind: "example",
          title: "Worked example — choosing between two options on expected value",
          scenario:
            "A company must choose one of two products to launch. Product P: 0.3 probability of $80,000 profit, 0.5 of $40,000, 0.2 of a $10,000 loss. Product Q: 0.6 probability of $35,000 profit, 0.4 of $25,000. Calculate each expected value and advise.",
          steps: [
            { label: "Check the probabilities sum to 1", detail: "P: 0.3 + 0.5 + 0.2 = 1.0. Q: 0.6 + 0.4 = 1.0. Both valid — always check this first, because a question sometimes omits an outcome deliberately." },
            { label: "Expected value of P", detail: "(0.3 × 80,000) + (0.5 × 40,000) + (0.2 × −10,000) = 24,000 + 20,000 − 2,000 = $42,000. Note the LOSS enters as a negative." },
            { label: "Expected value of Q", detail: "(0.6 × 35,000) + (0.4 × 25,000) = 21,000 + 10,000 = $31,000." },
            { label: "Compare", detail: "P's expected value of $42,000 exceeds Q's $31,000 by $11,000." },
            { label: "Look at the risk, not just the average", detail: "P carries a 20% chance of losing $10,000; Q cannot lose money at all. P's outcomes range over $90,000; Q's over $10,000." },
          ],
          result:
            "On expected value alone, choose **P** at $42,000 against $31,000. But the examinable answer states the qualifications: EV is a **long-run average** and this is a **one-off** decision, so P's $42,000 will never actually occur — the outcome will be $80,000, $40,000 or −$10,000. EV also **ignores the decision-maker's attitude to risk**: a company that could not absorb a $10,000 loss should rationally prefer Q. And the whole calculation depends on **estimated probabilities**, which are themselves judgements.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The three limitations of expected value to state",
          md: "**It is a long-run average**, so it is weak justification for a one-off decision. **It ignores risk attitude** and the spread of outcomes entirely. **It depends on estimated probabilities**, which are frequently subjective. Almost every EV question awards marks for naming these, not just for the arithmetic.",
        },
      ],
    },
    {
      id: "normal-distribution",
      heading: "The normal distribution",
      blocks: [
        {
          kind: "list",
          title: "The properties to know",
          items: [
            "It is **symmetrical** about its mean, and bell-shaped.",
            "The **mean, median and mode all coincide** at the centre.",
            "It is defined entirely by two parameters: its **mean** and its **standard deviation**.",
            "The total **area under the curve is 1**, representing all outcomes — so areas are probabilities.",
            "The curve extends indefinitely in both directions, approaching but never touching the axis.",
            "**Roughly 68%** of values lie within 1 standard deviation of the mean, **95%** within 2, and **99.7%** within 3.",
          ],
        },
        {
          kind: "formula",
          name: "The standardised score, z",
          expr: "z  =  (x − μ)  ÷  σ",
          note: "x is the value of interest, μ the mean, σ the standard deviation. z is how many standard deviations x sits from the mean, which is what lets one table serve every normal distribution. Provided in the exam.",
        },
        {
          kind: "example",
          title: "Worked example — using z and the table",
          scenario:
            "Daily output from a process is normally distributed with a mean of 500 units and a standard deviation of 20 units. What is the probability that output on a given day exceeds 530 units?",
          steps: [
            { label: "Compute z", detail: "z = (530 − 500) ÷ 20 = 30 ÷ 20 = 1.5. The value of interest lies 1.5 standard deviations above the mean." },
            { label: "Read the table", detail: "Normal tables typically give the area between the mean and z. For z = 1.5 that area is 0.4332 — so 43.32% of days fall between 500 and 530 units." },
            { label: "Convert to the probability asked for", detail: "The question asks for MORE than 530. Half the distribution lies above the mean (0.5), so the area above 530 = 0.5 − 0.4332 = 0.0668." },
            { label: "Sense-check", detail: "530 is only 1.5 standard deviations out, and about 95% of values lie within 2, so a probability of roughly 7% in the upper tail is the right order of magnitude." },
          ],
          result:
            "The probability is **0.0668, or about 6.7%** — output would exceed 530 units on roughly 1 day in 15. The step candidates most often get wrong is the last one: the table gives the area from the mean to z, so the tail probability requires subtracting from 0.5. Always sketch the curve and shade the area you want before reading the table.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this matters to a management accountant",
          md: "It converts variability into a **probability of a specific business outcome**: the chance of running out of stock before a delivery arrives, of missing a delivery promise, of a unit falling outside tolerance. That is the bridge from Chapter 6's statistics to the inventory control decisions of Chapter 10.",
        },
      ],
      check: {
        q: "In a normal distribution, approximately what proportion of values lies within two standard deviations of the mean?",
        options: ["50%", "68%", "95%", "99.7%"],
        correct: 2,
        explain:
          "Approximately 95% of values lie within TWO standard deviations of the mean. The full set to remember is 68% within one, 95% within two and 99.7% within three. These follow from the curve's symmetry and are worth memorising, because they let you sense-check any z-table answer.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Giving four characteristics of big data instead of five.",
      fix: "MA specifies five: volume, velocity, variety, veracity AND VALUE. Value is the one omitted and the most commercially important.",
    },
    {
      trap: "Calculating a mean for nominal categorical data.",
      fix: "There is no 'average department'. For nominal data only the MODE is meaningful.",
    },
    {
      trap: "Reporting the mean where the distribution contains an extreme value.",
      fix: "The mean is distorted by outliers. Where a distribution is skewed, the MEDIAN represents the typical value honestly.",
    },
    {
      trap: "Comparing standard deviations of datasets with very different means.",
      fix: "Use the COEFFICIENT OF VARIATION (standard deviation ÷ mean) to make dispersion comparable.",
    },
    {
      trap: "Presenting an expected value as the outcome that will occur.",
      fix: "It is a long-run average and may be impossible as a single result. State that it ignores risk attitude and rests on estimated probabilities.",
    },
    {
      trap: "Forgetting to subtract from 0.5 when a normal table gives the area from the mean to z.",
      fix: "Sketch the curve and shade the area required. For an upper-tail probability, subtract the table value from 0.5.",
    },
    {
      trap: "Omitting a negative outcome, or entering a loss as positive, in an expected value.",
      fix: "A loss enters the calculation as a negative figure, and the probabilities must sum to 1 — check both before computing.",
    },
  ],
  keyTerms: [
    { term: "Big data", def: "Data characterised by volume, velocity, variety, veracity and value." },
    { term: "Structured data", def: "Data organised in a defined format with fixed fields, so it fits a table." },
    { term: "Unstructured data", def: "Data with no predefined format, such as free text, images, audio or video." },
    { term: "Nominal data", def: "Categorical data whose categories have no natural order, for which only the mode is a meaningful average." },
    { term: "Descriptive analysis", def: "Analysis that summarises the data actually held." },
    { term: "Inferential analysis", def: "Analysis that draws conclusions about a wider population from a sample, carrying stated uncertainty." },
    { term: "Mean", def: "The arithmetic average, Σx ÷ n; it uses every value but is distorted by extremes." },
    { term: "Median", def: "The middle value when data is arranged in order; unaffected by extreme values." },
    { term: "Mode", def: "The most frequently occurring value, and the only average available for nominal data." },
    { term: "Standard deviation", def: "The square root of the variance, measuring dispersion in the same units as the data." },
    { term: "Coefficient of variation", def: "Standard deviation divided by the mean, giving relative dispersion comparable across datasets." },
    { term: "Expected value", def: "The probability-weighted average of possible outcomes: Σ(probability × outcome)." },
    { term: "Normal distribution", def: "A symmetrical bell-shaped distribution defined by its mean and standard deviation, in which area represents probability." },
  ],
  summary: [
    "Big data has five characteristics — volume, velocity, variety, veracity and value — and three types: structured, semi-structured and unstructured.",
    "Nominal data supports only the mode; a mean requires values on which arithmetic is meaningful.",
    "Descriptive analysis summarises the data held; inferential analysis generalises from a sample to a population.",
    "The mean uses every value but is distorted by outliers; the median is unaffected by them; the mode suits nominal data.",
    "Grouped-data means use class midpoints and assume values are evenly spread within each class.",
    "Standard deviation measures spread in the data's own units; the coefficient of variation makes spread comparable between datasets.",
    "Two options with identical means can differ entirely in variability, and the spread often decides the decision.",
    "Expected value is Σ(probability × outcome) — a long-run average that ignores risk attitude and rests on estimated probabilities.",
    "In a normal distribution, 68%, 95% and 99.7% of values lie within one, two and three standard deviations of the mean.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the five characteristics of big data?", a: "Volume, velocity, variety, veracity and value. Value is the one most often omitted — data that cannot change a decision is a cost, not an asset." },
    { q: "Which average is appropriate for nominal categorical data, and why?", a: "The mode. Nominal categories have no order and no meaningful arithmetic, so neither a mean nor a median can be computed." },
    { q: "When should the median be reported instead of the mean?", a: "When the distribution contains extreme values. The mean is pulled toward an outlier and can sit above almost every actual observation, while the median stays representative." },
    { q: "How is expected value calculated, and what are its limitations?", a: "Σ(probability × outcome), with probabilities summing to 1 and losses entered as negatives. It is a long-run average, so it is weak for one-off decisions; it ignores risk attitude and spread; and it depends on estimated probabilities." },
    { q: "State the key properties of a normal distribution.", a: "Symmetrical and bell-shaped; mean, median and mode coincide; defined by mean and standard deviation; total area 1, so areas are probabilities; and 68%, 95% and 99.7% of values lie within one, two and three standard deviations." },
  ],
  furtherStudy: [
    "Standard deviation and the normal distribution feed inventory control and buffer stock decisions in Chapter 10.",
    "Expected values return in decision-making under uncertainty in **PM**.",
  ],
}

/* ── Chapter 7 · B2(a)–(h) ─────────────────────────────────────── */

export const MA_TREE_07: StudyChapter = {
  id: "MA-07",
  number: 7,
  paper: "MA",
  area: "B",
  title: "Separating and forecasting costs: high/low and regression",
  minutes: 20,
  syllabusRefs: ["B2(a)", "B2(b)", "B2(c)", "B2(d)", "B2(e)", "B2(f)", "B2(g)", "B2(h)"],
  intro:
    "Chapter 3 said a semi-variable cost is fixed plus variable. This chapter is how you find those two numbers when all you have is total costs at different activity levels — first the quick way, then the rigorous one.",
  outcomes: [
    "Explain the structure of a linear cost function and identify its elements",
    "Use high/low analysis to separate fixed and variable elements, including with a stepped cost or a changed variable rate",
    "State the advantages and disadvantages of high/low analysis",
    "Construct a scatter diagram and a line of best fit",
    "Explain and interpret the correlation coefficient and the coefficient of determination",
    "Use linear regression coefficients to forecast costs and revenues",
    "Restate figures from different years onto one price basis before analysing them",
    "Weigh up where regression can be relied on and where it cannot",
  ],
  sections: [
    {
      id: "linear-function",
      heading: "The linear cost function",
      blocks: [
        {
          kind: "formula",
          name: "The linear cost function",
          expr: "y  =  a  +  bx",
          note: "y = total cost · a = total FIXED cost · b = VARIABLE cost per unit · x = activity level. Every technique in this chapter estimates a and b from observed data.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Know which letter is which",
          md: "**a is the fixed cost in TOTAL** — the intercept, the cost at zero activity. **b is the variable cost PER UNIT** — the gradient. Swapping them is the commonest error in this chapter and it corrupts every subsequent figure. If a question gives you \"y = 12,000 + 3.5x\", fixed cost is $12,000 in total and variable cost is $3.50 per unit.",
        },
      ],
    },
    {
      id: "high-low",
      heading: "High/low analysis",
      blocks: [
        {
          kind: "definition",
          term: "High/low analysis",
          md: "A method of splitting a semi-variable cost by comparing the **highest** and **lowest ACTIVITY** levels observed. The difference in cost between them must be entirely variable, because the fixed element is the same at both.",
        },
        {
          kind: "formula",
          name: "Variable cost per unit by high/low",
          expr: "b  =  (Cost at highest activity − Cost at lowest activity)  ÷  (Highest activity − Lowest activity)",
          note: "Then substitute back into y = a + bx at either level to find a. Select on the highest and lowest ACTIVITY, never the highest and lowest COST.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Select on activity, not on cost",
          md: "Take the periods with the **highest and lowest ACTIVITY**, even if some other period happens to have a higher cost. Questions are deliberately built so that the highest-cost period is not the highest-activity period — usually because a stepped cost was triggered. Choosing on cost gives a plausible, wrong answer.",
        },
        {
          kind: "example",
          title: "Worked example — basic high/low",
          scenario:
            "Total production overhead was $74,000 at 9,000 units, $82,400 at 12,000 units, and $69,800 at 7,500 units. Separate the fixed and variable elements and forecast the cost at 10,500 units.",
          steps: [
            { label: "Identify highest and lowest ACTIVITY", detail: "Highest 12,000 units at $82,400. Lowest 7,500 units at $69,800. The 9,000-unit observation is not used." },
            { label: "Variable cost per unit", detail: "($82,400 − $69,800) ÷ (12,000 − 7,500) = $12,600 ÷ 4,500 = $2.80 per unit." },
            { label: "Fixed cost, substituting at the high point", detail: "Total $82,400 = a + (2.80 × 12,000) = a + $33,600, so a = $48,800." },
            { label: "Verify at the low point", detail: "$48,800 + (2.80 × 7,500 = $21,000) = $69,800. Agrees, so the arithmetic is sound." },
            { label: "Forecast at 10,500 units", detail: "$48,800 + (2.80 × 10,500 = $29,400) = $78,200." },
          ],
          result:
            "Fixed $48,800 per period plus $2.80 per unit; forecast cost at 10,500 units is **$78,200**. Always verify at the second point — it costs ten seconds and catches an arithmetic slip before it propagates into the forecast.",
        },
        {
          kind: "example",
          title: "Worked example — high/low with a stepped fixed cost",
          scenario:
            "Overhead was $56,000 at 4,000 units and $91,000 at 9,000 units. Fixed costs include a step: an additional $6,000 is incurred once output exceeds 6,000 units. Separate the elements.",
          steps: [
            { label: "Recognise the problem", detail: "The two observations are NOT on the same fixed-cost base: the high point includes the $6,000 step and the low point does not. Subtracting them directly would treat that $6,000 as variable cost." },
            { label: "Strip the step out of the high point", detail: "Adjusted high cost = $91,000 − $6,000 = $85,000. Both figures now sit on the SAME fixed base." },
            { label: "Variable cost per unit", detail: "($85,000 − $56,000) ÷ (9,000 − 4,000) = $29,000 ÷ 5,000 = $5.80 per unit." },
            { label: "Fixed cost below the step", detail: "At 4,000 units: $56,000 = a + (5.80 × 4,000 = $23,200), so a = $32,800." },
            { label: "Fixed cost above the step", detail: "$32,800 + $6,000 = $38,800 once output exceeds 6,000 units. Check at 9,000: $38,800 + (5.80 × 9,000 = $52,200) = $91,000. Agrees." },
          ],
          result:
            "Variable $5.80 per unit; fixed $32,800 up to 6,000 units and $38,800 above it. The examinable technique is **adjusting to a common fixed base before subtracting**. A candidate who ignores the step gets ($91,000 − $56,000) ÷ 5,000 = $7.00 per unit — a 21% overstatement of variable cost that would distort every forecast built on it.",
        },
        {
          kind: "table",
          caption: "High/low, weighed up honestly",
          head: ["Advantages", "Disadvantages"],
          rows: [
            ["Quick, simple and needs only two observations", "**Uses only two observations** and discards all the others"],
            ["No specialist software or statistical knowledge needed", "Those two are the **extremes**, which are the likeliest to be untypical"],
            ["Easy to explain to a non-financial manager", "Assumes a **strictly linear** relationship, which may not hold"],
            ["Adequate where the relationship is genuinely close to linear", "Ignores the strength of the relationship entirely — it gives no measure of reliability"],
            ["", "Assumes the relationship holds outside the observed range, which is unsafe"],
          ],
        },
      ],
      check: {
        q: "Total cost was $40,000 at 5,000 units and $52,000 at 8,000 units. What is the variable cost per unit?",
        options: ["$4.00", "$5.00", "$6.50", "$8.00"],
        correct: 0,
        explain:
          "High/low: ($52,000 − $40,000) ÷ (8,000 − 5,000) = $12,000 ÷ 3,000 = $4.00 per unit. Note the tempting wrong answers: $8.00 is total cost ÷ units at the low point (which mixes in fixed cost), and $6.50 is total cost ÷ units at the high point. Dividing total cost by volume gives cost PER UNIT INCLUDING FIXED, never the variable rate.",
      },
    },
    {
      id: "scatter-correlation",
      heading: "Scatter diagrams and correlation",
      blocks: [
        {
          kind: "text",
          md: "A scatter diagram plots each paired observation of activity and cost. It answers a question high/low cannot: **is there actually a relationship here**, and how tight is it?",
        },
        {
          kind: "definition",
          term: "Correlation",
          md: "The extent to which two variables **move together**. **Positive** correlation means they rise together; **negative** means one rises as the other falls; **zero** means no linear relationship. Correlation may be **perfect**, **partial** or absent.",
        },
        {
          kind: "formula",
          name: "The correlation coefficient, r",
          expr: "r  =  [ nΣxy − ΣxΣy ]  ÷  √{ [ nΣx² − (Σx)² ] [ nΣy² − (Σy)² ] }",
          note: "Provided on the exam formulae sheet. r always lies between −1 and +1. The marks are for interpreting it and for knowing when to use it, not for memorising it.",
        },
        {
          kind: "table",
          caption: "Interpreting r",
          head: ["Value of r", "Means"],
          rows: [
            ["+1", "Perfect positive linear correlation — every point lies exactly on an upward line"],
            ["+0.7 to +0.99", "Strong positive correlation"],
            ["+0.3 to +0.7", "Moderate positive correlation"],
            ["0", "No LINEAR correlation (a strong curved relationship could still exist)"],
            ["−0.7 to −0.99", "Strong negative correlation"],
            ["−1", "Perfect negative linear correlation"],
          ],
        },
        {
          kind: "definition",
          term: "The coefficient of determination, r²",
          md: "The square of the correlation coefficient. It states the **proportion of the variation in y that is explained by variation in x**. If r = 0.9 then r² = 0.81, so 81% of the change in cost is explained by the change in activity — and **19% is explained by something else**.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two interpretation points that carry the marks",
          md: "**r measures the strength and direction of a LINEAR relationship. r² states how much of the variation is EXPLAINED.** And the point examiners return to most: **correlation is not causation.** Two variables can move together because both are driven by a third, or by coincidence. A high r justifies using x to forecast y; it does not establish that x causes y.",
        },
        {
          kind: "illustration",
          title: "A high correlation that would mislead",
          md: "An analyst finds a correlation of 0.88 between monthly ice-cream sales and monthly factory absenteeism, and proposes discouraging ice cream in the staff canteen.\n\nThe correlation is real. The causal story is nonsense: both are driven by a third variable, **summer weather**, which raises ice-cream sales and raises holiday absence at the same time.\n\nNote what remains true even so — if summers keep behaving as they have, ice-cream sales would still *forecast* absenteeism perfectly usably. Correlation licenses **prediction**; only a mechanism licenses **intervention**. That distinction is the whole of the point.",
        },
      ],
    },
    {
      id: "regression",
      heading: "Linear regression",
      blocks: [
        {
          kind: "definition",
          term: "Linear regression",
          md: "A statistical technique that finds the **line of best fit** through all the observations — the line minimising the total squared vertical distance from the points to the line. It uses **every** observation, which is precisely what high/low does not.",
        },
        {
          kind: "formula",
          name: "The regression coefficients",
          expr: "b  =  [ nΣxy − ΣxΣy ]  ÷  [ nΣx² − (Σx)² ]          a  =  ȳ  −  b x̄",
          note: "Provided on the exam formulae sheet. b is the gradient (variable cost per unit); a is the intercept (total fixed cost). ȳ and x̄ are the means of y and x.",
        },
        {
          kind: "example",
          title: "Worked example — regression forecast from given coefficients",
          scenario:
            "Regression of total maintenance cost (y, in $) on machine hours (x) over 24 months gives a = 8,400 and b = 6.25, with r = 0.94. Forecast the cost at 3,000 machine hours, state what r² tells you, and comment on the reliability of a forecast at 9,000 hours if the observed range was 1,500 to 4,000 hours.",
          steps: [
            { label: "Forecast at 3,000 hours", detail: "y = a + bx = 8,400 + (6.25 × 3,000) = 8,400 + 18,750 = $27,150." },
            { label: "Interpret the coefficients", detail: "Fixed maintenance cost is $8,400 per month in TOTAL; the variable rate is $6.25 per machine hour." },
            { label: "Compute and interpret r²", detail: "r² = 0.94² = 0.8836, so about 88% of the variation in maintenance cost is explained by variation in machine hours — and about 12% by other factors such as machine age, operator skill or the type of work run." },
            { label: "Assess the 9,000-hour forecast", detail: "9,000 hours lies far OUTSIDE the observed range of 1,500 to 4,000 hours. That is EXTRAPOLATION: the linear relationship was only ever established within the observed range, and at 9,000 hours the business would likely need additional shifts, more machines or a maintenance contract — a different cost structure entirely." },
          ],
          result:
            "Forecast at 3,000 hours: **$27,150**, on a relationship explaining 88% of cost variation — a usable forecast, since 3,000 hours sits inside the observed range. The 9,000-hour forecast of $64,650 should **not** be relied on: it extrapolates well beyond the data, and stating that is where the mark sits.",
        },
        {
          kind: "table",
          caption: "Linear regression, weighed up",
          head: ["Advantages", "Disadvantages"],
          rows: [
            ["Uses **every** observation, not just two", "Assumes a **linear** relationship, which may be wrong"],
            ["Gives a measure of reliability through r and r²", "Assumes the relationship will **continue** to hold in future"],
            ["More objective — the line does not depend on visual judgement", "Unreliable **outside the observed range** (extrapolation)"],
            ["Widely available in spreadsheets and easy to update", "Historical data may include unusual periods that distort the line"],
            ["Extends to forecasting revenue and demand, not just cost", "Correlation does not establish causation, so the relationship may be spurious"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Interpolation and extrapolation",
          md: "**Interpolation** forecasts within the range of observed data and is reasonably safe. **Extrapolation** forecasts outside it and is not, because nothing in the data says the relationship continues. Almost every regression question in MA contains an extrapolation trap, and identifying it is a reliable mark.",
        },
      ],
      check: {
        q: "A regression gives r = 0.8. What does this tell you about the proportion of variation in y explained by x?",
        options: ["80%", "64%", "89%", "20%"],
        correct: 1,
        explain:
          "The proportion of variation explained is r², not r: 0.8² = 0.64, so 64% of the variation in y is explained by variation in x — and 36% by other factors. Answering 80% confuses the correlation coefficient with the coefficient of determination, which is exactly the distinction being tested.",
      },
    },
    {
      id: "price-adjustment",
      heading: "Adjusting data for price movements",
      blocks: [
        {
          kind: "text",
          md: "Cost data gathered over several years is contaminated by inflation. Regressing raw historic costs on volume will attribute price increases to volume, overstating the variable rate. The fix is to restate every figure to a **common price basis** first.",
        },
        {
          kind: "formula",
          name: "Restating a cost to a common price basis",
          expr: "Cost at target-year prices  =  Cost as recorded  ×  (Index of target year  ÷  Index of the year recorded)",
          note: "Restate every observation to one chosen year before analysing. Reverse the ratio to inflate a forecast from base-year prices back to a future year's prices.",
        },
        {
          kind: "example",
          title: "Worked example — deflate, analyse, then reinflate",
          scenario:
            "Costs were $60,000 in 20X1 when the cost index stood at 100, and $75,900 in 20X4 when it stood at 115. Activity was 10,000 units in 20X1 and 12,000 units in 20X4. Separate the fixed and variable elements at 20X1 prices, then forecast the cost of 13,000 units in 20X5 when the index is expected to reach 120.",
          steps: [
            { label: "Restate the 20X4 cost to 20X1 prices", detail: "$75,900 × (100 ÷ 115) = $66,000. Both observations are now on the same price basis, so any remaining difference is due to VOLUME alone." },
            { label: "High/low on the price-adjusted figures", detail: "($66,000 − $60,000) ÷ (12,000 − 10,000) = $6,000 ÷ 2,000 = $3.00 per unit at 20X1 prices." },
            { label: "Fixed cost at 20X1 prices", detail: "$60,000 = a + (3.00 × 10,000 = $30,000), so a = $30,000." },
            { label: "Forecast 13,000 units at 20X1 prices", detail: "$30,000 + (3.00 × 13,000 = $39,000) = $69,000." },
            { label: "Reinflate to 20X5 prices", detail: "$69,000 × (120 ÷ 100) = $82,800." },
            { label: "See what skipping the adjustment would have done", detail: "Raw high/low: ($75,900 − $60,000) ÷ 2,000 = $7.95 per unit — more than double the true $3.00, because the whole of three years' inflation was attributed to 2,000 extra units." },
          ],
          result:
            "Variable $3.00 per unit and fixed $30,000 at 20X1 prices; the 20X5 forecast is **$82,800**. The step that matters is doing the analysis at **constant prices** and only then reinflating. Skipping it inflated the variable rate by 165% — an error that would then corrupt every break-even, budget and variance built on it.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Choosing the highest and lowest COST periods for high/low.",
      fix: "Select on highest and lowest ACTIVITY. Questions are built so the highest-cost period is not the highest-activity one.",
    },
    {
      trap: "Ignoring a stepped fixed cost in high/low.",
      fix: "Adjust both observations to a common fixed base before subtracting, or the step is treated as variable cost and the rate is overstated.",
    },
    {
      trap: "Swapping a and b in y = a + bx.",
      fix: "a is TOTAL fixed cost (the intercept); b is variable cost PER UNIT (the gradient).",
    },
    {
      trap: "Dividing total cost by volume to find variable cost per unit.",
      fix: "That gives full cost per unit including fixed. The variable rate comes from the CHANGE in cost over the CHANGE in activity.",
    },
    {
      trap: "Quoting r as the proportion of variation explained.",
      fix: "That is r². If r = 0.8, then 64% is explained — not 80%.",
    },
    {
      trap: "Treating a high correlation as proof that x causes y.",
      fix: "Correlation licenses prediction, not intervention. A third variable or coincidence can produce a strong r.",
    },
    {
      trap: "Forecasting from a regression well outside the observed data range.",
      fix: "That is extrapolation and is unreliable, because the relationship was only ever established within the observed range. Say so.",
    },
    {
      trap: "Analysing multi-year cost data without adjusting for inflation.",
      fix: "Restate every observation to a common price basis first, or price increases are attributed to volume and the variable rate is badly overstated.",
    },
  ],
  keyTerms: [
    { term: "Linear cost function", def: "y = a + bx, where a is total fixed cost, b is variable cost per unit and x is the activity level." },
    { term: "High/low analysis", def: "Separating a semi-variable cost using the highest and lowest activity levels observed." },
    { term: "Correlation", def: "The extent to which two variables move together, measured by r between −1 and +1." },
    { term: "Coefficient of determination", def: "r², the proportion of variation in y explained by variation in x." },
    { term: "Linear regression", def: "A technique finding the line of best fit through all observations by minimising squared vertical deviations." },
    { term: "Interpolation", def: "Forecasting within the range of observed data, which is reasonably reliable." },
    { term: "Extrapolation", def: "Forecasting outside the range of observed data, which is unreliable because the relationship was never established there." },
  ],
  summary: [
    "Every technique here estimates a and b in y = a + bx: a is total fixed cost, b is variable cost per unit.",
    "High/low uses the highest and lowest ACTIVITY levels; a stepped cost must be adjusted to a common fixed base first.",
    "High/low is quick but uses only two, possibly untypical, observations and gives no measure of reliability.",
    "Correlation r runs from −1 to +1 and measures the strength and direction of a linear relationship.",
    "r² states the proportion of variation explained — if r = 0.9, then 81% is explained and 19% is not.",
    "Correlation is not causation: it licenses prediction, not intervention.",
    "Regression uses every observation and provides reliability measures, but assumes linearity and continuation.",
    "Interpolation is reasonably safe; extrapolation beyond the observed range is not, and saying so earns marks.",
    "Multi-year cost data must be restated to a common price basis before analysis, or inflation is attributed to volume.",
  ],
  knowledgeDiagnostic: [
    { q: "In y = a + bx, what do a and b represent?", a: "a is total fixed cost (the intercept, the cost at zero activity); b is variable cost per unit (the gradient)." },
    { q: "Which two observations does high/low use, and how are they chosen?", a: "The highest and lowest ACTIVITY levels — never the highest and lowest cost. Questions are frequently built so those are different periods." },
    { q: "How do you handle a stepped fixed cost in high/low?", a: "Adjust the observations to a common fixed base — strip the step out of the high observation — before subtracting, otherwise the step is treated as variable cost." },
    { q: "What is the difference between r and r²?", a: "r measures the strength and direction of the linear relationship, from −1 to +1. r² is the proportion of variation in y explained by x, so r = 0.8 means 64% explained." },
    { q: "Why must cost data spanning several years be adjusted before analysis?", a: "Because inflation is embedded in it. Without restating to a common price basis, price increases are attributed to volume and the variable cost per unit is badly overstated." },
  ],
  furtherStudy: [
    "Cost separation feeds directly into flexible budgets (Chapter 18) and variance analysis (Chapter 22).",
    "Regression and learning curves are developed quantitatively in **PM**.",
  ],
}

/* ── Chapter 8 · B2(i)–(p) ─────────────────────────────────────── */

export const MA_TREE_08: StudyChapter = {
  id: "MA-08",
  number: 8,
  paper: "MA",
  area: "B",
  title: "Time series, index numbers and the product life cycle",
  minutes: 19,
  syllabusRefs: ["B2(i)", "B2(j)", "B2(k)", "B2(l)", "B2(m)", "B2(n)", "B2(o)", "B2(p)"],
  intro:
    "Regression relates cost to activity. Time series does something different: it takes a figure that moves over time, separates the underlying trend from the seasonal pattern, and projects both forward.",
  outcomes: [
    "Explain the four components of a time series",
    "Calculate moving averages, including centring for an even number of periods",
    "Calculate a trend using moving averages and by regression on time",
    "Calculate and apply seasonal variations under the additive and multiplicative models",
    "Produce a forecast combining trend and seasonal variation",
    "Weigh up what time series analysis can and cannot tell you",
    "Explain the purpose of index numbers and calculate simple and weighted indices",
    "Describe the product life cycle and its implications for forecasting",
  ],
  sections: [
    {
      id: "components",
      heading: "The four components of a time series",
      blocks: [
        {
          kind: "definition",
          term: "Time series",
          md: "A set of observations of the same variable recorded at **regular intervals over time** — monthly sales, quarterly output, weekly complaints. Analysis assumes the observed figure is the combination of four components.",
        },
        {
          kind: "table",
          caption: "The four components",
          head: ["Component", "Is", "Length"],
          rows: [
            ["**Trend (T)**", "The underlying long-term movement once short-term noise is removed", "Long term"],
            ["**Seasonal variation (S)**", "A regular, repeating pattern within a fixed period — a quarter, a week, a day", "Short and **regular**"],
            ["**Cyclical variation (C)**", "Longer-term fluctuation associated with the economic cycle", "Several years, and **irregular** in length"],
            ["**Random / residual (R)**", "Irregular, unpredictable variation from one-off events", "None — by definition unpredictable"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Seasonal and cyclical are not the same",
          md: "**Seasonal** variation repeats over a **fixed, known** period, so it can be measured and forecast. **Cyclical** variation follows the economic cycle, lasts several years and has **no fixed length**, which is why MA does not attempt to forecast it. Practical time series work therefore separates the **trend** and the **seasonal** element and treats cyclical and random variation as beyond the model.",
        },
        {
          kind: "formula",
          name: "The two models",
          expr: "Additive:  Y  =  T  +  S  +  C  +  R          Multiplicative:  Y  =  T  ×  S  ×  C  ×  R",
          note: "In the ADDITIVE model the seasonal element is an absolute amount (+$4,000). In the MULTIPLICATIVE (proportional) model it is a ratio or percentage of trend (1.15, or 115%). Which model applies decides how you combine trend and seasonality — read the question.",
        },
      ],
      check: {
        q: "Which component of a time series has no fixed length and is therefore not forecast in MA?",
        options: ["The trend", "Seasonal variation", "Cyclical variation", "Random variation"],
        correct: 2,
        explain:
          "CYCLICAL variation follows the economic cycle, lasts several years and has NO FIXED LENGTH, so it cannot be measured and projected the way seasonality can. Seasonal variation repeats over a fixed known period, which is precisely what makes it forecastable. Random variation is unpredictable by definition, and the trend is what the analysis exists to isolate.",
      },
    },
    {
      id: "moving-averages",
      heading: "Finding the trend with moving averages",
      blocks: [
        {
          kind: "definition",
          term: "Moving average",
          md: "The average of a fixed number of consecutive observations, recalculated as the window moves forward one period at a time. Averaging over exactly one full cycle **cancels out** the seasonal element, leaving the trend.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Choose the window to match the cycle",
          md: "Use a **4-period** moving average for quarterly data, **12-period** for monthly, **7-period** for daily data with a weekly pattern. The window must span exactly one complete cycle, or the seasonality will not cancel and the \"trend\" will still contain it.",
        },
        {
          kind: "example",
          title: "Worked example — a centred 4-quarter moving average",
          scenario:
            "Quarterly sales ($000) were: 20X3 Q1 48, Q2 62, Q3 78, Q4 52; 20X4 Q1 54, Q2 70, Q3 86, Q4 58. Calculate the centred moving-average trend.",
          steps: [
            { label: "Compute 4-quarter totals and averages", detail: "Q1–Q4 20X3: 48+62+78+52 = 240, average 60.0. Q2 20X3–Q1 20X4: 62+78+52+54 = 246, average 61.5. Q3–Q2: 78+52+54+70 = 254, average 63.5. Q4–Q3: 52+54+70+86 = 262, average 65.5. Q1–Q4 20X4: 54+70+86+58 = 268, average 67.0." },
            { label: "See why centring is needed", detail: "With an EVEN number of periods each average falls BETWEEN two quarters — the first sits between Q2 and Q3 of 20X3, not on a quarter. It cannot be compared with an actual quarter's figure until it is aligned." },
            { label: "Centre by averaging each adjacent pair", detail: "(60.0 + 61.5) ÷ 2 = 60.75 → aligned with Q3 20X3. (61.5 + 63.5) ÷ 2 = 62.5 → Q4 20X3. (63.5 + 65.5) ÷ 2 = 64.5 → Q1 20X4. (65.5 + 67.0) ÷ 2 = 66.25 → Q2 20X4." },
            { label: "Read the trend", detail: "Trend values: Q3 20X3 = 60.75, Q4 = 62.5, Q1 20X4 = 64.5, Q2 = 66.25 — rising by roughly 1.8 per quarter." },
          ],
          result:
            "The centred trend rises from 60.75 to 66.25 over three quarters. **Centring is required whenever the number of periods in the window is EVEN** — quarterly (4) and monthly (12) data both need it, while a 7-day or 3-period average does not, because an odd window already sits on a period. Note also that a moving average loses observations at both ends of the series.",
        },
      ],
    },
    {
      id: "seasonal-variation",
      heading: "Seasonal variation and forecasting",
      blocks: [
        {
          kind: "formula",
          name: "Extracting the seasonal element",
          expr: "Additive:  S  =  Y  −  T          Multiplicative:  S  =  Y  ÷  T",
          note: "Compute S for each period, then average the values for each season across the years and adjust so they sum to 0 (additive) or average 1 (multiplicative).",
        },
        {
          kind: "example",
          title: "Worked example — forecasting with additive seasonal variations",
          scenario:
            "A company's sales trend is rising by $2,000 per quarter and stood at $58,000 in Q4 20X4. Average seasonal variations are Q1 −$6,000, Q2 +$1,000, Q3 +$9,000, Q4 −$4,000. Forecast sales for each quarter of 20X5.",
          steps: [
            { label: "Check the seasonal variations sum to zero", detail: "−6,000 + 1,000 + 9,000 − 4,000 = 0. They do, so no adjustment is needed. If they had not summed to zero, the difference would be spread across the quarters." },
            { label: "Project the trend forward", detail: "Q4 20X4 trend = $58,000. Adding $2,000 per quarter: Q1 20X5 = $60,000; Q2 = $62,000; Q3 = $64,000; Q4 = $66,000." },
            { label: "Apply the seasonal variation to each quarter", detail: "Q1: 60,000 − 6,000 = $54,000. Q2: 62,000 + 1,000 = $63,000. Q3: 64,000 + 9,000 = $73,000. Q4: 66,000 − 4,000 = $62,000." },
            { label: "Sense-check", detail: "Q3 is the strongest quarter and Q1 the weakest, matching the seasonal pattern given. Total forecast for 20X5 is $252,000, against a trend total of $252,000 — equal, exactly as it must be when the seasonal variations sum to zero." },
          ],
          result:
            "Q1 $54,000, Q2 $63,000, Q3 $73,000, Q4 $62,000. Two examinable points: **project the trend first, then apply seasonality** — never the reverse; and under the **additive** model the seasonal figures are absolute amounts that must sum to zero. Under a **multiplicative** model you would MULTIPLY the trend by each factor instead, and the factors would average 1.",
        },
        {
          kind: "table",
          caption: "Time series analysis, weighed up",
          head: ["Advantages", "Disadvantages"],
          rows: [
            ["Separates trend from seasonality, so both can be forecast", "Assumes the past pattern **continues** — the central weakness"],
            ["Straightforward to compute and to explain", "Cannot forecast cyclical variation, whose length is unknown"],
            ["Handles seasonal businesses that regression on activity cannot", "Random events are by definition unpredictable"],
            ["Reveals the underlying direction hidden by seasonal noise", "Moving averages lose observations at both ends of the series"],
            ["Provides seasonal factors useful for budgeting by period", "Seasonal patterns can genuinely change, making old factors misleading"],
          ],
        },
      ],
      check: {
        q: "The trend for next quarter is forecast at $80,000 and the seasonal variation for that quarter is +$5,000 under the additive model. What is the forecast?",
        options: ["$75,000", "$80,000", "$85,000", "$400,000"],
        correct: 2,
        explain:
          "Under the ADDITIVE model, forecast = trend + seasonal variation = $80,000 + $5,000 = $85,000. The order matters: project the trend forward first, then apply the seasonal adjustment. $400,000 is the error of MULTIPLYING, which would only be right if the seasonal element were given as a factor under the multiplicative model.",
      },
    },
    {
      id: "index-numbers",
      heading: "Index numbers",
      blocks: [
        {
          kind: "definition",
          term: "Index number",
          md: "A figure expressing the value of something in one period as a **percentage of its value in a chosen base period**, which is set at 100. Its purpose is **comparability**: it strips out the effect of price changes so that real movements can be seen.",
        },
        {
          kind: "formula",
          name: "Simple price index",
          expr: "Index  =  (Price in the current period  ÷  Price in the base period)  ×  100",
          note: "An index of 118 means the price is 18% above the base period. To compare two non-base years, divide their indices — not subtract them.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Comparing two non-base years",
          md: "If the index was 120 in 20X3 and 150 in 20X6, the increase is **150 ÷ 120 = 1.25, so 25%** — not 30%. The 30-point difference is in index points, not percent, because the base for the comparison is 120 rather than 100. This is examined regularly and is easy to get wrong at speed.",
        },
        {
          kind: "formula",
          name: "Weighted (multi-item) index",
          expr: "Weighted index  =  [ Σ (Individual index  ×  Weight) ]  ÷  Σ Weights",
          note: "Weights reflect relative importance — usually quantities consumed or expenditure shares. Without weighting, a 40% rise in a trivial item counts as much as a 2% rise in the main input.",
        },
        {
          kind: "example",
          title: "Worked example — a weighted cost index",
          scenario:
            "A manufacturer's input costs move as follows since the base year: materials index 130 (weight 5), labour index 112 (weight 3), energy index 160 (weight 2). Calculate the weighted index and state what it means.",
          steps: [
            { label: "Multiply each index by its weight", detail: "Materials: 130 × 5 = 650. Labour: 112 × 3 = 336. Energy: 160 × 2 = 320." },
            { label: "Sum the products and the weights", detail: "Σ(index × weight) = 650 + 336 + 320 = 1,306. Σweights = 5 + 3 + 2 = 10." },
            { label: "Divide", detail: "Weighted index = 1,306 ÷ 10 = 130.6." },
            { label: "Compare with the unweighted average", detail: "A simple average of the three indices is (130 + 112 + 160) ÷ 3 = 134. The unweighted figure is 3.4 points higher because it gives energy — the smallest input — the same influence as materials, the largest." },
          ],
          result:
            "The weighted index is **130.6**, so total input costs have risen 30.6% since the base year. The comparison with the unweighted 134 is the examinable point: weighting matters precisely because a large percentage rise in a small input should not move the overall index as much as a modest rise in the dominant one.",
        },
        {
          kind: "list",
          title: "What index numbers are used for in MA",
          items: [
            "**Restating cost data to constant prices** before analysing it — the technique in Chapter 7.",
            "**Updating a standard cost** so variances measure performance rather than inflation (Chapter 22).",
            "**Inflating a forecast** from base-year prices to the prices expected when the cost is incurred.",
            "**Comparing performance across years** in real terms rather than money terms.",
            "**Indexing a contract or a budget** to a published index so it moves automatically with input prices.",
          ],
        },
      ],
    },
    {
      id: "product-life-cycle",
      heading: "The product life cycle",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "timeline",
            title: "The five stages, and what each means for forecasting",
            caption: "The stage a product is in determines which forecasting method can be trusted.",
            data: {
              points: [
                { label: "Development", sub: "No sales, heavy cost. Nothing to extrapolate from at all" },
                { label: "Introduction", sub: "Low sales, high unit cost, heavy promotion. Very little history, so forecasts are least reliable" },
                { label: "Growth", sub: "Sales rise rapidly, unit cost falls, competitors enter. A trend extrapolated linearly will UNDERSTATE growth" },
                { label: "Maturity", sub: "Sales plateau, competition on price, margins tighten. The stage where trend and seasonal analysis works best" },
                { label: "Decline", sub: "Sales fall; the decision is whether to withdraw. A trend from the maturity stage will OVERSTATE sales" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The forecasting implication that carries the marks",
          md: "**Time series analysis assumes the past pattern continues — and that assumption holds only within a life-cycle stage.** Projecting a growth-stage trend into maturity overstates sales; projecting a maturity trend into decline overstates them badly. When a question tells you a product's life-cycle stage, it is telling you how far to trust the extrapolation.",
        },
        {
          kind: "table",
          caption: "Cost and price behaviour across the cycle",
          head: ["Stage", "Sales volume", "Unit cost", "Typical pricing"],
          rows: [
            ["Introduction", "Low", "High — little scale, high promotion per unit", "Skimming (high) or penetration (low), depending on strategy"],
            ["Growth", "Rising fast", "Falling as volume builds", "Competitive; may fall as rivals enter"],
            ["Maturity", "Stable, at a peak", "Lowest — full economies of scale", "Price competition; differentiation by service and brand"],
            ["Decline", "Falling", "Rising again as volume falls and fixed costs are spread thinly", "Discounting to clear, or withdrawal"],
          ],
        },
        {
          kind: "activity",
          title: "Activity 2 — a forecast that should not be trusted",
          prompt:
            "A product's quarterly sales have risen steadily for eight quarters. A junior analyst fits a regression on time, extrapolates four quarters ahead, and forecasts 22% growth. The product was launched three years ago and management believes it is entering maturity, with two competitors having launched substitutes this year.\n\nExplain why the forecast is unreliable and what you would do instead.",
          answer:
            "**Why it is unreliable — three reasons.** (1) **The life-cycle stage is changing.** Eight quarters of steady growth is history from the GROWTH stage; entering maturity means sales plateau, so a growth-stage trend projected forward systematically overstates them. Time series analysis assumes the past pattern continues, and that is exactly what is about to stop being true. (2) **The competitive environment has changed** — two substitutes launched this year. Nothing in the historic data reflects them, because they did not exist while it was being recorded. (3) It is an **extrapolation** four quarters beyond the observed data, and its reliability depends on a relationship that was only ever established inside the observed range.\n\n**What I would do instead.** Use the trend as one input rather than the answer. Specifically: cap the projection at a plateau consistent with maturity rather than continuing the growth gradient; build the expected effect of the two substitutes in explicitly, from market share estimates rather than from history; prepare a **range** of forecasts — optimistic, most likely and pessimistic — since a single point figure conveys false precision; and state the key assumption plainly, because the forecast's whole reliability rests on when the plateau arrives.\n\n**The general lesson:** a statistically well-fitted line says nothing about whether the underlying conditions will hold. Judgement about the stage and the market is not a supplement to the technique — it decides whether the technique applies at all.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Confusing seasonal with cyclical variation.",
      fix: "Seasonal repeats over a fixed known period and is forecast. Cyclical follows the economic cycle, has no fixed length, and is not.",
    },
    {
      trap: "Failing to centre a moving average with an even number of periods.",
      fix: "Quarterly (4) and monthly (12) windows fall between periods and must be centred by averaging adjacent pairs. Odd windows need no centring.",
    },
    {
      trap: "Applying seasonal variation before projecting the trend.",
      fix: "Project the trend forward first, then apply the seasonal adjustment to each period.",
    },
    {
      trap: "Adding a multiplicative seasonal factor, or multiplying an additive one.",
      fix: "Additive variations are absolute amounts and are ADDED; multiplicative factors are ratios and are MULTIPLIED. Read which model the question uses.",
    },
    {
      trap: "Subtracting index numbers to find a percentage change between two non-base years.",
      fix: "Divide them. From 120 to 150 is 150 ÷ 120 = 25%, not 30% — the 30 is index points.",
    },
    {
      trap: "Using an unweighted average of indices for a multi-item index.",
      fix: "Weight by relative importance, or a large rise in a trivial input distorts the overall figure.",
    },
    {
      trap: "Extrapolating a trend across a change of life-cycle stage.",
      fix: "A growth-stage trend overstates maturity sales, and a maturity trend badly overstates decline. The stage tells you how far to trust the projection.",
    },
  ],
  keyTerms: [
    { term: "Time series", def: "Observations of the same variable recorded at regular intervals over time." },
    { term: "Trend", def: "The underlying long-term movement in a time series once short-term variation is removed." },
    { term: "Seasonal variation", def: "A regular repeating pattern within a fixed period, which can therefore be measured and forecast." },
    { term: "Cyclical variation", def: "Longer-term fluctuation following the economic cycle, with no fixed length, and not forecast in MA." },
    { term: "Moving average", def: "The average of a fixed number of consecutive observations, recalculated as the window advances." },
    { term: "Centring", def: "Averaging adjacent moving averages so that a value computed from an even number of periods aligns with an actual period." },
    { term: "Additive model", def: "Y = T + S + C + R, in which the seasonal element is an absolute amount and the variations sum to zero." },
    { term: "Multiplicative model", def: "Y = T × S × C × R, in which the seasonal element is a ratio of trend and the factors average one." },
    { term: "Index number", def: "A value expressed as a percentage of its value in a base period set at 100." },
    { term: "Weighted index", def: "An index combining several items in proportion to their relative importance: Σ(index × weight) ÷ Σweights." },
    { term: "Product life cycle", def: "The stages a product passes through — development, introduction, growth, maturity and decline — each with different cost, price and forecasting characteristics." },
  ],
  summary: [
    "A time series has four components: trend, seasonal, cyclical and random. MA forecasts the first two only.",
    "Seasonal variation repeats over a fixed period; cyclical variation has no fixed length and is not forecast.",
    "Moving averages find the trend, and the window must span exactly one cycle — 4 for quarterly, 12 for monthly.",
    "An even-numbered window produces averages between periods, so they must be centred.",
    "Additive seasonal variations are absolute amounts summing to zero; multiplicative factors are ratios averaging one.",
    "Forecast by projecting the trend first, then applying the seasonal element in the model's own manner.",
    "Index numbers restate figures against a base of 100; compare two non-base years by dividing their indices, not subtracting.",
    "Weighted indices reflect relative importance, so a large rise in a trivial input does not dominate.",
    "The product life cycle determines how far a trend can be extrapolated — a growth trend overstates maturity, a maturity trend overstates decline.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four components of a time series?", a: "Trend (long-term movement), seasonal variation (regular, fixed-period), cyclical variation (economic cycle, no fixed length) and random variation. Only trend and seasonality are forecast." },
    { q: "When must a moving average be centred, and why?", a: "When the window has an even number of periods — 4 for quarterly, 12 for monthly — because each average then falls between two periods and must be aligned with an actual one by averaging adjacent pairs." },
    { q: "How do you forecast using trend and additive seasonal variations?", a: "Project the trend forward to the period required, then ADD that period's seasonal variation. Under the multiplicative model you multiply by the seasonal factor instead." },
    { q: "The index was 120 in 20X3 and 150 in 20X6. By what percentage did prices rise?", a: "25% — 150 ÷ 120 = 1.25. It is not 30%: that is the difference in index points, and the base for the comparison is 120, not 100." },
    { q: "Why does the product life-cycle stage limit a time series forecast?", a: "Because the analysis assumes the past pattern continues, which only holds within a stage. Projecting a growth trend into maturity overstates sales, and a maturity trend into decline overstates them badly." },
  ],
  furtherStudy: [
    "Index numbers are the tool for the price adjustments in Chapter 7 and for keeping standard costs current in Chapter 22.",
    "Life-cycle costing as a costing method is Chapter 15; forecasting and learning effects return in **PM**.",
  ],
}

/* ── Chapter 9 · B4 ────────────────────────────────────────────── */

export const MA_TREE_09: StudyChapter = {
  id: "MA-09",
  number: 9,
  paper: "MA",
  area: "B",
  title: "Spreadsheets",
  minutes: 13,
  syllabusRefs: ["B4(a)", "B4(b)"],
  intro:
    "Every technique in this paper is executed on a spreadsheet in practice. This chapter is what makes them powerful, what makes them dangerous, and which is which.",
  outcomes: [
    "Explain the role and main features of a spreadsheet",
    "Identify the applications of spreadsheets in management accounting",
    "Explain the advantages of spreadsheets over manual methods",
    "Explain the risks and limitations of spreadsheets, and the controls that address them",
  ],
  sections: [
    {
      id: "features",
      heading: "What a spreadsheet is and what it does",
      blocks: [
        {
          kind: "definition",
          term: "Spreadsheet",
          md: "A grid of **rows and columns** whose intersections are **cells**, each holding a value, a label or a **formula**. The defining feature is that formulae reference other cells, so when an input changes every dependent figure **recalculates automatically**.",
        },
        {
          kind: "list",
          title: "The features that matter to a management accountant",
          items: [
            "**Formulae and functions** — arithmetic, SUM, AVERAGE, IF, VLOOKUP, and statistical functions covering the regression and correlation of Chapter 7.",
            "**Automatic recalculation** — the basis of every 'what if' question.",
            "**Absolute and relative references** — a formula copied across a row adjusts its references, unless a reference is fixed, which is the distinction behind a large share of spreadsheet errors.",
            "**Charts** built directly from the data and updating with it (Chapter 4).",
            "**Sorting, filtering and pivot tables** for summarising large datasets.",
            "**Multiple linked worksheets**, so a model can separate inputs, workings and output.",
            "**Goal seek and data tables** for sensitivity analysis — finding the volume at which profit is zero, for instance.",
          ],
        },
        {
          kind: "table",
          caption: "What management accountants use them for",
          head: ["Application", "Example"],
          rows: [
            ["Budget preparation", "Functional and cash budgets that reflow when a sales assumption changes (Chapter 17)"],
            ["Cost analysis", "High/low and regression to separate fixed and variable elements (Chapter 7)"],
            ["Variance analysis", "Flexing a budget and computing variances automatically (Chapters 18 and 22)"],
            ["Investment appraisal", "NPV and IRR with built-in discounting functions (Chapter 20)"],
            ["Break-even analysis", "Contribution, break-even point and margin of safety, with charts"],
            ["Sensitivity and 'what if' analysis", "Testing the effect of a 5% volume fall or a 10% price rise in seconds"],
            ["Performance reporting", "Ratio calculation and period-on-period comparison (Chapters 24–27)"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why 'what if' is the real value",
          md: "The point of a spreadsheet model is not that it computes a number — a calculator does that. It is that changing **one** assumption instantly reworks the whole result, which is what makes sensitivity analysis practical. A budget that takes two days to rebuild will only ever be built once; a budget that reflows in a second can be tested against a dozen scenarios.",
        },
      ],
    },
    {
      id: "advantages-risks",
      heading: "Advantages, and the risks that come with them",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Spreadsheets weighed up",
            caption: "Flexibility is both the advantage and the risk, for the same reason.",
            data: {
              leftTitle: "Advantages",
              rightTitle: "Risks and limitations",
              rows: [
                { aspect: "Speed", left: "Recalculates instantly, making sensitivity analysis practical", right: "Fast enough to produce a wrong answer confidently before anyone checks" },
                { aspect: "Flexibility", left: "Can be built to fit any problem without a developer", right: "No enforced structure, so every model is idiosyncratic and hard for anyone else to follow" },
                { aspect: "Accuracy", left: "Removes arithmetic slips in repeated calculation", right: "A single wrong formula or mis-set range is applied consistently to everything" },
                { aspect: "Control", left: "Can be password-protected and cells locked", right: "Typically **no audit trail**, no version control, and weak access control" },
                { aspect: "Presentation", left: "Charts and formatted reports built straight from the data", right: "Formatting can conceal a hidden row, a hard-coded override or a broken link" },
                { aspect: "Cost", left: "Universally available and cheap", right: "Key models often depend on one person who built and understands them" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "The specific errors that recur in real models",
          items: [
            "**A range that stops short** — a SUM covering 11 of 12 months because a row was inserted outside the range.",
            "**A hard-coded number typed over a formula**, so the cell no longer responds to its inputs.",
            "**A relative reference that should have been absolute**, so copying a formula silently shifts what it points at.",
            "**A broken link** to another workbook that has been moved, renamed or closed.",
            "**Inconsistent formulae along a row**, where one cell in twelve differs and looks identical.",
            "**Unit and rounding confusion** — mixing $ and $000 in one calculation.",
            "**No separation of inputs from workings**, so nobody can see what is an assumption and what is derived.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The control point that matters most",
          md: "A material figure that exists **only** in a spreadsheet, with no audit trail and no independent check, is a control weakness — and an extremely common one in real finance functions. The controls that address it are unglamorous and effective: **separate inputs from workings from outputs**, **lock formula cells**, **document assumptions on the face of the model**, **build in cross-checks that must total to zero**, **use version control**, and have the model **independently reviewed** before anyone relies on it.",
        },
        {
          kind: "activity",
          title: "Activity 3 — reviewing a budget model",
          prompt:
            "You are asked to review a colleague's cash budget spreadsheet before it goes to the board. State four specific checks you would perform and what each is looking for.",
          answer:
            "**1 — Trace the totals against their ranges.** Click each total and confirm the range covers every row it should. A SUM covering 11 of 12 months, because a row was inserted just outside it, is the single commonest spreadsheet error and it is invisible on the face of the output.\n\n**2 — Look for hard-coded numbers where a formula belongs.** Scan for cells that hold a constant in a row of formulae. Someone who could not make a figure agree has often typed the answer in, which means the cell will not respond when an assumption changes — so every 'what if' test from then on is wrong.\n\n**3 — Check consistency along each row.** Compare the formula in the first month with the last. One cell in twelve differing looks identical on screen and produces an error that only shows up in one period.\n\n**4 — Identify and test the assumptions.** Confirm that inputs are separated from workings and documented, then change one — a 5% sales fall — and check the whole model reflows sensibly. If the output barely moves, something is hard-coded; if it moves absurdly, a reference is wrong.\n\n**Also creditable:** verify that opening cash agrees to the last reported balance; confirm cross-checks total to zero; check for inconsistent units ($ against $000); and confirm no broken links to external workbooks. **The framing that earns the mark:** a spreadsheet review looks for the errors spreadsheets *characteristically* make, rather than re-performing the arithmetic — the arithmetic is the one thing the machine does reliably.",
        },
      ],
      check: {
        q: "What is the principal control weakness of using a spreadsheet as the record for a material figure?",
        options: [
          "Spreadsheets cannot perform complex calculations reliably",
          "There is typically no audit trail, no version control and weak access control",
          "Spreadsheets cannot produce charts or reports",
          "Spreadsheet files cannot be backed up",
        ],
        correct: 1,
        explain:
          "The weakness is CONTROL, not capability: spreadsheets typically lack an audit trail, version control and effective access control, so a change cannot be traced and a wrong formula is applied consistently to everything. Their arithmetic is entirely reliable, they produce charts well, and they can be backed up — which is why the answer is about governance of the model rather than its computing power.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Listing spreadsheet advantages without the risks.",
      fix: "Flexibility is both the strength and the weakness. Name the absence of an audit trail, weak version control and the ease of a silent formula error.",
    },
    {
      trap: "Saying spreadsheets are unreliable at calculation.",
      fix: "The arithmetic is reliable. The risk is a wrong FORMULA or range being applied consistently and confidently.",
    },
    {
      trap: "Treating a spreadsheet review as re-performing the arithmetic.",
      fix: "Look for the errors spreadsheets characteristically make: short ranges, hard-coded overrides, inconsistent formulae along a row, broken links and mixed units.",
    },
    {
      trap: "Overlooking the separation of inputs, workings and outputs.",
      fix: "Without it nobody can tell an assumption from a derived figure, which makes the model unreviewable and its sensitivity analysis untrustworthy.",
    },
  ],
  keyTerms: [
    { term: "Spreadsheet", def: "A grid of rows and columns whose cells hold values, labels or formulae, recalculating automatically when inputs change." },
    { term: "Formula", def: "A cell entry that computes a result by reference to other cells, so the result updates when they change." },
    { term: "Absolute reference", def: "A cell reference fixed so it does not shift when the formula is copied elsewhere." },
    { term: "What-if analysis", def: "Changing one or more assumptions in a model to see the effect on the result." },
    { term: "Version control", def: "A discipline ensuring that the current model is identifiable and that superseded versions cannot be used by mistake." },
  ],
  summary: [
    "A spreadsheet is a grid of cells holding values, labels and formulae, recalculating automatically when inputs change.",
    "Automatic recalculation is what makes 'what if' and sensitivity analysis practical, and that is the real value.",
    "Applications span budgeting, cost analysis, variance analysis, investment appraisal, break-even and performance reporting.",
    "Speed, flexibility, accuracy in repeated calculation, presentation and low cost are the advantages.",
    "The risks are the absence of an audit trail, weak version and access control, and formula errors applied consistently.",
    "Characteristic errors are short ranges, hard-coded overrides, wrong relative references, broken links, inconsistent formulae and mixed units.",
    "Controls are separation of inputs from workings, locked formula cells, documented assumptions, built-in cross-checks, version control and independent review.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the defining feature of a spreadsheet?", a: "Cells containing formulae that reference other cells, so that changing an input recalculates every dependent figure automatically — which is what makes sensitivity analysis practical." },
    { q: "Name four management accounting applications of spreadsheets.", a: "Budget preparation, cost separation by high/low or regression, flexing budgets and computing variances, investment appraisal with NPV and IRR, break-even analysis, sensitivity analysis and performance reporting." },
    { q: "What is the principal risk of relying on a spreadsheet for a material figure?", a: "The absence of an audit trail, version control and access control, so a wrong formula or range is applied consistently and a change cannot be traced." },
    { q: "Name four errors spreadsheets characteristically contain.", a: "A total whose range stops short, a hard-coded number typed over a formula, a relative reference that should be absolute, a broken external link, inconsistent formulae along a row, and mixed units such as $ and $000." },
    { q: "What controls reduce spreadsheet risk?", a: "Separating inputs from workings and outputs, locking formula cells, documenting assumptions on the face of the model, building in cross-checks that must total to zero, version control, and independent review before reliance." },
  ],
  furtherStudy: [
    "The CBE for the Applied Skills papers provides a working spreadsheet, so this chapter's skills are directly examined in **PM**, **FM**, **TX** and **FR**.",
    "Spreadsheet controls connect to general and application IT controls, examined in **AA**.",
  ],
}

/* ── Area B chapter list, in reading order ─────────────────────── */

export const MA_TREE_AREA_B: StudyChapter[] = [
  MA_TREE_05,
  MA_TREE_06,
  MA_TREE_07,
  MA_TREE_08,
  MA_TREE_09,
]

