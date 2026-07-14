import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX · Area B — Chargeable gains & inheritance tax (advanced).
 * Original, syllabus-aligned; UK FA2024/25 figures. Every computation is
 * re-solved from first principles on the FA2024/25 basis. No ACCA/Kaplan/BPP text.
 */

export const ATX_B: StudyChapter = {
  paper: "ATX",
  area: "B",
  title: "Chargeable gains & IHT (advanced)",
  minutes: 18,
  intro: "At ATX the hard part is not one tax but two working on the same gift at once. Master the reliefs — and the way CGT and IHT hand assets back and forth — and the advanced questions unlock.",
  outcomes: [
    "Apply the advanced CGT reliefs — BADR, gift/holdover (s165 & s260), incorporation (s162), rollover, PPR with absences and letting, and EIS deferral",
    "Compute the IHT on lifetime PETs and CLTs using 7-year cumulation and taper relief",
    "Apply business and agricultural property relief and build a death estate with the RNRB and its taper",
    "Work the relevant property trust regime — entry, exit and principal (10-year) charges",
    "Explain and quantify how CGT and IHT interact on the same lifetime gift",
  ],
  sections: [
    {
      id: "cgt-reliefs",
      heading: "The advanced CGT reliefs — business assets first",
      blocks: [
        { kind: "text", md: "At TX you met the reliefs one at a time. At ATX the examiner hands you an asset and asks **which relief, in which order, for how much** — and whether a **claim** or **election** is needed. Start by fixing the headline rates for FA2024/25 in your head, because every relief is ultimately a rate story." },
        { kind: "callout", tone: "rule", title: "FA2024/25 CGT rates & limits", md: "Annual exempt amount **£3,000**. Standard rates **10%** (gains within the basic-rate band) and **20%** (above it); **residential property 18% / 24%**. **Business Asset Disposal Relief (BADR): 10%** on qualifying gains up to a **£1,000,000 lifetime limit**. BADR gains still use the AEA and still consume the basic-rate band." },
        { kind: "text", md: "**BADR** rewards owner-managers who sell a business or their shares. The material disposal must be a whole-or-part **business**, **shares in a personal trading company** (at least **5%** of ordinary shares, votes and either profits/assets or sale proceeds, plus being an officer or employee), or assets used in the business at cessation. The **ownership/qualifying period is 2 years** to the date of disposal. The £1m is a **lifetime** pot — once used, it is gone." },
        { kind: "text", md: "When an asset is **given away** (or sold below value) to a connected person, CGT would normally bite on the **market value** even though no cash changes hands. Two holdover reliefs defer that dry charge:" },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The two holdover reliefs — pick by what the asset is, and how it is taxed for IHT",
          data: {
            leftTitle: "s165 — gift of business assets",
            rightTitle: "s260 — gift that is a chargeable transfer",
            rows: [
              { aspect: "What qualifies", left: "Business assets, unquoted trading shares, 5% personal-company shares", right: "Any asset where the gift is immediately chargeable to IHT (e.g. into a relevant property trust)" },
              { aspect: "Trigger", left: "The nature of the ASSET", right: "The IHT treatment of the TRANSFER" },
              { aspect: "Claim", left: "Joint election by donor & donee", right: "Claim by the transferor" },
              { aspect: "Effect", left: "Gain deferred; donee's base cost reduced by the held-over gain", right: "Same — gain rolls into the donee's base cost" },
              { aspect: "Priority", left: "s260 takes priority where both could apply", right: "Applies first; no BADR left for the donor on that gift" },
            ],
          },
        } },
        { kind: "text", md: "**Rollover relief** defers the gain on a **business asset** (land & buildings, fixed plant) when the proceeds are reinvested in a new qualifying asset **12 months before to 3 years after** disposal. Any proceeds **not** reinvested are chargeable immediately. **Incorporation relief (s162)** applies **automatically** when a whole business is transferred to a company as a going concern for shares — the net gain is rolled into the base cost of the shares to the extent the consideration is shares. If the owner wants cash or a faster BADR disposal, they can **elect to disapply s162** or use **s165** instead." },
        { kind: "example", title: "Worked example — BADR after using part of the lifetime pot", scenario: "Priya sells her 100% holding in a trading company she has run for 9 years, realising a chargeable gain of £1,300,000. She had previously claimed BADR on £250,000 of gains. She is an additional-rate taxpayer. Compute her CGT (ignore the AEA for clarity).", steps: [
          { label: "Remaining BADR limit", detail: "Lifetime limit £1,000,000 − £250,000 already used = **£750,000** still available at 10%." },
          { label: "Gain taxed at BADR", detail: "£750,000 × 10% = **£75,000**." },
          { label: "Excess gain", detail: "£1,300,000 − £750,000 = £550,000 falls outside BADR." },
          { label: "Excess at standard rate", detail: "£550,000 × 20% = **£110,000** (additional-rate taxpayer, non-residential)." },
          { label: "Total CGT", detail: "£75,000 + £110,000 = **£185,000**." },
        ], result: "£185,000. The trap is to run the whole £1,300,000 at 10% — the lifetime limit was already part-spent, so only £750,000 got the 10% rate and the rest paid 20%." },
      ],
      check: {
        q: "Rohan gifts unquoted trading-company shares to his daughter. The transfer is a PET for IHT. Which relief can defer his CGT, and what happens to his daughter's base cost?",
        options: [
          "s260 holdover; her base cost is unchanged",
          "s165 holdover; her base cost is reduced by the held-over gain",
          "Rollover relief; her base cost is the market value",
          "No relief is available because he received no cash",
        ],
        correct: 1,
        explain: "The gift is a PET (to an individual), not immediately chargeable to IHT, so s260 cannot apply — but the shares are business assets, so s165 does. The gain is held over and DEDUCTED from the daughter's market-value base cost, so the deferred gain surfaces when she later sells.",
      },
    },
    {
      id: "ppr-eis",
      heading: "PPR with absences and letting, and EIS deferral",
      blocks: [
        { kind: "text", md: "**Principal private residence (PPR) relief** exempts the gain on a main home for the periods it was **actually or deemed occupied**, expressed as a fraction of total ownership. The **final 9 months** are always exempt provided the property was the main residence at some point — this stops a short overlap when someone moves before selling from creating a charge." },
        { kind: "callout", tone: "key", title: "Deemed-occupation absences", md: "Certain absences count as occupation **if preceded and followed by a period of actual occupation**: up to **3 years** for any reason; **any period** working abroad (employment); and up to **4 years** working elsewhere in the UK. The follow-back rule is relaxed only where employment prevents a return." },
        { kind: "text", md: "**Letting relief** further reduces the gain where the owner **lets part of the home while also living there** (shared occupancy — the FA2024/25 restriction). It is the **lowest** of: the PPR relief already given, **£40,000**, and the gain attributable to the let period." },
        { kind: "example", title: "Worked example — PPR with an absence and letting", scenario: "Sam bought a house on 1 April 2013 for £200,000 and sold it on 31 March 2025 for £560,000 — a gain of £360,000 over 144 months of ownership. He lived in it for the first 24 months, was then working abroad for 36 months, returned and lived there for 60 months, then moved out for the final 24 months (letting a resident lodger the whole time he lived there). Compute the chargeable gain.", steps: [
          { label: "Total ownership", detail: "1 Apr 2013 to 31 Mar 2025 = **144 months**." },
          { label: "Actual occupation", detail: "24 + 60 = **84 months** exempt." },
          { label: "Working abroad", detail: "36 months deemed occupation (any period abroad, sandwiched by occupation) = **36 months** exempt." },
          { label: "Final period", detail: "Last **9 months** of the closing 24 always exempt. The remaining 15 months are chargeable." },
          { label: "PPR fraction", detail: "Exempt months = 84 + 36 + 9 = 129. PPR = £360,000 × 129/144 = **£322,500**." },
          { label: "Gain before letting relief", detail: "£360,000 − £322,500 = **£37,500** chargeable so far." },
          { label: "Letting relief", detail: "Since April 2020 letting relief only applies where the owner lived in the property **at the same time as the tenant** (shared occupancy). Sam let a lodger only while he was living there — but those months are **already 100% PPR-exempt**. The £37,500 chargeable slice comes entirely from the final 15-month **non-let absence**, so no gain is attributable to a qualifying let period. Letting relief = **£0**." },
        ], result: "£322,500 PPR relief, no letting relief (the chargeable period is a non-let absence), so the chargeable gain is **£37,500** (before the annual exempt amount). The examiner's traps: forgetting the abroad period is deemed occupation, granting the final-period exemption for more than 9 months, or — post-April 2020 — claiming letting relief for a period that was not shared occupancy." },
        { kind: "text", md: "**EIS deferral (reinvestment) relief** lets an investor **defer** a gain on any asset by subscribing for **Enterprise Investment Scheme** shares within **one year before to three years after** the disposal. There is no upper limit on the deferred gain, and it is **frozen, not forgiven** — it crystallises when the EIS shares are sold (or another chargeable event occurs). This is the CGT companion to EIS income tax relief and is a favourite for pairing with a large business gain." },
      ],
    },
    {
      id: "iht-lifetime",
      heading: "IHT on lifetime gifts — PETs, CLTs, cumulation and taper",
      blocks: [
        { kind: "text", md: "Every lifetime gift is one of three things. An **exempt transfer** (spouse, charity, or covered by an annual/small-gifts exemption) drops out entirely. A **potentially exempt transfer (PET)** — a gift to another **individual** — carries **no lifetime tax** and becomes fully exempt if the donor survives **7 years**. A **chargeable lifetime transfer (CLT)** — typically a gift into a **relevant property trust** — is taxed **immediately** at the **lifetime rate**." },
        { kind: "callout", tone: "rule", title: "FA2024/25 IHT rates & the nil rate band", md: "Nil rate band (NRB) **£325,000**. Lifetime rate on CLTs **20%** (or an effective **25%** where the donor bears the tax, i.e. 20/80 grossing). Death rate **40%**. Annual exemption **£3,000** per year (one year's unused amount carries forward one year). Small gifts **£250** per donee." },
        { kind: "text", md: "**Cumulation** is the engine of lifetime IHT: to find the NRB available for any chargeable transfer, look back **7 years** and subtract the **gross chargeable transfers** already made in that window. The NRB is not a per-gift allowance — it is a rolling 7-year band." },
        { kind: "text", md: "If the donor **dies within 7 years**, the picture is redrawn. Every PET in the 7 years becomes **chargeable**; every CLT is **re-computed at the 40% death rate** (with credit for lifetime tax already paid). Where the gift was made **more than 3 years** before death, **taper relief** cuts the **tax** (never the transfer):" },
        { kind: "diagram", diagram: {
          type: "timeline",
          title: "Taper relief — reduction in the death tax by years survived after the gift",
          caption: "Taper reduces the TAX, not the value transferred, and never below the lifetime tax already paid on a CLT.",
          data: {
            points: [
              { label: "0–3 years", sub: "No taper — full charge" },
              { label: "3–4 years", sub: "20% reduction" },
              { label: "4–5 years", sub: "40% reduction" },
              { label: "5–6 years", sub: "60% reduction" },
              { label: "6–7 years", sub: "80% reduction" },
              { label: "7+ years", sub: "Falls out — exempt" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — a CLT taxed in lifetime and again on death", scenario: "On 1 June 2020 Nadia gave £500,000 into a discretionary trust — her first-ever lifetime gift. The trustees agreed to pay any IHT. She had made no gifts in the two prior years. Nadia died on 1 August 2025. Compute (a) the lifetime IHT and (b) the additional IHT on death.", steps: [
          { label: "Annual exemptions", detail: "£3,000 for 2020/21 plus £3,000 brought forward from 2019/20 = £6,000. Net transfer £500,000 − £6,000 = **£494,000**." },
          { label: "NRB available (lifetime)", detail: "No gifts in the prior 7 years, so full **£325,000** NRB is available." },
          { label: "Excess over NRB", detail: "£494,000 − £325,000 = **£169,000** is chargeable in lifetime." },
          { label: "Lifetime tax (trustees pay → 20%)", detail: "£169,000 × 20% = **£33,800** lifetime IHT." },
          { label: "Death recompute — gap", detail: "1 Jun 2020 to 1 Aug 2025 = **5 years 2 months**, so taper of **60%** applies (5–6 year band)." },
          { label: "Death tax before credits", detail: "Chargeable £169,000 × 40% = £67,600; less taper 60% = £67,600 × 40% = **£27,040**." },
          { label: "Credit for lifetime tax", detail: "Lifetime IHT £33,800 already paid exceeds the tapered death tax £27,040, so the additional death charge is **£nil** (no refund of the excess)." },
        ], result: "(a) £33,800 lifetime IHT; (b) £nil extra on death. Because Nadia survived over 5 years and lifetime tax already covered the tapered figure, the trust owes nothing further — a classic 'taper plus lifetime credit wipes out the death charge' result." },
      ],
      check: {
        q: "A donor makes a PET of £200,000 and dies 6 years and 4 months later. How is taper relief applied to the death tax on this gift?",
        options: [
          "The £200,000 transfer is reduced by 80%",
          "The tax on the gift is reduced by 80%",
          "The tax on the gift is reduced by 60%",
          "No taper — the gift is fully chargeable at 40%",
        ],
        correct: 1,
        explain: "Taper reduces the TAX, not the value, and 6–7 years survived gives an 80% reduction. So the death tax on the gift is charged at 40% then cut by 80% (leaving 20% × 40% = an effective 8%). Reducing the transfer itself, or using the wrong band, are the standard errors.",
      },
    },
    {
      id: "bpr-estate",
      heading: "BPR, APR and the death estate with the RNRB",
      blocks: [
        { kind: "text", md: "Two reliefs can strip business and farming value out of a transfer **before** any IHT is charged — in lifetime and on death. Both need a **2-year ownership** period (with limited replacement/inheritance easements)." },
        { kind: "table", caption: "Business & agricultural property relief — FA2024/25 rates", head: ["Relief", "100%", "50%"], rows: [
          ["BPR", "Unquoted trading shares; a sole-trade business or partnership interest", "Quoted shares giving control; land, buildings or plant used by the donor's company/partnership"],
          ["APR", "Owner-occupied farmland; let farmland (post-1995 tenancies)", "Certain older let agricultural tenancies"],
        ] },
        { kind: "callout", tone: "warn", title: "BPR is not automatic on everything", md: "**Excepted assets** (surplus cash, investments held for non-trade reasons) get no BPR. An **investment** business (property letting, holding shares for income) is not a trade — its shares fail BPR entirely. Check the nature of the business before granting relief." },
        { kind: "text", md: "The **death estate** gathers everything the deceased owned at death at **market value**, deducts liabilities and the **funeral costs**, applies exemptions (spouse, charity) and BPR/APR, then charges IHT at **40%** on the excess over the **available NRB** — after cumulating chargeable gifts in the **7 years before death**." },
        { kind: "callout", tone: "rule", title: "The residence nil rate band (RNRB)", md: "An extra **£175,000** band where a **residence** is left to **direct descendants** (children, grandchildren). It is **tapered by £1 for every £2** the estate exceeds **£2,000,000**, so it is fully lost once the estate reaches **£2,350,000**. Unused NRB and RNRB are **transferable to a surviving spouse**." },
        { kind: "example", title: "Worked example — death estate with a tapered RNRB", scenario: "Owen dies in 2024/25 leaving a net estate of £2,100,000, which includes his home worth £400,000 left to his son. He had made a chargeable gift of £100,000 (gross) 4 years before death. He was widowed but no nil bands were transferred. Compute the IHT on the estate.", steps: [
          { label: "RNRB taper", detail: "Estate £2,100,000 exceeds £2,000,000 by £100,000. Taper = £100,000 / 2 = £50,000. RNRB = £175,000 − £50,000 = **£125,000**." },
          { label: "NRB available", detail: "£325,000 NRB less the £100,000 chargeable gift in the prior 7 years = **£225,000** left for the estate." },
          { label: "Total bands at 0%", detail: "£225,000 NRB + £125,000 RNRB = **£350,000** taxed at nil." },
          { label: "Taxable estate", detail: "£2,100,000 − £350,000 = **£1,750,000**." },
          { label: "IHT at 40%", detail: "£1,750,000 × 40% = **£700,000**." },
        ], result: "£700,000. Two traps caught here: the RNRB is tapered (not the full £175,000), and the earlier gift eats into the estate's NRB even though it was itself below the band." },
      ],
      check: {
        q: "An estate is valued at £2,300,000 and includes a home left to the deceased's daughter. By how much is the £175,000 RNRB reduced by the estate-value taper?",
        options: [
          "£150,000, leaving £25,000",
          "£175,000, leaving £nil",
          "£300,000, so it cannot go below zero — £nil",
          "It is not tapered because a home is left to a descendant",
        ],
        correct: 0,
        explain: "The estate exceeds £2,000,000 by £300,000; taper is £1 for every £2 = £150,000. RNRB £175,000 − £150,000 = £25,000 remaining. Full loss only happens at £2,350,000. Leaving a home to a descendant is what makes the RNRB available in the first place — it does not stop the taper.",
      },
    },
    {
      id: "trusts",
      heading: "The relevant property trust regime — entry, exit and principal charges",
      blocks: [
        { kind: "text", md: "Most lifetime trusts (discretionary trusts, and post-2006 interest-in-possession trusts) are **relevant property trusts**. They face IHT at three moments, so the trust cannot be used to park wealth outside the net indefinitely." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Three IHT charge points in a relevant property trust",
          data: {
            steps: [
              { label: "Entry charge", sub: "Gift in = CLT, 20% lifetime on excess over NRB" },
              { label: "Exit charge", sub: "Property leaves before the first 10-year point" },
              { label: "Principal charge", sub: "Every 10th anniversary, max 6%" },
              { label: "Later exit charges", sub: "Fraction of the last principal rate" },
            ],
          },
        } },
        { kind: "text", md: "The **entry charge** is simply the CLT computation from the previous section — 20% (or 25% grossed) on the value above the available NRB. The **principal (10-year) charge** taxes the trust's value on each **10th anniversary** at a maximum **effective 6%**. The rate is built as: a notional transfer (trust value plus the settlor's cumulation) taxed at the **20% lifetime rate** over the NRB, expressed as an **effective rate**, then multiplied by **30%** — giving the 6% ceiling (30% × 20%)." },
        { kind: "example", title: "Worked example — the 10-year principal charge", scenario: "A discretionary trust set up on 1 July 2015 (settlor's cumulation £nil at the time) is worth £700,000 at its 10-year anniversary on 1 July 2025. No property has left. The NRB is £325,000. Compute the principal charge.", steps: [
          { label: "Value over NRB", detail: "£700,000 − £325,000 = **£375,000** in the notional transfer." },
          { label: "Notional lifetime tax", detail: "£375,000 × 20% = **£75,000**." },
          { label: "Effective rate", detail: "£75,000 / £700,000 = **10.714%**." },
          { label: "Charge rate", detail: "Effective rate × 30% = 10.714% × 30% = **3.214%**." },
          { label: "Principal charge", detail: "£700,000 × 3.214% = **£22,500**." },
        ], result: "£22,500. Note the maximum possible is 6% (if the whole value sat above the NRB); here only part did, so the effective rate is well under the ceiling. Exit charges before the next anniversary are then a fraction (complete quarters / 40) of this last principal rate." },
        { kind: "callout", tone: "tip", md: "The **exit charge** in the first 10 years uses the **settlor's cumulation and the initial value**; after a principal charge it uses the **rate from that last 10-year charge**, scaled by the number of complete quarters the property was in the trust since the anniversary. Always ask **which** cumulation the question wants." },
      ],
      check: {
        q: "A relevant property trust is worth £900,000 at its 10-year anniversary; the whole value sits above the available NRB. What is the ABSOLUTE maximum principal charge rate that can apply?",
        options: [
          "40%",
          "20%",
          "6%",
          "3%",
        ],
        correct: 2,
        explain: "The principal charge is 30% of the effective lifetime rate, and the lifetime rate is capped at 20% — so the maximum is 30% × 20% = 6%. The 40% death rate and the raw 20% lifetime rate never apply to the anniversary charge.",
      },
    },
    {
      id: "interaction",
      heading: "The CGT and IHT interaction on lifetime gifts",
      blocks: [
        { kind: "text", md: "The examiner's favourite advanced twist: **one gift, two taxes**. Give away a chargeable asset in lifetime and you can trigger **CGT** (a disposal at **market value** to a connected person) **and** **IHT** (a PET or CLT) on the very same transfer. The reliefs are designed to stop the same value being taxed twice at once — but they push the charge to different future dates." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "One gift of shares into a trust — how the value is charged",
          caption: "s260 defers the CGT into the donee's base cost; the CLT charges IHT now on the value over the NRB.",
          data: {
            unit: "£000",
            items: [
              { label: "Market value of gift", value: 600, kind: "start" },
              { label: "CGT held over (s260)", value: -140, kind: "delta" },
              { label: "IHT: covered by NRB", value: -325, kind: "delta" },
              { label: "IHT charged now (over NRB)", value: -135, kind: "delta" },
              { label: "Value left to charge later", value: 0, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "The key moves to keep straight: a gift into a **relevant property trust** is a **CLT** (immediate IHT) **and** allows **s260 holdover** (because it is immediately chargeable to IHT), so the CGT is deferred **regardless of the asset type**. A gift of **business assets to an individual** is a **PET** (no immediate IHT) and allows **s165 holdover** on the CGT. A gift of a **non-business asset to an individual** is a PET but has **no CGT holdover** — the donor pays CGT now with nothing to defer it." },
        { kind: "callout", tone: "key", title: "Death changes everything for CGT", md: "There is **no CGT on death** — assets pass to the estate at **probate (market) value**, so heirs get a **tax-free uplift** and any latent gain is wiped. IHT, by contrast, charges the death estate. This is why deferring a gain by holdover, then holding to death, can eliminate the CGT while only the IHT remains." },
        { kind: "text", md: "One more relief to net off: **fall in value relief**. If a PET or CLT becomes chargeable on death and the asset has **fallen in value** between the gift and death (or earlier sale), the IHT can be recomputed on the **lower** value — though taper relief is still measured on the original date. Watch for it whenever a question gives you two values for the same gifted asset." },
      ],
    },
  ],
  examTraps: [
    { trap: "Running an entire gain through BADR at 10% when part of the £1m lifetime limit was already used.", fix: "Deduct prior BADR gains first; only the remaining limit gets 10% — the excess pays 10%/20% (or 18%/24% for residential)." },
    { trap: "Using s260 holdover on a gift that is a PET, or s165 on a gift with no business asset.", fix: "s260 needs an immediately chargeable transfer (a CLT); s165 needs a qualifying business asset. Match the relief to the trigger." },
    { trap: "Reducing the transfer value by taper relief.", fix: "Taper relief cuts the death TAX, never the transfer. And it never reduces below the lifetime tax already paid on a CLT." },
    { trap: "Giving the full £175,000 RNRB on a large estate.", fix: "Taper the RNRB by £1 for every £2 the estate exceeds £2,000,000 — fully gone at £2,350,000." },
    { trap: "Charging the 10-year principal charge at 20% or 6% of the whole trust value.", fix: "Build the effective rate (notional 20% tax over NRB ÷ value), then take 30% of it. 6% is only the ceiling when everything sits above the NRB." },
    { trap: "Forgetting the CGT-free uplift on death and taxing the heir's inherited gain.", fix: "Assets pass at probate value with no CGT on death; the heir's base cost is that market value, so pre-death gains vanish." },
  ],
  keyTerms: [
    { term: "BADR", def: "Business Asset Disposal Relief — a 10% CGT rate on up to £1,000,000 of qualifying lifetime gains from selling a business or a 5% personal-company holding held 2 years." },
    { term: "s165 vs s260 holdover", def: "s165 defers CGT on gifts of business assets; s260 defers CGT on any gift that is immediately chargeable to IHT (e.g. into a relevant property trust). Both cut the donee's base cost." },
    { term: "PET / CLT", def: "A potentially exempt transfer is a lifetime gift to an individual (no lifetime IHT, exempt after 7 years); a chargeable lifetime transfer is a gift into a relevant property trust, taxed at 20% now." },
    { term: "Taper relief", def: "A reduction in the IHT charged on a gift where the donor survives 3–7 years: 20/40/60/80% for the 3–4, 4–5, 5–6 and 6–7 year bands. It reduces tax, not value." },
    { term: "RNRB", def: "Residence nil rate band — an extra £175,000 (FA2024/25) where a home passes to direct descendants, tapered £1 for £2 above a £2,000,000 estate." },
    { term: "Principal charge", def: "The 10-yearly IHT charge on a relevant property trust — 30% of the effective lifetime rate, capped at an effective 6% of the trust's value." },
  ],
  summary: [
    "CGT reliefs stack by purpose: BADR (10% up to £1m) rewards a sale; s165/s260 holdover, rollover and s162 incorporation defer a gain into a new base cost or new asset.",
    "PPR exempts occupied and deemed-occupied periods plus the final 9 months; letting relief adds the lowest of the PPR given, £40,000 and the let-period gain; EIS defers any gain until the shares are sold.",
    "Lifetime IHT runs on 7-year cumulation: PETs carry no lifetime tax, CLTs pay 20% now, and death within 7 years recomputes at 40% with taper relief on the tax.",
    "BPR/APR (100%/50%) strip business and farm value before IHT; the death estate charges 40% over the NRB (£325,000) and RNRB (£175,000, tapered above a £2,000,000 estate).",
    "One gift can trigger both taxes: holdover parks the CGT while the IHT bites now — and death gives a CGT-free uplift, leaving only IHT on the estate.",
  ],
}
