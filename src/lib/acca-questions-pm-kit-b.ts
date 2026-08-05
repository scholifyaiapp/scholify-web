import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-pm-kit-builders"

/*
 * PM · Area B question kit — chapters 5 to 10.
 *
 * Specialist cost and management accounting techniques: activity-based costing, target
 * costing, life-cycle costing, throughput accounting, environmental accounting, and
 * choosing between them.
 *
 * Where the skill is a CALCULATION the question is numeric entry, so a candidate cannot
 * work backwards from four options. The exceptions are deliberate: where the learning
 * point is that candidates produce one specific wrong figure — margin confused with
 * mark-up, throughput with labour deducted, life-cycle cost divided by one year's volume
 * — an MCQ whose distractors ARE those figures teaches more, because the explanation can
 * name each error.
 *
 * Authored, applied, exam-standard at PM's uniform 2 marks. Original Scholify content.
 */

/* ── Chapter 5 · Activity-based costing ── */

const CH05: AccaQuestion[] = [
  num("PMK-05-01", "PM-05", "B", "easy",
    "A company's machine set-up cost pool is £612,000 for the year and it expects 4,080 set-ups. What is the cost driver rate, in £ per set-up?",
    150, "£ per set-up", 0.01,
    "£612,000 / 4,080 set-ups = £150 per set-up. The driver rate is simply the pool divided by the expected volume of the activity that causes it — the work in ABC is choosing the right driver, not the division."),

  num("PMK-05-02", "PM-05", "B", "medium",
    "Set-up costs are charged at £150 per set-up. Product P is made in batches of 1,300 units and each batch needs 26 set-ups. What set-up cost per unit does ABC charge to P? Give your answer in £ to two decimal places.",
    3, "£ per unit", 0.01,
    "26 set-ups × £150 = £3,900 per batch, over 1,300 units = £3.00 per unit. Note what drives this: the number of SET-UPS, not the number of units, which is why a product made in small batches carries far more of this cost under ABC."),

  num("PMK-05-03", "PM-05", "B", "medium",
    "Total overhead of £900,000 is split into two pools: set-up costs of £300,000 driven by 500 set-ups, and machining costs of £600,000 driven by 30,000 machine hours. Product Z has annual output of 2,000 units, uses 50 set-ups and 4,000 machine hours. What is Z's ABC overhead cost per unit, in £?",
    55, "£ per unit", 0.01,
    "Set-up rate £300,000/500 = £600; machining rate £600,000/30,000 = £20. Z absorbs (50 × £600) + (4,000 × £20) = £30,000 + £80,000 = £110,000, over 2,000 units = £55.00 per unit."),

  q("PMK-05-04", "PM-05", "B", "medium",
    "Why does ABC typically move overhead cost AWAY from high-volume products and towards low-volume ones?",
    [
      "Because low-volume products use more materials",
      "Because many overheads are driven by transactions such as set-ups and orders, which occur per BATCH rather than per unit, so a small batch carries the same activity cost over fewer units",
      "Because absorption costing ignores overheads on low-volume products",
      "Because low-volume products have higher selling prices",
    ],
    1,
    "BECAUSE THE DRIVERS ARE PER BATCH, NOT PER UNIT. A set-up costs the same whether the batch is 50 units or 5,000, so spreading it over 50 gives a far higher cost per unit. Absorption costing on labour or machine hours spreads it by volume instead, which systematically under-costs the small runs and over-costs the large ones."),

  q("PMK-05-05", "PM-05", "B", "medium",
    "An ABC exercise shows that Premium, a low-volume product, makes a loss where absorption costing showed a profit. What is usually the correct management response?",
    [
      "Withdraw Premium immediately",
      "Investigate WHY its activity consumption is so high — batch size, set-up frequency, order pattern — and change those before considering withdrawal",
      "Reallocate the overhead back on labour hours",
      "Raise Premium's price to restore the absorption-costing profit",
    ],
    1,
    "INVESTIGATE THE ACTIVITY CONSUMPTION FIRST. ABC has identified that Premium triggers a great deal of activity; the useful response is to run larger batches, consolidate orders or re-engineer the set-up. Withdrawing it may leave the overhead behind to be absorbed by whatever remains, which is why the withdrawal reflex is the standard trap here."),

  num("PMK-05-06", "PM-05", "B", "hard",
    "A company currently absorbs its £840,000 overhead on labour hours, of which it expects 42,000. Product Q takes 0.5 labour hours per unit. Under ABC, Q would absorb £126,000 in total on an output of 9,000 units. By how much per unit does ABC INCREASE Q's overhead cost? Give the increase in £.",
    4, "£ per unit", 0.01,
    "Absorption: £840,000/42,000 = £20 per labour hour × 0.5 hours = £10.00 per unit. ABC: £126,000/9,000 = £14.00 per unit. The increase is £4.00 per unit — and Q is exactly the kind of product ABC re-prices, because its labour hours are low relative to the activity it triggers."),

  multi("PMK-05-07", "PM-05", "B", "medium",
    "In which circumstances is ABC most likely to be worth its implementation cost? Select TWO.",
    [
      "Overheads are a small proportion of total cost",
      "Overheads are a large proportion of total cost and are not driven by volume",
      "The company makes a single product",
      "There is wide diversity in product volumes, batch sizes and complexity",
    ],
    [1, 3],
    "LARGE NON-VOLUME-DRIVEN OVERHEADS, and DIVERSITY of volume and complexity. Both conditions must hold for ABC to change the answer: if overheads are small the re-analysis moves little money, and if all products are similar any sensible absorption base gives much the same result."),

  q("PMK-05-08", "PM-05", "B", "easy",
    "Which is the most appropriate cost driver for a purchase ordering department's costs?",
    ["Units produced", "Number of purchase orders placed", "Direct labour hours", "Machine hours"],
    1,
    "NUMBER OF PURCHASE ORDERS. The driver must be what CAUSES the cost to be incurred, and the ordering department's workload is a function of how many orders it processes — not of how many units are eventually made from them."),

  num("PMK-05-09", "PM-05", "B", "medium",
    "Quality inspection costs are £288,000 a year, driven by 7,200 inspections. Product R requires one inspection per batch of 40 units and its annual output is 24,000 units. What total inspection cost does ABC charge to R, in £?",
    24000, "£", 1,
    "Rate = £288,000/7,200 = £40 per inspection. R needs 24,000/40 = 600 inspections, so it absorbs 600 × £40 = £24,000. Note that halving R's batch size would double this charge without changing output by a unit — which is the behavioural information ABC exists to surface."),

  q("PMK-05-10", "PM-05", "B", "medium",
    "How does ABC apply in a SERVICE business?",
    [
      "It does not — ABC requires physical production",
      "It applies well, because service overheads are largely driven by transactions and customer activity rather than by volume, and services often have no direct material at all",
      "It applies only to the direct labour element",
      "It applies only where the service is standardised",
    ],
    1,
    "IT APPLIES WELL, and often better than in manufacturing. A bank's or insurer's cost is almost entirely overhead driven by transactions — applications processed, claims handled, calls taken — and with little or no direct material there is nothing for a traditional absorption base to attach to."),

  multi("PMK-05-11", "PM-05", "B", "hard",
    "Which of the following are genuine LIMITATIONS of ABC? Select TWO.",
    [
      "It cannot be used for inventory valuation",
      "Some overheads are genuinely facility-sustaining and have no meaningful driver, so an arbitrary allocation remains",
      "It always produces a higher total overhead figure",
      "Identifying activities and collecting driver data is costly, and the analysis must be maintained as processes change",
    ],
    [1, 3],
    "FACILITY-SUSTAINING COSTS RESIST ANY DRIVER, and the SYSTEM IS COSTLY TO BUILD AND MAINTAIN. Factory rent is not caused by any activity, so arbitrariness survives ABC in part. And the total overhead is unchanged — ABC redistributes it, which is the point most often misstated."),

  q("PMK-05-12", "PM-05", "B", "hard",
    "A company adopts ABC and finds that its largest-volume product is far cheaper than previously thought. What is the most important commercial implication?",
    [
      "The product should be discontinued",
      "It may be under-priced, and there may be scope to compete more aggressively on it than the old costing suggested",
      "Overheads have been overstated in total",
      "The absorption rate should be recalculated",
      ],
    1,
    "IT MAY BE UNDER-PRICED, and there is more competitive room than believed. Traditional absorption loaded volume-based overhead onto it, making it look expensive; if it is genuinely cheap to make, the company has been declining business it could profitably have won. Note total overhead has not changed — the cost has moved to the low-volume lines."),
]

