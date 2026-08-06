import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * FR · Section C constructed-response questions, second file — questions 9 to 15.
 *
 * Together with acca-written-fr-kit.ts this brings the bank to FIFTEEN. Six would be exactly
 * three disjoint mock sittings of two, which is the structural floor; fifteen is a practice
 * bank for the section that carries 40 of FR's 100 marks.
 *
 * The mock composer shuffles the whole bank per form and fills each Section C to 40 marks,
 * so deepening the bank does not disturb the three mocks' composition.
 *
 * This file leans towards the topics the first file left thinner: financial instruments,
 * deferred tax presentation, provisions and events after the reporting period, revenue
 * judgements, and the framework applied to a policy dispute. Q10 deliberately produces a
 * deferred tax CREDIT in profit or loss, because a candidate who has only ever seen a charge
 * will assume they have made a sign error.
 *
 * Every figure verified by script before authoring.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

const Q09: WrittenQuestion = {
  id: "FRW-09",
  paper: "FR",
  area: "B",
  chapter: "FR-18",
  topic: "Financial instruments: a convertible, a discounted bond and an equity investment",
  maxMarks: 20,
  stem:
    "Wigeon Co entered into three financing transactions during the year ended 31 December 20X6.\n\n" +
    "(1) On 1 January 20X6 it issued $12,000,000 of 5% convertible bonds at par, redeemable at par in three years or convertible into ordinary shares at the holder's option. The market rate for similar bonds WITHOUT the conversion option is 8.5%. The three-year annuity factor at 8.5% is 2.673 and the three-year discount factor is 0.786.\n\n" +
    "(2) On 1 January 20X6 it issued a bond with a nominal value of $10,000,000 and a 5.5% annual coupon, redeemable at par in four years. Net proceeds after issue costs were $9,250,000 and the effective interest rate is 9%.\n\n" +
    "(3) On 1 July 20X6 it bought 120,000 shares in a listed company at $8.75 each, incurring transaction costs of $14,000. The shares are not held for trading and Wigeon made the irrevocable election to present fair value changes in other comprehensive income. A dividend of $9,000 was received in November, and the shares were quoted at $9.40 at the year end.\n\n" +
    "The finance director has recorded all three instruments at the cash amounts involved and has charged the coupons and credited the dividend to profit or loss.\n\n" +
    "Required:\n\n" +
    "(a) Explain and calculate the correct treatment of the convertible bonds on issue and for the year ended 31 December 20X6. (8 marks)\n\n" +
    "(b) Calculate the finance cost and closing liability for the second bond, and explain how the issue costs are dealt with. (6 marks)\n\n" +
    "(c) Explain and calculate the correct treatment of the equity investment, and state what would have differed had the election not been made. (6 marks)",
  rubric: [
    "(a) The convertible is a COMPOUND instrument containing both a liability and an equity component, which IAS 32 requires to be presented separately. Recording the whole $12,000,000 as debt overstates liabilities and understates equity, worsening gearing on both numerator and denominator (2 marks).",
    "(a) Liability component measured FIRST at the present value of the cash flows the entity would have to pay if nobody converted, discounted at the rate for similar NON-convertible debt: interest $600,000 × 2.673 = $1,603,800 plus principal $12,000,000 × 0.786 = $9,432,000, giving $11,035,800. Credit for using 8.5% and not the 5% coupon (3 marks).",
    "(a) Equity component is the RESIDUAL: $12,000,000 − $11,035,800 = $964,200, credited to equity and never remeasured (1 mark).",
    "(a) Finance cost for 20X6 = $11,035,800 × 8.5% = $938,043, not the $600,000 coupon paid. Closing liability $11,035,800 + $938,043 − $600,000 = $11,373,843. So profit is overstated by $338,043 in the director's version (2 marks).",
    "(b) The bond is measured at AMORTISED COST. Finance cost = the effective rate on the carrying amount: $9,250,000 × 9% = $832,500. The coupon PAID is $10,000,000 × 5.5% = $550,000, computed on NOMINAL value. Closing liability $9,250,000 + $832,500 − $550,000 = $9,532,500 (3 marks).",
    "(b) Credit for keeping the two bases apart: the coupon on NOMINAL, the effective rate on CARRYING AMOUNT. Charging the $550,000 coupon understates the finance cost by $282,500 (1 mark).",
    "(b) The issue costs of $750,000 are DEDUCTED from the initial carrying amount of the liability — which is why the liability is recognised at net proceeds — and are recovered through the higher effective rate over the bond's life. They are neither capitalised as an asset nor expensed immediately (2 marks).",
    "(c) Under the FVTOCI election, transaction costs are ADDED to the initial carrying amount: $120,000 × $8.75 = $1,050,000 + $14,000 = $1,064,000. Credit for adding rather than expensing them (2 marks).",
    "(c) At the year end the shares are remeasured to 120,000 × $9.40 = $1,128,000, giving a gain of $64,000 in OTHER COMPREHENSIVE INCOME — an item that will NEVER be reclassified to profit or loss (2 marks).",
    "(c) The $9,000 DIVIDEND goes to PROFIT OR LOSS even under the election. Only the fair value movement goes to OCI, and candidates who assume everything about a FVTOCI asset bypasses profit lose this point (1 mark).",
    "(c) Had the election not been made, the asset would be at FVTPL: the $14,000 of transaction costs would be EXPENSED, the gain would be $1,128,000 − $1,050,000 = $78,000 in PROFIT OR LOSS, and any gain on eventual disposal would also pass through profit. Under the election there is no recycling, ever — so the disposal gain never reaches profit (1 mark).",
  ],
}

