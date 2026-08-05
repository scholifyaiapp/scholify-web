import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area B, fourth part — partnerships, trading losses and national insurance.
 * Chapters 12–14, closing the eleven-chapter income tax block.
 *
 * Chapter 13 is the one that needs a table rather than prose. There are four reliefs for a
 * trading loss, each with its own years, its own ordering and its own restrictions, and
 * candidates lose marks by mixing them: opening year relief runs FIFO against total
 * income while terminal loss relief runs LIFO against trading profits, and a claim against
 * chargeable gains is only available AFTER a claim against total income in the same year.
 * The chapter sets all four out side by side and then works the choice.
 *
 * Chapter 14 deliberately omits Class 2 NIC, which is an EXCLUDED topic in TX.
 *
 * Everything is FA2025 (2025/26). All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 12 · B2(g) ───────────────────────────────────────── */

export const TX_TREE_12: StudyChapter = {
  id: "TX-12",
  number: 12,
  paper: "TX",
  area: "B",
  title: "Partnerships",
  minutes: 16,
  syllabusRefs: ["B2(g)(i)", "B2(g)(ii)", "B2(g)(iii)", "B2(g)(iv)"],
  intro:
    "A partnership is not taxed. Its profit is computed as one figure, allocated to the partners, and each partner is then taxed as though the allocation were their own trading income.",
  outcomes: [
    "Explain how a partnership is assessed to tax",
    "Allocate profits where there are salaries and interest on capital",
    "Allocate profits following a change in the profit sharing ratio",
    "Allocate profits following a change in the partnership's membership",
    "Explain the loss relief claims available to individual partners",
  ],
  sections: [
    {
      id: "allocation",
      heading: "Computing and allocating the profit",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The four steps, in order",
          items: [
            "**Compute the partnership's tax adjusted trading profit** exactly as for a sole trader (chapter 10), including capital allowances. Note that **partners' salaries and interest on capital are NOT deductible** — they are an allocation of profit, not an expense.",
            "**Allocate** that profit between the partners according to the agreement **in force for the period**. Salaries and interest on capital are allocated first; the balance goes in the profit sharing ratio.",
            "Where the agreement **changed during the period**, split the period at the date of change, apportion the profit between the two parts, and allocate **each part on its own terms**.",
            "**Tax each partner** on their allocation, on the **tax year basis** — so if the partnership's year end is not 31 March or 5 April, each partner's allocation is time-apportioned into the tax year exactly as a sole trader's would be.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The partnership pays nothing",
          md: "A partnership is **transparent** for tax. It files a partnership return showing the profit and the allocation, but the **partnership itself pays no income tax** — each partner includes their share in their own return and pays their own income tax and **Class 4** national insurance on it. Two consequences follow: each partner makes their **own** loss relief claims independently of the others, and a change in one partner's circumstances affects nobody else's liability.\n\nNote also that a partner's share of any **investment income of the partnership** is an **excluded topic** in TX, so a question will not require you to allocate interest or dividends.",
        },
        {
          kind: "example",
          title: "Allocating through a change in membership",
          scenario:
            "Ash and Bevan have traded in partnership for years, preparing accounts to 31 March. For the year ended 31 March 2026 the tax adjusted trading profit was £210,000. Until 30 September 2025 the agreement gave Ash a salary of £24,000 a year and Bevan £18,000 a year, with the balance shared 2:1. On 1 October 2025 Cara joined, all salaries ceased, and the three shared profits 3:2:1.",
          steps: [
            { label: "Split the period at the date of change", detail: "Two parts of six months each: 1 April to 30 September 2025, and 1 October 2025 to 31 March 2026. Apportion the profit to the nearest month, as the exam's own instructions require: £210,000 × 6/12 = £105,000 for each part." },
            { label: "Allocate the first six months", detail: "Salaries for six months: Ash £24,000 × 6/12 = £12,000, Bevan £18,000 × 6/12 = £9,000, totalling £21,000. Balance = £105,000 − £21,000 = £84,000, shared 2:1 giving Ash £56,000 and Bevan £28,000. So Ash £68,000 and Bevan £37,000." },
            { label: "Allocate the second six months", detail: "No salaries, so the whole £105,000 goes in the 3:2:1 ratio: Ash £52,500, Bevan £35,000, Cara £17,500." },
            { label: "Total each partner's share", detail: "Ash £68,000 + £52,500 = £120,500. Bevan £37,000 + £35,000 = £72,000. Cara £17,500. Check the total: £120,500 + £72,000 + £17,500 = £210,000 ✓ — always run this check, because an allocation error shows up here immediately." },
            { label: "Assess each partner", detail: "The partnership's year end is 31 March, so no further apportionment is needed: each partner is assessed on their share for 2025/26. Had the year end been, say, 30 September, each partner's allocation would then have been time-apportioned across two tax years." },
            { label: "Note Cara's position", detail: "Cara is assessed on £17,500 for 2025/26, being her share from the date she joined. There are no opening year rules to apply — the tax year basis means she is simply taxed on the profits arising in the tax year while she was a partner." },
          ],
          result:
            "**Ash £120,500, Bevan £72,000, Cara £17,500.** The method is always the same: split at the date of change, apportion, allocate each part on its own terms, then check the shares sum back to the total.",
        },
      ],
      check: {
        q: "How are partners' salaries and interest on capital treated in computing the partnership's tax adjusted profit?",
        options: [
          "Deducted as an expense of the partnership",
          "Not deducted at all — they are an allocation of profit, so they are added back if charged in the accounts",
          "Deducted only if paid in cash",
          "Deducted at half their value",
        ],
        correct: 1,
        explain:
          "THEY ARE AN ALLOCATION, NOT AN EXPENSE. A partner cannot be employed by their own partnership, so a 'salary' is simply a first slice of the profit share. If the accounts have charged them, add them back in the adjustment, then allocate them in step 2.",
      },
    },
    {
      id: "partner-losses",
      heading: "Losses, and a partner's own choices",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "A partnership loss is allocated, then each partner decides alone",
          md: "A partnership **loss** is computed and allocated in exactly the same way as a profit — same steps, same ratios, same period splits. What changes is what happens next: each partner then chooses **their own relief** from the four available to any individual (chapter 13), independently of the others.\n\nSo in a three-partner firm with a loss, one partner might carry back against total income for the cash flow, another carry forward because they expect higher rates later, and a third with a chargeable gain might claim against income and then against the gain. All three are correct at the same time, and a question that gives three partners with different circumstances is testing precisely that.\n\nA **new** partner is in the **first four tax years** of their own trade, so **opening year relief** is available to them even though the partnership itself is long established — which is a favourite twist.",
        },
        {
          kind: "list",
          title: "Points that recur in partnership questions",
          items: [
            "A partner who **leaves** is treated as **ceasing** to trade, so **terminal loss relief** becomes available to them alone while the remaining partners continue.",
            "Each partner pays their own **Class 4 NIC** on their allocated trading profit (chapter 14). The partnership pays none.",
            "Partners' **capital allowances** are computed once at partnership level and are part of the profit allocated — an individual partner does not claim their own.",
            "A **limited liability partnership** is taxed as a partnership, not as a company, so the same allocation rules apply. The loss relief **restriction** that applies to LLP members is an **excluded topic** in TX.",
            "The allocation of **notional** profits and losses — which arises where salaries exceed the profit — is likewise **excluded**, so a question will not create that situation.",
          ],
        },
      ],
      check: {
        q: "A long-established partnership makes a loss. A partner who joined eight months ago wants relief. What is available to them that is not available to the founding partners?",
        options: [
          "Nothing — all partners have the same options",
          "Opening year loss relief, because they are within the first four tax years of their OWN trade",
          "Terminal loss relief",
          "An uncapped claim against total income",
        ],
        correct: 1,
        explain:
          "OPENING YEAR RELIEF. Each partner's trade is their own, so a partner who joined recently is in their first four tax years and may carry the loss back three years FIFO against total income — even though the partnership has traded for decades. The founding partners cannot.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deducting partners' salaries or interest on capital as an expense.",
      fix: "They are an allocation of profit. Add them back, then allocate them first.",
    },
    {
      trap: "Allocating the whole period on the new ratio after a mid-year change.",
      fix: "Split the period at the date of change and allocate each part on its own terms.",
    },
    {
      trap: "Applying opening year rules to a new partner.",
      fix: "The tax year basis applies; a new partner is taxed on the profits arising while they were a partner.",
    },
    {
      trap: "Forgetting to check the allocations sum to the total profit.",
      fix: "It is the only check available and it catches most allocation errors.",
    },
    {
      trap: "Assuming all partners must make the same loss relief claim.",
      fix: "Each partner claims independently, according to their own circumstances.",
    },
  ],
  keyTerms: [
    { term: "Transparent", def: "A partnership pays no income tax itself; each partner is taxed on their allocated share." },
    { term: "Profit sharing ratio", def: "The agreed basis on which the balance of profit is divided after salaries and interest on capital." },
    { term: "Partnership return", def: "The return showing the partnership's profit and its allocation between the partners." },
  ],
  summary: [
    "Compute the partnership profit as for a sole trader, adding back partners' salaries and interest on capital.",
    "Allocate salaries and interest first, then the balance in the profit sharing ratio.",
    "Split the period at any change in the agreement or membership and allocate each part on its own terms.",
    "Each partner is taxed on their share on the tax year basis, time-apportioned if the year end is not March or April.",
    "Each partner makes their own loss relief claims independently.",
  ],
  knowledgeDiagnostic: [
    { q: "Does a partnership pay income tax?", a: "No. It is transparent: it files a return showing the profit and allocation, and each partner pays income tax and Class 4 NIC on their own share." },
    { q: "How is a mid-year change in the profit sharing ratio dealt with?", a: "Split the accounting period at the date of change, apportion the profit between the parts, and allocate each part on the terms in force for it." },
    { q: "What check should always be run on an allocation?", a: "That the partners' shares sum back to the total tax adjusted profit." },
    { q: "Can partners make different loss relief claims?", a: "Yes — each partner claims independently according to their own income and circumstances." },
  ],
}

