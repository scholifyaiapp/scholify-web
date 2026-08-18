import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · Area A, part three — the capital gains business reliefs (A2), and
 * inheritance tax (A3).
 *
 *   ATX-09  Business reliefs and disposing of a business (A2 reliefs)
 *   ATX-10  Closely related persons, trusts and CGT      (A2)
 *   ATX-11  Inheritance tax: scope and the two charges   (A3 scope)
 *   ATX-12  Valuation, and business and agricultural relief (A3 valuation, reliefs)
 *   ATX-13  Inheritance tax and trusts                   (A3 trusts)
 *   ATX-14  Overseas aspects and administration          (A3 overseas, admin)
 *
 * See acca-study-atx-tree-a.ts for the Finance Act 2025 and rates rules that
 * govern this whole paper.
 */

const ATX_TREE_09: StudyChapter = {
  paper: "ATX",
  id: "ATX-09",
  number: 9,
  area: "A",
  syllabusRefs: ["A2(c)"],
  title: "Business reliefs and disposing of a business",
  minutes: 19,
  intro:
    "Four reliefs compete for the same disposal, and they do different things. Two defer the gain, one reduces the rate, and choosing between them is most of what ATX asks about capital gains.",
  outcomes: [
    "Distinguish reliefs that defer a gain from those that reduce the rate",
    "State the conditions and claim requirements for each business relief",
    "Apply gift relief, including its restriction where the company holds non-business assets",
    "Apply rollover relief and incorporation relief correctly",
    "Recommend between the reliefs for a specific client and disposal",
  ],
  sections: [
    {
      id: "defer-or-reduce",
      heading: "Defer or reduce — the distinction that organises everything",
      blocks: [
        {
          kind: "table",
          caption: "The four reliefs",
          head: ["Relief", "Effect", "Applies to", "Claim"],
          rows: [
            ["Business asset disposal relief", "Reduces the RATE on qualifying gains, up to a lifetime limit", "Disposal of a business, or shares in a personal trading company", "Claim required, with a time limit"],
            ["Gift relief", "DEFERS the gain by reducing the donee's base cost", "Gifts of business assets and certain shares", "Joint claim by donor and donee"],
            ["Rollover relief", "DEFERS the gain against the cost of a replacement asset", "Qualifying business assets replaced within the time window", "Claim required; provisional claim possible"],
            ["Incorporation relief", "DEFERS the gain into the shares received", "Transfer of a business as a going concern to a company", "Automatic if conditions met; can be disapplied by election"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Deferral is not exemption",
          md: "Gift, rollover and incorporation relief all **postpone** the charge — they do not remove it. The gain reappears when the donee sells, when the replacement asset is sold without further replacement, or when the shares are sold. So advice recommending deferral must say **when the deferred gain will crystallise and on whom**. A client who thinks a gain has been eliminated when it has merely been passed to their child has been badly advised.",
        },
        {
          kind: "text",
          md: "Business asset disposal relief is different in kind: it **reduces the rate** on the gain rather than deferring it, subject to a lifetime limit given on the rates sheet. Because the limit is a lifetime one, using it on a small disposal now may waste it for a larger disposal later — which is itself a planning point worth raising.",
        },
      ],
      check: {
        q: "A client gifts shares in their trading company to their son and claims gift relief. What should the advice make clear?",
        options: [
          "The gain has been eliminated",
          "The gain is deferred, not removed — the son's base cost is reduced by the held-over gain, so it crystallises on his eventual disposal, and he should understand he has inherited a latent tax liability",
          "The son will pay the tax immediately",
          "Gift relief also removes the inheritance tax consequence",
        ],
        correct: 1,
        explain:
          "Gift relief moves the gain to the donee by reducing their base cost, so the family's total exposure is unchanged and the liability now sits with the son. Explaining who ultimately bears it — and that a joint claim is required — is the substance of the advice, and option 3 misses that the gift is separately a transfer for inheritance tax.",
      },
    },
    {
      id: "conditions",
      heading: "The conditions, and where they bite",
      blocks: [
        {
          kind: "table",
          caption: "What each relief actually requires",
          head: ["Relief", "The conditions to check"],
          rows: [
            ["Business asset disposal relief", "A qualifying period of ownership; for shares, a minimum shareholding, officer or employee status, and the company being a trading company"],
            ["Gift relief", "A business asset, or shares in an unquoted trading company, or a personal company; joint claim; restricted where the company holds non-business assets"],
            ["Rollover relief", "Both old and new assets in qualifying classes and used in the trade; reinvestment within the window running from before to after the disposal"],
            ["Incorporation relief", "The whole business transferred as a going concern — every asset other than cash may be included — with shares forming all or part of the consideration"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two restrictions that catch candidates",
          md: "**Gift relief is restricted** where the company holds non-business assets — the held-over gain is scaled by the proportion of chargeable business assets to total chargeable assets, so a company sitting on a large investment portfolio gives only partial relief. And **rollover relief is restricted** where not all the proceeds are reinvested: the shortfall is chargeable immediately, up to the amount of the gain. Both restrictions are routinely missed, and both change the answer materially.",
        },
        {
          kind: "text",
          md: "**Incorporation relief** carries a specific trap: it is **automatic** where the conditions are met, which is usually helpful and sometimes not. A client who wants to crystallise a gain — to use business asset disposal relief, a loss, or the annual exempt amount — must **elect to disapply** it. Knowing that the default runs the other way, and that an election exists, is exactly the kind of detail that distinguishes an ATX answer.",
        },
        {
          kind: "example",
          title: "Choosing between the reliefs",
          scenario:
            "A client aged 60 is retiring and transferring their trading business to their daughter, who will run it. They have made no previous claims. Assume for illustration a gain of £500,000.",
          steps: [
            { label: "Option one — gift relief", detail: "The whole gain is held over. The client pays nothing now; the daughter's base cost falls by £500,000 and she bears the gain on any future sale." },
            { label: "Option two — business asset disposal relief", detail: "The client pays tax now at the reduced rate on £500,000, within the lifetime limit. The daughter takes the shares at full market value, with no latent liability." },
            { label: "The comparison", detail: "Gift relief defers cash outflow but transfers the burden; business asset disposal relief costs cash now at a reduced rate and gives the daughter a clean base cost." },
            { label: "The judgement", detail: "If the daughter intends to keep the business long term, gift relief is usually preferred. If she may sell soon, paying now at the reduced rate can be cheaper for the family overall — and the client's own need for cash is decisive." },
          ],
          result:
            "There is no universally right answer, which is why the requirement asks for a recommendation reasoned from the client's circumstances rather than for the relief with the lower immediate tax.",
        },
      ],
      check: {
        q: "A client transfers their business to a company and wants to crystallise the gain to use business asset disposal relief. What must they do?",
        options: [
          "Nothing — incorporation relief only applies if claimed",
          "Elect to disapply incorporation relief, because it applies automatically where the conditions are met and would otherwise defer the gain into the shares",
          "Transfer the business without the goodwill",
          "Claim gift relief instead",
        ],
        correct: 1,
        explain:
          "Incorporation relief is the exception to the general pattern of claims: it operates by default. A client wanting to use a lower rate now, or to absorb a loss or the annual exempt amount, must actively disapply it — and missing that produces advice that quietly achieves the opposite of what the client wanted.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing deferral reliefs as removing the gain.", fix: "Say when the deferred gain crystallises and who will bear it." },
    { trap: "Giving full gift relief where the company holds investments.", fix: "The held-over gain is restricted by the business-asset proportion." },
    { trap: "Giving full rollover relief where proceeds are not fully reinvested.", fix: "The shortfall is chargeable immediately, up to the gain." },
    { trap: "Assuming incorporation relief must be claimed.", fix: "It is automatic; an election is needed to disapply it." },
  ],
  keyTerms: [
    { term: "Business asset disposal relief", def: "A reduced rate of capital gains tax on qualifying business disposals, subject to a lifetime limit." },
    { term: "Gift relief", def: "Deferral of a gain on a gift of business assets by reducing the donee's base cost, requiring a joint claim." },
    { term: "Rollover relief", def: "Deferral of a gain against the cost of a qualifying replacement business asset acquired within the reinvestment window." },
    { term: "Incorporation relief", def: "Automatic deferral of gains on transferring a business as a going concern to a company in exchange for shares, unless disapplied by election." },
  ],
  summary: [
    "Two reliefs defer and one reduces the rate — establish which the client actually needs.",
    "Deferral moves the gain to the donee, the replacement asset or the shares; say who bears it.",
    "Gift relief is restricted by non-business assets; rollover by proceeds not reinvested.",
    "Incorporation relief applies automatically and must be disapplied by election.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference in kind between business asset disposal relief and gift relief?", a: "The first reduces the rate on a gain charged now; the second defers the gain to the donee by reducing their base cost." },
    { q: "When is gift relief restricted?", a: "Where the company holds non-business assets, so the held-over gain is scaled by the proportion of chargeable business assets." },
    { q: "Why does incorporation relief need an election?", a: "It applies automatically, so a client wanting to crystallise the gain — to use a reduced rate, a loss or the exempt amount — must disapply it." },
  ],
  furtherStudy: [
    "ATX-12 covers business property relief, the inheritance tax counterpart with different conditions.",
    "Area B covers the interaction of these reliefs with inheritance tax on the same gift.",
    "Area C covers the timing of disposals as a planning measure.",
  ],
}

const ATX_TREE_10: StudyChapter = {
  paper: "ATX",
  id: "ATX-10",
  number: 10,
  area: "A",
  syllabusRefs: ["A2(d)"],
  title: "Closely related persons, trusts and capital gains tax",
  minutes: 15,
  intro:
    "Who owns an asset, and who is treated as owning it, are different questions. Spouses, connected persons and trusts each get their own answer.",
  outcomes: [
    "Apply the no gain, no loss rule to spouses and civil partners",
    "Plan a disposal across two spouses to use both sets of allowances and bands",
    "Apply the market value and loss restriction rules to connected persons",
    "Explain the capital gains treatment of transfers into and out of a trust",
    "Recognise where a trust transfer engages inheritance tax simultaneously",
  ],
  sections: [
    {
      id: "spouses",
      heading: "Spouses and civil partners",
      blocks: [
        {
          kind: "text",
          md: "Transfers between spouses and civil partners living together are **no gain, no loss**: the transferee takes over the transferor's original cost, so no gain arises on the transfer and the whole accrued gain passes across with the asset.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The standard planning move, and its limits",
          md: "Transferring a share of an asset to a spouse before sale means the eventual gain is split between two people, so **two annual exempt amounts** and, where relevant, **two sets of unused basic rate band** are available. It is simple, effective and frequently examined. Its limits: the transfer must be genuine and outright — a transfer with strings attached is ineffective — the couple must be living together, and the spouse receiving the asset genuinely owns it thereafter, which some clients dislike more than they expect.",
        },
        {
          kind: "text",
          md: "A second use is **loss utilisation**: transferring a standing-loss asset to a spouse who has gains lets the loss be realised against those gains. And the reverse — transferring a standing-gain asset to a spouse with unused losses or allowances — works for the same reason. Both are legitimate, and both should be presented with the non-tax consequence of genuinely giving away the asset.",
        },
      ],
      check: {
        q: "A client will realise a large gain on shares and their spouse has no gains and an unused basic rate band. What should be considered?",
        options: [
          "Nothing, since the gain belongs to the client",
          "Transferring part of the holding to the spouse before sale — the transfer is no gain, no loss, and the eventual gain is then split, using both annual exempt amounts and the spouse's unused basic rate band",
          "Gifting the shares to a trust",
          "Delaying the sale until the following tax year only",
        ],
        correct: 1,
        explain:
          "The no gain, no loss rule makes the transfer itself costless, and splitting the disposal doubles the exempt amounts and accesses the spouse's lower rate band. The advice should add that the transfer must be outright and that the spouse genuinely owns the shares afterwards.",
      },
    },
    {
      id: "trusts-cgt",
      heading: "Transfers into and out of a trust",
      blocks: [
        {
          kind: "table",
          caption: "The capital gains position at each stage",
          head: ["Event", "Capital gains treatment"],
          rows: [
            ["Settlor transfers assets into trust", "A disposal at market value by the settlor; gift relief may be available"],
            ["Trustees dispose of a trust asset", "Chargeable on the trustees, with a reduced annual exempt amount"],
            ["Assets appointed out to a beneficiary", "A disposal by the trustees at market value; gift relief may be available"],
            ["Beneficiary becomes absolutely entitled", "Deemed disposal by the trustees at market value"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Gift relief is wider for trusts",
          md: "On a transfer **into** a trust that is immediately chargeable to inheritance tax, gift relief is available on **any asset**, not only business assets — because the inheritance tax charge arises at that point instead. That interaction is the point to make: the two taxes are coordinated so that the same transfer is not fully charged under both, and identifying which one bites is the examinable step.",
        },
        {
          kind: "text",
          md: "The trustees' **annual exempt amount is reduced** compared with an individual's, and is divided where a settlor has created several trusts — an anti-fragmentation rule. So creating multiple trusts to multiply exempt amounts does not work, and a scenario proposing it is inviting you to say so.",
        },
      ],
      check: {
        q: "A client transfers a portfolio of quoted investments — not business assets — into a discretionary trust. Is gift relief available on the gain?",
        options: [
          "No, because gift relief only applies to business assets",
          "Yes — a transfer into a trust that is immediately chargeable to inheritance tax attracts gift relief on any asset, because the inheritance tax charge arises at that point instead",
          "No, because quoted shares are excluded from all reliefs",
          "Only if the trust is an interest in possession trust",
        ],
        correct: 1,
        explain:
          "The business-asset restriction on gift relief is lifted where the transfer is immediately chargeable to inheritance tax, because the two taxes are coordinated to avoid a double charge on the same event. Recognising which tax bites, and when, is the interaction the requirement is testing.",
      },
    },
  ],
  examTraps: [
    { trap: "Charging a gain on a spouse transfer.", fix: "It is no gain, no loss; the accrued gain passes with the asset." },
    { trap: "Recommending a spouse transfer without the non-tax consequence.", fix: "The transfer must be outright — the spouse genuinely owns the asset." },
    { trap: "Restricting gift relief to business assets on a transfer into trust.", fix: "Any asset qualifies where the transfer is immediately chargeable to inheritance tax." },
    { trap: "Proposing several trusts to multiply exempt amounts.", fix: "The trustees' exempt amount is divided between trusts made by the same settlor." },
  ],
  keyTerms: [
    { term: "No gain, no loss", def: "The treatment of transfers between spouses or civil partners living together, under which the transferee inherits the original cost." },
    { term: "Immediately chargeable transfer", def: "A lifetime transfer, typically into a trust, on which inheritance tax is charged at once rather than only if the donor dies within seven years." },
  ],
  summary: [
    "Spouse transfers are costless and allow a gain to be split across two people's allowances and bands.",
    "The transfer must be genuine and outright, and the spouse then owns the asset.",
    "Transfers into and out of a trust are disposals at market value.",
    "Gift relief widens to any asset where inheritance tax bites immediately on the same transfer.",
  ],
  knowledgeDiagnostic: [
    { q: "What does a spouse receive along with a transferred asset?", a: "The transferor's original base cost, and therefore the whole accrued gain." },
    { q: "Why is gift relief available on non-business assets going into a discretionary trust?", a: "Because the transfer is immediately chargeable to inheritance tax, so the two taxes are coordinated to avoid charging the same event twice." },
    { q: "Why does creating several trusts not multiply the exempt amount?", a: "The trustees' annual exempt amount is divided between trusts created by the same settlor." },
  ],
  furtherStudy: [
    "ATX-13 covers the inheritance tax treatment of the same trust transfers.",
    "ATX-09 covers gift relief in its business-asset form.",
    "ATX-07 covers the connected-person rules this chapter builds on.",
  ],
}

const ATX_TREE_11: StudyChapter = {
  paper: "ATX",
  id: "ATX-11",
  number: 11,
  area: "A",
  syllabusRefs: ["A3(a)"],
  title: "Inheritance tax: scope and the two charges",
  minutes: 18,
  intro:
    "Inheritance tax is charged twice on the same lifetime gift under different conditions, and the seven-year clock connects them. Get the two charges straight and the rest follows.",
  outcomes: [
    "Distinguish potentially exempt transfers from immediately chargeable transfers",
    "Compute the lifetime charge and the additional charge on death",
    "Apply the cumulation principle and the seven-year rule",
    "Apply the exemptions available on lifetime giving",
    "Compute the death estate, including the residence nil rate band's conditions",
  ],
  sections: [
    {
      id: "two-charges",
      heading: "Two charges, one gift",
      blocks: [
        {
          kind: "table",
          caption: "The two kinds of lifetime transfer",
          head: ["", "Potentially exempt transfer", "Immediately chargeable transfer"],
          rows: [
            ["Typical recipient", "An individual", "A trust"],
            ["Charge when made", "None", "Charged at the lifetime rate on the excess over the available nil rate band"],
            ["If donor survives seven years", "Becomes exempt entirely", "No further charge"],
            ["If donor dies within seven years", "Becomes chargeable at the death rate, with taper where more than three years have passed", "Recomputed at the death rate; credit for the lifetime tax already paid"],
            ["Who pays", "The donee, on death", "The donor by default, which grosses up the transfer"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Grossing up is the detail that separates candidates",
          md: "Where the **donor** pays the lifetime tax on an immediately chargeable transfer, the tax is itself a further loss to the estate, so the transfer must be **grossed up**. Where the trustees pay, no grossing up applies. The question will tell you who bears it, and getting this wrong changes every subsequent figure because the grossed-up amount enters cumulation.",
        },
        {
          kind: "text",
          md: "**Cumulation** is the mechanism connecting the transfers. Each chargeable transfer uses the nil rate band, and in computing any transfer you look back **seven years** to see how much band earlier transfers have already consumed. So the nil rate band is a rolling seven-year allowance rather than a once-in-a-lifetime one — which is why spacing gifts more than seven years apart is the foundation of inheritance tax planning.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Taper relief reduces the tax, not the transfer",
          md: "Where death occurs between three and seven years after a potentially exempt transfer, taper relief reduces the **tax payable** on it — it does not reduce the value transferred, and it does not restore nil rate band. Candidates routinely apply the taper percentage to the transfer value, which understates everything downstream. And taper cannot create a repayment of lifetime tax already paid.",
        },
      ],
      check: {
        q: "A donor makes a gift to a trust and agrees to pay the lifetime inheritance tax personally. What does this require in the computation?",
        options: [
          "Nothing — the tax is simply computed on the transfer value",
          "Grossing up, because the tax the donor pays is a further reduction in their estate, so the chargeable transfer is the gift plus the tax on it — and the grossed-up figure is what enters cumulation",
          "The transfer becomes potentially exempt",
          "The tax is charged at the death rate instead",
        ],
        correct: 1,
        explain:
          "Inheritance tax is charged on the loss to the donor's estate, and paying the tax is itself part of that loss. Grossing up captures this, and because the grossed-up amount carries forward into cumulation, an error here propagates through every later transfer and the death estate.",
      },
    },
    {
      id: "exemptions-estate",
      heading: "Exemptions and the death estate",
      blocks: [
        {
          kind: "table",
          caption: "Lifetime exemptions worth knowing",
          head: ["Exemption", "Point to remember"],
          rows: [
            ["Annual exemption", "Can be carried forward one year only, and the current year's is used first"],
            ["Small gifts", "Per recipient, and cannot be combined with the annual exemption for the same gift"],
            ["Marriage or civil partnership", "The amount depends on the relationship of the donor to the couple"],
            ["Normal expenditure out of income", "Fully exempt if habitual, from income, and leaving the donor's standard of living intact — unlimited in amount"],
            ["Spouse or civil partner", "Fully exempt, whether in life or on death"],
            ["Charity", "Exempt, and a large enough legacy reduces the rate on the rest of the estate"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The normal expenditure exemption is the most under-used",
          md: "It is **unlimited** provided the gifts are habitual, made from income rather than capital, and leave the donor able to maintain their usual standard of living. For a client with substantial surplus income it is far more powerful than the annual exemption, and it requires evidence — a pattern of gifts and a record of income and expenditure. Recommending it, and recommending that the client document it, is a strong planning point.",
        },
        {
          kind: "text",
          md: "The **death estate** brings in all assets at market value, less debts and funeral expenses, less exemptions. Two bands then apply: the nil rate band reduced by chargeable transfers in the previous seven years, and the **residence nil rate band**, which is conditional — it needs a qualifying residence passing to direct descendants, and it is tapered away where the estate exceeds a threshold on the rates sheet.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Transferable bands",
          md: "Any unused proportion of a deceased spouse's nil rate band and residence nil rate band can be claimed by the survivor's estate. It transfers as a **percentage**, not an amount, so it is worth more if bands have risen since the first death. A claim is required and it has a time limit — and a scenario mentioning a predeceased spouse is almost always testing this.",
        },
      ],
      check: {
        q: "A client with substantial surplus income wants to reduce their estate. Which exemption is likely to be most valuable?",
        options: [
          "The annual exemption, used every year",
          "Normal expenditure out of income — it is unlimited in amount provided the gifts are habitual, paid from income, and leave the donor's standard of living unaffected, so it far exceeds the fixed exemptions",
          "The small gifts exemption to many recipients",
          "The marriage exemption",
        ],
        correct: 1,
        explain:
          "The fixed exemptions are capped and modest; normal expenditure out of income has no ceiling. Its conditions are evidential rather than numerical, which is why the practical advice is to establish a regular pattern and keep records of income and outgoings to support the claim.",
      },
    },
  ],
  examTraps: [
    { trap: "Failing to gross up where the donor pays the lifetime tax.", fix: "The tax is part of the loss to the estate and enters cumulation." },
    { trap: "Applying taper relief to the transfer value.", fix: "It reduces the tax payable only, and cannot repay lifetime tax." },
    { trap: "Forgetting to look back seven years for cumulation.", fix: "The nil rate band is a rolling seven-year allowance." },
    { trap: "Assuming the residence nil rate band applies.", fix: "It needs a qualifying residence passing to direct descendants and is tapered on large estates." },
  ],
  keyTerms: [
    { term: "Cumulation", def: "The principle that chargeable transfers in the previous seven years reduce the nil rate band available to the current transfer." },
    { term: "Grossing up", def: "Increasing a chargeable transfer to reflect inheritance tax borne by the donor, since that tax is a further loss to their estate." },
    { term: "Taper relief", def: "A reduction in the tax payable on a transfer where the donor survives more than three but fewer than seven years." },
    { term: "Normal expenditure out of income", def: "An unlimited exemption for habitual gifts made from income that leave the donor's standard of living unaffected." },
  ],
  summary: [
    "Potentially exempt transfers are charged only if death follows within seven years; transfers into trust are charged at once.",
    "Gross up where the donor bears the lifetime tax, and carry the grossed-up figure into cumulation.",
    "Taper reduces the tax, never the transfer value.",
    "Normal expenditure out of income is unlimited and under-used; transferable bands pass as percentages.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is the nil rate band described as a rolling allowance?", a: "Each transfer looks back seven years to see how much band earlier transfers consumed, so band is restored as gifts age past seven years." },
    { q: "What does taper relief actually reduce?", a: "The tax payable on a transfer, not the value transferred and not the nil rate band consumed." },
    { q: "How does an unused nil rate band transfer between spouses?", a: "As a percentage of the band unused on the first death, claimed by the survivor's estate within a time limit." },
  ],
  furtherStudy: [
    "ATX-12 covers valuation and the reliefs that can remove most of a business or farm from charge.",
    "ATX-13 covers trusts, where the immediately chargeable transfer leads.",
    "ATX-07 covers the capital gains consequences of the same lifetime gifts.",
  ],
}

const ATX_TREE_12: StudyChapter = {
  paper: "ATX",
  id: "ATX-12",
  number: 12,
  area: "A",
  syllabusRefs: ["A3(b)"],
  title: "Valuation, business property relief and agricultural property relief",
  minutes: 17,
  intro:
    "Two reliefs can remove most of a business or a farm from inheritance tax entirely. Their conditions are precise, and losing them is usually the result of something the client did without advice.",
  outcomes: [
    "Apply the loss to donor principle in valuing a lifetime transfer",
    "Value related property and holdings of unquoted shares",
    "State the conditions for business property relief and the rates available",
    "State the conditions for agricultural property relief and how the two interact",
    "Identify the events that cause relief to be lost",
  ],
  sections: [
    {
      id: "valuation",
      heading: "Valuation, and the loss to donor principle",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The transfer of value is the loss to the DONOR, not the gain to the donee",
          md: "This distinction is worth real marks. Where a controlling shareholding is broken up, the donor may lose far more value than the donee receives: giving away enough shares to drop from control to a minority reduces the value of everything retained. The transfer of value is the **fall in the donor's estate**, which can substantially exceed the market value of the shares actually given.",
        },
        {
          kind: "example",
          title: "Why the loss to donor matters",
          scenario:
            "A client owns 60% of an unquoted trading company. Assume for illustration that a 60% holding is valued at £6.00 a share, a 40% holding at £3.50, and a 20% holding at £2.00. They give away 20% of the company.",
          steps: [
            { label: "Estate before", detail: "60% valued on a control basis at £6.00 a share." },
            { label: "Estate after", detail: "40% remaining, now a minority holding valued at £3.50 a share." },
            { label: "Loss to donor", detail: "The fall in value covers both the shares given away and the reduction in value of those retained." },
            { label: "Compare", detail: "The donee receives a 20% holding worth only £2.00 a share — far less than the donor's loss." },
          ],
          result:
            "The chargeable transfer is the donor's loss, not the donee's gain, so breaking control is far more expensive than the size of the gift suggests. That is itself the planning point: transfer control in one step or not at all.",
        },
        {
          kind: "text",
          md: "**Related property** applies the same logic to spouses: property owned by a spouse is taken into account in valuing the client's holding, so two 30% holdings cannot be valued as two minorities. The rule prevents value being fragmented across a couple, and it is a standard trap in a scenario where husband and wife each hold shares.",
        },
      ],
      check: {
        q: "A client owning 60% of an unquoted company gives 20% to their son. How is the transfer of value measured?",
        options: [
          "The market value of a 20% minority holding",
          "The fall in the value of the client's estate — the difference between a 60% controlling holding and the remaining 40% minority holding — which exceeds the value of the shares given away",
          "The value the son places on the shares",
          "The company's net asset value multiplied by 20%",
        ],
        correct: 1,
        explain:
          "Inheritance tax charges the loss to the donor, and breaking a controlling holding devalues the shares retained as well as transferring those given. The consequence for advice is that partial transfers of control are disproportionately expensive.",
      },
    },
    {
      id: "bpr-apr",
      heading: "Business and agricultural property relief",
      blocks: [
        {
          kind: "table",
          caption: "Business property relief in outline",
          head: ["Property", "Relief"],
          rows: [
            ["An unincorporated business, or an interest in one", "The higher rate of relief"],
            ["Unquoted shares in a trading company", "The higher rate of relief"],
            ["Control holding of quoted shares", "The lower rate of relief"],
            ["Land, buildings or machinery used by a company the transferor controls, or by their partnership", "The lower rate of relief"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The three conditions that decide it",
          md: "**Ownership** for a minimum period before the transfer; the business must be **trading** rather than mainly dealing in investments or land; and **excepted assets** — those not used in the business, such as surplus cash or an investment portfolio — are stripped out of the relief. A company that has accumulated large cash balances beyond its trading needs can find relief substantially restricted, which is a genuine and frequently examined planning issue.",
        },
        {
          kind: "text",
          md: "**Agricultural property relief** works similarly for agricultural land and buildings, relieving the **agricultural value** only — so any development or hope value above agricultural value falls outside it, though business property relief may cover the excess where the land is used in a farming business. Where both could apply, agricultural relief is given first and business property relief covers what remains.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "How the relief is lost on a lifetime gift",
          md: "For a potentially exempt transfer that becomes chargeable on death, the relief is only available if the **donee still owns the property** and it **still qualifies** at the donor's death. So a son who sells the business two years after receiving it, and before his father dies within the seven years, loses the relief entirely — and the tax falls due on the full value. Advising a donee to retain qualifying property until the seven years expire is a specific, practical recommendation the examiner rewards.",
        },
      ],
      check: {
        q: "A father gifts his trading company shares to his daughter, who sells them a year later. The father dies two years after the gift. What is the position?",
        options: [
          "Business property relief applies as it did at the date of gift",
          "Relief is lost, because the donee no longer owns qualifying property at the donor's death — so the full value of the gift is chargeable, subject to the nil rate band and taper",
          "The gift remains exempt because it was a potentially exempt transfer",
          "Relief is halved",
        ],
        correct: 1,
        explain:
          "The relief is tested again at death, not only when the gift was made, and it requires continued ownership of qualifying property by the donee. This is why advice on gifting a business must reach the donee as well as the donor — the donee's later decision can destroy the relief.",
      },
    },
  ],
  examTraps: [
    { trap: "Valuing a gift at the donee's receipt.", fix: "The transfer of value is the loss to the donor's estate." },
    { trap: "Valuing spouses' shareholdings separately.", fix: "Related property rules combine them for valuation." },
    { trap: "Giving full business property relief to an investment-heavy company.", fix: "Excepted assets are stripped out and a non-trading company does not qualify at all." },
    { trap: "Assuming relief survives to death.", fix: "The donee must still own qualifying property when the donor dies." },
  ],
  keyTerms: [
    { term: "Loss to donor principle", def: "The rule that a transfer of value is measured by the fall in the donor's estate, which can exceed the value received by the donee." },
    { term: "Related property", def: "Property owned by a spouse or civil partner, taken into account in valuing the transferor's holding to prevent fragmentation." },
    { term: "Excepted assets", def: "Assets not used in the business, which are excluded from business property relief." },
  ],
  summary: [
    "Value the loss to the donor, which exceeds the gift where control is broken.",
    "Related property prevents spouses' holdings being valued as separate minorities.",
    "Business property relief requires ownership, trading status, and excludes excepted assets.",
    "On a lifetime gift, relief is retested at death and needs continued qualifying ownership.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is giving away part of a controlling holding expensive?", a: "The loss to the donor includes the fall in value of the retained shares as they cease to carry control." },
    { q: "What does agricultural property relief cover?", a: "The agricultural value only — development or hope value above it needs business property relief instead." },
    { q: "What must the donee do for relief to survive to the donor's death?", a: "Continue to own the property, and it must still qualify at the date of death." },
  ],
  furtherStudy: [
    "ATX-11 covers the charges these reliefs reduce.",
    "ATX-09 covers the capital gains reliefs applying to the same business assets.",
    "Area C covers succession planning built around these reliefs.",
  ],
}

export const ATX_TREE_AREA_A_PART3: StudyChapter[] = [ATX_TREE_09, ATX_TREE_10, ATX_TREE_11, ATX_TREE_12]
