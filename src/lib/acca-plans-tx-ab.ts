/*
 * TX-UK Areas A and B — the UK tax system and its administration, and income tax
 * and national insurance liabilities.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * TX sets 15 objective tests at 2 marks, 3 OT cases at 10 marks, and a Section C of
 * constructed responses worth 40 marks.
 *
 * ── ONE RULE GOVERNS EVERY PLAN IN THIS PAPER ────────────────────
 * No plan states a rate, band, threshold or allowance as a figure to be learned.
 * Two reasons, and both are decisive. The exam PROVIDES a tax rates and allowances
 * sheet, so memorising figures earns nothing and the marks are for knowing which
 * figure to reach for and where it goes in the computation. And the figures change
 * with every Finance Act, so a plan quoting them would be teaching last year's tax
 * within a year of being written — silently, because a stale rate looks exactly like
 * a current one.
 *
 * So these plans teach the ORDER of a computation, which income falls in which
 * category, and which figure the rate sheet is being asked for. Where a worked
 * example needs numbers, the rates are stated in the question as the exam states
 * them.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const TX_PLANS_AB: ExamPlanMap = {
  /* ── TX-01 · The UK tax system ──────────────────────────────── */

  "TX-01::structure-and-sources": {
    title: "Classifying a tax, and where the law comes from",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an example of an **indirect** tax?\n\nA  Income tax\nB  Value added tax\nC  Capital gains tax\nD  Corporation tax",
    plan: [
      {
        step: "Split direct from indirect on who pays it over",
        detail:
          "A DIRECT tax is charged on income, profits or gains and paid to HMRC by the person bearing it. An INDIRECT tax is charged on a transaction and collected by an intermediary who passes it on.",
      },
      {
        step: "Apply the test to each option",
        detail:
          "Income tax, capital gains tax and corporation tax are all charged on income, gains or profits and paid by the person bearing them — all direct. VAT is charged on supplies and collected by the trader.",
      },
      {
        step: "Note the incidence point, since it is examined",
        detail:
          "With VAT the trader COLLECTS the tax but the consumer BEARS it. The person who accounts for a tax and the person who suffers it are different, and that is what makes it indirect.",
      },
      {
        step: "Recall the sources of tax law",
        detail:
          "Legislation — the annual Finance Acts amending the consolidating Acts — plus case law interpreting it, and HMRC guidance which is not law but states HMRC's view.",
      },
    ],
    answer:
      "**B — value added tax.**\n\nA **direct** tax is charged on income, profits or gains and paid to HMRC by the person who bears it. An **indirect** tax is charged on a **transaction** and collected by an intermediary who passes it on.\n\nSo income tax, capital gains tax and corporation tax are all direct. With **VAT** the registered trader **collects** the tax but the final consumer **bears** it — the person accounting for it and the person suffering it are different, and that separation is what makes a tax indirect.\n\nThe sources of tax law: **legislation**, in the form of the annual **Finance Acts** amending the consolidating Acts, plus **case law** interpreting it. **HMRC guidance** is not law — it states HMRC's view, and a taxpayer may take a different one and litigate it.\n\nTaxation also serves purposes beyond raising revenue: **redistribution** of wealth, and **influencing behaviour** through incentives and disincentives, which is why reliefs exist at all.",
    earns: [
      "Splitting direct from indirect on who bears the tax versus who accounts for it",
      "Knowing HMRC guidance is not law",
    ],
    loses: ["Classifying by the size or importance of the tax rather than by its incidence"],
  },

  "TX-01::avoidance-evasion-ethics": {
    title: "Distinguishing avoidance from evasion, and the adviser's duty",
    format: "ot",
    marks: 2,
    requirement:
      "A client asks their accountant to omit some cash takings from a tax return. The accountant should:\n\nA  Comply, as the client is responsible for the return\nB  Refuse, explain that this is evasion, and consider whether to report and to resign if the client persists\nC  Include the takings but add a note that the client objected\nD  Reduce the takings by half as a compromise",
    plan: [
      {
        step: "Classify the request",
        detail:
          "Omitting income is EVASION — illegal concealment or misstatement. Avoidance is arranging affairs within the law to reduce tax. The line is legality, and this request is on the wrong side of it.",
      },
      {
        step: "Reject the option that shifts responsibility",
        detail:
          "Option A says the client is responsible. The accountant would be knowingly assisting an illegal act, and the client's responsibility does not relieve the adviser of their own.",
      },
      {
        step: "State the professional route",
        detail:
          "Refuse, explain the position, advise disclosure, and consider whether a report is required. If the client persists, resign — and where the money is criminal property, the money laundering reporting obligation is engaged.",
      },
      {
        step: "Note the GAAR, since it sits between the two",
        detail:
          "The General Anti-Abuse Rule counters arrangements that are ABUSIVE — technically within the legislation but contrary to its purpose. So not everything lawful is safe, which is the distinction beyond simple legality.",
      },
    ],
    answer:
      "**B — refuse, explain that this is evasion, and consider whether to report and to resign if the client persists.**\n\nOmitting income is **evasion** — illegal concealment or misstatement of a tax position. **Avoidance** is arranging affairs within the law to reduce tax. The line between them is **legality**, and this request is plainly on the wrong side of it.\n\nOption A shifts responsibility to the client, but the accountant would be **knowingly assisting** an illegal act and the client's own responsibility relieves the adviser of nothing. Options C and D both participate in the misstatement to a lesser degree, which is still participation.\n\nThe professional route: refuse, explain the position, advise **disclosure** to HMRC, and consider whether a report is required — where the omitted takings are **criminal property**, the money laundering reporting obligation is engaged, and the accountant must not tip the client off about a report made.\n\nThe **GAAR** sits between avoidance and evasion: it counters arrangements that are **abusive** — technically within the legislation but contrary to its purpose. So being lawful is not the same as being safe.",
    earns: [
      "Classifying on legality, then giving the professional steps in order",
      "Knowing the money laundering obligation may be engaged, and naming the GAAR",
    ],
    loses: ["Treating the client's responsibility for the return as a defence for the adviser"],
  },

  /* ── TX-02 · Administration for individuals ────────────────── */

  "TX-02::returns-and-payments": {
    title: "Working out what a payment on account is based on",
    format: "ot",
    marks: 2,
    requirement:
      "Payments on account of income tax for a tax year are each normally based on:\n\nA  An estimate of the current year's liability\nB  50% of the previous year's income tax liability, excluding amounts deducted at source and capital gains tax\nC  50% of the previous year's total tax including capital gains tax\nD  The taxpayer's own choice of figure",
    plan: [
      {
        step: "State what the payments are based on",
        detail:
          "The PREVIOUS year's income tax liability, halved. Two equal payments on account, with a balancing payment afterwards once the actual liability is known.",
      },
      {
        step: "Note the two exclusions, which is what the question tests",
        detail:
          "Amounts already deducted at source — PAYE, for instance — are excluded, because they have already been paid. And CAPITAL GAINS TAX is excluded: it is never part of a payment on account.",
      },
      {
        step: "Note when payments on account are not required",
        detail:
          "Where the previous year's liability net of tax deducted at source is below a de minimis threshold, or where most of the liability was deducted at source. The rate sheet supplies the threshold.",
      },
      {
        step: "Note that they can be reduced",
        detail:
          "A taxpayer may CLAIM to reduce them where the current year's liability will be lower — but if the claim proves excessive, interest runs on the shortfall.",
      },
    ],
    answer:
      "**B — 50% of the previous year's income tax liability, excluding amounts deducted at source and capital gains tax.**\n\nTwo equal payments on account based on the **previous** year's income tax liability, followed by a **balancing payment** once the actual liability is known.\n\nThe two exclusions are what the question tests. Amounts **deducted at source** — PAYE and similar — are excluded because they have already been paid. And **capital gains tax is never** part of a payment on account: it is paid in full with the balancing payment, which is a point candidates lose regularly.\n\nPayments on account are **not required** where the previous year's liability net of tax deducted at source falls below a de minimis threshold, or where most of the liability was deducted at source. The exam's rate sheet supplies the threshold.\n\nThey may be **reduced** by claim where the current year's liability will be lower — but an excessive claim attracts **interest** on the shortfall, so the claim is not free.\n\nThe filing and payment dates are on the rate sheet; the examinable skill is knowing which date applies to which obligation.",
    earns: [
      "Knowing both exclusions, and that CGT is paid with the balancing payment",
      "Knowing a reduction claim carries interest risk if excessive",
    ],
    loses: ["Including capital gains tax in the payments on account"],
  },

  "TX-02::penalties-enquiries": {
    title: "How a penalty for an incorrect return is determined",
    format: "ot",
    marks: 2,
    requirement:
      "The penalty for submitting an incorrect tax return is determined principally by:\n\nA  The amount of tax underpaid alone\nB  The taxpayer's behaviour — careless, deliberate, or deliberate and concealed — with reductions for disclosure\nC  The number of years since the error\nD  Whether the taxpayer used an accountant",
    plan: [
      {
        step: "Identify what the penalty regime keys off",
        detail:
          "BEHAVIOUR. The maximum penalty rises with culpability: careless, then deliberate, then deliberate and concealed. The potential lost revenue sets the base to which the percentage applies.",
      },
      {
        step: "Note the reduction for disclosure",
        detail:
          "Penalties are reduced for disclosure, and reduced further for UNPROMPTED disclosure — made before the taxpayer had reason to believe HMRC was about to discover the error.",
      },
      {
        step: "See why the design matters",
        detail:
          "It is engineered to reward coming forward. An unprompted disclosure of a careless error can reduce the penalty to nil, which is the practical advice an adviser gives.",
      },
      {
        step: "Note that a reasonable mistake is not penalised",
        detail:
          "An error made despite taking reasonable care attracts NO penalty. So the regime distinguishes carelessness from an honest mistake, and the burden of showing reasonable care matters.",
      },
    ],
    answer:
      "**B — the taxpayer's behaviour — careless, deliberate, or deliberate and concealed — with reductions for disclosure.**\n\nThe regime keys off **behaviour**. The maximum penalty rises with culpability through **careless**, **deliberate**, and **deliberate and concealed**, and the percentage applies to the **potential lost revenue**.\n\nPenalties are then **reduced for disclosure**, and reduced **further** for **unprompted** disclosure — one made before the taxpayer had reason to believe HMRC was about to discover the error.\n\nThe design is deliberately engineered to reward coming forward: an **unprompted disclosure of a careless error can reduce the penalty to nil**, which is the single most useful piece of practical advice an adviser gives on this topic.\n\nAnd an error made **despite taking reasonable care** attracts **no penalty at all** — so the regime distinguishes carelessness from an honest mistake, and being able to show reasonable care is what secures that.\n\nHMRC may open a **compliance check** within a limited window after filing, and may make a **discovery assessment** outside it where a return was incorrect — with the time limit extending as culpability rises.",
    earns: [
      "Knowing behaviour sets the maximum and disclosure reduces it, with unprompted disclosure reducing it most",
      "Knowing reasonable care attracts no penalty",
    ],
    loses: ["Treating the penalty as a function of the tax underpaid alone"],
  },

  /* ── TX-03 · Administration for companies ─────────────────── */

  "TX-03::dates-and-instalments": {
    title: "Which companies pay corporation tax by instalments",
    format: "ot",
    marks: 2,
    requirement:
      "A company must pay its corporation tax by quarterly instalments where it is:\n\nA  Any company with taxable total profits\nB  A large company, by reference to augmented profits exceeding the threshold, unless it was not large in the previous year and profits are below the higher limit\nC  A company with any associated companies\nD  A company in its first accounting period",
    plan: [
      {
        step: "Identify the test and the measure it uses",
        detail:
          "Whether the company is LARGE, measured by AUGMENTED PROFITS — taxable total profits plus exempt dividends from non-group companies. Not taxable total profits alone.",
      },
      {
        step: "Note the let-out for a company newly large",
        detail:
          "A company not large in the previous year, with augmented profits below a higher limit, is not required to pay by instalments. That prevents a one-off spike triggering the regime.",
      },
      {
        step: "Note the effect of associated companies",
        detail:
          "The threshold is DIVIDED by the number of associated companies, so a group of small companies can each fall into the regime. Option C confuses that with the test itself.",
      },
      {
        step: "Note the direction of the instalments",
        detail:
          "A large company pays instalments based on the CURRENT period's estimated liability, so it is paying before the liability is known. That is the practical difficulty and drives the need for accurate forecasting.",
      },
    ],
    answer:
      "**B — a large company, by reference to augmented profits exceeding the threshold, unless it was not large in the previous year and profits are below the higher limit.**\n\nThe test is whether the company is **large**, measured by **augmented profits** — taxable total profits **plus exempt dividends** received from non-group companies. Using taxable total profits alone is the common error, and it understates the measure.\n\nThe **let-out** matters: a company that was **not large** in the previous year and whose augmented profits are below a higher limit is not required to pay by instalments, which prevents a one-off spike dragging a company into the regime.\n\n**Associated companies** divide the threshold, so a group of individually small companies can each fall into it — but that is a consequence of the test, not the test itself, which is what option C confuses.\n\nThe practical difficulty is the direction: a large company pays instalments on the **current** period's **estimated** liability, so it is paying before the liability is known — which makes accurate forecasting a real obligation rather than a courtesy. All other companies pay a single amount after the period end, on the date the rate sheet gives.",
    earns: [
      "Using augmented profits rather than taxable total profits, and knowing the newly-large let-out",
      "Knowing instalments are based on the current period's estimate",
    ],
    loses: ["Applying the test to taxable total profits, which omits exempt dividends"],
  },

  "TX-03::penalties-and-enquiries": {
    title: "A company's filing obligation and the consequence of missing it",
    format: "ot",
    marks: 2,
    requirement:
      "A company's corporation tax return must normally be filed within:\n\nA  Nine months of the end of the accounting period\nB  Twelve months of the end of the accounting period\nC  Six months of the end of the accounting period\nD  The same period as the tax payment date",
    plan: [
      {
        step: "Separate the filing date from the payment date",
        detail:
          "They are DIFFERENT, and that is the whole question. The return is due twelve months after the period end; payment for a company that is not large is due earlier, nine months and a day after it.",
      },
      {
        step: "Note the consequence of that gap",
        detail:
          "A company must pay before it is required to file — so it must compute its liability for payment purposes months before the return is due. Option D assumes the dates coincide, and they do not.",
      },
      {
        step: "Note the penalty structure",
        detail:
          "Fixed penalties for late filing, escalating with repeated lateness and with the period of delay, plus a tax-geared penalty where the return is very late.",
      },
      {
        step: "Note the record keeping obligation",
        detail:
          "Records must be kept for a period after the end of the accounting period, and failure to keep them is itself penalised regardless of whether the return was correct.",
      },
    ],
    answer:
      "**B — twelve months of the end of the accounting period.**\n\nThe **filing** date and the **payment** date are different, and that gap is the point. The return is due **twelve months** after the period end, while a company that is not large must **pay** nine months and a day after it.\n\nSo a company must **pay before it is required to file** — meaning it has to compute its liability for payment purposes months before the return falls due. Option D assumes the dates coincide, which is exactly the misunderstanding that produces a late payment by a company that filed on time.\n\n**Penalties** for late filing are fixed amounts that escalate with repeated lateness and with the length of the delay, with a **tax-geared** penalty where the return is very late. **Interest** runs on tax paid late, and is separate from the penalty.\n\n**Records** must be kept for a period after the end of the accounting period, and failure to keep them is penalised in its own right regardless of whether the return turned out to be correct.\n\nAll the specific dates and amounts are on the exam's rate sheet; the examinable skill is knowing which obligation each date attaches to.",
    earns: [
      "Separating the filing date from the payment date and naming the consequence of the gap",
      "Knowing interest and penalties are separate charges",
    ],
    loses: ["Assuming the filing and payment dates are the same"],
  },

  /* ── TX-04 · The income tax computation ────────────────────── */

  "TX-04::the-proforma": {
    title: "Why the order of the income tax computation matters",
    format: "ot",
    marks: 2,
    requirement:
      "In the income tax computation, income is taxed in the order:\n\nA  Dividend income, then savings income, then non-savings income\nB  Non-savings income, then savings income, then dividend income\nC  In whatever order is most beneficial to the taxpayer\nD  All income together at a single rate",
    plan: [
      {
        step: "State the order and why it exists",
        detail:
          "Non-savings, then savings, then dividends. The order matters because savings and dividend income have their own rates and their own nil-rate bands, and those apply only after the bands have been used by earlier income.",
      },
      {
        step: "See what the order determines",
        detail:
          "Which BAND each slice of income falls in. The same total income taxed in the wrong order produces a different liability, because a slice can be pushed into or out of a higher band.",
      },
      {
        step: "Reject the taxpayer's-choice option",
        detail:
          "The order is fixed by statute, not chosen. Option C is attractive because tax law does allow choices elsewhere — loss reliefs, for instance — but not here.",
      },
      {
        step: "Note where the nil-rate bands sit",
        detail:
          "The savings nil-rate band depends on the taxpayer's highest rate, and the dividend nil-rate band applies to the first slice of dividend income. Both USE UP band, so they affect what follows.",
      },
    ],
    answer:
      "**B — non-savings income, then savings income, then dividend income.**\n\nThe order is fixed by statute and it matters because savings and dividend income have **their own rates** and **their own nil-rate bands**, which apply only after the bands have been used by earlier income.\n\nWhat the order determines is **which band each slice falls in**. The same total income taxed in the wrong order produces a different liability, because a slice can be pushed into or out of a higher band — which is why marking follows the order rather than the total.\n\nOption C is attractive because tax law does allow the taxpayer choices elsewhere — loss reliefs most obviously — but not here.\n\nThe nil-rate bands are worth understanding rather than memorising: the **savings** nil-rate band depends on the taxpayer's **highest rate**, so a higher-rate taxpayer gets a smaller one, and the **dividend** nil-rate band applies to the first slice of dividend income. Both **use up band**, so they affect what follows even though no tax is charged on them.\n\nEvery rate, band and nil-rate amount is on the exam's rate sheet. The marks are for the order and the categorisation, not for the figures.",
    earns: [
      "Knowing the order is statutory and explaining what it determines",
      "Knowing the nil-rate bands use up band even though no tax arises on them",
    ],
    loses: ["Treating the order as a taxpayer's choice, or taxing all income together"],
  },

  "TX-04::allowance-and-exempt": {
    title: "How the personal allowance is restricted",
    format: "ot",
    marks: 2,
    requirement:
      "The personal allowance is reduced where a taxpayer's:\n\nA  Total income exceeds the income limit, by £1 for every £2 of the excess\nB  Adjusted net income exceeds the income limit, by £1 for every £2 of the excess\nC  Employment income exceeds the income limit\nD  Taxable income exceeds the basic rate band",
    plan: [
      {
        step: "Identify the measure the restriction uses",
        detail:
          "ADJUSTED NET INCOME, not total income and not taxable income. It is total income less gross gift aid donations and gross personal pension contributions.",
      },
      {
        step: "State the mechanism",
        detail:
          "The allowance falls by £1 for every £2 of adjusted net income above the limit, so it is fully lost once the excess reaches twice the allowance.",
      },
      {
        step: "See why the measure matters so much",
        detail:
          "Because pension contributions and gift aid REDUCE adjusted net income, they can restore the allowance. That gives an effective rate of relief far above the headline rate in the restriction band.",
      },
      {
        step: "Note the planning consequence",
        detail:
          "A contribution that brings adjusted net income back to the limit saves tax on the contribution AND recovers the allowance. This is the strongest planning point in the whole paper.",
      },
    ],
    answer:
      "**B — adjusted net income exceeds the income limit, by £1 for every £2 of the excess.**\n\nThe measure is **adjusted net income** — total income less **gross gift aid donations** and **gross personal pension contributions** — not total income and not taxable income. Getting the measure right is most of the question.\n\nThe allowance falls by **£1 for every £2** of the excess, so it is fully lost once the excess reaches twice the allowance.\n\nWhy the measure matters so much is the planning consequence, and it is the strongest point in the paper. Because pension contributions and gift aid **reduce adjusted net income**, they can **restore the allowance**. A contribution that brings adjusted net income back to the limit saves tax on the contribution **and** recovers the allowance — producing an effective rate of relief well above the headline rate for income in the restriction band.\n\nThat is why almost every TX planning question involves a pension contribution.\n\nOn the exempt side: ISA income, certain state benefits, gaming winnings and specified NS&I products are exempt from income tax entirely, so they never enter the computation at all.",
    earns: [
      "Using adjusted net income, and knowing what is deducted to arrive at it",
      "Naming the planning consequence: a contribution can restore the allowance",
    ],
    loses: ["Applying the restriction to total or taxable income, which gives the wrong measure"],
  },

  /* ── TX-05 · Adjustments to the computation ────────────────── */

  "TX-05::extending-the-band": {
    title: "How gift aid and pension contributions give relief",
    format: "ot",
    marks: 2,
    requirement:
      "A higher rate taxpayer makes a gift aid donation. Relief for the higher rate element is given by:\n\nA  Deducting the gross donation from total income\nB  Extending the basic rate band by the gross amount of the donation\nC  Deducting the net donation from taxable income\nD  A tax credit equal to the donation",
    plan: [
      {
        step: "Identify how basic rate relief is already given",
        detail:
          "At source. The donor pays a NET amount and the charity reclaims the basic rate, so basic rate relief has already been obtained before the computation begins.",
      },
      {
        step: "Identify how the higher rate element is given",
        detail:
          "By EXTENDING the basic rate band by the GROSS donation. That moves a slice of income from the higher rate band into the basic rate band, giving relief at the difference between the two rates.",
      },
      {
        step: "Note that the extension is at the GROSS amount",
        detail:
          "Gross up the net payment by the basic rate. Using the net figure understates the extension and is the standard error in this calculation.",
      },
      {
        step: "Note that personal pension contributions work identically",
        detail:
          "Same mechanism, same gross-up. And both reduce ADJUSTED NET INCOME, which is what makes them so powerful where the personal allowance is being restricted.",
      },
    ],
    answer:
      "**B — extending the basic rate band by the gross amount of the donation.**\n\n**Basic rate relief is already given at source**: the donor pays a net amount and the charity reclaims the basic rate, so that relief has been obtained before the computation starts.\n\nThe **higher rate element** is given by **extending the basic rate band** by the **gross** donation, which moves a slice of income out of the higher rate band and into the basic rate band — so the relief is the difference between the two rates.\n\nThe extension must be at the **gross** amount, arrived at by grossing up the net payment at the basic rate. Using the net figure understates the extension, and it is the standard error here.\n\n**Personal pension contributions** work identically — same mechanism, same gross-up — and the two share a second effect that matters more: both **reduce adjusted net income**, which is what makes them so powerful where the personal allowance is being restricted or the child benefit charge applies.\n\nSo a single contribution can produce relief at the marginal rate, restore the personal allowance, and remove a benefit charge at the same time.",
    earns: [
      "Knowing basic rate relief comes at source and the extension is at the gross amount",
      "Naming the second effect on adjusted net income",
    ],
    loses: ["Extending the band by the net donation, or deducting the donation from income"],
  },

  "TX-05::other-adjustments": {
    title: "When the marriage allowance and the child benefit charge apply",
    format: "ot",
    marks: 2,
    requirement:
      "The marriage allowance may be claimed where:\n\nA  Both spouses are higher rate taxpayers\nB  One spouse has unused personal allowance and neither is liable above the basic rate\nC  Either spouse chooses to claim it\nD  The couple's joint income is below the personal allowance",
    plan: [
      {
        step: "State the two conditions",
        detail:
          "One spouse or civil partner has UNUSED personal allowance, and neither is liable at more than the basic rate. Both conditions are required.",
      },
      {
        step: "Note the form the relief takes",
        detail:
          "A fixed amount of allowance is TRANSFERRED, and relief is given to the recipient as a TAX REDUCER at the basic rate — not as a deduction from income.",
      },
      {
        step: "See why the higher rate condition exists",
        detail:
          "The relief is aimed at couples where one has little income. A higher rate taxpayer would obtain relief at a rate the measure was not designed to give, so the condition excludes them.",
      },
      {
        step: "Contrast with the child benefit charge",
        detail:
          "That is the mirror image — a CLAWBACK where adjusted net income exceeds a threshold, charged on the higher earner and tapering to full withdrawal. Both turn on adjusted net income.",
      },
    ],
    answer:
      "**B — one spouse has unused personal allowance and neither is liable above the basic rate.**\n\nBoth conditions are required. The **higher rate condition** exists because the relief is aimed at couples where one partner has little income — a higher rate taxpayer would obtain relief at a rate the measure was never designed to give.\n\nThe form of the relief matters and is examined: a **fixed amount** of allowance is transferred, and relief is given to the recipient as a **tax reducer** at the basic rate, **not** as a deduction from income. So it reduces the tax bill by a fixed sum rather than the top slice of income.\n\nThe **high income child benefit charge** is the mirror image: a **clawback** where **adjusted net income** exceeds a threshold, charged on the **higher earner** of the couple and tapering until the benefit is fully withdrawn.\n\nBoth measures turn on income levels rather than on the tax computation itself, and the child benefit charge turns on **adjusted net income** — which is why a pension contribution can remove it, exactly as it can restore the personal allowance.\n\n**Jointly held property** income is split equally between spouses by default, unless they elect for actual beneficial shares.",
    earns: [
      "Requiring both conditions, and knowing the relief is a tax reducer rather than a deduction",
      "Connecting the child benefit charge to adjusted net income and therefore to pension planning",
    ],
    loses: ["Allowing the claim where either spouse is a higher rate taxpayer"],
  },

  /* ── TX-06 · Property income ───────────────────────────────── */

  "TX-06::computing-the-profit": {
    title: "Computing property income and the finance cost restriction",
    format: "ot",
    marks: 2,
    requirement:
      "For an individual letting residential property, mortgage interest is relieved:\n\nA  As a deduction from property income in full\nB  As a basic rate tax reducer, not as a deduction from property income\nC  Not at all\nD  As a deduction from total income",
    plan: [
      {
        step: "State the treatment for residential letting",
        detail:
          "Finance costs on RESIDENTIAL property are not deductible from property income. Relief is given as a TAX REDUCER at the basic rate instead.",
      },
      {
        step: "See why the distinction matters to the computation",
        detail:
          "Because the interest is not deducted, property income is HIGHER — which can push the taxpayer into a higher band, restrict the personal allowance, or trigger the child benefit charge. The tax reducer does not undo those effects.",
      },
      {
        step: "Note that the restriction is confined to residential property",
        detail:
          "Interest on a COMMERCIAL property letting remains fully deductible. So the answer turns on the type of property, and a stem naming commercial premises has a different answer.",
      },
      {
        step: "Note the cash basis default",
        detail:
          "Property income is computed on the CASH basis by default for individuals below a receipts threshold, with an election available for the accruals basis.",
      },
    ],
    answer:
      "**B — as a basic rate tax reducer, not as a deduction from property income.**\n\nFinance costs on **residential** property letting are not deductible from property income; relief is given as a **tax reducer at the basic rate**.\n\nWhy the distinction matters is the examinable consequence, and it goes beyond the rate of relief. Because the interest is **not deducted**, property income is **higher** — which can push the taxpayer into a higher band, **restrict the personal allowance**, or **trigger the child benefit charge**. The tax reducer reduces the tax bill but does **not** undo any of those knock-on effects.\n\nThe restriction is confined to residential property: interest on a **commercial** letting remains **fully deductible**, so a stem naming commercial premises has a different answer.\n\nProperty income is computed on the **cash basis** by default for individuals with receipts below a threshold, with an election available for the **accruals** basis. Allowable expenses are those incurred wholly and exclusively for the letting — repairs but not improvements, agents' fees, insurance and council tax where borne by the landlord.\n\n**Replacement domestic items relief** replaces the old wear and tear allowance.",
    earns: [
      "Knowing relief is a tax reducer and naming the knock-on effects of the higher property income",
      "Confining the restriction to residential property",
    ],
    loses: ["Deducting residential finance costs from property income"],
  },

  "TX-06::leases-rooms-losses": {
    title: "How a short lease premium is taxed",
    format: "ot",
    marks: 2,
    requirement:
      "A premium received on the grant of a short lease is:\n\nA  Wholly chargeable as property income\nB  Partly chargeable as property income, with the remainder treated as a capital receipt\nC  Wholly a capital receipt\nD  Exempt",
    plan: [
      {
        step: "Recognise the receipt as having two characters",
        detail:
          "A premium on a short lease is part income and part capital. The legislation splits it, because the payment is partly advance rent and partly a disposal of an interest.",
      },
      {
        step: "State how the split works",
        detail:
          "A proportion is chargeable as property income, calculated by reducing the premium by a fixed percentage for each complete year of the lease beyond the first. The remainder is a capital receipt.",
      },
      {
        step: "Note the direction of the effect",
        detail:
          "The LONGER the lease, the SMALLER the income element — a long lease looks more like a disposal and less like advance rent. That direction is worth checking any answer against.",
      },
      {
        step: "Note the definition of short",
        detail:
          "A lease of 50 years or less. A premium on a lease exceeding 50 years is wholly capital, so the first question is always the length of the lease.",
      },
    ],
    answer:
      "**B — partly chargeable as property income, with the remainder treated as a capital receipt.**\n\nThe premium has **two characters**: partly advance rent, partly consideration for disposing of an interest. The legislation splits it accordingly.\n\nA proportion is chargeable as **property income**, computed by reducing the premium by a fixed percentage for each **complete year of the lease beyond the first**. The **remainder** is a capital receipt falling within the capital gains rules.\n\nThe direction is worth checking any answer against: the **longer** the lease, the **smaller** the income element — because a long lease looks more like a disposal and less like advance rent.\n\n\"**Short**\" means a lease of **50 years or less**. A premium on a lease exceeding 50 years is **wholly capital**, so the first question is always the length of the lease.\n\nTwo related reliefs: **rent-a-room relief** exempts receipts from letting furnished accommodation in the taxpayer's main residence up to a limit, with an alternative of deducting the limit instead of actual expenses. And property **losses** are carried forward against future property income of the same business only — never set against other income.",
    earns: [
      "Splitting the premium and checking the answer against the lease-length direction",
      "Knowing property losses carry forward against property income only",
    ],
    loses: ["Treating the whole premium as either income or capital"],
  },

  /* ── TX-07 · Employment income ─────────────────────────────── */

  "TX-07::status-and-basis": {
    title: "Employment or self-employment, and why it matters",
    format: "ot",
    marks: 2,
    requirement:
      "Which factor points most strongly towards **self-employment**?\n\nA  The worker is paid a fixed monthly salary\nB  The worker provides their own equipment, can profit from sound management, and bears the financial risk of the work\nC  The worker must obey instructions on how the work is done\nD  The worker is entitled to paid holiday",
    plan: [
      {
        step: "Recall the factors the tests weigh",
        detail:
          "Control over how the work is done, provision of equipment, financial risk and the chance to profit, whether the work can be delegated, mutuality of obligation, integration into the business, and the number of engagers.",
      },
      {
        step: "Identify which options point at employment",
        detail:
          "A fixed salary, obedience to instructions on method, and paid holiday all indicate employment. Three point one way and one the other.",
      },
      {
        step: "Note that the parties' label does not decide it",
        detail:
          "A contract describing someone as self-employed does not make them so. HMRC looks at the reality of the relationship, which is why the tests exist at all.",
      },
      {
        step: "State what turns on the answer",
        detail:
          "Which NIC classes apply, whether PAYE operates, the deductibility test for expenses — wholly, exclusively and NECESSARILY for an employee against wholly and exclusively for a trader — and the timing of the tax.",
      },
    ],
    answer:
      "**B — the worker provides their own equipment, can profit from sound management, and bears the financial risk of the work.**\n\nThree indicators pointing the same way, and **financial risk with the chance to profit** is the strongest of them: an employee is paid for time, while a person in business stands to gain or lose from how well the work is done.\n\nA fixed salary, obedience to instructions on **method**, and paid holiday all indicate **employment**.\n\nThe parties' **label does not decide it**. A contract describing someone as self-employed does not make them so, and HMRC looks at the reality of the relationship.\n\nWhat turns on the answer is substantial and is the reason the topic opens this area: which **NIC classes** apply, whether **PAYE** operates so tax is deducted at source, the **timing** of the tax, and — the point examined most — the **deductibility test for expenses**. An employee's expense must be incurred **wholly, exclusively and necessarily** in performing the duties, while a trader's need only be **wholly and exclusively** for the trade. The extra word \"necessarily\" makes the employee's test markedly harder to satisfy.",
    earns: [
      "Naming financial risk as the strongest indicator, and that the label does not decide status",
      "Knowing the employee's expense test has the extra requirement of \"necessarily\"",
    ],
    loses: ["Treating the contractual description as determinative"],
  },

  "TX-07::deductions": {
    title: "Whether an employee's expense is deductible",
    format: "ot",
    marks: 2,
    requirement:
      "An employee's expense is deductible from employment income only if it is incurred:\n\nA  Wholly and exclusively for the employer's benefit\nB  Wholly, exclusively and necessarily in the performance of the duties of the employment\nC  For any purpose connected with the employment\nD  With the employer's written approval",
    plan: [
      {
        step: "Quote the test in full",
        detail:
          "Wholly, exclusively and NECESSARILY in the performance of the duties. All three words carry weight, and \"necessarily\" is the one that defeats most claims.",
      },
      {
        step: "See what \"necessarily\" excludes",
        detail:
          "An expense that is merely helpful, or that puts the employee in a position to do the job rather than being incurred IN doing it. Travel from home to a permanent workplace fails on that basis.",
      },
      {
        step: "Note what is deductible in practice",
        detail:
          "Travel on business other than ordinary commuting, professional subscriptions to approved bodies, contributions to an occupational pension scheme, and donations under payroll giving.",
      },
      {
        step: "Note the mileage alternative",
        detail:
          "Where an employee uses their own car for business, approved mileage allowance payments may be used. Payments above the approved amount are taxable; a shortfall is deductible.",
      },
    ],
    answer:
      "**B — wholly, exclusively and necessarily in the performance of the duties of the employment.**\n\nAll three words carry weight, and **\"necessarily\"** is the one that defeats most claims. It excludes an expense that is merely **helpful**, and one that puts the employee **in a position** to do the job rather than being incurred **in** doing it.\n\nThat is why **travel from home to a permanent workplace** is not deductible: the journey enables the duties rather than being part of performing them. Travel from one workplace to another, or to a temporary workplace, is deductible.\n\nWhat is deductible in practice: business travel other than ordinary commuting, **professional subscriptions** to approved bodies, contributions to an **occupational pension scheme**, and donations under **payroll giving**.\n\nThe **mileage** alternative applies where an employee uses their own car for business: approved mileage allowance payments may be used, with payments **above** the approved amount **taxable** and any **shortfall deductible**. The approved rates are on the rate sheet.\n\nNote the contrast with a trader, whose test is only **wholly and exclusively** — the same expenditure can be deductible for one and not the other.",
    earns: [
      "Quoting all three words and explaining what \"necessarily\" excludes",
      "Knowing the mileage rules work in both directions",
    ],
    loses: ["Omitting \"necessarily\", which is what makes the employee's test restrictive"],
  },

  /* ── TX-08 · Benefits ──────────────────────────────────────── */

  "TX-08::cars-and-vans": {
    title: "How a company car benefit is computed",
    format: "ot",
    marks: 2,
    requirement:
      "The taxable benefit for a company car available for private use is computed as:\n\nA  The car's market value at the year end\nB  The list price when new, adjusted for capital contributions, multiplied by a percentage based on CO₂ emissions\nC  The running costs borne by the employer\nD  The employee's business mileage",
    plan: [
      {
        step: "Identify the base and the multiplier",
        detail:
          "The LIST PRICE when new — not the price paid and not the current value — multiplied by a percentage driven by CO₂ EMISSIONS. Both elements come from the question or the rate sheet.",
      },
      {
        step: "Note the adjustments to the base",
        detail:
          "Optional accessories are added; a capital contribution by the employee is deducted up to a limit. The list price is used even where the car was bought second-hand or at a discount.",
      },
      {
        step: "Note the pro-rating and the reductions",
        detail:
          "The benefit is time-apportioned where the car is available for part of the year, and reduced by contributions the employee makes for private use. A period of unavailability must exceed a minimum to count.",
      },
      {
        step: "Note that fuel is a separate benefit",
        detail:
          "Private fuel provided is a SEPARATE benefit, computed as a fixed figure multiplied by the same CO₂ percentage — and it is NOT reduced by a partial reimbursement. Only full reimbursement removes it.",
      },
    ],
    answer:
      "**B — the list price when new, adjusted for capital contributions, multiplied by a percentage based on CO₂ emissions.**\n\nThe base is the **list price when new** — not the price actually paid and not the current market value — so a car bought second-hand or at a discount is taxed on its original list price. Optional **accessories** are added, and a **capital contribution** by the employee is deducted up to a limit.\n\nThe multiplier is a percentage driven by **CO₂ emissions**, taken from the rate sheet, with an addition for diesel cars not meeting the required standard.\n\nThe benefit is **time-apportioned** where the car is available for only part of the year, and reduced by any **contribution the employee makes for private use**. A period of unavailability must exceed a minimum number of days to count.\n\n**Fuel is a separate benefit**, and its rules differ in a way that is examined directly: it is a **fixed figure** multiplied by the **same CO₂ percentage**, and it is **not reduced by a partial reimbursement**. Only **full** reimbursement of all private fuel removes the charge — so an employee who repays some of it is taxed on the whole benefit and is worse off than one who repays none but claims nothing.",
    earns: [
      "Using list price when new rather than cost or current value",
      "Knowing partial reimbursement of fuel gives no reduction at all",
    ],
    loses: ["Computing the benefit on the price the employer actually paid"],
  },

  "TX-08::accommodation-loans-assets": {
    title: "Computing the accommodation and beneficial loan benefits",
    format: "ot",
    marks: 2,
    requirement:
      "Living accommodation provided to an employee gives rise to an **additional** benefit, over and above the basic charge, where the property:\n\nA  Is rented rather than owned by the employer\nB  Cost more than a specified limit\nC  Is used partly for business\nD  Is outside the United Kingdom",
    plan: [
      {
        step: "Separate the basic charge from the additional charge",
        detail:
          "The BASIC charge is the annual value, or the rent paid by the employer if higher. The ADDITIONAL charge arises only where the property COST more than a specified limit.",
      },
      {
        step: "State how the additional charge is computed",
        detail:
          "The official rate of interest applied to the excess of cost over the limit. So the additional charge grows with how far above the limit the property cost.",
      },
      {
        step: "Note the exemption for job-related accommodation",
        detail:
          "Accommodation is exempt where it is necessary for the proper performance of the duties, customary and better enables performance, or provided for security. A stem describing a caretaker is testing that.",
      },
      {
        step: "Note how the beneficial loan benefit works",
        detail:
          "The benefit is the official rate of interest less any interest actually paid. A de minimis exemption applies where the total of cheap loans stays below a threshold.",
      },
    ],
    answer:
      "**B — cost more than a specified limit.**\n\nThe **basic** charge is the **annual value**, or the **rent paid by the employer** if that is higher. The **additional** charge arises only where the property **cost** more than a specified limit, and is computed by applying the **official rate of interest** to the **excess of cost over the limit** — so it grows with how far above the limit the property cost.\n\nThe **exemption** matters as much as the computation: accommodation is exempt where it is **necessary** for the proper performance of the duties, **customary** and better enables performance, or provided for **security** reasons. A stem describing a caretaker living on site is testing that exemption rather than the calculation.\n\nThe **beneficial loan** benefit follows a similar shape: the benefit is interest at the **official rate** less any interest **actually paid**, with a **de minimis** exemption where the total of cheap or interest-free loans stays below a threshold.\n\nFor **use of an asset**, the benefit is a percentage of the asset's market value when first provided. If the asset is later **given** to the employee, the benefit is its market value at that point less amounts already taxed — so the two charges do not double up.",
    earns: [
      "Separating the basic charge from the cost-driven additional charge",
      "Knowing the job-related exemption and its three grounds",
    ],
    loses: ["Applying the additional charge because the property is rented rather than owned"],
  },

  /* ── TX-09 · Pensions ─────────────────────────────────────── */

  "TX-09::relief-and-limits": {
    title: "The two limits on pension tax relief",
    format: "ot",
    marks: 2,
    requirement:
      "Tax relief on an individual's pension contributions is limited by reference to:\n\nA  The annual allowance only\nB  The higher of relevant earnings and a basic amount, and separately by the annual allowance\nC  Total income\nD  The individual's age",
    plan: [
      {
        step: "Separate the two limits, because they do different jobs",
        detail:
          "EARNINGS limit: relief is available on the higher of relevant earnings and a basic amount. ANNUAL ALLOWANCE: a separate cap on total tax-relieved input, with a charge on the excess.",
      },
      {
        step: "Note that both apply",
        detail:
          "A contribution can be within the annual allowance and still exceed relevant earnings, or the reverse. Testing only one of the two is the error the question is built on.",
      },
      {
        step: "Note the tapering of the annual allowance",
        detail:
          "The annual allowance is TAPERED for high income individuals, reducing to a floor. So a high earner has a smaller allowance precisely when they most want to contribute.",
      },
      {
        step: "Note the carry forward of unused allowance",
        detail:
          "Unused annual allowance may be carried forward from the three previous tax years, provided the individual was a member of a scheme. That can accommodate a large one-off contribution.",
      },
    ],
    answer:
      "**B — the higher of relevant earnings and a basic amount, and separately by the annual allowance.**\n\nThe two limits do different jobs and **both** apply. The **earnings** limit means relief is available on contributions up to the higher of **relevant earnings** and a **basic amount** — so someone with no earnings can still obtain relief on the basic amount. The **annual allowance** is a separate cap on total tax-relieved input, with an **annual allowance charge** on any excess.\n\nA contribution can be within the annual allowance and still exceed relevant earnings, or the reverse — so testing only one of the two is the error the question is built on.\n\nThe annual allowance is **tapered** for high income individuals, reducing towards a floor. That is a genuine tension: a high earner has the **smallest** allowance precisely when they most want to contribute.\n\n**Unused annual allowance may be carried forward** from the three previous tax years, provided the individual was a scheme member in those years — which is what accommodates a large one-off contribution and is often the point of a planning question.\n\nRelief is given at source for personal pensions and by **net pay** arrangement for occupational schemes.",
    earns: [
      "Knowing both limits apply independently, and naming the taper and the carry forward",
      "Knowing relief is available on a basic amount even with no earnings",
    ],
    loses: ["Testing the annual allowance alone and ignoring relevant earnings"],
  },

  "TX-09::planning": {
    title: "Why a pension contribution is the strongest planning tool in TX",
    format: "ot",
    marks: 2,
    requirement:
      "A taxpayer's adjusted net income exceeds the income limit at which the personal allowance is restricted. A gross personal pension contribution reducing adjusted net income to the limit will:\n\nA  Give relief at the basic rate only\nB  Give relief at the marginal rate and restore the personal allowance, producing an effective rate of relief above the marginal rate\nC  Have no effect on the personal allowance\nD  Increase the taxpayer's liability",
    plan: [
      {
        step: "Identify both effects of the contribution",
        detail:
          "It extends the basic rate band, giving relief at the marginal rate. And it reduces ADJUSTED NET INCOME, which restores personal allowance that was being withdrawn.",
      },
      {
        step: "See why the two combine",
        detail:
          "The allowance is withdrawn at £1 for every £2 of excess, so restoring it recovers tax on income that was effectively being taxed twice. The combined saving exceeds the headline marginal rate.",
      },
      {
        step: "Note the other charges the same contribution can remove",
        detail:
          "The high income child benefit charge also turns on adjusted net income, so one contribution can extend the band, restore the allowance and remove the charge together.",
      },
      {
        step: "Note the constraint on the advice",
        detail:
          "The contribution must be within the earnings limit and the annual allowance, including any carry forward. Advice that ignores the limits recommends a contribution that triggers a charge.",
      },
    ],
    answer:
      "**B — give relief at the marginal rate and restore the personal allowance, producing an effective rate of relief above the marginal rate.**\n\nThe contribution has **two effects at once**. It **extends the basic rate band**, giving relief at the marginal rate. And it **reduces adjusted net income**, which restores personal allowance that was being withdrawn.\n\nThose combine because the allowance is withdrawn at **£1 for every £2** of excess: restoring it recovers tax on income that was effectively bearing a double charge, so the **combined saving exceeds the headline marginal rate** in the restriction band.\n\nThe same contribution can remove a **third** charge, because the **high income child benefit charge** also turns on adjusted net income — so one payment can extend the band, restore the allowance and remove the charge together. That is why almost every TX planning question involves a pension contribution.\n\nThe constraint on the advice is what a full answer must include: the contribution has to be within the **earnings limit** and the **annual allowance**, including any **carry forward** of unused allowance from the three previous years. Advice that ignores the limits recommends a contribution that triggers an annual allowance charge and undoes the benefit.",
    earns: [
      "Identifying both effects and explaining why the combined relief exceeds the marginal rate",
      "Stating the limits the advice must respect",
    ],
    loses: ["Giving relief at the marginal rate only, missing the allowance restoration"],
  },

  /* ── TX-10 · Trading profits ──────────────────────────────── */

  "TX-10::adjusting-the-profit": {
    title: "Adjusting accounting profit to taxable trading profit",
    format: "ot",
    marks: 2,
    requirement:
      "In adjusting accounting profit to taxable trading profit, which item is **added back**?\n\nA  Interest received, already included in profit\nB  Depreciation charged in the accounts\nC  Rent paid on business premises\nD  Wages of employees",
    plan: [
      {
        step: "Understand what the adjustment is doing",
        detail:
          "Reversing accounting treatments that tax law does not accept. Add back expenses that are not deductible; deduct income that is not trading income or is taxed elsewhere.",
      },
      {
        step: "Identify why depreciation is added back",
        detail:
          "Tax law gives CAPITAL ALLOWANCES instead of depreciation. So the accounting charge is reversed and the statutory allowance is deducted in its place.",
      },
      {
        step: "Note what else is added back",
        detail:
          "Private or non-trade expenditure, entertaining customers, most gifts, capital expenditure charged to profit, fines and penalties, and appropriations such as an owner's drawings or salary.",
      },
      {
        step: "Note what is deducted",
        detail:
          "Income included in the accounts that is not trading income — interest received, rent received, dividends — because each is taxed under its own rules and would otherwise be taxed twice.",
      },
    ],
    answer:
      "**B — depreciation charged in the accounts.**\n\nThe adjustment reverses accounting treatments tax law does not accept. Depreciation is added back because tax law gives **capital allowances instead** — so the accounting charge is reversed and the statutory allowance deducted in its place.\n\nAlso added back: **private or non-trade** expenditure, **entertaining customers** (though staff entertaining is allowable), most **gifts**, **capital expenditure** charged to profit, **fines and penalties**, and **appropriations** such as an owner's drawings or notional salary — which are not expenses of the trade at all but a distribution of its profit.\n\n**Deducted**: income included in the accounts that is **not trading income** — interest received, rent received, dividends — because each is taxed under its own rules and leaving it in would tax it twice. Option A describes exactly that, and it is a **deduction**, not an add-back.\n\nAlso deducted: **capital allowances**, and any allowable expenditure not charged in the accounts.\n\nThe discipline is to work down the accounts item by item asking two questions of each: is this an allowable trading expense, and is this trading income?",
    earns: [
      "Explaining that depreciation is added back because capital allowances replace it",
      "Knowing non-trading income is deducted rather than added",
    ],
    loses: ["Adding back an item that should be deducted, which moves the profit twice"],
  },

  "TX-10::basis-periods": {
    title: "Which profits are taxed in which tax year",
    format: "ot",
    marks: 2,
    requirement:
      "Under the tax year basis, a sole trader whose accounting period does not coincide with the tax year is taxed on:\n\nA  The profits of the accounting period ending in the tax year\nB  The profits arising in the tax year itself, apportioning the results of the accounting periods that straddle it\nC  The profits of the accounting period beginning in the tax year\nD  Whichever period gives the lower profit",
    plan: [
      {
        step: "State the basis",
        detail:
          "Profits arising IN THE TAX YEAR. Where an accounting period straddles the year end, its results are apportioned so that only the part falling in the tax year is taxed.",
      },
      {
        step: "Note what this replaced and why the change matters",
        detail:
          "The previous current year basis taxed the accounting period ENDING in the tax year. Option A describes the old basis, which is why it reads plausibly.",
      },
      {
        step: "Note the apportionment method",
        detail:
          "Normally on a time basis, in days or months. So a trader with a 31 December year end is taxed on part of two accounting periods in every tax year.",
      },
      {
        step: "Note the practical consequence",
        detail:
          "A trader whose accounting date is not 31 March or 5 April must apportion every year, and may need estimated figures because the later period has not ended when the return is due.",
      },
    ],
    answer:
      "**B — the profits arising in the tax year itself, apportioning the results of the accounting periods that straddle it.**\n\nThe **tax year basis** taxes profits **arising in the tax year**. Where an accounting period straddles the year end, its results are **apportioned** — normally on a time basis in days or months — so that only the part falling within the tax year is taxed.\n\nOption A describes the **previous current year basis**, which taxed the accounting period **ending** in the tax year. That is why it reads plausibly, and it is the answer of anyone working from older material.\n\nThe practical consequence is what makes the topic examinable: a trader whose accounting date is **not 31 March or 5 April** must apportion in every tax year, and may need **estimated** figures because the later accounting period has not ended when the return falls due — with the estimate corrected later.\n\nWhich is why aligning the accounting date with the tax year end removes the apportionment entirely, and is the practical planning point.\n\nOption D is worth striking on principle: the basis is statutory, not a choice between outcomes.",
    earns: [
      "Knowing the basis apportions across straddling periods, and why option A is the superseded basis",
      "Naming the alignment of the accounting date as the practical simplification",
    ],
    loses: ["Applying the old current year basis, which taxes the period ending in the tax year"],
  },

  /* ── TX-11 · Capital allowances ───────────────────────────── */

  "TX-11::the-pools-and-order": {
    title: "Working the capital allowances computation in order",
    format: "ot",
    marks: 2,
    requirement:
      "In a capital allowances computation, the annual investment allowance is:\n\nA  Given on all qualifying expenditure including cars\nB  Given on qualifying plant and machinery but not on cars, up to an annual limit\nC  Given only on assets in the special rate pool\nD  Given instead of, not as well as, writing down allowances",
    plan: [
      {
        step: "State what the AIA covers and what it excludes",
        detail:
          "Qualifying plant and machinery up to an annual limit — but NOT cars. Cars go into a pool and receive a writing down allowance instead, at a rate set by CO₂ emissions.",
      },
      {
        step: "Note that it works alongside writing down allowances",
        detail:
          "Expenditure above the limit, and expenditure that does not qualify for AIA, receives a writing down allowance. So the two operate together rather than as alternatives.",
      },
      {
        step: "Note the ordering choice, which is the examinable planning point",
        detail:
          "Where the AIA cannot cover all additions, allocate it FIRST to special rate pool additions, because those attract the lower writing down allowance. That accelerates total relief.",
      },
      {
        step: "Note the pro-rating",
        detail:
          "The AIA limit is time-apportioned for a period of account longer or shorter than twelve months, so a short period gets a proportionately smaller limit.",
      },
    ],
    answer:
      "**B — given on qualifying plant and machinery but not on cars, up to an annual limit.**\n\nThe AIA covers qualifying plant and machinery up to an annual limit and **excludes cars**, which instead enter a pool and receive a **writing down allowance** at a rate set by **CO₂ emissions**.\n\nIt works **alongside** writing down allowances rather than instead of them: expenditure above the limit, and expenditure that does not qualify, receives a WDA. So option D reverses the relationship.\n\nThe **ordering choice** is the examinable planning point. Where the AIA cannot cover all additions, allocate it **first to special rate pool** additions, because those attract the **lower** writing down allowance — so covering them with the AIA accelerates total relief. Allocating it to main pool additions instead defers relief unnecessarily.\n\nThe limit is **time-apportioned** for a period of account longer or shorter than twelve months.\n\nThe computation runs in a set order: open the pools, add additions, deduct disposals at the lower of proceeds and original cost, claim AIA or first year allowances, then WDA on the balance, then carry the balance forward. All rates and limits are on the exam's rate sheet.",
    earns: [
      "Knowing cars are excluded from the AIA and receive a WDA by emissions",
      "Allocating the AIA to special rate additions first, and saying why",
    ],
    loses: ["Claiming AIA on a car, or treating AIA and WDA as alternatives"],
  },

  "TX-11::balancing-and-sba": {
    title: "When a balancing allowance or charge arises",
    format: "ot",
    marks: 2,
    requirement:
      "A balancing **charge** arises on a pool where:\n\nA  The pool balance is positive after deducting disposal proceeds\nB  Disposal proceeds exceed the pool balance, producing a negative figure\nC  The trade continues\nD  An asset is acquired",
    plan: [
      {
        step: "Understand what a balancing figure represents",
        detail:
          "A correction. Allowances given over the asset's life turned out to be too much or too little, and the balancing figure settles the difference.",
      },
      {
        step: "Derive the direction",
        detail:
          "If proceeds EXCEED the pool balance, too much relief was given, so a balancing CHARGE claws it back. If the balance remains after disposal, too little was given and a balancing ALLOWANCE is due.",
      },
      {
        step: "Note when a balancing allowance can arise on a continuing trade",
        detail:
          "On a SHORT LIFE ASSET election or a single asset pool. On the main pool, a balancing allowance arises only when the trade CEASES — so option C is the wrong condition.",
      },
      {
        step: "Note the structures and buildings allowance separately",
        detail:
          "SBA is given on qualifying construction cost of non-residential buildings on a straight line basis, and no balancing adjustment arises on disposal — instead the allowances given reduce the base cost for capital gains.",
      },
    ],
    answer:
      "**B — disposal proceeds exceed the pool balance, producing a negative figure.**\n\nA balancing figure is a **correction**: allowances given over the asset's life turned out to be too much or too little, and the balancing figure settles the difference.\n\nSo if proceeds **exceed** the pool balance, too much relief was given and a balancing **charge** claws it back. If a balance **remains** after disposal, too little was given and a balancing **allowance** is due.\n\nWhen each can arise matters. A balancing **charge** can arise at any time. A balancing **allowance** on the **main pool** arises only when the **trade ceases** — which is why option C states the wrong condition. On a **short life asset** election or a **single asset pool**, a balancing allowance can arise on disposal while the trade continues, and that is the point of making the election: it accelerates relief on an asset expected to be sold at a low value.\n\nDisposals are brought in at the **lower of proceeds and original cost**, so a rise in value never produces a charge exceeding the allowances actually given.\n\nThe **structures and buildings allowance** behaves differently: straight line on qualifying construction cost of non-residential buildings, with **no balancing adjustment** on disposal — instead the allowances given **reduce the base cost** for capital gains purposes.",
    earns: [
      "Deriving the direction from over- or under-relief, and knowing when each can arise",
      "Knowing SBA has no balancing adjustment but reduces the CGT base cost",
    ],
    loses: ["Expecting a main pool balancing allowance while the trade continues"],
  },

  /* ── TX-12 · Partnerships ─────────────────────────────────── */

  "TX-12::allocation": {
    title: "Allocating partnership profit",
    format: "ot",
    marks: 2,
    requirement:
      "A partnership's tax-adjusted trading profit is allocated between the partners:\n\nA  Equally in all cases\nB  According to the profit sharing arrangement in force during the period, applying salaries and interest on capital first\nC  In proportion to capital contributed\nD  As the partners choose after the year end",
    plan: [
      {
        step: "Establish what is allocated",
        detail:
          "The partnership's TAX-ADJUSTED profit, computed as though the firm were a single trader. The adjustment happens once, at partnership level, before any allocation.",
      },
      {
        step: "State the allocation order",
        detail:
          "Apply salaries and interest on capital first, then divide the balance in the profit sharing ratio. Salaries and interest are appropriations, not deductible expenses.",
      },
      {
        step: "Note what happens when the arrangement changes mid-period",
        detail:
          "The profit is apportioned to the parts of the period and each part allocated under the ratio then in force. Applying the year-end ratio to the whole period is the standard error.",
      },
      {
        step: "Note that each partner is then taxed individually",
        detail:
          "Each partner is taxed on their own share as though it were their own trade, with their own basis period, their own loss reliefs and their own NIC. The firm is not a taxable person.",
      },
    ],
    answer:
      "**B — according to the profit sharing arrangement in force during the period, applying salaries and interest on capital first.**\n\nThe partnership's **tax-adjusted** profit is computed once, at partnership level, as though the firm were a single trader — so partners' **salaries** and **interest on capital** are **added back** in that computation, because they are appropriations of profit rather than deductible expenses.\n\nThey are then applied **first** in the allocation, with the balance divided in the profit sharing ratio.\n\nWhere the arrangement **changes mid-period**, the profit is **apportioned to the parts of the period** and each part allocated under the ratio then in force. Applying the year-end ratio to the whole period is the standard error and is what a change of ratio in the stem is testing.\n\nEach partner is then taxed **individually** on their own share as though it were their own trade — with their own basis period, their own **loss reliefs**, and their own **national insurance**. The firm itself is not a taxable person, which is why a partner's choices are their own.",
    earns: [
      "Knowing salaries and interest are added back then applied first in the allocation",
      "Apportioning where the ratio changes mid-period",
    ],
    loses: ["Applying the closing profit sharing ratio to the whole period"],
  },

  "TX-12::partner-losses": {
    title: "Whether partners must make the same loss relief claim",
    format: "ot",
    marks: 2,
    requirement:
      "Where a partnership makes a loss, each partner:\n\nA  Must make the same loss relief claim as the other partners\nB  May choose their own loss relief independently of the others\nC  Cannot claim relief until the partnership ceases\nD  Must carry the loss forward",
    plan: [
      {
        step: "Recall that the partner, not the firm, is the taxpayer",
        detail:
          "The loss is allocated to each partner, and each then relieves their own share under the rules applying to them individually.",
      },
      {
        step: "Draw the consequence",
        detail:
          "Each partner may make a DIFFERENT claim, because each has different other income, different marginal rates and different circumstances. Nothing requires uniformity.",
      },
      {
        step: "See why that matters in a question",
        detail:
          "A stem giving two partners with different other income is inviting different recommendations. Recommending the same relief for both misses the point of supplying the difference.",
      },
      {
        step: "Note the reliefs available to a partner",
        detail:
          "The same four as any sole trader: carry forward against future profits of the same trade, set against total income of the current or preceding year, early trade losses on commencement, and terminal loss relief on cessation.",
      },
    ],
    answer:
      "**B — may choose their own loss relief independently of the others.**\n\nThe **partner**, not the firm, is the taxpayer. The loss is allocated to each partner, and each then relieves their **own share** under the rules applying to them individually.\n\nSo each partner may make a **different** claim — because each has different other income, different marginal rates, and different circumstances. Nothing requires uniformity.\n\nWhy that matters in an exam: a stem giving two partners with **different other income** is inviting **different recommendations**, and recommending the same relief for both misses the reason the difference was supplied. One partner with substantial other income may want relief against total income now; another with none may be better carrying the loss forward against future trading profits taxed at a higher rate.\n\nThe reliefs available to a partner are the same four as any sole trader: **carry forward** against future profits of the same trade, set against **total income** of the current or preceding year, **early trade losses** relief on commencement, and **terminal loss** relief on cessation.\n\nA partner joining or leaving is treated as commencing or ceasing a trade, so the opening and closing year rules apply to them alone.",
    earns: [
      "Knowing the partner is the taxpayer, so claims are independent",
      "Recognising that different other income in the stem invites different recommendations",
    ],
    loses: ["Requiring the partners to make a common claim"],
  },

  /* ── TX-13 · Trading losses for individuals ───────────────── */

  "TX-13::the-four-reliefs": {
    title: "Choosing between the loss reliefs",
    format: "ot",
    marks: 2,
    requirement:
      "A trading loss relieved against **total income** of the current or preceding tax year:\n\nA  May be restricted to part of the loss, to preserve the personal allowance\nB  Must be claimed against the whole of the available income of that year, even if that wastes the personal allowance\nC  May be carried forward instead if the claim proves unhelpful\nD  Is deducted after the personal allowance",
    plan: [
      {
        step: "State the all-or-nothing character of the claim",
        detail:
          "A claim against total income must use the maximum possible, up to the whole of that year's income. It cannot be restricted to preserve the personal allowance.",
      },
      {
        step: "See the consequence",
        detail:
          "The claim can WASTE the personal allowance, because the loss is deducted from total income BEFORE the allowance. Where income is low, much of the relief is obtained at no effective rate.",
      },
      {
        step: "Draw the advice that follows",
        detail:
          "Compare the reliefs on the effective RATE of relief obtained. Carrying the loss forward against future profits taxed at a higher rate may be worth more than relieving it now at nil.",
      },
      {
        step: "Recall all four reliefs and their trade-off",
        detail:
          "Carry forward against future profits of the same trade; against total income of the current or preceding year; early trade losses in the first four years, carried back three years earliest first; and terminal loss relief on cessation.",
      },
    ],
    answer:
      "**B — must be claimed against the whole of the available income of that year, even if that wastes the personal allowance.**\n\nA claim against total income is **all or nothing** for that year: it uses the maximum possible and **cannot be restricted** to preserve the personal allowance.\n\nThe consequence is the point. Because the loss is deducted from total income **before** the personal allowance, the claim can **waste** the allowance — so where income is low, part of the relief is obtained at an effective rate of **nil**.\n\nThe advice that follows is what a written question wants: compare the reliefs on the **effective rate of relief obtained**, not on how quickly relief arrives. Carrying the loss forward against future profits taxed at a higher rate can be worth considerably more than relieving it now against income covered by the allowance.\n\nThe four reliefs: **carry forward** against future profits of the same trade, automatic and indefinite; against **total income** of the current or preceding tax year, in either order; **early trade losses** relief in the first four tax years, carried back **three** years **earliest first**; and **terminal loss** relief on cessation, carried back three years **latest first**.\n\nNote the two carry-back orders run in **opposite** directions, which is examined directly.",
    earns: [
      "Knowing the claim cannot be restricted, and that this can waste the personal allowance",
      "Comparing reliefs on the effective rate obtained, and knowing the two carry-back orders differ",
    ],
    loses: ["Restricting the claim to preserve the allowance, which the rules do not permit"],
  },

  "TX-13::gains-and-choice": {
    title: "Relieving a loss against chargeable gains",
    format: "ot",
    marks: 2,
    requirement:
      "A trading loss may be set against chargeable gains of a tax year:\n\nA  Instead of making a claim against total income\nB  Only after a claim against total income of that year has been made, and only to the extent the loss remains\nC  Without any restriction\nD  Only where there are no other losses",
    plan: [
      {
        step: "Note the sequencing requirement",
        detail:
          "The claim against gains is only available where a claim against TOTAL INCOME of the same year has been made first, and only for the loss remaining after it.",
      },
      {
        step: "See why the order exists",
        detail:
          "It prevents a taxpayer relieving a loss against gains taxed at a lower rate while leaving income taxed at a higher rate unrelieved. The order forces income relief first.",
      },
      {
        step: "Note the cap on relief against total income",
        detail:
          "A cap applies to the amount of trading loss that may be relieved against total income other than profits of the same trade, set at the greater of a fixed amount and a percentage of adjusted total income.",
      },
      {
        step: "Note what to do in a written answer",
        detail:
          "Set out the alternatives, compute the effective rate of relief under each, and RECOMMEND one with reasons. A computation of every option without a recommendation loses the advice marks.",
      },
    ],
    answer:
      "**B — only after a claim against total income of that year has been made, and only to the extent the loss remains.**\n\nThe claim against **chargeable gains** is available only where a claim against **total income** of the same year has been made first, and only for the loss **remaining** after it.\n\nThe order exists to prevent a taxpayer relieving a loss against gains — potentially taxed at a lower rate — while leaving income taxed at a higher rate unrelieved. The sequencing forces income relief first.\n\nA **cap** applies to the amount of trading loss relievable against total income **other than** profits of the same trade, set at the greater of a fixed amount and a percentage of adjusted total income. So a very large loss cannot be relieved against unlimited other income.\n\nFor a written answer the method matters as much as the rules: set out the **alternatives**, compute the **effective rate of relief** under each, and **recommend one with reasons**. Computing every option and stopping loses the advice marks, which on a loss relief question are usually the larger half.\n\nThe recommendation should also consider **cash flow** — relief now against a lower rate may be preferable to relief later at a higher one if the cash is needed.",
    earns: [
      "Knowing the gains claim is conditional on an income claim being made first, and why",
      "Recommending one relief with reasons rather than computing all of them",
    ],
    loses: ["Treating the gains claim as an alternative to the income claim"],
  },

  /* ── TX-14 · National insurance ───────────────────────────── */

  "TX-14::the-classes": {
    title: "Which NIC class applies to whom",
    format: "ot",
    marks: 2,
    requirement:
      "Class 1A national insurance contributions are payable by:\n\nA  Employees on their earnings\nB  Employers on taxable benefits provided to employees\nC  The self-employed on their trading profits\nD  Employees on their benefits",
    plan: [
      {
        step: "Map each class to its payer and its base",
        detail:
          "Class 1 primary: employee, on earnings. Class 1 secondary: employer, on earnings. Class 1A: EMPLOYER, on taxable BENEFITS. Class 2 and 4: self-employed, on profits.",
      },
      {
        step: "Note that employees pay nothing on benefits",
        detail:
          "Class 1A is an EMPLOYER-only charge. So a benefit costs the employee income tax and the employer Class 1A — which is why options A and D are wrong.",
      },
      {
        step: "Note the base for Class 1A",
        detail:
          "The same taxable benefit figure used for income tax. So the car benefit computed for the employee's income tax is also the Class 1A base.",
      },
      {
        step: "Note the class 4 interaction",
        detail:
          "The self-employed pay Class 4 on trading profits between thresholds, and Class 4 is charged on the SAME profits as income tax — so a trading loss reduces both.",
      },
    ],
    answer:
      "**B — employers on taxable benefits provided to employees.**\n\nMap each class to its payer and its base. **Class 1 primary**: employee, on earnings. **Class 1 secondary**: employer, on earnings. **Class 1A**: **employer only**, on taxable **benefits**. **Class 2 and Class 4**: self-employed, on profits.\n\nEmployees pay **nothing** on benefits, which is what makes options A and D wrong — a benefit costs the **employee income tax** and the **employer Class 1A**, and that asymmetry is why benefits can be an efficient form of remuneration for the employee even where they are expensive for the employer.\n\nThe **base** for Class 1A is the **same taxable benefit figure** used for income tax, so the car benefit computed for the employee's income tax is also the Class 1A base. Computing it twice is unnecessary.\n\n**Class 4** is charged on **trading profits** between thresholds — the same profits as income tax — so a trading loss reduces both. **Class 2** is a flat weekly charge with its own small profits rules.\n\nAll rates and thresholds are on the exam's rate sheet; the marks are for identifying the right class and the right base.",
    earns: [
      "Mapping class to payer and base, and knowing employees bear no NIC on benefits",
      "Knowing Class 1A uses the same figure as the income tax benefit",
    ],
    loses: ["Charging an employee national insurance on a benefit in kind"],
  },

  "TX-14::collection": {
    title: "Why the employment/self-employment distinction matters for NIC",
    format: "ot",
    marks: 2,
    requirement:
      "The principal national insurance consequence of a worker being self-employed rather than employed is that:\n\nA  No contributions are payable at all\nB  The employer's secondary contribution is avoided, and the worker pays Class 2 and 4 rather than Class 1\nC  Contributions are payable at a higher rate\nD  Contributions are collected through PAYE",
    plan: [
      {
        step: "Compare the total charge under each status",
        detail:
          "Employment attracts BOTH the employee's Class 1 primary and the employer's Class 1 secondary. Self-employment attracts Class 2 and Class 4 from the worker only, with no engager charge.",
      },
      {
        step: "Identify where the saving falls",
        detail:
          "Mainly on the ENGAGER, which loses the secondary contribution. That is why the classification is contested — the engager has a direct financial interest in the answer.",
      },
      {
        step: "Note the collection difference",
        detail:
          "Class 1 is collected through PAYE at the time of payment. Class 2 and 4 are collected through self assessment, so the self-employed worker pays later — a cash flow advantage.",
      },
      {
        step: "Note why HMRC scrutinises the distinction",
        detail:
          "Because the total charge is lower and collection is later, misclassification costs the Exchequer. That is what drives the status tests and the anti-avoidance rules around them.",
      },
    ],
    answer:
      "**B — the employer's secondary contribution is avoided, and the worker pays Class 2 and 4 rather than Class 1.**\n\nEmployment attracts **both** the employee's **Class 1 primary** and the employer's **Class 1 secondary** contribution. Self-employment attracts **Class 2 and Class 4** from the worker only, with **no charge on the engager**.\n\nSo the saving falls mainly on the **engager**, which loses the secondary contribution — and that is precisely why the classification is contested. The engager has a direct financial interest in the worker being self-employed, which is why the status tests exist and why the parties' own label is not determinative.\n\n**Collection** differs too: Class 1 is collected through **PAYE at the time of payment**, while Class 2 and 4 are collected through **self assessment** — so the self-employed worker pays **later**, which is a genuine cash flow advantage.\n\nBecause the total charge is lower **and** collection is later, misclassification costs the Exchequer on both counts. That is what drives HMRC's scrutiny of status and the anti-avoidance rules around it.\n\nContributions also build entitlement to contributory state benefits, which differ by class — so the choice is not purely a matter of cost.",
    earns: [
      "Identifying that the saving falls mainly on the engager, and why that makes status contested",
      "Naming the collection timing difference as a second advantage",
    ],
    loses: ["Assuming no contributions arise on self-employment"],
  },
}
