import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * PM · Section C constructed-response questions — the real exam format.
 *
 * PM's Section C is TWO questions of 20 marks, worth 40 of the 100 marks and answered in
 * the CBE's spreadsheet and word processor. It is where the paper is passed or failed, and
 * it draws exclusively on Areas C, D and E.
 *
 * SIX questions are provided — three disjoint sittings of two. The mock composer rotates
 * by a sitting's worth per form, so:
 *
 *   Form 1 · questions 1–2    D (variance analysis) and C (decision making)
 *   Form 2 · questions 3–4    E (divisional performance) and D (budgeting and forecasting)
 *   Form 3 · questions 5–6    C (pricing and CVP) and E (performance measurement)
 *
 * Each form therefore pairs a NUMERICAL requirement with a DISCURSIVE one, which is how
 * the real paper is built: one question is typically calculation-led with interpretation
 * attached, the other is interpretation-led with supporting figures.
 *
 * ── Why the rubrics are shaped the way they are ──────────────────
 * A real PM Section C answer loses marks in two predictable places: candidates compute
 * without commenting, and they comment without reference to the scenario. So every rubric
 * below allocates marks EXPLICITLY between calculation and interpretation, and the
 * interpretation points name what must be said rather than the topic it should be about.
 * A rubric point a marker cannot award without judging the specific answer is not a
 * marking point, it is a heading.
 *
 * All figures in these scenarios were verified by script before this file was committed.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Form 1 · questions 1–2 ───────────────────────────────────── */

const Q01: WrittenQuestion = {
  id: "PMW-01",
  paper: "PM",
  area: "D",
  chapter: "PM-27",
  topic: "Planning and operational variances, and what to report to a board",
  maxMarks: 20,
  stem:
    "Bredon Ltd manufactures a single product. The standard cost per unit was set at 4 kg of material at £6.00 per kg. After the budget was approved, two things happened: the supplier's index-linked contract raised the market price of the material to £6.75 per kg, and the design team obtained board approval for a specification change that raised the genuine material requirement to 4.2 kg per unit.\n\nActual results for the period were: production 9,000 units; 38,700 kg of material purchased and used at a total cost of £259,290.\n\nThe management accountant has reported a total adverse material variance of £43,290 to the board, and the board has written to the purchasing manager and the production manager asking them to explain what it describes as \"a serious failure of cost control in both departments\".\n\nRequired:\n\n(a) Calculate the total material price and usage variances against the ORIGINAL standard. (4 marks)\n\n(b) Calculate the material price and usage variances split into their PLANNING and OPERATIONAL elements. (8 marks)\n\n(c) Using your calculations, write the response you would send to the board. Your answer should explain what the split reveals about each manager's performance, and should identify the ONE issue that genuinely requires management attention. (5 marks)\n\n(d) Explain the principal weakness of the planning and operational split, and state two controls that would address it. (3 marks)",
  rubric: [
    "(a) Total price variance: (£6.00 − £6.70) × 38,700 kg = £27,090 adverse. Actual price correctly derived as £259,290/38,700 = £6.70 per kg (2 marks).",
    "(a) Total usage variance: standard quantity for actual output 9,000 × 4 = 36,000 kg against 38,700 used, valued at the original £6.00 = £16,200 adverse. Total £43,290 adverse agrees to the figure reported (2 marks).",
    "(b) Price PLANNING variance: (£6.00 − £6.75) × 38,700 = £29,025 adverse, valued on actual quantity (2 marks).",
    "(b) Price OPERATIONAL variance: (£6.75 − £6.70) × 38,700 = £1,935 favourable, and the check that £29,025 A + £1,935 F = £27,090 A (2 marks).",
    "(b) Usage PLANNING variance: the specification change from 4 kg to 4.2 kg for 9,000 units, (36,000 − 37,800) × £6.00 = £10,800 adverse, valued at the ORIGINAL price so the price effect is not double-counted (2 marks).",
    "(b) Usage OPERATIONAL variance: (37,800 − 38,700) × £6.00 = £5,400 adverse, with the check that £10,800 A + £5,400 A = £16,200 A (2 marks).",
    "(c) States that £39,825 of the £43,290 — £29,025 plus £10,800 — is PLANNING, arising from an index-linked price rise and a board-approved specification change, neither controllable by the managers being asked to explain it (2 marks).",
    "(c) States that purchasing actually BEAT the market it was operating in by £1,935, so the letter to the purchasing manager is not merely unfair but factually the opposite of the position (1 mark).",
    "(c) Identifies the one genuine issue: the £5,400 adverse usage operational variance, being 900 kg used above even the revised allowance, which is the production manager's to explain (1 mark).",
    "(c) Notes that the planning variances are not to be written off — a specification change costing £10,800 a period and an index-linked contract are both matters for the board itself to act on (1 mark).",
    "(d) Identifies the EX POST standard problem: the revised standard is set with hindsight, so a manager able to influence the revision can move any adverse result into the uncontrollable planning variance (1 mark).",
    "(d) Two controls, each earning a mark: revisions must rest on evidence outside the manager's control such as a published index or an approved specification; revisions must be approved independently of the manager being appraised; recurring planning variances must be audited, since a persistent one means the standard-setting process itself is wrong (2 marks).",
  ],
}

