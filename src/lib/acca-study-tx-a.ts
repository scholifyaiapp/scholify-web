import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX (Taxation UK) · Area A — Income tax & national insurance.
 * UK FA2024/25 basis. Every threshold and rate is stated in the text so the
 * chapter teaches the METHOD of the income tax computation, not memorised
 * numbers. All figures re-solved digit-by-digit. Original, syllabus-aligned;
 * no ACCA/Kaplan/BPP text. Currency: £ throughout (UK tax).
 */

export const TX_A: StudyChapter = {
  paper: "TX",
  area: "A",
  title: "Income tax & national insurance",
  minutes: 17,
  intro: "An income tax return is not a guess — it is a proforma. Learn the five columns of income, the order they are taxed in, and three allowances, and almost any income tax question becomes a fill-in-the-blanks exercise.",
  outcomes: [
    "Build the income tax computation from total income through net income to taxable income",
    "Apply the personal allowance and taper it £1 for every £2 of adjusted net income over £100,000",
    "Tax income in the correct order — non-savings, then savings, then dividends — across the basic, higher and additional rate bands",
    "Use the savings starting rate band, the personal savings allowance and the dividend allowance correctly",
    "Compute Class 1, Class 2 and Class 4 national insurance on FA2024/25 rates",
  ],
  sections: [
    {
      id: "proforma",
      heading: "The income tax computation — five columns, three lines",
      blocks: [
        { kind: "text", md: "Income tax is charged on a person for a **tax year** — 6 April to the following 5 April. The 2024/25 tax year runs from **6 April 2024 to 5 April 2025**. Everything a person earns in that year is gathered into one computation, and the computation always has the same shape. Master the shape once and you can attack any question." },
        { kind: "text", md: "Income arrives in different **types**, and the type matters because different types are taxed at different rates. The five you meet are **employment income**, **trading (self-employment) income**, **property income**, **savings income** (interest) and **dividend income**. The first three behave the same way and are lumped together as **non-savings income**; savings and dividends each get their own rates later." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The seven steps of an income tax computation",
          caption: "Add the income, strip out reliefs and the allowance, then apply the rates in order.",
          data: {
            steps: [
              { label: "Employment + trading + property", sub: "non-savings income" },
              { label: "+ Savings income", sub: "bank & building society interest" },
              { label: "+ Dividend income", sub: "from shares" },
              { label: "= Total income", sub: "everything, gross" },
              { label: "− Reliefs", sub: "e.g. qualifying loan interest → Net income" },
              { label: "− Personal allowance", sub: "→ Taxable income" },
              { label: "Apply rates in order", sub: "non-savings → savings → dividends" },
            ],
          },
        } },
        { kind: "table", caption: "The three sub-totals every computation runs through", head: ["Line", "How you get there", "Why it matters"], rows: [
          ["Total income", "Add all five income types, gross", "The starting pool"],
          ["Net income", "Total income less reliefs (e.g. qualifying interest)", "The base for the personal allowance taper"],
          ["Taxable income", "Net income less the personal allowance", "The figure the tax rates bite on"],
        ] },
        { kind: "callout", tone: "key", title: "The one idea", md: "An income tax computation is a proforma: **add income by type**, subtract reliefs to reach **net income**, subtract the **personal allowance** to reach **taxable income**, then tax it **non-savings first, savings next, dividends last**. Every question is a variation on this." },
      ],
    },
    {
      id: "pa",
      heading: "The personal allowance and its taper",
      blocks: [
        { kind: "text", md: "Everyone starts with a slice of tax-free income called the **personal allowance (PA)**. For 2024/25 it is **£12,570**. It is deducted from net income to reach taxable income, and — this is the exam favourite — it is deducted from **non-savings income first**, then savings, then dividends, because that wastes the least tax." },
        { kind: "text", md: "The catch is that high earners lose it. Once **adjusted net income (ANI)** exceeds **£100,000**, the PA is reduced by **£1 for every £2** of income above that threshold. Because £12,570 × 2 = £25,140, the allowance disappears completely once ANI reaches **£125,140** (£100,000 + £25,140)." },
        { kind: "formula", name: "Personal allowance after taper", expr: "PA = £12,570 − (ANI − £100,000) / 2", note: "Never let the result go below £0. Full PA if ANI ≤ £100,000; nil PA if ANI ≥ £125,140." },
        { kind: "callout", tone: "rule", title: "What is adjusted net income?", md: "**ANI** is net income (total income less reliefs) minus the **gross** amount of any personal pension contributions and gift aid donations. For a straightforward employee with no pension top-ups, ANI simply equals net income." },
        { kind: "example", title: "Worked example — tapering the allowance", scenario: "Omar has net income (all salary) of £110,000 in 2024/25 and makes no pension or gift aid payments. What is his personal allowance?", steps: [
          { label: "Find adjusted net income", detail: "No pension or gift aid, so ANI = net income = £110,000." },
          { label: "Excess over £100,000", detail: "£110,000 − £100,000 = £10,000." },
          { label: "Reduce PA by half the excess", detail: "£10,000 / 2 = £5,000 lost." },
          { label: "Personal allowance", detail: "£12,570 − £5,000 = £7,570." },
        ], result: "Omar's personal allowance is £7,570. His marginal rate on that £10,000 band is brutal: he pays 40% on the income AND loses PA, giving an effective rate of about 60% between £100,000 and £125,140." },
      ],
      check: {
        q: "Priti has adjusted net income of £120,000 in 2024/25 (no pension or gift aid). What is her personal allowance?",
        options: [
          "£12,570",
          "£7,570",
          "£2,570",
          "£0",
        ],
        correct: 2,
        explain: "Excess over £100,000 is £120,000 − £100,000 = £20,000. The PA is cut by half of that: £20,000 / 2 = £10,000. So PA = £12,570 − £10,000 = £2,570. It only reaches nil at ANI of £125,140, so £0 is too far; £7,570 uses a £10,000 excess, not £20,000.",
      },
    },
    {
      id: "bands",
      heading: "The tax bands and the order of taxing income",
      blocks: [
        { kind: "text", md: "Taxable income is sliced into **bands**. For 2024/25 the **basic rate band** covers the first **£37,700** of taxable income, the **higher rate band** runs from £37,701 up to **£125,140**, and the **additional rate band** is everything above £125,140. The rate applied depends on both the band AND the type of income sitting in it." },
        { kind: "text", md: "Order is everything. You always fill the bands with **non-savings income first**, then **savings income**, then **dividend income** on top. This ordering is not optional and it is the single biggest source of marks lost in Area A — put dividends in the basic band before employment income and every number afterwards is wrong." },
        { kind: "formula", name: "Non-savings income rates 2024/25", expr: "20% to £37,700 · 40% £37,701–£125,140 · 45% over £125,140", note: "These basic / higher / additional rates apply to employment, trading and property income." },
        { kind: "table", caption: "2024/25 rates by band and income type", head: ["Band", "Taxable income", "Non-savings", "Savings", "Dividends"], rows: [
          ["Basic rate", "£0 – £37,700", "20%", "20%", "8.75%"],
          ["Higher rate", "£37,701 – £125,140", "40%", "40%", "33.75%"],
          ["Additional rate", "Over £125,140", "45%", "45%", "39.35%"],
        ] },
        { kind: "callout", tone: "warn", title: "Bands are shared, not separate", md: "There is one set of bands for the whole computation. If non-savings income already fills £30,000 of the £37,700 basic band, only **£7,700** of basic band is left for savings and dividends to sit in before they hit the higher rate." },
      ],
      check: {
        q: "A taxpayer's non-savings taxable income of £37,700 uses the whole basic rate band. On top sit £2,000 of dividends. After the £500 dividend allowance, at what rate is the remaining £1,500 of dividends taxed?",
        options: [
          "8.75%, because dividends have their own low rate",
          "33.75%, because the basic band is already full so they fall in the higher band",
          "20%, the basic rate",
          "0%, dividends are tax-free",
        ],
        correct: 1,
        explain: "Dividends sit on TOP of everything else. The basic band is fully used by the £37,700 of non-savings income, so the dividends fall into the higher rate band and are taxed at the dividend higher rate of 33.75%. 8.75% would only apply if basic band were still available; the £1,500 is beyond the £500 allowance so is not 0%.",
      },
    },
    {
      id: "savings-dividends",
      heading: "Savings and dividend income — the special allowances",
      blocks: [
        { kind: "text", md: "Savings and dividend income are taxed at the same band boundaries but with their own rates and their own tax-free allowances. Get these three allowances right and this topic is done." },
        { kind: "text", md: "**Savings starting rate band.** The first **£5,000** of *savings* income can be taxed at **0%** — but this band is reduced £1 for £1 by any **non-savings** taxable income. So if non-savings income is £5,000 or more, the starting rate band is gone. It only helps people with very low non-savings income (e.g. a pensioner living on interest)." },
        { kind: "formula", name: "Savings starting rate band", expr: "£5,000 − non-savings taxable income (minimum £0)", note: "Taxed at 0%. Fully wiped out once non-savings taxable income reaches £5,000." },
        { kind: "text", md: "**Personal savings allowance (PSA).** On top of any starting rate band, a slice of savings income is taxed at **0%**: **£1,000** for a basic rate taxpayer, **£500** for a higher rate taxpayer, and **£0** for an additional rate taxpayer. Note that these 0% allowances still **use up** the tax band they sit in." },
        { kind: "formula", name: "Personal savings allowance 2024/25", expr: "Basic rate £1,000 · Higher rate £500 · Additional rate £0", note: "A 0% band, not a deduction — the income still counts toward filling the bands." },
        { kind: "text", md: "**Dividends.** The **dividend allowance** is **£500** for 2024/25, taxed at **0%** for every taxpayer regardless of rate. Dividends above the allowance are taxed at **8.75%** (basic band), **33.75%** (higher band) and **39.35%** (additional band). Like the PSA, the dividend allowance is a 0% band that still consumes part of the tax band it occupies." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Savings vs dividend income",
          caption: "Same band boundaries, different rates and allowances.",
          data: {
            leftTitle: "Savings income",
            rightTitle: "Dividend income",
            rows: [
              { aspect: "Tax-free allowance", left: "PSA £1,000 / £500 / £0", right: "Dividend allowance £500 (all)" },
              { aspect: "Extra 0% band", left: "Starting rate band up to £5,000", right: "None" },
              { aspect: "Basic rate", left: "20%", right: "8.75%" },
              { aspect: "Higher rate", left: "40%", right: "33.75%" },
              { aspect: "Additional rate", left: "45%", right: "39.35%" },
              { aspect: "Sits in the stack", left: "After non-savings", right: "On the very top" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Allowances use the band", md: "The PSA and dividend allowance are taxed at 0% but they are **not** removed from taxable income — they still fill up the basic (or higher) band. Forgetting this pushes later income into the wrong band." },
      ],
      check: {
        q: "Nadia is a higher rate taxpayer and receives £900 of bank interest in 2024/25. Her non-savings taxable income is well above £5,000. How much of the interest is taxed at 0%?",
        options: [
          "£1,000 — the personal savings allowance",
          "£900 — all of it, via the starting rate band",
          "£500 — the higher rate personal savings allowance",
          "£0 — higher rate taxpayers get no allowance",
        ],
        correct: 2,
        explain: "The savings starting rate band is nil because non-savings income exceeds £5,000. As a higher rate taxpayer Nadia's PSA is £500, so £500 of the interest is taxed at 0% and the remaining £400 is taxed at 40%. The £1,000 PSA is only for basic rate taxpayers; additional rate taxpayers get £0.",
      },
    },
    {
      id: "worked",
      heading: "A full worked income tax computation",
      blocks: [
        { kind: "text", md: "Now assemble the whole machine. This is the kind of computation an exam asks for — three income types, the personal allowance, the ordering rule, and every allowance in play." },
        { kind: "example", title: "Worked example — Priya, 2024/25", scenario: "Priya has employment income of £52,000 (salary plus a taxable benefit), building society interest of £2,000, and dividends of £5,000. She makes no pension or gift aid contributions. Compute her income tax liability for 2024/25.", steps: [
          { label: "Total income", detail: "£52,000 + £2,000 + £5,000 = £59,000. No reliefs, so net income = £59,000." },
          { label: "Personal allowance", detail: "ANI £59,000 is below £100,000, so the full £12,570 PA applies. Deduct it from the non-savings (employment) income first." },
          { label: "Taxable income by type", detail: "Non-savings £52,000 − £12,570 = £39,430; savings £2,000; dividends £5,000. Total taxable income = £46,430." },
          { label: "Tax the non-savings £39,430", detail: "First £37,700 at 20% = £7,540.00. The remaining £39,430 − £37,700 = £1,730 at 40% = £692.00." },
          { label: "Tax the savings £2,000", detail: "Starting rate band is nil (non-savings exceeds £5,000). Priya is a higher rate taxpayer, so PSA = £500 at 0% = £0. The remaining £1,500 sits in the higher band at 40% = £600.00." },
          { label: "Tax the dividends £5,000", detail: "Dividend allowance £500 at 0% = £0. The remaining £4,500 is in the higher band at 33.75% = £1,518.75." },
          { label: "Add it up", detail: "£7,540.00 + £692.00 + £600.00 + £1,518.75 = £10,350.75." },
        ], result: "Priya's income tax liability for 2024/25 is £10,350.75. Notice the ordering did the work: non-savings filled and overran the basic band, so savings and dividends landed in the higher band despite their allowances." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "From total income to taxable income",
          caption: "The personal allowance is the only deduction on the way down.",
          data: {
            unit: "£",
            items: [
              { label: "Total income", value: 59000, kind: "start" },
              { label: "Personal allowance", value: -12570, kind: "delta" },
              { label: "Taxable income", value: 46430, kind: "total" },
            ],
          },
        } },
        { kind: "table", caption: "Priya's computation laid out in columns", head: ["", "Non-savings £", "Savings £", "Dividend £", "Total £"], rows: [
          ["Employment income", "52,000", "—", "—", "52,000"],
          ["Building society interest", "—", "2,000", "—", "2,000"],
          ["Dividends", "—", "—", "5,000", "5,000"],
          ["Total / net income", "52,000", "2,000", "5,000", "59,000"],
          ["Less personal allowance", "(12,570)", "—", "—", "(12,570)"],
          ["Taxable income", "39,430", "2,000", "5,000", "46,430"],
        ] },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Where the £10,350.75 of tax comes from",
          caption: "Tax charged in each slice of Priya's computation.",
          data: {
            unit: "£",
            items: [
              { label: "Non-savings @ 20%", value: 7540 },
              { label: "Non-savings @ 40%", value: 692 },
              { label: "Savings @ 40%", value: 600 },
              { label: "Dividends @ 33.75%", value: 1518.75 },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Read the tax charge back", md: "The £500 savings and £500 dividend allowances were both taxed at **0%**, but because the basic band was already full they saved nothing here — they merely stopped £1,000 of income being taxed at 40%/33.75%. That is exactly how a 0% band behaves." },
      ],
    },
    {
      id: "employment-trading-nic",
      heading: "Employment income, trading income & national insurance",
      blocks: [
        { kind: "text", md: "Two of the non-savings columns deserve a closer look, and then the second tax that rides alongside income tax: national insurance." },
        { kind: "text", md: "**Employment income** is taxed on the **receipts basis** — the earlier of when payment is received or when the employee becomes entitled to it — and includes cash pay plus the taxable value of **benefits** such as a company car, private medical insurance or a beneficial loan. Employees may deduct expenses only if incurred **wholly, exclusively and necessarily** in performing the duties, a deliberately tight test." },
        { kind: "text", md: "**Trading income** is the taxable profit of the self-employed. Accounting profit is adjusted for tax: **add back** disallowable expenses (e.g. entertaining, depreciation, private-use portions) and **deduct** capital allowances. From 2024/25 the **cash basis is the default** for unincorporated traders, with the accruals basis available by election. Small casual income up to the **£1,000 trading allowance** is exempt automatically." },
        { kind: "text", md: "**National insurance contributions (NIC)** are a separate charge on earned income — employment and trading income only, never savings or dividends. There are several classes, split between what an employee pays, what an employer pays, and what the self-employed pay." },
        { kind: "table", caption: "National insurance 2024/25 — the headline classes", head: ["Class", "Who pays", "Rate", "On"], rows: [
          ["Class 1 primary", "Employee", "8% then 2%", "Earnings £12,570–£50,270, then 2% above"],
          ["Class 1 secondary", "Employer", "13.8%", "Earnings above £9,100"],
          ["Class 1A", "Employer", "13.8%", "Taxable benefits (paid annually)"],
          ["Class 2", "Self-employed", "Treated as paid", "Profits ≥ £6,725 (voluntary £3.45/wk below)"],
          ["Class 4", "Self-employed", "6% then 2%", "Profits £12,570–£50,270, then 2% above"],
        ] },
        { kind: "formula", name: "Class 1 employee (primary) NIC", expr: "(earnings − £12,570) × 8% up to £50,270, then × 2% above £50,270", note: "£12,570 is the primary threshold; £50,270 is the upper earnings limit." },
        { kind: "formula", name: "Class 4 self-employed NIC", expr: "(profits − £12,570) × 6% up to £50,270, then × 2% above £50,270", note: "Mirrors Class 1 thresholds but at the lower self-employed rates." },
        { kind: "example", title: "Worked example — employee NIC", scenario: "Sam is employed on a salary of £48,000 for 2024/25 with no taxable benefits. What is his Class 1 primary (employee) NIC?", steps: [
          { label: "Earnings within the main band", detail: "£48,000 is below the £50,270 upper earnings limit, so all of the band above the £12,570 threshold is at 8%." },
          { label: "Band charged", detail: "£48,000 − £12,570 = £35,430." },
          { label: "Apply 8%", detail: "£35,430 × 8% = £2,834.40. No earnings above £50,270, so no 2% slice." },
        ], result: "Sam's Class 1 employee NIC is £2,834.40. If instead he were self-employed with £48,000 of profit, Class 4 would be £35,430 × 6% = £2,125.80 — the self-employed pay less because they receive fewer state benefits." },
        { kind: "callout", tone: "warn", title: "Use the 2024/25 rates", md: "The employee Class 1 main rate is **8%** and the Class 4 main rate is **6%** for 2024/25 — both were cut during 2024. Answers using the old 12% or 9% rates are a classic trap." },
      ],
    },
  ],
  examTraps: [
    { trap: "Taxing income in the wrong order.", fix: "Always fill the bands with non-savings income first, then savings, then dividends on top. The rates depend on which band each type lands in." },
    { trap: "Giving the full £12,570 personal allowance to someone earning over £100,000.", fix: "Taper it: reduce by £1 for every £2 of adjusted net income over £100,000. It reaches nil at £125,140." },
    { trap: "Removing the PSA or dividend allowance from taxable income.", fix: "They are 0% bands, not deductions. The income still uses up the basic/higher band, so later income can be pushed up a band." },
    { trap: "Applying the £5,000 savings starting rate band when non-savings income is above £5,000.", fix: "The band is reduced £1 for £1 by non-savings taxable income, so it is nil once that reaches £5,000." },
    { trap: "Using old NIC rates.", fix: "For 2024/25 employee Class 1 is 8% (then 2%) and Class 4 is 6% (then 2%) — not the old 12% and 9%." },
  ],
  keyTerms: [
    { term: "Adjusted net income", def: "Net income less the gross amount of personal pension contributions and gift aid; the measure used to taper the personal allowance above £100,000." },
    { term: "Personal allowance", def: "The £12,570 tax-free slice of income for 2024/25, tapered £1 for every £2 of adjusted net income over £100,000 and nil at £125,140." },
    { term: "Personal savings allowance", def: "A 0% band on savings income: £1,000 for basic rate, £500 for higher rate and £0 for additional rate taxpayers." },
    { term: "Savings starting rate band", def: "Up to £5,000 of savings income taxed at 0%, reduced £1 for £1 by non-savings taxable income." },
    { term: "Dividend allowance", def: "The first £500 of dividend income taxed at 0% for every taxpayer, on top of which dividends are taxed at 8.75% / 33.75% / 39.35%." },
  ],
  summary: [
    "Build the computation: add the five income types to total income, deduct reliefs for net income, deduct the personal allowance for taxable income.",
    "The 2024/25 personal allowance is £12,570, tapered £1 for every £2 of adjusted net income over £100,000 and nil at £125,140.",
    "Tax non-savings income first, then savings, then dividends, across the basic (£37,700 at 20%), higher (to £125,140 at 40%) and additional (45%) bands.",
    "Savings get a starting rate band up to £5,000 and a PSA of £1,000/£500/£0; dividends get a £500 allowance then 8.75%/33.75%/39.35% — all 0% bands still use up the tax band.",
    "NIC hits earned income only: Class 1 employee 8% then 2%, employer 13.8%, Class 4 self-employed 6% then 2%, on 2024/25 thresholds.",
  ],
}
