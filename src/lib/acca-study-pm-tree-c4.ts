import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area C, fourth part — pricing decisions, and make-or-buy and other short-term
 * decisions.
 * Chapters 17–18 of the PM reading tree, mapped to syllabus groups C4–C5.
 *
 * Chapter 17 carries the two formulas the exam PROVIDES on its formulae sheet — the demand
 * function and marginal revenue — which changes what is being tested: not recall but correct
 * derivation of `a` and `b` from the scenario, and knowing that profit is maximised where MR
 * = MC rather than where revenue or contribution per unit is highest.
 *
 * Chapter 18's make-or-buy section is where the scarce-resource twist lives: with a
 * constraint the decision is NOT "buy whatever is cheaper to buy", it is "buy whatever costs
 * least extra per unit of the scarce resource released", which reverses some rankings.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 17 · C4(a)–(c) ───────────────────────────────────── */

export const PM_TREE_17: StudyChapter = {
  id: "PM-17",
  number: 17,
  paper: "PM",
  area: "C",
  title: "Demand, elasticity and the profit-maximising price",
  minutes: 18,
  syllabusRefs: ["C4(a)", "C4(b)", "C4(c)"],
  intro:
    "Every price change trades margin against volume. The profit-maximising price is the one where the last unit's extra revenue exactly equals its extra cost — which is almost never the price that maximises revenue, and never the one that maximises margin per unit.",
  outcomes: [
    "Derive a demand function from two price/quantity observations",
    "Calculate marginal revenue and find the profit-maximising price and quantity",
    "Calculate and interpret price elasticity of demand",
    "Explain how elasticity affects the revenue consequence of a price change",
    "Identify the factors influencing a pricing decision",
  ],
  sections: [
    {
      id: "demand-and-mr",
      heading: "The demand function and marginal revenue",
      blocks: [
        {
          kind: "formula",
          name: "Demand and marginal revenue — both provided in the exam",
          expr: "P  =  a  −  bQ\n\nwhere  b  =  change in price  ÷  change in quantity\nand    a  =  the price at which demand would be zero\n\nMR  =  a  −  2bQ\n\nProfit is maximised where  MR  =  MC",
          note: "Both formulas are on the exam formulae sheet, so the marks are in USING them. Note b is expressed as a POSITIVE number in these formulas because the minus sign is already in P = a − bQ. Find b first from the two observations, then find a by substituting one observation back in. MC is the marginal COST — the variable cost per unit, so it excludes fixed cost entirely.",
        },
        {
          kind: "list",
          style: "number",
          title: "The method, in the order that works",
          items: [
            "**Find b** from the two price/quantity pairs: the change in price divided by the change in quantity, as a positive figure.",
            "**Find a** by substituting either pair into P = a − bQ and solving.",
            "**Write MR = a − 2bQ.**",
            "**Set MR = MC** and solve for Q. MC is the variable cost per unit — never include fixed cost.",
            "**Substitute Q back into P = a − bQ** to get the profit-maximising price.",
            "**Compute the profit** if asked: (P − variable cost) × Q, less fixed costs.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Where b goes wrong",
          md: "Two slips account for most lost marks. The first is computing b **per unit of the wrong step size**: if demand rises by 500 units for every £2 price reduction, b is 2 ÷ 500 = **0.004**, not 2 and not 500. The second is forgetting that b must be expressed **per single unit** of quantity — a scenario often states the relationship in batches or thousands, and b must be scaled to match the units Q is measured in. Check by substituting your a and b back into both original observations: if they do not reproduce both prices, b is wrong.",
        },
        {
          kind: "example",
          title: "Finding the profit-maximising price",
          scenario:
            "Ashwell Ltd currently sells 8,000 units a month at £52. Market research shows that for every £3 reduction in price, monthly demand rises by 1,500 units. Variable cost is £22 a unit and monthly fixed costs are £180,000. The marketing director suggests cutting the price to £40 to \"maximise revenue\". The board asks for the profit-maximising price instead.",
          steps: [
            { label: "Find b", detail: "b = change in price / change in quantity = £3 / 1,500 units = £0.002 per unit. Note it is per SINGLE unit, not per 1,500." },
            { label: "Find a", detail: "Substitute the known point (P = 52, Q = 8,000) into P = a − bQ: 52 = a − 0.002(8,000) = a − 16, so a = £68. Sense-check: at a price of £68 demand would be zero." },
            { label: "Write MR and set it equal to MC", detail: "MR = a − 2bQ = 68 − 0.004Q. MC is the variable cost of £22. Setting MR = MC: 68 − 0.004Q = 22, so 0.004Q = 46 and Q = 11,500 units." },
            { label: "Find the profit-maximising price", detail: "P = 68 − 0.002(11,500) = 68 − 23 = £45 per unit." },
            { label: "Compute the resulting profit", detail: "Contribution = (£45 − £22) × 11,500 = £23 × 11,500 = £264,500. Less fixed costs £180,000 = profit £84,500. Compare the current position: (£52 − £22) × 8,000 = £240,000 − £180,000 = £60,000. So the price cut to £45 raises profit by £24,500." },
            { label: "Test the marketing director's £40 suggestion", detail: "At £40: Q = (68 − 40)/0.002 = 14,000 units. REVENUE = £560,000, which is indeed higher than £45 × 11,500 = £517,500 — so £40 does generate more revenue. But contribution = (£40 − £22) × 14,000 = £252,000, giving profit of £72,000. So maximising REVENUE costs £12,500 of PROFIT, which is the distinction the board was right to insist on." },
          ],
          result:
            "The profit-maximising price is **£45** at 11,500 units, giving profit of **£84,500**. The marketing director's £40 genuinely does maximise revenue — and loses **£12,500 of profit** doing it, which is why revenue maximisation and profit maximisation are different objectives.",
        },
      ],
      check: {
        q: "Demand rises by 400 units for every £5 price reduction. What is b in P = a − bQ?",
        options: ["5", "400", "0.0125", "80"],
        correct: 2,
        explain:
          "0.0125 — the change in price divided by the change in quantity, £5/400. It must be expressed per SINGLE unit of Q. Answering 5 or 400 uses one figure alone, and 80 inverts the division (400/5).",
      },
    },
    {
      id: "elasticity",
      heading: "Price elasticity of demand",
      blocks: [
        {
          kind: "formula",
          name: "Price elasticity of demand",
          expr: "PED  =  percentage change in quantity demanded  ÷  percentage change in price\n\nInterpretation (ignoring the minus sign):\n  PED  >  1   demand is ELASTIC     — quantity responds more than proportionately\n  PED  <  1   demand is INELASTIC   — quantity responds less than proportionately\n  PED  =  1   unit elasticity        — revenue is unchanged by a price change",
          note: "PED is normally NEGATIVE, because price and quantity move in opposite directions — so it is conventionally quoted as an absolute value and the sign ignored. Take care with the base used for the percentages: use the ORIGINAL price and quantity unless the question asks for arc elasticity, which uses the midpoint.",
        },
        {
          kind: "table",
          caption: "What elasticity tells you to do",
          head: ["If demand is…", "A price INCREASE…", "A price DECREASE…", "So…"],
          rows: [
            ["**Elastic** (PED > 1)", "**Reduces** total revenue — volume falls more than proportionately", "**Increases** total revenue", "Compete on price; a cut can pay for itself"],
            ["**Inelastic** (PED < 1)", "**Increases** total revenue — volume falls less than proportionately", "**Reduces** total revenue", "Raise price; a cut simply gives margin away"],
            ["**Unit elastic** (PED = 1)", "Leaves revenue unchanged", "Leaves revenue unchanged", "Revenue is at its maximum here"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Revenue is not profit, and elasticity only speaks to revenue",
          md: "The table above is about **revenue**, and the exam exploits the gap. A price cut in elastic demand raises revenue, but it also raises **volume-related variable cost**, so profit may still fall — the profit test is always MR = MC, not elasticity. Conversely, with **inelastic** demand a price rise increases revenue **and** reduces volume, so variable cost falls too and profit rises on both counts. So the honest statement is that elasticity indicates the **direction** worth exploring and MR = MC decides.",
        },
        {
          kind: "list",
          title: "What makes demand elastic or inelastic",
          items: [
            "**Availability of substitutes** — the single biggest factor. Many close substitutes means elastic demand.",
            "**Necessity** — essentials are inelastic, discretionary purchases elastic.",
            "**Proportion of income** the purchase represents: a large purchase is scrutinised, so demand is more elastic.",
            "**Brand strength and loyalty**, which makes demand less elastic and is precisely what marketing spend buys.",
            "**Time horizon** — demand is usually more elastic in the long run, because buyers can find alternatives.",
            "**Whether the buyer pays** — demand is inelastic where a third party pays, as with much insurance-funded or employer-funded purchasing.",
          ],
        },
        {
          kind: "table",
          caption: "The factors influencing a pricing decision, beyond the arithmetic",
          head: ["Factor", "How it bears on price"],
          rows: [
            ["**Demand and elasticity**", "Sets the ceiling and how much volume responds"],
            ["**Cost**", "Sets the floor in the long run, though relevant cost sets a lower short-run floor (chapter 11)"],
            ["**Competitors**", "Their prices, capacity and likely reaction — a price cut that triggers a price war leaves everyone worse off"],
            ["**Life-cycle stage**", "Skimming at introduction, competitive pricing at maturity (chapter 7)"],
            ["**Quality signalling**", "Price is read as a quality signal, so a low price can reduce demand for a premium product"],
            ["**Legal and regulatory limits**", "Price controls, competition law on predatory pricing and price fixing"],
            ["**Strategic objectives**", "Market share, deterring entry, or supporting sales of a complementary product"],
          ],
        },
      ],
      check: {
        q: "Demand is inelastic. What happens to total revenue if price is increased?",
        options: [
          "It falls, because volume falls",
          "It rises, because volume falls less than proportionately",
          "It is unchanged",
          "It cannot be determined without knowing variable cost",
        ],
        correct: 1,
        explain:
          "It RISES. Inelastic means quantity responds LESS than proportionately, so the price gain outweighs the volume loss. Profit rises on both counts here, since lower volume also cuts variable cost — but note elasticity speaks to REVENUE, and the profit test is always MR = MC.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Setting b equal to the price change or the quantity change.",
      fix: "b is price change DIVIDED BY quantity change, expressed per single unit of Q.",
    },
    {
      trap: "Including fixed cost in MC.",
      fix: "MC is the variable cost per unit. Fixed cost does not vary with output, so it cannot affect the optimal price.",
    },
    {
      trap: "Maximising revenue and calling it profit maximisation.",
      fix: "Revenue maximises where MR = 0; profit maximises where MR = MC. The two prices differ.",
    },
    {
      trap: "Concluding from elastic demand that a price cut raises profit.",
      fix: "Elasticity speaks to REVENUE. Extra volume brings extra variable cost, so test with MR = MC.",
    },
    {
      trap: "Forgetting to substitute Q back to find the price.",
      fix: "MR = MC gives QUANTITY. The price comes from putting that Q into P = a − bQ.",
    },
  ],
  keyTerms: [
    { term: "Demand function", def: "P = a − bQ, where b is the price change per unit of quantity change and a the price at which demand is zero." },
    { term: "Marginal revenue", def: "MR = a − 2bQ, the revenue from one more unit." },
    { term: "Marginal cost", def: "The variable cost of one more unit; fixed cost is excluded." },
    { term: "Profit-maximising output", def: "Where MR = MC; the price then follows from the demand function." },
    { term: "Price elasticity of demand", def: "Percentage change in quantity divided by percentage change in price, quoted as an absolute value." },
    { term: "Elastic demand", def: "PED above 1, so a price cut raises total revenue." },
    { term: "Inelastic demand", def: "PED below 1, so a price rise raises total revenue." },
  ],
  summary: [
    "Find b as the price change divided by the quantity change per single unit, then a by substitution.",
    "Profit is maximised where MR = MC, with MC being variable cost only.",
    "MR = MC gives quantity; the price comes from substituting back into the demand function.",
    "Elastic demand means a price cut raises revenue; inelastic means a price rise does.",
    "Elasticity indicates direction but only MR = MC determines the profit-maximising price.",
  ],
  knowledgeDiagnostic: [
    { q: "How is b derived, and what is the commonest error?", a: "Price change divided by quantity change, expressed per single unit of Q — the errors are using one figure alone or failing to scale it to single units." },
    { q: "Why is fixed cost excluded from MC?", a: "Because it does not vary with output, so it cannot affect which output level maximises profit." },
    { q: "Where does revenue maximise, and how does that differ from profit?", a: "Revenue maximises where MR = 0; profit where MR = MC. Since MC is positive, the profit-maximising output is lower and the price higher." },
    { q: "What does elasticity tell you and what does it not?", a: "It tells you the direction of the revenue effect of a price change; it does not determine profit, because extra volume brings extra variable cost." },
  ],
}

/* ── Chapter 18 · C4(d), C5 ───────────────────────────────────── */

export const PM_TREE_18: StudyChapter = {
  id: "PM-18",
  number: 18,
  paper: "PM",
  area: "C",
  title: "Pricing strategies, make-or-buy and other short-term decisions",
  minutes: 18,
  syllabusRefs: ["C4(d)", "C5(a)", "C5(b)", "C5(c)"],
  intro:
    "The arithmetic of a short-term decision is nearly always a relevant cost comparison. What makes these questions hard is that a scarce resource reverses the ranking, and that the qualitative factors frequently outweigh the numbers.",
  outcomes: [
    "Explain the principal pricing strategies and when each applies",
    "Apply relevant costing to a make-or-buy decision",
    "Rank make-or-buy choices where a resource is scarce",
    "Apply relevant costing to shutdown, further processing and special order decisions",
    "Identify the qualitative factors bearing on each decision",
  ],
  sections: [
    {
      id: "strategies",
      heading: "The pricing strategies",
      blocks: [
        {
          kind: "table",
          caption: "The strategies the syllabus expects",
          head: ["Strategy", "What it is", "When it suits"],
          rows: [
            ["**Market skimming**", "A high initial price, reduced over time", "A genuinely new product, inelastic early demand, high development cost to recover, and barriers that delay competitors"],
            ["**Market penetration**", "A low initial price to build volume and share quickly", "Elastic demand, economies of scale or a learning effect (chapter 22), and a desire to deter entrants. Justified by life-cycle costing (chapter 7)"],
            ["**Price discrimination**", "Different prices to different segments for essentially the same product", "Segments can be kept apart — by time, place, age, or product version — and have different elasticities. Rail fares and cinema pricing"],
            ["**Product-line pricing**", "Prices set across a range together rather than individually", "Products are complements or substitutes within the range, so a price change affects the others"],
            ["**Complementary and loss-leader pricing**", "A low price on one product to drive sales of a profitable other", "Razors and blades, printers and cartridges. The loss on the first must be recovered on the second"],
            ["**Product bundling**", "Several products sold together for less than the sum of their prices", "Spare capacity, and customers valuing the components differently — the bundle captures more total value"],
            ["**Volume discounting**", "Lower unit prices for larger quantities", "Where the discount is covered by lower cost per unit or by the value of a committed volume"],
            ["**Psychological pricing**", "£9.99 rather than £10; or a high price as a quality signal", "Consumer markets, and premium positioning where a low price would harm perceived quality"],
            ["**Cost-plus pricing**", "Full cost or marginal cost plus a mark-up", "Simple and defensible, common in contracting and regulated industries — but it ignores demand entirely, which is its fatal weakness"],
            ["**Relevant cost pricing**", "Price at or above relevant cost (chapter 11)", "A one-off order with spare capacity. Not sustainable as a general policy, since fixed costs would never be recovered"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The weakness of cost-plus, stated properly",
          md: "Cost-plus pricing is popular because it is simple, defensible to a customer and guarantees a margin on paper. Its weakness is that it is **circular and demand-blind**. Circular, because the full cost per unit depends on volume, and volume depends on price — so the cost used to set the price was computed at a volume that the price will not produce. Demand-blind, because it never asks what customers would pay: it will underprice a product with inelastic demand and overprice one facing competition, losing margin in the first case and volume in the second. That is exactly the criticism **target costing** (chapter 6) is built to answer.",
        },
      ],
      check: {
        q: "A company launches a genuinely novel product with high development costs and no immediate competitors. Which pricing strategy fits?",
        options: [
          "Market penetration",
          "Market skimming",
          "Loss-leader pricing",
          "Cost-plus pricing",
        ],
        correct: 1,
        explain:
          "MARKET SKIMMING — a high initial price falling over time, which suits a novel product with inelastic early demand, high development cost to recover, and barriers delaying competitors. Penetration is the opposite case: elastic demand, scale economies, and a wish to deter entry.",
      },
    },
    {
      id: "make-or-buy",
      heading: "Make-or-buy, with and without a constraint",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The rule with no constraint, and the rule with one",
          md: "**Without a scarce resource** the comparison is simple: make in-house if the **variable cost of making** is below the **buy-in price**, since fixed costs are unaffected either way. **With a scarce resource** the question changes entirely. Everything cannot be made, so something must be bought in, and the right thing to buy in is whatever wastes **least** of the scarce resource — that is, the component with the **lowest extra cost of buying per unit of scarce resource released**. Ranking by the raw saving per component gets this wrong.",
        },
        {
          kind: "formula",
          name: "Make-or-buy with a limiting factor",
          expr: "Extra cost of buying per unit  =  Buy-in price  −  Variable cost of making\n\nExtra cost per unit of scarce resource saved  =  Extra cost of buying per unit  ÷  Scarce resource used per unit if made\n\nThen: BUY IN the components with the LOWEST figure first, until the scarce resource is sufficient for the rest.",
          note: "Note this is a MINIMISATION — the opposite direction to chapter 14's ranking, because here the aim is to waste as little as possible rather than to earn as much as possible. It is the same underlying logic: value the decision per unit of whatever is scarce.",
        },
        {
          kind: "example",
          title: "A make-or-buy decision under a constraint",
          scenario:
            "Fladbury Ltd makes four components in-house, all using the same specialist machine, of which only 4,000 hours are available next quarter. Per unit: component W costs £18 variable to make, buys in at £26, uses 0.4 machine hours; X costs £30 to make, buys in at £42, uses 1.2 hours; Y costs £12 to make, buys in at £15, uses 0.5 hours; Z costs £44 to make, buys in at £53, uses 1.0 hour. Quarterly requirements are 2,000 W, 1,500 X, 3,000 Y and 1,800 Z. Fixed costs are unaffected by the decision.",
          steps: [
            { label: "Check the machine binds", detail: "Hours to make everything: W 2,000 × 0.4 = 800; X 1,500 × 1.2 = 1,800; Y 3,000 × 0.5 = 1,500; Z 1,800 × 1.0 = 1,800. Total 5,900 hours against 4,000 available — a shortfall of 1,900 hours, so some components must be bought in." },
            { label: "Extra cost of buying each component", detail: "W: £26 − £18 = £8. X: £42 − £30 = £12. Y: £15 − £12 = £3. Z: £53 − £44 = £9. On this alone Y looks the obvious one to buy — which is the trap." },
            { label: "Extra cost per machine hour saved", detail: "W: £8/0.4 = £20.00. X: £12/1.2 = £10.00. Y: £3/0.5 = £6.00. Z: £9/1.0 = £9.00. Ranking for BUYING IN, cheapest first: Y at £6, then Z at £9, then X at £10, then W at £20." },
            { label: "Buy in until the hours suffice", detail: "Buy all 3,000 Y: saves 1,500 hours, but 1,900 are needed — 400 hours short. Next is Z at £9: buy 400 units of Z (400 × 1.0 hour) to release the remaining 400 hours." },
            { label: "State the plan", detail: "MAKE: 2,000 W (800 hrs), 1,500 X (1,800 hrs), 1,400 Z (1,400 hrs) = 4,000 hours exactly. BUY IN: all 3,000 Y and 400 Z." },
            { label: "Cost the extra spend, and note the trap avoided", detail: "Extra cost = (3,000 × £3) + (400 × £9) = £9,000 + £3,600 = £12,600. Had Fladbury ranked by extra cost per UNIT it would still have bought Y first but then chosen W at £8 rather than Z at £9 — and W releases only 0.4 hours a unit, so it would have needed 1,000 units of W costing £8,000 to release 400 hours, against £3,600 for Z. The per-unit ranking is £4,400 worse." },
          ],
          result:
            "**Make 2,000 W, 1,500 X and 1,400 Z; buy in all 3,000 Y and 400 Z**, at an extra cost of **£12,600**. The per-unit ranking would have looked more attractive on W and cost **£4,400 more**, because W releases so little machine time per pound of extra cost.",
        },
      ],
      check: {
        q: "Component P costs £4 extra to buy and uses 0.2 scarce hours if made; Q costs £9 extra and uses 0.9 hours. Which should be bought in first?",
        options: [
          "P, with the lower extra cost per unit",
          "Q, at £10 per hour saved against P's £20",
          "Neither — both should be made",
          "They rank equally",
        ],
        correct: 1,
        explain:
          "Q. Rank by extra cost per unit of SCARCE RESOURCE RELEASED: Q costs £9/0.9 = £10 per hour saved, P costs £4/0.2 = £20. P's lower per-unit cost is irrelevant because it releases so little machine time. Note this is a MINIMISATION, the reverse direction to ranking products for production.",
      },
    },
    {
      id: "other-decisions",
      heading: "Shutdown, further processing and special orders",
      blocks: [
        {
          kind: "table",
          caption: "The three other short-term decisions",
          head: ["Decision", "The test", "The trap"],
          rows: [
            ["**Shutdown** — close a product, department or outlet", "Compare the **contribution lost** with the **fixed costs actually saved**. Close only if avoidable fixed costs exceed lost contribution", "Treating **apportioned** fixed costs as saved. Most head-office overhead continues and is simply reabsorbed elsewhere"],
            ["**Further processing** — sell now or process further", "Compare **incremental revenue** with **incremental cost** of the further processing", "Including the cost of the **joint process already incurred** — it is sunk and common to both options"],
            ["**Special order** — accept a one-off at a reduced price", "Accept if the price exceeds the **relevant cost** (chapter 11), including any opportunity cost of displaced work", "Ignoring the effect on **existing customers** and on future prices, and forgetting that spare capacity is temporary"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Shutdown: the figure that decides it is avoidable fixed cost",
          md: "A department showing a loss after apportioned overhead is the classic scenario, and closing it usually makes the position **worse**. The test is whether the fixed costs that would genuinely **stop being incurred** exceed the contribution that would be lost. A share of factory rent, head office cost or a divisional manager's salary that continues after closure is **not** a saving — it simply gets absorbed by the surviving products, whose reported profit then falls. So the answer distinguishes **specific avoidable** fixed cost from **apportioned** fixed cost, and only the first counts.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Further processing: the joint cost is always irrelevant",
          md: "In a joint or by-product scenario, the cost of the common process up to the separation point has already been incurred and is **the same whichever option is chosen** — so it fails the incremental test and must be excluded. The decision turns solely on **incremental revenue against incremental further-processing cost**. Any apportionment of joint cost between products, however it was done, is an accounting convention with no bearing on the decision, and including it is the standard error.",
        },
        {
          kind: "list",
          title: "The qualitative factors, which frequently decide the answer",
          items: [
            "**Quality and reliability** of a bought-in component, and the effect on the finished product's reputation.",
            "**Loss of control and expertise** — outsourcing a component can mean losing the ability ever to make it again.",
            "**Supplier dependence**: a single supplier that later raises its price, and the switching cost of having no alternative.",
            "**Confidentiality**, where outsourcing means sharing a design or a process.",
            "**Employee and industrial relations** consequences of shutdown or outsourcing, and the effect on remaining staff.",
            "**Customer reaction and precedent** on a special order — an accepted low price is hard to raise and other customers find out.",
            "**Spare capacity is temporary**, so a decision justified by idle resources needs revisiting when they are not idle.",
            "**Strategic fit**: a loss-making product may support sales of others, protect a market position or satisfy a contract.",
          ],
        },
      ],
      check: {
        q: "A department shows a loss after £40,000 of apportioned head office cost. It earns £25,000 contribution and £10,000 of its fixed costs would be avoided on closure. Should it close?",
        options: [
          "Yes — it is loss-making",
          "No — closing loses £25,000 contribution and saves only £10,000, so the position worsens by £15,000",
          "Yes, saving £40,000 of head office cost",
          "Cannot be determined without the apportionment basis",
        ],
        correct: 1,
        explain:
          "NO. Closing loses £25,000 of CONTRIBUTION and saves only the £10,000 of AVOIDABLE fixed cost, so the company is £15,000 worse off. The £40,000 apportioned head office cost continues and is simply reabsorbed by other departments, whose reported profit then falls.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Ranking make-or-buy by extra cost per unit.",
      fix: "Rank by extra cost per unit of SCARCE RESOURCE RELEASED, and note it is a minimisation.",
    },
    {
      trap: "Treating apportioned fixed cost as saved on shutdown.",
      fix: "Only SPECIFIC AVOIDABLE fixed cost counts. Apportioned cost continues and is reabsorbed.",
    },
    {
      trap: "Including joint process cost in a further-processing decision.",
      fix: "It is sunk and common to both options. Compare incremental revenue with incremental cost only.",
    },
    {
      trap: "Accepting a special order on the numbers alone.",
      fix: "Consider precedent, existing customers, and the fact that spare capacity is temporary.",
    },
    {
      trap: "Defending cost-plus pricing as demand-neutral.",
      fix: "It is circular — cost per unit depends on volume, which depends on price — and blind to what customers would pay.",
    },
  ],
  keyTerms: [
    { term: "Market skimming", def: "A high initial price reduced over time, suiting a novel product with inelastic early demand." },
    { term: "Market penetration", def: "A low initial price to build volume and share, suiting elastic demand and scale economies." },
    { term: "Price discrimination", def: "Charging different segments different prices for essentially the same product, where segments can be kept apart." },
    { term: "Cost-plus pricing", def: "Cost plus a mark-up; simple but circular and blind to demand." },
    { term: "Avoidable fixed cost", def: "Fixed cost that genuinely ceases on closure — the only fixed cost relevant to a shutdown decision." },
    { term: "Joint cost", def: "The cost of a common process before separation, irrelevant to a further-processing decision." },
  ],
  summary: [
    "Skimming suits novel products with inelastic demand; penetration suits elastic demand and scale economies.",
    "Cost-plus pricing is circular and demand-blind, which is what target costing answers.",
    "Without a constraint, make if variable cost is below the buy-in price.",
    "With a constraint, buy in whatever has the lowest extra cost per unit of scarce resource released.",
    "Shutdown turns on avoidable fixed cost; further processing on incremental revenue against incremental cost, ignoring joint cost.",
  ],
  knowledgeDiagnostic: [
    { q: "How does a scarce resource change a make-or-buy decision?", a: "The ranking becomes extra cost of buying per unit of scarce resource RELEASED, minimised — not extra cost per unit." },
    { q: "What decides a shutdown decision?", a: "Whether specific avoidable fixed cost exceeds the contribution lost. Apportioned cost continues and is irrelevant." },
    { q: "Why is joint cost irrelevant to further processing?", a: "It has already been incurred and is identical under both options, so it fails the incremental test." },
    { q: "State the two weaknesses of cost-plus pricing.", a: "It is circular, because cost per unit depends on the volume the price will determine, and it ignores demand entirely." },
  ],
}

export const PM_TREE_AREA_C_PART4: StudyChapter[] = [PM_TREE_17, PM_TREE_18]
