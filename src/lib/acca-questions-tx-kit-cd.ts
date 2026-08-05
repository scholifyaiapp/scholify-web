import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-tx-kit-builders"

/*
 * TX-UK · Areas C and D question kit — chapters 15 to 20.
 *
 * Chargeable gains (four chapters) and inheritance tax (two).
 *
 * Three FA2025 figures are tested repeatedly because a recalled number will be wrong: the
 * annual exempt amount is £3,000, the rates are 18% and 24% with NO residential surcharge,
 * and business asset disposal relief is taxed at 14% rather than the 10% it was for years.
 *
 * Nothing here applies an excluded topic. Absent by design: business and agricultural
 * property relief, grossing up on death, the RNRB taper above £2 million, relief for the
 * fall in value of lifetime gifts, quick succession relief, assets held at 31 March 1982,
 * partnership capital gains, and the two-year pre-occupation PRR exemption.
 *
 * Authored, applied, exam-standard at TX's uniform 2 marks, on the FA2025 basis.
 */

/* ── Chapter 15 · The CGT computation ── */

const CH15: AccaQuestion[] = [
  num("TXK-15-01", "TX-15", "C", "hard",
    "For 2025/26 a taxpayer has gains of £52,000, current year losses of £7,000 and brought forward losses of £9,000. Taxable income is £26,000. What is the capital gains tax, in £?",
    7218, "£", 1,
    "Current year losses first and in full: £45,000. Brought forward losses reduce gains only to the AEA level, and £9,000 is within that headroom, so £36,000 remains; less the £3,000 AEA = £33,000 taxable. Remaining basic rate band = £37,700 − £26,000 = £11,700 at 18% = £2,106; the other £21,300 at 24% = £5,112. Total £7,218."),

  num("TXK-15-02", "TX-15", "C", "hard",
    "Gains are £52,000, current year losses £7,000 and brought forward losses £50,000. How much of the brought forward losses is used, in £?",
    42000, "£", 1,
    "Current year losses reduce gains to £45,000. Brought forward losses may then reduce gains only DOWN TO the £3,000 annual exempt amount, so only £42,000 of the £50,000 is used and £8,000 carries forward again. That restriction is why brought forward losses are never wasted."),

  q("TXK-15-03", "TX-15", "C", "hard",
    "How do current year and brought forward capital losses differ in treatment?",
    [
      "Both are restricted so the annual exempt amount survives",
      "Current year losses must be used in FULL even if that wastes the AEA; brought forward losses are restricted so it survives",
      "Brought forward losses must be used in full; current year losses are optional",
      "Both may be restricted to any amount",
    ],
    1,
    "CURRENT YEAR IN FULL, BROUGHT FORWARD RESTRICTED. So a year with £4,000 of gains and £4,000 of current year losses wastes the whole AEA, while £4,000 of brought forward losses would be restricted to £1,000. Reversing the two is the commonest error in Area C."),

  q("TXK-15-04", "TX-15", "C", "easy",
    "What are the capital gains tax rates for 2025/26?",
    [
      "10% and 20%",
      "18% within the remaining basic rate band and 24% above it",
      "18% and 28% for residential property, 10% and 20% otherwise",
      "20% for all gains",
    ],
    1,
    "18% AND 24%, WITH NO RESIDENTIAL SURCHARGE. The old 18%/28% split for residential property no longer applies — a let residential property is taxed at the same rates as anything else."),

  q("TXK-15-05", "TX-15", "C", "medium",
    "Which figure determines how much of a gain falls at 18% rather than 24%?",
    [
      "Total income",
      "TAXABLE income — so £37,700 less taxable income gives the band available",
      "Net income before the personal allowance",
      "Adjusted net income",
    ],
    1,
    "TAXABLE INCOME, after the personal allowance and with the band extended for gift aid and pension contributions. Using total income overstates the income and understates the band available at 18%."),

  q("TXK-15-06", "TX-15", "C", "medium",
    "An individual gives an asset worth £90,000 that cost £30,000 to their spouse. What gain arises?",
    [
      "£60,000",
      "Nil — the transfer is at no gain, no loss, and the spouse takes over the £30,000 cost",
      "£90,000",
      "£60,000, but it is exempt",
    ],
    1,
    "NIL, AND THE COST TRANSFERS. Spousal transfers are at no gain, no loss: the transferor is deemed to dispose at their own cost and the spouse acquires at that figure. The gain is DEFERRED, not removed, and arises when the spouse sells."),

  multi("TXK-15-07", "TX-15", "C", "medium",
    "Which of these are EXEMPT assets for capital gains tax? Select TWO.",
    [
      "A let residential property",
      "A vintage car",
      "Quoted shares",
      "Gilt-edged securities",
    ],
    [1, 3],
    "CARS AND GILTS. Cars are always exempt whatever the gain, and gilts and qualifying corporate bonds are exempt — which is all TX examines about them. Shares and let property are both chargeable."),

  q("TXK-15-08", "TX-15", "C", "hard",
    "Within what period must a gain on a let UK residential property be reported and paid on account?",
    ["30 days of completion", "60 days of completion", "By 31 January following the tax year", "Within 6 months"],
    1,
    "60 DAYS OF COMPLETION, with a payment on account of the estimated CGT. The rate is estimated from expected income for the year, and brought forward losses, current year losses already realised, and the AEA may all be deducted in arriving at it."),

  q("TXK-15-09", "TX-15", "C", "medium",
    "When is capital gains tax on other assets due?",
    [
      "31 January following the tax year, with no payments on account",
      "31 January and 31 July, as payments on account",
      "Within 60 days of disposal",
      "9 months and 1 day after the tax year",
    ],
    1,
    "31 JANUARY FOLLOWING THE TAX YEAR, WITH NO PAYMENTS ON ACCOUNT. CGT is excluded from the payment on account calculation entirely, so it all arrives with the balancing payment — which can make that payment much larger than the instalments suggested."),

  q("TXK-15-10", "TX-15", "C", "hard",
    "A taxpayer sells an asset at a loss to their brother. How may the loss be used?",
    [
      "Against any chargeable gains of the year",
      "Only against gains on disposals to that same brother — it is a clogged loss",
      "Against total income",
      "It is not an allowable loss at all",
    ],
    1,
    "ONLY AGAINST GAINS ON DISPOSALS TO THE SAME CONNECTED PERSON. A brother is a connected person, so the disposal is at market value and any loss is clogged. Setting it against general gains is the error the rule exists to prevent."),

  q("TXK-15-11", "TX-15", "C", "medium",
    "Which expenditure is deductible in computing a gain?",
    [
      "Repairs and redecoration during ownership",
      "Enhancement expenditure still REFLECTED in the asset at disposal",
      "Interest paid on a loan to buy the asset",
      "Insurance premiums during ownership",
    ],
    1,
    "ENHANCEMENT EXPENDITURE STILL REFLECTED IN THE ASSET. An extension counts; a repair does not, and neither does an improvement since removed. Interest and insurance are revenue costs, not allowable against a gain."),

  q("TXK-15-12", "TX-15", "C", "hard",
    "Why is transferring an asset to a lower-earning spouse before sale a standard planning recommendation?",
    [
      "It makes the gain exempt",
      "It uses the spouse's own annual exempt amount and unused basic rate band, potentially taxing the gain at 18% instead of 24%",
      "It defers the gain indefinitely",
      "It converts the gain into income",
    ],
    1,
    "IT ACCESSES A SECOND AEA AND A SECOND BASIC RATE BAND. And the transfer itself is free of tax, being at no gain, no loss. State the two conditions: the transfer must be outright and unconditional, and the couple must be living together."),
]

