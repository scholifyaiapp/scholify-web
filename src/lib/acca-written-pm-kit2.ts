import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * PM · Section C constructed-response questions, second file — the practice bank.
 *
 * ── Why there are fifteen questions for a two-question section ───
 * acca-written-pm-kit.ts holds six: exactly three disjoint mock sittings of two, at the
 * real 20-mark unit size. That is the right number for MOCKS and much too few for
 * PRACTICE. Section C is 40 of PM's 100 marks and is where the paper is passed or failed,
 * so a learner working through it needs a bank they cannot exhaust in three sittings —
 * and the AI Examiner has nothing to mark once they have.
 *
 * These nine take the bank to fifteen. The mock composer shuffles the whole bank per form
 * and fills each Section C greedily to 40 marks, so adding to it deepens practice without
 * disturbing the three mocks' composition.
 *
 * ── Coverage ────────────────────────────────────────────────────
 * Real PM Section C questions draw on Areas B, C, D and E. The first file covers C, D and
 * E; these nine add Area B — where target costing, ABC and throughput accounting are
 * regularly examined at 20 marks — and deepen the other three:
 *
 *   Q07  B  ABC, and the product that was never profitable
 *   Q08  C  Multi-product CVP, breakeven charts and what the range means
 *   Q09  D  Material mix and yield, and deciding what to investigate
 *   Q10  E  Transfer pricing where one price cannot serve the whole quantity
 *   Q11  B  Throughput accounting when the optimal plan still loses money
 *   Q12  C  Relevant costing for a special order, with four traps in the data
 *   Q13  D  Fixed overhead variances, the operating statement and producing for stock
 *   Q14  E  Non-financial measures for a business measured on one financial ratio
 *   Q15  C  Risk and uncertainty — four decision rules over one payoff table
 *
 * All figures were verified by script before this file was committed.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

const Q07: WrittenQuestion = {
  id: "PMW-07",
  paper: "PM",
  area: "B",
  chapter: "PM-05",
  topic: "Activity-based costing and the product that was never profitable",
  maxMarks: 20,
  stem:
    "Marlcliff Ltd makes three products and absorbs its £1,890,000 of annual production overhead on direct labour hours, of which it expects 63,000.\n\n                      Alpha     Beta     Gamma\n  Annual output      30,000   12,000    4,000  units\n  Labour hours       45,000   12,000    6,000\n  Machine hours      30,000   10,000    5,000\n  Set-ups               300      600      900\n  Material movements    600      900    1,500\n  Selling price        £120      £95     £180  per unit\n  Direct cost           £58      £40      £62  per unit\n\nAn analysis of the overhead gives three pools: set-up costs of £540,000 driven by the 1,800 set-ups, materials handling of £450,000 driven by the 3,000 movements, and machining of £900,000 driven by the 45,000 machine hours.\n\nThe board regards Gamma as its most profitable product and is considering discontinuing Alpha, which it describes as \"high volume and low margin\".\n\nRequired:\n\n(a) Calculate the profit per unit of each product under the CURRENT absorption costing system. (4 marks)\n\n(b) Calculate the profit per unit of each product using activity-based costing. (8 marks)\n\n(c) Explain what the two sets of figures show, and advise the board on its view of Gamma and Alpha. (5 marks)\n\n(d) Explain what Marlcliff should investigate before taking any decision about Gamma, and state two limitations of the ABC analysis. (3 marks)",
  rubric: [
    "(a) Absorption rate correctly derived as £1,890,000/63,000 = £30 per labour hour (1 mark).",
    "(a) Overhead per unit: Alpha 1.5 hours × £30 = £45.00; Beta 1.0 × £30 = £30.00; Gamma 1.5 × £30 = £45.00 (1 mark).",
    "(a) Profit per unit: Alpha £120 − £58 − £45 = £17.00; Beta £95 − £40 − £30 = £25.00; Gamma £180 − £62 − £45 = £73.00 (2 marks).",
    "(b) Driver rates: set-ups £540,000/1,800 = £300; materials handling £450,000/3,000 = £150; machining £900,000/45,000 = £20 (3 marks).",
    "(b) Alpha overhead (300 × £300) + (600 × £150) + (30,000 × £20) = £780,000, over 30,000 units = £26.00 per unit (1 mark).",
    "(b) Beta overhead (600 × £300) + (900 × £150) + (10,000 × £20) = £515,000, over 12,000 units = £42.92 per unit (1 mark).",
    "(b) Gamma overhead (900 × £300) + (1,500 × £150) + (5,000 × £20) = £595,000, over 4,000 units = £148.75 per unit (1 mark).",
    "(b) ABC profit per unit: Alpha £36.00, Beta £12.08, Gamma LOSS of £30.75. Credit for checking that the three pools reallocate to £1,890,000 in total, so ABC has redistributed the overhead rather than created any (2 marks).",
    "(c) Explains the reversal: Gamma appeared to earn £73 a unit and actually loses £30.75, while Alpha appeared to earn £17 and actually earns £36 — so the board has its two conclusions exactly the wrong way round (2 marks).",
    "(c) Explains WHY: Gamma is 4,000 units of the 46,000 made, 8.7% of output, but consumes 50% of the set-ups and 50% of the material movements. Absorption on labour hours spreads batch-driven cost by volume, so it under-costs the small runs and over-costs the large ones (2 marks).",
    "(c) Advises AGAINST discontinuing Alpha, which is the company's most profitable product per unit under ABC and is subsidising the others under the current system (1 mark).",
    "(d) Investigate Gamma's ACTIVITY CONSUMPTION before withdrawing it — 900 set-ups for 4,000 units is roughly one per four units, so larger batches or set-up reduction may make it viable; and note that withdrawal would leave most of the £595,000 to be absorbed by Alpha and Beta (2 marks).",
    "(d) Limitations, one mark for any: facility-sustaining costs have no meaningful driver so arbitrariness survives; the driver data is costly to collect and must be maintained as processes change; the analysis is a single year's snapshot; and it says nothing about Gamma's strategic role in the range (1 mark).",
  ],
}

