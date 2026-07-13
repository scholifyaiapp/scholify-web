import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area A — The nature, source and purpose of management information:
 * cost accounting & cost classification.
 * Matches the FA_A exemplar for depth, tone and visual richness.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const MA_A: StudyChapter = {
  paper: "MA",
  area: "A",
  title: "Cost accounting & cost classification",
  minutes: 14,
  intro: "Financial accounting tells outsiders how the business did last year. Management accounting answers a harder question, in real time: what does this cost, and what should we do about it? Cost is where that story begins.",
  outcomes: [
    "Explain the purpose of management accounting and how it differs from financial accounting",
    "Classify costs as direct or indirect, product or period, and by function",
    "Describe how costs behave as activity changes — fixed, variable, semi-variable and stepped",
    "Split a semi-variable cost into its fixed and variable parts using the high-low method",
    "Distinguish cost units, cost centres, profit centres and investment centres, and judge whether information is good enough to act on",
  ],
  sections: [
    {
      id: "purpose",
      heading: "Why management accounting exists",
      blocks: [
        { kind: "text", md: "Picture the owner of a busy pizza place at the end of a Friday night. The till says takings were strong — but was tonight actually *worth it*? Which pizzas made money and which barely covered their cheese? Should she open on Mondays? Hire another driver? The annual financial statements will not help: they arrive months late, follow rules written for outsiders, and never tell her the cost of a single pizza. **Management accounting** is the toolkit built to answer exactly those questions." },
        { kind: "text", md: "Where **financial accounting** looks backwards for external users under a strict rulebook, management accounting looks **forwards** for the people running the business, in whatever format helps them **plan**, **control** and **decide**. No external standard governs it — a management report only has to be useful, timely and understood by its reader. That freedom is the point: the information bends to fit the decision." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two accountants, two jobs",
          caption: "Same underlying business — completely different information needs.",
          data: {
            leftTitle: "Financial accounting",
            rightTitle: "Management accounting",
            rows: [
              { aspect: "Audience", left: "External users (investors, lenders)", right: "Internal managers" },
              { aspect: "Time focus", left: "Backward-looking, historical", right: "Forward-looking (budgets, forecasts)" },
              { aspect: "Rules", left: "Governed by IFRS & law", right: "No external rules — just usefulness" },
              { aspect: "Frequency", left: "Usually annual", right: "As often as decisions need it" },
              { aspect: "Detail", left: "Whole-business totals", right: "Per product, department, unit" },
              { aspect: "Purpose", left: "Stewardship & accountability", right: "Planning, control, decision-making" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Management accounting turns raw operational data into **information a manager can act on** — costs, forecasts and comparisons that guide the next decision, not just report on the last one." },
        { kind: "text", md: "That work happens in a loop: managers **plan** (set a target or budget), the business operates, they **record** what actually happened, then they **control** by comparing actual against plan and acting on the gap. Costing feeds every stage — you cannot budget, price or investigate a variance without first knowing what things cost." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The planning-and-control loop",
          caption: "Costing information flows through every step.",
          data: {
            steps: [
              { label: "Plan", sub: "Set budgets & targets" },
              { label: "Operate", sub: "Run the business" },
              { label: "Record", sub: "Capture actual costs" },
              { label: "Control", sub: "Compare & act on the gap" },
            ],
          },
        } },
      ],
    },
    {
      id: "classify",
      heading: "Classifying costs — three lenses",
      blocks: [
        { kind: "text", md: "A cost is just money spent, but a single figure like \"$40,000 of wages\" is useless until you say *what kind* of cost it is. Managers classify the same costs three different ways depending on the question they are asking. The trick is that one cost can wear several labels at once." },
        { kind: "text", md: "**Lens 1 — direct or indirect.** A **direct cost** can be traced in full to one cost unit (one product or job): the flour in a loaf, the wages of the baker while baking it. An **indirect cost** — also called **overhead** — is shared across many units and cannot be traced to just one: the bakery's rent, the manager's salary, the electricity for the whole shop. Direct costs added together give **prime cost**." },
        { kind: "text", md: "**Lens 2 — product or period.** A **product cost** attaches to the goods themselves and sits in inventory until the goods are sold (all the manufacturing costs). A **period cost** is charged in full to the period in which it arises, whether or not anything sells — typically the non-production costs like administration and selling. This split decides *when* a cost hits profit." },
        { kind: "text", md: "**Lens 3 — by function.** Grouping costs by the part of the business that causes them: **production**, **administration**, **selling & distribution**, and **finance**. This is how a cost statement is laid out and how responsibility is assigned." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Building up the cost of a product",
          caption: "Direct costs form prime cost; add production overhead for total production cost.",
          data: {
            steps: [
              { label: "Direct materials", sub: "traced to the unit" },
              { label: "+ Direct labour", sub: "= Prime cost" },
              { label: "+ Production overhead", sub: "= Total production cost" },
              { label: "+ Non-production cost", sub: "= Total cost" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — classify the costs of a bakery", scenario: "Rosa runs a small bakery that makes bread to sell in her shop. For last month she lists: (1) flour used in the loaves $6,000; (2) wages of bakers mixing and baking $9,000; (3) rent of the bakery premises $3,000; (4) salary of the shop's sales assistant $1,800; (5) delivery van fuel $700. Classify each cost by traceability (direct/indirect) and by function.", steps: [
          { label: "Flour $6,000", detail: "Traceable to the loaves → **direct material**. Function: production. It is a **product cost**." },
          { label: "Bakers' wages $9,000", detail: "Traceable to making the product → **direct labour**, production function. Product cost. (Flour + bakers = prime cost $15,000.)" },
          { label: "Bakery rent $3,000", detail: "Needed to make the bread but shared across all loaves → **indirect** (production **overhead**). Still a product cost." },
          { label: "Sales assistant $1,800", detail: "Not part of making the product → **indirect**, selling function. It is a **period cost** — charged in full this month." },
          { label: "Van fuel $700", detail: "Getting goods to customers → **indirect**, distribution function. Period cost." },
        ], result: "Prime cost = $15,000 (flour + bakers). Total production cost = $18,000 (prime + $3,000 rent). Selling & distribution period costs = $2,500. The same $20,500 spend answers different questions depending on which lens you use." },
        { kind: "callout", tone: "warn", title: "Watch the wording", md: "\"Direct\" is about **traceability**, not size. A huge rent bill is still an **indirect** cost because it cannot be traced to one unit; a few cents of glue in a chair might technically be direct but is often treated as indirect for convenience (an **indirect material**)." },
      ],
    },
    {
      id: "behaviour",
      heading: "How costs behave as activity changes",
      blocks: [
        { kind: "text", md: "The most powerful cost lens of all is **behaviour**: what happens to a cost when the level of activity — units made, hours worked, meals served — goes up or down. Get this right and budgeting, break-even and decision-making all follow. There are four patterns." },
        { kind: "text", md: "A **variable cost** changes **in total** in direct proportion to activity, but stays **constant per unit**. Make one more loaf and you use one more portion of flour. A **fixed cost** stays the same **in total** regardless of activity within a given range — the rent is $3,000 whether you bake 10 loaves or 10,000 — so the fixed cost **per unit falls** as output rises (it is spread over more units)." },
        { kind: "table", caption: "The two building-block behaviours", head: ["", "As activity rises", "Cost in total", "Cost per unit"], rows: [
          ["Variable cost", "e.g. materials", "Rises proportionally", "Constant"],
          ["Fixed cost", "e.g. rent", "Stays flat", "Falls"],
        ] },
        { kind: "text", md: "Most real costs are a blend. A **semi-variable** (mixed) cost has a fixed base plus a variable top — a phone contract with a $20 line rental plus $0.10 per call, or a maintenance charge with a standing fee plus a per-hour element. A **stepped fixed** cost is fixed over a range but jumps to a new level once you cross a threshold: one supervisor can handle up to 20 staff, but a 21st worker forces you to hire a second supervisor — the cost steps up." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Total cost at rising output — a semi-variable cost",
          caption: "$4,000 fixed base plus $2 per unit. The bars rise by a constant $2,000 per 1,000 units, but never start at zero.",
          data: {
            unit: "$",
            items: [
              { label: "0 units", value: 4000 },
              { label: "1,000", value: 6000 },
              { label: "2,000", value: 8000 },
              { label: "3,000", value: 10000 },
              { label: "4,000", value: 12000 },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Test whether a cost is fixed or variable by asking of the **total**, not the per-unit figure: \"if activity doubled, would this total change?\" Materials → yes (variable). Rent → no (fixed). The per-unit view flips the intuition, which is exactly why exams test it." },
      ],
      check: {
        q: "A factory's rent is $60,000 a year and it makes 20,000 units. If output rises to 30,000 units next year (same premises), what happens to the rent per unit?",
        options: [
          "It stays at $3.00 per unit because rent is a cost of production",
          "It rises because more units are being made",
          "It falls from $3.00 to $2.00 per unit as the fixed cost is spread wider",
          "It becomes a variable cost once output rises",
        ],
        correct: 2,
        explain: "Rent is a fixed cost: the total stays $60,000. Per unit it was $60,000 / 20,000 = $3.00; at 30,000 units it is $60,000 / 30,000 = $2.00. Fixed cost total is unchanged, but the per-unit figure falls as output rises — it does not become variable.",
      },
    },
    {
      id: "highlow",
      heading: "Splitting a semi-variable cost — the high-low method",
      blocks: [
        { kind: "text", md: "To budget or make decisions you often need a semi-variable cost broken into its **fixed** and **variable** parts — but the invoice only ever shows the combined total. The **high-low method** estimates the split from just two data points: the periods with the **highest** and **lowest** activity. The logic is that the *only* reason total cost differs between those two points is the variable element, because the fixed part is the same in both." },
        { kind: "formula", name: "High-low method", expr: "Variable cost per unit = (Cost at highest − Cost at lowest) ÷ (Units at highest − Units at lowest)", note: "Then find fixed cost by substituting back: Fixed cost = Total cost at either point − (Variable cost per unit × units at that point)." },
        { kind: "callout", tone: "rule", title: "Pick by activity, not by cost", md: "Always choose the highest and lowest **activity levels** (units/hours), not the highest and lowest **costs**. They usually coincide, but if a question gives you data where they do not, the activity level wins every time." },
        { kind: "example", title: "Worked example — split the maintenance cost", scenario: "A factory's monthly maintenance cost is semi-variable. Over six months the highest activity was 8,000 machine-hours costing $52,000, and the lowest was 3,000 machine-hours costing $27,000. Estimate the variable cost per hour and the monthly fixed cost, then predict the cost of a month running 6,000 hours.", steps: [
          { label: "Find the change", detail: "Cost difference = $52,000 − $27,000 = $25,000. Activity difference = 8,000 − 3,000 = 5,000 hours." },
          { label: "Variable cost per hour", detail: "$25,000 ÷ 5,000 hours = **$5 per machine-hour**. This is the slope of the cost line." },
          { label: "Fixed cost (substitute at the high point)", detail: "Fixed = $52,000 − ($5 × 8,000) = $52,000 − $40,000 = **$12,000 per month**." },
          { label: "Check at the low point", detail: "$27,000 − ($5 × 3,000) = $27,000 − $15,000 = $12,000. Same fixed figure → the split is consistent." },
          { label: "Predict 6,000 hours", detail: "Total = fixed + variable = $12,000 + ($5 × 6,000) = $12,000 + $30,000 = **$42,000**." },
        ], result: "The cost splits into $12,000 fixed per month plus $5 per machine-hour, giving a predicted $42,000 for a 6,000-hour month. Now the manager can budget any activity level." },
        { kind: "callout", tone: "warn", title: "Its weakness", md: "High-low uses only **two** points and ignores everything in between, so a single unusual month distorts the answer. It also assumes the cost is neatly linear and that fixed cost never steps up over the range. Useful and quick — but a rough estimate, not gospel." },
      ],
      check: {
        q: "A cost is $18,000 at 2,000 units and $30,000 at 5,000 units. Using the high-low method, what is the fixed cost?",
        options: [
          "$4,000",
          "$10,000",
          "$12,000",
          "$18,000",
        ],
        correct: 1,
        explain: "Variable cost per unit = ($30,000 − $18,000) ÷ (5,000 − 2,000) = $12,000 ÷ 3,000 = $4 per unit. Fixed = $30,000 − ($4 × 5,000) = $30,000 − $20,000 = $10,000. (Check at the low point: $18,000 − ($4 × 2,000) = $18,000 − $8,000 = $10,000.) So the fixed cost is $10,000.",
      },
    },
    {
      id: "centres",
      heading: "Cost units, cost centres and information quality",
      blocks: [
        { kind: "text", md: "To collect costs you need somewhere to collect them *to*. Management accounting builds a structure of \"buckets\" so that every cost lands somewhere a manager is responsible for." },
        { kind: "text", md: "A **cost unit** is the single thing whose cost you want to measure — one loaf, one patient-day in a hospital, one passenger-mile for an airline, one billable hour for a consultancy. It is the unit the whole system is trying to cost. A **cost centre** is a location, function or activity that costs are *gathered into* — a department, a machine, a canteen. The centre's manager is accountable for the **costs** incurred there, and nothing more." },
        { kind: "text", md: "Give a manager control over more than costs and the centre changes name. A **profit centre** manager controls costs **and revenues**, so is judged on **profit** (a shop branch that both spends and sells). An **investment centre** manager controls costs, revenues **and the capital invested** in the division, so is judged on the **return** earned on that investment. Each is a wider circle of responsibility than the last." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Responsibility centres — widening control",
          caption: "Each centre adds one more thing the manager is accountable for.",
          data: {
            leftTitle: "The manager controls…",
            rightTitle: "…and is judged on",
            rows: [
              { aspect: "Cost centre", left: "Costs only", right: "Cost / cost per unit" },
              { aspect: "Profit centre", left: "Costs + revenues", right: "Profit earned" },
              { aspect: "Investment centre", left: "Costs + revenues + capital", right: "Return on investment" },
            ],
          },
        } },
        { kind: "text", md: "Finally, none of this helps if the numbers are poor. There is a difference between **data** (raw, unprocessed facts — a till roll) and **information** (data organised so a decision can be made — this week's profit by product). Good information shares recognisable qualities, often remembered as **ACCURATE**: it should be **A**ccurate, **C**omplete, **C**ost-effective (worth more than it costs to produce), **U**nderstandable, **R**elevant to the decision, **A**uthoritative (from a reliable source), **T**imely, and **E**asy to use. Miss these and a manager is deciding on noise." },
        { kind: "callout", tone: "tip", md: "Two qualities quietly dominate exam scenarios: **relevance** (information no manager will act on is worthless, however accurate) and **cost-effectiveness** (chasing 100% precision on a trivial figure can cost more than the decision is worth). Good enough, on time, beats perfect, too late." },
      ],
      check: {
        q: "The manager of a division controls its costs, its sales revenue AND decisions about the capital invested in new machinery. The division is best described as a:",
        options: [
          "Cost centre",
          "Profit centre",
          "Investment centre",
          "Cost unit",
        ],
        correct: 2,
        explain: "Control over costs and revenues alone would make it a profit centre. Because the manager also controls the capital invested, the division is an investment centre — judged on the return it earns on that investment, not just the profit it makes.",
      },
    },
  ],
  examTraps: [
    { trap: "Thinking 'direct' means 'large' and 'indirect' means 'small'.", fix: "It is about traceability, not size. A cost is direct only if it can be traced in full to one cost unit; a huge shared rent bill is still indirect." },
    { trap: "Judging a cost as fixed or variable from its per-unit figure.", fix: "Test the TOTAL. Fixed costs are flat in total but fall per unit; variable costs rise in total but stay constant per unit." },
    { trap: "Picking the high and low points by cost instead of by activity.", fix: "High-low uses the highest and lowest ACTIVITY levels. Read off the units/hours first, then take the costs that go with them." },
    { trap: "Calling any decentralised division a 'profit centre'.", fix: "Cost centre = costs only. Profit centre = costs + revenues. Investment centre = costs + revenues + capital invested. Match the label to what the manager actually controls." },
    { trap: "Confusing management and financial accounting from a keyword.", fix: "'Budget', 'forecast', 'per unit', 'variance', 'internal' → management accounting. 'IFRS', 'annual report', 'shareholders', 'published' → financial accounting." },
  ],
  keyTerms: [
    { term: "Direct cost", def: "A cost that can be traced in full to a single cost unit (e.g. direct materials, direct labour). Direct costs summed give prime cost." },
    { term: "Indirect cost (overhead)", def: "A cost shared across many cost units that cannot be traced to just one — e.g. factory rent, supervisors' salaries." },
    { term: "Semi-variable cost", def: "A mixed cost with a fixed base plus a variable element that rises with activity, split using the high-low method." },
    { term: "High-low method", def: "A technique that estimates the variable cost per unit and fixed cost of a semi-variable cost from the highest and lowest activity periods." },
    { term: "Cost centre", def: "A location, function or activity into which costs are gathered and for which a manager is accountable for costs only." },
  ],
  summary: [
    "Management accounting serves internal managers, looks forward, follows no external rules, and exists to support planning, control and decisions.",
    "Costs are classified three ways: direct vs indirect (traceability), product vs period (when they hit profit), and by function.",
    "Cost behaviour has four patterns — variable (constant per unit), fixed (flat in total, falling per unit), semi-variable (a blend) and stepped fixed.",
    "The high-low method splits a semi-variable cost: variable cost/unit = (cost@high − cost@low) ÷ (units@high − units@low), then fixed cost by substitution.",
    "Costs collect into cost units and cost/profit/investment centres by widening responsibility; and information must be ACCURATE — relevant, timely and worth its cost — to be worth acting on.",
  ],
}
