import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area H — Interpretation of financial statements.
 * The ratio-analysis chapter: turning a set of statements into signals about
 * profitability, liquidity, efficiency and financial risk — then reading the
 * movements and knowing the limits. Original, syllabus-aligned; no ACCA/Kaplan/
 * BPP text. Every worked figure is drawn from one internally consistent set of
 * accounts (Meridian Traders, all figures $000) and re-computed to check out.
 */

export const FA_H: StudyChapter = {
  paper: "FA",
  area: "H",
  title: "Interpretation of financial statements",
  minutes: 17,
  intro: "A set of accounts is just a wall of numbers until you turn it into ratios. Ratios are the questions a reader really asks: is it profitable, can it pay its bills, is it using its assets well, and how much risk sits in the balance sheet?",
  outcomes: [
    "Explain why ratio analysis matters and name the four families of ratios",
    "Compute and interpret the profitability ratios: gross and operating margin, net margin and ROCE",
    "Compute and interpret the liquidity ratios: current ratio and the quick (acid-test) ratio",
    "Compute the working-capital ratios and build the cash operating cycle",
    "Compute and interpret gearing, interest cover and EPS, and explain the limitations of ratio analysis",
  ],
  sections: [
    {
      id: "why",
      heading: "Why ratios matter",
      blocks: [
        { kind: "text", md: "A single number tells you almost nothing. Is a profit of $180,000 good? You cannot say — not until you know it came from $2,000,000 of sales, or that a rival earns the same on half the capital. **A ratio puts one figure in the context of another**, and only then does the number start to speak." },
        { kind: "text", md: "Interpretation is the skill of reading those relationships: comparing this year with last year (**trend**), or this business with a competitor or an industry norm (**benchmark**). Analysts group the ratios into four families, and every family answers a different question." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The four families of ratios",
          caption: "Each family answers one question a user of the accounts is really asking.",
          data: {
            items: [
              { title: "Profitability", sub: "Is the business making enough profit on its sales and its capital?" },
              { title: "Liquidity", sub: "Can it pay its short-term debts as they fall due?" },
              { title: "Efficiency", sub: "How well is it managing inventory, receivables and payables?" },
              { title: "Gearing & investor", sub: "How much financial risk sits in the funding, and what do owners earn?" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "A ratio is only meaningful **in comparison** — against a prior year, a competitor, or an industry norm. On its own, a ratio is just a number wearing a percentage sign." },
        { kind: "text", md: "Throughout this chapter we use one worked set of accounts — **Meridian Traders**, all figures in **$000** — so that every ratio ties back to the same statements. Learn the layout once and the calculations become mechanical." },
        { kind: "table", caption: "Meridian Traders — statement of profit or loss ($000)", head: ["", "Year 2", "Year 1"], rows: [
          ["Revenue", "2,000", "1,600"],
          ["Cost of sales", "(1,300)", "(1,000)"],
          ["Gross profit", "700", "600"],
          ["Operating expenses", "(400)", "(360)"],
          ["Operating profit", "300", "240"],
          ["Finance costs", "(60)", "(40)"],
          ["Profit before tax", "240", "200"],
          ["Tax", "(60)", "(50)"],
          ["Profit for the year", "180", "150"],
        ] },
        { kind: "table", caption: "Meridian Traders — statement of financial position ($000)", head: ["", "Year 2", "Year 1"], rows: [
          ["Non-current assets", "1,200", "1,000"],
          ["Inventory", "285", "200"],
          ["Receivables", "340", "220"],
          ["Cash", "15", "80"],
          ["Total assets", "1,840", "1,500"],
          ["Share capital ($1 ordinary)", "400", "400"],
          ["Retained earnings", "540", "400"],
          ["Long-term borrowings", "600", "460"],
          ["Payables (current liabilities)", "300", "240"],
          ["Total equity & liabilities", "1,840", "1,500"],
        ] },
      ],
    },
    {
      id: "profitability",
      heading: "Profitability — is it making enough?",
      blocks: [
        { kind: "text", md: "Profitability ratios peel a business apart layer by layer. Start at the top of the income statement and work down: **gross margin** measures profit after only the direct cost of sales; **operating margin** measures profit after overheads too; **net margin** is what survives after interest and tax. Each layer isolates a different part of the story." },
        { kind: "formula", name: "Gross profit margin", expr: "Gross profit ÷ Revenue × 100", note: "How much of each $1 of sales is left after the direct cost of the goods sold." },
        { kind: "formula", name: "Operating profit margin", expr: "Operating profit ÷ Revenue × 100", note: "Operating profit = profit before interest and tax (PBIT). Adds the effect of overheads." },
        { kind: "formula", name: "Net profit margin", expr: "Profit for the year ÷ Revenue × 100", note: "The bottom line after interest and tax, as a share of sales." },
        { kind: "text", md: "Then comes the single most important profitability ratio: **return on capital employed (ROCE)**. Margins ask how profitable each sale is; ROCE asks how profitable the whole **investment** is — the operating profit earned on the long-term capital that funds the business. Because that capital comes from **both** owners and lenders, the numerator is operating profit (before interest), and the denominator is equity **plus** long-term debt." },
        { kind: "formula", name: "Return on capital employed (ROCE)", expr: "Operating profit ÷ Capital employed × 100", note: "Capital employed = equity + long-term (non-current) liabilities = total assets − current liabilities." },
        { kind: "example", title: "Working the profitability ratios (Year 2)", scenario: "Using Meridian's Year 2 figures — revenue $2,000, gross profit $700, operating profit $300, profit for the year $180 — and capital employed of $1,540 (equity $940 + long-term borrowings $600).", steps: [
          { label: "Gross profit margin", detail: "700 ÷ 2,000 × 100 = **35.0%**" },
          { label: "Operating profit margin", detail: "300 ÷ 2,000 × 100 = **15.0%**" },
          { label: "Net profit margin", detail: "180 ÷ 2,000 × 100 = **9.0%**" },
          { label: "ROCE", detail: "300 ÷ 1,540 × 100 = **19.5%**" },
        ], result: "Against Year 1 (37.5% gross, 15.0% operating, 9.4% net, 19.0% ROCE), the gross margin slipped 2.5 points — cost of sales rose faster than prices — yet the operating margin held and ROCE edged up. Tighter overhead control and better use of capital offset the pressure at the top." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Profitability: Year 1 vs Year 2",
          caption: "The gross margin fell, but operating margin and ROCE held — overheads and capital use compensated.",
          data: {
            unit: "%",
            items: [
              { label: "Gross margin Y1", value: 37.5 },
              { label: "Gross margin Y2", value: 35.0 },
              { label: "Operating margin Y1", value: 15.0 },
              { label: "Operating margin Y2", value: 15.0 },
              { label: "ROCE Y1", value: 19.0 },
              { label: "ROCE Y2", value: 19.5 },
            ],
          },
        } },
        { kind: "text", md: "A donut of the income statement makes the margin visible: it shows where each $1 of Year 2 revenue actually goes. Nine cents survives as profit for the shareholders; the rest is consumed by the cost of sales, overheads, interest and tax." },
        { kind: "diagram", diagram: {
          type: "donut",
          title: "Where each $1 of Year 2 revenue goes ($000)",
          caption: "Cost of sales 65%, overheads 20%, interest 3%, tax 3% — leaving 9% profit.",
          data: {
            items: [
              { label: "Cost of sales", value: 1300 },
              { label: "Operating expenses", value: 400 },
              { label: "Finance costs", value: 60 },
              { label: "Tax", value: 60 },
              { label: "Profit for the year", value: 180 },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "ROCE decomposes neatly: **ROCE = operating margin × asset turnover**. For Meridian Y2 that is 15.0% × (2,000 ÷ 1,540 = 1.30) = 19.5%. So a return can improve either by earning more per sale **or** by squeezing more sales out of the same capital." },
      ],
      check: {
        q: "A company's gross profit margin rose over the year but its operating profit margin fell. What is the most likely explanation?",
        options: [
          "Sales prices were cut across the whole range",
          "Operating expenses (overheads) grew faster than gross profit",
          "It repaid some of its long-term borrowings",
          "Inventory was written down to zero",
        ],
        correct: 1,
        explain: "Gross margin reflects only revenue vs cost of sales; operating margin also absorbs overheads. If gross margin improved but operating margin fell, the squeeze must have happened BELOW gross profit — overheads rising faster than gross profit. Repaying debt affects finance costs (below operating profit), so it changes neither ratio.",
      },
    },
    {
      id: "liquidity",
      heading: "Liquidity — can it pay its bills?",
      blocks: [
        { kind: "text", md: "A business can be highly profitable and still fail — if it cannot find the cash to pay a supplier or the wages next week. **Liquidity ratios** test short-term survival: do the assets that will turn into cash soon cover the debts that fall due soon?" },
        { kind: "formula", name: "Current ratio", expr: "Current assets ÷ Current liabilities", note: "Expressed as a ratio, e.g. 2.1:1. Broadly, ~1.5–2 is often comfortable, but the right level is industry-specific." },
        { kind: "formula", name: "Quick (acid-test) ratio", expr: "(Current assets − Inventory) ÷ Current liabilities", note: "Strips out inventory — the slowest current asset to turn into cash — for a tougher test." },
        { kind: "text", md: "Why remove inventory in the quick ratio? Because inventory must first be **sold** (often on credit) and then **collected** before it becomes cash — two steps away from the bank. The quick ratio asks the harder question: could the business pay its immediate debts **without** relying on selling stock?" },
        { kind: "example", title: "Current vs quick ratio (Year 2)", scenario: "Meridian holds current assets of $640 (inventory $285, receivables $340, cash $15) against current liabilities of $300.", steps: [
          { label: "Current ratio", detail: "640 ÷ 300 = **2.13:1**" },
          { label: "Quick assets", detail: "640 − 285 inventory = **355**" },
          { label: "Quick ratio", detail: "355 ÷ 300 = **1.18:1**" },
        ], result: "The current ratio of 2.13:1 looks comfortable — and even improved on Year 1's 2.08:1. But strip out the swollen inventory and the quick ratio actually FELL, from 1.25:1 to 1.18:1. The reassuring headline hid a genuine tightening of liquidity." },
        { kind: "callout", tone: "warn", title: "Higher is not always better", md: "A rising current ratio can be a **warning**, not a comfort. If it climbs because inventory is piling up or customers are paying late, the business is tying up more cash, not becoming safer. Always read the current ratio alongside the quick ratio and the working-capital days." },
      ],
      check: {
        q: "Meridian's current ratio rose from 2.08:1 to 2.13:1, but its quick ratio fell from 1.25:1 to 1.18:1. What does this most likely indicate?",
        options: [
          "Liquidity has clearly and simply improved",
          "Inventory has built up, flattering the current ratio",
          "The business is holding far too much cash",
          "All receivables have been collected in full",
        ],
        correct: 1,
        explain: "The only item inside the current ratio but excluded from the quick ratio is inventory. If the current ratio rises while the quick ratio falls, inventory must have grown — inflating the headline while the genuinely liquid assets (cash and receivables) actually shrank relative to the debts. A pile of slow-moving stock is a liquidity risk, not a strength.",
      },
    },
    {
      id: "efficiency",
      heading: "Efficiency & the cash operating cycle",
      blocks: [
        { kind: "text", md: "Efficiency ratios measure how hard the business works its **working capital** — how long cash sits trapped in inventory and receivables, and how long the business delays paying its suppliers. They are usually expressed in **days**." },
        { kind: "formula", name: "Inventory days", expr: "Inventory ÷ Cost of sales × 365", note: "Average days a unit of inventory sits on the shelf before it is sold. Uses cost of sales — inventory is held at cost." },
        { kind: "formula", name: "Receivables days", expr: "Receivables ÷ Revenue × 365", note: "Average days customers take to pay. Uses revenue (credit sales), because receivables arise from sales." },
        { kind: "formula", name: "Payables days", expr: "Payables ÷ Cost of sales × 365", note: "Average days the business takes to pay its suppliers. Uses cost of sales (or credit purchases) as the closest match." },
        { kind: "text", md: "Chain these together and you get the **cash operating cycle** — the number of days between paying **out** cash for inventory and collecting it back **in** from customers. The longer the cycle, the more cash is locked inside the business and unavailable for anything else." },
        { kind: "formula", name: "Cash operating cycle", expr: "Inventory days + Receivables days − Payables days", note: "Payables days are SUBTRACTED — supplier credit funds part of the cycle for free, shortening it." },
        { kind: "formula", name: "Asset turnover", expr: "Revenue ÷ Capital employed", note: "Sales generated per $1 of capital, in times. The second half of the ROCE breakdown (margin × turnover)." },
        { kind: "example", title: "The cash operating cycle (Year 2 vs Year 1)", scenario: "Cost of sales $1,300 (Y1 $1,000), inventory $285 (Y1 $200), receivables $340 (Y1 $220), payables $300 (Y1 $240), revenue $2,000 (Y1 $1,600).", steps: [
          { label: "Inventory days", detail: "285 ÷ 1,300 × 365 = **80 days** (Y1: 200 ÷ 1,000 × 365 = 73)" },
          { label: "Receivables days", detail: "340 ÷ 2,000 × 365 = **62 days** (Y1: 220 ÷ 1,600 × 365 = 50)" },
          { label: "Payables days", detail: "300 ÷ 1,300 × 365 = **84 days** (Y1: 240 ÷ 1,000 × 365 = 88)" },
          { label: "Cash operating cycle", detail: "80 + 62 − 84 = **58 days** (Y1: 73 + 50 − 88 = 35 days)" },
        ], result: "The cycle stretched from about 35 to 58 days. Meridian now holds stock longer, collects from customers slower, AND pays suppliers sooner — a triple squeeze on cash. That is precisely why the cash balance collapsed from $80 to $15 even though profit rose." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Building the Year 2 cash operating cycle",
          caption: "Cash is tied up for 80 + 62 days, but supplier credit funds 84 of them — net 58 days.",
          data: {
            steps: [
              { label: "Inventory days", sub: "+80 days held" },
              { label: "Receivables days", sub: "+62 days to collect" },
              { label: "Payables days", sub: "−84 days supplier credit" },
              { label: "Cash operating cycle", sub: "= 58 days trapped" },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Working-capital days: Year 1 vs Year 2",
          caption: "Inventory and receivables days rose while payables days fell — every lever moved the wrong way for cash.",
          data: {
            unit: "days",
            items: [
              { label: "Inventory days Y1", value: 73 },
              { label: "Inventory days Y2", value: 80 },
              { label: "Receivables days Y1", value: 50 },
              { label: "Receivables days Y2", value: 62 },
              { label: "Payables days Y1", value: 88 },
              { label: "Payables days Y2", value: 84 },
            ],
          },
        } },
      ],
      check: {
        q: "Receivables days increased from 50 to 62 days over the year. Taken on its own, what does this suggest?",
        options: [
          "Customers are paying the business faster",
          "The business is collecting its cash more slowly",
          "The business purchased far more inventory",
          "Total sales fell during the year",
        ],
        correct: 1,
        explain: "Receivables days = receivables ÷ revenue × 365 — the average time customers take to pay. A rise from 50 to 62 days means cash is being collected MORE slowly, tying up working capital and raising bad-debt risk. It says nothing directly about inventory levels or whether sales rose or fell.",
      },
    },
    {
      id: "gearing",
      heading: "Gearing & investor ratios",
      blocks: [
        { kind: "text", md: "The final family measures **financial risk** and the **owners' return**. Gearing captures how much of the funding comes from debt rather than equity. Debt is cheaper than equity and its interest is tax-deductible — but interest must be paid whether or not the business makes a profit, so more debt means more risk." },
        { kind: "formula", name: "Gearing (debt / equity)", expr: "Long-term debt ÷ Equity × 100", note: "A common form. An alternative is debt ÷ (debt + equity) — always state which you used." },
        { kind: "formula", name: "Interest cover", expr: "Operating profit ÷ Finance costs", note: "How many times over the operating profit could pay the interest bill. Uses profit BEFORE interest." },
        { kind: "formula", name: "Earnings per share (EPS)", expr: "Profit for the year ÷ Number of ordinary shares", note: "Profit attributable to each ordinary share. Meridian has 400,000 $1 shares (share capital $400,000)." },
        { kind: "example", title: "Gearing, interest cover and EPS (Year 2)", scenario: "Long-term borrowings $600, equity $940, operating profit $300, finance costs $60, profit for the year $180, and 400,000 ordinary $1 shares in issue.", steps: [
          { label: "Gearing (debt/equity)", detail: "600 ÷ 940 × 100 = **63.8%** (Y1: 460 ÷ 800 = 57.5%)" },
          { label: "Interest cover", detail: "300 ÷ 60 = **5.0 times** (Y1: 240 ÷ 40 = 6.0 times)" },
          { label: "EPS", detail: "180,000 ÷ 400,000 = $0.45 = **45.0 cents** (Y1: 150,000 ÷ 400,000 = 37.5 cents)" },
        ], result: "New borrowing lifted gearing from 57.5% to 63.8% and thinned interest cover from 6.0 to 5.0 times — the cushion of profit over interest is shrinking. EPS still climbed to 45.0c on higher volume, but the finance risk sitting behind that headline is now greater." },
        { kind: "callout", tone: "rule", title: "Read gearing and cover together", md: "Gearing shows how much debt is in the structure; interest cover shows whether the profit can **service** it. High gearing with comfortable cover can be fine; even modest gearing with cover near 1 or 2 times is a red flag — a small dip in profit could leave interest unpaid." },
        { kind: "text", md: "A capital-structure donut makes the gearing visible: at the Year 2 year-end, of the $1,540 of long-term capital, $600 is debt and $940 is equity — roughly a 39% debt-financed structure on the debt ÷ (debt + equity) basis." },
        { kind: "diagram", diagram: {
          type: "donut",
          title: "Year 2 capital structure ($000)",
          caption: "Debt $600 vs equity $940 of the $1,540 capital employed — about 39% debt-financed.",
          data: {
            items: [
              { label: "Equity", value: 940 },
              { label: "Long-term debt", value: 600 },
            ],
          },
        } },
      ],
    },
    {
      id: "limits",
      heading: "Reading the signals — and their limits",
      blocks: [
        { kind: "text", md: "Put the families together and a picture forms. Meridian is **growing and still profitable** (revenue up 25%, ROCE up), but the quality of that growth is worsening: **margins are under pressure, liquidity is tightening, the cash cycle is lengthening, and gearing is rising**. Profit up, cash down — a classic warning pattern that only the ratios reveal." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "What to look for: encouraging vs warning signals",
          data: {
            leftTitle: "Encouraging signal",
            rightTitle: "Warning signal",
            rows: [
              { aspect: "Margins", left: "Stable or rising gross & operating margins", right: "Falling margins — price or cost pressure" },
              { aspect: "Liquidity", left: "Quick ratio steady, around 1 or above", right: "Quick ratio sliding below 1" },
              { aspect: "Receivables", left: "Days stable or falling — cash on time", right: "Days rising — collection slipping, bad-debt risk" },
              { aspect: "Cash cycle", left: "Short or shortening cycle", right: "Lengthening cycle — cash trapped" },
              { aspect: "Gearing", left: "Moderate, interest cover comfortably high", right: "Rising gearing, interest cover thinning" },
            ],
          },
        } },
        { kind: "text", md: "But ratios are a **starting point for questions, not a verdict**. They are computed from historical accounts prepared under accounting policies and estimates, and several things can quietly distort them:" },
        { kind: "callout", tone: "warn", title: "Accounting policies", md: "Two businesses using different depreciation methods, or different inventory valuations, are **not directly comparable** — the same underlying performance can produce different ratios. Comparability requires consistent policies." },
        { kind: "callout", tone: "warn", title: "One-off items", md: "A profit inflated by a **one-time** gain (say, selling a building) flatters this year's margins and ROCE, but is not repeatable. Strip out exceptional items before judging a trend." },
        { kind: "callout", tone: "warn", title: "Seasonality", md: "The position statement is a **snapshot on one date**. A retailer's year-end just after Christmas shows low inventory and high cash; the same firm mid-season looks very different. A single date can badly mislead." },
        { kind: "callout", tone: "warn", title: "Window dressing", md: "Managers can time transactions around the year-end to flatter the ratios — chasing in receipts, delaying purchases, or paying down a loan just before the year-end. The improvement is cosmetic and reverses soon after." },
        { kind: "callout", tone: "tip", title: "Comparability", md: "Ratios only mean something against a **relevant** benchmark. Different industries have utterly different norms — a supermarket's thin margin and fast stock turn are healthy, the same figures would alarm a jeweller. And historical-cost figures ignore inflation and every non-financial factor." },
        { kind: "callout", tone: "key", title: "The interpreter's discipline", md: "Never quote a ratio without three things: **a comparison** (trend or benchmark), **a possible cause** (what in the business drove it), and **a caveat** (why the number might mislead). That is the difference between calculating and interpreting." },
      ],
    },
  ],
  examTraps: [
    { trap: "Mixing up the denominators — using revenue for inventory days or cost of sales for receivables days.", fix: "Inventory days and payables days use COST OF SALES; receivables days uses REVENUE (credit sales). Match each balance to the flow it sits in." },
    { trap: "Reading a rising current ratio as automatically healthier.", fix: "A high or rising current ratio can mean idle cash, bloated inventory or uncollected receivables. Check the quick ratio and the working-capital days before concluding it is good." },
    { trap: "Putting profit for the year (after interest and tax) over capital employed for ROCE.", fix: "ROCE uses OPERATING profit (PBIT) over capital employed (equity + long-term debt), because that capital is funded by both owners AND lenders." },
    { trap: "Calculating interest cover as profit before tax ÷ finance costs.", fix: "Interest cover = OPERATING profit ÷ finance costs. Use profit BEFORE interest — that is the pool actually available to pay the interest." },
    { trap: "Forgetting to SUBTRACT payables days in the cash operating cycle.", fix: "Cycle = inventory days + receivables days − payables days. Supplier credit funds part of the cycle, so it shortens the days cash is tied up." },
  ],
  keyTerms: [
    { term: "ROCE", def: "Return on capital employed — operating profit as a percentage of the long-term capital (equity + debt) funding the business; the headline measure of how efficiently capital generates profit." },
    { term: "Quick (acid-test) ratio", def: "Current assets excluding inventory, divided by current liabilities; a stricter test of whether short-term debts can be met without relying on selling stock." },
    { term: "Cash operating cycle", def: "The average number of days between paying for inventory and collecting the cash from selling it: inventory days + receivables days − payables days." },
    { term: "Gearing", def: "The proportion of a company's long-term capital financed by debt rather than equity; higher gearing means higher financial risk because interest must be paid regardless of profit." },
    { term: "Interest cover", def: "Operating profit divided by finance costs — how many times over the profit could pay the interest bill; a measure of how safely debt can be serviced." },
  ],
  summary: [
    "Ratios turn raw statements into comparable signals across four families — profitability, liquidity, efficiency and gearing/investor — and only mean something against a trend or benchmark.",
    "Profitability: gross, operating and net margins show profit per $1 of sales; ROCE (operating profit ÷ capital employed) shows the return on invested capital, and equals margin × asset turnover.",
    "Liquidity: the current ratio (CA ÷ CL) and the stricter quick ratio (excluding inventory) test the ability to pay short-term debts — and a high current ratio is not automatically healthy.",
    "Efficiency: inventory, receivables and payables days combine into the cash operating cycle (inventory + receivables − payables days); the shorter the cycle, the less cash is trapped.",
    "Gearing (debt ÷ equity) and interest cover measure financial risk; always interpret every ratio against a benchmark and beware policy differences, one-off items, seasonality and window dressing.",
  ],
}
