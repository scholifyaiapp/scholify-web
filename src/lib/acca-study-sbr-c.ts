import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area C — Groups & business combinations.
 * The largest, highest-marks area of SBR: control, goodwill, step acquisitions,
 * disposals, associates & joint ventures, intra-group adjustments, fair value
 * uplifts, foreign subsidiary translation and equity transactions.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Every figure re-solved.
 */

export const SBR_C: StudyChapter = {
  paper: "SBR",
  area: "C",
  title: "Groups & business combinations",
  minutes: 19,
  intro: "A group is one economic entity wearing many legal costumes. Consolidation strips the costumes off — and every hard mark in SBR lives in the seams: control, goodwill, a step up, a disposal, a foreign currency.",
  outcomes: [
    "Apply the IFRS 10 control model and place an investment on the control spectrum",
    "Calculate goodwill under both the full (fair value) and proportionate NCI methods",
    "Account for a step acquisition, remeasuring the previously-held interest to fair value",
    "Compute the gain or loss on a disposal, distinguishing loss of control from an equity transaction",
    "Equity-account associates and joint ventures and make the core intra-group adjustments (PURP, fair value depreciation)",
    "Translate a foreign subsidiary under IAS 21 and route the exchange difference correctly",
  ],
  sections: [
    {
      id: "control",
      heading: "Control — the gate to consolidation (IFRS 10)",
      blocks: [
        { kind: "text", md: "Before any numbers, one question decides everything: **does the parent control the investee?** Control is the trigger for full consolidation — line-by-line, 100% of the subsidiary's assets, liabilities, income and expenses into the group, with a **non-controlling interest (NCI)** carved out for the slice the parent does not own. Get control wrong and the entire method is wrong." },
        { kind: "callout", tone: "rule", title: "IFRS 10 — the three elements of control", md: "An investor controls an investee when, and only when, it has **all three**: (1) **power** over the investee (rights to direct the relevant activities); (2) **exposure to variable returns** from its involvement; and (3) the **ability to use that power to affect those returns**. All three, together — not just a majority of shares." },
        { kind: "text", md: "Ownership percentage is a strong signal but never the whole story. **Potential voting rights** (currently exercisable options), a **dominant vote** among widely dispersed holders (de facto control), or contractual rights can hand control to a holder of less than half the equity. Equally, holding a majority of shares but no power over the relevant activities is **not** control." },
        { kind: "text", md: "Where there is no control, the relationship still shapes the accounting. **Significant influence** (the power to participate, not direct) makes the investee an **associate**; **joint control** under a contractual sharing arrangement makes it a **joint venture**; below that, it is a plain financial **investment**." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "The control spectrum",
          caption: "The same shareholding, different relationships — each with its own accounting.",
          data: {
            centre: "Parent's influence over the investee",
            nodes: [
              { label: "Subsidiary", sub: "Control (IFRS 10) — full consolidation + NCI" },
              { label: "Associate", sub: "Significant influence (IAS 28) — equity method" },
              { label: "Joint venture", sub: "Joint control (IFRS 11) — equity method" },
              { label: "Joint operation", sub: "Joint control of assets — share of A/L/I/E" },
              { label: "Investment", sub: "No influence — IFRS 9 fair value" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Percentages are only a **rebuttable presumption**: usually **over 50%** implies control, **20%-50%** significant influence, **under 20%** none. In SBR the examiner rewards you for looking **past** the percentage to power and returns." },
      ],
      check: {
        q: "Parent P owns 45% of the votes of X. The remaining 55% is spread across thousands of small shareholders, none holding more than 1%, who have never coordinated. P appoints the board and directs X's operations. How should P account for X?",
        options: [
          "As an associate, because P holds less than 50%",
          "As a subsidiary, because P has de facto control",
          "As a financial investment under IFRS 9",
          "As a joint venture, because control is shared",
        ],
        correct: 1,
        explain: "IFRS 10 looks to substance, not the 50% line. With the remaining votes dispersed and uncoordinated, 45% is enough to direct the relevant activities — P has power, exposure to variable returns and uses that power. That is de facto control, so X is a subsidiary and is fully consolidated.",
      },
    },
    {
      id: "goodwill",
      heading: "Goodwill — full vs proportionate NCI",
      blocks: [
        { kind: "text", md: "Goodwill is the premium a parent pays over the fair value of what it can actually identify. IFRS 3 builds it as a simple bridge: everything given to gain control, **plus** the NCI, **less** the fair value of the identifiable net assets acquired. Whatever is left over is goodwill." },
        { kind: "formula", name: "Goodwill (IFRS 3)", expr: "Consideration transferred + NCI at acquisition + FV of previously-held interest − FV of identifiable net assets acquired", note: "The middle two terms only appear when relevant — NCI when there is one, the held interest only in a step acquisition." },
        { kind: "text", md: "The one policy choice is **how to measure the NCI**, and it is made afresh for each acquisition. Under the **full (fair value) method** the NCI is measured at its own fair value, so goodwill includes the NCI's share of goodwill. Under the **proportionate method** the NCI is measured at its share of the identifiable net assets, so only the **parent's** goodwill is recognised." },
        { kind: "example", title: "Worked example — full vs proportionate goodwill", scenario: "P acquires 80% of S. Consideration transferred is $1,000. At acquisition S's identifiable net assets have a fair value of $1,000 (share capital $400, retained earnings $500, plus a $100 fair value uplift on land). The fair value of the 20% NCI shareholding is $230. Calculate goodwill under both methods.", steps: [
          { label: "Full method — build the bridge", detail: "Consideration $1,000 + NCI at fair value $230 = $1,230 total 'cost'." },
          { label: "Full method — deduct net assets", detail: "$1,230 − FV of identifiable net assets $1,000 = goodwill of $230." },
          { label: "Proportionate method — measure NCI", detail: "NCI = 20% × $1,000 net assets = $200 (no NCI goodwill)." },
          { label: "Proportionate method — deduct net assets", detail: "$1,000 + $200 − $1,000 = goodwill of $200." },
          { label: "Reconcile the difference", detail: "$230 − $200 = $30 — exactly the NCI's own share of goodwill, recognised under the full method only." },
        ], result: "Full goodwill = $230 (of which $30 belongs to the NCI); proportionate goodwill = $200. Both leave the same net assets; they differ only in whether the NCI carries its slice of goodwill." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Building goodwill — full (fair value) method",
          caption: "Consideration and NCI go up; the fair value of net assets brings it back down to goodwill.",
          data: {
            unit: "$",
            items: [
              { label: "Consideration transferred", value: 1000, kind: "start" },
              { label: "NCI at fair value", value: 230, kind: "delta" },
              { label: "FV of net assets acquired", value: -1000, kind: "delta" },
              { label: "Goodwill", value: 230, kind: "total" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Impairment splits by method", md: "If goodwill is impaired, under the **full** method the loss is shared between group and NCI (both carry goodwill); under the **proportionate** method the loss falls entirely on the **group** because the NCI carries none. This is a favourite exam distinction." },
      ],
      check: {
        q: "Using the example above, what is the difference between full and proportionate goodwill, and what does it represent?",
        options: [
          "$30 — the NCI's share of the subsidiary's goodwill",
          "$30 — an impairment of goodwill",
          "$200 — the parent's goodwill",
          "$0 — the two methods always agree",
        ],
        correct: 0,
        explain: "Full goodwill $230 less proportionate goodwill $200 = $30. Under the full method the NCI is at fair value, so it carries its own share of goodwill; the proportionate method omits exactly that $30. The identifiable net assets ($1,000) are identical either way.",
      },
    },
    {
      id: "step",
      heading: "Step acquisitions — crossing the control line",
      blocks: [
        { kind: "text", md: "A **step (piecemeal) acquisition** is where the parent already holds a stake and buys more, **crossing into control**. The moment control is achieved is an accounting event in its own right: IFRS 3 treats it as though the parent **sold** its old interest and **bought** the whole subsidiary at fair value. So the previously-held interest is **remeasured to fair value at the date control is obtained**, and the gain or loss goes to **profit or loss**." },
        { kind: "callout", tone: "rule", title: "The remeasurement rule", md: "On achieving control, **remeasure the previously-held equity interest to its fair value** at that date. The difference between fair value and its previous carrying amount is a **gain or loss in profit or loss**. Goodwill is then calculated using that **fair value**, never the original cost." },
        { kind: "example", title: "Worked example — a step acquisition", scenario: "P has held 30% of S for two years, accounted for as an associate; its carrying amount under the equity method is now $360 (original cost $300 plus $60 share of post-acquisition profit). P now buys a further 40% for $600 cash, taking it to 70% and gaining control. At that date the fair value of the original 30% is $420, the fair value of the 30% NCI is $310, and S's identifiable net assets are $1,000.", steps: [
          { label: "Remeasure the held interest", detail: "Fair value $420 − equity-method carrying amount $360 = $60 gain to profit or loss." },
          { label: "Assemble the goodwill 'cost'", detail: "New consideration $600 + FV of previously-held 30% $420 + NCI at fair value $310 = $1,330." },
          { label: "Deduct identifiable net assets", detail: "$1,330 − $1,000 = goodwill of $330." },
          { label: "Note what is NOT used", detail: "The original cost ($300) and the equity carrying amount ($360) never enter goodwill — only the $420 fair value does." },
        ], result: "A $60 gain hits profit or loss on remeasurement, and goodwill on the newly-controlled subsidiary is $330. The old associate 'crystallises' at fair value before control accounting begins." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Step acquisition — the sequence",
          caption: "Remeasure first, then consolidate.",
          data: {
            steps: [
              { label: "Hold 30% associate", sub: "carried at $360 (equity method)" },
              { label: "Buy 40% for $600", sub: "control achieved at 70%" },
              { label: "Remeasure old 30% to FV", sub: "$420 − $360 = $60 gain to P/L" },
              { label: "Calculate goodwill", sub: "600 + 420 + 310 − 1,000 = $330" },
              { label: "Consolidate S", sub: "full line-by-line + 30% NCI" },
            ],
          },
        } },
      ],
      check: {
        q: "In a step acquisition, the previously-held interest is remeasured to fair value at the date control is obtained. Where does the resulting gain go, and which figure enters the goodwill calculation?",
        options: [
          "Gain to OCI; original cost enters goodwill",
          "Gain to profit or loss; fair value at the date of control enters goodwill",
          "No gain is recognised; equity-method carrying amount enters goodwill",
          "Gain to profit or loss; but the original cost still enters goodwill",
        ],
        correct: 1,
        explain: "IFRS 3 treats gaining control as a disposal-and-reacquisition: the held interest is remeasured to fair value with the gain (here $60) in profit or loss, and that same fair value ($420) — not cost or the equity carrying amount — is used to build goodwill.",
      },
    },
    {
      id: "disposals",
      heading: "Disposals — loss of control vs equity transaction",
      blocks: [
        { kind: "text", md: "Selling down a shareholding splits into two completely different worlds, decided by one test: **is control lost?** If yes, it is a **disposal** — the subsidiary is de-recognised and a gain or loss goes to profit or loss. If control is retained, it is **not** a disposal at all but a **transaction with owners** (covered in the last section). Never mix the two." },
        { kind: "formula", name: "Gain/loss on loss of control (group P/L)", expr: "Proceeds + FV of any retained interest + NCI de-recognised − net assets de-recognised − goodwill de-recognised", note: "Any retained interest is remeasured to fair value at the disposal date and carried forward at that value." },
        { kind: "text", md: "The logic mirrors the step acquisition in reverse: the group de-recognises everything it was consolidating (the subsidiary's net assets, its goodwill and the NCI), brings in what it received (cash) and what it kept (the retained stake **at fair value**), and the balancing figure is the gain or loss." },
        { kind: "example", title: "Worked example — partial disposal with loss of control", scenario: "P owns 80% of S (goodwill on the full method is $230 and the NCI is carried at $230). P sells a 60% holding for $900 cash, retaining 20% which it will hold as a financial investment at a fair value of $300. At the disposal date S's identifiable net assets are $1,000. Calculate the group gain or loss.", steps: [
          { label: "Bring in the proceeds", detail: "Cash received = $900." },
          { label: "Add the retained interest at fair value", detail: "The kept 20% is remeasured to fair value = $300." },
          { label: "Add back the NCI de-recognised", detail: "The group no longer consolidates S, so the $230 NCI is removed (added in the formula) = $230." },
          { label: "Remove the net assets", detail: "De-recognise S's identifiable net assets = −$1,000." },
          { label: "Remove the goodwill", detail: "De-recognise goodwill = −$230." },
          { label: "Balance to the gain", detail: "900 + 300 + 230 − 1,000 − 230 = $200 gain to profit or loss." },
        ], result: "A $200 gain is recognised in group profit or loss. The retained 20% is then carried forward at its $300 fair value as an IFRS 9 investment — the fair value 'reset' is the entry price for its new life outside the group." },
        { kind: "callout", tone: "warn", title: "Don't forget the NCI in the formula", md: "The single most common disposal error is omitting the **NCI de-recognised**. Because the group was only ever entitled to its own share, removing 100% of the net assets and goodwill without adding back the NCI **understates** the gain. The NCI must come back in." },
      ],
      check: {
        q: "P disposes of a controlling stake and loses control. Which items are removed, and where does the gain go?",
        options: [
          "Only the parent's share of net assets is removed; gain to OCI",
          "The subsidiary's net assets, its goodwill and the NCI are all de-recognised; gain to profit or loss",
          "Nothing is de-recognised; the change is an equity transaction",
          "Net assets are removed but goodwill is retained; gain to equity",
        ],
        correct: 1,
        explain: "On loss of control the whole subsidiary leaves the group: its net assets, its goodwill and the associated NCI are all de-recognised, proceeds and the fair value of any retained interest are brought in, and the balancing gain or loss (here $200) is reported in profit or loss.",
      },
    },
    {
      id: "adjustments",
      heading: "Associates, JVs and the core intra-group adjustments",
      blocks: [
        { kind: "text", md: "Associates (IAS 28) and joint ventures (IFRS 11) share one method: the **equity method**. Start the investment at cost, then add the investor's **share of post-acquisition profits** (and OCI), deduct **dividends received** and any **impairment**. It is a single line on the face of the statements — never line-by-line consolidation and never an NCI." },
        { kind: "example", title: "Worked example — equity accounting an associate", scenario: "P holds 30% of A, acquired for $500. Since acquisition A's retained earnings have risen by $400, and A's profit for the current year is $200. There has been no impairment.", steps: [
          { label: "Carrying amount", detail: "Cost $500 + 30% × $400 post-acquisition retained profit = $500 + $120 = $620 in the statement of financial position." },
          { label: "Profit or loss for the year", detail: "Share of A's profit = 30% × $200 = $60, shown as a single 'share of profit of associate' line." },
        ], result: "Associate carried at $620; a $60 share of profit runs through group profit or loss. One line each, not consolidation." },
        { kind: "text", md: "For **subsidiaries**, three adjustments earn most of the marks. **(1) Fair value uplifts** at acquisition must be carried through: an uplift on a depreciable asset generates **extra post-acquisition depreciation** that reduces post-acquisition profit (and so the NCI and group reserves). **(2) Provision for unrealised profit (PURP)** removes profit on intra-group sales still sitting in closing inventory. **(3) Intra-group balances** — loans, current accounts, dividends receivable/payable — are cancelled in full." },
        { kind: "example", title: "Worked example — fair value depreciation and PURP", scenario: "At acquisition S's plant was uplifted to fair value by $200, with a remaining life of 10 years. Separately, during the year P sold goods to S for $100 that had cost P $75; at the year end S has sold 60% of them on, so 40% remain in S's inventory.", steps: [
          { label: "Extra depreciation per year", detail: "$200 uplift ÷ 10 years = $20 extra depreciation each post-acquisition year." },
          { label: "Two years on", detail: "Accumulated extra depreciation = $20 × 2 = $40; the fair value uplift now sits at $200 − $40 = $160 net in the consolidated carrying amount." },
          { label: "Unrealised profit in the sale", detail: "Profit on the intra-group sale = $100 − $75 = $25 in total." },
          { label: "PURP on the unsold portion", detail: "40% remains unsold, so PURP = $25 × 40% = $10; remove it from inventory and the seller's profit." },
        ], result: "Extra depreciation of $20 a year (accumulated $40) reduces post-acquisition profit; the $10 PURP is stripped from closing inventory and the seller's retained earnings. Where the **seller is the subsidiary** (upstream), the PURP and depreciation effects are split between group and NCI in the ownership ratio." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Non-controlling interest — the working (20% NCI)",
          caption: "NCI starts at its acquisition value and moves with post-acquisition changes.",
          data: {
            name: "Non-controlling interest",
            debits: [
              { label: "Share of extra depreciation (20% × 40)", amount: 8 },
              { label: "Balance c/d", amount: 272 },
            ],
            credits: [
              { label: "NCI at acquisition (fair value)", amount: 230 },
              { label: "Share of post-acq retained profit (20% × 250)", amount: 50 },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Direction matters for PURP", md: "**Downstream** (parent sells to subsidiary): the profit is the parent's, so the full PURP hits **group** reserves. **Upstream** (subsidiary sells to parent): the profit is the subsidiary's, so the PURP is split **group / NCI**. The amount removed is the same — where it lands is not." },
      ],
      check: {
        q: "S (an 80%-owned subsidiary) sells goods to P at a profit; at year end $10 of that profit is unrealised (still in P's inventory). This is an upstream sale. How is the $10 PURP allocated?",
        options: [
          "$10 all to group retained earnings; NCI unaffected",
          "$8 to group retained earnings and $2 to the NCI",
          "$10 all to the NCI",
          "No adjustment — only downstream sales create PURP",
        ],
        correct: 1,
        explain: "The full $10 is always eliminated. Because the seller is the subsidiary (upstream), the unrealised profit belongs to S, so it is split in the ownership ratio: 80% × $10 = $8 to the group and 20% × $10 = $2 to the NCI.",
      },
    },
    {
      id: "fx-equity",
      heading: "Foreign subsidiaries and equity transactions",
      blocks: [
        { kind: "text", md: "A **foreign subsidiary** keeps its books in its own **functional currency**; to consolidate, IAS 21 translates it into the group's **presentation currency**. The rules are mechanical: **assets and liabilities at the closing rate**, **income and expenses at the average rate** (a proxy for the transaction rates), **pre-acquisition equity and goodwill at historic/closing rate** as the policy requires, and the balancing **exchange difference to other comprehensive income** — never to profit or loss for the net investment." },
        { kind: "example", title: "Worked example — IAS 21 translation difference", scenario: "A foreign subsidiary has opening net assets of FC 800 and closing net assets of FC 1,000, having made a profit of FC 200 in the year. Exchange rates are: opening $2.00/FC, average $2.20/FC, closing $2.50/FC.", steps: [
          { label: "Opening net assets in $", detail: "FC 800 × $2.00 = $1,600 (translated at the opening rate)." },
          { label: "Profit for the year in $", detail: "FC 200 × $2.20 average = $440." },
          { label: "Closing net assets in $", detail: "FC 1,000 × $2.50 closing = $2,500." },
          { label: "The exchange difference", detail: "$2,500 closing − $1,600 opening − $440 profit = $460 exchange gain." },
        ], result: "A $460 exchange gain is recognised in OCI and accumulated in a translation reserve. It arises purely because the same net assets are re-translated at a stronger closing rate — it is not trading profit, which is why it bypasses profit or loss." },
        { kind: "text", md: "Finally, a change in ownership that does **not** lose control — buying more from, or selling some to, the NCI while still controlling — is a **transaction between owners of the group**. No gain or loss and **no goodwill** arise; the difference between the consideration and the NCI adjusted is taken **straight to the parent's equity**." },
        { kind: "callout", tone: "rule", title: "Equity transaction — no P/L, no goodwill", md: "When control is retained, adjust the **NCI** for the change in ownership and post the difference between that adjustment and the cash to **equity attributable to the parent**. Goodwill is never re-opened; profit or loss is never touched." },
        { kind: "example", title: "Worked example — buying out part of the NCI", scenario: "P already controls S with an 80% holding; the NCI (20%) is carried at $300. P buys a further 10% from the NCI for $200 cash, taking its stake to 90%. Control was never in question.", steps: [
          { label: "NCI de-recognised", detail: "P has bought half of the 20% NCI, so remove 10/20 × $300 = $150 from the NCI." },
          { label: "Consideration paid", detail: "Cash paid = $200." },
          { label: "Adjustment to parent's equity", detail: "$200 paid − $150 NCI removed = $50 debited to the parent's equity (a reduction)." },
          { label: "What does NOT happen", detail: "No goodwill is recognised on the extra 10%, and nothing goes to profit or loss." },
        ], result: "NCI falls by $150, the parent's equity falls by $50, and cash falls by $200 — a pure equity transaction. The $50 'premium' over the NCI's book value is absorbed in equity, not capitalised as goodwill." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Loss of control vs no loss of control",
          caption: "One test — is control lost? — decides where the difference goes.",
          data: {
            leftTitle: "Control IS lost (disposal)",
            rightTitle: "Control retained (equity transaction)",
            rows: [
              { aspect: "Nature", left: "De-recognise the subsidiary", right: "Transaction with owners" },
              { aspect: "Gain or loss", left: "To profit or loss", right: "None — adjust equity" },
              { aspect: "Goodwill", left: "De-recognised", right: "Untouched — no new goodwill" },
              { aspect: "Retained stake", left: "Remeasured to fair value", right: "Not remeasured" },
              { aspect: "NCI", left: "Removed entirely", right: "Adjusted for the % change" },
            ],
          },
        } },
      ],
      check: {
        q: "P owns 80% of S. It buys a further 10% from the NCI while keeping control. Which statement is correct?",
        options: [
          "A gain or loss on the extra 10% goes to profit or loss",
          "New goodwill is recognised on the 10% purchased",
          "No gain, loss or goodwill arises; the difference is taken to the parent's equity",
          "The subsidiary is de-recognised and re-consolidated",
        ],
        correct: 2,
        explain: "Because control is retained, this is a transaction between owners: the NCI is reduced for the 10% bought, and the difference between the $200 paid and the $150 NCI removed ($50) is charged to the parent's equity. No profit or loss and no goodwill.",
      },
    },
  ],
  examTraps: [
    { trap: "Reading control off the shareholding alone (assuming under 50% can never control).", fix: "Apply the IFRS 10 three-part test — power, variable returns, ability to use power. Potential voting rights and de facto control can give control below 50%." },
    { trap: "In a step acquisition, using the original cost (or equity carrying amount) of the held interest in goodwill.", fix: "Remeasure the previously-held interest to fair value at the date control is obtained — the gain goes to P/L and that fair value enters goodwill." },
    { trap: "Putting a gain or loss through P/L when control is NOT lost.", fix: "A change in ownership without loss of control is an equity transaction: no gain/loss, no goodwill — the difference goes to the parent's equity." },
    { trap: "Omitting the NCI de-recognised from the disposal gain, understating it.", fix: "The gain = proceeds + FV of retained interest + NCI removed − net assets − goodwill. The NCI must be added back." },
    { trap: "Forgetting extra depreciation on a fair value uplift, overstating post-acquisition profit and NCI.", fix: "A fair value uplift on a depreciable asset creates extra depreciation every post-acquisition year — reduce net assets and post-acquisition reserves accordingly." },
    { trap: "Taking a foreign subsidiary's translation difference to profit or loss.", fix: "The exchange difference on translating a net investment goes to OCI (translation reserve), not profit or loss." },
  ],
  keyTerms: [
    { term: "Control (IFRS 10)", def: "Power over the investee, exposure to variable returns, and the ability to use power to affect those returns — all three together." },
    { term: "Non-controlling interest (NCI)", def: "The equity in a subsidiary not attributable to the parent; measured at fair value (full) or its share of net assets (proportionate)." },
    { term: "Goodwill (IFRS 3)", def: "Consideration + NCI + FV of any prior interest − FV of identifiable net assets acquired; the unidentifiable premium paid for control." },
    { term: "Step acquisition", def: "Gaining control in stages; the previously-held interest is remeasured to fair value at the date of control, with the gain or loss in profit or loss." },
    { term: "Equity method", def: "Carry an associate or joint venture at cost plus share of post-acquisition profits/OCI, less dividends and impairment — a single line, no NCI." },
    { term: "PURP", def: "Provision for unrealised profit: intra-group profit still held in closing inventory, eliminated in full (split with NCI when the seller is the subsidiary)." },
  ],
  summary: [
    "Control (IFRS 10) — power, variable returns and the ability to link them — is the trigger for full consolidation; below it lie associates, joint ventures and investments.",
    "Goodwill = consideration + NCI + FV of any prior interest − FV of identifiable net assets; the full method carries NCI (and its goodwill) at fair value, the proportionate method at its share of net assets.",
    "A step acquisition remeasures the previously-held interest to fair value (gain to P/L), and that fair value — not cost — builds goodwill.",
    "Loss of control is a disposal: de-recognise net assets, goodwill and NCI, bring in proceeds and the retained interest at fair value, and take the gain/loss to P/L; retaining control is an equity transaction with no gain and no goodwill.",
    "Core subsidiary adjustments: fair value uplifts with post-acquisition depreciation, PURP on intra-group inventory, and cancellation of intra-group balances — PURP splits with NCI on upstream sales.",
    "Foreign subsidiaries translate assets/liabilities at closing rate and income at average rate, with the exchange difference to OCI (IAS 21).",
  ],
}