const Q08: WrittenQuestion = {
  id: "PMW-08",
  paper: "PM",
  area: "C",
  chapter: "PM-13",
  topic: "Multi-product CVP, breakeven charts and the range the breakeven point falls in",
  maxMarks: 20,
  stem:
    "Bidford Ltd sells three products. Budgeted results for next year are:\n\n                    Standard    Deluxe    Elite\n  Sales volume       24,000     9,000    3,000  units\n  Selling price         £30       £60     £150  per unit\n  Variable cost         £18       £33      £42  per unit\n\nBudgeted fixed costs are £570,000.\n\nThe sales director has proposed a promotion that would raise Standard's volume by 40% while leaving the other two unchanged. The finance director objects that \"growth in Standard raises our breakeven point rather than lowering it\".\n\nRequired:\n\n(a) Calculate the budgeted profit, the weighted average contribution to sales ratio, the breakeven revenue and the margin of safety as a percentage of budgeted revenue. (7 marks)\n\n(b) Calculate the EARLIEST and LATEST revenue at which the company could break even, and explain what the two figures mean. (6 marks)\n\n(c) Explain whether the finance director is right about the effect of the promotion on the breakeven point. (4 marks)\n\n(d) State three assumptions underlying your analysis and explain which is the most vulnerable here. (3 marks)",
  rubric: [
    "(a) Contribution per unit: Standard £12, Deluxe £27, Elite £108; total contribution £288,000 + £243,000 + £324,000 = £855,000 (2 marks).",
    "(a) Total revenue £720,000 + £540,000 + £450,000 = £1,710,000; budgeted profit £855,000 − £570,000 = £285,000 (2 marks).",
    "(a) Weighted average C/S ratio £855,000/£1,710,000 = 50%; breakeven revenue £570,000/0.50 = £1,140,000 (2 marks).",
    "(a) Margin of safety (£1,710,000 − £1,140,000)/£1,710,000 = 33.3%. Credit also for the unit route: weighted average contribution £855,000/36,000 = £23.75, breakeven 570,000/23.75 = 24,000 units (1 mark).",
    "(b) C/S ratios computed per product — Elite 72%, Deluxe 45%, Standard 40% — and the products correctly ordered by them (1 mark).",
    "(b) EARLIEST breakeven, most profitable first: Elite £450,000 revenue gives £324,000 of contribution, leaving £246,000; Deluxe's full £540,000 gives £243,000, leaving £3,000; Standard covers it with £7,500 of revenue. Cumulative £997,500 (2 marks).",
    "(b) LATEST breakeven, least profitable first: Standard £720,000 gives £288,000, leaving £282,000; Deluxe £540,000 gives £243,000, leaving £39,000; Elite covers it with £54,167 of revenue. Cumulative £1,314,167 (2 marks).",
    "(b) Explains that both are real: the actual breakeven point depends on the ORDER in which products sell, so it lies somewhere in the £997,500 to £1,314,167 range, and the £1,140,000 constant-mix figure is only one point within it. Management's conclusion is that mix, not just volume, determines when the company starts making money (1 mark).",
    "(c) Recomputes with Standard at 33,600 units: contribution £403,200 + £243,000 + £324,000 = £970,200 on revenue £1,008,000 + £540,000 + £450,000 = £1,998,000, a weighted average C/S ratio of 48.6% (2 marks).",
    "(c) New breakeven revenue £570,000/0.4856 = £1,173,800, so the finance director is RIGHT that breakeven REVENUE rises — the mix has shifted towards the lowest C/S product (1 mark).",
    "(c) But qualifies it: profit rises from £285,000 to £400,200 and the margin of safety improves from 33.3% to 41.3%, so the higher breakeven point is not an argument against the promotion. A rising breakeven revenue with a rising margin of safety is a better position, not a worse one (1 mark).",
    "(d) Assumptions, one mark each for any three: the sales mix is constant; selling price is constant at all volumes; variable cost per unit is constant; fixed costs are constant over the relevant range; and production equals sales so there is no inventory movement (2 marks).",
    "(d) Identifies the CONSTANT SELLING PRICE assumption as most vulnerable here, because the promotion raising Standard's volume by 40% almost certainly involves a discount, which would reduce its £12 contribution and change every figure in part (c) (1 mark).",
  ],
}

