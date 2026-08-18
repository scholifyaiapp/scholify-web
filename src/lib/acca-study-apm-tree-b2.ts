import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area B, part two — performance improvement models and techniques (B3)
 * and performance optimisation in specific contexts (B4).
 *
 *   APM-20  The value chain and value-based management  (B3a, B3b)
 *   APM-21  Activity-based costing and management       (B3c)
 *   APM-22  Cost management through the product life    (B3d i–iv)
 *   APM-23  Quality: Six Sigma, TQM and the cost of quality (B3d v–vii)
 *   APM-24  Business process re-engineering             (B3e)
 *   APM-25  Service businesses                          (B4a, B4b)
 *   APM-26  Not-for-profit organisations                (B4c–f)
 *   APM-27  Complex structures, alliances and SLAs      (B4g, B4h, B4i)
 *
 * Split from acca-study-apm-tree-b.ts (APM-15..19) for file size only; the two
 * modules are one syllabus area and the aggregator concatenates them in order.
 *
 * B3(d) alone names seven techniques and B4 has nine outcomes, which is why
 * this half of the area needs eight chapters. B4 is also where APM's scenarios
 * most often live: the examiner sets the 50-mark case in a specific business
 * context — a service firm, a charity, a public body, a supply chain — and the
 * measurement problems of that context are the question.
 *
 * Written against the official ACCA APM syllabus and study guide for September
 * 2026 to June 2027. See acca-study-apm-tree-a.ts for the note on the shim and
 * on why the originality corpus is the syllabus text alone.
 */

