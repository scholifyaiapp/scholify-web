import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-tx-kit-builders"

/*
 * TX-UK · Areas E, F and G question kit — chapters 21 to 29, completing the kit.
 *
 * Corporation tax (five chapters), VAT (three) and employability (one).
 *
 * The corporation tax questions turn repeatedly on the distinction that decides most of
 * Area E: TAXABLE TOTAL PROFITS is what gets taxed, AUGMENTED PROFITS decides the rate and
 * the payment method, and they are different numbers. Several questions give a company with
 * dividends specifically so that the two diverge.
 *
 * Nothing here applies an excluded topic: no very-large-company instalments, no franked
 * investment income, no capital goods or second-hand goods scheme, no retailers' scheme, and
 * no detailed company pooling provisions.
 *
 * Authored, applied, exam-standard at TX's uniform 2 marks, on the FA2025 basis.
 */

/* ── Chapter 21 · Taxable total profits ── */

const CH21: AccaQuestion[] = [
  num("TXK-21-01", "TX-21", "E", "medium",
    "A company has a trading profit of £380,000, property income of £42,000, interest receivable of £18,000, a chargeable gain of £64,000 and paid qualifying charitable donations of £12,000. What are its taxable total profits, in £?",
    492000, "£", 1,
    "£380,000 + £42,000 + £18,000 + £64,000 = £504,000 of total profits, less £12,000 of QCDs = £492,000. The chargeable gain enters the same computation as the income — a company pays no capital gains tax."),

  num("TXK-21-02", "TX-21", "E", "hard",
    "The same company also received £28,000 of dividends from a company in which it holds 9%. What are its augmented profits, in £?",
    520000, "£", 1,
    "£492,000 + £28,000 = £520,000. The dividends are EXEMPT so they never enter TTP, but non-group dividends are added to TTP to give augmented profits — the figure that decides the rate and whether quarterly instalments apply."),

  q("TXK-21-03", "TX-21", "E", "hard",
    "How are dividends received by a company treated?",
    [
      "Included in taxable total profits and taxed at the corporation tax rate",
      "Exempt and excluded from TTP, but added to it to give augmented profits for the rate test",
      "Taxed at 8.75%",
      "Deducted from total profits like a charitable donation",
    ],
    1,
    "EXEMPT, BUT COUNTED FOR THE RATE. They are never taxed in the recipient company, yet non-group dividends still raise augmented profits — so a company can pay more corporation tax because of income that is itself untaxed."),

  q("TXK-21-04", "TX-21", "E", "medium",
    "How does a company's charitable donation differ from an individual's gift aid?",
    [
      "There is no difference",
      "A company pays it GROSS and deducts it from total profits; an individual pays net and extends the basic rate band",
      "A company pays it net and deducts it",
      "A company gets a 20% tax reducer",
    ],
    1,
    "GROSS AND DEDUCTED, RATHER THAN NET AND BAND-EXTENDING. So a company gets relief at its own marginal rate directly. Note a donation allowable as a TRADING expense — a small local one with a trade benefit — is deducted in arriving at trading profit instead, not in the QCD line."),

  q("TXK-21-05", "TX-21", "E", "hard",
    "A company's total profits are £9,000 and its qualifying charitable donations are £16,000. What is the position?",
    [
      "TTP is a loss of £7,000, which can be carried forward",
      "TTP is nil and £7,000 of QCDs is WASTED — QCDs cannot create or increase a loss",
      "The excess QCDs carry forward to the next period",
      "QCDs are restricted to 25% of total profits",
    ],
    1,
    "NIL TTP AND £7,000 WASTED. QCDs cannot create or increase a loss, and any excess is lost entirely — it cannot be carried forward, carried back or surrendered as group relief. That waste is a real cost to weigh when choosing a loss relief."),

  q("TXK-21-06", "TX-21", "E", "medium",
    "On what basis is a company's property income computed?",
    [
      "The cash basis, as for an individual",
      "The ACCRUALS basis, with finance costs deductible in full",
      "The cash basis, but with finance costs restricted to a 20% reducer",
      "Whichever basis the company elects",
    ],
    1,
    "ACCRUALS, WITH FULL INTEREST RELIEF. Both differ from an individual, who uses the cash basis by default and gets only a 20% tax reducer for residential finance costs. A company's interest goes through the loan relationship rules and is fully deductible."),

  q("TXK-21-07", "TX-21", "E", "medium",
    "How long can a company's accounting period be?",
    [
      "Up to 18 months, matching a long period of account",
      "Never more than 12 months, so a longer period of account is SPLIT",
      "Exactly 12 months always",
      "Whatever period the company chooses",
    ],
    1,
    "NEVER MORE THAN 12 MONTHS. An 18-month period of account becomes a 12-month accounting period and a 6-month one, each taxed separately with its own limits apportioned. That splitting is a common exam requirement."),

  q("TXK-21-08", "TX-21", "E", "medium",
    "When is a company UK resident?",
    [
      "Only if incorporated in the UK",
      "If incorporated in the UK, OR incorporated abroad but centrally managed and controlled from the UK",
      "If it has a UK bank account",
      "If more than half its shareholders are UK resident",
    ],
    1,
    "INCORPORATION OR CENTRAL MANAGEMENT AND CONTROL. Either test makes a company UK resident, and a UK resident company is chargeable on its WORLDWIDE profits."),

  q("TXK-21-09", "TX-21", "E", "medium",
    "How is pre-trading expenditure treated?",
    [
      "It is never allowable",
      "Expenditure in the 7 years before trading begins is treated as incurred on the FIRST DAY of trading, if it would otherwise have been allowable",
      "It is allowable only in the year incurred",
      "It is spread over five years",
    ],
    1,
    "TREATED AS INCURRED ON DAY ONE OF TRADING, looking back seven years. The expenditure must be of a kind that would have been allowable had the trade already started — so pre-trading rent and salaries qualify, but entertaining customers still does not."),

  multi("TXK-21-10", "TX-21", "E", "medium",
    "Which of these differ between a company and an individual? Select TWO.",
    [
      "The treatment of depreciation in the trading profit adjustment",
      "The treatment of interest on late-paid tax",
      "Whether entertaining customers is allowable",
      "The basis on which property income is computed",
    ],
    [1, 3],
    "INTEREST ON LATE TAX and the PROPERTY INCOME BASIS. Interest on tax is a loan relationship debit for a company and simply not deductible for an individual; property income is accruals for a company and cash for an individual. Depreciation is added back and customer entertaining disallowed for both."),
]

