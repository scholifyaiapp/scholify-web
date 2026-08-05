import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * PM · Section B OT cases — the real exam format.
 *
 * PM's Section B is THREE OT cases, each with FIVE linked questions of 2 marks — 30 marks
 * in total. So a sitting takes three cases and three disjoint sittings need NINE.
 *
 * ── Ordering ────────────────────────────────────────────────────
 * The mock composer rotates the case list by a whole sitting's worth per form, so form 1
 * draws cases 1–3, form 2 draws 4–6 and form 3 draws 7–9. The cases are grouped so that
 * each BLOCK OF THREE spans different syllabus areas rather than clustering:
 *
 *   Form 1 · cases 1–3    B (ABC), C (limiting factors), D (basic variances)
 *   Form 2 · cases 4–6    C (pricing), D (mix and yield), E (ROI and RI)
 *   Form 3 · cases 7–9    B (target and life-cycle), D (fixed overhead), E (public sector)
 *
 * Areas C, D and E carry every block because they carry the exam: they supply all 40 of
 * Section C's marks and the large majority of Section B's in real sittings. Area A is
 * examined in Section A rather than here, which matches the paper — a five-task numerical
 * case on information systems would misrepresent how that area is tested.
 *
 * ── Why the linked tasks build on one another ────────────────────
 * Within each case, the five tasks are sequenced so that the figures computed in the early
 * tasks are the inputs to the later ones, and the FINAL task is always interpretation.
 * That is how the real cases work, and it is why the last task of each case is worth
 * reading even by a candidate who got the arithmetic wrong.
 *
 * Every figure in every scenario was verified by script before this file was committed.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/** A two-mark linked task within an OT case. */
function task(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "PM",
    area,
    chapter,
    type: "mcq",
    stem,
    options,
    correct,
    explanation,
    marks: 2,
    difficulty,
  }
}

/** A two-mark linked task requiring a numeric answer. */
function numTask(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  numericAnswer: number,
  unit: string,
  tolerance: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "PM",
    area,
    chapter,
    type: "number",
    stem,
    numericAnswer,
    unit,
    tolerance,
    explanation,
    marks: 2,
    difficulty,
  }
}

/* ── Form 1 block · cases 1–3 ─────────────────────────────────── */