const Q02: WrittenQuestion = {
  id: "PMW-02",
  paper: "PM",
  area: "C",
  chapter: "PM-14",
  topic: "Limiting factors, shadow prices and relaxing a constraint",
  maxMarks: 20,
  stem:
    "Blaxhall Engineering makes three products, all of which must pass through a single grinding machine that is available for 9,000 hours next quarter. Machine running costs of £7 per hour are already included in the contribution figures below.\n\n                     Contribution   Machine hours   Maximum\n                       per unit        per unit      demand\n  Product A              £42            2.00         2,000 units\n  Product B              £54            3.00         1,500 units\n  Product C              £30            1.25         2,400 units\n\nThe production director has proposed making product B first, on the grounds that it earns the highest contribution per unit. A subcontractor has separately offered to carry out grinding work at £22 per machine hour equivalent, in any quantity.\n\nRequired:\n\n(a) Determine the optimal production plan and the maximum contribution it generates. (7 marks)\n\n(b) Calculate the contribution that would be earned under the production director's proposed plan, and quantify the cost of his proposal. (4 marks)\n\n(c) Advise on the subcontractor's offer, showing the maximum price per machine hour that Blaxhall should be willing to pay and explaining how you derived it. (5 marks)\n\n(d) Explain two limitations of the analysis in (a), and identify what further information would most improve the recommendation. (4 marks)",
  rubric: [
    "(a) Contribution per machine hour computed for each product: A £21.00, B £18.00, C £24.00 (2 marks).",
    "(a) Correct ranking C, A, B, with an explicit statement that the ranking is by contribution per unit of the SCARCE resource and not per unit of product (1 mark).",
    "(a) Allocation: C 2,400 units using 3,000 hours; A 2,000 units using 4,000 hours; leaving 2,000 hours for B, giving 666.67 units (2 marks).",
    "(a) Contributions £72,000 + £84,000 + £36,000 = £192,000, with B's demand identified as only partly satisfied (2 marks).",
    "(b) The director's plan: B 1,500 units using 4,500 hours for £81,000; C 2,400 units using 3,000 hours for £72,000; leaving 1,500 hours for A, giving 750 units for £31,500 — total £184,500 (3 marks).",
    "(b) Cost of the proposal quantified as £192,000 − £184,500 = £7,500 of contribution forgone, with the explanation that B consumes 3 hours to earn £54 where C earns £30 in 1.25 hours (1 mark).",
    "(c) Identifies the shadow price of a machine hour as £18, being the contribution per hour of the MARGINAL product B (2 marks).",
    "(c) Derives the maximum payable as the existing £7 running cost PLUS the £18 shadow price = £25 per hour, and explains that the shadow price is the premium over existing cost rather than the total payable (2 marks).",
    "(c) Recommends acceptance at £22, giving £3 per hour of additional contribution, and notes the offer is only worth taking up to the point where B's demand of 1,500 units is met — beyond that the shadow price falls to nil (1 mark).",
    "(d) Limitation: the analysis assumes contribution per unit is constant, so it ignores that selling the additional volume may require a lower price, and it assumes a single binding constraint — if labour or material also bind, linear programming is required (2 marks).",
    "(d) Limitation: qualitative factors are excluded — part-supplying product B may damage a key customer relationship or leave a range incomplete, which can cost more than the £7,500 the optimal plan gains (1 mark).",
    "(d) Further information: whether the constraint can be relaxed permanently and at what cost, since a second machine or an additional shift may be worth far more than optimising within the existing 9,000 hours (1 mark).",
  ],
}

