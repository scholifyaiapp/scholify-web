import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area B, first part — the income tax computation. Chapters 4–5.
 *
 * These two chapters carry the paper. Almost every Section C income tax question is this
 * computation with something bolted on, and the marks are lost in the same three places
 * every sitting: the THREE COLUMNS are muddled, the nil rate bands are treated as
 * exemptions rather than as bands that CONSUME the basic rate band, and gift aid or
 * pension contributions are deducted from income instead of EXTENDING the band.
 *
 * So chapter 4 is built round the proforma and the order of taxation, and chapter 5 round
 * the four adjustments that change it. Everything is FA2025 (2025/26).
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 4 · B1–B2 ────────────────────────────────────────── */

export const TX_TREE_04: StudyChapter = {
  id: "TX-04",
  number: 4,
  paper: "TX",
  area: "B",
  title: "The income tax computation",
  minutes: 20,
  syllabusRefs: ["B1(a)", "B1(b)", "B2(a)", "B2(b)", "B5(a)", "B5(b)"],
  intro:
    "One proforma, three columns and a fixed order. Get the layout right and the arithmetic follows; get it wrong and every figure below is wrong too.",
  outcomes: [
    "Lay out the income tax computation in its three columns",
    "Compute the personal allowance, including its abatement",
    "Apply the savings and dividend nil rate bands and the savings starting rate",
    "Tax non-savings, savings and dividend income in the correct order and at the correct rates",
    "Distinguish exempt income from taxable income",
  ],
  sections: [
    {
      id: "the-proforma",
      heading: "The proforma, and why the order matters",
      blocks: [
        {
          kind: "formula",
          name: "The income tax computation",
          expr: "                            Non-savings    Savings    Dividend      Total\n                                 £            £          £           £\nTrading profit                   X                                    X\nEmployment income                X                                    X\nProperty income                  X                                    X\nPension income                   X                                    X\nBank/building society interest                X                       X\nDividends received                                       X            X\n                              ─────        ─────      ─────       ─────\nTOTAL INCOME                     X            X          X           X\nLess: reliefs (loss relief,\n      qualifying loan interest) (X)          (X)        (X)         (X)\n                              ─────        ─────      ─────       ─────\nNET INCOME                       X            X          X           X\nLess: personal allowance        (X)          (X)        (X)         (X)\n                              ─────        ─────      ─────       ─────\nTAXABLE INCOME                   X            X          X           X\n\nThen tax each column IN ORDER: non-savings, then savings, then dividends.",
          note: "Two ordering rules do most of the work. Deduct the PERSONAL ALLOWANCE against NON-SAVINGS income first, then savings, then dividends — because it is worth most where the marginal rate is highest and non-savings is taxed first. And tax the columns in that same order, because the rate applied to savings and dividends depends on how much of the band the earlier columns have already used.",
        },
        {
          kind: "table",
          caption: "The rates for 2025/26 — all on the exam's rate sheet",
          head: ["Band", "Taxable income", "Non-savings", "Savings", "Dividend"],
          rows: [
            ["Basic", "£1 – £37,700", "20%", "20%", "8.75%"],
            ["Higher", "£37,701 – £125,140", "40%", "40%", "33.75%"],
            ["Additional", "£125,141 +", "45%", "45%", "39.35%"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The nil rate bands are BANDS, not exemptions",
          md: "The savings nil rate band and the dividend nil rate band charge income at **0%** — they do not remove it from the computation. So that income still **counts towards taxable income** and still **uses up basic rate band**. Treating them as exemptions is the single most common error in TX, and it understates the tax on everything above them.\n\n· **Savings nil rate band**: **£1,000** for a basic rate taxpayer, **£500** for a higher rate taxpayer, **nil** for an additional rate taxpayer. Which one applies depends on the band the taxpayer's **total taxable income** reaches.\n· **Dividend nil rate band**: **£500** for everyone, whatever their rate.\n· **Savings starting rate**: a **0%** rate on savings income falling within the first **£5,000** of taxable income. In practice this only helps where non-savings income is very low, because non-savings income is taxed first and uses that first £5,000 up.",
        },
        {
          kind: "example",
          title: "Working the full computation",
          scenario:
            "Nadia has a trading profit of £48,000 for 2025/26, received bank interest of £2,400 and dividends of £6,000. She has no other income and makes no gift aid donations or pension contributions.",
          steps: [
            { label: "Set out total income in the three columns", detail: "Non-savings £48,000 (the trading profit), savings £2,400 (the interest), dividends £6,000. Total income £56,400. Note that both the interest and the dividends are received GROSS — there is no deduction at source to gross up." },
            { label: "Deduct the personal allowance", detail: "Net income is £56,400, which is below the £100,000 income limit, so the full personal allowance of £12,570 is available. Deduct it from NON-SAVINGS first: £48,000 − £12,570 = £35,430. Taxable income = £35,430 + £2,400 + £6,000 = £43,830." },
            { label: "Establish which nil rate band applies", detail: "Taxable income of £43,830 exceeds the £37,700 basic rate limit, so Nadia is a HIGHER RATE taxpayer and her savings nil rate band is £500, not £1,000. The dividend nil rate band is £500 regardless." },
            { label: "Check the savings starting rate", detail: "It applies only to savings income within the first £5,000 of taxable income. Non-savings income of £35,430 has already absorbed that, so the starting rate gives nothing here. Say so — the mark is for considering it, not for it applying." },
            { label: "Tax the non-savings column", detail: "£35,430 all falls in the basic rate band: £35,430 × 20% = £7,086. That leaves £37,700 − £35,430 = £2,270 of basic rate band unused." },
            { label: "Tax the savings column", detail: "First £500 at 0% under the nil rate band — but it USES £500 of the remaining band, leaving £1,770. The next £1,770 at 20% = £354. The remaining £2,400 − £500 − £1,770 = £130 falls above the basic rate limit, at 40% = £52." },
            { label: "Tax the dividend column", detail: "The basic rate band is now exactly exhausted (£35,430 + £500 + £1,770 = £37,700). First £500 of dividends at 0% under the dividend nil rate band; the remaining £5,500 at the higher dividend rate of 33.75% = £1,856.25." },
            { label: "Total and check the bands add up", detail: "£7,086 + £0 + £354 + £52 + £0 + £1,856.25 = £9,348.25, so £9,348 to the nearest pound. Check: income taxed at basic rate £35,430 + £500 + £1,770 = £37,700 exactly, and £130 + £6,000 = £6,130 above it, totalling £43,830 ✓." },
          ],
          result:
            "**Income tax liability £9,348.** The two figures that decide it are the £500 savings nil rate band rather than £1,000 — because taxable income crosses £37,700 — and the fact that both nil rate bands consume basic rate band rather than sitting outside the computation.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The band check that catches most errors",
          md: "After computing, add up the income you taxed at each rate and confirm the total equals taxable income, and that the amount taxed at **basic rate does not exceed £37,700**. Almost every error in this computation — a nil rate band treated as an exemption, a column taxed in the wrong order, an extended band forgotten — shows up as those two figures failing to agree. It takes ten seconds and it is the difference between losing one mark and losing five.",
        },
      ],
      check: {
        q: "A taxpayer's taxable income is £43,830, of which £2,400 is savings income. What savings nil rate band applies?",
        options: [
          "£1,000, because savings income is small",
          "£500, because taxable income exceeds £37,700 so they are a higher rate taxpayer",
          "£5,000, under the starting rate",
          "Nil, because they have dividend income",
        ],
        correct: 1,
        explain:
          "£500. The band depends on the rate band the taxpayer's TOTAL taxable income reaches: £1,000 for a basic rate taxpayer, £500 for a higher rate taxpayer and nil for an additional rate taxpayer. At £43,830 they are a higher rate taxpayer.",
      },
    },
    {
      id: "allowance-and-exempt",
      heading: "The personal allowance, and what is not taxed at all",
      blocks: [
        {
          kind: "formula",
          name: "Personal allowance and its abatement",
          expr: "Personal allowance                              £12,570\n\nWhere ADJUSTED NET INCOME exceeds £100,000:\n   Abatement  =  (Adjusted net income − £100,000)  ×  ½\n   Personal allowance  =  £12,570 − abatement, minimum NIL\n\nSo the allowance is extinguished once adjusted net income reaches £125,140.\n\nADJUSTED NET INCOME  =  net income\n                        LESS gross gift aid donations\n                        LESS gross personal pension contributions",
          note: "The abatement creates a MARGINAL RATE OF 60% between £100,000 and £125,140: each extra £2 of income is taxed at 40% and also removes £1 of allowance, which is itself then taxed at 40%. That is 80p of tax on £2, and it is why a gift aid donation or pension contribution in that band is worth so much — it reduces adjusted net income, restoring allowance as well as extending the band.",
        },
        {
          kind: "table",
          caption: "Exempt income — never enters the computation",
          head: ["Exempt", "Note"],
          rows: [
            ["**ISA** income and gains", "Interest, dividends and capital gains inside an ISA. Investment limit £20,000 for 2025/26"],
            ["**Premium bond**, lottery and betting winnings", "Not income at all"],
            ["**NS&I savings certificates** interest", "Distinguish from ordinary NS&I accounts, whose interest IS taxable"],
            ["Interest on **overpaid tax** from HMRC", "Contrast a company, for which it is a loan relationship credit"],
            ["Most **state benefits**", "But the state pension, jobseeker's allowance and carer's allowance ARE taxable"],
            ["**Scholarships** and certain educational grants", ""],
            ["Interest and dividends within a **pension** fund", "The pension itself is taxable when drawn (chapter 9)"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two that look exempt and are not",
          md: "**The state pension is taxable**, and it is paid **gross** — so a pensioner with any other income routinely owes tax on it, and it is a favourite distractor. **Ordinary NS&I account interest is taxable**; only savings **certificates** are exempt, and the two are easy to conflate. Note also that jobseeker's allowance and carer's allowance are taxable while most other state benefits are not.\n\nOne thing NOT to bring into a TX answer: **payments on the termination of employment are an excluded topic** in the TX study guide, so the £30,000 rule you may have met elsewhere is not examined here and should not be applied to a TX scenario.",
        },
        {
          kind: "list",
          title: "Reliefs deducted from total income, before the personal allowance",
          items: [
            "**Qualifying loan interest** — interest on a loan to buy plant or machinery for a partnership or employment, to invest in a partnership, or to buy shares in a close company. Not interest on a mortgage or a personal loan.",
            "**Trading losses** relieved against total income (chapter 13).",
            "Both are deducted in the order that produces the best result for the taxpayer: against **non-savings** income first, since it is taxed first and at the higher rates.",
            "Note the **cap on income tax reliefs**: unless otherwise restricted, these reliefs are capped at the higher of **£50,000** or 25% of income.",
            "Gift aid donations and personal pension contributions are **NOT** deducted here. They extend the basic rate band instead (chapter 5), which is a different mechanism with a different effect.",
          ],
        },
      ],
      check: {
        q: "Why is the effective marginal rate 60% between adjusted net income of £100,000 and £125,140?",
        options: [
          "Because a 60% rate band applies in that range",
          "Because each extra £2 is taxed at 40% and also removes £1 of personal allowance, which is then taxed at 40% — 80p of tax on £2",
          "Because the additional rate starts at £100,000",
          "Because national insurance is added",
        ],
        correct: 1,
        explain:
          "THE ABATEMENT DOUBLES THE EFFECT. £2 of extra income costs 80p in tax at 40%, and it also withdraws £1 of allowance which is itself taxed at 40%, another 40p — £1.20 of tax on £2 of income. That is a 60% marginal rate, and it makes a gift aid donation or pension contribution in that band unusually valuable.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating the savings or dividend nil rate band as exempt income.",
      fix: "They charge income at 0%. It still counts as taxable income and still uses basic rate band.",
    },
    {
      trap: "Using a £1,000 savings nil rate band for a higher rate taxpayer.",
      fix: "£1,000 for basic rate, £500 for higher rate, nil for additional rate.",
    },
    {
      trap: "Deducting the personal allowance from dividend income first.",
      fix: "Deduct against non-savings first, then savings, then dividends.",
    },
    {
      trap: "Forgetting the personal allowance abatement above £100,000.",
      fix: "£1 lost for every £2 of adjusted net income over £100,000, nil at £125,140.",
    },
    {
      trap: "Treating the state pension or ordinary NS&I interest as exempt.",
      fix: "Both are taxable. Only NS&I savings CERTIFICATES are exempt.",
    },
  ],
  keyTerms: [
    { term: "Non-savings income", def: "Trading, employment, property and pension income; taxed first and at the full rates." },
    { term: "Savings nil rate band", def: "£1,000, £500 or nil by the taxpayer's band; charges savings income at 0% while still using basic rate band." },
    { term: "Dividend nil rate band", def: "£500 for every taxpayer, charging that much of dividend income at 0%." },
    { term: "Savings starting rate", def: "0% on savings income falling within the first £5,000 of taxable income." },
    { term: "Adjusted net income", def: "Net income less gross gift aid donations and gross personal pension contributions; the measure for the personal allowance abatement." },
  ],
  summary: [
    "Lay the computation out in three columns and tax non-savings, then savings, then dividends.",
    "Deduct the personal allowance against non-savings income first.",
    "The nil rate bands charge income at 0% but still consume basic rate band.",
    "The savings nil rate band is £1,000, £500 or nil depending on the taxpayer's band.",
    "The personal allowance is abated by £1 for every £2 of adjusted net income over £100,000, creating a 60% marginal rate.",
  ],
  knowledgeDiagnostic: [
    { q: "In what order are the three income types taxed?", a: "Non-savings, then savings, then dividends — because the rate on the later ones depends on how much band the earlier ones have used." },
    { q: "Why is it wrong to treat the dividend nil rate band as exempt income?", a: "Because it charges the income at 0% rather than removing it, so it still counts as taxable income and still uses up basic rate band." },
    { q: "When does the savings starting rate actually help?", a: "Only where non-savings income is very low, since non-savings income is taxed first and absorbs the first £5,000 of taxable income." },
    { q: "At what adjusted net income is the personal allowance extinguished?", a: "£125,140 — £12,570 of allowance lost at £1 for every £2 above £100,000." },
    { q: "Name three items of exempt income and two that look exempt but are not.", a: "Exempt: ISA income, premium bond winnings, NS&I savings certificate interest. Taxable despite appearances: the state pension, which is paid gross, and ordinary NS&I account interest." },
  ],
}

/* ── Chapter 5 · B1, B5 ───────────────────────────────────────── */

export const TX_TREE_05: StudyChapter = {
  id: "TX-05",
  number: 5,
  paper: "TX",
  area: "B",
  title: "Income tax: the adjustments that change the computation",
  minutes: 19,
  syllabusRefs: ["B1(c)", "B1(d)", "B5(c)", "B5(d)", "B5(e)"],
  intro:
    "Gift aid, pension contributions, the marriage allowance and the child benefit charge. Each changes the computation in its own way, and none of them is a simple deduction from income.",
  outcomes: [
    "Extend the basic rate band for gift aid donations and personal pension contributions",
    "Compute adjusted net income and explain why it matters twice",
    "Apply the transferable personal allowance as a tax reducer",
    "Compute the high income child benefit charge",
    "Explain how jointly held income and the property and trading allowances are treated",
  ],
  sections: [
    {
      id: "extending-the-band",
      heading: "Gift aid and pension contributions: extending the band",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The mechanism, and why it is not a deduction",
          md: "A gift aid donation and a personal pension contribution are both paid **net of basic rate tax**, so the charity or the pension provider reclaims the 20% from HMRC. The donor has therefore already had basic rate relief **at source**. Higher and additional rate relief is given by **EXTENDING THE BASIC RATE BAND** — and the additional rate threshold with it — by the **GROSS** amount.\n\nSo: **gross up at 100/80**, then add the gross figure to the £37,700 basic rate limit and to the £125,140 additional rate threshold. Do **not** deduct it from income. A basic rate taxpayer gets no further relief, which is correct: they have already had all of it at source.",
        },
        {
          kind: "formula",
          name: "Gift aid and pension relief",
          expr: "GROSS amount  =  net amount paid  ×  100/80\n\nExtended basic rate limit       =  £37,700   +  gross amount\nExtended additional rate limit  =  £125,140  +  gross amount\n\nAnd separately, for the personal allowance:\n   ADJUSTED NET INCOME  =  net income  −  gross gift aid  −  gross pension contributions",
          note: "The gross amount does TWO jobs and both earn marks: it extends the bands, and it reduces adjusted net income for the personal allowance abatement. A candidate who does only the first loses the allowance restoration, which in the £100,000–£125,140 range is worth more than the band extension.",
        },
        {
          kind: "example",
          title: "One donation, two effects",
          scenario:
            "Owen has employment income of £118,000 for 2025/26 and received bank interest of £3,000. He paid gift aid donations of £2,400 during the year. He makes no pension contributions.",
          steps: [
            { label: "Gross the donation", detail: "£2,400 × 100/80 = £3,000. This is the figure used throughout — the £2,400 net amount does not appear again." },
            { label: "Compute total income and adjusted net income", detail: "Total income = £118,000 + £3,000 = £121,000. Adjusted net income = £121,000 − £3,000 gross gift aid = £118,000." },
            { label: "Compute the personal allowance", detail: "Adjusted net income of £118,000 exceeds £100,000 by £18,000, so the abatement is £18,000/2 = £9,000. Personal allowance = £12,570 − £9,000 = £3,570. Without the donation, adjusted net income would have been £121,000, the abatement £10,500 and the allowance only £2,070 — so the donation has restored £1,500 of allowance." },
            { label: "Compute taxable income", detail: "£121,000 − £3,570 = £117,430, of which non-savings is £118,000 − £3,570 = £114,430 and savings is £3,000." },
            { label: "Extend the bands", detail: "Basic rate limit £37,700 + £3,000 = £40,700. Additional rate threshold £125,140 + £3,000 = £128,140. Taxable income of £117,430 is below £128,140, so no additional rate arises." },
            { label: "Tax the non-savings column", detail: "£40,700 at 20% = £8,140. The remaining £114,430 − £40,700 = £73,730 at 40% = £29,492." },
            { label: "Tax the savings column", detail: "Owen is a higher rate taxpayer, so the savings nil rate band is £500: £500 at 0%. The basic rate band is fully used by non-savings income, so the remaining £2,500 is taxed at 40% = £1,000." },
            { label: "Total, and quantify what the donation achieved", detail: "£8,140 + £29,492 + £0 + £1,000 = £38,632. The £2,400 donation extended the band by £3,000 (worth £600 at the 20-point rate difference) and restored £1,500 of allowance (worth £600 at 40%) — £1,200 of tax saved on a £2,400 payment, on top of the £600 the charity reclaimed." },
          ],
          result:
            "**Income tax liability £38,632.** The donation is worth £1,200 to Owen because it does two things: extends the bands by £3,000 AND reduces adjusted net income by £3,000, restoring £1,500 of personal allowance.",
        },
      ],
      check: {
        q: "How is higher rate relief for a gift aid donation given?",
        options: [
          "By deducting the gross donation from total income",
          "By extending the basic rate band and the additional rate threshold by the GROSS donation",
          "By deducting the net donation from total income",
          "By a tax reducer of 20% of the gross donation",
        ],
        correct: 1,
        explain:
          "BY EXTENDING THE BANDS BY THE GROSS AMOUNT. Basic rate relief has already been given at source — the charity reclaimed it — so extending the band gives only the extra 20 or 25 points. Deducting it from income would give relief twice.",
      },
    },
    {
      id: "other-adjustments",
      heading: "The marriage allowance, the child benefit charge, and joint income",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The transferable personal allowance is a TAX REDUCER",
          md: "A spouse or civil partner may transfer a fixed **£1,260** of personal allowance to the other, provided **neither is a higher or additional rate taxpayer**. But the recipient does **not** get £1,260 added to their allowance — they get a **tax reducer of £1,260 × 20% = £252**, deducted from the tax liability after it has been computed. The transferor's own allowance falls by the full £1,260.\n\nSo it is only worth claiming where the transferor cannot use their allowance. And the £252 is deducted from the **liability**, which puts it in a different place in the computation from anything else in this chapter.",
        },
        {
          kind: "formula",
          name: "The high income child benefit charge",
          expr: "Applies where ADJUSTED NET INCOME is between £60,000 and £80,000.\n\n   CHARGE  =  child benefit received  ×  1%  for every £200 of\n              adjusted net income above £60,000\n\n           =  child benefit  ×  (ANI − £60,000) / £200  %\n\nAt an adjusted net income of £80,000 or more the charge equals the WHOLE\nof the child benefit received.",
          note: "Round DOWN TWICE: the percentage to a whole number, and then the resulting charge to a whole pound. So an excess of £7,500 gives 37.5%, which becomes 37%. The charge is collected through self assessment as an ADDITION to the tax liability — it is not a reduction of the benefit paid, which is why receiving child benefit can itself create a filing obligation. Note that where BOTH partners have adjusted net income above £60,000 the charge falls on the higher earner, but the examining team has said that scenario will not be examined in TX.",
        },
        {
          kind: "example",
          title: "Computing the child benefit charge",
          scenario:
            "Ruth has adjusted net income of £71,400 for 2025/26. She received child benefit of £1,900 during the year. Her partner's adjusted net income is £38,000.",
          steps: [
            { label: "Check who is liable", detail: "Only Ruth's adjusted net income exceeds £60,000, so the charge is hers. Where BOTH partners exceed £60,000 it falls on the higher earner, but the examining team has confirmed that scenario is not examined in TX — so a question will always leave one partner clearly liable." },
            { label: "Compute the excess and the number of steps", detail: "£71,400 − £60,000 = £11,400. Divided by £200 = 57 steps exactly. Where the division is not exact, round the PERCENTAGE down to a whole number — an excess of £7,500 would give 37.5%, which becomes 37%." },
            { label: "Compute the percentage and the charge", detail: "57 steps × 1% = 57%. Charge = £1,900 × 57% = £1,083." },
            { label: "Place it in the computation", detail: "The £1,083 is ADDED to Ruth's income tax liability — it is not a deduction from income and not a reduction of the benefit paid. It is collected through self assessment, which is why receiving child benefit can itself create a filing obligation." },
            { label: "Note the alternative", detail: "Ruth could elect not to receive the child benefit, which avoids the charge and the administration. But she should not do so lightly: continuing to claim while electing not to be paid preserves the national insurance credits that protect her state pension entitlement." },
          ],
          result:
            "**Charge £1,083, added to Ruth's income tax liability.** The two points to state are that it is an addition to the liability rather than a deduction from income, and that a gift aid donation or pension contribution reduces adjusted net income and therefore reduces the charge too.",
        },
        {
          kind: "table",
          caption: "Jointly held income",
          head: ["Situation", "Treatment"],
          rows: [
            ["Income from an asset held jointly by **spouses or civil partners**", "Split **50:50** by default, whatever the actual ownership — unless they jointly elect for the actual proportions, which requires that they genuinely own it unequally"],
            ["Income from an asset held jointly by **anyone else**", "Split in the **actual ownership** proportions"],
            ["A **joint bank account** between spouses", "The interest is likewise 50:50 by default, which is the usual way it appears in a question"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two £1,000 allowances that are NOT examinable in TX",
          md: "The **property allowance** and the **trading allowance**, both £1,000, are **excluded topics** in the TX study guide. They exist in the legislation and they will come up in practice, but a TX answer that deducts £1,000 instead of actual expenses is applying a rule the paper does not examine — and in a Section C computation it will simply be wrong against the marking guide. Compute property and trading profits on **actual income less actual allowable expenses**. What IS examinable for a small letting is **rent-a-room relief**, with its £7,500 limit (chapter 6).",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The planning point the exam rewards",
          md: "Transferring an income-producing asset to the lower-earning spouse moves the income to their lower marginal rate, and it is a genuine transfer with no CGT because disposals between spouses are at **no gain, no loss**. That is the standard TX planning recommendation, and it earns marks in Section C. State the two conditions: the transfer must be **outright and unconditional**, and for jointly held assets the default **50:50** split applies unless an election is made — so a 90:10 transfer without an election achieves only 50:50 for income tax.",
        },
      ],
      check: {
        q: "What does a taxpayer receive when their spouse transfers £1,260 of personal allowance?",
        options: [
          "£1,260 added to their personal allowance",
          "A tax reducer of £252, being £1,260 × 20%, deducted from their liability",
          "£1,260 deducted from their taxable income",
          "An extension of the basic rate band by £1,260",
        ],
        correct: 1,
        explain:
          "A £252 TAX REDUCER. The recipient's own allowance is unchanged; they get a fixed 20% credit against the liability. The transferor loses the full £1,260 of allowance, so the transfer only makes sense where they cannot use it. Neither party may be a higher or additional rate taxpayer.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deducting gift aid or pension contributions from income.",
      fix: "They extend the basic rate and additional rate limits by the GROSS amount.",
    },
    {
      trap: "Extending the band but forgetting adjusted net income.",
      fix: "The gross amount also reduces adjusted net income, restoring personal allowance above £100,000.",
    },
    {
      trap: "Adding £1,260 to the recipient's personal allowance.",
      fix: "It is a £252 tax reducer against the liability, not an allowance.",
    },
    {
      trap: "Using the old £50,000 threshold for the child benefit charge.",
      fix: "For 2025/26 it runs from £60,000 to £80,000, at 1% per £200.",
    },
    {
      trap: "Splitting jointly held spousal income in the actual ownership proportions without an election.",
      fix: "The default is 50:50; the actual proportions apply only if they jointly elect.",
    },
  ],
  keyTerms: [
    { term: "Extended basic rate band", def: "£37,700 plus gross gift aid and gross personal pension contributions." },
    { term: "Tax reducer", def: "An amount deducted from the tax liability rather than from income; the marriage allowance and the property finance cost restriction both work this way." },
    { term: "High income child benefit charge", def: "An addition to the liability where adjusted net income is £60,000 to £80,000, at 1% of the benefit per £200 of excess." },
    { term: "No gain, no loss", def: "The basis on which assets transfer between spouses and civil partners, so no CGT arises." },
    { term: "Excluded topic", def: "A rule the TX study guide states will not be examined; the £1,000 property and trading allowances are two." },
  ],
  summary: [
    "Gross gift aid and pension contributions at 100/80 and extend the basic rate and additional rate limits.",
    "The same gross figure reduces adjusted net income, restoring personal allowance above £100,000.",
    "The transferable allowance gives the recipient a £252 tax reducer, not £1,260 of allowance.",
    "The child benefit charge runs from £60,000 to £80,000 of adjusted net income at 1% per £200.",
    "Jointly held spousal income is split 50:50 unless the couple elect for the actual proportions.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a basic rate taxpayer get no further relief for a gift aid donation?", a: "Because they have already had basic rate relief at source — the charity reclaimed the 20% — and extending the band only delivers the difference between the higher and basic rates." },
    { q: "What two things does the gross gift aid figure do?", a: "It extends the basic rate and additional rate limits, and it reduces adjusted net income for the personal allowance abatement." },
    { q: "What conditions must be met to transfer the personal allowance?", a: "The couple must be married or civil partners and NEITHER may be a higher or additional rate taxpayer." },
    { q: "How is the child benefit charge computed at an adjusted net income of £71,400 on benefit of £1,900?", a: "(£71,400 − £60,000)/£200 = 57 steps, so 57% × £1,900 = £1,083, added to the income tax liability." },
    { q: "How is income from an asset held jointly by spouses taxed?", a: "50:50 by default regardless of actual ownership, unless they jointly elect for the actual proportions." },
  ],
}

export const TX_TREE_AREA_B_PART1: StudyChapter[] = [TX_TREE_04, TX_TREE_05]