const CASE_01: OtCase = {
  id: "pm-otc-01",
  paper: "PM",
  area: "B",
  title: "Halesworth Ltd — what ABC does to a low-volume product",
  scenario:
    "Halesworth Ltd makes two products and currently absorbs its £1,560,000 of annual production overhead on machine hours, of which it expects 48,000. It is considering activity-based costing, and has analysed the overhead into three pools: set-up costs of £420,000 driven by 1,400 set-ups, machining costs of £960,000 driven by the 48,000 machine hours, and quality inspection costs of £180,000 driven by 3,000 inspections. Standard is made in long runs: annual output 40,000 units, using 800 set-ups, 40,000 machine hours and 1,500 inspections. Deluxe is made in short runs: annual output 5,000 units, using 600 set-ups, 8,000 machine hours and 1,500 inspections. The sales director has proposed withdrawing Deluxe if ABC shows it to be unprofitable.",
  questions: [
    numTask("pm-otc-01", 1, "B", "PM-05", "easy",
      "What is the cost driver rate for set-up costs, in £ per set-up?",
      300, "£ per set-up", 0.01,
      "£420,000/1,400 set-ups = £300 per set-up. Note what this means for Deluxe: it triggers 600 of the 1,400 set-ups — 43% of them — on 5,000 of the 45,000 units made, which is 11% of output. That mismatch between activity share and volume share is the whole reason ABC changes the answer."),
    numTask("pm-otc-01", 2, "B", "PM-05", "medium",
      "What overhead cost per unit does ABC charge to Deluxe, in £?",
      86, "£ per unit", 0.01,
      "Rates are £300 per set-up, £960,000/48,000 = £20 per machine hour and £180,000/3,000 = £60 per inspection. Deluxe absorbs (600 × £300) + (8,000 × £20) + (1,500 × £60) = £180,000 + £160,000 + £90,000 = £430,000, over 5,000 units = £86.00 per unit."),
    numTask("pm-otc-01", 3, "B", "PM-05", "medium",
      "What overhead cost per unit does ABC charge to Standard, in £?",
      28.25, "£ per unit", 0.01,
      "(800 × £300) + (40,000 × £20) + (1,500 × £60) = £240,000 + £800,000 + £90,000 = £1,130,000, over 40,000 units = £28.25 per unit. Check the total: £1,130,000 + £430,000 = £1,560,000, so the whole overhead is attributed ✓. Under the existing machine-hour basis Standard bears 1 hour × £32.50 = £32.50, so ABC REDUCES it by £4.25 — the cost has moved to Deluxe, it has not been created."),
    numTask("pm-otc-01", 4, "B", "PM-05", "hard",
      "Under the EXISTING machine-hour absorption, what overhead per unit does Deluxe bear, in £?",
      52, "£ per unit", 0.01,
      "Absorption rate = £1,560,000/48,000 = £32.50 per machine hour. Deluxe uses 8,000/5,000 = 1.6 machine hours per unit, so it bears 1.6 × £32.50 = £52.00. ABC raises this to £86.00 — an increase of £34.00 a unit, or 65%, because Deluxe's short runs trigger far more set-ups and inspections than its machine hours suggest."),
    task("pm-otc-01", 5, "B", "PM-05", "hard",
      "ABC shows Deluxe's overhead cost is £34 a unit higher than previously thought, and it now appears to make a loss. What should Halesworth do?",
      [
        "Withdraw Deluxe immediately, as the sales director proposes",
        "Investigate WHY Deluxe consumes so much activity — batch size, set-up frequency and inspection rate — and act on those before considering withdrawal, since the overhead would largely remain to be absorbed by Standard",
        "Revert to machine-hour absorption, which shows Deluxe as profitable",
        "Raise Deluxe's price by £34 to restore the previous margin",
      ],
      1,
      "INVESTIGATE THE ACTIVITY CONSUMPTION FIRST. ABC has diagnosed a batch-size problem, not a product problem: 600 set-ups for 5,000 units is one set-up per 8 units. Running larger batches or reducing set-up time attacks the cause. And withdrawing Deluxe would leave most of that £430,000 of overhead to be absorbed by Standard, which is why the withdrawal reflex is the classic error here."),
  ],
}

const CASE_02: OtCase = {
  id: "pm-otc-02",
  paper: "PM",
  area: "C",
  title: "Blaxhall Engineering — one machine, three products",
  scenario:
    "Blaxhall Engineering makes three products, all of which pass through a single grinding machine. The machine is available for 9,000 hours next quarter and cannot be extended without external help. Product A earns a contribution of £42 per unit and takes 2 machine hours; maximum demand is 2,000 units. Product B earns £54 and takes 3 hours; maximum demand is 1,500 units. Product C earns £30 and takes 1.25 hours; maximum demand is 2,400 units. Machine running costs of £7 per hour are already included in the contribution figures. A subcontractor has offered to grind components at £22 per machine hour equivalent.",
  questions: [
    numTask("pm-otc-02", 1, "C", "PM-14", "easy",
      "What is product C's contribution per machine hour, in £?",
      24, "£ per hour", 0.01,
      "£30/1.25 hours = £24.00 per machine hour. C has the LOWEST contribution per unit of the three and the HIGHEST per machine hour, which is the reversal that makes limiting factor analysis necessary."),
    task("pm-otc-02", 2, "C", "PM-14", "medium",
      "In what order should the three products be made?",
      [
        "B, A, C — in order of contribution per unit",
        "C, A, B — in order of contribution per machine hour, at £24, £21 and £18",
        "A, B, C — in order of maximum demand",
        "C, B, A — in order of machine hours per unit",
      ],
      1,
      "C, A, B — ranked by contribution per MACHINE HOUR: C £24.00, A £42/2 = £21.00, B £54/3 = £18.00. Ranking on contribution per unit would put B first and it earns the least per hour of the scarce resource, so that ordering would destroy value."),
    numTask("pm-otc-02", 3, "C", "PM-14", "medium",
      "How many machine hours remain for product B after satisfying maximum demand for C and A?",
      2000, "hours", 1,
      "C uses 2,400 × 1.25 = 3,000 hours and A uses 2,000 × 2 = 4,000 hours, a total of 7,000. That leaves 9,000 − 7,000 = 2,000 hours for B — enough for 666.67 units against a demand of 1,500, so B is the marginal product and its demand is only 44% met."),
    numTask("pm-otc-02", 4, "C", "PM-14", "hard",
      "What is the maximum total contribution obtainable next quarter, in £?",
      192000, "£", 1,
      "C: 2,400 × £30 = £72,000. A: 2,000 × £42 = £84,000. B: 2,000 hours/3 = 666.67 units × £54 = £36,000. Total £192,000. Note the plan makes only 667 of the 1,500 units of the product with the highest unit contribution."),
    task("pm-otc-02", 5, "C", "PM-16", "hard",
      "Should Blaxhall accept the subcontractor's offer at £22 per machine hour equivalent?",
      [
        "No, because £22 exceeds the £18 shadow price of a machine hour",
        "Yes — the ceiling is the £7 existing running cost plus the £18 shadow price, being £25, so each hour bought adds £3 of contribution",
        "No, because subcontracting would reduce quality",
        "Yes, but only up to the 2,000 hours already allocated to B",
      ],
      1,
      "YES: the ceiling is £7 + £18 = £25 and £22 is below it, so every hour bought earns £3. The shadow price is the PREMIUM over existing cost, not the total payable — comparing £22 with £18 alone would reject a profitable offer. Note the £18 holds only while B is the marginal product: once B's demand of 1,500 units is met, further hours have no use and the shadow price falls to nil."),
  ],
}

