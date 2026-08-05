import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area E, second part — chargeable gains for companies, losses, and groups.
 * Chapters 23–25, closing the corporation tax block.
 *
 * ── The two differences chapter 23 exists for ────────────────────
 * A company's gain differs from an individual's in exactly two ways that matter:
 * INDEXATION ALLOWANCE is available (frozen at December 2017), and the share matching rule
 * is same day then the previous NINE DAYS — looking BACKWARDS, where an individual looks
 * forward 30 days. Both are easy marks and both are routinely lost.
 *
 * ── Why losses and groups are separate chapters ──────────────────
 * A company's loss reliefs are not an individual's: everything runs against TOTAL PROFITS
 * rather than trading profits, carry back is 12 months on a LIFO basis, and property losses
 * are relieved COMPULSORILY. Group relief then layers on top, and teaching it alongside the
 * single-company rules obscures which is which.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 23 · E3 ──────────────────────────────────────────── */

export const TX_TREE_23: StudyChapter = {
  id: "TX-23",
  number: 23,
  paper: "TX",
  area: "E",
  title: "Chargeable gains for companies",
  minutes: 17,
  syllabusRefs: ["E3(a)", "E3(b)", "E3(c)", "E3(d)", "E3(e)", "E3(f)", "E3(g)"],
  intro:
    "Two differences from an individual's gain, and both are worth marks: indexation allowance, and a matching rule that looks backwards rather than forwards.",
  outcomes: [
    "Compute a company's chargeable gain including indexation allowance",
    "Explain why indexation cannot create or increase a loss",
    "Apply the same day and nine day matching rules",
    "Deal with bonus issues, rights issues, takeovers and reorganisations",
    "Apply rollover relief for a company",
  ],
  sections: [
    {
      id: "indexation",
      heading: "Indexation allowance",
      blocks: [
        {
          kind: "formula",
          name: "A company's chargeable gain",
          expr: "Disposal proceeds                                          X\nLess incidental costs of disposal                         (X)\nLess original cost and incidental costs of acquisition    (X)\nLess enhancement expenditure                              (X)\n                                                        ─────\nUNINDEXED GAIN                                             X\nLess INDEXATION ALLOWANCE                                 (X)\n                                                        ─────\nCHARGEABLE GAIN                                            X\n                                                        ─────\n\nINDEXATION ALLOWANCE  =  cost  ×  indexation FACTOR\n\n   ·  runs from ACQUISITION to the earlier of DISPOSAL and\n      DECEMBER 2017 — indexation was FROZEN then\n   ·  the factor is always GIVEN in the exam; calculating it from\n      RPI figures is an excluded topic\n   ·  available on enhancement expenditure too, from the date it\n      was incurred\n\nINDEXATION CANNOT CREATE OR INCREASE A LOSS:\n   ·  unindexed gain, indexation reduces it to NIL at most\n   ·  unindexed LOSS, no indexation at all",
          note: "A company has NO annual exempt amount, and there is no equivalent of business asset disposal relief — those are for individuals only. The gain simply joins taxable total profits and is taxed at the corporation tax rate.",
        },
        {
          kind: "example",
          title: "A gain with indexation, and the restriction",
          scenario:
            "Coniston Ltd bought a factory in March 2010 for £240,000 and sold it in December 2025 for £560,000. The indexation factor from March 2010 to December 2017 is 0.298. In the same period it also sold an investment it had bought for £180,000, for £190,000; the indexation factor for that asset is 0.112.",
          steps: [
            { label: "The factory — compute the unindexed gain", detail: "£560,000 − £240,000 = £320,000." },
            { label: "The factory — compute indexation", detail: "£240,000 × 0.298 = £71,520. The factor runs only to December 2017, when indexation was frozen — the eight years since then attract no further allowance." },
            { label: "The factory — the chargeable gain", detail: "£320,000 − £71,520 = £248,480. This joins taxable total profits and is taxed at the corporation tax rate, with no annual exempt amount available." },
            { label: "The investment — compute the unindexed gain", detail: "£190,000 − £180,000 = £10,000." },
            { label: "The investment — apply the restriction", detail: "Indexation would be £180,000 × 0.112 = £20,160, which exceeds the £10,000 gain. Indexation cannot create a loss, so it is restricted to £10,000 and the chargeable gain is NIL — not a £10,160 loss." },
            { label: "State the principle", detail: "Indexation reduces a gain to nil at most. Where the disposal produces an unindexed LOSS, no indexation is available at all — so a £180,000 asset sold for £170,000 gives a £10,000 loss and nothing more." },
          ],
          result:
            "**Factory: chargeable gain £248,480. Investment: NIL, not a loss of £10,160.** The restriction is the point — indexation is a relief against inflation, not a mechanism for manufacturing losses.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Companies match shares looking BACKWARDS",
          md: "The share identification rules for a **company** are:\n\n1. Shares acquired on the **same day**\n2. Shares acquired in the **previous NINE DAYS**\n3. The **share pool**\n\nAn **individual** looks **forward 30 days** (chapter 17); a company looks **back 9 days**. Applying the individual's rule to a company, or the reverse, is a routine and avoidable error.\n\nA company's pool is also **indexed**: it is maintained with an indexed cost as well as a historic cost, with indexation added at each operative event up to December 2017. TX keeps this manageable, and note that a **detailed question on the pooling provisions as they apply to companies is an excluded topic** — so the mechanics will be kept simple.\n\n**Bonus and rights issues, takeovers and reorganisations** work as for individuals: a bonus issue adds shares but no cost, a rights issue adds both, and a paper for paper exchange is not a disposal.",
        },
      ],
      check: {
        q: "A company's unindexed gain is £10,000 and its indexation allowance would be £20,160. What is the chargeable gain?",
        options: [
          "A loss of £10,160",
          "Nil — indexation is restricted so that it cannot create a loss",
          "£10,000, with no indexation available",
          "£20,160",
        ],
        correct: 1,
        explain:
          "NIL. Indexation can reduce a gain to nil but cannot create or increase a loss, so it is restricted to the £10,000 unindexed gain. And where a disposal produces an unindexed loss to begin with, no indexation is available at all.",
      },
    },
    {
      id: "company-rollover",
      heading: "Rollover relief and capital losses",
      blocks: [
        {
          kind: "list",
          title: "Rollover relief for a company",
          items: [
            "Works exactly as for an individual (chapter 18): the gain on a **qualifying business asset** is deferred against the cost of a **replacement**, acquired between **1 year before** and **3 years after** the disposal.",
            "Restricted where proceeds are **not fully reinvested**: the amount chargeable immediately is the **lower** of the gain and the proceeds not reinvested.",
            "Qualifying assets are those used in the trade — **land and buildings**, and **fixed** plant and machinery. Not shares, and not assets held as investments.",
            "Available on a **GROUP** basis for a 75% gains group: one company can dispose and another reinvest, and the group is treated as a single entity for the purpose (chapter 25).",
            "Where the replacement is a **depreciating** asset — one with a life of 60 years or less, such as a lease — the gain is **held over** rather than rolled over: it crystallises on the earlier of disposal of the replacement, it ceasing to be used in the trade, and **10 years**.",
          ],
        },
        {
          kind: "table",
          caption: "Capital losses for a company",
          head: ["", "Treatment"],
          rows: [
            ["**Current period capital losses**", "Set against current period **chargeable gains** only, automatically"],
            ["**Excess capital losses**", "**Carried forward** indefinitely against future chargeable gains only"],
            ["**Carry back**", "**Not available** — a capital loss can never be carried back"],
            ["**Against income**", "**Never** — capital losses cannot be relieved against income or total profits"],
            ["**Group relief**", "A capital loss cannot be surrendered as group relief, though a gains group can achieve a similar result by transferring the asset before sale (chapter 25)"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The asymmetry worth remembering",
          md: "A company's **trading** loss can go against **total profits**, including chargeable gains. A company's **capital** loss can only go against **chargeable gains**. So gains can absorb trading losses but income can never absorb capital losses.\n\nThat asymmetry drives a real planning point: where a group has a company with capital losses and another about to realise a gain, **transferring the asset** into the loss company before sale brings the two together — and intra-group transfers are automatically at no gain, no loss, so the transfer itself is free of tax.",
        },
      ],
      check: {
        q: "How may a company's capital loss be relieved?",
        options: [
          "Against total profits of the current period",
          "Against chargeable gains only — current period, then carried forward indefinitely; never carried back",
          "Carried back 12 months against gains",
          "Surrendered as group relief",
        ],
        correct: 1,
        explain:
          "AGAINST CHARGEABLE GAINS ONLY. Current period gains first, then carried forward indefinitely. A capital loss can never be carried back, can never go against income, and cannot be surrendered as group relief — though a gains group can transfer the asset to the loss company before sale to achieve the same effect.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Running indexation to the date of disposal.",
      fix: "It is frozen at December 2017, so the factor stops there.",
    },
    {
      trap: "Using indexation to create or increase a loss.",
      fix: "It reduces a gain to nil at most, and is unavailable where there is an unindexed loss.",
    },
    {
      trap: "Applying the individual's 30-day matching rule to a company.",
      fix: "A company matches same day, then the previous NINE days, then the pool.",
    },
    {
      trap: "Giving a company an annual exempt amount or business asset disposal relief.",
      fix: "Both are for individuals only. A company's gain joins TTP and is taxed at the corporation tax rate.",
    },
    {
      trap: "Setting a capital loss against total profits.",
      fix: "Capital losses go against chargeable gains only.",
    },
  ],
  keyTerms: [
    { term: "Indexation allowance", def: "Cost times a given factor, running to the earlier of disposal and December 2017." },
    { term: "Nine day rule", def: "A company matches a disposal against acquisitions in the previous nine days, before the pool." },
    { term: "Indexed pool", def: "A company's share pool, maintained with an indexed cost as well as a historic cost." },
    { term: "Depreciating asset", def: "One with a life of 60 years or less; a gain is held over for up to 10 years rather than rolled over." },
  ],
  summary: [
    "A company's gain is reduced by indexation allowance, frozen at December 2017 and given as a factor.",
    "Indexation cannot create or increase a loss.",
    "Companies match shares same day, then the previous nine days, then the pool.",
    "There is no annual exempt amount and no business asset disposal relief for a company.",
    "Capital losses go against chargeable gains only, current period then carried forward, never back.",
  ],
  knowledgeDiagnostic: [
    { q: "To what date does indexation allowance run?", a: "The earlier of the date of disposal and December 2017, when indexation was frozen." },
    { q: "What happens where indexation exceeds the unindexed gain?", a: "It is restricted to reduce the gain to nil; it cannot create or increase a loss." },
    { q: "How does a company's share matching differ from an individual's?", a: "A company looks back nine days after the same-day match; an individual looks forward thirty days." },
    { q: "Can a company claim business asset disposal relief?", a: "No — BADR and the annual exempt amount are available to individuals only." },
    { q: "What happens where a gain is rolled into a depreciating asset?", a: "It is held over rather than rolled over, crystallising on the earlier of disposal, the asset ceasing to be used in the trade, and ten years." },
  ],
}

/* ── Chapter 24 · E6 ──────────────────────────────────────────── */

export const TX_TREE_24: StudyChapter = {
  id: "TX-24",
  number: 24,
  paper: "TX",
  area: "E",
  title: "Losses for companies",
  minutes: 18,
  syllabusRefs: ["E6(a)", "E6(b)", "E6(c)"],
  intro:
    "Everything runs against total profits rather than trading profits, and the carry back is twelve months rather than a tax year. Neither matches the individual's rules.",
  outcomes: [
    "Relieve a trading loss against current period total profits",
    "Carry a trading loss back twelve months on a LIFO basis",
    "Carry a trading loss forward against future total profits",
    "Apply terminal loss relief over thirty-six months",
    "Explain the compulsory relief of property business losses and the waste of QCDs",
  ],
  sections: [
    {
      id: "trading-losses",
      heading: "Trading losses",
      blocks: [
        {
          kind: "table",
          caption: "A company's trading loss reliefs",
          head: ["Relief", "Against", "Period", "Notes"],
          rows: [
            ["**Current period**", "**Total profits** before QCDs", "The loss-making period", "**All or nothing** — cannot be restricted"],
            ["**Carry back**", "**Total profits** before QCDs", "The previous **12 months**, **LIFO**", "**Optional**, but requires a current period claim FIRST. Claim within 2 years of the end of the loss period"],
            ["**Carry forward**", "**Total profits** of future periods", "Indefinitely, earliest first", "**Partial claims allowed** for brought-forward losses, unlike current period claims"],
            ["**Terminal loss**", "**Total profits** before QCDs", "The previous **36 months**, **LIFO**", "Only where the trade **ceases**"],
            ["**Group relief**", "Another group company's TTP", "Corresponding accounting periods", "Current period losses only — see chapter 25"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Three differences from an individual's trading loss",
          md: "**It goes against TOTAL PROFITS, not trading profits.** So a company's trading loss can absorb its property income, its interest and its chargeable gains — where an individual's carry forward is confined to profits of the same trade.\n\n**The carry back is 12 MONTHS, not a tax year**, and it runs on a **LIFO** basis. Where the previous 12 months spans two accounting periods, relieve the later one first and apportion the earlier where necessary.\n\n**A current period claim is compulsory before any carry back.** So a company cannot skip the current period to preserve its profits and carry the whole loss back — the sequence is fixed.",
        },
        {
          kind: "example",
          title: "Choosing a relief, and costing the waste",
          scenario:
            "Buttermere Ltd has the following results. Year ended 31 March 2024: trading profit £90,000, property income £20,000, QCDs £5,000. Year ended 31 March 2025: trading profit £60,000, property income £20,000, QCDs £5,000. Year ended 31 March 2026: trading LOSS of £150,000, property income £20,000, QCDs £5,000. It expects healthy profits from 2027 onwards. Relief is to be obtained as early as possible.",
          steps: [
            { label: "Deal with the current period first", detail: "A current period claim is compulsory before any carry back, and it is all or nothing. Total profits for the year to 31 March 2026 before QCDs are £20,000 of property income, so £20,000 of the loss is relieved there. Loss remaining: £150,000 − £20,000 = £130,000." },
            { label: "Note the immediate cost", detail: "That claim reduces total profits to nil, so the £5,000 of QCDs for the year is WASTED. QCDs cannot create a loss, cannot be carried forward and cannot be surrendered — so the claim has thrown away relief on £5,000." },
            { label: "Carry back 12 months", detail: "The previous 12 months is the year ended 31 March 2025. Total profits before QCDs = £60,000 + £20,000 = £80,000. Relieve £80,000 of the loss there. Remaining loss: £130,000 − £80,000 = £50,000. That year's £5,000 of QCDs is wasted too." },
            { label: "Check how far back the carry back reaches", detail: "Only 12 months, so the year ended 31 March 2024 is out of reach for an ordinary carry back — it would be available only under terminal loss relief, and the trade has not ceased. So its £110,000 of total profits cannot be touched." },
            { label: "Carry the balance forward", detail: "The remaining £50,000 is carried forward against the total profits of the year to 31 March 2027 and later. Partial claims ARE permitted for brought-forward losses, so Buttermere can restrict the claim in a future year to preserve its QCDs — which is a real advantage over the current period claim." },
            { label: "Total the cost of the waste", detail: "£10,000 of QCDs wasted across two years. At the marginal rate that is a genuine cost, and it is the figure to weigh against the cash flow benefit of relieving the loss now rather than later." },
          ],
          result:
            "**£20,000 relieved currently, £80,000 carried back to the year ended 31 March 2025, and £50,000 carried forward — with £10,000 of QCDs wasted.** The waste is the point: relief obtained early costs the QCDs, and a partial claim is only possible on the carry forward.",
        },
      ],
      check: {
        q: "Can a company carry a trading loss back without first making a current period claim?",
        options: [
          "Yes, the two claims are independent",
          "No — a current period claim against total profits is required first, and it is all or nothing",
          "Yes, provided the loss exceeds £50,000",
          "Only where the trade has ceased",
        ],
        correct: 1,
        explain:
          "A CURRENT PERIOD CLAIM IS REQUIRED FIRST, and it cannot be restricted. So a company cannot preserve the current period's profits and QCDs in order to carry the whole loss back — the sequence is fixed, and any waste of current period QCDs is unavoidable if a carry back is wanted.",
      },
    },
    {
      id: "other-losses",
      heading: "Property and capital losses",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "A property business loss is relieved COMPULSORILY",
          md: "Unlike a trading loss, a company's property business loss is **automatically** set against **total profits** of the **current** accounting period — there is **no claim to make and no choice**. Any excess is then **carried forward** against future total profits, and it is also available for **group relief**.\n\nTwo further points: there is **no carry back** at all for a property loss, and **property losses are set off BEFORE trading losses** where a company has both. So the compulsory relief happens first and may itself waste QCDs, before any trading loss decision is even reached.\n\nAs with trading losses, partial claims are **not** allowed in the current period but **are** allowed for amounts brought forward.",
        },
        {
          kind: "table",
          caption: "The three loss types side by side",
          head: ["", "Trading loss", "Property loss", "Capital loss"],
          rows: [
            ["**Current period**", "Against total profits, **optional**", "Against total profits, **COMPULSORY**", "Against **gains only**, automatic"],
            ["**Carry back**", "12 months LIFO (36 on cessation)", "**None**", "**None**"],
            ["**Carry forward**", "Against future total profits", "Against future total profits", "Against future **gains only**"],
            ["**Group relief**", "**Yes**, current period losses", "**Yes**", "**No**"],
            ["**Order of set-off**", "After property losses", "**First**", "Within the gains computation"],
          ],
        },
        {
          kind: "list",
          title: "How to answer a company loss question",
          items: [
            "Set out the years in **columns**, with a separate working tracking how much loss has been used and how much remains — the same discipline as an individual's loss question.",
            "Where the question says relief **as early as possible**: current period claim, then carry back 12 months (or 36 on cessation), then carry forward the balance.",
            "Where the question asks for the **options and their tax savings**, consider three: carry forward only; current period then carry forward; current period, then carry back, then carry forward.",
            "For **each** option, identify the tax saved, the **QCDs wasted**, and the **cash flow** effect. Those three together are the answer to \"which should the company choose\".",
            "Watch the **marginal relief** interaction: relieving a loss can drop augmented profits from the main rate band into the marginal relief band, so the tax saved per pound of loss is not constant.",
          ],
        },
      ],
      check: {
        q: "How is a company's property business loss relieved in the current period?",
        options: [
          "By optional claim against total profits",
          "Compulsorily against total profits, before any trading loss and with no claim required",
          "Against property income only",
          "It must be carried forward",
        ],
        correct: 1,
        explain:
          "COMPULSORILY AND FIRST. There is no claim and no choice: the loss is automatically set against total profits of the current period, ahead of any trading loss. Any excess carries forward against future total profits, and there is no carry back at all.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Carrying a company's trading loss back a full tax year.",
      fix: "The carry back is 12 months on a LIFO basis, apportioned where it spans two periods.",
    },
    {
      trap: "Carrying a loss back without a current period claim.",
      fix: "The current period claim is compulsory first, and cannot be restricted.",
    },
    {
      trap: "Restricting a current period claim to preserve QCDs.",
      fix: "Current period claims are all or nothing; only brought-forward claims can be partial.",
    },
    {
      trap: "Treating a property loss as optional.",
      fix: "It is relieved compulsorily against current period total profits, before any trading loss.",
    },
    {
      trap: "Ignoring wasted QCDs when comparing options.",
      fix: "Quantify them. They cannot be carried forward, carried back or surrendered.",
    },
  ],
  keyTerms: [
    { term: "Total profits", def: "Profits from all sources before QCDs; the target for a company's trading and property loss reliefs." },
    { term: "LIFO carry back", def: "Relieving against the later of the previous periods first." },
    { term: "Terminal loss relief", def: "Carry back over the previous 36 months, available only where the trade ceases." },
    { term: "Compulsory relief", def: "The automatic set-off of a property business loss against current period total profits." },
  ],
  summary: [
    "A company's trading loss goes against TOTAL profits, not just trading profits.",
    "Carry back is 12 months on a LIFO basis, and requires a current period claim first.",
    "Terminal loss relief extends the carry back to 36 months where the trade ceases.",
    "Property losses are relieved compulsorily against current period total profits, before trading losses, with no carry back.",
    "Capital losses go against gains only, and QCDs wasted by a loss claim are lost entirely.",
  ],
  knowledgeDiagnostic: [
    { q: "Against what are a company's trading losses relieved?", a: "Total profits before qualifying charitable donations — so they can absorb property income, interest and chargeable gains." },
    { q: "How long is the carry back, and on what basis?", a: "Twelve months on a LIFO basis, extended to thirty-six months where the trade ceases." },
    { q: "What must happen before a carry back claim?", a: "A current period claim against total profits, which is all or nothing." },
    { q: "How does a property business loss differ from a trading loss?", a: "It is relieved compulsorily against current period total profits, is set off before trading losses, and cannot be carried back at all." },
    { q: "Why do wasted QCDs matter when choosing a loss relief?", a: "Because they cannot be carried forward, carried back or surrendered, so the relief on them is lost permanently." },
  ],
}

/* ── Chapter 25 · E5 ──────────────────────────────────────────── */

export const TX_TREE_25: StudyChapter = {
  id: "TX-25",
  number: 25,
  paper: "TX",
  area: "E",
  title: "Groups of companies",
  minutes: 18,
  syllabusRefs: ["E5(a)", "E5(b)"],
  intro:
    "Two different groups, both defined at 75%, doing two different jobs. And a third relationship at 51% that decides the rate. Confusing the three is the whole difficulty.",
  outcomes: [
    "Define a 75% group relief group and identify its members",
    "Compute group relief, including for corresponding accounting periods",
    "Define a 75% chargeable gains group",
    "Explain the reliefs available to a gains group",
    "Distinguish the 51% relationship used for the rate limits",
  ],
  sections: [
    {
      id: "group-relief",
      heading: "The 75% group relief group",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Three relationships, three purposes",
          md: "**51% — associated companies.** Divides the £50,000 and £250,000 rate limits and the £1,500,000 instalment threshold (chapters 3 and 22).\n\n**75% — group relief group.** Allows current period **losses** to be surrendered between members.\n\n**75% — chargeable gains group.** Allows **assets** to be transferred at no gain, no loss, and rollover relief to be claimed on a group basis.\n\nThe two 75% groups are defined slightly differently and can have different members, which is why they are separate concepts rather than one. A question naming several companies with various shareholdings is usually asking you to identify all three sets.",
        },
        {
          kind: "formula",
          name: "Group relief",
          expr: "A 75% GROUP RELIEF GROUP:\n   ·  the parent owns at least 75% of a subsidiary, DIRECTLY or INDIRECTLY\n   ·  where held indirectly, MULTIPLY the percentages down the chain and\n      the EFFECTIVE interest must be at least 75%\n\nWHAT MAY BE SURRENDERED — the surrendering company's:\n   ·  CURRENT PERIOD trading loss\n   ·  excess property business loss\n   ·  excess QCDs\n   (brought forward trading losses may also be surrendered)\n\nWHAT MAY NOT — a CAPITAL loss.\n\nAMOUNT OF RELIEF  =  the LOWER of:\n   ·  the available loss of the surrendering company, and\n   ·  the TAXABLE TOTAL PROFITS of the claimant company\n\nFor CORRESPONDING ACCOUNTING PERIODS: where the periods do not\ncoincide, restrict BOTH figures to the OVERLAPPING period and take\nthe lower of the two restricted amounts.",
          note: "Group relief is optional, may be a PARTIAL claim of any amount, and is claimed within two years of the end of the claimant's accounting period. That flexibility is its main advantage over a company's own current period claim, which is all or nothing.",
        },
        {
          kind: "example",
          title: "Group relief across non-coterminous periods",
          scenario:
            "Ullswater Ltd owns 80% of Derwent Ltd. Ullswater prepares accounts to 31 March and Derwent to 30 September. For the year ended 30 September 2026 Derwent has a trading loss of £140,000. For the year ended 31 March 2026 Ullswater has taxable total profits of £95,000.",
          steps: [
            { label: "Confirm the group exists", detail: "Ullswater holds 80% of Derwent, which is at least 75%, so they form a group relief group and losses may be surrendered between them." },
            { label: "Identify the overlapping period", detail: "Derwent's loss period runs 1 October 2025 to 30 September 2026. Ullswater's period runs 1 April 2025 to 31 March 2026. They overlap from 1 October 2025 to 31 March 2026 — six months." },
            { label: "Restrict the surrendering company's loss", detail: "Derwent's loss for the overlap = £140,000 × 6/12 = £70,000. Only the portion of the loss falling in the overlap can be surrendered to this period." },
            { label: "Restrict the claimant's profits", detail: "Ullswater's TTP for the overlap = £95,000 × 6/12 = £47,500. Only profits arising in the overlap can absorb the loss." },
            { label: "Take the lower", detail: "The relief is the lower of £70,000 and £47,500, so £47,500 may be surrendered and claimed. Both restrictions must be applied — using either figure unrestricted overstates the relief." },
            { label: "Deal with the remainder", detail: "Derwent's remaining £92,500 of loss can be relieved against its own total profits, carried back 12 months, carried forward, or surrendered to Ullswater's year ended 31 March 2027 to the extent it falls in that overlap. Group relief does not displace the surrendering company's own options." },
          ],
          result:
            "**£47,500 of group relief.** Both the loss and the profits must be restricted to the six-month overlap, and the answer is the lower of the two restricted figures — the single most examinable point in the chapter.",
        },
      ],
      check: {
        q: "A surrendering company's loss for the overlapping period is £70,000 and the claimant's TTP for that period is £47,500. How much group relief is available?",
        options: [
          "£70,000, the whole restricted loss",
          "£47,500 — the lower of the two restricted figures",
          "£117,500, the total",
          "£35,000, half of each",
        ],
        correct: 1,
        explain:
          "£47,500. Group relief is the LOWER of the surrendering company's available loss and the claimant's taxable total profits, both restricted to the overlapping period. Relief cannot exceed the profits available to absorb it.",
      },
    },
    {
      id: "gains-group",
      heading: "The 75% chargeable gains group",
      blocks: [
        {
          kind: "formula",
          name: "Defining a gains group",
          expr: "A 75% CHARGEABLE GAINS GROUP comprises:\n\n   ·  the PARENT company, and\n   ·  its 75% subsidiaries, and\n   ·  the 75% subsidiaries of those subsidiaries, and so on\n\nBUT the parent must have an EFFECTIVE interest of MORE THAN 50% in\nEVERY company in the group.\n\nA company that is itself a 75% subsidiary CANNOT be the parent of a\nseparate gains group — so each company belongs to only ONE gains group.\n\nNote the difference from a group relief group: there the effective\ninterest must be at least 75% throughout; here it need only exceed 50%,\nprovided each link in the chain is at least 75%.",
          note: "The two tests differ, so the two groups can have different members. A 75%–75% chain gives an effective interest of 56.25%: enough for a GAINS group, because each link is 75% and the effective interest exceeds 50%, but NOT enough for a group relief group, which needs 75% effective. That distinction is regularly examined.",
        },
        {
          kind: "list",
          title: "What a gains group allows",
          items: [
            "**Intra-group transfers at no gain, no loss.** Automatic and mandatory — no claim is needed. The transfer is deemed to take place at a price giving neither gain nor loss, being the original cost plus indexation to the date of transfer or December 2017 if earlier, and that figure becomes the acquiring company's cost.",
            "**Matching gains with losses.** Because assets move freely and tax-free, a group can transfer an asset to whichever company has capital losses available before selling it outside the group. This is how a gains group works round the rule that a capital loss cannot be surrendered.",
            "**Rollover relief on a group basis.** One company can dispose of a qualifying asset and another reinvest, and the group is treated as a single entity — so the relief is not lost merely because the replacement was bought by a different member.",
            "**When the asset leaves the group**, a chargeable gain or allowable loss arises in the normal way in the company that sells it, computed from the cost it inherited on the intra-group transfer.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to answer a group question",
          md: "Draw the **structure** first, with the percentages on it. Then work out the **three** sets separately and say which companies are in each:\n\n· **51% associates** — for the rate limits and the instalment threshold. Count every company under common control, including **overseas** ones and excluding **dormant** ones.\n· **75% group relief group** — multiply down the chain and require **75% effective**.\n· **75% gains group** — require **75% at each link** and **more than 50% effective**.\n\nThen answer what was asked. A question that gives a 75%–75% chain is almost certainly testing that the sub-subsidiary is in the gains group but **not** in the group relief group, and identifying that is where the marks are.",
        },
      ],
      check: {
        q: "A owns 75% of B, and B owns 75% of C. Which groups include C?",
        options: [
          "Both the group relief group and the gains group",
          "The gains group only — each link is 75% and the effective interest of 56.25% exceeds 50%, but it is below the 75% effective interest a group relief group requires",
          "The group relief group only",
          "Neither",
        ],
        correct: 1,
        explain:
          "THE GAINS GROUP ONLY. A's effective interest in C is 75% × 75% = 56.25%. A gains group needs 75% at each link and more than 50% effective, both of which are met. A group relief group needs 75% EFFECTIVE, which 56.25% fails. This is the classic test of the difference between the two definitions.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using one 75% definition for both groups.",
      fix: "Group relief needs 75% effective; a gains group needs 75% at each link and over 50% effective.",
    },
    {
      trap: "Failing to restrict both figures to the overlapping period.",
      fix: "Restrict the loss AND the claimant's profits, then take the lower.",
    },
    {
      trap: "Surrendering a capital loss as group relief.",
      fix: "Capital losses cannot be surrendered. Transfer the asset to the loss company instead.",
    },
    {
      trap: "Using 75% for the rate limits.",
      fix: "The limits are divided by the number of 51% associated companies.",
    },
    {
      trap: "Treating an intra-group asset transfer as needing a claim.",
      fix: "It is automatic and mandatory at no gain, no loss.",
    },
  ],
  keyTerms: [
    { term: "Group relief group", def: "Companies with a 75% effective relationship, able to surrender current period losses." },
    { term: "Chargeable gains group", def: "Companies linked by 75% holdings with the parent holding over 50% effectively, able to transfer assets at no gain, no loss." },
    { term: "Corresponding accounting periods", def: "The overlapping part of two non-coterminous periods, to which both the loss and the profits are restricted." },
    { term: "Associated company", def: "A 51% relationship, used for the rate limits and the instalment threshold rather than for group relief." },
  ],
  summary: [
    "51% decides the rate limits, 75% effective decides group relief, and 75% per link with over 50% effective decides a gains group.",
    "Group relief is the lower of the surrendering company's loss and the claimant's TTP, both restricted to the overlap.",
    "Group relief may be partial and is optional; a capital loss can never be surrendered.",
    "Intra-group asset transfers are automatically at no gain, no loss, and rollover relief works across a gains group.",
    "A 75%–75% chain puts the sub-subsidiary in the gains group but not the group relief group.",
  ],
  knowledgeDiagnostic: [
    { q: "What may be surrendered as group relief?", a: "Current period trading losses, excess property losses and excess QCDs — and brought forward trading losses. Not capital losses." },
    { q: "How is group relief computed for non-coterminous periods?", a: "Restrict both the loss and the claimant's TTP to the overlapping period, then take the lower of the two." },
    { q: "What is the effective interest test for a gains group?", a: "Each link must be at least 75%, and the parent's effective interest in every group company must exceed 50%." },
    { q: "How does a gains group work round the rule that capital losses cannot be surrendered?", a: "By transferring the asset at no gain, no loss to the company holding the capital losses before selling it outside the group." },
    { q: "Which relationship divides the £50,000 and £250,000 limits?", a: "The 51% associated company relationship, not either of the 75% groups." },
  ],
}

export const TX_TREE_AREA_E_PART2: StudyChapter[] = [TX_TREE_23, TX_TREE_24, TX_TREE_25]