const Q09: WrittenQuestion = {
  id: "PMW-09",
  paper: "PM",
  area: "D",
  chapter: "PM-25",
  topic: "Material mix and yield, and deciding what is worth investigating",
  maxMarks: 20,
  stem:
    "Ripple Foods blends three materials. The standard mix for every 500 kg of input is 300 kg of P at £3.00 per kg, 150 kg of Q at £7.00 per kg and 50 kg of R at £12.00 per kg, and the standard output is 450 kg of finished product from every 500 kg of input.\n\nIn September the actual input was 61,200 kg of P, 32,400 kg of Q and 10,400 kg of R, and output was 91,800 kg of finished product. Actual prices equalled standard.\n\nThe operations director reports that Q's usual supplier was unable to deliver in the second week and a substitute grade was bought, and that the blending line was recalibrated mid-month after a maintenance visit. He proposes investigating every variance the system reports.\n\nRequired:\n\n(a) Calculate the standard weighted average price per kg of input and the total material usage variance. (5 marks)\n\n(b) Split the usage variance into its mix and yield elements, and demonstrate that they reconcile to your answer in (a). (7 marks)\n\n(c) Interpret the two variances together, explaining what they suggest happened in September. (4 marks)\n\n(d) Advise the operations director on how to decide which variances to investigate, and explain why investigating every variance is not the right policy. (4 marks)",
  rubric: [
    "(a) Standard cost of the mix (300 × £3) + (150 × £7) + (50 × £12) = £900 + £1,050 + £600 = £2,550 per 500 kg, giving a weighted average of £5.10 per kg of input (2 marks).",
    "(a) Standard input for the actual output = 91,800 × 500/450 = 102,000 kg, costing 102,000 × £5.10 = £520,200 (1 mark).",
    "(a) Actual input at standard prices = (61,200 × £3) + (32,400 × £7) + (10,400 × £12) = £183,600 + £226,800 + £124,800 = £535,200, so the total usage variance is £15,000 ADVERSE (2 marks).",
    "(b) Total actual input 104,000 kg restated in the standard 60:30:10 mix as P 62,400, Q 31,200, R 10,400 (2 marks).",
    "(b) Mix variance by material: P (62,400 − 61,200) × £3 = £3,600 F; Q (31,200 − 32,400) × £7 = £8,400 A; R (10,400 − 10,400) × £12 = nil. Total £4,800 ADVERSE (3 marks).",
    "(b) Yield variance (102,000 − 104,000) × £5.10 = £10,200 ADVERSE (1 mark).",
    "(b) Reconciliation: £4,800 A + £10,200 A = £15,000 A, agreeing to part (a) (1 mark).",
    "(c) Identifies this as the WORST of the four combinations — an adverse mix AND an adverse yield — meaning a dearer blend that also produced less, so there is no offsetting saving to weigh against the loss (2 marks).",
    "(c) Links the mix variance to the substitute grade of Q: 1,200 kg more of the £7 material was used than the standard mix required, which is consistent with a substitution forced by the supply failure rather than chosen for cost (1 mark).",
    "(c) Links the yield variance to either the substitute material's quality or the mid-month recalibration, and notes that 2,000 kg of input was effectively wasted. Also notes what the variances CANNOT show: whether the substitute grade affected the finished product's quality, which would appear later as complaints rather than as a variance (1 mark).",
    "(d) Sets out the tests: materiality in both absolute and percentage terms; controllability; the TREND over several periods; cost of investigating against the recoverable benefit; and whether the standard is still reliable (2 marks).",
    "(d) Applies them: the £10,200 yield variance is both material and controllable and should be investigated; the mix variance has a known and uncontrollable cause — the supply failure — so it is information for purchasing rather than a task for production (1 mark).",
    "(d) Explains why investigating everything is wrong: management time is the scarcest resource, investigating a variance whose cause has already passed recovers nothing, and a policy that flags everything is indistinguishable from a policy that flags nothing. Adds that FAVOURABLE variances also merit investigation, since they can indicate a loose standard or quality being cut (1 mark).",
  ],
}