const CASE_03: OtCase = {
  id: "pm-otc-03",
  paper: "PM",
  area: "D",
  title: "Kelsale Ltd — four variances, two decisions",
  scenario:
    "Kelsale Ltd operates a standard costing system. The standard cost of one unit is 5 kg of material at £8.00 per kg and 2.5 labour hours at £14.00 per hour. Budgeted production was 4,000 units. Actual results for the month were: production 4,200 units; 21,840 kg of material purchased and used at a total cost of £172,536; and 10,080 labour hours worked at a total cost of £143,136. The production manager reports that a new supplier's material was used for the first time this month, and that the shift was staffed with the company's most experienced operators because of the tighter output target.",
  questions: [
    numTask("pm-otc-03", 1, "D", "PM-23", "medium",
      "What is the material PRICE variance, in £? Give an adverse variance as a negative number.",
      2184, "£", 1,
      "Standard cost of the actual quantity = 21,840 × £8.00 = £174,720, against £172,536 paid — £2,184 FAVOURABLE. The actual price was £172,536/21,840 = £7.90 per kg, 10p below standard."),
    numTask("pm-otc-03", 2, "D", "PM-23", "medium",
      "What is the material USAGE variance, in £? Give an adverse variance as a negative number.",
      -6720, "£", 1,
      "Standard quantity for actual output = 4,200 × 5 = 21,000 kg, against 21,840 kg used — 840 kg too many. At the standard price: 840 × £8.00 = £6,720 ADVERSE. Value it at STANDARD price so the price effect is not double-counted."),
    numTask("pm-otc-03", 3, "D", "PM-23", "medium",
      "What is the labour RATE variance, in £? Give an adverse variance as a negative number.",
      -2016, "£", 1,
      "Standard cost of actual hours = 10,080 × £14.00 = £141,120, against £143,136 paid — £2,016 ADVERSE. The actual rate was £14.20 an hour, consistent with the most experienced operators having been used."),
    numTask("pm-otc-03", 4, "D", "PM-23", "medium",
      "What is the labour EFFICIENCY variance, in £? Give an adverse variance as a negative number.",
      5880, "£", 1,
      "Standard hours for actual output = 4,200 × 2.5 = 10,500, against 10,080 worked — 420 hours FEWER than the output warranted. At the standard rate: 420 × £14.00 = £5,880 FAVOURABLE."),
    task("pm-otc-03", 5, "D", "PM-28", "hard",
      "How should these four variances be reported to the board?",
      [
        "As four separate items, with purchasing credited and production criticised",
        "As TWO decisions: the new supplier's cheaper material saved £2,184 and wasted £6,720, a net loss of £4,536; and using experienced operators cost £2,016 more in rate and saved £5,880 in time, a net gain of £3,864",
        "As a single net variance of £1,128 adverse, with no further analysis",
        "As evidence that the standard cost needs revising",
      ],
      1,
      "TWO DECISIONS, NETTED. Favourable price with adverse usage is the signature of a cheaper material, and it lost £4,536 — so the new supplier should be reviewed. Adverse rate with favourable efficiency is the signature of higher-grade labour, and it GAINED £3,864 — so that staffing decision was sound. Reporting four separate variances credits purchasing for a decision that cost money and criticises production for one that made money."),
  ],
}

