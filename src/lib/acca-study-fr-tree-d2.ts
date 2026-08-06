import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area D — chapters 26 and 27: the consolidated statement of financial position.
 *
 * Chapter 26 is goodwill and non-controlling interest — the two figures that exist only in
 * consolidated statements and that nothing in a single entity's accounts prepares a
 * candidate for. Chapter 27 is every adjustment that then has to be layered on.
 *
 * The split is at the point where the exam's difficulty changes. A candidate can compute
 * goodwill correctly and still lose most of the marks in a consolidation question, because
 * the marks are distributed across the ADJUSTMENTS — the unrealised profit, the cash in
 * transit, the extra depreciation on a fair value uplift. So the adjustments get their own
 * chapter and their own worked example rather than being a footnote to goodwill.
 *
 * Chapter 6 has already established WHY consolidation works as it does. These two chapters
 * assume it and do not re-argue it.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_26: StudyChapter = {
  id: "FR-26",
  number: 26,
  paper: "FR",
  area: "D",
  title: "Consolidated statement of financial position: goodwill and non-controlling interest",
  minutes: 20,
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)"],
  intro:
    "Four standard workings produce every consolidated statement of financial position. Learn them as a set and the question becomes mechanical.",
  outcomes: [
    "Measure the consideration transferred, including a share exchange, deferred and contingent consideration",
    "Compute the fair value of the subsidiary's identifiable net assets at acquisition",
    "Calculate goodwill under both the proportionate and the fair value methods of measuring NCI",
    "Calculate the non-controlling interest at the reporting date",
    "Calculate group retained earnings, and set out the four standard workings",
  ],
  sections: [
    {
      id: "the-four-workings",
      heading: "The four workings",
      blocks: [
        {
          kind: "formula",
          name: "Every consolidated statement of financial position",
          expr: "W1  GROUP STRUCTURE\n       who owns what %, when acquired, and the NCI %\n\nW2  NET ASSETS OF THE SUBSIDIARY\n                              At acq'n   At reporting date\n       Share capital              X            X\n       Share premium              X            X\n       Retained earnings          X            X\n       Fair value adjustments     X            X\n       ... less extra depreciation on them     (X)\n       Other adjustments (PURP if S is seller) (X)\n                                ─────        ─────\n                                   A            B\n       POST-ACQUISITION MOVEMENT  =  B − A\n\nW3  GOODWILL\n       Consideration transferred                    X\n       + NCI at acquisition                         X\n            proportionate:  NCI% × A\n            fair value:     as given\n       − Fair value of identifiable net assets (A) (X)\n                                                ─────\n       GOODWILL                                     X\n       ... then deduct any impairment to date\n\nW4  NON-CONTROLLING INTEREST at the reporting date\n       NCI at acquisition (from W3)                 X\n       + NCI% × post-acquisition movement (W2)      X\n       − NCI% of goodwill impairment (full method\n            only)                                  (X)\n                                                ─────\n\nW5  GROUP RETAINED EARNINGS\n       Parent's own retained earnings               X\n       + Parent% × post-acquisition movement (W2)   X\n       − Goodwill impairment (parent's share)       (X)\n       − Adjustments where the PARENT is the seller (X)\n                                                ─────",
          note: "Work W2 first even though it is second. Everything else reads figures out of it — goodwill uses column A, NCI and group retained earnings use B − A. A wrong W2 makes three other workings wrong.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Consideration transferred: what to include",
          md: "**Cash paid** — at the amount paid.\n\n**A SHARE EXCHANGE** — the number of parent shares issued × the parent's share price **at the acquisition date**. Not the nominal value, and not the subsidiary's share price. In the parent's own records this splits between share capital at nominal value and share premium for the excess.\n\n**DEFERRED consideration** — at **PRESENT VALUE**, with the discount unwinding to finance costs thereafter.\n\n**CONTINGENT consideration** — at **FAIR VALUE** at the acquisition date, recognised whether or not payment is probable. Subsequent remeasurement generally goes to profit or loss, NOT to goodwill.\n\n**Acquisition COSTS** — legal and professional fees on the acquisition are **EXPENSED**, never included in consideration. This is the item candidates most often add in, and it inflates goodwill.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The two methods of measuring non-controlling interest",
            caption: "The method is chosen for each business combination and affects goodwill, NCI, and the treatment of any impairment.",
            data: {
              leftTitle: "PROPORTIONATE (partial goodwill)",
              rightTitle: "FAIR VALUE (full goodwill)",
              rows: [
                { aspect: "NCI at acquisition", left: "NCI% × fair value of identifiable net assets", right: "Fair value of the NCI, usually given, or NCI shares × the subsidiary's share price" },
                { aspect: "Goodwill recognised", left: "The PARENT's share only", right: "The WHOLE of the subsidiary's goodwill, including the NCI's share" },
                { aspect: "Total assets and equity", left: "Lower", right: "Higher, by the NCI's share of goodwill" },
                { aspect: "Goodwill impairment", left: "Must be grossed up to 100% before testing, then only the parent's share recognised", right: "Tested as recognised; the loss is allocated between the parent and the NCI" },
                { aspect: "Which to use", left: "Whichever the question specifies. Read carefully — 'NCI is measured at fair value' or 'at its proportionate share of net assets'", right: "As left" },
              ],
            },
          },
        },
        {
          kind: "example",
          title: "Goodwill, NCI and group retained earnings",
          scenario:
            "Peregrine Co acquired 80% of the 1,000,000 $1 equity shares of Skylark Co on 1 January 20X6. The consideration was $2,400,000 in cash plus a share exchange of two Peregrine shares for every five Skylark shares acquired. Peregrine's shares have a nominal value of $1 and a market value of $3.50 at the acquisition date. Peregrine also paid $60,000 in professional fees on the acquisition.\n\nSkylark's equity at 1 January 20X6 was share capital $1,000,000 and retained earnings $1,600,000. Its land was determined to have a fair value $400,000 above carrying amount; no other fair value adjustments were needed.\n\nAt 31 December 20X6 Skylark's retained earnings were $2,100,000 and Peregrine's own retained earnings were $4,200,000. Goodwill is not impaired.\n\nCalculate goodwill under both methods, the NCI at 31 December 20X6 using the proportionate method, and group retained earnings. The fair value of the NCI at acquisition was $780,000.",
          steps: [
            { label: "W1 — group structure", detail: "Peregrine owns 80% of Skylark from 1 January 20X6, so the NCI is 20% and the whole year is post-acquisition." },
            { label: "Measure the consideration transferred", detail: "Cash $2,400,000.\nShare exchange: 800,000 shares acquired × 2/5 = 320,000 Peregrine shares issued, at $3.50 = $1,120,000.\nTOTAL CONSIDERATION $3,520,000.\n\nThe $60,000 of professional fees is EXPENSED, not added. In Peregrine's own records the share issue is share capital $320,000 (320,000 × $1) and share premium $800,000 (320,000 × $2.50)." },
            { label: "W2 — net assets of Skylark", detail: "At acquisition: share capital $1,000,000 + retained earnings $1,600,000 + fair value adjustment on land $400,000 = $3,000,000.\nAt the reporting date: $1,000,000 + $2,100,000 + $400,000 = $3,500,000.\nPOST-ACQUISITION MOVEMENT = $500,000.\n\nNote the land is not depreciated, so the $400,000 adjustment stands unchanged in both columns. Had it been plant, extra depreciation would reduce the closing column." },
            { label: "W3 — goodwill, PROPORTIONATE method", detail: "Consideration $3,520,000\n+ NCI at acquisition: 20% × $3,000,000 = $600,000\n− Net assets at acquisition $(3,000,000)\n= GOODWILL $1,120,000." },
            { label: "W3 — goodwill, FAIR VALUE method", detail: "Consideration $3,520,000\n+ NCI at fair value $780,000\n− Net assets at acquisition $(3,000,000)\n= GOODWILL $1,300,000.\n\nThe $180,000 difference is the NCI's share of goodwill, which the proportionate method does not recognise. Under the fair value method both goodwill and NCI are $180,000 higher, so the statement of financial position grosses up on both sides." },
            { label: "W4 — NCI at 31 December 20X6 (proportionate)", detail: "NCI at acquisition $600,000 + 20% × $500,000 post-acquisition movement = $600,000 + $100,000 = $700,000. Under the fair value method it would be $780,000 + $100,000 = $880,000." },
            { label: "W5 — group retained earnings", detail: "Peregrine's own $4,200,000 + 80% × $500,000 = $4,200,000 + $400,000 = $4,600,000.\n\nNote what does NOT appear: Skylark's PRE-acquisition retained earnings of $1,600,000. Only the post-acquisition movement belongs to the group — the pre-acquisition reserves were bought and are represented by goodwill." },
          ],
          result:
            "**Goodwill $1,120,000 proportionate or $1,300,000 at fair value; NCI $700,000; group retained earnings $4,600,000.** The three most common errors here are adding the $60,000 of fees to consideration, valuing the share exchange at nominal value, and including Skylark's pre-acquisition retained earnings in group reserves.",
        },
      ],
      check: {
        q: "A parent acquires 75% of a subsidiary whose fair value of identifiable net assets at acquisition is $4m. Consideration is $3.6m, and the fair value of the NCI is $1.1m. What is goodwill under each method?",
        options: [
          "Proportionate $600,000; fair value $700,000",
          "Proportionate $700,000; fair value $600,000",
          "Proportionate $600,000; fair value $1.1m",
          "Both methods give $600,000",
        ],
        correct: 0,
        explain:
          "Proportionate: $3,600,000 + (25% × $4,000,000 = $1,000,000) − $4,000,000 = $600,000. Fair value: $3,600,000 + $1,100,000 − $4,000,000 = $700,000. The $100,000 difference is the NCI's share of goodwill.",
      },
    },
    {
      id: "mechanics",
      heading: "The consolidation mechanics",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Assembling the statement",
          items: [
            "**Add the parent's and the subsidiary's assets and liabilities line by line, IN FULL** — 100% of each, whatever the ownership percentage.",
            "**Replace the parent's 'investment in subsidiary' with goodwill.** The cost of investment never appears in a consolidated statement of financial position; it has been exchanged for the net assets and the goodwill.",
            "**Add the fair value adjustments to the relevant asset lines**, net of any extra depreciation to date. If plant was uplifted $500,000 and two years' extra depreciation of $100,000 a year has run, the plant line carries $300,000 more, not $500,000.",
            "**Eliminate intra-group balances** — receivables against payables, and any intra-group loans.",
            "**Deduct unrealised profit** from inventory.",
            "**Present equity in three parts:** share capital and premium of the PARENT ONLY, group retained earnings from W5, and non-controlling interest from W4 — the last shown separately within equity.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The parent's share capital only",
          md: "Consolidated share capital and share premium are the **PARENT's alone**. The subsidiary's share capital has been eliminated against the cost of investment inside the goodwill calculation — including it again would double count.\n\nThis is the single easiest mark to lose in a consolidation question and one of the easiest to check: consolidated share capital should equal the parent's share capital, adjusted for any shares issued as consideration.",
        },
        {
          kind: "activity",
          title: "Spot the four errors",
          prompt:
            "A candidate produces the following extract for a group where the parent owns 70% of a subsidiary:\n\n  Goodwill                                    $900,000\n  Investment in subsidiary                  $2,800,000\n  Property, plant and equipment (P 100%, S 70%)  $5,400,000\n  Share capital (parent $2m + subsidiary $1m)  $3,000,000\n  Retained earnings (P + all of S's)          $6,100,000\n  Non-controlling interest (in liabilities)     $840,000\n\nIdentify the errors.",
          answer:
            "FOUR errors, and each is a different misunderstanding.\n\n1. INVESTMENT IN SUBSIDIARY should not appear at all. It has been replaced by goodwill plus the subsidiary's net assets. Carrying both double counts the acquisition.\n\n2. PPE must include 100% of the subsidiary's, not 70%. Consolidation follows control, so all of the assets the group controls are shown — the 30% affects only the split of equity.\n\n3. SHARE CAPITAL is the parent's $2m only. The subsidiary's $1m was eliminated in the goodwill working.\n\n4. RETAINED EARNINGS must include only the parent's own plus the parent's SHARE of the subsidiary's POST-ACQUISITION movement. Adding all of the subsidiary's retained earnings brings in both the pre-acquisition reserves the parent bought and the NCI's share of the post-acquisition profits.\n\nAnd a fifth point on presentation: non-controlling interest belongs WITHIN EQUITY, shown separately, not in liabilities. Placing it in liabilities overstates liabilities and understates equity, which distorts gearing — the very ratio the question after this one will probably ask about.",
        },
      ],
      check: {
        q: "In a consolidated statement of financial position, what appears for the parent's investment in the subsidiary?",
        options: [
          "Nothing — it is replaced by goodwill and the subsidiary's net assets",
          "The cost of the investment, within non-current assets",
          "The parent's share of the subsidiary's net assets",
          "The cost of the investment less any impairment",
        ],
        correct: 0,
        explain:
          "The cost of investment is eliminated in the goodwill calculation and replaced by the goodwill and the subsidiary's identifiable assets and liabilities, which are added in full. Retaining the investment as well would double count the acquisition.",
      },
    },
  ],
  examTraps: [
    { trap: "Including acquisition professional fees in the consideration.", fix: "They are expensed. Including them inflates goodwill." },
    { trap: "Valuing a share exchange at nominal value.", fix: "Use the parent's share price at the ACQUISITION date. The nominal value only determines the split between share capital and premium." },
    { trap: "Measuring deferred consideration at its undiscounted amount.", fix: "At present value, with the discount unwinding to finance costs." },
    { trap: "Omitting contingent consideration because payment is not probable.", fix: "It is included at FAIR VALUE at the acquisition date regardless of probability." },
    { trap: "Consolidating a percentage of the subsidiary's assets.", fix: "Always 100%. The percentage affects only the split of equity." },
    { trap: "Including the subsidiary's share capital in consolidated share capital.", fix: "Consolidated share capital is the PARENT's only." },
    { trap: "Including the subsidiary's pre-acquisition retained earnings in group reserves.", fix: "Only the parent's share of the POST-acquisition movement." },
    { trap: "Presenting non-controlling interest outside equity.", fix: "It is equity, shown separately from the equity attributable to the owners of the parent." },
    { trap: "Adding a fair value uplift on plant without the extra depreciation.", fix: "The closing column of W2 carries the uplift NET of extra depreciation to date." },
  ],
  keyTerms: [
    { term: "Consideration transferred", def: "The fair value of what the acquirer gives up — cash, the market value of shares issued at the acquisition date, deferred consideration at present value and contingent consideration at fair value. Excludes acquisition costs." },
    { term: "Goodwill", def: "Consideration transferred plus the non-controlling interest at acquisition, less the fair value of the identifiable net assets acquired." },
    { term: "Proportionate (partial goodwill) method", def: "Measuring NCI at its share of the fair value of identifiable net assets, so only the parent's share of goodwill is recognised." },
    { term: "Fair value (full goodwill) method", def: "Measuring NCI at fair value, so the whole of the subsidiary's goodwill is recognised." },
    { term: "Post-acquisition movement", def: "The change in the subsidiary's adjusted net assets between acquisition and the reporting date; split between the parent and the NCI." },
    { term: "Pre-acquisition reserves", def: "The subsidiary's reserves at the acquisition date, which never enter group reserves — they were purchased and are represented within goodwill." },
  ],
  summary: [
    "Five workings: group structure; net assets of the subsidiary at acquisition and at the reporting date; goodwill; NCI; group retained earnings.",
    "Do the NET ASSETS working first — three other workings read from it.",
    "Consideration includes cash, shares at market value on acquisition, deferred consideration at present value and contingent consideration at fair value. Acquisition costs are EXPENSED.",
    "Goodwill = consideration + NCI at acquisition − fair value of identifiable net assets.",
    "The two NCI methods differ by the NCI's share of goodwill, which grosses up both goodwill and NCI under the fair value method.",
    "NCI at the reporting date = NCI at acquisition + NCI% of the post-acquisition movement.",
    "Group retained earnings = the parent's own + the parent's share of the post-acquisition movement. Never the subsidiary's pre-acquisition reserves.",
    "Add assets and liabilities in FULL; show the PARENT's share capital only; present NCI within equity.",
  ],
  knowledgeDiagnostic: [
    { q: "How is a share exchange valued?", a: "The number of parent shares issued multiplied by the parent's share price at the acquisition date." },
    { q: "How are acquisition professional fees treated?", a: "Expensed. They are not part of consideration." },
    { q: "Give the goodwill formula.", a: "Consideration transferred plus non-controlling interest at acquisition, less the fair value of the identifiable net assets acquired." },
    { q: "By how much do the two NCI methods differ?", a: "By the NCI's share of goodwill, which increases both goodwill and NCI under the fair value method." },
    { q: "What share capital appears in the consolidated statement of financial position?", a: "The parent's only." },
    { q: "Why are the subsidiary's pre-acquisition reserves excluded from group reserves?", a: "They were purchased as part of the net assets acquired and are represented within the goodwill calculation." },
  ],
  furtherStudy: [
    "Chapter 6 — the concepts of control and the single economic entity that these mechanics implement",
    "Chapter 27 — the adjustments that must be layered on to this framework",
    "Chapter 11 — impairing goodwill, including the grossing up required under the proportionate method",
  ],
}

