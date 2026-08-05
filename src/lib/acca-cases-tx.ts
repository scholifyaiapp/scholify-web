import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * TX-UK · Section B OT cases — the real exam format.
 *
 * TX's Section B is THREE OT cases, each with FIVE linked questions of 2 marks — 30 marks in
 * total. So a sitting takes three cases and three disjoint sittings need NINE.
 *
 * ── Ordering ────────────────────────────────────────────────────
 * The mock composer rotates the case list by a whole sitting's worth per form, so form 1
 * draws cases 1–3, form 2 draws 4–6 and form 3 draws 7–9. Each block of three spans
 * different syllabus areas, and every block includes at least one income tax case, because
 * Area B is by far the largest part of the paper:
 *
 *   Form 1 · cases 1–3    B (income tax), B (benefits), B (capital allowances)
 *   Form 2 · cases 4–6    C (chargeable gains), D (inheritance tax), E (corporation tax)
 *   Form 3 · cases 7–9    E (company losses), F (VAT), A (administration)
 *
 * ── Why the linked tasks build on one another ────────────────────
 * Within each case the five tasks are sequenced so that figures computed early are the
 * inputs to the later ones, and the final task is interpretation or advice. That is how the
 * real cases work, and it is why the last task is worth reading even by a candidate who got
 * the arithmetic wrong.
 *
 * Every figure in every scenario was verified by script before this file was committed, and
 * every rate is FA2025. No case applies an excluded topic.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/** A two-mark linked task within an OT case. */
function task(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "TX",
    area,
    chapter,
    type: "mcq",
    stem,
    options,
    correct,
    explanation,
    marks: 2,
    difficulty,
  }
}

/** A two-mark linked task requiring a numeric answer. */
function numTask(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  numericAnswer: number,
  unit: string,
  tolerance: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "TX",
    area,
    chapter,
    type: "number",
    stem,
    numericAnswer,
    unit,
    tolerance,
    explanation,
    marks: 2,
    difficulty,
  }
}

/* ── Form 1 block · cases 1–3 ─────────────────────────────────── */

const CASE_01: OtCase = {
  id: "tx-otc-01",
  paper: "TX",
  area: "B",
  title: "Freya Sandholm — the income tax computation",
  scenario:
    "Freya Sandholm has employment income of £44,000 for 2025/26. She received bank interest of £2,600 and dividends of £4,400 during the year, and paid gift aid donations of £1,800. She has made no pension contributions. Freya's husband earns £9,000 a year and has asked whether transferring part of his personal allowance to her would help. Freya also asks why her dividends appear to be taxed at three different rates.",
  questions: [
    numTask("tx-otc-01", 1, "B", "TX-05", "easy",
      "What is the GROSS amount of Freya's gift aid donations, in £?",
      2250, "£", 1,
      "£1,800 × 100/80 = £2,250. The donation was paid net of basic rate tax, which the charity reclaims, so the gross figure is what extends the bands — and it is also what would reduce adjusted net income."),
    numTask("tx-otc-01", 2, "B", "TX-04", "medium",
      "What is Freya's taxable income for 2025/26, in £?",
      38430, "£", 1,
      "Total income = £44,000 + £2,600 + £4,400 = £51,000, less the full personal allowance of £12,570 = £38,430. Her adjusted net income of £48,750 is well below the £100,000 limit, so no abatement arises."),
    task("tx-otc-01", 3, "B", "TX-04", "hard",
      "What savings nil rate band is available to Freya?",
      [
        "£500, because her total income exceeds £37,700",
        "£1,000 — taxable income of £38,430 is below her EXTENDED basic rate limit of £39,950, so she remains a basic rate taxpayer",
        "£5,000, under the starting rate",
        "Nil",
      ],
      1,
      "£1,000. The gift aid donation extends the basic rate limit to £37,700 + £2,250 = £39,950, and taxable income of £38,430 falls below it — so Freya is a BASIC rate taxpayer and gets the full £1,000. Without the donation she would have crossed £37,700 and had only £500, so the donation is worth more than the band extension alone suggests."),
    numTask("tx-otc-01", 4, "B", "TX-04", "hard",
      "What is Freya's income tax liability for 2025/26, in £?",
      6947.25, "£", 0.51,
      "Non-savings £31,430 at 20% = £6,286. Savings: £1,000 at 0% under the nil rate band, then £1,600 at 20% = £320. Dividends: £500 at 0%, then £3,900 at 8.75% = £341.25. Total £6,947.25 — all within the extended basic rate band of £39,950."),
    task("tx-otc-01", 5, "B", "TX-05", "hard",
      "Would transferring part of her husband's personal allowance help Freya?",
      [
        "No — the transfer is only available where both are non-taxpayers",
        "Yes — he cannot use all of his allowance and neither is a higher rate taxpayer, so the fixed £1,260 transfer gives Freya a £252 tax reducer",
        "Yes, and it would add £1,260 to her personal allowance",
        "No, because Freya has dividend income",
      ],
      1,
      "YES, WORTH £252. Her husband's £9,000 of income leaves £3,570 of his allowance unused, and neither of them is a higher or additional rate taxpayer — the two conditions. But note what she receives: a fixed tax REDUCER of £1,260 × 20% = £252 against her liability, not £1,260 of extra allowance."),
  ],
}