/* ── Form 2 · questions 3–4 ───────────────────────────────────── */

const Q03: WrittenQuestion = {
  id: "PMW-03",
  paper: "PM",
  area: "E",
  chapter: "PM-31",
  topic: "Divisional performance measurement and the measure that causes the problem",
  maxMarks: 20,
  stem:
    "Southwold Group appraises its divisional managers on divisional return on investment and pays a bonus geared to it. The group's cost of capital is 10%.\n\n  Coastal division:  controllable profit £1,680,000;  controllable capital employed £8,000,000; plant substantially replaced in the last three years.\n  Harbour division:  controllable profit £1,632,000;  controllable capital employed £4,800,000; plant is on average fifteen years old and largely written down.\n\nCoastal's manager has been offered a project requiring £1,500,000 of additional assets and generating £195,000 of additional annual controllable profit. He has declined it.\n\nThe group board has written to Coastal's manager asking why his division \"substantially underperforms Harbour\", and has asked the management accountant to advise on whether ROI remains the right measure.\n\nRequired:\n\n(a) Calculate the ROI and residual income of each division, and the effect on Coastal's ROI and residual income of accepting the project. (8 marks)\n\n(b) Explain why Coastal's manager declined a project that the group should want, using your figures. (4 marks)\n\n(c) Explain why the comparison the board has drawn between the two divisions is unsound. (4 marks)\n\n(d) Recommend how Southwold should measure divisional performance, justifying each element of your recommendation. (4 marks)",
  rubric: [
    "(a) Coastal ROI £1,680,000/£8,000,000 = 21.0%; Harbour ROI £1,632,000/£4,800,000 = 34.0% (2 marks).",
    "(a) Coastal RI £1,680,000 − £800,000 = £880,000; Harbour RI £1,632,000 − £480,000 = £1,152,000 (2 marks).",
    "(a) Coastal's ROI with the project: £1,875,000/£9,500,000 = 19.74%, a FALL from 21.0% (2 marks).",
    "(a) Coastal's RI with the project: £1,875,000 − £950,000 = £925,000, an INCREASE of £45,000, correctly identified as equal to the project's surplus over the cost of capital, £195,000 − £150,000 (2 marks).",
    "(b) States the project's own return as £195,000/£1,500,000 = 13%, which exceeds the 10% cost of capital, so the group should want it (1 mark).",
    "(b) Explains the dilution: 13% is below Coastal's existing 21% average, so accepting reduces the percentage on which the manager's bonus depends, and declining is rational GIVEN THE MEASURE (2 marks).",
    "(b) Notes that residual income would have led to acceptance, because it rises for any project earning above the cost of capital — so RI is goal congruent and ROI is congruent only by accident (1 mark).",
    "(c) Explains the ASSET AGE effect: assets are carried at net book value, so Harbour's fifteen-year-old written-down plant gives a much smaller capital employed and a higher return on the same kind of profit (2 marks).",
    "(c) Observes that on absolute profit the two divisions are close — £1,680,000 against £1,632,000 — and that Harbour also has an active incentive NOT to reinvest, since replacement would raise its capital employed and destroy its apparent superiority (1 mark).",
    "(c) Notes that ROI comparison additionally requires the same definitional basis — opening, closing or average capital, and consistent treatment of cash and goodwill — before any conclusion is drawn (1 mark).",
    "(d) Recommends residual income for the INVESTMENT decision because it is goal congruent, retaining ROI for size-neutral comparison between divisions of different scale (2 marks).",
    "(d) Recommends disclosing asset age or gross book value alongside any comparison; reporting controllable profit separately from divisional profit after apportionment, since a division can be worth closing while its manager performs well; adding non-financial measures; and lengthening the appraisal period, since the deeper answer to a short horizon is not a different ratio (2 marks).",
  ],
}

