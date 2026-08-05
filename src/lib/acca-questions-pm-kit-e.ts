import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-pm-kit-builders"

/*
 * PM · Area E question kit — chapters 29 to 33.
 *
 * Financial performance and short-termism, non-financial measures and the three
 * frameworks, ROI and residual income, transfer pricing, and not-for-profit and public
 * sector performance.
 *
 * Area E supplies 40 of the 100 marks through Section C, so this part of the kit is
 * weighted towards INTERPRETATION rather than computation — but the ROI/RI and transfer
 * pricing questions are numeric, because those are the two places in the area where a
 * wrong figure leads directly to a wrong decision.
 *
 * Authored, applied, exam-standard at PM's uniform 2 marks. Original Scholify content.
 */

/* ── Chapter 29 · Financial performance and short-termism ── */

const CH29: AccaQuestion[] = [
  num("PMK-29-01", "PM-29", "E", "easy",
    "Operating profit is £1,092,000 and capital employed £7,800,000. What is ROCE, as a percentage?",
    14, "%", 0.05,
    "£1,092,000/£7,800,000 = 14.0%. ROCE is the headline return measure, and it should always be decomposed into operating margin times asset turnover before any comment is made on it."),

  num("PMK-29-02", "PM-29", "E", "medium",
    "Revenue is £10,400,000, operating profit £1,092,000 and capital employed £7,800,000. What is asset turnover, in times to three decimal places?",
    1.333, "times", 0.005,
    "£10,400,000/£7,800,000 = 1.333 times. Check the decomposition: operating margin £1,092,000/£10,400,000 = 10.5%, and 10.5% × 1.333 = 14.0% = ROCE ✓. Running that check confirms both components."),

  q("PMK-29-03", "PM-29", "E", "hard",
    "ROCE fell from 20% to 14% while operating margin fell from 12.0% to 10.5%. What does the remainder of the fall indicate?",
    [
      "Nothing — the margin explains the whole fall",
      "Asset turnover also fell, so capital employed grew faster than revenue",
      "Gearing must have increased",
      "There was a loss on disposal of assets",
    ],
    1,
    "ASSET TURNOVER FELL TOO. At the old turnover the new margin would have given 17.5%, so about 3.5 of the 6 percentage points came from capital growing faster than revenue. That is a completely different problem from a margin problem, and it needs a different remedy."),

  q("PMK-29-04", "PM-29", "E", "medium",
    "A company's revenue rose 30% and operating profit 14%, while ROCE fell from 20% to 14%. What is the commercial interpretation?",
    [
      "The company performed well, since both revenue and profit grew",
      "The growth was BOUGHT — additional capital was invested to win additional revenue at a lower margin, which is the signature of discounting to fill new capacity",
      "The capital employed figure must be wrong",
      "The company should increase its gearing",
    ],
    1,
    "THE GROWTH WAS BOUGHT. Capital grew faster than revenue and the margin fell, so the extra volume came at a price. That may be defensible if the new assets are not yet fully utilised — but the board's reading of rising revenue and profit as success is the wrong one."),

  q("PMK-29-05", "PM-29", "E", "hard",
    "A manager defers maintenance and cuts R&D. What happens to the reported financial measures?",
    [
      "They deteriorate, revealing the problem",
      "They improve — profit rises because the spend has gone, and ROCE improves further because capital employed shrinks as assets depreciate without replacement",
      "Only the current ratio changes",
      "Gearing rises",
    ],
    1,
    "THEY IMPROVE, AND ROCE TWICE OVER. Profit rises and the asset base shrinks, so the return improves from both directions. This is exactly why financial measures alone cannot detect the behaviour, and why non-financial measures are needed."),

  multi("PMK-29-06", "PM-29", "E", "medium",
    "Which actions would improve reported financial measures while damaging long-term value? Select TWO.",
    [
      "Investing in a new production line",
      "Stretching payment terms to suppliers, improving both margin and the working capital cycle",
      "Recruiting additional sales staff",
      "Cutting the training budget",
    ],
    [1, 3],
    "STRETCHING SUPPLIER TERMS and CUTTING TRAINING. Both improve the reported figures now at a cost that arrives later — supply risk and quality decline in the first case, skill erosion and staff turnover in the second. Investment and recruitment reduce this year's measures while building capability."),

  q("PMK-29-07", "PM-29", "E", "medium",
    "Which measure is often the best EARLY WARNING of financial difficulty?",
    [
      "Gross margin",
      "The working capital cycle, since cash tied up in operations moves before reported profit does",
      "Gearing",
      "Return on equity",
    ],
    1,
    "THE WORKING CAPITAL CYCLE. Inventory building up and receivable days lengthening both signal trouble well before profit reflects it. Note the caution though: a SHORTENED cycle may come from squeezing suppliers rather than from efficiency."),

  q("PMK-29-08", "PM-29", "E", "hard",
    "Which factors break the comparability of two years' ratios and should be stated in an answer?",
    [
      "Only inflation",
      "Changes in accounting policy, asset revaluations, one-off items, a different year end, or a business acquired part-way through a year",
      "Only a change of auditor",
      "Nothing — ratios are always comparable within a company",
    ],
    1,
    "POLICY CHANGES, REVALUATIONS, ONE-OFF ITEMS, DIFFERENT YEAR ENDS AND MID-YEAR ACQUISITIONS. Each makes a like-for-like comparison invalid, and naming the ones present in the scenario is a reliable mark that most candidates leave on the table."),

  q("PMK-29-09", "PM-29", "E", "medium",
    "Why is a revaluation of property a problem for ROCE comparison?",
    [
      "It changes operating profit",
      "It increases capital employed without changing the operating performance, so ROCE falls although nothing about the business has altered",
      "It reduces gearing",
      "It has no effect on ROCE",
    ],
    1,
    "IT RAISES CAPITAL EMPLOYED WITHOUT CHANGING PERFORMANCE. The same profit over a larger asset base gives a lower return, so a revalued company looks worse than an identical one carrying property at cost. It is one of the reasons ROCE comparisons need the basis disclosed."),

  multi("PMK-29-10", "PM-29", "E", "medium",
    "Which remedies reduce the incentive for managerial myopia? Select TWO.",
    [
      "Increasing the weight given to annual profit in the bonus",
      "Appraising managers over a three-year rolling period so a decision's consequences fall inside their own assessment",
      "Setting a single annual cliff-edge bonus threshold",
      "Ring-fencing discretionary long-term spend such as R&D, training and maintenance",
    ],
    [1, 3],
    "A LONGER APPRAISAL HORIZON and RING-FENCED LONG-TERM SPEND. Both attack the cause. Increasing the weight on annual profit and using a cliff-edge threshold both make short-termism MORE rational, the threshold especially — it is what makes pushing sales into the period worthwhile."),

  q("PMK-29-11", "PM-29", "E", "hard",
    "In a 'comment on performance' requirement, where are the marks?",
    [
      "In computing as many ratios as possible",
      "In interpretation: a few relevant measures, decomposed, connected to the scenario narrative, with what the figures cannot tell you and what further information you would want",
      "In identifying the accounting standards applied",
      "In recalculating the financial statements",
    ],
    1,
    "IN THE INTERPRETATION. A page of ratios with no commentary scores badly. Compute few, decompose the headline one, connect each movement to something in the narrative, and say what the figures cannot show — that last point is where the better answers separate themselves."),

  q("PMK-29-12", "PM-29", "E", "medium",
    "Which direct measure would reveal deferred maintenance that the financial statements conceal?",
    [
      "Operating margin",
      "Average asset age, maintenance backlog or machine downtime hours",
      "Interest cover",
      "Asset turnover",
    ],
    1,
    "ASSET AGE, MAINTENANCE BACKLOG OR DOWNTIME. Deferred maintenance improves every financial measure, so it can only be detected by measuring the thing itself. This is the practical link between the short-termism problem and the non-financial measures of chapter 30."),
]