/* ── Chapter 6 · Target costing ── */

const CH06: AccaQuestion[] = [
  num("PMK-06-01", "PM-06", "B", "easy",
    "A product will sell for £80 and the company requires a 25% MARGIN on selling price. What is the target cost, in £?",
    60, "£ per unit", 0.01,
    "Required profit = 25% × £80 = £20, so target cost = £80 − £20 = £60.00. Margin is a percentage OF SELLING PRICE — the single most common error here is treating it as a mark-up on cost, which would give £64."),

  q("PMK-06-02", "PM-06", "B", "medium",
    "A product will sell for £80. Which target cost applies if the company requires a 25% MARK-UP on cost rather than a 25% margin on selling price?",
    ["£60.00", "£64.00", "£56.00", "£100.00"],
    1,
    "£64.00. A 25% mark-up means price = 1.25 × cost, so cost = £80/1.25 = £64.00. The £60.00 distractor is the MARGIN answer — 25% of the £80 price. Read the wording every time: margin is a percentage of price, mark-up a percentage of cost."),

  num("PMK-06-03", "PM-06", "B", "medium",
    "A target cost of £60 has been set. The current estimated cost is £73.50. What is the cost gap, in £ per unit?",
    13.5, "£ per unit", 0.01,
    "£73.50 − £60.00 = £13.50 per unit. The gap is what value engineering, redesign and supplier negotiation must close BEFORE launch, because once the product is in production most of its cost is already locked in by its design."),

  q("PMK-06-04", "PM-06", "B", "medium",
    "Which sequence correctly describes the target costing process?",
    [
      "Estimate cost, add required profit, set selling price",
      "Determine a competitive market selling price, deduct the required profit to give a target cost, then close the gap between target and estimated cost",
      "Set a target cost, then find a price that covers it",
      "Estimate cost, set price by mark-up, then reduce cost if sales are poor",
    ],
    1,
    "PRICE FIRST, THEN PROFIT, THEN COST. Target costing runs the opposite way to cost-plus: the market decides the price, the company decides the profit it needs, and the cost is whatever is left — which becomes a design target rather than an outcome to be reported."),

  q("PMK-06-05", "PM-06", "B", "hard",
    "A design team proposes closing a cost gap by assuming higher sales volume, so that fixed cost per unit falls. Why is this unsatisfactory?",
    [
      "Fixed costs cannot be included in a target cost",
      "It is circular — the volume assumption is not a cost reduction, and if the volume does not materialise the gap reappears with the fixed cost now committed",
      "Volume assumptions must be approved by the board",
      "It understates the required margin",
    ],
    1,
    "IT IS CIRCULAR AND CHANGES NOTHING REAL. Assuming the volume away does not remove a pound of cost; it merely spreads the same cost over units that may not be sold. Genuine gap closure is value engineering, redesign, component standardisation and supplier negotiation — actions that change the cost itself."),

  num("PMK-06-06", "PM-06", "B", "medium",
    "A company targets a 20% margin on a product it will sell for £250. Estimated costs are: materials £96, labour £54, variable overhead £28 and fixed overhead absorbed at £34. What is the cost gap, in £ per unit?",
    12, "£ per unit", 0.01,
    "Target cost = £250 × (1 − 0.20) = £200. Estimated cost = £96 + £54 + £28 + £34 = £212. Gap = £212 − £200 = £12.00 per unit. Include the absorbed fixed overhead — target costing works on the full cost of the product, because the price must ultimately cover all of it."),

  multi("PMK-06-07", "PM-06", "B", "medium",
    "Which of the following are legitimate ways to close a cost gap? Select TWO.",
    [
      "Assuming a higher production volume",
      "Redesigning the product to use fewer, more standardised components",
      "Reducing the required profit margin",
      "Negotiating lower prices with suppliers, or re-sourcing a component",
    ],
    [1, 3],
    "REDESIGN and SUPPLIER NEGOTIATION. Both change the cost. Assuming higher volume is circular, and cutting the required margin does not close the gap — it moves the target, which is a decision to earn less rather than a decision to cost less."),

  q("PMK-06-08", "PM-06", "B", "medium",
    "Why must the cost gap be closed BEFORE production begins?",
    [
      "Because the accounting system cannot report on it afterwards",
      "Because the great majority of a product's cost is committed by its design, so once production starts there is little left that can be changed cheaply",
      "Because suppliers will not renegotiate after launch",
      "Because the selling price cannot be altered after launch",
    ],
    1,
    "BECAUSE DESIGN COMMITS THE COST. By the time a product is in production, its materials, tolerances, assembly steps and component count are fixed, and changing any of them means re-tooling. That is the same insight that drives life-cycle costing in chapter 7."),

  q("PMK-06-09", "PM-06", "B", "hard",
    "How does target costing apply to a SERVICE, such as a bank account product?",
    [
      "It does not apply, because services have no design phase",
      "It applies to the service's DESIGN — the process steps, channels and staff time it requires — which is the service equivalent of a bill of materials",
      "It applies only to the staff cost element",
      "It applies only where the service is priced per transaction",
    ],
    1,
    "IT APPLIES TO THE SERVICE DESIGN. The 'design' of a service is its process: how many steps, which channel, how much staff time, how many hand-offs. Reducing those is exactly analogous to reducing component count, and it must equally be done before launch."),

  q("PMK-06-10", "PM-06", "B", "medium",
    "What effect does target costing have on organisational behaviour, and why is that effect the point of it?",
    [
      "It makes the accounting function responsible for cost control",
      "It forces design, engineering, purchasing and marketing to work together on cost before launch, because no single function can close the gap alone",
      "It makes cost the responsibility of production managers",
      "It removes the need for standard costing",
    ],
    1,
    "IT FORCES CROSS-FUNCTIONAL WORK AT THE DESIGN STAGE. That is the mechanism, not a side effect: a cost gap cannot be closed by purchasing alone or engineering alone, so the technique creates the collaboration and moves cost management to the only point in the life cycle where it is cheap."),

  num("PMK-06-11", "PM-06", "B", "hard",
    "A product is expected to sell 40,000 units at £45. The company requires a 30% margin. Estimated variable cost is £21.50 per unit and product-specific fixed costs are £560,000 a year. What is the total cost gap for the year, in £?",
    160000, "£", 1,
    "Target cost per unit = £45 × 0.70 = £31.50, so the total target cost is 40,000 × £31.50 = £1,260,000. Estimated total cost = (40,000 × £21.50 = £860,000) + £560,000 = £1,420,000. Gap = £1,420,000 − £1,260,000 = £160,000, or £4.00 per unit. Work it either per unit or in total, but do not mix the two."),

  q("PMK-06-12", "PM-06", "B", "medium",
    "Target costing is described as 'market-driven'. Which feature of it justifies that description?",
    [
      "It uses market research to estimate costs",
      "The selling price is set by what the market will bear and the competition charges, and the cost target is derived from it rather than the other way round",
      "It requires a marketing manager to lead the process",
      "It is used only for consumer products",
    ],
    1,
    "THE PRICE COMES FROM THE MARKET AND THE COST IS DERIVED FROM IT. Cost-plus starts inside the business and hopes the market accepts the result; target costing starts with the market's price and makes the business fit it. That reversal is the whole idea."),
]