const Q10: WrittenQuestion = {
  id: "PMW-10",
  paper: "PM",
  area: "E",
  chapter: "PM-32",
  topic: "Transfer pricing where one price cannot serve the whole quantity",
  maxMarks: 20,
  stem:
    "Draycott Group has two divisions. The Component division makes a part with a variable cost of £46 per unit, has capacity for 40,000 units a year, and can sell 34,000 units externally at £88 each. The Assembly division needs 10,000 of the parts a year and can buy an equivalent part from an outside supplier at £80.\n\nHead office has instructed the Component division to transfer all 10,000 units to Assembly at full cost plus 20%, which it has calculated as £46 variable cost plus £24 of absorbed fixed overhead, giving a transfer price of £84.\n\nBoth divisional managers have objected. Assembly's manager says he can buy the part for £80 and will not pay £84. Component's manager says £84 is below what he can obtain externally.\n\nRequired:\n\n(a) Calculate the minimum transfer price the Component division should accept, distinguishing the units it has spare capacity to make from those that would displace an external sale. (6 marks)\n\n(b) Determine the transfer quantity that maximises GROUP profit, and quantify the benefit of that arrangement over transferring all 10,000 units at £84. (6 marks)\n\n(c) Explain why no single transfer price can produce the optimal outcome here, and recommend an arrangement that would. (5 marks)\n\n(d) Explain the four objectives a transfer pricing policy must serve, and identify which two head office's instruction has sacrificed. (3 marks)",
  rubric: [
    "(a) Spare capacity correctly identified as 40,000 − 34,000 = 6,000 units (1 mark).",
    "(a) For those 6,000 units the minimum price is the marginal cost of £46, because nothing is forgone — the £24 of absorbed fixed overhead is incurred whether the transfer happens or not (2 marks).",
    "(a) For the remaining 4,000 units the minimum price is £46 marginal cost plus £42 of contribution forgone on the displaced external sale = £88, which is the market price (2 marks).",
    "(a) The buying division's ceiling is its external purchase price of £80 (1 mark).",
    "(b) Concludes 6,000 units SHOULD transfer: the range is £46 to £80 and the group saves £80 − £46 = £34 a unit, being £204,000 (2 marks).",
    "(b) Concludes the other 4,000 should NOT transfer: the floor of £88 exceeds the £80 ceiling, so the group is better off with Component selling externally at £88 and Assembly buying in at £80, by £8 a unit or £32,000 (2 marks).",
    "(b) Quantifies the benefit over head office's instruction: transferring all 10,000 forgoes 4,000 external sales worth £42 of contribution each, £168,000, while saving Assembly only £34 a unit on those units, £136,000 — a net loss to the group of £32,000 (2 marks).",
    "(c) Explains that the correct price DIFFERS between the two blocks of units — £46 to £80 for the first 6,000 and no feasible price for the last 4,000 — so a single figure must be wrong for at least one of them (2 marks).",
    "(c) Recommends an arrangement that handles both, one mark for a workable option with its reasoning: a two-part arrangement transferring the first 6,000 at marginal cost or a negotiated price within the range while Assembly sources the balance externally; DUAL PRICING, crediting Component at £88 and charging Assembly £46 with head office absorbing the difference; or marginal cost plus a fixed annual fee, so Assembly's marginal decisions are congruent while Component still earns a return (2 marks).",
    "(c) Notes the cost of each: dual pricing means divisional profits no longer sum to group profit and needs a central adjustment each period, and negotiation consumes management time and depends on relative bargaining power (1 mark).",
    "(d) States the four: goal congruence, fair divisional performance measurement, divisional autonomy, and practicality — with the observation that no price satisfies all four (2 marks).",
    "(d) Identifies AUTONOMY as sacrificed — the price was imposed, and both managers have rejected it — and GOAL CONGRUENCE as sacrificed too, since the instruction costs the group £32,000. Adds that fair measurement is also compromised, because Component's reported profit now depends on a head office decision rather than on its own performance (1 mark).",
  ],
}

