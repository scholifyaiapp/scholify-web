import type { AccaQuestion } from "@/lib/acca-content"
import { q, num } from "@/lib/acca-fr-kit-builders"

/*
 * FR · additional practice depth on the highest-yield chapters.
 *
 * ── Why a separate file rather than more items in the per-chapter kits ──
 * The per-chapter kits give every one of FR's 34 chapters at least five authored questions,
 * which is the floor the contract polices: no chapter goes unexamined. But FR's marks are
 * not distributed evenly across its chapters, and a bank that mirrors the chapter structure
 * mirrors the wrong distribution.
 *
 * IAS 16 appears in Section A almost every sitting. Leases, revenue and the consolidation
 * workings carry most of Section B and much of Section C. IAS 12 appears in nearly every
 * preparation question. So those chapters need more practice than a per-chapter floor
 * produces, and this file supplies it — deliberately weighted towards NUMERIC entry, since
 * that is where the extra difficulty in those topics actually lies.
 *
 * Keeping it separate also keeps the per-chapter files readable as teaching sequences,
 * rather than turning the IAS 16 chapter's kit into a wall of twenty questions.
 *
 * All figures verified by script before authoring.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Non-current assets: extra depth on chapters 7, 8 and 11 ── */

const NCA: AccaQuestion[] = [
  num("FRK-DX-01", "FR-08", "B", "medium",
    "A machine cost $900,000 and is depreciated at 25% a year on the REDUCING BALANCE basis. Calculate its carrying amount after two years, in $.",
    506250, "$", 1,
    "$506,250. Year 1: $900,000 × 25% = $225,000, leaving $675,000. Year 2: $675,000 × 25% = $168,750, leaving $506,250. Applying 25% to the original cost twice would give $450,000 — the straight-line answer, and the standard error with reducing balance."),

  num("FRK-DX-02", "FR-08", "B", "hard",
    "A building cost $4,500,000 on 1 January 20X1 and is depreciated over 50 years with no residual value. On 31 December 20X8 it is revalued to $4,200,000. Calculate the revaluation SURPLUS, in $.",
    420000, "$", 1,
    "$420,000. Annual depreciation $4,500,000 ÷ 50 = $90,000, so after eight years the carrying amount is $4,500,000 − $720,000 = $3,780,000, and the surplus is $4,200,000 − $3,780,000. Note the trap in the figures: fair value of $4,200,000 is BELOW original cost, yet there is still a surplus — because the comparison is with CARRYING AMOUNT, not cost."),

  num("FRK-DX-03", "FR-08", "B", "medium",
    "Following that revaluation to $4,200,000, the remaining useful life is 42 years. Calculate the new annual depreciation charge, in $.",
    100000, "$", 1,
    "$100,000. $4,200,000 ÷ 42. The charge rises from $90,000, so the revaluation REDUCES future reported profit by $10,000 a year — which is the point an interpretation requirement would pick up, and the reason a revaluing entity looks less profitable than one on the cost model."),

  num("FRK-DX-04", "FR-11", "B", "hard",
    "An asset with a carrying amount of $1,000,000 could be sold for $890,000 with disposal costs of $35,000. If retained it will generate $240,000 a year for five years; the five-year annuity factor at 12% is 3.605. Calculate the impairment loss, in $.",
    134800, "$", 1,
    "$134,800. Fair value less costs of disposal is $855,000; value in use is $240,000 × 3.605 = $865,200. Recoverable amount is the HIGHER — $865,200 — so the loss is $1,000,000 − $865,200. Taking the lower figure would give $145,000 and overstate the loss by $10,200."),

  q("FRK-DX-05", "FR-07", "B", "medium",
    "An entity capitalises $300,000 for a five-yearly statutory inspection of a ship, without which it cannot sail, treating the inspection as a separate component. The previous inspection component has a carrying amount of $40,000. What is charged to profit or loss?",
    [
      "A loss of $40,000 on derecognition of the previous inspection component",
      "Nothing — the $300,000 is capitalised in full",
      "$300,000, since an inspection restores rather than enhances",
      "$260,000, being the excess of the new cost over the old carrying amount",
    ],
    0,
    "A $40,000 DERECOGNITION LOSS. The new inspection is capitalised and the previous component's carrying amount is removed. This treatment works ONLY because the entity identified the inspection as a component — otherwise there would be nothing to derecognise and the cost would be an expense."),

  q("FRK-DX-06", "FR-08", "B", "hard",
    "An asset previously written down by $200,000 through PROFIT OR LOSS on a downward revaluation is now revalued upwards by $300,000. How is the gain recognised?",
    [
      "$200,000 in profit or loss, reversing the earlier charge, and $100,000 in other comprehensive income",
      "$300,000 in other comprehensive income",
      "$300,000 in profit or loss",
      "$100,000 in profit or loss and $200,000 in other comprehensive income",
    ],
    0,
    "$200,000 TO PROFIT, THEN $100,000 TO OCI. A revaluation gain goes to OCI EXCEPT to the extent it reverses a previous downward revaluation charged to profit or loss for the same asset — that part goes back through profit. The ordering mirrors the downward case, where the OCI buffer is used first and only the excess reaches profit."),
]

