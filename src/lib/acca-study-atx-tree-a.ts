import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · Area A, part one — the UK tax system, and income tax (A1) including
 * the overseas rules that Finance Act 2025 rewrote.
 *
 *   ATX-01  What ATX asks that TX did not          (A6, orientation)
 *   ATX-02  Income tax: the framework at ATX level (A1a)
 *   ATX-03  Residence and the four-year FIG regime (A1 overseas)
 *   ATX-04  Coming to and leaving the UK           (A1 overseas)
 *   ATX-05  Trusts and income tax                  (A1 trusts)
 *   ATX-06  Additional exemptions and reliefs      (A1 reliefs)
 *
 * ── THE FINANCE ACT PROBLEM, WHICH GOVERNS THIS WHOLE PAPER ──────
 * The ATX-UK syllabus for June 2026 to June 2027 examines **Finance Act 2025**.
 * The founder's Kaplan ATX Study Text and Exam Kit are **FA23** — two Finance
 * Acts old — and FA2025 abolished the concepts the old overseas rules were
 * built on. Domicile and deemed domicile are gone as governing concepts for
 * income tax and capital gains tax, the remittance basis with them, and a
 * four-year foreign income and gains regime replaces them.
 *
 * So the books are used for STRUCTURE, DEPTH and PEDAGOGY only. Where they
 * teach domicile, the remittance basis or deemed domicile as live rules, they
 * are simply wrong for this sitting and are ignored. The syllabus PDF is the
 * authority, and the originality corpus is both books plus the syllabus text.
 *
 * ── THE RATES RULE, INHERITED FROM THE TX REBUILD ────────────────
 * Never bake a tax rate, band, threshold or allowance into the teaching. The
 * exam supplies a rates and allowances sheet, the figures change with every
 * Finance Act, and content quoting them teaches last year's tax silently. Every
 * chapter here states the ORDER of a computation and which figure the sheet is
 * being asked for. Where a number is unavoidable in a worked example it is
 * clearly an illustrative assumption, stated as such.
 *
 * ── WHAT THE PREVIOUS CONTENT DID ────────────────────────────────
 * acca-study-atx-official.ts did not merely relabel five legacy chapters — it
 * FILTERED them at load time. A `currentOnly()` helper stripped out any item
 * whose JSON mentioned "remittance basis", "non-dom" or "domicile", and a
 * hand-written replacement section was spliced in. That was a sound emergency
 * response to an obsolete book, but it leaves the paper's overseas teaching as
 * a filter over stale content rather than content written for the current law.
 * These chapters replace it.
 */

