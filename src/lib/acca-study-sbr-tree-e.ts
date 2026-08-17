import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area E — Interpret financial and non-financial information for
 * different stakeholders.
 *
 * Section B of every SBR exam contains a full question, or part of one,
 * requiring a stakeholder perspective — and this area is its toolkit. The shim
 * served it with the legacy interpretation chapter minus one section.
 *
 *   SBR-32  Analysis from the stakeholder's chair            (E1a)
 *   SBR-33  Segment reporting, and what it lets users see    (E1b)
 *   SBR-34  The quality of the information itself            (E1c)
 *
 * Written against the official ACCA SBR-INT syllabus and study guide for
 * September 2026 to June 2027. Not derived from any approved-provider text.
 * House style: every technique is taught FROM a named stakeholder's decision —
 * the syllabus asks for perspectives, and generic ratio tours score nothing.
 */

const SBR_TREE_32: StudyChapter = {
  paper: "SBR",
  id: "SBR-32",
  number: 32,
  area: "E",
  syllabusRefs: ["E1(a)"],
  title: "Analysis from the stakeholder's chair",
  minutes: 17,
  intro:
    "SBR never asks 'analyse these statements' — it asks what the lender, the incoming investor or the pension trustee should conclude. The same numbers answer different questions from different chairs, and the marks follow the chair, not the ratio.",
  outcomes: [
    "Anchor every analysis in a named stakeholder's decision, and select indicators that serve it",
    "Use EPS and diluted EPS as investor indicators, knowing their construction and their limits",
    "Read management-defined and additional performance measures with the IFRS 18 discipline",
    "Adjust reported figures before comparing — the analyst's standard corrections",
    "Integrate non-financial indicators where the stakeholder's decision actually turns on them",
    "Write the Section B stakeholder answer: conclusion first, evidence quantified, limits admitted",
  ],
  sections: [
    {
      id: "the-chair",
      heading: "Whose decision? The chair before the arithmetic",
      blocks: [
        {
          kind: "text",
          md: "Analysis starts with the decision, because the decision selects the evidence. A **lender** pricing a five-year facility cares about cash coverage, security and the distance to covenant breach — profit growth matters only as it feeds those. An **equity investor** buying a stake cares about sustainable earnings, their conversion to cash, and what the growth story costs. A **pension trustee** assessing covenant strength reads the employer's ability to fund the deficit through a downturn. A **supplier** extending credit reads short-term liquidity and its own concentration risk. Same statements, four different readings — and an answer that runs 'profitability, liquidity, gearing' without a chair reads like the textbook the examiner has already read.",
        },
        {
          kind: "table",
          caption: "Chairs, decisions, and the indicators that serve them",
          head: ["Stakeholder", "Decision", "The indicators that matter — and why"],
          rows: [
            ["Lender", "Advance, price, covenant", "Interest cover on cash measures; net debt/EBITDA with IFRS 16 and pension debt included; asset backing net of goodwill; headroom to each covenant"],
            ["Equity investor", "Buy, hold, sell; price", "EPS and its quality; operating cash conversion; MPM adjustments reversed; returns on capital against its cost"],
            ["Pension trustee", "Funding demands, security", "Deficit against market capitalisation; free cash flow after dividends; priority of claims"],
            ["Employee / union", "Security, bargaining", "Segment viability, cash generation of their site, the cost base's structure"],
            ["Government / regulator", "Tax, licence, intervention", "Effective tax rate versus statutory; related-party extraction; jurisdiction of profits"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three-move answer pattern",
          md: "Every Section B interpretation answer runs the same three moves per point: **compute** the indicator from the exhibit (or take it as given), **read** it from the named chair — what does this number do to *their* decision — and **qualify** it: the accounting choice, one-off or classification that could move it. Move two is where the marks concentrate and where weak answers stop after move one.",
        },
      ],
      check: {
        q: "An entity's profit doubled; operating cash flow fell 40%; receivables days rose from 45 to 90. A lender and a bonus-hunting sales director both read the results. Which reading is analysis?",
        options: [
          "Both agree performance improved — profit doubled",
          "The lender's: profit growth built on doubled collection periods is revenue recognised ahead of cash, so debt service capacity fell while 'performance' rose — the divergence is the finding, and the direction of the receivables build says whether growth or recognition drove it",
          "The director's: cash timing is irrelevant to performance",
          "Neither — one year proves nothing",
        ],
        correct: 1,
        explain:
          "The profit–cash divergence is the single most reliable earnings-quality signal (SBR-02's toolkit read from the other side): sales exist, cash does not, and the doubled receivables days locate the gap. From the lender's chair the deterioration is the decision-relevant fact. Option 3 gestures at a real limit — trends beat snapshots — but the within-year divergence is itself evidence.",
      },
    },
    {
      id: "eps-and-mpms",
      heading: "EPS, diluted EPS, and the measures management prefers",
      blocks: [
        {
          kind: "text",
          md: "**Basic EPS** — profit attributable to ordinary equity holders of the parent, divided by the weighted average ordinary shares outstanding — is the investor's standardised per-share result, and the denominator does the interesting work: issues at full price weight from their date; **bonus issues and splits** restate all periods (no resources arrived, only more paper); **rights issues** carry a bonus element (the discount) requiring the bonus-factor adjustment to comparatives. **Diluted EPS** re-runs the fraction as if convertibles had converted (adding back their after-tax interest) and options had been exercised (the treasury-stock method counting only the 'free' shares the discount implies) — including **contingently issuable shares** where the conditions stand satisfied. Only dilutive potential shares enter; antidilutive ones stay out.",
        },
        {
          kind: "text",
          md: "The investor's uses and their limits, both examinable: EPS standardises across capital structures and feeds the P/E multiple — but it is **profit-based** (every earnings-quality problem passes straight through), **per-share not per-dollar** (buybacks raise EPS while shrinking the business, a favourite bonus-target game), and blind to *how much capital* produced the earnings. Diluted EPS is the forward warning: a large basic-to-diluted gap prices in the overhang of convertibles and options before conversion happens.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "MPMs and APMs — the discipline travels here",
          md: "SBR-23 built the IFRS 18 MPM machinery; Area E uses it. The analyst's routine for any 'adjusted' measure: reconcile it to the defined IFRS subtotal; test each add-back for **recurrence** (fourth 'exceptional' restructuring?) and **symmetry** (gains excluded too?); check **definitional drift** across periods; and weigh **prominence** — which number leads the narrative versus which the statements define. A widening gap between adjusted and IFRS profit, growing add-backs, and a shifting definition is a management-credibility finding, not just an accounting one.",
        },
        {
          kind: "text",
          md: "**Non-financial indicators** enter where the chair's decision turns on them: subscriber growth and churn for a platform's investor (revenue is the lagging indicator), safety statistics for a regulator, emissions intensity for a lender pricing transition risk into a facility's margin, employee turnover for the going-concern of a people business. The discipline is the same as for MPMs — definition, consistency, assurance — because unaudited operational metrics are even easier to curate than adjusted profit.",
        },
      ],
      check: {
        q: "An entity's basic EPS rose 12%. During the year it bought back 8% of its shares, funded by new debt; operating profit was flat. What should an investor conclude?",
        options: [
          "Earnings performance improved 12%",
          "The EPS growth is denominator engineering: flat operating profit spread over fewer shares, bought with leverage — per-share 'growth' without business growth, at the cost of higher financial risk; the reading is a capital-allocation choice, and if EPS feeds bonuses, an incentive-driven one",
          "The buyback is irrelevant to EPS",
          "EPS should be recomputed excluding the buyback",
        ],
        correct: 1,
        explain:
          "The weighted-average denominator fell ~8% while the numerator (flat operations, higher interest) barely moved — the '12% growth' is arithmetic, and the balance sheet paid for it. This is move-two analysis: the computation is correct, the reading is what matters, and the bonus-target link is the direction test applied to capital allocation. Option 3 misunderstands EPS — the buyback genuinely changes the per-share claim; the point is to say what changed it.",
      },
    },
    {
      id: "adjusting-and-writing",
      heading: "The analyst's corrections, and writing the answer",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Standard corrections before any comparison",
          items: [
            "**Normalise the one-offs both ways** — strip disposal gains AND 'exceptional' costs that recur; the symmetric strip is what distinguishes analysis from the entity's own MPM",
            "**Put the debt back** — pension deficits, supplier finance stretched beyond trade terms, and share of associate debt where guarantees make it real (SBR-30's look-through)",
            "**Undo policy differences between comparators** — revaluation versus cost, capitalisation choices, depreciation lives; comparability is manufactured, not assumed",
            "**Reweight for currency and acquisitions** — organic versus acquired growth (SBR-29's decomposition), constant-currency where translation drives the trend",
            "**Read OCI and the reserves** — persistent one-signed OCI (SBR-08) and a swelling translation reserve are performance the P&L has not yet admitted",
          ],
        },
        {
          kind: "illustration",
          title: "One adjustment changing the decision",
          md: "A borrower shows net debt/EBITDA of 2.1× against a 3.0× covenant — comfortable. The analyst adds the pension deficit ($180m, being funded over seven years), reverses the supplier-finance reclassification ($90m of 'trade payables' at 210-day terms), and strips the disposal gain from EBITDA. The ratio lands at 3.2×. Nothing was misstated: every element was disclosed, individually compliant, separately defensible. The lender's decision reverses anyway — which is the deepest lesson of this area: compliant statements still need reading, and the notes are where the reading happens.",
        },
        {
          kind: "examQuestion",
          title: "Advise a stakeholder on an entity's performance and position",
          format: "written",
          marks: 12,
          requirement: "Prepare a report for the bank advising whether the covenant renegotiation should be granted, using the financial statements and the additional information provided.",
          plan: [
            { step: "Open with the conclusion", detail: "The bank wants an answer: grant, refuse, or grant-with-conditions — stated in the first sentence and defended after." },
            { step: "Select three or four decision-relevant indicators", detail: "Coverage, adjusted leverage, cash conversion, covenant headroom — computed from the exhibit, not a ratio tour." },
            { step: "Make the corrections and show them", detail: "Pension debt in, supplier finance reclassified, one-offs symmetrically stripped — each with its number and one line of why." },
            { step: "Read the quality signals", detail: "Profit–cash divergence, MPM drift, OCI pattern — what management's presentation choices themselves reveal." },
            { step: "Close with terms", detail: "The conditions that would make the risk acceptable: security, information covenants, a tighter definition of the ratio." },
          ],
          answer:
            "The renegotiation should be granted only with a redefined covenant and enhanced security, because on the bank's own measure the group is closer to its limit than the reported figures suggest.\n\nReported net debt to EBITDA of 2.3× against the 3.0× covenant appears comfortable, but three corrections close most of the gap. The $150m pension deficit is debt in substance — the schedule of contributions is committed cash the bank ranks behind — taking the ratio to 2.8×. The supplier finance programme has extended $70m of payables to terms no supplier grants; treated as borrowing, leverage reaches 3.0×. And this year's EBITDA includes an $18m warehouse disposal gain while excluding, as 'exceptional', restructuring costs incurred in each of the last four years; stripping both symmetrically leaves underlying cover at the covenant boundary.\n\nThe quality signals point the same way. Operating profit rose 9% while operating cash fell 6%, with receivables days up a third — growth is being recognised faster than it is being collected. The group's adjusted profit measure has been redefined twice in three years, each time favourably, and the gap between it and the IFRS result has widened annually — a pattern that speaks to the reliability of management's projections in the renegotiation case.\n\nThe bank's terms should therefore: redefine the covenant to include pension deficit and supplier finance in net debt and to exclude disposal gains from EBITDA; take the fixed charge over the distribution assets currently unencumbered; and require quarterly reporting of the reconciliation between adjusted and IFRS measures. On those terms the facility prices the true position; on the current definitions the covenant would be reporting headroom that does not exist.",
          earns: [
            "A committed recommendation in the opening line",
            "Each correction quantified with its rationale",
            "Quality signals read as evidence about management, not just numbers",
            "Terms that connect the analysis to the decision",
          ],
          loses: [
            "A ratio tour with no chair and no conclusion",
            "Corrections asserted without numbers",
            "Treating disclosed-but-adjustable items as misstatements",
            "Ending with 'further information would be required'",
          ],
        },
      ],
      check: {
        q: "Why does the symmetric strip — removing one-off gains AND recurring 'exceptionals' — matter more than either adjustment alone?",
        options: [
          "It produces a lower profit figure, which is prudent",
          "Because one-way adjustment is the entity's own MPM game in mirror image: analysis earns its authority by correcting in both directions, so the resulting measure reflects the business rather than either party's preferred story",
          "It is required by IFRS 18",
          "It maximises comparability with competitors",
        ],
        correct: 1,
        explain:
          "The analyst's credibility rests on the same neutrality the Framework demands of preparers (SBR-05): strip only the flattering items and the 'underlying' measure is just pessimism with a method. Symmetry is also diagnostic — if the symmetric strip moves the number much further than the entity's own adjustments did, the entity's adjustments were directional, and that finding outranks the number.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Analysing without a chair.",
      fix: "Name the stakeholder and their decision in the first line; select indicators that serve it and discard the rest.",
    },
    {
      trap: "Computing ratios on reported figures across entities or periods that do not compare.",
      fix: "Correct first: policies, one-offs both ways, hidden debt, acquisition and currency effects — then compare.",
    },
    {
      trap: "Reading EPS growth as business growth.",
      fix: "Check the denominator: buybacks, and the weighted-average mechanics of issues, move EPS without moving the business.",
    },
    {
      trap: "Concluding with 'it depends' or a request for more information.",
      fix: "The stakeholder needs a decision: commit, then attach the conditions that manage the residual uncertainty.",
    },
  ],
  keyTerms: [
    { term: "Basic earnings per share", def: "Profit attributable to the parent's ordinary shareholders over the weighted average ordinary shares in issue — with bonus elements restated retrospectively." },
    { term: "Diluted earnings per share", def: "EPS recomputed as if dilutive convertibles, options and contingently issuable shares had converted — the overhang warning." },
    { term: "Treasury stock method", def: "The dilution computation for options: assumed exercise proceeds buy back shares at average market price, and only the shortfall dilutes." },
    { term: "Cash conversion", def: "Operating cash flow relative to operating profit — the standing test of whether earnings are collecting." },
    { term: "Look-through leverage", def: "Group leverage recomputed to include pension deficits, in-substance borrowings and guaranteed or dependent off-balance-sheet debt." },
  ],
  summary: [
    "The chair selects the evidence: name the stakeholder's decision before the first ratio.",
    "Compute, read from the chair, qualify — and the middle move is where the marks are.",
    "EPS is standardised, profit-based and denominator-sensitive: read its growth against buybacks and dilution overhang.",
    "MPMs get the four tests — reconciliation, recurrence, symmetry, drift — and non-financial metrics get the same.",
    "Correct before comparing, both directions; conclude with a decision and the terms that manage what remains uncertain.",
  ],
  knowledgeDiagnostic: [
    { q: "How do a lender's and an investor's readings of the same statements differ?", a: "The lender reads downside: cash coverage, covenant distance, security net of goodwill. The investor reads the future: sustainable earnings, their cash conversion, returns on capital against cost — growth's value rather than debt's safety." },
    { q: "Why do bonus issues restate comparatives while full-price issues do not?", a: "A full-price issue brings resources that earn from its date — time-weighting reflects that. A bonus issue adds shares with no resources, so all periods restate to keep the per-share series comparable." },
    { q: "State the four MPM tests.", a: "Reconcile to the defined IFRS subtotal; test add-backs for recurrence; test for symmetry between excluded gains and costs; and track definitional drift across periods — with prominence as the surrounding question." },
    { q: "Name three corrections that move leverage ratios most.", a: "Pension deficits into net debt; supplier finance beyond trade terms reclassified from payables to borrowings; and one-off gains out of the EBITDA denominator — with look-through to guaranteed associate debt where real." },
  ],
  furtherStudy: [
    "SBR-33 adds the segment lens — where the group total hides the divisions",
    "SBR-34 turns from the numbers to the information's own quality",
    "SBR-23 built the MPM machinery this chapter's tests run on",
    "SBR-29's organic-versus-acquired decomposition is the growth correction in cash form",
  ],
}

const SBR_TREE_33: StudyChapter = {
  paper: "SBR",
  id: "SBR-33",
  number: 33,
  area: "E",
  syllabusRefs: ["E1(b)"],
  title: "Segment reporting, and what it lets users see",
  minutes: 15,
  intro:
    "A group total is an average, and averages hide the businesses inside it. Segment reporting breaks the total apart on management's own lines — which is both its value (you see what the board sees) and its vulnerability (you see only what the board sees).",
  outcomes: [
    "Apply the management approach: operating segments from the CODM's own reporting",
    "Aggregate and test segments against the quantitative thresholds and the 75% floor",
    "Read segment disclosures the way an analyst does — mix, trend, and cross-subsidy",
    "Use the entity-wide disclosures: products, geography, and customer concentration",
    "Evaluate the management approach's trade-offs, including comparability and commercial-sensitivity objections",
    "Connect segment data to stakeholder decisions — the divisional lens on every Area E question",
  ],
  sections: [
    {
      id: "management-approach",
      heading: "The management approach — segments as the board sees them",
      blocks: [
        {
          kind: "text",
          md: "An **operating segment** is a component that earns revenues and incurs expenses, whose results are **regularly reviewed by the chief operating decision maker** to allocate resources and assess performance, and for which discrete financial information exists. The **CODM** is a function — the board, an executive committee, a CEO — identified by what it does, not its title. The consequence is the standard's signature: segments are reported **as management runs the business**, measured **on the numbers management actually uses** — even where those are non-IFRS internal measures — with reconciliations back to the consolidated totals.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "From operating segments to reportable ones",
          items: [
            "**Aggregation** — segments may combine only with similar economic characteristics AND similarity across products, processes, customers, distribution and regulation; 'similar' is where the games live",
            "**Size tests** — report any segment at 10%+ of combined revenue (external plus inter-segment), of the higher of combined profits or combined losses, or of combined assets",
            "**The 75% floor** — reportable segments' external revenue must cover 75% of entity revenue; add segments until it does",
            "**'All other segments'** collects the remainder — and its size is worth watching",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the management approach won",
          md: "The alternative — a standardised industry/geography matrix — produced comparable-looking segments that matched nobody's actual business. The management approach trades comparability for **authenticity**: users see the units the board steers, on the measures it steers by, at the cost that two similar groups may segment quite differently and that internal measures need reading with the same scepticism as MPMs (SBR-23). An evaluation answer gives both sides and lands on what the user can actually do: read the reconciliation.",
        },
      ],
      check: {
        q: "A group's board pack reviews five divisions monthly. Its annual report presents one segment, 'diversified industrials', citing integrated management. What is the challenge?",
        options: [
          "None — segmentation is a management judgement",
          "The CODM demonstrably reviews five discrete components — the board pack is the evidence — so five operating segments exist; presenting one requires aggregation, which demands similar economic characteristics across all five, implausible for a 'diversified' group and testable against their margins and trends",
          "Six segments are required, including head office",
          "One segment is correct if the divisions share customers",
        ],
        correct: 1,
        explain:
          "The management approach cuts both ways: the same board pack that runs the business defines the segments, and 'integrated management' cannot un-review what the CODM reviews. The aggregation criteria are conjunctive and evidence-based — five divisions diverse enough to brand as 'diversified' rarely share long-term margin profiles. The motive is usually a weak division the average conceals.",
      },
    },
    {
      id: "reading-segments",
      heading: "Reading the segment note — the analyst's divisional lens",
      blocks: [
        {
          kind: "text",
          md: "The segment note converts every group-level technique into a divisional one. **Mix analysis**: a stable group margin can hide a rising low-margin segment drowning a shrinking high-margin one — the trend is invisible in the total and obvious in the note. **Cross-subsidy**: one segment's cash funding another's losses, with the group total reporting the net calm. **Capital allocation**: segment assets and capex against segment returns show where management is actually placing the money — against where the narrative says. **Inter-segment pricing**: internal revenue at non-market transfer prices moves profit between segments, and the eliminations column is where the note admits how much of 'segment revenue' the group did with itself.",
        },
        {
          kind: "illustration",
          title: "The average that answered the wrong question",
          md: "A lender assesses a group on its 12% operating margin and steady revenue. The segment note shows: logistics (70% of revenue) at 4% and falling; software (20%) at 38% and growing; 'other' absorbing rising central costs. The lender's security is over the logistics fleet; the covenant references group EBITDA. The group average — weighted two ways at once — describes neither the collateral's business (deteriorating) nor the earnings engine (a different, asset-light division whose value walks out of the door). The segment note did not add information to the statements; it made the statements answer the lender's actual question.",
        },
        {
          kind: "text",
          md: "The **entity-wide disclosures** apply even to single-segment entities: revenue by **product and service** group; revenue and non-current assets by **geography** (country of domicile versus foreign, material countries separately); and **major customer** dependence — any customer at 10%+ of revenue, disclosed by segment though not by name. The customer test is the concentration-risk shortcut: a supplier chair (SBR-32) reads a 34% single-customer disclosure as the difference between a diversified debtor and a dependent one.",
        },
      ],
      check: {
        q: "A group reports steady 15% growth. Its segment note shows domestic revenue flat for three years and one export segment growing 60% annually — now 45% of revenue — with a single customer at 30% of group revenue in that segment. What has the note added for an investor?",
        options: [
          "Nothing — growth is growth wherever it arises",
          "The growth's location and fragility: the story is one segment, one customer, one geography — concentration the group trend conceals; the investor prices the dependence (and checks the customer's own health), where the group total invited pricing a diversified grower",
          "Confirmation that the domestic business should be sold",
          "That transfer pricing inflates the export segment",
        ],
        correct: 1,
        explain:
          "Decomposition converts a quality-of-growth question from unanswerable to priced: 60% growth concentrated in one relationship is a different asset from 15% spread across a portfolio, and the major-customer disclosure exists precisely to force that visibility. Options 2 and 3 leap past the evidence — the note raises the questions; the analyst asks them before concluding.",
      },
    },
    {
      id: "limits-and-critique",
      heading: "The limits — and the honest evaluation",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Where segment reporting underdelivers",
          items: [
            "**Comparability** — self-defined segments measured on internal bases differ across groups and across time; resegmentation restates comparatives but breaks longer histories",
            "**Aggregation games** — weak units folded into strong 'similar' ones; the diversity of what 'similar' hides is the recurring enforcement issue",
            "**Measure management** — segment profit on an internal basis can exclude central costs, share-based pay or impairments; the reconciliation shows the wedge, if read",
            "**Commercial sensitivity** — entities argue disclosure aids competitors; the standard offers no exemption, and the objection often correlates with what investors most want to see",
            "**The unallocated column** — central items parked outside segments can flatter every segment at once",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The reconciliation is the audit trail",
          md: "Whatever internal measures the segments use, the totals must reconcile to the IFRS statements — and the reconciling items are the analysis: what management's own view of divisional performance excludes (impairments? restructuring? pension costs?) is a list of what management prefers not to own divisionally. Read it the way SBR-23 reads MPM add-backs; it is the same behaviour one level down.",
        },
      ],
      check: {
        q: "A group's segment note shows every segment profitable, on an internal measure excluding 'central items' of $210m — impairments, share-based pay and restructuring — which turn group profit into a loss. What is the correct reading?",
        options: [
          "The segments are genuinely profitable and the centre is inefficient",
          "The internal measure has been defined to exclude the costs of running and correcting the businesses: the impairments and restructurings belong to segment decisions, and their exclusion makes every division look better than the group they compose — the reconciliation is where the note confesses it",
          "The disclosure breaches IFRS 8, which requires IFRS measures",
          "The group should reallocate central costs by revenue",
        ],
        correct: 1,
        explain:
          "The management approach permits the internal measure (option 2 is wrong), but permits it visibly: a $210m wedge between 'all segments profitable' and a group loss is the finding, and asking *whose* impairments those were converts it into divisional truth. Option 3's mechanical reallocation is one fix, but the analytical skill is reading the wedge, not redesigning the pack.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Testing segmentation against the org chart or the industry, not the CODM's pack.",
      fix: "What the CODM regularly reviews defines the operating segments; the evidence is the internal reporting itself.",
    },
    {
      trap: "Accepting aggregation because products are 'related'.",
      fix: "The criteria are conjunctive and economic: dissimilar margins and trends defeat 'similarity' whatever the products share.",
    },
    {
      trap: "Analysing segment profit as if it were IFRS profit.",
      fix: "Check the measure's basis and read the reconciliation — the excluded items are management's divisional disowning.",
    },
    {
      trap: "Ignoring the entity-wide disclosures.",
      fix: "Geography and the 10% customer test carry the concentration story even where segments do not.",
    },
  ],
  keyTerms: [
    { term: "Operating segment", def: "A revenue-and-expense-earning component whose discrete results the chief operating decision maker regularly reviews for resource allocation and performance." },
    { term: "Chief operating decision maker", def: "The function — board, committee or individual — that allocates resources to and assesses the performance of the segments; identified by role, not title." },
    { term: "Reportable segment", def: "An operating segment (or permitted aggregation) meeting a 10% size test, with additions until external revenue coverage reaches 75%." },
    { term: "Entity-wide disclosures", def: "Product, geographic and major-customer (10%+) information required regardless of segment structure." },
    { term: "Segment reconciliation", def: "The mandatory bridge from segment measures to the consolidated IFRS totals — where internally excluded items become visible." },
  ],
  summary: [
    "Segments are what the CODM reviews, measured as the CODM measures — authentic by design, comparable only with effort.",
    "Size tests and the 75% floor decide reportability; aggregation's 'similarity' is where weakness hides.",
    "The note converts every group technique to divisional: mix, cross-subsidy, capital allocation, transfer pricing.",
    "Entity-wide disclosures carry geography and customer concentration even for one-segment entities.",
    "Read the reconciliation like an MPM: the internally excluded items are the divisional story management declined to tell.",
  ],
  knowledgeDiagnostic: [
    { q: "What three features define an operating segment?", a: "It engages in activities earning revenues and incurring expenses; the CODM regularly reviews its results for allocation and assessment; and discrete financial information is available for it." },
    { q: "State the size tests and the floor.", a: "Report at 10% of combined revenue including inter-segment, of the higher of aggregate profits or aggregate losses, or of combined assets — then add segments until reportable external revenue reaches 75% of the entity's." },
    { q: "Why may segment measures differ from IFRS, and what protects the user?", a: "The standard reports the CODM's own measures for authenticity; the mandatory reconciliation to consolidated totals exposes what those measures exclude." },
    { q: "Which disclosure catches customer concentration, and at what line?", a: "Entity-wide major-customer disclosure: any single customer contributing 10% or more of revenue, with the amount and the segments involved — identity not required." },
  ],
  furtherStudy: [
    "SBR-32's chairs each have a divisional version — run them through the note",
    "SBR-23's MPM tests transfer to internal segment measures wholesale",
    "SBR-12's CGU-level questions often shadow segment structure",
    "SBR-34 asks whether the segment story and the narrative reporting agree",
  ],
}

const SBR_TREE_34: StudyChapter = {
  paper: "SBR",
  id: "SBR-34",
  number: 34,
  area: "E",
  syllabusRefs: ["E1(c)"],
  title: "The quality of the information itself",
  minutes: 16,
  intro:
    "The final analytical move is a level up: not what the numbers say, but whether the information deserves the weight the decision puts on it. Earnings quality, the management commentary's honesty, and the coherence of financial and sustainability reporting are all assessable — and the syllabus asks you to assess them.",
  outcomes: [
    "Appraise earnings quality from accrual patterns, estimate leverage and presentation choices",
    "Evaluate management commentary against the qualities that make narrative reporting useful",
    "Assess disclosures produced under IFRS Accounting Standards for boilerplate, obscuring and drift",
    "Appraise sustainability-related disclosures under IFRS S1 and S2 as investor information",
    "Test connectivity: whether the narrative, the sustainability story and the financial statements describe the same entity",
    "Weight information by its quality in a stakeholder recommendation",
  ],
  sections: [
    {
      id: "earnings-quality",
      heading: "Earnings quality — the composite judgement",
      blocks: [
        {
          kind: "text",
          md: "High-quality earnings are **cash-backed, recurring, and measured with neutral judgement** — they will still be there next year, on assumptions a stranger would make. The assessment is composite: **accrual intensity** (profit persistently outrunning operating cash — SBR-32's divergence, read cumulatively); **estimate leverage** (how much of profit rests on level-3 fair values, ECL overlays, pension assumptions and provision releases — the SBR-12/16/18 assumption audits aggregated); **recurrence** (disposal gains, reclassification-day remeasurements, one-off credits inside 'operating'); and **direction** (the SBR-01 test at portfolio scale: do the judgements cluster on the flattering side?).",
        },
        {
          kind: "list",
          style: "bullet",
          title: "A working earnings-quality screen",
          items: [
            "Cumulative three-year operating cash versus cumulative operating profit — the gap is the accrual mountain",
            "Provision and allowance movements: releases feeding profit in tight years",
            "Estimate changes disclosed under IAS 8 — direction and timing against covenants and targets",
            "One-off items inside versus outside the entity's own adjusted measure — the asymmetry census",
            "Revenue recognition against the business model: over-time judgements, principal/agent, channel terms (SBR-09/10)",
            "OCI's sign and size — the parked performance (SBR-08), and reserves with disposal-day fuses (SBR-31)",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Quality is a discount rate, not a verdict",
          md: "The output of an earnings-quality assessment is rarely 'fraud' — it is a **weighting**: how much of this profit would survive a change of management, an audit challenge, or a downturn? A stakeholder answer uses it that way: 'of the $200m reported, roughly $60m rests on estimate releases and non-recurring credits; the bank should covenant on the remainder'. Quantified scepticism beats adjectival suspicion every time.",
        },
      ],
      check: {
        q: "Entity A: profit $100m, operating cash $95m, no estimate changes, adjusted profit equals IFRS profit. Entity B: profit $100m, operating cash $60m, three favourable estimate changes, adjusted profit $130m. What can an analyst conclude?",
        options: [
          "The entities performed identically — both earned $100m",
          "A's $100m is materially higher quality: cash-backed, estimate-light and presented without adjustment, so it can be projected and covenanted on largely as reported; B's rests on accruals and favourable judgement, and both its level and its trend deserve a discount",
          "B performed better — its adjusted profit is higher",
          "B's accounts must be misstated",
        ],
        correct: 1,
        explain:
          "Identical bottom lines, different information content: A's figure is evidence about the business; B's is partly evidence about management. Nothing in B is necessarily wrong (option 3 overshoots) — the analyst's job is the weighting, and B's own adjusted measure pointing 30% above an already cash-light IFRS figure is the direction test failing at the presentation layer too.",
      },
    },
    {
      id: "commentary-and-disclosure",
      heading: "Management commentary, and disclosure quality",
      blocks: [
        {
          kind: "text",
          md: "**Management commentary** — the narrative through management's eyes — is decision-useful when it explains the drivers of performance and position, the **resources and relationships** the statements cannot capture, the **strategy and its progress against previously stated targets**, and the **principal risks with their actual management** — entity-specific, forward-looking, and consistent with the financial statements it accompanies. The quality tests are behavioural: does this year's commentary **acknowledge last year's promises**? Do the risks **change** when the business does, or roll forward untouched? Is bad news **explained with mechanisms** or absorbed into 'challenging conditions'? A commentary that reads identically for any entity in the sector is disclosure-shaped filler.",
        },
        {
          kind: "text",
          md: "Disclosure quality inside the statements gets the same audit: **boilerplate versus entity-specific** (SBR-07's two goodwill sensitivity notes); **obscuring** — material judgements scattered, standardised, or buried in immaterial detail (the materiality failure SBR-05 named); **drift** — policies and definitions that shift when shifting helps; and **completeness against the story** — an entity narrating 'transformational digital investment' whose intangibles note shows nothing capitalised is telling two stories, and the gap is the finding. The analyst's rule: the notes are where compliant statements confess; read them before the primary statements, not after.",
        },
        {
          kind: "illustration",
          title: "Reading a risk disclosure against events",
          md: "An entity's principal-risk disclosure has listed 'cyber security' with identical wording for four years. In year five, a breach costs $40m. The commentary calls it 'unforeseeable'. The four identical paragraphs are now evidence — the risk was foreseen annually, in writing; what failed was the management the disclosure claimed. The skill this area rewards is exactly that cross-reading: narrative claims are testable against the statements, against prior narratives, and against what happened.",
        },
      ],
      check: {
        q: "For three years an entity's commentary promised margin recovery from an 'efficiency programme'; margins fell each year, and this year's commentary introduces a new programme without mentioning the old one. What should an analyst do with the new promise?",
        options: [
          "Model it as disclosed — management knows its business",
          "Discount it heavily and say why: the commentary has a track record, and unacknowledged prior failure is evidence about forecast reliability itself — the analyst prices management's guidance credibility, not just the programme",
          "Ignore all narrative reporting as marketing",
          "Report the entity to the regulator",
        ],
        correct: 1,
        explain:
          "Commentary accumulates a record the way estimates do, and the quality test is acknowledgement: management that audits its own past promises earns forecast weight; management that silently replaces them has told you how to weight the replacement. Option 2 discards genuinely useful information — the skill is calibrated weighting, evidenced from the document's own history.",
      },
    },
    {
      id: "sustainability-and-connectivity",
      heading: "Sustainability information, and the connectivity test",
      blocks: [
        {
          kind: "text",
          md: "**IFRS S1** requires disclosure of sustainability-related risks and opportunities that could reasonably be expected to affect the entity's **prospects** — cash flows, access to finance, cost of capital — over the short, medium and long term, structured around **governance, strategy, risk management, and metrics and targets**, prepared for the same **primary users** as the financial statements. **IFRS S2** applies that architecture to climate: transition and physical risks, scenario-resilience analysis, greenhouse gas emissions across the three scopes, and progress against any targets. This is **investor information, not advocacy**: the test throughout is financial materiality to the entity's prospects — which is also the sharpest examinable contrast with **ESRS double materiality** (Area F's territory).",
        },
        {
          kind: "text",
          md: "**Connectivity** is the assessable edge the syllabus points at: the sustainability disclosures and the financial statements must describe **the same entity making the same assumptions**. An entity disclosing a credible 2035 transition plan while its financial statements depreciate carbon-intensive plant over thirty years, test goodwill on cash flows without carbon pricing, and recognise no decommissioning acceleration is telling two incompatible stories — and one of them is misinformed. The analyst's connectivity checks: useful lives and residual values against transition commitments; impairment assumptions against disclosed climate scenarios; provisions against stated remediation plans; ECLs and insurance recoverability against physical-risk disclosure.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The same quality tests apply — harder",
          md: "Sustainability metrics carry every risk MPMs do, with weaker verification traditions: selective scope boundaries, baseline resets behind 'methodology improvements', targets restated when missed, and intensity ratios whose denominators grow faster than the numerator falls. Assurance is thinner than audit. The discipline transfers wholesale: definition, consistency, symmetry, drift — and the direction test. Greenwash is earnings management with a different vocabulary, and question four knows it.",
        },
      ],
      check: {
        q: "An entity's IFRS S2 disclosure commits to exiting coal generation by 2032. Its financial statements depreciate the coal fleet to 2045, show no impairment, and carry a rehabilitation provision discounted from 2045 settlement dates. What is the finding?",
        options: [
          "None — sustainability and financial reporting are separate regimes",
          "A connectivity failure: the two disclosures assume different futures. If the 2032 exit is genuine, useful lives shorten, impairment triggers, and the provision's timing accelerates — with material P&L effects; if the statements' 2045 assumptions are the honest ones, the transition disclosure overstates commitment. One of the two documents requires correction",
          "The sustainability disclosure should move to the audit report",
          "The provision should be discounted at a higher rate",
        ],
        correct: 1,
        explain:
          "Both documents serve the same primary users and claim the same entity — they cannot legitimately assume different closure dates. The finding cuts either way, which is what makes it powerful: the analyst does not need to know which story is true to know the package is internally false, and the financial consequences of the greener story (accelerated depreciation, impairment, provision timing) are quantifiable pressure on management to choose.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Delivering earnings-quality verdicts as adjectives.",
      fix: "Quantify the discount: how much profit rests on releases, one-offs and level-3 judgement — and covenant or value on the rest.",
    },
    {
      trap: "Reading commentary in isolation from its own history.",
      fix: "Test this year's claims against last year's promises and the statements' facts; acknowledgement is the credibility marker.",
    },
    {
      trap: "Treating sustainability disclosure as a separate, softer domain.",
      fix: "Same users, same materiality logic, same quality tests — and connectivity to the statements is checkable line by line.",
    },
    {
      trap: "Missing the two-stories finding.",
      fix: "When narrative, sustainability and financial assumptions diverge, the divergence itself is the conclusion — name it and quantify the greener story's financial consequences.",
    },
  ],
  keyTerms: [
    { term: "Earnings quality", def: "The degree to which reported profit is cash-backed, recurring and neutrally measured — the weighting a user should place on it when projecting." },
    { term: "Management commentary", def: "The narrative report through management's eyes — decision-useful when entity-specific, forward-looking, consistent with the statements and accountable to its own prior claims." },
    { term: "IFRS S1", def: "The general sustainability disclosure standard: risks and opportunities affecting the entity's prospects, structured by governance, strategy, risk management, and metrics and targets, for the primary users of financial reports." },
    { term: "IFRS S2", def: "The climate standard applying S1's architecture: transition and physical risks, scenario resilience, the three emission scopes, and target progress." },
    { term: "Connectivity", def: "The required coherence between sustainability disclosures and the financial statements — one entity, one set of assumptions, checkable through lives, impairments and provisions." },
  ],
  summary: [
    "Earnings quality is composite — accruals, estimate leverage, recurrence, direction — delivered as a quantified discount.",
    "Commentary earns weight by acknowledging its record; identical risk paragraphs and vanished promises are evidence.",
    "Disclosure quality tests: entity-specific versus boilerplate, obscuring, drift, and completeness against the narrative.",
    "IFRS S1/S2 are investor information on the entity's prospects — apply the MPM discipline to their metrics.",
    "Connectivity is the master test: when the sustainability story and the statements assume different futures, the package is false.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the four components of an earnings-quality assessment.", a: "Accrual intensity (profit versus cumulative operating cash), estimate leverage (dependence on level-3 values, allowances, actuarial assumptions), recurrence (one-offs inside operating results), and direction (whether judgements cluster on the flattering side)." },
    { q: "What behavioural tests grade a management commentary?", a: "Acknowledgement of prior-year claims and targets; risks that evolve with the business; mechanisms rather than weather for bad news; entity-specific content that could not be pasted into a competitor's report." },
    { q: "What do IFRS S1 and S2 require, for whom?", a: "Disclosure of sustainability-related (S1) and climate-related (S2) risks and opportunities affecting the entity's prospects — governance, strategy, risk management, metrics and targets, including scope 1–3 emissions and scenario resilience — for the same primary users as the financial statements." },
    { q: "Give three concrete connectivity checks.", a: "Useful lives and residual values against disclosed transition or exit commitments; impairment and going-concern assumptions against disclosed climate scenarios; provision existence, timing and discounting against stated remediation and closure plans." },
  ],
  furtherStudy: [
    "SBR-32 and SBR-33 supply the quantitative layers this chapter weights",
    "SBR-01's direction test is the ethical root of every quality screen here",
    "Area F's regulatory chapters develop IFRS S1/S2 and the ESRS comparison in standard-setting terms",
    "SBR-07's disclosure disciplines are the preparer-side mirror of this chapter's user-side tests",
  ],
}

export const SBR_TREE_AREA_E: StudyChapter[] = [SBR_TREE_32, SBR_TREE_33, SBR_TREE_34]
