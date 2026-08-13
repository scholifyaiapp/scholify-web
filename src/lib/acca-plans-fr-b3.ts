/*
 * FR Area B, third block — IAS 12 income taxes, IAS 21 foreign currency,
 * IFRS 5 held for sale and discontinued operations, and IAS 8 policies,
 * estimates and errors.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * These four standards share a shape that makes them OT favourites: each one
 * turns on a DIRECTION rather than an arithmetic difficulty. Is the prior-year
 * provision added or deducted; is the temporary difference taxable or
 * deductible; is the item monetary or non-monetary; is this a change in policy
 * or a change in estimate. The number that follows is nearly always one
 * multiplication — so the mark is won or lost entirely on the classification,
 * and every distractor in this block is built to reward the wrong direction
 * with an answer that looks perfectly reasonable.
 *
 * So each plan settles the direction FIRST and names the option that encodes
 * the opposite. On a 2-mark OT with no method marks, recognising the trap is
 * the only defence there is.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FR_PLANS_B3: ExamPlanMap = {
  /* ── FR-20 · IAS 12: current and deferred tax ──────────────────── */

  "FR-20::current-tax": {
    title: "The two components of the current tax charge",
    format: "ot",
    marks: 2,
    requirement:
      "Kellman Co estimated its income tax liability for the year ended 31 December 20X4 at $180,000. The liability finally agreed with the tax authority and paid during 20X5 was $164,000.\n\nThe estimated income tax liability for the year ended 31 December 20X5 is $210,000.\n\nWhat is the income tax charge in Kellman Co's statement of profit or loss for the year ended 31 December 20X5?\n\nA  $194,000\nB  $210,000\nC  $226,000\nD  $164,000",
    plan: [
      {
        step: "Split the charge into its two components before touching a figure",
        detail:
          "The current tax charge is ALWAYS (this year's estimate) ± (the settlement of last year's estimate). Candidates who go straight to the arithmetic answer the question 'what is this year's liability', which is a different question.",
      },
      {
        step: "Decide the direction from what actually happened last year",
        detail:
          "Estimated $180,000, paid $164,000 — so last year's charge was $16,000 too HIGH. An over-provision. Too much was charged then, so this year's charge is REDUCED by it. Say the word 'over' out loud before you write a sign.",
      },
      {
        step: "Combine, and keep the two figures visible",
        detail:
          "$210,000 − $16,000 = $194,000. Under-provision would have been added; the arithmetic is trivial and the direction is the whole question.",
      },
      {
        step: "Separate the charge from the liability",
        detail:
          "The statement of financial position shows the CURRENT-year estimate of $210,000 as a current liability. Last year's $164,000 has been paid and is gone. The two figures differ, and an OT will sometimes ask for the one you did not calculate.",
      },
    ],
    answer:
      "**A — $194,000.**\n\nThe income tax charge for a period has two components:\n\n**Current year estimate** $210,000\n**Over-provision on 20X4** $(16,000)\n**Charge for 20X5** **$194,000**\n\nThe 20X4 liability was estimated at $180,000 but settled at $164,000, so $16,000 more was charged to profit or loss in 20X4 than the year actually cost. That excess is an **over-provision**, and it is corrected by reducing the following year's charge rather than by restating 20X4 — a change in a tax estimate is a **change in an accounting estimate** under IAS 8, dealt with prospectively, not a prior period error.\n\nThe **statement of financial position** at 31 December 20X5 shows the current tax liability of **$210,000** — the current year's estimate alone.\n\n**Why the other options are there:** **B** is the current year estimate with the prior year settlement ignored altogether. **C** adds the $16,000 instead of deducting it, which is what treating an over-provision as an under-provision produces — the single most common error on this question. **D** is the prior year's settled figure, which has already been paid.",
    earns: [
      "Naming the difference as an over-provision before choosing a sign",
      "Knowing the correction runs through the current year, not as a restatement",
      "Keeping the charge (P/L) and the liability (SFP) as two separate figures",
    ],
    loses: [
      "Adding the over-provision, giving $226,000 — the direction error the options are built around",
      "Restating the prior year, which IAS 8 reserves for errors, not revised estimates",
    ],
  },

  "FR-20::temporary-differences": {
    title: "Computing a deferred tax balance from the tax base",
    format: "ot",
    marks: 2,
    requirement:
      "At 31 December 20X5 Ardent Co has plant with a carrying amount of $600,000 and a tax base of $440,000.\n\nThe rate of income tax enacted for future periods is 25%.\n\nWhat deferred tax balance should Ardent Co recognise in respect of this plant at 31 December 20X5?\n\nA  A deferred tax liability of $40,000\nB  A deferred tax asset of $40,000\nC  A deferred tax liability of $150,000\nD  A deferred tax liability of $110,000",
    plan: [
      {
        step: "State what the tax base actually is",
        detail:
          "The amount the tax authority will still allow as a deduction in FUTURE periods. It is not the original cost and not the tax written-down value of a different asset — for plant it is cost less capital allowances given to date.",
      },
      {
        step: "Take the difference, not either figure on its own",
        detail:
          "$600,000 − $440,000 = $160,000. Deferred tax is only ever charged on the DIFFERENCE. Options built on 25% of a full carrying amount or a full tax base are testing exactly this.",
      },
      {
        step: "Decide taxable or deductible from the direction of the difference",
        detail:
          "For an ASSET, carrying amount ABOVE tax base means more economic benefit will be recovered than tax relief remains — future taxable profit, so a deferred tax LIABILITY. Carrying amount below tax base gives an asset. Reverse the logic for liabilities.",
      },
      {
        step: "Apply the rate that will apply when it reverses",
        detail:
          "$160,000 × 25% = $40,000 liability. Use the rate enacted or substantively enacted at the reporting date, and never discount a deferred tax balance — IAS 12 prohibits it, however long the reversal takes.",
      },
    ],
    answer:
      "**A — a deferred tax liability of $40,000.**\n\n| | $ |\n|---|---|\n| Carrying amount | 600,000 |\n| Tax base | (440,000) |\n| **Taxable temporary difference** | **160,000** |\n| Deferred tax at 25% | **40,000 liability** |\n\nThe **tax base** is what the tax authority will still permit as a deduction against future profits. Here $440,000 of relief remains but $600,000 of benefit will be recovered through use or sale, so $160,000 of that recovery will be **taxed** in future periods. A present obligation to pay tax later is a **deferred tax liability**.\n\nThe direction rule for assets is worth committing to memory in one line: **carrying amount above tax base gives a liability; below gives an asset.** It follows from capital allowances typically running ahead of depreciation, which is why plant produces a liability in most FR questions.\n\nThe balance is measured at the rate **enacted or substantively enacted** at the reporting date and is **never discounted**, even though the difference may not reverse for years.\n\n**Why the other options are there:** **B** is the correct figure with the direction reversed — the error to guard against. **C** is 25% of the carrying amount and **D** is 25% of the tax base, both of which tax a whole balance rather than the difference between them.",
    earns: [
      "Defining the tax base as future deductible amount, not as cost or as written-down value generally",
      "Deriving liability-versus-asset from the direction of the difference rather than recalling a rule",
      "Using the future rate, and knowing discounting is prohibited",
    ],
    loses: [
      "Applying the rate to the carrying amount or the tax base instead of the difference",
      "Reversing the direction and reporting a deferred tax asset",
      "Discounting the balance because reversal is distant",
    ],
  },

  "FR-20::presentation": {
    title: "The rule that decides where deferred tax is recognised",
    format: "ot",
    marks: 2,
    requirement:
      "During the year ended 31 December 20X5 Brayford Co revalued its head office upwards by $800,000, recognising the gain in other comprehensive income. The deferred tax on the revaluation, at a rate of 25%, is $200,000.\n\nHow should the $200,000 deferred tax be presented in Brayford Co's financial statements for the year?\n\nA  As a charge in profit or loss, with the liability shown as non-current\nB  As a charge in other comprehensive income, with the liability shown as non-current\nC  As a deduction from the revaluation surplus in the statement of changes in equity only, with no liability recognised\nD  No deferred tax is recognised, because the entity has no intention of selling the property",
    plan: [
      {
        step: "Find where the underlying item was recognised",
        detail:
          "This is the whole rule and it has no exceptions worth learning at FR: deferred tax FOLLOWS the transaction that created the difference. Locate the gain first, then the tax goes to the same place.",
      },
      {
        step: "Mirror it",
        detail:
          "The revaluation gain went to OTHER COMPREHENSIVE INCOME, so the deferred tax on it is charged to other comprehensive income. A gain recognised in profit or loss would take its deferred tax to profit or loss.",
      },
      {
        step: "Recognise the liability regardless of intention",
        detail:
          "A revaluation raises the carrying amount without changing the tax base, so a taxable temporary difference exists NOW. Intention to hold is irrelevant — IAS 12 measures the tax consequences of recovering the carrying amount, and revalued property is normally assumed to be recovered through use unless it is investment property at fair value.",
      },
      {
        step: "Classify the liability on the face of the statement",
        detail:
          "Deferred tax is ALWAYS presented as non-current, whatever the expected timing of reversal. Current tax payable is the current item; the two are never netted against each other unless the strict offset conditions are met.",
      },
    ],
    answer:
      "**B — charged to other comprehensive income, with the liability presented as non-current.**\n\nThe governing principle in IAS 12 is that **deferred tax follows the item it relates to**. The revaluation gain of $800,000 was recognised in **other comprehensive income**, so the $200,000 of deferred tax arising on it is charged to **other comprehensive income** as well. The effect is that OCI reports the revaluation **net of its tax**: a gain of $800,000 less tax of $200,000, and the revaluation surplus carried in equity is $600,000.\n\nThe **liability is real and is recognised now**. Revaluing the asset increases its carrying amount while leaving the tax base untouched, which creates a taxable temporary difference at the reporting date. Whether management intends to sell is not a recognition criterion.\n\nOn the statement of financial position, deferred tax is presented as a **non-current** liability without exception, however soon the difference is expected to reverse.\n\n**Why the other options are there:** **A** puts the tax in the wrong statement and would depress profit for a gain that never went through profit. **C** describes the net effect on equity but omits the liability, so the statement of financial position would be short by $200,000. **D** applies an intention test that IAS 12 does not contain.",
    earns: [
      "Stating the follow-the-transaction rule and applying it rather than recalling an answer",
      "Recognising the liability irrespective of intention to sell",
      "Presenting deferred tax as non-current in every case",
    ],
    loses: [
      "Charging the deferred tax to profit or loss when the gain never passed through profit or loss",
      "Splitting deferred tax between current and non-current by expected reversal date",
    ],
  },

  /* ── FR-21 · IAS 21: foreign currency transactions ──────────────── */

  "FR-21::functional-currency": {
    title: "How functional currency is determined",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is the PRIMARY factor in determining an entity's functional currency under IAS 21 The Effects of Changes in Foreign Exchange Rates?\n\nA  The currency in which the entity chooses to present its financial statements\nB  The currency that mainly influences the sales prices of its goods and services, and the costs of providing them\nC  The currency of the country in which the entity is legally incorporated\nD  The currency in which funds from financing activities are generated",
    plan: [
      {
        step: "Separate the two currencies the standard deals with",
        detail:
          "FUNCTIONAL currency is the currency of the primary economic environment in which the entity operates — a matter of FACT to be determined from evidence. PRESENTATION currency is the currency the statements are presented in — a free CHOICE. Confusing them is what option A rewards.",
      },
      {
        step: "Recall the primary indicators, which concern day-to-day trading",
        detail:
          "The currency that mainly influences SALES PRICES and the currency that mainly influences the COSTS of labour, materials and other inputs. Both are about the entity's operating economics.",
      },
      {
        step: "Place the secondary indicators below them",
        detail:
          "The currency of financing, and the currency in which operating receipts are retained, are considered only where the primary indicators are mixed or inconclusive. Option D is a real indicator demoted to primary status.",
      },
      {
        step: "Reject the ones that are not indicators at all",
        detail:
          "Place of incorporation, the parent's currency and the group's presentation currency are not determinants. A subsidiary can have a different functional currency from its parent, and often does.",
      },
    ],
    answer:
      "**B — the currency that mainly influences sales prices and the costs of providing goods and services.**\n\nIAS 21 defines functional currency as the currency of the **primary economic environment in which the entity operates**, and gives a ranked set of indicators.\n\n**Primary indicators** — the currency that mainly influences **sales prices** for goods and services (often the currency in which prices are denominated and settled), and the currency that mainly influences **labour, material and other costs**.\n\n**Secondary indicators**, used only when the primary ones do not settle the question — the currency in which **financing** is generated, and the currency in which **operating receipts** are retained.\n\nTwo consequences matter for the exam. Functional currency is **determined, not chosen**: management assesses the evidence and the answer is a matter of fact. **Presentation currency is chosen**, freely, and may be any currency at all — which is why an entity with a euro functional currency may perfectly properly present in dollars.\n\n**Why the other options are there:** **A** is the presentation currency, the choice this standard deliberately separates from the determination. **C** is a legal fact with no bearing on economics. **D** is a genuine indicator, but a **secondary** one, and the question asks for the primary factor.",
    earns: [
      "Distinguishing functional currency as determined from presentation currency as chosen",
      "Ranking the indicators rather than listing them flat",
      "Knowing a subsidiary's functional currency need not be the parent's",
    ],
    loses: [
      "Selecting the financing indicator, which is secondary and only used to break a tie",
      "Treating place of incorporation or the parent's currency as decisive",
    ],
  },

  "FR-21::the-rules": {
    title: "Applying the three translation rules at the reporting date",
    format: "ot",
    marks: 2,
    requirement:
      "Halden Co has a functional currency of $. On 1 November 20X5 it purchased inventory from a foreign supplier for €400,000 on credit, when the exchange rate was €1 = $1.20. The invoice was still unpaid at 31 December 20X5, when the rate was €1 = $1.30. The inventory was still held at that date and its net realisable value exceeded cost.\n\nWhat amounts should Halden Co report at 31 December 20X5?\n\nA  Inventory $480,000; payable $520,000; exchange loss $40,000 in profit or loss\nB  Inventory $520,000; payable $520,000; no exchange difference\nC  Inventory $480,000; payable $480,000; no exchange difference\nD  Inventory $520,000; payable $520,000; exchange loss $40,000 in other comprehensive income",
    plan: [
      {
        step: "Translate the transaction once, at the spot rate on the transaction date",
        detail:
          "€400,000 × 1.20 = $480,000. Both sides of the entry — the inventory and the payable — enter the books at that figure. Everything afterwards is a question about the reporting date, not the transaction date.",
      },
      {
        step: "Sort each balance into monetary or non-monetary before retranslating anything",
        detail:
          "MONETARY items are rights or obligations to receive or pay a FIXED number of currency units: cash, receivables, payables, loans. NON-MONETARY items are the rest: inventory, property, plant and equipment, intangibles, prepayments. This single sort decides the whole answer.",
      },
      {
        step: "Apply the rule to each",
        detail:
          "Monetary items are RETRANSLATED at the closing rate: payable €400,000 × 1.30 = $520,000. Non-monetary items measured at historical cost STAY at the historical rate: inventory remains $480,000. Non-monetary items measured at fair value would use the rate at the date fair value was measured.",
      },
      {
        step: "Take the difference to profit or loss",
        detail:
          "The payable has risen by $40,000 with no matching movement in the asset, so an exchange LOSS of $40,000 goes to profit or loss. Exchange differences on individual transactions never go to other comprehensive income — that treatment belongs to the translation of a foreign operation, which is not this.",
      },
    ],
    answer:
      "**A — inventory $480,000; payable $520,000; exchange loss $40,000 in profit or loss.**\n\n**On 1 November 20X5** the transaction is recorded at the spot rate: €400,000 × 1.20 = **$480,000**, debited to inventory and credited to payables.\n\n**At 31 December 20X5** the two balances are treated differently, because they are different kinds of item:\n\n| Balance | Type | Rate | Amount |\n|---|---|---|---|\n| Inventory | Non-monetary, at cost | Historical 1.20 | **$480,000** |\n| Payable | Monetary | Closing 1.30 | **$520,000** |\n\nThe payable is an obligation to hand over a **fixed number of euros**, so the dollar cost of settling it moves with the rate and it is retranslated. The inventory is not a claim to a fixed number of currency units — it is an asset carried at what it cost, and its cost in dollars was fixed on the day it was bought.\n\nThe resulting **exchange loss of $40,000** ($520,000 − $480,000) is recognised in **profit or loss** for the year, even though the invoice is unsettled. IAS 21 requires the difference to be recognised as it arises, not deferred until payment.\n\nNote the inventory is separately subject to the IAS 2 lower of cost and net realisable value test; here NRV is higher, so cost stands.\n\n**Why the other options are there:** **B** retranslates the inventory as well, which is the single most common error — it makes the exchange difference disappear and the statement of financial position self-consistent, which is exactly why it is tempting. **C** leaves the payable at the historical rate, ignoring retranslation entirely. **D** gets both balances right but routes the loss to other comprehensive income, confusing a transaction with the translation of a foreign operation.",
    earns: [
      "Sorting monetary from non-monetary before applying any rate",
      "Holding inventory at the historical rate while retranslating the payable",
      "Recognising the difference in profit or loss while the item is still unsettled",
    ],
    loses: [
      "Retranslating the non-monetary asset, which removes the exchange difference altogether",
      "Deferring the loss until the payable is settled",
      "Sending the difference to other comprehensive income, which is foreign-operation treatment",
    ],
  },

  /* ── FR-22 · IFRS 5: held for sale and discontinued operations ──── */

  "FR-22::held-for-sale": {
    title: "Measuring an asset on classification as held for sale",
    format: "ot",
    marks: 2,
    requirement:
      "Corville Co owns a machine which cost $1,000,000 on 1 January 20X2 and is depreciated on a straight-line basis over ten years with no residual value. On 30 September 20X5 the machine met all of the IFRS 5 criteria to be classified as held for sale. Its fair value less costs to sell on that date was $560,000, and it remained unsold at 31 December 20X5.\n\nAt what amount should the machine be presented in Corville Co's statement of financial position at 31 December 20X5, and what depreciation should be charged on it for the year?\n\nA  $560,000; depreciation $75,000\nB  $560,000; depreciation $100,000\nC  $560,000; depreciation $nil\nD  $625,000; depreciation $75,000",
    plan: [
      {
        step: "Depreciate up to the date of classification — not past it, and not stopping early",
        detail:
          "Nine months of 20X5 at $100,000 a year = $75,000. Depreciation stops ON classification, so the year contains a part-year charge. Answers that stop depreciating from 1 January, or run it to 31 December, are both catered for in the options.",
      },
      {
        step: "Establish the carrying amount at the classification date",
        detail:
          "Cost $1,000,000 less depreciation from 1 January 20X2 to 30 September 20X5 — three full years plus nine months = $375,000 — giving $625,000. Do this before looking at fair value; the comparison needs both figures.",
      },
      {
        step: "Measure at the LOWER of carrying amount and fair value less costs to sell",
        detail:
          "Carrying amount $625,000 against fair value less costs to sell $560,000. The lower figure wins, so the asset is written down to $560,000 and a $65,000 impairment goes to profit or loss. Had fair value been the higher of the two, the carrying amount would simply stand — IFRS 5 permits a write-down but never a write-UP on classification.",
      },
      {
        step: "Present it separately and stop depreciating",
        detail:
          "It moves out of non-current assets and is shown as a single line, normally within current assets. No depreciation is charged from 30 September onwards, whatever happens to the sale process.",
      },
    ],
    answer:
      "**A — $560,000, with depreciation of $75,000 for the year.**\n\n**Step 1 — depreciate up to the classification date**\nAnnual charge $1,000,000 ÷ 10 = $100,000. The machine is depreciated from 1 January 20X5 to **30 September 20X5** only: 9/12 × $100,000 = **$75,000**.\n\n**Step 2 — carrying amount at 30 September 20X5**\nDepreciation from 1 January 20X2 to 30 September 20X5 is three years and nine months = $375,000.\nCarrying amount = $1,000,000 − $375,000 = **$625,000**.\n\n**Step 3 — measure at the lower of carrying amount and fair value less costs to sell**\n\n| | $ |\n|---|---|\n| Carrying amount at classification | 625,000 |\n| Fair value less costs to sell | 560,000 |\n| **Impairment to profit or loss** | **65,000** |\n\nThe asset is written down to **$560,000**, which is the amount presented at 31 December 20X5. Had fair value less costs to sell been the **higher** figure, the carrying amount would simply have stood — IFRS 5 allows a write-down on classification but **never a write-up**.\n\n**Step 4 — presentation**\nThe machine leaves non-current assets and is presented as a **single line, normally within current assets**. **No depreciation is charged from 30 September onwards**, even though the asset is still held at the year end and is still in use.\n\n**The three consequences of classification**, which is what this OT is really testing: measurement at the **lower** of carrying amount and fair value less costs to sell; **depreciation ceases**; and the asset is **presented separately**, with any associated liabilities also presented separately and never offset against it.\n\n**The criteria that must all be met first:** the asset must be **available for immediate sale in its present condition**, and the sale must be **highly probable** — management committed to a plan, an active programme to locate a buyer, marketing at a price reasonable relative to current fair value, and the sale expected to complete **within one year**.\n\n**Why the other options are there:** **B** charges a full year's depreciation, running it past the date depreciation must stop. **C** ceases depreciation from the start of the year rather than from classification, so the nine months the asset was genuinely in use go unrecorded. **D** carries the asset at $625,000, applying the lower-of test as though fair value could only ever write an asset up.",
    earns: [
      "Charging depreciation up to the classification date and no further",
      "Comparing carrying amount with fair value less costs to sell and taking the lower",
      "Knowing IFRS 5 permits a write-down but never a write-up on classification",
    ],
    loses: [
      "Ceasing depreciation from the start of the year, which overstates the carrying amount",
      "Measuring at fair value less costs to sell whenever it is quoted, without the comparison",
      "Leaving the asset within non-current assets after classification",
    ],
  },

  "FR-22::discontinued": {
    title: "Presenting a discontinued operation, and what gets re-presented",
    format: "ot",
    marks: 2,
    requirement:
      "On 30 November 20X5 Ledwell Co sold its entire retail division, which represented a separate major line of business. Ledwell Co presents comparative figures for the year ended 31 December 20X4.\n\nWhich of the following describes the correct treatment in the financial statements for the year ended 31 December 20X5?\n\nA  The 20X4 statement of profit or loss is re-presented to show the retail division as discontinued; the 20X4 statement of financial position is not restated\nB  Both the 20X4 statement of profit or loss and the 20X4 statement of financial position are restated\nC  Neither the 20X4 statement of profit or loss nor the 20X4 statement of financial position is restated\nD  The 20X4 statement of financial position is restated; the 20X4 statement of profit or loss is not re-presented",
    plan: [
      {
        step: "Confirm it qualifies as a discontinued operation at all",
        detail:
          "A component that has either been DISPOSED OF or is classified as HELD FOR SALE, and represents a separate major line of business or geographical area of operations, or is a subsidiary acquired exclusively with a view to resale. A closed factory or a shrunken product line is not enough.",
      },
      {
        step: "Recall what appears on the face of profit or loss",
        detail:
          "A SINGLE amount: the post-tax profit or loss of the discontinued operation, plus the post-tax gain or loss on measurement to fair value less costs to sell or on disposal. The analysis into revenue, expenses and tax goes in the NOTES or in a separate column.",
      },
      {
        step: "Apply the re-presentation rule, which differs between the two statements",
        detail:
          "The comparative PROFIT OR LOSS is re-presented as if the operation had been discontinued from the start of the comparative period — so the two years are comparable. The comparative STATEMENT OF FINANCIAL POSITION is NOT restated: at that date the assets genuinely were part of continuing operations.",
      },
      {
        step: "Say why the asymmetry exists, since that is what makes it memorable",
        detail:
          "Profit or loss reports performance over a period and the reader is comparing like with like. The statement of financial position reports a position at a past date, and rewriting history there would misstate what the entity actually held.",
      },
    ],
    answer:
      "**A — the 20X4 profit or loss is re-presented; the 20X4 statement of financial position is not.**\n\nThe retail division is a **separate major line of business** that has been **disposed of**, so it meets the IFRS 5 definition of a discontinued operation.\n\n**On the face of the statement of profit or loss**, the discontinued operation is reported as a **single amount** comprising the post-tax profit or loss of the operation for the period and the post-tax gain or loss on disposal. Continuing operations are reported separately, so the reader can see the results the entity will actually carry forward. The analysis of that single amount — revenue, expenses, pre-tax profit, tax — is disclosed in the **notes** or in a separate column on the face.\n\n**The comparative period is re-presented.** The 20X4 figures are restated as though the retail division had been discontinued from 1 January 20X4, which is the only way the two years' continuing operations can be compared. This is a **re-presentation, not a prior period error** — nothing was wrong with the 20X4 statements when issued.\n\n**The comparative statement of financial position is left alone.** At 31 December 20X4 those assets and liabilities were genuinely in use within continuing operations, and restating the position would report something that was not true on that date.\n\n**Why the other options are there:** **B** applies the re-presentation to both statements, which is the most common misunderstanding. **D** reverses the rule entirely. **C** ignores re-presentation and leaves the two years incomparable, which is the outcome the requirement exists to prevent.",
    earns: [
      "Testing the definition — a separate major line of business — before applying the presentation",
      "Reporting a single post-tax amount on the face with the analysis in the notes",
      "Getting the asymmetry right, and being able to justify it from what each statement reports",
    ],
    loses: [
      "Restating the comparative statement of financial position",
      "Presenting the discontinued operation's revenue and expenses line by line within continuing operations",
      "Treating the re-presentation as the correction of a prior period error",
    ],
  },

  /* ── FR-23 · IAS 8: policies, estimates and errors ──────────────── */

  "FR-23::the-three-categories": {
    title: "Sorting a change into policy, estimate or error",
    format: "ot",
    marks: 2,
    requirement:
      "During the year ended 31 December 20X5 Marlowe Co changed the method by which it depreciates its plant from the straight-line basis to the reducing balance basis, having concluded that the new method better reflects the pattern of consumption of the plant's economic benefits.\n\nHow should this change be accounted for?\n\nA  As a change in accounting policy, applied retrospectively, with comparatives restated\nB  As a change in an accounting estimate, applied prospectively, with no restatement of comparatives\nC  As a prior period error, with the opening balance of retained earnings restated\nD  As a change in accounting policy, applied prospectively from the date of the change",
    plan: [
      {
        step: "Define the three categories by what they are about, not by examples",
        detail:
          "A POLICY is the basis of recognition, measurement and presentation — WHICH accounting treatment is applied. An ESTIMATE is a judgement about an uncertain amount WITHIN a chosen policy. An ERROR is a mistake in a previously issued set of statements from information that was available.",
      },
      {
        step: "Identify which one depreciation method belongs to",
        detail:
          "The policy is that plant is carried at cost and DEPRECIATED over its useful life. The METHOD, the useful life and the residual value are all estimates of how the benefits are consumed. IAS 16 says so explicitly, and it is the point this question exists to test.",
      },
      {
        step: "Apply the matching treatment",
        detail:
          "Estimates are dealt with PROSPECTIVELY: the current and future periods absorb the change and nothing already reported is touched. Policies are retrospective; errors are retrospective restatements. Each category has exactly one treatment.",
      },
      {
        step: "Check the one case that would flip the answer",
        detail:
          "A genuine change in POLICY is permitted only where a new IFRS requires it, or where the change gives more RELEVANT and RELIABLE information. Switching from the cost model to the revaluation model is a policy change — though IAS 16 requires even that to be applied prospectively, which is the exception worth knowing.",
      },
    ],
    answer:
      "**B — a change in an accounting estimate, applied prospectively.**\n\nThe accounting **policy** is that plant is held at cost and **depreciated** over its useful life. The **depreciation method** is not the policy — it is management's estimate of the **pattern in which the asset's economic benefits are consumed**, in exactly the same way that useful life and residual value are estimates. IAS 16 states this directly.\n\nSo the change is a **change in an accounting estimate** and is dealt with **prospectively**:\n\n· the carrying amount at the date of change is depreciated on the new basis over the remaining useful life\n· **no comparative figures are restated**\n· **no adjustment is made to opening retained earnings**\n· the effect on the current period is **disclosed**\n\nThe categories and their treatments, which is the whole of IAS 8 for OT purposes:\n\n| Category | Treatment |\n|---|---|\n| Change in accounting **policy** | **Retrospective** — restate comparatives and opening retained earnings |\n| Change in accounting **estimate** | **Prospective** — current and future periods only |\n| Prior period **error** | **Retrospective restatement** — restate comparatives and opening retained earnings |\n\nA change in policy is permitted only where an IFRS **requires** it, or where it results in **more relevant and reliable** information — an entity cannot simply prefer a different treatment.\n\n**Why the other options are there:** **A** and **D** both call it a policy change, which is the classic misclassification, and between them offer each of the two possible treatments so that guessing the treatment does not save you. **C** treats a legitimate revision as a mistake, when nothing previously reported was wrong.",
    earns: [
      "Identifying depreciation method, useful life and residual value as estimates within a policy",
      "Pairing each category with its single correct treatment",
      "Knowing a policy change requires either an IFRS or more relevant and reliable information",
    ],
    loses: [
      "Calling a change of depreciation method a change of policy and restating comparatives",
      "Restating opening retained earnings for a revised estimate",
    ],
  },

  "FR-23::errors": {
    title: "Correcting a prior period error, and its two-year effect",
    format: "ot",
    marks: 2,
    requirement:
      "Whitmore Co's draft financial statements for the year ended 31 December 20X5 report a profit of $620,000. The comparative figure for 20X4 is a profit of $500,000.\n\nIt has now been discovered that closing inventory at 31 December 20X4 was overstated by $50,000 as a result of a counting error. The error has not yet been corrected in either year.\n\nWhat are the corrected profit figures for 20X5 and the restated comparative for 20X4?\n\nA  20X5 $670,000; 20X4 $450,000\nB  20X5 $570,000; 20X4 $550,000\nC  20X5 $620,000; 20X4 $450,000\nD  20X5 $670,000; 20X4 $500,000",
    plan: [
      {
        step: "Trace the error through the year it was made",
        detail:
          "Closing inventory overstated by $50,000 means cost of sales was UNDERSTATED by $50,000, so 20X4 profit was OVERSTATED by $50,000. Correcting it reduces the restated 20X4 comparative to $450,000.",
      },
      {
        step: "Follow the same figure into the next year, because it moves twice",
        detail:
          "20X4's closing inventory is 20X5's OPENING inventory. An overstated opening inventory overstates cost of sales, which UNDERSTATES 20X5 profit by the same $50,000. Correcting it increases 20X5 profit to $670,000. This self-reversal is the whole question.",
      },
      {
        step: "Confirm the error washes out of cumulative retained earnings",
        detail:
          "Down $50,000 in 20X4 and up $50,000 in 20X5, so closing retained earnings at 31 December 20X5 is unchanged. Only the SPLIT between the two years was wrong — which is why the correction is about comparability, not about total wealth.",
      },
      {
        step: "State the mechanics of the restatement",
        detail:
          "Restate the 20X4 comparative, adjust the OPENING balance of retained earnings for the earliest period presented, and disclose the nature of the error and the amount of the correction for each line affected. Never put the correction through 20X5 profit as a one-line adjustment.",
      },
    ],
    answer:
      "**A — 20X5 $670,000; 20X4 restated to $450,000.**\n\nA single inventory misstatement affects **two** years, in **opposite** directions, because closing inventory is the following year's opening inventory.\n\n**20X4** — closing inventory overstated $50,000 → cost of sales understated $50,000 → profit **overstated** $50,000.\nRestated 20X4 profit = $500,000 − $50,000 = **$450,000**.\n\n**20X5** — opening inventory overstated $50,000 → cost of sales overstated $50,000 → profit **understated** $50,000.\nCorrected 20X5 profit = $620,000 + $50,000 = **$670,000**.\n\n| | 20X5 | 20X4 |\n|---|---|---|\n| As drafted | 620,000 | 500,000 |\n| Correction | +50,000 | (50,000) |\n| **Corrected** | **670,000** | **450,000** |\n\nThe two corrections are equal and opposite, so **cumulative retained earnings at 31 December 20X5 are unaffected**. What was wrong was the allocation of profit between the two periods, and that is exactly what a reader comparing the years would have been misled by.\n\n**The mechanics** required by IAS 8 for a **material prior period error**: restate the **comparative** amounts for the prior period presented; restate the **opening balance** of assets, liabilities and equity for the earliest period presented; and **disclose** the nature of the error together with the correction to each financial statement line item affected. The correction is **never** put through the current year's profit or loss as a single adjusting line — doing so would misstate 20X5 in order to fix 20X4.\n\n**Why the other options are there:** **D** corrects 20X5 but leaves the comparative untouched. **C** does the reverse. **B** applies both corrections with the signs reversed, which is what tracing the error in only one direction produces.",
    earns: [
      "Tracking the error into both years and getting the opposite signs right",
      "Recognising that cumulative retained earnings are unaffected",
      "Restating comparatives and opening retained earnings rather than adjusting current profit",
    ],
    loses: [
      "Correcting only the year the error was made, leaving 20X5 understated",
      "Putting the whole correction through the current year as an expense or income line",
      "Reversing the direction — an overstated closing inventory overstates, not understates, that year's profit",
    ],
  },
}
