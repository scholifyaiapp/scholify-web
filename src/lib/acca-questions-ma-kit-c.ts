import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-ma-kit-builders"

/*
 * MA · Area C question kit — chapters 10 to 15.
 *
 * The most computational area, so numeric-entry items dominate: a candidate who
 * can pick an EOQ from four options has not demonstrated they can compute one.
 *
 * Original Scholify content.
 */

/* ── Chapter 10 · Accounting for materials ─────────────────────── */

const CH10: AccaQuestion[] = [
  num("MAK-10-01", "MA-10", "C", "medium", 2,
    "Usage runs between 300 and 500 units a week, averaging 400. Lead time is 2 to 4 weeks, averaging 3. What is the reorder level, in units?",
    2000, "units", 0.5,
    "Reorder level = MAXIMUM usage × MAXIMUM lead time = 500 × 4 = 2,000 units. The formula deliberately uses the worst case, so that stock does not run out even if consumption is fastest and delivery slowest. Using averages gives 1,200 and would leave the business exposed about half the time."),

  num("MAK-10-02", "MA-10", "C", "hard", 2,
    "Reorder level is 2,000 units, average usage 400 a week and average lead time 3 weeks. The reorder quantity is 2,500 units. What is average inventory, in units?",
    2050, "units", 0.5,
    "Buffer (minimum) level = 2,000 − (400 × 3) = 800 units. Average inventory = buffer + half the reorder quantity = 800 + 1,250 = 2,050 units. Taking half the reorder quantity alone gives 1,250 and omits the buffer — a very common error that understates holding cost."),

  num("MAK-10-03", "MA-10", "C", "medium", 2,
    "Annual demand is 40,000 units, each order costs $80 to place and holding cost is $2.50 per unit per year. What is the EOQ, in units?",
    1600, "units", 1,
    "EOQ = √(2C₀D ÷ Ch) = √(2 × 80 × 40,000 ÷ 2.50) = √(6,400,000 ÷ 2.50) = √2,560,000 = 1,600 units. Check it: 25 orders × $80 = $2,000 ordering cost, and 800 average units × $2.50 = $2,000 holding cost. At the EOQ the two are EQUAL."),

  num("MAK-10-04", "MA-10", "C", "hard", 2,
    "Annual demand 12,500 units, order cost $40, holding cost $1.60 per unit per year. What is the EOQ, in units, to the nearest unit?",
    791, "units", 2,
    "EOQ = √(2 × 40 × 12,500 ÷ 1.60) = √(1,000,000 ÷ 1.60) = √625,000 = 790.6, so 791 units. Compute the whole bracket before taking the root — omitting the 2 in the numerator gives 559, and forgetting the root entirely gives 625,000."),

  q("MAK-10-05", "MA-10", "C", "hard", 2,
    "A supplier offers a 1% discount on orders above the EOQ. How should the offer be evaluated?",
    [
      "Recalculate the EOQ using the discounted price",
      "Compare total purchase, ordering and holding cost at the EOQ and at each discount threshold, and pick the lowest",
      "Accept it, since a discount always reduces cost",
      "Compare only ordering and holding cost at each order size",
    ],
    1,
    "The EOQ formula IGNORES purchase price, so it cannot answer a discount question. All THREE costs — purchase, ordering and holding — must be compared at the EOQ and at each threshold. Option 4 omits the very cost the discount changes, and a discount is not automatically worthwhile once extra holding cost is counted."),

  q("MAK-10-06", "MA-10", "C", "medium", 2,
    "When should the economic batch quantity be used instead of the EOQ?",
    [
      "When the order quantity exceeds 1,000 units",
      "When the business manufactures the item itself, so stock builds up gradually while being consumed",
      "When bulk discounts are available",
      "When holding costs exceed ordering costs",
    ],
    1,
    "The EBQ applies where the business MAKES rather than buys, so stock accumulates while being used and never reaches the full batch size — which makes average inventory lower and the EBQ larger than the equivalent EOQ. The giveaway in a question is a stated production RATE alongside demand."),

  num("MAK-10-07", "MA-10", "C", "hard", 2,
    "Receipts: 200 units at $10, then 300 at $12. An issue of 400 units follows. Under FIFO, what is the value of the issue, in $?",
    4400, "$", 1,
    "FIFO issues the OLDEST first: all 200 at $10 = $2,000, then 200 of the $12 batch = $2,400. Total $4,400. Under LIFO the same issue would be valued at $4,600 and under AVCO $4,480 — the total cost of materials is identical under all three, only the split between cost of sales and closing inventory differs."),

  q("MAK-10-08", "MA-10", "C", "medium", 2,
    "During a period of rising material prices, which valuation method produces the highest reported profit?",
    ["LIFO", "FIFO", "AVCO", "All three give the same profit"],
    1,
    "FIFO issues the oldest and cheapest stock first, so cost of sales is lowest and profit HIGHEST when prices are rising. LIFO gives the lowest profit and AVCO falls between. Note total cost over the period is identical under all three — the reconciliation of issues plus closing inventory to total purchases confirms it."),

  multi("MAK-10-09", "MA-10", "C", "medium", 2,
    "Which TWO are holding costs rather than ordering costs?",
    ["Goods inwards inspection on each delivery", "Insurance of inventory", "Invoice processing per order", "The cost of capital tied up in stock"],
    [1, 3],
    "INSURANCE of inventory and the COST OF CAPITAL tied up in it both rise with the quantity held, making them holding costs. Goods inwards inspection and invoice processing are incurred per ORDER, so they fall as order size rises — which is the tension the EOQ resolves."),

  q("MAK-10-10", "MA-10", "C", "medium", 2,
    "What is the difference between a bin card and a stores ledger account?",
    [
      "A bin card records values; a stores ledger records quantities",
      "A bin card records quantities only; a stores ledger records quantities and values",
      "They are alternative names for the same record",
      "A bin card is prepared annually; a stores ledger monthly",
    ],
    1,
    "A BIN CARD is a physical control kept in stores showing QUANTITIES only. A STORES LEDGER ACCOUNT is the accounting record showing quantities AND values under the chosen valuation method. Agreeing the two is a genuine control: a discrepancy means goods moved without a document, or a document was raised without goods moving."),
]

