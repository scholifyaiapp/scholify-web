import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fr-kit-builders"

/*
 * FR · Area B question kit, part 1 — chapters 7 to 12.
 *
 * Non-current assets and inventories: IAS 16, IAS 40, IAS 20, IAS 23, IAS 38, IAS 36,
 * IAS 2 and IAS 41. This is the most heavily examined stretch of the FR syllabus and IAS 16
 * is the most heavily examined standard in it, appearing in Section A nearly every sitting.
 *
 * Numeric entry carries the cost build-ups, the revaluation arithmetic, the impairment
 * allocations and the overhead absorptions — all of them calculations a candidate could
 * otherwise work backwards from four options. MCQ carries the treatment decisions and the
 * places where the learning point IS a specific wrong figure: the LOWER of the two
 * recoverable amounts, deducting sample proceeds from cost, recomputing a revised
 * depreciation charge from original cost.
 *
 * All figures verified by script before authoring.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 7 · IAS 16 recognition and cost ── */

const CH07: AccaQuestion[] = [
  num("FRK-07-01", "FR-07", "B", "medium",
    "An entity acquires a machine. The list price is $500,000 with a 4% trade discount. It also incurs delivery of $12,000, installation of $18,000, testing of $7,000, staff training of $9,000 and a one-year maintenance contract of $6,000. The present value of the obligation to dismantle the machine at the end of its life is $25,000. Calculate the initial cost of the machine, in $.",
    542000, "$", 1,
    "$542,000. $500,000 × 96% = $480,000, plus delivery $12,000, installation $18,000, testing $7,000 and the discounted dismantling obligation $25,000. Training is excluded because the benefit attaches to employees the entity does not control, and the maintenance contract is a cost of running rather than acquiring. Omitting the $25,000 gives $517,000, which is the commonest wrong answer."),

  q("FRK-07-02", "FR-07", "B", "medium",
    "During commissioning of a new plant an entity sells trial production output for $60,000. How is this treated under IAS 16 as amended?",
    [
      "Recognised as revenue in profit or loss, with the cost of those items expensed",
      "Deducted from the cost of the plant",
      "Credited to other comprehensive income",
      "Deferred and released over the plant's useful life",
    ],
    0,
    "REVENUE IN PROFIT OR LOSS. The 2020 amendment moved these proceeds out of the cost calculation entirely, with the cost of the items measured under IAS 2 and expensed. Deducting them from cost is the SUPERSEDED treatment, and it produced the odd result that two entities with identical assets reported different carrying amounts because one happened to sell its trial output."),

  multi("FRK-07-03", "FR-07", "B", "medium",
    "Which THREE of the following are EXCLUDED from the initial cost of an item of property, plant and equipment?",
    [
      "Costs of training staff to operate the asset",
      "Costs of relocating part of the operation to accommodate the asset",
      "Operating losses incurred while demand for the asset's output builds up",
      "Costs of testing whether the asset functions properly",
      "Site preparation and installation",
      "Non-refundable purchase taxes",
    ],
    [0, 1, 2],
    "TRAINING, RELOCATION and INITIAL OPERATING LOSSES. All three are expressly excluded — training because the benefit attaches to employees, relocation because IAS 16 names it, and operating losses because the asset is already available for use so they are trading losses. Testing, site preparation and non-refundable taxes are all directly attributable and included."),

  num("FRK-07-04", "FR-07", "B", "medium",
    "An entity replaces a significant component of a machine. The new component costs $200,000 and is capitalised. The component replaced had a carrying amount of $45,000. Calculate the amount charged to profit or loss, in $.",
    45000, "$", 1,
    "$45,000. The new component is capitalised at $200,000 and the carrying amount of the part replaced must be DERECOGNISED, giving a $45,000 loss. Failing to derecognise leaves the asset carrying two components — two roofs, two engines, two furnace linings — and overstates both assets and profit by $45,000."),

  q("FRK-07-05", "FR-07", "B", "medium",
    "A factory roof is replaced with one of identical specification after storm damage. The roof is a significant part of the building with its own useful life. What is the treatment?",
    [
      "Capitalise the new roof and derecognise the carrying amount of the old one",
      "Expense the whole cost, because the specification is unchanged so nothing has been enhanced",
      "Capitalise the new roof; no derecognition is needed since the roof was not separately recorded",
      "Capitalise the cost net of any insurance recovery",
    ],
    0,
    "CAPITALISE AND DERECOGNISE. 'Restores rather than enhances' normally points to an expense — UNLESS the thing restored is a significant part with its own life, which a roof is. Where the old roof's carrying amount is not separately recorded, IAS 16 permits using the replacement cost as an indication of its original cost, depreciated to date. Any insurance recovery is accounted for separately, not netted against cost."),

  q("FRK-07-06", "FR-07", "B", "hard",
    "A chemical plant installs a filtration unit solely to comply with new environmental regulation. The unit produces no additional output. Should it be recognised as an asset?",
    [
      "Yes — without it the entity could not operate the rest of the plant, so the benefits flow indirectly",
      "No — it produces no future economic benefits of its own",
      "No — regulatory compliance costs are expensed as incurred",
      "Only to the extent it increases the plant's remaining useful life",
    ],
    0,
    "YES, ON INDIRECT BENEFITS. Safety and environmental assets are tested as part of the OPERATION rather than in isolation: without the unit the plant cannot run at all, so the whole plant's benefits depend on it. Testing such an asset on its own output is the error the question is built round."),

  q("FRK-07-07", "FR-07", "B", "medium",
    "An entity holds a major spare rotor for a turbine, which it expects to use in about five years' time. How is it classified?",
    [
      "Property, plant and equipment, and depreciated",
      "Inventory, until it is fitted",
      "A prepayment, released when the rotor is used",
      "Property, plant and equipment, but not depreciated until it is fitted",
    ],
    0,
    "PPE, AND DEPRECIATED. Spare parts are inventory when consumed within a period but PPE where the entity expects to use them over more than one period. And depreciation begins when the asset is AVAILABLE for use, not when it is brought into use — so the rotor is depreciated while held in store."),
]