const Q04: WrittenQuestion = {
  id: "PMW-04",
  paper: "PM",
  area: "D",
  chapter: "PM-20",
  topic: "Budgetary systems, forecasting and behavioural consequences",
  maxMarks: 20,
  stem:
    "Ufford Group has four divisions. For each of the last nine years its budget has been prepared by adding 3% to the previous year's figures, and divisional managers' bonuses depend on beating the budgeted profit for their division.\n\nThe group finance director reports the following. In the Materials division, input prices are now repriced monthly by suppliers and have moved by as much as 14% within a single quarter. In the Services division, 62% of costs are discretionary — training, marketing and research — and none has been examined since the division was formed. In the Assembly division, actual volume has exceeded budget by more than 25% in each of the last two years, and its manager states that his cost variances are \"meaningless\". Across the group, maintenance expenditure has fallen below depreciation in each of the last four years.\n\nThe finance director proposes imposing zero-based budgeting across all four divisions.\n\nRequired:\n\n(a) Explain the principal weaknesses of the group's current budgeting approach. (4 marks)\n\n(b) Evaluate the proposal to impose zero-based budgeting across all four divisions, and recommend an appropriate budgeting approach for EACH of the three divisions described. (8 marks)\n\n(c) Explain what the pattern of maintenance expenditure indicates, and how the group's budgeting and reward arrangements have contributed to it. (5 marks)\n\n(d) Explain the conflict between the planning and motivational purposes of a budget, and how it arises in this group. (3 marks)",
  rubric: [
    "(a) Incremental budgeting perpetuates existing inefficiency and any slack embedded in earlier years, because it never asks whether an activity is needed at all — after nine years the budget describes history rather than a plan (2 marks).",
    "(a) A single uplift takes no account of differing cost behaviour between divisions, and a fixed annual budget cannot accommodate volume or price volatility; and because managers are appraised against a budget they influence, slack is built in (2 marks).",
    "(b) Evaluates the proposal: ZBB is rigorous but very time-consuming and costly, and it adds little where cost varies directly with output — so imposing it uniformly is administratively tidy and wrong for most of these divisions (2 marks).",
    "(b) Materials division: ROLLING BUDGETS, because monthly repricing and 14% quarterly movement make a fixed annual budget obsolete within weeks, and variances against it measure the market rather than performance (2 marks).",
    "(b) Services division: ZERO-BASED BUDGETING, because 62% of its costs are discretionary with no input-output relationship, and have never been examined — which is precisely the case where ZBB earns its cost (2 marks).",
    "(b) Assembly division: FLEXIBLE BUDGETING, because at 25% above budgeted volume the fixed-budget cost variances conflate volume with control; the manager is right, and flexing the budget to actual activity isolates the cost question he can answer for (2 marks).",
    "(c) Identifies capital expenditure below depreciation over four years as a sign of DEFERRED maintenance and a shrinking asset base, not of efficiency (2 marks).",
    "(c) Explains that deferring maintenance improves the reported figures TWICE — profit rises because the spend is avoided, and ROI-type measures improve because capital employed falls as assets depreciate without replacement (2 marks).",
    "(c) Links it to the reward arrangement: bonuses geared to beating an annual budgeted profit make deferral rational for a manager who will not be in post when the breakdowns arrive (1 mark).",
    "(d) Explains the conflict: planning requires the most realistic estimate available, while motivation is often best served by a demanding target above that estimate — and one figure cannot be both (2 marks).",
    "(d) Applies it to Ufford: because the budget is also the basis of the bonus, managers bias the figure they submit, or hit it by damaging actions such as the deferred maintenance in (c). Remedies include separating the planning and evaluation figures, ring-fencing discretionary long-term spend, and adding non-financial measures (1 mark).",
  ],
}

