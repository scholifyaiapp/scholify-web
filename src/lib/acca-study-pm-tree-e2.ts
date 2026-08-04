import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area E, second part — chapters 31–32. Divisional performance measurement
 * (ROI and residual income) and transfer pricing. Syllabus E3.
 *
 * These two chapters are the numerical heart of Area E and they share one idea: a
 * divisional performance measure changes divisional behaviour, and the wrong measure makes
 * a rational manager act against the group's interest. Chapter 31 shows a manager reject a
 * good project because it dilutes ROI; chapter 32 shows a manager reject a good internal
 * transfer because the price is set above the receiving division's ceiling. Both are the
 * same failure — a local measure not aligned with group profit — which is why they sit
 * together and why goal congruence is the phrase that answers both.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 31 · E3(a)–(c) ───────────────────────────────────── */

export const PM_TREE_31: StudyChapter = {
  id: "PM-31",
  number: 31,
  paper: "PM",
  area: "E",
  title: "Divisional performance: ROI and residual income",
  minutes: 18,
  syllabusRefs: ["E3(a)", "E3(b)", "E3(c)"],
  intro:
    "Return on investment is the most widely used divisional measure and it has a defect that matters: it makes a good manager reject a good project. Residual income fixes that particular defect and introduces others.",
  outcomes: [
    "Distinguish cost, profit and investment centres and the measures appropriate to each",
    "Calculate and interpret return on investment and residual income",
    "Demonstrate how ROI causes dysfunctional investment decisions and how RI corrects them",
    "Explain the effects of asset age, depreciation policy and controllability on both measures",
    "Recommend a divisional measurement approach and justify it",
  ],
  sections: [
    {
      id: "responsibility-and-measures",
      heading: "Responsibility centres, and the two measures",
      blocks: [
        {
          kind: "table",
          caption: "Match the measure to what the manager controls",
          head: ["Centre", "Manager controls", "Appropriate measures"],
          rows: [
            ["**Cost centre**", "Costs only", "Variances against a flexed budget, cost per unit of output"],
            ["**Profit centre**", "Costs and revenues", "Controllable profit, contribution, margin"],
            ["**Investment centre**", "Costs, revenues **and investment** in assets", "ROI and residual income — the only measures that reflect the capital used"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The controllability principle, applied properly",
          md: "A manager should be assessed only on what they can influence. In practice this means **head office costs apportioned to a division should be excluded** from the manager's own measure, and so should **interest** and **tax** where the division cannot affect them. It is common and correct to prepare **two figures**: **controllable profit** for appraising the manager, and **divisional profit after apportioned costs** for appraising the division as an economic unit — because a division can be worth closing while its manager is doing an excellent job with it. Being able to make that distinction is a reliable source of marks.",
        },
        {
          kind: "formula",
          name: "ROI and residual income",
          expr: "ROI  (return on investment, = ROCE at divisional level)\n     =  Controllable divisional profit  /  Controllable capital employed  ×  100%\n\nRESIDUAL INCOME\n     =  Controllable divisional profit  −  (Controllable capital employed × imputed interest rate)\n\n   where the imputed interest rate is normally the group's cost of capital",
          note: "ROI is a PERCENTAGE, and that is the whole source of its problem: a percentage can be diluted by an acceptable project. RI is an ABSOLUTE amount, so any project earning more than the cost of capital increases it. Use the SAME profit and capital figures in both, and state whether capital employed is opening, closing or average — all three are defensible and the answer changes.",
        },
        {
          kind: "example",
          title: "The ROI dysfunction, and how residual income removes it",
          scenario:
            "Norton Division currently earns controllable profit of £2,400,000 on controllable capital employed of £10,000,000. The group's cost of capital is 12%. The divisional manager is offered a project requiring £2,000,000 of additional assets and generating £340,000 of additional annual controllable profit. The manager's bonus depends on divisional ROI.",
          steps: [
            { label: "Current position", detail: "ROI = £2,400,000/£10,000,000 = 24.0%. RI = £2,400,000 − (12% × £10,000,000) = £2,400,000 − £1,200,000 = £1,200,000." },
            { label: "Is the project acceptable to the GROUP?", detail: "The project returns £340,000 on £2,000,000, which is 17.0% — comfortably above the 12% cost of capital. It creates value and the group should want it." },
            { label: "What happens to ROI if it is accepted", detail: "New ROI = (£2,400,000 + £340,000)/(£10,000,000 + £2,000,000) = £2,740,000/£12,000,000 = 22.83%. ROI FALLS from 24.0% to 22.83%, because the project's 17% is above the cost of capital but below the division's existing 24% average." },
            { label: "So the manager rejects it", detail: "Judged on ROI, the rational choice is to reject a project earning 17% against a 12% cost of capital. This is the **dysfunctional decision**: the manager acts correctly given the measure, and the group loses value. Note the direction reverses for a poorly performing division — one earning 8% would happily accept a project returning 10%, which DESTROYS value." },
            { label: "What happens to residual income", detail: "New RI = £2,740,000 − (12% × £12,000,000) = £2,740,000 − £1,440,000 = £1,300,000, an increase of £100,000. And £100,000 is exactly the project's surplus over the cost of capital: £340,000 − (12% × £2,000,000) = £340,000 − £240,000 = £100,000." },
            { label: "State the general rule", detail: "Residual income rises for ANY project whose return exceeds the cost of capital and falls for any project below it — so it is **goal congruent** with the group's own investment rule. ROI is congruent only by accident, when the project's return happens to sit above the division's existing average." },
          ],
          result:
            "**A project returning 17% against a 12% cost of capital: ROI falls from 24.0% to 22.83%, so the manager rejects it; RI rises by £100,000, so the manager accepts it.** RI's £100,000 increase is precisely the project's surplus over the cost of capital, which is why it aligns with group interest.",
        },
      ],
      check: {
        q: "A division earning 24% ROI is offered a project returning 17%, against a group cost of capital of 12%. What happens under each measure?",
        options: [
          "Both measures accept it",
          "ROI falls so the manager rejects it, while RI rises so the manager accepts it — RI is goal congruent",
          "Both measures reject it",
          "ROI rises and RI falls",
        ],
        correct: 1,
        explain:
          "ROI FALLS, because 17% is below the division's existing 24% average, so the manager rejects a value-creating project. RI RISES by the project's surplus over the cost of capital, so the manager accepts it. That is the central argument for residual income.",
      },
    },
    {
      id: "problems",
      heading: "The problems both measures share",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "Asset age flatters both measures, and it is the trap most often set",
          md: "Assets are usually carried at **net book value**, which falls every year. So a division with **old, heavily depreciated** assets shows a **smaller** capital employed and therefore a **higher ROI and higher RI** than an identical division that has just re-equipped — even though the re-equipped division is the better business. Two consequences follow, and both are examinable. First, **comparing divisions of different asset ages is invalid**, and average asset age or gross book value should be disclosed alongside. Second, it gives a manager an active **incentive not to reinvest**, because every replacement raises capital employed and depresses the measure — which connects straight back to the short-termism of chapter 29. Using **gross book value** or **replacement cost** removes the effect but introduces valuation difficulty and a measure that no longer reconciles to the financial statements.",
        },
        {
          kind: "table",
          caption: "ROI against residual income",
          head: ["", "ROI", "Residual income"],
          rows: [
            ["**Form**", "A percentage", "An absolute amount of currency"],
            ["**Goal congruence**", "**Poor** — dilutes on good projects in strong divisions, and flatters weak ones", "**Good** — increases for any project above the cost of capital"],
            ["**Comparing divisions of different sizes**", "**Easy**, since a percentage is size-neutral", "**Hard**, since a large division will show a larger RI regardless of quality"],
            ["**Intuitive appeal**", "**High** — comparable to ROCE and to external return measures", "**Lower** — managers find an imputed interest charge artificial"],
            ["**Cost of capital**", "Not needed to compute it", "**Required**, and choosing a risk-adjusted rate per division is contentious"],
            ["**Short-term bias**", "Present, and worsened by the asset age effect", "Present, though less severe on the investment decision itself"],
          ],
        },
        {
          kind: "list",
          title: "Problems that afflict both",
          items: [
            "**Short-termism.** Both are annual measures computed from accounting profit, so both reward deferring maintenance, R&D and replacement (chapter 29).",
            "**Accounting profit is not cash.** Depreciation policy, provisions, inventory valuation and revenue cut-off all move the figure without anything real changing.",
            "**Definition sensitivity.** Opening, closing or average capital employed; whether to include or exclude cash, goodwill and intra-group balances. State your basis, because the conclusion can flip.",
            "**Transfer prices distort both.** A profit measure of a division that trades internally partly measures the transfer price rather than the division (chapter 32).",
            "**Neither captures anything non-financial.** Quality, customer retention, staff turnover and innovation are all invisible, which is exactly the gap the balanced scorecard fills (chapter 30).",
            "**Apportioned head office cost.** If included, the measure judges the manager on costs they cannot influence, breaching controllability.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The recommendation to write",
          md: "Recommend **residual income for the investment decision**, because it is goal congruent, together with **ROI for comparing divisions of different sizes**, since a percentage is size-neutral. Then add the three qualifications that show real understanding: disclose **asset age or gross book value** so the age effect is visible; report **controllable profit separately** from divisional profit after apportionment; and add **non-financial measures** so short-termism has somewhere to show up. And note that the deeper answer to a short horizon is not a different ratio at all but a **longer appraisal period** — a manager judged on a three-year rolling result has far less reason to game a single year.",
        },
      ],
      check: {
        q: "Why does a division with old, heavily depreciated assets show a higher ROI than an identical newly re-equipped division?",
        options: [
          "Because its profits are genuinely higher",
          "Because net book value falls with depreciation, so capital employed is smaller — which also discourages reinvestment",
          "Because depreciation is added back to profit",
          "Because ROI ignores non-current assets",
        ],
        correct: 1,
        explain:
          "Net book value falls each year, so capital employed is SMALLER and the same profit produces a higher percentage. This makes comparison between divisions of different asset ages invalid and gives managers an incentive not to reinvest, since replacement raises capital employed and depresses the measure.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Concluding a project is acceptable because ROI rises.",
      fix: "Compare the project's own return with the cost of capital. ROI can fall on a value-creating project.",
    },
    {
      trap: "Charging apportioned head office cost against the manager's measure.",
      fix: "Use controllable profit for the manager and divisional profit for the division, and present both.",
    },
    {
      trap: "Comparing ROI between divisions without mentioning asset age.",
      fix: "Old assets carry a lower net book value and flatter the measure; disclose age or gross book value.",
    },
    {
      trap: "Not stating whether capital employed is opening, closing or average.",
      fix: "State the basis. Different bases give different answers and marks follow the reasoning.",
    },
    {
      trap: "Recommending residual income for comparing divisions of very different sizes.",
      fix: "RI is absolute so it favours large divisions; use ROI for size-neutral comparison.",
    },
  ],
  keyTerms: [
    { term: "Investment centre", def: "A division whose manager controls investment in assets as well as costs and revenues." },
    { term: "Return on investment", def: "Controllable divisional profit as a percentage of controllable capital employed." },
    { term: "Residual income", def: "Controllable divisional profit less an imputed interest charge on controllable capital employed." },
    { term: "Imputed interest charge", def: "Capital employed multiplied by the cost of capital, deducted in computing residual income." },
    { term: "Goal congruence", def: "The property of a measure under which a manager acting in their own interest also acts in the group's." },
    { term: "Controllable profit", def: "Divisional profit before costs the manager cannot influence, used to appraise the manager rather than the division." },
  ],
  summary: [
    "Match the measure to the centre: ROI and RI belong to investment centres only.",
    "ROI is a percentage and can be diluted by a project that creates value, so the manager rejects it.",
    "RI is absolute and rises by exactly the project's surplus over the cost of capital, making it goal congruent.",
    "Old, depreciated assets flatter both measures and give managers a reason not to reinvest.",
    "Recommend RI for investment decisions, ROI for size-neutral comparison, plus asset age disclosure and non-financial measures.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can ROI cause a manager to reject a good project?", a: "Because a project returning less than the division's existing average ROI dilutes the percentage, even when its return exceeds the cost of capital." },
    { q: "By how much does residual income change when a project is accepted?", a: "By the project's profit less the cost of capital on its investment — its surplus over the required return." },
    { q: "Why is comparing two divisions' ROI often invalid?", a: "Because assets are held at net book value, so a division with older, more depreciated assets shows a smaller capital employed and a higher return." },
    { q: "Which profit figure appraises the manager rather than the division?", a: "Controllable profit, which excludes apportioned head office costs, interest and tax the manager cannot influence." },
    { q: "What is the main weakness of residual income?", a: "It is absolute, so it cannot fairly compare divisions of different sizes, and it requires a cost of capital that managers may dispute." },
  ],
}

/* ── Chapter 32 · E3(d)–(f) ───────────────────────────────────── */

export const PM_TREE_32: StudyChapter = {
  id: "PM-32",
  number: 32,
  paper: "PM",
  area: "E",
  title: "Transfer pricing",
  minutes: 19,
  syllabusRefs: ["E3(d)", "E3(e)", "E3(f)"],
  intro:
    "A transfer price is revenue to one division and cost to another, so it cancels out for the group and matters enormously to both managers. Get it wrong and a transfer that benefits the group does not happen.",
  outcomes: [
    "Explain the objectives a transfer price must satisfy and why they conflict",
    "Determine the range within which a transfer price must fall",
    "Calculate transfer prices on market, cost and opportunity cost bases",
    "Handle transfers where the selling division has spare capacity and where it does not",
    "Discuss dual pricing, negotiation, and the effects of tax and exchange controls internationally",
  ],
  sections: [
    {
      id: "objectives-and-range",
      heading: "What a transfer price must achieve, and the range it must fall in",
      blocks: [
        {
          kind: "list",
          title: "The four objectives — which cannot all be met at once",
          items: [
            "**Goal congruence.** Each division acting in its own interest should reach the decision that is best for the group.",
            "**Fair performance measurement.** Each division's reported profit should reflect its own performance, not the price it was told to charge.",
            "**Divisional autonomy.** Managers should be free to decide, since removing that freedom removes the point of divisionalisation — and with it the motivation.",
            "**Practicality.** The rule must be cheap to operate, understood by both managers, and acceptable to tax authorities.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The conflict at the centre of the topic",
          md: "**Autonomy and goal congruence pull against each other.** Give the managers complete freedom and one may refuse a transfer the group needs. Impose a price from head office and you guarantee the right decision while destroying the autonomy and motivation that justified creating divisions in the first place — and you also make each division's profit partly a head office artefact, so performance measurement is compromised too. Every transfer pricing answer is a **trade-off between these objectives**, and saying which you are prioritising and why is the mark. There is no price that satisfies all four.",
        },
        {
          kind: "formula",
          name: "The range within which a transfer price must fall",
          expr: "MINIMUM  (the selling division's floor)\n     =  Marginal cost of the transfer  +  Opportunity cost of the transfer\n\n     where opportunity cost  =  nil if there is SPARE CAPACITY\n                             =  lost contribution from the external sale forgone,\n                                if the division is at FULL CAPACITY\n\nMAXIMUM  (the buying division's ceiling)\n     =  the LOWER of:\n          the external purchase price available to it, and\n          the net revenue it can earn from the final product less its own further costs\n\nIf minimum > maximum, NO transfer price works — and that means the transfer should NOT happen.",
          note: "This is the single most useful thing in the chapter. Compute the floor and the ceiling first, before considering any policy, because the range tells you whether a transfer is worthwhile at all and any question can be answered from it. Note the floor uses MARGINAL cost, not total cost: fixed costs are incurred whether the transfer happens or not.",
        },
        {
          kind: "example",
          title: "Spare capacity, full capacity, and a price that cannot exist",
          scenario:
            "Bramley Division makes a component with a variable cost of £34 per unit and fixed costs of £600,000 a year at a normal capacity of 60,000 units. It sells externally at £70 per unit. Cleeve Division can buy an equivalent component externally for £64, and needs 8,000 units. Consider three situations: (i) Bramley is producing 45,000 units and has spare capacity; (ii) Bramley is selling its full 60,000 units externally; (iii) as (ii), but Cleeve's external supplier withdraws and its finished product yields net revenue of £96 per unit after £30 of Cleeve's own further processing costs.",
          steps: [
            { label: "Situation (i): compute the range", detail: "Bramley's floor = marginal cost £34 + opportunity cost nil (spare capacity) = £34. Cleeve's ceiling = the external price of £64. So any price from £34 to £64 works, and a transfer SHOULD happen." },
            { label: "Situation (i): confirm the group benefits", detail: "The group's cost of making internally is £34 of variable cost against £64 paid externally, so it saves £30 per unit — £240,000 on 8,000 units — regardless of where in the range the price is set. The price only decides how that £240,000 is SPLIT between the two divisions, which is why managers argue about it and why the group's total is unaffected." },
            { label: "Situation (ii): recompute the floor", detail: "At full capacity, transferring 8,000 units means giving up 8,000 external sales. Opportunity cost per unit = £70 − £34 = £36 of lost contribution. Floor = £34 + £36 = £70 — which is simply the market price, as it must be when the division is capacity-constrained." },
            { label: "Situation (ii): compare with the ceiling", detail: "Floor £70 exceeds Cleeve's ceiling of £64, so NO transfer price exists. And that is the correct answer, not a problem to be solved: the group is better off with Bramley selling externally at £70 and Cleeve buying at £64. Forcing an internal transfer would cost the group £6 per unit — £48,000 on 8,000 units." },
            { label: "Situation (iii): the ceiling changes", detail: "With no external supplier, Cleeve's ceiling becomes the net revenue less its own further costs: £96 − £30 = £66. Bramley's floor is still £70. Floor £70 still exceeds ceiling £66, so the transfer STILL should not happen — and more than that, Cleeve should not make the product at all, because the group's best use of the component is the £70 external sale." },
            { label: "Draw the general conclusion", detail: "With spare capacity the floor is marginal cost and a transfer is nearly always worthwhile. At full capacity the floor rises to the market price, and an internal transfer is worthwhile only if the buying division adds more value than the external customer pays for. Market price at full capacity is therefore the goal-congruent price — which is why it is the recommended basis whenever a competitive external market exists." },
          ],
          result:
            "**(i) Range £34–£64, transfer worth £240,000 to the group. (ii) Floor £70 above ceiling £64, so no transfer — forcing one costs £48,000. (iii) Ceiling £66, still below the £70 floor, so Cleeve should not make the product at all.** Computing the range first answers all three.",
        },
      ],
      check: {
        q: "A selling division has variable cost £34, sells externally at £70, and is at FULL capacity. What is its minimum transfer price?",
        options: [
          "£34, the marginal cost",
          "£70 — marginal cost £34 plus £36 of contribution forgone on the lost external sale",
          "£44, marginal cost plus a mark-up",
          "£64, the buyer's external price",
        ],
        correct: 1,
        explain:
          "£70. At full capacity every transferred unit displaces an external sale, so the opportunity cost is the £36 of contribution lost, and marginal cost plus opportunity cost equals the market price. That is why market price is the goal-congruent basis for a capacity-constrained division.",
      },
    },
    {
      id: "bases-and-international",
      heading: "The available bases, and the international dimension",
      blocks: [
        {
          kind: "table",
          caption: "Transfer pricing bases",
          head: ["Basis", "How it works", "Strengths and weaknesses"],
          rows: [
            ["**Market price**", "Transfer at the external market price, sometimes less a saving on distribution or credit risk", "**Best where a competitive external market exists** — goal congruent at full capacity, and fair to both divisions. Fails if there is no market price, the market is volatile, or the product is bespoke; and it can wrongly discourage transfers where there is spare capacity"],
            ["**Marginal (variable) cost**", "Transfer at variable cost", "**Goal congruent** — the buyer sees the group's true incremental cost. But the seller makes no contribution and always shows a loss on transfers, so it is demotivating and unfair"],
            ["**Full cost**", "Transfer at absorbed total cost", "Simple and covers the seller's costs. But it is **not goal congruent**: the fixed element looks variable to the buyer, so the buyer may reject a transfer that benefits the group. It also passes the seller's inefficiency straight on"],
            ["**Cost plus**", "Full or marginal cost plus a mark-up", "Gives the seller a profit and is widely used. Worsens the full-cost distortion, and the mark-up is arbitrary — the buyer's decisions are then made on a fictitious cost"],
            ["**Standard cost rather than actual**", "Use standard cost as the base whichever cost basis applies", "**Important refinement.** Transferring at actual cost passes the seller's inefficiency to the buyer and removes the seller's incentive to control it. Always prefer standard cost"],
            ["**Dual pricing**", "Seller credited at market price or cost plus; buyer charged marginal cost. Head office absorbs the difference", "**Achieves goal congruence AND motivates both divisions.** But divisional profits no longer sum to group profit, it needs central adjustment each period, and it can conceal genuine inefficiency"],
            ["**Negotiated price**", "The managers agree a price, within the range, sometimes with head office arbitration", "**Preserves autonomy** and is common in practice. But it consumes management time, the outcome depends on relative bargaining power rather than economics, and it can sour the relationship between divisions"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Marginal cost plus a fixed periodic fee — the practical compromise worth knowing",
          md: "Transfer at **marginal cost** so the buying division makes goal-congruent decisions, and separately charge the buying division a **fixed annual fee** for the right to be supplied — effectively a share of the selling division's fixed costs and profit. The buyer's marginal decisions are then based on the group's true incremental cost, while the seller still earns a return. It is a genuinely useful recommendation in a scenario where marginal cost is congruent but demotivating, and offering it shows you understand the conflict rather than just listing the bases.",
        },
        {
          kind: "list",
          title: "The international dimension",
          items: [
            "**Tax differentials.** A group has an incentive to set prices that shift profit into low-tax jurisdictions, by transferring out of high-tax territories at low prices and into them at high prices.",
            "**Tax authorities require arm's length pricing.** OECD-based rules mean transfer prices must approximate what unconnected parties would agree. Documentation is required and adjustments, interest and penalties follow if a price cannot be defended.",
            "**Import duties.** Duty is usually charged on the declared value, so a higher transfer price into a territory raises the duty paid, sometimes offsetting the tax benefit.",
            "**Exchange controls.** Where a country restricts the repatriation of profit, transfer prices become a route to move funds out — which is legitimate up to the arm's length limit and an evasion beyond it.",
            "**Exchange rate risk.** The currency the price is set in decides which division carries the exposure, and that allocation should be deliberate rather than accidental.",
            "**The conflict this creates.** A tax-efficient price is very unlikely also to be the price that motivates managers and measures them fairly, so many groups run **two sets of figures** — statutory transfer prices for tax and different internal prices for management reporting. Recognising that split is often the most sophisticated point available in an answer.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to structure a transfer pricing answer",
          md: "Compute the **floor** (marginal cost plus opportunity cost — and check the capacity position first, because it decides the opportunity cost) and the **ceiling** (the lower of the external price and net realisable value less further costs). State the **range**, or state that none exists and that the transfer should therefore not occur. Then recommend a basis with reference to the **four objectives**, saying explicitly which one you are prioritising and what it costs you. Finish with the **behavioural point**: what the current price is doing to each manager's incentives, since that is what a performance management paper is asking about.",
        },
      ],
      check: {
        q: "Why is transfer at FULL cost not goal congruent?",
        options: [
          "Because it is too expensive to calculate",
          "Because the fixed element looks variable to the buying division, which may then reject a transfer that benefits the group",
          "Because it gives the selling division no profit",
          "Because tax authorities prohibit it",
        ],
        correct: 1,
        explain:
          "The FIXED element looks VARIABLE to the buyer. Fixed costs are incurred whether the transfer happens or not, but the buyer treats the whole full cost as incremental and so may reject a transfer whose true incremental cost to the group is only the variable element. Full cost also passes the seller's inefficiency onward unless standard cost is used.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using total cost rather than marginal cost as the floor.",
      fix: "Fixed costs are incurred anyway. The floor is marginal cost plus opportunity cost.",
    },
    {
      trap: "Adding an opportunity cost where the selling division has spare capacity.",
      fix: "With spare capacity nothing is forgone, so the opportunity cost is nil and the floor is marginal cost.",
    },
    {
      trap: "Treating an impossible range as a problem to be solved.",
      fix: "If the floor exceeds the ceiling, the correct conclusion is that the transfer should not happen.",
    },
    {
      trap: "Transferring at actual rather than standard cost.",
      fix: "Actual cost passes the seller's inefficiency to the buyer and removes the incentive to control it.",
    },
    {
      trap: "Recommending a tax-efficient price as the management price.",
      fix: "They rarely coincide; many groups keep statutory prices for tax and separate prices for internal reporting.",
    },
  ],
  keyTerms: [
    { term: "Transfer price", def: "The price at which goods or services move between divisions of the same group; revenue to one and cost to the other." },
    { term: "Minimum transfer price", def: "Marginal cost of the transfer plus any opportunity cost of the sale forgone." },
    { term: "Maximum transfer price", def: "The lower of the buying division's external purchase price and the net revenue it can earn less its own further costs." },
    { term: "Dual pricing", def: "Crediting the seller at one price and charging the buyer another, with head office absorbing the difference." },
    { term: "Arm's length price", def: "The price unconnected parties would have agreed, which tax authorities require for cross-border transfers." },
  ],
  summary: [
    "A transfer price must serve goal congruence, fair measurement, autonomy and practicality, and cannot serve all four.",
    "The floor is marginal cost plus opportunity cost; the ceiling is the lower of external price and net revenue less further costs.",
    "With spare capacity the floor is marginal cost; at full capacity it rises to market price.",
    "If the floor exceeds the ceiling, no price works and the transfer should not happen.",
    "Full cost is not goal congruent, standard cost should always be preferred to actual, and tax-efficient prices rarely make good management prices.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the minimum transfer price?", a: "The marginal cost of making the transfer plus the opportunity cost of any external sale forgone — nil where there is spare capacity." },
    { q: "What is the maximum transfer price?", a: "The lower of the price the buying division can pay externally and the net revenue from its final product less its own further costs." },
    { q: "What does it mean if the minimum exceeds the maximum?", a: "No transfer price benefits both divisions, and the group is better off with the transfer not taking place." },
    { q: "Why prefer standard cost to actual cost as a transfer basis?", a: "Actual cost passes the selling division's inefficiency to the buyer and removes the seller's incentive to control it." },
    { q: "How does dual pricing achieve goal congruence, and at what cost?", a: "The buyer is charged marginal cost so its decisions are congruent while the seller is credited at market or cost plus so it is motivated — but divisional profits no longer sum to group profit and central adjustment is needed." },
  ],
}

export const PM_TREE_AREA_E_PART2: StudyChapter[] = [PM_TREE_31, PM_TREE_32]