const Q10: WrittenQuestion = {
  id: "FRW-10",
  paper: "FR",
  area: "B",
  chapter: "FR-20",
  topic: "Current and deferred tax, including a deferred tax credit",
  maxMarks: 20,
  stem:
    "Pintail Co is preparing its financial statements for the year ended 31 December 20X6. The corporation tax rate is 25%, enacted and expected to apply to future periods. The opening deferred tax liability was $290,000.\n\n" +
    "At 31 December 20X6:\n\n" +
    "  Property, plant and equipment: carrying amount $6,800,000, tax base $5,100,000\n" +
    "  Capitalised development costs: carrying amount $520,000, tax base nil\n" +
    "  Interest receivable accrued: carrying amount $90,000, taxed when received\n" +
    "  Warranty and restructuring provisions: carrying amount $680,000, deductible when paid\n\n" +
    "During the year Pintail revalued a property upwards by $900,000, with no corresponding change to its tax base. This revaluation is included in the property, plant and equipment figures above.\n\n" +
    "The current tax estimate for 20X6 is $1,240,000. The 20X5 statement of financial position showed a current tax liability of $1,090,000 and the amount finally agreed and paid was $1,135,000. Pintail also has $400,000 of unused tax losses in an overseas branch which has been loss-making for four consecutive years with no forecast of profitability.\n\n" +
    "Required:\n\n" +
    "(a) Calculate the closing deferred tax liability and show how it is split between profit or loss and other comprehensive income. (10 marks)\n\n" +
    "(b) Calculate the total tax expense recognised in profit or loss for 20X6. (5 marks)\n\n" +
    "(c) Explain the treatment of the overseas branch's unused tax losses. (5 marks)",
  rubric: [
    "(a) Temporary differences: PPE $6,800,000 − $5,100,000 = $1,700,000 TAXABLE; development costs $520,000 TAXABLE; interest receivable $90,000 TAXABLE; provisions $680,000 DEDUCTIBLE because the signs reverse for a liability (4 marks).",
    "(a) Net taxable temporary difference $1,700,000 + $520,000 + $90,000 − $680,000 = $1,630,000. Closing deferred tax liability $1,630,000 × 25% = $407,500 (2 marks).",
    "(a) The revaluation element: $900,000 × 25% = $225,000, charged to OTHER COMPREHENSIVE INCOME because the surplus that gave rise to it was recognised there. Deferred tax always follows the item that gave rise to it (2 marks).",
    "(a) The remainder relates to items recognised in profit or loss: $730,000 × 25% = $182,500. Check: $182,500 + $225,000 = $407,500 (1 mark).",
    "(a) The movement in the total liability is $407,500 − $290,000 = $117,500. Of that, $225,000 is charged to OCI, so the amount taken to PROFIT OR LOSS is $117,500 − $225,000 = a CREDIT of $107,500. Full credit for reaching a credit and stating it as such — a candidate who assumes deferred tax must be a charge will have made a sign error somewhere, and this is the question that exposes it (1 mark).",
    "(b) Current tax for the year $1,240,000 (1 mark).",
    "(b) The prior year was provided at $1,090,000 and settled at $1,135,000, so the provision was too LOW by $45,000 — an UNDER-provision, ADDED to this year's expense. It is a change in estimate, never a prior period error (2 marks).",
    "(b) Total tax expense in profit or loss = $1,240,000 + $45,000 − $107,500 deferred tax credit = $1,177,500. A separate charge of $225,000 appears in other comprehensive income (2 marks).",
    "(c) A deferred tax ASSET could in principle arise on the $400,000 of unused losses, at $100,000. But deferred tax assets carry a recognition condition that liabilities do not: they are recognised only to the extent it is PROBABLE that taxable profit will be available against which the losses can be used (2 marks).",
    "(c) On these facts that condition is NOT met. Four consecutive loss-making years and no forecast of profitability is strong evidence against probable future taxable profits, and the existence of losses is itself evidence that they may not be usable. So NO deferred tax asset is recognised (2 marks).",
    "(c) The assessment is revisited at each reporting date, so the asset would be recognised in a later period if the branch returned to profitability and future profits became probable. Credit also for noting that the losses may not be usable against the profits of other jurisdictions in any event (1 mark).",
    "No credit for netting the unrecognised deferred tax asset against the liability, for putting the revaluation's deferred tax through profit or loss, or for deducting the under-provision.",
  ],
}