/* ── Chapter 8 · IAS 16 depreciation and revaluation ── */

const CH08: AccaQuestion[] = [
  num("FRK-08-01", "FR-08", "B", "medium",
    "A machine cost $480,000 with an estimated twelve-year life and a $30,000 residual value, depreciated straight line. After five years the directors revise the remaining life to four years and the residual value to $20,000. Calculate the revised annual depreciation charge, in $.",
    68125, "$", 1,
    "$68,125. Original charge ($480,000 − $30,000) ÷ 12 = $37,500, so after five years the carrying amount is $480,000 − $187,500 = $292,500. The revised charge is ($292,500 − $20,000) ÷ 4 = $68,125. Starting from ORIGINAL cost instead — ($480,000 − $20,000) ÷ 9 = $51,111 — is the standard error: a change in estimate is applied to the CURRENT carrying amount."),

  q("FRK-08-02", "FR-08", "B", "easy",
    "An entity changes its depreciation method for plant from reducing balance to straight line. How is this accounted for?",
    [
      "Prospectively, as a change in accounting estimate, with no restatement",
      "Retrospectively, as a change in accounting policy, restating comparatives",
      "Retrospectively, as the correction of a prior period error",
      "Prospectively, but only from the start of the next accounting period",
    ],
    0,
    "PROSPECTIVELY, AS A CHANGE IN ESTIMATE. The method reflects the expected pattern of consumption of the asset's benefits, which is a judgement about facts rather than a choice of principle. It feels like a policy change and is not one, and the retrospective answer is chosen more often than the right one."),

  num("FRK-08-03", "FR-08", "B", "medium",
    "A building cost $1,600,000 on 1 January 20X1 and is depreciated over 40 years with no residual value. On 31 December 20X5 the entity adopts the revaluation model and the building's fair value is $1,750,000. Calculate the revaluation surplus recognised in other comprehensive income, in $.",
    350000, "$", 1,
    "$350,000. Annual depreciation $1,600,000 ÷ 40 = $40,000, so after five years the carrying amount is $1,600,000 − $200,000 = $1,400,000. The surplus is $1,750,000 − $1,400,000 = $350,000, credited to other comprehensive income — not to profit or loss, so it does not increase EPS or distributable profit."),

  num("FRK-08-04", "FR-08", "B", "medium",
    "Following the revaluation in the previous question, the building's remaining useful life is 35 years. Calculate the annual reserve-to-reserve transfer of excess depreciation, in $.",
    10000, "$", 1,
    "$10,000. Depreciation becomes $1,750,000 ÷ 35 = $50,000 against the $40,000 that the cost model would have charged, so the excess is $10,000. IAS 16 PERMITS transferring that from revaluation surplus to retained earnings each year — a movement within the statement of changes in equity that never touches profit or loss. Note also that revaluing upwards INCREASES future depreciation and so reduces future reported profit."),

  q("FRK-08-05", "FR-08", "B", "medium",
    "A revalued asset with a carrying amount of $900,000 falls in fair value to $720,000. The revaluation surplus relating to that asset is $120,000. How is the fall recognised?",
    [
      "$120,000 in other comprehensive income and $60,000 in profit or loss",
      "$180,000 in other comprehensive income",
      "$180,000 in profit or loss",
      "$120,000 in profit or loss and $60,000 in other comprehensive income",
    ],
    0,
    "$120,000 OCI THEN $60,000 PROFIT. The fall is $180,000. The surplus on THAT ASSET acts as the buffer and absorbs the first $120,000 in OCI; the remaining $60,000 has no buffer and is charged to profit or loss. A surplus on a DIFFERENT asset could not have absorbed any of it — the tracking is asset by asset."),

  q("FRK-08-06", "FR-08", "B", "medium",
    "A revalued asset is sold. What happens to the revaluation surplus relating to it?",
    [
      "It is transferred directly to retained earnings within equity",
      "It is recycled to profit or loss as part of the gain on disposal",
      "It remains in the revaluation surplus indefinitely",
      "It is credited to other comprehensive income in the year of disposal",
    ],
    0,
    "TRANSFERRED DIRECTLY TO RETAINED EARNINGS. Two things happen on disposal and they are separate: the gain or loss (proceeds less carrying amount) goes to profit or loss, and the surplus moves between reserves. Recycling the surplus into the disposal gain would double count the uplift already recognised in OCI, and IAS 16 does not permit it."),

  q("FRK-08-07", "FR-08", "B", "medium",
    "Which statement about depreciation is correct?",
    [
      "It begins when the asset is available for use, and continues while the asset is idle",
      "It ceases when an asset's market value exceeds its carrying amount",
      "It provides a fund of cash for the asset's eventual replacement",
      "It begins when the asset is first brought into productive use",
    ],
    0,
    "AVAILABLE FOR USE, AND CONTINUING WHILE IDLE. Depreciation allocates cost over the period of consumption: it is not a valuation adjustment, so a rising market value does not stop it, and it is non-cash, so it creates no replacement fund. An installed machine awaiting its first order is depreciated."),

  q("FRK-08-08", "FR-08", "B", "hard",
    "An entity wishes to apply the revaluation model to three of its five properties — the three that have risen in value. Is this permitted?",
    [
      "No — the revaluation model must be applied to the whole CLASS of assets",
      "Yes, provided the selection is disclosed",
      "Yes, provided the three are in a different geographical location from the other two",
      "No — the revaluation model may only be applied to land, never to buildings",
    ],
    0,
    "NO — WHOLE CLASS. Revaluing the risers and leaving the fallers at cost is precisely the bias that neutrality prohibits, and IAS 16 forecloses it by requiring the policy to apply to an entire class. Note also that the class must be kept UP TO DATE, so an entity cannot revalue once and then leave the figures to become stale."),
]