/* ── Chapter 16 · Part disposals, chattels and wasting assets ── */

const CH16: AccaQuestion[] = [
  num("TXK-16-01", "TX-16", "C", "hard",
    "Land costing £150,000 is partly sold for £200,000 when the retained part is worth £50,000. What is the gain, in £?",
    80000, "£", 1,
    "Cost allocated = £150,000 × £200,000/(£200,000 + £50,000) = £150,000 × 0.8 = £120,000. Gain = £200,000 − £120,000 = £80,000. The remaining £30,000 of cost stays with the retained land for its eventual disposal."),

  q("TXK-16-02", "TX-16", "C", "medium",
    "In the part disposal fraction A/(A + B), what is B?",
    [
      "The original cost of the part retained",
      "The MARKET VALUE of the part retained at the date of the part disposal",
      "The proceeds of the part retained when eventually sold",
      "The market value of the whole asset",
    ],
    1,
    "THE MARKET VALUE OF THE PART RETAINED, measured at the date of the part disposal. Not its cost, and not its value at any later date. The question will always supply it."),

  num("TXK-16-03", "TX-16", "C", "hard",
    "A non-wasting chattel costing £2,400 is sold for £9,200. What is the chargeable gain, in £ to the nearest pound?",
    5333, "£", 1,
    "Marginal relief takes the LOWER of the normal gain (£9,200 − £2,400 = £6,800) and 5/3 × (£9,200 − £6,000) = 5/3 × £3,200 = £5,333. So £5,333. Taking the normal gain without testing the 5/3 limit overstates it by £1,467."),

  num("TXK-16-04", "TX-16", "C", "medium",
    "A non-wasting chattel costing £8,500 is sold for £4,800. What is the allowable loss, in £? Give the loss as a negative number.",
    -2500, "£", 1,
    "Proceeds are DEEMED to be £6,000 where a non-wasting chattel is sold at a loss for less than that, so the allowable loss is £6,000 − £8,500 = £2,500 rather than the £3,700 actual loss. The £6,000 rule restricts losses as well as exempting gains."),

  q("TXK-16-05", "TX-16", "C", "medium",
    "When is a wasting chattel NOT exempt from capital gains tax?",
    [
      "Where it cost more than £6,000",
      "Where it qualified for capital allowances, such as business plant and machinery",
      "Where it was held for more than two years",
      "Where it was acquired by gift",
    ],
    1,
    "WHERE IT QUALIFIED FOR CAPITAL ALLOWANCES. Business plant is not exempt, though a loss on it is still not allowable — the relief comes through capital allowances instead. A racehorse or a caravan, by contrast, is exempt as a wasting chattel."),

  q("TXK-16-06", "TX-16", "C", "easy",
    "A painting bought for £4,000 is sold for £5,500. What is the position?",
    [
      "A £1,500 chargeable gain",
      "Exempt — a non-wasting chattel bought and sold for £6,000 or less",
      "A gain restricted by the 5/3 rule",
      "A £1,500 gain, but covered by the annual exempt amount",
    ],
    1,
    "EXEMPT. Both cost and proceeds are £6,000 or less, so a non-wasting chattel is entirely outside the charge and there is no gain to shelter. The 5/3 marginal relief only becomes relevant once proceeds EXCEED £6,000."),

  num("TXK-16-07", "TX-16", "C", "medium",
    "Land costing £150,000 is partly sold, with £120,000 of cost apportioned to the disposal. How much cost remains with the retained part, in £?",
    30000, "£", 1,
    "£150,000 − £120,000 = £30,000. The balance is not lost — it attaches to the retained land and is deducted when that part is eventually sold. Forgetting this is the second half of the part disposal error."),

  q("TXK-16-08", "TX-16", "C", "hard",
    "An asset is destroyed and insurance proceeds are received. What is the treatment?",
    [
      "No disposal arises, since nothing was sold",
      "A disposal at that date, with insurance proceeds as the disposal proceeds; a claim may defer the gain if replaced within 12 months",
      "A part disposal",
      "The loss is allowable in full",
    ],
    1,
    "A DISPOSAL, WITH THE PROCEEDS BEING THE INSURANCE RECEIPT. So a gain can arise even though nothing was sold. Where the proceeds are used to replace the asset within 12 months, a claim deducts the gain from the replacement's cost instead."),

  q("TXK-16-09", "TX-16", "C", "medium",
    "Which incidental costs are deducted in FULL on a part disposal, rather than apportioned?",
    [
      "None — all costs are apportioned on the same fraction",
      "Costs relating WHOLLY to the part disposed of",
      "Only legal fees",
      "Costs relating to the whole asset",
    ],
    1,
    "COSTS RELATING WHOLLY TO THE PART DISPOSED OF. Legal fees on that specific sale come off in full. Only costs relating to the WHOLE asset are apportioned on the A/(A + B) fraction."),

  q("TXK-16-10", "TX-16", "C", "medium",
    "How should the part disposal fraction be sanity checked?",
    [
      "It should always be one half",
      "The cost apportioned should bear the same relationship to the total cost as the part sold's value bears to the whole",
      "It should always exceed one half",
      "No check is possible",
    ],
    1,
    "THE FRACTION SHOULD REFLECT THE RELATIVE VALUES. If the part sold fetched four times what the retained part was worth, it should carry four fifths of the cost. Where the apportionment does not reflect that, A or B has been taken wrongly."),
]