/* ── Chapter 30 · Non-financial measures and the frameworks ── */

const CH30: AccaQuestion[] = [
  q("PMK-30-01", "PM-30", "E", "easy",
    "What are the four perspectives of the balanced scorecard?",
    [
      "Financial, operational, strategic and tactical",
      "Financial, customer, internal business process, and innovation and learning",
      "Economy, efficiency, effectiveness and equity",
      "Dimensions, standards, rewards and results",
    ],
    1,
    "FINANCIAL, CUSTOMER, INTERNAL BUSINESS PROCESS, and INNOVATION AND LEARNING. The last is often mislabelled; it covers the organisation's capacity to improve — skills, new products, staff retention — and it is the leading indicator of the other three."),

  q("PMK-30-02", "PM-30", "E", "hard",
    "Why is the innovation and learning perspective described as the LEADING indicator of the other three?",
    [
      "Because it is the easiest to measure",
      "Because skills and innovation drive process quality, which drives the customer experience, which produces the financial result",
      "Because it matters most to shareholders",
      "Because financial measures are unreliable",
    ],
    1,
    "IT SITS AT THE START OF THE CAUSAL CHAIN. The scorecard is not four independent reports but a chain, and this perspective is both the first link and the one managers cut first under pressure — which is precisely why it needs explicit measurement."),

  multi("PMK-30-03", "PM-30", "E", "medium",
    "Which measures belong to the CUSTOMER perspective? Select TWO.",
    [
      "Staff turnover",
      "Customer retention rate",
      "On-time delivery percentage",
      "Revenue from products launched in the last three years",
    ],
    [1, 2],
    "RETENTION RATE and ON-TIME DELIVERY — both describe what the customer experiences. Staff turnover and revenue from new products belong to the innovation and learning perspective, and misplacing measures between perspectives is a routine loss of marks."),

  q("PMK-30-04", "PM-30", "E", "medium",
    "What are the three BUILDING BLOCKS in Fitzgerald and Moon's model?",
    [
      "Results, determinants and rewards",
      "Dimensions, standards and rewards",
      "Economy, efficiency and effectiveness",
      "Financial, customer and process",
    ],
    1,
    "DIMENSIONS, STANDARDS and REWARDS. Results and determinants sit INSIDE the dimensions block — confusing the two levels is the standard error. Devoting two of the three blocks to standards and rewards is what makes the model suited to services."),

  q("PMK-30-05", "PM-30", "E", "medium",
    "In the building block model, which items are DETERMINANTS rather than results?",
    [
      "Competitiveness and financial performance",
      "Quality of service, flexibility, resource utilisation and innovation",
      "Standards and rewards",
      "Ownership, achievability and equity",
    ],
    1,
    "QUALITY OF SERVICE, FLEXIBILITY, RESOURCE UTILISATION and INNOVATION — the leading measures a manager can act on. Competitiveness and financial performance are the RESULTS, which lag. Ownership, achievability and equity are the qualities a STANDARD must have."),

  q("PMK-30-06", "PM-30", "E", "hard",
    "What three qualities must a STANDARD have in the building block model?",
    [
      "Accurate, timely and complete",
      "Owned by those held to it, achievable, and equitable between units facing different conditions",
      "Financial, non-financial and strategic",
      "Clear, controllable and motivating",
    ],
    1,
    "OWNED, ACHIEVABLE and EQUITABLE. Clear, controllable and motivating are the qualities of a REWARD — the model's third block. Ownership matters especially in services because staff deliver the service personally, so a standard they reject will simply not be met."),

  q("PMK-30-07", "PM-30", "E", "hard",
    "Why do SERVICES need their own performance framework?",
    [
      "Because services have no measurable costs",
      "Because services are intangible, heterogeneous, simultaneously produced and consumed, and perishable — so a standard cost per unit means little and quality cannot be inspected before delivery",
      "Because services have no customers to survey",
      "Because service businesses do not use financial measures",
    ],
    1,
    "INTANGIBILITY, HETEROGENEITY, SIMULTANEITY and PERISHABILITY. Each breaks something a manufacturing framework relies on: there is no defective unit to inspect, each delivery differs, quality cannot be checked before the customer receives it, and an empty seat or room is gone for good."),

  q("PMK-30-08", "PM-30", "E", "medium",
    "What are the two faces of the PERFORMANCE PYRAMID?",
    [
      "Financial and non-financial",
      "External effectiveness — market, customer satisfaction, quality, delivery — and internal efficiency — financial, productivity, cycle time, waste",
      "Strategic and operational",
      "Leading and lagging",
    ],
    1,
    "EXTERNAL EFFECTIVENESS and INTERNAL EFFICIENCY. The split is the pyramid's distinctive contribution: a business measuring only the internal face is managing efficiency while ignoring whether the market wants what it is efficiently producing."),

  q("PMK-30-09", "PM-30", "E", "medium",
    "In which scenario would you specifically recommend the performance pyramid?",
    [
      "A service business with high staff turnover",
      "A business whose operational measures are disconnected from its strategy — a factory optimising machine utilisation while the strategy is rapid customisation",
      "A company with weak financial controls",
      "A not-for-profit organisation",
    ],
    1,
    "WHERE OPERATIONAL MEASURES ARE DISCONNECTED FROM STRATEGY. The pyramid's contribution is the two-way flow: objectives cascade down from the vision and measures aggregate up from the work centre, so every base measure must trace to an objective at the apex."),

  multi("PMK-30-10", "PM-30", "E", "medium",
    "Which are genuine problems in implementing a multi-dimensional measurement system? Select TWO.",
    [
      "Too many measures, producing no focus",
      "Non-financial measures cannot be quantified at all",
      "Rewards left pointing the old way, so a scorecard is reported while the bonus is still based on profit alone",
      "Multi-dimensional systems cannot be used in manufacturing",
    ],
    [0, 2],
    "TOO MANY MEASURES and REWARD MISALIGNMENT. The second is the most common real-world failure: a scorecard reported alongside a profit-only bonus changes nothing, because the incentive still points where it always did."),

  q("PMK-30-11", "PM-30", "E", "hard",
    "A company's balanced scorecard has twenty-two measures and managers report that it is ignored. What is the most likely remedy?",
    [
      "Add measures until every activity is covered",
      "Reduce to five or six per perspective with explicit targets and stated priorities, so the conflicts between them are resolved centrally rather than by managers guessing",
      "Report it quarterly instead of monthly",
      "Remove the non-financial perspectives",
    ],
    1,
    "CUT IT DOWN AND PRIORITISE. Twenty-two indicators give no focus, and where they conflict the manager decides which to satisfy — so the measurement system has delegated the organisation's priorities by accident. Five or six per perspective is the practical limit."),

  q("PMK-30-12", "PM-30", "E", "medium",
    "What earns marks in a question asking you to apply a performance framework to a scenario?",
    [
      "Reciting the framework's structure accurately",
      "Populating it with measures that could only come from THIS scenario, explaining why each suits the business, and saying how it would be implemented and what would go wrong",
      "Listing as many measures as possible in each category",
      "Comparing the framework with its alternatives",
    ],
    1,
    "SCENARIO-SPECIFIC MEASURES, PLUS IMPLEMENTATION. Two well-chosen measures per perspective with a sentence each on why they suit this business will outscore twelve generic ones — and the implementation point, including that the bonus scheme must change too, is the part most candidates omit."),
]

