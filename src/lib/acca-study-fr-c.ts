import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area C — Analysing & interpreting financial statements.
 * Rich study chapter matching the FA_A exemplar for depth, tone and visuals.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Every ratio and worked
 * figure is computed from ONE internally consistent set of accounts
 * (Harbex Trading Co, 20X4 and 20X5) and checked digit-by-digit.
 */

export const FR_C: StudyChapter = {
  paper: "FR",
  area: "C",
  title: "Analysing & interpreting financial statements",
  minutes: 17,
  intro: "A set of accounts is just data until someone asks it a question. Ratio analysis turns the numbers into a story — is this business more profitable, more liquid and more solvent than last year, and can it pay its way?",
  outcomes: [
    "Explain the purpose of analysis and read the statements from a specific user's point of view",
    "Calculate and interpret profitability ratios — gross, operating and net margin, and ROCE",
    "Calculate and interpret liquidity and working-capital ratios, including the cash operating cycle",
    "Calculate and interpret gearing and investor ratios — gearing, interest cover, EPS, P/E and dividend cover",
    "Explain how accounting policy choices distort ratios, and state the limitations of ratio analysis",
  ],
  sections: [
    {
      id: "why",
      heading: "Why we analyse — and for whom",
      blocks: [
        { kind: "text", md: "A single ratio on its own means almost nothing. **Is a gross margin of 40% good?** You cannot say until you compare it — against **last year**, against a **competitor**, against the **industry average**, or against a **budget**. Analysis is the disciplined act of turning raw figures into comparisons, and comparisons into a judgement about performance, position and prospects." },
        { kind: "text", md: "Crucially, the **same** statements answer **different** questions depending on who is reading. A shareholder cares about return and growth; a bank cares about whether the loan will be repaid; a supplier cares only about being paid on time. Good analysis always starts by asking: **whose decision is this, and which ratios speak to it?**" },
        { kind: "callout", tone: "key", title: "The one idea", md: "Ratios exist to make figures **comparable** — over time, across companies, against a benchmark — so a user can judge **profitability, liquidity and solvency** and make an economic decision." },
        { kind: "text", md: "Every calculation in this chapter is drawn from one consistent set of accounts, so the numbers tie together. Keep these figures to hand — every ratio below is worked from them." },
        { kind: "table", caption: "Harbex Trading Co — statement of profit or loss (extract), $000", head: ["", "20X5", "20X4"], rows: [
          ["Revenue (all on credit)", "5,000", "4,000"],
          ["Cost of sales", "(3,000)", "(2,560)"],
          ["Gross profit", "2,000", "1,440"],
          ["Operating expenses", "(1,000)", "(840)"],
          ["Operating profit (PBIT)", "1,000", "600"],
          ["Finance costs", "(200)", "(150)"],
          ["Profit before tax", "800", "450"],
          ["Income tax", "(200)", "(150)"],
          ["Profit for the year", "600", "300"],
        ] },
        { kind: "table", caption: "Harbex Trading Co — statement of financial position (extract), $000", head: ["", "20X5", "20X4"], rows: [
          ["Property, plant & equipment", "4,500", "3,300"],
          ["Inventory", "600", "560"],
          ["Trade receivables", "800", "600"],
          ["Cash", "100", "240"],
          ["Total assets", "6,000", "4,700"],
          ["Share capital ($1 ordinary shares)", "1,000", "1,000"],
          ["Revaluation surplus", "200", "0"],
          ["Retained earnings", "1,800", "1,500"],
          ["10% loan notes (non-current)", "2,000", "1,500"],
          ["Trade payables", "700", "550"],
          ["Tax payable", "200", "150"],
          ["Bank overdraft", "100", "0"],
          ["Total equity & liabilities", "6,000", "4,700"],
        ] },
        { kind: "callout", tone: "tip", md: "Also given: the 20X5 dividend was **$300k**, the 20X5 market price was **$6.00** per share, and there are **1,000,000** ordinary shares in issue throughout. We will need these for the investor ratios." },
      ],
    },
    {
      id: "profitability",
      heading: "Profitability — margins and ROCE",
      blocks: [
        { kind: "text", md: "Profitability ratios ask: **how much profit does the business squeeze out of its sales, and out of the capital invested in it?** Start at the top of the income statement and work down — each margin strips out another layer of cost." },
        { kind: "formula", name: "Gross profit margin", expr: "Gross profit / Revenue x 100", note: "How much of every sales dollar survives after the direct cost of what was sold." },
        { kind: "formula", name: "Operating profit margin", expr: "Operating profit (PBIT) / Revenue x 100", note: "Margin after operating expenses but before interest and tax." },
        { kind: "formula", name: "Net profit margin", expr: "Profit for the year / Revenue x 100", note: "The final margin — after interest and tax." },
        { kind: "example", title: "Worked example — the three margins", scenario: "Compute Harbex's gross, operating and net margins for 20X5 and 20X4, and describe the movement.", steps: [
          { label: "Gross margin 20X5", detail: "2,000 / 5,000 = 0.40 = 40.0%. 20X4: 1,440 / 4,000 = 36.0%. Up 4 points." },
          { label: "Operating margin 20X5", detail: "1,000 / 5,000 = 20.0%. 20X4: 600 / 4,000 = 15.0%. Up 5 points." },
          { label: "Net margin 20X5", detail: "600 / 5,000 = 12.0%. 20X4: 300 / 4,000 = 7.5%. Up 4.5 points." },
          { label: "Read the gaps", detail: "Operating margin rose MORE than gross margin (5 vs 4 points) — so operating expenses grew slower than revenue, i.e. good cost control on overheads as well as on cost of sales." },
        ], result: "Every margin improved. Gross margin up (better buying, pricing or product mix), and overheads well controlled, so operating and net margins improved even further. A genuinely more profitable year." },
        { kind: "diagram", diagram: {
          type: "donut",
          title: "Where each $5,000 of 20X5 revenue goes",
          caption: "The five slices sum to revenue. The thin final slice (profit) is the 12% net margin.",
          data: {
            items: [
              { label: "Cost of sales", value: 3000 },
              { label: "Operating expenses", value: 1000 },
              { label: "Finance costs", value: 200 },
              { label: "Tax", value: 200 },
              { label: "Profit for the year", value: 600 },
            ],
          },
        } },
        { kind: "text", md: "Margins tell you about the income statement; **ROCE** links profit back to the money tied up in the business. It is the single most important overall measure of management performance: **what return does the capital employed earn?**" },
        { kind: "formula", name: "Return on capital employed (ROCE)", expr: "Operating profit (PBIT) / Capital employed x 100", note: "Capital employed = total equity + non-current liabilities  (= total assets - current liabilities)." },
        { kind: "example", title: "Worked example — ROCE and why it moved", scenario: "Compute Harbex's ROCE for both years, then decompose it into margin and asset turnover.", steps: [
          { label: "Capital employed 20X5", detail: "Equity (1,000 + 200 + 1,800 = 3,000) + loan notes 2,000 = 5,000. Check: total assets 6,000 - current liabilities 1,000 = 5,000." },
          { label: "ROCE 20X5", detail: "1,000 / 5,000 = 0.20 = 20.0%." },
          { label: "ROCE 20X4", detail: "Capital employed = 2,500 + 1,500 = 4,000. ROCE = 600 / 4,000 = 15.0%." },
          { label: "Decompose it", detail: "ROCE = operating margin x asset turnover. 20X5: 20.0% x (5,000/5,000 = 1.0) = 20.0%. 20X4: 15.0% x (4,000/4,000 = 1.0) = 15.0%." },
        ], result: "ROCE rose from 15.0% to 20.0%. Asset turnover was flat at 1.0 in both years, so the entire improvement came from the wider operating margin — not from sweating the assets harder." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Two-year profitability profile",
          caption: "Every profitability measure improved in 20X5 (bars in %).",
          data: {
            unit: "%",
            items: [
              { label: "Gross margin 20X4", value: 36 },
              { label: "Gross margin 20X5", value: 40 },
              { label: "Op. margin 20X4", value: 15 },
              { label: "Op. margin 20X5", value: 20 },
              { label: "ROCE 20X4", value: 15 },
              { label: "ROCE 20X5", value: 20 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Watch the denominator", md: "ROCE uses **operating profit** (PBIT), not profit after tax, because capital employed includes **debt** — and debt-holders are paid interest out of operating profit. Matching a **post-interest** profit to a capital base that **includes** the debt would double-count the effect of gearing." },
      ],
      check: {
        q: "Harbex's ROCE rose from 15.0% to 20.0% while net asset turnover stayed at 1.0 times. What does this tell you?",
        options: [
          "The improvement came entirely from a wider profit margin, not from using assets more intensively",
          "The company generated more sales per dollar of capital employed",
          "The company must have raised new share capital during the year",
          "ROCE and asset turnover always move in opposite directions",
        ],
        correct: 0,
        explain: "ROCE = operating margin x asset turnover. If asset turnover is unchanged (1.0 in both years), the rise in ROCE from 15% to 20% must be driven by the margin, which widened from 15% to 20%. Sales per dollar of capital (asset turnover) did NOT change, so option 2 is wrong.",
      },
    },
    {
      id: "liquidity",
      heading: "Liquidity — can it pay its way?",
      blocks: [
        { kind: "text", md: "A business can be **profitable and still fail** if it runs out of cash. Liquidity ratios measure the short-term question a supplier or bank cares about most: **do the current assets cover the current liabilities as they fall due?**" },
        { kind: "formula", name: "Current ratio", expr: "Current assets / Current liabilities", note: "Expressed as a multiple, e.g. 1.5:1. A rough rule of thumb is around 1.5-2.0, but it varies hugely by industry." },
        { kind: "formula", name: "Quick (acid-test) ratio", expr: "(Current assets - Inventory) / Current liabilities", note: "Strips out inventory, the least liquid current asset, because it must first be sold and then collected." },
        { kind: "example", title: "Worked example — the two liquidity ratios", scenario: "Compute Harbex's current and quick ratios for both years and interpret the trend.", steps: [
          { label: "Current assets & liabilities", detail: "20X5: CA = 600 + 800 + 100 = 1,500; CL = 700 + 200 + 100 = 1,000. 20X4: CA = 560 + 600 + 240 = 1,400; CL = 550 + 150 + 0 = 700." },
          { label: "Current ratio 20X5", detail: "1,500 / 1,000 = 1.5:1. 20X4: 1,400 / 700 = 2.0:1." },
          { label: "Quick ratio 20X5", detail: "(1,500 - 600) / 1,000 = 900 / 1,000 = 0.9:1. 20X4: (1,400 - 560) / 700 = 840 / 700 = 1.2:1." },
          { label: "Interpret", detail: "Both ratios fell sharply. Cash dropped from 240 to 100, an overdraft of 100 appeared, and the quick ratio slid below 1.0 — meaning liquid assets no longer fully cover short-term liabilities." },
        ], result: "Liquidity deteriorated markedly (current 2.0 to 1.5, quick 1.2 to 0.9). Despite rising profit, Harbex is under more short-term cash pressure — a classic sign that rapid growth is being funded by squeezing working capital and the bank." },
        { kind: "callout", tone: "rule", title: "Profit is not cash", md: "Harbex's profit rose 100% yet its cash **fell** and an overdraft appeared. Growth ties cash up in extra inventory and receivables faster than profit releases it — the reason a growing, profitable company can still hit a cash-flow wall (overtrading)." },
      ],
    },
    {
      id: "efficiency",
      heading: "Efficiency & the working-capital cycle",
      blocks: [
        { kind: "text", md: "Liquidity ratios are a **snapshot**; efficiency ratios show the **speed** at which working capital moves. Together they explain *why* the liquidity changed. Each is expressed in **days** — how long cash sits in each stage before it comes back." },
        { kind: "formula", name: "Inventory holding days", expr: "Inventory / Cost of sales x 365", note: "Average days goods sit in the warehouse before sale. Lower is leaner — but too low risks stock-outs." },
        { kind: "formula", name: "Receivables collection days", expr: "Trade receivables / Credit sales x 365", note: "Average days customers take to pay. Rising days can signal weak credit control or a struggling customer base." },
        { kind: "formula", name: "Payables payment days", expr: "Trade payables / Credit purchases x 365", note: "Average days taken to pay suppliers. Cost of sales is used as a proxy for purchases when purchases are not given." },
        { kind: "formula", name: "Cash operating cycle", expr: "Inventory days + Receivables days - Payables days", note: "Days between paying for goods and collecting cash from the customer — the working capital that must be financed." },
        { kind: "example", title: "Worked example — the working-capital days", scenario: "Compute each cycle component and the cash operating cycle for both years.", steps: [
          { label: "Inventory days", detail: "20X5: 600 / 3,000 x 365 = 0.2 x 365 = 73 days. 20X4: 560 / 2,560 x 365 = 80 days. Faster." },
          { label: "Receivables days", detail: "20X5: 800 / 5,000 x 365 = 0.16 x 365 = 58 days. 20X4: 600 / 4,000 x 365 = 55 days. Slightly slower collection." },
          { label: "Payables days", detail: "20X5: 700 / 3,000 x 365 = 85 days. 20X4: 550 / 2,560 x 365 = 78 days. Paying suppliers later." },
          { label: "Cash operating cycle", detail: "20X5: 73 + 58 - 85 = 46 days. 20X4: 80 + 55 - 78 = 57 days. The cycle shortened by 11 days." },
        ], result: "The cycle fell from 57 to 46 days — better on the face of it. But look closer: half the gain comes from stretching suppliers from 78 to 85 days. Leaning on supplier credit is exactly what shows up as the new overdraft and weaker quick ratio." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The 20X5 cash operating cycle",
          caption: "Inventory days + receivables days, less the free credit taken from suppliers, equals the cash that must be financed: 73 + 58 - 85 = 46 days.",
          data: {
            steps: [
              { label: "Inventory days", sub: "+73 days held" },
              { label: "Receivables days", sub: "+58 days to collect" },
              { label: "Payables days", sub: "-85 days supplier credit" },
              { label: "Cash operating cycle", sub: "= 46 days financed" },
            ],
          },
        } },
        { kind: "text", md: "The final efficiency measure links sales to the whole capital base: **asset turnover**. It is the second half of the ROCE decomposition — how many dollars of sales each dollar of capital generates." },
        { kind: "formula", name: "Net asset turnover", expr: "Revenue / Capital employed", note: "Expressed as a multiple of times per year. ROCE = operating margin x net asset turnover." },
        { kind: "text", md: "For Harbex, net asset turnover is **5,000 / 5,000 = 1.0 times** in 20X5 and **4,000 / 4,000 = 1.0 times** in 20X4 — flat. Combined with the earlier margins this confirms ROCE improved purely on margin, not on asset utilisation." },
      ],
      check: {
        q: "Harbex's cash operating cycle shortened from 57 to 46 days. Why should an analyst NOT simply record this as good news?",
        options: [
          "A shorter cycle always means the company is less efficient",
          "Much of the fall comes from paying suppliers later (78 to 85 days), which strains supplier goodwill and coincides with a new overdraft",
          "The cycle should be calculated using revenue, not cost of sales, for inventory",
          "A cash cycle can never be a meaningful measure of liquidity",
        ],
        correct: 1,
        explain: "The cycle fell partly because inventory days improved (80 to 73), but also because payables days rose (78 to 85) — the company is delaying payment to suppliers. That is not genuine efficiency; it is using supplier credit as finance, consistent with the new overdraft and the weaker quick ratio. Interpretation must look behind the headline number.",
      },
    },
    {
      id: "gearing",
      heading: "Gearing & investor ratios",
      blocks: [
        { kind: "text", md: "Gearing ratios measure **long-term solvency and financial risk**: how much of the business is funded by **debt** versus **equity**. The more debt, the more fixed interest must be paid before shareholders see anything — magnifying returns in good years and losses in bad ones." },
        { kind: "formula", name: "Gearing", expr: "Debt / (Debt + Equity) x 100", note: "Debt = long-term (non-current) interest-bearing debt. An alternative form is Debt / Equity. Be consistent and state which you use." },
        { kind: "formula", name: "Interest cover", expr: "Operating profit (PBIT) / Finance costs", note: "How many times operating profit covers the interest bill. Below about 2-3 times is a solvency warning." },
        { kind: "example", title: "Worked example — gearing and interest cover", scenario: "Compute Harbex's gearing and interest cover for both years.", steps: [
          { label: "Gearing 20X5", detail: "Debt 2,000 / (2,000 + equity 3,000) = 2,000 / 5,000 = 40.0%." },
          { label: "Gearing 20X4", detail: "1,500 / (1,500 + 2,500) = 1,500 / 4,000 = 37.5%." },
          { label: "Interest cover 20X5", detail: "1,000 / 200 = 5.0 times. 20X4: 600 / 150 = 4.0 times." },
          { label: "Interpret", detail: "Gearing edged up (37.5% to 40.0%) as new loan notes funded expansion, but rising operating profit lifted interest cover from 4.0 to 5.0 times — so the higher debt is comfortably serviced." },
        ], result: "Financial risk rose slightly on gearing but fell on cover. The extra borrowing is well within the company's ability to service it — a reasonable, not alarming, capital structure." },
        { kind: "text", md: "Investor ratios translate the accounts into the language of the shareholder — **earnings, price and dividends**. The starting point is **earnings per share (EPS)**, governed by **IAS 33**." },
        { kind: "formula", name: "Earnings per share (basic, IAS 33)", expr: "Profit attributable to ordinary shareholders / Weighted average number of ordinary shares", note: "Any preference dividends are first deducted from profit. Weighted-average shares reflect the time new shares were in issue." },
        { kind: "formula", name: "Price/earnings (P/E) ratio", expr: "Market price per share / EPS", note: "How many years of current earnings the market is paying for. A high P/E signals expected growth (or an overvalued share)." },
        { kind: "formula", name: "Dividend cover", expr: "Profit for the year / Dividends  (or EPS / DPS)", note: "How many times the dividend could have been paid out of earnings. High cover = more profit retained for reinvestment." },
        { kind: "example", title: "Worked example — the investor ratios", scenario: "Harbex has 1,000,000 $1 ordinary shares, no preference shares, a 20X5 market price of $6.00 and a 20X5 dividend of $300k. Compute EPS, P/E and dividend cover.", steps: [
          { label: "EPS 20X5", detail: "Profit 600 (all to ordinary shareholders) / 1,000 shares = $0.60. 20X4: 300 / 1,000 = $0.30 — EPS doubled." },
          { label: "P/E ratio", detail: "6.00 / 0.60 = 10.0. The market pays 10x current earnings." },
          { label: "Dividend cover", detail: "600 / 300 = 2.0 times. (Equivalently, DPS = 300/1,000 = $0.30, so EPS 0.60 / DPS 0.30 = 2.0 times.)" },
        ], result: "EPS doubled to $0.60, the share trades on a P/E of 10, and the dividend is covered 2.0 times — half of earnings distributed, half retained to fund the growth that is stretching working capital." },
        { kind: "callout", tone: "tip", md: "**EPS is more reliable than absolute profit** for judging performance over time, because it adjusts for the number of shares. But note IAS 33 EPS is only comparable **within** a company across years — it is not comparable **between** companies, since share denominations differ." },
      ],
      check: {
        q: "Harbex's interest cover rose from 4.0 to 5.0 times even though its loan notes increased. How is that possible?",
        options: [
          "Interest cover ignores the amount of debt entirely",
          "Operating profit rose proportionately more than the finance cost, so cover improved despite the extra borrowing",
          "The finance cost must have fallen when the loan increased",
          "Interest cover always rises when gearing rises",
        ],
        correct: 1,
        explain: "Interest cover = operating profit / finance costs. Operating profit rose from 600 to 1,000 (+67%), while finance costs rose only from 150 to 200 (+33%). Because profit grew faster than the interest bill, cover improved from 4.0 to 5.0 times even though absolute debt went up.",
      },
    },
    {
      id: "limits",
      heading: "Policy effects, limitations & groups",
      blocks: [
        { kind: "text", md: "Ratios look objective, but they sit on top of **accounting policy choices**. Change a policy and the ratios move even though nothing real has changed. An analyst must strip these effects out before comparing companies." },
        { kind: "table", caption: "How common policy choices distort the ratios", head: ["Choice", "Effect on the statements", "Effect on ratios"], rows: [
          ["Revalue PPE upward", "Assets and equity rise; depreciation rises", "ROCE and asset turnover FALL (bigger base); gearing FALLS (bigger equity)"],
          ["Capitalise development / borrowing costs", "Asset created instead of an expense", "Short-term profit and margins RISE; asset turnover falls"],
          ["Lease assets (IFRS 16)", "Right-of-use asset + lease liability recognised", "Gearing RISES; operating profit rises (rent becomes depreciation + interest); interest cover falls"],
          ["Different depreciation method / life", "Depreciation charge differs", "Margins, ROCE and asset carrying value all shift"],
        ] },
        { kind: "example", title: "Worked example — the revaluation distorts ROCE", scenario: "Harbex revalued its PPE upward by $200k in 20X5 (the revaluation surplus). What would ROCE and gearing have been WITHOUT that revaluation?", steps: [
          { label: "Strip out the surplus", detail: "Equity would be 3,000 - 200 = 2,800, so capital employed = 2,800 + 2,000 = 4,800." },
          { label: "ROCE without revaluation", detail: "1,000 / 4,800 = 20.83% — versus 20.0% as reported. The revaluation made ROCE look worse." },
          { label: "Gearing without revaluation", detail: "2,000 / 4,800 = 41.7% — versus 40.0% as reported. The revaluation made gearing look better." },
        ], result: "A single non-cash policy choice moved ROCE by 0.8 of a point and gearing by 1.7 points in opposite directions. When comparing Harbex to a rival that carries PPE at cost, adjust for this before concluding anything." },
        { kind: "callout", tone: "warn", title: "The limitations of ratio analysis", md: "Ratios are a starting point, never the verdict. Beware: **(1) comparability** — different policies, year-ends and industries; **(2) one-off items** — a disposal gain or restructuring cost distorts a single year; **(3) window dressing** — timing transactions around the year-end to flatter liquidity; **(4) historical & inflation** — figures are past and unadjusted for price changes; **(5) non-financial factors** — brand, staff, order book and regulation never appear; and **(6) the balance sheet is one date** — a snapshot that may be unrepresentative." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Reading the signals",
          caption: "The same ratio set points in two directions — analysis is judging which story dominates.",
          data: {
            leftTitle: "Healthy signals",
            rightTitle: "Warning signals",
            rows: [
              { aspect: "Margins", left: "Rising or stable margins", right: "Margins squeezed by discounting or cost inflation" },
              { aspect: "Liquidity", left: "Current ~1.5-2.0, quick near 1.0", right: "Quick below 1.0 and falling; overdraft appears" },
              { aspect: "Receivables", left: "Stable collection period", right: "Lengthening days — weak credit control" },
              { aspect: "Gearing", left: "Moderate debt, interest well covered", right: "High and rising gearing, thin interest cover" },
              { aspect: "Cash cycle", left: "Short and driven by real efficiency", right: "Short only because suppliers are being stretched" },
            ],
          },
        } },
        { kind: "text", md: "Finally, take care with **group (consolidated) accounts**. A consolidated ROCE or margin blends **several different businesses** — a high-margin subsidiary can mask a loss-making one, so a group ratio may not represent any single trade. Consolidated figures also include **goodwill** (inflating the asset base and depressing ROCE and asset turnover) and a **non-controlling interest** within equity (which affects gearing). Intra-group sales and balances are eliminated, so group revenue and receivables are not simply the sum of the parts." },
        { kind: "callout", tone: "key", title: "Group vs single entity", md: "Never compare a **group's** consolidated ratios directly with a **single entity's** without adjustment. Goodwill, non-controlling interests and the blending of different trades all distort the comparison — the group ratio describes a portfolio, not one business." },
      ],
    },
  ],
  examTraps: [
    { trap: "Using profit after tax (or after interest) in the ROCE numerator.", fix: "ROCE uses OPERATING profit (PBIT), because capital employed includes debt. Match a pre-interest profit to a capital base that includes the debt." },
    { trap: "Calculating receivables days on cost of sales, or inventory days on revenue.", fix: "Inventory and payables days use COST OF SALES; receivables days use REVENUE (credit sales). Match each ratio to the right base." },
    { trap: "Treating a shorter cash cycle or lower gearing as automatically good.", fix: "Always look behind the number — a short cycle from stretching suppliers, or low gearing from a revaluation, is not genuine improvement." },
    { trap: "Comparing EPS between two different companies.", fix: "IAS 33 EPS is only comparable within one company over time; share denominations differ, so cross-company EPS is meaningless — use P/E or margins instead." },
    { trap: "Comparing a group's consolidated ratios straight against a single entity's.", fix: "Goodwill, non-controlling interests and blended trades distort group ratios. Adjust, or compare like with like." },
  ],
  keyTerms: [
    { term: "ROCE", def: "Operating profit divided by capital employed (equity + non-current liabilities) — the headline measure of how well capital is used." },
    { term: "Quick (acid-test) ratio", def: "Current assets less inventory, divided by current liabilities — liquidity ignoring the slow-to-convert inventory." },
    { term: "Cash operating cycle", def: "Inventory days + receivables days - payables days: the number of days of working capital the business must finance." },
    { term: "Gearing", def: "The proportion of a company financed by debt relative to equity — a measure of financial risk and long-term solvency." },
    { term: "Interest cover", def: "Operating profit divided by finance costs — how many times profit covers the interest bill." },
  ],
  summary: [
    "Analysis makes figures comparable — over time, versus peers, against a benchmark — always read from a specific user's viewpoint.",
    "Profitability: gross/operating/net margins and ROCE (= operating margin x asset turnover). Harbex improved on every measure, ROCE 15% to 20%.",
    "Liquidity and efficiency explain each other: Harbex's current/quick ratios fell (2.0 to 1.5, 1.2 to 0.9) while the cash cycle shortened partly by stretching payables.",
    "Gearing and investor ratios gauge risk and shareholder value: gearing 37.5% to 40%, interest cover 4.0 to 5.0, EPS $0.30 to $0.60, P/E 10, cover 2.0 times.",
    "Ratios are distorted by policy choices (revaluation, capitalisation, leases) and limited by comparability, one-offs and window dressing — and group figures need extra care.",
  ],
}
