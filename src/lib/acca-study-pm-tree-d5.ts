import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area D, fifth part — chapter 28, variance investigation, interdependence and the
 * limitations of standard costing in a modern environment. Syllabus D4(i)–(k) and D3(f).
 *
 * This is the chapter that turns the previous five into a PERFORMANCE MANAGEMENT topic. It
 * exists because the marks in a Section C variance question are rarely in the arithmetic —
 * they are in deciding which variances are worth investigating, explaining how several
 * variances arise from ONE decision, and saying honestly where standard costing stops
 * working. It is placed last in Area D so every variance it discusses has already been met.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

export const PM_TREE_28: StudyChapter = {
  id: "PM-28",
  number: 28,
  paper: "PM",
  area: "D",
  title: "Variance investigation, interdependence and the limits of standard costing",
  minutes: 19,
  syllabusRefs: ["D3(f)", "D4(i)", "D4(j)", "D4(k)"],
  intro:
    "Computing variances is the easy part. The marks are in deciding which ones deserve investigation, explaining how one decision produced four of them, and knowing where standard costing stops being useful at all.",
  outcomes: [
    "Apply materiality, controllability, trend, cost and reliability to an investigation decision",
    "Explain interdependence between variances and trace several variances to one cause",
    "Discuss the behavioural consequences of variance reporting",
    "Explain the limitations of standard costing in a modern manufacturing and service environment",
    "Write a variance commentary that supports a management decision",
  ],
  sections: [
    {
      id: "investigation",
      heading: "Deciding what to investigate",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Investigation costs money, so it must be justified",
          md: "Investigating a variance takes management time, and management time is the scarcest resource in most organisations. So the question is never \"is this variance adverse?\" but **\"is investigating it likely to be worth more than it costs?\"** A £400 adverse variance on a £2m cost is noise. A £400 adverse variance that has appeared every month for six months is a broken standard or a genuine drift, and it is worth a morning. The size of the number is the least useful of the tests.",
        },
        {
          kind: "table",
          caption: "The five tests to apply to any variance",
          head: ["Test", "The question", "Why it matters"],
          rows: [
            ["**Materiality**", "Is it large in absolute terms **and** as a percentage of the standard cost?", "Both are needed: 15% of a small cost may be immaterial, and 1% of a huge cost may be worth £50,000"],
            ["**Controllability**", "Can anyone in the organisation actually do something about it?", "An uncontrollable variance is information for the planners (chapter 27), not a task for the manager"],
            ["**Trend**", "Is it worsening, stable, or reversing? What did the last six periods show?", "**The most valuable test.** A small worsening variance beats a large one-off, and a variance that reverses monthly usually means a timing or accrual problem"],
            ["**Cost versus benefit**", "Will the investigation cost more than the recoverable saving?", "Investigating a variance whose cause has already passed recovers nothing"],
            ["**Reliability of the standard**", "Is the standard current, and was it set on a reasonable basis?", "If the standard is two years old, the variance measures its age. Fix the standard, not the manager"],
          ],
        },
        {
          kind: "list",
          title: "Formal approaches to the decision",
          items: [
            "**Absolute size rule** — investigate anything over £X. Simple, but it ignores scale, so it over-investigates large cost centres and under-investigates small ones.",
            "**Percentage rule** — investigate anything over X% of the standard cost. Better on scale, but it flags trivial money in small cost pools.",
            "**Both together** — investigate where the variance exceeds a percentage AND an absolute floor. This is what most real systems use, because each rule fixes the other's weakness.",
            "**Statistical control limits** — treat the standard as a mean and investigate anything outside, say, two standard deviations, so genuinely random fluctuation is not chased. Requires a reliable distribution of past results, which many organisations do not have.",
            "**Cumulative and trend analysis** — plot the variance over time rather than judging it a period at a time. The single most useful approach in practice, because it distinguishes random noise from drift.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Favourable variances need investigating too",
          md: "Almost every candidate investigates only adverse variances, and that is half a control system. A favourable variance can mean: the **standard is too loose**, so the whole budget is understated; **quality has been cut**, as with the cheap material blend of chapter 25; **maintenance or training has been skipped**, borrowing performance from next year; or **costs have simply been deferred** into the following period. Each of those is a real problem reported as good news. And in a paper about performance management, a favourable variance obtained by damaging the business is a more interesting finding than an adverse one obtained honestly.",
        },
      ],
      check: {
        q: "Which single test is most valuable in deciding whether to investigate a variance?",
        options: [
          "Absolute size, because large variances matter most",
          "The trend over several periods, because it distinguishes drift from random fluctuation",
          "Whether it is adverse rather than favourable",
          "Whether it exceeds 5% of the standard cost",
        ],
        correct: 1,
        explain:
          "The TREND. A small variance worsening month after month signals a real and growing problem, while a large one-off may be pure noise. Size alone ignores scale and context, and restricting attention to adverse variances misses loose standards and quality being cut.",
      },
    },
    {
      id: "interdependence",
      heading: "Interdependence: one decision, several variances",
      blocks: [
        {
          kind: "text",
          md: "Variances are computed separately but they are not caused separately. In almost every exam scenario a single management decision or single event produces a **cluster** of variances, and the mark is for identifying the cause rather than for describing each figure in turn. Reporting \"material price £3,000 favourable, material usage £3,500 adverse, labour efficiency £2,100 adverse\" as three findings is worth very little. Reporting \"a cheaper grade of material was bought, saving £3,000, but it wasted more and was harder to work, costing £5,600 — so the substitution lost £2,600\" is the answer.",
        },
        {
          kind: "table",
          caption: "Common clusters and the single cause behind each",
          head: ["The cluster", "The one decision or event", "What to say"],
          rows: [
            ["Favourable material **price**, adverse material **usage**, adverse **labour efficiency**", "A cheaper, lower-grade material was purchased", "Net the three. The saving is only real if it exceeds the extra waste and labour time"],
            ["Favourable material **mix**, adverse material **yield**", "A cheaper blend was substituted (chapter 25)", "The yield loss may exceed the mix saving; also check unmeasured quality effects"],
            ["Adverse **labour rate**, favourable **labour efficiency**", "More skilled or more experienced staff were used, or overtime was worked", "Often a sound trade-off — compare the extra rate against the hours saved"],
            ["Favourable **labour efficiency** improving each month", "The **learning effect** (chapter 22) against a standard set on the first units", "Not performance improvement — the standard needs revising to the steady-state rate"],
            ["Adverse **sales price**, favourable **sales volume**", "Discounting to win volume", "Compute whether the extra contribution volume covered the price given away"],
            ["Favourable **fixed overhead volume**, rising inventory", "Producing for stock (chapter 24)", "Reported profit improved while cash was consumed; this is a control failure, not success"],
            ["Adverse **material usage**, adverse **labour efficiency**, adverse **fixed overhead efficiency**", "A machine breakdown or an untrained shift", "One event, three variances. Investigate once"],
          ],
        },
        {
          kind: "example",
          title: "Writing the commentary rather than listing the figures",
          scenario:
            "Dymock Ltd's operating statement for the quarter shows: material price £8,400 favourable, material usage £11,200 adverse, labour rate £2,600 favourable, labour efficiency £9,800 adverse, fixed overhead expenditure £1,900 adverse, and fixed overhead volume £6,000 favourable. Production exceeded sales by 500 units. The board has asked why profit missed budget when three variances are favourable.",
          steps: [
            { label: "Group the variances by likely cause, not by type", detail: "Cluster 1: material price F with material usage A and labour efficiency A — the signature of a cheaper, lower-grade material. Cluster 2: labour rate F with labour efficiency A — cheaper, less experienced staff. Cluster 3: fixed overhead volume F with production exceeding sales — producing for inventory." },
            { label: "Net cluster 1", detail: "£8,400 F price against £11,200 A usage = £2,800 adverse before any labour effect. The purchasing saving was more than consumed by waste, so the substitution destroyed value even before the harder material slowed production down." },
            { label: "Net cluster 2", detail: "£2,600 F rate against £9,800 A efficiency = £7,200 adverse. Cheaper labour cost far more in lost time than it saved in rate. Note that part of the £9,800 may belong to cluster 1 — harder material takes longer — so the two clusters overlap and the answer should say so rather than allocating spuriously." },
            { label: "Explain cluster 3 honestly", detail: "The £6,000 favourable volume variance arises because 500 more units were produced than sold, absorbing £6,000 of overhead into inventory. It has NOT improved cash or performance: it has moved cost into the balance sheet while tying up working capital in unsold stock." },
            { label: "Answer the board's actual question", detail: "The three favourable variances total £17,000 but not one represents a genuine gain: £8,400 was more than lost to waste, £2,600 was more than lost to inefficiency, and £6,000 is an absorption effect from unsold production. The real story is two poor substitutions — material grade and labour grade — costing about £10,000 between them, plus £1,900 of overspend." },
            { label: "Recommend, and say what more you need", detail: "Revert to the specified material grade unless a controlled trial shows otherwise; review the staffing decision; and judge the volume variance on a marginal-costing basis so producing for stock stops being rewarded. To go further, ask for the material specification actually purchased, the grade mix of hours worked, and the last six periods' figures to see whether this is a one-quarter decision or a drift." },
          ],
          result:
            "**The three favourable variances totalling £17,000 all represent value lost, not gained.** Two substitutions cost roughly £10,000 and the remaining £6,000 is unsold production absorbing overhead. Grouping by cause rather than by variance type is what produces this answer — and it is what the marks are for.",
        },
      ],
      check: {
        q: "An operating statement shows favourable material price of £8,400 and adverse material usage of £11,200. What is the finding?",
        options: [
          "Purchasing performed well and production performed badly",
          "One decision to buy cheaper material lost £2,800 net, and the two must be reported together",
          "The variances are unrelated and should be investigated separately",
          "The standard cost is wrong",
        ],
        correct: 1,
        explain:
          "ONE decision, £2,800 lost net. This is the classic interdependent pair — a cheaper grade of material saves on price and wastes more in use. Reporting purchasing as the winner and production as the loser blames the wrong manager and misses the actual finding.",
      },
    },
    {
      id: "limits",
      heading: "Where standard costing stops working",
      blocks: [
        {
          kind: "text",
          md: "Standard costing was designed for a **stable, labour-intensive, high-volume, standardised** manufacturing environment — long production runs of identical units, where labour was the dominant variable cost and next month looked like last month. Very little of the modern economy looks like that, and a PM answer is expected to say so specifically rather than in generalities.",
        },
        {
          kind: "table",
          caption: "The limitations, and what has replaced them",
          head: ["Limitation", "Why it bites", "Better approach"],
          rows: [
            ["**Labour is a small proportion of cost**", "Detailed labour rate and efficiency variances analyse maybe 5% of cost while overheads go unexamined", "ABC (chapter 5) to analyse overhead by driver"],
            ["**Overhead is the dominant cost and is not volume-driven**", "Absorbing it on labour hours produces variances that measure nothing causal", "ABC, and activity-based budgeting"],
            ["**Products are customised**", "There is no repeated standard unit to set a standard for", "Target costing (chapter 6) and job-level costing"],
            ["**Life cycles are short**", "The standard is obsolete before enough periods exist to control against it", "Life-cycle costing (chapter 7)"],
            ["**Continuous improvement is the goal**", "A static standard defines success as \"no worse than last year\", which is the opposite of kaizen", "Kaizen costing, with standards that tighten deliberately each period"],
            ["**Quality and delivery matter as much as cost**", "Cost variances are silent on defects, lead time and customer satisfaction", "Non-financial indicators and the balanced scorecard (chapter 30)"],
            ["**JIT and TQM change the incentives**", "Favourable price variances from bulk buying and favourable volume variances from long runs both create the inventory JIT exists to remove", "Throughput accounting (chapter 8); marginal-costing reporting"],
            ["**Services are the larger part of the economy**", "Output is heterogeneous and often intangible, so a standard cost per unit is hard to define meaningfully", "Standards for repeatable service elements only, plus the building block model (chapter 30)"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The balanced conclusion to write",
          md: "Do not conclude that standard costing is obsolete — that overstates the case and loses marks. Conclude that its **usefulness depends on the environment**: it remains valuable where processes are repetitive and inputs measurable (food and drink production, chemicals, high-volume assembly, and repeatable service elements such as a call centre's handling time), and it remains valuable everywhere as a basis for **inventory valuation** and for **budget preparation**. Its weakness is as the **primary performance measurement system** in a fast-changing, overhead-dominated, customised or service business — and the answer is not to abandon it but to **supplement** it with non-financial measures and to revise standards far more frequently than annually.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The behavioural consequences, in one place",
          md: "Variance reporting changes behaviour, usually in ways nobody intended. **Budgetary slack** — managers inflate cost standards so favourable variances follow automatically. **Short-termism** — cutting maintenance and training produces favourable variances now and failures later (chapter 29). **Dysfunctional decisions** — buying in bulk for a favourable price variance, or producing for stock for a favourable volume variance. **Silo behaviour** — purchasing protects its price variance at production's expense, which is exactly the interdependence problem above. **Blame culture** — if adverse variances lead to reprimand rather than enquiry, managers hide problems instead of reporting them, and the control system becomes an obstacle to control.",
        },
      ],
      check: {
        q: "Which conclusion about standard costing earns the marks?",
        options: [
          "It is obsolete in modern business",
          "Its usefulness depends on the environment: still valuable for repetitive processes, inventory valuation and budgeting, but needs supplementing with non-financial measures and frequent revision",
          "It should be replaced entirely by activity-based costing",
          "It works well in every environment provided standards are accurate",
        ],
        correct: 1,
        explain:
          "It DEPENDS ON THE ENVIRONMENT. Standard costing remains valuable where processes repeat and inputs are measurable, and for inventory valuation and budgeting throughout. Its weakness is as the primary performance measure in a customised, overhead-dominated or fast-changing business — so supplement it rather than abandon it.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Investigating only adverse variances.",
      fix: "A favourable variance can mean a loose standard, cut quality, skipped maintenance or deferred cost.",
    },
    {
      trap: "Describing each variance in turn instead of grouping them by cause.",
      fix: "One decision typically causes several variances. Identify the decision, then net its effects.",
    },
    {
      trap: "Judging a variance on size alone.",
      fix: "Apply materiality, controllability, trend, cost versus benefit, and reliability of the standard — trend is the most valuable.",
    },
    {
      trap: "Concluding that standard costing is obsolete.",
      fix: "Argue that its usefulness is environment-dependent and that it should be supplemented, not abandoned.",
    },
    {
      trap: "Ignoring the behavioural effects in a discussion requirement.",
      fix: "Slack, short-termism, dysfunctional buying and producing for stock, silo behaviour and blame culture are all readily available marks.",
    },
  ],
  keyTerms: [
    { term: "Materiality", def: "Whether a variance is significant in absolute terms and as a percentage of the standard cost." },
    { term: "Controllability", def: "Whether anyone in the organisation can act on the cause of a variance." },
    { term: "Interdependence", def: "The tendency of one decision or event to cause several variances that must be interpreted together." },
    { term: "Statistical control limits", def: "Investigating only variances falling outside a set number of standard deviations from the mean." },
    { term: "Budgetary slack", def: "Deliberately undemanding standards, which generate favourable variances automatically." },
    { term: "Kaizen costing", def: "Standards tightened deliberately each period to embed continuous improvement, in contrast to a static standard." },
  ],
  summary: [
    "Investigate on materiality, controllability, trend, cost versus benefit and reliability of the standard — trend matters most.",
    "Favourable variances need investigating too: they can hide loose standards, cut quality and deferred costs.",
    "One decision usually causes several variances, so group by cause and net the effects before commenting.",
    "Standard costing suits stable, repetitive, labour-intensive production, and fits customised, short-life, overhead-dominated and service businesses poorly.",
    "The balanced conclusion is to supplement standard costing with non-financial measures and revise standards frequently, not to abandon it.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five tests for whether to investigate a variance.", a: "Materiality, controllability, trend, cost versus benefit, and reliability of the standard." },
    { q: "Why investigate favourable variances?", a: "They can indicate a standard that is too loose, quality that has been cut, maintenance or training skipped, or costs deferred to the next period." },
    { q: "What cluster of variances signals that a cheaper grade of material was bought?", a: "Favourable material price with adverse material usage and often adverse labour efficiency — one decision, which must be netted." },
    { q: "Why does a favourable fixed overhead volume variance sit badly with just-in-time?", a: "Because it rewards production regardless of sales, creating exactly the inventory that JIT exists to eliminate." },
    { q: "What is the balanced conclusion on standard costing's relevance?", a: "Its usefulness is environment-dependent: still valuable for repetitive processes, inventory valuation and budgeting, but it must be supplemented with non-financial measures where products are customised, life cycles short or overheads dominant." },
  ],
}

export const PM_TREE_AREA_D_PART5: StudyChapter[] = [PM_TREE_28]