const CASE_02: OtCase = {
  id: "tx-otc-02",
  paper: "TX",
  area: "B",
  title: "Halvard Engineering — a benefits package",
  scenario:
    "Halvard Engineering provided its sales director, Marta, with a petrol company car from 6 July 2025. The car has a list price of £36,000 and CO2 emissions of 124 g/km, and the company pays for all her fuel including private motoring, with no reimbursement. It also made her an interest-free loan of £26,000 on which she paid £320 of interest during the year. The official rate of interest is 3.75%. Marta asks whether she should reimburse the company for her private fuel, which she estimates at about £1,400 a year. She is a higher rate taxpayer.",
  questions: [
    numTask("tx-otc-02", 1, "B", "TX-08", "medium",
      "What is the appropriate percentage for Marta's car?",
      30, "%", 0.01,
      "Round emissions DOWN to the nearest 5, giving 120 g/km. The base level of 55 g/km carries 17%, and (120 − 55)/5 = 13 further increments of 1%, so 17% + 13% = 30%. It is a petrol car, so no diesel supplement, and 30% is below the 37% cap."),
    numTask("tx-otc-02", 2, "B", "TX-08", "medium",
      "What is the car benefit for 2025/26, in £?",
      8100, "£", 1,
      "£36,000 × 30% = £10,800 for a full year, time-apportioned for availability from 6 July 2025 — nine months of the tax year: £10,800 × 9/12 = £8,100."),
    numTask("tx-otc-02", 3, "B", "TX-08", "medium",
      "What is the fuel benefit for 2025/26, in £?",
      6345, "£", 1,
      "£28,200 × 30% = £8,460 for a full year, likewise apportioned 9/12 = £6,345. The fuel benefit uses the same percentage but the FIXED £28,200 base figure rather than the list price."),
    numTask("tx-otc-02", 4, "B", "TX-08", "medium",
      "What is the beneficial loan benefit, in £?",
      655, "£", 1,
      "(£26,000 × 3.75%) − £320 interest paid = £975 − £320 = £655. Note that had the loan been £10,000 or less throughout the year it would have been entirely exempt."),
    task("tx-otc-02", 5, "B", "TX-08", "hard",
      "Should Marta reimburse the company for her private fuel?",
      [
        "No — the benefit is fixed and reimbursement changes nothing",
        "Yes — reimbursing the FULL cost removes the whole £6,345 benefit, saving £2,538 of tax at 40% for an outlay of about £1,400",
        "Yes, but only partial reimbursement is needed to reduce the charge proportionately",
        "No, because the car benefit would remain",
      ],
      1,
      "YES, IN FULL. The £6,345 fuel benefit costs her £2,538 at 40%, against roughly £1,400 of actual private fuel — so reimbursing saves about £1,138. But it must be the FULL cost: partial reimbursement gives no reduction whatever, which is what makes this decision all or nothing."),
  ],
}

