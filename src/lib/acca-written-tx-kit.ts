import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * TX-UK · Section C constructed-response questions — the real exam format.
 *
 * ── TX's Section C is THREE questions, not two ────────────────────
 * 10 + 15 + 15 = 40 marks, which is a structural difference from PM's 2 × 20. The 10-marker
 * is typically a focused computation or an administration and ethics requirement; the two
 * 15-markers are the income tax and corporation tax computations with commentary attached.
 * So the bank has to hold BOTH unit sizes in the right proportion.
 *
 * Three disjoint mock sittings need THREE 10-markers and SIX 15-markers — nine in all. This
 * file holds six of them (two at 10 marks, four at 15) and acca-written-tx-kit2.ts holds the
 * remaining three, completing the three sittings.
 *
 * ── Rubric shape ─────────────────────────────────────────────────
 * A TX Section C answer loses marks in three predictable places: the candidate computes
 * without commenting, states a rule without applying it to the scenario's own figures, or
 * omits the dates. So every rubric below allocates marks explicitly, and the interpretation
 * points name what must be SAID rather than the topic it should be about.
 *
 * All figures are FA2025 and were verified by script. No question applies an excluded topic.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Form 1 · Q1 (15), Q2 (15), Q3 (10) ───────────────────────── */

const Q01: WrittenQuestion = {
  id: "TXW-01",
  paper: "TX",
  area: "B",
  chapter: "TX-04",
  topic: "Income tax computation with property income, benefits and a pension contribution",
  maxMarks: 15,
  stem:
    "Astrid Lindqvist has the following income and outgoings for the tax year 2025/26.\n\n  Employment income (salary)                                    £68,000\n  Taxable benefits — company car and fuel                       £11,400\n  Rental income received from a residential letting             £18,600\n  Allowable expenses paid on the letting                         £4,200\n  Mortgage interest paid on the letting                          £7,500\n  Bank interest received                                         £3,200\n  Dividends received                                             £6,800\n  Personal pension contribution paid (net)                       £4,800\n\nAstrid's employer deducted £14,900 of PAYE during the year.\n\nRequired:\n\n(a) Calculate Astrid's income tax LIABILITY for 2025/26. (9 marks)\n\n(b) Calculate the income tax PAYABLE by self assessment, and state the due date. (2 marks)\n\n(c) Calculate Astrid's Class 1 primary national insurance contributions, and state the total employer's national insurance arising on her salary and benefits. (4 marks)",
  rubric: [
    "(a) Property income computed on the CASH basis: £18,600 received less £4,200 of expenses paid = £14,400. The £7,500 of mortgage interest is NOT deducted — it is residential finance cost (1 mark).",
    "(a) Total income = £68,000 + £11,400 + £14,400 + £3,200 + £6,800 = £103,800 (1 mark).",
    "(a) Gross pension contribution £4,800 × 100/80 = £6,000. Adjusted net income = £103,800 − £6,000 = £97,800, which is below £100,000 so the FULL personal allowance of £12,570 is available. Credit for stating that the contribution has preserved the allowance (2 marks).",
    "(a) Basic rate limit extended to £37,700 + £6,000 = £43,700 (1 mark).",
    "(a) Non-savings income £68,000 + £11,400 + £14,400 − £12,570 = £81,230. Tax: £43,700 at 20% = £8,740, then £37,530 at 40% = £15,012 (2 marks).",
    "(a) Savings: Astrid is a higher rate taxpayer so the nil rate band is £500. £500 at 0%, then £2,700 at 40% = £1,080. The basic rate band is exhausted by non-savings income (1 mark).",
    "(a) Dividends: £500 at 0%, then £6,300 at 33.75% = £2,126.25. Total liability = £8,740 + £15,012 + £1,080 + £2,126.25 = £26,958.25 (1 mark).",
    "(b) Deduct the finance cost tax reducer of £7,500 × 20% = £1,500, and the PAYE of £14,900. Payable = £26,958.25 − £1,500 − £14,900 = £10,558.25, due 31 January 2027 (2 marks).",
    "(c) Class 1 primary: (£50,270 − £12,570) × 8% = £3,016, plus (£68,000 − £50,270) × 2% = £354.60. Total £3,370.60. Credit for excluding the benefits, Class 1 being on cash earnings only (2 marks).",
    "(c) Employer's Class 1 secondary: (£68,000 − £5,000) × 15% = £9,450 (1 mark).",
    "(c) Employer's Class 1A on benefits: £11,400 × 15% = £1,710, due 22 July 2026. Total employer's NIC £11,160 (1 mark).",
    "Presentation: the three income columns set out separately, the finance cost reducer deducted from the LIABILITY rather than from property income, and the tax year stated (marks are embedded above; a computation that deducts the interest from property income loses the marks in (a) and (b) both).",
  ],
}

