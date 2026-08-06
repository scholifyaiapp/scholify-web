import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fr-kit-builders"

/*
 * FR · Area D question kit — chapters 24 to 29.
 *
 * Preparation: IAS 1, IAS 7, and the four consolidation chapters. This is the most numeric
 * area of the paper and the file is weighted accordingly — a preparation skill tested as a
 * four-option MCQ is materially easier than the same skill as free entry, because a
 * candidate can recognise a familiar figure or eliminate two options on magnitude.
 *
 * The consolidation items deliberately isolate ONE working each — the share exchange, the
 * net assets closing column, the NCI, the unrealised profit's second leg — because that is
 * how Section A and Section B ask, and because a candidate who can produce goodwill but not
 * the NCI has a gap that a whole-question item would hide.
 *
 * All figures verified by script before authoring.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 24 · IAS 1 and single-entity preparation ── */

const CH24: AccaQuestion[] = [
  num("FRK-24-01", "FR-24", "D", "medium",
    "An entity issued $2,400,000 of 8% loan notes on 1 May; its year end is 31 December and $80,000 of interest has been paid. Calculate the ACCRUAL required at the year end, in $.",
    48000, "$", 1,
    "$48,000. Eight months' interest accrues from 1 May: $2,400,000 × 8% × 8/12 = $128,000, against $80,000 paid. The finance cost in profit or loss is the full $128,000. Charging a whole year's $192,000 ignores the issue date; charging only the cash paid ignores the accrual — and both errors also misstate the current liabilities."),

  q("FRK-24-02", "FR-24", "D", "medium",
    "An entity breaches a loan covenant on 10 December, making a $6m loan repayable on demand. Its year end is 31 December, and on 25 January the lender agrees not to demand repayment. How is the loan classified at the year end?",
    [
      "Current — the entity had no right at the reporting date to defer settlement",
      "Non-current — the lender's agreement is an adjusting event",
      "Split between current and non-current per the original schedule",
      "Non-current, with the breach disclosed in the notes",
    ],
    0,
    "CURRENT, IN FULL. Classification depends on the entity's rights AT the reporting date, and the breach had already occurred, so no right to defer existed. The lender's later agreement is a NON-adjusting event: disclosed, but it does not change the classification. Refinancing completed after the reporting date has the same non-effect."),

  multi("FRK-24-03", "FR-24", "D", "medium",
    "Which THREE items of other comprehensive income will NEVER be reclassified to profit or loss?",
    [
      "A revaluation surplus on property, plant and equipment",
      "Gains on an equity investment designated at FVTOCI",
      "Remeasurements of a defined benefit plan",
      "Gains on a debt instrument measured at FVTOCI",
      "The effective portion of a cash flow hedge",
      "Exchange differences on translating a foreign operation",
    ],
    [0, 1, 2],
    "THE FIRST THREE. IAS 1 requires OCI to be split between items that WILL and WILL NOT be reclassified, and this is the split. The reliable discriminator: the revaluation surplus and the EQUITY-FVTOCI reserve never touch profit; the DEBT-FVTOCI reserve does, as do hedging reserves and foreign operation translation differences."),

  q("FRK-24-04", "FR-24", "D", "medium",
    "Which of the following does IAS 1 PROHIBIT?",
    [
      "Offsetting assets against liabilities unless required or permitted by a Standard",
      "Presenting profit or loss and other comprehensive income in a single statement",
      "Aggregating immaterial items",
      "Changing the presentation of an item between periods where a change is justified",
    ],
    0,
    "OFFSETTING. The single-statement presentation is expressly permitted, aggregation of immaterial items is allowed, and a justified change of presentation is permitted provided the comparative is reclassified too. Note the related point on aggregation: combining a MATERIAL item with dissimilar items OBSCURES it, and obscuring is itself a failure of the materiality requirement."),

  num("FRK-24-05", "FR-24", "D", "medium",
    "A trial balance shows cost of sales of $5,200,000 before adjustments. Depreciation of $600,000 is to be charged to cost of sales, and inventory costing $60,000 with a net realisable value of $38,000 must be written down. Calculate cost of sales, in $.",
    5822000, "$", 1,
    "$5,822,000. $5,200,000 + $600,000 depreciation + $22,000 inventory write-down. The write-down is the excess of cost over NRV for THAT LINE only, applied item by item — and it belongs in cost of sales, not in operating expenses. A cost of sales working is worth building explicitly, because it is where three or four separate adjustments converge."),

  q("FRK-24-06", "FR-24", "D", "medium",
    "How is a deferred tax balance classified in the statement of financial position?",
    [
      "Always non-current, whatever the expected timing of reversal",
      "Current to the extent it reverses within twelve months",
      "Split between current and non-current on the basis of the underlying assets",
      "As a non-current asset or a current liability, depending on its sign",
    ],
    0,
    "ALWAYS NON-CURRENT. IAS 12 requires it regardless of when the temporary differences reverse — one of the few places where the general current/non-current logic is displaced by an explicit rule. Deferred tax is also never discounted, for the related reason that scheduling the reversals reliably would be impracticable."),

  q("FRK-24-07", "FR-24", "D", "hard",
    "When must an entity present a THIRD statement of financial position, at the beginning of the preceding period?",
    [
      "Where it has made a retrospective restatement or a retrospective reclassification",
      "In its first year of applying IFRS, in every case",
      "Where it has acquired a subsidiary during the period",
      "Where the current period is longer or shorter than twelve months",
    ],
    0,
    "ON A RETROSPECTIVE RESTATEMENT OR RECLASSIFICATION. The user needs to see the position the restated comparative starts from, which the two ordinary statements do not show. An acquisition, or a period of unusual length, requires disclosure but not a third statement."),
]