/* ── Chapter 22 · The liability and marginal relief ── */

const CH22: AccaQuestion[] = [
  num("TXK-22-01", "TX-22", "E", "hard",
    "A company has taxable total profits of £210,000 and received £30,000 of non-group dividends. What is its marginal relief, in £?",
    131.25, "£", 0.02,
    "Augmented profits = £240,000. Marginal relief = (£250,000 − £240,000) × 3/200 × £210,000/£240,000 = £10,000 × 0.015 × 0.875 = £131.25. The bracket uses AUGMENTED profits and the fraction scales the relief for the exempt dividend element."),

  num("TXK-22-02", "TX-22", "E", "hard",
    "The same company's corporation tax liability is what, in £?",
    52368.75, "£", 0.02,
    "Tax is charged on TTP, not augmented profits: £210,000 × 25% = £52,500, less marginal relief of £131.25 = £52,368.75. Without the dividends the relief would have been £600 and the liability £51,900 — so £30,000 of exempt income cost £468.75 of tax."),

  q("TXK-22-03", "TX-22", "E", "medium",
    "Which figure is tested against the £50,000 and £250,000 limits?",
    ["Taxable total profits", "AUGMENTED profits", "Total profits before QCDs", "Trading profit only"],
    1,
    "AUGMENTED PROFITS — TTP plus non-group dividends received. TTP is what gets taxed; augmented profits decides at what rate. Testing the limits against TTP understates the rate wherever dividends are significant."),

  q("TXK-22-04", "TX-22", "E", "medium",
    "What are the corporation tax rates and limits for FY2025?",
    [
      "19% up to £50,000, 25% from £250,000, standard fraction 3/200",
      "20% up to £50,000, 24% from £250,000, standard fraction 1/100",
      "19% up to £250,000, 25% above, no marginal relief",
      "25% on all profits",
    ],
    0,
    "19% AND 25%, WITH LIMITS OF £50,000 AND £250,000 AND A 3/200 FRACTION. They are identical for FY2023, FY2024 and FY2025, which means a period straddling 1 April needs no apportionment between financial years — a useful simplification."),

  num("TXK-22-05", "TX-22", "E", "medium",
    "A company has ONE associated company. What is its lower limit, in £?",
    25000, "£", 1,
    "£50,000/2 = £25,000. Both limits are divided by the number of associated companies INCLUDING the company itself, so one associate means dividing by two. The upper limit becomes £125,000."),

  num("TXK-22-06", "TX-22", "E", "hard",
    "A company with no associates has a 9-month accounting period. What is its UPPER limit, in £?",
    187500, "£", 1,
    "£250,000 × 9/12 = £187,500. Only the LIMITS are time-apportioned for a short period — the rates themselves never are. With one associate as well, the limit would be £250,000 × ½ × 9/12 = £93,750."),

  q("TXK-22-07", "TX-22", "E", "hard",
    "An 18-month period of account is split, and a chargeable gain arose in month 15. How is the gain allocated?",
    [
      "Time-apportioned between the two accounting periods",
      "Entirely to the accounting period containing the DISPOSAL — the second period",
      "Entirely to the first period",
      "Split equally",
    ],
    1,
    "ENTIRELY TO THE PERIOD OF DISPOSAL. Income accruing evenly is time-apportioned, but a gain is a one-off event allocated to the period in which it occurred. This is the step candidates most often get wrong on a split period."),

  q("TXK-22-08", "TX-22", "E", "medium",
    "Which companies are IGNORED in counting associated companies?",
    [
      "Overseas companies",
      "DORMANT companies, and passive investments not under common control",
      "Companies with losses",
      "Wholly owned subsidiaries",
    ],
    1,
    "DORMANT COMPANIES AND PASSIVE INVESTMENTS. Overseas associated companies DO count, even though they are not themselves within the UK charge — which is a point worth checking in a group scenario."),

  q("TXK-22-09", "TX-22", "E", "hard",
    "Why can receiving exempt dividends increase a company's corporation tax?",
    [
      "The dividends are taxed at 8.75%",
      "They raise augmented profits, which reduces marginal relief even though the dividends are never taxed",
      "They are added to trading profit",
      "They trigger a higher rate of tax on all profits",
    ],
    1,
    "THEY REDUCE MARGINAL RELIEF. Augmented profits move closer to the £250,000 upper limit, shrinking the relief, while the dividends themselves bear no tax. It is a genuinely counter-intuitive result and a reliable exam point."),

  num("TXK-22-10", "TX-22", "E", "medium",
    "A company's augmented profits are £46,000 and its TTP is £46,000, with no associates. What is its corporation tax, in £?",
    8740, "£", 1,
    "£46,000 is below the £50,000 lower limit, so the small profits rate of 19% applies with no marginal relief: £46,000 × 19% = £8,740."),
]

/* ── Chapter 23 · Chargeable gains for companies ── */