const Q02: WrittenQuestion = {
  id: "TXW-02",
  paper: "TX",
  area: "E",
  chapter: "TX-21",
  topic: "Corporation tax computation with capital allowances and a chargeable gain",
  maxMarks: 15,
  stem:
    "Vindeln Ltd has one 51% subsidiary and prepares accounts to 31 March. Its results for the year ended 31 March 2026 are:\n\n  Trading profit before capital allowances                      £698,000\n  Property business income (accruals basis)                      £54,000\n  Bank interest receivable                                       £26,000\n  Qualifying charitable donations paid                           £18,000\n  Dividends received from a 6% shareholding                       £35,000\n\nCapital allowances information. The main pool balance at 1 April 2025 was £48,000. During the year the company bought machinery for £820,000, integral features for £160,000, and a new car with zero CO2 emissions for £42,000. It sold machinery for £16,000 that had originally cost £23,000.\n\nThe company also sold a warehouse in December 2025 for £740,000. It had cost £310,000 in June 2011 and the indexation factor to December 2017 is 0.213.\n\nRequired:\n\n(a) Calculate the capital allowances for the year ended 31 March 2026. (5 marks)\n\n(b) Calculate the chargeable gain on the warehouse. (3 marks)\n\n(c) Calculate the taxable total profits and the corporation tax liability. (5 marks)\n\n(d) State the due dates for the corporation tax and the return, and explain whether the company must pay by quarterly instalments. (2 marks)",
  rubric: [
    "(a) AIA of £1,000,000 allocated to the SPECIAL RATE pool first: £160,000 to the integral features, leaving £840,000 available, so all £820,000 of machinery is covered and nothing joins the main pool (2 marks).",
    "(a) Main pool: £48,000 brought forward less the disposal at the LOWER of cost (£23,000) and proceeds (£16,000), so £48,000 − £16,000 = £32,000, at 18% = £5,760 (2 marks).",
    "(a) New zero-emission car: 100% first year allowance of £42,000, not pooled and not time-apportioned. Total capital allowances = £160,000 + £820,000 + £5,760 + £42,000 = £1,027,760 (1 mark).",
    "(b) Unindexed gain = £740,000 − £310,000 = £430,000 (1 mark).",
    "(b) Indexation allowance = £310,000 × 0.213 = £66,030, running only to December 2017 when indexation was frozen (1 mark).",
    "(b) Chargeable gain = £430,000 − £66,030 = £363,970. Credit for noting there is no annual exempt amount for a company (1 mark).",
    "(c) Trading profit after capital allowances = £698,000 − £1,027,760, which is negative — so credit for recognising a trading LOSS of £329,760 and that the allowances exceed the profit (2 marks).",
    "(c) Total profits = property income £54,000 + interest £26,000 + chargeable gain £363,970 = £443,970, less the trading loss of £329,760 relieved in the current period = £114,210 (2 marks).",
    "(c) Less QCDs of £18,000 = taxable total profits of £96,210. Augmented profits = £96,210 + £35,000 = £131,210. With two 51% group companies the limits are £25,000 and £125,000, so augmented profits exceed the upper limit and the main rate applies: £96,210 × 25% = £24,052.50 (1 mark).",
    "(d) Corporation tax due 1 January 2027 — 9 months and 1 day after the period end — and the CT600 by 31 March 2027, so the tax is payable three months before the return is filed (1 mark).",
    "(d) Not large for instalment purposes: the £1,500,000 threshold is divided by the two 51% group companies to £750,000, and augmented profits of £131,210 are far below it. So the whole liability is due on 1 January 2027 (1 mark).",
    "Presentation: capital allowances in columnar form with an allowances column, the AIA allocation shown, and the loss relief step made explicit rather than netted silently (marks embedded above).",
  ],
}

