import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area B, final part — environmental and sustainability accounting, and choosing
 * between the Area B techniques.
 * Chapters 9–10 of the PM reading tree. Chapter 9 maps to syllabus group B5; chapter 10 is
 * a SYNTHESIS chapter spanning B1–B5.
 *
 * ── Why chapter 10 exists, given it is not a syllabus group ────
 * Area B teaches five techniques, and Section C requirements routinely ask which one fits
 * a described business, or ask for two of them applied to the same facts. A learner who
 * has met each technique in isolation can compute all five and still not know which to
 * reach for. So chapter 10 is deliberately a comparison chapter rather than new material —
 * the same role the Area D "performance analysis" chapter plays for the variances.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 9 · B5 ───────────────────────────────────────────── */

export const PM_TREE_09: StudyChapter = {
  id: "PM-09",
  number: 9,
  paper: "PM",
  area: "B",
  title: "Environmental and sustainability accounting",
  minutes: 16,
  syllabusRefs: ["B5(a)", "B5(b)", "B5(c)"],
  intro:
    "Environmental cost is usually large and almost always invisible, because conventional systems bury it in general overhead. Once nobody owns it, nobody reduces it — which is the whole problem environmental management accounting sets out to fix.",
  outcomes: [
    "Explain why environmental costs matter to performance management",
    "Classify environmental costs into the four categories",
    "Explain input/output analysis, flow cost accounting and environmental ABC",
    "Explain the triple bottom line and integrated reporting",
    "Recommend how an organisation should account for its environmental costs",
  ],
  sections: [
    {
      id: "why-and-categories",
      heading: "Why it matters, and the four categories of cost",
      blocks: [
        {
          kind: "list",
          title: "Why environmental cost has become a performance management issue",
          items: [
            "**It is material.** Energy, water, materials and waste disposal are often a substantial share of cost, and rising.",
            "**It is increasingly regulated** — emissions limits, packaging and waste obligations, carbon reporting — so non-compliance carries fines and, worse, loss of licence to operate.",
            "**It affects revenue.** Customers, and particularly business customers with their own targets, increasingly select suppliers on environmental performance.",
            "**Investors and lenders ask for it**, so the cost of capital can depend on it.",
            "**It is a reputational risk** whose downside is asymmetric: years of good practice earn little, and one incident is expensive.",
            "**Most of it is hidden.** Conventional systems lump it into general overhead, so it is neither visible, attributed, nor anybody's responsibility to reduce.",
          ],
        },
        {
          kind: "table",
          caption: "The four categories of environmental cost",
          head: ["Category", "What it covers", "Why it hides"],
          rows: [
            ["**Conventional costs**", "Raw materials, energy, water and other resources consumed", "Visible as cost, but rarely identified as **environmental** — so a materials saving is not seen as a waste reduction"],
            ["**Potentially hidden costs**", "Regulatory and voluntary compliance: monitoring, permits, reporting, training, plus up-front (site preparation) and **back-end** (decommissioning, site restoration) costs", "Absorbed into general overhead, and the back-end costs fall far in the future"],
            ["**Contingent costs**", "Costs that may arise — future remediation, fines, penalties, compensation claims", "**Uncertain**, so conventional systems ignore them entirely rather than estimating them"],
            ["**Relationship and image costs**", "Sustainability reporting, community relations, stakeholder engagement, environmental certification", "Look like marketing or general administration, so they are never linked to environmental performance"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The reason it stays hidden, and why that matters",
          md: "Environmental cost is typically charged to **general overhead** and then absorbed across products by a volume measure. Two consequences follow, and both are performance management problems rather than accounting ones. First, **no manager is accountable** for a cost that appears in nobody's responsibility centre, so nothing drives it down (chapter 29). Second, **the products causing the cost do not carry it** — a product generating most of the waste is charged the same rate as a clean one, so pricing and mix decisions are made on wrong numbers, which is exactly the ABC argument from chapter 5 applied to environmental cost.",
        },
      ],
      check: {
        q: "A company will incur substantial site restoration costs when its plant closes in fifteen years. Which category is that?",
        options: [
          "A conventional cost",
          "A potentially hidden cost — a back-end cost absorbed into overhead and falling far in the future",
          "A contingent cost, since the amount is uncertain",
          "A relationship and image cost",
        ],
        correct: 1,
        explain:
          "A POTENTIALLY HIDDEN cost, specifically a BACK-END one. It is not contingent, because it WILL be incurred — the uncertainty is amount and timing, not whether. Contingent costs are those that MAY arise, such as fines or remediation claims.",
      },
    },
    {
      id: "techniques",
      heading: "The techniques, and reporting",
      blocks: [
        {
          kind: "definition",
          term: "Input/output analysis",
          md: "A **mass balance**: what comes into a process must either leave as product or leave as waste. So if 100 kg of material enters and 82 kg leaves as product, **18 kg left as waste** — and that waste was paid for twice, once as material purchased and again as disposal. Measuring it in physical quantities first and then costing it makes the loss visible in a way a cost ledger never does.",
        },
        {
          kind: "formula",
          name: "Input/output analysis",
          expr: "Material input  =  Product output  +  Waste output\n\nCost of waste  =  Waste quantity  ×  (purchase cost per unit  +  disposal cost per unit)",
          note: "The insight is the second line: waste costs the price paid to buy it PLUS the price paid to get rid of it, so a kilogram of waste is roughly twice as expensive as it first appears. Percentages are usually the clearest presentation — 18% of material purchased was thrown away.",
        },
        {
          kind: "definition",
          term: "Flow cost accounting",
          md: "Traces material flows through the organisation and splits the cost attaching to each flow into three: **material** costs (the resource itself), **system** costs (the cost of handling it in-house — storage, moving, processing, administration), and **delivery and disposal** costs (getting it in and getting the residue out). Presenting waste with its system and disposal costs attached shows the **full** cost of inefficiency rather than just the purchase price of what was wasted.",
        },
        {
          kind: "definition",
          term: "Environmental activity-based costing",
          md: "ABC (chapter 5) applied to environmental cost, distinguishing **environment-driven** costs — attributable to a specific activity, such as emissions treatment or waste disposal, which can be charged to the products causing them — from **environment-related** costs, which are joint or general and must still be apportioned. The effect is that products causing environmental cost start carrying it, so pricing and mix decisions improve.",
        },
        {
          kind: "example",
          title: "Making environmental cost visible",
          scenario:
            "Crowmarsh Chemicals buys 240,000 kg of a solvent a year at £6.20 per kg. Output analysis shows 198,000 kg leaves in finished product. Disposal of the residue costs £1.85 per kg. Environmental costs currently in general overhead are: waste disposal contract £520,000, emissions monitoring and permits £145,000, and site restoration provision £180,000 a year. Two products use the solvent: Alpha, 150,000 units a year, generating 15% of the waste; Beta, 30,000 units, generating 85%. Overhead is currently absorbed at a plant-wide rate on units produced.",
          steps: [
            { label: "Apply input/output analysis", detail: "Input 240,000 kg, product output 198,000 kg, so WASTE = 42,000 kg — 17.5% of everything purchased is thrown away. Stating it as a percentage is what makes the point to management." },
            { label: "Cost the waste properly", detail: "It was paid for TWICE: purchase 42,000 x £6.20 = £260,400, plus disposal 42,000 x £1.85 = £77,700. Total £338,100 a year — and a further £182,300 of the £520,000 disposal contract is not explained by this solvent, so there is more waste elsewhere." },
            { label: "Note what the conventional system shows", detail: "NOTHING. The £260,400 sits inside materials cost as though it had been used, and the £77,700 sits in general overhead. No report anywhere says \"we threw away £338,100\", which is precisely why nobody is reducing it." },
            { label: "Apply environmental ABC to the disposal cost", detail: "Waste disposal of £520,000 is ENVIRONMENT-DRIVEN and can be charged by waste generated. Alpha 15% = £78,000 over 150,000 units = £0.52 per unit. Beta 85% = £442,000 over 30,000 units = £14.73 per unit." },
            { label: "Compare with the current absorption", detail: "Plant-wide on units: £520,000 / 180,000 units = £2.89 per unit for BOTH. So Beta is being under-charged by £11.84 a unit and Alpha over-charged by £2.37 — the same high-volume-subsidises-low-volume distortion as chapter 5, and here it may mean Beta is sold at a loss." },
            { label: "Classify the rest and recommend", detail: "Monitoring and permits £145,000 are POTENTIALLY HIDDEN compliance costs; the restoration provision £180,000 is a BACK-END cost. Both should be separately identified rather than absorbed. Recommend: report waste in KILOGRAMS as well as pounds, charge environment-driven costs by waste generated, make a named manager accountable for the waste percentage, and re-examine Beta's price and specification." },
          ],
          result:
            "**17.5% of the solvent purchased is thrown away, costing £338,100 a year**, and none of it appears on any report. Charging disposal by waste generated moves £11.84 a unit onto Beta — which is the figure that changes a pricing decision, and the reason environmental accounting is a performance management topic rather than a compliance one.",
        },
      ],
      check: {
        q: "100 kg of material enters a process at £8/kg and 78 kg leaves as product. Disposal costs £2/kg. What does the waste cost?",
        options: ["£176", "£220", "£44", "£800"],
        correct: 1,
        explain:
          "£220. Waste is 100 − 78 = 22 kg, which was paid for TWICE: purchase 22 × £8 = £176, plus disposal 22 × £2 = £44. Counting only the purchase cost, or only the disposal cost, understates the loss — a kilogram of waste is roughly twice as expensive as it first appears.",
      },
    },
    {
      id: "sustainability",
      heading: "Sustainability reporting",
      blocks: [
        {
          kind: "definition",
          term: "The triple bottom line",
          md: "Reporting performance against three dimensions rather than one: **economic** (profit), **environmental** (planet) and **social** (people). The argument is that an organisation reporting only financial results is measuring one third of its impact, and that the other two carry real financial consequences over a longer horizon — so the three are complements rather than competitors.",
        },
        {
          kind: "table",
          caption: "What each dimension measures",
          head: ["Dimension", "Typical measures"],
          rows: [
            ["**Economic**", "Profit, cash generation, return on capital, taxes paid, economic contribution to the localities in which it operates"],
            ["**Environmental**", "Energy and water consumption, emissions, waste generated and recycled, materials from sustainable sources"],
            ["**Social**", "Employee safety and turnover, training, diversity, supply chain labour standards, community investment"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Integrated reporting, and why it belongs in a performance paper",
          md: "**Integrated reporting** goes further than the triple bottom line by explaining how an organisation creates value over time across several forms of **capital** — financial, manufactured, intellectual, human, social and natural — rather than reporting three separate scores. Its relevance to PM is direct: it is an explicit answer to the **short-termism** problem (chapter 29). A business measured only on this year's profit will consume its human, social and natural capital to produce it, and the accounts will call that a good year.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The honest difficulties, which an answer should name",
          md: "Sustainability reporting is not straightforward and a one-sided answer will not score well. **Measurement** is genuinely hard — how is a community benefit or a reputational gain quantified? **Comparability** is poor where organisations choose their own measures and boundaries. There is a real risk of **greenwashing**, reporting the flattering measures and omitting the rest. It is **costly** to collect and assure. And where the measures are chosen by the people being judged on them, they will be chosen to flatter — which is the same problem as any non-financial measurement set (chapter 30).",
        },
      ],
      check: {
        q: "What does integrated reporting add beyond the triple bottom line?",
        options: [
          "Audited environmental figures",
          "An explanation of how value is created over time across several forms of capital — financial, human, social and natural among them",
          "A single combined score for the three dimensions",
          "Compliance with emissions regulation",
        ],
        correct: 1,
        explain:
          "It explains how value is CREATED OVER TIME across multiple CAPITALS — financial, manufactured, intellectual, human, social and natural — rather than reporting three separate scores. That makes it a direct answer to short-termism, since consuming human, social or natural capital to hit this year's profit becomes visible.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Costing waste at its disposal cost only.",
      fix: "It was paid for TWICE — the purchase price of the material wasted plus the cost of disposing of it.",
    },
    {
      trap: "Treating a certain future restoration cost as contingent.",
      fix: "Contingent means it MAY arise. A restoration obligation that will certainly be incurred is a back-end potentially hidden cost.",
    },
    {
      trap: "Answering a sustainability question with benefits only.",
      fix: "Name the difficulties too: measurement, comparability, greenwashing, cost, and self-selected measures.",
    },
    {
      trap: "Treating environmental accounting as a compliance topic.",
      fix: "Its point is that hidden cost is nobody's responsibility and distorts product cost — a performance management problem.",
    },
  ],
  keyTerms: [
    { term: "Conventional environmental costs", def: "Materials, energy and water consumed — visible as cost but rarely identified as environmental." },
    { term: "Potentially hidden costs", def: "Compliance, monitoring, up-front and back-end costs absorbed into general overhead." },
    { term: "Contingent costs", def: "Costs that may arise, such as fines, remediation or compensation." },
    { term: "Relationship and image costs", def: "Sustainability reporting, community relations and certification." },
    { term: "Input/output analysis", def: "A mass balance in which material input equals product output plus waste, making waste visible." },
    { term: "Flow cost accounting", def: "Splitting the cost of material flows into material, system, and delivery and disposal costs." },
    { term: "Triple bottom line", def: "Reporting economic, environmental and social performance together." },
    { term: "Integrated reporting", def: "Explaining value creation over time across financial, manufactured, intellectual, human, social and natural capital." },
  ],
  summary: [
    "Environmental cost is material, regulated, revenue-relevant and mostly hidden in general overhead.",
    "The four categories are conventional, potentially hidden, contingent, and relationship and image costs.",
    "Input/output analysis makes waste visible as a mass balance, and waste is paid for twice — purchase plus disposal.",
    "Flow cost accounting adds system and disposal cost to waste; environmental ABC charges environment-driven cost to the products causing it.",
    "The triple bottom line reports economic, environmental and social performance; integrated reporting explains value creation across several capitals.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the four categories of environmental cost.", a: "Conventional, potentially hidden (including up-front and back-end), contingent, and relationship and image costs." },
    { q: "Why is waste paid for twice?", a: "Once as the purchase price of the material that became waste, and again as the cost of disposing of it." },
    { q: "What does environmental ABC change?", a: "It charges environment-driven costs to the products causing them instead of absorbing them plant-wide, so pricing and mix decisions use accurate cost." },
    { q: "Why does environmental cost stay hidden, and why does that matter?", a: "Because it sits in general overhead, so no manager is accountable for it and the products causing it do not carry it." },
    { q: "Give three difficulties with sustainability reporting.", a: "Measurement of non-financial impacts, poor comparability between organisations, and the risk of greenwashing through self-selected measures." },
  ],
}

/* ── Chapter 10 · B1–B5 synthesis ─────────────────────────────── */

export const PM_TREE_10: StudyChapter = {
  id: "PM-10",
  number: 10,
  paper: "PM",
  area: "B",
  title: "Choosing between the Area B techniques",
  minutes: 15,
  syllabusRefs: ["B1(c)", "B2(d)", "B3(c)", "B4(d)", "B5(c)"],
  intro:
    "Five techniques, each answering a different question about the same product. The exam rarely asks you to compute one in isolation — it describes a business and asks which one it needs, which is a different skill entirely.",
  outcomes: [
    "State the question each Area B technique answers",
    "Identify the business circumstances that suit each technique",
    "Explain how the techniques complement rather than replace one another",
    "Select and justify a technique for a described organisation",
    "Recognise when a technique is not worth its cost",
  ],
  sections: [
    {
      id: "which-question",
      heading: "What each technique is actually for",
      blocks: [
        {
          kind: "table",
          caption: "The five techniques compared",
          head: ["Technique", "The question it answers", "Suits a business where…", "Its weakness"],
          rows: [
            ["**ABC** (ch 5)", "What does this product **really cost** to make?", "Overheads are **large and transaction-driven**, and the range is diverse in volume or complexity", "Costly to run; still an absorption method, so it does not make fixed cost relevant to a short-run decision"],
            ["**Target costing** (ch 6)", "What are we **allowed to spend**, given the price the market will pay?", "Products are **designed** and launched into a **competitive market with a given price**", "A design-stage technique only; little use once the product is in production"],
            ["**Life-cycle costing** (ch 7)", "Over its **whole life**, does this product pay?", "**Development costs are large** and product lives are finite — technology, pharmaceuticals, vehicles", "Requires long-range estimates; says nothing about this period's control"],
            ["**Throughput accounting** (ch 8)", "Given our **bottleneck**, what should we make?", "There is a **binding internal constraint** and demand exceeds capacity", "Short-run; treats labour and overhead as fixed, so a poor basis for pricing"],
            ["**Environmental accounting** (ch 9)", "What is our **environmental cost**, and who is causing it?", "Resource use, waste or compliance costs are **material** and currently buried in overhead", "Measurement difficulty, especially for contingent and social costs"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The clue is in what the scenario complains about",
          md: "Scenarios are written so the technique is deducible from the symptom. \"Our low-volume specials seem profitable but we are losing money\" → **ABC**. \"Competitors are pricing below our cost\" → **target costing**. \"The product was profitable for three years and never repaid its development\" → **life-cycle costing**. \"We cannot meet demand and do not know which orders to accept\" → **throughput**. \"Disposal costs are rising and nobody knows which product causes them\" → **environmental**. Read the complaint before choosing the tool.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "They are complements, and a good answer says so",
          md: "The techniques are not rivals — they attack the same product at different points. A new product might be costed accurately with **ABC**, constrained by a **target cost** derived from the market price, appraised over its **life cycle** to check it repays development, scheduled by **throughput** once it is competing for a bottleneck, and have its waste made visible by **environmental** accounting. Two pairings are especially close and worth naming: **target costing and life-cycle costing** both say most cost is committed at the design stage, and **ABC and environmental ABC** are the same argument applied to different cost pools.",
        },
        {
          kind: "example",
          title: "Choosing for a described business",
          scenario:
            "Advise on the technique each of these businesses most needs. (a) Halvergate Instruments makes 40 products, from a 90,000-unit commodity sensor to 200-unit bespoke laboratory units; overheads are 60% of total cost and the bespoke units are believed profitable. (b) Nettleden Devices spends four years and £11m developing each product, which then sells for six years; the board reviews product profitability annually. (c) Sparkford Presswork has one heat-treatment furnace running at capacity and is turning away orders. (d) Wrentham Foods faces a competitor selling an equivalent product 12% below Wrentham's full cost, and is designing a replacement product. (e) Ockendon Plating has seen waste disposal costs treble and cannot say which of its four processes is responsible.",
          steps: [
            { label: "Halvergate", detail: "ABC. Overheads are 60% of cost and the range spans 90,000 units to 200 — the textbook conditions. Expect the bespoke units' cost to rise sharply once set-ups, ordering and inspection are charged by driver, and the belief that they are profitable to prove wrong." },
            { label: "Nettleden", detail: "LIFE-CYCLE COSTING, and note the second defect: reviewing profitability ANNUALLY on a product with a four-year development and a six-year life guarantees that development-year losses and mature-year profits are judged separately. £11m over the whole life volume is the only meaningful figure." },
            { label: "Sparkford", detail: "THROUGHPUT ACCOUNTING. A single binding constraint with demand exceeding capacity is exactly its case: rank orders by throughput per furnace hour, and manage the furnace by the five steps — never let it idle, inspect before it, subordinate everything else." },
            { label: "Wrentham", detail: "TARGET COSTING. The market price is given and below current cost, and a replacement is at the DESIGN stage, which is where the gap can actually be closed. Note that the competitor pricing 12% below full cost may also mean Wrentham's cost is misallocated — so ABC may be worth running first to check the £ is real." },
            { label: "Ockendon", detail: "ENVIRONMENTAL ACCOUNTING — input/output analysis to quantify waste per process in physical units, then environmental ABC to charge disposal by waste generated so the responsible process carries it." },
            { label: "State the general rule the five illustrate", detail: "Each choice follows from the SYMPTOM, not from the technique's merits. And two of the five need a second technique as well — Nettleden needs its measurement HORIZON changed, and Wrentham should verify its cost before designing to a target based on it." },
          ],
          result:
            "**ABC, life-cycle, throughput, target costing and environmental** respectively — but the marks are in the *reasoning from the symptom*, and in spotting that Nettleden's real problem is its **annual review cycle** and Wrentham may be working from a **misallocated cost** in the first place.",
        },
      ],
      check: {
        q: "A company spends heavily on development, products sell for several years, and the board reviews profitability annually. Which technique, and what else is wrong?",
        options: [
          "ABC, and the overhead rate is wrong",
          "Life-cycle costing — and the annual review horizon separates development losses from mature-year profits",
          "Throughput accounting, and the bottleneck is unidentified",
          "Target costing, and the price is too low",
        ],
        correct: 1,
        explain:
          "LIFE-CYCLE COSTING, because only whole-life cost over whole-life volume answers whether the product repays development. The second defect is the ANNUAL REVIEW: it judges development-year losses and mature-year profits separately, which is how a product that never repays its development survives review after review.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Computing a technique the scenario did not call for.",
      fix: "Read the complaint. The symptom identifies the tool.",
    },
    {
      trap: "Presenting the techniques as alternatives to choose between.",
      fix: "They answer different questions about the same product and are frequently used together.",
    },
    {
      trap: "Recommending a technique without naming its cost or limitation.",
      fix: "Every one of the five has a stated weakness, and naming it is part of the recommendation.",
    },
    {
      trap: "Using throughput ranking as a basis for pricing.",
      fix: "It treats labour and overhead as fixed, so it under-costs products. Use it for short-run mix, not price.",
    },
  ],
  keyTerms: [
    { term: "Complementary techniques", def: "Methods answering different questions about the same product, used together rather than chosen between." },
    { term: "Transaction-driven overhead", def: "The condition that makes ABC worthwhile — cost incurred per event rather than per unit." },
    { term: "Binding constraint", def: "The condition that makes throughput accounting the right tool — capacity below demand." },
    { term: "Design-stage technique", def: "Target costing and life-cycle costing, both acting before cost is committed." },
  ],
  summary: [
    "ABC asks what a product really costs; target costing what it is allowed to cost.",
    "Life-cycle costing asks whether it pays over its whole life; throughput what to make given a bottleneck.",
    "Environmental accounting asks what the environmental cost is and who causes it.",
    "The scenario's complaint identifies the technique, so read the symptom before choosing the tool.",
    "The techniques are complements, and target costing with life-cycle costing both act at the design stage.",
  ],
  knowledgeDiagnostic: [
    { q: "Which technique suits large transaction-driven overheads and a diverse range?", a: "ABC — and the low-volume, high-complexity products will usually turn out to cost far more than absorption costing showed." },
    { q: "Which two techniques both act at the design stage, and why?", a: "Target costing and life-cycle costing, because most of a product's cost is committed by design decisions before production begins." },
    { q: "When is throughput accounting the right tool?", a: "Where there is a binding internal constraint and demand exceeds capacity, so the question is which products should use the bottleneck." },
    { q: "Why is throughput a poor basis for pricing?", a: "Because it treats labour and all overhead as fixed, so it under-costs products whose labour content genuinely varies." },
  ],
}

export const PM_TREE_AREA_B_PART3: StudyChapter[] = [PM_TREE_09, PM_TREE_10]