const CASE_03: OtCase = {
  id: "tx-otc-03",
  paper: "TX",
  area: "B",
  title: "Ingrid Solberg — capital allowances and the tax year basis",
  scenario:
    "Ingrid Solberg is a sole trader who prepares accounts to 30 September. Her tax adjusted trading profit before capital allowances was £186,000 for the year ended 30 September 2025 and £214,000 for the year ended 30 September 2026. For the year ended 30 September 2026 she bought machinery for £760,000 and integral features for £140,000, and sold machinery for £14,200 that had originally cost £19,000. The main pool balance brought forward at 1 October 2025 was £31,000. Ingrid has heard that she can claim overlap relief and asks how it applies to her.",
  questions: [
    task("tx-otc-03", 1, "B", "TX-11", "hard",
      "How should the £1,000,000 annual investment allowance be allocated?",
      [
        "£760,000 to the machinery first, then £140,000 to the integral features",
        "£140,000 to the integral features FIRST, then £760,000 to the machinery",
        "Pro rata between the two",
        "£500,000 to each",
      ],
      1,
      "SPECIAL RATE POOL FIRST. Integral features would otherwise attract only a 6% writing down allowance against 18% for the main pool, so relieving them in full immediately is worth more. Here the AIA covers both in full anyway, but the ordering principle is what earns the mark."),
    numTask("tx-otc-03", 2, "B", "TX-11", "medium",
      "What is the main pool writing down allowance for the year ended 30 September 2026, in £?",
      3024, "£", 1,
      "The AIA covers all £760,000 of machinery, so nothing joins the pool. Pool = £31,000 brought forward less the disposal at the LOWER of cost (£19,000) and proceeds (£14,200), so £31,000 − £14,200 = £16,800, and 18% = £3,024."),
    numTask("tx-otc-03", 3, "B", "TX-11", "medium",
      "What are the total capital allowances for the year ended 30 September 2026, in £?",
      903024, "£", 1,
      "AIA of £140,000 on the integral features plus £760,000 on the machinery = £900,000, which is within the £1,000,000 limit so nothing is left over for the pool. Add the main pool WDA of £3,024: total allowances £903,024."),
    numTask("tx-otc-03", 4, "B", "TX-10", "hard",
      "Ignoring capital allowances, what trading profit is assessable for 2025/26, in £?",
      200000, "£", 1,
      "The tax year basis applies, so time-apportion: (£186,000 × 6/12) + (£214,000 × 6/12) = £93,000 + £107,000 = £200,000. April to September 2025 comes from the earlier period and October 2025 to March 2026 from the later one."),
    task("tx-otc-03", 5, "B", "TX-10", "hard",
      "How should Ingrid's question about overlap relief be answered?",
      [
        "Overlap relief is available on cessation of her trade",
        "It no longer exists — from 2024/25 profits are taxed on the TAX YEAR basis, so no overlap profits arise for a continuing business",
        "It is available but only against trading profits",
        "She must elect for it within two years",
      ],
      1,
      "IT NO LONGER EXISTS. The move to the tax year basis from 2024/25 removed the opening year rules and with them overlap profits, so there is nothing to relieve. Any overlap profits from her earlier years were dealt with as transition profits, spread over five years."),
  ],
}

/* ── Form 2 block · cases 4–6 ─────────────────────────────────── */

