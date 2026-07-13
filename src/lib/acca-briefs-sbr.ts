/*
 * SBR — Strategic Business Reporting topic briefs (2026-07-13).
 * One brief per syllabus area (A–E). Same instruction-layer format as
 * TOPIC_BRIEFS in acca-briefs.ts: concept, structure, worked example, traps.
 * Plain text bodies (\n\n between paragraphs, formulas as plain lines).
 */

import type { TopicBrief } from "@/lib/acca-briefs"

export const SBR_BRIEFS: TopicBrief[] = [
  /* ───────────────────── A — Conceptual & regulatory framework ───────────────────── */
  {
    paper: "SBR",
    area: "A",
    title: "Conceptual & regulatory framework",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why a framework sits above the standards",
        body: `Every IFRS Accounting Standard answers a narrow question — how to account for a lease, a provision, revenue. But standards cannot cover every transaction a real business invents, and they sometimes conflict or fall silent. The Conceptual Framework is the thinking that sits above them: a shared set of principles the IASB uses when it writes new standards, and the reference preparers fall back on when no standard applies.

Start with the objective. Financial reporting exists to give existing and potential investors, lenders and other creditors information useful for deciding whether to provide resources to the entity — and to assess management's stewardship of those resources. That single purpose drives everything else.

Information is only useful if it has two fundamental qualitative characteristics: relevance (it is capable of making a difference to decisions, including through materiality) and faithful representation (complete, neutral and free from error, which is supported by prudence — the exercise of caution so assets and income are not overstated). Four enhancing characteristics then raise the quality further: comparability, verifiability, timeliness and understandability. These enhance useful information but cannot rescue information that is irrelevant or unfaithful.

The heart of SBR is applying principles when the marking is about judgement, not recall. Examiners reward candidates who reason from the Framework — is there really an asset? has control passed? is faithful representation served by this treatment? — rather than reciting a rule.`,
      },
      {
        kind: "structure",
        heading: "Elements, recognition and measurement",
        body: `The five elements (2018 Framework definitions):
Asset — a present economic resource controlled by the entity as a result of past events; an economic resource is a right with the potential to produce economic benefits.
Liability — a present obligation to transfer an economic resource as a result of past events.
Equity — the residual: assets minus liabilities.
Income — increases in assets, or decreases in liabilities, that increase equity (other than contributions from owners).
Expenses — decreases in assets, or increases in liabilities, that decrease equity (other than distributions to owners).

Recognition: an item is recognised only if doing so provides users with relevant information and a faithful representation — the old "probable inflow / reliable measurement" tests were replaced by this usefulness lens in 2018. Derecognition normally follows loss of control (assets) or extinguishment of the obligation (liabilities).

Measurement bases:
Historical cost — the value at the transaction date, updated for consumption and impairment.
Current value, which includes:
  Fair value (IFRS 13) — the price to sell an asset / transfer a liability in an orderly transaction between market participants (an exit price).
  Value in use (assets) and fulfilment value (liabilities) — entity-specific present values of future cash flows.
  Current cost — the cost of an equivalent asset today.

IFRS 13 fair value hierarchy: Level 1 quoted prices in active markets, Level 2 other observable inputs, Level 3 unobservable inputs.

Supporting standards: IAS 1 presentation (going concern, accruals), IAS 8 for selecting policies and for the change-vs-error distinction (policy and error changes are retrospective; estimate changes are prospective). The Framework is not itself a standard — a specific IFRS always overrides it.`,
      },
      {
        kind: "example",
        heading: "Worked example — substance over form",
        body: `An entity sells a building to a bank for $10m cash and simultaneously agrees to buy it back in three years for $12.1m, with the entity keeping full use of the building throughout. Legal form: a sale.

Framework test — has an asset been derecognised?
Control has not passed. The entity still uses the building, bears the risks, and is committed to reacquire it at a fixed price that simply reflects 10% interest per year (10 × 1.1^3 = 13.31 — here $12.1m over three years reflects the financing return the bank requires).

Faithful representation therefore treats this as a secured loan, not a sale:
Dr Cash $10m / Cr Financial liability $10m on day one.
The building stays on the statement of financial position and keeps being depreciated.
The $2.1m "profit" on repurchase is finance cost accrued over the three years, not gain on disposal.

Recognising a $10m sale and a disposal profit would faithfully represent the legal paperwork but misrepresent the economics — exactly the error the Framework's substance-over-form reasoning is built to catch.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Quoting the pre-2018 recognition criteria ("probable and reliably measurable") — recognition now turns on relevance and faithful representation.

Calling prudence a bias toward understatement — the Framework describes prudence as caution, and asymmetric prudence is not a general requirement; neutrality still governs.

Treating fair value as an entity-specific number — IFRS 13 fair value is a market exit price; value in use is the entity-specific measure.

Applying the Framework over a specific standard — a standard always wins; the Framework fills gaps.

Confusing a change in accounting estimate (prospective) with a change in policy or a prior-period error (both retrospective under IAS 8).

Reciting the objective as "to show a true and fair view" without naming the primary users and the stewardship dimension.`,
      },
    ],
  },

  /* ───────────────────── B — Reporting financial performance ───────────────────── */
  {
    paper: "SBR",
    area: "B",
    title: "Reporting financial performance",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Recognising performance faithfully",
        body: `This area is where most SBR marks live: revenue, leases, tax, provisions and the events that make up a period's result. The common thread is timing and measurement — WHEN a gain or expense hits profit or loss, and at WHAT amount — because that is where managers are tempted to flatter the numbers.

Revenue is the flagship. IFRS 15 replaced the old risks-and-rewards idea with a control model: revenue is recognised when the entity satisfies a performance obligation by transferring control of a good or service to the customer, either over time or at a point in time.

Leases changed the balance sheet for lessees. IFRS 16 abolished the operating/finance split for lessees — almost every lease now puts a right-of-use asset and a lease liability on the statement of financial position, so gearing and EBITDA are affected.

Provisions test judgement. IAS 37 draws the line between a liability you must recognise, a contingency you only disclose, and a possibility you ignore. Deferred tax (IAS 12) then reconciles the accounting numbers to the tax base. Held-for-sale and discontinued operations (IFRS 5) govern how a business being wound down is presented. Together these standards decide the shape of the primary statements.`,
      },
      {
        kind: "structure",
        heading: "The standards and their rules",
        body: `IFRS 15 — the five-step model:
1. Identify the contract with the customer.
2. Identify the separate performance obligations (distinct goods/services).
3. Determine the transaction price (including variable consideration, constrained to a highly-probable amount).
4. Allocate the price to the obligations by stand-alone selling prices.
5. Recognise revenue as each obligation is satisfied (over time if one of three criteria is met; otherwise at a point in time).

IFRS 16 — lessee: recognise a right-of-use asset and lease liability at the present value of lease payments; unwind the liability with a finance cost and depreciate the asset. Optional exemptions for short-term (<12 months) and low-value leases. Lessors still split into finance vs operating leases.

IAS 37 — provisions: recognise when there is a present obligation (legal or constructive) from a past event, an outflow is probable, and it can be reliably estimated. Measure at the best estimate (expected value for large populations; most likely outcome for a single item); discount if material. Contingent liabilities are disclosed, not recognised; contingent assets disclosed only when probable.

IAS 12 — deferred tax: a temporary difference is carrying amount minus tax base. Deferred tax liability = taxable temporary difference × tax rate; deferred tax asset recognised only to the extent future profits are probable.

IFRS 5 — held for sale: measure at the lower of carrying amount and fair value less costs to sell; stop depreciating; present separately. A discontinued operation is a separate major line of business, shown as a single figure of post-tax result.

Also examinable: IFRS 2 share-based payment, IAS 20 grants, IAS 40 investment property, IAS 36 impairment.`,
      },
      {
        kind: "example",
        heading: "Worked example — a deferred-tax temporary difference",
        body: `A machine cost $200,000. For accounting, depreciation is straight-line over 5 years, so after year 1 the carrying amount is $160,000. For tax, capital allowances of 25% were claimed, so the tax written-down value (tax base) is $150,000. The tax rate is 20%.

Step 1 — temporary difference:
Carrying amount 160,000 − tax base 150,000 = $10,000 taxable temporary difference.
(The asset's book value exceeds its tax base, so more tax will be paid in future as the book value is recovered.)

Step 2 — deferred tax liability:
10,000 × 20% = $2,000 deferred tax liability at the year end.

Step 3 — the charge:
If the opening deferred tax liability was $0, the $2,000 increase is charged: Dr Tax expense (P/L) $2,000 / Cr Deferred tax liability $2,000.

If instead the difference had arisen on a gain recognised in OCI (e.g. a revaluation), the related deferred tax would also be taken to OCI — deferred tax follows the item that created it.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Recognising revenue on delivery when control passes over time (or vice versa) — always run the three over-time criteria before defaulting to point-in-time.

Forgetting to constrain variable consideration to the amount that is highly probable not to reverse.

Leaving operating leases off a lessee's balance sheet — under IFRS 16 the lessee split is gone; only short-term and low-value exemptions remain.

Recognising a provision for a future operating loss or a restructuring with no announced plan — there must be a present obligation; restructuring needs a detailed plan plus a valid expectation raised in those affected.

Computing deferred tax on the profit-and-loss difference instead of the balance-sheet temporary difference (carrying amount vs tax base).

Continuing to depreciate an asset classified as held for sale — depreciation stops on classification.`,
      },
    ],
  },

  /* ───────────────────── C — Groups & business combinations ───────────────────── */
  {
    paper: "SBR",
    area: "C",
    title: "Groups & business combinations",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "One economic entity",
        body: `A group is several legal companies that behave, economically, as one. Consolidated accounts present the parent and its subsidiaries as if they were a single entity — because that is what the shareholders of the parent are really invested in.

The trigger is control, not ownership percentage. IFRS 10 says an investor controls an investee when it has power over the investee, exposure to variable returns, and the ability to use its power to affect those returns. Control usually comes with more than 50% of the votes, but can exist with less (or be absent with more) depending on the arrangements.

Consolidation is mechanical once you see the logic: add the parent's and subsidiary's assets, liabilities, income and expenses line by line, then adjust for three things that would otherwise double-count or misstate the group — goodwill on acquisition, the non-controlling interest (NCI) in the subsidiary, and intra-group transactions (including unrealised profit on inventory or assets still held within the group).

Not every investment is a subsidiary. Significant influence (usually 20–50%) gives an associate, accounted for by the equity method; joint control gives a joint venture (equity method) or a joint operation (share of assets and liabilities). Getting the classification right decides the whole treatment.`,
      },
      {
        kind: "structure",
        heading: "The consolidation rules",
        body: `IFRS 3 — goodwill at acquisition:
Consideration transferred
+ NCI (measured at fair value, or at the NCI's proportionate share of net assets — a policy choice per combination)
+ fair value of any previously held equity interest (step acquisition)
− fair value of identifiable net assets acquired
= Goodwill.
Goodwill is not amortised; it is tested for impairment annually under IAS 36. A bargain purchase (negative goodwill) is credited to profit or loss.

Non-controlling interest at the reporting date:
NCI at acquisition + NCI% × post-acquisition change in net assets (adjusted for any goodwill impairment attributable to NCI if the fair-value method was used).

Intra-group / PURP: eliminate intra-group balances and trading in full. For unrealised profit in closing inventory (or a transferred non-current asset), remove the profit still held within the group. If the SELLER is the subsidiary, the PURP adjustment reduces the subsidiary's profit and so is shared with the NCI.

IAS 28 — associates (equity method): investment starts at cost, then increased by the group's share of the associate's post-acquisition profit and reduced by dividends received. One line in the SOFP; share of profit in one line of the P/L.

IAS 21 — a foreign subsidiary: translate assets and liabilities at the closing rate, income and expenses at average rate, with exchange differences in OCI.

Disposals: a full disposal gives a group profit/loss; loss of control triggers remeasurement of any retained interest to fair value.`,
      },
      {
        kind: "example",
        heading: "Worked example — goodwill with fair-value NCI",
        body: `Parent P buys 80% of subsidiary S for $600,000 cash. At acquisition, S's identifiable net assets have a fair value of $500,000. The fair value of the 20% NCI is $130,000.

Goodwill (fair value / full goodwill method):
Consideration transferred                600,000
NCI at fair value                        130,000
                                         -------
                                         730,000
Less fair value of net assets acquired  (500,000)
                                         -------
Goodwill                                  230,000

Compare the proportionate method (NCI = 20% × 500,000 = 100,000):
600,000 + 100,000 − 500,000 = 200,000 goodwill.

The $30,000 difference is the goodwill attributable to the NCI, which only the fair-value method recognises.

Two years later, S's net assets have risen to $560,000 and goodwill is unimpaired. NCI in the SOFP under the fair-value method:
NCI at acquisition 130,000 + 20% × (560,000 − 500,000) = 130,000 + 12,000 = $142,000.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Consolidating on ownership % instead of control — IFRS 10 control (power + variable returns + ability to affect them) is the test; you can control with under 50%.

Amortising goodwill — it is impairment-tested only, never amortised.

Mixing the two NCI methods within one goodwill calculation, or forgetting that only the fair-value method puts goodwill inside the NCI figure.

Eliminating PURP against the parent when the subsidiary was the seller — an upstream PURP reduces the sub's profit and is therefore shared with the NCI.

Equity-accounting an associate line by line — the associate is one line in the SOFP and one line in the P/L, never consolidated.

Translating a foreign subsidiary's income statement at the closing rate — income and expenses use the average rate; only assets and liabilities use closing.`,
      },
    ],
  },

  /* ─────────────── D — Financial instruments & employee benefits ─────────────── */
  {
    paper: "SBR",
    area: "D",
    title: "Financial instruments & employee benefits",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Two areas built on judgement",
        body: `Financial instruments and employee benefits look unrelated, but SBR pairs them because both hinge on classification and on splitting movements between profit or loss and other comprehensive income (OCI).

For financial instruments, the first question is always: is this a financial asset, a financial liability, or equity? IAS 32 draws that line by substance — an instrument is a liability if the issuer has an obligation to deliver cash or another financial asset, and equity only if there is no such obligation. Redeemable preference shares, for example, are debt however they are labelled.

IFRS 9 then classifies financial ASSETS using two lenses together: the entity's business model for holding them, and whether the contractual cash flows are solely payments of principal and interest (the SPPI test). Those two decide whether an asset sits at amortised cost, at fair value through OCI, or at fair value through profit or loss. IFRS 9 also demands forward-looking impairment — expected credit losses (ECL) — rather than waiting for a loss to be incurred.

Employee benefits (IAS 19) turn on the difference between defined contribution plans (the entity just pays a fixed contribution — simple) and defined benefit plans, where the entity promises a pension outcome and bears the actuarial risk. The hard part of a DB plan is deciding which movements go to P/L and which go to OCI.`,
      },
      {
        kind: "structure",
        heading: "The classification and remeasurement rules",
        body: `IAS 32 — liability vs equity: classify by substance. A compound instrument (e.g. a convertible bond) is split: measure the liability component first as the present value of the cash flows at a market rate for similar debt without the option, then the residual is equity.

IFRS 9 — financial asset classification:
Amortised cost — business model is "hold to collect" AND cash flows pass the SPPI test.
Fair value through OCI — business model is "hold to collect and sell" AND SPPI is met (interest and impairment still go to P/L; other gains to OCI, recycled on disposal for debt).
Fair value through profit or loss — everything else (default). Equity investments not held for trading may be irrevocably elected to FVOCI, but those gains are never recycled.

IFRS 9 — expected credit losses (three-stage model):
Stage 1 — no significant increase in credit risk: recognise 12-month ECL; interest on gross carrying amount.
Stage 2 — significant increase in credit risk: recognise lifetime ECL; interest still on gross.
Stage 3 — credit-impaired: lifetime ECL; interest on the net (amortised cost) carrying amount.

IAS 19 — defined benefit plan. Net obligation = present value of the defined benefit obligation − fair value of plan assets. Movements each year:
To profit or loss — current service cost, past service cost (recognised in full when the plan is amended), and net interest (net obligation × the discount rate).
To OCI — remeasurements: actuarial gains/losses and the return on plan assets excluding amounts in net interest. Remeasurements are never recycled to P/L.

IFRS 7 requires the risk and fair-value disclosures around all of the above.`,
      },
      {
        kind: "example",
        heading: "Worked example — a stage-1 ECL and DB net interest",
        body: `ECL: a bank holds a loan portfolio with a gross carrying amount of $2,000,000 measured at amortised cost. There has been no significant increase in credit risk, so the loans sit in Stage 1. The 12-month probability of default is estimated at 1.5% and the loss given default at 40%.

12-month ECL = 2,000,000 × 1.5% × 40% = $12,000.
Entry: Dr Impairment loss (P/L) $12,000 / Cr Loss allowance $12,000.
Interest income is still recognised on the gross $2,000,000, because the asset is not yet credit-impaired.

DB net interest: a pension plan opens the year with a defined benefit obligation of $5,000,000 and plan assets of $4,200,000, a net obligation of $800,000. The discount rate on high-quality corporate bonds is 5%.

Net interest cost to P/L = 800,000 × 5% = $40,000.
This single net figure replaces separately reporting interest on the obligation and expected return on assets — any actual return above this sits in OCI as a remeasurement.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Classifying redeemable preference shares as equity — a contractual obligation to deliver cash makes them a liability under IAS 32.

Testing only the business model or only SPPI — both are required together to reach amortised cost or FVOCI.

Recycling gains that must never recycle — FVOCI equity gains and IAS 19 remeasurements stay in OCI permanently; FVOCI debt gains do recycle.

Charging interest on the net (impaired) balance in Stage 1 or 2 — interest is on gross carrying amount until Stage 3.

Spreading past service cost over the vesting period — IAS 19 recognises it immediately in profit or loss when the plan is amended.

Putting actuarial gains and losses in profit or loss — they are remeasurements and belong in OCI.

Forgetting to strip out and value the liability component first when splitting a convertible bond — equity is the residual.`,
      },
    ],
  },

  /* ─────────────────── E — Interpretation & current issues ─────────────────── */
  {
    paper: "SBR",
    area: "E",
    title: "Interpretation & current issues",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Reading the story behind the numbers",
        body: `The final area asks a different skill: not how to prepare the statements, but how to interpret them and comment on where reporting is heading. In the exam this is usually a stakeholder — an investor, a lender, an analyst — who wants to know what the figures mean and whether they can be trusted.

Interpretation starts with ratios, but ratios are only the opening question. A rising return on capital employed might reflect genuinely better trading, or it might be flattered by revaluations, off-balance-sheet financing that is now unwound by IFRS 16, or a one-off gain. The marks come from explaining the drivers and the limitations, and from spotting where an accounting policy choice — not real performance — moved the number.

Comparability is the recurring theme. Two companies can look different purely because one revalues property and the other holds it at cost, or because of different depreciation lives, or different revenue-recognition judgements. A good answer separates real economic differences from accounting-policy differences.

Current issues bring the syllabus up to date. The biggest is sustainability reporting: the ISSB has issued IFRS S1 (general sustainability-related disclosures) and IFRS S2 (climate-related disclosures), pushing non-financial information toward the same rigour as the financial statements. Candidates are expected to discuss why this matters to users and how it interacts with the existing framework.`,
      },
      {
        kind: "structure",
        heading: "Analysis tools and the current agenda",
        body: `Core ratios (know the driver of each):
Profitability — gross margin, operating margin, return on capital employed (ROCE = operating profit ÷ (equity + non-current liabilities)).
Liquidity — current ratio and quick (acid-test) ratio.
Efficiency — inventory days, receivables days, payables days, asset turnover.
Solvency/gearing — debt ÷ equity (or debt ÷ (debt + equity)) and interest cover (operating profit ÷ finance cost).
Investor — earnings per share (IAS 33: basic EPS = profit attributable to ordinary shareholders ÷ weighted-average ordinary shares; diluted EPS adjusts for potential ordinary shares).

Limitations to raise: historical data, different policies, seasonality, inflation, creative presentation, and the effect of one-off items and revaluations.

Presentation and segments: IAS 1 sets the primary statements and the P/L vs OCI split (and which OCI items recycle); IFRS 8 reports operating segments on the "through the eyes of management" basis actually used internally.

Current issues:
IFRS S1 — general requirements for disclosure of sustainability-related financial information (risks and opportunities that could affect the entity's prospects).
IFRS S2 — climate-related disclosures, built around governance, strategy, risk management, and metrics and targets, including scope 1, 2 and 3 greenhouse-gas emissions.
Related debates: the Management Commentary Practice Statement, integrated reporting linking financial and non-financial capitals, materiality of narrative information, and the risk of greenwashing.`,
      },
      {
        kind: "example",
        heading: "Worked example — a margin that is not what it looks",
        body: `Company X reports operating profit of $1,200,000 on revenue of $6,000,000 — an operating margin of 20%, up from 15% last year. On the face of it, trading has improved.

Digging in:
Operating profit includes a $400,000 gain on revaluing investment property to fair value under IAS 40, taken through profit or loss.
It also includes a $150,000 profit on disposal of a division.

Adjusted operating profit = 1,200,000 − 400,000 − 150,000 = $650,000.
Adjusted margin = 650,000 ÷ 6,000,000 = 10.8%.

So underlying trading margin has actually FALLEN from 15% to about 11%; the headline rise is driven by a fair-value gain and a one-off disposal, neither of which is recurring. A lender assessing repayment capacity should strip both out.

This is the SBR interpretation skill in miniature: the ratio is the question, not the answer — the marks are in explaining what really drove it.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Calculating ratios and stopping — the marks are in interpretation and in linking movements to accounting policies and one-off items.

Ignoring policy differences when comparing companies — revaluation vs cost, or different useful lives, can explain a gap with no real economic difference behind it.

Treating a fair-value or disposal gain as recurring operating performance when assessing trends.

Putting ROCE's capital employed as equity only — it is equity plus long-term (interest-bearing) debt.

Describing IFRS S1/S2 as issued by the IASB — they are issued by the ISSB (both sit under the IFRS Foundation).

Forgetting to weight the shares in EPS, or omitting dilution when there are convertibles or options.

Reporting segments on a statutory basis — IFRS 8 uses the internal "eyes of management" view.`,
      },
    ],
  },
]
