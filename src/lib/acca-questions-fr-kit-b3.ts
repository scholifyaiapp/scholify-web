import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fr-kit-builders"

/*
 * FR · Area B question kit, part 3 — chapters 19 to 23, completing Area B.
 *
 * Financial assets, income taxes, foreign currency, held for sale and discontinued
 * operations, and IAS 8. Four of these five are CLASSIFICATION standards, so the MCQ
 * proportion is higher here than in the earlier Area B files — the examinable skill is
 * choosing the treatment, and the numeric items follow once the classification is right.
 *
 * IAS 12 is the exception and carries the most numeric weight, because a tax expense note
 * is close to guaranteed in a Section C preparation question and because the sign
 * conventions produce so many ways to get it wrong.
 *
 * All figures verified by script before authoring.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 19 · IFRS 9 financial assets ── */

const CH19: AccaQuestion[] = [
  q("FRK-19-01", "FR-19", "B", "medium",
    "A debt instrument is held to collect the contractual cash flows and the cash flows are solely payments of principal and interest. How is it measured?",
    [
      "At amortised cost",
      "At fair value through other comprehensive income, with recycling",
      "At fair value through profit or loss",
      "At the lower of cost and fair value",
    ],
    0,
    "AMORTISED COST — hold to collect plus SPPI. Hold to collect AND SELL, with SPPI met, gives fair value through OCI with recycling. Anything else — held for trading, or SPPI failed — is fair value through profit or loss. Both tests must be satisfied for the first two categories."),

  num("FRK-19-02", "FR-19", "B", "medium",
    "An entity buys 80,000 shares at $5.25 each, incurring $8,400 of transaction costs, and makes the irrevocable FVTOCI election. At the year end the shares are quoted at $6.10. Calculate the gain recognised in OTHER COMPREHENSIVE INCOME, in $.",
    59600, "$", 1,
    "$59,600. Transaction costs are ADDED for a FVTOCI asset, so the initial carrying amount is $420,000 + $8,400 = $428,400, and the gain is $488,000 − $428,400. Had the asset been FVTPL the $8,400 would have been EXPENSED and the gain would be $68,000 — in profit or loss. Transaction costs are expensed only for FVTPL."),

  q("FRK-19-03", "FR-19", "B", "medium",
    "An entity designated an equity investment at FVTOCI and later sells it at a profit. How is the cumulative gain treated?",
    [
      "It remains in equity and is never recycled; it may only be transferred within equity",
      "It is recycled to profit or loss on disposal",
      "It is recycled to profit or loss to the extent of the gain in the year of disposal",
      "It is reversed through OCI and the whole gain reported in profit",
    ],
    0,
    "NO RECYCLING, EVER. For EQUITY investments designated at FVTOCI the cumulative gain stays in equity, so no gain on disposal ever reaches profit or loss. DEBT instruments at FVTOCI are the opposite — those DO recycle. The two FVTOCI categories differ precisely on this point, and it is the most examined thing in the chapter."),

  q("FRK-19-04", "FR-19", "B", "medium",
    "Where are DIVIDENDS on an equity investment designated at FVTOCI recognised?",
    ["In profit or loss", "In other comprehensive income", "As a reduction of the investment's carrying amount", "In equity, within the FVTOCI reserve"],
    0,
    "PROFIT OR LOSS. Only the FAIR VALUE MOVEMENT goes to OCI; the dividend is income and is recognised in profit. Candidates who assume everything about a FVTOCI asset bypasses profit lose this mark. Note the contrast with an ASSOCIATE, where a dividend received DOES reduce the carrying amount of the investment."),

  q("FRK-19-05", "FR-19", "B", "medium",
    "What loss allowance does IFRS 9 require for trade receivables with no significant financing component?",
    [
      "Lifetime expected credit losses at all times, under the simplified approach",
      "12-month expected credit losses until credit risk increases significantly",
      "No allowance until there is objective evidence of impairment",
      "Lifetime expected credit losses only for balances more than 30 days overdue",
    ],
    0,
    "LIFETIME ECL AT ALL TIMES — and it is REQUIRED, not merely permitted. The simplified approach removes the staging assessment because a trade receivable's lifetime is usually a few weeks, so lifetime and 12-month losses are close together and staging would cost more than it is worth. The objective-evidence trigger belonged to the superseded standard."),

  num("FRK-19-06", "FR-19", "B", "hard",
    "An entity's trade receivables and forward-looking loss rates are: not yet due $900,000 at 1%; 1-30 days $400,000 at 4%; 31-60 days $250,000 at 10%; 61-90 days $120,000 at 25%; over 90 days $80,000 at 60%. The opening loss allowance was $101,000. Calculate the CHARGE to profit or loss, in $.",
    27000, "$", 1,
    "$27,000. The allowance required is $9,000 + $16,000 + $25,000 + $30,000 + $48,000 = $128,000, and the charge is the MOVEMENT: $128,000 − $101,000. Charging the whole $128,000 double counts what was already provided, which is the commonest error in a provision matrix question. Receivables are then presented net, at $1,622,000."),

  q("FRK-19-07", "FR-19", "B", "medium",
    "At which stage of the general expected credit loss model is interest computed on the NET carrying amount?",
    [
      "Stage 3, where the asset is credit-impaired",
      "Stage 1, on initial recognition",
      "Stage 2, where credit risk has increased significantly",
      "At every stage, since the allowance always reduces the carrying amount",
    ],
    0,
    "STAGE 3 ONLY. At stages 1 and 2 interest is computed on the GROSS carrying amount, before the allowance; only once the asset is credit-impaired does the calculation switch to the net amount. Stages 2 and 3 both carry LIFETIME expected losses; stage 1 carries 12-month losses."),

  q("FRK-19-08", "FR-19", "B", "hard",
    "An entity purchases a zero-coupon bond for $4,000,000, redeemable for $5,000,000 in three years, intending to hold it to collect. What income is recognised in year 1?",
    [
      "Interest income accreted at the effective interest rate on the $4,000,000 carrying amount",
      "Nothing, since no cash is received until redemption",
      "One third of the $1,000,000 discount, being $333,333",
      "A fair value gain, if the bond's market value has risen",
    ],
    0,
    "ACCRETED INTEREST AT THE EFFECTIVE RATE. The DISCOUNT IS the return, so income arises each year even though no cash moves — approximately $308,800 in year 1 at an effective rate of 7.72%. Recognising nothing until redemption and then a $1,000,000 gain misstates every year. Straight-lining the discount is also wrong: amortised cost gives a constant RATE, not a constant amount."),
]

