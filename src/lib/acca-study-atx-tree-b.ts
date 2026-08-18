import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · Areas B, C, D and E — the impact and interaction of taxes (B), tax
 * planning and its ethics (C), professional skills (D) and employability (E).
 *
 *   ATX-21  Identifying the taxes in play           (B1)
 *   ATX-22  Alternative ways of achieving an outcome (B2)
 *   ATX-23  Tax and business financial decisions     (B3 business)
 *   ATX-24  Tax and personal financial decisions     (B3 personal)
 *   ATX-25  Weighing the alternatives                (B4)
 *   ATX-26  Statutory obligations and time limits    (B5)
 *   ATX-27  Investments and expenditure that reduce tax (C1)
 *   ATX-28  Legitimate planning measures             (C2)
 *   ATX-29  Suitability for the particular client    (C3)
 *   ATX-30  Demonstrating the mitigation             (C4)
 *   ATX-31  The ethics of tax planning               (C5)
 *   ATX-32  Professional skills                      (D)
 *   ATX-33  Employability and technology skills      (E)
 *
 * Areas B and C are where ATX stops being an extension of TX. They contain no
 * new taxes at all — every technique is from Area A — and examine instead the
 * ability to combine them, choose between them and advise on them. Area C5
 * carries the five ethics marks Section A awards in every sitting.
 *
 * See acca-study-atx-tree-a.ts for the Finance Act 2025 and rates rules
 * governing this whole paper.
 */

const ATX_TREE_21: StudyChapter = {
  paper: "ATX",
  id: "ATX-21",
  number: 21,
  area: "B",
  syllabusRefs: ["B1"],
  title: "Identifying the taxes in play",
  minutes: 16,
  intro:
    "The first mark in almost every ATX question goes to whoever notices which taxes a transaction touches. Most candidates find two of four.",
  outcomes: [
    "Identify every tax engaged by a given transaction or course of action",
    "Explain how one tax's treatment affects another's",
    "Apply a systematic scan so that no tax is overlooked",
    "Recognise the transactions that reliably engage several taxes at once",
    "Set out the combined effect rather than a sequence of separate answers",
  ],
  sections: [
    {
      id: "the-scan",
      heading: "A scan that finds them all",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Run the same list every time",
          md: "**Income tax. National insurance. Capital gains tax. Inheritance tax. Corporation tax. VAT. Stamp taxes.** Seven items, ten seconds, and it converts an intuitive answer into a complete one. The habit matters because the taxes candidates forget are always the same ones — national insurance, VAT and stamp taxes — and each is often worth a mark or two that nobody else in the room claimed.",
        },
        {
          kind: "table",
          caption: "Transactions that reliably engage several taxes",
          head: ["Transaction", "Taxes engaged"],
          rows: [
            ["Gift of business shares to a child", "Capital gains tax, inheritance tax, stamp taxes"],
            ["Incorporating a sole trade", "Income tax, capital gains tax, corporation tax, VAT, stamp taxes, national insurance"],
            ["Selling a company", "Capital gains tax or corporation tax, stamp taxes, VAT, and income tax on the proceeds' later use"],
            ["Extracting profits", "Income tax, national insurance, corporation tax"],
            ["Buying a property through a company", "Corporation tax, stamp taxes, VAT, and inheritance tax on the shares"],
            ["Moving abroad", "Income tax, capital gains tax, inheritance tax — each with a different residence test"],
          ],
        },
        {
          kind: "text",
          md: "The last row is worth particular attention because the tests **differ between taxes**. Finance Act 2025 aligned income tax and capital gains tax on residence with a four-year regime for new arrivals, while inheritance tax moved to a long-term residence test. So a client emigrating can be outside two taxes and inside the third, and an answer assuming one conclusion covers all three is wrong.",
        },
      ],
      check: {
        q: "A sole trader incorporates their business. Which taxes should the advice address?",
        options: [
          "Capital gains tax on the transfer of assets",
          "Capital gains tax on the transfer, income tax and national insurance on the change in how profits are taken, corporation tax on the company, VAT on the transfer of the business, and stamp taxes on any land — six taxes from one decision",
          "Corporation tax only, since the business is now a company",
          "Income tax and corporation tax",
        ],
        correct: 1,
        explain:
          "Incorporation is the single richest ATX transaction because it changes the taxpayer, the taxes and the extraction method at once. A candidate answering only on capital gains tax has found perhaps a third of the marks available.",
      },
    },
    {
      id: "interaction",
      heading: "How one tax changes another",
      blocks: [
        {
          kind: "table",
          caption: "The interactions that recur",
          head: ["Interaction", "Effect"],
          rows: [
            ["Gift relief and the seven-year rule", "The capital gain is deferred to the donee while the gift starts a seven-year inheritance tax clock for the donor"],
            ["Business property relief and business asset disposal relief", "Both need a trading business, but their conditions differ — qualifying for one does not guarantee the other"],
            ["Holding an asset until death", "Removes the capital gain entirely, but leaves the asset in the estate for inheritance tax"],
            ["Salary versus dividend", "Salary reduces corporation tax and attracts national insurance; a dividend does neither"],
            ["Transfer into a trust", "Inheritance tax bites immediately, which is why gift relief widens to any asset"],
            ["Selling shares versus assets", "The substantial shareholding exemption and the lower stamp tax rate pull toward shares; base cost and clean liabilities pull toward assets"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The classic tension, worth stating in full whenever it arises",
          md: "**Capital gains tax rewards holding until death; inheritance tax rewards giving away early.** An asset held until death carries no capital gains tax because the estate acquires at probate value, but its full value sits in the estate. Gifted seven years before death it escapes inheritance tax, but the capital gain is charged or held over. There is no answer that avoids both, so the advice must weigh the two — and the deciding factors are usually the client's age and health, their need for the asset's income, and whether business property relief is available.",
        },
        {
          kind: "text",
          md: "The examinable habit is to state the interaction **explicitly** rather than answering each tax in sequence and leaving the reader to combine them. A sentence such as 'gift relief defers the gain to your son, but the gift also starts a seven-year period during which your estate remains exposed' does the work that two separate paragraphs do not.",
        },
      ],
      check: {
        q: "A client aged 82 in poor health owns a valuable painting standing at a large gain. What is the central tension in advising them?",
        options: [
          "There is none — gifting is always preferable",
          "Holding until death removes the capital gain because the estate acquires at probate value, but the full value falls into the estate for inheritance tax; gifting escapes inheritance tax only if they survive seven years, which their age and health make unlikely",
          "The painting should be sold immediately",
          "Only inheritance tax is relevant at that age",
        ],
        correct: 1,
        explain:
          "The two taxes pull in opposite directions and the client's circumstances resolve it: with a low likelihood of surviving seven years, a gift risks incurring the capital gains charge without escaping inheritance tax. That is why the requirement supplies the age and health — they are the deciding facts, not background.",
      },
    },
  ],
  examTraps: [
    { trap: "Answering only the tax named in the requirement.", fix: "Run the seven-tax scan; the marks for the others are rarely claimed." },
    { trap: "Forgetting national insurance, VAT and stamp taxes.", fix: "These are the three consistently overlooked." },
    { trap: "Assuming one residence conclusion covers all taxes.", fix: "Inheritance tax uses a different test from income tax and capital gains tax." },
    { trap: "Answering each tax in sequence.", fix: "State the interaction explicitly — that is what the requirement is about." },
  ],
  keyTerms: [
    { term: "Tax interaction", def: "The way a treatment or relief in one tax alters the position in another arising from the same transaction — the defining feature of an ATX scenario." },
  ],
  summary: [
    "Scan seven taxes on every transaction; the forgotten ones are national insurance, VAT and stamp taxes.",
    "Incorporation, business sales and emigration each engage most of the list.",
    "Residence tests differ between taxes — a client can be outside two and inside the third.",
    "Capital gains tax rewards holding until death; inheritance tax rewards giving early.",
  ],
  knowledgeDiagnostic: [
    { q: "Which three taxes do candidates most often overlook?", a: "National insurance, VAT and stamp taxes." },
    { q: "Why can a client be non-resident for income tax but still within inheritance tax?", a: "The taxes use different tests — residence and the four-year regime for income tax and capital gains tax, long-term residence for inheritance tax." },
    { q: "State the central capital gains and inheritance tax tension.", a: "Holding until death removes the gain but exposes the value to inheritance tax; gifting early escapes inheritance tax after seven years but triggers or defers the gain." },
  ],
  furtherStudy: [
    "ATX-22 covers the alternative routes to the same commercial outcome.",
    "ATX-25 covers weighing those alternatives against each other.",
    "Area A supplies the individual taxes this chapter combines.",
  ],
}