const ATX_TREE_01: StudyChapter = {
  paper: "ATX",
  id: "ATX-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A6"],
  title: "What ATX asks that TX did not",
  minutes: 15,
  intro:
    "The technical content is largely an extension of TX. What changes completely is the question: you are no longer computing a liability, you are advising a person who has a choice to make.",
  outcomes: [
    "Explain how ATX differs from TX in what it asks a candidate to do",
    "Describe the exam's structure and where the marks sit",
    "Recognise that most ATX scenarios involve more than one tax at once",
    "Apply the standard advisory structure to a tax question",
    "Explain why rates are supplied and what that means for how you should study",
  ],
  sections: [
    {
      id: "from-tx-to-atx",
      heading: "From computing to advising",
      blocks: [
        {
          kind: "text",
          md: "TX asks what the tax liability is. ATX asks what the client should **do** — and the tax computation is the evidence for that advice rather than the answer to the question. That single shift explains almost every difference between the two papers.",
        },
        {
          kind: "table",
          caption: "The same knowledge, a different demand",
          head: ["", "TX", "ATX"],
          rows: [
            ["The question", "Compute the liability", "Advise the client on a course of action"],
            ["Number of taxes", "Usually one at a time", "Frequently three or four interacting"],
            ["The client", "Implicit", "Named, with circumstances and objectives that constrain the answer"],
            ["Timing", "The tax year in front of you", "Often several years, because timing is the planning lever"],
            ["What earns marks", "The correct figure", "The correct figure, its implications, the alternatives, and a recommendation"],
            ["Ethics", "Peripheral", "Five marks in Section A, every sitting"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The exam structure, and what it tells you to practise",
          md: "Section A is a **50-mark case study**, split 35 technical, **5 for ethics** and 10 for professional skills, with all four of those skills examined. Section B is two compulsory **25-mark** questions — 20 technical and 5 professional skills — together covering business and personal tax. Communication is examined in Section A only. The ethics marks are guaranteed and are the most reliably available marks on the paper.",
        },
        {
          kind: "text",
          md: "Both sections are **scenario-based** and both require calculation and narrative. So a candidate who can compute but not explain, or explain but not compute, is capped well below a pass on either section — and the examiner's reports return to this every sitting.",
        },
      ],
      check: {
        q: "A Section A requirement asks you to 'advise Anya on the tax implications of the two alternatives, and recommend a course of action'. What does a full-mark answer contain?",
        options: [
          "The tax liability under each alternative, computed accurately",
          "The computations for both alternatives, the non-tax and interaction consequences of each, a comparison of the total cost, and a recommendation reasoned from Anya's stated circumstances and objectives",
          "A recommendation, since the computations are only supporting workings",
          "The alternative with the lower tax liability, stated in one line",
        ],
        correct: 1,
        explain:
          "The verb is 'advise and recommend', so the computation is the evidence rather than the answer. Marks are available for the figures, for what each alternative means beyond the tax, and for a recommendation that engages with what this particular client wants — which is why the scenario supplies their circumstances at all.",
      },
    },
    {
      id: "answering",
      heading: "A structure that fits almost every ATX requirement",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The advisory pattern",
          items: [
            "**Identify the taxes in play** — income tax, capital gains tax, inheritance tax, corporation tax, VAT, stamp taxes, national insurance. Most ATX scenarios engage at least three",
            "**Compute** what the requirement needs, showing the workings and stating the assumptions",
            "**Explain** what each figure means for the client, including the timing of the payment",
            "**Compare** the alternatives on total cost across all taxes, not one tax at a time",
            "**Recommend**, reasoned from the client's own objectives, with any conditions or time limits stated",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The interaction is where the marks are",
          md: "The single characteristic of ATX is that **taxes interact**. A gift attracts capital gains tax and inheritance tax at once, and gift relief in one interacts with the seven-year rule in the other. Incorporating a business engages income tax, capital gains tax, corporation tax, VAT and stamp taxes together. A candidate who answers one tax at a time will produce correct figures and miss the question, because the requirement is nearly always about the combination.",
        },
        {
          kind: "text",
          md: "**Time limits** deserve a standing habit. A large proportion of ATX planning depends on a claim or election being made in time — and an answer recommending a relief without its deadline has recommended something the client may no longer be able to do. Where you know the limit, state it; where you know one exists, say so.",
        },
      ],
      check: {
        q: "A client is considering gifting shares in their trading company to their daughter. Which taxes should be considered?",
        options: [
          "Capital gains tax only, since it is a disposal",
          "Inheritance tax only, since it is a gift",
          "Capital gains tax on the deemed disposal at market value, inheritance tax as a potentially exempt transfer, and stamp taxes on the transfer — with gift relief and business property relief interacting between the first two",
          "None, since gifts between family members are exempt",
        ],
        correct: 2,
        explain:
          "A single transaction engages three taxes at once, and the reliefs in one affect the position in another — which is the defining feature of the paper. Treating the gift as a capital gains tax question alone, or an inheritance tax question alone, misses most of the available marks.",
      },
    },
    {
      id: "rates-and-study",
      heading: "Why the rates are given, and what to learn instead",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "Tax rates, allowances and information on certain reliefs are supplied in the exam",
          md: "This is stated in the syllabus, and it should change how you study. Memorising thresholds is wasted effort; they are on the sheet, and they change with every Finance Act. What is **not** on the sheet is the order of a computation, which relief applies to which asset, what the conditions are, and what the deadlines are. That is what to learn.",
        },
        {
          kind: "text",
          md: "The consequence for this course is deliberate: the chapters that follow teach the **structure** of each computation and the **conditions** attaching to each relief, and treat specific figures as illustrative. Where a worked example needs a rate, it is an assumption stated as such — the method survives a Finance Act, the figures do not.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The Finance Act this sitting examines",
          md: "The June 2026 to June 2027 exams examine **Finance Act 2025**. The most significant consequence is that **domicile and deemed domicile no longer govern** the overseas position for income tax and capital gains tax, and the remittance basis has gone with them. A four-year foreign income and gains regime replaces them, and ATX-03 covers it. Any study material predating this — including a 2023 or 2024 text — teaches an abolished regime on that topic.",
        },
      ],
      check: {
        q: "Why is memorising tax rates and thresholds a poor use of ATX study time?",
        options: [
          "Because they are not examined at all",
          "Because they are supplied in the exam and change with each Finance Act — the examinable knowledge is the order of the computation, the conditions for each relief, and the time limits, none of which are given",
          "Because ATX questions are entirely narrative",
          "Because the examiner accepts approximate figures",
        ],
        correct: 1,
        explain:
          "The rates sheet removes the recall burden and leaves the judgement. What decides marks is knowing which relief applies, what conditions it carries, what claim must be made and by when — and being able to compute in the right order once the figures are in front of you.",
      },
    },
  ],
  examTraps: [
    { trap: "Answering one tax at a time.", fix: "ATX scenarios interact — identify every tax the transaction engages before computing." },
    { trap: "Computing accurately and stopping.", fix: "The verb is usually advise or recommend; the figure is evidence, not the answer." },
    { trap: "Recommending a relief without its time limit.", fix: "State the claim and the deadline — a missed limit makes the advice worthless." },
    { trap: "Studying from a pre-FA2025 text on overseas matters.", fix: "Domicile and the remittance basis are abolished; the FIG regime replaces them." },
  ],
  keyTerms: [
    { term: "Potentially exempt transfer", def: "A lifetime gift to an individual which becomes exempt from inheritance tax if the donor survives seven years, and chargeable if not." },
    { term: "Rates and allowances sheet", def: "The reference information supplied in the ATX exam, which removes the need to memorise thresholds and rates." },
    { term: "Interaction of taxes", def: "The characteristic ATX feature whereby one transaction engages several taxes and a relief in one affects the outcome in another." },
  ],
  summary: [
    "TX computes; ATX advises, and the computation is the evidence for the advice.",
    "Section A is 50 marks including 5 guaranteed ethics marks; Section B is two 25-mark questions.",
    "Most scenarios engage three or more taxes, and the interaction is where the marks are.",
    "Rates are supplied — learn the order of computation, the conditions and the deadlines instead.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the single defining feature of an ATX scenario?", a: "Several taxes engage at once, and reliefs in one affect the position in another — so the answer must address the combination rather than each tax separately." },
    { q: "Where are the guaranteed ethics marks?", a: "Section A, which carries 35 technical, 5 ethics and 10 professional skills marks." },
    { q: "What should be learned instead of rates and thresholds?", a: "The order of each computation, the conditions attaching to each relief, and the time limits for claims and elections — none of which are supplied." },
  ],
  furtherStudy: [
    "ATX-03 covers the Finance Act 2025 overseas regime that replaced domicile.",
    "Area C covers tax planning and the ethics marks that accompany it.",
    "TX-UK supplies the underlying computations this paper extends.",
  ],
}

