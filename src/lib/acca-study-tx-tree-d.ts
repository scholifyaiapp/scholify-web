import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area D — inheritance tax. Chapters 19–20.
 *
 * ── What TX does NOT examine, which shapes these chapters ────────
 * The IHT exclusion list is the longest in the syllabus, and authoring round it matters as
 * much as authoring the rules themselves. NOT examinable: business property relief,
 * agricultural property relief, relief for the fall in value of lifetime gifts, quick
 * succession relief, double tax relief, post-death variations and disclaimers, GROSSING UP
 * ON DEATH, post mortem reliefs, the reduced 36% charity rate, the tapered withdrawal of
 * the residence nil rate band above £2 million, RNRB downsizing protection, and the
 * specific rules for valuing assets — values are always given.
 *
 * Only FIVE exemptions are examinable: small gifts, the annual exemption, normal
 * expenditure out of income, gifts in consideration of marriage, and gifts between spouses.
 * Gifts to charities, political parties and for national purposes are excluded.
 *
 * So these two chapters are narrower than a practitioner's IHT would be, and deliberately
 * so. Grossing up appears only for LIFETIME transfers, where it is examinable.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 19 · D1–D3 ───────────────────────────────────────── */

export const TX_TREE_19: StudyChapter = {
  id: "TX-19",
  number: 19,
  paper: "TX",
  area: "D",
  title: "Inheritance tax: lifetime transfers",
  minutes: 20,
  syllabusRefs: ["D1(a)", "D1(b)", "D2(a)", "D2(b)", "D3(a)", "D3(b)"],
  intro:
    "A lifetime gift can be taxed twice — once when made and again if the donor dies within seven years. Working out which, and at what rate, is most of Area D.",
  outcomes: [
    "Distinguish a potentially exempt transfer from a chargeable lifetime transfer",
    "Apply the five examinable exemptions",
    "Compute the lifetime tax on a chargeable lifetime transfer, with and without grossing up",
    "Compute the death tax on lifetime transfers, applying taper relief",
    "State who pays and when",
  ],
  sections: [
    {
      id: "transfers-and-exemptions",
      heading: "The two kinds of lifetime transfer, and the exemptions",
      blocks: [
        {
          kind: "table",
          caption: "PET against CLT",
          head: ["", "Potentially exempt transfer (PET)", "Chargeable lifetime transfer (CLT)"],
          rows: [
            ["**Made to**", "An **individual**", "A **trust**"],
            ["**Tax when made**", "**None**", "**20%** on the excess over the available nil rate band"],
            ["**If the donor survives 7 years**", "**Completely exempt** — nothing is ever charged", "No further tax; the lifetime tax stands"],
            ["**If the donor dies within 7 years**", "Becomes **chargeable**: tax at **40%** less taper relief", "**Recomputed** at 40% less taper, with credit for the lifetime tax paid"],
            ["**Who pays**", "The **donee**, or the estate if it is not paid", "The **trustees** by default, or the **donor** if they agree to bear it"],
          ],
        },
        {
          kind: "formula",
          name: "The five examinable exemptions",
          expr: "SPOUSE or CIVIL PARTNER                    UNLIMITED and exempt\n\nANNUAL EXEMPTION                           £3,000 per tax year\n   ·  applied to transfers in CHRONOLOGICAL order\n   ·  unused amount carried forward ONE year only\n   ·  the CURRENT year's exemption must be used FIRST\n\nSMALL GIFTS                                £250 per recipient per year\n   ·  ALL OR NOTHING — a gift of £251 gets no exemption at all\n   ·  cannot be combined with the annual exemption for the same gift\n\nGIFTS IN CONSIDERATION OF MARRIAGE\n   ·  £5,000  by a PARENT\n   ·  £2,500  by a GRANDPARENT or remoter ancestor\n   ·  £2,500  by a PARTY to the marriage\n   ·  £1,000  by anyone else\n   ·  conditional on the marriage actually taking place\n\nNORMAL EXPENDITURE OUT OF INCOME           fully exempt\n   ·  must be HABITUAL, made out of INCOME, and must not affect the\n      donor's standard of living",
          note: "Two orderings matter. The annual exemption is applied to gifts in DATE order, and the current year's £3,000 is used before any brought forward. And the small gifts exemption is ALL OR NOTHING — it exempts a gift of £250 entirely and a gift of £251 not at all, so it is never partially applied.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Gifts to charities and political parties are EXCLUDED in TX",
          md: "Exemptions for **gifts to charities, gifts to political parties and gifts for national purposes** are explicitly excluded from the TX syllabus. So do not apply them, and do not reach for the reduced **36%** death rate for estates leaving 10% to charity — that too is excluded.\n\nThis is worth stating because a practitioner's answer would include them, and a candidate who has read around the subject may lose time on a relief the marking guide does not recognise. The five exemptions in the formula above are the complete examinable set.",
        },
      ],
      check: {
        q: "A donor makes a gift of £251 to a friend. What exemption is available?",
        options: [
          "The small gifts exemption covers £250, leaving £1 chargeable",
          "None from small gifts — it is all or nothing and the gift exceeds £250, so the annual exemption must be used instead",
          "The annual exemption and the small gifts exemption together",
          "The marriage exemption",
        ],
        correct: 1,
        explain:
          "SMALL GIFTS IS ALL OR NOTHING. A gift of £251 gets no small gifts exemption at all — it is not applied to the first £250. The annual exemption would have to cover it instead, and the two exemptions cannot be combined for the same gift.",
      },
    },
    {
      id: "computing-the-tax",
      heading: "Computing the lifetime tax and the death tax",
      blocks: [
        {
          kind: "formula",
          name: "Lifetime tax on a CLT, and grossing up",
          expr: "Transfer of value                                          X\nLess exemptions (annual, marriage, etc.)                  (X)\n                                                        ─────\nNET CHARGEABLE TRANSFER                                    X\n\nAvailable nil rate band  =  £325,000\n   LESS gross chargeable transfers in the PREVIOUS 7 YEARS\n\nTAX  =  (net transfer − available NRB)  ×  rate\n\n   ·  TRUSTEES pay        →  20/100, so 20%\n   ·  DONOR pays          →  20/80, so 25%  (the tax is itself a\n                             transfer of value, so it must be grossed up)\n\nGROSS CHARGEABLE TRANSFER carried forward for cumulation:\n   ·  trustees paid  →  the net transfer\n   ·  donor paid     →  the net transfer PLUS the tax",
          note: "The 25% rate is not a different rate of tax — it is 20% grossed up, because a donor who pays the tax has given away the gift AND the tax. Note also that grossing up applies ONLY to lifetime transfers: grossing up on death is an excluded topic in TX.",
        },
        {
          kind: "formula",
          name: "Death tax on a lifetime transfer",
          expr: "Where the donor dies within 7 years of the transfer:\n\nGross chargeable transfer                                  X\nLess nil rate band at DEATH, reduced by gross chargeable\n   transfers in the 7 years BEFORE that transfer           (X)\n                                                        ─────\nTaxable                                                    X\n  ×  40%                                                   X\nLess TAPER RELIEF                                         (X)\nLess LIFETIME TAX already paid                            (X)\n                                                        ─────\nDEATH TAX PAYABLE, minimum NIL                             X\n\nTAPER RELIEF — a reduction in the TAX, not the transfer:\n   3 to 4 years before death     20%\n   4 to 5 years                  40%\n   5 to 6 years                  60%\n   6 to 7 years                  80%\n   Under 3 years                 no reduction",
          note: "Two points decide these questions. Taper relief reduces the TAX and not the transfer, so apply it after the 40%. And the credit for lifetime tax paid can reduce the death tax to NIL but never below — there is no repayment of lifetime tax.",
        },
        {
          kind: "example",
          title: "A CLT taxed twice",
          scenario:
            "On 10 June 2022 Marta transferred £500,000 into a trust. The trustees agreed to pay any lifetime tax. She had made no earlier transfers. Marta died on 20 September 2025. The nil rate band is £325,000 throughout.",
          steps: [
            { label: "Deduct the exemptions", detail: "Annual exemption for 2022/23 of £3,000, plus £3,000 brought forward from 2021/22 which was unused. Net chargeable transfer = £500,000 − £6,000 = £494,000. Use the current year's exemption first, then the brought-forward one." },
            { label: "Compute the lifetime tax", detail: "No transfers in the previous seven years, so the full £325,000 nil rate band is available. Excess = £494,000 − £325,000 = £169,000. The TRUSTEES are paying, so the rate is 20%: £169,000 × 20% = £33,800." },
            { label: "Identify the gross chargeable transfer", detail: "Because the trustees paid the tax, the gross chargeable transfer is simply £494,000 — the tax is not added. Had MARTA paid it, the tax would have been £169,000 × 25% = £42,250 and the gross chargeable transfer £536,250." },
            { label: "Compute the death tax before reliefs", detail: "Marta died within seven years, so the transfer is recomputed at the death rate. £494,000 − £325,000 = £169,000 × 40% = £67,600." },
            { label: "Apply taper relief", detail: "From 10 June 2022 to 20 September 2025 is 3 years and 3 months — so more than 3 but less than 4 years, giving a 20% reduction. £67,600 × 80% = £54,080. Note the reduction is to the TAX, not to the transfer." },
            { label: "Credit the lifetime tax paid", detail: "£54,080 − £33,800 = £20,280 of death tax payable. The credit can reduce the figure to nil but no further, so a large lifetime payment simply extinguishes the death charge without generating a refund." },
            { label: "State who pays and when", detail: "The trustees are liable for the £20,280, due six months after the end of the month of death — so by 30 April 2026." },
          ],
          result:
            "**Lifetime tax £33,800 and further death tax of £20,280.** The four steps that decide it are the two annual exemptions, the 20% rather than 25% rate because the trustees paid, the 20% taper applied to the tax, and the credit for the lifetime tax.",
        },
        {
          kind: "table",
          caption: "Who pays, and by when",
          head: ["Charge", "Primary liability", "Due date"],
          rows: [
            ["**Lifetime tax on a CLT**", "The **trustees**, or the donor if they agree to bear it", "The **later** of 30 April following the tax year of transfer, and 6 months after the end of the month of transfer"],
            ["**Death tax on a lifetime transfer**", "The **donee** — or the trustees for a CLT — with the estate liable if unpaid", "**6 months** after the end of the month of death"],
            ["**Tax on the death estate**", "The **personal representatives**, from estate assets", "The **earlier** of 6 months after the end of the month of death, and delivery of the estate account to HMRC"],
          ],
        },
      ],
      check: {
        q: "A CLT is made 3 years and 3 months before death. Death tax before reliefs is £67,600 and lifetime tax of £33,800 was paid. What is the death tax payable?",
        options: [
          "£67,600, with no reduction",
          "£20,280 — £67,600 reduced by 20% taper to £54,080, then less the £33,800 lifetime tax",
          "£33,800",
          "Nil, as the lifetime tax exceeds the taper relief",
        ],
        correct: 1,
        explain:
          "£20,280. Between 3 and 4 years gives a 20% taper reduction, applied to the TAX: £67,600 × 80% = £54,080. Then deduct the £33,800 of lifetime tax already paid. The credit can take the figure to nil but never below, so no refund arises.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Applying taper relief to the transfer rather than to the tax.",
      fix: "Compute the tax at 40% first, then reduce that figure by the taper percentage.",
    },
    {
      trap: "Using 20% where the donor bears the lifetime tax.",
      fix: "The donor paying means grossing up at 20/80 = 25%, and the gross transfer includes the tax.",
    },
    {
      trap: "Carrying the annual exemption forward more than one year.",
      fix: "Only one year, and the current year's exemption must be used first.",
    },
    {
      trap: "Applying the small gifts exemption to the first £250 of a larger gift.",
      fix: "It is all or nothing; a gift over £250 gets none of it.",
    },
    {
      trap: "Claiming business property relief or a charity exemption.",
      fix: "Both are excluded topics in TX.",
    },
  ],
  keyTerms: [
    { term: "Potentially exempt transfer", def: "A lifetime gift to an individual: no tax when made, chargeable only if the donor dies within 7 years." },
    { term: "Chargeable lifetime transfer", def: "A lifetime gift into a trust, taxed at 20% (or 25% grossed up) when made." },
    { term: "Taper relief", def: "A reduction in the death tax on a lifetime transfer, 20% to 80% by the years between transfer and death." },
    { term: "Gross chargeable transfer", def: "The figure carried forward for cumulation; it includes the lifetime tax where the donor paid it." },
    { term: "Seven-year cumulation", def: "The reduction of the nil rate band by gross chargeable transfers in the previous seven years." },
  ],
  summary: [
    "A PET is untaxed when made and chargeable only on death within seven years; a CLT is taxed at 20% immediately.",
    "Where the donor bears the lifetime tax, gross up at 20/80 = 25% and include the tax in the gross transfer.",
    "Only five exemptions are examinable: spouse, annual, small gifts, marriage and normal expenditure out of income.",
    "Taper relief reduces the TAX by 20% to 80%, and lifetime tax paid is credited but never refunded.",
    "Death tax on a lifetime transfer is due six months after the end of the month of death.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between a PET and a CLT?", a: "A PET is a gift to an individual with no immediate tax, chargeable only if the donor dies within seven years; a CLT is a gift into a trust, taxed at 20% when made." },
    { q: "When is the 25% lifetime rate used?", a: "Where the DONOR bears the tax, because the tax is itself a transfer of value and must be grossed up at 20/80." },
    { q: "How does taper relief work?", a: "It reduces the death TAX on a lifetime transfer by 20%, 40%, 60% or 80% according to how many years elapsed between the transfer and death." },
    { q: "How far can the annual exemption be carried forward?", a: "One year only, and the current year's £3,000 must be used before any brought forward." },
    { q: "Name three IHT reliefs that are excluded topics in TX.", a: "Business property relief, agricultural property relief, and relief for the fall in value of lifetime gifts — along with quick succession relief and the 36% charity rate." },
  ],
}