/* ── Chapter 31 · ROI and residual income ── */

const CH31: AccaQuestion[] = [
  num("PMK-31-01", "PM-31", "E", "easy",
    "A division earns controllable profit of £2,400,000 on controllable capital employed of £10,000,000. What is its ROI, as a percentage?",
    24, "%", 0.05,
    "£2,400,000/£10,000,000 = 24.0%. ROI is ROCE applied at divisional level, and it should always be computed on CONTROLLABLE profit and capital if the manager rather than the division is being appraised."),

  num("PMK-31-02", "PM-31", "E", "medium",
    "A division earns controllable profit of £2,400,000 on capital employed of £10,000,000. The group's cost of capital is 12%. What is its residual income, in £?",
    1200000, "£", 1,
    "£2,400,000 − (12% × £10,000,000) = £2,400,000 − £1,200,000 = £1,200,000. Residual income deducts an imputed interest charge on the capital used, which is what makes it goal congruent with the group's investment rule."),

  num("PMK-31-03", "PM-31", "E", "hard",
    "A division earning £2,400,000 on £10,000,000 accepts a project needing £2,000,000 of assets and generating £340,000 of profit. What is the new ROI, as a percentage to two decimal places?",
    22.83, "%", 0.02,
    "£2,740,000/£12,000,000 = 22.83%. ROI FALLS from 24.0%, because the project's own 17% return is above the cost of capital but below the division's existing average. So a manager judged on ROI rejects a value-creating project."),

  num("PMK-31-04", "PM-31", "E", "hard",
    "The same division accepts the project: profit rises by £340,000 and capital by £2,000,000, with a 12% cost of capital. By how much does residual income CHANGE, in £?",
    100000, "£", 1,
    "New RI = £2,740,000 − (12% × £12,000,000) = £2,740,000 − £1,440,000 = £1,300,000, an increase of £100,000. And that is exactly the project's surplus over the cost of capital: £340,000 − (12% × £2,000,000) = £100,000."),

  q("PMK-31-05", "PM-31", "E", "hard",
    "A division earning 24% ROI is offered a project returning 17% against a group cost of capital of 12%. What happens under each measure?",
    [
      "Both measures accept it",
      "ROI falls so the manager rejects it, while RI rises so the manager accepts it — RI is goal congruent",
      "Both measures reject it",
      "ROI rises and RI falls",
    ],
    1,
    "ROI REJECTS, RI ACCEPTS. This is the central argument for residual income: RI rises for ANY project above the cost of capital and falls for any below it, so a manager acting in their own interest also acts in the group's. ROI is congruent only by accident."),

  q("PMK-31-06", "PM-31", "E", "medium",
    "A poorly performing division earns 8% ROI. It is offered a project returning 10% against a cost of capital of 12%. What does ROI lead the manager to do?",
    [
      "Reject it, correctly",
      "ACCEPT it, because 10% raises the division's 8% average — even though the project destroys value at a 12% cost of capital",
      "Reject it, because 10% is below 12%",
      "The ROI measure gives no guidance",
    ],
    1,
    "ACCEPT A VALUE-DESTROYING PROJECT. ROI's defect runs both ways: it makes a strong division reject good projects and a weak division accept bad ones. Residual income would show a fall of £2 per £100 invested and reject it correctly."),

  q("PMK-31-07", "PM-31", "E", "hard",
    "Why does a division with old, heavily depreciated assets show a higher ROI than an identical newly re-equipped division?",
    [
      "Because its profits are genuinely higher",
      "Because net book value falls with depreciation, so capital employed is smaller — which also gives managers an incentive not to reinvest",
      "Because depreciation is added back to profit",
      "Because ROI ignores non-current assets",
    ],
    1,
    "SMALLER NET BOOK VALUE, SAME PROFIT. Two consequences follow: comparing divisions of different asset ages is invalid, and every replacement raises capital employed and depresses the measure — so the manager has an active reason not to reinvest."),

  q("PMK-31-08", "PM-31", "E", "medium",
    "Which measures are appropriate for a PROFIT centre but not an investment centre?",
    [
      "ROI and residual income",
      "Controllable profit, contribution and margin — because a profit centre manager does not control investment in assets",
      "Cost per unit only",
      "Variances against a flexed budget only",
    ],
    1,
    "PROFIT-BASED MEASURES WITHOUT A CAPITAL CHARGE. A profit centre manager controls costs and revenues but not the asset base, so charging them for capital they cannot influence breaches controllability. ROI and RI belong to investment centres."),

  q("PMK-31-09", "PM-31", "E", "hard",
    "Why should a company prepare BOTH controllable profit and divisional profit after apportioned costs?",
    [
      "To satisfy accounting standards",
      "Because controllable profit appraises the MANAGER while divisional profit appraises the DIVISION as an economic unit — a division can be worth closing while its manager performs excellently",
      "To reconcile to the group accounts",
      "Because apportioned costs are always controllable in the long run",
    ],
    1,
    "THEY ANSWER DIFFERENT QUESTIONS. One judges the person, the other the business. Being able to make that distinction — and to say that a well-run division may still be worth closing — is a reliable source of marks."),

  q("PMK-31-10", "PM-31", "E", "medium",
    "What is the main weakness of residual income?",
    [
      "It is not goal congruent",
      "It is absolute, so it cannot fairly compare divisions of different sizes, and it requires a cost of capital that managers may dispute",
      "It ignores capital employed",
      "It cannot be computed from the financial statements",
    ],
    1,
    "IT IS ABSOLUTE, SO SIZE DISTORTS COMPARISON. A large division shows a larger RI regardless of quality. Hence the standard recommendation: RI for the investment decision, ROI for size-neutral comparison between divisions."),

  multi("PMK-31-11", "PM-31", "E", "medium",
    "Which problems afflict BOTH ROI and residual income? Select TWO.",
    [
      "Both are annual measures computed from accounting profit, so both reward deferring maintenance and R&D",
      "Both require a cost of capital",
      "Both are distorted by asset age, since assets are carried at net book value",
      "Neither can be computed for a division",
    ],
    [0, 2],
    "SHORT-TERMISM and ASSET AGE. Both are annual accounting measures and both use net book value. Only RI requires a cost of capital, and both are divisional measures by definition."),

  q("PMK-31-12", "PM-31", "E", "hard",
    "What is the fullest recommendation on divisional performance measurement?",
    [
      "Use ROI alone, as it is the most intuitive",
      "RI for investment decisions and ROI for size-neutral comparison, plus disclosure of asset age, controllable profit reported separately, non-financial measures, and a longer appraisal period",
      "Use residual income alone",
      "Abandon financial measures in favour of a balanced scorecard",
    ],
    1,
    "BOTH MEASURES PLUS FOUR QUALIFICATIONS. And note the last of them: the deeper answer to a short horizon is not a different ratio at all but a longer appraisal period, since a manager judged on three years has far less reason to game one."),
]

