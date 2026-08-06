import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area D — chapters 24 and 25: single-entity preparation, and cash flows.
 *
 * Chapter 24's worked example is a COMPLETE preparation from a trial balance that
 * genuinely balances, and both statements are shown balancing at the end. That is
 * deliberate: a partial example teaches the adjustments but not the discipline of proving
 * the answer, and in the exam the balance check is what tells a candidate whether to spend
 * their remaining minutes hunting an error or moving to the next requirement.
 *
 * Chapter 25 is IAS 7, taught as five workings rather than as a format to memorise. Every
 * figure in a cash flow statement is either a reconciling adjustment or the output of a
 * T-account, and candidates who learn the workings can build the statement from any
 * question while candidates who learn the layout cannot.
 *
 * All figures verified by script before authoring — including that the trial balance
 * balances and that both closing statements balance. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_24: StudyChapter = {
  id: "FR-24",
  number: 24,
  paper: "FR",
  area: "D",
  title: "IAS 1 and preparing single-entity financial statements",
  minutes: 20,
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)", "A3(d)"],
  intro:
    "A trial balance, a list of adjustments, and two statements that must balance. The method never changes, so build it into a routine.",
  outcomes: [
    "State the components of a complete set of financial statements and the IAS 1 presentation requirements",
    "Distinguish profit or loss from other comprehensive income, and identify which OCI items are reclassified",
    "Apply the current / non-current distinction",
    "Prepare a statement of profit or loss and other comprehensive income from a trial balance and adjustments",
    "Prepare a statement of financial position and a statement of changes in equity, and prove that they balance",
  ],
  sections: [
    {
      id: "ias-1",
      heading: "IAS 1: what must be presented",
      blocks: [
        {
          kind: "list",
          title: "A complete set of financial statements",
          items: [
            "A **statement of financial position** at the end of the period.",
            "A **statement of profit or loss and other comprehensive income** for the period — presented as one statement, or as two (a separate statement of profit or loss followed immediately by a statement of comprehensive income).",
            "A **statement of changes in equity**.",
            "A **statement of cash flows**.",
            "**Notes**, including a summary of material accounting policy information.",
            "**Comparative information** for the preceding period for every statement and note.",
            "A **third statement of financial position** at the beginning of the preceding period, where a retrospective restatement or reclassification has been made.",
          ],
        },
        {
          kind: "table",
          caption: "The IAS 1 general features",
          head: ["Feature", "What it requires"],
          rows: [
            ["**Fair presentation and compliance with IFRS**", "Present fairly the financial position, performance and cash flows. Compliance with IFRS is presumed to achieve it, and an explicit and unreserved statement of compliance must be made"],
            ["**Going concern**", "Prepare on the going concern basis unless management intends to liquidate or cease trading, or has no realistic alternative"],
            ["**Accrual basis**", "Recognise items when they meet the definitions and recognition criteria, not when cash moves"],
            ["**Materiality and aggregation**", "Present each material class separately. Immaterial items may be aggregated — and aggregating a material item with dissimilar items OBSCURES it, which is itself a failure"],
            ["**Offsetting**", "Do NOT offset assets against liabilities, or income against expenses, unless required or permitted by a Standard"],
            ["**Frequency and comparatives**", "At least annually; comparatives for all amounts, and for narrative information where relevant"],
            ["**Consistency of presentation**", "Retain presentation and classification from period to period unless a change is justified — and then reclassify the comparative too"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Other comprehensive income: the two categories",
          md: "OCI must be split between items that **WILL** and items that will **NOT** be reclassified to profit or loss.\n\n**Will NOT be reclassified:**\n· revaluation surpluses on PPE and intangibles (IAS 16 / IAS 38)\n· gains and losses on equity investments designated at FVTOCI\n· remeasurements of defined benefit plans\n\n**WILL be reclassified (recycled):**\n· gains and losses on DEBT instruments at FVTOCI\n· the effective portion of cash flow hedges\n· exchange differences on translating a foreign operation\n\nThe split is examined as a two-mark Section A question, and the discriminator is worth memorising: the revaluation surplus and the equity-FVTOCI reserve never touch profit; the debt-FVTOCI reserve does.",
        },
        {
          kind: "list",
          title: "The current / non-current distinction",
          items: [
            "An asset is **CURRENT** if it is expected to be realised in, or is held for consumption in, the entity's normal **operating cycle**; is held primarily for trading; is expected to be realised within twelve months; or is cash or a cash equivalent.",
            "A liability is **CURRENT** if it is expected to be settled in the normal operating cycle; is held primarily for trading; is due within twelve months; or the entity does **NOT have the RIGHT at the reporting date to defer settlement** for at least twelve months.",
            "The right to defer must **EXIST at the reporting date**. Refinancing completed after the reporting date does not make a liability non-current — and this is the point most often tested.",
            "Where a **covenant is breached** at or before the reporting date, making a loan repayable on demand, the whole loan is **CURRENT** — even if the lender agrees after the reporting date not to demand repayment.",
            "Deferred tax assets and liabilities are **always non-current**, whatever the expected timing of reversal.",
          ],
        },
      ],
      check: {
        q: "An entity breaches a loan covenant on 15 December, its year end being 31 December, making a $5m loan repayable on demand. On 20 January the lender agrees not to demand repayment. How is the loan classified at 31 December?",
        options: [
          "Current — the entity had no right at the reporting date to defer settlement",
          "Non-current — the lender's agreement is an adjusting event",
          "Split between current and non-current according to the original repayment schedule",
          "Non-current, with the breach disclosed in the notes",
        ],
        correct: 0,
        explain:
          "Classification depends on the entity's rights AT the reporting date. The breach had already occurred, so the entity had no right to defer settlement and the whole loan is current. The lender's later agreement is a non-adjusting event, disclosed but not reflected in the classification.",
      },
    },
    {
      id: "the-method",
      heading: "A routine for a preparation question",
      blocks: [
        {
          kind: "formula",
          name: "The order that saves time",
          expr: "1  READ every adjustment and mark which statement each touches.\n   Most touch BOTH — a depreciation adjustment changes cost of\n   sales AND the carrying amount of PPE.\n\n2  Set up SKELETON pro formas for both statements before doing any\n   arithmetic, so figures land straight into position.\n\n3  Work the adjustments in order, posting BOTH sides of each.\n   Use a working for anything with more than two lines:\n      cost of sales · depreciation · finance costs · tax\n\n4  Compute PROFIT, then take it to the statement of changes in\n   equity, then take closing retained earnings to the statement of\n   financial position.\n\n5  BALANCE the statement of financial position.\n   ·  if it balances, stop and move on\n   ·  if it does not, the difference is usually a one-sided entry:\n      halve it and look for that figure\n\nNever leave a requirement blank to keep hunting a small difference.\nA balanced statement earns no extra marks; an unattempted part\nearns none at all.",
          note: "Marks are for adjustments, not for the balance. But the balance is a free check on the adjustments, which is why it is worth two minutes and not twenty.",
        },
        {
          kind: "example",
          title: "A complete single-entity preparation",
          scenario:
            "The following trial balance was extracted for Kingfisher Co at 31 December 20X6.\n\n                                           Dr $         Cr $\n  Revenue                                            7,900,000\n  Cost of sales                          5,200,000\n  Operating expenses                     1,350,000\n  Finance costs paid                        90,000\n  Property, plant and equipment at cost  6,000,000\n  Accumulated depreciation                           1,800,000\n  Investments at fair value through P&L     400,000\n  Inventory at 31 December 20X6            720,000\n  Trade receivables                        940,000\n  Cash and cash equivalents                260,000\n  Trade payables                                       610,000\n  8% loan notes (issued 1 April 20X6)                1,800,000\n  Equity shares of $1 each                           2,000,000\n  Retained earnings at 1 January 20X6                  850,000\n                                        ──────────  ──────────\n                                        14,960,000  14,960,000\n\nAdjustments:\n(i)   Depreciation for the year is 10% of cost, charged to cost of sales.\n(ii)  Inventory includes items costing $60,000 whose net realisable value is $38,000.\n(iii) Loan note interest is payable half-yearly; only one payment has been made.\n(iv)  Operating expenses include $48,000 paid for insurance covering the year to 30 September 20X7 — treat as a prepayment of the full amount relating to 20X7 for simplicity.\n(v)   Income tax for the year is estimated at $160,000.\n(vi)  The investments' fair value at 31 December 20X6 equals their carrying amount.",
          steps: [
            { label: "(i) Depreciation", detail: "$6,000,000 × 10% = $600,000, added to cost of sales and to accumulated depreciation. PPE carrying amount becomes $6,000,000 − $1,800,000 − $600,000 = $3,600,000." },
            { label: "(ii) Inventory write-down", detail: "The item-by-item test gives a write-down of $60,000 − $38,000 = $22,000. Add it to cost of sales; inventory becomes $720,000 − $22,000 = $698,000." },
            { label: "Cost of sales working", detail: "$5,200,000 + $600,000 + $22,000 = $5,822,000. Gross profit = $7,900,000 − $5,822,000 = $2,078,000." },
            { label: "(iv) The prepayment", detail: "Remove $48,000 from operating expenses and recognise a prepayment: operating expenses become $1,350,000 − $48,000 = $1,302,000, and receivables and prepayments become $940,000 + $48,000 = $988,000. Operating profit = $2,078,000 − $1,302,000 = $776,000." },
            { label: "(iii) Finance costs working", detail: "The loan notes were issued on 1 April, so nine months' interest accrues: $1,800,000 × 8% × 9/12 = $108,000. Only $90,000 has been paid, so ACCRUE $18,000. Finance costs in profit or loss are $108,000, and current liabilities include an $18,000 accrual." },
            { label: "Complete the statement of profit or loss", detail: "Profit before tax = $776,000 − $108,000 = $668,000.\nIncome tax expense $160,000.\nPROFIT FOR THE YEAR = $508,000.\nThere is no other comprehensive income — the investments are at fair value through PROFIT OR LOSS, and their fair value has not changed." },
            { label: "Statement of changes in equity", detail: "Share capital $2,000,000 throughout.\nRetained earnings: $850,000 brought forward + $508,000 profit = $1,358,000. No dividends were paid.\nTotal equity $3,358,000." },
            { label: "Statement of financial position", detail: "NON-CURRENT ASSETS: PPE $3,600,000; investments $400,000 → $4,000,000.\nCURRENT ASSETS: inventory $698,000; receivables and prepayments $988,000; cash $260,000 → $1,946,000.\nTOTAL ASSETS $5,946,000.\n\nEQUITY: $3,358,000.\nNON-CURRENT LIABILITIES: 8% loan notes $1,800,000.\nCURRENT LIABILITIES: trade payables $610,000; accrued interest $18,000; current tax $160,000 → $788,000.\nTOTAL EQUITY AND LIABILITIES = $3,358,000 + $1,800,000 + $788,000 = $5,946,000." },
            { label: "Prove it", detail: "Total assets $5,946,000 = total equity and liabilities $5,946,000. It balances, so every adjustment has been posted on both sides. Note that the investments are non-current here because there is no indication they are held for trading — if the question said they were, they would be current." },
          ],
          result:
            "**Profit for the year $508,000; total assets and total equity and liabilities both $5,946,000.** The five workings — depreciation, inventory, prepayment, finance costs, tax — are where the marks are, and the balance is the free check that they were all posted twice.",
        },
      ],
      check: {
        q: "8% loan notes of $1,800,000 were issued on 1 April; the year end is 31 December and $90,000 of interest has been paid. What is the finance cost and the accrual?",
        options: [
          "Finance cost $108,000; accrual $18,000",
          "Finance cost $144,000; accrual $54,000",
          "Finance cost $90,000; no accrual",
          "Finance cost $108,000; accrual $108,000",
        ],
        correct: 0,
        explain:
          "Nine months' interest accrues from 1 April: $1,800,000 × 8% × 9/12 = $108,000. Since $90,000 has been paid, an $18,000 accrual is needed. Charging a full year's $144,000 ignores the issue date; charging only the cash paid ignores the accrual.",
      },
    },
  ],
  examTraps: [
    { trap: "Charging a full year's loan interest on notes issued part way through the year.", fix: "Pro-rate from the issue date, then accrue the difference between the charge and the cash paid." },
    { trap: "Classifying a liability as non-current because it was refinanced after the reporting date.", fix: "The right to defer must exist AT the reporting date." },
    { trap: "Leaving a breached-covenant loan as non-current.", fix: "It is repayable on demand, so wholly current — even if the lender later agrees to waive." },
    { trap: "Offsetting assets against liabilities to simplify a statement.", fix: "IAS 1 prohibits offsetting unless a Standard requires or permits it." },
    { trap: "Putting an FVTPL fair value movement in other comprehensive income.", fix: "It goes to profit or loss. Only FVTOCI movements go to OCI." },
    { trap: "Failing to split OCI into reclassifiable and non-reclassifiable items.", fix: "IAS 1 requires the split. Revaluation surpluses and equity-FVTOCI gains are never reclassified; debt-FVTOCI gains are." },
    { trap: "Spending the last ten minutes hunting a small imbalance.", fix: "Marks come from adjustments. Move to the next requirement and return if there is time." },
  ],
  keyTerms: [
    { term: "Fair presentation", def: "Presenting fairly the financial position, financial performance and cash flows; presumed to be achieved by compliance with IFRS, with an explicit and unreserved statement of compliance required." },
    { term: "Other comprehensive income", def: "Items of income and expense not recognised in profit or loss, presented split between those that will and those that will not be reclassified to profit or loss." },
    { term: "Operating cycle", def: "The time between acquiring assets for processing and realising them in cash or cash equivalents; where it is not clearly identifiable, it is assumed to be twelve months." },
    { term: "Right to defer settlement", def: "The condition, assessed at the reporting date, that determines whether a liability is non-current. Refinancing after the reporting date does not create it." },
    { term: "Statement of changes in equity", def: "The statement reconciling each component of equity from its opening to its closing balance, showing profit, other comprehensive income, transactions with owners and any restatements." },
  ],
  summary: [
    "A complete set is: statement of financial position, statement of profit or loss and OCI, statement of changes in equity, statement of cash flows, notes, and comparatives.",
    "IAS 1's general features: fair presentation, going concern, accrual basis, materiality and aggregation, no offsetting, at least annual reporting with comparatives, and consistency of presentation.",
    "OCI is split between items that will and will not be reclassified. Revaluation surpluses and equity-FVTOCI gains never are; debt-FVTOCI gains are.",
    "A liability is non-current only where the RIGHT to defer settlement exists at the reporting date. A breached covenant makes the whole loan current.",
    "Deferred tax is always non-current.",
    "Method: read the adjustments, draw the pro formas, post both sides of everything, use workings for cost of sales, depreciation, finance costs and tax, then balance.",
    "The balance check is free verification of the adjustments — but marks come from the adjustments, so never leave a requirement unattempted to chase it.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five components of a complete set of financial statements.", a: "Statement of financial position; statement of profit or loss and other comprehensive income; statement of changes in equity; statement of cash flows; and notes including material accounting policy information." },
    { q: "Which OCI items are never reclassified to profit or loss?", a: "Revaluation surpluses on PPE and intangibles, gains on equity investments designated at FVTOCI, and remeasurements of defined benefit plans." },
    { q: "When is a liability non-current?", a: "When the entity has the right at the reporting date to defer settlement for at least twelve months after that date." },
    { q: "Does refinancing after the reporting date make a current liability non-current?", a: "No. The right to defer must exist at the reporting date." },
    { q: "How should loan interest be charged where the loan was issued during the year?", a: "Pro-rate the charge from the issue date, and accrue the excess of the charge over the interest actually paid." },
  ],
  furtherStudy: [
    "Chapter 25 — the statement of cash flows, the one statement this chapter's example did not prepare",
    "Chapter 30 — the ratios computed from the statements this chapter prepares",
    "Chapter 23 — the restatement lines that appear in the statement of changes in equity",
  ],
}