/* ── Chapter 11 · Accounting for labour ────────────────────────── */

const CH11: AccaQuestion[] = [
  q("MAK-11-01", "MA-11", "C", "medium", 2,
    "A direct worker's overtime premium arises because the factory was generally behind schedule. How is the premium treated?",
    [
      "Direct cost of whichever job was worked on during the overtime",
      "Indirect cost, charged to production overhead",
      "Excluded from cost accounting",
      "Direct cost, apportioned equally across all jobs in progress",
    ],
    1,
    "The premium arises from WHEN the work was done rather than from any particular product, so it is INDIRECT. Charging it to whichever job happened to run into the evening would be arbitrary. The exception is where a specific customer requested urgent completion, when the premium becomes direct to that job."),

  num("MAK-11-02", "MA-11", "C", "hard", 2,
    "A direct worker paid $14 per hour for a 37-hour week works 45 hours, overtime at time-and-a-half, with 3 hours idle. What is the DIRECT labour cost, in $?",
    588, "$", 1,
    "Productive hours = 45 − 3 idle = 42, at the BASIC rate: 42 × $14 = $588. Two separate exclusions are needed: the overtime PREMIUM (8 × $7 = $56) and the IDLE hours' basic pay (3 × $14 = $42), both indirect. Total pay $686 = $588 direct + $98 indirect."),

  num("MAK-11-03", "MA-11", "C", "hard", 2,
    "A department began the year with 240 employees and ended with 260. 46 people left, of whom 8 left posts that were then closed. What is the labour turnover rate, as a percentage to one decimal place?",
    15.2, "%", 0.1,
    "Average employees = (240 + 260) ÷ 2 = 250. Leavers REQUIRING REPLACEMENT = 46 − 8 = 38. Turnover = 38 ÷ 250 × 100 = 15.2%. Using all 46 gives 18.4% and overstates the problem; using opening or closing headcount instead of the average is the other common error."),

  num("MAK-11-04", "MA-11", "C", "hard", 2,
    "Standard hours for actual output are 4,800; actual hours worked 4,000; budgeted hours 5,000. What is the efficiency ratio, as a percentage?",
    120, "%", 0.5,
    "Efficiency = standard hours for actual output ÷ actual hours worked × 100 = 4,800 ÷ 4,000 × 100 = 120%. The workforce produced in 4,000 hours what should have taken 4,800. Capacity is 4,000 ÷ 5,000 = 80% and production volume 4,800 ÷ 5,000 = 96% — and 1.20 × 0.80 = 0.96 confirms all three."),

  q("MAK-11-05", "MA-11", "C", "medium", 2,
    "A capacity ratio of 115% indicates that:",
    [
      "The workforce produced 15% more per hour than standard",
      "More hours were worked than budgeted, which may include overtime at a premium",
      "Output exceeded budget by 15%",
      "Efficiency improved by 15%",
    ],
    1,
    "The CAPACITY ratio compares actual hours worked with BUDGETED hours, so above 100% simply means more hours were worked than planned — neither good nor bad in itself, and possibly overtime carrying a premium. Producing faster than standard is the EFFICIENCY ratio, and total output is the production volume ratio."),

  num("MAK-11-06", "MA-11", "C", "medium", 2,
    "A worker paid $15 per hour receives 60% of the value of time saved. Standard time is 15 minutes per unit; she produces 180 units in 38 hours. What is her total pay, in $?",
    633, "$", 1,
    "Standard time for the output = 180 × 15 minutes = 45 hours. Time saved = 45 − 38 = 7 hours. Bonus = 7 × $15 × 60% = $63. Basic = 38 × $15 = $570. Total $633. Time saved is measured against the standard time for the output PRODUCED, not against contracted hours."),

  q("MAK-11-07", "MA-11", "C", "hard", 2,
    "A pieceworker paid $1.20 per unit with a guaranteed weekly minimum of $420 produces 320 units. How is the pay treated?",
    [
      "$384 direct labour cost only",
      "$420 paid, of which $384 is direct and $36 indirect",
      "$420 all direct, since she is a direct worker",
      "$420 all indirect, since the guarantee is not related to output",
    ],
    1,
    "Piecework earnings are 320 × $1.20 = $384, which is below the guarantee, so $420 is paid. The $384 relates to units produced and is DIRECT; the $36 excess does not relate to output and is INDIRECT. A guarantee creates an indirect element whenever earnings fall short of it."),

  multi("MAK-11-08", "MA-11", "C", "medium", 2,
    "Which TWO are costs of high labour turnover?",
    ["Reduced pension liabilities", "Lost output while a post is vacant and while a new starter reaches full productivity", "Repeated training costs for each new recruit", "Lower average wage rates"],
    [1, 2],
    "LOST OUTPUT during vacancy and run-up, and REPEATED TRAINING costs, are both genuine costs — alongside replacement costs, higher error rates, experienced staff diverted to training, and lost accumulated knowledge. The other two are incidental effects that do not offset those costs, and note that ZERO turnover is not a target either."),

  q("MAK-11-09", "MA-11", "C", "medium", 2,
    "How is idle time treated in cost accounting?",
    [
      "Direct cost of the product being made when the idle time occurred",
      "Indirect cost, because no product was worked on",
      "Excluded from the accounts as a non-cost",
      "Direct cost, split between all products in production",
    ],
    1,
    "Idle time payments are INDIRECT: hours were paid for and no product was worked on, so there is nothing to trace them to. Isolating idle time in its own variance also matters for control — otherwise the labour efficiency variance absorbs it and conceals that the problem was downtime rather than working pace."),

  q("MAK-11-10", "MA-11", "C", "hard", 2,
    "Which remuneration method makes labour cost per unit most predictable, and what is its principal risk?",
    [
      "Time-based pay; the risk is that cost per unit rises if output falls",
      "Piecework; the risk is that quality suffers as workers prioritise volume",
      "A time-saved bonus; the risk is that the target becomes out of date",
      "Salaried pay; the risk is excessive supervision cost",
    ],
    1,
    "PIECEWORK fixes labour cost per unit by definition, since pay is a rate per unit produced — which makes it the most predictable. Its principal risk is QUALITY, because the incentive rewards volume; it is also unsuitable where output is outside the worker's control, which is why a guaranteed minimum is usually needed."),
]