const Q11: WrittenQuestion = {
  id: "FRW-11",
  paper: "FR",
  area: "B",
  chapter: "FR-17",
  topic: "Provisions, contingencies and events after the reporting period",
  maxMarks: 20,
  stem:
    "Garganey Co has a 31 December 20X6 year end; its financial statements will be authorised on 20 March 20X7. Five matters are outstanding.\n\n" +
    "(1) Garganey sold 300,000 units during the year, each carrying a one-year warranty. Experience indicates 88% will require no work, 9% will need minor repairs costing $40 and 3% will need replacement costing $220.\n\n" +
    "(2) On 12 December 20X6 the board resolved to close its northern division at an estimated cost of $2,400,000, comprising $1,500,000 of redundancy payments, $600,000 of lease termination penalties and $300,000 of retraining for staff who will move to other divisions. No announcement had been made by the year end; the plan was announced to staff on 9 January 20X7.\n\n" +
    "(3) Garganey is obliged to decommission a plant in ten years at an estimated cost of $1,500,000. The discount rate is 10% and the ten-year discount factor is 0.386. The plant was brought into use on 1 January 20X6.\n\n" +
    "(4) A customer is suing Garganey for $3,000,000. Garganey's lawyers consider it 30% likely that the claim will succeed. Garganey is separately suing a supplier for $800,000 and its lawyers consider success probable.\n\n" +
    "(5) On 2 February 20X7 Garganey's bank withdrew its facilities and the directors concluded that the company could not continue trading.\n\n" +
    "Required:\n\n" +
    "For each matter, explain the required treatment and calculate any amounts to be recognised. (20 marks)",
  rubric: [
    "(1) A large POPULATION of similar obligations, so EXPECTED VALUE applies: (9% × $40) + (3% × $220) = $3.60 + $6.60 = $10.20 a unit, times 300,000 = a provision of $3,060,000. Using the most likely outcome would give NIL, because 88% require no work (3 marks).",
    "(1) Credit for confirming the criteria: a present obligation from the past event of the sale, an outflow probable across the population, and past experience making a reliable estimate possible (1 mark).",
    "(2) NO PROVISION at 31 December 20X6. A board decision alone creates no obligation, because the board could reverse it — the entity retains a practical ability to avoid the cost. The obligation arose on 9 January 20X7, when the announcement raised a valid expectation in those affected (2 marks).",
    "(2) The announcement is a NON-ADJUSTING event after the reporting period: it reflects a condition arising after the reporting date. Disclose the nature of the event and an estimate of its financial effect (1 mark).",
    "(2) When the provision IS recognised in 20X7, the $300,000 of RETRAINING must be excluded — it relates to the future conduct of the business, and IAS 37 permits only direct expenditure necessarily entailed by the restructuring and not associated with ongoing activities. So $2,100,000, not $2,400,000 (2 marks).",
    "(3) The decommissioning provision is recognised at PRESENT VALUE: $1,500,000 × 0.386 = $579,000, and IAS 16 requires it to be ADDED TO THE COST of the plant rather than expensed (2 marks).",
    "(3) The discount unwinds at 10%: $579,000 × 10% = $57,900, charged as a FINANCE COST, taking the provision to $636,900. Credit for the classification as finance cost rather than an operating expense, and for noting the $579,000 is also depreciated over the plant's ten-year life (2 marks).",
    "(4) The claim AGAINST Garganey: at 30% the outflow is POSSIBLE but not probable, so no provision arises and a contingent liability is DISCLOSED. Probability weighting a single obligation — $900,000 — is wrong, because expected value is for populations (2 marks).",
    "(4) The claim BY Garganey: a probable inflow is a contingent asset, DISCLOSED but not recognised. It would be recognised only when virtually certain, at which point it ceases to be contingent. Credit for identifying the ASYMMETRY — a probable outflow is provided for while a probable inflow is only disclosed (2 marks).",
    "(5) The GOING CONCERN determination overrides the ordinary adjusting/non-adjusting analysis. Although the bank's withdrawal is an event after the reporting period, IAS 10 requires that where management determines the entity is no longer a going concern, the financial statements are NOT prepared on the going concern basis (2 marks).",
    "(5) So the basis of preparation changes: assets are written down to realisable amounts, the current/non-current distinction loses meaning, liabilities may crystallise early, and the fact, the basis used and the reason must all be disclosed. Credit for identifying the override rather than classifying the event as non-adjusting (1 mark).",
    "Credit throughout for dealing with each matter under its own heading and stating the treatment BEFORE the arithmetic.",
  ],
}