const CH23: AccaQuestion[] = [
  num("TXK-23-01", "TX-23", "E", "hard",
    "A company bought a building for £320,000 and sold it for £740,000. The indexation factor is 0.256. What is the chargeable gain, in £?",
    338080, "£", 1,
    "Unindexed gain £740,000 − £320,000 = £420,000. Indexation allowance = £320,000 × 0.256 = £81,920. Chargeable gain = £420,000 − £81,920 = £338,080. There is no annual exempt amount for a company."),

  q("TXK-23-02", "TX-23", "E", "medium",
    "To what date does indexation allowance run?",
    [
      "The date of disposal",
      "The EARLIER of disposal and DECEMBER 2017, when indexation was frozen",
      "The start of the accounting period",
      "April 1998",
    ],
    1,
    "THE EARLIER OF DISPOSAL AND DECEMBER 2017. Indexation was frozen then, so the years since attract no further allowance. The factor is always GIVEN — calculating it from RPI figures is an excluded topic."),

  q("TXK-23-03", "TX-23", "E", "hard",
    "A company's unindexed gain is £12,000 and its indexation allowance would be £19,400. What is the chargeable gain?",
    [
      "A loss of £7,400",
      "Nil — indexation cannot create or increase a loss, so it is restricted to £12,000",
      "£12,000, with no indexation available",
      "£19,400",
    ],
    1,
    "NIL. Indexation can reduce a gain to nil at most. And where the disposal produces an unindexed LOSS to begin with, no indexation is available at all — so a £320,000 asset sold for £300,000 gives a £20,000 loss and nothing more."),

  q("TXK-23-04", "TX-23", "E", "hard",
    "State the share matching rules for a COMPANY, in order.",
    [
      "Same day, then the following 30 days, then the pool",
      "Same day, then the PREVIOUS NINE days, then the pool",
      "The pool only",
      "Same day, then the previous 30 days, then the pool",
    ],
    1,
    "SAME DAY, THEN THE PREVIOUS NINE DAYS, THEN THE POOL. A company looks BACK nine days where an individual looks FORWARD thirty. Applying the individual's rule to a company is a routine and entirely avoidable error."),

  q("TXK-23-05", "TX-23", "E", "medium",
    "Can a company claim business asset disposal relief?",
    [
      "Yes, on up to £1,000,000 of gains",
      "No — BADR and the annual exempt amount are available to INDIVIDUALS only",
      "Yes, but at 24%",
      "Only on a disposal of its whole trade",
    ],
    1,
    "NO. Both BADR and the annual exempt amount are for individuals. A company's gain simply joins taxable total profits and is taxed at the corporation tax rate."),

  q("TXK-23-06", "TX-23", "E", "medium",
    "How may a company's capital loss be relieved?",
    [
      "Against total profits of the current period",
      "Against chargeable GAINS only — current period then carried forward indefinitely; never carried back",
      "Carried back 12 months against gains",
      "Surrendered as group relief",
    ],
    1,
    "AGAINST GAINS ONLY. Never against income or total profits, never carried back, and never surrendered as group relief. The asymmetry is worth remembering: a TRADING loss can absorb gains, but a capital loss cannot absorb income."),

  q("TXK-23-07", "TX-23", "E", "hard",
    "A gain is rolled over into a DEPRECIATING asset, such as a lease with under 60 years to run. What happens?",
    [
      "The gain is rolled over permanently",
      "It is HELD OVER, crystallising on the earlier of disposal of the replacement, it ceasing to be used in the trade, and 10 years",
      "No relief is available",
      "The gain is exempt",
    ],
    1,
    "HELD OVER FOR UP TO TEN YEARS. Because the replacement will itself waste away, the gain is not permanently rolled into its cost — it resurfaces on the earliest of those three events."),

  q("TXK-23-08", "TX-23", "E", "medium",
    "Which assets qualify for rollover relief?",
    [
      "Any asset used in the business, including shares",
      "Land and buildings, and FIXED plant and machinery, used in the trade",
      "Only land and buildings",
      "Any asset held for more than two years",
    ],
    1,
    "LAND AND BUILDINGS, AND FIXED PLANT AND MACHINERY, used in the trade. Not shares, and not assets held as investments. Rollover relief is also available on a GROUP basis for a 75% gains group."),
]

/* ── Chapter 24 · Losses for companies ── */