export const FR_TREE_27: StudyChapter = {
  id: "FR-27",
  number: 27,
  paper: "FR",
  area: "D",
  title: "Consolidation adjustments: intra-group items, unrealised profit and fair values",
  minutes: 20,
  syllabusRefs: ["D2(d)", "D2(e)", "D2(f)"],
  intro:
    "Goodwill is worth a few marks. The adjustments are worth most of them — and each one has two sides.",
  outcomes: [
    "Eliminate intra-group balances, including cash and goods in transit",
    "Calculate unrealised profit on intra-group inventory and identify whose reserves it reduces",
    "Account for fair value adjustments and the resulting additional depreciation",
    "Account for an intra-group loan and the interest on it",
    "Apply each adjustment consistently across the net assets, goodwill, NCI and group reserves workings",
  ],
  sections: [
    {
      id: "intra-group-balances",
      heading: "Intra-group balances, and items in transit",
      blocks: [
        {
          kind: "text",
          md: "A single economic entity cannot owe itself money. So an intra-group receivable in one company's books and the matching payable in the other must both be **eliminated**, in full, against each other.\n\nThe difficulty is that the two figures often do not agree — because something was **in transit** at the reporting date.",
        },
        {
          kind: "formula",
          name: "Dealing with items in transit",
          expr: "STEP 1  Reconcile the two balances and identify the difference\n\nSTEP 2  Put the in-transit item onto the RECEIVING company's books\n\n           CASH IN TRANSIT\n              the payer has recorded the payment; the recipient has not\n              →  Dr CASH, Cr INTRA-GROUP RECEIVABLE\n                 in the RECIPIENT's records\n\n           GOODS IN TRANSIT\n              the seller has recorded the sale; the buyer has not\n              →  Dr INVENTORY, Cr INTRA-GROUP PAYABLE\n                 in the BUYER's records\n                 ... and the goods carry unrealised profit, so\n                     remove that too\n\nSTEP 3  Now the balances agree — ELIMINATE both in full",
          note: "Always adjust the RECEIVING company. The company that has already recorded the transaction has done nothing wrong; it is the other side that is missing an entry.",
        },
        {
          kind: "example",
          title: "Cash in transit",
          scenario:
            "At the reporting date Peregrine Co's records show $210,000 receivable from its subsidiary Skylark Co. Skylark's records show only $180,000 payable to Peregrine, because Skylark sent $30,000 on the last day of the year which Peregrine had not received.",
          steps: [
            { label: "Identify the difference and its cause", detail: "$210,000 − $180,000 = $30,000, which is the cash in transit. Skylark has recorded the payment; Peregrine has not recorded the receipt." },
            { label: "Adjust the RECIPIENT — Peregrine", detail: "Dr Cash $30,000; Cr Intra-group receivable $30,000. Peregrine's receivable falls to $180,000 and group cash rises by $30,000." },
            { label: "Eliminate the now-agreeing balances", detail: "Both sides are $180,000, so eliminate $180,000 from group receivables and $180,000 from group payables." },
            { label: "State the net effect on the consolidated statement", detail: "Cash INCREASES by $30,000. Receivables fall by $210,000 (the $30,000 reclassified plus the $180,000 eliminated). Payables fall by $180,000. Net assets are unchanged, which is the check: moving cash between group companies cannot make the group richer." },
            { label: "Note the trap", detail: "Eliminating $180,000 from both sides without first recognising the cash in transit leaves $30,000 stranded in group receivables — an amount owed by nobody outside the group. Eliminating $210,000 from both sides is worse: it removes a payable Skylark does not have." },
          ],
          result:
            "**Cash +$30,000; receivables −$210,000; payables −$180,000; net assets unchanged.** The net assets check is the fastest way to confirm the adjustment is right.",
        },
      ],
      check: {
        q: "A parent's records show $95,000 owed by its subsidiary; the subsidiary's records show $80,000, the difference being goods in transit. What adjustment is made before elimination?",
        options: [
          "Increase the subsidiary's inventory and payable by $15,000, then eliminate $95,000 from both sides",
          "Reduce the parent's receivable to $80,000 and eliminate $80,000",
          "Eliminate $80,000 and leave $15,000 in group receivables",
          "Increase the parent's cash by $15,000 and eliminate $80,000",
        ],
        correct: 0,
        explain:
          "Goods in transit are recorded by the receiving company — the subsidiary — as inventory and a payable of $15,000. Both balances then agree at $95,000 and are eliminated. The inventory added also carries unrealised profit, which must be removed separately.",
      },
    },
    {
      id: "purp",
      heading: "Unrealised profit on intra-group trading",
      blocks: [
        {
          kind: "text",
          md: "When one group company sells goods to another at a profit and the buyer still holds them at the reporting date, the group has recognised a profit on a transaction with **itself**. From the single economic entity's point of view nothing has been sold, so the profit is **unrealised** and must be removed.",
        },
        {
          kind: "formula",
          name: "Provision for unrealised profit",
          expr: "PROFIT IN CLOSING INVENTORY  =\n\n     intra-group sales value  ×  proportion STILL HELD\n                              ×  the profit fraction\n\nTHE PROFIT FRACTION\n\n   MARK-UP on cost  ( e.g. \"25% mark-up\", \"cost plus 25%\" )\n      →  25/125  of SELLING price\n\n   MARGIN on sales  ( e.g. \"25% margin\", \"25% gross profit margin\" )\n      →  25/100  of SELLING price\n\nTHE TWO ADJUSTMENTS\n\n   1  Reduce group INVENTORY by the unrealised profit — always\n\n   2  Reduce the SELLER's retained earnings by the same amount\n         parent is the seller  →  all against GROUP retained\n                                  earnings\n         subsidiary is seller  →  reduce the SUBSIDIARY's net assets\n                                  (W2 closing column), so it splits\n                                  between the parent and the NCI",
          note: "The second adjustment is the one that carries the mark. WHO SOLD determines whether the NCI bears a share of the reversal — and the question always tells you, so read the direction of the sale.",
        },
        {
          kind: "example",
          title: "Unrealised profit, both directions",
          scenario:
            "During the year Peregrine Co sold goods to its 80%-owned subsidiary Skylark Co for $600,000, at a mark-up of 25% on cost. At the reporting date Skylark still held 40% of these goods in inventory.",
          steps: [
            { label: "Compute the unrealised profit", detail: "Goods still held: $600,000 × 40% = $240,000 at transfer price. Mark-up of 25% on cost means the profit is 25/125 of the selling price: $240,000 × 25/125 = $48,000." },
            { label: "Adjust inventory", detail: "Reduce group inventory by $48,000. The goods are carried at what they cost the GROUP, not at what Skylark paid Peregrine." },
            { label: "Adjust the seller's reserves — here the parent", detail: "Peregrine is the seller, so the whole $48,000 reduces GROUP RETAINED EARNINGS in W5. The NCI bears none of it, because the profit was recognised in the parent's own books." },
            { label: "Now reverse the direction of the sale", detail: "If SKYLARK had been the seller on the same terms, the $48,000 would reduce Skylark's net assets in the CLOSING column of W2. The post-acquisition movement would then be $48,000 lower, so group retained earnings fall by 80% × $48,000 = $38,400 and the NCI falls by 20% × $48,000 = $9,600." },
            { label: "State why the difference is correct", detail: "The unrealised profit was recognised in the seller's books, so it is the seller's shareholders whose reported profit must be reduced. Where the seller is a partly-owned subsidiary, some of those shareholders are the non-controlling interest." },
            { label: "Note the margin variant", detail: "Had the terms been a 25% MARGIN rather than a mark-up, the profit would be $240,000 × 25/100 = $60,000. The difference between 25/125 and 25/100 on these figures is $12,000, and confusing the two is one of the most reliable ways to lose a mark in a consolidation question." },
          ],
          result:
            "**Unrealised profit $48,000: reduce inventory by $48,000 and group retained earnings by $48,000 because the PARENT sold.** Had the subsidiary sold, the reduction would split $38,400 / $9,600 between group reserves and the NCI.",
        },
      ],
      check: {
        q: "A 60%-owned subsidiary sold goods to its parent for $500,000 at a margin of 20%. The parent still holds one quarter at the year end. How is the unrealised profit dealt with?",
        options: [
          "Reduce inventory by $25,000, and reduce the subsidiary's net assets — so group reserves fall $15,000 and NCI $10,000",
          "Reduce inventory by $25,000 and group reserves by $25,000",
          "Reduce inventory by $31,250 and group reserves by $31,250",
          "No adjustment, since the parent bought rather than sold",
        ],
        correct: 0,
        explain:
          "Unrealised profit is $500,000 × 25% × 20/100 = $25,000. The SUBSIDIARY was the seller, so the adjustment reduces its net assets in the closing column, splitting 60/40: group reserves fall $15,000 and NCI $10,000. Using 20/120 would give $20,833 and would be the mark-up treatment, not the margin.",
      },
    },
    {
      id: "fair-values-and-loans",
      heading: "Fair value adjustments and intra-group loans",
      blocks: [
        {
          kind: "list",
          title: "Fair value adjustments: the two-column discipline",
          items: [
            "At acquisition, the subsidiary's identifiable assets and liabilities are brought in at **FAIR VALUE**, not at the amounts in its own books. The adjustment appears in the **acquisition column** of W2 and so feeds goodwill.",
            "It also appears in the **closing column** — but **NET of any extra depreciation** charged since acquisition on the uplifted amount.",
            "**Extra depreciation** = the uplift ÷ the remaining useful life at acquisition, for each year since acquisition. It reduces the closing column and so reduces both group reserves and the NCI in proportion.",
            "**Land is not depreciated**, so a land uplift appears unchanged in both columns — which is why exam questions use land when they want to test goodwill and NCI without the depreciation complication.",
            "Fair value adjustments can also arise on items the subsidiary has **not recognised at all**, such as a contingent liability that meets the IFRS 3 criteria, or an intangible asset the subsidiary could not recognise because it was internally generated. Both are recognised in the consolidated statements at fair value.",
          ],
        },
        {
          kind: "example",
          title: "A fair value uplift on depreciating plant",
          scenario:
            "A parent acquired 75% of a subsidiary two years ago. At acquisition the subsidiary's plant had a carrying amount of $1,800,000 and a fair value of $2,300,000, with a remaining useful life of five years. The subsidiary has continued to depreciate the plant on its original carrying amount.",
          steps: [
            { label: "Identify the uplift", detail: "$2,300,000 − $1,800,000 = $500,000. This appears in the ACQUISITION column of W2 and increases the net assets acquired, so it REDUCES goodwill by $500,000 — or, under the proportionate method, reduces it by $500,000 less the NCI's 25% share of the same figure, which the NCI-at-acquisition line picks up." },
            { label: "Compute the extra depreciation", detail: "$500,000 ÷ 5 years = $100,000 a year. Two years have passed, so $200,000 of extra depreciation has accumulated." },
            { label: "Enter the closing column", detail: "The uplift NET of extra depreciation: $500,000 − $200,000 = $300,000. So the closing column carries $300,000, not $500,000." },
            { label: "Trace the effect on the post-acquisition movement", detail: "The movement is reduced by the $200,000 of extra depreciation. So group reserves fall by 75% × $200,000 = $150,000 and the NCI by 25% × $200,000 = $50,000." },
            { label: "Adjust the asset line", detail: "Consolidated PPE includes the subsidiary's carrying amount PLUS $300,000. And the current year's extra depreciation of $100,000 is added to the consolidated depreciation charge in the statement of profit or loss." },
            { label: "Note the error to avoid", detail: "Carrying $500,000 in both columns overstates PPE by $200,000 and overstates the post-acquisition movement by the same, inflating both group reserves and the NCI. The whole point of the two-column layout is to force the netting." },
          ],
          result:
            "**$500,000 in the acquisition column, $300,000 in the closing column, and $100,000 added to this year's depreciation charge.** The $200,000 of accumulated extra depreciation reduces group reserves by $150,000 and the NCI by $50,000.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Intra-group loans and the interest on them",
          md: "An intra-group loan is eliminated exactly like a trading balance — the loan receivable against the loan payable, in full.\n\nThe **INTEREST** needs the same treatment: eliminate the interest income in one company against the interest expense in the other, so consolidated finance costs and investment income both fall. And watch for **accrued interest** at the reporting date, which sits in receivables in one company and payables in the other and must also be eliminated.\n\nThe check is the same as for cash in transit: after the adjustment, group profit and group net assets should be unchanged by the loan's existence. A group cannot earn interest from itself.",
        },
      ],
      check: {
        q: "A fair value uplift of $600,000 was made on plant with a remaining life of four years at acquisition. Three years have passed. What appears in the closing column of the net assets working?",
        options: ["$150,000", "$600,000", "$450,000", "Nil"],
        correct: 0,
        explain:
          "Extra depreciation is $600,000 ÷ 4 = $150,000 a year, so $450,000 has accumulated over three years. The closing column carries the uplift net of that: $600,000 − $450,000 = $150,000. The acquisition column still carries the full $600,000.",
      },
    },
  ],
  examTraps: [
    { trap: "Eliminating intra-group balances at the lower of the two figures without dealing with the item in transit.", fix: "Put the in-transit item on the RECEIVING company's books first, then eliminate the agreeing amount." },
    { trap: "Confusing mark-up with margin.", fix: "Mark-up x% → x/(100+x) of selling price. Margin x% → x/100 of selling price." },
    { trap: "Charging unrealised profit against group reserves when the SUBSIDIARY was the seller.", fix: "Reduce the subsidiary's closing net assets so the NCI bears its share." },
    { trap: "Applying the unrealised profit adjustment to all the goods sold rather than those still held.", fix: "Only the proportion remaining in inventory at the reporting date." },
    { trap: "Carrying a fair value uplift at its full amount in the closing column.", fix: "Net it against the extra depreciation accumulated since acquisition." },
    { trap: "Forgetting to add the current year's extra depreciation to the consolidated charge.", fix: "It belongs in the consolidated statement of profit or loss as well as in the net assets working." },
    { trap: "Eliminating an intra-group loan but not the interest on it.", fix: "Eliminate the interest income against the interest expense, and any accrued interest balance." },
  ],
  keyTerms: [
    { term: "Cash in transit", def: "A payment made by one group company and not yet received by the other at the reporting date; recorded in the recipient's books before elimination." },
    { term: "Goods in transit", def: "Goods despatched by one group company and not yet recorded by the other; recorded as inventory and a payable in the buyer's books before elimination, with unrealised profit then removed." },
    { term: "Provision for unrealised profit", def: "The removal of profit on intra-group sales still held in group inventory at the reporting date." },
    { term: "Mark-up", def: "Profit expressed as a percentage of COST; the profit fraction of selling price is x/(100+x)." },
    { term: "Margin", def: "Profit expressed as a percentage of SELLING PRICE; the profit fraction is x/100." },
    { term: "Fair value adjustment", def: "The difference between the fair value of a subsidiary's identifiable asset or liability at acquisition and its carrying amount in the subsidiary's own records." },
  ],
  summary: [
    "Eliminate intra-group receivables against payables in full — after recording any in-transit item in the RECEIVING company's books.",
    "Cash in transit increases group cash; goods in transit increase group inventory and carry unrealised profit.",
    "Unrealised profit = intra-group sales × proportion still held × the profit fraction. Mark-up uses x/(100+x); margin uses x/100.",
    "Always reduce inventory. Reduce GROUP reserves where the parent sold, and the SUBSIDIARY's closing net assets where the subsidiary sold — so the NCI shares it.",
    "Fair value adjustments go into the acquisition column in full, and into the closing column NET of extra depreciation since acquisition.",
    "Extra depreciation also increases the consolidated depreciation charge for the current year.",
    "Land uplifts are not depreciated, so they appear unchanged in both columns.",
    "Eliminate intra-group loans, the interest on them, and any accrued interest.",
  ],
  knowledgeDiagnostic: [
    { q: "Which company's books are adjusted for an item in transit?", a: "The receiving company's — the one that has not yet recorded the transaction." },
    { q: "What is the profit fraction for a 30% mark-up on cost?", a: "30/130 of the selling price." },
    { q: "Whose reserves does unrealised profit reduce?", a: "The SELLER's. If the parent sold, group reserves alone; if the subsidiary sold, its closing net assets — so the NCI bears its share." },
    { q: "What appears in the closing column of the net assets working for a fair value uplift on plant?", a: "The uplift net of the extra depreciation accumulated on it since acquisition." },
    { q: "Where else does the extra depreciation appear?", a: "As an addition to the consolidated depreciation charge in the statement of profit or loss." },
    { q: "How is intra-group interest treated?", a: "Eliminated — the income against the expense, together with any accrued interest balance." },
  ],
  furtherStudy: [
    "Chapter 26 — the five workings these adjustments feed into",
    "Chapter 28 — the same adjustments applied to the consolidated statement of profit or loss",
    "Chapter 12 — the IAS 2 measurement that unrealised profit restores inventory to",
  ],
}