/* ── Chapter 13 · B2(f) ───────────────────────────────────────── */

export const TX_TREE_13: StudyChapter = {
  id: "TX-13",
  number: 13,
  paper: "TX",
  area: "B",
  title: "Trading losses for individuals",
  minutes: 20,
  syllabusRefs: ["B2(f)(i)", "B2(f)(ii)", "B2(f)(iii)", "B2(f)(iv)", "B2(f)(v)"],
  intro:
    "Four reliefs, each with different years, a different order and a different target. The computation is easy; choosing between them is where the marks are.",
  outcomes: [
    "Identify the four loss reliefs available and their conditions",
    "Apply carry forward relief against future trading profits",
    "Apply relief against total income, and then against chargeable gains",
    "Apply opening year and terminal loss relief in the correct order",
    "Recommend a claim, taking account of wasted allowances and timing",
  ],
  sections: [
    {
      id: "the-four-reliefs",
      heading: "The four reliefs, side by side",
      blocks: [
        {
          kind: "table",
          caption: "Every loss relief in one place",
          head: ["Relief", "Set against", "Which years", "Order", "Conditions"],
          rows: [
            ["**Carry forward**", "Future **trading profits of the same trade**", "As soon as possible, indefinitely", "Earliest available year, **automatic**", "None. Cannot be restricted to preserve allowances"],
            ["**Against total income**", "**Total income**", "The **year of the loss** and/or the **previous** year", "Either, neither or both, **in any order**", "**All or nothing** in each year. Cap: higher of £50,000 or 25% of income"],
            ["**Against chargeable gains**", "**Chargeable gains**", "Same years as the total income claim", "Either or both, in any order", "Only **after** a total income claim for the **same** year, and only the unrelieved balance"],
            ["**Opening year relief**", "**Total income**", "The **three preceding** tax years", "**FIFO** — earliest first", "Only in the **first four** tax years of trade. All or nothing. Cap may apply"],
            ["**Terminal loss relief**", "**Trading profits of the same trade**", "The **three preceding** tax years", "**LIFO** — latest first", "Only on **cessation**. All or nothing"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two orderings run in opposite directions, and that is examined",
          md: "**Opening year relief is FIFO** — against the earliest of the three preceding years first. **Terminal loss relief is LIFO** — against the latest first. They are easy to swap and swapping them produces a completely different answer.\n\nThere is a logic to each. Opening year relief exists because a new trader often had employment income in earlier years, and going back furthest gets the refund soonest. Terminal loss relief works against **trading profits only**, and the most recent years are the ones most likely to have them.\n\nNote also which each is set against: opening year relief goes against **total income**, terminal loss relief against **trading profits of the same trade** alone.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "All or nothing is the trap that costs allowances",
          md: "A claim against total income **cannot be restricted**. Claim for a year and the loss is set against the **whole** of that year's total income, down to nil if the loss is large enough — which **wastes the personal allowance**, the savings nil rate band and the dividend nil rate band for that year, because none of them can be carried anywhere.\n\nSo a £46,000 loss claimed against total income of £37,000 relieves all £37,000, of which £12,570 would have been covered by the personal allowance anyway. That is £12,570 × 20% = **£2,514 of relief thrown away**. Carry forward, by contrast, is set against **trading profits** in future years and leaves the personal allowance intact each year — slower, but not wasteful.",
        },
        {
          kind: "example",
          title: "Choosing a relief",
          scenario:
            "Devon has traded for six years to 31 March. For 2025/26 he has a tax adjusted trading loss of £46,000. His property income is £9,000 a year, in both 2024/25 and 2025/26. His trading profit for 2024/25 was £28,000. He expects trading profits of about £30,000 a year from 2026/27 onwards. He has no chargeable gains.",
          steps: [
            { label: "Establish the years and income available", detail: "2024/25 total income = trading profit £28,000 + property £9,000 = £37,000. 2025/26 total income = property £9,000 only, the trade having made a loss. The loss is £46,000." },
            { label: "Option 1 — claim against total income in 2025/26", detail: "Relieves only £9,000, and it relieves ALL of it, so the £12,570 personal allowance is entirely wasted. £37,000 of loss remains. This is the worst option: it wastes a full personal allowance to relieve £9,000." },
            { label: "Option 2 — claim against total income in 2024/25", detail: "Relieves the whole £37,000 of that year's income, so £9,000 of loss remains and is carried forward. But the 2024/25 personal allowance of £12,570 is wasted, throwing away £12,570 × 20% = £2,514 of relief. The advantage is speed: this generates a repayment of the 2024/25 tax already paid." },
            { label: "Option 3 — carry the whole loss forward", detail: "£46,000 set against future trading profits of about £30,000 a year: roughly £30,000 relieved in 2026/27 and the remaining £16,000 in 2027/28. Each year's personal allowance survives, because the loss reduces trading profit rather than total income — so no allowance is wasted at all." },
            { label: "Weigh speed against waste", detail: "Option 2 gives a repayment now but wastes £2,514. Option 3 wastes nothing but defers relief for one to two years. Which wins depends on Devon's cash position and on whether his future profits will be taxed at a higher rate than the 20% he paid in 2024/25 — relief is worth more against income taxed at 40%." },
            { label: "Recommend, and name the combination", detail: "A defensible recommendation is to claim in 2024/25 for the cash flow and carry forward the £9,000 balance, accepting the £2,514 of waste. But state the alternative: if Devon has no pressing cash need and expects to become a higher rate taxpayer, carrying the whole loss forward relieves it at 40% and wastes nothing." },
          ],
          result:
            "**Three viable answers, and the marks are in the reasoning.** The £2,514 of wasted personal allowance is the figure that makes the comparison concrete, and quantifying it is what distinguishes an answer that recommends from one that merely lists.",
        },
      ],
      check: {
        q: "In what order is opening year loss relief applied, and against what?",
        options: [
          "LIFO, against trading profits of the same trade",
          "FIFO — the earliest of the three preceding years first — against TOTAL income",
          "FIFO, against trading profits only",
          "Either order, against total income",
        ],
        correct: 1,
        explain:
          "FIFO AGAINST TOTAL INCOME. Opening year relief goes back three years, earliest first, against total income — available only in the first four tax years of trade. Terminal loss relief is the mirror image: LIFO, and against trading profits of the same trade only.",
      },
    },
    {
      id: "gains-and-choice",
      heading: "Relief against gains, the cap, and how to answer",
      blocks: [
        {
          kind: "formula",
          name: "The order for a claim against chargeable gains",
          expr: "STEP 1  Make a claim against TOTAL INCOME for the year — this is\n        compulsory before any claim against gains for that year.\n\nSTEP 2  Any loss still unrelieved may then be set against the\n        CHARGEABLE GAINS of that same year.\n\n        Amount set against gains  =  the LOWER of:\n           ·  the unrelieved trading loss, and\n           ·  gains for the year LESS capital losses brought forward\n\n        Note: the ANNUAL EXEMPT AMOUNT cannot be preserved — the loss\n        is set against gains BEFORE it, so the £3,000 exemption may be\n        wasted just as the personal allowance may be.\n\nAvailable for the year of the loss and/or the previous year, in either order.",
          note: "The claim against gains is OPTIONAL but the claim against total income for that year is not — you cannot skip straight to gains. And both wastes can happen in the same claim: the personal allowance on the income side and the annual exempt amount on the gains side.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The cap on income tax reliefs",
          md: "A claim against **total income** cannot exceed **£50,000**, or 25% of income if that is the larger — income here meaning, broadly, total income after deducting gross pension contributions. So a very large loss cannot be relieved against a modest income in one go, however the taxpayer would prefer it.\n\nTwo important points: the cap applies to relief against **total income** and against **opening year** relief, but **not** to **carry forward** relief and **not** to relief against the **profits of the same trade** — so terminal loss relief is uncapped too. And the cap does not apply to the extent the loss is set against profits of the same trade within total income.",
        },
        {
          kind: "list",
          title: "The factors to weigh in a recommendation — this is the discussion mark",
          items: [
            "**Rate of relief.** A loss relieved against income taxed at 40% or 45% is worth twice one relieved at 20%. Where future profits will be taxed higher, carrying forward can be worth more despite the delay.",
            "**Wasted allowances.** All-or-nothing claims can throw away the personal allowance, the savings and dividend nil rate bands, and the CGT annual exempt amount. Quantify the waste rather than mentioning it.",
            "**Cash flow.** A carry-back generates a repayment of tax already paid; a carry forward relieves nothing until profits return.",
            "**Certainty.** Carry forward depends on the same trade making profits in future. If that is doubtful, taking relief now is worth more than a larger relief that may never arrive.",
            "**The cap** may prevent a full claim against total income in one year, forcing a spread whether or not the taxpayer wants one.",
            "**Time limits.** A claim against total income must be made within **12 months of 31 January following the tax year of the loss** — so by 31 January 2028 for a 2025/26 loss.",
          ],
        },
      ],
      check: {
        q: "A trader wants to set a loss against chargeable gains for 2025/26. What must happen first?",
        options: [
          "Nothing — a claim against gains can be made on its own",
          "A claim against TOTAL INCOME for 2025/26 must be made first",
          "The loss must first be carried forward",
          "The annual exempt amount must be used",
        ],
        correct: 1,
        explain:
          "A CLAIM AGAINST TOTAL INCOME FOR THE SAME YEAR IS COMPULSORY FIRST. Only the loss unrelieved after that claim may go against gains — and it is set against gains BEFORE the annual exempt amount, so the £3,000 exemption can be wasted too.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Applying opening year relief LIFO or terminal loss relief FIFO.",
      fix: "Opening year is FIFO against total income; terminal is LIFO against trading profits of the same trade.",
    },
    {
      trap: "Restricting a claim against total income to preserve the personal allowance.",
      fix: "It is all or nothing. Quantify the waste and use it to justify the recommendation instead.",
    },
    {
      trap: "Claiming against gains without a claim against total income for the same year.",
      fix: "The income claim is compulsory first; only the unrelieved balance can go against gains.",
    },
    {
      trap: "Applying the reliefs cap to carry forward or terminal loss relief.",
      fix: "The cap applies to claims against total income and opening year relief, not to those two.",
    },
    {
      trap: "Listing the reliefs without recommending one.",
      fix: "Weigh rate of relief, wasted allowances, cash flow and certainty, and reach a conclusion.",
    },
  ],
  keyTerms: [
    { term: "Carry forward relief", def: "Automatic relief against future trading profits of the same trade, indefinitely and without restriction." },
    { term: "Relief against total income", def: "An all-or-nothing claim for the year of the loss and/or the previous year, subject to the reliefs cap." },
    { term: "Opening year relief", def: "Carry back three years against total income on a FIFO basis, in the first four tax years of trade." },
    { term: "Terminal loss relief", def: "Carry back three years against trading profits of the same trade on a LIFO basis, on cessation." },
    { term: "Cap on income tax reliefs", def: "The higher of £50,000 and 25% of income, limiting claims against total income." },
  ],
  summary: [
    "Four reliefs: carry forward, against total income, opening year and terminal — each with its own years and order.",
    "Opening year relief is FIFO against total income; terminal loss relief is LIFO against trading profits.",
    "A claim against total income is all or nothing and can waste the personal allowance and nil rate bands.",
    "Relief against gains requires a claim against total income for the same year first, and can waste the annual exempt amount.",
    "Recommend by weighing rate of relief, wasted allowances, cash flow and the certainty of future profits.",
  ],
  knowledgeDiagnostic: [
    { q: "Against what, and in what order, is terminal loss relief given?", a: "Against trading profits of the same trade for the three preceding tax years, on a LIFO basis — latest year first." },
    { q: "Why can a claim against total income waste allowances?", a: "Because it is all or nothing: the loss is set against the whole of that year's income, so the personal allowance and nil rate bands for that year go unused." },
    { q: "What is the condition for setting a loss against chargeable gains?", a: "A claim against total income for the same year must have been made first; only the unrelieved balance may go against gains." },
    { q: "Which reliefs are NOT subject to the cap on income tax reliefs?", a: "Carry forward relief and relief against profits of the same trade, including terminal loss relief." },
    { q: "By when must a claim against total income for a 2025/26 loss be made?", a: "Within 12 months of 31 January following the tax year — so by 31 January 2028." },
  ],
}

/* ── Chapter 14 · B7 ──────────────────────────────────────────── */

export const TX_TREE_14: StudyChapter = {
  id: "TX-14",
  number: 14,
  paper: "TX",
  area: "B",
  title: "National insurance contributions",
  minutes: 16,
  syllabusRefs: ["B7(a)", "B7(b)", "B7(c)", "B7(d)"],
  intro:
    "Three classes to compute, all on the rate sheet, and all straightforward. The marks are lost by using the wrong class or the wrong income figure, not by mis-multiplying.",
  outcomes: [
    "Compute Class 1 employee and employer contributions",
    "Compute Class 1A contributions on benefits",
    "Compute Class 4 contributions for the self-employed",
    "Apply the employment allowance",
    "Explain the differences between employed and self-employed contributions",
  ],
  sections: [
    {
      id: "the-classes",
      heading: "The classes, the bands and what each is charged on",
      blocks: [
        {
          kind: "table",
          caption: "The 2025/26 rates — all provided in the exam",
          head: ["Class", "Who pays", "Charged on", "Bands and rates"],
          rows: [
            ["**Class 1 primary**", "**Employee**", "**Cash earnings** — salary, bonus, commission. NOT benefits", "Nil to £12,570; **8%** from £12,571 to £50,270; **2%** above"],
            ["**Class 1 secondary**", "**Employer**", "The same cash earnings", "Nil to **£5,000**; **15%** above, with **no upper limit**"],
            ["**Class 1A**", "**Employer only**", "**Taxable benefits**", "**15%** on the whole amount"],
            ["**Class 4**", "**Self-employed**", "**Tax adjusted trading profits**", "Nil to £12,570; **6%** from £12,571 to £50,270; **2%** above"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three distinctions that decide the marks",
          md: "**Class 1 is on CASH EARNINGS only** — benefits are outside it entirely, and are picked up by the employer's Class 1A instead. So a car benefit produces **no employee NIC at all**, which is part of why benefits are attractive to employees.\n\n**The employer has no upper limit.** An employee's rate drops to 2% above £50,270, but the employer keeps paying **15%** on everything. So a high salary costs the employer far more NIC than it costs the employee.\n\n**Class 4 is charged on TRADING PROFITS, not total income.** Property income, savings and dividends carry no national insurance at all — which is a genuine advantage of investment income over earnings, and a routine planning point.\n\nNote that **Class 2 NIC is an excluded topic** in TX and should not appear in an answer.",
        },
        {
          kind: "example",
          title: "Computing all three for an employee, and Class 4 for a trader",
          scenario:
            "Rowan is employed on a salary of £62,000 for 2025/26 and receives taxable benefits of £8,400. Separately, Sasha is self-employed with tax adjusted trading profits of £58,000, and also has property income of £14,000.",
          steps: [
            { label: "Rowan — employee's Class 1 primary", detail: "Nil on the first £12,570. Then (£50,270 − £12,570) = £37,700 × 8% = £3,016. Then (£62,000 − £50,270) = £11,730 × 2% = £234.60. Total employee contribution £3,250.60. The £8,400 of benefits is excluded — Class 1 is on cash earnings only." },
            { label: "Rowan — employer's Class 1 secondary", detail: "(£62,000 − £5,000) = £57,000 × 15% = £8,550. Note the employer's threshold is only £5,000, far below the employee's £12,570, and there is no upper limit — so the employer pays more than twice what the employee does." },
            { label: "Rowan — employer's Class 1A on benefits", detail: "£8,400 × 15% = £1,260. This falls on the employer alone and is payable by 22 July 2026." },
            { label: "Total the cost of employing Rowan", detail: "Employer's NIC = £8,550 + £1,260 = £9,810 on top of the £62,000 salary and £8,400 of benefits. That is a useful figure for a scenario comparing employment with self-employment or with a dividend." },
            { label: "Sasha — Class 4", detail: "Nil on the first £12,570. Then £37,700 × 6% = £2,262. Then (£58,000 − £50,270) = £7,730 × 2% = £154.60. Total £2,416.60. Note the 6% main rate, against 8% for an employee." },
            { label: "Sasha — the property income", detail: "The £14,000 of property income carries NO national insurance. Class 4 is charged on trading profits alone, so the property income is taxed for income tax but escapes NIC entirely." },
            { label: "Compare the two positions", detail: "On broadly similar earnings, Rowan's employment generates £3,250.60 of employee NIC plus £9,810 of employer NIC — £13,060.60 in total. Sasha's self-employment generates £2,416.60 and nothing for any employer. That gap is the whole reason employment status is litigated." },
          ],
          result:
            "**Rowan: employee £3,250.60, employer £8,550 plus £1,260 Class 1A. Sasha: Class 4 £2,416.60, with nothing on her property income.** The total NIC cost of employment is roughly five times that of self-employment on similar earnings.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The employment allowance",
          md: "An employer may claim an **employment allowance of £10,500** for 2025/26, set against its **Class 1 secondary** liability only — **not** against Class 1A and not against the employee's contributions. It is a per-**employer** allowance, not per employee.\n\nTwo restrictions worth knowing: it is **not available** where the sole employee is also a **director**, which excludes most one-person companies; and the **group aspects** of the allowance are an **excluded topic** in TX, so a question will not require you to allocate it around a group.",
        },
      ],
      check: {
        q: "An employee receives a salary of £62,000 and taxable benefits of £8,400. What are the employee's Class 1 contributions?",
        options: [
          "£3,250.60 — computed on the £62,000 salary only",
          "£3,922.60 — computed on salary plus benefits",
          "£8,550, the same as the employer's",
          "£1,260",
        ],
        correct: 0,
        explain:
          "£3,250.60, ON THE SALARY ONLY. Class 1 is charged on cash earnings; benefits are outside it and attract employer's Class 1A instead. (£50,270 − £12,570) × 8% = £3,016, plus (£62,000 − £50,270) × 2% = £234.60.",
      },
    },
    {
      id: "collection",
      heading: "Collection, and why the distinction matters",
      blocks: [
        {
          kind: "table",
          caption: "How each class is collected",
          head: ["Class", "Collected", "Due"],
          rows: [
            ["**Class 1** primary and secondary", "Through **PAYE**, monthly", "By the 22nd of the following month if paid electronically"],
            ["**Class 1A**", "Separately, once a year", "By **22 July** following the tax year"],
            ["**Class 4**", "Through **self assessment**, with income tax", "Included in payments on account and the balancing payment"],
          ],
        },
        {
          kind: "list",
          title: "The planning consequences a good answer draws out",
          items: [
            "**A dividend carries no national insurance at all**, for the company or the shareholder. So an owner-manager taking profits as a dividend rather than salary avoids both the 8% employee and the 15% employer charge — which is the central attraction of incorporation, though dividends are paid out of taxed profits and are not deductible for the company.",
            "**Benefits escape employee NIC** but attract employer Class 1A at the same 15%, so they save the employee's 8% or 2% and cost the employer nothing extra relative to salary.",
            "**Class 4 at 6% is lower than Class 1 at 8%**, and self-employment generates no employer contribution at all — so the total NIC on self-employment is far below that on employment.",
            "**Employer contributions to a registered pension scheme** escape NIC entirely as well as being exempt for income tax, which makes them the most efficient form of remuneration in the paper.",
            "The **£5,000 employer threshold** means employer NIC begins at a much lower level of pay than employee NIC, so even modest salaries carry a 15% employer cost.",
          ],
        },
      ],
      check: {
        q: "Why does an owner-manager often take profits as a dividend rather than salary?",
        options: [
          "Because dividends are deductible for the company",
          "Because a dividend carries no national insurance for either the company or the shareholder",
          "Because dividends are taxed at lower income tax rates than the 20% basic rate",
          "Because dividends attract Class 4 rather than Class 1",
        ],
        correct: 1,
        explain:
          "NO NATIONAL INSURANCE ON EITHER SIDE. A dividend avoids the employee's 8% and the employer's 15%. The trade-off is that a dividend is paid out of profits already taxed to corporation tax and is not deductible for the company, so the comparison must be run on total tax and NIC rather than on NIC alone.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Including benefits in the employee's Class 1 computation.",
      fix: "Class 1 is on cash earnings only; benefits attract employer's Class 1A.",
    },
    {
      trap: "Applying an upper limit to the employer's Class 1 secondary.",
      fix: "There is none — 15% applies to all earnings above £5,000.",
    },
    {
      trap: "Charging Class 4 on total income.",
      fix: "It is charged on tax adjusted trading profits only; property, savings and dividend income carry no NIC.",
    },
    {
      trap: "Setting the employment allowance against Class 1A or employee contributions.",
      fix: "It reduces the employer's Class 1 secondary liability only.",
    },
    {
      trap: "Bringing Class 2 NIC into an answer.",
      fix: "It is an excluded topic in TX.",
    },
  ],
  keyTerms: [
    { term: "Class 1 primary", def: "Employee contributions on cash earnings at 8% and then 2%." },
    { term: "Class 1 secondary", def: "Employer contributions at 15% on earnings above £5,000, with no upper limit." },
    { term: "Class 1A", def: "Employer-only contributions at 15% on taxable benefits, due by 22 July." },
    { term: "Class 4", def: "Self-employed contributions on trading profits at 6% and then 2%." },
    { term: "Employment allowance", def: "£10,500 against the employer's Class 1 secondary liability only." },
  ],
  summary: [
    "Class 1 employee is 8% then 2% on cash earnings; the employer pays 15% above £5,000 with no upper limit.",
    "Benefits carry no employee NIC but attract employer's Class 1A at 15%.",
    "Class 4 is 6% then 2% on trading profits only — property, savings and dividend income carry no NIC.",
    "The employment allowance of £10,500 reduces the employer's Class 1 secondary liability alone.",
    "Class 2 NIC is an excluded topic in TX.",
  ],
  knowledgeDiagnostic: [
    { q: "What is Class 1 charged on?", a: "Cash earnings only — salary, bonus and commission. Benefits are outside Class 1 and attract employer's Class 1A." },
    { q: "Why does a high salary cost an employer disproportionately?", a: "Because the employer's 15% has no upper limit, while the employee's rate drops to 2% above £50,270." },
    { q: "Does property income attract national insurance?", a: "No. Class 4 is charged on tax adjusted trading profits only." },
    { q: "What may the employment allowance be set against?", a: "The employer's Class 1 secondary liability only, not Class 1A and not employee contributions." },
    { q: "When is Class 1A payable?", a: "By 22 July following the end of the tax year." },
  ],
}

export const TX_TREE_AREA_B_PART4: StudyChapter[] = [TX_TREE_12, TX_TREE_13, TX_TREE_14]