const Q11: WrittenQuestion = {
  id: "PMW-11",
  paper: "PM",
  area: "B",
  chapter: "PM-08",
  topic: "Throughput accounting when the optimal plan still loses money",
  maxMarks: 20,
  stem:
    "Snitterfield Ltd makes three products, all of which pass through a single heat-treatment furnace that is the factory's bottleneck. The furnace is available for 2,160 hours a month and total factory operating expenses are £1,296,000 a month.\n\n                          X        Y        Z\n  Selling price         £180     £240     £310  per unit\n  Direct material        £75      £96     £100  per unit\n  Direct labour          £34      £41      £52  per unit\n  Furnace time        12 min   15 min   20 min  per unit\n  Monthly demand       4,000    3,000    2,400  units\n\nThe production manager currently schedules the furnace in order of contribution per unit, and reports that the factory has made a loss in each of the last four months.\n\nRequired:\n\n(a) Calculate the throughput per furnace hour and the throughput accounting ratio for each product. (7 marks)\n\n(b) Determine the production plan that maximises throughput, and calculate the profit or loss it produces. (6 marks)\n\n(c) Explain what your answer to (b) tells management, and recommend what they should do about it. (4 marks)\n\n(d) Explain why ranking by contribution per unit gives the wrong answer here, and state the five steps of the theory of constraints. (3 marks)",
  rubric: [
    "(a) Throughput per unit = selling price less DIRECT MATERIAL only: X £105, Y £144, Z £210. Labour is NOT deducted, being a fixed operating expense in the short run (2 marks).",
    "(a) Throughput per furnace hour: X £105/0.20 = £525; Y £144/0.25 = £576; Z £210/0.3333 = £630 (2 marks).",
    "(a) Cost per furnace hour = £1,296,000/2,160 = £600 (1 mark).",
    "(a) TPARs: X £525/£600 = 0.875; Y £576/£600 = 0.96; Z £630/£600 = 1.05. Only Z exceeds 1 (2 marks).",
    "(b) Ranks Z, Y, X by throughput per furnace hour, and confirms the constraint binds: total hours required 800 + 750 + 800 = 2,350 against 2,160 available (1 mark).",
    "(b) Allocates: Z 2,400 units using 800 hours for £504,000; Y 3,000 units using 750 hours for £432,000; leaving 610 hours for X, giving 3,050 units for £320,250 (3 marks).",
    "(b) Total throughput £1,256,250 less operating expenses £1,296,000 = a LOSS of £39,750 (2 marks).",
    "(c) States the finding plainly: even the OPTIMAL plan loses £39,750 a month, so the problem is not scheduling — the factory cannot cover its operating expenses at the current bottleneck capacity, prices and material costs (2 marks).",
    "(c) Recommends acting on the constraint itself, one mark for any two with reasoning: elevate the furnace with a second unit, an extra shift or subcontracting; exploit it better by moving set-ups, maintenance and inspection off the bottleneck so no furnace hour is lost; reduce furnace time per unit through process or product redesign; raise prices or reduce material cost, since both raise throughput per hour; and reduce operating expenses, which lowers the £600 cost per bottleneck hour that every TPAR is measured against (2 marks).",
    "(d) Explains that contribution per unit deducts labour and ranks by the wrong denominator: Z has the highest unit contribution AND the highest throughput per hour here, but X and Y reverse — X's £105 throughput over 12 minutes beats Y's £144 over 15 minutes on a per-unit view of contribution while losing on furnace time, so scheduling by unit contribution wastes the scarce resource (2 marks).",
    "(d) States the five steps in order: identify the constraint, exploit it, subordinate everything else to it, elevate it, then return to step one — because elevating one constraint creates another elsewhere (1 mark).",
  ],
}

const Q12: WrittenQuestion = {
  id: "PMW-12",
  paper: "PM",
  area: "C",
  chapter: "PM-11",
  topic: "Relevant costing for a special order",
  maxMarks: 20,
  stem:
    "Wixford Ltd has been asked to quote for a one-off order of 2,000 units of a special product. The following information is available.\n\n  Material A: 3 kg per unit is needed. 4,000 kg is in stock, bought at £9.00 per kg. Material A is in regular use and its current purchase price is £11.00 per kg.\n\n  Material B: 2 kg per unit is needed. 5,000 kg is in stock, bought at £6.00 per kg. It has no other use in the business and would otherwise be sold for scrap at £2.00 per kg.\n\n  Skilled labour: 4 hours per unit at £16.00 per hour. Skilled staff are fully employed on other work that generates a contribution of £9.00 per labour hour after their wage.\n\n  Unskilled labour: 2 hours per unit at £11.00 per hour. There is spare unskilled capacity and no other work would be displaced.\n\n  Machine time: 1.5 hours per unit. Incremental power and maintenance cost £4.00 per machine hour, and fixed overhead is absorbed at £22.00 per machine hour. The machine has spare capacity.\n\n  Supervision: an existing supervisor on a salary of £48,000 a year would be reassigned to the order. A temporary replacement for their normal duties would be engaged at a cost of £14,000.\n\n  Development work already carried out on the product cost £35,000.\n\nThe customer has offered £340,000 for the order.\n\nRequired:\n\n(a) Prepare a relevant cost statement for the order, giving a brief reason for the treatment of EACH item. (12 marks)\n\n(b) State the minimum price Wixford could accept and advise on the customer's offer. (3 marks)\n\n(c) Explain what a relevant cost statement does NOT tell management, identifying the factors that could still make rejection correct. (5 marks)",
  rubric: [
    "(a) Material A: in REGULAR USE, so taking it means replacing it — 6,000 kg × £11.00 replacement price = £66,000. The £9.00 historical cost is sunk and irrelevant (2 marks).",
    "(a) Material B: no other use, so the relevant cost is the SCRAP PROCEEDS FORGONE on the 4,000 kg required — 4,000 × £2.00 = £8,000. The £6.00 purchase price is sunk, and the surplus 1,000 kg is unaffected by the decision (2 marks).",
    "(a) Skilled labour: fully employed, so the relevant cost is the wage plus the contribution forgone — 8,000 hours × (£16.00 + £9.00) = £200,000 (3 marks).",
    "(a) Unskilled labour: NIL. There is spare capacity, so the wage is paid whether or not the order is taken and no other work is displaced (2 marks).",
    "(a) Machine: incremental running cost only, 3,000 hours × £4.00 = £12,000. The £22.00 absorbed fixed overhead is an apportionment of costs incurred anyway and is excluded (2 marks).",
    "(a) Supervision: the existing supervisor's £48,000 salary is NOT relevant, being paid either way, but the £14,000 temporary replacement IS incremental and caused by the order (2 marks).",
    "(a) Development: the £35,000 already spent is SUNK and excluded. Total relevant cost £66,000 + £8,000 + £200,000 + £0 + £12,000 + £14,000 = £300,000 (1 mark).",
    "(b) Minimum price £300,000, or £150.00 per unit (1 mark).",
    "(b) Advises that the £340,000 offer exceeds the relevant cost by £40,000, so on financial grounds alone the order is worth accepting (1 mark).",
    "(b) Notes that £150 per unit is a FLOOR, not a price: it recovers no fixed cost and no profit, so it is only defensible for a genuine one-off with spare capacity (1 mark).",
    "(c) Explains that relevant costing answers one narrow question — is accepting better than rejecting, in cash, for this order alone — and is silent on everything else (1 mark).",
    "(c) PRECEDENT and existing customers: if regular customers learn the price, they will expect it, and this customer will expect it again. The £40,000 gain can be outweighed many times over (2 marks).",
    "(c) Opportunity cost of the capacity: accepting commits skilled labour and machine time that a better order might need, and the analysis assumes the current alternative use is the best one available (1 mark).",
    "(c) Other factors, one mark for any: reputational or quality risk on a non-standard product; the reliability of the £9.00 contribution figure used to value displaced work; whether the customer is creditworthy; and whether the order would disrupt existing production schedules (1 mark).",
  ],
}

