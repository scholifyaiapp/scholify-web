import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * TX-UK · Section C constructed-response questions, third file — the practice bank.
 *
 * acca-written-tx-kit.ts and -kit2.ts hold nine questions between them: three 10-markers and
 * six 15-markers, which is exactly three disjoint mock sittings of 10 + 15 + 15. That is the
 * structural minimum and it is much too shallow for PRACTICE.
 *
 * Section C is 40 of TX's 100 marks. A learner who has sat three mocks would have nothing
 * left to work on and the AI Examiner nothing left to mark, so this file adds six more — two
 * at 10 marks and four at 15 — taking the bank to fifteen. The mock composer shuffles the
 * whole bank per form and fills each Section C greedily to 40 marks, so deepening the bank
 * does not disturb the three mocks' composition.
 *
 * All figures are FA2025 and were verified by script. No question applies an excluded topic.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

const Q10: WrittenQuestion = {
  id: "TXW-10",
  paper: "TX",
  area: "B",
  chapter: "TX-08",
  topic: "A full benefits package, the personal allowance abatement and the employer's cost",
  maxMarks: 15,
  stem:
    "Ivar Bergström is employed by Rönnskär Ltd on a salary of £82,000 for 2025/26. His employer provides the following.\n\n  A petrol company car available all year, list price £48,000, CO2 emissions 148 g/km. The company pays for all fuel including private motoring, and Ivar makes no reimbursement.\n\n  A house, available all year and not job-related. Rönnskär bought it for £340,000 in 2022 and spent £25,000 on an extension completed in February 2025. Its annual value is £7,400 and its current market value is £430,000. Ivar pays no rent.\n\nThe official rate of interest is 3.75%. Ivar has no other income and makes no gift aid donations or pension contributions.\n\nRequired:\n\n(a) Calculate Ivar's total taxable benefits for 2025/26. (7 marks)\n\n(b) Calculate Ivar's income tax liability. (5 marks)\n\n(c) Calculate the employer's Class 1A national insurance on the benefits, state when it is due, and explain briefly how a pension contribution by Ivar would have improved his position. (3 marks)",
  rubric: [
    "(a) Car: emissions rounded DOWN to 145 g/km, so the appropriate percentage is 17% at the 55 g base plus (145 − 55)/5 = 18 increments = 35%. Benefit £48,000 × 35% = £16,800 (2 marks).",
    "(a) Fuel: £28,200 × 35% = £9,870. Credit for using the fixed £28,200 base figure rather than the list price, and for noting that partial reimbursement would not have reduced it (2 marks).",
    "(a) Accommodation basic charge: the higher of the £7,400 annual value and rent paid by the employer, which is nil = £7,400 (1 mark).",
    "(a) Expensive accommodation charge: cost of providing = £340,000 + £25,000 of improvements completed BEFORE the start of 2025/26 = £365,000. (£365,000 − £75,000) × 3.75% = £10,875. Credit for using COST rather than the £430,000 market value, the employer having owned it for less than six years before first providing it (2 marks).",
    "(a) Total benefits = £16,800 + £9,870 + £7,400 + £10,875 = £44,945 (marks embedded above).",
    "(b) Employment income = £82,000 + £44,945 = £126,945. Adjusted net income exceeds £125,140, so the personal allowance is NIL and taxable income is the full £126,945 (2 marks).",
    "(b) £37,700 at 20% = £7,540; then £125,140 − £37,700 = £87,440 at 40% = £34,976; then £126,945 − £125,140 = £1,805 at 45% = £812.25. Liability £43,328.25 (3 marks).",
    "(c) Class 1A = £44,945 × 15% = £6,741.75, payable by 22 July 2026. Credit for noting it falls on the employer alone, benefits carrying no employee Class 1 (2 marks).",
    "(c) A pension contribution would reduce adjusted net income and so restore personal allowance. Ivar is only £1,805 above £125,140, so a gross contribution of £3,610 would take him back to £125,140 and restore £1,805 of allowance — relief at an effective rate far above 45% on that slice. Credit for identifying the mechanism and quantifying the contribution needed (1 mark).",
    "Presentation: the benefits listed separately with workings, the two accommodation charges distinguished, and the additional rate reached rather than stopping at 40% — which would give £43,238 and is the commonest error here.",
  ],
}