const Q12: WrittenQuestion = {
  id: "FRW-12",
  paper: "FR",
  area: "D",
  chapter: "FR-25",
  topic: "Statement of cash flows, and advising a lender",
  maxMarks: 20,
  stem:
    "Shelduck Co has applied to its bank for a $3,000,000 five-year loan. The bank has asked you to analyse the cash position. Shelduck reports profit before tax of $2,860,000 for the year ended 31 December 20X6 and profit after tax of $2,120,000.\n\n" +
    "  Depreciation charge for the year                         $940,000\n" +
    "  Loss on disposal of plant                                 $55,000\n" +
    "  Finance costs charged                                    $265,000\n" +
    "  Increase in inventory                                    $320,000\n" +
    "  Increase in trade receivables                            $410,000\n" +
    "  Increase in trade payables                               $185,000\n" +
    "  PPE carrying amount: opening $9,600,000, closing $11,200,000\n" +
    "  Carrying amount of plant disposed of                     $290,000\n" +
    "  Current tax: opening $560,000, closing $610,000, charge $740,000\n" +
    "  Interest payable: opening $40,000, closing $75,000\n" +
    "  Retained earnings: opening $6,300,000, closing $7,520,000\n" +
    "  New long-term borrowings raised                        $1,400,000\n\n" +
    "There were no revaluations and no shares were issued. Revenue grew from $22,000,000 to $28,500,000.\n\n" +
    "Required:\n\n" +
    "(a) Prepare the statement of cash flows for the year ended 31 December 20X6. (13 marks)\n\n" +
    "(b) Advise the bank whether the requested loan should be granted, using your statement and the other information given. (7 marks)",
  rubric: [
    "(a) Cash generated from operations: $2,860,000 + $940,000 + $55,000 loss on disposal + $265,000 finance costs − $320,000 inventory − $410,000 receivables + $185,000 payables = $3,575,000 (4 marks).",
    "(a) Interest paid $40,000 + $265,000 − $75,000 = $230,000. Tax paid $560,000 + $740,000 − $610,000 = $690,000. Net cash from operating activities $3,575,000 − $230,000 − $690,000 = $2,655,000 (3 marks).",
    "(a) PPE additions: $11,200,000 − $9,600,000 + $940,000 + $290,000 = $2,830,000. Proceeds on disposal $290,000 − $55,000 = $235,000. Net cash used in investing $(2,595,000) (3 marks).",
    "(a) Dividends paid: $6,300,000 + $2,120,000 − $7,520,000 = $900,000. Financing: new borrowings $1,400,000 − dividends $900,000 = $500,000 (2 marks).",
    "(a) Net increase in cash $2,655,000 − $2,595,000 + $500,000 = $560,000 (1 mark).",
    "(b) Operating cash flow of $2,655,000 covers investing of $2,595,000 with very little to spare, and the entity also raised $1,400,000 of new debt and paid $900,000 of dividends. So growth is not being funded from operations alone (2 marks).",
    "(b) Working capital absorbed $545,000 net ($320,000 + $410,000 − $185,000) while revenue grew 29.5%. That is the OVERTRADING signature: growth is tying cash into inventory and receivables faster than profit releases it, and a further $3,000,000 of TERM debt does not solve a working capital problem — it adds interest to a tightening position (2 marks).",
    "(b) Interest cover is deteriorating in prospect: finance costs of $265,000 already, plus interest on the $1,400,000 raised in the year, plus interest on a further $3,000,000. The bank should compute the pro-forma cover before lending, using the entity's own operating profit rather than profit before tax (1 mark).",
    "(b) Dividends of $900,000 were paid — 42% of profit after tax — in a year of heavy investment and new borrowing. A lender is entitled to ask whether distributions will be restrained while the loan is outstanding, and to consider a covenant to that effect (1 mark).",
    "(b) Conclusion: the entity is profitable and generating positive operating cash flow, so the application is not unreasonable — but the purpose matters. If the $3,000,000 is for further capacity, recommend it only alongside a working capital facility sized to the growth and a covenant on distributions; if it is to fund the working capital gap itself, term debt is the wrong instrument and an overdraft or invoice financing would fit better. Credit for a supported recommendation that names the instrument as well as the amount (1 mark).",
    "No credit for a conclusion that simply restates the cash flow figures, or for advising on the loan without reference to the working capital trend.",
  ],
}