/* ── Chapter 7 · Life-cycle costing ── */

const CH07: AccaQuestion[] = [
  num("PMK-07-01", "PM-07", "B", "medium",
    "A product's total life-cycle costs are: design and development £1,800,000, manufacturing £6,400,000, marketing £900,000 and end-of-life decommissioning £500,000. Total output over the life is 400,000 units. What is the life-cycle cost per unit, in £?",
    24, "£ per unit", 0.01,
    "Total = £1,800,000 + £6,400,000 + £900,000 + £500,000 = £9,600,000, over 400,000 units = £24.00 per unit. Every cost the product causes over its whole life is included — including the development spent before it existed and the decommissioning after it stops selling."),

  q("PMK-07-02", "PM-07", "B", "medium",
    "A product's whole life is four years with total life-cycle costs of £9,600,000 and total output of 400,000 units. Year 1 output is 40,000 units. Which figure is the LIFE-CYCLE cost per unit?",
    ["£240.00", "£24.00", "£60.00", "£64.00"],
    1,
    "£24.00 — total life costs over total life output. The £240.00 distractor divides the whole life's cost by year 1's volume alone, which is the standard error: it makes an early-life product look catastrophically unprofitable and can lead to withdrawing a product that would have been profitable across its life."),

  q("PMK-07-03", "PM-07", "B", "medium",
    "Why is roughly 80% of a product's life-cycle cost said to be COMMITTED before production begins?",
    [
      "Because development costs are the largest element",
      "Because the design fixes the materials, components, tolerances and assembly process that determine what each unit will cost to make",
      "Because suppliers' prices are agreed in advance",
      "Because marketing spend is incurred at launch",
    ],
    1,
    "BECAUSE THE DESIGN DETERMINES THE UNIT COST. The design decides how many components, how difficult the assembly and how much material each unit needs — so the cost per unit was settled long before the first one was made, whatever the production manager does afterwards."),

  q("PMK-07-04", "PM-07", "B", "hard",
    "Which is the performance measurement problem that life-cycle costing exposes?",
    [
      "Life-cycle costs cannot be audited",
      "Conventional annual reporting charges development cost to early years and shows losses, then shows high profits later, so a product's performance is misstated in every individual year",
      "Life-cycle costing understates total cost",
      "Fixed costs cannot be allocated across years",
    ],
    1,
    "ANNUAL REPORTING MISSTATES EVERY YEAR. Development hits the early years and the returns come later, so annual profit says nothing useful about whether the product is worthwhile — and a manager appraised annually has an incentive to avoid developing anything, which is the short-termism problem of Area E."),

  multi("PMK-07-05", "PM-07", "B", "medium",
    "Which of the following are ways of EXTENDING a product's life cycle? Select TWO.",
    [
      "Reducing the required profit margin",
      "Finding new markets or new applications for the existing product",
      "Increasing the development budget after launch",
      "Product enhancement or repositioning that renews demand",
    ],
    [1, 3],
    "NEW MARKETS and ENHANCEMENT OR REPOSITIONING. Both add sales volume to spread the committed costs over. Cutting the margin is a pricing decision and adding development spend after launch usually confirms the cycle is ending rather than extending it."),

  num("PMK-07-06", "PM-07", "B", "hard",
    "A product incurs £2,400,000 of design cost, then unit variable cost of £18 over a life of 250,000 units, plus £1,350,000 of life-time fixed production and marketing cost. It sells at £42. What total profit does the product make over its whole life, in £?",
    2250000, "£", 1,
    "Revenue = 250,000 × £42 = £10,500,000. Costs = £2,400,000 design + (250,000 × £18 = £4,500,000) variable + £1,350,000 fixed = £8,250,000. Life-cycle profit = £10,500,000 − £8,250,000 = £2,250,000. Life-cycle costing asks this question — is the product worthwhile over its life — rather than what it earned in one year."),

  q("PMK-07-07", "PM-07", "B", "medium",
    "In which stage of the product life cycle would you expect NEGATIVE cash flow despite growing sales?",
    ["Maturity", "Growth", "Decline", "Saturation"],
    1,
    "GROWTH. Sales rise but so does the investment in capacity, inventory and receivables needed to serve them, so cash can be consumed faster than it is earned. Profit and cash diverge most sharply at this stage, which is why a growing product can still need funding."),

  q("PMK-07-08", "PM-07", "B", "medium",
    "How does life-cycle costing relate to target costing?",
    [
      "They are alternatives — a company uses one or the other",
      "They are complementary: target costing sets the cost the design must achieve, and life-cycle costing measures the whole-life cost that design produces",
      "Life-cycle costing replaces target costing after launch",
      "Target costing applies to services and life-cycle costing to products",
    ],
    1,
    "COMPLEMENTARY, both aimed at the DESIGN stage. Target costing sets what the cost must be; life-cycle costing measures the full consequence of the design across the whole life, including the decommissioning and support costs a unit-cost view ignores."),

  multi("PMK-07-09", "PM-07", "B", "medium",
    "Which costs belong in a life-cycle cost that a conventional product cost would typically EXCLUDE? Select TWO.",
    [
      "Direct materials",
      "Research and development incurred before launch",
      "Direct labour",
      "End-of-life decommissioning and disposal",
    ],
    [1, 3],
    "PRE-LAUNCH R&D and END-OF-LIFE DISPOSAL. Both are caused by the product and both fall outside the period in which units are made, so conventional product costing treats them as period costs of other years — which is precisely how a product can look profitable while destroying value over its life."),

  q("PMK-07-10", "PM-07", "B", "hard",
    "A company's products have life cycles of about 14 months. What does this imply for its management accounting?",
    [
      "Standard costing should be used more intensively",
      "Standards and annual budgets are of limited use, and cost management must move to the design stage using target and life-cycle costing",
      "Overheads should be absorbed on machine hours",
      "Variance analysis should be performed weekly",
    ],
    1,
    "COST MANAGEMENT MUST MOVE TO DESIGN. A 14-month life leaves no time for a standard to be set, controlled against, and refined — the product is obsolete before the control cycle completes. That is one of the principal limitations of standard costing set out in Area D."),

  num("PMK-07-11", "PM-07", "B", "medium",
    "Design and development cost £3,150,000. The product will sell 90,000 units over its life at £68, with variable cost £31 per unit and life-time fixed costs of £480,000. What is the life-cycle cost per unit, in £ to two decimal places?",
    71.33, "£ per unit", 0.01,
    "Total life-cycle cost = £3,150,000 + (90,000 × £31 = £2,790,000) + £480,000 = £6,420,000, over 90,000 units = £71.33 per unit. Note this EXCEEDS the £68 selling price, so the product makes a life-cycle loss of £3.33 a unit despite a healthy £37 contribution per unit."),

  q("PMK-07-12", "PM-07", "B", "hard",
    "A product has a contribution of £37 per unit but a life-cycle cost of £71.33 against a price of £68. What is the correct conclusion?",
    [
      "The product is profitable, since contribution is positive",
      "The product destroys value over its life — the £37 contribution never recovers the development cost, and it should not have been launched on these assumptions",
      "The life-cycle cost has been calculated incorrectly",
      "The product should be priced at £71.33",
    ],
    1,
    "IT DESTROYS VALUE OVER ITS LIFE. A positive contribution is necessary but not sufficient: it must cover the development and life-time fixed costs too. This is exactly why the launch decision needs a life-cycle view — contribution per unit alone would have approved it."),
]

