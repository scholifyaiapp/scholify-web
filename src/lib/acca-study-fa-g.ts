import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area G — Simple consolidated financial statements.
 * Rich study chapter matching the FA_A exemplar in depth, tone and visuals.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Every figure re-solved.
 */

export const FA_G: StudyChapter = {
  paper: "FA",
  area: "G",
  title: "Simple consolidated financial statements",
  minutes: 17,
  intro: "One company buys control of another. Legally they are still two companies — but to an investor they are now one business. Consolidation is the accounting that tells that single story.",
  outcomes: [
    "Explain what a group is and when one company controls another",
    "Calculate goodwill on acquisition using consideration, NCI and net assets acquired",
    "Measure the non-controlling interest and group retained earnings at the reporting date",
    "Prepare a simple consolidated statement of financial position",
    "Make basic intra-group adjustments — cancel balances and remove unrealised profit (PURP)",
    "Account for an associate using the equity method at a simple level",
  ],
  sections: [
    {
      id: "what-is-a-group",
      heading: "What a group is — and why we consolidate",
      blocks: [
        { kind: "text", md: "Suppose **P Co** buys enough shares in **S Co** to run it — to hire and fire its directors and decide how it spends its money. In law nothing merges: P and S are still two separate companies, each with its own accounts. But an investor in P now cares about **both** businesses, because P calls the shots on both. A **group** is that economic reality: a **parent** and the companies it controls, its **subsidiaries**." },
        { kind: "callout", tone: "rule", title: "Control is the trigger", md: "A parent-subsidiary relationship exists when one company has **control** over another — the power to direct its activities to earn returns. The usual test is holding **more than 50% of the voting rights** (ordinary shares). Own more than half the votes and you can pass any ordinary resolution, so you control the company." },
        { kind: "text", md: "Because the parent controls the subsidiary, accounting looks at **substance over form**: the form is two legal companies, but the substance is **one economic entity** under single control. **Consolidated financial statements** present that single entity — as if the group were one company — so users can judge everything the parent commands, not just the parent's own shell." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "How much you own decides how you account for it",
          caption: "The size of the shareholding maps to the level of influence — and to a different accounting treatment.",
          data: {
            centre: "Parent company (P)",
            nodes: [
              { label: "Subsidiary", sub: ">50% of votes → control → consolidate in full" },
              { label: "Associate", sub: "20–50% → significant influence → equity method" },
              { label: "Trade investment", sub: "<20% → no influence → hold at fair value" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Consolidation replaces the parent's **\"Investment in S\"** with the **actual assets and liabilities** it controls — showing the group as a single business rather than a share certificate." },
      ],
    },
    {
      id: "goodwill",
      heading: "Goodwill on acquisition",
      blocks: [
        { kind: "text", md: "When P buys control of S, it almost always pays **more** than the fair value of S's identifiable net assets. Why overpay? Because it is also buying things the accounts never recorded — S's reputation, its customer relationships, its skilled team, its market position. That premium is **goodwill**: the extra the parent paid for the whole, over the fair value of the separable parts." },
        { kind: "formula", name: "Goodwill on acquisition", expr: "Consideration transferred  +  NCI at acquisition  −  Fair value of net assets acquired", note: "All three amounts are measured at the DATE OF ACQUISITION. Goodwill sits as an intangible asset in the consolidated SoFP." },
        { kind: "text", md: "Read the formula as **what we gave** minus **what we got**. \"What we gave\" is the parent's own payment (the **consideration**) **plus** the value put on the **non-controlling interest** — because together they measure the whole subsidiary. \"What we got\" is the fair value of S's net assets on the day of purchase. The difference is goodwill." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Goodwill bridge — P acquires 80% of S",
          caption: "P pays $100,000; the NCI is valued at $22,000; S's net assets at acquisition are $110,000.",
          data: {
            unit: "$",
            items: [
              { label: "Consideration transferred", value: 100000, kind: "start" },
              { label: "NCI at acquisition", value: 22000, kind: "delta" },
              { label: "Fair value of net assets acquired", value: -110000, kind: "delta" },
              { label: "Goodwill", value: 12000, kind: "total" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — goodwill on the acquisition of S", scenario: "On 1 January 20X4, P Co acquired 80% of S Co's ordinary shares, paying $100,000 in cash. At that date the fair value of the non-controlling interest was $22,000, and S's net assets were: share capital $50,000 and retained earnings $60,000. Fair values equalled book values. Calculate the goodwill arising on acquisition.", steps: [
          { label: "What we gave (consideration)", detail: "P paid $100,000 in cash for its 80% stake." },
          { label: "Add the NCI at acquisition", detail: "The other 20% is valued at $22,000. Adding it means the two figures together measure 100% of S." },
          { label: "Net assets acquired at fair value", detail: "Share capital $50,000 + retained earnings $60,000 = $110,000." },
          { label: "Apply the formula", detail: "$100,000 + $22,000 − $110,000 = $12,000." },
        ], result: "Goodwill on acquisition is $12,000. It is recognised as an intangible asset in the consolidated statement of financial position and reviewed for impairment each year (it is not amortised)." },
        { kind: "callout", tone: "warn", title: "Pre-acquisition reserves are 'bought'", md: "The retained earnings S had **at the acquisition date** are part of the net assets P paid for — they are **pre-acquisition** and disappear into the goodwill calculation. They never reach group retained earnings. Only profits S makes **after** P takes control belong to the group." },
      ],
      check: {
        q: "P pays $80,000 for 75% of S. The NCI at acquisition is valued at $25,000 and S's net assets at acquisition are $90,000. What is the goodwill on acquisition?",
        options: ["$5,000", "$15,000", "$25,000", "$(10,000) — a bargain purchase"],
        correct: 1,
        explain: "Goodwill = consideration + NCI at acquisition − net assets acquired = $80,000 + $25,000 − $90,000 = $15,000. A common wrong answer, $5,000, comes from forgetting to add the NCI ($80,000 − $90,000 is not the method when there is an NCI).",
      },
    },
    {
      id: "nci",
      heading: "The non-controlling interest (NCI)",
      blocks: [
        { kind: "text", md: "P controls S with only 80% of its shares. The other **20%** is owned by outside shareholders. Consolidation adds in **100%** of S's assets and liabilities (because the parent controls all of them), so it would overstate the group's own wealth unless we also show that a slice belongs to outsiders. That slice is the **non-controlling interest** — the part of S's net assets **not** attributable to the parent." },
        { kind: "callout", tone: "rule", title: "NCI is presented within equity", md: "In the consolidated SoFP the NCI appears as a **separate line inside equity**, below the parent's share capital and group retained earnings. It says: \"of the group's net assets, this much belongs to the outside owners of the subsidiary.\"" },
        { kind: "formula", name: "NCI at the reporting date", expr: "NCI at acquisition  +  NCI% × subsidiary's post-acquisition change in net assets", note: "The subsidiary's net assets grow as it makes profit after acquisition; the NCI owns its share of that growth." },
        { kind: "example", title: "Worked example — NCI carried forward", scenario: "Continuing the P and S example: NCI at acquisition was $22,000. S's retained earnings were $60,000 at acquisition and have risen to $75,000 by the reporting date (31 December 20X4). Share capital is unchanged at $50,000. The NCI is 20%. What is the NCI in the consolidated SoFP?", steps: [
          { label: "Post-acquisition profit of S", detail: "Retained earnings moved from $60,000 to $75,000, so S earned $15,000 since acquisition." },
          { label: "NCI's share of that growth", detail: "20% × $15,000 = $3,000." },
          { label: "Add to NCI at acquisition", detail: "$22,000 + $3,000 = $25,000." },
        ], result: "The NCI in the consolidated statement of financial position is $25,000, presented as a single line within equity." },
      ],
      check: {
        q: "S's net assets were $90,000 at acquisition and $110,000 at the reporting date. The NCI is 25% and was valued at $25,000 at acquisition. What is the NCI in the consolidated SoFP?",
        options: ["$25,000", "$27,500", "$30,000", "$5,000"],
        correct: 2,
        explain: "Post-acquisition growth in net assets = $110,000 − $90,000 = $20,000. NCI's share = 25% × $20,000 = $5,000. NCI at the reporting date = $25,000 (at acquisition) + $5,000 = $30,000.",
      },
    },
    {
      id: "consolidated-sofp",
      heading: "Building the consolidated statement of financial position",
      blocks: [
        { kind: "text", md: "Now assemble the whole thing. A simple consolidated SoFP follows five mechanical steps. Learn the order and the statement almost writes itself." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The five steps of a simple consolidation",
          data: {
            steps: [
              { label: "Add across 100%", sub: "Combine P's and S's assets and liabilities line by line" },
              { label: "Cancel the investment", sub: "Remove P's 'Investment in S' — it becomes goodwill" },
              { label: "Recognise goodwill", sub: "The premium paid over net assets acquired" },
              { label: "Show the NCI", sub: "The outside owners' slice, within equity" },
              { label: "Adjust intra-group items", sub: "Cancel balances and unrealised profit" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Add 100%, not your %", md: "The commonest error in the whole area: because the parent **controls** the subsidiary, you add **all** of S's assets and liabilities — the full 100% — even though P owns only 80%. The 20% you don't own is not stripped out of the assets; it is shown separately as the NCI within equity." },
        { kind: "text", md: "Three short **workings** carry the figures that are not just \"add across\": goodwill, the NCI, and group retained earnings. Get these three right and every line ties up." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three standard workings",
          data: {
            items: [
              { title: "Goodwill", sub: "Consideration + NCI at acquisition − net assets acquired" },
              { title: "Non-controlling interest", sub: "NCI at acquisition + NCI% × post-acquisition reserves" },
              { title: "Group retained earnings", sub: "Parent's own RE + parent% × post-acquisition reserves" },
            ],
          },
        } },
        { kind: "formula", name: "Group retained earnings", expr: "Parent's own retained earnings  +  Parent% × subsidiary's post-acquisition retained earnings", note: "Only POST-acquisition, and only the PARENT'S share — the NCI's share stays in the NCI figure." },
        { kind: "table", caption: "Individual statements of financial position at 31 December 20X4", head: ["", "P Co ($)", "S Co ($)"], rows: [
          ["Investment in S (at cost)", "100,000", "—"],
          ["Property, plant & equipment", "180,000", "90,000"],
          ["Inventory", "40,000", "25,000"],
          ["Receivables", "30,000", "15,000"],
          ["Cash", "20,000", "10,000"],
          ["Total assets", "370,000", "140,000"],
          ["Share capital", "150,000", "50,000"],
          ["Retained earnings", "150,000", "75,000"],
          ["Payables", "70,000", "15,000"],
          ["Total equity & liabilities", "370,000", "140,000"],
        ] },
        { kind: "example", title: "Worked example — the consolidated SoFP", scenario: "Using the individual statements above (P owns 80% of S; goodwill $12,000; NCI at acquisition $22,000; S's pre-acquisition retained earnings $60,000). Prepare the consolidated statement of financial position at 31 December 20X4.", steps: [
          { label: "Goodwill (W1)", detail: "$100,000 + $22,000 − $110,000 = $12,000 — shown as an asset." },
          { label: "Group retained earnings (W2)", detail: "P's own $150,000 + 80% × ($75,000 − $60,000) = $150,000 + $12,000 = $162,000." },
          { label: "NCI (W3)", detail: "$22,000 + 20% × ($75,000 − $60,000) = $22,000 + $3,000 = $25,000." },
          { label: "Add assets across 100%", detail: "PPE 180 + 90 = 270; inventory 40 + 25 = 65; receivables 30 + 15 = 45; cash 20 + 10 = 30 (all $'000). The $100,000 investment is cancelled, replaced by goodwill." },
          { label: "Share capital = parent only", detail: "$150,000. S's share capital ($50,000) was cancelled inside the goodwill working — never add the subsidiary's share capital." },
        ], result: "Total assets $422,000 = goodwill 12 + PPE 270 + inventory 65 + receivables 45 + cash 30 ($'000). Equity & liabilities $422,000 = share capital 150 + group RE 162 + NCI 25 + payables 85. Both sides balance at $422,000." },
        { kind: "table", caption: "Consolidated statement of financial position at 31 December 20X4", head: ["", "$", "Working"], rows: [
          ["Goodwill", "12,000", "Consideration + NCI − net assets"],
          ["Property, plant & equipment", "270,000", "180,000 + 90,000"],
          ["Inventory", "65,000", "40,000 + 25,000"],
          ["Receivables", "45,000", "30,000 + 15,000"],
          ["Cash", "30,000", "20,000 + 10,000"],
          ["Total assets", "422,000", ""],
          ["Share capital", "150,000", "Parent only"],
          ["Group retained earnings", "162,000", "150,000 + 80% × 15,000"],
          ["Non-controlling interest", "25,000", "22,000 + 20% × 15,000"],
          ["Payables", "85,000", "70,000 + 15,000"],
          ["Total equity & liabilities", "422,000", ""],
        ] },
      ],
      check: {
        q: "In a consolidated SoFP, whose share capital is shown?",
        options: [
          "The parent's plus the subsidiary's added together",
          "The parent's only",
          "The parent's plus the parent's share of the subsidiary's",
          "The subsidiary's only",
        ],
        correct: 1,
        explain: "Only the PARENT'S share capital appears. The subsidiary's share capital forms part of its net assets at acquisition and is cancelled within the goodwill working — it is never added to the group's share capital.",
      },
    },
    {
      id: "intra-group",
      heading: "Intra-group adjustments",
      blocks: [
        { kind: "text", md: "The group is **one** economic entity, so it cannot owe money to itself or make a profit selling to itself. Yet the individual accounts of P and S record exactly those internal dealings. Two adjustments strip them out." },
        { kind: "text", md: "**1. Intra-group balances.** If P sold goods to S on credit and S still owes P at the year end, P shows a receivable and S shows a matching payable. From the group's viewpoint this is money owed from one pocket to another — it nets to nothing. **Cancel** the intra-group receivable against the intra-group payable." },
        { kind: "example", title: "Worked example — cancelling an intra-group balance", scenario: "At the year end, P's receivables of $30,000 include $8,000 owed by S, and S's payables of $15,000 include the matching $8,000 owed to P. How is this consolidated?", steps: [
          { label: "Identify the internal balance", detail: "$8,000 is owed by S to P — a receivable in P and a payable in S." },
          { label: "Cancel both sides", detail: "Group receivables: $45,000 − $8,000 = $37,000. Group payables: $85,000 − $8,000 = $77,000." },
        ], result: "Both totals fall by $8,000 and still balance. The group cannot owe money to itself, so the matched balance vanishes on consolidation. (Net assets and profit are unaffected.)" },
        { kind: "text", md: "**2. Unrealised profit (PURP).** If P sells goods to S at a profit and S **still holds** some of them at the year end, that profit has not been earned by the group — the goods are still \"on the shelf\" inside the group. The profit is **unrealised**. Remove the **Provision for Unrealised Profit** so inventory is carried at cost to the group and the seller's profit is reduced." },
        { kind: "callout", tone: "rule", title: "PURP — adjust the SELLER", md: "Reduce **group inventory** by the unrealised profit, and reduce the **seller's** retained earnings by the same amount. If the parent sold the goods, the full PURP comes off group retained earnings. If the subsidiary sold them, split the reduction between group RE and NCI in the profit-sharing ratio." },
        { kind: "example", title: "Worked example — unrealised profit in inventory", scenario: "During the year P sold goods to S for $10,000, at a mark-up of 25% on cost. At the year end, S still holds HALF of these goods unsold. Calculate the PURP adjustment and explain the double entry.", steps: [
          { label: "Split the selling price into cost and profit", detail: "Mark-up of 25% on cost means cost = $10,000 ÷ 1.25 = $8,000, so profit = $2,000 on the whole batch." },
          { label: "Profit on the goods still held", detail: "S holds half, so the unrealised profit = ½ × $2,000 = $1,000." },
          { label: "Adjust group inventory", detail: "Reduce consolidated inventory by $1,000 (carry it at cost to the group, not at the inflated internal price)." },
          { label: "Adjust the seller's profit", detail: "P is the seller, so reduce group retained earnings by $1,000 — the profit has not been earned outside the group." },
        ], result: "PURP = $1,000. Consolidated inventory falls by $1,000 and group retained earnings fall by $1,000. Because the parent was the seller, the NCI is unaffected." },
        { kind: "callout", tone: "tip", title: "Mark-up vs margin", md: "**Mark-up** is profit as a % of **cost** (÷ 1.25 for a 25% mark-up). **Margin** is profit as a % of **selling price** (25% margin → profit = 25% of the sale). Misreading one for the other is the classic PURP trap — check which base the question uses." },
      ],
      check: {
        q: "P sold goods to S for $12,000 at a mark-up of 20% on cost. S still holds ALL of the goods at the year end. What is the unrealised profit to eliminate?",
        options: ["$2,000", "$2,400", "$1,000", "$12,000"],
        correct: 0,
        explain: "Mark-up of 20% on cost: cost = $12,000 ÷ 1.20 = $10,000, so profit = $2,000. All the goods are still held, so the whole $2,000 is unrealised. (The tempting $2,400 wrongly takes 20% of the selling price — that would be a margin, not a mark-up.)",
      },
    },
    {
      id: "associates",
      heading: "Associates — the equity method (brief)",
      blocks: [
        { kind: "text", md: "Not every investment gives control. Where the investor holds **20–50%** of the votes it usually has **significant influence** — a seat at the table, a real say — but not the power to direct. That company is an **associate**, not a subsidiary, and it is **not** consolidated line by line. Instead it uses the **equity method**." },
        { kind: "formula", name: "Investment in associate (equity method)", expr: "Cost of the investment  +  Investor% × associate's post-acquisition profits  (less any dividends received / impairment)", note: "A single 'one-line' figure in the consolidated SoFP — the group's share of the associate's net worth, not its individual assets and liabilities." },
        { kind: "text", md: "The contrast is the whole point of this section. A **subsidiary** is **controlled**, so the group absorbs **100%** of its assets and liabilities and shows an NCI. An **associate** is only **influenced**, so the group shows just **one line** — its share of the associate's value — with **no NCI** and **no line-by-line addition**." },
        { kind: "table", caption: "Subsidiary vs associate", head: ["Aspect", "Subsidiary", "Associate"], rows: [
          ["Shareholding (typical)", "More than 50%", "20% to 50%"],
          ["Relationship", "Control", "Significant influence"],
          ["Consolidation", "Full — add 100% line by line", "Equity method — one line"],
          ["NCI shown?", "Yes", "No"],
          ["Goodwill shown separately?", "Yes", "No (subsumed in the one line)"],
        ] },
        { kind: "callout", tone: "key", title: "One line, not many", md: "The equity method captures the group's **share** of an associate in a single line. Do not consolidate an associate's assets and liabilities — that treatment is reserved for a **controlled** subsidiary." },
      ],
    },
  ],
  examTraps: [
    { trap: "Adding the parent's 'Investment in S' into consolidated assets.", fix: "It is cancelled against the subsidiary's net assets at acquisition and REPLACED by goodwill — never left in as an asset." },
    { trap: "Adding only the parent's percentage of the subsidiary's assets and liabilities.", fix: "Add 100% line by line — the parent controls all of them. The outsiders' slice is shown separately as the NCI within equity." },
    { trap: "Including the subsidiary's pre-acquisition retained earnings (or its share capital) in group figures.", fix: "Pre-acquisition reserves and S's share capital are cancelled inside the goodwill working. Only POST-acquisition reserves reach the group, and only the parent's share reaches group RE." },
    { trap: "Forgetting the NCI, or leaving its share of post-acquisition profit out.", fix: "NCI = NCI at acquisition + NCI% × post-acquisition change in the subsidiary's net assets. It is a separate line within equity." },
    { trap: "On a PURP, adjusting the buyer instead of the seller.", fix: "Reduce the SELLER's retained earnings and group inventory. If the subsidiary was the seller, split the reduction with the NCI." },
    { trap: "Confusing mark-up with margin in a PURP.", fix: "Mark-up is on cost (divide the sale by 1 + rate); margin is on the selling price (multiply the sale by the rate)." },
    { trap: "Consolidating an associate line by line.", fix: "An associate is influenced, not controlled — use the one-line equity method, with no NCI." },
  ],
  keyTerms: [
    { term: "Control", def: "Power to direct the activities of another company to obtain returns from it — usually from holding more than 50% of the voting rights. Control creates a parent-subsidiary relationship." },
    { term: "Goodwill", def: "The premium a parent pays over the fair value of a subsidiary's identifiable net assets: consideration + NCI at acquisition − net assets acquired. Shown as an intangible asset and tested for impairment." },
    { term: "Non-controlling interest (NCI)", def: "The share of a subsidiary's net assets not owned by the parent, presented as a separate line within equity in the consolidated SoFP." },
    { term: "Group retained earnings", def: "The parent's own retained earnings plus the parent's share of the subsidiary's POST-acquisition retained earnings (adjusted for any unrealised profit)." },
    { term: "Unrealised profit (PURP)", def: "Profit on intra-group sales still sitting in the group's inventory at the year end — removed on consolidation because the group cannot profit from selling to itself." },
    { term: "Associate", def: "A company over which the investor has significant influence (typically a 20–50% holding) but not control — accounted for by the one-line equity method, not consolidated." },
  ],
  summary: [
    "A group is a parent plus the subsidiaries it controls; control usually means holding more than 50% of the voting rights.",
    "Consolidation shows the group as one economic entity — add the subsidiary's assets and liabilities 100% line by line and cancel the parent's investment.",
    "Goodwill = consideration + NCI at acquisition − fair value of net assets acquired, recognised as an intangible asset.",
    "NCI = NCI at acquisition + NCI's share of post-acquisition reserves; group retained earnings = parent's own RE + parent's share of post-acquisition reserves.",
    "Cancel intra-group balances and remove unrealised profit (PURP) by adjusting the seller; account for associates using the one-line equity method.",
  ],
}