/* ── Chapter 9 · IAS 40, IAS 20 and IAS 23 ── */

const CH09: AccaQuestion[] = [
  num("FRK-09-01", "FR-09", "B", "easy",
    "An entity buys a building for $2,000,000 and immediately lets it to unconnected tenants, applying the fair value model. At the year end its fair value is $2,250,000. Calculate the amount recognised in PROFIT OR LOSS, in $.",
    250000, "$", 1,
    "$250,000. Under the IAS 40 fair value model the whole movement goes to PROFIT OR LOSS — not to other comprehensive income, which is the IAS 16 revaluation treatment — and NO depreciation is charged. Both differences from IAS 16 are examined regularly."),

  q("FRK-09-02", "FR-09", "B", "medium",
    "A parent owns a building and lets it to its wholly owned subsidiary at a market rent. How is it classified in the CONSOLIDATED financial statements?",
    [
      "Owner-occupied property under IAS 16",
      "Investment property under IAS 40",
      "Investment property under IAS 40, but only if the fair value model is applied",
      "Inventory under IAS 2",
    ],
    0,
    "IAS 16 OWNER-OCCUPIED. Under the single economic entity concept the group occupies its own building, and the intra-group rent is eliminated. In the PARENT's own individual statements it would be investment property, because there the subsidiary is a separate legal entity. Read whose statements the question asks about."),

  q("FRK-09-03", "FR-09", "B", "medium",
    "A building transfers from owner-occupied to investment property carried at fair value. Where is the difference between carrying amount and fair value at the date of change recognised?",
    [
      "In other comprehensive income, treated as an IAS 16 revaluation",
      "In profit or loss, since the property will now be measured through profit",
      "Directly in retained earnings",
      "Deferred and released over the property's remaining life",
    ],
    0,
    "IN OCI, AS AN IAS 16 REVALUATION. IAS 16 is applied up to the date of change, so the uplift to that date is a revaluation. The instinct to put it in profit because the asset is ABOUT to be measured through profit is the trap. Contrast a transfer from INVENTORY, where the difference does go to profit — because inventory has always been measured through profit."),

  num("FRK-09-04", "FR-09", "B", "medium",
    "An entity receives a $300,000 government grant towards an asset costing $1,500,000 with a ten-year life, and uses the DEFERRED INCOME presentation. Calculate the net charge to profit or loss in year 1, in $.",
    120000, "$", 1,
    "$120,000. Depreciation $1,500,000 ÷ 10 = $150,000, less the grant released of $300,000 ÷ 10 = $30,000. The NETTING presentation gives the identical figure: ($1,500,000 − $300,000) ÷ 10 = $120,000. Profit is the same either way — what differs is gross assets, total liabilities and therefore GEARING, which is why the choice still matters to a user."),

  q("FRK-09-05", "FR-09", "B", "medium",
    "A government grant received two years ago becomes repayable. How is the repayment accounted for?",
    [
      "As a change in accounting estimate, with an immediate catch-up charge for the amount already credited to profit",
      "As the correction of a prior period error, restating the comparatives",
      "As a change of accounting policy, applied retrospectively",
      "Directly against equity, since the grant was never earned",
    ],
    0,
    "A CHANGE IN ESTIMATE, PROSPECTIVELY, WITH A CATCH-UP. Under the deferred income presentation the remaining balance is cleared and the excess charged to profit at once; under the netting presentation the asset's carrying amount is increased and the cumulative extra depreciation charged immediately. Either way the charge is the amount already credited, and no comparative is restated."),

  num("FRK-09-06", "FR-09", "B", "medium",
    "An entity borrowed $6,000,000 at 9% on 1 January specifically to construct a warehouse. Construction ran from 1 February to 31 October. Calculate the borrowing costs capitalised, in $.",
    405000, "$", 1,
    "$405,000. Capitalisation runs only while expenditure, borrowing costs and construction activities coincide: 1 February to 31 October is NINE months. $6,000,000 × 9% × 9/12 = $405,000. Capitalising the full year's $540,000 overstates the asset by $135,000, and capitalisation ceases at substantial completion rather than at the year end."),

  num("FRK-09-07", "FR-09", "B", "hard",
    "An entity's general borrowings are $4,000,000 at 10% and $6,000,000 at 7%. It spent $3,000,000 on a qualifying asset with construction running for six months of the year. Calculate the borrowing costs capitalised, in $.",
    123000, "$", 1,
    "$123,000. The capitalisation rate is the weighted average of the general borrowings: (($4m × 10%) + ($6m × 7%)) ÷ $10m = ($400,000 + $420,000) ÷ $10m = 8.2%. Then $3,000,000 × 8.2% × 6/12 = $123,000. Note the mechanics differ from a specific borrowing: the rate is applied to the EXPENDITURE, and no investment income is deducted."),

  q("FRK-09-08", "FR-09", "B", "medium",
    "Which of the following is NOT a qualifying asset for the purposes of IAS 23?",
    [
      "Investment property measured under the fair value model",
      "A shopping centre under construction for the entity's own use",
      "Whisky maturing over twelve years",
      "A bespoke production line being built over eighteen months",
    ],
    0,
    "INVESTMENT PROPERTY AT FAIR VALUE. Capitalising interest into an asset that is then remeasured to fair value achieves nothing, so IAS 23 excludes assets measured at fair value. The other three all necessarily take a substantial period to get ready — including the whisky, which shows that inventories CAN be qualifying assets where production is long-cycle."),

  q("FRK-09-09", "FR-09", "B", "medium",
    "Construction of a factory is substantially complete on 30 September, but it is not brought into use until 1 January. When does capitalisation of borrowing costs cease?",
    [
      "30 September, when substantially all activities necessary to prepare the asset are complete",
      "1 January, when the asset is brought into use",
      "At the reporting date if that falls between the two dates",
      "When the specific borrowing is repaid",
    ],
    0,
    "30 SEPTEMBER. Cessation follows SUBSTANTIAL COMPLETION, not first use, and minor outstanding work such as decoration does not delay it. Interest from 1 October is expensed. Note also that capitalisation is SUSPENDED during extended interruptions to active development, but not for routine or expected delays."),
]