/* ── Chapter 20 · IAS 12 income taxes ── */

const CH20: AccaQuestion[] = [
  q("FRK-20-01", "FR-20", "B", "easy",
    "Last year's current tax was provided at $390,000 and the amount finally agreed and paid was $412,000. How does this affect this year's tax expense?",
    [
      "It is an UNDER-provision of $22,000, ADDED to this year's expense",
      "It is an over-provision of $22,000, deducted from this year's expense",
      "It is a prior period error, requiring the comparative to be restated",
      "It has no effect on this year's expense; it adjusts opening retained earnings",
    ],
    0,
    "AN UNDER-PROVISION OF $22,000, ADDED. More was paid than was provided, so last year's charge was too low and last year's profit was overstated — the shortfall is borne now. The sign is the trap. And note it is a change in ESTIMATE, never a prior period error, so nothing is restated."),

  q("FRK-20-02", "FR-20", "B", "medium",
    "A warranty provision of $400,000 is deductible for tax only when paid. The tax rate is 24%. What deferred tax arises?",
    [
      "A deferred tax asset of $96,000",
      "A deferred tax liability of $96,000",
      "No deferred tax, since a provision is not an asset",
      "A deferred tax asset of $400,000",
    ],
    0,
    "AN ASSET OF $96,000. The provision is a LIABILITY with a carrying amount of $400,000 and a tax base of nil. For a liability the signs REVERSE: a carrying amount ABOVE the tax base is a DEDUCTIBLE temporary difference. Sanity check: the expense has been recognised and the deduction is still to come, so a future benefit exists. Recognition also requires future taxable profits to be probable."),

  num("FRK-20-03", "FR-20", "B", "hard",
    "At the year end: property, plant and equipment has a carrying amount of $3,200,000 and a tax base of $2,500,000; capitalised development costs are $600,000 with a nil tax base; and a provision of $400,000 is deductible only when paid. The tax rate is 24%. Calculate the closing deferred tax LIABILITY, in $.",
    216000, "$", 1,
    "$216,000. PPE gives a taxable difference of $700,000 and development costs $600,000; the provision gives a DEDUCTIBLE difference of $400,000 because the signs reverse for a liability. Net taxable $900,000 × 24% = $216,000. Adding the provision instead of deducting it gives $312,000, which is the standard error."),

  num("FRK-20-04", "FR-20", "B", "hard",
    "Using the previous question's closing deferred tax liability of $216,000, the opening balance was $165,000, the current year's tax estimate is $450,000, and last year's provision of $390,000 was settled at $412,000. Calculate the total tax expense in PROFIT OR LOSS, in $.",
    523000, "$", 1,
    "$523,000. Current year $450,000, plus the $22,000 under-provision, plus the deferred tax MOVEMENT of $216,000 − $165,000 = $51,000. Charging the closing deferred tax BALANCE of $216,000 rather than the movement would give $688,000 — the single most expensive error in the topic."),

  q("FRK-20-05", "FR-20", "B", "medium",
    "An entity revalues a property upwards, creating a taxable temporary difference. Where is the related deferred tax charge recognised?",
    [
      "In other comprehensive income, following the revaluation surplus",
      "In profit or loss, because all tax is recognised there",
      "Directly in retained earnings",
      "It is not recognised until the property is sold",
    ],
    0,
    "IN OCI. Deferred tax FOLLOWS THE ITEM that gave rise to it: profit or loss items to profit or loss, OCI items to OCI, and items recognised directly in equity — such as a convertible's equity component — to equity. This single rule answers every presentation question in IAS 12, and it explains why net OCI reported is less than the gross surplus."),

  q("FRK-20-06", "FR-20", "B", "medium",
    "An entity has $2m of unused tax losses carried forward but a history of losses and no realistic prospect of taxable profits. What deferred tax asset is recognised?",
    [
      "None — recognition requires it to be probable that taxable profit will be available",
      "The full amount at the applicable tax rate",
      "Half the amount, reflecting the uncertainty",
      "The full amount, with a disclosure that recovery is uncertain",
    ],
    0,
    "NONE. Deferred tax ASSETS carry a recognition condition that liabilities do not: they are recognised only to the extent it is PROBABLE that taxable profit will be available. The assessment is revisited each year, so an asset not recognised now is recognised when profits become probable. A question giving you losses AND a loss history is testing this, not the multiplication."),

  q("FRK-20-07", "FR-20", "B", "medium",
    "How is deferred tax presented and measured?",
    [
      "Always non-current, undiscounted, at the rate enacted or substantively enacted and expected to apply on reversal",
      "Split between current and non-current according to when the differences reverse",
      "Discounted to present value where reversal is more than a year away",
      "At the rate in force at the reporting date, whatever future rate has been announced",
    ],
    0,
    "NON-CURRENT, UNDISCOUNTED, AT THE ENACTED OR SUBSTANTIVELY ENACTED FUTURE RATE. All three points are examinable and each has a plausible-looking alternative. Discounting is expressly prohibited — an explicit exception to the usual treatment of long-dated balances — because scheduling the reversals reliably would be impracticable."),
]

