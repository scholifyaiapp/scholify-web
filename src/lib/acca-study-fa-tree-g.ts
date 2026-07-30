import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area G — preparing financial statements.
 * Chapters 24–27 of the FA reading tree: the two main statements, disclosure notes
 * and events after the reporting period, the statement of cash flows, and
 * incomplete records.
 *
 * This is one of the two areas the real exam's 15-mark multi-task questions are
 * drawn from — the FA blueprint names consolidations and accounts preparation,
 * including a statement of cash flows. So these chapters are built to be worked
 * rather than read: each carries the pro forma the marker expects and a full worked
 * preparation, and each ends with the check that catches the error — the statement
 * of financial position balances, the cash flow statement reconciles to the
 * movement in cash, the reconstructed figure proves back through its own account.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 24 · G1, G2 ───────────────────────────────────────── */

export const FA_TREE_24: StudyChapter = {
  id: "FA-24",
  number: 24,
  paper: "FA",
  area: "G",
  title: "Preparing the profit or loss and financial position statements",
  minutes: 20,
  syllabusRefs: ["G1(a)", "G1(b)", "G2(a)", "G2(b)", "G2(d)", "G2(e)"],
  intro:
    "Everything in the paper so far arrives here. A trial balance, a list of adjustments, and one non-negotiable test at the end: the statement of financial position balances, or something is wrong.",
  outcomes: [
    "Explain what the accounting equation, the standards and the business entity concept each contribute to the position statement",
    "Prepare a statement of financial position, or extracts from one",
    "Build every subtotal from revenue down to total comprehensive income",
    "Prepare the performance statement, or an extract from it, in the format the marker expects",
    "Identify items requiring separate disclosure and explain the interrelationship between the two statements",
  ],
  sections: [
    {
      id: "the-sopl",
      heading: "The statement of profit or loss and other comprehensive income",
      blocks: [
        {
          kind: "table",
          caption: "The structure, and how each subtotal is reached",
          head: ["Line", "Made up of"],
          rows: [
            ["Revenue", "Sales, net of returns and of sales tax"],
            ["Cost of sales", "Opening inventory + purchases (net of returns) + carriage inwards − closing inventory"],
            ["**Gross profit**", "Revenue − cost of sales"],
            ["Distribution costs", "Selling, marketing, carriage outwards, delivery vehicle costs"],
            ["Administrative expenses", "Office costs, salaries, depreciation, irrecoverable debts, allowance movements"],
            ["Other income", "Rent receivable, discounts received, gains on disposal"],
            ["**Operating profit**", "Gross profit − operating expenses + other income"],
            ["Finance costs", "Loan interest, overdraft interest, dividends on redeemable preference shares"],
            ["**Profit before tax**", "Operating profit − finance costs"],
            ["Income tax expense", "This year's estimate ± prior-year under or over-provision"],
            ["**Profit for the year**", "Profit before tax − income tax expense"],
            ["Other comprehensive income", "Revaluation surplus arising in the year"],
            ["**Total comprehensive income**", "Profit for the year + other comprehensive income"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Operating profit is a required subtotal",
          md: "Under IFRS 18, which governs presentation for this syllabus, **operating profit** must be presented as a subtotal — so finance costs and the tax charge sit below it and never inside operating expenses. Two consequences the exam relies on: loan interest is **never** an administrative expense, and the tax charge is **never** deducted before profit before tax.",
        },
        {
          kind: "list",
          title: "What has to be shown on its own line",
          items: [
            "**Revenue** and **finance costs**, each on their own line.",
            "The **income tax expense**.",
            "Material items whose size or nature makes separate presentation relevant — a large **gain or loss on disposal**, a significant **inventory write-down**, or a substantial **irrecoverable debt**.",
            "**Other comprehensive income**, separated from profit for the year.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Three items that never appear in profit or loss",
          md: "**Drawings and dividends** — distributions to owners, shown in the statement of changes in equity.\n\n**Capital introduced or a share issue** — contributions from owners, likewise.\n\n**A revaluation gain** — other comprehensive income, not profit.\n\nEach of these arrives in a question dressed as something that looks like income or expense, and each belongs somewhere else.",
        },
      ],
      check: {
        q: "Which of the following is presented BELOW operating profit?",
        options: [
          "Carriage outwards",
          "Interest on a bank loan",
          "Depreciation of office equipment",
          "An increase in the allowance for receivables",
        ],
        correct: 1,
        explain:
          "LOAN INTEREST is a finance cost, presented below operating profit. Carriage outwards is a distribution cost, and both depreciation and the allowance movement are operating expenses — all three sit above operating profit. Putting interest inside administrative expenses understates finance costs and misstates the required subtotal.",
      },
    },
    {
      id: "the-sofp",
      heading: "The statement of financial position",
      blocks: [
        {
          kind: "table",
          caption: "The pro forma, in the order the marker expects",
          head: ["Section", "Contents"],
          rows: [
            ["**Non-current assets**", "Property, plant and equipment at carrying amount; intangibles at carrying amount; long-term investments"],
            ["**Current assets**", "Inventory; trade receivables net of the allowance; prepayments and accrued income; cash and cash equivalents"],
            ["**Total assets**", "The sum of the two"],
            ["**Equity**", "Share capital; share premium; revaluation surplus; retained earnings"],
            ["**Non-current liabilities**", "Loans repayable after twelve months; long-term provisions; non-current deferred income"],
            ["**Current liabilities**", "Trade payables; accruals; deferred income; sales tax payable; income tax payable; bank overdraft; the portion of loans due within twelve months"],
            ["**Total equity and liabilities**", "Must equal total assets"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three foundations named in the syllabus",
          md: "**The accounting equation** is why the statement balances: assets equal equity plus liabilities by construction, not by luck.\n\n**IFRS Accounting Standards** decide what is recognised and at what amount — which is why inventory is at the lower of cost and NRV and non-current assets are at carrying amount.\n\n**The business entity concept** is why the owner's private assets and liabilities are absent, and why drawings reduce equity rather than profit.",
        },
        {
          kind: "example",
          title: "A full preparation from a trial balance and five adjustments",
          scenario:
            "Marchwood Co's trial balance at 31 December shows: revenue $840,000; purchases $496,000; opening inventory $62,000; distribution costs $91,000; administrative expenses $128,000; land and buildings at cost $700,000; accumulated depreciation on buildings $96,000; trade receivables $124,000; allowance for receivables $3,600; bank $18,400 debit; trade payables $71,000; 6% loan notes $200,000 (issued three years ago, repayable in 20Y2); share capital $250,000; share premium $80,000; retained earnings $78,800. Adjustments: (1) closing inventory is $71,000; (2) buildings, which cost $400,000 of the $700,000, are depreciated at 2% a year on cost; (3) the loan note interest for the year has not been paid or recorded; (4) a receivable of $4,000 is to be written off and the allowance adjusted to 4% of the remainder; (5) the income tax charge for the year is estimated at $27,000.",
          steps: [
            { label: "Total the trial balance first", detail: "Debits $1,619,400 and credits $1,619,400. Confirming the agreement before adjusting anything means any later imbalance must have been introduced by your own workings." },
            { label: "Cost of sales", detail: "Opening inventory $62,000 + purchases $496,000 − closing inventory $71,000 = $487,000. Gross profit = $840,000 − $487,000 = $353,000." },
            { label: "Depreciation", detail: "Only the buildings depreciate; land does not. $400,000 × 2% = $8,000, charged to administrative expenses, taking accumulated depreciation to $104,000." },
            { label: "Receivables and the allowance", detail: "Write off $4,000: receivables become $120,000. Required allowance = $120,000 × 4% = $4,800, against an existing $3,600, so a $1,200 increase. Charge to administrative expenses = $4,000 + $1,200 = $5,200." },
            { label: "Operating profit", detail: "Administrative expenses = $128,000 + $8,000 + $5,200 = $141,200. Operating profit = $353,000 − $91,000 distribution − $141,200 = $120,800." },
            { label: "Finance costs, tax and profit", detail: "Interest = $200,000 × 6% = $12,000, unpaid so accrued. Profit before tax = $120,800 − $12,000 = $108,800. Less tax $27,000 = profit for the year $81,800." },
            { label: "Assemble the assets", detail: "Non-current assets $700,000 − $104,000 = $596,000. Current assets: inventory $71,000 + net receivables ($120,000 − $4,800) $115,200 + bank $18,400 = $204,600. Total assets $800,600." },
            { label: "Assemble equity and liabilities", detail: "Equity: share capital $250,000 + premium $80,000 + retained earnings ($78,800 + $81,800) $160,600 = $490,600. Non-current: loan notes $200,000, repayable in 20Y2. Current: payables $71,000 + interest accrual $12,000 + tax payable $27,000 = $110,000." },
            { label: "Prove it", detail: "$490,600 + $200,000 + $110,000 = $800,600, equal to total assets. The statement balances." },
          ],
          result:
            "Profit for the year of $81,800, total assets of $800,600 and a statement that balances. The discipline to internalise is in the first and last steps: **total the trial balance before you start**, so that any imbalance at the end is your own, and then check that every one of the five adjustments reached BOTH statements. An adjustment recorded in profit but not in the position statement — most often an accrual, an allowance or depreciation — is what produces a residual here.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Every adjustment lands twice",
          md: "Closing inventory reduces cost of sales **and** appears as a current asset. Depreciation is an expense **and** increases accumulated depreciation. An accrual is an expense **and** a current liability. An allowance increase is an expense **and** reduces net receivables. Working down the adjustments and asking \"where is the other half of this?\" is the single most effective discipline in a preparation question.",
        },
      ],
      check: {
        q: "A company's loan of $300,000 is repayable in five equal annual instalments beginning nine months after the year end. How is it presented?",
        options: [
          "$300,000 in non-current liabilities",
          "$60,000 in current liabilities and $240,000 in non-current liabilities",
          "$300,000 in current liabilities",
          "$60,000 in current liabilities and $240,000 in equity",
        ],
        correct: 1,
        explain:
          "Split it. The instalment falling due within twelve months — $300,000 ÷ 5 = $60,000 — is a CURRENT liability, and the remaining $240,000 is non-current. Presenting the whole loan as non-current understates current liabilities and flatters every liquidity ratio computed from the statement.",
      },
    },
    {
      id: "interrelationship",
      heading: "How the two statements lock together",
      blocks: [
        {
          kind: "formula",
          name: "The link",
          expr: "Closing retained earnings = Opening retained earnings + Profit for the year − Dividends",
          note: "And closing net assets per the statement of financial position must equal closing total equity — which is the accounting equation restated.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "One year, two statements",
            caption: "Performance for the period feeds the position at the end of it.",
            data: {
              steps: [
                { label: "Opening position", sub: "Net assets = opening equity" },
                { label: "Profit for the year", sub: "From the statement of profit or loss" },
                { label: "Other comprehensive income", sub: "Revaluation surplus" },
                { label: "Owner transactions", sub: "Share issues, dividends, drawings" },
                { label: "Closing position", sub: "Net assets = closing equity" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this is the fastest self-check in the paper",
          md: "If the statement of financial position does not balance, the error is almost always one of three things: an adjustment posted to one statement only; a balance placed on the wrong side; or profit for the year not carried into retained earnings. Checking those three in that order finds most differences in under a minute — and a difference of exactly **twice** a familiar figure means a wrong-side entry.",
        },
      ],
      check: {
        q: "Opening retained earnings were $180,000, profit for the year $92,000, dividends paid $30,000, and a property was revalued upwards by $50,000. What are closing retained earnings?",
        options: ["$242,000", "$292,000", "$262,000", "$212,000"],
        correct: 0,
        explain:
          "$180,000 + $92,000 − $30,000 = $242,000. The $50,000 revaluation goes to the REVALUATION SURPLUS, not to retained earnings — it is other comprehensive income. Including it gives $292,000 and overstates distributable reserves by an unrealised gain.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Presenting finance costs or the tax charge within operating expenses.",
      fix: "Operating profit is a required subtotal. Finance costs and tax sit below it, each on its own line.",
    },
    {
      trap: "Depreciating land.",
      fix: "Land has no limited useful life. Where the question gives a combined land and buildings figure, depreciate only the buildings element.",
    },
    {
      trap: "Posting an adjustment to one statement only.",
      fix: "Every adjustment lands twice. Ask where the other half is — an accrual is an expense AND a liability.",
    },
    {
      trap: "Reporting the whole of a loan repayable by instalments as non-current.",
      fix: "Split out the amount due within twelve months as a current liability.",
    },
    {
      trap: "Adding a revaluation gain to retained earnings.",
      fix: "It goes to the revaluation surplus through other comprehensive income, and is not distributable.",
    },
    {
      trap: "Forcing the statement of financial position to balance with a plug.",
      fix: "Re-total the trial balance, then check each adjustment reached both statements. A difference of exactly double a figure is a wrong-side entry.",
    },
  ],
  keyTerms: [
    { term: "Gross profit", def: "Revenue less cost of sales." },
    { term: "Operating profit", def: "Gross profit less operating expenses plus other income; a required presentation subtotal, above finance costs and tax." },
    { term: "Profit before tax", def: "Operating profit less finance costs." },
    { term: "Total comprehensive income", def: "Profit for the year plus other comprehensive income, such as a revaluation surplus arising in the period." },
    { term: "Carrying amount", def: "Cost, or revalued amount, less accumulated depreciation or amortisation — the figure at which a non-current asset is presented." },
  ],
  summary: [
    "Cost of sales is opening inventory plus purchases and carriage inwards, less closing inventory.",
    "Operating profit is a required subtotal, so finance costs and tax always sit below it.",
    "Drawings, dividends, capital introduced and revaluation gains never appear in profit or loss.",
    "The statement of financial position splits assets and liabilities into current and non-current, with loans split across both.",
    "Every adjustment lands in both statements, and the other half is what candidates most often miss.",
    "Closing retained earnings are opening retained earnings plus profit less dividends; revaluation gains go elsewhere.",
    "The statement must balance, and a difference of twice a familiar figure signals a wrong-side entry.",
  ],
  knowledgeDiagnostic: [
    { q: "How is cost of sales built up?", a: "Opening inventory plus purchases net of returns plus carriage inwards, less closing inventory." },
    { q: "Where do finance costs and the income tax expense appear?", a: "Both below operating profit — finance costs to reach profit before tax, then the tax charge to reach profit for the year." },
    { q: "Why must every adjustment be posted twice?", a: "Because each has an effect on performance and on position: an accrual is an expense and a liability, closing inventory reduces cost of sales and is an asset." },
    { q: "How is a loan repayable by annual instalments presented?", a: "The instalment due within twelve months in current liabilities, the remainder in non-current liabilities." },
    { q: "What are the three most likely causes when the statement will not balance?", a: "An adjustment posted to one statement only, a balance on the wrong side, or profit for the year not carried into retained earnings." },
  ],
  furtherStudy: [
    "Chapter 25 adds the disclosure notes and events after the reporting period.",
    "Chapter 26 explains where the cash went, which profit alone does not show.",
    "Chapters 28–29 prepare the same statements for a group.",
  ],
}

/* ── Chapter 25 · G3, G4 ───────────────────────────────────────── */

export const FA_TREE_25: StudyChapter = {
  id: "FA-25",
  number: 25,
  paper: "FA",
  area: "G",
  title: "Disclosure notes and events after the reporting period",
  minutes: 15,
  syllabusRefs: ["G3(a)", "G3(b)", "G4(a)", "G4(b)", "G4(c)"],
  intro:
    "The face of the statements carries the totals; the notes carry the meaning. And one class of note is about the future arriving early — things that happened after the year end but change what the year end looked like.",
  outcomes: [
    "Explain the purpose of notes to the financial statements",
    "Draft the disclosure notes for non-current assets, provisions, inventories and events after the reporting period",
    "Define an event after the reporting period",
    "Classify events as adjusting or non-adjusting",
    "Distinguish how adjusting and non-adjusting events are reported",
  ],
  sections: [
    {
      id: "notes",
      heading: "Why the notes exist, and the four the syllabus names",
      blocks: [
        {
          kind: "list",
          title: "What the notes do",
          items: [
            "State the **basis of preparation** and the **accounting policies** chosen, so a user knows how the figures were arrived at.",
            "**Disaggregate** a single line on the face into its components — the movement in non-current assets during the year, for instance.",
            "Give information that cannot sensibly go on the face: **contingencies**, **commitments**, and **events after the reporting period**.",
            "Support **comparability**: policy disclosure is what lets a user adjust for a difference between two entities.",
          ],
        },
        {
          kind: "table",
          caption: "The non-current assets note — the movement the exam asks for",
          head: ["", "Land and buildings", "Plant and equipment"],
          rows: [
            ["**Cost or valuation** at the start of the year", "X", "X"],
            ["Additions", "X", "X"],
            ["Revaluation", "X", "—"],
            ["Disposals", "(X)", "(X)"],
            ["Cost or valuation at the end of the year", "**X**", "**X**"],
            ["**Accumulated depreciation** at the start", "X", "X"],
            ["Charge for the year", "X", "X"],
            ["Eliminated on revaluation", "(X)", "—"],
            ["Eliminated on disposals", "(X)", "(X)"],
            ["Accumulated depreciation at the end", "**X**", "**X**"],
            ["**Carrying amount** at the end of the year", "**X**", "**X**"],
            ["Carrying amount at the start of the year", "X", "X"],
          ],
        },
        {
          kind: "table",
          caption: "The other three notes named in the syllabus",
          head: ["Note", "Discloses"],
          rows: [
            ["**Provisions**", "Opening balance, amounts provided in the year, amounts used or released, closing balance — plus the nature of the obligation, the expected timing and the uncertainties"],
            ["**Inventories**", "The carrying amount by category, the measurement basis and cost formula used, and the amount of any write-down recognised in the period"],
            ["**Events after the reporting period**", "For a material non-adjusting event, the nature of the event and an estimate of its financial effect, or a statement that no estimate can be made"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A note cannot fix a wrong figure",
          md: "Disclosure supplements the statements; it does not substitute for correct recognition or measurement. If an item should be recognised, disclosing it instead is a misstatement — which is exactly why a **probable** obligation is provided for while a merely **possible** one is disclosed, and never the other way round.",
        },
      ],
      check: {
        q: "Which of the following belongs in the non-current assets note rather than on the face of the statement of financial position?",
        options: [
          "The total carrying amount of property, plant and equipment",
          "The reconciliation of opening to closing cost and accumulated depreciation",
          "The total of current assets",
          "Total equity",
        ],
        correct: 1,
        explain:
          "The RECONCILIATION of opening to closing cost and accumulated depreciation — additions, revaluations, disposals and the charge for the year — is note detail. The face of the statement carries only the total carrying amount. This is the note built directly from the non-current asset register.",
      },
    },
    {
      id: "events",
      heading: "Events after the reporting period",
      blocks: [
        {
          kind: "definition",
          term: "Event after the reporting period",
          md: "An event occurring **between the reporting date and the date the financial statements are authorised for issue**. That window matters: an event after authorisation is not within scope at all.",
        },
        {
          kind: "definition",
          term: "Adjusting and non-adjusting events",
          md: "An **adjusting** event provides **evidence of a condition that already existed at the reporting date** — so the figures at that date are changed. A **non-adjusting** event reflects a condition that **arose after** the reporting date — so the figures stand, and a material event is disclosed.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The question that classifies every event",
          md: "**Did the condition exist at the year end?** If the event merely tells you more about something that was already true on that date, it is **adjusting** — the year-end figures were an estimate and now you know better. If the condition came into being afterwards, it is **non-adjusting**, because the statements must report the position **as at** the reporting date, not as at today.",
        },
        {
          kind: "table",
          caption: "Worked classifications",
          head: ["Event after the year end", "Classification", "Why"],
          rows: [
            ["A customer who owed $40,000 at the year end goes into liquidation", "**Adjusting**", "The customer's financial state existed at the year end; the liquidation confirms the debt was already impaired"],
            ["Inventory held at the year end is sold below cost", "**Adjusting**", "Evidence of the net realisable value at the reporting date"],
            ["The court settles a claim outstanding at the year end", "**Adjusting**", "Confirms the amount of an obligation that already existed"],
            ["An error or fraud affecting the year is discovered", "**Adjusting**", "The misstatement existed at the reporting date"],
            ["A fire destroys a warehouse after the year end", "**Non-adjusting**", "The asset existed and was intact at the reporting date"],
            ["A share issue after the year end", "**Non-adjusting**", "The capital structure at the reporting date was what it was"],
            ["A dividend declared after the year end", "**Non-adjusting**", "No obligation existed at the reporting date, so no liability is recognised"],
            ["A major acquisition after the year end", "**Non-adjusting**", "A new condition, disclosed because it affects users' understanding"],
            ["Management decides after the year end to cease trading", "**Adjusting**", "Going concern is the exception: the statements must be reprepared on a different basis"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The going concern exception",
          md: "Where events after the reporting date show the entity is **no longer a going concern**, the statements are **not** prepared on a going concern basis — however clearly the condition arose after the year end. This overrides the ordinary adjusting/non-adjusting analysis, because the whole basis of measurement, not one figure, is affected.",
        },
        {
          kind: "example",
          title: "Four events, four different answers",
          scenario:
            "Ardleigh Co's year end is 31 December and its statements are authorised for issue on 20 March. (1) On 14 January a customer owing $52,000 at 31 December went into liquidation; the liquidator expects to pay 10 cents in the dollar. (2) On 2 February a flood destroyed inventory that had cost $86,000 and was held at 31 December. (3) On 25 February the directors declared a final dividend of $60,000 for the year just ended. (4) On 28 March a fire destroyed the head office, uninsured.",
          steps: [
            { label: "1 · The liquidation", detail: "ADJUSTING. The customer's condition existed at 31 December. Write the receivable down to the recoverable $5,200 — an irrecoverable debts charge of $46,800 in the year just ended." },
            { label: "2 · The flood", detail: "NON-ADJUSTING. The inventory existed and was undamaged at 31 December, so the year-end figure of $86,000 stands. Disclose the nature of the event and its financial effect, because it is material." },
            { label: "3 · The dividend declared", detail: "NON-ADJUSTING, and specifically NOT a liability at 31 December — there was no obligation on that date. Disclose it; do not accrue it or deduct it from the year's retained earnings." },
            { label: "4 · The fire on 28 March", detail: "OUTSIDE the window entirely. The statements were authorised for issue on 20 March, so this is not an event after the reporting period for these statements at all." },
            { label: "Total the effect on the year", detail: "Only event 1 changes the figures: profit falls by $46,800 and net assets fall by $46,800. Events 2 and 3 are disclosures; event 4 is neither." },
          ],
          result:
            "One adjustment of $46,800, two disclosures and one event outside scope. Two checks matter. First, the **authorisation date** bounds the whole exercise — an event after it is out of scope, and the exam gives that date deliberately. Second, a dividend declared after the reporting date is **never** a liability at that date, however certain it now looks.",
        },
      ],
      check: {
        q: "After the year end but before authorisation, a company sells inventory held at the reporting date for less than its cost. How is this treated?",
        options: [
          "Non-adjusting — disclose the sale",
          "Adjusting — write the year-end inventory down to net realisable value",
          "Neither adjusting nor disclosable",
          "Adjusting only if the loss exceeds 10% of profit",
        ],
        correct: 1,
        explain:
          "ADJUSTING. The sale is evidence of the inventory's net realisable value AT the reporting date, and the condition — that the goods were worth less than cost — already existed then. Write the year-end figure down. Materiality affects whether an item is disclosed separately, not whether the adjustment is required.",
      },
    },
    {
      id: "drafting-the-notes",
      heading: "Drafting the four notes the syllabus names",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks you to **draft** these notes, not merely describe them. Each has a standard shape, and the marks are for producing that shape with the right figures in it.",
        },
        {
          kind: "example",
          title: "Building the non-current assets note from the year's movements",
          scenario:
            "Ellingham Co's plant and equipment cost $840,000 at 1 January with accumulated depreciation of $312,000. During the year it bought plant for $190,000 and disposed of plant that had cost $95,000 and carried accumulated depreciation of $61,000 at the date of disposal. The depreciation charge for the year, including on the disposed asset up to its disposal, was $128,000.",
          steps: [
            { label: "The cost section", detail: "Opening $840,000 + additions $190,000 − disposals $95,000 = closing cost $935,000." },
            { label: "The depreciation section", detail: "Opening $312,000 + charge for the year $128,000 − eliminated on disposal $61,000 = closing accumulated depreciation $379,000." },
            { label: "The carrying amounts", detail: "Closing $935,000 − $379,000 = $556,000. Opening $840,000 − $312,000 = $528,000, shown as the comparative." },
            { label: "Cross-check the disposal", detail: "The asset's carrying amount at disposal was $95,000 − $61,000 = $34,000, which is the figure compared with proceeds to give the gain or loss in profit or loss. The note and the disposal calculation must use the same two numbers." },
            { label: "Cross-check against the face of the statements", detail: "The $556,000 closing carrying amount is the figure presented in non-current assets, and the $128,000 charge is the figure in profit or loss. If either disagrees, the note is wrong or the statement is." },
          ],
          result:
            "Closing cost $935,000, accumulated depreciation $379,000 and a carrying amount of $556,000, up from $528,000. The check that matters: **depreciation eliminated on disposal must equal the accumulated depreciation on that specific asset** — $61,000 here — because the same figure appears in the disposal calculation. Getting one right and the other wrong is the commonest way this note fails to tie in.",
        },
        {
          kind: "table",
          caption: "The shape of the other three notes",
          head: ["Note", "Structure to produce"],
          rows: [
            ["**Provisions**", "Opening balance; additional provisions made; amounts used (utilised) in the year; amounts released as no longer required; closing balance. Then a description of the obligation, expected timing and the uncertainties."],
            ["**Inventories**", "Carrying amount by category — raw materials, work in progress, finished goods; the measurement basis (lower of cost and net realisable value) and the cost formula used (FIFO or weighted average); the amount of any write-down recognised in the period."],
            ["**Events after the reporting period**", "For each material NON-adjusting event: the nature of the event, and an estimate of its financial effect — or an explicit statement that such an estimate cannot be made."],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "A note must tie in to the face of the statements",
          md: "Every note is a **disaggregation** of a figure already presented, so its total must equal that figure. The non-current assets note's closing carrying amount equals the line in the statement of financial position; the provisions note's closing balance equals the provision in liabilities; the inventories note's total equals inventory in current assets. Where a question asks for both a statement and a note, checking that they agree is a free mark.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Recognising a dividend declared after the reporting date as a year-end liability.",
      fix: "No obligation existed at that date. It is a non-adjusting event and is disclosed.",
    },
    {
      trap: "Treating a post-year-end fire, flood or theft as adjusting.",
      fix: "The asset was intact at the reporting date, so the condition arose afterwards. Disclose it if material.",
    },
    {
      trap: "Treating a customer's later liquidation as non-adjusting.",
      fix: "Their financial condition existed at the year end; the liquidation confirms it. Adjust the receivable.",
    },
    {
      trap: "Considering events after the date the statements were authorised for issue.",
      fix: "The window closes at authorisation. Anything later is out of scope, and the question gives the date for exactly that reason.",
    },
    {
      trap: "Applying the ordinary analysis to a loss of going concern.",
      fix: "Going concern overrides it: the statements are reprepared on a different basis even though the condition arose after the year end.",
    },
    {
      trap: "Disclosing an item that should have been recognised.",
      fix: "A note cannot substitute for recognition. Probable obligations are provided for; only possible ones are disclosed.",
    },
  ],
  keyTerms: [
    { term: "Event after the reporting period", def: "An event occurring between the reporting date and the date the financial statements are authorised for issue." },
    { term: "Adjusting event", def: "An event providing evidence of a condition that existed at the reporting date, requiring the figures to be changed." },
    { term: "Non-adjusting event", def: "An event reflecting a condition that arose after the reporting date; disclosed if material, with no change to the figures." },
    { term: "Disclosure note", def: "Supporting information on policies, disaggregation and uncertainty that cannot sensibly be presented on the face of the statements." },
    { term: "Authorisation for issue", def: "The date the directors approve the financial statements, closing the window for events after the reporting period." },
  ],
  summary: [
    "Notes state policies, disaggregate the face of the statements and carry information that cannot go on it.",
    "The non-current assets note reconciles opening to closing cost and accumulated depreciation.",
    "An event after the reporting period falls between the reporting date and authorisation for issue.",
    "Adjusting events give evidence of a condition already existing at the reporting date, and change the figures.",
    "Non-adjusting events arise afterwards; a material one is disclosed with an estimate of its effect.",
    "A dividend declared after the reporting date is not a liability at that date.",
    "Loss of going concern overrides the classification and changes the basis of preparation.",
  ],
  knowledgeDiagnostic: [
    { q: "What single question classifies an event after the reporting period?", a: "Did the condition already exist at the reporting date? If yes, adjusting; if it arose afterwards, non-adjusting." },
    { q: "What window does the classification apply to?", a: "From the reporting date to the date the statements are authorised for issue. Later events are out of scope." },
    { q: "How is a post-year-end dividend declaration treated?", a: "As a non-adjusting event: disclosed, not recognised, because there was no obligation at the reporting date." },
    { q: "What does the non-current assets note reconcile?", a: "Opening cost or valuation to closing, through additions, revaluations and disposals — and opening to closing accumulated depreciation — to give the carrying amount." },
    { q: "Which event overrides the adjusting/non-adjusting analysis?", a: "Loss of going concern. The statements are reprepared on a different basis whenever the condition arose." },
  ],
  furtherStudy: [
    "Chapter 18 sets the recognition threshold that these notes supplement.",
    "AA examines the auditor's procedures over events after the reporting period.",
  ],
}

/* ── Chapter 26 · G5 ───────────────────────────────────────────── */

export const FA_TREE_26: StudyChapter = {
  id: "FA-26",
  number: 26,
  paper: "FA",
  area: "G",
  title: "Statements of cash flows",
  minutes: 20,
  syllabusRefs: ["G5(a)", "G5(b)", "G5(c)", "G5(d)", "G5(e)", "G5(f)", "G5(g)"],
  intro:
    "A business can be profitable and still fail, because profit is an opinion about a period and cash is a fact about a bank account. This statement is where the difference between the two is set out line by line.",
  outcomes: [
    "Differentiate between profit and cash flow, and describe the need to control cash flow",
    "Explain the benefits and drawbacks to users of a statement of cash flows",
    "Classify the effect of transactions on cash flows",
    "Calculate the figures for operating, investing and financing activities, by both the direct and indirect methods",
    "Prepare a statement of cash flows, or extracts, and identify the treatment of given transactions",
  ],
  sections: [
    {
      id: "profit-vs-cash",
      heading: "Why profit and cash differ",
      blocks: [
        {
          kind: "list",
          title: "The reasons a profitable business runs out of money",
          items: [
            "**Non-cash charges** — depreciation, amortisation and allowance movements reduce profit without any payment.",
            "**Working capital growth** — a business that grows its inventory and receivables faster than its payables consumes cash to fund the expansion.",
            "**Capital expenditure** — buying a machine takes cash now and reduces profit only slowly, through depreciation.",
            "**Loan repayments** — repaying principal takes cash and is not an expense at all.",
            "**Distributions** — dividends and drawings take cash and never touch profit.",
            "**Timing** — a credit sale is profit today and cash in sixty days, or never.",
          ],
        },
        {
          kind: "table",
          caption: "Benefits and drawbacks to users",
          head: ["Benefits", "Drawbacks"],
          rows: [
            ["Cash is a fact — far harder to manipulate than profit, which rests on estimates", "It is historic, so it says where cash went, not where it will go"],
            ["Shows whether operations actually generate cash, which is what services debt", "It contains no forecast, and users generally want one"],
            ["Explains the movement in the bank balance, so liquidity can be assessed", "Cash can be flattered near the year end by delaying payments"],
            ["Comparable between entities, since cash is measured the same way everywhere", "It does not show profitability, and a business can generate cash while making losses"],
            ["Splits operating, investing and financing, so a user sees whether growth is funded by trading or by borrowing", "Understanding it requires the other statements alongside"],
          ],
        },
        {
          kind: "definition",
          term: "The three classifications",
          md: "**Operating** — cash flows from the entity's trading activities, plus interest and tax paid.\n\n**Investing** — buying and selling non-current assets and investments, and interest or dividends received on them.\n\n**Financing** — raising and repaying share capital and borrowings, and dividends paid.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two transactions with no place in the statement at all",
          md: "A **bonus issue** and a **revaluation** involve **no cash**, so neither appears anywhere in the statement of cash flows. Questions include them precisely to see whether a candidate will invent a financing inflow. The test for every item is simply: **did cash move?**",
        },
      ],
      check: {
        q: "In which section does a dividend PAID appear, and in which does interest PAID appear?",
        options: [
          "Both in operating activities",
          "Dividends paid in financing; interest paid in operating",
          "Both in financing activities",
          "Dividends paid in operating; interest paid in financing",
        ],
        correct: 1,
        explain:
          "Dividends paid are a return to owners — a FINANCING outflow. Interest paid is presented within OPERATING activities, after cash generated from operations. Both are cash outflows and both are easy to misplace, and grouping them together is the standard error.",
      },
    },
    {
      id: "indirect",
      heading: "The indirect method, step by step",
      blocks: [
        {
          kind: "formula",
          name: "Reconciling profit to cash generated from operations",
          expr:
            "Profit before tax + Depreciation and amortisation + Loss on disposal − Gain on disposal + Finance costs ± Working capital movements = Cash generated from operations",
          note: "Then deduct interest paid and income tax paid to reach net cash from operating activities.",
        },
        {
          kind: "table",
          caption: "Working capital movements — the direction that catches everyone",
          head: ["Movement", "Effect on cash", "Reasoning"],
          rows: [
            ["Inventory **increases**", "**Outflow** — deduct", "Cash has been spent on goods not yet sold"],
            ["Inventory **decreases**", "**Inflow** — add", "Goods have been sold without replacing them"],
            ["Receivables **increase**", "**Outflow** — deduct", "Sales made but not yet collected"],
            ["Receivables **decrease**", "**Inflow** — add", "More collected than was sold on credit"],
            ["Payables **increase**", "**Inflow** — add", "Suppliers are funding the business for longer"],
            ["Payables **decrease**", "**Outflow** — deduct", "Suppliers have been paid down"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "An asset up is cash down; a liability up is cash up",
          md: "That one sentence covers all six rows. If a current **asset** grows, cash was used to build it; if a current **liability** grows, cash was retained by not settling it. Memorising six rows is unnecessary and unreliable under time pressure — the principle is quicker and it never breaks down.",
        },
        {
          kind: "example",
          title: "A complete statement of cash flows",
          scenario:
            "Denholme Co reports profit before tax of $164,000 for the year. Depreciation was $58,000; a machine with a carrying amount of $22,000 was sold for $27,000; finance costs were $19,000, of which $3,000 was unpaid at the year end and nothing was owing at the start. Inventory rose from $84,000 to $97,000; trade receivables fell from $132,000 to $118,000; trade payables rose from $71,000 to $79,000. Tax paid in the year was $41,000. The company bought property, plant and equipment for $190,000, issued shares for $120,000 cash, repaid $50,000 of loan notes and paid dividends of $36,000. Cash at the start of the year was $28,000.",
          steps: [
            { label: "Start from profit before tax and add back non-cash items", detail: "$164,000 + depreciation $58,000 = $222,000. Deduct the gain on disposal of $27,000 − $22,000 = $5,000, because the whole $27,000 belongs in investing. Add back finance costs $19,000. Subtotal $236,000." },
            { label: "Apply the working capital movements", detail: "Inventory up $13,000 — deduct. Receivables down $14,000 — add. Payables up $8,000 — add. Net +$9,000, giving cash generated from operations of $245,000." },
            { label: "Deduct interest and tax paid", detail: "Interest paid = $19,000 charged less $3,000 unpaid = $16,000. Tax paid $41,000. Net cash from operating activities = $245,000 − $16,000 − $41,000 = $188,000." },
            { label: "Investing activities", detail: "Purchase of property, plant and equipment $(190,000) plus proceeds of disposal $27,000 = $(163,000). Note the FULL proceeds appear here, which is why the gain was removed above." },
            { label: "Financing activities", detail: "Share issue $120,000, loan notes repaid $(50,000), dividends paid $(36,000) = $34,000." },
            { label: "Total and prove against the bank", detail: "$188,000 − $163,000 + $34,000 = an increase in cash of $59,000. Cash at the start $28,000 + $59,000 = $87,000 at the end, which must agree with the closing bank and cash balance in the statement of financial position." },
          ],
          result:
            "Net cash from operating activities of $188,000 and an overall increase in cash of $59,000, taking the balance to $87,000. Two checks matter. First, the total must equal the actual movement in cash and cash equivalents — that agreement is the statement's own proof. Second, the gain on disposal was **deducted** in operating while the **full $27,000 proceeds** went to investing: leaving the gain in operating counts $5,000 of the same cash twice.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The direct method, in one line",
          md: "The **direct** method presents operating cash flows as the actual receipts and payments — cash received from customers, cash paid to suppliers and employees — rather than reconciling from profit. It reaches the **same** figure for cash generated from operations. The indirect method is far more commonly examined because the reconciliation itself is what tests understanding.",
        },
      ],
      check: {
        q: "During the year inventory rose by $12,000, receivables fell by $7,000 and payables fell by $5,000. What is the net effect on cash generated from operations?",
        options: ["An outflow of $10,000", "An inflow of $10,000", "An outflow of $24,000", "An inflow of $14,000"],
        correct: 0,
        explain:
          "Inventory up $12,000 is an outflow; receivables down $7,000 is an inflow; payables down $5,000 is an outflow. Net: −12,000 + 7,000 − 5,000 = an OUTFLOW of $10,000. Apply the principle — an asset up is cash down, a liability up is cash up — and every sign follows from it.",
      },
    },
    {
      id: "deriving-the-cash-figures",
      heading: "Deriving the cash figures the statement needs",
      blocks: [
        {
          kind: "text",
          md: "The statement reports cash **paid** and cash **received**, and a question rarely gives you those directly. It gives you the charge in profit or loss and the opening and closing balances, and expects you to derive the cash — which is the same T-account technique as chapter 16.",
        },
        {
          kind: "formula",
          name: "The three derivations the exam sets",
          expr:
            "Tax paid = Opening tax liability + Charge for the year − Closing tax liability   ·   Interest paid = Opening accrual + Charge − Closing accrual   ·   Dividends paid = Opening dividend liability + Dividends declared − Closing liability",
          note: "The same shape each time: opening balance plus what was charged, less what is still owed, equals what was paid.",
        },
        {
          kind: "example",
          title: "Deriving purchases of non-current assets and disposal proceeds",
          scenario:
            "Marchgate Co's property, plant and equipment had a carrying amount of $684,000 at the start of the year and $812,000 at the end. Depreciation for the year was $146,000. Assets with a carrying amount of $52,000 were disposed of, producing a loss on disposal of $9,000. There were no revaluations.",
          steps: [
            { label: "Set up the carrying amount reconciliation", detail: "Opening carrying amount + additions − depreciation − carrying amount of disposals = closing carrying amount." },
            { label: "Insert the known figures", detail: "$684,000 + additions − $146,000 − $52,000 = $812,000." },
            { label: "Solve for additions", detail: "Additions = $812,000 − $684,000 + $146,000 + $52,000 = $326,000. This is the INVESTING outflow for the purchase of property, plant and equipment." },
            { label: "Derive the disposal proceeds", detail: "A loss of $9,000 means proceeds were $9,000 BELOW the carrying amount: $52,000 − $9,000 = $43,000. That is the investing inflow." },
            { label: "Check the operating reconciliation", detail: "Because it was a LOSS, it is ADDED BACK to profit in the operating section — the opposite of a gain — and the full $43,000 proceeds sit in investing." },
            { label: "Verify the reconciliation", detail: "$684,000 + $326,000 − $146,000 − $52,000 = $812,000. It ties." },
          ],
          result:
            "An investing outflow of $326,000 and an inflow of $43,000. Two checks matter: the carrying-amount reconciliation must tie to the closing figure, and a LOSS on disposal is added back in operating while a GAIN is deducted — both because the whole proceeds figure belongs in investing.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Where the question gives cost and accumulated depreciation separately",
          md: "Run **two** reconciliations rather than one: cost (opening + additions − cost of disposals = closing) and accumulated depreciation (opening + charge − depreciation eliminated on disposals = closing). Trying to do it in a single carrying-amount line when the question gives both figures usually loses one of the disposal amounts, and then the additions figure absorbs the error.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The one question to keep asking",
          md: "**Did cash actually move, and how much of it?** A charge in profit or loss is not a payment; a declared dividend is not a paid one; a revaluation and a bonus issue are not cash at all. Every figure in this statement has to be traced to a movement in the bank, and every derivation above is just a way of finding that movement when the question hides it.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Adding a gain on disposal in the operating reconciliation.",
      fix: "DEDUCT the gain and put the full proceeds in investing. Leaving it in counts the same cash twice.",
    },
    {
      trap: "Reversing the sign on a working capital movement.",
      fix: "An asset up is cash down; a liability up is cash up. Derive the six directions from that rather than memorising them.",
    },
    {
      trap: "Showing a bonus issue or a revaluation in the statement.",
      fix: "Neither involves cash, so neither appears. Ask only whether cash actually moved.",
    },
    {
      trap: "Using the interest CHARGED as interest paid.",
      fix: "Adjust for accruals at both ends: interest paid is the charge plus opening accrual less closing accrual.",
    },
    {
      trap: "Putting dividends paid in operating activities.",
      fix: "Dividends paid are a financing outflow. Interest paid is the one that sits in operating.",
    },
    {
      trap: "Failing to prove the total against the movement in cash.",
      fix: "The three sections must sum to the actual change in cash and cash equivalents. That agreement is the statement's own check.",
    },
  ],
  keyTerms: [
    { term: "Operating activities", def: "Cash flows from trading, together with interest and income tax paid." },
    { term: "Investing activities", def: "Cash flows from acquiring and disposing of non-current assets and investments, and returns received on them." },
    { term: "Financing activities", def: "Cash flows from raising and repaying share capital and borrowings, and dividends paid to owners." },
    { term: "Indirect method", def: "Presenting operating cash flow by reconciling profit before tax for non-cash items, non-operating items and working capital movements." },
    { term: "Direct method", def: "Presenting operating cash flow as actual receipts from customers and payments to suppliers and employees." },
    { term: "Cash generated from operations", def: "The operating subtotal before interest paid and income tax paid." },
  ],
  summary: [
    "Profit and cash differ because of non-cash charges, working capital movements, capital expenditure, loan repayments and distributions.",
    "Cash flows are classified as operating, investing or financing; interest paid is operating and dividends paid are financing.",
    "The indirect method adds back depreciation and finance costs, removes disposal gains and adjusts for working capital.",
    "An asset up is cash down; a liability up is cash up — the principle behind every working capital sign.",
    "Disposal proceeds go to investing in full, so the gain must be removed from the operating reconciliation.",
    "Bonus issues and revaluations involve no cash and appear nowhere in the statement.",
    "The three sections must sum to the actual movement in cash and cash equivalents.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a gain on disposal deducted in the operating reconciliation?", a: "Because the whole disposal proceeds are shown as an investing inflow. Leaving the gain in operating would count part of the same cash twice." },
    { q: "State the principle behind every working capital adjustment.", a: "An increase in a current asset is a cash outflow; an increase in a current liability is a cash inflow." },
    { q: "Where do interest paid and dividends paid appear?", a: "Interest paid in operating activities, after cash generated from operations; dividends paid in financing activities." },
    { q: "How is interest paid derived from the finance cost charged?", a: "Charge plus opening accrual less closing accrual — the cash actually paid, not the amount expensed." },
    { q: "What is the statement's own arithmetic check?", a: "The three sections must sum to the actual increase or decrease in cash and cash equivalents for the period." },
  ],
  furtherStudy: [
    "Chapter 30 reads liquidity from the same figures as ratios.",
    "FR extends the statement to groups and to more complex adjustments.",
  ],
}

/* ── Chapter 27 · G6 ───────────────────────────────────────────── */

export const FA_TREE_27: StudyChapter = {
  id: "FA-27",
  number: 27,
  paper: "FA",
  area: "G",
  title: "Incomplete records",
  minutes: 18,
  syllabusRefs: ["G6(a)"],
  intro:
    "Sometimes the figure you need was never recorded. Every incomplete-records question is solved the same way: find a relationship where every term but one is known, and solve for the one.",
  outcomes: [
    "Use the accounting equation to derive a missing figure",
    "Use general ledger control accounts to calculate missing sales, purchases, receipts or payments",
    "Use cash and bank summaries to derive missing figures",
    "Use gross profit percentages to derive missing sales, purchases or inventory figures",
    "Distinguish margin from mark-up and apply each correctly",
  ],
  sections: [
    {
      id: "four-techniques",
      heading: "The four techniques",
      blocks: [
        {
          kind: "table",
          caption: "Which technique the question is pointing you at",
          head: ["What is missing", "Technique", "The relationship used"],
          rows: [
            ["Profit, when only net assets are known", "**Accounting equation**", "Closing capital = opening capital + capital introduced + profit − drawings"],
            ["Credit sales", "**Receivables control account**", "Opening receivables + credit sales − receipts − returns − write-offs = closing receivables"],
            ["Credit purchases", "**Payables control account**", "Opening payables + credit purchases − payments − returns − discounts = closing payables"],
            ["Cash sales, drawings or an expense paid in cash", "**Cash or bank summary**", "Opening cash + receipts − payments = closing cash"],
            ["Sales, cost of sales or inventory", "**Gross profit percentage**", "Margin or mark-up applied to the known figure"],
            ["Inventory lost or stolen", "**Cost of sales derived, then compared**", "Expected closing inventory less actual counted inventory"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The method behind all four",
          md: "Draw the account or write the relationship, insert **every figure you know** with the correct sign, and let the **missing figure be the balancing item**. Do not try to reason it out in prose — the sign errors are what cost the marks, and a T-account makes a sign error visible.",
        },
        {
          kind: "example",
          title: "Deriving credit sales and cash banked",
          scenario:
            "Fenwick's records are incomplete. At the start of the year trade receivables were $47,000; at the end they were $58,000. All sales are on credit and there are no cash sales. Amounts banked from customers were $412,000, and Fenwick took $1,500 a month in drawings out of customer receipts before banking them. Discounts allowed were $6,400, sales returns were $9,100 and $3,200 of debts were written off as irrecoverable.",
          steps: [
            { label: "Establish the true receipts figure first", detail: "Money taken before banking is still money received from customers. Total receipts = banked $412,000 + drawings $1,500 × 12 = $18,000, so $430,000." },
            { label: "Draw the receivables control account", detail: "Debit side: opening balance $47,000 and credit sales (the unknown). Credit side: receipts, discounts, returns, write-offs and the closing balance." },
            { label: "Total the credit side", detail: "Receipts $430,000 + discounts allowed $6,400 + returns $9,100 + write-offs $3,200 + closing balance $58,000 = $506,700." },
            { label: "Solve for credit sales", detail: "Credit sales = $506,700 − opening balance $47,000 = $459,700." },
            { label: "Prove it", detail: "$47,000 + $459,700 − $430,000 − $6,400 − $9,100 − $3,200 = $58,000, the given closing balance. It proves." },
            { label: "Test the trap", detail: "Using the banked $412,000 alone would give credit sales of $441,700 — understated by exactly the $18,000 of drawings, and the proof would fail by that amount." },
          ],
          result:
            "Credit sales of $459,700. The check that matters: **money taken before banking is still money received**, so it must be added back before the control account will balance. Establishing the true receipts figure BEFORE drawing the account is what keeps this reliable, and proving the derived figure back through the account is what catches the omission if it happens.",
        },
      ],
      check: {
        q: "Opening payables were $38,000, closing payables $44,000, payments to suppliers $260,000, purchase returns $7,000 and discounts received $3,500. What were credit purchases?",
        options: ["$276,500", "$266,000", "$253,500", "$270,500"],
        correct: 0,
        explain:
          "Credit purchases = closing $44,000 + payments $260,000 + returns $7,000 + discounts $3,500 − opening $38,000 = $276,500. Prove it: $38,000 + $276,500 − $260,000 − $7,000 − $3,500 = $44,000. Every item that REDUCES the payable is added back when solving for purchases.",
      },
    },
    {
      id: "margin-markup",
      heading: "Margin and mark-up",
      blocks: [
        {
          kind: "formula",
          name: "The two percentages",
          expr: "Margin = Gross profit ÷ Revenue   ·   Mark-up = Gross profit ÷ Cost of sales",
          note: "Margin is a percentage OF SALES; mark-up is a percentage OF COST. Reading the wrong one is the single biggest source of lost marks in this topic.",
        },
        {
          kind: "table",
          caption: "The same trade, both ways round",
          head: ["", "Margin of 25%", "Mark-up of 25%"],
          rows: [
            ["Revenue", "100", "125"],
            ["Cost of sales", "75", "100"],
            ["Gross profit", "25", "25"],
            ["Which figure is the base?", "**Revenue = 100**", "**Cost = 100**"],
            ["Given cost of $90,000, revenue is", "$90,000 × 100/75 = $120,000", "$90,000 × 125/100 = $112,500"],
            ["Given revenue of $120,000, cost is", "$120,000 × 75/100 = $90,000", "$120,000 × 100/125 = $96,000"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Set the base to 100 first",
          md: "Write out the little three-line column before doing any arithmetic: for a **margin**, revenue is 100; for a **mark-up**, cost is 100. Then read the fraction straight off it. That habit takes ten seconds and removes the entire class of error, which is why a mark-up of 25% and a margin of 25% give answers that differ by $7,500 on a $90,000 cost.",
        },
        {
          kind: "example",
          title: "Using gross profit to find inventory lost in a fire",
          scenario:
            "Kelso Trading's warehouse was damaged by fire on 30 November. Opening inventory at 1 January was $58,000. Purchases to 30 November were $384,000 and sales were $520,000. The business consistently achieves a gross margin of 30%. Inventory salvaged after the fire and counted was $19,500, and the insurers have asked for the cost of the inventory destroyed.",
          steps: [
            { label: "Set the base", detail: "A MARGIN of 30% means revenue is 100 and cost of sales is 70." },
            { label: "Derive cost of sales", detail: "$520,000 × 70/100 = $364,000." },
            { label: "Derive expected closing inventory", detail: "Opening $58,000 + purchases $384,000 − cost of sales $364,000 = $78,000 of inventory that should have been on hand." },
            { label: "Compare with what survived", detail: "Expected $78,000 less salvaged $19,500 = $58,500 destroyed, at cost." },
            { label: "Check the arithmetic backwards", detail: "Cost of sales $364,000 + gross profit $156,000 = revenue $520,000, and $156,000 ÷ $520,000 = 30%. The margin is confirmed." },
            { label: "Note the alternative reading", detail: "Had the 30% been a MARK-UP, cost of sales would be $520,000 × 100/130 = $400,000, expected inventory $42,000 and the loss $22,500 — less than half the answer. The wording decides it." },
          ],
          result:
            "Inventory destroyed at cost was $58,500. The check that matters is the last step: the same facts with mark-up instead of margin give $22,500, so identifying which percentage the question stated is worth more than every other step combined. Proving the margin back from the derived cost of sales confirms the base was read correctly.",
        },
      ],
      check: {
        q: "A business achieves a mark-up of 40% on cost. Revenue for the period was $294,000. What was cost of sales?",
        options: ["$176,400", "$210,000", "$205,800", "$117,600"],
        correct: 1,
        explain:
          "A MARK-UP puts COST at 100 and revenue at 140, so cost of sales = $294,000 × 100/140 = $210,000, with gross profit of $84,000. Check: $84,000 ÷ $210,000 = 40% of cost. Treating 40% as a margin would give $176,400 — the distractor, and a $33,600 error from one misread word.",
      },
    },
    {
      id: "cash-and-bank-summaries",
      heading: "Cash and bank summaries, and the two-account problem",
      blocks: [
        {
          kind: "text",
          md: "The hardest incomplete-records questions give you a business that banks only part of its takings and pays some expenses in cash. Two accounts are then needed — cash and bank — and the missing figure is often the one that connects them.",
        },
        {
          kind: "formula",
          name: "The cash account",
          expr: "Opening cash + Cash received (takings) − Cash paid out (expenses, drawings) − Cash banked = Closing cash",
          note: "Whatever is unknown becomes the balancing figure. Where takings are unknown, everything else in the equation is usually given.",
        },
        {
          kind: "example",
          title: "Deriving takings from a till summary",
          scenario:
            "Padstow Stores banks part of its daily takings and pays some costs from the till. For the year: cash in the till was $840 at the start and $1,120 at the end. Amounts banked from takings were $486,000. From the till the proprietor paid wages of $37,400, sundry expenses of $9,600 and took drawings of $1,800 a month. All sales are for cash.",
          steps: [
            { label: "Set out the cash account", detail: "Opening cash $840 on the debit side, with takings (the unknown) also a debit. Payments out and the closing balance are credits." },
            { label: "Total the known outflows", detail: "Banked $486,000 + wages $37,400 + sundries $9,600 + drawings ($1,800 × 12 = $21,600) = $554,600." },
            { label: "Add the closing balance", detail: "Credit side total = $554,600 + closing cash $1,120 = $555,720." },
            { label: "Solve for takings", detail: "Takings = $555,720 − opening cash $840 = $554,880. This is revenue for the year, since all sales are for cash." },
            { label: "Prove it", detail: "$840 + $554,880 − $486,000 − $37,400 − $9,600 − $21,600 = $1,120, the closing till balance. It proves." },
            { label: "Note what would have gone wrong", detail: "Taking the banked $486,000 as revenue would understate sales by $68,880 — the wages, sundries and drawings paid out of the till before banking, plus the movement in the till balance." },
          ],
          result:
            "Takings, and therefore revenue, of $554,880. The check that matters: **every payment made out of the till is money that was received first**, so it must be added back. This is the same principle as chapter 27's drawings-before-banking trap, applied to a business that pays several things in cash.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Which account does each item belong in?",
          md: "Money moves **into the till** from cash sales, and **out of the till** to expenses paid in cash, to drawings, and to the bank. Money moves **into the bank** from cash banked and from credit customers, and **out of the bank** to suppliers and expenses paid by transfer. **Cash banked appears in both** — as an outflow from the till and an inflow to the bank — and it is the item that links the two accounts. Recording it in only one of them is the standard error.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Read the question for what it is really asking",
          md: "\"Takings\", \"cash sales\", \"revenue\" and \"cash banked\" are four different figures in a question like this. Underline which one is wanted before starting, because the arithmetic that produces one produces none of the others.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Confusing margin with mark-up.",
      fix: "Margin's base is revenue; mark-up's base is cost. Write the 100/75 or 125/100 column before calculating.",
    },
    {
      trap: "Using the banked figure as total receipts when cash was taken first.",
      fix: "Money taken from the till before banking is still money received. Add it back before balancing the control account.",
    },
    {
      trap: "Omitting discounts, returns or write-offs from a control account reconstruction.",
      fix: "Every item that reduced the balance must be included, or the derived sales or purchases figure absorbs it.",
    },
    {
      trap: "Reasoning the missing figure out in prose.",
      fix: "Draw the account. A sign error is visible in a T-account and invisible in a sentence.",
    },
    {
      trap: "Forgetting to prove the answer back through the account.",
      fix: "Substitute the derived figure and check it produces the given closing balance. That proof catches most errors.",
    },
  ],
  keyTerms: [
    { term: "Incomplete records", def: "A situation where some accounting figures were never recorded and must be derived from known relationships." },
    { term: "Margin", def: "Gross profit as a percentage of revenue — revenue is the base of 100." },
    { term: "Mark-up", def: "Gross profit as a percentage of cost of sales — cost is the base of 100." },
    { term: "Control account reconstruction", def: "Deriving a missing sales, purchases, receipts or payments figure by balancing a receivables or payables control account." },
    { term: "Cash summary", def: "A reconstruction of opening cash plus receipts less payments to closing cash, used to derive an unrecorded figure." },
  ],
  summary: [
    "Every incomplete-records question finds a relationship where one term is unknown and solves for it.",
    "The four techniques are the accounting equation, control accounts, cash and bank summaries, and gross profit percentages.",
    "Draw the account, enter every known figure with the right sign, and let the missing item balance it.",
    "Margin is gross profit over revenue; mark-up is gross profit over cost.",
    "Set the base to 100 before calculating — revenue for a margin, cost for a mark-up.",
    "Cash taken before banking is still cash received and must be added back.",
    "Always prove the derived figure back through the account it came from.",
  ],
  knowledgeDiagnostic: [
    { q: "How do you find profit when only opening and closing net assets are known?", a: "Profit = closing capital − opening capital − capital introduced + drawings." },
    { q: "How is a missing credit sales figure derived?", a: "By balancing the receivables control account: closing balance plus receipts, discounts allowed, returns and write-offs, less the opening balance." },
    { q: "State the difference between margin and mark-up.", a: "Margin is gross profit as a percentage of revenue; mark-up is gross profit as a percentage of cost. Different bases, different answers." },
    { q: "Cost of sales is $80,000 and the margin is 20%. What is revenue?", a: "$80,000 × 100/80 = $100,000, with gross profit of $20,000, which is 20% of revenue." },
    { q: "Why must drawings taken from the till be added to banked receipts?", a: "Because they were received from customers before being banked. Omitting them understates the receipts figure and therefore the derived sales." },
  ],
  furtherStudy: [
    "Chapter 21's control accounts are the same tool used forwards.",
    "Chapter 30 uses margin and mark-up again in ratio analysis.",
  ],
}

/** Chapters 24–27 — Area G, in reading order. */
export const FA_TREE_AREA_G: StudyChapter[] = [FA_TREE_24, FA_TREE_25, FA_TREE_26, FA_TREE_27]