const ATX_TREE_02: StudyChapter = {
  paper: "ATX",
  id: "ATX-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A1(a)"],
  title: "Income tax: the framework at ATX level",
  minutes: 18,
  intro:
    "The computation is TX's. What ATX adds is the question of which figure a decision moves, and what else moves with it.",
  outcomes: [
    "Set out the income tax computation in the correct order",
    "Explain why the order of income within the computation matters",
    "Identify the decisions that change taxable income and their knock-on effects",
    "Explain the interaction between income tax and national insurance for different structures",
    "Recognise where an income tax decision affects another tax",
  ],
  sections: [
    {
      id: "the-order",
      heading: "The computation, and why its order matters",
      blocks: [
        {
          kind: "text",
          md: "Income is taxed in a fixed order: **non-savings income first, then savings income, then dividend income**. That ordering is not presentational — it determines which band each source falls into, so a change in non-savings income pushes savings and dividends up through the bands even though those sources have not changed.",
        },
        {
          kind: "list",
          style: "number",
          title: "The structure to reproduce every time",
          items: [
            "Total income by source, in the taxing order",
            "Less reliefs deductible from total income, to give net income",
            "Less the personal allowance — noting that it is restricted once adjusted net income exceeds the threshold on the rates sheet",
            "Gives taxable income, taxed band by band in the source order",
            "Less tax reducers, which reduce the liability rather than the income",
            "Less tax already suffered, to give tax payable",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two-step planning insight",
          md: "Anything reducing **adjusted net income** can produce a benefit far larger than its face value where the personal allowance is being tapered, because each pound of reduction can restore allowance as well as saving tax at the marginal rate. Personal pension contributions and gift aid are the standard levers, and both also extend the basic rate band. Spotting a client sitting inside the taper is one of the most reliable planning findings in the paper.",
        },
        {
          kind: "example",
          title: "Why the taper matters more than the headline rate",
          scenario:
            "Assume for illustration a personal allowance tapered by £1 for every £2 of adjusted net income above a threshold, and a 40% rate. A client's income sits £10,000 above that threshold and they make a £10,000 gross pension contribution.",
          steps: [
            { label: "Direct saving", detail: "£10,000 taken out of the 40% band saves £4,000." },
            { label: "Allowance restored", detail: "The £10,000 excess is removed, restoring £5,000 of personal allowance." },
            { label: "Saving on the restored allowance", detail: "£5,000 × 40% = £2,000." },
            { label: "Total", detail: "£6,000 saved on a £10,000 contribution — an effective 60% relief across that band." },
          ],
          result:
            "The figures are illustrative and the thresholds come from the rates sheet, but the mechanism is the examinable point: inside the taper, the effective marginal rate is far above the headline rate.",
        },
      ],
      check: {
        q: "A client's adjusted net income falls in the personal allowance taper. Why is a pension contribution worth more than the headline rate suggests?",
        options: [
          "Pension contributions attract a higher rate of relief than other reliefs",
          "It reduces adjusted net income, so it saves tax at the marginal rate AND restores personal allowance that was being withdrawn — producing an effective rate well above the headline one across that band",
          "Because pension income is exempt from tax",
          "Because the contribution is deducted twice",
        ],
        correct: 1,
        explain:
          "Two effects run together: the income removed from the top band, and the allowance restored because the taper is based on adjusted net income. Recognising a client inside the taper is a standard planning finding, and the contribution also extends the basic rate band.",
      },
    },
    {
      id: "structures",
      heading: "Employment, self-employment and the company",
      blocks: [
        {
          kind: "text",
          md: "A recurring ATX requirement compares how the same commercial activity is taxed under different structures. The comparison must cover **income tax, national insurance and corporation tax together** — looking at any one alone gives the wrong answer.",
        },
        {
          kind: "table",
          caption: "The same profit, three ways",
          head: ["", "Employment", "Sole trader / partnership", "Company"],
          rows: [
            ["Charged to", "Income tax on employment income", "Income tax on trading profit", "Corporation tax on profits"],
            ["National insurance", "Employee and employer contributions", "Self-employed contributions", "Employer contributions on salary only"],
            ["Timing", "Deducted at source through PAYE", "Payments on account plus a balancing payment", "Nine months and a day after the period end, or quarterly if large"],
            ["Extraction", "Not applicable", "Profits taxed as earned, drawings irrelevant", "Salary, dividends, or a mixture — and the choice is a planning question"],
            ["Losses", "Limited relief", "Flexible reliefs against other income", "Carried against company profits only"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The extraction question",
          md: "Once profits are inside a company, getting them out is a separate decision with its own tax cost. **Salary** is deductible for the company but attracts employee and employer national insurance; **dividends** are not deductible but carry no national insurance and are taxed at dividend rates. The optimum is usually a mixture, and the comparison must be done on **total tax across both the company and the individual** — an answer optimising only the personal position will recommend the wrong thing.",
        },
        {
          kind: "text",
          md: "Note the non-tax factors, because commercial acumen marks depend on them: limited liability, the cost and disclosure of company filing, credibility with customers, ease of bringing in an investor, and the difficulty of extracting assets from a company later. A recommendation resting on tax alone is incomplete, and where the tax difference is small the non-tax factors should decide it.",
        },
      ],
      check: {
        q: "When comparing salary and dividend extraction from a company, what must the comparison include?",
        options: [
          "The individual's income tax liability under each option",
          "The total tax cost across both the company and the individual — salary is deductible for the company but attracts national insurance, while dividends are paid from taxed profits but attract none",
          "Only the national insurance cost, since income tax is the same either way",
          "The company's corporation tax liability alone",
        ],
        correct: 1,
        explain:
          "The two options move tax between the company and the individual as well as between taxes, so optimising one side gives the wrong answer. The comparison is the total cost of getting a given amount of cash into the shareholder's hands.",
      },
    },
  ],
  examTraps: [
    { trap: "Taxing income sources in the wrong order.", fix: "Non-savings, then savings, then dividends — the order determines the bands." },
    { trap: "Missing a client inside the personal allowance taper.", fix: "Check adjusted net income; the effective marginal rate there is well above the headline." },
    { trap: "Comparing structures on income tax alone.", fix: "Include national insurance and corporation tax, and compare total cost." },
    { trap: "Recommending on tax alone.", fix: "Limited liability, disclosure, credibility and later extraction all belong in the advice." },
  ],
  keyTerms: [
    { term: "Adjusted net income", def: "The measure used to determine restriction of the personal allowance, reduced by gross gift aid and personal pension contributions." },
    { term: "Tax reducer", def: "A relief reducing the tax liability itself rather than taxable income, applied after the liability has been computed." },
    { term: "Profit extraction", def: "The decision about how to take profits out of a company — salary, dividend or a combination — each with a different total tax cost." },
  ],
  summary: [
    "Non-savings, savings, dividends — the taxing order determines which band each source meets.",
    "Reducing adjusted net income inside the taper produces relief well above the headline rate.",
    "Compare structures on income tax, national insurance and corporation tax together.",
    "Extraction is a separate decision, judged on total tax across the company and the individual.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does the order of income sources matter?", a: "Each source is taxed on top of the previous one, so a change in non-savings income pushes savings and dividend income into higher bands." },
    { q: "What makes a pension contribution unusually valuable inside the allowance taper?", a: "It saves tax at the marginal rate and simultaneously restores tapered personal allowance, because the taper is measured on adjusted net income." },
    { q: "Why must extraction be assessed across both the company and the individual?", a: "Salary reduces company profits but attracts national insurance, while dividends come from taxed profits and attract none — so optimising one side alone misprices the choice." },
  ],
  furtherStudy: [
    "ATX-06 covers the reliefs available on income tax at ATX level.",
    "Area B covers the interaction of taxes this chapter's structure comparison depends on.",
    "ATX-14 covers the corporation tax side of the incorporation decision.",
  ],
}

const ATX_TREE_03: StudyChapter = {
  paper: "ATX",
  id: "ATX-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A1(b)"],
  title: "Residence and the four-year FIG regime",
  minutes: 20,
  intro:
    "The rules Finance Act 2025 rewrote. Domicile no longer governs, the remittance basis has gone, and residence alone now decides — with one four-year exemption for people newly arriving.",
  outcomes: [
    "Apply the statutory residence test to determine an individual's residence status",
    "Explain that domicile and deemed domicile no longer govern income tax and capital gains tax",
    "Determine whether an individual qualifies for the four-year foreign income and gains regime",
    "Advise on the consequences of claiming the regime, including what is given up",
    "Explain the role of double tax relief and of the OECD model treaty",
  ],
  sections: [
    {
      id: "what-changed",
      heading: "What Finance Act 2025 removed",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "Read this before any pre-2025 study material",
          md: "**Domicile and deemed domicile no longer determine the income tax and capital gains tax position, and the remittance basis has been abolished.** Any text explaining the remittance basis charge, deemed domicile after fifteen of twenty years, or the choice between the arising and remittance bases is describing a regime that no longer exists for these taxes. The founder's Kaplan ATX books are FA23 and fall squarely into this category on this topic.",
        },
        {
          kind: "table",
          caption: "The old regime and the new",
          head: ["", "Before FA2025", "From 6 April 2025"],
          rows: [
            ["Governing concept", "Residence AND domicile", "Residence alone"],
            ["Non-domiciled individuals", "Could claim the remittance basis", "The remittance basis is abolished"],
            ["Long-term residents", "Deemed domiciled after 15 of the previous 20 years", "Concept withdrawn for income tax and capital gains tax"],
            ["Relief for new arrivals", "Remittance basis, potentially for many years, at a charge", "Four-year FIG regime, for qualifying new residents only"],
            ["Default position", "Worldwide, unless the remittance basis was claimed", "Worldwide on income and gains, unless the FIG regime applies"],
          ],
        },
        {
          kind: "text",
          md: "The practical effect is a substantial simplification and, for many long-resident individuals, a significant increase in UK tax. The examinable skill is now sequential: establish **residence**, then ask whether the individual **qualifies** for the four-year regime, and only then compute.",
        },
      ],
      check: {
        q: "A client who has lived in the UK for twelve years but retains a foreign domicile asks whether they can be taxed only on foreign income they bring into the UK. What is the position?",
        options: [
          "Yes, provided they claim the remittance basis and pay the annual charge",
          "No — the remittance basis was abolished by Finance Act 2025, and domicile no longer governs. As a UK resident they are taxable on worldwide income and gains, and twelve years of residence puts them well outside the four-year regime for new arrivals",
          "Yes, because deemed domicile only applies after fifteen years",
          "Only if they were born outside the UK",
        ],
        correct: 1,
        explain:
          "This is precisely the answer a pre-2025 text would get wrong. Both the remittance basis and the domicile concept behind it have gone for these taxes, so the client is taxed on the arising basis worldwide — and the only relief available is a regime they cannot access, having been resident far longer than four years.",
      },
    },
    {
      id: "residence-and-fig",
      heading: "Residence first, then the four-year test",
      blocks: [
        {
          kind: "text",
          md: "**Residence** is determined by the statutory residence test, which runs in a fixed order and stops as soon as it produces an answer. Working it in the wrong order produces the wrong result, so reproduce the sequence.",
        },
        {
          kind: "list",
          style: "number",
          title: "The statutory residence test, in order",
          items: [
            "**Automatic overseas tests** — if any is met, the individual is not UK resident and the enquiry ends",
            "**Automatic UK tests** — if any is met, the individual is UK resident and the enquiry ends",
            "**The sufficient ties test** — where neither of the above settles it, days spent in the UK are compared against the number of ties, with a different table for arrivers and leavers",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The arriver/leaver distinction",
          md: "The sufficient ties test is **harder to fail for a leaver than for an arriver**: someone who was UK resident in one or more of the three preceding years needs fewer days to become resident for the same number of ties. That asymmetry is deliberate and it is examined — a client leaving the UK must be more careful about day counts than one arriving.",
        },
        {
          kind: "text",
          md: "Once residence is established, the **four-year foreign income and gains regime** is the only shelter for foreign income and gains. It is available to an individual who becomes UK resident after **at least ten consecutive tax years of non-UK residence**, and it lasts for the **first four years** of UK residence.",
        },
        {
          kind: "example",
          title: "Does the client qualify?",
          scenario:
            "A client returns to the UK in 2025/26 having been non-UK resident since 2013/14. Another arrives in 2025/26 having last been UK resident in 2019/20.",
          steps: [
            { label: "First client", detail: "Non-resident from 2013/14 to 2024/25 is eleven consecutive tax years, so the ten-year condition is met." },
            { label: "Conclusion", detail: "Qualifies. Foreign income and gains can be relieved for 2025/26 to 2028/29 inclusive." },
            { label: "Second client", detail: "Resident in 2019/20, so only five consecutive non-resident years precede 2025/26." },
            { label: "Conclusion", detail: "Does not qualify. Taxable on worldwide income and gains from arrival, with double tax relief the only mitigation." },
          ],
          result:
            "Counting the consecutive non-resident years is the whole test, and it is easy to get wrong by counting from the wrong end. A split year counts as a year of UK residence for this purpose.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The regime is not free",
          md: "Claiming it means **giving up the personal allowance and the capital gains tax annual exempt amount** for that year. So for a client with modest foreign income the claim can cost more than it saves, and the advice must be a comparison rather than an assumption. Computing both positions and recommending the better is exactly the kind of requirement Section B sets.",
        },
      ],
      check: {
        q: "A client becomes UK resident in 2025/26 after eleven consecutive non-resident tax years, with modest foreign investment income. Should they claim the FIG regime?",
        options: [
          "Yes, always — it exempts foreign income and gains",
          "Only after comparing: the claim relieves the foreign income but costs the personal allowance and the annual exempt amount, so with modest foreign income it may leave them worse off",
          "No, the regime is only for individuals with no UK income",
          "Yes, but only for capital gains and not income",
        ],
        correct: 1,
        explain:
          "Qualifying and benefiting are different questions. The claim is an election with a price, so the answer requires computing the liability with and without it — which is why the requirement usually asks you to advise rather than simply to state the position.",
      },
    },
    {
      id: "double-tax",
      heading: "Double tax relief and the treaty",
      blocks: [
        {
          kind: "text",
          md: "Where foreign income or gains are taxable in the UK and have also been taxed abroad, **double tax relief** prevents the same amount being taxed twice in full. The relief is the **lower of the UK tax on that source and the overseas tax suffered**, given source by source rather than in aggregate.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Relief source by source, and the ordering that follows",
          md: "Because relief is capped at the UK tax on each source, it is computed **on each source separately**. And since the relief cannot exceed UK tax, foreign income taxed abroad at a higher rate than the UK's leaves an unrelieved excess that is simply lost. The practical consequence is that foreign income should be treated as the **top slice** of income where the computation permits, so that the UK tax on it — and therefore the available relief — is maximised.",
        },
        {
          kind: "text",
          md: "The **OECD model double tax treaty** is examinable for its role rather than its detail. It allocates taxing rights between two states, usually giving the country of residence the primary right over some categories and the source country over others, and it provides tie-breaker rules where both states would treat an individual as resident. Its practical significance in an answer is that the treaty may **override** the domestic position, so a conclusion drawn from UK rules alone should be qualified by reference to any treaty with the other country.",
        },
      ],
      check: {
        q: "Foreign income of £20,000 has suffered overseas tax of £6,000. The UK tax attributable to that income is £4,000. What double tax relief is available?",
        options: [
          "£6,000, the overseas tax suffered",
          "£4,000 — the lower of the UK tax on that source and the overseas tax, with the £2,000 excess unrelieved and lost",
          "£10,000, being both amounts",
          "£2,000, the difference between the two",
        ],
        correct: 1,
        explain:
          "Relief is capped at the UK tax on the source, because its purpose is to prevent double taxation rather than to refund foreign tax. The unrelieved £2,000 is lost, which is why maximising the UK tax attributable to foreign income — by treating it as the top slice where possible — increases the relief available.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying domicile or the remittance basis.", fix: "Both were abolished for income tax and capital gains tax by Finance Act 2025." },
    { trap: "Working the statutory residence test out of order.", fix: "Automatic overseas, then automatic UK, then sufficient ties — stopping at the first answer." },
    { trap: "Assuming a qualifying client should claim the FIG regime.", fix: "It costs the personal allowance and annual exempt amount; compare both positions." },
    { trap: "Computing double tax relief in aggregate.", fix: "Source by source, capped at the UK tax on each source." },
  ],
  keyTerms: [
    { term: "Statutory residence test", def: "The ordered test determining UK residence — automatic overseas tests, then automatic UK tests, then the sufficient ties test." },
    { term: "Four-year FIG regime", def: "Relief from UK tax on foreign income and gains for the first four years of UK residence, available to an individual with at least ten prior consecutive non-resident tax years." },
    { term: "Double tax relief", def: "Relief for overseas tax suffered on income also taxable in the UK, limited to the lower of the overseas tax and the UK tax on that source." },
  ],
  summary: [
    "Domicile, deemed domicile and the remittance basis are gone for income tax and capital gains tax.",
    "Establish residence by the statutory test, in order, then test the four-year regime.",
    "The regime needs ten prior consecutive non-resident years and costs the allowances — compare before claiming.",
    "Double tax relief is the lower of overseas and UK tax, source by source.",
  ],
  knowledgeDiagnostic: [
    { q: "What now determines the UK tax position of an individual with foreign income?", a: "Residence alone, plus whether they qualify for the four-year FIG regime — domicile no longer governs." },
    { q: "What are the two conditions for the four-year regime?", a: "At least ten consecutive prior tax years of non-UK residence, and being within the first four years of UK residence." },
    { q: "What does claiming the regime cost?", a: "The personal allowance and the capital gains tax annual exempt amount for that year." },
  ],
  furtherStudy: [
    "ATX-04 covers arriving in and leaving the UK, including split-year treatment.",
    "ATX-08 applies the same residence rules to capital gains tax.",
    "ATX-01 explains why pre-FA2025 material is unsafe on this topic.",
  ],
}

