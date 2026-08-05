import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-tx-kit-builders"

/*
 * TX-UK · Area B question kit, third part — chapters 10 to 14.
 *
 * Trading profits and the tax year basis, capital allowances, partnerships, trading losses
 * and national insurance. This completes the eleven-chapter income tax block.
 *
 * The chapter 10 questions test the CURRENT basis. From 2024/25 an unincorporated business
 * is taxed on the TAX YEAR basis with profits time-apportioned, so the distractors are the
 * answers the old current-year basis would have given — because that is what a candidate
 * taught from an older text will produce.
 *
 * Chapter 14 omits Class 2 NIC entirely, being an excluded topic.
 *
 * Authored, applied, exam-standard at TX's uniform 2 marks, on the FA2025 basis.
 */

/* ── Chapter 10 · Trading profits and the tax year basis ── */

const CH10: AccaQuestion[] = [
  num("TXK-10-01", "TX-10", "B", "hard",
    "A trader has prepared accounts to 30 September for years. Profits were £72,000 for the year ended 30 September 2025 and £88,000 for the year ended 30 September 2026. What is assessable for 2025/26, in £?",
    80000, "£", 1,
    "The tax year basis applies from 2024/25, so time-apportion: (£72,000 × 6/12) + (£88,000 × 6/12) = £36,000 + £44,000 = £80,000. Assessing £72,000 applies the OLD current-year basis, which no longer exists."),

  q("TXK-10-02", "TX-10", "B", "hard",
    "Which basis applies to an unincorporated business from 2024/25?",
    [
      "The current year basis, assessing the accounting period ending in the tax year",
      "The TAX YEAR basis, time-apportioning accounting periods where the year end is not March or April",
      "The cash basis in all cases",
      "The opening year rules, with overlap relief on cessation",
    ],
    1,
    "THE TAX YEAR BASIS. Profits arising in the tax year are assessed, time-apportioned where the year end differs. There are no opening year rules, no overlap profits and no overlap relief for a continuing business — reaching for overlap relief is applying a regime that has been withdrawn."),

  num("TXK-10-03", "TX-10", "B", "medium",
    "A trader with a 31 July year end has profits of £65,000 for the year ended 31 July 2025 and £79,000 for the year ended 31 July 2026. What is assessable for 2025/26, in £ to the nearest pound?",
    74333, "£", 1,
    "(£65,000 × 4/12) + (£79,000 × 8/12) = £21,667 + £52,667 = £74,333. April to July 2025 is four months of the earlier period, and August 2025 to March 2026 is eight months of the later one. Apportion to the nearest month, as the exam's instructions require."),

  num("TXK-10-04", "TX-10", "B", "medium",
    "A trader has transition profits of £35,000. How much is taxed in 2025/26, in £?",
    7000, "£", 1,
    "One fifth: £35,000/5 = £7,000. Transition profits are spread over five years, and TX may give you the amount and ask you to tax one fifth in any year from 2025/26 to 2027/28. The CALCULATION of transition profits is an excluded topic."),

  q("TXK-10-05", "TX-10", "B", "hard",
    "A trader gives 30 customers a branded bottle of wine costing £22 each. What is the adjustment to profit?",
    [
      "Nothing — the gifts are branded and under £50",
      "Add back the full £660, because gifts of drink never qualify however cheap or well branded",
      "Add back the excess over £50 per customer",
      "Add back half the cost",
    ],
    1,
    "ADD BACK ALL £660. Food, drink, tobacco and vouchers are excluded from the customer gift exception whatever they cost. All four conditions must be met — conspicuous advertisement, £50 or less per recipient per year, and not food, drink, tobacco or a voucher — and failing one disallows the ENTIRE cost."),

  q("TXK-10-06", "TX-10", "B", "medium",
    "At what value are goods taken for the owner's own use added back in the trading profit computation?",
    ["Cost", "Selling price", "Half of selling price", "Market value less a notional discount"],
    1,
    "SELLING PRICE. Adding them back at selling price also brings into charge the profit the owner would have made. Note the VAT treatment differs: output VAT on goods for own use is charged on COST."),

  multi("TXK-10-07", "TX-10", "B", "medium",
    "Which of these are ALLOWABLE in computing tax adjusted trading profit? Select TWO.",
    [
      "Entertaining customers",
      "Entertaining staff",
      "A general provision for doubtful debts",
      "A parking fine incurred by an employee on business",
    ],
    [1, 3],
    "STAFF ENTERTAINING and an EMPLOYEE's parking fine. Customer entertaining is disallowed, as is a GENERAL provision — only a specific provision against a named doubtful debt is allowable. Note the OWNER's own fine would be disallowed."),

  q("TXK-10-08", "TX-10", "B", "medium",
    "Which legal fee is allowable?",
    [
      "Fees on purchasing a freehold property",
      "Fees on renewing a SHORT lease",
      "Fees on acquiring a first lease",
      "Fees on defending the owner against a personal charge",
    ],
    1,
    "RENEWING A SHORT LEASE — a revenue matter of maintaining the existing position. Buying property and acquiring a FIRST lease are both capital, and a personal matter is not a trade expense at all."),

  q("TXK-10-09", "TX-10", "B", "medium",
    "How is income already taxed elsewhere dealt with in the trading profit adjustment?",
    [
      "Added back to profit",
      "Deducted, since it is taxed under its own rules — rental income, bank interest and dividends",
      "Left in the trading profit and taxed once",
      "Halved",
    ],
    1,
    "DEDUCTED. Rental income, bank interest and dividends credited in the accounts are removed from trading profit and taxed under their own rules in the income tax computation, so they are not taxed twice."),

  q("TXK-10-10", "TX-10", "B", "hard",
    "A business commenced trading on 1 November 2025. What period is assessed for 2025/26?",
    [
      "The first 12 months of trading",
      "1 November 2025 to 5 April 2026",
      "The accounting period ending in 2025/26, whenever that is",
      "1 November 2025 to 31 October 2026, with overlap relief",
    ],
    1,
    "1 NOVEMBER 2025 TO 5 APRIL 2026. Under the tax year basis, a business commencing in the year is assessed from the date of commencement to the end of the tax year. There are no opening year rules and no overlap profits."),

  q("TXK-10-11", "TX-10", "B", "medium",
    "Which of these is NOT added back in the adjustment of profit?",
    [
      "Depreciation",
      "The owner's drawings",
      "Interest on a loan taken out for trade purposes",
      "A donation to a national charity",
    ],
    2,
    "TRADE LOAN INTEREST IS ALLOWABLE, so it is not added back. Depreciation, drawings and a national charity donation are all disallowed — the last because it goes through gift aid instead, though a small LOCAL donation with a trade benefit would be allowable."),

  q("TXK-10-12", "TX-10", "B", "medium",
    "A trader draws accounts up to 31 March and made a tax adjusted profit of £96,000 in the twelve months to 31 March 2026. How much is assessed for 2025/26?",
    [
      "£48,000, half apportioned",
      "£96,000 — a 31 March year end needs no apportionment, since the accounting period effectively IS the tax year",
      "£88,000, adjusted for the five days to 5 April",
      "It cannot be determined without the following year's profit",
    ],
    1,
    "£96,000, WITH NO APPORTIONMENT. A 31 March or 5 April year end aligns with the tax year, which is why most scenarios testing something else use one — and why a September or July year end signals that the apportionment itself is being tested."),
]

