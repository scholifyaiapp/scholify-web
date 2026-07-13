import type { AccaQuestion } from "@/lib/acca-content"
/*
 * APM bank wave S1 part B (areas C,D)
 * Blueprint: C40 D35; difficulty 22/34/19 (easy/medium/hard); 60 mcq / 15 number.
 * Date: 2026-07-13.
 * 100% original — invented companies/figures; public APM syllabus only.
 * NOTE: every computation (ROI, RI, EVA, ROCE, VFM ratios, Altman Z, bonus, quality/
 * environmental cost splits) was re-solved digit-by-digit and shown in each explanation.
 * Correct-option positions balanced across the 60 mcq: index 0/1/2/3 each = 15.
 */
export const APM_WAVE1B: AccaQuestion[] = [
  /* ═══════════ C — Strategic performance measurement (40) ═══════════ */
  {
    id: "APM3-C-01", paper: "APM", area: "C", type: "mcq",
    stem: "Which of the following best defines return on investment (ROI) as a divisional performance measure?",
    options: [
      "Controllable (operating) profit expressed as a percentage of the capital employed in the division",
      "Controllable profit less an imputed interest charge on the division's capital employed",
      "Net cash inflow divided by the initial cash outlay on the investment",
      "Profit after tax divided by the number of ordinary shares in issue",
    ],
    correct: 0,
    explanation:
      "ROI = controllable profit ÷ capital employed, shown as a %. Option 1 is residual income (profit minus an imputed capital charge). Option 2 is a cash-based return/accounting-rate confusion (ROI uses profit and capital employed, not cash flows). Option 3 is earnings per share (EPS), a shareholder-level ratio, not a divisional measure.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-02", paper: "APM", area: "C", type: "mcq",
    stem: "Residual income (RI) for a division is best described as:",
    options: [
      "Divisional profit expressed as a percentage of net assets",
      "Divisional profit after deducting an imputed interest charge on the division's net assets",
      "Divisional profit after deducting the actual interest paid on the group's borrowings",
      "Economic value added after adjusting profit and capital for accounting distortions",
    ],
    correct: 1,
    explanation:
      "RI = controllable profit − (cost of capital × net assets), an absolute money figure. Option 0 is ROI (a percentage). Option 2 uses actual interest paid, but RI charges an imputed cost of capital on net assets, not the group's cash interest. Option 3 is EVA™, which layers economic adjustments on top of the RI idea.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-03", paper: "APM", area: "C", type: "number",
    stem: "The Halden division earned controllable operating profit of $540,000 on capital employed of $3,000,000. Calculate the division's return on investment (ROI), in %, to one decimal place.",
    numericAnswer: 18, unit: "%", tolerance: 0.1,
    explanation:
      "ROI = controllable profit ÷ capital employed = 540,000 ÷ 3,000,000 = 0.18 = 18.0%. Check: 0.18 × 3,000,000 = 540,000. ✓",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-04", paper: "APM", area: "C", type: "number",
    stem: "The Corley division earned controllable profit of $462,000 on net assets of $2,800,000. The group's cost of capital is 11%. Calculate the division's residual income (RI), in $.",
    numericAnswer: 154000, unit: "$", tolerance: 0,
    explanation:
      "Imputed interest = 11% × 2,800,000 = 308,000. RI = 462,000 − 308,000 = $154,000. Check: 308,000 + 154,000 = 462,000. ✓",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-05", paper: "APM", area: "C", type: "mcq",
    stem: "Which statement best describes a key behavioural problem with using ROI to appraise divisional managers?",
    options: [
      "It cannot be calculated without first estimating the group's cost of capital",
      "It always drives managers to accept every project that has a positive net present value",
      "A manager may reject a project earning more than the cost of capital because it would lower the division's average ROI",
      "It cannot be used to compare divisions of different sizes",
    ],
    correct: 2,
    explanation:
      "A high-performing division may turn down a value-adding project simply because its return is below the current average ROI — classic sub-optimal behaviour. Option 0 is false: ROI needs no cost-of-capital estimate (that is RI's requirement). Option 1 is the opposite of the real danger. Option 3 is wrong — being a percentage, ROI actually compares different-sized divisions well; it is RI (an absolute figure) that struggles with size.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-06", paper: "APM", area: "C", type: "mcq",
    stem: "Compared with ROI, an advantage of residual income (RI) as a divisional performance measure is that it:",
    options: [
      "Gives a percentage that is easy to compare across divisions of very different sizes",
      "Does not require the group's cost of capital to be estimated",
      "Always produces a positive result",
      "Is more likely to lead managers to accept projects earning above the cost of capital, reducing dysfunctional decisions",
    ],
    correct: 3,
    explanation:
      "Because RI adds a project's positive residual income to the total, any project earning above the cost of capital raises RI, so managers are more likely to accept it — improving goal congruence. Option 0 is actually ROI's advantage (RI is an absolute figure and is size-sensitive). Option 1 is false: RI needs a cost-of-capital charge. Option 2 is false: RI is negative whenever profit is below the capital charge.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-07", paper: "APM", area: "C", type: "number",
    stem: "Corvin Co reported profit after tax of $700,000, after charging debt interest of $120,000 and a non-cash increase in provisions of $30,000. The tax rate is 25%. WACC is 10% and adjusted capital employed at the start of the year was $4,000,000. Assuming no other adjustments are required, calculate EVA™ for the year, in $.",
    numericAnswer: 420000, unit: "$", tolerance: 0,
    explanation:
      "NOPAT = profit after tax + interest net of tax + non-cash provision add-back = 700,000 + (120,000 × (1 − 0.25)) + 30,000 = 700,000 + 90,000 + 30,000 = 820,000. Capital charge = WACC × opening capital = 10% × 4,000,000 = 400,000. EVA = 820,000 − 400,000 = $420,000. Interest is added back net of tax because EVA measures return to ALL providers of finance; the WACC charge then captures the full finance cost.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-08", paper: "APM", area: "C", type: "mcq",
    stem: "Which of the following adjustments is correctly made when calculating EVA™?",
    options: [
      "Research and development written off in the year is added back to profit and treated as an investment within capital employed",
      "Accounting depreciation is added back and no depreciation of any kind is then charged",
      "Interest paid is deducted a second time to reflect the true cost of finance",
      "Increases in non-cash provisions are treated as realised cash costs and left in profit",
    ],
    correct: 0,
    explanation:
      "R&D (and marketing) that builds long-term value is capitalised: added back to NOPAT and included in capital employed. Option 1 is wrong — accounting depreciation is replaced by ECONOMIC depreciation, not eliminated. Option 2 is wrong — interest is added back (net of tax) and the WACC capital charge replaces it; deducting it twice double-counts finance cost. Option 3 is wrong — non-cash provision increases are added back to NOPAT.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-09", paper: "APM", area: "C", type: "number",
    stem: "Brantley Co reported operating profit (PBIT) of $960,000. Total assets were $6,400,000 and current liabilities were $1,400,000. Using capital employed = total assets − current liabilities, calculate ROCE, in %, to one decimal place.",
    numericAnswer: 19.2, unit: "%", tolerance: 0.1,
    explanation:
      "Capital employed = 6,400,000 − 1,400,000 = 5,000,000. ROCE = PBIT ÷ capital employed = 960,000 ÷ 5,000,000 = 0.192 = 19.2%. Check: 0.192 × 5,000,000 = 960,000. ✓",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-10", paper: "APM", area: "C", type: "mcq",
    stem: "How does EVA™ principally differ from residual income (RI)?",
    options: [
      "EVA uses exactly the same accounting profit and capital as RI, only under a different name",
      "EVA adjusts accounting profit and capital for distortions (e.g. R&D, provisions) and applies a post-tax WACC, whereas RI typically uses unadjusted accounting figures",
      "EVA is expressed as a percentage whereas RI is an absolute money amount",
      "EVA ignores the cost of capital whereas RI charges for it",
    ],
    correct: 1,
    explanation:
      "EVA is economically adjusted RI: it restates profit and capital and charges a post-tax WACC. Option 0 denies those adjustments. Option 2 is false — both EVA and RI are absolute money amounts, not percentages. Option 3 is false — both charge for capital; EVA uses WACC.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-11", paper: "APM", area: "C", type: "number",
    stem: "The Nyland division earned controllable profit of $250,000 on net assets of $1,600,000. The group's cost of capital is 9%. Calculate the division's residual income (RI), in $.",
    numericAnswer: 106000, unit: "$", tolerance: 0,
    explanation:
      "Imputed interest charge = 9% × 1,600,000 = 144,000. RI = 250,000 − 144,000 = $106,000. Check: 144,000 + 106,000 = 250,000. ✓",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-12", paper: "APM", area: "C", type: "number",
    stem: "The Aldermere division has capital employed of $2,000,000 and controllable profit of $400,000 (ROI 20%). It can invest a further $500,000 in a project generating $90,000 profit a year. The group's cost of capital is 15%. Calculate the division's ROI AFTER accepting the project, in %, to one decimal place.",
    numericAnswer: 19.6, unit: "%", tolerance: 0.1,
    explanation:
      "New profit = 400,000 + 90,000 = 490,000; new capital = 2,000,000 + 500,000 = 2,500,000. ROI = 490,000 ÷ 2,500,000 = 0.196 = 19.6%. The project's own return is 90,000 ÷ 500,000 = 18% > 15% cost of capital, so it adds value — yet it drags divisional ROI down from 20.0% to 19.6%, so an ROI-rewarded manager would wrongly reject it.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-13", paper: "APM", area: "C", type: "number",
    stem: "Estelle Co's operating profit after tax is $1,500,000. In arriving at it, the company charged accounting depreciation of $400,000 (economic depreciation is estimated at $500,000) and wrote off $200,000 of research that will benefit future years. Interest is not included in operating profit and cash taxes equal the tax charge. Adjusted opening capital employed is $8,000,000 and WACC is 11%. Calculate EVA™, in $.",
    numericAnswer: 720000, unit: "$", tolerance: 0,
    explanation:
      "NOPAT = 1,500,000 + 200,000 (add back research to capitalise it) − 100,000 (charge the extra economic depreciation of 500,000 − 400,000) = 1,600,000. Capital charge = 11% × 8,000,000 = 880,000. EVA = 1,600,000 − 880,000 = $720,000. Check: 880,000 + 720,000 = 1,600,000. ✓",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-14", paper: "APM", area: "C", type: "mcq",
    stem: "When determining the capital employed figure for an EVA™ calculation, which treatment is correct?",
    options: [
      "Deduct the cumulative goodwill previously written off",
      "Use year-end capital employed rather than the opening figure",
      "Add back cumulative R&D and marketing spend previously expensed, and add back cumulative non-cash provisions",
      "Exclude all long-term debt, because EVA is purely an equity measure",
    ],
    correct: 2,
    explanation:
      "Capital employed is grossed up for value-building spend and provisions written off in the past. Option 0 reverses the treatment — goodwill/intangibles previously written off are ADDED back, not deducted. Option 1 is wrong — EVA uses OPENING (period-start) adjusted capital, since that capital generated the year's NOPAT. Option 3 is wrong — capital employed includes debt and equity; the WACC charge reflects both.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-15", paper: "APM", area: "C", type: "mcq",
    stem: "A non-financial performance indicator (NFPI) is best described as:",
    options: [
      "A measure expressed only in monetary units, such as a profit margin",
      "A measure that is always more reliable than any financial measure",
      "A ratio combining two figures taken directly from the financial statements",
      "A measure of performance, such as customer satisfaction or defect rates, not expressed in money terms",
    ],
    correct: 3,
    explanation:
      "NFPIs track performance in non-monetary terms (quality, delivery, satisfaction). Option 0 describes a financial indicator. Option 1 overstates reliability — many NFPIs (e.g. satisfaction scores) are subjective. Option 2 is still a financial ratio built from monetary figures.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-16", paper: "APM", area: "C", type: "mcq",
    stem: "Why are NFPIs increasingly emphasised alongside financial measures?",
    options: [
      "They capture the drivers of future financial success (e.g. quality, delivery, satisfaction) that lagging financial figures alone can miss",
      "They are required by IFRS to appear in the primary financial statements",
      "They remove all subjectivity from performance measurement",
      "They make financial measures entirely unnecessary",
    ],
    correct: 0,
    explanation:
      "NFPIs are leading indicators of future financial results. Option 1 is false — IFRS does not mandate NFPIs in the primary statements. Option 2 is false — many NFPIs are inherently subjective. Option 3 overstates — NFPIs complement, not replace, financial measures.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-17", paper: "APM", area: "C", type: "mcq",
    stem: "The four perspectives of Kaplan and Norton's balanced scorecard are:",
    options: [
      "Economy, efficiency, effectiveness and equity",
      "Financial; customer; internal business process; and learning and growth",
      "Quality, flexibility, resource utilisation and innovation",
      "Strategic, tactical, operational and financial",
    ],
    correct: 1,
    explanation:
      "The four perspectives are financial, customer, internal business process, and learning and growth. Option 0 is the value-for-money 'Es' plus equity. Option 2 lists Fitzgerald and Moon's 'determinants'. Option 3 describes management levels, not the balanced scorecard.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-18", paper: "APM", area: "C", type: "mcq",
    stem: "'Average number of training days provided per employee' best fits which balanced scorecard perspective?",
    options: [
      "Financial perspective",
      "Customer perspective",
      "Learning and growth perspective",
      "Internal business process perspective",
    ],
    correct: 2,
    explanation:
      "Staff skills and training build organisational capability — the learning and growth perspective. Option 0 (financial) covers monetary returns to owners. Option 1 (customer) covers external satisfaction/retention. Option 3 (internal process) covers the efficiency of operations, such as cycle time or defect rates, not staff development.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-19", paper: "APM", area: "C", type: "mcq",
    stem: "A key benefit of the balanced scorecard is that it:",
    options: [
      "Focuses management attention solely on the financial bottom line",
      "Guarantees an increase in short-term profit",
      "Removes the need for any financial measures at all",
      "Links a range of financial and non-financial measures to strategy, giving a more balanced view of performance",
    ],
    correct: 3,
    explanation:
      "The scorecard connects measures across four perspectives to strategy, balancing short and long term and financial and non-financial. Option 0 is the opposite of its purpose. Option 1 overstates — no framework guarantees profit. Option 2 is false — the financial perspective remains one of the four.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-20", paper: "APM", area: "C", type: "mcq",
    stem: "Which statement about the balanced scorecard is correct?",
    options: [
      "The four perspectives are linked by cause and effect: improving learning and growth drives better internal processes, which improve customer outcomes and ultimately financial results",
      "Each perspective should contain exactly one measure to avoid information overload",
      "The financial perspective is deliberately excluded to force a long-term focus",
      "Measures in different perspectives are independent and should not be linked",
    ],
    correct: 0,
    explanation:
      "Kaplan and Norton built the scorecard on cause-and-effect linkages that trace back to strategy. Option 1 is false — there is no fixed number of measures per perspective. Option 2 is false — financial is one of the four perspectives. Option 3 contradicts the whole design, which depends on linking the perspectives.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-21", paper: "APM", area: "C", type: "mcq",
    stem: "In Lynch and Cross's performance pyramid, objectives and measures cascade so that:",
    options: [
      "Operational measures are set first and the corporate vision is then inferred from them",
      "The corporate vision at the apex is translated downwards into business unit, business operating system and departmental objectives and measures",
      "Only financial measures appear at every level of the pyramid",
      "External effectiveness and internal efficiency are treated as identical",
    ],
    correct: 1,
    explanation:
      "The pyramid cascades the vision down through the levels, and measures flow back up. Option 0 reverses the direction. Option 2 is wrong — lower levels emphasise operational, non-financial measures. Option 3 is wrong — the pyramid explicitly separates external effectiveness (left) from internal efficiency (right).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-22", paper: "APM", area: "C", type: "mcq",
    stem: "In the performance pyramid, the left-hand and right-hand sides respectively represent measures of:",
    options: [
      "Financial measures (left) and non-financial measures (right)",
      "Long-term measures (left) and short-term measures (right)",
      "External effectiveness — e.g. customer satisfaction, quality, delivery (left) — and internal efficiency — e.g. cycle time, waste, productivity (right)",
      "Controllable measures (left) and uncontrollable measures (right)",
    ],
    correct: 2,
    explanation:
      "The pyramid's left side captures market/customer-facing external effectiveness; the right side captures internal operating efficiency. Options 0, 1 and 3 each substitute a different (and incorrect) axis — financial vs non-financial, long vs short term, and controllable vs uncontrollable — none of which is the pyramid's left/right split.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-23", paper: "APM", area: "C", type: "mcq",
    stem: "Fitzgerald and Moon's building block model for service businesses rests on three building blocks:",
    options: [
      "Economy, efficiency and effectiveness",
      "Financial, customer and process",
      "Prevention, appraisal and failure",
      "Dimensions, standards and rewards",
    ],
    correct: 3,
    explanation:
      "The three blocks are dimensions (what to measure), standards (targets) and rewards (motivation). Option 0 is the value-for-money 'Es'. Option 1 borrows balanced-scorecard perspectives. Option 2 lists the categories of quality cost.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-24", paper: "APM", area: "C", type: "mcq",
    stem: "Within the 'dimensions' building block, Fitzgerald and Moon distinguish results from determinants. Which of the following is a RESULTS dimension?",
    options: [
      "Competitiveness (e.g. market share and sales growth)",
      "Quality of service",
      "Flexibility",
      "Innovation",
    ],
    correct: 0,
    explanation:
      "Results = competitiveness and financial performance (the outcomes). Options 1, 2 and 3 — quality, flexibility and innovation — are DETERMINANTS (together with resource utilisation): the drivers that, if managed well, produce good results. Confusing a determinant for a result is the classic trap here.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-25", paper: "APM", area: "C", type: "mcq",
    stem: "The 'standards' building block states that performance standards should have three characteristics. These are:",
    options: [
      "Prevention, appraisal and failure",
      "Ownership, achievability and fairness (equity)",
      "Economy, efficiency and effectiveness",
      "Relevance, reliability and comparability",
    ],
    correct: 1,
    explanation:
      "Standards should be owned by those working to them, achievable, and fair/equitable across the business. Option 0 lists quality-cost categories. Option 2 lists the value-for-money 'Es'. Option 3 lists qualities of useful financial information, not the standards block.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-26", paper: "APM", area: "C", type: "mcq",
    stem: "Under the 'rewards' building block, a reward scheme should satisfy three principles. Which set is correct?",
    options: [
      "Prevention, appraisal and conformance",
      "Ownership, achievability and fairness",
      "Clarity, motivation and controllability",
      "Economy, efficiency and effectiveness",
    ],
    correct: 2,
    explanation:
      "Rewards should be clear (staff understand the goals), motivating, and based on factors managers can control. Option 0 mixes quality-cost terms. Option 1 states the STANDARDS block's principles (a cross-block error). Option 3 lists the value-for-money 'Es'.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-27", paper: "APM", area: "C", type: "mcq",
    stem: "Benchmarking is best defined as:",
    options: [
      "Preparing each period's budget from a zero base",
      "Charging an imputed interest cost against divisional profit",
      "Writing performance standards into employees' contracts of employment",
      "Establishing best practice by comparing an organisation's processes and performance against a reference point, often a leading organisation",
    ],
    correct: 3,
    explanation:
      "Benchmarking compares performance/processes against a chosen standard to identify and adopt best practice. Option 0 defines zero-based budgeting. Option 1 describes residual income. Option 2 is a contractual matter unrelated to benchmarking.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-28", paper: "APM", area: "C", type: "mcq",
    stem: "Comparing your process directly against that of a rival in the same industry is an example of:",
    options: [
      "Competitive benchmarking",
      "Internal benchmarking",
      "Functional (process) benchmarking",
      "Strategic benchmarking",
    ],
    correct: 0,
    explanation:
      "Comparison against a direct competitor is competitive benchmarking. Option 1 (internal) compares units within the SAME organisation. Option 2 (functional) compares a process against organisations in DIFFERENT industries. Option 3 (strategic) compares longer-term strategic choices rather than a specific operating process.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-29", paper: "APM", area: "C", type: "mcq",
    stem: "A valid limitation of benchmarking is that:",
    options: [
      "It always breaches competition law",
      "It can encourage merely catching up with, rather than surpassing, the benchmark, and best practice elsewhere may not transfer to a different context",
      "It cannot be applied to service organisations",
      "It removes the need for any internal performance measures",
    ],
    correct: 1,
    explanation:
      "Benchmarking risks a 'catch-up' mindset, and copied practices may not suit a different culture or process. Option 0 overstates — benchmarking is not inherently illegal. Option 2 is false — services are frequently benchmarked. Option 3 is false — internal measures are still needed to act on benchmark gaps.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-30", paper: "APM", area: "C", type: "mcq",
    stem: "Value-based management (VBM) is founded on the principle that:",
    options: [
      "Managers should maximise reported accounting profit in each individual year",
      "All decisions should minimise cost regardless of the effect on revenue",
      "Management should focus on decisions and measures that maximise long-term shareholder value, aligning strategy, resources and rewards to value creation",
      "Performance should be judged solely on market share",
    ],
    correct: 2,
    explanation:
      "VBM aligns the whole organisation to long-term value creation. Option 0 pursues short-term accounting profit, which VBM warns against. Option 1 is indiscriminate cost-cutting that can destroy value. Option 3 fixates on a single metric rather than value.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-31", paper: "APM", area: "C", type: "mcq",
    stem: "Within value-based management, a 'value driver' is:",
    options: [
      "Any cost that can be removed without affecting output",
      "The accounting depreciation charged on non-current assets",
      "The dividend paid to ordinary shareholders",
      "A factor (e.g. sales growth, operating margin, working-capital efficiency or cost of capital) that has a significant impact on the value the business creates",
    ],
    correct: 3,
    explanation:
      "Value drivers are the key variables that management can influence to create value. Option 0 describes slack/waste, not a value driver. Option 1 is an accounting allocation. Option 2 is a distribution of value already created, not a driver of it.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-32", paper: "APM", area: "C", type: "mcq",
    stem: "In a value-for-money study, the 'three Es' are:",
    options: [
      "Economy, efficiency and effectiveness",
      "Economy, equity and ecology",
      "Efficiency, effectiveness and earnings",
      "Economy, effectiveness and ethics",
    ],
    correct: 0,
    explanation:
      "The three Es are economy (input cost), efficiency (output per input) and effectiveness (achieving objectives). Options 1, 3 and 4 each swap in a non-core term — equity/ecology, earnings, or ethics — that is not one of the three Es.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-C-33", paper: "APM", area: "C", type: "mcq",
    stem: "'Obtaining the required quality of inputs at the lowest possible price' is a measure of:",
    options: [
      "Efficiency",
      "Economy",
      "Effectiveness",
      "Equity",
    ],
    correct: 1,
    explanation:
      "Minimising the cost of inputs for a given quality is economy. Option 0 (efficiency) relates output to input. Option 2 (effectiveness) concerns achieving the intended outcomes. Option 3 (equity) concerns fairness of access and is not one of the three Es.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-34", paper: "APM", area: "C", type: "number",
    stem: "A public library processed 40,000 book loans during a period at a total staffing cost of $200,000. Efficiency is measured as loans achieved per $1,000 of staff cost. Calculate loans per $1,000 of staff cost, to the nearest whole number.",
    numericAnswer: 200, unit: "loans per $1,000", tolerance: 0,
    explanation:
      "Loans per $1 of staff cost = 40,000 ÷ 200,000 = 0.2. Per $1,000 = 0.2 × 1,000 = 200 loans. Check: 200 loans × ($200,000 ÷ 1,000 = 200 blocks) = 40,000 loans. ✓ This relates output (loans) to input (cost), so it is an efficiency measure.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-35", paper: "APM", area: "C", type: "mcq",
    stem: "A particular difficulty in measuring performance in not-for-profit (NFP) organisations is that:",
    options: [
      "They never have any measurable objectives",
      "Their sole objective is always to maximise profit",
      "They pursue multiple, often non-financial and conflicting objectives, and 'output' (e.g. improved welfare) is hard to quantify in money terms",
      "They are legally prohibited from measuring efficiency",
    ],
    correct: 2,
    explanation:
      "NFP bodies balance several stakeholders' objectives, and their real output resists monetary measurement. Option 0 overstates — NFP bodies do set objectives. Option 1 is false — profit is not the NFP objective. Option 3 is false — efficiency (e.g. cost per case) is routinely measured.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-36", paper: "APM", area: "C", type: "mcq",
    stem: "For a public health-screening programme, which indicator most directly measures EFFECTIVENESS (rather than economy or efficiency)?",
    options: [
      "The average price paid per test kit purchased",
      "The number of screenings carried out per nurse-hour",
      "Total programme spend compared with the budget",
      "The reduction in the incidence of the disease among the target population",
    ],
    correct: 3,
    explanation:
      "Effectiveness is about achieving the objective — here, cutting disease incidence. Option 0 is economy (input price). Option 1 is efficiency (output per input). Option 2 is financial/economy control against budget, not an outcome measure.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-37", paper: "APM", area: "C", type: "number",
    stem: "A charity budgeted $50,000 to buy 2,000 food parcels (a standard $25 each). It actually bought the 2,000 parcels for $46,000. Measuring economy as the saving on the cost of inputs, calculate the economy variance (the saving), in $.",
    numericAnswer: 4000, unit: "$", tolerance: 0,
    explanation:
      "Economy focuses on input cost. Budgeted input cost = $50,000; actual = $46,000; saving = 50,000 − 46,000 = $4,000 favourable. Equivalently, actual price per parcel = 46,000 ÷ 2,000 = $23, a $2 saving on 2,000 parcels = $4,000. ✓",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-38", paper: "APM", area: "C", type: "mcq",
    stem: "A council pays $30 per tonne less than last year for road grit, but the grit is a lower grade, so more must be spread to clear the same roads, raising total tonnage used. This is most likely an improvement in ______ at the expense of ______.",
    options: [
      "economy; efficiency",
      "efficiency; economy",
      "effectiveness; economy",
      "economy; effectiveness",
    ],
    correct: 0,
    explanation:
      "Cheaper inputs improve economy; needing more grit to clear the same roads means more input per unit of output, so efficiency worsens. Options 1 and 3 reverse or mis-pair the terms. Effectiveness (roads actually cleared) is unchanged, so any option naming effectiveness (2 and 3) is wrong.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-C-39", paper: "APM", area: "C", type: "mcq",
    stem: "Compared with residual income based on accounting figures, a claimed advantage of EVA™ is that:",
    options: [
      "It requires no estimate of the cost of capital",
      "By adjusting for accounting distortions (e.g. capitalising R&D and marketing), it better reflects economic, wealth-creating performance and reduces short-term bias",
      "It is always numerically higher than residual income",
      "It is expressed as a percentage, making divisions of different sizes directly comparable",
    ],
    correct: 1,
    explanation:
      "EVA's economic adjustments align the measure with genuine value creation and discourage cutting value-building spend. Option 0 is false — EVA uses a WACC-based capital charge. Option 2 is false — EVA can be higher or lower than RI. Option 3 is false — EVA, like RI, is an absolute money amount, not a percentage.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-C-40", paper: "APM", area: "C", type: "number",
    stem: "Using the Aldermere division (capital $2,000,000, controllable profit $400,000): it invests a further $500,000 in a project generating $90,000 profit a year. The group's cost of capital is 15%. Calculate the division's residual income (RI) AFTER accepting the project, in $.",
    numericAnswer: 115000, unit: "$", tolerance: 0,
    explanation:
      "After the project: profit = 400,000 + 90,000 = 490,000; capital = 2,000,000 + 500,000 = 2,500,000. Capital charge = 15% × 2,500,000 = 375,000. RI = 490,000 − 375,000 = $115,000. Before the project RI = 400,000 − (15% × 2,000,000 = 300,000) = 100,000, so RI RISES by $15,000 — an RI-rewarded manager correctly accepts the project (unlike under ROI, where it looked dilutive).",
    marks: 2, difficulty: "medium",
  },

  /* ═══════════ D — Performance evaluation & corporate failure (35) ═══════════ */
  {
    id: "APM3-D-01", paper: "APM", area: "D", type: "mcq",
    stem: "The main purpose of a performance-related reward system is to:",
    options: [
      "Guarantee every employee an equal share of profit",
      "Replace the need for any performance measurement",
      "Motivate managers and staff to act in ways that further the organisation's objectives (goal congruence)",
      "Reduce the total wage bill in every period",
    ],
    correct: 2,
    explanation:
      "Rewards are designed to align individual effort with organisational goals. Option 0 describes equal profit-sharing, which is not performance-related. Option 1 is false — reward schemes depend on measurement, they do not replace it. Option 3 is false — bonuses can increase, not reduce, total pay.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-02", paper: "APM", area: "D", type: "mcq",
    stem: "The controllability principle implies that a manager's reward should be based on:",
    options: [
      "The total profit of the whole group, regardless of the manager's role",
      "Factors including those wholly outside the manager's influence, to reflect business risk",
      "Movements in the company's share price only",
      "Results and factors that the manager can actually influence or control",
    ],
    correct: 3,
    explanation:
      "Managers should be judged on what they can influence. Option 0 charges them with group-wide results beyond their remit. Option 1 explicitly violates the principle by including uncontrollable factors. Option 2 relies on share price, which a divisional manager largely cannot control.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-03", paper: "APM", area: "D", type: "number",
    stem: "A manager's bonus is 5% of any profit above a target of $800,000, subject to a maximum bonus of $30,000. Actual profit for the year is $1,200,000. Calculate the bonus payable, in $.",
    numericAnswer: 20000, unit: "$", tolerance: 0,
    explanation:
      "Profit above target = 1,200,000 − 800,000 = 400,000. Bonus before cap = 5% × 400,000 = 20,000. The cap ($30,000) is not breached, so the bonus payable is $20,000. (Had the excess reached $600,000, the 5% would give $30,000 and the cap would then bind.)",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-04", paper: "APM", area: "D", type: "mcq",
    stem: "The four recognised categories of quality cost are:",
    options: [
      "Prevention, appraisal, internal failure and external failure",
      "Fixed, variable, direct and indirect",
      "Economy, efficiency, effectiveness and equity",
      "Dimensions, standards, rewards and results",
    ],
    correct: 0,
    explanation:
      "Quality costs are prevention, appraisal, internal failure and external failure. Option 1 lists general cost classifications. Option 2 lists value-for-money terms. Option 3 mixes Fitzgerald and Moon's building blocks with a dimensions element.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-05", paper: "APM", area: "D", type: "mcq",
    stem: "The cost of inspecting finished goods before dispatch is an example of a(n):",
    options: [
      "Prevention cost",
      "Appraisal cost",
      "Internal failure cost",
      "External failure cost",
    ],
    correct: 1,
    explanation:
      "Inspecting/checking conformance is an appraisal cost. Option 0 (prevention) covers stopping defects arising, e.g. training or better design. Option 2 (internal failure) is the cost of defects found before dispatch, e.g. rework or scrap. Option 3 (external failure) is the cost of defects found by the customer, e.g. warranty claims.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-06", paper: "APM", area: "D", type: "number",
    stem: "A company incurred the following: quality training $40,000; inspection of finished goods $25,000; reworking defective units found before dispatch $30,000; and warranty claims from customers $55,000. Calculate the total cost of NON-CONFORMANCE (failure costs), in $.",
    numericAnswer: 85000, unit: "$", tolerance: 0,
    explanation:
      "Non-conformance (failure) = internal failure + external failure = reworking $30,000 + warranty claims $55,000 = $85,000. Training ($40,000, prevention) and inspection ($25,000, appraisal) are conformance costs and are excluded. Check: 30,000 + 55,000 = 85,000. ✓",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-07", paper: "APM", area: "D", type: "mcq",
    stem: "Total quality management (TQM) is based on the idea that:",
    options: [
      "A certain level of defects is acceptable and should be budgeted for",
      "Quality is solely the responsibility of a dedicated inspection department",
      "Quality is everyone's responsibility, aiming at continuous improvement and getting it right first time, driving failure costs towards zero",
      "Investing in prevention is wasteful because appraisal will catch every defect",
    ],
    correct: 2,
    explanation:
      "TQM makes quality everyone's job and pursues zero defects through prevention and continuous improvement. Option 0 is the traditional 'acceptable quality level' view TQM rejects. Option 1 confines quality to inspectors, the opposite of TQM. Option 3 dismisses prevention, whereas TQM stresses it.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-08", paper: "APM", area: "D", type: "mcq",
    stem: "Under a cost-of-quality analysis, as spending on prevention and appraisal (conformance costs) rises, the expected effect on failure (non-conformance) costs is that they:",
    options: [
      "Increase, because more money is being spent overall",
      "Are unaffected, because the two are unrelated",
      "Increase in the short term and then remain permanently high",
      "Fall, because preventing and detecting defects reduces internal and external failures",
    ],
    correct: 3,
    explanation:
      "Conformance and non-conformance costs trade off: investing to prevent/detect defects cuts failure costs. Option 0 confuses total spend with the failure-cost category. Option 1 denies the trade-off that underpins the model. Option 2 is not the modelled relationship.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-09", paper: "APM", area: "D", type: "mcq",
    stem: "Short-termism, as a criticism of performance measurement, refers to:",
    options: [
      "Managers taking decisions that boost near-term measured results while harming long-term performance",
      "Measuring performance only once every few years",
      "Using non-financial measures instead of financial ones",
      "Preparing budgets for periods shorter than one year",
    ],
    correct: 0,
    explanation:
      "Short-termism sacrifices the long term (e.g. cutting R&D or training) to flatter this period's figures. Option 1 misreads the term as infrequent measurement. Option 2 is unrelated — the choice of measure type. Option 3 confuses it with the length of the budget period.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-10", paper: "APM", area: "D", type: "mcq",
    stem: "In the context of performance measurement, 'gaming' means:",
    options: [
      "Comparing performance against a competitor's results",
      "Deliberately manipulating behaviour or reported figures to hit a target, for example by distorting data or timing transactions",
      "Setting each period's target from a zero base",
      "Rewarding staff with non-cash prizes",
    ],
    correct: 1,
    explanation:
      "Gaming is manipulating the process or numbers to appear to hit a target. Option 0 describes benchmarking. Option 2 describes zero-based budgeting. Option 3 is simply a form of reward, unrelated to gaming.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-11", paper: "APM", area: "D", type: "mcq",
    stem: "'Tunnel vision', as a dysfunctional consequence of performance measurement, describes:",
    options: [
      "Setting so many measures that managers lose focus",
      "Copying a competitor's targets without adapting them",
      "Undue focus on quantified measures that are being tracked, at the expense of important areas that are not measured",
      "Deliberately falsifying the reported results",
    ],
    correct: 2,
    explanation:
      "Tunnel vision means what is measured gets attention while unmeasured but important areas are neglected. Option 0 describes information overload, a different problem. Option 1 is a benchmarking misuse. Option 3 is misrepresentation/gaming, not tunnel vision.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-12", paper: "APM", area: "D", type: "mcq",
    stem: "'Measure fixation' occurs when:",
    options: [
      "Managers ignore all performance measures",
      "The same measure is applied to every division",
      "A measure is dropped because it is inconvenient",
      "Managers pursue the specified measure itself rather than the underlying objective it is meant to represent, so behaviour is distorted",
    ],
    correct: 3,
    explanation:
      "Measure fixation is chasing the metric instead of the goal it stands for. Option 0 is the opposite (ignoring measures). Option 1 describes uniformity, a separate issue. Option 2 describes abandoning a measure, not fixating on one.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-13", paper: "APM", area: "D", type: "mcq",
    stem: "A purchasing manager rewarded solely on the price paid per component buys a large batch of the cheapest parts. Production then suffers high reject rates and line stoppages. This is best described as:",
    options: [
      "Sub-optimisation — optimising one measure (purchase price) at the expense of the organisation as a whole",
      "Economy — obtaining inputs at the lowest price, which is wholly beneficial",
      "Effectiveness — meeting the organisation's overall objective",
      "An appraisal cost — the cost of checking quality",
    ],
    correct: 0,
    explanation:
      "Improving one local metric (price) while damaging the whole is sub-optimisation. Option 1 mislabels it as pure economy and ignores the downstream harm. Option 2 is wrong — the outcome undermines the overall objective. Option 3 mislabels the situation as a category of quality cost.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-14", paper: "APM", area: "D", type: "mcq",
    stem: "An emergency department is targeted on the 'percentage of patients seen within four hours.' Staff begin admitting patients to a ward just before the four-hour mark, even when a ward bed is not clinically needed, purely to stop the clock. This behaviour is an example of:",
    options: [
      "Tunnel vision",
      "Gaming — hitting the target by manipulating the process rather than genuinely improving care",
      "Measure fixation only, with no manipulation involved",
      "Short-termism about capital investment",
    ],
    correct: 1,
    explanation:
      "Manipulating the process to appear to hit the target is gaming. Option 0 (tunnel vision) is neglecting the unmeasured, not manipulating the measured. Option 2 is too weak — there is clear manipulation, so gaming fits better than measure fixation alone. Option 3 concerns long-vs-short-term capital decisions, which is not what is happening.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-15", paper: "APM", area: "D", type: "mcq",
    stem: "Altman's Z-score model is used to:",
    options: [
      "Set the transfer price between two divisions",
      "Calculate the economic value added of a business",
      "Predict the likelihood of corporate financial failure using a combination of financial ratios",
      "Measure customer satisfaction",
    ],
    correct: 2,
    explanation:
      "The Z-score combines weighted financial ratios into a single score predicting failure risk. Option 0 (transfer pricing), option 1 (EVA) and option 3 (customer satisfaction) are unrelated applications.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-16", paper: "APM", area: "D", type: "number",
    stem: "For a manufacturer, Altman's model is Z = 1.2·X1 + 1.4·X2 + 3.3·X3 + 0.6·X4 + 1.0·X5. A company has: working capital/total assets X1 = 0.20; retained earnings/total assets X2 = 0.30; EBIT/total assets X3 = 0.20; market value of equity/book value of total liabilities X4 = 1.50; sales/total assets X5 = 0.90. Calculate the Z-score, to two decimal places.",
    numericAnswer: 3.12, unit: "", tolerance: 0.01,
    explanation:
      "Z = 1.2(0.20) + 1.4(0.30) + 3.3(0.20) + 0.6(1.50) + 1.0(0.90) = 0.24 + 0.42 + 0.66 + 0.90 + 0.90 = 3.12. Running total: 0.24 → 0.66 → 1.32 → 2.22 → 3.12. A score above ~2.99 sits in the 'safe' zone, so failure risk is low.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-17", paper: "APM", area: "D", type: "mcq",
    stem: "Using Altman's original manufacturing model, a Z-score below 1.81 indicates that a company is:",
    options: [
      "In a very strong, safe financial position",
      "In the 'grey' or uncertain zone",
      "Guaranteed to remain solvent",
      "In the 'distress' zone, with a high probability of failure",
    ],
    correct: 3,
    explanation:
      "Below 1.81 is the distress zone (high failure risk). Option 0 describes a HIGH score (above ~2.99). Option 1 describes the grey zone (roughly 1.81–2.99). Option 2 overstates — no model guarantees solvency.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-18", paper: "APM", area: "D", type: "mcq",
    stem: "Argenti's A-score model predicts corporate failure by scoring three groups of factors, namely:",
    options: [
      "Defects (in management and accounting), mistakes, and symptoms of failure",
      "Economy, efficiency and effectiveness",
      "Prevention, appraisal and failure",
      "Liquidity, gearing and profitability ratios only",
    ],
    correct: 0,
    explanation:
      "Argenti scores defects, then the mistakes they lead to, then the symptoms of failure. Option 1 lists value-for-money terms. Option 2 lists quality-cost categories. Option 3 describes a purely quantitative ratio approach — but Argenti's model is largely qualitative.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-19", paper: "APM", area: "D", type: "mcq",
    stem: "Which of the following is an example of a 'defect' in Argenti's A-score model?",
    options: [
      "A sudden collapse in the company's share price",
      "An autocratic chief executive combined with a weak, passive board",
      "Overtrading and taking on a high-risk 'big project'",
      "Creative accounting used to disguise deteriorating results",
    ],
    correct: 1,
    explanation:
      "Defects are pre-existing weaknesses in management and accounting systems — e.g. a dominant CEO and a passive board. Option 0 is a SYMPTOM of failure (a late-stage financial sign). Option 2 (overtrading, big project) is a MISTAKE that the defects lead to. Option 3 (creative accounting) is a symptom-stage behaviour, not a defect.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-20", paper: "APM", area: "D", type: "mcq",
    stem: "Which statement correctly contrasts quantitative and qualitative models of failure prediction?",
    options: [
      "The Z-score is qualitative and the A-score is quantitative",
      "Both models rely entirely on non-financial judgement",
      "The Z-score is quantitative (based on financial ratios) whereas Argenti's A-score is largely qualitative (based on judgement about management and mistakes)",
      "Neither model can give any warning of failure",
    ],
    correct: 2,
    explanation:
      "The Z-score crunches financial ratios (quantitative); the A-score scores qualitative judgements. Option 0 reverses the two. Option 1 is false — the Z-score is ratio-based, not judgement-based. Option 3 is false — both aim to give early warning.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-21", paper: "APM", area: "D", type: "number",
    stem: "For a manufacturer, Z = 1.2·X1 + 1.4·X2 + 3.3·X3 + 0.6·X4 + 1.0·X5. A company has X1 = 0.10, X2 = 0.20, X3 = 0.10, X4 = 1.00 and X5 = 1.20. Calculate the Z-score, to two decimal places.",
    numericAnswer: 2.53, unit: "", tolerance: 0.01,
    explanation:
      "Z = 1.2(0.10) + 1.4(0.20) + 3.3(0.10) + 0.6(1.00) + 1.0(1.20) = 0.12 + 0.28 + 0.33 + 0.60 + 1.20 = 2.53. Running total: 0.12 → 0.40 → 0.73 → 1.33 → 2.53. This falls in the grey/uncertain zone (roughly 1.81–2.99).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-22", paper: "APM", area: "D", type: "mcq",
    stem: "Environmental management accounting (EMA) is concerned with:",
    options: [
      "Preparing the statutory financial statements under IFRS",
      "Auditing the environmental disclosures of competitors",
      "Setting the corporation tax charge on 'green' assets",
      "Identifying, analysing and managing the environmental costs and benefits of an organisation's activities to support better decisions",
    ],
    correct: 3,
    explanation:
      "EMA brings environmental costs into management decision-making. Option 0 is financial (statutory) accounting. Option 1 is an audit activity, not EMA. Option 2 is a tax matter, not the focus of EMA.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-23", paper: "APM", area: "D", type: "mcq",
    stem: "The 'triple bottom line' approach to sustainability reporting measures performance against:",
    options: [
      "Economic (profit), environmental (planet) and social (people) dimensions",
      "Economy, efficiency and effectiveness",
      "Prevention, appraisal and failure",
      "Financial, customer and internal-process perspectives",
    ],
    correct: 0,
    explanation:
      "The triple bottom line is profit, planet and people. Option 1 lists the value-for-money 'Es'. Option 2 lists quality-cost categories. Option 3 lists three of the balanced scorecard's perspectives, which is a different framework.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-24", paper: "APM", area: "D", type: "number",
    stem: "A factory's environmental costs are: waste-disposal fees $60,000; regulatory fines for a discharge breach $25,000; environmental-compliance staff $40,000; and clean-up of contaminated land $80,000. Using a prevention/detection/failure analysis, calculate the total of environmental FAILURE costs (post-event costs — fines and clean-up), in $.",
    numericAnswer: 105000, unit: "$", tolerance: 0,
    explanation:
      "Failure (post-event) costs = fines $25,000 + clean-up $80,000 = $105,000. Waste-disposal fees ($60,000) and compliance staff ($40,000) are ongoing detection/prevention-type costs, not failure costs, so they are excluded. Check: 25,000 + 80,000 = 105,000. ✓",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-25", paper: "APM", area: "D", type: "mcq",
    stem: "'Input/output flow analysis' as an environmental accounting technique works by:",
    options: [
      "Allocating all environmental costs to a single general overhead account",
      "Recording the physical quantities of materials and energy entering a process and reconciling them with outputs, so the difference (waste) is measured and costed",
      "Charging an imputed interest cost on environmental assets",
      "Estimating only the market value of the company's carbon permits",
    ],
    correct: 1,
    explanation:
      "Input/output analysis balances physical inputs against outputs so that waste is quantified and costed. Option 0 does the opposite — burying costs in one overhead. Option 2 confuses the technique with residual income/EVA. Option 3 is far too narrow and is not what the technique does.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-26", paper: "APM", area: "D", type: "mcq",
    stem: "The main role of an information system in performance management is to:",
    options: [
      "Replace managers' judgement entirely",
      "Guarantee that all targets are met",
      "Capture, process and report timely, relevant information so that performance can be measured, monitored and improved",
      "Remove the need to set any objectives",
    ],
    correct: 2,
    explanation:
      "Information systems supply the data on which measurement and control depend. Option 0 overstates — systems support, not replace, judgement. Option 1 overstates — no system guarantees targets are hit. Option 4 is false — objectives are still required for measurement to have meaning.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-27", paper: "APM", area: "D", type: "mcq",
    stem: "Which information system is designed principally to support senior management with strategic, summarised and externally-aware information?",
    options: [
      "Transaction processing system (TPS)",
      "Office automation system",
      "Management information system (MIS) for routine tactical reports",
      "Executive information system (EIS)",
    ],
    correct: 3,
    explanation:
      "An EIS gives top management high-level, summarised, strategic and external information. Option 0 (TPS) records day-to-day operational transactions. Option 1 supports clerical/administrative tasks. Option 2 (MIS) serves middle management with routine tactical reports, not strategic/external oversight.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-28", paper: "APM", area: "D", type: "mcq",
    stem: "A commonly cited feature of 'big data' relevant to performance measurement is that it is characterised by:",
    options: [
      "High volume, velocity and variety of data drawn from many sources",
      "A small, fixed set of purely financial ledger balances",
      "Data that is always fully structured and error-free",
      "Information available only once a year in the annual report",
    ],
    correct: 0,
    explanation:
      "Big data is typically summarised by the 'three Vs' — volume, velocity, variety. Option 1 is the opposite (small and narrow). Option 2 is false — much big data is unstructured and noisy. Option 3 contradicts velocity, which stresses near-real-time flow.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-29", paper: "APM", area: "D", type: "mcq",
    stem: "For management information to be useful in performance measurement, it should above all be:",
    options: [
      "As voluminous as possible, so that nothing is ever omitted",
      "Accurate, relevant, complete, timely and understandable, with benefits exceeding the cost of providing it",
      "Restricted to financial data only",
      "Produced regardless of cost, because information always adds value",
    ],
    correct: 1,
    explanation:
      "Good information satisfies qualities such as accuracy, relevance, completeness, timeliness and understandability, subject to cost-benefit. Option 0 invites information overload, a fault. Option 2 is too narrow — non-financial data matters. Option 3 ignores the cost-benefit constraint on information.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-30", paper: "APM", area: "D", type: "mcq",
    stem: "Hopwood identified three styles in which managers use accounting and budget information to evaluate subordinates. These are the:",
    options: [
      "Autocratic, democratic and laissez-faire styles",
      "Prevention, appraisal and failure styles",
      "Budget-constrained, profit-conscious and non-accounting styles",
      "Economy, efficiency and effectiveness styles",
    ],
    correct: 2,
    explanation:
      "Hopwood's three styles are budget-constrained, profit-conscious and non-accounting. Option 0 is a general leadership typology, not Hopwood's. Option 1 lists quality-cost categories. Option 3 lists the value-for-money 'Es'.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-31", paper: "APM", area: "D", type: "mcq",
    stem: "Under Hopwood's 'budget-constrained' style, a manager is evaluated primarily on:",
    options: [
      "Long-term effectiveness, with budgets used flexibly",
      "Non-accounting factors such as quality and staff attitudes",
      "A broad balance of financial and non-financial measures",
      "The ability to meet the short-term budget, so a cost overrun is viewed unfavourably regardless of other circumstances",
    ],
    correct: 3,
    explanation:
      "The budget-constrained style rewards strict short-term budget compliance. Option 0 describes the profit-conscious style (flexible use of budgets for long-run effectiveness). Option 1 describes the non-accounting style. Option 2 describes a balanced approach, not the narrow budget focus of this style.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "APM3-D-32", paper: "APM", area: "D", type: "mcq",
    stem: "Hopwood's 'profit-conscious' style differs from the budget-constrained style because the manager:",
    options: [
      "Uses budget information with care and flexibility, judging subordinates on their contribution to long-run effectiveness rather than rigid short-term budget compliance",
      "Ignores accounting information altogether",
      "Focuses solely on meeting this period's budget, line by line",
      "Bases evaluation only on the company's share price",
    ],
    correct: 0,
    explanation:
      "The profit-conscious manager treats the budget as a guide within a long-run effectiveness focus. Option 1 describes the non-accounting style (accounting data ignored). Option 2 describes the budget-constrained style. Option 3 introduces share price, which is not part of Hopwood's model.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "APM3-D-33", paper: "APM", area: "D", type: "mcq",
    stem: "A manager tells staff that hitting the monthly cost budget matters far less to their appraisal than customer feedback, teamwork and product quality. In Hopwood's terms, this manager is applying the:",
    options: [
      "Budget-constrained style",
      "Non-accounting style",
      "Profit-conscious style",
      "Value-for-money style",
    ],
    correct: 1,
    explanation:
      "Down-weighting accounting/budget data in favour of non-financial factors is the non-accounting style. Option 0 (budget-constrained) would stress rigid budget compliance. Option 2 (profit-conscious) still relies on accounting data, used flexibly. Option 3 is not one of Hopwood's styles.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-34", paper: "APM", area: "D", type: "mcq",
    stem: "Hopwood found that, compared with the profit-conscious style, the budget-constrained style was associated with:",
    options: [
      "Lower job-related tension and less manipulation of data",
      "Better relations with colleagues and superiors",
      "Higher job-related tension, poorer relations with colleagues, and more manipulation of accounting data — even though short-term cost control could look tight",
      "No effect on behaviour of any kind",
    ],
    correct: 2,
    explanation:
      "Rigid short-term budget pressure raised tension and encouraged data manipulation. Options 0 and 1 state the opposite of Hopwood's findings. Option 3 is false — the style clearly changed behaviour, which was the point of his study.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "APM3-D-35", paper: "APM", area: "D", type: "mcq",
    stem: "Contingency thinking suggests that a rigid budget-constrained style is LEAST appropriate when:",
    options: [
      "The environment is stable and tasks are highly programmable",
      "Costs are easy to standardise and predict",
      "Interdependence between departments is very low",
      "The environment is uncertain and departments are highly interdependent, so rigid budget targets distort behaviour and encourage dysfunctional manipulation",
    ],
    correct: 3,
    explanation:
      "In uncertain, highly interdependent settings, rigid budget targets are unfair and distorting, so the style fits worst. Options 0, 1 and 2 each describe stable, predictable or low-interdependence conditions — precisely where a tight budget-constrained style is more workable, not least appropriate.",
    marks: 2, difficulty: "hard",
  },
]