/* ── Chapter 12 · Accounting for overheads ─────────────────────── */

const CH12: AccaQuestion[] = [
  num("MAK-12-01", "MA-12", "C", "medium", 2,
    "Budgeted overhead is $154,800 on 18,000 budgeted machine hours. What is the overhead absorption rate, in $ per machine hour?",
    8.6, "$", 0.01,
    "OAR = budgeted overhead ÷ budgeted activity = $154,800 ÷ 18,000 = $8.60 per machine hour. BOTH figures are budgeted, because the rate must be set before the period begins so that costs can be charged as work is done — which is exactly why under- and over-absorption arise."),

  num("MAK-12-02", "MA-12", "C", "hard", 2,
    "The OAR is $8.60 per machine hour. Actual overhead was $161,000 and actual activity 17,200 machine hours. What is the under-absorption, in $?",
    13080, "$", 1,
    "Absorbed = ACTUAL activity × BUDGETED rate = 17,200 × $8.60 = $147,920. Actual overhead $161,000 exceeds this by $13,080, so overhead is UNDER-absorbed — a debit to profit. It splits into $6,200 of overspend and 800 lost hours × $8.60 = $6,880 of unrecovered absorption."),

  q("MAK-12-03", "MA-12", "C", "medium", 2,
    "Budgeted overhead is $240,000 on 30,000 machine hours. Actual overhead is $250,000 and actual hours 31,000. What is the position?",
    [
      "Under-absorbed by $10,000",
      "Under-absorbed by $2,000",
      "Over-absorbed by $8,000",
      "Over-absorbed by $10,000",
    ],
    1,
    "OAR = $240,000 ÷ 30,000 = $8.00. Absorbed = 31,000 × $8.00 = $248,000, against actual overhead of $250,000 — UNDER-absorbed by $2,000. Note the two causes offset: expenditure was $10,000 adverse while the extra 1,000 hours absorbed $8,000 more, netting $2,000 adverse."),

  q("MAK-12-04", "MA-12", "C", "easy", 2,
    "What is the difference between allocation and apportionment of overheads?",
    [
      "Allocation shares a cost between centres; apportionment charges it to one",
      "Allocation charges a whole overhead to the one centre that caused it; apportionment shares a common overhead between centres",
      "Allocation applies to variable costs; apportionment to fixed costs",
      "They are alternative names for the same process",
    ],
    1,
    "ALLOCATION charges an overhead IN ITS ENTIRETY to a single cost centre, because that centre alone caused it. APPORTIONMENT SHARES a common overhead across several centres on a basis reflecting how each benefited. Option 1 reverses the two definitions."),

  q("MAK-12-05", "MA-12", "C", "medium", 2,
    "Which basis is most appropriate for apportioning factory rent between cost centres?",
    ["Number of employees", "Floor area occupied", "Machine value", "Number of requisitions"],
    1,
    "Rent is driven by SPACE, so FLOOR AREA is the basis that measures what causes the cost. Headcount suits canteen and welfare costs, machine value suits machine insurance and depreciation, and requisitions suit stores costs. The test is always: what actually drives this cost?"),

  q("MAK-12-06", "MA-12", "C", "hard", 2,
    "After reapportioning service cost centre overheads, what must the total overhead in the production cost centres equal?",
    [
      "The production centres' own overheads only",
      "The total overhead of production AND service centres combined",
      "The service centres' overheads only",
      "The total overhead less any reciprocal transfers",
    ],
    1,
    "Reapportionment MOVES cost between centres and never creates or destroys it, so the production centres must end up holding the whole original overhead of production and service centres together. Checking that total is the fastest way to catch a percentage applied twice or a residue left in a service centre."),

  num("MAK-12-07", "MA-12", "C", "hard", 2,
    "Stores overhead is $30,000, serving Machining 60% and Assembly 40%. Machining's own overhead is $120,000. After reapportionment, what is Machining's total overhead, in $?",
    138000, "$", 1,
    "Machining receives 60% × $30,000 = $18,000, giving $120,000 + $18,000 = $138,000. Assembly receives $12,000. Check: $138,000 + Assembly's total must equal the original $120,000 + Assembly's own + $30,000 — reapportionment never changes the total."),

  multi("MAK-12-08", "MA-12", "C", "medium", 2,
    "Which TWO statements about the overhead absorption rate are correct?",
    ["It is calculated using budgeted overhead and budgeted activity", "It is calculated using actual overhead and actual activity", "Overhead absorbed equals actual activity multiplied by the budgeted rate", "Overhead absorbed equals budgeted activity multiplied by the actual rate"],
    [0, 2],
    "The rate uses BUDGETED overhead ÷ BUDGETED activity, because it must exist before the period starts. Overhead ABSORBED is then ACTUAL activity × that BUDGETED rate. Options 2 and 4 use actual figures in the rate, which would make under- and over-absorption impossible by construction."),

  q("MAK-12-09", "MA-12", "C", "medium", 2,
    "What effect does over-absorption of overhead have on reported profit?",
    ["It reduces profit", "It increases profit", "It has no effect on profit", "It reduces inventory value"],
    1,
    "Over-absorption means production was charged with MORE overhead than was actually incurred, so the excess is credited back and profit INCREASES. Under-absorption is the reverse — an additional expense that reduces profit. Decide the direction by asking whether production was charged too much or too little."),

  q("MAK-12-10", "MA-12", "C", "hard", 2,
    "Which absorption basis is most appropriate in a highly automated, capital-intensive factory?",
    ["Direct labour hours", "Machine hours", "Units of output", "Percentage of prime cost"],
    1,
    "Where overhead is driven by running MACHINES, machine hours measure what causes it. Absorbing on labour hours in an automated plant means a small and shrinking base carrying a large cost, so a small error in the base becomes a large error in the product cost — one of the pressures that produced activity based costing."),
]

