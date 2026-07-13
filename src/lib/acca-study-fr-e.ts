import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area E — Consolidated financial statements.
 * Control (IFRS 10) and the single-entity idea; goodwill (full vs proportionate
 * NCI); fair value adjustments and post-acquisition depreciation; the standard
 * workings (net assets, goodwill, NCI, group retained earnings); intra-group
 * adjustments (balances & cash in transit, PURP, PPE transfers); the consolidated
 * SoFP (balancing) and P/L (mid-year acquisition); associates (IAS 28 equity
 * method). Original, syllabus-aligned; every figure re-solved. No third-party text.
 */

export const FR_E: StudyChapter = {
  paper: "FR",
  area: "E",
  title: "Consolidated financial statements",
  minutes: 19,
  intro: "One parent, several companies, one set of accounts. Consolidation is the art of pretending a group is a single business — then carefully unpicking every deal it did with itself.",
  outcomes: [
    "Explain control under IFRS 10 and why a group is presented as a single economic entity",
    "Calculate goodwill using both the full (fair value) and the proportionate NCI methods",
    "Prepare the standard workings — net assets, goodwill, non-controlling interest and group retained earnings",
    "Make intra-group adjustments: cancel balances (with cash in transit), remove unrealised profit and strip intra-group trading",
    "Prepare a consolidated statement of financial position that balances, and a consolidated P/L with a mid-year acquisition",
    "Account for an associate using the equity method under IAS 28",
  ],
  sections: [
    {
      id: "control",
      heading: "Control and the single economic entity",
      blocks: [
        { kind: "text", md: "A **group** is not a legal person. P Ltd and S Ltd remain two separate companies with their own books, their own tax and their own bank accounts. Yet if P **controls** S, the users of P's accounts want to see the whole thing they really own — so the law requires P to publish **consolidated financial statements** that present the group **as if it were a single business**. This is the **single economic entity** concept, and it drives every rule that follows." },
        { kind: "text", md: "The trigger for consolidation is **control**, defined by **IFRS 10**. Control is not a bare 50% share test. An investor controls an investee when it has all three of: **power** over the relevant activities; **exposure to variable returns** from the investee; and the **ability to use its power to affect those returns**. Usually that comes with more than half the voting rights — but a 45% holder who appoints the board and directs operations still has control, and a 55% holder tied down by another party's veto might not." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "The investment spectrum — holding size vs how you account for it",
          caption: "The accounting follows the relationship, not just the percentage.",
          data: {
            centre: "Parent company holds ...",
            nodes: [
              { label: "Over 50% — Subsidiary", sub: "Control (IFRS 10) → consolidate line by line" },
              { label: "20-50% — Associate", sub: "Significant influence (IAS 28) → equity method" },
              { label: "Under 20% — Investment", sub: "Neither → IFRS 9 financial asset" },
              { label: "Joint arrangement", sub: "Joint control (IFRS 11) → JV = equity method" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Consolidation adds **100%** of the subsidiary to **100%** of the parent — every asset, every liability, all income and all expenses — because the group controls all of them. The slice the group does **not** own is then shown separately as the **non-controlling interest**, not left out." },
      ],
      check: {
        q: "P owns 45% of the shares of Q and, through an agreement with the other shareholders, appoints the majority of Q's board and directs its trading activities. How should Q be accounted for?",
        options: [
          "As an associate under the equity method, because P owns less than 50%",
          "As a subsidiary, consolidated in full, because P has control",
          "As a simple investment measured under IFRS 9",
          "It should not appear in the group accounts at all",
        ],
        correct: 1,
        explain: "Control under IFRS 10 is about power over the relevant activities plus exposure to variable returns — not a strict 50% share test. P appoints the board and directs Q's activities, so P controls Q. Q is a subsidiary and is consolidated line by line, even though the holding is only 45%.",
      },
    },
    {
      id: "goodwill",
      heading: "Goodwill on acquisition",
      blocks: [
        { kind: "text", md: "A buyer almost always pays **more** for a subsidiary than the fair value of its identifiable net assets — for the brand, the customer list, the assembled workforce, the future it expects. That premium is **goodwill**, and it is the first figure to nail in any consolidation question. The formula reads the acquisition from the group's side:" },
        { kind: "formula", name: "Goodwill on acquisition", expr: "Goodwill = Consideration transferred + NCI at acquisition − Fair value of identifiable net assets acquired", note: "Everything is measured at the ACQUISITION DATE. Net assets are at fair value, including any fair value adjustments." },
        { kind: "text", md: "There are **two permitted ways** to measure the NCI at acquisition, and the exam expects you to know both. Under the **full (fair value) method** the NCI is measured at its own fair value, so the goodwill figure includes the NCI's share of goodwill. Under the **proportionate method** the NCI is measured at its share of the fair value of net assets, so only the parent's goodwill appears." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two ways to value the NCI (and so the goodwill)",
          data: {
            leftTitle: "Full (fair value) method",
            rightTitle: "Proportionate method",
            rows: [
              { aspect: "NCI measured at", left: "Fair value at acquisition ($40,000)", right: "NCI share of net assets (20% x 180,000 = $36,000)" },
              { aspect: "Goodwill", left: "$30,000 — includes NCI's goodwill", right: "$26,000 — parent's goodwill only" },
              { aspect: "Goodwill belongs to", left: "Parent and NCI", right: "Parent only" },
              { aspect: "Impairment loss", left: "Shared between parent and NCI", right: "Charged wholly to the parent" },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Building goodwill for S (full method)",
          caption: "Add the two 'costs' of control, then strip out the net assets acquired.",
          data: {
            unit: "$",
            items: [
              { label: "Consideration transferred", value: 170000, kind: "start" },
              { label: "NCI at fair value", value: 40000, kind: "delta" },
              { label: "FV of net assets acquired", value: -180000, kind: "delta" },
              { label: "Goodwill", value: 30000, kind: "total" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — goodwill on the acquisition of S", scenario: "On 1 Jan 20X2 P acquired 80% of S for consideration of $170,000. At that date S's share capital was $100,000, its retained earnings were $60,000, and its land was worth $20,000 more than its carrying amount. NCI is measured at its fair value of $40,000. Calculate goodwill.", steps: [
          { label: "Fair value of net assets (W2)", detail: "100,000 share capital + 60,000 retained earnings + 20,000 fair value adjustment on land = $180,000." },
          { label: "Add the two costs of control", detail: "Consideration 170,000 + NCI at fair value 40,000 = $210,000 — what the whole of S is effectively valued at." },
          { label: "Deduct net assets acquired", detail: "210,000 − 180,000 = $30,000." },
        ], result: "Goodwill is $30,000 under the full method. Under the proportionate method NCI would be 20% x 180,000 = 36,000, giving goodwill of 170,000 + 36,000 − 180,000 = $26,000." },
        { kind: "callout", tone: "rule", title: "Goodwill after day one", md: "Purchased goodwill is **not amortised**. It sits on the consolidated SoFP and is **tested for impairment** at least annually. Any impairment reduces goodwill and reduces retained earnings (and, under the full method, the NCI's share too)." },
      ],
      check: {
        q: "P acquires 80% of S. The fair value of S's net assets at acquisition is $180,000, the consideration is $170,000, and the NCI is valued at its fair value of $40,000. Goodwill under the full method is:",
        options: ["$10,000", "$26,000", "$30,000", "$44,000"],
        correct: 2,
        explain: "Goodwill (full method) = consideration + NCI at fair value − fair value of net assets acquired = 170,000 + 40,000 − 180,000 = $30,000. The $26,000 answer is the proportionate method (NCI = 20% x 180,000 = 36,000). The $10,000 answer wrongly ignores the NCI altogether.",
      },
    },
    {
      id: "workings",
      heading: "The standard workings — net assets, NCI and group retained earnings",
      blocks: [
        { kind: "text", md: "Almost every consolidation flows from one table: the **net assets of the subsidiary**, measured at **two** dates — the date of acquisition and the reporting date. The acquisition column feeds **goodwill**; the movement between the columns is the **post-acquisition profit** that is shared between the group and the NCI." },
        { kind: "table", caption: "W2 — Net assets of S", head: ["S — net assets", "At acquisition $", "At reporting date $"], rows: [
          ["Share capital", "100,000", "100,000"],
          ["Retained earnings", "60,000", "110,000"],
          ["Fair value adjustment — land", "20,000", "20,000"],
          ["Net assets", "180,000", "230,000"],
        ] },
        { kind: "text", md: "The **post-acquisition change** in net assets is 230,000 − 180,000 = **$50,000**. That $50,000 is split by ownership: 80% belongs to the group, 20% to the NCI. Notice the **fair value adjustment** sits in **both** columns. On land it never changes, but on a depreciable asset it must be worn down by **extra depreciation** — and that extra depreciation reduces the subsidiary's post-acquisition profit." },
        { kind: "example", title: "Illustration — extra depreciation on a fair-valued asset", scenario: "Suppose instead the fair value uplift had been $50,000 on plant with a 5-year remaining life at acquisition. Two years after acquisition, how does the adjustment appear in W2?", steps: [
          { label: "Extra depreciation per year", detail: "50,000 / 5 years = $10,000 of additional depreciation the group must charge each year." },
          { label: "After two years", detail: "2 x 10,000 = $20,000 of extra depreciation has now been charged." },
          { label: "Remaining fair value adjustment", detail: "50,000 − 20,000 = $30,000 is the net uplift still carried in the reporting-date column." },
          { label: "Effect on reserves", detail: "The $20,000 extra depreciation reduces the subsidiary's post-acquisition retained earnings, feeding into both the NCI (W4) and group retained earnings (W5)." },
        ], result: "The acquisition column shows the full 50,000 uplift; the reporting-date column shows 30,000, and post-acquisition profit is 20,000 lower because of the extra depreciation the group must charge." },
        { kind: "text", md: "Two short workings finish the equity side. The **NCI at the reporting date** starts from its acquisition value and adds its share of the post-acquisition profit. **Group retained earnings** start from the parent's own reserves, add the parent's share of the subsidiary's post-acquisition profit, and strip out any unrealised profit the parent made selling into the group (see the next section)." },
        { kind: "table", caption: "W4 — Non-controlling interest at the reporting date", head: ["Non-controlling interest", "$"], rows: [
          ["NCI at acquisition (fair value)", "40,000"],
          ["NCI share of post-acq profit (20% x 50,000)", "10,000"],
          ["NCI at reporting date", "50,000"],
        ] },
        { kind: "table", caption: "W5 — Group retained earnings", head: ["Group retained earnings", "$"], rows: [
          ["P's own retained earnings", "320,000"],
          ["Unrealised profit in inventory — PURP (P is seller)", "(6,000)"],
          ["P's share of S's post-acq profit (80% x 50,000)", "40,000"],
          ["Group retained earnings", "354,000"],
        ] },
        { kind: "callout", tone: "warn", title: "Only post-acquisition counts", md: "The subsidiary's share capital and its **pre-acquisition** retained earnings never reach group equity — they were bought and paid for, and they live inside the goodwill calculation. Group reserves only ever pick up the **post-acquisition** movement." },
      ],
      check: {
        q: "Using W2 above, S's net assets rose from $180,000 at acquisition to $230,000 at the reporting date. P owns 80%. What is the NCI's share of the post-acquisition profit that is added in working W4?",
        options: ["$50,000", "$40,000", "$10,000", "$46,000"],
        correct: 2,
        explain: "Post-acquisition change = 230,000 − 180,000 = 50,000. The NCI owns 20%, so its share added in W4 is 20% x 50,000 = $10,000 (added to the $40,000 acquisition value to give NCI of $50,000). The $40,000 is the parent's 80% share, which goes to group retained earnings instead.",
      },
    },
    {
      id: "intragroup",
      heading: "Intra-group adjustments — the group trading with itself",
      blocks: [
        { kind: "text", md: "Because the group is one entity, any deal it does **with itself** must vanish on consolidation. A group cannot owe itself money, cannot sell to itself, and cannot make a profit selling to itself. Three adjustments cover almost every question." },
        { kind: "text", md: "**1. Intra-group balances.** If P shows a receivable from S and S shows the matching payable to P, both cancel — the group owes nothing to the outside world here. But the two figures must **agree** first. A mismatch usually means **cash in transit** (a payment sent but not yet received) or **goods in transit** (dispatched but not yet recorded). Adjust the in-transit item first, then cancel the now-equal balances." },
        { kind: "example", title: "Worked example — intra-group balances and cash in transit", scenario: "At the year end P's receivables include $30,000 owed by S. S's payables show only $22,000 owed to P, because on 30 Dec S posted P a cheque for $8,000 that P had not yet recorded. (Illustrative figures, shown to isolate the mechanics.)", steps: [
          { label: "Record the cash in transit", detail: "Treat the $8,000 as received by the group: add $8,000 to consolidated cash and reduce P's receivable from 30,000 to 22,000." },
          { label: "Now the two sides agree", detail: "P's receivable of 22,000 equals S's payable of 22,000 — a matched intra-group balance." },
          { label: "Cancel the balance", detail: "Remove $22,000 from consolidated receivables and $22,000 from consolidated payables." },
        ], result: "Cash rises $8,000, and receivables and payables each fall $22,000. Cancelling before adjusting the in-transit item would leave the group's cash understated by $8,000." },
        { kind: "text", md: "**2. Unrealised profit in inventory (PURP).** When one group company sells goods to another at a profit and the buyer still holds some at the year end, that profit has **not** been earned by the group — no outside sale has happened. It must be removed: reduce **inventory** to its original cost to the group, and reduce the **seller's** retained earnings by the same amount." },
        { kind: "example", title: "Worked example — unrealised profit in inventory (PURP)", scenario: "During the year P sold goods to its 80%-owned subsidiary S for $24,000, at a mark-up of 33⅓% on cost. At the reporting date all of these goods remain unsold in S's inventory. P is the seller. What adjustment is needed?", steps: [
          { label: "Find the profit percentage", detail: "A mark-up of 33⅓% on cost is a margin of 25% on selling price (cost 75 + profit 25 sells for 100)." },
          { label: "Profit still in inventory", detail: "24,000 x 25% = $6,000 of profit sits inside inventory the group still holds — it is unrealised." },
          { label: "Reduce inventory", detail: "The group cannot carry goods above their original cost to the group: deduct $6,000 from consolidated inventory." },
          { label: "Reduce the seller's profit", detail: "P made the sale, so remove $6,000 from group retained earnings (W5). The NCI is untouched because the parent is the seller." },
        ], result: "Consolidated inventory falls by $6,000 and group retained earnings fall by $6,000. Had S been the seller, the $6,000 would be split 80/20 between group retained earnings and the NCI." },
        { kind: "text", md: "**3. Intra-group transfers of non-current assets.** If one company sells PPE to another above carrying amount, the group must reverse the **profit on disposal** recorded by the seller and cancel the **extra depreciation** the buyer charges on the inflated cost. The net effect restores the asset to what it would have shown had the transfer never happened." },
        { kind: "callout", tone: "tip", md: "Direction matters for who bears the hit. **Parent sells to subsidiary** → adjust group reserves only. **Subsidiary sells to parent** → the subsidiary's profit is reduced, so the adjustment is shared with the **NCI** in the same 80/20 split." },
      ],
      check: {
        q: "During the year P sold goods to its subsidiary S for $24,000 at a mark-up of 33⅓% on cost. At the year end all these goods are still in S's inventory. The unrealised profit to remove on consolidation is:",
        options: ["$8,000", "$6,000", "$24,000", "Nil — S is a separate legal company"],
        correct: 1,
        explain: "A mark-up of 33⅓% on cost equals a margin of 25% on selling price. Profit still held = 24,000 x 25% = $6,000. Because the goods are unsold within the group the profit is unrealised: reduce group inventory and (as P is the seller) group retained earnings by $6,000. The $8,000 answer wrongly applies 33⅓% to the selling price; 'nil' ignores the single-entity concept.",
      },
    },
    {
      id: "sofp",
      heading: "The consolidated statement of financial position",
      blocks: [
        { kind: "text", md: "With the workings done, the consolidated SoFP is an assembly job. Add P and S line by line, drop in goodwill, apply the intra-group and PURP adjustments, and lift group retained earnings and the NCI straight from the workings. Follow a fixed sequence and the two sides will agree every time." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The consolidation sequence",
          caption: "Same order, every question.",
          data: {
            steps: [
              { label: "Add across 100%", sub: "All of P + all of S, line by line" },
              { label: "Cancel intra-group", sub: "Balances (after cash in transit) and trading" },
              { label: "Fair value & PURP", sub: "FV adjustments, extra depreciation, remove unrealised profit" },
              { label: "Goodwill & NCI", sub: "W3 goodwill (asset); W4 non-controlling interest" },
              { label: "Group equity", sub: "Parent's share capital + group RE (W5)" },
            ],
          },
        } },
        { kind: "text", md: "Here is the group built from the numbers used throughout this chapter: P (SoFP totals — PPE 400,000; investment in S at cost 170,000; inventory 90,000; receivables 70,000 including 30,000 from S; bank 30,000; share capital 300,000; retained earnings 320,000; payables 140,000 including nothing external in dispute) and S (PPE 210,000; inventory 60,000; receivables 40,000; bank 20,000; share capital 100,000; retained earnings 110,000; payables 120,000 including 30,000 owed to P). The $170,000 investment is replaced by goodwill and net assets, so it never appears." },
        { kind: "table", caption: "Consolidated statement of financial position at 31 Dec 20X4", head: ["", "$"], rows: [
          ["Goodwill (W3)", "30,000"],
          ["Property, plant & equipment (400,000 + 210,000 + 20,000 FV)", "630,000"],
          ["Inventory (90,000 + 60,000 − 6,000 PURP)", "144,000"],
          ["Receivables (70,000 + 40,000 − 30,000 intra-group)", "80,000"],
          ["Cash at bank (30,000 + 20,000)", "50,000"],
          ["Total assets", "934,000"],
          ["Share capital — parent only", "300,000"],
          ["Group retained earnings (W5)", "354,000"],
          ["Non-controlling interest (W4)", "50,000"],
          ["Payables (140,000 + 120,000 − 30,000 intra-group)", "230,000"],
          ["Total equity and liabilities", "934,000"],
        ] },
        { kind: "callout", tone: "key", title: "It balances", md: "Assets **$934,000** = equity + liabilities **$934,000**. The equity side proves the workings: share capital 300,000 + group RE 354,000 + NCI 50,000 = **704,000** of net assets, which equals total assets 934,000 − payables 230,000. Only the **parent's** share capital appears — the subsidiary's 100,000 is buried in goodwill." },
      ],
    },
    {
      id: "pl-associates",
      heading: "The consolidated P/L, mid-year acquisitions and associates",
      blocks: [
        { kind: "text", md: "The consolidated **statement of profit or loss** follows the same single-entity logic. **Add across** revenue and every expense, **remove** intra-group trading (deduct the same amount from both revenue and cost of sales), then split the final profit between the **owners of the parent** and the **NCI**." },
        { kind: "callout", tone: "rule", title: "Mid-year acquisitions", md: "If a subsidiary is bought **part way through** the year, consolidate only the results **from the date of acquisition**. Time-apportion its revenue and expenses — typically on a months basis — because the group only controlled it for part of the year." },
        { kind: "example", title: "Worked example — consolidated P/L with a mid-year acquisition", scenario: "For the year ended 31 Dec 20X4, P had revenue 500,000, cost of sales 300,000 and other expenses 60,000. P acquired 80% of T on 1 April 20X4. T's full-year figures were revenue 240,000, cost of sales 140,000 and other expenses 40,000. During the post-acquisition period P sold goods to T for $20,000, all of which T resold before the year end (no closing PURP).", steps: [
          { label: "Time-apportion T (9 months)", detail: "Acquired 1 April, so include 9/12: revenue 180,000; cost of sales 105,000; other expenses 30,000. T's post-acq profit = 180,000 − 105,000 − 30,000 = 45,000." },
          { label: "Remove intra-group trading", detail: "Deduct the $20,000 sale from both group revenue and group cost of sales — it nets to zero on profit as nothing remains in inventory." },
          { label: "Add across", detail: "Revenue 500,000 + 180,000 − 20,000 = 660,000; cost of sales 300,000 + 105,000 − 20,000 = 385,000; other expenses 60,000 + 30,000 = 90,000." },
          { label: "Split the profit", detail: "Profit for the year = 660,000 − 385,000 − 90,000 = 185,000. NCI share = 20% x T's post-acq profit 45,000 = 9,000. Owners of the parent = 185,000 − 9,000 = 176,000." },
        ], result: "Group profit for the year is $185,000, split $176,000 to the owners of the parent and $9,000 to the NCI. Cross-check: P's own profit (140,000) + P's 80% share of T's post-acq profit (36,000) = 176,000." },
        { kind: "table", caption: "Consolidated P/L for the year ended 31 Dec 20X4", head: ["", "$"], rows: [
          ["Revenue (500,000 + 180,000 − 20,000)", "660,000"],
          ["Cost of sales (300,000 + 105,000 − 20,000)", "(385,000)"],
          ["Gross profit", "275,000"],
          ["Other expenses (60,000 + 30,000)", "(90,000)"],
          ["Profit for the year", "185,000"],
          ["Attributable to owners of the parent", "176,000"],
          ["Attributable to non-controlling interest", "9,000"],
        ] },
        { kind: "diagram", diagram: {
          type: "donut",
          title: "Who owns the $185,000 group profit",
          caption: "Total profit is split by ownership — the NCI is shown, never dropped.",
          data: {
            items: [
              { label: "Owners of the parent", value: 176000 },
              { label: "Non-controlling interest", value: 9000 },
            ],
          },
        } },
        { kind: "text", md: "**Associates** are different. With **significant influence** (usually 20-50%, or a board seat) but **not** control, an investor uses the **equity method** under **IAS 28**. There is **no** line-by-line consolidation. Instead the group shows a single **investment in associate** asset on the SoFP and a single **share of profit of associate** line in the P/L." },
        { kind: "formula", name: "Investment in associate (equity method)", expr: "Investment = Cost + Group share of post-acquisition profits − Dividends received from associate − Impairment", note: "One asset on the SoFP. In the P/L: share of profit = group % x the associate's profit for the year." },
        { kind: "example", title: "Worked example — an associate under the equity method", scenario: "P also owns 30% of A, over which it has significant influence but not control. P paid $80,000 for the holding. Since acquisition A's retained earnings have risen by $50,000, and A's profit for the current year is $40,000. How does A appear in the group accounts?", steps: [
          { label: "No line-by-line consolidation", detail: "P does not control A, so A's assets, liabilities, revenue and costs are NOT added in." },
          { label: "Investment in associate (SoFP)", detail: "Cost 80,000 + 30% x post-acq profit 50,000 = 80,000 + 15,000 = $95,000 (less any dividends received and any impairment)." },
          { label: "Share of profit (P/L)", detail: "One line: share of profit of associate = 30% x 40,000 = $12,000." },
        ], result: "The associate appears as a single $95,000 asset on the consolidated SoFP and a single $12,000 line in the consolidated P/L — the whole of the equity method in two figures." },
      ],
    },
  ],
  examTraps: [
    { trap: "Using a strict 'more than 50%' rule to decide whether to consolidate.", fix: "Apply IFRS 10: control is power over the relevant activities + exposure to variable returns. A 45% holder who directs the business controls it; a 55% holder blocked by a veto may not." },
    { trap: "Leaving the NCI out of the full-method goodwill calculation.", fix: "Full-method goodwill = consideration + NCI at fair value − FV net assets. Forgetting the NCI understates goodwill. The proportionate method values NCI at its share of net assets instead." },
    { trap: "Consolidating a mid-year subsidiary's full-year results.", fix: "Only consolidate from the acquisition date. Time-apportion the subsidiary's income and expenses (usually months) and use only the post-acquisition slice for the NCI share." },
    { trap: "Carrying the subsidiary's share capital and pre-acquisition reserves into group equity.", fix: "Those were bought and sit inside goodwill. Group equity shows only the parent's share capital plus post-acquisition reserves." },
    { trap: "Charging the PURP or an asset-transfer profit to the wrong entity, and forgetting the NCI when the subsidiary is the seller.", fix: "Reduce the SELLER's retained earnings. Parent sells → group reserves only. Subsidiary sells → split the adjustment with the NCI in the ownership ratio." },
    { trap: "Cancelling intra-group receivables and payables that do not match.", fix: "Adjust for cash in transit or goods in transit FIRST so the two balances agree, then cancel. Otherwise consolidated cash (or inventory) is misstated." },
  ],
  keyTerms: [
    { term: "Control (IFRS 10)", def: "Power over the relevant activities of an investee, exposure to variable returns, and the ability to use that power to affect those returns — the trigger for consolidating a subsidiary." },
    { term: "Goodwill", def: "The premium paid on acquisition: consideration + NCI at acquisition − fair value of identifiable net assets acquired. Not amortised; tested for impairment." },
    { term: "Non-controlling interest (NCI)", def: "The share of a subsidiary's net assets and profit not owned by the parent, presented within group equity. Measured at fair value (full method) or its share of net assets (proportionate)." },
    { term: "Fair value adjustment", def: "The uplift or reduction bringing a subsidiary's assets and liabilities to fair value at acquisition; depreciable adjustments carry extra post-acquisition depreciation." },
    { term: "Unrealised profit (PURP)", def: "Profit on intra-group sales still sitting in closing inventory or in transferred assets; removed because no sale outside the group has occurred." },
    { term: "Equity method (IAS 28)", def: "The single-line method for associates: investment = cost + share of post-acquisition profit − dividends − impairment; share of profit shown as one P/L line." },
  ],
  summary: [
    "Control under IFRS 10 — not a bare 50% test — decides consolidation; a group is one economic entity, so add 100% of the parent and 100% of the subsidiary.",
    "Goodwill = consideration + NCI at acquisition − fair value of net assets acquired; the full method values NCI at fair value, the proportionate method at its share of net assets.",
    "The net assets working (acquisition vs reporting date) drives NCI (W4) and group retained earnings (W5), and carries fair value adjustments plus any post-acquisition extra depreciation.",
    "Cancel intra-group balances (after adjusting cash or goods in transit) and remove unrealised profit on intra-group inventory and asset transfers, charging the seller.",
    "Consolidated P/L: add across, time-apportion a mid-year subsidiary, strip intra-group trading, then split profit between the owners of the parent and the NCI.",
    "Associates use the equity method: no consolidation — one investment asset (cost + share of post-acq profit − dividends) and one share-of-profit line.",
  ],
}
