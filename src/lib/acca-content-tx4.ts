import type { AccaQuestion } from "@/lib/acca-content"

/*
 * TX-UK bank wave 8a — +75 toward 300 (FA2024/25 basis, 2026-07-12).
 *
 * Tax basis (UK FA2024/25-style figures, always restated in the stem where a
 * threshold matters so questions test METHOD, not memorised numbers):
 *   - Personal allowance £12,570, tapered £1 per £2 of adjusted net income over £100,000
 *   - Basic rate band £37,700; savings starting rate band £5,000 at 0%; PSA £1,000/£500
 *   - Trading allowance £1,000; property allowance £1,000; rent-a-room limit £7,500
 *   - Pension annual allowance £60,000, tapered £1 per £2 of adjusted income over
 *     £260,000 (minimum £10,000); 3-year carry forward for scheme members
 *   - Cash basis is the DEFAULT for unincorporated traders from 2024/25 (accruals by election)
 *   - Official rate of interest 2.25%; zero-emission car benefit 2%
 *   - Child benefit charge: 1% per £200 of adjusted net income over £60,000 (full at £80,000)
 *   - Class 1A NIC 13.8% (employer only, on benefits)
 *   - CGT annual exempt amount £3,000; BADR 10%; letting relief max £40,000 (shared occupation)
 *   - CT: small profits rate 19% / main rate 25%; limits £50,000/£250,000 (divided by
 *     associated companies and time-apportioned); marginal relief fraction 3/200
 *   - SBA 3% straight line; VAT standard rate 20%; IHT NRB £325,000; charity rate 36%
 *
 * Every question is ORIGINAL (aligned to the public syllabus only) and every
 * distractor encodes a nameable student error, spelled out in the explanation.
 */