/* ── Chapter 17 · Shares and securities ── */

const CH17: AccaQuestion[] = [
  q("TXK-17-01", "TX-17", "C", "medium",
    "State the share matching rules for an INDIVIDUAL, in order.",
    [
      "The pool, then same day, then the following 30 days",
      "Same day, then the following 30 days, then the pool",
      "Same day, then the previous 9 days, then the pool",
      "The pool only",
    ],
    1,
    "SAME DAY, THEN THE FOLLOWING 30 DAYS, THEN THE POOL. Note a COMPANY matches same day then the PREVIOUS NINE days — the individual looks forward, the company looks back."),

  q("TXK-17-02", "TX-17", "C", "hard",
    "Why is a disposal matched against acquisitions in the FOLLOWING 30 days?",
    [
      "Because the pool is updated monthly",
      "To defeat 'bed and breakfasting' — selling to crystallise a loss or use the AEA and buying straight back",
      "Because settlement takes 30 days",
      "To give the taxpayer the lowest gain",
    ],
    1,
    "TO DEFEAT BED AND BREAKFASTING. Without the rule a taxpayer could sell at the close of one day and repurchase the next morning, establishing a loss or using the annual exempt amount while never really parting with the shares."),

  num("TXK-17-03", "TX-17", "C", "medium",
    "A pool holds 2,000 shares costing £9,600. The company makes a 1 for 4 BONUS issue. What is the pool cost afterwards, in £?",
    9600, "£", 1,
    "£9,600 — unchanged. A bonus issue is free, so it adds 500 SHARES but no cost, taking the pool to 2,500 shares at £9,600. The effect is that the cost per share falls from £4.80 to £3.84."),

  num("TXK-17-04", "TX-17", "C", "hard",
    "The pool now holds 2,500 shares costing £9,600. A 1 for 5 RIGHTS issue at £2.50 a share is taken up in full. What is the pool cost afterwards, in £?",
    10850, "£", 1,
    "The rights issue is a purchase: 500 shares at £2.50 = £1,250 of cost. So the pool becomes 3,000 shares at £9,600 + £1,250 = £10,850. A rights issue adds both shares and cost, unlike a bonus issue."),

  num("TXK-17-05", "TX-17", "C", "hard",
    "The pool holds 3,000 shares costing £10,850. 1,200 shares are sold for £7.80 each, with no acquisitions nearby. What is the gain, in £?",
    5020, "£", 1,
    "Cost of shares sold = £10,850 × 1,200/3,000 = £4,340. Proceeds = 1,200 × £7.80 = £9,360. Gain = £9,360 − £4,340 = £5,020. The pool is left with 1,800 shares at £6,510."),

  q("TXK-17-06", "TX-17", "C", "medium",
    "How is a paper for paper takeover treated?",
    [
      "As a disposal at market value",
      "Not a disposal — the original cost transfers to the new holding",
      "As a part disposal",
      "As a bonus issue",
    ],
    1,
    "NOT A DISPOSAL. The cost simply transfers to the new shares and the gain arises only when they are eventually sold. Where more than one class is received, apportion the cost by MARKET VALUE at the takeover date; any CASH element IS a disposal."),

  q("TXK-17-07", "TX-17", "C", "medium",
    "What is the CGT treatment of qualifying corporate bonds?",
    [
      "Chargeable at 18% and 24%",
      "Exempt, so neither a gain nor a loss arises",
      "Chargeable but eligible for business asset disposal relief",
      "Chargeable only on disposal to a connected person",
    ],
    1,
    "EXEMPT. That fact is all the TX syllabus examines about QCBs and gilts — neither a chargeable gain nor an allowable loss arises on them."),

  q("TXK-17-08", "TX-17", "C", "hard",
    "Shares are gifted rather than sold. What are the deemed proceeds?",
    [
      "Nil, since nothing was received",
      "Market value at the date of the gift",
      "Original cost, giving no gain",
      "The donee's eventual sale proceeds",
    ],
    1,
    "MARKET VALUE. A gift is a chargeable disposal, so a liability can arise with no cash received. The exception is a gift to a spouse or civil partner, which is at no gain, no loss."),

  q("TXK-17-09", "TX-17", "C", "medium",
    "How is the cost of shares sold from the pool computed?",
    [
      "The original cost of the earliest shares acquired",
      "Pool cost multiplied by shares sold divided by shares in the pool",
      "The average market value over the holding period",
      "The cost of the most recently acquired shares",
    ],
    1,
    "A PROPORTION OF THE POOL COST. The pool is a single running total of shares and aggregate cost, so a disposal takes out a proportionate share of that cost — and both the shares and the cost must then be deducted so the pool carries forward correctly."),

  q("TXK-17-10", "TX-17", "C", "medium",
    "When is a bonus issue treated as acquired for matching purposes?",
    [
      "On the date the bonus shares are issued",
      "On the date the ORIGINAL shares were acquired, so no separate 30-day matching arises",
      "On the first day of the tax year",
      "At the same time as the next disposal",
    ],
    1,
    "WHEN THE ORIGINAL SHARES WERE ACQUIRED. So bonus shares simply join the pool and never trigger the 30-day rule, however close the issue is to a disposal. The same applies to a rights issue."),
]