const Q13: WrittenQuestion = {
  id: "PMW-13",
  paper: "PM",
  area: "D",
  chapter: "PM-24",
  topic: "Fixed overhead variances, the operating statement and producing for stock",
  maxMarks: 20,
  stem:
    "Salford Ltd operates a standard ABSORPTION costing system. Budgeted fixed production overhead was £288,000 for production of 8,000 units, absorbed on labour hours at a standard 3 hours per unit. Standard contribution is £52 per unit.\n\nActual results for the month were: production 8,600 units; sales 8,000 units, as budgeted; 25,400 labour hours worked; fixed production overhead incurred £301,400; and actual contribution earned £427,600.\n\nThe production director's report to the board leads with \"£43,200 of favourable overhead variances\" and asks for the month's performance to be recognised. Inventory rose over the month.\n\nRequired:\n\n(a) Calculate the fixed overhead expenditure, volume, capacity and efficiency variances, and demonstrate the arithmetic relationship between them. (8 marks)\n\n(b) Prepare a statement reconciling budgeted profit to actual profit under ABSORPTION costing, and calculate what actual profit would have been under MARGINAL costing. (6 marks)\n\n(c) Explain the difference between the two profit figures. (3 marks)\n\n(d) Advise the board on the production director's request. (3 marks)",
  rubric: [
    "(a) Absorption rates: £288,000/(8,000 × 3) = £12 per labour hour, and £36 per unit (1 mark).",
    "(a) Expenditure variance £288,000 − £301,400 = £13,400 ADVERSE (2 marks).",
    "(a) Volume variance (8,600 − 8,000) × £36 = £21,600 FAVOURABLE (2 marks).",
    "(a) Capacity variance (25,400 − 24,000) × £12 = £16,800 FAVOURABLE (1 mark).",
    "(a) Efficiency variance: standard hours for actual output 8,600 × 3 = 25,800, so (25,800 − 25,400) × £12 = £4,800 FAVOURABLE (1 mark).",
    "(a) Demonstrates that capacity £16,800 F plus efficiency £4,800 F equals the volume variance of £21,600 F (1 mark).",
    "(b) Budgeted profit (8,000 × £52) − £288,000 = £416,000 − £288,000 = £128,000, with a statement that sales equalled budget so there is no sales volume variance (2 marks).",
    "(b) Absorption reconciliation: £128,000 + contribution movement (£427,600 − £416,000 = £11,600 F) + volume £21,600 F − expenditure £13,400 A = £147,800 (3 marks).",
    "(b) Marginal costing profit: actual contribution £427,600 less actual fixed overhead £301,400 = £126,200. Credit for noting that the volume variance does NOT appear, fixed overhead being a period cost (1 mark).",
    "(c) Identifies the £21,600 difference as the fixed overhead carried in closing inventory: 600 units of over-production at £36 per unit (2 marks).",
    "(c) Explains that because sales equalled budget, that figure is also exactly the volume variance — the 600 units of over-production that absorbed extra overhead are the same 600 units sitting unsold (1 mark).",
    "(d) Advises AGAINST recognising the month as a success: the £43,200 of favourable variances is over-absorption arising from producing 600 units nobody bought, not a saving. It has moved £21,600 of cost into the balance sheet while consuming cash in inventory (2 marks).",
    "(d) Notes that the only variance about SPENDING is £13,400 adverse, and recommends reporting Section-level performance on a marginal costing basis internally, so that producing for stock stops being rewarded — the same reason just-in-time and throughput accounting exist (1 mark).",
  ],
}