/* ── Leases: extra depth on chapters 13 and 14 ── */

const LEASES: AccaQuestion[] = [
  num("FRK-DX-07", "FR-13", "B", "hard",
    "An entity leases equipment for five years with annual payments of $40,000 payable IN ADVANCE. The rate implicit in the lease is 6%; the four-year annuity factor at 6% is 3.465. Calculate the initial lease liability, in $.",
    178600, "$", 5,
    "$178,600. With payments in advance the discount factor is 1 + the FOUR-year annuity factor, because the first payment is made immediately and is not discounted: $40,000 × (1 + 3.465) = $40,000 × 4.465. Using the five-year factor of 4.212 would give $168,480 and understate the liability — a five-year in-advance lease discounts over four years, not five."),

  num("FRK-DX-08", "FR-13", "B", "hard",
    "Using that lease, calculate the lease liability at the end of YEAR 1, in $.",
    146916, "$", 5,
    "$146,916. In advance, the order is: opening $178,600, DEDUCT the payment of $40,000 to give $138,600, then charge interest of $138,600 × 6% = $8,316. Charging interest before deducting the payment — the in-arrears order — would give $149,316 and overstate both the liability and the finance cost every year thereafter."),

  q("FRK-DX-09", "FR-13", "B", "medium",
    "An entity's lease requires payments of $2,000 a month plus 1% of the revenue generated by the leased retail unit. How are the variable payments treated?",
    [
      "Excluded from the lease liability and expensed as incurred, because they depend on sales",
      "Included in the lease liability using estimated future revenue",
      "Included in the lease liability at the current year's revenue level",
      "Capitalised as an addition to the right-of-use asset each year",
    ],
    0,
    "EXCLUDED AND EXPENSED. Payments varying with USAGE or SALES are excluded from the liability, because their amount depends on future activity rather than on the passage of time. Contrast INDEX- or RATE-linked variable payments, which ARE included, measured using the index or rate at commencement."),

  num("FRK-DX-10", "FR-14", "B", "hard",
    "An asset with a carrying amount of $2,100,000 is sold for its fair value of $2,800,000 and leased back; the present value of the lease payments is $700,000 and the transfer is a sale. Calculate the GAIN recognised, in $.",
    525000, "$", 1,
    "$525,000. Total gain $2,800,000 − $2,100,000 = $700,000, of which the proportion relating to rights TRANSFERRED is ($2,800,000 − $700,000)/$2,800,000 = 75%. So $700,000 × 75% = $525,000. The right-of-use asset is $2,100,000 × 25% = $525,000, and the unrecognised $175,000 of gain emerges through lower depreciation rather than as a deferred balance."),
]

/* ── Revenue and provisions: extra depth on chapters 15, 16 and 17 ── */

