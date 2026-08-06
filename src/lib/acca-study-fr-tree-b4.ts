import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 13 and 14: IFRS 16 Leases.
 *
 * Chapter 13 is the LESSEE, which is where almost all of FR's lease marks are. Chapter 14
 * is sale and leaseback and the LESSOR — smaller topics, but the lessor retains the
 * finance/operating classification that IFRS 16 removed for lessees, and candidates who
 * learn "IFRS 16 abolished the distinction" get lessor questions wrong for that reason.
 *
 * The lease liability table in chapter 13 is set out in full, every year to the end, and
 * the closing balance of $21 rather than nil is left visible and explained. A table that
 * has been quietly forced to zero teaches a candidate to distrust their own arithmetic
 * when the same thing happens to them in the exam.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_13: StudyChapter = {
  id: "FR-13",
  number: 13,
  paper: "FR",
  area: "B",
  title: "IFRS 16: lessee accounting",
  minutes: 20,
  syllabusRefs: ["B6(a)", "B6(b)", "B6(c)"],
  intro:
    "One model for every lease: a right-of-use asset and a lease liability. The arithmetic is a table, and the marks are in the split between current and non-current.",
  outcomes: [
    "Identify a lease and distinguish it from a service contract",
    "Measure a lease liability and a right-of-use asset on initial recognition",
    "Prepare a lease liability table and split the closing balance between current and non-current",
    "Deal with payments in advance as against in arrears",
    "Apply the recognition exemptions for short-term and low-value leases",
  ],
  sections: [
    {
      id: "identifying-a-lease",
      heading: "Is it a lease?",
      blocks: [
        {
          kind: "definition",
          term: "Lease",
          md: "A contract, or part of a contract, that conveys the **right to control the use of an identified asset** for a **period of time** in exchange for **consideration**.",
        },
        {
          kind: "list",
          title: "The two tests for the right to control use",
          items: [
            "**An IDENTIFIED asset.** The asset must be specified, explicitly or implicitly. If the supplier has a **substantive right to substitute** an alternative asset, there is no identified asset and so no lease — a contract for 'a lorry from our fleet' is a service, whereas one for a specified registered vehicle is a lease.",
            "**The right to obtain substantially all of the ECONOMIC BENEFITS** from use throughout the period, **and the right to DIRECT the use** — deciding how and for what purpose the asset is used.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Why the definition matters more than it used to",
          md: "Under the old standard, an operating lease was off balance sheet, so the interesting question was how to classify a lease. Under IFRS 16 every lease goes on balance sheet, so the interesting question moved: it is now whether the contract is a **lease at all** or a **service**.\n\nA service contract stays off balance sheet and is expensed as incurred, so an entity that wants to keep a liability off its statement of financial position now argues about substitution rights and about who directs the use. Expect a scenario that turns on exactly this.",
        },
      ],
    },
    {
      id: "initial-recognition",
      heading: "Initial recognition and measurement",
      blocks: [
        {
          kind: "formula",
          name: "Initial measurement",
          expr: "LEASE LIABILITY  =  present value of the lease payments not\n                     yet paid, discounted at\n                        the interest rate IMPLICIT in the lease, or\n                        if that is not readily determinable,\n                        the lessee's INCREMENTAL BORROWING RATE\n\n   Lease payments include:\n      fixed payments, less any lease incentives receivable\n      variable payments that depend on an index or a rate\n      amounts expected under a residual value guarantee\n      the exercise price of a purchase option REASONABLY CERTAIN\n         to be exercised\n      termination penalties, unless termination is reasonably\n         certain not to occur\n   They EXCLUDE variable payments based on usage or sales\n\nRIGHT-OF-USE ASSET  =  the lease liability\n                     +  payments made at or before commencement\n                     +  initial direct costs of the lessee\n                     +  estimated dismantling / restoration costs\n                     −  lease incentives received",
          note: "The two figures are NOT the same. Any question with initial direct costs, an advance payment or a restoration obligation gives a right-of-use asset larger than the liability, and the difference is where a mark sits.",
        },
        {
          kind: "list",
          title: "Subsequent measurement",
          items: [
            "**The right-of-use asset** is depreciated. Over the **lease term**, or over the asset's **useful life** if that is shorter — but over the useful life where ownership is expected to transfer at the end of the lease or a purchase option is reasonably certain to be exercised.",
            "**The lease liability** is increased by interest at the discount rate and reduced by payments made — exactly like a loan.",
            "**Both** are also adjusted for a lease modification or a reassessment of the lease term.",
            "The asset may alternatively be measured under the IAS 16 revaluation model where it relates to a class of PPE the entity revalues, or at fair value where it meets the IAS 40 definition of investment property.",
          ],
        },
        {
          kind: "example",
          title: "A five-year lease, payments in arrears",
          scenario:
            "Curlew Co leases a machine for five years from 1 January 20X1. Annual payments of $50,000 are made in ARREARS on 31 December. The rate implicit in the lease is 8%; the five-year annuity factor at 8% is 3.993. Curlew incurred $6,000 of legal fees in arranging the lease. The machine's useful life is eight years and ownership does not transfer.",
          steps: [
            { label: "Measure the lease liability", detail: "$50,000 × 3.993 = $199,650. All five payments are still to be made, so all five are discounted." },
            { label: "Measure the right-of-use asset", detail: "$199,650 lease liability + $6,000 initial direct costs = $205,650. Note this is NOT $199,650 — omitting the legal fees is the commonest slip here." },
            { label: "Compute depreciation", detail: "Over the lease term of five years, because ownership does not transfer and the eight-year useful life is longer. $205,650 ÷ 5 = $41,130 a year. Using the eight-year life would understate the charge by $15,424 a year." },
            { label: "Build the liability table", detail: "Opening balance × 8% = interest; add it; deduct the $50,000 payment.\n\n  Year  Opening    Interest   Payment    Closing\n   1    199,650     15,972    (50,000)   165,622\n   2    165,622     13,250    (50,000)   128,872\n   3    128,872     10,310    (50,000)    89,182\n   4     89,182      7,135    (50,000)    46,316\n   5     46,316      3,705    (50,000)        21\n\nThe $21 left at the end is rounding from using the three-decimal table factor rather than an exact rate. It is not an error, and it should not be forced to nil — an examiner expects small rounding and marks the method." },
            { label: "Split the year 1 closing balance", detail: "Total liability at 31 December 20X1 is $165,622. The NON-CURRENT portion is the balance that will still be outstanding a year later — the year 2 closing balance of $128,872. The CURRENT portion is the difference: $165,622 − $128,872 = $36,750." },
            { label: "Note why the split is done that way", detail: "The current liability is the amount that will be SETTLED within twelve months — which is the $50,000 payment less the $13,250 of interest that has not yet accrued at the reporting date. $50,000 − $13,250 = $36,750, the same figure. Either route works; the one-year-forward balance is faster and less error-prone." },
          ],
          result:
            "**Right-of-use asset $205,650 depreciated at $41,130 a year; liability $165,622 at the first year end, split $36,750 current and $128,872 non-current.** Profit or loss bears $41,130 of depreciation and $15,972 of finance cost in year 1 — $57,102 in total, against the $50,000 that a straight-line operating lease charge would have produced. Front-loading of the total expense is a feature of the model, not a mistake.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Payments in ADVANCE change three things",
          md: "Where payments are made at the START of each period:\n\n**The discount factor changes.** Five annual payments starting at inception discount at 1 + the four-year annuity factor, not the five-year factor. The first payment is not discounted at all because it is made immediately.\n\n**The first payment does not attract interest.** It is made on day one, so the liability after the first payment is already reduced before any interest accrues.\n\n**The table starts differently.** Opening balance, deduct the payment, THEN charge interest on the remainder. Getting this order wrong overstates the liability and the finance cost throughout.\n\nRead the question for \"in advance\", \"at the start of each year\", \"the first payment being made on\" the commencement date — all three mean the same thing.",
        },
      ],
      check: {
        q: "A five-year lease has a liability of $165,622 at the first reporting date. The liability at the second reporting date will be $128,872. What is the current liability at the first reporting date?",
        options: ["$36,750", "$50,000", "$128,872", "$13,250"],
        correct: 0,
        explain:
          "The non-current portion is the balance still outstanding a year later, $128,872, so the current portion is $165,622 − $128,872 = $36,750. It is not the $50,000 cash payment, because part of that payment is interest that has not yet accrued at the reporting date.",
      },
    },
    {
      id: "exemptions",
      heading: "The recognition exemptions",
      blocks: [
        {
          kind: "list",
          title: "Two optional exemptions",
          items: [
            "**SHORT-TERM LEASES** — a lease term of **12 months or less** at the commencement date, and containing **no purchase option**. The election is made by CLASS of underlying asset.",
            "**LOW-VALUE LEASES** — where the underlying asset is of low value when NEW. IFRS 16 gives no threshold, but the Basis for Conclusions refers to an order of magnitude of around US$5,000. Laptops, office furniture and telephones are the standard examples. The election is made lease by lease.",
            "Where an exemption is taken, the payments are recognised as an **EXPENSE on a straight line basis** over the lease term, or another systematic basis if more representative. **No right-of-use asset and no lease liability are recognised.**",
            "A lease of a car is **not** low value however cheap the car, because a car is not of low value when new — this is a favourite distractor.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The exemptions are the ONLY route to off balance sheet",
          md: "Under IFRS 16 there is no lessee classification test. A candidate who writes about \"substantially all the risks and rewards of ownership\" to decide whether to capitalise a lease is applying the superseded standard, and the whole answer will be wrong.\n\nThe only questions are: is it a lease at all, and does an exemption apply? If it is a lease and no exemption is taken, it goes on balance sheet — a 40-year property lease and a 15-month photocopier lease alike.",
        },
        {
          kind: "activity",
          title: "On or off balance sheet?",
          prompt:
            "State the treatment for each:\n\n(i) A 10-month lease of scaffolding, with an option to buy at the end.\n(ii) A 9-month lease of a portable site office, no purchase option.\n(iii) A 3-year lease of 200 laptops, each worth $900 new.\n(iv) A 2-year lease of a company car worth $22,000 new.\n(v) A contract for a haulier to move goods, the haulier choosing which of its lorries to use each day.",
          answer:
            "(i) ON balance sheet. The term is under 12 months, but the short-term exemption is unavailable where there is a PURCHASE OPTION. Recognise a right-of-use asset and a lease liability.\n\n(ii) The short-term exemption is available — 9 months and no purchase option — so the entity MAY expense the payments on a straight line basis. It is an election by class of asset, so the entity could also choose to capitalise it.\n\n(iii) The low-value exemption is available and is applied LEASE BY LEASE, not to the aggregate. Each laptop is of low value when new, so the $180,000 total does not disqualify it. Expense the payments.\n\n(iv) ON balance sheet. A car is not an asset of low value when new, whatever this particular car cost, and two years exceeds the short-term threshold.\n\n(v) NOT A LEASE. The haulier has a substantive right to substitute, so there is no identified asset. It is a service contract, expensed as incurred.\n\nThe pattern: two of the five are off balance sheet by exemption, one is off balance sheet because it is not a lease, and two are on. Say which route you are using.",
        },
      ],
      check: {
        q: "An entity leases 150 identical printers, each worth $700 when new, on three-year leases. Total payments are $210,000. Can the low-value exemption be applied?",
        options: [
          "Yes — the exemption is applied lease by lease, and each printer is of low value when new",
          "No — the aggregate value of $210,000 is not low",
          "No — the exemption applies only to leases of 12 months or less",
          "Only if the entity also applies the short-term exemption to the same class",
        ],
        correct: 0,
        explain:
          "The low-value exemption is assessed by reference to the value of the individual underlying asset when new, and is elected lease by lease. The aggregate is irrelevant, and there is no term condition attached to this exemption.",
      },
    },
  ],
  examTraps: [
    { trap: "Using the risks-and-rewards test to decide whether to capitalise a lease.", fix: "There is no lessee classification under IFRS 16. Every lease is capitalised unless an exemption applies or the contract is not a lease." },
    { trap: "Setting the right-of-use asset equal to the lease liability.", fix: "Add initial direct costs, payments made at or before commencement and restoration costs; deduct incentives received." },
    { trap: "Depreciating over the useful life when ownership does not transfer.", fix: "Depreciate over the shorter of the lease term and the useful life, unless ownership is expected to transfer or a purchase option is reasonably certain." },
    { trap: "Treating the whole next payment as the current liability.", fix: "The current portion excludes the interest that has not yet accrued. Take the balance one year forward and deduct." },
    { trap: "Applying an in-arrears table to payments made in advance.", fix: "Deduct the payment first and charge interest on the remainder; discount using 1 + the (n−1) year annuity factor." },
    { trap: "Forcing the lease liability table to end at exactly nil.", fix: "Small rounding differences from three-decimal table factors are expected and are not marked down." },
    { trap: "Applying the short-term exemption where there is a purchase option.", fix: "The exemption requires no purchase option, whatever the term." },
    { trap: "Aggregating low-value leases to deny the exemption.", fix: "It is assessed per underlying asset when new, and elected lease by lease." },
    { trap: "Including usage-based variable payments in the liability.", fix: "Payments varying with usage or sales are excluded and expensed as incurred; only index- or rate-linked variable payments are included." },
  ],
  keyTerms: [
    { term: "Lease", def: "A contract, or part of a contract, conveying the right to control the use of an identified asset for a period of time in exchange for consideration." },
    { term: "Right-of-use asset", def: "The lessee's asset representing its right to use the underlying asset: the lease liability plus prepayments, initial direct costs and restoration costs, less incentives received." },
    { term: "Interest rate implicit in the lease", def: "The rate that causes the present value of the lease payments and the unguaranteed residual value to equal the fair value of the asset plus the lessor's initial direct costs." },
    { term: "Incremental borrowing rate", def: "The rate the lessee would pay to borrow, over a similar term and with similar security, the funds needed to obtain an asset of similar value in a similar economic environment." },
    { term: "Short-term lease", def: "A lease with a term of 12 months or less at commencement and containing no purchase option; exempt by class of asset." },
    { term: "Low-value lease", def: "A lease of an underlying asset of low value when new; exempt lease by lease, regardless of the aggregate." },
  ],
  summary: [
    "A lease conveys the right to control the use of an IDENTIFIED asset. A substantive substitution right means there is no lease.",
    "Lease liability = present value of unpaid lease payments at the implicit rate, or the incremental borrowing rate.",
    "Right-of-use asset = liability + prepayments + initial direct costs + restoration costs − incentives received.",
    "Depreciate over the shorter of lease term and useful life, unless ownership transfers or a purchase option is reasonably certain.",
    "Build the liability table: opening + interest − payment. In advance, deduct the payment before charging interest.",
    "Current liability = total liability less the balance one year forward, which equals the next payment less the interest not yet accrued.",
    "The only exemptions are short-term (≤12 months and no purchase option) and low-value when new; both expense the payments straight line.",
    "There is no lessee classification test — the risks-and-rewards approach was superseded.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two tests for the right to control the use of an asset?", a: "The right to obtain substantially all the economic benefits from use, and the right to direct the use — over an identified asset." },
    { q: "How is the right-of-use asset measured initially?", a: "The lease liability plus payments made at or before commencement, initial direct costs and restoration costs, less lease incentives received." },
    { q: "Over what period is the right-of-use asset depreciated?", a: "The shorter of the lease term and the asset's useful life — or the useful life where ownership is expected to transfer or a purchase option is reasonably certain." },
    { q: "How is the current portion of the lease liability found?", a: "Total liability less the balance one year forward; equivalently, the next payment less the interest not yet accrued." },
    { q: "Name the two recognition exemptions and their conditions.", a: "Short-term — 12 months or less with no purchase option, elected by class; and low-value — the asset is of low value when new, elected lease by lease." },
    { q: "Does IFRS 16 require lessees to classify leases as finance or operating?", a: "No. That distinction was removed for lessees, though it survives for lessors." },
  ],
  furtherStudy: [
    "Chapter 14 — sale and leaseback, and the lessor side where classification survives",
    "Chapter 30 — the effect of IFRS 16 on gearing, interest cover and EBITDA, which is one of the most commonly examined interpretation points",
    "Chapter 25 — where lease payments appear in the statement of cash flows: principal in financing, interest in operating or financing by policy",
  ],
}

export const FR_TREE_14: StudyChapter = {
  id: "FR-14",
  number: 14,
  paper: "FR",
  area: "B",
  title: "Sale and leaseback, and lessor accounting",
  minutes: 17,
  syllabusRefs: ["B6(d)", "B6(e)", "B6(f)"],
  intro:
    "A seller-lessee recognises a gain only on the rights it has given up — and a lessor still has to classify.",
  outcomes: [
    "Determine whether a transfer in a sale and leaseback qualifies as a sale under IFRS 15",
    "Measure the right-of-use asset and the gain in a qualifying sale and leaseback",
    "Account for a transfer that does not qualify as a sale",
    "Classify a lease as a finance or an operating lease from the lessor's perspective",
    "Account for lessor operating and finance leases, including a rent-free period",
  ],
  sections: [
    {
      id: "sale-and-leaseback",
      heading: "Sale and leaseback: the gain is only on what was given up",
      blocks: [
        {
          kind: "text",
          md: "In a sale and leaseback an entity sells an asset and immediately leases it back. Commercially it is a financing transaction: the entity raises cash while continuing to use the asset. IFRS 16's accounting reflects exactly that.\n\nThe **first question** is whether the transfer is a **sale at all**, determined by applying **IFRS 15**: has control of the asset passed to the buyer? If a leaseback runs for substantially the whole of the asset's remaining life, or the seller has an option to repurchase, control may never have passed.",
        },
        {
          kind: "formula",
          name: "Sale and leaseback where the transfer IS a sale",
          expr: "SELLER-LESSEE\n\n   Right-of-use asset  =  previous CARRYING AMOUNT ×\n                             PV of lease payments\n                             ─────────────────────\n                                  fair value\n\n      i.e. the proportion of the asset representing the\n      right of use RETAINED\n\n   Lease liability  =  PV of the lease payments, as normal\n\n   Gain recognised  =  total gain ×\n                          fair value − PV of lease payments\n                          ───────────────────────────────────\n                                    fair value\n\n      i.e. the gain on the rights TRANSFERRED to the buyer.\n      The gain on the rights retained is NOT recognised —\n      it stays embedded in the right-of-use asset\n\nBUYER-LESSOR\n   Accounts for the purchase under the applicable standard,\n   and for the lease as a LESSOR — so it must classify it",
          note: "The two fractions are complements: retained + transferred = 1. If you compute one you have the other.",
        },
        {
          kind: "example",
          title: "A qualifying sale and leaseback",
          scenario:
            "Avocet Co owns a building with a carrying amount of $1,800,000. On 1 January it sells the building to a financial institution for $2,400,000, which is its fair value, and leases it back for five years. The present value of the lease payments is $1,000,000. The transfer satisfies the IFRS 15 requirements for a sale.",
          steps: [
            { label: "Confirm the transfer is a sale", detail: "Given in the scenario. If it were not, the whole of the next four steps would be replaced by the financing treatment below." },
            { label: "Find the proportion of the asset retained", detail: "PV of lease payments ÷ fair value = $1,000,000 ÷ $2,400,000 = 41.67%. Avocet has retained a right to use 41.67% of the building's value, and transferred the remaining 58.33%." },
            { label: "Measure the right-of-use asset", detail: "The RETAINED proportion of the PREVIOUS CARRYING AMOUNT — not of fair value: $1,800,000 × $1,000,000/$2,400,000 = $750,000. Using fair value here would give $1,000,000 and would recognise part of the gain on the retained rights, which is precisely what the standard prevents." },
            { label: "Compute the total gain and the recognised portion", detail: "Total gain $2,400,000 − $1,800,000 = $600,000. Recognised gain = $600,000 × ($2,400,000 − $1,000,000)/$2,400,000 = $600,000 × 58.33% = $350,000." },
            { label: "Write the journal", detail: "Dr Cash $2,400,000; Dr Right-of-use asset $750,000; Cr Building $1,800,000; Cr Lease liability $1,000,000; Cr Gain on disposal $350,000.\nCheck: debits $3,150,000 = credits $1,800,000 + $1,000,000 + $350,000 = $3,150,000." },
            { label: "State what happens next", detail: "The right-of-use asset of $750,000 is depreciated over the five-year lease term at $150,000 a year, and the lease liability is unwound at the discount rate in the usual table. The $250,000 of unrecognised gain is never recognised as a gain — it is absorbed by the lower carrying amount of the right-of-use asset, and so emerges as reduced depreciation over the lease term." },
          ],
          result:
            "**Right-of-use asset $750,000, gain $350,000, not $600,000.** The single most common error is recognising the whole $600,000, which overstates profit by $250,000 and treats a financing transaction as a realised disposal.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Where the transfer is NOT a sale",
          md: "Then no sale has occurred, so there is nothing to derecognise and no gain at all.\n\n**Seller-lessee:** continues to recognise the asset, and recognises a **FINANCIAL LIABILITY** equal to the proceeds received, accounted for under IFRS 9. The lease payments are split between interest and repayment of principal. In substance the entity has taken a secured loan, and that is how it is reported.\n\n**Buyer-lessor:** does not recognise the asset at all, and instead recognises a **FINANCIAL ASSET** for the amount paid.\n\nThis is the treatment where, for instance, the seller holds a repurchase option — control never passed, so IFRS 15 is not satisfied.",
        },
      ],
      check: {
        q: "An asset with a carrying amount of $900,000 is sold for its fair value of $1,200,000 and leased back. The present value of the lease payments is $300,000, and the transfer is a sale. What gain is recognised?",
        options: ["$225,000", "$300,000", "$75,000", "$225,000 deferred over the lease term"],
        correct: 0,
        explain:
          "The total gain is $300,000, and the proportion relating to rights transferred is ($1,200,000 − $300,000)/$1,200,000 = 75%. The recognised gain is $300,000 × 75% = $225,000. The right-of-use asset is $900,000 × 25% = $225,000, and the unrecognised gain emerges through lower depreciation rather than being deferred as a separate balance.",
      },
    },
    {
      id: "lessor-classification",
      heading: "Lessor accounting: classification survives",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "IFRS 16 removed the classification test for LESSEES only",
          md: "Lessors still classify every lease as a **FINANCE LEASE** or an **OPERATING LEASE**, using the familiar test: does the lease transfer **substantially all the risks and rewards incidental to ownership** of the underlying asset?\n\nThe asymmetry is deliberate. A lessee's balance sheet was the problem the IASB set out to fix; lessor accounting already reflected the substance reasonably well, and requiring lessors to derecognise assets they had genuinely retained would have created a new problem.\n\nSo an answer that says \"classification no longer exists\" is right for the lessee and wrong for the lessor, and lessor questions are set because of it.",
        },
        {
          kind: "list",
          title: "Indicators of a finance lease",
          items: [
            "**Ownership transfers** to the lessee by the end of the lease term.",
            "The lessee has a **purchase option at a price expected to be sufficiently below fair value** that exercise is reasonably certain at inception.",
            "The **lease term is for the major part of the asset's economic life**, even if title is not transferred.",
            "The **present value of the lease payments amounts to substantially all of the asset's fair value** at inception.",
            "The asset is of a **specialised nature** such that only the lessee can use it without major modification.",
            "Supporting indicators: the lessee bears the lessor's losses on cancellation; the lessee bears gains and losses on the residual value; and the lessee can continue the lease for a secondary period at a **rent substantially below market**.",
          ],
        },
        {
          kind: "table",
          caption: "Lessor accounting for each classification",
          head: ["", "OPERATING lease", "FINANCE lease"],
          rows: [
            ["The asset", "**Retained** in the lessor's statement of financial position and **depreciated** as normal", "**Derecognised**; replaced by a receivable — the net investment in the lease"],
            ["Income", "**Lease income on a STRAIGHT LINE basis** over the lease term, unless another basis is more representative", "**Finance income**, recognised to give a constant periodic rate of return on the net investment"],
            ["Initial direct costs", "Added to the carrying amount of the asset and expensed over the lease term on the same basis as the income", "Included in the initial measurement of the receivable, reducing the income recognised over the term"],
            ["Presentation", "The asset by nature; the income usually as revenue", "The receivable split between current and non-current"],
          ],
        },
        {
          kind: "example",
          title: "A lessor operating lease with a rent-free period",
          scenario:
            "Redshank Co leases out a warehouse under a five-year operating lease from 1 January 20X1. To attract the tenant, the first year is rent free; rentals of $60,000 a year are payable for each of years 2 to 5. Show the income recognised in 20X1 and the resulting balance.",
          steps: [
            { label: "Total the consideration over the lease term", detail: "Four payments of $60,000 = $240,000 received over a five-year term." },
            { label: "Spread it on a straight line basis", detail: "$240,000 ÷ 5 = $48,000 a year, including the rent-free year." },
            { label: "Record 20X1", detail: "Dr Accrued lease income (receivable) $48,000; Cr Lease income $48,000. No cash is received, but income is still recognised — the rent-free period is an incentive spread over the term, not a year with no income." },
            { label: "Trace the receivable", detail: "It builds to $48,000 at the end of 20X1, then unwinds: in 20X2 cash of $60,000 is received against income of $48,000, so the receivable falls by $12,000 a year and reaches nil at the end of 20X5. Check: $48,000 − (4 × $12,000) = nil." },
            { label: "Note the lessee's mirror treatment", detail: "The lessee does NOT spread the payments unless it has taken an exemption. It recognises a right-of-use asset and a lease liability measured on the four payments' present value, so the two sides of the same contract look entirely different — which is the clearest illustration of the asymmetry IFRS 16 introduced." },
          ],
          result:
            "**$48,000 of income in the rent-free year, with a matching receivable.** Recognising nil in year 1 and $60,000 in each of years 2 to 5 is the error, and it misstates both income and assets.",
        },
        {
          kind: "activity",
          title: "Classify from the lessor's side",
          prompt:
            "Classify each from the LESSOR's perspective, with the indicator you are relying on:\n\n(i) A five-year lease of an asset with a ten-year economic life; PV of lease payments is 55% of fair value; the asset is returned at the end.\n(ii) A four-year lease of an asset with a four-year economic life; the lessee may continue for a further two years at a nominal rent.\n(iii) A lease of a purpose-built machine that only the lessee's process can use, for eight of its nine-year life.\n(iv) A 15-year lease of a building with a 50-year life; PV of payments is 40% of fair value.",
          answer:
            "(i) OPERATING. Half the economic life and only 55% of fair value — the lessor retains substantial risks and rewards, including most of the residual value.\n\n(ii) FINANCE. The lease term covers the whole economic life, and the secondary period at a nominal rent is itself an indicator. Substantially all the risks and rewards have passed.\n\n(iii) FINANCE. The specialised nature indicator: no one else can use the asset without major modification, so the lessor has no meaningful residual interest.\n\n(iv) OPERATING. Neither the major part of the economic life nor substantially all of fair value. Long property leases are often operating leases for the LESSOR while being large right-of-use assets for the lessee — the asymmetry again.\n\nThe habit to build: name the indicator. 'It looks like a finance lease' earns nothing; 'the lease term covers the major part of the economic life' earns the mark.",
        },
      ],
      check: {
        q: "A lessor grants a five-year operating lease with the first year rent free and $80,000 payable in each of years 2 to 5. What lease income is recognised in year 1?",
        options: ["$64,000", "Nil", "$80,000", "$16,000"],
        correct: 0,
        explain:
          "Total consideration is 4 × $80,000 = $320,000 over a five-year term, so income is recognised straight line at $320,000 ÷ 5 = $64,000 a year, including the rent-free year, with a matching accrued income receivable.",
      },
    },
  ],
  examTraps: [
    { trap: "Recognising the whole gain on a sale and leaseback.", fix: "Only the gain on the rights TRANSFERRED. The gain on retained rights stays in the right-of-use asset and emerges as lower depreciation." },
    { trap: "Measuring the right-of-use asset as a proportion of fair value.", fix: "It is a proportion of the previous CARRYING AMOUNT." },
    { trap: "Accounting for a non-qualifying transfer as a sale.", fix: "Where control does not pass, keep the asset and recognise a financial liability for the proceeds — a secured loan in substance." },
    { trap: "Writing that IFRS 16 abolished the finance/operating distinction.", fix: "It did so for lessees only. Lessors still classify using the risks-and-rewards test." },
    { trap: "Recognising nil lease income in a rent-free period.", fix: "Spread total consideration straight line across the whole term, recognising accrued income in the rent-free year." },
    { trap: "Depreciating an asset under a lessor FINANCE lease.", fix: "It is derecognised and replaced by the net investment in the lease. Only an operating lease asset stays and is depreciated." },
    { trap: "Asserting a classification without naming an indicator.", fix: "Cite the specific indicator — economic life, PV against fair value, specialised nature, bargain option, or secondary period at a nominal rent." },
  ],
  keyTerms: [
    { term: "Sale and leaseback", def: "A transaction in which an entity sells an asset and leases the same asset back from the buyer." },
    { term: "Rights retained", def: "The proportion of an asset's value represented by the leaseback, measured as the present value of the lease payments divided by fair value." },
    { term: "Finance lease (lessor)", def: "A lease that transfers substantially all the risks and rewards incidental to ownership of the underlying asset to the lessee." },
    { term: "Operating lease (lessor)", def: "Any lease other than a finance lease; the lessor retains the asset and recognises income on a straight line basis." },
    { term: "Net investment in the lease", def: "The lessor's receivable under a finance lease — the present value of the lease payments and any unguaranteed residual value, discounted at the implicit rate." },
  ],
  summary: [
    "In a sale and leaseback, first ask whether IFRS 15 is satisfied — has control passed?",
    "If it is a sale: right-of-use asset = previous carrying amount × PV of lease payments / fair value; gain recognised = total gain × (fair value − PV of lease payments) / fair value.",
    "The gain on retained rights is never recognised as a gain; it emerges through lower depreciation.",
    "If it is not a sale: retain the asset and recognise a financial liability for the proceeds; the buyer recognises a financial asset.",
    "Lessors STILL classify leases as finance or operating, on the risks-and-rewards test.",
    "Lessor operating lease: retain and depreciate the asset, income straight line — including through a rent-free period.",
    "Lessor finance lease: derecognise the asset, recognise the net investment in the lease, and recognise finance income at a constant rate of return.",
  ],
  knowledgeDiagnostic: [
    { q: "What determines whether a sale and leaseback involves a sale?", a: "Whether control of the asset has transferred to the buyer, applying IFRS 15." },
    { q: "How is the seller-lessee's right-of-use asset measured?", a: "The previous carrying amount multiplied by the present value of the lease payments divided by fair value — the proportion of rights retained." },
    { q: "How much of the gain is recognised?", a: "Only the proportion relating to the rights transferred: total gain × (fair value − PV of lease payments) / fair value." },
    { q: "What happens if the transfer is not a sale?", a: "The seller keeps the asset and recognises a financial liability for the proceeds; the buyer recognises a financial asset rather than the asset itself." },
    { q: "Do lessors classify leases?", a: "Yes. IFRS 16 removed classification for lessees only; lessors still apply the risks-and-rewards test." },
    { q: "How does a lessor account for a rent-free period in an operating lease?", a: "Total consideration is spread straight line over the whole lease term, so income is recognised in the rent-free year with a matching accrued income receivable." },
  ],
  furtherStudy: [
    "Chapter 13 — the lessee mechanics that the leaseback then applies",
    "Chapter 15 — IFRS 15's control test, which decides whether a transfer is a sale",
    "Chapter 19 — IFRS 9, which governs the financial liability recognised where a transfer is not a sale",
  ],
}