/* ── Chapter 21 · IAS 21 foreign currency transactions ── */

const CH21: AccaQuestion[] = [
  num("FRK-21-01", "FR-21", "B", "medium",
    "An entity with a dollar functional currency bought goods for €250,000 on credit when €1 = $1.35. At the year end the rate was €1 = $1.42 and the supplier was unpaid. Calculate the exchange LOSS recognised in profit or loss, in $.",
    17500, "$", 1,
    "$17,500. The PAYABLE is monetary and is retranslated at the closing rate: €250,000 × 1.42 = $355,000 against the $337,500 originally recorded. The INVENTORY is non-monetary and stays at $337,500 — there is no matching gain to offset the loss, and that asymmetry is correct because the obligation genuinely costs more dollars to settle while the goods' dollar cost is fixed."),

  q("FRK-21-02", "FR-21", "B", "easy",
    "An entity with a dollar functional currency holds inventory bought for €100,000 when €1 = $1.20. At the year end €1 = $1.30. At what amount is the inventory carried?",
    [
      "$120,000 — inventory is non-monetary and is not retranslated",
      "$130,000, with a $10,000 exchange gain in profit or loss",
      "$130,000, with a $10,000 gain in other comprehensive income",
      "The lower of $120,000 and $130,000",
    ],
    0,
    "$120,000. Non-monetary items carried at historical cost keep the rate on the transaction date. Only MONETARY items are retranslated. The inventory is of course still subject to the IAS 2 lower-of-cost-and-NRV test, but that is a separate question from translation."),

  multi("FRK-21-03", "FR-21", "B", "medium",
    "Which THREE of the following are MONETARY items requiring retranslation at the closing rate?",
    [
      "A foreign currency bank balance",
      "A trade payable denominated in a foreign currency",
      "Accrued interest on a foreign currency loan",
      "A prepayment for goods to be delivered next year",
      "Property, plant and equipment purchased in a foreign currency",
      "Goodwill arising on a foreign acquisition",
    ],
    [0, 1, 2],
    "THE CASH, THE PAYABLE and THE ACCRUED INTEREST. The test is a right to receive, or obligation to deliver, a FIXED OR DETERMINABLE NUMBER OF CURRENCY UNITS. A prepayment gives a right to GOODS, so it is non-monetary — as are PPE and goodwill. If you can answer 'how many euros will change hands, and is that number fixed?', you have the classification."),

  q("FRK-21-04", "FR-21", "B", "medium",
    "Where are exchange differences on the retranslation of monetary items recognised?",
    [
      "In profit or loss, in the period in which they arise",
      "In other comprehensive income, accumulated in an exchange reserve",
      "In profit or loss, but only on settlement",
      "Directly in equity until the item is settled",
    ],
    0,
    "PROFIT OR LOSS, AS THEY ARISE. There is no exchange reserve for TRANSACTIONS in an entity's own statements — that mechanism belongs to translating a foreign OPERATION, which is outside the FR syllabus. And the difference is recognised at each reporting date, not deferred until settlement."),

  q("FRK-21-05", "FR-21", "B", "medium",
    "Is an entity's functional currency a matter of choice?",
    [
      "No — it is a question of fact determined by the primary and secondary indicators",
      "Yes — an entity may select any currency provided the choice is disclosed",
      "Yes, but only from among the currencies in which it transacts",
      "No — it is always the currency of the country of incorporation",
    ],
    0,
    "NO, IT IS A MATTER OF FACT. The primary indicators are the currency mainly influencing sales prices and the currency mainly influencing costs; financing and retention of receipts are secondary. Only the PRESENTATION currency is a free choice, and country of incorporation is not the test at all."),
]