const REV: AccaQuestion[] = [
  num("FRK-DX-11", "FR-15", "B", "hard",
    "A contract for $950,000 comprises three performance obligations with standalone selling prices of $300,000, $450,000 and $250,000. Calculate the amount allocated to the SECOND obligation, in $.",
    427500, "$", 1,
    "$427,500. Total standalone selling prices are $1,000,000, so the second obligation takes $950,000 × $450,000/$1,000,000. The $50,000 discount is allocated PROPORTIONATELY across all three unless there is evidence it relates to a specific obligation. Allocating on the contract's own stated prices, or on cost, is not permitted."),

  num("FRK-DX-12", "FR-17", "B", "hard",
    "An entity sold 80,000 units with a warranty. Experience indicates 70% will require no work, 20% will need repairs costing $50 and 10% will need replacement costing $400. Calculate the warranty provision, in $.",
    4000000, "$", 1,
    "$4,000,000. Expected value per unit: (20% × $50) + (10% × $400) = $10 + $40 = $50, times 80,000 units. The 70% contributes nothing. Using the MOST LIKELY outcome would give nil — appropriate for a single obligation, wrong for a large population, and the distinction is the examinable point."),

  q("FRK-DX-13", "FR-16", "B", "hard",
    "An entity sells software with a two-year 'premium support' package that customers may decline, and also gives a statutory twelve-month assurance that the software will function as specified. How are the two dealt with?",
    [
      "The support package is a separate performance obligation under IFRS 15; the statutory assurance gives rise to an IAS 37 provision",
      "Both are separate performance obligations under IFRS 15",
      "Both give rise to IAS 37 provisions",
      "The statutory assurance is a performance obligation; the optional support is a provision",
    ],
    0,
    "OPTIONAL SUPPORT IS AN OBLIGATION; THE STATUTORY ASSURANCE IS A PROVISION. The discriminator is whether the customer could have DECLINED it: an optional or separately priced warranty is service-type and takes part of the transaction price, while a legally required assurance that the product works is assurance-type and produces an IAS 37 provision instead."),

  q("FRK-DX-14", "FR-15", "B", "hard",
    "An entity manufactures a bespoke machine usable only by one customer. The contract gives no right to payment if the customer cancels before delivery. When is revenue recognised?",
    [
      "At the point control transfers on delivery, because the enforceable-right-to-payment limb is not met",
      "Over time, because the asset has no alternative use to the entity",
      "Over time, using an input method based on costs incurred",
      "On signature of the contract, since the machine cannot be sold elsewhere",
    ],
    0,
    "AT A POINT IN TIME. The third over-time condition has TWO limbs joined by AND — no alternative use AND an enforceable right to payment for performance to date. Without the payment right the condition fails, whatever the specialisation, and revenue is deferred until control transfers. Adding a single cancellation clause would reverse the answer, which is why the contract terms matter more than the nature of the asset."),
]

/* ── Consolidation and tax: extra depth on chapters 20, 25, 26, 28 and 29 ── */