const CASE_04: OtCase = {
  id: "tx-otc-04",
  paper: "TX",
  area: "C",
  title: "Bjorn Aaland — three disposals in one year",
  scenario:
    "Bjorn Aaland made three disposals in 2025/26. He sold an antique desk for £11,400 that had cost him £3,200. He sold 950 shares in Kvist plc for £18 each, out of a holding of 1,900 shares that had cost £24,500 in total, with no acquisitions near the disposal date. And he sold a house for a gain of £420,000, having owned it for 168 months of which 126 months qualified as occupation. His taxable income for the year is £22,000 and he has no capital losses. Bjorn's wife has no income and has made no disposals.",
  questions: [
    numTask("tx-otc-04", 1, "C", "TX-16", "hard",
      "What is the chargeable gain on the antique desk, in £?",
      8200, "£", 1,
      "Marginal relief takes the LOWER of the normal gain (£11,400 − £3,200 = £8,200) and 5/3 × (£11,400 − £6,000) = £9,000. The normal gain is lower, so the chargeable gain is £8,200 and the 5/3 cap does NOT bite. The mark is for testing both figures — a candidate who applies the 5/3 rule automatically arrives at £9,000 and overstates the gain."),
    numTask("tx-otc-04", 2, "C", "TX-17", "medium",
      "What is the gain on the Kvist plc shares, in £?",
      4850, "£", 1,
      "Proceeds 950 × £18 = £17,100. Cost = £24,500 × 950/1,900 = £12,250. Gain = £4,850. With no acquisitions on the same day or within the following 30 days, the whole disposal comes from the share pool."),
    numTask("tx-otc-04", 3, "C", "TX-18", "medium",
      "What is the private residence relief on the house, in £?",
      315000, "£", 1,
      "£420,000 × 126/168 = £315,000, leaving a chargeable gain of £105,000. Always work in months and lay the periods out as a timeline before computing."),
    task("tx-otc-04", 4, "C", "TX-15", "hard",
      "At what rates will Bjorn's gains be taxed?",
      [
        "All at 18%, since his income is modest",
        "£15,700 at 18% — the basic rate band remaining — and the balance at 24%",
        "All at 24%, since total gains exceed £37,700",
        "18% on the shares and 24% on the property",
      ],
      1,
      "£15,700 AT 18%, THE REST AT 24%. The remaining basic rate band is £37,700 − £22,000 of taxable income = £15,700, and gains above that are taxed at 24%. There is no residential surcharge in FA2025, so the house is taxed at the same rates as the shares."),
    task("tx-otc-04", 5, "C", "TX-15", "hard",
      "What planning would have reduced Bjorn's liability, and why is it available?",
      [
        "Nothing — the disposals have already been made",
        "Transferring some assets to his wife before sale, since spousal transfers are at no gain, no loss and she has her own £3,000 annual exempt amount and a full basic rate band",
        "Claiming business asset disposal relief on the shares",
        "Deferring the house sale to the following tax year",
      ],
      1,
      "TRANSFER TO HIS WIFE BEFORE SALE. She has an unused £3,000 annual exempt amount and a full £37,700 basic rate band, so gains in her hands would be partly exempt and largely taxed at 18%. And the transfer itself is free of tax, being at no gain, no loss — the standard TX planning recommendation."),
  ],
}