/* ── Chapter 8 · Throughput accounting ── */

const CH08: AccaQuestion[] = [
  num("PMK-08-01", "PM-08", "B", "easy",
    "A product sells for £64 and its direct material cost is £22. What is its throughput per unit, in £?",
    42, "£ per unit", 0.01,
    "£64 − £22 = £42. Throughput is selling price less MATERIAL cost only. Labour is NOT deducted — throughput accounting treats it as a fixed operating expense, because in the short run the workforce is paid whether the bottleneck is running or not."),

  q("PMK-08-02", "PM-08", "B", "medium",
    "A product sells for £64, with direct material £22, direct labour £11 and variable overhead £5. What is its throughput per unit?",
    ["£26", "£31", "£42", "£64"],
    2,
    "£42 — price less MATERIAL only. £31 deducts labour and variable overhead as well, which is contribution, not throughput; £26 deducts everything. The whole point of throughput accounting is that labour is a fixed operating expense in the short run, so deducting it is the error the technique exists to correct."),

  num("PMK-08-03", "PM-08", "B", "medium",
    "A product has throughput of £42 per unit and takes 6 minutes on the bottleneck machine. What is its throughput per bottleneck HOUR, in £?",
    420, "£ per hour", 0.01,
    "6 minutes = 0.1 hours, so £42/0.1 = £420 per bottleneck hour. This is the ranking measure: what matters is not throughput per unit but throughput per unit of the SCARCE resource, because the bottleneck is what limits the factory's output."),

  num("PMK-08-04", "PM-08", "B", "medium",
    "Total factory operating expenses are £378,000 a month and the bottleneck is available for 1,050 hours a month. What is the cost per bottleneck hour, in £?",
    360, "£ per hour", 0.01,
    "£378,000/1,050 hours = £360 per bottleneck hour. This is the denominator of the TPAR — every product must generate more throughput per bottleneck hour than the factory costs to run for that hour, or it is not covering its share of operating expense."),

  num("PMK-08-05", "PM-08", "B", "medium",
    "A product generates £420 of throughput per bottleneck hour and the factory cost per bottleneck hour is £360. What is its throughput accounting ratio? Give your answer to two decimal places.",
    1.17, "ratio", 0.01,
    "TPAR = £420/£360 = 1.1667, so 1.17. A TPAR above 1 means the product generates more throughput per bottleneck hour than the factory costs to run for that hour — so it is covering operating expense and contributing to profit."),

  q("PMK-08-06", "PM-08", "B", "medium",
    "What does a throughput accounting ratio BELOW 1 indicate?",
    [
      "The product makes a negative contribution",
      "The product generates less throughput per bottleneck hour than the factory costs to run for that hour, so on that measure it does not cover operating expense",
      "The product has no material cost",
      "The bottleneck has spare capacity",
    ],
    1,
    "IT EARNS LESS PER BOTTLENECK HOUR THAN THE FACTORY COSTS TO RUN. Note it does NOT mean negative contribution — a product can have a healthy contribution and a TPAR below 1 if it is slow on the bottleneck. And a TPAR below 1 is not always a reason to stop: the product may be needed to complete a range, or may be worth keeping if the alternative is bottleneck idle time."),

  q("PMK-08-07", "PM-08", "B", "hard",
    "Two products: X has contribution of £30 and takes 3 minutes on the bottleneck; Y has contribution of £46 and takes 6 minutes. Which should be made first, and why?",
    [
      "Y, because its contribution per unit is higher",
      "X, because it earns £600 per bottleneck hour against Y's £460",
      "Y, because it uses the bottleneck for longer",
      "Either — the ranking is the same on both measures",
    ],
    1,
    "X, at £600 per bottleneck hour against Y's £460. £30/0.05 hours = £600; £46/0.1 hours = £460. Ranking on contribution per UNIT puts Y first and is wrong: the scarce resource is bottleneck time, so the ranking must be per bottleneck hour. This reversal is the most examinable point in the chapter."),

  multi("PMK-08-08", "PM-08", "B", "medium",
    "Which of the following are ways of IMPROVING a throughput accounting ratio? Select TWO.",
    [
      "Increasing inventory of finished goods",
      "Reducing the time the product spends on the bottleneck",
      "Deducting labour cost from throughput",
      "Raising the selling price or reducing the material cost",
    ],
    [1, 3],
    "REDUCE BOTTLENECK TIME, or IMPROVE THROUGHPUT PER UNIT by raising price or cutting material cost. Both act on the ratio's components. Building inventory does nothing to the ratio and is exactly what throughput accounting discourages, and deducting labour is simply computing the wrong figure."),

  q("PMK-08-09", "PM-08", "B", "medium",
    "According to the theory of constraints, what is the correct sequence of the five steps?",
    [
      "Elevate, identify, exploit, subordinate, repeat",
      "Identify the constraint, exploit it, subordinate everything else to it, elevate it, then return to step one",
      "Identify, subordinate, elevate, exploit, stop",
      "Exploit, elevate, identify, repeat, subordinate",
    ],
    1,
    "IDENTIFY, EXPLOIT, SUBORDINATE, ELEVATE, REPEAT. The order matters: exploiting the existing constraint fully is free, whereas elevating it costs money — so you get everything possible out of what you have before buying more. And 'repeat' is essential because elevating one constraint creates another somewhere else."),

  q("PMK-08-10", "PM-08", "B", "hard",
    "Why does throughput accounting say that 'an hour lost at the bottleneck is an hour lost to the whole factory'?",
    [
      "Because the bottleneck is the most expensive machine",
      "Because total output is limited by the bottleneck, so any bottleneck time not used can never be recovered elsewhere",
      "Because labour is paid by the hour",
      "Because the bottleneck sets the material cost",
    ],
    1,
    "BECAUSE TOTAL OUTPUT IS CAPPED BY THE BOTTLENECK. Idle time at a non-bottleneck costs nothing, since that resource has slack anyway; idle time at the bottleneck reduces what the whole factory can produce, permanently. It is the reason set-up reduction, maintenance and quality inspection should all be concentrated there."),

  num("PMK-08-11", "PM-08", "B", "hard",
    "Product W sells for £95 with material cost £38 and takes 15 minutes on the bottleneck. Factory operating expenses are £504,000 a month over 1,400 bottleneck hours. What is W's TPAR? Give your answer to two decimal places.",
    0.63, "ratio", 0.01,
    "Throughput per unit = £95 − £38 = £57. Per bottleneck hour = £57/0.25 = £228. Cost per bottleneck hour = £504,000/1,400 = £360. TPAR = £228/£360 = 0.6333, so 0.63. W consumes bottleneck time worth £360 an hour to generate £228, so on this measure it is destroying value at the constraint."),

  q("PMK-08-12", "PM-08", "B", "medium",
    "In which circumstance would a company reasonably continue to make a product with a TPAR of 0.8?",
    [
      "Never — a TPAR below 1 always means the product should be dropped",
      "Where the bottleneck would otherwise be idle, or the product is needed to hold a customer or complete a range",
      "Where the product's contribution is negative",
      "Where material costs are expected to rise",
    ],
    1,
    "WHERE THE BOTTLENECK WOULD OTHERWISE BE IDLE, or where the product's commercial role justifies it. A TPAR below 1 says the product does not cover operating expense at the constraint — but if there is nothing better to make, £228 an hour beats nothing, and operating expenses are being incurred either way."),
]

