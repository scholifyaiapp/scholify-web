import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 21 to 23, completing the area.
 *
 * Three shorter standards that share one property: each turns on a CLASSIFICATION made
 * before any arithmetic. IAS 21 asks whether an item is monetary. IFRS 5 asks whether an
 * asset is held for sale and whether the operation is discontinued. IAS 8 asks whether a
 * change is a policy, an estimate or an error. Get the classification wrong and the
 * arithmetic cannot recover.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_21: StudyChapter = {
  id: "FR-21",
  number: 21,
  paper: "FR",
  area: "B",
  title: "IAS 21: foreign currency transactions",
  minutes: 15,
  syllabusRefs: ["B11(a)", "B11(b)"],
  intro:
    "One question decides the treatment: is the item monetary? Monetary items move with the exchange rate; non-monetary items do not.",
  outcomes: [
    "Explain functional currency and presentation currency",
    "Translate a foreign currency transaction on initial recognition",
    "Distinguish monetary from non-monetary items",
    "Retranslate monetary items at the reporting date and recognise the exchange difference",
    "Explain why non-monetary items are not retranslated, and the exception for fair value",
  ],
  sections: [
    {
      id: "functional-currency",
      heading: "Functional currency",
      blocks: [
        {
          kind: "definition",
          term: "Functional currency",
          md: "The currency of the **primary economic environment** in which the entity operates — normally the one in which it primarily generates and expends cash. It is a matter of **fact, determined by evidence**, not a choice.",
        },
        {
          kind: "list",
          title: "The indicators, in order of priority",
          items: [
            "**Primary indicators.** The currency that mainly influences **sales prices** for goods and services, and the currency of the country whose competitive forces and regulations mainly determine those prices; and the currency that mainly influences **labour, material and other costs**.",
            "**Secondary indicators**, considered only where the primary ones are not decisive: the currency in which **financing** is generated, and the currency in which **receipts from operating activities** are usually retained.",
            "**Presentation currency** is different and IS a free choice — the currency in which the financial statements are presented. Where it differs from the functional currency, the results are translated for presentation.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What FR examines here",
          md: "FR examines **foreign currency TRANSACTIONS** in an entity's own financial statements. The translation of a foreign **subsidiary** for consolidation is not in the FR syllabus — it belongs to SBR.\n\nSo the practical scope is: an entity with, say, a dollar functional currency that buys or sells in euros. Everything below applies to that.",
        },
      ],
    },
    {
      id: "the-rules",
      heading: "The three rules",
      blocks: [
        {
          kind: "formula",
          name: "Translating foreign currency transactions",
          expr: "1  INITIAL RECOGNITION\n      Translate at the SPOT rate on the date of the transaction\n      An average rate for a period is permitted where rates do not\n      fluctuate significantly\n\n2  AT EACH REPORTING DATE\n      MONETARY items      →  RETRANSLATE at the CLOSING rate\n                             difference  →  PROFIT OR LOSS\n\n      NON-MONETARY items at historical cost\n                          →  DO NOT retranslate; keep the rate at\n                             the date of the transaction\n\n      NON-MONETARY items at FAIR VALUE\n                          →  translate at the rate when FAIR VALUE\n                             WAS MEASURED, and the exchange element\n                             follows the fair value gain — so to OCI\n                             for a revaluation, to profit for an\n                             IAS 40 fair value movement\n\n3  ON SETTLEMENT\n      Translate at the SPOT rate on the settlement date\n      difference  →  PROFIT OR LOSS",
          note: "There is no separate 'exchange reserve' for transactions. Every difference on a monetary item goes through profit or loss, in the year it arises.",
        },
        {
          kind: "table",
          caption: "Monetary or non-monetary?",
          head: ["MONETARY — retranslate", "NON-MONETARY — do not"],
          rows: [
            ["Cash and bank balances in a foreign currency", "Inventory"],
            ["Trade receivables and trade payables", "Property, plant and equipment"],
            ["Loans receivable and payable", "Intangible assets"],
            ["Accrued interest", "Goodwill"],
            ["A liability to deliver a fixed number of the entity's own shares? **No** — that is non-monetary", "Prepayments for goods or services"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The test for monetary",
          md: "**A right to receive, or an obligation to deliver, a FIXED or DETERMINABLE NUMBER OF UNITS OF CURRENCY.**\n\nThat is the whole definition, and it explains the awkward cases. A **prepayment** for goods is non-monetary, because the entity will receive goods rather than a fixed number of currency units. A **deposit refundable in cash** is monetary. Inventory is non-monetary even though it will be sold for cash, because the entity holds goods and not a claim to currency.\n\nIf you can answer \"how many euros will change hands, and is that number fixed?\", you have the classification.",
        },
        {
          kind: "example",
          title: "A purchase across a year end, and a machine",
          scenario:
            "Merlin Co has a functional currency of dollars and a 31 December year end. Two transactions:\n\n(a) On 1 November 20X4 it bought goods for €180,000 on credit. The exchange rate was €1 = $1.10. The goods were still in inventory at 31 December 20X4, when the rate was €1 = $1.16. The supplier was paid on 15 February 20X5, when the rate was €1 = $1.13.\n\n(b) On 1 September 20X4 it bought a machine for €500,000, paying cash, when the rate was €1 = $1.05.",
          steps: [
            { label: "(a) Record the purchase at the spot rate", detail: "€180,000 × 1.10 = $198,000. Dr Inventory $198,000; Cr Payable $198,000." },
            { label: "(a) At the reporting date, deal with the two items separately", detail: "The PAYABLE is monetary — an obligation to deliver a fixed number of euros — so retranslate at the closing rate: €180,000 × 1.16 = $208,800. The increase of $10,800 is an EXCHANGE LOSS in profit or loss.\n\nThe INVENTORY is non-monetary, so it stays at $198,000. It is not retranslated, and there is no matching gain to offset the loss on the payable." },
            { label: "(a) Note why the asymmetry is correct", detail: "The entity's obligation genuinely has grown in dollar terms — it will now cost more dollars to settle. The goods have not changed in dollar cost, because the entity already paid, in economic terms, at the November rate. Retranslating the inventory would restate a completed purchase." },
            { label: "(a) Settle in the following year", detail: "€180,000 × 1.13 = $203,400 paid. The payable was carried at $208,800, so an EXCHANGE GAIN of $5,400 arises in 20X5.\n\nOver the two years the net effect is a $10,800 loss then a $5,400 gain — a net loss of $5,400, which is exactly $203,400 paid against $198,000 originally recorded. The two-year total is the real economic outcome; the split between years is the reporting-date rule." },
            { label: "(b) The machine", detail: "€500,000 × 1.05 = $525,000, and that is the cost for the whole of its life. It is non-monetary and at historical cost, so it is never retranslated however the euro moves. Depreciation is computed on $525,000." },
            { label: "(b) Note the exception", detail: "If Merlin adopted the revaluation model and revalued the machine, the new figure would be translated at the rate when the fair value was measured — and the exchange element would go to OCI with the revaluation surplus, not to profit." },
          ],
          result:
            "**20X4: a $10,800 exchange loss, inventory at $198,000, machine at $525,000. 20X5: a $5,400 exchange gain.** The examinable discipline is retranslating the payable and leaving the inventory and the machine alone.",
        },
      ],
      check: {
        q: "An entity with a dollar functional currency holds inventory bought for €100,000 when the rate was €1 = $1.20. At the year end the rate is €1 = $1.30. At what amount is the inventory carried?",
        options: [
          "$120,000 — inventory is non-monetary and is not retranslated",
          "$130,000, with a $10,000 exchange gain in profit or loss",
          "$130,000, with a $10,000 gain in other comprehensive income",
          "The lower of $120,000 and $130,000",
        ],
        correct: 0,
        explain:
          "Inventory is a non-monetary item carried at historical cost, so it stays at the rate on the transaction date: $120,000. Only monetary items are retranslated. It is of course still subject to the lower of cost and NRV test under IAS 2, but that is a separate matter from translation.",
      },
    },
  ],
  examTraps: [
    { trap: "Retranslating inventory or PPE at the closing rate.", fix: "Non-monetary items at historical cost keep the rate on the transaction date." },
    { trap: "Failing to retranslate a foreign currency payable or receivable.", fix: "Monetary items are retranslated at the closing rate, with the difference in profit or loss." },
    { trap: "Putting exchange differences on monetary items in other comprehensive income.", fix: "They go to profit or loss. There is no exchange reserve for transactions in an entity's own statements." },
    { trap: "Classifying a prepayment as monetary.", fix: "A prepayment gives a right to goods or services, not to a fixed number of currency units, so it is non-monetary." },
    { trap: "Treating functional currency as a policy choice.", fix: "It is a question of fact determined by the primary indicators. Only the PRESENTATION currency is a choice." },
  ],
  keyTerms: [
    { term: "Functional currency", def: "The currency of the primary economic environment in which the entity operates; a matter of fact determined by the primary and secondary indicators." },
    { term: "Presentation currency", def: "The currency in which the financial statements are presented, which the entity may choose freely." },
    { term: "Monetary items", def: "Units of currency held, and assets and liabilities to be received or paid in a fixed or determinable number of currency units." },
    { term: "Closing rate", def: "The spot exchange rate at the end of the reporting period, used to retranslate monetary items." },
    { term: "Spot rate", def: "The exchange rate for immediate delivery, used on initial recognition and on settlement." },
  ],
  summary: [
    "Functional currency is a matter of fact; presentation currency is a choice.",
    "Translate on initial recognition at the spot rate.",
    "At the reporting date, retranslate MONETARY items at the closing rate, with differences in PROFIT OR LOSS.",
    "Do not retranslate non-monetary items at historical cost. Where they are at fair value, use the rate when fair value was measured and follow the fair value gain to profit or OCI.",
    "On settlement, translate at the spot rate with the difference in profit or loss.",
    "Monetary means a fixed or determinable number of currency units — which makes a prepayment non-monetary and a refundable deposit monetary.",
    "Translating a foreign subsidiary for consolidation is not in the FR syllabus.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the test for a monetary item?", a: "A right to receive, or obligation to deliver, a fixed or determinable number of units of currency." },
    { q: "Where do exchange differences on monetary items go?", a: "Profit or loss, in the period in which they arise." },
    { q: "Is inventory retranslated at the closing rate?", a: "No. It is non-monetary and stays at the rate on the transaction date." },
    { q: "At what rate is a non-monetary item measured at fair value translated?", a: "The rate when the fair value was measured, with the exchange element following the fair value gain to profit or OCI." },
    { q: "Is functional currency a choice?", a: "No. It is determined by the primary and secondary indicators. Only the presentation currency may be chosen." },
  ],
  furtherStudy: [
    "Chapter 24 — where exchange differences appear in the statement of profit or loss",
    "Chapter 25 — the treatment of exchange differences on cash and cash equivalents in the statement of cash flows",
    "SBR — the translation of a foreign subsidiary, which is outside the FR syllabus",
  ],
}

export const FR_TREE_22: StudyChapter = {
  id: "FR-22",
  number: 22,
  paper: "FR",
  area: "B",
  title: "IFRS 5: held for sale and discontinued operations",
  minutes: 17,
  syllabusRefs: ["B9(g)", "B9(h)", "B9(i)"],
  intro:
    "Two separate classifications with two separate consequences: held for sale changes measurement and stops depreciation; discontinued changes presentation.",
  outcomes: [
    "Apply the criteria for classifying an asset or disposal group as held for sale",
    "Measure a held for sale asset and allocate any write-down within a disposal group",
    "Explain the consequences of classification, including the cessation of depreciation",
    "Apply the definition of a discontinued operation",
    "Present a discontinued operation in the statement of profit or loss and restate comparatives",
  ],
  sections: [
    {
      id: "held-for-sale",
      heading: "Held for sale: the criteria and the consequences",
      blocks: [
        {
          kind: "formula",
          name: "The classification criteria",
          expr: "An asset or disposal group is HELD FOR SALE when its carrying\namount will be recovered PRINCIPALLY THROUGH A SALE rather than\nthrough continuing use, and:\n\n   1  it is AVAILABLE FOR IMMEDIATE SALE in its PRESENT CONDITION\n\n   2  the sale is HIGHLY PROBABLE, which requires:\n         management is COMMITTED to a plan to sell\n         an ACTIVE PROGRAMME to locate a buyer has begun\n         it is MARKETED at a price reasonable in relation to its\n            current fair value\n         the sale is EXPECTED WITHIN ONE YEAR of classification\n         it is unlikely the plan will be significantly changed or\n            withdrawn\n\nAn asset to be ABANDONED is NOT held for sale — it will not be\nsold. It continues in use until it is derecognised, though it may\nstill be a discontinued operation.",
          note: "\"Available for immediate sale in its present condition\" is the criterion that fails most often. A building still being used by the entity until a replacement is finished is not available for immediate sale.",
        },
        {
          kind: "list",
          title: "What classification changes",
          items: [
            "**Measurement** becomes the **LOWER of carrying amount and FAIR VALUE LESS COSTS TO SELL**. Any write-down is an impairment loss in profit or loss.",
            "**DEPRECIATION AND AMORTISATION STOP.** The asset is no longer being consumed in operations; it is being held for sale. This is the single most examined consequence.",
            "**Presentation** is separate: the asset (or the disposal group's assets and liabilities) is presented separately from other assets and liabilities in the statement of financial position, as a **current** item, and the assets and liabilities are **NOT offset**.",
            "**Comparatives in the statement of financial position are NOT restated.** This differs from the discontinued operation rule for profit or loss, and the contrast is examined.",
            "A subsequent **increase** in fair value less costs to sell is recognised as a gain, but only up to the cumulative impairment previously recognised.",
          ],
        },
        {
          kind: "example",
          title: "Measuring a disposal group",
          scenario:
            "Bittern Co classified a disposal group as held for sale on 30 September. Immediately before classification, and after remeasuring the items outside IFRS 5's measurement scope under their own standards, the carrying amounts were:\n\n  Goodwill                      $150,000\n  Property, plant and equipment $900,000\n  Intangible assets             $250,000\n  Inventory                     $200,000\n  Trade receivables             $150,000\n\nThe fair value less costs to sell of the disposal group is $1,400,000.",
          steps: [
            { label: "Remeasure the out-of-scope items first", detail: "Inventory (IAS 2) and receivables (IFRS 9) are outside IFRS 5's measurement rules and are measured under their own standards immediately before classification. The scenario states this has been done, so their carrying amounts stand." },
            { label: "Compare the group's total carrying amount with fair value less costs to sell", detail: "Total $150,000 + $900,000 + $250,000 + $200,000 + $150,000 = $1,650,000, against $1,400,000. A write-down of $250,000 is required." },
            { label: "Allocate to goodwill first", detail: "The whole $150,000 of goodwill is written off — the same ordering as IAS 36." },
            { label: "Allocate the remainder pro rata to the in-scope assets", detail: "The remaining $100,000 is allocated across PPE and intangibles on their carrying amounts, total $1,150,000:\n  PPE:          $100,000 × $900,000/$1,150,000 = $78,261\n  Intangibles:  $100,000 × $250,000/$1,150,000 = $21,739\nCheck: $78,261 + $21,739 = $100,000. Inventory and receivables absorb none of it, being outside the measurement scope." },
            { label: "State the revised carrying amounts", detail: "Goodwill nil; PPE $821,739; intangibles $228,261; inventory $200,000; receivables $150,000 — total $1,400,000, equal to fair value less costs to sell." },
            { label: "Stop depreciating", detail: "From 30 September, no further depreciation or amortisation is charged on the PPE or the intangibles, even if the sale takes several months. Depreciation for the nine months to 30 September IS charged, before the write-down is computed." },
          ],
          result:
            "**A $250,000 impairment allocated $150,000 to goodwill, $78,261 to PPE and $21,739 to intangibles; depreciation ceases from classification.** Two marks are routinely lost by allocating across inventory and receivables, and one by continuing to depreciate.",
        },
      ],
      check: {
        q: "An entity classifies a building as held for sale on 1 July. The sale completes on 31 March the following year. What depreciation is charged in the year to 31 December?",
        options: [
          "Six months, to the date of classification only",
          "Twelve months, since the asset was owned all year",
          "None, because the asset is held for sale",
          "Nine months, to the reporting date",
        ],
        correct: 0,
        explain:
          "Depreciation is charged up to the date of classification — six months — and then ceases. It does not continue while the asset is held for sale, and it is not eliminated for the period before classification when the asset was still in use.",
      },
    },
    {
      id: "discontinued",
      heading: "Discontinued operations: a presentation question",
      blocks: [
        {
          kind: "definition",
          term: "Discontinued operation",
          md: "A **component of an entity** that has either been **disposed of** or is **classified as held for sale**, and that:\n\n· represents a **separate major line of business or geographical area of operations**; or\n· is **part of a single co-ordinated plan** to dispose of such a line or area; or\n· is a **subsidiary acquired exclusively with a view to resale**.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Held for sale and discontinued are NOT the same test",
          md: "A single machine can be **held for sale** without being anything like a discontinued operation. A whole division can be **discontinued** because it has been abandoned, without ever being held for sale.\n\nThe two classifications have different consequences and are assessed separately:\n\n· **HELD FOR SALE** → changes MEASUREMENT (lower of carrying amount and fair value less costs to sell) and stops depreciation.\n· **DISCONTINUED** → changes PRESENTATION in profit or loss, and requires the comparative to be restated.\n\nA question giving you a division being closed down rather than sold is testing exactly this: it is a discontinued operation, but it is not held for sale, so it continues to be depreciated.",
        },
        {
          kind: "list",
          title: "Presentation of a discontinued operation",
          items: [
            "A **SINGLE AMOUNT** on the face of the statement of profit or loss, comprising the **post-tax profit or loss of the discontinued operation** and the **post-tax gain or loss on disposal** or on remeasurement to fair value less costs to sell.",
            "An analysis of that single amount — revenue, expenses, pre-tax profit, tax, and the gain or loss on disposal — is given either on the face of the statement or in the notes.",
            "The **COMPARATIVE statement of profit or loss IS RESTATED** so that it presents the same operation as discontinued, even though it was not classified as such last year. This is what makes the continuing-operations figures comparable, and it is the point of the whole presentation.",
            "**Continuing operations** are presented without the discontinued operation's results, so revenue, cost of sales and every line above the single amount exclude it.",
            "Net cash flows attributable to operating, investing and financing activities of the discontinued operation are disclosed.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why restating the comparative matters more than it looks",
          md: "An entity that disposes of a division reports lower revenue this year than last. Without restatement, a user cannot tell whether the fall reflects the disposal or a deterioration in the business that remains.\n\nRestating the comparative removes the disposed division from BOTH years' continuing operations. The reader can then compare like with like, and the disposal's own effect is shown separately in the single discontinued line.\n\nThis is the single most useful thing IFRS 5 does, and it is why an interpretation question that mentions a disposal expects you to comment on the continuing figures rather than the totals.",
        },
        {
          kind: "activity",
          title: "Held for sale, discontinued, both, or neither?",
          prompt:
            "Classify each:\n\n(i) A single delivery vehicle being actively marketed and expected to sell within two months.\n(ii) The entity's entire European retail division, which it has announced it will close over the next six months. There will be no sale.\n(iii) A factory the entity will vacate and sell once a replacement is commissioned in eight months' time.\n(iv) A subsidiary acquired last month with the sole intention of reselling it within the year.",
          answer:
            "(i) HELD FOR SALE only. It meets the criteria — available for immediate sale, actively marketed, expected within a year — so it is measured at the lower of carrying amount and fair value less costs to sell and depreciation stops. It is not a separate major line of business, so it is not a discontinued operation.\n\n(ii) DISCONTINUED only. A separate major geographical area of operations being abandoned. It is NOT held for sale, because it is being closed rather than sold — so no remeasurement under IFRS 5 and depreciation CONTINUES. Present its results as a single amount and restate the comparative.\n\n(iii) NEITHER, yet. The factory is not available for immediate sale in its present condition — the entity is still using it and will do so for eight months. Classification is deferred until it is actually available. Depreciation continues meanwhile.\n\n(iv) BOTH. A subsidiary acquired exclusively with a view to resale is expressly a discontinued operation, and it will also meet the held for sale criteria.\n\nOne of the four is held for sale, one is discontinued, one is both, and one is neither. That distribution is exactly why the two tests must be applied separately.",
        },
      ],
      check: {
        q: "An entity will close, not sell, a major geographical division over the next four months. How is it treated?",
        options: [
          "A discontinued operation, but not held for sale — so depreciation continues and there is no IFRS 5 remeasurement",
          "Held for sale and a discontinued operation",
          "Held for sale only, since disposal is within twelve months",
          "Neither, until the closure is complete",
        ],
        correct: 0,
        explain:
          "An asset to be abandoned is not held for sale, because its carrying amount will not be recovered through a sale. But a separate major geographical area being closed is a discontinued operation, so it is presented as a single amount with the comparative restated — while continuing to be depreciated and measured normally.",
      },
    },
  ],
  examTraps: [
    { trap: "Continuing to depreciate an asset classified as held for sale.", fix: "Depreciation stops at the date of classification — but is charged up to that date." },
    { trap: "Classifying an asset as held for sale while the entity is still using it.", fix: "It must be available for immediate sale in its PRESENT condition." },
    { trap: "Treating an asset to be abandoned as held for sale.", fix: "It will not be sold, so it is not held for sale — though it may still be a discontinued operation." },
    { trap: "Allocating a disposal group write-down across inventory and receivables.", fix: "They are outside IFRS 5's measurement scope. Goodwill first, then pro rata to the in-scope assets." },
    { trap: "Offsetting a disposal group's assets and liabilities.", fix: "They are presented separately, both as current items." },
    { trap: "Failing to restate the comparative statement of profit or loss.", fix: "It IS restated for a discontinued operation. Note the contrast: the comparative statement of FINANCIAL POSITION is not." },
    { trap: "Presenting the discontinued operation's revenue within continuing operations.", fix: "Continuing operations exclude it entirely; the discontinued result appears as a single post-tax amount." },
  ],
  keyTerms: [
    { term: "Held for sale", def: "An asset or disposal group whose carrying amount will be recovered principally through sale, available for immediate sale in its present condition, with a highly probable sale expected within one year." },
    { term: "Disposal group", def: "A group of assets, and liabilities directly associated with them, to be disposed of together in a single transaction." },
    { term: "Fair value less costs to sell", def: "The measurement basis for a held for sale asset, compared with carrying amount to determine any write-down." },
    { term: "Discontinued operation", def: "A component disposed of or classified as held for sale that represents a separate major line of business or geographical area, is part of a co-ordinated plan to dispose of one, or is a subsidiary acquired exclusively for resale." },
  ],
  summary: [
    "Held for sale requires the asset to be available for immediate sale in its present condition, with a highly probable sale expected within one year.",
    "It is then measured at the LOWER of carrying amount and fair value less costs to sell, and DEPRECIATION STOPS.",
    "Write-downs in a disposal group go to goodwill first, then pro rata to in-scope assets. Inventory and receivables are excluded.",
    "Assets and liabilities of a disposal group are presented separately and are not offset; the comparative statement of financial position is not restated.",
    "A discontinued operation is a separate major line of business or geographical area disposed of or held for sale, or a subsidiary acquired for resale.",
    "It is presented as a SINGLE post-tax amount, with the comparative statement of profit or loss RESTATED.",
    "The two classifications are independent: an abandoned division is discontinued but not held for sale, so it keeps being depreciated.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two consequences of classification as held for sale?", a: "Measurement at the lower of carrying amount and fair value less costs to sell, and the cessation of depreciation and amortisation." },
    { q: "Can an asset to be abandoned be held for sale?", a: "No — its carrying amount will not be recovered through a sale. It may still be a discontinued operation." },
    { q: "In what order is a disposal group write-down allocated?", a: "Goodwill first and in full, then pro rata to the assets within IFRS 5's measurement scope." },
    { q: "How is a discontinued operation presented?", a: "As a single amount comprising post-tax profit or loss and post-tax gain or loss on disposal, with an analysis on the face or in the notes." },
    { q: "Which comparative is restated?", a: "The statement of profit or loss. The comparative statement of financial position is not." },
  ],
  furtherStudy: [
    "Chapter 11 — IAS 36, whose allocation ordering IFRS 5 borrows",
    "Chapter 24 — presenting continuing and discontinued operations in the statement of profit or loss",
    "Chapter 32 — why a disposal makes group figures non-comparable, and how the restated comparative fixes it",
  ],
}

export const FR_TREE_23: StudyChapter = {
  id: "FR-23",
  number: 23,
  paper: "FR",
  area: "B",
  title: "IAS 8: accounting policies, changes in estimates and errors",
  minutes: 15,
  syllabusRefs: ["B9(j)", "B9(k)", "A1(f)"],
  intro:
    "Three categories, two treatments. Getting the category right decides whether last year's figures are rewritten or left alone.",
  outcomes: [
    "Distinguish an accounting policy from an accounting estimate",
    "Account for a change of accounting policy retrospectively, and state the exemptions",
    "Account for a change in accounting estimate prospectively",
    "Correct a prior period error retrospectively and state the required disclosures",
    "Explain how comparability is protected by each treatment",
  ],
  sections: [
    {
      id: "the-three-categories",
      heading: "The three categories",
      blocks: [
        {
          kind: "table",
          caption: "Category, treatment, and effect on the comparative",
          head: ["Category", "Definition", "Treatment", "Comparative"],
          rows: [
            ["**Change of accounting POLICY**", "A change in the specific principles, bases, conventions, rules and practices applied in preparing financial statements", "**RETROSPECTIVE** — apply as if the new policy had always been applied", "**RESTATED**, and opening retained earnings of the earliest period presented adjusted"],
            ["**Change in accounting ESTIMATE**", "An adjustment to the carrying amount of an asset or liability, or the amount of its periodic consumption, resulting from new information or developments", "**PROSPECTIVE** — from the date of change", "**NOT restated**"],
            ["**Prior period ERROR**", "An omission from, or misstatement in, financial statements of one or more prior periods arising from a failure to use, or misuse of, information available at the time", "**RETROSPECTIVE RESTATEMENT**", "**RESTATED**, and opening retained earnings adjusted"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Policy or estimate? The discriminator",
          md: "A **POLICY** answers **WHICH BASIS** is used. A cost model or a revaluation model. FIFO or weighted average cost. Deferred income or netting for a government grant.\n\nAn **ESTIMATE** answers **WHAT NUMBER** to use within a chosen basis. A useful life. A residual value. A depreciation method. A provision amount. An expected credit loss rate.\n\nThe test is not whether the change feels significant. Changing from reducing balance to straight line depreciation feels like a policy change and is an ESTIMATE change, because the method is chosen to reflect the expected pattern of consumption of benefits — which is a judgement about facts, not about which principle to apply.\n\nAnd where it is genuinely difficult to tell, IAS 8 resolves it: **treat it as a change in estimate.**",
        },
        {
          kind: "list",
          title: "When a change of policy is permitted",
          items: [
            "It is **required by an IFRS Standard**; or",
            "It results in the financial statements providing **RELIABLE and MORE RELEVANT** information about the effects of transactions on the entity's financial position, performance or cash flows.",
            "Voluntary changes for any other reason — including because the new policy produces a more favourable result — are **not permitted**. An entity cannot switch policies to manage its reported figures, and that restriction exists to protect comparability.",
            "**Two exemptions from retrospective application** are worth knowing: the first-time application of the **REVALUATION MODEL** in IAS 16 or IAS 38 is dealt with under that standard, from the date of revaluation; and retrospective application is not required where it is **IMPRACTICABLE** to determine the period-specific effects or the cumulative effect.",
          ],
        },
      ],
      check: {
        q: "An entity revises the estimated useful life of its plant from ten years to seven. How is this accounted for?",
        options: [
          "Prospectively, as a change in accounting estimate; comparatives are not restated",
          "Retrospectively, as a change in accounting policy; comparatives are restated",
          "Retrospectively, as the correction of a prior period error",
          "Prospectively, but only from the beginning of the following accounting period",
        ],
        correct: 0,
        explain:
          "Useful life is an estimate, so the change is applied prospectively from the date of change — the current carrying amount less residual value spread over the revised remaining life. No comparative is restated and no error has occurred, because the original estimate was reasonable on the information then available.",
      },
    },
    {
      id: "errors",
      heading: "Correcting a prior period error",
      blocks: [
        {
          kind: "text",
          md: "An error is an omission or misstatement arising from a **failure to use, or misuse of, information that was AVAILABLE** when the statements were authorised and **could reasonably be expected to have been obtained**. Errors include mathematical mistakes, mistakes in applying policies, oversights, misinterpretations of facts, and fraud.\n\nThe crucial boundary: an estimate that turns out wrong is **not** an error, provided it was reasonable on the information available at the time. This is what separates a change in estimate from a restatement, and questions are built on the distinction.",
        },
        {
          kind: "example",
          title: "An inventory overstatement discovered a year later",
          scenario:
            "During the year to 31 December 20X6, Wryneck Co discovered that closing inventory at 31 December 20X5 had been overstated by $180,000 because a warehouse count had been double-recorded. The 20X5 financial statements reported profit of $940,000 and closing retained earnings of $3,600,000. Profit for 20X6, computed on the corrected opening inventory, is $1,120,000. Ignore tax.",
          steps: [
            { label: "Classify the change", detail: "This is a PRIOR PERIOD ERROR. The information — the actual count — was available at the time and was misused. It is not a change in estimate, so retrospective restatement is required." },
            { label: "Restate the 20X5 comparative", detail: "Reduce closing inventory by $180,000, increase cost of sales by $180,000, and reduce profit from $940,000 to $760,000. The restated 20X5 closing retained earnings become $3,600,000 − $180,000 = $3,420,000." },
            { label: "Adjust the opening position for 20X6", detail: "Opening retained earnings for 20X6 are the restated $3,420,000, not the originally reported $3,600,000. The statement of changes in equity shows the opening balance as previously reported, the restatement, and the restated opening balance." },
            { label: "Deal with 20X6", detail: "20X6 profit of $1,120,000 needs no adjustment, because it has already been computed using the CORRECTED opening inventory. This is the step candidates get wrong: the error is self-correcting across two periods, so recognising it again in 20X6 would double count it." },
            { label: "Check the two-year total", detail: "Originally reported: $940,000 + a 20X6 profit that would have been $180,000 higher on the uncorrected opening inventory, i.e. $1,300,000, totalling $2,240,000. Restated: $760,000 + $1,120,000 = $1,880,000. The $360,000 difference is the $180,000 removed from 20X5 plus the $180,000 that would wrongly have been added to 20X6." },
            { label: "State the disclosures", detail: "The nature of the error; the amount of the correction for each prior period presented, for each line item affected; the amount of the correction at the beginning of the earliest period presented; and, if retrospective restatement is impracticable, the circumstances and how the error has been corrected." },
          ],
          result:
            "**20X5 restated to a profit of $760,000; opening retained earnings for 20X6 restated to $3,420,000; 20X6 profit unaffected.** The self-correcting nature of an inventory error over two periods is the point that carries the marks.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The three-line disclosure that answers most IAS 8 requirements",
          md: "Whether the restatement arises from a policy change or an error, the statement of changes in equity carries the same three lines:\n\n**Balance at 1 January as previously reported** — the figure users saw last year.\n**Restatement / effect of change in accounting policy** — the adjustment.\n**Balance at 1 January as restated** — the figure the current year builds on.\n\nIf a Section C requirement asks you to \"show how the change would be presented\", those three lines plus the restated comparative column are most of the answer.",
        },
        {
          kind: "activity",
          title: "Policy, estimate, or error?",
          prompt:
            "Classify each and state the treatment:\n\n(i) The entity changes from measuring investment property at cost to measuring it at fair value.\n(ii) It increases its expected credit loss rate on receivables from 3% to 6% following a customer's failure.\n(iii) It discovers that a $400,000 finance lease liability was omitted entirely from last year's statement of financial position.\n(iv) It changes the depreciation method for vehicles from straight line to reducing balance to reflect a revised pattern of consumption.\n(v) It adopts the revaluation model for its properties for the first time.",
          answer:
            "(i) A change of accounting POLICY — which measurement basis applies is a policy. Retrospective: restate the comparative and adjust opening retained earnings. It is permitted only because fair value gives more relevant information for investment property.\n\n(ii) A change in ESTIMATE. New information about credit risk. Prospective, no restatement, and NOT an error — the 3% was reasonable on what was known.\n\n(iii) A prior period ERROR. The lease existed and the information was available. Retrospective restatement: restate the comparative, adjust opening retained earnings, and disclose the nature and amount.\n\n(iv) A change in ESTIMATE, despite feeling like a policy change. The method reflects the expected pattern of consumption of benefits, so IAS 16 treats it as an estimate. Prospective.\n\n(v) A change of POLICY, but EXEMPT from retrospective application — IAS 8 directs you to IAS 16, which applies the revaluation model from the date of revaluation. No comparative is restated.\n\nThree different treatments across five changes. Naming the category is the first mark in every one of them.",
        },
      ],
      check: {
        q: "An entity discovers that last year's closing inventory was understated by $90,000. This year's profit has been computed using the corrected opening inventory. What is the effect on this year's profit?",
        options: [
          "None — the error is corrected by restating last year, and this year already uses the corrected figure",
          "This year's profit increases by $90,000",
          "This year's profit decreases by $90,000",
          "This year's profit increases by $180,000",
        ],
        correct: 0,
        explain:
          "The comparative is restated to increase last year's inventory and profit by $90,000, and opening retained earnings are adjusted. Because this year's cost of sales already uses the corrected opening inventory, this year's profit needs no adjustment — recognising it again would double count.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a change of depreciation method as a change of policy.", fix: "It reflects the expected pattern of consumption, so it is a change in ESTIMATE — prospective." },
    { trap: "Treating an estimate that turned out wrong as an error.", fix: "It is not an error if it was reasonable on the information available at the time. Only a failure to use, or misuse of, available information is an error." },
    { trap: "Restating comparatives for a change in estimate.", fix: "Changes in estimate are prospective. Only policy changes and errors are retrospective." },
    { trap: "Adjusting the current year's profit for a self-correcting inventory error.", fix: "Restate the prior year and the opening retained earnings. The current year already reflects the corrected opening figure." },
    { trap: "Applying the revaluation model retrospectively.", fix: "First-time adoption is exempt: IAS 16 applies it from the date of revaluation." },
    { trap: "Changing a policy to improve reported results.", fix: "Permitted only where required by a Standard or where the new policy gives reliable and MORE RELEVANT information." },
  ],
  keyTerms: [
    { term: "Accounting policy", def: "The specific principles, bases, conventions, rules and practices applied by an entity in preparing and presenting financial statements — which basis is used." },
    { term: "Change in accounting estimate", def: "An adjustment to the carrying amount of an asset or liability, or the amount of its periodic consumption, resulting from new information or developments — what number to use." },
    { term: "Prior period error", def: "An omission from or misstatement in prior period statements arising from a failure to use, or a misuse of, information that was available and could reasonably have been obtained." },
    { term: "Retrospective application", def: "Applying a new accounting policy as if it had always been applied, restating comparatives and adjusting opening retained earnings." },
    { term: "Retrospective restatement", def: "Correcting an error as if it had never occurred, by restating comparatives and adjusting opening retained earnings." },
  ],
  summary: [
    "Three categories: policy (which basis), estimate (what number), error (a misuse of available information).",
    "Policy changes and errors are RETROSPECTIVE — comparatives restated and opening retained earnings adjusted. Estimates are PROSPECTIVE.",
    "A change of depreciation method is a change in ESTIMATE, not policy.",
    "An estimate that proves wrong is not an error if it was reasonable at the time.",
    "Where it is unclear whether a change is a policy or an estimate, treat it as an ESTIMATE.",
    "A policy change is permitted only where required by a Standard, or where it gives reliable and more relevant information.",
    "First-time adoption of the revaluation model is exempt from retrospective application.",
    "An inventory error is self-correcting over two periods, so restate the prior year only.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes a policy from an estimate?", a: "A policy is which basis is applied; an estimate is what number to use within that basis." },
    { q: "How is a change in accounting estimate accounted for?", a: "Prospectively from the date of change, with no restatement of comparatives." },
    { q: "Is an estimate that turns out to be wrong an error?", a: "No, provided it was reasonable on the information available when the statements were authorised." },
    { q: "What happens to the current year's profit when a prior year inventory error is corrected?", a: "Nothing, if the current year already uses the corrected opening inventory. The correction is made by restating the prior year and the opening retained earnings." },
    { q: "When may an entity change an accounting policy?", a: "When required by a Standard, or when the change results in reliable and more relevant information." },
    { q: "Which policy change is exempt from retrospective application?", a: "First-time adoption of the revaluation model under IAS 16 or IAS 38, which is applied from the date of revaluation." },
  ],
  furtherStudy: [
    "Chapter 2 — comparability, the characteristic that retrospective restatement exists to protect",
    "Chapter 8 — the change of depreciation method that IAS 8 classifies as an estimate",
    "Chapter 24 — the statement of changes in equity, where the three restatement lines appear",
  ],
}