const Q11: WrittenQuestion = {
  id: "TXW-11",
  paper: "TX",
  area: "E",
  chapter: "TX-25",
  topic: "Group relief across non-coterminous periods, and the three group relationships",
  maxMarks: 15,
  stem:
    "Storforsen Ltd owns 80% of Malmberg Ltd, and Malmberg owns 80% of Gällivare Ltd. Storforsen also owns 55% of Kiruna Ltd. All four are UK resident and trading, and none is dormant.\n\nStorforsen prepares accounts to 31 March and has taxable total profits of £148,000 for the year ended 31 March 2026.\n\nMalmberg prepares accounts to 30 September and has a trading loss of £210,000 for the year ended 30 September 2026.\n\nGällivare has capital losses of £90,000 brought forward and no current profits. Storforsen expects to realise a chargeable gain of £140,000 on selling a warehouse in 2026.\n\nRequired:\n\n(a) Identify, with reasons, which companies are in the 51% associated company group, which are in the 75% group relief group, and which are in the 75% chargeable gains group. (6 marks)\n\n(b) Calculate the maximum group relief Storforsen may claim from Malmberg for the year ended 31 March 2026. (5 marks)\n\n(c) Advise how the group could use Gällivare's capital losses against Storforsen's expected gain, and explain why group relief cannot achieve this. (4 marks)",
  rubric: [
    "(a) 51% ASSOCIATED COMPANIES: all four. Storforsen controls Malmberg (80%), Gällivare indirectly (80% × 80% = 64%, which exceeds 51%) and Kiruna (55%). So the £50,000 and £250,000 limits and the £1,500,000 instalment threshold are all divided by FOUR (2 marks).",
    "(a) 75% GROUP RELIEF GROUP: Storforsen and Malmberg only. The effective interest in Gällivare is 64%, which fails the 75% EFFECTIVE test, and Kiruna at 55% fails it outright (2 marks).",
    "(a) 75% CHARGEABLE GAINS GROUP: Storforsen, Malmberg and Gällivare. Each link is at least 75% and Storforsen's effective interest in Gällivare of 64% EXCEEDS 50%, which is all a gains group requires. Kiruna is excluded, 55% being below 75% at the link (2 marks).",
    "(b) Identifies the overlapping period. Malmberg's loss period runs 1 October 2025 to 30 September 2026; Storforsen's period runs 1 April 2025 to 31 March 2026. They overlap from 1 October 2025 to 31 March 2026 — SIX months (2 marks).",
    "(b) Restricts the surrendering company's loss to the overlap: £210,000 × 6/12 = £105,000 (1 mark).",
    "(b) Restricts the claimant's profits to the overlap: £148,000 × 6/12 = £74,000 (1 mark).",
    "(b) Relief is the LOWER of the two restricted figures, so £74,000. Credit for stating that both restrictions apply — using either figure unrestricted overstates the relief — and that the claim may be for any amount up to that, group relief being partial-claimable unlike the surrendering company's own current period claim (1 mark).",
    "(c) A CAPITAL loss can never be surrendered as group relief. Group relief covers current period trading losses, excess property losses and excess QCDs — and brought forward trading losses — but not capital losses (2 marks).",
    "(c) The gains group achieves the same result differently: TRANSFER THE WAREHOUSE to Gällivare before the sale. Intra-group transfers within a 75% gains group are automatically and mandatorily at NO GAIN, NO LOSS, so the transfer itself is tax-free, and the gain then arises in Gällivare where the capital losses sit (2 marks).",
    "Credit for observing that Gällivare is in the GAINS group but not the group relief group, which is precisely why the asset must move rather than the loss — the two 75% definitions differ and this scenario turns on the difference.",
  ],
}

