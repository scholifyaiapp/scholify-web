import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX (Taxation UK) · Area C — Corporation tax.
 * UK FA2024/25 basis. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 * Every calculation re-solved digit-by-digit.
 */

export const TX_C: StudyChapter = {
  paper: "TX",
  area: "C",
  title: "Corporation tax",
  minutes: 17,
  intro: "A company is a separate legal person, so it pays its own tax on its own profits. Master one flow — build the profits, apply allowances, pick the rate — and the whole computation clicks into place.",
  outcomes: [
    "Explain the scope of corporation tax and how accounting periods are set",
    "Build taxable total profits from every income stream and chargeable gains",
    "Adjust accounting profit into a tax-adjusted trading profit",
    "Compute capital allowances using AIA, full expensing and 18%/6% WDAs",
    "Apply the small profits rate, main rate and marginal relief, including associated companies",
    "State the basics of company losses, payment and filing",
  ],
  sections: [
    {
      id: "scope",
      heading: "Scope and accounting periods",
      blocks: [
        { kind: "text", md: "Corporation tax (CT) is charged on the profits of **companies** — and some other bodies such as members' clubs and associations. A company that is **UK resident** pays CT on its **worldwide** profits. A company is UK resident if it is **incorporated in the UK**, or if it is incorporated abroad but **centrally managed and controlled** from the UK." },
        { kind: "text", md: "CT is charged for an **accounting period** (a chargeable accounting period, or CAP). Usually the CAP matches the company's **period of account** — the period for which it draws up its financial statements. But a CAP can **never exceed 12 months**. If a company prepares accounts for a longer stretch (say 15 or 18 months), that period of account is **split**: the first 12 months form one CAP, and the balance forms a second CAP." },
        { kind: "callout", tone: "rule", title: "Financial years", md: "CT rates are set by **financial year (FY)**, which runs **1 April to 31 March** and is named after the calendar year it **starts**. So **FY2024** is the year from **1 April 2024 to 31 March 2025**. Watch for a period of account that straddles 31 March if the rates change." },
        { kind: "text", md: "The rules are unified: whatever the CAP, we assemble **all** the company's income and gains into a single figure — **taxable total profits** — and apply the rate to it. That single figure is where we head next." },
      ],
      check: {
        q: "A company prepares its first set of accounts for the 15 months to 31 December 2024. How many corporation tax accounting periods does this create?",
        options: [
          "One 15-month period",
          "Two periods: the first 12 months, then the remaining 3 months",
          "Two equal periods of 7.5 months each",
          "Three periods of 5 months each",
        ],
        correct: 1,
        explain: "A chargeable accounting period can never exceed 12 months. A 15-month period of account is split into a 12-month CAP (to 30 September 2024) plus a 3-month CAP (to 31 December 2024). It is not split into equal halves — the first period always takes the full 12 months.",
      },
    },
    {
      id: "ttp",
      heading: "Taxable total profits — the build-up",
      blocks: [
        { kind: "text", md: "A company has no personal allowance and no separate rate bands for different income types — unlike an individual. Instead, every source is poured into one pot. **Taxable total profits (TTP)** add together the **trading profit**, **property income**, **non-trade income** (such as interest and patent royalties) and net **chargeable gains**, then deduct **qualifying charitable donations**." },
        { kind: "formula", name: "Taxable total profits", expr: "Trading profit + Property income + Non-trade income + Chargeable gains − Qualifying charitable donations", note: "Qualifying charitable donations are deducted from TOTAL profits — never inside the trading computation." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Building taxable total profits",
          caption: "Every income stream and net gains flow into one figure, then donations come off the total.",
          data: {
            steps: [
              { label: "Trading profit", sub: "adjusted, after capital allowances" },
              { label: "+ Property income", sub: "rents from property" },
              { label: "+ Non-trade income", sub: "interest, patent royalties" },
              { label: "+ Chargeable gains", sub: "net gains on disposals" },
              { label: "− Qualifying donations", sub: "charitable donations paid" },
              { label: "= Taxable total profits", sub: "the CT charge base" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Dividends are NOT in TTP", md: "Dividends a company **receives** are almost always **exempt** — they are not part of taxable total profits. They reappear later, added to TTP to form **augmented profits**, but only to decide the **rate**, never to be taxed." },
      ],
    },
    {
      id: "adjust",
      heading: "Adjustment of trading profit",
      blocks: [
        { kind: "text", md: "The profit in the accounts is not the taxable trading profit. We must **adjust** it: **add back** expenses that accounting rules allowed but tax law disallows, and **deduct** income that is taxed elsewhere (or not at all). The most common **disallowables** are **depreciation** (tax gives capital allowances instead), **customer entertaining**, **political donations**, fines and penalties, and increases in a **general** (non-specific) provision." },
        { kind: "text", md: "We then **deduct** items credited in the accounts that are **not trading income** — bank interest (taxed as non-trade income), property rental income (property business), and any profit on the sale of a non-current asset (dealt with as a chargeable gain, not trading profit)." },
        { kind: "table", caption: "Common adjustments to accounting profit", head: ["Add back (disallowable)", "Deduct (not trading income)"], rows: [
          ["Depreciation and amortisation", "Bank / loan interest received"],
          ["Customer entertaining", "Property rental income"],
          ["Political donations", "Profit on disposal of a non-current asset"],
          ["Fines, penalties, general provisions", "Dividends received (exempt)"],
        ] },
        { kind: "example", title: "Worked example — adjusting the trading profit", scenario: "Delta Ltd reports a net profit per its accounts of £158,000. Included in it are: depreciation £22,000, customer entertaining £3,000, a political donation £1,000, and an increase in a general provision of £2,000. Also credited in arriving at that profit are bank interest received £8,000, property rental income £12,000, and a £4,000 profit on the sale of a machine. Capital allowances for the period are £22,000. Find the tax-adjusted trading profit.", steps: [
          { label: "Start", detail: "Net profit per accounts = £158,000." },
          { label: "Add back disallowables", detail: "Depreciation £22,000 + entertaining £3,000 + political donation £1,000 + general provision £2,000 = £28,000 added back." },
          { label: "Deduct non-trade income", detail: "Bank interest £8,000 + rental income £12,000 + profit on machine £4,000 = £24,000 deducted (each is taxed under its own heading, not as trading profit)." },
          { label: "Adjusted profit before capital allowances", detail: "£158,000 + £28,000 − £24,000 = £162,000." },
          { label: "Deduct capital allowances", detail: "£162,000 − £22,000 = £140,000." },
        ], result: "Tax-adjusted trading profit = £140,000. The £8,000 interest, £12,000 rent and £4,000 gain do not vanish — they re-enter TTP under their own headings." },
      ],
    },
    {
      id: "ca",
      heading: "Capital allowances",
      blocks: [
        { kind: "text", md: "Depreciation is disallowed, so tax gives its own version of wear-and-tear relief: **capital allowances**. Qualifying plant and machinery is grouped into **pools**. The **main pool** gets a **writing down allowance (WDA) of 18%** each year on the reducing balance; the **special rate pool** (integral features, long-life assets, thermal insulation, cars over 50g/km CO2) gets **6%**." },
        { kind: "text", md: "Two upfront reliefs sit in front of the pools. The **annual investment allowance (AIA)** gives **100%** relief on up to **£1,000,000** of qualifying expenditure (excluding cars). **Full expensing** gives companies an unlimited **100% first-year allowance** on **new and unused main-pool plant** (second-hand assets do not qualify); new special rate assets instead get a **50% FYA**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Main pool vs special rate pool",
          caption: "Because special rate WDA is only 6%, always point the AIA at special rate items first.",
          data: {
            leftTitle: "Main pool",
            rightTitle: "Special rate pool",
            rows: [
              { aspect: "WDA (reducing balance)", left: "18% per year", right: "6% per year" },
              { aspect: "Typical assets", left: "General plant, machinery, vans, most equipment", right: "Integral features, long-life assets, thermal insulation, cars over 50g/km CO2" },
              { aspect: "First-year allowance (new & unused)", left: "Full expensing — 100%", right: "50% FYA" },
              { aspect: "Annual investment allowance", left: "Qualifies (£1,000,000 cap)", right: "Qualifies — allocate AIA here first" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Allocate to save the most tax", md: "AIA and full expensing both give 100%, so use them where WDA is **slowest**. Put **AIA on special rate items first** (they would otherwise crawl at 6%), and use **full expensing** for new main-pool plant so the £1,000,000 AIA is preserved for other assets." },
        { kind: "example", title: "Worked example — capital allowances computation", scenario: "Orion Ltd prepares accounts for the year ended 31 March 2025. Balances brought forward: main pool £52,000, special rate pool £30,000. Additions in the year: new and unused plant for the main pool £240,000; second-hand machinery (main pool) £46,000; a new electrical system (special rate integral features) £150,000. AIA of £1,000,000 is available. Compute the capital allowances.", steps: [
          { label: "Full expensing", detail: "New, unused main-pool plant £240,000 qualifies for 100% full expensing = £240,000 allowance." },
          { label: "AIA — special rate first", detail: "Integral features £150,000 given AIA at 100% = £150,000." },
          { label: "AIA — then main pool", detail: "Second-hand machinery £46,000 given AIA at 100% = £46,000. AIA used £150,000 + £46,000 = £196,000, well under £1,000,000." },
          { label: "Main pool WDA", detail: "Only the brought-forward £52,000 remains in the main pool (AIA/full-expensing items are already fully relieved). WDA at 18% = £52,000 × 18% = £9,360. TWDV c/f = £52,000 − £9,360 = £42,640." },
          { label: "Special rate WDA", detail: "Only the brought-forward £30,000 remains. WDA at 6% = £30,000 × 6% = £1,800. TWDV c/f = £30,000 − £1,800 = £28,200." },
          { label: "Total allowances", detail: "£240,000 + £196,000 + £9,360 + £1,800 = £447,160." },
        ], result: "Capital allowances for the year = £447,160. An asset gets AIA/FYA OR enters the pool for WDA — never both in the same year." },
        { kind: "table", caption: "Orion Ltd — capital allowances (year ended 31 March 2025)", head: ["", "AIA / FYA (£)", "Main pool (£)", "Special rate (£)", "Allowances (£)"], rows: [
          ["TWDV brought forward", "", "52,000", "30,000", ""],
          ["New main-pool plant — full expensing 100%", "240,000", "", "", "240,000"],
          ["Special rate integral features", "150,000", "", "", ""],
          ["Second-hand machinery (main pool)", "46,000", "", "", ""],
          ["AIA at 100% (£196,000 used)", "(196,000)", "", "", "196,000"],
          ["WDA — main pool at 18%", "", "(9,360)", "", "9,360"],
          ["WDA — special rate at 6%", "", "", "(1,800)", "1,800"],
          ["TWDV carried forward", "", "42,640", "28,200", ""],
          ["Total allowances", "", "", "", "447,160"],
        ] },
      ],
      check: {
        q: "Orion buys second-hand machinery for £46,000 (main pool) and new integral features for £150,000 (special rate). AIA of £1,000,000 is available. To maximise relief, how should the AIA be allocated?",
        options: [
          "All to the main-pool machinery first",
          "To the special rate integral features first, then the main-pool machinery",
          "Split equally between the two",
          "AIA cannot be claimed on integral features",
        ],
        correct: 1,
        explain: "AIA and WDA both eventually relieve the cost, but WDA is far slower on the special rate pool (6%) than the main pool (18%). Directing the AIA at the special rate integral features first accelerates relief the most; the leftover AIA then covers the main-pool machinery. AIA absolutely can be claimed on integral features — that is exactly where it is most valuable.",
      },
    },
    {
      id: "rates",
      heading: "The rates and marginal relief",
      blocks: [
        { kind: "text", md: "Once TTP is fixed, three outcomes are possible. If profits are low, the **small profits rate of 19%** applies. If profits are high, the **main rate of 25%** applies. In between, tax is charged at 25% and then **marginal relief** shaves a slice off, so the effective rate rises smoothly between the two." },
        { kind: "callout", tone: "key", title: "The limits — tested on augmented profits", md: "**Augmented profits ≤ £50,000** → small profits rate **19%**. **Augmented profits ≥ £250,000** → main rate **25%**. **Between £50,000 and £250,000** → main rate **25% less marginal relief**. Augmented profits = **TTP + exempt dividends** received from non-group companies. The 25% is still charged on **TTP**, not on augmented profits." },
        { kind: "formula", name: "Marginal relief", expr: "(U − A) × (N ÷ A) × 3/200", note: "U = upper limit £250,000; A = augmented profits; N = taxable total profits (TTP). Standard fraction = 3/200." },
        { kind: "example", title: "Worked example — full CT computation with marginal relief", scenario: "Vega Ltd (a single company with no associates) has, for the year ended 31 March 2025: a tax-adjusted trading profit after capital allowances of £140,000, property income £12,000, non-trade interest £8,000, a chargeable gain £25,000, and it paid qualifying charitable donations of £5,000. It also received a £20,000 dividend from a non-associated company. Compute the corporation tax payable.", steps: [
          { label: "Taxable total profits", detail: "£140,000 + £12,000 + £8,000 + £25,000 − £5,000 = £180,000." },
          { label: "Augmented profits", detail: "TTP £180,000 + exempt dividend £20,000 = £200,000. This is only for the rate test — the dividend is not taxed." },
          { label: "Which rate?", detail: "£200,000 is between £50,000 and £250,000 → main rate 25% with marginal relief." },
          { label: "Tax at main rate", detail: "£180,000 (TTP, not augmented) × 25% = £45,000." },
          { label: "Marginal relief", detail: "(£250,000 − £200,000) × (£180,000 ÷ £200,000) × 3/200 = £50,000 × 0.9 × 0.015 = £675." },
          { label: "CT payable", detail: "£45,000 − £675 = £44,325." },
        ], result: "Corporation tax payable = £44,325, an effective rate of 24.625% (£44,325 ÷ £180,000). Marginal relief is deducted from the 25% charge, never added." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Vega Ltd — from trading profit to taxable total profits",
          caption: "Capital allowances come off the trading profit; every other stream then bridges up to TTP (£180,000).",
          data: {
            unit: "£",
            items: [
              { label: "Trading profit (pre-CA)", value: 162000, kind: "start" },
              { label: "Capital allowances", value: -22000, kind: "delta" },
              { label: "Property income", value: 12000, kind: "delta" },
              { label: "Interest income", value: 8000, kind: "delta" },
              { label: "Chargeable gain", value: 25000, kind: "delta" },
              { label: "Qualifying donations", value: -5000, kind: "delta" },
              { label: "Taxable total profits", value: 180000, kind: "total" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "The 26.5% marginal rate", md: "Between the limits, each extra £1 of profit costs 25p of main-rate tax plus 1.5p of lost marginal relief — a **marginal rate of 26.5%** on profits in the band. That is why companies watch the £250,000 ceiling so closely." },
      ],
      check: {
        q: "A company has taxable total profits of £180,000 and received a £20,000 dividend from a non-associated company, giving augmented profits of £200,000. Which treatment is correct?",
        options: [
          "Small profits rate of 19% on £180,000",
          "Main rate of 25% on £200,000 with no marginal relief",
          "Main rate of 25% on £180,000, less marginal relief",
          "The company is exempt because it received a dividend",
        ],
        correct: 2,
        explain: "Augmented profits of £200,000 fall between £50,000 and £250,000, so the main rate applies with marginal relief. Crucially the 25% is charged on TTP (£180,000), NOT on augmented profits (£200,000) — the dividend only pushes the company into the marginal band, it is never taxed itself.",
      },
    },
    {
      id: "admin",
      heading: "Associated companies, losses, payment and filing",
      blocks: [
        { kind: "text", md: "The £50,000 and £250,000 limits are shared. They are **divided by the number of associated companies** (broadly, companies under common control), counting the company itself. One associate → divide by 2; three associates → divide by 4. The limits are also **time-apportioned** for a CAP shorter than 12 months." },
        { kind: "example", title: "Worked example — associated companies", scenario: "Sirius Ltd has three associated companies (so four companies in the group in total) and augmented profits of £40,000 for the year ended 31 March 2025. Which rate applies?", steps: [
          { label: "Divide the limits", detail: "Lower limit £50,000 ÷ 4 = £12,500. Upper limit £250,000 ÷ 4 = £62,500." },
          { label: "Compare", detail: "Augmented profits £40,000 sit between £12,500 and £62,500." },
          { label: "Conclusion", detail: "Sirius falls into the marginal band — main rate 25% with marginal relief, even though £40,000 alone would be small-profits rate for a standalone company." },
        ], result: "Associated companies pull a company into higher rates by shrinking its limits — always count them before choosing a rate." },
        { kind: "text", md: "**Losses (basics).** A **trading loss** can be set against the company's **total profits of the same accounting period**, then **carried back 12 months** against total profits of the prior period, or **carried forward** against future **total profits** (with flexibility for losses arising from April 2017). A current-period or carry-back claim uses the loss against **all** income and gains, not just future trading profit." },
        { kind: "table", caption: "Payment and filing deadlines", head: ["Obligation", "Deadline"], rows: [
          ["File the CT600 return", "12 months after the end of the accounting period"],
          ["Pay CT (company not 'large')", "9 months and 1 day after the end of the period"],
          ["Pay CT (large: augmented profits over £1.5m)", "Quarterly instalments during and after the period"],
          ["Retain records", "6 years from the end of the accounting period"],
        ] },
        { kind: "callout", tone: "warn", title: "Filing and paying are different dates", md: "The **payment** deadline (9 months and 1 day) falls **before** the **filing** deadline (12 months). A common slip is to assume tax is only due when the return is filed — it is not." },
      ],
    },
  ],
  examTraps: [
    { trap: "Charging the 25% rate on augmented profits instead of on TTP.", fix: "Augmented profits (TTP + exempt dividends) only pick the rate and set the marginal-relief limits. Tax is always charged on TTP." },
    { trap: "Forgetting to divide the £50,000 / £250,000 limits by associated companies.", fix: "Divide BOTH limits by the number of associated companies including the company itself, and time-apportion for a short period." },
    { trap: "Claiming both AIA (or full expensing) and a WDA on the same addition in the year of purchase.", fix: "An asset gets 100% AIA/FYA in the year, OR it enters the pool for WDA — never both in the same period." },
    { trap: "Applying full expensing to second-hand plant.", fix: "Full expensing is for NEW and UNUSED main-pool plant only. Second-hand plant must use the AIA instead." },
    { trap: "Deducting qualifying charitable donations inside the trading profit adjustment.", fix: "QCDs come off TOTAL profits after all income streams and gains are added — not within the trading computation." },
  ],
  keyTerms: [
    { term: "Accounting period (CAP)", def: "The period for which corporation tax is charged; it can never exceed 12 months, so a longer period of account is split." },
    { term: "Taxable total profits (TTP)", def: "Trading profit + property income + non-trade income + chargeable gains − qualifying charitable donations. The base the CT rate is applied to." },
    { term: "Augmented profits", def: "TTP plus exempt dividends received from non-group companies; used only to test the rate limits, never taxed." },
    { term: "Annual investment allowance (AIA)", def: "100% relief on up to £1,000,000 of qualifying plant and machinery each year (cars excluded)." },
    { term: "Full expensing", def: "An unlimited 100% first-year allowance for companies on new and unused main-pool plant and machinery." },
    { term: "Writing down allowance (WDA)", def: "Annual reducing-balance allowance on pooled expenditure: 18% for the main pool, 6% for the special rate pool." },
    { term: "Marginal relief", def: "A deduction that bridges the 19% and 25% rates where augmented profits fall between £50,000 and £250,000, using the 3/200 fraction." },
  ],
  summary: [
    "Corporation tax is charged on the taxable total profits of an accounting period (maximum 12 months) for UK resident companies.",
    "TTP = trading profit + property income + non-trade income + chargeable gains − qualifying charitable donations; received dividends are exempt.",
    "Adjust accounting profit by adding back disallowables (depreciation, entertaining, general provisions) and deducting non-trade income, then subtract capital allowances.",
    "Capital allowances: full expensing 100% on new main-pool plant, AIA 100% on up to £1,000,000, then WDA 18% (main) / 6% (special rate); put AIA on special rate first.",
    "Rates: 19% up to £50,000, 25% from £250,000, marginal relief between using (£250,000 − augmented) × TTP/augmented × 3/200; divide limits by associated companies; pay 9 months + 1 day after period end.",
  ],
}
