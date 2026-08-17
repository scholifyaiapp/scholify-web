import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area D — Financial statements of groups of entities.
 *
 * Question one of every SBR exam — thirty marks — examines this area, with a
 * spreadsheet adjustment of a consolidated statement. The shim served it with
 * one relabelled legacy chapter; the study guide's D1 alone carries thirteen
 * learning outcomes.
 *
 *   SBR-25  Control, and the acquisition method            (D1a, D1b, D1c)
 *   SBR-26  Goodwill and non-controlling interests         (D1d)
 *   SBR-27  Step acquisitions, disposals and discontinued  (D1e, D1g, D1h, D1i)
 *   SBR-28  Procedures, separate statements and exemptions (D1f, D1j, D1k, D1l)
 *   SBR-29  The consolidated statement of cash flows       (D1m)
 *   SBR-30  Associates and joint arrangements              (D2a, D2b)
 *   SBR-31  Foreign transactions and entities              (D3a, D3b)
 *
 * Written against the official ACCA SBR-INT syllabus and study guide for
 * September 2026 to June 2027. Not derived from any approved-provider text.
 * House style: the mechanics are FR's inheritance; SBR examines the JUDGEMENT
 * calls — does control exist, what did we really pay, what is really
 * identifiable — and the discussion marks attached to each.
 */

const SBR_TREE_25: StudyChapter = {
  paper: "SBR",
  id: "SBR-25",
  number: 25,
  area: "D",
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)"],
  title: "Control, and the acquisition method",
  minutes: 18,
  intro:
    "Consolidation begins with one question — who controls whom — answered by power, returns and the link between them, not by percentages. Then the acquisition method decides what was bought, what was paid, and what each acquired item is worth on day one.",
  outcomes: [
    "Apply the three-element control model, including de facto control, potential voting rights and structured entities",
    "Determine whether a business combination has occurred, distinguishing business from asset acquisitions",
    "Identify the acquirer, including in reverse acquisitions",
    "Measure consideration: cash, deferred, shares, contingent consideration and its remeasurement route",
    "Recognise and measure identifiable acquired assets and liabilities, including intangibles and contingent liabilities the acquiree never recognised",
    "Separate what is part of the combination from what is a separate transaction — settlement of prior relationships, remuneration disguised as consideration",
  ],
  sections: [
    {
      id: "control",
      heading: "Control: power, returns, and the link",
      blocks: [
        {
          kind: "text",
          md: "An investor controls an investee when it has all three: **power** — existing rights giving the current ability to direct the **relevant activities** (the ones that significantly affect returns); **exposure to variable returns**; and the **ability to use the power to affect those returns**. Majority voting rights are the usual route, but the model is deliberately percentage-free, because the exam's scenarios live off-piste: **de facto control** (40% held against thousands of dispersed, passive holders can be power in practice); **potential voting rights** (currently exercisable, substantive options count — deeply out-of-the-money or approval-blocked ones do not); **rights held as protection** (lender covenants restricting dividends protect, they do not direct); and **structured entities**, where voting is irrelevant and control follows who designed the vehicle's autopilot and absorbs its variability.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Relevant activities decide the hard cases",
          md: "When two parties each direct different activities — one runs the research phase, the other the commercialisation — control belongs to whoever directs the activities that **most significantly affect returns** in the arrangement's life. The same logic exposes the off-balance-sheet vehicle: an entity whose 'independent' financing conduit was designed by the sponsor, runs on the sponsor's receivables, and returns its residual risk to the sponsor through guarantees, is controlled by the sponsor no matter who holds its shares. SBR-02's off-balance-sheet toolkit meets its enforcement mechanism here.",
        },
        {
          kind: "text",
          md: "**Is it a business?** A combination needs an acquired **business** — inputs plus substantive **processes** that together contribute to creating outputs. Buying a company holding one let building with a property manager attached may be an **asset acquisition**: no goodwill, no deferred tax on initial differences, costs capitalised, consideration allocated over the assets by relative fair value. The optional **concentration test** shortcut (substantially all the value in one asset or similar group → not a business) exists for exactly these cases. The stakes explain the arguing: business combinations create goodwill and expense their transaction costs; asset deals do neither.",
        },
      ],
      check: {
        q: "An investor holds 45% of a listed entity; the remaining 55% is dispersed among thousands of holders, attendance at meetings never exceeds 70% of votes, and the investor has appointed the majority of the board for years unopposed. Does it control?",
        options: [
          "No — control requires more than 50% of voting rights",
          "Probably yes — with 45% against dispersed passive holders, the investor has the practical current ability to direct the relevant activities, evidenced by its unopposed board appointments: de facto control, requiring consolidation",
          "No, unless it holds options over further shares",
          "Yes, but only equity accounting applies below 50%",
        ],
        correct: 1,
        explain:
          "The model asks about ability, not arithmetic: at typical turnouts 45% is a standing majority, and the history of unopposed appointments is the evidence the standard tells you to weigh. Option 0 is the bright-line rule IFRS 10 replaced; option 3 confuses the control conclusion with the influence fallback. The consolidation consequence is exactly why sponsors of convenient 45% structures resist the analysis.",
      },
    },
    {
      id: "consideration",
      heading: "What was paid — and what was paid for something else",
      blocks: [
        {
          kind: "text",
          md: "Consideration transferred measures at **fair value at the acquisition date**: cash; **deferred consideration** discounted (the unwind is post-acquisition finance cost, not more goodwill); **shares issued** at their acquisition-date market price; and **contingent consideration** — earn-outs — at fair value on day one, however uncertain. The classification of the earn-out then drives everything after: an obligation settled in cash (or in a **variable** number of shares) is a **financial liability, remeasured through profit or loss** each period; a fixed-for-fixed share obligation is **equity, never remeasured**. Acquisition **costs** — advisers, due diligence, valuers — are expensed: they buy services, not the business (share issue costs go against equity; debt issue costs into the instrument's EIR).",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Separate transactions the earn-out analysis must strip out",
          items: [
            "**Contingent payments tied to continued employment** — consideration 'forfeited if the vendor-director leaves' is remuneration for post-combination services: post-acquisition expense, not consideration, whatever the sale agreement calls it",
            "**Settlement of pre-existing relationships** — paying to extinguish a lawsuit or an unfavourable supply contract with the acquiree settles that relationship through profit, and only the remainder buys the business",
            "**Reimbursement of the vendor's costs**, or above-market 'consulting' deals with the sellers — separate transactions at their own values",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The earn-out games run both directions",
          md: "A liability-classified earn-out that management later argues *down* releases a credit to profit exactly when the acquired business disappoints — the worse the deal, the better the P&L. Equity classification avoids remeasurement entirely, which is why fixed-for-fixed drafting appears in scenarios beside volatile targets. And the employment-linked slice, misclassified as consideration, capitalises pay into goodwill. Question one's discussion marks sit on naming which of these the scenario's structure achieves.",
      },
        {
          kind: "text",
          md: "The acquirer is identified from substance: usually the entity transferring cash or issuing shares — but in a **reverse acquisition**, the legal issuer is the accounting acquiree (a private company 'acquired by' a listed shell whose shareholders end up controlling it has in substance acquired the shell), and consolidated statements continue the legal subsidiary's story. The tells: who ends up with voting control, board dominance, and management continuity.",
        },
      ],
      check: {
        q: "An acquisition agreement provides $20m up front plus $15m payable in two years if the vendor-CEO remains employed and profits exceed a target; if she resigns, the $15m lapses entirely. How does the $15m account?",
        options: [
          "Contingent consideration at fair value in the goodwill computation",
          "As remuneration: payment forfeited on leaving employment is compensation for post-combination services, expensed over the two years — excluding it from consideration reduces goodwill and charges profit instead",
          "Half consideration, half remuneration",
          "A provision at the acquisition date",
        ],
        correct: 1,
        explain:
          "The forfeiture-on-leaving term is the standard's own decisive indicator: money you must work to keep is pay, not price. The classification moves $15m from an intangible-flattering goodwill figure into two years of P&L expense — precisely why the drafting appears in sale agreements and why the examiner keeps testing it. A profit condition alone, without the employment link, would have been genuine contingent consideration.",
      },
    },
    {
      id: "identifiable-assets",
      heading: "What was acquired — recognition at the fair value line",
      blocks: [
        {
          kind: "text",
          md: "At the acquisition date the acquirer recognises the **identifiable** assets acquired and liabilities assumed at **fair value** — including much the acquiree never showed. **Intangibles** meeting separability or contractual-legal criteria recognise: brands, customer relationships, order books, licences, in-process research and development — the wall from SBR-13 comes down because the transaction now evidences and measures them. **Contingent liabilities** recognise at fair value where they are present obligations with measurable fair value, *even when outflow is not probable* — the IAS 37 gate yields, because the market priced the risk into the deal. **Deferred tax** arises on the fair-value differences (SBR-19). Excluded from day one: the acquiree's pre-existing goodwill, and the acquirer's **restructuring intentions** — future plans are not the acquiree's liabilities, however firmly the acquirer intends them.",
        },
        {
          kind: "example",
          title: "The measurement period doing its job",
          scenario: "At a 31 March acquisition, provisional fair values are used for a specialised plant awaiting expert valuation. In November — eight months on — the valuation shows the plant was worth $12m more; separately, a January flood then damages it.",
          steps: [
            { label: "Provisional accounting", detail: "Report provisional amounts, flagged as such, while information about acquisition-date facts is gathered." },
            { label: "The November adjustment", detail: "Within the measurement period (max one year) and about acquisition-date conditions: adjust the plant +$12m, adjust goodwill down $12m, restate comparatives as if final from day one." },
            { label: "The January flood", detail: "A post-acquisition event, not better information about day one: impairment through profit, never a goodwill adjustment." },
            { label: "After the window closes", detail: "Later corrections are IAS 8 territory — errors restate, new information is current-period accounting." },
          ],
          result: "The measurement period trues up the day-one picture from day-one facts — and never becomes a channel for feeding post-acquisition performance into goodwill.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Why fair-valuing everything matters later",
          md: "Every uplift recognised at acquisition becomes a post-acquisition expense — amortisation of the customer list, higher depreciation, unwinding discounts — depressing the earnings the acquirer reports for its purchase. Hence the systematic temptation: minimise identifiable intangibles, park the excess in never-amortised goodwill, and report cleaner post-deal profits until the impairment arrives (SBR-12 explained why it arrives late). An answer that names this incentive when a scenario's 'brand-rich' acquisition somehow identified no brand is doing SBR's job.",
        },
      ],
      check: {
        q: "An acquirer plans to close the acquiree's head office after completion, at a cost of $25m, and includes a $25m provision among the liabilities assumed at acquisition, increasing goodwill. Is this correct?",
        options: [
          "Yes — the closure is a direct consequence of the acquisition",
          "No — the acquiree had no obligation to close its own head office at the acquisition date; the plan is the acquirer's future intention, so the costs are post-acquisition expenses when IAS 37's own criteria are met, not day-one liabilities inside goodwill",
          "Yes, if announced within the measurement period",
          "No — closure costs are never recognisable by anyone",
        ],
        correct: 1,
        explain:
          "The identifiability discipline: liabilities assumed are the acquiree's obligations as they stood, not the acquirer's plans for it. Routing future restructuring through acquisition accounting would launder ordinary expenses into goodwill — the balance nobody amortises — which is exactly why the exclusion exists and why scenarios keep attempting it. The costs will charge post-acquisition profit when announced and communicated (SBR-20's gate).",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deciding control by percentage.",
      fix: "Power over relevant activities, variable returns, and the link — de facto holdings, substantive options and designed vehicles all consolidate without a majority.",
    },
    {
      trap: "Leaving employment-linked earn-outs in consideration.",
      fix: "Forfeited-on-leaving means remuneration: post-acquisition expense, out of goodwill.",
    },
    {
      trap: "Recognising the acquirer's restructuring plans as acquired liabilities.",
      fix: "Only the acquiree's own present obligations at the date qualify; plans expense post-acquisition through the normal gate.",
    },
    {
      trap: "Adjusting goodwill for post-acquisition events, or forever.",
      fix: "The measurement period trues up day-one facts for up to a year; everything else is current accounting or IAS 8.",
    },
  ],
  keyTerms: [
    { term: "Control", def: "Power over the relevant activities, exposure to variable returns, and the ability to use the power to affect them — the consolidation trigger, with no percentage in it." },
    { term: "Relevant activities", def: "The activities of the investee that most significantly affect its returns — whoever directs them holds the power." },
    { term: "Contingent consideration", def: "Deal consideration dependent on future events, at fair value on day one — thereafter remeasured through profit if a liability, untouched if equity." },
    { term: "Identifiable asset", def: "An acquired asset that is separable or arises from contractual or legal rights — recognisable at fair value even if the acquiree never showed it." },
    { term: "Measurement period", def: "Up to one year from acquisition to finalise provisional day-one amounts using facts about acquisition-date conditions, adjusting goodwill retrospectively." },
  ],
  summary: [
    "Control is power + returns + linkage: de facto stakes, substantive options and autopilot vehicles consolidate; protective rights do not.",
    "Consideration is day-one fair value across all its forms — and earn-outs classify once, with the liability route feeding remeasurement through profit.",
    "Strip the separate transactions: employment-linked payments are pay, relationship settlements settle through profit.",
    "Acquired identifiable assets recognise at fair value — intangibles and improbable-outflow contingent liabilities included; acquirer intentions excluded.",
    "The measurement period is a day-one-facts window, not a post-acquisition dumping ground.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes a potential voting right count towards power?", a: "Substance: currently exercisable when relevant decisions are made, without barriers — economic (deeply out of the money), regulatory or contractual — that make exercise unrealistic." },
    { q: "Why do acquisition costs expense while share issue costs do not?", a: "Advisory and diligence costs buy services consumed in transacting, not part of what was exchanged for the business; issue costs are a deduction from the equity raised, following the instrument they created." },
    { q: "When does an acquiree's contingent liability recognise at acquisition despite improbable outflow?", a: "When it is a present obligation from past events with a reliably measurable fair value — the deal priced the risk, so the probability gate of IAS 37 gives way to fair value measurement." },
    { q: "How do you spot a reverse acquisition?", a: "The legal acquirer's shareholders lose: after the share exchange, the 'target's' owners control the combined entity, dominate the board and supply the management — substance makes the legal subsidiary the accounting acquirer." },
  ],
  furtherStudy: [
    "SBR-26 turns consideration and identifiable net assets into goodwill and NCI under both measurement choices",
    "SBR-27 handles stakes changing after control is won — or lost",
    "SBR-22 supplies the fair value machinery every day-one measurement uses",
    "SBR-19 recognises the deferred tax the fair-value exercise generates",
  ],
}