const Q12: WrittenQuestion = {
  id: "TXW-12",
  paper: "TX",
  area: "C",
  chapter: "TX-18",
  topic: "Choosing between rollover relief, gift relief and business asset disposal relief",
  maxMarks: 15,
  stem:
    "Sigrun Vollan has run an engineering business as a sole trader for fourteen years. She is considering three transactions and wants advice before committing to any of them.\n\n1. Selling her factory for £680,000. It cost £310,000 and she would realise a gain of £220,000 after costs. She would reinvest £625,000 in a replacement factory within eight months.\n\n2. Giving her son the business's warehouse, worth £480,000, which cost £190,000. He would pay her nothing.\n\n3. Selling the whole business, which would realise a gain of £1,340,000. She has made no previous claims for business asset disposal relief.\n\nSigrun's taxable income is £62,000 and she has no capital losses.\n\nRequired:\n\n(a) Calculate the gain chargeable now, and the base cost of the replacement, if Sigrun sells the factory and reinvests as described. (5 marks)\n\n(b) Explain how gift holdover relief would apply to the warehouse, and state the effect on her son. (4 marks)\n\n(c) Calculate the capital gains tax on selling the whole business, and explain why rollover relief is not an alternative there. (6 marks)",
  rubric: [
    "(a) Rollover relief is available: both old and new assets are within the qualifying classes — land and buildings used in the trade — and the replacement falls inside the window of one year before to three years after (2 marks).",
    "(a) Proceeds not reinvested = £680,000 − £625,000 = £55,000. The amount chargeable IMMEDIATELY is the LOWER of the gain (£220,000) and the proceeds not reinvested (£55,000), so £55,000 (2 marks).",
    "(a) Gain rolled over = £220,000 − £55,000 = £165,000, deducted from the replacement's cost: base cost £625,000 − £165,000 = £460,000. The deferred gain resurfaces when the replacement is sold (1 mark).",
    "(b) Gift holdover relief applies: the warehouse is a qualifying BUSINESS asset used in Sigrun's trade, and the transferor is an individual. A JOINT claim by Sigrun and her son is required (2 marks).",
    "(b) The gift is a chargeable disposal at MARKET VALUE, so the gain is £480,000 − £190,000 = £290,000 — and Sigrun has received no cash with which to pay tax on it, which is exactly why the relief exists (1 mark).",
    "(b) The gain is held over and her son's base cost is REDUCED to £190,000, so the tax is deferred into his hands rather than removed. Credit for noting that no consideration is paid, so there is no restriction — had he paid more than the £190,000 original cost, the excess would have been chargeable on Sigrun immediately (1 mark).",
    "(c) Business asset disposal relief applies: the whole of a trading business owned for at least two years, with the full £1,000,000 lifetime limit available (1 mark).",
    "(c) £1,000,000 at 14% = £140,000. The remaining £340,000 is taxed at the normal rate — taxable income of £62,000 exceeds £37,700 so no basic rate band remains — at 24% = £81,600 (2 marks).",
    "(c) The £3,000 annual exempt amount is best set against the gain taxed at 24% rather than the BADR slice at 14%, saving 24p rather than 14p in the pound. So £337,000 at 24% = £80,880 and total CGT = £220,880 (2 marks).",
    "(c) Rollover relief is not an alternative because Sigrun is not REPLACING anything — she is exiting. Rollover defers a gain into the cost of a replacement business asset, and with no reinvestment there is nothing to defer it into. Credit for the general point: where cash is taken and not reinvested, the only reliefs available are rate reductions, not deferrals (1 mark).",
    "Credit throughout for using 14% rather than the superseded 10% for business asset disposal relief — at 10% the answer to (c) would be £180,880, understating the liability by £40,000.",
  ],
}