/* ── Form 2 block · cases 4–6 ─────────────────────────────────── */

const CASE_04: OtCase = {
  id: "pm-otc-04",
  paper: "PM",
  area: "C",
  title: "Wenhaston Ltd — the price nobody had tested",
  scenario:
    "Wenhaston Ltd sells 6,000 units a year of its only product at £120. Market research indicates that for every £4 reduction in the selling price, annual demand rises by 500 units, and that the relationship holds over the range being considered. Variable cost is £48 per unit and annual fixed costs are £180,000. The sales director has proposed cutting the price to build volume; the finance director says the current price has never been tested and may be too low. The demand equation takes the form P = a − bQ.",
  questions: [
    numTask("pm-otc-04", 1, "C", "PM-17", "medium",
      "What is the value of b in the demand equation, in £ per unit? Give your answer to three decimal places.",
      0.008, "£ per unit", 0.0001,
      "b = change in price / change in quantity = £4/500 = 0.008. Inverting it — 500/4 = 125 — is the standard error and makes every subsequent figure wrong."),
    numTask("pm-otc-04", 2, "C", "PM-17", "medium",
      "What is the value of a, in £?",
      168, "£", 0.01,
      "a = P + bQ = £120 + (0.008 × 6,000) = £120 + £48 = £168. It is the theoretical price at which demand would fall to zero, so it should be comfortably above the current price — a useful check."),
    numTask("pm-otc-04", 3, "C", "PM-17", "hard",
      "What is the profit-maximising quantity, in units?",
      7500, "units", 1,
      "Set MR = MC. MR = a − 2bQ = 168 − 0.016Q, and marginal cost is the £48 variable cost. So 168 − 0.016Q = 48, giving 0.016Q = 120 and Q = 7,500 units. Remember MR falls at TWICE the rate of price — omitting the 2 is the commonest slip in the topic."),
    numTask("pm-otc-04", 4, "C", "PM-17", "hard",
      "What is the profit-maximising price, in £?",
      108, "£", 0.01,
      "Read the price from the DEMAND equation at the optimal quantity: P = 168 − (0.008 × 7,500) = £108. Substituting into the MR equation instead gives £48, which is the marginal revenue at that volume rather than the price — an error that would halve the price."),
    numTask("pm-otc-04", 5, "C", "PM-17", "hard",
      "What annual profit does the profit-maximising price produce, in £?",
      270000, "£", 1,
      "Contribution = (£108 − £48) × 7,500 = £450,000, less £180,000 fixed = £270,000. Compare the current position: (£120 − £48) × 6,000 = £432,000 − £180,000 = £252,000. So the finance director was right that the price was untested, but the sales director was right about the direction — a £12 CUT adds £18,000 of profit, and the current breakeven of 2,500 units shows there was ample margin of safety to test it with."),
  ],
}