const CH24: AccaQuestion[] = [
  q("TXK-24-01", "TX-24", "E", "hard",
    "Against what is a company's trading loss relieved in the current period?",
    [
      "Trading profits only",
      "TOTAL PROFITS before QCDs, and the claim is all or nothing",
      "Total profits after QCDs",
      "Chargeable gains only",
    ],
    1,
    "TOTAL PROFITS BEFORE QCDs, ALL OR NOTHING. So the loss can absorb property income, interest and chargeable gains — a wider target than an individual's carry forward, which is confined to profits of the same trade."),

  q("TXK-24-02", "TX-24", "E", "hard",
    "How far back may a company carry a trading loss, and on what basis?",
    [
      "One tax year, FIFO",
      "12 MONTHS, on a LIFO basis, against total profits before QCDs",
      "36 months in all cases",
      "Three years, FIFO",
    ],
    1,
    "12 MONTHS, LIFO. Where the previous 12 months spans two accounting periods, relieve the later one first and apportion the earlier where necessary. Terminal loss relief extends it to 36 months where the trade ceases."),

  q("TXK-24-03", "TX-24", "E", "medium",
    "Can a company carry a loss back without making a current period claim first?",
    [
      "Yes, the claims are independent",
      "No — a current period claim is required first, and it cannot be restricted",
      "Yes, where the loss exceeds £100,000",
      "Only where the trade has ceased",
    ],
    1,
    "NO, THE SEQUENCE IS FIXED. So a company cannot preserve the current period's profits and QCDs to carry the whole loss back. Any waste of current period QCDs is unavoidable if a carry back is wanted."),

  num("TXK-24-04", "TX-24", "E", "medium",
    "A company's total profits for the loss period are £9,000 before QCDs of £5,000, and it makes a current period claim. How much QCD relief is wasted, in £?",
    5000, "£", 1,
    "All £5,000. The claim reduces total profits to nil, and QCDs cannot create or increase a loss — so the whole amount is lost. It cannot be carried forward, carried back or surrendered."),

  q("TXK-24-05", "TX-24", "E", "hard",
    "How is a company's PROPERTY business loss relieved in the current period?",
    [
      "By optional claim against total profits",
      "COMPULSORILY against total profits, before any trading loss, with no claim required",
      "Against property income only",
      "It must be carried forward",
    ],
    1,
    "COMPULSORILY AND FIRST. There is no claim and no choice, and property losses are set off BEFORE trading losses. So the compulsory relief may itself waste QCDs before any trading loss decision is reached — and there is no carry back at all."),

  q("TXK-24-06", "TX-24", "E", "medium",
    "Which loss claims may be PARTIAL?",
    [
      "All of them",
      "Claims for losses brought FORWARD, but not current period claims",
      "Current period claims only",
      "None",
    ],
    1,
    "BROUGHT FORWARD CLAIMS ONLY. A current period claim is all or nothing, but a company may restrict a brought-forward claim to preserve its QCDs in that year — which is a genuine advantage of carrying forward."),

  q("TXK-24-07", "TX-24", "E", "medium",
    "How long is the carry back for a TERMINAL loss?",
    ["12 months", "24 months", "36 months", "Indefinitely"],
    2,
    "36 MONTHS, on a LIFO basis, available only where the trade ceases. It runs against total profits before QCDs, like the ordinary carry back."),

  q("TXK-24-08", "TX-24", "E", "hard",
    "A question asks for the loss relief options and their tax savings. Which three should be considered?",
    [
      "Only carry forward and carry back",
      "Carry forward only; current period then carry forward; current period, then carry back, then carry forward",
      "Group relief, carry forward and terminal relief",
      "Whichever single option relieves the most loss",
    ],
    1,
    "THOSE THREE. For each, identify the tax saved, the QCDs wasted and the cash flow effect — those three together are the answer to \"which should the company choose\". Watch the marginal relief interaction too: the tax saved per pound of loss is not constant."),

  q("TXK-24-09", "TX-24", "E", "medium",
    "Within what period must a claim to carry a loss back be made?",
    [
      "12 months of the end of the loss period",
      "2 years of the end of the loss-making accounting period",
      "4 years of the end of the loss period",
      "There is no time limit",
    ],
    1,
    "TWO YEARS of the end of the loss-making accounting period. The carry back claim is optional, unlike the current period claim that must precede it."),

  q("TXK-24-10", "TX-24", "E", "hard",
    "Which is the correct order of set-off where a company has both a property loss and a trading loss?",
    [
      "Trading loss first",
      "PROPERTY loss first, being compulsory, then the trading loss",
      "Whichever the company elects",
      "Pro rata",
    ],
    1,
    "PROPERTY LOSS FIRST. Its relief is compulsory and automatic, so it happens before any decision is made about the trading loss — and it may already have absorbed the profits the trading loss claim would have targeted."),
]

/* ── Chapter 25 · Groups ── */

