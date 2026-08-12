/*
 * MA Area E — Standard costing.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * The second of MA's three multi-task topics. Variances are where candidates lose
 * most marks in this paper, and almost never because they cannot subtract — it is
 * because they use actual quantity where standard quantity belongs, or report an
 * adverse variance as favourable. So the plans here impose one structure on every
 * variance and one direction check on every answer, rather than teaching seven
 * separate formulae.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const MA_PLANS_E: ExamPlanMap = {
  /* ── MA-21 · Standard costing systems ───────────────────────── */

  "MA-21::purpose": {
    title: "What a standard cost is for",
    format: "ot",
    marks: 2,
    requirement:
      "A standard cost is best described as:\n\nA  The actual cost incurred in the previous period\nB  A predetermined cost of one unit under specified working conditions\nC  The lowest cost at which a unit could theoretically be made\nD  The average cost of all units made this year",
    plan: [
      {
        step: "Break the definition into its two essential words",
        detail:
          "PREDETERMINED — set in advance, not observed afterwards — and PER UNIT. Both are essential: a standard fixed after the event could not be a control benchmark, and a total is not a standard.",
      },
      {
        step: "Eliminate the two backward-looking options",
        detail:
          "Last period's actual cost and this year's average are both historical. Comparing against last period's actual perpetuates whatever inefficiency it contained.",
      },
      {
        step: "Distinguish the standard from the ideal",
        detail:
          "Option C describes an IDEAL standard — perfect conditions, no waste, no idle time. That is one type of standard, not the definition, and it is the type generally regarded as demotivating.",
      },
      {
        step: "Name what a standard enables",
        detail:
          "Variance analysis, budget preparation, inventory valuation and performance measurement all rest on a per-unit expectation existing before the period begins.",
      },
    ],
    answer:
      "**B — a predetermined cost of one unit under specified working conditions.**\n\nBoth halves matter. **Predetermined** means set in advance, so it can act as a benchmark; a figure derived after the event cannot control anything. **Per unit** means it flexes with output, which is what makes variance analysis possible.\n\nA and D are historical: comparing against last period's actual cost builds in whatever inefficiency last period contained.\n\nC describes an **ideal** standard — perfect conditions, no waste, no idle time. That is one of the four types rather than the definition, and it is the one generally regarded as demotivating because it can never be achieved.",
    earns: ["Requiring both \"predetermined\" and \"per unit\" before accepting a definition"],
    loses: ["Choosing the ideal standard, which is a type rather than the definition"],
  },

  "MA-21::types-of-standard": {
    title: "Choosing the type of standard and its motivational effect",
    format: "ot",
    marks: 2,
    requirement:
      "Which type of standard makes no allowance for wastage, machine breakdown or idle time?\n\nA  Basic\nB  Ideal\nC  Attainable\nD  Current",
    plan: [
      {
        step: "Define the four types",
        detail:
          "Basic: unchanged over a long period, used to show trends. Ideal: perfect conditions, no allowance for any loss. Attainable: efficient working with normal allowances. Current: reflects conditions actually prevailing now.",
      },
      {
        step: "Match the stem's description",
        detail:
          "\"No allowance for wastage, breakdown or idle time\" is the ideal standard's definition stated in full. The stem is a paraphrase of the term.",
      },
      {
        step: "Know why the type matters",
        detail:
          "It determines what the variances mean. Against an ideal standard every variance is adverse, because perfection is never reached, so the report carries no information about whether performance was good.",
      },
      {
        step: "Name the type actually recommended",
        detail:
          "Attainable — tough but achievable with efficient working. It motivates because it can be met, and its variances signal genuine departures from expected performance rather than the impossibility of the target.",
      },
    ],
    answer:
      "**B — ideal.**\n\nThe four types are **basic** (unchanged over a long period, used to show trends), **ideal** (perfect conditions, no allowance for any loss), **attainable** (efficient working with normal allowances for waste and downtime) and **current** (reflecting conditions actually prevailing).\n\nThe type determines what the variances mean. Against an **ideal** standard every variance is adverse, because perfection is never achieved — so the report says nothing about whether performance was good, and demotivates by setting a target that cannot be met.\n\n**Attainable** is the type generally recommended: tough but achievable, so it motivates, and its variances signal genuine departures from expected performance.",
    earns: ["Explaining what the choice of standard does to the meaning of the variances"],
    loses: ["Treating the four types as interchangeable labels"],
  },

  "MA-21::setting-and-reviewing": {
    title: "When a standard must be revised",
    format: "ot",
    marks: 2,
    requirement:
      "A company has reported an adverse material price variance in each of the last twelve months, of a similar size each time. The most likely explanation is that:\n\nA  The purchasing manager has performed poorly every month\nB  The standard price is out of date\nC  Production has used more material than standard\nD  The material usage standard is too tight",
    plan: [
      {
        step: "Read the pattern, not the individual variance",
        detail:
          "Twelve consecutive adverse variances of similar size is a trend, not a series of incidents. A trend points at the standard, since performance fluctuating around a correct standard would produce variances in both directions.",
      },
      {
        step: "Match the variance type to what it measures",
        detail:
          "A PRICE variance concerns what was paid per unit of material. So the explanation must be about price — either what was paid or what the standard says it should cost.",
      },
      {
        step: "Eliminate the options about the wrong variance",
        detail:
          "C and D both concern usage — how much material was consumed — which is a different variance entirely and would not affect the price variance at all.",
      },
      {
        step: "Choose between poor performance and a stale standard",
        detail:
          "Consistent adverse results of similar size in a period of rising prices point to a standard set before the increase. Blaming the buyer for twelve months without ever revising the standard is the failure the topic warns about.",
      },
    ],
    answer:
      "**B — the standard price is out of date.**\n\nA persistent one-directional variance of similar size is a **trend**, and trends point at the standard rather than at performance. Performance fluctuating around a correct standard produces variances in both directions.\n\nOptions C and D describe **usage** — how much material was consumed — which drives a different variance and does not touch the price variance at all. Matching the explanation to the variance type eliminates half the list immediately.\n\nThat leaves a genuinely poor buyer against a stale standard, and twelve consecutive similar results in a period of rising prices points to a standard set before the increase. Standards must be **reviewed regularly**, and continuing to report against a stale one produces variances that measure the calendar rather than performance.",
    earns: [
      "Reading a run of similar variances as evidence about the standard",
      "Matching the explanation to the specific variance type",
    ],
    loses: ["Offering a usage explanation for a price variance"],
  },

  /* ── MA-22 · Variance calculation and analysis ───────────────── */

  "MA-22::the-structure": {
    title: "The one structure behind every variance",
    format: "ot",
    marks: 2,
    requirement:
      "Standard material cost is 4 kg at $5 per kg. Actual production was 2,000 units, using 8,400 kg costing $40,320. The material **usage** variance is:\n\nA  $2,000 adverse\nB  $2,000 favourable\nC  $1,680 favourable\nD  $400 adverse",
    plan: [
      {
        step: "Fix the two-variance structure once and use it everywhere",
        detail:
          "A PRICE (or rate) variance compares what was paid with what should have been paid for the ACTUAL quantity. A USAGE (or efficiency) variance compares actual quantity with the quantity the actual output should have taken, valued at STANDARD price.",
      },
      {
        step: "Compute the standard quantity for actual output",
        detail:
          "2,000 units × 4 kg = 8,000 kg. This is the figure candidates most often omit — comparing 8,400 kg against a budgeted quantity for a different output level is the classic error.",
      },
      {
        step: "Take the quantity difference at standard price",
        detail:
          "8,400 actual − 8,000 standard = 400 kg extra, valued at the standard $5 = **$2,000**. Usage variances are always valued at standard price, so that the price effect does not contaminate them.",
      },
      {
        step: "Assign the direction in words, never by sign",
        detail:
          "More material was used than the output should have needed, which costs money, so it is **adverse**. Saying it in words is faster and safer than tracking a sign convention.",
      },
    ],
    answer:
      "**A — $2,000 adverse.**\n\nStandard quantity for actual output = 2,000 × 4 kg = **8,000 kg**.\nActual quantity = 8,400 kg, so 400 kg more was used.\nValued at the standard price: 400 × $5 = **$2,000 adverse**.\n\nThe usage variance is always valued at **standard** price, so the price effect stays out of it — otherwise a single variance would blend two unrelated causes and neither manager could be held to it.\n\nFor completeness, the price variance: actual 8,400 kg should have cost 8,400 × $5 = $42,000; it cost $40,320; so **$1,680 favourable**. Total material variance = $2,000 A − $1,680 F = $320 adverse.\n\nThe same structure drives every variance in the paper: quantity difference × standard rate, and rate difference × actual quantity.",
    earns: [
      "Computing the standard quantity for ACTUAL output before anything else",
      "Valuing the usage variance at standard price",
      "Stating the direction in words rather than relying on a sign",
    ],
    loses: ["Comparing actual usage against the budgeted quantity for a different output level"],
  },

  "MA-22::labour-variances": {
    title: "Splitting the labour variance into rate and efficiency",
    format: "ot",
    marks: 2,
    requirement:
      "Standard labour cost is 3 hours at $10 per hour. Actual production was 1,500 units. 4,700 hours were worked at a total cost of $46,530. The labour **rate** variance is:\n\nA  $470 favourable\nB  $470 adverse\nC  $3,000 favourable\nD  $530 adverse",
    plan: [
      {
        step: "Identify which variance is asked for",
        detail:
          "The RATE variance, which is about the price of an hour. It is computed on hours actually worked, never on the standard hours for output.",
      },
      {
        step: "Compute what the hours worked should have cost",
        detail:
          "4,700 hours × $10 standard rate = $47,000. This is the benchmark the actual cost is compared against.",
      },
      {
        step: "Compare with actual cost and set the direction",
        detail:
          "Actual $46,530 against $47,000 expected = **$470 favourable**. Less was paid than the standard rate implies, so the direction is favourable.",
      },
      {
        step: "Compute the efficiency variance to see the offered distractor",
        detail:
          "Standard hours for output = 1,500 × 3 = 4,500. Actual 4,700 is 200 hours more, at $10 = $2,000 adverse. Option C is a wrong-quantity version of that, offered against a rate question.",
      },
    ],
    answer:
      "**A — $470 favourable.**\n\nHours worked should have cost 4,700 × $10 = **$47,000**. They cost $46,530, so the rate variance is **$470 favourable** — an average rate of $9.90 rather than $10.\n\nThe rate variance uses **hours actually worked**, because it is asking what each hour cost. The efficiency variance uses the standard hours for actual output:\n\nStandard hours = 1,500 × 3 = 4,500. Actual 4,700 hours is 200 more, at $10 = **$2,000 adverse**.\n\nThe two are often **interdependent**, which is where the analysis marks are: cheaper labour is frequently less skilled, so a favourable rate variance and an adverse efficiency variance are a recognised pair — and the total, $1,530 adverse, shows the trade lost money.",
    earns: [
      "Using hours worked for the rate variance and standard hours for efficiency",
      "Recognising the favourable-rate / adverse-efficiency pairing",
    ],
    loses: ["Applying the rate variance to standard hours instead of actual hours worked"],
  },

  "MA-22::overhead-variances": {
    title: "Splitting fixed overhead into expenditure and volume",
    format: "ot",
    marks: 2,
    requirement:
      "Budgeted fixed overhead was $120,000 for a budgeted output of 20,000 units. Actual fixed overhead was $124,000 and actual output was 21,000 units. The fixed overhead **volume** variance is:\n\nA  $4,000 adverse\nB  $6,000 favourable\nC  $6,000 adverse\nD  $2,000 favourable",
    plan: [
      {
        step: "Separate the two fixed overhead variances by what each measures",
        detail:
          "EXPENDITURE compares actual overhead with budgeted overhead — did we spend what we planned? VOLUME compares actual output with budgeted output at the standard rate — did we make enough units to absorb it?",
      },
      {
        step: "Compute the absorption rate",
        detail:
          "$120,000 ÷ 20,000 units = **$6 per unit**. The volume variance is always measured at this rate.",
      },
      {
        step: "Take the output difference at that rate",
        detail:
          "21,000 actual − 20,000 budgeted = 1,000 units more, at $6 = **$6,000 favourable**. More units were made than budgeted, so more overhead was absorbed than planned.",
      },
      {
        step: "Compute the expenditure variance to identify the distractor",
        detail:
          "Actual $124,000 against budget $120,000 = $4,000 adverse, which is option A — the other variance, offered against a volume question.",
      },
    ],
    answer:
      "**B — $6,000 favourable.**\n\nAbsorption rate = $120,000 ÷ 20,000 = **$6 per unit**.\nVolume variance = (21,000 − 20,000) × $6 = **$6,000 favourable** — output exceeded budget, so more overhead was absorbed than planned.\n\nOption A, $4,000 adverse, is the **expenditure** variance: actual $124,000 against budgeted $120,000. It is offered because it is the right answer to the other half of the analysis.\n\nThe two reconcile with over- or under-absorption: absorbed = 21,000 × $6 = $126,000 against actual $124,000 = $2,000 **over-absorbed** — which is $6,000 F volume less $4,000 A expenditure. That check confirms both figures at once.\n\nNote that the volume variance exists only under **absorption** costing. Under marginal costing fixed overhead is a period cost, so there is no volume variance at all.",
    earns: [
      "Keeping expenditure and volume separate by what each measures",
      "Reconciling the two against total over- or under-absorption",
    ],
    loses: ["Reporting the expenditure variance when the volume variance was asked for"],
  },

  "MA-22::sales-variances": {
    title: "Computing sales price and volume variances",
    format: "ot",
    marks: 2,
    requirement:
      "Budgeted sales were 5,000 units at $50, with a standard cost of $30 per unit. Actual sales were 5,400 units at $48. The sales **volume** variance, on a marginal costing basis, is:\n\nA  $8,000 favourable\nB  $20,000 favourable\nC  $10,800 adverse\nD  $8,000 adverse",
    plan: [
      {
        step: "Recall that sales volume variance is valued at standard CONTRIBUTION",
        detail:
          "Under marginal costing it is the volume difference × standard contribution per unit — not at selling price, and not at profit. Valuing it at price is the most frequent error on this variance.",
      },
      {
        step: "Compute the standard contribution",
        detail:
          "$50 standard price − $30 standard cost = **$20 per unit**. Both figures are standards; the actual price of $48 belongs to the price variance, not here.",
      },
      {
        step: "Take the volume difference at that rate",
        detail:
          "5,400 actual − 5,000 budgeted = 400 units more, × $20 = **$8,000 favourable**.",
      },
      {
        step: "Compute the price variance to see the trade",
        detail:
          "($48 − $50) × 5,400 actual units = $10,800 adverse — option C. So the price cut sold 400 extra units and lost $2,800 net, which is the analysis point the numbers are built to deliver.",
      },
    ],
    answer:
      "**A — $8,000 favourable.**\n\nStandard contribution = $50 − $30 = **$20 per unit**.\nVolume variance = (5,400 − 5,000) × $20 = **$8,000 favourable**.\n\nThe volume variance is valued at standard **contribution** under marginal costing, never at selling price — option B, $20,000, is the volume difference at the $50 price and is the standard error. Under absorption costing it would be valued at standard **profit** instead.\n\nThe price variance completes the picture: ($48 − $50) × 5,400 actual units = **$10,800 adverse**, which is option C.\n\nTogether they tell the story: the $2 price cut won 400 extra units but cost $10,800 on the ones that would have sold anyway, for a net loss of $2,800. That interdependence is what the analysis marks are for.",
    earns: [
      "Valuing sales volume at standard contribution under marginal costing",
      "Reading the price and volume variances together as one commercial decision",
    ],
    loses: ["Valuing the volume variance at selling price, which produces the offered $20,000"],
  },

  "MA-22::causes-and-interdependence": {
    title: "Explaining a linked pair of variances",
    format: "ot",
    marks: 2,
    requirement:
      "A favourable material price variance is reported together with an adverse material usage variance. The most likely single explanation is that:\n\nA  The purchasing manager negotiated well and production was careless\nB  Cheaper, lower-quality material was bought, causing more waste in production\nC  The standard price is too high and the standard usage too low\nD  Actual output exceeded budgeted output",
    plan: [
      {
        step: "Notice the stem asks for ONE explanation covering both",
        detail:
          "Two variances, one cause. That rules out any answer that explains each separately, however plausible each half is on its own.",
      },
      {
        step: "Find the mechanism that links price to usage",
        detail:
          "Buying below standard price usually means buying lower quality, and lower-quality material wastes more in production. One decision produces both variances, in opposite directions.",
      },
      {
        step: "Reject the option that is two explanations",
        detail:
          "A gives a separate cause for each variance and treats them as unrelated. It may be true, but it is not the single explanation the stem asks for — and it points at the wrong manager for the waste.",
      },
      {
        step: "Name the responsibility consequence",
        detail:
          "If the purchasing decision caused the waste, the adverse usage variance belongs to purchasing, not production. Holding production responsible would be measuring them on someone else's decision.",
      },
    ],
    answer:
      "**B — cheaper, lower-quality material was bought, causing more waste in production.**\n\nThis is the classic interdependence. One decision — buying below standard price — produces both variances: favourable on price, adverse on usage, because poorer material wastes more.\n\nOption A explains each variance separately and treats them as unrelated. It may be true, but the stem asks for a **single** explanation, and A also misassigns responsibility.\n\nThat responsibility point is where the marks are. If the purchasing decision caused the waste, the **adverse usage variance belongs to purchasing**, and holding production accountable would measure them on a decision they did not make. Whether the trade was worthwhile depends on the net effect: if the usage variance exceeds the price saving, the purchase destroyed value.\n\nThe other standard pairs are favourable labour rate with adverse efficiency, and adverse sales price with favourable sales volume.",
    earns: [
      "Requiring one cause to explain both variances",
      "Reassigning responsibility to the manager whose decision caused the linked variance",
    ],
    loses: ["Choosing the option that gives two independent explanations"],
  },

  /* ── MA-23 · Reconciling budgeted and actual profit ──────────── */

  "MA-23::absorption-statement": {
    title: "Building the operating statement under absorption costing",
    format: "mtq",
    marks: 10,
    requirement:
      "A company budgeted to make and sell 10,000 units at $40, with a standard cost of $25 (materials $10, labour $9, fixed overhead $6). Budgeted profit was therefore $150,000. Actual results: 10,500 units made and sold; revenue $409,500; materials $107,000; labour $96,000; fixed overhead $61,000.\n\n(i) Calculate the sales price and sales volume variances.\n(ii) Calculate the total material, labour and fixed overhead variances.\n(iii) Prepare an operating statement reconciling budgeted profit to actual profit.",
    plan: [
      {
        step: "Start from budgeted profit and finish at actual profit — check both ends first",
        detail:
          "Budgeted profit is given as $150,000. Compute actual profit independently: $409,500 − $107,000 − $96,000 − $61,000 = $145,500. Knowing the destination before you start means the statement either reconciles or reveals its own error.",
      },
      {
        step: "Value the sales volume variance at standard PROFIT under absorption costing",
        detail:
          "Standard profit is $40 − $25 = $15. Volume variance = (10,500 − 10,000) × $15 = $7,500 favourable. Under marginal costing it would be at standard contribution of $21 instead — the basis changes the figure.",
      },
      {
        step: "Flex the cost budget before computing cost variances",
        detail:
          "Every cost variance compares actual against the standard for ACTUAL output of 10,500, never against the original 10,000. Materials 10,500 × $10 = $105,000; labour × $9 = $94,500; overhead is fixed, so the budget stays $60,000.",
      },
      {
        step: "Set the statement out with each variance in a favourable or adverse column",
        detail:
          "Budgeted profit, then sales variances, then each cost variance, then actual profit. Marks are for the layout and the direction of each item as much as for the arithmetic.",
      },
      {
        step: "Prove it reconciles, and fix the sign if it does not",
        detail:
          "If the statement does not land on $145,500, a variance has the wrong sign. Reversing a single direction moves the total by twice that variance, which is how the culprit is found quickly.",
      },
    ],
    answer:
      "**(i) Sales variances**\nSales price: actual revenue $409,500 against 10,500 × $40 = $420,000 → **$10,500 adverse**\nSales volume: (10,500 − 10,000) × standard profit $15 = **$7,500 favourable**\n\n**(ii) Cost variances, against the budget flexed to 10,500 units**\nMaterials: standard 10,500 × $10 = $105,000 v actual $107,000 → **$2,000 adverse**\nLabour: standard 10,500 × $9 = $94,500 v actual $96,000 → **$1,500 adverse**\nFixed overhead expenditure: budget $60,000 v actual $61,000 → **$1,000 adverse**\nFixed overhead volume: (10,500 − 10,000) × $6 = **$3,000 favourable**\n\n**(iii) Operating statement**\nBudgeted profit  $150,000\nSales price variance  (10,500)\nSales volume variance  7,500\nMaterial total variance  (2,000)\nLabour total variance  (1,500)\nFixed overhead expenditure  (1,000)\nFixed overhead volume  3,000\n**Actual profit  $145,500**\n\nCheck: $409,500 − $107,000 − $96,000 − $61,000 = **$145,500** ✓",
    earns: [
      "Computing actual profit independently first, so the statement has a known destination",
      "Valuing sales volume at standard profit under absorption costing",
      "Flexing the cost budget to actual output before any cost variance",
      "Including the fixed overhead volume variance, which exists only under absorption costing",
    ],
    loses: [
      "Comparing actual costs against the original 10,000-unit budget",
      "Valuing sales volume at standard contribution, which is the marginal costing basis",
      "Omitting the volume variance, so the statement cannot reconcile",
      "Letting the statement finish on the wrong figure without checking against actual profit",
    ],
  },

  "MA-23::marginal-statement": {
    title: "How the operating statement changes under marginal costing",
    format: "ot",
    marks: 2,
    requirement:
      "In an operating statement prepared under **marginal** costing, which variance does not appear?\n\nA  Fixed overhead expenditure variance\nB  Fixed overhead volume variance\nC  Sales volume contribution variance\nD  Material usage variance",
    plan: [
      {
        step: "Recall how marginal costing treats fixed overhead",
        detail:
          "As a period cost, written off in full as incurred. It is never absorbed into units, so there is no absorption rate and nothing for a volume difference to act on.",
      },
      {
        step: "Derive which variance disappears",
        detail:
          "The volume variance measures overhead over- or under-ABSORBED because output differed from budget. With no absorption there is no such variance — it disappears by definition rather than by convention.",
      },
      {
        step: "Confirm the expenditure variance survives",
        detail:
          "Actual fixed overhead can still differ from budgeted fixed overhead, and that comparison is valid under either system. Only the volume half goes.",
      },
      {
        step: "Note the second change to the statement",
        detail:
          "The sales volume variance is valued at standard CONTRIBUTION rather than standard profit, and the statement reconciles budgeted contribution to actual, with fixed overhead deducted as one figure at the end.",
      },
    ],
    answer:
      "**B — fixed overhead volume variance.**\n\nMarginal costing treats fixed overhead as a **period cost**, written off in full as incurred. There is no absorption rate, so there is nothing for a volume difference to act on — the variance disappears by definition rather than by convention.\n\nThe **expenditure** variance survives: actual fixed overhead can still differ from budget, and that comparison is valid under either system.\n\nTwo other changes follow. The sales volume variance is valued at standard **contribution** rather than standard profit, and the statement reconciles budgeted **contribution** to actual contribution, with total fixed overhead deducted as a single figure at the end.\n\nMaterial usage and every other variable cost variance are identical under both systems.",
    earns: ["Deriving the answer from how marginal costing treats fixed overhead, not from memory"],
    loses: ["Removing the expenditure variance as well, which remains valid under both systems"],
  },

  "MA-23::interpretation": {
    title: "Drawing a conclusion from a reconciliation statement",
    format: "ot",
    marks: 2,
    requirement:
      "An operating statement shows a favourable sales volume variance of $12,000, an adverse sales price variance of $20,000, and cost variances that are broadly neutral. The most reasonable conclusion is that:\n\nA  Cost control was poor\nB  Prices were cut to win volume, and the trade lost money overall\nC  The sales team performed well\nD  The standard cost is out of date",
    plan: [
      {
        step: "Read the two sales variances as one decision",
        detail:
          "Adverse price with favourable volume is the standard signature of a price cut. Treating them as two unrelated results misses the only story the numbers tell.",
      },
      {
        step: "Net the two figures",
        detail:
          "$12,000 favourable against $20,000 adverse leaves **$8,000 adverse**. The extra volume did not pay for the margin given up on the units that would have sold anyway.",
      },
      {
        step: "Take the cost variances at face value",
        detail:
          "They are stated as broadly neutral, so cost control was adequate. Option A contradicts the stem outright rather than interpreting it.",
      },
      {
        step: "Judge the sales team on the net result",
        detail:
          "Selling more units is not the same as performing well. Option C reads only the favourable half, which is exactly the error a reconciliation statement exists to prevent.",
      },
    ],
    answer:
      "**B — prices were cut to win volume, and the trade lost money overall.**\n\nAdverse price with favourable volume is the signature of a price reduction, and the two must be read together. Netting them gives **$8,000 adverse**: the extra volume did not cover the margin surrendered on the units that would have sold anyway.\n\nOption A contradicts the stem, which states cost variances were neutral. Option C reads only the favourable half — more units sold is not the same as value created, and that is precisely the error the reconciliation exists to expose.\n\nOption D would be the right conclusion for a different pattern: persistent one-directional COST variances of similar size. Nothing here points at the standard.",
    earns: [
      "Netting linked variances rather than reporting each separately",
      "Distinguishing more volume from better performance",
    ],
    loses: ["Reading the favourable variance in isolation and concluding sales did well"],
  },
}