const APM_TREE_20: StudyChapter = {
  paper: "APM",
  id: "APM-20",
  number: 20,
  area: "B",
  syllabusRefs: ["B3(a)", "B3(b)"],
  title: "The value chain and value-based management",
  minutes: 17,
  intro:
    "Two ways of asking the same question: where in everything we do is value actually created, and where are we merely spending money?",
  outcomes: [
    "Apply Porter's value chain to analyse performance across an organisation",
    "Distinguish primary from support activities and identify where value is added",
    "Recommend value-adding improvements from a value chain analysis",
    "Apply value-based management and identify an organisation's value drivers",
    "Explain how value-based management changes what is measured and rewarded",
  ],
  sections: [
    {
      id: "value-chain",
      heading: "The value chain",
      blocks: [
        {
          kind: "text",
          md: "Porter's value chain breaks an organisation into the activities it performs, so that each can be examined for whether it adds value the customer will pay for, and at what cost. Its use in this paper is diagnostic: it locates **where** performance problems are, which a consolidated cost statement cannot.",
        },
        {
          kind: "table",
          caption: "Primary and support activities",
          head: ["Type", "Activity", "The performance question"],
          rows: [
            ["Primary", "Inbound logistics", "Are materials arriving at the right time, quality and cost?"],
            ["Primary", "Operations", "Is conversion efficient, and does it deliver the quality customers value?"],
            ["Primary", "Outbound logistics", "Does the product reach customers reliably and economically?"],
            ["Primary", "Marketing and sales", "Is demand generated at a cost proportionate to the margin earned?"],
            ["Primary", "Service", "Does after-sales support protect the relationship and the repeat purchase?"],
            ["Support", "Procurement", "Are we buying on total cost rather than purchase price?"],
            ["Support", "Technology development", "Is development spend producing capability customers notice?"],
            ["Support", "Human resource management", "Are we recruiting and retaining the capability the strategy needs?"],
            ["Support", "Firm infrastructure", "Is central cost proportionate to the value it enables?"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two distinct uses in an answer",
          md: "**Cost analysis**: where is our cost concentrated, and is it in the activities that differentiate us? **Value analysis**: which activities do customers actually pay a premium for? The interesting finding is nearly always a mismatch — heavy spending in an activity customers are indifferent to, and thin resourcing in the one that wins the business.",
        },
        {
          kind: "text",
          md: "The chain also extends **beyond the organisation**. Suppliers' and distributors' activities affect the value delivered, which is why supply chain performance measurement matters and why the syllabus returns to complex structures and service level agreements in B4. An organisation that has optimised only its own links can still be uncompetitive.",
        },
      ],
      check: {
        q: "A value chain analysis shows a company spends heavily on outbound logistics while its customers report that delivery speed is irrelevant to them but product customisation matters greatly. What is the finding?",
        options: [
          "The company should reduce all costs proportionately",
          "There is a mismatch between where cost is incurred and where customers perceive value — resource should be moved from logistics toward the customisation capability that actually wins business",
          "Customers are mistaken about their own preferences",
          "Outbound logistics should be outsourced regardless",
        ],
        correct: 1,
        explain:
          "Locating that mismatch is the value chain's main contribution — it shows that the organisation is spending in the wrong link. The recommendation is reallocation rather than uniform cost cutting, which would cut the customisation capability too and make the position worse.",
      },
    },
    {
      id: "vbm",
      heading: "Value-based management",
      blocks: [
        {
          kind: "text",
          md: "Value-based management takes the principle that the organisation exists to create value for its owners and pushes it all the way down into operational decisions and measures. Its practical content is the identification of **value drivers**: the small number of operational variables that actually move value.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "From value to something a manager can act on",
            data: {
              steps: [
                { label: "Shareholder value", sub: "The objective" },
                { label: "Value drivers", sub: "Margin, capital intensity, growth, cost of capital" },
                { label: "Operational drivers", sub: "Price realisation, yield, days of inventory, customer retention" },
                { label: "Actions and measures", sub: "What a manager decides this week" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The chain is the point. 'Increase shareholder value' is not actionable by a production supervisor; 'reduce inventory days from 62 to 45' is, and the analysis shows how much value that particular movement is worth. Value-based management therefore changes three things: what is **measured** (value-based metrics such as EVA rather than accounting profit), how investment decisions are **appraised**, and what managers are **rewarded** on.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The standard criticisms, which the syllabus expects",
          md: "It can be complex and costly to implement; it depends on forecasts and a cost of capital that are estimates; it can be read as a licence for short-term cost cutting if the value drivers chosen are all financial; and it under-weights stakeholders whose interests are not captured in the value calculation. A recommendation should pair value-based metrics with the non-financial measures from Area A rather than replacing them.",
        },
        {
          kind: "activity",
          title: "Build the driver chain",
          prompt:
            "A distribution company adopts value-based management. Working from shareholder value down, identify plausible value drivers and one operational measure a depot manager could act on for each.",
          answer:
            "There are four value drivers worth separating, and each converts into something local. Operating margin is the first: at depot level that becomes cost per delivery, which the manager influences through route density, vehicle fill and overtime - so the measure is cost per drop, tracked weekly against a target. Capital intensity is the second, and for a distributor most of the capital is in vehicles and inventory, so the operational measures are vehicle utilisation and inventory days; a depot holding 62 days of stock where 45 is achievable is tying up capital the value calculation charges for. Growth is the third, and locally that is customer retention and share of each customer's volume rather than new business generally, since a depot mostly serves existing accounts. Cost of capital is the fourth and is not something a depot manager influences at all, which is worth saying explicitly - it belongs to the centre, and including it in local measurement would breach controllability. The discipline the exercise imposes is that each driver must reduce to something a manager can change this month; if it cannot, it is a corporate objective rather than an operational measure, and putting it on a depot scorecard will simply be ignored.",
        },
      ],
      check: {
        q: "What is the practical purpose of identifying value drivers in value-based management?",
        options: [
          "To calculate shareholder value more precisely",
          "To translate the objective of creating value into a small number of operational variables that managers can actually influence and be measured on",
          "To replace all non-financial measures",
          "To determine the cost of capital",
        ],
        correct: 1,
        explain:
          "Value creation is not directly actionable by anyone below the board. The driver chain converts it into things like inventory days and retention rates that a specific manager can move, and it quantifies how much value each movement is worth — which is what makes the objective operational.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing the value chain activities without analysing them.", fix: "Find the mismatch between where cost sits and where customers perceive value." },
    { trap: "Confining the value chain to the organisation itself.", fix: "It extends through suppliers and distributors — hence supply chain measurement and service level agreements." },
    { trap: "Presenting value-based management as a metric.", fix: "Its content is the driver chain down to something a manager can act on." },
    { trap: "Replacing non-financial measures with value-based ones.", fix: "Pair them, or the approach becomes a licence for short-term cost cutting." },
  ],
  keyTerms: [
    { term: "Value chain", def: "Porter's decomposition of an organisation into primary and support activities, so each can be assessed for the value it adds and the cost it incurs." },
    { term: "Value driver", def: "An operational variable that materially affects the value created, and which a manager can influence directly." },
    { term: "Value-based management", def: "Managing so that decisions, measures and rewards throughout the organisation are aligned to the creation of shareholder value." },
  ],
  summary: [
    "The value chain locates where cost is incurred and where customers perceive value — the mismatch is the finding.",
    "It extends beyond the organisation into suppliers and distributors.",
    "Value-based management works by decomposing value into drivers a manager can act on.",
    "Pair value-based metrics with non-financial measures, or it licenses short-term cutting.",
  ],
  knowledgeDiagnostic: [
    { q: "What does a value chain analysis most usefully reveal?", a: "A mismatch between the activities where cost is concentrated and the activities customers actually pay a premium for." },
    { q: "Why is 'increase shareholder value' insufficient as an operational objective?", a: "Nobody below the board can act on it directly; the driver chain converts it into measures such as inventory days or retention that a manager can move." },
    { q: "What is the main criticism of value-based management?", a: "That it depends on estimated forecasts and cost of capital, and that financial value drivers alone can license short-term cost cutting." },
  ],
  furtherStudy: [
    "APM-21 covers activity-based costing, which supplies the activity cost data a value chain analysis needs.",
    "APM-11 covers EVA, the measure value-based management usually adopts.",
    "APM-27 covers the supply chain the value chain extends into.",
  ],
}

const APM_TREE_21: StudyChapter = {
  paper: "APM",
  id: "APM-21",
  number: 21,
  area: "B",
  syllabusRefs: ["B3(c)"],
  title: "Activity-based costing and management",
  minutes: 17,
  intro:
    "Traditional overhead absorption tells you that products consume overhead in proportion to how long they take to make. For most modern businesses that is simply false, and the consequences are expensive.",
  outcomes: [
    "Explain why volume-based absorption misallocates overhead",
    "Apply activity-based costing using cost pools and drivers",
    "Interpret the reallocation ABC produces and its consequences for pricing and mix",
    "Apply activity-based management to improve performance, not merely to cost products",
    "Assess the cost, data requirements and limitations of the approach",
  ],
  sections: [
    {
      id: "why-abc",
      heading: "Why volume-based absorption misleads",
      blocks: [
        {
          kind: "text",
          md: "Traditional costing absorbs overhead on a volume measure — labour hours, machine hours, units. That works when overhead genuinely varies with volume. It fails when overhead is driven by **complexity**: set-ups, inspections, purchase orders, customer service calls, engineering changes. A low-volume, complex product consumes those activities heavily while absorbing overhead lightly.",
        },
        {
          kind: "example",
          title: "The cross-subsidy volume-based costing creates",
          scenario:
            "A factory makes Standard (90,000 units, 2 set-ups a year) and Bespoke (2,000 units, 40 set-ups a year). Set-up costs are $400,000 a year. Standard takes 1 machine hour per unit, Bespoke 1.5.",
          steps: [
            { label: "Machine hours", detail: "Standard 90,000; Bespoke 3,000. Total 93,000." },
            { label: "Traditional absorption", detail: "$400,000 ÷ 93,000 = $4.30 per machine hour. Standard absorbs $4.30 a unit; Bespoke absorbs $6.45 a unit." },
            { label: "Activity-based", detail: "42 set-ups in total, so $9,524 each. Standard: 2 × 9,524 ÷ 90,000 = $0.21 a unit. Bespoke: 40 × 9,524 ÷ 2,000 = $190.48 a unit." },
            { label: "The scale of the error", detail: "Bespoke's set-up cost is understated by roughly $184 a unit — around thirty times the traditional figure." },
          ],
          result:
            "Standard has been subsidising Bespoke heavily. If Bespoke is priced on the traditional cost it is almost certainly sold at a loss, and the company has been rewarding its sales force for winning that work.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The consequence is strategic, not clerical",
          md: "Bad overhead allocation does not merely misstate a cost — it drives the wrong decisions about **pricing, product mix, customer selection and where to invest**. A company that believes its complex low-volume line is profitable will promote it. That is why ABC belongs in a strategic paper rather than a costing one, and why the answer must always reach the decision, not stop at the number.",
        },
      ],
      check: {
        q: "Why does traditional volume-based absorption systematically understate the cost of low-volume, complex products?",
        options: [
          "Because they use more direct materials",
          "Because much modern overhead is driven by transactions and complexity — set-ups, inspections, orders — which low-volume products consume heavily while absorbing overhead only in proportion to their small volume",
          "Because their direct labour is more expensive",
          "Because overhead rates are calculated annually",
        ],
        correct: 1,
        explain:
          "The mismatch is between what drives the cost and what it is absorbed on. A product needing forty set-ups for two thousand units consumes set-up resource forty times over while carrying overhead on just three thousand machine hours, so the high-volume line silently subsidises it.",
      },
    },
    {
      id: "abm",
      heading: "From costing to management",
      blocks: [
        {
          kind: "text",
          md: "**Activity-based costing** produces better product costs. **Activity-based management** uses the same activity analysis to improve performance — and the syllabus asks about ABM specifically, so an answer confined to product costing has answered half the question.",
        },
        {
          kind: "table",
          caption: "What ABM does with the analysis",
          head: ["Application", "The question", "Typical action"],
          rows: [
            ["Cost reduction", "Which activities cost most, and why?", "Attack the driver — fewer set-ups through better scheduling, not faster set-ups"],
            ["Activity classification", "Is this activity value-adding to the customer?", "Eliminate or minimise non-value-adding activities such as moving, storing, inspecting, waiting"],
            ["Customer profitability", "Which customers consume the most activity?", "Reprice, change service terms, or decline the business"],
            ["Process redesign", "Why does this activity exist at all?", "Redesign so the driver disappears — see business process re-engineering"],
            ["Budgeting", "What activity volume will next year require?", "Activity-based budgeting from driver forecasts"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Attack the driver, not the activity's unit cost",
          md: "Making set-ups 10% faster is an efficiency gain. Rescheduling production so that half the set-ups are unnecessary removes the cost entirely. ABM's contribution is that it directs attention to the **number of times the activity happens**, which is nearly always the larger prize — and that distinction is worth stating explicitly in a recommendation.",
        },
        {
          kind: "text",
          md: "**Customer profitability analysis** deserves particular mention because it is where ABM most often produces a surprise. Customers differ enormously in the activity they consume — small frequent orders, special packaging, returns, credit control effort, technical support — and a customer generating good gross margin can be unprofitable once those activities are traced. The recommendation that follows is rarely to drop the customer immediately, but to change the terms: minimum order sizes, delivery charges, or a price reflecting the service level.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The limitations to state",
          md: "ABC is expensive to implement and maintain; identifying drivers requires data most systems do not collect; some overhead is genuinely facility-level and cannot be sensibly driven to products at all; and the resulting costs are still averages that depend on the drivers chosen. It also risks producing precision that masks judgement. Recommend it where overhead is large and diverse — not for an organisation whose overhead is small or genuinely volume-driven.",
        },
      ],
      check: {
        q: "An activity analysis shows set-up costs are the largest overhead pool. Which recommendation reflects activity-based management rather than simple cost control?",
        options: [
          "Negotiate lower wages for the set-up team",
          "Reschedule production into longer runs and standardise components so that fewer set-ups are required at all — attacking the driver rather than the unit cost of the activity",
          "Absorb set-up costs over more machine hours",
          "Reclassify set-up costs as a direct cost",
        ],
        correct: 1,
        explain:
          "ABM directs attention to how often the activity is triggered. Reducing the number of set-ups removes the cost rather than shaving it, and typically yields far more than making each set-up marginally cheaper. Options 2 and 3 are accounting changes that alter the presentation without touching the cost.",
      },
    },
  ],
  examTraps: [
    { trap: "Producing ABC product costs and stopping.", fix: "Reach the decision — pricing, mix, customer terms, investment." },
    { trap: "Confining the answer to product costing when asked about ABM.", fix: "ABM covers cost reduction, value analysis, customer profitability and process redesign." },
    { trap: "Recommending faster activities.", fix: "Attack the driver so the activity happens less often." },
    { trap: "Recommending ABC universally.", fix: "It suits large, diverse, complexity-driven overhead — not a small or genuinely volume-driven cost base." },
  ],
  keyTerms: [
    { term: "Cost driver", def: "The factor that causes the cost of an activity to be incurred, such as the number of set-ups or purchase orders." },
    { term: "Activity-based management", def: "Using activity and driver analysis to improve performance — reducing costs, eliminating non-value-adding work and assessing customer profitability." },
    { term: "Non-value-adding activity", def: "Work the customer would not pay for if they saw it — moving, storing, waiting, inspecting, correcting." },
    { term: "Customer profitability analysis", def: "Tracing the activity each customer consumes to establish the true profitability of serving them." },
  ],
  summary: [
    "Volume-based absorption fails where overhead is driven by complexity rather than volume.",
    "The consequence is strategic: wrong pricing, wrong mix, wrong customers, wrong investment.",
    "Activity-based management attacks the driver so the activity happens less often.",
    "Customer profitability analysis frequently overturns the assumed ranking of accounts.",
  ],
  knowledgeDiagnostic: [
    { q: "Which products are most misstated by volume-based absorption?", a: "Low-volume, complex ones — they consume transaction-driven overhead heavily while absorbing it in proportion to their small volume." },
    { q: "What distinguishes activity-based management from activity-based costing?", a: "Costing produces better product costs; management uses the activity analysis to reduce cost, eliminate non-value-adding work and assess customer profitability." },
    { q: "What usually yields more: a cheaper activity or a less frequent one?", a: "A less frequent one — attacking the driver removes the cost rather than shaving its unit rate." },
  ],
  furtherStudy: [
    "APM-20 covers the value chain, whose activity analysis ABC quantifies.",
    "APM-24 covers business process re-engineering, the radical form of attacking the driver.",
    "APM-14 covers tracing hidden environmental costs, an application of the same method.",
  ],
}

const APM_TREE_22: StudyChapter = {
  paper: "APM",
  id: "APM-22",
  number: 22,
  area: "B",
  syllabusRefs: ["B3(d)"],
  title: "Cost management through the product life",
  minutes: 17,
  intro:
    "Most of a product's cost is committed before anything is made. Kaizen, target and lifecycle costing are three responses to that fact, applied at different moments.",
  outcomes: [
    "Apply target costing and compute a cost gap",
    "Apply lifecycle costing and explain what conventional period costing misses",
    "Apply kaizen costing and distinguish it from standard costing",
    "Explain just-in-time and its performance implications",
    "Recommend the technique that fits the stage the product has reached",
  ],
  sections: [
    {
      id: "target-lifecycle",
      heading: "Target costing and lifecycle costing",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Cost is committed early and incurred late",
          md: "Around 80% of a product's cost is determined by decisions taken at the **design** stage — materials, tolerances, component count, manufacturability — while almost all of it is spent later. That is why cost reduction efforts aimed at production usually disappoint: by then the cost has already been decided. Target costing exists to move the decision to where it is actually made.",
        },
        {
          kind: "formula",
          name: "Target costing",
          expr: "Target cost = target selling price − required profit margin;  cost gap = expected cost − target cost",
          note:
            "The logic runs backwards from the market. The price is what customers will pay, the margin is what the business requires, and the cost is the residual the product must be designed to meet — the opposite of cost-plus pricing, which starts from the cost and hopes the market accepts the result.",
        },
        {
          kind: "example",
          title: "Closing a cost gap",
          scenario:
            "Market research indicates a price of $240 will win the target share. The company requires a 25% margin on selling price. Current design cost is $205.",
          steps: [
            { label: "Target cost", detail: "240 × (1 − 0.25) = $180." },
            { label: "Cost gap", detail: "205 − 180 = $25 a unit that must be designed out." },
            { label: "How to close it", detail: "Value engineering — reduce component count, substitute materials, design for assembly, standardise parts across products, renegotiate supply, simplify features customers do not value." },
            { label: "The discipline", detail: "If the gap cannot be closed, the product does not proceed. That decision is the point of the technique." },
          ],
          result:
            "The alternative — launching at $205 cost and a $240 price, taking a 14.6% margin instead of 25% — is exactly what target costing exists to prevent, because the shortfall is invisible once the product is in production.",
        },
        {
          kind: "text",
          md: "**Lifecycle costing** widens the lens in time rather than in scope: it accumulates all costs from research through to decommissioning, rather than reporting profitability period by period. Its finding is usually that a product reported as profitable in its middle years never recovered its development cost, or that a cheap purchase carried expensive maintenance and disposal — which is why it matters for procurement decisions as well as for products.",
        },
        {
          kind: "table",
          caption: "What each life stage needs",
          head: ["Stage", "Cost characteristic", "Management focus"],
          rows: [
            ["Development", "High spend, no revenue", "Target costing — design the cost out before commitment"],
            ["Introduction", "High marketing, low volume", "Pricing strategy and volume build"],
            ["Growth", "Unit costs fall with volume and learning", "Capacity, quality, share"],
            ["Maturity", "Stable costs, competitive pressure on price", "Kaizen costing — continuous incremental reduction"],
            ["Decline", "Falling volume, rising unit cost", "Harvest or withdraw; plan decommissioning cost"],
          ],
        },
      ],
      check: {
        q: "A product's expected cost is $118 against a target cost of $95. What does target costing require?",
        options: [
          "Raise the selling price to restore the margin",
          "Close the $23 gap through value engineering at the design stage — and if it cannot be closed, do not proceed with the product",
          "Accept the lower margin, since the product is still profitable",
          "Absorb less overhead into the product",
        ],
        correct: 1,
        explain:
          "The price came from the market and the margin is a business requirement, so neither is available for adjustment — which leaves the cost, and the design stage is where it is determined. The willingness to abandon a product whose gap cannot be closed is what makes the technique a discipline rather than an aspiration.",
      },
    },
    {
      id: "kaizen-jit",
      heading: "Kaizen costing and just-in-time",
      blocks: [
        {
          kind: "table",
          caption: "Kaizen costing against standard costing",
          head: ["", "Standard costing", "Kaizen costing"],
          rows: [
            ["Goal", "Meet the standard", "Reduce cost below the current level, continuously"],
            ["The standard is", "Fixed for the period", "Reduced each period by a target amount"],
            ["Variance means", "Deviation from the standard", "Failure to achieve the planned reduction"],
            ["Improvement comes from", "Management and engineers", "The people doing the work"],
            ["Stage suited to", "Stable, mature production", "Mature production under price pressure"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The behavioural difference is the point",
          md: "Standard costing asks 'did we hit the standard?', which makes maintaining the status quo a success. Kaizen asks 'did we reduce it?', which makes the status quo a failure. And because the improvements come from the people doing the work, it requires the opposite of a blame culture — small suggestions have to be safe to make and quick to adopt.",
        },
        {
          kind: "text",
          md: "**Just-in-time** produces materials and components only as required, eliminating inventory and the costs and problems it conceals. Its performance consequences run well beyond stock levels: with no buffer, quality problems and supplier failures stop production immediately, so JIT is only viable alongside high quality and reliable supply — which is why it comes with total quality management rather than instead of it.",
        },
        {
          kind: "table",
          caption: "What JIT changes about measurement",
          head: ["Measure", "Before JIT", "Under JIT"],
          rows: [
            ["Inventory", "Buffer against disruption; a working capital cost", "Near zero — and any inventory is treated as concealing a problem"],
            ["Machine utilisation", "Maximise it — idle machines are waste", "Producing unneeded stock is worse than idling; utilisation is deprioritised"],
            ["Batch size", "Large, to spread set-up cost", "Small, requiring set-up times to be reduced"],
            ["Supplier selection", "Price, with multiple sources", "Reliability and quality, with fewer, closer partners"],
            ["Quality", "Inspected at the end", "Built in at source; a defect stops the line"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The measurement trap JIT sets",
          md: "Traditional efficiency measures actively **fight** JIT. A manager judged on machine utilisation or on absorbing fixed overhead will produce stock nobody needs to keep the numbers up. So a scenario introducing JIT while retaining utilisation and absorption measures contains a guaranteed conflict — and identifying it is precisely the kind of finding this paper rewards.",
        },
      ],
      check: {
        q: "A company introduces just-in-time production while continuing to reward plant managers on machine utilisation. What will happen?",
        options: [
          "Both objectives will be achieved together",
          "The managers will keep producing to maintain utilisation, creating exactly the inventory JIT is designed to eliminate — the measurement system contradicts the operating philosophy",
          "Utilisation will improve automatically under JIT",
          "JIT will reduce quality",
        ],
        correct: 1,
        explain:
          "Under JIT, running a machine to make something nobody has ordered is waste; under a utilisation measure, it is success. The manager cannot satisfy both, and will satisfy the one the bonus depends on — so the measures must change with the operating model.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying target costing after production has begun.", fix: "Cost is committed at design; that is where the gap must be closed." },
    { trap: "Treating the target cost as negotiable.", fix: "Price comes from the market and margin from the business — if the gap will not close, the product should not proceed." },
    { trap: "Describing kaizen as standard costing done more often.", fix: "The standard itself falls each period, and improvements come from the workforce." },
    { trap: "Introducing JIT while retaining utilisation and absorption measures.", fix: "They reward exactly the overproduction JIT exists to remove." },
  ],
  keyTerms: [
    { term: "Target costing", def: "Deriving an allowable cost by deducting the required margin from a market-determined price, then designing the product to meet it." },
    { term: "Cost gap", def: "The excess of expected cost over target cost, to be closed by value engineering before the product proceeds." },
    { term: "Lifecycle costing", def: "Accumulating all costs from development through to decommissioning, rather than assessing profitability period by period." },
    { term: "Kaizen costing", def: "Continuous incremental cost reduction, in which the standard itself is lowered each period and improvements come from those doing the work." },
  ],
  summary: [
    "Most cost is committed at the design stage, which is where target costing operates.",
    "Target cost is price less required margin; if the gap will not close, the product should not proceed.",
    "Lifecycle costing catches development and decommissioning costs that period reporting hides.",
    "Kaizen lowers the standard each period; JIT requires the traditional efficiency measures to be abandoned.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is cost reduction at the production stage usually disappointing?", a: "Around 80% of cost is committed by design decisions taken long before, so only a small proportion remains genuinely influenceable." },
    { q: "How does kaizen costing differ behaviourally from standard costing?", a: "Standard costing treats meeting the standard as success; kaizen treats an unchanged cost as failure, and draws improvements from the workforce." },
    { q: "Which traditional measures conflict with JIT?", a: "Machine utilisation and overhead absorption, both of which reward producing inventory that JIT exists to eliminate." },
  ],
  furtherStudy: [
    "APM-23 covers quality management, without which just-in-time cannot operate.",
    "APM-21 covers activity-based costing, which identifies where the cost to be designed out actually sits.",
    "APM-19 covers why a measure retained from a previous operating model produces the wrong behaviour.",
  ],
}

const APM_TREE_23: StudyChapter = {
  paper: "APM",
  id: "APM-23",
  number: 23,
  area: "B",
  syllabusRefs: ["B3(d)"],
  title: "Quality: Six Sigma, TQM and the cost of quality",
  minutes: 17,
  intro:
    "Quality is the one area where spending more and paying less are the same decision — provided you spend it at the right end.",
  outcomes: [
    "Analyse the four categories in a cost of quality report",
    "Explain why prevention spending reduces total quality cost",
    "Explain total quality management and its performance implications",
    "Apply Six Sigma and the DMAIC cycle",
    "Recommend a quality approach and identify what it demands of the organisation",
  ],
  sections: [
    {
      id: "cost-of-quality",
      heading: "The four costs of quality",
      blocks: [
        {
          kind: "table",
          caption: "Where quality cost lands",
          head: ["Category", "Contains", "Timing"],
          rows: [
            ["Prevention", "Design for quality, training, supplier development, process capability, maintenance", "Before anything goes wrong — discretionary"],
            ["Appraisal", "Inspection, testing, audits, measurement equipment", "During — detecting problems already created"],
            ["Internal failure", "Scrap, rework, downtime, re-inspection, downgrading", "After, but before the customer sees it"],
            ["External failure", "Warranty claims, returns, recalls, complaint handling, lost customers, reputational damage", "After the customer sees it — the most expensive by far"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The relationship between the four",
          md: "Spending on **prevention** reduces internal and external failure by a multiple of the amount spent, because a defect caught at design costs a fraction of one caught in the field. So a quality cost report showing low prevention and high external failure is not showing a well-controlled operation — it is showing an organisation paying the most expensive possible price for its quality problems.",
        },
        {
          kind: "example",
          title: "Reading a cost of quality report",
          scenario:
            "A manufacturer reports prevention $120k, appraisal $340k, internal failure $610k and external failure $1,430k, on revenue of $42m.",
          steps: [
            { label: "Total", detail: "$2.5m, or 6.0% of revenue — high, and the composition explains why." },
            { label: "The composition", detail: "Failure costs are $2.04m, 82% of the total, while prevention is under 5%." },
            { label: "The diagnosis", detail: "The company is detecting and repairing defects rather than preventing them, and more than half its quality cost reaches the customer." },
            { label: "The recommendation", detail: "Shift spending toward prevention — supplier quality, process capability, design review, training — and expect total cost to fall as failure costs decline." },
          ],
          result:
            "The external failure figure also understates the true cost, because lost customers and reputational damage rarely appear in it. That understatement is worth stating explicitly.",
        },
        {
          kind: "text",
          md: "Note the measurement problem: external failure cost is the largest category and the least completely recorded. Warranty claims are captured; the customer who quietly never returns is not. So any quality cost report should be read as a **floor** on the true cost, which strengthens rather than weakens the case for prevention.",
        },
      ],
      check: {
        q: "A quality cost report shows prevention at 5% of total quality cost and external failure at 57%. What does this indicate?",
        options: [
          "Efficient quality management, since little is spent on prevention",
          "The organisation is paying for its quality problems in the most expensive way available — after the customer has experienced them — and shifting spend to prevention should reduce total cost substantially",
          "The appraisal function is working well",
          "Quality costs are within normal limits",
        ],
        correct: 1,
        explain:
          "The composition matters more than the total. Failure cost dominated by the external category means defects are reaching customers, where each one costs far more than it would have at design or inspection — and the recorded figure excludes the customers who simply left.",
      },
    },
    {
      id: "tqm-sixsigma",
      heading: "Total quality management and Six Sigma",
      blocks: [
        {
          kind: "text",
          md: "**Total quality management** is a philosophy rather than a technique: quality is everyone's responsibility, it is built in rather than inspected in, improvement is continuous, and the aim is to get it right first time. Its performance implications are substantial — it needs training, worker authority to stop a process, supplier partnership, and measures that reward prevention rather than detection.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "TQM redefines who the customer is",
          md: "Every stage treats the next stage as its customer, so quality is judged internally at each handover rather than only at the end. That is what makes it *total* — and it is why TQM cannot be implemented by the quality department alone, which is the usual reason it fails.",
        },
        {
          kind: "text",
          md: "**Six Sigma** is the quantitative counterpart: a disciplined, data-driven method aimed at reducing variation, with a target of no more than 3.4 defects per million opportunities. Its structure is the **DMAIC** cycle.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "DMAIC",
            data: {
              steps: [
                { label: "Define", sub: "The problem, the customer requirement, the scope" },
                { label: "Measure", sub: "Current performance and the data to establish it" },
                { label: "Analyse", sub: "Root causes of variation" },
                { label: "Improve", sub: "Implement and test the change" },
                { label: "Control", sub: "Hold the gain — monitoring and standards" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "TQM and Six Sigma compared",
          head: ["", "TQM", "Six Sigma"],
          rows: [
            ["Nature", "Culture and philosophy", "Structured project methodology"],
            ["Focus", "Continuous improvement everywhere", "Reducing variation in specific processes"],
            ["Evidence", "Broad, often qualitative", "Statistical and rigorous"],
            ["Who does it", "Everyone", "Trained specialists leading defined projects"],
            ["Risk", "Becomes a slogan without measurable change", "Becomes a series of projects without cultural change"],
          ],
        },
        {
          kind: "text",
          md: "The **control** step is the one organisations skip, and it is where improvements are lost. Without new standards, monitoring and ownership, a process drifts back within months and the project's gains disappear — which is why a recommendation should specify how the gain will be held, not merely how it will be achieved.",
        },
      ],
      check: {
        q: "Which step of DMAIC is most often omitted, and what is the consequence?",
        options: [
          "Define — teams start work without a clear problem",
          "Control — without new standards, monitoring and ownership the process drifts back to its previous performance and the improvement is lost",
          "Measure — data is expensive to collect",
          "Improve — organisations analyse without acting",
        ],
        correct: 1,
        explain:
          "Control is unglamorous and comes after the visible achievement, so it is routinely under-resourced. The result is that gains erode and the same problem is re-solved by a later project — which is why any improvement recommendation should say how the gain will be held.",
      },
    },
  ],
  examTraps: [
    { trap: "Reading a low prevention figure as efficiency.", fix: "It usually explains a high failure cost; the composition matters more than the total." },
    { trap: "Treating the external failure figure as complete.", fix: "Lost customers and reputational damage are rarely recorded — it is a floor." },
    { trap: "Implementing TQM through the quality department.", fix: "It requires every stage to treat the next as its customer; a departmental programme is not TQM." },
    { trap: "Omitting the control step of DMAIC.", fix: "Specify how the gain will be held, or it will erode within months." },
  ],
  keyTerms: [
    { term: "Prevention cost", def: "Spending to stop defects arising — design, training, supplier development, process capability — which reduces failure cost by a multiple." },
    { term: "External failure cost", def: "The cost of defects reaching the customer, including warranty, recall, complaint handling and lost business — the largest and least completely recorded category." },
    { term: "Total quality management", def: "A philosophy making quality everyone's responsibility, built in rather than inspected in, with each stage treating the next as its customer." },
    { term: "DMAIC", def: "Six Sigma's cycle — define, measure, analyse, improve, control — whose final step holds the gain." },
  ],
  summary: [
    "Four categories: prevention, appraisal, internal failure and external failure.",
    "Prevention spending reduces total quality cost because failures get more expensive the later they are caught.",
    "TQM is cultural and total; Six Sigma is statistical and project-based — they are complementary.",
    "The control step is what stops an improvement decaying back to where it started.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does increasing prevention spending usually reduce total quality cost?", a: "A defect prevented at design costs a fraction of one detected in inspection, and far less than one reaching the customer." },
    { q: "Why is external failure cost systematically understated?", a: "Warranty and returns are recorded, but the customers who simply do not come back, and the reputational effect, are not." },
    { q: "What does TQM mean by 'the next process is the customer'?", a: "Each stage judges its output by the requirements of the stage that receives it, so quality is assured at every handover rather than inspected at the end." },
  ],
  furtherStudy: [
    "APM-22 covers just-in-time, which cannot operate without the quality levels this chapter describes.",
    "APM-24 covers business process re-engineering, the radical alternative to incremental improvement.",
    "APM-13 covers the customer measures that detect external failure before the accounts do.",
  ],
}

const APM_TREE_24: StudyChapter = {
  paper: "APM",
  id: "APM-24",
  number: 24,
  area: "B",
  syllabusRefs: ["B3(e)"],
  title: "Business process re-engineering",
  minutes: 15,
  intro:
    "Continuous improvement makes an existing process better. Re-engineering asks whether the process should exist at all — and that difference is the whole examinable point.",
  outcomes: [
    "Explain business process re-engineering and how it differs from continuous improvement",
    "Assess its effect on systems development and organisational performance",
    "Identify the processes that are candidates for re-engineering",
    "Explain the measurement consequences of redesigning around processes",
    "Assess the risks and the reasons re-engineering programmes fail",
  ],
  sections: [
    {
      id: "what-bpr-is",
      heading: "Fundamental rethinking, not improvement",
      blocks: [
        {
          kind: "table",
          caption: "Two approaches to the same process",
          head: ["", "Kaizen / continuous improvement", "Business process re-engineering"],
          rows: [
            ["Question asked", "How do we do this better?", "Why do we do this at all?"],
            ["Scale of change", "Incremental", "Radical, starting from a blank sheet"],
            ["Risk", "Low", "High — it can fail expensively"],
            ["Pace", "Continuous", "One-off, project-based"],
            ["Driven by", "The people doing the work", "Senior management, often with technology"],
            ["Typical gain", "A few per cent, repeatedly", "Order-of-magnitude, or nothing"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The characteristic move: organise around processes, not functions",
          md: "Most organisations are structured by function — purchasing, production, credit control, dispatch — while the work that matters flows **across** them. A customer order crosses six departments, waiting in each. Re-engineering redesigns around the end-to-end process, which is where the dramatic reductions in time come from: not from doing each step faster, but from removing the handovers between them.",
        },
        {
          kind: "text",
          md: "The syllabus asks specifically about the effect on **systems development**. The relationship runs both ways: technology enables redesign that was previously impossible, and redesign should precede system specification. An organisation that automates its existing process gets a faster version of a bad process — which is the single most common and expensive error in this area, and one worth naming explicitly.",
        },
      ],
      check: {
        q: "A company implements new software that automates its existing eight-step purchase approval process. What is the concern?",
        options: [
          "New software is always more expensive than expected",
          "It has automated the existing process rather than asking whether eight approval steps are needed at all — the result is a faster version of an unnecessarily complex process, not a re-engineered one",
          "Automation always reduces control",
          "Staff will resist the change",
        ],
        correct: 1,
        explain:
          "Re-engineering requires the process to be redesigned before it is automated, precisely because the system will otherwise encode the existing inefficiency permanently and make it harder to remove later. Asking why eight steps exist is the intervention; the software is only the enabler.",
      },
    },
    {
      id: "performance-effects",
      heading: "What it does to performance and to measurement",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "The performance effects claimed",
          items: [
            "Dramatic reductions in cycle time, as handovers and waiting are eliminated",
            "Lower cost, because whole activities disappear rather than becoming cheaper",
            "Better customer experience, since one process owner is accountable end to end",
            "Fewer errors, because information is captured once instead of re-keyed at each handover",
            "Flatter structures, as coordinating layers between functions become unnecessary",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The measurement system must be redesigned with the process",
          md: "Functional measures — departmental cost, departmental efficiency — actively obstruct a process redesign, because each department optimises its own number at the expense of the flow. If the process is redesigned end to end but the measures remain functional, the old behaviour returns. Recommend **process measures**: total cycle time, first-time-right across the whole flow, cost per completed transaction, and a named process owner.",
        },
        {
          kind: "table",
          caption: "Why re-engineering programmes fail",
          head: ["Cause", "What it looks like"],
          rows: [
            ["No senior sponsorship", "The programme stalls at the first departmental objection"],
            ["Redesign in name only", "The existing process with a new system on top"],
            ["Cost-cutting in disguise", "Presented as redesign, experienced as redundancy, so cooperation evaporates"],
            ["Measures unchanged", "Functional targets pull behaviour back to the old pattern"],
            ["Scale misjudged", "Everything re-engineered at once, so the organisation cannot absorb it"],
            ["No process owner", "Nobody is accountable for the flow, only for the parts"],
          ],
        },
        {
          kind: "text",
          md: "Re-engineering's reputation suffered because it was frequently used as a respectable label for redundancy programmes. That matters for an APM answer: where a scenario describes a re-engineering initiative alongside headcount reduction targets, expect resistance, information withholding and the loss of the very staff cooperation the redesign depends on — and say so, because the human consequence is part of the assessment the syllabus asks for.",
        },
      ],
      check: {
        q: "A company re-engineers its order-to-delivery process end to end, but continues to measure and reward each department on its own functional efficiency. What is the likely result?",
        options: [
          "The redesign will succeed, since the process is now correct",
          "Departments will keep optimising their own measures at the expense of the overall flow, and the old behaviour will reassert itself — process measures such as total cycle time and a named process owner are needed",
          "Functional measures are irrelevant after re-engineering",
          "The company should return to the original process",
        ],
        correct: 1,
        explain:
          "People follow the measures, not the process map. Leaving functional targets in place after a process redesign guarantees that the handover problems return, which is why the measurement system has to be redesigned as part of the same programme rather than afterwards.",
      },
    },
  ],
  examTraps: [
    { trap: "Presenting re-engineering as intensive continuous improvement.", fix: "It asks why the process exists, not how to do it better." },
    { trap: "Recommending automation of an existing process.", fix: "Redesign first — otherwise the system encodes the inefficiency permanently." },
    { trap: "Redesigning the process and leaving the measures functional.", fix: "Process measures and a named process owner, or the old behaviour returns." },
    { trap: "Ignoring the human consequence.", fix: "Where redesign accompanies redundancy targets, expect resistance and lost cooperation — and say so." },
  ],
  keyTerms: [
    { term: "Business process re-engineering", def: "Fundamental rethinking and radical redesign of processes to achieve dramatic improvement, rather than incremental gains within the existing design." },
    { term: "Process owner", def: "A single individual accountable for an end-to-end process across the functions it crosses." },
    { term: "Cycle time", def: "The total elapsed time from the start of a process to its completion, including waiting between steps — the measure functional reporting hides." },
  ],
  summary: [
    "Re-engineering asks why a process exists; improvement asks how to do it better.",
    "The characteristic move is organising around end-to-end processes rather than functions.",
    "Redesign before automating, or the system makes the inefficiency permanent.",
    "Change the measures with the process, or functional optimisation restores the old behaviour.",
  ],
  knowledgeDiagnostic: [
    { q: "Where do re-engineering's dramatic time reductions come from?", a: "Removing handovers and waiting between functions, rather than performing each individual step faster." },
    { q: "Why must redesign precede system specification?", a: "Automating an existing process produces a faster bad process and encodes the inefficiency in software, making it harder to remove later." },
    { q: "What measures does a re-engineered process need?", a: "End-to-end process measures — total cycle time, first-time-right across the flow, cost per completed transaction — with a named process owner." },
  ],
  furtherStudy: [
    "APM-22 covers kaizen, the incremental alternative this chapter is contrasted with.",
    "APM-21 covers the activity analysis that identifies which processes are candidates.",
    "Area D covers the technology developments that make radical redesign possible.",
  ],
}

const APM_TREE_25: StudyChapter = {
  paper: "APM",
  id: "APM-25",
  number: 25,
  area: "B",
  syllabusRefs: ["B4(a)", "B4(b)"],
  title: "Performance measurement in service businesses",
  minutes: 16,
  intro:
    "You cannot inspect a haircut before it happens, hold a consultation in inventory, or deliver the same one twice. Everything difficult about measuring services follows from those facts.",
  outcomes: [
    "Assess the impact of the characteristics of service businesses on measurement",
    "Explain each characteristic's specific consequence for management",
    "Apply Fitzgerald and Moon's building block model to a service organisation",
    "Recommend measures suited to a service context",
    "Recognise why service quality measurement depends on perception as well as delivery",
  ],
  sections: [
    {
      id: "ship",
      heading: "The characteristics, and what each one breaks",
      blocks: [
        {
          kind: "table",
          caption: "SHIP — and the measurement problem each creates",
          head: ["Characteristic", "Meaning", "Consequence for measurement"],
          rows: [
            ["Simultaneity", "Production and consumption happen at the same moment", "No opportunity to inspect before the customer experiences it — quality must be assured in advance, through people and process"],
            ["Heterogeneity", "Each delivery differs, because people deliver it", "Consistency itself becomes a measure; standard costing is far less useful"],
            ["Intangibility", "There is no physical product to examine", "Customers judge on proxies — surroundings, manner, speed — so perception measures matter as much as delivery measures"],
            ["Perishability", "Unused capacity cannot be stored", "Capacity utilisation and demand management become central; an empty seat is lost forever"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Perishability drives the pricing you already recognise",
          md: "Because an empty airline seat, hotel room or consultant-day cannot be recovered, service businesses manage **demand** rather than inventory: off-peak pricing, yield management, booking incentives, overbooking. So capacity utilisation is not merely an efficiency measure in a service business — it is close to a survival measure, and it belongs alongside the quality measures rather than behind them.",
        },
        {
          kind: "text",
          md: "**Heterogeneity** has a subtler consequence. Where output varies by delivery, the variation itself is what customers notice — a restaurant that is excellent half the time and poor the other half is experienced as unreliable rather than average. So measure the **distribution** of service quality, not just its mean: the proportion of interactions falling below an acceptable standard is usually more informative than the average score.",
        },
      ],
      check: {
        q: "Why is standard costing of limited use in a professional services firm?",
        options: [
          "Because service businesses do not incur costs",
          "Because heterogeneity means each engagement genuinely differs — the work varies with the client, so a standard cost per unit of output has little meaning and variances mostly reflect that variety rather than efficiency",
          "Because services have no direct labour",
          "Because standard costing is prohibited outside manufacturing",
        ],
        correct: 1,
        explain:
          "Standard costing assumes a repeatable output with a determinable expected cost. Where every engagement differs, the variance largely measures the mix of work rather than performance — which is why service firms use utilisation, realisation and recovery rates instead.",
      },
    },
    {
      id: "building-blocks-applied",
      heading: "The building block model applied",
      blocks: [
        {
          kind: "text",
          md: "Fitzgerald and Moon's model was developed for services precisely because of these characteristics. APM-18 covered the framework; here the point is what its six dimensions look like in a real service organisation.",
        },
        {
          kind: "table",
          caption: "The six dimensions in a service context",
          head: ["Dimension", "Type", "Service measures"],
          rows: [
            ["Competitiveness", "Result", "Market share, win rate on proposals, client retention, share of client spend"],
            ["Financial performance", "Result", "Margin per engagement, revenue per fee earner, recovery rate"],
            ["Quality", "Determinant", "Client satisfaction, complaint rate, reliability, responsiveness, competence"],
            ["Flexibility", "Determinant", "Speed of response, ability to handle volume changes and specification changes"],
            ["Resource utilisation", "Determinant", "Chargeable hours as a percentage of available, capacity fill"],
            ["Innovation", "Determinant", "New services introduced, proportion of revenue from services launched recently"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The utilisation trap in professional services",
          md: "Chargeable-hours utilisation is the classic service measure and it is heavily gamed. A firm pushing utilisation gets time recorded against clients, work padded to fill available hours, and no time left for training, business development or improvement — the very determinants the model says produce future results. **Pair it with realisation** (what proportion of recorded time was actually billed and collected) and with a client satisfaction measure, so recording without value becomes visible.",
        },
        {
          kind: "activity",
          title: "Recommend a measurement set",
          prompt:
            "A mid-sized consultancy currently measures only chargeable hours utilisation and monthly revenue. What would you add, and why?",
          answer:
            "The two existing measures are both results-focused and one of them is easily gamed, so the additions should cover the determinants and close the gaming route. I would add realisation rate first - the proportion of recorded time actually billed and collected - because it directly counters the incentive to record hours that create no value, and a firm with high utilisation and falling realisation is manufacturing its own key measure. Second, client satisfaction and retention: services are judged on perception as much as delivery, and retention is the behavioural version that cannot be talked up. Third, a flexibility or responsiveness measure such as time from enquiry to proposal, since in consultancy that frequently decides who wins the work. Fourth, something on the learning side - training days delivered, or proportion of revenue from services introduced in the last two years - because a utilisation target squeezes exactly this out, and it is what determines the firm's position in three years. I would also recommend measuring the distribution of satisfaction rather than the average, since consultancy quality is heterogeneous by nature and the clients who received the poor engagements are the ones who leave, not the ones who received the average.",
        },
      ],
      check: {
        q: "A professional firm's chargeable-hours utilisation is rising while its realisation rate falls. What does this indicate?",
        options: [
          "The firm is becoming more efficient",
          "Time is being recorded that cannot ultimately be billed or collected — utilisation is being met by recording rather than by productive work, which is why the two measures belong together",
          "Clients are paying more slowly",
          "The utilisation target should be raised further",
        ],
        correct: 1,
        explain:
          "Utilisation counts time recorded; realisation tests whether that time had value to a client willing to pay for it. The pair is a standard example of the paired-measure principle: the cheap route to improving one visibly damages the other, which makes the gaming detectable.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing the service characteristics without their measurement consequences.", fix: "Each one breaks something specific — say what." },
    { trap: "Recommending standard costing in a service business.", fix: "Heterogeneity means variances mostly measure the mix of work." },
    { trap: "Using utilisation alone.", fix: "Pair with realisation and a client measure, or recorded time replaces useful work." },
    { trap: "Reporting mean service quality.", fix: "Report the distribution — customers experience individual encounters, not averages." },
  ],
  keyTerms: [
    { term: "Simultaneity", def: "The characteristic that a service is produced and consumed at the same moment, so it cannot be inspected before the customer experiences it." },
    { term: "Perishability", def: "The characteristic that unused service capacity cannot be stored, making capacity utilisation and demand management central." },
    { term: "Realisation rate", def: "The proportion of recorded chargeable time that is actually billed and collected, used to counter the gaming of utilisation." },
  ],
  summary: [
    "Simultaneity, heterogeneity, intangibility and perishability each break a different part of conventional measurement.",
    "Perishability makes capacity utilisation close to a survival measure in services.",
    "The building block model's four determinants are what a service firm can actually act on.",
    "Pair utilisation with realisation, and report the distribution of quality rather than the mean.",
  ],
  knowledgeDiagnostic: [
    { q: "Why must service quality be assured in advance rather than inspected?", a: "Simultaneity — the service is consumed as it is produced, so there is no gap in which to inspect and correct it." },
    { q: "Why report the distribution of service quality rather than the average?", a: "Heterogeneity means customers experience individual encounters; the ones who received poor service leave, whatever the mean says." },
    { q: "What does realisation rate protect against?", a: "Utilisation being met by recording time rather than by doing work a client will pay for." },
  ],
  furtherStudy: [
    "APM-18 covers the building block model's structure of dimensions, standards and rewards.",
    "APM-13 covers the non-financial customer measures services depend on.",
    "APM-26 covers not-for-profit organisations, which share the output-measurement difficulty.",
  ],
}

const APM_TREE_26: StudyChapter = {
  paper: "APM",
  id: "APM-26",
  number: 26,
  area: "B",
  syllabusRefs: ["B4(c)", "B4(d)", "B4(e)", "B4(f)"],
  title: "Not-for-profit organisations",
  minutes: 17,
  intro:
    "No profit figure, multiple objectives that conflict, and outputs that resist measurement. Everything that makes commercial performance measurement tractable is absent — which is exactly why it is examined.",
  outcomes: [
    "Assess the problems multiple objectives create in a not-for-profit organisation",
    "Explain the difficulty of measuring outputs where performance is not judged in money",
    "Apply value for money and the three Es to a not-for-profit scenario",
    "Assess the use of league tables and the behaviour they produce",
    "Recommend a measurement approach appropriate to the sector",
  ],
  sections: [
    {
      id: "multiple-objectives",
      heading: "Multiple objectives and unmeasurable outputs",
      blocks: [
        {
          kind: "text",
          md: "A commercial organisation has a **single dominant objective** that resolves conflicts: where two options compete, choose the one creating more value. A not-for-profit has several objectives with no exchange rate between them — and no way of saying that a certain amount of one is worth a certain amount of another.",
        },
        {
          kind: "illustration",
          title: "The conflict with no arithmetic solution",
          md: "A health charity can fund research, direct patient support, or public awareness campaigning. All three serve the mission. There is no calculation establishing that a hundred patients supported this year is worth more or less than a research grant that may help thousands in a decade, or than a campaign that may prevent illness altogether. The allocation is a judgement about values, and the measurement system can inform it but cannot settle it. Saying that plainly is better than pretending a scorecard resolves it.",
        },
        {
          kind: "table",
          caption: "Why outputs resist measurement",
          head: ["Problem", "Example"],
          rows: [
            ["Output is not monetary", "Educational attainment, health improvement, reduced reoffending"],
            ["Outcomes are long-delayed", "Preventive health spending shows results decades later"],
            ["Attribution is hard", "Did the intervention cause the improvement, or would it have happened anyway?"],
            ["Quality is subjective", "'Good care' or 'a good education' resists a single agreed definition"],
            ["The counterfactual is unobservable", "Nobody sees the crimes prevented or the illnesses avoided"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The output/outcome distinction is the key one",
          md: "An **output** is what the organisation produced — patients treated, pupils taught, meals delivered. An **outcome** is the change that resulted — health improved, learning achieved, hunger relieved. Outputs are countable and outcomes are what matter, so organisations under measurement pressure drift toward reporting outputs. Naming that drift, and recommending at least one outcome measure however imperfect, is the examinable judgement.",
        },
      ],
      check: {
        q: "A charity reports the number of meals it delivered as its principal performance measure. What is the limitation?",
        options: [
          "The figure is likely to be inaccurate",
          "It is an output rather than an outcome — it counts activity without establishing whether hunger was actually relieved among those who needed it most, so the charity could increase the measure while serving its mission less well",
          "Meals cannot be counted reliably",
          "Charities should use financial measures instead",
        ],
        correct: 1,
        explain:
          "The measure counts what was done rather than what changed, so it can be improved by serving whoever is easiest to reach rather than whoever is most in need. The recommendation is not to abandon it — it is useful — but to pair it with an outcome measure, even an imperfect one, so the mission is represented in the reporting.",
      },
    },
    {
      id: "vfm-league",
      heading: "Value for money and league tables",
      blocks: [
        {
          kind: "text",
          md: "**Value for money** is the not-for-profit substitute for the profit objective, assessed through the three Es. Each addresses a different stage, and an organisation can perform well on one while failing on another.",
        },
        {
          kind: "table",
          caption: "The three Es",
          head: ["E", "Question", "Measure", "Danger if pursued alone"],
          rows: [
            ["Economy", "Are inputs obtained at least cost?", "Cost per unit of input — price paid per hour, per item", "Cheap inputs of poor quality degrade the service"],
            ["Efficiency", "How much output per unit of input?", "Cases per caseworker, pupils per teacher, cost per treatment", "Throughput rises while outcomes worsen"],
            ["Effectiveness", "Are the objectives actually being achieved?", "Outcome measures — recovery rates, attainment, reoffending", "Hardest to measure, so it is the one omitted"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Effectiveness is the one that gets dropped",
          md: "Economy and efficiency are easy to measure and effectiveness is not, so measurement systems under pressure report the first two and quietly omit the third. The result is an organisation that demonstrably buys cheaply and processes quickly while nobody establishes whether it is achieving anything. A recommendation must include at least one effectiveness measure, and should acknowledge its imperfection rather than avoiding it.",
        },
        {
          kind: "text",
          md: "**League tables** rank comparable units — schools, hospitals, councils — publicly. Their intended effect is to create competitive pressure where no market exists, to inform users' choices, and to make performance transparent to funders. Their actual effects are more mixed, and the syllabus asks you to assess them.",
        },
        {
          kind: "table",
          caption: "League tables assessed",
          head: ["Argument for", "Argument against"],
          rows: [
            ["Creates pressure to improve where there is no market", "Encourages gaming — selecting easier cases, reclassifying outcomes, teaching to the measure"],
            ["Informs users choosing between providers", "Ignores the starting position; a school in a deprived area may add more value while ranking lower"],
            ["Makes performance visible to funders and the public", "Compresses complex, multi-dimensional performance into one rank"],
            ["Spreads good practice by identifying leaders", "Demoralises staff in units ranked low for reasons outside their control"],
            ["Increases accountability", "Diverts effort toward measured dimensions and away from unmeasured ones"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The value-added correction",
          md: "The strongest single criticism is that a raw ranking measures the intake rather than the institution. The standard remedy is a **value-added** measure — assessing the improvement from each unit's own starting point rather than its absolute result. Recommending that, rather than simply criticising league tables, is what turns the answer from commentary into advice.",
        },
      ],
      check: {
        q: "A regional health service scores highly on economy and efficiency but its patient outcomes are unremarkable. What does this suggest?",
        options: [
          "The service is performing well overall",
          "It is buying cheaply and processing quickly without demonstrating effectiveness — the third E is missing, and it is the one that establishes whether the objectives are actually being achieved",
          "The outcome data must be wrong",
          "Efficiency should be increased further",
        ],
        correct: 1,
        explain:
          "Economy and efficiency describe how resources are acquired and converted; only effectiveness asks whether the result was worth having. A service optimising the first two can process large numbers of patients cheaply while achieving little, which is precisely why value for money requires all three.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying a profit-based framework to a not-for-profit.", fix: "There is no single objective to resolve conflicts; value for money substitutes for it." },
    { trap: "Reporting outputs as though they were outcomes.", fix: "Count what changed, not only what was done — and pair the two." },
    { trap: "Omitting effectiveness because it is hard to measure.", fix: "Include an imperfect outcome measure and acknowledge its limitations." },
    { trap: "Criticising league tables without a remedy.", fix: "Recommend value-added measurement from each unit's own starting point." },
  ],
  keyTerms: [
    { term: "Value for money", def: "The not-for-profit performance objective, assessed as economy in acquiring inputs, efficiency in converting them and effectiveness in achieving outcomes." },
    { term: "Output", def: "What an organisation produced — meals delivered, patients treated — as distinct from the change that resulted." },
    { term: "Outcome", def: "The change achieved by the activity, which is what the mission is about and what resists measurement." },
    { term: "Value added measure", def: "An assessment of improvement from a unit's own starting point, correcting for differences in intake that raw league tables ignore." },
  ],
  summary: [
    "Multiple objectives with no exchange rate between them cannot be resolved arithmetically.",
    "Outputs are countable, outcomes are what matter — report at least one of the latter.",
    "Value for money needs all three Es, and effectiveness is the one routinely dropped.",
    "League tables create pressure and invite gaming; value-added measurement is the correction.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a not-for-profit's conflicting objectives not be resolved by a scorecard?", a: "There is no exchange rate between them — no calculation says how much research is worth a given amount of direct support — so the allocation is a judgement about values." },
    { q: "Which of the three Es is usually missing, and why does that matter?", a: "Effectiveness, because it is hardest to measure — and without it the organisation demonstrates cheap, fast processing without establishing that it achieved anything." },
    { q: "What is the main defect of a raw league table?", a: "It reflects the intake rather than the institution's contribution, which value-added measurement corrects." },
  ],
  furtherStudy: [
    "APM-04 covers the balanced scorecard and how its perspectives are reordered for a not-for-profit.",
    "APM-25 covers service businesses, which share the difficulty of measuring intangible output.",
    "APM-19 covers the gaming that public ranking reliably produces.",
  ],
}

const APM_TREE_27: StudyChapter = {
  paper: "APM",
  id: "APM-27",
  number: 27,
  area: "B",
  syllabusRefs: ["B4(g)", "B4(h)", "B4(i)"],
  title: "Complex structures, alliances and service level agreements",
  minutes: 17,
  intro:
    "When performance depends on organisations you do not control, measurement stops being an internal exercise and becomes a contractual one.",
  outcomes: [
    "Assess the problems of planning, controlling and measuring performance in complex structures",
    "Assess the performance management impact of alliances, joint ventures and complex supply chains",
    "Explain why shared accountability undermines conventional responsibility accounting",
    "Advise on the content of a service level agreement",
    "Advise on the implementation and ongoing management of a service level agreement",
  ],
  sections: [
    {
      id: "complexity",
      heading: "Why complex structures defeat conventional measurement",
      blocks: [
        {
          kind: "text",
          md: "Responsibility accounting assumes a clear boundary: this manager controls these resources and is accountable for these results. Complex structures dissolve that boundary — in a joint venture, control is shared; in a supply chain, the performance a customer experiences is produced by organisations with their own objectives and their own owners.",
        },
        {
          kind: "table",
          caption: "What breaks, and what to do about it",
          head: ["Problem", "Why it arises", "Response"],
          rows: [
            ["Shared accountability", "No single party controls the outcome", "Joint measures and shared incentives, with defined escalation"],
            ["Conflicting objectives", "Each partner optimises its own results", "Agree a small number of common measures before the arrangement starts"],
            ["Information asymmetry", "Partners hold data they need not share", "Contractual information rights, agreed definitions, shared systems"],
            ["Different accounting policies", "Figures are not comparable across partners", "Define the measure precisely, not just its name"],
            ["Divided loyalty", "Staff seconded to a venture answer to two employers", "Clear reporting lines and a single appraisal route"],
            ["Culture and distance", "Different norms about targets, escalation and bad news", "Explicit governance and regular joint review"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Measure the end-to-end outcome, not each party's part",
          md: "A supply chain where every party meets its own targets can still deliver badly to the customer, because the failures live in the **handovers** nobody owns. So the recommendation is a measure of the whole flow — total lead time from customer order to delivery, and total cost to serve — reported jointly and reviewed together. It is the same logic as process measurement in APM-24, applied across organisational boundaries.",
        },
      ],
      check: {
        q: "Every supplier in a company's chain reports meeting its individual delivery targets, yet customers experience persistent late delivery. What is the explanation?",
        options: [
          "The customers' expectations are unreasonable",
          "The delays are accumulating in the handovers between parties, which no individual target measures — the chain needs an end-to-end lead time measure owned jointly",
          "One supplier must be misreporting",
          "The individual targets should each be tightened",
        ],
        correct: 1,
        explain:
          "Individual compliance and collective failure coexist because the waiting between organisations belongs to nobody's measure. Tightening each party's own target attacks the wrong thing; measuring and owning the total elapsed time is what makes the gaps visible.",
      },
    },
    {
      id: "slas",
      heading: "Service level agreements",
      blocks: [
        {
          kind: "text",
          md: "A service level agreement converts an expectation into a defined, measurable commitment. The syllabus asks for advice on its **content**, its **implementation** and its **management**, so treat those as three separate parts of the answer.",
        },
        {
          kind: "table",
          caption: "What a service level agreement must contain",
          head: ["Element", "Why it is needed"],
          rows: [
            ["Services covered, and explicitly excluded", "Most disputes concern scope rather than standard"],
            ["Measurable service levels", "'Prompt response' is unenforceable; 'within four working hours' is"],
            ["Definitions", "When does the clock start and stop, and what counts as resolved?"],
            ["Measurement and reporting method", "Who measures, using whose system, reported how often"],
            ["Responsibilities of BOTH parties", "Suppliers commonly fail because the customer did not supply information or access"],
            ["Remedies and penalties", "Service credits or price adjustments where levels are missed"],
            ["Escalation and dispute resolution", "A route that does not depend on goodwill"],
            ["Review and change mechanism", "Requirements change; a fixed agreement becomes obsolete"],
            ["Term and exit provisions", "Including transition assistance and data return"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The measure will be met exactly as written",
          md: "A help desk contracted on 'calls answered within twenty seconds' will answer within twenty seconds — and may then transfer the caller and start a new clock. The syllabus theme of the previous chapters applies with contractual force here: specify the **outcome** (issue resolved on first contact), not just the responsiveness, and pair the measures so that the cheap route to compliance is closed.",
        },
        {
          kind: "list",
          style: "number",
          title: "Implementation and ongoing management",
          items: [
            "Agree the measures **before** the service transfers, and baseline current performance so the levels are realistic",
            "Ensure both parties can actually measure what has been agreed, from an agreed data source",
            "Name a relationship owner on each side, with authority to resolve issues without escalation",
            "Report jointly and regularly, against a shared definition, rather than each side keeping its own figures",
            "Hold periodic reviews covering the appropriateness of the levels, not merely compliance with them",
            "Use penalties sparingly — a supplier meeting the letter of a punitive agreement will do nothing beyond it",
          ],
        },
        {
          kind: "text",
          md: "That last point is a genuine judgement rather than a caution. Heavily penalised agreements produce **defensive** suppliers: effort goes into documenting compliance and disputing measurement rather than into service. Where the relationship matters over the long term, a smaller penalty combined with shared improvement targets and gain-sharing usually produces better service than a punitive regime — and recommending that, with the reason, is the commercial acumen the paper rewards.",
        },
      ],
      check: {
        q: "A service level agreement specifies that support calls must be answered within 30 seconds. Callers report that their problems still take days to resolve. What is the defect?",
        options: [
          "The 30-second target is too generous",
          "The agreement measures responsiveness rather than the outcome — it should specify resolution measures such as first-contact resolution and time to resolve, so answering quickly and achieving nothing stops being compliance",
          "The supplier is in breach of the agreement",
          "Support calls cannot be measured meaningfully",
        ],
        correct: 1,
        explain:
          "The supplier is complying exactly with what was written, which is the point: an agreement gets what it specifies. Adding outcome measures alongside the responsiveness one closes the gap between compliance and usefulness — the paired-measure principle applied contractually.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying responsibility accounting unchanged to a joint venture.", fix: "Control is shared, so measures and incentives must be joint." },
    { trap: "Measuring each party's own performance in a supply chain.", fix: "The failures are in the handovers — measure the end-to-end outcome." },
    { trap: "Specifying responsiveness in a service level agreement.", fix: "Specify the outcome too, or compliance and usefulness diverge." },
    { trap: "Recommending heavy penalties.", fix: "They produce defensive suppliers; pair modest remedies with shared improvement targets." },
  ],
  keyTerms: [
    { term: "Service level agreement", def: "A defined, measurable statement of the service to be provided, the responsibilities of both parties, and the remedies where levels are not met." },
    { term: "Service credit", def: "A financial remedy, usually a reduction in charges, applied where agreed service levels are missed." },
    { term: "End-to-end measure", def: "A measure of the complete flow across organisational boundaries, such as total lead time, which exposes losses in the handovers." },
  ],
  summary: [
    "Complex structures dissolve the control boundary responsibility accounting depends on.",
    "Where every party meets its own target and the customer is still failed, the losses are in the handovers.",
    "A service level agreement needs definitions, both parties' obligations, remedies, escalation and review.",
    "Specify outcomes as well as responsiveness, and prefer shared improvement to punitive penalties.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can every party in a supply chain meet its targets while the customer is failed?", a: "The waiting and losses occur in the handovers between organisations, which no individual party's measure covers." },
    { q: "What is the most common source of service level agreement disputes?", a: "Scope and definitions — what is included, and when the clock starts and stops — rather than the level of service itself." },
    { q: "Why can heavy penalties worsen service?", a: "They make suppliers defensive, so effort shifts to documenting compliance and disputing measurement rather than to improving the service." },
  ],
  furtherStudy: [
    "APM-24 covers process measurement, whose end-to-end logic this chapter extends across organisations.",
    "APM-19 covers why a contractual measure will be met exactly as written.",
    "APM-20 covers the value chain extending through suppliers and distributors.",
  ],
}

export const APM_TREE_AREA_B_PART2: StudyChapter[] = [APM_TREE_20, APM_TREE_21, APM_TREE_22, APM_TREE_23, APM_TREE_24, APM_TREE_25, APM_TREE_26, APM_TREE_27]
