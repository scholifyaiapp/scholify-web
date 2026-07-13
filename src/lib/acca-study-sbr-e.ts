import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area E — Interpreting financial statements & current issues.
 * Strategic, evaluative depth: reading group accounts from a user's viewpoint,
 * how accounting policy choices bend the ratios, earnings quality, IFRS 8,
 * IAS 24, and the ISSB / current-issues agenda. Original, syllabus-aligned.
 */

export const SBR_E: StudyChapter = {
  paper: "SBR",
  area: "E",
  title: "Interpreting financial statements & current issues",
  minutes: 17,
  intro: "At SBR the ratios are the easy part. The exam marks live in the judgement above them: which policy choices flattered these numbers, is the profit real, and does the framework itself serve the user reading it?",
  outcomes: [
    "Interpret group financial statements from a user's perspective, not a preparer's",
    "Show how policy choices — revaluation, capitalisation, leases, off-balance-sheet finance — distort headline ratios",
    "Contrast the ratio effects of full consolidation versus the equity method",
    "Assess the quality of earnings and spot the fingerprints of earnings management",
    "Explain the management approach in IFRS 8 and related-party risk under IAS 24",
    "Evaluate the current-issues agenda: ISSB sustainability reporting (IFRS S1 & S2), integrated reporting and management commentary",
  ],
  sections: [
    {
      id: "user-lens",
      heading: "Reading a group through the user's eyes",
      blocks: [
        { kind: "text", md: "A preparer asks *\"is this treatment allowed?\"* A user asks a harder question: *\"what does this business really earn, own and owe — and can I trust the number in front of me?\"* SBR interpretation is written from that second seat. You are handed a set of **group** statements and asked to reach a **judgement** a specific user cares about: a lender worried about repayment, an activist investor probing management's story, an analyst comparing two groups on different policies." },
        { kind: "text", md: "Group accounts add a layer the single-entity papers never had. The numbers are an **aggregation** of a parent and its subsidiaries, stitched together by choices — what to consolidate, what to equity-account, what to revalue, what to capitalise. Each choice is defensible in isolation, yet each one **moves the ratios**. So the skill is not computing a ratio; it is knowing which policy sits behind it and stripping that effect out before you compare." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How a user should read a set of group accounts",
          caption: "The ratios come fourth, not first — context and policy adjustment come before any calculation.",
          data: {
            steps: [
              { label: "Understand the business", sub: "Sector, strategy, group structure, who the user is" },
              { label: "Strip out policy distortions", sub: "Revaluation, capitalising vs expensing, leases, scope" },
              { label: "Compute & benchmark ratios", sub: "Trend, sector, and like-for-like peers" },
              { label: "Assess earnings quality", sub: "Is the profit cash-backed and repeatable?" },
              { label: "Form the user's decision", sub: "Lend / invest / hold — with the caveats stated" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The strategic mindset", md: "A ratio is never an answer — it is a **question**. A gearing of 30% only means something once you know whether leases are on the balance sheet, whether assets are at cost or revalued, and whether an associate's debt is hidden off it." },
      ],
    },
    {
      id: "policy-distortion",
      heading: "How policy choices bend the ratios",
      blocks: [
        { kind: "text", md: "Two groups can be economically identical and report very different ratios purely because of **accounting choices**. The evaluative task is to name the choice, predict its **direction** of effect, and adjust before you compare. The big levers are:" },
        { kind: "table", caption: "The main policy levers and where they land in the ratios", head: ["Choice", "What it does", "Ratio it flatters", "Ratio it worsens"], rows: [
          ["Revalue PPE upwards", "Lifts assets and a revaluation reserve in equity", "Gearing (more equity) → looks lower", "ROCE (bigger capital base) → looks lower"],
          ["Capitalise vs expense a cost", "Moves a cost off P/L onto the SOFP as an asset", "Current-year profit & margin", "Asset turnover; future profit as it is amortised"],
          ["Off-balance-sheet finance", "Keeps debt out of the group SOFP", "Gearing, interest cover", "Faithful representation — the real risk is hidden"],
          ["Equity-account not consolidate", "Nets an investee to one line, hiding its debt", "Gearing, revenue quality", "Comparability with peers that consolidate"],
          ["Longer asset useful life", "Slows depreciation, lifts current profit", "Margin, EPS this year", "Profit in later years; realism of the SOFP"],
        ] },
        { kind: "text", md: "Notice a pattern: almost every choice that flatters one ratio **quietly worsens another**. Upward revaluation cuts gearing but drags ROCE down through a fatter capital base. Capitalising a cost lifts this year's margin but sinks asset turnover and loads future years with amortisation. There is rarely a free lunch — which is exactly why a user must read across ratios, never one in isolation." },
        { kind: "example", title: "Worked example — an upward revaluation moves two ratios at once", scenario: "Zephyr Group reports operating profit of $50m. It is financed by equity of $150m and debt of $100m, so capital employed is $250m. Mid-year it revalues its properties upward by $60m, crediting a revaluation surplus to equity. Nothing about the trade, the cash flows or the borrowings has changed. Recompute ROCE and gearing (debt ÷ equity) before and after.", steps: [
          { label: "ROCE before", detail: "Operating profit ÷ capital employed = 50 ÷ 250 = **20.0%**." },
          { label: "Gearing before", detail: "Debt ÷ equity = 100 ÷ 150 = **66.7%**." },
          { label: "After the revaluation", detail: "Equity rises by $60m to $210m; debt is unchanged at $100m; capital employed becomes 210 + 100 = $310m. Operating profit is still $50m." },
          { label: "ROCE after", detail: "50 ÷ 310 = **16.1%** — the return appears to fall by nearly four points." },
          { label: "Gearing after", detail: "100 ÷ 210 = **47.6%** — the group suddenly looks far less geared." },
        ], result: "One book entry, no change in cash or trade, yet ROCE drops from 20.0% to 16.1% while gearing improves from 66.7% to 47.6%. A user comparing Zephyr to a peer holding property at cost would wrongly conclude Zephyr is both less profitable and safer. The fix: restate both groups onto the same measurement basis before judging either." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Zephyr's ratios before vs after the revaluation",
          caption: "Same business, same cash — the revaluation alone drags ROCE down and gearing down together.",
          data: {
            unit: "%",
            items: [
              { label: "ROCE before", value: 20.0 },
              { label: "ROCE after", value: 16.1 },
              { label: "Gearing before", value: 66.7 },
              { label: "Gearing after", value: 47.6 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Direction, then size", md: "In the exam, always state the **direction** of a distortion before any number. \"Capitalising development costs overstates current profit and understates gearing\" earns the mark even if you never finish the arithmetic." },
      ],
      check: {
        q: "A group revalues its head office upward by $40m, taking the surplus to a revaluation reserve. Operating profit and borrowings are unchanged. What happens to ROCE and to gearing (debt ÷ equity)?",
        options: [
          "Both ROCE and gearing rise",
          "ROCE falls and gearing falls",
          "ROCE rises and gearing rises",
          "Neither ratio changes because it is only a book entry",
        ],
        correct: 1,
        explain: "The surplus lifts equity, so capital employed grows while operating profit is flat — ROCE falls. The same equity rise makes debt ÷ equity smaller, so gearing falls too. It is 'only a book entry', but ratios are built on book figures, so both still move. That twin movement is the trap: the group looks less profitable and less risky at the same time, from a single revaluation.",
      },
    },
    {
      id: "consolidation-vs-equity",
      heading: "Consolidation, the equity method and off-balance-sheet debt",
      blocks: [
        { kind: "text", md: "Where a group draws the **consolidation boundary** may be the single biggest distortion of all. A **subsidiary** (control, usually >50%) is consolidated line-by-line: 100% of its revenue, assets and — critically — its **borrowings** join the group totals, with a non-controlling interest carved out in equity. An **associate** (significant influence, roughly 20–50%) is brought in by the **equity method**: a single \"investment in associate\" line on the SOFP and a single \"share of profit\" line in P/L. The associate's debt never appears." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Same investee, two very different footprints",
          caption: "Consolidation grosses everything up; the equity method nets an investee to a single line — hiding its leverage.",
          data: {
            leftTitle: "Full consolidation (subsidiary)",
            rightTitle: "Equity method (associate)",
            rows: [
              { aspect: "Trigger", left: "Control — usually >50% of votes", right: "Significant influence — ~20–50%" },
              { aspect: "Revenue", left: "100% added line-by-line", right: "Excluded — only share of profit shown" },
              { aspect: "Assets & liabilities", left: "Grossed up 100%, NCI in equity", right: "One net 'investment in associate' line" },
              { aspect: "Debt / gearing", left: "Investee borrowings raise group gearing", right: "Investee debt is invisible — flatters gearing" },
              { aspect: "Margin optics", left: "Diluted by the investee's own margin", right: "Parent margin preserved; profit added below" },
            ],
          },
        } },
        { kind: "text", md: "This is why the boundary is a governance flashpoint. A group that keeps a debt-heavy operation at **49%** and equity-accounts it can run real leverage while reporting slim gearing — a form of **off-balance-sheet finance**. Historically, structured entities, some joint arrangements and, before IFRS 16, operating leases were the classic hiding places. **IFRS 16** closed much of the lease gap by pulling almost all leases on-balance-sheet as a right-of-use asset and a lease liability — so a user comparing modern accounts with older ones, or a lessee-heavy group with an owner, must adjust for the change in geography of that debt." },
        { kind: "callout", tone: "rule", title: "Substance over form", md: "The user's defence against off-balance-sheet finance is the framework's oldest principle: **report the economic substance, not the legal form**. If the group bears the risks and rewards, the item belongs on the balance sheet — however the deal is dressed." },
      ],
      check: {
        q: "A parent holds 45% of a heavily-borrowed distributor and equity-accounts it as an associate. Compared with consolidating it as a subsidiary, what is the effect on the group's reported gearing and revenue?",
        options: [
          "Higher gearing and higher revenue, because the associate is fully added in",
          "Lower gearing and lower revenue, because only a net investment and a share of profit are shown",
          "No effect — the accounting choice cannot change a ratio",
          "Lower gearing but higher revenue, because associates add sales but not debt",
        ],
        correct: 1,
        explain: "The equity method nets the associate to a single 'investment' line and a single 'share of profit' line. Its borrowings never enter group liabilities, so gearing looks lower, and its sales never enter group revenue, so revenue is lower than if it were consolidated. That is precisely how a boundary choice can keep real leverage off the face of the accounts.",
      },
    },
    {
      id: "earnings-quality",
      heading: "The quality of earnings",
      blocks: [
        { kind: "text", md: "Two groups can report the same profit, yet one profit is **worth far more** than the other. **Quality of earnings** asks whether reported profit is **sustainable, cash-backed and free of manipulation** — or whether it is a one-off, an accrual with no cash behind it, or the product of accounting judgement stretched to hit a target. High-quality earnings recur, convert into operating cash, and rest on conservative estimates. Low-quality earnings are lumpy, cash-poor and lean on aggressive assumptions." },
        { kind: "text", md: "**Earnings management** is the deliberate use of judgement to shape the reported number. Its fingerprints are recognisable: revenue pulled forward or recognised too early; provisions created in a good year and released in a bad one to **smooth** profit; a **\"big bath\"** — kitchen-sinking costs into one already-bad period so future years look strong; capitalising costs that should be expensed; and picking the moment of a disposal or revaluation to land a gain when the target needs it." },
        { kind: "table", caption: "Reading the quality behind the profit", head: ["Signal", "Higher quality", "Lower quality"], rows: [
          ["Cash conversion", "Operating cash tracks profit", "Profit rises while operating cash stalls"],
          ["Composition", "Recurring trading profit", "Leans on disposals, revaluations, one-offs"],
          ["Estimates", "Conservative, stable assumptions", "Assumptions loosened to hit a target"],
          ["Revenue timing", "Recognised as earned", "Pulled forward or bill-and-hold"],
          ["Provisions", "Steady, evidence-based", "Built up then released to smooth"],
        ] },
        { kind: "callout", tone: "tip", title: "The cash test", md: "The fastest quality check a user has: compare **operating cash flow** with **profit** over several years. If profit keeps climbing while cash does not follow, the earnings are being made on paper — treat the profit with suspicion." },
      ],
    },
    {
      id: "segments-related",
      heading: "Segment reporting (IFRS 8) and related parties (IAS 24)",
      blocks: [
        { kind: "text", md: "A single group profit hides how a diversified business actually earns. **IFRS 8 Operating Segments** forces disaggregation using the **management approach**: a group reports segments the way its **chief operating decision maker (CODM)** actually reviews the business internally — the same numbers management uses to run it. That is powerful for a user: it aligns the external view with the internal reality and exposes which divisions carry the group and which drain it." },
        { kind: "text", md: "But the management approach cuts both ways. Because segments follow **internal** reporting, they are **not comparable** between groups — two rivals may slice themselves differently — and management chooses the aggregation, so a weak division can be buried inside a stronger reportable segment. A user reads segment disclosure for **trends and internal consistency**, not for cross-company comparison." },
        { kind: "text", md: "**IAS 24 Related Party Disclosures** targets a different risk: transactions that are **not at arm's length**. When a group trades with directors, key management, parents or fellow subsidiaries, the price may be set by the relationship, not the market — so a sale to a related party may inflate revenue, or a loan on soft terms may flatter finance costs. IAS 24 does not ban these deals; it requires them to be **disclosed** — the relationship, the amounts, and outstanding balances — so the user can judge how much of the reported result is genuinely independent." },
        { kind: "callout", tone: "warn", title: "Related-party red flag", md: "A jump in revenue or margin that turns out to rest on **related-party** sales is low quality by definition — the counterparty is not independent, so the price may not be real. Always read the IAS 24 note before trusting a profit surge." },
      ],
      check: {
        q: "Under IFRS 8, on what basis does a group decide which operating segments to report?",
        options: [
          "Whatever splits give the most comparable figures against competitors",
          "The way the chief operating decision maker reviews the business internally — the management approach",
          "By geography only, as required by the IASB",
          "Whichever segmentation minimises the amount that must be disclosed",
        ],
        correct: 1,
        explain: "IFRS 8 uses the management approach: segments mirror the internal reports the CODM uses to allocate resources and assess performance. The strength is alignment with how the business is truly run; the weakness is that, because each group segments to its own internal logic, the disclosures are not comparable across companies.",
      },
    },
    {
      id: "current-issues",
      heading: "Current issues & the IASB agenda",
      blocks: [
        { kind: "text", md: "The biggest shift in corporate reporting is **beyond** the traditional financial statements. Users — especially long-term investors — now want to understand a group's exposure to **sustainability and climate** risk, because those risks feed straight back into future cash flows. The **ISSB** (International Sustainability Standards Board), a sister board to the IASB under the IFRS Foundation, was created to deliver a global baseline for that information." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The current-issues agenda a user should track",
          caption: "Sustainability disclosure sits alongside the accounts; integrated reporting and management commentary tie the story together.",
          data: {
            items: [
              { title: "IFRS S1 — general requirements", sub: "Disclose all sustainability risks & opportunities that could affect the entity's prospects" },
              { title: "IFRS S2 — climate", sub: "Climate-specific: governance, strategy, risk management, metrics & targets (TCFD-aligned)" },
              { title: "The ISSB", sub: "IFRS Foundation board setting the global sustainability disclosure baseline" },
              { title: "Integrated reporting <IR>", sub: "Links financial and non-financial capitals into one value-creation story" },
              { title: "Management commentary", sub: "The narrative — strategy, risks, KPIs — that frames the numbers for users" },
            ],
          },
        } },
        { kind: "text", md: "The two flagship standards work as a pair. **IFRS S1** sets the **general** requirement: disclose the material sustainability-related risks and opportunities that could reasonably affect the entity's cash flows, access to finance or cost of capital — reported over the same period, and connected to, the financial statements. **IFRS S2** is the first **topic-specific** standard, covering **climate**, and is built on the four familiar TCFD pillars: **governance, strategy, risk management, and metrics & targets** (including Scope 1, 2 and, where material, Scope 3 emissions)." },
        { kind: "text", md: "Two related movements complete the picture. **Integrated reporting** (<IR>) tries to connect financial performance with the wider **capitals** — human, intellectual, natural, social — into a single value-creation narrative, so a user sees how non-financial resources drive future returns. **Management commentary** is the narrative front-half of an annual report — strategy, principal risks, KPIs and outlook — which the IFRS Foundation has been revising to give that story more discipline. Both matter to the exam because they change **what a user can rely on**: the reporting framework itself shapes the decision, and a framework that ignored climate or strategy would leave users mispricing risk." },
        { kind: "callout", tone: "key", title: "Why this is evaluative, not descriptive", md: "The mark is not for listing IFRS S1 and S2 — it is for arguing whether the framework **serves the user's decision**. Sustainability disclosure matters precisely because unpriced climate risk becomes tomorrow's impairment, provision or stranded asset. Reporting it early lets users act early." },
      ],
    },
  ],
  examTraps: [
    { trap: "Computing ratios and stopping, without naming the policy behind them.", fix: "State the policy distortion and its direction first — revaluation, capitalisation, lease or scope choice — then adjust before comparing groups." },
    { trap: "Assuming an upward revaluation only improves the ratios.", fix: "It lifts equity, so gearing falls — but capital employed swells, so ROCE falls too. Two ratios move, in opposite-looking directions, from one entry." },
    { trap: "Treating an equity-accounted associate as if its debt were on the group balance sheet.", fix: "The equity method nets it to one line; the associate's borrowings are invisible, so gearing is flattered. A 49% stake can hide real leverage." },
    { trap: "Reading IFRS 8 segments as comparable between companies.", fix: "The management approach mirrors internal reporting, so each group segments differently. Use segments for internal trends, not cross-company benchmarking." },
    { trap: "Listing IFRS S1 and S2 descriptively without evaluating them.", fix: "SBR marks the judgement: argue whether the disclosure improves the user's decision — unpriced climate risk becomes tomorrow's impairment or stranded asset." },
  ],
  keyTerms: [
    { term: "Quality of earnings", def: "The degree to which reported profit is sustainable, cash-backed and free of manipulation, rather than one-off or accrual-heavy." },
    { term: "Earnings management", def: "Deliberate use of accounting judgement — smoothing, big-bath charges, early revenue recognition — to shape the reported profit toward a target." },
    { term: "Off-balance-sheet finance", def: "Structuring so that debt or its risk stays off the group SOFP, flattering gearing and interest cover; countered by the substance-over-form principle." },
    { term: "Management approach (IFRS 8)", def: "Reporting operating segments the way the chief operating decision maker reviews the business internally, aligning external disclosure with internal reality." },
    { term: "Related party (IAS 24)", def: "A person or entity able to control or influence the group — directors, key management, parents, fellow subsidiaries — whose transactions may not be at arm's length and must be disclosed." },
    { term: "IFRS S1 & S2 (ISSB)", def: "The ISSB's sustainability disclosure standards: S1 sets the general requirement for material sustainability risks; S2 covers climate on the TCFD pillars of governance, strategy, risk management, and metrics & targets." },
  ],
  summary: [
    "Interpret group accounts from the user's seat: understand the business and strip out policy distortions before computing any ratio.",
    "Policy choices bend ratios in opposite directions — an upward revaluation cuts gearing but also cuts ROCE; capitalising a cost lifts margin but sinks asset turnover.",
    "The consolidation boundary is decisive: a consolidated subsidiary grosses up debt and revenue, while an equity-accounted associate hides both, enabling off-balance-sheet leverage.",
    "Judge earnings quality by cash conversion, composition and estimate discipline; watch for smoothing, big baths and related-party sales.",
    "Current issues shift reporting beyond the accounts: IFRS 8's management approach, IAS 24 disclosure, and the ISSB's IFRS S1 & S2 sustainability standards all reshape what a user can rely on.",
  ],
}