/* ── Chapter 11 · Capital allowances ── */

const CH11: AccaQuestion[] = [
  q("TXK-11-01", "TX-11", "B", "hard",
    "A business has £180,000 of integral features and £950,000 of machinery in a 12-month period, with a £1,000,000 AIA. How should the AIA be allocated?",
    [
      "£1,000,000 to the machinery, leaving the integral features at a 6% WDA",
      "£180,000 to the integral features first, then £820,000 to the machinery, with £130,000 of machinery joining the main pool",
      "Pro rata between the two pools",
      "£500,000 to each",
    ],
    1,
    "SPECIAL RATE POOL FIRST. Integral features would otherwise be written down at only 6% a year against 18% for the main pool, so relieving them in full immediately is worth more. Getting this backwards costs real allowances."),

  num("TXK-11-02", "TX-11", "B", "medium",
    "The main pool brought forward is £22,400. Additions not covered by the AIA are £40,000 and machinery was sold for £9,800 having cost £15,000. What is the WDA at 18%, in £?",
    9468, "£", 1,
    "£22,400 + £40,000 − £9,800 = £52,600, and 18% = £9,468. Deduct the disposal at the LOWER of original cost (£15,000) and proceeds (£9,800), so £9,800 comes out — never more than the asset cost."),

  num("TXK-11-03", "TX-11", "B", "medium",
    "The special rate pool balance before the WDA is £96,000 in a 12-month period. What is the WDA, in £?",
    5760, "£", 1,
    "£96,000 × 6% = £5,760. The special rate pool covers integral features, long life assets, thermal insulation and cars with emissions over 50 g/km."),

  num("TXK-11-04", "TX-11", "B", "hard",
    "A sole trader bought a car for £18,000 with emissions of 96 g/km, used 60% for business by the owner. What capital allowance is CLAIMED for a 12-month period, in £?",
    648, "£", 1,
    "Emissions exceed 50 g/km so the rate is 6%, and because the OWNER uses it privately it goes in a single asset pool: £18,000 × 6% = £1,080, of which only the 60% business proportion is claimed = £648. The full £1,080 still reduces the pool."),

  q("TXK-11-05", "TX-11", "B", "medium",
    "What allowance is available on a NEW car with zero CO2 emissions?",
    ["18% WDA in the main pool", "6% WDA in the special rate pool", "A 100% first year allowance", "The AIA"],
    2,
    "A 100% FIRST YEAR ALLOWANCE. It is not pooled and the FYA is never time-apportioned, though it is restricted for the owner's private use. A SECOND-HAND zero-emission car gets only an 18% WDA in the main pool."),

  num("TXK-11-06", "TX-11", "B", "medium",
    "The main pool balance before the WDA is £900. What allowance may be claimed, in £?",
    900, "£", 1,
    "The whole £900 under the small pool WDA, available where the main or special rate pool balance is £1,000 or less before the WDA. It avoids carrying a trivial balance for years, is optional, and the £1,000 limit is time-apportioned for a short period."),

  num("TXK-11-07", "TX-11", "B", "medium",
    "A business incurs £400,000 on constructing a new warehouse, excluding land. What structures and buildings allowance arises in a full year, in £?",
    12000, "£", 1,
    "£400,000 × 3% straight line = £12,000. The SBA is a separate regime: no AIA, no pool, and no balancing adjustment on sale — the buyer simply continues the remaining allowances. Land is always excluded."),

  q("TXK-11-08", "TX-11", "B", "hard",
    "When does a balancing ALLOWANCE arise in the main pool?",
    [
      "Whenever an asset is sold at a loss",
      "Only on cessation of trade",
      "Whenever the pool balance falls below £1,000",
      "On any disposal exceeding the pool balance",
    ],
    1,
    "ONLY ON CESSATION. During trading the main pool continues at 18% however small it becomes, with the small pool WDA available to clear a balance of £1,000 or less. A balancing allowance on a SINGLE ASSET pool arises whenever that asset is disposed of."),

  multi("TXK-11-09", "TX-11", "B", "medium",
    "Which allowances are available to COMPANIES only? Select TWO.",
    [
      "The annual investment allowance",
      "Full expensing at 100% on new main pool plant",
      "The 18% main pool writing down allowance",
      "The 50% first year allowance on new special rate expenditure",
    ],
    [1, 3],
    "FULL EXPENSING and the 50% SPECIAL RATE FYA. Both are on the rate sheet under enhanced capital allowances for companies. The AIA and the WDAs are available to unincorporated businesses too, so a company with £3m of new plant relieves it all while a sole trader is capped at the £1m AIA."),

  q("TXK-11-10", "TX-11", "B", "hard",
    "How is a disposal dealt with in the capital allowances computation?",
    [
      "Deduct the original cost",
      "Deduct the LOWER of original cost and sale proceeds",
      "Deduct the sale proceeds, however large",
      "Deduct the market value at disposal",
    ],
    1,
    "THE LOWER OF COST AND PROCEEDS. Relief can never exceed what the asset actually cost the business, so proceeds above cost are capped. The excess of proceeds over cost is a chargeable gain matter, not a capital allowances one."),

  q("TXK-11-11", "TX-11", "B", "medium",
    "Which is time-apportioned for a 9-month period of account?",
    [
      "The first year allowance on a new zero-emission car",
      "The writing down allowances and the AIA limit",
      "Neither",
      "Both the WDA and the FYA",
    ],
    1,
    "THE WDAs AND THE AIA LIMIT. A first year allowance is NEVER time-apportioned — it is 100% of the expenditure whenever in the period it was incurred. WDAs and the £1,000,000 AIA limit are both scaled by 9/12."),

  q("TXK-11-12", "TX-11", "B", "hard",
    "Why would a business make a short life asset election?",
    [
      "To claim the AIA on a car",
      "To put the asset in a single asset pool so a balancing adjustment arises on disposal, accelerating relief where it will be sold cheaply within 8 years",
      "To increase the WDA rate to 100%",
      "To avoid a balancing charge",
    ],
    1,
    "TO GET A BALANCING ADJUSTMENT ON DISPOSAL. In the general pool, an asset sold cheaply leaves unrelieved expenditure sitting in the pool for years. A single asset pool releases it as a balancing allowance on disposal within 8 years. The election is not available for cars."),
]

