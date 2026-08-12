/*
 * MA Area F — Performance measurement.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * The last of MA's three multi-task topics, and the one where a correct
 * calculation most often earns half the marks available: the second half is
 * always interpretation. A ratio computed and left unexplained answers a
 * question the examiner did not ask, so the plans here treat "and comment"
 * as part of the requirement rather than as a courtesy.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const MA_PLANS_F: ExamPlanMap = {
  /* ── MA-24 · Performance measurement: concepts ───────────────── */

  "MA-24::purpose": {
    title: "What performance measurement is for",
    format: "ot",
    marks: 2,
    requirement:
      "The principal purpose of measuring performance within an organisation is to:\n\nA  Satisfy the external auditor\nB  Provide information that supports control and improvement\nC  Comply with accounting standards\nD  Calculate the tax charge",
    plan: [
      {
        step: "Recall that performance measurement is internal",
        detail:
          "It exists to inform managers. Three of the four options describe external requirements, and each belongs to financial accounting rather than to this syllabus area.",
      },
      {
        step: "Name what measurement makes possible",
        detail:
          "Comparison against a target, identification of where performance departed from it, accountability for the departure, and action to improve. Without measurement, none is available.",
      },
      {
        step: "Reject the three external purposes",
        detail:
          "The auditor, accounting standards and the tax charge all concern reporting outward. A performance measure could serve them incidentally, but that is not why it is produced.",
      },
      {
        step: "Note the behavioural warning that goes with it",
        detail:
          "What gets measured gets managed — including in unintended ways. A measure changes behaviour, so choosing it badly produces exactly the wrong behaviour, which is the theme of the whole area.",
      },
    ],
    answer:
      "**B — provide information that supports control and improvement.**\n\nPerformance measurement is internal. It makes comparison against a target possible, shows where performance departed from it, supports accountability for the departure and directs the action that follows.\n\nThe auditor, accounting standards and the tax charge are all external, belonging to financial accounting.\n\nThe caution that runs through the whole area is behavioural: **what gets measured gets managed**, including in ways nobody intended. Measuring a call centre on calls handled per hour produces short calls rather than resolved problems, which is why the design of a measure matters as much as its calculation.",
    earns: ["Keeping the internal purpose separate from external reporting requirements"],
    loses: ["Choosing an external requirement, which belongs to a different part of the syllabus"],
  },

  "MA-24::financial-nonfinancial": {
    title: "Why non-financial measures are needed alongside financial ones",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is the main advantage of using **non-financial** performance measures alongside financial ones?\n\nA  They are easier to calculate\nB  They can signal problems before those problems reach the financial results\nC  They are required by accounting standards\nD  They remove the need for financial measures",
    plan: [
      {
        step: "Identify the weakness of financial measures",
        detail:
          "They are backward-looking and they aggregate. By the time falling quality appears as lost revenue, the customers have already gone and the cause is several months old.",
      },
      {
        step: "State what non-financial measures add",
        detail:
          "They are leading indicators: defect rates, on-time delivery, customer complaints, staff turnover. Each moves before the financial consequence arrives, which makes intervention possible.",
      },
      {
        step: "Reject the two overreaching options",
        detail:
          "C is false — no accounting standard requires them. D goes too far: non-financial measures complement financial ones and cannot replace them, since the organisation must still be solvent and profitable.",
      },
      {
        step: "Reject the ease claim",
        detail:
          "Non-financial measures are often harder to define and capture than financial ones, precisely because no ledger produces them. Ease is not the argument for using them.",
      },
    ],
    answer:
      "**B — they can signal problems before those problems reach the financial results.**\n\nFinancial measures are **lagging** indicators: by the time falling quality shows up as lost revenue, the customers have gone and the cause is months old.\n\nNon-financial measures are **leading** indicators — defect rates, on-time delivery, complaint volumes, staff turnover — and each moves before the financial consequence arrives, which is what makes intervention possible.\n\nD overreaches: they complement financial measures rather than replacing them, since the organisation still has to be profitable and solvent. And they are often **harder** to define and capture than financial measures, because no ledger produces them.",
    earns: ["Framing the difference as leading versus lagging indicators"],
    loses: ["Choosing an option that treats non-financial measures as a replacement"],
  },

  "MA-24::three-es": {
    title: "Telling economy, efficiency and effectiveness apart",
    format: "ot",
    marks: 2,
    requirement:
      "A hospital reduces the average cost per operation while treating the same number of patients with the same outcomes. This is primarily an improvement in:\n\nA  Economy\nB  Efficiency\nC  Effectiveness\nD  Equity",
    plan: [
      {
        step: "Define the three Es by where each sits in the input-output chain",
        detail:
          "Economy: obtaining inputs at lower cost. Efficiency: getting more output from given inputs, or the same output from fewer. Effectiveness: achieving the intended objective or outcome.",
      },
      {
        step: "Read the stem for what changed and what did not",
        detail:
          "Cost per operation fell. Volume and outcomes were unchanged. So the same output was obtained from fewer resources, which is the efficiency definition exactly.",
      },
      {
        step: "Split economy from efficiency carefully",
        detail:
          "Economy would be buying the same supplies more cheaply — an input-price improvement. Efficiency is the ratio of output to input, which is what cost per operation measures.",
      },
      {
        step: "Note why effectiveness is separate",
        detail:
          "Outcomes were unchanged, so effectiveness is unchanged. The three are independent: cheap inputs used wastefully to achieve nothing scores well on economy alone, which is why all three are needed.",
      },
    ],
    answer:
      "**B — efficiency.**\n\n**Economy** is obtaining inputs at lower cost. **Efficiency** is the relationship between output and input — more output from given resources, or the same output from fewer. **Effectiveness** is achieving the intended outcome.\n\nCost per operation falling with volume and outcomes unchanged means the same output from fewer resources: efficiency.\n\nThe three are independent, which is why all three are needed. An organisation can buy cheaply (economical), use those inputs wastefully (inefficient) and still fail to achieve its objective (ineffective) — and a measure of any one alone would miss the other two.\n\nThe three Es matter particularly in the public and not-for-profit sectors, where profit is unavailable as a summary measure.",
    earns: ["Placing each E at its own point in the input–output–outcome chain"],
    loses: ["Confusing economy with efficiency, since both concern cost"],
  },

  "MA-24::good-measures": {
    title: "Recognising a badly designed performance measure",
    format: "ot",
    marks: 2,
    requirement:
      "A call centre measures its staff solely on the number of calls answered per hour. The most likely unintended consequence is that:\n\nA  Staff will answer fewer calls\nB  Staff will end calls quickly, leaving customer problems unresolved\nC  Staff turnover will fall\nD  The measure will be difficult to calculate",
    plan: [
      {
        step: "Ask what behaviour the measure rewards",
        detail:
          "Calls per hour rewards ending calls fast. It says nothing about whether the customer's problem was solved, so the fastest route to a good score is a short call.",
      },
      {
        step: "Follow that incentive to its conclusion",
        detail:
          "Staff optimise for what is measured. Problems go unresolved, customers call back, and the callback then improves the very measure that caused it — the metric rewards its own failure.",
      },
      {
        step: "Reject the option that contradicts the incentive",
        detail:
          "A says staff will answer fewer calls, which is the opposite of what the measure rewards. Nothing in the design points that way.",
      },
      {
        step: "Name the remedy, since it carries the follow-on mark",
        detail:
          "Use a balanced set: first-call resolution, customer satisfaction and quality alongside volume. A single measure is always gameable; a balanced set makes gaming visible.",
      },
    ],
    answer:
      "**B — staff will end calls quickly, leaving customer problems unresolved.**\n\nThe measure rewards ending calls fast and says nothing about resolution, so staff optimise for speed. Unresolved problems generate callbacks — and each callback **improves** the metric, so the measure rewards its own failure.\n\nOption A is the opposite of the incentive the measure creates.\n\nThe remedy is a **balanced** set of measures: first-call resolution rate, customer satisfaction and quality monitoring alongside volume. A single measure is always gameable; several that pull in different directions make gaming visible.\n\nA good measure is relevant to the objective, controllable by the person measured, timely, understandable, and resistant to manipulation.",
    earns: [
      "Reasoning from the behaviour the measure rewards to the behaviour it will produce",
      "Naming a balanced set as the remedy rather than \"monitor it better\"",
    ],
    loses: ["Choosing an outcome the incentive does not support"],
  },

  "MA-24::context": {
    title: "Measuring performance where there is no profit",
    format: "ot",
    marks: 2,
    requirement:
      "Performance measurement in a not-for-profit organisation is more difficult than in a commercial company principally because:\n\nA  Not-for-profit organisations do not keep accounting records\nB  Their objectives are often non-financial and hard to quantify\nC  They are not permitted to measure performance\nD  They have no costs to control",
    plan: [
      {
        step: "Identify what commercial organisations have that others lack",
        detail:
          "Profit — a single quantified measure summarising whether the organisation achieved its objective. Its absence is the whole of the difficulty.",
      },
      {
        step: "Describe the substitute objective",
        detail:
          "A charity's objective might be relieving hardship or improving literacy. Both are real, both are measurable in some way, and neither reduces to one number that says whether the year went well.",
      },
      {
        step: "Reject the three false claims",
        detail:
          "Not-for-profit organisations keep records, are free to measure performance and certainly have costs to control. None of the three options is even factually available.",
      },
      {
        step: "Name the framework used instead",
        detail:
          "Value for money, assessed through the three Es. Economy and efficiency can be measured reasonably well; effectiveness is where the difficulty concentrates, because the outcome is qualitative.",
      },
    ],
    answer:
      "**B — their objectives are often non-financial and hard to quantify.**\n\nA commercial company has profit: one quantified figure that summarises whether the objective was achieved. A not-for-profit organisation's objective may be relieving hardship or improving literacy — real, and not reducible to a single number.\n\nThe framework used instead is **value for money**, assessed through the three Es. Economy and efficiency can be measured reasonably well; **effectiveness** is where the difficulty concentrates, because the outcome is qualitative and often only observable years later.\n\nThe other three options are factually wrong: such organisations keep records, are free to measure performance, and have costs to control — often under tighter scrutiny than a commercial company, because the money was donated.",
    earns: ["Identifying the absence of a single summary measure as the specific difficulty"],
    loses: ["Choosing an option that is factually untrue of not-for-profit organisations"],
  },

  /* ── MA-25 · Performance measurement in application ──────────── */

  "MA-25::profitability": {
    title: "Computing and interpreting a margin",
    format: "ot",
    marks: 2,
    requirement:
      "Revenue is $800,000, cost of sales $520,000 and operating expenses $180,000. The **gross** profit margin is:\n\nA  12.5%\nB  22.5%\nC  35.0%\nD  53.8%",
    plan: [
      {
        step: "Read which margin is asked for",
        detail:
          "GROSS, so operating expenses are excluded. Gross margin uses gross profit; operating margin uses profit after operating expenses. Three of the four options are the other margins.",
      },
      {
        step: "Compute the correct numerator",
        detail:
          "Gross profit = $800,000 − $520,000 = **$280,000**. The $180,000 of operating expenses plays no part in this ratio.",
      },
      {
        step: "Divide by revenue, not by cost",
        detail:
          "$280,000 ÷ $800,000 = **35%**. Dividing by cost of sales instead gives 53.8%, which is option D — that figure is a mark-up, not a margin.",
      },
      {
        step: "Compute the operating margin to identify the other distractor",
        detail:
          "($280,000 − $180,000) ÷ $800,000 = 12.5%, which is option A. Every wrong option is a real ratio computed from the same three numbers.",
      },
    ],
    answer:
      "**C — 35.0%.**\n\nGross profit = $800,000 − $520,000 = $280,000.\nGross margin = $280,000 ÷ $800,000 = **35%**.\n\nEvery distractor is a genuine ratio from the same figures. **12.5%** is the operating margin, ($280,000 − $180,000) ÷ $800,000. **53.8%** is $280,000 ÷ $520,000 — a **mark-up on cost**, not a margin on revenue, and the distinction is examined in its own right.\n\nInterpretation is the other half of any margin question. Gross margin moves with selling prices, input costs and sales mix. Operating margin moves with those and with overhead control — so gross margin holding steady while operating margin falls points at overheads rather than at pricing or purchasing.",
    earns: [
      "Reading which margin is asked for before computing",
      "Dividing by revenue, and knowing that dividing by cost gives a mark-up",
    ],
    loses: ["Deducting operating expenses from a gross margin calculation"],
  },

  "MA-25::liquidity-activity": {
    title: "Computing the inventory holding period and reading it",
    format: "ot",
    marks: 2,
    requirement:
      "Cost of sales is $730,000 and average inventory is $120,000. The inventory holding period is approximately:\n\nA  6.1 days\nB  60 days\nC  164 days\nD  6.1 times",
    plan: [
      {
        step: "Write the formula and check which figure goes on top",
        detail:
          "Inventory holding period = (average inventory ÷ cost of sales) × 365. Inventory is the numerator. Inverting it gives inventory TURNOVER, which is a different measure in different units.",
      },
      {
        step: "Compute",
        detail:
          "($120,000 ÷ $730,000) × 365 = 0.1644 × 365 = **60 days**.",
      },
      {
        step: "Check the units are days, not times",
        detail:
          "The question asks for a period, so the answer must be in days. Option D, 6.1 times, is the turnover ratio — correct arithmetic, wrong measure, and it announces itself by its units.",
      },
      {
        step: "Interpret in both directions",
        detail:
          "60 days means inventory sits for two months on average. Longer ties up cash and risks obsolescence; much shorter risks stockouts and lost sales. Neither direction is automatically good.",
      },
    ],
    answer:
      "**B — 60 days.**\n\n($120,000 ÷ $730,000) × 365 = **60 days**.\n\nOption D, 6.1 **times**, is inventory turnover — $730,000 ÷ $120,000 — which is the same relationship expressed as a frequency rather than a period. The units are the giveaway: a holding period is measured in days.\n\nInterpretation runs both ways. 60 days means inventory sits for two months, tying up cash and carrying obsolescence risk. But a much shorter period risks stockouts and lost sales, so neither direction is automatically an improvement — it depends on the industry and on what the trend has been.\n\nThe same structure gives the receivables period (receivables ÷ credit sales × 365) and the payables period (payables ÷ credit purchases × 365), and the three combine into the **cash operating cycle**.",
    earns: [
      "Keeping inventory in the numerator so the answer comes out in days",
      "Interpreting a longer period as a risk rather than simply as bad",
    ],
    loses: ["Reporting the turnover ratio when a period in days was asked for"],
  },

  "MA-25::divisional": {
    title: "Computing ROI and residual income, and seeing where they disagree",
    format: "mtq",
    marks: 10,
    requirement:
      "Division X has capital employed of $2,000,000 and made an operating profit of $360,000. The group's cost of capital is 12%. A new project is available requiring $400,000 of capital and returning $60,000 of operating profit per year.\n\n(i) Calculate the division's current ROI and residual income.\n(ii) Calculate the ROI and residual income if the project is accepted.\n(iii) State whether the divisional manager would accept the project if judged on ROI, and whether that decision is in the group's interest. Explain the conflict.",
    plan: [
      {
        step: "Compute both measures before the project",
        detail:
          "ROI = operating profit ÷ capital employed. Residual income = operating profit − (capital employed × cost of capital). Setting both out first gives the baseline every later comparison needs.",
      },
      {
        step: "Test the project on its own terms",
        detail:
          "The project returns $60,000 on $400,000 = 15%, which is above the 12% cost of capital. So it creates value for the group, and that fact settles the second half of part (iii) before any combined figures are computed.",
      },
      {
        step: "Recompute both measures with the project included",
        detail:
          "Add profit to profit and capital to capital, then apply both formulae to the combined figures. Do not average the two ROIs — that is not how the ratio behaves.",
      },
      {
        step: "Read the direction each measure moves",
        detail:
          "ROI falls because 15% is below the division's existing 18%. Residual income rises because 15% exceeds the 12% cost of capital. The two measures disagree, and that disagreement IS the question.",
      },
      {
        step: "Answer part (iii) in terms of the conflict, not the arithmetic",
        detail:
          "A manager on ROI rejects a project that benefits the group. This is dysfunctional decision-making, and residual income is the measure that removes it — that sentence is where the marks in (iii) sit.",
      },
    ],
    answer:
      "**(i) Current position**\nROI = $360,000 ÷ $2,000,000 = **18%**\nResidual income = $360,000 − (12% × $2,000,000) = $360,000 − $240,000 = **$120,000**\n\n**(ii) With the project**\nProfit = $360,000 + $60,000 = $420,000\nCapital = $2,000,000 + $400,000 = $2,400,000\nROI = $420,000 ÷ $2,400,000 = **17.5%**\nResidual income = $420,000 − (12% × $2,400,000) = $420,000 − $288,000 = **$132,000**\n\n**(iii) The conflict**\nJudged on **ROI**, the manager would **reject** the project: 18% falls to 17.5%, so accepting it makes their measured performance worse.\n\nThe decision is **against the group's interest**. The project returns 15% against a cost of capital of 12%, so it creates value — and residual income rises by $12,000, which is exactly $400,000 × (15% − 12%).\n\nThe cause is that ROI is a **percentage** and is dragged down by anything below the existing average, even where that return is comfortably above the cost of capital. Residual income is an **absolute** measure that accepts anything earning more than the cost of capital, so it aligns the manager's interest with the group's. Its drawback is that being absolute it favours large divisions and cannot be used to compare divisions of different size.",
    earns: [
      "Testing the project's own return against the cost of capital before computing combined figures",
      "Recomputing ROI from combined profit and capital rather than averaging percentages",
      "Naming the conflict as dysfunctional decision-making and explaining why the percentage measure causes it",
      "Stating residual income's own weakness, since a one-sided answer is incomplete",
    ],
    loses: [
      "Averaging the two ROIs instead of recomputing from totals",
      "Stating that ROI falls without explaining that 15% still exceeds the cost of capital",
      "Answering (iii) with the numbers alone and never naming the conflict, which is where most of its marks are",
    ],
  },

  "MA-25::resource-utilisation": {
    title: "Measuring how well a resource is being used",
    format: "ot",
    marks: 2,
    requirement:
      "A factory has 8,000 machine hours available in a period and used 6,800 of them productively. The capacity utilisation is:\n\nA  85%\nB  17.6%\nC  117.6%\nD  15%",
    plan: [
      {
        step: "Identify which figure is the base",
        detail:
          "Utilisation measures how much of what was AVAILABLE was used, so available hours are the denominator. Getting the base wrong inverts the ratio and produces an impossible figure.",
      },
      {
        step: "Compute",
        detail:
          "6,800 ÷ 8,000 = **85%**. The result must be below 100% because used hours cannot exceed hours available.",
      },
      {
        step: "Use the impossibility check on the options",
        detail:
          "Option C, 117.6%, is the inverted fraction and can be rejected without arithmetic — more hours cannot be used than exist. Option D, 15%, is the idle proportion.",
      },
      {
        step: "Connect it to the earlier labour ratios",
        detail:
          "This is the same family as the capacity, efficiency and production volume ratios in Area C. Utilisation asks how much of the resource was used; efficiency asks how much output those hours produced.",
      },
    ],
    answer:
      "**A — 85%.**\n\nUtilisation = productive hours ÷ available hours = 6,800 ÷ 8,000 = **85%**, with 15% idle.\n\nThe impossibility check disposes of option C without arithmetic: 117.6% is the inverted fraction, and more hours cannot be used than exist. Option D is the idle proportion rather than the utilisation.\n\nThis belongs to the same family as the capacity, efficiency and production volume ratios in Area C, and the distinction between them matters: **utilisation** asks how much of the resource was used, **efficiency** asks how much output those hours produced. High utilisation with low efficiency means the machines ran constantly and produced little — which is why neither measure means much alone.",
    earns: [
      "Putting available hours in the denominator and using the impossibility check",
      "Separating utilisation from efficiency, which measure different things",
    ],
    loses: ["Inverting the ratio, which produces a figure above 100%"],
  },

  /* ── MA-26 · Cost reduction and value enhancement ────────────── */

  "MA-26::reduction-vs-control": {
    title: "Distinguishing cost reduction from cost control",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an example of cost **reduction** rather than cost control?\n\nA  Investigating an adverse material price variance\nB  Redesigning a product to use fewer components\nC  Comparing actual overhead with budgeted overhead\nD  Requiring authorisation for spending above a limit",
    plan: [
      {
        step: "Define both against the standard",
        detail:
          "Cost CONTROL keeps actual cost at or below the existing standard. Cost REDUCTION lowers the standard itself, by changing how the product or process works.",
      },
      {
        step: "Ask of each option whether the standard changes",
        detail:
          "Investigating a variance, comparing against budget and requiring authorisation all police the existing standard. None of them changes what the product ought to cost.",
      },
      {
        step: "Confirm the survivor changes the standard",
        detail:
          "Redesigning a product to use fewer components lowers what it costs to make. The standard cost itself falls, permanently, which is the definition of cost reduction.",
      },
      {
        step: "Note the practical difference between the two",
        detail:
          "Control is continuous and defensive; reduction is a project with a beginning and an end, and it usually requires investment. That is why the two are managed differently.",
      },
    ],
    answer:
      "**B — redesigning a product to use fewer components.**\n\n**Cost control** keeps actual cost at or below the existing standard: variance investigation, budget comparison and spending authorisation all police a standard that stays where it is.\n\n**Cost reduction** lowers the standard itself, by changing the product or the process. Redesigning to use fewer components reduces what the product costs to make permanently.\n\nThe distinction has a practical edge. Control is continuous and defensive; reduction is a project with a beginning and an end, usually needing investment up front. An organisation with excellent cost control may still be uncompetitive, because it is efficiently making a product that costs too much by design.",
    earns: ["Asking whether the standard itself changes"],
    loses: ["Treating any activity that lowers spending as cost reduction"],
  },

  "MA-26::value-analysis": {
    title: "What value analysis examines",
    format: "ot",
    marks: 2,
    requirement:
      "Value analysis is best described as a systematic examination of:\n\nA  The variances reported in the last period\nB  The factors affecting the cost of a product, to eliminate cost that adds no value to the customer\nC  The market value of the company's shares\nD  The value of inventory held at the period end",
    plan: [
      {
        step: "Read the term against what it examines",
        detail:
          "Value analysis examines a product's cost against the value the customer places on each feature. Anything costing money without adding value the customer will pay for is a target for elimination.",
      },
      {
        step: "Fix the customer as the reference point",
        detail:
          "Value is defined by what the customer will pay for, not by what the engineer thinks is elegant or what the accountant can measure. That is what makes the technique different from simple cost cutting.",
      },
      {
        step: "Distinguish value analysis from value engineering",
        detail:
          "Value analysis works on an EXISTING product. Value engineering does the same at the DESIGN stage, before the cost has been committed — and is more effective, because most cost is locked in at design.",
      },
      {
        step: "Reject the options from other topics",
        detail:
          "Variance analysis, share valuation and inventory valuation are three different subjects that share the word value or analysis.",
      },
    ],
    answer:
      "**B — the factors affecting the cost of a product, to eliminate cost that adds no value to the customer.**\n\nValue analysis examines each element of a product's cost against the value the **customer** places on it. Cost that buys nothing the customer will pay for is a target for elimination — packaging nobody notices, tolerances beyond what the use requires, features that are never used.\n\nThe customer reference point is what separates it from indiscriminate cost cutting, which removes cost the customer does value and loses sales.\n\n**Value engineering** applies the same thinking at the **design** stage, before cost has been committed. It is the more effective of the two, because most of a product's cost is locked in at design — which is also why it pairs naturally with target costing.",
    earns: [
      "Defining value from the customer's side",
      "Distinguishing value analysis on an existing product from value engineering at design",
    ],
    loses: ["Confusing it with variance analysis or with a valuation technique"],
  },

  "MA-26::bpr-and-ci": {
    title: "Telling re-engineering from continuous improvement",
    format: "ot",
    marks: 2,
    requirement:
      "A company abandons its existing order-processing procedure entirely and designs a new one from first principles. This is an example of:\n\nA  Continuous improvement (kaizen)\nB  Business process re-engineering\nC  Standard costing\nD  Value engineering",
    plan: [
      {
        step: "Split the two improvement philosophies on scale",
        detail:
          "Business process re-engineering is fundamental and radical — scrap the process and redesign from first principles. Continuous improvement is incremental and ongoing — many small changes to the existing process.",
      },
      {
        step: "Read the stem for which one is described",
        detail:
          "\"Abandons entirely\" and \"from first principles\" are re-engineering's own words. Continuous improvement never abandons a process; it refines it.",
      },
      {
        step: "Note that the two also differ in who drives them",
        detail:
          "Re-engineering is top-down, project-based and often disruptive. Continuous improvement is driven by the people doing the work and is cultural rather than project-based.",
      },
      {
        step: "Rule out the two techniques from other topics",
        detail:
          "Standard costing is a control system. Value engineering redesigns a PRODUCT at the design stage, whereas the stem describes redesigning a PROCESS.",
      },
    ],
    answer:
      "**B — business process re-engineering.**\n\nBPR is the fundamental rethinking and radical redesign of a process from first principles, and \"abandons its existing procedure entirely\" is that definition stated in the stem.\n\n**Continuous improvement (kaizen)** is its opposite in every respect: incremental rather than radical, ongoing rather than a project, driven by the people doing the work rather than imposed from above, and cheap and low-risk rather than expensive and disruptive.\n\nValue engineering redesigns a **product** at the design stage; the stem describes redesigning a **process**. Standard costing is a control system, not an improvement technique.\n\nThe trade-off is worth knowing: BPR can deliver step changes but has a high failure rate and disrupts the organisation; kaizen delivers small reliable gains but rarely transforms anything.",
    earns: ["Splitting the two on scale, and knowing they also differ in who drives them"],
    loses: ["Choosing value engineering, which redesigns products rather than processes"],
  },

  /* ── MA-27 · Monitoring performance and reporting ────────────── */

  "MA-27::designing-a-report": {
    title: "What belongs in a performance report for a given manager",
    format: "ot",
    marks: 2,
    requirement:
      "A performance report for a production department manager should include:\n\nA  All costs incurred anywhere in the organisation\nB  Only those costs the manager can control\nC  Only the costs charged to the department, controllable or not\nD  Only variances that are favourable",
    plan: [
      {
        step: "State the controllability principle",
        detail:
          "A manager should be held accountable only for what they can influence. Reporting uncontrollable costs to them produces either resentment or indifference, and neither improves anything.",
      },
      {
        step: "Reject the two extremes of scope",
        detail:
          "A is everything in the organisation, which is overload and mostly irrelevant. C includes apportioned costs the manager cannot influence — an apportioned share of head office rent is the standard example.",
      },
      {
        step: "Strike the option that reports only good news",
        detail:
          "D would remove the entire point of a control report. Adverse variances are precisely what requires action.",
      },
      {
        step: "Note the nuance, because a stem may test it",
        detail:
          "Uncontrollable costs may still be SHOWN for information, clearly separated, so the manager sees the full picture. What they must not do is form part of the assessment of that manager.",
      },
    ],
    answer:
      "**B — only those costs the manager can control.**\n\nThe **controllability principle** holds that a manager is accountable only for what they can influence. Reporting an apportioned share of head office rent to a production manager produces resentment or indifference, and cannot produce action, because nothing they do changes it.\n\nA is overload and mostly irrelevant. C includes apportioned costs the manager cannot influence. D removes the point of a control report entirely — adverse variances are what require action.\n\nThe nuance worth holding: uncontrollable costs may still be **shown for information**, clearly separated from controllable ones, so the manager sees the full picture of their department. What they must not do is form part of the assessment of that manager's performance.",
    earns: [
      "Applying controllability as the test for what is assessed",
      "Knowing uncontrollable costs may be shown separately without being assessed",
    ],
    loses: ["Including every cost charged to the department regardless of controllability"],
  },

  "MA-27::exception-and-responsibility": {
    title: "Applying management by exception",
    format: "ot",
    marks: 2,
    requirement:
      "Under management by exception, a monthly report should draw the manager's attention to:\n\nA  Every variance, however small\nB  Only adverse variances\nC  Variances significant enough to justify investigation\nD  Only the largest variance in the report",
    plan: [
      {
        step: "State what the principle is economising on",
        detail:
          "Management time. Investigating everything costs more than it saves, and small variances are usually random noise rather than anything controllable.",
      },
      {
        step: "Reject the two options that filter by direction",
        detail:
          "B reports only adverse variances, but a large favourable variance also needs investigating — it may reveal a stale standard, a cost wrongly omitted, or something worth replicating.",
      },
      {
        step: "Reject the two options that filter by count",
        detail:
          "A is everything, which defeats the principle. D is a fixed count of one, which would ignore a second variance of nearly equal size.",
      },
      {
        step: "Name what determines significance",
        detail:
          "Absolute size, size relative to budget, controllability, whether it is a trend rather than a one-off, and whether the likely saving justifies the cost of investigating.",
      },
    ],
    answer:
      "**C — variances significant enough to justify investigation.**\n\nManagement by exception economises on the scarcest resource in the process, which is management attention. Investigating everything costs more than it saves, and small variances are usually random rather than controllable.\n\nB is the tempting wrong answer. A large **favourable** variance also warrants investigation — it may reveal a standard that has gone stale, a cost wrongly omitted, or a genuine improvement worth replicating elsewhere. Filtering by direction rather than by significance loses all three.\n\nA defeats the principle, and D fixes an arbitrary count that would ignore a second variance of nearly equal size.\n\nSignificance is judged on absolute size, size relative to budget, controllability, whether it is a trend, and whether the likely saving justifies the cost of investigating.",
    earns: ["Knowing favourable variances can be significant, and saying why"],
    loses: ["Filtering by direction rather than by significance"],
  },

  "MA-27::interpreting-and-acting": {
    title: "Turning a report into a recommendation",
    format: "ot",
    marks: 2,
    requirement:
      "A report shows labour efficiency deteriorating for four consecutive months while labour rate variances are consistently favourable. The most useful recommendation is to:\n\nA  Congratulate the personnel department on cost savings\nB  Investigate whether cheaper, less experienced staff are causing the efficiency losses\nC  Tighten the labour efficiency standard\nD  Take no action, since the variances offset",
    plan: [
      {
        step: "Read the two variances as one pattern",
        detail:
          "Favourable rate with adverse efficiency, sustained over four months. That pairing has a standard cause — cheaper labour is often less skilled — and the persistence rules out coincidence.",
      },
      {
        step: "Check whether the trade is actually paying",
        detail:
          "The right recommendation investigates whether the saving on rate exceeds the loss on efficiency. If it does not, the recruitment policy is destroying value while appearing to save money.",
      },
      {
        step: "Reject the two options that read half the evidence",
        detail:
          "A sees only the favourable rate variance. D assumes the two offset without checking, and four months of deterioration is a trend rather than a fluctuation.",
      },
      {
        step: "Reject the option that hides the problem",
        detail:
          "C tightens the standard, which would make the efficiency variance look worse without addressing why it exists. Changing the measure is not the same as fixing what it measures.",
      },
    ],
    answer:
      "**B — investigate whether cheaper, less experienced staff are causing the efficiency losses.**\n\nFavourable rate with adverse efficiency, sustained over four months, is the classic interdependent pair: cheaper labour is often less skilled, so it costs less per hour and takes more hours.\n\nThe recommendation must go to the **net** effect. If the efficiency loss exceeds the rate saving, the recruitment policy is destroying value while appearing on one line of the report to be saving money.\n\nOption A reads only the favourable half. Option D assumes the two offset without checking, and four consecutive months is a trend rather than noise. Option C tightens the standard, which changes how bad the variance looks without touching why it exists — treating the measure rather than the problem.",
    earns: [
      "Reading the two variances as one linked pattern with a common cause",
      "Directing the recommendation at the net effect rather than at either variance alone",
    ],
    loses: ["Assuming offsetting variances cancel out, without testing whether they do"],
  },

  "MA-27::behavioural": {
    title: "The behavioural effect of how performance is reported",
    format: "ot",
    marks: 2,
    requirement:
      "A manager is assessed solely on the variances in their monthly report, with pay linked to the outcome. The most likely behavioural consequence is that the manager will:\n\nA  Focus on long-term improvement of the department\nB  Take short-term actions that improve reported variances at the expense of longer-term performance\nC  Report variances more accurately\nD  Request that uncontrollable costs be added to the report",
    plan: [
      {
        step: "Ask what the reward structure actually rewards",
        detail:
          "Monthly reported variances, with pay attached. So the manager is rewarded for how this month's numbers look, and for nothing that falls outside the month.",
      },
      {
        step: "Follow the incentive to specific behaviours",
        detail:
          "Deferring maintenance, cutting training, delaying necessary purchases and buying cheaper materials all improve this month's variances and damage the department later.",
      },
      {
        step: "Reject the option the incentive contradicts",
        detail:
          "A is what the organisation wants and the opposite of what this structure rewards. Long-term improvement usually costs money now and shows benefit after the reporting period.",
      },
      {
        step: "Name the remedy",
        detail:
          "Assess over a longer period, use a balanced set including non-financial and leading measures, and separate the reward conversation from the performance discussion — the same conclusion BT reaches about appraisal.",
      },
    ],
    answer:
      "**B — take short-term actions that improve reported variances at the expense of longer-term performance.**\n\nThe structure rewards how this month's numbers look and nothing beyond the month, so the manager optimises for exactly that: deferring maintenance, cutting training, delaying purchases, buying cheaper materials. Each improves the reported variance now and damages the department later.\n\nOption A is what the organisation wants and the opposite of what this design rewards — long-term improvement usually costs money now and pays back after the reporting period.\n\nThe remedies are to assess over a longer period, use a **balanced** set of measures including non-financial and leading indicators, and separate the reward conversation from the performance discussion.\n\nThis is the same conclusion the whole area keeps reaching: **what gets measured gets managed**, so a measure chosen badly reliably produces the behaviour nobody wanted.",
    earns: [
      "Naming specific short-term actions rather than describing the effect abstractly",
      "Giving remedies that change the measurement design rather than exhorting better behaviour",
    ],
    loses: ["Choosing the behaviour the organisation wants rather than the one the incentive produces"],
  },
}