/* ── Chapter 9 · Environmental and sustainability accounting ── */

const CH09: AccaQuestion[] = [
  q("PMK-09-01", "PM-09", "B", "easy",
    "Which of these is an example of an environmental CONTINGENT cost?",
    [
      "The annual waste disposal invoice",
      "A future site remediation liability that will arise only if contamination is confirmed",
      "The cost of an energy efficiency audit",
      "The price paid for raw materials",
    ],
    1,
    "A FUTURE REMEDIATION LIABILITY THAT MAY NOT ARISE. Contingent costs are uncertain in occurrence or amount, which is why they are so often left out of an appraisal entirely — and being left out is exactly what makes them dangerous."),

  q("PMK-09-02", "PM-09", "B", "medium",
    "Why do environmental costs typically remain HIDDEN in a conventional costing system?",
    [
      "They are immaterial in most businesses",
      "They are absorbed into general overhead rather than traced to the product or process that causes them, so no manager sees them as theirs",
      "Accounting standards prohibit their disclosure",
      "They are always contingent",
    ],
    1,
    "THEY SIT IN GENERAL OVERHEAD, UNTRACED. Energy, water, waste disposal and compliance costs are pooled and absorbed, so the product that generates most of the waste bears no more of the cost than any other — and nobody is accountable for reducing it. Making them visible is the first step in managing them."),

  multi("PMK-09-03", "PM-09", "B", "medium",
    "Which techniques help make environmental costs visible? Select TWO.",
    [
      "Absorbing environmental costs on labour hours",
      "Input-output analysis, tracing physical material flows so that what leaves as waste is quantified",
      "Activity-based costing with environmental drivers such as kilograms of waste or kWh consumed",
      "Recording environmental costs only when invoiced",
    ],
    [1, 2],
    "INPUT-OUTPUT ANALYSIS and ABC WITH ENVIRONMENTAL DRIVERS. The first quantifies the physical flow — material bought that leaves as waste is cost bought and thrown away — and the second traces the cost to whatever causes it. Absorbing on labour hours is the practice that hid the cost in the first place."),

  q("PMK-09-04", "PM-09", "B", "medium",
    "A company finds that 12% of the material it buys leaves the site as waste. What is the management accounting significance?",
    [
      "Only the disposal cost matters",
      "The waste represents material PURCHASED and paid for that generated no revenue, so its cost is the purchase price plus the handling and disposal cost",
      "Waste is a production issue rather than a cost issue",
      "The purchase cost is unaffected by waste",
    ],
    1,
    "IT IS MATERIAL PAID FOR TWICE — once to buy and again to dispose of. Companies routinely see only the disposal invoice, when the larger figure is the purchase cost of material that was never sold. Quantifying the physical flow is what reveals it."),

  q("PMK-09-05", "PM-09", "B", "hard",
    "Which is the strongest argument that environmental accounting belongs in a PERFORMANCE MANAGEMENT syllabus?",
    [
      "Environmental regulation is increasing",
      "Environmental costs are real, often material, and largely controllable — but only once they are traced to the decisions that cause them, which is a management accounting task",
      "It improves the company's public image",
      "It is required by accounting standards",
    ],
    1,
    "THEY ARE MATERIAL AND CONTROLLABLE ONCE TRACED. That combination is exactly what management accounting exists for. Regulation and reputation are reasons the costs matter commercially; the reason it is a PM topic is that untraced cost cannot be managed by anyone."),

  multi("PMK-09-06", "PM-09", "B", "medium",
    "Which of the following are recognised categories of environmental cost? Select TWO.",
    [
      "Conventional costs such as energy and materials",
      "Sunk costs of past investment",
      "Reputation and relationship costs, including lost sales from a damaged environmental record",
      "Depreciation of head office buildings",
    ],
    [0, 2],
    "CONVENTIONAL COSTS and REPUTATION/RELATIONSHIP COSTS. The recognised categories are conventional, potentially hidden, contingent, and reputation. Sunk costs are irrelevant to any decision by definition, and head office depreciation is not an environmental cost."),

  q("PMK-09-07", "PM-09", "B", "medium",
    "What is the purpose of INTEGRATED REPORTING, and why does it belong in a performance paper?",
    [
      "To replace the financial statements",
      "To report how an organisation creates value over time across financial, manufactured, intellectual, human, social and natural capitals, so performance is not reduced to one year's profit",
      "To disclose environmental fines",
      "To satisfy tax authorities",
    ],
    1,
    "TO REPORT VALUE CREATION ACROSS SEVERAL CAPITALS OVER TIME. It belongs here because it is the reporting answer to the same problem the balanced scorecard addresses in Area E: one year's profit is a poor description of whether an organisation is becoming more or less valuable."),

  q("PMK-09-08", "PM-09", "B", "hard",
    "A company proposes to measure its environmental performance solely by its total carbon emissions. What is the principal weakness?",
    [
      "Carbon emissions cannot be measured accurately",
      "A single measure invites the same distortions as any single measure — total emissions can fall because output fell, and it says nothing about water, waste or materials",
      "Carbon is not an environmental issue",
      "The measure is too expensive to produce",
    ],
    1,
    "ONE MEASURE, AND AN AMBIGUOUS ONE. Absolute emissions fall when output falls, so the measure improves in a bad year; and it captures nothing about water use, waste to landfill or material efficiency. Emissions per unit of output alongside other dimensions is far more informative."),

  q("PMK-09-09", "PM-09", "B", "medium",
    "Which difficulty of environmental accounting should an answer name honestly?",
    [
      "Environmental costs are always immaterial",
      "Many environmental impacts are external to the company and hard to value in money, so measurement involves estimates that are open to challenge",
      "The techniques are not compatible with management accounting",
      "Environmental data cannot be collected",
    ],
    1,
    "EXTERNALITIES ARE HARD TO VALUE. The company's own energy and waste costs are measurable; the damage its emissions cause to others largely is not, so any monetary figure is an estimate with a contestable basis. Naming that honestly is better than implying the technique yields precision it does not have."),

  q("PMK-09-10", "PM-09", "B", "medium",
    "A manufacturer reduces packaging material by 18% and finds transport costs fall too. What does this illustrate?",
    [
      "That environmental measures always reduce cost",
      "That environmental and financial objectives frequently align, because waste is cost — lighter packaging means less material bought and more units per load",
      "That packaging is the largest environmental cost",
      "That transport cost is driven by packaging weight alone",
    ],
    1,
    "ENVIRONMENTAL AND FINANCIAL OBJECTIVES OFTEN ALIGN. Less material bought, less waste disposed of, and more units per vehicle: one change reduces three costs. Note the word 'frequently' rather than 'always' — some environmental improvements do cost money, and an answer that claims otherwise overstates the case."),

  q("PMK-09-11", "PM-09", "B", "hard",
    "Which environmental cost category is most likely to be UNDERSTATED in a capital investment appraisal?",
    [
      "The purchase price of the equipment",
      "Contingent and end-of-life costs — decommissioning, site remediation and future compliance — because they are distant and uncertain",
      "Installation cost",
      "Annual energy cost",
    ],
    1,
    "CONTINGENT AND END-OF-LIFE COSTS. They are distant, uncertain and easy to leave out of a spreadsheet, so an appraisal that ignores them systematically favours assets that are cheap to buy and expensive to retire — which is the same life-cycle blindness as in chapter 7."),

  q("PMK-09-12", "PM-09", "B", "medium",
    "Which measure would best show whether a company's environmental efficiency is improving, independent of its output volume?",
    [
      "Total waste sent to landfill",
      "Waste per unit of output, or per £ of revenue",
      "Total energy cost",
      "Number of environmental incidents",
    ],
    1,
    "WASTE PER UNIT OF OUTPUT. Absolute figures move with volume, so they fall in a recession and rise in a good year regardless of efficiency. A ratio measure isolates the efficiency question — the same reason cost per unit is used rather than total cost."),
]

