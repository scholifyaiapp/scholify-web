import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX · Area D — VAT & stamp taxes (advanced).
 * Advanced VAT: group registration, partial exemption (de minimis + annual
 * adjustment), the capital goods scheme, land & buildings (option to tax),
 * TOGC, place of supply, the points-based penalty regime; then stamp duty and
 * SDLT. UK FA2024/25 basis. Original throughout — no ACCA/Kaplan/BPP text; every
 * calculation is re-solved on FA2024/25 figures.
 */

export const ATX_D: StudyChapter = {
  paper: "ATX",
  area: "D",
  title: "VAT & stamp taxes (advanced)",
  minutes: 15,
  intro: "At TX you learned to charge VAT and file a return. At ATX the questions are sharper: when does a business lose input tax, how does a property deal ripple across ten years, and what does a share purchase really cost once stamp taxes are added?",
  outcomes: [
    "Explain when and why a group of companies would register for VAT as a single entity",
    "Apply the partial exemption de minimis tests on FA2024/25 limits and perform the annual adjustment",
    "Adjust input tax under the capital goods scheme over its 5- or 10-interval life",
    "Advise on the option to tax land and buildings and identify a valid TOGC",
    "Determine the place of supply of services and apply the points-based penalty regime",
    "Compute SDLT on residential and non-residential land, the 3% surcharge, and 0.5% stamp duty on shares",
  ],
  sections: [
    {
      id: "groups",
      heading: "VAT group registration",
      blocks: [
        { kind: "text", md: "A corporate group is legally several companies but commercially one business. VAT lets it be treated that way. **Two or more bodies corporate under common control**, each with a fixed establishment in the UK, may apply to register as a **VAT group**. One company is nominated the **representative member**; it holds the group VAT number and files **one return** covering them all." },
        { kind: "text", md: "The headline benefit is that **supplies between group members are disregarded** — ignored entirely for VAT. A trading company selling to a fellow subsidiary charges no VAT, so no output tax is due and no input tax has to be reclaimed, and there is no cash sitting with HMRC between the two returns. Administration collapses from many returns to one." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "What a VAT group changes",
          caption: "Common control + UK establishment is the entry ticket; the trade-offs follow.",
          data: {
            items: [
              { title: "One representative member", sub: "Single VAT number, single return for the whole group" },
              { title: "Intra-group supplies ignored", sub: "No output tax, no input tax, no cash tied up between members" },
              { title: "Joint and several liability", sub: "Every member is liable for the whole group's VAT debt" },
              { title: "Partial exemption is group-wide", sub: "One recovery calculation — an exempt member can drag down recovery" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The catch", md: "Grouping is not free. All members become **jointly and severally liable** for the group's VAT, and partial exemption is computed for the group **as a whole** — so bringing an exempt-heavy member (a finance or property company) into the group can **restrict input tax recovery** for everyone. Advise on the trade-off, never just the admin saving." },
      ],
    },
    {
      id: "partial-exemption",
      heading: "Partial exemption and the de minimis tests",
      blocks: [
        { kind: "text", md: "A business that makes **both** taxable and exempt supplies is **partially exempt**. Input tax on costs used for taxable supplies is recoverable; input tax on costs used for exempt supplies is **not**. The problem is the overlap — **residual** (non-attributable) input tax on general overheads used for both. The standard method splits it in proportion to **taxable turnover ÷ total turnover**, rounded up to the next whole percentage." },
        { kind: "callout", tone: "rule", title: "De minimis limits — FA2024/25", md: "Exempt input tax is treated as recoverable (as if it were taxable) if it satisfies **both** limbs: it is **no more than £625 per month on average** (i.e. £1,875 a quarter, £7,500 a year) **and** it is **no more than 50% of total input tax**. Fail either limb and the exempt input tax is wholly irrecoverable." },
        { kind: "example", title: "Worked example — the de minimis test (one quarter)", scenario: "Delta Ltd is partially exempt. For the quarter it has input tax of £12,000 directly attributable to taxable supplies, £1,200 directly attributable to exempt supplies, and £3,000 of residual input tax on overheads. Taxable turnover was £150,000 and exempt turnover £30,000. Is Delta de minimis, and how much input tax can it recover?", steps: [
          { label: "Recovery percentage", detail: "Taxable ÷ total = £150,000 ÷ £180,000 = 83.33%, rounded up to **84%**." },
          { label: "Split the residual", detail: "Recoverable residual = 84% × £3,000 = £2,520. The other £480 is residual attributable to exempt supplies." },
          { label: "Total exempt input tax", detail: "Direct exempt £1,200 + residual exempt £480 = **£1,680**." },
          { label: "Limb 1 — the £1,875 quarterly limit", detail: "£1,680 is below £1,875. Passed." },
          { label: "Limb 2 — the 50% test", detail: "Total input tax = £12,000 + £1,200 + £3,000 = £16,200; 50% = £8,100. £1,680 is far below £8,100. Passed." },
        ], result: "Both limbs are satisfied, so Delta is de minimis and recovers ALL of its input tax — the full £16,200, including the £1,680 that relates to exempt supplies." },
        { kind: "callout", tone: "key", title: "The annual adjustment", md: "The quarterly recovery is provisional. After the VAT year (usually to 31 March, 30 April or 31 May) the business runs the **same calculation on the full year's figures** and compares it to the sum of the four quarters. The difference is corrected on the **first return after the year end** (or the final return). This is why a business can be de minimis quarter-by-quarter yet still have to repay input tax on the annual view." },
      ],
      check: {
        q: "A business's exempt input tax for the year is £8,200, which is 22% of its total input tax. On the annual de minimis test, how is that £8,200 treated?",
        options: [
          "Fully recoverable — it is under 50% of total input tax",
          "Irrecoverable — it exceeds the £7,500 annual limit even though it passes the 50% test",
          "Half recoverable, because only one limb is met",
          "Recoverable up to £7,500, with the £700 excess disallowed",
        ],
        correct: 1,
        explain: "Both limbs must be satisfied. The 50% test passes (22%), but the annual monetary limit is £7,500 and £8,200 exceeds it, so limb 1 fails. Failing either limb makes the WHOLE £8,200 irrecoverable — the test is all-or-nothing, not a £7,500 allowance with the excess pared off.",
      },
    },
    {
      id: "cgs",
      heading: "The capital goods scheme",
      blocks: [
        { kind: "text", md: "Recovery on a big capital asset is fixed by its use in the **year of purchase** — but a building lasts decades and its use can drift between taxable and exempt activity. The **capital goods scheme (CGS)** stops that first-year snapshot being the final word: it spreads the input tax over the asset's life and **re-tests recovery each year** as the taxable-use percentage moves." },
        { kind: "callout", tone: "rule", title: "What the CGS catches — FA2024/25", md: "**Land and buildings costing £250,000 or more** (excluding VAT) — adjusted over **10 intervals**. **Computers, computer equipment, ships and aircraft costing £50,000 or more** (excluding VAT) — adjusted over **5 intervals**. Below these limits the CGS does not apply." },
        { kind: "formula", name: "CGS annual adjustment", expr: "(Total input VAT ÷ intervals) × (taxable-use % this interval − taxable-use % in first interval)", note: "A positive result means extra VAT to reclaim; a negative result means VAT to repay to HMRC." },
        { kind: "example", title: "Worked example — a building over its CGS life", scenario: "Orion Ltd buys an office for £500,000 plus £100,000 VAT. In the first interval the building is 60% used for taxable supplies, so £60,000 is recovered initially. Taxable use then rises to 80% in interval 2 and falls to 45% in interval 3. Compute the CGS adjustments.", steps: [
          { label: "Confirm the scheme applies", detail: "Cost £500,000 ≥ £250,000, so it is a CGS item with a **10-interval** period. Annual slice = £100,000 ÷ 10 = £10,000." },
          { label: "First interval", detail: "Recovery is the actual 60% × £100,000 = £60,000. This 60% becomes the baseline for later intervals." },
          { label: "Interval 2 (use rises to 80%)", detail: "£10,000 × (80% − 60%) = **+£2,000** — an extra £2,000 reclaimed from HMRC." },
          { label: "Interval 3 (use falls to 45%)", detail: "£10,000 × (45% − 60%) = **−£1,500** — £1,500 repaid to HMRC." },
        ], result: "The CGS keeps recovery honest year by year: +£2,000 when taxable use rose, −£1,500 when it fell, each measured against the original 60% baseline. If the building were sold during the period, a one-off final adjustment would treat the remaining intervals as fully taxable or fully exempt depending on the sale." },
      ],
      check: {
        q: "A company buys a server for £48,000 plus VAT. Does the capital goods scheme apply?",
        options: [
          "Yes — computers are always CGS items",
          "Yes, but over 10 intervals like all CGS assets",
          "No — computer equipment must cost £50,000 or more (excluding VAT) to enter the scheme",
          "No — the CGS only ever applies to land and buildings",
        ],
        correct: 2,
        explain: "Computer equipment enters the CGS only at £50,000 or more excluding VAT. At £48,000 the server is below the limit, so input tax is recovered normally with no annual re-testing. Had it reached the limit, the period would be 5 intervals (not 10 — that length is reserved for land and buildings).",
      },
    },
    {
      id: "land-togc",
      heading: "Land, buildings, the option to tax and TOGC",
      blocks: [
        { kind: "text", md: "Most supplies of **land and buildings are exempt** from VAT (with exceptions such as new commercial buildings, which are standard-rated for the first three years). Exempt sounds good, but it **blocks input tax recovery** on the related costs — refurbishment, agents, legal fees. The escape hatch is the **option to tax**." },
        { kind: "text", md: "By **opting to tax**, an owner elects to charge 20% VAT on rents and on any sale of that property, which in turn **unlocks input tax recovery** on the costs. The option lasts **20 years** and is generally irrevocable in that window. It is worthwhile when the tenant or buyer is VAT-registered and can recover the VAT charged — but a **poison pill** if they are exempt (a bank, an insurer) or a private individual, because the VAT then becomes a real, unrecoverable cost that depresses rent and price." },
        { kind: "text", md: "A property or business often changes hands as a whole. If the sale qualifies as a **transfer of a going concern (TOGC)**, it is treated as **neither a supply of goods nor of services** — so no VAT is charged at all, which saves cash flow and, for property, avoids adding VAT to the SDLT base." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Is it a TOGC? (outside the scope of VAT if all are met)",
          caption: "Miss any step and the sale is a normal taxable supply.",
          data: {
            steps: [
              { label: "A going concern", sub: "The business is transferred as an operating whole, not stripped assets" },
              { label: "Same kind of trade", sub: "The buyer carries on the same type of business without a break" },
              { label: "Buyer VAT-registered", sub: "Registered, or becomes registerable, on the transfer" },
              { label: "Property: buyer opts to tax", sub: "If the seller had opted to tax, the buyer must opt too and notify HMRC" },
              { label: "Outside the scope", sub: "No VAT charged on the transfer" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Why TOGC status is worth chasing", md: "On a £2m opted commercial building, a normal sale adds £400,000 VAT the buyer must fund upfront (and often pay 5% SDLT on top of). Qualifying as a TOGC removes that £400,000 charge entirely — pure cash-flow and SDLT relief. Always test the TOGC conditions before assuming VAT is due." },
      ],
      check: {
        q: "A landlord owns an exempt commercial building and wants to recover the VAT on a £200,000 refurbishment. The only prospective tenant is a firm of insurance brokers whose supplies are exempt. What is the best advice on opting to tax?",
        options: [
          "Opt to tax — it always unlocks input tax recovery at no cost",
          "Opt to tax, because the tenant can simply reclaim the VAT charged",
          "Weigh it carefully — opting recovers the £40,000 input VAT but forces 20% VAT onto rent the exempt tenant cannot recover, weakening the letting",
          "Opting is impossible on a building that has ever been exempt",
        ],
        correct: 2,
        explain: "The option recovers the £40,000 input tax on the refurbishment, but it makes the rent VAT-bearing. An exempt tenant (an insurance broker) cannot recover that VAT, so it becomes a real cost that suppresses the rent achievable. Opting is a judgement call about WHO the tenant is — not an automatic win, and it is certainly possible on a previously-exempt building.",
      },
    },
    {
      id: "place-penalties",
      heading: "Place of supply and the penalty regime",
      blocks: [
        { kind: "text", md: "Cross-border services need a **place of supply** — the country whose VAT rules apply. The **general rule** turns on who the customer is. For **business-to-business (B2B)** services the place of supply is where the **customer** belongs; for **business-to-consumer (B2C)** it is where the **supplier** belongs. Special rules override this for land, admission to events, and some digital services." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "General place-of-supply rule for services",
          data: {
            leftTitle: "B2B (business customer)",
            rightTitle: "B2C (private consumer)",
            rows: [
              { aspect: "Place of supply", left: "Where the customer belongs", right: "Where the supplier belongs" },
              { aspect: "Who accounts for VAT", left: "Customer, via the reverse charge", right: "Supplier, in its own country" },
              { aspect: "Supplier's invoice", left: "No VAT — customer self-accounts", right: "Supplier's local VAT charged" },
              { aspect: "Cash-flow effect", left: "Usually nil — output and input net off", right: "Real VAT paid by the consumer" },
            ],
          },
        } },
        { kind: "text", md: "The **reverse charge** is the mechanism behind B2B: the UK business customer charges itself output VAT on the service **and** recovers the same amount as input tax (subject to its own recovery position), so a fully-taxable trader nets to nil. It stops overseas suppliers gaining a VAT advantage over UK ones." },
        { kind: "callout", tone: "rule", title: "Points-based penalties — FA2024/25", md: "**Late submission:** each late return earns **one point**. A penalty of **£200** is charged once the points threshold is reached — **2 points** for annual filers, **4** for quarterly, **5** for monthly — and £200 for every further late return until points are cleared by a period of compliance. **Late payment:** nothing if paid within **15 days**; **2%** of the VAT unpaid at day 15 if paid days 16–30; a further **2%** plus a daily charge (currently **4% a year**) once 31 days late. Interest also runs on late-paid VAT." },
      ],
    },
    {
      id: "stamp-sdlt",
      heading: "Stamp duty land tax and stamp duty on shares",
      blocks: [
        { kind: "text", md: "Two separate taxes hit transfers. **Stamp duty land tax (SDLT)** is charged on buying **land and buildings** in England and Northern Ireland; **stamp duty** at **0.5%** is charged on buying **shares**. SDLT is a slice system — like income tax bands, each rate applies only to the part of the price falling in that band, not the whole price." },
        { kind: "callout", tone: "rule", title: "SDLT rates — FA2024/25", md: "**Residential:** £0–£250,000 at **0%**; £250,001–£925,000 at **5%**; £925,001–£1,500,000 at **10%**; above £1,500,000 at **12%**. A **3% surcharge** applies to the whole price on additional dwellings (second homes, buy-to-let, most company purchases). **Non-residential / mixed:** £0–£150,000 at **0%**; £150,001–£250,000 at **2%**; above £250,000 at **5%**." },
        { kind: "example", title: "Worked example — SDLT on a residential purchase", scenario: "Aurelia Ltd buys a residential house for £700,000 as a rental investment. Because a company is buying an additional dwelling, the 3% surcharge applies. Compute the SDLT.", steps: [
          { label: "Band 1: £0–£250,000", detail: "£250,000 × 0% = £0." },
          { label: "Band 2: £250,001–£700,000", detail: "£450,000 × 5% = £22,500." },
          { label: "Base SDLT", detail: "£0 + £22,500 = £22,500." },
          { label: "3% surcharge", detail: "The surcharge applies to the WHOLE price: £700,000 × 3% = £21,000." },
        ], result: "Total SDLT = £22,500 + £21,000 = £43,500. Without the surcharge (e.g. an individual's only home) the charge would be just £22,500 — the surcharge nearly doubles the cost." },
        { kind: "example", title: "Worked example — non-residential SDLT", scenario: "The same company instead buys a commercial warehouse for £400,000. Non-residential rates apply and there is no surcharge on commercial property.", steps: [
          { label: "Band 1: £0–£150,000", detail: "£150,000 × 0% = £0." },
          { label: "Band 2: £150,001–£250,000", detail: "£100,000 × 2% = £2,000." },
          { label: "Band 3: £250,001–£400,000", detail: "£150,000 × 5% = £7,500." },
        ], result: "Total SDLT = £0 + £2,000 + £7,500 = £9,500. Note there is never a 3% surcharge on non-residential land — the surcharge is a residential-only rule." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "SDLT: residential vs non-residential",
          data: {
            leftTitle: "Residential land",
            rightTitle: "Non-residential / mixed",
            rows: [
              { aspect: "Nil-rate band", left: "Up to £250,000", right: "Up to £150,000" },
              { aspect: "Middle band", left: "5% to £925,000", right: "2% (£150,001–£250,000)" },
              { aspect: "Top rates", left: "10% then 12% above £1.5m", right: "5% above £250,000" },
              { aspect: "3% surcharge", left: "Applies to additional dwellings", right: "Never applies" },
            ],
          },
        } },
        { kind: "text", md: "**Shares** are outside SDLT. Buying shares for cash consideration attracts **stamp duty at 0.5%** on the amount paid, rounded up to the nearest £5 (electronic transfers via CREST bear the equivalent **stamp duty reserve tax** at 0.5% with no rounding). So a £250,000 share purchase costs **£250,000 × 0.5% = £1,250** in duty. There is no 0.5% charge on a fresh issue of new shares by the company itself — only on transfers of existing shares." },
        { kind: "callout", tone: "tip", title: "Deal structuring insight", md: "Selling a **trade and assets** can trigger SDLT at up to 5% (commercial) or 12%+3% (residential) on the property involved, plus VAT unless it is a TOGC. Selling the **company's shares** instead caps the transfer tax at **0.5%**. That gap is a recurring ATX planning point — but weigh it against the buyer inheriting the company's latent liabilities." },
      ],
      check: {
        q: "An individual buys their first and only home, a flat, for £300,000. Applying the FA2024/25 residential rates with no surcharge, what is the SDLT (ignoring first-time buyer relief)?",
        options: [
          "£15,000 — 5% on the whole price",
          "£2,500 — 5% on the £50,000 above £250,000",
          "£9,000 — 3% surcharge on the whole price",
          "£6,000 — 2% on the £300,000",
        ],
        correct: 1,
        explain: "SDLT is a slice tax: the first £250,000 is at 0% (£0) and only the £50,000 above £250,000 is taxed, at 5% = £2,500. Charging 5% on the whole £300,000 (£15,000) ignores the nil-rate band; the 3% surcharge does not apply to an only home; and 2% is the non-residential middle rate, not a residential rate.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a VAT group as a pure admin win.", fix: "All members are jointly and severally liable, and partial exemption is calculated group-wide — an exempt member can restrict everyone's recovery. Always state the trade-off." },
    { trap: "Reading the de minimis £7,500 as an allowance, disallowing only the excess.", fix: "It is a pass/fail threshold. Fail either limb (£625/month or 50%) and the WHOLE exempt input tax is irrecoverable — not just the amount over £7,500." },
    { trap: "Using a 10-interval CGS period for computers.", fix: "Land and buildings (£250,000+) run 10 intervals; computers, ships and aircraft (£50,000+) run 5 intervals." },
    { trap: "Assuming opting to tax is always beneficial.", fix: "It unlocks input tax but forces 20% onto rent/sale price. If the tenant or buyer is exempt or a private individual, the VAT becomes an unrecoverable cost — advise case by case." },
    { trap: "Charging SDLT at the top rate on the whole price.", fix: "SDLT is a slice/band tax like income tax — each rate applies only to the portion in that band. The 3% surcharge, by contrast, does apply to the whole price, and only on residential additional dwellings." },
  ],
  keyTerms: [
    { term: "Representative member", def: "The single company in a VAT group that holds the group VAT number and files one return; all members are jointly and severally liable." },
    { term: "De minimis limits", def: "Exempt input tax is recoverable if it is both no more than £625/month on average (£7,500 a year) and no more than 50% of total input tax." },
    { term: "Capital goods scheme", def: "A mechanism that re-tests input tax recovery on land/buildings (£250,000+, 10 intervals) and computers/ships/aircraft (£50,000+, 5 intervals) as taxable use changes." },
    { term: "Option to tax", def: "An election to charge 20% VAT on an otherwise-exempt property, unlocking input tax recovery; it lasts 20 years and is generally irrevocable." },
    { term: "TOGC", def: "Transfer of a going concern — a business sold as an operating whole to a VAT-registered buyer continuing the same trade; treated as neither a supply of goods nor services, so no VAT is charged." },
    { term: "Reverse charge", def: "The rule making a B2B customer self-account for output VAT on services received from abroad, recovering the same as input tax, so a fully-taxable trader nets to nil." },
  ],
  summary: [
    "A VAT group files one return and disregards intra-group supplies, but brings joint and several liability and group-wide partial exemption.",
    "Exempt input tax is only recoverable if it passes BOTH de minimis limbs (£7,500/year AND 50%); the annual adjustment re-runs the test on full-year figures.",
    "The capital goods scheme spreads big-asset input tax over 10 intervals (land/buildings £250,000+) or 5 (computers etc. £50,000+), re-testing recovery each year.",
    "Opting to tax turns exempt property into standard-rated, unlocking input tax — beneficial only where the tenant/buyer can recover the VAT; a valid TOGC removes VAT from the transfer entirely.",
    "SDLT is a band tax (residential nil-rate £250,000, 3% surcharge on additional dwellings; non-residential nil-rate £150,000), while share transfers bear stamp duty at just 0.5%.",
  ],
}
