import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area D (part 2) — recording transactions and events.
 * Chapters 15–19 of the FA reading tree: intangibles, the accruals adjustments,
 * receivables, payables and provisions, and capital structure.
 *
 * These five chapters are where the accruals basis and prudence stop being
 * definitions and start deciding figures. Each carries the T-account or formula the
 * exam actually rewards, and every worked example ends with the check that catches
 * the error — the expense reconciles to cash plus the movement in the balance, the
 * allowance movement rather than the closing allowance hits profit, the share issue
 * splits between capital and premium.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 15 · D6 ───────────────────────────────────────────── */

export const FA_TREE_15: StudyChapter = {
  id: "FA-15",
  number: 15,
  paper: "FA",
  area: "D",
  title: "Intangible non-current assets and amortisation",
  minutes: 15,
  syllabusRefs: ["D6(a)", "D6(b)", "D6(c)", "D6(d)", "D6(e)", "D6(f)"],
  intro:
    "The whole of this topic turns on one line: research is an expense and development may be an asset. Everything else is the test that decides which side of that line expenditure falls.",
  outcomes: [
    "Compare tangible and intangible non-current assets",
    "Identify types of intangible asset and explain how each arises",
    "Identify the definition and treatment of research and of development expenditure",
    "Calculate the amount to be capitalised as development expenditure from given information",
    "Explain the purpose of amortisation and calculate and account for it",
  ],
  sections: [
    {
      id: "what-they-are",
      heading: "Intangible assets, and which ones get recognised",
      blocks: [
        {
          kind: "definition",
          term: "Intangible asset",
          md: "An **identifiable non-monetary asset without physical substance**. Identifiable is the working word: the asset must be separable — capable of being sold or transferred on its own — or must arise from legal rights.",
        },
        {
          kind: "table",
          caption: "Tangible against intangible",
          head: ["", "Tangible", "Intangible"],
          rows: [
            ["Physical substance", "Yes — can be seen and touched", "No"],
            ["Examples", "Land and buildings, plant, vehicles, fixtures", "Patents, licences, trademarks, development expenditure, purchased goodwill, software"],
            ["Charge over its life", "**Depreciation**", "**Amortisation**"],
            ["Verification", "Physical inspection and count", "Legal documents, contracts and the capitalisation criteria"],
            ["Typical exam difficulty", "Which costs are capitalised", "Whether an asset exists at all"],
          ],
        },
        {
          kind: "list",
          title: "Types of intangible the syllabus expects you to name",
          items: [
            "**Patents** — a legal right to exploit an invention for a period.",
            "**Trademarks and brand names** — protected identifiers, recognised when purchased.",
            "**Licences and franchises** — a paid right to operate or to use something belonging to another.",
            "**Copyright** — rights over creative or published work.",
            "**Development expenditure** — the cost of applying research findings to a specific product or process, where the criteria are met.",
            "**Purchased goodwill** — the excess paid for a business over the fair value of its identifiable net assets. Chapter 28 computes it in a group context.",
            "**Computer software** where it is not integral to hardware.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Purchased and internally generated are treated differently",
          md: "A **purchased** intangible has a cost that someone was independently willing to pay, so it is recognised at that cost. An **internally generated** brand, customer list or item of goodwill is **not recognised**, because its cost cannot be distinguished from the cost of running the business and the value cannot be verified. Development expenditure is the one systematic exception, and only where every criterion is satisfied.",
        },
      ],
      check: {
        q: "A company has spent years building a widely recognised brand, and an adviser estimates it is worth $5m. A competitor's brand was bought last year for $3m. What appears in the statement of financial position?",
        options: [
          "Both, at $5m and $3m",
          "Only the purchased brand, at $3m",
          "Only the internally generated brand, at $5m",
          "Neither, because brands are never assets",
        ],
        correct: 1,
        explain:
          "Only the PURCHASED brand, at its $3m cost. An internally generated brand is not recognised: its cost cannot be separated from the cost of trading and its value cannot be verified. This is one of the clearest limitations of financial statements — the more valuable asset here is the one that does not appear.",
      },
    },
    {
      id: "research-development",
      heading: "Research and development",
      blocks: [
        {
          kind: "definition",
          term: "Research",
          md: "Original and planned investigation undertaken to gain **new scientific or technical knowledge and understanding**, with no certainty yet that anything will come of it. Research expenditure is **always written off as an expense** as incurred.",
        },
        {
          kind: "definition",
          term: "Development",
          md: "The application of research findings to a **plan or design for a specific new or substantially improved product or process**, before commercial production begins. Development expenditure **must** be capitalised where all the recognition criteria are met, and expensed where they are not.",
        },
        {
          kind: "list",
          style: "number",
          title: "The development criteria — all of them, or none",
          items: [
            "**Technical feasibility** — the project can actually be finished to the point where the asset is ready to use or to sell.",
            "**Intention to complete** it and use or sell it.",
            "**Ability to use or sell** the resulting asset.",
            "**Probable future economic benefits** — usually demonstrated by a market for the output or its usefulness internally.",
            "**Adequate resources** — technical, financial and other — to complete the project.",
            "**Expenditure attributable to the asset can be measured reliably.**",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two rules that decide most of the marks",
          md: "**The criteria are cumulative.** Fail one and the expenditure is an expense, however promising the project.\n\n**Capitalisation starts from the date the criteria are met** — expenditure incurred before that date stays in profit or loss and is **not** reinstated later. So a project that meets the criteria half way through the year capitalises only the second half's spending.",
        },
        {
          kind: "example",
          title: "Splitting a year's project spending",
          scenario:
            "Trentham Co spent $960,000 on one project during the year ended 31 December. Of that, $180,000 was investigating whether a new coating technology was possible at all. The remaining $780,000 was spent designing a specific product using the technology, spread evenly across the twelve months. The directors concluded on 1 August that the product was technically feasible, that they intended to complete and sell it, that a market existed and that the company had the resources and the costing systems to see it through. Capitalised development is amortised over four years from the date the product becomes available for sale, which had not happened by the year end.",
          steps: [
            { label: "Deal with the research", detail: "$180,000 investigating whether the technology was possible is RESEARCH. Expensed in full, and never reinstated." },
            { label: "Split the development spending by date", detail: "$780,000 evenly over twelve months = $65,000 a month. Seven months to 31 July = $455,000; five months from 1 August = $325,000." },
            { label: "Apply the criteria date", detail: "All six criteria were met on 1 August. So only the $325,000 incurred from that date is capitalised." },
            { label: "Expense the rest", detail: "The $455,000 spent before the criteria were met is an expense, and cannot be capitalised retrospectively." },
            { label: "Consider amortisation", detail: "None yet. Amortisation begins when the asset is available for use or sale, which has not happened, so the intangible stands at $325,000." },
            { label: "Total the charge to profit", detail: "$180,000 research + $455,000 pre-criteria development = $635,000 expensed; $325,000 capitalised." },
          ],
          result:
            "An intangible asset of $325,000 and a charge to profit or loss of $635,000. The check that matters: the two figures must add back to the $960,000 spent. Capitalising the whole $780,000 of development — the commonest answer — overstates the asset by $455,000 and understates the expense by the same amount, because it ignores the date the criteria were met.",
        },
      ],
      check: {
        q: "A company spends $400,000 developing a product. It is technically feasible, the company intends to complete it and a market exists, but the company cannot secure the funding needed to finish it. How is the $400,000 treated?",
        options: [
          "Capitalised, because three of the criteria are met",
          "Expensed in full, because the criteria are cumulative and adequate resources are not available",
          "Half capitalised and half expensed",
          "Capitalised and immediately impaired to nil",
        ],
        correct: 1,
        explain:
          "EXPENSED IN FULL. The criteria are cumulative — failing the requirement for adequate technical, financial and other resources to complete the project is enough on its own, however strong the other five look. There is no partial capitalisation for partially met criteria.",
      },
    },
    {
      id: "amortisation",
      heading: "Amortisation",
      blocks: [
        {
          kind: "definition",
          term: "Amortisation",
          md: "The systematic allocation of an intangible asset's cost over its **useful life** — exactly the same idea as depreciation, applied to an asset with no physical substance. It begins when the asset is **available for use**, not when the spending happens.",
        },
        {
          kind: "formula",
          name: "Amortisation of a finite-life intangible",
          expr: "Annual charge = Cost ÷ Useful life in years",
          note: "Debit amortisation expense, credit accumulated amortisation. Where the asset has a legal life — a patent or a licence — that life caps the useful life.",
        },
        {
          kind: "table",
          caption: "Presentation",
          head: ["Item", "Where it appears"],
          rows: [
            ["Research expenditure", "Expense in profit or loss"],
            ["Development expenditure failing the criteria", "Expense in profit or loss"],
            ["Development expenditure meeting the criteria", "Intangible asset, within non-current assets"],
            ["Amortisation charge for the year", "Expense in profit or loss"],
            ["Accumulated amortisation", "Deducted from cost to give the carrying amount"],
          ],
        },
        {
          kind: "example",
          title: "Amortising a licence and a completed development project",
          scenario:
            "Oakmere Co buys a ten-year operating licence on 1 April 20X5 for $180,000. On 1 July 20X5 a development project with capitalised costs of $240,000 becomes available for sale; its expected useful life is five years. The year end is 31 December 20X5 and charges are made monthly.",
          steps: [
            { label: "Licence — annual charge", detail: "$180,000 ÷ 10 years = $18,000 a year." },
            { label: "Licence — this year", detail: "Nine months from 1 April: $18,000 × 9/12 = $13,500." },
            { label: "Development — annual charge", detail: "$240,000 ÷ 5 years = $48,000 a year." },
            { label: "Development — this year", detail: "Six months from 1 July, when it became available for sale: $48,000 × 6/12 = $24,000. Amortisation runs from availability, not from the date of the spending." },
            { label: "Total charge and carrying amounts", detail: "Amortisation for the year $37,500. Licence carrying amount $166,500; development carrying amount $216,000." },
          ],
          result:
            "Amortisation of $37,500 charged to profit or loss, with intangibles carried at $382,500 in total. The check that matters: amortisation starts when the asset is AVAILABLE FOR USE — a project capitalised in January but not ready until July is amortised for six months, not twelve, and charging a full year is the standard error.",
        },
      ],
      check: {
        q: "Development costs of $300,000 were capitalised evenly through the year to 31 December, and the product became available for sale on 1 October. Amortisation is over five years, monthly. What is the charge for the year?",
        options: ["$60,000", "$15,000", "$45,000", "Nil"],
        correct: 1,
        explain:
          "Amortisation begins when the asset is AVAILABLE FOR USE — 1 October — so three months are charged: $300,000 ÷ 5 = $60,000 a year × 3/12 = $15,000. A full year's $60,000 ignores the availability date, and nil ignores that the asset became available before the year end.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Capitalising research expenditure because the project later succeeded.",
      fix: "Research is always an expense as incurred, and is never reinstated as an asset.",
    },
    {
      trap: "Capitalising a whole year's development spending when the criteria were met part way through.",
      fix: "Capitalisation runs from the date the criteria were met. Earlier spending stays in profit or loss.",
    },
    {
      trap: "Capitalising development when one criterion fails.",
      fix: "The criteria are cumulative. Fail any one — commonly adequate resources — and the whole amount is expensed.",
    },
    {
      trap: "Recognising an internally generated brand, customer list or goodwill.",
      fix: "Only PURCHASED intangibles are recognised, because their cost is verifiable. Internally generated ones are not, with development the one exception.",
    },
    {
      trap: "Starting amortisation when the expenditure was incurred.",
      fix: "It starts when the asset is available for use or sale, which is often several months later.",
    },
  ],
  keyTerms: [
    { term: "Intangible asset", def: "An identifiable non-monetary asset without physical substance, either separable or arising from legal rights." },
    { term: "Research", def: "Original planned investigation to gain new scientific or technical knowledge, expensed as incurred." },
    { term: "Development", def: "Applying research findings to a plan or design for a specific new or improved product or process, capitalised where all criteria are met." },
    { term: "Amortisation", def: "The systematic allocation of an intangible asset's cost over its useful life, beginning when it is available for use." },
    { term: "Purchased goodwill", def: "The excess of the amount paid for a business over the fair value of its identifiable net assets." },
  ],
  summary: [
    "An intangible asset is identifiable, non-monetary and without physical substance.",
    "Purchased intangibles are recognised at cost; internally generated brands, customer lists and goodwill are not.",
    "Research expenditure is always an expense; development expenditure is capitalised only when all six criteria are met.",
    "The criteria are cumulative, and capitalisation runs from the date they are first met.",
    "Amortisation allocates cost over useful life and begins when the asset is available for use or sale.",
    "A legal life, such as a patent's or licence's term, caps the useful life.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes research from development?", a: "Research seeks new knowledge with no certainty of an outcome; development applies findings to a specific product or process before commercial production." },
    { q: "List the six development criteria.", a: "Technical feasibility, intention to complete, ability to use or sell, probable future economic benefits, adequate resources, and reliable measurement of the expenditure." },
    { q: "The criteria are met on 1 September in a year to 31 December. What is capitalised?", a: "Only the development expenditure incurred from 1 September onwards. Earlier spending stays in profit or loss and cannot be reinstated." },
    { q: "Why is an internally generated brand not recognised?", a: "Its cost cannot be separated from the cost of running the business, and its value cannot be verified." },
    { q: "When does amortisation of a capitalised development project begin?", a: "When the asset is available for use or sale — not when the expenditure was incurred." },
  ],
  furtherStudy: [
    "Chapter 25 draws the intangibles disclosure note.",
    "Chapter 28 computes purchased goodwill on the acquisition of a subsidiary.",
    "FR develops IAS 38 and adds impairment of intangibles and goodwill.",
  ],
}

/* ── Chapter 16 · D7 ───────────────────────────────────────────── */

export const FA_TREE_16: StudyChapter = {
  id: "FA-16",
  number: 16,
  paper: "FA",
  area: "D",
  title: "Accruals, prepayments, accrued income and deferred income",
  minutes: 18,
  syllabusRefs: ["D7(a)", "D7(b)", "D7(c)", "D7(d)", "D7(e)", "D7(f)"],
  intro:
    "Four adjustments, two assets and two liabilities, and one question behind all of them: does this amount belong to this period? Answer that and the double entry writes itself.",
  outcomes: [
    "Put the accruals basis to work on all four period-end adjustments",
    "Calculate each adjustment when preparing financial statements",
    "Prepare the journal entries to create and to reverse each adjustment",
    "Identify the impact of each adjustment on profit and on net assets",
    "Report the four items correctly in the financial statements",
  ],
  sections: [
    {
      id: "the-four",
      heading: "The four adjustments, laid out together",
      blocks: [
        {
          kind: "table",
          caption: "Two expenses, two incomes, two assets, two liabilities",
          head: ["Adjustment", "The situation", "Element", "Journal"],
          rows: [
            ["**Accrued expense (accrual)**", "Expense incurred, not yet paid or invoiced", "**Liability**", "Debit the expense, credit accruals"],
            ["**Prepaid expense (prepayment)**", "Paid in advance for a future period's benefit", "**Asset**", "Debit prepayments, credit the expense"],
            ["**Accrued income**", "Income earned, not yet received or invoiced", "**Asset**", "Debit accrued income, credit the income"],
            ["**Deferred income**", "Received in advance of earning it", "**Liability**", "Debit the income, credit deferred income"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two questions that give every answer",
          md: "**Whose period does the amount belong to?** If it belongs to this period, it goes in this period's profit whatever the cash did.\n\n**Has the cash moved yet?** If the cash is ahead of the period, you have a prepayment (an asset, we are owed a service) or deferred income (a liability, we owe a service). If the cash is behind the period, you have an accrual (a liability) or accrued income (an asset).",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Cash ahead or cash behind",
            caption: "Two dimensions: expense or income, cash early or cash late.",
            data: {
              leftTitle: "Expenses",
              rightTitle: "Income",
              rows: [
                { aspect: "Cash BEHIND the period", left: "Accrual — a liability", right: "Accrued income — an asset" },
                { aspect: "Cash AHEAD of the period", left: "Prepayment — an asset", right: "Deferred income — a liability" },
                { aspect: "Effect on this period's profit", left: "Accrual reduces it; prepayment increases it", right: "Accrued income increases it; deferred income reduces it" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Reversal at the start of the next period",
          md: "Every one of these adjustments **reverses**. An accrual raised at 31 December is released when the invoice is paid in January, so the January payment does not become a second expense. A prepayment carried forward becomes an expense of the new period. Failing to reverse double-counts the item, and questions that span two years are testing exactly that.",
        },
      ],
      check: {
        q: "A business receives $9,000 on 1 November for a twelve-month service contract beginning that day. Its year end is 31 December. What is reported at the year end?",
        options: [
          "Income of $9,000 and no balance",
          "Income of $1,500 and deferred income of $7,500 as a liability",
          "Income of $1,500 and accrued income of $7,500 as an asset",
          "Income of $7,500 and a prepayment of $1,500",
        ],
        correct: 1,
        explain:
          "Two of the twelve months have been earned: $9,000 × 2/12 = $1,500 of income. The remaining $7,500 has been received but not yet earned, so it is DEFERRED INCOME — a liability, because the business still owes ten months of service. Accrued income would be the opposite case: earned but not received.",
      },
    },
    {
      id: "computing",
      heading: "Working the figures with a T-account",
      blocks: [
        {
          kind: "formula",
          name: "Expense for the period from cash paid",
          expr: "Expense = Cash paid + Closing accrual − Opening accrual − Closing prepayment + Opening prepayment",
          note: "The reliable alternative is to draw the expense account, enter the opening balances, the cash and the closing balances, and let the missing figure be the expense. On a hard question the T-account is faster and much harder to get wrong.",
        },
        {
          kind: "example",
          title: "Rent expense across a year, with balances at both ends",
          scenario:
            "Cheswick Co pays rent quarterly in advance and has a 31 December year end. At 1 January there was a prepayment of $4,200, covering the quarter January to March. During the year it paid $4,200 on 1 March for April to June, $4,500 on 1 June for July to September, $4,500 on 1 September for October to December, and $4,800 on 1 December for January to March of the following year.",
          steps: [
            { label: "Total cash paid in the year", detail: "$4,200 + $4,500 + $4,500 + $4,800 = $18,000." },
            { label: "Release the opening prepayment", detail: "The $4,200 prepaid at 1 January covers January to March of THIS year, so it becomes an expense now: it is added to cash paid." },
            { label: "Identify the closing prepayment", detail: "The $4,800 paid on 1 December covers January to March of NEXT year. It is a prepayment at 31 December and is deducted." },
            { label: "Compute the expense", detail: "Expense = cash $18,000 + opening prepayment $4,200 − closing prepayment $4,800 = $17,400." },
            { label: "Prove it against the quarters covered", detail: "This year's four quarters cost $4,200 (Jan–Mar) + $4,200 (Apr–Jun) + $4,500 (Jul–Sep) + $4,500 (Oct–Dec) = $17,400. The two routes agree." },
          ],
          result:
            "Rent expense of $17,400, with a prepayment of $4,800 in current assets at the year end. The check that matters: an opening prepayment is ADDED to cash paid and a closing prepayment is DEDUCTED — reversing those two signs moves the answer by twice the balance, and adding up the quarters actually covered is what catches it.",
        },
        {
          kind: "example",
          title: "Deriving an expense with balances at both ends",
          scenario:
            "Ravenglass Co's electricity account shows an accrual of $1,100 at 1 January and an accrual of $1,450 at 31 December. Cash paid to the supplier during the year was $18,700.",
          steps: [
            { label: "Draw the expense account", detail: "Credit side: opening accrual b/d $1,100. Debit side: cash paid $18,700." },
            { label: "Enter the closing balance", detail: "The closing accrual of $1,450 is a liability carried forward, so it is entered as a balance c/d on the DEBIT side of the expense account working, ready to come down as a credit next year." },
            { label: "Total the known debits", detail: "$18,700 cash + $1,450 closing accrual = $20,150." },
            { label: "Deduct the opening accrual", detail: "$20,150 − $1,100 = $19,050, the expense transferred to profit or loss." },
            { label: "Prove it with the formula", detail: "Cash $18,700 + closing accrual $1,450 − opening accrual $1,100 = $19,050. The two routes agree." },
          ],
          result:
            "Electricity expense of $19,050, with a $1,450 accrual in current liabilities. The check that matters: the expense EXCEEDS the cash paid whenever the accrual has grown, because more has been consumed than paid for. If your expense is lower than the cash paid on a rising accrual, a sign is wrong.",
        },
      ],
      check: {
        q: "Insurance paid during the year was $14,400. There was a prepayment of $2,600 at the start and $3,100 at the end. What is the expense for the year?",
        options: ["$13,900", "$14,900", "$14,400", "$20,100"],
        correct: 0,
        explain:
          "Expense = cash $14,400 + opening prepayment $2,600 − closing prepayment $3,100 = $13,900. The opening prepayment is consumed this year so it is added; the closing prepayment belongs to next year so it is deducted. Reversing the signs gives $14,900 — the distractor, and the standard error.",
      },
    },
    {
      id: "effects",
      heading: "The effect on profit and net assets",
      blocks: [
        {
          kind: "table",
          caption: "Each adjustment, and what it does to the two statements",
          head: ["Adjustment", "Profit", "Net assets"],
          rows: [
            ["Accrual raised", "**Down**", "**Down** (liability up)"],
            ["Prepayment recognised", "**Up**", "**Up** (asset up)"],
            ["Accrued income recognised", "**Up**", "**Up** (asset up)"],
            ["Deferred income recognised", "**Down**", "**Down** (liability up)"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Omitting an adjustment misstates two figures at once",
          md: "Failing to accrue a $3,000 expense **overstates** profit by $3,000 and **overstates** net assets by $3,000. Failing to recognise a $3,000 prepayment **understates** both by $3,000. Questions asking for \"the effect on profit and on net assets\" want both directions, and they are always the same direction as each other for these four adjustments.",
        },
        {
          kind: "list",
          title: "Presentation in the financial statements",
          items: [
            "**Accruals** — within trade and other payables, in current liabilities.",
            "**Prepayments** — within trade and other receivables, in current assets.",
            "**Accrued income** — within trade and other receivables, in current assets.",
            "**Deferred income** — within current liabilities, or split between current and non-current where it extends beyond twelve months.",
            "The **expense or income** figures in profit or loss are always the amounts belonging to the period, after all four adjustments.",
          ],
        },
      ],
      check: {
        q: "A business has failed to record an accrual of $4,500 for wages. What is the effect on the financial statements?",
        options: [
          "Profit overstated $4,500; net assets overstated $4,500",
          "Profit understated $4,500; net assets overstated $4,500",
          "Profit overstated $4,500; net assets understated $4,500",
          "No effect on profit; net assets overstated $4,500",
        ],
        correct: 0,
        explain:
          "The expense is missing, so profit is OVERSTATED by $4,500, and the liability is missing, so net assets are OVERSTATED by $4,500. Both move in the same direction, which is the pattern for all four accruals adjustments — and it is why the exam can ask for the effect on both figures in a single question.",
      },
    },
    {
      id: "across-two-years",
      heading: "Following an adjustment across two years",
      blocks: [
        {
          kind: "text",
          md: "Every one of these adjustments is a **timing** device: it moves an amount out of one period and into another. So each has an equal and opposite effect the following year, and a question spanning two year ends is testing whether you know that.",
        },
        {
          kind: "example",
          title: "One accrual, two years",
          scenario:
            "Aldwick Co's year end is 31 December. In December 20X6 it consumed $5,400 of professional services which were invoiced on 20 January 20X7 and paid on 14 February 20X7. During 20X7 it also received and paid $61,000 of other professional fees relating entirely to 20X7. There was no accrual at 1 January 20X6, and none at 31 December 20X7.",
          steps: [
            { label: "20X6 — recognise the expense", detail: "The service was consumed in 20X6, so debit professional fees $5,400 and credit accruals $5,400. The 20X6 charge includes it even though no invoice existed at the year end." },
            { label: "20X6 — the position", detail: "Accruals of $5,400 sit in current liabilities at 31 December 20X6, and 20X6 profit is $5,400 lower than the cash paid in 20X6 would suggest." },
            { label: "20X7 — reverse the accrual", detail: "When the $5,400 is paid in February, the entry is debit ACCRUALS $5,400 and credit bank — not debit the expense. The cost was already charged in 20X6." },
            { label: "20X7 — the charge", detail: "Professional fees for 20X7 are the $61,000 relating to 20X7. Total cash paid in 20X7 was $66,400, but $5,400 of it belonged to 20X6." },
            { label: "Prove it with the formula", detail: "20X7 expense = cash $66,400 + closing accrual nil − opening accrual $5,400 = $61,000. The two routes agree." },
            { label: "Test the error", detail: "Debiting the expense in February would charge $66,400 to 20X7 — the same $5,400 counted twice across the two years, and an accruals balance left stranded in the ledger." },
          ],
          result:
            "$5,400 in 20X6 and $61,000 in 20X7, with the accrual reversed rather than re-expensed. The check that matters: after the payment, the **accruals account must be nil** for that item. A residual balance means the reversal was not made, and the cost has been charged twice across the two periods.",
        },
        {
          kind: "table",
          caption: "Each adjustment's effect in the following year",
          head: ["Raised at the end of year 1", "Effect in year 2"],
          rows: [
            ["Accrual — expense up, liability up", "Payment clears the LIABILITY; year 2's expense is unaffected"],
            ["Prepayment — expense down, asset up", "The asset becomes an EXPENSE of year 2"],
            ["Accrued income — income up, asset up", "The receipt clears the ASSET; year 2's income is unaffected"],
            ["Deferred income — income down, liability up", "The liability becomes INCOME of year 2 as the obligation is satisfied"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this makes the accruals basis self-correcting",
          md: "Over two periods taken together, the total expense is the same whether or not the adjustment was made — the adjustment only decides **which** period bears it. That is worth knowing for two reasons: it is why a single omitted accrual reverses out the following year, and it is why the examiner can ask about the effect on **both** years and expect opposite answers.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Reversing the signs on opening and closing prepayments.",
      fix: "Opening prepayment is ADDED to cash paid; closing prepayment is DEDUCTED. Draw the T-account if the formula feels slippery.",
    },
    {
      trap: "Confusing accrued income with deferred income.",
      fix: "Accrued income is earned but not received — an ASSET. Deferred income is received but not earned — a LIABILITY.",
    },
    {
      trap: "Failing to reverse last year's accrual when this year's payment is made.",
      fix: "The payment settles the liability, not a new expense. Without the reversal the item is charged twice.",
    },
    {
      trap: "Treating a receipt in advance as income because the cash has arrived.",
      fix: "The accruals basis recognises income when earned. Cash received for a future period is deferred income, a liability.",
    },
    {
      trap: "Adjusting only profit when asked for the effect of an omitted adjustment.",
      fix: "Each of these adjustments moves profit AND net assets, in the same direction and by the same amount.",
    },
  ],
  keyTerms: [
    { term: "Accrued expense (accrual)", def: "An expense incurred in the period but not yet paid or invoiced; a current liability." },
    { term: "Prepaid expense (prepayment)", def: "An amount paid in advance for a benefit belonging to a future period; a current asset." },
    { term: "Accrued income", def: "Income earned in the period but not yet received or invoiced; a current asset." },
    { term: "Deferred income", def: "Income received before it has been earned; a liability until the obligation is satisfied." },
    { term: "Accruals basis", def: "Recognising transactions in the period to which they relate rather than when cash moves." },
  ],
  summary: [
    "Four adjustments put income and expenses in the right period: accruals, prepayments, accrued income and deferred income.",
    "Cash behind the period gives an accrual (liability) or accrued income (asset); cash ahead gives a prepayment (asset) or deferred income (liability).",
    "Expense = cash paid + closing accrual − opening accrual − closing prepayment + opening prepayment.",
    "Every adjustment reverses in the following period, so the same item is never charged twice.",
    "Accruals and deferred income reduce profit and net assets; prepayments and accrued income increase both.",
    "Accruals and deferred income sit in liabilities; prepayments and accrued income sit within receivables.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between a prepayment and deferred income?", a: "A prepayment is an expense paid in advance — an asset. Deferred income is income received in advance — a liability. One is money we have paid out, the other money we have taken in." },
    { q: "Give the formula for an expense from cash paid.", a: "Cash paid + closing accrual − opening accrual − closing prepayment + opening prepayment." },
    { q: "Why must an accrual be reversed in the next period?", a: "Because the later payment settles the liability already recognised. Without the reversal the cost is charged to profit twice." },
    { q: "A $4,000 prepayment is omitted. What happens to profit and net assets?", a: "Both are understated by $4,000 — the expense is too high and the asset is missing." },
    { q: "Where is deferred income presented?", a: "In liabilities, current where it will be earned within twelve months, split into non-current where it extends beyond that." },
  ],
  furtherStudy: [
    "Chapter 24 puts all four adjustments into the statements at once.",
    "Chapter 27 reconstructs missing figures from exactly these relationships.",
  ],
}

/* ── Chapter 17 · D8 ───────────────────────────────────────────── */

export const FA_TREE_17: StudyChapter = {
  id: "FA-17",
  number: 17,
  paper: "FA",
  area: "D",
  title: "Receivables, irrecoverable debts and allowances",
  minutes: 18,
  syllabusRefs: ["D8(a)", "D8(b)", "D8(c)", "D8(d)", "D8(e)", "D8(f)", "D8(g)", "D8(h)", "D8(i)", "D8(j)"],
  intro:
    "Selling on credit means some customers will never pay. The accounting question is not whether to admit that, but whether this particular debt has gone or is merely doubtful — and the answer decides which of two quite different entries you make.",
  outcomes: [
    "Identify the benefits and costs of offering credit facilities and explain the purpose of an aged receivables analysis and credit limits",
    "Prepare journal entries to write off an irrecoverable debt and to record its subsequent recovery",
    "Prepare journal entries to create and adjust an allowance for receivables",
    "Demonstrate the impact of irrecoverable debts and allowances on both statements",
    "Account for a contra between trade receivables and trade payables",
  ],
  sections: [
    {
      id: "credit-control",
      heading: "Offering credit, and controlling it",
      blocks: [
        {
          kind: "table",
          caption: "The trade-off in offering credit",
          head: ["Benefits", "Costs"],
          rows: [
            ["Higher sales — many customers will not buy on any other terms", "Some debts are never collected at all"],
            ["Competitive parity with other suppliers", "Cash is tied up between sale and receipt, so working capital is needed to fund it"],
            ["Longer, closer customer relationships", "Administration: invoicing, statements, chasing, credit checks"],
            ["Ability to sell larger orders than a customer could pay for at once", "Risk of financing a customer who is already failing"],
          ],
        },
        {
          kind: "definition",
          term: "Aged receivables analysis",
          md: "A schedule of the amounts owed by each customer, split by **how long each balance has been outstanding** — current, 30 days, 60 days, 90 days and over. Its purpose is to direct attention: an old balance is far more likely to be uncollectable than a recent one, and this is the schedule from which the allowance for receivables is set.",
        },
        {
          kind: "definition",
          term: "Credit limit",
          md: "The maximum a business is prepared to be owed by one customer at any time. It caps the loss if that customer fails and forces a fresh decision before further exposure is taken on.",
        },
      ],
    },
    {
      id: "irrecoverable-debts",
      heading: "Irrecoverable debts, and their recovery",
      blocks: [
        {
          kind: "definition",
          term: "Irrecoverable debt",
          md: "A receivable the business has concluded will **not be collected** — the customer has gone into liquidation, disappeared, or the claim has otherwise failed. The debt is removed from receivables entirely and charged as an expense.",
        },
        {
          kind: "table",
          caption: "The three entries, and how they differ",
          head: ["Event", "Debit", "Credit"],
          rows: [
            ["Debt written off as irrecoverable", "Irrecoverable debts expense", "Trade receivables"],
            ["A debt written off in a PREVIOUS year is unexpectedly received", "Bank", "Irrecoverable debts recovered (income)"],
            ["Contra: the same party is both a customer and a supplier", "Trade payables", "Trade receivables"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "A recovered debt is not reinstated first",
          md: "When cash arrives for a debt written off in an earlier year, you do **not** reinstate the receivable and then clear it. The receivable no longer exists. Debit bank and credit **irrecoverable debts recovered** — income of the current period, often netted against the current year's irrecoverable debts expense. Reinstating the debt is a two-step answer to a one-step problem, and it leaves the receivables balance wrong at every intermediate stage.",
        },
        {
          kind: "definition",
          term: "Contra",
          md: "Where the same party is both a **customer and a supplier**, the two balances may be set off against each other to the extent of the smaller. Debit trade payables and credit trade receivables with that amount. The remaining balance stays on whichever side it fell.",
        },
        {
          kind: "illustration",
          title: "A contra worked through",
          md: "Marlborough Co is owed $8,400 by Denner Ltd and owes Denner $3,100 for supplies. Both agree to set the smaller amount off.\n\nDebit trade payables $3,100 and credit trade receivables $3,100. Marlborough is left owed $5,300 by Denner and owes nothing.\n\nNote what has NOT happened: no cash moved, no expense or income arose, and profit is unchanged. Total net assets are unchanged too — an asset and a liability both fell by $3,100. A candidate who routes a contra through profit or loss has invented income out of an administrative convenience.",
        },
      ],
      check: {
        q: "A debt of $2,300 written off two years ago is unexpectedly paid in full. What is the correct entry?",
        options: [
          "Debit trade receivables $2,300, credit irrecoverable debts $2,300; then debit bank, credit receivables",
          "Debit bank $2,300, credit irrecoverable debts recovered $2,300",
          "Debit bank $2,300, credit trade receivables $2,300",
          "Debit bank $2,300, credit allowance for receivables $2,300",
        ],
        correct: 1,
        explain:
          "One entry: debit bank and credit irrecoverable debts recovered, which is income of the current period. The receivable was removed two years ago and does not exist, so option 3 would create a negative receivable, and option 1 reinstates a balance only to clear it again. The allowance is a separate mechanism entirely.",
      },
    },
    {
      id: "allowance",
      heading: "The allowance for receivables",
      blocks: [
        {
          kind: "definition",
          term: "Allowance for receivables",
          md: "An estimate of the receivables that are **doubtful** — not known to have failed, but unlikely on the evidence to be collected in full. The receivable stays on the books at its full amount; the allowance is deducted from it to give the figure reported.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The one rule that carries most of the marks on this topic",
          md: "**Only the MOVEMENT in the allowance is charged to profit or loss.** The closing allowance sits in the statement of financial position as a deduction from receivables; profit is charged (or credited) with the increase (or decrease) since last year. Charging the whole closing allowance to profit is the classic error, and it double-counts every year's opening balance.",
        },
        {
          kind: "formula",
          name: "Charge to profit or loss",
          expr: "Charge = Irrecoverable debts written off + (Closing allowance − Opening allowance) − Debts recovered",
          note: "A DECREASE in the allowance is a credit to profit or loss, which reduces the charge and can make it negative.",
        },
        {
          kind: "example",
          title: "A full year of receivables adjustments",
          scenario:
            "At 1 January, Pennington Co had trade receivables of $186,000 and an allowance for receivables of $7,400. During the year it wrote off $5,900 of specific debts and received $800 in respect of a debt written off in a previous year. At 31 December, before any adjustment, trade receivables stood at $214,000, of which a specific balance of $9,000 is now considered irrecoverable. The company then wishes to carry an allowance of 4% against the remaining receivables.",
          steps: [
            { label: "Write off the specific debt", detail: "Debit irrecoverable debts $9,000, credit receivables $9,000. Receivables fall to $214,000 − $9,000 = $205,000." },
            { label: "Compute the required closing allowance", detail: "$205,000 × 4% = $8,200. The percentage is applied AFTER the specific write-off, not before — writing off and then allowing against the same debt would provide for it twice." },
            { label: "Find the movement", detail: "Closing allowance $8,200 less opening allowance $7,400 = an INCREASE of $800. Only this $800 is charged to profit." },
            { label: "Assemble the charge to profit or loss", detail: "Write-offs during the year $5,900 + specific write-off $9,000 + increase in allowance $800 − debt recovered $800 = $14,900." },
            { label: "Present the receivables", detail: "Trade receivables $205,000 less allowance $8,200 = $196,800 within current assets." },
            { label: "Check the two figures do different jobs", detail: "$14,900 is the expense for the year; $8,200 is a balance at the year end. The only part of the allowance that touched profit was the $800 movement." },
          ],
          result:
            "An irrecoverable debts expense of $14,900 and net receivables of $196,800. The check that matters: had the whole $8,200 allowance been charged, the expense would have been $22,300 — overstated by exactly the $7,400 opening allowance that was already charged to last year's profit.",
        },
        {
          kind: "table",
          caption: "Write-off or allowance — which entry",
          head: ["Situation", "Treatment"],
          rows: [
            ["Customer in liquidation, no dividend expected", "**Write off** — remove from receivables, charge the expense"],
            ["Balance 120 days overdue, customer still trading and disputing", "**Allowance** — receivable stays, allowance deducted"],
            ["A general percentage against all balances over 90 days", "**Allowance** based on the aged analysis"],
            ["Debt written off last year, cash now received", "Income: irrecoverable debts recovered"],
            ["Customer who is also a supplier", "**Contra** — set off against the payable, no effect on profit"],
          ],
        },
      ],
      check: {
        q: "Opening allowance for receivables was $6,000. Closing receivables after write-offs are $180,000 and the required allowance is 5%. Write-offs in the year were $4,200. What is charged to profit or loss?",
        options: ["$13,200", "$7,200", "$4,200", "$15,000"],
        correct: 1,
        explain:
          "The required closing allowance is $180,000 × 5% = $9,000, so the MOVEMENT is $9,000 − $6,000 = $3,000. The charge is write-offs $4,200 + increase $3,000 = $7,200. Charging the whole $9,000 closing allowance gives $13,200 — overstated by the $6,000 opening allowance already charged last year.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Charging the whole closing allowance to profit or loss.",
      fix: "Only the MOVEMENT in the allowance hits profit. The closing balance is a deduction from receivables in the statement of financial position.",
    },
    {
      trap: "Applying the allowance percentage before deducting specific write-offs.",
      fix: "Write off first, then apply the percentage to what remains — otherwise the same debt is provided for twice.",
    },
    {
      trap: "Reinstating a receivable when a written-off debt is recovered.",
      fix: "Debit bank and credit irrecoverable debts recovered. The receivable was removed and does not exist.",
    },
    {
      trap: "Routing a contra through profit or loss.",
      fix: "Debit payables, credit receivables. No cash moves, no income or expense arises, and net assets are unchanged.",
    },
    {
      trap: "Writing off a debt that is merely doubtful.",
      fix: "A write-off is for a debt concluded to have failed. A doubtful balance stays on the books with an allowance against it.",
    },
    {
      trap: "Forgetting that a DECREASE in the allowance is a credit to profit.",
      fix: "The movement can go either way. A fall in the required allowance reduces the expense and can make the year's charge negative.",
    },
  ],
  keyTerms: [
    { term: "Irrecoverable debt", def: "A receivable concluded to be uncollectable, removed from receivables and charged as an expense." },
    { term: "Allowance for receivables", def: "An estimate of doubtful receivables, deducted from receivables in the statement of financial position." },
    { term: "Aged receivables analysis", def: "A schedule of amounts owed split by how long each has been outstanding, used to direct collection effort and set the allowance." },
    { term: "Credit limit", def: "The maximum a business will allow one customer to owe at any time." },
    { term: "Contra", def: "Setting off a receivable against a payable for the same party, to the extent of the smaller balance." },
    { term: "Irrecoverable debts recovered", def: "Income arising when a debt written off in an earlier period is subsequently received." },
  ],
  summary: [
    "Offering credit raises sales and brings bad debts, tied-up cash and administration.",
    "An aged analysis directs collection effort and provides the basis for the allowance.",
    "An irrecoverable debt is written off: debit the expense, credit receivables.",
    "A debt recovered after write-off is income of the current period; the receivable is not reinstated.",
    "The allowance leaves receivables intact and is deducted on presentation.",
    "Only the movement in the allowance is charged to profit or loss, and a decrease is a credit.",
    "Apply the allowance percentage after specific write-offs, and put a contra through payables and receivables only.",
  ],
  knowledgeDiagnostic: [
    { q: "What part of the allowance for receivables affects profit?", a: "Only the movement — the closing allowance less the opening allowance. The closing balance itself is a deduction from receivables." },
    { q: "How is a debt recovered after write-off recorded?", a: "Debit bank and credit irrecoverable debts recovered. The receivable was removed in the earlier year and is not reinstated." },
    { q: "In what order do a specific write-off and a percentage allowance apply?", a: "Write off the specific debt first, then apply the percentage to the remaining receivables, so the same debt is not provided for twice." },
    { q: "What is a contra and what is its effect on profit?", a: "Setting a receivable off against a payable for the same party. No effect on profit at all — an asset and a liability both fall." },
    { q: "When is a write-off used rather than an allowance?", a: "When the debt is concluded to have failed. A balance that is merely doubtful stays on the books with an allowance against it." },
  ],
  furtherStudy: [
    "Chapter 21's receivables control account reconciles to the individual customer accounts.",
    "Chapter 30 computes receivables collection days from the net figure.",
  ],
}

/* ── Chapter 18 · D9 ───────────────────────────────────────────── */

export const FA_TREE_18: StudyChapter = {
  id: "FA-18",
  number: 18,
  paper: "FA",
  area: "D",
  title: "Payables, provisions and contingencies",
  minutes: 16,
  syllabusRefs: ["D8(a)", "D9(a)", "D9(b)", "D9(c)", "D9(d)", "D9(e)", "D9(f)"],
  intro:
    "Three outcomes for one uncertain obligation: recognise it, disclose it, or ignore it. Probability decides which, and the thresholds are not symmetrical between liabilities and assets.",
  outcomes: [
    "Identify and explain examples of payables",
    "Define a provision, a contingent liability and a contingent asset",
    "Distinguish between them and classify given items",
    "Calculate provisions and changes in provisions and prepare the journal entries",
    "Report provisions and contingencies in the financial statements",
  ],
  sections: [
    {
      id: "payables",
      heading: "Payables, and where a provision differs from them",
      blocks: [
        {
          kind: "list",
          title: "The liabilities a business routinely carries",
          items: [
            "**Trade payables** — amounts owed to suppliers for goods and services, invoiced and agreed as to amount and timing.",
            "**Accruals** — costs incurred but not yet invoiced; the amount is estimated but the obligation is certain.",
            "**Sales tax payable** — output tax collected less recoverable input tax.",
            "**Payroll liabilities** — net wages, employee deductions and employer contributions not yet paid over.",
            "**Income tax payable** — the estimated tax charge on the period's profit, not yet settled.",
            "**Loans and overdrafts**, split between the amount due within twelve months and the rest.",
            "**Provisions** — obligations where the amount or the timing is uncertain.",
            "**Deferred income** — amounts received before the obligation to the customer has been satisfied.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction the exam builds questions on",
          md: "A **trade payable** is certain in amount and timing. An **accrual** is certain to exist but the amount is estimated. A **provision** is uncertain in **amount or timing**, though the obligation itself is present. The uncertainty is the whole difference — and it is why provisions attract a standard of their own while trade payables do not.",
        },
      ],
    },
    {
      id: "provisions",
      heading: "Provisions: the recognition test",
      blocks: [
        {
          kind: "definition",
          term: "Provision",
          md: "A liability of **uncertain timing or amount**. It is recognised only where all three of these hold: a **present obligation** exists, traceable to something that has already happened; settling it will **probably** require economic benefits to flow out; and the amount can be **estimated reliably**.",
        },
        {
          kind: "definition",
          term: "Contingent liability",
          md: "A **possible** obligation arising from a past event whose existence will be confirmed only by a future event; or a present obligation not recognised because an outflow is **not probable** or the amount **cannot be reliably estimated**. It is **disclosed**, not recognised — unless the possibility of outflow is remote, in which case nothing is said at all.",
        },
        {
          kind: "definition",
          term: "Contingent asset",
          md: "A **possible** asset arising from a past event whose existence will be confirmed by a future event. Disclosed where an inflow is **probable**; recognised only when it is **virtually certain**, at which point it is no longer contingent.",
        },
        {
          kind: "table",
          caption: "The decision table — and note the asymmetry",
          head: ["Likelihood", "Obligation (liability)", "Possible inflow (asset)"],
          rows: [
            ["**Virtually certain**", "Recognise a liability", "**Recognise** an asset"],
            ["**Probable** (more likely than not)", "**Recognise** a provision", "**Disclose** only"],
            ["**Possible** but not probable", "**Disclose** as a contingent liability", "**No disclosure**"],
            ["**Remote**", "**Ignore** — no provision, no disclosure", "Ignore"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why the two columns are not mirror images",
          md: "Prudence. A **probable** obligation is recognised, but a **probable** gain is only disclosed — because recognising a gain that has not yet materialised overstates both profit and assets on the strength of an expectation. So the threshold for recognising an asset is higher than for recognising a liability, and the exam tests precisely this by giving you a probable inflow and asking whether to recognise it.",
        },
        {
          kind: "table",
          caption: "The entries",
          head: ["Event", "Debit", "Credit"],
          rows: [
            ["Creating a provision", "The relevant expense", "Provision"],
            ["Increasing an existing provision", "The relevant expense", "Provision (with the increase only)"],
            ["Reducing a provision no longer needed", "Provision", "The relevant expense (a credit to profit)"],
            ["Settling the obligation in cash", "Provision", "Bank"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Only the movement goes to profit",
          md: "As with the allowance for receivables, it is the **change** in the provision that is charged or credited to profit or loss, not the closing balance. A provision that rises from $30,000 to $46,000 charges $16,000 to profit — not $46,000 — and one that falls releases the difference as a credit.",
        },
        {
          kind: "example",
          title: "Three uncertain situations, three different answers",
          scenario:
            "At its year end Ludworth Co faces three matters. (1) A customer is suing for $250,000 over a faulty installation; the company's lawyers say it will probably lose and estimate the settlement at $180,000. (2) A supplier is claiming $60,000 for an alleged breach of contract; the lawyers say the claim is possible but unlikely to succeed. (3) Ludworth is itself suing an insurer for $95,000, and its lawyers consider recovery probable. Ludworth's existing warranty provision is $30,000, and the expected cost of honouring warranties on this year's sales is $46,000.",
          steps: [
            { label: "1 · The customer's claim", detail: "A present obligation from a past event, an outflow is PROBABLE, and $180,000 is a reliable estimate — all three conditions met. Recognise a provision of $180,000: debit expenses, credit provisions." },
            { label: "2 · The supplier's claim", detail: "Possible but not probable, so no provision. DISCLOSE as a contingent liability, describing the claim, the amount and the uncertainty. Nothing enters profit or the statement of financial position." },
            { label: "3 · The insurance claim", detail: "A probable INFLOW is a contingent asset — DISCLOSE only. It is not recognised, because the threshold for an asset is virtual certainty. Recognising $95,000 here would overstate profit and assets." },
            { label: "The warranty provision", detail: "The required balance is $46,000 against an existing $30,000, so the INCREASE of $16,000 is charged to profit. The provision is carried at $46,000." },
            { label: "Total the charge to profit", detail: "$180,000 for the legal claim + $16,000 warranty increase = $196,000. Nothing for items 2 and 3." },
          ],
          result:
            "Provisions of $226,000 in the statement of financial position, a charge to profit of $196,000, and two disclosures — one contingent liability and one contingent asset. The check that matters: the probable OUTFLOW was recognised while the probable INFLOW was only disclosed. A candidate who treats the two symmetrically recognises $95,000 of income that may never arrive.",
        },
      ],
      check: {
        q: "A company is defending a claim it will probably lose, with a reliable estimate of $70,000, and is pursuing a claim of $40,000 that its lawyers say it will probably win. What is recognised?",
        options: [
          "A provision of $70,000 and an asset of $40,000",
          "A provision of $70,000 only; the $40,000 is disclosed",
          "A net provision of $30,000",
          "Neither is recognised; both are disclosed",
        ],
        correct: 1,
        explain:
          "The probable obligation is RECOGNISED as a provision of $70,000. The probable inflow is a contingent ASSET, which is only DISCLOSED — recognition requires virtual certainty. The asymmetry is deliberate prudence, and netting the two off compounds two errors at once.",
      },
    },
    {
      id: "measuring-a-provision",
      heading: "Measuring the provision once you have decided to make one",
      blocks: [
        {
          kind: "definition",
          term: "Best estimate",
          md: "A provision is measured at the **best estimate** of the expenditure required to settle the obligation at the reporting date — the amount the entity would rationally pay to settle it or to transfer it to a third party. It is not the worst case, and it is not the cheapest case.",
        },
        {
          kind: "list",
          style: "number",
          title: "How the best estimate is arrived at",
          items: [
            "For a **single** obligation, use the **most likely** outcome — though other possible outcomes are considered, and where they are mostly higher or mostly lower the estimate moves in that direction.",
            "For a **large population** of similar obligations — warranty claims across thousands of units — use the **expected value**: each outcome weighted by its probability.",
            "Where the outcome lies in a **range** and no point within it is more likely than another, use the **mid-point** of the range.",
            "Take account of **risks and uncertainties**, without duplicating an adjustment already made.",
            "**Do not deduct** an expected reimbursement from the provision. Recognise the reimbursement separately as an asset, and only where its receipt is virtually certain.",
          ],
        },
        {
          kind: "example",
          title: "Two obligations, two measurement bases",
          scenario:
            "Ravensbourne Co faces two matters at its year end. First, it sold 40,000 units under a one-year warranty. Experience shows that 88% of units need no repair, 9% need a minor repair costing $18 and 3% need a major repair costing $110. Second, it is defending a single claim which its lawyers say it will probably lose, with the settlement falling somewhere between $150,000 and $250,000 and no figure within that range more likely than another. An insurer has indicated it will probably meet $60,000 of any settlement, though nothing is yet agreed.",
          steps: [
            { label: "The warranty — identify the basis", detail: "A large population of similar obligations, so the EXPECTED VALUE applies rather than the most likely outcome. The most likely outcome for any single unit is no repair at all, which would give a provision of nil — plainly wrong for 40,000 units." },
            { label: "The warranty — compute it", detail: "Minor: 40,000 × 9% × $18 = $64,800. Major: 40,000 × 3% × $110 = $132,000. No repair: nil. Provision = $196,800." },
            { label: "The claim — identify the basis", detail: "A SINGLE obligation in a range with no point more likely, so the MID-POINT applies: ($150,000 + $250,000) ÷ 2 = $200,000." },
            { label: "The insurance recovery", detail: "Do NOT net it off. The provision stays at $200,000. The $60,000 is only PROBABLE, and a reimbursement asset requires virtual certainty — so it is disclosed, not recognised, and certainly not deducted." },
            { label: "Total the provisions", detail: "$196,800 + $200,000 = $396,800 in liabilities, with the expense charged to profit or loss (or, for the warranty, to cost of sales where the question directs)." },
            { label: "Check the traps", detail: "Netting the insurance would understate liabilities by $60,000. Using the most likely warranty outcome would understate them by $196,800. Using the lowest point of the range would understate them by a further $50,000 and breach neutrality." },
          ],
          result:
            "Provisions of $396,800. Three checks matter: a POPULATION uses expected value while a SINGLE obligation uses the most likely outcome or the mid-point of a range; an expected reimbursement is never netted off; and the estimate is the best one available, not the most cautious one available.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The reimbursement rule catches people out",
          md: "It seems obvious to show the net exposure — after all, the insurer will pay. But the entity still owes the **whole** amount to the claimant, and the insurer might not pay. So the liability is reported gross, and any recovery is a **separate asset** recognised only when receipt is virtually certain. Reporting net understates both the liability and the asset, and hides a real risk.",
        },
      ],
      check: {
        q: "A company sold 20,000 units under warranty. 90% will need no repair, 7% a repair costing $25 and 3% a repair costing $90. What provision is required?",
        options: ["$89,000", "Nil, because no repair is the most likely outcome", "$1,150,000", "$54,000"],
        correct: 0,
        explain:
          "A large POPULATION of similar obligations uses the EXPECTED VALUE: (20,000 × 7% × $25) + (20,000 × 3% × $90) = $35,000 + $54,000 = $89,000. The most-likely-outcome basis applies to a SINGLE obligation, and using it here would give nil — obviously wrong when thousands of claims will arrive.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Recognising a contingent asset because an inflow is probable.",
      fix: "Probable inflows are DISCLOSED. Recognition requires the inflow to be virtually certain.",
    },
    {
      trap: "Charging the whole closing provision to profit rather than the movement.",
      fix: "Only the increase (or decrease) since last year touches profit. The closing balance is a liability.",
    },
    {
      trap: "Providing for a possible but not probable obligation.",
      fix: "Possible means DISCLOSE as a contingent liability. Probable means recognise.",
    },
    {
      trap: "Disclosing a remote possibility.",
      fix: "Remote means say nothing at all — no provision and no disclosure.",
    },
    {
      trap: "Treating a provision as an accrual, or vice versa.",
      fix: "An accrual is certain to exist with an estimated amount; a provision is uncertain in amount OR timing. The uncertainty is the distinction.",
    },
    {
      trap: "Providing for a future operating loss or a planned restructuring with no obligation yet.",
      fix: "There must be a present obligation from a PAST event. An intention or a plan is neither.",
    },
  ],
  keyTerms: [
    { term: "Provision", def: "A liability of uncertain timing or amount, recognised when a present obligation from a past event will probably require an outflow that can be reliably estimated." },
    { term: "Contingent liability", def: "A possible obligation, or a present obligation whose outflow is not probable or cannot be reliably estimated; disclosed unless remote." },
    { term: "Contingent asset", def: "A possible asset from a past event; disclosed if an inflow is probable and recognised only when virtually certain." },
    { term: "Present obligation", def: "A duty arising from a past event that the entity has no practical ability to avoid." },
    { term: "Trade payable", def: "An amount owed to a supplier, certain in both amount and timing." },
  ],
  summary: [
    "Payables run from certain trade balances through estimated accruals to provisions uncertain in amount or timing.",
    "A provision needs a present obligation from a past event, a probable outflow and a reliable estimate.",
    "A possible obligation is disclosed as a contingent liability; a remote one is ignored entirely.",
    "A contingent asset is disclosed when probable and recognised only when virtually certain.",
    "The asymmetry between liabilities and assets is prudence, and the exam tests it directly.",
    "Only the movement in a provision is charged or credited to profit or loss.",
    "No provision arises for a future operating loss or a plan with no present obligation.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three conditions for recognising a provision.", a: "A present obligation from a past event, a probable outflow of economic benefits, and a reliable estimate of the amount." },
    { q: "How is a possible but not probable obligation reported?", a: "Disclosed as a contingent liability, describing the nature, the amount and the uncertainty — unless the possibility is remote, in which case nothing is disclosed." },
    { q: "Why is a probable inflow only disclosed when a probable outflow is recognised?", a: "Prudence. Recognising an unrealised gain would overstate profit and assets, so the threshold for an asset is virtual certainty." },
    { q: "A provision rises from $22,000 to $35,000. What is charged to profit?", a: "The movement of $13,000, not the closing balance of $35,000." },
    { q: "What distinguishes a provision from an accrual?", a: "An accrual is certain to exist with only the amount estimated; a provision is uncertain in amount or timing." },
  ],
  furtherStudy: [
    "Chapter 25 covers the provisions disclosure note and events after the reporting period.",
    "FR develops IAS 37 into onerous contracts, restructuring provisions and discounting.",
  ],
}

/* ── Chapter 19 · D10 ──────────────────────────────────────────── */

export const FA_TREE_19: StudyChapter = {
  id: "FA-19",
  number: 19,
  paper: "FA",
  area: "D",
  title: "Capital structure, share issues, dividends and finance costs",
  minutes: 19,
  syllabusRefs: ["D10(a)", "D10(b)", "D10(c)", "D10(d)", "D10(e)", "D10(f)", "D10(g)", "D10(h)", "D10(i)", "D10(j)", "D10(k)", "G2(c)"],
  intro:
    "Two ways to fund a company, and the accounting treats them completely differently. The moment you can say whether an instrument is equity or debt, the entries follow — and so does the effect on profit.",
  outcomes: [
    "Describe the capital structure of a limited liability company: ordinary shares, preference shares and borrowings",
    "Describe the nature of equity and identify the other components of equity",
    "Record movements in share capital and share premium, including bonus and rights issues",
    "Calculate and record dividends and finance costs",
    "Record the income tax expense, including an under- or over-provision from the prior year",
    "Name the rows and columns that make up the equity statement",
  ],
  sections: [
    {
      id: "equity-or-debt",
      heading: "The capital structure, and the equity-or-debt question",
      blocks: [
        {
          kind: "table",
          caption: "The three sources, and how each is treated",
          head: ["Instrument", "Classification", "The return on it"],
          rows: [
            ["**Ordinary shares**", "**Equity**", "Dividends — a distribution of profit, deducted in the statement of changes in equity"],
            ["**Irredeemable preference shares**", "**Equity**", "Preference dividends — treated as a distribution"],
            ["**Redeemable preference shares**", "**Liability** — the company must repay", "The dividend is a **finance cost** in profit or loss"],
            ["**Loan notes, debentures and bank loans**", "**Liability**", "Interest — a finance cost in profit or loss"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The test, and the reason it matters",
          md: "**Is the company obliged to hand the money back?** If yes, it is a **liability** and the return on it is a **finance cost that reduces profit**. If no, it is **equity** and the return is a **distribution that does not touch profit**.\n\nThis is substance over form in action: redeemable preference shares are called shares and behave like debt, so they are accounted for as debt. Misclassifying them moves the dividend out of profit and understates gearing at the same time.",
        },
        {
          kind: "definition",
          term: "Nominal value and share premium",
          md: "A share has a **nominal (par) value** — say $0.50 — which is what is credited to **share capital**. Anything received above that is credited to the **share premium** account. Share premium is part of equity and its use is restricted; it is not distributable as a dividend.",
        },
        {
          kind: "list",
          title: "The components of equity you may meet",
          items: [
            "**Share capital** — the nominal value of shares issued.",
            "**Share premium** — proceeds received in excess of nominal value.",
            "**Revaluation surplus** — unrealised gains on revalued assets (chapter 14).",
            "**Retained earnings** — accumulated profits not yet distributed.",
            "**Other reserves** — where the question names one.",
          ],
        },
        {
          kind: "example",
          title: "Splitting an issue between capital and premium",
          scenario:
            "Wraysbury Co issues 400,000 ordinary shares of $0.25 each at a price of $1.10 per share, fully paid in cash.",
          steps: [
            { label: "Compute the total proceeds", detail: "400,000 × $1.10 = $440,000 received in cash." },
            { label: "Compute the nominal amount", detail: "400,000 × $0.25 = $100,000 credited to share capital." },
            { label: "Compute the premium", detail: "$440,000 − $100,000 = $340,000, or 400,000 × $0.85, credited to share premium." },
            { label: "Record the issue", detail: "Debit bank $440,000; credit share capital $100,000 and share premium $340,000." },
            { label: "Check the split", detail: "Share capital must equal shares × NOMINAL value, never shares × issue price. Crediting the whole $440,000 to share capital overstates share capital by exactly the premium." },
          ],
          result:
            "Cash of $440,000, share capital up $100,000 and share premium up $340,000. Total equity rises by $440,000 either way — but the split matters, because share premium is not distributable while retained earnings are, and the exam asks for both balances separately.",
        },
      ],
      check: {
        q: "A company has $2m of redeemable preference shares paying a 6% dividend. How is the $120,000 annual dividend reported?",
        options: [
          "As a deduction from retained earnings in the statement of changes in equity",
          "As a finance cost in profit or loss",
          "As other comprehensive income",
          "It is not reported until the shares are redeemed",
        ],
        correct: 1,
        explain:
          "REDEEMABLE preference shares are a LIABILITY — the company must repay them — so the dividend on them is a FINANCE COST in profit or loss, reducing profit. Only dividends on equity instruments, including irredeemable preference shares, are distributions shown in the statement of changes in equity.",
      },
    },
    {
      id: "bonus-and-rights",
      heading: "Bonus issues and rights issues",
      blocks: [
        {
          kind: "definition",
          term: "Bonus (capitalisation) issue",
          md: "Free shares issued to existing shareholders in proportion to their holdings, funded by **capitalising a reserve**. **No cash is received** and total equity does not change — the transaction moves an amount from a reserve into share capital.",
        },
        {
          kind: "definition",
          term: "Rights issue",
          md: "New shares offered to **existing shareholders** in proportion to their holdings, usually at a price below market value. Cash **is** received, so equity increases; any excess over nominal value goes to share premium.",
        },
        {
          kind: "table",
          caption: "The comparison the exam tests",
          head: ["", "Bonus issue", "Rights issue"],
          rows: [
            ["Cash received", "**None**", "**Yes**, at the issue price"],
            ["Effect on total equity", "**No change**", "**Increases** by the cash received"],
            ["Reserve used", "Share premium first where available, otherwise retained earnings", "None — share premium is created, not used"],
            ["Advantage", "Rewards shareholders without cash leaving; improves marketability by lowering the share price", "Raises cash more cheaply than a public issue, and existing holdings are not diluted if rights are taken up"],
            ["Disadvantage", "Raises no funds; reduces reserves available for distribution", "Shareholders who cannot subscribe are diluted; the discount reduces proceeds"],
          ],
        },
        {
          kind: "example",
          title: "A rights issue followed by a bonus issue",
          scenario:
            "Thornbury Co has 600,000 ordinary shares of $0.50 each, share premium of $250,000 and retained earnings of $780,000. It makes a 1-for-4 rights issue at $1.40 per share, fully taken up. It then makes a 1-for-5 bonus issue, using the share premium account as far as possible.",
          steps: [
            { label: "Rights issue — number of shares", detail: "600,000 ÷ 4 = 150,000 new shares. Cash received = 150,000 × $1.40 = $210,000." },
            { label: "Rights issue — the split", detail: "Nominal 150,000 × $0.50 = $75,000 to share capital; premium 150,000 × $0.90 = $135,000 to share premium. Debit bank $210,000." },
            { label: "Position after the rights issue", detail: "Shares 750,000; share capital $375,000; share premium $250,000 + $135,000 = $385,000; retained earnings unchanged at $780,000." },
            { label: "Bonus issue — number of shares", detail: "750,000 ÷ 5 = 150,000 bonus shares, nominal value 150,000 × $0.50 = $75,000." },
            { label: "Bonus issue — the entry", detail: "Debit share premium $75,000, credit share capital $75,000. No cash, no change in total equity. Share premium falls to $310,000." },
            { label: "Final position and check", detail: "Shares 900,000; share capital $450,000; share premium $310,000; retained earnings $780,000. Total equity $1,540,000 = the opening $1,330,000 plus the $210,000 of rights cash — the bonus issue contributed nothing." },
          ],
          result:
            "Share capital $450,000, share premium $310,000, retained earnings $780,000. The check that matters: total equity rose only by the cash the rights issue brought in. If your total equity changed on the bonus issue, an amount has been created out of nothing — the bonus issue is a transfer between two equity accounts and neither cash nor profit is involved.",
        },
      ],
      check: {
        q: "A company with 400,000 $1 shares and share premium of $60,000 makes a 1-for-8 bonus issue. What is the effect?",
        options: [
          "Cash up $50,000 and share capital up $50,000",
          "Share capital up $50,000, share premium down $50,000, total equity unchanged",
          "Share capital up $50,000, retained earnings down $50,000, share premium unchanged",
          "Share capital up $50,000 and total equity up $50,000",
        ],
        correct: 1,
        explain:
          "400,000 ÷ 8 = 50,000 shares of $1 = $50,000 to share capital, funded from share premium, which has enough ($60,000) to cover it. No cash arises and TOTAL EQUITY IS UNCHANGED — that is the defining feature of a bonus issue. Retained earnings are only used where the premium account is insufficient.",
      },
    },
    {
      id: "dividends-tax-socie",
      heading: "Dividends, finance costs, income tax and the statement of changes in equity",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Dividends — the rules that get tested",
          items: [
            "A dividend on **equity** shares is a **distribution**, never an expense. It appears in the statement of changes in equity as a deduction from retained earnings.",
            "It is recognised when it is **declared and becomes an obligation** — a dividend merely proposed after the reporting date is not a liability at that date, though it may be disclosed.",
            "**Interim** dividends paid during the year and **final** dividends declared for the year are both deducted from retained earnings.",
            "A dividend of \"$0.06 per share\" is computed on the **number of shares in issue** at the relevant date — after any bonus or rights issue that has already happened.",
          ],
        },
        {
          kind: "formula",
          name: "Finance cost and income tax",
          expr: "Finance cost = Interest accrued for the period on borrowings (and on redeemable preference shares)   ·   Income tax expense = Estimate for this year ± prior-year under/over-provision",
          note: "Interest is accrued for the period whether or not it has been paid; an unpaid amount is an accrual. Under-provision INCREASES this year's tax charge; over-provision reduces it.",
        },
        {
          kind: "example",
          title: "Finance cost, tax and the equity statement in one year",
          scenario:
            "Ellersley Co has $500,000 of 8% loan notes on which interest is paid half-yearly on 30 June and 31 December, and $200,000 of 5% redeemable preference shares whose dividend is paid annually in arrears each March. Profit before finance costs and tax is $640,000. Last year's income tax liability was estimated at $88,000 and settled at $93,000. This year's tax charge is estimated at $102,000. The company paid an interim ordinary dividend of $40,000 and declared a final ordinary dividend of $65,000 before the year end. Opening retained earnings were $1,240,000.",
          steps: [
            { label: "Loan note interest", detail: "$500,000 × 8% = $40,000 for the year, both instalments paid. A finance cost." },
            { label: "Preference dividend", detail: "The shares are REDEEMABLE, so they are a liability and the $200,000 × 5% = $10,000 dividend is a FINANCE COST, accrued because it is not paid until March." },
            { label: "Total finance costs and profit before tax", detail: "$40,000 + $10,000 = $50,000. Profit before tax = $640,000 − $50,000 = $590,000." },
            { label: "Income tax expense", detail: "Last year was under-provided by $93,000 − $88,000 = $5,000, which INCREASES this year's charge. Tax expense = $102,000 + $5,000 = $107,000. Profit for the year = $590,000 − $107,000 = $483,000." },
            { label: "Ordinary dividends", detail: "Interim $40,000 paid plus final $65,000 declared before the year end = $105,000, deducted from retained earnings — not from profit." },
            { label: "Closing retained earnings", detail: "$1,240,000 + $483,000 − $105,000 = $1,618,000." },
          ],
          result:
            "Finance costs $50,000, income tax expense $107,000, profit for the year $483,000 and closing retained earnings $1,618,000. Two checks that matter: the preference dividend reduced PROFIT because the shares are redeemable, while the ordinary dividends did not touch profit at all; and the prior-year under-provision was ADDED to the tax charge — treating it as a deduction would understate the expense by $10,000, being twice the $5,000 difference.",
        },
        {
          kind: "table",
          caption: "The statement of changes in equity — columns and rows",
          head: ["", "Share capital", "Share premium", "Revaluation surplus", "Retained earnings", "Total"],
          rows: [
            ["Balance brought forward", "X", "X", "X", "X", "X"],
            ["Profit for the year", "—", "—", "—", "**X**", "X"],
            ["Other comprehensive income", "—", "—", "**X**", "—", "X"],
            ["Share issue", "**X**", "**X**", "—", "—", "X"],
            ["Bonus issue", "**X**", "**(X)**", "—", "—", "**Nil**"],
            ["Transfer of excess depreciation", "—", "—", "**(X)**", "**X**", "**Nil**"],
            ["Dividends", "—", "—", "—", "**(X)**", "(X)"],
            ["Balance carried forward", "X", "X", "X", "X", "X"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Two rows that must total nil",
          md: "A **bonus issue** and a **transfer of excess depreciation** both move amounts between equity accounts, so each row's total must be **nil**. If either row shows a total, an amount has been created or destroyed inside equity — and it is the fastest check on a statement of changes in equity you have just prepared.",
        },
      ],
      check: {
        q: "Last year's income tax liability was estimated at $74,000 and eventually settled at $70,000. This year's estimated charge is $81,000. What is the income tax expense for this year?",
        options: ["$85,000", "$77,000", "$81,000", "$151,000"],
        correct: 1,
        explain:
          "Last year was OVER-provided by $4,000, and an over-provision REDUCES this year's charge: $81,000 − $4,000 = $77,000. Adding it instead gives $85,000, which is the distractor. The reasoning is simply that last year's profit was charged $4,000 too much, and the correction runs through this year.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a redeemable preference dividend as a distribution.",
      fix: "Redeemable preference shares are a LIABILITY, so their dividend is a finance cost that reduces profit.",
    },
    {
      trap: "Crediting the whole issue proceeds to share capital.",
      fix: "Share capital takes shares × NOMINAL value; the excess goes to share premium.",
    },
    {
      trap: "Recording cash on a bonus issue.",
      fix: "A bonus issue receives no cash and leaves total equity unchanged — it capitalises a reserve into share capital.",
    },
    {
      trap: "Treating an ordinary dividend as an expense in profit or loss.",
      fix: "It is a distribution, deducted from retained earnings in the statement of changes in equity.",
    },
    {
      trap: "Deducting a prior-year under-provision from the tax charge.",
      fix: "An UNDER-provision increases this year's expense; an OVER-provision reduces it. Work out which way last year was wrong.",
    },
    {
      trap: "Recognising a dividend proposed after the reporting date as a liability.",
      fix: "There is no obligation at the reporting date. It is disclosed, not recognised.",
    },
    {
      trap: "Computing a per-share dividend on the pre-issue share count.",
      fix: "Use the number of shares in issue at the relevant date, after any bonus or rights issue already made.",
    },
  ],
  keyTerms: [
    { term: "Nominal (par) value", def: "The face value of a share, credited to share capital on issue." },
    { term: "Share premium", def: "Proceeds received on a share issue in excess of nominal value; part of equity and not distributable." },
    { term: "Bonus (capitalisation) issue", def: "Free shares issued to existing shareholders by capitalising a reserve; no cash and no change in total equity." },
    { term: "Rights issue", def: "New shares offered to existing shareholders in proportion to their holdings, usually at a discount, raising cash." },
    { term: "Redeemable preference shares", def: "Preference shares the company must repay, classified as a liability with the dividend as a finance cost." },
    { term: "Under-provision of tax", def: "A prior-year tax charge that proved too low, added to the current year's income tax expense." },
    { term: "Statement of changes in equity", def: "The statement reconciling opening to closing equity, separating performance from transactions with owners." },
  ],
  summary: [
    "The equity-or-debt test is whether the company must hand the money back; the answer decides whether the return reduces profit.",
    "Ordinary and irredeemable preference shares are equity; redeemable preference shares and loans are liabilities.",
    "Share capital takes nominal value and share premium takes the excess.",
    "A bonus issue capitalises a reserve — no cash, no change in total equity; a rights issue raises cash.",
    "Equity dividends are distributions in the statement of changes in equity, recognised when declared.",
    "An under-provision of prior-year tax increases this year's charge; an over-provision reduces it.",
    "In the statement of changes in equity, the bonus issue and excess depreciation transfer rows must each total nil.",
  ],
  knowledgeDiagnostic: [
    { q: "What test decides whether an instrument is equity or a liability?", a: "Whether the company is obliged to repay it. If it must, the instrument is a liability and its return is a finance cost." },
    { q: "How is an issue of 100,000 $0.50 shares at $1.20 recorded?", a: "Debit bank $120,000; credit share capital $50,000 and share premium $70,000." },
    { q: "What happens to total equity on a bonus issue?", a: "Nothing. An amount moves from a reserve — share premium first where available — into share capital." },
    { q: "Where does an ordinary dividend appear?", a: "As a deduction from retained earnings in the statement of changes in equity. It is never an expense." },
    { q: "Last year's tax was under-provided by $6,000. What is the effect this year?", a: "This year's income tax expense increases by $6,000." },
  ],
  furtherStudy: [
    "Chapter 24 presents the finance cost and tax charge in the statement of profit or loss.",
    "Chapter 26 classifies share issues, dividends paid and interest in the statement of cash flows.",
    "Chapter 30 uses the equity and debt split to compute gearing.",
  ],
}

/** Chapters 15–19 — the second half of Area D, in reading order. */
export const FA_TREE_AREA_D2: StudyChapter[] = [
  FA_TREE_15,
  FA_TREE_16,
  FA_TREE_17,
  FA_TREE_18,
  FA_TREE_19,
]
