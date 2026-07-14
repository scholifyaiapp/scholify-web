import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area D — Performance evaluation & corporate failure.
 * Strategic-depth rich chapter: reward systems, the role of quality, the
 * drawbacks of performance measurement, quantitative & qualitative failure
 * prediction (Altman Z, Argenti A-score), sustainability, and Hopwood's
 * management styles. Original content; syllabus-aligned; no third-party text.
 */

export const APM_D: StudyChapter = {
  paper: "APM",
  area: "D",
  title: "Performance evaluation & corporate failure",
  minutes: 17,
  intro: "A measurement system is never neutral. Whatever you reward, you get more of — and whatever you ignore, people quietly stop doing. This chapter is about the human wiring behind the numbers, and what the numbers whisper before a company collapses.",
  outcomes: [
    "Design and critique reward systems that align managers with long-term strategy",
    "Explain why quality is a strategic performance dimension and how its cost is measured",
    "Identify the drawbacks of performance measurement — short-termism, gaming, tunnel vision and measure fixation",
    "Apply a quantitative failure model (the Altman Z-score) and place a firm in the correct zone",
    "Apply a qualitative failure model (Argenti's A-score) across defects, mistakes and symptoms",
    "Relate sustainability reporting and Hopwood's management styles to how performance is judged",
  ],
  sections: [
    {
      id: "reward",
      heading: "Performance evaluation & reward systems",
      blocks: [
        { kind: "text", md: "Performance evaluation is where the strategy on the wall becomes the behaviour on the floor. A manager does not respond to the mission statement; a manager responds to **what is measured, reported and rewarded**. So the design question is not \"is this a fair number?\" but \"if I pay a bonus on this number, what will a rational, self-interested manager actually do?\"" },
        { kind: "text", md: "A well-built reward system tries to make the selfish choice and the strategic choice the **same** choice — this is **goal congruence**. It fails when the two pull apart: when hitting the target and helping the business are different actions, the target usually wins, because the target pays the mortgage." },
        { kind: "callout", tone: "key", title: "The one idea", md: "You do not get the behaviour you want. You get the behaviour you **measure and reward**. Every drawback later in this chapter is a version of that sentence." },
        { kind: "text", md: "A useful test for any proposed measure is whether it is **controllable, comprehensive, timely and understandable**. A measure a manager cannot influence breeds resentment; a narrow measure invites neglect of everything outside it; a stale measure steers using last quarter's road; and a measure nobody understands cannot change a decision." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Four qualities of a reward measure",
          caption: "Miss any one and the measure quietly distorts behaviour instead of guiding it.",
          data: {
            items: [
              { title: "Controllable", sub: "The manager can actually move it — no reward or blame for the weather" },
              { title: "Comprehensive", sub: "Balanced enough that nothing important is left unmeasured" },
              { title: "Timely", sub: "Fresh enough to steer decisions, not autopsy them" },
              { title: "Understandable", sub: "Clear enough that a manager knows how to act on it" },
            ],
          },
        } },
        { kind: "text", md: "Reward structure matters as much as the measure. **Short-horizon** rewards (this quarter's cash bonus) buy immediate effort but tempt managers to borrow from the future. **Long-horizon** rewards (share options vesting over years, deferred bonuses, clawback clauses) tie the manager's wealth to the durable health of the business — the single most effective structural cure for short-termism." },
      ],
      check: {
        q: "A divisional manager is paid a bonus purely on this year's reported operating profit. Which behaviour does this reward structure most directly encourage?",
        options: [
          "Investing in a long-payback project that lifts profit only after year three",
          "Cutting this year's staff training and maintenance to lift this year's profit",
          "Improving product quality even where it raises current-year cost",
          "Building customer relationships that pay off over the next decade",
        ],
        correct: 1,
        explain: "A reward tied only to current-year profit makes the selfish choice \"protect this year's number.\" Cutting discretionary spend such as training and maintenance flatters current profit while damaging the future — the classic short-termism the other three options would all sacrifice. The fix is a longer reward horizon, not a better manager.",
      },
    },
    {
      id: "quality",
      heading: "The role of quality",
      blocks: [
        { kind: "text", md: "Quality is not a soft add-on to performance measurement — it is a strategic dimension in its own right, because poor quality is expensive in ways the profit statement hides. A defect caught at the customer costs a refund, a reputation and, often, the customer. The same defect caught on the line costs a few minutes of rework. **Total Quality Management (TQM)** takes this to its conclusion: build quality in at every stage so that the ideal number of defects is zero, not \"an acceptable few.\"" },
        { kind: "text", md: "The standard lens is the **four costs of quality**, split into money spent to *prevent* failure and money lost *when it fails*. The strategic insight is that the two halves trade off: spending more on the left (prevention, appraisal) sharply reduces the right (internal and external failure), and external failure — the far right — is by far the most damaging pound." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "The four costs of quality — where the damage lands",
          caption: "Illustrative weighting: money moved leftward into prevention collapses the far more costly external-failure bar.",
          data: {
            unit: "relative cost index",
            items: [
              { label: "Prevention", value: 10 },
              { label: "Appraisal", value: 15 },
              { label: "Internal failure", value: 30 },
              { label: "External failure", value: 55 },
            ],
          },
        } },
        { kind: "table", caption: "The four quality-cost categories", head: ["Category", "When it occurs", "Examples"], rows: [
          ["Prevention", "Before production, to stop defects", "Training, better design, supplier vetting, machine maintenance"],
          ["Appraisal", "During, to detect defects", "Inspection, testing, quality audits, sampling"],
          ["Internal failure", "Defect caught before the customer", "Scrap, rework, re-inspection, downtime"],
          ["External failure", "Defect reaches the customer", "Warranty claims, refunds, recalls, lost reputation and repeat sales"],
        ] },
        { kind: "callout", tone: "tip", title: "Why this is examinable", md: "External failure cost is largely **hidden and long-tailed** — the lost customer never sends an invoice. So a firm judged only on short-run cost will *under-spend* on prevention. Quality is where performance measurement and short-termism collide most visibly." },
      ],
    },
    {
      id: "drawbacks",
      heading: "The drawbacks of performance measurement",
      blocks: [
        { kind: "text", md: "Every measure is a simplification of reality, and every simplification can be exploited. The four classic failure modes below are not exotic — they appear the moment a target carries a reward. Learn to name them precisely, because APM questions ask you to *diagnose* which one is happening, not merely to say \"the target was bad.\"" },
        { kind: "table", caption: "The four drawbacks — diagnose them by their symptom", head: ["Drawback", "What the manager does", "Tell-tale symptom"], rows: [
          ["Short-termism", "Sacrifices long-term value for a near-term number", "Training, R&D and maintenance cut just before the reporting date"],
          ["Gaming / manipulation", "Distorts the measure without improving reality", "Deferring costs, pulling sales forward, 'flattering' allocations"],
          ["Tunnel vision", "Focuses only on what is measured, ignores the rest", "Measured KPIs excellent; unmeasured areas (staff morale, safety) rot"],
          ["Measure fixation", "Chases the measure, not the underlying goal it stands for", "Hits the proxy while missing the real objective it was meant to signal"],
        ] },
        { kind: "text", md: "**Tunnel vision** and **measure fixation** are easy to confuse, so pin the difference. Tunnel vision is about **scope** — the manager attends *only* to measured dimensions and neglects everything unmeasured. Measure fixation is about **substitution** — the manager pursues the *indicator itself* as if it were the goal, so hitting the number can actively harm the objective it was chosen to represent." },
        { kind: "example", title: "Worked example — naming the drawback", scenario: "A call-centre manager is targeted on 'average call handling time'. Within a month, average call time falls sharply — but customer complaints rise and repeat calls surge, because agents now hang up quickly to keep their average down, leaving problems unsolved.", steps: [
          { label: "What was the real goal?", detail: "Efficient calls were a **proxy** for the true objective: resolving customers' problems well and cheaply." },
          { label: "What did the manager optimise?", detail: "The proxy alone — call time — even at the expense of resolution, the thing the proxy was meant to signal." },
          { label: "Scope or substitution?", detail: "The agents replaced the goal (resolve the issue) with the indicator (short call). That is **substitution**, not merely a narrow focus." },
          { label: "Name it", detail: "This is **measure fixation**: the number improved while the underlying objective it stood for got worse." },
        ], result: "Diagnosis: measure fixation. The cure is a balanced measure set (e.g. add first-call-resolution and satisfaction) so no single proxy can be gamed in isolation." },
        { kind: "callout", tone: "warn", title: "Also watch for", md: "**Sub-optimisation** — a division maximises its own measured result at the group's expense (e.g. a transfer-pricing squabble that raises one division's profit but lowers total group profit). It is the divisional cousin of tunnel vision." },
      ],
      check: {
        q: "A hospital measured only on the target 'percentage of patients seen within four hours' starts turning away complex cases to protect the statistic, while its measured figure looks excellent. Which drawback is this?",
        options: [
          "Short-termism — sacrificing the long term for a near-term number",
          "Tunnel vision — excelling on the measured dimension while an unmeasured one (proper care of complex cases) is neglected",
          "Gaming through deferring costs across periods",
          "Goal congruence being fully achieved",
        ],
        correct: 1,
        explain: "The measured KPI (four-hour target) looks superb, but an unmeasured dimension — properly treating complex patients — is being sacrificed. Attending only to what is measured and neglecting what is not is tunnel vision (a scope problem). It is not short-termism (no long-vs-short trade), and goal congruence is exactly what has broken.",
      },
    },
    {
      id: "quant-failure",
      heading: "Predicting corporate failure — the quantitative route",
      blocks: [
        { kind: "text", md: "Ratios read one at a time can mislead — a firm can look liquid yet be sliding into insolvency. **Quantitative failure models** combine several ratios into a single score that has been statistically fitted to past failures. The best known is **Altman's Z-score**, which weights five ratios and reads the total against fixed cut-offs." },
        { kind: "formula", name: "Altman Z-score (manufacturing model)", expr: "Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E", note: "A = working capital / total assets · B = retained earnings / total assets · C = EBIT / total assets · D = market value of equity / total liabilities · E = sales / total assets" },
        { kind: "callout", tone: "rule", title: "Reading the three zones", md: "**Z > 2.99** — the safe zone, failure unlikely. **1.81 ≤ Z ≤ 2.99** — the grey zone, warrants caution and monitoring. **Z < 1.81** — the distress zone, high probability of failure within about two years." },
        { kind: "example", title: "Worked example — scoring Deltaform Ltd", scenario: "Deltaform, a manufacturer, reports: total assets $500m; current assets $180m; current liabilities $100m; retained earnings $90m; EBIT $60m; market value of equity $300m; total liabilities $250m; sales $600m. Compute Z and place the firm in a zone.", steps: [
          { label: "Ratio A — working capital / total assets", detail: "Working capital = 180 − 100 = 80. A = 80 / 500 = 0.16. Weighted: 1.2 × 0.16 = 0.192." },
          { label: "Ratio B — retained earnings / total assets", detail: "B = 90 / 500 = 0.18. Weighted: 1.4 × 0.18 = 0.252." },
          { label: "Ratio C — EBIT / total assets", detail: "C = 60 / 500 = 0.12. Weighted: 3.3 × 0.12 = 0.396." },
          { label: "Ratio D — market value of equity / total liabilities", detail: "D = 300 / 250 = 1.20. Weighted: 0.6 × 1.20 = 0.72." },
          { label: "Ratio E — sales / total assets", detail: "E = 600 / 500 = 1.20. Weighted: 1.0 × 1.20 = 1.20." },
          { label: "Add the five weighted terms", detail: "0.192 + 0.252 = 0.444; + 0.396 = 0.840; + 0.72 = 1.560; + 1.20 = 2.760. So Z = 2.76." },
          { label: "Place in a zone", detail: "2.76 falls between 1.81 and 2.99 → the **grey zone**." },
        ], result: "Z = 2.76 — the grey zone. Deltaform is not in immediate distress but is not clearly safe either: the weak asset-turnover (E) and thin EBIT ratio (C) are the drags to watch. Recommend closer monitoring rather than alarm." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Deltaform's Z-score against the two thresholds",
          caption: "A score of 2.76 sits inside the grey band (1.81–2.99): below the 2.99 safe line, above the 1.81 distress line.",
          data: {
            unit: "Z-score",
            items: [
              { label: "Distress line", value: 1.81 },
              { label: "Deltaform Z", value: 2.76 },
              { label: "Safe line", value: 2.99 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Limits of the Z-score", md: "The weights were fitted to **US manufacturers decades ago**, so they travel poorly to services, banks or other economies. It uses **historic** accounts, ignores qualitative red flags (a domineering CEO, a creaking market), and a single score can mask *why* a firm is weak. Treat it as a screening alarm, not a verdict." },
      ],
    },
    {
      id: "qual-failure",
      heading: "Predicting corporate failure — the qualitative route",
      blocks: [
        { kind: "text", md: "Numbers describe the wreckage; they rarely explain the driving. **Argenti's A-score** is a qualitative model that argues failure is a *process* running in a predictable order: **defects** in how the company is run lead to management **mistakes**, which eventually surface as visible **symptoms** — and only then does the company fail." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Argenti's failure sequence",
          caption: "Failure is a chain, not an event: weaknesses come first, errors follow, symptoms appear last.",
          data: {
            steps: [
              { label: "Defects", sub: "Weaknesses baked into how the firm is run" },
              { label: "Mistakes", sub: "The big errors those defects allow" },
              { label: "Symptoms", sub: "The visible signs of decline" },
              { label: "Failure", sub: "Collapse / insolvency" },
            ],
          },
        } },
        { kind: "text", md: "In the model each item carries a score; you add the marks for the weaknesses a company shows, and a total above a threshold flags it as at risk. The *content* matters more than the arithmetic for the exam — you should be able to sort a red flag into the right stage." },
        { kind: "table", caption: "The three stages of the A-score — what belongs where", head: ["Stage", "Nature", "Typical red flags"], rows: [
          ["Defects", "Structural weaknesses in management & control", "Autocratic chief executive, chair and CEO combined, passive board, weak finance function, no budgetary control, no response to change"],
          ["Mistakes", "The big errors those defects permit", "High gearing / overtrading, one 'big project' the firm cannot survive failing"],
          ["Symptoms", "The visible late signs of decline", "Deteriorating ratios, creative accounting to mask it, falling morale, and finally terminal signs"],
        ] },
        { kind: "callout", tone: "key", title: "Why qualitative beats quantitative here", md: "A Z-score can only react to accounts that already look sick. Argenti flags the **causes** — a domineering CEO, a rubber-stamp board, no budgetary control — often *years* before the ratios turn. Quantitative and qualitative models are complements: one times the alarm early, the other confirms the damage." },
        { kind: "text", md: "Note the pivotal role of **creative accounting** in the symptom stage. It is not merely a symptom but a *mask*: management dresses up the numbers precisely when reality has turned, which is why a falling Z-score accompanied by aggressive accounting policy changes is a doubly ominous pairing." },
      ],
      check: {
        q: "Under Argenti's A-score, which of the following is a DEFECT rather than a mistake or a symptom?",
        options: [
          "The company is highly geared and has overtraded",
          "The chief executive is autocratic and also chairs a passive board",
          "Key financial ratios are deteriorating year on year",
          "Management has begun using creative accounting to flatter results",
        ],
        correct: 1,
        explain: "Defects are structural weaknesses in how the firm is governed — an autocratic CEO who also chairs a passive board is the textbook defect. High gearing / overtrading is a mistake (a big error the defects allowed), while deteriorating ratios and creative accounting are late-stage symptoms. The order runs defects → mistakes → symptoms → failure.",
      },
    },
    {
      id: "sustainability-styles",
      heading: "Sustainability, the environment & management styles",
      blocks: [
        { kind: "text", md: "Performance is no longer judged on profit alone. Stakeholders now hold firms to a **triple bottom line** — economic, social and **environmental** results, sometimes phrased as *profit, people and planet*. Environmental costs that were once external — emissions, waste, water, land — are increasingly measured, priced and reported, because regulation, investors and customers now punish firms that ignore them." },
        { kind: "text", md: "The practical difficulty is that many environmental costs are **hidden inside overheads** or fall outside the firm's own accounts entirely. **Environmental management accounting (EMA)** techniques exist to drag them into view — for example **input/output flow analysis** (tracking materials in versus product and waste out), **environmental activity-based costing** (tracing environmental cost to the activities that drive it), and **lifecycle costing** (counting environmental cost from cradle to grave, not just at the point of sale)." },
        { kind: "callout", tone: "tip", title: "Link it back", md: "Sustainability is the ultimate answer to **short-termism**: a purely current-profit reward scheme is structurally blind to a cost that lands ten years out or on a third party. Building environmental measures into the scorecard is how you re-widen a manager's horizon." },
        { kind: "text", md: "Finally, *how* a manager is judged matters as much as *what* on. **Hopwood** studied how superiors use accounting data to evaluate subordinates and found three distinct styles — and, crucially, that the style drives the drawbacks from earlier in this chapter." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Hopwood's evaluation styles — the two extremes",
          caption: "Between these sits the profit-conscious style; the third, non-accounting, barely uses the numbers at all.",
          data: {
            leftTitle: "Budget-constrained",
            rightTitle: "Profit-conscious",
            rows: [
              { aspect: "Focus", left: "Meeting the short-term budget, line by line", right: "Long-run effectiveness of the unit" },
              { aspect: "Use of accounting data", left: "Rigid — a variance is a verdict", right: "Flexible — one input among many, in context" },
              { aspect: "Effect on manager", left: "High stress, meets budget at all costs", right: "Lower stress, judges the bigger picture" },
              { aspect: "Side effects", left: "Data manipulation, short-termism, poor relations", right: "Fewer distortions, better goal congruence" },
            ],
          },
        } },
        { kind: "table", caption: "Hopwood's three styles at a glance", head: ["Style", "How accounting data is used", "Typical consequence"], rows: [
          ["Budget-constrained", "Rigidly; meeting the short-term budget dominates the appraisal", "Meets budget but heavy manipulation, stress and short-termism"],
          ["Profit-conscious", "Flexibly; the budget informs a broader view of long-run success", "Cost-conscious behaviour with far fewer distortions"],
          ["Non-accounting", "Accounting data plays little part in the appraisal", "Little budget pressure; cost control may drift and slacken"],
        ] },
        { kind: "callout", tone: "key", title: "The takeaway", md: "The **profit-conscious** style tends to deliver cost-consciousness *without* the manipulation and short-termism that the rigid budget-constrained style provokes — a direct bridge back to the drawbacks and reward design that opened this chapter." },
      ],
    },
  ],
  examTraps: [
    { trap: "Blaming 'a bad manager' when a target is gamed.", fix: "Gaming, tunnel vision and short-termism are predictable responses to the reward design. Diagnose and fix the measure/horizon, not the person." },
    { trap: "Confusing tunnel vision with measure fixation.", fix: "Tunnel vision = scope (attending only to measured areas, neglecting unmeasured ones). Measure fixation = substitution (chasing the proxy itself, harming the goal it stood for)." },
    { trap: "Misremembering the Altman Z zones or the coefficients.", fix: "Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E. Safe > 2.99; grey 1.81–2.99; distress < 1.81. Learn which ratio is which letter — C (EBIT/TA) carries the heaviest weight." },
    { trap: "Putting an Argenti red flag in the wrong stage.", fix: "Order is defects (governance weaknesses) → mistakes (overtrading, one big project) → symptoms (bad ratios, creative accounting) → failure. Sort by cause-vs-consequence." },
    { trap: "Treating the Z-score as a definitive verdict.", fix: "It is a historic, manufacturer-fitted screening alarm. Pair it with a qualitative model (Argenti) and current context; a grey-zone score means monitor, not condemn." },
  ],
  keyTerms: [
    { term: "Goal congruence", def: "Alignment between a manager's self-interested actions and the organisation's strategic objectives — the aim of good reward design." },
    { term: "Cost of quality", def: "The four-way split of quality spend: prevention, appraisal, internal failure and external failure; spending on the first two suppresses the far costlier last two." },
    { term: "Measure fixation", def: "Pursuing a performance indicator as if it were the goal, so hitting the number can damage the objective the number was meant to represent." },
    { term: "Altman Z-score", def: "A quantitative failure model, Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E, read against safe (>2.99), grey (1.81–2.99) and distress (<1.81) zones." },
    { term: "Argenti A-score", def: "A qualitative failure model treating collapse as a sequence: defects (governance weaknesses) lead to mistakes, which surface as symptoms, then failure." },
    { term: "Budget-constrained style", def: "Hopwood's rigid evaluation style where meeting the short-term budget dominates appraisal — effective at hitting budget but prone to manipulation and short-termism." },
  ],
  summary: [
    "Reward what you want more of: managers respond to the measured, reported and rewarded number, so good design engineers goal congruence and a long enough horizon.",
    "Quality is a strategic dimension — prevention and appraisal spend suppresses the far costlier internal and, especially, external failure that short-term measurement hides.",
    "The four drawbacks — short-termism, gaming, tunnel vision and measure fixation — are diagnosable by symptom; balanced measures and longer horizons are the cures.",
    "Quantitative failure prediction (Altman Z = 1.2A+1.4B+3.3C+0.6D+1.0E) screens the accounts; the worked firm scored 2.76, the grey zone — monitor, do not condemn.",
    "Qualitative prediction (Argenti's defects → mistakes → symptoms) flags causes early; pair it with the Z-score, and read both alongside sustainability and Hopwood's evaluation styles.",
  ],
}