/* ── Chapter 10 · Choosing between the Area B techniques ── */

const CH10: AccaQuestion[] = [
  q("PMK-10-01", "PM-10", "B", "medium",
    "A company complains that its high-volume standard products appear expensive while its bespoke short runs appear cheap, and it is losing tenders on the former. Which technique addresses this?",
    ["Target costing", "Activity-based costing", "Throughput accounting", "Life-cycle costing"],
    1,
    "ACTIVITY-BASED COSTING. The symptom — volume products looking dear and short runs looking cheap — is the signature of volume-based absorption spreading batch-driven overhead by output. ABC re-traces it to the activities that cause it and typically reverses the apparent profitability."),

  q("PMK-10-02", "PM-10", "B", "medium",
    "A company's products have 18-month lives and it must meet a price set by a dominant retailer. Which pair of techniques fits best?",
    [
      "Standard costing and variance analysis",
      "Target costing and life-cycle costing",
      "Throughput accounting and ABC",
      "Environmental accounting and integrated reporting",
    ],
    1,
    "TARGET COSTING AND LIFE-CYCLE COSTING. The price is imposed, so the cost must be designed to fit it — target costing. And an 18-month life means development cost dominates and annual reporting misleads — life-cycle costing. Standard costing needs a stability this business does not have."),

  q("PMK-10-03", "PM-10", "B", "medium",
    "A factory has one machine on which every product must be processed, and it is running at capacity while other machines have slack. Which technique should guide the product mix?",
    ["ABC", "Target costing", "Throughput accounting", "Life-cycle costing"],
    2,
    "THROUGHPUT ACCOUNTING. A single binding constraint through which everything must pass is exactly the situation it was built for, and ranking by throughput per bottleneck hour will often reverse a ranking based on contribution per unit."),

  q("PMK-10-04", "PM-10", "B", "hard",
    "Which statement about the Area B techniques is correct?",
    [
      "They are mutually exclusive — a company should select one",
      "They are complements: ABC can supply the cost data target costing needs, target costing works on the design that determines life-cycle cost, and throughput accounting governs the short-term mix within whatever design exists",
      "They all replace standard costing",
      "They apply only to manufacturing",
    ],
    1,
    "THEY ARE COMPLEMENTS, and saying so is worth marks. They operate at different points: ABC on cost attribution, target costing on the design decision, life-cycle costing on the whole-life view, throughput on the short-run mix. A company can and often should use several."),

  q("PMK-10-05", "PM-10", "B", "medium",
    "A service company with high overheads, no direct material and wide variation in how much staff attention different customers need should consider:",
    ["Throughput accounting", "Activity-based costing", "Life-cycle costing", "Standard costing"],
    1,
    "ACTIVITY-BASED COSTING. With no material and almost all cost being overhead driven by customer transactions, there is nothing for a conventional absorption base to attach to — and the wide variation in attention per customer is exactly the diversity that makes ABC change the answer."),

  multi("PMK-10-06", "PM-10", "B", "medium",
    "Which scenario clues point towards THROUGHPUT accounting? Select TWO.",
    [
      "Products have very short life cycles",
      "One process is a persistent bottleneck and work-in-progress queues in front of it",
      "The company is judged on inventory reduction and on-time delivery under a just-in-time system",
      "Overheads are large and driven by batch-level activity",
    ],
    [1, 2],
    "A PERSISTENT BOTTLENECK WITH QUEUES, and a JIT/INVENTORY-REDUCTION context. Both are throughput's home ground. Short life cycles point to target and life-cycle costing, and batch-driven overhead points to ABC."),

  q("PMK-10-07", "PM-10", "B", "hard",
    "A company using absorption costing is considering ABC. What single question should decide it?",
    [
      "Whether the finance team has the necessary software",
      "Whether the change in reported product costs would change any decision — pricing, mix, or process — by enough to justify the implementation and maintenance cost",
      "Whether competitors use ABC",
      "Whether total overhead exceeds total direct cost",
    ],
    1,
    "WOULD ANY DECISION CHANGE, BY ENOUGH TO JUSTIFY THE COST? This is the information-value test from chapter 1 applied to a costing system. If ABC would reshuffle costs without altering a price, a mix or a process, the more accurate figures are not worth what they cost to produce."),

  q("PMK-10-08", "PM-10", "B", "medium",
    "Which technique is most relevant where a company faces rising regulatory pressure and finds that 15% of its purchased material leaves the site as waste?",
    ["Throughput accounting", "Environmental management accounting", "Target costing", "Linear programming"],
    1,
    "ENVIRONMENTAL MANAGEMENT ACCOUNTING. The material leaving as waste is cost bought and discarded, currently buried in overhead; input-output analysis quantifies it and environmental ABC traces it to whatever causes it. The regulatory pressure adds contingent cost to the same analysis."),

  q("PMK-10-09", "PM-10", "B", "medium",
    "A company using throughput accounting elevates its bottleneck by buying a second machine. What should it do next?",
    [
      "Stop, since the constraint has been removed",
      "Return to step one and identify the new constraint, which will now be somewhere else",
      "Recalculate all product TPARs using the old bottleneck",
      "Switch to activity-based costing",
    ],
    1,
    "RETURN TO STEP ONE. Elevating a constraint does not remove constraints — it moves them, and the new one may be a different machine, a supplier, a skill or the market itself. That is why 'repeat' is the fifth step and why the process is continuous."),

  q("PMK-10-10", "PM-10", "B", "hard",
    "Which technique would you recommend to a company whose principal complaint is that products are launched, then found to be unprofitable, and it is too late to do anything about it?",
    [
      "Variance analysis",
      "Target costing, supported by a life-cycle view, so profitability is designed in before launch rather than measured after it",
      "Throughput accounting",
      "Activity-based costing alone",
    ],
    1,
    "TARGET COSTING WITH A LIFE-CYCLE VIEW. The complaint is about timing: cost is being discovered after design, when almost all of it is committed. The remedy is to make cost a design target rather than a reported outcome, and to appraise the product over its whole life rather than year by year."),

  multi("PMK-10-11", "PM-10", "B", "medium",
    "Which of the following are valid reasons to adopt more than one Area B technique at once? Select TWO.",
    [
      "They measure different things and address different decisions",
      "Adopting several reduces implementation cost",
      "One technique's output can feed another — ABC costs can inform a target cost, for instance",
      "Regulators require multiple techniques",
    ],
    [0, 2],
    "THEY ADDRESS DIFFERENT DECISIONS, and ONE CAN FEED ANOTHER. That is the substance of the complementarity point. Adopting several does not reduce cost, and no regulator prescribes management accounting techniques."),

  q("PMK-10-12", "PM-10", "B", "medium",
    "In a scenario question asking which technique to recommend, what should the answer be built around?",
    [
      "The technique the candidate knows best",
      "What the scenario actually complains about — the symptom described tells you which technique addresses it",
      "The most recently developed technique",
      "Whichever technique is cheapest to implement",
    ],
    1,
    "WHAT THE SCENARIO COMPLAINS ABOUT. The symptom is the clue: tenders lost on volume products means ABC; short lives and imposed prices mean target and life-cycle costing; a queue in front of one machine means throughput; material leaving as waste means environmental accounting. Answer the described problem, not a general one."),
]

export const PM_KIT_AREA_B: AccaQuestion[] = [...CH05, ...CH06, ...CH07, ...CH08, ...CH09, ...CH10]