const GROUPS: AccaQuestion[] = [
  num("FRK-DX-15", "FR-26", "D", "hard",
    "A parent acquired 70% of a subsidiary for $1,500,000 cash plus deferred consideration of $1,100,000 payable in two years. The two-year discount factor at 7% is 0.873. Calculate the CONSIDERATION TRANSFERRED, in $.",
    2460300, "$", 1,
    "$2,460,300. Deferred consideration is measured at PRESENT VALUE: $1,100,000 × 0.873 = $960,300, plus the $1,500,000 cash. Using the undiscounted $1,100,000 would overstate consideration and goodwill by $139,700. The discount then unwinds to FINANCE COSTS over the two years, so the total eventually charged is the full $1,100,000."),

  num("FRK-DX-16", "FR-26", "D", "hard",
    "Continuing that acquisition, at acquisition the subsidiary's share capital was $800,000, retained earnings $1,100,000, a property was worth $250,000 above carrying amount, and a contingent liability meeting the IFRS 3 criteria had a fair value of $150,000 and was unrecognised by the subsidiary. NCI is measured proportionately. Calculate GOODWILL, in $.",
    1060300, "$", 1,
    "$1,060,300. Net assets at acquisition = $800,000 + $1,100,000 + $250,000 − $150,000 = $2,000,000. Goodwill = $2,460,300 + (30% × $2,000,000 = $600,000) − $2,000,000. Note the contingent liability REDUCES net assets acquired and so INCREASES goodwill — the parent paid the same consideration for less. Ignoring it would give goodwill of $955,300."),

  num("FRK-DX-17", "FR-28", "D", "medium",
    "A parent acquired 70% of a subsidiary on 1 May; both have a 31 December year end and the subsidiary's revenue accrues evenly. The subsidiary's revenue for the full year is $2,400,000, with no intra-group sales. Calculate the amount included in consolidated revenue, in $.",
    1600000, "$", 1,
    "$1,600,000. Eight months are post-acquisition: $2,400,000 × 8/12. Revenue is consolidated IN FULL for that period, never at the ownership percentage — 70% of $1,600,000 would be $1,120,000 and reflects a fundamental misunderstanding of consolidation rather than an arithmetic slip."),

  num("FRK-DX-18", "FR-28", "D", "hard",
    "A subsidiary's post-acquisition profit after tax is $560,000, from which $60,000 of extra fair value depreciation and $20,000 of unrealised profit on its own sales to the parent must be deducted. The NCI is 30%. Calculate the profit attributable to the NON-CONTROLLING INTEREST, in $.",
    144000, "$", 1,
    "$144,000. The adjusted profit is $560,000 − $60,000 − $20,000 = $480,000, and the NCI takes 30% of it. Computing 30% of the UNADJUSTED $560,000 would give $168,000 — a $24,000 overstatement, and the commonest error in a group profit question."),

  num("FRK-DX-19", "FR-29", "D", "medium",
    "An investor holds 40% of an associate which made a profit after tax of $950,000. Calculate the 'share of profit of associate' presented in the consolidated statement of profit or loss, in $.",
    380000, "$", 1,
    "$380,000. Simply 40% of the associate's profit AFTER TAX, presented as a single line after operating profit. None of the associate's revenue or expenses is consolidated — which is exactly why a margin computed on profit BEFORE TAX is overstated whenever an associate is held."),

  num("FRK-DX-20", "FR-20", "B", "medium",
    "A property is revalued upwards by $500,000 with no corresponding adjustment to its tax base. The tax rate is 25%. Calculate the deferred tax charged to OTHER COMPREHENSIVE INCOME, in $.",
    125000, "$", 1,
    "$125,000. $500,000 × 25%, charged to OCI because the revaluation surplus that gave rise to it was recognised there. So the NET amount reported in other comprehensive income is $375,000 rather than the gross $500,000 — which is why an entity's OCI is always less than the headline revaluation figure."),

  num("FRK-DX-21", "FR-25", "D", "hard",
    "Profit before tax is $1,420,000. Depreciation for the year was $680,000; there was a $55,000 GAIN on disposal of plant; finance costs charged were $185,000 and investment income was $140,000. Inventory FELL by $95,000, trade receivables FELL by $60,000 and trade payables ROSE by $60,000. Calculate cash generated from operations, in $.",
    2245000, "$", 1,
    "$2,245,000. $1,420,000 + $680,000 depreciation − $55,000 gain on disposal + $185,000 finance costs − $140,000 investment income + $95,000 inventory decrease + $60,000 receivables decrease + $60,000 payables increase. Two sign rules do the work: a GAIN on disposal is DEDUCTED, because the proceeds appear in investing instead; and a DECREASE in an asset is an INFLOW, since cash has been released from working capital."),

  q("FRK-DX-22", "FR-27", "D", "hard",
    "A parent's records show $140,000 receivable from its subsidiary; the subsidiary's records show $170,000 payable to the parent. The difference is cash the SUBSIDIARY sent on the last day of the year, which the parent had not received. What is done?",
    [
      "Increase the parent's cash by $30,000 and reduce its receivable to $140,000, then eliminate $140,000 from both sides",
      "Eliminate $140,000 from both sides, leaving $30,000 within group payables",
      "Eliminate $170,000 from both sides with no other adjustment",
      "Increase the subsidiary's cash by $30,000, then eliminate $170,000",
    ],
    0,
    "RECORD THE RECEIPT IN THE PARENT, THEN ELIMINATE. The subsidiary has already recorded the payment — its payable is down to $140,000 and its cash is down $30,000 — so it is the PARENT, as recipient, that is missing an entry. Adding $30,000 to the parent's cash brings the balances into agreement at $140,000, which is then eliminated from both sides. Net effect: group cash UP $30,000, receivables down $170,000, payables down $140,000, and group net assets unchanged — which is the check, because moving cash inside a group cannot make it richer."),
]

export const FR_KIT_DEPTH: AccaQuestion[] = [...NCA, ...LEASES, ...REV, ...GROUPS]
