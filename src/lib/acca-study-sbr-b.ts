import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area B — Reporting the financial performance of entities.
 * Strategic-level depth: the recognition and measurement standards that drive
 * the numbers in a set of IFRS financial statements. Original, syllabus-aligned;
 * no ACCA/Kaplan/BPP text. Every calculation is re-solved from first principles.
 */

export const SBR_B: StudyChapter = {
  paper: "SBR",
  area: "B",
  title: "Reporting the financial performance of entities",
  minutes: 19,
  intro: "At Strategic level you no longer just apply a standard — you judge how it should apply. This is the engine room of SBR: revenue, leases, tax, provisions, share schemes and pensions, where the recognition rule and the number it produces are the same exam mark.",
  outcomes: [
    "Apply the IFRS 15 five-step model, including variable consideration, principal-vs-agent and contract modifications",
    "Account for leases under IFRS 16 for lessees and lessors, including sale-and-leaseback",
    "Compute deferred tax on temporary differences, revaluations and unused losses under IAS 12",
    "Recognise and measure provisions, and distinguish them from contingencies, under IAS 37",
    "Charge equity-settled and cash-settled share-based payments under IFRS 2",
    "Split a defined benefit cost into service cost, net interest (P/L) and remeasurement (OCI) under IAS 19",
  ],
  sections: [
    {
      id: "revenue",
      heading: "Revenue — the IFRS 15 five-step model",
      blocks: [
        { kind: "text", md: "Revenue is the largest number in most sets of accounts and the easiest to flatter, so IFRS 15 imposes a single discipline on every contract with a customer. Its core principle is that revenue is recognised **to depict the transfer of promised goods or services** in an amount that reflects the consideration the entity **expects to be entitled to**. That principle is delivered through five steps, applied in order." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The IFRS 15 five-step model",
          caption: "Each step feeds the next: you cannot allocate a price you have not measured, or recognise revenue for an obligation you have not identified.",
          data: {
            steps: [
              { label: "1 · Identify the contract", sub: "Approved, rights identifiable, commercial substance, collection probable" },
              { label: "2 · Identify performance obligations", sub: "Each distinct promise, or a series of distinct goods/services" },
              { label: "3 · Determine transaction price", sub: "Fixed + variable, less refunds; adjust for financing & non-cash" },
              { label: "4 · Allocate the price", sub: "In proportion to stand-alone selling prices" },
              { label: "5 · Recognise revenue", sub: "When (or as) each obligation is satisfied — control passes" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The pivot word is control", md: "Revenue is recognised when **control** of a good or service passes to the customer — not when risks and rewards pass, and not when cash is received. An obligation is satisfied **over time** if the customer receives and consumes the benefit as the entity performs, the entity creates an asset the customer controls, or the asset has no alternative use and the entity has an enforceable right to payment for work done. Otherwise it is satisfied at a **point in time**." },
        { kind: "text", md: "**Step 3 — variable consideration** is where judgement bites. Discounts, rebates, refunds, performance bonuses and penalties all make the price uncertain. The entity estimates the variable amount using either the **expected value** (a probability-weighted sum, best where there are many similar contracts) or the **most likely amount** (a single outcome, best where there are only two possible results). Crucially, the estimate is then **constrained**: variable consideration is included only to the extent that it is **highly probable a significant reversal of cumulative revenue will not occur** when the uncertainty is resolved." },
        { kind: "example", title: "Worked example — variable consideration and the constraint", scenario: "On 1 April, Beacon Co agrees to supply components to a retailer at a list price of $100 per unit. The contract gives a retrospective volume rebate: if the retailer buys more than 1,000 units in the year, the price falls to $90 on every unit bought. Based on long trading history with this retailer, Beacon judges it highly probable the 1,000-unit threshold will be passed. In April the retailer buys 75 units, invoiced at $100 each. How much revenue does Beacon recognise for April?", steps: [
          { label: "Estimate the variable price", detail: "The rebate is retrospective, so the price Beacon expects to be entitled to is $90 per unit, not $100. Method: most likely amount (two outcomes — threshold met or not)." },
          { label: "Apply the constraint", detail: "A significant reversal is not highly probable because history supports exceeding 1,000 units — so the $90 estimate is used in full." },
          { label: "Recognise revenue", detail: "75 units transferred x $90 = $6,750 revenue for April." },
          { label: "Record the difference", detail: "Invoiced 75 x $100 = $7,500. The $7,500 - $6,750 = $750 excess is a refund liability, not revenue." },
        ], result: "April revenue is $6,750. The $750 sits as a refund liability until the threshold is confirmed; it is never recognised as revenue if the discount is expected to be given." },
        { kind: "text", md: "**Principal versus agent** decides whether revenue is **gross or net**. If the entity **controls** the good or service before it is transferred to the customer, it is the **principal** and recognises the **gross** amount as revenue, with the supplier cost as an expense. If it merely **arranges** for another party to provide the good or service, it is an **agent** and recognises only its **fee or commission** (net). Indicators of principal status include being **primarily responsible** for fulfilment, bearing **inventory risk**, and having **discretion over pricing**." },
        { kind: "text", md: "**Contract modifications** (Step 2 in substance) are treated in one of three ways. If the modification adds **distinct** goods or services priced at their **stand-alone selling price**, it is a **separate contract**. If it adds distinct goods or services but not at stand-alone price, the original contract is treated as **terminated and a new one created**, accounting **prospectively** for the remaining goods. If the added goods or services are **not distinct** from those already partly delivered, the modification is folded into the existing contract with a **cumulative catch-up** adjustment to revenue." },
      ],
      check: {
        q: "A travel website lists hotel rooms owned by third parties. The hotel sets the room price, the customer pays the website $200, and the website remits $170 to the hotel, keeping $30. The website never controls the room. How much revenue does the website recognise per booking?",
        options: [
          "$200 — the full amount the customer pays",
          "$170 — the amount remitted to the hotel",
          "$30 — its commission, because it is an agent",
          "Nil until the customer completes the stay",
        ],
        correct: 2,
        explain: "The website never controls the room and only arranges the booking — the hotel is primarily responsible and sets the price, so the website is an AGENT. An agent recognises revenue net: only its $30 commission. Recognising the gross $200 is the classic principal-vs-agent trap.",
      },
    },
    {
      id: "leases",
      heading: "Leases — IFRS 16",
      blocks: [
        { kind: "text", md: "IFRS 16 ended the old operating-lease sleight of hand. For a **lessee**, almost every lease now comes **on-balance-sheet**: at the commencement date the lessee recognises a **right-of-use (ROU) asset** and a **lease liability**. The liability is the **present value of the future lease payments** discounted at the rate implicit in the lease (or the lessee's incremental borrowing rate if that is not readily determinable). The ROU asset starts at the liability plus any initial direct costs, prepaid lease payments and estimated dismantling costs, less lease incentives received." },
        { kind: "text", md: "After commencement the two move independently. The **ROU asset is depreciated** — normally over the shorter of the lease term and the asset's useful life. The **lease liability unwinds**: each period it is increased by interest (liability x discount rate) and reduced by the cash paid. Two optional exemptions let the lessee expense payments on a straight-line basis instead: **short-term leases** (12 months or less) and leases of **low-value** underlying assets (such as a laptop or small item of office equipment)." },
        { kind: "example", title: "Worked example — first year of a lessee lease", scenario: "On 1 January 20X1, Harbour Co leases a machine for 4 years. Payments are $30,000 annually in arrears (end of each year). The rate implicit in the lease is 8%. The present value of the four payments is $99,364. There are no initial direct costs. Show the lease liability and ROU asset at 31 December 20X1.", steps: [
          { label: "Initial recognition", detail: "Lease liability = ROU asset = present value of payments = $99,364 on 1 January 20X1." },
          { label: "Interest for 20X1", detail: "Interest = $99,364 x 8% = $7,949 (rounded), charged to profit or loss as a finance cost." },
          { label: "Liability after payment", detail: "Opening 99,364 + interest 7,949 - payment 30,000 = $77,313 carried forward." },
          { label: "Depreciate the ROU asset", detail: "Straight-line over 4 years: $99,364 / 4 = $24,841 depreciation for 20X1." },
          { label: "ROU carrying amount", detail: "99,364 - 24,841 = $74,523 at 31 December 20X1." },
        ], result: "At 31 December 20X1 Harbour reports a lease liability of $77,313 and an ROU asset of $74,523; profit or loss bears $7,949 finance cost plus $24,841 depreciation = $32,790, close to but not equal to the $30,000 cash paid." },
        { kind: "text", md: "**Lessor** accounting is largely unchanged and keeps the risks-and-rewards test. A lessor classifies each lease as a **finance lease** (substantially all the risks and rewards of ownership transfer to the lessee — the lessor derecognises the asset and records a receivable) or an **operating lease** (they do not — the lessor keeps the asset on its books, depreciates it and recognises lease income, usually straight-line). The asymmetry is deliberate: the lessee model was overhauled, the lessor model was not." },
        { kind: "callout", tone: "rule", title: "Sale and leaseback turns on IFRS 15", md: "When a seller sells an asset and leases it back, first ask whether the transfer is a **sale** under IFRS 15 (has control passed?). If it **is** a sale, the seller-lessee recognises an ROU asset at the **proportion of the previous carrying amount that relates to the right retained**, and recognises a gain or loss **only on the rights transferred to the buyer** — not the whole asset. If it is **not** a sale, there is no disposal: the seller keeps the asset and treats the proceeds as a **financial liability** (a secured loan)." },
      ],
    },
    {
      id: "tax",
      heading: "Income taxes — IAS 12 and deferred tax",
      blocks: [
        { kind: "text", md: "Current tax is the tax payable on this year's taxable profit. The strategic content is **deferred tax**: the tax effect of **temporary differences** between the **carrying amount** of an asset or liability in the accounts and its **tax base** (the amount attributed to it for tax purposes). Deferred tax exists because accounting profit and taxable profit follow different timing rules, and IAS 12 makes the statements carry the future tax consequences of transactions **now**, not when the cash tax is paid." },
        { kind: "formula", name: "Temporary difference and deferred tax", expr: "Temporary difference = Carrying amount − Tax base;   Deferred tax = Temporary difference × tax rate", note: "A carrying amount ABOVE the tax base gives a taxable temporary difference and a deferred tax LIABILITY; a carrying amount BELOW the tax base gives a deductible temporary difference and a deferred tax ASSET." },
        { kind: "example", title: "Worked example — deferred tax on an asset", scenario: "Delta Co buys a machine for $100,000. For accounting it is depreciated straight-line over 10 years ($10,000 a year). For tax, capital allowances are given at 25% of cost straight-line ($25,000 a year). The tax rate is 20%. Compute the deferred tax balance at the end of year 1 and year 2, and the year-2 charge.", steps: [
          { label: "Carrying amount", detail: "Year 1: 100,000 - 10,000 = $90,000. Year 2: 100,000 - 20,000 = $80,000." },
          { label: "Tax base", detail: "Year 1: 100,000 - 25,000 = $75,000. Year 2: 100,000 - 50,000 = $50,000." },
          { label: "Temporary difference", detail: "Year 1: 90,000 - 75,000 = $15,000 (taxable). Year 2: 80,000 - 50,000 = $30,000 (taxable)." },
          { label: "Deferred tax liability", detail: "Year 1: 15,000 x 20% = $3,000. Year 2: 30,000 x 20% = $6,000." },
          { label: "Year-2 charge to P/L", detail: "Increase in the liability: 6,000 - 3,000 = $3,000, charged as a deferred tax expense." },
        ], result: "The deferred tax liability grows from $3,000 to $6,000 because faster tax allowances mean tax is being deferred to later years; the $3,000 movement is the year-2 deferred tax charge in profit or loss." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Deferred tax liability account — year 2",
          caption: "The account opens at $3,000, the $3,000 P/L charge takes it to a $6,000 closing balance carried down. Both sides total $6,000.",
          data: {
            name: "Deferred tax (liability)",
            debits: [
              { label: "Balance c/f (closing liability)", amount: 6000 },
            ],
            credits: [
              { label: "Balance b/f (opening liability)", amount: 3000 },
              { label: "Income tax expense — P/L (movement)", amount: 3000 },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Where the other entry goes — backward tracing", md: "Deferred tax follows the item that created it. Deferred tax on a **revaluation surplus** is charged to **other comprehensive income**, not profit or loss, because the surplus itself went to OCI. So a building revalued up by $50,000 at a 20% tax rate creates a $10,000 deferred tax liability charged **against the revaluation surplus in OCI** — leaving a net $40,000 in equity." },
        { kind: "text", md: "**Deferred tax assets on unused tax losses** are the mirror image. A trading loss can usually be carried forward to reduce future tax, which is a future benefit. But IAS 12 allows a deferred tax asset to be recognised **only to the extent that it is probable future taxable profits will be available** against which the loss can be used. A loss-making company with no realistic prospect of future profits cannot sit an unrecognised benefit on its balance sheet — this is a judgement, and a favourite exam discussion point. Deferred tax is measured at the rate **expected to apply when the difference reverses** (enacted or substantively enacted) and is **never discounted**." },
      ],
      check: {
        q: "An asset has a carrying amount of $120,000 and a tax base of $150,000. The tax rate is 25%. What deferred tax arises?",
        options: [
          "A deferred tax liability of $7,500",
          "A deferred tax asset of $7,500",
          "A deferred tax liability of $30,000",
          "No deferred tax, because the amounts differ only in timing",
        ],
        correct: 1,
        explain: "Carrying amount 120,000 is BELOW the tax base 150,000, so the temporary difference of 30,000 is DEDUCTIBLE and gives a deferred tax ASSET: 30,000 x 25% = $7,500. The $30,000 option forgets to apply the tax rate; the liability option gets the direction backwards.",
      },
    },
    {
      id: "provisions",
      heading: "Provisions and contingencies — IAS 37",
      blocks: [
        { kind: "text", md: "A **provision** is a liability of **uncertain timing or amount**. Because provisions are so easy to abuse — creating a cushion of profit in a good year to release in a bad one (\"big bath\" and \"cookie-jar\" accounting) — IAS 37 sets three tight recognition conditions that must **all** be met." },
        { kind: "callout", tone: "rule", title: "The three-part recognition test", md: "Recognise a provision only when: (1) there is a **present obligation** — legal or **constructive** — arising from a **past obligating event**; (2) it is **probable** (more likely than not) that an outflow of economic benefits will be required; and (3) a **reliable estimate** can be made of the amount. Fail any one and no provision is recognised." },
        { kind: "table", caption: "Provision, contingent liability, contingent asset", head: ["Item", "Outflow / inflow likelihood", "Treatment"], rows: [
          ["Provision", "Probable outflow, reliably measurable", "Recognise a liability"],
          ["Contingent liability", "Possible, or probable but not measurable", "Disclose only (no recognition)"],
          ["Remote contingent liability", "Remote", "Ignore — no disclosure needed"],
          ["Contingent asset", "Probable inflow", "Disclose only"],
          ["Virtually certain asset", "Virtually certain inflow", "Recognise as an asset"],
        ] },
        { kind: "text", md: "Measurement is the **best estimate** of the expenditure required to settle the obligation. For a large population of items (such as warranty claims) that means an **expected value**; for a single obligation it is usually the **most likely outcome**. Where the time value of money is material, the provision is **discounted** to present value, and the unwinding of the discount each year is a **finance cost**. A provision may be recognised only for a present obligation that exists **independently of future actions** — which is why an entity **cannot provide for future operating losses**, and can provide for restructuring only once it has a **detailed formal plan** and has raised a **valid expectation** in those affected (a constructive obligation)." },
        { kind: "callout", tone: "warn", title: "Onerous contracts and reimbursements", md: "An **onerous contract** — where the unavoidable costs of meeting the obligations exceed the benefits expected — must be provided for at the **lower of the cost of fulfilling and the cost of exiting** the contract. Where a third party will **reimburse** part of the expenditure, the reimbursement is recognised as a **separate asset** only when receipt is virtually certain, and is capped at the amount of the provision — never netted off to hide the gross liability." },
      ],
    },
    {
      id: "sbp",
      heading: "Share-based payment — IFRS 2",
      blocks: [
        { kind: "text", md: "When an entity pays for goods or services with its **own shares or share options**, or with cash whose amount is **linked to its share price**, IFRS 2 forces the value of that payment into the accounts even though no cash may change hands. The single hardest exam distinction is **how** the payment is settled, because it changes both the measurement and where the credit lands." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Equity-settled vs cash-settled share-based payment",
          data: {
            leftTitle: "Equity-settled (e.g. share options)",
            rightTitle: "Cash-settled (e.g. share appreciation rights)",
            rows: [
              { aspect: "Measured at", left: "Fair value at GRANT date", right: "Fair value of the LIABILITY" },
              { aspect: "Remeasured?", left: "No — grant-date FV is fixed", right: "Yes — every period end and at settlement" },
              { aspect: "Credit entry", left: "Equity (other reserve)", right: "Liability" },
              { aspect: "What is revised", left: "Only the NUMBER expected to vest", right: "Both number and fair value" },
              { aspect: "Where changes go", left: "Spread over the vesting period", right: "Profit or loss each period" },
            ],
          },
        } },
        { kind: "text", md: "For an **equity-settled** scheme, the charge is fixed at the **grant-date fair value** of the instruments and is **never remeasured** for later share-price movements. It is spread over the **vesting period** as the employees earn it. What the entity **does** revise, at each period end, is the **number of instruments expected to vest** — for **service conditions** and **non-market performance conditions** (such as staying employed, or a profit target). **Market conditions** (a target share price) and non-vesting conditions are instead built into the grant-date fair value and are **not** revised, even if they are never met." },
        { kind: "example", title: "Worked example — equity-settled charge over three years", scenario: "On 1 January 20X1, Crest Co grants 100 share options to each of its 300 employees, vesting after 3 years of continuous service. The fair value of each option at grant date is $8. Estimates of the proportion of employees who will STAY the full three years change each year. Compute the expense for each year.", steps: [
          { label: "Maximum pool", detail: "300 employees x 100 options = 30,000 options; grant-date value if all vest = 30,000 x $8 = $240,000." },
          { label: "Year 1 (expect 80% to stay)", detail: "Expected options 30,000 x 80% = 24,000. Cumulative expense = 24,000 x $8 x 1/3 = $64,000. Year-1 expense = $64,000." },
          { label: "Year 2 (revise to 85%)", detail: "Expected options 30,000 x 85% = 25,500. Cumulative = 25,500 x $8 x 2/3 = $136,000. Year-2 expense = 136,000 - 64,000 = $72,000." },
          { label: "Year 3 (actual: 260 employees stayed)", detail: "Vested options 260 x 100 = 26,000. Cumulative = 26,000 x $8 x 3/3 = $208,000. Year-3 expense = 208,000 - 136,000 = $72,000." },
          { label: "Check", detail: "64,000 + 72,000 + 72,000 = $208,000 = final cumulative charge. Each year: Dr employee expense (P/L), Cr equity." },
        ], result: "The total charge of $208,000 reflects the options that actually vested, valued at the unchanged $8 grant-date fair value. Note the share price during the three years is irrelevant to an equity-settled charge." },
        { kind: "callout", tone: "tip", title: "Cash-settled is the same idea, remeasured", md: "For a **cash-settled** scheme (share appreciation rights that pay out cash equal to the share-price rise), the entity builds up a **liability** at the **fair value of the rights**, and **remeasures that fair value at every reporting date and at settlement**, with all changes going to profit or loss. So the charge keeps moving with the share price right up to the day the cash is paid — the opposite of the frozen equity-settled measurement." },
      ],
      check: {
        q: "An equity-settled share option scheme depends on employees remaining for three years (a service condition). Between grant and vesting, the share price falls sharply. How does IFRS 2 treat this fall?",
        options: [
          "The cumulative charge is reduced to reflect the lower share price",
          "The charge is unaffected — grant-date fair value is not remeasured for equity-settled awards",
          "The scheme is reclassified as cash-settled",
          "The remaining charge is reversed because the options are now worthless",
        ],
        correct: 1,
        explain: "Equity-settled awards are measured at GRANT-DATE fair value and are never remeasured for later share-price movements. The only thing revised is the NUMBER of options expected to vest (the service condition). A falling share price is a market factor already captured at grant — it does not change the charge.",
      },
    },
    {
      id: "employee-benefits",
      heading: "Employee benefits, pensions and other assets",
      blocks: [
        { kind: "text", md: "IAS 19 splits post-employment plans into two worlds. Under a **defined contribution** plan the employer pays fixed contributions into a fund and has **no further obligation** — the employee bears the investment risk, and the accounting is trivial (expense the contributions payable). Under a **defined benefit** plan the employer promises a **specified benefit** (say, a pension based on final salary) and therefore carries the **actuarial and investment risk** — which is where all the complexity lives." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Defined contribution vs defined benefit plans",
          data: {
            leftTitle: "Defined contribution",
            rightTitle: "Defined benefit",
            rows: [
              { aspect: "Employer promises", left: "Fixed contributions", right: "A specified benefit" },
              { aspect: "Who bears risk", left: "The employee", right: "The employer" },
              { aspect: "Balance sheet", left: "Only unpaid contributions", right: "Net obligation less plan assets" },
              { aspect: "P/L charge", left: "Contributions payable", right: "Service cost + net interest" },
              { aspect: "OCI", left: "Nothing", right: "Remeasurements (not recycled)" },
            ],
          },
        } },
        { kind: "text", md: "For a defined benefit plan the balance sheet shows a **net defined benefit liability (or asset)** = the **present value of the defined benefit obligation** less the **fair value of plan assets**. The annual cost is split into three components, each with a specific home. **Service cost** (current and past service cost) goes to **profit or loss**. **Net interest** — the discount rate multiplied by the opening **net** liability or asset — also goes to **profit or loss**. And **remeasurements** — actuarial gains and losses on the obligation, plus the return on plan assets above the amount already in net interest — go to **other comprehensive income and are never reclassified** to profit or loss." },
        { kind: "example", title: "Worked example — net interest and remeasurement", scenario: "At 1 January 20X1, Vale Co's plan has a defined benefit obligation of $2,000,000 and plan assets of $1,800,000 (net liability $200,000). The discount rate is 5%. During the year: current service cost $250,000; employer contributions paid in $200,000; benefits paid to retirees $150,000. At 31 December 20X1 the actuary values the obligation at $2,300,000 and the plan assets at $1,950,000. Analyse the cost.", steps: [
          { label: "Net interest (to P/L)", detail: "5% x opening net liability $200,000 = $10,000 expense. (Equivalently: interest on obligation 5% x 2,000,000 = 100,000, less interest income on assets 5% x 1,800,000 = 90,000, = 10,000.)" },
          { label: "P/L charge", detail: "Service cost 250,000 + net interest 10,000 = $260,000 to profit or loss." },
          { label: "Remeasure the obligation", detail: "Expected 2,000,000 + interest 100,000 + service 250,000 - benefits 150,000 = 2,200,000. Actual 2,300,000, so a $100,000 actuarial LOSS." },
          { label: "Remeasure the assets", detail: "Expected 1,800,000 + interest 90,000 + contributions 200,000 - benefits 150,000 = 1,940,000. Actual 1,950,000, so a $10,000 GAIN on assets." },
          { label: "Net remeasurement (to OCI)", detail: "Loss on obligation 100,000 less gain on assets 10,000 = $90,000 net remeasurement loss recognised in OCI." },
        ], result: "Profit or loss bears $260,000; OCI bears a $90,000 remeasurement loss. The closing net liability is $2,300,000 - $1,950,000 = $350,000, which reconciles exactly to the roll-forward below." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Reconciliation of the net defined benefit liability",
          caption: "Opening $200,000 grows to closing $350,000 through the P/L charge and OCI remeasurement, net of employer contributions paid in.",
          data: {
            unit: "$",
            items: [
              { label: "Opening net liability", value: 200000, kind: "start" },
              { label: "Current service cost (P/L)", value: 250000, kind: "delta" },
              { label: "Net interest (P/L)", value: 10000, kind: "delta" },
              { label: "Remeasurement loss (OCI)", value: 90000, kind: "delta" },
              { label: "Employer contributions", value: -200000, kind: "delta" },
              { label: "Closing net liability", value: 350000, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "The same performance-reporting discipline runs through the **non-current asset** standards. **IAS 16** property is carried at cost or a revaluation model (surpluses to OCI, deficits to P/L unless reversing a prior surplus). **IAS 38** intangibles capitalise **development** costs only once the PIRATE criteria are met but always **expense research**. **IAS 40** investment property may use the fair value model, taking **all** fair value changes to **profit or loss**. Over all of them sits **IAS 36 impairment**: an asset is written down when its **carrying amount exceeds its recoverable amount**, the **higher of fair value less costs of disposal and value in use** (the present value of the future cash flows it will generate)." },
        { kind: "callout", tone: "key", title: "The rest of Area B in one breath", md: "**IFRS 5** holds a non-current asset for sale at the **lower of carrying amount and fair value less costs to sell**, stops depreciating it, and shows discontinued operations separately. **IAS 8** applies policy changes and prior-period errors **retrospectively** but changes in **estimates prospectively**. **IAS 10** adjusts for events after the reporting period only where they **confirm conditions that existed** at the year end. **IAS 21** retranslates **monetary** items at the closing rate with differences to profit or loss, while non-monetary items stay at historical rate." },
      ],
      check: {
        q: "Under IAS 19, where is the remeasurement of a defined benefit plan (actuarial gains and losses and the return on plan assets above net interest) recognised?",
        options: [
          "In profit or loss, as part of the service cost",
          "In other comprehensive income, and it is never reclassified to profit or loss",
          "In other comprehensive income, and reclassified to profit or loss on settlement",
          "Directly in retained earnings, bypassing all performance statements",
        ],
        correct: 1,
        explain: "IAS 19 sends remeasurements to OTHER COMPREHENSIVE INCOME, and they are NEVER recycled (reclassified) to profit or loss — unlike some other OCI items. Only service cost and net interest hit profit or loss. This non-recycling feature is a common exam distractor.",
      },
    },
  ],
  examTraps: [
    { trap: "Recognising the gross amount when the entity is an agent under IFRS 15.", fix: "If the entity does not control the good or service before transfer, it is an agent — recognise only the net commission or fee, not the gross customer payment." },
    { trap: "Leaving operating leases off the lessee's balance sheet as under old IAS 17.", fix: "IFRS 16 puts a right-of-use asset and lease liability on the lessee's balance sheet for almost every lease; only short-term and low-value exemptions escape." },
    { trap: "Charging deferred tax on a revaluation to profit or loss.", fix: "Deferred tax follows its item (backward tracing): tax on a revaluation surplus goes to OCI, against the surplus — not to P/L." },
    { trap: "Remeasuring an equity-settled share-based payment for share-price changes.", fix: "Equity-settled awards use grant-date fair value and are never remeasured; only the number expected to vest is revised. Only cash-settled awards remeasure fair value." },
    { trap: "Putting the IAS 19 remeasurement through profit or loss, or recycling it later.", fix: "Remeasurements go to OCI and are never reclassified. Only service cost and net interest reach profit or loss." },
  ],
  keyTerms: [
    { term: "Performance obligation", def: "A promise in a contract to transfer a distinct good or service (or series of them) to the customer — the unit of account for recognising revenue under IFRS 15." },
    { term: "Right-of-use asset", def: "The lessee's recognised right to use a leased asset over the lease term, measured initially at the lease liability plus certain directly attributable costs (IFRS 16)." },
    { term: "Temporary difference", def: "The difference between the carrying amount of an asset or liability and its tax base, which reverses over time and drives deferred tax under IAS 12." },
    { term: "Constructive obligation", def: "An obligation arising from an entity's past practice or published policy that creates a valid expectation in others that it will discharge it — enough to require a provision under IAS 37." },
    { term: "Vesting period", def: "The period over which the specified conditions of a share-based payment must be satisfied before the employee becomes entitled to the award (IFRS 2)." },
    { term: "Net interest", def: "Under IAS 19, the discount rate applied to the opening net defined benefit liability or asset, recognised in profit or loss." },
  ],
  summary: [
    "IFRS 15 recognises revenue through five steps as control passes; variable consideration is estimated then constrained, and principal-vs-agent decides gross or net.",
    "IFRS 16 puts a right-of-use asset and lease liability on the lessee's balance sheet; the lessor keeps the risks-and-rewards finance-vs-operating split, and sale-and-leaseback hinges on whether IFRS 15 sees a sale.",
    "Deferred tax = temporary difference (carrying amount less tax base) x tax rate; it follows its item to P/L or OCI, is recognised on losses only when future profits are probable, and is never discounted.",
    "IAS 37 provisions need a present obligation, a probable outflow and a reliable estimate; contingencies are disclosed, not recognised, and future operating losses are never provided for.",
    "IFRS 2 equity-settled awards use frozen grant-date fair value with only the number vesting revised; cash-settled awards build a liability remeasured to fair value each period through P/L.",
    "IAS 19 defined benefit cost splits into service cost and net interest (both P/L) and remeasurements (OCI, never recycled); the net liability is the obligation less plan assets.",
  ],
}