const CH25: AccaQuestion[] = [
  q("TXK-25-01", "TX-25", "E", "hard",
    "A owns 75% of B, and B owns 75% of C. Which group includes C?",
    [
      "Both the group relief group and the gains group",
      "The GAINS group only — each link is 75% and the 56.25% effective interest exceeds 50%, but it falls short of the 75% effective interest group relief requires",
      "The group relief group only",
      "Neither",
    ],
    1,
    "THE GAINS GROUP ONLY. A's effective interest in C is 75% × 75% = 56.25%. A gains group needs 75% at each link and over 50% effective, both met. A group relief group needs 75% EFFECTIVE, which 56.25% fails. This is the classic test of the difference."),

  num("TXK-25-02", "TX-25", "E", "hard",
    "A subsidiary has a trading loss of £140,000 for its year ended 30 September 2026. The parent has TTP of £96,000 for its year ended 31 March 2026. How much group relief is available, in £?",
    48000, "£", 1,
    "The overlap is 1 October 2025 to 31 March 2026 — six months. Restrict BOTH: the loss to £140,000 × 6/12 = £70,000, and the parent's TTP to £96,000 × 6/12 = £48,000. Relief is the LOWER of the two, so £48,000."),

  q("TXK-25-03", "TX-25", "E", "medium",
    "Which relationship divides the £50,000 and £250,000 rate limits?",
    ["75% group relief group", "51% associated companies", "75% gains group", "Any shareholding over 25%"],
    1,
    "51% ASSOCIATED COMPANIES. Three relationships do three jobs: 51% for the rate limits and the instalment threshold, 75% effective for group relief, and 75% per link with over 50% effective for a gains group. Confusing them is the whole difficulty of the chapter."),

  q("TXK-25-04", "TX-25", "E", "medium",
    "What may be surrendered as group relief?",
    [
      "Capital losses only",
      "Current period trading losses, excess property losses and excess QCDs — but NOT capital losses",
      "Any loss of any period",
      "Only trading losses of the current period",
    ],
    1,
    "TRADING LOSSES, EXCESS PROPERTY LOSSES AND EXCESS QCDs — and brought forward trading losses too. A CAPITAL loss can never be surrendered, though a gains group can achieve the same result by transferring the asset before sale."),

  q("TXK-25-05", "TX-25", "E", "hard",
    "How does a gains group work round the rule that capital losses cannot be surrendered?",
    [
      "By electing to treat the loss as a trading loss",
      "By transferring the asset at no gain, no loss to the company holding the losses before selling it outside the group",
      "By claiming rollover relief",
      "It cannot be worked round",
    ],
    1,
    "TRANSFER THE ASSET FIRST. Intra-group transfers are automatically at no gain, no loss, so the asset can be moved tax-free into whichever company has the capital losses, and the gain on the eventual external sale then meets them."),

  q("TXK-25-06", "TX-25", "E", "medium",
    "Is a claim required for an intra-group asset transfer to be at no gain, no loss?",
    [
      "Yes, a joint claim within two years",
      "No — it is automatic and MANDATORY",
      "Yes, by the transferring company only",
      "Only where the asset is land",
    ],
    1,
    "AUTOMATIC AND MANDATORY. No claim is needed and the treatment cannot be disapplied. The transfer is at cost plus indexation to the transfer date or December 2017 if earlier, and that figure becomes the acquiring company's cost."),

  q("TXK-25-07", "TX-25", "E", "medium",
    "Are OVERSEAS companies counted in determining associated companies for the rate limits?",
    [
      "No, only UK companies count",
      "Yes — overseas associated companies count, even though they are not themselves within the UK charge",
      "Only if they have UK income",
      "Only if they are 75% subsidiaries",
    ],
    1,
    "YES, THEY COUNT. Only dormant companies and passive investments not under common control are ignored. Missing an overseas associate understates the divisor and so overstates the limits."),

  q("TXK-25-08", "TX-25", "E", "hard",
    "May a group relief claim be for a partial amount?",
    [
      "No, it is all or nothing",
      "Yes — group relief is optional and may be claimed for any amount up to the lower of the loss and the claimant's TTP",
      "Yes, but only in multiples of £10,000",
      "Only where the periods are coterminous",
    ],
    1,
    "YES, ANY AMOUNT. That flexibility is group relief's main advantage over the surrendering company's own current period claim, which is all or nothing. The claim must be made within two years of the end of the claimant's accounting period."),

  q("TXK-25-09", "TX-25", "E", "medium",
    "What is the effective interest test for a chargeable gains group?",
    [
      "75% at every link and 75% effective",
      "75% at each link, and the parent's effective interest must EXCEED 50% in every group company",
      "Over 50% at each link",
      "51% effective",
    ],
    1,
    "75% PER LINK AND OVER 50% EFFECTIVE. That is why a 75%–75% chain gives a gains group but not a group relief group. Note a company that is itself a 75% subsidiary cannot head a separate gains group, so each company belongs to only one."),

  q("TXK-25-10", "TX-25", "E", "hard",
    "How should a group question be approached?",
    [
      "Identify the largest shareholding and work from there",
      "Draw the structure with percentages, then work out the 51% associates, the 75% group relief group and the 75% gains group SEPARATELY",
      "Assume all companies are in all three groups",
      "Apply the 75% test to everything",
    ],
    1,
    "DRAW IT, THEN WORK OUT ALL THREE SETS SEPARATELY. A question giving a 75%–75% chain is almost certainly testing that the sub-subsidiary is in the gains group but not the group relief group, and identifying that is where the marks are."),
]

/* ── Chapter 26 · VAT scope and registration ── */

const CH26: AccaQuestion[] = [
  q("TXK-26-01", "TX-26", "F", "hard",
    "Why is a zero-rated trader in a better position than an exempt one?",
    [
      "Zero-rated traders charge more output VAT",
      "A zero-rated supply is TAXABLE at 0%, so input VAT is fully recoverable and the turnover counts for registration; an exempt supply is outside the charge, so input VAT is lost",
      "Exempt traders pay VAT at 5%",
      "There is no practical difference",
    ],
    1,
    "ZERO-RATED IS TAXABLE AT 0%, SO INPUT VAT IS RECOVERED. The trader charges nothing and reclaims everything, usually producing a repayment. An exempt trader is outside the system entirely, so the VAT on its costs is a real cost."),

  num("TXK-26-02", "TX-26", "F", "easy",
    "What is the VAT registration threshold for 2025/26, in £?",
    90000, "£", 1,
    "£90,000 of taxable turnover. The deregistration limit is £88,000. Taxable turnover includes standard, reduced and ZERO-rated supplies, but excludes exempt supplies and sales of capital assets."),

  q("TXK-26-03", "TX-26", "F", "hard",
    "Cumulative taxable turnover first exceeds £90,000 at the end of October 2025. When must the trader notify HMRC, and from when is it registered?",
    [
      "Notify by 30 November 2025, registered from 1 November 2025",
      "Notify by 30 November 2025, registered from 1 December 2025",
      "Notify by 31 October 2025, registered from 1 November 2025",
      "Notify by 1 December 2025, registered from 1 January 2026",
    ],
    1,
    "NOTIFY BY 30 NOVEMBER, REGISTERED FROM 1 DECEMBER. Notification is within 30 days of the end of the month the limit was exceeded, and registration takes effect from the first day of the SECOND month after that month."),

  q("TXK-26-04", "TX-26", "F", "hard",
    "Under the FUTURE PROSPECTS test, from when is a trader registered?",
    [
      "The first day of the second month after the 30-day period",
      "The START of the 30-day period in which turnover is expected to exceed £90,000",
      "The end of the 30-day period",
      "The date HMRC processes the application",
    ],
    1,
    "THE START OF THE 30-DAY PERIOD, with notification before it ends. So registration is effectively immediate — quite unlike the historic test, which gives up to two months of grace from the same threshold."),

  q("TXK-26-05", "TX-26", "F", "medium",
    "Do zero-rated supplies count towards the registration threshold?",
    [
      "No, only standard-rated supplies count",
      "YES — taxable turnover includes standard, reduced and zero-rated supplies",
      "Only half their value counts",
      "Only if they exceed £30,000",
    ],
    1,
    "YES, THEY COUNT. Only exempt supplies and sales of capital assets are excluded. So a wholly zero-rated business can be required to register even though it will never pay any net VAT — and it will usually want to, to recover its input tax."),

  q("TXK-26-06", "TX-26", "F", "medium",
    "When is input VAT on a car recoverable?",
    [
      "Always",
      "Only where the car is used WHOLLY for business, which in practice means a pool car with no private use",
      "To the extent of the business proportion",
      "Never, in any circumstances",
    ],
    1,
    "ONLY WHERE THERE IS NO PRIVATE USE AT ALL. Any private use blocks the whole claim — it is not apportioned. VAT on a VAN or a lorry, by contrast, is recoverable."),

  multi("TXK-26-07", "TX-26", "F", "medium",
    "On which is input VAT IRRECOVERABLE? Select TWO.",
    [
      "Entertaining staff",
      "Entertaining UK customers",
      "A van used in the business",
      "A car with some private use",
    ],
    [1, 3],
    "UK CUSTOMER ENTERTAINING and A CAR WITH PRIVATE USE. Staff entertaining IS recoverable, and so is entertaining OVERSEAS customers. A van is recoverable regardless of private use."),

  q("TXK-26-08", "TX-26", "F", "medium",
    "How far back may pre-registration input VAT be recovered?",
    [
      "6 months for both goods and services",
      "4 years for GOODS still held and used in the business, and 6 months for SERVICES",
      "4 years for both",
      "It cannot be recovered at all",
    ],
    1,
    "FOUR YEARS FOR GOODS, SIX MONTHS FOR SERVICES. The goods must still be held at registration and used in the business — so stock sold before registration does not qualify."),

  q("TXK-26-09", "TX-26", "F", "hard",
    "What is the main DISADVANTAGE of a VAT group registration?",
    [
      "Supplies between members become taxable",
      "Every member is JOINTLY AND SEVERALLY liable for the whole group's VAT",
      "Only one member may recover input tax",
      "The registration threshold is halved",
    ],
    1,
    "JOINT AND SEVERAL LIABILITY. The advantages are one return, one payment and intra-group supplies falling outside the scope of VAT; the price is that each member can be pursued for the group's entire liability."),

  q("TXK-26-10", "TX-26", "F", "medium",
    "When would voluntary registration be worthwhile?",
    [
      "Where customers are members of the public",
      "Where supplies are ZERO-RATED or customers are VAT-registered, so input VAT becomes recoverable without effectively raising prices",
      "Never, below the threshold",
      "Where the business makes exempt supplies",
    ],
    1,
    "ZERO-RATED SUPPLIES OR VAT-REGISTERED CUSTOMERS. Registered customers reclaim the VAT charged, so the price to them is unchanged. Where customers are the public, registration effectively raises prices by 20% or absorbs the VAT out of margin."),
]