const Q03: WrittenQuestion = {
  id: "TXW-03",
  paper: "TX",
  area: "A",
  chapter: "TX-02",
  topic: "Self assessment, penalties and the adviser's obligations",
  maxMarks: 10,
  stem:
    "Kasper Holm is self-employed. His income tax and Class 4 national insurance liabilities were as follows.\n\n  2024/25   income tax £27,600, Class 4 NIC £3,800, tax deducted at source £6,400\n  2025/26   income tax £30,400, Class 4 NIC £4,200, tax deducted at source £6,400\n\nKasper also sold an investment property in October 2025, giving rise to capital gains tax of £11,800.\n\nKasper filed his 2024/25 return on 14 September 2026 and paid the balancing payment on the same day. While preparing the 2025/26 return, his adviser discovers that £31,000 of cash takings was omitted from the 2024/25 return, understating the tax by £12,400. Kasper acknowledges that he knew about the takings and chose not to declare them, and asks the adviser to say nothing.\n\nRequired:\n\n(a) Calculate the payments on account and the balancing payment for 2025/26, stating the due dates. (4 marks)\n\n(b) State the penalties and interest arising from the late filing and late payment of the 2024/25 return. (3 marks)\n\n(c) Explain the penalty position on the omitted takings, and set out what the adviser must and must not do. (3 marks)",
  rubric: [
    "(a) Relevant amount for 2024/25 = £27,600 + £3,800 − £6,400 = £25,000, so each payment on account is £12,500, due 31 January 2026 and 31 July 2026 (2 marks).",
    "(a) 2025/26 total due = £30,400 + £4,200 − £6,400 + £11,800 = £40,000. Balancing payment = £40,000 − £25,000 = £15,000, due 31 January 2027 (1 mark).",
    "(a) Credit for stating that the whole £11,800 of CGT falls into the balancing payment, being excluded from the payments on account — and for noting the October 2025 residential property disposal also required reporting and a payment on account within 60 DAYS of completion (1 mark).",
    "(b) The 2024/25 return was due 31 January 2026 and filed 14 September 2026 — more than 6 months late. Penalties are cumulative: £100 fixed, plus £10 a day for 90 days = £900, plus the greater of 5% of the tax due and £300 (2 marks).",
    "(b) Late payment: the balancing payment was more than 6 months late, so 5% at 30 days plus a further 5% at 6 months. Interest also runs from 1 February 2026 to 14 September 2026 at the rate on the rate sheet (1 mark).",
    "(c) Identifies the behaviour as DELIBERATE but not concealed — he knew and chose not to declare, but took no steps to hide it — with a maximum penalty of 70% of the £12,400 understated (1 mark).",
    "(c) States the range: 20% minimum on an unprompted disclosure (£2,480) against 35% if prompted (£4,340), so disclosing now saves at least £1,860. Notes that deliberate behaviour extends HMRC's discovery window to 20 years (1 mark).",
    "(c) The adviser MUST: advise Kasper to disclose; cease to act if he refuses; and report to the firm's MLRO or the NCA. The adviser MUST NOT: tell Kasper that a report has been made, which is TIPPING OFF and a criminal offence; or disclose Kasper's affairs to HMRC without his consent — the adviser may say only that they no longer act (1 mark).",
    "Credit throughout for giving the DATES rather than describing the deadlines, since the marks in an administration question are largely in the specific dates (marks embedded above).",
    "No credit for recommending that the adviser notify HMRC of the reason for resigning, or for continuing to act with a note on file — both are wrong and both are common answers.",
  ],
}

