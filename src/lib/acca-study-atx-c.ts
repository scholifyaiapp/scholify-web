import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX · Area C — Corporation tax (advanced).
 * UK FA2024/25 basis. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 * Every figure is restated in the text so the reader tests METHOD, not memory.
 */

export const ATX_C: StudyChapter = {
  paper: "ATX",
  area: "C",
  title: "Corporation tax (advanced)",
  minutes: 18,
  intro: "At TX a company stood alone. At ATX it belongs to a family — of subsidiaries, overseas branches and connected participators — and the tax follows the relationships as much as the numbers.",
  outcomes: [
    "Move losses around a group with current-period and carried-forward group relief, and price a consortium claim",
    "Apply the chargeable gains group rules — s171 no gain/no loss, the s171A election and the degrouping charge",
    "Count associated companies and re-solve marginal-relief corporation tax on the £50,000/£250,000 limits",
    "Choose between an overseas branch and a subsidiary, and spot a CFC, transfer-pricing or double-tax-relief issue",
    "Compute the s455 charge on a loan to a participator, and place R&D, full expensing and the interest restriction",
  ],
  sections: [
    {
      id: "group-relief",
      heading: "Group relief — sharing losses across a loss group",
      blocks: [
        { kind: "text", md: "A **loss group** exists where one company is a **75% subsidiary** of another, or both are 75% subsidiaries of a third. The 75% test is not just shares: the parent must own **75% of the ordinary share capital** *and* be entitled to **75% of distributable profits** *and* **75% of net assets on a winding up**. An **effective interest** test then multiplies the holdings down a chain — so a 90% of 80% subsidiary is only 72% effective and falls **outside** the loss group even though each direct link clears 75%." },
        { kind: "text", md: "Inside a loss group, a loss-making company (the **surrendering company**) can hand its losses to a profitable one (the **claimant company**) to shelter that company's profits. Two flavours exist: **current-period** group relief (this year's losses) and **carried-forward** group relief (losses that arose from **1 April 2017** onward and were carried forward)." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How a loss travels through group relief",
          caption: "Match the periods, cap the claim, then surrender.",
          data: {
            steps: [
              { label: "Identify the loss group", sub: "75% shares, profits AND net assets; effective interest ≥75% down the chain" },
              { label: "Corresponding periods", sub: "overlap of surrendering and claimant APs only" },
              { label: "Available loss", sub: "trading loss, excess property loss, excess QCD" },
              { label: "Available profit", sub: "claimant's TTP after its own reliefs" },
              { label: "Surrender the lower", sub: "cannot create or increase a loss in the claimant" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The current-period cap", md: "The amount surrendered is the **lower** of (a) the surrendering company's **available loss** and (b) the claimant's **available profit** for the overlapping period. Group relief can reduce the claimant's taxable profit to **nil** but never below — it cannot create a loss." },
        { kind: "example", title: "Worked example — current-period group relief", scenario: "P Ltd owns 100% of S Ltd; both prepare accounts to 31 March 2025. For the year S Ltd has a trading loss of £200,000 and P Ltd has taxable total profits (TTP) of £150,000. How much can S surrender to P, and what is each company's position?", steps: [
          { label: "Confirm the group", detail: "100% holding clears the 75% shares/profits/net-assets test and the >50% effective interest test — a loss group exists." },
          { label: "Available loss", detail: "S Ltd's current-period trading loss = £200,000, all available for surrender." },
          { label: "Available profit", detail: "P Ltd's TTP = £150,000 — the ceiling on what can be absorbed." },
          { label: "Surrender the lower", detail: "Lower of £200,000 and £150,000 = **£150,000** surrendered to P Ltd." },
          { label: "Resulting positions", detail: "P Ltd's TTP falls to **£nil**. S Ltd retains the unused **£50,000** loss to carry back 12 months or carry forward." },
        ], result: "S surrenders £150,000; P's TTP becomes £nil; £50,000 of loss stays with S. Group relief is optimal when it shelters profits that would otherwise be taxed at the **highest marginal rate** — here P's 25%/marginal band." },
        { kind: "callout", tone: "tip", title: "Carried-forward group relief", md: "Post-1 April 2017 carried-forward losses can also be **surrendered** to group companies — but only after the surrendering company has used them against its **own** profits first, and subject to the group's **£5m deductions allowance** (only 50% of profits above £5m can be relieved by brought-forward losses)." },
      ],
      check: {
        q: "Q Ltd owns 90% of R Ltd, which owns 80% of T Ltd. Is T Ltd in a loss group with Q Ltd?",
        options: [
          "Yes — every link is at least 75%",
          "No — Q's effective interest in T is 72%, below 75%",
          "Yes — but only for carried-forward losses",
          "No — group relief needs 100% ownership",
        ],
        correct: 1,
        explain: "Each direct link (90%, 80%) clears 75%, but the loss-group test also needs the effective interest to be at least 75%: 90% x 80% = 72%. That is below 75%, so T Ltd is outside Q Ltd's loss group. (A 51% direct test with >50% effective applies to gains groups, not loss groups.)",
      },
    },
    {
      id: "gains-groups",
      heading: "Chargeable gains groups — s171, s171A and degrouping",
      blocks: [
        { kind: "text", md: "A **chargeable gains group** is drawn differently from a loss group. The principal company plus companies it owns **75% directly** at each tier form the group, **provided** the principal company's **effective interest exceeds 50%** at each level. So a chain of 75% x 75% (= 56.25% effective) keeps the sub-subsidiary **in** the gains group, even though the same chain would be **out** of a loss group." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two different 75% tests",
          data: {
            leftTitle: "Loss group",
            rightTitle: "Chargeable gains group",
            rows: [
              { aspect: "Direct link", left: "75% at each tier", right: "75% at each tier" },
              { aspect: "Effective test", left: "at least 75% down the chain", right: "more than 50% down the chain" },
              { aspect: "What flows", left: "trading & other losses", right: "chargeable assets (NGNL) and gains/losses" },
              { aspect: "Mechanism", left: "surrender claim", right: "s171 automatic; s171A by election" },
            ],
          },
        } },
        { kind: "text", md: "Assets moved **between** gains-group companies pass automatically on a **no gain, no loss (NGNL)** basis under **s171 TCGA 1992** — the transfer happens at the seller's indexed cost (indexation frozen at December 2017), so **no gain crystallises** on the move. The acquiring company simply inherits the base cost." },
        { kind: "callout", tone: "key", title: "The s171A election", md: "When one group company makes a **gain** and another holds a **capital loss** (or vice versa), the group can jointly **elect under s171A** to treat the gain or loss as accruing in the other company — matching them **without physically moving the asset**. The election must be made within **two years** of the end of the accounting period in which the disposal occurs." },
        { kind: "example", title: "Worked example — matching a gain with a loss", scenario: "A Ltd realises a chargeable gain of £180,000 on a sale to a third party. Its fellow gains-group member B Ltd has capital losses brought forward of £110,000 and no gains of its own. How is the group's position optimised?", steps: [
          { label: "Spot the mismatch", detail: "A Ltd has a taxable £180,000 gain; B Ltd's £110,000 losses would otherwise sit idle." },
          { label: "s171A election", detail: "Elect to treat £110,000 of A Ltd's gain as accruing to B Ltd, where the brought-forward losses absorb it." },
          { label: "Net taxable gain", detail: "£180,000 − £110,000 = **£70,000** left taxable in A Ltd." },
          { label: "Tax saved", detail: "£110,000 sheltered at the marginal 25% rate saves roughly **£27,500** of corporation tax across the group." },
        ], result: "Chargeable gains are group assets in substance: the s171A election lets losses in one company wipe out gains in another with no need to transfer the asset first." },
        { kind: "callout", tone: "warn", title: "The degrouping charge (s179)", md: "If a company **leaves** the gains group within **six years** of receiving an asset by a s171 NGNL transfer, a **degrouping charge** arises: it is deemed to have sold and reacquired that asset at its **market value on the date of the original intra-group transfer**. Where the company leaves because its **shares were sold**, the degrouping gain is **added to the sale proceeds of the shares** — and so is usually covered by the **Substantial Shareholding Exemption (SSE)**, making it exempt." },
        { kind: "text", md: "**Consortium relief** is the cousin of group relief for companies that are jointly owned. A **consortium** exists where **20 or fewer companies** each own **at least 5%**, and together **at least 75%**, of a company — with **no single member** holding 75% (or it would be a group). Losses pass between the consortium company and each member **in proportion to that member's shareholding** — so a 30% member can relieve at most **30%** of the consortium company's loss." },
        { kind: "table", caption: "Group relief vs consortium relief at a glance", head: ["Feature", "Group relief", "Consortium relief"], rows: [
          ["Ownership needed", "75% subsidiary", "5%–under 75% by each member; 75%+ combined"],
          ["Amount relievable", "Full available loss/profit", "Restricted to the member's % holding"],
          ["Direction", "Any group company to any other", "Between consortium company and members"],
          ["Losses covered", "Current & carried-forward", "Current & carried-forward (post-2017)"],
        ] },
      ],
      check: {
        q: "C Ltd is owned by a consortium: X plc 40%, Y plc 35%, Z plc 25%. C Ltd makes a trading loss of £300,000. What is the MOST X plc can claim by consortium relief (assume X has ample profits)?",
        options: [
          "£300,000 — the whole loss",
          "£120,000 — 40% of the loss",
          "£75,000 — the 25% minimum",
          "£nil — consortium relief only flows one way",
        ],
        correct: 1,
        explain: "Consortium relief is capped at the member's ownership percentage of the consortium company's loss. X plc owns 40%, so it can claim at most 40% x £300,000 = £120,000. The remaining loss can be claimed by Y and Z up to their own percentages, or kept by C Ltd.",
      },
    },
    {
      id: "associated-marginal",
      heading: "Associated companies and the marginal band",
      blocks: [
        { kind: "text", md: "From 1 April 2023 the corporation tax rate depends on the level of **augmented profits**. The **small profits rate is 19%** up to a lower limit of **£50,000**; the **main rate is 25%** above an upper limit of **£250,000**; and **between** the two, tax is charged at 25% then reduced by **marginal relief**. **Augmented profits** = **taxable total profits (TTP) + exempt dividends** received from non-group companies (franked investment income)." },
        { kind: "callout", tone: "rule", title: "Divide by associated companies", md: "The **£50,000** and **£250,000** limits are divided by the number of **associated companies** (the company itself **plus** each other company under common control, at any point in the period — worldwide, but ignoring dormant companies). Two associates halve the limits to **£25,000 / £125,000**; three quarter them, and so on. The limits are also **time-apportioned** for accounting periods shorter than 12 months." },
        { kind: "formula", name: "Marginal relief", expr: "MR = 3/200 x (Upper limit − Augmented profits) x (TTP ÷ Augmented profits)", note: "Where there are no exempt dividends, TTP = augmented profits and the fraction is 1. The 3/200 standard fraction applies for FA2024/25." },
        { kind: "example", title: "Worked example — marginal-relief corporation tax", scenario: "Delta Ltd has taxable total profits of £120,000 and no exempt dividends for the year ended 31 March 2025. Compute the corporation tax (a) as a standalone company and (b) if Delta has ONE associated company.", steps: [
          { label: "(a) Which band?", detail: "No associates → limits £50,000/£250,000. £120,000 is between them → marginal relief applies." },
          { label: "(a) Tax at main rate", detail: "£120,000 x 25% = £30,000." },
          { label: "(a) Marginal relief", detail: "3/200 x (£250,000 − £120,000) = 3/200 x £130,000 = £1,950 (TTP = augmented profits, so the ratio is 1)." },
          { label: "(a) CT payable", detail: "£30,000 − £1,950 = **£28,050** (an effective rate of 23.375%)." },
          { label: "(b) Halve the limits", detail: "One associate → limits £25,000/£125,000. £120,000 is still between them, but much closer to the top." },
          { label: "(b) CT payable", detail: "£30,000 − [3/200 x (£125,000 − £120,000)] = £30,000 − £75 = **£29,925** (effective 24.94%)." },
        ], result: "The single associate barely widens the tax bill by £1,875 — but it drags the effective rate from 23.4% toward the full 25%. One more associate here would push profits above the upper limit and remove marginal relief entirely." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Building Delta Ltd's tax (standalone)",
          caption: "Charge at 25%, then strip out marginal relief.",
          data: {
            unit: "£",
            items: [
              { label: "Main rate 25% on £120,000", value: 30000, kind: "start" },
              { label: "Marginal relief 3/200", value: -1950, kind: "delta" },
              { label: "CT payable", value: 28050, kind: "total" },
            ],
          },
        } },
      ],
      check: {
        q: "Epsilon Ltd has augmented profits of £90,000 and three associated companies. Which rate basis applies?",
        options: [
          "Small profits rate 19% throughout",
          "Main rate 25% with marginal relief",
          "Main rate 25% with no marginal relief",
          "Marginal relief on the first £50,000 only",
        ],
        correct: 2,
        explain: "Four associated companies in total (Epsilon plus three) divide the limits by 4: upper limit = £250,000 ÷ 4 = £62,500. Augmented profits of £90,000 exceed £62,500, so the company is above the upper limit — full main rate 25%, no marginal relief.",
      },
    },
    {
      id: "overseas",
      heading: "Going overseas — branch, subsidiary, CFC and transfer pricing",
      blocks: [
        { kind: "text", md: "A UK company expanding abroad faces a structural choice. A **permanent establishment (PE, or branch)** is part of the UK company: its profits are **taxed in the UK** (with double tax relief for overseas tax), and crucially its **early-year losses are relievable in the UK immediately**. A **subsidiary** is a **separate legal person** in the overseas country: its profits are **not** taxed in the UK (and dividends it pays up are usually **exempt**), but its losses are **stranded** overseas — no UK relief." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Overseas branch vs overseas subsidiary",
          data: {
            leftTitle: "Branch (PE)",
            rightTitle: "Subsidiary",
            rows: [
              { aspect: "Legal status", left: "Part of the UK company", right: "Separate legal entity" },
              { aspect: "Profits", left: "Taxed in UK, with DTR", right: "Outside UK CT; dividends usually exempt" },
              { aspect: "Early losses", left: "Relieved in UK at once", right: "Stranded overseas" },
              { aspect: "Best when", left: "Losses expected early on", right: "Established, profitable operations" },
              { aspect: "Election", left: "Branch exemption election available", right: "n/a" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Double tax relief (DTR)", md: "Where the same profit is taxed twice, **DTR by credit** gives relief equal to the **lower of** the **overseas tax** suffered and the **UK corporation tax** on that same slice of income. DTR is given **source by source**, and any excess overseas tax is generally **wasted** (not repaid)." },
        { kind: "text", md: "Two anti-avoidance regimes then police overseas structures. **Controlled Foreign Companies (CFCs)** are overseas companies **controlled from the UK** whose profits look **artificially diverted** out of the UK. If no exemption applies, a **CFC charge** is levied on UK corporate shareholders holding **at least 25%**, taxing their share of the CFC's chargeable profits at **UK rates (up to 25%)**. Common exemptions include the **exempt period** (first 12 months), **low profits** (under £500,000), **low profit margin** (under 10%), **excluded territories**, and the **tax exemption** (local tax at least 75% of the equivalent UK tax)." },
        { kind: "text", md: "**Transfer pricing** requires transactions between **connected parties** (broadly, 50%+ control) to be priced at **arm's length**. Where a UK company has been **undercharged** or **overcharged** so that UK taxable profit is understated, the profit is **adjusted upward** to the arm's-length figure. **Small and medium-sized enterprises are generally exempt** from UK transfer pricing (with limited exceptions), so the rules bite mainly on **large** groups." },
        { kind: "callout", tone: "tip", md: "Exam signposting: **\"branch made a loss\"** points toward a **PE** for immediate UK relief; **\"low-tax jurisdiction, minimal local activity\"** points toward a **CFC** review; **\"sold to its parent at cost\"** points toward a **transfer-pricing** adjustment." },
      ],
    },
    {
      id: "close-s455",
      heading: "Close companies and the s455 charge",
      blocks: [
        { kind: "text", md: "A **close company** is a UK company **controlled by five or fewer participators**, or by any number of participators who are also **directors**. Because such companies are often effectively the owner's pocket, a special charge stops a shareholder extracting profit **tax-free** by taking a **loan** instead of a taxed dividend or salary." },
        { kind: "callout", tone: "rule", title: "The s455 charge", md: "When a close company makes a **loan to a participator** (or their associate), it must pay **s455 tax at 33.75%** of the loan — the same rate as the higher dividend rate. The tax is due **nine months and one day** after the end of the accounting period. It is **not a permanent cost**: when the loan is **repaid or written off**, HMRC **refunds** the s455 tax, nine months and one day after the end of the accounting period in which repayment occurs." },
        { kind: "example", title: "Worked example — s455 on a director's loan", scenario: "Nova Ltd, a close company, lends £40,000 interest-free to its 60% shareholder-director on 1 June 2024. Nova prepares accounts to 31 March 2025. Compute the s455 charge if (a) the loan is still fully outstanding at the due date, and (b) £16,000 is repaid on 1 December 2025, before the due date.", steps: [
          { label: "Confirm the trigger", detail: "Nova is close (controlled by directors); a loan to a participator is within s455." },
          { label: "(a) Full charge", detail: "33.75% x £40,000 = **£13,500**, payable by 1 January 2026 (9 months + 1 day after 31 March 2025)." },
          { label: "(b) Repayment before the due date", detail: "Relief is given for the £16,000 repaid before 1 January 2026 → s455 is charged only on the £24,000 still outstanding." },
          { label: "(b) Reduced charge", detail: "33.75% x £24,000 = **£8,100** payable on 1 January 2026." },
          { label: "Later refund", detail: "When the remaining £24,000 is eventually repaid, the £8,100 is refunded 9 months + 1 day after the end of that later accounting period." },
        ], result: "s455 is a refundable deposit, not a final tax: £13,500 if nothing is repaid, £8,100 if £16,000 is cleared first. Note a separate benefit-in-kind income tax charge arises on the interest-free element for the director personally." },
        { kind: "callout", tone: "warn", md: "Watch the **£15,000 / 5% bed-and-breakfasting** rules: if a loan of **£15,000 or more** is repaid and a fresh loan of the same broad amount is redrawn within **30 days**, the repayment is **matched against the new loan** and s455 relief is **denied** — HMRC blocks the trick of repaying just before the year end and re-borrowing in April." },
      ],
      check: {
        q: "A close company lends £30,000 to a participator in the year ended 31 March 2025 and none is repaid. What s455 tax is due, and when?",
        options: [
          "£10,125, due 1 January 2026",
          "£5,700 (19%), due 31 March 2025",
          "£7,500 (25%), due 1 January 2026",
          "£10,125, but only if never repaid at all",
        ],
        correct: 0,
        explain: "s455 tax is 33.75% x £30,000 = £10,125, due nine months and one day after the period end — 1 January 2026. It is payable now regardless of future repayment; if the loan is later repaid, the £10,125 is refunded 9 months + 1 day after the end of the period of repayment.",
      },
    },
    {
      id: "reliefs-allowances",
      heading: "R&D, capital allowances and the interest restriction",
      blocks: [
        { kind: "text", md: "Three reliefs recur in ATX group and single-company questions. First, **R&D relief**. For accounting periods beginning on or after **1 April 2024** the SME and large-company schemes are **merged** into a single **RDEC-style above-the-line credit of 20%** of qualifying R&D expenditure — a **taxable credit** that reduces the tax bill (or is payable if loss-making). Loss-making **R&D-intensive SMEs** (qualifying R&D at least **30%** of total expenditure) can instead claim **Enhanced R&D Intensive Support (ERIS)**: an extra **86% deduction** plus a **14.5% payable credit** on the surrendered loss." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Merged RDEC scheme vs R&D-intensive SME (ERIS)",
          data: {
            leftTitle: "Merged RDEC (20%)",
            rightTitle: "ERIS (loss-making intensive SME)",
            rows: [
              { aspect: "Who", left: "Most companies, periods from 1 Apr 2024", right: "SME with R&D at least 30% of costs, loss-making" },
              { aspect: "Mechanism", left: "20% above-the-line taxable credit", right: "86% extra deduction + 14.5% payable credit" },
              { aspect: "Loss company", left: "Credit is payable (net of tax)", right: "Surrender loss for cash" },
              { aspect: "Nature", left: "Taxable receipt", right: "Enhanced deduction, not taxable" },
            ],
          },
        } },
        { kind: "text", md: "Second, **advanced capital allowances**. Companies can claim **full expensing** — a **100% first-year allowance** on **new and unused main-pool plant and machinery**, with **no cap** (permanent from April 2023) — and a **50% FYA** on new **special-rate** additions. The **Annual Investment Allowance** gives **100%** on the first **£1,000,000** of most additions (including second-hand and special-rate). The **special rate pool** (integral features, long-life assets, thermal insulation, cars over 50g/km) attracts a **6% WDA**; the **main pool** attracts **18%**. The **Structures and Buildings Allowance (SBA)** gives a flat **3% straight-line** deduction on the **construction cost** of commercial buildings." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Where an addition lands",
          data: {
            items: [
              { title: "Full expensing", sub: "New main-pool P&M — 100% FYA, no cap (companies only)" },
              { title: "50% FYA", sub: "New special-rate additions — balance to the 6% pool" },
              { title: "AIA", sub: "First £1,000,000, incl. second-hand & special-rate" },
              { title: "Special rate pool", sub: "Integral features, long-life, cars >50g/km — 6% WDA" },
              { title: "SBA", sub: "3% straight-line on commercial building construction" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Full-expensing clawback", md: "On disposal of an asset that received **full expensing**, an **immediate balancing charge equal to the full disposal proceeds** arises (there is no pool to absorb it). For an asset that had **50% FYA**, half the proceeds are a balancing charge and half are deducted from the special rate pool." },
        { kind: "text", md: "Third, **loan relationships and the Corporate Interest Restriction (CIR)**. Interest on borrowing for **trade purposes** is a **trading** loan-relationship debit in the trading result; interest on **non-trade** borrowing (e.g. to buy investments) is pooled as a **non-trading loan relationship (NTLR)**, with any **net deficit** relieved flexibly. The **CIR** then caps a group's net tax-interest deduction at **30% of tax-EBITDA** (the fixed-ratio method), subject to a **de minimis of £2 million** of net interest per group per year. Interest disallowed under the CIR is **carried forward** and may be reactivated in a later year with spare capacity." },
        { kind: "callout", tone: "key", title: "CIR in one line", md: "If a group's **net tax-interest expense exceeds £2 million**, the deduction is limited to **30% of tax-EBITDA**; the excess is disallowed but **carried forward** indefinitely." },
      ],
    },
  ],
  examTraps: [
    { trap: "Using the 75% direct link alone to put a sub-subsidiary in a loss group.", fix: "The loss group also needs at least a 75% EFFECTIVE interest down the chain (75% x 80% = 72% fails). Gains groups use a >50% effective test instead." },
    { trap: "Forgetting to divide the £50,000/£250,000 limits by associated companies.", fix: "Count the company itself PLUS every company under common control (worldwide, excluding dormant). Two associates halve the limits to £25,000/£125,000." },
    { trap: "Charging s455 at 25% or 32.5%.", fix: "The FA2024/25 s455 rate is 33.75% — the higher dividend rate — due 9 months and 1 day after the period end, and refundable on repayment." },
    { trap: "Treating a degrouping charge as immediately taxable when shares are sold.", fix: "The s179 degrouping gain is added to the SHARE sale proceeds, so it is normally covered by the Substantial Shareholding Exemption and exempt." },
    { trap: "Assuming an overseas subsidiary's losses can be relieved in the UK.", fix: "A subsidiary is a separate entity — its losses are stranded overseas. Only a branch (PE) gives immediate UK loss relief." },
    { trap: "Applying the old 130% super-deduction or a separate SME R&D scheme.", fix: "For periods from 1 April 2024 the merged scheme gives a 20% RDEC-style credit; only loss-making R&D-intensive SMEs (≥30%) use ERIS." },
  ],
  keyTerms: [
    { term: "Loss group", def: "A parent and its 75% subsidiaries (75% of shares, profits and net assets, and at least 75% effective interest) that can surrender losses to one another." },
    { term: "s171 transfer", def: "The automatic no gain/no loss basis on which chargeable assets pass between chargeable-gains-group companies." },
    { term: "s171A election", def: "A joint election to treat a chargeable gain or loss as accruing in a different gains-group company, matching gains with losses without moving the asset." },
    { term: "Degrouping charge (s179)", def: "A deemed disposal at market value when a company leaves a gains group within six years of receiving an asset intra-group; usually added to share proceeds and covered by SSE." },
    { term: "Associated company", def: "A company under common control with another at any point in the period; each associate divides the £50,000/£250,000 CT limits." },
    { term: "s455 tax", def: "A 33.75% charge on a close company's loan to a participator, due 9 months and 1 day after the period end and refunded when the loan is repaid." },
    { term: "Corporate Interest Restriction", def: "A cap limiting a group's net tax-interest deduction to 30% of tax-EBITDA, with a £2 million de minimis; disallowed interest is carried forward." },
  ],
  summary: [
    "Loss groups (75% shares/profits/net assets and ≥75% effective) surrender the lower of available loss and available profit; consortium relief is capped at each member's %.",
    "Chargeable gains groups (75% direct, >50% effective) move assets at no gain/no loss under s171, match gains and losses via the s171A election, and face a s179 degrouping charge within six years.",
    "The £50,000/£250,000 limits are divided by associated companies; between them, CT = 25% less 3/200 x (upper limit − augmented profits).",
    "A branch gives immediate UK loss relief while a subsidiary strands losses; CFCs, transfer pricing and DTR police overseas structures.",
    "s455 charges 33.75% on close-company loans to participators (refundable), and R&D (20% RDEC/ERIS), full expensing and the £2m/30% interest restriction shape the final bill.",
  ],
}