/* ── Chapter 20 · D2 ──────────────────────────────────────────── */

export const TX_TREE_20: StudyChapter = {
  id: "TX-20",
  number: 20,
  paper: "TX",
  area: "D",
  title: "Inheritance tax: the death estate and planning",
  minutes: 18,
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)", "D2(d)", "D3(b)"],
  intro:
    "Two nil rate bands, both transferable between spouses, and a computation that is straightforward once you know which order they come off in.",
  outcomes: [
    "Compute the value of a death estate, including deductible liabilities",
    "Apply the residence nil rate band",
    "Apply the transfer of unused nil rate band and residence nil rate band between spouses",
    "Compute the inheritance tax on the death estate",
    "Explain basic inheritance tax planning",
  ],
  sections: [
    {
      id: "the-estate",
      heading: "Valuing the estate and applying the bands",
      blocks: [
        {
          kind: "formula",
          name: "The death estate computation",
          expr: "All assets at MARKET VALUE at death                        X\n   (values are always given — the specific valuation rules\n    are an excluded topic)\nLess DEDUCTIBLE liabilities:\n   Outstanding mortgages and loans                        (X)\n   Outstanding tax and other debts due at death           (X)\n   Reasonable FUNERAL expenses                            (X)\n                                                        ─────\nNET ESTATE                                                 X\nLess EXEMPT legacies:\n   Assets passing to a SPOUSE or civil partner            (X)\n                                                        ─────\nCHARGEABLE ESTATE                                          X\nLess RESIDENCE NIL RATE BAND                              (X)\nLess AVAILABLE NIL RATE BAND                              (X)\n                                                        ─────\nTAXABLE ESTATE                                             X\n  ×  40%                                                   X\n\nAVAILABLE NIL RATE BAND  =  £325,000\n   PLUS any transferred from a deceased spouse\n   LESS gross chargeable transfers in the 7 years before death",
          note: "A liability is deductible only if it was legally enforceable at death — so a promise to pay is not, and neither is a debt the deceased was not actually liable for. Note the order: the RESIDENCE nil rate band comes off FIRST, before the ordinary nil rate band, because it can only be used against the residence and would otherwise be wasted.",
        },
        {
          kind: "table",
          caption: "The two nil rate bands",
          head: ["", "Nil rate band", "Residence nil rate band"],
          rows: [
            ["**Amount**", "**£325,000**", "**£175,000**"],
            ["**Available against**", "Any part of the estate", "Only a **residence** passing to **direct descendants** — children, grandchildren, and their spouses"],
            ["**Limited by**", "Chargeable transfers in the 7 years before death", "The **value of the residence** itself, so a £120,000 house gives only £120,000 of band"],
            ["**Transferable from a spouse**", "**Yes**, as the unused PROPORTION of their band", "**Yes**, likewise"],
            ["**Order of use**", "Second", "**First** — it cannot be used elsewhere, so using it first avoids wasting it"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The transfer between spouses is a PROPORTION, not an amount",
          md: "Where a spouse or civil partner died without using all of their nil rate band, the **unused PROPORTION** transfers to the survivor and is applied to the nil rate band in force at the **survivor's** death. So a spouse who used 40% of their band leaves 60% to transfer, and that 60% is 60% of **£325,000** — £195,000 — even if their own band was smaller when they died.\n\nThe same applies to the **residence** nil rate band. Both must be **claimed** within two years of the second death.\n\nThe effect is that a married couple can pass up to **£650,000** plus **£350,000** of residence bands — a total of **£1,000,000** — free of inheritance tax, which is the single most important planning point in the area.\n\nOne thing you will never have to do here: taper the residence band away on a £2 million-plus estate. That **restriction is excluded** from TX.",
        },
        {
          kind: "example",
          title: "A death estate with transferred bands",
          scenario:
            "Ravi died on 14 October 2025. His estate comprised his house, valued at £600,000 and left to his daughter, and other assets of £900,000. He had an outstanding mortgage of £40,000 and funeral expenses were £8,000. He had made one chargeable lifetime transfer, with a gross chargeable value of £100,000, four years before his death. His wife died in 2020 leaving her entire estate to Ravi, so none of her nil rate bands was used.",
          steps: [
            { label: "Compute the net estate", detail: "House £600,000 + other assets £900,000 = £1,500,000, less the £40,000 mortgage and £8,000 of funeral expenses = £1,452,000. Both deductions are allowable: the mortgage was legally enforceable and the funeral costs are reasonable." },
            { label: "Establish the available residence nil rate band", detail: "The house passes to a direct descendant, so the RNRB applies. Ravi's own £175,000 plus 100% transferred from his wife = £350,000. It is limited to the value of the residence, and £600,000 exceeds £350,000, so the full £350,000 is available." },
            { label: "Establish the available nil rate band", detail: "Ravi's own £325,000 plus 100% transferred from his wife = £650,000. Reduce by the gross chargeable transfers in the seven years before death: £650,000 − £100,000 = £550,000." },
            { label: "Deduct the bands in order", detail: "£1,452,000 − £350,000 RNRB − £550,000 NRB = £552,000 of taxable estate. The RNRB comes off first, because it can only be used against the residence and would otherwise be wasted." },
            { label: "Compute the tax", detail: "£552,000 × 40% = £220,800, payable by the personal representatives out of estate assets." },
            { label: "State the due date", detail: "The earlier of six months after the end of the month of death — so 30 April 2026 — and delivery of the estate account to HMRC." },
            { label: "Note the effect of the transferred bands", detail: "Without the transfers from his wife, Ravi would have had only £175,000 of RNRB and £225,000 of NRB after the lifetime transfer, giving a taxable estate of £1,052,000 and tax of £420,800. The claim to transfer her unused bands has saved £200,000, which is why it must not be overlooked." },
          ],
          result:
            "**Inheritance tax £220,800.** The £200,000 saved by claiming the wife's unused bands is the finding, and it depends on the transfer being a proportion applied to the bands in force at Ravi's death rather than at hers.",
        },
      ],
      check: {
        q: "A spouse died having used 40% of their nil rate band. What transfers to the survivor?",
        options: [
          "£130,000, being 40% of £325,000",
          "60% of the nil rate band in force at the SURVIVOR's death — £195,000 of the current £325,000",
          "The unused cash amount from the first death",
          "Nothing, unless the spouses died in the same tax year",
        ],
        correct: 1,
        explain:
          "60% OF THE BAND AT THE SURVIVOR'S DEATH. The transfer is of the unused PROPORTION, not an amount, and it is applied to the nil rate band in force when the survivor dies. So 60% of £325,000 = £195,000, regardless of how large the band was at the first death.",
      },
    },
    {
      id: "planning",
      heading: "Basic inheritance tax planning",
      blocks: [
        {
          kind: "list",
          title: "The planning points TX rewards",
          items: [
            "**Make lifetime gifts early.** A PET becomes fully exempt after seven years, and taper relief starts to help after three — so the value of a gift is a function of the donor's remaining life expectancy.",
            "**Use the annual exemption every year.** £3,000 per donor per year, and a couple can therefore remove £6,000 a year from their estates with no seven-year wait at all. It carries forward only one year, so an unused exemption is lost.",
            "**Use the spouse exemption, but not to excess.** Leaving everything to a spouse is exempt, but it does not use the deceased's own nil rate bands — though since both are now transferable, this is far less damaging than it once was.",
            "**Leave the residence to direct descendants**, or the £175,000 residence nil rate band is simply lost. Leaving it to a sibling or a friend wastes it entirely.",
            "**Claim the transferred bands** within two years of the second death. As the worked example shows, the claim can be worth £200,000 of tax.",
            "**Equalise estates between spouses** where one is much wealthier, so that both sets of bands can be used against assets rather than sat behind an exempt transfer.",
            "**Consider a gift into trust versus an outright gift.** A CLT is taxed at 20% now; a PET is taxed at nothing now and possibly 40% later. Which is better depends on how long the donor expects to live.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The interaction with capital gains tax, which a good answer mentions",
          md: "A lifetime gift is a **chargeable disposal for CGT** at market value, as well as a transfer of value for IHT — so a gift can trigger CGT now in the hope of saving IHT later. On **death**, by contrast, there is **no CGT** at all: the beneficiary acquires at market value at the date of death, so the gain accrued during the deceased's lifetime disappears.\n\nThat produces a genuine tension worth stating. Gifting an appreciated asset in lifetime removes it from the estate but crystallises a CGT charge; holding it until death avoids the CGT entirely but leaves the full value exposed to 40% IHT. **Gift holdover relief** (chapter 18) resolves it for business assets by deferring the CGT while the IHT clock runs, which is why that combination appears so often in planning questions.",
        },
      ],
      check: {
        q: "Why is there a tension between gifting an appreciated asset and holding it until death?",
        options: [
          "Gifts are always more tax efficient",
          "A lifetime gift is a CGT disposal at market value, whereas on death there is no CGT and the beneficiary acquires at the death value",
          "IHT does not apply to lifetime gifts",
          "CGT is charged twice on a gift",
        ],
        correct: 1,
        explain:
          "A GIFT TRIGGERS CGT; DEATH DOES NOT. Gifting removes the asset from the estate for IHT but crystallises a chargeable gain at market value. Holding until death wipes out the accrued gain — the beneficiary acquires at the death value — but exposes the full value to 40% IHT. Gift holdover relief is what resolves the tension for business assets.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deducting the ordinary nil rate band before the residence nil rate band.",
      fix: "The RNRB comes off first, because it can only be used against the residence.",
    },
    {
      trap: "Transferring a cash amount rather than a proportion of a spouse's nil rate band.",
      fix: "It is the unused PROPORTION, applied to the band in force at the survivor's death.",
    },
    {
      trap: "Claiming the full £175,000 RNRB on a residence worth less than that.",
      fix: "It is limited to the value of the residence.",
    },
    {
      trap: "Applying the RNRB where the residence passes to someone other than a direct descendant.",
      fix: "It is available only for children, grandchildren and their spouses; otherwise it is lost.",
    },
    {
      trap: "Tapering the RNRB for a large estate.",
      fix: "The £2 million taper is an excluded topic in TX.",
    },
  ],
  keyTerms: [
    { term: "Death estate", def: "All assets at market value at death, less deductible liabilities and funeral expenses." },
    { term: "Residence nil rate band", def: "£175,000 against a residence passing to direct descendants, limited to the value of the residence." },
    { term: "Transferable nil rate band", def: "The unused proportion of a deceased spouse's band, applied to the band in force at the survivor's death." },
    { term: "Direct descendants", def: "Children, grandchildren and their spouses, for residence nil rate band purposes." },
    { term: "Personal representatives", def: "Those liable to pay the tax on the death estate out of its assets." },
  ],
  summary: [
    "Value the estate at market value, deduct enforceable liabilities and reasonable funeral expenses.",
    "Deduct the residence nil rate band first, then the ordinary nil rate band, then charge 40%.",
    "Both bands are transferable between spouses as an unused proportion, potentially giving £1,000,000 in total.",
    "The residence nil rate band requires the residence to pass to direct descendants and is capped at its value.",
    "A lifetime gift triggers CGT while death does not, which is the central tension in IHT planning.",
  ],
  knowledgeDiagnostic: [
    { q: "In what order are the two nil rate bands deducted?", a: "The residence nil rate band first, then the ordinary nil rate band, because the RNRB can only be used against the residence." },
    { q: "What limits the residence nil rate band?", a: "The value of the residence itself, and the requirement that it pass to direct descendants." },
    { q: "How much can a married couple pass free of inheritance tax?", a: "Up to £1,000,000 — £650,000 of nil rate bands plus £350,000 of residence nil rate bands — where both are fully available and claimed." },
    { q: "When is inheritance tax on the death estate due?", a: "The earlier of six months after the end of the month of death and delivery of the estate account to HMRC." },
    { q: "Why does death remove a capital gain?", a: "Because there is no CGT disposal on death; the beneficiary acquires the asset at its market value at the date of death, so the accrued gain is never charged." },
  ],
}

export const TX_TREE_AREA_D: StudyChapter[] = [TX_TREE_19, TX_TREE_20]