const Q13: WrittenQuestion = {
  id: "TXW-13",
  paper: "TX",
  area: "D",
  chapter: "TX-20",
  topic: "The death estate, the residence nil rate band and lifetime planning",
  maxMarks: 15,
  stem:
    "Torvald Nesse died on 22 November 2025, having never married. His estate comprised:\n\n  His house, worth £760,000, left to his nephew\n  Quoted shares and cash, worth £430,000, left to his two children equally\n  An outstanding mortgage on the house of £95,000\n  Funeral expenses of £6,000\n\nTorvald had made no lifetime transfers at all.\n\nRequired:\n\n(a) Calculate the inheritance tax on Torvald's death estate. (6 marks)\n\n(b) Explain how the position would have differed had Torvald left the house to his children and the shares and cash to his nephew, and quantify the difference. (5 marks)\n\n(c) Explain three steps Torvald could have taken during his lifetime to reduce the inheritance tax, with the reasoning for each. (4 marks)",
  rubric: [
    "(a) Net estate = £760,000 + £430,000 − £95,000 mortgage − £6,000 funeral = £1,089,000. Both deductions are allowable, the mortgage being legally enforceable at death and the funeral costs reasonable (2 marks).",
    "(a) Residence nil rate band: NOT available. The house passes to a NEPHEW, who is not a direct descendant — direct descendants means children, grandchildren and their spouses. So the whole £175,000 is lost (2 marks).",
    "(a) Nil rate band: the full £325,000, there being no lifetime transfers in the seven years before death. Torvald never married, so there is no transferred band (1 mark).",
    "(a) Taxable estate = £1,089,000 − £325,000 = £764,000, at 40% = £305,600 (1 mark).",
    "(b) Swapping the legacies makes the RNRB available, because the house would then pass to direct descendants. It is capped at the value of the residence, and £760,000 far exceeds £175,000, so the full £175,000 is available (2 marks).",
    "(b) Taxable estate would be £1,089,000 − £175,000 − £325,000 = £589,000, at 40% = £235,600 (2 marks).",
    "(b) The saving is £305,600 − £235,600 = £70,000, being £175,000 × 40%. Credit for observing that the total value passing is IDENTICAL — only who receives which asset changes — so this is £70,000 of tax turning entirely on the drafting of the will (1 mark).",
    "(c) LEAVE THE RESIDENCE TO DIRECT DESCENDANTS, for the reason in (b): the £175,000 band is simply lost otherwise, and it costs nothing to secure (1 mark).",
    "(c) USE THE £3,000 ANNUAL EXEMPTION EVERY YEAR. It carries forward only one year, so an unused exemption is lost, and it removes value with no seven-year wait at all (1 mark).",
    "(c) MAKE LIFETIME GIFTS EARLY. A PET becomes fully exempt after seven years and taper relief begins to help after three, so the value of a gift is a function of remaining life expectancy. Credit also for small gifts of £250 per recipient, normal expenditure out of income, or gifts in consideration of marriage (1 mark).",
    "(c) Credit for the counterpoint that a lifetime gift is a chargeable disposal for CGT at market value, whereas death produces no CGT at all — so gifting an appreciated asset trades an IHT saving for a CGT charge, and gift holdover relief is what resolves that for business assets (1 mark).",
  ],
}

const Q14: WrittenQuestion = {
  id: "TXW-14",
  paper: "TX",
  area: "F",
  chapter: "TX-27",
  topic: "Choosing between the VAT special schemes",
  maxMarks: 10,
  stem:
    "Three unconnected businesses have asked for advice on the VAT special schemes.\n\n1. Kvarnby Interiors is a decorating business with VAT-inclusive turnover of £96,000 a year, all standard-rated and all to private households. Its purchases of materials are small and it has almost no other input tax. Its flat rate percentage would be 12%.\n\n2. Lindesberg Components sells to VAT-registered manufacturers, gives 75 days' credit and has taxable turnover of £1,180,000. It suffers occasional bad debts and finds funding the VAT before being paid difficult.\n\n3. Notviken Foods has taxable turnover of £1,290,000, stable month to month, and finds the quarterly VAT return an administrative burden on a small finance team.\n\nRequired:\n\n(a) For each business, state which scheme (if any) you would recommend, and give your reasons. (7 marks)\n\n(b) Calculate the VAT payable by Kvarnby Interiors under the flat rate scheme, and state one circumstance in which the scheme would cease to be available to it. (3 marks)",
  rubric: [
    "(a) Kvarnby: recommend the FLAT RATE SCHEME. Expected taxable turnover excluding VAT is below the £150,000 joining threshold, and because its input tax is minimal it loses little by forgoing recovery while gaining a substantial simplification (2 marks).",
    "(a) Lindesberg: recommend CASH ACCOUNTING. Taxable turnover of £1,180,000 is within the £1,350,000 joining threshold, and 75 days' credit means it currently funds output VAT long before being paid. Cash accounting also removes the need for impairment loss relief, since unpaid invoices never enter a return (3 marks).",
    "(a) Notviken: recommend ANNUAL ACCOUNTING. Turnover of £1,290,000 is within the £1,350,000 threshold, and stable turnover suits nine monthly payments on account of 10% of the previous year's liability with one annual return — which is the administrative saving it is asking for (2 marks).",
    "(a) Credit for noting that the flat rate scheme may be combined with annual accounting but NOT with cash accounting, and for observing that a business with FALLING turnover would overpay under annual accounting during the year.",
    "(b) £96,000 × 12% = £11,520. The percentage is applied to VAT-INCLUSIVE TOTAL turnover, and no input VAT is recovered (2 marks).",
    "(b) The scheme ceases to be available once VAT-inclusive turnover exceeds £230,000. Credit also for a VAT offence in the previous 12 months, or for the business's input tax growing enough that recovery would be worth more than the simplification (1 mark).",
    "No credit for recommending cash accounting to Kvarnby: its customers are private households paying at the point of sale, so there is no credit period to fund and the scheme achieves nothing.",
    "No credit for recommending the flat rate scheme to Lindesberg or Notviken — both are far above its £150,000 joining threshold.",
    "Credit for stating each threshold used rather than merely naming the scheme, since the eligibility test is the substance of the advice.",
  ],
}