/* ── Chapter 13 · Absorption and marginal costing ──────────────── */

const CH13: AccaQuestion[] = [
  q("MAK-13-01", "MA-13", "C", "easy", 2,
    "Under marginal costing, closing inventory is valued at:",
    [
      "Full production cost including fixed overhead",
      "Variable production cost only",
      "Total cost including selling and administration",
      "Selling price less the profit margin",
    ],
    1,
    "Marginal costing treats fixed production overhead as a PERIOD cost, charged in full against the period in which it arises, so it is never carried in inventory. Inventory is therefore valued at VARIABLE production cost only — and that single difference explains every divergence between the two systems."),

  num("MAK-13-02", "MA-13", "C", "medium", 2,
    "Selling price $50, variable production cost $22, variable selling cost $3 per unit. What is the contribution per unit, in $?",
    25, "$", 0.01,
    "Contribution = selling price less ALL variable costs = $50 − $22 − $3 = $25. The variable SELLING cost must be deducted too — omitting it gives $28 and overstates contribution, which would then distort every break-even and decision calculation built on it."),

  num("MAK-13-03", "MA-13", "C", "hard", 2,
    "Production was 20,000 units and sales 18,000. Fixed overhead is absorbed at $9 per unit. By how much does absorption profit exceed marginal profit, in $?",
    18000, "$", 1,
    "Inventory rose by 2,000 units, each carrying $9 of fixed overhead forward instead of charging it this period: 2,000 × $9 = $18,000. Absorption profit is HIGHER when inventory RISES. Derive the direction by asking which period ends up bearing the fixed overhead."),

  q("MAK-13-04", "MA-13", "C", "hard", 2,
    "Production was 12,000 units and sales 14,000. Fixed overhead is absorbed at $7 per unit. How do the profits compare?",
    [
      "Absorption profit is $14,000 higher",
      "Absorption profit is $14,000 lower",
      "The profits are equal",
      "Absorption profit is $98,000 lower",
    ],
    1,
    "Sales exceeded production by 2,000 units, so inventory FELL by 2,000 — releasing 2,000 × $7 = $14,000 of fixed overhead brought forward in opening inventory into this period's cost of sales. Absorption profit is therefore $14,000 LOWER."),

  q("MAK-13-05", "MA-13", "C", "medium", 2,
    "What is the ONLY difference between absorption and marginal costing?",
    [
      "The treatment of variable selling costs",
      "The treatment of fixed production overhead",
      "The treatment of direct materials",
      "The treatment of administration costs",
    ],
    1,
    "The only difference is whether FIXED PRODUCTION OVERHEAD is a product cost (absorption) or a period cost (marginal). Variable production costs and all non-production costs are treated identically under both — which is why a question that changes the treatment of variable selling costs is testing whether you noticed."),

  q("MAK-13-06", "MA-13", "C", "hard", 2,
    "Why does absorption costing create an incentive to overproduce?",
    [
      "Because variable costs fall as output rises",
      "Because producing more than is sold defers fixed overhead into inventory, raising reported profit without any extra sale",
      "Because inventory is valued at selling price",
      "Because fixed overhead falls per unit, reducing total cost",
    ],
    1,
    "Each unit produced carries fixed overhead into inventory rather than to the income statement, so building unsold stock RAISES reported profit — while tying up cash and risking obsolescence. Marginal costing removes the incentive entirely, because profit then moves with SALES."),

  q("MAK-13-07", "MA-13", "C", "medium", 2,
    "Which method is required for published financial statements, and why?",
    [
      "Marginal costing, because it is simpler",
      "Absorption costing, because IAS 2 requires inventory at full production cost",
      "Either, at the company's choice",
      "Marginal costing, because fixed overhead is a period cost",
    ],
    1,
    "IAS 2 requires inventory to be valued at FULL PRODUCTION COST, so absorption costing is needed for statutory reporting. Marginal costing is not acceptable for published accounts, which is why a company using it internally maintains both and reconciles between them."),

  num("MAK-13-08", "MA-13", "C", "hard", 2,
    "Contribution per unit is $32, sales 5,000 units, fixed production overhead $120,000 and fixed administration $60,000. What is the profit under marginal costing, in $?",
    -20000, "$", 1,
    "Total contribution = 5,000 × $32 = $160,000. Less fixed production $120,000 and fixed administration $60,000 = a LOSS of $20,000. The point of the format: contribution is struck first, then ALL fixed costs are deducted from it — never before it."),

  multi("MAK-13-09", "MA-13", "C", "medium", 2,
    "Which TWO are advantages of marginal costing?",
    ["It is required by IAS 2 for inventory valuation", "Contribution is the relevant figure for short-run decisions", "Profit moves with sales rather than production, removing the incentive to overproduce", "It ensures all fixed costs are recovered in the long run"],
    [1, 2],
    "CONTRIBUTION is the right basis for short-run decisions, because fixed costs usually do not change, and profit moving with SALES removes the overproduction incentive. IAS 2 requires ABSORPTION costing, and it is absorption costing that ensures fixed cost recovery — those are its advantages, not marginal's."),

  q("MAK-13-10", "MA-13", "C", "medium", 2,
    "Production equals sales in a period. How do absorption and marginal profit compare?",
    [
      "Absorption profit is higher",
      "Absorption profit is lower",
      "They are equal",
      "It depends on the absorption rate",
    ],
    2,
    "With no change in inventory, no fixed overhead is carried forward or released, so the profits are EQUAL. The difference is always the change in inventory units × fixed overhead per unit — and when that change is nil, so is the difference, whatever the absorption rate."),
]