/* ── Chapter 27 · The VAT liability and administration ── */

const CH27: AccaQuestion[] = [
  num("TXK-27-01", "TX-27", "F", "medium",
    "Standard-rated purchases of £186,000 INCLUDING VAT were made. What input VAT is recoverable, in £?",
    31000, "£", 1,
    "£186,000 × 20/120 = £31,000. The figure is VAT-inclusive, so extract the VAT with the 20/120 fraction — equivalently one sixth. Applying 20% to an inclusive figure overstates the VAT by a fifth."),

  num("TXK-27-02", "TX-27", "F", "hard",
    "A quarter shows standard-rated sales of £312,000 excluding VAT, standard-rated purchases of £186,000 including VAT, UK customer entertaining of £4,200 including VAT, and a written-off trade debt of £10,800 including VAT that is seven months overdue. What is the VAT payable, in £?",
    29600, "£", 1,
    "Output £312,000 × 20% = £62,400. Input on purchases £186,000 × 20/120 = £31,000. Entertaining UK customers is IRRECOVERABLE, so its £700 is excluded. Impairment relief = £10,800 × 20/120 = £1,800. Payable = £62,400 − £31,000 − £1,800 = £29,600."),

  q("TXK-27-03", "TX-27", "F", "medium",
    "When is a VAT return and payment due?",
    [
      "One month after the end of the period",
      "One month and SEVEN DAYS after the end of the period",
      "Two months after the period end",
      "By the 22nd of the following month",
    ],
    1,
    "ONE MONTH AND SEVEN DAYS. So a quarter to 31 March 2026 is due by 7 May 2026. Returns are filed online under Making Tax Digital."),

  q("TXK-27-04", "TX-27", "F", "hard",
    "A business pays its VAT 20 days late. What penalty arises?",
    ["None", "3% of the outstanding amount", "6% plus a daily penalty", "A flat £200"],
    1,
    "3%. VAT's late payment regime is GRADUATED and unlike any other in the paper: nothing in the first 15 days, 3% from 16 to 30 days, then 6% plus a daily penalty at an annual rate of 10% from day 31. Interest runs on top throughout."),

  q("TXK-27-05", "TX-27", "F", "hard",
    "A business pays its VAT 40 days late. What penalty arises?",
    [
      "3% of the outstanding amount",
      "6% of the outstanding amount, plus a daily penalty at an annual rate of 10% from day 31",
      "None, only interest",
      "A flat £200",
    ],
    1,
    "6% PLUS A DAILY CHARGE FROM DAY 31. The structure makes paying SOMETHING quickly far cheaper than paying everything eventually, which is exactly its purpose. The percentages are on the exam's rate sheet."),

  q("TXK-27-06", "TX-27", "F", "medium",
    "When is impairment loss relief available on a VAT bad debt?",
    [
      "As soon as the debt is written off",
      "Where the debt is 6 months overdue from the DUE date AND has been written off in the accounts",
      "After 12 months",
      "Only where the customer is insolvent",
    ],
    1,
    "SIX MONTHS OVERDUE AND WRITTEN OFF. Both conditions must be met. Note a business on the CASH accounting scheme never needs this relief, because it only accounts for output VAT on cash actually received."),

  q("TXK-27-07", "TX-27", "F", "hard",
    "What is the basic tax point for a supply of goods, and what displaces it?",
    [
      "The invoice date always",
      "The date goods are removed or made available — displaced by an EARLIER invoice or payment, or by an invoice issued within 14 days AFTER",
      "The payment date always",
      "The end of the VAT period",
    ],
    1,
    "REMOVAL OR AVAILABILITY, DISPLACED THREE WAYS. An earlier invoice or payment brings the tax point forward; and the 14-day rule pushes it to the invoice date where the invoice follows within 14 days. The tax point decides which return the supply falls into."),

  q("TXK-27-08", "TX-27", "F", "medium",
    "At what value is output VAT charged on goods taken for the owner's own use?",
    ["Selling price", "COST to the business", "Market value", "Nil"],
    1,
    "COST. Note this DIFFERS from the income tax rule, where goods for own use are added back at SELLING price. The same transaction is valued differently for the two taxes, which is a favourite exam point."),

  q("TXK-27-09", "TX-27", "F", "hard",
    "Which business benefits most from the CASH ACCOUNTING scheme?",
    [
      "A retailer paid in cash at the point of sale",
      "A business that gives long credit or suffers bad debts",
      "A business with mainly zero-rated supplies",
      "A business with turnover over £2 million",
    ],
    1,
    "ONE GIVING LONG CREDIT OR SUFFERING BAD DEBTS. Accounting on cash received rather than invoices removes the need to fund VAT before being paid, and makes impairment relief unnecessary. A cash retailer gains nothing, being paid immediately anyway."),

  num("TXK-27-10", "TX-27", "F", "medium",
    "What is the turnover limit for JOINING the cash accounting scheme, in £?",
    1350000, "£", 1,
    "£1,350,000 of taxable turnover, and a business must LEAVE once turnover exceeds £1,600,000. The annual accounting scheme uses the same two thresholds."),

  num("TXK-27-11", "TX-27", "F", "hard",
    "A flat rate scheme trader has VAT-inclusive turnover of £132,000, including £14,000 of zero-rated and exempt supplies, and its flat rate percentage is 9.5%. What is the VAT payable, in £?",
    12540, "£", 1,
    "£132,000 × 9.5% = £12,540. The percentage applies to VAT-INCLUSIVE TOTAL turnover INCLUDING zero-rated and exempt supplies, and no input VAT is recovered. Excluding the £14,000 would understate the liability."),

  q("TXK-27-12", "TX-27", "F", "medium",
    "What is the turnover limit for joining the FLAT RATE scheme?",
    [
      "£1,350,000 excluding VAT",
      "£150,000 of expected taxable turnover excluding VAT, with compulsory exit once VAT-inclusive turnover exceeds £230,000",
      "£90,000",
      "£230,000 excluding VAT",
    ],
    1,
    "£150,000 TO JOIN, £230,000 TO LEAVE. The flat rate thresholds are far lower than the £1,350,000 for cash and annual accounting. Note the scheme can be combined with annual accounting but NOT with cash accounting."),
]

