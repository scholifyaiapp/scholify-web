import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-GLOBAL · Area B — individual income and employment. Chapters 4–8.
 *
 * The largest area in the track, because it is the largest area in every real variant.
 * The five chapters follow the order a computation is actually built: decide who is within
 * the charge, lay out the computation, then fill it from the three ways an individual
 * earns — employment, self-employment and investment — and finish with the contribution
 * charges that sit alongside income tax almost everywhere.
 *
 * Jurisdiction-neutral throughout: no rate, band, threshold or contribution class is
 * stated as fact, because none of them survives a change of country. What survives is the
 * ORDER of the computation, the reason benefits are taxed at all, the distinction between
 * an accounting profit and a taxable profit, and the employment-versus-self-employment
 * test that decides which set of rules applies in the first place.
 */

/* ── Chapter 4 ─────────────────────────────────────────────────── */

export const TXG_TREE_04: StudyChapter = {
  id: "TXG-04",
  number: 4,
  paper: "TX",
  area: "B",
  title: "Who is taxed: residence, domicile and the scope of the charge",
  minutes: 18,
  intro:
    "Before any figure is computed, one question decides how much of a person's income a jurisdiction can reach at all. Get residence wrong and every subsequent number is answering the wrong question.",
  outcomes: [
    "Explain the common tests by which an individual becomes resident",
    "Distinguish residence from domicile and from nationality",
    "Explain how the scope of the charge changes with residence status",
    "Apply a split-year or part-period rule to an arrival or departure",
    "Identify the income of a non-resident that remains within a jurisdiction's charge",
  ],
  sections: [
    {
      id: "becoming-resident",
      heading: "The tests that make a person resident",
      blocks: [
        {
          kind: "text",
          md: "This is a **jurisdiction-neutral foundation track, not an ACCA exam variant**. Residence rules are among the most jurisdiction-specific in any tax code — the day counts, the tie-breakers and the terminology all differ. What is common is the *shape* of the enquiry, and that is what this chapter teaches.\n\nEvery system needs a rule for deciding which individuals belong to it, because residence is what justifies taxing income earned anywhere in the world. The rules cluster into four familiar tests.",
        },
        {
          kind: "table",
          caption: "The four tests jurisdictions use, usually in combination",
          head: ["Test", "What it looks at", "Why it exists", "Its weakness"],
          rows: [
            ["**Physical presence**", "Days spent in the jurisdiction during a period", "Objective, countable, hard to argue with", "Crude — it ignores whether a life is actually based there"],
            ["**Permanent home**", "Whether a dwelling is available for the person's use", "Captures people whose life is based there despite travel", "\"Available\" is arguable, and a person may have homes in two places"],
            ["**Centre of vital interests**", "Where personal and economic ties are strongest — family, work, assets", "Resolves the genuinely dual case", "Subjective and fact-heavy"],
            ["**Habitual abode / intention**", "The settled pattern of a person's life, or a declared intention to settle", "Catches the person with no fixed home", "Depends on evidence of a state of mind"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Residence, domicile and nationality are three different things",
          md: "They are routinely confused, and in some jurisdictions each carries different consequences.\n\n**Residence** is a question of fact about a particular period: where a person actually lived and how strong their connections were. It can change from year to year, and a person can be resident in two jurisdictions at once.\n\n**Domicile**, where a jurisdiction uses the concept, is a much stickier connection — broadly the place a person treats as their permanent home and intends to return to. It changes rarely and deliberately, and it typically matters for taxes on wealth and inheritance rather than on income.\n\n**Nationality** is a matter of citizenship and, in most systems, has no bearing on income tax at all. A handful of jurisdictions do tax their citizens wherever resident, but that is the exception, and assuming it is the standard error in the other direction.\n\nThe reason to keep them separate is that a scenario will often supply all three, and only one of them decides the point being asked.",
        },
        {
          kind: "formula",
          name: "How the scope of the charge follows from status",
          expr: "RESIDENT of a jurisdiction taxing on a WORLDWIDE basis:\n     charged on   income arising INSIDE   +   income arising OUTSIDE\n     with relief for foreign tax suffered on the outside portion\n\nRESIDENT of a jurisdiction taxing on a TERRITORIAL basis:\n     charged on   income arising INSIDE only\n     foreign income is outside the charge altogether\n\nNON-RESIDENT, in either kind of jurisdiction:\n     charged on   income arising INSIDE only\n     often collected by WITHHOLDING, and sometimes at a\n     different rate, with allowances restricted or denied\n\nSo residence expands the BASE; source is what a jurisdiction keeps\nits grip on regardless of residence.",
          note: "Notice that a non-resident and a territorial-basis resident are charged on the same thing — locally arising income — but for different reasons and often on different terms. The resident usually gets the full allowances and the ordinary rates; the non-resident frequently does not, and may find the tax collected by deduction at source and treated as final. That difference in treatment, rather than the difference in base, is what most scenarios are testing.",
        },
      ],
      check: {
        q: "An individual is resident in Jurisdiction A (worldwide basis) and a national of Jurisdiction B. All their income arises in Jurisdiction Z. What can Jurisdiction A tax?",
        options: [
          "Nothing, because no income arises in A",
          "All of it, because residence brings worldwide income into charge, with relief for tax suffered in Z",
          "Only the part remitted to A",
          "Nothing, because nationality of B takes priority",
        ],
        correct: 1,
        explain:
          "RESIDENCE IS THE WIDE CLAIM. A worldwide basis charges a resident on income wherever it arises, so all of it enters A's base even though none of it arose there. Z has a source claim too, and A relieves the overlap. Nationality is generally irrelevant to income tax, and a remittance rule only applies where a jurisdiction has specifically enacted one.",
      },
    },
    {
      id: "arrival-departure-and-non-residents",
      heading: "Arriving, leaving, and what a non-resident still owes",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Split-year rules exist because a tax year is longer than a move",
          md: "Residence is normally decided for a whole tax period, which produces an obviously unfair result when somebody arrives or leaves part-way through: either they are treated as resident for months when they had no connection at all, or as non-resident for months when they plainly lived there.\n\nMost systems therefore have a **split-year** or part-period rule, dividing the year at the date of the move so the person is taxed on a worldwide basis for the part they were genuinely resident and on a source basis for the rest.\n\nTwo cautions that recur. The rule is usually **conditional** — it applies only where the move meets stated tests, such as taking up full-time work abroad or acquiring a home in the new jurisdiction. And it does not change the source rules: income arising in the jurisdiction during the non-resident part remains taxable there.",
        },
        {
          kind: "example",
          title: "Splitting a year of departure",
          scenario:
            "Elena has been resident in Jurisdiction Z for many years. On 1 July she moves permanently to Jurisdiction A to take up a full-time post there, and meets Z's conditions for split-year treatment. In the tax year to 31 December she has: employment income of CU 30,000 from a Z employer for work done in Z before 1 July; employment income of CU 45,000 from her new A employer for work done in A after 1 July; rent of CU 8,000 from an apartment she still owns in Z, arising evenly across the year; and interest of CU 2,000 from a bank in A, credited in November.",
          steps: [
            { label: "Split the year at the date of departure", detail: "Elena is treated as resident in Z from 1 January to 30 June, and as non-resident in Z from 1 July to 31 December. Each part is then taxed on its own basis." },
            { label: "Resident part: worldwide", detail: "For 1 January to 30 June, Z charges her worldwide income arising in that part. That is the CU 30,000 employment income and the first half of the rent, CU 4,000. Total CU 34,000." },
            { label: "Non-resident part: Z source only", detail: "For 1 July to 31 December, Z can charge only income ARISING IN Z. The apartment is in Z, so the second half of the rent, CU 4,000, remains in charge. Everything else in this part arises elsewhere." },
            { label: "Test the two items that arise abroad", detail: "The CU 45,000 is for work performed in A, so it arises in A — outside Z's charge in the non-resident part. The CU 2,000 interest is paid by a bank in A, so it arises in A, and was credited in November when she was non-resident in Z. Neither enters Z's base." },
            { label: "Add up Z's base", detail: "CU 30,000 employment + CU 4,000 rent (resident part) + CU 4,000 rent (non-resident part) = CU 38,000. The rent is taxed for the WHOLE year, but for two different reasons — residence for the first half, source for the second." },
            { label: "Check the other jurisdiction", detail: "A will charge the CU 45,000 and the CU 2,000 on its own rules, and will consider Elena resident there from the date her residence began. The two jurisdictions' answers are computed independently and reconciled only through relief." },
          ],
          result:
            "**Jurisdiction Z charges CU 38,000.** The instructive line is the rent: it is in charge across the whole year, but through residence before the split and through source afterwards. A candidate who splits the year and then forgets that the source claim survives will drop the second CU 4,000 — the most common error in departure scenarios.",
        },
        {
          kind: "list",
          title: "What a jurisdiction typically keeps taxing after a person leaves",
          items: [
            "**Income from land and buildings situated there.** Immovable property is the strongest source claim of all, and essentially every jurisdiction and treaty gives the taxing right to the country where the property sits.",
            "**Profits of a business carried on there**, usually through a fixed place of business. The activity is local even though the owner is not.",
            "**Employment income for duties actually performed there**, however brief the visit, subject to short-stay exemptions in treaties.",
            "**Payments made by local payers** — interest, royalties, dividends — commonly collected by withholding, since the authority can reach the payer even when it cannot reach the recipient.",
            "**Gains on disposing of local assets**, particularly land and buildings, which many jurisdictions charge to non-residents specifically to stop that gap being exploited.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The trap in every arrival or departure question",
          md: "Candidates decide residence status correctly and then apply it to the whole year, or they split the year correctly and then forget that the source claim continues.\n\nWork it as a grid: **two periods across the top, each income source down the side, and one decision per cell** — is this amount in charge in this period, and on what basis? The grid makes the surviving source claims impossible to overlook, and it is far quicker than trying to hold both bases in mind at once.",
        },
      ],
      check: {
        q: "After a split year of departure, which income of the former resident normally remains within the old jurisdiction's charge?",
        options: [
          "None — non-residence removes the whole charge",
          "All of it, until the following tax year begins",
          "Income arising in that jurisdiction, such as rent from property situated there",
          "Only employment income, wherever the duties are performed",
        ],
        correct: 2,
        explain:
          "SOURCE SURVIVES THE LOSS OF RESIDENCE. Ceasing to be resident removes the worldwide claim, not the source claim. Locally situated property, business carried on there, duties performed there and payments made by local payers all remain in charge — which is why the rent in a departure scenario is taxable across the whole year.",
      },
    },
  ],
  examTraps: [
    { trap: "Using nationality or citizenship to decide the income tax charge.", fix: "In almost every jurisdiction it is irrelevant. Residence decides the extent of the charge; source decides what a non-resident still owes." },
    { trap: "Treating residence and domicile as interchangeable.", fix: "Residence is a yearly question of fact affecting income; domicile, where used, is a sticky long-term connection usually affecting wealth and inheritance taxes." },
    { trap: "Applying split-year treatment automatically to any move.", fix: "It is conditional in most systems — taking up full-time work abroad, acquiring a home, or ceasing to have one. State the condition being relied on." },
    { trap: "Dropping locally arising income once the person becomes non-resident.", fix: "The source claim survives. Rent from local property, duties performed locally and payments from local payers all stay in charge." },
    { trap: "Assuming a non-resident gets the same allowances and rates as a resident.", fix: "Many systems restrict or deny personal allowances to non-residents and collect by withholding at a flat rate that may be final." },
  ],
  keyTerms: [
    { term: "Residence", def: "A factual connection between a person and a jurisdiction for a period, normally the basis for taxing that person's worldwide income." },
    { term: "Domicile", def: "A long-term connection to the place a person treats as their permanent home. Where used, it usually affects wealth and inheritance taxes rather than income tax." },
    { term: "Split-year treatment", def: "A rule dividing a tax year at the date of arrival or departure, so each part is taxed on the basis appropriate to the person's status in it." },
    { term: "Centre of vital interests", def: "A residence test looking at where a person's personal and economic ties are strongest, used to resolve cases where simpler tests point both ways." },
    { term: "Dual residence", def: "Being resident in two jurisdictions under each one's domestic rules — resolved, where a treaty applies, by tie-breaker tests." },
    { term: "Immovable property", def: "Land and buildings. The source claim over them is the strongest in international tax and is almost always given to the jurisdiction where they sit." },
  ],
  summary: [
    "Residence is tested by physical presence, availability of a home, centre of vital interests and habitual abode — usually in combination.",
    "Residence, domicile and nationality are three different concepts; only residence normally governs the income tax charge.",
    "A resident of a worldwide-basis jurisdiction is taxed on income wherever arising; a non-resident is taxed only on locally arising income.",
    "Split-year rules divide the year at a move, but they are conditional and they do not switch off the source claim.",
    "Property, local business profits, locally performed duties and payments by local payers stay in charge after residence ends.",
    "Non-residents often face restricted allowances and final withholding rather than the ordinary rates.",
  ],
}

/* ── Chapter 5 ─────────────────────────────────────────────────── */

export const TXG_TREE_05: StudyChapter = {
  id: "TXG-05",
  number: 5,
  paper: "TX",
  area: "B",
  title: "Building an individual income tax computation",
  minutes: 18,
  intro:
    "Almost every jurisdiction assembles an individual's liability the same way, and the order is not decorative — where an item enters decides what it is worth. This chapter builds the layout you will fill in for the rest of the area.",
  outcomes: [
    "Lay out an income tax computation in the correct order",
    "Distinguish total income, net income and taxable income",
    "Apply reliefs, allowances and the withdrawal of an allowance in the right sequence",
    "Explain why different categories of income may be taxed in a set order",
    "Compute a liability and reconcile it to tax payable after credits",
  ],
  sections: [
    {
      id: "the-layout",
      heading: "The layout, and why the order is load-bearing",
      blocks: [
        {
          kind: "formula",
          name: "The individual computation, in the order it must be built",
          expr: "     Employment income                              X\n     Business / trading profit                      X\n     Property income                                X\n     Investment income (interest, dividends)        X\n     Pension and other income                       X\n                                                 -----\n     TOTAL INCOME                                   X\n\n     less  RELIEFS (loss relief, qualifying\n           interest, deductible contributions)     (X)\n                                                 -----\n     NET INCOME                                     X\n\n     less  PERSONAL ALLOWANCES                      (X)\n                                                 -----\n     TAXABLE INCOME                                 X\n\n     Tax at the applicable rate(s)                  X\n     add   any additional charges                   X\n     less  TAX REDUCERS / non-refundable credits   (X)\n                                                 -----\n     TAX LIABILITY                                  X\n     less  tax deducted at source and payments\n           already made                            (X)\n                                                 -----\n     TAX PAYABLE or REPAYABLE                       X",
          note: "Three labels do real work and are worth keeping straight. TOTAL INCOME is everything within the charge. NET INCOME is after reliefs, and is very often the figure a jurisdiction uses to test entitlement to allowances. TAXABLE INCOME is after allowances, and is the figure the rates actually apply to. A scenario that says an allowance is withdrawn 'where income exceeds' a limit is nearly always pointing at NET income — so getting the middle line right is what makes the allowance calculation right.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Deduct allowances where they save the most tax",
          md: "Where a jurisdiction taxes different categories of income at different rates, and gives the taxpayer any choice about where an allowance or relief is set, the principle is always the same: **deduct it against the income bearing the highest marginal rate**.\n\nThe reason is simply arithmetic. An allowance removes income from the top of the stack, so it saves tax at whatever rate that top slice would have suffered. Setting it against income taxed at a low rate wastes the difference.\n\nMany systems automate this with a fixed order — non-savings income first, then savings, then dividends, or something similar — precisely so the answer does not depend on the taxpayer choosing well. Where an order is prescribed, follow it exactly: the prescribed order is usually already the optimal one, and departing from it is simply an error.",
        },
        {
          kind: "example",
          title: "Assembling a computation, including a withdrawn allowance",
          scenario:
            "Jurisdiction Z gives every resident individual a personal allowance of CU 12,000, withdrawn by CU 1 for every CU 2 by which NET income exceeds CU 100,000. It taxes taxable income at 20% on the first CU 40,000 and 45% on the excess. Marcus, a resident, has trading profit of CU 96,000, property income of CU 14,000, and interest of CU 6,000. He pays CU 4,000 of qualifying interest on a loan that Z allows as a relief against total income. CU 3,000 of tax was withheld at source from his interest.",
          steps: [
            { label: "Total income", detail: "CU 96,000 + CU 14,000 + CU 6,000 = CU 116,000. Everything within the charge, before anything is deducted." },
            { label: "Deduct reliefs to reach net income", detail: "The qualifying loan interest of CU 4,000 is a relief against total income. Net income = CU 116,000 − CU 4,000 = CU 112,000." },
            { label: "Test the allowance against NET income", detail: "Net income of CU 112,000 exceeds CU 100,000 by CU 12,000. Withdrawal = CU 12,000 × 1/2 = CU 6,000. Personal allowance = CU 12,000 − CU 6,000 = CU 6,000. Using total income here instead would have given a withdrawal of CU 8,000 and the wrong allowance — this is the step the relief was placed before, and the reason the order matters." },
            { label: "Taxable income", detail: "Net income CU 112,000 − allowance CU 6,000 = CU 106,000." },
            { label: "Apply the rates", detail: "First CU 40,000 at 20% = CU 8,000. Remaining CU 66,000 at 45% = CU 29,700. Tax liability = CU 37,700." },
            { label: "Deduct tax already suffered", detail: "CU 3,000 was withheld from the interest. Tax payable = CU 37,700 − CU 3,000 = CU 34,700." },
            { label: "Notice the marginal rate in the withdrawal band", detail: "Between CU 100,000 and CU 124,000 of net income, each extra CU 2 of income is taxed at 45% AND removes CU 1 of allowance, which is then itself taxed at 45%. That is CU 1.35 of tax on CU 2, an effective marginal rate of 67.5% — which is why a further deductible contribution is worth so much in this band." },
          ],
          result:
            "**Tax payable is CU 34,700, on taxable income of CU 106,000.** Two lessons: the relief must be deducted before the allowance is tested, because the test bites on net income; and a withdrawn allowance creates a hidden marginal rate well above the headline rate, which is the point most planning questions in this area turn on.",
        },
      ],
      check: {
        q: "A jurisdiction withdraws the personal allowance where 'income exceeds' a stated limit. Which figure is normally meant?",
        options: [
          "Total income, before any reliefs",
          "Net income, after reliefs but before allowances",
          "Taxable income, after allowances",
          "The tax liability",
        ],
        correct: 1,
        explain:
          "NET INCOME — AFTER RELIEFS, BEFORE ALLOWANCES. Testing against taxable income would be circular, since the allowance is what produces taxable income. Testing against total income would ignore reliefs the jurisdiction has already decided should reduce the measure of means. Net income is the figure that sits between the two, which is why it is the usual test.",
      },
    },
    {
      id: "categories-and-credits",
      heading: "Categories of income, and what comes off the tax",
      blocks: [
        {
          kind: "table",
          caption: "Why jurisdictions separate income into categories",
          head: ["Category", "Typical treatment", "Reason for separate treatment"],
          rows: [
            ["**Employment**", "Taxed as it arises, usually with tax withheld by the employer", "Easy to observe and to collect; the payer keeps records anyway"],
            ["**Trading / business**", "Taxed on adjusted profit for an accounting period", "Expenses must be tested for deductibility, so a computation is unavoidable"],
            ["**Property**", "Taxed on rents less allowable expenses", "Sits between business and investment; often has its own expense rules"],
            ["**Interest**", "Often taxed at its own rate, frequently withheld at source", "Highly mobile, easily hidden, and often earned by non-residents"],
            ["**Dividends**", "Often a lower rate or a credit", "The profit has usually already borne corporate tax, so a full charge would tax it twice"],
            ["**Pensions**", "Taxed as income when received", "Relief was typically given on the way in, so the charge falls on the way out"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Dividends are taxed differently for a structural reason, not a political one",
          md: "A company's profit is taxed once in the company's hands. If the same profit were then taxed in full again as a dividend in the shareholder's hands, the total burden on distributed profit would far exceed the burden on profit earned directly — and companies would simply stop distributing.\n\nJurisdictions relieve this **economic double taxation** in one of a few ways: a reduced dividend rate, a partial exemption, an imputation credit representing tax the company already paid, or full exemption. The mechanism differs; the purpose is identical.\n\nBe careful to keep this apart from the **juridical** double taxation of Chapter 2. There, the SAME person is taxed twice by two jurisdictions. Here, the SAME income is taxed twice in two different people's hands within one jurisdiction. Different problem, different remedy, and a scenario will sometimes contain both.",
        },
        {
          kind: "list",
          title: "Reading what sits below the liability line",
          items: [
            "**Tax reducers.** Amounts subtracted from the tax after the rates are applied, usually to deliver a relief at a fixed rate rather than at the taxpayer's marginal rate. They typically cannot reduce the liability below nil.",
            "**Non-refundable credits.** Capped at the liability; anything above it is lost. Always check the cap before claiming a benefit for the taxpayer.",
            "**Refundable credits.** Paid out to the extent they exceed the liability, which makes them the only mechanism that reaches somebody with no tax to pay.",
            "**Tax deducted at source.** Not a relief at all — it is tax already paid, so it is set against the liability to give tax payable. Forgetting it produces a correct liability and a wrong payable figure, which usually costs a mark of its own.",
            "**Additional charges.** Some systems add specific charges — clawbacks of benefits, surcharges on high incomes — after the rates are applied. They increase the liability and are therefore collected through the same return.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The liability is not the payable figure, and both are usually asked for",
          md: "**Tax liability** is what the year's income generates. **Tax payable** is what the taxpayer must now hand over, after deducting amounts already collected — withheld tax, payments on account, refundable credits.\n\nThe distinction matters because they answer different questions. A planning question about whether an arrangement saves tax is about the liability. A cash-flow question about what is due in January is about the payable figure. Scenarios frequently supply tax already withheld precisely to see whether the candidate carries it to the right line — and a computation that stops at the liability has left the last step undone.",
        },
      ],
      check: {
        q: "Why do most jurisdictions tax dividends at a lower rate than other income, or give a credit against them?",
        options: [
          "Because dividends are usually received by non-residents",
          "To relieve the economic double taxation of profit already taxed in the company",
          "Because dividends are a return of capital rather than income",
          "To encourage companies to retain rather than distribute profits",
        ],
        correct: 1,
        explain:
          "THE PROFIT HAS ALREADY BEEN TAXED ONCE, IN THE COMPANY. Charging it again in full in the shareholder's hands would make distributed profit far more expensive than profit earned directly. The relief — a lower rate, a partial exemption or an imputation credit — exists to bring the two back into line, and it encourages distribution rather than retention.",
      },
    },
  ],
  examTraps: [
    { trap: "Deducting the personal allowance before reliefs.", fix: "Reliefs come first and produce NET income; allowances come next and produce TAXABLE income. Reversing them corrupts any allowance withdrawal test." },
    { trap: "Testing an allowance withdrawal against total or taxable income.", fix: "It is almost always net income. Testing against taxable income is circular; testing against total income ignores the reliefs already allowed." },
    { trap: "Setting an allowance against the lowest-taxed income.", fix: "Allowances save tax at the marginal rate of the income they displace, so they belong against the highest-taxed slice — unless the jurisdiction prescribes an order, in which case follow it." },
    { trap: "Stopping at the tax liability.", fix: "Deduct tax already withheld and payments on account to reach tax PAYABLE. The two figures answer different questions and scenarios usually want both." },
    { trap: "Confusing economic with juridical double taxation.", fix: "Economic: one amount taxed in two people's hands (company then shareholder), relieved by dividend rates or credits. Juridical: one person taxed by two jurisdictions, relieved by treaty or unilateral credit." },
  ],
  keyTerms: [
    { term: "Total income", def: "The sum of all income within the charge, before reliefs or allowances." },
    { term: "Net income", def: "Total income less reliefs. Commonly the measure against which entitlement to allowances is tested." },
    { term: "Taxable income", def: "Net income less allowances — the figure the rates are applied to." },
    { term: "Tax liability", def: "The tax the year's income generates, after rates and tax reducers but before deducting amounts already paid." },
    { term: "Tax payable", def: "The liability less tax already withheld at source and payments already made; the amount actually due." },
    { term: "Tax reducer", def: "An amount subtracted from tax rather than income, delivering relief at a fixed rate instead of the marginal rate." },
    { term: "Economic double taxation", def: "The same income taxed in two different people's hands — classically company profit and then the dividend paid from it." },
    { term: "Imputation credit", def: "A credit given to a shareholder representing corporate tax already paid on the distributed profit." },
  ],
  summary: [
    "Build the computation in order: total income, less reliefs to net income, less allowances to taxable income, then rates, then credits, then tax already paid.",
    "Net income is the usual test for withdrawing an allowance, which is why reliefs must be deducted first.",
    "A withdrawn allowance creates an effective marginal rate well above the headline rate, and that is what planning questions exploit.",
    "Allowances are set against the highest-taxed income unless the jurisdiction prescribes an order.",
    "Income is split into categories because each needs different rules — and dividends are relieved to avoid taxing company profit twice.",
    "Tax liability and tax payable are different figures; deduct withheld tax and payments on account to get from one to the other.",
  ],
}

/* ── Chapter 6 ─────────────────────────────────────────────────── */

export const TXG_TREE_06: StudyChapter = {
  id: "TXG-06",
  number: 6,
  paper: "TX",
  area: "B",
  title: "Employment income and benefits in kind",
  minutes: 18,
  intro:
    "If benefits were untaxed, every salary would be paid in cars and housing. The rules exist to close that gap, and the recurring question is what a benefit is worth — not whether it is taxable.",
  outcomes: [
    "Distinguish employment from self-employment and explain why it matters",
    "Identify when employment income is treated as received",
    "Explain the principles by which a benefit in kind is valued",
    "Distinguish an allowable employment expense from a private one",
    "Explain why some benefits are deliberately exempt",
  ],
  sections: [
    {
      id: "employed-or-self-employed",
      heading: "The status question that decides which rules apply",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Why every jurisdiction fights about employment status",
          md: "The label changes far more than which schedule the income sits in. In nearly every system, an employee suffers **withholding on every payment**, gets **narrow expense rules**, and generates **employer contributions** the business must pay. A self-employed contractor is paid gross, deducts expenses on the far more generous \"wholly and exclusively for the business\" test, and generates lower contributions.\n\nSo both parties often prefer the self-employed label, and the authority often does not. Because the money at stake is large and recurring, the tests have been litigated repeatedly, and the resulting case law is what actually defines the boundary — not a statutory definition.",
        },
        {
          kind: "table",
          caption: "The factors that decide status — no single one is conclusive",
          head: ["Factor", "Points to EMPLOYMENT", "Points to SELF-EMPLOYMENT"],
          rows: [
            ["**Control**", "The engager decides what, how, when and where the work is done", "The worker decides the method and largely the timing"],
            ["**Personal service**", "The worker must do the work personally", "A genuine, usable right to send a substitute"],
            ["**Mutuality of obligation**", "The engager must offer work and the worker must accept it", "Each engagement is separate; no obligation to offer or accept the next"],
            ["**Financial risk**", "Paid regardless of outcome; no capital at stake", "Bears the cost of correcting bad work; can make a loss"],
            ["**Equipment**", "Provided by the engager", "Provided by the worker, often substantial"],
            ["**Integration**", "Part of the organisation — appraisals, staff benefits, management chain", "Engaged for a defined outcome and otherwise outside the structure"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "It is a picture, not a checklist",
          md: "The single most common error is to count the factors and declare a winner. The courts do not do that: they look at whether, standing back, the worker is **in business on their own account**, or working **in someone else's business**.\n\nSome factors carry more weight than others. A genuine and unfettered right of substitution is often close to decisive against employment, because an employment contract is inherently personal. An absence of mutuality of obligation between engagements is powerful for the same reason. Control matters, but far less than it once did — many senior employees are not told how to do their work.\n\nAnd the label the parties use is close to irrelevant. A contract describing someone as self-employed does not make them so if the reality is otherwise; substance governs. Saying that explicitly is usually worth a mark.",
        },
      ],
      check: {
        q: "A worker's contract calls them self-employed. They must attend daily, work under supervision, use the engager's equipment, and may not send anyone in their place. What is their likely status?",
        options: [
          "Self-employed, because the contract says so",
          "Employed, because the substance shows control, personal service and no financial risk",
          "Self-employed, because they invoice for their work",
          "It cannot be determined without knowing the length of the engagement",
        ],
        correct: 1,
        explain:
          "SUBSTANCE GOVERNS, NOT THE LABEL. Control over how and when, an obligation to serve personally with no right of substitution, equipment supplied by the engager and no financial risk all point one way. Standing back, this worker is working in someone else's business rather than in business on their own account.",
      },
    },
    {
      id: "valuing-benefits",
      heading: "What a benefit is worth, and what is deliberately left out",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The starting principle: a benefit is worth what it saves the employee",
          md: "The default measure in most systems is the **cost to the employer** of providing the benefit, or its **market value** to the employee — the idea being that receiving something is economically the same as receiving the cash to buy it.\n\nJurisdictions then depart from that default in three recognisable ways, and knowing which departure applies is most of the work:\n\n**Formula valuation** for things that are hard to price and commonly provided — a company car valued as a percentage of list price, accommodation valued from a rateable value, a loan valued as an official rate of interest applied to the balance. Formulae buy certainty at the price of precision.\n\n**Deliberate exemption** for benefits the jurisdiction wants to encourage or where the administrative cost of taxing them exceeds the yield.\n\n**Reduction for what the employee contributes.** Where the employee pays something towards the benefit, that payment normally reduces the taxable amount — which is a planning point as well as a computational one.",
        },
        {
          kind: "formula",
          name: "The general pattern for valuing a benefit",
          expr: "     Cost to the employer, or market value to the employee     X\n     less  any amount the EMPLOYEE contributes                (X)\n     less  any part used for BUSINESS purposes                (X)\n     times any time-apportionment for part-year provision      x n/12\n                                                            -----\n           TAXABLE BENEFIT                                     X\n\nFor an ASSET LENT rather than given, the annual benefit is usually\n     a stated percentage of the asset's market value when first lent.\n\nFor a CHEAP or INTEREST-FREE LOAN, the benefit is usually\n     (official rate  -  rate actually charged)  x  balance outstanding\n     with the balance often averaged over the period.",
          note: "Time-apportionment and employee contributions are the two adjustments most often missed, and they are usually worth a mark each. Apportion whenever the benefit was not available for the whole period — a car provided in month four is available for nine months, not twelve. And read carefully whether the employee's payment is FOR THE USE of the benefit, which reduces it, or FOR ITS PURCHASE, which may not.",
        },
        {
          kind: "example",
          title: "Valuing a package of benefits",
          scenario:
            "Jurisdiction Z taxes benefits at cost to the employer, reduced by employee contributions, apportioned for part-year provision. Lent assets are charged at 20% of market value when first provided. Cheap loans are charged at the official rate of 5% on the balance. Nadia is employed all year by Solano Ltd and receives: private medical insurance costing the company CU 1,800; a laptop for private use, worth CU 3,000 when first lent to her three years ago and CU 900 now; a loan of CU 40,000 made on the first day of the year at 1% interest, on which she repaid CU 10,000 exactly half way through the year; and use of a company apartment from 1 October, costing the company CU 24,000 a year, towards which she pays CU 500 a month.",
          steps: [
            { label: "Medical insurance", detail: "Cost to the employer, provided for the whole year, no contribution: CU 1,800." },
            { label: "The laptop", detail: "20% of market value WHEN FIRST LENT, not current value: CU 3,000 × 20% = CU 600. Using the current CU 900 would give CU 180 and is the standard error — the charge is fixed by reference to the original value so it does not fall as the asset depreciates." },
            { label: "The loan — average the balance", detail: "CU 40,000 for the first half and CU 30,000 for the second, so the average balance is (CU 40,000 + CU 30,000) / 2 = CU 35,000." },
            { label: "The loan — apply the rate differential", detail: "Official rate 5% less the 1% actually charged = 4%. Benefit = CU 35,000 × 4% = CU 1,400. Note the benefit is the SHORTFALL in interest, not the whole official-rate figure." },
            { label: "The apartment — apportion, then deduct the contribution", detail: "Provided from 1 October, so three months of a twelve-month year: CU 24,000 × 3/12 = CU 6,000. She contributes CU 500 a month for those three months = CU 1,500. Taxable benefit = CU 6,000 − CU 1,500 = CU 4,500." },
            { label: "Total the benefits", detail: "CU 1,800 + CU 600 + CU 1,400 + CU 4,500 = CU 8,300, added to her salary as employment income." },
          ],
          result:
            "**Total taxable benefits are CU 8,300.** Three recurring points: a lent asset is valued on its ORIGINAL market value, a cheap loan is charged on the interest SHORTFALL over an averaged balance, and a part-year benefit is apportioned before the employee's contribution is deducted — apportioning after would understate the deduction.",
        },
        {
          kind: "list",
          title: "Why some benefits are exempt, and what the categories tell you",
          items: [
            "**Things provided for the job rather than the person** — protective clothing, tools, workplace parking. There is no private gain, so there is nothing to tax.",
            "**Benefits the jurisdiction wants to encourage** — pension contributions, training, childcare, cycle schemes, low-emission vehicles. These are tax expenditures, chosen deliberately.",
            "**Trivial or impractical items** — small gifts, staff canteens available to all, minor entertainment. The yield would not justify the administration, and the classical efficiency criterion says leave them alone.",
            "**Reimbursed business expenses** — travel on business, subsistence while away. These are not benefits at all in substance: they restore the employee to where they started, so taxing them would tax a repayment.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The expense rule for employees is narrow, and that is the point",
          md: "Where a self-employed person deducts costs incurred **wholly and exclusively** for the business, an employee typically deducts only costs incurred **wholly, exclusively AND NECESSARILY** in performing the duties.\n\nThat extra word does a great deal of work. \"Necessarily\" asks whether **any** holder of that job would have to incur the cost, not whether this particular employee found it useful. It is an objective test about the job, and it defeats most claims: professional clothing, a home office chosen for convenience, and the classic case of travel from home to a permanent workplace, which is treated as getting yourself into a position to work rather than as working.\n\nThe reliable dividing line for travel is between commuting to a permanent workplace, which is private, and travel in the performance of the duties or to a temporary workplace, which is not.",
        },
      ],
      check: {
        q: "An employer lends an employee a camera worth CU 2,000 when first provided. Two years later it is worth CU 800. The annual charge is 20% of market value. What is this year's benefit?",
        options: [
          "CU 160, being 20% of the current CU 800",
          "CU 400, being 20% of the CU 2,000 value when first provided",
          "CU 800, the current market value",
          "Nil, because the asset was lent rather than given",
        ],
        correct: 1,
        explain:
          "THE CHARGE IS FIXED ON THE VALUE WHEN FIRST LENT. CU 2,000 × 20% = CU 400, and it stays at CU 400 for as long as the asset is provided. Fixing it at the outset stops the benefit from quietly shrinking as the asset depreciates, which is exactly what a current-value measure would allow.",
      },
    },
  ],
  examTraps: [
    { trap: "Deciding employment status by counting factors.", fix: "Stand back and ask whether the worker is in business on their own account. Substitution rights and mutuality of obligation carry disproportionate weight; the parties' label carries almost none." },
    { trap: "Valuing a lent asset on its current market value.", fix: "The charge is normally a percentage of value WHEN FIRST PROVIDED, so it does not fall as the asset ages." },
    { trap: "Charging a cheap loan on the full official-rate interest.", fix: "The benefit is the SHORTFALL — official rate less the rate actually paid — applied to the balance, which is usually averaged over the period." },
    { trap: "Deducting an employee contribution before apportioning for a part year.", fix: "Apportion the full annual value first, then deduct what the employee actually contributed during that part." },
    { trap: "Applying the self-employed expense test to an employee.", fix: "Employees usually need wholly, exclusively AND NECESSARILY. 'Necessarily' is objective — would any holder of the job have to incur it?" },
  ],
  keyTerms: [
    { term: "Benefit in kind", def: "Non-cash reward provided by reason of employment, taxed so that payment in goods is not cheaper than payment in cash." },
    { term: "Mutuality of obligation", def: "An obligation on the engager to provide work and on the worker to accept it — a strong pointer towards employment." },
    { term: "Right of substitution", def: "A genuine and usable right to send someone else to do the work, which is close to decisive against employment." },
    { term: "Official rate of interest", def: "A benchmark rate set by the authority, used to value the benefit of a cheap or interest-free employment loan." },
    { term: "Employee contribution", def: "An amount the employee pays towards a benefit, normally deducted from the taxable value." },
    { term: "Wholly, exclusively and necessarily", def: "The narrow employment expense test, which asks objectively whether any holder of the job would have to incur the cost." },
    { term: "Temporary workplace", def: "A site attended for a limited duration or purpose. Travel there is generally allowable, unlike commuting to a permanent workplace." },
  ],
  summary: [
    "Employment status decides withholding, expense rules and contribution costs, so both sides argue about it and case law defines it.",
    "Status is judged as a whole picture — control, personal service, mutuality, risk, equipment and integration — not by counting factors or reading the label.",
    "A benefit is valued at cost to the employer or market value to the employee, then reduced for employee contributions and business use and apportioned for part-year provision.",
    "Lent assets are charged on value when first provided; cheap loans are charged on the interest shortfall over an averaged balance.",
    "Exemptions exist for job-related items, encouraged behaviours, trivial items and reimbursed business costs.",
    "Employee expenses face the narrow wholly, exclusively and necessarily test, which is objective and defeats most claims — including commuting.",
  ],
}

/* ── Chapter 7 ─────────────────────────────────────────────────── */

export const TXG_TREE_07: StudyChapter = {
  id: "TXG-07",
  number: 7,
  paper: "TX",
  area: "B",
  title: "Trading income: from accounting profit to taxable profit",
  minutes: 18,
  intro:
    "A business's accounts are prepared to show a true and fair view; a tax computation is prepared to apply the law. They rarely give the same number, and the adjustment between them is the most reliably examined computation in any variant.",
  outcomes: [
    "Explain why accounting profit and taxable profit differ",
    "Apply the general test for deductibility of an expense",
    "Distinguish capital from revenue expenditure and explain why it matters",
    "Build an adjustment of profit from a set of accounts",
    "Explain how capital expenditure is relieved through depreciation allowances",
  ],
  sections: [
    {
      id: "the-adjustment",
      heading: "Why the two profits differ, and how to reconcile them",
      blocks: [
        {
          kind: "formula",
          name: "The adjustment of profit — always in this shape",
          expr: "     NET PROFIT per the financial statements               X\n\n     ADD BACK  expenditure charged in the accounts\n               that is NOT deductible for tax:\n                 depreciation and amortisation               X\n                 capital expenditure written off             X\n                 non-business / private proportions          X\n                 entertaining, fines, and other\n                   specifically disallowed items             X\n                 general (non-specific) provisions           X\n\n     ADD       taxable income NOT credited in the accounts   X\n\n     DEDUCT    income credited in the accounts that is\n               NOT taxable as trading income:\n                 profit on disposal of fixed assets         (X)\n                 income taxed under another category\n                   (rent, interest, dividends)              (X)\n\n     DEDUCT    expenditure allowable for tax but NOT\n               charged in the accounts:\n                 DEPRECIATION ALLOWANCES on capital assets  (X)\n                                                          -----\n     ADJUSTED TAXABLE TRADING PROFIT                          X",
          note: "Two habits make this reliable. First, work down the accounts line by line rather than from memory, because the marks are for treating each item, and an item you never mention earns nothing. Second, state a treatment for every item you are given — including the ones needing no adjustment, where saying 'no adjustment required' shows you considered it. Income taxed under another category is deducted here and then reappears in its own line of the individual's computation; it is being moved, not exempted.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The general deduction test, and the two words that decide most cases",
          md: "The standard formulation makes an expense deductible where it was **wholly and exclusively** incurred for the trade's own purposes. Each word carries weight.\n\n**\"Wholly\"** goes to amount, and **\"exclusively\"** goes to purpose. An expense with a genuine dual purpose — private as well as business — fails in principle, though most jurisdictions allow an apportionment where the business part can be identified separately, such as a phone bill or the running costs of a car used partly privately.\n\nThe test looks at **purpose, not benefit**. A cost incurred for the trade remains deductible even if it turns out to be a waste of money, and a cost incurred for a private reason is not rescued by incidentally helping the business. The classic failure is clothing: ordinary clothes worn to work fail because everyone must be clothed, so warmth and decency are always among the purposes.\n\nOn top of the general test sit **specific prohibitions** which apply however business-like the purpose: fines and penalties for breaking the law, most entertaining of customers, and expenditure of a capital nature.",
        },
        {
          kind: "table",
          caption: "Capital or revenue — the distinction the whole computation turns on",
          head: ["", "Capital", "Revenue"],
          rows: [
            ["**What it does**", "Acquires, improves or enlarges the earning structure", "Runs the structure, or maintains it in its existing state"],
            ["**Duration of benefit**", "Enduring — lasts beyond the current period", "Consumed within the period"],
            ["**Accounts treatment**", "Capitalised, then depreciated", "Charged to profit as incurred"],
            ["**Tax treatment**", "NOT deductible; relieved instead through depreciation allowances, if at all", "Deductible when incurred, subject to the general test"],
            ["**Typical examples**", "Buying a building, an extension, initial repairs to make an asset usable", "Rent, wages, insurance, repairs restoring an asset to its previous condition"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Repairs and improvements: the line most scenarios are built on",
          md: "**Restoring** an asset to its former condition is revenue — replacing broken tiles, repainting, replacing a worn-out component of a larger machine. **Improving** it, or making it bigger or better than it was, is capital.\n\nTwo refinements decide the harder cases. Where a repair is only possible using modern materials because the originals no longer exist, it is generally still a repair — the improvement is incidental rather than the object. And the **entirety** question asks what the asset actually is: replacing an engine in a machine repairs the machine, but replacing the whole machine is a capital acquisition even though a machine has been replaced with a machine.\n\nThe hardest case is the one to remember: **repairs needed to make a newly bought asset usable at all** are capital, because they are really part of the acquisition cost — the price was lower precisely because the work was outstanding.",
        },
        {
          kind: "example",
          title: "Adjusting a set of accounts",
          scenario:
            "Ferro Trading is a sole trade in Jurisdiction Z. Its accounts for the year show a net profit of CU 180,000 after charging: depreciation CU 22,000; repairs CU 31,000 (of which CU 18,000 was replacing a roof damaged in a storm and CU 13,000 was building a new loading bay); customer entertaining CU 4,000; a parking fine incurred by the owner while making a delivery CU 300; owner's salary CU 45,000; and a general provision against doubtful debts of CU 6,000. Credited to the accounts were rent received from a sublet of CU 9,000 and a profit on sale of a van of CU 5,000. Depreciation allowances for the year are agreed at CU 26,000.",
          steps: [
            { label: "Start from the accounting profit", detail: "CU 180,000. Every adjustment is expressed relative to this figure." },
            { label: "Add back depreciation", detail: "CU 22,000. Depreciation is the accountant's estimate of capital consumed and is never deductible; the tax system substitutes its own measure through depreciation allowances." },
            { label: "Split the repairs", detail: "The CU 18,000 roof replacement restores the building to its former condition — revenue, so no adjustment. The CU 13,000 loading bay is new, enlarging the earning structure — capital, so add back CU 13,000." },
            { label: "Add back the entertaining", detail: "CU 4,000. Customer entertaining is specifically disallowed in most systems however commercial the motive. Staff entertaining is usually treated differently, so read which one a scenario gives you." },
            { label: "Add back the fine", detail: "CU 300. A penalty for breaking the law is disallowed as a matter of public policy — the fact that it was incurred while working does not rescue it." },
            { label: "Add back the owner's salary", detail: "CU 45,000. A sole trader cannot employ themselves; the whole profit is already theirs, so a salary charged to the accounts is an appropriation of profit rather than an expense." },
            { label: "Add back the general provision", detail: "CU 6,000. A general provision is not a specific liability, so it is not yet an expense for tax. A SPECIFIC provision against an identified debt would be allowable." },
            { label: "Deduct income taxed elsewhere or not taxable", detail: "The CU 9,000 rent is property income, not trading income, so deduct it here and tax it in its own category. The CU 5,000 profit on the van is a book figure reversing depreciation, dealt with through the depreciation allowance computation instead — deduct it." },
            { label: "Deduct the depreciation allowances", detail: "CU 26,000, the tax system's own relief for capital expenditure, replacing the depreciation added back at the start." },
            { label: "Total it", detail: "180,000 + 22,000 + 13,000 + 4,000 + 300 + 45,000 + 6,000 − 9,000 − 5,000 − 26,000 = CU 230,300." },
          ],
          result:
            "**Adjusted trading profit is CU 230,300, and CU 9,000 of property income is taxed separately.** The two most instructive items are the repairs — where only careful reading separates the restoration from the enlargement — and the rent, which is deducted here but not lost, because it is being moved to another category rather than exempted.",
        },
      ],
      check: {
        q: "A trader buys a warehouse cheaply because its roof is unusable, then spends CU 40,000 replacing the roof before the building can be used. How is the CU 40,000 treated?",
        options: [
          "Revenue, because replacing a roof restores the building to its former condition",
          "Capital, because the work was necessary to bring the asset into use and is part of its acquisition cost",
          "Half revenue and half capital, by apportionment",
          "Revenue, because the trader did not enlarge the building",
        ],
        correct: 1,
        explain:
          "INITIAL REPAIRS NEEDED TO MAKE AN ASSET USABLE ARE CAPITAL. The purchase price was reduced precisely because the work was outstanding, so the expenditure is really part of what was paid to acquire a usable warehouse. Contrast a roof damaged by a storm years into ownership, which restores an already-working asset and is revenue.",
      },
    },
    {
      id: "capital-allowances",
      heading: "Relieving capital expenditure: depreciation allowances",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Why the tax system refuses the accountant's depreciation",
          md: "Depreciation is an estimate. The business chooses the useful life, the residual value and the method, and two identical businesses can charge very different amounts for identical assets — entirely properly, under accounting standards.\n\nA tax system cannot tolerate that, because the choice would move tax between periods and between taxpayers at the taxpayer's discretion. So it does the only thing available: **disallows depreciation entirely and substitutes a statutory allowance of its own**, with rates and rules fixed by law and identical for everybody.\n\nThat is the whole reason for the add-back at the top of the adjustment and the deduction at the bottom. The tax system is not denying relief for capital assets; it is insisting on measuring the relief itself.",
        },
        {
          kind: "formula",
          name: "The two standard patterns for depreciation allowances",
          expr: "REDUCING BALANCE (a 'pool' system)\n     Opening pool balance                        X\n     add   additions in the period               X\n     less  disposals, at the LOWER of proceeds\n           and original cost                    (X)\n                                              -----\n           Balance before allowance              X\n     less  allowance at the stated %            (X)   <-- deducted in the computation\n                                              -----\n           CLOSING pool balance carried forward  X\n\nSTRAIGHT LINE (an 'asset by asset' system)\n     Allowance  =  cost  x  stated %  each period,\n                   usually until the cost is fully relieved\n\nMany systems add a FIRST-YEAR or INITIAL allowance on qualifying\nassets, giving accelerated relief in the period of purchase, with\nthe ordinary pattern applying to the balance thereafter.",
          note: "The pool mechanism is worth understanding rather than memorising. Pooling means individual assets lose their identity, so no gain or loss is computed on a disposal — the proceeds simply reduce the pool, and the effect washes through future allowances automatically. Capping the disposal deduction at ORIGINAL COST is what stops a genuine profit on sale being buried in the pool: any excess over cost is a capital gain and belongs in the gains computation instead.",
        },
        {
          kind: "list",
          title: "Design features that recur across jurisdictions",
          items: [
            "**Accelerated or first-year allowances** on assets the government wants bought — energy-efficient plant, low-emission vehicles, equipment in a designated region. The relief is the same in total but arrives sooner, and money sooner is worth more.",
            "**Annual investment-type allowances** giving full immediate relief up to a stated spend, which removes almost all small businesses from the pool system entirely and is a deliberate simplification.",
            "**Restricted rates for long-life or special assets** — buildings, integral features, cars above an emissions threshold — reflecting a genuinely longer economic life.",
            "**Private use adjustments** where a sole trader uses an asset partly privately. The allowance is computed in full and then the business proportion only is deducted, which keeps the pool arithmetic intact.",
            "**Balancing charges and allowances** when a business ceases or an asset leaves a single-asset pool. If total relief given exceeds the actual fall in value, the excess is clawed back as a balancing CHARGE; if it falls short, a balancing ALLOWANCE tops it up.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Timing is the whole value, and this is the point to make in a discussion answer",
          md: "Over the life of an asset, the total relief is the same under almost any system: eventually the business deducts what the asset cost it. Accelerated allowances do not increase the relief — they **move it earlier**.\n\nThat still matters, and saying why is what separates a good answer. Relief received now is worth more than the same relief in five years because of the time value of money, and it improves cash flow at exactly the moment the asset is paid for. It is also why a business expecting to be more profitable later may rationally prefer to defer relief where it has the choice, since a deduction is worth the marginal rate at which it is taken.",
        },
      ],
      check: {
        q: "In a reducing-balance pool system, why is the deduction for a disposal capped at the asset's original cost?",
        options: [
          "To simplify the arithmetic of the pool",
          "Because any excess over cost is a capital gain, which belongs in the gains computation rather than the pool",
          "Because assets never sell for more than they cost",
          "To prevent the pool balance from becoming negative",
        ],
        correct: 1,
        explain:
          "PROCEEDS ABOVE COST ARE A GAIN, NOT A REVERSAL OF RELIEF. Depreciation allowances relieve the fall in value below cost, so a disposal can only reverse relief up to what was originally spent. Anything above that is a genuine profit on the asset and is charged as a capital gain — capping the pool deduction is what keeps the two systems from overlapping.",
      },
    },
  ],
  examTraps: [
    { trap: "Adjusting only the items that look unusual.", fix: "Work down every line of the accounts and state a treatment for each, including 'no adjustment required'. Marks follow items addressed, not items adjusted." },
    { trap: "Treating all repairs as revenue.", fix: "Restoration is revenue; enlargement or improvement is capital; and initial repairs making a newly bought asset usable are capital because they form part of its cost." },
    { trap: "Leaving rent or interest inside the trading profit.", fix: "Deduct income taxed under another category from the trading computation and show it in its own line. It is moved, not exempted." },
    { trap: "Allowing a sole trader's own salary or drawings.", fix: "A sole trader cannot employ themselves. The salary is an appropriation of profit and is added back in full." },
    { trap: "Forgetting to add back depreciation before deducting the tax allowances.", fix: "Both halves are needed. The add-back removes the accountant's estimate; the deduction substitutes the statutory measure." },
  ],
  keyTerms: [
    { term: "Adjustment of profit", def: "The reconciliation from accounting net profit to taxable trading profit, by adding back disallowed expenditure and deducting non-trading income and statutory allowances." },
    { term: "Wholly and exclusively", def: "The general business deduction test, directed at the PURPOSE of the expenditure rather than its benefit." },
    { term: "Capital expenditure", def: "Spending that acquires, improves or enlarges the earning structure. Not deductible; relieved instead through depreciation allowances." },
    { term: "Depreciation allowance", def: "The statutory substitute for accounting depreciation, at rates fixed by law so that relief does not depend on the taxpayer's own estimates." },
    { term: "Pool", def: "A collective balance of qualifying expenditure in which individual assets lose their identity, so disposals adjust the pool rather than producing a separate gain or loss." },
    { term: "Balancing charge", def: "A clawback arising where total allowances given exceed the actual fall in the asset's value." },
    { term: "General provision", def: "A provision not referable to a specific identified liability. Normally disallowed, unlike a specific provision." },
  ],
  summary: [
    "Accounting profit and taxable profit differ because accounts show a true and fair view while tax applies the law; the adjustment reconciles them.",
    "The general test is wholly and exclusively for the trade, directed at purpose, overlaid by specific prohibitions on fines, entertaining and capital items.",
    "Capital acquires or improves the earning structure; revenue runs or restores it. Initial repairs to make an asset usable are capital.",
    "Deduct non-trading income from the computation and tax it in its own category — it is moved, not exempted.",
    "Depreciation is disallowed and replaced by statutory allowances, because accounting estimates would let taxpayers choose their own relief.",
    "Accelerated allowances change the timing of relief, not the total, and timing is worth money because of cash flow and the time value of money.",
  ],
}

/* ── Chapter 8 ─────────────────────────────────────────────────── */

export const TXG_TREE_08: StudyChapter = {
  id: "TXG-08",
  number: 8,
  paper: "TX",
  area: "B",
  title: "Investment income, pensions and social contributions",
  minutes: 18,
  intro:
    "Alongside income tax nearly every jurisdiction runs a second charge on earnings, funding pensions and benefits. It has its own base, its own rates and its own logic, and treating it as a footnote to income tax is how candidates lose easy marks.",
  outcomes: [
    "Explain how interest, dividends and property income are typically charged",
    "Explain the rationale for taxing pension saving on the way out rather than the way in",
    "Distinguish social contributions from income tax by base, payer and purpose",
    "Explain why contribution charges usually differ between employment and self-employment",
    "Identify the planning consequences of a contribution ceiling",
  ],
  sections: [
    {
      id: "investment-income-and-pensions",
      heading: "Income from capital, and income deferred",
      blocks: [
        {
          kind: "table",
          caption: "How the main categories of investment income are usually handled",
          head: ["Source", "Typical charge", "Why it is handled that way"],
          rows: [
            ["**Bank interest**", "Often withheld at source at a flat rate; sometimes final for individuals", "Easy for the payer to deduct, and it captures those who would not otherwise declare it"],
            ["**Dividends**", "Reduced rate, partial exemption, or an imputation credit", "The underlying profit already bore corporate tax; a full charge would tax it twice"],
            ["**Rental income**", "Net of allowable expenses, taxed as ordinary income", "It is closer to a business than to passive investment, so it needs an expense computation"],
            ["**Royalties**", "Often withheld, particularly when paid to non-residents", "Highly mobile and frequently cross-border"],
            ["**Pensions in payment**", "Taxed as ordinary income when received", "Relief was given on the contributions, so the charge falls at the other end"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Pensions: relieved going in, taxed coming out, and the reason is not generosity",
          md: "The near-universal pattern is that contributions attract relief, the fund grows free of tax, and the pension is taxed as income when drawn. It looks like a giveaway and it is not — the tax is **deferred, not forgiven**.\n\nThe design has three defensible purposes. It avoids taxing the same money twice, since income saved would otherwise be taxed when earned and again when the pension is paid. It removes a distortion against saving, because taxing the fund's growth would make saving through a pension worse than consuming now. And it is usually **fiscally sensible for the taxpayer**, because most people are on a higher marginal rate while working than in retirement, so relief comes at a high rate and tax is paid at a lower one.\n\nThat last point is why pension planning appears in scenarios. Jurisdictions counter the obvious abuse with annual and lifetime **caps** on relieved contributions, and those caps are where the examinable detail sits in any real variant.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Property income is computed like a small business",
          md: "Rents are taxed **net of the costs of earning them**, which makes property income look far more like trading income than like interest. Expect an expense computation, and expect the same capital/revenue line as in Chapter 7: replacing a broken boiler is a deductible repair, adding an extension is capital.\n\nThree features recur across jurisdictions and are worth knowing to look for. **Interest on a loan to buy the property** is often restricted rather than fully deductible, because full relief plus rising values was seen as favouring leveraged landlords. **Losses** are usually ring-fenced — set only against future property income, not against other income — because property is a chosen investment rather than a trade. And **furnished or short-term letting** is frequently taxed on its own more generous basis, sometimes as a trade.",
        },
      ],
      check: {
        q: "Why do most jurisdictions give relief on pension contributions and tax the pension when it is drawn?",
        options: [
          "Because pension income is a capital receipt rather than income",
          "To defer rather than forgive tax, avoid taxing the same money twice, and avoid discouraging saving",
          "Because pension funds are not capable of being taxed",
          "To ensure the tax is collected at the higher rates applying during working life",
        ],
        correct: 1,
        explain:
          "IT IS DEFERRAL, NOT EXEMPTION. Taxing income when earned AND again when the pension is paid would tax the same money twice, and taxing the fund's growth would penalise saving relative to spending. Relief in, tax out solves both — and because most people fall to a lower marginal rate in retirement, it is usually advantageous, which is why relieved contributions are capped.",
      },
    },
    {
      id: "social-contributions",
      heading: "The second charge on earnings",
      blocks: [
        {
          kind: "table",
          caption: "How a social contribution differs from income tax",
          head: ["", "Income tax", "Social contributions"],
          rows: [
            ["**Base**", "All categories of income", "EARNINGS only — employment income and business profits. Investment income is normally outside it"],
            ["**Who pays**", "The person receiving the income", "Often BOTH the worker and the employer, on the same earnings"],
            ["**Rate structure**", "Usually progressive across bands", "Often flat, and frequently with a CEILING above which no further charge arises"],
            ["**Purpose**", "General government revenue", "Nominally funds pensions, healthcare and benefits — sometimes genuinely hypothecated"],
            ["**Entitlement**", "Paying it buys nothing specific", "Often builds a RECORD giving entitlement to a pension or benefits"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A ceiling makes the contribution regressive, and it changes the answer to planning questions",
          md: "Where contributions stop above an earnings ceiling, the average contribution rate **falls** once earnings pass it — so that part of the system is regressive even though income tax over the same range is progressive.\n\nThis has two practical consequences worth stating. First, when you are asked about the total burden on an extra unit of pay, you must add income tax and contributions together and check whether the ceiling has been passed; the combined marginal rate can fall as income rises, which surprises people. Second, it explains why arrangements converting earnings into investment income or capital gains are attractive to high earners in a way they are not to low earners — above the ceiling, the contribution saving disappears, but below it the saving can exceed the income tax saving.\n\nThe defence of a ceiling is that contributions buy entitlement, and entitlement is usually capped too, so charging without limit would break the link between what is paid in and what is drawn out.",
        },
        {
          kind: "example",
          title: "Comparing the total burden on employment and self-employment",
          scenario:
            "Jurisdiction Z charges income tax at 20% up to CU 40,000 of taxable income and 40% above it, with a personal allowance of CU 10,000. Employees pay contributions at 10% of earnings between CU 10,000 and CU 50,000 and 2% above CU 50,000; their employers pay 14% on all earnings above CU 10,000 with no ceiling. The self-employed pay 9% on profits between CU 10,000 and CU 50,000 and 2% above. Tomas can take a contract worth CU 70,000 either as an employee or as a self-employed contractor. Assume the engager is indifferent to total cost.",
          steps: [
            { label: "Income tax — the same either way", detail: "Taxable income CU 70,000 − CU 10,000 = CU 60,000. First CU 40,000 at 20% = CU 8,000; remaining CU 20,000 at 40% = CU 8,000. Income tax CU 16,000 on either basis, because the income tax base does not care about status." },
            { label: "Employee contributions", detail: "10% on CU 10,000 to CU 50,000 = CU 40,000 × 10% = CU 4,000. Plus 2% on CU 70,000 − CU 50,000 = CU 20,000 × 2% = CU 400. Total CU 4,400." },
            { label: "Employer contributions", detail: "14% on earnings above CU 10,000 = CU 60,000 × 14% = CU 8,400. Tomas does not pay this, but the engager does, so it is part of the cost of employing him." },
            { label: "Self-employed contributions", detail: "9% on CU 40,000 = CU 3,600, plus 2% on CU 20,000 = CU 400. Total CU 4,000." },
            { label: "Compare what Tomas bears", detail: "As an employee: CU 16,000 + CU 4,400 = CU 20,400. As a contractor: CU 16,000 + CU 4,000 = CU 20,000. He is CU 400 better off self-employed." },
            { label: "Compare what the engagement costs", detail: "Employment costs the engager CU 70,000 + CU 8,400 = CU 78,400. Self-employment costs CU 70,000. The CU 8,400 difference dwarfs Tomas's CU 400 — which is why the pressure to treat workers as self-employed usually comes from the ENGAGER, and why authorities police status so hard." },
            { label: "State what is given up", detail: "The comparison is incomplete without it. Self-employment usually means no employment protection, no paid leave, no sick pay, and often reduced entitlement to contributory benefits — the contribution rate is lower partly because it buys less." },
          ],
          result:
            "**Tomas saves CU 400; the engager saves CU 8,400.** The instructive figure is the second one. Contribution systems that charge employers create a structural incentive to reclassify workers, which is precisely why the status tests in Chapter 6 are litigated so heavily — and why an answer that compares only the worker's position has missed most of what is going on.",
        },
        {
          kind: "list",
          title: "Why the self-employed usually pay less, and what follows from it",
          items: [
            "**There is no employer to charge.** The employer contribution simply has no counterpart in self-employment, so the combined take on the same earnings is lower.",
            "**Entitlement is often narrower.** Contributory benefits linked to employment — unemployment support, statutory sick pay, paid leave — are frequently unavailable, so a lower rate buys a smaller package.",
            "**Timing differs.** Employee contributions are withheld as earnings arise; the self-employed pay through the same self-assessment cycle as income tax, with the payment-on-account consequences of Chapter 3.",
            "**Profits, not drawings, are the base.** A self-employed person's contributions are charged on the profit the business makes, not on what they take out — so taking less does not reduce the charge.",
            "**The gap drives anti-avoidance.** Because the differential is large and structural, jurisdictions add rules to counter workers who incorporate or contract through intermediaries purely to escape it.",
          ],
        },
      ],
      check: {
        q: "Earnings are CU 90,000. Contributions are charged at 10% between CU 10,000 and CU 50,000 and 2% above. What does the ceiling structure do to the average contribution rate?",
        options: [
          "It rises, because a second rate has been added",
          "It stays constant across all earnings",
          "It falls once earnings pass CU 50,000, making that part of the system regressive",
          "It cannot be determined without the income tax rates",
        ],
        correct: 2,
        explain:
          "THE AVERAGE RATE FALLS. Up to CU 50,000 the charge accrues at 10%; beyond it only 2% is added, so total contributions grow far more slowly than earnings and the average rate declines. That is the definition of regressive from Chapter 1 — and it is why the combined marginal burden on high earners can fall as income rises.",
      },
    },
  ],
  examTraps: [
    { trap: "Charging social contributions on investment income.", fix: "The base is normally EARNINGS — employment income and business profits. Interest, dividends and most rent sit outside it." },
    { trap: "Comparing employment with self-employment using only the worker's contributions.", fix: "Include the EMPLOYER charge. It is usually much the larger figure and it is what drives reclassification pressure." },
    { trap: "Treating pension relief as a permanent exemption.", fix: "It is deferral. Relief is given on the way in and tax is charged on the way out, which is why relieved contributions are capped." },
    { trap: "Assuming a contribution ceiling makes no difference to the marginal rate.", fix: "Above the ceiling the combined marginal burden falls, which can make the total rate on an extra unit of pay lower for a high earner than a middle earner." },
    { trap: "Charging a self-employed person's contributions on drawings.", fix: "The base is the PROFIT the business makes, not what the owner withdraws." },
  ],
  keyTerms: [
    { term: "Social contribution", def: "A charge on earnings, usually payable by both worker and employer, nominally funding pensions and benefits and often building an entitlement record." },
    { term: "Contribution ceiling", def: "An earnings level above which no further contribution, or only a reduced one, is charged — making the charge regressive above that point." },
    { term: "Hypothecation", def: "Earmarking a tax or contribution for a specific purpose, such as funding a state pension, rather than for general revenue." },
    { term: "Imputation credit", def: "A credit given to a shareholder for corporate tax already paid on the profit from which a dividend is distributed." },
    { term: "Ring-fenced loss", def: "A loss usable only against future income of the same category, such as a property loss set only against later property income." },
    { term: "Deferred taxation of pensions", def: "The pattern of relieving contributions and exempting fund growth, then taxing the pension as income when it is drawn." },
  ],
  summary: [
    "Interest and royalties are often withheld at source; dividends are relieved because the profit already bore corporate tax; rent is taxed net of expenses like a small business.",
    "Property losses are commonly ring-fenced and loan interest is often restricted, because property is an investment rather than a trade.",
    "Pension relief defers tax rather than forgiving it, avoids double taxation of saved income, and is capped to stop the deferral being exploited.",
    "Social contributions differ from income tax in base, payer, rate structure and purpose, and paying them often buys entitlement.",
    "A contribution ceiling makes the charge regressive above it and lowers the combined marginal burden on high earners.",
    "The self-employed usually pay less, largely because there is no employer charge — and that gap, not the worker's own saving, is what drives status disputes.",
  ],
}

export const TXG_AREA_B: StudyChapter[] = [TXG_TREE_04, TXG_TREE_05, TXG_TREE_06, TXG_TREE_07, TXG_TREE_08]