/* ── Chapter 18 · The CGT reliefs ── */

const CH18: AccaQuestion[] = [
  num("TXK-18-01", "TX-18", "C", "hard",
    "A trader sells her business of nine years, realising a gain of £1,400,000. She has made no previous claims, has no basic rate band left and her AEA is used elsewhere. What is the capital gains tax, in £?",
    236000, "£", 1,
    "Business asset disposal relief covers the first £1,000,000 at 14% = £140,000. The remaining £400,000 is taxed at the normal higher rate of 24% = £96,000. Total £236,000. At the OLD 10% rate the answer would have been £196,000 — so using it understates the liability by £40,000."),

  q("TXK-18-02", "TX-18", "C", "medium",
    "At what rate are business asset disposal relief gains taxed for 2025/26?",
    ["10%", "14%", "18%", "20%"],
    1,
    "14%. The rate was 10% for many years and is the single most likely CGT figure to be recalled wrongly. It IS on the exam's rate sheet, so there is no excuse — but the lifetime limit is unchanged at £1,000,000."),

  q("TXK-18-03", "TX-18", "C", "medium",
    "What is the lifetime limit for investors' relief, and at what rate is it taxed?",
    ["£1,000,000 at 14%", "£10,000,000 at 14%", "£10,000,000 at 10%", "£1,000,000 at 18%"],
    1,
    "£10,000,000 AT 14%. Investors' relief applies to newly issued unquoted trading company shares held at least three years where the individual is NOT an officer or employee — the mirror image of business asset disposal relief, which requires that they ARE."),

  num("TXK-18-04", "TX-18", "C", "hard",
    "A business asset is sold for £520,000 realising a gain of £180,000, and £475,000 is reinvested in a replacement. How much gain is chargeable NOW, in £?",
    45000, "£", 1,
    "The amount chargeable immediately is the LOWER of the gain (£180,000) and the proceeds not reinvested (£520,000 − £475,000 = £45,000). So £45,000 now, and £135,000 rolled into the replacement's base cost, reducing it to £340,000."),

  q("TXK-18-05", "TX-18", "C", "medium",
    "Within what period must a replacement asset be acquired for rollover relief?",
    [
      "Within 12 months after the disposal",
      "Between 1 year BEFORE and 3 years AFTER the disposal",
      "Within 3 years before the disposal",
      "In the same tax year",
    ],
    1,
    "ONE YEAR BEFORE TO THREE YEARS AFTER. The window looks backwards as well as forwards, so a replacement bought in anticipation of the sale still qualifies."),

  num("TXK-18-06", "TX-18", "C", "hard",
    "A house was owned for 180 months and the exempt period of occupation totals 132 months. The gain is £300,000. What is the private residence relief, in £?",
    220000, "£", 1,
    "£300,000 × 132/180 = £220,000, leaving a chargeable gain of £80,000. Always work in months and lay the periods out as a timeline before computing anything."),

  multi("TXK-18-07", "TX-18", "C", "medium",
    "Which periods count as DEEMED occupation for private residence relief? Select TWO.",
    [
      "The first 12 months of ownership before moving in",
      "The last 9 months of ownership",
      "Up to 3 years of absence for any reason",
      "Any period the property was let to tenants",
    ],
    [1, 2],
    "THE LAST 9 MONTHS and UP TO 3 YEARS FOR ANY REASON. The others are employment abroad (unlimited) and up to 4 years working elsewhere in the UK. Note the two-year PRE-OCCUPATION exemption is an EXCLUDED topic in TX, and letting is not deemed occupation."),

  q("TXK-18-08", "TX-18", "C", "hard",
    "An owner works abroad for their employer for five years and sells without returning. How much of the absence is deemed occupation?",
    [
      "Three years, the general limit",
      "All five years — employment abroad is unlimited, and the reoccupation condition is waived where the employer required the move",
      "Four years",
      "None, because they never returned",
    ],
    1,
    "ALL FIVE YEARS. Absence for employment overseas is deemed occupation for ANY length, and although deemed occupation normally requires actual occupation before AND after, the reoccupation condition is waived where the employer required the individual to work away."),

  q("TXK-18-09", "TX-18", "C", "hard",
    "When is letting relief available?",
    [
      "On any let property",
      "Only where the owner lets PART of the property while still occupying the remainder",
      "On a former main residence later let out in its entirety",
      "On any buy-to-let held for more than three years",
    ],
    1,
    "ONLY WHERE PART IS LET WHILE THE OWNER REMAINS IN OCCUPATION. It is not available for a buy-to-let or for a former residence later let wholly — which is the situation most candidates try to apply it to. Where it applies it is the lowest of £40,000, the PRR-exempt gain, and the chargeable gain attributable to the letting."),

  q("TXK-18-10", "TX-18", "C", "hard",
    "A father gifts business premises to his son, who pays £180,000 for premises that originally cost £150,000. What limits gift holdover relief?",
    [
      "Nothing — full relief is available on a gift of business assets",
      "The £30,000 excess of consideration over original cost is chargeable immediately; only the balance is held over",
      "The whole gain is chargeable because consideration was paid",
      "Relief is halved",
    ],
    1,
    "THE £30,000 EXCESS IS CHARGEABLE NOW. Where actual consideration exceeds the donor's original cost, that excess crystallises immediately and only the balance of the gain is held over. A sale at undervalue therefore gets partial relief, not full."),

  q("TXK-18-11", "TX-18", "C", "medium",
    "Which conditions must be met for business asset disposal relief on a disposal of SHARES?",
    [
      "Any shareholding held for one year",
      "At least 5% of a trading company, and the individual an officer or employee, both for at least 2 years",
      "At least 25% of any company held for three years",
      "Shares in an unquoted company only",
    ],
    1,
    "5%, OFFICER OR EMPLOYEE, TWO YEARS. All three must be satisfied. Investors' relief is the opposite case: newly issued unquoted shares where the individual is NOT an officer or employee, held three years."),

  q("TXK-18-12", "TX-18", "C", "hard",
    "How should the annual exempt amount be allocated where a taxpayer has both a BADR gain and an ordinary gain?",
    [
      "Against the BADR gain first",
      "Against the gain taxed at 24%, since relieving a 24% gain saves more than relieving a 14% one",
      "Pro rata between them",
      "It cannot be allocated where BADR applies",
    ],
    1,
    "AGAINST THE 24% GAIN. Each £1 of AEA saves 24p there against 14p on a BADR gain, so allocating it to the higher-taxed gain is worth 10p more per pound. It is a small point but a real one, and it is the kind of planning observation a written answer is credited for."),
]