/* ── Chapter 28 · VAT overseas aspects ── */

const CH28: AccaQuestion[] = [
  q("TXK-28-01", "TX-28", "F", "medium",
    "How are exports of goods from the UK treated?",
    [
      "Outside the scope of VAT",
      "ZERO-RATED — taxable supplies at 0%, so they count for registration and preserve input recovery",
      "Standard-rated at 20%",
      "Exempt",
    ],
    1,
    "ZERO-RATED. That matters in two ways: the turnover counts towards the registration threshold, and input VAT on related costs remains fully recoverable. Treating exports as outside the scope would lose both."),

  q("TXK-28-02", "TX-28", "F", "hard",
    "What is the net VAT effect of postponed VAT accounting on an import, for a fully taxable trader?",
    [
      "Output VAT is due with no recovery",
      "NIL — output VAT is accounted for on the return and the same amount reclaimed as input VAT",
      "VAT is paid at the border and reclaimed later",
      "No VAT arises at all",
    ],
    1,
    "NIL. The two entries cancel. The mechanism exists purely for CASH FLOW: without it the importer would pay VAT at the border and reclaim it on a later return. Show both entries even though they cancel — omitting them loses the marks for understanding the mechanism."),

  q("TXK-28-03", "TX-28", "F", "hard",
    "A UK business receives consultancy services from an overseas supplier. What happens?",
    [
      "The overseas supplier charges UK VAT",
      "The REVERSE CHARGE applies — the UK recipient accounts for output VAT and reclaims the same amount as input VAT",
      "No VAT arises",
      "The supply is zero-rated",
    ],
    1,
    "THE REVERSE CHARGE. The recipient accounts for the VAT itself, so the net effect is nil for a fully taxable business. The mechanism stops UK businesses buying services from outside the UK to escape VAT, which would disadvantage domestic suppliers."),

  q("TXK-28-04", "TX-28", "F", "hard",
    "When is the reverse charge NOT neutral?",
    [
      "Where the value exceeds £90,000",
      "Where the recipient makes EXEMPT supplies, so the input tax is irrecoverable and the output charge is a real cost",
      "Where the supplier is in the EU",
      "It is always neutral",
    ],
    1,
    "WHERE THE RECIPIENT MAKES EXEMPT SUPPLIES. Then the output charge stands but the input tax cannot be recovered, so the reverse charge is a genuine cost rather than a wash. The same is true of postponed accounting for an exempt trader."),

  q("TXK-28-05", "TX-28", "F", "medium",
    "Do reverse charge services count towards the recipient's registration threshold?",
    [
      "No, they are outside the scope",
      "YES — their value counts towards the recipient's taxable turnover, which can force registration",
      "Only if the recipient is already registered",
      "Only half their value counts",
    ],
    1,
    "YES, THEY COUNT. So a small business buying significant services from overseas can be pushed over the £90,000 threshold by supplies it did not itself make — a genuinely counter-intuitive result and a reliable exam point."),

  q("TXK-28-06", "TX-28", "F", "medium",
    "A UK business supplies services to an overseas BUSINESS customer. What is the VAT treatment?",
    [
      "Standard-rated at 20%",
      "Generally OUTSIDE THE SCOPE of UK VAT — the customer applies its own reverse charge",
      "Zero-rated",
      "Exempt",
    ],
    1,
    "OUTSIDE THE SCOPE. The place of supply moves to the customer's jurisdiction and they account for it under their own reverse charge. Note this differs from an EXPORT OF GOODS, which is zero-rated rather than outside the scope."),
]