/* ── Chapter 12 · Partnerships ── */

const CH12: AccaQuestion[] = [
  q("TXK-12-01", "TX-12", "B", "medium",
    "How are partners' salaries treated in computing a partnership's tax adjusted profit?",
    [
      "Deducted as an expense",
      "Not deducted — they are an allocation of profit, so they are added back if charged in the accounts",
      "Deducted only to the extent actually paid in cash",
      "Deducted at half their value",
    ],
    1,
    "THEY ARE AN ALLOCATION, NOT AN EXPENSE. A partner cannot be employed by their own partnership, so a 'salary' is simply a first slice of the profit share. Add it back in the adjustment, then allocate it in the allocation step."),

  num("TXK-12-02", "TX-12", "B", "hard",
    "A partnership's profit for the year ended 31 March 2026 is £252,000. For the first six months A had a salary of £30,000 a year and B £18,000 a year, with the balance shared 3:2. For the second six months there were no salaries and the balance was shared 3:2. What is A's total share, in £?",
    151800, "£", 1,
    "First 6 months: profit £126,000, salaries A £15,000 and B £9,000 = £24,000, balance £102,000 in 3:2 gives A £61,200 — so A has £76,200. Second 6 months: £126,000 in 3:2 gives A £75,600. Total £151,800. Check B has £100,200 and the two sum to £252,000."),

  q("TXK-12-03", "TX-12", "B", "medium",
    "Does a partnership pay income tax?",
    [
      "Yes, on the whole partnership profit",
      "No — it is transparent, and each partner pays income tax and Class 4 NIC on their own share",
      "Yes, but at a reduced rate",
      "Only where the profit exceeds £100,000",
    ],
    1,
    "NO. A partnership files a return showing the profit and its allocation, but pays no tax itself. Each partner includes their share in their own return, and each makes their own loss relief claims independently of the others."),

  q("TXK-12-04", "TX-12", "B", "hard",
    "A partnership has traded for twenty years. A partner who joined eight months ago wants relief for their share of a loss. What is available to them that the founding partners cannot claim?",
    [
      "Nothing — all partners have the same options",
      "Opening year loss relief, because they are within the first four tax years of their OWN trade",
      "Terminal loss relief",
      "An uncapped claim against total income",
    ],
    1,
    "OPENING YEAR RELIEF. Each partner's trade is their own, so a recently joined partner is in their first four tax years and may carry the loss back three years FIFO against total income — even though the firm itself is long established."),

  q("TXK-12-05", "TX-12", "B", "medium",
    "How is a mid-year change in the profit sharing ratio dealt with?",
    [
      "Apply the new ratio to the whole period",
      "Split the period at the date of change, apportion the profit, and allocate each part on its own terms",
      "Apply the old ratio to the whole period",
      "Average the two ratios",
    ],
    1,
    "SPLIT, APPORTION, ALLOCATE SEPARATELY. Then check that the partners' shares sum back to the total profit — that check is the only one available and it catches most allocation errors."),

  q("TXK-12-06", "TX-12", "B", "medium",
    "A partner leaves the partnership. What loss relief becomes available to them alone?",
    [
      "Opening year relief",
      "Terminal loss relief, since they are treated as ceasing to trade",
      "An extended carry forward",
      "Group relief",
    ],
    1,
    "TERMINAL LOSS RELIEF. A departing partner is treated as ceasing their own trade, so they may carry a loss back over the previous 36 months on a LIFO basis against trading profits — while the remaining partners simply continue."),

  q("TXK-12-07", "TX-12", "B", "medium",
    "How are a partnership's capital allowances claimed?",
    [
      "Each partner claims their own on their share of the assets",
      "Once at partnership level, forming part of the profit that is then allocated",
      "By the partner who introduced the asset",
      "They are not available to a partnership",
    ],
    1,
    "ONCE AT PARTNERSHIP LEVEL. Capital allowances are computed in arriving at the partnership's tax adjusted trading profit, and that profit — after allowances — is what gets allocated. An individual partner does not make a separate claim."),

  q("TXK-12-08", "TX-12", "B", "hard",
    "A partnership prepares accounts to 30 September. How is each partner assessed?",
    [
      "On their share of the accounting period ending in the tax year",
      "On their share, TIME APPORTIONED into the tax year, exactly as a sole trader would be",
      "On their share of the later accounting period only",
      "On a cash basis",
    ],
    1,
    "TIME APPORTIONED INTO THE TAX YEAR. The tax year basis applies to partners just as to sole traders, so a September year end means each partner's allocation is split across two tax years."),

  q("TXK-12-09", "TX-12", "B", "medium",
    "How is a limited liability partnership taxed?",
    [
      "As a company, at corporation tax rates",
      "As a partnership, so the same allocation rules apply",
      "Half as a partnership and half as a company",
      "It is exempt",
    ],
    1,
    "AS A PARTNERSHIP. The same computation and allocation rules apply despite the limited liability. Note the loss relief RESTRICTION that applies to LLP members is an excluded topic in TX."),

  q("TXK-12-10", "TX-12", "B", "medium",
    "Three partners share a loss. Must they all make the same loss relief claim?",
    [
      "Yes, the claim is made by the partnership",
      "No — each partner claims independently according to their own income and circumstances",
      "Yes, unless they agree otherwise in writing",
      "Only the senior partner may claim",
    ],
    1,
    "EACH CLAIMS INDEPENDENTLY. One might carry back for the cash flow, another carry forward expecting higher rates later, and a third claim against income and then against a chargeable gain. All three are correct simultaneously, which is what makes partnership loss questions worth setting."),
]

