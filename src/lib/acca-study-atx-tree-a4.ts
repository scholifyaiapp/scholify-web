import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · Area A, part four — inheritance tax trusts, overseas and
 * administration (A3), then corporation tax (A4).
 *
 *   ATX-13  Inheritance tax and trusts              (A3 trusts)
 *   ATX-14  Overseas aspects and administration     (A3 overseas, admin)
 *   ATX-15  Corporation tax: the framework and losses (A4)
 *   ATX-16  Groups                                   (A4 groups)
 *   ATX-17  Overseas aspects of corporation tax      (A4 overseas)
 *   ATX-18  Special types of company and reliefs     (A4 special)
 *
 * See acca-study-atx-tree-a.ts for the Finance Act 2025 and rates rules
 * governing this whole paper.
 */

const ATX_TREE_13: StudyChapter = {
  paper: "ATX",
  id: "ATX-13",
  number: 13,
  area: "A",
  syllabusRefs: ["A3(c)"],
  title: "Inheritance tax and trusts",
  minutes: 16,
  intro:
    "Assets in a trust have no owner who will die, so the tax has to be charged another way. The relevant property regime is that other way, and it charges periodically instead.",
  outcomes: [
    "Explain why the relevant property regime exists",
    "Identify the three occasions of charge on a relevant property trust",
    "Outline the principal charge and the exit charge",
    "Advise on the interaction with capital gains tax on the same transfer",
    "Recognise when a trust is worth using despite its tax cost",
  ],
  sections: [
    {
      id: "why-and-when",
      heading: "Why trusts are charged separately, and when",
      blocks: [
        {
          kind: "text",
          md: "Inheritance tax works principally through death. Property held in a discretionary trust never passes on anyone's death — nobody is absolutely entitled to it — so without a separate regime it would escape indefinitely. The **relevant property regime** solves this by charging at intervals instead of on death.",
        },
        {
          kind: "table",
          caption: "The three occasions of charge",
          head: ["Occasion", "What is charged", "Point to note"],
          rows: [
            ["Entry", "The transfer into the trust, as an immediately chargeable transfer", "Charged at the lifetime rate; gross up if the settlor pays the tax"],
            ["Principal (ten-year) charge", "The value of relevant property every ten years", "At a maximum of a fixed proportion of the death rate, and usually far less"],
            ["Exit charge", "Property leaving the trust between ten-year anniversaries", "Proportionate to the time elapsed since the last principal charge"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The trade the client is making",
          md: "The regime is a genuine cost — an entry charge, then a modest charge every decade. What the client buys is **control and flexibility**: assets pass out of their estate, so growth accrues outside it, while trustees retain discretion over who benefits and when. For a client with a growing asset and uncertain family needs that can be worth paying for, and the advice should present it as a trade rather than as either a loophole or a trap.",
        },
        {
          kind: "text",
          md: "The **entry charge is the reason to plan the amount**. A transfer into a trust within the available nil rate band carries no immediate charge, so settling an amount up to the band — and repeating it once seven years have passed and the band has been restored by cumulation falling away — is the standard pattern. Recognising that rhythm is a specific and practical planning recommendation.",
        },
      ],
      check: {
        q: "Why does the relevant property regime charge inheritance tax every ten years?",
        options: [
          "To raise revenue more frequently",
          "Because no individual is absolutely entitled to trust property, so it would never pass on a death — the periodic charge substitutes for the death charge that cannot arise",
          "Because trustees change every ten years",
          "Because trusts are presumed to be avoidance arrangements",
        ],
        correct: 1,
        explain:
          "Inheritance tax is fundamentally a charge on death and on gifts. Discretionary trust property has no owner whose death would trigger it, so a periodic charge fills the gap — which is why the regime is a substitute rather than a penalty.",
      },
    },
    {
      id: "interaction",
      heading: "The interaction with capital gains tax",
      blocks: [
        {
          kind: "text",
          md: "The same transfer into a trust is a disposal for capital gains tax and a chargeable transfer for inheritance tax. The two are coordinated so that the taxpayer is not fully charged under both at once.",
        },
        {
          kind: "table",
          caption: "One transfer, two taxes",
          head: ["Stage", "Capital gains tax", "Inheritance tax"],
          rows: [
            ["Into the trust", "Disposal at market value; gift relief available on ANY asset because the transfer is immediately chargeable", "Immediately chargeable transfer at the lifetime rate"],
            ["Held in trust", "Trustees chargeable on disposals, with a reduced annual exempt amount", "Principal charge every ten years"],
            ["Out to a beneficiary", "Disposal at market value by trustees; gift relief available", "Exit charge, proportionate to time since the last principal charge"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The coordination is the examinable point",
          md: "Gift relief widens to cover **any** asset precisely because inheritance tax bites immediately. So the client is not paying capital gains tax and inheritance tax on the same value at the same moment — one is deferred while the other is charged. An answer that computes both in full has missed the mechanism, and one that computes neither has missed the charge.",
        },
        {
          kind: "text",
          md: "Note that gift relief here **defers rather than removes**: the trustees take a reduced base cost, so the held-over gain resurfaces when they dispose of the asset or appoint it out. The family's total capital gains exposure is unchanged; only its timing and its owner have moved.",
        },
      ],
      check: {
        q: "A client settles a valuable painting into a discretionary trust. Which is correct?",
        options: [
          "Capital gains tax and inheritance tax are both charged in full immediately",
          "Inheritance tax is charged immediately as a chargeable transfer, while the capital gain can be held over under gift relief — available on any asset here because the inheritance tax charge arises at that point",
          "Neither tax applies to transfers into trust",
          "Only capital gains tax applies, since a painting is not business property",
        ],
        correct: 1,
        explain:
          "The two taxes are coordinated so the same event is not fully charged twice: inheritance tax bites now and the capital gain is deferred into the trustees' base cost. Identifying which tax bites and which defers is exactly the interaction ATX sets these scenarios to test.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a trust transfer as a potentially exempt transfer.", fix: "Transfers into most trusts are immediately chargeable." },
    { trap: "Charging both taxes in full on the same transfer.", fix: "Gift relief defers the gain because inheritance tax is charged immediately." },
    { trap: "Forgetting the exit charge.", fix: "Property leaving between anniversaries is charged proportionately." },
    { trap: "Presenting a trust as a way of avoiding tax.", fix: "It is a trade — a cost paid for control, flexibility and removing future growth from the estate." },
  ],
  keyTerms: [
    { term: "Relevant property regime", def: "The inheritance tax treatment of most trusts, charging on entry, every ten years, and on property leaving the trust." },
    { term: "Principal charge", def: "The charge on the value of relevant property at each ten-year anniversary of the trust." },
    { term: "Exit charge", def: "A proportionate charge when property leaves the trust between ten-year anniversaries." },
  ],
  summary: [
    "Trust property never passes on a death, so a periodic charge substitutes for the death charge.",
    "Three occasions: entry, every ten years, and on property leaving.",
    "Gift relief widens to any asset because inheritance tax bites immediately on entry.",
    "A trust is a trade: a real cost paid for control, flexibility and removing growth from the estate.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three occasions of charge on a relevant property trust?", a: "Entry into the trust, the principal charge at each ten-year anniversary, and an exit charge on property leaving between anniversaries." },
    { q: "Why is gift relief available on non-business assets going into a trust?", a: "Because the transfer is immediately chargeable to inheritance tax, so the taxes are coordinated to avoid a full double charge." },
    { q: "What is the standard planning rhythm for settling assets into trust?", a: "Settle up to the available nil rate band, then repeat once seven years have passed and cumulation has restored the band." },
  ],
  furtherStudy: [
    "ATX-11 covers the nil rate band and cumulation that determine the entry charge.",
    "ATX-10 covers the capital gains side of the same transfers.",
    "Area C covers succession planning using trusts.",
  ],
}

const ATX_TREE_14: StudyChapter = {
  paper: "ATX",
  id: "ATX-14",
  number: 14,
  area: "A",
  syllabusRefs: ["A3(d)", "A3(e)"],
  title: "Inheritance tax: overseas aspects and administration",
  minutes: 15,
  intro:
    "Inheritance tax kept a concept the other taxes lost. Long-term residence now decides its reach — and the administration carries deadlines that cost money independently of the tax.",
  outcomes: [
    "Determine the scope of inheritance tax for individuals with foreign connections",
    "Identify excluded property and its significance",
    "Explain the relief available for foreign tax on the same property",
    "State who is liable to pay and by when",
    "Advise on the payment options available for particular assets",
  ],
  sections: [
    {
      id: "scope",
      heading: "Scope, and what changed",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "Inheritance tax did not simply follow income tax and CGT",
          md: "Finance Act 2025 removed domicile as the governing concept for income tax and capital gains tax and replaced it with residence. For **inheritance tax** the reform moved to a **long-term residence** test rather than adopting the four-year FIG regime, so the two systems are aligned in spirit but not identical. Do not assume a conclusion reached for income tax carries across to inheritance tax without checking.",
        },
        {
          kind: "text",
          md: "The structure of the charge is unchanged: an individual within the scope of the tax is chargeable on their **worldwide** estate, while someone outside it is chargeable only on **UK-situated** property. Property outside the charge for a person not within scope is **excluded property**, and identifying it is usually the substance of an overseas inheritance tax requirement.",
        },
        {
          kind: "table",
          caption: "Where property is situated",
          head: ["Asset", "Situs"],
          rows: [
            ["Land and buildings", "Where the property physically is"],
            ["Registered shares", "Where the share register is kept"],
            ["Bank account", "Where the branch is located"],
            ["Debt", "Where the debtor resides"],
            ["Chattels", "Where they physically are at the relevant time"],
          ],
        },
        {
          kind: "text",
          md: "Where the same property bears both UK inheritance tax and an equivalent foreign tax, **double tax relief** is available — as elsewhere, the lower of the two charges on that property, either under a treaty or by unilateral relief.",
        },
      ],
      check: {
        q: "An individual outside the scope of UK inheritance tax dies owning a London flat and a foreign bank account. What is chargeable?",
        options: [
          "Both, since they are part of the estate",
          "The London flat only — UK land is UK-situated property, while the foreign bank account is excluded property for someone outside the scope of the tax",
          "Neither, as the individual is outside the scope",
          "The bank account only",
        ],
        correct: 1,
        explain:
          "Being outside the scope limits the charge to UK-situated property rather than removing it. Land is situated where it physically is, so the flat is chargeable; the account is situated at the branch abroad and is excluded property.",
      },
    },
    {
      id: "administration",
      heading: "Payment, liability and the deadlines",
      blocks: [
        {
          kind: "table",
          caption: "Who pays, and when",
          head: ["Charge", "Primarily payable by", "Due"],
          rows: [
            ["Lifetime immediately chargeable transfer", "The donor, unless the trustees agree to pay", "Depends on when in the tax year the transfer falls"],
            ["Additional tax on a PET after death", "The donee", "Six months from the end of the month in which death occurred"],
            ["Death estate", "The personal representatives, from estate assets", "The same date — six months from the end of the month of death"],
            ["Principal and exit charges", "The trustees", "Six months from the end of the month in which the charge arose"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The interest trap on the estate",
          md: "Personal representatives frequently cannot pay by the due date, because probate has not been granted and the assets cannot be sold. **Interest runs anyway** from the due date. So the practical advice is to arrange funding in advance — the instalment option, a bank loan, or the direct payment scheme allowing funds to be released from the deceased's own accounts — rather than waiting.",
        },
        {
          kind: "text",
          md: "The **instalment option** allows tax on certain assets — land, a business or an interest in one, and controlling shareholdings — to be paid over ten annual instalments. It is valuable precisely because those assets cannot be sold quickly. Interest is normally charged, though for some qualifying assets the instalments are interest-free unless paid late; the examinable point is that the option exists, which assets qualify, and that recommending it addresses a real liquidity problem.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The donee's exposure on a failed PET",
          md: "Where a donor dies within seven years, the **donee** is liable for the tax on the gift they received. A client who accepted a large gift several years ago can face an unexpected bill, and if they no longer have the asset the money must come from elsewhere. Advising a donee to retain funds against that possibility, or to consider insurance over the seven-year period, is a practical recommendation the examiner rewards.",
        },
      ],
      check: {
        q: "Personal representatives cannot pay inheritance tax by the due date because probate has not been granted. What is the consequence and the remedy?",
        options: [
          "No consequence, since the delay is outside their control",
          "Interest runs from the due date regardless, so funding should be arranged in advance — the instalment option for qualifying assets, a loan, or the direct payment scheme releasing funds from the deceased's accounts",
          "The tax is waived",
          "The due date is automatically extended until probate",
        ],
        correct: 1,
        explain:
          "The deadline is not conditional on the practicalities of administering the estate, so interest accrues whatever the reason for delay. Recognising the liquidity problem and naming the funding routes is what turns a technical answer into advice.",
      },
    },
  ],
  examTraps: [
    { trap: "Assuming the income tax overseas conclusion applies to inheritance tax.", fix: "Inheritance tax uses a long-term residence test, not the four-year FIG regime." },
    { trap: "Ignoring situs.", fix: "For someone outside the scope, only UK-situated property is chargeable — and situs has specific rules per asset." },
    { trap: "Assuming interest does not run while probate is pending.", fix: "It runs from the due date regardless; arrange funding in advance." },
    { trap: "Overlooking the donee's liability on a failed PET.", fix: "The donee pays, and may no longer hold the asset." },
  ],
  keyTerms: [
    { term: "Excluded property", def: "Property outside the scope of UK inheritance tax, typically non-UK situated property held by a person not within the charge on their worldwide estate." },
    { term: "Situs", def: "The location of an asset for inheritance tax, determined by specific rules — land where it lies, registered shares where the register is kept." },
    { term: "Instalment option", def: "The right to pay inheritance tax on land, businesses and controlling shareholdings over ten annual instalments." },
  ],
  summary: [
    "Inheritance tax moved to a long-term residence test rather than the FIG regime — do not assume alignment.",
    "Within the charge means worldwide; outside it means UK-situated property only.",
    "Interest runs from the due date whatever the probate position.",
    "The instalment option addresses the illiquidity of land, businesses and controlling holdings.",
  ],
  knowledgeDiagnostic: [
    { q: "What is chargeable for someone outside the scope of UK inheritance tax?", a: "UK-situated property only; their foreign property is excluded property." },
    { q: "Who bears the tax on a gift that fails because the donor died within seven years?", a: "The donee, who may no longer hold the asset and must find the money elsewhere." },
    { q: "Which assets qualify for the instalment option?", a: "Land and buildings, a business or an interest in one, and controlling shareholdings — assets that cannot be realised quickly." },
  ],
  furtherStudy: [
    "ATX-11 covers the computation of the charges administered here.",
    "ATX-03 covers the residence framework, and why inheritance tax differs from it.",
    "Area B covers statutory obligations and time limits across all the taxes.",
  ],
}

const ATX_TREE_15: StudyChapter = {
  paper: "ATX",
  id: "ATX-15",
  number: 15,
  area: "A",
  syllabusRefs: ["A4(a)"],
  title: "Corporation tax: the framework and losses",
  minutes: 17,
  intro:
    "The computation is TX's. What ATX adds is the choice: a company with losses usually has several ways to use them, and the best one depends on rate, timing and what else is in the group.",
  outcomes: [
    "Compute taxable total profits and identify the accounting period",
    "Explain how associated companies affect the rate applied",
    "Identify the reliefs available for a trading loss and their order",
    "Choose between loss reliefs on rate, timing and restriction grounds",
    "Recognise the restrictions on carried-forward losses",
  ],
  sections: [
    {
      id: "framework",
      heading: "The framework, and why associated companies matter",
      blocks: [
        {
          kind: "text",
          md: "Corporation tax is charged on **taxable total profits** for an accounting period — trading profits, property income, non-trading loan relationship credits and chargeable gains, less qualifying donations. An accounting period cannot exceed twelve months, so a longer period of account is split, and the split affects when tax falls due.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Associated companies divide the limits",
          md: "The thresholds determining the rate of corporation tax are **divided by the number of associated companies**. So acquiring or incorporating another company can push an existing one into a higher effective rate even though its own profits have not changed. This is one of the most reliably missed points in the paper, and it makes 'set up a second company' advice more expensive than it looks.",
        },
        {
          kind: "text",
          md: "**Payment timing** follows size. A company below the threshold pays nine months and a day after the end of the accounting period; a large company pays **quarterly instalments**, beginning before the period has even ended. A company crossing that threshold for the first time therefore faces a serious cash flow event, and warning a growing client about it is a practical commercial point.",
        },
      ],
      check: {
        q: "A client's company is comfortably below the profit threshold for higher-rate corporation tax. They plan to incorporate a second company for a new venture. What should they be told?",
        options: [
          "Nothing — each company is taxed separately on its own profits",
          "The thresholds are divided between associated companies, so the existing company's limits halve and it may face a higher effective rate despite unchanged profits — and both may move to quarterly instalments sooner",
          "The second company will be exempt in its first year",
          "The companies must be taxed as one entity",
        ],
        correct: 1,
        explain:
          "Dividing the limits is what stops a group fragmenting profits across many small companies to stay in the lower band. The consequence is that the cost of the new company includes a tax increase in the old one, which the client will not have anticipated.",
      },
    },
    {
      id: "losses",
      heading: "Loss reliefs, and choosing between them",
      blocks: [
        {
          kind: "table",
          caption: "The routes for a trading loss",
          head: ["Relief", "Against", "Timing"],
          rows: [
            ["Current period", "Total profits of the same accounting period", "Immediate"],
            ["Carry back", "Total profits of the previous twelve months, after a current period claim", "Generates a repayment"],
            ["Carry forward", "Total profits of later periods, subject to restriction", "Deferred; flexible as to amount claimed"],
            ["Group relief", "Profits of another group company in the same period", "Immediate, and can move the loss to where the rate is highest"],
            ["Terminal loss", "Extended carry back on cessation", "Available only when the trade ends"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Three questions decide the claim",
          md: "**Where is the highest rate?** Relief is worth most against profits taxed at the higher rate, which may be in another group company. **When is the cash needed?** A carry-back produces a repayment now; a carry-forward saves more later. **What will be restricted?** Carried-forward losses above an annual allowance can only relieve a proportion of profits, so a very large loss cannot be absorbed in one future year.",
        },
        {
          kind: "text",
          md: "Carried-forward losses are also **flexible in amount** — a company can claim less than the full loss to avoid wasting qualifying donations, which are not themselves carried forward. Losing charitable donations to an over-claimed loss relief is a small, specific error that appears regularly and is easily avoided by claiming a partial amount.",
        },
        {
          kind: "example",
          title: "Choosing where a loss should go",
          scenario:
            "A company has a trading loss. Its group includes a profitable company taxed at the higher effective rate and another with profits inside the lower band. The loss-making company has no other income this period and made profits last year.",
          steps: [
            { label: "Rate", detail: "Group relief to the company taxed at the higher rate gives the greatest saving per pound of loss." },
            { label: "Timing", detail: "A carry-back against last year's profits produces an immediate repayment, which matters if the group needs cash." },
            { label: "Restriction", detail: "Carrying forward risks the restriction on large carried-forward losses and defers the benefit entirely." },
            { label: "Recommendation", detail: "Surrender as much as the higher-rate company can absorb, then carry back the balance for the repayment, keeping any remainder to carry forward." },
          ],
          result:
            "The reliefs are not mutually exclusive, and the best answer usually combines them — which is why the requirement asks for a recommendation rather than for the identification of one relief.",
        },
      ],
      check: {
        q: "A company claims full loss relief against total profits, reducing them to nil, but had made qualifying charitable donations that period. What is the consequence?",
        options: [
          "The donations are carried forward to the next period",
          "The donations are wasted — they cannot be carried forward — so a partial loss claim leaving profits equal to the donations would have preserved them",
          "The loss claim is invalid",
          "The donations increase the loss carried forward",
        ],
        correct: 1,
        explain:
          "Qualifying donations relieve profits of the period only and are lost if there are none. Because carried-forward loss claims can be made for a lesser amount, the fix is simply to claim less — a small piece of precision that recovers real value.",
      },
    },
  ],
  examTraps: [
    { trap: "Ignoring associated companies.", fix: "They divide the thresholds, raising the effective rate and accelerating instalment payments." },
    { trap: "Claiming full loss relief and wasting donations.", fix: "Claim a lesser amount so the donations are still relieved." },
    { trap: "Choosing a loss relief without comparing rates.", fix: "Relief is worth most where the profits bear the highest rate, which may be elsewhere in the group." },
    { trap: "Assuming a carried-forward loss can absorb all future profits.", fix: "A restriction limits relief above an annual allowance." },
  ],
  keyTerms: [
    { term: "Taxable total profits", def: "A company's income and gains for an accounting period after qualifying donations, on which corporation tax is charged." },
    { term: "Associated company", def: "A company under common control, whose existence divides the profit thresholds determining the corporation tax rate and payment method." },
    { term: "Group relief", def: "The surrender of losses between group companies in the same period, allowing a loss to be used where the rate is highest." },
  ],
  summary: [
    "Associated companies divide the thresholds, so a new company raises the old one's effective rate.",
    "Large companies pay by quarterly instalments — a serious cash flow event when first crossed.",
    "Choose loss relief on rate, timing and restriction, and combine reliefs where that is better.",
    "Claim a lesser carried-forward amount rather than wasting qualifying donations.",
  ],
  knowledgeDiagnostic: [
    { q: "What do associated companies do to the corporation tax computation?", a: "They divide the profit thresholds, potentially raising the rate and bringing forward quarterly instalment payments." },
    { q: "What three questions decide which loss relief to claim?", a: "Where the highest rate is, when the cash is needed, and what restriction will apply to a carried-forward loss." },
    { q: "How are qualifying donations protected when claiming loss relief?", a: "By claiming less than the full carried-forward loss, leaving profits sufficient to absorb the donations." },
  ],
  furtherStudy: [
    "ATX-16 covers group relief and the other group reliefs in detail.",
    "ATX-17 covers overseas companies and the corporation tax consequences of expanding abroad.",
    "Area B covers the interaction with the shareholder's personal position.",
  ],
}

const ATX_TREE_16: StudyChapter = {
  paper: "ATX",
  id: "ATX-16",
  number: 16,
  area: "A",
  syllabusRefs: ["A4(b)"],
  title: "Groups",
  minutes: 17,
  intro:
    "Two different group definitions, two different sets of relief, and one recurring exam trap — that companies in a group for one purpose are not necessarily in a group for the other.",
  outcomes: [
    "Distinguish the group relief group from the capital gains group",
    "Apply group relief for losses, including the amounts that can be surrendered",
    "Apply the no gain, no loss transfer rule within a capital gains group",
    "Use the election to reallocate a gain or loss within the group",
    "Identify the degrouping charge and when it arises",
  ],
  sections: [
    {
      id: "two-groups",
      heading: "Two definitions, and why it matters",
      blocks: [
        {
          kind: "table",
          caption: "The two groups",
          head: ["", "Group relief group", "Capital gains group"],
          rows: [
            ["Test", "A 75% relationship, direct or indirect, with effective interest requirements", "A 75% direct relationship at each level, with a 51% effective interest overall"],
            ["Allows", "Surrender of trading losses and certain other amounts", "No gain, no loss transfers of assets between members"],
            ["Also allows", "—", "Election to treat a gain or loss as arising in another member"],
            ["Consequence of leaving", "Relief ceases", "A degrouping charge can arise on assets transferred within the group"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The trap",
          md: "Because the effective interest tests differ, a company can be in a **capital gains group but not a group relief group**, or the reverse — most easily in a chain of holdings where each link is 75% but the multiplied interest falls below the threshold. Candidates routinely assume one group definition covers both. Check each test separately whenever a scenario gives a chain of shareholdings rather than a flat structure.",
        },
      ],
      check: {
        q: "A parent owns 80% of A, which owns 80% of B. Why must both group tests be checked separately?",
        options: [
          "They give the same answer, so only one check is needed",
          "The effective interest differs from the direct holding — here the parent's effective interest in B is 64% — and the two group definitions apply their thresholds differently, so B may qualify for one group and not the other",
          "Group relief never applies to indirect holdings",
          "Capital gains groups require 100% ownership",
        ],
        correct: 1,
        explain:
          "Multiplying 80% by 80% gives an effective interest of 64%, which is where the two definitions can diverge. This chain structure is exactly what an examiner supplies when testing whether a candidate knows the tests are distinct.",
      },
    },
    {
      id: "using-groups",
      heading: "Using the group reliefs",
      blocks: [
        {
          kind: "text",
          md: "**Group relief** allows a loss-making company to surrender its loss to a profitable group member for the same period. The amount is restricted to the lower of the surrendering company's available loss and the claimant's profits, and where the accounting periods do not coincide, both are time-apportioned to the overlapping period — a detail that is frequently required and frequently forgotten.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Surrender to where the rate is highest",
          md: "Because group relief is a choice about **which** company uses the loss, it should go where the tax saved per pound is greatest — normally the company paying the higher effective rate. Where profits are similar, the tiebreaker is cash flow: a company already paying instalments benefits sooner. Saying which company should claim, and why, is the advice; simply stating that group relief is available is not.",
        },
        {
          kind: "text",
          md: "Within a **capital gains group**, assets transfer at **no gain, no loss**, so the gain stays latent until the asset leaves the group. Two consequences follow. First, an asset can be moved to the company best placed to dispose of it. Second, the group can **elect** to treat a gain or loss as arising in another member — which achieves the same result without physically moving the asset, and is simpler.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The degrouping charge",
          md: "If a company **leaves the group within six years** still owning an asset transferred to it under the no gain, no loss rule, a **degrouping charge** arises: the company is treated as having sold and reacquired the asset at market value when it received it. In a share sale the charge is normally added to the seller's disposal proceeds. The practical warning is that moving assets around before selling a subsidiary can create a charge the parties did not price into the deal.",
        },
      ],
      check: {
        q: "A group transfers a property to a subsidiary at no gain, no loss and sells that subsidiary two years later. What arises?",
        options: [
          "Nothing, since the transfer was tax neutral",
          "A degrouping charge — the subsidiary leaves within six years still holding the transferred asset, so the deferred gain crystallises, normally being added to the seller's proceeds on the share disposal",
          "The buyer inherits the deferred gain with no immediate charge",
          "The transfer is retrospectively cancelled",
        ],
        correct: 1,
        explain:
          "The no gain, no loss rule defers rather than removes the gain, and the six-year rule prevents a group from sheltering an asset in a company and then selling that company. Pricing the charge into the transaction, or restructuring to avoid it, is exactly the advice a scenario like this is asking for.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying one group definition to both reliefs.", fix: "The effective interest tests differ — check each separately on a chain structure." },
    { trap: "Surrendering losses without saying to whom.", fix: "Choose the company with the highest rate, then the one needing the cash soonest." },
    { trap: "Ignoring non-coterminous accounting periods.", fix: "Time-apportion both the loss and the profits to the overlap." },
    { trap: "Moving assets before selling a subsidiary.", fix: "A degrouping charge arises if the company leaves within six years holding the asset." },
  ],
  keyTerms: [
    { term: "Group relief", def: "The surrender of trading losses and certain other amounts between group companies for the same period." },
    { term: "Capital gains group", def: "A group within which assets transfer at no gain, no loss and gains or losses may be reallocated by election." },
    { term: "Degrouping charge", def: "A charge arising where a company leaves a capital gains group within six years still holding an asset transferred to it within the group." },
  ],
  summary: [
    "Two group definitions with different effective interest tests — check each separately.",
    "Group relief is restricted to the overlap, time-apportioned where periods differ.",
    "Surrender losses to the highest-rate company, then to the one needing cash soonest.",
    "No gain, no loss transfers defer gains; leaving the group within six years triggers a degrouping charge.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a company be in one group but not the other?", a: "The two definitions apply different effective interest tests, so a chain of 75% or 80% holdings can satisfy one and fail the other." },
    { q: "How is group relief restricted where accounting periods differ?", a: "Both the loss and the claimant's profits are time-apportioned to the overlapping period." },
    { q: "When does a degrouping charge arise?", a: "When a company leaves a capital gains group within six years still owning an asset transferred to it under the no gain, no loss rule." },
  ],
  furtherStudy: [
    "ATX-15 covers the loss reliefs group relief competes with.",
    "ATX-17 covers overseas group members and where losses can and cannot travel.",
    "Area B covers the sale of a subsidiary as a transaction engaging several taxes.",
  ],
}

export const ATX_TREE_AREA_A_PART4: StudyChapter[] = [ATX_TREE_13, ATX_TREE_14, ATX_TREE_15, ATX_TREE_16]