const Q14: WrittenQuestion = {
  id: "PMW-14",
  paper: "PM",
  area: "E",
  chapter: "PM-30",
  topic: "Non-financial measures for a business run on one financial ratio",
  maxMarks: 20,
  stem:
    "Kinwarton Logistics operates 220 vehicles delivering for retail clients. The board measures depot managers on a single indicator — cost per mile — and pays their bonus on it.\n\n                                        Last year   This year\n  Cost per mile                             £1.42       £1.28\n  Revenue                              £46.8m      £44.0m\n  On-time delivery                            94%         81%\n  Customer retention                          91%         76%\n  Driver turnover                             14%         38%\n  Average vehicle age                    3.2 years   5.1 years\n  Reportable accidents per million miles       2.1         2.9\n  Maintenance spend                       £3.9m       £2.4m\n\nThe chief executive has described the year as \"a 10% efficiency improvement\" and cannot explain why revenue has fallen.\n\nRequired:\n\n(a) Using the data provided, explain what has actually happened at Kinwarton and why revenue has fallen despite the improvement in cost per mile. (7 marks)\n\n(b) Explain the specific distortions that a single financial measure with a bonus attached has produced here, naming each. (5 marks)\n\n(c) Recommend a balanced scorecard for Kinwarton, giving two measures for each perspective and explaining why each suits THIS business. (6 marks)\n\n(d) Explain the two things Kinwarton must do for the scorecard to change any behaviour. (2 marks)",
  rubric: [
    "(a) Identifies that cost per mile improved because COST WAS CUT, not because efficiency rose — maintenance spend fell 38% from £3.9m to £2.4m while average vehicle age rose from 3.2 to 5.1 years (2 marks).",
    "(a) Traces the causal chain: deferred maintenance and older vehicles produce breakdowns and late deliveries, so on-time delivery fell 13 points; poor service loses customers, so retention fell 15 points; and lost customers are why revenue fell £2.8m (2 marks).",
    "(a) Identifies the second chain: driver turnover nearly tripled from 14% to 38%, so vehicles are increasingly driven by inexperienced staff — consistent with accidents rising from 2.1 to 2.9 per million miles, and itself a further cause of late delivery (2 marks).",
    "(a) Concludes that the £0.14 saved per mile has cost £2.8m of revenue, and that the fleet now carries a replacement liability and a safety record that will both cost more to fix than the saving (1 mark).",
    "(b) MEASURE FIXATION: cost per mile is pursued rather than the profitable delivery of goods on time, which is what the business is for (1 mark).",
    "(b) TUNNEL VISION: service quality, staff retention, safety and asset condition are unmeasured and therefore unmanaged, so all four were free to deteriorate (1 mark).",
    "(b) SHORT-TERMISM / MYOPIA: deferring maintenance improves this year's measure and pushes the cost into future years, when the current managers may not be in post (1 mark).",
    "(b) Explains that the bonus is the mechanism, not an aggravating factor: managers were paid to improve the one measure most easily improved by damaging the business, so the deterioration is a rational response to the scheme (2 marks).",
    "(c) FINANCIAL: cost per mile RETAINED but paired with revenue per vehicle or contribution per client, so cost reduction that loses revenue no longer looks like success (1.5 marks).",
    "(c) CUSTOMER: on-time delivery percentage and customer retention rate, being the two measures that moved first and that the clients themselves judge Kinwarton on. Credit also for damage or claims per thousand deliveries (1.5 marks).",
    "(c) INTERNAL PROCESS: vehicle availability or unplanned downtime, and reportable accidents per million miles — both directly reflect the maintenance decision and the safety consequence. Credit also for average vehicle age (1.5 marks).",
    "(c) INNOVATION AND LEARNING: driver turnover and training days or hours per driver, since 38% turnover is the leading indicator of everything else on the list and is the first thing to fix (1.5 marks).",
    "(d) The REWARD SCHEME must change with the measures. A scorecard reported alongside a bonus still based on cost per mile changes nothing, because the incentive continues to point where it always did — this is the most common reason a scorecard fails in practice (1 mark).",
    "(d) The measures must be FEW and PRIORITISED with explicit targets, so managers are not left to resolve the conflicts between them — and the causal chain from driver retention through vehicle condition to on-time delivery and revenue should be made explicit, so the scorecard reads as one argument rather than four lists (1 mark).",
  ],
}