/* ── Chapter 29 · Employability and technology skills ── */

const CH29: AccaQuestion[] = [
  q("TXK-29-01", "TX-29", "G", "medium",
    "Which of these figures is NOT provided on the exam's tax rates and allowances sheet?",
    [
      "The corporation tax marginal relief formula",
      "The 37% cap on the car benefit percentage",
      "The inheritance tax taper relief table",
      "The VAT registration and deregistration limits",
    ],
    1,
    "THE 37% CAP IS NOT PROVIDED, and neither is the 4% diesel supplement. The car benefit percentages up to the 55 g/km base level, the hybrid ranges and the £28,200 fuel figure all ARE. The short list of omissions is the only thing genuinely worth memorising."),

  multi("TXK-29-02", "TX-29", "G", "hard",
    "Which of these must be known rather than looked up? Select TWO.",
    [
      "The expensive accommodation formula",
      "The income tax rates and bands",
      "The chattels £6,000 threshold and 5/3 fraction",
      "The corporation tax lower and upper limits",
    ],
    [0, 2],
    "THE ACCOMMODATION FORMULA and THE CHATTELS RULES. Neither is on the rate sheet. The income tax bands and the corporation tax limits both are, along with the marginal relief formula itself — so spend the first minute of a computational question finding figures rather than recalling them."),

  q("TXK-29-03", "TX-29", "G", "medium",
    "Why should workings be shown for every computed figure in Section C?",
    [
      "The examiner requires a minimum length",
      "Most Section C marks are METHOD marks, and a marker can only award them for steps they can see",
      "It demonstrates the use of the spreadsheet",
      "Unsupported figures are automatically zero",
    ],
    1,
    "METHOD MARKS MUST BE VISIBLE. A car benefit of £13,530 earns one mark; showing \"£41,000 × 33%\" earns the method marks even if the arithmetic slips. A single unexplained figure earns everything or nothing."),

  q("TXK-29-04", "TX-29", "G", "medium",
    "What happens to work left on the CBE's scratch pad?",
    [
      "It is submitted with the answer",
      "It is DISCARDED and cannot earn any mark",
      "It is marked at the examiner's discretion",
      "It is submitted only if referenced",
    ],
    1,
    "DISCARDED. It is useful for sketching a PRR timeline or a group structure while thinking, but anything that supports the answer must be put into the spreadsheet or word processor. TX answers often begin with such a sketch, which makes this a real risk."),

  q("TXK-29-05", "TX-29", "G", "hard",
    "Your part (a) computation will not reconcile after twelve minutes of an 8-mark part. What is the best action?",
    [
      "Keep working until it agrees, since later parts depend on it",
      "Check the usual causes briefly, state your figure, carry it forward explicitly, and move to the remaining parts",
      "Abandon the question",
      "Insert the figure the question implies without workings",
    ],
    1,
    "CHECK BRIEFLY, CARRY FORWARD, MOVE ON. Later parts are marked on YOUR figures under the own-figure rule, so an unreconciled part (a) does not forfeit them — provided the marker can see which numbers you are using. Time spent hunting one error costs marks elsewhere at the same rate."),

  q("TXK-29-06", "TX-29", "G", "medium",
    "How much time should a 15-mark question receive in a three-hour, 100-mark paper?",
    ["15 minutes", "About 27 minutes", "About 40 minutes", "45 minutes"],
    1,
    "ABOUT 27 MINUTES, at roughly 1.8 minutes a mark. Write the finish time for each question down at the start, and never let one part overrun into another — the marks at the START of a part are always the easiest in it."),

  q("TXK-29-07", "TX-29", "G", "medium",
    "A requirement says 'advise'. What form should the answer take?",
    [
      "A list of the relevant rules",
      "A RECOMMENDATION in its own sentence, supported by reasons and figures",
      "A calculation only",
      "A balanced discussion with no conclusion",
    ],
    1,
    "A RECOMMENDATION IN ITS OWN SENTENCE. TX requirements are precisely worded and the verb tells you the form: explain wants reasons, state wants a fact, calculate wants a figure, advise wants an answer. A balanced discussion with no conclusion loses the final mark every time."),

  q("TXK-29-08", "TX-29", "G", "hard",
    "Which presentation earns most marks for a discursive part on loss relief options?",
    [
      "A general description of the four reliefs",
      "The options applied to the taxpayer's actual income and years, with the allowances wasted QUANTIFIED, and a recommendation",
      "A list of the statutory time limits",
      "The longest answer time allows",
    ],
    1,
    "APPLIED, QUANTIFIED AND CONCLUDED. \"A claim against total income wastes the personal allowance\" is worth much less than \"wastes £12,570 of allowance, costing £2,514 of relief at 20%\". Two or three sentences per mark is the right density — TX rewards precision, not length."),
]

export const TX_KIT_AREA_E: AccaQuestion[] = [...CH21, ...CH22, ...CH23, ...CH24, ...CH25]
export const TX_KIT_AREA_F: AccaQuestion[] = [...CH26, ...CH27, ...CH28]
export const TX_KIT_AREA_G: AccaQuestion[] = [...CH29]