const CASE_05: OtCase = {
  id: "tx-otc-05",
  paper: "TX",
  area: "D",
  title: "The Nordstrand estate — a lifetime transfer and a death",
  scenario:
    "On 14 August 2020 Lars Nordstrand transferred £560,000 into a discretionary trust. Both his annual exemptions were available and he had made no earlier transfers. The trustees agreed to pay any lifetime tax. Lars died on 3 February 2026. His death estate comprised a house worth £610,000 left to his son, and other assets of £480,000, against which there was a £70,000 mortgage and £8,000 of funeral expenses. Lars's wife had died in 2019 leaving her entire estate to him, so none of her nil rate bands had been used. The nil rate band is £325,000 throughout.",
  questions: [
    numTask("tx-otc-05", 1, "D", "TX-19", "medium",
      "What is the net chargeable transfer on the 2020 gift into trust, in £?",
      554000, "£", 1,
      "£560,000 less two annual exemptions of £3,000 — the 2020/21 exemption and the unused 2019/20 one brought forward — so £560,000 − £6,000 = £554,000. Use the current year's exemption first, then the brought-forward one."),
    numTask("tx-otc-05", 2, "D", "TX-19", "hard",
      "What was the lifetime inheritance tax on the transfer, in £?",
      45800, "£", 1,
      "£554,000 − £325,000 = £229,000, taxed at 20% because the TRUSTEES agreed to bear it: £45,800. Had Lars paid it, the rate would have been 25% grossed up, giving £57,250."),
    numTask("tx-otc-05", 3, "D", "TX-19", "hard",
      "What FURTHER inheritance tax arises on the 2020 transfer as a result of Lars's death, in £?",
      0, "£", 1,
      "Death tax before reliefs = £229,000 × 40% = £91,600. From August 2020 to February 2026 is more than 5 but less than 6 years, so taper relief is 60%: £91,600 × 40% = £36,640. That is LESS than the £45,800 of lifetime tax already paid, so the further tax is NIL — and no refund arises, because the credit cannot take the figure below nil."),
    numTask("tx-otc-05", 4, "D", "TX-20", "hard",
      "What is the inheritance tax on Lars's death estate, in £?",
      226400, "£", 1,
      "Net estate = £610,000 + £480,000 − £70,000 − £8,000 = £1,012,000. RNRB = £175,000 × 2 = £350,000, within the £610,000 house value. NRB = £325,000 × 2 = £650,000 less the £554,000 gross chargeable transfer in the seven years before death = £96,000. Taxable = £1,012,000 − £350,000 − £96,000 = £566,000, at 40% = £226,400. Note how much the 2020 transfer costs the estate: it has consumed £554,000 of the £650,000 of nil rate band."),
    task("tx-otc-05", 5, "D", "TX-20", "hard",
      "Why is the residence nil rate band available in full here?",
      [
        "Because the estate is under £2 million",
        "Because the house passes to a DIRECT DESCENDANT and its £610,000 value exceeds the £350,000 of combined bands available",
        "Because Lars's wife predeceased him",
        "Because the mortgage reduces the estate below the threshold",
      ],
      1,
      "THE HOUSE PASSES TO A DIRECT DESCENDANT AND EXCEEDS THE BAND. A son qualifies, and the RNRB is capped at the residence's value — £610,000 comfortably exceeds the £350,000 available. Had the house been left to a sibling, the whole £350,000 would have been lost. Note the £2 million taper is an excluded topic in TX."),
  ],
}

