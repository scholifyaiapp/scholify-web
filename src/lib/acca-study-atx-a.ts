import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX (Advanced Taxation, UK) · Area A — Income tax & NIC (advanced).
 * FA2024/25 basis. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 * Thresholds are stated in the text so the chapter teaches METHOD, not memory.
 */

export const ATX_A: StudyChapter = {
  paper: "ATX",
  area: "A",
  title: "Income tax & NIC (advanced)",
  minutes: 17,
  intro: "TX taught you to fill in the income tax computation. ATX asks the harder question: given the choices open to this person, what should they do — and what does it cost in tax and NIC? This is planning under FA2024/25.",
  outcomes: [
    "Distinguish employment from self-employment and apply the off-payroll (IR35) rules",
    "Compare the tax-advantaged share schemes — EMI, CSOP, SAYE and SIP",
    "Calculate a termination package split using PENP and the £30,000 exemption",
    "Determine UK residence via the statutory residence test and apply domicile, the remittance basis and double tax relief",
    "Work the pension annual allowance, the taper and carry forward",
    "Explain EIS, SEIS and VCT income tax reliefs, and the taxation of partners and trust income",
  ],
  sections: [
    {
      id: "status",
      heading: "Employment vs self-employment & IR35",
      blocks: [
        { kind: "text", md: "Almost every income tax planning question starts with one fork: is this person **employed** or **self-employed**? The label is not the taxpayer's to choose — it follows the **reality of the engagement**, tested through the classic badges of trade: **control** (who decides how, when and where the work is done), **personal service** (must *they* do it, or can they send a substitute), **mutuality of obligation** (must the engager offer work and the worker accept), and who bears **financial risk** and provides the **equipment**." },
        { kind: "text", md: "The stakes are real money. An employee suffers **PAYE** and **Class 1 primary NIC** (with the employer paying **Class 1 secondary** on top and losing corporation tax relief only on the wage, not on the NIC saving). A self-employed trader pays income tax through self-assessment plus the far cheaper **Class 2 and Class 4 NIC**, deducts a wider range of expenses, and gets a cash-flow edge from later payment dates. That gap is exactly why HMRC polices the boundary." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Same £50,000 of reward, two very different tax footprints",
          caption: "Illustrative — the direction of travel, not a full computation.",
          data: {
            leftTitle: "Employee",
            rightTitle: "Self-employed",
            rows: [
              { aspect: "Income tax collected", left: "PAYE at source", right: "Self-assessment, in arrears" },
              { aspect: "Worker NIC", left: "Class 1 primary (8% / 2%)", right: "Class 2 + Class 4 (6% / 2%)" },
              { aspect: "Engager NIC", left: "Class 1 secondary 13.8%", right: "None" },
              { aspect: "Expense rule", left: "Wholly, exclusively AND necessarily", right: "Wholly and exclusively (wider)" },
              { aspect: "Risk & control", left: "Low — works under direction", right: "High — bears own risk" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The off-payroll (IR35) rules", md: "Where a worker supplies services through their own **personal service company (PSC)** but *would have been an employee* if engaged directly, IR35 applies. For **large and medium private-sector** clients (and all public-sector clients), the **end client** decides status and the **fee-payer** operates PAYE/NIC on the deemed payment. Only where the client is **small** does the **PSC itself** apply the old rules and compute the deemed employment payment." },
        { kind: "example", title: "Worked example — the deemed direct-engagement test", scenario: "Priya works through her company, PriyaTech Ltd, for a large media group. She works set hours at the client's desk, uses the client's equipment, cannot send a substitute and takes no financial risk. The client has assessed her as inside IR35. Priya argues she is 'a contractor, so self-employed'. Is the client right?", steps: [
          { label: "Strip out the company", detail: "IR35 asks: ignore PriyaTech Ltd — if Priya contracted *directly* with the client, employed or self-employed?" },
          { label: "Apply the badges", detail: "Control by the client, no substitution, no financial risk, client's equipment — every badge points to employment." },
          { label: "Who acts", detail: "The client is large, so the client makes the status determination and the fee-payer deducts PAYE and Class 1 NIC before paying PriyaTech Ltd." },
          { label: "Effect on Priya", detail: "The deemed payment is taxed as employment income; the company receives the fee net of tax and NIC already suffered." },
        ], result: "The client is right: this is **inside IR35**. The contractor label is irrelevant — substance beats form, and because the client is large the deduction happens before the money reaches the PSC." },
      ],
      check: {
        q: "A worker provides services through their own company to a LARGE private-sector client and the engagement is inside IR35. Who is responsible for operating PAYE and NIC on the deemed payment?",
        options: [
          "The worker's personal service company",
          "The fee-payer (the client or agency paying the PSC)",
          "HMRC, by direct assessment on the worker",
          "No one — IR35 only applies in the public sector",
        ],
        correct: 1,
        explain: "For large and medium private-sector clients (and all public-sector clients) the responsibility shifts OFF the PSC: the client determines status and the fee-payer operates PAYE/NIC on the deemed payment. The PSC only self-assesses the deemed payment when the client is small.",
      },
    },
    {
      id: "shares",
      heading: "Tax-advantaged share schemes",
      blocks: [
        { kind: "text", md: "Rewarding staff in shares aligns them with owners, but a plain share gift is taxed as employment income on the full value. The **tax-advantaged schemes** exist to soften that: get the conditions right and there is **no income tax charge on grant**, often none on exercise, and gains fall into the gentler **capital gains tax** regime instead. Four schemes matter for ATX, split into **discretionary** (the company picks who) and **all-employee** (everyone must be invited)." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The four tax-advantaged schemes",
          data: {
            items: [
              { title: "EMI — discretionary", sub: "Options up to £250,000 per employee; company < £30m gross assets, < 250 staff. No IT/NIC on grant or (usually) exercise; CGT on sale, BADR often available." },
              { title: "CSOP — discretionary", sub: "Options up to £60,000 per employee. No income tax on grant; no charge on exercise if held 3+ years or on qualifying events." },
              { title: "SAYE (Save As You Earn) — all-employee", sub: "Save £5–£500/month for 3 or 5 years, then buy shares at up to 20% discount. No income tax on exercise." },
              { title: "SIP (Share Incentive Plan) — all-employee", sub: "Free / partnership / matching shares held in trust. Tax-free if held 5 years; taken out early, income tax bites." },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Why EMI is the planner's favourite", md: "**EMI** combines the biggest individual limit (**£250,000**), no charge on grant, and — provided the option was granted at least **2 years** before sale — the shares usually qualify for **Business Asset Disposal Relief**, taxing the eventual gain at **10%**. The catch is eligibility: only trading companies with **gross assets under £30m** and **fewer than 250 employees** qualify, and certain trades are excluded." },
        { kind: "example", title: "Worked example — EMI vs an unapproved option", scenario: "In 2024/25 Sam exercises share options and immediately sells the shares. Market value at exercise is £80,000; the price Sam pays under the option is £30,000. Sam is a higher-rate taxpayer. Compare an EMI option granted at market value with a plain unapproved option. (Assume the CGT annual exempt amount of £3,000 is used elsewhere.)", steps: [
          { label: "Unapproved — on exercise", detail: "The £50,000 gain (£80,000 − £30,000) is employment income, taxed at 40% = **£20,000** income tax (plus NIC exposure)." },
          { label: "EMI — on exercise", detail: "Granted at market value, so **no income tax on exercise**. The £30,000 cost becomes the CGT base cost." },
          { label: "EMI — on sale", detail: "Sold immediately at £80,000: gain £50,000. With BADR (option held 2+ years) CGT at 10% = **£5,000**." },
          { label: "Compare", detail: "£20,000 income tax (unapproved) vs £5,000 CGT (EMI) on the very same spread." },
        ], result: "The EMI route costs **£5,000** against **£20,000** — a £15,000 saving on identical economics, purely from getting the shares into the CGT/BADR regime instead of the employment income regime." },
      ],
      check: {
        q: "Which scheme allows options over shares worth up to £250,000 per employee and can deliver a 10% CGT rate on sale under Business Asset Disposal Relief?",
        options: [
          "CSOP",
          "SAYE",
          "EMI",
          "SIP",
        ],
        correct: 2,
        explain: "EMI carries the £250,000 individual limit and, where the option is held for at least 2 years, qualifies the shares for BADR (10% CGT). CSOP has a £60,000 limit; SAYE and SIP are all-employee savings/share plans without that headline limit or BADR link.",
      },
    },
    {
      id: "termination",
      heading: "Termination payments — PENP and the £30,000 exemption",
      blocks: [
        { kind: "text", md: "When someone leaves a job, the package can mix several things: unpaid wages, a payment in lieu of notice, a genuine ex-gratia goodbye and statutory redundancy. Each is taxed differently, so the first job is always to **slice the payment into its parts** before touching the famous **£30,000 exemption** — which only ever applies to the genuinely compensatory slice." },
        { kind: "callout", tone: "rule", title: "PENP comes out first", md: "**Post-employment notice pay (PENP)** is the pay the employee *would have earned in any unworked notice period*. It is **always taxable as earnings** and **subject to NIC** — the £30,000 exemption can never touch it. Only the excess of the termination payment over PENP (and over any amount otherwise taxable) competes for the £30,000 exemption." },
        { kind: "formula", name: "PENP (standard formula)", expr: "PENP = (BP × D) ÷ P − T", note: "BP = basic pay in the last pay period before notice; D = unworked notice days; P = days in that pay period; T = amounts already taxable as earnings (e.g. a contractual PILON)." },
        { kind: "example", title: "Worked example — splitting a £50,000 package", scenario: "In 2024/25 Rowan is dismissed without notice, having been entitled to 3 months' notice. The employer pays a single termination sum of £50,000, with no contractual pay-in-lieu clause. Rowan's basic pay is £4,000 per month. How is the £50,000 taxed?", steps: [
          { label: "Compute PENP", detail: "3 months of unworked notice at £4,000 basic pay = **£12,000** PENP. No contractual PILON already taxed, so T = £0." },
          { label: "PENP is earnings", detail: "The £12,000 PENP is taxed in full as employment income and bears NIC. It cannot use the £30,000 exemption." },
          { label: "Remaining slice", detail: "£50,000 − £12,000 = £38,000 is the genuine ex-gratia termination element." },
          { label: "Apply the exemption", detail: "First £30,000 of the £38,000 is exempt; £8,000 is taxable (income tax only — the excess over £30,000 is free of employee NIC, though employer Class 1A applies)." },
          { label: "Total taxable", detail: "£12,000 (PENP) + £8,000 (excess over exemption) = **£20,000** taxable; **£30,000** exempt." },
        ], result: "Of the £50,000, **£30,000 escapes tax**, £12,000 is fully taxable earnings (with NIC), and £8,000 is taxable income above the exemption. Skipping the PENP step and exempting £30,000 of the whole £50,000 is the classic error." },
      ],
    },
    {
      id: "overseas",
      heading: "Overseas aspects — residence, domicile, remittance & DTR",
      blocks: [
        { kind: "text", md: "Whether the UK taxes someone's worldwide income turns on two separate concepts that students constantly blur. **Residence** is a *year-by-year* status decided by the **statutory residence test (SRT)** and governs which income falls into UK charge. **Domicile** is a deeper, long-run connection to a country (broadly, your permanent home) and, under FA2024/25, still governs whether a non-domiciled individual can use the **remittance basis**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The statutory residence test — work the tests in order",
          caption: "Stop at the first test that gives an answer.",
          data: {
            steps: [
              { label: "Automatic overseas tests", sub: "e.g. < 16 days in UK (or < 46 if not UK-resident in the prior 3 years); full-time work abroad → NON-resident" },
              { label: "Automatic UK tests", sub: "e.g. 183+ days in UK; only home in UK; full-time work in UK → RESIDENT" },
              { label: "Sufficient ties test", sub: "Count UK ties (family, accommodation, work, 90-day, country) against days in UK" },
              { label: "Conclusion", sub: "The more days present, the fewer ties needed to be UK-resident" },
            ],
          },
        } },
        { kind: "text", md: "A UK-resident, UK-domiciled individual is taxed on **worldwide income** as it arises. A UK-resident **non-domiciled** individual may instead claim the **remittance basis**: only UK income plus foreign income *brought into (remitted to) the UK* is taxed. But that choice has a price for longer-term residents — the **remittance basis charge (RBC)** — and it costs the **personal allowance** and the CGT annual exempt amount too." },
        { kind: "callout", tone: "warn", title: "The remittance basis charge (FA2024/25)", md: "If unremitted foreign income is £2,000 or more, claiming the remittance basis for a longer-stay resident triggers an annual charge: **£30,000** once UK-resident in **7 of the previous 9** tax years, rising to **£60,000** once resident in **12 of the previous 14** tax years. Below the £2,000 threshold the remittance basis applies automatically with **no** charge and **no** loss of the personal allowance." },
        { kind: "text", md: "Where the same income is taxed both abroad and in the UK, **double tax relief (DTR)** prevents it being taxed twice. Relief is given as the **lower of** the UK tax on that source and the overseas tax suffered — computed **source by source**, taking each foreign source as the **top slice** of income to capture the highest UK rate on it." },
        { kind: "example", title: "Worked example — remittance basis or arising basis?", scenario: "Lena is UK-resident and non-UK-domiciled, and has been UK-resident for 8 of the last 9 years. In 2024/25 she has UK employment income of £120,000 and £15,000 of foreign investment income, none of which she remits to the UK. As a higher-rate taxpayer facing 40% on the foreign income, should she claim the remittance basis?", steps: [
          { label: "Cost of the arising basis", detail: "Tax the £15,000 foreign income as it arises: £15,000 × 40% = **£6,000** UK tax." },
          { label: "Cost of the remittance basis", detail: "The £15,000 is not remitted, so it escapes UK tax — but 8 of the last 9 years resident means the **£30,000 RBC** applies, plus loss of the personal allowance." },
          { label: "Compare", detail: "Paying £30,000 (plus PA loss) to shelter £6,000 of tax is plainly worse this year." },
          { label: "Decide", detail: "Claim the **arising basis** for 2024/25 — the RBC only pays off when the sheltered foreign income is large." },
        ], result: "Lena should be taxed on the **arising basis**: £6,000 of UK tax beats a £30,000 charge. The remittance basis only earns its keep once unremitted foreign income is big enough that the tax saved exceeds the RBC." },
      ],
      check: {
        q: "A UK-resident non-domiciled individual has been UK-resident for 13 of the previous 14 tax years and has £40,000 of unremitted foreign income. If she claims the remittance basis, what is the remittance basis charge under FA2024/25?",
        options: [
          "£0 — the remittance basis is always free",
          "£30,000",
          "£60,000",
          "£90,000",
        ],
        correct: 2,
        explain: "The £30,000 charge applies once resident in 7 of the previous 9 years; it rises to £60,000 once resident in 12 of the previous 14 years. At 13 of 14 years she is in the higher band, so the RBC is £60,000 (and she also loses her personal allowance).",
      },
    },
    {
      id: "pensions",
      heading: "Pension planning — annual allowance, taper & carry forward",
      blocks: [
        { kind: "text", md: "Pension contributions are one of the most powerful reliefs in the syllabus: contributions attract relief at the taxpayer's **marginal rate**, and for high earners they can even claw back the personal allowance lost in the £100,000–£125,140 band. The constraint is the **annual allowance** — the maximum that can be saved tax-efficiently each year." },
        { kind: "callout", tone: "rule", title: "The annual allowance and its taper (FA2024/25)", md: "The standard annual allowance is **£60,000**. For very high earners it **tapers**: it is reduced by **£1 for every £2** of **adjusted income** over **£260,000**, down to a **minimum of £10,000**. The taper is switched off entirely unless **threshold income** also exceeds **£200,000** — a gate that protects those whose high income is mostly employer pension input." },
        { kind: "text", md: "Two income measures do the work. **Threshold income** is broadly net income *less* the individual's own gross pension contributions — the gate. **Adjusted income** *adds back* employer (and all) pension inputs — the taper driver. Unused allowance from the **three previous years** can be **carried forward**, provided the person was a pension scheme member in those years and the current year's allowance is used first." },
        { kind: "example", title: "Worked example — the taper, then carry forward", scenario: "In 2024/25 Marcus has adjusted income of £300,000 and threshold income of £230,000. His employer contributes £70,000 to his pension. He has unused annual allowance of £8,000 brought forward from 2021/22 (a scheme member throughout). Is there an annual allowance charge?", steps: [
          { label: "Does the taper apply?", detail: "Threshold income £230,000 > £200,000, so the taper is switched ON." },
          { label: "Size the taper", detail: "Adjusted income £300,000 − £260,000 = £40,000 excess; reduce the allowance by £40,000 ÷ 2 = **£20,000**." },
          { label: "Tapered allowance", detail: "£60,000 − £20,000 = **£40,000** (above the £10,000 floor, so stands)." },
          { label: "Add carry forward", detail: "£40,000 current + £8,000 brought forward = **£48,000** of available allowance." },
          { label: "Compare to input", detail: "Pension input £70,000 − £48,000 available = **£22,000** excess." },
        ], result: "There is an annual allowance charge on **£22,000**, taxed at Marcus's marginal rate to claw back the excess relief. Without spotting either the taper or the £8,000 carry forward, the charge would be badly misstated." },
      ],
      check: {
        q: "An individual has adjusted income of £280,000 and threshold income of £190,000 in 2024/25. What is their annual allowance?",
        options: [
          "£50,000, because adjusted income exceeds £260,000 by £20,000",
          "£60,000 — the taper does not apply",
          "£40,000",
          "£10,000, the minimum",
        ],
        correct: 1,
        explain: "The taper only bites if BOTH adjusted income exceeds £260,000 AND threshold income exceeds £200,000. Here threshold income is only £190,000, so the taper is switched off and the full £60,000 allowance stands. The trap answer applies the £1-for-£2 reduction without first checking the £200,000 threshold-income gate.",
      },
    },
    {
      id: "investments",
      heading: "Venture reliefs, partnerships & trust income",
      blocks: [
        { kind: "text", md: "The final planning cluster rewards taxpayers for backing risky trading companies and for structuring how income is shared. First, the **venture capital reliefs** — EIS, SEIS and VCT — give an **income tax reducer** for subscribing for new shares in qualifying companies, on top of generous CGT treatment." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Venture capital reliefs — income tax reducers (FA2024/25)",
          data: {
            items: [
              { title: "EIS", sub: "30% income tax relief on up to £1,000,000 (£2,000,000 if the excess is in knowledge-intensive companies). Shares held 3 years; CGT deferral available." },
              { title: "SEIS", sub: "50% income tax relief on up to £200,000 for small, early-stage start-ups. Shares held 3 years; up to 50% CGT reinvestment relief." },
              { title: "VCT", sub: "30% income tax relief on up to £200,000 in a listed venture capital trust. Shares held 5 years; dividends and gains tax-free." },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The relief is capped at the tax liability", md: "EIS, SEIS and VCT relief is a **tax reducer**, not a deduction from income — it can cut the tax bill to nil but **cannot create a repayment**. Always compute the reducer as the *lower of* the headline percentage of the subscription and the individual's income tax liability for the year." },
        { kind: "example", title: "Worked example — EIS 30% relief on FA2024/25", scenario: "In 2024/25 Dev subscribes £150,000 for new ordinary shares in a qualifying EIS company and holds them. His income tax liability for the year before EIS relief is £52,000. What EIS income tax relief can he claim?", steps: [
          { label: "Headline relief", detail: "EIS relief is 30% of the amount subscribed: £150,000 × 30% = **£45,000**." },
          { label: "Check the cap", detail: "The reducer cannot exceed the £52,000 liability. £45,000 < £52,000, so it is not restricted." },
          { label: "Apply", detail: "Income tax liability £52,000 − £45,000 relief = **£7,000** payable." },
        ], result: "Dev claims **£45,000** of EIS relief, cutting his bill to £7,000. Had his liability been below £45,000, the relief would have been capped at that liability — never refunded in cash." },
        { kind: "text", md: "**Partnerships** are transparent: the partnership itself pays no income tax. Trading profit is computed for the firm, then **allocated between partners** using the profit-sharing arrangement *in force during the period*, and each partner is taxed and pays Class 4 NIC on their slice as if it were their own trade. A change in the profit-sharing ratio mid-year means time-apportioning the profit between the old and new ratios." },
        { kind: "text", md: "**Trusts** split into two headline types. An **interest in possession** trust pays income tax at the basic rates (**20%**, or **8.75%** on dividends) and the life tenant is entitled to the income. A **discretionary** trust suffers the higher **trust rates** — broadly **45%** (**39.35%** on dividends) above a small standard-rate band — with a tax pool that follows the income out to beneficiaries. The trustees, not the settlor, are normally the persons assessed." },
        { kind: "example", title: "Worked example — allocating partnership profit on a ratio change", scenario: "Amir and Beth trade in partnership. For the year ended 5 April 2025 the firm's tax-adjusted trading profit is £120,000. They shared profits equally for the first 9 months, then 2:1 in Amir's favour for the final 3 months. How much trading profit is each taxed on?", steps: [
          { label: "Split the profit by period", detail: "First 9 months: £120,000 × 9/12 = £90,000. Final 3 months: £120,000 × 3/12 = £30,000." },
          { label: "First period (equal)", detail: "£90,000 split 1:1 → Amir £45,000, Beth £45,000." },
          { label: "Second period (2:1)", detail: "£30,000 split 2:1 → Amir £20,000, Beth £10,000." },
          { label: "Total each", detail: "Amir £45,000 + £20,000 = **£65,000**; Beth £45,000 + £10,000 = **£55,000**." },
        ], result: "Amir is taxed on **£65,000** and Beth on **£55,000** (total £120,000). The ratio in force *during each part of the year* drives the split — applying the final 2:1 ratio to the whole year would overstate Amir's share." },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating a worker's 'contractor' label as settling their status.", fix: "Status follows the badges of the engagement (control, personal service, mutuality, risk), not the label. IR35 strips out the PSC and asks: employee if engaged directly?" },
    { trap: "Applying the £30,000 termination exemption to the whole package.", fix: "Compute PENP first — it is always fully taxable earnings with NIC. Only the excess over PENP competes for the £30,000 exemption." },
    { trap: "Tapering the pension annual allowance whenever adjusted income tops £260,000.", fix: "The taper only bites if threshold income ALSO exceeds £200,000. Check the £200,000 gate before reducing anything." },
    { trap: "Claiming the remittance basis charge is always worth paying.", fix: "Compare the RBC (£30,000, or £60,000 for 12-of-14-year residents) against the UK tax actually saved. For small unremitted income the arising basis wins." },
    { trap: "Treating EIS/SEIS/VCT relief as a deduction that can create a refund.", fix: "It is a tax reducer capped at the income tax liability — lower of the headline percentage and the liability; never repayable in cash." },
  ],
  keyTerms: [
    { term: "IR35 (off-payroll rules)", def: "Rules taxing a worker supplying services through a personal service company as an employee where they would have been one if engaged directly; for large/medium clients the fee-payer operates PAYE/NIC." },
    { term: "PENP", def: "Post-employment notice pay — the value of any unworked notice period, always taxed as earnings and subject to NIC, outside the £30,000 termination exemption." },
    { term: "Statutory residence test", def: "The ordered test (automatic overseas, automatic UK, then sufficient ties) that fixes an individual's UK residence for a tax year." },
    { term: "Remittance basis charge", def: "An annual charge (£30,000 after 7 of 9 years UK-resident; £60,000 after 12 of 14) for a non-dom electing to be taxed only on UK and remitted foreign income." },
    { term: "Adjusted income", def: "Net income plus all pension inputs (including employer contributions); drives the annual allowance taper above £260,000." },
    { term: "EIS relief", def: "A 30% income tax reducer for subscribing for new shares in a qualifying trading company (up to £1m, or £2m for knowledge-intensive), capped at the tax liability." },
  ],
  summary: [
    "Employment vs self-employment turns on the badges of the engagement; IR35 taxes a disguised employee working through a PSC, with the fee-payer operating PAYE/NIC for large/medium clients.",
    "EMI (£250,000 limit, BADR-friendly), CSOP (£60,000), SAYE and SIP move reward out of employment income into the gentler CGT regime.",
    "Termination: compute PENP first (fully taxable earnings), then the £30,000 exemption applies only to the genuine compensatory excess.",
    "Residence (SRT, year-by-year) decides the UK charge; non-doms may elect the remittance basis but weigh the £30,000/£60,000 RBC; DTR relieves the lower of UK and overseas tax source by source.",
    "The pension annual allowance is £60,000, tapered £1-for-£2 above £260,000 adjusted income only if threshold income tops £200,000, with three years' carry forward; EIS/SEIS/VCT give 30%/50%/30% reducers, and partnerships and trusts allocate income to the taxable persons.",
  ],
}
