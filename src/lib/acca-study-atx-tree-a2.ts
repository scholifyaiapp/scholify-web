import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · Area A, part two — trusts and income tax reliefs (A1), then capital
 * gains tax (A2).
 *
 *   ATX-05  Trusts and income tax                        (A1 trusts)
 *   ATX-06  Additional exemptions and reliefs            (A1 reliefs)
 *   ATX-07  Capital gains tax: the framework at ATX level (A2)
 *   ATX-08  Capital gains tax: overseas aspects          (A2 overseas)
 *   ATX-09  Business reliefs and the disposal of a business (A2 reliefs)
 *   ATX-10  Closely related persons, trusts and CGT      (A2)
 *
 * See acca-study-atx-tree-a.ts for the two rules governing this whole paper:
 * Finance Act 2025 is the examinable law and the FA23 books are wrong on the
 * overseas regime; and no rate, band or threshold is baked into the teaching
 * because the exam supplies them.
 */

const ATX_TREE_05: StudyChapter = {
  paper: "ATX",
  id: "ATX-05",
  number: 5,
  area: "A",
  syllabusRefs: ["A1(c)"],
  title: "Trusts and income tax",
  minutes: 16,
  intro:
    "A trust separates who owns an asset from who benefits from it. Tax follows that separation, which is why trusts appear in all three of income tax, capital gains tax and inheritance tax.",
  outcomes: [
    "Explain the parties to a trust and the difference between the main types",
    "Identify who is taxable on trust income and at what point",
    "Explain the treatment of income distributed to a beneficiary",
    "Recognise the anti-avoidance rules for settlor-interested trusts",
    "Advise on the use of a trust and its tax consequences across the taxes",
  ],
  sections: [
    {
      id: "the-structure",
      heading: "The parties, and the two types that matter",
      blocks: [
        {
          kind: "table",
          caption: "Who is who",
          head: ["Party", "Role"],
          rows: [
            ["Settlor", "Puts assets into the trust — the transfer itself has tax consequences"],
            ["Trustees", "Legal owners, who manage the assets and are taxable on trust income and gains"],
            ["Beneficiaries", "Entitled to benefit, and taxable on what they receive or are entitled to"],
          ],
        },
        {
          kind: "table",
          caption: "The two types the syllabus turns on",
          head: ["", "Interest in possession", "Discretionary"],
          rows: [
            ["Beneficiary's right", "Entitled to the income as it arises", "No entitlement — trustees decide who receives what, and when"],
            ["Income taxed on trustees at", "The basic rates applicable to the type of income", "Higher trust rates, above a small standard rate band"],
            ["Beneficiary taxed", "On the income to which they are entitled, whether or not paid out", "Only on amounts actually distributed"],
            ["Credit for tax paid", "For the tax the trustees suffered", "A tax credit accompanies the distribution, reclaimable if the beneficiary's rate is lower"],
            ["Typical use", "Providing an income for one person, capital for another", "Flexibility where future needs are unknown"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The reclaim is the planning point",
          md: "A distribution from a discretionary trust carries a tax credit at the trust rate. A beneficiary whose own marginal rate is **lower** — a non-taxpayer, a student, a child — can reclaim the difference. So the timing and the choice of recipient are genuine planning levers, and a scenario naming beneficiaries with different income levels is inviting exactly that point.",
        },
      ],
      check: {
        q: "A discretionary trust distributes income to a beneficiary who has no other income. What follows?",
        options: [
          "The beneficiary has no further liability and no entitlement",
          "The distribution carries a tax credit at the trust rate; since the beneficiary's own rate is lower, the excess can be reclaimed — making them a more efficient recipient than a higher-rate beneficiary",
          "The trustees must pay additional tax on the distribution",
          "Distributions from discretionary trusts are exempt",
        ],
        correct: 1,
        explain:
          "Trust income is taxed at high rates in the trustees' hands, and the credit accompanying a distribution allows a lower-rate beneficiary to recover the difference. Choosing which beneficiary receives income, and when, is therefore a legitimate and examinable planning decision.",
      },
    },
    {
      id: "anti-avoidance",
      heading: "Settlor-interested trusts, and why they exist",
      blocks: [
        {
          kind: "text",
          md: "The obvious avoidance is to give income-producing assets to a trust from which you still benefit, so that the income is taxed at someone else's lower rate while you retain access. The **settlor-interested** rules defeat this.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The rule and its reach",
          md: "Where the **settlor or their spouse** can benefit from the trust, the income is treated as the settlor's and taxed on them regardless of who actually receives it. A related rule taxes income paid to the settlor's **unmarried minor children** on the settlor. So a trust set up for the settlor's own young children does not shift the income at all — which is exactly the arrangement candidates are expected to identify and reject.",
        },
        {
          kind: "text",
          md: "The examinable consequence for advice is that a trust is effective for shifting income only where the settlor and their spouse are genuinely and permanently excluded. Where a scenario has a client wanting both to divert income and to retain access, the honest advice is that the two objectives are incompatible.",
        },
      ],
      check: {
        q: "A client settles income-producing assets on a trust under which they and their spouse can benefit, intending the income to be taxed on their adult children. What is the result?",
        options: [
          "The income is taxed on the children at their own rates",
          "The trust is settlor-interested, so the income is taxed on the settlor regardless of who receives it — the arrangement achieves nothing for income tax",
          "The income is taxed on the trustees only",
          "The arrangement is illegal",
        ],
        correct: 1,
        explain:
          "The settlor-interested rules exist for this exact arrangement. The trust may still be effective for other purposes — succession, asset protection, and possibly inheritance tax — but not for shifting income while the settlor retains access. The arrangement is ineffective rather than illegal, which is an important distinction to make in an answer.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating all trusts the same.", fix: "Interest in possession and discretionary trusts differ in who is taxed, when, and at what rate." },
    { trap: "Missing the reclaim available to a low-rate beneficiary.", fix: "The tax credit on a discretionary distribution can be partly recovered." },
    { trap: "Recommending a trust where the settlor retains benefit.", fix: "Settlor-interested rules tax the income on the settlor anyway." },
    { trap: "Answering only the income tax position.", fix: "Trusts engage capital gains tax and inheritance tax at the same time." },
  ],
  keyTerms: [
    { term: "Interest in possession trust", def: "A trust in which a beneficiary is entitled to the income as it arises, whether or not it is paid to them." },
    { term: "Discretionary trust", def: "A trust in which the trustees decide which beneficiaries receive income or capital, and when." },
    { term: "Settlor-interested trust", def: "A trust from which the settlor or their spouse can benefit, so that the income is taxed on the settlor." },
  ],
  summary: [
    "Trustees are taxable on trust income; the beneficiary's position depends on the type of trust.",
    "A discretionary distribution carries a credit that a lower-rate beneficiary can partly reclaim.",
    "Settlor-interested rules tax the income on the settlor where they or their spouse can benefit.",
    "A trust engages income tax, capital gains tax and inheritance tax together.",
  ],
  knowledgeDiagnostic: [
    { q: "When is a beneficiary of an interest in possession trust taxable?", a: "On the income to which they are entitled as it arises, whether or not it has actually been paid to them." },
    { q: "What makes a trust settlor-interested?", a: "The settlor or their spouse being able to benefit, which causes the income to be taxed on the settlor." },
    { q: "Why can a discretionary trust be efficient for a non-taxpaying beneficiary?", a: "The distribution carries a credit at the trust rate, and a beneficiary taxed at a lower rate can reclaim the excess." },
  ],
  furtherStudy: [
    "ATX-10 covers the capital gains tax treatment of transfers into and out of trusts.",
    "Area A's inheritance tax chapters cover trusts as relevant property.",
    "ATX-02 covers the income tax framework these rates sit within.",
  ],
}

const ATX_TREE_06: StudyChapter = {
  paper: "ATX",
  id: "ATX-06",
  number: 6,
  area: "A",
  syllabusRefs: ["A1(d)"],
  title: "Additional exemptions and reliefs",
  minutes: 16,
  intro:
    "The reliefs TX mentioned and ATX expects you to advise on — where the examinable content is the conditions and the claim, not the rate.",
  outcomes: [
    "Identify the principal reliefs available against income tax at ATX level",
    "State the conditions attaching to each and the claim required",
    "Advise on the venture capital reliefs and what distinguishes them",
    "Apply the rules on relief for losses in the most advantageous way",
    "Recognise the restrictions that cap otherwise available relief",
  ],
  sections: [
    {
      id: "venture-capital",
      heading: "Venture capital reliefs",
      blocks: [
        {
          kind: "text",
          md: "These schemes give income tax relief for investing in unquoted trading companies, with capital gains advantages alongside. The examinable distinction is what each is **for**: the riskier the company, the more generous the relief.",
        },
        {
          kind: "table",
          caption: "The three schemes",
          head: ["", "EIS", "SEIS", "VCT"],
          rows: [
            ["Invests in", "Small unquoted trading companies", "Very early stage companies", "A quoted company that itself invests in qualifying trades"],
            ["Income tax relief", "A percentage of the amount invested, as a tax reducer", "A higher percentage, reflecting the greater risk", "A percentage, as a tax reducer"],
            ["Gains on sale", "Exempt if shares held for the minimum period", "Exempt if held for the minimum period", "Exempt"],
            ["Gains deferral", "Deferral relief on a gain reinvested", "Partial exemption of a reinvested gain", "Not available"],
            ["Loss relief", "Loss on disposal available against income", "Available against income", "Not applicable"],
            ["Key risk", "Relief withdrawn if shares sold or conditions breached within the holding period", "Same", "Same"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Relief is a tax reducer and it can be clawed back",
          md: "These reliefs reduce the **liability**, not taxable income, so they cannot create a repayment beyond the tax otherwise payable. And relief is **withdrawn** if the shares are disposed of within the minimum holding period or the company ceases to qualify. Advice recommending an EIS or SEIS investment without stating the holding period is incomplete, because the client may not be able to keep to it.",
        },
        {
          kind: "text",
          md: "The **commercial** point matters for the professional-skills marks: these are investments in small, unquoted, often loss-making companies. They are illiquid, frequently fail, and the tax relief exists to compensate for exactly that. Recommending them purely for the tax saving, without addressing whether the underlying investment suits the client's circumstances and attitude to risk, is bad advice — and the examiner rewards saying so.",
        },
      ],
      check: {
        q: "A client invests in an EIS company and sells the shares eighteen months later, within the minimum holding period. What happens to the income tax relief?",
        options: [
          "It is unaffected, since the relief was given on investment",
          "It is withdrawn — relief is conditional on holding the shares for the minimum period, so an early disposal claws it back, which is why the holding period must be stated when the investment is recommended",
          "Only half the relief is withdrawn",
          "The relief is converted into capital gains relief",
        ],
        correct: 1,
        explain:
          "The relief is conditional rather than final, and the condition is the whole point: the scheme exists to encourage patient capital in small companies. A client who may need the money back within the period should not be advised into the scheme at all.",
      },
    },
    {
      id: "losses",
      heading: "Loss relief, and choosing between the options",
      blocks: [
        {
          kind: "text",
          md: "Where a trade makes a loss, several reliefs compete and the client can usually choose. The examinable skill is **choosing well**, and the choice turns on three things.",
        },
        {
          kind: "list",
          style: "number",
          title: "What decides which loss relief to use",
          items: [
            "**The marginal rate** the loss will save tax at — relief against income taxed at a higher rate is worth more per pound",
            "**Timing** — an earlier claim gives a repayment now, which is worth more than a larger saving later, particularly for a client short of cash",
            "**The personal allowance** — a claim that reduces income below the allowance wastes the allowance, so relief is lost entirely on that slice",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The wasted allowance is the classic error",
          md: "Claiming loss relief against total income can push income below the personal allowance. The allowance cannot be carried forward, so that part of the loss has saved no tax at all. The right answer is often a **partial** approach — relieve enough to bring income down to the allowance and carry the rest forward — and where the legislation does not permit a partial claim, that constraint should itself be stated.",
        },
        {
          kind: "text",
          md: "There is also a **cap** on certain reliefs claimed against total income, set at the greater of a fixed amount and a percentage of adjusted total income. Its effect is that a very large loss cannot be fully relieved against other income in one year, and the excess must find another route. Where a scenario features a substantial loss and significant other income, check the cap before concluding.",
        },
      ],
      check: {
        q: "A client can claim a trading loss against total income of the current year, which would reduce their income to below the personal allowance. What should be advised?",
        options: [
          "Claim the full relief, since using the loss immediately is always best",
          "The relief below the personal allowance saves no tax because the allowance cannot be carried forward — so consider whether a smaller or later claim preserves more value, and state the constraint if a partial claim is not permitted",
          "Carry the whole loss forward regardless",
          "Convert the loss into a capital loss",
        ],
        correct: 1,
        explain:
          "Relief is only worth what it saves, and income sheltered by the personal allowance was never going to be taxed. Recognising the wasted-allowance effect and choosing accordingly is exactly the judgement ATX loss questions are set to test.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending EIS or SEIS without the holding period.", fix: "Relief is withdrawn on early disposal — state the period and check the client can keep to it." },
    { trap: "Recommending venture capital schemes on tax alone.", fix: "They are illiquid investments in high-risk companies; suitability comes first." },
    { trap: "Claiming loss relief that wastes the personal allowance.", fix: "The allowance cannot be carried forward, so relief on that slice saves nothing." },
    { trap: "Ignoring the cap on reliefs against total income.", fix: "Large losses may not be fully relievable in one year." },
  ],
  keyTerms: [
    { term: "Tax reducer", def: "A relief applied against the tax liability rather than against income, and therefore limited to the tax otherwise payable." },
    { term: "Withdrawal of relief", def: "Clawback of venture capital income tax relief where shares are disposed of within the minimum holding period or the company ceases to qualify." },
    { term: "Cap on income tax reliefs", def: "The limit on certain reliefs claimed against total income, set at the greater of a fixed amount and a percentage of adjusted total income." },
  ],
  summary: [
    "EIS, SEIS and VCT give relief scaled to the risk of the underlying company.",
    "Relief is a tax reducer and is withdrawn on early disposal — state the holding period.",
    "Choose loss relief on marginal rate, timing and whether the personal allowance is wasted.",
    "A cap restricts large reliefs claimed against total income.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can venture capital relief not create a repayment?", a: "It is a tax reducer, so it can only reduce the liability to nil rather than generate a refund." },
    { q: "What three factors decide the best loss relief claim?", a: "The marginal rate the relief saves, the timing of the cash benefit, and whether the claim wastes the personal allowance." },
    { q: "Why is recommending an EIS investment on tax grounds alone poor advice?", a: "The underlying investment is illiquid and high risk; the relief exists to compensate for that, so suitability must be established first." },
  ],
  furtherStudy: [
    "ATX-09 covers the capital gains reliefs that accompany these schemes.",
    "Area C covers the ethics of recommending tax-motivated investments.",
    "ATX-02 covers adjusted net income, which the reliefs cap is measured against.",
  ],
}

const ATX_TREE_07: StudyChapter = {
  paper: "ATX",
  id: "ATX-07",
  number: 7,
  area: "A",
  syllabusRefs: ["A2(a)"],
  title: "Capital gains tax: the framework at ATX level",
  minutes: 17,
  intro:
    "The computation is short. Everything difficult about capital gains tax is deciding what counts as a disposal, at what value, and which of the competing reliefs applies.",
  outcomes: [
    "Identify the occasions of charge, including deemed disposals",
    "Apply market value where the parties are connected",
    "Compute a gain, including part disposals and chattels",
    "Explain the treatment of losses and the ordering against the annual exempt amount",
    "Recognise where a capital gains decision interacts with another tax",
  ],
  sections: [
    {
      id: "disposals",
      heading: "What is a disposal, and at what value",
      blocks: [
        {
          kind: "table",
          caption: "Occasions of charge",
          head: ["Event", "Treated as"],
          rows: [
            ["Sale at arm's length", "Disposal at the actual proceeds"],
            ["Gift", "Disposal at market value"],
            ["Sale to a connected person", "Disposal at market value, whatever was actually paid"],
            ["Loss or destruction of an asset", "Disposal, with any insurance proceeds as consideration"],
            ["Transfer between spouses or civil partners", "No gain, no loss — the transferee inherits the original cost"],
            ["Death", "No disposal; the estate acquires assets at probate value, so gains die with the owner"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two rules that drive most planning",
          md: "**Spouse transfers are no gain, no loss**, so an asset can be moved between spouses before a sale to use both annual exempt amounts and both sets of unused basic rate band. And **death wipes out gains**, because the estate acquires at probate value. Together these explain a great deal of capital gains planning — and the second creates a genuine tension with inheritance tax, since holding an asset until death saves capital gains tax but exposes it to inheritance tax.",
        },
        {
          kind: "text",
          md: "**Connected persons** matter because the market value rule overrides whatever price was actually agreed. A sale at an undervalue to a relative produces a gain computed on full value, so a client who sells a property to their child for a token sum has made a disposal at market value — and, at the same time, a gift for inheritance tax. That double consequence is a standard ATX finding.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Losses on connected-person disposals are restricted",
          md: "Where a connected-person transaction produces a loss, that loss is ring-fenced: it may be relieved only against gains on disposals to that **same** person, and it never joins the general pool. Candidates routinely relieve such a loss against unrelated gains and produce a wrong figure that looks entirely reasonable.",
        },
      ],
      check: {
        q: "A client sells a painting worth £60,000 to their sister for £10,000. What is the capital gains position?",
        options: [
          "A disposal for £10,000, being the actual proceeds",
          "A disposal at market value of £60,000, because the sister is a connected person — and the £50,000 undervalue is simultaneously a transfer of value for inheritance tax",
          "No disposal, as it is a family transaction",
          "A disposal at the average of the two figures",
        ],
        correct: 1,
        explain:
          "The connected-person rule substitutes market value regardless of what was paid, so the client has a gain computed on £60,000 while receiving only £10,000 in cash. The undervalue element is also a gift for inheritance tax, which is the interaction the question is really testing.",
      },
    },
    {
      id: "losses-and-order",
      heading: "Losses, the annual exempt amount, and the order of set-off",
      blocks: [
        {
          kind: "text",
          md: "The order of set-off is fixed and it is worth knowing precisely, because getting it wrong wastes relief that cannot be recovered.",
        },
        {
          kind: "list",
          style: "number",
          title: "The order",
          items: [
            "**Current year losses** must be set against current year gains in full — there is no choice, even if this wastes the annual exempt amount",
            "The **annual exempt amount** is deducted from what remains",
            "**Brought forward losses** are then used, but only to the extent that gains still exceed the annual exempt amount — so brought forward losses are never wasted",
            "Any unused brought forward losses are carried forward again",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The asymmetry is the examinable point",
          md: "**Current year losses are compulsory and can waste the annual exempt amount; brought forward losses are restricted so that they never do.** That asymmetry means the timing of a loss-making disposal matters: realising a loss in a year with small gains wastes it, whereas carrying it forward preserves its value. A scenario with a client holding a standing loss and choosing when to realise it is testing exactly this.",
        },
        {
          kind: "text",
          md: "Where a client has gains taxed at different rates — residential property is charged at higher rates than other assets — losses and the annual exempt amount should be set against the **highest-rate gains first**, since relief is worth most there. That allocation is a genuine planning decision and it is frequently worth marks.",
        },
      ],
      check: {
        q: "A client has current year gains of £8,000 and a current year loss of £6,000, with an annual exempt amount above £8,000. What is the position?",
        options: [
          "The loss can be carried forward, preserving it while the annual exempt amount covers the gains",
          "The current year loss must be set against the current year gains, reducing them to £2,000 — the annual exempt amount then covers that, so the loss has saved no tax and is wasted",
          "The loss is set against income instead",
          "Half the loss is used and half carried forward",
        ],
        correct: 1,
        explain:
          "Current year losses are compulsory, so there is no scope to preserve them where the annual exempt amount would have covered the gains anyway. This is why the timing of a loss-making disposal is a planning question — realising it in a year with substantial gains preserves its value.",
      },
    },
  ],
  examTraps: [
    { trap: "Using actual proceeds on a connected-person disposal.", fix: "Market value is substituted regardless of what was paid." },
    { trap: "Relieving a connected-person loss against unrelated gains.", fix: "It can only be used against gains on disposals to the same person." },
    { trap: "Carrying forward a current year loss to preserve the annual exempt amount.", fix: "Current year losses are compulsory; only brought forward losses are restricted." },
    { trap: "Setting losses against the lowest-rate gains.", fix: "Allocate to the highest-rate gains first, where relief is worth most." },
  ],
  keyTerms: [
    { term: "No gain, no loss transfer", def: "A transfer between spouses or civil partners on which no gain arises, with the transferee taking over the original cost." },
    { term: "Connected person", def: "A relative or associated party whose transactions are treated as taking place at market value, with losses restricted to gains on the same person." },
    { term: "Annual exempt amount", def: "The amount of gains exempt each year, which cannot be carried forward and can be wasted by compulsory current year loss relief." },
  ],
  summary: [
    "Gifts and connected-person sales are disposals at market value.",
    "Spouse transfers are no gain, no loss; death wipes out gains entirely.",
    "Current year losses are compulsory and can waste the annual exempt amount; brought forward losses cannot.",
    "Allocate losses and the exempt amount to the highest-rate gains first.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does death remove capital gains tax?", a: "There is no disposal on death and the estate acquires assets at probate value, so the accrued gain is never charged — though the asset falls into the estate for inheritance tax." },
    { q: "What is the asymmetry between current year and brought forward losses?", a: "Current year losses must be used in full even if that wastes the annual exempt amount; brought forward losses are restricted so they never do." },
    { q: "Why does a sale at undervalue to a relative engage two taxes?", a: "Market value is substituted for capital gains tax, and the undervalue is a transfer of value for inheritance tax." },
  ],
  furtherStudy: [
    "ATX-09 covers the business reliefs that reduce or defer these gains.",
    "ATX-08 covers overseas aspects, including gains for non-residents on UK land.",
    "The inheritance tax chapters cover the other half of the gift interaction.",
  ],
}

const ATX_TREE_08: StudyChapter = {
  paper: "ATX",
  id: "ATX-08",
  number: 8,
  area: "A",
  syllabusRefs: ["A2(b)"],
  title: "Capital gains tax: overseas aspects",
  minutes: 16,
  intro:
    "The same Finance Act 2025 rewrite as income tax, plus the one rule that survives it: UK land is always within the UK charge, whoever owns it and wherever they live.",
  outcomes: [
    "Apply residence to determine the capital gains tax position",
    "Advise on the availability of the four-year FIG regime for gains",
    "Determine the UK taxation of foreign gains, including double tax relief",
    "Advise on the charge on non-residents disposing of UK land and buildings",
    "Conclude on the position of individuals coming to and leaving the UK",
  ],
  sections: [
    {
      id: "the-framework",
      heading: "Residence decides, and the FIG regime relieves",
      blocks: [
        {
          kind: "text",
          md: "The framework mirrors income tax exactly, which is deliberate — Finance Act 2025 aligned the two. A **UK resident** is chargeable on worldwide gains. Domicile is irrelevant. The **four-year FIG regime** relieves foreign gains for a qualifying new resident, on the same ten-year and four-year conditions, and at the same price: claiming it forfeits the **annual exempt amount** as well as the personal allowance.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The exception that survives everything",
          md: "**Non-residents are chargeable on gains from disposing of UK land and buildings.** This applies regardless of residence, regardless of the FIG regime, and regardless of how long the person has been away. It is the single most important overseas rule in the capital gains chapter, because it defeats the intuitive advice that leaving the UK removes UK capital gains tax — and most clients' largest asset is UK property.",
        },
        {
          kind: "text",
          md: "For a non-resident disposing of UK land there is also a **reporting and payment obligation within a short period of completion**, separate from the self-assessment return. Missing it produces penalties even where no tax is ultimately due, so the deadline belongs in any advice about such a disposal.",
        },
      ],
      check: {
        q: "A client who has been non-UK resident for six years sells a UK rental property at a gain, and separately sells shares in a foreign company at a gain. What is the UK position?",
        options: [
          "Neither gain is chargeable, since the client is non-resident",
          "The UK property gain is chargeable to UK capital gains tax despite non-residence, with a separate reporting and payment deadline shortly after completion; the foreign share gain is outside the UK charge",
          "Both gains are chargeable on the arising basis",
          "Only the foreign gain is chargeable",
        ],
        correct: 1,
        explain:
          "UK land is the exception to the general rule that non-residents escape UK capital gains tax, and it carries its own short reporting deadline. The foreign shares are outside the charge entirely while the client is non-resident, subject to the temporary non-residence rules if they return quickly.",
      },
    },
    {
      id: "arriving-leaving",
      heading: "Arriving, leaving, and the traps between",
      blocks: [
        {
          kind: "table",
          caption: "The position on each side of a move",
          head: ["Situation", "Consequence"],
          rows: [
            ["Arriving, qualifying for FIG", "Foreign gains relieved for four years; UK gains chargeable throughout; annual exempt amount forfeited in a claim year"],
            ["Arriving, not qualifying", "Worldwide gains chargeable from the start of UK residence, or from the UK part where split-year treatment applies"],
            ["Leaving, split year applies", "Foreign gains in the overseas part fall outside the charge; UK land remains chargeable"],
            ["Leaving, no split year", "Resident for the whole year, so gains realised after departure remain chargeable until 5 April"],
            ["Leaving and returning within the period", "Temporary non-residence brings gains realised while away into charge in the year of return"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The planning that actually works, and the one that does not",
          md: "What **does** work: timing a disposal so it falls in a year of non-residence where the absence is genuinely long, transferring an asset to a spouse before sale to use two annual exempt amounts and two basic rate bands, and using the FIG regime where the client genuinely qualifies. What **does not**: a brief departure arranged around a single disposal, and any plan relying on domicile.",
        },
        {
          kind: "text",
          md: "Where foreign gains are chargeable and foreign tax has been paid, **double tax relief** works exactly as for income: the lower of the UK tax on the gain and the overseas tax, computed gain by gain. And the treaty may allocate the taxing right differently, so a conclusion from UK rules alone should be qualified where a treaty exists.",
        },
      ],
      check: {
        q: "A qualifying new resident claims the four-year FIG regime in a year when they also realise a large UK gain. What is the cost of the claim?",
        options: [
          "Nothing — the regime relieves foreign gains at no cost",
          "The annual exempt amount and the personal allowance are forfeited for that year, so the UK gain is taxed from the first pound — the claim must therefore be compared against not claiming",
          "The UK gain also becomes exempt",
          "The claim can only be made if there are no UK gains",
        ],
        correct: 1,
        explain:
          "The regime relieves foreign income and gains but withdraws the allowances, and the UK gain is unaffected by the relief while losing the exempt amount that would have sheltered part of it. Whether to claim is therefore a computation, not an assumption — which is precisely how the requirement will be framed.",
      },
    },
  ],
  examTraps: [
    { trap: "Advising that non-residence removes UK capital gains tax.", fix: "UK land and buildings remain chargeable for non-residents." },
    { trap: "Missing the short reporting deadline on a UK land disposal.", fix: "It is separate from self-assessment and carries penalties independently." },
    { trap: "Applying domicile to the capital gains position.", fix: "Finance Act 2025 removed it; residence and the FIG regime govern." },
    { trap: "Claiming the FIG regime without comparing.", fix: "It forfeits the annual exempt amount and personal allowance for that year." },
  ],
  keyTerms: [
    { term: "Non-resident CGT on UK land", def: "The charge on gains from disposing of UK land and buildings that applies to non-residents, with its own short reporting and payment deadline." },
    { term: "Temporary non-residence", def: "Rules bringing gains realised during a short absence into charge in the year the individual returns to the UK." },
  ],
  summary: [
    "Residence governs; domicile does not, and the FIG regime relieves foreign gains for four years.",
    "UK land is chargeable for non-residents, with a separate short reporting deadline.",
    "Split-year treatment and temporary non-residence decide the position around a move.",
    "Claiming FIG forfeits the annual exempt amount, so compare before claiming.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the one gain a non-resident cannot escape?", a: "A gain on the disposal of UK land and buildings, which carries its own short reporting and payment deadline." },
    { q: "What does the FIG regime cost in a capital gains context?", a: "The annual exempt amount for the year of claim, alongside the personal allowance." },
    { q: "How is double tax relief computed for a foreign gain?", a: "As the lower of the UK tax on that gain and the overseas tax suffered, computed gain by gain." },
  ],
  furtherStudy: [
    "ATX-03 establishes the residence and FIG framework this chapter applies to gains.",
    "ATX-04 covers split-year treatment and temporary non-residence in detail.",
    "ATX-07 covers the underlying computation these overseas rules modify.",
  ],
}

export const ATX_TREE_AREA_A_PART2: StudyChapter[] = [ATX_TREE_05, ATX_TREE_06, ATX_TREE_07, ATX_TREE_08]