/* ── Chapter 22 · IFRS 5 held for sale and discontinued operations ── */

const CH22: AccaQuestion[] = [
  q("FRK-22-01", "FR-22", "B", "easy",
    "An entity classifies a building as held for sale on 1 July; the sale completes on 31 March the following year. What depreciation is charged in the year to 31 December?",
    [
      "Six months, to the date of classification",
      "Twelve months, since the asset was owned throughout",
      "None, because the asset is held for sale",
      "Nine months, to the reporting date",
    ],
    0,
    "SIX MONTHS. Depreciation is charged UP TO classification and then ceases — the two halves of the rule. Charging a full year ignores the cessation; charging nothing ignores the six months in which the asset was still in use and being consumed."),

  multi("FRK-22-02", "FR-22", "B", "medium",
    "Which THREE conditions must be met for an asset to be classified as HELD FOR SALE?",
    [
      "It is available for immediate sale in its present condition",
      "Management is committed to a plan to sell and an active programme to locate a buyer has begun",
      "The sale is expected to complete within one year of classification",
      "The asset has been formally advertised in the trade press",
      "The asset's fair value exceeds its carrying amount",
      "A binding sale agreement has been signed",
    ],
    [0, 1, 2],
    "THE FIRST THREE. 'Available for immediate sale in its PRESENT CONDITION' is the one that fails most often — a building still being used until a replacement is finished is not available. A signed agreement is not required, only a highly probable sale; the method of marketing is not prescribed; and the relationship between fair value and carrying amount is a measurement question, not a classification one."),

  num("FRK-22-03", "FR-22", "B", "hard",
    "A disposal group's carrying amounts are goodwill $180,000, property, plant and equipment $1,100,000, other intangibles $300,000, inventory $250,000 and receivables $200,000. Its fair value less costs to sell is $1,750,000. Calculate the impairment allocated to the PROPERTY, PLANT AND EQUIPMENT, in $.",
    78571, "$", 2,
    "$78,571. Total carrying amount is $2,030,000, so the write-down is $280,000. Goodwill absorbs $180,000 in full; the remaining $100,000 is allocated pro rata across PPE and other intangibles ($1,400,000 in total), giving PPE $100,000 × 1,100/1,400 = $78,571 and intangibles $21,429. Inventory and receivables are OUTSIDE IFRS 5's measurement scope and absorb none of it."),

  q("FRK-22-04", "FR-22", "B", "medium",
    "An entity will CLOSE, not sell, a major geographical division over the next four months. How is it treated?",
    [
      "A discontinued operation but NOT held for sale, so depreciation continues and there is no IFRS 5 remeasurement",
      "Both held for sale and a discontinued operation",
      "Held for sale only, since disposal is within twelve months",
      "Neither, until the closure is complete",
    ],
    0,
    "DISCONTINUED BUT NOT HELD FOR SALE. An asset to be ABANDONED will not have its carrying amount recovered through a sale, so it fails the held-for-sale test entirely — no remeasurement, and depreciation continues. But a separate major geographical area being closed IS a discontinued operation, so it is presented as a single amount with the comparative restated. The two classifications are assessed separately."),

  q("FRK-22-05", "FR-22", "B", "medium",
    "How is a discontinued operation presented in the statement of profit or loss?",
    [
      "As a single amount comprising post-tax profit or loss and the post-tax gain or loss on disposal",
      "Within continuing operations, with the amounts disclosed separately in the notes",
      "As a separate column alongside continuing operations for each line item",
      "As an item of other comprehensive income",
    ],
    0,
    "A SINGLE POST-TAX AMOUNT on the face, with an analysis either on the face or in the notes. Continuing operations exclude it entirely, so revenue, cost of sales and every line above the single amount are free of it — which is what makes the continuing figures comparable."),

  q("FRK-22-06", "FR-22", "B", "medium",
    "Which comparative is RESTATED when an operation is discontinued?",
    [
      "The statement of profit or loss, but not the statement of financial position",
      "Both the statement of profit or loss and the statement of financial position",
      "The statement of financial position, but not the statement of profit or loss",
      "Neither — restatement is prohibited",
    ],
    0,
    "PROFIT OR LOSS ONLY. Restating it removes the disposed operation from BOTH years' continuing figures, so a user can compare like with like — which is the single most useful thing IFRS 5 does. The comparative statement of financial position is NOT restated, and the contrast between the two is examined."),

  q("FRK-22-07", "FR-22", "B", "hard",
    "An entity plans to sell a factory once a replacement is commissioned in eight months' time, and continues to use it meanwhile. Can it be classified as held for sale now?",
    [
      "No — it is not available for immediate sale in its present condition",
      "Yes — the sale is expected within twelve months",
      "Yes, provided management is committed to the plan",
      "Yes, but only from the date the replacement is commissioned",
    ],
    0,
    "NO, NOT YET. The factory is still in use and will be for eight months, so it is not available for immediate sale in its present condition. Classification is deferred until it actually is — and depreciation continues meanwhile. The last option describes the right OUTCOME but the question asks about NOW."),
]