const ATX_TREE_04: StudyChapter = {
  paper: "ATX",
  id: "ATX-04",
  number: 4,
  area: "A",
  syllabusRefs: ["A1(b)"],
  title: "Coming to and leaving the UK",
  minutes: 17,
  intro:
    "Residence changes on a date, but the tax year does not. Split-year treatment is what reconciles the two, and it is where most of the marks on arrival and departure sit.",
  outcomes: [
    "Advise on the tax position of an individual arriving in the UK",
    "Advise on the position of an individual leaving the UK",
    "Explain split-year treatment and when it applies",
    "Identify the traps in a departure, including temporary non-residence",
    "Determine the treatment of overseas trading, employment and investment income",
  ],
  sections: [
    {
      id: "split-year",
      heading: "Split-year treatment",
      blocks: [
        {
          kind: "text",
          md: "Residence is normally determined for a **whole tax year**, which produces an obviously unfair result for someone arriving in October or leaving in May. **Split-year treatment** divides the year into a UK part and an overseas part, so that the individual is taxed as resident only for the portion in which they were genuinely here.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "It is not optional and it is not universal",
          md: "Split-year treatment applies **automatically** where one of the defined cases is met — it is not claimed. And it does not apply merely because someone arrived mid-year: the cases turn on things like starting full-time work overseas, accompanying a partner, or ceasing to have a UK home. Where no case is met, the individual is resident for the **entire** tax year, including the months before they arrived.",
        },
        {
          kind: "text",
          md: "The examinable consequence is that arrival and departure dates should be **planned**. Where split-year treatment will not apply, moving a departure across a 5 April can change the tax treatment of a whole year's foreign income — and identifying that possibility is a planning mark rather than a computational one.",
        },
      ],
      check: {
        q: "A client leaves the UK permanently in June but does not meet any split-year case. What is the consequence?",
        options: [
          "They are non-resident from the date of departure",
          "They are UK resident for the whole tax year, so income and gains arising after departure remain within UK tax for the rest of that year — which is why the timing of a departure relative to 5 April is a planning point",
          "They are non-resident for the whole year",
          "The position is determined by their intention rather than the tests",
        ],
        correct: 1,
        explain:
          "Residence applies to the whole tax year unless a split-year case is met, so a departure in June leaves ten further months within UK tax. Where a large disposal or foreign income event is expected, delaying or accelerating the departure across 5 April can change the outcome entirely.",
      },
    },
    {
      id: "traps",
      heading: "The traps on departure",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "Temporary non-residence",
          md: "An individual who leaves the UK, realises gains or receives certain income while non-resident, and then **returns within a defined period** can find those amounts taxed in the year of return. The rule exists precisely to defeat the plan of leaving briefly to realise a gain. So advice to 'become non-resident before the disposal' is incomplete — and often wrong — unless it addresses how long the client intends to stay away.",
        },
        {
          kind: "table",
          caption: "What follows the individual out of the UK",
          head: ["Source", "Position after leaving"],
          rows: [
            ["UK employment income", "Taxable to the extent duties are performed in the UK"],
            ["UK trading income", "Remains taxable if the trade is carried on through a UK permanent establishment"],
            ["UK property income", "Remains taxable — UK land is always within the UK charge"],
            ["UK land and buildings, on disposal", "Chargeable to UK capital gains tax even for a non-resident"],
            ["Foreign income and gains", "Outside UK tax once non-resident, subject to temporary non-residence"],
            ["UK savings and dividend income", "Special rules can limit the charge for non-residents"],
          ],
        },
        {
          kind: "text",
          md: "**UK land is the exception to remember.** Non-residents are chargeable on gains from disposing of UK land and buildings, and on UK property income throughout. So the standard advice that leaving the UK removes UK tax is wrong for exactly the asset most clients hold — and a scenario featuring a departing client with a UK rental property is testing whether you know that.",
        },
      ],
      check: {
        q: "A client plans to become non-resident for one year, realise a large gain on a foreign investment while abroad, and then return. What is the flaw?",
        options: [
          "There is none — the gain arises while non-resident",
          "Temporary non-residence: an individual returning within the defined period can be taxed in the year of return on gains realised while away, so the plan achieves nothing unless the absence is long enough",
          "Foreign gains are always taxable in the UK regardless",
          "The client would lose their personal allowance",
        ],
        correct: 1,
        explain:
          "The rule exists to defeat this precise arrangement. Advice on becoming non-resident must therefore address the intended length of absence, because a short absence followed by a return brings the gains back into charge in the year of return.",
      },
    },
    {
      id: "overseas-sources",
      heading: "Overseas trading, employment and investment income",
      blocks: [
        {
          kind: "table",
          caption: "How each foreign source is treated for a UK resident",
          head: ["Source", "Treatment", "The point to make"],
          rows: [
            ["Overseas employment", "Taxable as employment income; relief for foreign tax", "Where duties are performed matters, and a detached duty or travel relief may apply"],
            ["Overseas trade", "Taxable as trading income if the trade is controlled from the UK", "A trade controlled abroad is assessed differently — establish where control sits"],
            ["Overseas property", "Taxable as property income, computed on UK principles", "Losses on overseas property are pooled separately from UK property losses"],
            ["Overseas investment income", "Taxable as savings or dividend income", "Withholding tax suffered abroad gives double tax relief, capped at UK tax"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The separate pools",
          md: "Overseas property losses are kept **separate** from UK property losses, so a loss on a foreign let cannot reduce UK rental profit. Candidates routinely pool them and produce a wrong figure without noticing. The same separation principle appears repeatedly at ATX — the examinable habit is to ask, of every loss, what it may be set against before setting it against anything.",
        },
        {
          kind: "text",
          md: "Where the four-year FIG regime applies, these foreign sources are relieved for the qualifying years — which is why the residence and qualification questions from ATX-03 come **before** any of this computation. Establish the framework, then compute inside it.",
        },
      ],
      check: {
        q: "A UK resident has a loss on an overseas rental property and a profit on a UK rental property. Can the loss reduce the UK profit?",
        options: [
          "Yes, all property income forms a single pool",
          "No — overseas property is a separate pool from UK property, so the overseas loss is carried forward against future overseas property profits only",
          "Yes, provided the properties are in a treaty country",
          "Only if the overseas property is let furnished",
        ],
        correct: 1,
        explain:
          "The two are separate businesses for tax purposes, so losses do not cross between them. This is a frequently examined detail because pooling them is the natural instinct and produces a plausible-looking but wrong computation.",
      },
    },
  ],
  examTraps: [
    { trap: "Assuming split-year treatment applies to any mid-year move.", fix: "It applies automatically only where a defined case is met — otherwise the whole year is resident." },
    { trap: "Recommending non-residence before a disposal.", fix: "Address temporary non-residence and the intended length of absence." },
    { trap: "Assuming leaving the UK removes all UK tax.", fix: "UK land and property remain chargeable throughout." },
    { trap: "Pooling overseas and UK property losses.", fix: "They are separate businesses; losses do not cross." },
  ],
  keyTerms: [
    { term: "Split-year treatment", def: "Division of a tax year into UK and overseas parts where a defined case is met, so that residence applies only to the relevant portion." },
    { term: "Temporary non-residence", def: "Rules taxing certain income and gains realised during a short period of non-residence in the year the individual returns to the UK." },
  ],
  summary: [
    "Split-year treatment applies automatically where a case is met, and not otherwise.",
    "Where no case applies, the individual is resident for the whole tax year.",
    "Temporary non-residence defeats short absences arranged around a disposal.",
    "UK land and property remain within UK tax however long the client is away.",
  ],
  knowledgeDiagnostic: [
    { q: "Is split-year treatment claimed?", a: "No — it applies automatically where one of the defined cases is met, and not at all where none is." },
    { q: "What does temporary non-residence prevent?", a: "Leaving the UK briefly to realise gains free of UK tax and then returning; such gains are taxed in the year of return." },
    { q: "Which UK source remains taxable however long a client is non-resident?", a: "UK land and buildings — both the rental income and the gain on disposal." },
  ],
  furtherStudy: [
    "ATX-03 establishes the residence and FIG framework this chapter operates inside.",
    "ATX-08 covers the capital gains consequences of arriving and leaving.",
    "Area C covers the planning around departure dates and disposal timing.",
  ],
}

export const ATX_TREE_AREA_A_PART1: StudyChapter[] = [ATX_TREE_01, ATX_TREE_02, ATX_TREE_03, ATX_TREE_04]
