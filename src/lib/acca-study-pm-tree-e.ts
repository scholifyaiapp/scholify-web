import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area E, first part — chapters 29–30. Financial performance measurement and the
 * short-termism it encourages, then the non-financial frameworks built to correct it.
 * Syllabus E1 and E2.
 *
 * These two chapters are deliberately a PAIR, and chapter 30 only makes sense because
 * chapter 29 has just demonstrated the problem: a manager can improve every financial
 * ratio for a year by decisions that damage the business. Teaching the balanced scorecard
 * before showing what it is FOR produces candidates who can list four perspectives and
 * cannot say why anyone would want them.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 29 · E1 ──────────────────────────────────────────── */

export const PM_TREE_29: StudyChapter = {
  id: "PM-29",
  number: 29,
  paper: "PM",
  area: "E",
  title: "Financial performance measurement and short-termism",
  minutes: 18,
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)"],
  intro:
    "Financial ratios are the standard language of performance, and they are all backward-looking. The skill this chapter builds is reading a set of improving ratios and spotting the damage underneath them.",
  outcomes: [
    "Calculate and interpret profitability, liquidity, activity and gearing measures",
    "Analyse performance by decomposing a return into margin and asset turnover",
    "Explain the limitations of financial measures used alone",
    "Explain short-termism and managerial myopia, and identify their symptoms in a scenario",
    "Recommend measures that reduce the incentive for short-term decisions",
  ],
  sections: [
    {
      id: "the-measures",
      heading: "The measures, and how to decompose them",
      blocks: [
        {
          kind: "formula",
          name: "The core financial measures",
          expr: "PROFITABILITY\n  Gross margin        =  Gross profit / Revenue\n  Operating margin    =  Operating profit / Revenue\n  ROCE                =  Operating profit / (Equity + Long-term debt)\n\nDECOMPOSITION\n  ROCE  =  Operating margin  ×  Asset turnover\n        =  (Operating profit / Revenue)  ×  (Revenue / Capital employed)\n\nLIQUIDITY\n  Current ratio       =  Current assets / Current liabilities\n  Quick ratio         =  (Current assets − Inventory) / Current liabilities\n  Working capital cycle =  Inventory days + Receivable days − Payable days\n\nGEARING\n  Gearing             =  Debt / (Debt + Equity)      or      Debt / Equity\n  Interest cover      =  Operating profit / Finance cost",
          note: "The decomposition is the single most useful tool here: it converts \"ROCE fell\" into \"ROCE fell because margin fell / because assets grew faster than sales\", which are entirely different problems with different remedies. Always state the basis you have used, because ROCE and gearing both have several defensible definitions.",
        },
        {
          kind: "example",
          title: "Decomposing a fall in ROCE",
          scenario:
            "Ashleworth Ltd reported the following. 20X4: revenue £8,000,000, operating profit £960,000, capital employed £4,800,000. 20X5: revenue £10,400,000, operating profit £1,092,000, capital employed £7,800,000. The board is pleased: revenue is up 30% and profit is up nearly 14%.",
          steps: [
            { label: "Compute ROCE for each year", detail: "20X4: £960,000/£4,800,000 = 20.0%. 20X5: £1,092,000/£7,800,000 = 14.0%. So despite growth in both revenue and profit, the return on the money invested fell by 6 percentage points — nearly a third of its former level." },
            { label: "Decompose 20X4", detail: "Operating margin = £960,000/£8,000,000 = 12.0%. Asset turnover = £8,000,000/£4,800,000 = 1.667 times. Check: 12.0% × 1.667 = 20.0% ✓." },
            { label: "Decompose 20X5", detail: "Operating margin = £1,092,000/£10,400,000 = 10.5%. Asset turnover = £10,400,000/£7,800,000 = 1.333 times. Check: 10.5% × 1.333 = 14.0% ✓." },
            { label: "Identify which driver caused the fall", detail: "Both deteriorated. Margin fell from 12.0% to 10.5%, and asset turnover from 1.667 to 1.333. Holding turnover at 1.667, the margin fall alone would have given 10.5% × 1.667 = 17.5%, so roughly 2.5 points of the 6-point fall is margin and 3.5 points is asset turnover. The larger cause is that capital employed grew 62.5% while revenue grew only 30%." },
            { label: "Say what that means commercially", detail: "The growth was BOUGHT. Ashleworth invested £3m of additional capital to win £2.4m of additional revenue, and did so at a lower margin — the classic signature of discounting to fill new capacity. That is not necessarily wrong if the new assets are not yet at full utilisation, but the board's reading of the figures is the wrong one." },
            { label: "Ask the questions the ratios cannot answer", detail: "Was the new capital invested part-way through 20X5, so a full year's return has not yet been earned? Is the margin fall a deliberate market-entry price or a permanent competitive loss? Has the growth come from new customers or from discounting to existing ones? None of this is in the ratios, and all of it changes the conclusion." },
          ],
          result:
            "**ROCE fell from 20.0% to 14.0%**, with roughly 3.5 points from asset turnover and 2.5 points from margin. The decomposition converts \"profit is up\" into the real finding: **£3m of new capital bought £2.4m of lower-margin revenue.**",
        },
        {
          kind: "table",
          caption: "What each measure adds, and what it hides",
          head: ["Measure", "Adds", "Hides"],
          rows: [
            ["**Operating margin**", "Whether pricing and cost control are holding", "Nothing about the capital tied up to earn it"],
            ["**Asset turnover**", "How hard the asset base is working", "Asset **age** — old, written-down assets flatter it (see chapter 31)"],
            ["**ROCE**", "Both together, in one figure", "Its own components, unless decomposed; and it is distorted by asset age and by leasing"],
            ["**Current / quick ratio**", "Short-term solvency", "Everything about timing within the year, and whether receivables are collectable"],
            ["**Working capital cycle**", "Cash tied up in operations, and it is often the best early-warning measure", "Whether a shortened cycle came from efficiency or from squeezing suppliers"],
            ["**Gearing / interest cover**", "Financial risk and headroom", "Off-balance-sheet obligations and the timing of refinancing"],
          ],
        },
      ],
      check: {
        q: "ROCE fell from 20% to 14% while margin fell from 12.0% to 10.5%. What does the remaining fall tell you?",
        options: [
          "Nothing — the margin explains the whole fall",
          "Asset turnover also fell, so capital employed grew faster than revenue",
          "Gearing must have increased",
          "The company made a loss on disposal",
        ],
        correct: 1,
        explain:
          "ASSET TURNOVER also fell. Margin alone at the old turnover of 1.667 would have given 17.5%, so about 3.5 of the 6 points came from capital employed growing faster than revenue — capital up 62.5% against revenue up 30%.",
      },
    },
    {
      id: "short-termism",
      heading: "Short-termism: how good figures get manufactured",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The definition worth stating precisely",
          md: "**Short-termism** (or **managerial myopia**) is a bias towards decisions that improve near-term reported performance at the expense of long-term value. It is not fraud and it usually breaks no rule — every decision below is legitimate on its own. It happens because managers are appraised annually, are often in post for two or three years, are frequently bonused on this year's profit or ROI, and **will not personally bear** the consequence of a decision whose damage appears in year four.",
        },
        {
          kind: "table",
          caption: "The seven levers, and which figures each one flatters",
          head: ["Decision", "Immediate effect on the figures", "The cost that arrives later"],
          rows: [
            ["**Cut research and development**", "Operating profit and margin rise immediately", "No pipeline; the products of three years' time do not exist"],
            ["**Cut training**", "Costs fall now", "Skills erode, quality falls, staff turnover rises"],
            ["**Defer maintenance and capital replacement**", "Profit rises, and **ROCE rises twice over** as the asset base shrinks through depreciation", "Breakdowns, downtime, larger replacement cost later"],
            ["**Cut marketing and brand spend**", "Profit rises immediately", "Brand equity decays slowly and expensively to rebuild"],
            ["**Squeeze suppliers on price or payment terms**", "Margin and the working capital cycle both improve", "Supply risk, quality decline, loss of preferred-customer status"],
            ["**Lease rather than buy**", "Capital employed falls, so ROCE rises", "Often a higher total cost of finance over the asset's life"],
            ["**Push sales into the current period; delay recognising costs**", "Revenue and profit hit the target", "Next period starts empty; the practice must escalate to keep working"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The examinable trap: every one of these looks like good performance",
          md: "A manager who cuts R&D, defers maintenance and stretches payables will show **higher margin, higher ROCE, a shorter working capital cycle and better interest cover** — an unambiguously improved set of financial measures, produced entirely by damaging the business. This is the reason non-financial measures exist, and it is the reason a scenario question gives you three years of ratios plus a paragraph mentioning that the R&D budget was reallocated. **The paragraph is where the marks are.** In an answer, name the specific decision, name the measure it flattered, and name the consequence — do not simply assert that the company is being short-termist.",
        },
        {
          kind: "list",
          title: "How to reduce the incentive",
          items: [
            "**Lengthen the appraisal period.** Judge managers on three-year rolling performance so a decision's consequences fall inside their own assessment.",
            "**Include non-financial measures** with weight attached — customer retention, quality, staff turnover, innovation (chapter 30). What is measured is what gets managed.",
            "**Ring-fence discretionary long-term spend.** Treat R&D, training and maintenance as committed budgets that a manager cannot raid to hit a target.",
            "**Use residual income with a fair charge** rather than ROI, which removes the incentive to reject good projects that dilute a high current return (chapter 31).",
            "**Pay part of any bonus in deferred equity**, so the manager still holds the consequence in three years' time.",
            "**Measure asset condition directly** — average asset age, maintenance backlog, downtime hours — because these are exactly what deferred maintenance hides from the financial statements.",
            "**Reduce the reliance on a single annual target**, since a cliff-edge bonus threshold is what makes pushing sales into the period rational in the first place.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Answering a \"comment on performance\" requirement",
          md: "Marks come from **interpretation**, not from calculation, and a page of ratios with no commentary scores badly. Work like this: compute a **small** number of relevant measures; **decompose** the headline one; identify the **trend** across the years given; connect each movement to something in the **scenario narrative**; state what the figures **cannot** tell you and what extra information you would want; and only then conclude. Also handle **comparability** explicitly — different accounting policies, revaluations, one-off items, different year ends, or a business acquired mid-year all break a comparison, and saying so is a mark.",
        },
      ],
      check: {
        q: "A manager defers maintenance and cuts R&D. What happens to the reported financial measures?",
        options: [
          "They deteriorate, revealing the problem",
          "Margin and ROCE both improve — ROCE twice over, as profit rises and the asset base shrinks through depreciation",
          "Only the current ratio changes",
          "Gearing rises",
        ],
        correct: 1,
        explain:
          "They IMPROVE. Profit rises because the spend has gone, and ROCE improves further because capital employed shrinks as assets depreciate without replacement. That is exactly why financial measures alone cannot detect this behaviour, and why non-financial measures are needed.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Producing a page of ratios with no interpretation.",
      fix: "Few measures, decomposed, connected to the scenario narrative. The marks are in the commentary.",
    },
    {
      trap: "Reading rising revenue and profit as improved performance.",
      fix: "Check the capital employed to earn it. ROCE can fall while both rise.",
    },
    {
      trap: "Failing to state the basis used for ROCE or gearing.",
      fix: "Both have several definitions; state yours so the figures can be followed.",
    },
    {
      trap: "Asserting \"the company is short-termist\" without evidence.",
      fix: "Name the decision, the measure it flattered and the later consequence.",
    },
    {
      trap: "Ignoring comparability.",
      fix: "Different policies, revaluations, one-off items and mid-year acquisitions all break comparisons — say so.",
    },
  ],
  keyTerms: [
    { term: "ROCE", def: "Operating profit as a percentage of capital employed; decomposes into operating margin times asset turnover." },
    { term: "Asset turnover", def: "Revenue divided by capital employed; how much sale each pound of capital generates." },
    { term: "Working capital cycle", def: "Inventory days plus receivable days less payable days; the period cash is tied up in operations." },
    { term: "Short-termism", def: "Favouring near-term reported performance over long-term value." },
    { term: "Managerial myopia", def: "The same behaviour viewed as a consequence of short appraisal horizons and annual bonus targets." },
  ],
  summary: [
    "Decompose ROCE into operating margin and asset turnover; it converts a movement into a diagnosis.",
    "Revenue and profit can both rise while ROCE falls, if capital employed grows faster than revenue.",
    "Every financial measure is backward-looking and says nothing about quality, customers, staff or innovation.",
    "Cutting R&D, training and maintenance improves margin and ROCE while damaging the business.",
    "Longer appraisal horizons, non-financial measures, ring-fenced budgets and deferred pay all reduce the incentive.",
  ],
  knowledgeDiagnostic: [
    { q: "How does ROCE decompose?", a: "Operating margin multiplied by asset turnover — profit/revenue times revenue/capital employed." },
    { q: "Why does deferring maintenance improve ROCE twice over?", a: "Profit rises because the spend is avoided, and capital employed falls as assets depreciate without replacement." },
    { q: "Give three symptoms of short-termism in a scenario.", a: "R&D or training budgets reallocated, maintenance deferred or capital expenditure below depreciation, and payment terms to suppliers stretched." },
    { q: "What breaks the comparability of two years' ratios?", a: "Changes in accounting policy, revaluations, one-off items, a different year end, or a business acquired part-way through a year." },
    { q: "Name three remedies for managerial myopia.", a: "Appraise over a rolling multi-year period, include weighted non-financial measures, and ring-fence discretionary long-term spend such as R&D and training." },
  ],
}

/* ── Chapter 30 · E2 ──────────────────────────────────────────── */

export const PM_TREE_30: StudyChapter = {
  id: "PM-30",
  number: 30,
  paper: "PM",
  area: "E",
  title: "Non-financial measures, the balanced scorecard and the building block model",
  minutes: 19,
  syllabusRefs: ["E2(a)", "E2(b)", "E2(c)", "E2(d)"],
  intro:
    "Non-financial measures exist because financial ones can be improved by damaging the business. This chapter covers the three frameworks that build them into a system, and how to apply one to a scenario rather than recite it.",
  outcomes: [
    "Explain why non-financial performance indicators are needed",
    "Apply the balanced scorecard's four perspectives with measures relevant to a scenario",
    "Apply the building block model to a service business",
    "Apply the performance pyramid to link strategy to operational measures",
    "Discuss the problems of implementing a multi-dimensional measurement system",
  ],
  sections: [
    {
      id: "why-and-scorecard",
      heading: "Why non-financial measures, and the balanced scorecard",
      blocks: [
        {
          kind: "text",
          md: "Chapter 29 ended with a manager showing improved margin, improved ROCE and a shorter working capital cycle while dismantling the business's future. Non-financial indicators exist to make that visible. They are **leading** rather than lagging — customer satisfaction falls before revenue does, staff turnover rises before quality drops, and defect rates move before returns appear in the accounts. They are also harder to manipulate, because there is no accounting policy that improves a delivery-on-time percentage.",
        },
        {
          kind: "table",
          caption: "The balanced scorecard: the four perspectives",
          head: ["Perspective", "The question it asks", "Typical measures"],
          rows: [
            ["**Financial**", "How do we look to our shareholders?", "ROCE, revenue growth, margin, cash flow, economic value added"],
            ["**Customer**", "How do our customers see us?", "Satisfaction score, retention rate, on-time delivery, complaints, market share, repeat order rate"],
            ["**Internal business process**", "What must we excel at?", "Defect rate, cycle time, first-time-right percentage, downtime, process cost per unit"],
            ["**Innovation and learning**", "Can we continue to improve and create value?", "Revenue from products launched in the last three years, training days per employee, staff turnover, new patents, time to market"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The scorecard's real point is causality, not balance",
          md: "The four boxes are not four separate reports. They are meant to sit in a **causal chain**: training and innovation improve internal processes, better processes improve what the customer experiences, and satisfied customers produce the financial result. So the innovation and learning perspective is the **leading indicator of everything else**, and it is also the one managers cut first under pressure — which is precisely the connection to chapter 29. In an answer, showing that chain for the specific scenario is worth far more than listing measures in four columns.",
        },
        {
          kind: "example",
          title: "Applying the scorecard to a specific business",
          scenario:
            "Highnam Dental is a group of 14 dental practices. Growth has stalled, staff turnover among hygienists has reached 30% a year, and the board measures each practice solely on monthly fee income against budget. Practice managers have responded by increasing the number of appointments per day.",
          steps: [
            { label: "Diagnose what the single measure is doing", detail: "Fee income per month rewards throughput, so managers shorten appointments. That raises income now while reducing the time each patient receives — a textbook case of a single financial measure producing a dysfunctional response." },
            { label: "Financial perspective", detail: "Keep fee income, but add **fee income per patient** and **contribution per surgery hour**, so filling the diary with short low-value appointments no longer looks like success." },
            { label: "Customer perspective", detail: "**Patient retention rate** (the measure the throughput strategy is most likely damaging), **recall attendance**, **average patient satisfaction score**, **complaints per thousand appointments**, and **new patients by referral** — referral rate being the hardest of all to fake." },
            { label: "Internal process perspective", detail: "**Average appointment duration against clinical standard**, **treatment reworked within 12 months**, **waiting time for an urgent appointment**, **surgery utilisation**, and **sterilisation compliance audit results**." },
            { label: "Innovation and learning perspective", detail: "**Hygienist turnover** (currently 30% and the most urgent figure in the business), **CPD hours per clinician**, **proportion of revenue from services introduced in the last three years** such as implants or orthodontics, and **staff engagement score**." },
            { label: "State the causal chain for this business", detail: "Hygienist turnover at 30% means constant recruitment, inconsistent care and lost patient relationships → rework and long urgent waits → patients leave and stop referring → fee income falls. So the board's single financial measure is a lagging indicator of a problem already three steps advanced, and the £ figure will be the LAST thing to move." },
            { label: "Recommend how to implement it", detail: "Five or six measures per perspective at most, with explicit targets, reported monthly to practice managers and quarterly to the board; and change the bonus so it is not driven by fee income alone — otherwise the scorecard is reporting while the incentive still rewards throughput." },
          ],
          result:
            "**The 30% hygienist turnover is the leading indicator of the stalled growth**, and fee income is the last measure that will reveal it. Applying the scorecard here means naming this business's measures and its causal chain — which is what earns marks over a generic four-box list.",
        },
      ],
      check: {
        q: "Why is the innovation and learning perspective described as the leading indicator of the other three?",
        options: [
          "Because it is the easiest to measure",
          "Because skills and innovation drive process quality, which drives customer experience, which drives the financial result",
          "Because it is the most important to shareholders",
          "Because financial measures are unreliable",
        ],
        correct: 1,
        explain:
          "It sits at the START of the causal chain: learning and innovation improve internal processes, which improve what the customer experiences, which produces the financial outcome. It is also the perspective managers cut first under pressure, which is why it needs explicit measurement.",
      },
    },
    {
      id: "other-frameworks",
      heading: "The building block model, the performance pyramid, and implementation",
      blocks: [
        {
          kind: "text",
          md: "The balanced scorecard is general. Two further frameworks are examinable and each adds something it lacks: **Fitzgerald and Moon's building block model** was designed specifically for **services**, and the **performance pyramid** (Lynch and Cross) is explicitly about **linking strategy down to daily operations**.",
        },
        {
          kind: "table",
          caption: "Fitzgerald and Moon: the building block model",
          head: ["Block", "Content", "Why it matters"],
          rows: [
            ["**Dimensions** — what to measure", "*Results:* competitiveness and financial performance. *Determinants:* quality of service, flexibility, resource utilisation, innovation", "The results are lagging and the determinants are leading. Managing the determinants is how the results are achieved"],
            ["**Standards** — the targets set", "Must be **owned** by those held to them, **achievable** so they motivate rather than discourage, and **equitable** across units facing different conditions", "This block is the reason the model suits services: staff deliver the service personally, so a standard they reject simply will not be met"],
            ["**Rewards** — how performance is recognised", "Must be **clear** so staff know what is expected, within the individual's **control**, and **motivating** in a form the recipient values", "Rewards for something outside a manager's control cause resentment and encourage manipulation"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why services need their own framework",
          md: "Services are **intangible** (there is no defective unit to inspect), **heterogeneous** (each delivery differs, so a standard cost per unit means little), **simultaneous** (produced and consumed at once, so quality cannot be checked before the customer receives it) and **perishable** (an unsold airline seat or empty hotel room is gone, which makes resource utilisation critical). That combination is why the model puts **quality of service** among the determinants and why it devotes two of its three blocks to **standards and rewards** — in a service, performance is delivered by people at the point of contact, so how they are targeted and paid *is* the performance system.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The performance pyramid",
            caption:
              "Objectives cascade DOWN from the vision; measures aggregate UP from the work centres. The left face carries external effectiveness, the right face internal efficiency.",
            data: {
              levels: [
                { label: "Corporate vision", sub: "What the organisation is for" },
                { label: "Market  ·  Financial", sub: "Business unit objectives — external | internal" },
                { label: "Customer satisfaction  ·  Flexibility  ·  Productivity", sub: "Business operating systems — flexibility spans both faces" },
                { label: "Quality  ·  Delivery  ·  Cycle time  ·  Waste", sub: "Departments and work centres — quality and delivery external, cycle time and waste internal" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The pyramid's contribution is the **two-way flow**: objectives are set top-down from the vision, while measures report bottom-up from the work centre, and every measure at the base must be traceable to an objective at the apex. Its second contribution is the **external/internal split** down the two faces — a business measuring only the right-hand side is managing efficiency while ignoring whether the market wants what it is efficiently producing. Use the pyramid in an answer where the scenario shows **operational measures disconnected from strategy** — a factory optimising machine utilisation while the strategy is rapid customisation, for instance.",
        },
        {
          kind: "list",
          title: "The implementation problems to discuss",
          items: [
            "**Too many measures.** Twenty indicators produce no focus and nobody reads the report. Five or six per perspective is the practical limit.",
            "**Conflicting measures.** Cost reduction against quality improvement, or utilisation against flexibility. The conflicts are real and must be resolved by explicit priority, not left for managers to guess.",
            "**Measurement cost and reliability.** Satisfaction surveys cost money and have low response rates; several important indicators are genuinely subjective.",
            "**Gaming.** Any measure with a reward attached will be managed rather than met — closing a support ticket to hit a resolution-time target being the standard example.",
            "**Reward misalignment.** A scorecard reported alongside a bonus based only on profit changes nothing, because the incentive still points the old way. This is the most common real-world failure.",
            "**Weighting the perspectives.** Financial results are urgent and non-financial ones are important; without explicit weights the financial measure quietly reasserts itself.",
            "**Data lag and staleness.** A quarterly survey cannot drive a monthly decision, and measures set for last year's strategy misdirect effort under this year's.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to answer a framework question",
          md: "Never recite the framework in the abstract. **Name the framework, then populate it with measures that could only come from this scenario** — the hygienist turnover, the surgery hour, the recall attendance. Two well-chosen measures per perspective with a sentence each on why that measure suits this business will outscore twelve generic ones. Then add the piece most candidates omit: **how it would be implemented and what would go wrong** — who reports it, how often, and the fact that the bonus scheme must change with it.",
        },
      ],
      check: {
        q: "In the building block model, which items are 'determinants' rather than 'results'?",
        options: [
          "Competitiveness and financial performance",
          "Quality of service, flexibility, resource utilisation and innovation",
          "Standards and rewards",
          "Customer satisfaction and market share",
        ],
        correct: 1,
        explain:
          "Quality of service, flexibility, resource utilisation and innovation are the DETERMINANTS — the leading measures a manager acts on. Competitiveness and financial performance are the RESULTS, which lag. Standards and rewards are the other two building blocks, not dimensions.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Listing the four perspectives with generic measures.",
      fix: "Populate each with measures that could only come from the given scenario, and explain why each suits it.",
    },
    {
      trap: "Presenting the scorecard as four independent reports.",
      fix: "It is a causal chain: learning drives process, process drives customer, customer drives financial.",
    },
    {
      trap: "Confusing the building block dimensions with the blocks themselves.",
      fix: "The blocks are dimensions, standards and rewards. Results and determinants sit inside the dimensions block.",
    },
    {
      trap: "Recommending a scorecard while leaving a profit-only bonus in place.",
      fix: "Rewards must move with the measures, or nothing changes.",
    },
    {
      trap: "Omitting the implementation problems from a discussion requirement.",
      fix: "Too many measures, conflict, gaming, measurement cost, weighting and data lag are all straightforward marks.",
    },
  ],
  keyTerms: [
    { term: "Balanced scorecard", def: "Kaplan and Norton's framework measuring financial, customer, internal process, and innovation and learning perspectives." },
    { term: "Leading indicator", def: "A measure that moves before the financial result, giving time to act." },
    { term: "Building block model", def: "Fitzgerald and Moon's service framework of dimensions, standards and rewards." },
    { term: "Determinants", def: "Quality of service, flexibility, resource utilisation and innovation; the leading measures that drive results." },
    { term: "Performance pyramid", def: "Lynch and Cross's cascade from corporate vision to work-centre measures, split into external effectiveness and internal efficiency." },
    { term: "Gaming", def: "Managing a measure rather than the underlying performance it is meant to represent." },
  ],
  summary: [
    "Non-financial measures are leading rather than lagging, and are far harder to manipulate than financial ones.",
    "The balanced scorecard's four perspectives form a causal chain that starts with innovation and learning.",
    "The building block model suits services because it addresses standards and rewards, where people deliver the service personally.",
    "The performance pyramid links strategy down to work-centre measures and splits external effectiveness from internal efficiency.",
    "Implementation fails on too many measures, conflicting measures, gaming, and rewards left pointing the old way.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the four balanced scorecard perspectives.", a: "Financial, customer, internal business process, and innovation and learning." },
    { q: "What are the three building blocks?", a: "Dimensions (results and determinants), standards, and rewards." },
    { q: "What three qualities must a standard have in the building block model?", a: "It must be owned by those held to it, achievable, and equitable between units facing different conditions." },
    { q: "What are the two faces of the performance pyramid?", a: "External effectiveness on one side — market, customer satisfaction, quality, delivery — and internal efficiency on the other — financial, productivity, cycle time, waste." },
    { q: "What is the most common reason a balanced scorecard fails in practice?", a: "The reward scheme is not changed with it, so the incentive still points at profit alone and behaviour does not move." },
  ],
}

export const PM_TREE_AREA_E_PART1: StudyChapter[] = [PM_TREE_29, PM_TREE_30]
