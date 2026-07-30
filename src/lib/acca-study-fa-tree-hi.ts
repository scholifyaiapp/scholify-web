import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Areas H and I — preparing basic consolidated financial statements, and
 * interpretation.
 * Chapters 28–31 of the FA reading tree.
 *
 * Area H is one of the two areas the real exam's 15-mark multi-task questions come
 * from, so chapters 28 and 29 are built around the standard workings a marker
 * expects — the net assets table, the goodwill calculation, the non-controlling
 * interest and consolidated retained earnings — and each ends with the check that
 * catches the error. Area I then answers the question the whole paper has been
 * building toward: what do these statements actually tell a user?
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 28 · H1(a)–(d) ────────────────────────────────────── */

export const FA_TREE_28: StudyChapter = {
  id: "FA-28",
  number: 28,
  paper: "FA",
  area: "H",
  title: "The consolidated statement of financial position",
  minutes: 20,
  syllabusRefs: ["H1(a)", "H1(b)", "H1(c)", "H1(d)"],
  intro:
    "A group is not a legal entity, but it is an economic one. Consolidation reports the parent and its subsidiaries as though they were a single business — which means every intra-group figure has to disappear.",
  outcomes: [
    "Define parent, subsidiary, control, consolidated financial statements, non-controlling interest and trade investment",
    "Identify subsidiaries within a group structure",
    "Calculate goodwill, including where non-controlling interest is measured at fair value",
    "Prepare a consolidated statement of financial position, including fair value adjustments and the elimination of intra-group balances and unrealised profit",
    "Deal with a subsidiary acquired part way through the financial year",
  ],
  sections: [
    {
      id: "definitions",
      heading: "The group, and the vocabulary that defines it",
      blocks: [
        {
          kind: "table",
          caption: "The terms, and what each one turns on",
          head: ["Term", "Meaning"],
          rows: [
            ["**Control**", "The power to govern the financial and operating policies of another entity so as to obtain benefits. Usually more than 50% of the voting shares, but control can exist otherwise — for example through an agreement giving power over the board."],
            ["**Parent**", "The entity that controls one or more other entities."],
            ["**Subsidiary**", "An entity controlled by another. Its results are **consolidated in full**, whatever the size of the parent's holding."],
            ["**Consolidated (group) financial statements**", "Statements presenting the parent and its subsidiaries as a single economic entity."],
            ["**Non-controlling interest (NCI)**", "The equity in a subsidiary not attributable, directly or indirectly, to the parent. Presented **within equity**, separately from the parent's shareholders."],
            ["**Trade (simple) investment**", "A shareholding carrying neither control nor significant influence. **Not consolidated** — it stays as an investment at cost or fair value, with dividends received as income."],
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "How a shareholding is treated",
            caption: "The percentage is a guide; control and influence are the tests.",
            data: {
              items: [
                { title: "Over 50% — control", sub: "Subsidiary: consolidate in full, with NCI" },
                { title: "20% to 50% — significant influence", sub: "Associate: equity method (chapter 29)" },
                { title: "Under 20% — neither", sub: "Trade investment: cost or fair value" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Consolidate 100%, then show what the group does not own",
          md: "A parent owning 80% of a subsidiary consolidates **100%** of its assets and liabilities, line by line — because it **controls** all of them. The 20% it does not own is then shown as the **non-controlling interest within equity**. Consolidating only 80% of each asset is the commonest structural error, and it makes the statement fail to balance in a way that is hard to unpick.",
        },
      ],
      check: {
        q: "A parent owns 60% of a subsidiary whose net assets are $500,000. How much of those net assets is consolidated, and how is the rest reported?",
        options: [
          "$300,000 is consolidated; the remaining $200,000 is ignored",
          "$500,000 is consolidated; $200,000 is shown as non-controlling interest within equity",
          "$300,000 is consolidated; $200,000 is shown as a liability",
          "$500,000 is consolidated; $200,000 is shown as a non-current liability",
        ],
        correct: 1,
        explain:
          "ALL $500,000 is consolidated, because the parent CONTROLS all of those assets and liabilities. The 40% the group does not own — $200,000 — is presented as non-controlling interest WITHIN EQUITY, not as a liability. NCI is an ownership interest, and the group owes it nothing.",
      },
    },
    {
      id: "goodwill-and-workings",
      heading: "The standard workings",
      blocks: [
        {
          kind: "formula",
          name: "Goodwill at acquisition",
          expr: "Fair value of consideration transferred + Fair value of the non-controlling interest at acquisition − Fair value of the net assets at acquisition = Goodwill",
          note: "Where NCI is instead measured at its PROPORTIONATE SHARE of net assets, the calculation reduces to: consideration − the parent's share of net assets at acquisition. Read which method the question states.",
        },
        {
          kind: "table",
          caption: "Working 1 — the subsidiary's net assets table",
          head: ["", "At acquisition", "At the reporting date"],
          rows: [
            ["Share capital", "X", "X"],
            ["Share premium", "X", "X"],
            ["Retained earnings", "X", "X"],
            ["Fair value adjustment on property, plant and equipment", "X", "X"],
            ["Less unrealised profit, where the SUBSIDIARY was the seller", "—", "(X)"],
            ["**Net assets**", "**X**", "**X**"],
          ],
        },
        {
          kind: "formula",
          name: "The other two workings",
          expr:
            "NCI at the reporting date = NCI at acquisition + NCI% × post-acquisition change in net assets   ·   Consolidated retained earnings = Parent's retained earnings + Parent% × post-acquisition change in the subsidiary's net assets − unrealised profit where the PARENT was the seller",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Post-acquisition is the word that does all the work",
          md: "The group only takes credit for what the subsidiary earned **after** it was acquired. Pre-acquisition retained earnings were paid for — they are inside the goodwill calculation, not inside group reserves. So every consolidation working turns on the change in the subsidiary's net assets **between acquisition and the reporting date**, which is exactly what the two-column net assets table is for.",
        },
        {
          kind: "list",
          style: "number",
          title: "The adjustments, and where each one lands",
          items: [
            "**Fair value adjustment on PPE** — add it to net assets in **both** columns (FA excludes the extra depreciation on it), and increase group PPE by the same amount.",
            "**Intra-group receivable and payable** — eliminate in **full** from both group receivables and group payables. It is the same internal balance seen twice.",
            "**Unrealised profit on intra-group inventory** — remove it from group inventory. Deduct it from **consolidated retained earnings** if the **parent** sold the goods; deduct it in the subsidiary's net assets column (so it is shared with NCI) if the **subsidiary** sold them.",
            "**The parent's investment in the subsidiary** — remove it entirely; it is replaced by the subsidiary's net assets and by goodwill.",
            "**Mid-year acquisition** — the net assets at acquisition are those at the acquisition **date**, so retained earnings are time-apportioned to that date unless the question says profits did not accrue evenly.",
          ],
        },
        {
          kind: "example",
          title: "A full consolidated statement of financial position",
          scenario:
            "Pentland Co acquired 75% of Silverdale Co on 1 January 20X6 for $520,000 in cash. At that date Silverdale's share capital was $200,000 and its retained earnings were $260,000, and its land was worth $40,000 more than its carrying amount. NCI is measured at its proportionate share of net assets. At 31 December 20X7 Silverdale's retained earnings were $340,000 and Pentland's were $780,000. During 20X7 Pentland sold goods to Silverdale for $60,000 at a mark-up of one third on cost, and half of those goods remained in Silverdale's inventory at the year end. Silverdale owed Pentland $25,000 on the intra-group current account at 31 December 20X7.",
          steps: [
            { label: "Working 1 — net assets at acquisition", detail: "Share capital $200,000 + retained earnings $260,000 + fair value adjustment $40,000 = $500,000." },
            { label: "Working 1 — net assets at the reporting date", detail: "Share capital $200,000 + retained earnings $340,000 + fair value adjustment $40,000 = $580,000. The post-acquisition increase is $80,000." },
            { label: "Working 2 — goodwill", detail: "NCI is at its proportionate share, so goodwill = consideration $520,000 − 75% × $500,000 = $520,000 − $375,000 = $145,000." },
            { label: "Working 3 — the unrealised profit", detail: "A mark-up of one third on cost puts cost at 3 and sales at 4, so on sales of $60,000 the cost was $45,000 and the profit $15,000. Half the goods remain in inventory, so unrealised profit = $7,500. PENTLAND was the seller, so it is deducted from consolidated retained earnings and from group inventory." },
            { label: "Working 4 — non-controlling interest", detail: "NCI at acquisition 25% × $500,000 = $125,000, plus 25% × the $80,000 post-acquisition increase = $20,000. NCI = $145,000." },
            { label: "Working 5 — consolidated retained earnings", detail: "Pentland $780,000 + 75% × $80,000 = $60,000, less unrealised profit $7,500 = $832,500." },
            { label: "The eliminations", detail: "Remove the $520,000 investment; eliminate the $25,000 intra-group balance from both group receivables and group payables; reduce group inventory by $7,500; add the $40,000 fair value adjustment to group land." },
            { label: "Assemble group equity", detail: "Group equity is the PARENT's share capital and premium, plus consolidated retained earnings $832,500, plus NCI $145,000. Silverdale's $200,000 share capital never appears — it was cancelled against the investment in the goodwill working." },
          ],
          result:
            "Goodwill $145,000, non-controlling interest $145,000 and consolidated retained earnings $832,500. Three checks matter. Only the **parent's** share capital appears in group equity. The unrealised profit was deducted from **consolidated retained earnings** because the **parent** was the seller — had the subsidiary sold the goods, it would have gone in the net assets column and NCI would have borne 25% of it. And the intra-group balance is eliminated from **both** sides, so total assets and total liabilities each fall by $25,000 and the statement still balances.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Margin or mark-up, again",
          md: "The unrealised profit calculation is chapter 27's margin-and-mark-up problem inside a consolidation. **Mark-up of one third on cost**: revenue is 4/3 of cost, so profit is $60,000 × 1/4 = $15,000. **Margin of one third on sales**: profit is $60,000 × 1/3 = $20,000. Then take only the fraction **still in inventory**. Two readings, two answers, and only one of them is what the question said.",
        },
      ],
      check: {
        q: "A parent sold goods to its 80% subsidiary for $48,000 at a margin of 25%. Three quarters remain in the subsidiary's inventory. What unrealised profit is eliminated, and from where?",
        options: [
          "$12,000 from group inventory and consolidated retained earnings",
          "$9,000 from group inventory and consolidated retained earnings",
          "$9,000 from group inventory and from the subsidiary's net assets",
          "$7,200 from group inventory and consolidated retained earnings",
        ],
        correct: 1,
        explain:
          "Profit on the whole sale = $48,000 × 25% = $12,000 (a MARGIN, so the base is sales). Three quarters remain, so unrealised profit is $9,000. The PARENT was the seller, so the whole $9,000 is deducted from group inventory and from consolidated retained earnings — the NCI bears none of it. Had the subsidiary been the seller, it would go in the net assets column and NCI would bear 20%.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Consolidating only the parent's share of the subsidiary's assets and liabilities.",
      fix: "Consolidate 100% — the parent CONTROLS all of them — and show the rest as non-controlling interest within equity.",
    },
    {
      trap: "Presenting the non-controlling interest as a liability.",
      fix: "It is an ownership interest and sits within equity, separately from the parent's shareholders.",
    },
    {
      trap: "Including the subsidiary's share capital in group equity.",
      fix: "It is cancelled against the parent's investment in the goodwill calculation. Only the PARENT's share capital appears.",
    },
    {
      trap: "Taking credit for the subsidiary's pre-acquisition retained earnings.",
      fix: "Only POST-acquisition movements reach group reserves. Pre-acquisition earnings were paid for and sit inside goodwill.",
    },
    {
      trap: "Deducting unrealised profit from the wrong place.",
      fix: "Parent as seller: deduct from consolidated retained earnings. Subsidiary as seller: deduct in the net assets column so NCI bears its share.",
    },
    {
      trap: "Reading a mark-up as a margin when computing unrealised profit.",
      fix: "Mark-up's base is cost; margin's base is sales. Then apply only the proportion still held in inventory.",
    },
    {
      trap: "Eliminating an intra-group balance from one side only.",
      fix: "Remove it from group receivables AND group payables. Removing one side unbalances the statement.",
    },
  ],
  keyTerms: [
    { term: "Control", def: "The power to govern another entity's financial and operating policies so as to obtain benefits; usually more than 50% of the voting shares." },
    { term: "Subsidiary", def: "An entity controlled by a parent, whose assets and liabilities are consolidated in full." },
    { term: "Non-controlling interest", def: "The equity in a subsidiary not attributable to the parent, presented within group equity." },
    { term: "Goodwill at acquisition", def: "Consideration transferred plus the fair value of the NCI, less the fair value of the net assets acquired." },
    { term: "Trade (simple) investment", def: "A shareholding carrying neither control nor significant influence, not consolidated." },
    { term: "Unrealised profit", def: "Profit on intra-group sales still held in group inventory at the reporting date, eliminated on consolidation." },
    { term: "Fair value adjustment", def: "The uplift of a subsidiary's asset to fair value at acquisition, carried in both columns of the net assets table." },
  ],
  summary: [
    "Control, usually more than half the votes, makes an entity a subsidiary; 20–50% suggests an associate and below that a trade investment.",
    "A subsidiary's assets and liabilities are consolidated in full, with the interest not owned shown as NCI within equity.",
    "Goodwill is consideration plus the fair value of NCI less the fair value of net assets acquired.",
    "The two-column net assets table drives goodwill, NCI and consolidated retained earnings.",
    "Only post-acquisition movements in the subsidiary's net assets reach group reserves.",
    "Intra-group balances are eliminated in full from both sides, and unrealised profit is removed from group inventory.",
    "The seller determines where unrealised profit is deducted, and therefore whether NCI bears part of it.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is 100% of a subsidiary consolidated when the parent owns only 70%?", a: "Because the parent controls all of the subsidiary's assets and liabilities. The 30% not owned is presented as non-controlling interest within equity." },
    { q: "Give the full goodwill calculation.", a: "Fair value of consideration transferred plus fair value of the NCI at acquisition, less the fair value of the net assets at acquisition." },
    { q: "Where do a subsidiary's pre-acquisition retained earnings end up?", a: "Inside the goodwill calculation, as part of the net assets acquired. They never reach consolidated retained earnings." },
    { q: "A subsidiary sold goods to its parent at a profit, some still in inventory. Where is the unrealised profit deducted?", a: "In the subsidiary's net assets column at the reporting date, so that NCI bears its share of it, and from group inventory." },
    { q: "What happens to the parent's investment in the subsidiary on consolidation?", a: "It is eliminated, replaced by the subsidiary's own assets and liabilities plus the goodwill arising on acquisition." },
  ],
  furtherStudy: [
    "Chapter 29 consolidates the statement of profit or loss and adds associates.",
    "FR develops groups further: goodwill impairment, deferred and contingent consideration, and disposals.",
  ],
}

/* ── Chapter 29 · H1(e), H2 ────────────────────────────────────── */

export const FA_TREE_29: StudyChapter = {
  id: "FA-29",
  number: 29,
  paper: "FA",
  area: "H",
  title: "The consolidated statement of profit or loss, and associates",
  minutes: 18,
  syllabusRefs: ["H1(e)", "H2(a)", "H2(b)", "H2(c)"],
  intro:
    "Consolidating performance is easier than consolidating position — add across, cancel the internal trade, then split the result between the two sets of owners.",
  outcomes: [
    "Set out what a group performance statement contains, and prepare one or an extract from it",
    "Eliminate intra-group trading and unrealised profit from the consolidated statement of profit or loss",
    "Deal with a subsidiary acquired part way through the financial year",
    "Define and identify an associate and significant influence",
    "Say what marks out a parent-associate relationship, and how the equity method reflects it",
  ],
  sections: [
    {
      id: "consolidating-performance",
      heading: "Preparing the consolidated statement of profit or loss",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The method",
          items: [
            "**Add across 100%** of the parent's and the subsidiary's revenue, cost of sales and each expense — line by line, because the group controls all of it.",
            "**Time-apportion** the subsidiary's results where it was acquired during the year, including only the months since acquisition.",
            "**Eliminate intra-group trading**: deduct the intra-group sales value from **both** group revenue and group cost of sales. Group profit is unchanged; group revenue is no longer inflated.",
            "**Add the unrealised profit** on inventory still held to group **cost of sales**, which reduces group profit.",
            "**Split the profit for the year** between the owners of the parent and the non-controlling interest.",
          ],
        },
        {
          kind: "formula",
          name: "Splitting the profit",
          expr: "NCI share of profit = NCI% × (Subsidiary's profit for the period since acquisition − unrealised profit where the SUBSIDIARY was the seller)",
          note: "The balance is attributable to the owners of the parent. Both figures are presented beneath profit for the year, and they must add back to it.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why eliminating intra-group sales does not change group profit",
          md: "The same amount is removed from revenue **and** from cost of sales, so the two cancel. What changes is the honesty of the presentation: without the elimination, a group could double its reported revenue by selling the same goods between two of its own companies. Only the **unrealised profit** on goods still held affects group profit — because that profit has not been earned from anyone outside the group.",
        },
        {
          kind: "example",
          title: "A consolidated statement of profit or loss with a mid-year acquisition",
          scenario:
            "Ravenna Co acquired 80% of Trentino Co on 1 April 20X8. For the year ended 31 December 20X8, Ravenna's revenue was $1,400,000 and cost of sales $860,000; Trentino's revenue was $480,000 and cost of sales $312,000, both accruing evenly through the year. Trentino's other expenses for the full year were $84,000, also even. During the period since acquisition Ravenna sold goods to Trentino for $70,000, on which it made a profit of $14,000; one half of those goods remained in Trentino's inventory at 31 December. Ravenna's other expenses were $310,000.",
          steps: [
            { label: "Time-apportion the subsidiary", detail: "Nine months from 1 April: revenue $480,000 × 9/12 = $360,000; cost of sales $312,000 × 9/12 = $234,000; other expenses $84,000 × 9/12 = $63,000." },
            { label: "Add across", detail: "Revenue $1,400,000 + $360,000 = $1,760,000. Cost of sales $860,000 + $234,000 = $1,094,000. Other expenses $310,000 + $63,000 = $373,000." },
            { label: "Eliminate intra-group trading", detail: "Deduct $70,000 from revenue and $70,000 from cost of sales: revenue $1,690,000, cost of sales $1,024,000. Group profit is unaffected by this step." },
            { label: "Adjust for unrealised profit", detail: "Half of the $14,000 profit is still in inventory, so $7,000 is added to cost of sales: $1,031,000. This DOES reduce group profit." },
            { label: "Compute group profit", detail: "Revenue $1,690,000 − cost of sales $1,031,000 − other expenses $373,000 = profit for the year $286,000." },
            { label: "Split it", detail: "Trentino's post-acquisition profit = $360,000 − $234,000 − $63,000 = $63,000. Ravenna was the seller of the intra-group goods, so no unrealised profit is deducted here. NCI share = 20% × $63,000 = $12,600. Owners of the parent = $286,000 − $12,600 = $273,400." },
          ],
          result:
            "Group profit for the year of $286,000, split $273,400 to the owners of the parent and $12,600 to the non-controlling interest. Three checks matter: the two attributions must add back to profit for the year; the intra-group sale was removed from revenue and cost of sales **equally**, so it changed neither; and only the **$7,000** of unrealised profit reduced group profit. Because the PARENT was the seller, the NCI share was computed on the subsidiary's own unadjusted profit.",
        },
      ],
      check: {
        q: "A parent acquired 70% of a subsidiary on 1 July in a year ending 31 December. The subsidiary's profit for the full year was $240,000, accruing evenly. What is the NCI share of profit in the consolidated statement of profit or loss?",
        options: ["$72,000", "$168,000", "$36,000", "$84,000"],
        correct: 2,
        explain:
          "Only the POST-ACQUISITION six months are consolidated: $240,000 × 6/12 = $120,000. The NCI share is 30% × $120,000 = $36,000. The $72,000 answer takes 30% of the whole year and ignores the acquisition date — which is exactly what a mid-year acquisition question is set to test.",
      },
    },
    {
      id: "associates",
      heading: "Associates and the equity method",
      blocks: [
        {
          kind: "definition",
          term: "Associate and significant influence",
          md: "An **associate** is an entity over which the investor has **significant influence** — the power to participate in financial and operating policy decisions, but **not** to control them. A holding of **20% to 50%** of the voting power is presumed to give significant influence unless it can be demonstrated otherwise.",
        },
        {
          kind: "list",
          title: "Indicators of significant influence beyond the percentage",
          items: [
            "**Representation on the board** of directors or equivalent governing body.",
            "**Participation in policy-making**, including decisions about dividends and other distributions.",
            "**Material transactions** between the investor and the investee.",
            "**Interchange of managerial personnel**.",
            "**Provision of essential technical information**.",
          ],
        },
        {
          kind: "definition",
          term: "The equity method, in principle",
          md: "The investment starts at **cost** and is then increased by the group's **share of the associate's post-acquisition profits** (and reduced by its share of losses and by dividends received). In the statement of profit or loss, the group presents a **single line** — its share of the associate's profit — rather than consolidating any of the associate's revenue or expenses.",
        },
        {
          kind: "table",
          caption: "Subsidiary against associate — the treatment that gets tested",
          head: ["", "Subsidiary", "Associate"],
          rows: [
            ["Relationship", "**Control**", "**Significant influence**"],
            ["Usual holding", "More than 50%", "20% to 50%"],
            ["Assets and liabilities", "Consolidated **line by line, 100%**", "**Not** consolidated — one investment line"],
            ["Revenue and expenses", "Added across in full", "**Not** added — one line for the share of profit"],
            ["Non-controlling interest", "Recognised", "**None**"],
            ["Statement of financial position", "Net assets consolidated, plus goodwill", "Investment at cost plus share of post-acquisition reserves"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The error the comparison exists to prevent",
          md: "An associate's revenue **never** appears in group revenue. Adding 30% of an associate's sales to group revenue is the classic mistake, and it misstates every margin and every turnover ratio computed from the group statements. Significant influence is not control, and the accounting reflects that precisely.",
        },
        {
          kind: "example",
          title: "Accounting for an associate",
          scenario:
            "Halstead Co owns 30% of Ashby Co, acquired two years ago for $260,000, and exercises significant influence through two board seats. Since acquisition Ashby's retained earnings have risen by $180,000, of which $120,000 arose in the current year. Ashby's revenue for the current year was $900,000 and its profit for the year was $120,000. Halstead received a dividend of $9,000 from Ashby during the year.",
          steps: [
            { label: "The statement of profit or loss", detail: "One line: share of profit of associate = 30% × $120,000 = $36,000. NONE of Ashby's $900,000 revenue enters group revenue." },
            { label: "The dividend received", detail: "It is NOT separate income. Under the equity method the group has already taken its share of the profit, so the dividend reduces the carrying amount of the investment." },
            { label: "The investment's carrying amount", detail: "Cost $260,000 + 30% × post-acquisition retained earnings growth $180,000 = $260,000 + $54,000 = $314,000, shown as a single non-current asset." },
            { label: "Check the dividend treatment", detail: "The $9,000 dividend is already reflected in Ashby's retained earnings movement, so no further adjustment is needed — counting it as income as well would double-count the same profit." },
            { label: "Confirm what is absent", detail: "No consolidation of Ashby's assets, liabilities, revenue or costs, and no non-controlling interest, because Halstead does not control Ashby." },
          ],
          result:
            "A single $36,000 line in profit or loss and a single $314,000 investment in the statement of financial position. The check that matters: recognising the dividend as income **on top of** the share of profit counts the same earnings twice — the whole point of the equity method is that the group takes its share of profit when the associate earns it, not when it is distributed.",
        },
      ],
      check: {
        q: "A group owns 40% of an associate whose revenue was $600,000 and profit for the year $90,000. What appears in the consolidated statement of profit or loss?",
        options: [
          "Revenue of $240,000 and profit of $36,000",
          "A single line: share of profit of associate $36,000",
          "Revenue of $600,000 and a non-controlling interest of $54,000",
          "Nothing until a dividend is received",
        ],
        correct: 1,
        explain:
          "A single line — the group's share of profit, 40% × $90,000 = $36,000. NONE of the associate's revenue is consolidated, because significant influence is not control. There is no non-controlling interest in an associate, and the equity method recognises the share of profit as it is earned, not when a dividend arrives.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Consolidating a full year of a subsidiary acquired mid-year.",
      fix: "Time-apportion from the acquisition date, and compute the NCI share on the post-acquisition profit only.",
    },
    {
      trap: "Eliminating intra-group sales from revenue only.",
      fix: "Deduct the same amount from cost of sales too. Group profit is then unchanged by the elimination.",
    },
    {
      trap: "Adding an associate's revenue to group revenue.",
      fix: "An associate is never consolidated. Only the group's share of its profit appears, on one line.",
    },
    {
      trap: "Recognising a dividend from an associate as income alongside the share of profit.",
      fix: "It reduces the carrying amount of the investment. Recognising both double-counts the same earnings.",
    },
    {
      trap: "Recognising a non-controlling interest in an associate.",
      fix: "There is none. NCI arises only where a subsidiary is consolidated in full.",
    },
    {
      trap: "Computing the NCI share of profit on the parent's unrealised profit.",
      fix: "Deduct unrealised profit before the NCI split only where the SUBSIDIARY was the seller.",
    },
  ],
  keyTerms: [
    { term: "Associate", def: "An entity over which the investor has significant influence but not control, presumed at a holding of 20% to 50%." },
    { term: "Significant influence", def: "The power to participate in financial and operating policy decisions without controlling them." },
    { term: "Equity method", def: "Carrying an investment at cost plus the share of post-acquisition reserves, with a single line for the share of profit." },
    { term: "Share of profit of associate", def: "The single consolidated statement of profit or loss line representing the group's percentage of the associate's profit for the period." },
    { term: "Time apportionment", def: "Including only the months since acquisition when consolidating a subsidiary acquired during the year." },
  ],
  summary: [
    "Consolidate the subsidiary's revenue and expenses in full, time-apportioned from the acquisition date.",
    "Eliminate intra-group sales from both revenue and cost of sales; group profit is unaffected.",
    "Add unrealised profit on inventory still held to cost of sales, which does reduce group profit.",
    "Split profit for the year between the owners of the parent and the non-controlling interest.",
    "An associate carries significant influence, not control, presumed at 20% to 50%.",
    "The equity method shows one profit line and one investment line, and never consolidates the associate's revenue.",
    "A dividend from an associate reduces the investment rather than being recognised as income.",
  ],
  knowledgeDiagnostic: [
    { q: "How is a subsidiary acquired on 1 October treated in a year ending 31 December?", a: "Only three months of its results are consolidated, and the NCI share is computed on that post-acquisition profit." },
    { q: "Why does eliminating intra-group sales leave group profit unchanged?", a: "The same amount is removed from revenue and from cost of sales, so they cancel. Only unrealised profit on unsold inventory changes group profit." },
    { q: "What appears in group statements for a 35% associate?", a: "One line in profit or loss for the share of its profit, and one non-current asset at cost plus the share of post-acquisition reserves." },
    { q: "How is a dividend received from an associate treated?", a: "As a reduction of the investment's carrying amount, not as income — the share of profit was already recognised when earned." },
    { q: "When is unrealised profit deducted before splitting profit with the NCI?", a: "Only when the subsidiary was the seller, so that the NCI bears its share of the elimination." },
  ],
  furtherStudy: [
    "Chapter 28 prepares the group statement of financial position these figures belong with.",
    "FR develops the equity method, associate impairment and joint arrangements.",
  ],
}

/* ── Chapter 30 · I1, I2 ───────────────────────────────────────── */

export const FA_TREE_30: StudyChapter = {
  id: "FA-30",
  number: 30,
  paper: "FA",
  area: "I",
  title: "Ratios: profitability, liquidity, efficiency and position",
  minutes: 19,
  syllabusRefs: ["I1(a)", "I1(b)", "I2(a)", "I2(b)"],
  intro:
    "A ratio is two numbers and a question. Compute it accurately, state which question it answers, and you have the mark — which is why knowing the denominator matters more than remembering the name.",
  outcomes: [
    "Say what businesses actually use financial analysis for",
    "Explain the purpose of interpreting ratios",
    "Calculate key ratios of profitability, liquidity, efficiency and financial position",
    "Explain the interrelationships between ratios",
    "Select the appropriate ratio for a given user's question",
  ],
  sections: [
    {
      id: "profitability",
      heading: "Profitability",
      blocks: [
        {
          kind: "formula",
          name: "The profitability ratios",
          expr:
            "Gross margin = Gross profit ÷ Revenue × 100   ·   Operating margin = Operating profit ÷ Revenue × 100   ·   ROCE = Operating profit ÷ Capital employed × 100   ·   Asset turnover = Revenue ÷ Capital employed",
          note: "Capital employed = total equity + non-current liabilities, or equivalently total assets less current liabilities.",
        },
        {
          kind: "table",
          caption: "What each one is telling you",
          head: ["Ratio", "The question it answers", "What moves it"],
          rows: [
            ["**Gross margin**", "How profitable is the trading itself?", "Selling prices, purchase costs, sales mix, inventory losses"],
            ["**Operating margin**", "How profitable is the business after running costs?", "Everything in gross margin, plus overhead control"],
            ["**ROCE**", "How well is the long-term capital being used?", "Both margin and asset turnover"],
            ["**Asset turnover**", "How much revenue does each dollar of capital generate?", "Utilisation of assets, revenue growth, capital expenditure"],
          ],
        },
        {
          kind: "formula",
          name: "The relationship that explains ROCE",
          expr: "ROCE = Operating margin × Asset turnover",
          note: "Two routes to the same return: earn more on each sale, or make more sales from the same capital. This decomposition is the most examinable interrelationship in the area.",
        },
        {
          kind: "example",
          title: "Decomposing a change in ROCE",
          scenario:
            "Bramfield Co reports revenue of $960,000 (last year $800,000), operating profit of $115,200 (last year $104,000) and capital employed of $640,000 (last year $520,000).",
          steps: [
            { label: "This year's ratios", detail: "Operating margin = 115,200 ÷ 960,000 = 12.0%. Asset turnover = 960,000 ÷ 640,000 = 1.5 times. ROCE = 115,200 ÷ 640,000 = 18.0%." },
            { label: "Last year's ratios", detail: "Operating margin = 104,000 ÷ 800,000 = 13.0%. Asset turnover = 800,000 ÷ 520,000 = 1.538 times. ROCE = 104,000 ÷ 520,000 = 20.0%." },
            { label: "Confirm the decomposition", detail: "This year: 12.0% × 1.5 = 18.0%. Last year: 13.0% × 1.538 = 20.0%. Both reconcile." },
            { label: "Explain the fall", detail: "ROCE fell by two percentage points even though revenue grew 20% and operating profit grew 10.8%. Both drivers weakened: margin fell by one point, and asset turnover fell because capital employed grew 23% while revenue grew 20%." },
            { label: "Draw the conclusion a user needs", detail: "The business has invested in capacity ahead of the revenue to fill it, and has taken a slightly lower margin — plausibly to win the extra volume. Whether that is a problem depends on whether the new capital is expected to generate more revenue in future periods." },
          ],
          result:
            "ROCE fell from 20.0% to 18.0%, and the decomposition attributes it to a one-point margin fall and slower asset turnover. The check that matters: **margin × turnover must reproduce ROCE**. If it does not, the same definition of capital employed was not used in both ratios — which is the most common inconsistency in this topic.",
        },
      ],
      check: {
        q: "A company has revenue of $500,000, operating profit of $60,000, total assets of $450,000 and current liabilities of $150,000. What is ROCE?",
        options: ["13.3%", "20.0%", "12.0%", "40.0%"],
        correct: 1,
        explain:
          "Capital employed = total assets $450,000 − current liabilities $150,000 = $300,000. ROCE = $60,000 ÷ $300,000 = 20.0%. Using total assets as the denominator gives 13.3% — the standard error. Check with the decomposition: margin 12% × turnover ($500,000 ÷ $300,000 = 1.667) = 20%.",
      },
    },
    {
      id: "liquidity-efficiency",
      heading: "Liquidity and efficiency",
      blocks: [
        {
          kind: "formula",
          name: "Liquidity",
          expr: "Current ratio = Current assets ÷ Current liabilities   ·   Quick (acid test) ratio = (Current assets − Inventory) ÷ Current liabilities",
          note: "Both are expressed as a multiple, e.g. 1.6:1. The quick ratio strips out inventory because it is the current asset furthest from cash.",
        },
        {
          kind: "formula",
          name: "Efficiency — the working capital cycle",
          expr:
            "Inventory days = Inventory ÷ Cost of sales × 365   ·   Receivables days = Trade receivables ÷ Credit revenue × 365   ·   Payables days = Trade payables ÷ Credit purchases × 365",
          note: "Note the denominators: inventory and payables against COST or PURCHASES, receivables against REVENUE. Using revenue for inventory days is the single commonest error in the area.",
        },
        {
          kind: "formula",
          name: "The working capital (cash operating) cycle",
          expr: "Inventory days + Receivables days − Payables days = Working capital cycle in days",
          note: "The length of time between paying for goods and collecting the cash from selling them. A longer cycle needs more funding.",
        },
        {
          kind: "example",
          title: "Computing and reading a working capital cycle",
          scenario:
            "Ashcombe Co has revenue of $1,460,000, all on credit, and cost of sales of $1,022,000. Credit purchases were $986,000. Inventory is $112,000, trade receivables $240,000, trade payables $135,000, cash $18,000, and other current liabilities $47,000.",
          steps: [
            { label: "Inventory days", detail: "112,000 ÷ 1,022,000 × 365 = 40.0 days. The denominator is COST OF SALES, because inventory is carried at cost." },
            { label: "Receivables days", detail: "240,000 ÷ 1,460,000 × 365 = 60.0 days. The denominator is credit REVENUE, because that is what generated the receivable." },
            { label: "Payables days", detail: "135,000 ÷ 986,000 × 365 = 50.0 days. The denominator is credit PURCHASES." },
            { label: "The cycle", detail: "40 + 60 − 50 = 50 days. The business funds fifty days of trading between paying suppliers and collecting from customers." },
            { label: "Liquidity", detail: "Current assets = 112,000 + 240,000 + 18,000 = $370,000. Current liabilities = 135,000 + 47,000 = $182,000. Current ratio = 2.03:1; quick ratio = (370,000 − 112,000) ÷ 182,000 = 1.42:1." },
            { label: "Read the two together", detail: "Liquidity looks comfortable, but 60 days to collect against 50 days to pay means the business is financing its customers. Cutting receivables days to 45 would release roughly 240,000 × 15/60 = $60,000 of cash." },
          ],
          result:
            "A 50-day working capital cycle, a current ratio of 2.03:1 and a quick ratio of 1.42:1. The check that matters is the denominators: **cost of sales for inventory, revenue for receivables, purchases for payables**. Using revenue throughout would give inventory days of 28 and payables days of 34, and a cycle of 54 days — three wrong figures from one wrong habit.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A high current ratio is not automatically good",
          md: "A current ratio of 4:1 may mean excellent liquidity — or slow-moving inventory, uncollected receivables and cash sitting idle. Liquidity ratios have to be read alongside the **efficiency** ratios that explain what the current assets actually consist of. That pairing is exactly what an interpretation question is asking for.",
        },
      ],
      check: {
        q: "Inventory is $84,000, cost of sales $612,000 and revenue $850,000. What are inventory holding days?",
        options: ["36.1 days", "50.1 days", "26.3 days", "73.9 days"],
        correct: 1,
        explain:
          "Inventory days = 84,000 ÷ 612,000 × 365 = 50.1 days. The denominator is COST OF SALES, because inventory is carried at cost and must be compared with a cost-based flow. Using revenue gives 36.1 days — the distractor — and understates how long inventory is actually held.",
      },
    },
    {
      id: "position",
      heading: "Financial position",
      blocks: [
        {
          kind: "formula",
          name: "Gearing and interest cover",
          expr:
            "Gearing = Debt ÷ Equity × 100, or Debt ÷ (Debt + Equity) × 100   ·   Interest cover = Operating profit ÷ Finance costs",
          note: "Both gearing formulae are acceptable — state which you used, because they give very different numbers. Debt means interest-bearing borrowings, including redeemable preference shares.",
        },
        {
          kind: "table",
          caption: "What high gearing means for each user",
          head: ["User", "Concern"],
          rows: [
            ["**Lender**", "Higher gearing means less equity cushion and more risk; the loan may cost more or be refused"],
            ["**Shareholder**", "Gearing magnifies returns in both directions — higher profits when trading is good, faster losses when it is not"],
            ["**Supplier**", "A heavily geared customer has committed cash to interest and repayments before paying suppliers"],
            ["**Management**", "Interest and repayments are obligations regardless of profit, so gearing limits flexibility"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Interest cover is the one lenders read first",
          md: "Gearing measures how much debt there is; **interest cover** measures whether the business can actually service it. Cover of 8 times is comfortable; cover of 1.5 times means a modest fall in profit puts the interest payment at risk. A company can have moderate gearing and dangerous interest cover if its margins are thin, which is why the two are quoted together.",
        },
        {
          kind: "example",
          title: "Gearing, cover, and the interrelationship",
          scenario:
            "Ilkeston Co has equity of $760,000, 7% loan notes of $400,000 and redeemable preference shares of $100,000 paying 5%. Operating profit is $148,000.",
          steps: [
            { label: "Identify debt", detail: "Loan notes $400,000 plus redeemable preference shares $100,000 = $500,000. Redeemable preference shares are debt in substance, because the company must repay them." },
            { label: "Gearing, both ways", detail: "Debt ÷ equity = 500,000 ÷ 760,000 = 65.8%. Debt ÷ (debt + equity) = 500,000 ÷ 1,260,000 = 39.7%. Both are correct; the basis must be stated." },
            { label: "Finance costs", detail: "$400,000 × 7% = $28,000, plus $100,000 × 5% = $5,000 — the preference dividend is a finance cost because the shares are redeemable. Total $33,000." },
            { label: "Interest cover", detail: "148,000 ÷ 33,000 = 4.5 times." },
            { label: "Read them together", detail: "Gearing is moderate and cover of 4.5 times is adequate but not generous: a one-third fall in operating profit would take cover to 3.0, and a two-thirds fall would take it near 1.5." },
          ],
          result:
            "Gearing of 65.8% on a debt-to-equity basis (39.7% on debt to debt plus equity), and interest cover of 4.5 times. The check that matters: **redeemable preference shares belong in debt and their dividend in finance costs**. Treating them as equity would give gearing of 52.6% and cover of 5.3 times — a materially more comfortable picture than the substance supports.",
        },
      ],
      check: {
        q: "Operating profit is $92,000, loan interest $16,000 and an irredeemable preference dividend $4,000. What is interest cover?",
        options: ["4.6 times", "5.75 times", "23.0 times", "4.4 times"],
        correct: 1,
        explain:
          "Interest cover = operating profit ÷ FINANCE COSTS = $92,000 ÷ $16,000 = 5.75 times. The IRREDEEMABLE preference dividend is a distribution to an equity holder, not a finance cost, so it is excluded. Including it gives 4.6 times — which would be correct only if the preference shares were redeemable.",
      },
    },
    {
      id: "how-ratios-interrelate",
      heading: "How the ratios interrelate",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks specifically about the **interrelationships** between ratios, and it is where the analysis marks are. A ratio that has moved is rarely interesting on its own; a ratio that has moved **because** another one moved is the beginning of an explanation.",
        },
        {
          kind: "table",
          caption: "The links the exam builds questions on",
          head: ["If this moves…", "…this follows", "Because"],
          rows: [
            ["Operating margin down", "**ROCE down**, unless asset turnover rises to offset it", "ROCE = margin × turnover"],
            ["Capital expenditure up sharply", "**Asset turnover down**, then ROCE down", "Capital has been invested ahead of the revenue to fill it"],
            ["Receivables days up", "**Current ratio up**, cash down, overdraft up", "The asset grows while the cash to fund it goes"],
            ["Inventory days up", "**Current ratio up**, quick ratio unchanged", "Inventory is excluded from the quick ratio, so the two diverge"],
            ["Payables days up", "**Current ratio down**, cash retained", "Current liabilities grow while cash is kept back"],
            ["Gearing up", "**Interest cover down**, and ROCE unchanged", "More debt means more interest, but operating profit and capital employed are unaffected by how they are financed"],
            ["Gross margin down while revenue rises", "**Operating margin down by more**, if overheads are fixed", "Fixed overheads are spread over cheaper sales"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The current ratio and the quick ratio diverging is a signal",
          md: "If the **current ratio rises while the quick ratio is flat or falling**, the increase in current assets is **inventory** — the one item the quick ratio excludes. That is one of the most useful single observations available in an interpretation question, because it distinguishes genuine liquidity from stock that is not selling.",
        },
        {
          kind: "example",
          title: "Explaining one company through the links",
          scenario:
            "Halkirk Co reports, for this year against last: revenue $1,150,000 (up from $920,000); operating margin 9% (was 13%); capital employed $766,000 (was $560,000); current ratio 2.4:1 (was 1.8:1); quick ratio 0.9:1 (was 1.1:1); receivables days 63 (was 44); inventory days 82 (was 51); payables days 68 (was 45).",
          steps: [
            { label: "Compute ROCE both years", detail: "This year: 9% × ($1,150,000 ÷ $766,000 = 1.50) = 13.5%. Last year: 13% × ($920,000 ÷ $560,000 = 1.64) = 21.3%." },
            { label: "Attribute the fall", detail: "ROCE fell 7.8 points. Margin fell four points and turnover fell from 1.64 to 1.50 — so BOTH drivers weakened. Capital employed grew 37% while revenue grew 25%." },
            { label: "Read the two liquidity ratios together", detail: "Current ratio UP but quick ratio DOWN. The rise in current assets is therefore inventory — confirmed by inventory days rising 31 to 82." },
            { label: "Follow the working capital", detail: "Inventory days +31 and receivables days +19 mean cash is tied up; payables days +23 means suppliers are funding part of it. The working capital cycle went from 50 days to 77." },
            { label: "Assemble the explanation", detail: "Revenue was bought with lower margins and longer credit; the extra capital has gone into inventory that is not selling; and the funding has partly come from paying suppliers later. The improved current ratio is a symptom, not an improvement." },
            { label: "Say what would confirm it", detail: "The statement of cash flows — specifically whether operations generated cash — plus the aged receivables analysis and whether the inventory build is deliberate or obsolete." },
          ],
          result:
            "ROCE fell from 21.3% to 13.5%, decomposed into a four-point margin fall and slower asset turnover, and the working capital cycle lengthened by 27 days. The check that matters: **margin × turnover must reproduce ROCE** in both years, and the current/quick divergence must be explained by inventory — if either fails to tie, the same definition of capital employed was not used throughout, or a ratio has been misread.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Using total assets as capital employed in ROCE.",
      fix: "Capital employed is equity plus non-current liabilities, or total assets less current liabilities.",
    },
    {
      trap: "Computing inventory days on revenue.",
      fix: "Use cost of sales. Inventory is carried at cost, so it must be compared with a cost-based flow.",
    },
    {
      trap: "Computing payables days on revenue or cost of sales when purchases are given.",
      fix: "Use credit purchases where the question provides them; that is what generated the payable.",
    },
    {
      trap: "Quoting gearing without saying which basis was used.",
      fix: "Debt ÷ equity and debt ÷ (debt + equity) give very different numbers. State the basis.",
    },
    {
      trap: "Excluding redeemable preference shares from debt.",
      fix: "They must be repaid, so they are debt and their dividend is a finance cost. Irredeemable ones are equity.",
    },
    {
      trap: "Concluding that a high current ratio is good without looking further.",
      fix: "It may be slow inventory and uncollected receivables. Read liquidity alongside the efficiency ratios.",
    },
  ],
  keyTerms: [
    { term: "Capital employed", def: "Total equity plus non-current liabilities, equivalently total assets less current liabilities." },
    { term: "ROCE", def: "Operating profit as a percentage of capital employed; equals operating margin multiplied by asset turnover." },
    { term: "Quick (acid test) ratio", def: "Current assets excluding inventory, divided by current liabilities." },
    { term: "Working capital cycle", def: "Inventory days plus receivables days less payables days — the period the business must fund between paying suppliers and collecting from customers." },
    { term: "Gearing", def: "The proportion of long-term funding provided by interest-bearing debt rather than equity." },
    { term: "Interest cover", def: "Operating profit divided by finance costs — how many times profit covers the interest obligation." },
  ],
  summary: [
    "Gross and operating margins measure trading and overhead performance; ROCE measures the return on long-term capital.",
    "ROCE equals operating margin multiplied by asset turnover, which is how a change in it is explained.",
    "Capital employed is equity plus non-current liabilities, not total assets.",
    "Inventory days use cost of sales, receivables days use credit revenue and payables days use credit purchases.",
    "The working capital cycle is inventory plus receivables less payables days, and a longer cycle needs more funding.",
    "Gearing measures how much debt there is; interest cover measures whether it can be serviced.",
    "Redeemable preference shares count as debt and their dividend as a finance cost.",
  ],
  knowledgeDiagnostic: [
    { q: "What is capital employed, and why not total assets?", a: "Equity plus non-current liabilities, or total assets less current liabilities. It measures the LONG-TERM funding the return is being earned on." },
    { q: "Give the decomposition of ROCE.", a: "ROCE = operating margin × asset turnover. Earn more per sale, or make more sales from the same capital." },
    { q: "Which denominator does each working capital ratio use?", a: "Inventory days: cost of sales. Receivables days: credit revenue. Payables days: credit purchases." },
    { q: "Why quote interest cover alongside gearing?", a: "Gearing shows how much debt exists; cover shows whether profit can service it. Thin margins can make moderate gearing dangerous." },
    { q: "How are redeemable and irredeemable preference shares treated in these ratios?", a: "Redeemable shares are debt, and their dividend is a finance cost. Irredeemable shares are equity, and their dividend is a distribution." },
  ],
  furtherStudy: [
    "Chapter 31 turns these numbers into conclusions and states their limits.",
    "FM and PM develop the same ratios into working capital management and performance measurement.",
  ],
}

/* ── Chapter 31 · I3 ───────────────────────────────────────────── */

export const FA_TREE_31: StudyChapter = {
  id: "FA-31",
  number: 31,
  paper: "FA",
  area: "I",
  title: "Analysing financial statements and drawing conclusions",
  minutes: 16,
  syllabusRefs: ["I3(a)", "I3(b)", "I1(a)"],
  intro:
    "Calculating a ratio earns one mark; saying what it means to a named user earns the rest. This chapter is about the second part, and about being honest concerning what the statements cannot tell you.",
  outcomes: [
    "Calculate and interpret the relationships between the elements of the financial statements",
    "Draw valid conclusions from the information in the financial statements",
    "Present those conclusions to the appropriate user",
    "Explain how ratios interrelate, so that one change explains another",
    "State the limitations of ratio analysis",
  ],
  sections: [
    {
      id: "interpreting",
      heading: "From a number to a conclusion",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The structure of an answer that scores",
          items: [
            "**State the ratio and its direction** — \"gross margin fell from 34% to 29%\". Never leave the marker to spot the movement.",
            "**Say what would cause that** — selling prices cut, input costs risen, sales mix shifted to lower-margin lines, inventory written down, or theft.",
            "**Link it to another ratio** — if margin fell while revenue rose sharply, the business probably bought volume with price.",
            "**Relate it to the user's decision** — a lender cares whether cash will service the loan, a supplier whether the invoice will be paid.",
            "**State what you would need to know** to be sure — the industry average, the prior two years, the accounting policies, the post-year-end order book.",
          ],
        },
        {
          kind: "table",
          caption: "One movement, several possible explanations",
          head: ["Movement", "Plausible causes"],
          rows: [
            ["Gross margin down", "Price competition; input cost inflation not passed on; shift in sales mix; inventory write-down or loss; error in closing inventory"],
            ["Operating margin down while gross margin holds", "Overheads have grown — new premises, more staff, higher marketing, a large irrecoverable debt"],
            ["Receivables days up", "Weaker credit control; a large customer paying slowly; deliberate extension of terms to win sales; a year-end sales surge"],
            ["Inventory days up", "Slow-moving or obsolete lines; a deliberate build for expected demand; a fall in sales volume"],
            ["Payables days up", "Negotiated better terms; or cash difficulties leading to late payment — a very different story"],
            ["Current ratio up", "More cash and healthy trading; or a build-up of unsold inventory and uncollected debts"],
            ["ROCE down", "Lower margin, lower asset turnover, or new capital not yet generating revenue"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The same movement, two opposite stories",
          md: "Payables days rising can mean the business has **negotiated** better terms — a strength — or that it **cannot pay** — a serious weakness. A good answer names both and says what would distinguish them: is cash rising or falling, is the overdraft growing, are suppliers still supplying? Naming the ambiguity and how to resolve it is worth more than asserting one interpretation.",
        },
        {
          kind: "example",
          title: "Interpreting one company for two different users",
          scenario:
            "Kestrelby Co reports: revenue up 28% to $1,920,000; gross margin down from 36% to 30%; operating margin down from 14% to 9%; ROCE down from 19% to 13%; receivables days up from 44 to 71; inventory days up from 52 to 63; payables days up from 38 to 66; current ratio up from 1.7:1 to 2.1:1; the overdraft up from $30,000 to $185,000; interest cover down from 9.0 to 3.4 times.",
          steps: [
            { label: "Establish the pattern", detail: "Revenue grew 28% while every profitability ratio fell. So the growth was bought — with price, with credit, or with both." },
            { label: "Explain the margin fall", detail: "A six-point fall in gross margin alongside 28% revenue growth points to discounting to win volume. The further five-point fall in operating margin means overheads grew faster than the extra revenue supported." },
            { label: "Read the working capital story", detail: "Receivables days up 27 and inventory days up 11 mean cash is tied up in the expansion. Payables days up 28 and an overdraft up $155,000 suggest suppliers and the bank are funding it — the current ratio rose for the WRONG reasons." },
            { label: "Read the risk", detail: "Interest cover fell from 9.0 to 3.4 times. Profit is now much closer to the interest obligation, and the growth in the overdraft will push finance costs higher again next year." },
            { label: "The conclusion for a LENDER", detail: "Decline or restrict. Growth is unprofitable, funded by short-term credit, and cover has fallen by nearly two-thirds. Any lending should be conditional on collecting receivables and restoring margin, and secured." },
            { label: "The conclusion for a SUPPLIER", detail: "Tighten terms. Payables days have risen from 38 to 66 — this customer is already taking nearly a month longer to pay, and the overdraft growth suggests it is necessity rather than negotiation. Reduce the credit limit or require payment on shorter terms." },
          ],
          result:
            "The same figures produce two related but distinct recommendations, because the two users face different risks. The habit that scores: **look for a story the ratios tell together**, rather than commenting on each in isolation. Here every movement points the same way — profitable-looking growth financed by other people's money — and the current ratio improving while the overdraft quintupled is the detail that gives it away.",
        },
      ],
      check: {
        q: "A company's revenue rose 30% while gross margin fell from 40% to 32% and receivables days rose from 40 to 75. What is the most likely explanation?",
        options: [
          "Costs have been controlled better and collections have improved",
          "Sales growth was bought by cutting prices and extending credit",
          "The company has changed its inventory valuation method",
          "The company has revalued its non-current assets",
        ],
        correct: 1,
        explain:
          "Three movements point the same way: more revenue, thinner margins and much slower collection. That is the signature of buying volume with PRICE and with CREDIT. A valuation-method change would affect inventory and margin but not receivables days, and a revaluation affects neither.",
      },
    },
    {
      id: "limitations",
      heading: "The limitations, and why stating them earns marks",
      blocks: [
        {
          kind: "list",
          title: "What ratio analysis cannot do",
          items: [
            "**It is historic.** Every ratio describes a period that has ended, and users are deciding about the future.",
            "**A ratio needs a comparison.** A gross margin of 31% is meaningless alone — it needs the prior year, a competitor, or an industry average.",
            "**Accounting policies differ.** Two identical businesses using different depreciation methods or inventory formulae report different ratios, which is why policy disclosure matters.",
            "**Year-end figures may be unrepresentative.** A seasonal business measured at its quietest moment shows inventory and receivables that hold for one day of the year.",
            "**Figures can be managed.** Delaying payments or pressing for collections just before the year end improves the ratios without changing the business.",
            "**One-off items distort.** A large disposal gain, a restructuring or an exceptional write-down makes a year incomparable unless it is identified.",
            "**Non-financial factors are absent.** Management quality, the order book, staff skills, brand strength, regulatory change and the state of the market appear nowhere.",
            "**Size and sector differ.** A large diversified group and a single-site business are not comparable, whatever the ratios say.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "How to use a limitation properly",
          md: "A limitation is not a disclaimer to append to the end. Use it **where it bites**: \"receivables days rose to 71, but the comparison is affected by the acquisition in September, so a like-for-like figure would be needed\" is worth a mark, while a generic paragraph saying ratios are historic is not. Attach the limitation to the specific conclusion it qualifies.",
        },
        {
          kind: "illustration",
          title: "Two identical businesses, different ratios",
          md: "Two companies each buy the same $500,000 of plant with a five-year life and each earn operating profit before depreciation of $300,000 on capital employed of $1,000,000.\n\nCompany A depreciates straight line: charge $100,000, operating profit $200,000, ROCE 20%.\n\nCompany B depreciates at 40% reducing balance: first-year charge $200,000, operating profit $100,000, ROCE 10%.\n\nIdentical businesses, identical cash flows, and ROCE differing by a factor of two — from a policy choice that both disclose. That is why comparing two entities requires reading their accounting policies first, and why the statement of cash flows is a useful corrective.",
        },
      ],
      check: {
        q: "Which of these is the most useful thing to say about a company whose current ratio is 2.4:1?",
        options: [
          "It is above 2:1, so liquidity is satisfactory",
          "It cannot be assessed without a comparison and without knowing what the current assets consist of",
          "It means the company can pay its debts 2.4 times over",
          "It shows the company is well managed",
        ],
        correct: 1,
        explain:
          "A single ratio in isolation supports no conclusion. It needs a COMPARISON — the prior year, a competitor, the sector — and it needs the EFFICIENCY ratios to say whether the current assets are fast-moving inventory and collectable receivables or slow-moving stock and old debts. There is no universal target such as 2:1.",
      },
    },
    {
      id: "answering-for-a-user",
      heading: "Writing the answer, and the users the exam favours",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "A four-sentence pattern that scores",
          items: [
            "**The movement.** \"Gross margin fell from 36% to 29%.\" State the direction — never leave the marker to infer it.",
            "**A cause.** \"…consistent with discounting to win the 24% revenue growth, or with input costs not being passed on.\" Offer the plausible explanations rather than asserting one as fact.",
            "**A link.** \"Receivables days rose from 41 to 68 over the same period, which suggests credit terms were extended as well.\" Two ratios telling one story beats two separate observations.",
            "**The consequence for this user.** \"For a lender, the concern is that the additional revenue is not converting to cash while interest cover has fallen to 3.1 times.\"",
          ],
        },
        {
          kind: "table",
          caption: "What each user is actually asking",
          head: ["User", "Their question", "What to lead with"],
          rows: [
            ["**Lender or bank**", "Will we be repaid, and is the security adequate?", "Interest cover, gearing, cash from operations, assets available as security"],
            ["**Supplier**", "Will our invoice be paid, and at what limit?", "Payables days, the quick ratio, the trend in the overdraft"],
            ["**Investor**", "What return, at what risk?", "ROCE, margins, gearing, the trend across several years"],
            ["**Employee**", "Is the job secure?", "The profitability trend, liquidity, and what capital expenditure implies about plans"],
          ],
        },
        {
          kind: "activity",
          title: "Activity — one company, two verdicts",
          prompt:
            "Kingsmede Co reports: revenue up 22% to $1,464,000; gross margin down from 38% to 31%; operating margin down from 15% to 8%; receivables days up from 45 to 79; inventory days up from 48 to 71; payables days up from 41 to 74; current ratio up from 1.5:1 to 2.3:1; overdraft up from $25,000 to $210,000; interest cover down from 11.0 to 2.9 times.\n\nWrite a short conclusion for (a) a bank asked to lend $400,000 over five years, and (b) a supplier asked to raise a credit limit from $30,000 to $90,000.",
          answer:
            "**The story the ratios tell together.** Revenue grew 22% while gross margin fell seven points and operating margin fell seven more — so the growth was bought with price, and overheads grew faster than the extra revenue supported. Receivables and inventory days rose by 34 and 23, so the extra trade is tied up in working capital rather than in cash. Payables days rose 33 and the overdraft rose more than eightfold, so suppliers and the bank are funding it. The current ratio improved — for the wrong reason: current assets grew because inventory and receivables grew.\n\n**(a) For the bank.** Decline, or lend only on conditions. Interest cover has fallen from 11.0 to 2.9 times, so a one-third fall in operating profit would put the interest payment at risk, and the $210,000 overdraft will raise next year's finance cost again. If lending at all: secured, with covenants on interest cover, and conditional on reducing receivables days and restoring margin. I would want the statement of cash flows, the aged receivables analysis and the order book before deciding.\n\n**(b) For the supplier.** Do not raise the limit to $90,000; consider reducing it. Payables days have gone from 41 to 74, so this customer already takes an extra month, and the overdraft growth points to necessity rather than negotiated terms. Offer any increase only against shorter payment terms, a deposit or credit insurance, and review after two quarters.\n\n**What distinguishes the two answers:** identical figures, but the bank's exposure runs five years and the supplier's thirty days. The bank leads on cover and gearing; the supplier leads on payment behaviour and the overdraft.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two habits that cost the most marks",
          md: "**Listing ratios without a conclusion.** A page of correct calculations with no interpretation scores the calculation marks and nothing else.\n\n**Answering for nobody.** \"Liquidity has improved\" is not an answer to \"advise the supplier\". Name the user, then answer their question — and where the question names them, lead with what they care about.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Calculating ratios and stopping there.",
      fix: "State the direction, give a plausible cause, link it to another ratio and relate it to the user's decision. The calculation is the smallest part of the mark.",
    },
    {
      trap: "Asserting that rising payables days is good, or bad, without qualification.",
      fix: "It can be negotiated terms or an inability to pay. Name both and say what would distinguish them.",
    },
    {
      trap: "Applying a supposed ideal such as a current ratio of 2:1.",
      fix: "There is no universal target. Compare with the prior year, competitors or the sector.",
    },
    {
      trap: "Treating an improvement in the current ratio as good news on its own.",
      fix: "It may be unsold inventory and uncollected receivables. Read it with inventory and receivables days.",
    },
    {
      trap: "Appending a generic paragraph of limitations.",
      fix: "Attach each limitation to the specific conclusion it qualifies. A limitation used in place is worth a mark; one used as boilerplate is not.",
    },
    {
      trap: "Answering for no particular user.",
      fix: "Identify who is asking. A lender, a supplier, an investor and an employee draw different conclusions from the same figures.",
    },
  ],
  keyTerms: [
    { term: "Interpretation of financial statements", def: "Using calculated relationships between the elements of the statements to draw conclusions relevant to a particular user's decision." },
    { term: "Trend analysis", def: "Comparing an entity's ratios across successive periods to identify direction rather than level." },
    { term: "Inter-firm comparison", def: "Comparing an entity's ratios with those of similar entities or a sector average, adjusted for policy differences." },
    { term: "Window dressing", def: "Managing transactions near the reporting date so that the year-end ratios look better than the period's reality." },
    { term: "Like-for-like comparison", def: "A comparison adjusted for one-off items, acquisitions and policy changes so that the periods are genuinely comparable." },
  ],
  summary: [
    "State the ratio, its direction, a plausible cause, a link to another ratio, and what it means to the named user.",
    "Look for the story several ratios tell together rather than commenting on each alone.",
    "Growth with falling margins and rising receivables days signals volume bought with price and credit.",
    "Rising payables days is either negotiated terms or an inability to pay — say which evidence would settle it.",
    "A ratio needs a comparison; there is no universal target such as 2:1.",
    "Accounting policy differences alone can halve or double a ratio, so policies are read before entities are compared.",
    "Attach each limitation to the specific conclusion it qualifies rather than listing limitations generically.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the five components of a well-structured interpretation answer?", a: "The ratio and its direction, a plausible cause, a link to another ratio, the meaning for the named user, and what further information would be needed." },
    { q: "What pattern suggests growth has been bought rather than earned?", a: "Revenue rising while gross and operating margins fall and receivables days lengthen — price and credit were used to win volume." },
    { q: "Why is rising payables days ambiguous?", a: "It can mean better negotiated terms or an inability to pay. Cash movements, the overdraft and whether suppliers still supply distinguish them." },
    { q: "Give three limitations of ratio analysis.", a: "The figures are historic; policy differences make entities incomparable; year-end figures may be unrepresentative or managed. Non-financial factors being absent is a fourth." },
    { q: "How should a limitation be used in an answer?", a: "Attached to the specific conclusion it qualifies, not as a generic closing paragraph." },
  ],
  furtherStudy: [
    "Chapter 26's statement of cash flows is the corrective to policy-driven distortions in profit-based ratios.",
    "FR and FM develop interpretation into full analytical reports and working capital management.",
  ],
}

/** Chapters 28–31 — Areas H and I, in reading order. */
export const FA_TREE_AREA_H: StudyChapter[] = [FA_TREE_28, FA_TREE_29]
export const FA_TREE_AREA_I: StudyChapter[] = [FA_TREE_30, FA_TREE_31]
