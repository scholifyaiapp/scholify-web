import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area D — chapters 28 and 29, completing the area.
 *
 * Chapter 28 is the consolidated statement of profit or loss, and the whole chapter is
 * organised round the one thing that makes it harder than the statement of financial
 * position: TIME. A mid-year acquisition means the subsidiary's results are included for
 * part of the year only, and every figure has to be pro-rated before any adjustment is made.
 *
 * Chapter 29 is IAS 28. It is deliberately last in Area D so that the equity method can be
 * taught as a contrast with full consolidation, which the learner has just done — a single
 * line against a line-by-line addition, and the reason for the difference is the control
 * analysis from chapter 6.
 *
 * All figures verified by script before authoring, including that the attribution between
 * the parent and the NCI adds back to consolidated profit. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_28: StudyChapter = {
  id: "FR-28",
  number: 28,
  paper: "FR",
  area: "D",
  title: "Consolidated statement of profit or loss and other comprehensive income",
  minutes: 20,
  syllabusRefs: ["D2(g)", "D2(h)", "D2(i)"],
  intro:
    "Pro-rate first, adjust second, attribute last. A mid-year acquisition breaks any other order.",
  outcomes: [
    "Consolidate a subsidiary's results from the date of acquisition, pro-rating where necessary",
    "Eliminate intra-group trading and the unrealised profit within it",
    "Include additional depreciation on fair value adjustments and any goodwill impairment",
    "Attribute profit and total comprehensive income between the owners of the parent and the NCI",
    "Explain why the attribution does not change consolidated profit",
  ],
  sections: [
    {
      id: "the-method",
      heading: "The order of work",
      blocks: [
        {
          kind: "formula",
          name: "Building the consolidated statement of profit or loss",
          expr: "1  PRO-RATE the subsidiary's income and expenses for the\n   POST-ACQUISITION period only\n      unless the question gives a separate split, assume the\n      results accrue EVENLY over the year\n\n2  ADD the parent's figures and the pro-rated subsidiary figures\n   line by line, IN FULL\n\n3  ELIMINATE intra-group trading\n      the SAME amount from revenue and from cost of sales,\n      so gross profit is unaffected by the elimination itself\n      ... only POST-ACQUISITION intra-group sales are eliminated\n\n4  ADD the adjustments\n      unrealised profit in closing inventory  →  cost of sales\n      extra depreciation on fair value uplifts →  the relevant\n         expense line, pro-rated for the post-acquisition period\n      goodwill impairment for the year        →  operating expenses\n\n5  ATTRIBUTE profit for the year\n      NCI  =  NCI%  ×  the subsidiary's ADJUSTED post-acquisition\n              profit after tax\n      Owners of the parent  =  the balance\n\nCONSOLIDATED PROFIT IS NOT REDUCED BY THE ATTRIBUTION. It is\nsplit below the profit line, and the two parts add back to it.",
          note: "Step 5 is where candidates lose marks by adjusting the subsidiary's profit for the wrong items. Only adjustments that arose in the SUBSIDIARY's own results affect the NCI — a parent's unrealised profit does not.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Only post-acquisition intra-group sales are eliminated",
          md: "If the parent acquired the subsidiary on 1 April and the two traded throughout the year, only the sales from 1 April are intra-group. Sales before that date were between unconnected parties and are genuine third-party revenue for whichever company recorded them.\n\nA question that gives \"intra-group sales during the year of $600,000, of which $400,000 arose after acquisition\" is testing precisely this — and eliminating the full $600,000 understates consolidated revenue by $200,000.\n\nThe same applies to the unrealised profit: only profit on post-acquisition sales still held is eliminated.",
        },
        {
          kind: "example",
          title: "A mid-year acquisition with intra-group trading",
          scenario:
            "Peregrine Co acquired 75% of Skylark Co on 1 April 20X6. Both have a 31 December year end, and Skylark's results accrue evenly over the year.\n\n                                    Peregrine      Skylark\n                                                (full year)\n  Revenue                          $12,000,000   $4,800,000\n  Cost of sales                     $7,200,000   $2,880,000\n  Operating expenses                $1,800,000     $720,000\n  Income tax expense                  $600,000     $300,000\n\nAdditional information:\n\n(i)   After acquisition Skylark sold goods to Peregrine for $400,000 at a mark-up of 25% on cost. One quarter of these goods remained in Peregrine's inventory at the year end.\n(ii)  At acquisition Skylark's plant had a fair value $500,000 above carrying amount, with a remaining useful life of five years. Skylark has not adjusted its own records.\n(iii) Goodwill is not impaired.",
          steps: [
            { label: "Step 1 — pro-rate Skylark for nine months", detail: "Revenue $4,800,000 × 9/12 = $3,600,000.\nCost of sales $2,880,000 × 9/12 = $2,160,000.\nOperating expenses $720,000 × 9/12 = $540,000.\nIncome tax $300,000 × 9/12 = $225,000.\nSkylark's nine-month profit after tax is therefore $3,600,000 − $2,160,000 − $540,000 − $225,000 = $675,000." },
            { label: "Step 4a — the unrealised profit", detail: "Goods still held: $400,000 × 25% = $100,000 at transfer price. Mark-up 25% on cost, so the profit fraction is 25/125: $100,000 × 25/125 = $20,000. Add $20,000 to cost of sales." },
            { label: "Step 4b — the extra depreciation", detail: "$500,000 ÷ 5 years = $100,000 a year, but only nine months are post-acquisition: $100,000 × 9/12 = $75,000. Add it to cost of sales, since it relates to production plant." },
            { label: "Steps 2 and 3 — assemble revenue and cost of sales", detail: "REVENUE: $12,000,000 + $3,600,000 − $400,000 intra-group = $15,200,000.\nCOST OF SALES: $7,200,000 + $2,160,000 − $400,000 intra-group + $20,000 unrealised profit + $75,000 extra depreciation = $9,055,000.\nGROSS PROFIT $15,200,000 − $9,055,000 = $6,145,000." },
            { label: "Complete the statement", detail: "Operating expenses: $1,800,000 + $540,000 = $2,340,000.\nPROFIT BEFORE TAX $6,145,000 − $2,340,000 = $3,805,000.\nIncome tax: $600,000 + $225,000 = $825,000.\nPROFIT FOR THE YEAR $2,980,000." },
            { label: "Step 5 — adjust Skylark's profit before attributing", detail: "Skylark's nine-month profit after tax was $675,000. Two adjustments arose in SKYLARK's results:\n  − $75,000 extra depreciation on the fair value uplift, which is a cost of the group's plant that Skylark has not charged\n  − $20,000 unrealised profit, because SKYLARK was the seller\nADJUSTED profit = $675,000 − $75,000 − $20,000 = $580,000." },
            { label: "Attribute", detail: "NCI = 25% × $580,000 = $145,000.\nOwners of the parent = $2,980,000 − $145,000 = $2,835,000.\nCheck: $145,000 + $2,835,000 = $2,980,000 — the attribution splits profit, it does not reduce it." },
            { label: "Note what would change if the PARENT had been the seller", detail: "The $20,000 of unrealised profit would still be added to cost of sales, so consolidated profit would be identical. But it would NOT reduce Skylark's adjusted profit, so the NCI would be 25% × $655,000 = $163,750 and the parent's share $2,816,250. Same total, different split — which is why the direction of the sale must be read." },
          ],
          result:
            "**Revenue $15,200,000; profit for the year $2,980,000, attributed $2,835,000 to the owners of the parent and $145,000 to the NCI.** The five figures a marker looks for are the 9/12 pro-rating, the intra-group elimination, the $20,000 unrealised profit, the $75,000 pro-rated extra depreciation, and the NCI computed on ADJUSTED profit.",
        },
      ],
      check: {
        q: "A parent acquires 60% of a subsidiary on 1 July. The subsidiary's revenue for the full year is $3,600,000, accruing evenly, and it sold $200,000 of goods to the parent after acquisition. How much of the subsidiary's revenue appears in consolidated revenue?",
        options: ["$1,600,000", "$1,800,000", "$1,080,000", "$3,400,000"],
        correct: 0,
        explain:
          "Six months are post-acquisition: $3,600,000 × 6/12 = $1,800,000. The $200,000 of intra-group sales is then eliminated, leaving $1,600,000. Note that revenue is consolidated in FULL, not at 60% — the ownership percentage affects only the attribution of profit.",
      },
    },
    {
      id: "oci-and-presentation",
      heading: "Other comprehensive income, and presentation",
      blocks: [
        {
          kind: "list",
          title: "Points on presentation",
          items: [
            "**Total comprehensive income is attributed too**, in the same proportions and on the same basis as profit. The statement shows profit attributable to the owners of the parent and to the NCI, and then total comprehensive income attributable to each.",
            "**The subsidiary's OCI** — a revaluation surplus, for instance — is consolidated for the post-acquisition period and shared with the NCI. A revaluation arising in the subsidiary before acquisition forms part of the net assets acquired instead, and feeds goodwill.",
            "**Dividends received from the subsidiary** by the parent are ELIMINATED. They are intra-group, and the group's income from the subsidiary is its share of the subsidiary's profit, not the dividend. Leaving the dividend in investment income double counts.",
            "**Dividends paid by the subsidiary to the NCI** reduce the NCI balance in the statement of financial position. They are not an expense of the group.",
            "**Goodwill impairment** for the year is charged in operating expenses. Under the FULL goodwill method it is shared with the NCI in the attribution; under the PROPORTIONATE method only the parent's share is recognised, so it falls entirely on the parent.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The single most useful check",
          md: "**Profit attributable to the owners of the parent + profit attributable to the NCI = consolidated profit for the year.**\n\nIf they do not add up, one of three things has happened: the NCI percentage is wrong, the subsidiary's adjusted profit is wrong, or the parent's figure has been computed independently rather than as the balance.\n\nAlways compute the NCI and then take the parent's share as the residual. Computing both independently guarantees they will not reconcile.",
        },
        {
          kind: "activity",
          title: "Which adjustments reduce the NCI?",
          prompt:
            "A parent owns 70% of a subsidiary. In the year the following arose. State for each whether it reduces the subsidiary's profit for the purposes of the NCI attribution:\n\n(i) Unrealised profit of $30,000 on goods the PARENT sold to the subsidiary.\n(ii) Unrealised profit of $30,000 on goods the SUBSIDIARY sold to the parent.\n(iii) Extra depreciation of $60,000 on a fair value uplift to the subsidiary's plant.\n(iv) Goodwill impairment of $80,000, where NCI is measured at fair value.\n(v) Goodwill impairment of $80,000, where NCI is measured at its proportionate share of net assets.\n(vi) A management charge of $50,000 made by the parent to the subsidiary.",
          answer:
            "(i) NO. The profit was recognised in the parent's books, so it reduces group reserves alone. Consolidated profit falls by $30,000; the NCI is untouched.\n\n(ii) YES. The subsidiary recognised the profit, so its adjusted profit falls by $30,000 and the NCI bears 30% × $30,000 = $9,000.\n\n(iii) YES. The uplift relates to the subsidiary's asset, so the extra charge belongs to the subsidiary's results. The NCI bears $18,000.\n\n(iv) YES. Under the full goodwill method the NCI's share of goodwill is recognised, so the impairment is allocated between the parent and the NCI: the NCI bears $24,000.\n\n(v) NO. Under the proportionate method only the parent's share of goodwill is recognised, so the whole recognised impairment falls on the parent.\n\n(vi) NO NET EFFECT, but both sides must be eliminated. The parent's income of $50,000 and the subsidiary's expense of $50,000 cancel in consolidated profit. However, the subsidiary's own profit HAS been reduced by $50,000 and that reduction is real from the subsidiary's shareholders' point of view — so the NCI attribution is computed on the subsidiary's profit as it stands, including the charge. This one catches people: eliminate it from the group figures, but do not add it back to the subsidiary's profit for the NCI.\n\nThe organising rule: an adjustment affects the NCI if and only if it arose in the SUBSIDIARY's own results.",
        },
      ],
      check: {
        q: "Consolidated profit for the year is $1,400,000. The subsidiary's adjusted post-acquisition profit is $320,000 and the NCI is 40%. What is profit attributable to the owners of the parent?",
        options: ["$1,272,000", "$1,400,000", "$1,080,000", "$840,000"],
        correct: 0,
        explain:
          "The NCI's share is 40% × $320,000 = $128,000, and the parent's share is the balance: $1,400,000 − $128,000 = $1,272,000. The attribution splits consolidated profit; it does not reduce it, so the two figures must add back to $1,400,000.",
      },
    },
  ],
  examTraps: [
    { trap: "Consolidating the subsidiary's full-year results after a mid-year acquisition.", fix: "Pro-rate from the acquisition date, assuming even accrual unless told otherwise." },
    { trap: "Consolidating the subsidiary's revenue at the ownership percentage.", fix: "In full. The percentage affects only the attribution of profit." },
    { trap: "Eliminating pre-acquisition intra-group sales.", fix: "Only post-acquisition sales are intra-group. Earlier ones were between unconnected parties." },
    { trap: "Charging a full year's extra depreciation on a fair value uplift after a mid-year acquisition.", fix: "Pro-rate it for the post-acquisition period too." },
    { trap: "Deducting the NCI from consolidated profit.", fix: "Consolidated profit is the whole entity's. It is ATTRIBUTED below the profit line and the two parts add back to it." },
    { trap: "Computing the NCI on the subsidiary's unadjusted profit.", fix: "Adjust for items arising in the SUBSIDIARY's results — its own unrealised profit and the extra fair value depreciation." },
    { trap: "Reducing the subsidiary's profit for the PARENT's unrealised profit.", fix: "It arose in the parent's books, so it does not touch the NCI." },
    { trap: "Leaving dividends received from the subsidiary in investment income.", fix: "Eliminate them. The group's return is its share of the subsidiary's profit." },
  ],
  keyTerms: [
    { term: "Post-acquisition period", def: "The part of the reporting period from the date control was obtained; only these results are consolidated." },
    { term: "Attribution", def: "The split of consolidated profit and total comprehensive income between the owners of the parent and the non-controlling interest, presented below the profit line." },
    { term: "Adjusted subsidiary profit", def: "The subsidiary's post-acquisition profit after tax, adjusted for items arising in its own results — its unrealised profit as seller and extra depreciation on fair value uplifts — used to compute the NCI." },
  ],
  summary: [
    "Pro-rate the subsidiary's results for the post-acquisition period, then add them in FULL.",
    "Eliminate only POST-acquisition intra-group sales, the same amount from revenue and cost of sales.",
    "Add unrealised profit to cost of sales, extra fair value depreciation pro-rated for the post-acquisition period, and any goodwill impairment.",
    "Attribute profit: NCI% × the subsidiary's ADJUSTED post-acquisition profit after tax; the parent's share is the balance.",
    "An adjustment affects the NCI only if it arose in the SUBSIDIARY's own results.",
    "Under the proportionate goodwill method an impairment falls entirely on the parent; under the full method it is shared.",
    "Eliminate dividends received from the subsidiary; dividends paid to the NCI reduce the NCI balance rather than being an expense.",
    "The two attributed amounts must add back to consolidated profit — always take the parent's share as the residual.",
  ],
  knowledgeDiagnostic: [
    { q: "How much of a subsidiary's revenue is consolidated after a mid-year acquisition?", a: "All of it for the post-acquisition period only, pro-rated — never a percentage based on ownership." },
    { q: "Which intra-group sales are eliminated?", a: "Only those arising after the acquisition date." },
    { q: "How is the NCI's share of profit computed?", a: "The NCI percentage applied to the subsidiary's post-acquisition profit after tax, adjusted for items arising in the subsidiary's own results." },
    { q: "Does attributing profit to the NCI reduce consolidated profit?", a: "No. It splits it below the profit line; the two parts add back to the total." },
    { q: "Does the parent's unrealised profit affect the NCI?", a: "No. It arose in the parent's books, so it reduces group reserves alone." },
    { q: "How are dividends received from a subsidiary treated?", a: "Eliminated. The group's return from the subsidiary is its share of the subsidiary's profit." },
  ],
  furtherStudy: [
    "Chapter 27 — the adjustments, taught first against the statement of financial position",
    "Chapter 29 — the associate, whose results appear as a single line rather than being consolidated",
    "Chapter 32 — why a mid-year acquisition makes a group's ratios non-comparable with the prior year",
  ],
}

export const FR_TREE_29: StudyChapter = {
  id: "FR-29",
  number: 29,
  paper: "FR",
  area: "D",
  title: "IAS 28: associates and the equity method",
  minutes: 17,
  syllabusRefs: ["D2(j)", "D2(k)", "A4(e)"],
  intro:
    "One line in each statement, and the reason is control: the group influences the associate's decisions but does not command its assets.",
  outcomes: [
    "Apply the equity method to measure an investment in an associate",
    "Present the share of an associate's profit and OCI in the consolidated statements",
    "Adjust for unrealised profit on transactions with an associate",
    "Account for an associate's losses, and for impairment of the investment",
    "Explain why an associate is not consolidated line by line",
  ],
  sections: [
    {
      id: "the-equity-method",
      heading: "The equity method",
      blocks: [
        {
          kind: "formula",
          name: "Equity accounting",
          expr: "STATEMENT OF FINANCIAL POSITION — one line,\n\"INVESTMENT IN ASSOCIATE\", within non-current assets:\n\n      Cost of the investment                              X\n   +  Group share of POST-ACQUISITION retained profits    X\n   +  Group share of post-acquisition OCI                 X\n   −  Group share of unrealised profit on transactions\n      with the associate                                 (X)\n   −  Impairment of the investment                        (X)\n                                                       ─────\n\n   Equivalently:  group share of the associate's net assets\n                  at the reporting date, plus goodwill on\n                  acquisition, less impairment\n\nSTATEMENT OF PROFIT OR LOSS — one line, presented AFTER\noperating profit and normally BEFORE tax:\n\n      \"SHARE OF PROFIT OF ASSOCIATE\"\n      =  group %  ×  the associate's profit AFTER TAX\n         adjusted for the group's share of unrealised profit\n\nWHAT NEVER HAPPENS\n   ·  the associate's revenue, cost of sales or expenses are\n      NOT added to the group's\n   ·  no non-controlling interest arises in an associate\n   ·  intra-group balances with an associate are NOT eliminated —\n      the associate is outside the group",
          note: "Two exam points hide in the last block. Balances with an associate stay on the face of the statement of financial position, because a receivable from an associate is a receivable from outside the group. And DIVIDENDS received from the associate reduce the investment rather than being income.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why one line rather than line by line",
          md: "Because the group does **not control** the associate's assets. It has **significant influence** — a seat at the table when policy is decided — which is not the same as the ability to direct the use of the assets.\n\nAdding the associate's inventory to group inventory would assert a control the group does not have, and would mislead a user about what the group can actually deploy. The equity method instead reports the group's **INTEREST in the associate's net assets** as a single figure, which is exactly what the group has.\n\nThis is the same reasoning as chapter 6, and it is worth stating explicitly in a written answer — the marks are for the reason, not for the classification.",
        },
        {
          kind: "example",
          title: "Equity accounting an associate",
          scenario:
            "Peregrine Co acquired 30% of Osprey Co for $900,000 on 1 January 20X6, obtaining significant influence through a seat on Osprey's board. For the year ended 31 December 20X6 Osprey reported profit after tax of $600,000 and paid dividends of $200,000.\n\nDuring the year Peregrine sold goods to Osprey for $250,000 at a margin of 20%. Osprey still held half of these goods at the year end. The investment in Osprey is not impaired.",
          steps: [
            { label: "Compute the group's share of profit", detail: "30% × $600,000 = $180,000, presented as a single line, 'share of profit of associate', after operating profit." },
            { label: "Deal with the dividend", detail: "30% × $200,000 = $60,000 received. This is NOT income — recognising both the share of profit and the dividend would double count, because the dividend is a distribution of the profit already recognised. It reduces the carrying amount of the investment." },
            { label: "Compute the unrealised profit", detail: "Goods still held: $250,000 × 50% = $125,000 at transfer price. A 20% MARGIN means the profit is 20/100 of selling price: $125,000 × 20% = $25,000." },
            { label: "Take only the group's SHARE of it", detail: "30% × $25,000 = $7,500. Only the group's share is eliminated, because only that proportion of the profit is unrealised from the group's point of view — the other 70% was realised in a transaction with Osprey's other shareholders. This differs from a subsidiary, where the FULL unrealised profit is eliminated." },
            { label: "Build the carrying amount", detail: "Cost $900,000\n+ share of profit $180,000\n− dividend received $(60,000)\n− share of unrealised profit $(7,500)\n= INVESTMENT IN ASSOCIATE $1,012,500." },
            { label: "Present the profit or loss effect", detail: "Share of profit of associate $180,000 − $7,500 = $172,500. Some presentations instead deduct the $7,500 from group revenue and cost of sales; either is acceptable provided it is done once. The commonest error is deducting it twice — from the share of profit AND from group inventory in full." },
            { label: "Note what is NOT done", detail: "Osprey's revenue, expenses and assets appear nowhere. Any balance between Peregrine and Osprey stays on the statement of financial position — it is owed by a party outside the group. And there is no NCI in an associate." },
          ],
          result:
            "**Investment in associate $1,012,500; share of profit $172,500.** The three points that carry the marks are treating the dividend as a reduction of the investment, taking only the GROUP's share of the unrealised profit, and presenting the whole thing as one line.",
        },
      ],
      check: {
        q: "An investor owns 40% of an associate and sold it goods at a profit of $50,000, all still held by the associate at the year end. How much unrealised profit is eliminated?",
        options: ["$20,000 — the investor's share only", "$50,000 in full", "$30,000 — the other party's share", "Nothing, since the associate is outside the group"],
        correct: 0,
        explain:
          "Only the investor's share of the unrealised profit is eliminated: 40% × $50,000 = $20,000. The remaining 60% was realised in a transaction with the associate's other shareholders. For a SUBSIDIARY the full amount would be eliminated, because the group controls both sides.",
      },
    },
    {
      id: "losses-and-impairment",
      heading: "Losses, impairment, and the exemptions",
      blocks: [
        {
          kind: "list",
          title: "An associate making losses",
          items: [
            "The group recognises its **share of the associate's losses**, reducing the carrying amount of the investment.",
            "Once the carrying amount reaches **NIL**, further losses are **NOT recognised** — unless the group has incurred a legal or constructive **obligation** to fund them, or has made payments on the associate's behalf.",
            "The reason is that the investor's exposure is limited to its investment. Recognising losses beyond that would recognise a liability the group does not have.",
            "If the associate later returns to profit, the group resumes recognising its share only **after** its share of the unrecognised losses has been made good.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Impairment of an investment in an associate",
          md: "The **WHOLE investment**, including the goodwill embedded within it, is tested as a **single asset** under IAS 36. There is no separate goodwill line to impair, because equity accounting never separated it out.\n\nThat has a useful consequence: an impairment of an investment in an associate **CAN be reversed** if the conditions change, because it is not an impairment of goodwill as such. Contrast a subsidiary's goodwill, where reversal is never permitted.",
        },
        {
          kind: "list",
          title: "When the equity method is not applied",
          items: [
            "Where the investment is classified as **HELD FOR SALE** under IFRS 5 — it is then measured under IFRS 5 instead.",
            "Where the investor is an **investment entity** measuring its investments at fair value through profit or loss.",
            "Where a parent is **exempt from preparing consolidated financial statements**, it need not apply the equity method either.",
            "Note that the equity method IS applied even where the associate's accounting policies differ — adjustments are made to conform them to the group's, and the associate's financial statements should be as at the same date unless impracticable, in which case the gap must not exceed three months and must be consistent.",
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Subsidiary against associate",
            caption: "The whole difference traces back to control against significant influence.",
            data: {
              leftTitle: "SUBSIDIARY (control)",
              rightTitle: "ASSOCIATE (significant influence)",
              rows: [
                { aspect: "Assets and liabilities", left: "Added line by line, in FULL", right: "Not added at all — one line, 'investment in associate'" },
                { aspect: "Revenue and expenses", left: "Added line by line", right: "Not added — one line, 'share of profit of associate', after operating profit" },
                { aspect: "Non-controlling interest", left: "Arises, presented within equity", right: "None" },
                { aspect: "Intra-group balances", left: "ELIMINATED", right: "NOT eliminated — the associate is outside the group" },
                { aspect: "Unrealised profit", left: "Eliminated in FULL", right: "Only the GROUP's SHARE eliminated" },
                { aspect: "Dividends received", left: "Eliminated", right: "Deducted from the carrying amount of the investment" },
                { aspect: "Goodwill", left: "Recognised separately and tested annually", right: "Embedded in the investment; the whole investment is tested as one asset" },
                { aspect: "Impairment reversal", left: "Never for goodwill", right: "Permitted, because it is not an impairment of goodwill as such" },
              ],
            },
          },
        },
        {
          kind: "activity",
          title: "A loss-making associate",
          prompt:
            "An investor holds 25% of an associate, carried at $400,000 at the start of the year. The associate makes losses of $1,800,000 in the year and a further $600,000 the following year, then returns to a profit of $2,000,000 in the third year. The investor has given no guarantees and has no obligation to fund the associate.\n\nWhat does the investor recognise in each of the three years?",
          answer:
            "YEAR 1. The share of losses is 25% × $1,800,000 = $450,000, but the carrying amount is only $400,000. Recognise $400,000, taking the investment to NIL. The remaining $50,000 is NOT recognised, because the investor has no obligation and its exposure is limited to its investment. Keep a memorandum record of the $50,000.\n\nYEAR 2. Share of losses 25% × $600,000 = $150,000. NONE of it is recognised — the investment is already nil. The cumulative unrecognised share is now $50,000 + $150,000 = $200,000.\n\nYEAR 3. Share of profit 25% × $2,000,000 = $500,000. The investor first applies it against the $200,000 of unrecognised losses, and recognises only the excess: $500,000 − $200,000 = $300,000. The investment is carried at $300,000.\n\nThe logic to hold onto: the investor cannot report a gain until the associate has recovered the ground the investor did not report losing.",
        },
      ],
      check: {
        q: "An associate's investment is carried at nil after cumulative losses, with $80,000 of the investor's share of losses unrecognised. The associate then makes a profit of which the investor's share is $200,000. What is recognised?",
        options: ["$120,000", "$200,000", "Nil", "$80,000"],
        correct: 0,
        explain:
          "The share of profit is first applied against the unrecognised losses, so only the excess is recognised: $200,000 − $80,000 = $120,000. The investor cannot report a gain until the associate has recovered the losses the investor did not recognise.",
      },
    },
  ],
  examTraps: [
    { trap: "Consolidating the associate's assets and liabilities line by line.", fix: "The group does not control them. One line, 'investment in associate'." },
    { trap: "Recognising dividends received from the associate as income.", fix: "They reduce the carrying amount of the investment. The share of profit is the income." },
    { trap: "Eliminating the full unrealised profit on a sale to an associate.", fix: "Only the GROUP's share, because only that proportion is unrealised from the group's point of view." },
    { trap: "Eliminating balances with an associate.", fix: "The associate is outside the group, so a receivable from it stays on the face of the statement." },
    { trap: "Recognising an NCI in an associate.", fix: "There is none. The investor recognises only its own share." },
    { trap: "Recognising losses beyond the carrying amount of the investment.", fix: "Stop at nil, unless there is a legal or constructive obligation to fund the associate." },
    { trap: "Presenting the share of profit within operating profit.", fix: "It goes after operating profit, as a separate line, normally before tax." },
    { trap: "Impairing the goodwill within an associate separately.", fix: "The whole investment is tested as a single asset — and that impairment CAN be reversed." },
  ],
  keyTerms: [
    { term: "Equity method", def: "Measuring an investment initially at cost and adjusting it thereafter for the investor's share of the investee's post-acquisition profit or loss and other comprehensive income, less distributions received." },
    { term: "Significant influence", def: "The power to participate in the financial and operating policy decisions of an investee without controlling or jointly controlling those policies." },
    { term: "Share of profit of associate", def: "The investor's percentage of the associate's profit after tax, adjusted for the investor's share of unrealised profit, presented as one line after operating profit." },
    { term: "Unrecognised losses", def: "The investor's share of an associate's losses not recognised because the carrying amount of the investment has reached nil; applied against future profits before any gain is recognised." },
  ],
  summary: [
    "An associate is equity accounted: one line in the statement of financial position and one line in profit or loss.",
    "Investment = cost + group share of post-acquisition profits and OCI − dividends received − group share of unrealised profit − impairment.",
    "Dividends received reduce the investment; they are not income.",
    "Only the GROUP's SHARE of unrealised profit is eliminated, unlike a subsidiary where the full amount is.",
    "Balances with an associate are NOT eliminated, and no NCI arises.",
    "Losses are recognised only down to a nil carrying amount, unless there is an obligation to fund; later profits first absorb the unrecognised losses.",
    "The whole investment, including embedded goodwill, is tested for impairment as one asset — and the impairment may be reversed.",
    "The reason for all of it is that the group has significant influence, not control.",
  ],
  knowledgeDiagnostic: [
    { q: "How is an investment in an associate measured at the reporting date?", a: "Cost plus the group's share of post-acquisition profits and OCI, less dividends received, the group's share of unrealised profit, and any impairment." },
    { q: "How are dividends from an associate treated?", a: "As a reduction of the carrying amount of the investment, not as income." },
    { q: "How much unrealised profit on a sale to an associate is eliminated?", a: "Only the group's share." },
    { q: "Are balances with an associate eliminated?", a: "No — the associate is outside the group." },
    { q: "What happens when an associate's losses exceed the carrying amount of the investment?", a: "Recognition stops at nil unless the investor has a legal or constructive obligation to fund the losses; the unrecognised share is applied against future profits." },
    { q: "Can an impairment of an investment in an associate be reversed?", a: "Yes. The whole investment is tested as a single asset, so it is not an impairment of goodwill as such." },
  ],
  furtherStudy: [
    "Chapter 6 — the control analysis that determines whether an investment is a subsidiary or an associate",
    "Chapter 32 — how an associate affects group ratios, given that its revenue never appears",
    "Chapter 11 — IAS 36, applied to the investment as a single asset",
  ],
}
