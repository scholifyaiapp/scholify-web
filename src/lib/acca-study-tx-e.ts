import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX (Taxation UK) · Area E — Inheritance tax.
 * UK FA2024/25 basis. Rich study chapter: scope of IHT, lifetime transfers
 * (PETs & CLTs), exemptions, the nil rate band & 7-year cumulation, taper
 * relief, the death estate and the residence nil rate band. Original content,
 * syllabus-aligned; every figure re-solved on FA2024/25 rates.
 */

export const TX_E: StudyChapter = {
  paper: "TX",
  area: "E",
  title: "Inheritance tax",
  minutes: 15,
  intro: "Inheritance tax is really a tax on generosity and on death. Master two numbers — the £325,000 nil rate band and the 7-year clock — and the whole area becomes a sequence of tidy, repeatable calculations.",
  outcomes: [
    "Explain the scope of IHT and apply the diminution-in-value principle to a transfer",
    "Classify a lifetime gift as a PET or a CLT and describe how each is taxed",
    "Apply the exemptions — annual, small gifts, marriage, normal expenditure and spouse",
    "Use the nil rate band with 7-year cumulation to compute lifetime tax on a CLT",
    "Apply taper relief on death within 3–7 years and compute a death estate with the RNRB",
  ],
  sections: [
    {
      id: "scope",
      heading: "The scope of IHT — transfers of value",
      blocks: [
        { kind: "text", md: "Inheritance tax (IHT) is charged when wealth **leaves a person's estate** — either as a gift during life or as the whole estate on death. Despite the name, it is not only a death tax: it reaches back to catch gifts made in the **seven years before** someone dies. The unit being taxed is the **transfer of value** — any transaction that makes a person **worse off**." },
        { kind: "callout", tone: "rule", title: "The diminution-in-value principle", md: "A transfer of value is measured by the **fall in the value of the donor's estate**, not by what the recipient gains. Usually these are the same, but for shares and land they can differ sharply — always value the estate **before** the gift and **after** it, and take the difference." },
        { kind: "text", md: "This matters most for **unquoted shares**, where a controlling holding is worth far more per share than a minority one. Giving away a few shares can shatter control and cause a loss to the donor much larger than the market value of the shares handed over." },
        { kind: "example", title: "Worked example — diminution in value", scenario: "Marcus owns 6,000 of the 10,000 shares in a trading company (a 60% controlling holding worth £400,000). He gifts 1,500 shares to his son, leaving him with 4,500 shares (a 45% minority holding worth £250,000). What is his transfer of value?", steps: [
          { label: "Value of estate before", detail: "60% controlling holding = £400,000." },
          { label: "Value of estate after", detail: "45% minority holding = £250,000 (the control premium is gone)." },
          { label: "Diminution in value", detail: "£400,000 − £250,000 = £150,000." },
          { label: "Common wrong answer", detail: "Valuing the 1,500 shares gifted 'in isolation' as a minority stake (say £83,000). That ignores the loss of control the donor suffers." },
        ], result: "The transfer of value is £150,000 — the fall in Marcus's estate — not the standalone value of the shares he gave away." },
        { kind: "text", md: "One more scoping point: IHT applies to individuals who are **UK-domiciled** on their **worldwide** estate. It does **not** apply to gifts between spouses or civil partners (fully exempt, covered below), nor to normal purchases at arm's length, which cause no loss to the estate." },
      ],
    },
    {
      id: "lifetime",
      heading: "Lifetime transfers — PETs and CLTs",
      blocks: [
        { kind: "text", md: "Every lifetime gift that is a transfer of value falls into one of two boxes, decided by **who receives it**. A gift to **another individual** is a **potentially exempt transfer (PET)**. A gift into a **trust** is a **chargeable lifetime transfer (CLT)**. The label decides everything about the timing of tax." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How a lifetime gift is treated",
          caption: "First strip out exemptions, then classify by recipient.",
          data: {
            steps: [
              { label: "Lifetime gift", sub: "a transfer of value" },
              { label: "Deduct exemptions", sub: "annual, marriage, etc." },
              { label: "To an individual = PET", sub: "no tax now" },
              { label: "To a trust = CLT", sub: "20% on excess over NRB, now" },
              { label: "Survive 7 years?", sub: "PET exempt; CLT — no more to pay" },
            ],
          },
        } },
        { kind: "text", md: "A **PET** is the friendlier of the two: **no IHT is due when it is made**. If the donor lives for **seven more years**, it becomes fully exempt and is forgotten. Only if the donor dies **within** seven years does the PET become chargeable, taxed at death rates. This is why a PET is *potentially* exempt — its fate depends on how long the donor survives." },
        { kind: "text", md: "A **CLT** is chargeable **immediately**. Because a trust is not a person who will one day die and be taxed, HMRC takes an entry charge up front: **20%** on any value above the nil rate band. If the donor then dies within seven years, the CLT is re-tested at death rates, with credit for the lifetime tax already paid." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "PET vs CLT",
          data: {
            leftTitle: "PET (gift to an individual)",
            rightTitle: "CLT (gift to a trust)",
            rows: [
              { aspect: "Tax when made", left: "None", right: "20% on excess over NRB" },
              { aspect: "If donor survives 7 years", left: "Fully exempt", right: "No further tax — lifetime charge is final" },
              { aspect: "If donor dies within 7 years", left: "Becomes chargeable at 40% (taper may apply)", right: "Re-tested at 40% (taper), credit for lifetime tax" },
              { aspect: "Who pays any lifetime tax", left: "N/A — nothing due in life", right: "Trustees at 20%, or donor at 25% (grossed up)" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Grossing up", md: "If the **donor** agrees to pay the lifetime tax on a CLT, the tax is itself a further loss to their estate, so the excess over the NRB is taxed at **25%** (20/80). If the **trustees** pay, the rate is the straight **20%**. Read the question for who bears the tax." },
        { kind: "text", md: "Note the direction of travel: only a small minority of lifetime gifts are CLTs (most people gift to relatives, not trusts), so in the exam the majority of lifetime transfers you meet will be **PETs** with no immediate charge." },
      ],
      check: {
        q: "In June 2024, Nadia gives £200,000 in cash directly to her daughter and settles £200,000 into a discretionary trust. Which gift is immediately chargeable to IHT?",
        options: [
          "Both gifts — all lifetime transfers are taxed when made",
          "Neither — no IHT applies to lifetime gifts",
          "Only the gift to her daughter",
          "Only the transfer into the discretionary trust",
        ],
        correct: 3,
        explain: "A gift to an individual (the daughter) is a PET — no tax when made, and fully exempt if Nadia survives 7 years. A gift into a trust is a CLT, chargeable immediately at lifetime rates on any excess over the nil rate band. So only the trust transfer is taxed now.",
      },
    },
    {
      id: "exemptions",
      heading: "The exemptions — strip these out first",
      blocks: [
        { kind: "text", md: "Before any nil rate band is touched, lifetime gifts are reduced by the exemptions. Applying them in the right order is where marks are won and lost." },
        { kind: "text", md: "The **annual exemption (AE)** is **£3,000** per tax year, set against gifts in date order. Any **unused** AE can be carried forward **one year only**, and the **current year's AE must be used before** the brought-forward amount. So a donor who has used neither can shelter up to **£6,000** on the first gift of a year (£3,000 current + £3,000 brought forward)." },
        { kind: "text", md: "The **small gifts exemption** covers outright gifts of up to **£250 per recipient per year** — but it is **all-or-nothing**: a gift of £251 gets no small-gifts relief at all, and you **cannot** stack it on top of the annual exemption for the **same** person." },
        { kind: "table", caption: "The IHT exemptions at a glance (FA2024/25)", head: ["Exemption", "Amount / rule", "Key condition"], rows: [
          ["Annual exemption", "£3,000 per year; carry forward 1 year", "Current year used before b/f; gifts in date order"],
          ["Small gifts", "£250 per recipient per year", "All-or-nothing; not combinable with AE for same person"],
          ["Marriage / civil partnership", "£5,000 parent · £2,500 grandparent or party · £1,000 other", "Gift on or shortly before the marriage"],
          ["Normal expenditure out of income", "Unlimited", "Habitual, out of income, leaves normal living standard intact"],
          ["Spouse / civil partner", "Unlimited", "Transfers between UK-domiciled spouses/civil partners"],
        ] },
        { kind: "text", md: "Two of these are quietly powerful. The **normal expenditure out of income** exemption is **unlimited** — regular gifts funded from surplus income (not capital) escape IHT entirely. And the **spouse exemption** is the cornerstone of estate planning: transfers between spouses or civil partners are **wholly exempt**, in life and on death, which is why couples so often leave everything to each other first." },
        { kind: "callout", tone: "warn", title: "Marriage exemption depends on the giver", md: "The marriage exemption is **£5,000** if given by a **parent** of a party, **£2,500** by a **grandparent** (or remoter ancestor) or by one **party to the other**, and **£1,000** by **anyone else**. It sits on top of the annual exemption on the same gift." },
      ],
      check: {
        q: "Grandpa gives his grandson £250 in cash in August 2024, then a separate £3,000 cheque as a birthday gift in the same tax year. He has no brought-forward annual exemption. What is the chargeable value of these gifts after exemptions?",
        options: [
          "£0 — both are fully covered",
          "£250 — the small-gifts exemption fails and the AE covers all but £250",
          "£3,250 — no exemptions apply",
          "£3,000 — only the small gift is covered",
        ],
        correct: 1,
        explain: "Small-gifts relief is an all-or-nothing test on TOTAL gifts to a recipient: total gifts to the grandson are £3,250, which exceed the £250 ceiling, so no small-gifts relief applies at all. The £3,000 current-year annual exemption then covers all but £250, leaving £250 chargeable (a PET). Both the all-or-nothing rule and the AE are being tested.",
      },
    },
    {
      id: "nrb",
      heading: "The nil rate band, cumulation & a CLT calculation",
      blocks: [
        { kind: "text", md: "Everyone has a **nil rate band (NRB)** of **£325,000** — a slice of transfers taxed at **0%**. Above it, lifetime CLTs are taxed at **20%** (trustees) or **25%** (donor), and death charges at **40%**. The NRB is not fresh for every gift: it is shared across a rolling window by the **7-year cumulation** rule." },
        { kind: "callout", tone: "rule", title: "The 7-year cumulation", md: "To find the NRB available for a chargeable transfer, look back **7 years** and subtract the **gross chargeable transfers** already made in that window. Only **CLTs** enter the cumulation for a lifetime calculation — PETs are ignored unless and until the donor dies." },
        { kind: "diagram", diagram: {
          type: "timeline",
          title: "The 7-year clock — cumulation and taper",
          caption: "Gifts drop out of cumulation after 7 years; death within 3–7 years earns taper relief.",
          data: {
            points: [
              { label: "Gift made", sub: "clock starts" },
              { label: "0–3 yrs", sub: "full 40% on death, no taper" },
              { label: "3–4 yrs", sub: "taper 20% off the tax" },
              { label: "4–5 yrs", sub: "taper 40% off" },
              { label: "5–6 yrs", sub: "taper 60% off" },
              { label: "6–7 yrs", sub: "taper 80% off" },
              { label: "7+ yrs", sub: "PET exempt; drops out of cumulation" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — lifetime tax on a CLT", scenario: "In June 2024, Priya transfers £356,000 into a discretionary trust. She has made no earlier lifetime gifts and has used none of her annual exemptions for 2024/25 or 2023/24. The trustees agree to pay any lifetime tax.", steps: [
          { label: "Transfer of value", detail: "£356,000." },
          { label: "Less annual exemptions", detail: "2024/25 £3,000 + 2023/24 brought forward £3,000 = (£6,000)." },
          { label: "Chargeable transfer", detail: "£356,000 − £6,000 = £350,000." },
          { label: "Less NRB available", detail: "£325,000 (no CLTs in the previous 7 years, so the full band is free)." },
          { label: "Taxable excess", detail: "£350,000 − £325,000 = £25,000." },
          { label: "Lifetime tax @ 20%", detail: "Trustees pay, so the straight rate: £25,000 × 20% = £5,000." },
        ], result: "Lifetime IHT of £5,000 is due. The gross chargeable transfer carried into cumulation is £350,000. Had Priya paid the tax herself, the excess would be taxed at 25%: £25,000 × 25% = £6,250, and the gross transfer would become £356,250." },
        { kind: "callout", tone: "tip", md: "Always use the NRB at the **date of the transfer** for lifetime tax, and reduce it by **gross** (not net) earlier CLTs. A gift can fully use a donor's exemptions and still leave a large chargeable amount — never skip the exemption step." },
      ],
    },
    {
      id: "taper",
      heading: "Death within 7 years & taper relief",
      blocks: [
        { kind: "text", md: "When a donor dies within seven years of a gift, the tax story reopens. Every **PET** made in that window now becomes chargeable, and every **CLT** is re-tested — both at the **death rate of 40%** on any excess over the NRB available at death. But the law rewards survival: the longer the donor lived after the gift, the more the **tax** is reduced by **taper relief**." },
        { kind: "callout", tone: "rule", title: "Taper relief — reduces the TAX, not the transfer", md: "Years between gift and death: **3–4 yrs → 20%** off · **4–5 yrs → 40%** off · **5–6 yrs → 60%** off · **6–7 yrs → 80%** off. Under 3 years: no relief. Taper cuts the **death tax figure**, and never below the lifetime tax already paid on a CLT." },
        { kind: "example", title: "Worked example — taper relief on a PET", scenario: "In May 2019, Raj made a gift of £531,000 in cash to his daughter. He had made no earlier gifts and used no annual exemptions. He dies in July 2024. What death IHT is payable on this gift, and by whom?", steps: [
          { label: "Classify", detail: "A gift to an individual is a PET — no tax in 2019. Death within 7 years makes it chargeable now." },
          { label: "Less annual exemptions", detail: "2019/20 £3,000 + 2018/19 £3,000 b/f = (£6,000). Chargeable transfer £525,000." },
          { label: "Less NRB at death", detail: "£325,000 (no chargeable transfers in the 7 years before the PET). Taxable = £525,000 − £325,000 = £200,000." },
          { label: "Death tax @ 40%", detail: "£200,000 × 40% = £80,000." },
          { label: "Taper relief", detail: "Death is 5 years 2 months after the gift → the 5–6 year band → 60% reduction: £80,000 × 60% = (£48,000)." },
          { label: "Death IHT due", detail: "£80,000 − £48,000 = £32,000." },
        ], result: "£32,000 of death IHT is payable on the failed PET, and it is borne by the recipient — Raj's daughter. Taper reduced the tax by 60%, not the £525,000 transfer." },
        { kind: "text", md: "Two traps live here. First, taper relief applies to the **tax**, never to the value transferred — students who taper the £525,000 go badly wrong. Second, taper only helps once the gift is at least **three years** old; a gift 2 years before death gets the full charge with **no** reduction." },
      ],
      check: {
        q: "A donor makes a chargeable gift and dies 6 years and 5 months later. The tax on the gift before taper is £50,000. What is the taper relief percentage and the tax after taper?",
        options: [
          "60% reduction → £20,000 tax",
          "80% reduction → £10,000 tax",
          "40% reduction → £30,000 tax",
          "100% reduction → £0 tax",
        ],
        correct: 1,
        explain: "6 years 5 months falls in the 6–7 year band, which gives an 80% reduction in the TAX: £50,000 × 80% = £40,000 off, leaving £50,000 − £40,000 = £10,000 payable. Full exemption (100%) only comes once the donor survives a complete 7 years.",
      },
    },
    {
      id: "estate",
      heading: "The death estate & the residence nil rate band",
      blocks: [
        { kind: "text", md: "On death, IHT is charged on the whole **death estate** — everything the person owned, at open-market value, less allowable **debts** and **funeral expenses**. Assets passing to a **spouse or civil partner** are then removed (spouse exemption). What remains is taxed at **40%**, after two nil rate bands." },
        { kind: "text", md: "The first is the ordinary **NRB (£325,000)**, reduced by gross chargeable transfers in the 7 years before death. The second is the **residence nil rate band (RNRB)** of **£175,000**, available **only** where a **main residence** passes to **direct descendants** (children, grandchildren). The RNRB is **tapered** away by **£1 for every £2** the estate exceeds **£2,000,000** — so it is fully lost once the estate reaches **£2,350,000**." },
        { kind: "example", title: "Worked example — death estate computation", scenario: "Eleanor dies in December 2024. Her estate comprises a main residence worth £450,000 and other assets of £800,000. Allowable debts and funeral costs total £50,000. She leaves her entire estate, including the home, to her two children. She made no lifetime transfers in the 7 years before death.", steps: [
          { label: "Gross assets", detail: "Residence £450,000 + other assets £800,000 = £1,250,000." },
          { label: "Less debts & funeral", detail: "(£50,000). Net estate = £1,200,000." },
          { label: "Less RNRB", detail: "Home passes to direct descendants and the estate is under £2m, so the full (£175,000) is available." },
          { label: "Less NRB", detail: "(£325,000) — no lifetime transfers reduce it." },
          { label: "Taxable estate", detail: "£1,200,000 − £175,000 − £325,000 = £700,000." },
          { label: "IHT @ 40%", detail: "£700,000 × 40% = £280,000." },
        ], result: "IHT on the death estate is £280,000, payable by the personal representatives (executors) out of the estate." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "From net estate to taxable estate",
          caption: "Eleanor's estate — deduct both nil rate bands, then charge 40%.",
          data: {
            unit: "£",
            items: [
              { label: "Net estate", value: 1200000, kind: "start" },
              { label: "− RNRB", value: -175000, kind: "delta" },
              { label: "− NRB", value: -325000, kind: "delta" },
              { label: "Taxable estate", value: 700000, kind: "total" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "RNRB conditions bite", md: "No RNRB if the residence passes to anyone **other than a direct descendant** (a sibling or nephew does not count), or if there is **no qualifying residence**. And remember the **£2m taper**: an estate of £2,350,000 loses the whole £175,000 (£350,000 excess ÷ 2 = £175,000)." },
        { kind: "text", md: "**Who pays and when.** Death tax on the **estate** is paid by the **personal representatives**, due **6 months after the end of the month of death**. Death tax on **failed PETs and re-tested CLTs** is paid by the **donee or trustees**. Lifetime tax on a CLT is due the later of **6 months after the end of the month of transfer** or **30 April** following (for transfers between 6 April and 30 September)." },
      ],
    },
  ],
  examTraps: [
    { trap: "Valuing the asset gifted instead of the diminution in the donor's estate.", fix: "Value the estate BEFORE and AFTER the gift and take the difference — vital for unquoted shares and land." },
    { trap: "Forgetting the annual exemption or its carry-forward order.", fix: "£3,000 per year; use the current year first, then one year's brought-forward AE — up to £6,000 on the first gift." },
    { trap: "Stacking the £250 small-gifts exemption on top of the AE for the same person.", fix: "Small gifts are all-or-nothing and cannot combine with the AE for the same recipient; over £250 gets no small-gifts relief." },
    { trap: "Applying taper relief to the transfer value rather than to the tax.", fix: "Taper reduces the death TAX (20/40/60/80%), never the amount transferred — and never below lifetime tax already paid." },
    { trap: "Giving the RNRB when the home is not left to a direct descendant, or ignoring the £2m taper.", fix: "RNRB £175,000 needs a main residence passing to children/grandchildren; it tapers £1 per £2 above £2m, gone by £2,350,000." },
    { trap: "Thinking a PET is taxed when it is made.", fix: "A PET carries no immediate tax; it is exempt after 7 years and only becomes chargeable if the donor dies within that window." },
  ],
  keyTerms: [
    { term: "Transfer of value", def: "A gift or event that reduces the value of a person's estate; measured by the diminution in that estate." },
    { term: "Potentially exempt transfer (PET)", def: "A lifetime gift to another individual — no IHT when made, fully exempt if the donor survives 7 years." },
    { term: "Chargeable lifetime transfer (CLT)", def: "A lifetime gift into a trust — chargeable immediately at 20% (trustees) or 25% (donor) on the excess over the NRB." },
    { term: "Nil rate band (NRB)", def: "The £325,000 slice of transfers taxed at 0%, shared across a rolling 7-year window by cumulation." },
    { term: "Taper relief", def: "A reduction in the death TAX on gifts made 3–7 years before death: 20/40/60/80% for years 3–4/4–5/5–6/6–7." },
    { term: "Residence nil rate band (RNRB)", def: "An extra £175,000 band where a main residence passes to direct descendants; tapered £1 per £2 of estate over £2m." },
  ],
  summary: [
    "IHT taxes transfers of value on the diminution-in-value basis; gifts to individuals are PETs, gifts to trusts are CLTs.",
    "PETs carry no tax when made and are exempt after 7 years; CLTs are taxed immediately at 20% (trustees) or 25% (donor) above the NRB.",
    "Deduct exemptions first: annual £3,000 (carry forward 1 year), small gifts £250, marriage, normal expenditure out of income, and the unlimited spouse exemption.",
    "The £325,000 NRB is shared by 7-year cumulation of gross CLTs; death within 7 years reopens PETs and CLTs at 40%, cut by taper relief (20/40/60/80%).",
    "The death estate is taxed at 40% after the NRB and the £175,000 RNRB (home to direct descendants, tapered above £2m); PRs pay estate tax 6 months after the month of death.",
  ],
}