/* ── Chapter 13 · Trading losses ── */

const CH13: AccaQuestion[] = [
  q("TXK-13-01", "TX-13", "B", "hard",
    "In what order, and against what, is OPENING YEAR loss relief given?",
    [
      "LIFO, against trading profits of the same trade",
      "FIFO — earliest of the three preceding years first — against TOTAL income",
      "FIFO, against trading profits only",
      "Either order, against total income",
    ],
    1,
    "FIFO AGAINST TOTAL INCOME, available only in the first four tax years of trade. Terminal loss relief is the mirror image: LIFO, and against trading profits of the same trade only. Swapping the two produces a completely different answer."),

  q("TXK-13-02", "TX-13", "B", "hard",
    "In what order, and against what, is TERMINAL loss relief given?",
    [
      "FIFO, against total income",
      "LIFO — latest of the three preceding years first — against TRADING PROFITS of the same trade",
      "LIFO, against total income",
      "Against chargeable gains",
    ],
    1,
    "LIFO AGAINST TRADING PROFITS OF THE SAME TRADE, and only on cessation. The most recent years are the ones most likely to have trading profits, which is the logic behind the LIFO ordering."),

  q("TXK-13-03", "TX-13", "B", "medium",
    "Against what is CARRY FORWARD relief given?",
    [
      "Total income of future years",
      "Future trading profits of the SAME trade, automatically and indefinitely",
      "Chargeable gains of future years",
      "Total income, but only for three years",
    ],
    1,
    "FUTURE TRADING PROFITS OF THE SAME TRADE. It is automatic, indefinite and cannot be restricted — but because it reduces trading profit rather than total income, it leaves the personal allowance intact each year, which is its real advantage."),

  num("TXK-13-04", "TX-13", "B", "hard",
    "A £46,000 trading loss is claimed against total income of £37,000. How much relief is WASTED by the personal allowance being unused, valued at 20%?",
    2514, "£", 1,
    "The claim is all or nothing, so all £37,000 of income is relieved — including the £12,570 the personal allowance would have covered anyway. £12,570 × 20% = £2,514 of relief thrown away. Quantifying that waste is what turns a list of options into a recommendation."),

  q("TXK-13-05", "TX-13", "B", "medium",
    "Can a claim against total income be restricted to preserve the personal allowance?",
    [
      "Yes, to any amount the taxpayer chooses",
      "No — it is all or nothing for that year",
      "Yes, but only down to the personal allowance",
      "Only where the loss exceeds £50,000",
    ],
    1,
    "NO, IT IS ALL OR NOTHING. The loss is set against the whole of that year's total income, wasting the personal allowance and the nil rate bands if it is large enough. Only a claim for a loss brought FORWARD can be partial."),

  q("TXK-13-06", "TX-13", "B", "hard",
    "What must happen before a loss can be set against chargeable gains?",
    [
      "Nothing — the claim can be made on its own",
      "A claim against TOTAL INCOME for the same year must be made first",
      "The loss must first be carried forward",
      "The annual exempt amount must be used",
    ],
    1,
    "A TOTAL INCOME CLAIM FOR THE SAME YEAR IS COMPULSORY FIRST. Only the loss unrelieved after that claim may go against gains — and it is set against gains BEFORE the annual exempt amount, so the £3,000 exemption can be wasted too."),

  q("TXK-13-07", "TX-13", "B", "medium",
    "Which years may a claim against total income cover?",
    [
      "The year of the loss only",
      "The year of the loss and/or the previous year, in either order",
      "The three previous years, FIFO",
      "The three previous years, LIFO",
    ],
    1,
    "THE YEAR OF THE LOSS AND/OR THE PREVIOUS YEAR, in either order — either, neither or both. The three-year carry back belongs to opening year relief and terminal loss relief."),

  num("TXK-13-08", "TX-13", "B", "medium",
    "A taxpayer's income is £160,000. What is the cap on income tax reliefs for a claim against total income, in £?",
    50000, "£", 1,
    "The higher of £50,000 and 25% of income. 25% × £160,000 = £40,000, which is lower, so the cap is £50,000. At income of £400,000 the 25% test would give £100,000 and would bind instead."),

  multi("TXK-13-09", "TX-13", "B", "medium",
    "Which reliefs are NOT subject to the cap on income tax reliefs? Select TWO.",
    [
      "A claim against total income",
      "Carry forward relief against future trading profits",
      "Opening year relief",
      "Terminal loss relief against trading profits of the same trade",
    ],
    [1, 3],
    "CARRY FORWARD and TERMINAL LOSS RELIEF. The cap applies to claims against TOTAL INCOME and to opening year relief. It does not apply to relief against profits of the same trade, which covers both carry forward and terminal loss relief."),

  q("TXK-13-10", "TX-13", "B", "hard",
    "Which factors should decide the choice of loss relief?",
    [
      "Only the speed of relief",
      "The rate at which relief is obtained, the allowances wasted, the cash flow, and how certain future profits are",
      "Whichever relieves the largest amount of loss",
      "Whichever the taxpayer's accountant prefers",
    ],
    1,
    "RATE, WASTE, CASH FLOW AND CERTAINTY. Relief against income taxed at 40% is worth twice relief at 20%; all-or-nothing claims waste allowances; a carry back generates a repayment now; and carry forward depends on the trade making profits it may never make."),

  q("TXK-13-11", "TX-13", "B", "medium",
    "By when must a claim against total income for a 2025/26 trading loss be made?",
    ["31 January 2027", "31 January 2028", "5 April 2028", "31 January 2029"],
    1,
    "31 JANUARY 2028 — within 12 months of the 31 January following the tax year of the loss. The 31 January 2027 date is the filing deadline for the 2025/26 return itself, which is a year earlier and a different deadline."),

  q("TXK-13-12", "TX-13", "B", "medium",
    "Why does carry forward relief never waste the personal allowance?",
    [
      "Because it can be restricted to any amount",
      "Because it reduces TRADING PROFIT rather than total income, so the allowance still covers the remaining income",
      "Because the allowance is not available in a loss year",
      "Because it is capped at £50,000",
    ],
    1,
    "IT REDUCES TRADING PROFIT, NOT TOTAL INCOME. So each future year's personal allowance still does its work against whatever income remains. That is the trade-off: slower relief, but no waste."),
]

