import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area B, part one — budgetary planning and control (B1) and performance
 * and reward (B2).
 *
 *   APM-15  Budgeting methods                       (B1a, B1b)
 *   APM-16  Planning and operational variances       (B1c)
 *   APM-17  Beyond budgeting                         (B1d)
 *   APM-18  HRM, building blocks and management style (B2a, c, d)
 *   APM-19  Accountability, reward and what gets measured (B2b, e, f)
 *
 * Area B is the largest area in the paper — four subsections and twenty-four
 * learning outcomes — and, with Area A, it supplies the 50-mark Section A case
 * study every sitting. It was previously a composite assembled by `take()`
 * from four legacy chapters (see acca-study-apm-official.ts).
 *
 * Written against the official ACCA APM syllabus and study guide for September
 * 2026 to June 2027. See acca-study-apm-tree-a.ts for the note on the shim and
 * on why the originality corpus is the syllabus text alone.
 */

const APM_TREE_15: StudyChapter = {
  paper: "APM",
  id: "APM-15",
  number: 15,
  area: "B",
  syllabusRefs: ["B1(a)", "B1(b)"],
  title: "Budgeting methods",
  minutes: 18,
  intro:
    "Five methods, each solving a different problem and each creating one. The examinable skill is recommending one for a named organisation — never describing all five.",
  outcomes: [
    "Evaluate the strengths and weaknesses of the main budgeting methods",
    "Calculate fixed, flexible, rolling, activity-based, zero-based and incremental budgets",
    "Interpret the results for management rather than merely presenting them",
    "Recommend a method suited to an organisation's cost structure and volatility",
    "Explain the behavioural consequences each method creates",
  ],
  sections: [
    {
      id: "the-methods",
      heading: "The methods, and what each is for",
      blocks: [
        {
          kind: "table",
          caption: "Six approaches compared",
          head: ["Method", "How it works", "Suits", "Weakness"],
          rows: [
            ["Incremental", "Last year's figures adjusted for inflation and known changes", "Stable operations with predictable costs", "Perpetuates existing inefficiency; nobody ever justifies the base"],
            ["Zero-based", "Every activity justified from nothing each cycle", "Discretionary spend — support functions, marketing, research", "Extremely time-consuming; can become a ritual if repeated annually"],
            ["Fixed", "Set for one activity level and not adjusted", "Planning and authorising resources", "Useless for control if volume differs from plan"],
            ["Flexible", "Recalculated at the actual activity level", "Control and variance analysis", "Needs a reliable split of fixed and variable cost"],
            ["Rolling", "Continuously extended — a new period added as one closes", "Volatile or fast-moving environments", "Costly to maintain; can encourage short horizons"],
            ["Activity-based", "Built from activities and their cost drivers", "Complex operations with large overheads", "Requires driver data the organisation may not collect"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The flexible budget is a control instrument, not a plan",
          md: "Comparing actual costs at an actual volume of 11,000 units against a fixed budget set for 10,000 tells you almost nothing — most of the variance is simply the extra volume. **Flex first**, then compare. Any variance analysis in this paper that has not been flexed is measuring the wrong thing, and saying so is often the first mark available.",
        },
        {
          kind: "example",
          title: "Flexing before judging",
          scenario:
            "A fixed budget for 10,000 units allowed $180,000 of variable cost and $90,000 of fixed cost. Actual output was 11,500 units, with variable cost of $200,000 and fixed cost of $93,000.",
          steps: [
            { label: "Against the fixed budget", detail: "Variable: 200,000 against 180,000 — an adverse $20,000, which looks like poor cost control." },
            { label: "Flex it", detail: "Variable cost allowed at 11,500 units = 180,000 × 11,500 ÷ 10,000 = $207,000." },
            { label: "Compare properly", detail: "200,000 against 207,000 = a FAVOURABLE $7,000. The apparent overspend was volume." },
            { label: "Fixed cost", detail: "93,000 against 90,000 = adverse $3,000, and this one is genuine — fixed cost should not move with volume." },
          ],
          result:
            "The unflexed comparison reversed the sign on the variable cost variance entirely. That reversal is the point of the technique, and the reason it is examined so often.",
        },
      ],
      check: {
        q: "A department's costs exceeded its fixed budget by $40,000, but output was 25% above plan. What should be reported?",
        options: [
          "An adverse variance of $40,000 against budget",
          "The budget should first be flexed to the actual activity level — most of the excess is likely to be the extra volume, and only the difference against the flexed allowance is a genuine cost variance",
          "Nothing, since exceeding output justifies exceeding cost",
          "The budget should be revised upward retrospectively to eliminate the variance",
        ],
        correct: 1,
        explain:
          "A fixed budget answers the planning question, not the control question. Until it is flexed, volume and efficiency effects are mixed together, and reporting the combined figure as a cost overrun blames a manager for producing more. Option 3 goes to the opposite extreme and hides genuine variances.",
      },
    },
    {
      id: "choosing",
      heading: "Recommending a method",
      blocks: [
        {
          kind: "text",
          md: "The requirement is almost always to **recommend** for a specific organisation, so reason from its characteristics rather than from the merits of the methods in the abstract.",
        },
        {
          kind: "table",
          caption: "What in the scenario points where",
          head: ["Scenario characteristic", "Points toward"],
          rows: [
            ["Stable, mature, predictable operations", "Incremental — cheap and adequate"],
            ["Large discretionary support costs that have never been challenged", "Zero-based, applied selectively"],
            ["Volatile demand, rapid change, unreliable forecasts", "Rolling budgets"],
            ["High overheads driven by complexity rather than volume", "Activity-based"],
            ["Need to control operations against actual output", "Flexible budgeting for control, alongside a fixed budget for authorisation"],
            ["Severe budget slack and gaming", "The method is not the problem — see the culture and reward chapters"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Zero-based budgeting is best used selectively",
          md: "Applying it to every cost every year is so expensive in management time that it degenerates into a form-filling exercise producing last year's numbers. Recommend it for **discretionary** costs — support functions, marketing, training, research — and on a **rotating** basis, so each area is examined properly every few years rather than all of them superficially every year.",
        },
        {
          kind: "text",
          md: "Finally, interpret rather than present. The syllabus says to **interpret the results for management**, which means saying what a variance implies and what should be done — not reproducing the budget statement with a column of differences. A number without an interpretation is not management information, which is Area C's whole subject.",
        },
      ],
      check: {
        q: "A company with stable operations but a large, unexamined head office cost base asks for a budgeting recommendation. What is the best answer?",
        options: [
          "Zero-based budgeting for the entire organisation",
          "Retain incremental budgeting for the stable operational costs, where it is cheap and adequate, and apply zero-based budgeting selectively and on a rotating basis to the discretionary head office costs that have never been justified",
          "Rolling budgets throughout, to improve accuracy",
          "Activity-based budgeting for all costs",
        ],
        correct: 1,
        explain:
          "Matching the method to the cost type is what the recommendation requires. Zero-basing stable operational costs wastes enormous effort to confirm what is already known, while incremental budgeting of unexamined discretionary costs perpetuates them indefinitely — so the two methods belong in different parts of the same organisation.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing all the budgeting methods.", fix: "Recommend one — or a combination — from the scenario's cost structure and volatility." },
    { trap: "Comparing actual costs with an unflexed budget.", fix: "Flex to actual activity first, or volume and efficiency effects are confounded." },
    { trap: "Recommending zero-based budgeting across the whole organisation.", fix: "Apply it selectively to discretionary costs, on a rotating basis." },
    { trap: "Presenting variances without interpreting them.", fix: "Say what each implies and what should be done about it." },
  ],
  keyTerms: [
    { term: "Incremental budgeting", def: "Basing the budget on the previous period adjusted for known changes, which is cheap but never questions the existing base." },
    { term: "Zero-based budgeting", def: "Requiring every activity to be justified from nothing each cycle, effective for discretionary costs but expensive in management time." },
    { term: "Flexible budget", def: "A budget recalculated at the actual level of activity, so that cost performance can be assessed independently of volume." },
    { term: "Rolling budget", def: "A budget continuously extended by adding a new period as each one closes, keeping the horizon constant in volatile conditions." },
  ],
  summary: [
    "Six methods, each suited to a different cost structure and level of volatility.",
    "Flex the budget before comparing, or the variance measures volume rather than control.",
    "Zero-based budgeting works selectively on discretionary costs, not universally.",
    "Interpret the results — a variance without a recommendation is not management information.",
  ],
  knowledgeDiagnostic: [
    { q: "Why must a budget be flexed before variance analysis?", a: "An unflexed comparison mixes the effect of volume with the effect of cost control, and can reverse the sign of the variance entirely." },
    { q: "Where is zero-based budgeting most effective?", a: "On discretionary costs — support functions, marketing, training — applied on a rotating basis rather than to everything every year." },
    { q: "What does an organisation with volatile demand need?", a: "Rolling budgets, which keep a constant planning horizon as conditions change rather than working to an increasingly stale annual plan." },
  ],
  furtherStudy: [
    "APM-16 covers the variance analysis that flexible budgeting makes possible.",
    "APM-17 covers beyond budgeting, the argument for dispensing with the annual budget entirely.",
    "APM-07 covers the culture that decides whether budgets are honest.",
  ],
}

const APM_TREE_16: StudyChapter = {
  paper: "APM",
  id: "APM-16",
  number: 16,
  area: "B",
  syllabusRefs: ["B1(c)"],
  title: "Planning and operational variances",
  minutes: 19,
  intro:
    "The technique that separates what the world did from what the manager did. It is the fairest idea in management accounting and the easiest to abuse.",
  outcomes: [
    "Calculate key variances and split them into planning and operational elements",
    "Explain what each element tells management",
    "Interpret variances in terms of cause and responsibility rather than sign",
    "Recognise the interdependence between variances",
    "Assess the risk that revising standards is used to conceal poor performance",
  ],
  sections: [
    {
      id: "the-split",
      heading: "Splitting the variance",
      blocks: [
        {
          kind: "text",
          md: "A total variance compares actual performance against the **original** standard. When events have made that standard obsolete — a market price moved, a supplier failed, a regulation changed — the comparison confuses two quite different pieces of information. The split separates them.",
        },
        {
          kind: "table",
          caption: "Two variances, two audiences",
          head: ["", "Planning variance", "Operational variance"],
          rows: [
            ["Compares", "Original standard against a revised, realistic standard", "Revised standard against actual performance"],
            ["Measures", "The effect of the environment changing", "The manager's performance in the conditions that actually applied"],
            ["Responsibility", "Whoever set the standard — usually nobody's fault", "The operating manager"],
            ["Tells management", "How good our planning and forecasting was", "How well we executed"],
            ["Used for", "Improving the planning process", "Appraisal and intervention"],
          ],
        },
        {
          kind: "example",
          title: "A material price variance, split",
          scenario:
            "The standard price was $4.00 per kilogram. A global shortage moved the realistic market price to $5.20. The company actually paid $5.00 for the 9,000 kg it used.",
          steps: [
            { label: "Total price variance", detail: "(4.00 − 5.00) × 9,000 = $9,000 adverse — which on its own looks like poor buying." },
            { label: "Planning element", detail: "(4.00 − 5.20) × 9,000 = $10,800 adverse. The standard was unachievable once the market moved." },
            { label: "Operational element", detail: "(5.20 − 5.00) × 9,000 = $1,800 FAVOURABLE. Against the realistic price, the buyer beat the market." },
            { label: "Check", detail: "−10,800 + 1,800 = −9,000, reconciling to the total." },
          ],
          result:
            "The unsplit figure said the buyer overspent by $9,000. The split says the buyer did well and the planning assumption was wrong by $10,800 — opposite conclusions about the same person, from the same data.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Always reconcile the two back to the total",
          md: "The planning and operational elements must sum to the total variance. Doing that check in your answer proves the arithmetic and takes one line — and where the two elements point in opposite directions, as above, the reconciliation is what makes the point unmissable to the marker.",
        },
      ],
      check: {
        q: "A total labour rate variance is $12,000 adverse. Splitting it gives a planning variance of $15,000 adverse and an operational variance of $3,000 favourable. What should be reported to the board?",
        options: [
          "That the production manager overspent by $12,000 on labour",
          "That the original wage standard was $15,000 unachievable once market rates moved, and that against realistic rates the manager saved $3,000 — so the planning assumption failed and the operational performance was good",
          "That the variance analysis contains an error, since the elements have opposite signs",
          "That labour standards should be abandoned",
        ],
        correct: 1,
        explain:
          "Opposite signs are normal and informative — they are the whole reason for splitting. The board learns two separate things: its forecasting was materially wrong, which is a planning process issue, and its manager performed well in the conditions that actually applied, which is an appraisal issue.",
      },
    },
    {
      id: "interpretation",
      heading: "Interpreting variances properly",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "A favourable variance is not necessarily good news",
          md: "A favourable material price variance may mean a cheaper, poorer-quality input was bought — which shows up later as adverse usage, higher rejects, warranty claims and lost customers. A favourable labour rate variance may mean less skilled staff were used, producing adverse efficiency. **Investigate favourable variances with the same suspicion as adverse ones**; the examiner sets this deliberately and most candidates comment only on the adverse column.",
        },
        {
          kind: "table",
          caption: "Interdependence — the linked pairs to look for",
          head: ["Favourable variance", "Likely adverse consequence", "Where it appears"],
          rows: [
            ["Material price", "Poorer quality material", "Usage variance, reject rates, customer complaints"],
            ["Labour rate", "Less experienced staff", "Efficiency variance, defect rates, rework"],
            ["Labour efficiency", "Work rushed, corners cut", "Quality costs, warranty claims, returns"],
            ["Fixed overhead expenditure", "Maintenance or training deferred", "Later breakdowns and capability loss"],
            ["Sales price", "Discounting", "Volume up, margin down, price expectations reset"],
          ],
        },
        {
          kind: "text",
          md: "The other discipline is **materiality and controllability**. Not every variance deserves investigation: set a threshold, investigate by exception, and ask before investigating whether anyone could have influenced the item. Reporting every variance equally is a form of information overload, and it guarantees the important ones are missed.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The abuse to name",
          md: "Because the operational variance is judged against a **revised** standard, a manager who can influence that revision can make their own performance look good. If the person being appraised sets or approves the revised standard, the split has become a mechanism for concealing poor performance. Recommend that revisions be independently determined, evidenced by external data, and approved outside the operating chain — and say plainly that this is what stops the technique being gamed.",
        },
      ],
      check: {
        q: "A production manager reports a large favourable material price variance and an adverse usage variance in the same period. What is the most likely explanation?",
        options: [
          "Two unrelated events happened to coincide",
          "Cheaper, lower-quality material was purchased: it saved on price but produced more waste, rejects and rework — so the two variances are one decision seen twice, and the net effect may well be adverse",
          "The usage variance has been calculated incorrectly",
          "The favourable price variance should be reported alone, as good news",
        ],
        correct: 1,
        explain:
          "Interdependence is the standard reading here, and the correct response is to net the two and look downstream for quality consequences that have not yet appeared in the numbers. Reporting the favourable variance in isolation — option 3 — is exactly the selective presentation Area C examines.",
      },
    },
  ],
  examTraps: [
    { trap: "Reporting a total variance where the standard has been overtaken by events.", fix: "Split it, and reconcile the two elements back to the total." },
    { trap: "Commenting only on adverse variances.", fix: "Investigate favourable ones with equal suspicion — they often cause the adverse ones." },
    { trap: "Treating variances as independent.", fix: "Look for the linked pair; price and usage, rate and efficiency are usually one decision." },
    { trap: "Letting the appraised manager set the revised standard.", fix: "Independent, evidenced revision — otherwise the split conceals rather than reveals." },
  ],
  keyTerms: [
    { term: "Planning variance", def: "The difference between the original standard and a revised realistic standard, measuring the effect of the environment rather than of management." },
    { term: "Operational variance", def: "The difference between the revised standard and actual performance, measuring what the manager achieved in the conditions that applied." },
    { term: "Interdependence", def: "The relationship whereby one decision produces variances of opposite sign in different lines, such as cheaper materials causing higher usage." },
    { term: "Exception reporting", def: "Investigating only variances exceeding a materiality threshold, so attention goes to what matters." },
  ],
  summary: [
    "Split the variance when events have made the original standard unachievable.",
    "Planning tells you about forecasting; operational tells you about execution — and they can point opposite ways.",
    "Favourable variances deserve the same suspicion as adverse ones; look for the linked pair.",
    "Revised standards must be set independently, or the technique becomes a way of hiding poor performance.",
  ],
  knowledgeDiagnostic: [
    { q: "What does a planning variance actually measure?", a: "The effect of the original standard having been made unachievable by events — a comment on forecasting rather than on the operating manager." },
    { q: "Why investigate a favourable variance?", a: "It often reflects a decision that causes an adverse variance elsewhere, such as cheaper material raising usage, rejects and warranty claims." },
    { q: "How is the planning/operational split abused?", a: "If the manager being appraised influences the revised standard, they can set the benchmark their own performance is judged against." },
  ],
  furtherStudy: [
    "APM-15 covers the flexible budgeting these variances are calculated from.",
    "APM-06 covers risk and uncontrollable factors, which is why the split exists.",
    "APM-19 covers the reward consequences that make manipulating a standard worthwhile.",
  ],
}

const APM_TREE_17: StudyChapter = {
  paper: "APM",
  id: "APM-17",
  number: 17,
  area: "B",
  syllabusRefs: ["B1(d)"],
  title: "Beyond budgeting and non-traditional control",
  minutes: 15,
  intro:
    "The argument that the annual budget does more harm than good — and what an organisation controls itself with once it stops using one.",
  outcomes: [
    "Explain the criticisms of traditional annual budgeting",
    "Describe the beyond budgeting approach and its main principles",
    "Evaluate the increased use of non-profit-based measures in controlling organisations",
    "Assess whether an organisation is a suitable candidate for abandoning budgets",
    "Recognise that budgeting problems are often cultural rather than technical",
  ],
  sections: [
    {
      id: "criticisms",
      heading: "What is wrong with the annual budget",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "The standard criticisms",
          items: [
            "**It is out of date almost immediately** — built on assumptions from months before the year began",
            "**It encourages gaming**: slack in the forecast, and spending the remaining budget in month twelve so next year's is not cut",
            "**It is a fixed performance contract** in a variable world, so managers defend the number rather than respond to conditions",
            "**It is enormously time-consuming**, often absorbing months of senior management attention for a document that is stale on issue",
            "**It anchors on last year**, so inefficiency is carried forward indefinitely",
            "**It focuses on cost rather than value**, and on internal negotiation rather than on customers and competitors",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The use-it-or-lose-it effect",
          md: "A department that underspends is rewarded with a smaller allocation next year, so it spends the remainder on something — anything — in the final quarter. This is entirely rational behaviour produced by the system, and it is the clearest single illustration of the paper's central theme that measures create behaviour. Naming it in a scenario with a year-end spending surge is a straightforward mark.",
        },
      ],
      check: {
        q: "A department consistently spends its remaining budget in the final month on low-priority items. What is the cause?",
        options: [
          "Poor departmental management that should be replaced",
          "The allocation system punishes underspending by cutting next year's budget, so spending the remainder protects future capacity — the behaviour is a rational response to the rule",
          "Insufficient budgetary control during the year",
          "The budget was set too low",
        ],
        correct: 1,
        explain:
          "The manager who hands back savings is worse off next year, so the system rewards spending. Tightening in-year control does not touch the incentive; the fix is to change how future allocations respond to underspending — for example by letting departments retain a share of genuine savings.",
      },
    },
    {
      id: "beyond-budgeting",
      heading: "Beyond budgeting, and what replaces the budget",
      blocks: [
        {
          kind: "text",
          md: "Beyond budgeting argues that the annual fixed target should be replaced by **relative** and **adaptive** performance management. Rather than committing a manager to a number set fourteen months earlier, it judges performance against what was achievable in the conditions that actually occurred.",
        },
        {
          kind: "table",
          caption: "The shift",
          head: ["Traditional budgeting", "Beyond budgeting"],
          rows: [
            ["Fixed annual target agreed in advance", "Relative targets — against peers, market or prior period"],
            ["Reward for hitting the number", "Reward for performance relative to what was achievable"],
            ["Resources allocated annually in advance", "Resources made available as needed, on the merits"],
            ["Central plan cascaded down", "Decisions devolved to those close to the customer"],
            ["Annual planning event", "Continuous, rolling forecasting"],
            ["Control through variance from plan", "Control through fast, transparent information and peer comparison"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Relative targets remove the gaming incentive",
          md: "There is no advantage in negotiating a soft target if performance is judged against peers or the market — you cannot negotiate what the market did. That is the mechanism, and it is what makes beyond budgeting more than an exhortation to be flexible. It also removes the planning-variance problem from APM-16 automatically, because the comparator moves with conditions.",
        },
        {
          kind: "text",
          md: "The **objections** are real and should be given equal weight. Abandoning budgets removes a familiar and legally useful control, and many organisations need a budget for statutory, funding or regulatory reasons — a public body or a charity usually cannot dispense with one. Devolved authority requires trust and capable local managers. Relative targets need credible comparators, which do not exist in every sector. And the transition is a significant cultural change, which an organisation with the blame culture of APM-07 will not survive.",
        },
        {
          kind: "activity",
          title: "Assess the candidate",
          prompt:
            "A fast-growing technology company complains that its annual budget is obsolete by the second quarter, that managers negotiate hard for soft targets, and that the process consumes three months. Is it a candidate for beyond budgeting?",
          answer:
            "On the symptoms, yes - all three complaints are the classic case for it. A budget obsolete by the second quarter means the fixed annual target is a poor comparator for a business changing this fast; hard negotiation for soft targets is exactly the gaming that relative measurement removes; and three months of senior attention for a document that is stale by April is a straightforwardly bad trade. Rolling forecasts and targets set relative to market growth or peer performance would address all three at once. But I would test three things before recommending it. First, whether credible comparators exist - relative targets need something external to measure against, and in a novel market there may be no peer whose performance means anything. Second, whether the culture can carry devolved authority: beyond budgeting moves decisions to people close to the customer, and if this company punishes managers for missing numbers then removing the number simply removes the visibility without removing the fear. Third, what the budget is used for beyond control - if investors, lenders or a parent require one, it cannot simply be abandoned, and the realistic recommendation becomes rolling forecasts and relative internal targets while retaining an annual budget for external purposes. That hybrid is usually the honest answer, and it captures most of the benefit without a change the organisation may not be ready for.",
        },
      ],
      check: {
        q: "Why do relative performance targets reduce the incentive to negotiate soft targets?",
        options: [
          "Because managers are not told what the targets are",
          "Because performance is judged against peers, the market or prior periods rather than a negotiated number — and a manager cannot negotiate what the market or their peers achieve",
          "Because relative targets are always harder to achieve",
          "Because relative targets remove the link to reward",
        ],
        correct: 1,
        explain:
          "The gaming incentive exists because the target is negotiable; making the comparator external removes the thing being negotiated. It also means performance is assessed in the conditions that actually occurred, which is why beyond budgeting dispenses with the planning-variance adjustment that fixed targets require.",
      },
    },
  ],
  examTraps: [
    { trap: "Presenting beyond budgeting as obviously superior.", fix: "Give the objections equal weight — comparators, culture, and external requirements for a budget." },
    { trap: "Blaming year-end spending surges on poor management.", fix: "The allocation rule rewards spending; change the rule." },
    { trap: "Recommending abandonment where a budget is legally or contractually required.", fix: "Recommend the hybrid — rolling forecasts and relative internal targets, budget retained externally." },
    { trap: "Treating budgeting problems as technical.", fix: "Slack and gaming are cultural; a new method inside the same culture produces the same behaviour." },
  ],
  keyTerms: [
    { term: "Beyond budgeting", def: "An approach replacing fixed annual targets with relative, adaptive performance management and devolved decision making." },
    { term: "Relative target", def: "A target expressed against peers, the market or a prior period rather than a negotiated absolute number." },
    { term: "Fixed performance contract", def: "The commitment to a target agreed in advance, which managers then defend regardless of how conditions have changed." },
  ],
  summary: [
    "The annual budget is criticised as stale, gamed, time-consuming and anchored on last year.",
    "Beyond budgeting replaces fixed targets with relative ones and devolves decisions.",
    "Relative targets work because the comparator cannot be negotiated.",
    "The objections are real: comparators, culture, and external requirements for a budget.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a department spend its budget remainder in the final month?", a: "Because underspending is punished with a smaller allocation next year, so spending protects future capacity — rational behaviour created by the rule." },
    { q: "What is the mechanism by which beyond budgeting removes gaming?", a: "Performance is judged against an external comparator that the manager cannot negotiate." },
    { q: "What is usually the realistic recommendation?", a: "A hybrid — rolling forecasts and relative internal targets, with an annual budget retained where investors, lenders or regulators require one." },
  ],
  furtherStudy: [
    "APM-15 covers the budgeting methods this chapter argues against.",
    "APM-07 covers the culture that determines whether any budgeting reform will work.",
    "APM-19 covers reward, which is where the gaming incentive originates.",
  ],
}

const APM_TREE_18: StudyChapter = {
  paper: "APM",
  id: "APM-18",
  number: 18,
  area: "B",
  syllabusRefs: ["B2(a)", "B2(c)", "B2(d)"],
  title: "Human resources, building blocks and management style",
  minutes: 17,
  intro:
    "Performance is delivered by people, so a measurement system is also a management style. Hopwood's work shows that the same numbers, used differently, produce entirely different organisations.",
  outcomes: [
    "Advise on the link between corporate strategy and the management of human resources",
    "Apply Fitzgerald and Moon's building block model",
    "Explain Hopwood's management styles and their consequences",
    "Advise on remuneration methods appropriate to a performance system",
    "Recommend a style and structure suited to the controllability of the results",
  ],
  sections: [
    {
      id: "building-blocks",
      heading: "Fitzgerald and Moon's building blocks",
      blocks: [
        {
          kind: "text",
          md: "The building block model was developed for **service businesses**, and it addresses a question the syllabus asks in two places: what makes a performance measurement system acceptable to the people being measured. Its three blocks are dimensions, standards and rewards.",
        },
        {
          kind: "table",
          caption: "The three blocks",
          head: ["Block", "Contents", "The question it answers"],
          rows: [
            ["Dimensions", "Competitiveness, financial performance, quality, flexibility, resource utilisation, innovation", "What should be measured?"],
            ["Standards", "Ownership, achievability, equity", "Are the targets accepted as fair?"],
            ["Rewards", "Clarity, motivation, controllability", "Does the reward system make people act on them?"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The six dimensions split into two kinds",
          md: "**Competitiveness and financial performance are results** — the outcomes of what was done. **Quality, flexibility, resource utilisation and innovation are determinants** — the things that produce those results. That distinction is the model's real contribution: it is the same leading-versus-lagging idea as the balanced scorecard, and it tells you that managing the four determinants is how the two results are eventually improved.",
        },
        {
          kind: "text",
          md: "The **standards** block is where most systems fail. A target that managers had no part in setting is not owned; one they believe is impossible produces resignation rather than effort; and one that is much harder for one division than another is inequitable and will be resented. All three failures produce the same outcome — the target stops driving behaviour — and each has a different remedy, so diagnosing which applies is the examinable step.",
        },
      ],
      check: {
        q: "In Fitzgerald and Moon's model, which dimensions are determinants rather than results?",
        options: [
          "Competitiveness and financial performance",
          "Quality, flexibility, resource utilisation and innovation — these produce the results, which are competitiveness and financial performance",
          "All six are results",
          "Only financial performance is a determinant",
        ],
        correct: 1,
        explain:
          "The split is the model's key insight and mirrors the leading/lagging distinction: an organisation improves competitiveness and financial performance by managing quality, flexibility, utilisation and innovation, because those are the things that can actually be acted on today.",
      },
    },
    {
      id: "hopwood",
      heading: "Hopwood's management styles",
      blocks: [
        {
          kind: "text",
          md: "Hopwood examined how managers **use** accounting information in evaluating subordinates, and found that the same reports produce very different behaviour depending on the style adopted.",
        },
        {
          kind: "table",
          caption: "The three styles",
          head: ["Style", "How the manager is judged", "Consequences"],
          rows: [
            ["Budget constrained", "Almost entirely on meeting the short-term budget", "High tension, manipulation of data, poor relations with peers, short-termism"],
            ["Profit conscious", "On long-term effectiveness, with the budget as one input among several", "Lower tension, better relations, more constructive use of the information"],
            ["Non-accounting", "Accounting data plays little part in the evaluation", "Low tension, but weak cost control and little financial discipline"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The finding that matters",
          md: "The **budget constrained** style produced the worst outcomes even though it appeared the most rigorous: managers met the number by manipulating data and by shifting problems to other departments and later periods. The **profit conscious** style produced better long-term results with less tension. So a scenario describing an organisation where missing the budget is unthinkable is describing the style Hopwood identified as damaging, whatever its reputation for discipline.",
        },
        {
          kind: "text",
          md: "The choice of style should follow **controllability**. Where results are largely within the manager's control and conditions are stable, a tighter, budget-focused style is defensible. Where much of the outcome depends on factors outside their control — volatile markets, long lead times, interdependence with other units — the profit conscious style is more appropriate, because holding someone rigidly to a number they cannot determine produces manipulation rather than performance.",
        },
      ],
      check: {
        q: "Hopwood found that the budget-constrained style, despite appearing the most rigorous, produced the worst outcomes. Why?",
        options: [
          "Because managers ignored the budget entirely",
          "Because managers met the budget by manipulating data and shifting costs and problems to other departments and later periods, damaging both information quality and cooperation",
          "Because budgets were set too low under that style",
          "Because it required more accounting staff",
        ],
        correct: 1,
        explain:
          "Rigid short-term evaluation makes hitting the number the objective in itself, and the cheapest routes to that are usually manipulation and displacement rather than genuine improvement. The organisation gets its numbers and loses the information and the cooperation that would have let it actually improve.",
      },
    },
    {
      id: "remuneration",
      heading: "Remuneration and the HRM link",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks for advice on the relationship of human resource management to performance measurement, and on **suitable remuneration methods**. The connecting principle is that a performance system only works if the people it measures are recruited, developed, appraised and paid consistently with it.",
        },
        {
          kind: "table",
          caption: "Remuneration methods and what each produces",
          head: ["Method", "Encourages", "Risk"],
          rows: [
            ["Fixed salary only", "Stability, cooperation, willingness to raise problems", "Little differentiation between strong and weak performance"],
            ["Individual performance bonus", "Individual effort on the measured items", "Undermines teamwork; whatever is unmeasured is neglected"],
            ["Team or divisional bonus", "Cooperation within the unit", "Free-riding; and inter-divisional competition instead"],
            ["Profit share", "Alignment with company results", "Weak line of sight — one person's effort barely moves the outcome"],
            ["Share options and long-term plans", "Long-horizon thinking, retention", "Dilution; and value driven by market movements rather than performance"],
            ["Non-financial recognition", "Cheap, immediate, supports culture", "Insufficient alone where pay is uncompetitive"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Line of sight is the test",
          md: "A reward motivates only if the person can see how their own actions move the measure. A group-wide profit share barely influences an individual's daily choices; a team quality target they can affect this week does. When recommending a scheme, say explicitly whether the recipient can influence the measure — that is the controllability principle applied to reward.",
        },
      ],
      check: {
        q: "A company introduces a group-wide profit share for all staff to improve motivation. What is the likely weakness?",
        options: [
          "Profit shares are not permitted for non-managerial staff",
          "Weak line of sight — an individual's actions barely affect group profit, so the scheme rewards people for outcomes they cannot influence and does little to change daily behaviour",
          "It will cause excessive individual competition",
          "It is more expensive than individual bonuses",
        ],
        correct: 1,
        explain:
          "Motivation requires the recipient to see a connection between what they do and what they receive. Group profit share is useful for signalling shared purpose and aiding retention, but as a driver of individual behaviour it is weak — which is why it usually sits alongside more local measures rather than replacing them.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing the six dimensions without splitting them.", fix: "Two are results and four are determinants — that distinction is the model's contribution." },
    { trap: "Treating a budget-constrained style as rigorous good practice.", fix: "Hopwood found it produces manipulation and displacement; profit conscious performs better." },
    { trap: "Recommending a bonus without testing line of sight.", fix: "Ask whether the recipient can actually influence the measure." },
    { trap: "Ignoring the standards block.", fix: "Ownership, achievability and equity determine whether a target drives behaviour at all." },
  ],
  keyTerms: [
    { term: "Building block model", def: "Fitzgerald and Moon's framework of dimensions, standards and rewards for performance measurement in service businesses." },
    { term: "Determinants", def: "Quality, flexibility, resource utilisation and innovation — the dimensions that produce results and can be acted on now." },
    { term: "Budget constrained style", def: "Evaluating a manager almost entirely on meeting the short-term budget, which Hopwood associated with data manipulation and poor cooperation." },
    { term: "Line of sight", def: "The extent to which an individual can see how their own actions affect the measure their reward depends on." },
  ],
  summary: [
    "Building blocks: dimensions, standards and rewards — and four of the six dimensions are determinants.",
    "Standards fail on ownership, achievability or equity, and each failure has a different remedy.",
    "Hopwood's budget-constrained style looks rigorous and produces manipulation.",
    "Match the style to controllability, and test every reward scheme for line of sight.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three standards a target must satisfy?", a: "Ownership by those held to it, achievability, and equity across the units being compared." },
    { q: "Which Hopwood style produced the best long-term results?", a: "Profit conscious — using the budget as one input among several within a longer-term assessment of effectiveness." },
    { q: "What is line of sight, and why does it matter?", a: "Whether a person can see how their own actions move the measure they are rewarded on; without it a scheme does not change behaviour." },
  ],
  furtherStudy: [
    "APM-19 covers accountability, reward consequences and the 'what gets measured gets done' proposition.",
    "APM-25 covers service businesses, for which the building block model was designed.",
    "APM-07 covers the culture within which any management style operates.",
  ],
}

const APM_TREE_19: StudyChapter = {
  paper: "APM",
  id: "APM-19",
  number: 19,
  area: "B",
  syllabusRefs: ["B2(b)", "B2(e)", "B2(f)"],
  title: "Accountability, reward and what gets measured",
  minutes: 18,
  intro:
    "'What gets measured, gets done' is in the syllabus as something to assess, not to agree with. It is true, and that is exactly the problem.",
  outcomes: [
    "Assess the accountability issues arising from performance measurement systems",
    "Evaluate reward practices and the consequences of linking reward to measurement",
    "Assess the proposition that what gets measured gets done, and apply it to a scenario",
    "Identify the behaviours a specific measure will produce, including the unintended ones",
    "Recommend safeguards that keep a measured system honest",
  ],
  sections: [
    {
      id: "what-gets-measured",
      heading: "What gets measured gets done — and what does not, does not",
      blocks: [
        {
          kind: "text",
          md: "The proposition is true in a stronger sense than it is usually quoted. Measuring something directs effort toward it; the corollary is that **anything not measured is deprioritised**, whether or not it matters. So a measurement system is a statement of what the organisation has decided to neglect, and that half is rarely examined when the system is designed.",
        },
        {
          kind: "table",
          caption: "Measures and the behaviour they actually produce",
          head: ["Measure", "Intended behaviour", "What also happens"],
          rows: [
            ["Calls answered within 20 seconds", "Responsive service", "Calls answered and immediately transferred; the clock stops, the problem does not"],
            ["Number of patients treated", "Higher throughput", "Quick cases prioritised; complex ones deferred"],
            ["Cost per unit", "Efficiency", "Cheaper inputs, deferred maintenance, quality decline"],
            ["Sales revenue", "Growth", "Discounting, and channel stuffing near period end"],
            ["Defects found by inspection", "Quality control", "Fewer defects recorded rather than fewer defects made"],
            ["Staff utilisation percentage", "Productive use of people", "Busywork recorded; training and improvement squeezed out"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The design question that prevents most of this",
          md: "For every proposed measure, ask: **what is the cheapest way for someone to improve this number without improving the underlying thing?** If a cheap route exists, either the measure needs a counterweight or it should not be used. That single question is the most useful thing in this chapter and applies to every measure in the paper.",
        },
        {
          kind: "text",
          md: "The standard counterweight is **pairing**: a volume measure with a quality measure, a speed measure with a resolution measure, a cost measure with a satisfaction measure. Pairing works because the cheap route to improving one measure damages the other, so gaming becomes visible.",
        },
      ],
      check: {
        q: "A call centre measured on average call handling time sees the measure improve while customer complaints rise. What has happened, and what is the fix?",
        options: [
          "The complaints are unrelated to the handling time measure",
          "Staff are ending calls before problems are resolved, because that is the cheapest way to improve the measured number — the fix is to pair it with first-contact resolution or repeat-call rate so the shortcut becomes visible",
          "The handling time target should be reduced further",
          "Complaints should be excluded from reporting",
        ],
        correct: 1,
        explain:
          "Handling time can be improved by resolving faster or by ending sooner, and the second is far easier. Pairing it with a measure of whether the customer had to call back makes the shortcut counterproductive, which is the general design remedy for a single-measure incentive.",
      },
    },
    {
      id: "reward-consequences",
      heading: "Linking reward to measurement",
      blocks: [
        {
          kind: "text",
          md: "Attaching money to a measure sharply increases both the behaviour it drives **and** the effort put into gaming it. The syllabus asks for both the beneficial and the adverse consequences, so give them equal weight.",
        },
        {
          kind: "table",
          caption: "Both sides of performance-related pay",
          head: ["Beneficial", "Adverse"],
          rows: [
            ["Directs effort toward stated priorities", "Directs effort AWAY from everything unmeasured"],
            ["Attracts and retains strong performers", "Encourages manipulation of the measure and of the target"],
            ["Makes expectations explicit", "Damages cooperation where rewards are individual"],
            ["Aligns manager and shareholder interests", "Can encourage excessive risk-taking where upside is uncapped"],
            ["Differentiates performance rather than paying uniformly", "Perceived unfairness where results are partly uncontrollable"],
            ["Provides a mechanism for changing behaviour quickly", "Crowds out intrinsic motivation in professional work"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The target is gamed before the performance is",
          md: "The cheapest way to earn a bonus is not to perform better but to secure an easier target — which is why budget slack from APM-07 and reward are the same problem seen twice. Any recommendation on reward should say who sets the target and how it is validated; a scheme where the recipient materially influences their own target is not a performance scheme.",
        },
        {
          kind: "text",
          md: "**Accountability issues** follow from the same root. Holding someone accountable requires that they controlled the outcome, that the measurement is accurate, and that the standard was known in advance. Where results depend on other units, accountability becomes genuinely shared — and a system that assigns it to one manager anyway produces defensive behaviour and inter-departmental blame, which is precisely what Hopwood observed under the budget-constrained style.",
        },
        {
          kind: "activity",
          title: "Design the safeguards",
          prompt:
            "A company plans to pay divisional managers a bonus on divisional profit alone. What safeguards would you recommend, and why?",
          answer:
            "Five, each aimed at a specific failure this scheme invites. First, base the bonus on controllable profit rather than reported profit, so central allocations and centrally set transfer prices do not distort it - otherwise managers are rewarded or punished for decisions taken elsewhere. Second, pair the profit measure with non-financial ones the manager cannot improve by cutting: customer retention, quality, employee turnover. Profit alone can be raised for a year by deferring maintenance and cutting training, and the pairing makes that visible. Third, extend the horizon - assess over a rolling two or three years, or defer part of the award, so decisions whose costs arrive later are still visible when the reward vests. Fourth, take target setting out of the hands of the people being paid: targets should be validated independently, ideally against external or peer comparators, because the cheapest route to a bonus is an easy target rather than good performance. Fifth, cap the upside or apply a clawback, since an uncapped scheme buys more risk-taking than shareholders usually intend. I would also say plainly that if divisions trade with each other, profit-based bonuses will generate transfer pricing disputes, and the transfer pricing policy needs settling before the scheme starts rather than after the first argument.",
        },
      ],
      check: {
        q: "Why is the target-setting process the most important safeguard in a performance-related pay scheme?",
        options: [
          "Because targets must be published to shareholders",
          "Because securing an easier target is a cheaper route to the bonus than improving performance, so a scheme where the recipient influences their own target rewards negotiation rather than results",
          "Because targets determine the accounting treatment of the bonus",
          "Because higher targets always produce better performance",
        ],
        correct: 1,
        explain:
          "Every incentive scheme is attacked at its weakest point, and the target is usually easier to move than the performance. This is the same mechanism as budget slack, which is why the two topics recur together — and why independent, externally validated target setting matters more than the precise formula.",
      },
    },
  ],
  examTraps: [
    { trap: "Quoting 'what gets measured gets done' approvingly.", fix: "The syllabus asks you to ASSESS it — the corollary is that the unmeasured is neglected." },
    { trap: "Listing only the benefits of performance-related pay.", fix: "Give the adverse consequences equal weight; the requirement asks for both." },
    { trap: "Proposing a single measure with a bonus attached.", fix: "Pair it, so the cheap route to improving one damages the other." },
    { trap: "Ignoring who sets the target.", fix: "A recipient who influences their own target is being paid to negotiate." },
  ],
  keyTerms: [
    { term: "Gaming", def: "Improving a measured number without improving the underlying performance it is supposed to represent." },
    { term: "Paired measures", def: "Two measures chosen so that the cheap route to improving one visibly damages the other, making gaming detectable." },
    { term: "Controllability", def: "The principle that accountability and reward should rest only on outcomes the individual could actually influence." },
    { term: "Clawback", def: "A contractual right to recover incentive pay already awarded where later events show the performance was misstated or unsustainable." },
  ],
  summary: [
    "Measurement directs effort — and everything unmeasured is thereby deprioritised.",
    "For every measure, ask the cheapest way to improve the number without improving reality.",
    "Reward sharpens both the intended behaviour and the effort spent gaming it.",
    "The target is attacked before the performance is, so independent target setting is the key safeguard.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the corollary of 'what gets measured gets done'?", a: "What is not measured does not get done — so a measurement set is also a decision about what to neglect." },
    { q: "What is pairing, and why does it work?", a: "Combining measures so that the cheap route to improving one damages the other, which makes gaming visible rather than profitable." },
    { q: "Where is an incentive scheme usually attacked first?", a: "At the target, because securing an easier one is cheaper than improving performance." },
  ],
  furtherStudy: [
    "APM-18 covers management style and the remuneration methods this chapter's safeguards apply to.",
    "APM-13 covers why self-reported non-financial measures are especially vulnerable to gaming.",
    "APM-07 covers budget slack, the same incentive problem seen through the planning system.",
  ],
}

export const APM_TREE_AREA_B_PART1: StudyChapter[] = [APM_TREE_15, APM_TREE_16, APM_TREE_17, APM_TREE_18, APM_TREE_19]