const Q13: WrittenQuestion = {
  id: "FRW-13",
  paper: "FR",
  area: "B",
  chapter: "FR-16",
  topic: "Revenue recognition judgements",
  maxMarks: 20,
  stem:
    "Goldeneye Co's directors have prepared draft financial statements for the year ended 31 December 20X6 and you have identified four revenue matters.\n\n" +
    "(1) Goldeneye operates a website selling third-party sellers' products. Customers paid it $2,400,000 during the year and it remitted $2,064,000 to the sellers, retaining a 14% fee. Goldeneye never holds inventory, does not set prices, and is not responsible if a seller fails to deliver. Revenue of $2,400,000 has been recognised with cost of sales of $2,064,000.\n\n" +
    "(2) Goldeneye supplied equipment on 1 January 20X6, control passing on that date, with the customer to pay $1,166,400 on 31 December 20X7. A rate of 8% reflects the customer's credit characteristics. Revenue of $1,166,400 has been recognised.\n\n" +
    "(3) Goldeneye sold 2,000 units at $180 each shortly before the year end, each costing $105. Customers have a 30-day right of return and Goldeneye expects 5% to be returned; returned units can be resold at full price. Revenue of $360,000 and cost of sales of $210,000 have been recognised.\n\n" +
    "(4) Goldeneye sells a machine for $95,000 with a legally required twelve-month warranty that it will function as specified, and offers an optional three-year extended warranty for a further $12,000. It sold 40 machines and 25 extended warranties in December 20X6, recognising the full $4,100,000 as revenue.\n\n" +
    "Required:\n\n" +
    "For each matter, explain the correct treatment and calculate the adjustment required to the draft financial statements. (20 marks)",
  rubric: [
    "(1) Goldeneye is an AGENT, not a principal: it never obtains control of the goods, has no inventory risk, no pricing discretion and no responsibility for fulfilment. Revenue is the FEE only: $2,400,000 × 14% = $336,000 (3 marks).",
    "(1) Adjustment: reduce revenue by $2,064,000 and reduce cost of sales by $2,064,000. PROFIT IS UNCHANGED — but revenue falls by 86% and gross margin rises from 14% to 100%. Credit for stating that profit is unaffected while every revenue-based measure moves dramatically (2 marks).",
    "(2) There is a SIGNIFICANT FINANCING COMPONENT: control passed on 1 January 20X6 and payment is not due for two years, well beyond the one-year practical expedient. Revenue is the discounted amount: $1,166,400 ÷ 1.08² = $1,000,000 (3 marks).",
    "(2) The $166,400 difference is INTEREST INCOME, recognised as the receivable unwinds: $80,000 in 20X6 (a full year, $1,000,000 × 8%) and $86,400 in 20X7. Adjustment for 20X6: reduce revenue by $166,400 and recognise $80,000 of interest income, so profit falls by $86,400 (2 marks).",
    "(3) Revenue is recognised only for the units NOT expected to be returned: 1,900 × $180 = $342,000, with a REFUND LIABILITY of 100 × $180 = $18,000 (2 marks).",
    "(3) Cost of sales is likewise restricted to 1,900 × $105 = $199,500, and an ASSET for the right to recover products is recognised at the former carrying amount of the units expected back: 100 × $105 = $10,500, presented separately from inventory (2 marks).",
    "(3) Adjustment: reduce revenue $18,000, reduce cost of sales $10,500, recognise a refund liability of $18,000 and a recovery asset of $10,500. Profit falls by $7,500 — the margin on the units expected to come back. Credit specifically for the RECOVERY ASSET, which is the leg most often omitted (1 mark).",
    "(4) The twelve-month statutory warranty is ASSURANCE-type: it promises only that the machine complies with specifications, the customer had no choice, and no part of the transaction price is allocated to it. It gives rise to an IAS 37 PROVISION for expected repair costs instead (2 marks).",
    "(4) The optional three-year extended warranty IS a separate performance obligation — the customer could have declined it and it is separately priced — so its $300,000 (25 × $12,000) is recognised OVER THE THREE YEARS, not on sale. Sold in December 20X6, only about one month has elapsed, so roughly $8,333 is revenue and $291,667 a contract liability (2 marks).",
    "(4) Adjustment: reduce revenue by about $291,667 and recognise a contract liability for the same, plus recognise a warranty provision for the assurance element. Credit for the discriminator — could the customer have declined it? — rather than for the conclusion alone (1 mark).",
    "No credit for treating the marketplace as a principal because it collects the cash, for recognising the full deferred consideration as revenue, or for treating the statutory warranty as a performance obligation.",
  ],
}