/* ── Form 2 · Q4 (15), Q5 (15), Q6 (10) ───────────────────────── */

const Q04: WrittenQuestion = {
  id: "TXW-04",
  paper: "TX",
  area: "B",
  chapter: "TX-13",
  topic: "Trading loss relief for a sole trader, with a recommendation",
  maxMarks: 15,
  stem:
    "Petra Alm has traded as a designer for eight years, preparing accounts to 31 March. Her results and other income are:\n\n                          2023/24    2024/25    2025/26\n  Trading profit/(loss)     £46,000    £38,000   (£94,000)\n  Property income           £11,000    £11,000    £11,000\n  Bank interest              £1,400     £1,400     £1,400\n\nPetra also realised a chargeable gain of £34,000 in 2025/26 on the sale of an investment, and has capital losses of £2,000 brought forward. She expects trading profits of about £40,000 a year from 2026/27 onwards. She has no pension contributions or gift aid donations.\n\nRequired:\n\n(a) State the loss reliefs available to Petra for the 2025/26 trading loss, identifying the years each covers and the order in which relief is given. (5 marks)\n\n(b) Calculate the amount of loss relieved and the personal allowance wasted under a claim against total income for 2024/25 followed by carry forward of the balance. (5 marks)\n\n(c) Explain how a claim against her chargeable gain would work, and what it would cost her. (3 marks)\n\n(d) Recommend a course of action, giving your reasons. (2 marks)",
  rubric: [
    "(a) CARRY FORWARD — automatic, against future trading profits of the same trade, indefinitely, earliest year first. Cannot be restricted (1 mark).",
    "(a) AGAINST TOTAL INCOME — the year of the loss (2025/26) and/or the previous year (2024/25), in either order, either, neither or both. ALL OR NOTHING in each year, subject to the cap at the higher of £50,000 and 25% of income (2 marks).",
    "(a) AGAINST CHARGEABLE GAINS — only AFTER a claim against total income for the same year, and only the unrelieved balance (1 mark).",
    "(a) Notes that opening year relief is NOT available, Petra being eight years into the trade, and terminal loss relief is not available, the trade continuing. Credit for ruling both out explicitly (1 mark).",
    "(b) 2024/25 total income = £38,000 + £11,000 + £1,400 = £50,400, all of which is relieved because the claim is all or nothing (2 marks).",
    "(b) Personal allowance of £12,570 wasted, since it would otherwise have covered part of that income. At 20% that is £2,514 of relief thrown away — the savings nil rate band is also lost (2 marks).",
    "(b) Loss remaining = £94,000 − £50,400 = £43,600, carried forward against 2026/27 trading profits of about £40,000 and the balance into 2027/28 (1 mark).",
    "(c) A claim against the £34,000 gain requires a claim against total income for 2025/26 FIRST — which would itself absorb £12,400 of income and waste that year's allowance too (1 mark).",
    "(c) The loss is set against gains BEFORE the annual exempt amount, so the £3,000 exemption would also be wasted; and capital losses brought forward of £2,000 reduce the gain available (1 mark).",
    "(c) Relief against a gain saves tax at 18% or 24% rather than the 20% or 40% available against income, so it is generally the least attractive route unless the gain is large and taxed at 24% (1 mark).",
    "(d) A defensible recommendation with reasons. Claiming against 2024/25 total income gives an immediate repayment of tax already paid, at the cost of £2,514 of wasted allowance; carrying the whole loss forward wastes nothing and relieves against trading profits at 20% from 2026/27, but defers all relief by a year (1 mark).",
    "(d) Credit for identifying the deciding factors — Petra's cash position, and whether her future profits will be taxed at a higher rate than the income being relieved now — and for reaching a clear conclusion rather than listing the options (1 mark).",
  ],
}

