import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area C, part 3 — Tax through other reporting issues.
 *
 *   SBR-19  Income taxes                                   (C6a, C6b)
 *   SBR-20  Provisions, contingencies and events after     (C7a, C7b)
 *   SBR-21  Share-based payment                            (C8a)
 *   SBR-22  Fair value measurement                         (C9a, C9b, C9c)
 *   SBR-23  Presentation and disclosure                    (C10a-f)
 *   SBR-24  Other reporting issues                         (C11a-e)
 *
 * Completes the sixteen-chapter Area C tree. Written against the official
 * ACCA SBR-INT syllabus and study guide for September 2026 to June 2027; not
 * derived from any approved-provider text. C10 is written to IFRS 18 —
 * including management-defined performance measures, which the s26-j27
 * syllabus names explicitly.
 */

const SBR_TREE_19: StudyChapter = {
  paper: "SBR",
  id: "SBR-19",
  number: 19,
  area: "C",
  syllabusRefs: ["C6(a)", "C6(b)"],
  title: "Income taxes",
  minutes: 16,
  intro:
    "Deferred tax is the accrual principle applied to the tax bill: if a carrying amount will produce taxable or deductible amounts when recovered, the statements say so now. The mechanics are temporary differences; the judgement is recognising the assets — and the exam knows it.",
  outcomes: [
    "Explain the balance-sheet logic: carrying amount versus tax base, and the future tax each gap implies",
    "Recognise deferred tax liabilities on taxable temporary differences, and the exceptions that block them",
    "Apply the probable-future-profits test to deferred tax assets, especially for losses",
    "Measure at enacted or substantively enacted rates reflecting expected recovery, undiscounted, with backing-tax consequences",
    "Handle the exam's recurring sites: revaluations, business combinations, and unremitted subsidiary profits",
    "Challenge a scenario's deferred tax asset the way question two expects",
  ],
  sections: [
    {
      id: "the-logic",
      heading: "Carrying amount, tax base, and the difference that matters",
      blocks: [
        {
          kind: "text",
          md: "Current tax is the amount payable on the period's taxable profit — the easy half. **Deferred tax** deals with the future: for every asset and liability, compare the **carrying amount** with the **tax base** (the amount the tax authority will allow against it). A **taxable temporary difference** — carrying amount above tax base for an asset — means recovering the book value will generate taxable amounts: recognise a **deferred tax liability**. A **deductible temporary difference** — the reverse — promises future deductions: a **deferred tax asset**, if the recognition test passes.",
        },
        {
          kind: "illustration",
          title: "Why the liability is real",
          md: "Plant cost $10m; accounting depreciation has taken it to $8m while accelerated tax allowances have taken the tax base to $5m. The entity has already enjoyed $3m more deduction than expense. Recovering the $8m carrying amount through use will generate $8m of income against which only $5m of allowances remain — $3m will be taxed, at 25% a $750k future bill that exists *because of transactions already completed*. Deferred tax simply stops the earlier tax holiday being reported as a permanently lower tax rate.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The recognition exceptions worth knowing",
          items: [
            "**Initial recognition of goodwill** — no deferred tax liability, ever: recognising one would just inflate goodwill in a circle",
            "**Initial recognition of an asset or liability** outside a business combination affecting neither accounting nor taxable profit — no deferred tax at inception",
            "**Investments in subsidiaries, branches, associates and joint arrangements** — no liability on unremitted profits where the parent controls the timing of reversal and reversal is not probable in the foreseeable future; declared dividend intentions puncture the shelter",
          ],
        },
        {
          kind: "text",
          md: "**Measurement** follows three disciplines: rates **enacted or substantively enacted** by the reporting date (announced budgets do not count until they cross that line); rates reflecting the **manner of expected recovery** — use versus sale can carry different rates, and an investment property at fair value carries a rebuttable presumption of recovery through sale; and **no discounting**, a pragmatic concession the examiner may invite you to criticise, since an undiscounted liability decades from reversal plainly overstates its present burden.",
        },
      ],
      check: {
        q: "A government announces in November a corporate rate cut from 25% to 20% effective next April; the legislation passes in February, after the December year end. At what rate does December's deferred tax measure?",
        options: [
          "20% — the cut was announced before the year end",
          "25% — only rates enacted or substantively enacted by the reporting date apply, and an announcement is neither; the change is disclosed as a non-adjusting event with its estimated effect",
          "22.5%, time-apportioned",
          "20% for assets and 25% for liabilities, for prudence",
        ],
        correct: 1,
        explain:
          "The enactment test is a bright line precisely because announcements change — measuring on political intentions would let entities pick the rate that suits. The information is still material to users, so it discloses as an event after the reporting period. Option 3 invents an asymmetry the standard does not contain; measurement is neutral, not prudent by direction.",
      },
    },
    {
      id: "the-asset-test",
      heading: "Deferred tax assets — the judgement the exam lives in",
      blocks: [
        {
          kind: "text",
          md: "A deferred tax asset — from deductible differences, unused losses or credits — recognises only to the extent it is **probable that future taxable profit** will be available to absorb it. For loss-carrying entities the evidence bar rises with the irony the exam loves: the entity most eager to recognise the asset (a loss-maker, whose 'asset' converts past failure into balance-sheet value) is the one whose history argues hardest against it. A record of recent losses is itself evidence *against*, rebuttable only by **convincing other evidence**: contracted new revenue, a completed restructuring with visible effects, the loss's identifiable non-recurring cause.",
        },
        {
          kind: "list",
          style: "number",
          title: "Auditing a loss-based deferred tax asset",
          items: [
            "**Source the profits** — whose forecasts, over what horizon, approved by whom? The same numbers should be driving the going-concern and impairment judgements",
            "**Check consistency** — profits 'probable' for tax while the goodwill note shows nil headroom on the same forecasts is an internal contradiction to name",
            "**Test the expiry mechanics** — losses with time limits or same-trade restrictions need profits of the right kind, in the right entity, in time",
            "**Watch the scheduling** — reversing taxable differences can absorb deductible ones, but only where periods and jurisdictions align",
            "**Apply the direction test** — an asset recognised in the year a covenant tightened, on hockey-stick forecasts, is SBR-01 material",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The asset that flatters twice",
          md: "Recognising a deferred tax asset on losses books a **credit to profit** in the loss year — softening the very loss that created it — and gross assets rise. Derecognition later (when forecasts fail) charges profit at the worst time. This double-edged timing is why the standard demands review at each reporting date, both directions, and why a scenario's tax note deserves reading against its impairment note.",
        },
      ],
      check: {
        q: "An entity with three consecutive loss years recognises a $40m deferred tax asset on its carried losses, citing board-approved forecasts of strong profits. The same forecasts show goodwill headroom of nil, and the going-concern note describes material uncertainty. What is the strongest challenge?",
        options: [
          "Loss-makers can never recognise deferred tax assets",
          "A history of losses requires convincing evidence of future profits; forecasts that simultaneously produce nil impairment headroom and a going-concern uncertainty are not convincing evidence of profits that are probable — the asset fails recognition wholly or largely",
          "The asset should be discounted for the delay",
          "The asset is acceptable if disclosed as an estimate",
        ],
        correct: 1,
        explain:
          "The three notes must tell one story: 'probable profits' for tax, zero headroom for impairment and doubt for going concern are three different companies. IAS 12's own evidence rule makes recent losses count against, and the internal inconsistency is the examinable finding. Option 0 overstates (convincing evidence can carry it); discounting (option 2) is prohibited either way.",
      },
    },
    {
      id: "exam-sites",
      heading: "Where deferred tax meets the rest of the syllabus",
      blocks: [
        {
          kind: "text",
          md: "Deferred tax's **backing rule**: the tax follows its item. Differences arising in **profit or loss** tax through profit or loss; those arising in **OCI** (revaluations, FVOCI movements, pension remeasurements) tax through OCI; those arising **directly in equity** or in a **business combination** follow suit. A revaluation of PPE creates a taxable difference (carrying amount rises, tax base does not) whose deferred tax charges OCI against the surplus — a revalued balance sheet quietly carries its future tax inside it.",
        },
        {
          kind: "text",
          md: "**Business combinations** are a deferred tax factory: acquired assets remeasure to fair value while their tax bases stay historic, generating differences recognised as identifiable liabilities (or assets) at acquisition — which move goodwill, not profit. Post-acquisition recognition of the *acquirer's own* previously unrecognised losses (made probable by the combination's profits) is the acquirer's gain through profit; recognition of the **acquiree's** pre-acquisition assets within the measurement period adjusts goodwill first. And the **unremitted profits** shelter for subsidiaries fails exactly when scenarios make it fail: a stated intention to repatriate, a planned disposal, or an associate — where the investor does *not* control the dividend decision, so the exception needs probable non-reversal instead, which the investor cannot simply assert.",
        },
        {
          kind: "examQuestion",
          title: "Advise on the deferred tax consequences of a scenario's transactions",
          format: "written",
          marks: 8,
          requirement: "Discuss the deferred tax consequences of the revaluation, the acquisition and the recognised losses, and comment on the directors' treatment.",
          plan: [
            { step: "Anchor each item: carrying amount versus tax base", detail: "One sentence per item establishing the difference and its direction — taxable or deductible." },
            { step: "Route the recognition", detail: "Revaluation → OCI; combination differences → goodwill; loss assets → profit, with the evidence test." },
            { step: "Measure with the three disciplines", detail: "Substantively enacted rates, manner of recovery, no discounting — flag any breach in the directors' numbers." },
            { step: "Test the asset hardest", detail: "Convincing evidence against the loss history, cross-checked to impairment and going-concern notes." },
            { step: "Conclude on the pattern", detail: "If every judgement leans the same way, say so and say which metric benefits." },
          ],
          answer:
            "The revaluation raises the properties' carrying amounts $60m above their unchanged tax bases — a taxable temporary difference of $60m whose deferred tax liability of $15m recognises through other comprehensive income against the revaluation surplus. The directors' objection that 'no sale is planned' misunderstands the model: recovery through use generates taxable income just as surely, and the liability reflects completed events, not intentions.\n\nOn the acquisition, the fair-value uplifts to the brand and customer relationships carry no additional tax deductions, so deferred tax liabilities recognise on the differences as part of the identifiable net assets — increasing goodwill rather than touching profit. Omitting them, as the draft does, understates goodwill and overstates post-acquisition earnings as the intangibles amortise without their tax shadow.\n\nThe $25m deferred tax asset on the subsidiary's losses is the weakest judgement. The subsidiary has lost money for two years; the group's forecasts assume a turnaround that the impairment review of the same unit — showing headroom of nil — does not support. Recent losses require convincing evidence of probable future taxable profits in the same entity and jurisdiction; internally inconsistent forecasts are not that evidence, and the asset should be recognised only to the extent supported, if at all.\n\nTaken together, the draft omits a liability that would sit in OCI, omits liabilities that would sit in goodwill, and recognises an asset that credits profit — three technical positions with one direction. The pattern, alongside the earnings-linked consideration for the vendors, should itself be reported to the audit committee.",
          earns: [
            "Each item anchored in carrying amount versus tax base",
            "Backing rule applied — OCI, goodwill, profit respectively",
            "The asset tested against evidence and cross-checked to other notes",
            "The one-direction pattern named with its beneficiary",
          ],
          loses: [
            "Discussing tax cash flows instead of temporary differences",
            "Routing revaluation tax through profit",
            "Accepting forecasts as evidence without the cross-check",
            "Three correct rulings with no synthesis",
          ],
        },
      ],
      check: {
        q: "At acquisition, a subsidiary's brand is recognised at a fair value of $30m with a nil tax base (no deduction available). Tax rate 20%. What is recognised, and where does the effect go?",
        options: [
          "Nothing — brands do not attract deferred tax",
          "A $6m deferred tax liability among the identifiable net assets acquired, increasing goodwill by $6m relative to ignoring it",
          "A $6m deferred tax liability charged to profit in the acquisition year",
          "A $6m deferred tax asset, as amortisation will be deductible",
        ],
        correct: 1,
        explain:
          "The uplift creates a taxable difference the group inherits — recovering the $30m brand generates taxable income with no matching deduction. In a combination the liability enters the acquisition balance sheet, so net identifiable assets fall and goodwill rises; profit is untouched at acquisition. Option 3 inverts the facts: no deduction is exactly why the difference is taxable.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Reasoning about deferred tax from timing of payments instead of balance-sheet differences.",
      fix: "Compare carrying amount with tax base item by item; the future tax consequence follows the gap's direction.",
    },
    {
      trap: "Measuring at announced but unenacted rates — or discounting.",
      fix: "Enacted or substantively enacted only, at the rate matching expected recovery, undiscounted.",
    },
    {
      trap: "Recognising loss assets on the strength of management optimism.",
      fix: "Recent losses are evidence against; demand convincing, internally consistent evidence and recognise only to the extent supported.",
    },
    {
      trap: "Routing every deferred tax movement through profit.",
      fix: "The tax follows its item — OCI items tax in OCI, combination differences move goodwill, equity items tax in equity.",
    },
  ],
  keyTerms: [
    { term: "Tax base", def: "The amount attributed to an asset or liability for tax purposes — what the authority will allow against it in the future." },
    { term: "Taxable temporary difference", def: "A difference producing taxable amounts when the carrying amount is recovered or settled — the source of deferred tax liabilities." },
    { term: "Deductible temporary difference", def: "A difference producing deductible amounts in future — a deferred tax asset, subject to the probable-profits test." },
    { term: "Substantively enacted", def: "The measurement gate for tax rates: legislation effectively certain, not merely announced or proposed." },
    { term: "Backing (of tax effects)", def: "The rule that deferred tax is recognised where its underlying item was — profit or loss, OCI, equity, or goodwill in a combination." },
  ],
  summary: [
    "Deferred tax reads the balance sheet: carrying amount versus tax base, liability for taxable gaps, asset for deductible ones.",
    "The exceptions — goodwill at initial recognition, certain initial recognitions, controlled unremitted profits — block circular or never-crystallising balances.",
    "Assets need probable profits, with loss histories counting against and convincing evidence cross-checked to impairment and going concern.",
    "Measure at substantively enacted rates by manner of recovery, undiscounted — and criticise the non-discounting when invited.",
    "The tax follows its item: revaluations tax through OCI, combinations through goodwill — and one-directional judgement patterns get named.",
  ],
  knowledgeDiagnostic: [
    { q: "Walk the plant example: cost $10m, book value $8m, tax base $5m, rate 25%.", a: "The $3m taxable temporary difference reflects allowances already taken ahead of depreciation; recovering $8m against $5m of remaining allowances taxes $3m — a $750k deferred tax liability, unwinding as the positions converge." },
    { q: "When does the unremitted-profits exception fail?", a: "When the parent no longer controls the timing of reversal or reversal becomes probable — dividend plans, disposal intentions; and for associates the investor never controlled it, so it must show reversal is not probable." },
    { q: "What counts as convincing evidence for a loss-carried asset?", a: "Contracted or highly visible new income, a completed restructuring with demonstrated effects, or a clearly non-recurring cause of the losses — consistent with the impairment and going-concern assessments built on the same forecasts." },
    { q: "Where do acquisition-date deferred tax balances go?", a: "Into the identifiable assets and liabilities acquired, adjusting goodwill — not profit; measurement-period adjustments to them also move goodwill first." },
  ],
  furtherStudy: [
    "SBR-11 and SBR-22 generate the revaluations and fair values whose tax shadows this chapter recognises",
    "Area D's combination chapters set the acquisition accounting these balances enter",
    "SBR-12's headroom conclusions are the consistency check for every loss-based asset",
    "SBR-24 covers the policy, estimate and error machinery tax adjustments often travel through",
  ],
}

const SBR_TREE_20: StudyChapter = {
  paper: "SBR",
  id: "SBR-20",
  number: 20,
  area: "C",
  syllabusRefs: ["C7(a)", "C7(b)"],
  title: "Provisions, contingencies and events after the reporting period",
  minutes: 16,
  intro:
    "IAS 37 is the anti-smoothing standard: a provision needs a present obligation from a past event, not a plan, a fear or a desire to pad a bad year. The exam runs both frauds at you — provisions that shouldn't exist, and obligations management insists don't.",
  outcomes: [
    "Apply the three-part recognition test, with the obligating-event discipline at its centre",
    "Distinguish legal from constructive obligations, and both from future operating decisions",
    "Measure at best estimate — expected values, discounting, and the symmetry that blocks padding",
    "Apply the special regimes: onerous contracts, restructuring, decommissioning and reimbursements",
    "Report contingent liabilities and assets at the right recognition-disclosure line",
    "Classify events after the reporting period as adjusting or non-adjusting, and handle the going-concern override",
  ],
  sections: [
    {
      id: "recognition",
      heading: "The recognition test, and the obligating event",
      blocks: [
        {
          kind: "text",
          md: "A provision recognises when three limbs all hold: a **present obligation** (legal or constructive) from a **past event**; a **probable** outflow of resources; and a **reliable estimate** — which the standard expects to be possible in all but extremely rare cases, closing the 'too uncertain to measure' escape route from SBR-06. The discipline is the **obligating event**: the past event must leave the entity **no realistic alternative** to settling. Board decisions, budgets and intentions bind nobody; an obligation exists only when the entity is committed *to someone else*.",
        },
        {
          kind: "text",
          md: "A **constructive obligation** arises where past practice, published policies or specific statements have created a **valid expectation** in other parties that the entity will accept a responsibility — the retailer whose advertised no-questions refund policy binds beyond the statutory minimum; the mining company whose published environmental code promises restoration the local law never required. The boundary cases matter: **future operating costs** never provide (repainting your own premises, retraining staff — the entity can always change its plans), and obligations contingent on the entity's **future conduct** are not present obligations — the classic being smoke-filter legislation: no provision for filters not yet fitted (the entity could exit the market), but a provision for the *fines* its continuing non-compliance makes probable.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Both directions, always",
          md: "IAS 37 polices two frauds. **Omission**: 'the case is unquantifiable' from a management facing a probable claim — the reliable-estimate escape is nearly closed, and probability is assessed on evidence, not preference. **Padding**: the big-bath 'provision' for future losses, reorganisations not yet binding, or self-insurance — no obligation, no provision, and expected future operating losses are the textbook non-provision (though they do trigger an impairment test). State which fraud the scenario is running before you write the rules.",
        },
      ],
      check: {
        q: "In December a board minutes a decision to close a division next year, with an outline of redundancy numbers. Nothing has been announced. Management proposes a $30m closure provision, noting the decision is 'irrevocable'. Is the provision recognisable at the year end?",
        options: [
          "Yes — a formal board decision creates the obligation",
          "No — a board decision alone creates no obligation to anyone outside the board: until a detailed formal plan exists and the entity has raised a valid expectation in those affected — by announcement or by starting implementation — there is no obligating event",
          "Yes, but only for the redundancy element",
          "No — closure costs can never be provided for",
        ],
        correct: 1,
        explain:
          "A decision the entity could quietly reverse binds nobody, however 'irrevocable' the minutes call it — the restructuring rules require the plan communicated to those affected or implementation begun. The December timing is the tell: a provision booked into an already-bad year, reversible if plans change, is the big bath in restructuring clothes.",
      },
    },
    {
      id: "measurement-regimes",
      heading: "Measurement, and the special regimes",
      blocks: [
        {
          kind: "text",
          md: "Measurement is the **best estimate** of the expenditure required to settle the present obligation at the reporting date — the amount the entity would rationally pay to settle or transfer it. **Large populations** measure at expected value (probability-weighting the outcomes: warranty books, refund liabilities); **single obligations** at the most likely outcome, adjusted where other outcomes cluster higher or lower. **Risk** adjusts for genuine uncertainty; **discounting** applies where the time value is material, with the unwinding charged as finance cost; **future events** (technology, law changes) count only with sufficient objective evidence. Gains on expected disposals of related assets stay out — no netting the restructuring provision against the profit on selling the site.",
        },
        {
          kind: "table",
          caption: "The special regimes in one pass",
          head: ["Regime", "The rule", "The trap it blocks"],
          rows: [
            ["Onerous contracts", "Provide the lower of fulfilment cost and exit penalty, using directly related costs; impair dedicated assets first", "Trading on at a loss with no liability shown — or exaggerating 'unavoidable' costs to pad"],
            ["Restructuring", "Detailed formal plan + valid expectation in those affected; direct costs only — no retraining, relocation or future losses", "Decision-stage provisions and kitchen-sink 'reorganisation' charges"],
            ["Decommissioning", "Provide in full when the obligation arises, capitalised into the asset's cost, unwound as finance cost; changes adjust asset and liability", "Deferring the obligation until spending starts — SBR-06's long-horizon escape"],
            ["Reimbursements", "Recognise a separate asset only when receipt is virtually certain, capped at the provision; never net on the balance sheet", "Netting doubtful insurance recoveries against certain obligations"],
          ],
        },
        {
          kind: "illustration",
          title: "The onerous contract read honestly",
          md: "An entity leases-out-of-scope services a warehouse it no longer needs at $2m a year for four remaining years; subletting realistically yields $1.2m a year; exiting costs a $2.5m penalty. Fulfilment cost is the unavoidable net $0.8m × 4 discounted (≈$2.9m at any sensible rate); exit costs $2.5m. Provide $2.5m — the lower, because a rational entity exits. Management's $8m 'full rental' provision ignores the mitigation the standard's own definition of unavoidable cost demands; the padding converts to future 'savings' as the sublets it always expected materialise.",
        },
      ],
      check: {
        q: "An entity provides $50m for decommissioning a new facility, capitalising it into the asset. Two years later, revised technology estimates cut the expected cost by $15m. Management credits the $15m to profit. What is correct?",
        options: [
          "The credit to profit stands — estimates changed",
          "The change adjusts the provision and the related asset's carrying amount: the $15m reduces both, flowing to profit only through lower future depreciation — unless the reduction exceeds the asset's carrying amount",
          "The $15m goes to OCI",
          "The original provision was wrong and restates as an error",
        ],
        correct: 1,
        explain:
          "Decommissioning changes rewrite the asset's cost, not the current year's profit — symmetry with the initial capitalisation. Crediting profit immediately would let alternating estimate revisions manufacture earnings from a liability that merely breathes. A genuine error restates; a changed estimate from new information does not, which is the IAS 8 boundary SBR-24 polices.",
      },
    },
    {
      id: "contingencies-and-events",
      heading: "Contingencies, and events after the reporting period",
      blocks: [
        {
          kind: "text",
          md: "**Contingent liabilities** — possible obligations, or present ones failing the probability or (rarely) measurement limbs — **disclose** unless outflow is remote: nature, financial-effect estimate, uncertainties. **Contingent assets** carry the deliberate asymmetry: disclose when inflow is **probable**, recognise only when **virtually certain** — at which point they are not contingent at all. The asymmetry is prudence-as-neutrality from SBR-05: recognising hoped-for wins would let claimant entities book their optimism. In combinations, note, the rules shift — an acquiree's contingent liabilities recognise at fair value even when outflow is not probable, which Area D develops.",
        },
        {
          kind: "text",
          md: "**Events after the reporting period** split on one question: does the event provide **evidence of conditions at the reporting date** (adjusting — settle the numbers) or reflect **conditions arising after** (non-adjusting — disclose if material)? A customer's post-year-end bankruptcy usually evidences year-end insolvency: adjust the receivable. A post-year-end fire, market crash or acquisition is new-world news: disclose nature and estimated effect. A court settlement after year end on a case existing at year end adjusts — it *measures* the year-end obligation. Dividends declared after the year end are non-adjusting (no obligation existed); and the **going-concern override** trumps the split: if post-year-end events show the entity is no longer a going concern, the statements rebuild on a different basis entirely — the one case where after-date news rewrites the accounts wholesale.",
        },
        {
          kind: "examQuestion",
          title: "Discuss provisions and after-date events for question two",
          format: "written",
          marks: 8,
          requirement: "Discuss the reporting of the warranty claims, the announced restructuring and the post-year-end fire, and the ethical implications of the finance director's proposals.",
          plan: [
            { step: "Run the three-limb test per item", detail: "Obligating event first — say what past event binds the entity, or why nothing yet does." },
            { step: "Measure what recognises", detail: "Expected value for the population, best estimate with discounting where material; state what stays out." },
            { step: "Classify the after-date event", detail: "Condition at the date, or new condition? Adjust or disclose accordingly — and check going concern." },
            { step: "Name the direction", detail: "Which proposals inflate, which omit, and which metric each serves." },
            { step: "Close with the ethics anchor", detail: "One paragraph: threats, principle, escalation — question two pays for the pairing." },
          ],
          answer:
            "The warranty obligation arises from sales already made — the obligating event is the sale, not the future claim — so a provision recognises at the expected value across the population: weighting the claim rates observed and adjusting for the newer model's higher failure rate, discounted if settlement extends beyond a year. The director's preference to 'expense claims as they arrive' understates liabilities and defers this year's cost of this year's revenue.\n\nThe restructuring announced to staff and unions in November is recognisable: the announcement created a valid expectation, so the direct costs — redundancies and lease exits — provide. The $12m of retraining, rebranding and 'future efficiency investment' inside the proposed charge does not: those are future operating costs the entity can still avoid, and their inclusion turns a liability into a smoothing reserve that will flatter next year as it releases.\n\nThe January fire destroyed a warehouse that was intact at the reporting date: a non-adjusting event, disclosed with its estimated $20m uninsured effect. Writing the inventory down at the year end, as proposed, would misstate the year being reported — unless the loss threatens the entity's ability to continue, in which case going concern, not measurement, is the question.\n\nThe pattern is one direction disguised as two: omitting the warranty provision helps this year, over-providing the restructuring helps next year at this bad year's expense, and accelerating the fire pads the same bath. The accountant should put the corrected treatments to the director in writing and escalate to the audit committee if overruled, on the SBR-01 route.",
          earns: [
            "Obligating event identified or refuted per item",
            "Population expected-value measurement for warranties",
            "Restructuring split into providable direct costs and excluded operating costs",
            "The adjusting/non-adjusting call with the going-concern caveat",
            "Ethics paired, with the direction pattern named",
          ],
          loses: [
            "Providing for the restructuring from the board-decision date",
            "Including retraining and rebranding in the provision",
            "Adjusting the year-end inventory for the January fire",
            "Treating the three items as unrelated technical rulings",
          ],
        },
      ],
      check: {
        q: "Shortly after the year end, an entity wins a lawsuit it had brought, and will receive $10m; at the year end its lawyers had assessed success as probable. How is the $10m treated in the year-end statements?",
        options: [
          "Recognise the $10m — the win is an adjusting event proving the year-end position",
          "Disclose only: at the year end the inflow was probable but not virtually certain, so the asset was contingent; the later judgment is evidence about the claim, but recognition of contingent assets requires virtual certainty AT the reporting date — the win crystallises it in the new period",
          "Recognise $10m less a prudence discount",
          "Neither recognise nor disclose",
        ],
        correct: 1,
        explain:
          "This is the asymmetry's sharpest test, and reasonable preparers debate it — but the standard's design is that contingent assets recognise when virtual certainty exists, and a judgment delivered after the year end is the event that creates that certainty, not merely evidence of it. Compare the liability mirror-image: a lost case adjusts, because a present obligation existed and the settlement measures it. The asymmetry is deliberate; an answer that names it scores.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Providing on decisions, budgets and intentions.",
      fix: "Find the obligating event: commitment to an outside party, by contract, law, announcement or commenced implementation.",
    },
    {
      trap: "Sweeping future operating costs into a restructuring charge.",
      fix: "Direct costs of the restructuring only — retraining, relocation, marketing and future losses stay in the future.",
    },
    {
      trap: "Netting reimbursements, disposal gains or sublet income out of sight.",
      fix: "Reimbursement assets recognise separately at virtual certainty; unavoidable cost is net of mitigation, but assets never offset the liability line.",
    },
    {
      trap: "Adjusting the year end for the new period's news.",
      fix: "Ask what the event evidences: year-end conditions adjust; new conditions disclose — and only going-concern failure rewrites the basis.",
    },
  ],
  keyTerms: [
    { term: "Obligating event", def: "The past event that leaves the entity no realistic alternative to settling — the recognition test's centre of gravity." },
    { term: "Constructive obligation", def: "An obligation from practice, policy or statements that created a valid expectation in others — binding without a contract." },
    { term: "Onerous contract", def: "A contract whose unavoidable costs of meeting it exceed its expected benefits — provided at the lower of fulfilment cost and exit penalty." },
    { term: "Contingent asset", def: "A possible asset from past events — disclosed when inflow is probable, recognised only at virtual certainty." },
    { term: "Adjusting event", def: "An event after the reporting period providing evidence of conditions existing at the reporting date — reflected in the measurements." },
  ],
  summary: [
    "Three limbs, with the obligating event doing the work: no commitment to an outsider, no provision.",
    "Best estimate means expected values for populations, mitigation netted, discounting where material — and no padding either.",
    "The regimes each block a game: onerous (lower of two exits), restructuring (announcement gate, direct costs), decommissioning (asset-and-liability symmetry).",
    "Contingent liabilities disclose to remote; contingent assets recognise only at virtual certainty — a deliberate asymmetry.",
    "After-date events split on what they evidence; going concern is the override that rebuilds everything.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does the smoke-filter example recognise fines but not filters?", a: "Fitting filters remains avoidable future conduct — the entity could change how it operates — but continuing to run non-compliant makes the fines a present obligation from past operation." },
    { q: "What two conditions gate a restructuring provision?", a: "A detailed formal plan, and a valid expectation raised in those affected — by announcing the main features or starting implementation; board approval alone is neither." },
    { q: "How does a decommissioning estimate change report?", a: "Adjust the provision and the related asset's carrying amount together; profit feels it only through revised future depreciation and the unwinding finance cost." },
    { q: "Give the classic adjusting and non-adjusting examples.", a: "Adjusting: post-date customer bankruptcy evidencing year-end irrecoverability; settlement of a year-end case. Non-adjusting: fires, market falls, acquisitions and dividends declared after the date — disclosed, not booked." },
  ],
  furtherStudy: [
    "SBR-06's existence-versus-measurement discipline underlies every limb of the test",
    "SBR-02 files both provision frauds in the toolkit — the omission and the bath",
    "Area D handles the acquiree contingent liabilities that recognise at fair value despite improbable outflow",
    "SBR-24's going-concern coverage completes the after-date override",
  ],
}

const SBR_TREE_21: StudyChapter = {
  paper: "SBR",
  id: "SBR-21",
  number: 21,
  area: "C",
  syllabusRefs: ["C8(a)"],
  title: "Share-based payment",
  minutes: 15,
  intro:
    "Paying in options once let entities buy labour without reporting a cost. IFRS 2's answer: measure the promise at grant, spread it over the service that earns it, and let the vesting-condition machinery — not later share prices — decide what ultimately charges.",
  outcomes: [
    "Explain why share-based payment is an expense despite costing no cash",
    "Run the equity-settled model: grant-date fair value, vesting spread, and the no-remeasurement rule",
    "Classify vesting and non-vesting conditions, and apply each type's distinct mechanics",
    "Account for cash-settled awards and their remeasurement through profit",
    "Handle modifications, repricings, cancellations and the equity-versus-cash classification stakes",
    "Read option-heavy remuneration the way question two expects — dilution, incentives and the charge's honesty",
  ],
  sections: [
    {
      id: "equity-settled",
      heading: "The equity-settled model",
      blocks: [
        {
          kind: "text",
          md: "An entity that pays employees in options has consumed services and given valuable consideration — the absence of cash changes the financing, not the cost. **Equity-settled** awards measure at the **fair value of the instruments at grant date** (market prices, or option-pricing models for options) and recognise as an expense over the **vesting period**, crediting equity. For employees the instrument's fair value is used directly because the services can't be valued reliably; for **non-employees**, the presumption reverses — measure the goods or services received at their fair value.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Grant-date fixing is the design",
          md: "Equity-settled fair value is **never remeasured** for share-price movements after grant: the deal's value was struck then, and subsequent price changes are the counterparty's gain or loss as a prospective shareholder, not a change in what the entity paid. The consequence scenarios exploit: options deep underwater still charge in full if service conditions are met — and management's proposal to 'stop the expense because the options are worthless' misreads the model. What management does next — repricing — has its own rule below.",
        },
        {
          kind: "text",
          md: "The charge trues up through **quantities, not values**: each period, revise the estimate of awards expected to vest against **service and non-market performance conditions**, so the cumulative expense tracks (number expected to vest) × (grant-date fair value) × (vesting elapsed). Leavers reverse; missed profit targets reverse. The exam's favourite arithmetic: staggered leaver estimates across a three-year vest, where each year's charge is the cumulative entitlement minus what has already been booked.",
        },
      ],
      check: {
        q: "An entity grants 1,000 options each to 500 managers, vesting after 3 years' service, grant-date fair value $6. By the end of year 1, 40 have left and 60 more are expected to leave. What is year 1's expense?",
        options: [
          "$1,000,000 — one third of the full grant",
          "$800,000 — (500 − 100) × 1,000 × $6 × 1/3",
          "$920,000 — only actual leavers adjust",
          "Nil until vesting completes",
        ],
        correct: 1,
        explain:
          "The estimate uses expected vesting: 400 managers × 1,000 options × $6 = $2.4m total, one third earned — $800k. Actual-leavers-only (option 2) ignores the forward-looking estimate the standard requires; waiting until vesting (option 3) would dump three years' remuneration into one period. Next year the estimate revises again, and the cumulative mechanics absorb the change.",
      },
    },
    {
      id: "conditions",
      heading: "The condition taxonomy — where the marks hide",
      blocks: [
        {
          kind: "table",
          caption: "Conditions and their mechanics",
          head: ["Type", "Example", "Mechanics"],
          rows: [
            ["Service", "Stay three years", "Excluded from grant-date fair value; trues up via quantities — leavers reverse the expense"],
            ["Non-market performance", "Cumulative profit target, successful listing", "Same as service: quantity true-up, reversal if missed; can also flex the vesting period estimate"],
            ["Market", "Share price reaching $10, TSR ranking", "Priced INTO grant-date fair value — then ignored: expense stands if service is given, vest or not"],
            ["Non-vesting", "Employee saving contributions, non-compete", "Priced into fair value; failure by the entity or counterparty triggers cancellation accounting"],
          ],
        },
        {
          kind: "text",
          md: "The market/non-market split is the exam's favourite: a **market condition** (price targets, total shareholder return against an index) is *discounted into* the grant-date valuation — the model already pays less for an option that might never clear its hurdle — so charging reversal on failure would double-count the risk. The result candidates resist: an award whose market hurdle fails **still charges in full** provided the service was rendered. Symmetrically, a missed **profit target** (non-market) reverses everything — same economics to the employee, opposite accounting, and stating that asymmetry with its rationale is what full marks look like.",
        },
        {
          kind: "illustration",
          title: "Two awards, one lesson",
          md: "Two entities grant identical option packages: one vests on the share price doubling, the other on profits doubling. Neither hurdle is met; all employees serve. The first entity reports the full grant-date charge (the hurdle was priced in at grant, cheapening the fair value); the second reports nothing cumulative (quantity true-up to zero). A remuneration committee choosing between the structures is also choosing the P&L path of failure — which is why scenario committees with earnings worries suddenly prefer market conditions.",
        },
      ],
      check: {
        q: "Options vest after three years' service provided total shareholder return beats a market index. Employees all serve; TSR misses. Management reverses the cumulative $9m expense. What is correct?",
        options: [
          "The reversal is correct — the condition failed",
          "No reversal: TSR-versus-index is a market condition already reflected in the grant-date fair value, so with service rendered the $9m stands",
          "Half reverses, reflecting partial achievement",
          "The charge converts to a liability",
        ],
        correct: 1,
        explain:
          "The market-condition rule: price the hurdle once, at grant, then never adjust for its outcome — the $9m was already a hurdle-discounted number. Reversing would credit profit for a risk the model charged less for in the first place. The employees earned the (ultimately worthless) awards by serving; worthlessness was a possibility the accounting priced from day one.",
      },
    },
    {
      id: "cash-settled-and-changes",
      heading: "Cash-settled awards, modifications and settlement choices",
      blocks: [
        {
          kind: "text",
          md: "**Cash-settled** awards — share appreciation rights, phantom shares — create a **liability**, remeasured at **fair value every reporting date** (and at settlement) with movements in profit or loss, spread over vesting. The classification stakes are real: equity-settled charges are fixed at grant while cash-settled track the share price, so a rising entity's SARs keep charging while its options would not — and management facing that difference has been known to discover reasons the award was 'always' equity-settled. Where the **counterparty** holds the settlement choice, the entity has issued a compound (liability component measured first); where the **entity** chooses, it is equity-settled unless a present obligation to settle in cash exists in practice or by past pattern.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Changing the deal — the asymmetric rules",
          items: [
            "**Modifications that increase value** (repricing an underwater option): keep charging the original grant-date amount AND spread the incremental fair value (post-modification minus pre-modification value at the modification date) over the remaining vest",
            "**Modifications that reduce value**: ignored — the original charge continues; the standard refuses to reward take-backs",
            "**Cancellation** (by entity, or non-vesting-condition failure): accelerate — the whole remaining unvested charge recognises immediately",
            "**Replacement awards** on cancellation: account as a modification, netting the replacement's incremental value",
            "**Forfeiture** (service condition failure): reverse — the true-up doing its normal job",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The repricing paragraph question two wants",
          md: "A board that reprices underwater executive options in a falling market is transferring value to management at the shareholders' low point — the accounting (original charge plus incremental value) at least makes the transfer visible. The evaluation points: dilution of existing holders, the incentive inversion (management gains from the fall that hurt owners), the governance route (remuneration committee independence, shareholder approval), and disclosure adequacy. Question two pairs these with the technical mechanics.",
        },
      ],
      check: {
        q: "An entity cancels an option scheme in year 2 of a 4-year vest (cumulative charge to date $8m of an expected $16m) and grants no replacement. What does the cancellation trigger?",
        options: [
          "Reverse the $8m — the awards will never vest",
          "Recognise the remaining $8m immediately: cancellation accelerates the unvested charge, treating the vesting as if it had occurred",
          "Continue charging $4m a year as planned",
          "Freeze at $8m with no further entries",
        ],
        correct: 1,
        explain:
          "Acceleration is the anti-avoidance rule: if cancellation reversed or froze the charge, an entity could grant options, take the services, and cancel before vest to erase the cost. The full grant-date value charges — now. A replacement award would soften this only through modification accounting, spreading its incremental value; forfeiture by leavers, by contrast, genuinely reverses because the service was never rendered.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Stopping or reversing charges because options went underwater.",
      fix: "Equity-settled awards never remeasure for price; with service rendered, the grant-date charge stands.",
    },
    {
      trap: "Reversing failed market conditions like failed profit targets.",
      fix: "Market hurdles priced into grant-date fair value are ignored thereafter; only service and non-market conditions true up quantities.",
    },
    {
      trap: "Leaving SAR liabilities at grant-date value.",
      fix: "Cash-settled awards remeasure at fair value every period through profit, to settlement.",
    },
    {
      trap: "Treating cancellation as a reversal.",
      fix: "Cancellation accelerates the remaining charge immediately; only genuine forfeiture under service conditions reverses.",
    },
  ],
  keyTerms: [
    { term: "Grant date", def: "The date entity and counterparty agree the arrangement — fixing the fair value equity-settled accounting uses forever." },
    { term: "Vesting period", def: "The period over which the specified vesting conditions are satisfied — and over which the expense spreads." },
    { term: "Market condition", def: "A vesting hurdle tied to share price or relative return — reflected in grant-date fair value and ignored thereafter." },
    { term: "Share appreciation right", def: "A cash-settled award paying the share price growth in cash — a liability remeasured through profit each period." },
    { term: "Incremental fair value", def: "On modification, the excess of the modified award's fair value over the original's at that date — spread over the remaining vesting period on top of the original charge." },
  ],
  summary: [
    "No cash does not mean no cost: grant-date fair value spreads over vesting against equity.",
    "Quantities true up (service, non-market targets); values never do — and market hurdles, once priced, are ignored.",
    "Cash-settled awards are living liabilities, remeasured through profit to settlement; classification is therefore worth fighting over — so police it.",
    "Repricing adds incremental value to an undiminished original charge; cancellation accelerates; only forfeiture reverses.",
    "The evaluation layer — dilution, incentive inversion, governance of repricing — is where question two's marks sit.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is the expense not remeasured when the share price falls?", a: "The entity's cost was fixed when it struck the deal at grant; later movements change the holder's prospective wealth as a shareholder, not the consideration the entity gave for the services." },
    { q: "Contrast the accounting for a missed share-price hurdle and a missed profit hurdle.", a: "Share-price (market): charge stands — the risk was discounted into grant-date fair value. Profit (non-market): quantities true up to zero and the cumulative charge reverses." },
    { q: "How does a repricing account?", a: "Original grant-date charge continues unchanged; the incremental fair value at modification date spreads over the remaining vesting period. Value-reducing modifications are ignored." },
    { q: "What distinguishes cancellation from forfeiture?", a: "Forfeiture is failure of a service/non-market condition — the true-up reverses the charge. Cancellation is the entity (or a non-vesting-condition failure) ending the award — the unvested remainder charges immediately." },
  ],
  furtherStudy: [
    "SBR-22 supplies the measurement concepts option-pricing models implement",
    "SBR-14's liability-versus-equity logic drives the settlement-choice classifications",
    "Area E's stakeholder analysis picks up dilution and the quality of remuneration disclosure",
    "SBR-02's incentive lens explains why condition design and classification get gamed",
  ],
}

const SBR_TREE_22: StudyChapter = {
  paper: "SBR",
  id: "SBR-22",
  number: 22,
  area: "C",
  syllabusRefs: ["C9(a)", "C9(b)", "C9(c)"],
  title: "Fair value measurement",
  minutes: 15,
  intro:
    "IFRS 13 does not decide what is measured at fair value — other standards do. It decides what fair value means: an exit price, from market participants' perspective, in the principal market, at highest and best use. Every phrase strips out a management preference.",
  outcomes: [
    "Define fair value as an exit price and explain what each element of the definition excludes",
    "Identify the principal or most advantageous market, and price in it without transaction-cost adjustment",
    "Apply highest and best use to non-financial assets, including uses the entity does not intend",
    "Deploy the three valuation approaches and maximise observable inputs",
    "Classify measurements in the fair value hierarchy and explain what Level 3 disclosure must reveal",
    "Challenge a scenario's fair value the way the examiner intends — inputs, market, and incentive",
  ],
  sections: [
    {
      id: "the-definition",
      heading: "An exit price, from the market's point of view",
      blocks: [
        {
          kind: "text",
          md: "Fair value is **the price that would be received to sell an asset, or paid to transfer a liability, in an orderly transaction between market participants at the measurement date**. Every element earns its keep. **Exit** price — not the entry price paid, not replacement cost. **Orderly** — not a fire sale, not a distressed unwind; but equally not a hoped-for future market. **Market participants** — independent, knowledgeable, willing — which strips out **entity-specific** factors: synergies only this buyer enjoys, management's superior opinion of the asset, intentions to hold through the downturn. The measurement answers what *the market* would pay, whether or not the entity likes the answer.",
        },
        {
          kind: "text",
          md: "The transaction happens in the **principal market** — the one with the greatest volume and activity for the asset, to which the entity has access — or failing one, the **most advantageous**. Price is **not adjusted for transaction costs** (they are a feature of the deal, not the asset), though **transport costs** to the market do adjust where location is an attribute, as for commodities. The distinction bites: an entity selling produce that must be shipped to the exchange measures at exchange price minus freight — but never minus broker fees.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Highest and best use — even if unused",
          md: "Non-financial assets measure at their **highest and best use**: the use, physically possible, legally permissible and financially feasible, that maximises value to market participants — **regardless of the entity's own intentions**. The factory operating profitably on land zoned for residential towers measures as development land (less demolition), because that is what participants would pay for. Management protesting 'but we intend to keep operating' has identified an intention, not a value. The current use is presumed highest and best only until evidence — like that zoning — says otherwise.",
        },
      ],
      check: {
        q: "An entity holds shares tradeable on two exchanges: Exchange A (its main market, 80% of volume) at $50, Exchange B at $52. Selling costs are $1 on A, $4 on B. What is fair value?",
        options: [
          "$52 — the highest price",
          "$50 — the principal market's price, unadjusted for transaction costs",
          "$49 — principal market net of costs",
          "$48 — most advantageous market net of costs",
        ],
        correct: 1,
        explain:
          "With a principal market identified, its price governs — full stop; the most-advantageous test (where net proceeds would favour B at $48 vs $49) only operates when no principal market exists. And transaction costs never adjust the measurement either way, though note the most-advantageous *identification* uses net amounts while the resulting fair value still quotes gross. Layered rules, one purpose: an observable, manipulation-resistant answer.",
      },
    },
    {
      id: "techniques-and-hierarchy",
      heading: "Techniques, inputs and the three-level hierarchy",
      blocks: [
        {
          kind: "text",
          md: "Three **valuation approaches** implement the definition: **market** (prices for identical or comparable assets — the default when available), **income** (discounting future cash flows or using option models), and **cost** (current replacement cost, mainly for tangibles without markets). The technique matters less than the **inputs discipline**: maximise observable inputs, minimise unobservable ones, and calibrate models to any actual transaction price at initial recognition. A discounted cash flow built on management's own growth rates is not wrong — it is Level 3, and must say so.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The fair value hierarchy",
            data: {
              levels: [
                { label: "Level 1", sub: "Quoted prices, active markets, identical items — unadjusted" },
                { label: "Level 2", sub: "Observable inputs: similar assets, quoted rates, corroborated data" },
                { label: "Level 3", sub: "Unobservable inputs — management's assumptions wearing market clothes" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "A measurement classifies at the **lowest level of any significant input** — one significant unobservable assumption makes the whole number Level 3, however observable the rest. The classification is a **reliability signal to users**, which is why its disclosures escalate: Level 3 measurements must reveal the techniques, the significant unobservable inputs and their quantities, reconciliations of movements, and sensitivity to reasonably possible alternative assumptions. A scenario's 'fair value gain' that is 90% Level 3, thinly disclosed, in the year of a fundraising, is three findings in one sentence.",
        },
        {
          kind: "illustration",
          title: "When the market goes quiet",
          md: "In a dislocated market, trades still happen — a competitor dumps identical bonds at 60 in a forced unwind. Is 60 the fair value? The standard's answer is discriminating: a price from a **disorderly** transaction (forced, rushed, one desperate seller) is not determinative, but a quiet market does not license retreating to model values that ignore every trade either. The entity must weigh the evidence: how far the transaction was orderly, what other observable data says, and whether its model's 'orderly price' of 85 is measurement or wish. Writing that weighing — rather than picking a side by assertion — is the SBR skill.",
        },
      ],
      check: {
        q: "An entity values an unquoted equity stake by DCF: risk-free rates and sector betas are market-sourced, but the five-year revenue forecast is management's own and moves the value materially. At what level does the measurement classify, and what follows?",
        options: [
          "Level 2 — most inputs are observable",
          "Level 3 — the significant unobservable forecast drags the whole measurement down, triggering the full disclosure set: technique, input quantities, movement reconciliation and sensitivity to alternatives",
          "Level 1, if the DCF is calibrated to a past funding round",
          "Unclassified — the hierarchy applies only to financial instruments",
        ],
        correct: 1,
        explain:
          "The lowest-significant-input rule exists because one assumption can carry the number: users need to know this 'fair value' rests on management's forecast, and the Level 3 disclosures are what make that checkable. Calibration to a funding round (option 2) is good practice for the model but does not convert forecasts into quoted prices; and the hierarchy covers every fair value measurement, not just instruments.",
      },
    },
    {
      id: "liabilities-and-challenge",
      heading: "Liabilities, own equity, and challenging the number",
      blocks: [
        {
          kind: "text",
          md: "A liability's fair value is a **transfer** price — what a market participant would require to assume the obligation — not a settlement negotiation with the creditor. Where no transfer market exists (usually), value from the perspective of the party holding the corresponding asset, or by present-valuing the outflows a participant would face. Two wrinkles carry marks: the measurement assumes the obligation **continues** (non-performance is not the exit), and it includes **non-performance risk** — the entity's own credit standing — with the uncomfortable consequence SBR-14 handled: deterioration lowers the liability's fair value, and the 'gain' routes to OCI for designated liabilities precisely because reporting it in profit misled.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The fair value challenge routine — run it on any scenario number",
          items: [
            "**Whose market?** Principal market identified honestly, or the venue that gives the best answer?",
            "**Whose use?** Highest and best, or the entity's preferred story — and does zoning, technology or evidence contradict it?",
            "**Whose inputs?** Level and significance stated; observable data ignored in favour of model assumptions is the classic tell",
            "**Calibrated?** A model that day-one profits against its own transaction price needs explaining",
            "**Orderly?** Prices dismissed as 'distressed' — by the party whose position they hurt — deserve the weighing, not the dismissal",
            "**Direction** — as always: whose bonus, covenant or deal does this particular fair value serve?",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Fair value is a discipline, not an opinion",
          md: "The standard's whole architecture — exit price, market participants, principal market, hierarchy, sensitivity disclosure — exists to convert 'what management thinks it is worth' into 'what the market would pay, shown with its assumptions'. An SBR answer at full marks treats every element as a constraint on the scenario's preferred number, and the disclosures as the place the residual judgement must stand naked.",
        },
      ],
      check: {
        q: "Measuring a decommissioning obligation at fair value, management uses its own efficient in-house cost base, 30% below market contractor rates, 'because we will do the work ourselves'. What does IFRS 13 require?",
        options: [
          "Management's costs — they are the entity's best estimate of actual outflows",
          "Market participant assumptions: the transfer price reflects what a participant would demand to assume the obligation, priced on market cost structures — the entity's efficiency is an entity-specific advantage the measurement excludes",
          "The higher of the two, for prudence",
          "The contractor rate less a control premium",
        ],
        correct: 1,
        explain:
          "Fair value asks what the market would charge to take the liability, and the market does not have the entity's cost base. The in-house advantage is real economics — it will show as gains when the entity performs the work cheaply — but booking it in advance by shrinking the liability reports a profit for work not yet done. (Contrast IAS 37's own best-estimate measurement, which is entity-perspective: knowing which measurement basis a standard invokes is part of the answer.)",
      },
    },
  ],
  examTraps: [
    {
      trap: "Valuing on the entity's intentions — its planned use, its holding period, its cost base.",
      fix: "Market participants set the price: highest and best use, market cost structures, exit today.",
    },
    {
      trap: "Netting transaction costs into the price, or trading in the friendliest market.",
      fix: "Principal market's gross price; costs are a consequence of transacting, not an attribute of the asset.",
    },
    {
      trap: "Classifying by the technique instead of the inputs.",
      fix: "One significant unobservable input makes the measurement Level 3 — with the full disclosure burden that follows.",
    },
    {
      trap: "Dismissing every inconvenient trade as 'distressed'.",
      fix: "Weigh orderliness on evidence; quiet markets reduce a price's weight, they do not delete the market.",
    },
  ],
  keyTerms: [
    { term: "Exit price", def: "The price to sell the asset or transfer the liability — never the entry cost, replacement estimate or settlement negotiation." },
    { term: "Principal market", def: "The market with the greatest volume and activity for the item that the entity can access — whose price governs when it exists." },
    { term: "Highest and best use", def: "For non-financial assets: the physically possible, legally permissible, financially feasible use maximising value to participants — independent of the entity's intentions." },
    { term: "Observable input", def: "Market-sourced data — quoted prices, rates, corroborated comparables — that the hierarchy requires be maximised." },
    { term: "Level 3", def: "Measurements resting on significant unobservable inputs, carrying the escalated disclosures: techniques, input quantities, reconciliations and sensitivities." },
  ],
  summary: [
    "Fair value is the market's exit price, in the principal market, at highest and best use — four constraints on management preference.",
    "Transaction costs never adjust; transport can; entity-specific synergies and intentions never enter.",
    "Techniques serve inputs: maximise observable, calibrate to real transactions, and classify at the lowest significant level.",
    "Level 3 is legitimate — and must be visible: the disclosures exist so users can see whose assumptions the number is.",
    "Liabilities transfer at participant cost including own credit risk; the challenge routine ends, as always, with direction.",
  ],
  knowledgeDiagnostic: [
    { q: "Why an exit price rather than entry or replacement?", a: "Because fair value reports what the asset would fetch or the liability would cost to shed today — the market's current verdict, independent of what the entity happened to pay or would pay to rebuild." },
    { q: "How do the principal and most advantageous markets interact?", a: "The principal market — greatest volume and activity, accessible to the entity — governs whenever it exists; only in its absence does the entity look to the market maximising net proceeds, and even then the measurement itself is gross of transaction costs." },
    { q: "What forces a measurement to Level 3, and what follows?", a: "Any significant unobservable input; the consequence is the full disclosure set — techniques, quantified inputs, movement reconciliation, and sensitivity to reasonably possible alternatives." },
    { q: "Why does a liability's fair value include the entity's own credit risk?", a: "Because a market participant assuming the obligation would price the chance of non-payment; the resulting 'gains' on own deterioration are why designated liabilities route that component to OCI." },
  ],
  furtherStudy: [
    "SBR-07 places fair value among the measurement bases and their user questions",
    "SBR-12's recoverable amount and SBR-14's categories consume this chapter's machinery",
    "Area D applies it wholesale — acquisition-date fair values are where combinations get judged",
    "SBR-05's faithful representation is the test every element of the definition serves",
  ],
}

const SBR_TREE_23: StudyChapter = {
  paper: "SBR",
  id: "SBR-23",
  number: 23,
  area: "C",
  syllabusRefs: ["C10(a)", "C10(b)", "C10(c)", "C10(d)", "C10(e)", "C10(f)"],
  title: "Presentation and disclosure",
  minutes: 16,
  intro:
    "IFRS 18 rebuilt the performance statement around defined categories and subtotals, disciplined aggregation, and — its sharpest edge — dragged management's own 'adjusted' profit measures inside the audited statements. Presentation is now regulated communication, not formatting.",
  outcomes: [
    "Structure profit or loss into the operating, investing and financing categories with the defined subtotals",
    "Apply the aggregation and disaggregation principles that stop obscuring in both directions",
    "Present the statement of financial position's classifications, including current/non-current debt edges",
    "Apply the cash flow statement's disciplines and its classification judgements",
    "Report management-defined performance measures inside the note framework IFRS 18 imposes",
    "Evaluate presentation choices as communication decisions serving — or steering — users",
  ],
  sections: [
    {
      id: "ifrs18-structure",
      heading: "The performance statement, rebuilt",
      blocks: [
        {
          kind: "text",
          md: "IFRS 18 sorts income and expenses into defined **categories** — **operating** (the residual core: the entity's main business activities), **investing** (returns from investments, associates, standalone assets), and **financing** (liabilities from raising finance and their interest) — plus income tax and discontinued operations. Two **required subtotals** follow: **operating profit**, and **profit before financing and income taxes**. The point is comparability: 'operating profit' had no definition before, so every entity drew its own line — now the line is drawn, and entities whose main business *is* investing or financing (banks, insurers, investment entities) classify accordingly, which the exam can make you apply to a group containing both.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The aggregation discipline — both failure modes",
          items: [
            "**Group by shared characteristics**, present dissimilar items separately: a single 'administrative and other' line hiding a lawsuit settlement fails the principle",
            "**Do not fragment**: forty trivial line items bury the five that matter — disaggregation is required when it makes material information visible, not as decoration",
            "**Label honestly**: 'other' lines need contents disclosure once material; unexplained residuals are the classic obscuring device",
            "**Expenses**: present by nature or by function in the operating category — with functional presentation requiring nature disclosures so users can rebuild the cost structure",
          ],
        },
        {
          kind: "text",
          md: "The **statement of financial position** disciplines are stability and honesty of classification: current/non-current on the twelve-month or operating-cycle test, with the perennial exam edge being **refinanced debt** — classification follows rights existing **at the reporting date**, so a covenant breach making debt repayable on demand drags it current unless the lender granted a qualifying waiver *by* the date; a post-date refinancing is a non-adjusting event that leaves the debt current and discloses. Offsetting stays prohibited absent a right and intention to settle net — grossing up is not decoration; it is what makes exposure visible.",
        },
      ],
      check: {
        q: "A manufacturing group presents 'operating profit' excluding depreciation of its factories, inventory write-downs and warranty costs, describing them as 'non-core'. Under IFRS 18, what is wrong?",
        options: [
          "Nothing — entities define their own operating profit",
          "Operating profit is now a defined subtotal: the operating category is the residual holding the entity's main business activities, and factory depreciation, inventory write-downs and warranties are unarguably part of manufacturing's core — excluding them belongs, if anywhere, in a labelled MPM with reconciliation, not in the statement's subtotal",
          "Depreciation may be excluded but not warranties",
          "The items should move to OCI",
        ],
        correct: 1,
        explain:
          "This is the practice IFRS 18 ended: the statement's own subtotals are defined and not adjustable for management's view of 'core'. The entity can still tell its adjusted story — but as a management-defined performance measure in the notes, reconciled and explained, where its subjectivity is visible rather than embedded in the primary statement.",
      },
    },
    {
      id: "mpms",
      heading: "Management-defined performance measures — the adjusted story, audited",
      blocks: [
        {
          kind: "text",
          md: "An **MPM** is a subtotal of income and expenses used in **public communications outside the financial statements** to convey management's view of performance, that is not a listed or IFRS-specified measure. If the entity tells the market a story in 'adjusted EBITDA' or 'underlying earnings', IFRS 18 requires that story **inside the statements**: a single note disclosing each MPM, **why** it communicates management's view, **how it is calculated**, a **reconciliation** to the most comparable IFRS subtotal, and the **income tax and NCI effects** of each reconciling item. Change the measure and you disclose the change, the reason, and restated comparatives.",
        },
        {
          kind: "text",
          md: "Why the regime exists is the evaluation half. Adjusted measures are not inherently dishonest — a genuine one strips noise a user would also strip. But unpoliced practice had systematic features: adjustments overwhelmingly **added back costs** rather than gains ('adjusted' almost always exceeded IFRS profit); 'one-off' restructurings recurred annually; the definitions **shifted** year to year to flatter; and the measures lived in presentations where auditors never trod. The MPM note attacks each: symmetric visibility, a reconciliation that quantifies every add-back, consistency policing, and audit scope. The remaining gap — measures not used in public communications, or ratios rather than subtotals — is fair critique material.",
        },
        {
          kind: "examQuestion",
          title: "Evaluate an entity's adjusted performance measure",
          format: "written",
          marks: 8,
          requirement: "Discuss the entity's use of 'core operating earnings' in its results announcement and the reporting requirements that apply, and evaluate whether the measure faithfully represents performance.",
          plan: [
            { step: "Identify it as an MPM", detail: "A non-IFRS subtotal used in public communications to convey management's view — squarely in scope." },
            { step: "State the note requirements", detail: "Single note: rationale, calculation, reconciliation to the closest IFRS subtotal, tax and NCI per item, and change disclosure with restatement." },
            { step: "Audit the adjustments one by one", detail: "For each add-back: genuinely non-recurring, or annual? Symmetric with gains, or one-way? Consistent with last year's definition?" },
            { step: "Test prominence and labelling", detail: "Does the announcement lead with the MPM and bury the IFRS result? Prominence is a faithful-representation issue even where disclosure complies." },
            { step: "Conclude for the user", detail: "What should a user add back, and what does the pattern say about management's reporting incentives?" },
          ],
          answer:
            "'Core operating earnings' is a management-defined performance measure: a subtotal of income and expenses used in the results announcement to convey management's view of performance, and not an IFRS-defined measure. It must therefore appear in a single note to the financial statements with the reasons it provides useful information, its calculation, a reconciliation to operating profit — the most directly comparable IFRS 18 subtotal — and the income tax and non-controlling interest effect of each reconciling item.\n\nThe adjustments themselves undermine the measure's claim to represent 'core' performance. The $45m restructuring add-back is the fourth consecutive year of 'exceptional' restructuring — a recurring cost of the business model, not noise. The impairment add-back is asymmetric: last year's disposal gain was not excluded, so the definition removes only bad news. And the measure's definition has changed twice in three years, each time raising it — the change disclosure and restated comparatives IFRS 18 requires will make that visible.\n\nProminence compounds the problem: the announcement headlines the MPM while the IFRS result appears in a footnote, and the covenant and bonus plans reference the adjusted measure. Even with a compliant note, communication that systematically leads with a flattering, shifting, one-way-adjusted number is difficult to reconcile with faithful representation of performance.\n\nA user should treat operating profit as the anchor, examine each reconciling item for recurrence and symmetry, and read the three-year pattern of definitional drift as evidence about management's reporting incentives rather than about the business.",
          earns: [
            "MPM scoping and the full note content",
            "Each adjustment tested for recurrence and symmetry",
            "Definitional drift and its required disclosure",
            "Prominence treated as a faithful-representation issue",
            "A user-level conclusion",
          ],
          loses: [
            "Condemning adjusted measures wholesale",
            "Listing note requirements without applying them to the adjustments",
            "Missing the asymmetry — the one-way add-back pattern",
            "No anchor recommendation for the user",
          ],
        },
      ],
      check: {
        q: "A CFO argues its 'adjusted free cash flow yield' ratio and an internal-only 'segment contribution' measure both require MPM notes. Is that right?",
        options: [
          "Yes — all non-IFRS measures are MPMs",
          "No on both counts as described: MPMs are subtotals of income and expenses used in public communications — a ratio is not such a subtotal, and a purely internal measure is not publicly communicated; both sit outside the note (which is itself a limitation of the regime worth noting)",
          "Yes for the ratio, no for the internal measure",
          "MPM notes are voluntary",
        ],
        correct: 1,
        explain:
          "Scope is deliberately drawn: subtotals of income and expenses, in public communications, conveying management's view. Ratios, cash-flow constructs and private metrics escape — which is both the right answer and the critique: an entity determined to tell its story outside the audited net can still find instruments. Knowing the boundary and its consequence is the SBR-level answer.",
      },
    },
    {
      id: "cashflows",
      heading: "The statement of cash flows — the statement estimates cannot reach",
      blocks: [
        {
          kind: "text",
          md: "Cash flows classify as **operating** (the revenue-producing engine — direct or indirect method), **investing** (long-term asset acquisition and disposal — only expenditures producing recognised assets qualify), and **financing** (changing the size and composition of contributed equity and borrowings). Its analytical power is negative space: accruals, estimates and classifications shape profit, but cash either arrived or it did not — which is why persistent gaps between operating profit and operating cash flow are the single most-used earnings-quality signal in Area E.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The classification games the statement still permits — and the exam expects named",
          items: [
            "**Interest and dividends**: policy choices within limits create comparability gaps — and moving interest paid out of operating flatters the metric lenders watch",
            "**Supplier finance / reverse factoring**: extended 'trade payables' that are borrowings in substance park financing inflows inside operating — the disclosure requirements on supplier finance exist precisely because of this",
            "**Asset sales near period end**: one-off disposals dressed as recurring operating strength",
            "**Netting**: gross flows are the rule; netting hides scale and churn",
            "**Non-cash transactions** (leases entered, shares issued for acquisitions) bypass the statement entirely and disclose instead — forgetting them overstates what the statement explains",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Read the three statements as one system",
          md: "Presentation questions reward integration: an entity with rising 'operating profit' (IFRS 18 defined), a widening operating-cash gap, supplier-finance balances growing inside payables, and an MPM that adds back the costs of all of it, is one story told four ways. The candidate who connects the statements — rather than auditing each in isolation — is doing what the paper calls evaluation.",
        },
      ],
      check: {
        q: "An entity arranges for a bank to pay its suppliers at day 30 while it repays the bank at day 210, presenting the balances within trade payables and the flows within operating. Cash conversion 'improves' dramatically. What should the statements show?",
        options: [
          "The presentation is correct — suppliers were paid for goods",
          "The extended arrangement has the substance of bank financing: the balances need separate presentation or disclosure as supplier finance, the incremental flows belong in financing, and the 'improved' cash conversion is the financing inflow wearing operating clothes",
          "The balances move to provisions",
          "Only a note is needed if the bank consents",
        ],
        correct: 1,
        explain:
          "The entity's obligation runs to a bank, on credit terms no supplier gave it — that is borrowing, whatever the label. Supplier-finance disclosure requirements (terms, balances, ranges of payment dates) exist because this structure inflated operating cash flow invisibly at scale. The analytical point completes the answer: reverse the classification and the celebrated cash conversion collapses.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating IFRS 18's subtotals as adjustable for 'non-core' items.",
      fix: "Operating profit is defined; management's adjusted story lives in the MPM note, reconciled and taxed per item.",
    },
    {
      trap: "Classifying debt on post-year-end fixes.",
      fix: "Rights at the reporting date govern: breach without a by-the-date waiver means current, with the refinancing disclosed as non-adjusting.",
    },
    {
      trap: "Auditing adjustments one at a time and missing the pattern.",
      fix: "Test the set for symmetry, recurrence and definitional drift — the pattern is the finding.",
    },
    {
      trap: "Reading operating cash flow as unmanipulable.",
      fix: "Supplier finance, classification choices and period-end disposals steer it; substance and disclosure requirements are the counter.",
    },
  ],
  keyTerms: [
    { term: "Operating category", def: "IFRS 18's residual category for the entity's main business activities — the base of the defined operating profit subtotal." },
    { term: "Management-defined performance measure", def: "A subtotal of income and expenses used in public communications to convey management's view, outside IFRS-specified measures — disclosed, explained and reconciled in a single note." },
    { term: "Aggregation principle", def: "Group items by shared characteristics and separate dissimilar ones — obscuring by lumping and by fragmenting both fail it." },
    { term: "Supplier finance arrangement", def: "Finance-provider structures settling supplier invoices with extended entity repayment — disclosable, and financing in substance when terms outrun trade credit." },
    { term: "Non-cash transaction", def: "Investing or financing activity without cash movement — leases, share-settled acquisitions — disclosed rather than forced into the cash flow statement." },
  ],
  summary: [
    "IFRS 18 defines the categories and subtotals; 'operating profit' is no longer management's to sculpt.",
    "Aggregation fails by lumping and by fragmenting; 'other' lines and unexplained residuals are the tells.",
    "MPMs bring the adjusted story into audit scope: rationale, calculation, reconciliation, tax and NCI, and change restatement.",
    "Balance-sheet classification follows reporting-date rights — waivers by the date, refinancings after it disclose.",
    "Cash flows resist estimates but not classification; supplier finance is the modern game, and the statements read as one system.",
  ],
  knowledgeDiagnostic: [
    { q: "What are IFRS 18's categories and required subtotals?", a: "Operating (the main-business residual), investing, financing, plus income taxes and discontinued operations; required subtotals: operating profit, and profit before financing and income taxes." },
    { q: "What must the MPM note contain?", a: "Each measure's rationale for usefulness, its calculation, a reconciliation to the most comparable IFRS subtotal with the tax and NCI effect of each item, and disclosure with restatement when the measure changes." },
    { q: "When does breached debt stay non-current?", a: "Only when the lender waived the breach — giving at least twelve months' grace — by the reporting date; later waivers and refinancings are non-adjusting disclosures over a current liability." },
    { q: "Why does supplier finance attract specific disclosure?", a: "Because extended payment structures moved borrowing inside trade payables and financing inflows inside operating cash flow — the disclosures (terms, balances, payment-date ranges) let users reverse the flattering classification." },
  ],
  furtherStudy: [
    "SBR-05's communication principles are the conceptual layer this chapter operationalises",
    "SBR-08 handles the P&L/OCI boundary that sits alongside these structures",
    "Area E consumes every signal here — MPM patterns, cash gaps, classification games — as analysis",
    "Area D adds the consolidated cash flow statement's group-specific disciplines",
  ],
}

const SBR_TREE_24: StudyChapter = {
  paper: "SBR",
  id: "SBR-24",
  number: 24,
  area: "C",
  syllabusRefs: ["C11(a)", "C11(b)", "C11(c)", "C11(d)", "C11(e)"],
  title: "Other reporting issues",
  minutes: 16,
  intro:
    "Five regimes that decide how change and context report: government grants, the policy-estimate-error triangle, going concern, related parties, and the IFRS for SMEs Standard. Each is short; each carries a judgement the exam has planted a scenario on.",
  outcomes: [
    "Account for government grants under the income approach, and evaluate its logic",
    "Separate policy changes, estimate changes and errors — and apply the right mechanics to each",
    "Assess going concern, the disclosure ladder, and the basis change when the presumption fails",
    "Identify related parties and explain why disclosure, not adjustment, is the remedy",
    "Contrast the IFRS for SMEs Standard's simplifications with full IFRS and argue eligibility trade-offs",
  ],
  sections: [
    {
      id: "grants-and-triangle",
      heading: "Grants, and the policy–estimate–error triangle",
      blocks: [
        {
          kind: "text",
          md: "**Government grants** recognise only when there is **reasonable assurance** the entity will comply with the conditions *and* receive the grant — then match income to the periods bearing the related costs. **Asset grants**: deferred income released over the asset's life, or netted against carrying amount (both permitted; the gross method shows more). **Income grants**: recognised as the subsidised costs accrue. Grants **repayable** (conditions breached) account as changes in estimate — no restatement. The examinable edge: a grant received for *past* costs or immediate support recognises immediately, and 'reasonable assurance' is a gate scenarios test with conditional, clawback-laden awards.",
        },
        {
          kind: "table",
          caption: "The triangle — what changed, and what follows",
          head: ["What it is", "Test", "Mechanics"],
          rows: [
            ["Accounting policy change", "A different basis, principle or convention — voluntary changes need MORE relevant and reliable information", "Retrospective: restate comparatives and opening equity, as if always applied"],
            ["Estimate change", "New information about an existing uncertainty — lives, allowances, provisions, fair value inputs", "Prospective: current and future periods only; disclose nature and amount"],
            ["Prior period error", "Misuse of, or failure to use, reliable information AVAILABLE at the time — including fraud", "Retrospective restatement, with the corrected line items and per-period effects disclosed"],
          ],
        },
        {
          kind: "text",
          md: "The boundaries are the marks. **Estimate versus error**: a provision that proved wrong because the future surprised is an estimate change; one wrong because management ignored the lawyer's letter it held at the time is an error — the test is what information was *available*, and the classification decides whether last year's profit is publicly corrected. **Policy versus estimate**: moving from FIFO to weighted average is policy; changing a depreciation method is an estimate change (a revised consumption pattern), a distinction candidates reliably invert. And the incentive: management prefers 'estimate change' for everything — no restatement, no announcement that prior statements failed — which is exactly why the examiner writes scenarios where the facts say error.",
        },
      ],
      check: {
        q: "An entity discovers that last year's inventory count double-counted a warehouse, overstating profit by $8m. Management proposes reducing this year's closing inventory 'to catch it up quietly'. What does IAS 8 require?",
        options: [
          "The proposal is acceptable — the error self-corrects through cost of sales",
          "Retrospective restatement: the double-count is a prior period error (the information was available at the time), so comparatives restate, opening retained earnings adjust, and the error's nature and per-line effect disclose — the quiet catch-up would misstate this year to hide last year",
          "An estimate change, applied prospectively",
          "Disclosure alone suffices if the auditors agree",
        ],
        correct: 1,
        explain:
          "The 'quiet' route misstates two periods to avoid admitting one: this year absorbs a loss it did not incur, and last year's overstatement stands. The error test is met — a physical double-count is failure to use available information, not a surprise from the future. Restatement's publicity is not a side effect; it is the accountability mechanism, which is why management wanted the other road.",
      },
    },
    {
      id: "going-concern",
      heading: "Going concern — presumption, uncertainty, and the cliff",
      blocks: [
        {
          kind: "text",
          md: "Statements are prepared on a **going concern** basis unless management intends, or has no realistic alternative but, to liquidate or cease trading. The assessment looks forward **at least twelve months** from the reporting date, weighing financing (maturities, covenant headroom, lender support), operations (order books, supplier terms) and contingencies. Three rungs: a clean basis; a going-concern basis **with disclosure of material uncertainty** — the events, the doubt, and management's plans — where significant doubt exists but the basis holds; and a **different basis entirely** when the presumption fails, remeasuring assets to recoverable amounts, recognising the liabilities cessation crystallises.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The disclosure management resists most",
          md: "The middle rung is the exam's habitat: disclosing material uncertainty can *feel* self-fulfilling (lenders read it, suppliers tighten), so management argues the doubt away — optimistic forecasts, 'committed' support letters from parents that commit nothing, refinancing 'well advanced'. The answer's discipline: the test is the evidence, the disclosure is owed to the users bearing the risk, and the same forecasts must carry the impairment, deferred tax and viability stories consistently — the cross-check from SBR-19 in the other direction.",
        },
        {
          kind: "text",
          md: "**Related parties** exist because arm's-length pricing is the silent assumption of every line: parents, subsidiaries, associates, key management personnel and their close family, and entities any of them control. Disclosure — relationships (parent–subsidiary regardless of transactions), transaction types and amounts, balances, KMP compensation by category — is the remedy, **not adjustment**: the statements report what happened, and the notes tell users the terms may not be market. The evaluation point: related-party machinery polices *stewardship* — extraction through management fees, sales at undervalue to a director's company — which is why 'no disclosure needed, the price was fair' misses the point twice: fairness is undemonstrated, and the relationship itself is what the user must know.",
        },
      ],
      check: {
        q: "A subsidiary sells its head office to another group entity at an independently valued market price. The FD sees no need for disclosure 'since the price was arm's length'. What is required?",
        options: [
          "Nothing — market-priced transactions are exempt",
          "Full related party disclosure: the relationship, the transaction's nature and amount, and outstanding balances — arm's-length pricing does not remove the requirement, and any claim that terms were equivalent to market must itself be substantiatable to be stated",
          "Disclosure only if the price was off-market",
          "The transaction must be reversed",
        ],
        correct: 1,
        explain:
          "Users cannot assess an entity's results without knowing which counterparties could dictate terms — even genuinely fair deals between related parties reallocate group results and would not necessarily have happened at all between strangers. The standard permits stating that terms were market-equivalent only if that can be substantiated: the FD's assertion is a claim requiring evidence, not an exemption.",
      },
    },
    {
      id: "smes",
      heading: "The IFRS for SMEs Standard — proportionate reporting",
      blocks: [
        {
          kind: "text",
          md: "The **IFRS for SMEs Standard** serves entities **without public accountability** (no listed instruments, not deposit-takers or fiduciaries) that publish general purpose statements. It is a self-contained standard rewriting full IFRS at a fraction of the length, on a logic of **cost-benefit for users who can usually ask**: an SME's bank and owner-managers have access the public investor lacks, so the disclosure burden and measurement complexity both shrink.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The simplifications the exam quotes",
          items: [
            "**Goodwill and indefinite intangibles amortise** (ten-year cap where life cannot be estimated) — no annual impairment-only regime",
            "**Development and borrowing costs expense** — the capitalisation criteria and qualifying-asset machinery go",
            "**No held-for-sale classification**; simplified financial instrument categories with an amortised-cost centre of gravity",
            "**Associates and JVs** may use cost, equity or fair value models; **all R&D expensed** removes the six-criteria judgement",
            "**Disclosures cut** to a fraction of full IFRS; recognition of the fewer-estimates principle throughout",
          ],
        },
        {
          kind: "text",
          md: "The evaluation both ways: simplification cuts cost, comparability across the SME sector improves against a patchwork of local GAAPs, and the removed judgements are precisely the ones (development capitalisation, impairment-only goodwill) small entities perform worst. Against: an SME heading for listing faces transition; amortised goodwill and expensed development can *understate* asset-rich SMEs to their lenders; and 'public accountability' has edges — the syllabus expects you to test eligibility on facts (holding client money? instruments traded?) rather than size, since the standard has **no size test** at all.",
        },
      ],
      check: {
        q: "A large private manufacturer (revenue $900m) that holds customer deposits as agent for a utility scheme asks whether it may use the IFRS for SMEs Standard, noting it is unlisted. May it?",
        options: [
          "Yes — it is unlisted, and size is irrelevant",
          "Likely not: eligibility turns on public accountability, and holding funds in a fiduciary capacity for a broad group of outsiders as a main part of the arrangement is public accountability regardless of listing status — the facts of the deposit scheme decide it, not the entity's size",
          "No — $900m revenue exceeds the size threshold",
          "Yes, if its bank consents",
        ],
        correct: 1,
        explain:
          "The standard's gate is qualitative: no publicly traded instruments and no fiduciary holding of outsiders' resources as a primary business. Size never enters (option 2 invents a threshold), and lender consent (option 3) is not a mechanism. The examinable skill is applying the fiduciary limb to the scheme's facts — incidental holding ancillary to another business can escape; a broad deposit-holding arrangement does not.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Calling every misstatement an estimate change.",
      fix: "Ask what information was available at the time: available-and-ignored is an error, restated publicly.",
    },
    {
      trap: "Netting repayable or uncertain grants into income early.",
      fix: "Reasonable assurance of compliance and receipt first; repayments are estimate changes, matching drives the release.",
    },
    {
      trap: "Arguing going-concern doubt away to avoid the disclosure.",
      fix: "Evidence governs, the disclosure is owed to risk-bearing users, and the forecasts must match the impairment and tax notes.",
    },
    {
      trap: "Waving related-party disclosure on 'fair price' grounds.",
      fix: "The relationship, amounts and balances disclose regardless; market-equivalence claims need substantiation.",
    },
  ],
  keyTerms: [
    { term: "Reasonable assurance (grants)", def: "The recognition gate for government grants: confidence in both condition compliance and receipt before any income recognises." },
    { term: "Prior period error", def: "A misstatement from failing to use reliable information available when prior statements were issued — corrected by retrospective restatement." },
    { term: "Material uncertainty (going concern)", def: "Events or conditions casting significant doubt on the entity's ability to continue — disclosed with management's plans while the basis holds." },
    { term: "Related party", def: "A person or entity with control, joint control or significant influence over the reporter, its key management, their close family, and entities they control — whose dealings disclose regardless of price." },
    { term: "Public accountability", def: "The IFRS for SMEs exclusion test: publicly traded instruments, or fiduciary holding of a broad group's resources as a main business." },
  ],
  summary: [
    "Grants match the costs they subsidise, behind a reasonable-assurance gate; repayments are estimate changes.",
    "The triangle: policies restate, estimates run forward, errors restate publicly — and the available-information test polices the border.",
    "Going concern has three rungs; the middle one is where management's optimism meets users' right to the doubt.",
    "Related parties disclose relationships and amounts, not fairness opinions — stewardship is the point.",
    "The SMEs Standard trades comparability with full IFRS for proportionate cost, gated by accountability, not size.",
  ],
  knowledgeDiagnostic: [
    { q: "State the estimate-versus-error test with an example each way.", a: "What information was available when the statements issued: a provision undone by unforeseeable events is an estimate change (prospective); one contradicted by the legal advice already on file is an error (retrospective restatement)." },
    { q: "What are going concern's three reporting outcomes?", a: "Clean going-concern basis; going-concern basis with material-uncertainty disclosure (events, doubt, plans); or a non-going-concern basis with remeasurement when liquidation or cessation is intended or unavoidable." },
    { q: "Why do fairly priced related-party deals still disclose?", a: "Because the relationship itself changes how results read — deals might not exist at all between strangers, fairness is rarely demonstrable, and stewardship monitoring needs the map of who can dictate terms." },
    { q: "Name four measurement simplifications in the IFRS for SMEs Standard.", a: "Goodwill and indefinite-life intangibles amortise (ten-year cap); development costs expense; borrowing costs expense; associates and JVs may use cost, equity or fair value — with heavily reduced disclosure throughout." },
  ],
  furtherStudy: [
    "SBR-20 pairs with the going-concern override for after-date events",
    "SBR-19's asset-evidence cross-check and SBR-12's forecasts must square with the going-concern story",
    "Area D's group chapters meet related parties at intra-group and KMP scale",
    "Area F evaluates regime change — the SMEs Standard is a live case of proportionate standard-setting",
  ],
}

export const SBR_TREE_AREA_C3: StudyChapter[] = [SBR_TREE_19, SBR_TREE_20, SBR_TREE_21, SBR_TREE_22, SBR_TREE_23, SBR_TREE_24]