/* ── Chapter 19 · IHT lifetime transfers ── */

const CH19: AccaQuestion[] = [
  q("TXK-19-01", "TX-19", "D", "medium",
    "What is the difference between a PET and a CLT?",
    [
      "A PET is to a trust and a CLT to an individual",
      "A PET is to an INDIVIDUAL with no tax when made; a CLT is to a TRUST and is taxed at 20% immediately",
      "A PET is exempt and a CLT is not",
      "A CLT is only taxed on death",
    ],
    1,
    "PET TO AN INDIVIDUAL, CLT TO A TRUST. A PET carries no tax when made and becomes chargeable only if the donor dies within seven years. A CLT is taxed at 20% immediately, and recomputed at the death rate if the donor dies within seven years."),

  num("TXK-19-02", "TX-19", "D", "hard",
    "On 1 June 2021 a donor transferred £480,000 into a trust, the trustees paying the tax. Both annual exemptions were available and there were no earlier transfers. What is the lifetime tax, in £?",
    29800, "£", 1,
    "Net transfer = £480,000 − £6,000 (two annual exemptions) = £474,000. Less the £325,000 nil rate band = £149,000, taxed at 20% because the TRUSTEES are paying: £29,800."),

  num("TXK-19-03", "TX-19", "D", "hard",
    "The same transfer, but the DONOR agrees to bear the tax. What is the lifetime tax, in £?",
    37250, "£", 1,
    "£149,000 × 25% = £37,250. Where the donor pays, the tax is itself a transfer of value so it must be grossed up at 20/80 = 25%. The gross chargeable transfer then becomes £474,000 + £37,250 = £511,250 for cumulation purposes."),

  num("TXK-19-04", "TX-19", "D", "hard",
    "A CLT with a gross chargeable value of £474,000 was made 4 years and 3 months before death. Lifetime tax of £29,800 was paid and the nil rate band is £325,000. What further tax arises on death, in £?",
    5960, "£", 1,
    "(£474,000 − £325,000) × 40% = £59,600. Taper relief for 4 to 5 years is 40%, applied to the TAX: £59,600 × 60% = £35,760. Less the £29,800 of lifetime tax = £5,960."),

  q("TXK-19-05", "TX-19", "D", "hard",
    "How does taper relief operate?",
    [
      "It reduces the value of the transfer",
      "It reduces the TAX by 20% to 80% according to the years between transfer and death",
      "It reduces the nil rate band",
      "It exempts the transfer entirely after three years",
    ],
    1,
    "IT REDUCES THE TAX, NOT THE TRANSFER. Compute the tax at 40% first, then apply the taper percentage: 20% for 3 to 4 years, 40% for 4 to 5, 60% for 5 to 6 and 80% for 6 to 7. Under three years there is no reduction."),

  q("TXK-19-06", "TX-19", "D", "medium",
    "A donor makes a gift of £251 to a friend. What small gifts exemption is available?",
    [
      "£250, leaving £1 chargeable",
      "None — the exemption is all or nothing and the gift exceeds £250",
      "£251, as it is close enough",
      "£250, and the annual exemption covers the £1",
    ],
    1,
    "NONE. The small gifts exemption is ALL OR NOTHING: it exempts a gift of £250 entirely and a gift of £251 not at all. The annual exemption would have to cover it instead, and the two cannot be combined for the same gift."),

  q("TXK-19-07", "TX-19", "D", "medium",
    "How far may an unused annual exemption be carried forward?",
    ["Indefinitely", "One year only, with the current year's exemption used first", "Three years", "It cannot be carried forward"],
    1,
    "ONE YEAR ONLY, and the current year's £3,000 must be used before any brought forward. So a donor who has made no gifts for two years has £6,000 available, not £9,000."),

  q("TXK-19-08", "TX-19", "D", "easy",
    "What is the marriage exemption for a gift by a GRANDPARENT?",
    ["£5,000", "£2,500", "£1,000", "£250"],
    1,
    "£2,500. A PARENT may give £5,000, a grandparent or remoter ancestor £2,500, a party to the marriage £2,500, and anyone else £1,000. The exemption is conditional on the marriage actually taking place."),

  multi("TXK-19-09", "TX-19", "D", "medium",
    "Which exemptions are EXAMINABLE in TX? Select TWO.",
    [
      "Gifts to charities",
      "Normal expenditure out of income",
      "Gifts to political parties",
      "Gifts in consideration of marriage",
    ],
    [1, 3],
    "NORMAL EXPENDITURE OUT OF INCOME and MARRIAGE GIFTS. The five examinable exemptions are those two plus small gifts, the annual exemption and gifts between spouses. Gifts to charities, political parties and for national purposes are all EXCLUDED topics."),

  q("TXK-19-10", "TX-19", "D", "hard",
    "Which relief is an EXCLUDED topic in TX?",
    ["Taper relief", "Business property relief", "The annual exemption", "The transferable nil rate band"],
    1,
    "BUSINESS PROPERTY RELIEF — and agricultural property relief with it. Both are central to a practitioner's IHT and neither is examined in TX, so applying them produces an answer the marking guide does not recognise."),

  q("TXK-19-11", "TX-19", "D", "medium",
    "When is the death tax on a lifetime transfer due?",
    [
      "31 January following the tax year of death",
      "Six months after the end of the month of death",
      "Immediately on death",
      "Twelve months after death",
    ],
    1,
    "SIX MONTHS AFTER THE END OF THE MONTH OF DEATH. For a death on 20 September 2025 that is 31 March 2026. The primary liability falls on the donee, or the trustees for a CLT, with the estate liable if it goes unpaid."),

  q("TXK-19-12", "TX-19", "D", "hard",
    "Can the credit for lifetime tax paid produce a refund?",
    [
      "Yes, where taper relief reduces the death tax below the lifetime tax",
      "No — the credit can reduce the death tax to nil but never below",
      "Yes, but only within four years of death",
      "Only where the transfer was a PET",
    ],
    1,
    "NO REFUND. The credit can extinguish the death charge but cannot go below nil, so a large lifetime payment combined with substantial taper relief simply means no further tax — never a repayment."),
]