const Q15: WrittenQuestion = {
  id: "PMW-15",
  paper: "PM",
  area: "C",
  chapter: "PM-19",
  topic: "Risk and uncertainty: four decision rules over one payoff table",
  maxMarks: 20,
  stem:
    "Hillborough Ltd is choosing the scale at which to launch a new product. Three options are available and the outcome depends on how demand develops. Profits over the product's life, in £000, would be:\n\n                    Low demand   Medium demand   High demand\n  Small plant            420           420            420\n  Medium plant           280           610            610\n  Large plant             60           480            940\n\nThe marketing department estimates the probabilities of low, medium and high demand as 0.25, 0.45 and 0.30 respectively.\n\nThe finance director is uneasy: the company has limited reserves and a poor outcome would be difficult to absorb. The sales director points out that the probabilities are \"a considered guess rather than a measurement\".\n\nRequired:\n\n(a) Determine the option chosen under EACH of the expected value, maximin, maximax and minimax regret criteria, showing your workings including a full regret table. (11 marks)\n\n(b) Calculate the maximum amount Hillborough should pay for perfect information about demand, and explain what that figure does and does not buy. (4 marks)\n\n(c) Advise Hillborough which option to choose, taking account of both directors' comments. (3 marks)\n\n(d) Explain why an expected value is a weak basis for this particular decision, and name one technique that would address the weakness. (2 marks)",
  rubric: [
    "(a) Expected values: Small £420,000; Medium (0.25 × 280) + (0.45 × 610) + (0.30 × 610) = 70 + 274.5 + 183 = £527,500; Large (0.25 × 60) + (0.45 × 480) + (0.30 × 940) = 15 + 216 + 282 = £513,000. EV chooses MEDIUM (4 marks).",
    "(a) Maximin: worst outcomes are £420,000, £280,000 and £60,000, so maximin chooses SMALL at £420,000 (2 marks).",
    "(a) Maximax: best outcomes are £420,000, £610,000 and £940,000, so maximax chooses LARGE at £940,000 (1 mark).",
    "(a) Regret table constructed from the best payoff in each demand state — £420, £610 and £940 respectively. Small: 0 / 190 / 520. Medium: 140 / 0 / 330. Large: 360 / 130 / 0 (3 marks).",
    "(a) Maximum regrets £520,000, £330,000 and £360,000, so minimax regret chooses MEDIUM (1 mark).",
    "(b) Expected value WITH perfect information: (0.25 × 420) + (0.45 × 610) + (0.30 × 940) = 105 + 274.5 + 282 = £661,500 (2 marks).",
    "(b) Value of perfect information = £661,500 − £527,500 = £134,000, being the improvement over the best decision available without it (1 mark).",
    "(b) Explains what it buys and what it does not: it lets the right plant be chosen for each demand state, but it does NOT remove the risk that demand is low — under low demand the best achievable is still £420,000. And it is a ceiling: imperfect market research is worth less (1 mark).",
    "(c) Notes that three of the four criteria — EV, minimax regret, and arguably the balance of the analysis — point to MEDIUM, and that Medium is never the worst option under any demand state (1 mark).",
    "(c) Takes the finance director's point seriously: the company has limited reserves, so the £60,000 downside of Large is a genuine risk of distress and Large should be rejected despite its £940,000 upside. Medium's worst case of £280,000 is survivable, while Small's guaranteed £420,000 forgoes £107,500 of expected value for certainty (1 mark).",
    "(c) Recommends MEDIUM, with a stated basis: it wins on expected value, wins on minimax regret, and its downside is one the company can absorb. Credit for a reasoned recommendation of Small on risk-aversion grounds provided the £107,500 of expected value forgone is quantified (1 mark).",
    "(d) Explains that an expected value is a LONG-RUN AVERAGE and this is a ONE-OFF decision — £527,500 is not one of the possible outcomes and will never be received. It also ignores the SPREAD of outcomes and the decision maker's attitude to risk, which is exactly the finance director's concern; and the sales director is right that estimated probabilities make it a weighted opinion rather than a measurement (1 mark).",
    "(d) Names a technique that addresses it, with a reason: SIMULATION, which produces a distribution of outcomes rather than a single average so the probability of a poor result is visible; or SENSITIVITY ANALYSIS, which shows how far the probabilities would have to move before the decision changes — particularly useful given that the probabilities are estimated (1 mark).",
  ],
}

export const PM_WRITTEN_KIT2: WrittenQuestion[] = [Q07, Q08, Q09, Q10, Q11, Q12, Q13, Q14, Q15]