const Q05: WrittenQuestion = {
  id: "TXW-05",
  paper: "TX",
  area: "C",
  chapter: "TX-18",
  topic: "Chargeable gains with private residence relief and business asset disposal relief",
  maxMarks: 15,
  stem:
    "Rurik Sandvik made the following disposals in 2025/26.\n\n1. He sold his house on 31 March 2026 for £680,000, having bought it on 1 April 2010 for £212,000. He lived in it from purchase for 60 months, then travelled for 42 months, returned and lived in it for a further 30 months, and finally moved in with his partner for the last 60 months of ownership, never returning. None of the absences was employment-related.\n\n2. He sold his entire shareholding in Sandvik Tools Ltd, an unquoted trading company, realising a gain of £1,180,000. He had held 22% of the shares and been a full-time director for eleven years. He has made no previous claims for business asset disposal relief.\n\n3. He sold a painting for £14,800 that he had bought for £4,200.\n\nRurik's taxable income for 2025/26 is £58,000.\n\nRequired:\n\n(a) Calculate the chargeable gain on the house. (6 marks)\n\n(b) Calculate the chargeable gain on the painting. (2 marks)\n\n(c) Calculate Rurik's capital gains tax liability for 2025/26, and state the due date. (5 marks)\n\n(d) Explain how the position on the shares would differ if Rurik had held only 3% of the company. (2 marks)",
  rubric: [
    "(a) Total ownership 60 + 42 + 30 + 60 = 192 months, and the gain is £680,000 − £212,000 = £468,000 (1 mark).",
    "(a) Actual occupation 60 + 30 = 90 months, all exempt (1 mark).",
    "(a) The 42-month absence: deemed occupation for ANY reason is capped at 3 years, so only 36 months qualify and 6 months is chargeable. The absence is preceded and followed by actual occupation, so the condition is met (2 marks).",
    "(a) The final 60-month absence: not employment-related and never followed by reoccupation, so it does NOT qualify as deemed occupation — but the last 9 months of ownership are always exempt, so 9 months qualify and 51 are chargeable (1 mark).",
    "(a) Exempt months = 90 + 36 + 9 = 135 of 192. PRR = £468,000 × 135/192 = £329,062.50, leaving a chargeable gain of £138,937.50. Credit for noting letting relief is unavailable, no part having been let while Rurik occupied the remainder (1 mark).",
    "(b) Non-wasting chattel sold for more than £6,000, so test both figures: normal gain £14,800 − £4,200 = £10,600, against 5/3 × (£14,800 − £6,000) = £14,666. The lower is the normal gain of £10,600, so the 5/3 cap does not bite (2 marks).",
    "(c) The shares qualify for business asset disposal relief: an unquoted trading company, at least 5% held, a director, all for at least 2 years. £1,000,000 at 14% = £140,000; the remaining £180,000 at 24% = £43,200 (2 marks).",
    "(c) The annual exempt amount is best set against the gains taxed at 24% rather than the BADR gain at 14%, saving 24p rather than 14p in the pound. Credit for allocating it to the house and painting gains (1 mark).",
    "(c) Other gains = £138,937.50 + £10,600 = £149,537.50 less the £3,000 AEA = £146,537.50. Taxable income of £58,000 exceeds £37,700 so no basic rate band remains, and all of it is taxed at 24% = £35,169 (1 mark).",
    "(c) Total CGT = £140,000 on the BADR slice + £43,200 on the excess above the lifetime limit + £35,169 on the other gains = £218,369, due 31 January 2027. Credit also for noting that the HOUSE gain was separately reportable, with a payment on account, within 60 days of the 31 March 2026 completion (1 mark).",
    "(d) At 3% the 5% shareholding condition fails, so business asset disposal relief would NOT be available and the whole £1,180,000 gain would be taxed at 24% — £283,200 rather than £183,200, a difference of £100,000 (1 mark).",
    "(d) Credit for noting that INVESTORS' relief would not help either, since it requires that the individual is NOT an officer or employee, and Rurik was a director (1 mark).",
  ],
}

