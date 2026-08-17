import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area F — The impact of changes and potential changes in accounting
 * regulation.
 *
 * The syllabus's current-issues area, upgraded to level 3 for F1(c) in the
 * s26-j27 cycle. The shim served it with ONE section cut from the legacy
 * interpretation chapter.
 *
 *   SBR-35  Adopting new standards — the impact analysis     (F1a)
 *   SBR-36  Existing standards, contemporary problems        (F1b)
 *   SBR-37  The IFRS Sustainability Disclosure Standards     (F1c)
 *
 * Written against the official ACCA SBR-INT syllabus and study guide for
 * September 2026 to June 2027. Not derived from any approved-provider text.
 * House style: Area F questions hand you something the standards were not
 * written for — a new pronouncement, a novel asset, a disclosure regime in
 * motion — and pay for METHOD: the reasoning route, applied to the scenario,
 * with the stakeholder consequences drawn out.
 */

const SBR_TREE_35: StudyChapter = {
  paper: "SBR",
  id: "SBR-35",
  number: 35,
  area: "F",
  syllabusRefs: ["F1(a)"],
  title: "Adopting new standards — the impact analysis",
  minutes: 15,
  intro:
    "A new standard is not an accounting event — it is a business event with accounting at the centre. The syllabus asks you to appraise the implications of adoption, and the appraisal has a repeatable anatomy: measurement, transition, systems, contracts, and the users on the other end.",
  outcomes: [
    "Run the adoption impact analysis: recognition and measurement change, transition route, and downstream effects",
    "Contrast retrospective, modified retrospective and prospective transition, and what each does to comparability",
    "Assess the pre-adoption disclosure of issued-but-not-effective standards, and read it as an analyst",
    "Trace adoption effects into covenants, remuneration, distributable profits, tax and systems",
    "Evaluate a new pronouncement against the Framework — improvement, cost, and the behaviour it will change",
  ],
  sections: [
    {
      id: "impact-anatomy",
      heading: "The anatomy of an adoption impact",
      blocks: [
        {
          kind: "text",
          md: "Every adoption question decomposes the same way. **What changes in the numbers**: which recognitions, measurements and presentations move, in which direction, and by roughly how much for this entity's transaction mix — the answer is entity-specific, which is why the examiner supplies a scenario rather than asking for the standard's contents. **When and how it lands**: the transition route the standard prescribes. **What it touches beyond the statements**: covenants and other contracts written on the old numbers, bonus and incentive plans, dividend capacity, tax where filings follow accounts, and the systems and data the new measurements require. **Who needs telling what**: the disclosure sequence from issue to adoption.",
        },
        {
          kind: "table",
          caption: "The transition routes and their trade-offs",
          head: ["Route", "Mechanics", "What it buys — and costs"],
          rows: [
            ["Full retrospective", "Restate comparatives as if the standard had always applied", "Perfect trend comparability; heaviest data burden — sometimes impossible without hindsight"],
            ["Modified retrospective", "Apply from the adoption date; cumulative catch-up to opening equity, comparatives unrestated", "Practical; but the trend breaks — the comparative year speaks a different language"],
            ["Prospective", "New treatment for new transactions only", "Cheapest; two regimes coexist for years as old transactions run off"],
            ["Reliefs and expedients", "Standard-specific options inside a route", "Each relief taken is comparability spent — and disclosure of choices made is what lets users adjust"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The IFRS 16 case study — worth carrying as the template",
          md: "Lease capitalisation is the model adoption story: assets and debt up, EBITDA up (rent became depreciation plus interest), gearing covenants strained by accounting rather than economics, 'frozen GAAP' clauses invoked or renegotiated, and modified-retrospective adopters reporting a comparative year users had to mentally restate. An answer that runs a scenario's new standard through that template — metric by metric, contract by contract — is doing the appraisal the syllabus means.",
        },
        {
          kind: "text",
          md: "**Before adoption**, entities disclose issued-but-not-yet-effective standards with the known or reasonably estimable impact. The analyst's reading of that disclosure has teeth: 'the impact is being assessed' three years running, from an entity whose covenants sit near their limits, is either poor governance or strategic vagueness — and the estimate's arrival, its size and its timing relative to refinancings are all evidence. The preparer-side ethics mirror: delaying the impact estimate because the number is unwelcome is SBR-01's territory.",
        },
      ],
      check: {
        q: "A standard effective next year will bring the entity's committed purchase contracts on balance sheet, adding roughly $400m of liabilities. This year's accounts say only: 'the directors are assessing the impact.' The entity is renegotiating facilities this year. What is the correct appraisal?",
        options: [
          "The disclosure is adequate — the standard is not yet effective",
          "The impact is reasonably estimable — the entity knows its committed contracts — so the disclosure understates what is known; withholding a quantifiable $400m from lenders currently pricing facilities is a disclosure failure with an SBR-01 direction, whatever the literal words of the note",
          "The entity should early-adopt the standard",
          "No disclosure is required until adoption",
        ],
        correct: 1,
        explain:
          "The requirement is known-or-reasonably-estimable impact, and a population of committed contracts is estimable by construction. The timing — vagueness maintained through a renegotiation the number would move — converts a compliance shortfall into an ethics finding. Early adoption (option 2) is sometimes available but never obligatory; the obligation the entity is dodging is honesty about what is coming.",
      },
    },
    {
      id: "downstream",
      heading: "Downstream: contracts, cash and systems",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Where adoption bites beyond the statements",
          items: [
            "**Covenants** — ratios move with definitions: 'frozen GAAP' clauses hold the old measurement, floating clauses import the new one mid-facility; renegotiation leverage shifts to whoever the change favours",
            "**Remuneration** — EPS and profit targets hit or missed by accounting change; committees must decide whether to adjust, and the decision is itself governance evidence",
            "**Distributable profits** — measurement changes flow into realised-profit computations in many regimes; a standard can constrain dividends without touching cash",
            "**Tax** — where taxable profit follows accounting profit, adoption changes cash tax and the deferred tax bridge (SBR-19)",
            "**Systems and data** — new measurements need inputs old systems never captured: expected losses need forward-looking credit data, lease liabilities need complete contract populations",
            "**Investor communication** — restated trends, bridge disclosures, and the first-year explanation burden",
          ],
        },
        {
          kind: "illustration",
          title: "One standard, three stakeholders",
          md: "Take a new standard tightening revenue recognition for bundled contracts. The **lender's** question: does deferred revenue's growth change leverage and coverage under our definitions — and is our covenant frozen or floating? The **remuneration committee's**: the CEO's revenue-growth target is now unhittable on the new basis — adjust the target (and disclose the adjustment), or let accounting change pay-outs? The **investor's**: the restated trend shows growth was always slower than reported — the standard did not change the business, it revealed it. Same adoption, three appraisals; the exam names the chair and expects its version.",
        },
      ],
      check: {
        q: "On adopting a standard that capitalises previously expensed development costs, an entity's profit rises and its CEO's profit-linked bonus vests. The remuneration committee proposes no adjustment, noting 'the accounts are the accounts'. Appraise.",
        options: [
          "Correct — accounting standards are objective and bonuses follow the accounts",
          "The bonus is vesting on measurement change, not performance: the work is the same work that missed the target last year on the old basis. A committee that adjusts targets when accounting hurts pay but not when it helps has a one-way policy — the governance finding — and disclosure of the adoption's effect on incentive outcomes is what lets shareholders see it",
          "The standard should not have been adopted",
          "The bonus should be cancelled entirely",
        ],
        correct: 1,
        explain:
          "Separating measurement effects from performance effects is the committee's job, and the direction test grades how it does it: symmetric adjustment policies are governance; asymmetric ones are extraction. The answer is not that accounting-linked pay is wrong (option 3 overshoots) but that the link's handling under regime change is evidence shareholders are owed.",
      },
    },
    {
      id: "evaluating-pronouncements",
      heading: "Evaluating the pronouncement itself",
      blocks: [
        {
          kind: "text",
          md: "F1(a) also asks for appraisal of the change **as standard-setting**: is the new requirement an improvement? The evaluation runs on SBR-04's machinery, sharpened to a checklist: does it make information more **relevant** or more **faithfully representative** — and for whom? What **comparability** does it buy across entities, and what does transition spend? What does it **cost** preparers, and is the cost proportionate to the user benefit? What **behaviour** will it change — both intended (structuring shut down) and perverse (transactions redesigned to sit outside the new words, thresholds managed, the next generation of SBR-02's toolkit)? And is it **principles or rules** — with the drift toward anti-abuse detail that every abused principle accumulates?",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The perverse-incentive paragraph is where evaluation lives",
          md: "Any candidate can list a standard's aims; the discriminating paragraph predicts the response. Capitalise leases — watch 'service' contracts bloom. Expense development — watch acquisitive entities buy what organic ones cannot capitalise. Tighten segment aggregation — watch the CODM pack redesigned. The prediction is not cynicism; it is the Framework's own logic run forward: measurement changes prices, prices change behaviour. One well-chosen perverse incentive, tied to the scenario's entity, outscores four generic advantages.",
        },
        {
          kind: "text",
          md: "The complete Area F answer therefore has a fixed skeleton: the change and its direction for this entity (quantified where the exhibit allows); the transition route and its comparability cost; the downstream map (covenants, pay, dividends, tax, systems) filtered to what the scenario makes live; the stakeholder reading from the named chair; and the standard-setting appraisal with one honest perverse incentive. Fifteen minutes of structure that fits any pronouncement the examiner invents.",
        },
      ],
      check: {
        q: "Asked to evaluate a proposed standard requiring all intangible investment to be capitalised, a candidate writes four paragraphs on improved relevance and comparability. What is the highest-value missing element?",
        options: [
          "A list of the disclosure requirements",
          "The behavioural response and its costs: capitalisation of self-assessed 'investment' hands management a deferral lever (SBR-13's development criteria exist because of it), invites reclassification of operating spend, and shifts the earnings-quality burden to impairment testing — the appraisal must weigh what the change makes possible, not only what it intends",
          "A comparison with US practice",
          "The effective date",
        ],
        correct: 1,
        explain:
          "Four advantage-paragraphs earn the marks of one, because they evaluate the intention rather than the instrument. The examiner's own answer will spend its weight on the judgement the proposal creates and who will lean on it — the direction-test habit applied prospectively. That is what 'appraise' means at level 3.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Describing the new standard instead of its impact on the scenario entity.",
      fix: "Quantify direction and rough size for this entity's mix, then trace covenants, pay, dividends, tax and systems.",
    },
    {
      trap: "Ignoring the transition route.",
      fix: "Name it, and price its comparability cost — modified retrospective breaks the trend the analyst was using.",
    },
    {
      trap: "Reading 'impact being assessed' disclosures as compliance.",
      fix: "Test estimability against what the entity must already know, and the vagueness's timing against its financing calendar.",
    },
    {
      trap: "Evaluating pronouncements as all upside.",
      fix: "Predict the behavioural response — the perverse incentive paragraph is where appraisal marks concentrate.",
    },
  ],
  keyTerms: [
    { term: "Transition provisions", def: "A new standard's rules for first application — full or modified retrospective, prospective, and the reliefs inside each — determining what happens to comparatives." },
    { term: "Modified retrospective", def: "Adoption from the effective date with the cumulative effect in opening equity and comparatives unrestated — practical, trend-breaking." },
    { term: "Frozen GAAP clause", def: "A contract term fixing covenant computations to the accounting standards in force at signing — insulating the deal from adoption effects." },
    { term: "Issued-but-not-effective disclosure", def: "The required disclosure of standards issued but not yet applied, with known or reasonably estimable impact — the analyst's early-warning line." },
    { term: "Behavioural response", def: "The transacting and structuring changes a measurement change induces — the evaluation element that separates appraisal from description." },
  ],
  summary: [
    "Adoption analysis has an anatomy: number changes, transition route, downstream contracts and systems, stakeholder readings.",
    "Transition is a comparability trade — every relief taken is trend information spent.",
    "Pre-adoption disclosure is testable: known-or-estimable is a standard, and strategic vagueness has a direction.",
    "Covenants, pay and dividends move on definitions; the frozen-versus-floating question decides who bears the change.",
    "Evaluate pronouncements as instruments: user benefit, preparer cost, and the behaviour — intended and perverse — they will buy.",
  ],
  knowledgeDiagnostic: [
    { q: "Walk the adoption impact anatomy.", a: "What changes in recognition, measurement and presentation for this entity; the transition route and its comparability cost; downstream effects on covenants, remuneration, distributable profits, tax and systems; and the disclosure sequence from issue to adoption." },
    { q: "Contrast full and modified retrospective transition for a user.", a: "Full restates the trend so periods compare on one basis at heavy preparer cost; modified leaves the comparative on the old basis with a catch-up in equity — cheaper, but the user must bridge two languages across one trend line." },
    { q: "Why is IFRS 16 the template adoption story?", a: "It moved debt and EBITDA simultaneously without changing economics — straining covenants, invoking frozen-GAAP clauses, resetting metrics — and its modified-retrospective route left a comparative year users had to restate mentally." },
    { q: "What makes a perverse-incentive prediction strong?", a: "Specificity: tied to the scenario entity's transactions and metrics, showing which judgement the new requirement hands management and which SBR-02 technique it will spawn — measurement changes prices, prices change behaviour." },
  ],
  furtherStudy: [
    "SBR-04 supplies the standard-setting machinery this chapter's evaluation runs on",
    "SBR-36 applies the same method where no new standard exists — the gap-filling mirror",
    "SBR-23's covenant-classification edges show adoption effects at the balance-sheet line",
    "SBR-02 predicts the toolkit each new requirement retires — and the one it creates",
  ],
}

const SBR_TREE_36: StudyChapter = {
  paper: "SBR",
  id: "SBR-36",
  number: 36,
  area: "F",
  syllabusRefs: ["F1(b)"],
  title: "Existing standards, contemporary problems",
  minutes: 16,
  intro:
    "The syllabus names its contemporary issues — digital assets, climate change, natural disasters and wider global events — because each strains standards written for a different world. The skill is applying what exists, honestly, and saying where it creaks.",
  outcomes: [
    "Account for cryptocurrency and digital assets through existing standards, and critique the fit",
    "Report a natural disaster: impairments, onerous contracts, insurance, and the events-after boundary",
    "Trace climate change through the existing standards — lives, impairments, provisions, ECLs, going concern",
    "Report through global disruptions: the estimate discipline when uncertainty spikes",
    "Structure any novel-transaction answer: classify, apply, disclose, critique",
  ],
  sections: [
    {
      id: "digital-assets",
      heading: "Digital assets — old categories, new asset",
      blocks: [
        {
          kind: "text",
          md: "Cryptocurrency holdings walk SBR-04's IAS 8 ladder and land, awkwardly, in old categories. **Not cash** — not legal tender, not a stable medium of account; **not a financial asset** — no contractual right to cash or another instrument, no equity of an entity. What remains: **IAS 2 inventory** where held for sale in the ordinary course (a broker-trader measures at fair value less costs to sell through profit — the best available answer for traders); otherwise **IAS 38 intangibles** — non-monetary, no physical substance, identifiable — at cost with impairment, or revaluation *only* through the active-market route crypto sometimes actually satisfies. The revaluation model's own shape then bites: gains to OCI (no profit until sale), losses to P&L — an asymmetry that reports a volatile speculative holding more conservatively than management expects.",
        },
        {
          kind: "text",
          md: "The critique is part of the required answer: a cost-model intangible carrying a liquid, volatile asset reports neither its value nor its risk; the OCI-parked gains of the revaluation model puzzle users who see an economically trading position; and disclosure has to carry what measurement cannot — quantities, fair values, custody and key-risk information. Wider digital assets ask the same classification question with different facts: **tokens conferring rights** (to goods, services, or issuer cash flows) may be prepayments, financial assets or revenue-contract liabilities on the issuer's side; **customer crypto held in custody** turns on control — SBR-06's asset definition deciding whose balance sheet carries it; **mining/validation rewards** are income measured at fair value when control of the reward is obtained.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The answer skeleton for any novel asset",
          md: "Classify (walk the ladder, eliminate categories with reasons), apply (the surviving standard's actual mechanics, including its uncomfortable results), disclose (judgement, sensitivity, and what measurement fails to convey), critique (one paragraph: where the fit fails and what better information would look like). The examiner rotates the asset — carbon credits, data sets, in-game currencies — the skeleton does not change.",
        },
      ],
      check: {
        q: "A retailer accepts bitcoin, converts receipts to cash weekly, and also holds a long-term bitcoin 'treasury reserve' bought as an inflation hedge. How do the two holdings classify?",
        options: [
          "Both as cash equivalents — bitcoin functions as money for the entity",
          "The trading receipts pipeline may approach inventory/receivable treatment in substance, but the treasury holding is an IAS 38 intangible — not cash (no legal tender status), not a financial asset (no contractual right), not inventory (not held for sale in the ordinary course) — at cost-impairment or, if an active market exists, revalued with gains to OCI",
          "Both as financial assets at FVTPL",
          "Both as investment property",
        ],
        correct: 1,
        explain:
          "Purpose splits the holdings, and elimination does the classification work: the treasury position fails cash, financial-asset and inventory definitions in turn, leaving IAS 38 — whose measurement then under-reports exactly the volatility the entity bought. Saying that last part is the critique mark. Options 0 and 2 assign categories whose definitions the asset simply fails.",
      },
    },
    {
      id: "disasters-and-disruption",
      heading: "Natural disasters and global disruptions",
      blocks: [
        {
          kind: "text",
          md: "A disaster's reporting is a tour of standards this course has already built, sequenced. **Timing first**: the event before the reporting date adjusts everything it evidences; after it, SBR-20's non-adjusting analysis — disclose nature and estimated effect, and only a going-concern failure rewrites the basis. **Assets**: damage is an impairment indicator (SBR-12) — write down to recoverable amount, remembering the held-for-sale and scrap endpoints; inventory to net realisable value. **Obligations**: onerous contracts crystallise (supply commitments the entity can no longer fulfil profitably); restoration and clean-up obligations arise when the damage does — legal or constructive; restructuring provisions only behind SBR-20's announcement gate. **Recoveries**: insurance is a **separate asset, recognised only when receipt is virtually certain** — never netted against the loss, and business-interruption claims under negotiation rarely qualify by the year end. The disciplined answer shows the loss gross, the recovery when earned, and the timeline honestly.",
        },
        {
          kind: "text",
          md: "**Global disruptions** — pandemics, wars, sanctions, supply-chain seizures — are the same standards under estimate stress, plus three signatures. **Estimate discipline**: forecasts feeding ECLs (SBR-16's forward-looking scenarios), impairment models and deferred tax assets must reflect conditions *at the reporting date*, updated consistently across all three (the SBR-19 cross-check). **Contract effects**: force majeure and penalty clauses, lease concessions, government support programmes (SBR-24's grant gate), and onerous-contract testing across the book. **Presentation temptation**: the 'one-off costs of the crisis' line that quietly absorbs ordinary bad performance — IFRS 18's structure and the MPM tests police it, and the symmetric question ('were crisis *benefits* — subsidies, demand spikes — also isolated?') is the direction test in crisis form.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Uncertainty is not an estimate holiday",
          md: "The recurring management position in disrupted periods — 'nothing can be reliably estimated, so we have provided nothing / changed nothing' — inverts the standards: IAS 37 expects estimation in all but extremely rare cases, ECLs demand probability-weighted scenarios precisely when outcomes disperse, and IAS 1's sensitivity disclosures exist for exactly this moment. Wide ranges honestly disclosed beat point estimates falsely confident — and beat silence completely.",
        },
      ],
      check: {
        q: "A flood destroys a distribution centre in March; the year end is 31 March; the entity's insurer has 'accepted the claim in principle, quantum under negotiation' by the sign-off date in June. Management nets the expected $30m recovery against the $45m write-down. What is correct?",
        options: [
          "The netting is acceptable — the claim is accepted in principle",
          "Report the $45m impairment and clean-up obligations gross; recognise the insurance asset only when receipt is virtually certain — acceptance in principle with quantum open is not that — and disclose the claim's status; the net $15m presentation overstates certainty and understates the loss",
          "Defer the whole event to next year as non-adjusting",
          "Recognise the $30m and disclose the $45m",
        ],
        correct: 1,
        explain:
          "The flood preceded the year end, so its losses adjust; the recovery is a separate asset behind a deliberately high gate (SBR-20's reimbursement rule) that an unquantified in-principle acceptance does not clear. Netting merges two different certainties into one comfortable number — the presentation the no-offset rule exists to prevent.",
      },
    },
    {
      id: "climate-through-standards",
      heading: "Climate change through the existing standards",
      blocks: [
        {
          kind: "text",
          md: "Before any sustainability standard applies, climate reaches the financial statements through the existing ones — wherever it affects the amounts. **Useful lives and residual values**: transition policy and demand shifts shorten carbon-intensive assets' lives — an estimate change with immediate depreciation effect. **Impairment**: carbon prices, demand erosion and stranded-asset risk belong in value-in-use forecasts and fair values; a model whose terminal value assumes indefinite fossil demand contradicts both the market and, often, the entity's own disclosures. **Provisions**: decommissioning accelerates when closure dates move; new legal or constructive obligations (emissions schemes, published net-zero commitments creating valid expectations) enter SBR-20's machinery. **ECLs**: borrower transition risk is forward-looking information SBR-16 requires. **Going concern and the deferred tax cross-check** complete the sweep.",
        },
        {
          kind: "text",
          md: "The examinable centre is **consistency** — SBR-34's connectivity test run from the preparer's side. The entity's climate commitments, its scenario disclosures and its financial statement assumptions must describe one future: an announced 2035 exit with 2050 depreciation schedules is a finding wherever it appears. And materiality does the gatekeeping honestly in both directions — climate effects material to users' decisions must reach the statements, but boilerplate climate paragraphs in the accounts of an entity it barely touches are SBR-05's obscuring in green.",
        },
        {
          kind: "examQuestion",
          title: "Discuss the reporting implications of a contemporary issue",
          format: "written",
          marks: 10,
          requirement: "Discuss the implications of the group's announced decarbonisation commitments for its financial statements, and comment on the finance director's view that 'these are sustainability matters with no accounting effect until money is spent'.",
          plan: [
            { step: "Refute the framing first", detail: "Climate reaches the statements through existing standards wherever amounts are affected — no new standard is needed for that, and 'until money is spent' inverts accrual accounting." },
            { step: "Sweep the standards in sequence", detail: "Lives and residuals, impairment inputs, provisions (legal AND constructive from the announcement), ECLs, going concern — each tied to a scenario fact." },
            { step: "Run the connectivity test", detail: "Set the announced commitments against the statements' current assumptions; name each inconsistency and its P&L direction." },
            { step: "Handle the constructive-obligation edge", detail: "What exactly did the announcement promise, to whom, with what specificity — SBR-20's valid-expectation test on the actual words." },
            { step: "Close with disclosure and direction", detail: "Estimate-change and sensitivity disclosures due now; and note whose metrics benefit from the delay the FD proposes." },
          ],
          answer:
            "The finance director's framing is wrong in principle: climate commitments affect the financial statements through the existing standards wherever they change the amounts and assumptions already being reported, and accrual accounting recognises obligations and consumption when they arise, not when cash moves.\n\nThe announced 2035 exit from the coal fleet shortens those assets' useful lives from the 2048 dates currently used — a change in estimate increasing depreciation immediately. The same date belongs in the impairment models: value-in-use forecasts extending revenues past the exit, without carbon pricing the group's own scenario disclosure assumes, overstate recoverable amounts, and the goodwill allocated to the generation CGU is first in line. The rehabilitation provisions discount from settlement dates that accelerate by thirteen years, increasing the liability now.\n\nThe announcement itself may have created constructive obligations: the commitment to fund community transition programmes was specific, public and addressed to the affected regions — a valid expectation under IAS 37, provided the criteria of a present obligation from a past event are met on the words actually used. The retraining pledge, by contrast, is aspiration without specificity and remains unprovided.\n\nConsistency is the overriding discipline: the group's sustainability disclosures, its scenario analysis and its financial statements must assume the same future. Publishing a 2035 exit while depreciating to 2048 is an inconsistency a reader can find in an afternoon, and either the commitment or the accounting requires correction.\n\nThe required disclosures — the estimate changes, their amounts, and the sensitivity of the impairment conclusions to the transition assumptions — are due in these statements. It is also worth the audit committee's attention that every element of the director's 'no effect yet' position defers charges, in a year when the incentive plan vests on earnings.",
          earns: [
            "The accrual refutation before the detail",
            "Each standard swept with a scenario fact attached",
            "The constructive-obligation test run on the announcement's actual words",
            "Connectivity stated as the master discipline",
            "The direction observation closing it",
          ],
          loses: [
            "Treating the question as an IFRS S2 disclosure question",
            "Sweeping standards generically without the scenario's dates and numbers",
            "Providing for every aspiration in the announcement",
            "No mention of the estimate-change disclosures now due",
          ],
        },
      ],
      check: {
        q: "An energy group's value-in-use models assume oil demand growing to 2050; its own published scenario analysis centres on demand peaking in 2030. The models show comfortable headroom. What is the finding?",
        options: [
          "None — value in use uses management's best estimate, which may differ from scenarios",
          "The impairment inputs contradict the entity's own published expectations: forecasts must be reasonable and supportable, and an entity cannot simultaneously tell investors demand peaks in 2030 and test assets on growth to 2050 — the headroom is an artefact of the inconsistency, and the sensitivity disclosure should reveal how much",
          "The scenario analysis should be withdrawn",
          "Value in use should be replaced by fair value",
        ],
        correct: 1,
        explain:
          "Management's 'best estimate' cannot be two different numbers in two documents for the same future: the published scenario is evidence of what management actually expects, and IAS 36's reasonable-and-supportable requirement imports it. This is connectivity with immediate arithmetic consequences — recompute at the disclosed scenario and the headroom, not the asset, is what disappears.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Inventing a crypto-specific accounting treatment.",
      fix: "Walk the ladder: eliminate cash, financial assets and (usually) inventory with reasons, apply IAS 38's actual mechanics, then critique the fit.",
    },
    {
      trap: "Netting insurance recoveries against disaster losses.",
      fix: "Gross loss when incurred; separate recovery asset only at virtual certainty — in-principle acceptance is not it.",
    },
    {
      trap: "Treating climate as disclosure-only until a sustainability standard says otherwise.",
      fix: "Lives, impairments, provisions, ECLs and going concern already carry it — wherever amounts are affected.",
    },
    {
      trap: "Letting crisis uncertainty excuse estimation.",
      fix: "Probability-weight the scenarios, disclose the ranges and sensitivities — wide and honest beats silent.",
    },
  ],
  keyTerms: [
    { term: "Broker-trader exemption", def: "IAS 2's measurement for commodity broker-traders — fair value less costs to sell through profit — the route by which crypto traders escape cost-based measurement." },
    { term: "Active market (IAS 38)", def: "The revaluation model's gate for intangibles: homogeneous items, willing buyers and sellers, public prices — which liquid cryptocurrencies can genuinely satisfy." },
    { term: "Reimbursement asset", def: "An insurance or other recovery recognised separately, only when receipt is virtually certain, capped at the related provision — never netted." },
    { term: "Stranded asset", def: "An asset whose economic life is cut short by transition — regulation, demand or technology — reaching the statements through lives, impairment and provisions." },
    { term: "Constructive climate obligation", def: "A public commitment specific enough to create valid expectations in identifiable parties — entering IAS 37 when its announcement is the past event." },
  ],
  summary: [
    "Novel assets classify by elimination, apply the surviving standard honestly, and earn a critique paragraph.",
    "Disasters sequence timing, impairment, obligations and gross-not-net recoveries — the standards already built, in order.",
    "Disruptions stress estimates: scenario-weight, cross-check consistency, and police the 'one-off crisis costs' line both ways.",
    "Climate reaches the statements today through lives, impairments, provisions, ECLs and going concern.",
    "Connectivity governs: one entity, one assumed future, in every document that bears its name.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does cryptocurrency fail the cash and financial-asset definitions?", a: "It is not legal tender or a generally stable medium of account (cash), and it embodies no contractual right to receive cash or another financial instrument and no equity claim (financial asset) — leaving inventory for ordinary-course sellers and IAS 38 for the rest." },
    { q: "State the insurance recovery rule and its rationale.", a: "Recognise a separate asset only when receipt is virtually certain, capped at the related loss or provision, never netted — because merging a certain loss with an uncertain claim reports a certainty that does not exist." },
    { q: "List five routes climate takes into current financial statements.", a: "Shortened useful lives and residual values; impairment inputs (carbon prices, demand, stranded-asset risk); new or accelerated provisions including constructive obligations from public commitments; forward-looking ECL scenarios; and the going-concern and deferred-tax-asset assessments." },
    { q: "What makes a public commitment a constructive obligation?", a: "Specificity and audience: a stated commitment, particular enough to create valid expectations in identifiable other parties, whose announcement constitutes the past event — aspirational targets without specifics do not qualify." },
  ],
  furtherStudy: [
    "SBR-04's IAS 8 ladder is the classification engine every novel asset walks",
    "SBR-12, SBR-16 and SBR-20 are the machinery disasters and climate run through",
    "SBR-34's connectivity test is this chapter's discipline read from the analyst's side",
    "SBR-37 adds the disclosure architecture built for the climate half of this story",
  ],
}

const SBR_TREE_37: StudyChapter = {
  paper: "SBR",
  id: "SBR-37",
  number: 37,
  area: "F",
  syllabusRefs: ["F1(c)"],
  title: "The IFRS Sustainability Disclosure Standards",
  minutes: 16,
  intro:
    "IFRS S1 and S2 brought sustainability reporting under the IFRS Foundation's roof, built for the same investors the financial statements serve. The syllabus wants three things: the architecture, an assessment of what the climate disclosures are worth, and the differences from Europe's ESRS.",
  outcomes: [
    "Outline IFRS S1's scope, objective and conceptual foundations, and its links to the financial statements",
    "Apply the four-pillar core content — governance, strategy, risk management, metrics and targets",
    "Outline IFRS S2's climate-specific requirements: transition and physical risk, scenario resilience, the three scopes",
    "Handle judgements, uncertainties and errors in sustainability disclosure",
    "Assess the usefulness of climate-related disclosures to investors — genuinely, both ways",
    "Explain the key differences between the ISSB standards and the ESRS, and what interoperability means in practice",
  ],
  sections: [
    {
      id: "s1-architecture",
      heading: "IFRS S1 — the architecture",
      blocks: [
        {
          kind: "text",
          md: "**IFRS S1** requires disclosure of information about **sustainability-related risks and opportunities that could reasonably be expected to affect the entity's prospects** — its cash flows, its access to finance, its cost of capital — over the short, medium and long term. The conceptual foundations deliberately mirror the Framework: **fair presentation**, **materiality** judged by the same primary users (information is material if omitting, misstating or obscuring it could influence their decisions), the **reporting entity** aligned with the financial statements' — and publication **at the same time as** the financial statements, as part of general purpose financial reporting. Where no ISSB standard covers a topic, S1 has its own IAS-8-style ladder: other standard-setters' materials (the **SASB standards** named first) as guidance sources.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The four-pillar core content (TCFD's architecture, made mandatory)",
            data: {
              items: [
                { title: "Governance", sub: "Who oversees and manages sustainability risks — bodies, skills, incentives" },
                { title: "Strategy", sub: "The risks and opportunities, their effects on business model, strategy and finances — now and anticipated" },
                { title: "Risk management", sub: "How risks are identified, assessed, prioritised and monitored — and integrated with overall risk management" },
                { title: "Metrics and targets", sub: "How performance is measured — required metrics, entity's own, and progress against targets" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The design intent matters for evaluation: **financial materiality, for investors** — not impact reporting for all society (the ESRS contrast below); **connectivity** with the financial statements required explicitly (data, assumptions and the entity boundary must cohere — SBR-34's test, here as a rule); and **enterprise value thinking** across time horizons, which is what separates 'sustainability information' in this regime from corporate social responsibility narrative. Judgements, uncertainties and errors carry IAS-8-family machinery: significant judgements disclosed, measurement uncertainty explained with its sources, and material prior-period errors **restated** in the comparatives unless impracticable — greenwash by quiet re-baselining is specifically what the error discipline exists to stop.",
        },
      ],
      check: {
        q: "A sustainability team proposes reporting the entity's full societal and environmental impact — water use, community effects, biodiversity — 'because IFRS S1 now requires sustainability reporting'. What does S1 actually require?",
        options: [
          "Full impact reporting across all environmental and social topics",
          "Disclosure of the sustainability-related risks and opportunities that could reasonably affect the entity's own prospects — cash flows, financing access, cost of capital — for investors: impacts appear only insofar as they loop back to enterprise value; whole-society impact reporting is the ESRS's double-materiality territory, not S1's",
          "Climate disclosures only",
          "Whatever the entity judges appropriate",
        ],
        correct: 1,
        explain:
          "S1's materiality lens is the financial statements' own: the primary users, their decisions, the entity's prospects. Water scarcity enters when it threatens the entity's licence, costs or assets — not as an impact inventory. Knowing which lens a regime grinds is the foundation of the ESRS comparison the syllabus names explicitly.",
      },
    },
    {
      id: "s2-climate",
      heading: "IFRS S2 — climate, in the same frame",
      blocks: [
        {
          kind: "text",
          md: "**IFRS S2** applies the four pillars to climate specifically, splitting the risk universe: **physical risks** (acute events and chronic shifts damaging assets, supply chains and markets) and **transition risks** (policy, legal, technology, market and reputation shifts as economies decarbonise) — plus opportunities. Its distinctive requirements: **climate resilience** assessed using **scenario analysis** appropriate to the entity's circumstances; the anticipated financial effects of the risks on the reporting entity; disclosure of any **transition plan** and the basis of its targets; **industry-based metrics** (drawing on SASB material); and **greenhouse gas emissions across Scopes 1, 2 and 3** — the entity's own combustion, its purchased energy, and its value chain — measured per the GHG Protocol, with Scope 3 including financed emissions for financial-sector entities.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Where the S2 judgement concentrates — and the analyst's tests",
          items: [
            "**Scope 3** is the honesty frontier: usually the vast majority of emissions, estimated from value-chain data the entity does not control — boundary choices, estimation methods and exclusions all disclose, and all deserve the MPM-style drift test",
            "**Scenario choice**: resilience against a gentle scenario is resilience against nothing — which scenarios, whose, and how severe are disclosed and assessable",
            "**Targets**: base years, offsets' role, interim milestones and re-baselining rules decide whether a 'net-zero 2050' commitment constrains anything before 2045",
            "**Anticipated financial effects**: the requirement that converts narrative into numbers — and the disclosure most likely to be qualitative, delayed by reliefs, or hedged",
            "**Connectivity**: the transition plan's dates against the statements' lives, impairments and provisions — SBR-36's cross-check, run as a compliance matter",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Assessing usefulness — the balanced verdict the syllabus asks for",
          md: "**For investors, genuinely useful**: standardised, comparable climate risk information in the investor's own materiality language; scenario resilience and Scope 3 pull forward risks that price capital today; connectivity discipline forces the two stories into one. **Genuinely limited**: estimation uncertainty in Scope 3 can exceed the measurement; scenario analysis is assumption-laden and gameable; assurance is maturing but thinner than audit; reliefs and phase-ins stagger comparability; and disclosure sophistication can correlate with reporting budgets rather than decarbonisation. The assessment marks want both columns, then a conclusion — usually: decision-useful direction, treat the numbers with MPM-grade scepticism, watch the connectivity seams.",
        },
      ],
      check: {
        q: "A bank discloses Scope 1 and 2 emissions in detail but omits Scope 3, noting 'value-chain data is not sufficiently reliable'. Why does the omission gut the disclosure?",
        options: [
          "It does not — Scopes 1 and 2 are the entity's own emissions and the reliable core",
          "A bank's climate exposure IS its financed emissions — Scope 3 category 15: the lending and investment book carries the transition risk investors need priced, and Scopes 1 and 2 (offices and electricity) are a rounding error beside it. S2 requires Scope 3 with estimation uncertainty disclosed, not waived — 'unreliable' is the reason for disciplined estimation, not omission",
          "Scope 3 is voluntary for financial institutions",
          "The omission matters only for manufacturers",
        ],
        correct: 1,
        explain:
          "Materiality does the work: the risk investors are pricing lives in the loan book, so a disclosure covering everything except the loan book is compliant-looking and empty. The uncertainty argument inverts the standard's design — like ECLs (SBR-16), the regime demands estimation under uncertainty with the method and its limits disclosed, precisely because waiting for perfect data means never reporting the risk that matters.",
      },
    },
    {
      id: "esrs-comparison",
      heading: "ISSB and ESRS — the two regimes, honestly compared",
      blocks: [
        {
          kind: "text",
          md: "The **European Sustainability Reporting Standards** serve the EU's CSRD and differ by design, and the syllabus names the comparison as examinable. The load-bearing difference is **materiality**: the ISSB standards use **financial materiality** — what affects the entity's prospects, for investors; the ESRS use **double materiality** — financial materiality *plus* **impact materiality**: the entity's material effects on people and environment must be reported even where they never loop back to enterprise value. Everything else follows from that fork: **audience** (investors versus all stakeholders), **scope of topics** (S1/S2's risk-and-opportunity lens versus the ESRS's full topical suite — environment beyond climate, own workforce and value-chain workers, affected communities, consumers, business conduct), and **volume and granularity** (the ESRS's detailed datapoint requirements against the ISSB's principles-and-pillars).",
        },
        {
          kind: "table",
          caption: "The comparison, structured",
          head: ["Dimension", "ISSB (IFRS S1/S2)", "ESRS"],
          rows: [
            ["Materiality", "Financial: effects on the entity's prospects", "Double: financial AND the entity's impacts on people and environment"],
            ["Primary audience", "Investors, lenders, creditors", "All stakeholders, investors included"],
            ["Mandate", "Adopted jurisdiction by jurisdiction", "EU law via the CSRD, in-scope entities compelled"],
            ["Topic coverage", "General requirements + climate; more topics to come", "Full topical suite from day one, cross-cutting plus topical standards"],
            ["Style", "Principles, four pillars, industry guidance", "Prescribed disclosure requirements and datapoints"],
            ["Interoperability", "Climate content substantially aligned by joint work — financial-materiality disclosures largely reusable both ways", "ESRS-compliant climate reporting broadly covers S2, with mapping; the impact layer has no ISSB counterpart"],
          ],
        },
        {
          kind: "text",
          md: "**Interoperability in practice**: for a multinational in both regimes, the aligned climate core means one data architecture can feed both — but the ESRS impact-materiality layer requires disclosures the ISSB regime never asks for, and subtle definitional differences (materiality processes, value-chain boundaries, phase-in reliefs) mean 'aligned' is not 'identical'. The exam-grade evaluation: dual reporting burdens are real and falling as alignment work proceeds; the deeper question is whether investors are better served by the focused financial-materiality lens (decision-relevant, comparable, bounded) or the double lens (fuller picture, at the cost of volume in which the financially material can drown — SBR-05's obscuring, at regime scale). A committed, argued position either way scores; fence-sitting does not.",
        },
      ],
      check: {
        q: "An entity's operations pollute a river. Remediation is not legally required, no fines apply, customers are indifferent, and no plausible mechanism connects the pollution to the entity's cash flows or cost of capital. Under which regime(s) is disclosure required?",
        options: [
          "Both — pollution is always material",
          "ESRS only: the impact on the environment is material under impact materiality regardless of any route back to enterprise value; under IFRS S1/S2 the financial-materiality lens finds nothing to require — which is precisely the double-materiality fork the comparison turns on",
          "IFRS S1 only",
          "Neither, since no law compels remediation",
        ],
        correct: 1,
        explain:
          "The hypothetical is built to isolate the fork: zero enterprise-value linkage extinguishes the ISSB requirement and leaves the ESRS impact limb standing alone. In reality the premise is fragile — reputational, regulatory and litigation channels usually create the financial loop eventually, and a good answer notes that the two lenses converge more often than the clean cases suggest. But the conceptual difference is exactly this, and the syllabus asks for it by name.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Describing S1/S2 as impact or CSR reporting.",
      fix: "The lens is financial materiality for investors — the entity's prospects, not its footprint; impact is the ESRS's second limb.",
    },
    {
      trap: "Reciting the four pillars without the climate-specific machinery.",
      fix: "S2's teeth are scenario resilience, transition plans, anticipated financial effects and the three emission scopes — Scope 3 included.",
    },
    {
      trap: "Accepting data-reliability arguments for omitting Scope 3.",
      fix: "The regime requires disciplined estimation with disclosed uncertainty — the ECL logic, not an escape clause.",
    },
    {
      trap: "Comparing the regimes as a list of trivia.",
      fix: "Lead with the materiality fork; derive audience, scope and style from it; end with a committed view on which serves investors better.",
    },
  ],
  keyTerms: [
    { term: "Financial materiality (ISSB)", def: "The S1 lens: information is material if omitting, misstating or obscuring it could influence primary users' decisions about the entity — judged by effects on its prospects." },
    { term: "Double materiality (ESRS)", def: "The European lens: financial materiality plus impact materiality — the entity's material effects on people and environment report regardless of enterprise-value linkage." },
    { term: "Scope 1, 2 and 3 emissions", def: "Direct emissions from owned or controlled sources; indirect from purchased energy; and all other value-chain emissions — including financed emissions for financial institutions." },
    { term: "Scenario analysis (S2)", def: "The required method for assessing climate resilience — testing strategy and business model against plausible climate futures appropriate to the entity's circumstances." },
    { term: "Transition plan", def: "An entity's targets, actions and resources for moving toward a lower-carbon economy — disclosed under S2 and testable against the financial statements' assumptions." },
    { term: "Interoperability", def: "The alignment between ISSB and ESRS climate disclosure achieved by joint work — one data architecture serving both, with the ESRS impact layer remaining Europe-specific." },
  ],
  summary: [
    "S1 is general purpose financial reporting: prospects-focused, investor-lensed, four-pillared, published with the statements it must cohere with.",
    "S2 adds climate's machinery — scenario resilience, transition plans, anticipated effects, and emissions across all three scopes.",
    "Judgements, uncertainty and errors carry IAS-8-family discipline: re-baselining greenwash is what the restatement rule targets.",
    "Usefulness is real and bounded: comparable risk information, MPM-grade scepticism on the estimates, connectivity as the seam to watch.",
    "The ESRS fork is materiality: double versus financial — audience, scope and volume all follow, and the exam wants the fork argued, not listed.",
  ],
  knowledgeDiagnostic: [
    { q: "State S1's objective in one sentence.", a: "To require disclosure of sustainability-related risks and opportunities that could reasonably be expected to affect the entity's cash flows, access to finance or cost of capital over the short, medium and long term — for the primary users of general purpose financial reports." },
    { q: "Name the four pillars and S2's additions to them.", a: "Governance, strategy, risk management, metrics and targets; S2 adds physical-and-transition risk analysis, scenario-based resilience assessment, transition plan disclosure, anticipated financial effects, industry-based metrics and Scope 1–3 GHG emissions." },
    { q: "Why is Scope 3 both the most important and least reliable disclosure?", a: "It typically dominates the footprint — and for banks IS the climate exposure via financed emissions — but is estimated from value-chain data outside the entity's control, so the regime pairs the requirement with disclosed methods, boundaries and uncertainty rather than waiving it." },
    { q: "Derive three ESRS/ISSB differences from the materiality fork.", a: "Audience: all stakeholders versus investors. Topic scope: full topical suite including impacts with no financial loop, versus risk-and-opportunity coverage of the entity's prospects. Volume and style: prescribed datapoints serving accountability breadth, versus principles serving decision-usefulness." },
  ],
  furtherStudy: [
    "SBR-34 assesses these disclosures from the analyst's chair — quality tests and connectivity",
    "SBR-36 carries the financial-statement half: climate through the existing standards",
    "SBR-01's ethics extend to sustainability reporting explicitly — bias in green is still bias",
    "SBR-35's adoption anatomy applies as jurisdictions phase these standards in",
  ],
}

export const SBR_TREE_AREA_F: StudyChapter[] = [SBR_TREE_35, SBR_TREE_36, SBR_TREE_37]