const Q14: WrittenQuestion = {
  id: "FRW-14",
  paper: "FR",
  area: "D",
  chapter: "FR-27",
  topic: "A consolidation with fair value adjustments and intra-group items",
  maxMarks: 20,
  stem:
    "Smew Co acquired 60% of Scaup Co on 1 July 20X6 for $3,100,000 in cash. Both companies have a 31 December year end and Scaup's results accrue evenly.\n\n" +
    "At 1 July 20X6 Scaup's equity comprised share capital of $1,500,000 and retained earnings of $2,400,000. Two fair value adjustments were identified: Scaup's plant had a fair value $800,000 above carrying amount with a remaining useful life of four years, and Scaup had a contingent liability meeting the IFRS 3 recognition criteria with a fair value of nil.\n\n" +
    "For the year ended 31 December 20X6 Scaup's profit after tax was $900,000. During the post-acquisition period Scaup sold goods to Smew for $600,000 at a margin of 20%, of which one quarter remained in Smew's inventory at the year end. At 31 December 20X6 Smew's records showed $290,000 owed by Scaup while Scaup's showed $230,000 owed to Smew, the difference being goods in transit.\n\n" +
    "Smew measures non-controlling interests at fair value, and the fair value of the NCI at acquisition was $1,950,000. Goodwill is not impaired.\n\n" +
    "Required:\n\n" +
    "(a) Prepare the net assets working for Scaup and calculate goodwill. (7 marks)\n\n" +
    "(b) Calculate the non-controlling interest at 31 December 20X6. (6 marks)\n\n" +
    "(c) Explain the adjustments required for the goods in transit and the intra-group trading, quantifying each. (4 marks)\n\n" +
    "(d) Explain why measuring the non-controlling interest at fair value rather than at its proportionate share of net assets changes the goodwill figure, and what effect that has on the group's reported gearing. (3 marks)",
  rubric: [
    "(a) Net assets at acquisition: share capital $1,500,000 + retained earnings $2,400,000 + plant uplift $800,000 = $4,700,000. The contingent liability has a fair value of NIL, so it does not reduce net assets — credit for recognising that it is nonetheless identified and would reduce them if it had value (3 marks).",
    "(a) Net assets at 31 December 20X6: $1,500,000 + retained earnings at that date + the uplift NET of six months' extra depreciation. Extra depreciation is $800,000 ÷ 4 = $200,000 a year, pro-rated to $100,000, so the uplift stands at $700,000 (2 marks).",
    "(a) Goodwill = $3,100,000 consideration + $1,950,000 NCI at fair value − $4,700,000 net assets acquired = $350,000 (2 marks).",
    "(b) Scaup's post-acquisition profit = $900,000 × 6/12 = $450,000 (1 mark).",
    "(b) Adjust it for items arising in SCAUP's own results: less the $100,000 of extra fair value depreciation, and less the $30,000 of unrealised profit because SCAUP was the seller. Adjusted post-acquisition profit $320,000 (3 marks).",
    "(b) NCI at 31 December 20X6 = $1,950,000 at acquisition + 40% × $320,000 = $2,078,000. Credit for using the ADJUSTED figure — 40% of the unadjusted $450,000 would give $2,130,000 (2 marks).",
    "(c) Goods in transit: Smew's records show $290,000 and Scaup's $230,000, so $60,000 of goods despatched by Smew have not been recorded by Scaup. Record them in the RECEIVING company: increase Scaup's inventory and payable by $60,000. The balances then agree at $290,000 and are eliminated from group receivables and payables (2 marks).",
    "(c) Intra-group trading: unrealised profit is $600,000 × 1/4 × 20% = $30,000 (margin, so 20/100 of selling price). Reduce group inventory by $30,000 and reduce SCAUP's closing net assets by the same, so the NCI bears 40% of it. Credit for the margin fraction and for the correct side (2 marks).",
    "(d) Under the FAIR VALUE method the NCI is measured at $1,950,000 rather than at 40% × $4,700,000 = $1,880,000, so both goodwill AND non-controlling interest are $70,000 higher. The difference is the NCI's share of goodwill, which the proportionate method does not recognise (2 marks).",
    "(d) Effect on gearing: total assets and total equity both rise by $70,000, and NCI is part of EQUITY. So gearing measured as debt to equity improves slightly under the fair value method, on identical facts and identical borrowings — which is why an answer quoting group gearing must state which NCI measurement basis and which gearing definition it has used (1 mark).",
    "No credit for reducing net assets by the contingent liability where its fair value is nil, for carrying the plant uplift at $800,000 in the closing column, or for adjusting the receiving company's records on the wrong side.",
  ],
}