export const FR_TREE_25: StudyChapter = {
  id: "FR-25",
  number: 25,
  paper: "FR",
  area: "D",
  title: "IAS 7: statements of cash flows",
  minutes: 20,
  syllabusRefs: ["D1(d)", "D1(e)", "D1(f)"],
  intro:
    "Learn the five workings, not the layout. Every figure is either a reconciling adjustment or the missing number in a T-account.",
  outcomes: [
    "Classify cash flows between operating, investing and financing activities",
    "Prepare the operating section using the indirect method",
    "Compute cash paid for interest, tax and dividends from opening and closing balances",
    "Compute purchases and disposals of non-current assets from the movement in carrying amount",
    "Explain why a profitable entity can run out of cash",
  ],
  sections: [
    {
      id: "classification",
      heading: "The three sections",
      blocks: [
        {
          kind: "table",
          caption: "Classifying cash flows",
          head: ["Section", "Contains", "Watch for"],
          rows: [
            ["**OPERATING**", "Cash effects of transactions entering into the determination of profit or loss — receipts from customers, payments to suppliers and employees, tax paid", "**Tax paid is OPERATING**, even though it is not an operating cost in the usual sense"],
            ["**INVESTING**", "Acquisition and disposal of non-current assets and other investments — purchases and sales of PPE and intangibles, proceeds on disposal, interest and dividends **RECEIVED**", "The cash paid, not the cost of additions. And proceeds, not the gain on disposal"],
            ["**FINANCING**", "Changes in the size and composition of contributed equity and borrowings — share issues, loans raised and repaid, dividends **PAID**, and the **PRINCIPAL** element of lease payments", "The principal element of a lease payment only; the interest element follows the interest policy"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The classifications that are a policy choice — and the ones that are not",
          md: "**A CHOICE:** interest paid and interest and dividends received may be classified as operating OR as the section to which they relate — interest paid in financing, interest received in investing. The choice must be applied **consistently**.\n\n**NOT a choice:** **tax paid is OPERATING** unless it can be specifically identified with a financing or investing cash flow, and **dividends PAID** are usually financing.\n\nThe examinable trap: candidates classify tax paid as financing because tax feels like a payment to government rather than an operating cost. It is operating.",
        },
        {
          kind: "list",
          title: "Non-cash transactions are excluded entirely",
          items: [
            "**A bonus (scrip) issue** — no cash moves, so it appears nowhere in the statement.",
            "**A revaluation** — no cash.",
            "**A depreciation or amortisation charge** — no cash; it is a reconciling adjustment in the operating section.",
            "**Acquiring an asset under a lease** — the right-of-use asset and lease liability arise without cash. Only the subsequent PAYMENTS appear.",
            "**Converting loan notes into shares** — no cash. Disclose significant non-cash transactions in the notes.",
          ],
        },
      ],
      check: {
        q: "How is income tax paid classified in the statement of cash flows?",
        options: [
          "Operating, unless it can be specifically identified with a financing or investing cash flow",
          "Financing, since it is a payment to a party outside the business",
          "Investing, since it does not arise from trading",
          "It is a matter of accounting policy choice",
        ],
        correct: 0,
        explain:
          "IAS 7 requires tax cash flows to be classified as operating unless they can be specifically identified with financing or investing activities. Interest paid and interest and dividends received are the items where a policy choice exists.",
      },
    },
    {
      id: "the-workings",
      heading: "The five workings",
      blocks: [
        {
          kind: "formula",
          name: "Every figure in a cash flow statement comes from one of these",
          expr: "1  THE OPERATING RECONCILIATION\n      profit before tax\n      + depreciation, amortisation, impairment\n      + loss on disposal    − gain on disposal\n      + finance costs        − investment income\n      ± movements in inventory, receivables and payables\n         (increase in an ASSET is an OUTFLOW;\n          increase in a LIABILITY is an INFLOW)\n      = CASH GENERATED FROM OPERATIONS\n      − interest paid  − tax paid\n      = NET CASH FROM OPERATING ACTIVITIES\n\n2  CASH PAID  =  opening balance + charge for the year\n                 − closing balance\n      works for interest, tax and dividends alike\n\n3  NON-CURRENT ASSET ADDITIONS\n      closing carrying amount − opening carrying amount\n      + depreciation for the year\n      + carrying amount of disposals\n      = ADDITIONS  ( then check for any REVALUATION, which is\n                     non-cash and must be removed )\n\n4  PROCEEDS ON DISPOSAL  =  carrying amount disposed\n                            + gain, or − loss\n\n5  DIVIDENDS PAID  =  opening retained earnings\n                      + profit for the year\n                      − closing retained earnings",
          note: "Working 2 is the same arithmetic three times. Working 3 is the one candidates rush, and the revaluation check is what they omit — a revalued asset increases the carrying amount without any cash being spent.",
        },
        {
          kind: "example",
          title: "A full statement of cash flows",
          scenario:
            "Nightjar Co reports profit before tax of $940,000 for the year. Additional information:\n\n  Depreciation charge for the year                        $520,000\n  Loss on disposal of plant                                $35,000\n  Finance costs charged                                   $120,000\n  Investment income                                        $40,000\n  Increase in inventory                                    $85,000\n  Decrease in trade receivables                            $60,000\n  Increase in trade payables                               $45,000\n  PPE carrying amount: opening $4,200,000, closing $4,860,000\n  Interest payable: opening $25,000, closing $35,000\n  Current tax: opening $230,000, closing $255,000, charge for the year $280,000\n  Retained earnings: opening $1,500,000, closing $1,920,000\n  Proceeds from issuing shares                            $300,000\n  New bank loan raised                                    $500,000\n  Lease principal payments                                $180,000\n\nAll investment income was received in cash. There were no revaluations.",
          steps: [
            { label: "Working 1 — cash generated from operations", detail: "$940,000 profit before tax\n+ $520,000 depreciation\n+ $35,000 loss on disposal\n+ $120,000 finance costs\n− $40,000 investment income\n− $85,000 increase in inventory\n+ $60,000 decrease in receivables\n+ $45,000 increase in payables\n= $1,595,000.\n\nNote why finance costs are ADDED BACK and investment income DEDUCTED: both are removed from the operating section so they can be shown separately as cash flows, and both are non-operating in nature." },
            { label: "Working 2 — interest paid", detail: "$25,000 opening + $120,000 charge − $35,000 closing = $110,000. The accrual grew, so less cash was paid than was charged." },
            { label: "Working 2 — tax paid", detail: "$230,000 opening + $280,000 charge − $255,000 closing = $255,000." },
            { label: "Net cash from operating activities", detail: "$1,595,000 − $110,000 interest − $255,000 tax = $1,230,000." },
            { label: "Working 4 then 3 — the disposal and the additions", detail: "Proceeds are given as $110,000 and the loss is $35,000, so the carrying amount disposed was $110,000 + $35,000 = $145,000.\n\nAdditions = $4,860,000 closing − $4,200,000 opening + $520,000 depreciation + $145,000 disposals = $1,325,000. The logic: the carrying amount rose by $660,000 despite $665,000 leaving through depreciation and disposal, so $1,325,000 must have come in." },
            { label: "Investing activities", detail: "Purchase of PPE $(1,325,000); proceeds on disposal $110,000; investment income received $40,000 → NET $(1,175,000)." },
            { label: "Working 5 — dividends paid", detail: "Profit after tax = $940,000 − $280,000 = $660,000. Dividends = $1,500,000 opening + $660,000 − $1,920,000 closing = $240,000." },
            { label: "Financing activities", detail: "Share issue $300,000; new loan $500,000; lease principal $(180,000); dividends paid $(240,000) → NET $380,000. Note that only the PRINCIPAL element of the lease payment is here." },
            { label: "Assemble and check", detail: "Operating $1,230,000 + investing $(1,175,000) + financing $380,000 = a NET INCREASE IN CASH of $435,000. That figure must agree with the movement in cash and cash equivalents between the two statements of financial position — which is the statement's built-in proof." },
          ],
          result:
            "**Operating $1,230,000; investing $(1,175,000); financing $380,000; net increase $435,000.** Every one of those figures came from one of the five workings, and none of them required remembering a format.",
        },
      ],
      check: {
        q: "PPE carrying amount rose from $3.0m to $3.4m. Depreciation was $400,000 and assets with a carrying amount of $250,000 were disposed of. There were no revaluations. What were the additions?",
        options: ["$1,050,000", "$400,000", "$650,000", "$800,000"],
        correct: 0,
        explain:
          "Additions = closing $3,400,000 − opening $3,000,000 + depreciation $400,000 + disposals at carrying amount $250,000 = $1,050,000. The carrying amount rose by $400,000 despite $650,000 leaving, so $1,050,000 came in.",
      },
    },
    {
      id: "interpretation",
      heading: "Why the statement of cash flows matters",
      blocks: [
        {
          kind: "list",
          title: "What it tells a user that profit does not",
          items: [
            "**Cash generated from operations against profit.** A large and persistent gap means profit is not converting into cash — usually because receivables or inventory are growing faster than revenue, which is the classic overtrading pattern.",
            "**Whether investment is funded from operations or from borrowing.** An entity whose investing outflow persistently exceeds its operating inflow is funding growth from debt or from share issues, which cannot continue indefinitely.",
            "**Whether dividends are covered by operating cash flow.** Paying dividends out of new borrowings is a warning sign that no ratio computed from profit will show.",
            "**It is much harder to manipulate than profit.** Cash is either in the bank or it is not. Judgements about revenue recognition, capitalisation and provisions all move profit; none of them moves cash.",
            "But note the limitations: it reports the past, it says nothing about commitments, and it can be flattered at a single reporting date by delaying payments — the window dressing point from chapter 5.",
          ],
        },
        {
          kind: "illustration",
          title: "Profitable and insolvent at the same time",
          md: "An entity grows revenue 60% in a year and reports profit of $800,000, up from $500,000. It also runs out of cash and breaches its overdraft limit.\n\nThe statement of cash flows shows why. Receivables rose $900,000 and inventory $600,000 to support the growth, so $1,500,000 of the profit is tied up in working capital that has not yet turned into cash. Payables rose only $200,000. Cash generated from operations is therefore negative despite record profit.\n\nThis is **OVERTRADING**, and it is the single most useful thing a statement of cash flows reveals. Every profitability ratio looks excellent; every liquidity measure is deteriorating; and only the cash flow statement connects the two. Any interpretation requirement that gives you rapid revenue growth alongside falling cash is asking for this analysis."
        },
        {
          kind: "activity",
          title: "Read the pattern",
          prompt:
            "Three entities, each reporting a profit of $1m:\n\nA: operating cash flow $1.3m; investing $(0.4m); financing $(0.5m).\nB: operating cash flow $0.1m; investing $(1.8m); financing $+1.9m.\nC: operating cash flow $(0.3m); investing $+0.9m; financing $(0.4m).\n\nWhat is each doing, and which would concern you most?",
          answer:
            "A is a MATURE, HEALTHY entity. Operations generate more cash than profit — good working capital control — and it funds modest investment and returns cash to providers of finance. Nothing to concern.\n\nB is INVESTING HEAVILY AND FUNDING IT EXTERNALLY. Operating cash of $0.1m against $1m of profit is a red flag on its own: working capital is absorbing almost the whole profit. And the $1.8m investment is funded entirely by the $1.9m raised. This may be a legitimate growth strategy, but it is not self-sustaining, and if the investment does not begin generating operating cash the entity will need to keep raising finance.\n\nC is the most concerning. Operations are CONSUMING cash despite a reported profit of $1m, and the entity is funding itself by SELLING non-current assets — the $0.9m investing INFLOW. Selling productive capacity to cover an operating cash deficit reduces the entity's ability to generate future cash. That is the pattern of a business in trouble, and reported profit conceals it entirely.\n\nThe general lesson: read the SIGN of each section and ask what is funding what. Three identical profits, three completely different businesses.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Classifying tax paid as financing.", fix: "It is operating unless specifically identifiable with a financing or investing flow." },
    { trap: "Using the depreciation charge as the investing outflow.", fix: "The investing outflow is the cash paid for ADDITIONS, computed from the movement in carrying amount." },
    { trap: "Using the gain or loss on disposal as the proceeds.", fix: "Proceeds = carrying amount disposed plus the gain, or minus the loss." },
    { trap: "Omitting a revaluation when computing additions.", fix: "A revaluation increases carrying amount with no cash. Remove it before deriving additions." },
    { trap: "Adding an increase in receivables to operating cash flow.", fix: "An increase in an ASSET is an OUTFLOW. Only an increase in a LIABILITY is an inflow." },
    { trap: "Including a bonus issue or a loan-to-equity conversion.", fix: "No cash moves, so they appear nowhere. Disclose significant non-cash transactions in the notes." },
    { trap: "Putting the whole lease payment in financing.", fix: "Only the PRINCIPAL element. The interest element follows the entity's interest classification policy." },
    { trap: "Charging the tax expense as tax paid.", fix: "Use opening balance + charge − closing balance." },
  ],
  keyTerms: [
    { term: "Operating activities", def: "The principal revenue-producing activities of the entity and other activities that are not investing or financing; includes tax paid." },
    { term: "Investing activities", def: "The acquisition and disposal of long-term assets and other investments not included in cash equivalents." },
    { term: "Financing activities", def: "Activities that change the size and composition of the entity's contributed equity and borrowings, including the principal element of lease payments." },
    { term: "Cash equivalents", def: "Short-term, highly liquid investments readily convertible to known amounts of cash and subject to insignificant risk of changes in value." },
    { term: "Indirect method", def: "Deriving net cash from operating activities by adjusting profit before tax for non-cash items, items classified elsewhere, and movements in working capital." },
    { term: "Overtrading", def: "Growing revenue faster than the entity can finance the associated working capital, so that profit rises while operating cash flow falls." },
  ],
  summary: [
    "Three sections: operating (including TAX PAID), investing (including interest and dividends RECEIVED), financing (including dividends PAID and lease PRINCIPAL).",
    "Interest paid and interest and dividends received may be classified by policy; tax paid may not.",
    "The indirect method starts at profit before tax and adds back non-cash items, removes items shown elsewhere, and adjusts for working capital movements.",
    "An increase in an ASSET is an outflow; an increase in a LIABILITY is an inflow.",
    "Cash paid = opening balance + charge − closing balance, for interest, tax and dividends alike.",
    "Additions = closing carrying amount − opening + depreciation + disposals at carrying amount, less any revaluation.",
    "Proceeds on disposal = carrying amount disposed + gain, or − loss.",
    "Non-cash transactions — bonus issues, revaluations, lease inception, debt-to-equity conversions — appear nowhere, but are disclosed.",
  ],
  knowledgeDiagnostic: [
    { q: "In which section does tax paid appear?", a: "Operating, unless it can be specifically identified with a financing or investing cash flow." },
    { q: "How is interest paid classified?", a: "By policy — operating, or financing as the section to which it relates — applied consistently." },
    { q: "How is cash paid for tax computed?", a: "Opening liability + charge for the year − closing liability." },
    { q: "How are additions to PPE derived?", a: "Closing carrying amount − opening carrying amount + depreciation + carrying amount of disposals, less any revaluation." },
    { q: "How are proceeds on disposal derived?", a: "Carrying amount disposed of plus the gain, or minus the loss." },
    { q: "Why can a profitable entity run out of cash?", a: "Because growth absorbs cash into receivables and inventory faster than profit generates it — overtrading, which only the cash flow statement reveals." },
  ],
  furtherStudy: [
    "Chapter 24 — the two statements from which every cash flow working is derived",
    "Chapter 31 — using the statement of cash flows in an interpretation answer",
    "Chapter 13 — where a lease payment splits between the financing and interest sections",
  ],
}