/* ── Form 3 · questions 5–6 ───────────────────────────────────── */

const Q05: WrittenQuestion = {
  id: "PMW-05",
  paper: "PM",
  area: "C",
  chapter: "PM-17",
  topic: "Optimal pricing, CVP and the assumptions behind both",
  maxMarks: 20,
  stem:
    "Wenhaston Ltd sells 6,000 units a year of its only product at £120. Market research indicates that for every £4 reduction in the selling price, annual demand rises by 500 units, and that the relationship holds over the range under consideration. Variable cost is £48 per unit and annual fixed costs are £180,000.\n\nThe sales director wants to cut the price to £100 to build volume and market share. The finance director opposes any reduction, arguing that \"every pound off the price is a pound off the bottom line\". Neither has tested the current price.\n\nRequired:\n\n(a) Derive the demand equation in the form P = a − bQ, and calculate the profit-maximising price, quantity and annual profit. (9 marks)\n\n(b) Calculate the annual profit at the current price of £120 and at the sales director's proposed £100, and state which of the three prices should be adopted. (5 marks)\n\n(c) Calculate the breakeven volume and the margin of safety at the profit-maximising price, and comment on what they indicate about the risk of the recommendation. (3 marks)\n\n(d) Explain the principal limitations of the analysis in (a). (3 marks)",
  rubric: [
    "(a) b = £4/500 = 0.008, computed as the price change divided by the QUANTITY change (2 marks).",
    "(a) a = £120 + (0.008 × 6,000) = £168, with the demand equation stated as P = 168 − 0.008Q (2 marks).",
    "(a) MR = 168 − 0.016Q set equal to marginal cost of £48, giving Q = 7,500 units, with credit for doubling b in the MR function (2 marks).",
    "(a) Price read from the DEMAND equation: P = 168 − (0.008 × 7,500) = £108, with explicit recognition that substituting into MR would give the marginal revenue rather than the price (2 marks).",
    "(a) Profit = (£108 − £48) × 7,500 − £180,000 = £450,000 − £180,000 = £270,000 (1 mark).",
    "(b) Profit at £120: (£120 − £48) × 6,000 − £180,000 = £432,000 − £180,000 = £252,000 (2 marks).",
    "(b) Profit at £100: quantity from the demand equation is (168 − 100)/0.008 = 8,500 units; profit = (£100 − £48) × 8,500 − £180,000 = £442,000 − £180,000 = £262,000 (2 marks).",
    "(b) Recommends £108, being £18,000 better than the current price and £8,000 better than the sales director's proposal — so BOTH directors are partly right: the price was untested and too low, but £100 cuts too far (1 mark).",
    "(c) Breakeven at £108: £180,000/£60 = 3,000 units; margin of safety (7,500 − 3,000)/7,500 = 60% (2 marks).",
    "(c) Comments that a 60% margin of safety means volume could fall by three fifths before a loss arises, so the recommendation carries little downside risk and the price change can safely be tested (1 mark).",
    "(d) The demand relationship is assumed LINEAR and stable, and is estimated from limited research — a real demand curve is unlikely to be straight, and the estimate describes a moment rather than a period (1 mark).",
    "(d) Competitor reaction is ignored: a £12 price rise may be matched, undercut, or may invite entry, and the model has no way of representing that (1 mark).",
    "(d) Marginal cost is assumed constant at £48 at all volumes, when bulk discounts, overtime premiums or a step in capacity would all break it; and the analysis takes no account of the product's life-cycle stage or of any capacity constraint on producing 7,500 units (1 mark).",
  ],
}