const ATX_TREE_22: StudyChapter = {
  paper: "ATX",
  id: "ATX-22",
  number: 22,
  area: "B",
  syllabusRefs: ["B2"],
  title: "Alternative ways of achieving an outcome",
  minutes: 16,
  intro:
    "Clients state an objective, not a transaction. Several routes usually reach it, and they are taxed very differently — which is the whole of this subsection.",
  outcomes: [
    "Identify alternative routes to a client's stated objective",
    "Compare the tax consequences of each route",
    "Recognise that the client's objective is not the same as the transaction proposed",
    "Compare on total cost across all taxes and all affected parties",
    "Present a comparison a client can act on",
  ],
  sections: [
    {
      id: "objective-not-transaction",
      heading: "Start from the objective, not the proposal",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The most valuable question in the paper",
          md: "**What is the client actually trying to achieve?** A client who says 'I want to give my son the factory' may want him to run the business, or to inherit it eventually, or to have an income from it. Those three objectives have different best answers — an outright gift, a will provision, and a share issue or partnership respectively — and only the first is what was asked for. Restating the objective before comparing routes is what turns a computation into advice.",
        },
        {
          kind: "table",
          caption: "One objective, several routes",
          head: ["Objective", "Routes", "The tax difference"],
          rows: [
            ["Pass a business to the next generation", "Outright gift; sale at undervalue; gift into trust; retain until death; issue new shares to the child", "Gift relief and the seven-year clock, versus an immediate charge, versus death removing the gain but exposing the estate"],
            ["Extract value from a company", "Salary; dividend; pension contribution; rent for a property owned personally; loan repayment", "National insurance, corporation tax deductibility and personal rates differ across all five"],
            ["Realise value from an asset", "Sell outright; sell in instalments across tax years; transfer part to a spouse first; hold and borrow against it", "Annual exempt amounts, band usage and timing all change the result"],
            ["Expand overseas", "Branch; subsidiary; joint venture; licensing", "Where losses can be relieved, and whether profits enter the UK charge"],
          ],
        },
        {
          kind: "text",
          md: "Note that several of these routes are **not transactions at all** — retaining an asset, or issuing new shares rather than transferring existing ones. Candidates tend to compare only the alternatives the scenario names, and the marks for identifying an unmentioned route are among the most reliably available on the paper.",
        },
      ],
      check: {
        q: "A client says they want to give their trading company shares to their daughter so she has a stake in the business. What should the adviser establish first?",
        options: [
          "The market value of the shares",
          "What the client is actually trying to achieve — income for the daughter, eventual inheritance, or her running the business — because each objective has a different best route, and issuing new shares may serve some of them better than transferring existing ones",
          "Whether gift relief is available",
          "The daughter's own tax position",
        ],
        correct: 1,
        explain:
          "The proposal is the client's guess at how to reach their objective, and it is frequently not the best route. Establishing the objective opens up alternatives — a new share issue, a will provision, a partnership — that the stated transaction would have foreclosed.",
      },
    },
    {
      id: "comparing",
      heading: "Comparing routes properly",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "What a sound comparison contains",
          items: [
            "**Every tax** for each route, not just the obvious one",
            "**Every affected party** — the client, the recipient, and the company, since a family's total cost is what matters",
            "**The timing** of each payment, because a liability in eight years is not equivalent to one now",
            "**The conditions and deadlines**, since a route depending on a claim that cannot be made is not available",
            "**The non-tax consequences** — control, security, flexibility, cost of implementation",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Compare the family, not the client",
          md: "A route saving the client £40,000 while costing their son £60,000 has made the family worse off. Because ATX scenarios are usually about passing value between family members, the comparison should be presented on a **combined** basis, with the split shown separately so the client can see who bears what. Doing this explicitly is a strong commercial acumen point and most candidates never do it.",
        },
        {
          kind: "example",
          title: "Presenting the comparison",
          scenario:
            "A client wants to pass shares to their son. Assume for illustration a gain of £300,000 and a share value of £500,000.",
          steps: [
            { label: "Route one — gift now, claim gift relief", detail: "No capital gains tax now; son's base cost reduced by £300,000. A potentially exempt transfer, exempt after seven years. Business property relief may cover it if he keeps the shares." },
            { label: "Route two — gift now, no gift relief claim", detail: "Capital gains tax now, possibly at the business asset disposal relief rate; son takes a full base cost. Same inheritance tax position." },
            { label: "Route three — retain until death", detail: "No capital gains tax at all; £500,000 in the estate, potentially covered by business property relief if the conditions still hold at death." },
            { label: "The comparison", detail: "Set out each route's cost to the client, to the son, and combined — with the timing and the conditions each depends on." },
          ],
          result:
            "Route three often wins where business property relief is available and the client does not need the value, but it depends on the relief surviving to death and on the client not needing to sell — which is precisely the judgement the requirement wants.",
        },
      ],
      check: {
        q: "Why should an ATX comparison be presented on a combined family basis?",
        options: [
          "Because HMRC assesses families jointly",
          "Because the objective is usually to pass value within a family, so a route that saves the client tax at a greater cost to the recipient leaves the family worse off — though the split should still be shown so the client sees who bears what",
          "Because individual computations are not examinable",
          "Because the recipient's position is always identical to the client's",
        ],
        correct: 1,
        explain:
          "Optimising one party's position in isolation can destroy more value than it saves, and deferral reliefs in particular simply move the liability to someone else. Presenting the combined cost with the split visible is what lets the client make an informed decision.",
      },
    },
  ],
  examTraps: [
    { trap: "Comparing only the routes the scenario names.", fix: "Identify unmentioned alternatives, including retaining the asset or issuing new shares." },
    { trap: "Accepting the client's proposal as the objective.", fix: "Establish what they are trying to achieve; the route may be wrong for it." },
    { trap: "Comparing one tax across routes.", fix: "Every tax, every party, and the timing of each payment." },
    { trap: "Optimising the client's position alone.", fix: "Show the combined family cost with the split visible." },
  ],
  keyTerms: [
    { term: "Objective", def: "What the client is actually trying to achieve, as distinct from the transaction they have proposed to achieve it." },
  ],
  summary: [
    "Establish the objective before comparing routes — the proposal is the client's guess.",
    "Identify routes the scenario does not mention, including doing nothing.",
    "Compare every tax, every party, the timing, the conditions and the non-tax consequences.",
    "Present the family's combined cost, with the split between parties shown.",
  ],
  knowledgeDiagnostic: [
    { q: "Why establish the client's objective rather than accepting the proposed transaction?", a: "Several routes usually reach the same objective and are taxed differently, and the proposal is only the client's guess at how to get there." },
    { q: "Which alternative do candidates most often omit?", a: "Doing nothing — retaining the asset until death, which removes the capital gain entirely." },
    { q: "Why compare on a combined family basis?", a: "Deferral reliefs move liabilities between family members, so optimising one party can leave the family as a whole worse off." },
  ],
  furtherStudy: [
    "ATX-25 covers presenting the advantages and disadvantages of each route.",
    "ATX-21 covers identifying every tax each route engages.",
    "Area C covers whether the chosen route is appropriate for this particular client.",
  ],
}