const Q15: WrittenQuestion = {
  id: "TXW-15",
  paper: "TX",
  area: "B",
  chapter: "TX-11",
  topic: "Capital allowances, and the incorporation comparison they drive",
  maxMarks: 10,
  stem:
    "Ragnhild Fossum is a sole trader preparing accounts to 31 March. For the year ended 31 March 2026 her tax adjusted trading profit before capital allowances was £560,000. The main pool balance brought forward was £52,000.\n\nDuring the year she bought:\n\n  Machinery                                                    £905,000\n  Integral features for the workshop                            £95,000\n  A second-hand car with zero CO2 emissions, wholly business    £120,000\n\nShe also sold machinery for £18,000 that had originally cost £26,000.\n\nRagnhild is considering incorporating the business and asks whether that would change the allowances available.\n\nRequired:\n\n(a) Calculate the capital allowances for the year ended 31 March 2026. (7 marks)\n\n(b) Explain how the allowances would differ if the business were incorporated, and whether that alone justifies incorporating. (3 marks)",
  rubric: [
    "(a) AIA allocated to the SPECIAL RATE pool first: £95,000 to the integral features, leaving £905,000 of the £1,000,000 limit, which exactly covers the machinery. Nothing joins the special rate pool and nothing of the machinery joins the main pool (3 marks).",
    "(a) The second-hand zero-emission car gets an 18% WDA in the MAIN POOL, not a 100% first year allowance — the FYA is available only on a NEW zero-emission car. It is used wholly for business, so no private use restriction arises (2 marks).",
    "(a) Main pool: £52,000 brought forward + £120,000 car − the disposal at the LOWER of cost (£26,000) and proceeds (£18,000), so £52,000 + £120,000 − £18,000 = £154,000. WDA at 18% = £27,720 (1 mark).",
    "(a) Total capital allowances = £95,000 + £905,000 + £27,720 = £1,027,720. Credit for a coherent total consistent with the workings (1 mark).",
    "(b) A COMPANY would have FULL EXPENSING available: a 100% first year allowance on new main pool plant with NO monetary cap, plus a 50% FYA on new special rate expenditure. Both are companies-only and are on the exam's rate sheet (2 marks).",
    "(b) On these figures the difference is small, because the £1,000,000 AIA already covers the £1,000,000 of qualifying expenditure — so incorporation would change almost nothing here. It would matter greatly at, say, £3,000,000 of new plant, where a sole trader is capped at £1,000,000 and a company relieves all of it immediately (1 mark).",
    "(b) Credit for the conclusion that capital allowances ALONE do not justify incorporating on these facts, and for naming what would actually decide it — the corporation tax rate against her marginal income tax rate, the national insurance saving on taking dividends rather than salary, the loss of the annual exempt amount and business asset disposal relief on a company's gains, and the administrative cost.",
    "No credit for giving the second-hand zero-emission car a 100% first year allowance. That is the trap this question is built around, and it overstates the allowances by £92,280.",
    "No credit for allocating the AIA to the main pool first: the special rate pool would then be written down at only 6% a year, and the ordering is worth real money.",
  ],
}

export const TX_WRITTEN_KIT3: WrittenQuestion[] = [Q10, Q11, Q12, Q13, Q14, Q15]
