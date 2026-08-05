import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-tx-kit-builders"

/*
 * TX-UK · Area B question kit, first part — chapters 4 to 6.
 *
 * The income tax computation, the adjustments, and property income.
 *
 * The computation questions are set so that the nil rate bands actually bite — a question
 * where the taxpayer stays inside the basic rate band never tests whether the candidate
 * knows the band is £500 rather than £1,000, or that the nil rate bands CONSUME basic rate
 * band rather than sitting outside the computation.
 *
 * Nothing here applies an excluded topic: no £1,000 property allowance, and property income
 * is computed on the CASH basis throughout, as TX requires unless a question says otherwise.
 *
 * Authored, applied, exam-standard at TX's uniform 2 marks, on the FA2025 basis.
 */

/* ── Chapter 4 · The income tax computation ── */

const CH04: AccaQuestion[] = [
  num("TXK-04-01", "TX-04", "B", "medium",
    "For 2025/26 Anwar has employment income of £46,000, bank interest of £1,800 and dividends of £3,200. What is his income tax liability, in £ to the nearest pound?",
    7365, "£", 1,
    "Taxable income = £46,000 + £1,800 + £3,200 − £12,570 = £38,430, which exceeds £37,700 so the savings nil rate band is £500. Non-savings £33,430 at 20% = £6,686. Savings: £500 at 0%, then £1,300 at 20% = £260. Dividends: £500 at 0%, then £1,970 at 8.75% = £172.38, then £730 at 33.75% = £246.38. Total £7,364.75, so £7,365."),

  q("TXK-04-02", "TX-04", "B", "medium",
    "A taxpayer's taxable income is £38,430. What savings nil rate band applies?",
    ["£1,000", "£500", "£5,000", "Nil"],
    1,
    "£500. The band depends on the rate band the taxpayer's TOTAL taxable income reaches: £1,000 for a basic rate taxpayer, £500 for a higher rate taxpayer and nil for an additional rate taxpayer. £38,430 exceeds the £37,700 basic rate limit."),

  q("TXK-04-03", "TX-04", "B", "hard",
    "Why is it wrong to treat the dividend nil rate band as exempt income?",
    [
      "It is not a nil rate band but a tax reducer",
      "It charges the income at 0%, so the income still counts as taxable income and still uses up basic rate band",
      "It only applies to basic rate taxpayers",
      "It is deducted from total income before the personal allowance",
    ],
    1,
    "IT CHARGES INCOME AT 0% RATHER THAN REMOVING IT. So the £500 still counts as taxable income and still consumes £500 of basic rate band, pushing later income into a higher band. Treating it as exempt understates the tax on everything above it — the commonest error in the computation."),

  num("TXK-04-04", "TX-04", "B", "easy",
    "A taxpayer has adjusted net income of £118,500 and makes no gift aid or pension contributions. What is their personal allowance, in £?",
    3320, "£", 1,
    "The abatement is (£118,500 − £100,000)/2 = £9,250, so the allowance is £12,570 − £9,250 = £3,320. The allowance is extinguished entirely once adjusted net income reaches £125,140."),

  q("TXK-04-05", "TX-04", "B", "hard",
    "Why is the effective marginal rate 60% between adjusted net income of £100,000 and £125,140?",
    [
      "A 60% band applies in that range",
      "Each extra £2 is taxed at 40% and also removes £1 of personal allowance, which is itself then taxed at 40%",
      "National insurance is added at 20%",
      "The additional rate begins at £100,000",
    ],
    1,
    "THE ABATEMENT DOUBLES THE EFFECT. £2 of extra income costs 80p at 40%, and it withdraws £1 of allowance which is itself taxed at 40% — another 40p. That is £1.20 of tax on £2 of income, and it is why a pension contribution in that band is unusually valuable."),

  q("TXK-04-06", "TX-04", "B", "medium",
    "In what order should income be taxed?",
    [
      "Dividends, then savings, then non-savings",
      "Non-savings, then savings, then dividends",
      "Whichever order produces the lowest liability",
      "In the order the income was received",
    ],
    1,
    "NON-SAVINGS, THEN SAVINGS, THEN DIVIDENDS. The order matters because the rate applied to the later columns depends on how much basic rate band the earlier ones have already consumed. Note that optimising the order is an EXCLUDED topic — the statutory order always applies."),

  multi("TXK-04-07", "TX-04", "B", "medium",
    "Which of these are EXEMPT from income tax? Select TWO.",
    [
      "The state pension",
      "Interest on an ISA",
      "Interest on an ordinary NS&I savings account",
      "Premium bond winnings",
    ],
    [1, 3],
    "ISA INTEREST and PREMIUM BOND WINNINGS. The state pension IS taxable and is paid gross, so a pensioner with other income owes tax on it. Ordinary NS&I account interest is taxable too — only NS&I savings CERTIFICATES are exempt."),

  num("TXK-04-08", "TX-04", "B", "medium",
    "Priya's only income for 2025/26 is employment income of £30,000 and bank interest of £2,000. What is her income tax liability, in £?",
    3686, "£", 1,
    "Taxable income = £32,000 − £12,570 = £19,430, which is below £37,700 so she is a BASIC rate taxpayer and the savings nil rate band is £1,000. Non-savings £17,430 at 20% = £3,486. Savings: £1,000 at 0%, then £1,000 at 20% = £200. Total £3,686."),

  q("TXK-04-09", "TX-04", "B", "hard",
    "When does the savings starting rate of 0% on the first £5,000 of taxable income actually give relief?",
    [
      "Whenever the taxpayer has savings income",
      "Only where non-savings income is very low, since non-savings income is taxed first and absorbs that first £5,000",
      "Only for additional rate taxpayers",
      "Only where savings income exceeds £5,000",
    ],
    1,
    "ONLY WHERE NON-SAVINGS INCOME IS VERY LOW. Non-savings income is taxed first, so it uses up the first £5,000 of taxable income before any savings income reaches it. State that you have considered it even where it gives nothing — the mark is for the consideration."),

  q("TXK-04-10", "TX-04", "B", "medium",
    "Against which income is the personal allowance deducted first?",
    ["Dividend income", "Savings income", "Non-savings income", "Whichever gives the lowest liability"],
    2,
    "NON-SAVINGS INCOME FIRST, then savings, then dividends. Non-savings income is taxed first and at the full rates, so relieving it there is worth most — and the statutory order applies regardless, since optimising the allocation is an excluded topic."),

  num("TXK-04-11", "TX-04", "B", "hard",
    "Ravi has employment income of £150,000 for 2025/26 and no other income. What is his income tax liability, in £?",
    53703, "£", 1,
    "Adjusted net income of £150,000 exceeds £125,140, so the personal allowance is NIL and taxable income is the full £150,000. £37,700 at 20% = £7,540; then £125,140 − £37,700 = £87,440 at 40% = £34,976; then £150,000 − £125,140 = £24,860 at 45% = £11,187. Total £53,703. The trap is forgetting the additional rate and taxing everything above £37,700 at 40%, which gives £52,460 — wrong by £1,243."),

  q("TXK-04-12", "TX-04", "B", "medium",
    "Which check should be run on a completed income tax computation?",
    [
      "That the liability exceeds the personal allowance",
      "That the income taxed at each rate sums to taxable income, and that no more than £37,700 was taxed at basic rate",
      "That savings income was taxed before non-savings",
      "That the nil rate bands were excluded from taxable income",
    ],
    1,
    "THE BAND CHECK. Almost every error in the computation — a nil rate band treated as an exemption, a column in the wrong order, a forgotten band extension — shows up as those two figures failing to agree. It takes seconds and is the difference between losing one mark and five."),
]