/* ── Chapter 25 · IAS 7 statements of cash flows ── */

const CH25: AccaQuestion[] = [
  q("FRK-25-01", "FR-25", "D", "easy",
    "In which section of the statement of cash flows is income tax paid presented?",
    [
      "Operating, unless it can be specifically identified with a financing or investing cash flow",
      "Financing, since it is a payment to a party outside the business",
      "Investing, since it does not arise from trading",
      "It is a matter of accounting policy choice",
    ],
    0,
    "OPERATING. IAS 7 requires it, and the policy CHOICE that does exist applies to interest paid and to interest and dividends received — not to tax. Classifying tax as financing because it feels like a payment to government rather than an operating cost is the standard error."),

  num("FRK-25-02", "FR-25", "D", "medium",
    "PPE carrying amount rose from $4,900,000 to $5,600,000. Depreciation for the year was $640,000 and assets with a carrying amount of $180,000 were disposed of. There were no revaluations. Calculate the cash paid for ADDITIONS, in $.",
    1520000, "$", 1,
    "$1,520,000. Closing $5,600,000 − opening $4,900,000 + depreciation $640,000 + disposals at carrying amount $180,000. The logic: the carrying amount rose $700,000 despite $820,000 leaving through depreciation and disposal, so $1,520,000 must have come in. Always check for a REVALUATION, which raises the carrying amount with no cash and must be removed before this calculation."),

  num("FRK-25-03", "FR-25", "D", "medium",
    "Assets with a carrying amount of $180,000 were disposed of at a loss of $45,000. Calculate the PROCEEDS shown in investing activities, in $.",
    135000, "$", 1,
    "$135,000. Proceeds = carrying amount disposed of MINUS the loss, or plus the gain. Using the $45,000 loss as the investing figure, or the $180,000 carrying amount, are both common — the statement of cash flows reports what was RECEIVED, and the loss is a reconciling adjustment in the operating section."),

  num("FRK-25-04", "FR-25", "D", "medium",
    "The current tax liability was $310,000 at the start of the year and $350,000 at the end. The tax charge for the year was $395,000. Calculate the tax PAID, in $.",
    355000, "$", 1,
    "$355,000. Opening $310,000 + charge $395,000 − closing $350,000. This same arithmetic works for interest paid and dividends paid: opening balance plus the charge less the closing balance. Using the charge as the cash figure is the error, and it will be wrong whenever the liability moved."),

  num("FRK-25-05", "FR-25", "D", "hard",
    "Retained earnings were $2,200,000 at the start of the year and $2,650,000 at the end. Profit for the year was $780,000. Calculate the dividends PAID, in $.",
    330000, "$", 1,
    "$330,000. Opening $2,200,000 + profit $780,000 − closing $2,650,000. The retained earnings account has only these three movements in a simple case, so the dividend is the missing figure. Watch for a transfer from revaluation surplus, which would also credit retained earnings and must be removed before deriving the dividend."),

  multi("FRK-25-06", "FR-25", "D", "medium",
    "Which THREE of the following appear NOWHERE in the statement of cash flows?",
    [
      "A bonus (scrip) issue of shares",
      "A revaluation of property",
      "The recognition of a right-of-use asset and lease liability at lease commencement",
      "The principal element of lease payments",
      "Proceeds from a rights issue of shares",
      "Interest paid on a bank loan",
    ],
    [0, 1, 2],
    "THE FIRST THREE — all non-cash. A bonus issue moves reserves, a revaluation changes a carrying amount, and lease inception recognises an asset and a liability without any cash moving. Only the subsequent lease PAYMENTS appear. Significant non-cash transactions are DISCLOSED in the notes, which is where the marks for spotting them usually are."),

  q("FRK-25-07", "FR-25", "D", "medium",
    "An increase in trade receivables during the year has what effect in the operating section?",
    [
      "It is deducted, being an outflow — cash is tied up in the receivable",
      "It is added, since receivables are an asset",
      "It has no effect, being a working capital movement",
      "It is deducted from investing activities",
    ],
    0,
    "DEDUCTED. The rule is that an increase in an ASSET is an OUTFLOW and an increase in a LIABILITY is an INFLOW. Revenue has been recognised but the cash has not arrived, so operating cash flow is lower than profit by the increase. Getting the sign wrong here reverses the whole operating section."),

  q("FRK-25-08", "FR-25", "D", "hard",
    "An entity reports rising profit and falling operating cash flow. Which is the most likely explanation?",
    [
      "Growth is absorbing cash into receivables and inventory faster than profit is generating it",
      "The entity has repaid a substantial loan",
      "The entity has revalued its properties upwards",
      "Depreciation has increased",
    ],
    0,
    "WORKING CAPITAL ABSORPTION — the overtrading pattern. Loan repayment is a FINANCING outflow and does not touch operating cash flow; a revaluation is non-cash and affects neither; and higher depreciation would INCREASE operating cash flow relative to profit, being added back. Only the first explanation puts profit and operating cash flow in opposite directions."),
]