/* ── Chapter 10 · IAS 38 intangible assets ── */

const CH10: AccaQuestion[] = [
  q("FRK-10-01", "FR-10", "B", "easy",
    "Which of the following would be recognised as an intangible asset?",
    [
      "A five-year operating licence purchased from a regulator for $120,000",
      "$400,000 spent advertising a new product range, which measurably increased sales",
      "$250,000 spent training staff to use newly acquired software",
      "An internally generated customer list valued by consultants at $1.5m",
    ],
    0,
    "THE PURCHASED LICENCE. It is identifiable through legal rights and its cost is reliably measurable. Advertising, training, and internally generated customer lists are all expressly excluded — the first two because the benefits cannot be controlled or reliably attributed, the third because its cost cannot be separated from developing the business as a whole."),

  q("FRK-10-02", "FR-10", "B", "medium",
    "What does 'identifiable' require for an intangible asset?",
    [
      "That the asset is separable, OR that it arises from contractual or other legal rights",
      "That the asset is separable AND arises from contractual or legal rights",
      "That the asset can be sold independently of the business",
      "That the asset has a determinable useful life",
    ],
    0,
    "SEPARABLE **OR** FROM LEGAL RIGHTS — either suffices. This is why a purchased licence qualifies even though it may not be transferable, and why internally generated goodwill does not: it is neither separable nor a legal right, being a residual that cannot be detached from the business."),

  num("FRK-10-03", "FR-10", "B", "medium",
    "A development project met all six IAS 38 criteria on 1 May. Costs of $250,000 were incurred before that date and $900,000 after it, of which $70,000 was staff training. Calculate the amount capitalised, in $.",
    830000, "$", 1,
    "$830,000. Only costs incurred AFTER the criteria are met can be capitalised, so the $250,000 is expensed and can never be reinstated however successful the project becomes. Training is expressly excluded even after that date, so $900,000 − $70,000 = $830,000. The full-project answer of $1,150,000 and the un-stripped $900,000 are both common."),

  num("FRK-10-04", "FR-10", "B", "medium",
    "Capitalised development costs of $830,000 relate to a product that becomes available for use at the start of the following year and is expected to generate benefits for four years. Calculate the amortisation charge in the year the costs were capitalised, in $.",
    0, "$", 0.01,
    "NIL. Amortisation begins when the asset is AVAILABLE FOR USE, which is the following year. Charging a part-year in the year of capitalisation is a standard error. Note that the asset must still be tested for IMPAIRMENT in the current year — an intangible not yet available for use is tested annually regardless of indicators."),

  q("FRK-10-05", "FR-10", "B", "medium",
    "All six IAS 38 development criteria are met. May the entity choose to expense the costs instead of capitalising them?",
    [
      "No — capitalisation is mandatory once all six criteria are met",
      "Yes, provided the policy is applied consistently and disclosed",
      "Yes, if the amounts are immaterial in aggregate",
      "Only if the entity can demonstrate that expensing gives more relevant information",
    ],
    0,
    "NO — MANDATORY. This is the point candidates most often get wrong, because capitalisation FEELS like an option. If all six are met the expenditure must be capitalised; if any one is unmet it must be expensed. There is no choice in either direction."),

  q("FRK-10-06", "FR-10", "B", "medium",
    "Which of the following is NOT amortised?",
    [
      "Goodwill acquired in a business combination",
      "A patent with eight years of legal protection remaining",
      "Capitalised development costs for a product now in production",
      "A ten-year software licence",
    ],
    0,
    "GOODWILL. Under IFRS goodwill has an indefinite useful life: no amortisation, and a mandatory annual impairment test. This differs from some national frameworks that amortise goodwill, which is why the point is examined. Indefinite-life intangibles and intangibles not yet available for use are the other two categories tested annually."),

  q("FRK-10-07", "FR-10", "B", "medium",
    "An entity holds a taxi licence renewable indefinitely on payment of a nominal fee, and intends to renew it. How is it accounted for?",
    [
      "As an indefinite-life intangible: not amortised, but tested for impairment annually",
      "Amortised over the current licence period",
      "Amortised over the entity's expected total period of operation",
      "Not recognised, because the renewal periods are contingent on future payments",
    ],
    0,
    "INDEFINITE LIFE — no amortisation, annual impairment test. Where renewal is available at insignificant cost and the entity intends to renew, there is no foreseeable limit on the period of benefit. Note that 'indefinite' does NOT mean infinite, and the assessment is reviewed each period."),

  q("FRK-10-08", "FR-10", "B", "hard",
    "A patent has ten years of legal protection remaining, but the entity expects to exploit it for only six years before the technology is superseded. Over what period is it amortised?",
    [
      "Six years — the useful life, which the legal life caps but does not set",
      "Ten years — the period of legal protection",
      "Eight years — the average of the two",
      "It is not amortised, because the useful life cannot be determined reliably",
    ],
    0,
    "SIX YEARS. The legal life is a CEILING on the useful life, not the useful life itself. The asset is amortised over the period the entity expects to derive benefits, which here is shorter. And note that where renewal is available at insignificant cost and expected, renewal periods may EXTEND the useful life."),

  q("FRK-10-09", "FR-10", "B", "hard",
    "Why does IAS 38 almost never permit an intangible asset to be revalued?",
    [
      "Because the revaluation model requires an ACTIVE MARKET for that intangible, which rarely exists",
      "Because intangible assets have no reliably measurable fair value in any circumstances",
      "Because revaluation is prohibited outright for intangible assets",
      "Because an intangible's carrying amount may never exceed its original cost",
    ],
    0,
    "AN ACTIVE MARKET IS REQUIRED, AND RARELY EXISTS. The model is permitted but the condition is severe: intangibles are typically unique, which is much of what makes them valuable, and uniqueness precludes an active market. So a brand or a patent generally cannot be revalued — though where the condition IS met, the mechanics mirror IAS 16's."),
]

