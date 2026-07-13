import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — Accounting for transactions (applying IFRS).
 * The largest FR area: the core recognition-and-measurement standards that turn
 * transactions into numbers. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 * Every calculation is re-solved from first principles and checked.
 */

export const FR_B: StudyChapter = {
  paper: "FR",
  area: "B",
  title: "Accounting for transactions (applying IFRS)",
  minutes: 19,
  intro: "This is the engine room of FR. A dozen standards each answer the same two questions for a different kind of transaction: do we recognise it, and at what number? Master the pattern and the whole area falls into place.",
  outcomes: [
    "Measure property, plant and equipment on the cost and revaluation models, and capitalise borrowing costs and investment property correctly",
    "Split research from development spending and test an asset for impairment against its recoverable amount",
    "Value inventory at the lower of cost and NRV and apply the IFRS 15 five-step revenue model",
    "Recognise a right-of-use asset and lease liability on day one of a lease",
    "Account for provisions, deferred tax and government grants",
    "Handle foreign currency, events after the reporting period, and changes in policy, estimate and error",
  ],
  sections: [
    {
      id: "ppe",
      heading: "PPE, borrowing costs and investment property (IAS 16, 23, 40)",
      blocks: [
        { kind: "text", md: "A non-current asset earns its keep over many years, so its cost is spread over those years rather than dumped into one. **IAS 16** says PPE goes onto the books at **cost** — the purchase price plus every cost of getting it ready to use: delivery, installation, testing, professional fees, and the estimated cost of dismantling it at the end. General overheads, training and launch losses are **not** part of cost." },
        { kind: "formula", name: "Straight-line depreciation", expr: "Annual charge = (Cost − Residual value) ÷ Useful life", note: "Depreciation spreads the cost of using the asset; it is not an attempt to show market value." },
        { kind: "text", md: "After recognition an entity picks a **measurement model** for each class of asset and applies it consistently. The **cost model** holds the asset at cost less accumulated depreciation and impairment. The **revaluation model** holds it at **fair value** at the revaluation date, less subsequent depreciation — and revaluations must then be kept up to date." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two measurement models for PPE",
          data: {
            leftTitle: "Cost model",
            rightTitle: "Revaluation model",
            rows: [
              { aspect: "Carrying amount", left: "Cost − acc. dep'n − impairment", right: "Fair value at revaluation − later dep'n" },
              { aspect: "Upward change", left: "Never — cost is the ceiling", right: "Gain to OCI → revaluation surplus (equity)" },
              { aspect: "Downward change", left: "Impairment to P/L", right: "First reverses own surplus, then P/L" },
              { aspect: "Frequency", left: "No revaluation needed", right: "Often enough that CA ≈ fair value" },
              { aspect: "Applied to", left: "An individual asset", right: "The whole class of assets" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Where the gain goes", md: "A **revaluation gain** is credited to **OCI** and builds a **revaluation surplus** in equity — it never touches profit. A **revaluation loss** is an expense in **P/L**, except that it first uses up any surplus already sitting on that same asset." },
        { kind: "example", title: "Worked example — depreciate then revalue", scenario: "Delta buys a building on 1 Jan 20X1 for $800,000. It has a 40-year life, nil residual value, straight-line. On 1 Jan 20X5 the building is revalued to $900,000, with no change to the remaining life. Show the surplus and the new depreciation charge.", steps: [
          { label: "Annual depreciation", detail: "$800,000 ÷ 40 = $20,000 per year." },
          { label: "Carrying amount at 31 Dec 20X4", detail: "4 years used → acc. dep'n = 4 × $20,000 = $80,000. CA = $800,000 − $80,000 = $720,000." },
          { label: "Revaluation surplus", detail: "Revalued to $900,000, so surplus = $900,000 − $720,000 = $180,000, credited to OCI." },
          { label: "New depreciation", detail: "Remaining life = 40 − 4 = 36 years. New charge = $900,000 ÷ 36 = $25,000 per year." },
          { label: "Reserves transfer (optional)", detail: "Each year Delta may move the excess depreciation $25,000 − $20,000 = $5,000 from revaluation surplus to retained earnings — through equity, never through P/L." },
        ], result: "$180,000 surplus in OCI on revaluation; depreciation rises from $20,000 to $25,000 a year over the 36 years left." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Posting the revaluation (1 Jan 20X5)",
          caption: "Eliminate the accumulated depreciation and uplift the asset to $900,000; the balancing credit is the surplus.",
          data: {
            name: "Revaluation of building",
            debits: [
              { label: "Accumulated depreciation (eliminate)", amount: 80000 },
              { label: "Building — cost/valuation (uplift)", amount: 100000 },
            ],
            credits: [
              { label: "Revaluation surplus (OCI → equity)", amount: 180000 },
            ],
          },
        } },
        { kind: "text", md: "Two nearby standards attach to the same assets. **IAS 23** says **borrowing costs that are directly attributable to acquiring or constructing a qualifying asset** (one that takes a substantial time to get ready) must be **capitalised** as part of its cost. Capitalisation starts when spending, borrowing costs and construction activity are all under way, is **suspended** during long interruptions, and **stops** when the asset is substantially complete. All other borrowing costs are expensed." },
        { kind: "text", md: "**IAS 40** covers **investment property** — land or buildings held to earn **rentals** or for **capital appreciation**, not used in operations. The prize here is the **fair value model**: remeasure to fair value at each year end and take the whole gain or loss to **P/L** — with **no depreciation**. (Alternatively the cost model can be used, exactly as for IAS 16 PPE.) Note the contrast: an IAS 16 revaluation gain goes to OCI, but an IAS 40 fair value gain goes to profit." },
      ],
      check: {
        q: "Delta's building (cost model) is revalued upward for the first time, creating a $180,000 gain. Where is that gain recognised?",
        options: [
          "In profit or loss as other income",
          "In other comprehensive income, building a revaluation surplus in equity",
          "Directly in retained earnings, bypassing OCI",
          "Deferred and released to profit over the asset's life",
        ],
        correct: 1,
        explain: "An IAS 16 upward revaluation is credited to OCI and accumulates as a revaluation surplus within equity — it never passes through profit. (Only a loss, or the reversal of a previous loss, hits P/L.) Contrast IAS 40 investment property under the fair value model, where the gain would go to profit.",
      },
    },
    {
      id: "intangibles-impairment",
      heading: "Intangibles and impairment (IAS 38, IAS 36)",
      blocks: [
        { kind: "text", md: "**IAS 38** governs **intangible assets** — identifiable, non-monetary assets without physical substance, such as licences, patents and capitalised development. The headline rule for **internally generated** intangibles is a split: **research** is a search for knowledge with no certain payoff, so it is **expensed** as incurred; **development** applies that knowledge to a specific product and is **capitalised** — but only once **all six** recognition criteria are met." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Research vs development spending",
          data: {
            leftTitle: "Research (expense)",
            rightTitle: "Development (capitalise if criteria met)",
            rows: [
              { aspect: "Nature", left: "Investigating for new knowledge", right: "Applying knowledge to a product/process" },
              { aspect: "Certainty of benefit", left: "Speculative, unproven", right: "Probable future economic benefits" },
              { aspect: "Accounting", left: "Always to P/L when incurred", right: "Asset — but only once all tests pass" },
              { aspect: "The six tests", left: "n/a", right: "Feasibility, Intention, Resources, Ability to use/sell, Probable benefits, Reliable cost" },
              { aspect: "Never allowed", left: "—", right: "Internally generated goodwill / brands" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The criteria are a gate, not a suggestion", md: "Development spend is capitalised **only from the date every criterion is met** — earlier spend in the same project stays as an expense and is **not** reinstated. And **internally generated goodwill, brands and mastheads can never be recognised** as assets." },
        { kind: "text", md: "Whatever the asset, its carrying amount must not exceed what it is really worth. **IAS 36** enforces this with the **impairment test**: whenever there is an indicator (falling market value, obsolescence, damage, rising interest rates), compare the carrying amount to the **recoverable amount**. Goodwill and indefinite-life intangibles are tested **every year** regardless of indicators." },
        { kind: "formula", name: "Recoverable amount", expr: "Recoverable amount = higher of ( Fair value less costs of disposal , Value in use )", note: "Value in use = the present value of the future cash flows the asset will generate. Impair only if carrying amount exceeds this figure." },
        { kind: "example", title: "Worked example — impairing a machine", scenario: "Echo owns a machine with a carrying amount of $500,000. After damage, its fair value is $420,000 but selling costs would be $20,000; the present value of the cash flows it can still generate is $460,000. The machine is held under the cost model. Calculate the impairment loss.", steps: [
          { label: "Fair value less costs of disposal", detail: "$420,000 − $20,000 = $400,000." },
          { label: "Value in use", detail: "Present value of future cash flows = $460,000." },
          { label: "Recoverable amount", detail: "Higher of $400,000 and $460,000 = $460,000." },
          { label: "Impairment loss", detail: "Carrying amount $500,000 − recoverable amount $460,000 = $40,000." },
          { label: "Where it goes", detail: "Held at cost, so the $40,000 loss is an expense in P/L; the machine is written down to $460,000." },
        ], result: "Impairment loss of $40,000 to profit or loss; new carrying amount $460,000." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Carrying amount bridged down to recoverable amount",
          caption: "The write-down equals the gap between the carrying amount and the higher of the two recoverable figures.",
          data: {
            unit: "$000",
            items: [
              { label: "Carrying amount", value: 500, kind: "start" },
              { label: "Impairment loss", value: -40, kind: "delta" },
              { label: "Recoverable amount", value: 460, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "When an asset generates cash only alongside others — a single machine on a production line, say — it is tested inside its **cash-generating unit (CGU)**: the smallest group of assets producing largely independent cash inflows. A CGU impairment is allocated **first against any goodwill**, then **pro rata** across the remaining assets — but no asset is written below its own recoverable amount." },
      ],
    },
    {
      id: "inventory-revenue",
      heading: "Inventory and revenue (IAS 2, IFRS 15)",
      blocks: [
        { kind: "text", md: "**IAS 2** values inventory at the **lower of cost and net realisable value**. **Cost** includes purchase price plus conversion costs (direct labour and a share of production overheads) and any cost of bringing the goods to their present location and condition. Selling costs, storage and abnormal waste are excluded. Cost is tracked using **FIFO or weighted average** — **LIFO is banned**." },
        { kind: "formula", name: "Net realisable value", expr: "NRV = Estimated selling price − Costs to complete − Costs to sell", note: "Compare NRV line by line against cost; write each item down to the lower figure. Never net a loss on one line against a profit on another." },
        { kind: "callout", tone: "tip", md: "The write-down is only ever **downwards to NRV**, and only when NRV is **below** cost. If goods can still be sold above cost, they stay at cost — you never write inventory **up** to a higher selling price." },
        { kind: "text", md: "**IFRS 15** puts a single **five-step model** behind every sale. It moves recognition away from \"when we invoiced\" toward \"when the customer gets **control** of what we promised\". Walk the five steps in order and the answer follows." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The IFRS 15 five-step revenue model",
          caption: "Revenue is recognised in step 5 — as, or when, each performance obligation is satisfied.",
          data: {
            steps: [
              { label: "1. Identify the contract", sub: "Enforceable, with commercial substance" },
              { label: "2. Identify performance obligations", sub: "Each distinct promise to the customer" },
              { label: "3. Determine transaction price", sub: "Fixed + variable + financing" },
              { label: "4. Allocate the price", sub: "By relative standalone selling price" },
              { label: "5. Recognise revenue", sub: "As each obligation is satisfied" },
            ],
          },
        } },
        { kind: "text", md: "Step 5 hinges on **timing**. Revenue is recognised **over time** if any one test holds: the customer consumes the benefit as you perform (e.g. a cleaning contract), your work creates or enhances an asset the customer controls, or the asset has no alternative use and you have an enforceable right to payment for work done. If none hold, revenue is recognised at a single **point in time** — when control transfers, usually on delivery." },
        { kind: "example", title: "Worked example — allocating a bundle", scenario: "Foxtrot sells a laptop bundled with 12 months of support for $1,200. Sold separately, the laptop's standalone price is $1,000 and the support's is $500. How much revenue is recognised on delivery, and how much over the year?", steps: [
          { label: "Identify obligations", detail: "Two distinct promises: (a) the laptop, (b) 12 months of support." },
          { label: "Total standalone price", detail: "$1,000 + $500 = $1,500." },
          { label: "Allocate to the laptop", detail: "$1,200 × (1,000 ÷ 1,500) = $1,200 × 0.6667 = $800." },
          { label: "Allocate to the support", detail: "$1,200 × (500 ÷ 1,500) = $1,200 × 0.3333 = $400. Check: $800 + $400 = $1,200." },
          { label: "Recognise", detail: "Laptop = point in time: $800 on delivery. Support = over time: $400 spread evenly → $33.33 per month (e.g. $200 after 6 months)." },
        ], result: "$800 recognised on delivery of the laptop; the $400 support fee is recognised evenly across the 12 months, with the unearned part carried as a contract (deferred income) liability." },
      ],
      check: {
        q: "Inventory cost $50,000. Because of a defect it can be sold for $46,000, but only after $9,000 of rectification and $2,000 of selling costs. At what amount is it carried?",
        options: [
          "$50,000 — cost, because it can still be sold",
          "$46,000 — the expected selling price",
          "$35,000 — net realisable value, as it is below cost",
          "$48,000 — cost less the selling costs only",
        ],
        correct: 2,
        explain: "NRV = selling price $46,000 − costs to complete $9,000 − costs to sell $2,000 = $35,000. Since NRV ($35,000) is below cost ($50,000), inventory is written down to the lower figure, $35,000, and the $15,000 loss is expensed.",
      },
    },
    {
      id: "leases",
      heading: "Leases (IFRS 16)",
      blocks: [
        { kind: "text", md: "**IFRS 16** ended the old on/off-balance-sheet split for lessees. For almost every lease the lessee now recognises **both** a **right-of-use (ROU) asset** and a **lease liability** on day one — the liability being the debt to make the payments, and the asset the right to use the item for the term." },
        { kind: "formula", name: "Initial lease liability", expr: "Lease liability = present value of the lease payments, discounted at the rate implicit in the lease", note: "Then: ROU asset = lease liability + initial direct costs + prepayments + dismantling estimate − lease incentives received." },
        { kind: "example", title: "Worked example — initial measurement", scenario: "Golf leases a machine for 5 years, paying $50,000 at the end of each year. The rate implicit in the lease is 8%; the annuity factor for 5 years at 8% is 3.9927. Golf also pays $5,000 of initial direct costs. Measure the liability and the ROU asset on day one.", steps: [
          { label: "Lease liability", detail: "PV of payments = $50,000 × 3.9927 = $199,635." },
          { label: "ROU asset", detail: "Liability $199,635 + initial direct costs $5,000 = $204,635." },
          { label: "Year-1 interest", detail: "$199,635 × 8% = $15,971 (added to the liability, charged to P/L)." },
          { label: "Year-1 liability movement", detail: "$199,635 + $15,971 interest − $50,000 payment = $165,606 carried forward." },
          { label: "Year-1 depreciation", detail: "ROU depreciated over the 5-year term: $204,635 ÷ 5 = $40,927 to P/L." },
        ], result: "Day one: ROU asset $204,635 and lease liability $199,635. Year 1 hits profit with $15,971 interest plus $40,927 depreciation." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Recognising the lease (day one)",
          caption: "The right-of-use asset ($204,635 = PV $199,635 + $5,000 initial direct costs) is debited; the liability is credited at the PV of the payments, and cash for the direct costs.",
          data: {
            name: "Initial recognition of the lease",
            debits: [
              { label: "Right-of-use asset", amount: 204635 },
            ],
            credits: [
              { label: "Lease liability", amount: 199635 },
              { label: "Cash (initial direct costs)", amount: 5000 },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The two exemptions", md: "A lessee may keep a lease **off** the balance sheet only for **short-term leases** (12 months or less) or **low-value assets** (e.g. a laptop or office furniture). Those payments are simply expensed on a straight-line basis over the term." },
        { kind: "text", md: "Afterwards the two sides move separately: the **ROU asset is depreciated** (usually over the shorter of lease term and useful life), while the **liability unwinds** — each payment part interest (to P/L) and part capital (reducing the liability). Split the closing liability into its **current** and **non-current** portions in the statement of financial position." },
      ],
    },
    {
      id: "provisions-tax-grants",
      heading: "Provisions, deferred tax and grants (IAS 37, IAS 12, IAS 20)",
      blocks: [
        { kind: "text", md: "**IAS 37** stops companies smoothing profits with made-up liabilities. A **provision** is recognised only when **all three** tests hold: there is a **present obligation** from a **past event**, an **outflow is probable**, and the amount can be **reliably estimated**. Fail any one and there is no provision — instead you may have a **contingent liability** to disclose." },
        { kind: "table", caption: "Provision vs contingency — the decision", head: ["Likelihood of outflow", "Liability", "Asset"], rows: [
          ["Virtually certain", "Provide (recognise)", "Recognise the asset"],
          ["Probable (> 50%)", "Provide (recognise)", "Disclose contingent asset"],
          ["Possible (< 50%)", "Disclose contingent liability", "Ignore"],
          ["Remote", "Ignore", "Ignore"],
        ] },
        { kind: "callout", tone: "rule", title: "Prudence, both ways", md: "A **contingent asset** is never recognised while it is merely probable — only **disclosed** — and is recognised only once inflow is **virtually certain**. A **contingent liability** is disclosed while possible and ignored only when **remote**. The asymmetry is deliberate: don't book gains too early, don't hide obligations." },
        { kind: "text", md: "**IAS 12** deals with **deferred tax** — the tax effect of the fact that accounting profit and taxable profit differ in timing. It arises on **temporary differences**: the gap between an asset or liability's **carrying amount** and its **tax base** (the amount deductible for tax in future). A **taxable** temporary difference creates a deferred tax **liability**; a **deductible** one creates a deferred tax **asset**." },
        { kind: "formula", name: "Deferred tax balance", expr: "Deferred tax = ( Carrying amount − Tax base ) × Tax rate", note: "Use the tax rate expected to apply when the difference reverses. A positive result (CA > tax base for an asset) is a deferred tax liability." },
        { kind: "example", title: "Worked example — a temporary difference", scenario: "Hotel buys an asset for $400,000. For accounts it is depreciated straight-line over 4 years; for tax, allowances of $160,000 are claimed in year 1. The tax rate is 20%. Find the deferred tax balance at the end of year 1.", steps: [
          { label: "Accounting carrying amount", detail: "Depreciation $400,000 ÷ 4 = $100,000 → CA = $400,000 − $100,000 = $300,000." },
          { label: "Tax base", detail: "Cost $400,000 − tax allowance $160,000 = $240,000." },
          { label: "Temporary difference", detail: "$300,000 − $240,000 = $60,000 (taxable — CA exceeds tax base)." },
          { label: "Deferred tax liability", detail: "$60,000 × 20% = $12,000." },
        ], result: "A deferred tax liability of $12,000, with the $12,000 charge going to P/L (the movement in the balance). Faster tax relief now means more tax to pay later — that future tax is the liability." },
        { kind: "text", md: "**IAS 20** handles **government grants**. Recognise a grant only when there is **reasonable assurance** the entity will comply with its conditions and receive it, and then match it to the costs it compensates. A **grant related to income** is released to P/L over the periods that carry the related costs; a **grant related to an asset** is either held as **deferred income** and released over the asset's life, or **netted off** the asset's cost. A grant is **never** credited straight to equity." },
      ],
      check: {
        q: "An asset has a carrying amount of $300,000 and a tax base of $240,000. The tax rate is 20%. What deferred tax does IAS 12 require?",
        options: [
          "A deferred tax asset of $12,000",
          "A deferred tax liability of $12,000",
          "A deferred tax liability of $60,000",
          "No deferred tax, because it is only a timing difference",
        ],
        correct: 1,
        explain: "The temporary difference is CA $300,000 − tax base $240,000 = $60,000. As the carrying amount exceeds the tax base on an asset, it is a taxable temporary difference, giving a deferred tax LIABILITY of $60,000 × 20% = $12,000. Deferred tax is applied precisely to these timing differences.",
      },
    },
    {
      id: "fx-events-policies",
      heading: "Foreign currency, events and changes (IAS 21, 10, 8)",
      blocks: [
        { kind: "text", md: "**IAS 21** translates transactions in a foreign currency. A transaction is first recorded at the **spot rate** on the date it occurs. The key at the year end is the **monetary / non-monetary split**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Retranslating at the year end (IAS 21)",
          data: {
            leftTitle: "Monetary items",
            rightTitle: "Non-monetary items",
            rows: [
              { aspect: "Examples", left: "Cash, receivables, payables, loans", right: "PPE, inventory, prepayments, equity investments at cost" },
              { aspect: "Year-end rate", left: "Retranslate at the closing rate", right: "Keep at the historical (transaction) rate" },
              { aspect: "Exchange differences", left: "To profit or loss", right: "None arise (not retranslated)" },
            ],
          },
        } },
        { kind: "text", md: "**IAS 10** governs **events after the reporting period** — things happening between the year end and the date the accounts are authorised. **Adjusting events** give evidence of conditions that **already existed** at the reporting date (a customer that goes bust owing a year-end balance, inventory later sold below cost) → **change the numbers**. **Non-adjusting events** reflect conditions arising **after** the year end (a fire, a share issue) → **disclose only** if material; do not restate." },
        { kind: "callout", tone: "warn", title: "One trigger flips everything", md: "Ask: did the condition **exist at the reporting date**? If yes, adjust the figures. If it arose afterwards, disclose but leave the numbers alone. A single after-date insolvency can be adjusting (debt owed at year end) — the balance was already doubtful on the reporting date." },
        { kind: "text", md: "**IAS 8** sets the rules for changes. A change of **accounting policy** (how a transaction is measured, e.g. cost to revaluation) is applied **retrospectively** — restate prior periods as if the new policy always applied. A change in **accounting estimate** (a useful life, a bad-debt allowance) is applied **prospectively** — only current and future periods change. A **prior period error** (a mistake or omission) is corrected **retrospectively** by restating the comparatives." },
        { kind: "table", caption: "IAS 8 — which changes are backward, which are forward", head: ["Change", "Treatment", "Prior periods?"], rows: [
          ["Accounting policy", "Retrospective", "Restated"],
          ["Accounting estimate", "Prospective", "Untouched"],
          ["Prior period error", "Retrospective restatement", "Restated"],
        ] },
      ],
    },
  ],
  examTraps: [
    { trap: "Taking an IAS 16 revaluation gain to profit, or an IAS 40 fair value gain to OCI.", fix: "IAS 16 upward revaluation → OCI (revaluation surplus). IAS 40 fair value model gain → profit or loss. They point in opposite directions." },
    { trap: "Capitalising a whole development project, including the early research phase.", fix: "Research is always expensed; development is capitalised only from the date all six criteria are met. Earlier spend is not reinstated." },
    { trap: "Using the LOWER of fair value less costs of disposal and value in use for recoverable amount.", fix: "Recoverable amount is the HIGHER of the two — a rational owner keeps whichever route recovers more." },
    { trap: "Writing inventory down to selling price, or netting NRV losses against other lines' profits.", fix: "NRV = selling price − costs to complete − costs to sell, compared to cost line by line. Only ever write down, never up." },
    { trap: "Recognising a contingent asset as soon as it looks probable.", fix: "A contingent asset is only disclosed when probable, and recognised only when the inflow is virtually certain." },
    { trap: "Recognising a provision for a future operating loss or a general 'rainy day' amount.", fix: "IAS 37 needs a present obligation from a past event, a probable outflow and a reliable estimate — future losses fail the past-event test." },
    { trap: "Treating a change in useful life as a policy change and restating comparatives.", fix: "A useful life is an estimate → change it prospectively. Only policy changes and errors are retrospective." },
  ],
  keyTerms: [
    { term: "Revaluation surplus", def: "The cumulative upward revaluation gain on PPE held in equity via OCI; it is not recycled to profit, though excess depreciation may be transferred to retained earnings." },
    { term: "Recoverable amount", def: "The higher of an asset's fair value less costs of disposal and its value in use; an asset is impaired when its carrying amount exceeds it." },
    { term: "Cash-generating unit", def: "The smallest identifiable group of assets that generates cash inflows largely independent of other assets, used to test impairment when a single asset cannot." },
    { term: "Performance obligation", def: "A distinct promise in a contract to transfer a good or service; revenue is recognised as each one is satisfied under IFRS 15." },
    { term: "Right-of-use asset", def: "The lessee's recognised right to use a leased asset for the lease term, measured initially at the lease liability plus direct costs, then depreciated." },
    { term: "Temporary difference", def: "The gap between an asset or liability's carrying amount and its tax base, on which deferred tax is calculated at the expected future rate." },
  ],
  summary: [
    "IAS 16 PPE runs on cost or revaluation; upward revaluations go to OCI (surplus), while IAS 40 investment property fair value gains go to profit. IAS 23 capitalises borrowing costs on qualifying assets.",
    "Research is expensed; development is capitalised only once all six IAS 38 criteria are met. IAS 36 impairs an asset when carrying amount exceeds recoverable amount — the higher of fair value less costs of disposal and value in use.",
    "IAS 2 values inventory at the lower of cost and NRV. IFRS 15 recognises revenue through five steps, over time or at a point in time as each performance obligation is satisfied.",
    "IFRS 16 puts a right-of-use asset and a lease liability (PV of payments) on the lessee's balance sheet, bar short-term and low-value leases.",
    "IAS 37 provides only for present obligations with probable, measurable outflows; IAS 12 deferred tax = temporary difference × rate; IAS 20 grants are matched to related costs, never taken to equity.",
    "IAS 21 retranslates monetary items at the closing rate (to P/L) but not non-monetary ones; IAS 10 adjusts for conditions existing at year end; IAS 8 restates for policy changes and errors but not estimates.",
  ],
}
