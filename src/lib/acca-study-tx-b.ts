import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX (Taxation UK) · Area B — Chargeable gains for individuals.
 * UK FA2024/25 basis. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 * Every figure restated in the text so the reader learns METHOD, not memory.
 */

export const TX_B: StudyChapter = {
  paper: "TX",
  area: "B",
  title: "Chargeable gains (individuals)",
  minutes: 16,
  intro: "When you sell an asset for more than it cost you, the profit can be taxed — but only after a chain of deductions, reliefs and special rules that reward business owners and protect your home. Master the chain and CGT becomes mechanical.",
  outcomes: [
    "Build the capital gains tax computation from proceeds to tax, deducting the £3,000 annual exempt amount",
    "Apply the correct CGT rates — 18%/24% (and the pre-30 October 2024 10%/20% for non-residential assets)",
    "Handle chattels (the £6,000 rule and wasting assets) and part disposals using A/(A+B)",
    "Match a share disposal under the same-day, next-30-days and s104 pool rules",
    "Apply principal private residence relief, the shared-occupation letting rule, and business asset disposal relief",
  ],
  sections: [
    {
      id: "computation",
      heading: "What CGT charges — and the computation",
      blocks: [
        { kind: "text", md: "Capital gains tax bites when a **chargeable person** makes a **chargeable disposal** of a **chargeable asset**. All three must be present. An individual selling shares? Yes. Selling their own car? No — cars are exempt assets, so there is nothing to tax however large the profit. Getting the *scope* right before you compute is half the marks." },
        { kind: "text", md: "A **disposal** is any sale, gift or exchange of an asset — not just a cash sale. When you **gift** an asset, or sell to a **connected person** (a relative, your own company), you ignore the actual price and use **market value** instead. That stops families washing gains away by \"selling\" at a friendly £1." },
        { kind: "text", md: "The computation is a fixed ladder. Learn the order once and every question drops into it: **proceeds**, less **allowable costs**, gives the **gain**; pool the year's gains and losses; deduct the **annual exempt amount** of **£3,000**; then apply the **rate**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The CGT computation, step by step",
          caption: "Allowable costs = original cost + enhancement expenditure + incidental costs of buying and selling.",
          data: {
            steps: [
              { label: "Disposal proceeds", sub: "or market value if a gift / connected party" },
              { label: "Less allowable costs", sub: "cost + enhancement + legal & agent fees" },
              { label: "= Chargeable gain", sub: "per asset, then total for the year" },
              { label: "Less annual exempt amount", sub: "£3,000 for 2024/25" },
              { label: "= Taxable gain", sub: "what the rate is applied to" },
              { label: "Apply CGT rate", sub: "18% / 24%, or 10% under BADR" },
            ],
          },
        } },
        { kind: "formula", name: "Chargeable gain", expr: "Proceeds (or MV) − (cost + enhancement + incidental costs) = gain", note: "Enhancement expenditure must still be reflected in the asset at disposal — a wall you later demolished does not count." },
        { kind: "callout", tone: "rule", title: "The annual exempt amount", md: "Every individual has an annual exempt amount of **£3,000** for 2024/25 (slashed from £6,000 the year before). It cannot be carried forward — **use it or lose it**. Deduct it from the gains taxed at the **highest** rate first, to save the most tax." },
        { kind: "text", md: "**Rates from 30 October 2024** (the FA2024/25 basis): a gain falling in your **remaining basic-rate band** is taxed at **18%**, and anything above at **24%** — and this now applies to **all** assets. Before 30 October 2024, non-residential assets used **10%/20%** while residential property already used **18%/24%**. You are given the disposal date, so watch which rate set applies. Gains simply stack on top of taxable income to find how much basic-rate band is left." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "From proceeds to taxable gain — a single asset",
          caption: "A higher-rate taxpayer sells non-residential shares for £50,000 (cost £20,000). Taxable gain £27,000 × 24% = £6,480 tax.",
          data: {
            unit: "£",
            items: [
              { label: "Proceeds", value: 50000, kind: "start" },
              { label: "Less: cost", value: -20000, kind: "delta" },
              { label: "Less: annual exempt amount", value: -3000, kind: "delta" },
              { label: "Taxable gain", value: 27000, kind: "total" },
            ],
          },
        } },
      ],
      check: {
        q: "In December 2024 a higher-rate taxpayer sells a painting (non-residential) for a £27,000 gain, having made no other disposals. How much CGT is due?",
        options: [
          "£27,000 × 24% = £6,480",
          "(£27,000 − £3,000) × 24% = £5,760",
          "(£27,000 − £3,000) × 20% = £4,800",
          "(£27,000 − £6,000) × 24% = £5,040",
        ],
        correct: 1,
        explain: "Deduct the £3,000 annual exempt amount first: £27,000 − £3,000 = £24,000 taxable. The disposal is after 30 October 2024, so the higher rate is 24% (not the old 20%), giving £5,760. Option 1 forgets the AEA; option 3 uses the pre-Budget 20% rate; option 4 uses the old £6,000 AEA.",
      },
    },
    {
      id: "chattels-part",
      heading: "Chattels, wasting assets and part disposals",
      blocks: [
        { kind: "text", md: "A **chattel** is tangible, movable property — a painting, an antique table, a racehorse. Two special rules keep small-value chattels out of the tax net and cap the gain on modest ones." },
        { kind: "callout", tone: "key", title: "The £6,000 chattel rules", md: "**Both proceeds and cost ≤ £6,000** → the gain is **exempt**. **Proceeds > £6,000 but cost ≤ £6,000** → the gain is **capped at 5/3 × (proceeds − £6,000)**, and you take the *lower* of that cap and the normal gain. **Proceeds < £6,000 but cost > £6,000** → deem proceeds to be **£6,000**, which restricts an allowable loss." },
        { kind: "text", md: "A **wasting chattel** — one with an expected life of **50 years or less**, such as a boat or most machinery — is **exempt** altogether (unless it qualified for capital allowances, e.g. plant let out in a business). So a private yacht sold at a profit escapes CGT even above £6,000." },
        { kind: "example", title: "Worked example — the 5/3 chattel cap", scenario: "Priya bought an antique writing desk for £2,000 and sells it years later for £9,000. What is her chargeable gain?", steps: [
          { label: "Normal gain", detail: "£9,000 − £2,000 = £7,000." },
          { label: "Is it a chattel over £6,000?", detail: "Proceeds £9,000 exceed £6,000 and cost was below £6,000 — so the 5/3 cap applies." },
          { label: "Apply the cap", detail: "5/3 × (£9,000 − £6,000) = 5/3 × £3,000 = £5,000." },
          { label: "Take the lower", detail: "Lower of the normal £7,000 and the £5,000 cap = £5,000." },
        ], result: "The chargeable gain is £5,000 — the marginal cap saves £2,000 of gain versus the naive figure." },
        { kind: "text", md: "**Part disposals** arise when you sell only *part* of an asset — half a plot of land, say. You cannot deduct the whole cost against a part sale, so you apportion it with the **A/(A+B)** fraction: **A** is the proceeds of the part sold, **B** is the market value of the part retained." },
        { kind: "formula", name: "Part-disposal cost", expr: "Allowable cost = total cost × A / (A + B)", note: "A = proceeds of part sold; B = market value of part kept. The leftover cost stays with the retained part for its future disposal." },
        { kind: "example", title: "Worked example — part disposal of land", scenario: "Omar bought 10 acres for £30,000. He sells 4 acres for £40,000; the remaining 6 acres are then worth £60,000. What is the gain?", steps: [
          { label: "Set A and B", detail: "A = proceeds sold £40,000; B = value retained £60,000." },
          { label: "Apportion the cost", detail: "£30,000 × 40,000 / (40,000 + 60,000) = £30,000 × 0.4 = £12,000." },
          { label: "Compute the gain", detail: "£40,000 − £12,000 = £28,000." },
        ], result: "Gain on the part sold is £28,000; the unused £18,000 of cost carries forward against the six acres retained." },
      ],
      check: {
        q: "A collector sells a chattel for £7,500 that cost £3,000. What is the chargeable gain?",
        options: [
          "£4,500 — proceeds less cost",
          "£2,500 — capped at 5/3 × (£7,500 − £6,000)",
          "£1,500 — proceeds less £6,000",
          "£0 — chattels are always exempt",
        ],
        correct: 1,
        explain: "Cost is below £6,000 and proceeds exceed £6,000, so cap the gain at 5/3 × (£7,500 − £6,000) = 5/3 × £1,500 = £2,500, and take the lower of that and the normal £4,500. The answer is £2,500. Option 1 ignores the cap; the £6,000 exemption only applies when BOTH figures are under £6,000, so option 4 is wrong.",
      },
    },
    {
      id: "shares",
      heading: "Shares and the matching rules",
      blocks: [
        { kind: "text", md: "Shares are a headache because they are **fungible** — one share of Zeta plc is identical to the next, so when you sell 6,000 you cannot say *which* 6,000 left. Tax law solves this with a strict **matching order**: match the disposal against acquisitions in this sequence." },
        { kind: "callout", tone: "rule", title: "The matching order", md: "**1. Same day** — shares bought on the day of sale. **2. Next 30 days** — shares bought in the **following 30 days** (earliest first). This stops \"bed and breakfasting\": selling then instantly rebuying to trigger a loss. **3. The s104 pool** — everything else, held at a single pooled average cost." },
        { kind: "text", md: "The **s104 pool** runs a rolling record of total shares and total cost. Each acquisition adds to both; each disposal removes shares and a *proportionate* slice of cost at the pool's average. Build the pool as a running table and disposals become arithmetic." },
        { kind: "table", caption: "The s104 pool — a running record. Pool average cost = £24,000 / 12,000 = £2.00 per share; the 18 Sep disposal takes 4,000 shares × £2.00.", head: ["Date", "Event", "Shares", "Cost (£)"], rows: [
          ["10 Jun 2016", "Purchase", "8,000", "14,000"],
          ["22 Nov 2020", "Purchase", "4,000", "10,000"],
          ["", "Pool balance", "12,000", "24,000"],
          ["18 Sep 2024", "Disposal from pool", "(4,000)", "(8,000)"],
          ["", "Pool carried forward", "8,000", "16,000"],
        ] },
        { kind: "example", title: "Worked example — a share pool disposal with a 30-day match", scenario: "Amara holds a s104 pool of 12,000 shares in Zeta plc costing £24,000. On 18 September 2024 she sells 6,000 shares for £30,000. On 30 September 2024 (within the next 30 days) she buys 2,000 shares for £11,000. What is her total gain?", steps: [
          { label: "Match the next-30-days purchase first", detail: "2,000 of the 6,000 sold match the 30 Sep purchase (cost £11,000). Their share of proceeds = 2,000/6,000 × £30,000 = £10,000. Result: £10,000 − £11,000 = a £1,000 loss." },
          { label: "Match the rest to the pool", detail: "Remaining 4,000 shares come from the pool at £2.00 each = £8,000 cost. Proceeds = 4,000/6,000 × £30,000 = £20,000. Gain = £20,000 − £8,000 = £12,000." },
          { label: "Net the two matches", detail: "£12,000 gain − £1,000 loss = £11,000." },
        ], result: "Total chargeable gain £11,000. The 30-day rule forced the £11,000 re-purchase to soak up part of the sale, denying the loss she might have banked by treating it as a pool disposal." },
        { kind: "callout", tone: "tip", md: "**Bonus issues** add shares to the pool for **no cost** (adjust share count only). **Rights issues** add shares **and** cost at the offer price. Both just update the running pool before you match." },
      ],
      check: {
        q: "You sell shares on 12 June and had bought identical shares on 12 June, 20 June and three years ago. In what order are the sold shares matched?",
        options: [
          "s104 pool, then 20 June, then 12 June",
          "12 June (same day), then 20 June (next 30 days), then the s104 pool",
          "20 June, then 12 June, then the pool",
          "Whichever acquisition gives the lowest gain",
        ],
        correct: 1,
        explain: "The fixed order is same-day first (the 12 June purchase), then acquisitions in the next 30 days (20 June), then the s104 pool (the three-year-old holding). You never choose the order to minimise the gain — the sequence is imposed by law.",
      },
    },
    {
      id: "ppr",
      heading: "Principal private residence relief",
      blocks: [
        { kind: "text", md: "The gain on selling **your only or main home** is exempt under **principal private residence (PPR) relief**. If you lived there for the whole period of ownership, the entire gain vanishes. The marks come from *partial* relief, where you were absent for stretches — you exempt the gain in the ratio of **qualifying months to total months of ownership**." },
        { kind: "callout", tone: "key", title: "Deemed occupation", md: "Some absences still count as occupation: the **last 9 months** of ownership always qualify (once it has ever been your home); **up to 3 years** for any reason; **up to 4 years** away for UK employment; and **any period** working abroad. The three flexible categories generally require you to have **occupied before and to reoccupy after** the absence." },
        { kind: "example", title: "Worked example — partial PPR relief", scenario: "Beatrice owned a house for 144 months and made a £180,000 gain. She actually lived in it for 60 months, then worked abroad for 36 months, returned and lived there for 30 months, then let it out for the final 18 months without ever moving back in.", steps: [
          { label: "Actual occupation", detail: "60 + 30 = 90 months clearly qualify." },
          { label: "Working abroad", detail: "The 36 months abroad are deemed occupation — she occupied before and reoccupied after, so all 36 qualify." },
          { label: "Final period", detail: "Of the last 18 let months, the final 9 months always qualify. The other 9 months do not — she never returned." },
          { label: "Qualifying months", detail: "90 + 36 + 9 = 135 of 144 months." },
          { label: "PPR relief", detail: "135/144 × £180,000 = £168,750 exempt." },
          { label: "Chargeable gain", detail: "£180,000 − £168,750 = £11,250 (the 9/144 non-qualifying slice)." },
        ], result: "£11,250 is chargeable. Note: no letting relief is available here — since 6 April 2020 it only applies where the owner shared occupation with the tenant, which Beatrice did not." },
        { kind: "callout", tone: "warn", title: "Letting relief is now narrow", md: "**Letting relief** used to shelter a moved-out-and-let period, but from **6 April 2020** it applies **only** where you let part of the home while **still living in it** (shared occupation). Where it does apply, it is the **lowest** of: £40,000, the PPR relief given, and the gain on the let part. Assuming it on a vacant let is a classic exam trap." },
      ],
    },
    {
      id: "badr",
      heading: "Business asset disposal relief",
      blocks: [
        { kind: "text", md: "**Business asset disposal relief (BADR)** rewards people who sell a business they have built. Qualifying gains are taxed at a flat **10%** — regardless of your income or which band the gain falls in — subject to a **£1,000,000 lifetime limit** of gains. It covers the disposal of the whole or part of a trading business, and of shares in your **personal trading company** (at least a **5%** stake, held with employment, for **2 years**)." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "BADR versus the normal CGT rates",
          data: {
            leftTitle: "Business asset disposal relief",
            rightTitle: "Normal CGT rates",
            rows: [
              { aspect: "Rate", left: "10% flat", right: "18% then 24% (10%/20% pre-30 Oct 2024, non-residential)" },
              { aspect: "Depends on income band?", left: "No — always 10%", right: "Yes — basic band left decides the split" },
              { aspect: "Lifetime cap", left: "£1,000,000 of gains", right: "None" },
              { aspect: "What qualifies", left: "Trading business / 5% personal-company shares", right: "Everything else" },
              { aspect: "How obtained", left: "Must be claimed", right: "Automatic" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Because BADR gains are only taxed at 10%, set your **£3,000 annual exempt amount** and any **capital losses** against **non-BADR** gains first — they are taxed at up to 24%, so relieving them saves more tax." },
        { kind: "example", title: "Worked example — a BADR computation", scenario: "Darius, a higher-rate taxpayer, sells his sole-trader business in January 2025 realising a qualifying gain of £850,000 (he has never claimed BADR before). In the same year he sells an investment residential property, gain £23,000, which does not qualify for any home relief. How much CGT is due?", steps: [
          { label: "Allocate the AEA wisely", detail: "Set the £3,000 AEA against the residential gain (taxed at 24%), not the BADR gain (10%)." },
          { label: "Residential gain", detail: "£23,000 − £3,000 = £20,000 × 24% = £4,800." },
          { label: "BADR gain", detail: "£850,000 is within the £1,000,000 lifetime limit, so all of it is taxed at 10%: £850,000 × 10% = £85,000." },
          { label: "Total CGT", detail: "£85,000 + £4,800 = £89,800." },
        ], result: "Total CGT £89,800. Had he wasted the AEA against the BADR gain it would have saved only £300 (£3,000 × 10%) instead of £720 (£3,000 × 24%) — allocation matters." },
      ],
      check: {
        q: "An individual makes a qualifying BADR gain of £1,300,000, having used no lifetime allowance before. How is it taxed?",
        options: [
          "All £1,300,000 at 10%",
          "£1,000,000 at 10% and £300,000 at the normal 18%/24% rates",
          "All £1,300,000 at 18%/24%",
          "£1,000,000 at 10% and £300,000 exempt",
        ],
        correct: 1,
        explain: "BADR is capped at a £1,000,000 lifetime limit. The first £1,000,000 is taxed at 10%; the excess £300,000 falls out of BADR and is taxed at the normal rates (18%/24% after 30 October 2024). It is neither all at 10% nor exempt above the cap.",
      },
    },
    {
      id: "gift-rollover",
      heading: "Deferring the gain — gift and rollover relief",
      blocks: [
        { kind: "text", md: "Two reliefs let a gain be **postponed** rather than taxed now, by pushing it into a later disposal. Neither cancels the tax — they defer it, which for a cash-poor business owner can be everything." },
        { kind: "text", md: "**Gift holdover relief** applies when you **give away** (or sell cheaply to a connected person) a **business asset** or shares in an unlisted trading company. The gain that would arise is **held over**: the donor pays nothing now, and the donee simply takes the asset with a **reduced base cost** (market value minus the held-over gain). The gain surfaces when the donee eventually sells." },
        { kind: "text", md: "**Rollover relief** applies when a business **sells one qualifying asset and reinvests** the proceeds in a **replacement** qualifying asset (land and buildings, fixed plant and machinery) within a window of **one year before to three years after** the sale. The gain is **rolled** into the cost of the new asset — deducted from its base cost — so no tax is due until the replacement is itself sold. Reinvest only part of the proceeds and the shortfall is taxed now." },
        { kind: "callout", tone: "rule", title: "Defer, don't delete", md: "**Gift relief** reduces the **donee's** cost. **Rollover relief** reduces the **replacement asset's** cost. Both simply move the gain down the line to a future disposal — the tax is deferred, never wiped out." },
      ],
    },
  ],
  examTraps: [
    { trap: "Forgetting to deduct the £3,000 annual exempt amount, or using the old £6,000.", fix: "For 2024/25 the AEA is £3,000. Deduct it every time, against the highest-rate gains first." },
    { trap: "Using 10%/20% for a disposal after 30 October 2024.", fix: "From 30 October 2024 all assets use 18%/24%. Only disposals before that date use 10%/20% for non-residential assets." },
    { trap: "Claiming letting relief on a home that was moved out of and let.", fix: "Since 6 April 2020 letting relief needs shared occupation — living there while letting part. A vacant let gets only the final 9 months of PPR." },
    { trap: "Matching a share disposal straight to the s104 pool.", fix: "Match same-day first, then acquisitions in the next 30 days, and only then the pool. The 30-day rule catches bed-and-breakfast trades." },
    { trap: "Taxing a whole BADR gain at 10% above the lifetime limit.", fix: "Only the first £1,000,000 of qualifying gains gets 10%; the excess is taxed at the normal 18%/24%." },
  ],
  keyTerms: [
    { term: "Annual exempt amount", def: "The £3,000 of gains an individual can realise tax-free each year (2024/25); it cannot be carried forward." },
    { term: "Chattel", def: "Tangible movable property. Exempt if proceeds and cost are both £6,000 or less; the gain is capped at 5/3 × (proceeds − £6,000) where proceeds exceed £6,000." },
    { term: "s104 pool", def: "A running pool of shares of the same class in the same company, holding total shares and total cost at an average, used after same-day and 30-day matching." },
    { term: "PPR relief", def: "Principal private residence relief — exempts the gain on your main home in the ratio of qualifying (including deemed) months to total months of ownership." },
    { term: "Business asset disposal relief", def: "A 10% CGT rate on qualifying business disposals, subject to a £1,000,000 lifetime limit of gains; must be claimed." },
  ],
  summary: [
    "CGT ladder: proceeds (or market value) − allowable costs = gain; total gains − £3,000 AEA = taxable gain; then apply the rate.",
    "Rates are 18%/24% from 30 October 2024 (all assets); non-residential disposals before then used 10%/20%; BADR is a flat 10%.",
    "Chattels: exempt if proceeds and cost ≤ £6,000; gain capped at 5/3 × (proceeds − £6,000) above; part disposals apportion cost by A/(A+B).",
    "Match share disposals same-day, then next 30 days, then the s104 pool at average cost.",
    "PPR exempts the main-home gain by qualifying months (final 9 always count); letting relief needs shared occupation; BADR gives 10% up to £1m; gift and rollover relief defer gains into a later disposal.",
  ],
}
