import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-GLOBAL · Area D — transfers of wealth and estates. Chapters 12–13.
 *
 * A tax on wealth transfers has to solve a problem no other tax faces: the base can be
 * given away in slices over decades, so a charge that looked only at each transfer in
 * isolation would collect nothing. Cumulation is the answer nearly every jurisdiction
 * reaches for, and understanding it is most of this area.
 *
 * Jurisdiction-neutral. Whether a country taxes the DONOR on what they give or the DONEE
 * on what they receive, whether the charge falls in life or only on death, and what the
 * nil-rate amount and reliefs are, all differ. The cumulative mechanism, the seven-year
 * style lookback, the valuation principles and the interaction with a gains tax do not.
 */

/* ── Chapter 12 ────────────────────────────────────────────────── */

export const TXG_TREE_12: StudyChapter = {
  id: "TXG-12",
  number: 12,
  paper: "TX",
  area: "D",
  title: "Taxing lifetime transfers: cumulation and the loss to the donor",
  minutes: 18,
  intro:
    "A wealth transfer tax that ignored history would be avoided in an afternoon: give everything away in small parcels and the charge never bites. Cumulation is the structural answer, and almost every rule in this area follows from it.",
  outcomes: [
    "Explain why a transfer tax must be cumulative to work at all",
    "Measure a transfer by the loss to the donor's estate rather than the gain to the donee",
    "Apply a nil-rate amount against cumulated transfers in chronological order",
    "Distinguish transfers chargeable in life from those chargeable only on death",
    "Identify the main exemptions and explain the purpose of each",
  ],
  sections: [
    {
      id: "cumulation-and-measurement",
      heading: "Why cumulation exists, and how a transfer is measured",
      blocks: [
        {
          kind: "text",
          md: "This is a **jurisdiction-neutral foundation track, not an ACCA exam variant**. Wealth transfer taxes vary more between countries than any other tax in this track — some charge the giver, some the receiver, some only on death, and several jurisdictions have abolished the charge entirely. What is common is the set of problems the tax must solve, and the standard solutions.\n\nStart with the fundamental design problem. A tax charged on each gift separately, with a tax-free amount for each, is defeated immediately: split a fortune into enough parcels and every one falls under the threshold.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Cumulation: every transfer is taxed in the light of the ones before it",
          md: "The solution is to give each person a **single running total** rather than a fresh allowance per gift. A nil-rate amount — a cumulative slice taxed at zero — is set against transfers **in chronological order**, and once it is used, later transfers are taxed.\n\nTwo refinements make it workable. Most systems apply a **lookback period**: only transfers within, say, the last seven years are cumulated, so the running total gradually clears as old gifts drop out. And many charge lifetime gifts at a **lower rate** than transfers on death, or defer the charge on gifts entirely unless the donor dies within the lookback period — the reasoning being that a genuine lifetime gift, made and survived, is a different act from a deathbed transfer.\n\nEverything else in this chapter follows from cumulation. It is why the ORDER of gifts matters, why the date of each gift matters, and why the answer to \"what tax is due on this gift?\" always begins with \"what has this person already given?\"",
        },
        {
          kind: "formula",
          name: "Measuring a transfer: the loss to the donor",
          expr: "TRANSFER OF VALUE  =  value of the estate BEFORE the transfer\n                      LESS value of the estate AFTER the transfer\n\nThis is the LOSS TO THE DONOR, not the gain to the recipient,\nand the two can differ substantially.\n\nThen:\n     Transfer of value                              X\n     less  available EXEMPTIONS                    (X)\n                                                  -----\n           CHARGEABLE TRANSFER                      X\n     add   transfers already cumulated in the\n           lookback period                          X\n                                                  -----\n           CUMULATIVE TOTAL                         X\n\n     Apply the NIL-RATE amount to the cumulative total in\n     chronological order; tax the excess at the stated rate.\n\nIf the DONOR bears the tax, the transfer must be GROSSED UP,\nbecause paying the tax is itself a further loss to the estate.",
          note: "The loss-to-donor measure is not a technicality — it is what makes the tax hard to avoid. Giving away a controlling shareholding illustrates it: a 51% holding may be worth far more than 51% of the company, so transferring enough shares to drop from control to a minority costs the donor much more than the recipient gains. Measuring the loss captures that; measuring the gain would not.",
        },
        {
          kind: "example",
          title: "Cumulation and the loss to the donor working together",
          scenario:
            "Jurisdiction Z taxes lifetime gifts, cumulating transfers made in the previous seven years, with a nil-rate amount of CU 300,000 and a lifetime rate of 20% on the excess. Ilse owns 6,000 of the 10,000 shares in Brandt Ltd. A 60% holding is valued at CU 90 per share, a 40% holding at CU 60 per share, and a 20% holding at CU 40 per share. Five years ago she made a chargeable gift of CU 250,000 after exemptions. She now gives 2,000 shares to her son, and agrees to pay any tax herself.",
          steps: [
            { label: "Value the estate before the transfer", detail: "She holds 6,000 shares, a 60% controlling holding, at CU 90 each = CU 540,000." },
            { label: "Value the estate after the transfer", detail: "She retains 4,000 shares, a 40% holding, at CU 60 each = CU 240,000. The per-share value has fallen because control has been lost." },
            { label: "Measure the transfer as the loss to the donor", detail: "CU 540,000 − CU 240,000 = CU 300,000. Note the contrast with the gain to the recipient: the son received a 20% holding worth 2,000 × CU 40 = CU 80,000. The loss to the donor is nearly four times the gain to the donee, and it is the loss that is taxed." },
            { label: "Bring in the cumulative total", detail: "The gift five years ago falls within the seven-year lookback, so CU 250,000 is cumulated. Running total before this gift: CU 250,000. Remaining nil-rate amount: CU 300,000 − CU 250,000 = CU 50,000." },
            { label: "Apply the nil-rate amount and compute the tax", detail: "Of the CU 300,000 transfer, CU 50,000 is covered by the remaining nil-rate amount, leaving CU 250,000 chargeable at 20% = CU 50,000 of tax." },
            { label: "Gross up, because the donor pays", detail: "Ilse paying the tax is itself a further reduction in her estate, so the transfer must be grossed up. The net chargeable amount of CU 250,000 grosses to CU 250,000 × 100/80 = CU 312,500, and the tax is CU 312,500 × 20% = CU 62,500. Had the SON agreed to pay the tax, no grossing up would be needed and the charge would have been CU 50,000." },
          ],
          result:
            "**Tax of CU 62,500, on a transfer measured at CU 300,000 rather than the CU 80,000 the son received.** Two mechanisms did the work: the loss-to-donor measure captured the value destroyed by giving up control, and cumulation meant the earlier gift had already consumed most of the nil-rate amount. Who pays the tax then changed the answer by CU 12,500.",
        },
      ],
      check: {
        q: "Why is a lifetime transfer measured by the loss to the donor's estate rather than by what the recipient gains?",
        options: [
          "Because the recipient's gain is harder to value",
          "Because it captures value destroyed by the transfer itself, such as the loss of a control premium",
          "Because the recipient may be non-resident",
          "Because the donor is the person legally liable",
        ],
        correct: 1,
        explain:
          "IT CAPTURES WHAT THE GIFT ACTUALLY COSTS. Giving away enough shares to lose control reduces the donor's holding by far more than the recipient receives, because the remaining shares lose their control premium. Measuring the gain to the donee would let that lost value escape entirely.",
      },
    },
    {
      id: "exemptions-and-reliefs",
      heading: "Exemptions, reliefs and the charge that only bites on death",
      blocks: [
        {
          kind: "table",
          caption: "The exemptions that recur across jurisdictions, and why each exists",
          head: ["Exemption", "Typical shape", "The reason for it"],
          rows: [
            ["**Spouse or partner**", "Unlimited, or capped where the recipient is non-resident", "A couple is treated as one economic unit; taxing transfers between them would tax an ordinary arrangement of household affairs"],
            ["**Annual allowance**", "A modest yearly amount, sometimes carried forward one year", "Removes ordinary family giving from the system entirely, which is an administrative saving far larger than the revenue foregone"],
            ["**Small gifts**", "A per-recipient limit for outright gifts", "Birthdays and similar. Charging them would be unenforceable and absurd"],
            ["**Normal expenditure out of income**", "Unlimited, if habitual, from income, and leaving the donor's standard of living intact", "Distinguishes giving away CAPITAL, which the tax targets, from spending income, which it does not"],
            ["**Marriage or civil partnership**", "A stated amount, often varying with the giver's relationship", "A recognised social occasion where transfers are customary"],
            ["**Charity and public benefit**", "Unlimited", "Taxing it would simply reduce what the charity receives"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Normal expenditure out of income is the most valuable and most misunderstood exemption",
          md: "It is unlimited, which no other lifetime exemption is — and it is regularly missed because it has three conditions that must all hold.\n\n**It must be part of a pattern**, rather than a one-off. Regular payments — an annual sum to a child, premiums on a policy for someone else — qualify; a single large gift does not, however affordable.\n\n**It must come out of INCOME, not capital.** Selling an asset to fund a gift fails, even if the donor's income is large.\n\n**It must leave the donor able to maintain their usual standard of living** from the remaining income. Giving away so much that capital must be drawn on to live fails the test.\n\nThe purpose is coherent: a wealth transfer tax is aimed at the passing on of accumulated capital. Somebody who gives away part of their surplus income each year, and still lives as they always did, is not depleting an estate — they are simply consuming less. That is why the exemption is unlimited, and why an answer that identifies it correctly in a scenario of regular payments earns more than one that reaches for the small annual allowance.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Business and agricultural property reliefs exist to stop the tax destroying the asset",
          md: "Most systems give a substantial reduction — often 50% or 100% — for transfers of a trading business, an interest in one, or agricultural land in use.\n\nThe justification is practical rather than generous. A farm or a family manufacturer may be worth a great deal on paper while generating little cash. A full charge on the owner's death would frequently have to be met by **selling or breaking up the business** — destroying employment and productive capacity to collect the tax. The relief keeps the enterprise intact.\n\nThe conditions follow directly from that purpose, and they are what scenarios test. There is normally a **minimum ownership period**, so the relief cannot be bought at the last moment by moving cash into qualifying assets. Relief is usually denied to businesses **wholly or mainly dealing in investments**, because holding a portfolio is not the productive activity the relief protects. And **excepted assets** — cash or investments held in the business but not used in it — are typically stripped out of the relieved value.",
        },
        {
          kind: "list",
          title: "Transfers that are chargeable only if the donor dies within the lookback period",
          items: [
            "**The design.** Many systems treat an outright gift between individuals as **potentially exempt**: no tax at the time, and none ever if the donor survives the lookback period. Only if they die within it does the gift become chargeable and enter the cumulation.",
            "**Why it is designed that way.** It distinguishes genuine lifetime giving, made and lived with, from transfers made in contemplation of death that are really a way of passing an estate untaxed. Surviving the period is treated as evidence of the former.",
            "**Tapering.** Where the donor dies within the period, many jurisdictions taper the charge according to how long they survived — a gift six years before death bears far less than one six months before. The taper usually reduces the TAX, not the transfer value, which matters because the value still cumulates in full against later transfers.",
            "**Gifts with reservation.** A gift where the donor continues to enjoy the asset — giving away a house and going on living in it rent-free — is typically ignored, so the asset remains in the estate. Otherwise the exemption would be available to anyone willing to sign a document while changing nothing.",
            "**The record-keeping consequence.** Because a gift may become chargeable years later, the date and value of every substantial gift must be recorded at the time. Executors who cannot reconstruct the gift history cannot compute the estate, which is a practical point worth making in an advisory answer.",
          ],
        },
      ],
      check: {
        q: "A donor makes regular annual gifts from surplus salary, still living exactly as before. Which exemption is most valuable here?",
        options: [
          "The small gifts exemption",
          "The annual allowance",
          "Normal expenditure out of income, which is unlimited if the pattern, income and standard-of-living conditions are met",
          "The marriage exemption",
        ],
        correct: 2,
        explain:
          "IT IS THE ONLY UNLIMITED LIFETIME EXEMPTION. Regular gifts, funded from income rather than capital, that leave the donor's usual standard of living intact fall outside the charge entirely — with no cap. Reaching for the modest annual allowance instead throws away most of the relief available.",
      },
    },
  ],
  examTraps: [
    { trap: "Valuing a gift by what the recipient received.", fix: "Measure the LOSS TO THE DONOR — estate before less estate after. Where control is given up, the loss can far exceed the gain." },
    { trap: "Giving each gift a fresh nil-rate amount.", fix: "The nil-rate amount is CUMULATIVE and applied in chronological order. Earlier transfers in the lookback period consume it first." },
    { trap: "Forgetting to gross up when the donor pays the tax.", fix: "The tax paid is itself a further loss to the estate, so the chargeable amount must be grossed up. If the recipient pays, no grossing up arises." },
    { trap: "Applying only the annual allowance to a pattern of regular gifts.", fix: "Test normal expenditure out of income first — it is unlimited, and it needs a pattern, income as the source, and an unchanged standard of living." },
    { trap: "Assuming a business qualifies for relief because it is a company.", fix: "Check the minimum ownership period, exclude businesses mainly holding investments, and strip out excepted assets not used in the business." },
  ],
  keyTerms: [
    { term: "Cumulation", def: "Aggregating transfers over a lookback period so a single nil-rate amount is shared across them chronologically, rather than given afresh for each gift." },
    { term: "Transfer of value", def: "The loss to the donor's estate — its value before the transfer less its value afterwards." },
    { term: "Nil-rate amount", def: "A cumulative slice of transfers charged at zero, applied in chronological order before any tax arises." },
    { term: "Grossing up", def: "Increasing the chargeable amount where the DONOR bears the tax, because paying it is itself a further reduction in the estate." },
    { term: "Potentially exempt transfer", def: "A lifetime gift that becomes chargeable only if the donor dies within the lookback period, and is exempt if they survive it." },
    { term: "Taper relief", def: "A reduction in the tax, not the transfer value, according to how long the donor survived a gift that has become chargeable." },
    { term: "Gift with reservation", def: "A gift where the donor keeps the benefit of the asset, typically ignored so the asset stays in the estate." },
    { term: "Excepted assets", def: "Cash or investments held within a business but not used in it, stripped out before business property relief is computed." },
  ],
  summary: [
    "A transfer tax must cumulate, or it is defeated by splitting an estate into small gifts.",
    "Transfers are measured by the LOSS TO THE DONOR, which captures value destroyed such as a lost control premium.",
    "The nil-rate amount is applied to cumulated transfers in chronological order, and a lookback period lets old gifts drop out.",
    "Where the donor pays the tax the transfer is grossed up, because paying it further reduces the estate.",
    "Normal expenditure out of income is the only unlimited lifetime exemption and requires a pattern, income as the source, and an unchanged standard of living.",
    "Business and agricultural reliefs stop the tax forcing the sale of productive assets, and their conditions follow from that purpose.",
    "Potentially exempt transfers become chargeable only on death within the lookback period, often with tapered tax.",
  ],
}

/* ── Chapter 13 ────────────────────────────────────────────────── */

export const TXG_TREE_13: StudyChapter = {
  id: "TXG-13",
  number: 13,
  paper: "TX",
  area: "D",
  title: "The death estate: valuation, liabilities and interaction with other taxes",
  minutes: 18,
  intro:
    "Death is the event every wealth transfer tax is ultimately built around. Computing the estate is mostly a valuation exercise — and the interaction with a gains tax is where the genuinely interesting planning sits.",
  outcomes: [
    "Compute a death estate from assets, liabilities and reliefs",
    "Apply the general valuation rule and the special rules for jointly held and quoted property",
    "Identify which liabilities and expenses are deductible from an estate",
    "Explain how the nil-rate amount is applied on death after lifetime cumulation",
    "Explain the interaction between a wealth transfer tax and a capital gains tax on death",
  ],
  sections: [
    {
      id: "computing-the-estate",
      heading: "What is in the estate, and what comes out of it",
      blocks: [
        {
          kind: "formula",
          name: "The death estate computation",
          expr: "     Free estate -- all property owned at death,\n     valued at OPEN MARKET VALUE at the date of death:\n           land and buildings                        X\n           quoted and unquoted investments           X\n           business interests                        X\n           cash, chattels, personal effects          X\n           the deceased's share of JOINT property    X\n                                                  -----\n           GROSS ESTATE                              X\n\n     less  DEBTS owed at death (mortgages, loans,\n           outstanding tax, unpaid bills)           (X)\n     less  FUNERAL expenses                         (X)\n                                                  -----\n           NET ESTATE                                X\n\n     less  EXEMPT legacies (spouse, charity)        (X)\n     less  RELIEFS (business, agricultural)         (X)\n                                                  -----\n           CHARGEABLE ESTATE                          X\n\n     Apply the nil-rate amount REMAINING after lifetime\n     cumulation, and tax the excess at the death rate.",
          note: "The order is what makes the computation work. Exempt legacies come out AFTER debts, because a debt reduces what everybody receives, and reliefs are applied to the assets that qualify for them rather than across the estate. Where an estate is left partly to a spouse and partly to others, which assets carry the reliefs can change the tax substantially — and a badly drafted will can waste relief entirely by leaving the qualifying business to the exempt spouse.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The valuation rule, and the two exceptions worth knowing",
          md: "The general rule is **open market value at the date of death**: the price the property would fetch if sold in the open market, with no reduction for the fact that everything is being sold at once. That last clause matters — an estate containing a large shareholding cannot argue the price down because flooding the market would depress it.\n\n**Jointly held property** is the first exception. The deceased's share enters the estate, but many systems allow a **discount** — commonly around ten per cent — for a share in property occupied by the other owner, on the realistic ground that nobody will pay full value for a half share in a house somebody else lives in and cannot be made to leave.\n\n**Quoted investments** are the second. Rather than a single price, most systems prescribe a formula from the day's quoted range, and some allow relief where investments are actually **sold at a loss shortly after death** — recognising that an estate forced to sell in a falling market should not be taxed on a value it never realised.\n\nBeyond those, the recurring practical point is that valuation is where estates are disputed. Land and unquoted shares have no market price, so they are matters of professional opinion, and a scenario that supplies two valuations is asking you to notice the difference rather than to average them.",
        },
        {
          kind: "list",
          title: "Liabilities: what may be deducted, and what may not",
          items: [
            "**Deductible: debts owed at death**, including mortgages secured on estate property, outstanding tax, credit balances and unpaid bills. The estate is what the deceased actually owned net of what they owed.",
            "**Deductible: funeral expenses**, at a reasonable level. Most systems allow the cost of a funeral appropriate to the deceased's station rather than any amount at all.",
            "**Not deductible: debts the deceased was not legally obliged to pay.** A promise unsupported by consideration is not a debt, which stops estates being reduced by convenient obligations to family members.",
            "**Not deductible in most systems: the costs of ADMINISTERING the estate.** Executors' fees and legal costs arise after death and are the cost of dealing with the estate rather than an obligation of the deceased.",
            "**Restricted: debts owed to family or funded by the deceased.** Many jurisdictions restrict or deny relief where a debt was created artificially, or where borrowed money was used to buy relieved property, to stop the same value being relieved twice."
          ],
        },
        {
          kind: "example",
          title: "Computing a death estate with a lifetime history",
          scenario:
            "Bettina dies in Jurisdiction Z, which has a nil-rate amount of CU 300,000 cumulated over seven years, a death rate of 40%, an unlimited spouse exemption, 100% business relief on qualifying trading businesses, and a 10% discount on a share of jointly occupied property. Four years before death she made a chargeable lifetime gift, after exemptions, of CU 120,000. At death she owned: a house held jointly with her sister, who lives there, worth CU 500,000 in total; quoted shares worth CU 180,000; a trading business worth CU 400,000 owned for many years; and cash of CU 60,000. She owed a mortgage of CU 90,000 on the house and CU 4,000 on credit accounts. Funeral costs were CU 6,000. She left the business and CU 40,000 of cash to her husband, and everything else to her nephew.",
          steps: [
            { label: "Value the joint property share", detail: "Her half of the house is CU 250,000, discounted by 10% for a share in property occupied by the co-owner: CU 250,000 × 90% = CU 225,000." },
            { label: "Build the gross estate", detail: "House share CU 225,000 + quoted shares CU 180,000 + business CU 400,000 + cash CU 60,000 = CU 865,000." },
            { label: "Deduct debts and funeral costs", detail: "Mortgage CU 90,000 + credit accounts CU 4,000 + funeral CU 6,000 = CU 100,000. Net estate = CU 865,000 − CU 100,000 = CU 765,000." },
            { label: "Apply business relief to the qualifying asset", detail: "The business qualifies at 100%, so CU 400,000 is relieved. But note it was left to the HUSBAND, who is exempt anyway — so the relief achieves nothing here. Had the business gone to the nephew and the cash to the husband, the relief would have sheltered CU 400,000 of chargeable estate. This is the wasted-relief point, and it is the most valuable observation in the scenario." },
            { label: "Deduct the exempt spouse legacy", detail: "The husband receives the business (CU 400,000, already relieved) and CU 40,000 of cash. Both are exempt transfers." },
            { label: "Identify the chargeable estate", detail: "What passes to the nephew: house share CU 225,000 + quoted shares CU 180,000 + remaining cash CU 20,000 = CU 425,000, less the mortgage and other debts of CU 100,000 borne by that part = CU 325,000 chargeable." },
            { label: "Apply the remaining nil-rate amount", detail: "The gift four years ago used CU 120,000 of the CU 300,000, leaving CU 180,000. Chargeable estate CU 325,000 − CU 180,000 = CU 145,000 taxed at 40% = CU 58,000." },
          ],
          result:
            "**Tax of CU 58,000 — and a will that wasted CU 400,000 of business relief.** The computational answer is the smaller part of what this scenario is asking. Leaving relieved property to an already-exempt spouse throws the relief away, and reversing the two legacies would have removed the charge entirely. Spotting that is what an advisory question is actually testing.",
        },
      ],
      check: {
        q: "A will leaves a fully relieved trading business to the surviving spouse and the remaining assets to a child. What is the problem?",
        options: [
          "None — the spouse exemption and business relief both apply",
          "The business relief is wasted, because the spouse legacy was already exempt; giving the business to the child would shelter chargeable value instead",
          "Business relief cannot apply to a transfer on death",
          "The spouse exemption is lost where business relief applies",
        ],
        correct: 1,
        explain:
          "TWO RELIEFS ARE BEING SPENT ON THE SAME VALUE. The spouse exemption would have covered the business anyway, so the 100% business relief achieves nothing. Directing the business to the non-exempt beneficiary and other assets to the spouse would use both reliefs once each, sheltering far more of the estate.",
      },
    },
    {
      id: "interaction-with-gains-tax",
      heading: "Death, gains tax and the uplift",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The uplift on death, and why it exists",
          md: "In most jurisdictions that charge both a wealth transfer tax and a capital gains tax, **death is not a disposal for gains purposes**. No gains tax arises on the deceased's lifetime growth, and the beneficiaries acquire the assets at **market value at the date of death**.\n\nThe justification is that charging both taxes on the same event would be a double charge on the same value: the estate is already being taxed on the whole worth of the asset, so taxing the growth as well would tax part of it twice.\n\nThe consequence is a substantial and permanent relief. **All the growth during the deceased's lifetime disappears from the gains system for ever.** An asset bought for CU 50,000 and worth CU 500,000 at death passes to the beneficiary with a base cost of CU 500,000, and the CU 450,000 gain is never charged to anyone.\n\nThat interaction drives a great deal of real behaviour, and it is the point a well-informed answer makes.",
        },
        {
          kind: "table",
          caption: "Give it away now, or hold it until death?",
          head: ["", "Lifetime gift", "Retain until death"],
          rows: [
            ["**Gains tax**", "A disposal at MARKET VALUE, so the gain is charged now — unless a deferral relief applies, which passes the gain to the recipient", "NO disposal. The lifetime growth is wiped out and the beneficiary takes market value at death"],
            ["**Wealth transfer tax**", "May fall out of charge entirely if the donor survives the lookback period", "Fully within the estate and charged at the death rate"],
            ["**Cash to pay the tax**", "None received, so the donor must fund the gains tax from elsewhere", "The estate can usually be realised to pay"],
            ["**Who bears the future growth**", "The recipient, from the date of the gift", "The beneficiary, from death"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two taxes point in opposite directions, and that is the whole planning question",
          md: "Giving an asset away in good time can remove it from the estate entirely — but crystallises a gains charge now, with no cash to pay it. Holding it until death wipes out the gain for ever — but leaves the full value in the estate.\n\nThere is no general answer, and a scenario asking which is better wants the trade-off, not a rule. The factors that decide it:\n\n**The relative rates.** Where the death rate substantially exceeds the gains rate, giving away early tends to win; where the gap is narrow, the uplift may be worth more.\n\n**Life expectancy.** Surviving the lookback period is what makes a lifetime gift work. A donor unlikely to survive it gets the worst of both — a gains charge now and the value still cumulated on death.\n\n**Whether a deferral relief is available.** Gift relief can remove the immediate gains cost, which changes the comparison completely — but it passes the gain to the recipient rather than eliminating it, so they lose the uplift too.\n\n**Whether the asset qualifies for business or agricultural relief.** If it is already fully relieved in the estate, there is little wealth-transfer benefit in giving it away, and the uplift argues strongly for retaining it.\n\nA good answer names the client's circumstances that decide it rather than asserting that one route is better.",
        },
        {
          kind: "example",
          title: "Comparing the two routes on the same asset",
          scenario:
            "Marek, aged 78 and in poor health, owns investment property in Jurisdiction Z bought for CU 200,000 and now worth CU 700,000. Z charges gains at 24%, charges wealth transfers at 40% on death, has a seven-year lookback for lifetime gifts, gives no business relief on investment property, and gives a market-value uplift on death. Marek's nil-rate amount is fully used by earlier gifts. He asks whether to give the property to his daughter now.",
          steps: [
            { label: "Cost of giving it away now — gains tax", detail: "A gift is a disposal at market value: CU 700,000 − CU 200,000 = CU 500,000 gain, taxed at 24% = CU 120,000, payable now with no proceeds to fund it. Investment property does not qualify for gift relief in most systems, so the gain cannot be held over." },
            { label: "Benefit of giving it away now — wealth transfer tax", detail: "If Marek survives seven years, CU 700,000 leaves the estate and the CU 280,000 of transfer tax is avoided entirely." },
            { label: "Weigh the probability", detail: "He is 78 and in poor health, so surviving the full lookback is unlikely. If he dies within it the gift becomes chargeable and is cumulated, so the transfer tax largely arises anyway — possibly reduced by taper if he survives several years, but on the value at the date of gift." },
            { label: "Cost of retaining — and what it saves", detail: "On death the property is in the estate: CU 700,000 × 40% = CU 280,000. But NO gains tax arises, the CU 500,000 lifetime gain is wiped out, and his daughter inherits with a base cost of CU 700,000 — so a later sale at that price produces no gain at all." },
            { label: "Compare the realistic outcomes", detail: "Give now and die within the period: CU 120,000 of gains tax PLUS transfer tax on the gift, and the daughter inherits a CU 200,000 base cost. Retain: CU 280,000 of transfer tax, no gains tax, and a CU 700,000 base cost. Retaining is clearly better on these facts." },
          ],
          result:
            "**On these facts he should retain the property.** The decisive combination is his age and health, making the seven-year survival unlikely, and the absence of any deferral relief for investment property, which makes the immediate gains charge unavoidable. Change either fact — a healthy 55-year-old, or a qualifying trading asset — and the recommendation reverses, which is exactly why the answer must be reasoned from the circumstances rather than asserted.",
        },
      ],
      check: {
        q: "An asset bought for CU 100,000 is worth CU 600,000 when its owner dies. What base cost does the beneficiary acquire, in a system with an uplift on death?",
        options: [
          "CU 100,000, the original cost",
          "CU 600,000, the market value at death, with the CU 500,000 lifetime gain never charged",
          "CU 600,000, but the CU 500,000 gain is charged on the estate first",
          "CU 350,000, the average of cost and value",
        ],
        correct: 1,
        explain:
          "THE UPLIFT REMOVES THE LIFETIME GAIN PERMANENTLY. Death is not a disposal for gains purposes, so nothing is charged on the CU 500,000 growth, and the beneficiary starts afresh at CU 600,000. The justification is that the estate is already bearing a wealth transfer charge on the full value.",
      },
    },
  ],
  examTraps: [
    { trap: "Valuing an estate net of what it would fetch in a forced sale.", fix: "Open market value at the date of death applies, with no discount for everything being sold at once — apart from specific rules such as the joint-occupation discount." },
    { trap: "Deducting the executors' fees and administration costs.", fix: "In most systems only debts the deceased owed, plus reasonable funeral expenses, are deductible. Administration costs arise after death." },
    { trap: "Leaving fully relieved property to an exempt spouse without comment.", fix: "The relief is wasted, because the legacy was exempt anyway. Point out that directing it to a non-exempt beneficiary shelters chargeable value instead." },
    { trap: "Charging gains tax on death as well as wealth transfer tax.", fix: "In systems with an uplift, death is not a disposal. The lifetime gain is extinguished and the beneficiary takes market value at death." },
    { trap: "Recommending lifetime gifts as generally better.", fix: "The two taxes pull in opposite directions. Weigh the rates, the donor's likely survival of the lookback period, and whether a deferral relief or business relief is available." },
  ],
  keyTerms: [
    { term: "Free estate", def: "All property the deceased owned outright at death, valued at open market value on that date." },
    { term: "Open market value", def: "The price property would fetch in the open market, without any discount for the whole estate being realised at once." },
    { term: "Joint property discount", def: "A reduction, often around 10%, on the value of a share in property occupied by the co-owner, reflecting what a buyer would actually pay." },
    { term: "Exempt legacy", def: "A gift in a will to a spouse, partner or charity, deducted before the chargeable estate is computed." },
    { term: "Uplift on death", def: "The rule treating beneficiaries as acquiring assets at market value at death, so the deceased's lifetime capital growth is never charged." },
    { term: "Wasted relief", def: "Relief spent on value that was already exempt, typically by leaving business property to an exempt spouse rather than to a chargeable beneficiary." },
  ],
  summary: [
    "The estate is gross assets at open market value, less debts and funeral costs, less exempt legacies and reliefs.",
    "Special valuation rules apply to jointly occupied property and to quoted investments, and unquoted assets are matters of opinion.",
    "Only debts the deceased actually owed, and reasonable funeral costs, are deductible — not administration expenses.",
    "The nil-rate amount available on death is what remains after lifetime cumulation.",
    "Leaving relieved property to an exempt spouse wastes the relief; directing it to a chargeable beneficiary shelters more.",
    "Death is normally not a disposal for gains tax, so the lifetime gain is extinguished and beneficiaries take market value.",
    "Lifetime giving and retention pull against each other; the answer depends on the rates, survival prospects and the reliefs available.",
  ],
}

export const TXG_AREA_D: StudyChapter[] = [TXG_TREE_12, TXG_TREE_13]