/* ── Chapter 20 · IHT the death estate ── */

const CH20: AccaQuestion[] = [
  num("TXK-20-01", "TX-20", "D", "hard",
    "An estate comprises a house worth £720,000 left to the deceased's daughter and other assets of £540,000. There was a £60,000 mortgage and £9,000 of funeral expenses. Gross chargeable transfers in the seven years before death were £120,000. The deceased's spouse died earlier leaving everything to them, so no nil rate bands were used. What is the inheritance tax, in £?",
    124400, "£", 1,
    "Net estate = £720,000 + £540,000 − £60,000 − £9,000 = £1,191,000. RNRB = £175,000 × 2 = £350,000, within the £720,000 house value. NRB = £325,000 × 2 = £650,000 less £120,000 of lifetime transfers = £530,000. Taxable = £1,191,000 − £350,000 − £530,000 = £311,000 × 40% = £124,400."),

  q("TXK-20-02", "TX-20", "D", "hard",
    "In what order are the two nil rate bands deducted?",
    [
      "The ordinary nil rate band first",
      "The RESIDENCE nil rate band first, because it can only be used against the residence",
      "Pro rata between them",
      "Whichever produces the lower tax",
    ],
    1,
    "THE RESIDENCE NIL RATE BAND FIRST. It can only be used against a residence passing to direct descendants, so using it first prevents it being wasted. The ordinary band can be used against anything, so it comes second."),

  q("TXK-20-03", "TX-20", "D", "hard",
    "A spouse died having used 40% of their nil rate band. What transfers to the survivor?",
    [
      "£130,000, being 40% of £325,000",
      "60% of the nil rate band in force at the SURVIVOR's death — £195,000 of the current £325,000",
      "The unused cash amount from the first death",
      "Nothing, unless the deaths were in the same tax year",
    ],
    1,
    "60% OF THE BAND AT THE SURVIVOR'S DEATH, so £195,000. The transfer is of the unused PROPORTION, not a cash amount, and it is applied to the band in force when the survivor dies — regardless of how large the band was at the first death."),

  num("TXK-20-04", "TX-20", "D", "medium",
    "What is the maximum total that a married couple can pass free of inheritance tax where both nil rate bands are fully available, in £?",
    1000000, "£", 1,
    "£650,000 of nil rate bands plus £350,000 of residence nil rate bands = £1,000,000. It requires a residence worth at least £350,000 passing to direct descendants, and both transfers must be claimed within two years of the second death."),

  q("TXK-20-05", "TX-20", "D", "medium",
    "What limits the residence nil rate band?",
    [
      "Nothing — it is always £175,000",
      "The value of the residence itself, and the requirement that it pass to DIRECT DESCENDANTS",
      "The size of the estate only",
      "The deceased's age at death",
    ],
    1,
    "THE VALUE OF THE RESIDENCE AND THE DESCENDANT REQUIREMENT. A house worth £120,000 gives only £120,000 of band, and a house left to a sibling or a friend gives none at all. Direct descendants means children, grandchildren and their spouses."),

  q("TXK-20-06", "TX-20", "D", "easy",
    "Which liability is deductible from the death estate?",
    [
      "A promise to pay a relative's school fees",
      "An outstanding mortgage on a property in the estate",
      "The inheritance tax itself",
      "A legacy to a friend",
    ],
    1,
    "AN OUTSTANDING MORTGAGE. A liability is deductible only if it was legally enforceable at death, so a mere promise is not. Reasonable funeral expenses are also deductible; legacies are distributions of the estate rather than liabilities."),

  q("TXK-20-07", "TX-20", "D", "hard",
    "Is the tapered withdrawal of the residence nil rate band examinable in TX?",
    [
      "Yes, where the estate exceeds £2 million",
      "No — the £2 million taper is an excluded topic",
      "Yes, at £1 for every £2 above £2 million",
      "Only for estates over £2.35 million",
    ],
    1,
    "NO, IT IS EXCLUDED. So the RNRB is never tapered in a TX question, however large the estate. Downsizing protection and nominating which of several residences qualifies are excluded too."),

  q("TXK-20-08", "TX-20", "D", "medium",
    "When is inheritance tax on the death estate due?",
    [
      "Six months after the end of the month of death only",
      "The EARLIER of six months after the end of the month of death and delivery of the estate account to HMRC",
      "Twelve months after death",
      "31 January following the tax year of death",
    ],
    1,
    "THE EARLIER OF THE TWO. So personal representatives who deliver the account early must pay early. Note this differs from the death tax on a LIFETIME transfer, which is simply six months after the end of the month of death."),

  q("TXK-20-09", "TX-20", "D", "hard",
    "Why is there a tension between gifting an appreciated asset and holding it until death?",
    [
      "Gifts are always more tax efficient",
      "A lifetime gift is a CGT disposal at market value, whereas death produces NO CGT and the beneficiary acquires at the death value",
      "IHT does not apply to lifetime gifts",
      "CGT is charged twice on a gift",
    ],
    1,
    "A GIFT TRIGGERS CGT; DEATH DOES NOT. Gifting removes the asset from the estate but crystallises a gain; holding until death wipes the accrued gain out entirely while exposing the full value to 40% IHT. Gift holdover relief is what resolves the tension for business assets."),

  multi("TXK-20-10", "TX-20", "D", "medium",
    "Which are sound basic inheritance tax planning points? Select TWO.",
    [
      "Leaving the residence to a sibling to use the residence nil rate band",
      "Using the £3,000 annual exemption every year, since it carries forward only one year",
      "Leaving everything to a spouse to avoid all tax permanently",
      "Making lifetime gifts early, so a PET becomes fully exempt after seven years",
    ],
    [1, 3],
    "USE THE ANNUAL EXEMPTION EVERY YEAR and GIFT EARLY. Leaving the residence to a sibling WASTES the RNRB, which requires a direct descendant. And leaving everything to a spouse defers rather than avoids — though since both bands are now transferable, that is far less damaging than it once was."),
]

export const TX_KIT_AREA_C: AccaQuestion[] = [...CH15, ...CH16, ...CH17, ...CH18]
export const TX_KIT_AREA_D: AccaQuestion[] = [...CH19, ...CH20]
