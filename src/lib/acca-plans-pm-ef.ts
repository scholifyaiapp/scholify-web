/*
 * PM Areas E and F — performance measurement and control, and the employability and
 * technology skills the CBE actually tests.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area E is the other major source of Section C constructed responses, and it is
 * where a correct calculation earns least on its own: the marks are in what the
 * figure MEANS for the manager being measured and for the group. So its written plan
 * allocates the discussion marks first.
 *
 * Area F is unusual — it examines exam technique itself. Its plans are therefore
 * about how an answer is laid out and how the clock is managed, which are genuinely
 * examinable in a CBE where the marker sees only what was typed.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const PM_PLANS_EF: ExamPlanMap = {
  /* ── PM-29 · Financial performance and short-termism ────────── */

  "PM-29::the-measures": {
    title: "Decomposing a return measure to find the cause",
    format: "ot",
    marks: 2,
    requirement:
      "A division's ROCE has fallen while its operating margin is unchanged. The cause must be a fall in:\n\nA  Asset turnover\nB  Gross margin\nC  The tax rate\nD  Finance costs",
    plan: [
      {
        step: "Use the identity rather than reasoning about the business",
        detail:
          "ROCE = operating margin × asset turnover. If ROCE fell and margin is unchanged, asset turnover must have fallen. The identity supplies the answer without judgement.",
      },
      {
        step: "Say what a falling asset turnover means",
        detail:
          "Revenue ÷ capital employed has fallen: less revenue per pound of capital. Usually more capital employed without matching revenue — a new facility not yet productive, or assets revalued upward.",
      },
      {
        step: "Reject the below-the-line items",
        detail:
          "Finance costs and tax both fall BELOW operating profit, so neither affects ROCE. That is precisely why ROCE is defined before interest and tax.",
      },
      {
        step: "Reject the option that contradicts the stem",
        detail:
          "A falling gross margin would normally reduce the operating margin, which the stem says is unchanged. It contradicts a given fact rather than explaining one.",
      },
    ],
    answer:
      "**A — asset turnover.**\n\n**ROCE = operating margin × asset turnover.** If ROCE fell and margin is unchanged, the other factor must have fallen — the identity gives the answer without any judgement about the business.\n\nA falling asset turnover means **less revenue per pound of capital employed**, most often because capital employed rose without matching revenue: a new facility not yet productive, an acquisition not yet integrated, or assets revalued upward.\n\nFinance costs and tax sit **below** operating profit, so neither touches ROCE — which is exactly why ROCE is defined **before interest and tax**, so that it measures operating performance independently of how the business is financed.\n\nA falling gross margin would normally reduce the operating margin, contradicting a fact the stem gives.\n\nThis decomposition is the most useful single technique in Area E: it turns \"ROCE fell\" into a specific question about **which half moved**, and therefore into a specific management action.",
    earns: [
      "Using the identity to locate the cause, and knowing why ROCE excludes interest and tax",
      "Naming what a falling asset turnover usually indicates",
    ],
    loses: ["Choosing a below-the-line item, which cannot affect a pre-interest ratio"],
  },

  "PM-29::short-termism": {
    title: "How good figures get manufactured",
    format: "ot",
    marks: 2,
    requirement:
      "A divisional manager assessed annually on ROI defers a profitable investment near the year end. This is an example of:\n\nA  Goal congruence\nB  Short-termism, or dysfunctional behaviour driven by the measure\nC  Prudent capital rationing\nD  Effective cost control",
    plan: [
      {
        step: "Ask what the measure rewards",
        detail:
          "This year's ROI. A new investment raises capital employed immediately while its returns arrive later, so accepting it depresses ROI now — even where the project is worthwhile.",
      },
      {
        step: "Name the behaviour",
        detail:
          "Short-termism, or dysfunctional behaviour: the manager acts against the group's interest because the measure makes it personally rational.",
      },
      {
        step: "List the other forms it takes",
        detail:
          "Deferring maintenance, cutting training and research, delaying necessary purchases, pulling sales forward into the period, and delaying discretionary spending past the year end.",
      },
      {
        step: "Name the remedies a discussion answer needs",
        detail:
          "Assess over a longer period, use residual income instead of ROI, add non-financial and leading measures, use a balanced scorecard, and separate the pay decision from the performance discussion.",
      },
    ],
    answer:
      "**B — short-termism, or dysfunctional behaviour driven by the measure.**\n\nThe measure rewards **this year's ROI**. A new investment raises capital employed **immediately** while its returns arrive **later**, so accepting it depresses ROI now — which makes deferring a worthwhile project personally rational and collectively damaging.\n\nThat is the definition of **dysfunctional** behaviour: the manager acts against the group's interest because the measure makes it rational to.\n\nIt takes other forms worth naming: deferring **maintenance**, cutting **training** and **research**, delaying necessary **purchases**, pulling **sales** forward into the period, and pushing discretionary spending past the year end.\n\nThe remedies change the measurement design rather than exhorting better behaviour: assess over a **longer period**, use **residual income** instead of ROI — which accepts any project earning above the cost of capital — add **non-financial** and **leading** measures, use a **balanced scorecard**, and separate the **pay** decision from the performance discussion.\n\nThe principle behind all of it: **what gets measured gets managed**, including in ways nobody intended.",
    earns: [
      "Explaining why the measure makes the wrong decision rational",
      "Giving remedies that change the measurement design",
    ],
    loses: ["Reading the deferral as prudence rather than as a response to the measure"],
  },

  /* ── PM-30 · Non-financial measures and frameworks ─────────── */

  "PM-30::why-and-scorecard": {
    title: "The four perspectives of the balanced scorecard",
    format: "ot",
    marks: 2,
    requirement:
      "The four perspectives of the balanced scorecard are financial, customer, internal business process, and:\n\nA  Environmental\nB  Learning and growth (innovation)\nC  Competitor\nD  Shareholder",
    plan: [
      {
        step: "Recall the four perspectives and the question each asks",
        detail:
          "Financial: how do we look to shareholders? Customer: how do customers see us? Internal process: what must we excel at? Learning and growth: can we continue to improve and create value?",
      },
      {
        step: "Note why learning and growth completes the set",
        detail:
          "The other three describe present performance. Learning and growth is the only forward-looking perspective, and without it the scorecard would measure only what has already been achieved.",
      },
      {
        step: "Reject the plausible additions",
        detail:
          "Environmental and competitor perspectives are sometimes added in practice, but they are not among the original four. Shareholder duplicates the financial perspective.",
      },
      {
        step: "State what the scorecard is for",
        detail:
          "Balancing financial with non-financial, and lagging with leading indicators. Financial measures alone are backward-looking, so the scorecard adds the drivers of future financial performance.",
      },
    ],
    answer:
      "**B — learning and growth (innovation).**\n\nEach perspective asks a question: **financial** — how do we look to shareholders? **customer** — how do customers see us? **internal business process** — what must we excel at? **learning and growth** — can we continue to improve and create value?\n\nLearning and growth completes the set because it is the only **forward-looking** perspective. The other three describe present performance, so without it the scorecard would measure only what has already been achieved.\n\n**Environmental** and **competitor** perspectives are genuinely added in practice, which is what makes them plausible, but they are not among the original four. **Shareholder** duplicates the financial perspective.\n\nWhat the scorecard is **for**: balancing financial with **non-financial** measures, and **lagging** with **leading** indicators. Financial measures are lagging — by the time falling quality shows up as lost revenue the customers have gone — so the scorecard adds the **drivers** of future financial performance.\n\nIts difficulties are choosing a manageable number of measures, obtaining reliable non-financial data, and the risk of conflict between perspectives.",
    earns: [
      "Naming the question each perspective asks, and why learning and growth completes the set",
      "Framing the scorecard as balancing lagging with leading indicators",
    ],
    loses: ["Choosing a perspective added in practice rather than one of the original four"],
  },

  "PM-30::other-frameworks": {
    title: "The building block model and what it adds",
    format: "ot",
    marks: 2,
    requirement:
      "In Fitzgerald and Moon's building block model, the three blocks are dimensions, standards and:\n\nA  Rewards\nB  Costs\nC  Customers\nD  Processes",
    plan: [
      {
        step: "Name the three blocks and what each covers",
        detail:
          "DIMENSIONS: what to measure — competitiveness, financial performance, quality, flexibility, resource utilisation, innovation. STANDARDS: ownership, achievability, equity. REWARDS: clarity, motivation, controllability.",
      },
      {
        step: "Note what the model adds beyond the scorecard",
        detail:
          "It explicitly addresses the STANDARDS and REWARDS attached to the measures, not just which measures to use. So it deals with the behavioural side the scorecard leaves open.",
      },
      {
        step: "Note that it was designed for service businesses",
        detail:
          "Which is why its dimensions include flexibility and innovation, and why quality features so prominently — service output is intangible and cannot be inspected after the event.",
      },
      {
        step: "Recall the standards and rewards properties, since they are examinable",
        detail:
          "Standards must be OWNED by those measured, ACHIEVABLE, and EQUITABLE between units. Rewards must be CLEAR, MOTIVATING, and based on what the manager CONTROLS.",
      },
    ],
    answer:
      "**A — rewards.**\n\nThe three blocks are **dimensions**, **standards** and **rewards**, and what makes the model useful is that the last two are explicit.\n\n**Dimensions** — what to measure: competitiveness, financial performance, quality of service, flexibility, resource utilisation and innovation. The first two are **results**; the last four are **determinants** of those results, which is a leading-and-lagging distinction built into the model.\n\n**Standards** must be **owned** by those measured, **achievable**, and **equitable** between units. **Rewards** must be **clear**, **motivating**, and based on what the manager **controls**.\n\nThat is what it adds beyond the balanced scorecard: the scorecard says which measures to use, while the building block model also addresses the **standards** set against them and the **rewards** attached — the behavioural side the scorecard leaves open.\n\nIt was designed for **service** businesses, which is why flexibility and innovation appear and why quality is so prominent: service output is intangible and cannot be inspected after the event.\n\nThe **performance pyramid** is the third framework, linking corporate vision down through operational measures.",
    earns: [
      "Naming the results/determinants split within dimensions, and the properties of standards and rewards",
      "Explaining what the model adds beyond the balanced scorecard",
    ],
    loses: ["Naming a dimension in place of the third block"],
  },

  /* ── PM-31 · Divisional performance ────────────────────────── */

  "PM-31::responsibility-and-measures": {
    title: "ROI against residual income, and where they conflict",
    format: "written",
    marks: 20,
    requirement:
      "Division A has capital employed of $5m and made a controllable operating profit of $900,000. The group's cost of capital is 11%. Division A's manager is assessed on ROI and receives a bonus based on it.\n\nA project is available requiring $1m of additional capital and generating $140,000 of additional operating profit each year.\n\n(a) Calculate Division A's current ROI and residual income, and both measures if the project is accepted. (8 marks)\n(b) Explain whether the manager will accept the project, whether the decision is in the group's interest, and how the conflict arises. (8 marks)\n(c) Explain ONE limitation of residual income as a divisional performance measure. (4 marks)",
    plan: [
      {
        step: "Read the mark allocation: 8 calculation, 12 discussion",
        detail:
          "Twelve of the twenty marks are discussion. Four figures earn 8 marks; the conflict and the limitation earn 12. So the arithmetic must be done quickly and the writing must not be rushed.",
      },
      {
        step: "Test the project on its own terms before combining anything",
        detail:
          "$140,000 on $1m is 14%, against a cost of capital of 11%. So it creates value for the group — which settles the second half of part (b) before any combined figure is computed.",
      },
      {
        step: "Compute both measures before and after, from combined totals",
        detail:
          "Add profit to profit and capital to capital, then apply each formula. Never average the two ROI percentages — the ratio does not behave that way.",
      },
      {
        step: "Read the direction each measure moves and say why",
        detail:
          "ROI falls because 14% is below the division's existing 18%. Residual income rises because 14% exceeds the 11% cost of capital. The disagreement IS the answer to part (b).",
      },
      {
        step: "Write part (b) about the conflict, not the arithmetic",
        detail:
          "A manager on ROI rejects a project that benefits the group. Name it as dysfunctional decision-making, explain that a percentage measure is dragged down by anything below the current average, and say residual income removes the conflict.",
      },
      {
        step: "Give part (c) a real limitation, developed",
        detail:
          "Four marks for one limitation means it must be explained, not listed. Residual income is ABSOLUTE, so it favours large divisions and cannot compare divisions of different size — and it still depends on measuring capital employed and profit consistently.",
      },
    ],
    answer:
      "**(a) The calculations**\n\n**Current position**\nROI = $900,000 ÷ $5,000,000 = **18.0%**\nResidual income = $900,000 − (11% × $5,000,000) = $900,000 − $550,000 = **$350,000**\n\n**With the project**\nProfit = $900,000 + $140,000 = $1,040,000\nCapital = $5,000,000 + $1,000,000 = $6,000,000\nROI = $1,040,000 ÷ $6,000,000 = **17.3%**\nResidual income = $1,040,000 − (11% × $6,000,000) = $1,040,000 − $660,000 = **$380,000**\n\n**(b) Will the manager accept, and should they?**\n\n**The manager will reject it.** ROI falls from 18.0% to 17.3%, so accepting the project makes their measured performance — and their bonus — worse.\n\n**The decision is against the group's interest.** The project returns $140,000 on $1m, which is **14%** against a cost of capital of **11%**, so it creates value. Residual income confirms this, rising by **$30,000** — exactly $1m × (14% − 11%).\n\n**How the conflict arises.** ROI is a **percentage**, so it is dragged down by any project earning **below the division's existing average**, even where that return comfortably exceeds the cost of capital. The better a division already performs, the more good projects its manager is incentivised to reject — which is perverse, since the best divisions should be attracting investment.\n\nResidual income is an **absolute** measure and accepts any project earning above the cost of capital, so it aligns the manager's interest with the group's. This is **dysfunctional decision-making** caused by the measure, not by the manager.\n\n**(c) One limitation of residual income**\n\nBecause it is **absolute**, residual income **cannot be used to compare divisions of different size**. A large division will report a bigger residual income than a small one simply by being larger, even if the small division uses its capital far more efficiently — so a group ranking its divisions by residual income would systematically favour size over performance.\n\nThat matters practically because divisional managers are often compared with one another for promotion and for capital allocation. In consequence residual income is best used to assess a division **against its own prior periods and its own targets**, with ROI or a percentage measure used for cross-divisional comparison — which is why many groups report both rather than choosing between them.\n\nIt also shares ROI's dependence on how **capital employed** is measured: whether at cost or net book value, whether assets are revalued, and how shared assets are apportioned. Net book value makes both measures improve automatically as assets depreciate, which flatters a division with old assets and penalises one that has just invested.",
    earns: [
      "Testing the project's own return against the cost of capital before combining figures",
      "Recomputing ROI from combined totals rather than averaging percentages",
      "Naming the conflict as dysfunctional decision-making and explaining why a percentage measure causes it",
      "Developing one limitation in part (c) rather than listing several, since it carries 4 marks",
      "Noting that net book value flatters a division with old assets under both measures",
    ],
    loses: [
      "Averaging the two ROI percentages instead of recomputing from totals",
      "Stating that ROI falls without explaining that 14% still exceeds the cost of capital",
      "Answering part (b) with the numbers alone and never naming the conflict, where most of its marks sit",
      "Listing four limitations briefly in part (c) when the marks are for developing one",
    ],
  },

  "PM-31::problems": {
    title: "The problem both divisional measures share",
    format: "ot",
    marks: 2,
    requirement:
      "Both ROI and residual income are distorted where a division's assets are measured at net book value, because as assets depreciate:\n\nA  Profit falls, so both measures fall\nB  Capital employed falls, so both measures improve automatically without any change in performance\nC  Capital employed rises\nD  Neither measure is affected",
    plan: [
      {
        step: "Trace what depreciation does to the denominator",
        detail:
          "Net book value falls each year. ROI's denominator falls and residual income's imputed interest charge falls, so both improve without any change in operating performance.",
      },
      {
        step: "Name the perverse consequence",
        detail:
          "A division with old, heavily depreciated assets reports better figures than one that has just invested — so the measures reward NOT investing, which compounds the short-termism problem.",
      },
      {
        step: "Name the alternatives and their own drawbacks",
        detail:
          "Gross cost avoids the automatic improvement but ignores the age of the assets. Replacement cost is more economically meaningful but harder to obtain and to audit.",
      },
      {
        step: "Recall the other shared problems",
        detail:
          "Apportioning shared assets and central costs, whether to include only CONTROLLABLE profit and capital, transfer prices distorting divisional results, and both being annual measures encouraging short-termism.",
      },
    ],
    answer:
      "**B — capital employed falls, so both measures improve automatically without any change in performance.**\n\nNet book value falls each year, so ROI's **denominator** falls and residual income's **imputed interest charge** falls. Both measures improve while nothing about the division's operating performance has changed.\n\nThe perverse consequence is what matters: a division with **old, heavily depreciated assets** reports better figures than one that has just invested — so the measures **reward not investing**, compounding the short-termism problem rather than offsetting it.\n\nThe alternatives have their own drawbacks. **Gross cost** avoids the automatic improvement but ignores the age and condition of the assets. **Replacement cost** is more economically meaningful but harder to obtain and to audit consistently across divisions.\n\nThe other problems both measures share: **apportioning** shared assets and central costs, whether to include only **controllable** profit and capital, **transfer prices** distorting divisional results, and both being **annual** measures that encourage short-termism.\n\nSo neither measure works well without a definition of capital employed applied consistently and a longer assessment horizon.",
    earns: [
      "Tracing the effect through the denominator and naming the perverse incentive",
      "Knowing the alternatives and why each is imperfect",
    ],
    loses: ["Assuming depreciation affects profit rather than the capital base"],
  },

  /* ── PM-32 · Transfer pricing ──────────────────────────────── */

  "PM-32::objectives-and-range": {
    title: "The range a transfer price must fall within",
    format: "ot",
    marks: 2,
    requirement:
      "A selling division has spare capacity and a variable cost of $30 per unit. The buying division can purchase externally at $45. A transfer price acceptable to both divisions lies between:\n\nA  $30 and $45\nB  $45 and above\nC  Below $30\nD  Exactly $45",
    plan: [
      {
        step: "Find the seller's minimum",
        detail:
          "Marginal cost plus any opportunity cost. With SPARE capacity there is no opportunity cost, so the minimum is the variable cost of $30 — below that the seller loses money.",
      },
      {
        step: "Find the buyer's maximum",
        detail:
          "The lower of the external purchase price and the net marginal revenue from the finished product. Here the external price is $45, so the buyer will not pay more than that.",
      },
      {
        step: "State the range and note it exists",
        detail:
          "$30 to $45. Any price in that range leaves both divisions better off than not transferring, so a transfer is in the group's interest and a negotiated price can be found.",
      },
      {
        step: "Note what happens where there is NO spare capacity",
        detail:
          "The seller's minimum becomes variable cost PLUS the contribution forgone on the external sale it must give up. That can exceed the buyer's maximum, in which case no transfer should occur.",
      },
    ],
    answer:
      "**A — $30 and $45.**\n\nThe **seller's minimum** is marginal cost plus any **opportunity cost**. With **spare capacity** there is no opportunity cost, so the minimum is the variable cost of **$30**.\n\nThe **buyer's maximum** is the lower of the external purchase price and the net marginal revenue from the finished product — here **$45**, since the buyer will not pay more internally than it can buy for outside.\n\nSo the range is **$30 to $45**, and the fact that a range **exists** is the important conclusion: any price within it leaves both divisions better off than not transferring, so the transfer is in the group's interest and a negotiated price can be found.\n\nWhere there is **no spare capacity** the analysis changes materially: the seller's minimum becomes variable cost **plus the contribution forgone** on the external sale it must give up. That can **exceed** the buyer's maximum, in which case **no range exists** and no transfer should take place — the group is better off with the selling division serving the external market.\n\nSo the first question in any transfer pricing problem is whether spare capacity exists.",
    earns: [
      "Deriving the seller's minimum as marginal cost plus opportunity cost, and checking capacity first",
      "Recognising that no range means no transfer should occur",
    ],
    loses: ["Ignoring capacity, which determines whether an opportunity cost exists at all"],
  },

  "PM-32::bases-and-international": {
    title: "Choosing a transfer pricing basis",
    format: "ot",
    marks: 2,
    requirement:
      "A transfer price set at the selling division's **full cost** is unsatisfactory principally because it:\n\nA  Is difficult to calculate\nB  Gives the selling division no profit, and passes on inefficiency because the buying division bears the seller's absorbed costs\nC  Is always too high\nD  Cannot be used internationally",
    plan: [
      {
        step: "Identify the two defects",
        detail:
          "The seller earns NO profit, so it has no incentive to transfer or to improve. And the buyer bears the seller's ABSORBED cost, so the seller's inefficiency is passed on rather than exposed.",
      },
      {
        step: "See why that breaks divisional autonomy",
        detail:
          "A division measured on profit that is required to transfer at cost is being measured on something it cannot influence — which is the same controllability failure that runs through Area E.",
      },
      {
        step: "Name the alternatives and their trade-offs",
        detail:
          "Market price: objective and good for decisions, but needs an external market. Cost plus: gives the seller a margin but still passes on inefficiency. Marginal cost: best for group decisions, worst for divisional motivation. Negotiated: preserves autonomy but consumes time and may not reach the group optimum.",
      },
      {
        step: "Note the international dimension",
        detail:
          "Transfer prices move profit between tax jurisdictions, so authorities require an ARM'S LENGTH price. Setting them to minimise tax invites challenge and penalties — and can conflict with the price that motivates managers best.",
      },
    ],
    answer:
      "**B — gives the selling division no profit, and passes on inefficiency because the buying division bears the seller's absorbed costs.**\n\nTwo defects, and both matter. The seller earns **no profit**, so it has no incentive to transfer or to improve. And the buyer bears the seller's **absorbed** cost, so the seller's inefficiency is **passed on** rather than exposed — a rise in the seller's costs simply becomes the buyer's problem.\n\nThat breaks **divisional autonomy**: a division measured on profit but required to transfer at cost is being measured on something it cannot influence, which is the same controllability failure that runs through the whole of Area E.\n\nThe alternatives trade off differently. **Market price**: objective and good for decisions, but requires an external market to exist. **Cost plus**: gives the seller a margin but still passes on inefficiency. **Marginal cost**: best for group decision-making, worst for divisional motivation. **Negotiated**: preserves autonomy but consumes management time and may not reach the group optimum.\n\nThe **international** dimension is examined in its own right: transfer prices move profit between **tax jurisdictions**, so authorities require an **arm's length** price. Setting prices to minimise tax invites challenge and penalties, and the tax-efficient price often conflicts with the one that motivates managers best — which is a genuine and unresolvable tension.",
    earns: [
      "Naming both defects, and connecting them to controllability and autonomy",
      "Raising the arm's length requirement and the tension with divisional motivation",
    ],
    loses: ["Treating the problem as computational rather than behavioural"],
  },

  /* ── PM-33 · Not-for-profit and external considerations ─────── */

  "PM-33::why-harder": {
    title: "Why performance measurement is harder without profit",
    format: "ot",
    marks: 2,
    requirement:
      "Measuring performance in a not-for-profit organisation is more difficult principally because:\n\nA  Such organisations keep no accounting records\nB  Objectives are often multiple, non-financial and hard to quantify, so no single measure summarises success\nC  They have no costs\nD  They are not permitted to set targets",
    plan: [
      {
        step: "Identify what a commercial organisation has that these lack",
        detail:
          "Profit — one quantified figure summarising whether the objective was achieved. Its absence is the whole of the difficulty.",
      },
      {
        step: "Describe the substitute objectives",
        detail:
          "Relieving hardship, improving health outcomes, raising educational attainment. Real, often multiple, sometimes conflicting, and none reducible to a single number.",
      },
      {
        step: "Name the framework used instead",
        detail:
          "Value for money, assessed through the three Es — economy, efficiency, effectiveness. Economy and efficiency measure reasonably well; EFFECTIVENESS is where the difficulty concentrates.",
      },
      {
        step: "Say why effectiveness is the hard one",
        detail:
          "The outcome is qualitative and often only observable years later. So proxies are used, and a proxy can be hit while the real objective is missed.",
      },
    ],
    answer:
      "**B — objectives are often multiple, non-financial and hard to quantify, so no single measure summarises success.**\n\nA commercial organisation has **profit**: one quantified figure summarising whether the objective was achieved. Its absence is the entire difficulty.\n\nThe substitute objectives — relieving hardship, improving health outcomes, raising educational attainment — are real, often **multiple**, sometimes **conflicting**, and none reduces to a single number.\n\nThe framework used instead is **value for money**, assessed through the three Es: **economy** (obtaining inputs at low cost), **efficiency** (output from given input) and **effectiveness** (achieving the intended outcome).\n\nEconomy and efficiency measure reasonably well. **Effectiveness** is where the difficulty concentrates, because the outcome is **qualitative** and often only observable years later. So **proxies** are used — waiting times, exam results, response times — and the danger is that a proxy can be **hit while the real objective is missed**, which is the classic failure in public sector measurement.\n\nThe other three options are factually wrong: such organisations keep records, have costs — often under tighter scrutiny, because the money was donated or raised by taxation — and set targets extensively.",
    earns: [
      "Identifying the absence of a single summary measure, and naming the three Es",
      "Explaining why effectiveness is the hard E and how proxies fail",
    ],
    loses: ["Choosing an option that is factually untrue of not-for-profit organisations"],
  },

  "PM-33::targets-and-external": {
    title: "How a target changes behaviour",
    format: "ot",
    marks: 2,
    requirement:
      "A hospital is measured on the percentage of patients seen within four hours. Staff begin prioritising patients approaching the four-hour mark over more urgent cases. This is an example of:\n\nA  Effective performance management\nB  Goal displacement, where the measure replaces the objective it was meant to represent\nC  Improved efficiency\nD  Economy",
    plan: [
      {
        step: "Identify what the measure rewards",
        detail:
          "Meeting the four-hour threshold. It says nothing about clinical urgency, so the fastest route to a good score is to treat whoever is closest to breaching it.",
      },
      {
        step: "Name the behaviour",
        detail:
          "Goal displacement: the MEASURE has replaced the OBJECTIVE. The objective was treating patients well; the measure became the thing being managed.",
      },
      {
        step: "Note why a single target invites this",
        detail:
          "One measure is always gameable. The distortion is invisible in the reported figure — the target is met, and the harm appears only in outcomes the measure does not capture.",
      },
      {
        step: "Name the remedies",
        detail:
          "A BALANCED set including clinical outcomes and patient satisfaction, measures that are hard to game, and professional judgement retained alongside the target rather than overridden by it.",
      },
    ],
    answer:
      "**B — goal displacement, where the measure replaces the objective it was meant to represent.**\n\nThe measure rewards meeting the **four-hour threshold** and says nothing about **clinical urgency**, so the fastest route to a good score is treating whoever is closest to breaching it. Staff are responding rationally to what they are measured on.\n\nThe objective was treating patients well; the **measure became the thing being managed**. That is goal displacement.\n\nA **single** target always invites this, and what makes it dangerous is that the distortion is **invisible in the reported figure** — the target is met, the report looks good, and the harm appears only in outcomes the measure does not capture.\n\nThe remedies are a **balanced set** including clinical outcomes and patient satisfaction, measures that are **hard to game**, and **professional judgement** retained alongside the target rather than overridden by it.\n\nThe **external** considerations complete the area: stakeholder expectations, market conditions, regulation, and political change — all of which affect measured performance while lying outside management's control, which is why performance should be assessed against **controllable** factors and the rest reported separately.",
    earns: [
      "Naming goal displacement and explaining that the distortion is invisible in the figure",
      "Giving remedies centred on a balanced set rather than on exhorting staff",
    ],
    loses: ["Reading the behaviour as efficiency, when it is the measure being gamed"],
  },

  /* ── PM-34 · Employability and technology skills ───────────── */

  "PM-34::laying-out-the-answer": {
    title: "Laying out an answer a marker can mark",
    format: "ot",
    marks: 2,
    requirement:
      "In a PM constructed response question, the most effective way to present a calculation is to:\n\nA  Show only the final answer, so the marker is not distracted\nB  Show clearly labelled workings, so method marks are available even if a figure is wrong\nC  Show every possible calculation in case one is relevant\nD  Describe the calculation in words without figures",
    plan: [
      {
        step: "Understand how a constructed response is marked",
        detail:
          "Marks are awarded for METHOD as well as for the answer. A wrong final figure with correct visible workings still earns most of the marks; a wrong figure with no workings earns none.",
      },
      {
        step: "Draw the practical consequence",
        detail:
          "Label every working and reference it from the answer. The marker must be able to see what you did — an unlabelled column of numbers cannot be credited even if it is right.",
      },
      {
        step: "Reject the two extremes",
        detail:
          "Showing only the answer forfeits method marks. Showing every possible calculation wastes time and buries the relevant work, and no marks are given for irrelevant computation.",
      },
      {
        step: "Note what the CBE spreadsheet requires",
        detail:
          "Use FORMULAE rather than typed values, so a corrected input flows through. And keep inputs separate from calculations, so an assumption can be changed without rebuilding the model.",
      },
    ],
    answer:
      "**B — show clearly labelled workings, so method marks are available even if a figure is wrong.**\n\nConstructed responses are marked for **method** as well as answer. A wrong final figure with correct **visible** workings still earns most of the marks; the same wrong figure with no workings earns **none** — which makes presentation worth real marks rather than being a courtesy.\n\nSo label every working and reference it from the answer. The marker must be able to see what you did, and an unlabelled column of numbers cannot be credited even where it is correct.\n\nBoth extremes lose marks. Showing **only the answer** forfeits the method marks. Showing **every possible calculation** wastes time and buries the relevant work, and no marks are awarded for irrelevant computation.\n\nIn the CBE spreadsheet specifically: use **formulae** rather than typed values, so that correcting one input flows through the whole model instead of requiring every dependent figure to be retyped. And keep **inputs separate from calculations**, so an assumption can be changed without rebuilding anything.",
    earns: [
      "Knowing method marks exist and that they require visible, labelled workings",
      "Using formulae rather than typed values in the spreadsheet",
    ],
    loses: ["Presenting only final answers, which forfeits the method marks entirely"],
  },

  "PM-34::models-and-time": {
    title: "Managing the clock across a three-hour paper",
    format: "ot",
    marks: 2,
    requirement:
      "PM is a three-hour exam worth 100 marks. The most sensible approach to time is to:\n\nA  Spend as long as needed on Section A, then whatever remains on Section C\nB  Allocate roughly 1.8 minutes per mark, and move on when a question's time is used\nC  Answer Section C first and Section A only if time permits\nD  Divide the time equally between all questions regardless of marks",
    plan: [
      {
        step: "Derive the rate from the paper's own figures",
        detail:
          "180 minutes ÷ 100 marks = 1.8 minutes per mark. So a 20-mark question deserves about 36 minutes and a 2-mark objective test about 3.6.",
      },
      {
        step: "State why moving on matters more than finishing",
        detail:
          "Marks are hardest to earn at the end of a question and easiest at the start of the next. Overrunning on one question to gain a mark forfeits several on another that is never attempted.",
      },
      {
        step: "Reject overrunning Section A",
        detail:
          "Objective tests are all or nothing, so extra time on a hard one earns at most 2 marks — while the 20-mark question it costs could have earned several from its opening requirements alone.",
      },
      {
        step: "Reject equal division",
        detail:
          "Dividing time equally regardless of marks gives a 2-mark question the same time as a 20-mark one, which is the same error in the opposite direction.",
      },
    ],
    answer:
      "**B — allocate roughly 1.8 minutes per mark, and move on when a question's time is used.**\n\nDerive the rate from the paper: 180 minutes ÷ 100 marks = **1.8 minutes per mark**. So a 20-mark question deserves about **36 minutes** and a 2-mark objective test about **3.6**.\n\nWhy **moving on** matters more than finishing: marks are hardest to earn at the **end** of a question and easiest at the **start of the next**. Overrunning to secure one more mark forfeits several on a question that is then never attempted at all.\n\nThat is especially true of **Section A**, where objective tests are all or nothing — extra time on a hard one earns at most 2 marks, while the 36-minute question it steals from could have earned several from its opening requirements alone.\n\nOption D makes the same error in reverse, giving a 2-mark question the same time as a 20-mark one.\n\nThe practical corollary: **attempt every requirement**, even briefly. An unattempted 8-mark discussion scores zero, and four sentences on it will not.",
    earns: [
      "Deriving the rate from the paper's own figures and applying it per question",
      "Knowing that attempting every requirement beats perfecting any one of them",
    ],
    loses: ["Overrunning on Section A, where the marginal mark is worth least"],
  },
}