const Q06: WrittenQuestion = {
  id: "TXW-06",
  paper: "TX",
  area: "F",
  chapter: "TX-27",
  topic: "VAT return, penalties and the special schemes",
  maxMarks: 10,
  stem:
    "Ekeby Supplies Ltd is registered for VAT and makes wholly standard-rated supplies. For the quarter ended 30 June 2026 its records show:\n\n  Sales, excluding VAT                                          £386,000\n  Purchases and expenses, including VAT                         £228,000\n  Of which: entertaining UK customers, including VAT               £4,800\n            a new car for the sales manager, including VAT        £31,200\n  A trade debt written off, including VAT, due since October 2025   £7,200\n\nThe company paid the VAT for the quarter on 22 August 2026. Its annual taxable turnover is about £1,540,000 and it gives its customers 60 days' credit, which its finance director says causes recurring cash flow difficulty.\n\nRequired:\n\n(a) Calculate the VAT payable for the quarter, and state the due date for the return and payment. (5 marks)\n\n(b) State the penalty and interest position on the payment made on 22 August 2026. (2 marks)\n\n(c) Advise whether the cash accounting scheme would help, with reasons. (3 marks)",
  rubric: [
    "(a) Output VAT = £386,000 × 20% = £77,200. The sales figure is stated excluding VAT, so 20% applies directly (1 mark).",
    "(a) Recoverable input VAT = (£228,000 − £4,800 − £31,200) = £192,000 including VAT, so £192,000 × 20/120 = £32,000 (2 marks).",
    "(a) Entertaining UK customers and a car with private use are both irrecoverable — the car entirely, since any private use blocks the whole claim rather than apportioning it (1 mark).",
    "(a) Impairment loss relief = £7,200 × 20/120 = £1,200, the debt being written off and more than 6 months overdue. VAT payable = £77,200 − £32,000 − £1,200 = £44,000, due by 7 August 2026 — one month and seven days after the quarter end (1 mark).",
    "(b) Payment on 22 August is 15 days after the 7 August due date, so it falls within the 15-day grace period and NO penalty arises (1 mark).",
    "(b) Interest still runs from the due date to the date of payment, at the rate on the rate sheet. Credit for distinguishing the penalty position from the interest position, which is the point of the question (1 mark).",
    "(c) The company is NOT ELIGIBLE. Taxable turnover of about £1,540,000 exceeds the £1,350,000 joining threshold, so it cannot use the scheme and must remain on the invoice basis. Recognising that the scheme is unavailable — rather than describing its benefits and recommending it — is the substance of this part (1 mark).",
    "(c) Explains WHY it would otherwise have helped: accounting for VAT on cash received rather than invoices issued removes the need to fund output VAT during the 60 days of credit, and makes impairment relief unnecessary because unpaid invoices never enter the return (1 mark).",
    "(c) Suggests the alternative that IS available — reviewing credit control, or the annual accounting scheme once turnover permits — and notes that a business must LEAVE cash accounting once turnover exceeds £1,600,000 in any case (1 mark).",
    "Credit throughout for using the 20/120 fraction on VAT-inclusive figures rather than 20%, which is where most VAT marks are lost (marks embedded above).",
  ],
}

export const TX_WRITTEN_KIT: WrittenQuestion[] = [Q01, Q02, Q03, Q04, Q05, Q06]