/* ── Chapter 11 · IAS 36 impairment ── */

const CH11: AccaQuestion[] = [
  num("FRK-11-01", "FR-11", "B", "medium",
    "An asset has a carrying amount of $1,200,000, a fair value less costs of disposal of $980,000 and a value in use of $1,050,000. Calculate the impairment loss, in $.",
    150000, "$", 1,
    "$150,000. Recoverable amount is the HIGHER of the two measures — $1,050,000 — so the loss is $1,200,000 − $1,050,000 = $150,000. Using value in use because it happens to be lower, or fair value because it seems more objective, gives $220,000 and overstates the loss by $70,000. A rational entity takes the better of selling and keeping, and the accounting follows that."),

  q("FRK-11-02", "FR-11", "B", "easy",
    "Which assets must be tested for impairment ANNUALLY regardless of whether any indicator exists?",
    [
      "Goodwill, indefinite-life intangibles, and intangibles not yet available for use",
      "All non-current assets",
      "Only goodwill",
      "All intangible assets",
    ],
    0,
    "THOSE THREE. What they share is that none of them is being amortised, so nothing is systematically reducing the carrying amount — without a mandatory test they could sit at cost indefinitely while their value evaporated. Other assets are tested only where an indicator exists."),

  multi("FRK-11-03", "FR-11", "B", "medium",
    "Which THREE of the following are EXCLUDED from value in use?",
    [
      "Cash flows from a future restructuring to which the entity is not yet committed",
      "Income tax payments and receipts",
      "Cash flows from financing activities",
      "Cash flows from the asset's ultimate disposal",
      "Cash flows from continuing use of the asset in its current condition",
      "The effect of discounting at a pre-tax rate",
    ],
    [0, 1, 2],
    "THE FIRST THREE. Value in use uses the asset in its CURRENT condition, so uncommitted restructurings and performance enhancements are excluded; tax is excluded because the discount rate is pre-tax and including it would double count; financing flows are dealt with through the rate. Disposal proceeds ARE included, and current-condition operating flows are the substance of the measure."),

  num("FRK-11-04", "FR-11", "B", "hard",
    "A cash-generating unit comprises goodwill $100,000, property, plant and equipment $700,000, other intangibles $200,000 and inventory $150,000. Its recoverable amount is $800,000. Calculate the impairment allocated to the PROPERTY, PLANT AND EQUIPMENT, in $.",
    77778, "$", 2,
    "$77,778. Inventory is outside IAS 36's scope, so the carrying amount tested is $100,000 + $700,000 + $200,000 = $1,000,000, giving a loss of $200,000. Goodwill absorbs the first $100,000 in full; the remaining $100,000 is allocated pro rata across PPE and intangibles ($900,000 in total), so PPE takes $100,000 × 700/900 = $77,778 and intangibles $22,222."),

  q("FRK-11-05", "FR-11", "B", "medium",
    "In what order is an impairment loss allocated within a cash-generating unit?",
    [
      "To goodwill first and in full, then pro rata to the unit's other in-scope assets",
      "Pro rata across all the unit's assets including goodwill",
      "To the assets with the shortest remaining useful lives first",
      "To the assets whose individual recoverable amounts are lowest",
    ],
    0,
    "GOODWILL FIRST AND IN FULL, THEN PRO RATA. And the allocation is subject to a floor: no individual asset may be reduced below the highest of its own fair value less costs of disposal, its own value in use, and zero — with any amount that cannot be allocated reallocated to the others."),

  num("FRK-11-06", "FR-11", "B", "hard",
    "An asset cost $800,000 on 1 January 20X1 with an eight-year life and no residual value. At 31 December 20X3 it was impaired to $400,000, its remaining life unchanged at five years. At 31 December 20X5 the conditions causing the impairment have reversed and its recoverable amount is $500,000. Calculate the impairment REVERSAL recognised, in $.",
    60000, "$", 1,
    "$60,000. Carrying amount before reversal: $400,000 less two years at $80,000 = $240,000. The ceiling is what the carrying amount would have been with no impairment: $800,000 less five years at $100,000 = $300,000. Recoverable amount is $500,000 but the reversal is CAPPED at the ceiling, so the asset goes to $300,000 and the reversal is $60,000. Recognising the full $260,000 would carry the asset above depreciated cost, which the cost model does not permit."),

  q("FRK-11-07", "FR-11", "B", "medium",
    "Why can an impairment loss on GOODWILL never be reversed?",
    [
      "Because the recovery could not be distinguished from internally generated goodwill, which may not be recognised",
      "Because goodwill is not amortised, so there is no carrying amount to restore",
      "Because IAS 36 prohibits all impairment reversals",
      "Because goodwill impairments are charged to other comprehensive income",
    ],
    0,
    "IT COULD NOT BE DISTINGUISHED FROM INTERNALLY GENERATED GOODWILL. Permitting reversals would let an entity recognise internally generated goodwill through the back door, which IAS 38 prohibits outright. Impairments of other assets CAN be reversed, subject to the depreciated-cost ceiling."),

  q("FRK-11-08", "FR-11", "B", "medium",
    "An asset's value in use has risen since it was impaired, solely because the estimated cash flows are now closer in time. Should the impairment be reversed?",
    [
      "No — a reversal requires a change in the ESTIMATES used, not merely the unwinding of the discount",
      "Yes — value in use has increased, so recoverable amount exceeds carrying amount",
      "Yes, but only up to the amount of the original impairment",
      "Only if the asset is also revalued under IAS 16",
    ],
    0,
    "NO. The passage of time will always increase a discounted value in use, so treating that as a reversal would unwind every impairment automatically. IAS 36 requires the ESTIMATES to have changed — a recovery in the market, a new contract, a resolved technical problem."),
]

