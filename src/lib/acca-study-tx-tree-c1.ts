import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area C, first part — chargeable gains: the computation, and the special rules.
 * Chapters 15–16.
 *
 * ── What changed in FA2025, and why it matters here ──────────────
 * Three CGT figures moved in ways that make recalled numbers dangerous. The annual exempt
 * amount is now £3,000 (it was £12,300 two Finance Acts ago), the rates are 18% and 24%,
 * and business asset disposal relief is taxed at 14% rather than 10%. There is also NO
 * residential property surcharge in FA2025 — a let residential property is taxed at the
 * same 18% and 24% as anything else, which is a change from the 18%/28% many people learnt.
 *
 * ── The loss ordering that decides most computations ─────────────
 * Current year capital losses are set against current year gains COMPULSORILY, even where
 * that wastes the annual exempt amount. Brought forward losses are then used only down to
 * the level of the AEA, so they are never wasted. Getting those two the wrong way round is
 * the single commonest error in Area C, so chapter 15 is built round it.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 15 · C1–C2, C5 ───────────────────────────────────── */

export const TX_TREE_15: StudyChapter = {
  id: "TX-15",
  number: 15,
  paper: "TX",
  area: "C",
  title: "Chargeable gains: the computation and the tax payable",
  minutes: 19,
  syllabusRefs: ["C1(a)", "C1(b)", "C2(a)", "C2(b)", "C2(c)", "C5(a)"],
  intro:
    "One proforma per disposal, then one computation for the year. The marks turn on the order in which losses and the annual exempt amount are used.",
  outcomes: [
    "Describe the scope of capital gains tax and identify exempt assets",
    "Compute the gain or loss on a disposal",
    "Apply current year and brought forward capital losses in the correct order",
    "Compute the capital gains tax payable at the 18% and 24% rates",
    "State the payment dates, including the 60-day rule for UK residential property",
  ],
  sections: [
    {
      id: "scope-and-computation",
      heading: "Scope, exempt assets and the gain on a disposal",
      blocks: [
        {
          kind: "formula",
          name: "The gain on one disposal",
          expr: "Disposal proceeds (or MARKET VALUE on a gift)                  X\nLess incidental costs of DISPOSAL                            (X)\n   legal fees, estate agent's and auctioneer's commission,\n   advertising\n                                                           ─────\nNET PROCEEDS                                                  X\nLess ALLOWABLE COSTS:\n   Original cost, or market value if acquired by gift        (X)\n   Incidental costs of ACQUISITION                           (X)\n   ENHANCEMENT expenditure still reflected in the asset      (X)\n                                                           ─────\nCHARGEABLE GAIN (or allowable loss)                           X\n                                                           ─────\n\nCharged where there is a chargeable PERSON, making a chargeable\nDISPOSAL, of a chargeable ASSET.",
          note: "Enhancement expenditure must still be REFLECTED IN THE ASSET at disposal — so an extension counts but a repair does not, and neither does an improvement that has since been removed. Note also that a gift is a chargeable disposal at MARKET VALUE, so no cash need change hands for a liability to arise.",
        },
        {
          kind: "table",
          caption: "Exempt assets — never a chargeable gain or an allowable loss",
          head: ["Exempt", "Note"],
          rows: [
            ["**Cars**, including vintage and classic cars", "Always exempt, whatever the gain"],
            ["**Gilt-edged securities** and **qualifying corporate bonds**", "The exemption is all TX examines about them"],
            ["**Wasting chattels** — a life of 50 years or less", "But NOT where the asset qualified for **capital allowances**, such as business plant"],
            ["**Non-wasting chattels** bought and sold for **£6,000 or less**", "See chapter 16 for the marginal relief above £6,000"],
            ["Assets held within an **ISA**", "Investment limit £20,000 for 2025/26"],
            ["**NS&I savings certificates** and premium bonds", ""],
            ["**Prizes and betting winnings**", "Not a disposal of an asset"],
            ["A **main residence**", "By private residence relief rather than a true exemption — see chapter 18"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Spouses and connected persons",
          md: "A transfer between **spouses or civil partners** living together is at **NO GAIN, NO LOSS**: any actual proceeds are ignored, the transferor is deemed to dispose at their own acquisition cost, and that figure becomes the transferee's cost. So the gain is not eliminated — it is **deferred** into the recipient's hands, and it crystallises when they eventually sell.\n\nThat makes it the standard planning tool: transferring an asset to a spouse before sale uses **their** annual exempt amount and **their** basic rate band, potentially taxing the gain at 18% rather than 24%.\n\nA transfer to any other **connected person** — a relative, or a company the taxpayer controls — is deemed to take place at **MARKET VALUE**. And a loss arising on a disposal to a connected person is a **clogged loss**: it can only be set against gains on disposals to that **same** connected person.",
        },
      ],
      check: {
        q: "An individual gives an asset worth £90,000, which cost £30,000, to their spouse. What gain arises?",
        options: [
          "£60,000, the increase in value",
          "Nil — the transfer is at no gain, no loss, and the spouse takes over the £30,000 cost",
          "£90,000, the market value",
          "£60,000, but it is exempt",
        ],
        correct: 1,
        explain:
          "NIL, AND THE COST TRANSFERS. Spousal transfers are at no gain, no loss: the transferor is deemed to dispose at their own £30,000 cost, and the spouse acquires at £30,000. The gain is deferred rather than removed, and it arises on the spouse when they sell — which is what makes the transfer a planning tool rather than an escape.",
      },
    },
    {
      id: "losses-and-tax",
      heading: "Losses, the annual exempt amount and computing the tax",
      blocks: [
        {
          kind: "formula",
          name: "The annual computation, in strict order",
          expr: "STEP 1  Total the chargeable GAINS of the tax year.\n\nSTEP 2  Deduct CURRENT YEAR capital losses — COMPULSORY and in FULL,\n        even if this wastes the annual exempt amount.\n\nSTEP 3  Deduct BROUGHT FORWARD capital losses — but ONLY down to the\n        level of the annual exempt amount, so the AEA is never wasted.\n        Any unused balance carries forward again, indefinitely.\n\nSTEP 4  Deduct the ANNUAL EXEMPT AMOUNT of £3,000.\n\nSTEP 5  Tax the result:\n           18%  on so much as falls within the REMAINING basic rate band\n           24%  on the excess\n\n        Remaining basic rate band  =  £37,700  −  TAXABLE INCOME\n        (extended by gross gift aid and pension contributions)",
          note: "Steps 2 and 3 behave differently and that is the point. Current year losses MUST be used and can waste the AEA; brought forward losses are restricted so that they cannot. Reversing the two is the commonest error in the area.",
        },
        {
          kind: "example",
          title: "A full CGT computation",
          scenario:
            "Imogen has taxable income of £30,000 for 2025/26. During the year she made a gain of £42,000 on a disposal of shares and an allowable loss of £9,000 on another disposal. She has capital losses of £6,500 brought forward from an earlier year. None of the disposals was of residential property.",
          steps: [
            { label: "Deduct the current year loss", detail: "£42,000 − £9,000 = £33,000. This is compulsory and in full: Imogen cannot restrict it to preserve her annual exempt amount, and here it does not matter because £33,000 still exceeds £3,000." },
            { label: "Deduct the brought forward loss, but only so far", detail: "Brought forward losses may reduce gains only to the level of the AEA. £33,000 − £3,000 = £30,000 of headroom, and the brought forward loss is only £6,500, so all of it is used: £33,000 − £6,500 = £26,500. Nothing carries forward." },
            { label: "Deduct the annual exempt amount", detail: "£26,500 − £3,000 = £23,500 of taxable gains." },
            { label: "Find the remaining basic rate band", detail: "£37,700 − taxable income of £30,000 = £7,700 of basic rate band still available. Note this uses TAXABLE income, after the personal allowance, not total income." },
            { label: "Apply the rates", detail: "£7,700 at 18% = £1,386. The remaining £23,500 − £7,700 = £15,800 at 24% = £3,792." },
            { label: "Total the capital gains tax", detail: "£1,386 + £3,792 = £5,178, payable by 31 January 2027." },
            { label: "Note the planning point", detail: "Had Imogen transferred some of the shares to a lower-earning spouse before selling, that spouse's own £3,000 AEA and unused basic rate band would have been available, taxing part of the gain at 18% or not at all. The transfer itself would have been at no gain, no loss." },
          ],
          result:
            "**Capital gains tax £5,178.** The order is what matters: the current year loss in full, then the brought forward loss only down to £3,000, then the AEA, then 18% within the remaining band and 24% above it.",
        },
        {
          kind: "table",
          caption: "Payment and reporting",
          head: ["Disposal", "Report and pay"],
          rows: [
            ["Most assets", "Through the tax return; CGT due by **31 January** following the tax year, with **no payments on account**"],
            ["**UK residential property** with a gain not fully exempt", "Report to HMRC and make a **payment on account within 60 DAYS** of completion, then reconcile through the return"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The 60-day rule, and what may be deducted in estimating it",
          md: "A gain on a UK **residential** property that is not fully covered by private residence relief must be **reported within 60 days of completion**, with a **payment on account** of the CGT. The rate is estimated using the taxpayer's expected income for the year — a question will tell you whether they are a basic or higher rate taxpayer, or give an income estimate.\n\nIn arriving at that payment you **may** deduct brought forward capital losses, current year losses already realised **before** the property disposal, and the annual exempt amount. Losses realised **after** the disposal cannot be taken into account, which is why the final position is reconciled through the return.\n\nNote that a case with **more than one** residential property disposal in a tax year is an **excluded topic**, so a question will involve only one.",
        },
      ],
      check: {
        q: "Gains are £40,000, current year losses £5,000 and brought forward losses £40,000. What is the taxable gain, and what carries forward?",
        options: [
          "Nil taxable, with nothing carried forward",
          "Nil taxable, with £8,000 of losses carried forward — brought forward losses are restricted to £32,000 so the £3,000 AEA survives",
          "£3,000 taxable, with £8,000 carried forward",
          "Nil taxable, with £5,000 carried forward",
        ],
        correct: 1,
        explain:
          "NIL TAXABLE, £8,000 CARRIED FORWARD. Current year losses first and in full: £40,000 − £5,000 = £35,000. Brought forward losses then reduce gains only to the AEA level, so only £32,000 of the £40,000 is used, leaving £3,000 of gains. The £3,000 AEA covers that, and the unused £8,000 of losses carries forward again — which is the whole point of the restriction.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Restricting current year losses to preserve the annual exempt amount.",
      fix: "Current year losses are compulsory and in full, even if the AEA is wasted. Only brought forward losses are restricted.",
    },
    {
      trap: "Using total income rather than taxable income to find the remaining basic rate band.",
      fix: "Use taxable income, after the personal allowance and with the band extended for gift aid and pensions.",
    },
    {
      trap: "Applying an 18%/28% split to residential property.",
      fix: "For FA2025 there is no residential surcharge — 18% and 24% apply to all assets.",
    },
    {
      trap: "Treating a gift as producing no disposal.",
      fix: "A gift is a chargeable disposal at market value, unless it is to a spouse or civil partner.",
    },
    {
      trap: "Setting a clogged loss against general gains.",
      fix: "A loss arising on a disposal to a connected person is usable only against gains on disposals to that same person.",
    },
  ],
  keyTerms: [
    { term: "Chargeable disposal", def: "A sale, gift, exchange or loss of an asset; a gift is at market value." },
    { term: "Annual exempt amount", def: "£3,000 for 2025/26, deducted after losses and never wasted by brought forward losses." },
    { term: "Clogged loss", def: "A loss on a disposal to a connected person, usable only against gains on disposals to that person." },
    { term: "No gain, no loss", def: "The basis for spousal transfers: the transferor's cost becomes the transferee's cost." },
    { term: "60-day rule", def: "The requirement to report and pay on account within 60 days of completing a UK residential property disposal." },
  ],
  summary: [
    "A gain is proceeds less disposal costs less cost, acquisition costs and enhancement expenditure.",
    "Current year losses are deducted compulsorily in full; brought forward losses only down to the AEA.",
    "The annual exempt amount is £3,000, then 18% within the remaining basic rate band and 24% above.",
    "Spousal transfers are at no gain, no loss, which defers the gain and makes the transfer a planning tool.",
    "CGT is due by 31 January, except UK residential property which is reported and paid on account within 60 days.",
  ],
  knowledgeDiagnostic: [
    { q: "How do current year and brought forward capital losses differ in treatment?", a: "Current year losses must be deducted in full even if that wastes the annual exempt amount; brought forward losses are restricted so they only reduce gains down to the AEA." },
    { q: "What are the CGT rates for 2025/26?", a: "18% on gains falling within the remaining basic rate band and 24% above it, with no residential property surcharge." },
    { q: "How is a gift to a non-spouse treated?", a: "As a chargeable disposal at market value, so a liability can arise with no cash received." },
    { q: "What is a clogged loss?", a: "A loss on a disposal to a connected person, which may only be set against gains on disposals to that same connected person." },
    { q: "When must a gain on a let UK residential property be reported?", a: "Within 60 days of completion, with a payment on account of the estimated CGT." },
  ],
}

/* ── Chapter 16 · C3 ──────────────────────────────────────────── */

export const TX_TREE_16: StudyChapter = {
  id: "TX-16",
  number: 16,
  paper: "TX",
  area: "C",
  title: "Chargeable gains: part disposals, chattels and wasting assets",
  minutes: 16,
  syllabusRefs: ["C2(d)", "C2(e)", "C3(a)", "C3(b)"],
  intro:
    "Three special computations, each with its own formula and each producing an answer that looks wrong until you check it against the rule.",
  outcomes: [
    "Compute the gain on a part disposal",
    "Identify when a chattel is exempt",
    "Apply the chattels marginal relief",
    "Distinguish wasting from non-wasting chattels and explain the capital allowances exception",
    "Explain the treatment of an asset lost or destroyed",
  ],
  sections: [
    {
      id: "part-disposals",
      heading: "Part disposals",
      blocks: [
        {
          kind: "formula",
          name: "Apportioning cost on a part disposal",
          expr: "Where PART of an asset is disposed of, apportion the ORIGINAL COST:\n\n                            A\n   Cost allocated  =  ─────────  ×  original cost\n                          A + B\n\n   where  A  =  gross proceeds of the part disposed of\n          B  =  MARKET VALUE of the part RETAINED at the date of disposal\n\nThe balance of the cost stays with the retained part and is used when\nthat part is eventually sold.\n\nIncidental costs relating WHOLLY to the part disposed of are deducted\nin full, not apportioned. Only costs relating to the whole asset are\napportioned on the same fraction.",
          note: "Use the market value of the part RETAINED at the date of the part disposal — not its original cost, and not its value at any later date. A question will always give it, and using the wrong figure is the standard error.",
        },
        {
          kind: "example",
          title: "Selling part of a plot of land",
          scenario:
            "Callum bought a plot of land in 2016 for £80,000. In November 2025 he sold part of it for £120,000. The remainder of the plot was worth £60,000 at that date. He incurred legal fees of £2,400 on the sale.",
          steps: [
            { label: "Identify A and B", detail: "A = the proceeds of the part sold = £120,000. B = the market value of the part retained at the date of disposal = £60,000. So A + B = £180,000." },
            { label: "Apportion the cost", detail: "£80,000 × £120,000/£180,000 = £80,000 × 2/3 = £53,333. Two thirds of the cost attaches to the part sold, because that part represents two thirds of the total value at disposal." },
            { label: "Compute the gain", detail: "Proceeds £120,000, less legal fees £2,400 (which relate wholly to this disposal, so they are deducted in full), less apportioned cost £53,333 = £64,267." },
            { label: "Note the cost carried forward", detail: "£80,000 − £53,333 = £26,667 of cost remains attached to the retained land, and is deducted when Callum eventually sells it." },
            { label: "Sanity check the apportionment", detail: "The part sold fetched twice what the retained part was worth, so it should carry twice the cost — £53,333 against £26,667 ✓. If the fraction does not reflect the relative values, A or B has been taken wrongly." },
          ],
          result:
            "**Gain £64,267, with £26,667 of cost carried forward.** The whole of the answer is in using the market value of the RETAINED part as B, and in remembering that the balance of cost is not lost.",
        },
      ],
      check: {
        q: "Land costing £80,000 is partly sold for £120,000 when the retained part is worth £60,000. What cost is allocated to the disposal?",
        options: [
          "£40,000, half the cost",
          "£53,333 — £80,000 × £120,000/(£120,000 + £60,000)",
          "£80,000, the whole cost",
          "£26,667",
        ],
        correct: 1,
        explain:
          "£53,333, being two thirds. The fraction is A/(A + B) where A is the proceeds of the part sold and B the MARKET VALUE of the part retained at that date. The remaining £26,667 stays with the retained land for its eventual disposal.",
      },
    },
    {
      id: "chattels",
      heading: "Chattels, wasting assets and destroyed assets",
      blocks: [
        {
          kind: "table",
          caption: "Is the chattel exempt?",
          head: ["Asset", "Treatment"],
          rows: [
            ["**Wasting chattel** — predictable life of 50 years or less", "**EXEMPT**, so no gain and no allowable loss. Racehorses, boats, caravans, animals"],
            ["Wasting chattel that qualified for **capital allowances**", "**NOT exempt** — business plant and machinery. But a loss is not allowable either, being relieved through capital allowances instead"],
            ["**Non-wasting chattel**, bought and sold for **£6,000 or less**", "**EXEMPT** — a gain is not chargeable"],
            ["Non-wasting chattel sold for **more than £6,000**", "**Chargeable**, subject to the marginal relief below"],
            ["Non-wasting chattel sold at a **LOSS** for under £6,000", "Proceeds are **deemed to be £6,000**, which restricts the allowable loss"],
            ["**Cars**", "Always exempt, whether wasting or not"],
          ],
        },
        {
          kind: "formula",
          name: "Chattels marginal relief",
          expr: "Where a NON-WASTING chattel is sold for MORE than £6,000:\n\n   Chargeable gain  =  the LOWER of\n\n      (a)  the normal gain,  and\n\n      (b)  5/3  ×  (gross proceeds  −  £6,000)\n\nWhere a non-wasting chattel is sold at a LOSS for less than £6,000:\n\n   Deemed proceeds  =  £6,000,  which reduces the allowable loss\n\nSo the £6,000 exemption cuts both ways: it exempts small gains AND\nrestricts small losses.",
          note: "The 5/3 fraction phases the charge in gradually, so that a chattel sold for £6,001 is not taxed on a full gain when one sold for £6,000 is exempt. The relief stops mattering once proceeds are high enough that the normal gain is the lower figure.",
        },
        {
          kind: "example",
          title: "Marginal relief on an antique",
          scenario:
            "Nia bought an antique clock in 2014 for £2,000 and sold it at auction in September 2025 for £8,400. She also sold a painting for £4,800 that had cost her £7,200.",
          steps: [
            { label: "The clock — check whether it is exempt", detail: "A clock is a non-wasting chattel, and the proceeds of £8,400 exceed £6,000, so it is chargeable and marginal relief must be considered." },
            { label: "Compute the normal gain", detail: "£8,400 − £2,000 = £6,400." },
            { label: "Compute the 5/3 limit", detail: "5/3 × (£8,400 − £6,000) = 5/3 × £2,400 = £4,000." },
            { label: "Take the lower", detail: "£4,000 is lower than £6,400, so the chargeable gain on the clock is £4,000. Marginal relief has saved £2,400 of gain." },
            { label: "The painting — the rule cuts the other way", detail: "The painting is a non-wasting chattel sold at a loss for less than £6,000, so proceeds are DEEMED to be £6,000: allowable loss = £6,000 − £7,200 = £1,200, not the £2,400 actual loss. The deeming restricts the loss." },
            { label: "State the principle", detail: "The £6,000 threshold is symmetrical. It exempts a gain where both cost and proceeds are under £6,000, phases a gain in above it, and restricts a loss where proceeds are below it. A question giving two chattels is almost always testing both directions." },
          ],
          result:
            "**Clock: gain £4,000 under the 5/3 rule rather than £6,400. Painting: allowable loss £1,200, not £2,400, because proceeds are deemed to be £6,000.** Both halves of the £6,000 rule in one scenario.",
        },
        {
          kind: "list",
          title: "Assets lost or destroyed",
          items: [
            "A **total loss or destruction** of an asset is a **disposal** at the date of the loss, so a gain or loss arises even though nothing was sold.",
            "**Insurance proceeds** received are treated as the disposal proceeds.",
            "Where the proceeds are used to **replace** the asset within **12 months**, a claim may defer the gain: the gain is deducted from the cost of the replacement rather than charged now.",
            "Where an asset is **damaged** rather than destroyed, receipt of a capital sum is a **part disposal**, computed on the A/(A + B) fraction. Note that the **small capital sums** rules for damaged assets are an **excluded topic** in TX.",
          ],
        },
      ],
      check: {
        q: "A non-wasting chattel costing £2,000 is sold for £8,400. What is the chargeable gain?",
        options: [
          "£6,400, the normal gain",
          "£4,000 — the lower of the £6,400 normal gain and 5/3 × (£8,400 − £6,000)",
          "£2,400",
          "Nil, as it is a chattel",
        ],
        correct: 1,
        explain:
          "£4,000. Marginal relief takes the LOWER of the normal gain and 5/3 of the excess of proceeds over £6,000. Here 5/3 × £2,400 = £4,000, which is lower than £6,400. Taking the normal gain without testing the 5/3 limit overstates the gain by £2,400.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using the retained part's original cost as B in a part disposal.",
      fix: "B is the MARKET VALUE of the part retained at the date of the part disposal.",
    },
    {
      trap: "Forgetting the balance of cost stays with the retained asset.",
      fix: "Only the apportioned share is used now; the rest is deducted on the later disposal.",
    },
    {
      trap: "Taking the normal gain without testing the 5/3 limit.",
      fix: "The chargeable gain is the LOWER of the normal gain and 5/3 of the excess over £6,000.",
    },
    {
      trap: "Claiming the full loss on a chattel sold for under £6,000.",
      fix: "Proceeds are deemed to be £6,000, which restricts the allowable loss.",
    },
    {
      trap: "Treating business plant as an exempt wasting chattel.",
      fix: "A wasting chattel that qualified for capital allowances is not exempt, though a loss is still not allowable.",
    },
  ],
  keyTerms: [
    { term: "Part disposal", def: "A disposal of part of an asset, with cost apportioned on the A/(A + B) fraction." },
    { term: "Chattel", def: "Tangible movable property." },
    { term: "Wasting chattel", def: "A chattel with a predictable life of 50 years or less; exempt unless it qualified for capital allowances." },
    { term: "Chattels marginal relief", def: "The 5/3 rule limiting the gain on a non-wasting chattel sold for just over £6,000." },
    { term: "Deemed proceeds", def: "£6,000, substituted where a non-wasting chattel is sold at a loss for less than that." },
  ],
  summary: [
    "Apportion cost on a part disposal as A/(A + B), where B is the market value of the part retained.",
    "The balance of cost stays with the retained part for its eventual disposal.",
    "Wasting chattels are exempt unless they qualified for capital allowances.",
    "A non-wasting chattel sold for over £6,000 has its gain capped at 5/3 of the excess.",
    "A non-wasting chattel sold at a loss for under £6,000 has proceeds deemed to be £6,000.",
  ],
  knowledgeDiagnostic: [
    { q: "What is B in the part disposal fraction?", a: "The market value of the part retained, measured at the date of the part disposal." },
    { q: "When is a wasting chattel NOT exempt?", a: "Where it qualified for capital allowances — business plant and machinery — though a loss on it is still not allowable." },
    { q: "How is the chattels marginal relief computed?", a: "The chargeable gain is the lower of the normal gain and 5/3 of the excess of gross proceeds over £6,000." },
    { q: "What happens on a loss on a chattel sold for £4,800 that cost £7,200?", a: "Proceeds are deemed to be £6,000, so the allowable loss is £1,200 rather than £2,400." },
    { q: "How is the destruction of an asset treated?", a: "As a disposal at that date, with insurance proceeds as the disposal proceeds; the gain may be deferred if the proceeds are used to replace the asset within 12 months." },
  ],
}

export const TX_TREE_AREA_C_PART1: StudyChapter[] = [TX_TREE_15, TX_TREE_16]
