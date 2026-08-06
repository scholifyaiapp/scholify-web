import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 19 and 20: IFRS 9 financial assets, and IAS 12 income taxes.
 *
 * Chapter 19 completes the financial instruments material begun in chapter 18. The
 * liability side came first because it decides gearing; the asset side is a
 * classification-then-measure exercise plus expected credit losses.
 *
 * Chapter 20 is IAS 12, which is the standard candidates most often skip and which appears
 * in almost every Section C preparation question — a tax expense note is close to
 * guaranteed. It is built round one insight: deferred tax comes from comparing a carrying
 * amount with a TAX BASE, and everything else is arithmetic.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_19: StudyChapter = {
  id: "FR-19",
  number: 19,
  paper: "FR",
  area: "B",
  title: "IFRS 9: financial assets and expected credit losses",
  minutes: 19,
  syllabusRefs: ["B5(d)", "B5(e)", "B5(f)"],
  intro:
    "Classify first, measure second. And note where the gains go — the difference between FVTPL and FVTOCI is the difference between reported profit and reported OCI.",
  outcomes: [
    "Classify a financial asset using the business model and cash flow characteristics tests",
    "Apply the irrevocable FVTOCI election for equity investments and explain the no-recycling rule",
    "Treat transaction costs correctly for each classification",
    "Measure a debt instrument at amortised cost using the effective interest rate",
    "Apply the expected credit loss model, including the simplified approach for trade receivables",
  ],
  sections: [
    {
      id: "classification",
      heading: "Classifying a financial asset",
      blocks: [
        {
          kind: "formula",
          name: "The classification decision",
          expr: "IS IT A DEBT INSTRUMENT?  (a loan, a receivable, a bond held)\n\n   Two tests:\n      BUSINESS MODEL  — why does the entity hold it?\n      CASH FLOW TEST  — are the contractual cash flows SOLELY\n                        PAYMENTS OF PRINCIPAL AND INTEREST (SPPI)?\n\n   Hold to COLLECT the cash flows        +  SPPI met\n      →  AMORTISED COST\n\n   Hold to COLLECT AND SELL              +  SPPI met\n      →  FAIR VALUE THROUGH OCI  (with RECYCLING)\n\n   Anything else — held for trading, or SPPI failed\n      →  FAIR VALUE THROUGH PROFIT OR LOSS\n\nIS IT AN EQUITY INSTRUMENT?  (shares in another entity)\n\n   DEFAULT  →  FVTPL\n\n   OPTION   →  an IRREVOCABLE election, made instrument by\n               instrument at initial recognition, to present fair\n               value changes in OCI. Available only where the\n               investment is NOT HELD FOR TRADING\n               ... and there is NO RECYCLING",
          note: "The two FVTOCI categories behave differently on disposal, and that is the most examinable point in the chapter. Debt at FVTOCI RECYCLES the cumulative gain to profit or loss; equity at FVTOCI never does.",
        },
        {
          kind: "table",
          caption: "Transaction costs, and where gains and income go",
          head: ["Classification", "Transaction costs", "Fair value changes", "Interest / dividends", "On disposal"],
          rows: [
            ["**Amortised cost**", "**Added** to the initial carrying amount", "Not remeasured", "Effective interest to profit or loss", "Gain or loss to profit or loss"],
            ["**Debt at FVTOCI**", "**Added**", "To **OCI**", "Effective interest to profit or loss", "Cumulative OCI gain **RECYCLED** to profit or loss"],
            ["**Equity at FVTOCI** (election)", "**Added**", "To **OCI**", "Dividends to **profit or loss**", "**NO recycling** — the balance may only be transferred within equity"],
            ["**FVTPL**", "**EXPENSED** immediately", "To **profit or loss**", "To profit or loss", "Gain or loss to profit or loss"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Three points that carry marks every time",
          md: "**Transaction costs are expensed only for FVTPL.** For every other classification they are added to the initial carrying amount. Candidates apply one rule to all four.\n\n**The equity FVTOCI election is IRREVOCABLE and made instrument by instrument at initial recognition.** It cannot be made later, cannot be reversed, and cannot be applied to a portfolio wholesale.\n\n**Dividends on an equity investment go to PROFIT OR LOSS even under the FVTOCI election.** Only the fair value movement goes to OCI. This surprises candidates who assume everything about a FVTOCI asset bypasses profit.",
        },
        {
          kind: "example",
          title: "The same investment, two classifications",
          scenario:
            "Wigeon Co bought 100,000 shares in a listed company at $4.50 each on 1 July, incurring transaction costs of $9,000. It is not held for trading. At the 31 December year end the shares are quoted at $5.10. A dividend of $12,000 was received in November.",
          steps: [
            { label: "As FVTPL (the default)", detail: "Initial carrying amount $450,000 — the $9,000 of transaction costs is EXPENSED immediately. At the year end the asset is remeasured to 100,000 × $5.10 = $510,000, giving a gain of $510,000 − $450,000 = $60,000 in PROFIT OR LOSS. The $12,000 dividend also goes to profit." },
            { label: "Total effect on profit under FVTPL", detail: "−$9,000 costs + $60,000 gain + $12,000 dividend = +$63,000." },
            { label: "As equity at FVTOCI (by election)", detail: "Initial carrying amount $450,000 + $9,000 = $459,000. At the year end, remeasured to $510,000, giving a gain of $510,000 − $459,000 = $51,000 in OTHER COMPREHENSIVE INCOME. The $12,000 dividend still goes to PROFIT OR LOSS." },
            { label: "Total effect on profit under FVTOCI", detail: "+$12,000 only. The $51,000 sits in OCI and a reserve within equity." },
            { label: "Compare the disposal outcome", detail: "If the shares are later sold for $560,000: under FVTPL the further gain goes to profit as usual. Under the FVTOCI election, the whole cumulative gain remains in OCI and is NEVER recycled to profit — the entity may transfer it from the FVTOCI reserve to retained earnings within equity, but no gain on disposal is ever reported in profit or loss." },
            { label: "State the consequence", detail: "The election permanently removes the investment's fair value performance from reported profit and from EPS. It is the reason the election exists — for strategic holdings whose short-term price movements the entity does not regard as part of its performance — and the reason it is irrevocable." },
          ],
          result:
            "**FVTPL: +$63,000 to profit. FVTOCI election: +$12,000 to profit and $51,000 to OCI.** Same investment, same cash, a $51,000 difference in reported profit, and a permanent difference in how the disposal is ever reported.",
        },
      ],
      check: {
        q: "An entity makes the irrevocable FVTOCI election for a strategic equity investment. It later sells the investment at a profit. How is the cumulative gain treated?",
        options: [
          "It remains in equity and is never recycled to profit or loss; it may be transferred to retained earnings",
          "It is recycled to profit or loss on disposal",
          "It is recycled to profit or loss only to the extent of the gain in the year of disposal",
          "It is reversed through OCI and the whole gain reported in profit",
        ],
        correct: 0,
        explain:
          "For equity investments designated at FVTOCI there is no recycling. The cumulative gain stays in equity and may only be transferred within equity, so no gain on disposal ever reaches profit or loss. Debt instruments at FVTOCI are different — those DO recycle.",
      },
    },
    {
      id: "amortised-cost-asset",
      heading: "Measuring a debt instrument at amortised cost",
      blocks: [
        {
          kind: "example",
          title: "A discounted debt instrument",
          scenario:
            "Teal Co purchased a debt instrument on 1 January 20X1 for $4,000,000. It carries no coupon and is redeemable for $5,000,000 on 31 December 20X3. Teal intends to hold it to collect the redemption proceeds. The effective interest rate is 7.72%.",
          steps: [
            { label: "Classify it", detail: "The business model is hold to collect, and the cash flows — a single principal repayment with an implicit interest return — satisfy the SPPI test. AMORTISED COST." },
            { label: "Recognise it initially", detail: "$4,000,000. There are no transaction costs given; had there been, they would be ADDED." },
            { label: "Accrete interest each year", detail: "\n  Year  Opening      Interest (7.72%)   Closing\n   1    4,000,000        308,800        4,308,800\n   2    4,308,800        332,639        4,641,439\n   3    4,641,439        358,319        4,999,758\n\nThe closing $4,999,758 is $242 short of the $5,000,000 received, from rounding the effective rate to two decimals." },
            { label: "Note the income recognised", detail: "Total interest income of $999,758 over three years, against the $1,000,000 actual return. No cash is received until redemption, but interest income is recognised each year — the discount IS the return." },
            { label: "Contrast with FVTPL", detail: "Had the instrument been held for trading, it would be remeasured to fair value each year with all movements in profit or loss, and the profile of recognised income would follow market prices rather than the effective rate." },
          ],
          result:
            "**Interest income of $308,800, $332,639 and $358,319 across the three years.** Recognising nothing until redemption and then a $1,000,000 gain would misstate every year.",
        },
      ],
    },
    {
      id: "ecl",
      heading: "Expected credit losses",
      blocks: [
        {
          kind: "text",
          md: "IFRS 9 requires a loss allowance for **expected** credit losses — recognised from the moment the asset is acquired, before any default has occurred or is even likely. This replaced the older model that waited for objective evidence of impairment, on the ground that waiting recognised losses too late.",
        },
        {
          kind: "table",
          caption: "The general three-stage model",
          head: ["Stage", "When", "Loss allowance", "Interest computed on"],
          rows: [
            ["**1**", "On initial recognition, and while credit risk has not increased significantly", "**12-month** expected credit losses", "**GROSS** carrying amount"],
            ["**2**", "Credit risk has increased **significantly** since initial recognition, but the asset is not credit-impaired", "**LIFETIME** expected credit losses", "**GROSS** carrying amount"],
            ["**3**", "The asset is **credit-impaired** — there is objective evidence of default", "**LIFETIME** expected credit losses", "**NET** carrying amount, after the allowance"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The simplified approach for trade receivables",
          md: "For **trade receivables, contract assets and lease receivables** with no significant financing component, IFRS 9 requires — not merely permits — the **SIMPLIFIED APPROACH**: recognise **LIFETIME** expected credit losses at all times.\n\nThere are no stages to assess, which is the point. A trade receivable's lifetime is usually a few weeks, so lifetime and 12-month losses are close together and the staging analysis would cost more than it is worth.\n\nIn practice this is applied through a **PROVISION MATRIX**: group receivables by ageing and apply a historical loss rate to each band, adjusted for current and forecast conditions. That last adjustment is the forward-looking element the standard insists on, and a question that gives you a deteriorating economy expects you to mention it.",
        },
        {
          kind: "example",
          title: "A provision matrix",
          scenario:
            "Gadwall Co's trade receivables at the year end, with historical loss rates adjusted for expected economic conditions:\n\n  Not yet due          $600,000     1%\n  1 to 30 days         $200,000     3%\n  31 to 60 days        $120,000     8%\n  61 to 90 days         $60,000    20%\n  More than 90 days     $40,000    50%",
          steps: [
            { label: "Confirm the approach", detail: "These are trade receivables with no significant financing component, so the simplified approach applies and lifetime expected credit losses are recognised regardless of any change in credit risk." },
            { label: "Apply each rate", detail: "$600,000 × 1% = $6,000\n$200,000 × 3% = $6,000\n$120,000 × 8% = $9,600\n$60,000 × 20% = $12,000\n$40,000 × 50% = $20,000" },
            { label: "Total the allowance", detail: "$6,000 + $6,000 + $9,600 + $12,000 + $20,000 = $53,600, against gross receivables of $1,020,000 — an overall rate of 5.3%." },
            { label: "Record the movement, not the balance", detail: "The charge to profit or loss is the MOVEMENT in the allowance. If the opening allowance was $41,000, the charge is $12,600. Charging the whole $53,600 double counts the amount already provided — a very common error." },
            { label: "State the presentation", detail: "Receivables are presented NET of the allowance in the statement of financial position, with the gross amount and the allowance disclosed. The charge is an operating expense, normally within administrative expenses." },
            { label: "Note the forward-looking requirement", detail: "The rates must reflect current and forecast conditions, not only historical experience. If the question says a major customer sector is entering recession, the rates should be uplifted and the answer should say so — that is where the reasoning mark sits." },
          ],
          result:
            "**Allowance $53,600; charge to profit the movement, not the balance.** Receivables are presented at $966,400.",
        },
      ],
      check: {
        q: "For trade receivables with no significant financing component, what loss allowance does IFRS 9 require?",
        options: [
          "Lifetime expected credit losses at all times, under the simplified approach",
          "12-month expected credit losses until credit risk increases significantly",
          "No allowance until there is objective evidence of impairment",
          "Lifetime expected credit losses, but only for balances more than 30 days overdue",
        ],
        correct: 0,
        explain:
          "The simplified approach is mandatory for trade receivables with no significant financing component: lifetime expected credit losses are recognised at all times, typically through a provision matrix, without any staging assessment.",
      },
    },
  ],
  examTraps: [
    { trap: "Expensing transaction costs for every classification.", fix: "They are expensed only for FVTPL. For amortised cost and both FVTOCI categories they are ADDED to the initial carrying amount." },
    { trap: "Recycling the gain on an equity investment held at FVTOCI.", fix: "No recycling, ever. Only debt at FVTOCI recycles." },
    { trap: "Taking dividends on a FVTOCI equity investment to OCI.", fix: "Dividends go to profit or loss. Only the fair value movement goes to OCI." },
    { trap: "Treating the FVTOCI equity election as reversible or portfolio-wide.", fix: "It is irrevocable and made instrument by instrument at initial recognition, and only for investments not held for trading." },
    { trap: "Recognising no income on a zero-coupon instrument until redemption.", fix: "The discount is the return. Accrete interest each period at the effective rate." },
    { trap: "Waiting for evidence of default before recognising a credit loss.", fix: "Expected credit losses are recognised from initial recognition. The old objective-evidence trigger was removed." },
    { trap: "Charging the whole closing loss allowance to profit.", fix: "Charge the MOVEMENT in the allowance." },
    { trap: "Using only historical loss rates in a provision matrix.", fix: "They must be adjusted for current and forecast economic conditions." },
  ],
  keyTerms: [
    { term: "Business model test", def: "Whether a debt instrument is held to collect contractual cash flows, held to collect and sell, or held for another purpose such as trading." },
    { term: "SPPI test", def: "Whether the contractual cash flows are solely payments of principal and interest on the principal outstanding." },
    { term: "FVTOCI election (equity)", def: "An irrevocable designation, made instrument by instrument at initial recognition for an investment not held for trading, to present fair value changes in OCI with no recycling." },
    { term: "Recycling", def: "Transferring a cumulative amount from OCI to profit or loss on disposal. Applies to debt at FVTOCI but never to equity at FVTOCI." },
    { term: "Expected credit loss", def: "The probability-weighted estimate of credit losses over the life of a financial instrument, or over 12 months where credit risk has not increased significantly." },
    { term: "Simplified approach", def: "The mandatory recognition of lifetime expected credit losses at all times for trade receivables, contract assets and lease receivables without a significant financing component." },
    { term: "Provision matrix", def: "A practical application of the simplified approach: historical loss rates by ageing band, adjusted for current and forecast conditions." },
  ],
  summary: [
    "Debt instruments: hold to collect + SPPI → amortised cost; hold to collect and sell + SPPI → FVTOCI with recycling; otherwise FVTPL.",
    "Equity instruments: FVTPL by default, with an irrevocable per-instrument election to FVTOCI for non-trading holdings — and NO recycling.",
    "Dividends on an equity investment always go to profit or loss, whatever the classification.",
    "Transaction costs are added for every classification except FVTPL, where they are expensed.",
    "Amortised cost accretes interest at the effective rate, so a zero-coupon instrument recognises income each year with no cash received.",
    "Expected credit losses are recognised from initial recognition: 12-month at stage 1, lifetime at stages 2 and 3, with interest on the net amount at stage 3.",
    "Trade receivables use the mandatory simplified approach — lifetime ECL at all times, usually through a forward-looking provision matrix.",
    "Charge the MOVEMENT in the allowance to profit, and present receivables net.",
  ],
  knowledgeDiagnostic: [
    { q: "What two tests classify a debt instrument?", a: "The business model test and the contractual cash flow (SPPI) test." },
    { q: "How are transaction costs treated for a FVTPL asset?", a: "Expensed immediately. For all other classifications they are added to the initial carrying amount." },
    { q: "Are gains on equity investments at FVTOCI recycled?", a: "No. They remain in equity and may only be transferred within equity. Debt at FVTOCI does recycle." },
    { q: "Where do dividends on a FVTOCI equity investment go?", a: "Profit or loss." },
    { q: "What allowance applies at stage 1 of the general ECL model?", a: "12-month expected credit losses, with interest computed on the gross carrying amount." },
    { q: "What approach is required for trade receivables?", a: "The simplified approach — lifetime expected credit losses at all times." },
  ],
  furtherStudy: [
    "Chapter 18 — the liability side, and the debt/equity classification that drives gearing",
    "Chapter 16 — contract assets, which fall under the simplified ECL approach alongside receivables",
    "Chapter 30 — receivables days, and why a large ECL allowance distorts it",
  ],
}

export const FR_TREE_20: StudyChapter = {
  id: "FR-20",
  number: 20,
  paper: "FR",
  area: "B",
  title: "IAS 12: current and deferred tax",
  minutes: 20,
  syllabusRefs: ["B8(a)", "B8(b)", "B8(c)", "B8(d)"],
  intro:
    "Deferred tax is one subtraction repeated: carrying amount less tax base. Everything else follows from where the original transaction was recognised.",
  outcomes: [
    "Compute the current tax charge, including under- and over-provisions from the prior period",
    "Identify a temporary difference by comparing carrying amount with tax base",
    "Distinguish taxable from deductible temporary differences and recognise deferred tax on each",
    "Apply the recognition condition for a deferred tax asset",
    "Present deferred tax in profit or loss or in other comprehensive income according to where the underlying item was recognised",
  ],
  sections: [
    {
      id: "current-tax",
      heading: "Current tax",
      blocks: [
        {
          kind: "formula",
          name: "The current tax charge",
          expr: "TAX EXPENSE for the period  =\n\n      current tax ESTIMATE for this year\n   +  UNDER-provision brought forward from last year\n   −  OVER-provision brought forward from last year\n   +/− the MOVEMENT in deferred tax\n\nUNDER-provision:  last year's charge was too LOW, so the amount\n                  actually agreed exceeded the provision\n                  →  ADD to this year's expense\n\nOVER-provision:   last year's charge was too HIGH\n                  →  DEDUCT from this year's expense\n\nA prior-year adjustment to a tax ESTIMATE is NEVER a prior period\nerror. It is a change in estimate, dealt with in the current year.",
          note: "The sign is the trap. An under-provision INCREASES this year's charge, because last year's profit was overstated and the shortfall has to be borne now.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to read the question",
          md: "You will typically be given the closing tax liability from last year's statement of financial position and the amount actually paid or agreed. The difference is the under- or over-provision.\n\nWhere the amount **paid exceeds** the liability provided, the provision was too low — an **UNDER**-provision, added to this year's charge. Where **less** was paid, the provision was too high — an **OVER**-provision, deducted.\n\nThe closing current tax liability in the statement of financial position is the CURRENT YEAR's estimate only. The prior year's balance has been settled and is gone.",
        },
      ],
    },
    {
      id: "temporary-differences",
      heading: "Temporary differences and the tax base",
      blocks: [
        {
          kind: "definition",
          term: "Tax base",
          md: "The amount attributed to an asset or liability for **tax purposes**. For an **asset**, broadly the amount that will be **deductible against future taxable profits**. For a **liability**, its carrying amount less any amount that will be **deductible in the future**.",
        },
        {
          kind: "formula",
          name: "Identifying and measuring the difference",
          expr: "TEMPORARY DIFFERENCE  =  CARRYING AMOUNT  −  TAX BASE\n\nFor an ASSET\n   CA > tax base  →  TAXABLE temporary difference\n                     →  DEFERRED TAX LIABILITY\n   CA < tax base  →  DEDUCTIBLE temporary difference\n                     →  DEFERRED TAX ASSET\n\nFor a LIABILITY, the signs REVERSE\n   CA > tax base  →  DEDUCTIBLE temporary difference\n                     →  DEFERRED TAX ASSET\n   CA < tax base  →  TAXABLE temporary difference\n                     →  DEFERRED TAX LIABILITY\n\nDEFERRED TAX  =  temporary difference  ×  the tax rate expected to\n                 apply when the difference reverses, based on rates\n                 ENACTED or SUBSTANTIVELY ENACTED at the reporting\n                 date\n\nDeferred tax balances are NEVER DISCOUNTED.",
          note: "The reversal of signs for liabilities is where most errors happen. A quick sanity check: a provision not yet deductible for tax gives a deferred tax ASSET, because the deduction is still to come.",
        },
        {
          kind: "table",
          caption: "The standard temporary differences",
          head: ["Item", "Carrying amount vs tax base", "Deferred tax", "Why"],
          rows: [
            ["PPE where **tax depreciation exceeds** accounting depreciation", "CA > tax base", "**LIABILITY**", "Relief has been taken faster than the accounting charge, so more tax will be paid later"],
            ["**Capitalised development costs** deducted for tax when incurred", "CA > tax base (nil)", "**LIABILITY**", "The tax deduction has already been taken but the accounting expense has not"],
            ["**Interest or income receivable** taxed when received", "CA > tax base (nil)", "**LIABILITY**", "Recognised as income now, taxed later"],
            ["**Revaluation surplus** with no corresponding tax base adjustment", "CA > tax base", "**LIABILITY**, charged to **OCI**", "A gain recognised for accounting but not yet taxed"],
            ["**Provisions** deductible only when paid", "CA > tax base (nil)", "**ASSET**", "The expense has been recognised but the deduction is still to come"],
            ["**Unused tax losses** carried forward", "—", "**ASSET**", "A future deduction with no corresponding accounting asset"],
            ["**Expenses accrued** but deductible only on payment", "CA > tax base (nil)", "**ASSET**", "Same reasoning as provisions"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Deferred tax ASSETS have a recognition condition; liabilities do not",
          md: "A deferred tax **liability** is recognised for **all** taxable temporary differences (with narrow exclusions not examined in FR).\n\nA deferred tax **ASSET** is recognised **only to the extent that it is PROBABLE that taxable profit will be available** against which the deductible difference can be used. This is the condition candidates omit.\n\nSo an entity with large accumulated tax losses and no realistic prospect of future profits recognises **no** deferred tax asset — however arithmetically large the loss. And the assessment is revisited each year: an asset not recognised previously is recognised when profits become probable.\n\nA question that gives you tax losses and a history of losses is testing this, not the multiplication.",
        },
        {
          kind: "example",
          title: "A full deferred tax computation",
          scenario:
            "Shelduck Co's year end is 31 December 20X6. The tax rate is 25%. Relevant balances:\n\n  Property, plant and equipment: carrying amount $2,400,000, tax base $1,800,000\n  Capitalised development costs: carrying amount $450,000, tax base nil\n  Interest receivable accrued: carrying amount $40,000, tax base nil\n  A property revalued during the year: carrying amount $1,200,000, tax base $900,000\n  Warranty provision: carrying amount $300,000, tax base nil\n\nThe opening deferred tax liability was $180,000. The current tax estimate for 20X6 is $340,000. The 20X5 statement of financial position showed a current tax liability of $290,000; the amount ultimately agreed and paid was $305,000.",
          steps: [
            { label: "Compute each temporary difference", detail: "PPE: $2,400,000 − $1,800,000 = $600,000 TAXABLE.\nDevelopment costs: $450,000 − nil = $450,000 TAXABLE.\nInterest receivable: $40,000 − nil = $40,000 TAXABLE.\nRevalued property: $1,200,000 − $900,000 = $300,000 TAXABLE.\nWarranty provision: a LIABILITY with CA $300,000 above its nil tax base, so the signs reverse — $300,000 DEDUCTIBLE." },
            { label: "Net the differences and compute the closing balance", detail: "Net taxable = $600,000 + $450,000 + $40,000 + $300,000 − $300,000 = $1,090,000. Closing deferred tax liability = $1,090,000 × 25% = $272,500." },
            { label: "Split the closing balance by where the underlying item sits", detail: "The revaluation element is $300,000 × 25% = $75,000, and it must be charged to OTHER COMPREHENSIVE INCOME because the gain it relates to was recognised there. The remaining $790,000 × 25% = $197,500 relates to items recognised in profit or loss. Check: $197,500 + $75,000 = $272,500." },
            { label: "Compute the movement and allocate it", detail: "The liability rises from $180,000 to $272,500, an increase of $92,500. Of that, $75,000 is the OCI charge on the revaluation, so the charge to PROFIT OR LOSS is $92,500 − $75,000 = $17,500." },
            { label: "Compute the current tax element", detail: "Current year estimate $340,000. The prior year was provided at $290,000 and settled at $305,000, so the provision was too LOW by $15,000 — an UNDER-provision, ADDED to this year's charge." },
            { label: "Assemble the tax expense", detail: "$340,000 current year + $15,000 under-provision + $17,500 deferred = $372,500 in profit or loss, with a separate $75,000 charge in other comprehensive income. The statement of financial position shows a current tax liability of $340,000 and a deferred tax liability of $272,500." },
          ],
          result:
            "**Tax expense $372,500 in profit or loss and $75,000 in OCI; closing deferred tax liability $272,500.** The four decisions that carry marks: reversing the signs for the provision, splitting the revaluation element into OCI, charging the MOVEMENT rather than the balance, and adding rather than deducting the under-provision.",
        },
      ],
      check: {
        q: "An entity has a warranty provision of $200,000, deductible for tax only when paid. The tax rate is 20%. What deferred tax arises?",
        options: [
          "A deferred tax asset of $40,000",
          "A deferred tax liability of $40,000",
          "No deferred tax, since provisions are not assets",
          "A deferred tax asset of $200,000",
        ],
        correct: 0,
        explain:
          "The provision is a liability with a carrying amount of $200,000 and a tax base of nil. For a liability, a carrying amount above the tax base is a DEDUCTIBLE temporary difference, giving a deferred tax asset of $200,000 × 20% = $40,000 — recognised only if future taxable profits are probable.",
      },
    },
    {
      id: "presentation",
      heading: "Presentation, and the rule that decides where deferred tax goes",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Deferred tax follows the underlying item",
          md: "**Where was the transaction giving rise to the temporary difference recognised?**\n\n· In **profit or loss** → the deferred tax goes to profit or loss.\n· In **other comprehensive income** → the deferred tax goes to OCI. The standard case is a revaluation surplus.\n· **Directly in equity** → the deferred tax goes to equity. The standard case is the equity component of a convertible instrument.\n\nThis single rule answers every presentation question in IAS 12, and it also explains why a revaluation reduces reported OCI by more than the surplus: the surplus of, say, $460,000 is accompanied by a deferred tax charge in OCI, so the net amount reported is lower.",
        },
        {
          kind: "list",
          title: "Other presentation requirements",
          items: [
            "Deferred tax assets and liabilities are **always classified as NON-CURRENT**, whatever the expected timing of reversal.",
            "They are **NEVER DISCOUNTED**, even where reversal is many years away. This is an explicit and deliberate exception to the usual approach to long-dated balances, and it exists because scheduling the reversals reliably would be impracticable.",
            "Offsetting a deferred tax asset against a deferred tax liability is permitted only where there is a legally enforceable right to set off current tax and they relate to the same taxation authority.",
            "The tax rate used is the one **enacted or substantively enacted** at the reporting date and expected to apply on reversal — so an announced future rate change is reflected once substantively enacted, not when it takes effect.",
          ],
        },
        {
          kind: "activity",
          title: "Where does the deferred tax go?",
          prompt:
            "For each, state whether the deferred tax is recognised in profit or loss, in OCI, or in equity:\n\n(i) Accelerated tax depreciation on plant.\n(ii) A revaluation surplus on land.\n(iii) The equity component of a convertible bond.\n(iv) A fair value gain on an equity investment designated at FVTOCI.\n(v) Unused tax losses carried forward.",
          answer:
            "(i) PROFIT OR LOSS. The depreciation charge and the tax relief both run through profit.\n\n(ii) OCI. The surplus was recognised in other comprehensive income, so the deferred tax follows it there — which is why the net OCI reported is less than the gross surplus.\n\n(iii) EQUITY. The equity component was credited directly to equity, so any deferred tax on it is charged there too.\n\n(iv) OCI. Same reasoning as the revaluation: the gain sits in OCI, so the tax on it does.\n\n(v) PROFIT OR LOSS. The losses arose from trading recognised in profit — and remember the asset is recognised only to the extent future taxable profits are probable.\n\nOne rule, five applications. If you can locate where the underlying gain or expense was recognised, you have located the deferred tax.",
        },
      ],
      check: {
        q: "An entity revalues a property upwards, creating a taxable temporary difference. Where is the deferred tax charge recognised?",
        options: [
          "In other comprehensive income, following the revaluation surplus",
          "In profit or loss, because all tax charges are recognised there",
          "Directly in retained earnings",
          "It is not recognised until the property is sold",
        ],
        correct: 0,
        explain:
          "Deferred tax follows the item that gave rise to it. The revaluation surplus is recognised in OCI, so the related deferred tax is charged to OCI — which is why the net amount reported in OCI is less than the gross surplus.",
      },
    },
  ],
  examTraps: [
    { trap: "Deducting an under-provision from the current year's charge.", fix: "An under-provision means last year's charge was too low, so it is ADDED to this year's expense." },
    { trap: "Treating a prior year tax adjustment as a prior period error.", fix: "It is a change in estimate, dealt with in the current year." },
    { trap: "Applying the asset sign convention to a liability.", fix: "For a liability the signs REVERSE: a carrying amount above the tax base is a DEDUCTIBLE difference and gives a deferred tax asset." },
    { trap: "Recognising a deferred tax asset without considering future profits.", fix: "It is recognised only to the extent it is PROBABLE that taxable profit will be available. Liabilities carry no such condition." },
    { trap: "Charging the whole closing deferred tax balance to profit.", fix: "Charge the MOVEMENT, and then split it according to where the underlying items were recognised." },
    { trap: "Putting the deferred tax on a revaluation through profit or loss.", fix: "It follows the surplus into OCI." },
    { trap: "Discounting deferred tax.", fix: "IAS 12 prohibits it." },
    { trap: "Classifying deferred tax as current.", fix: "It is always non-current." },
  ],
  keyTerms: [
    { term: "Current tax", def: "The amount of income tax payable or recoverable in respect of the taxable profit or loss for a period." },
    { term: "Tax base", def: "The amount attributed to an asset or liability for tax purposes — broadly the future deductible amount for an asset, and carrying amount less future deductions for a liability." },
    { term: "Taxable temporary difference", def: "A difference that will result in taxable amounts in future periods, giving rise to a deferred tax liability." },
    { term: "Deductible temporary difference", def: "A difference that will result in deductible amounts in future periods, giving rise to a deferred tax asset — recognised only where future taxable profits are probable." },
    { term: "Under-provision", def: "A prior year current tax charge that proved too low; added to the current year's tax expense as a change in estimate." },
    { term: "Substantively enacted", def: "The stage at which a tax rate change is sufficiently certain to be used in measuring deferred tax, even before it takes legal effect." },
  ],
  summary: [
    "Tax expense = current year estimate ± prior year under/over-provision ± the movement in deferred tax.",
    "An under-provision is ADDED; an over-provision is deducted. Neither is a prior period error.",
    "Temporary difference = carrying amount − tax base, with the signs REVERSED for liabilities.",
    "Deferred tax liabilities are recognised for all taxable differences; deferred tax ASSETS only where future taxable profit is probable.",
    "Measure at the rate enacted or substantively enacted at the reporting date, expected to apply on reversal. Never discount.",
    "Charge the MOVEMENT in the balance, split according to where the underlying item was recognised — profit or loss, OCI, or equity.",
    "Deferred tax is always classified as non-current.",
  ],
  knowledgeDiagnostic: [
    { q: "How is an under-provision of prior year tax treated?", a: "Added to the current year's tax expense. It is a change in estimate, not a prior period error." },
    { q: "How is a temporary difference computed?", a: "Carrying amount less tax base — with the signs reversed for a liability." },
    { q: "What condition attaches to recognising a deferred tax asset?", a: "It is recognised only to the extent it is probable that taxable profit will be available against which the deductible difference can be used." },
    { q: "Is deferred tax discounted?", a: "No, never." },
    { q: "Where is the deferred tax on a revaluation surplus recognised?", a: "In other comprehensive income, following the item that gave rise to it." },
    { q: "How is deferred tax classified in the statement of financial position?", a: "Always as non-current, whatever the expected timing of reversal." },
  ],
  furtherStudy: [
    "Chapter 8 — the revaluation surplus that brings a deferred tax charge into OCI with it",
    "Chapter 24 — assembling the tax expense and the two tax balances in a single-entity preparation question",
    "Chapter 10 — capitalised development costs, one of the standard temporary differences",
  ],
}