const CASE_06: OtCase = {
  id: "tx-otc-06",
  paper: "TX",
  area: "E",
  title: "Fjordhaven Ltd — the corporation tax computation",
  scenario:
    "Fjordhaven Ltd has one 51% subsidiary. For the year ended 31 March 2026 it had a tax adjusted trading profit of £540,000, property business income of £38,000 and interest receivable of £22,000. It paid qualifying charitable donations of £15,000 and received dividends of £40,000 from a company in which it holds 4%. Its finance director believes the company is not large for quarterly instalment purposes because its profits are below £1,500,000.",
  questions: [
    numTask("tx-otc-06", 1, "E", "TX-21", "medium",
      "What are Fjordhaven's taxable total profits, in £?",
      585000, "£", 1,
      "£540,000 + £38,000 + £22,000 = £600,000 of total profits, less £15,000 of QCDs = £585,000. The £40,000 of dividends is EXEMPT and never enters TTP."),
    numTask("tx-otc-06", 2, "E", "TX-21", "medium",
      "What are Fjordhaven's augmented profits, in £?",
      625000, "£", 1,
      "£585,000 + £40,000 = £625,000. The dividends are from a 4% holding, so they are non-group dividends and count towards augmented profits even though they are exempt from tax."),
    numTask("tx-otc-06", 3, "E", "TX-22", "medium",
      "What is the corporation tax liability, in £?",
      146250, "£", 1,
      "The upper limit is £250,000 divided by two associated companies = £125,000. Augmented profits of £625,000 far exceed it, so the main rate applies with no marginal relief: £585,000 × 25% = £146,250. Tax is charged on TTP, not on augmented profits."),
    task("tx-otc-06", 4, "E", "TX-03", "hard",
      "Is the finance director right that the company is not large?",
      [
        "Yes — augmented profits of £625,000 are well below £1,500,000",
        "No, but not for the reason he thinks: the threshold is halved to £750,000 for the two group companies, and £625,000 is still below it — so he reaches the right answer by the wrong route",
        "No — £625,000 exceeds the adjusted threshold",
        "Yes, because dividends are excluded from the test",
      ],
      1,
      "RIGHT ANSWER, WRONG REASONING. The £1,500,000 threshold must first be DIVIDED by the two 51% group companies, giving £750,000, and augmented profits of £625,000 are below that — so the company is not large. But he tested against the undivided figure and ignored the dividends, either of which could have made him wrong."),
    task("tx-otc-06", 5, "E", "TX-03", "medium",
      "When are the company's corporation tax and its return due?",
      [
        "Both on 31 March 2027",
        "Tax on 1 January 2027 and the return by 31 March 2027",
        "Tax on 31 March 2027 and the return by 1 January 2027",
        "Both on 1 January 2027",
      ],
      1,
      "TAX 1 JANUARY 2027, RETURN 31 MARCH 2027. Payment falls 9 months and 1 day after the 31 March 2026 period end; the return is not due for 12 months. So the company pays three months before it files, and must estimate."),
  ],
}

/* ── Form 3 block · cases 7–9 ─────────────────────────────────── */

const CASE_07: OtCase = {
  id: "tx-otc-07",
  paper: "TX",
  area: "E",
  title: "Kvitfjell Ltd — relieving a trading loss",
  scenario:
    "Kvitfjell Ltd's last two accounting periods run as follows. Year to 31 March 2025: trading profit £82,000, property income £12,000, qualifying charitable donations £6,000. Year ended 31 March 2026: trading LOSS of £180,000, property income £26,000, qualifying charitable donations £6,000. The company expects substantial profits from the year ending 31 March 2027 onwards. It wishes to obtain relief as early as possible. It has no associated companies.",
  questions: [
    numTask("tx-otc-07", 1, "E", "TX-24", "medium",
      "How much of the loss is relieved by a current period claim, in £?",
      26000, "£", 1,
      "£26,000 — the total profits of the loss period before QCDs, being the property income. The claim is all or nothing, so the whole £26,000 is absorbed and cannot be restricted."),
    numTask("tx-otc-07", 2, "E", "TX-24", "medium",
      "How much of the 2025/26 QCDs is wasted by that claim, in £?",
      6000, "£", 1,
      "All £6,000. The claim reduces total profits to nil, and QCDs cannot create or increase a loss — so the whole amount is lost. It cannot be carried forward, carried back or surrendered as group relief."),
    numTask("tx-otc-07", 3, "E", "TX-24", "hard",
      "How much of the loss can be carried back to the year ended 31 March 2025, in £?",
      94000, "£", 1,
      "£94,000 — the total profits of that period BEFORE QCDs, being £82,000 + £12,000. The carry back covers the previous 12 months only, requires a current period claim first, and again wastes that year's £6,000 of QCDs."),
    numTask("tx-otc-07", 4, "E", "TX-24", "medium",
      "How much of the loss remains to be carried forward, in £?",
      60000, "£", 1,
      "£180,000 − £26,000 relieved currently − £94,000 carried back = £60,000, carried forward against future total profits. Note that a brought-forward claim CAN be partial, so Kvitfjell will be able to restrict it in a future year to preserve that year's QCDs."),
    task("tx-otc-07", 5, "E", "TX-24", "hard",
      "What is the main disadvantage of obtaining relief as early as possible here?",
      [
        "The loss relief is capped at £50,000",
        "It wastes £12,000 of QCDs across the two years, and those cannot be carried forward, carried back or surrendered",
        "It delays relief until 2027",
        "The carry back claim is not available",
      ],
      1,
      "£12,000 OF QCDs WASTED, £6,000 in each year. Set against that is the cash flow benefit of a repayment of the 2024/25 tax now. Carrying the whole loss forward would waste nothing and permit partial claims, but relieves nothing until profits return — which is the trade-off the question is really about."),
  ],
}