/* ── Chapter 5 · The adjustments ── */

const CH05: AccaQuestion[] = [
  q("TXK-05-01", "TX-05", "B", "medium",
    "How is higher rate relief for a gift aid donation given?",
    [
      "By deducting the gross donation from total income",
      "By extending the basic rate and additional rate limits by the GROSS donation",
      "By a tax reducer of 20% of the gross donation",
      "By deducting the net donation from total income",
    ],
    1,
    "BY EXTENDING THE BANDS BY THE GROSS AMOUNT. Basic rate relief has already been given at source — the charity reclaimed 20% — so extending the band delivers only the extra 20 or 25 points. Deducting it from income would give relief twice."),

  num("TXK-05-02", "TX-05", "B", "easy",
    "A taxpayer pays gift aid donations of £2,400 in the year. What is the gross amount used to extend the basic rate band, in £?",
    3000, "£", 1,
    "£2,400 × 100/80 = £3,000. The net amount paid never appears again — the gross figure both extends the bands and reduces adjusted net income."),

  num("TXK-05-03", "TX-05", "B", "hard",
    "Tomas has employment income of £70,000 and paid gift aid donations of £2,400. What is his income tax liability, in £?",
    14832, "£", 1,
    "Gross donation £3,000, so the basic rate limit becomes £40,700. Taxable income = £70,000 − £12,570 = £57,430. £40,700 at 20% = £8,140; the remaining £16,730 at 40% = £6,692. Total £14,832. Without the donation the liability would have been £15,432, so the £2,400 payment saved £600 — the 20-point difference on £3,000."),

  q("TXK-05-04", "TX-05", "B", "hard",
    "What TWO jobs does the gross gift aid figure do?",
    [
      "It extends the bands and is deducted from total income",
      "It extends the bands and reduces adjusted net income, restoring personal allowance above £100,000",
      "It reduces adjusted net income and gives a 20% tax reducer",
      "It extends the bands and reduces the savings nil rate band",
    ],
    1,
    "EXTENDS THE BANDS AND REDUCES ADJUSTED NET INCOME. The second job is the one candidates miss, and between £100,000 and £125,140 it is worth more than the first — because restoring allowance there gives relief at an effective 60%."),

  num("TXK-05-05", "TX-05", "B", "medium",
    "A spouse transfers the £1,260 transferable personal allowance. What is the recipient's tax reducer, in £?",
    252, "£", 1,
    "£1,260 × 20% = £252, deducted from the tax LIABILITY. The recipient's own allowance is unchanged — they get a fixed 20% credit, not £1,260 of allowance. The transferor loses the full £1,260."),

  q("TXK-05-06", "TX-05", "B", "medium",
    "What condition must be met for the transferable personal allowance to be claimed?",
    [
      "The transferor must have no income at all",
      "The couple must be married or civil partners and NEITHER may be a higher or additional rate taxpayer",
      "Both must be basic rate taxpayers with income under £20,000",
      "The transfer must be of the whole personal allowance",
    ],
    1,
    "MARRIED OR CIVIL PARTNERS, AND NEITHER A HIGHER OR ADDITIONAL RATE TAXPAYER. The amount transferred is a fixed £1,260 — it cannot be varied — and it only makes sense where the transferor cannot use it."),

  num("TXK-05-07", "TX-05", "B", "hard",
    "Ruth has adjusted net income of £68,400 and received child benefit of £2,100. What is the high income child benefit charge, in £?",
    882, "£", 1,
    "(£68,400 − £60,000)/£200 = 42 steps, so 42%. £2,100 × 42% = £882, ADDED to her income tax liability. Round the percentage down to a whole number, and then the charge down to a whole pound."),

  q("TXK-05-08", "TX-05", "B", "medium",
    "At what adjusted net income does the child benefit charge equal the whole of the benefit received?",
    ["£60,000", "£70,000", "£80,000", "£100,000"],
    2,
    "£80,000. The charge is 1% of the benefit for every £200 above £60,000, and £20,000/£200 = 100 steps = 100%. Above £80,000 the charge simply equals the benefit, which is why a claimant may elect not to receive it."),

  q("TXK-05-09", "TX-05", "B", "medium",
    "How is income from an asset held jointly by spouses taxed?",
    [
      "In the actual ownership proportions",
      "50:50 by default, whatever the actual ownership, unless they jointly elect for the actual proportions",
      "Entirely on the higher earner",
      "Entirely on the legal owner",
    ],
    1,
    "50:50 BY DEFAULT. So a 90:10 transfer without an election achieves only a 50:50 split for income tax. The election is available where they genuinely own it unequally, and it must be made jointly."),

  q("TXK-05-10", "TX-05", "B", "hard",
    "Which of these does NOT reduce adjusted net income?",
    [
      "A gross gift aid donation",
      "A gross personal pension contribution",
      "The residential property finance cost tax reducer",
      "A trading loss relieved against total income",
    ],
    2,
    "THE FINANCE COST TAX REDUCER. It comes off the LIABILITY, not off income, so it cannot restore personal allowance or reduce the child benefit charge. That is a genuine disadvantage of the restriction compared with a pension contribution of the same amount."),

  q("TXK-05-11", "TX-05", "B", "medium",
    "Why does a basic rate taxpayer get no further relief for a gift aid donation?",
    [
      "Because gift aid is only available to higher rate taxpayers",
      "Because they have already had basic rate relief at source, and extending the band only delivers the difference between rates",
      "Because the donation is deducted from their income instead",
      "Because the charity keeps the relief",
    ],
    1,
    "BASIC RATE RELIEF WAS ALREADY GIVEN AT SOURCE. The donor paid net and the charity reclaimed the 20%, so extending the basic rate band produces no further benefit where all the income is already within it. That is the correct outcome, not an oversight."),

  q("TXK-05-12", "TX-05", "B", "hard",
    "A taxpayer with adjusted net income of £124,000 makes a gross pension contribution of £5,000. What are the TWO effects?",
    [
      "The bands extend by £5,000 and £5,000 is deducted from income",
      "The bands extend by £5,000 and adjusted net income falls to £119,000, restoring £2,500 of personal allowance",
      "Only the bands extend, since the allowance is already nil",
      "Only adjusted net income falls, since a pension does not extend the bands",
    ],
    1,
    "BANDS EXTEND AND £2,500 OF ALLOWANCE IS RESTORED. Adjusted net income falls from £124,000 to £119,000, and the abatement falls by half the reduction — so £2,500 of allowance returns. At 40% that is £1,000, on top of the £1,000 the band extension delivers."),
]