/* ── Chapter 32 · Transfer pricing ── */

const CH32: AccaQuestion[] = [
  num("PMK-32-01", "PM-32", "E", "medium",
    "A division's variable cost of making a component is £34 and it has SPARE capacity. What is the minimum transfer price, in £?",
    34, "£ per unit", 0.01,
    "£34 — marginal cost plus an opportunity cost of NIL, because nothing is forgone where there is spare capacity. Fixed costs are excluded: they are incurred whether the transfer happens or not."),

  num("PMK-32-02", "PM-32", "E", "hard",
    "A division has variable cost £34 per unit, sells externally at £70, and is at FULL capacity. What is the minimum transfer price, in £?",
    70, "£ per unit", 0.01,
    "£34 marginal cost + £36 contribution forgone on the displaced external sale = £70, which is simply the market price. That is always the answer for a capacity-constrained division, and it is why market price is the goal-congruent basis where an external market exists."),

  q("PMK-32-03", "PM-32", "E", "medium",
    "What is the MAXIMUM transfer price the buying division should pay?",
    [
      "The selling division's full cost plus a mark-up",
      "The lower of its external purchase price and the net revenue it can earn from the final product less its own further costs",
      "The selling division's marginal cost",
      "The market price of the finished product",
    ],
    1,
    "THE LOWER OF THE EXTERNAL PRICE AND NET REVENUE LESS FURTHER COSTS. Both are ceilings: the division would buy outside above the first, and would make a loss above the second. Take whichever binds."),

  num("PMK-32-04", "PM-32", "E", "hard",
    "The buying division can earn net revenue of £96 per unit from the final product after its own further processing costs of £30. It has no external supplier. What is its maximum transfer price, in £?",
    66, "£ per unit", 0.01,
    "£96 − £30 = £66. With no external alternative, the ceiling is what the division can earn less what it must spend to earn it — anything above £66 makes the finished product unprofitable for the buyer."),

  q("PMK-32-05", "PM-32", "E", "hard",
    "The selling division's floor is £70 and the buying division's ceiling is £64. What should happen?",
    [
      "Head office should impose a price of £67",
      "No transfer should take place — the group is better off with the seller selling externally at £70 and the buyer buying externally at £64",
      "The seller should transfer at £64 and absorb the loss",
      "The buyer should pay £70 to preserve group unity",
    ],
    1,
    "NO TRANSFER. An impossible range is a conclusion, not a problem to solve: forcing an internal transfer would cost the group £6 per unit. This is why the range should be computed before any policy question is considered."),

  num("PMK-32-06", "PM-32", "E", "medium",
    "A component's variable cost is £34 and the buying division can buy it externally for £64. There is spare capacity and 8,000 units are needed. What is the total benefit to the GROUP of transferring internally, in £?",
    240000, "£", 1,
    "The group's incremental cost of making is £34 against £64 paid outside, a saving of £30 per unit: 8,000 × £30 = £240,000. Note the transfer price itself does not affect this total — it only decides how the £240,000 is SPLIT between the two divisions, which is why managers argue about it and the group is indifferent."),

  q("PMK-32-07", "PM-32", "E", "hard",
    "Which two transfer pricing objectives most directly CONFLICT?",
    [
      "Practicality and fair measurement",
      "Divisional autonomy and goal congruence — free managers may refuse a transfer the group needs, but an imposed price destroys the autonomy that justified divisionalisation",
      "Goal congruence and practicality",
      "Fair measurement and practicality",
    ],
    1,
    "AUTONOMY AND GOAL CONGRUENCE. Every transfer pricing answer is a trade-off between them, and saying which you are prioritising and what it costs you is the mark. There is no price that satisfies all four objectives."),

  q("PMK-32-08", "PM-32", "E", "medium",
    "Why is transfer at FULL COST not goal congruent?",
    [
      "It is too expensive to calculate",
      "The fixed element looks variable to the buying division, which may then reject a transfer whose true incremental cost to the group is only the variable element",
      "It gives the selling division no profit",
      "Tax authorities prohibit it",
    ],
    1,
    "THE FIXED ELEMENT LOOKS VARIABLE TO THE BUYER. Fixed costs are incurred whether the transfer happens or not, but the buyer treats the whole full cost as incremental. Full cost also passes the seller's inefficiency on, unless STANDARD cost is used."),

  q("PMK-32-09", "PM-32", "E", "medium",
    "Why should STANDARD rather than ACTUAL cost be used as a transfer pricing base?",
    [
      "Because standard cost is always lower",
      "Because actual cost passes the selling division's inefficiency straight to the buyer and removes the seller's incentive to control it",
      "Because actual cost is not known until year end",
      "Because tax authorities require standard cost",
    ],
    1,
    "IT STOPS INEFFICIENCY BEING PASSED ON. Transferring at actual cost means the seller recovers whatever it spends, however wastefully, and the buyer's results absorb it. Standard cost leaves the seller with its own variances, which is where they belong."),

  q("PMK-32-10", "PM-32", "E", "hard",
    "How does DUAL PRICING achieve goal congruence, and at what cost?",
    [
      "It sets one price for tax and another for management, and costs nothing",
      "The buyer is charged marginal cost so its decisions are congruent, while the seller is credited at market or cost-plus so it is motivated — but divisional profits no longer sum to group profit and central adjustment is needed each period",
      "It charges both divisions the market price",
      "It removes the need for a transfer price entirely",
    ],
    1,
    "DIFFERENT PRICES FOR EACH SIDE, WITH HEAD OFFICE ABSORBING THE DIFFERENCE. It genuinely solves the congruence-versus-motivation conflict, at the price of divisional profits that no longer add up to the group's and a periodic central adjustment — and it can conceal real inefficiency."),

  multi("PMK-32-11", "PM-32", "E", "medium",
    "Which considerations arise on INTERNATIONAL transfer pricing? Select TWO.",
    [
      "Tax authorities require prices to approximate what unconnected parties would agree",
      "International transfers do not require a transfer price",
      "A higher transfer price into a territory raises the import duty payable, sometimes offsetting the tax benefit",
      "Exchange rates are irrelevant to transfer pricing",
    ],
    [0, 2],
    "ARM'S LENGTH PRICING REQUIREMENTS and IMPORT DUTY. Both constrain profit-shifting. And the deeper point: a tax-efficient price is very unlikely also to motivate managers fairly, which is why many groups run statutory prices for tax and different prices for internal reporting."),

  q("PMK-32-12", "PM-32", "E", "hard",
    "How should a transfer pricing answer be structured?",
    [
      "List the available bases and recommend the most common",
      "Compute the floor and the ceiling — checking the capacity position first, since it decides the opportunity cost — state the range or that none exists, then recommend a basis against the four objectives and close on what the current price does to each manager's incentives",
      "Compute the group's total profit under each possible price",
      "Establish the tax position first, then set the price accordingly",
    ],
    1,
    "RANGE FIRST, THEN BASIS AGAINST THE OBJECTIVES, THEN BEHAVIOUR. The capacity position must come first because it determines the opportunity cost and therefore the floor — and the behavioural close is what makes it a performance management answer rather than a costing one."),
]