const CASE_08: OtCase = {
  id: "tx-otc-08",
  paper: "TX",
  area: "F",
  title: "Storhaug Trading Ltd — a VAT return",
  scenario:
    "Storhaug Trading Ltd is registered for VAT and makes wholly standard-rated supplies. For the quarter ended 31 March 2026 it had sales of £428,000 excluding VAT and purchases and expenses of £252,000 including VAT. Included in those purchases were £5,400 including VAT of entertaining for UK customers and £33,600 including VAT for a new car for the managing director, who uses it privately. The company also wrote off a trade debt of £8,400 including VAT that had been due since June 2025. It paid the VAT for the quarter on 20 May 2026.",
  questions: [
    numTask("tx-otc-08", 1, "F", "TX-27", "easy",
      "What is the output VAT for the quarter, in £?",
      85600, "£", 1,
      "£428,000 × 20% = £85,600. The sales figure is stated EXCLUDING VAT, so 20% is applied directly rather than the 20/120 fraction."),
    numTask("tx-otc-08", 2, "F", "TX-27", "medium",
      "What input VAT is recoverable on the purchases and expenses, in £? Ignore the entertaining and the car.",
      35500, "£", 1,
      "Total purchases £252,000 less the £5,400 of entertaining and the £33,600 car = £213,000 including VAT, so £213,000 × 20/120 = £35,500. The figures are VAT-inclusive, so the 20/120 fraction extracts the VAT."),
    task("tx-otc-08", 3, "F", "TX-26", "medium",
      "Why is the input VAT on the car and the entertaining irrecoverable?",
      [
        "Because both were bought from unregistered suppliers",
        "VAT on a car is irrecoverable where there is ANY private use, and VAT on entertaining UK customers is specifically blocked",
        "Because they exceed the £5,000 de minimis",
        "Because the car is a capital item",
      ],
      1,
      "PRIVATE USE ON THE CAR, AND UK CUSTOMER ENTERTAINING. A car must be used WHOLLY for business for its VAT to be recoverable — any private use blocks the entire claim rather than apportioning it. Entertaining staff or OVERSEAS customers would have been recoverable."),
    numTask("tx-otc-08", 4, "F", "TX-27", "medium",
      "What impairment loss relief may be claimed on the written-off debt, in £?",
      1400, "£", 1,
      "£8,400 × 20/120 = £1,400. The debt has been written off and, having been due since June 2025, is more than six months overdue by 31 March 2026 — both conditions are met."),
    task("tx-otc-08", 5, "F", "TX-27", "hard",
      "The VAT was due by 7 May 2026 and paid on 20 May 2026. What penalty arises?",
      [
        "3% of the outstanding amount",
        "None — payment was within 15 days of the due date, so only interest is charged",
        "6% plus a daily penalty",
        "A flat £200",
      ],
      1,
      "NO PENALTY, INTEREST ONLY. Payment on 20 May is 13 days late, inside the 15-day grace period. From 16 to 30 days the penalty is 3%, and beyond 30 days it is 6% plus a daily charge at an annual 10%. That grace period is unique to VAT among the paper's penalty regimes."),
  ],
}