/* ── Chapter 14 · National insurance ── */

const CH14: AccaQuestion[] = [
  num("TXK-14-01", "TX-14", "B", "medium",
    "An employee earns a salary of £74,000 and receives taxable benefits of £9,600. What are the employee's Class 1 primary contributions, in £?",
    3490.6, "£", 0.51,
    "Class 1 is on CASH EARNINGS only, so the benefits are excluded. (£50,270 − £12,570) × 8% = £3,016, plus (£74,000 − £50,270) × 2% = £474.60. Total £3,490.60."),

  num("TXK-14-02", "TX-14", "B", "medium",
    "The same employee's employer pays Class 1 secondary contributions. What are they, in £?",
    10350, "£", 1,
    "(£74,000 − £5,000) × 15% = £10,350. The employer's threshold is only £5,000, far below the employee's £12,570, and there is NO upper limit — so the employer pays roughly three times what the employee does on this salary."),

  num("TXK-14-03", "TX-14", "B", "medium",
    "The same employee receives taxable benefits of £9,600. What Class 1A does the employer pay, in £?",
    1440, "£", 1,
    "£9,600 × 15% = £1,440, payable by 22 July following the tax year. Class 1A falls on the employer alone — benefits carry no employee national insurance at all."),

  num("TXK-14-04", "TX-14", "B", "medium",
    "A sole trader has tax adjusted trading profits of £46,000. What are their Class 4 contributions, in £?",
    2005.8, "£", 0.51,
    "(£46,000 − £12,570) × 6% = £2,005.80. The whole amount is within the £12,571 to £50,270 band, so the 2% rate is not reached. Note Class 4 uses 6% where an employee pays 8%."),

  num("TXK-14-05", "TX-14", "B", "hard",
    "A sole trader has trading profits of £68,000 and property income of £14,000. What are their Class 4 contributions, in £?",
    2616.6, "£", 0.51,
    "Class 4 is on TRADING PROFITS only, so the property income is excluded entirely. (£50,270 − £12,570) × 6% = £2,262, plus (£68,000 − £50,270) × 2% = £354.60. Total £2,616.60."),

  q("TXK-14-06", "TX-14", "B", "medium",
    "On what is Class 1 primary charged?",
    [
      "Cash earnings and taxable benefits",
      "Cash earnings only — benefits attract employer's Class 1A instead",
      "Total income",
      "Trading profits",
    ],
    1,
    "CASH EARNINGS ONLY. Salary, bonus and commission are within it; benefits are outside Class 1 entirely and are picked up by the employer's Class 1A at 15%. That is part of why benefits are attractive to employees."),

  q("TXK-14-07", "TX-14", "B", "hard",
    "Why does a high salary cost the employer disproportionately?",
    [
      "The employer's rate increases with salary",
      "The employer's 15% has no upper limit, while the employee's rate drops to 2% above £50,270",
      "The employer pays both primary and secondary contributions",
      "The employment allowance is withdrawn above £50,270",
    ],
    1,
    "NO UPPER LIMIT FOR THE EMPLOYER. The employee's marginal rate falls to 2% above £50,270 but the employer keeps paying 15% on everything above £5,000. So the marginal NIC cost of a pay rise is 17% at high salaries — 15% employer plus 2% employee."),

  num("TXK-14-08", "TX-14", "B", "easy",
    "What is the employment allowance for 2025/26, in £?",
    10500, "£", 1,
    "£10,500, set against the employer's Class 1 SECONDARY liability only — not Class 1A and not the employee's contributions. It is per employer, not per employee, and is unavailable where the sole employee is also a director."),

  q("TXK-14-09", "TX-14", "B", "medium",
    "Against what may the employment allowance be set?",
    [
      "Any national insurance liability",
      "The employer's Class 1 secondary liability only",
      "Class 1A on benefits",
      "The employee's contributions",
    ],
    1,
    "CLASS 1 SECONDARY ONLY. It cannot reduce Class 1A on benefits or the employee's own contributions. Note the GROUP aspects of the allowance are an excluded topic in TX."),

  q("TXK-14-10", "TX-14", "B", "hard",
    "Why does an owner-manager often take profits as a dividend rather than salary?",
    [
      "Dividends are deductible for the company",
      "A dividend carries no national insurance for either the company or the shareholder",
      "Dividends are taxed below the 20% basic rate",
      "Dividends attract Class 4 rather than Class 1",
    ],
    1,
    "NO NIC ON EITHER SIDE. A dividend avoids the employee's 8% and the employer's 15%. The trade-off is that it is paid out of profits already charged to corporation tax and is not deductible for the company, so the comparison must be run on total tax and NIC together."),

  q("TXK-14-11", "TX-14", "B", "medium",
    "Does property income attract national insurance?",
    [
      "Yes, Class 4 at 6%",
      "No — Class 4 is charged on tax adjusted trading profits only",
      "Yes, Class 1 at 8%",
      "Only where it exceeds £50,270",
    ],
    1,
    "NO. Class 4 is charged on trading profits alone, so property, savings and dividend income all escape national insurance entirely. That is a genuine advantage of investment income over earnings and a routine planning point."),

  q("TXK-14-12", "TX-14", "B", "medium",
    "When is Class 1A payable and how is it collected?",
    [
      "Monthly through PAYE",
      "Annually, by 22 July following the tax year",
      "Through self assessment with the balancing payment",
      "By 31 January following the tax year",
    ],
    1,
    "BY 22 JULY, ANNUALLY AND SEPARATELY. Class 1 primary and secondary go through PAYE monthly, by the 22nd of the following month if paid electronically. Class 4 goes through self assessment with the income tax."),
]

export const TX_KIT_AREA_B_PART3: AccaQuestion[] = [...CH10, ...CH11, ...CH12, ...CH13, ...CH14]