export const TX_WAVE3A: AccaQuestion[] = [
  /* ───────────── Area A — Income tax & NIC (24) ───────────── */

  /* Property income */
  {
    id: "TX3-A-01", paper: "TX", area: "A", type: "number",
    stem: "Freya lets a furnished flat throughout 2024/25 at a rent of £750 per month, payable monthly in advance. The tenant had paid only 11 months' rent by 5 April 2025 — the March 2025 rent was received on 20 April 2025 and recovery was never in doubt. Letting agent fees of £900 accrued for the year. Freya has elected to use the ACCRUALS basis for her property business. What is her property income for 2024/25 in £?",
    numericAnswer: 8100,
    unit: "£",
    explanation: "Under the accruals basis rent is taxed as it falls due, not as received: 12 × £750 = £9,000, less agent fees accrued £900 = £8,100. Using the £8,250 actually received would be the cash basis, which Freya has opted out of.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-02", paper: "TX", area: "A", type: "mcq",
    stem: "Ingrid lets a furnished flat. During 2024/25 she replaced the sofa, selling the old one for £100. The new sofa cost £950, but it is a substantial improvement on the old one — an equivalent replacement would have cost £700. What deduction is available under replacement of domestic items relief?",
    options: [
      "£600",
      "£700",
      "£850",
      "£950",
    ],
    correct: 0,
    explanation: "Relief is limited to the cost of an EQUIVALENT replacement (£700, not the £950 improvement), less the proceeds of the old item (£100) = £600. £850 ignores the improvement cap; £950 ignores both the cap and the proceeds; £700 forgets to deduct the sale proceeds.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-03", paper: "TX", area: "A", type: "mcq",
    stem: "Marta lets a furnished room in her own home to a lodger, receiving gross rents of £9,100 in 2024/25 and incurring allowable expenses of £2,600. The rent-a-room limit is £7,500. What is her LOWEST possible assessable property income for the year?",
    options: [
      "£9,100",
      "£6,500",
      "£1,600",
      "£0",
    ],
    correct: 2,
    explanation: "Receipts exceed £7,500, so rent-a-room does not exempt the income automatically, but Marta can elect the alternative basis: £9,100 − £7,500 = £1,600. This beats the normal basis of £9,100 − £2,600 = £6,500. £0 wrongly assumes full exemption above the limit; £9,100 gives no relief at all.",
    marks: 2, difficulty: "medium",
  },

  /* Trading & property allowances */
  {
    id: "TX3-A-04", paper: "TX", area: "A", type: "mcq",
    stem: "In 2024/25 Callum earned £850 gross from casual gardening work, incurring £120 of expenses. He has no other trading income. The trading allowance is £1,000. Which statement is correct?",
    options: [
      "He is taxable on £730 and must register for self-assessment",
      "The income is covered by the trading allowance automatically, so nothing is taxable",
      "He must elect for the allowance by 31 January 2026 or be taxed on £850",
      "He can deduct both the £1,000 allowance and his £120 expenses",
    ],
    correct: 1,
    explanation: "Gross trading receipts of £1,000 or less are covered by the trading allowance with full relief applying AUTOMATICALLY — no tax, and no need to notify. £730 wrongly taxes the profit anyway; no election is needed at this level; and the allowance is an ALTERNATIVE to expenses, never claimable in addition.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-A-05", paper: "TX", area: "A", type: "mcq",
    stem: "Nadia received gross property income of £1,400 in 2024/25 with allowable expenses of £250. The property allowance is £1,000. What is her lowest possible assessable property income?",
    options: [
      "£1,400",
      "£1,150",
      "£0",
      "£400",
    ],
    correct: 3,
    explanation: "Receipts exceed £1,000 so there is no automatic exemption, but Nadia can elect partial relief: £1,400 − £1,000 allowance = £400, which beats deducting actual expenses (£1,400 − £250 = £1,150). £0 wrongly treats the income as fully exempt; £1,400 claims no relief.",
    marks: 2, difficulty: "easy",
  },

  /* Savings rates & gift aid */
  {
    id: "TX3-A-06", paper: "TX", area: "A", type: "mcq",
    stem: "In 2024/25 Priyanka's taxable income (after the personal allowance) is £6,000 of non-savings income and £2,000 of savings income, all within the basic rate band. The £5,000 savings starting rate band is reduced £1 for £1 by non-savings taxable income, and her personal savings allowance is £1,000. How much of her SAVINGS income is taxed at 0%?",
    options: [
      "£2,000",
      "£1,000",
      "£0",
      "£1,500",
    ],
    correct: 1,
    explanation: "Non-savings taxable income of £6,000 exceeds £5,000, so the starting rate band is fully eroded. The personal savings allowance survives, taxing £1,000 of savings at 0% (the other £1,000 at 20%). £2,000 assumes the starting rate band was still available; £0 wrongly loses the PSA as well.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-A-07", paper: "TX", area: "A", type: "mcq",
    stem: "Rowan, a higher rate taxpayer, paid £1,600 (net) to charity under gift aid in 2024/25. The basic rate band is £37,700 and the basic rate is 20%. How does the donation give Rowan higher rate relief?",
    options: [
      "£1,600 is deducted from his total income",
      "His basic rate band is extended by £1,600 to £39,300",
      "His basic rate band is extended by £2,000 to £39,700",
      "He receives a £400 reduction in his tax liability as a tax credit",
    ],
    correct: 2,
    explanation: "The net donation is grossed up at 100/80: £1,600 × 100/80 = £2,000, and the basic (and higher) rate bands are extended by that GROSS amount. Extending by only £1,600 forgets the gross-up; deducting from income confuses gift aid with payroll giving; there is no separate tax credit mechanism.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-A-08", paper: "TX", area: "A", type: "number",
    stem: "In 2024/25 Sacha has net income of £106,000 and made gift aid donations with a GROSS value of £4,000. The personal allowance of £12,570 is reduced by £1 for every £2 of adjusted net income above £100,000, and adjusted net income is net income less gross gift aid donations. What personal allowance is Sacha entitled to, in £?",
    numericAnswer: 11570,
    unit: "£",
    explanation: "Adjusted net income = £106,000 − £4,000 = £102,000, which is £2,000 over the limit. The allowance is reduced by £2,000 ÷ 2 = £1,000, so £12,570 − £1,000 = £11,570. Forgetting to deduct the gift aid gives ANI of £106,000 and a wrong allowance of £9,570.",
    marks: 2, difficulty: "hard",
  },

  /* Pension annual allowance */
  {
    id: "TX3-A-09", paper: "TX", area: "A", type: "mcq",
    stem: "In 2024/25 Tobias has adjusted income of £300,000 and threshold income well above £200,000. The pension annual allowance of £60,000 is tapered by £1 for every £2 of adjusted income above £260,000, subject to a minimum allowance of £10,000. What is his tapered annual allowance?",
    options: [
      "£60,000",
      "£20,000",
      "£10,000",
      "£40,000",
    ],
    correct: 3,
    explanation: "Adjusted income exceeds £260,000 by £40,000, so the allowance falls by £40,000 ÷ 2 = £20,000, giving £60,000 − £20,000 = £40,000. £20,000 reduces by the full excess instead of half; £10,000 wrongly jumps straight to the minimum; £60,000 ignores the taper.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-A-10", paper: "TX", area: "A", type: "mcq",
    stem: "Uma has been a member of a registered pension scheme for many years and has relevant earnings of £150,000 for 2024/25. Her unused annual allowance is £15,000 from 2022/23 and £20,000 from 2023/24; 2021/22 was fully used. Assume an annual allowance of £60,000 for 2024/25. What is the maximum gross contribution she can make in 2024/25 with full tax relief and NO annual allowance charge?",
    options: [
      "£95,000",
      "£60,000",
      "£35,000",
      "£120,000",
    ],
    correct: 0,
    explanation: "The current year's £60,000 is used first, then unused allowance brought forward from the three previous years (earliest first): £60,000 + £15,000 + £20,000 = £95,000. Her earnings of £150,000 do not restrict this. £60,000 ignores carry forward; £35,000 counts only the carried-forward amounts; £120,000 invents two full current-year allowances.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-11", paper: "TX", area: "A", type: "mcq",
    stem: "Viktor first joined a registered pension scheme on 6 April 2022. Assume an annual allowance of £60,000 for every relevant year, of which he left £12,000 unused in 2022/23 and £18,000 unused in 2023/24. He was NOT a member of any scheme in 2021/22. What total annual allowance is available to him for 2024/25?",
    options: [
      "£150,000",
      "£90,000",
      "£60,000",
      "£30,000",
    ],
    correct: 1,
    explanation: "Carry forward is only available from a year in which the individual was a MEMBER of a registered scheme, so nothing comes from 2021/22. Available = £60,000 + £12,000 + £18,000 = £90,000. £150,000 wrongly adds a full allowance for the non-member year; £30,000 forgets the current year; £60,000 ignores carry forward.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-12", paper: "TX", area: "A", type: "mcq",
    stem: "In 2024/25 Wilma's gross pension contributions exceed her available annual allowance (including all carry forward) by £8,000. How is the excess dealt with?",
    options: [
      "An annual allowance charge adds £8,000 to her taxable income, taxed at her marginal rate(s)",
      "The excess £8,000 is taxed at a flat rate of 55%",
      "The pension scheme must refund the £8,000 to her tax-free",
      "No relief was given on the excess, so no further action is required",
    ],
    correct: 0,
    explanation: "The annual allowance charge claws back the relief by treating the £8,000 excess as extra taxable income at the taxpayer's marginal rate(s). 55% confuses this with old lifetime allowance charges; refunds are not required; and relief WAS given on the contribution, which is exactly why the charge exists.",
    marks: 2, difficulty: "medium",
  },

  /* Employment status & benefits */
  {
    id: "TX3-A-13", paper: "TX", area: "A", type: "mcq",
    stem: "Rhea works exclusively for one design agency. The agency sets her hours, provides her laptop and software, pays her a fixed monthly amount, and she must do the work personally. Her contract describes her as 'a self-employed contractor'. For tax purposes she is most likely:",
    options: [
      "Self-employed, because the contract label is conclusive",
      "Self-employed, because working for a single engager indicates self-employment",
      "Employed, because the overall picture — control, personal service, no financial risk — points to employment despite the label",
      "Employed, but only if she works more than 35 hours per week",
    ],
    correct: 2,
    explanation: "Status is decided on the whole picture, not the contract label: control by the engager, required personal service, fixed regular pay and no financial risk all indicate employment. Exclusivity points TOWARDS employment, not away from it, and there is no hours-per-week test.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-A-14", paper: "TX", area: "A", type: "number",
    stem: "Throughout 2024/25 Zane is provided with a new fully electric company car (0 g/km) with a list price of £36,000. The benefit percentage for zero-emission cars is 2%. Zane pays his employer £600 a year as a condition of the car being available for private use. What is his taxable car benefit for 2024/25 in £?",
    numericAnswer: 120,
    unit: "£",
    explanation: "£36,000 × 2% = £720, less the £600 contribution required for private use = £120. Forgetting to deduct the running contribution gives £720; deducting it from the list price instead is wrong because only CAPITAL contributions reduce the price.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-A-15", paper: "TX", area: "A", type: "mcq",
    stem: "Throughout 2024/25 Bea has a hybrid company car with CO2 emissions of 40 g/km and an electric range of 45 miles, giving a benefit percentage of 8% (as stated in the tax rates provided). The list price was £40,000, optional accessories of £2,000 were fitted from the start, and Bea made a capital contribution of £3,000 (below the £5,000 maximum). What is her car benefit?",
    options: [
      "£360",
      "£2,960",
      "£3,360",
      "£3,120",
    ],
    correct: 3,
    explanation: "Price = £40,000 + £2,000 accessories − £3,000 capital contribution = £39,000; £39,000 × 8% = £3,120. £3,360 forgets the capital contribution; £2,960 omits the accessories; £360 wrongly deducts the £3,000 from the BENEFIT rather than from the price.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-16", paper: "TX", area: "A", type: "number",
    stem: "Cormac's employer lent him £40,000 interest-free on 6 April 2024. He repaid £16,000 on 6 October 2024 and the remaining £24,000 was outstanding at 5 April 2025. Using the AVERAGE method and an official rate of interest of 2.25%, what is his taxable loan benefit for 2024/25 in £?",
    numericAnswer: 720,
    unit: "£",
    explanation: "Average method: (opening £40,000 + closing £24,000) ÷ 2 = £32,000 × 2.25% = £720. Using the opening balance all year gives £900; using only the closing balance gives £540. (The strict method would time-apportion each balance instead.)",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-17", paper: "TX", area: "A", type: "mcq",
    stem: "Which statement about calculating the taxable benefit on an employment-related beneficial loan is correct?",
    options: [
      "The strict (precise) method applies by default and no alternative is permitted",
      "The average method applies by default, but the taxpayer can elect the strict method and HMRC can insist on it",
      "The taxpayer must always use whichever method produces the HIGHER benefit",
      "The employer chooses the method and the choice binds all future years",
    ],
    correct: 1,
    explanation: "The average method is the default. Either the taxpayer can elect for the strict method (usually when it gives a lower figure) or HMRC can impose it (typically where the average method is being exploited). There is no automatic 'higher figure' rule, and the choice is made year by year, not by the employer.",
    marks: 2, difficulty: "medium",
  },

  /* Cash basis & pre-trading */
  {
    id: "TX3-A-18", paper: "TX", area: "A", type: "mcq",
    stem: "Which statement about the cash basis of calculating trading profits for 2024/25 is correct?",
    options: [
      "It is only available if turnover is below £150,000",
      "Companies may elect to use it",
      "It applies to unincorporated traders by DEFAULT; an election is needed to use the accruals basis",
      "Payments for plant and machinery are never deductible under it",
    ],
    correct: 2,
    explanation: "From 2024/25 the cash basis is the default for sole traders and most partnerships, with no turnover limit — traders must ELECT to use the accruals basis instead. Companies are excluded. Payments for plant and machinery (except cars) ARE deductible in full when paid.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-A-19", paper: "TX", area: "A", type: "number",
    stem: "Delia calculates her 2024/25 trading profit using the CASH basis. She received £58,000 from customers, and a further £4,000 of sales invoices were unpaid at the year end. She paid £21,000 for purchases, £6,000 rent, and £9,000 to buy a delivery van used wholly for the trade. What is her taxable trading profit in £?",
    numericAnswer: 22000,
    unit: "£",
    explanation: "Cash basis: receipts £58,000 (the unpaid £4,000 is ignored until received) less payments £21,000 + £6,000 + £9,000 — the van is plant and machinery (not a car), so its cost is deducted in full when paid. Profit = £22,000. Including the £4,000 debtors (£26,000) applies accruals thinking; capitalising the van (£31,000) misses the cash basis rule.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-20", paper: "TX", area: "A", type: "mcq",
    stem: "Elsa began trading on 1 May 2024. Five years earlier she had paid £2,000 for market research into the business idea, and one month before starting she spent £500 entertaining prospective customers. How much is deductible as pre-trading expenditure, and when?",
    options: [
      "£2,500 deductible on 1 May 2024",
      "£2,000 deductible on 1 May 2024; the £500 is never deductible",
      "Nothing — pre-trading expenditure is capital in nature",
      "£500 deductible on 1 May 2024; the £2,000 is too old",
    ],
    correct: 1,
    explanation: "Pre-trading expenditure incurred within SEVEN years of commencement is treated as incurred on the first day of trading — but only if it would have been allowable then. The research (£2,000, five years ago) qualifies; customer entertaining is disallowable in any event. £500 reverses the two rules; the 7-year window comfortably covers 5 years.",
    marks: 2, difficulty: "easy",
  },

  /* Partnerships */
  {
    id: "TX3-A-21", paper: "TX", area: "A", type: "number",
    stem: "Anya and Boris trade in partnership. For the year ended 5 April 2025 the tax-adjusted profit is £96,000. The agreement gives Anya a salary of £12,000 and Boris a salary of £8,000, interest of 5% on capital accounts of £40,000 (Anya) and £20,000 (Boris), with the balance shared 3:2 (Anya:Boris). What is BORIS's total profit share for 2024/25 in £?",
    numericAnswer: 38200,
    unit: "£",
    explanation: "Salaries £20,000 and interest £2,000 + £1,000 = £3,000 are allocated first, leaving £96,000 − £23,000 = £73,000, shared 3:2. Boris: £8,000 + £1,000 + (2/5 × £73,000 = £29,200) = £38,200. A common error is sharing the full £96,000 in the ratio (£38,400) and bolting the salary on top.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-A-22", paper: "TX", area: "A", type: "mcq",
    stem: "Cal and Dana share partnership profits equally. On 6 October 2024 (exactly halfway through the year ended 5 April 2025) they changed the ratio to 3:1 in Cal's favour. The profit for the year is £80,000, accruing evenly, with no salaries or interest. What is CAL's share for 2024/25?",
    options: [
      "£30,000",
      "£40,000",
      "£50,000",
      "£60,000",
    ],
    correct: 2,
    explanation: "The year is split at the date of change: first 6 months £40,000 × 1/2 = £20,000; second 6 months £40,000 × 3/4 = £30,000; total £50,000. £40,000 uses the old ratio all year; £60,000 uses the new ratio all year; £30,000 counts only the second period.",
    marks: 2, difficulty: "hard",
  },

  /* NIC & child benefit */
  {
    id: "TX3-A-23", paper: "TX", area: "A", type: "mcq",
    stem: "In 2024/25 an employer provides an employee with private medical insurance costing £900 and also pays her a £300 cash 'wellness allowance' through payroll. Class 1A NIC is charged at 13.8%. What Class 1A NIC arises?",
    options: [
      "£165.60, on both amounts",
      "£72.00 — Class 1A is payable at the employee rate of 8%",
      "Nil — benefits in kind are not subject to any NIC",
      "£124.20, payable by the employer only, on the medical insurance",
    ],
    correct: 3,
    explanation: "Class 1A (employer only) applies to taxable benefits in kind: £900 × 13.8% = £124.20. The £300 CASH allowance is earnings, so it goes through Class 1 (employee and employer), not Class 1A — including it gives the £165.60 error. Employees never pay Class 1A, and benefits are certainly not NIC-free.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-A-24", paper: "TX", area: "A", type: "mcq",
    stem: "In 2024/25 Hollie has adjusted net income of £68,000 and her partner has £30,000. The household received child benefit of £1,300. The high income child benefit charge applies to the HIGHER partner at 1% of the benefit for every £200 of adjusted net income above £60,000 (fully clawed back at £80,000). What is Hollie's charge?",
    options: [
      "£520",
      "£1,300",
      "£0",
      "£260",
    ],
    correct: 0,
    explanation: "Excess income = £8,000; £8,000 ÷ £200 = 40, so 40% × £1,300 = £520. £1,300 assumes full clawback (only at £80,000+); £0 wrongly looks at the lower partner's income; £260 halves the percentage (a 1% per £400 error).",
    marks: 2, difficulty: "medium",
  },

  /* ───────────── Area B — Chargeable gains (13) ───────────── */

  /* Shares: rights & bonus */
  {
    id: "TX3-B-01", paper: "TX", area: "B", type: "mcq",
    stem: "Esme's share pool holds 4,000 shares in Glyn plc at a cost of £10,000. The company makes a 1-for-4 RIGHTS issue at £2.10 per share, which Esme takes up in full. What is her share pool immediately afterwards?",
    options: [
      "5,000 shares, cost £12,100",
      "5,000 shares, cost £10,000",
      "4,000 shares, cost £12,100",
      "5,000 shares, cost £2,100",
    ],
    correct: 0,
    explanation: "A rights issue is a purchase: 1,000 new shares at £2.10 = £2,100 is ADDED to the pool cost, giving 5,000 shares at £12,100. Leaving the cost at £10,000 treats it like a bonus issue (which is free); the other options mismatch shares and cost.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-B-02", paper: "TX", area: "B", type: "number",
    stem: "Felix's share pool holds 3,000 shares in Hardy plc costing £9,000. The company makes a 1-for-3 BONUS issue, after which Felix sells 1,600 shares for £3.75 each. There are no other transactions. What is his chargeable gain in £?",
    numericAnswer: 2400,
    unit: "£",
    explanation: "The bonus issue adds 1,000 free shares: pool becomes 4,000 shares, cost still £9,000. Disposal: proceeds 1,600 × £3.75 = £6,000; cost 1,600/4,000 × £9,000 = £3,600; gain £2,400. Using the pre-bonus cost per share of £3 (cost £4,800, gain £1,200) is the classic error.",
    marks: 2, difficulty: "medium",
  },

  /* Spouse transfers */
  {
    id: "TX3-B-03", paper: "TX", area: "B", type: "mcq",
    stem: "Hari bought shares for £14,000. When they were worth £22,000 he transferred them to his wife Mina, who later sold them to an unconnected buyer for £26,000. What is MINA's chargeable gain on the sale?",
    options: [
      "£4,000",
      "£12,000",
      "£8,000",
      "£26,000",
    ],
    correct: 1,
    explanation: "Inter-spouse transfers are at no gain/no loss, so Mina inherits Hari's original cost of £14,000: gain = £26,000 − £14,000 = £12,000. £4,000 wrongly uses the £22,000 market value at transfer as her cost; £8,000 taxes Hari's 'gain to date' — nothing is taxed on the transfer itself.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-B-04", paper: "TX", area: "B", type: "mcq",
    stem: "Jonas plans to sell an investment with a large accrued gain. Before the sale he transfers HALF of the holding to his wife, and each spouse then sells to the third-party buyer. Why is this effective for CGT?",
    options: [
      "The transfer to his wife is itself a chargeable disposal at market value, so it achieves nothing",
      "His wife is treated as acquiring at probate value",
      "Anti-avoidance rules tax the whole gain on Jonas anyway",
      "The transfer is at no gain/no loss, and the couple can then use two annual exempt amounts (and both sets of unused rate bands)",
    ],
    correct: 3,
    explanation: "Inter-spouse transfers are at no gain/no loss, so splitting the holding lets each spouse use their own annual exempt amount and rate bands on the ultimate sale. It is standard, accepted planning — there is no market-value charge on the transfer and no anti-avoidance recharacterisation; probate value applies only on death.",
    marks: 2, difficulty: "easy",
  },

  /* Insurance & compensation */
  {
    id: "TX3-B-05", paper: "TX", area: "B", type: "mcq",
    stem: "Kaya's painting, bought for £35,000, was destroyed in a fire. She received insurance proceeds of £60,000 and within 12 months spent £62,000 on a replacement painting, claiming to defer the gain. What is the CGT base cost of the replacement?",
    options: [
      "£37,000",
      "£62,000",
      "£35,000",
      "£27,000",
    ],
    correct: 0,
    explanation: "All the proceeds were reinvested, so the £25,000 gain (£60,000 − £35,000) is fully deferred by deducting it from the replacement's cost: £62,000 − £25,000 = £37,000. £62,000 forgets the rollover; £35,000 simply carries over the old cost; £27,000 subtracts the wrong figure.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-B-06", paper: "TX", area: "B", type: "number",
    stem: "Milo's storage unit (a chargeable asset used in his business) was destroyed. It had cost £52,000, and insurance proceeds of £80,000 were received in January 2025. Within 12 months he spent £74,000 of the proceeds on a replacement and claimed the maximum deferral available. What gain is chargeable in 2024/25 in £ (before the annual exempt amount)?",
    numericAnswer: 6000,
    unit: "£",
    explanation: "The full gain is £80,000 − £52,000 = £28,000. Because £6,000 of the proceeds was NOT reinvested, a gain equal to that shortfall (£6,000, lower than £28,000) stays chargeable now; the remaining £22,000 is deferred against the replacement's cost. Charging the full £28,000 ignores the claim; £0 assumes full reinvestment.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-B-13", paper: "TX", area: "B", type: "mcq",
    stem: "Nils's warehouse was damaged (not destroyed) in a storm. He received compensation of £25,000 from his insurer and spent ALL of it restoring the warehouse, making the available claim. What is the CGT effect in the year of receipt?",
    options: [
      "A part disposal is computed using the A/(A + B) formula",
      "The £25,000 is taxed in full as a chargeable gain",
      "No disposal is treated as occurring; the £25,000 is deducted from the base cost of the warehouse",
      "The £25,000 is exempt and the base cost is unchanged",
    ],
    correct: 2,
    explanation: "Where a capital sum is wholly applied in restoring the damaged asset, the owner can claim that there is NO disposal — instead the compensation is rolled over by deducting it from the asset's base cost (increasing the eventual gain). Without the claim, a part disposal computation would be needed; the receipt is neither fully taxed now nor permanently exempt.",
    marks: 2, difficulty: "medium",
  },

  /* Small part disposals & negligible value */
  {
    id: "TX3-B-07", paper: "TX", area: "B", type: "mcq",
    stem: "Orla owns land that cost £70,000, currently worth £120,000 in total. She sells a small plot for £18,000. The small part disposal claim for land is available because the proceeds do not exceed £20,000 AND are not more than 20% of the value of the whole holding. If she makes the claim, what happens?",
    options: [
      "No chargeable gain arises now, and her base cost is reduced to £52,000",
      "A gain is computed apportioning cost by A/(A + B)",
      "The £18,000 is exempt and her base cost stays £70,000",
      "The £18,000 is taxed in full as a chargeable gain",
    ],
    correct: 0,
    explanation: "Under the small part disposal rule for land, no disposal is recognised: the £18,000 proceeds are instead deducted from cost (£70,000 − £18,000 = £52,000), deferring the gain. The A/(A + B) computation is what the claim REPLACES; the proceeds are neither permanently exempt nor immediately taxable in full.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-B-08", paper: "TX", area: "B", type: "mcq",
    stem: "Petra owns quoted shares that have become worthless while she still holds them. What does a NEGLIGIBLE VALUE claim achieve?",
    options: [
      "The cost is deducted from her other income as a trading loss",
      "She is treated as selling and immediately reacquiring the shares at their negligible value, creating an allowable capital loss without an actual sale",
      "The shares are cancelled and no loss relief is ever available",
      "HMRC refunds the CGT she paid when she bought the shares",
    ],
    correct: 1,
    explanation: "A negligible value claim deems a disposal and reacquisition at the (negligible) current value, crystallising a capital loss while she keeps the shares. It is a CAPITAL loss, not a trading loss (income relief exists only in narrow subscriber-share cases); no CGT is paid on purchase, so nothing is 'refunded'.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-B-09", paper: "TX", area: "B", type: "mcq",
    stem: "Quinn bought unquoted shares for £12,000 in 2018. They became of negligible value during 2023. In June 2024 he makes a negligible value claim specifying a deemed disposal date of 5 April 2024 (the shares were already worthless then). What loss arises, and for which tax year?",
    options: [
      "£12,000 capital loss in 2024/25 — losses always arise in the year of claim",
      "No loss until the shares are actually sold or the company is dissolved",
      "A loss equal to the shares' market value when they became worthless",
      "£12,000 capital loss in 2023/24, because the claim can specify an earlier date within the previous two tax years",
    ],
    correct: 3,
    explanation: "The claim can be backdated to a date up to two tax years before the tax year of claim, provided the shares were already of negligible value at that date — here 5 April 2024, putting the £12,000 loss into 2023/24. Defaulting to the year of claim misses the backdating option; no actual sale is needed; the loss is cost less negligible value (≈ £12,000), not market value.",
    marks: 2, difficulty: "medium",
  },

  /* PRR letting relief & BADR cessation */
  {
    id: "TX3-B-10", paper: "TX", area: "B", type: "mcq",
    stem: "Throughout her entire ownership, Livia occupied 50% of her house as her main residence and let the other 50% to a tenant who lived in the property WITH her. She sells the house realising a gain of £150,000. Letting relief is the lowest of £40,000, the private residence relief given, and the gain attributable to the letting. What is her chargeable gain before the annual exempt amount?",
    options: [
      "£75,000",
      "£110,000",
      "£0",
      "£35,000",
    ],
    correct: 3,
    explanation: "PRR covers the occupied half: £75,000. The let half's gain is £75,000, but letting relief is CAPPED: lowest of £40,000, PRR £75,000, letting gain £75,000 = £40,000. Chargeable = £150,000 − £75,000 − £40,000 = £35,000. £0 forgets the £40,000 cap; £75,000 omits letting relief; £110,000 gives letting relief but no PRR.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-B-11", paper: "TX", area: "B", type: "mcq",
    stem: "Rufus ran a sole-trader bakery for twelve years before CEASING to trade on 30 June 2024. He kept the shop premises (used in the business until cessation) and sold them at a gain in May 2026. Does the disposal qualify for business asset disposal relief?",
    options: [
      "No — relief is lost as soon as the trade ceases",
      "Yes — the asset was used in the business at cessation, the business was owned for at least two years before cessation, and the disposal is within three years of cessation",
      "No — buildings never qualify for the relief",
      "Yes, but only if he reinvests the proceeds in a new business",
    ],
    correct: 1,
    explanation: "On a cessation, BADR extends to assets in use at the date the trade ceased, provided the business had been owned for two years to cessation and the disposal happens within THREE years afterwards — May 2026 is within three years of June 2024. Buildings used in the trade qualify, and there is no reinvestment condition (that is rollover relief thinking).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-B-12", paper: "TX", area: "B", type: "number",
    stem: "In 2024/25 Selma sold her whole trading business, realising qualifying gains of £180,000 — her only disposals. Business asset disposal relief applies (rate 10%), she has made no previous claims against the £1,000,000 lifetime limit, and the annual exempt amount is £3,000. She is a higher rate taxpayer. What is her CGT liability in £?",
    numericAnswer: 17700,
    unit: "£",
    explanation: "(£180,000 − £3,000) × 10% = £17,700. The gains are far below the lifetime limit, and her income tax position is irrelevant because BADR gains are taxed at a flat 10%. Forgetting the annual exempt amount gives £18,000; using 20% doubles the answer.",
    marks: 2, difficulty: "medium",
  },

  /* ───────────── Area C — Corporation tax (16) ───────────── */

  /* Augmented profits: associates & short periods */
  {
    id: "TX3-C-01", paper: "TX", area: "C", type: "mcq",
    stem: "Juno Ltd has ONE associated company and prepared accounts for the EIGHT months to 31 December 2024. The corporation tax upper limit of £250,000 is divided by the number of associated companies (including Juno Ltd itself) and time-apportioned for short periods. What upper limit applies to Juno Ltd for this period?",
    options: [
      "£250,000",
      "£83,333",
      "£166,667",
      "£125,000",
    ],
    correct: 1,
    explanation: "Both adjustments apply together: £250,000 × 8/12 = £166,667, then ÷ 2 companies = £83,333. £125,000 only divides by two; £166,667 only time-apportions; £250,000 makes neither adjustment.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-C-02", paper: "TX", area: "C", type: "mcq",
    stem: "For its 12-month period, Keld Ltd has taxable total profits of £240,000 and received dividends of £30,000 from unconnected companies and £50,000 from its 100% subsidiary. What are Keld Ltd's AUGMENTED profits for determining the rate of corporation tax?",
    options: [
      "£240,000",
      "£320,000",
      "£290,000",
      "£270,000",
    ],
    correct: 3,
    explanation: "Augmented profits = TTP plus exempt dividends received, EXCLUDING dividends from 51% group companies: £240,000 + £30,000 = £270,000. £320,000 wrongly adds the group dividend too; £290,000 adds only the group dividend; £240,000 ignores dividends altogether.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-C-16", paper: "TX", area: "C", type: "number",
    stem: "Piper Ltd has one associated company throughout its 12-month period, with taxable total profits of £90,000 and no dividends received. The £50,000/£250,000 limits are divided by the number of associated companies (giving £25,000/£125,000 here). The main rate is 25% and the marginal relief fraction is 3/200. What is Piper Ltd's corporation tax liability in £?",
    numericAnswer: 21975,
    unit: "£",
    explanation: "Profits of £90,000 sit between the adjusted limits, so: £90,000 × 25% = £22,500, less marginal relief 3/200 × (£125,000 − £90,000) = £525, giving £21,975. Using the unadjusted £250,000 limit gives relief of £2,400 and an incorrect £20,100.",
    marks: 2, difficulty: "hard",
  },

  /* Group relief: corresponding periods */
  {
    id: "TX3-C-03", paper: "TX", area: "C", type: "mcq",
    stem: "Sable Ltd owns 100% of Tarn Ltd. Sable Ltd prepares accounts to 31 March 2025 (taxable total profits £80,000); Tarn Ltd prepares accounts to 31 DECEMBER 2024, making a trading loss of £60,000 in that year. Profits and losses accrue evenly. What is the MAXIMUM group relief Sable Ltd can claim for its year ended 31 March 2025?",
    options: [
      "£60,000",
      "£80,000",
      "£45,000",
      "£15,000",
    ],
    correct: 2,
    explanation: "Relief is limited to the CORRESPONDING (overlapping) period — 1 April to 31 December 2024, nine months. Available loss: £60,000 × 9/12 = £45,000; claimant capacity: £80,000 × 9/12 = £60,000. Maximum = lower = £45,000. £60,000 surrenders the whole loss ignoring the overlap; £15,000 uses 3/12 (the wrong end of the overlap).",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-C-04", paper: "TX", area: "C", type: "number",
    stem: "Umber Ltd owns 100% of Vale Ltd. Vale Ltd made a trading loss of £96,000 in its year ended 30 JUNE 2024. Umber Ltd has taxable total profits of £200,000 for its year ended 31 MARCH 2025. Profits and losses accrue evenly, and group relief is restricted to the overlapping period of the two accounting periods. What is the maximum loss Umber Ltd can claim for its year ended 31 March 2025, in £?",
    numericAnswer: 24000,
    unit: "£",
    explanation: "The two periods overlap only from 1 April to 30 June 2024 — three months. Loss available: £96,000 × 3/12 = £24,000; claimant capacity: £200,000 × 3/12 = £50,000. Maximum = £24,000. Claiming £96,000 ignores the corresponding-period restriction entirely.",
    marks: 2, difficulty: "hard",
  },

  /* Company property losses & donations */
  {
    id: "TX3-C-05", paper: "TX", area: "C", type: "mcq",
    stem: "A company makes a UK property business loss. How is the loss relieved?",
    options: [
      "It is automatically set against TOTAL profits of the same period, with any excess carried forward against future total profits (or surrendered as group relief)",
      "It can only be carried forward against future property business profits",
      "It is carried back against the previous 12 months' property income",
      "It is set against chargeable gains only",
    ],
    correct: 0,
    explanation: "A company's property loss is relieved against total profits of the SAME accounting period automatically; any remainder is carried forward against future total profits (claim required) or can be group relieved. Restricting it to future property profits applies income-tax thinking; there is no 12-month carry back for property losses.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-C-06", paper: "TX", area: "C", type: "mcq",
    stem: "For its year ended 31 March 2025, Hollybank Ltd has a trading profit of £40,000, a UK property business LOSS of £12,000 and a chargeable gain of £5,000. What are its taxable total profits?",
    options: [
      "£40,000",
      "£33,000",
      "£45,000",
      "£28,000",
    ],
    correct: 1,
    explanation: "The property loss offsets total profits of the period: £40,000 + £5,000 − £12,000 = £33,000. £28,000 sets the loss against the trading profit but forgets the gain; £45,000 ignores the loss; £40,000 nets the loss against the gain and then wrongly caps at the trading profit.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-C-07", paper: "TX", area: "C", type: "mcq",
    stem: "Larch Ltd paid qualifying charitable donations of £10,000, but after loss reliefs its total profits are only £6,000. What happens to the excess £4,000 of donations?",
    options: [
      "It is carried back against the previous year's profits",
      "It is carried forward and deducted from future total profits",
      "It is wasted, unless the company can surrender it as group relief",
      "It is repaid to the company as a tax credit",
    ],
    correct: 2,
    explanation: "Qualifying charitable donations can only reduce total profits to nil in the period they are paid — any excess is unrelievable (no carry forward or carry back), although a group company may claim it as group relief. There is no repayment mechanism.",
    marks: 2, difficulty: "medium",
  },

  /* Capital allowances: SRP & SBA */
  {
    id: "TX3-C-08", paper: "TX", area: "C", type: "mcq",
    stem: "Which of the following additions is allocated to the SPECIAL RATE pool (WDA 6%) rather than the main pool?",
    options: [
      "A delivery van",
      "Second-hand machinery",
      "Electrical and lighting systems that are integral features of a building",
      "A car with CO2 emissions of 40 g/km",
    ],
    correct: 2,
    explanation: "Integral features (electrical systems, lighting, heating, lifts, cold water systems), long-life assets, thermal insulation and high-emission cars go to the special rate pool. Vans and machinery are main pool items, and a 40 g/km car (1–50 g/km) also joins the MAIN pool.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-C-09", paper: "TX", area: "C", type: "number",
    stem: "Marram Ltd built a new office block, incurring construction costs of £500,000 (the land cost of £200,000 is excluded). The building was brought into qualifying use on 1 July 2024, and the company's accounting year ended on 31 March 2025. Structures and buildings allowance is 3% per annum on a straight-line basis, time-apportioned from first use. What SBA can Marram Ltd claim for the year in £?",
    numericAnswer: 11250,
    unit: "£",
    explanation: "£500,000 × 3% × 9/12 (1 July 2024 to 31 March 2025) = £11,250. Including the land (£700,000 base) or claiming a full year's £15,000 are the standard errors — SBA runs only from when the building is brought into use, and land never qualifies.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-C-10", paper: "TX", area: "C", type: "mcq",
    stem: "Which statement about the structures and buildings allowance (SBA) is correct?",
    options: [
      "It is given at 18% on a reducing balance basis",
      "It is given at 3% per annum straight-line on the construction cost of qualifying non-residential structures, excluding land",
      "It extends to residential buy-to-let properties",
      "The annual investment allowance can be claimed on SBA-qualifying costs instead",
    ],
    correct: 1,
    explanation: "SBA is 3% straight-line on construction (not land) costs of non-residential structures and buildings in qualifying use. It is not reducing balance, dwellings are excluded, and the AIA is never available on building costs — the AIA covers plant and machinery only.",
    marks: 2, difficulty: "easy",
  },

  /* Intangibles */
  {
    id: "TX3-C-11", paper: "TX", area: "C", type: "mcq",
    stem: "Nettle Ltd bought a customer list (an intangible fixed asset, not goodwill) for £150,000 and amortises it at £8,000 per year in its accounts. What deduction is allowed in computing trading profit for a 12-month period?",
    options: [
      "£8,000 — the accounts amortisation is followed",
      "£6,000 — a fixed 4% of cost is mandatory",
      "Nil — amortisation must be added back like depreciation",
      "£150,000 — the full cost is deducted when incurred",
    ],
    correct: 0,
    explanation: "Under the intangibles regime, amortisation of purchased intangibles (other than post-2015 goodwill and customer-related goodwill) is deductible following the accounts — £8,000. The 4% fixed-rate basis is an optional ELECTION, not mandatory; adding back applies to depreciation of tangible assets and to goodwill amortisation, not here.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-C-12", paper: "TX", area: "C", type: "mcq",
    stem: "Oakline Ltd sells a patent that it has held as an intangible fixed asset of its trade, realising an accounting profit on disposal. How is the profit taxed?",
    options: [
      "As a chargeable gain, with indexation allowance to December 2017",
      "It is exempt, like a substantial shareholding",
      "As INCOME under the intangibles regime (a trading credit for a trade asset)",
      "As property business income",
    ],
    correct: 2,
    explanation: "Intangible fixed assets sit in the income regime: profits on disposal are taxed as income — a trading credit where the asset was held for the trade — not as chargeable gains, so indexation is irrelevant. The substantial shareholding exemption applies to shares, not intangibles.",
    marks: 2, difficulty: "medium",
  },

  /* Company gains: rollover */
  {
    id: "TX3-C-13", paper: "TX", area: "C", type: "mcq",
    stem: "Pinewood Ltd sold a factory used in its trade for £300,000, realising a chargeable gain (after indexation) of £70,000. Within the qualifying period it bought a replacement factory for £260,000 and claimed rollover relief. What gain is chargeable NOW?",
    options: [
      "£70,000",
      "£30,000",
      "£0",
      "£40,000",
    ],
    correct: 3,
    explanation: "Proceeds of £40,000 were not reinvested (£300,000 − £260,000), so a gain equal to that amount stays chargeable (it is lower than the £70,000 gain); the other £30,000 is rolled into the new factory's base cost. £0 assumes full reinvestment; £30,000 picks the deferred slice instead of the chargeable one.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-C-14", paper: "TX", area: "C", type: "mcq",
    stem: "Which of the following assets does NOT qualify for capital gains rollover relief when disposed of and replaced by a COMPANY?",
    options: [
      "A freehold factory occupied and used for the trade",
      "Goodwill",
      "Fixed plant and machinery",
      "Land used in the trade",
    ],
    correct: 1,
    explanation: "For companies, goodwill is an intangible fixed asset dealt with under the income-based intangibles regime, so it is outside capital gains rollover relief (unlike for individuals). Trade land and buildings and FIXED plant and machinery are the classic qualifying categories.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-C-15", paper: "TX", area: "C", type: "mcq",
    stem: "Which statement about ASSOCIATED companies (for the corporation tax limits) is correct?",
    options: [
      "Only UK resident companies can be associated",
      "A company is associated if another company holds at least 25% of its shares",
      "Dormant companies count as associated if wholly owned",
      "Companies are associated if one controls the other, or both are under common control, at any point in the accounting period — including overseas companies, but excluding dormant ones",
    ],
    correct: 3,
    explanation: "Association follows CONTROL (over 50%), at any time in the period; overseas companies count, dormant companies do not. Restricting the test to UK companies, using a 25% threshold, or counting dormant subsidiaries are each nameable errors.",
    marks: 2, difficulty: "easy",
  },

  /* ───────────── Area D — VAT (11) ───────────── */

  {
    id: "TX3-D-01", paper: "TX", area: "D", type: "mcq",
    stem: "Aldergate Ltd makes both taxable and EXEMPT supplies. Which statement about its input VAT is correct?",
    options: [
      "All input VAT is recoverable because the company is VAT-registered",
      "Input VAT attributable to the exempt supplies is irrecoverable, unless it is within the de minimis limits",
      "No input VAT is recoverable because some supplies are exempt",
      "Input VAT is always recovered in proportion to staff numbers in each activity",
    ],
    correct: 1,
    explanation: "A partially exempt business recovers input VAT attributable to taxable supplies in full, but VAT attributable to exempt supplies is blocked unless the de minimis tests are met (in which case everything is recoverable). Registration alone does not guarantee recovery, and apportionment is based on supplies, not headcount.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-D-02", paper: "TX", area: "D", type: "mcq",
    stem: "In a quarter, Brockford Ltd (partially exempt, de minimis tests FAILED) has input VAT of: £5,000 directly attributable to taxable supplies; £2,000 directly attributable to exempt supplies; and £8,000 residual. Its taxable supplies are £270,000 and exempt supplies £90,000 (both VAT-exclusive). Under the standard method the residual recovery percentage is taxable supplies over total supplies, rounded UP to a whole percentage. How much input VAT is recoverable?",
    options: [
      "£11,000",
      "£13,000",
      "£15,000",
      "£6,000",
    ],
    correct: 0,
    explanation: "Residual percentage = 270,000 ÷ 360,000 = 75%; recoverable = £5,000 + (75% × £8,000 = £6,000) = £11,000. The £2,000 exempt-attributable VAT is lost (de minimis failed). £13,000 recovers all the residual; £15,000 recovers everything; £6,000 counts only the residual portion.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-D-03", paper: "TX", area: "D", type: "mcq",
    stem: "Chalfont Ltd is partially exempt. In the quarter, input VAT attributable to exempt supplies (including its share of residual VAT) is £1,500, and TOTAL input VAT is £4,000. The de minimis limits are met if exempt input VAT is no more than £625 per month on average AND no more than 50% of total input VAT. How much input VAT can Chalfont Ltd recover?",
    options: [
      "£2,500",
      "£3,250",
      "£4,000 — all of it",
      "£1,500",
    ],
    correct: 2,
    explanation: "Exempt input VAT averages £500 per month (£1,500 ÷ 3 ≤ £625) and is 37.5% of the total (≤ 50%), so BOTH de minimis tests are passed and the exempt-attributable VAT is recoverable too — full recovery of £4,000. £2,500 wrongly blocks the exempt element despite de minimis; £1,500 recovers the wrong side.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-D-04", paper: "TX", area: "D", type: "mcq",
    stem: "The capital goods scheme requires input VAT recovery to be adjusted over several years if the taxable use of certain assets changes. Assume it covers land and buildings costing £250,000 or more (adjusted over 10 intervals) and computers costing £50,000 or more (5 intervals). Which purchase falls WITHIN the scheme?",
    options: [
      "A machine press costing £300,000",
      "A single computer costing £30,000",
      "A delivery van costing £60,000",
      "An office building costing £400,000",
    ],
    correct: 3,
    explanation: "The scheme applies only to the listed capital items above the thresholds: the £400,000 building qualifies (10-interval adjustment). Ordinary plant, vans and machinery are never capital goods scheme items regardless of cost, and the £30,000 computer is below its £50,000 threshold.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-D-05", paper: "TX", area: "D", type: "mcq",
    stem: "Dunmore Ltd, a UK VAT-registered company making only taxable supplies, buys consultancy services from a US firm for £10,000. Under the reverse charge, with a standard rate of 20%, what is the net VAT effect on Dunmore Ltd's return?",
    options: [
      "It pays £2,000 to the US supplier along with the fee",
      "It accounts for £2,000 output VAT and reclaims £2,000 input VAT — a nil net cost",
      "No entries are required because the supplier is outside the UK",
      "It reclaims £2,000 input VAT with no output entry",
    ],
    correct: 1,
    explanation: "The reverse charge makes the UK CUSTOMER account for the supplier's output VAT (£10,000 × 20% = £2,000) and, being fully taxable, it recovers the same amount as input VAT — net nil, but both entries are compulsory. Paying VAT to the overseas supplier or making no entries are the classic errors; claiming input VAT alone overstates recovery for partially exempt businesses.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-D-06", paper: "TX", area: "D", type: "mcq",
    stem: "Eastfold Ltd imports goods into the UK from an overseas supplier. Using POSTPONED VAT accounting, how is the import VAT dealt with?",
    options: [
      "It must be paid in cash at the border and reclaimed on the next return",
      "Imports from abroad are outside the scope of UK VAT",
      "It is declared as output VAT and reclaimed as input VAT on the SAME VAT return, giving a cash-flow advantage",
      "The overseas supplier accounts for it in its own country",
    ],
    correct: 2,
    explanation: "Postponed VAT accounting lets the importer declare the import VAT and (subject to normal recovery rules) reclaim it on the same return, avoiding paying cash at the border and waiting to recover it. Imports are within UK VAT, and the overseas supplier has no role in the UK charge.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-D-07", paper: "TX", area: "D", type: "mcq",
    stem: "Fenwick Ltd and Garrow Ltd are in the same VAT GROUP. Fenwick Ltd charges Garrow Ltd a management fee of £10,000 (a supply that would normally be standard-rated at 20%). How much output VAT must Fenwick Ltd account for on this fee?",
    options: [
      "£0 — supplies between VAT group members are disregarded",
      "£2,000",
      "£1,666",
      "£2,000, but only Garrow Ltd may reclaim it",
    ],
    correct: 0,
    explanation: "Within a VAT group, intra-group supplies are disregarded entirely — no output VAT, no input VAT. The group submits ONE return through the representative member and all members are jointly and severally liable. £2,000 taxes the supply as if the group did not exist; £1,666 also wrongly treats £10,000 as VAT-inclusive.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-D-08", paper: "TX", area: "D", type: "mcq",
    stem: "Hexley Ltd lets out a commercial office building. The rents are currently EXEMPT from VAT, so it cannot recover input VAT on substantial refurbishment costs. What is the effect of exercising the OPTION TO TAX over the building?",
    options: [
      "The rents remain exempt but input VAT becomes recoverable anyway",
      "Future rents (and a sale of the building) become standard-rated, and related input VAT becomes recoverable",
      "The option converts the rents into zero-rated supplies",
      "The option applies automatically to all other buildings Hexley Ltd owns",
    ],
    correct: 1,
    explanation: "Opting to tax turns otherwise-exempt supplies of the commercial building (rents and sale proceeds) into standard-rated supplies, which unlocks recovery of the related input VAT. It does not zero-rate anything, recovery without taxing the rents is impossible, and the option is made building by building.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-D-09", paper: "TX", area: "D", type: "mcq",
    stem: "Under the points-based late submission regime, a business filing ANNUAL VAT returns receives one point per late return and a £200 penalty on reaching its points threshold of 2 (the thresholds are 2 for annual, 4 for quarterly and 5 for monthly filers). Ivydene Ltd, an annual filer with no existing points, files its next TWO annual returns late. What penalties arise?",
    options: [
      "£400 — £200 for each late return",
      "Nothing until it reaches 4 points",
      "£100 fixed plus daily penalties",
      "£200 — the second late return takes it to the 2-point threshold",
    ],
    correct: 3,
    explanation: "The first late return earns a point but no penalty; the second reaches the annual filer's threshold of 2 points, triggering a single £200 penalty. £400 wrongly charges per point before the threshold; 4 points is the QUARTERLY threshold; £100-plus-daily is the income tax late-filing regime, not VAT.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-D-10", paper: "TX", area: "D", type: "mcq",
    stem: "Jessop Ltd, a quarterly VAT filer, is already at its 4-point late submission threshold and has been charged the initial £200 penalty. It then files its NEXT quarterly return late as well. What is the consequence?",
    options: [
      "A further point is added, taking it to 5 points",
      "A further £200 penalty is charged; no additional points accrue while at the threshold",
      "Nothing — only the first penalty at the threshold is ever charged",
      "The penalty escalates to £400 for each subsequent late return",
    ],
    correct: 1,
    explanation: "Once at the threshold, every additional late return attracts another £200 fixed penalty, but the points total does not increase. Points only reset after a period of sustained compliance (12 months of on-time returns for a quarterly filer, with all outstanding returns submitted). The penalty does not escalate beyond £200 per offence.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-D-11", paper: "TX", area: "D", type: "mcq",
    stem: "Kelsale Ltd (annual turnover £600,000) discovers a careless, non-deliberate NET error of £9,000 output VAT on a return submitted last year. Errors may be corrected on the next return if they do not exceed the higher of £10,000 and 1% of turnover (capped at £50,000). How may the error be corrected?",
    options: [
      "It may be adjusted on the next VAT return, though notifying HMRC separately as well gives better protection against penalties",
      "It must be separately disclosed to HMRC in writing because it exceeds 1% of turnover",
      "The original return must be withdrawn and re-submitted",
      "No correction is needed for errors under £10,000",
    ],
    correct: 0,
    explanation: "The limit is the HIGHER of £10,000 and 1% × £600,000 = £6,000, i.e. £10,000; £9,000 is within it and the error is not deliberate, so it can go on the next return. Separate unprompted disclosure is still wise, as it improves the penalty position. Exceeding 1% alone does not force separate disclosure, returns are never 're-submitted', and correction IS required — interest can still run.",
    marks: 2, difficulty: "medium",
  },

  /* ───────────── Area E — Inheritance tax (11) ───────────── */

  {
    id: "TX3-E-01", paper: "TX", area: "E", type: "mcq",
    stem: "In 2018 Gerald gave his house to his daughter but continued to live in it RENT-FREE until his death in 2024/25. How is the house treated for IHT?",
    options: [
      "It ceased to be his property in 2018, so it cannot form part of his death estate",
      "It is exempt as the gift of a family home",
      "It is a gift with reservation of benefit, so the house is included in Gerald's death estate at its value at death",
      "Only the 2018 value of the house is charged",
    ],
    correct: 2,
    explanation: "Because Gerald kept enjoying the property without paying full consideration, the gift is a gift with reservation: the house stays in his death estate at its DEATH value (HMRC will charge whichever route — GWR or failed PET — yields more tax, but not both). There is no family-home exemption, and the frozen 2018 value is not the measure.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-E-02", paper: "TX", area: "E", type: "mcq",
    stem: "Hilda gave her cottage to her son in 2020 but continued to occupy it, paying him a FULL market rent (reviewed regularly) until her death in 2024/25. What is the IHT position of the cottage?",
    options: [
      "It is a gift with reservation and stays in her estate",
      "The rent she paid is added back to her estate",
      "The gift was a chargeable lifetime transfer taxed at 20% in 2020",
      "The gift was an effective PET in 2020 — paying full market rent prevents any reservation of benefit",
    ],
    correct: 3,
    explanation: "A donor who pays full consideration (market rent) for continued use does not 'reserve a benefit', so the 2020 gift stands as a normal PET measured at its 2020 value. It only enters the death computation as a failed PET (she died within 7 years); it was never a CLT because it was a gift to an individual, and rent paid is not added back.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-E-03", paper: "TX", area: "E", type: "mcq",
    stem: "Idris died in 2024/25. Three and a half years earlier he had inherited assets from his aunt, and IHT of £20,000 was paid on that inheritance. Quick succession relief applies at 100% if the earlier transfer was within 1 year of death, 80% (1–2 years), 60% (2–3 years), 40% (3–4 years) or 20% (4–5 years), applied to the tax attributable to the inheritance. What quick succession relief reduces the IHT on Idris's estate?",
    options: [
      "£4,000",
      "£8,000",
      "£12,000",
      "£20,000",
    ],
    correct: 1,
    explanation: "The gap of 3.5 years falls in the 3–4 year band, so relief = 40% × £20,000 = £8,000, credited against the estate's IHT. £12,000 uses the 2–3 year band (off by one), £4,000 the 4–5 year band, and £20,000 assumes death within one year.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-E-04", paper: "TX", area: "E", type: "mcq",
    stem: "Jocasta died in 2024/25 owning a 5% holding of shares in an UNQUOTED trading company, which she had owned for four years. Business property relief applies at 100% for unquoted trading company shares and 50% for quoted shares in a company the transferor controls, with a two-year minimum ownership period. What rate of BPR applies to Jocasta's shares?",
    options: [
      "0% — a 5% holding is too small",
      "50%",
      "36%",
      "100%",
    ],
    correct: 3,
    explanation: "ANY size holding of unquoted trading company shares attracts 100% BPR once owned for two years — no control or minimum percentage is needed. The 50% rate is for controlling holdings of QUOTED shares (and assets used by a controlled company or partnership); 36% is the reduced charity estate rate, nothing to do with BPR.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-E-05", paper: "TX", area: "E", type: "mcq",
    stem: "Kester died holding unquoted trading company shares worth £400,000, owned for ten years and qualifying for 100% business property relief. However, 25% of the company's assets by value is an investment portfolio held as an EXCEPTED asset (not used in the trade and not required for future use). How much of the £400,000 attracts BPR?",
    options: [
      "£400,000",
      "£100,000",
      "£300,000",
      "£200,000",
    ],
    correct: 2,
    explanation: "BPR is restricted to the business's trading substance: the value attributable to excepted assets (25%) is carved out, so relief covers £400,000 × 75% = £300,000, leaving £100,000 chargeable. £400,000 ignores the excepted assets; £100,000 inverts the split; £200,000 applies the 50% rate by mistake.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-E-06", paper: "TX", area: "E", type: "mcq",
    stem: "Which of the following businesses does NOT qualify for business property relief?",
    options: [
      "A company whose business consists mainly of letting out investment property",
      "A sole-trader manufacturing business",
      "Shares in an unquoted engineering company",
      "A partner's interest in a trading partnership",
    ],
    correct: 0,
    explanation: "BPR is denied where the business consists wholly or mainly of dealing in securities or land, or making or holding INVESTMENTS — property letting is the classic example. Genuine trading interests (sole trades, unquoted trading shares, partnership interests) all qualify, subject to the two-year ownership test.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-E-07", paper: "TX", area: "E", type: "mcq",
    stem: "Leonora died owning a farm she had farmed HERSELF for ten years. The farm's open market value is £1,000,000, but its agricultural value is £800,000. Agricultural property relief is 100% for owner-occupied farmland (two-year occupation test met). On what amount is APR given?",
    options: [
      "£1,000,000",
      "£800,000",
      "£200,000",
      "£0 — seven years' ownership is required",
    ],
    correct: 1,
    explanation: "APR applies only to the AGRICULTURAL value — £800,000 at 100%. The £200,000 excess (e.g. development value) gets no APR, though it may attract BPR if the farm is a business asset. Seven-year ownership applies to LET farmland; an owner-occupier needs only two years' occupation.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-E-08", paper: "TX", area: "E", type: "mcq",
    stem: "In 2021 Magnus made a PET of shares then worth £80,000. He died in 2024/25 (within seven years), by which time the donee still owned the shares but they were worth only £50,000. What does FALL IN VALUE relief achieve?",
    options: [
      "The PET is removed from the IHT computation entirely",
      "The donee's CGT base cost is reduced to £50,000",
      "Death tax on the PET is computed on £50,000, but the full £80,000 still cumulates against later transfers and the death estate",
      "Both the tax on the PET and the cumulation are based on £50,000",
    ],
    correct: 2,
    explanation: "Fall in value relief reduces only the value on which the DEATH TAX on that transfer is charged (£50,000); the original £80,000 continues to use up the nil rate band when cumulating later transfers and the estate. It does not erase the PET, and it is an IHT relief with no effect on CGT base cost.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "TX3-E-09", paper: "TX", area: "E", type: "mcq",
    stem: "IHT of £120,000 is attributable to the deceased's house, which passes to her son who will keep it. The instalment option allows qualifying assets — land and buildings, controlling shareholdings, certain unquoted shares and business interests — to be paid over 10 equal annual instalments. If the executors elect, what is the FIRST instalment?",
    options: [
      "£24,000",
      "£120,000",
      "£30,000",
      "£12,000",
    ],
    correct: 3,
    explanation: "A house is land, so the option is available: £120,000 ÷ 10 = £12,000 per year, the first due on the normal due date (interest generally runs on the outstanding balance for non-business land). £24,000 assumes 5 instalments; the full £120,000 is what the option avoids paying up front.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "TX3-E-10", paper: "TX", area: "E", type: "mcq",
    stem: "Nerissa died in 2024/25 leaving an estate of £700,000, of which £40,000 goes to a registered charity and the rest to her nephew. The nil rate band is £325,000 (fully available). The reduced IHT rate of 36% applies if at least 10% of the 'baseline amount' (the estate less the nil rate band, before deducting the charitable legacy) passes to charity. Does the reduced rate apply?",
    options: [
      "No — the gift must be at least 10% of the £700,000 gross estate (£70,000)",
      "Yes — the baseline is £375,000, 10% is £37,500, and the £40,000 gift meets it, so the chargeable estate is taxed at 36%",
      "No — charitable gifts on death are themselves taxed at 36%",
      "Yes, but only the charitable legacy is taxed at 36%",
    ],
    correct: 1,
    explanation: "Baseline = £700,000 − £325,000 = £375,000; 10% = £37,500; the £40,000 charitable gift qualifies, so the chargeable estate (£700,000 − £40,000 − £325,000 = £335,000) is taxed at 36% instead of 40%. The 10% test uses the baseline, not the gross estate, and the charity's own legacy is EXEMPT, never taxed.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "TX3-E-11", paper: "TX", area: "E", type: "mcq",
    stem: "Orson died in 2024/25 with an estate of £900,000, leaving £60,000 to charity and the residue to his sister. The nil rate band of £325,000 is fully available and no residence nil rate band applies. The 36% reduced rate applies because the charitable gift is at least 10% of the baseline amount (estate less nil rate band, before deducting the charity gift). What is the IHT on the estate?",
    options: [
      "£230,000",
      "£206,000",
      "£207,000",
      "£185,400",
    ],
    correct: 3,
    explanation: "Baseline = £900,000 − £325,000 = £575,000; 10% = £57,500 ≤ £60,000, so 36% applies. Chargeable estate = £900,000 − £60,000 (exempt charity gift) − £325,000 = £515,000; IHT = £515,000 × 36% = £185,400. £206,000 uses 40%; £207,000 taxes at 36% but forgets the charity exemption; £230,000 makes both errors.",
    marks: 2, difficulty: "hard",
  },
]