/* ── Chapter 26 · Consolidated SOFP: goodwill and NCI ── */

const CH26: AccaQuestion[] = [
  num("FRK-26-01", "FR-26", "D", "medium",
    "A parent acquires 600,000 of a subsidiary's shares through a share exchange of three parent shares for every four acquired. The parent's shares have a nominal value of $1 and a market value of $4.20 at the acquisition date. It also pays $900,000 cash and $70,000 in professional fees. Calculate the CONSIDERATION TRANSFERRED, in $.",
    2790000, "$", 1,
    "$2,790,000. Shares issued: 600,000 × 3/4 = 450,000, valued at the parent's market price of $4.20 = $1,890,000, plus $900,000 cash. The $70,000 of professional fees is EXPENSED, not added — including it is the commonest error and it inflates goodwill. Valuing the shares at their $1 nominal value would give $1,350,000 and understate consideration by $1,440,000."),

  num("FRK-26-02", "FR-26", "D", "hard",
    "A parent acquires 75% of a subsidiary for consideration of $2,790,000. At acquisition the subsidiary's share capital was $1,000,000, its retained earnings $1,400,000, and its land had a fair value $300,000 above carrying amount. NCI is measured at its proportionate share of net assets. Calculate GOODWILL, in $.",
    765000, "$", 1,
    "$765,000. Net assets at acquisition = $1,000,000 + $1,400,000 + $300,000 = $2,700,000. Goodwill = $2,790,000 consideration + (25% × $2,700,000 = $675,000) NCI − $2,700,000 = $765,000. Had NCI been measured at a fair value of $720,000 instead, goodwill would be $810,000 — the $45,000 difference being the NCI's share of goodwill."),

  num("FRK-26-03", "FR-26", "D", "hard",
    "Continuing the previous question, the subsidiary's retained earnings at the reporting date are $1,900,000 and the land uplift is unchanged. Calculate the NON-CONTROLLING INTEREST at the reporting date, in $.",
    800000, "$", 1,
    "$800,000. NCI at acquisition $675,000 plus 25% of the post-acquisition movement. The movement is the change in ADJUSTED net assets: retained earnings rose $500,000 and the land uplift is unchanged (land is not depreciated), so 25% × $500,000 = $125,000. Under the fair value method the answer would be $720,000 + $125,000 = $845,000."),

  num("FRK-26-04", "FR-26", "D", "medium",
    "A parent's own retained earnings are $3,600,000. Its 75%-owned subsidiary's retained earnings rose from $1,400,000 at acquisition to $1,900,000 at the reporting date, with no other adjustments. Calculate GROUP retained earnings, in $.",
    3975000, "$", 1,
    "$3,975,000. The parent's own $3,600,000 plus 75% of the $500,000 POST-acquisition movement. The subsidiary's PRE-acquisition retained earnings of $1,400,000 never enter group reserves — they were purchased and are represented within goodwill. Adding all of the subsidiary's $1,900,000 would bring in both the pre-acquisition reserves and the NCI's share."),

  q("FRK-26-05", "FR-26", "D", "easy",
    "What appears in the consolidated statement of financial position for the parent's investment in its subsidiary?",
    [
      "Nothing — it is replaced by goodwill and the subsidiary's net assets",
      "The cost of the investment, within non-current assets",
      "The parent's share of the subsidiary's net assets",
      "The cost of the investment less any impairment",
    ],
    0,
    "NOTHING. The cost of investment is eliminated inside the goodwill calculation and replaced by the goodwill plus the subsidiary's identifiable assets and liabilities, added in full. Retaining the investment as well double counts the acquisition — and it is one of the easiest errors for a marker to spot."),

  q("FRK-26-06", "FR-26", "D", "medium",
    "What share capital appears in the consolidated statement of financial position?",
    [
      "The parent's only, including any shares issued as acquisition consideration",
      "The parent's plus the parent's share of the subsidiary's",
      "The parent's plus all of the subsidiary's",
      "The parent's, with the subsidiary's shown within non-controlling interest",
    ],
    0,
    "THE PARENT'S ONLY. The subsidiary's share capital was eliminated against the cost of investment in the goodwill working, so including it again double counts. This is also a free check on the whole answer: consolidated share capital should equal the parent's, adjusted only for shares issued as consideration."),

  q("FRK-26-07", "FR-26", "D", "medium",
    "How is CONTINGENT consideration measured at the acquisition date?",
    [
      "At fair value, whether or not payment is probable",
      "At the undiscounted amount that may become payable",
      "Not recognised until payment becomes probable",
      "At the amount management considers most likely",
    ],
    0,
    "AT FAIR VALUE, REGARDLESS OF PROBABILITY. This surprises candidates who apply IAS 37's probability threshold, but IFRS 3 requires fair value at the acquisition date. Subsequent remeasurement generally goes to PROFIT OR LOSS rather than adjusting goodwill — goodwill is not restated for changes in estimate after the measurement period."),

  q("FRK-26-08", "FR-26", "D", "hard",
    "Under the PROPORTIONATE method of measuring NCI, how is a goodwill impairment tested and recognised?",
    [
      "Goodwill is notionally grossed up to 100% for the test, and only the group's share of the resulting impairment is recognised",
      "Goodwill is tested as recognised, and the impairment is allocated between the parent and the NCI",
      "Goodwill is tested as recognised, and the whole impairment falls on the parent",
      "No impairment test is required, since only the parent's share is recognised",
    ],
    0,
    "GROSS UP, THEN RECOGNISE THE GROUP'S SHARE. The unit's recoverable amount reflects 100% of the business, so the carrying amount must too — otherwise the comparison is unbalanced. Under the FULL goodwill method no grossing up is needed and the impairment IS shared with the NCI, because all of the goodwill is already recognised."),
]