const Q06: WrittenQuestion = {
  id: "PMW-06",
  paper: "PM",
  area: "E",
  chapter: "PM-33",
  topic: "Value for money, the three Es, and designing a measurement system",
  maxMarks: 20,
  stem:
    "Aldeburgh Trust provides community nursing to about 4,000 patients. Last year it spent £2,880,000 delivering 96,000 home visits at a standard visit length of 40 minutes. To reduce cost the Trust replaced a proportion of its permanent nurses with agency staff on lower hourly rates, and shortened the standard visit to 25 minutes. This year it spent £2,592,000 delivering 108,000 visits.\n\nOver the same period, patient satisfaction fell from 79% to 58%, nurse turnover rose from 11% to 26%, and emergency hospital admissions among the Trust's patients rose 11%. The admissions cost falls on the local hospital, which is a separate organisation.\n\nThe Trust's board reports cost per visit as its principal efficiency measure, and has described the year as \"a 20% efficiency improvement delivered alongside a 10% cost reduction\". The chief executive's bonus is based on cost per visit.\n\nRequired:\n\n(a) Calculate cost per visit and cost per care HOUR for each year, and the percentage change in care hours delivered. (6 marks)\n\n(b) Assess the Trust's performance against EACH of the three Es, using your calculations. (6 marks)\n\n(c) Explain what is wrong with the board's chosen measure and with the chief executive's bonus arrangement, naming the specific distortions involved. (4 marks)\n\n(d) Recommend a set of measures the Trust should report, and explain what each would reveal that cost per visit does not. (4 marks)",
  rubric: [
    "(a) Cost per visit: £2,880,000/96,000 = £30.00 last year and £2,592,000/108,000 = £24.00 this year, a 20% reduction (2 marks).",
    "(a) Care hours: 96,000 × 40/60 = 64,000 hours last year and 108,000 × 25/60 = 45,000 hours this year (2 marks).",
    "(a) Cost per care hour £45.00 rising to £57.60, a 28% increase; care hours delivered fell by (45,000 − 64,000)/64,000 = 29.7% (2 marks).",
    "(b) ECONOMY has genuinely improved: lower agency rates and total spend down 10% from £2,880,000 to £2,592,000 (2 marks).",
    "(b) EFFICIENCY has NOT improved: the apparent 20% gain is an artefact of shortening the unit counted, and on the measure that reflects the service actually delivered — cost per care hour — it worsened by 28% (2 marks).",
    "(b) EFFECTIVENESS has deteriorated on every available measure: satisfaction down 21 percentage points, nurse turnover more than doubled, and emergency admissions up 11% — and effectiveness is the dimension that speaks to the Trust's actual objective (2 marks).",
    "(c) Identifies MEASURE FIXATION: cost per visit is pursued rather than the care the visits exist to deliver, and it is improved by shortening visits without improving anything (1 mark).",
    "(c) Identifies TUNNEL VISION: satisfaction, turnover and clinical outcome are unmeasured and therefore unmanaged, so they were free to deteriorate (1 mark).",
    "(c) Identifies SUB-OPTIMISATION and COST SHIFTING: the 11% rise in admissions transfers cost to the hospital, so part of the £288,000 saving is not a saving at all — and it is invisible in the Trust's figures precisely because it lands on another organisation (1 mark).",
    "(c) States that basing the chief executive's bonus on the single measure most easily improved by damaging the service makes the deterioration a rational response, so the bonus arrangement is the cause rather than an aggravating factor (1 mark).",
    "(d) Recommends measuring output in CARE HOURS rather than visits, so the unit reflects the service delivered, together with cost per care hour as the efficiency measure (1 mark).",
    "(d) Recommends effectiveness measures reported with equal weight — patient satisfaction, emergency admissions, and a clinical outcome or readmission measure — because these move before any financial figure does (1 mark).",
    "(d) Recommends a capacity and capability measure such as nurse turnover, vacancy rate or the proportion of visits delivered by agency staff, since 26% turnover is the leading indicator of everything else on this list (1 mark).",
    "(d) Recommends obtaining the hospital's admission cost data so whole-system cost is visible before a saving is claimed, and separating the two changes made — agency staffing and visit length — so that neither continues to confound the other (1 mark).",
  ],
}

export const PM_WRITTEN_KIT: WrittenQuestion[] = [Q01, Q02, Q03, Q04, Q05, Q06]
