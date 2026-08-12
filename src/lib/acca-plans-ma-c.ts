/*
 * MA Area C — Cost accounting techniques.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * The largest area of the paper and the most computational. Nearly every plan
 * here ends by naming which distractor corresponds to which specific slip —
 * inverting a ratio, using the wrong denominator, forgetting to gross up for
 * normal loss, absorbing on actual instead of budgeted hours. On a 2-mark OT
 * there are no method marks, so the only defence against an arithmetic error is
 * recognising the shape of your own mistake in the option list.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const MA_PLANS_C: ExamPlanMap = {
  /* ── MA-10 · Accounting for materials ────────────────────────── */

  "MA-10::the-cycle": {
    title: "Which document authorises which step",
    format: "ot",
    marks: 2,
    requirement:
      "Which document authorises the stores department to release materials to production?\n\nA  Purchase requisition\nB  Purchase order\nC  Goods received note\nD  Materials requisition",
    plan: [
      {
        step: "Set the documents out in the order they arise",
        detail:
          "Purchase requisition (stores asks buying to purchase) → purchase order (buying instructs the supplier) → goods received note (goods arrive) → materials requisition (production draws stock from stores).",
      },
      {
        step: "Read the stem for the two parties involved",
        detail:
          "Stores releasing to production is an INTERNAL movement. Every other document in the list concerns the supplier, so the parties alone narrow the answer.",
      },
      {
        step: "Separate the two requisitions deliberately",
        detail:
          "This is where marks go. A PURCHASE requisition asks the buying department to buy from outside. A MATERIALS requisition draws existing stock from stores. Same word, opposite direction.",
      },
      {
        step: "Note what the document drives",
        detail:
          "The materials requisition is the source document for charging material cost to a job or cost centre, which is why the classification matters rather than being mere administration.",
      },
    ],
    answer:
      "**D — materials requisition.**\n\nThe cycle runs: **purchase requisition** (stores asks the buying department to purchase) → **purchase order** (buying instructs the supplier) → **goods received note** (goods arrive and are checked) → **materials requisition** (production draws stock from stores).\n\nThe two requisitions are the trap and share a word: the purchase requisition looks outward to a supplier, the materials requisition is an internal movement from stores to production.\n\nThe materials requisition is also the source document for charging material cost to a job or cost centre, which is why it matters beyond administration.",
    earns: ["Identifying the parties — internal or external — before choosing the document"],
    loses: ["Confusing the purchase requisition with the materials requisition"],
  },

  "MA-10::inventory-levels": {
    title: "Calculating the reorder level from lead time and usage",
    format: "ot",
    marks: 2,
    requirement:
      "Maximum usage is 400 units per week and maximum lead time is 3 weeks. The reorder level is:\n\nA  133 units\nB  400 units\nC  1,200 units\nD  1,600 units",
    plan: [
      {
        step: "Recall the formula and why it uses maximums",
        detail:
          "Reorder level = maximum usage × maximum lead time. Maximums are used because the level must cover the worst case — the point of the control is to avoid a stockout, not to describe the average.",
      },
      {
        step: "Multiply, keeping the units consistent",
        detail:
          "400 units per week × 3 weeks = **1,200 units**. Usage is per week and lead time is in weeks, so they combine directly with no conversion.",
      },
      {
        step: "Check the answer is a sensible size",
        detail:
          "It must cover three weeks of demand at the highest rate, so it should be several times weekly usage. 400 would cover one week and cause a stockout; 133 is a division and is smaller than a single week's use.",
      },
      {
        step: "Fix the neighbouring formulae, since they share the data",
        detail:
          "Minimum (buffer) level = reorder level − (average usage × average lead time). Maximum level = reorder level + reorder quantity − (minimum usage × minimum lead time). Which extreme goes where is the whole difficulty.",
      },
    ],
    answer:
      "**C — 1,200 units.**\n\nReorder level = maximum usage × maximum lead time = 400 × 3 = **1,200 units**.\n\nMaximums are used because the level exists to prevent a stockout in the worst case, not to describe the typical case. Option B covers one week and would cause exactly the stockout the control exists to prevent; option A comes from dividing rather than multiplying.\n\nThe neighbouring formulae use the same data with different extremes, and knowing which goes where is the real difficulty:\n\n**Minimum (buffer) level** = reorder level − (average usage × average lead time)\n**Maximum level** = reorder level + reorder quantity − (minimum usage × minimum lead time)",
    earns: [
      "Knowing the reorder level uses maximums because it is a worst-case control",
      "Sanity-checking that the answer covers the full lead time",
    ],
    loses: ["Using average usage, which produces a level that stocks out half the time"],
  },

  "MA-10::eoq": {
    title: "Computing the economic order quantity",
    format: "ot",
    marks: 2,
    requirement:
      "Annual demand is 40,000 units, the cost of placing an order is $25, and the cost of holding one unit for a year is $2. The economic order quantity is:\n\nA  707 units\nB  1,000 units\nC  1,414 units\nD  2,000 units",
    plan: [
      {
        step: "Write the formula from the sheet and label every symbol",
        detail:
          "EOQ = √(2 C₀ D ÷ C_h), where C₀ is the cost per order, D is annual demand and C_h is the holding cost per unit per year. The formula is given in the exam; identifying which figure is which is the examinable part.",
      },
      {
        step: "Substitute carefully, checking the time periods agree",
        detail:
          "Demand is annual and holding cost is per unit per year, so they are consistent. Mixing an annual demand with a monthly holding cost is the error that produces a wildly wrong answer.",
      },
      {
        step: "Compute inside the root before taking it",
        detail:
          "2 × 25 × 40,000 = 2,000,000. Divided by 2 = 1,000,000. √1,000,000 = **1,000 units**.",
      },
      {
        step: "Recognise the distractors as specific omissions",
        detail:
          "1,414 is √2,000,000 — the answer of anyone who forgot to divide by the holding cost. 707 is that figure halved. 2,000 is the numerator's square root mis-taken. Each is one identifiable step missed.",
      },
    ],
    answer:
      "**B — 1,000 units.**\n\nEOQ = √(2 C₀ D ÷ C_h) = √(2 × 25 × 40,000 ÷ 2) = √1,000,000 = **1,000 units**.\n\nEvery distractor is one specific step missed: **1,414** is √2,000,000, from forgetting to divide by the holding cost; **707** is that figure halved; **2,000** comes from mishandling the root.\n\nThe logic behind the formula is worth holding: ordering in large quantities means few orders but high average inventory and high holding cost, and ordering in small quantities reverses both. EOQ is the quantity where the two costs are equal, which is where their total is lowest.",
    earns: [
      "Labelling each symbol before substituting, since the formula itself is provided",
      "Checking that demand and holding cost are on the same time basis",
    ],
    loses: ["Omitting the division by holding cost, which produces the offered 1,414"],
  },

  "MA-10::valuation": {
    title: "Valuing issues and closing inventory under FIFO and AVCO",
    format: "ot",
    marks: 2,
    requirement:
      "Opening inventory is 100 units at $5. A further 200 units are purchased at $8. 150 units are then issued. Using FIFO, the value of the issue is:\n\nA  $750\nB  $900\nC  $1,100\nD  $1,200",
    plan: [
      {
        step: "State what FIFO assumes about the order of issue",
        detail:
          "First in, first out: the oldest stock is issued first. It is an assumption about cost flow, not about physical movement, and it decides which price attaches to the units issued.",
      },
      {
        step: "Take the units from the oldest layer first, and stop when the issue is satisfied",
        detail:
          "150 units are needed. The first 100 come from opening inventory at $5, exhausting that layer. The remaining 50 come from the $8 purchase.",
      },
      {
        step: "Price each layer separately and add",
        detail:
          "100 × $5 = $500. 50 × $8 = $400. Total issue value = **$900**.",
      },
      {
        step: "Identify what each distractor computes",
        detail:
          "$1,200 is 150 × $8, using the newest price throughout — that is LIFO thinking. $1,100 is 150 × $7.33, the AVCO answer. $750 is 150 × $5, using the oldest price for everything.",
      },
    ],
    answer:
      "**B — $900.**\n\nFIFO issues the oldest cost first, so the 150 units are drawn from two layers: 100 at $5 = $500, then 50 at $8 = $400. Total = **$900**. Closing inventory is the remaining 150 units at $8 = $1,200.\n\nThe option list is a map of the alternatives. **$1,200** is 150 × $8 — newest price throughout, which is LIFO. **$1,100** is the AVCO answer: total cost (100 × $5) + (200 × $8) = $2,100 over 300 units = $7 per unit, so 150 × $7 = $1,050 — or $7.33 on a different weighting. **$750** applies the oldest price to every unit.\n\nIn a period of rising prices FIFO gives the lower issue cost and therefore the higher profit, with closing inventory at the most recent prices.",
    earns: [
      "Working layer by layer rather than applying one price to the whole issue",
      "Knowing the direction FIFO pushes profit when prices are rising",
    ],
    loses: ["Applying a single price to all 150 units, which is what three of the four options do"],
  },

  /* ── MA-11 · Accounting for labour ───────────────────────────── */

  "MA-11::direct-indirect-labour": {
    title: "Classifying overtime premium and idle time",
    format: "ot",
    marks: 2,
    requirement:
      "Production workers worked overtime at the general request of the factory manager to clear a backlog. The overtime **premium** should be treated as:\n\nA  A direct labour cost\nB  A production overhead\nC  A non-production cost\nD  An abnormal loss",
    plan: [
      {
        step: "Split the overtime payment into two parts",
        detail:
          "The basic rate for the hours worked, and the PREMIUM on top. They are treated differently, and the stem asks only about the premium.",
      },
      {
        step: "Apply the general rule",
        detail:
          "Basic rate for hours worked on production is direct labour. Overtime premium is a production OVERHEAD, because it arose from general pressure on the factory rather than from any one job.",
      },
      {
        step: "Know the exception, because the stem is written to invoke it",
        detail:
          "If a specific customer requests urgent delivery and overtime is worked for that order, the premium is a direct cost of that job. Here the request is general, so the rule applies, not the exception.",
      },
      {
        step: "Handle idle time the same way",
        detail:
          "Normal idle time is a production overhead spread across output; abnormal idle time is written off to profit or loss. The same logic — general versus specifically attributable — governs both topics.",
      },
    ],
    answer:
      "**B — a production overhead.**\n\nSplit the payment: the **basic rate** for hours worked on production is direct labour, while the **overtime premium** is a production overhead, because it arose from general pressure on the factory rather than from any particular job.\n\nThe exception is what the stem tests. Where a **specific customer** requests urgent delivery and overtime is worked for that order, the premium becomes a direct cost of that job. Here the request came from the factory manager generally, so the rule applies.\n\nIdle time follows the same logic: normal idle time is a production overhead spread over output, abnormal idle time is written off to profit or loss.",
    earns: [
      "Separating basic pay from premium before classifying",
      "Knowing the specific-customer exception and checking whether the stem triggers it",
    ],
    loses: ["Treating the whole overtime payment as direct because the workers were direct workers"],
  },

  "MA-11::remuneration": {
    title: "Computing pay under a piecework scheme with a guarantee",
    format: "ot",
    marks: 2,
    requirement:
      "An employee is paid $1.50 per unit with a guaranteed minimum weekly wage of $360. In a week they produce 220 units. Their pay for the week is:\n\nA  $330\nB  $360\nC  $690\nD  $720",
    plan: [
      {
        step: "Compute the piecework earnings first",
        detail:
          "220 units × $1.50 = $330. That is what the scheme pays on output alone, before the guarantee is considered.",
      },
      {
        step: "Compare against the guarantee and take the higher",
        detail:
          "$330 is below the $360 minimum, so the employee receives the guarantee. A guaranteed minimum is a floor, not an addition.",
      },
      {
        step: "Reject the option that adds them together",
        detail:
          "$690 is $330 + $360, which is the answer of anyone treating the guarantee as a supplement. That misreading is exactly what the option is there to catch.",
      },
      {
        step: "Note the costing consequence",
        detail:
          "The $30 shortfall between piecework earnings and the guarantee is not a direct cost of the units made — it is treated as a production overhead, since no output corresponds to it.",
      },
    ],
    answer:
      "**B — $360.**\n\nPiecework earnings are 220 × $1.50 = $330, which falls below the guaranteed minimum, so the employee is paid the guarantee of **$360**.\n\nA guaranteed minimum is a **floor**, not an addition. Option C, $690, adds the two together and is the answer of anyone who read the guarantee as a supplement.\n\nFor costing, the $30 by which the guarantee exceeds piecework earnings is treated as a **production overhead** rather than a direct cost of the 220 units, because no output corresponds to it.",
    earns: [
      "Treating the guarantee as a floor and taking the higher of the two figures",
      "Knowing the shortfall becomes overhead rather than attaching to the units",
    ],
    loses: ["Adding the guarantee to the piecework earnings"],
  },

  "MA-11::labour-turnover": {
    title: "Calculating the labour turnover rate",
    format: "ot",
    marks: 2,
    requirement:
      "During the year 30 employees left and were replaced, and 20 further employees left because the company reduced its workforce. Average employees during the year were 400. The labour turnover rate is:\n\nA  5.0%\nB  7.5%\nC  12.5%\nD  Cannot be determined",
    plan: [
      {
        step: "State what the ratio is measuring",
        detail:
          "Turnover measures employees who left and had to be REPLACED — the avoidable churn management can act on. It is not a count of everyone who left.",
      },
      {
        step: "Filter the leavers accordingly",
        detail:
          "30 left and were replaced, so they count. The 20 who left because the workforce was reduced were not replaced, so they are excluded — that departure was a management decision, not turnover.",
      },
      {
        step: "Divide by average employees, not closing",
        detail:
          "30 ÷ 400 = **7.5%**. Using an opening or closing figure instead of the average is the other standard slip on this ratio.",
      },
      {
        step: "Identify the distractor built from the wrong numerator",
        detail:
          "50 ÷ 400 = 12.5%, which counts every leaver including the redundancies. 20 ÷ 400 = 5%, which counts only those. Each option is a specific misreading of the numerator.",
      },
    ],
    answer:
      "**B — 7.5%.**\n\nTurnover = replacements required ÷ average number of employees = 30 ÷ 400 = **7.5%**.\n\nThe 20 employees who left in a workforce reduction were **not replaced**, so they do not represent turnover — the ratio measures avoidable churn that has to be filled again, which is what management can act on.\n\nThe distractors map the misreadings: **12.5%** counts all 50 leavers, **5%** counts only the redundancies.\n\nThe costs of turnover are worth naming: recruitment and selection, induction and training, lost productivity while new staff learn, and lost knowledge — which is why the ratio is a control measure rather than a statistic.",
    earns: ["Filtering the numerator to replacements only, and using the average as denominator"],
    loses: ["Counting every leaver, which includes departures that required no replacement"],
  },

  "MA-11::labour-ratios": {
    title: "Telling efficiency, capacity and volume ratios apart",
    format: "ot",
    marks: 2,
    requirement:
      "Budgeted hours were 10,000. Actual hours worked were 9,000, and the output achieved had a standard time of 9,900 hours. The labour **efficiency** ratio is:\n\nA  90.0%\nB  99.0%\nC  110.0%\nD  111.1%",
    plan: [
      {
        step: "Write all three ratios out, because they share the same three numbers",
        detail:
          "Efficiency = standard hours for actual output ÷ actual hours worked. Capacity = actual hours worked ÷ budgeted hours. Production volume = standard hours for actual output ÷ budgeted hours. Same three figures, three different pairings.",
      },
      {
        step: "Identify each of the three numbers in the stem",
        detail:
          "Budgeted hours 10,000. Actual hours worked 9,000. Standard hours for actual output 9,900. Labelling them explicitly is what prevents the wrong pairing.",
      },
      {
        step: "Select the pairing the question asks for and compute",
        detail:
          "Efficiency = 9,900 ÷ 9,000 = **110%**. More was produced than the hours worked should have yielded, so the workforce was efficient.",
      },
      {
        step: "Compute the others to confirm they are the distractors",
        detail:
          "Capacity = 9,000 ÷ 10,000 = 90%, which is option A. Volume = 9,900 ÷ 10,000 = 99%, which is option B. Every wrong option is another ratio from the same data.",
      },
    ],
    answer:
      "**C — 110.0%.**\n\nEfficiency = standard hours for actual output ÷ actual hours worked = 9,900 ÷ 9,000 = **110%**. The output should have taken 9,900 hours and took 9,000, so the workforce worked efficiently.\n\nThe other options are the other two ratios computed from the identical data:\n\n**Capacity** = 9,000 ÷ 10,000 = **90%** (option A) — fewer hours were worked than budgeted.\n**Production volume** = 9,900 ÷ 10,000 = **99%** (option B) — output was slightly below budget.\n\nAnd they reconcile: efficiency × capacity = 110% × 90% = 99% = the volume ratio. That check confirms all three at once.",
    earns: [
      "Labelling all three input figures before selecting a pairing",
      "Using efficiency × capacity = volume as a verification",
    ],
    loses: ["Pairing the wrong two figures, since every wrong pairing is an offered option"],
  },

  /* ── MA-12 · Accounting for overheads ────────────────────────── */

  "MA-12::the-four-steps": {
    title: "Naming the stage of overhead accounting",
    format: "ot",
    marks: 2,
    requirement:
      "Sharing factory rent between production departments on the basis of floor area is an example of:\n\nA  Allocation\nB  Apportionment\nC  Reapportionment\nD  Absorption",
    plan: [
      {
        step: "Set the four steps out in order with what each does",
        detail:
          "Allocation: a whole cost charged to one cost centre it belongs to entirely. Apportionment: a shared cost split between centres on a fair basis. Reapportionment: service centre totals redistributed to production centres. Absorption: overhead charged into cost units.",
      },
      {
        step: "Ask whether the cost belongs wholly to one centre",
        detail:
          "Rent covers the whole factory and is shared, so it cannot be allocated. A cost is allocated only when it is wholly attributable to one centre.",
      },
      {
        step: "Check whether the split is between production or from service centres",
        detail:
          "The split is among production departments directly, not a redistribution of a service centre's accumulated total. That makes it apportionment rather than reapportionment.",
      },
      {
        step: "Confirm the basis is appropriate, since MTQs test that",
        detail:
          "Floor area for rent, number of employees for canteen costs, machine value for machinery insurance, machine hours for power. The basis should reflect what causes the cost.",
      },
    ],
    answer:
      "**B — apportionment.**\n\nThe four steps run: **allocation** (a whole cost charged to the one cost centre it belongs to), **apportionment** (a shared cost split between centres on a fair basis), **reapportionment** (service centre totals redistributed to production centres) and **absorption** (overhead charged into cost units).\n\nFactory rent covers the whole building and cannot be attributed wholly to one department, so it is shared out — apportionment. It is not reapportionment because it is not redistributing a service centre's accumulated total.\n\nThe basis must reflect what drives the cost: floor area for rent, employees for canteen costs, machine value for machinery insurance, machine hours for power.",
    earns: ["Asking whether the cost belongs wholly to one centre before choosing a step"],
    loses: ["Confusing apportionment with reapportionment, which acts on service centres only"],
  },

  "MA-12::reapportionment": {
    title: "Reapportioning service cost centres",
    format: "ot",
    marks: 2,
    requirement:
      "The stores department's overhead of $60,000 is reapportioned on the number of requisitions. Production department A raised 300 requisitions, department B raised 500, and the maintenance department raised 200. Using the **direct** method, the amount charged to department A is:\n\nA  $18,000\nB  $22,500\nC  $30,000\nD  $60,000",
    plan: [
      {
        step: "Understand what the direct method ignores",
        detail:
          "It reapportions service centre costs to PRODUCTION centres only, ignoring services rendered to other service centres. So maintenance's 200 requisitions are excluded from the base entirely.",
      },
      {
        step: "Build the correct denominator",
        detail:
          "Production requisitions only: 300 + 500 = 800. Including maintenance's 200 would give 1,000 and is the error the question is built around.",
      },
      {
        step: "Apply department A's share",
        detail:
          "$60,000 × 300 ÷ 800 = **$22,500**.",
      },
      {
        step: "Identify the distractor from the wrong denominator",
        detail:
          "$60,000 × 300 ÷ 1,000 = $18,000, which is option A — the answer of anyone who left maintenance in the base. Under the direct method that share would never reach production.",
      },
    ],
    answer:
      "**B — $22,500.**\n\nThe **direct method** reapportions service centre costs to production centres only, ignoring work done for other service centres. So the base is production requisitions alone: 300 + 500 = **800**.\n\nDepartment A's share = $60,000 × 300 ÷ 800 = **$22,500**.\n\nOption A, $18,000, uses a denominator of 1,000 by including maintenance's 200 requisitions — which under the direct method would leave part of the cost stranded in a service centre and never charged to production.\n\nThe alternatives are the **step-down** method, which reapportions service centres in sequence, and the **reciprocal** method, which handles services rendered in both directions.",
    earns: [
      "Building the denominator from production centres only under the direct method",
      "Naming the step-down and reciprocal alternatives",
    ],
    loses: ["Including the other service centre in the base, which strands part of the cost"],
  },

  "MA-12::absorption": {
    title: "Computing under- or over-absorbed overhead",
    format: "ot",
    marks: 2,
    requirement:
      "Budgeted overhead was $200,000 and budgeted labour hours 50,000. Actual overhead was $210,000 and actual hours worked 48,000. Overhead was:\n\nA  Under-absorbed by $10,000\nB  Under-absorbed by $18,000\nC  Over-absorbed by $8,000\nD  Over-absorbed by $18,000",
    plan: [
      {
        step: "Compute the absorption rate from BUDGETED figures only",
        detail:
          "OAR = budgeted overhead ÷ budgeted activity = $200,000 ÷ 50,000 = $4 per hour. The rate is set in advance, which is the entire reason under- and over-absorption exist.",
      },
      {
        step: "Absorb using the rate and the ACTUAL activity",
        detail:
          "48,000 actual hours × $4 = $192,000 absorbed into production. Budgeted rate, actual hours — mixing this up is the commonest error in the topic.",
      },
      {
        step: "Compare absorbed with actual overhead incurred",
        detail:
          "Absorbed $192,000 against actual $210,000. Less was absorbed than was incurred, so overhead is **under-absorbed by $18,000**.",
      },
      {
        step: "Sanity-check the direction in words",
        detail:
          "Under-absorbed means production was not charged enough, so profit must be reduced. Both causes are present here: overhead was higher than budget and activity was lower.",
      },
    ],
    answer:
      "**B — under-absorbed by $18,000.**\n\nOAR = $200,000 ÷ 50,000 = **$4 per hour** — set from budgeted figures, because the rate has to exist before the period begins.\n\nAbsorbed = 48,000 actual hours × $4 = **$192,000**.\nActual overhead incurred = **$210,000**.\nUnder-absorbed = **$18,000**, written off as a reduction in profit.\n\nBoth causes are present: overhead was $10,000 above budget and activity was 2,000 hours below it. Option A picks up only the first cause and option C reverses the direction.\n\nThe rule is **budgeted rate, actual activity** — the rate is fixed in advance and applied to whatever activity occurs.",
    earns: [
      "Using budgeted figures for the rate and actual activity for the absorption",
      "Checking the direction in words before selecting",
    ],
    loses: ["Recomputing the rate on actual overhead, which makes absorption impossible by definition"],
  },

  /* ── MA-13 · Absorption and marginal costing ─────────────────── */

  "MA-13::contribution": {
    title: "Computing contribution and knowing what it is for",
    format: "ot",
    marks: 2,
    requirement:
      "A product sells for $40. Direct materials are $12, direct labour $8, variable overhead $5 and fixed overhead absorbed $6 per unit. Contribution per unit is:\n\nA  $9\nB  $15\nC  $20\nD  $28",
    plan: [
      {
        step: "State the definition precisely",
        detail:
          "Contribution = selling price − ALL variable costs. Fixed cost never enters, however it is expressed and however convincingly it is presented per unit.",
      },
      {
        step: "Identify which costs in the stem are variable",
        detail:
          "Materials $12, labour $8 and variable overhead $5 are variable, totalling $25. The absorbed fixed overhead of $6 is fixed and is there to be excluded.",
      },
      {
        step: "Subtract and check what was left out",
        detail:
          "$40 − $25 = **$15**. Deducting the $6 as well gives $9, which is profit per unit and is offered as option A.",
      },
      {
        step: "Say what contribution is used for",
        detail:
          "It contributes first to covering fixed costs and then to profit. It is the right figure for short-run decisions — break-even, limiting factors, accept-or-reject — because fixed costs do not change with the decision.",
      },
    ],
    answer:
      "**B — $15.**\n\nContribution = selling price − all variable costs = $40 − ($12 + $8 + $5) = **$15**.\n\nThe absorbed fixed overhead of $6 is excluded. Deducting it as well gives $9 — that is **profit** per unit, and it is option A.\n\nThe distinction is the whole reason the concept exists. Contribution goes first to covering fixed costs and then to profit, and because fixed costs do not change with a short-run decision, contribution is the figure that decides break-even, limiting factor rankings and accept-or-reject questions. A product with positive contribution is worth making in the short run even if it shows a loss after fixed overhead is absorbed.",
    earns: [
      "Excluding every fixed cost regardless of how it is presented",
      "Knowing why contribution rather than profit drives short-run decisions",
    ],
    loses: ["Deducting absorbed fixed overhead, which produces profit and is the offered distractor"],
  },

  "MA-13::the-difference": {
    title: "The single difference between the two costing systems",
    format: "ot",
    marks: 2,
    requirement:
      "The only difference in the treatment of costs between absorption and marginal costing is the treatment of:\n\nA  Direct materials\nB  Variable production overhead\nC  Fixed production overhead\nD  Selling and distribution costs",
    plan: [
      {
        step: "State the difference in one sentence before reading the options",
        detail:
          "Absorption costing treats fixed PRODUCTION overhead as a product cost, so it attaches to units and can sit in inventory. Marginal costing treats it as a period cost, written off in full as incurred.",
      },
      {
        step: "Check the options that are treated identically",
        detail:
          "Direct materials and variable production overhead are product costs under both systems. Selling and distribution costs are period costs under both. None of the three differs.",
      },
      {
        step: "Note the word \"production\" in the answer",
        detail:
          "It is fixed PRODUCTION overhead that differs. Fixed selling and administration costs are period costs under both systems, and a stem may test that precision.",
      },
      {
        step: "Derive the consequence, which is what MTQs ask for",
        detail:
          "Because fixed overhead can sit in inventory under absorption costing, the two systems report different profits whenever inventory levels change — and identical profits when they do not.",
      },
    ],
    answer:
      "**C — fixed production overhead.**\n\nUnder **absorption costing** it is a product cost: it attaches to units and is carried in inventory until those units are sold. Under **marginal costing** it is a period cost, written off in full as incurred.\n\nEverything else is treated identically. Direct materials and variable production overhead are product costs under both; selling, distribution and administration costs are period costs under both. Note the word **production** — fixed selling and administration overhead never attaches to product under either system.\n\nThe consequence follows directly: the two systems report different profits whenever inventory levels change, and identical profits when they do not.",
    earns: [
      "Keeping the word \"production\" in the answer",
      "Deriving the inventory-movement consequence from the definition",
    ],
    loses: ["Naming a cost that both systems treat the same way"],
  },

  "MA-13::reconciliation": {
    title: "Reconciling absorption and marginal costing profit",
    format: "ot",
    marks: 2,
    requirement:
      "In a period, production was 10,000 units and sales 8,000 units. Fixed production overhead is absorbed at $3 per unit. Compared with marginal costing profit, absorption costing profit will be:\n\nA  $6,000 lower\nB  $6,000 higher\nC  $24,000 higher\nD  The same",
    plan: [
      {
        step: "Find the inventory movement",
        detail:
          "Production 10,000 less sales 8,000 = inventory INCREASED by 2,000 units. The direction of this movement decides the direction of the difference.",
      },
      {
        step: "Recall the rule in the direction the numbers give",
        detail:
          "When inventory increases, absorption profit is HIGHER, because fixed overhead attaching to the extra units is carried forward in inventory instead of being charged this period.",
      },
      {
        step: "Multiply the movement by the fixed overhead per unit",
        detail:
          "2,000 units × $3 = **$6,000**. Absorption profit is $6,000 higher.",
      },
      {
        step: "Identify what the other options compute",
        detail:
          "$6,000 lower reverses the rule — the answer if inventory had fallen. $24,000 is 8,000 sales × $3, using the wrong quantity. The rule and the multiplication are two separate places to go wrong.",
      },
    ],
    answer:
      "**B — $6,000 higher.**\n\nInventory rose by 10,000 − 8,000 = **2,000 units**. Under absorption costing, 2,000 × $3 = **$6,000** of fixed overhead is carried forward in inventory rather than charged against this period's profit, so absorption profit is $6,000 higher.\n\nThe rule in both directions:\n\n**Inventory increases** → absorption profit higher (fixed overhead deferred in inventory)\n**Inventory decreases** → absorption profit lower (fixed overhead brought in from opening inventory)\n**No change** → the two are equal\n\nOption C uses sales rather than the inventory movement. The difference always equals the CHANGE in inventory units × the fixed overhead per unit — never the sales or production figure on its own.",
    earns: [
      "Computing the inventory movement first and reading the direction from it",
      "Multiplying by the movement, not by production or sales",
    ],
    loses: ["Reversing the rule, or using the sales quantity as the multiplier"],
  },

  /* ── MA-14 · Costing methods ─────────────────────────────────── */

  "MA-14::choosing-a-method": {
    title: "Selecting the costing method the production type requires",
    format: "ot",
    marks: 2,
    requirement:
      "A company refines crude oil in a continuous operation, producing petrol, diesel and lubricants from a common input. The appropriate costing method is:\n\nA  Job costing\nB  Batch costing\nC  Process costing\nD  Service costing",
    plan: [
      {
        step: "Match each method to the production type it fits",
        detail:
          "Job: one-off, customer-specified, separately identifiable. Batch: identical units made in groups. Process: continuous, indistinguishable output flowing through stages. Service: intangible output.",
      },
      {
        step: "Read the stem for the identifiability of a unit",
        detail:
          "\"Continuous\" and a common input yielding several outputs means no individual unit can be identified or costed separately. That is process costing's defining condition.",
      },
      {
        step: "Rule out job and batch on the same test",
        detail:
          "Both require separately identifiable output — a job or a batch you can point to and cost. Continuous refining has neither.",
      },
      {
        step: "Note the joint product wrinkle",
        detail:
          "Petrol, diesel and lubricants from one input are JOINT PRODUCTS, so the common cost must be apportioned at the split-off point — by physical units or by sales value. That is the follow-on question.",
      },
    ],
    answer:
      "**C — process costing.**\n\nProcess costing applies where production is **continuous** and output is indistinguishable, so no individual unit can be identified and costed on its own. Cost is accumulated by process and averaged over the units passing through.\n\nJob and batch costing both require separately identifiable output; service costing applies to intangible output.\n\nThe stem adds a second feature deliberately: petrol, diesel and lubricants from a common input are **joint products**, so the common process cost must be apportioned at the **split-off point**, usually by physical units or by sales value.",
    earns: [
      "Testing whether an individual unit could be separately identified",
      "Spotting that a common input yielding several outputs raises joint product apportionment",
    ],
    loses: ["Choosing batch costing because the output comes in quantities"],
  },

  "MA-14::job-and-batch": {
    title: "Computing a cost per unit under batch costing",
    format: "ot",
    marks: 2,
    requirement:
      "A batch of 500 units incurs direct materials of $4,000, direct labour of 200 hours at $12 per hour, and overhead absorbed at $9 per direct labour hour. The cost per unit is:\n\nA  $8.00\nB  $12.80\nC  $16.40\nD  $20.60",
    plan: [
      {
        step: "Build the total batch cost line by line",
        detail:
          "Materials $4,000. Labour 200 × $12 = $2,400. Overhead 200 × $9 = $1,800. Laying it out in three lines prevents a component being dropped.",
      },
      {
        step: "Check the overhead basis is hours, not labour cost",
        detail:
          "The rate is per direct labour HOUR, so it multiplies 200 hours. Applying it to the $2,400 labour cost would be a different and much larger figure, and is the standard trap.",
      },
      {
        step: "Total and divide by the batch size",
        detail:
          "$4,000 + $2,400 + $1,800 = $8,200. Divided by 500 units = **$16.40 per unit**.",
      },
      {
        step: "Check the components against the distractors",
        detail:
          "$12.80 is $6,400 ÷ 500, which omits the overhead. $8.00 is materials alone. Each option is one component missing, which is why the layout matters.",
      },
    ],
    answer:
      "**C — $16.40.**\n\nMaterials $4,000 + labour (200 × $12 = $2,400) + overhead (200 × $9 = $1,800) = **$8,200** total batch cost.\n\n$8,200 ÷ 500 units = **$16.40 per unit**.\n\nThe overhead rate is per direct labour **hour**, so it applies to the 200 hours, not to the $2,400 labour cost — applying it to the cost would give $21,600 of overhead and an absurd unit cost.\n\nEach distractor is one component omitted: $12.80 drops the overhead, $8.00 is materials alone. Setting the three lines out separately before totalling is what makes the omission impossible.",
    earns: [
      "Reading the overhead absorption basis carefully — per hour, not per dollar",
      "Building the cost in labelled lines so no component is dropped",
    ],
    loses: ["Applying the overhead rate to labour cost instead of labour hours"],
  },

  "MA-14::process-losses": {
    title: "Costing output where a normal loss has a scrap value",
    format: "ot",
    marks: 2,
    requirement:
      "1,000 kg of input costing $9,000 enters a process. Normal loss is 10% of input and has a scrap value of $2 per kg. Actual output was 900 kg. The cost per kg of good output is:\n\nA  $9.00\nB  $9.78\nC  $10.00\nD  $11.11",
    plan: [
      {
        step: "Compute the expected output, not the input, as the denominator",
        detail:
          "Normal loss is 10% of 1,000 = 100 kg, so expected good output is 900 kg. Normal loss is expected and unavoidable, so its cost is borne by the good units — never spread over the input.",
      },
      {
        step: "Reduce the cost by the scrap proceeds",
        detail:
          "The 100 kg of normal loss sells for 100 × $2 = $200. That recovery is credited to the process, so the net cost to be spread is $9,000 − $200 = $8,800.",
      },
      {
        step: "Divide net cost by expected output",
        detail:
          "$8,800 ÷ 900 kg = **$9.78 per kg**. Both adjustments must be made — one without the other gives an offered wrong answer.",
      },
      {
        step: "Read the distractors as the missing adjustments",
        detail:
          "$10.00 is $9,000 ÷ 900, forgetting the scrap value. $9.00 is $9,000 ÷ 1,000, using input as the denominator. $11.11 inverts something entirely. Each names a specific omission.",
      },
    ],
    answer:
      "**B — $9.78.**\n\nNormal loss = 10% × 1,000 = 100 kg, so expected good output is **900 kg**.\nScrap proceeds = 100 × $2 = **$200**, credited to the process.\nNet cost = $9,000 − $200 = **$8,800**.\nCost per kg = $8,800 ÷ 900 = **$9.78**.\n\nBoth adjustments are essential and each distractor is one of them missing: **$10.00** forgets the scrap value, **$9.00** divides by input rather than expected output.\n\nThe principle is that normal loss is expected and unavoidable, so its cost is absorbed by the good units. Actual output equalled expected output here, so there is no abnormal loss or gain — had output been 880 kg, the 20 kg abnormal loss would be valued at $9.78 and written off separately rather than being allowed to inflate the cost of good output.",
    earns: [
      "Dividing by expected output and crediting the scrap value — both, not one",
      "Knowing abnormal loss is valued at the same rate and written off separately",
    ],
    loses: ["Spreading the cost over input units, which lets the loss disappear into the unit cost"],
  },

  "MA-14::equivalent-units": {
    title: "Converting work in progress into equivalent units",
    format: "ot",
    marks: 2,
    requirement:
      "In a process, 800 units were completed and 400 units remain in closing work in progress, 25% complete as to conversion costs. Materials are added in full at the start. The equivalent units for **conversion** costs are:\n\nA  800\nB  900\nC  1,200\nD  1,000",
    plan: [
      {
        step: "Understand what an equivalent unit expresses",
        detail:
          "Part-finished units restated as the number of fully-finished units the same work would have produced. 400 units at 25% complete represent the same conversion work as 100 finished units.",
      },
      {
        step: "Handle materials and conversion on separate columns",
        detail:
          "Materials are added at the start, so WIP is 100% complete for materials. Conversion is 25% complete. The two columns give different totals, and the stem asks only about conversion.",
      },
      {
        step: "Compute the conversion column",
        detail:
          "Completed units 800 × 100% = 800. WIP 400 × 25% = 100. Total = **900 equivalent units**.",
      },
      {
        step: "Compute the materials column to see the distractor",
        detail:
          "800 + (400 × 100%) = 1,200, which is option C — the materials answer offered against a conversion question. Option A ignores WIP altogether.",
      },
    ],
    answer:
      "**B — 900.**\n\nConversion: completed units 800 × 100% = 800, plus WIP 400 × 25% = 100. Total **900 equivalent units**.\n\nThe two cost elements must be kept in separate columns because they reach different stages of completion. Materials are added in full at the start, so the materials column is 800 + (400 × 100%) = **1,200** — which is option C, the right answer to the other half of the question.\n\nOption A ignores work in progress entirely, which would charge the whole period's conversion cost to the completed units alone and overstate their cost.\n\nCost per equivalent unit = cost for the element ÷ equivalent units for that element, and the two rates differ.",
    earns: [
      "Running materials and conversion as separate columns with different completion percentages",
      "Reading which element the question asks about",
    ],
    loses: ["Applying one completion percentage to both elements"],
  },

  "MA-14::joint-by-products": {
    title: "Apportioning joint cost, and telling a by-product apart",
    format: "ot",
    marks: 2,
    requirement:
      "A process costing $80,000 yields 4,000 litres of product X, which sells for $30 per litre, and 2,000 litres of product Y, which sells for $10 per litre. Using the **sales value at split-off** method, the joint cost apportioned to product X is:\n\nA  $40,000\nB  $53,333\nC  $60,000\nD  $68,571",
    plan: [
      {
        step: "Compute the sales value of each product, not its volume",
        detail:
          "X: 4,000 × $30 = $120,000. Y: 2,000 × $10 = $20,000. Total sales value $140,000. Using litres instead would be the physical units method and gives a different answer.",
      },
      {
        step: "Express each as a share of total sales value",
        detail:
          "X is 120,000 ÷ 140,000 = 6/7 of the total. Working in fractions rather than rounded percentages avoids a rounding error large enough to miss the option.",
      },
      {
        step: "Apply the share to the joint cost",
        detail:
          "$80,000 × 120,000 ÷ 140,000 = **$68,571**.",
      },
      {
        step: "Compute the physical units answer to identify the distractor",
        detail:
          "By litres X takes 4,000 ÷ 6,000 = 2/3, giving $53,333 — option B. That is the answer to the method the question did not ask for, which is exactly why it is offered.",
      },
    ],
    answer:
      "**D — $68,571.**\n\nSales value at split-off: X = 4,000 × $30 = $120,000; Y = 2,000 × $10 = $20,000; total $140,000.\n\nX's share = $80,000 × 120,000 ÷ 140,000 = **$68,571**.\n\nOption B, $53,333, is the **physical units** answer — X takes 4,000 ÷ 6,000 of the cost. It is offered because it is the right answer to the other method, so reading which method the stem specifies is the whole question.\n\nA **by-product** is treated differently again: it has minor value, so its net revenue is deducted from the joint cost rather than being given a share of it. What separates a joint product from a by-product is the significance of its value.",
    earns: [
      "Reading which apportionment method the stem names before computing",
      "Knowing a by-product's revenue is deducted from cost rather than apportioned",
    ],
    loses: ["Apportioning on litres when the stem specified sales value"],
  },

  "MA-14::service-costing": {
    title: "Choosing a composite cost unit for a service",
    format: "ot",
    marks: 2,
    requirement:
      "Which is the most appropriate cost unit for a road haulage business?\n\nA  Cost per vehicle\nB  Cost per tonne-kilometre\nC  Cost per driver\nD  Cost per journey",
    plan: [
      {
        step: "Identify what actually drives the cost",
        detail:
          "Two things independently: how much is carried, and how far. A unit capturing only one of them will price a heavy short trip identically to a light long one.",
      },
      {
        step: "Recognise the composite unit as the answer to that",
        detail:
          "A composite cost unit combines two variables precisely because one alone would not be comparable. Tonne-kilometres multiply weight by distance.",
      },
      {
        step: "Test the single-variable options",
        detail:
          "Cost per journey treats a 10 km delivery and a 500 km haul as the same unit. Cost per vehicle and cost per driver measure resources held, not service delivered.",
      },
      {
        step: "Recall the other standard composite units",
        detail:
          "Hotels use bed-nights, hospitals patient-days, and passenger transport passenger-kilometres. All follow the same pattern of quantity times duration or distance.",
      },
    ],
    answer:
      "**B — cost per tonne-kilometre.**\n\nHaulage cost is driven independently by **weight carried** and **distance travelled**, so a unit capturing only one is not comparable across jobs — cost per journey would treat a 10 km delivery and a 500 km haul as equivalent.\n\nA **composite cost unit** multiplies the two, which is why service costing uses them so heavily. The standard set: **bed-nights** for hotels, **patient-days** for hospitals, **passenger-kilometres** for passenger transport.\n\nCost per vehicle and cost per driver measure resources held rather than service delivered, so they say nothing about how efficiently the service was provided.",
    earns: ["Identifying two independent cost drivers and requiring the unit to capture both"],
    loses: ["Choosing a single-variable unit that makes unlike jobs look alike"],
  },

  /* ── MA-15 · Alternative costing principles ──────────────────── */

  "MA-15::why-alternatives": {
    title: "Why traditional absorption costing came under pressure",
    format: "ot",
    marks: 2,
    requirement:
      "Traditional absorption costing based on direct labour hours has become less appropriate in many modern manufacturers principally because:\n\nA  Direct labour is now a small proportion of total cost while overhead is large\nB  Overheads have become easier to trace to products\nC  Companies no longer produce more than one product\nD  Accounting standards prohibit labour-based absorption",
    plan: [
      {
        step: "Ask what an absorption base has to be to work",
        detail:
          "It must be a reasonable proxy for what causes the overhead, and it must be large enough that small errors in it do not distort the result badly.",
      },
      {
        step: "Describe what changed in modern manufacturing",
        detail:
          "Automation cut direct labour to a small fraction of cost while support activities — setups, quality control, scheduling, handling — grew. A shrinking base now carries an expanding overhead.",
      },
      {
        step: "State the distortion that follows",
        detail:
          "A small base magnifies error, and labour hours do not cause setup or handling costs at all. High-volume simple products end up subsidised by low-volume complex ones, or the reverse.",
      },
      {
        step: "Dismiss the three that are false",
        detail:
          "Overheads have become harder to trace, not easier. Multi-product manufacture is more common, not less. No accounting standard prohibits labour-based absorption.",
      },
    ],
    answer:
      "**A — direct labour is now a small proportion of total cost while overhead is large.**\n\nAutomation cut direct labour to a small fraction of total cost while support activities — machine setups, quality control, production scheduling, materials handling — grew. So a shrinking base is being used to absorb an expanding pool.\n\nThat produces two problems. A small base **magnifies** any error in it, and labour hours do not **cause** setup or handling costs at all. The result is cross-subsidy: high-volume simple products absorb overhead they did not cause, while low-volume complex products look cheaper than they are.\n\nThat is precisely the problem activity based costing was developed to address.",
    earns: ["Naming both the small-base and the wrong-driver problems"],
    loses: ["Choosing an option that reverses the actual trend in overhead traceability"],
  },

  "MA-15::abc": {
    title: "Computing a cost driver rate and applying it",
    format: "ot",
    marks: 2,
    requirement:
      "Setup costs total $180,000 for the year and there are 450 setups. Product P requires 30 setups and produces 6,000 units. The setup cost per unit of product P is:\n\nA  $2.00\nB  $6.00\nC  $30.00\nD  $400.00",
    plan: [
      {
        step: "Compute the cost per driver first, never per unit",
        detail:
          "$180,000 ÷ 450 setups = $400 per setup. The driver rate always comes first in ABC, because the cost is caused by the activity rather than by output volume.",
      },
      {
        step: "Charge the product with the activity it consumed",
        detail:
          "Product P used 30 setups × $400 = $12,000 of setup cost. That is what P caused, independent of how many units it made.",
      },
      {
        step: "Only now divide by units",
        detail:
          "$12,000 ÷ 6,000 units = **$2.00 per unit**. The two-stage sequence — cost per driver, then cost per unit — is what ABC is.",
      },
      {
        step: "Note the insight the numbers carry",
        detail:
          "Option D, $400, is the driver rate reported as if it were a unit cost. And the point of the exercise: a product with the same setups but only 1,000 units would carry $12 per unit, which traditional absorption on labour hours would never reveal.",
      },
    ],
    answer:
      "**A — $2.00.**\n\nCost per driver: $180,000 ÷ 450 setups = **$400 per setup**.\nCharged to product P: 30 × $400 = **$12,000**.\nPer unit: $12,000 ÷ 6,000 = **$2.00**.\n\nOption D is the driver rate mistaken for a unit cost. The two-stage sequence — cost per driver first, then per unit — is the whole method.\n\nThe insight it delivers: a product making only 1,000 units on the same 30 setups would carry **$12 per unit** of setup cost, six times as much. Absorption on labour hours would spread setup cost by volume and hide that completely, which is why low-volume products are systematically undercosted under traditional systems.",
    earns: [
      "Computing the driver rate before touching unit volumes",
      "Being able to say why low-volume products are undercosted without ABC",
    ],
    loses: ["Dividing total setup cost by total units, which reproduces the very averaging ABC exists to avoid"],
  },

  "MA-15::target-costing": {
    title: "Deriving a target cost and identifying the gap",
    format: "ot",
    marks: 2,
    requirement:
      "A company plans to sell a product for $60 and requires a margin of 25% of the selling price. The estimated current cost is $50. The **cost gap** is:\n\nA  $5\nB  $10\nC  $15\nD  $45",
    plan: [
      {
        step: "Note that target costing works backwards from the market",
        detail:
          "Price is set by what the market will pay, the required margin is deducted, and the remainder is what the product must cost. Cost is the output of the calculation, not the input.",
      },
      {
        step: "Compute the required margin on the stated base",
        detail:
          "25% OF THE SELLING PRICE = 25% × $60 = $15. Read the base carefully — 25% on cost would be a different figure and is a common misreading.",
      },
      {
        step: "Derive the target cost",
        detail:
          "$60 − $15 = **$45 target cost**. That is the maximum the product may cost if the margin is to be achieved at that price.",
      },
      {
        step: "Take the gap as the excess of current over target",
        detail:
          "$50 estimated − $45 target = **$5 cost gap**. Option D reports the target cost itself, and option C reports the margin.",
      },
    ],
    answer:
      "**A — $5.**\n\nRequired margin = 25% × $60 = **$15**.\nTarget cost = $60 − $15 = **$45**.\nCost gap = current $50 − target $45 = **$5**.\n\nEvery figure in the calculation is offered as an option: $45 is the target cost, $15 is the margin, $10 is the current profit at $50 cost. Naming what each number is before selecting is what keeps them apart.\n\nThe direction of the method is what makes it examinable. Cost-plus starts from cost and adds a margin, so the market may refuse the resulting price. **Target costing starts from the market** and works back, so the gap must be closed by value engineering, redesign or process improvement — before production begins, when the cost is still mostly determined.",
    earns: [
      "Computing the margin on the stated base — of selling price, not on cost",
      "Naming each intermediate figure so the gap is not confused with the target",
    ],
    loses: ["Reporting the target cost as the gap"],
  },

  "MA-15::lifecycle-tqm": {
    title: "What life cycle costing captures that period costing misses",
    format: "ot",
    marks: 2,
    requirement:
      "Life cycle costing differs from traditional period costing principally in that it:\n\nA  Ignores fixed costs\nB  Accumulates all costs of a product from design through to withdrawal\nC  Applies only to service businesses\nD  Values inventory at marginal cost",
    plan: [
      {
        step: "Read the term literally",
        detail:
          "Costing across the product's whole life rather than within a reporting period. The definition is contained in the name.",
      },
      {
        step: "Name the costs a period view misses",
        detail:
          "Design and development spend incurred before any sale, and decommissioning or withdrawal costs incurred after sales end. Neither appears in the periods when the product is selling.",
      },
      {
        step: "State why that matters for a decision",
        detail:
          "A product can look profitable in every period of its selling life and still never recover its development cost. Only the whole-life total answers whether it was worth making.",
      },
      {
        step: "Reject the three that describe other techniques",
        detail:
          "Ignoring fixed costs and valuing inventory at marginal cost are marginal costing. Applying only to services is simply false — the technique originated in manufacturing.",
      },
    ],
    answer:
      "**B — accumulates all costs of a product from design through to withdrawal.**\n\nLife cycle costing spans the whole life rather than a reporting period, so it captures the costs a period view never sees: **design and development** incurred before any sale, and **decommissioning** incurred after sales end.\n\nThat matters for the decision because a product can show a profit in every period of its selling life and still fail to recover its development cost. Only the whole-life total answers whether it was worth making — which is also why the great majority of a product's cost is **committed at the design stage**, long before it is incurred.\n\nA and D describe marginal costing, and C is false.",
    earns: [
      "Naming the pre-launch and post-sale costs a period view omits",
      "Knowing that most cost is committed at design, which is what makes the technique actionable",
    ],
    loses: ["Confusing it with marginal costing, which two of the options describe"],
  },
}