const Q15: WrittenQuestion = {
  id: "FRW-15",
  paper: "FR",
  area: "A",
  chapter: "FR-05",
  topic: "The framework, accounting policies and the preparer's duty",
  maxMarks: 20,
  stem:
    "You are the financial controller of Smew Co. The draft financial statements for the year ended 31 December 20X6 show a profit before tax of $1,680,000. The finance director has asked you to make four changes, explaining that the company needs to report a higher profit to satisfy a loan covenant.\n\n" +
    "(1) 'Recognise our brand as an intangible asset. Independent valuers put it at $6,000,000 and we have spent $2,100,000 on advertising building it. Take the uplift to profit.'\n\n" +
    "(2) 'Change our inventory policy from FIFO to weighted average cost. It gives a higher closing inventory this year, and we can apply it from now on without restating last year.'\n\n" +
    "(3) 'Release $450,000 of the warranty provision. Claims have been running below expectation for two years and the provision has become excessive.'\n\n" +
    "(4) 'We found that closing inventory at 31 December 20X5 was overstated by $310,000 through a double-counted stock line. Just leave it — it washes out through this year's figures anyway.' The 20X5 statements reported profit of $1,680,000 and closing retained earnings of $5,200,000.\n\n" +
    "Required:\n\n" +
    "(a) Explain, for each of the four proposals, the correct accounting treatment and whether the proposal may be accepted. (14 marks)\n\n" +
    "(b) Explain the professional issues raised and the steps you should take. (6 marks)",
  rubric: [
    "(1) REFUSE. The brand meets the framework DEFINITION of an asset — a controlled right from past events with the potential to produce benefits — but it fails RECOGNITION on faithful representation, because the $2,100,000 cannot be distinguished from developing the business as a whole and the $6,000,000 valuation rests on unobservable assumptions. IAS 38 turns this into an outright prohibition on internally generated brands (3 marks).",
    "(1) Credit for the shape of the answer: the brand IS an asset and is NOT recognised, and the reason is measurement rather than the absence of an asset. And even were it recognised, taking a valuation uplift to profit would breach the definition of income, which requires an increase in assets that increases equity other than through a transaction (1 mark).",
    "(2) REFUSE AS PROPOSED. Both FIFO and weighted average are permitted cost formulas, so a change is possible in principle — but only where required by a Standard or where the new policy gives RELIABLE AND MORE RELEVANT information. 'It gives a higher closing inventory' is not that reason, and a change made to improve the reported result is not permitted (3 marks).",
    "(2) And the mechanics are wrong too. A change of cost formula IS a change of accounting POLICY, so it must be applied RETROSPECTIVELY — comparatives restated and opening retained earnings adjusted. Applying it prospectively without restatement is not an option (1 mark).",
    "(3) MAY BE ACCEPTABLE — investigate. IAS 37 REQUIRES a provision to be remeasured to the current best estimate at each reporting date, so where claims experience has genuinely improved, a release is the correct accounting rather than a favour to the finance director (2 marks).",
    "(3) The test is whether the revised estimate is supported by EVIDENCE: obtain the claims data for both years, recompute the expected value on the revised probabilities, and release only the amount the recomputation supports. A release of a round $450,000 chosen to hit a covenant would not be, and the difference between the two situations is documentary rather than conceptual (2 marks).",
    "(4) REFUSE. This is a prior period ERROR — the information was available and was misused — so IAS 8 requires RETROSPECTIVE RESTATEMENT. Restate the 20X5 comparative: reduce closing inventory and profit by $310,000, giving restated 20X5 profit of $1,370,000 and restated closing retained earnings of $4,890,000, which becomes 20X6's opening balance (2 marks).",
    "(4) The claim that it 'washes out' is half right and wholly insufficient. The error IS self-correcting across two periods, so 20X6's profit needs no adjustment provided it already uses the corrected opening inventory. But leaving it uncorrected misstates BOTH the comparative and the opening reserves, and the nature and amount of the correction must be disclosed for each line item affected (2 marks).",
    "(b) The pressure engages OBJECTIVITY — the accounting must not be determined by the covenant — and INTEGRITY, since you must not be associated with statements you know to be misleading. PROFESSIONAL COMPETENCE AND DUE CARE requires the Standards to be applied properly, and there is a self-interest threat if your own position depends on the covenant being met (2 marks).",
    "(b) Note that 'it complies with the Standards' would not be a defence even if each change could be argued individually: neutrality is a component of faithful representation, and IAS 1 requires FAIR PRESENTATION rather than rule-by-rule compliance. Presenting information to obtain a particular reaction is not neutral (1 mark).",
    "(b) The covenant is itself now a DISCLOSURE matter. A probable breach is material information for users, and if the loan becomes repayable on demand it must be classified as CURRENT. Concealing the position by manipulating the accounts is the opposite of what should happen (1 mark).",
    "(b) Steps: document the analysis of each proposal; raise it with the finance director in writing; escalate to the audit committee or those charged with governance; take advice from your professional body's ethics helpline; and if the company insists on the treatments, consider resignation, taking legal advice first. Credit for a documented escalation route rather than a bare statement that the proposals are unethical (2 marks).",
  ],
}

export const FR_WRITTEN_KIT2: WrittenQuestion[] = [Q09, Q10, Q11, Q12, Q13, Q14, Q15]