/* ── Chapter 14 · Costing methods ──────────────────────────────── */

const CH14: AccaQuestion[] = [
  q("MAK-14-01", "MA-14", "C", "medium", 2,
    "Input was 8,000 litres, normal loss is 5% of input, and actual output was 7,700 litres. What is the abnormal item?",
    [
      "Abnormal loss of 300 litres",
      "Abnormal gain of 100 litres",
      "Abnormal loss of 100 litres",
      "There is no abnormal item",
    ],
    1,
    "Normal loss = 5% × 8,000 = 400 litres, so EXPECTED output is 7,600. Actual output of 7,700 exceeds expectation by 100 litres — an ABNORMAL GAIN, because actual loss was only 300 against the 400 expected. Treating the 300 actual loss as abnormal is the trap."),

  num("MAK-14-02", "MA-14", "C", "hard", 2,
    "5,000 kg at $8 per kg entered a process with labour and overhead of $19,000. Normal loss is 8% of input, with scrap value $3 per kg. What is the cost per kg of good output, in $ to four decimal places?",
    12.5652, "$", 0.001,
    "Total cost = (5,000 × $8) + $19,000 = $59,000. Normal loss = 400 kg with scrap value 400 × $3 = $1,200. Expected output = 4,600 kg. Cost per kg = ($59,000 − $1,200) ÷ 4,600 = $57,800 ÷ 4,600 = $12.5652. Normal loss units leave the denominator and its scrap value leaves the numerator."),

  q("MAK-14-03", "MA-14", "C", "hard", 2,
    "How is normal loss treated in a process account?",
    [
      "It is valued at the cost per unit of good output and charged to profit or loss",
      "It is given no cost: its units are excluded from the denominator and its scrap value deducted from cost",
      "It is valued at selling price and credited to the process",
      "It is ignored entirely",
    ],
    1,
    "NORMAL loss carries NO cost. Excluding its units from the denominator and deducting its scrap value from the numerator both push its cost onto the GOOD output — which is why good units cost more per kg than the raw input did. Abnormal loss and gain, by contrast, ARE valued and taken to profit or loss."),

  num("MAK-14-04", "MA-14", "C", "hard", 2,
    "9,000 units were started; 7,500 completed and 1,500 remain 100% complete for materials and 40% for conversion. What are the equivalent units for CONVERSION?",
    8100, "units", 1,
    "Completed 7,500 + WIP (1,500 × 40% = 600) = 8,100 equivalent units. For MATERIALS the figure would be 7,500 + 1,500 = 9,000, because materials are added at the start. Separate columns are essential — applying 40% to materials as well would misstate both the output and WIP values."),

  q("MAK-14-05", "MA-14", "C", "medium", 2,
    "Why are separate equivalent-unit calculations needed for materials and conversion cost?",
    [
      "Because materials are always more expensive",
      "Because materials are usually added at the start, so WIP is 100% complete for them while conversion accumulates gradually",
      "Because conversion cost is a period cost",
      "Because materials cannot be measured in equivalent units",
    ],
    1,
    "Materials are typically added AT THE START, so work in progress is fully complete for them even when only part-way through processing. Labour and overhead accumulate gradually, so the WIP completion percentage applies to them. Using one percentage for everything understates the materials in WIP."),

  q("MAK-14-06", "MA-14", "C", "hard", 2,
    "How is a by-product treated in process costing?",
    [
      "Its share of common process cost is apportioned on sales value",
      "Its net realisable value is deducted from the common process cost",
      "It is valued at the same cost per unit as the main product",
      "It is ignored until sold",
    ],
    1,
    "A BY-PRODUCT is not apportioned any cost. Its NET realisable value — after any further processing or handling — is DEDUCTED from the common process cost, reducing the main product's cost. Joint products, being of significant value, SHARE the cost instead. Joint products share; a by-product reduces."),

  num("MAK-14-07", "MA-14", "C", "hard", 2,
    "A process costing $84,000 yields 12,000 kg of product A and 1,000 kg of by-product B, which sells for $1.20 per kg after $200 of handling cost. What is the cost per kg of A, in $ to four decimal places?",
    6.9167, "$", 0.001,
    "By-product net realisable value = (1,000 × $1.20) − $200 = $1,000. Cost attributable to A = $84,000 − $1,000 = $83,000, over 12,000 kg = $6.9167 per kg. Note it is the NET realisable value that is deducted, after the further handling cost."),

  num("MAK-14-08", "MA-14", "C", "medium", 2,
    "A job cost $5,184 in total and is priced to earn a 25% margin on selling price. What is the price, in $?",
    6912, "$", 1,
    "A MARGIN is a percentage of SELLING PRICE, so cost is 75% of price: $5,184 ÷ 0.75 = $6,912. A 25% MARK-UP on cost would give $5,184 × 1.25 = $6,480 — a $432 difference turning on one word, so read which the question specifies."),

  q("MAK-14-09", "MA-14", "C", "medium", 2,
    "Which costing method suits a business producing continuous, indistinguishable output such as paint?",
    ["Job costing", "Batch costing", "Process costing", "Service costing"],
    2,
    "Where units are physically indistinguishable and flow continuously, no individual unit's cost can be identified, so the only possible answer is an AVERAGE — which is process costing. The distinguishing question is whether you can point at one unit and say what it individually cost."),

  num("MAK-14-10", "MA-14", "C", "hard", 2,
    "A haulier ran: 12 tonnes for 250 km, 8 tonnes for 400 km, 15 tonnes for 120 km, 10 tonnes for 300 km. Total cost $9,570. What is the cost per tonne-kilometre, in $ to two decimal places?",
    0.87, "$", 0.005,
    "Tonne-km: (12 × 250 = 3,000) + (8 × 400 = 3,200) + (15 × 120 = 1,800) + (10 × 300 = 3,000) = 11,000. Cost per tonne-km = $9,570 ÷ 11,000 = $0.87. Cost per tonne ($212.67) or per km ($8.94) could not price a job of 20 tonnes over 150 km; the composite unit can."),
]

