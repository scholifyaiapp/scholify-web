import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area B, third part — pensions, trading profit and capital allowances.
 * Chapters 9–11.
 *
 * ── The change chapter 10 exists to get right ─────────────────────
 * From 2024/25 an unincorporated business is taxed on a TAX YEAR BASIS. Profits of the
 * relevant accounting periods are TIME APPORTIONED into the tax year, and the old
 * current-year basis with its opening-year rules and overlap profits is gone. Anyone
 * teaching from memory will reach for overlap relief and be wrong — it no longer exists
 * for a continuing business, and basis period reform itself is only an awareness item.
 *
 * Chapter 11 is the most mechanical chapter in the paper and the most reliably examined.
 * It is built round the ORDER of the computation, because almost every error in capital
 * allowances is a step done in the wrong place: AIA allocated to the main pool before the
 * special rate pool, a disposal deducted after the WDA, or a first year allowance
 * time-apportioned when it never is.
 *
 * Everything is FA2025 (2025/26). All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 9 · B6 ───────────────────────────────────────────── */

export const TX_TREE_09: StudyChapter = {
  id: "TX-09",
  number: 9,
  paper: "TX",
  area: "B",
  title: "Pensions",
  minutes: 18,
  syllabusRefs: ["B7(a)"],
  intro:
    "Two limits do all the work: how much contribution attracts relief, and how much can be paid before a charge arises. They are different limits and they are tested separately.",
  outcomes: [
    "Distinguish occupational from personal pension schemes and how relief is given",
    "State the maximum contribution on which tax relief is available",
    "Compute the annual allowance, including the taper for high earners",
    "Apply the carry forward of unused annual allowance",
    "Compute the annual allowance charge",
  ],
  sections: [
    {
      id: "relief-and-limits",
      heading: "How relief is given, and the two limits",
      blocks: [
        {
          kind: "table",
          caption: "Occupational against personal schemes",
          head: ["", "Occupational (employer's) scheme", "Personal pension"],
          rows: [
            ["**How the employee pays**", "Deducted from gross pay under a **net pay arrangement**", "Paid **net of 20%** basic rate tax from taxed income"],
            ["**How relief is given**", "Full relief **immediately**, because the contribution reduces the earnings assessed", "Basic rate at source; higher and additional rate by **extending the bands** (chapter 5)"],
            ["**Effect on employment income**", "Employment income is stated **after** the contribution", "Employment income is unaffected"],
            ["**Employer contributions**", "**Exempt** benefit, and deductible for the employer", "Same — exempt, and count towards the annual allowance"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two different limits, and candidates conflate them",
          md: "**Limit 1 — the maximum contribution attracting RELIEF.** An individual may obtain relief on gross contributions up to the **higher of £3,600 and their relevant earnings** for the year. Relevant earnings means employment income and trading profits — **not** property income, savings income or dividends. So someone with £200,000 of dividend income and no earnings can still only get relief on **£3,600**.\n\n**Limit 2 — the ANNUAL ALLOWANCE, £60,000.** This caps the total contributions from **all sources including the employer** before a charge arises. Exceed it and the excess is taxed, but it is not disallowed.\n\nA contribution can therefore breach one limit without breaching the other, and a question will often test exactly that. Note also that **employer contributions count towards the annual allowance but not towards the relevant earnings limit**, since the employee is not paying them.",
        },
        {
          kind: "formula",
          name: "The annual allowance and its taper",
          expr: "ANNUAL ALLOWANCE                                        £60,000\n\nTAPERED where ADJUSTED INCOME exceeds £260,000:\n\n   Reduction  =  (Adjusted income − £260,000)  ×  50%\n   Tapered AA =  £60,000 − reduction,  MINIMUM £10,000\n\n   Adjusted income  =  net income  PLUS all pension contributions\n                       made by the employer or under a net pay arrangement\n\nUNUSED annual allowance may be CARRIED FORWARD 3 years.\n   ·  Use the CURRENT year's allowance first\n   ·  Then the unused amounts, EARLIEST year first\n   ·  The individual must have been a scheme member in the year the\n      allowance arose\n\nANNUAL ALLOWANCE CHARGE\n   The excess over the available allowance is taxed as the TOP SLICE of\n   income, at NON-SAVINGS rates — so after all other income including\n   dividends.",
          note: "The threshold income test of £200,000 is NOT examinable in TX, so apply the taper on adjusted income alone. The reduced allowance may be rounded up or down. And note the taper bottoms out at £10,000, which is reached at an adjusted income of £360,000.",
        },
        {
          kind: "example",
          title: "Tapered allowance, carry forward and the charge",
          scenario:
            "Helena's adjusted income for 2025/26 is £312,000. Gross contributions of £78,000 were paid into her pension in 2025/26. Her contributions and annual allowances for the three preceding years were: 2022/23 allowance £40,000, contributions £31,000; 2023/24 allowance £60,000, contributions £48,000; 2024/25 allowance £60,000, contributions £54,000. She has been a scheme member throughout. Her taxable income for 2025/26 makes her an additional rate taxpayer.",
          steps: [
            { label: "Compute the taper", detail: "Adjusted income of £312,000 exceeds £260,000 by £52,000. Reduction = £52,000 × 50% = £26,000. Tapered annual allowance = £60,000 − £26,000 = £34,000, which is above the £10,000 floor." },
            { label: "Compute the unused allowance brought forward", detail: "2022/23: £40,000 − £31,000 = £9,000 unused. 2023/24: £60,000 − £48,000 = £12,000. 2024/25: £60,000 − £54,000 = £6,000. Total available to carry forward = £27,000. Note 2022/23's allowance was £40,000, not £60,000 — the allowance rose from 2023/24." },
            { label: "Compute the total allowance available", detail: "Current year £34,000 + brought forward £27,000 = £61,000. The current year's allowance is used FIRST, then the earliest brought-forward year." },
            { label: "Identify the excess", detail: "Contributions of £78,000 exceed the £61,000 available by £17,000. That excess is subject to the annual allowance charge — the contribution itself is not disallowed and the money stays in the pension." },
            { label: "Compute the charge", detail: "The excess is taxed as the top slice of income at non-savings rates. Helena is an additional rate taxpayer, so £17,000 × 45% = £7,650." },
            { label: "Note where it goes and what remains", detail: "The £7,650 becomes part of Helena's income tax liability, collected through self assessment or in some cases from the pension fund itself. And she now has NO unused allowance to carry forward — the £27,000 has been fully absorbed." },
          ],
          result:
            "**Tapered allowance £34,000, plus £27,000 brought forward, giving an annual allowance charge on £17,000 of £7,650.** The three steps candidates drop are using £40,000 rather than £60,000 for 2022/23, applying the taper before the carry forward, and taxing the excess at the top slice rather than at an average rate.",
        },
      ],
      check: {
        q: "An individual has £180,000 of dividend income and no earnings. What gross pension contribution attracts tax relief?",
        options: [
          "£60,000, the annual allowance",
          "£3,600, being the higher of £3,600 and nil relevant earnings",
          "£180,000, their total income",
          "£45,000",
        ],
        correct: 1,
        explain:
          "£3,600. Relief is limited to the higher of £3,600 and RELEVANT EARNINGS — employment income and trading profits only. Dividends, savings and property income are not relevant earnings. The £60,000 annual allowance is a separate and higher limit, and here the relevant earnings limit binds first.",
      },
    },
    {
      id: "planning",
      heading: "Why a pension contribution is the strongest planning tool in TX",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "One payment, four effects",
          md: "A personal pension contribution does more than any other action available in a TX scenario, and a Section C recommendation should name all four effects:\n\n1. **Basic rate relief at source** — the provider reclaims 20%.\n2. **Extends the basic rate and additional rate limits** by the gross amount, delivering higher and additional rate relief.\n3. **Reduces adjusted net income**, which restores **personal allowance** between £100,000 and £125,140 — where the effective marginal rate is 60% — and reduces the **high income child benefit charge** between £60,000 and £80,000.\n4. **Moves income out of a high band** entirely, which can turn an additional rate taxpayer into a higher rate one and so restore a £500 savings nil rate band that had been nil.\n\nNothing else in the paper does all four, which is why it is the standard answer to \"advise on how to reduce the liability\".",
        },
        {
          kind: "list",
          title: "Practical points that earn marks",
          items: [
            "Contributions must be paid **by 5 April** to count for the tax year — there is no carry back.",
            "**Employer contributions are exempt** on the employee and deductible for the employer, and they escape both employee and employer national insurance. So an employer contribution is more efficient than the equivalent salary for both parties.",
            "A contribution above **relevant earnings** gets no relief on the excess, so check that limit before recommending a large payment.",
            "Where the **annual allowance** would be exceeded, check the three years of carry forward before concluding that a charge arises — an individual with low recent contributions may have a great deal of headroom.",
            "The pension itself is **taxable when drawn**, as non-savings income, though up to 25% may usually be taken as a tax-free lump sum. So the relief is a deferral as well as a saving.",
          ],
        },
      ],
      check: {
        q: "Why is a pension contribution particularly valuable for someone with adjusted net income of £115,000?",
        options: [
          "Because contributions are uncapped at that income level",
          "Because it reduces adjusted net income and so restores personal allowance, where the effective marginal rate is 60%",
          "Because the annual allowance is higher in that band",
          "Because it converts dividend income into non-savings income",
        ],
        correct: 1,
        explain:
          "IT RESTORES PERSONAL ALLOWANCE AT A 60% MARGINAL RATE. Between £100,000 and £125,140 each £2 of income costs 80p of tax and withdraws £1 of allowance which is itself taxed — so reducing adjusted net income in that band gives relief far above the headline 40%.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Confusing the relevant earnings limit with the annual allowance.",
      fix: "Relief is capped at the higher of £3,600 and relevant earnings; the £60,000 annual allowance is a separate charge threshold.",
    },
    {
      trap: "Counting property, savings or dividend income as relevant earnings.",
      fix: "Only employment income and trading profits count.",
    },
    {
      trap: "Using £60,000 as the 2022/23 annual allowance in a carry forward.",
      fix: "2022/23 was £40,000; the allowance rose to £60,000 from 2023/24.",
    },
    {
      trap: "Applying the carry forward before the current year's allowance.",
      fix: "Use the current year first, then brought-forward amounts earliest year first.",
    },
    {
      trap: "Taxing the annual allowance charge at an average rate.",
      fix: "It is taxed as the top slice of income at non-savings rates.",
    },
  ],
  keyTerms: [
    { term: "Relevant earnings", def: "Employment income and trading profits; the base for the contribution relief limit." },
    { term: "Annual allowance", def: "£60,000 of total contributions from all sources before a charge arises." },
    { term: "Adjusted income", def: "Net income plus employer and net pay arrangement contributions; the measure for the taper." },
    { term: "Net pay arrangement", def: "Deduction of an occupational scheme contribution from gross pay, giving immediate full relief." },
    { term: "Annual allowance charge", def: "Tax on contributions above the available allowance, charged as the top slice of income." },
  ],
  summary: [
    "Relief is limited to the higher of £3,600 and relevant earnings — earnings and trading profits only.",
    "The annual allowance is £60,000, tapered by half the excess of adjusted income over £260,000, floored at £10,000.",
    "Unused allowance carries forward three years, current year used first then earliest.",
    "The excess over the available allowance is taxed as the top slice of income at non-savings rates.",
    "A pension contribution has four effects and is the strongest planning tool in the paper.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two separate limits on pension contributions?", a: "Relief is capped at the higher of £3,600 and relevant earnings; and the £60,000 annual allowance caps total contributions before a charge arises." },
    { q: "How is the annual allowance tapered?", a: "Reduced by 50% of the excess of adjusted income over £260,000, subject to a £10,000 floor." },
    { q: "In what order is the annual allowance used?", a: "The current year's allowance first, then unused amounts brought forward from the earliest of the three preceding years." },
    { q: "At what rate is the annual allowance charge levied?", a: "At the taxpayer's marginal non-savings rate, treating the excess as the top slice of income after all other income including dividends." },
    { q: "Why is an employer contribution more efficient than equivalent salary?", a: "It is exempt on the employee, deductible for the employer, and escapes both employee and employer national insurance." },
  ],
}

