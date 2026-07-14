import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area B — Strategy.
 * Applied, evaluative: strategic analysis (external, industry, internal),
 * strategic choice (competitive, directions, methods) and strategy in action.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Invented scenarios.
 */

export const SBL_B: StudyChapter = {
  paper: "SBL",
  area: "B",
  title: "Strategy",
  minutes: 17,
  intro: "Strategy is not a document — it is a set of hard choices about where an organisation competes and how it wins. SBL rewards you for analysing a scenario, not reciting a model.",
  outcomes: [
    "Analyse an organisation's external environment using PESTEL and Porter's five forces",
    "Evaluate internal resources and capabilities with the value chain, core competences and the VRIN test",
    "Turn analysis into a strategic position using SWOT and TOWS",
    "Choose a competitive strategy with Porter's generic strategies and Bowman's strategy clock",
    "Select a growth direction and method using Ansoff and the BCG matrix, and judge options with JSW's SAF criteria",
  ],
  sections: [
    {
      id: "external",
      heading: "The external environment — PESTEL",
      blocks: [
        { kind: "text", md: "Every organisation sits inside a wider world it does not control. **Strategic analysis** starts here: before you decide what to do, you map the forces acting on you. The widest lens is the **macro-environment** — the big, society-level forces — and the standard scan for it is **PESTEL**." },
        { kind: "text", md: "PESTEL is not a list to copy out. Its value in the exam is **direction and impact**: for each factor you must say whether it is an **opportunity or a threat**, and *why it matters to this organisation*. A carbon tax is trivial to a software firm and existential to a cement maker." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "PESTEL — the six macro-environmental factors",
          caption: "Scan each factor for opportunities and threats specific to the organisation.",
          data: {
            items: [
              { title: "Political", sub: "Government stability, trade policy, state funding, tax regime" },
              { title: "Economic", sub: "Growth, interest rates, inflation, exchange rates, unemployment" },
              { title: "Social", sub: "Demographics, lifestyle, values, tastes, education" },
              { title: "Technological", sub: "Automation, R&D, disruption, digital channels, AI" },
              { title: "Environmental", sub: "Climate, sustainability, emissions rules, resource scarcity" },
              { title: "Legal", sub: "Employment, competition, health & safety, data protection law" },
            ],
          },
        } },
        { kind: "example", title: "Applying PESTEL — DeltaGrocer, a supermarket chain", scenario: "DeltaGrocer runs 120 stores in one country. The government has announced a sugar tax and stricter packaging-waste rules; interest rates have risen sharply; shoppers increasingly want plant-based food ordered online. Which macro factors matter most?", steps: [
          { label: "Political / Legal", detail: "The sugar tax and packaging rules raise costs and force reformulation — a threat to own-brand ranges, but a chance to lead on healthier lines." },
          { label: "Economic", detail: "Higher interest rates squeeze household budgets — customers trade down, so value ranges become an opportunity while premium volumes fall." },
          { label: "Social", detail: "The plant-based, online-first shift is an opportunity — but only if DeltaGrocer can serve it, which points straight at its capabilities." },
          { label: "Environmental", detail: "Packaging-waste rules overlap with genuine reputational risk; getting ahead of them can differentiate the brand." },
        ], result: "PESTEL does not make the decision — it surfaces the pressures. The strongest answers rank the factors by impact on this business and hand the shortlist to the next stage of analysis." },
        { kind: "callout", tone: "warn", title: "PESTEL is a scan, not a strategy", md: "Listing factors earns almost nothing. Marks come from **relevance, direction and impact** — tie each factor to *this* organisation and say whether it is an opportunity or a threat." },
      ],
    },
    {
      id: "five-forces",
      heading: "Industry analysis — Porter's five forces",
      blocks: [
        { kind: "text", md: "PESTEL scans the whole macro-world; **Porter's five forces** zooms in on one **industry** and asks a sharper question: *how attractive — how profitable — is it likely to be, and why?* The insight is that profit is competed away not only by rivals, but by the combined pressure of **exactly five** forces." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Porter's five forces",
          caption: "The stronger a force, the more profit it drains from the industry.",
          data: {
            items: [
              { title: "Competitive rivalry", sub: "The centre — intensity of competition among existing firms" },
              { title: "Threat of new entrants", sub: "How easily can outsiders join? Depends on barriers to entry" },
              { title: "Threat of substitutes", sub: "Different products meeting the same customer need" },
              { title: "Bargaining power of buyers", sub: "Can customers force prices down or demand more?" },
              { title: "Bargaining power of suppliers", sub: "Can input providers push costs up?" },
            ],
          },
        } },
        { kind: "text", md: "The four outer forces all feed the one in the middle — **competitive rivalry**. Low entry barriers, cheap substitutes, powerful buyers and powerful suppliers each intensify rivalry and erode margins. When most forces are **strong**, the industry is **unattractive**; when most are **weak**, profits are easier to defend." },
        { kind: "example", title: "Five forces — Nimbus, a budget airline", scenario: "Nimbus flies short-haul routes. Aircraft are leased from two dominant manufacturers; passengers book on price-comparison sites; high-speed rail now covers its busiest route; two new low-cost carriers have just launched.", steps: [
          { label: "Supplier power — HIGH", detail: "Only two realistic aircraft suppliers, plus airport-slot owners — inputs are concentrated and costly to switch." },
          { label: "Buyer power — HIGH", detail: "Comparison sites make prices transparent and switching costless, so passengers chase the lowest fare." },
          { label: "Substitutes — RISING", detail: "High-speed rail is a credible substitute on the core route, capping how high fares can go." },
          { label: "New entrants — HIGH", detail: "Two carriers just entered; leasing lowers the capital barrier, so the threat is live." },
          { label: "Rivalry — INTENSE", detail: "All four forces converge on brutal price competition and thin margins." },
        ], result: "Four strong forces make this a structurally unattractive industry. Nimbus cannot fix the structure, so its strategy must build defences — cost advantage, loyalty, or routes rivals cannot easily copy." },
      ],
      check: {
        q: "In a scenario, an industry has very low barriers to entry, many close substitutes and customers who switch at no cost. What does five forces analysis conclude?",
        options: [
          "The industry is highly attractive because there is lots of activity",
          "The industry is unattractive — strong forces will compete profits away",
          "Barriers to entry are irrelevant once an industry is mature",
          "Supplier power is automatically low",
        ],
        correct: 1,
        explain: "Strong forces drain profit. Low entry barriers, close substitutes and costless switching (high buyer power) all intensify rivalry and squeeze margins, so the industry is structurally UNATTRACTIVE. Lots of activity is not the same as profitability, and nothing here tells us about supplier power.",
      },
    },
    {
      id: "internal",
      heading: "Internal resources & capabilities — value chain, core competences, VRIN",
      blocks: [
        { kind: "text", md: "External analysis tells you where the opportunities and threats are; **internal analysis** tells you whether you can act on them. It asks what the organisation is genuinely **good at** and whether that advantage can **last**." },
        { kind: "text", md: "Porter's **value chain** breaks the business into the activities that create value, so you can see where cost is added and where advantage is really earned. **Primary activities** move the product from input to customer; **support activities** run underneath them all." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Porter's value chain — the primary activities",
          caption: "Support activities (firm infrastructure, HR, technology, procurement) underpin every step; margin is the value left over.",
          data: {
            steps: [
              { label: "Inbound logistics", sub: "Receiving & storing inputs" },
              { label: "Operations", sub: "Turning inputs into product" },
              { label: "Outbound logistics", sub: "Getting product to customers" },
              { label: "Marketing & sales", sub: "Persuading & selling" },
              { label: "Service", sub: "Support after the sale" },
            ],
          },
        } },
        { kind: "text", md: "Not every strength is a source of advantage. The **resource-based view (RBV)** argues that lasting advantage comes from **resources and capabilities that rivals cannot easily copy** — the organisation's **core competences**. A **threshold** resource merely lets you compete; a **distinctive** (core) competence lets you win." },
        { kind: "callout", tone: "rule", title: "The VRIN test", md: "A resource gives **sustainable** competitive advantage only if it is **V**aluable (exploits an opportunity or neutralises a threat), **R**are (competitors lack it), **I**nimitable (hard or costly to copy) and **N**on-substitutable (no equivalent replaces it). Fail any one and the advantage is temporary." },
        { kind: "example", title: "VRIN — Aurora, a craft-coffee roaster", scenario: "Aurora owns modern roasting machines, a 20-year exclusive contract with a rare highland farm co-operative, and a loyal barista team trained in a method built up over a decade. Which of these is a true core competence?", steps: [
          { label: "Roasting machines", detail: "Valuable, but any rival can buy the same kit — not rare, not inimitable. A threshold resource only." },
          { label: "Exclusive farm contract", detail: "Valuable and rare, but a competitor could sign another farm — partly substitutable, so advantage is fragile." },
          { label: "Barista know-how", detail: "Valuable, rare, built tacitly over ten years (hard to copy) and not easily substituted — passes all four tests." },
          { label: "Conclusion", detail: "The embedded human capability is the core competence; the machines are merely the price of entry." },
        ], result: "Only the tacit, decade-built barista capability satisfies VRIN, so it — not the equipment — is where Aurora's sustainable advantage lives and where investment should concentrate." },
        { kind: "text", md: "**SWOT** then pulls the two halves together: internal **Strengths** and **Weaknesses** meet external **Opportunities** and **Threats**. But a SWOT list on its own is inert. **TOWS** makes it strategic by pairing the quadrants into actions — use **S**trengths to seize **O**pportunities (SO), use strengths to counter **T**hreats (ST), fix **W**eaknesses to chase opportunities (WO), and defend against threats that hit weaknesses (WT)." },
      ],
      check: {
        q: "A resource is valuable and rare, but a well-funded competitor could replicate it within a year. Under the RBV, what does this tell you?",
        options: [
          "It is a core competence giving sustainable advantage",
          "It gives only a temporary advantage — it fails the 'inimitable' test",
          "It is a threshold resource and adds no value at all",
          "It is non-substitutable by definition",
        ],
        correct: 1,
        explain: "Sustainable advantage under VRIN needs all four: valuable, rare, inimitable and non-substitutable. Being copyable within a year fails 'inimitable', so the advantage is only TEMPORARY. It is still valuable (so not worthless), and rarity says nothing about substitutability.",
      },
    },
    {
      id: "competitive-choice",
      heading: "Competitive strategy — generic strategies & the strategy clock",
      blocks: [
        { kind: "text", md: "Analysis done, the organisation must choose **how to compete**. Porter's **generic strategies** give three coherent routes to advantage, defined by two questions: is your advantage **cost** or **differentiation**, and is your scope **broad** or **narrow (focus)**?" },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Porter's generic strategies",
          caption: "Advantage comes from either lower cost or valued difference — pursued broadly or in a niche.",
          data: {
            leftTitle: "Cost leadership",
            rightTitle: "Differentiation",
            rows: [
              { aspect: "Source of advantage", left: "Lowest cost in the market", right: "Product/service valued as superior" },
              { aspect: "Customer appeal", left: "Competitive price, acceptable quality", right: "Willing to pay a premium" },
              { aspect: "Key requirement", left: "Scale, efficiency, tight cost control", right: "Brand, innovation, quality, service" },
              { aspect: "Focus variant", left: "Cost focus — cheapest in one niche", right: "Differentiation focus — best in one niche" },
              { aspect: "Main risk", left: "A rival undercuts you; tech shifts", right: "Premium erodes; imitation; over-spec" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Stuck in the middle", md: "Porter warns that a firm which chases low cost **and** high differentiation without excelling at either becomes **stuck in the middle** — it wins on neither price nor value and is outcompeted from both sides. In the exam this is the classic diagnosis for a drifting, unfocused competitor." },
        { kind: "text", md: "**Bowman's strategy clock** refines this into eight price/value positions and captures moves Porter's grid handles awkwardly. Two are worth naming: a **hybrid** strategy (position 3) deliberately offers **low price *and* meaningful added value** — a combination Porter treats with suspicion but which firms like disciplined low-cost differentiators genuinely achieve. The clock also names sure **failure** positions — high price for low value (positions 6-8) survives only without competition." },
        { kind: "example", title: "Choosing a route — Brightline, a furniture retailer", scenario: "Brightline sells flat-pack furniture. A giant low-cost rival dominates on price; a boutique chain dominates on design. Brightline's board wants to 'be competitive on price and the most stylish' at once.", steps: [
          { label: "The trap", detail: "Trying to out-cheap the giant and out-design the boutique risks being stuck in the middle — beaten on both fronts." },
          { label: "Cost-focus option", detail: "Pick a niche (e.g. student housing) and be the cheapest credible option there — a narrow cost-focus play." },
          { label: "Hybrid option", detail: "Use efficient sourcing to keep prices low while adding genuinely better design — Bowman's hybrid position, viable only if costs are truly controlled." },
          { label: "Decision test", detail: "The hybrid only works if Brightline's value chain really is lower-cost; otherwise the added design erodes margin and it drifts to the middle." },
        ], result: "'Cheap and stylish for everyone' is not a strategy — it is stuck in the middle. A defensible answer commits to a niche cost-focus or a genuinely cost-backed hybrid, not both promises to the whole market." },
      ],
    },
    {
      id: "directions-methods",
      heading: "Directions & methods of growth — Ansoff, BCG, and how to grow",
      blocks: [
        { kind: "text", md: "Competitive strategy sets *how you win*; the next choice is *where to grow*. **Ansoff's matrix** frames growth as a trade-off between **products** (existing vs new) and **markets** (existing vs new) — four directions of rising risk." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Ansoff's growth matrix (2x2)",
          caption: "Risk rises as you move away from what you already know — from market penetration to diversification.",
          data: {
            leftTitle: "Existing products",
            rightTitle: "New products",
            rows: [
              { aspect: "Existing markets", left: "Market penetration — sell more to current customers (lowest risk)", right: "Product development — new products to current customers" },
              { aspect: "New markets", left: "Market development — current products into new markets/segments", right: "Diversification — new products AND new markets (highest risk)" },
            ],
          },
        } },
        { kind: "text", md: "The **BCG matrix** looks not at direction but at **balance across a portfolio** of products or business units, plotting each on **market growth** (industry attractiveness) against **relative market share** (competitive strength) — again, **four** quadrants." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The BCG matrix (2x2)",
          caption: "Balance the portfolio: fund tomorrow's stars from today's cash cows; decide the fate of question marks and dogs.",
          data: {
            leftTitle: "High market share",
            rightTitle: "Low market share",
            rows: [
              { aspect: "High market growth", left: "Star — leader in a growing market; invest to hold the lead", right: "Question mark — needs heavy cash; build to a star or divest" },
              { aspect: "Low market growth", left: "Cash cow — mature leader; milk for cash to fund others", right: "Dog — weak in a flat market; hold for cash, or divest" },
            ],
          },
        } },
        { kind: "text", md: "Finally, the **method** of development — how you actually get there. **Organic** growth builds capability internally (slow, controlled, cash-funded). **Acquisition (M&A)** buys speed and market share (fast, but risky and costly to integrate). A **strategic alliance or joint venture** shares risk, cost and capability with a partner (access without full ownership, but with dependence and control issues)." },
        { kind: "example", title: "Direction and method — Verda, a plant-milk brand", scenario: "Verda leads its home market for oat milk (a cash cow). Growth at home has stalled, but demand is exploding in a neighbouring region where a strong local rival already exists. The board wants to move fast.", steps: [
          { label: "Ansoff direction", detail: "Same product, new geography = market development — moderate risk, and a natural next step for a saturated home market." },
          { label: "BCG read", detail: "The home brand is a cash cow; the new region is a high-growth market where Verda would start as a question mark needing investment." },
          { label: "Method — organic", detail: "Building distribution from scratch is controlled but slow against an entrenched rival." },
          { label: "Method — alliance", detail: "A joint venture with a local distributor buys speed and local knowledge while sharing risk — often the pragmatic answer when a strong incumbent already holds the market." },
        ], result: "Verda should fund a market-development push into the new region — most likely via alliance or acquisition for speed — using cash thrown off by the home-market cash cow." },
      ],
    },
    {
      id: "action-and-saf",
      heading: "Strategy in action — rational vs emergent, business models, and the SAF test",
      blocks: [
        { kind: "text", md: "A chosen strategy still has to be **evaluated and made real**. First, a debate about how strategy actually forms. The **rational (deliberate) planning** view sees strategy as a formal, top-down sequence: analyse, choose, then implement. **Mintzberg** challenges this with the **emergent** view — in a turbulent world, much realised strategy is unplanned, arising from learning, experiment and reactions on the ground." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Rational planning vs emergent strategy",
          caption: "Most real organisations blend both: a deliberate intent, adjusted by emergent learning.",
          data: {
            leftTitle: "Rational / deliberate",
            rightTitle: "Emergent (Mintzberg)",
            rows: [
              { aspect: "Origin", left: "Formal, top-down planning process", right: "Arises from action, learning and adaptation" },
              { aspect: "Sequence", left: "Analyse → choose → implement", right: "Strategy is crafted as events unfold" },
              { aspect: "Best when", left: "Stable, predictable environments", right: "Turbulent, fast-changing environments" },
              { aspect: "Strength", left: "Coordination, clear direction, control", right: "Flexibility, responsiveness, innovation" },
              { aspect: "Weakness", left: "Rigid; poor at surprise and change", right: "Can drift; harder to coordinate and control" },
            ],
          },
        } },
        { kind: "text", md: "Behind any strategy sits a **business model** — the logic of *how the organisation creates, delivers and captures value*: who the customer is, the **value proposition** offered to them, the resources and activities that deliver it, and how the whole thing makes money. When an environment shifts (a new technology, a subscription rival), it is often the **business model**, not just the product, that must change." },
        { kind: "callout", tone: "key", title: "Value proposition", md: "The **value proposition** is the clear promise of the value a customer will get and why it beats the alternatives. A strategy with no distinctive value proposition has nothing to sustain a price or defend a share." },
        { kind: "callout", tone: "rule", title: "The SAF test (Johnson, Scholes & Whittington)", md: "Screen any strategic option against three criteria. **Suitability** — does it fit the strategic position (the analysis: PESTEL, five forces, capabilities)? **Acceptability** — do the returns, risk and stakeholder reactions make it acceptable? **Feasibility** — do we have the resources, funds and competences to do it? An option should pass all three." },
        { kind: "example", title: "SAF in action — Kestrel Manufacturing", scenario: "Kestrel, a mid-sized components maker, is offered a debt-funded acquisition of a fast-growing overseas rival. It fits the growth plan, but gearing would double and Kestrel has never integrated a foreign business.", steps: [
          { label: "Suitability", detail: "Fits the strategic position — exploits a market-development opportunity and the target's growth. Passes." },
          { label: "Acceptability", detail: "Doubling gearing sharply raises financial risk; lenders and shareholders may reject the risk/return balance. Doubtful." },
          { label: "Feasibility", detail: "No experience integrating a foreign business and stretched cash — the competences and resources are questionable. Weak." },
          { label: "Verdict", detail: "Suitable but neither clearly acceptable nor feasible — so the option fails the SAF screen as it stands." },
        ], result: "Passing suitability is not enough — an option must clear all three of suitability, acceptability and feasibility. Kestrel should reshape the deal (lower gearing, a phased alliance first) before committing." },
      ],
      check: {
        q: "An option clearly fits the organisation's strategic position and analysis, but the company lacks the funds and competences to deliver it. Under JSW's SAF criteria, the option is:",
        options: [
          "Acceptable but not suitable",
          "Suitable but not feasible",
          "Feasible but not acceptable",
          "Fully justified because suitability is what matters most",
        ],
        correct: 1,
        explain: "Fitting the strategic position is SUITABILITY. Lacking the funds and competences to deliver is a FEASIBILITY failure. So the option is suitable but not feasible — and because SAF requires all three (suitability, acceptability, feasibility), it should not proceed as it stands.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing PESTEL or SWOT factors with no analysis.", fix: "Marks come from direction and impact — say whether each factor is an opportunity or threat and why it matters to THIS organisation, then act on it (TOWS)." },
    { trap: "Miscounting or mislabelling Porter's five forces — treating substitutes and new entrants as the same, or naming a sixth force.", fix: "There are exactly five: rivalry (centre), new entrants, substitutes, buyer power, supplier power. Strong forces = unattractive industry." },
    { trap: "Calling any strength a 'core competence'.", fix: "Only resources passing all of VRIN — valuable, rare, inimitable, non-substitutable — give sustainable advantage. Copyable strengths are threshold resources." },
    { trap: "Recommending 'low cost AND differentiation for the whole market' without cost backing.", fix: "That is Porter's 'stuck in the middle'. Commit to cost leadership, differentiation or focus — a hybrid (Bowman) works only if the value chain is genuinely low-cost." },
    { trap: "Stopping at suitability when evaluating a strategy.", fix: "JSW's SAF needs all three: suitability (fit), acceptability (return, risk, stakeholders) and feasibility (resources and competences). Test every option against all three." },
  ],
  keyTerms: [
    { term: "PESTEL", def: "A macro-environment scan across Political, Economic, Social, Technological, Environmental and Legal factors, judged as opportunities or threats." },
    { term: "Five forces", def: "Porter's model of industry attractiveness: competitive rivalry driven by new entrants, substitutes, buyer power and supplier power. Strong forces erode profit." },
    { term: "Core competence", def: "A distinctive capability that is hard for rivals to imitate and underpins sustainable competitive advantage; contrast with a threshold resource." },
    { term: "VRIN", def: "The resource-based test for sustainable advantage — Valuable, Rare, Inimitable and Non-substitutable; a resource must pass all four." },
    { term: "Generic strategies", def: "Porter's three routes to advantage — cost leadership, differentiation and focus; failing to commit leaves a firm 'stuck in the middle'." },
    { term: "SAF criteria", def: "Johnson, Scholes & Whittington's screen for strategic options — Suitability (fit), Acceptability (return/risk/stakeholders) and Feasibility (resources)." },
  ],
  summary: [
    "Strategic analysis works outside-in: PESTEL scans the macro-environment, five forces judges industry attractiveness (strong forces = unattractive), and the value chain, core competences and VRIN test internal capability.",
    "SWOT combines the two halves; TOWS turns it into action by pairing strengths and weaknesses with opportunities and threats.",
    "Competitive choice uses Porter's generic strategies (cost leadership, differentiation, focus — avoid 'stuck in the middle') refined by Bowman's strategy clock and its viable hybrid position.",
    "Growth is a direction (Ansoff's four quadrants, rising risk to diversification), a portfolio balance (BCG's stars, cash cows, question marks, dogs) and a method (organic, acquisition or alliance).",
    "Strategy blends deliberate planning with Mintzberg's emergent adaptation; a clear business model and value proposition anchor it, and every option must pass JSW's suitability, acceptability and feasibility test.",
  ],
}