/* ── Chapter 27 · Consolidation adjustments ── */

const CH27: AccaQuestion[] = [
  num("FRK-27-01", "FR-27", "D", "medium",
    "A parent sold goods to its subsidiary for $500,000 at a MARGIN of 20%. The subsidiary still holds 40% of these goods at the reporting date. Calculate the unrealised profit to be eliminated, in $.",
    40000, "$", 1,
    "$40,000. Goods still held: $500,000 × 40% = $200,000 at transfer price, and a 20% MARGIN means the profit is 20/100 of selling price: $200,000 × 20% = $40,000. Had the terms been a 20% MARK-UP the fraction would be 20/120, giving $33,333. Confusing margin with mark-up is one of the most reliable ways to lose a consolidation mark."),

  num("FRK-27-02", "FR-27", "D", "hard",
    "A parent sold goods to its subsidiary for $500,000 at a MARK-UP of 30% on cost. The subsidiary still holds 40% at the reporting date. Calculate the unrealised profit, in $.",
    46154, "$", 2,
    "$46,154. Goods held $200,000 at transfer price, and a mark-up of 30% on COST means the profit is 30/130 of the SELLING price: $200,000 × 30/130 = $46,154. Applying 30/100 would give $60,000 — the margin treatment, and $13,846 too much. Mark-up x% → x/(100+x); margin x% → x/100."),

  q("FRK-27-03", "FR-27", "D", "medium",
    "A 60%-owned SUBSIDIARY sold goods to its parent, and $30,000 of unrealised profit remains in group inventory. How is the adjustment made?",
    [
      "Reduce inventory by $30,000 and the subsidiary's closing net assets by $30,000, so group reserves fall $18,000 and NCI $12,000",
      "Reduce inventory by $30,000 and group reserves by $30,000",
      "Reduce inventory by $18,000, being the group's share",
      "No adjustment, since the parent was the purchaser",
    ],
    0,
    "REDUCE THE SUBSIDIARY'S NET ASSETS, SO THE NCI SHARES IT. The unrealised profit was recognised in the SELLER's books, and where the seller is a partly-owned subsidiary some of those shareholders are the non-controlling interest. Inventory always falls by the FULL $30,000 — only the reserves split. Had the PARENT sold, the whole $30,000 would reduce group reserves alone."),

  num("FRK-27-04", "FR-27", "D", "medium",
    "At acquisition three years ago, a subsidiary's plant had a fair value $400,000 above its carrying amount, with a remaining useful life of five years. The subsidiary has not adjusted its own records. Calculate the amount included in the CLOSING column of the net assets working, in $.",
    160000, "$", 1,
    "$160,000. Extra depreciation is $400,000 ÷ 5 = $80,000 a year, so $240,000 has accumulated over three years and the closing column carries $400,000 − $240,000 = $160,000. The ACQUISITION column still carries the full $400,000. Carrying $400,000 in both columns overstates PPE by $240,000 and inflates both group reserves and the NCI."),

  q("FRK-27-05", "FR-27", "D", "medium",
    "A parent's records show $95,000 owed by its subsidiary; the subsidiary's show $80,000, the difference being goods in transit. What is done before elimination?",
    [
      "Increase the subsidiary's inventory and payable by $15,000, then eliminate $95,000 from both sides",
      "Reduce the parent's receivable to $80,000 and eliminate $80,000",
      "Eliminate $80,000 and leave $15,000 within group receivables",
      "Increase the parent's cash by $15,000 and eliminate $80,000",
    ],
    0,
    "RECORD THE GOODS IN THE BUYER'S BOOKS FIRST. Always adjust the RECEIVING company — the one that has not yet recorded the transaction. The balances then agree at $95,000 and are eliminated. And the inventory added carries unrealised profit, which must be removed separately. For CASH in transit the same logic applies but the debit is to cash."),

  q("FRK-27-06", "FR-27", "D", "medium",
    "How is intra-group interest on a loan between a parent and its subsidiary treated on consolidation?",
    [
      "The interest income is eliminated against the interest expense, together with any accrued interest balance",
      "Only the interest expense is eliminated, since the income is genuine to the lender",
      "Neither is eliminated, since the interest represents a real cash flow",
      "The net amount is presented within finance costs",
    ],
    0,
    "ELIMINATE BOTH, AND THE ACCRUAL. A group cannot earn interest from itself. The check is the same as for any intra-group item: after the adjustment, group profit and group net assets should be unchanged by the loan's existence. Accrued interest sits in receivables in one company and payables in the other and is often missed."),

  q("FRK-27-07", "FR-27", "D", "hard",
    "At acquisition a subsidiary had a contingent liability meeting the IFRS 3 recognition criteria, which it had not recognised in its own statements. What is the effect on the consolidation?",
    [
      "It is recognised at fair value in the acquisition column of the net assets working, reducing net assets acquired and so increasing goodwill",
      "It is ignored, because the subsidiary did not recognise it",
      "It is disclosed only, as a contingent liability of the group",
      "It is recognised only if it becomes probable after the acquisition",
    ],
    0,
    "RECOGNISED AT FAIR VALUE, INCREASING GOODWILL. Fair value adjustments can arise on items the subsidiary has NOT recognised at all — a contingent liability meeting the IFRS 3 criteria, or an intangible it could not recognise because it was internally generated. Reducing net assets acquired increases the goodwill figure, because the parent paid the same consideration for less."),
]

