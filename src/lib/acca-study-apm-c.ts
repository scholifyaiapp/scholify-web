import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area C — Strategic performance measurement.
 * Strategic depth, computational: financial measures (ROI, RI, EVA with NOPAT
 * adjustments), the ROI-vs-RI divisional problem, NFPIs, the balanced scorecard,
 * the performance pyramid, the building block model, benchmarking, value-based
 * management, and value for money in the not-for-profit / public sector.
 * Original, syllabus-aligned; every calculation re-solved digit-by-digit.
 */

export const APM_C: StudyChapter = {
  paper: "APM",
  area: "C",
  title: "Strategic performance measurement",
  minutes: 18,
  intro: "A single number can flatter a division to death. This chapter is about choosing measures that reward the decisions a company actually wants — financial and non-financial, short-term and strategic.",
  outcomes: [
    "Calculate and interpret ROI, residual income and EVA, including the NOPAT and capital adjustments",
    "Explain why ROI drives dysfunctional divisional decisions and how RI and EVA correct them",
    "Apply the balanced scorecard, the performance pyramid and the building block model to a scenario",
    "Distinguish the types of benchmarking and the idea of value-based management",
    "Assess performance in the not-for-profit and public sector using value for money and the 3 Es",
  ],
  sections: [
    {
      id: "financial-measures",
      heading: "Measuring divisional financial performance",
      blocks: [
        { kind: "text", md: "Once a company splits into **investment centres** — divisions whose managers control revenue, costs **and** the assets they use — head office needs a single figure to answer: is this division earning enough on the capital tied up in it? Three measures dominate the exam: **return on investment (ROI)**, **residual income (RI)** and **economic value added (EVA)**. Each takes the same two ingredients — a **profit** and a **capital employed** — and combines them differently." },
        { kind: "formula", name: "Return on investment (ROI)", expr: "ROI = Controllable operating profit / Capital employed x 100%", note: "A relative measure — a percentage. Also called return on capital employed (ROCE) at entity level." },
        { kind: "formula", name: "Residual income (RI)", expr: "RI = Controllable operating profit - (Capital employed x cost of capital)", note: "An absolute measure — a money amount left after charging for the capital used. The bracket is the imputed interest charge." },
        { kind: "text", md: "**ROI** is intuitive and lets you compare divisions of different sizes, which is why boards love it. But it hides a trap: because it is a **ratio**, a manager improves it not only by earning more, but by shrinking the denominator — declining good investment, or simply letting assets get old. As plant depreciates, **net book value** falls year after year, so the same profit divides by an ever-smaller capital base and ROI **drifts upward** with no real improvement. That silently rewards divisions with old, run-down assets and punishes those who reinvest." },
        { kind: "callout", tone: "rule", title: "The core distinction", md: "**ROI is relative** (a %) and tempts managers to reject good projects that would dilute their average. **RI is absolute** (a $) and charges for capital directly, so any project earning **more than the cost of capital** adds to RI. That single difference is the heart of this whole area." },
      ],
    },
    {
      id: "roi-vs-ri",
      heading: "The ROI-vs-RI problem — worked comparison",
      blocks: [
        { kind: "text", md: "The classic exam scenario shows the two measures pulling a manager in **opposite directions**. Work it slowly; the arithmetic is easy but the interpretation earns the marks." },
        { kind: "example", title: "Worked example — a good project that ROI rejects", scenario: "The Delta division has capital employed of $2,000,000 and earns controllable operating profit of $400,000. The group cost of capital is 15%. Delta's manager can take on a new project costing $500,000 that would generate additional profit of $85,000 a year. The manager's bonus depends on the division's ROI. Should the manager accept — and is that good for the group?", steps: [
          { label: "Current ROI", detail: "400,000 / 2,000,000 = 0.20 = 20%. Delta already looks like a star division." },
          { label: "Current RI", detail: "Capital charge = 2,000,000 x 15% = 300,000. RI = 400,000 - 300,000 = $100,000 positive." },
          { label: "Project's own return", detail: "85,000 / 500,000 = 0.17 = 17%. Because 17% is above the 15% cost of capital, the project is worthwhile for the group." },
          { label: "Divisional ROI if accepted", detail: "New profit = 400,000 + 85,000 = 485,000. New capital = 2,000,000 + 500,000 = 2,500,000. New ROI = 485,000 / 2,500,000 = 0.194 = 19.4%." },
          { label: "The ROI verdict", detail: "ROI falls from 20.0% to 19.4%, so a bonus-on-ROI manager REJECTS the project to protect the average — even though it earns above the cost of capital." },
          { label: "The RI verdict", detail: "Project RI = 85,000 - (500,000 x 15%) = 85,000 - 75,000 = +$10,000. Divisional RI rises from 100,000 to 110,000, so an RI-judged manager ACCEPTS — the goal-congruent decision." },
        ], result: "The project is good for the group (17% > 15%), yet ROI tells the manager to turn it down while RI tells the manager to take it. ROI can drive dysfunctional, sub-optimal decisions; RI aligns the manager with the group because it charges for capital at the true cost." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Why the ROI manager balks",
          caption: "The project's 17% beats the 15% cost of capital, but sits below the division's 20% average — so accepting it drags ROI down to 19.4%.",
          data: {
            unit: "%",
            items: [
              { label: "Current ROI", value: 20 },
              { label: "ROI if accepted", value: 19.4 },
              { label: "Project return", value: 17 },
              { label: "Cost of capital", value: 15 },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "ROI vs residual income",
          data: {
            leftTitle: "ROI (relative)",
            rightTitle: "Residual income (absolute)",
            rows: [
              { aspect: "Expressed as", left: "A percentage", right: "A money amount ($)" },
              { aspect: "Capital cost", left: "Not charged explicitly", right: "Charged as imputed interest" },
              { aspect: "Accept-a-project rule", left: "Only if it beats the current average", right: "If return exceeds the cost of capital" },
              { aspect: "Goal congruence", left: "Can be dysfunctional", right: "Aligned with group value" },
              { aspect: "Comparing divisions", left: "Easy — size-neutral %", right: "Harder — bigger divisions show bigger RI" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "RI is not perfect either", md: "RI's absolute figure makes it hard to compare a small division against a large one — a bigger capital base tends to produce a bigger RI regardless of quality. It also still relies on accounting profit and book capital, both of which can be distorted. **EVA** is the next refinement." },
      ],
      check: {
        q: "A division earns an ROI of 20%. It can invest in a project returning 17%, when the group cost of capital is 15%. If the manager is judged on ROI, what will most likely happen — and is it best for the group?",
        options: [
          "Accept, because the project return beats the cost of capital and ROI will rise",
          "Reject, because the 17% is below the division's 20% average and would dilute ROI, even though 17% > 15% makes it good for the group",
          "Accept, because residual income on the project is negative",
          "Reject, because the project earns less than the cost of capital",
        ],
        correct: 1,
        explain: "The project's 17% return sits above the 15% cost of capital, so it adds value for the group (positive RI). But 17% is below the division's existing 20% ROI, so taking it drags the average down (to 19.4% here). A manager rewarded on ROI therefore rejects a genuinely good project — the classic dysfunctional decision that RI and EVA are designed to avoid.",
      },
    },
    {
      id: "eva",
      heading: "Economic value added (EVA) and the NOPAT adjustments",
      blocks: [
        { kind: "text", md: "**EVA** is residual income rebuilt on **economic** rather than accounting foundations. It replaces accounting profit with **NOPAT** (net operating profit after tax) and charges for capital at the **weighted average cost of capital (WACC)** applied to an **adjusted** capital base. The logic: accounting rules understate the true capital a business has invested and distort its real profit, so EVA reverses the biggest distortions before measuring value created." },
        { kind: "formula", name: "Economic value added (EVA)", expr: "EVA = NOPAT - (Adjusted capital employed x WACC)", note: "Positive EVA = the business earned more than the cost of all its finance = shareholder value created." },
        { kind: "formula", name: "NOPAT", expr: "NOPAT = Adjusted operating profit - Adjusted (cash) tax", note: "Profit is measured BEFORE interest, because the financing cost is captured in full by the WACC capital charge." },
        { kind: "text", md: "The examinable **adjustments** follow a consistent idea: spending that builds the future (research, brand-building advertising, staff training) is really **investment**, not an expense, so it is **added back to profit** and **added to capital**. Non-cash accounting entries (increases in provisions, goodwill written off, amortisation) are reversed too. Interest is **not** deducted from NOPAT — and because interest already saved tax in the accounts, the tax figure must be grossed back up." },
        { kind: "example", title: "Worked example — an EVA with adjustments", scenario: "For the year, Kestrel Co reports operating profit before interest and tax of $1,200,000 and a tax charge of $300,000. During the year it wrote off $150,000 of research spend that builds long-term capability, increased a general provision by $40,000, and charged $30,000 of goodwill impairment. Interest paid was $200,000 and the tax rate is 25%. Opening capital employed (equity + debt) was $5,000,000; cumulative goodwill previously written off is $200,000. WACC is 10%. Calculate EVA.", steps: [
          { label: "1 — Adjust operating profit", detail: "Start 1,200,000. Add back research 150,000 (it is investment), the provision increase 40,000 (non-cash), and goodwill impairment 30,000 (non-cash). Adjusted operating profit = 1,200,000 + 150,000 + 40,000 + 30,000 = 1,420,000." },
          { label: "2 — Adjust the tax", detail: "The 300,000 charge was reduced by tax relief on interest. Add that relief back: 200,000 x 25% = 50,000. Adjusted cash tax = 300,000 + 50,000 = 350,000." },
          { label: "3 — NOPAT", detail: "NOPAT = 1,420,000 - 350,000 = 1,070,000. Note interest itself is NOT deducted here." },
          { label: "4 — Adjust the capital", detail: "Start 5,000,000. Add back the research now treated as an asset 150,000, the provision 40,000, and cumulative goodwill written off 200,000. Adjusted capital = 5,000,000 + 150,000 + 40,000 + 200,000 = 5,390,000." },
          { label: "5 — Capital charge", detail: "5,390,000 x 10% = 539,000." },
          { label: "6 — EVA", detail: "EVA = NOPAT - capital charge = 1,070,000 - 539,000 = $531,000." },
        ], result: "EVA is +$531,000. Kestrel earned $531,000 more than the total cost of the finance invested in it, so it created shareholder value in the year. The research add-back both lifts NOPAT and enlarges the capital charged for — EVA rewards value-building spend instead of penalising it as an expense." },
        { kind: "callout", tone: "tip", title: "EVA vs RI in one line", md: "**RI** uses accounting profit and book capital against the **cost of capital**. **EVA** uses **NOPAT** and an **economically adjusted** capital base against **WACC**. Same shape (profit minus a capital charge); EVA just cleans the inputs first." },
      ],
    },
    {
      id: "nfpi-bsc",
      heading: "Beyond the numbers — NFPIs and the balanced scorecard",
      blocks: [
        { kind: "text", md: "Financial measures share three weaknesses: they are **backward-looking**, easily **manipulated** in the short term (cut training, delay maintenance and this year's profit jumps), and silent on the **drivers** of future performance — customer loyalty, quality, innovation, staff skill. **Non-financial performance indicators (NFPIs)** fill that gap: defect rates, on-time delivery, customer retention, employee turnover. They are harder to manipulate and warn earlier, but there are many of them and no common unit, so they need a framework to stay coherent." },
        { kind: "text", md: "**Kaplan and Norton's balanced scorecard** is that framework. It views the business from **four linked perspectives**, deliberately balancing financial with non-financial and short-term with long-term. The perspectives are joined by **cause and effect**: better learning and growth improves internal processes, which delights customers, which ultimately drives financial results." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The four perspectives of the balanced scorecard",
          caption: "Each perspective answers a question, and the arrows of cause-and-effect run upward from learning to financial.",
          data: {
            items: [
              { title: "Financial", sub: "To succeed financially, how should we appear to shareholders? e.g. EVA, ROI, revenue growth" },
              { title: "Customer", sub: "To achieve our vision, how should customers see us? e.g. retention, satisfaction, market share" },
              { title: "Internal business process", sub: "What must we excel at? e.g. cycle time, defect rate, on-time delivery" },
              { title: "Learning and growth", sub: "How do we sustain change and improvement? e.g. staff training, skills, new-product revenue" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Not just a pile of ratios", md: "A scorecard fails when managers bolt a few non-financial numbers onto the accounts and call it balanced. The discipline is to keep the measures **few**, link them by **cause and effect**, and derive each from **strategy** — otherwise it becomes an unfocused dashboard nobody acts on." },
      ],
      check: {
        q: "Which balanced scorecard perspective does 'number of staff training days per employee' primarily measure?",
        options: [
          "Financial",
          "Customer",
          "Internal business process",
          "Learning and growth",
        ],
        correct: 3,
        explain: "Training builds the capability and skills a business needs to keep improving in the future, which is exactly the learning and growth perspective (how do we sustain change and improvement?). It is a leading indicator: today's training feeds better processes, then happier customers, then financial results.",
      },
    },
    {
      id: "frameworks",
      heading: "Strategic frameworks — pyramid, building blocks, benchmarking, VBM",
      blocks: [
        { kind: "text", md: "Two further models push measurement to connect the **shop floor with strategy**. **Lynch and Cross's performance pyramid** cascades the corporate vision downward into ever more operational measures, and streams them into two sides — an **external, market-facing** side (customer satisfaction, quality, delivery) and an **internal, efficiency-facing** side (productivity, cycle time, waste). The higher you go, the more strategic; the lower you go, the more day-to-day." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "Lynch and Cross performance pyramid",
          caption: "Objectives cascade down from the vision; measures are reported back up. Left of each operating level is market-facing, right is efficiency-facing.",
          data: {
            levels: [
              { label: "Corporate vision", sub: "The overarching strategy set by top management" },
              { label: "Business units", sub: "Market objectives and financial objectives" },
              { label: "Business operating systems", sub: "Customer satisfaction, flexibility and productivity" },
              { label: "Departments & work centres", sub: "Quality, delivery, cycle time and waste" },
            ],
          },
        } },
        { kind: "text", md: "**Fitzgerald and Moon's building block model** was built for **service** businesses (where output is intangible and consumed as it is produced). It has three blocks. **Dimensions** are the things you measure, split into **results** (competitiveness, financial performance) and their **determinants** (quality, flexibility, resource utilisation, innovation) — the insight being that today's determinants drive tomorrow's results. **Standards** must have three qualities: **ownership** (staff help set them), **achievability**, and **equity/fairness**. **Rewards** must be **clear**, **motivating**, and based only on what the manager can **control**." },
        { kind: "text", md: "**Benchmarking** improves performance by comparing against a reference point. **Internal** benchmarking compares similar units within the group; **competitive** benchmarking compares against a direct rival; **functional/process** benchmarking compares a process (e.g. warehousing) against a best-in-class organisation in **any** industry; **strategic** benchmarking compares strategies of high-performing companies. **Value-based management (VBM)** ties it all together — it runs the whole company to maximise **shareholder value**, cascading value drivers into targets, aligning decisions and rewards (often on EVA) with the goal of creating value above the cost of capital." },
        { kind: "callout", tone: "key", title: "Why so many models", md: "The scorecard gives **perspectives**, the pyramid gives a **hierarchy** linking strategy to operations, and the building blocks give **service-sector dimensions plus fair standards and rewards**. In the exam, pick the model that fits the scenario and use its own language — do not force one framework onto every case." },
      ],
    },
    {
      id: "not-for-profit",
      heading: "Not-for-profit, public sector and value for money",
      blocks: [
        { kind: "text", md: "A charity, hospital or school has **no profit figure** to judge success — the objective is a **service or social outcome**, not a return. Performance is therefore measured as **value for money (VFM)**: getting the most from the resources the organisation is given. VFM is assessed through the **3 Es**, and a good answer keeps them strictly separate." },
        { kind: "formula", name: "Value for money — the 3 Es", expr: "Economy (cheap inputs) + Efficiency (output per input) + Effectiveness (objectives met)", note: "Economy and efficiency concern how resources are used; effectiveness concerns whether the mission is achieved." },
        { kind: "table", caption: "The 3 Es applied to a public hospital", head: ["E", "Meaning", "Hospital example"], rows: [
          ["Economy", "Obtaining inputs at the lowest cost for a given quality", "Cost per nurse hired; price paid for supplies"],
          ["Efficiency", "Maximising output from a given input (output / input)", "Cost per patient treated; patients per bed per year"],
          ["Effectiveness", "The extent to which objectives are actually achieved", "Recovery rates; readmission rates; patient survival"],
        ] },
        { kind: "callout", tone: "warn", title: "The trap in the Es", md: "Do not chase economy and efficiency at the expense of effectiveness. A hospital that buys the cheapest supplies (economy) and treats the most patients per bed (efficiency) but whose patients do not recover (effectiveness) has poor value for money. Cheap and busy is not the same as successful." },
        { kind: "text", md: "Not-for-profit performance is hard to measure because objectives are **multiple and sometimes conflicting**, **outputs are non-financial and hard to quantify** (how do you value an educated child?), and there is **no single bottom line**. The practical answer is a spread of NFPIs and VFM indicators, often benchmarked against similar organisations, rather than one headline number." },
      ],
      check: {
        q: "A public hospital reports its 'cost per patient treated'. Which of the 3 Es does this measure relate to?",
        options: [
          "Economy",
          "Efficiency",
          "Effectiveness",
          "None of the 3 Es",
        ],
        correct: 1,
        explain: "Cost per patient treated relates an input (cost) to an output (patients treated), which is exactly efficiency — output per unit of input. Economy would be the cost of buying the inputs themselves (e.g. the wage rate paid), and effectiveness would be whether the objective was met (e.g. recovery or survival rates).",
      },
    },
  ],
  examTraps: [
    { trap: "Using ROI to judge divisions and being surprised by rejected good projects.", fix: "ROI tempts managers to reject any project below their current average, even one above the cost of capital. Use RI (or compare the project return to the cost of capital) for goal-congruent decisions." },
    { trap: "Deducting interest inside NOPAT when calculating EVA.", fix: "NOPAT is before interest — the full financing cost is charged once, through the WACC capital charge. Deducting interest as well double-counts it. Instead, add the tax relief on interest back to the tax figure." },
    { trap: "Treating EVA and residual income as the same calculation.", fix: "RI uses accounting profit, book capital and the cost of capital. EVA adjusts profit to NOPAT, adds investment-type spend back into an economic capital base, and charges at WACC." },
    { trap: "Calling a bolt-on of a few non-financial ratios a 'balanced scorecard'.", fix: "The scorecard needs four linked perspectives, few strategy-driven measures, and cause-and-effect running from learning and growth up to financial results." },
    { trap: "Confusing the 3 Es of value for money.", fix: "Economy = buying inputs cheaply; efficiency = output per input; effectiveness = objectives achieved. Cost per unit is efficiency, not economy." },
    { trap: "Letting ROI drift upward on ageing assets and reading it as improvement.", fix: "As net book value falls with depreciation, the same profit divides by a smaller base and ROI rises with no real gain. Watch the asset age before praising a rising ROI." },
  ],
  keyTerms: [
    { term: "Return on investment (ROI)", def: "Controllable operating profit as a percentage of capital employed; a relative measure that can drive divisions to reject value-adding projects." },
    { term: "Residual income (RI)", def: "Operating profit less an imputed interest charge (capital employed x cost of capital); an absolute money measure that accepts any project earning above the cost of capital." },
    { term: "Economic value added (EVA)", def: "NOPAT less a charge for adjusted capital at WACC; residual income rebuilt on economic rather than accounting inputs. Positive EVA means value created." },
    { term: "NOPAT", def: "Net operating profit after tax, measured before interest, with investment-type spend added back and tax grossed up for interest relief." },
    { term: "Balanced scorecard", def: "Kaplan and Norton's four linked perspectives — financial, customer, internal process, and learning and growth — connected by cause and effect." },
    { term: "Building block model", def: "Fitzgerald and Moon's service-sector framework: dimensions (results and determinants), standards (ownership, achievability, equity) and rewards (clear, motivating, controllable)." },
    { term: "Value for money (3 Es)", def: "The not-for-profit performance test: economy (cheap inputs), efficiency (output per input) and effectiveness (objectives met)." },
  ],
  summary: [
    "ROI is a relative % that hides a capital charge and can drive dysfunctional rejection of good projects; RI charges for capital explicitly and accepts any return above the cost of capital.",
    "EVA refines RI: NOPAT (before interest, with investment spend added back) less adjusted capital times WACC — here 1,070,000 - 539,000 = $531,000 of value created.",
    "Financial measures are backward-looking and manipulable, so NFPIs and the balanced scorecard's four linked perspectives add the drivers of future performance.",
    "The performance pyramid links vision to operations; the building block model fits services; benchmarking and value-based management focus the whole business on shareholder value.",
    "Not-for-profit and public sector performance is judged by value for money through the 3 Es — economy, efficiency and effectiveness — kept strictly distinct.",
  ],
}