const CASE_05: OtCase = {
  id: "pm-otc-05",
  paper: "PM",
  area: "D",
  title: "Blythburgh Foods — a cheaper blend that did not hold",
  scenario:
    "Blythburgh Foods blends two materials. The standard mix for every 200 kg of input is 120 kg of material X at £5.00 per kg and 80 kg of material Y at £8.00 per kg, and the standard output is 180 kg of finished product from every 200 kg of input. In March the actual input was 25,500 kg of X and 16,500 kg of Y, and output was 37,260 kg of finished product. Actual prices equalled standard. The production manager has reported the favourable element of the resulting variances to the board and describes the month as a success.",
  questions: [
    numTask("pm-otc-05", 1, "D", "PM-25", "medium",
      "What is the standard weighted average price per kg of input, in £?",
      6.2, "£ per kg", 0.01,
      "(120 × £5.00) + (80 × £8.00) = £600 + £640 = £1,240 for 200 kg, so £6.20 per kg of input. This weighted average is what values the YIELD variance — using X's or Y's own price instead is a frequent error."),
    numTask("pm-otc-05", 2, "D", "PM-25", "hard",
      "What is the material MIX variance, in £? Give an adverse variance as a negative number.",
      900, "£", 1,
      "Total actual input = 42,000 kg, which in the standard 60:40 mix would be X 25,200 and Y 16,800. X: (25,200 − 25,500) × £5.00 = £1,500 ADVERSE. Y: (16,800 − 16,500) × £8.00 = £2,400 FAVOURABLE. Total £900 FAVOURABLE — 300 kg of the dearer Y was displaced by cheaper X, so the blend got cheaper."),
    numTask("pm-otc-05", 3, "D", "PM-25", "hard",
      "What is the material YIELD variance, in £? Give an adverse variance as a negative number.",
      -3720, "£", 1,
      "Standard input for the actual output = 37,260 × 200/180 = 41,400 kg, against 42,000 kg used. Yield = (41,400 − 42,000) × £6.20 = £3,720 ADVERSE. Six hundred kg of input was effectively wasted."),
    numTask("pm-otc-05", 4, "D", "PM-25", "medium",
      "What is the total material USAGE variance, in £? Give an adverse variance as a negative number.",
      -2820, "£", 1,
      "£900 F + £3,720 A = £2,820 ADVERSE. Check it independently: actual input at standard prices = (25,500 × £5) + (16,500 × £8) = £127,500 + £132,000 = £259,500, against the standard cost of input for actual output of 41,400 × £6.20 = £256,680. The difference is £2,820 adverse ✓."),
    task("pm-otc-05", 5, "D", "PM-25", "hard",
      "Is the production manager right to describe March as a success?",
      [
        "Yes — the £900 favourable mix variance shows the blend was well managed",
        "No — the cheaper blend saved £900 and cost £3,720 in lost yield, a net £2,820 loss, and reporting the mix variance without the yield is close to useless",
        "Yes, provided output met the production plan",
        "No, because the mix variance should have been adverse",
      ],
      1,
      "NO — a £2,820 NET LOSS. A cheaper blend ALWAYS produces a favourable mix variance, so the mix figure on its own carries no information about whether the decision was good. The yield answers that, and here it more than took back the saving. There is also a cost the variances cannot show at all: a cheaper blend may have reduced product quality, which will appear later as complaints rather than as a variance."),
  ],
}