/* ── Chapter 33 · Not-for-profit and public sector ── */

const CH33: AccaQuestion[] = [
  q("PMK-33-01", "PM-33", "E", "easy",
    "Which of the three Es asks whether inputs were obtained at the lowest cost for appropriate quality?",
    ["Effectiveness", "Economy", "Efficiency", "Equity"],
    1,
    "ECONOMY. Efficiency is the input-to-output conversion, and effectiveness is whether the objectives were achieved. Economy on its own is the most dangerous of the three to pursue, because the cheapest input can wreck the outcome."),

  q("PMK-33-02", "PM-33", "E", "medium",
    "Which measure is an EFFICIENCY measure for a hospital?",
    [
      "Cost per drug purchased",
      "Patients treated per consultant",
      "Readmission rate within 30 days",
      "Patient satisfaction score",
    ],
    1,
    "PATIENTS TREATED PER CONSULTANT — output per unit of input. Cost per drug is economy; readmission rate and satisfaction are effectiveness measures, since they speak to whether the intended outcome was achieved."),

  q("PMK-33-03", "PM-33", "E", "hard",
    "Which two Es most often conflict, and how?",
    [
      "Efficiency and effectiveness, because efficient processes are always effective",
      "Economy and effectiveness — the cheapest inputs, whether staff, materials or appointment length, can undermine the outcome entirely",
      "Economy and efficiency, because cheap inputs are always used efficiently",
      "They never conflict",
    ],
    1,
    "ECONOMY AND EFFECTIVENESS. Buying the least experienced staff or the shortest appointment improves economy and can destroy the outcome. Note efficiency and effectiveness also conflict — discharging patients earlier raises throughput and worsens readmissions."),

  num("PMK-33-04", "PM-33", "E", "hard",
    "A council delivered 144,000 visits of 45 minutes each last year, and 168,000 visits of 30 minutes this year. By what percentage did CARE HOURS delivered change? Give a fall as a negative number, to one decimal place.",
    -22.2, "%", 0.1,
    "Last year 144,000 × 0.75 = 108,000 hours; this year 168,000 × 0.5 = 84,000 hours. Change = (84,000 − 108,000)/108,000 = −22.2%. Visits rose 17% while care hours fell 22% — which is why the output measure must always be interrogated."),

  num("PMK-33-05", "PM-33", "E", "hard",
    "Spending was £4,320,000 for 108,000 care hours, and is now £3,780,000 for 84,000 care hours. What is the current cost per care hour, in £?",
    45, "£ per hour", 0.01,
    "£3,780,000/84,000 = £45.00, against £4,320,000/108,000 = £40.00 before — a 12.5% INCREASE. Yet cost per VISIT fell 25%, from £30.00 to £22.50. Choosing visits as the output measure turned a deterioration into a reported efficiency gain."),

  q("PMK-33-06", "PM-33", "E", "hard",
    "A hospital meets its four-hour waiting target by admitting patients who did not clinically need admission. What is this called?",
    ["Tunnel vision", "Measure fixation", "Sub-optimisation", "Cream-skimming"],
    1,
    "MEASURE FIXATION — pursuing the measure rather than the objective it represents. The target is met while appropriate care is not delivered. Naming the specific distortion is what earns the mark, and the remedy is to measure the outcome alongside the output."),

  q("PMK-33-07", "PM-33", "E", "medium",
    "What is CREAM-SKIMMING?",
    [
      "Reporting only favourable results",
      "Selecting the easiest cases to improve a measured result or league table position, while the hardest are neglected",
      "Deferring costs to the following period",
      "Setting deliberately undemanding targets",
    ],
    1,
    "SELECTING THE EASY CASES. It is a predictable response to league tables that ignore case mix — a school or hospital improves its ranking by choosing whom it serves rather than by serving them better, and the people most in need are the ones excluded."),

  q("PMK-33-08", "PM-33", "E", "medium",
    "Why is performance measurement harder without a profit objective?",
    [
      "Because public sector data is less reliable",
      "There are multiple conflicting objectives, no single figure combining revenue and cost, outputs that resist quantification, and many stakeholders defining success differently",
      "Because costs cannot be measured",
      "Because there are no managers to hold accountable",
    ],
    1,
    "MULTIPLE OBJECTIVES, NO SINGLE BOTTOM LINE, UNQUANTIFIABLE OUTPUTS AND MANY STAKEHOLDERS. Profit conveniently combines revenue and cost into one comparable number; without it, cost data alone measures only the input side."),

  multi("PMK-33-09", "PM-33", "E", "medium",
    "Which are valid criticisms of using LEAGUE TABLES in the public sector? Select TWO.",
    [
      "They provide no transparency to service users",
      "They ignore starting position and case mix, so an institution serving a harder population can look worse while performing better",
      "They encourage cream-skimming of the easiest cases",
      "They cannot be published for schools or hospitals",
    ],
    [1, 2],
    "IGNORING CASE MIX and ENCOURAGING CREAM-SKIMMING. Both are real distortions. League tables do provide transparency and informed choice, which is the other side of the argument an answer should give — the criticism is about how they are constructed, not that they exist."),

  q("PMK-33-10", "PM-33", "E", "hard",
    "A council saves £540,000 by shortening home care visits, and emergency admissions among service users rise 14%. What is the correct analysis?",
    [
      "The saving is genuine and the admissions are the health service's problem",
      "The cost has been SHIFTED rather than saved — the admissions cost falls on another organisation, and it is invisible in the council's figures precisely because of that",
      "The two figures are unrelated",
      "The saving should be reinvested in emergency care",
    ],
    1,
    "COST SHIFTING, NOT SAVING. The whole-system cost may exceed the £540,000, and it is invisible in the council's accounts because it lands elsewhere. This is sub-optimisation: a unit pursuing its own target at the expense of the whole."),

  q("PMK-33-11", "PM-33", "E", "medium",
    "Which measure would best show whether environmental or operational efficiency is improving, independent of output volume?",
    [
      "Total cost",
      "A ratio measure — cost or waste per unit of output — since absolute figures move with volume",
      "Total waste",
      "Number of incidents",
    ],
    1,
    "A RATIO PER UNIT OF OUTPUT. Absolute figures fall in a bad year and rise in a good one regardless of efficiency, so they answer the wrong question. This is the same reason cost per unit is used rather than total cost."),

  q("PMK-33-12", "PM-33", "E", "hard",
    "Which four principles should guide the design of any performance measurement system?",
    [
      "Accuracy, timeliness, completeness and relevance",
      "What you measure is what you get; measure outcomes not just outputs; use several measures across dimensions; and hold managers to what they control",
      "Economy, efficiency, effectiveness and equity",
      "Financial, customer, process and learning",
    ],
    1,
    "THOSE FOUR. They pull together everything in Area E: a measure changes behaviour before it reports anything, visits are not care, any single measure can be improved by damaging what it does not capture, and controllability is the basis of any fair system."),
]

export const PM_KIT_AREA_E: AccaQuestion[] = [...CH29, ...CH30, ...CH31, ...CH32, ...CH33]