const SBR_TREE_26: StudyChapter = {
  paper: "SBR",
  id: "SBR-26",
  number: 26,
  area: "D",
  syllabusRefs: ["D1(d)"],
  title: "Goodwill and non-controlling interests",
  minutes: 16,
  intro:
    "Goodwill is what the acquirer paid for that it cannot name — and the NCI measurement choice made at each acquisition decides how much of it the group recognises, how impairments allocate, and what equity carries. One election, consequences everywhere.",
  outcomes: [
    "Compute goodwill from the four-element formula, under both NCI measurement choices",
    "Explain what goodwill represents — and why bargain purchases demand re-examination before profit",
    "Choose and defend an NCI measurement basis, tracing its consequences through impairment and equity",
    "Attribute post-acquisition profits and OCI to NCI, with fair-value-adjustment depreciation flowing through",
    "Evaluate the impairment-only goodwill regime against amortisation, with the arguments both ways",
  ],
  sections: [
    {
      id: "the-formula",
      heading: "The goodwill computation, and the choice inside it",
      blocks: [
        {
          kind: "text",
          md: "Goodwill = **consideration transferred** + **NCI** + fair value of any **previously held interest** − fair value of **identifiable net assets acquired**. The formula prices the whole business, then subtracts the parts that could be named; the excess is the assembled workforce, the synergies, the position — nothing separable, everything paid for. The election inside it: NCI at **fair value** ('full goodwill' — the NCI's share of goodwill recognises too), or at the NCI's **proportionate share of identifiable net assets** ('partial goodwill' — only the parent's goodwill recognises). The choice is **per transaction**, and an NCI share price is not simply the parent's price per share scaled down: control commands a premium the minority did not receive.",
        },
        {
          kind: "example",
          title: "Both methods, one acquisition",
          scenario: "P pays $800m for 80% of S. S's identifiable net assets have a fair value of $700m. The NCI's 20% has a fair value of $170m (market price of the minority shares).",
          steps: [
            { label: "Full goodwill", detail: "$800m + $170m − $700m = $270m goodwill; NCI carried at $170m." },
            { label: "Partial goodwill", detail: "$800m + (20% × $700m = $140m) − $700m = $240m; NCI carried at $140m." },
            { label: "The difference", detail: "$30m — the goodwill attributable to the NCI — appears only under full goodwill, with NCI $30m higher to match." },
            { label: "Impairment behaviour", detail: "A CGU goodwill impairment under full goodwill splits between parent and NCI; under partial, the test grosses goodwill up notionally, but only the parent's recognised share can be written off." },
          ],
          result: "Same acquisition, two balance sheets: full goodwill reports the whole business's premium and a bigger equity base; partial reports only what the parent paid for. Ratios, impairment headroom and NCI all differ by that $30m.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "A bargain purchase is a fire drill, not a profit",
          md: "When identifiable net assets exceed the price plus NCI, the standard's first instruction is **re-examine everything** — identifications, measurements, the consideration's completeness — because apparent bargains are usually measurement errors or unstripped separate transactions. Only after the re-check does the excess recognise as a **gain in profit or loss** (never negative goodwill on the balance sheet), with genuine cases carrying real-world signatures: distressed sellers, forced disposals, motivated exits. A scenario's 'bargain' beside a vendor keen to keep supplying the group deserves the second look before the gain.",
        },
      ],
      check: {
        q: "Using the figures above, management proposes measuring NCI at 20% of the parent's price — 20/80 × $800m = $200m — 'for consistency'. What is wrong?",
        options: [
          "Nothing — proportional pricing is the fair value",
          "The parent's $800m bought control; scaling it prices a control premium into a stake that has none. NCI fair value is the minority shares' own market evidence — here $170m — and inflating NCI to $200m inflates goodwill to $300m",
          "NCI must always use the proportionate-net-assets method",
          "NCI fair value must equal 20% of net assets",
        ],
        correct: 1,
        explain:
          "The control premium is the wedge: $800m ÷ 80% values the business as controlled, but the minority holds no control to sell. The $30m overstatement would sit in goodwill — unamortised, sheltered (SBR-12) — flattering day-one optics at the cost of a bigger eventual impairment. Options 2 and 3 each deny the election the standard actually offers.",
      },
    },
    {
      id: "nci-afterwards",
      heading: "NCI after day one — the running attribution",
      blocks: [
        {
          kind: "text",
          md: "After acquisition, NCI is not a frozen credit: it takes its share of the subsidiary's **post-acquisition profits and OCI**, measured on the **group's** numbers — after fair-value-adjustment depreciation and amortisation, after unrealised profit eliminations where the subsidiary was the seller. Losses attribute to NCI **even into deficit**: the old practice of stopping at zero shifted the minority's share of losses onto the parent's earnings, flattering the number analysts watch. Total comprehensive income splits between owners of the parent and NCI on the statement's face — the split, not the total, is what the parent's shareholders own.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The attribution adjustments that carry marks",
          items: [
            "**Fair-value depreciation** — the uplifted plant depreciates against the subsidiary's profit before NCI's share is struck: the minority shares the cost of the assets it part-owns",
            "**Unrealised profits, subsidiary as seller** — eliminate against the subsidiary's profit, so NCI bears its share; parent-as-seller eliminations are all the parent's",
            "**Intra-group balances and trading** — eliminated in full regardless of NCI: the group reports no business with itself",
            "**Mid-year acquisitions** — consolidate results from the acquisition date only; time-apportion unless actual pre/post splits exist",
          ],
        },
        {
          kind: "illustration",
          title: "Why the direction of sale moves the minority",
          md: "S (80% held) sells goods to P at a $10m margin, all unsold at year end. The $10m eliminates from S's profit — so NCI's share falls $2m. Reverse the flow — P sells to S — and the elimination lands wholly on the parent's column. Same group profit either way; different owners bear it. Question one's spreadsheet plants this deliberately: the direction of intra-group sale is one of its favourite half-marks, and the discussion version asks why the minority should suffer for the group's internal pricing at all — to which the answer is that S recorded a profit its own minority shared, and the group view says that profit has not yet happened.",
        },
      ],
      check: {
        q: "S was acquired with a plant fair-valued $50m above book (10-year life). S reports a $90m profit; NCI is 25%. Ignoring other adjustments, what is NCI's share of profit?",
        options: [
          "$22.5m — 25% of the reported $90m",
          "$21.25m — 25% of $85m: the group's extra $5m fair-value depreciation charges against S's profit before the split",
          "$22.5m less 25% of the full $50m uplift",
          "$21.25m only under the full goodwill method",
        ],
        correct: 1,
        explain:
          "NCI shares the subsidiary's performance as the group measures it — and the group's plant is $50m dearer, costing $5m a year. Charging the depreciation but splitting the undepreciated profit (option 0) would gift the minority earnings the group says do not exist. The adjustment applies under either NCI method (option 3 confuses the day-one election with the running attribution).",
      },
    },
    {
      id: "goodwill-regime",
      heading: "The impairment-only regime, evaluated",
      blocks: [
        {
          kind: "text",
          md: "Recognised goodwill sits untouched until impaired: no amortisation, an annual test (SBR-12), and impairments that never reverse. The **case for**: goodwill has no determinable life, so any amortisation schedule is arbitrary noise subtracted from earnings; impairment at least attempts a measurement, and the annual test forces a yearly look at whether the acquisition story still holds. The **case against** runs harder in practice: the test's CGU sheltering lets acquired goodwill hide behind internally generated headroom, so confirmation arrives **late and lumpy** — a large write-off announcing what the share price knew years earlier; the asymmetry (never reverse, never amortise) makes goodwill a one-way accumulation until crisis; and the test's inputs are management's own forecasts about its own deal — self-graded homework with the grader's bonus attached.",
        },
        {
          kind: "text",
          md: "The evaluation question — invited whenever a scenario shows serial acquirers with swelling goodwill — deserves both sides and a commitment. Amortisation would restore a running charge and cap the accumulation, at the price of arbitrary lives and a charge analysts would add straight back. Better disclosure — the acquisition-date metrics against later performance — attacks the accountability gap without the arbitrary schedule. A candidate who ties the critique to the scenario (which CGU shelters this goodwill? whose forecasts feed the test? what did the deal's own targets say?) converts a stock debate into analysis.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Goodwill as a percentage of equity is a risk metric",
          md: "A group whose equity is mostly goodwill has a balance sheet resting on the impairment test's mercy: one failed acquisition's write-off can breach covenants measured on net assets. Area E reads the ratio that way, and question one's discussion parts increasingly ask for it — the spreadsheet computes the goodwill; the marks ask what its size means.",
        },
      ],
      check: {
        q: "A serial acquirer's goodwill has grown to 70% of group equity across nine deals; no impairment has ever been recognised, with every test passing inside a single group-wide CGU. Which evaluation earns the marks?",
        options: [
          "The clean record shows the acquisitions succeeded",
          "The single group-wide CGU almost certainly breaches the allocation rules (no larger than an operating segment, at the level goodwill is monitored) and lets every deal shelter behind the whole group's headroom — the untested question is which acquisitions failed, and the equity is 70% exposed to the answer",
          "Goodwill should simply be written off against equity",
          "The group should amortise goodwill over ten years voluntarily",
        ],
        correct: 1,
        explain:
          "A nine-deal, zero-impairment record proves the test's configuration before it proves the deals: allocation at group level makes impairment nearly impossible by construction (SBR-12's shelter at maximum size). The answer challenges the CGU level first, then prices the exposure. Options 2 and 3 propose treatments the standards do not permit — evaluation means working the regime, not legislating a new one.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Scaling the parent's price to value NCI.",
      fix: "The parent paid for control; the minority's fair value is its own market evidence, premium excluded.",
    },
    {
      trap: "Booking a bargain purchase gain on first computation.",
      fix: "Re-examine identifications, measurements and separate transactions first; only verified excesses credit profit.",
    },
    {
      trap: "Attributing NCI's share from the subsidiary's own numbers.",
      fix: "Use group-measured profit: after fair-value depreciation, and after eliminations where the subsidiary sold.",
    },
    {
      trap: "Stopping NCI at zero when losses accumulate.",
      fix: "Losses attribute even into deficit — the minority owns its share of failure too.",
    },
  ],
  keyTerms: [
    { term: "Full goodwill method", def: "NCI at fair value, recognising the whole business's goodwill — parent's and minority's shares alike." },
    { term: "Partial goodwill method", def: "NCI at its proportionate share of identifiable net assets — only the parent's purchased goodwill recognises." },
    { term: "Control premium", def: "The excess a buyer pays for a controlling stake over the per-share value of minority interests — the reason NCI fair value is not the parent's price scaled." },
    { term: "Bargain purchase", def: "Identifiable net assets exceeding consideration plus NCI — recognised as a profit-or-loss gain only after full re-examination." },
    { term: "Non-controlling interest", def: "Equity in a subsidiary not attributable to the parent — measured at acquisition by election, then carried forward with its share of group-measured comprehensive income." },
  ],
  summary: [
    "Goodwill prices the unnameable: consideration plus NCI plus prior stakes, less identifiable net assets at fair value.",
    "The NCI election is per-deal and permanent in effect: full goodwill reports more asset, more equity, more to impair.",
    "NCI runs on group numbers — fair-value depreciation and subsidiary-side eliminations reach it; deficits do too.",
    "Bargains re-examine before they celebrate.",
    "The impairment-only regime trades an arbitrary charge for late, lumpy truth — and the CGU level is where the truth gets managed.",
  ],
  knowledgeDiagnostic: [
    { q: "Write the goodwill formula and mark the election.", a: "Consideration transferred + NCI (at fair value, or at proportionate share of identifiable net assets — the per-transaction election) + fair value of previously held interests − identifiable net assets at fair value." },
    { q: "Under partial goodwill, how does a CGU impairment reach goodwill?", a: "The test grosses goodwill up notionally so the comparison is like-for-like, but only the parent's recognised share can actually be written down — the notional NCI share absorbs its portion invisibly." },
    { q: "Which eliminations reduce NCI's share and which do not?", a: "Unrealised profits where the subsidiary sold (and fair-value adjustment depreciation) reduce the subsidiary's group-measured profit and so NCI's share; parent-as-seller eliminations bypass NCI entirely." },
    { q: "Give the strongest argument on each side of the amortisation debate.", a: "Against amortisation: no determinable life makes any schedule arbitrary noise. For it: the impairment-only regime's sheltering delivers systematically late recognition — one-way accumulation until a crisis write-off." },
  ],
  furtherStudy: [
    "SBR-25 built the inputs; SBR-27 changes them after the day",
    "SBR-12 is the impairment machinery this chapter's evaluation leans on",
    "SBR-22 prices the NCI and the identifiable assets",
    "Area E converts goodwill-to-equity into the risk reading lenders make",
  ],
}

const SBR_TREE_27: StudyChapter = {
  paper: "SBR",
  id: "SBR-27",
  number: 27,
  area: "D",
  syllabusRefs: ["D1(e)", "D1(g)", "D1(h)", "D1(i)"],
  title: "Step acquisitions, disposals and discontinued activities",
  minutes: 17,
  intro:
    "Stakes change: influence becomes control, control deepens, control is lost or a business is exited entirely. One principle organises all of it — crossing a control boundary remeasures everything at fair value through profit; moving within one is an owners' transaction that touches equity only.",
  outcomes: [
    "Account for a business combination achieved in stages, remeasuring the previously held interest",
    "Account for changes in ownership that keep control — equity transactions with no goodwill change and no gain",
    "Account for loss of control: derecognition, retained-interest remeasurement, and the full disposal gain",
    "Handle partial disposals that keep control, and those that fall to associate or investment status",
    "Present discontinued operations and held-for-sale subsidiaries, including those acquired for resale",
    "Evaluate the boundary principle — and the gains management can engineer by stepping across it",
  ],
  sections: [
    {
      id: "stepping-up",
      heading: "Stepping up: influence to control, and control deepened",
      blocks: [
        {
          kind: "text",
          md: "A **step acquisition** — holding 30%, buying 40% more — is accounted for as *disposing of the old relationship and acquiring a new one*: the previously held interest **remeasures to fair value at the acquisition date**, with the gain or loss in **profit or loss** (and any OCI accumulated on it recycled or transferred as its nature requires), and that fair value enters the goodwill computation as the third element of SBR-26's formula. The logic: the 30% associate relationship ended; what the investor now controls is a different economic position, measured fresh. The consequence scenarios exploit: crossing into control **books a gain on shares the entity never sold** — a paper profit at precisely the moment management chose to transact.",
        },
        {
          kind: "text",
          md: "Once control exists, **buying more changes nothing but the split**: acquiring another 15% of a 60%-held subsidiary is a transaction **among owners** — no remeasurement, no goodwill adjustment, no profit. The difference between the price paid and the NCI carrying amount acquired goes **directly to equity** attributable to the parent. Selling down from 80% to 65% mirrors it: proceeds against the NCI created, difference in equity, and not a unit of gain in profit — however far above carrying value the price. The design blocks the obvious game: a group cannot manufacture earnings by trading slices of a subsidiary with the market while keeping the keys.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The boundary is therefore where the gains are",
          md: "Remeasurement gains live only at the control boundary — so scenarios show management arranging to cross it: nudging 49% to 51% to revalue the old stake through profit, or selling 55% to 45% (with a friendly shareholder agreement) to crystallise a disposal gain while running the business as before. The technical answer applies the rules; the SBR answer adds that a crossing whose only substance is the accounting consequence invites challenge on whether control genuinely changed — IFRS 10's substance model cuts both ways.",
        },
      ],
      check: {
        q: "P holds 25% of S (an associate, equity-accounted carrying amount $60m). P buys a further 35% for $150m when the 25% stake's fair value is $95m. What happens to the old stake?",
        options: [
          "It rolls into the goodwill computation at $60m",
          "It remeasures to $95m with a $35m gain in profit or loss, and $95m joins consideration in the goodwill computation — the associate relationship ended and the position was re-established at fair value",
          "It remeasures through OCI",
          "It stays at $60m until the shares are actually sold",
        ],
        correct: 1,
        explain:
          "Crossing to control is accounted for as exchanging the old position for a new one: the $35m accrued while the stake was an associate crystallises through profit at the crossing. The examiner's follow-up is the sceptical one — the gain's size depends on a fair value management itself may have influenced (the price it just paid for the 35% is the anchor), and the timing was management's choice.",
      },
    },
    {
      id: "losing-control",
      heading: "Losing control — and what the gain really contains",
      blocks: [
        {
          kind: "text",
          md: "On **loss of control** the parent derecognises the subsidiary's assets (goodwill included), liabilities and NCI; recognises the consideration received and **any retained interest at fair value**; recycles or transfers the subsidiary's accumulated OCI (translation reserves to profit; revaluation surpluses within equity — SBR-08's map); and reports the whole difference as a **gain or loss in profit or loss**. The retained-stake remeasurement means the gain has two layers: the profit on what was sold, and a revaluation of what was kept — a 30% retained associate enters equity accounting at fair value, its uplift already banked in the disposal line.",
        },
        {
          kind: "example",
          title: "A disposal gain, decomposed",
          scenario: "P sells 45% of its 75% subsidiary for $180m, losing control but retaining 30% (fair value $110m). At disposal: net assets $200m, goodwill $40m, NCI $55m, and a $12m credit translation reserve relating to S.",
          steps: [
            { label: "Derecognise", detail: "Net assets $200m + goodwill $40m − NCI $55m = $185m of group carrying amount leaves." },
            { label: "Recognise", detail: "Proceeds $180m + retained interest at fair value $110m = $290m arrives." },
            { label: "Recycle", detail: "The $12m translation reserve reclassifies to profit as part of the disposal result." },
            { label: "Gain", detail: "$290m − $185m + $12m = $117m in profit or loss." },
            { label: "Read it", detail: "Part sale proceeds, part remeasurement of the kept 30%, part recycled currency history — one line, three stories, and the discussion marks want them separated." },
          ],
          result: "The retained associate starts equity accounting at $110m. The $117m 'profit on disposal' is quoted in the RNS; the analyst — and the SBR candidate — decomposes it.",
        },
        {
          kind: "text",
          md: "**Partial disposals below control** follow the same grammar at the next boundary: control to associate remeasures the retained stake (as above); associate to plain investment remeasures again on the way out of significant influence. Within-boundary sales (75% to 60%) stay in equity. The audit trail for any disposal question: name the boundary crossed — or not crossed — before touching a number.",
        },
      ],
      check: {
        q: "A parent sells 20% of its 70% subsidiary for $95m; the NCI acquired an interest with a carrying amount of $60m. Control is retained. Management reports a $35m disposal gain. What is correct?",
        options: [
          "The gain stands — value was realised at arm's length",
          "No gain: with control retained this is an equity transaction — the $35m difference credits equity attributable to the parent, and goodwill and profit are untouched",
          "The gain reports in OCI",
          "The subsidiary must be remeasured to fair value first",
        ],
        correct: 1,
        explain:
          "No boundary was crossed: the group still controls the same business, and the standard treats dealings in its own subsidiary's shares — while control persists — like dealings in the parent's own equity. The $35m is real value received, visible in equity and in the statement of changes; it is not performance. Management's press-release 'gain' is the presentation game the rule exists to stop.",
      },
    },
    {
      id: "discontinued",
      heading: "Exits presented: discontinued operations and resale subsidiaries",
      blocks: [
        {
          kind: "text",
          md: "When the exit is a **separate major line of business or geographical area** — sold, or classified as held for sale under SBR-13's strict gate — it presents as a **discontinued operation**: a single after-tax line on the face (its result plus any remeasurement or disposal gain or loss), analysed in the notes, with **comparatives restated** so continuing operations track like-for-like. A **disposal group** classification drags the whole package — assets, related liabilities, allocated goodwill — to lower-of-carrying-and-fair-value-less-costs measurement, impairing goodwill first.",
        },
        {
          kind: "text",
          md: "A **subsidiary acquired exclusively with a view to resale** compresses the lifecycle: it consolidates (control is control), but as held-for-sale from day one — measured at fair value less costs to sell, presented as a disposal group, and qualifying as discontinued **without ever joining continuing operations** — provided the one-year gate and the availability criteria hold. The private-equity-style scenario tests both the concession and its boundary: 'intended for resale eventually' is not *exclusively with a view to resale*, and a resale plan that quietly extends past the year drops the package back into full consolidation with catch-up.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Read the continuing/discontinued split with SBR-13's scepticism",
          md: "The split protects predictive value — and invites curation: losses quarantined as 'discontinued' while the disposal drifts, or a shrinking division that is a product line, not a major line of business, dressed as discontinued to flatter continuing margins. The tests are the gate criteria and the major-line threshold; the incentive is the trend the continuing column will show. Both halves belong in the answer.",
        },
      ],
      check: {
        q: "A group classifies its loss-making retail division as discontinued in year one. In year three the division — still owned, still trading, marketed at an unchanged optimistic price — remains 'discontinued'. What should the statements show?",
        options: [
          "Continued discontinued presentation — the intention to sell persists",
          "The held-for-sale criteria have failed (no sale within a year on causes within the entity's control, and marketing at an unreasonable price): the division returns to continuing operations, measurement catches up as if never classified, and comparatives re-present — the three-year quarantine of its losses reverses",
          "The division may stay held for sale indefinitely if disclosed",
          "The division should be abandoned",
        ],
        correct: 1,
        explain:
          "The one-year extension exists only for delays outside the entity's control while the entity remains committed at a reasonable price — an unmoved optimistic ask is the opposite evidence. Reclassification undoes the quarantine: depreciation catches up and the losses rejoin the continuing trend they were flattering by their absence. This is SBR-13's gate enforced at group scale, and the direction of benefit explains the reluctance.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Booking gains on within-control share dealings.",
      fix: "While control persists, buying or selling stakes is an owners' transaction: differences to equity, goodwill untouched.",
    },
    {
      trap: "Forgetting the previously held or retained interest's remeasurement at a boundary.",
      fix: "Crossing into or out of control remeasures the kept stake at fair value through profit — it is part of the gain, and worth naming separately.",
    },
    {
      trap: "Leaving the subsidiary's accumulated OCI behind on disposal.",
      fix: "Translation reserves recycle into the disposal result; revaluation surpluses transfer within equity — SBR-08's map, applied.",
    },
    {
      trap: "Letting 'discontinued' status outlive its criteria.",
      fix: "Test the gate each year: failed criteria reclassify, catch up measurement, and re-present the comparatives.",
    },
  ],
  keyTerms: [
    { term: "Step acquisition", def: "Achieving control in stages — the previously held interest remeasures to fair value through profit and enters the goodwill computation." },
    { term: "Equity transaction (group context)", def: "A change in ownership interest without loss of control — differences between consideration and NCI adjusted go directly to parent equity." },
    { term: "Retained interest", def: "The stake kept when control is lost — remeasured to fair value as part of the disposal gain, becoming the new basis for equity accounting or investment measurement." },
    { term: "Discontinued operation", def: "A disposed or held-for-sale separate major line of business or geography — one after-tax line, restated comparatives." },
    { term: "Disposal group", def: "Assets and directly associated liabilities disposed of together — measured at the lower of carrying amount and fair value less costs to sell, goodwill impairing first." },
  ],
  summary: [
    "One principle: boundary crossings remeasure through profit; movements inside a boundary are equity transactions.",
    "Step-ups revalue the old stake into the goodwill formula; step-downs revalue the kept stake into the disposal gain.",
    "Within-control dealings never touch profit — the anti-manufacture rule management's press releases resist.",
    "Disposal gains decompose: sold, kept-and-revalued, and recycled history — separate them for the discussion marks.",
    "Discontinued presentation guards the continuing trend, under a gate that must be re-earned every period.",
  ],
  knowledgeDiagnostic: [
    { q: "State the boundary principle in one sentence.", a: "Gaining or losing control remeasures previously held or retained interests at fair value through profit or loss; ownership changes that keep control are equity transactions with owners." },
    { q: "What five things happen on loss of control?", a: "Derecognise net assets, goodwill and NCI; recognise consideration; remeasure any retained interest to fair value; recycle or transfer the subsidiary's accumulated OCI by its nature; report the net difference in profit or loss." },
    { q: "Why does a 60%→75% purchase create no goodwill?", a: "Goodwill was measured once, at the date control was obtained; later purchases merely reallocate equity between NCI and parent — the group acquired nothing it did not already control." },
    { q: "When does a resale subsidiary avoid continuing-operations presentation entirely?", a: "When acquired exclusively with a view to resale and meeting held-for-sale criteria at acquisition (or within a short period): consolidated as a disposal group at fair value less costs to sell and presented as discontinued from day one, inside the one-year discipline." },
  ],
  furtherStudy: [
    "SBR-25 and SBR-26 supply the control model and goodwill formula the boundaries act on",
    "SBR-13 owns the held-for-sale gate this chapter enforces at group scale",
    "SBR-31 shows the translation reserves that recycle in foreign disposals",
    "SBR-08's recycling map is the reference for every OCI balance leaving with a subsidiary",
  ],
}

const SBR_TREE_28: StudyChapter = {
  paper: "SBR",
  id: "SBR-28",
  number: 28,
  area: "D",
  syllabusRefs: ["D1(f)", "D1(j)", "D1(k)", "D1(l)"],
  title: "Procedures, separate statements and exemptions",
  minutes: 16,
  intro:
    "The consolidation machine itself: uniform policies, aligned dates, eliminated self-dealing — plus the questions around its edges: how the parent reports subsidiaries in its own statements, which subsidiaries may reduce disclosure, and when a group need not consolidate at all.",
  outcomes: [
    "Apply the consolidation procedures: combine, align, eliminate — including unrealised profits both directions",
    "Handle non-coterminous year ends and policy misalignments",
    "Account for subsidiaries, associates and joint ventures in the parent's separate financial statements",
    "Apply the consolidation exemption for intermediate parents and the investment-entity exception",
    "Identify when a subsidiary qualifies for reduced disclosures in its own statements",
    "Explain what consolidated statements can and cannot tell a user — the boundary's meaning",
  ],
  sections: [
    {
      id: "the-machine",
      heading: "The machine: combine, align, eliminate",
      blocks: [
        {
          kind: "text",
          md: "Consolidation presents the group as **one economic entity**: combine assets, liabilities, income and expenses line by line; carve the equity split out to NCI; and **eliminate in full** everything the group did with itself — balances, sales, dividends, and the **unrealised profits** sitting in assets that have not left the group. Elimination is full regardless of NCI percentage (the group reports no business with itself), though *whose* profit column bears it follows the seller, as SBR-26 traced. Unrealised profit machinery: margin in closing inventory from intra-group sales reverses (and returns when sold on); profits in transferred PPE reverse and release over the asset's remaining life through depreciation.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Alignment — the discipline before the arithmetic",
          items: [
            "**Uniform policies** — subsidiaries' numbers restate to group policies before combining: a subsidiary carrying investment property at cost joins a fair-value-model group at fair value",
            "**Reporting dates** — consolidate on the parent's date; a subsidiary's different date may be used only if the gap is three months or less, adjusted for significant transactions between",
            "**Currency** — foreign operations translate first (SBR-31), then consolidate",
            "**Consistency across the boundary** — the same transaction cannot be a sale in one column and a purchase in another: direction, margins and balances must agree before elimination",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Question one's spreadsheet is this section",
          md: "The 30-mark question hands you a draft consolidation and a list of untreated items: an intra-group margin, a fair-value depreciation catch-up, a misaligned policy, a dividend from pre-acquisition profits. The technique is invariant: identify what the group view requires, adjust with a labelled working, and keep the NCI and retained-earnings columns honest. The discussion marks ask *why* — and 'the group cannot trade with itself' is the sentence most of them orbit.",
        },
      ],
      check: {
        q: "P sells inventory costing $8m to its 70%-owned subsidiary S for $12m; at the year end S still holds three-quarters of it. What consolidation adjustment is needed, and who bears it?",
        options: [
          "Eliminate $4m of profit, split 70:30 with NCI",
          "Eliminate $3m — the margin still inside the group (¾ × $4m) — wholly against the parent's profit and the group inventory, since the parent was the seller; the sold quarter's margin is realised",
          "Eliminate the full $12m of revenue only",
          "No adjustment — the sale was at arm's length prices",
        ],
        correct: 1,
        explain:
          "Two calibrations: only the unrealised portion (goods still held) reverses, and the seller's column bears it — P sold, so NCI is untouched. Revenue and cost of sales also gross down by the full $12m intra-group sale, but the profit adjustment is the $3m. Arm's-length pricing (option 3) is irrelevant: the group made nothing until the goods left the group.",
      },
    },
    {
      id: "separate-statements",
      heading: "The parent's own statements — a different question",
      blocks: [
        {
          kind: "text",
          md: "**Separate financial statements** answer a different question from the group's: not 'what does the economic entity own' but 'what does this legal entity hold'. Investments in subsidiaries, associates and joint ventures carry, by **policy choice per category**, at: **cost**; **fair value** under IFRS 9; or **the equity method**. Dividends from them recognise in profit when the right to receive is established — including from pre-acquisition profits, which is the exam's flag: a subsidiary paying out reserves that existed when it was bought is returning the investment, and a dividend materially exceeding post-acquisition earnings is an **impairment indicator** for the investment carrying it.",
        },
        {
          kind: "text",
          md: "The separate statements matter for real decisions — the parent's own distributable profits, its covenants, its solvency — which is why scenarios feature them: a parent whose consolidated position is strong but whose own balance sheet holds one investment (in a struggling subsidiary) and much debt; dividends streamed up a chain to fund the top; guarantee networks invisible at group level because they eliminate. The group view nets all of this; the entity view is where creditors of *each company* actually stand.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The group boundary is also a critique topic",
          md: "Consolidation's boundary is control — which means economically entangled but uncontrolled exposures (associates at one line, unconsolidated structured entities, franchise and outsourcing dependencies) sit outside the totals. The disclosure standards answer with interests-in-other-entities transparency: judgements about control and significant influence, NCI summaries, restrictions on moving assets around the group, and the nature of unconsolidated structured-entity risk. An evaluation answer knows both halves: what the line-by-line totals include, and what a user must read the notes to find.",
        },
      ],
      check: {
        q: "In its separate statements, P carries S at cost ($200m). This year S paid P a $50m dividend while reporting an $8m post-acquisition profit; S's net assets are now below P's carrying amount. What follows?",
        options: [
          "Recognise the $50m in profit and nothing more — dividends are income",
          "Recognise the $50m dividend in profit, but the payout exceeding post-acquisition earnings is an impairment indicator: test the $200m investment against recoverable amount, since S has partly repaid the investment rather than earned the distribution",
          "Credit the $50m against the investment's cost",
          "Recognise only $8m as income and $42m against cost",
        ],
        correct: 1,
        explain:
          "The current model books all dividends as income (options 2 and 3 describe the abolished cost-method carve-outs) — but pairs the recognition with the indicator: distributions out of pre-acquisition or capital reserves hollow the investment, and the impairment test restores the economics the income line obscures. The scenario's usual motive: streaming cash to service parent debt.",
      },
    },
    {
      id: "exemptions",
      heading: "Who need not consolidate — and who may disclose less",
      blocks: [
        {
          kind: "text",
          md: "An **intermediate parent** may skip preparing consolidated statements when four conditions all hold: its own owners (including those otherwise unrepresented) were informed and do not object; its instruments are **not publicly traded** nor in the process of listing; and a higher parent produces **IFRS-compliant consolidated statements available for public use**. The design is proportionate: the sub-group's information exists one level up, and the intermediate's own creditors have its separate statements. The exam edge is a failed condition — a minority objector, a listed bond, a top parent reporting under a local GAAP — any one of which restores the obligation.",
        },
        {
          kind: "text",
          md: "The **investment entity exception** inverts consolidation entirely: an entity whose business is obtaining funds from investors to deliver **returns from capital appreciation and investment income**, evaluating substantially all its investments **on a fair value basis**, does *not* consolidate its controlled investees — it measures them at **fair value through profit or loss**, because a fund's user wants portfolio values, not a line-by-line roll-up of a hundred holdings. The boundary conditions carry the marks: a subsidiary that **provides services relating to the entity's own investment activities** still consolidates; and a **non-investment-entity parent** of an investment entity does not inherit the exception — it consolidates the lot, fair-value fiction unwound.",
        },
        {
          kind: "text",
          md: "**Reduced disclosures for subsidiaries**: an eligible subsidiary — without public accountability, whose parent produces publicly available IFRS consolidated statements — may apply IFRS recognition and measurement **with substantially reduced disclosures** in its own statements. The logic mirrors the SMEs Standard (SBR-24) without changing measurement: the heavy disclosure duplication between a subsidiary's statements and the group's serves few users, while full IFRS numbers keep the subsidiary comparable and consolidation-ready. Eligibility is entity-by-entity, disclosed as the basis of preparation.",
        },
      ],
      check: {
        q: "A venture capital fund controls 14 portfolio companies and one wholly-owned entity providing administration and deal-advisory services to the fund itself. How does it report them?",
        options: [
          "Consolidate all 15 — control is control",
          "Fair value through profit or loss for the 14 portfolio investees under the investment-entity exception; consolidate the services entity, whose business is an extension of the fund's own operations rather than an investment held for returns",
          "Fair value for all 15",
          "Equity-account the 14 and consolidate the one",
        ],
        correct: 1,
        explain:
          "The exception serves users who want the portfolio at value — but the carve-out for investment-related service subsidiaries stops the fund fair-valuing its own back office (and booking gains on it). Options 0 and 2 each miss one half of the design; option 3 invents a method the exception does not use. If the fund itself had a conventional corporate parent, that parent would consolidate all 15 conventionally.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Eliminating only the group-share of intra-group items.",
      fix: "Eliminate in full — the group did no business with itself; NCI percentages affect attribution, never elimination.",
    },
    {
      trap: "Consolidating misaligned numbers.",
      fix: "Uniform policies and dates (within the three-month tolerance, adjusted) come before any combining.",
    },
    {
      trap: "Reading a parent's dividend income as performance.",
      fix: "Test it against post-acquisition earnings: excess payouts are investment repayments and an impairment indicator.",
    },
    {
      trap: "Granting exemptions on the headline and missing a failed condition.",
      fix: "Walk all the conditions — objecting minorities, traded instruments, the higher parent's IFRS compliance and availability.",
    },
  ],
  keyTerms: [
    { term: "Uniform accounting policies", def: "The requirement that subsidiaries' amounts restate to group policies before consolidation — like transactions, like treatment, group-wide." },
    { term: "Unrealised profit", def: "Margin recognised by one group member on assets still held inside the group — eliminated until realised by sale outside, borne by the seller's column." },
    { term: "Separate financial statements", def: "A parent's own statements, carrying subsidiaries, associates and JVs at cost, IFRS 9 fair value, or the equity method — by category election." },
    { term: "Investment entity", def: "An entity funding from investors for capital-appreciation and income returns, evaluated on fair value — measuring controlled investees at FVTPL instead of consolidating, except service subsidiaries." },
    { term: "Reduced-disclosure subsidiary", def: "An eligible non-publicly-accountable subsidiary applying full IFRS measurement with cut-down disclosures, relying on the parent's public consolidated statements." },
  ],
  summary: [
    "Combine line by line, align policies and dates first, eliminate self-dealing in full — with the seller's column bearing unrealised margins.",
    "Separate statements answer the legal-entity question: category-elected measurement, dividend income with the impairment indicator attached.",
    "The intermediate-parent exemption is conditional on all four legs; one objector or one listed bond restores the duty.",
    "Investment entities fair-value their portfolios — but consolidate their own service arms, and lose the exception at a conventional parent.",
    "The group boundary is control: what sits outside it is the disclosure standards' territory, and the critique's.",
  ],
  knowledgeDiagnostic: [
    { q: "Why eliminate intra-group profits in full even with a 60% subsidiary?", a: "Because the consolidated statements present one entity, and an entity earns nothing selling to itself; ownership percentages determine whose equity bears the elimination, not whether it happens." },
    { q: "How does PPE transferred intra-group at a profit unwind?", a: "Eliminate the profit and the depreciation excess it creates: the group depreciates the original cost, so the margin releases over the asset's remaining life rather than at transfer." },
    { q: "State the intermediate parent exemption's four conditions.", a: "Owners informed and not objecting (including unrepresented minorities); no publicly traded instruments; not filing for a public issue; and an ultimate or intermediate parent producing publicly available IFRS-compliant consolidated statements." },
    { q: "What does an investment entity still consolidate, and who unwinds the exception?", a: "Subsidiaries providing services relating to its own investment activities consolidate; and a non-investment-entity parent consolidates all controlled entities conventionally — the exception does not travel up." },
  ],
  furtherStudy: [
    "SBR-25 supplies the control conclusions the machine executes",
    "SBR-29 rebuilds the third statement at group level",
    "SBR-24's SMEs logic parallels the reduced-disclosure regime",
    "Area E's structured-entity and restriction disclosures are the boundary's user-side reading",
  ],
}

const SBR_TREE_29: StudyChapter = {
  paper: "SBR",
  id: "SBR-29",
  number: 29,
  area: "D",
  syllabusRefs: ["D1(m)"],
  title: "The consolidated statement of cash flows",
  minutes: 15,
  intro:
    "The group cash flow statement reports one thing: cash crossing the group's boundary. Everything inside — intra-group flows, consolidation adjustments, fair-value arithmetic — vanishes, and the statement's group-specific lines exist to keep boundary-crossing cash honest.",
  outcomes: [
    "Apply the boundary principle: which flows appear, which eliminate, and why",
    "Present acquisitions and disposals of subsidiaries as single investing flows, net of cash acquired or disposed",
    "Compute working-capital movements excluding acquisition-date balances",
    "Present NCI dividends, associate dividends and their group-specific lines",
    "Reconcile non-cash acquisition effects — shares issued, deferred consideration — out of the statement and into disclosure",
    "Read a group's cash statement critically: where consolidation optics end and cash truth begins",
  ],
  sections: [
    {
      id: "boundary-principle",
      heading: "The boundary principle",
      blocks: [
        {
          kind: "text",
          md: "The consolidated cash flow statement is the group's bank account in three categories: only cash crossing **the group boundary** reports. Intra-group dividends, management charges, loans and settlements never appear — they moved money between pockets of the same coat. The group-specific consequences follow mechanically: dividends **paid to NCI** are a real outflow (cash left the group to outside shareholders) with its own line; dividends **received from associates** are a real inflow — and the *only* cash the associate contributes, however large the equity-accounted profit; and the parent's dividends to its own shareholders report as usual.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Profit is consolidated; cash is counted",
          md: "This is why Area E trusts the group cash statement: consolidation doctrine — fair value uplifts, goodwill, equity-accounted earnings, NCI attributions — shapes every profit line but cannot conjure a single unit of cash across the boundary. An equity-accounted associate contributing $40m of profit and $2m of dividends is a $2m business in this statement; the gap is the point, and 'profits without distributions' is a standing earnings-quality question the statement lets you ask.",
        },
        {
          kind: "text",
          md: "**Acquiring or losing subsidiaries** reports as a **single investing line**: consideration paid (or received) **net of the cash and cash equivalents acquired (or disposed of)**. Buying a subsidiary for $300m that holds $45m of cash is a $255m outflow — the group paid out $300m and simultaneously took $45m inside its boundary. The composition (net assets bought, goodwill, consideration form) belongs in the notes; only the net cash crosses the statement.",
        },
      ],
      check: {
        q: "A group's 60%-owned subsidiary pays a $20m dividend. How does it appear in the consolidated statement of cash flows?",
        options: [
          "A $20m financing outflow",
          "An $8m outflow — the NCI's share, which is the only part that left the group; the parent's $12m moved inside the boundary and eliminates",
          "A $12m outflow and an $8m inflow",
          "Not at all — dividends of subsidiaries always eliminate",
        ],
        correct: 1,
        explain:
          "Trace the boundary: $12m went from one group pocket to another; $8m left the group to the outside shareholders — that $8m is the reported 'dividends paid to non-controlling interests'. Option 3 forgets the NCI is outside the group; option 0 counts internal movement as if the group were its legal fragments.",
      },
    },
    {
      id: "mechanics",
      heading: "The mechanics acquisitions break — and how to fix them",
      blocks: [
        {
          kind: "text",
          md: "Indirect-method working capital reconciliations compare opening and closing balances — but an acquisition imports balances that arrived **with the subsidiary, not through trading**. The fix is structural: movement analyses run *opening + acquired at acquisition-date values + genuine flow = closing*, so the trading flow is the balancing figure. The same discipline applies to PPE (additions exclude assets arriving inside an acquired subsidiary), provisions, and debt (loans assumed in an acquisition are not proceeds). Getting a question-one cash flow right is mostly this: quarantine what the acquisition brought before calling anything a flow.",
        },
        {
          kind: "example",
          title: "Receivables through an acquisition year",
          scenario: "Opening group receivables $180m; closing $260m. During the year the group acquired S, whose receivables at acquisition were $50m.",
          steps: [
            { label: "Naive movement", detail: "$260m − $180m = $80m 'increase' — overstating the working capital absorption." },
            { label: "Quarantine the import", detail: "$50m of the increase arrived with S, bought with investing cash, not absorbed by trading." },
            { label: "True flow", detail: "$180m + $50m + increase = $260m → trading increase $30m." },
            { label: "Report", detail: "$30m adverse working capital movement in operating; the $50m sits inside the net acquisition line." },
          ],
          result: "Every acquisition-year balance runs through the same three-line working — the difference between a cash statement and a consolidation error.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The non-cash sweep — what never enters the statement",
          items: [
            "**Shares issued as consideration** — no cash moved: the acquisition line shows only the cash element, the share consideration discloses",
            "**Deferred and contingent consideration** — outflows when *paid*, in later periods; the acquisition-date liability is disclosure",
            "**Leases entered** — right-of-use assets arrive cash-free; only rentals flow (principal in financing, interest per policy)",
            "**Fair value gains, impairments, unwinding discounts, equity-accounted profits** — reconciled out of operating profit on the indirect route",
          ],
        },
      ],
      check: {
        q: "P acquires S for $500m: $350m cash now, $100m in P's shares, $50m deferred two years. S held $30m cash. What does the acquisition line show this year?",
        options: [
          "$500m outflow",
          "$320m outflow — the $350m cash paid net of the $30m acquired; the shares never flow, and the deferred $50m flows when paid, both disclosed",
          "$470m outflow",
          "$350m outflow with the $30m shown as an operating inflow",
        ],
        correct: 1,
        explain:
          "Only cash that crossed the boundary this year counts: $350m out, $30m in, one net investing line of $320m. The share consideration is a non-cash transaction disclosed alongside; the deferred element becomes a financing-or-investing outflow at payment (with its unwinding interest meanwhile in profit). Option 3 misplaces acquired cash — it is part of the same investing transaction, not trading.",
      },
    },
    {
      id: "reading-it",
      heading: "Reading the group's cash statement critically",
      blocks: [
        {
          kind: "text",
          md: "The statement resists consolidation optics but not all curation. The critical reads: **acquisition-fuelled 'growth'** — operating inflows rising because each year's purchases import trading books, visible by comparing organic movement with the acquisition lines; **the associate gap** — equity-accounted profits without dividends (the cash is in someone else's statement); **NCI leakage** — strong group operating cash in subsidiaries with large minorities is not all the parent's to deploy, and persistent NCI dividends show the sharing; and **restricted cash** — balances in jurisdictions with exchange controls or in structured entities consolidate into 'cash and equivalents' while being undeployable, which the disclosure of restrictions exists to reveal.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The three-statement group read",
          md: "Question one increasingly pairs the spreadsheet with a 'comment on the group's cash position' requirement. The frame: profit is an opinion structured by consolidation; cash is a fact located at the boundary; the reconciliation between them — organic versus acquired, distributed versus equity-accounted, deployable versus restricted — is where the group's real condition shows. Two or three of those contrasts, quantified from the exhibit, is what the marks look like.",
        },
      ],
      check: {
        q: "A serial acquirer reports five years of rising operating cash inflows, in each of which it acquired subsidiaries mid-year. What is the essential check before crediting the trend to performance?",
        options: [
          "None — operating cash flow cannot be flattered by acquisitions",
          "Separate organic from acquired: each purchase imports a trading book whose inflows join operating from the acquisition date while the price sat in investing — rising operating cash may simply be the cumulative import, checked by asking what the pre-existing group generated",
          "Confirm the acquisitions were paid in shares",
          "Compare operating cash with EBITDA",
        ],
        correct: 1,
        explain:
          "The classification is honest — acquired businesses genuinely generate operating cash — but the trend reading is not: buying $50m of annual inflows every year manufactures a rising series regardless of underlying performance. The decomposition (and its cousin: does free cash flow after acquisition spending ever turn positive?) is the analyst's question the statement equips you to ask.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Reporting intra-group flows, or the parent's share of subsidiary dividends.",
      fix: "Only boundary-crossing cash reports: NCI's dividend share out, associates' dividends in, internal flows never.",
    },
    {
      trap: "Computing working capital movements across an acquisition naively.",
      fix: "Opening + acquired balances + flow = closing; the acquisition's imports are investing, not trading.",
    },
    {
      trap: "Showing gross consideration, or share consideration, as cash paid.",
      fix: "One net line: cash paid less cash acquired; non-cash elements disclose, deferred elements flow when paid.",
    },
    {
      trap: "Treating consolidated 'cash and equivalents' as freely deployable.",
      fix: "Check the restrictions disclosure — controlled-jurisdiction and structured-entity cash counts but cannot move.",
    },
  ],
  keyTerms: [
    { term: "Group boundary", def: "The consolidation perimeter: only cash crossing it appears in the consolidated statement of cash flows." },
    { term: "Net cash on acquisition", def: "Consideration paid in cash less the acquiree's cash and equivalents — the single investing line an acquisition produces." },
    { term: "Dividends paid to NCI", def: "The outside shareholders' share of subsidiary dividends — a real group outflow with its own financing line." },
    { term: "Non-cash transaction (group)", def: "Investing or financing without cash movement — share consideration, assumed debt, leases entered — disclosed, never forced into the statement." },
    { term: "Restricted cash", def: "Consolidated balances the group cannot freely deploy — exchange-controlled or ring-fenced — disclosed as restrictions on 'cash and equivalents'." },
  ],
  summary: [
    "One test for every item: did cash cross the group boundary? Internal flows, doctrine and fair-value arithmetic never do.",
    "Acquisitions are one net investing line, and their imported balances quarantine out of every movement working.",
    "NCI dividends out, associate dividends in — the group-specific lines are the boundary made visible.",
    "Non-cash consideration and assumed debt disclose; they flow, if ever, when paid.",
    "Read it as the anti-consolidation statement: organic versus acquired, earned versus distributed, counted versus deployable.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do equity-accounted associates barely appear in the cash flow statement?", a: "Because only their dividends cross the group boundary — the share of profit is consolidation arithmetic, reconciled out on the indirect route, leaving the dividend as the associate's entire cash contribution." },
    { q: "Walk the receivables working for an acquisition year.", a: "Opening balance plus receivables acquired at the acquisition date plus the trading movement equals closing; solve for the movement — the acquired balances came through investing, inside the net acquisition line." },
    { q: "How does a share-financed acquisition of a cash-rich subsidiary appear?", a: "Potentially as a net investing inflow — zero cash paid, acquired cash arriving — with the share consideration disclosed as a non-cash transaction; the statement records the boundary truth however odd the optics." },
    { q: "Name three critical reads specific to group cash statements.", a: "Organic-versus-acquired decomposition of operating inflows; the associate profit-to-dividend gap; and NCI leakage plus restricted balances qualifying how much of 'group cash' the parent can actually use." },
  ],
  furtherStudy: [
    "SBR-23 supplies the single-entity cash flow disciplines this chapter extends",
    "SBR-28's boundary and elimination logic is the same principle in balance-sheet form",
    "SBR-30 explains the equity-accounted profits this statement strips back to dividends",
    "Area E builds the earnings-quality reads this chapter's critical section previews",
  ],
}

const SBR_TREE_30: StudyChapter = {
  paper: "SBR",
  id: "SBR-30",
  number: 30,
  area: "D",
  syllabusRefs: ["D2(a)", "D2(b)"],
  title: "Associates and joint arrangements",
  minutes: 16,
  intro:
    "Between control and a passive holding sit two relationships with their own accounting: significant influence, equity-accounted as one line; and joint control, split by rights into ventures and operations. The classifications carry consequences — which is why scenarios engineer them.",
  outcomes: [
    "Identify significant influence, including through the 20% presumption both ways",
    "Apply the equity method: cost plus share of post-acquisition comprehensive income, dividends deducted",
    "Eliminate the investor's share of profits on transactions with associates, both directions",
    "Apply the loss floor, the implicit-goodwill impairment test, and equity-method commencement and cessation",
    "Classify joint arrangements by rights — venture or operation — and account for each",
    "Evaluate the one-line nature of equity accounting: what it nets, and what it hides",
  ],
  sections: [
    {
      id: "influence-and-method",
      heading: "Significant influence, and the equity method",
      blocks: [
        {
          kind: "text",
          md: "**Significant influence** is the power to participate in financial and operating policy decisions without controlling them — presumed at **20% or more** of the voting power, rebuttable both directions. The evidence beats the arithmetic: board representation, policy-making participation, material transactions, interchange of management, essential technical dependency can establish influence below 20%; and a 25% holder frozen out — no board seat sought or given, no information beyond the AGM — may rebut it. The exam expects the presumption stated, then argued from the scenario's facts.",
        },
        {
          kind: "text",
          md: "The **equity method**: recognise the investment at **cost**, then adjust each period for the investor's **share of post-acquisition profit or loss** (through the investor's P&L, one line) and **share of OCI** (through OCI), deducting **dividends received** as returns of the balance. Inside the machinery, miniature consolidation disciplines apply: the associate's numbers align to the investor's policies; implicit goodwill (cost above the share of fair-valued net assets) stays inside the carrying amount, unamortised; fair-value adjustments depreciate through the share of profit; and the share of **unrealised profits on transactions with the associate eliminates in both directions** — upstream and downstream — to the extent of the investor's interest.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The mechanics that carry the marks",
          items: [
            "**Loss floor** — losses reduce the investment (including long-term interests forming part of the net investment) to zero, then stop, unless the investor has obligations or made payments; recovery resumes only after unrecognised losses are made good",
            "**Impairment** — the entire carrying amount (implicit goodwill inseparable) tests as a single asset under IAS 36 against recoverable amount, and unlike consolidated goodwill's, this impairment can reverse",
            "**Commencement and cessation** — influence gained starts the method; influence lost remeasures any retained interest to fair value through profit (SBR-27's boundary grammar, one level down)",
            "**Held-for-sale associates** move to IFRS 5 measurement; the method pauses",
          ],
        },
      ],
      check: {
        q: "An investor pays $100m for 30% of A, whose fair-valued identifiable net assets are $280m. In year one A earns $40m and pays $10m of dividends; the investor also sold goods to A at a $6m margin, half still in A's inventory. What is the year-end carrying amount?",
        options: [
          "$100m + $12m − $3m = $109m",
          "$100m + share of profit $12m − dividends $3m − unrealised profit share $0.9m = $108.1m",
          "$100m + $12m = $112m — dividends are income, not deductions",
          "$84m + $12m − $3m — cost above net-asset share writes off first",
        ],
        correct: 1,
        explain:
          "Cost $100m (the $16m excess over 30% × $280m is implicit goodwill, retained inside); plus 30% × $40m profit; minus 30% × $10m dividends (a return of the balance, not income); minus the investor's share of the unrealised downstream margin, 30% × $3m still held = $0.9m. Each omission in the other options is a classic half-mark: dividends as income, elimination skipped, goodwill written off at day one.",
      },
    },
    {
      id: "joint-arrangements",
      heading: "Joint arrangements — classified by rights, not shape",
      blocks: [
        {
          kind: "text",
          md: "**Joint control** is contractually agreed sharing of control, existing only when decisions about the relevant activities require the **unanimous consent** of the parties sharing control — a 50:50 shareholding without a unanimity clause is not joint control, and a 60:40 deal with one can be. Classification then follows **rights and obligations**, not legal shape: a **joint venture** gives the parties rights to the arrangement's **net assets** — equity-account it; a **joint operation** gives rights to the **assets and obligations for the liabilities** — each operator accounts for **its own assets, liabilities, revenues and expenses, plus its share** of those held jointly, line by line.",
        },
        {
          kind: "text",
          md: "A separate vehicle usually — but not automatically — indicates a venture: the classification pierces the vehicle when its **legal form** confers no separation (unlimited-liability structures), when **contractual terms** reverse it (the parties take all output and fund all liabilities), or when **other facts** do — a vehicle designed to sell its entire output to the parties at cost, who thereby fund every liability it incurs, is a joint operation whatever its articles say. The stakes are presentational and real: line-by-line brings gross assets, debt and revenue onto each operator's statements; one-line nets everything into an investment.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The classification is the incentive",
          md: "A debt-heavy vehicle equity-accounted contributes one modest line; the same vehicle as a joint operation loads each party's share of its borrowings onto their balance sheets. Scenarios engineer accordingly — off-take agreements quietly covering all output, guarantees funding all liabilities, while management insists on the 'venture' label for gearing's sake. The answer works the facts-and-circumstances test and names the covenant the label protects.",
        },
      ],
      check: {
        q: "Two energy groups form a 50:50 pipeline company. The shareholders' agreement requires unanimity on all key decisions; each party is contractually committed to ship half the pipeline's capacity at tariffs set to cover all operating costs and debt service. How should each party account for it?",
        options: [
          "Equity-account — a separate company with shared control is a joint venture",
          "As a joint operation: the take-or-pay commitments mean the parties purchase substantially all the output and thereby fund substantially all the liabilities — the facts give them rights to the assets and obligations for the liabilities, so each records its share line by line, debt included",
          "Consolidate 50% proportionally as a policy choice",
          "Each party records only its shipping costs",
        ],
        correct: 1,
        explain:
          "The vehicle's separation is formal only: designed dependency — all output to the parties at cost-covering tariffs — means the parties, not the vehicle, bear every economic obligation. That is the 'other facts and circumstances' limb doing exactly what it was written for. Proportionate consolidation as an election (option 2) no longer exists; the classification, not a choice, decides.",
      },
    },
    {
      id: "one-line-critique",
      heading: "What one line nets — the critique Area E will cash",
      blocks: [
        {
          kind: "text",
          md: "Equity accounting compresses an entire business into one balance and one profit share: the associate's **debt never gearing the investor's ratios**, its revenue absent from the top line, its cash locked behind the dividend decision (SBR-29's gap). The compression is defensible — the investor controls none of those resources — but exploitable: material operations placed in 49%-held vehicles keep leverage and losses at one line's remove, and a 'strategic partner' structure can be a consolidation-avoidance design, which is why the control analysis (SBR-25: de facto control, potential rights) always precedes acceptance of associate status.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The user's adjustments — and the disclosures that enable them",
          items: [
            "**Summarised financial information** for material associates and JVs — assets, liabilities, revenue, profit — lets a user gross the one line back up",
            "**Look-through gearing**: add the share of associate/JV net debt to group metrics where the exposure is economically real (guarantees, dependency)",
            "**Commitments and contingent liabilities** relating to ventures disclose — the funding obligations the one line omits",
            "**Profit quality**: share of associate profit is earnings without cash until distributed — flag it in any earnings-quality read",
          ],
        },
      ],
      check: {
        q: "A group holds exactly 49% of a heavily indebted distribution company, appoints three of its five directors, is its only customer, and guarantees its bank facilities. It equity-accounts the holding. What is the first question?",
        options: [
          "Whether the 49% should round to 50%",
          "Whether the group in fact controls the vehicle: board majority, total economic dependency and the guarantee suggest power over the relevant activities and exposure to variable returns — if control exists, consolidation brings the debt on; if genuinely only influence, the guarantee and dependency still demand disclosure and look-through analysis",
          "Whether the equity method was computed correctly",
          "Whether the guarantee is enforceable",
        ],
        correct: 1,
        explain:
          "The 49% is designed to whisper 'associate'; the facts shout otherwise — three of five directors is power, sole-customer status plus the guarantee is exposure. IFRS 10's model was built for exactly this structure, and the answer runs control first, classification second, disclosure third. The computation (option 2) is the last question, not the first.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Applying the 20% line mechanically in either direction.",
      fix: "It is a rebuttable presumption: board seats, dependency and participation decide — argued from the scenario's facts.",
    },
    {
      trap: "Crediting associate dividends to income under the equity method.",
      fix: "Dividends reduce the carrying amount; the income line is the share of profit, dividends or none.",
    },
    {
      trap: "Skipping eliminations 'because the associate is outside the group'.",
      fix: "The investor's share of unrealised margins eliminates both directions — the one line must not contain profit made with itself.",
    },
    {
      trap: "Classifying joint arrangements by their legal wrapper.",
      fix: "Rights to net assets → venture; rights to assets and obligations for liabilities — by form, terms, or designed dependency → operation, line by line.",
    },
  ],
  keyTerms: [
    { term: "Significant influence", def: "Power to participate in financial and operating policy decisions without control or joint control — presumed, rebuttably, at 20% of voting power." },
    { term: "Equity method", def: "Cost, plus the share of post-acquisition comprehensive income, less dividends received — one line in the balance sheet, one in profit, one in OCI." },
    { term: "Joint control", def: "Contractually agreed sharing of control requiring unanimous consent of the sharing parties for decisions about relevant activities." },
    { term: "Joint venture", def: "A joint arrangement giving the parties rights to its net assets — equity-accounted." },
    { term: "Joint operation", def: "A joint arrangement giving rights to the assets and obligations for the liabilities — each operator accounts line by line for its share, whatever vehicle holds it." },
  ],
  summary: [
    "Influence is evidenced, not counted: the 20% presumption opens the argument the facts must finish.",
    "The equity method is cost plus shared comprehensive income minus dividends — with policy alignment, fair-value depreciation and two-way eliminations inside.",
    "Losses stop at zero absent obligation; the whole balance impairment-tests as one asset, reversibly.",
    "Joint arrangements classify by rights — and designed dependency converts 'ventures' into line-by-line operations.",
    "One line nets debt, revenue and cash out of sight: the disclosures exist so users can gross it back — after control has been genuinely ruled out.",
  ],
  knowledgeDiagnostic: [
    { q: "What can rebut the 20% presumption in each direction?", a: "Below 20%: board representation, policy participation, material transactions, management interchange or technical dependency can establish influence. At or above: demonstrated inability to participate — no representation, information refused, influence blocked — can rebut it." },
    { q: "Why do dividends reduce the equity-method balance?", a: "The balance already holds the investor's share of earnings as they accrue; a distribution converts part of that share to cash, so counting it as income would double-recognise the same profit." },
    { q: "When do associate losses keep recognising past zero?", a: "Only to the extent the investor has legal or constructive obligations or has made payments on the associate's behalf — otherwise recognition suspends until later profits absorb the unrecognised losses." },
    { q: "What converts a separate-vehicle arrangement into a joint operation?", a: "Legal form without separation, contractual terms giving the parties the assets and liabilities, or facts and circumstances — the parties taking substantially all output and thereby funding substantially all liabilities." },
  ],
  furtherStudy: [
    "SBR-25's control model is the gate every 'associate' must fail first",
    "SBR-27's boundary grammar governs stepping into and out of influence",
    "SBR-29 shows the associate's cash reality — dividends only — at group level",
    "Area E cashes the one-line critique as look-through analysis",
  ],
}

const SBR_TREE_31: StudyChapter = {
  paper: "SBR",
  id: "SBR-31",
  number: 31,
  area: "D",
  syllabusRefs: ["D3(a)", "D3(b)"],
  title: "Foreign transactions and entities",
  minutes: 16,
  intro:
    "Two different currency problems, two different answers: an entity's own foreign transactions translate at rates that flow through profit; a foreign operation translates wholesale, with the difference parked in equity until the operation is sold. Knowing which problem you face is most of the marks.",
  outcomes: [
    "Determine functional currency from the primary-environment indicators, and defend the judgement",
    "Translate transactions and monetary/non-monetary balances, with differences through profit",
    "Translate a foreign operation — closing rate, average rate — with differences in OCI",
    "Translate and re-test goodwill and fair value adjustments as the foreign operation's assets",
    "Recycle the translation reserve on disposal, wholly or proportionately",
    "Analyse net investment exposure, its hedge, and hyperinflationary restatement's logic",
  ],
  sections: [
    {
      id: "functional-currency",
      heading: "Functional currency — a finding, not a choice",
      blocks: [
        {
          kind: "text",
          md: "An entity's **functional currency** is the currency of the **primary economic environment** in which it operates — determined from indicators, not elected. Primary: the currency that mainly influences **sales prices**, and of the country whose **competition and regulation** set them; the currency mainly influencing **labour, material and other costs**. Secondary: the currency in which **financing** is raised and **operating receipts retained**. For a foreign operation, additional indicators ask whether it is an **extension of the parent** (transacting mainly with it, remitting cash as earned, dependent) or **autonomous** — the answer deciding whether its 'foreign' results are really the parent's own-currency business in costume.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why management argues about it",
          md: "Functional currency decides *which* differences hit profit and which park in OCI: an entity funded in dollars with a weakening local functional currency reports FX losses on its dollar debt through P&L every period — but call the dollar its functional currency and the same debt goes quiet while the operating translation moves to the parent's OCI on consolidation. The standard's defence is that the determination follows the indicators and **changes only when the underlying transactions and events change** — reassessed for facts, never for preference. A scenario's convenient 'redetermination' in a devaluation year gets the SBR-01 direction test.",
        },
        {
          kind: "text",
          md: "**The entity's own foreign transactions** (its non-functional currencies): record at the **spot rate at the transaction date**; at each period end retranslate **monetary items** (cash, receivables, payables, loans) at the **closing rate** with differences **in profit or loss**; leave **non-monetary items at historical cost** at their transaction-date rates, and translate non-monetary items **carried at fair value** at the rate when fair value was measured — their 'FX' component travelling wherever the fair value change goes (P&L or OCI with it).",
        },
      ],
      check: {
        q: "A mining subsidiary in country X sells all output in dollars at prices set on global markets, pays 70% of costs in dollars, is dollar-financed by its parent, and keeps local currency only for wages. Its directors prepare its statements in the local currency 'as the law requires'. What is its functional currency?",
        options: [
          "The local currency — local incorporation and law decide",
          "The dollar: sales prices, the majority of costs and the financing are all dollar-driven, so the primary economic environment is the dollar economy — the local-currency statements the law requires are a presentation matter; measurement runs in dollars",
          "Whichever management elects and applies consistently",
          "The local currency, but hedged",
        ],
        correct: 1,
        explain:
          "The indicators converge on the dollar: globally-priced output (the classic commodity pattern), dollar costs, dollar funding. Legal reporting requirements govern presentation currency, which is a free choice with prescribed translation — functional currency is a factual finding about economics. Option 2 is the exact error the standard's 'determined, not selected' language targets.",
      },
    },
    {
      id: "translating-operations",
      heading: "Translating a foreign operation — and its goodwill",
      blocks: [
        {
          kind: "text",
          md: "A foreign operation with its own functional currency translates into the presentation currency as a package: **assets and liabilities at the closing rate**; **income and expenses at transaction-date rates**, with a period **average** as the practical proxy unless rates fluctuated significantly; **equity components at historical rates**. The plug — the difference the mixed rates create — recognises in **OCI**, accumulating in the **foreign currency translation reserve**, with the NCI's share attributed to NCI. Nothing reaches profit while the investment continues: the volatility of owning a business whose currency moves is position information, not this period's performance — SBR-08's parking logic at its clearest.",
        },
        {
          kind: "text",
          md: "**Goodwill and fair value adjustments** arising on acquiring a foreign operation are treated as **assets and liabilities of the foreign operation**: denominated in *its* functional currency, retranslated at each closing rate (differences to OCI), and impairment-tested in that currency before translation. The consequence scenarios test: consolidated goodwill moves with the subsidiary's currency even though the parent 'paid in dollars' — the premium was paid for a business that lives in pesos, and it weakens as the peso does.",
        },
        {
          kind: "example",
          title: "The reserve, built and recycled",
          scenario: "P (dollar presentation) acquired 80% of S (peso functional) three years ago. The peso has weakened steadily; the group's cumulative translation losses on S — net assets and goodwill — are $54m, of which $10.8m has been attributed to NCI. P now sells its entire holding.",
          steps: [
            { label: "While held", detail: "Each year's translation loss went to OCI: parent's share into the translation reserve, NCI's share into NCI." },
            { label: "On disposal", detail: "The parent's accumulated $43.2m reclassifies from the reserve into profit or loss as part of the disposal gain or loss." },
            { label: "NCI's share", detail: "The $10.8m attributed to NCI derecognises with the NCI itself — it never passes through profit." },
            { label: "Partial alternatives", detail: "Sell down keeping control: reattribute proportionately to NCI, no recycling. Lose control keeping an associate: recycle in full. Sell part of an associate: recycle proportionately." },
          ],
          result: "Three years of OCI losses finally meet profit in one line — the disposal result — which is why a 'profitable' exit can report a loss, and why the discussion marks ask what the reserve had been quietly accumulating.",
        },
      ],
      check: {
        q: "P acquired S when goodwill was 400m pesos at 8 pesos/$ ($50m). The peso is now 10/$. How does goodwill stand in the consolidated statements, and where did the difference go?",
        options: [
          "$50m — goodwill is a dollar asset fixed at acquisition",
          "$40m — goodwill is an asset of the peso operation, retranslated at each closing rate, the $10m cumulative loss sitting in the translation reserve through OCI",
          "$40m, with the $10m loss in profit or loss",
          "400m pesos converted at the average rate each year",
        ],
        correct: 1,
        explain:
          "The premium bought peso-denominated synergies and position: it lives, and shrinks, in pesos. Freezing it at $50m (option 0) would overstate a weakening business's premium; routing the loss to profit (option 2) mistakes holding translation for performance. The reserve carries it until disposal recycles the accumulated total.",
      },
    },
    {
      id: "exposure-and-edges",
      heading: "Net investment exposure, its hedge, and hyperinflation",
      blocks: [
        {
          kind: "text",
          md: "**Monetary items forming part of the net investment** in a foreign operation — typically long-term intra-group loans with settlement neither planned nor likely — get special routing: their exchange differences hit each entity's own P&L in the separate statements, but **in the consolidated statements move to OCI** with the translation reserve, because economically they are part of the equity stake. A **net investment hedge** extends the logic to deliberate risk management: borrow the subsidiary's currency (or use forwards) against the investment, and the **effective portion** of the borrowing's FX movement goes to OCI, offsetting the translation of the operation it hedges — cash-flow-hedge mechanics (SBR-15) applied to the ownership exposure, ineffectiveness to profit, the reserve recycling on disposal with everything else.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Hyperinflation — why restatement precedes translation",
          items: [
            "When an operation's functional currency is **hyperinflationary** (the guiding rough gauge: cumulative inflation approaching or exceeding 100% over three years, with qualitative indicators), translating raw historical numbers is meaningless — units from different dates are different units",
            "**Restate first**: non-monetary items, equity and the income statement re-express in the measuring unit current at the period end via a general price index; monetary items are already current; the net **monetary gain or loss** (holding cash loses; owing debt gains) recognises in profit",
            "**Then translate everything at the closing rate** — restatement has made all amounts current-date units, so one rate fits",
            "The exam point is the order and the why: translation cannot repair melted measurement; the index does that, then the rate converts it",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The stakeholder reading of currency reporting",
          md: "Translation differences tell a real story the discussion marks want told: a persistently negative reserve is the cost of owning businesses in weakening currencies — economic performance the P&L never shows until disposal detonates it (SBR-08's one-signed test, in currency form). The hedged group is saying it manages that exposure; the unhedged serial acquirer of soft-currency businesses is accumulating a deferred loss in equity with a disposal-day fuse.",
        },
      ],
      check: {
        q: "P lends its foreign subsidiary $80m long-term, with repayment neither planned nor likely. The subsidiary's functional currency weakens, producing a $9m loss on retranslating the loan in the subsidiary's books. Where does the loss appear in the consolidated statements?",
        options: [
          "In consolidated profit or loss — intra-group loans eliminate but their FX differences do not",
          "In OCI, in the translation reserve: the loan is in substance part of the net investment, so its exchange differences follow the investment's translation until disposal recycles them",
          "Nowhere — the loan eliminates entirely on consolidation",
          "In the subsidiary's profit only",
        ],
        correct: 1,
        explain:
          "The balance eliminates; the exchange difference is real (the group's dollar claim on a weaker-currency operation) and cannot vanish — its routing is the question. Settlement-not-planned makes the loan quasi-equity, so the difference joins the translation of the stake it effectively funds. Had the loan been ordinary trading credit, the difference would stay in consolidated profit — the classification of the loan decides, and scenarios draft it deliberately.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating functional currency as a policy choice, or changing it for a devaluation.",
      fix: "It is determined by the primary-environment indicators and changes only when the underlying facts change.",
    },
    {
      trap: "One translation recipe for both problems.",
      fix: "Own transactions: monetary at closing through profit. Foreign operations: the closing/average package through OCI.",
    },
    {
      trap: "Freezing goodwill at the acquisition-date rate.",
      fix: "Goodwill and fair value adjustments are the foreign operation's assets — retranslated every period, tested in its currency.",
    },
    {
      trap: "Forgetting the reserve at disposal — or recycling NCI's share.",
      fix: "The parent's accumulated differences reclassify into the disposal result; NCI's share leaves with the NCI, never via profit.",
    },
  ],
  keyTerms: [
    { term: "Functional currency", def: "The currency of the entity's primary economic environment — determined from sales, cost and financing indicators; not an election." },
    { term: "Presentation currency", def: "The currency the statements are displayed in — freely chosen, reached by the prescribed translation." },
    { term: "Monetary items", def: "Currency held and items receivable or payable in fixed or determinable currency amounts — retranslated at closing rates with differences in profit." },
    { term: "Foreign currency translation reserve", def: "The OCI accumulation of differences from translating foreign operations (goodwill included) — recycled to profit on disposal of the operation." },
    { term: "Net investment in a foreign operation", def: "The reporting entity's interest in the operation's net assets, including monetary items whose settlement is neither planned nor likely — whose differences route to OCI on consolidation." },
    { term: "Hyperinflationary restatement", def: "Re-expression of a hyperinflationary-currency operation's numbers in current measuring units via a price index — before translation at the closing rate, with the net monetary gain or loss in profit." },
  ],
  summary: [
    "Functional currency is a factual finding; presentation is a choice — and the argument between them is usually about where losses land.",
    "Own transactions: monetary items retranslate through profit. Foreign operations: the package translates through OCI.",
    "Goodwill lives in the operation's currency, weakening with it, tested before translation.",
    "The reserve is deferred currency history: recycled on disposal (NCI's share excepted), proportionate at the lesser boundaries.",
    "Quasi-equity loans and net investment hedges route to OCI; hyperinflation restates first, then translates — units before rates.",
  ],
  knowledgeDiagnostic: [
    { q: "Which indicators determine functional currency, in order of weight?", a: "Primary: the currency influencing sales prices and the competitive/regulatory environment, and the currency of labour and material costs. Secondary: financing and retention currency. For subsidiaries: autonomy versus extension-of-parent." },
    { q: "State both translation recipes.", a: "Entity's own transactions: spot at transaction date; monetary items at closing rate through P&L; non-monetary at historical (or fair-value-date) rates. Foreign operations: assets/liabilities at closing, income/expenses at actual or average rates, differences to OCI." },
    { q: "What happens to the translation reserve across the three disposal boundaries?", a: "Loss of control (or influence): recycle the parent's accumulated share to profit in full. Sell-down keeping control: reattribute proportionately to NCI, no recycling. Partial disposal of an associate: recycle proportionately." },
    { q: "Why restate before translating in hyperinflation?", a: "Because historical amounts in a collapsing currency are measured in different-sized units — the index re-expresses them in current units so that closing-rate translation converts one coherent measurement, with the monetary gain or loss in profit showing the cost of holding money." },
  ],
  furtherStudy: [
    "SBR-08's recycling map and one-signed test give the reserve its meaning",
    "SBR-27 supplies the disposal boundaries the recycling follows",
    "SBR-15's hedge machinery runs the net investment hedge",
    "SBR-26's goodwill computation feeds the balance this chapter retranslates",
  ],
}

export const SBR_TREE_AREA_D: StudyChapter[] = [SBR_TREE_25, SBR_TREE_26, SBR_TREE_27, SBR_TREE_28, SBR_TREE_29, SBR_TREE_30, SBR_TREE_31]