/* ── Chapter 12 · IAS 2 inventories and IAS 41 ── */

const CH12: AccaQuestion[] = [
  num("FRK-12-01", "FR-12", "B", "medium",
    "An entity's fixed production overheads are $900,000 a year and its normal capacity is 60,000 units. Because of a strike it produced only 45,000 units. Calculate the fixed overhead EXPENSED in the period rather than absorbed into inventory, in $.",
    225000, "$", 1,
    "$225,000. The absorption rate is based on NORMAL capacity: $900,000 ÷ 60,000 = $15 a unit, so 45,000 × $15 = $675,000 is absorbed and $225,000 is expensed. The rate is NOT increased to $20 ($900,000 ÷ 45,000), because that would capitalise the cost of the strike into inventory. Note the asymmetry: where production EXCEEDS normal capacity the rate IS reduced, so inventory is never carried above cost."),

  num("FRK-12-02", "FR-12", "B", "medium",
    "An entity holds 3,000 units at a cost of $25 each. Of these, 400 were damaged and can be sold for $18 each only after rectification costing $4 a unit. The remainder will sell normally at $34. Calculate closing inventory, in $.",
    70600, "$", 1,
    "$70,600. The test is applied ITEM BY ITEM: 2,600 good units at cost $25 = $65,000, and 400 damaged units at NRV of $18 − $4 = $14 each = $5,600. Cost was $75,000, so the write-down is $4,400. Comparing TOTALS would let the good units' unrealised margin absorb the write-down and produce no charge at all, which is exactly what the item-by-item rule prevents."),

  multi("FRK-12-03", "FR-12", "B", "medium",
    "Which THREE of the following are EXCLUDED from the cost of inventories?",
    [
      "Abnormal amounts of wasted material",
      "Storage of finished goods where no further production stage requires it",
      "Costs of delivering goods to customers",
      "Import duties and non-recoverable purchase taxes",
      "Inward freight and handling",
      "Fixed production overheads absorbed at normal capacity",
    ],
    [0, 1, 2],
    "ABNORMAL WASTE, FINISHED-GOODS STORAGE and OUTWARD DELIVERY. Normal waste IS included; storage is included only where a further production stage requires it, as with maturing whisky. Note the freight distinction the last two options set up: freight IN is a cost of purchase, freight OUT is a selling cost."),

  q("FRK-12-04", "FR-12", "B", "medium",
    "Inventory line X has a cost of $40,000 and an NRV of $46,000. Line Y has a cost of $30,000 and an NRV of $22,000. At what total is inventory carried?",
    ["$62,000", "$70,000", "$68,000", "$52,000"],
    0,
    "$62,000. Item by item: X at its cost of $40,000 and Y at its NRV of $22,000. Comparing totals — $70,000 cost against $68,000 NRV — would suggest a write-down of only $2,000 and is not permitted, because X's unrealised $6,000 margin would be absorbing Y's $8,000 loss."),

  q("FRK-12-05", "FR-12", "B", "easy",
    "Which cost formula does IAS 2 PROHIBIT?",
    ["LIFO", "FIFO", "Weighted average cost", "Specific identification"],
    0,
    "LIFO. In a period of rising prices it leaves the oldest and least relevant costs in the statement of financial position, making that figure progressively less useful. FIFO and weighted average are both permitted; specific identification is REQUIRED where items are not ordinarily interchangeable or are segregated for specific projects."),

  q("FRK-12-06", "FR-12", "B", "medium",
    "Raw materials cost $80,000 and their current replacement cost is $68,000. The finished products into which they will be incorporated are expected to sell at a healthy profit above cost. What is the carrying amount of the raw materials?",
    [
      "$80,000 — no write-down is required because the finished products remain profitable",
      "$68,000, replacement cost being the best evidence of net realisable value",
      "$74,000, the average of the two",
      "$68,000, with the $12,000 recognised as an impairment loss",
    ],
    0,
    "$80,000 — NO WRITE-DOWN. IAS 2 expressly provides that materials are not written below cost where the finished products in which they will be incorporated are expected to be sold at or above cost. Replacement cost is the best evidence of their NRV only WHERE a write-down is required, which it is not here."),

  num("FRK-12-07", "FR-12", "B", "medium",
    "A dairy herd comprised 150 cows with a fair value less costs to sell of $1,100 each at the start of the year. At the year end there were 160 cows with a fair value less costs to sell of $1,180 each. Calculate the gain recognised in PROFIT OR LOSS, in $.",
    23800, "$", 1,
    "$23,800. Opening 150 × $1,100 = $165,000; closing 160 × $1,180 = $188,800. The whole movement goes to PROFIT OR LOSS — not other comprehensive income — and there is no depreciation and no lower-of-cost-and-NRV ceiling. The extra animals are simply part of the closing fair value; there is no separate cost of a calf to recognise."),

  q("FRK-12-08", "FR-12", "B", "hard",
    "An apple orchard comprises the trees, the fruit growing on them, and the apples once picked. How are the TREES accounted for?",
    [
      "As property, plant and equipment under IAS 16, because they are bearer plants",
      "As biological assets under IAS 41, at fair value less costs to sell",
      "As inventory under IAS 2",
      "As intangible assets, since the orchard's value derives from future harvests",
    ],
    0,
    "IAS 16 PPE. A BEARER PLANT — used to produce agricultural produce over more than one period, with only remote likelihood of being sold as produce — is outside IAS 41 and is depreciated like any other asset. The FRUIT growing on it is a biological asset at fair value less costs to sell, and once PICKED it becomes IAS 2 inventory at its fair value less costs to sell at harvest. Three standards, one orchard."),

  q("FRK-12-09", "FR-12", "B", "medium",
    "At what amount does harvested agricultural produce enter inventory?",
    [
      "Its fair value less costs to sell at the point of harvest, which becomes its cost for IAS 2",
      "The cost of growing it, accumulated under IAS 2",
      "Its selling price when eventually sold",
      "The lower of its accumulated cost and net realisable value",
    ],
    0,
    "FAIR VALUE LESS COSTS TO SELL AT HARVEST, WHICH BECOMES ITS IAS 2 COST. That amount is recognised as income at the point of harvest, and this handover between the two standards is the mechanic most often missed — candidates either keep the produce under IAS 41 or try to accumulate a growing cost under IAS 2."),
]

export const FR_KIT_B1: AccaQuestion[] = [...CH07, ...CH08, ...CH09, ...CH10, ...CH11, ...CH12]