/* ── Chapter 15 · Alternative costing principles ───────────────── */

const CH15: AccaQuestion[] = [
  q("MAK-15-01", "MA-15", "C", "medium", 2,
    "Under activity based costing, overhead is charged to products on the basis of:",
    [
      "Direct labour hours in every case",
      "The cost drivers that cause each activity's cost to be incurred",
      "Machine hours in every case",
      "The sales value of each product",
    ],
    1,
    "ABC collects overhead into cost pools by ACTIVITY and charges each using its COST DRIVER — the factor actually causing the cost, such as the number of set-ups or inspections. Swapping one volume measure for another is still traditional absorption, which is what ABC exists to replace."),

  num("MAK-15-02", "MA-15", "C", "hard", 2,
    "Set-up costs are $180,000 for 600 set-ups. Product Y uses 240 set-ups for 10,000 units. Under ABC, what is the set-up cost per unit of Y, in $?",
    7.2, "$", 0.01,
    "Cost per set-up = $180,000 ÷ 600 = $300. Y's set-up cost = 240 × $300 = $72,000, over 10,000 units = $7.20 per unit. Absorbing the same $180,000 on labour hours, where Y uses 0.5 hours per unit like everything else, would have given $1.80 — the cross-subsidy ABC reveals."),

  q("MAK-15-03", "MA-15", "C", "hard", 2,
    "When is ABC NOT worth implementing?",
    [
      "When product costs are needed for pricing",
      "Where overheads are a small proportion of total cost and products are similar in volume and complexity",
      "When the company has more than one product",
      "When overheads exceed direct costs",
    ],
    1,
    "Where overhead is SMALL or products are SIMILAR in volume and complexity, ABC gives nearly the same answer as absorption costing for considerably more effort. The examinable judgement is when it is worth the cost — not that it is universally superior."),

  num("MAK-15-04", "MA-15", "C", "medium", 2,
    "A product will sell at $60 and the company requires a 20% margin on selling price. What is the target cost, in $?",
    48, "$", 0.01,
    "Required profit = 20% × $60 = $12. Target cost = $60 − $12 = $48. Target costing works BACKWARDS from the market price, which reverses the traditional sequence of costing a product and then adding a margin."),

  num("MAK-15-05", "MA-15", "C", "medium", 2,
    "The target cost is $48 and the estimated cost with the current design is $52. Across 40,000 units, what is the total annual cost gap, in $?",
    160000, "$", 1,
    "Cost gap per unit = $52 − $48 = $4, over 40,000 units = $160,000 a year. The gap must be designed out BEFORE launch, because that is when most of a product's cost is still determined — once production begins only marginal savings remain available."),

  q("MAK-15-06", "MA-15", "C", "medium", 2,
    "A warranty claim from a customer falls into which category of quality cost?",
    ["Prevention", "Appraisal", "Internal failure", "External failure"],
    3,
    "A warranty claim arises AFTER the product reached the customer, making it an EXTERNAL failure cost — the most expensive category, because it includes lost reputation and lost future sales that never appear in the ledger. Internal failure covers scrap and rework caught before delivery."),

  q("MAK-15-07", "MA-15", "C", "hard", 2,
    "What is the central argument of total quality management on quality costs?",
    [
      "Inspection should be increased until all defects are found",
      "Spending more on prevention reduces total quality cost, because internal and especially external failure costs are far larger",
      "Some level of defects is economically optimal and should be accepted",
      "Quality costs cannot be measured",
    ],
    1,
    "TQM argues that PREVENTION spending reduces TOTAL quality cost, because failure costs — particularly external failure — dwarf it. That is why TQM aims at zero defects rather than at an economically optimal defect rate, and why increasing inspection alone treats the symptom."),

  q("MAK-15-08", "MA-15", "C", "hard", 2,
    "Why does period-by-period costing mislead on a newly launched product?",
    [
      "Because inventory is valued inconsistently",
      "Because design and development costs precede any revenue, so early periods look loss-making and later ones over-profitable",
      "Because overheads cannot be absorbed until sales begin",
      "Because selling prices change over the life cycle",
    ],
    1,
    "Design and development costs are incurred BEFORE any revenue arrives, so early periods appear heavily loss-making and later ones highly profitable once those costs have been written off. Neither picture is right — LIFE CYCLE COSTING relates whole-life cost to whole-life revenue, which is the only honest basis for a launch decision."),

  multi("MAK-15-09", "MA-15", "C", "medium", 2,
    "Which TWO are examples of a cost driver in ABC?",
    ["Direct labour hours worked in total", "Number of machine set-ups", "Number of purchase orders processed", "Total factory floor area"],
    [1, 2],
    "SET-UPS and PURCHASE ORDERS both cause specific activity costs to be incurred, which is what makes them cost drivers. Total labour hours is a volume-based absorption measure, and floor area is an apportionment basis for rent — neither identifies what causes an activity's cost to grow."),

  q("MAK-15-10", "MA-15", "C", "hard", 2,
    "A company's overheads are 70% of total cost and its product range spans very high and very low volumes. What does this suggest about its costing?",
    [
      "Traditional absorption costing is adequate, since overheads are large",
      "ABC is likely worthwhile, because a large overhead absorbed on a volume basis will cross-subsidise between the high and low volume lines",
      "Marginal costing should replace absorption costing entirely",
      "Target costing should be used instead",
    ],
    1,
    "Both conditions favouring ABC are present. Overheads at 70% mean the absorption basis DOMINATES product cost, so a poor basis produces a large error; and a range spanning very high and very low volumes is exactly the profile in which volume-based absorption makes simple lines subsidise complex ones."),
]

export const MA_KIT_CH10_15: AccaQuestion[] = [
  ...CH10, ...CH11, ...CH12, ...CH13, ...CH14, ...CH15,
]