const CASE_09: OtCase = {
  id: "tx-otc-09",
  paper: "TX",
  area: "A",
  title: "Sigrid Bakke — self assessment, and an error discovered",
  scenario:
    "Sigrid Bakke is self-employed. For 2024/25 her income tax liability was £23,800 and her Class 4 NIC £3,400, with £5,200 deducted at source from a part-time employment. Her 2025/26 liability is income tax £26,200, Class 4 NIC £3,900, tax deducted at source £5,200, and capital gains tax of £8,600 on the sale of an investment property in November 2025. While preparing the 2025/26 return, her adviser discovers that £24,000 of consultancy income was omitted from the 2024/25 return. Sigrid says she knew about it but decided not to declare it, and asks the adviser to leave it alone.",
  questions: [
    numTask("tx-otc-09", 1, "A", "TX-02", "medium",
      "What is EACH payment on account for 2025/26, in £?",
      11000, "£", 1,
      "Relevant amount = £23,800 + £3,400 − £5,200 = £22,000, and each payment on account is 50% = £11,000, due 31 January 2026 and 31 July 2026."),
    numTask("tx-otc-09", 2, "A", "TX-02", "hard",
      "What is the balancing payment for 2025/26, in £?",
      11500, "£", 1,
      "Total due = £26,200 + £3,900 − £5,200 + £8,600 = £33,500, less the £22,000 paid on account = £11,500, due 31 January 2027. The whole £8,600 of CGT falls here, because CGT is excluded from payments on account."),
    task("tx-otc-09", 3, "A", "TX-15", "hard",
      "What additional obligation arose on the November 2025 property disposal?",
      [
        "None — the gain is reported on the tax return",
        "It had to be reported to HMRC within 60 DAYS of completion, with a payment on account of the estimated CGT",
        "It had to be reported within 30 days",
        "A separate return was due by 5 April 2026",
      ],
      1,
      "REPORT AND PAY ON ACCOUNT WITHIN 60 DAYS. A gain on a UK residential property that is not fully covered by private residence relief triggers this obligation, and the final position is then reconciled through the tax return."),
    task("tx-otc-09", 4, "A", "TX-02", "hard",
      "The omission was deliberate but not concealed, and the tax understated is £9,600. What is the MINIMUM penalty on an unprompted disclosure?",
      [
        "£960, being 10%",
        "£1,920 — 20% of the tax understated",
        "£3,360, being 35%",
        "£9,600, being 100%",
      ],
      1,
      "£1,920, BEING 20%. Deliberate but not concealed has a maximum of 70%, reducible to 20% for an unprompted disclosure and 35% for a prompted one. Reading 'deliberate' and jumping to 100% is wrong — that requires CONCEALMENT as a separate finding."),
    task("tx-otc-09", 5, "A", "TX-01", "hard",
      "Sigrid refuses to correct the 2024/25 return. What must the adviser do?",
      [
        "Continue to act but note the disagreement on file",
        "Cease to act, report to the firm's MLRO or the NCA without telling Sigrid, and not disclose her affairs to HMRC without consent",
        "Notify HMRC of the omission immediately",
        "Correct the figure in the 2025/26 return instead",
      ],
      1,
      "CEASE TO ACT AND REPORT, WITHOUT TIPPING OFF. The two prohibitions are the marks: telling Sigrid a report has been made is TIPPING OFF, a criminal offence, and her affairs cannot be disclosed to HMRC without her consent — the adviser may say only that they no longer act."),
  ],
}

export const TX_OT_CASES: OtCase[] = [
  CASE_01,
  CASE_02,
  CASE_03,
  CASE_04,
  CASE_05,
  CASE_06,
  CASE_07,
  CASE_08,
  CASE_09,
]