const ATX_TREE_23: StudyChapter = {
  paper: "ATX",
  id: "ATX-23",
  number: 23,
  area: "B",
  syllabusRefs: ["B3"],
  title: "Tax and business financial decisions",
  minutes: 16,
  intro:
    "Every financing, structuring and investment decision a business takes has a tax consequence — and in most cases the tax is not the reason for the decision but does change its cost.",
  outcomes: [
    "Assess the tax effects of how a business is financed",
    "Advise on the tax consequences of acquiring and disposing of business assets",
    "Compare the tax treatment of different remuneration and benefit decisions",
    "Assess the tax effects of a change in business structure",
    "Recognise where tax should and should not drive a commercial decision",
  ],
  sections: [
    {
      id: "financing-assets",
      heading: "Financing and asset decisions",
      blocks: [
        {
          kind: "table",
          caption: "How the tax follows the decision",
          head: ["Decision", "Tax consequence"],
          rows: [
            ["Borrow rather than issue equity", "Interest is generally deductible; dividends are not — so debt reduces taxable profits where the borrowing is for trade purposes"],
            ["Buy an asset outright", "Capital allowances on qualifying plant, spread over time rather than deducted at once"],
            ["Lease an asset instead", "Rentals are generally deductible as incurred, changing the timing of relief"],
            ["Sell an asset and reinvest", "Rollover relief can defer the gain where a qualifying replacement is acquired in the window"],
            ["Buy a building", "Limited allowances on the structure itself, with fixtures analysed separately — the split matters and is often overlooked"],
            ["Provide a benefit instead of salary", "Different national insurance and deductibility outcomes for the company and the employee"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The timing point that recurs",
          md: "Most business tax planning is about **when** relief arrives rather than whether it does. Capital allowances spread relief over years while a lease deducts as incurred; a rollover defers a gain rather than removing it; accelerating expenditure into an earlier period brings relief forward. So the comparison is usually a cash flow one, and expressing it that way — relief now versus relief later — is what the advice should say.",
        },
        {
          kind: "text",
          md: "**Capital allowances on buildings** deserve specific attention because the analysis is frequently missed. The structure itself attracts only limited relief, while fixtures and integral features within it are analysed separately and can attract materially better treatment. So on a property purchase the advice is to have the price **apportioned** between the elements — which requires it to be done at acquisition, not years later.",
        },
      ],
      check: {
        q: "A company is deciding whether to buy machinery outright or lease it. What is the principal tax consideration?",
        options: [
          "Only the outright purchase attracts any relief",
          "The timing of relief — outright purchase gives capital allowances spread over time, while lease rentals are generally deductible as incurred, so the comparison is a cash flow one rather than a question of whether relief is available",
          "Leasing attracts no relief at all",
          "The two are identical for tax purposes",
        ],
        correct: 1,
        explain:
          "Both routes obtain relief; they differ in when. That makes the decision a cash flow comparison alongside the commercial factors — cost of finance, flexibility, obsolescence risk — rather than a straightforward tax saving.",
      },
    },
    {
      id: "structure-change",
      heading: "Changing the structure",
      blocks: [
        {
          kind: "text",
          md: "The **incorporation** decision recurs throughout ATX because it changes everything at once. It is worth having a settled framework for it.",
        },
        {
          kind: "table",
          caption: "Incorporating a successful sole trade",
          head: ["Aspect", "Consequence"],
          rows: [
            ["Cessation of the trade", "Closing year rules apply; overlap relief is finally used"],
            ["Transfer of assets", "Disposal at market value, with incorporation relief automatic or gift relief available on assets transferred separately"],
            ["Goodwill", "Restricted relief on transfer to a related company — a specific trap"],
            ["Profits going forward", "Corporation tax, with extraction taxed separately on the individual"],
            ["Losses", "Trading losses cannot be carried into the company against its profits in the ordinary way"],
            ["VAT and stamp taxes", "Transfer of a going concern rules; stamp taxes on any land transferred"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two traps in incorporation",
          md: "**Losses do not travel.** A sole trader with unused trading losses who incorporates cannot set them against the company's profits in the ordinary way, so incorporating a loss-making business at the wrong moment strands the relief. And **incorporation relief is automatic**, so a client who wanted to crystallise a gain must elect to disapply it. Both are decided by timing, which is why the advice should address *when* to incorporate as well as whether.",
        },
        {
          kind: "text",
          md: "The general principle, worth stating explicitly in any structure question: **tax should inform the decision, not make it**. A structure chosen only for tax that does not suit the business — a company for a client who needs the cash personally, or a partnership where liability matters — will cost more in practice than it saves. Saying so, and identifying the non-tax factors, is what the commercial acumen marks reward.",
        },
      ],
      check: {
        q: "A sole trader with substantial unused trading losses is considering incorporating. What should the advice address?",
        options: [
          "That the losses will transfer to the company automatically",
          "That trading losses do not pass to the company in the ordinary way, so incorporating now may strand them — the timing matters, and using the losses against other income or a final-year claim before incorporating should be considered",
          "That the losses become capital losses",
          "That incorporation is not permitted with unused losses",
        ],
        correct: 1,
        explain:
          "The reliefs available to an individual and to a company are separate, and incorporation ends the individual's trade. Recognising that timing decides whether the losses are used or stranded turns a technical point into the actual advice.",
      },
    },
  ],
  examTraps: [
    { trap: "Presenting a financing choice as a tax saving.", fix: "It is usually a timing difference — express it as cash flow." },
    { trap: "Ignoring the fixtures analysis on a building purchase.", fix: "Apportion the price at acquisition; the structure and its fixtures are treated differently." },
    { trap: "Assuming losses follow a business into a company.", fix: "They do not travel in the ordinary way — plan the timing." },
    { trap: "Recommending a structure on tax alone.", fix: "Tax informs the decision; the commercial factors decide it." },
  ],
  keyTerms: [
    { term: "Overlap relief", def: "Relief for profits taxed twice in the opening years of a trade, finally given when the trade ceases." },
    { term: "Integral features", def: "Elements within a building analysed separately from the structure for capital allowances purposes." },
  ],
  summary: [
    "Most business tax planning changes when relief arrives rather than whether it does.",
    "Apportion a building's price at acquisition; structure and fixtures differ.",
    "Incorporation strands trading losses and applies incorporation relief automatically.",
    "Tax informs a structural decision; commercial factors should decide it.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is buy-versus-lease a cash flow comparison?", a: "Both obtain relief — capital allowances spread over time, rentals as incurred — so the difference is timing rather than availability." },
    { q: "What happens to a sole trader's unused losses on incorporation?", a: "They do not pass to the company in the ordinary way, so they may be stranded unless used before the trade ceases." },
    { q: "Why apportion a building purchase price at acquisition?", a: "The structure and the fixtures within it attract different capital allowances treatment, and the analysis is far harder to do later." },
  ],
  furtherStudy: [
    "ATX-24 covers the personal financial decisions this chapter's business side connects to.",
    "ATX-09 covers the capital gains reliefs on incorporation and asset replacement.",
    "ATX-15 covers the corporation tax framework the incorporated business enters.",
  ],
}

const ATX_TREE_24: StudyChapter = {
  paper: "ATX",
  id: "ATX-24",
  number: 24,
  area: "B",
  syllabusRefs: ["B3"],
  title: "Tax and personal financial decisions",
  minutes: 16,
  intro:
    "The client's own money: how they save it, invest it, protect it and eventually pass it on. Each decision has a tax consequence and most have a timing lever.",
  outcomes: [
    "Advise on the tax treatment of the main savings and investment vehicles",
    "Explain the tax advantages of pension provision and its constraints",
    "Advise on the timing of disposals across tax years",
    "Assess the tax consequences of personal borrowing and property ownership",
    "Integrate personal decisions with the client's succession objectives",
  ],
  sections: [
    {
      id: "saving-investing",
      heading: "Saving, investing and pensions",
      blocks: [
        {
          kind: "table",
          caption: "The vehicles and what each does",
          head: ["Vehicle", "Tax treatment", "The constraint"],
          rows: [
            ["Individual savings account", "Income and gains within it are exempt", "An annual subscription limit; no relief on the way in"],
            ["Pension", "Relief on contributions, tax-free growth, taxable on drawing with a tax-free element", "Annual and lifetime constraints; funds inaccessible until a minimum age"],
            ["Venture capital schemes", "Income tax reducer, exempt gains, and deferral", "High risk, illiquid, minimum holding periods"],
            ["Direct equities", "Dividends and gains taxed, with allowances and the annual exempt amount", "Fully flexible, fully taxable"],
            ["Rental property", "Property income taxed, restricted relief for finance costs, gains on disposal", "Illiquid, and the finance cost restriction changes the arithmetic materially"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Pensions do three things at once",
          md: "A contribution attracts **relief at the marginal rate**, **extends the basic rate band** so other income is taxed more cheaply, and **reduces adjusted net income** so a tapered personal allowance can be restored. For a client sitting in the taper the combined effect is far above the headline rate, as ATX-02 shows. The constraint is access — the money is locked until a minimum age — so the advice must confirm the client will not need it.",
        },
        {
          kind: "text",
          md: "The **restriction on finance costs** for residential property is worth knowing because it changes the classic advice. Interest on a residential letting no longer reduces property income directly; relief is given as a basic-rate reduction in the tax liability instead. The consequence is that a higher-rate landlord's effective cost of borrowing rose sharply, which is why some clients hold property through companies — where the restriction does not apply but other costs do.",
        },
      ],
      check: {
        q: "A higher-rate taxpayer whose income sits in the personal allowance taper asks whether to fund a pension or an individual savings account. What is the tax argument?",
        options: [
          "They are equivalent, since both grow free of tax",
          "The pension gives relief on the way in, extends the basic rate band and reduces adjusted net income to restore tapered allowance — a combined effect well above the headline rate — whereas the savings account gives no relief on entry; the trade-off is that pension funds are inaccessible until a minimum age",
          "The savings account is always better because withdrawals are tax-free",
          "Neither has any advantage for a higher-rate taxpayer",
        ],
        correct: 1,
        explain:
          "Both shelter growth, but only the pension gives relief on contribution and only the pension reduces adjusted net income. Inside the taper that combination is decisive on tax grounds, which is why the recommendation turns on whether the client can accept losing access to the money.",
      },
    },
    {
      id: "timing",
      heading: "Timing, and the allowances that expire",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Several allowances are use-it-or-lose-it",
          md: "The **capital gains annual exempt amount** cannot be carried forward. Neither can the **income tax personal allowance**, nor most of the **inheritance tax annual exemption** beyond one year. So a client with flexibility over timing should be using each year's allowances rather than bunching a disposal into one year — and splitting a disposal across a 5 April is the simplest planning move in the paper.",
        },
        {
          kind: "table",
          caption: "Timing levers worth checking in any personal scenario",
          head: ["Lever", "Effect"],
          rows: [
            ["Split a disposal across two tax years", "Two annual exempt amounts, and possibly two sets of unused basic rate band"],
            ["Transfer part of an asset to a spouse first", "Adds their annual exempt amount and band — no gain, no loss on the transfer"],
            ["Accelerate or defer a pension contribution", "Moves relief into the year with the highest marginal rate or the tapered allowance"],
            ["Realise a loss before the year end", "Sets against gains already realised — but only if there are gains to use it against"],
            ["Time a gift more than seven years before expected death", "Removes it from the estate entirely"],
            ["Delay a departure past 5 April", "Can change the residence position for a whole tax year"],
          ],
        },
        {
          kind: "text",
          md: "Note the qualification on realising losses: a loss realised in a year with no gains is **compulsorily** set against those gains first and can waste the annual exempt amount, as ATX-07 explains. So 'crystallise the loss before the year end' is good advice only where gains exist to absorb it — and identifying that condition is what separates a considered answer from a rule of thumb.",
        },
      ],
      check: {
        q: "A client will realise a large gain and has flexibility over timing. What is the simplest planning step?",
        options: [
          "Realise the whole gain in the current year to fix the rate",
          "Consider splitting the disposal across two tax years, so two annual exempt amounts and potentially two sets of unused basic rate band are available — and consider transferring part to a spouse beforehand to add theirs",
          "Delay indefinitely, since gains are removed on death",
          "Realise a loss on another asset regardless of the gains position",
        ],
        correct: 1,
        explain:
          "Both the exempt amount and the band are annual and cannot be carried forward, so spreading a disposal uses more of them. Adding a spouse transfer beforehand doubles the effect again, at no capital gains cost because the transfer is no gain, no loss.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a pension and a savings account as equivalent shelters.", fix: "Only the pension gives relief on entry and reduces adjusted net income." },
    { trap: "Recommending a pension without checking access needs.", fix: "The funds are locked until a minimum age." },
    { trap: "Bunching a disposal into one tax year.", fix: "The annual exempt amount cannot be carried forward — split where possible." },
    { trap: "Advising a loss crystallisation with no gains to absorb it.", fix: "The loss is compulsorily used and may waste the exempt amount." },
  ],
  keyTerms: [
    { term: "Finance cost restriction", def: "The rule giving relief for residential property finance costs as a basic-rate reduction in the tax liability rather than as a deduction from property income." },
    { term: "Use-it-or-lose-it allowance", def: "An annual allowance, such as the capital gains annual exempt amount, that cannot be carried forward if unused." },
  ],
  summary: [
    "Pensions give relief, extend the band and restore tapered allowance — three effects at once.",
    "The residential finance cost restriction materially raised higher-rate landlords' cost of borrowing.",
    "Annual allowances expire, so splitting disposals across tax years is the simplest planning move.",
    "Crystallising a loss only helps where there are gains to absorb it.",
  ],
  knowledgeDiagnostic: [
    { q: "What three things does a pension contribution do for a higher-rate taxpayer?", a: "Gives relief at the marginal rate, extends the basic rate band, and reduces adjusted net income so tapered personal allowance can be restored." },
    { q: "Why does splitting a disposal across two tax years help?", a: "It accesses two annual exempt amounts and potentially two sets of unused basic rate band, neither of which can be carried forward." },
    { q: "When is crystallising a loss before the year end bad advice?", a: "Where there are no gains to absorb it, since the loss is compulsorily set against current gains and can waste the annual exempt amount." },
  ],
  furtherStudy: [
    "ATX-02 covers the personal allowance taper that pension contributions exploit.",
    "ATX-07 covers the loss and exempt amount ordering rules referred to here.",
    "Area C covers whether a particular investment is appropriate for the client.",
  ],
}

const ATX_TREE_25: StudyChapter = {
  paper: "ATX",
  id: "ATX-25",
  number: 25,
  area: "B",
  syllabusRefs: ["B4"],
  title: "Weighing the alternatives",
  minutes: 15,
  intro:
    "Having identified the routes and computed them, the requirement asks which one — and a comparison without a recommendation forfeits the marks the comparison was for.",
  outcomes: [
    "Set out the advantages and disadvantages of each course of action",
    "Weigh tax cost against commercial and personal factors",
    "Reach and justify a recommendation from the client's circumstances",
    "State the conditions and risks attaching to the recommended route",
    "Present the comparison so a client can act on it",
  ],
  sections: [
    {
      id: "structuring",
      heading: "Structuring the comparison",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Answer the question that was asked",
          md: "Where the requirement says **advantages and disadvantages**, give both for each route — an answer listing only the benefits of the recommended option has answered half. Where it says **recommend**, commit to one. Candidates lose marks at both ends: presenting a balanced comparison and declining to choose, or choosing without having shown the alternative was considered.",
        },
        {
          kind: "table",
          caption: "What belongs in each side of the comparison",
          head: ["Dimension", "Questions to answer"],
          rows: [
            ["Total tax", "Across every tax, every party and the whole period — not this year alone"],
            ["Timing", "When each amount falls due; a deferred liability is worth less than an immediate one"],
            ["Certainty", "Does the route depend on a claim, an election, a survival period, or a future condition?"],
            ["Flexibility", "Can it be reversed or adjusted if circumstances change?"],
            ["Control", "Does the client give up ownership, income or influence?"],
            ["Cost and complexity", "Professional fees, filing obligations, ongoing administration"],
            ["Risk", "What happens if the client dies early, the business fails, or the law changes?"],
          ],
        },
        {
          kind: "text",
          md: "The **certainty** row is where tax advice most often goes wrong. A route saving the most tax while depending on the client surviving seven years, the donee retaining the asset, and business property relief still qualifying at death is carrying three conditions — any of which failing removes the saving. The comparison should say so, because a client choosing it should know what they are betting on.",
        },
      ],
      check: {
        q: "Two routes are compared. Route A saves more tax but depends on the client surviving seven years and the donee retaining the business. Route B saves less and is certain. What should the answer do?",
        options: [
          "Recommend Route A because it saves more tax",
          "Recommend on the client's circumstances — quantifying both, stating that Route A's saving is conditional on two events outside the client's control, and letting factors such as age, health and the donee's intentions decide",
          "Recommend Route B because certainty is always preferable",
          "Present both without recommending, since the choice is the client's",
        ],
        correct: 1,
        explain:
          "Neither the larger saving nor the greater certainty wins automatically; the client's circumstances resolve it, which is why the scenario supplies them. Declining to recommend — option 3 — forfeits marks, because the requirement asked for advice rather than a comparison.",
      },
    },
    {
      id: "presenting",
      heading: "Presenting advice a client can use",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The shape of a good answer",
          items: [
            "A short statement of what the client is trying to achieve, so the advice is anchored",
            "Each route, with its total tax cost, its timing, and its conditions",
            "The non-tax consequences that matter to this client",
            "A clear recommendation, with the reason drawn from their circumstances",
            "The actions required — claims, elections, deadlines — and what would change the advice",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The last line is where the marks hide",
          md: "**What would change the advice?** A sentence saying 'if you expect to need the income from these shares, the recommendation changes to…' demonstrates that the adviser understood the decision rather than the computation. It is also honest, because tax advice given on stated facts is only as good as those facts — and stating the dependency protects the adviser as well as informing the client.",
        },
        {
          kind: "text",
          md: "Finally, remember the **format**: Section A asks for a specific output — commonly a letter, memorandum or report to a named recipient — and communication marks are available there. Writing to the client in a register they could actually read, rather than in technical shorthand, is part of what is being assessed.",
        },
      ],
      check: {
        q: "Why should tax advice state what would change the recommendation?",
        options: [
          "To avoid committing to an answer",
          "Because the advice rests on the facts as stated, and identifying the assumptions that drive it shows the adviser understood the decision — while telling the client which change should prompt them to come back",
          "Because the examiner requires a disclaimer",
          "Because the recommendation is always provisional",
        ],
        correct: 1,
        explain:
          "It is the opposite of hedging: the recommendation is still made, but its dependencies are visible. That both informs the client about when to seek further advice and demonstrates the judgement the professional marks are awarded for.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing only the advantages of the preferred route.", fix: "The requirement usually asks for both sides of each option." },
    { trap: "Comparing without recommending.", fix: "Where the verb is 'recommend', commit — and justify from the client's circumstances." },
    { trap: "Ignoring the conditions a route depends on.", fix: "State them; a conditional saving is worth less than a certain one." },
    { trap: "Writing in technical shorthand.", fix: "Section A asks for a specific format and awards communication marks." },
  ],
  keyTerms: [
    { term: "Conditional saving", def: "A tax saving that depends on future events or claims — survival periods, continued ownership, or qualifying status at a later date." },
  ],
  summary: [
    "Give both sides of each route, then commit to a recommendation.",
    "Compare total tax, timing, certainty, flexibility, control, cost and risk.",
    "State the conditions a route depends on and who controls them.",
    "Say what would change the advice, and write in the format requested.",
  ],
  knowledgeDiagnostic: [
    { q: "What is wrong with recommending the route with the lowest tax?", a: "The saving may be conditional on events outside the client's control, and non-tax factors such as control, access and risk may matter more to them." },
    { q: "What does stating 'what would change the advice' achieve?", a: "It makes the assumptions visible, tells the client when to seek further advice, and evidences the judgement professional marks reward." },
    { q: "Where are communication marks available?", a: "In Section A, which asks for a specific output such as a letter, memorandum or report to a named recipient." },
  ],
  furtherStudy: [
    "ATX-22 covers identifying the alternatives being weighed here.",
    "ATX-29 covers assessing suitability for the particular client.",
    "ATX-32 covers the professional skills this presentation demonstrates.",
  ],
}

const ATX_TREE_26: StudyChapter = {
  paper: "ATX",
  id: "ATX-26",
  number: 26,
  area: "B",
  syllabusRefs: ["B5"],
  title: "Statutory obligations and time limits",
  minutes: 15,
  intro:
    "A relief nobody claimed in time is not a relief. This subsection exists because most planning depends on an action with a deadline attached.",
  outcomes: [
    "Identify the statutory obligations arising in a given situation",
    "State the time limits for the principal claims, elections and filings",
    "Explain the implications of failing to comply",
    "Advise on the disclosure obligations that attach to certain arrangements",
    "Build deadlines into the advice rather than treating them as a footnote",
  ],
  sections: [
    {
      id: "obligations",
      heading: "The obligations that arise",
      blocks: [
        {
          kind: "table",
          caption: "What a transaction obliges a client to do",
          head: ["Event", "Obligation"],
          rows: [
            ["Starting to trade or a new source of income", "Notify chargeability within the statutory period"],
            ["Disposing of UK residential property", "A standalone return and payment shortly after completion, separate from the annual return"],
            ["A chargeable lifetime transfer", "An account delivered and tax paid within the statutory period"],
            ["A land transaction", "A return and payment within a short period of the effective date"],
            ["Exceeding the VAT threshold", "Registration within the specified period, with the effective date determined by the rules"],
            ["An error in a filed return", "Correction, with penalties depending on behaviour and on whether disclosure is prompted"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Claims and elections have their own deadlines",
          md: "Gift relief, rollover relief, the disapplication of incorporation relief, group relief, loss relief claims and the transfer of an unused nil rate band all require a **claim or election within a time limit**. Advice recommending one of these is incomplete without the deadline, and a client who misses it loses the relief entirely — which is why 'and the claim must be made by…' should be a standing sentence in the recommendation.",
        },
        {
          kind: "text",
          md: "The consequences of non-compliance scale in a consistent way: **interest** runs from the due date as compensation for late payment, and **penalties** depend on the behaviour behind the failure and on whether disclosure was prompted. So the practical advice on discovering a problem is always the same — quantify it, disclose it unprompted, and pay as much as possible immediately to stop interest running.",
        },
      ],
      check: {
        q: "An adviser recommends a gift of business assets relying on gift relief. What must the advice include beyond the relief itself?",
        options: [
          "Nothing further, as the relief applies automatically",
          "That gift relief requires a joint claim by donor and donee within a time limit, so the donee's cooperation is essential and the deadline must be diarised — without the claim the gain is chargeable in full",
          "That the donee must be a UK resident",
          "That the relief must be approved by HMRC in advance",
        ],
        correct: 1,
        explain:
          "Gift relief is not automatic and it is not the donor's alone to claim, so the advice depends on a third party acting within a deadline. A recommendation omitting that has proposed something the client cannot deliver by themselves.",
      },
    },
    {
      id: "disclosure",
      heading: "Disclosure of arrangements, and the adviser's own obligations",
      blocks: [
        {
          kind: "text",
          md: "Certain arrangements must be **disclosed to HMRC**, generally by the promoter and sometimes by the user, where they carry hallmarks associated with avoidance — confidentiality, a premium fee, or standardised documentation. The examinable points are that the regime exists, that it applies to schemes rather than ordinary planning, and that disclosure does not make an arrangement effective. A disclosed scheme has been notified, not approved.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The general anti-abuse rule sits behind everything",
          md: "Even where each step of an arrangement complies with the letter of the legislation, a **general anti-abuse rule** can counteract arrangements that are abusive — those that cannot reasonably be regarded as a reasonable course of action. Its practical effect on advice is that technical compliance is no longer sufficient to guarantee an outcome, which is precisely why Area C's ethical dimension matters and why 'it works technically' is not a complete answer.",
        },
        {
          kind: "text",
          md: "The **adviser** carries obligations too: to keep the client's affairs confidential, to act with competence, and — where money laundering is suspected — to report without alerting the client. Those duties are examined in Area C, and the connection is worth making here: the compliance framework applies to the adviser as well as to the taxpayer.",
        },
      ],
      check: {
        q: "A client's arrangement has been disclosed to HMRC under the disclosure rules. What does this establish?",
        options: [
          "That HMRC has approved the arrangement",
          "Only that it has been notified — disclosure is not approval, and the arrangement can still be challenged, including under the general anti-abuse rule if it is abusive",
          "That the arrangement is legally effective",
          "That no further tax will be due",
        ],
        correct: 1,
        explain:
          "The disclosure regime is an information-gathering measure, not a clearance procedure. A client told that their scheme has been 'disclosed and accepted' has been misinformed, and correcting that misunderstanding is part of the advice.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending a relief without its claim deadline.", fix: "State the claim, who must make it, and by when." },
    { trap: "Forgetting that gift relief needs the donee's agreement.", fix: "It is a joint claim, so the advice depends on a third party." },
    { trap: "Treating disclosure as approval.", fix: "It notifies HMRC; the arrangement can still be challenged." },
    { trap: "Assuming technical compliance guarantees the outcome.", fix: "The general anti-abuse rule can counteract abusive arrangements." },
  ],
  keyTerms: [
    { term: "Notification of chargeability", def: "The obligation to tell HMRC about a new source of taxable income or gains within a statutory period." },
    { term: "General anti-abuse rule", def: "A provision allowing HMRC to counteract abusive tax arrangements that cannot reasonably be regarded as a reasonable course of action." },
  ],
  summary: [
    "Most planning depends on a claim or election with a deadline — state it every time.",
    "Interest compensates for late payment; penalties reflect behaviour and disclosure.",
    "Disclosure of an arrangement notifies HMRC rather than approving it.",
    "The general anti-abuse rule means technical compliance is not the end of the analysis.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does gift relief depend on more than the donor's decision?", a: "It requires a joint claim with the donee, within a time limit, so the donee's cooperation is essential." },
    { q: "What does disclosure of an arrangement achieve?", a: "It notifies HMRC; it does not approve the arrangement or prevent a challenge." },
    { q: "What is the practical advice on discovering a compliance failure?", a: "Quantify it, disclose unprompted before HMRC asks, and pay as much as possible immediately to stop interest running." },
  ],
  furtherStudy: [
    "ATX-20 covers the self-assessment and penalty framework in more detail.",
    "ATX-31 covers the ethical duties that arise alongside these obligations.",
    "ATX-28 covers the line between planning and abusive arrangements.",
  ],
}

export const ATX_TREE_AREA_B: StudyChapter[] = [ATX_TREE_21, ATX_TREE_22, ATX_TREE_23, ATX_TREE_24, ATX_TREE_25, ATX_TREE_26]