/* ── Chapter 23 · IAS 8 policies, estimates and errors ── */

const CH23: AccaQuestion[] = [
  q("FRK-23-01", "FR-23", "B", "easy",
    "An entity changes from measuring investment property at cost to measuring it at fair value. How is the change accounted for?",
    [
      "Retrospectively, as a change of accounting policy, restating comparatives and opening retained earnings",
      "Prospectively, as a change in accounting estimate",
      "Retrospectively, as the correction of a prior period error",
      "Prospectively, from the date the fair values are first determined",
    ],
    0,
    "RETROSPECTIVELY, AS A POLICY CHANGE. Which measurement BASIS applies is a policy question, and a policy change is applied as if the new policy had always been applied. It is permitted here only because fair value gives more relevant information for investment property — a change made to improve reported results would not be."),

  q("FRK-23-02", "FR-23", "B", "medium",
    "An entity increases its expected credit loss rate on receivables from 3% to 6% following a major customer's failure. What is this?",
    [
      "A change in accounting estimate, applied prospectively",
      "A change of accounting policy, applied retrospectively",
      "The correction of a prior period error",
      "An adjusting event after the reporting period",
    ],
    0,
    "A CHANGE IN ESTIMATE, PROSPECTIVE. New information about credit risk has become available. Crucially it is NOT an error: the 3% was reasonable on what was known at the time, and an estimate that turns out wrong is not an error provided the process was properly applied."),

  q("FRK-23-03", "FR-23", "B", "medium",
    "An entity discovers that a $400,000 lease liability was omitted entirely from last year's statement of financial position. What is required?",
    [
      "Retrospective restatement: restate the comparative, adjust opening retained earnings, and disclose the nature and amount",
      "Prospective recognition from the date of discovery",
      "Recognition in the current year with disclosure of the circumstances",
      "A note disclosure only, since the liability is now correctly recognised",
    ],
    0,
    "RETROSPECTIVE RESTATEMENT. The lease existed and the information was available, so this is a prior period ERROR — a failure to use information that could reasonably have been obtained. The comparative is restated, opening retained earnings adjusted, and the nature and amount of the correction disclosed for each line item affected."),

  num("FRK-23-04", "FR-23", "B", "hard",
    "Closing inventory at 31 December 20X5 was overstated by $240,000 through a double-counted stock line. The 20X5 statements reported profit of $1,250,000 and closing retained earnings of $4,100,000. Calculate the RESTATED 20X5 profit, in $.",
    1010000, "$", 1,
    "$1,010,000. Reducing closing inventory by $240,000 increases cost of sales by the same amount, so profit falls to $1,010,000 and restated closing retained earnings become $3,860,000 — which is the opening figure the current year builds on. Note that the CURRENT year's profit needs no adjustment if it already uses the corrected opening inventory: the error is self-correcting across two periods, and adjusting both would double count."),

  q("FRK-23-05", "FR-23", "B", "medium",
    "Where it is unclear whether a change is a change of accounting policy or a change in accounting estimate, what does IAS 8 require?",
    [
      "Treat it as a change in ESTIMATE",
      "Treat it as a change in POLICY",
      "Disclose both possible treatments and their effects",
      "Seek a ruling from the IFRS Interpretations Committee",
    ],
    0,
    "TREAT IT AS AN ESTIMATE. IAS 8 resolves the ambiguity explicitly, which means the default is the PROSPECTIVE treatment with no restatement. The practical effect is that borderline changes do not disturb the comparatives."),

  q("FRK-23-06", "FR-23", "B", "medium",
    "When may an entity change an accounting policy?",
    [
      "When required by a Standard, or when the change gives reliable and MORE RELEVANT information",
      "Whenever the directors consider the new policy preferable",
      "Whenever the change is disclosed and applied consistently thereafter",
      "Only when required by a Standard",
    ],
    0,
    "REQUIRED BY A STANDARD, OR MORE RELEVANT INFORMATION. A voluntary change for any other reason — including because the new policy flatters the result — is not permitted, and that restriction exists to protect comparability. Note the one exemption from retrospective application worth remembering: first-time adoption of the REVALUATION MODEL is applied from the date of revaluation."),

  q("FRK-23-07", "FR-23", "B", "hard",
    "An entity adopts the revaluation model for its properties for the first time. How is the change applied?",
    [
      "From the date of revaluation, under IAS 16 — retrospective application is not required",
      "Retrospectively, restating comparatives as for any policy change",
      "Prospectively, as a change in accounting estimate",
      "Retrospectively, but only for the earliest comparative period presented",
    ],
    0,
    "FROM THE DATE OF REVALUATION. It IS a change of accounting policy, but IAS 8 directs you to IAS 16 for it, and IAS 16 applies the model from the date of revaluation rather than restating history. So no comparative is restated — one of only two exemptions from retrospective application worth knowing, alongside impracticability."),
]

export const FR_KIT_B3: AccaQuestion[] = [...CH19, ...CH20, ...CH21, ...CH22, ...CH23]