const CASE_06: OtCase = {
  id: "pm-otc-06",
  paper: "PM",
  area: "E",
  title: "Southwold Group — the project the manager will refuse",
  scenario:
    "Southwold Group appraises its divisional managers on divisional return on investment, and pays a bonus geared to it. The Coastal division currently earns controllable profit of £1,680,000 on controllable capital employed of £8,000,000. The group's cost of capital is 10%. Coastal's manager has been offered a project requiring £1,500,000 of additional assets and generating £195,000 of additional annual controllable profit. Coastal's assets are relatively new; a sister division with almost identical operations but fifteen-year-old plant reports an ROI of 34%, and the group's board has begun asking Coastal's manager why he is underperforming.",
  questions: [
    numTask("pm-otc-06", 1, "E", "PM-31", "easy",
      "What is Coastal's current ROI, as a percentage?",
      21, "%", 0.05,
      "£1,680,000/£8,000,000 = 21.0%. Comfortably above the 10% cost of capital, so Coastal is creating value — which is what makes the board's comparison with the sister division so misleading."),
    numTask("pm-otc-06", 2, "E", "PM-31", "medium",
      "What is Coastal's current residual income, in £?",
      880000, "£", 1,
      "£1,680,000 − (10% × £8,000,000) = £1,680,000 − £800,000 = £880,000. Residual income charges the division for the capital it uses, which is what aligns it with the group's own investment rule."),
    numTask("pm-otc-06", 3, "E", "PM-31", "hard",
      "If the project is accepted, what is Coastal's new ROI, as a percentage to two decimal places?",
      19.74, "%", 0.02,
      "(£1,680,000 + £195,000)/(£8,000,000 + £1,500,000) = £1,875,000/£9,500,000 = 19.74%. ROI FALLS from 21.0%, because the project's own return of £195,000/£1,500,000 = 13% is above the 10% cost of capital but below Coastal's existing 21% average."),
    numTask("pm-otc-06", 4, "E", "PM-31", "hard",
      "By how much would residual income CHANGE if the project is accepted, in £?",
      45000, "£", 1,
      "New RI = £1,875,000 − (10% × £9,500,000) = £1,875,000 − £950,000 = £925,000, an increase of £45,000. And that is exactly the project's surplus over the cost of capital: £195,000 − (10% × £1,500,000) = £45,000."),
    task("pm-otc-06", 5, "E", "PM-31", "hard",
      "What should the group conclude from this case?",
      [
        "Coastal's manager is underperforming relative to the sister division and should be replaced",
        "The measure is the problem: ROI makes the manager reject a value-creating project, and the sister division's 34% reflects fifteen-year-old assets at low net book value rather than better performance",
        "The cost of capital should be reduced to 8% so the project becomes attractive",
        "The project should be transferred to the sister division",
      ],
      1,
      "THE MEASURE IS THE PROBLEM, TWICE OVER. ROI's dilution effect makes a rational manager reject a project worth £45,000 to the group, and the asset-age effect makes an older division look better while being the weaker business — the sister division's high ROI comes from a small net book value, and it also has an active reason not to reinvest. Recommend residual income for the investment decision, disclose asset age alongside any ROI comparison, and lengthen the appraisal period."),
  ],
}

/* ── Form 3 block · cases 7–9 ─────────────────────────────────── */

const CASE_07: OtCase = {
  id: "pm-otc-07",
  paper: "PM",
  area: "B",
  title: "Dunwich Ltd — the gap that must close before launch",
  scenario:
    "Dunwich Ltd is designing a new product. Market research shows that it must sell at £145 to compete, and the company requires a margin of 25% on selling price. The current design's estimated unit cost is: materials £52, direct labour £34, variable overhead £19 and absorbed fixed production overhead £24. Development costs of £900,000 have been committed and the product's expected total life volume is 60,000 units over four years. The design team has proposed closing any cost gap by assuming a higher production volume, which would reduce the absorbed fixed overhead per unit.",
  questions: [
    numTask("pm-otc-07", 1, "B", "PM-06", "easy",
      "What is the target cost per unit, in £?",
      108.75, "£ per unit", 0.01,
      "£145 × (1 − 0.25) = £108.75. Margin is a percentage OF SELLING PRICE. Treating the 25% as a mark-up on cost would give £145/1.25 = £116.00, which is £7.25 too generous."),
    numTask("pm-otc-07", 2, "B", "PM-06", "medium",
      "What is the cost gap per unit, in £?",
      20.25, "£ per unit", 0.01,
      "Estimated cost = £52 + £34 + £19 + £24 = £129.00, against a target of £108.75. Gap = £20.25 per unit, or £1,215,000 over the 60,000-unit life. Include the absorbed fixed overhead: the price must ultimately cover all of it."),
    numTask("pm-otc-07", 3, "B", "PM-07", "medium",
      "What is the committed development cost per unit over the product's life, in £?",
      15, "£ per unit", 0.01,
      "£900,000/60,000 units = £15.00 per unit. This is a LIFE-CYCLE cost: it appears in no year's unit cost under conventional costing, but the product must recover it or it destroys value however healthy its reported margin looks."),
    numTask("pm-otc-07", 4, "B", "PM-07", "hard",
      "Adding the development cost to the current estimated cost, what is the life-cycle cost per unit, in £?",
      144, "£ per unit", 0.01,
      "£129.00 + £15.00 = £144.00, against a selling price of £145.00 — a life-cycle margin of £1.00 a unit, or 0.7%. So the current design does not merely miss the 25% target: on a whole-life view it barely breaks even, which is information the £20.25 gap figure alone does not convey."),
    task("pm-otc-07", 5, "B", "PM-06", "hard",
      "How should Dunwich respond to the design team's proposal?",
      [
        "Accept it — spreading fixed overhead over more units is a legitimate cost reduction",
        "Reject it as circular: assuming volume removes no cost, and if the volume does not materialise the gap reappears with the fixed cost now committed. Close the gap by redesign, component standardisation and supplier negotiation instead",
        "Accept it, provided the higher volume is approved by the board",
        "Reject it and reduce the required margin to 15% instead",
      ],
      1,
      "REJECT IT AS CIRCULAR. Assuming the volume away does not remove a pound of cost; it spreads the same cost over units that may never be sold. Genuine gap closure means value engineering, redesign, standardising components and re-sourcing — actions that change the cost itself. And reducing the required margin is not closing the gap either: it is deciding to earn less."),
  ],
}