/* ── Chapter 6 · Property income ── */

const CH06: AccaQuestion[] = [
  q("TXK-06-01", "TX-06", "B", "medium",
    "On what basis is an individual's property income computed in a TX question?",
    [
      "The accruals basis, unless the question says otherwise",
      "The CASH basis, unless the question specifically says otherwise",
      "Whichever basis gives the lower profit",
      "The accruals basis for residential property and cash for commercial",
    ],
    1,
    "THE CASH BASIS. The examining team has stated this directly for individuals and partnerships. So the computation is rent RECEIVED less expenses PAID, and irrecoverable rent needs no treatment at all because it was never received."),

  num("TXK-06-02", "TX-06", "B", "medium",
    "Rent received in 2025/26 was £24,800. Repairs paid were £3,100, insurance £940 and letting agent's fees £1,488. What is the property business profit, in £?",
    19272, "£", 1,
    "£24,800 − £3,100 − £940 − £1,488 = £19,272 on the cash basis. All three expenses are allowable revenue costs actually paid in the year."),

  q("TXK-06-03", "TX-06", "B", "hard",
    "How is interest on a loan to buy a RESIDENTIAL letting property relieved?",
    [
      "Deducted in full from property income",
      "Not deducted from income at all — relief is a tax reducer of 20% of the finance cost against the liability",
      "Deducted from total income as a relief",
      "Deducted at the landlord's marginal rate",
    ],
    1,
    "A 20% TAX REDUCER AGAINST THE LIABILITY. So a higher rate landlord gets 20% relief rather than 40%. And because it does not reduce income, it does not reduce adjusted net income either — no help with the personal allowance abatement."),

  num("TXK-06-04", "TX-06", "B", "medium",
    "A landlord paid £11,400 of mortgage interest on a residential letting property. What tax reducer arises, in £?",
    2280, "£", 1,
    "£11,400 × 20% = £2,280, deducted from the income tax liability. The £11,400 itself appears nowhere in the property income computation."),

  num("TXK-06-05", "TX-06", "B", "hard",
    "A 25-year lease is granted for a premium of £90,000. How much is assessable as property income, in £?",
    46800, "£", 1,
    "P − (2% × (n − 1) × P) = £90,000 − (2% × 24 × £90,000) = £90,000 − £43,200 = £46,800. Note (n − 1), so 24 not 25 — using n gives £45,000 and is the standard error. The remaining £43,200 is a capital receipt for chargeable gains."),

  num("TXK-06-06", "TX-06", "B", "medium",
    "A 40-year lease is granted for a premium of £150,000. How much is assessable as property income, in £?",
    33000, "£", 1,
    "£150,000 − (2% × 39 × £150,000) = £150,000 − £117,000 = £33,000. Sanity check the direction: the LONGER the lease, the SMALLER the income element, because a long lease is closer in substance to selling the property outright."),

  q("TXK-06-07", "TX-06", "B", "medium",
    "A lease of 55 years is granted for a premium. How much is property income?",
    [
      "The whole premium",
      "Nil — a lease of more than 50 years is a long lease, so the whole premium is capital",
      "P − (2% × 54 × P)",
      "Half the premium",
    ],
    1,
    "NIL. A SHORT lease is 50 years or less. Above that it is a long lease and the entire premium is a capital receipt dealt with under chargeable gains, with no property income element at all."),

  num("TXK-06-08", "TX-06", "B", "medium",
    "Gross rents from letting a room in the taxpayer's own home are £11,200 and actual expenses £2,600. What is the assessable amount under the EXCESS basis, in £?",
    3700, "£", 1,
    "£11,200 − £7,500 = £3,700, with NO expenses deductible. The normal basis would give £11,200 − £2,600 = £8,600, so the excess basis is much better here — compute both and choose, since the excess basis wins whenever expenses are below £7,500."),

  q("TXK-06-09", "TX-06", "B", "medium",
    "Which of these is a deductible repair rather than a non-deductible improvement?",
    [
      "Adding a conservatory",
      "Replacing single-glazed windows with double glazing, as the modern equivalent",
      "Converting a loft into a bedroom",
      "Installing central heating where there was none",
    ],
    1,
    "REPLACING SINGLE GLAZING WITH DOUBLE GLAZING. Replacing something with its modern equivalent is a repair, even though the result is better than the original. The other three all add something that was not there, making them capital improvements."),

  q("TXK-06-10", "TX-06", "B", "hard",
    "How is a property business loss relieved?",
    [
      "Against total income of the year or the previous year",
      "Carried forward automatically against the first available future profits of the same property business",
      "Carried back 12 months against property income",
      "Against chargeable gains",
    ],
    1,
    "CARRIED FORWARD AUTOMATICALLY, against future profits of the same property business only. There is no claim to make, no time limit, no carry back and no relief against general income — a real difference from a trading loss."),

  multi("TXK-06-11", "TX-06", "B", "medium",
    "Which of these are allowable expenses of a property business? Select TWO.",
    [
      "The capital cost of an extension",
      "Council tax paid by the landlord",
      "Mortgage interest on a residential letting",
      "Letting agent's management fees",
    ],
    [1, 3],
    "COUNCIL TAX BORNE BY THE LANDLORD and AGENT'S FEES. The extension is capital, and residential mortgage interest is not an expense at all — it gives a 20% tax reducer instead."),

  q("TXK-06-12", "TX-06", "B", "hard",
    "Two properties are let, one making a profit and one a loss. How are they treated?",
    [
      "Separately, with the loss carried forward against that property only",
      "As ONE property business, so the loss is automatically netted against the profit",
      "The loss is relieved against total income",
      "Each property is a separate business requiring its own claim",
    ],
    1,
    "AS ONE PROPERTY BUSINESS. All of a landlord's UK properties are aggregated, so a loss on one is netted against a profit on another within the year without any claim. Only a net loss on the business as a whole carries forward."),
]

export const TX_KIT_AREA_B_PART1: AccaQuestion[] = [...CH04, ...CH05, ...CH06]