/* ── Chapter 28 · Consolidated statement of profit or loss ── */

const CH28: AccaQuestion[] = [
  num("FRK-28-01", "FR-28", "D", "medium",
    "A parent acquires 60% of a subsidiary on 1 July. The subsidiary's revenue for the full year is $3,600,000, accruing evenly, and it sold $200,000 of goods to the parent after acquisition. Calculate the amount of the subsidiary's revenue included in CONSOLIDATED revenue, in $.",
    1600000, "$", 1,
    "$1,600,000. Six months are post-acquisition: $3,600,000 × 6/12 = $1,800,000, less the $200,000 intra-group elimination. Note revenue is consolidated IN FULL, not at 60% — the ownership percentage affects only the attribution of profit. Consolidating 60% would give $960,000 and is a fundamental misunderstanding rather than an arithmetic slip."),

  q("FRK-28-02", "FR-28", "D", "medium",
    "A parent acquired a subsidiary on 1 April. During the year the two traded, with $600,000 of sales between them, of which $400,000 arose after 1 April. How much is eliminated from consolidated revenue?",
    ["$400,000", "$600,000", "$200,000", "Nothing, since the sales were to a third party before acquisition"],
    0,
    "$400,000 — the POST-ACQUISITION sales only. Before 1 April the two companies were unconnected, so those sales were genuine third-party revenue for whichever recorded them. Eliminating the full $600,000 understates consolidated revenue by $200,000. The same restriction applies to the unrealised profit calculation."),

  num("FRK-28-03", "FR-28", "D", "hard",
    "Consolidated profit for the year is $2,980,000. A 75%-owned subsidiary's post-acquisition profit after tax is $675,000, from which $75,000 of extra depreciation on a fair value uplift and $20,000 of unrealised profit on its own sales to the parent must be deducted. Calculate the profit attributable to the OWNERS OF THE PARENT, in $.",
    2835000, "$", 1,
    "$2,835,000. The subsidiary's ADJUSTED profit is $675,000 − $75,000 − $20,000 = $580,000, so the NCI is 25% × $580,000 = $145,000 and the parent's share is the balance: $2,980,000 − $145,000. Always compute the NCI and take the parent's share as the RESIDUAL — computing both independently guarantees they will not reconcile to consolidated profit."),

  q("FRK-28-04", "FR-28", "D", "medium",
    "Which of the following reduces the subsidiary's profit for the purposes of the NCI attribution?",
    [
      "Extra depreciation on a fair value uplift to the subsidiary's plant",
      "Unrealised profit on goods the PARENT sold to the subsidiary",
      "A goodwill impairment where NCI is measured at its proportionate share of net assets",
      "Acquisition professional fees expensed by the parent",
    ],
    0,
    "THE EXTRA FAIR VALUE DEPRECIATION. The organising rule is that an adjustment affects the NCI if and only if it arose in the SUBSIDIARY's own results. The parent's unrealised profit and the parent's acquisition costs did not. And under the PROPORTIONATE method only the parent's share of goodwill is recognised, so the whole recognised impairment falls on the parent."),

  q("FRK-28-05", "FR-28", "D", "medium",
    "How is a dividend received by a parent from its subsidiary presented in the consolidated statement of profit or loss?",
    [
      "It is eliminated — the group's return from the subsidiary is its share of the subsidiary's profit",
      "As investment income within other income",
      "As a deduction from the non-controlling interest",
      "As a reduction of the carrying amount of the investment",
    ],
    0,
    "ELIMINATED. The whole of the subsidiary's profit is already consolidated, so also recognising the dividend would count the same earnings twice. Note the CONTRAST with an associate, where a dividend received DOES reduce the carrying amount of the investment — because there the group has recognised only its share of profit, not the associate's revenue and expenses."),

  q("FRK-28-06", "FR-28", "D", "medium",
    "Does attributing part of consolidated profit to the non-controlling interest reduce consolidated profit?",
    [
      "No — it splits profit below the profit line, and the two parts add back to the total",
      "Yes — consolidated profit is stated net of the NCI's share",
      "Yes, but only where NCI is measured at fair value",
      "No — the NCI's share is presented as an expense within operating costs",
    ],
    0,
    "NO — IT IS AN ATTRIBUTION, NOT A DEDUCTION. Consolidated profit is the whole economic entity's, and it is then divided between the owners of the parent and the NCI beneath the profit line. The two attributed figures must add back to it, and that is the single most useful arithmetic check in a group profit question."),
]