const CASE_08: OtCase = {
  id: "pm-otc-08",
  paper: "PM",
  area: "D",
  title: "Orford Ltd — a favourable variance that consumed cash",
  scenario:
    "Orford Ltd absorbs fixed production overhead on labour hours. The budget for the month was fixed overhead of £504,000 for production of 14,000 units, at a standard 2 labour hours per unit. Actual results were: production 15,200 units, 29,600 labour hours worked, and fixed overhead incurred of £518,000. Sales for the month were 14,000 units, as budgeted, and inventory rose accordingly. The production director has highlighted the favourable overhead variances in his report and has asked for the month's performance to be recognised.",
  questions: [
    numTask("pm-otc-08", 1, "D", "PM-24", "easy",
      "What is the fixed overhead EXPENDITURE variance, in £? Give an adverse variance as a negative number.",
      -14000, "£", 1,
      "£504,000 budgeted − £518,000 actual = £14,000 ADVERSE. This is the only fixed overhead variance about SPENDING, and it is the only adverse one in the month — which the production director's report does not lead with."),
    numTask("pm-otc-08", 2, "D", "PM-24", "medium",
      "What is the fixed overhead VOLUME variance, in £?",
      43200, "£", 1,
      "Absorption rate = £504,000/(14,000 × 2) = £18 per hour, so £36 per unit. Volume = (15,200 − 14,000) × £36 = £43,200 FAVOURABLE. It measures OVER-ABSORPTION: 1,200 more units were made than budgeted, so £43,200 more overhead was absorbed than the budget assumed."),
    numTask("pm-otc-08", 3, "D", "PM-24", "medium",
      "What is the fixed overhead CAPACITY variance, in £?",
      28800, "£", 1,
      "(29,600 hours worked − 28,000 budgeted) × £18 = £28,800 FAVOURABLE. The workforce was in attendance for 1,600 more hours than budgeted, so more overhead was absorbed."),
    numTask("pm-otc-08", 4, "D", "PM-24", "medium",
      "What is the fixed overhead EFFICIENCY variance, in £?",
      14400, "£", 1,
      "Standard hours for actual output = 15,200 × 2 = 30,400, against 29,600 worked: (30,400 − 29,600) × £18 = £14,400 FAVOURABLE. Run the check: capacity £28,800 F + efficiency £14,400 F = £43,200 F, which equals the volume variance ✓."),
    task("pm-otc-08", 5, "D", "PM-24", "hard",
      "Should the month's performance be recognised as the production director requests?",
      [
        "Yes — £43,200 of favourable variances against only £14,000 adverse is a clear net gain",
        "No — the £43,200 favourable volume variance arises because 1,200 units were made and not sold, so it absorbed overhead into inventory while consuming cash; the only spending variance is £14,000 ADVERSE",
        "Yes, because the efficiency variance shows genuine productivity improvement",
        "No, because the absorption rate was set incorrectly",
      ],
      1,
      "NO. Production exceeded sales by 1,200 units, so the favourable volume variance is over-absorption sitting in unsold inventory — £43,200 of cost moved into the balance sheet, with cash tied up in stock nobody ordered. The only variance about spending is £14,000 ADVERSE. This is exactly why a favourable volume variance rewards producing for stock, and the strongest argument for marginal-costing internal reporting: under marginal costing this variance would not exist."),
  ],
}

