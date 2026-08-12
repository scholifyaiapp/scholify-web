/*
 * TX-UK Areas E, F and G — corporation tax liabilities, value added tax, and the
 * employability and technology skills the CBE tests.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * No plan here states a rate, band, threshold or limit as a figure to be learned:
 * the exam supplies them on its tax rates and allowances sheet, and they change with
 * every Finance Act. See the header of acca-plans-tx-ab.ts for the reasoning.
 *
 * The recurring error across Area E is applying an INDIVIDUAL's rule to a company.
 * Companies have no personal allowance, no annual exempt amount, no basis periods,
 * and their gains, losses and share matching rules differ. So several plans here
 * exist mainly to keep the two regimes apart.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const TX_PLANS_EFG: ExamPlanMap = {
  /* ── TX-21 · Computing taxable total profits ───────────────── */

  "TX-21::the-proforma": {
    title: "How a company's computation differs from an individual's",
    format: "ot",
    marks: 2,
    requirement:
      "In computing a company's taxable total profits, which of the following is **not** deducted?\n\nA  Trading losses brought forward\nB  Qualifying charitable donations\nC  A personal allowance\nD  Capital allowances",
    plan: [
      {
        step: "Establish what a company does not have",
        detail:
          "No personal allowance, no annual exempt amount for gains, and no basis periods. Those belong to individuals, and importing them is the commonest error in Area E.",
      },
      {
        step: "Build the company proforma",
        detail:
          "Trading profit after capital allowances, plus property income, plus non-trading interest income, plus chargeable gains — giving total profits. Then deduct qualifying charitable donations to reach taxable total profits.",
      },
      {
        step: "Note where losses sit",
        detail:
          "Trading losses brought forward are deducted, so option A is a genuine deduction. Which losses can be set against which profits is the substance of TX-24.",
      },
      {
        step: "Note the accounting period point",
        detail:
          "A company is taxed on its ACCOUNTING PERIOD, not a tax year. So there is no apportionment across tax years and no basis period rules — a structural simplification against the individual.",
      },
    ],
    answer:
      "**C — a personal allowance.**\n\nA company has **no personal allowance**, **no annual exempt amount** for gains, and **no basis periods**. All three belong to individuals, and importing any of them into a corporation tax computation is the commonest error in Area E.\n\nThe company proforma runs: **trading profit** after capital allowances, plus **property income**, plus **non-trading interest** income, plus **chargeable gains** — giving **total profits** — then deduct **qualifying charitable donations** to reach **taxable total profits**.\n\nSo options A, B and D are all genuine deductions: trading losses brought forward, qualifying charitable donations, and capital allowances.\n\nThe **accounting period** point is the structural difference worth holding: a company is taxed on its **accounting period**, not on a tax year, so there is no apportionment across tax years and none of the basis period machinery. Where a period of account **exceeds twelve months**, it is split into two accounting periods — the first of twelve months and the balance.\n\n**Dividends received** from other companies are generally **exempt**, so they do not enter total profits — but they do enter **augmented profits** for the instalment payments test and for marginal relief.",
    earns: [
      "Knowing a company has no personal allowance, exempt amount or basis periods",
      "Knowing exempt dividends stay out of total profits but enter augmented profits",
    ],
    loses: ["Deducting a personal allowance, which no company has"],
  },

  "TX-21::components": {
    title: "Classifying interest as trading or non-trading",
    format: "ot",
    marks: 2,
    requirement:
      "Interest paid by a company on a loan taken out to buy an investment property is:\n\nA  Deducted as a trading expense\nB  A non-trading loan relationship debit, deducted from interest income\nC  Not deductible at all\nD  Deducted from chargeable gains",
    plan: [
      {
        step: "Ask what the borrowing was for",
        detail:
          "That determines the classification. Borrowing for TRADE purposes gives a trading debit deducted in computing trading profit. Borrowing for NON-TRADE purposes gives a non-trading loan relationship debit.",
      },
      {
        step: "Apply it to the facts",
        detail:
          "An investment property is not the company's trade, so the interest is a non-trading debit. It is netted against non-trading credits such as interest received.",
      },
      {
        step: "Note what happens if the debits exceed the credits",
        detail:
          "A net non-trading loan relationship DEFICIT arises, which has its own relief rules — it is not simply added to a trading loss.",
      },
      {
        step: "Note the treatment of interest generally",
        detail:
          "Companies deal with interest on the ACCRUALS basis under the loan relationship rules, whether paid or received. There is no equivalent of an individual's savings income treatment.",
      },
    ],
    answer:
      "**B — a non-trading loan relationship debit, deducted from interest income.**\n\nThe classification turns on **what the borrowing was for**. Borrowing for **trade** purposes gives a **trading debit**, deducted in computing trading profit. Borrowing for **non-trade** purposes — buying an investment property, or shares in another company — gives a **non-trading loan relationship debit**.\n\nNon-trading debits are **netted against non-trading credits**, principally interest received, and the net figure enters total profits.\n\nWhere debits **exceed** credits, a **non-trading loan relationship deficit** arises, and it has its own relief rules rather than being added to a trading loss.\n\nThe general point about interest is worth holding: companies deal with interest on the **accruals** basis under the **loan relationship** rules, whether paid or received. There is no equivalent of an individual's savings income treatment, and no gross-up.\n\n**Pre-trading expenditure** incurred within a set period before trading begins is treated as incurred on the **first day of trading**, so it is relieved rather than lost — which is why a stem giving a date before commencement is testing that rule rather than disallowing the cost.",
    earns: [
      "Classifying on the purpose of the borrowing, and knowing a deficit has its own reliefs",
      "Knowing pre-trading expenditure is treated as incurred on day one of trading",
    ],
    loses: ["Deducting non-trade interest as a trading expense"],
  },

  /* ── TX-22 · The liability and marginal relief ─────────────── */

  "TX-22::rates-and-relief": {
    title: "When marginal relief applies",
    format: "ot",
    marks: 2,
    requirement:
      "Marginal relief from corporation tax applies where a company's augmented profits:\n\nA  Fall below the lower limit\nB  Fall between the lower and upper limits\nC  Exceed the upper limit\nD  Equal its taxable total profits",
    plan: [
      {
        step: "State the three bands",
        detail:
          "Augmented profits BELOW the lower limit: the small profits rate. BETWEEN the limits: the main rate with marginal relief. ABOVE the upper limit: the main rate in full.",
      },
      {
        step: "Note the measure used for the test",
        detail:
          "AUGMENTED profits — taxable total profits plus exempt dividends from non-group companies. But the tax is charged on TAXABLE TOTAL PROFITS, so the two figures do different jobs.",
      },
      {
        step: "See why that distinction matters",
        detail:
          "A company with modest trading profits and large exempt dividends can be pushed into the marginal band or above it by dividends that are never themselves taxed.",
      },
      {
        step: "Note the effect of the relief",
        detail:
          "It tapers the rate between the small profits rate and the main rate, producing a marginal rate above the main rate within the band. So profit in that band is expensive at the margin.",
      },
    ],
    answer:
      "**B — fall between the lower and upper limits.**\n\nThree bands: augmented profits **below** the lower limit attract the **small profits rate**; **between** the limits attract the **main rate with marginal relief**; **above** the upper limit attract the **main rate** in full.\n\nThe measure for the **test** is **augmented profits** — taxable total profits plus **exempt dividends** received from non-group companies. But the **tax is charged on taxable total profits**. The two figures do different jobs, and confusing them is the error the topic is built around.\n\nWhy that matters: a company with modest trading profits and large **exempt dividends** can be pushed into the marginal band, or above the upper limit entirely, by income that is **never itself taxed**.\n\nThe relief **tapers** the effective rate between the small profits rate and the main rate — which means the **marginal rate within the band exceeds the main rate**. So an extra pound of profit in the marginal band is more expensive than an extra pound above the upper limit, and that is a genuine planning point.\n\nThe limits and the relief formula are on the exam's rate sheet.",
    earns: [
      "Separating augmented profits as the test from taxable total profits as the base",
      "Knowing the marginal rate within the band exceeds the main rate",
    ],
    loses: ["Applying the test to taxable total profits, which omits exempt dividends"],
  },

  "TX-22::associates-and-periods": {
    title: "The effect of associated companies and a short period",
    format: "ot",
    marks: 2,
    requirement:
      "Where a company has two associated companies, the lower and upper limits for marginal relief are:\n\nA  Unchanged\nB  Divided by three\nC  Divided by two\nD  Multiplied by three",
    plan: [
      {
        step: "State the rule and count correctly",
        detail:
          "The limits are divided by the number of associated companies PLUS THE COMPANY ITSELF. Two associates means three companies, so divide by three.",
      },
      {
        step: "See why the miscount is so easy",
        detail:
          "Option C divides by the number of ASSOCIATES rather than the number of companies. Reading the stem for how many companies there are in total avoids it.",
      },
      {
        step: "Note the purpose of the rule",
        detail:
          "To prevent a business splitting itself into several companies to obtain the small profits rate several times over. Without it, fragmentation would be a straightforward avoidance route.",
      },
      {
        step: "Note the short period rule alongside it",
        detail:
          "The limits are also time-apportioned for an accounting period shorter than twelve months, so a six-month period gets half the limits. The two adjustments can apply together.",
      },
    ],
    answer:
      "**B — divided by three.**\n\nThe limits are divided by the number of associated companies **plus the company itself**. Two associates means **three** companies in total, so divide by three.\n\nOption C is the miscount, dividing by the number of **associates** rather than the number of **companies** — and reading the stem for the total number of companies rather than the number of associates is what avoids it.\n\nThe **purpose** of the rule is to prevent a business **splitting itself** into several companies to obtain the small profits rate several times over. Without it, fragmentation would be a straightforward avoidance route, which is why the definition of association is drawn to catch companies under common control.\n\nDormant companies are generally **excluded** from the count.\n\nThe **short period** rule applies alongside: the limits are **time-apportioned** for an accounting period shorter than twelve months, so a six-month period gets half. Both adjustments can apply **together** — three associates and a six-month period would give a limit divided by three and then halved, and a question combining them is testing whether both are applied.",
    earns: [
      "Counting the company itself, and knowing dormant companies are excluded",
      "Knowing the associate and short period adjustments can apply together",
    ],
    loses: ["Dividing by the number of associates rather than the number of companies"],
  },

  /* ── TX-23 · Chargeable gains for companies ───────────────── */

  "TX-23::indexation": {
    title: "How indexation allowance works for a company",
    format: "ot",
    marks: 2,
    requirement:
      "Indexation allowance available to a company on a disposal:\n\nA  Is available up to the date of disposal in all cases\nB  Is frozen at December 2017, and cannot create or increase a loss\nC  Is available to individuals as well as companies\nD  Increases an allowable loss",
    plan: [
      {
        step: "State the two limits on indexation",
        detail:
          "It is FROZEN at December 2017, so no allowance accrues after that date however long the asset is held. And it cannot create or increase a LOSS — it can only reduce a gain to nil.",
      },
      {
        step: "Note that individuals do not get it",
        detail:
          "Indexation is a company-only relief. Individuals have the annual exempt amount instead, and confusing the two regimes is the recurring Area E error.",
      },
      {
        step: "Note the practical consequence of the freeze",
        detail:
          "For an asset acquired after December 2017 there is no indexation at all. So the relief is diminishing in importance and a question giving a post-2017 acquisition is testing whether you know that.",
      },
      {
        step: "Note the effect of the no-loss rule",
        detail:
          "Where indexation would turn a gain into a loss, it is restricted so the result is nil. So a company can have a nil outcome that is neither a gain nor an allowable loss.",
      },
    ],
    answer:
      "**B — is frozen at December 2017, and cannot create or increase a loss.**\n\nTwo limits, and both are examined. Indexation is **frozen at December 2017**, so no allowance accrues after that date however long the asset is held — and for an asset **acquired after** December 2017 there is **no indexation at all**, which is what a post-2017 acquisition date in a stem is testing.\n\nAnd it **cannot create or increase a loss**: where indexation would turn a gain into a loss, it is **restricted so the result is nil**. So a company can end up with an outcome that is neither a gain nor an allowable loss — which is a real result rather than a rounding artefact.\n\nIndexation is a **company-only** relief. **Individuals do not get it** — they have the **annual exempt amount** instead, which companies do not — and confusing the two regimes is the recurring error across Area E.\n\nA company's gains are added to **total profits** and taxed at the corporation tax rate, not at a separate capital gains rate. So there is no equivalent of the individual's residential property rate, and no interaction with a basic rate band.",
    earns: [
      "Naming both limits, and knowing there is no indexation on a post-2017 acquisition",
      "Keeping the company and individual gains regimes apart",
    ],
    loses: ["Allowing indexation to create a loss, or extending it to individuals"],
  },

  "TX-23::company-rollover": {
    title: "Rollover relief and capital losses for a company",
    format: "ot",
    marks: 2,
    requirement:
      "A company's capital losses may be set against:\n\nA  Total profits of the same accounting period\nB  Chargeable gains of the same or future accounting periods only\nC  Trading profits\nD  The profits of another group company automatically",
    plan: [
      {
        step: "State the restriction",
        detail:
          "Capital losses can be set only against CHARGEABLE GAINS — of the same period, and then carried forward against future gains indefinitely. They never touch income.",
      },
      {
        step: "Note that they cannot be carried back",
        detail:
          "Unlike a trading loss, a capital loss cannot be carried back. So a company with a large loss and no gains must wait for a future gain, which is a real cash flow consequence.",
      },
      {
        step: "Reject the automatic group option",
        detail:
          "A gains group can ELECT to transfer a gain or loss between members, but nothing happens automatically. The election is what makes group loss matching work.",
      },
      {
        step: "Note rollover relief for companies",
        detail:
          "Available on the disposal of a qualifying business asset where the proceeds are reinvested in a replacement within a window. The gain attaches to the new asset's base cost, deferring rather than exempting it.",
      },
    ],
    answer:
      "**B — chargeable gains of the same or future accounting periods only.**\n\nCapital losses can be set **only against chargeable gains** — of the same period, and then carried forward **indefinitely** against future gains. They **never** touch income, so they cannot reduce trading profit or total profits.\n\nAnd unlike a trading loss they **cannot be carried back**. So a company with a large capital loss and no gains must wait for a future gain to use it, which is a genuine cash flow consequence and worth stating in advice.\n\nOption D overstates the group position: a **gains group** can **elect** to treat a disposal as made by another member, which allows a gain in one company to be matched against a loss in another — but nothing happens **automatically**, and the election is what makes the matching work.\n\n**Rollover relief** is available to companies on the disposal of a **qualifying business asset** where the proceeds are reinvested in a replacement within a window before and after the disposal. The gain attaches to the **new asset's base cost**, so it is **deferred, not exempted** — and where only part of the proceeds is reinvested, the shortfall is chargeable immediately.",
    earns: [
      "Knowing capital losses cannot reduce income and cannot be carried back",
      "Knowing group gain and loss matching requires an election",
    ],
    loses: ["Setting a capital loss against trading or total profits"],
  },

  /* ── TX-24 · Losses for companies ─────────────────────────── */

  "TX-24::trading-losses": {
    title: "The reliefs available for a company's trading loss",
    format: "ot",
    marks: 2,
    requirement:
      "A company's trading loss may be relieved against:\n\nA  Total profits of the same period, then carried back against total profits of the previous 12 months, then carried forward against total profits\nB  Trading profits only\nC  Total profits of future periods only\nD  The profits of the shareholders",
    plan: [
      {
        step: "State the three routes and their order",
        detail:
          "Current period: against TOTAL profits. Carry back: against total profits of the previous twelve months, but only after a current period claim. Carry forward: against total profits of future periods.",
      },
      {
        step: "Note that the loss reaches TOTAL profits, not just trading profits",
        detail:
          "So it can be set against property income, interest income and chargeable gains as well. Option B is the individual-style restriction and is wrong for a company.",
      },
      {
        step: "Note the condition on the carry back",
        detail:
          "A current period claim must be made FIRST, and the carry back is against total profits of the preceding twelve months. It is not available as a free-standing choice.",
      },
      {
        step: "Note the restriction on carried forward losses",
        detail:
          "Carried forward losses can be set against total profits, but relief above a threshold is restricted to a percentage of remaining profits — the loss relief restriction for large companies.",
      },
    ],
    answer:
      "**A — total profits of the same period, then carried back against total profits of the previous 12 months, then carried forward against total profits.**\n\nThe loss reaches **total profits**, not just trading profits — so it can be set against property income, non-trading interest income and chargeable gains as well. Option B applies an individual-style restriction that does not exist for companies.\n\nThe **carry back** is conditional: a **current period claim must be made first**, and the carry back is then against total profits of the **preceding twelve months**. It is not available as a free-standing choice, which is what a stem offering carry back alone is testing.\n\n**Carried forward** losses can also be set against **total profits**, and are flexible — but relief above a threshold is **restricted to a percentage of remaining profits** under the loss relief restriction, so a very large loss cannot wipe out all of a large company's profits in one year.\n\nA **terminal** loss in the final twelve months of trading can be carried back **three** years, latest period first.\n\nAs with individuals, the advice question is which relief gives the best **effective rate** and the best **timing** — and a company facing marginal relief may prefer to keep profits within a particular band.",
    earns: [
      "Knowing the loss reaches total profits and that carry back requires a current period claim first",
      "Naming the carried forward restriction and the three-year terminal carry back",
    ],
    loses: ["Restricting the loss to trading profits, which is the individual's rule"],
  },

  "TX-24::other-losses": {
    title: "How property and capital losses differ from trading losses",
    format: "ot",
    marks: 2,
    requirement:
      "A company's property business loss is:\n\nA  Set against total profits of the same period, then carried forward against total profits\nB  Carried forward against property income only\nC  Not relievable\nD  Set against the shareholders' income",
    plan: [
      {
        step: "Contrast the company rule with the individual rule",
        detail:
          "For a COMPANY a property loss is set against total profits of the same period and then carried forward against total profits. For an INDIVIDUAL it can only go against future property income.",
      },
      {
        step: "Identify option B as the individual's rule",
        detail:
          "That is precisely the individual treatment, offered against a company question. Knowing which regime a stem is in is what decides the answer.",
      },
      {
        step: "Note how flexible the company treatment is",
        detail:
          "A company's property loss is more useful than an individual's, because it reaches total profits rather than being ring-fenced to one income stream.",
      },
      {
        step: "Contrast with the capital loss, which IS ring-fenced",
        detail:
          "A company's capital loss can only go against chargeable gains, current or future. So within one company, property losses are flexible and capital losses are not.",
      },
    ],
    answer:
      "**A — set against total profits of the same period, then carried forward against total profits.**\n\nA **company's** property business loss is set against **total profits** of the same period and then **carried forward against total profits**, which makes it considerably more useful than the individual equivalent.\n\nOption B is precisely the **individual's** rule — an individual's property loss can only be carried forward against **future property income** of the same business — offered against a company question. Recognising which regime the stem is in decides the answer, and it is the recurring test across Area E.\n\nSo within a single company the treatments differ by loss type, and that contrast is worth holding:\n\n**Trading loss** — total profits, current period, carry back twelve months, carry forward.\n**Property loss** — total profits, current period and carry forward.\n**Capital loss** — chargeable gains **only**, current and future, and **no carry back**.\n\nSo property losses are flexible and capital losses are ring-fenced, which affects the order in which a company should use its reliefs when it has more than one kind of loss available.",
    earns: [
      "Distinguishing the company treatment from the individual's ring-fenced rule",
      "Holding the three loss types and their different reach",
    ],
    loses: ["Applying the individual's property loss rule to a company"],
  },

  /* ── TX-25 · Groups ──────────────────────────────────────── */

  "TX-25::group-relief": {
    title: "The 75% group relief group",
    format: "ot",
    marks: 2,
    requirement:
      "For group relief to be available, one company must own, directly or indirectly:\n\nA  At least 50% of the other\nB  At least 75% of the other, or both must be 75% subsidiaries of a third company\nC  100% of the other\nD  Any shareholding at all",
    plan: [
      {
        step: "State the threshold and both routes into the group",
        detail:
          "75%, either directly or indirectly. Two companies also form a group where both are 75% subsidiaries of a third — so sister companies qualify without owning each other.",
      },
      {
        step: "Note how an indirect holding is tested",
        detail:
          "By multiplying the holdings down the chain, so a 75% holding in a company that holds 75% of a third gives an effective 56.25% — which fails the test even though each link is 75%.",
      },
      {
        step: "State what group relief allows",
        detail:
          "The surrender of a CURRENT period trading loss, and certain other amounts, from one group member to another to set against its total profits. Losses brought forward can also be surrendered subject to conditions.",
      },
      {
        step: "Note the corresponding period requirement",
        detail:
          "The claim is limited to the overlapping period where accounting dates differ, apportioning both companies' figures. So a mismatch in year ends restricts the relief.",
      },
    ],
    answer:
      "**B — at least 75% of the other, or both must be 75% subsidiaries of a third company.**\n\nTwo routes into the group: a **direct or indirect 75%** holding, or both companies being **75% subsidiaries of a third** — which is how sister companies qualify without owning each other at all.\n\nAn **indirect** holding is tested by **multiplying down the chain**, and that produces a result candidates find counter-intuitive: a 75% holding in a company that itself holds 75% of a third gives an effective **56.25%**, which **fails** the test even though every individual link is 75%. So a chain of 75% holdings does not create a group all the way down.\n\nGroup relief allows the **surrender of a current period trading loss**, and certain other amounts, from one member to another to set against the claimant's **total profits**. Carried forward losses may also be surrendered, subject to conditions.\n\nThe **corresponding period** requirement limits the claim where accounting dates differ: relief is restricted to the **overlapping period**, apportioning both companies' figures — so a mismatch in year ends reduces the available relief and is a real planning consideration.",
    earns: [
      "Knowing both routes into the group, and multiplying indirect holdings down the chain",
      "Naming the corresponding period restriction where year ends differ",
    ],
    loses: ["Treating a chain of 75% holdings as creating a group beyond the first link"],
  },

  "TX-25::gains-group": {
    title: "What a chargeable gains group allows",
    format: "ot",
    marks: 2,
    requirement:
      "Within a chargeable gains group, assets transferred between members are transferred:\n\nA  At market value, giving rise to a gain\nB  On a no gain no loss basis, so no gain arises on the transfer\nC  At the transferee's choice of value\nD  Only with HMRC approval",
    plan: [
      {
        step: "State the transfer rule",
        detail:
          "Assets pass between gains group members on a NO GAIN NO LOSS basis: the transferee takes over the transferor's base cost, including any indexation to December 2017.",
      },
      {
        step: "See what that enables",
        detail:
          "A group can move an asset to whichever member it suits before an external sale, without triggering tax on the internal transfer. The gain arises only on the eventual disposal outside the group.",
      },
      {
        step: "Note the election that achieves the same result without moving the asset",
        detail:
          "Members may ELECT to treat a disposal as made by another group member, so a gain can be matched against another member's loss without physically transferring anything.",
      },
      {
        step: "Note the difference in the group definition",
        detail:
          "The gains group definition differs from the group relief definition: a 75% holding at each level, but only a 50% effective interest required by the principal company. So the two groups are not the same companies.",
      },
    ],
    answer:
      "**B — on a no gain no loss basis, so no gain arises on the transfer.**\n\nAssets pass between gains group members on a **no gain no loss** basis: the transferee takes over the transferor's **base cost**, including any indexation accrued to December 2017. Nothing is charged on the internal transfer.\n\nWhat that enables is the commercial point: a group can move an asset to **whichever member it suits** before an external sale, and the gain arises only on the eventual disposal **outside** the group.\n\nThe **election** achieves the same result without moving anything: members may elect to treat a disposal as made by **another** group member, so a gain in one company can be matched against a **capital loss** in another. That is how a group uses capital losses that would otherwise be stranded, given they cannot be carried back or set against income.\n\nThe **group definitions differ**, which is examined directly: the **gains** group requires a 75% holding at each level but only a **50% effective interest** for the principal company, whereas **group relief** requires an effective 75%. So the two groups can contain **different companies**, and a question naming both is testing whether you check each definition separately.",
    earns: [
      "Knowing the transferee inherits the base cost, and naming the election as the alternative",
      "Knowing the two group definitions differ, so the groups may not be the same companies",
    ],
    loses: ["Assuming the gains group and the group relief group contain the same companies"],
  },

  /* ── TX-26 · VAT: scope and registration ─────────────────── */

  "TX-26::scope": {
    title: "The three kinds of supply, and what each means for input tax",
    format: "ot",
    marks: 2,
    requirement:
      "A trader making only **exempt** supplies:\n\nA  Must register for VAT and may recover input tax\nB  Cannot register, and cannot recover input tax on purchases\nC  May register voluntarily and recover input tax\nD  Charges VAT at the zero rate",
    plan: [
      {
        step: "Distinguish zero-rated from exempt, since that is the whole topic",
        detail:
          "ZERO-RATED supplies are taxable at 0%, so the trader registers and RECOVERS input tax. EXEMPT supplies are outside the charge, so the trader cannot register in respect of them and cannot recover input tax.",
      },
      {
        step: "See why the difference matters commercially",
        detail:
          "A zero-rated trader charges no output tax and reclaims input tax, so it is in a repayment position. An exempt trader charges no output tax and bears the input tax as a cost.",
      },
      {
        step: "Apply it to the stem",
        detail:
          "Only exempt supplies means no taxable supplies, so no registration and no recovery. The input tax is simply a cost of the business.",
      },
      {
        step: "Note the partial exemption position",
        detail:
          "A trader making BOTH taxable and exempt supplies is partially exempt and must apportion input tax, recovering only the taxable proportion.",
      },
    ],
    answer:
      "**B — cannot register, and cannot recover input tax on purchases.**\n\nThe distinction between **zero-rated** and **exempt** is the whole of this topic, and it is entirely about **input tax recovery**.\n\n**Zero-rated** supplies are **taxable** at 0%: the trader registers, charges no output tax, and **recovers input tax** — so it is typically in a **repayment** position with HMRC, which is a genuine cash flow benefit.\n\n**Exempt** supplies are **outside the charge**: the trader cannot register in respect of them and **cannot recover input tax**, so the input tax becomes a **cost** of the business, embedded in its prices.\n\nSo two traders both charging nothing to their customers can be in opposite positions, and that is what the question tests.\n\nA trader making **both** taxable and exempt supplies is **partially exempt** and must **apportion** input tax, recovering only the taxable proportion — with de minimis rules allowing full recovery where the exempt input tax is small.\n\nInput tax is also **irrecoverable** on certain items regardless of the trader's status: cars with any private use, and business entertaining of anyone other than staff.",
    earns: [
      "Distinguishing zero-rated from exempt by input tax recovery, and naming the cash flow consequence",
      "Knowing input tax on cars and business entertaining is blocked regardless",
    ],
    loses: ["Treating exempt as equivalent to zero-rated, which reverses the recovery position"],
  },

  "TX-26::registration": {
    title: "The two registration tests",
    format: "ot",
    marks: 2,
    requirement:
      "The historic test for compulsory VAT registration looks at taxable turnover in:\n\nA  The next 30 days alone\nB  The previous 12 months, on a rolling basis\nC  The previous tax year\nD  The current accounting period",
    plan: [
      {
        step: "State both tests, because they operate independently",
        detail:
          "HISTORIC: taxable turnover in the previous twelve months on a ROLLING basis exceeds the threshold. FUTURE: turnover in the NEXT 30 DAYS ALONE is expected to exceed it.",
      },
      {
        step: "Note that the historic test is rolling, not annual",
        detail:
          "It is tested at the end of every month against the preceding twelve, so it can be triggered part-way through a year. Option C treats it as an annual test, which delays registration.",
      },
      {
        step: "Note the different notification and registration dates",
        detail:
          "The two tests have DIFFERENT deadlines. The future test operates immediately, because it exists to catch a trader whose turnover will spike before the historic test could ever bite.",
      },
      {
        step: "Note the exception and the voluntary option",
        detail:
          "Registration is not required where supplies are wholly zero-rated and an exception is granted. And a trader below the threshold may register VOLUNTARILY to recover input tax.",
      },
    ],
    answer:
      "**B — the previous 12 months, on a rolling basis.**\n\nTwo tests operate **independently** and either can trigger registration.\n\nThe **historic** test: taxable turnover in the previous **twelve months** exceeds the threshold, tested on a **rolling** basis at the end of **every month** against the preceding twelve. So it can be triggered part-way through a year, and option C — treating it as an annual test — would delay registration and produce a late notification penalty.\n\nThe **future** test: turnover in the **next 30 days alone** is expected to exceed the threshold. It operates **immediately**, because it exists to catch a trader whose turnover will spike before the historic test could ever bite.\n\nThe two have **different notification and registration dates**, both on the exam's rate sheet, and applying the wrong one is a common error.\n\nRegistration is **not required** where supplies are wholly **zero-rated** and an exception is granted. And a trader below the threshold may register **voluntarily** — worth doing where it makes zero-rated or business customers' input tax recoverable, but a cost where customers are private consumers who cannot recover the VAT charged.\n\n**Deregistration** applies where turnover falls below the deregistration threshold.",
    earns: [
      "Knowing the historic test is rolling monthly and the future test looks at 30 days alone",
      "Knowing voluntary registration helps or hurts depending on who the customers are",
    ],
    loses: ["Treating the historic test as annual, which delays registration and attracts a penalty"],
  },

  /* ── TX-27 · Computing the liability and administration ──── */

  "TX-27::computing": {
    title: "When the tax point arises",
    format: "ot",
    marks: 2,
    requirement:
      "The basic tax point for a supply of goods is the date the goods are removed or made available. This is overridden where:\n\nA  An invoice is issued or payment received before that date\nB  The customer requests a different date\nC  The goods are zero-rated\nD  The supplier is on the cash accounting scheme",
    plan: [
      {
        step: "State the basic tax point",
        detail:
          "For goods, the date they are removed or made available to the customer. For services, the date the service is completed.",
      },
      {
        step: "State the two overrides and their direction",
        detail:
          "An EARLIER tax point arises if an invoice is issued or payment received BEFORE the basic tax point. A LATER one arises if an invoice is issued within a short period AFTER it.",
      },
      {
        step: "See why the tax point matters",
        detail:
          "It determines which VAT RETURN PERIOD the supply falls in, and therefore when the output tax must be accounted for. Getting it wrong shifts tax between periods.",
      },
      {
        step: "Note that the cash accounting scheme changes the basis entirely",
        detail:
          "Under it, output tax is accounted for when PAYMENT is received rather than by tax point — which is a cash flow benefit for a trader whose customers pay slowly.",
      },
    ],
    answer:
      "**A — an invoice is issued or payment received before that date.**\n\nThe **basic** tax point for goods is the date they are **removed or made available**; for services, the date the service is **completed**.\n\nTwo overrides, running in **opposite directions**. An **earlier** tax point arises where an invoice is issued or payment received **before** the basic tax point. A **later** one arises where an invoice is issued within a **short period after** it — which is the more common case in practice, since most traders invoice after delivery.\n\nWhy it matters: the tax point determines **which VAT return period** the supply falls in, and therefore when output tax must be accounted for. Getting it wrong shifts tax between periods and can produce a penalty even where the total is right.\n\nOption D describes something different: under the **cash accounting scheme** output tax is accounted for when **payment is received** rather than by reference to the tax point at all — a cash flow benefit for a trader whose customers pay slowly, and it also gives automatic relief for bad debts.\n\nThe other schemes are **annual accounting**, which reduces the number of returns, and the **flat rate scheme**, which computes VAT as a percentage of turnover.",
    earns: [
      "Knowing both overrides and that they run in opposite directions",
      "Distinguishing the tax point from the cash accounting basis",
    ],
    loses: ["Treating the invoice date as always the tax point regardless of timing"],
  },

  "TX-27::administration": {
    title: "How VAT penalties are structured",
    format: "ot",
    marks: 2,
    requirement:
      "Under the VAT penalty regime for late payment, the penalty:\n\nA  Is a fixed amount regardless of delay\nB  Increases with the length of the delay, with no penalty if payment is made within a short initial period\nC  Applies only after twelve months\nD  Is charged instead of interest",
    plan: [
      {
        step: "Identify what the regime keys off",
        detail:
          "The LENGTH of the delay. There is no penalty where payment is made within a short initial period, then a first penalty, then a further penalty accruing while the amount remains unpaid.",
      },
      {
        step: "Note that interest is separate",
        detail:
          "Late payment INTEREST runs in addition to the penalty. Option D treats them as alternatives, and a full answer keeps them distinct.",
      },
      {
        step: "Note the late submission regime",
        detail:
          "Late RETURNS operate on a points system: a point per late submission, with a penalty once a threshold of points is reached, and points expiring after a period of compliance.",
      },
      {
        step: "Note the design intention",
        detail:
          "The initial grace period and the points system are both designed to penalise persistent rather than occasional failure — so a single late payment corrected quickly costs interest but no penalty.",
      },
    ],
    answer:
      "**B — increases with the length of the delay, with no penalty if payment is made within a short initial period.**\n\nThe regime keys off the **length of the delay**: no penalty where payment is made within a short initial period, then a **first penalty**, then a **further penalty accruing daily** while the amount remains unpaid.\n\n**Interest is separate** and runs **in addition** to the penalty, so option D is wrong to treat them as alternatives — and a full answer keeps the two apart, because interest compensates for late payment while the penalty sanctions it.\n\nThe **late submission** regime works differently and is examined alongside: a **points** system, with a point for each late return, a **penalty once a points threshold is reached**, and points **expiring** after a period of compliance.\n\nThe **design intention** unifies both: the initial grace period and the points system exist to penalise **persistent** rather than occasional failure. So a single late payment corrected quickly costs interest but no penalty, and that is deliberate — which is the practical advice to give a client who has missed one deadline.\n\nReturns are normally filed and paid **quarterly**, one month and seven days after the period end, and records must be kept for a specified period.",
    earns: [
      "Knowing interest and penalties run in addition, not as alternatives",
      "Knowing both regimes target persistent rather than occasional failure",
    ],
    loses: ["Treating the penalty as replacing interest, or as a fixed amount"],
  },

  /* ── TX-28 · VAT: overseas aspects ───────────────────────── */

  "TX-28::goods-and-services": {
    title: "How the reverse charge works",
    format: "ot",
    marks: 2,
    requirement:
      "A UK VAT-registered business receives services from an overseas supplier. Under the reverse charge, the UK business:\n\nA  Pays VAT to the overseas supplier\nB  Accounts for output tax on the value of the service, and recovers it as input tax where recoverable\nC  Ignores the transaction for VAT\nD  Charges VAT to its own customers only",
    plan: [
      {
        step: "State the mechanism",
        detail:
          "The CUSTOMER accounts for the VAT instead of the supplier. It charges itself output tax on the value of the service and recovers the same amount as input tax where recoverable.",
      },
      {
        step: "Note the effect on a fully taxable business",
        detail:
          "Output tax and input tax cancel, so the net VAT effect is NIL. The entries still have to be made, but nothing is paid.",
      },
      {
        step: "Note the effect on a partially exempt business",
        detail:
          "The output tax is charged in full but only part of the input tax is recoverable, so a real cost arises. That is where the reverse charge actually bites.",
      },
      {
        step: "See why the mechanism exists",
        detail:
          "It removes the advantage of buying services from a supplier outside the UK VAT system. Without it, an exempt business could source services VAT-free from overseas.",
      },
    ],
    answer:
      "**B — accounts for output tax on the value of the service, and recovers it as input tax where recoverable.**\n\nThe **customer** accounts for the VAT instead of the supplier: it charges **itself** output tax on the value of the service and recovers the same amount as **input tax where recoverable**.\n\nFor a **fully taxable** business the two cancel, so the **net VAT effect is nil** — the entries must still be made, but nothing is paid. That is why the mechanism looks pointless until the second case.\n\nFor a **partially exempt** business the output tax is charged **in full** but only **part** of the input tax is recoverable, so a **real cost** arises. That is where the reverse charge actually bites, and it is the case an exam question is usually about.\n\nWhich reveals **why the mechanism exists**: it removes the advantage of buying services from a supplier **outside** the UK VAT system. Without it, an exempt or partially exempt business could source services VAT-free from overseas and undercut a domestic supplier.\n\nFor **goods**, exports outside the UK are generally **zero-rated**, and **imports** are subject to VAT with postponed accounting available so that import VAT is accounted for on the return rather than paid at the border.",
    earns: [
      "Knowing the effect is nil for a fully taxable business but a real cost for a partially exempt one",
      "Explaining why the mechanism exists — removing the overseas sourcing advantage",
    ],
    loses: ["Treating the reverse charge as always cost-neutral, which misses the point of it"],
  },

  /* ── TX-29 · CBE technique ───────────────────────────────── */

  "TX-29::layout": {
    title: "Using the rate sheet and laying out a computation",
    format: "ot",
    marks: 2,
    requirement:
      "In a TX constructed response, the most effective way to present an income tax computation is to:\n\nA  Show only the final tax liability\nB  Use a labelled proforma with each source of income on its own line, showing nil entries and cross-referenced workings\nC  Describe the computation in prose\nD  Show every possible calculation in case one is relevant",
    plan: [
      {
        step: "Understand how marks are awarded",
        detail:
          "A mark or half mark per correct entry in the proforma, plus method marks for workings. So the proforma IS the answer, and each line is an opportunity to score.",
      },
      {
        step: "Note why nil entries earn marks",
        detail:
          "Showing an income source at nil, or an exempt item excluded with a note, demonstrates that it was considered. Omitting it silently earns nothing and looks like an oversight.",
      },
      {
        step: "Note the value of cross-referencing",
        detail:
          "Put a working out separately and reference it from the proforma line. The marker can then follow the method and award it even where the arithmetic is wrong.",
      },
      {
        step: "Note the discipline on the rate sheet",
        detail:
          "Every rate, band and allowance is provided. Reaching for the sheet rather than memory avoids using last year's figures, and stating which figure was used makes the answer checkable.",
      },
    ],
    answer:
      "**B — use a labelled proforma with each source of income on its own line, showing nil entries and cross-referenced workings.**\n\nMarks are awarded **per entry** — a mark or half mark for each correct line — plus **method marks** for workings. So the proforma **is** the answer, and every line is an opportunity to score rather than presentation around a final figure.\n\n**Nil entries earn marks.** Showing an income source at nil, or an exempt item excluded with a brief note, demonstrates it was **considered**. Omitting it silently earns nothing and reads as an oversight — so the safest answer includes lines it does not need.\n\n**Cross-referencing** protects the method marks: put a working out separately and reference it from the proforma line, so the marker can follow what you did and credit it even where the arithmetic goes wrong.\n\nOn the **rate sheet**: every rate, band, allowance and threshold is provided. Reaching for the sheet rather than memory avoids using last year's figures — a real risk, because a stale rate produces a confidently wrong answer — and stating which figure was used makes the answer checkable.\n\nOption A forfeits every entry mark, and option D wastes time on computations that earn nothing.",
    earns: [
      "Knowing marks are per entry, so nil lines and exempt items are worth showing",
      "Cross-referencing workings so method marks survive an arithmetic error",
    ],
    loses: ["Presenting only the final liability, which forfeits every entry mark"],
  },

  "TX-29::time-and-answers": {
    title: "Managing the clock and writing a recommendation",
    format: "ot",
    marks: 2,
    requirement:
      "A TX question asks you to advise which of two loss reliefs a client should claim. The best answer:\n\nA  Computes both options and stops\nB  Computes both, compares the effective rate of relief and the timing, and recommends one with reasons\nC  Recommends one without any computation\nD  Explains the law on loss relief in general terms",
    plan: [
      {
        step: "Read the requirement verb",
        detail:
          "ADVISE. That requires a recommendation, so an answer without one has not done what was asked however good the computation.",
      },
      {
        step: "Identify the two things a recommendation must compare",
        detail:
          "The effective RATE of relief obtained — a loss relieved against income covered by the personal allowance is relieved at nil — and the TIMING, because cash now may matter more than a higher rate later.",
      },
      {
        step: "Note why computation alone fails",
        detail:
          "Option A produces the figures and leaves the client to decide. The advice marks are for the conclusion, and they are typically the larger half on this kind of question.",
      },
      {
        step: "Note why a recommendation without computation also fails",
        detail:
          "Option C asserts a conclusion with nothing supporting it. The recommendation must rest on the figures, so both halves are required.",
      },
    ],
    answer:
      "**B — computes both, compares the effective rate of relief and the timing, and recommends one with reasons.**\n\nThe requirement verb is **advise**, which requires a **recommendation**. An answer without one has not done what was asked however accurate the computation.\n\nA recommendation must compare two things. The **effective rate of relief** — a loss relieved against income already covered by the personal allowance is relieved at **nil**, so speed can be worthless. And the **timing**, because cash now may matter more to a client than a higher rate of relief later.\n\nBoth failures are represented in the options. **Computation alone** (A) produces figures and leaves the client to decide, forfeiting advice marks that are typically the larger half of the question. A **recommendation with no computation** (C) asserts a conclusion with nothing supporting it.\n\nOn the clock: TX is a three-hour paper worth 100 marks, so roughly **1.8 minutes per mark**. Move on when a question's time is used, because marks are hardest to earn at the end of one question and easiest at the start of the next — and **attempt every requirement**, since an unattempted advice section scores zero while three sentences on it will not.",
    earns: [
      "Answering the verb, and comparing both the effective rate and the timing",
      "Knowing the advice marks are usually the larger half on a \"which relief\" question",
    ],
    loses: ["Computing every option without recommending one, which is the commonest failure on this paper"],
  },
}