/* ── Chapter 10 · B2 ──────────────────────────────────────────── */

export const TX_TREE_10: StudyChapter = {
  id: "TX-10",
  number: 10,
  paper: "TX",
  area: "B",
  title: "Trading profits: adjustment of profit and the tax year basis",
  minutes: 19,
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)", "B3(d)"],
  intro:
    "Adjusting the accounts profit is a list to work through. The basis period is not: from 2024/25 profits are taxed on a tax year basis, and the old overlap rules have gone.",
  outcomes: [
    "Adjust an accounting profit to a tax adjusted trading profit",
    "Identify disallowable expenditure and amounts taxed elsewhere",
    "Apply the tax year basis, time-apportioning where the year end differs",
    "Compute trading income on commencement and cessation",
    "Explain the treatment of transition profits",
  ],
  sections: [
    {
      id: "adjusting-the-profit",
      heading: "From accounting profit to taxable trading profit",
      blocks: [
        {
          kind: "formula",
          name: "The adjustment proforma",
          expr: "Net profit per the accounts                                    X\n\nADD BACK:  expenditure charged in the accounts that is NOT allowable\n   Depreciation and amortisation                              X\n   Capital expenditure and any loss on disposal               X\n   Entertaining CUSTOMERS                                     X\n   Gifts to customers, unless within the narrow exception     X\n   Most fines and penalties                                   X\n   General (non-specific) provisions                          X\n   Owner's drawings, salary, private proportion of expenses   X\n   Non-trade legal and professional fees                      X\n   Donations, other than small local ones and gift aid        X\n   Goods taken for own use, at SELLING price                  X\n\nDEDUCT:  income credited in the accounts that is taxed elsewhere\n   Rental income, bank interest, dividends received          (X)\n   Profit on disposal of a non-current asset                 (X)\n\nDEDUCT:  allowable amounts not charged in the accounts\n   CAPITAL ALLOWANCES                                        (X)\n                                                          ─────\nTAX ADJUSTED TRADING PROFIT                                   X",
          note: "Two directions of error. Do not add back something already excluded from the accounts, and do not deduct something already deducted — read whether the question gives you a profit BEFORE or AFTER a particular item. And note goods taken for own use are added back at SELLING price, not cost, which removes the profit the owner would have made.",
        },
        {
          kind: "table",
          caption: "The distinctions that decide marks",
          head: ["Allowable", "Not allowable"],
          rows: [
            ["Entertaining **staff**", "Entertaining **customers** or suppliers"],
            ["Gifts to customers **carrying a conspicuous advertisement**, costing **£50 or less** per recipient per year, and not food, drink, tobacco or vouchers", "Any other gift to a customer — including one costing £51, and any gift of food or drink whatever its cost"],
            ["A **specific** provision for a named doubtful debt, and a trade debt written off", "A **general** provision, and a non-trade debt written off"],
            ["**Interest on a trading loan**, and incidental costs of raising it", "Interest on the owner's private borrowing"],
            ["Legal fees on a **trading** matter: debt collection, employment, renewing a **short** lease", "Legal fees on a **capital** matter: buying property, or a first lease"],
            ["A **parking fine incurred by an employee** on business", "A parking or speeding fine incurred by the **owner**, and any other penalty"],
            ["**Small donations to local charities** with a trade benefit", "National charity donations, which go through gift aid, and political donations"],
            ["**Trade subscriptions** to a trade or professional body", "Payments to a political party"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The gift rule has four conditions and they are all tested",
          md: "A gift to a customer is allowable only if it **carries a conspicuous advertisement** for the business, costs **£50 or less per recipient per year**, and is **not food, drink, tobacco or a voucher**. Miss any one and the whole cost is added back, not just the excess — a £60 branded umbrella is disallowed in full, and a £10 bottle of wine is disallowed however small. **Trade samples** of the business's own product are separately allowable without meeting these conditions.",
        },
      ],
      check: {
        q: "A trader gives 40 customers a branded bottle of wine costing £18 each. What is the adjustment?",
        options: [
          "Nothing — the cost is under £50 and the gift is branded",
          "Add back the full £720, because gifts of drink are never allowable regardless of cost",
          "Add back £720 less £50 per customer",
          "Add back half the cost",
        ],
        correct: 1,
        explain:
          "ADD BACK THE FULL £720. Food, drink, tobacco and vouchers are excluded from the gift exception whatever they cost and however conspicuously branded. All four conditions must be met, and failing one disallows the entire cost rather than the excess.",
      },
    },
    {
      id: "basis-periods",
      heading: "The tax year basis",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "From 2024/25 the basis is the TAX YEAR — overlap profits are gone",
          md: "An unincorporated business is now taxed on the profits **arising in the tax year**, 6 April to 5 April. Where the accounting year end is **not 31 March or 5 April**, the profits of the relevant accounting periods are **TIME APPORTIONED** into the tax year.\n\nThis replaced the old current-year basis. So there are **no opening year rules**, **no overlap profits** and **no overlap relief** for a continuing business — and reaching for them, as anyone taught the old regime will, produces a wrong answer. Basis period reform itself is only an **awareness** item. You will not be asked to derive a transition figure from first principles, nor to deal with the election that pulls the spreading forward — both sit outside TX.",
        },
        {
          kind: "formula",
          name: "Applying the tax year basis",
          expr: "CONTINUING business with a non-March year end:\n\n   Trading income for the tax year\n      =  (profits of the accounting period ENDING in the tax year\n          ×  months falling in the tax year / 12)\n      +  (profits of the NEXT accounting period\n          ×  months falling in the tax year / 12)\n\nCOMMENCEMENT during 2025/26:\n   Assess from the DATE OF COMMENCEMENT to 5 April 2026.\n\nCESSATION during 2025/26:\n   Assess from 6 April 2025 to the DATE OF CESSATION.\n\nApportion to the nearest MONTH — that is one of the exam's own\nstanding instructions.",
          note: "A business with a 31 MARCH or 5 APRIL year end needs no apportionment at all: its accounting period effectively IS the tax year. That is why most exam scenarios that want to test something else use a March year end, and why one that uses a September year end is usually testing the apportionment itself.",
        },
        {
          kind: "example",
          title: "Time-apportioning to the tax year",
          scenario:
            "Farhan draws his accounts up to 30 September and has done since he started. His tax adjusted trading profit came to £84,000 for the twelve months to 30 September 2025, and £96,000 for the twelve months after that.",
          steps: [
            { label: "Identify the tax year", detail: "2025/26 runs from 6 April 2025 to 5 April 2026." },
            { label: "Identify which accounting periods overlap it", detail: "The year ended 30 September 2025 covers 1 October 2024 to 30 September 2025, of which April to September 2025 — six months — falls in the tax year. The year ended 30 September 2026 covers October 2025 to September 2026, of which October 2025 to March 2026 — again six months — falls in the tax year." },
            { label: "Apportion the first period", detail: "£84,000 × 6/12 = £42,000." },
            { label: "Apportion the second period", detail: "£96,000 × 6/12 = £48,000." },
            { label: "Total the trading income", detail: "£42,000 + £48,000 = £90,000 assessable for 2025/26." },
            { label: "Note what would have happened under the old rules", detail: "Under the former current-year basis, 2025/26 would have assessed the whole £84,000 from the accounting period ending in the tax year, and overlap profits from commencement would still be waiting for relief on cessation. Neither applies now — which is why an answer that assesses £84,000 is applying a regime that no longer exists." },
          ],
          result:
            "**£90,000 assessable for 2025/26** — £42,000 from the year to September 2025 and £48,000 from the year to September 2026. The whole of the answer is in recognising that two accounting periods contribute.",
        },
        {
          kind: "list",
          title: "Transition profits, at the level TX examines them",
          items: [
            "Transition profits arose on the **move** to the tax year basis, where a business with a non-March year end had a longer transition period.",
            "They are **spread over five years**, one fifth taxed in each of 2023/24 to 2027/28.",
            "TX hands you the transition figure and asks only where it lands. Any of **2025/26 to 2027/28** can be the year in question, and one fifth of the figure joins that year's trading income.",
            "What is **out of scope**: deriving the transition figure yourself, and the election that accelerates the spreading. Neither is examined.",
            "Neither is the interaction of transition profits with the annual allowance, the child benefit charge or the cap on income tax reliefs — so treat them simply as additional trading income for the year.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The cash basis for trading income",
          md: "Small unincorporated businesses may use the **cash basis** for trading income too — receipts less payments, with no accruals, prepayments, or debtor and creditor adjustments. Capital expenditure is deducted as paid **except** for cars, land and buildings, so cars still go through capital allowances. Note the difference from property income: for **property**, the cash basis is the **default** in TX; for **trading**, it is an option a business may use, so follow whichever basis the question gives you.",
        },
      ],
      check: {
        q: "A trader with a 30 September year end has profits of £84,000 for the year ended 30 September 2025 and £96,000 for the year ended 30 September 2026. What is assessable for 2025/26?",
        options: [
          "£84,000, the profit of the accounting period ending in the tax year",
          "£90,000 — six months of each year apportioned into the tax year",
          "£96,000, the later period's profit",
          "£180,000, both periods",
        ],
        correct: 1,
        explain:
          "£90,000. From 2024/25 the basis is the TAX YEAR, so profits are time-apportioned: (£84,000 × 6/12) + (£96,000 × 6/12) = £42,000 + £48,000. Assessing £84,000 applies the old current-year basis, which no longer exists.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Applying the old current-year basis and overlap relief.",
      fix: "From 2024/25 the basis is the tax year, with profits time-apportioned. Overlap profits no longer arise.",
    },
    {
      trap: "Adding back only the excess over £50 on a customer gift.",
      fix: "Failing any of the four conditions disallows the entire cost.",
    },
    {
      trap: "Allowing a gift of food or drink because it is branded and under £50.",
      fix: "Food, drink, tobacco and vouchers are excluded whatever the cost.",
    },
    {
      trap: "Adding back goods taken for own use at cost.",
      fix: "Add them back at SELLING price.",
    },
    {
      trap: "Disallowing a parking fine incurred by an employee on business.",
      fix: "An employee's fine is allowable; the owner's is not.",
    },
  ],
  keyTerms: [
    { term: "Tax year basis", def: "Taxing the profits arising in the tax year, time-apportioning accounting periods where the year end differs." },
    { term: "Transition profits", def: "Profits arising on the move to the tax year basis, spread one fifth per year across 2023/24 to 2027/28." },
    { term: "Wholly and exclusively", def: "The trader's deduction test, notably wider than the employee's." },
    { term: "Specific provision", def: "A provision against a named doubtful debt; allowable, unlike a general provision." },
  ],
  summary: [
    "Add back disallowable expenditure, deduct income taxed elsewhere, then deduct capital allowances.",
    "Customer gifts need all four conditions; food, drink, tobacco and vouchers never qualify.",
    "From 2024/25 profits are taxed on a tax year basis, time-apportioned where the year end is not March or April.",
    "There are no opening year rules, no overlap profits and no overlap relief for a continuing business.",
    "Transition profits may be given and taxed one fifth per year; their calculation is not examinable.",
  ],
  knowledgeDiagnostic: [
    { q: "What basis applies to an unincorporated business from 2024/25?", a: "The tax year basis — profits arising in the tax year, with accounting periods time-apportioned where the year end differs from March or April." },
    { q: "What are the four conditions for an allowable customer gift?", a: "It must carry a conspicuous advertisement, cost £50 or less per recipient per year, and not be food, drink, tobacco or a voucher." },
    { q: "At what value are goods taken for the owner's use added back?", a: "At selling price, so that the profit the owner would have made is also brought into charge." },
    { q: "How are transition profits dealt with in TX?", a: "You may be given the amount and asked to tax one fifth of it in a year from 2025/26 to 2027/28; the calculation itself is not examinable." },
    { q: "Which basis is the default for property income, and which for trading income?", a: "The cash basis is the default for property income in TX; for trading income it is an option, so follow the basis the question states." },
  ],
}

/* ── Chapter 11 · B2 ──────────────────────────────────────────── */

export const TX_TREE_11: StudyChapter = {
  id: "TX-11",
  number: 11,
  paper: "TX",
  area: "B",
  title: "Capital allowances",
  minutes: 20,
  syllabusRefs: ["B3(e)"],
  intro:
    "The most mechanical chapter in the paper, and the most reliably examined. Nearly every error is a step done in the wrong order rather than a rate misremembered.",
  outcomes: [
    "Identify plant and machinery and distinguish the main and special rate pools",
    "Allocate the annual investment allowance to best effect",
    "Compute writing down allowances, first year allowances and the small pool WDA",
    "Compute balancing allowances and charges, and handle private use assets",
    "Compute the structures and buildings allowance",
  ],
  sections: [
    {
      id: "the-pools-and-order",
      heading: "The pools, the rates and the order of the computation",
      blocks: [
        {
          kind: "table",
          caption: "Which pool, and at what rate",
          head: ["Expenditure", "Pool", "Allowance"],
          rows: [
            ["Most plant and machinery, equipment, computers, vans, lorries", "**Main pool**", "**18%** WDA"],
            ["Integral features — electrical, water, heating, lifts, air conditioning", "**Special rate pool**", "**6%** WDA"],
            ["Long life assets and thermal insulation", "**Special rate pool**", "6% WDA"],
            ["**New** car with **zero** CO2 emissions", "Not pooled", "**100% first year allowance**"],
            ["**Second-hand** zero-emission car, or a car of **1–50 g/km**", "Main pool", "18% WDA"],
            ["Car with CO2 emissions **over 50 g/km**", "**Special rate pool**", "6% WDA"],
            ["Any car with **private use by the OWNER** of an unincorporated business", "**Single asset pool**", "18% or 6% by emissions, **restricted** to the business proportion"],
            ["A **short life asset** by election", "Single asset pool", "18% WDA, with a balancing adjustment on disposal within 8 years"],
            ["A structure or building", "Not pooled", "**SBA 3%** straight line"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Allocate the AIA to the SPECIAL RATE pool first",
          md: "The **annual investment allowance** gives **100%** relief on up to **£1,000,000** of expenditure on plant and machinery — but **not on cars**. Where there is both main pool and special rate expenditure, allocate the AIA to the **SPECIAL RATE POOL FIRST**, because that pool would otherwise be written down at only 6% a year rather than 18%. Getting this backwards costs real allowances and is a routine mark.\n\nThe £1,000,000 limit is **time-apportioned** for a period of account of other than 12 months. Expenditure above the limit goes into the relevant pool for a WDA in the normal way.",
        },
        {
          kind: "list",
          style: "number",
          title: "The order to work in — almost every error is a step out of place",
          items: [
            "Set out columns: **main pool**, **special rate pool**, any **single asset pools**, and an **allowances** column on the right.",
            "Bring in the **tax written down values** brought forward.",
            "Add **additions qualifying for AIA**, and allocate the AIA — **special rate pool first**. Any excess over the AIA limit joins the pool.",
            "Add **additions not qualifying for AIA** — cars — to the correct pool or a single asset pool.",
            "Deduct **disposals** at the **lower of original cost and sale proceeds**. Never deduct more than the asset originally cost.",
            "Compute any **balancing allowance or charge** on a single asset pool that has been disposed of.",
            "Consider the **small pool WDA**: where the main or special rate pool balance is **£1,000 or less** before the WDA, the whole balance may be written off.",
            "Compute the **WDA** on each pool at 18% or 6% — **time-apportioned** for a short or long period, and **restricted** for the owner's private use.",
            "Add **first year allowances** — the 100% FYA on a new zero-emission car. An FYA is **NEVER time-apportioned**, though it IS restricted for private use.",
            "Carry the **tax written down values** forward and total the allowances column.",
          ],
        },
        {
          kind: "example",
          title: "A full capital allowances computation",
          scenario:
            "Kaveh is a sole trader with a year ended 31 March 2026. The tax written down value of his main pool at 1 April 2025 was £14,600. During the year he bought machinery for £890,000 in May 2025, a new zero-emission car for £34,000 in August 2025, a car with CO2 emissions of 88 g/km for £22,000 in November 2025 which he uses 70% for business and 30% privately, and integral features for £160,000 in February 2026. He sold machinery for £9,400 that had originally cost £16,000.",
          steps: [
            { label: "Allocate the AIA, special rate pool first", detail: "AIA limit £1,000,000 for the 12-month period. Give it to the integral features first: £160,000 of the £1,000,000. That leaves £840,000 for the machinery. So machinery gets £840,000 of AIA and the remaining £890,000 − £840,000 = £50,000 goes into the main pool." },
            { label: "Deal with the disposal", detail: "Deduct the LOWER of original cost £16,000 and sale proceeds £9,400, so £9,400 comes out of the main pool. Deducting the £16,000 cost would be wrong — only the proceeds have been recovered." },
            { label: "Compute the main pool WDA", detail: "£14,600 brought forward + £50,000 excess additions − £9,400 disposal = £55,200. WDA at 18% = £9,936, leaving £45,264 to carry forward. The balance is well above £1,000, so the small pool WDA does not apply." },
            { label: "Deal with the zero-emission car", detail: "A NEW car with zero CO2 emissions gets a 100% first year allowance: £34,000. It is not pooled, and the FYA is never time-apportioned." },
            { label: "Deal with the private use car", detail: "88 g/km exceeds 50, so it would go to the special rate pool at 6% — but because the OWNER uses it privately it goes into a SINGLE ASSET POOL. WDA = £22,000 × 6% = £1,320, of which only the 70% business proportion is allowable: £924. The full £1,320 still comes off the pool, leaving £20,680 to carry forward." },
            { label: "Total the allowances", detail: "AIA £160,000 + £840,000 = £1,000,000, plus main pool WDA £9,936, plus FYA £34,000, plus private use car £924 = £1,044,860." },
            { label: "Note the private use point that catches people", detail: "The £1,320 reduces the pool in FULL but only £924 is claimed. Note too that this restriction applies only to private use by the OWNER of an unincorporated business — private use by an EMPLOYEE gives full allowances to the business, because the employee is taxed on a benefit instead." },
          ],
          result:
            "**Total capital allowances £1,044,860.** The four decisions that matter are AIA to the special rate pool first, the disposal at the lower of cost and proceeds, the private use car into a single asset pool with the pool reduced in full but only 70% claimed, and the FYA on the new zero-emission car.",
        },
      ],
      check: {
        q: "A business has £160,000 of integral features and £890,000 of machinery in a 12-month period. How should the £1,000,000 AIA be allocated?",
        options: [
          "£1,000,000 to the machinery, with the integral features getting a 6% WDA",
          "£160,000 to the integral features first and £840,000 to the machinery, with £50,000 of machinery joining the main pool",
          "Pro rata between the two pools",
          "£500,000 to each",
        ],
        correct: 1,
        explain:
          "SPECIAL RATE POOL FIRST. Integral features would otherwise be written down at only 6% a year, against 18% for the main pool, so relieving them in full immediately is worth more. The £50,000 of machinery left over joins the main pool for an 18% WDA.",
      },
    },
    {
      id: "balancing-and-sba",
      heading: "Balancing adjustments, short life assets and buildings",
      blocks: [
        {
          kind: "formula",
          name: "Balancing allowances and charges",
          expr: "On a SINGLE ASSET POOL when the asset is disposed of, or on the MAIN or\nSPECIAL RATE pool only on CESSATION of trade:\n\n   Pool balance before disposal                       X\n   Less disposal proceeds (max original cost)        (X)\n                                                   ─────\n   BALANCING ALLOWANCE if positive                    X   → an allowance\n   BALANCING CHARGE if negative                      (X)  → added to profit\n                                                   ─────\n\nA balancing CHARGE arises whenever proceeds exceed the pool balance —\nthe business has had more relief than the asset actually cost it.\n\nOn CESSATION:  add final additions, then take NO AIA, WDA or FYA, deduct\nall disposals, and compute a balancing allowance or charge. Nothing is\ncarried forward.",
          note: "A balancing ALLOWANCE arises in the main pool only on cessation — during trading, a small remaining balance is dealt with by the small pool WDA instead. A balancing CHARGE can arise at any time in a single asset pool, and on cessation in any pool.",
        },
        {
          kind: "table",
          caption: "Two elections and one separate regime",
          head: ["", "What it does", "Why it matters"],
          rows: [
            ["**Short life asset election**", "Puts an asset in its own single asset pool, so a balancing adjustment arises on disposal", "Accelerates relief where an asset will be sold at a low value within **8 years**. Not available for cars"],
            ["**Small pool WDA**", "Writes off a main or special rate pool balance of **£1,000 or less** in full", "Avoids carrying a trivial balance for years. Time-apportioned for a short period, and optional"],
            ["**Structures and buildings allowance**", "**3%** straight line on the cost of a structure or building, excluding land", "A separate regime: no AIA, no pool, no balancing adjustment on sale — the buyer simply continues the remaining allowances"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Enhanced allowances are for COMPANIES only",
          md: "Two further allowances exist for **companies** and not for unincorporated businesses: **full expensing**, a **100%** first year allowance on new main pool plant and machinery with no monetary cap, and a **50%** first year allowance on new special rate expenditure. Both are on the exam's rate sheet under \"enhanced capital allowances for companies\".\n\nSo a company with £3,000,000 of new plant relieves all of it immediately, while a sole trader with the same expenditure is capped at the £1,000,000 AIA and pools the rest. That difference is a genuine incorporation consideration and is worth stating where a scenario compares the two — and applying full expensing to a sole trader is a straightforward error.",
        },
      ],
      check: {
        q: "When does a balancing ALLOWANCE arise in the main pool?",
        options: [
          "Whenever an asset is sold at a loss",
          "Only on cessation of trade",
          "Whenever the pool balance falls below £1,000",
          "Never",
        ],
        correct: 1,
        explain:
          "ONLY ON CESSATION. During trading, the main pool simply continues at 18% however small it becomes — with the small pool WDA available to clear a balance of £1,000 or less. A balancing allowance on a single asset pool, by contrast, arises whenever that asset is disposed of.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Allocating the AIA to the main pool before the special rate pool.",
      fix: "Special rate first — it would otherwise attract only a 6% WDA.",
    },
    {
      trap: "Deducting original cost rather than proceeds on a disposal.",
      fix: "Deduct the LOWER of original cost and sale proceeds.",
    },
    {
      trap: "Restricting the pool reduction for private use.",
      fix: "The full WDA reduces the pool; only the business proportion is claimed.",
    },
    {
      trap: "Time-apportioning a first year allowance.",
      fix: "An FYA is never time-apportioned, though it is restricted for private use.",
    },
    {
      trap: "Giving a sole trader full expensing or the 50% special rate FYA.",
      fix: "Both are available to companies only.",
    },
  ],
  keyTerms: [
    { term: "Annual investment allowance", def: "100% relief on up to £1,000,000 of plant and machinery, excluding cars; allocate to the special rate pool first." },
    { term: "Special rate pool", def: "Integral features, long life assets, thermal insulation and cars over 50 g/km, at a 6% WDA." },
    { term: "Single asset pool", def: "A pool for one asset, used for the owner's private use assets and short life assets, allowing a balancing adjustment." },
    { term: "Small pool WDA", def: "The option to write off a main or special rate pool balance of £1,000 or less in full." },
    { term: "Full expensing", def: "A 100% uncapped first year allowance on new main pool plant, available to COMPANIES only." },
  ],
  summary: [
    "Main pool 18%, special rate pool 6%, AIA 100% on up to £1,000,000 excluding cars.",
    "Allocate the AIA to the special rate pool first, because it would otherwise be written down at 6%.",
    "Deduct disposals at the lower of original cost and proceeds; the pool reduces in full for private use but only the business share is claimed.",
    "A first year allowance is never time-apportioned; a WDA is.",
    "Full expensing and the 50% special rate FYA are available to companies only.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is the AIA allocated to the special rate pool first?", a: "Because that pool attracts only a 6% WDA against the main pool's 18%, so immediate 100% relief is worth more there." },
    { q: "How is a disposal dealt with?", a: "Deduct the lower of original cost and sale proceeds from the pool, so relief can never exceed what the asset cost." },
    { q: "How is a car with private use by the business owner treated?", a: "In a single asset pool at 18% or 6% by emissions, with the full WDA reducing the pool but only the business proportion claimed." },
    { q: "When may the small pool WDA be used?", a: "Where the main or special rate pool balance before the WDA is £1,000 or less, time-apportioned for a short period." },
    { q: "Which capital allowances are available only to companies?", a: "Full expensing at 100% on new main pool plant, and the 50% first year allowance on new special rate expenditure." },
  ],
}

export const TX_TREE_AREA_B_PART3: StudyChapter[] = [TX_TREE_09, TX_TREE_10, TX_TREE_11]