const CASE_09: OtCase = {
  id: "pm-otc-09",
  paper: "PM",
  area: "E",
  title: "Aldeburgh Trust — the efficiency gain that was not one",
  scenario:
    "Aldeburgh Trust provides community nursing. Last year it spent £2,880,000 delivering 96,000 home visits at a standard visit length of 40 minutes. To reduce cost it replaced some permanent nurses with agency staff at a lower hourly rate and shortened the standard visit to 25 minutes. This year it spent £2,592,000 delivering 108,000 visits. Over the same period, patient satisfaction fell from 79% to 58%, and emergency hospital admissions among the Trust's patients rose 11% — a cost falling on the local hospital rather than on the Trust. The Trust's board reports cost per visit as its principal efficiency measure.",
  questions: [
    numTask("pm-otc-09", 1, "E", "PM-33", "easy",
      "What is this year's cost per visit, in £?",
      24, "£ per visit", 0.01,
      "£2,592,000/108,000 = £24.00, against £2,880,000/96,000 = £30.00 last year — a 20% improvement on the board's chosen measure, achieved alongside a 10% reduction in total spend."),
    numTask("pm-otc-09", 2, "E", "PM-33", "hard",
      "By what percentage did CARE HOURS delivered change? Give a fall as a negative number, to one decimal place.",
      -29.7, "%", 0.1,
      "Last year: 96,000 × 40/60 = 64,000 hours. This year: 108,000 × 25/60 = 45,000 hours. Change = (45,000 − 64,000)/64,000 = −29.7%. Visits rose 12.5% while the care actually delivered fell almost 30%, because the unit being counted was shortened."),
    numTask("pm-otc-09", 3, "E", "PM-33", "hard",
      "What is this year's cost per CARE HOUR, in £?",
      57.6, "£ per hour", 0.01,
      "£2,592,000/45,000 = £57.60, against £2,880,000/64,000 = £45.00 last year — a 28% INCREASE. So on the measure that reflects the service actually delivered, the Trust has become substantially less efficient while reporting a 20% improvement."),
    task("pm-otc-09", 4, "E", "PM-33", "medium",
      "Which of the three Es has genuinely improved?",
      [
        "All three",
        "ECONOMY only — cheaper inputs were obtained, while real efficiency worsened on a care-hour basis and effectiveness deteriorated on both satisfaction and admissions",
        "Efficiency only",
        "Effectiveness only",
      ],
      1,
      "ECONOMY ONLY. Lower agency rates and 10% less total spend are a genuine economy improvement. Efficiency only appears improved because the output measure was redefined — per care hour it worsened 28%. And effectiveness fell on both available measures, which is the dimension that actually matters."),
    task("pm-otc-09", 5, "E", "PM-33", "hard",
      "What should the management accountant recommend?",
      [
        "Continue, since the £288,000 saving is real and the admissions are the hospital's problem",
        "Measure output in CARE HOURS rather than visits, report satisfaction and admissions alongside cost with equal weight, obtain the hospital's admission costs so the whole-system effect is visible, and separate the two changes so agency staffing and visit length stop confounding each other",
        "Shorten visits further, since cost per visit continues to improve",
        "Return to the previous arrangements without further analysis",
      ],
      1,
      "CHANGE THE MEASURE, WIDEN THE REPORT, AND SEPARATE THE VARIABLES. The £288,000 is partly COST SHIFTING, not saving — the 11% rise in admissions lands on the hospital, and is invisible in the Trust's figures precisely because of that. Two changes were made at once, so neither can be evaluated; and choosing visits as the output measure is what turned a deterioration into a reported gain."),
  ],
}

export const PM_OT_CASES: OtCase[] = [
  CASE_01,
  CASE_02,
  CASE_03,
  CASE_04,
  CASE_05,
  CASE_06,
  CASE_07,
  CASE_08,
  CASE_09,
]