/* ── Chapter 29 · IAS 28 associates ── */

const CH29: AccaQuestion[] = [
  num("FRK-29-01", "FR-29", "D", "medium",
    "An investor acquired 35% of an associate for $1,500,000. In the year the associate made a profit after tax of $800,000 and paid dividends of $300,000. Calculate the carrying amount of the investment at the reporting date, in $.",
    1675000, "$", 1,
    "$1,675,000. Cost $1,500,000 plus the share of profit 35% × $800,000 = $280,000, less the dividend received 35% × $300,000 = $105,000. The dividend REDUCES the investment rather than being income — recognising both the share of profit and the dividend as income would double count, because the dividend distributes profit already recognised."),

  num("FRK-29-02", "FR-29", "D", "hard",
    "An investor holding 35% of an associate sold it goods for $300,000 at a margin of 25%; the associate still holds half at the year end. Calculate the unrealised profit ELIMINATED, in $.",
    13125, "$", 1,
    "$13,125. Total unrealised profit is $300,000 × 50% × 25% = $37,500, but only the GROUP's SHARE is eliminated: 35% × $37,500. The other 65% was realised in a transaction with the associate's OTHER shareholders. This differs from a subsidiary, where the FULL unrealised profit is eliminated because the group controls both sides."),

  q("FRK-29-03", "FR-29", "D", "easy",
    "Where is the share of an associate's profit presented in the consolidated statement of profit or loss?",
    [
      "As a single line after operating profit, normally before tax",
      "Within revenue",
      "Within operating profit, as other income",
      "As a separate component of other comprehensive income",
    ],
    0,
    "A SINGLE LINE AFTER OPERATING PROFIT. This placement is why a margin computed on PROFIT BEFORE TAX is overstated whenever there is an associate: the associate's profit is in the numerator and none of its revenue is in the denominator. Use OPERATING profit for margin analysis and say that you have."),

  q("FRK-29-04", "FR-29", "D", "medium",
    "Are balances between a group and its associate eliminated on consolidation?",
    [
      "No — the associate is outside the group, so a receivable from it is a receivable from a third party",
      "Yes, in full, as for a subsidiary",
      "Yes, but only to the extent of the group's percentage holding",
      "Only where the associate is in the same industry as the group",
    ],
    0,
    "NOT ELIMINATED. The associate is not part of the group, so amounts owed by it are genuinely owed from outside and stay on the face of the statement. Contrast the unrealised profit treatment, where the group's SHARE is eliminated — so the two rules point in different directions and are examined together for that reason."),

  q("FRK-29-05", "FR-29", "D", "hard",
    "An associate's cumulative losses have reduced the investment's carrying amount to nil, with $90,000 of the investor's share of losses unrecognised. The associate then makes a profit of which the investor's share is $250,000. What is recognised?",
    ["$160,000", "$250,000", "Nil", "$90,000"],
    0,
    "$160,000. The share of profit is first applied against the unrecognised losses, so only the excess is recognised: $250,000 − $90,000. The investor cannot report a gain until the associate has recovered the ground the investor did not report losing. Recognising losses beyond a nil carrying amount is only required where the investor has a legal or constructive obligation to fund them."),

  q("FRK-29-06", "FR-29", "D", "medium",
    "How is an investment in an associate tested for impairment?",
    [
      "The whole investment, including the goodwill embedded within it, is tested as a single asset under IAS 36",
      "The goodwill component is tested separately and annually",
      "The investor's share of the associate's individual assets is tested",
      "No impairment test applies, because the equity method already reflects the associate's performance",
    ],
    0,
    "AS A SINGLE ASSET. Equity accounting never separated the goodwill out, so there is nothing to test separately — and that has a useful consequence: an impairment of an investment in an associate CAN be REVERSED, because it is not an impairment of goodwill as such. Contrast a subsidiary's goodwill, where reversal is never permitted."),

  q("FRK-29-07", "FR-29", "D", "medium",
    "Does a non-controlling interest arise in an associate?",
    [
      "No — the investor recognises only its own share, so there is no NCI",
      "Yes, equal to the proportion the investor does not own",
      "Yes, but only where the investor holds more than 40%",
      "Yes, presented within the investment in associate line",
    ],
    0,
    "NO NCI. The equity method brings in only the investor's own share of the associate's net assets and profit, so there is nothing left over to attribute to anyone else. A non-controlling interest arises only where assets and liabilities have been consolidated IN FULL — which happens for a subsidiary and never for an associate."),
]

export const FR_KIT_D: AccaQuestion[] = [...CH24, ...CH25, ...CH26, ...CH27, ...CH28, ...CH29]
