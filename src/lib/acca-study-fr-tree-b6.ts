import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 17 and 18.
 *
 * Chapter 17 is IAS 37 and IAS 10 together. They belong together because they answer
 * adjacent questions about the same uncertainty: IAS 37 asks whether an obligation existed
 * AT the reporting date, and IAS 10 asks what to do about information arriving AFTER it.
 * Taught apart, candidates apply the IAS 10 adjusting/non-adjusting test to something that
 * was never a liability in the first place.
 *
 * Chapter 18 is the liability/equity distinction and compound instruments. It is placed
 * before the financial ASSET chapter because the classification question — is this thing
 * debt or equity — decides gearing, and gearing is what Area C asks about.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_17: StudyChapter = {
  id: "FR-17",
  number: 17,
  paper: "FR",
  area: "B",
  title: "IAS 37 provisions and contingencies, and IAS 10 events after the reporting period",
  minutes: 20,
  syllabusRefs: ["B7(a)", "B7(b)", "B7(c)", "B7(d)"],
  intro:
    "A provision requires a present obligation from a past event. Almost every wrong answer in this area recognises a provision for something the entity could still walk away from.",
  outcomes: [
    "Apply the three recognition criteria for a provision",
    "Distinguish a provision from a contingent liability and a contingent asset, and state the treatment of each",
    "Measure a provision, including expected value and discounting, and account for the unwinding",
    "Apply IAS 37 to restructuring, onerous contracts, warranties and decommissioning",
    "Distinguish adjusting from non-adjusting events after the reporting period",
  ],
  sections: [
    {
      id: "recognition",
      heading: "Recognising a provision",
      blocks: [
        {
          kind: "formula",
          name: "The three criteria — all required",
          expr: "1  A PRESENT OBLIGATION — legal or constructive — arising from a\n   PAST EVENT\n\n2  It is PROBABLE that an outflow of resources will be required to\n   settle it  ( probable = MORE LIKELY THAN NOT, i.e. > 50% )\n\n3  A RELIABLE ESTIMATE can be made of the amount\n\nAll three, or there is no provision.",
          note: "Criterion 1 is where the marks are. Criteria 2 and 3 are usually satisfied or obviously not; criterion 1 requires the analysis.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Provision, contingent liability, or nothing",
            caption: "The probability of the outflow determines the treatment once a present or possible obligation is established.",
            data: {
              steps: [
                { label: "Is there a PRESENT obligation from a past event?", sub: "If no present obligation but a POSSIBLE one → contingent liability" },
                { label: "Is the outflow PROBABLE (>50%)?", sub: "If only POSSIBLE → contingent liability: DISCLOSE" },
                { label: "Can it be reliably estimated?", sub: "If not → contingent liability: DISCLOSE, with the reason" },
                { label: "PROVIDE", sub: "Recognise a liability and a charge to profit or loss" },
                { label: "REMOTE?", sub: "Neither recognise nor disclose" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The complete treatment map",
          head: ["Likelihood of outflow / inflow", "Liability side", "Asset side"],
          rows: [
            ["**Virtually certain**", "Provide", "**RECOGNISE** — it is no longer contingent, it is an asset"],
            ["**Probable** (more likely than not)", "**PROVIDE**", "**DISCLOSE** as a contingent asset"],
            ["**Possible** (less than probable, more than remote)", "**DISCLOSE** as a contingent liability", "**Nothing** — neither recognise nor disclose"],
            ["**Remote**", "**Nothing**", "**Nothing**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The asymmetry, and why it is deliberate",
          md: "A **probable** outflow is **provided for**; a **probable** inflow is only **disclosed**. The two sides are not treated alike.\n\nThis is one of the places where individual standards retain asymmetric caution, and the justification is that overstating an asset misleads users more seriously than understating one. It is not the general principle of prudence from the Conceptual Framework — that is symmetrical — but a specific choice in IAS 37, and it is examined precisely because it looks inconsistent.\n\nThe corollary that catches candidates: a possible INFLOW gets no disclosure at all, whereas a possible OUTFLOW is disclosed. So a 40% chance of winning a lawsuit is invisible in the financial statements; a 40% chance of losing one is disclosed.",
        },
      ],
      check: {
        q: "An entity is being sued. Its lawyers assess the probability of losing at 35% and the likely cost at $2m. What is the treatment?",
        options: [
          "Disclose a contingent liability of $2m",
          "Provide $2m, as a reliable estimate exists",
          "Provide $700,000, being 35% of $2m",
          "No provision and no disclosure, as an outflow is not probable",
        ],
        correct: 0,
        explain:
          "At 35% the outflow is possible but not probable, so no provision is recognised and a contingent liability is disclosed. Probability weighting the single obligation is wrong — expected value is for populations of similar items, not for a single obligation where the most likely outcome is used.",
      },
    },
    {
      id: "measurement",
      heading: "Measuring a provision",
      blocks: [
        {
          kind: "list",
          title: "The measurement rules",
          items: [
            "**Best estimate** of the expenditure required to settle the obligation at the reporting date — the amount the entity would rationally pay to settle it or to transfer it to a third party.",
            "For a **LARGE POPULATION** of items, use **EXPECTED VALUE** — probability weighted. This is the warranty case: thousands of products, each with a small chance of a claim.",
            "For a **SINGLE** obligation, use the **MOST LIKELY OUTCOME**, though other possible outcomes are considered where they are mostly higher or mostly lower.",
            "**DISCOUNT** where the effect of the time value of money is material, using a pre-tax rate reflecting current market assessments and the risks specific to the liability. The unwinding of the discount is a **FINANCE COST**, not an increase in the original expense.",
            "**Do NOT** take account of expected gains on the disposal of related assets.",
            "**Reimbursements** from a third party are recognised as a **SEPARATE ASSET**, only when virtually certain, and capped at the amount of the provision. They are **not netted** against the provision — though profit or loss may be presented net.",
            "Review provisions at **each reporting date** and adjust to the current best estimate. Reverse where an outflow is no longer probable.",
            "A provision may be used **only for the expenditure for which it was originally recognised**.",
          ],
        },
        {
          kind: "example",
          title: "A warranty provision by expected value",
          scenario:
            "Merganser Co sold 200,000 units during the year, each carrying a one-year warranty. Past experience indicates that 85% will have no defect, 12% will have a minor defect costing $20 to rectify, and 3% will have a major defect costing $150.",
          steps: [
            { label: "Confirm the criteria are met", detail: "A present obligation exists — the warranty was given as part of a completed sale, so the past event has occurred and the entity has no practical ability to avoid it. An outflow is probable across the population, and past experience makes a reliable estimate possible." },
            { label: "Choose the measurement basis", detail: "A LARGE POPULATION of similar obligations, so use EXPECTED VALUE. Using the most likely outcome would give NIL, because 85% of units will have no defect — which is exactly why the population rule exists." },
            { label: "Compute the cost per unit", detail: "(12% × $20) + (3% × $150) = $2.40 + $4.50 = $6.90 a unit. The 85% contributes nothing." },
            { label: "Compute the provision", detail: "200,000 × $6.90 = $1,380,000." },
            { label: "Record it and note the presentation", detail: "Dr Warranty expense (cost of sales) $1,380,000; Cr Provision $1,380,000. The provision is current, since the warranty runs one year. Actual claims are charged against the provision, and the balance is remeasured at the next reporting date rather than simply rolled forward." },
          ],
          result:
            "**Provision $1,380,000.** The examinable decision is expected value for a population against most likely outcome for a single obligation — apply the wrong one and the answer is nil or wildly wrong.",
        },
        {
          kind: "example",
          title: "A decommissioning provision, and its unwinding",
          scenario:
            "Pintail Co brought a plant into use on 1 January 20X1 at a construction cost of $5,000,000. It is legally obliged to dismantle the plant and restore the site at the end of its ten-year life, at an estimated cost of $1,200,000. The appropriate discount rate is 8%; the ten-year discount factor at 8% is 0.463.",
          steps: [
            { label: "Recognise the provision at present value", detail: "$1,200,000 × 0.463 = $555,600. The obligation exists now — the plant has been built, which is the past event — even though the cash flows in ten years." },
            { label: "Add it to the cost of the asset", detail: "IAS 16 requires the initial estimate of dismantling and restoration to be included in cost: $5,000,000 + $555,600 = $5,555,600. Dr PPE $555,600; Cr Provision $555,600." },
            { label: "Depreciate the whole asset", detail: "$5,555,600 ÷ 10 = $555,560 a year. The decommissioning element is therefore expensed over the life of the plant through depreciation, which is the matching the treatment achieves." },
            { label: "Unwind the discount in year 1", detail: "$555,600 × 8% = $44,448, charged as a FINANCE COST — not as an additional decommissioning expense. The provision becomes $555,600 + $44,448 = $600,048." },
            { label: "Project the unwinding", detail: "The provision grows at 8% a year and reaches approximately $1,200,000 by the end of year 10, when the cash is paid. Any difference between the final provision and the actual cost is recognised in profit or loss at that point." },
            { label: "Note what happens if the estimate changes", detail: "A change in the estimated cost or the discount rate adjusts BOTH the provision and the carrying amount of the asset, prospectively. It is a change in estimate, not a restatement — and if the adjustment would reduce the asset below zero, the excess goes to profit or loss." },
          ],
          result:
            "**Provision $555,600 added to asset cost; depreciation $555,560 a year; a $44,448 finance cost in year 1.** Two marks are routinely lost by expensing the provision instead of capitalising it, and one more by classifying the unwinding as an operating expense.",
        },
      ],
      check: {
        q: "A decommissioning provision of $800,000 is recognised at present value at a discount rate of 6%. What is the effect in the following year?",
        options: [
          "A finance cost of $48,000, increasing the provision to $848,000",
          "An operating expense of $48,000",
          "No effect until the cash is paid",
          "A finance cost of $48,000 added to the cost of the asset",
        ],
        correct: 0,
        explain:
          "The unwinding of the discount is recognised as a finance cost in profit or loss and increases the provision. It is not an operating expense and it is not capitalised — only the INITIAL estimate is added to the asset's cost.",
      },
    },
    {
      id: "specific-applications",
      heading: "Restructuring, onerous contracts, and what may never be provided",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "Restructuring: the obligation arises on ANNOUNCEMENT, not on decision",
          md: "A restructuring provision requires a **detailed formal plan** identifying at least the business concerned, the principal locations affected, the location, function and approximate number of employees who will be compensated, the expenditure to be undertaken, and when the plan will be implemented — **AND** that the entity has raised a **valid expectation** in those affected that it will carry out the restructuring, by starting to implement it or announcing its main features to them.\n\nA board decision alone creates nothing, because the board can reverse it.\n\n**What may be included:** only direct expenditure necessarily entailed by the restructuring and not associated with the entity's ongoing activities.\n\n**What may NOT:** retraining or relocating continuing staff, marketing, and investment in new systems and distribution networks. These relate to the future conduct of the business, so provide for none of them.",
        },
        {
          kind: "example",
          title: "An onerous contract",
          scenario:
            "Garganey Co has a contract to supply 10,000 units at $8 each. Following a rise in input prices, the unavoidable cost of producing each unit is now $11. The contract permits Garganey to cancel on payment of a penalty of $22,000.",
          steps: [
            { label: "Establish that the contract is onerous", detail: "An onerous contract is one in which the unavoidable costs of meeting the obligations exceed the economic benefits expected. Costs $110,000 against revenue $80,000 — so yes." },
            { label: "Compute the cost of FULFILLING the contract", detail: "$110,000 − $80,000 = a net loss of $30,000." },
            { label: "Compute the cost of EXITING the contract", detail: "The penalty of $22,000." },
            { label: "Take the LEAST NET COST OF EXITING", detail: "IAS 37 measures the provision at the least net cost of exiting the contract, being the LOWER of the cost of fulfilling it and any compensation or penalties from failing to fulfil it. $22,000 is lower than $30,000, so the provision is $22,000." },
            { label: "Note the order of operations", detail: "Before recognising an onerous contract provision, any asset DEDICATED to the contract must first be tested for IMPAIRMENT under IAS 36. Providing for the loss while leaving a related asset overstated would double count the deficit." },
          ],
          result:
            "**Provision $22,000, not $30,000.** The provision is the least cost of getting out, and candidates who provide the full fulfilment loss overstate it whenever a cheaper exit exists.",
        },
        {
          kind: "list",
          title: "Never provided for",
          items: [
            "**Future operating losses.** No past event and no obligation — the entity could cease operating. Instead, test the related assets for impairment.",
            "**Future repairs and maintenance** on the entity's own assets. The entity can avoid them by disposing of the asset; the cost is dealt with through componentised depreciation.",
            "**General or 'big bath' provisions** with no specific obligation behind them, and provisions to smooth profits.",
            "**Staff retraining, relocation of continuing operations, marketing, or new systems** as part of a restructuring.",
            "A **board decision** that has not been announced or implemented."
          ],
        },
      ],
      check: {
        q: "An entity has a contract that will produce a loss of $50,000 if fulfilled. It can cancel on payment of a $35,000 penalty. What provision is recognised?",
        options: ["$35,000", "$50,000", "$85,000", "Nil — future losses are not provided for"],
        correct: 0,
        explain:
          "An onerous contract provision is measured at the least net cost of exiting the contract, being the lower of the cost of fulfilling it ($50,000) and the penalty for not fulfilling it ($35,000). Assets dedicated to the contract are tested for impairment first.",
      },
    },
    {
      id: "ias-10",
      heading: "IAS 10: events after the reporting period",
      blocks: [
        {
          kind: "definition",
          term: "Events after the reporting period",
          md: "Events, favourable or unfavourable, occurring between the end of the reporting period and the date the financial statements are **authorised for issue**. **ADJUSTING** events provide evidence of conditions that **existed AT** the end of the reporting period; **NON-ADJUSTING** events are indicative of conditions that **arose AFTER** it.",
        },
        {
          kind: "table",
          caption: "Classifying events after the reporting period",
          head: ["Event", "Classification", "Why"],
          rows: [
            ["A court case outstanding at the year end is settled after it", "**ADJUSTING**", "Confirms the amount of an obligation that already existed at the reporting date"],
            ["A customer who owed money at the year end goes into administration", "**ADJUSTING**", "Confirms the receivable was already impaired at the reporting date"],
            ["Inventory held at the year end is sold below cost", "**ADJUSTING**", "Provides evidence of its net realisable value at the reporting date"],
            ["Discovery of **fraud or error** showing the statements were misstated", "**ADJUSTING**", "The misstatement existed at the reporting date"],
            ["Determination after the year end of the cost of assets purchased, or proceeds of assets sold, before it", "**ADJUSTING**", "Confirms an amount already committed"],
            ["A **decline in market value of investments** after the year end", "**NON-ADJUSTING**", "Reflects conditions arising after the reporting date, not at it"],
            ["A **major business combination or disposal** after the year end", "**NON-ADJUSTING**", "A new transaction, not evidence about the old position"],
            ["Announcing a **plan to discontinue** an operation, or a restructuring", "**NON-ADJUSTING**", "The obligation arises after the reporting date"],
            ["**Destruction of a major asset** by fire after the year end", "**NON-ADJUSTING**", "The asset existed and was intact at the reporting date"],
            ["**Dividends declared** after the reporting period", "**NON-ADJUSTING** — and expressly so", "No obligation existed at the reporting date, so no liability is recognised. Disclose only"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two rules that override everything else in IAS 10",
          md: "**Dividends declared after the reporting period are never recognised as a liability.** IAS 10 says this explicitly. The entity had no obligation at the reporting date, because a dividend can be withdrawn until declared. Disclose the amount in the notes.\n\n**GOING CONCERN is different from everything else in the standard.** Where management determines after the reporting period that the entity will no longer be a going concern, the financial statements are NOT prepared on a going concern basis — even though the determination is a non-adjusting event by the usual test. IAS 10 treats this as so fundamental that the adjusting/non-adjusting analysis does not apply: the whole basis of preparation changes.\n\nBoth are two-mark Section A questions in waiting.",
        },
        {
          kind: "activity",
          title: "Adjust, disclose, or ignore?",
          prompt:
            "An entity's year end is 31 December 20X6 and the financial statements are authorised on 15 March 20X7. Deal with each:\n\n(i) On 20 January 20X7 a customer owing $180,000 at the year end went into liquidation; $20,000 is expected to be recovered.\n(ii) On 5 February 20X7 a fire destroyed a warehouse with a carrying amount of $2.4m.\n(iii) On 28 February 20X7 the directors declared a dividend of $500,000 for 20X6.\n(iv) On 10 March 20X7 the entity settled a legal claim outstanding at the year end for $340,000, against a provision of $250,000.\n(v) On 12 March 20X7 the entity's bank withdrew its facilities and the directors concluded the entity could not continue trading.",
          answer:
            "(i) ADJUSTING. The customer's financial condition at the year end is confirmed by the liquidation, so the receivable was already impaired. Write it down to $20,000, a further loss of $160,000.\n\n(ii) NON-ADJUSTING. The warehouse existed and was intact at 31 December. Do not write it down. Disclose the nature of the event and an estimate of its financial effect, because it is material.\n\n(iii) NON-ADJUSTING, and expressly so. No liability at 31 December, so no accrual. Disclose the $500,000 in the notes.\n\n(iv) ADJUSTING. The obligation existed at the year end and the settlement confirms its amount. Increase the provision to $340,000, charging a further $90,000.\n\n(v) The GOING CONCERN override. The financial statements are not prepared on a going concern basis, whatever the ordinary adjusting/non-adjusting analysis would say. Restate assets to realisable amounts, disclose the basis used and the reason.\n\nThe habit worth building: ask what CONDITION existed at the reporting date, not when the news arrived.",
        },
      ],
      check: {
        q: "After the reporting date but before authorisation, directors declare a dividend for the year just ended. What is the treatment?",
        options: [
          "Disclose in the notes; no liability is recognised",
          "Recognise a liability, since it relates to the year reported on",
          "Recognise it in equity as a deduction from retained earnings",
          "Recognise a liability only if the dividend has been paid before authorisation",
        ],
        correct: 0,
        explain:
          "IAS 10 states expressly that dividends declared after the reporting period are not recognised as a liability at the reporting date — no obligation existed then. The amount is disclosed in the notes.",
      },
    },
  ],
  examTraps: [
    { trap: "Providing for a restructuring on the basis of a board decision.", fix: "A detailed formal plan AND a valid expectation raised in those affected are both required." },
    { trap: "Including retraining, relocation, marketing or new systems in a restructuring provision.", fix: "Only direct expenditure necessarily entailed by the restructuring and not associated with ongoing activities." },
    { trap: "Providing for future operating losses or future repairs.", fix: "No past event and no unavoidable obligation. Test related assets for impairment instead, and use componentised depreciation for overhauls." },
    { trap: "Probability weighting a single obligation.", fix: "Expected value is for large populations. A single obligation uses the most likely outcome." },
    { trap: "Recognising a probable contingent asset.", fix: "A probable inflow is DISCLOSED; only a virtually certain inflow is recognised, and then it is no longer contingent." },
    { trap: "Disclosing a possible contingent asset.", fix: "A possible inflow gets no disclosure at all — unlike a possible outflow." },
    { trap: "Classifying the unwinding of a discount as an operating expense.", fix: "It is a finance cost." },
    { trap: "Providing the full fulfilment loss on an onerous contract where a cheaper exit exists.", fix: "The provision is the LOWER of the cost of fulfilling and the penalty for not fulfilling." },
    { trap: "Netting an expected reimbursement against a provision.", fix: "Recognise a separate asset, only when virtually certain, capped at the provision." },
    { trap: "Accruing a dividend declared after the reporting date.", fix: "Expressly prohibited by IAS 10. Disclose only." },
  ],
  keyTerms: [
    { term: "Provision", def: "A liability of uncertain timing or amount, recognised where a present obligation from a past event will probably require an outflow that can be reliably estimated." },
    { term: "Contingent liability", def: "A possible obligation from past events whose existence depends on an uncertain future event, or a present obligation not recognised because an outflow is not probable or cannot be reliably estimated. Disclosed, not recognised." },
    { term: "Contingent asset", def: "A possible asset arising from past events whose existence depends on an uncertain future event. Disclosed when probable; recognised only when virtually certain." },
    { term: "Constructive obligation", def: "An obligation deriving from an entity's own actions — an established pattern of practice, published policy or specific statement — that has created a valid expectation it will discharge the responsibility." },
    { term: "Onerous contract", def: "A contract in which the unavoidable costs of meeting the obligations exceed the economic benefits expected; provided at the least net cost of exiting." },
    { term: "Adjusting event", def: "An event after the reporting period providing evidence of conditions that existed at the end of the reporting period; the statements are adjusted." },
    { term: "Non-adjusting event", def: "An event indicative of conditions arising after the reporting period; disclosed where material, but the statements are not adjusted." },
  ],
  summary: [
    "A provision needs a present obligation from a past event, a probable outflow, and a reliable estimate — all three.",
    "Probable outflow → provide. Possible → disclose. Remote → nothing. For inflows: virtually certain → recognise, probable → disclose, possible → nothing.",
    "Large populations use expected value; single obligations use the most likely outcome.",
    "Discount where material; the unwinding is a FINANCE COST.",
    "A restructuring obligation arises on announcement or implementation, not on the board's decision, and excludes retraining, relocation, marketing and new systems.",
    "An onerous contract is provided at the LOWER of the cost of fulfilling and the exit penalty, after impairing dedicated assets.",
    "Never provide for future operating losses, future repairs, or general 'big bath' amounts.",
    "IAS 10: adjust for conditions that EXISTED at the reporting date; disclose events reflecting later conditions. Dividends declared later are never accrued, and a going concern failure overrides the whole classification.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three criteria for a provision.", a: "A present obligation from a past event, a probable outflow of resources, and the ability to make a reliable estimate." },
    { q: "How is a probable contingent asset treated?", a: "Disclosed. It is recognised only when the inflow becomes virtually certain." },
    { q: "When does a restructuring obligation arise?", a: "When there is a detailed formal plan and the entity has raised a valid expectation in those affected by announcing its main features or starting to implement it." },
    { q: "How is an onerous contract provision measured?", a: "At the least net cost of exiting — the lower of the cost of fulfilling the contract and any penalty for failing to fulfil it." },
    { q: "Where does the unwinding of a discounted provision go?", a: "To finance costs in profit or loss." },
    { q: "Is a dividend declared after the reporting date accrued?", a: "No. IAS 10 expressly prohibits it; the amount is disclosed." },
    { q: "What overrides the adjusting/non-adjusting analysis in IAS 10?", a: "A determination that the entity is no longer a going concern — the whole basis of preparation changes." },
  ],
  furtherStudy: [
    "Chapter 3 — the 'no practical ability to avoid' test that underpins every provision question",
    "Chapter 7 — the decommissioning cost that IAS 16 adds to the asset and IAS 37 provides for",
    "Chapter 16 — assurance-type warranties, which are IAS 37 provisions rather than IFRS 15 obligations",
  ],
}

export const FR_TREE_18: StudyChapter = {
  id: "FR-18",
  number: 18,
  paper: "FR",
  area: "B",
  title: "Financial instruments: liabilities, equity and compound instruments",
  minutes: 19,
  syllabusRefs: ["B5(a)", "B5(b)", "B5(c)"],
  intro:
    "Whether an instrument is debt or equity is decided by one question, and the answer moves gearing by more than any other judgement in the paper.",
  outcomes: [
    "Apply the IAS 32 definitions to classify an instrument as a liability or as equity",
    "Classify preference shares correctly according to their terms",
    "Measure a financial liability at amortised cost using the effective interest rate",
    "Split a convertible instrument between its liability and equity components",
    "Explain the effect of the classification on gearing and interest cover",
  ],
  sections: [
    {
      id: "debt-or-equity",
      heading: "The classification question",
      blocks: [
        {
          kind: "definition",
          term: "Financial liability and equity instrument (IAS 32)",
          md: "A **financial liability** is a contractual obligation to deliver cash or another financial asset to another entity, or to exchange financial assets or liabilities on potentially unfavourable terms.\n\nAn **equity instrument** is any contract evidencing a **residual interest** in the assets of an entity after deducting all its liabilities.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "One question decides it",
          md: "**Does the entity have an unavoidable contractual obligation to deliver cash?**\n\nIf yes → **LIABILITY**. If the entity can avoid it — because payment is at its discretion — → **EQUITY**.\n\nNothing else matters. Not the instrument's legal name, not its label in the articles, not the fact that it is called a \"share\". IAS 32 looks at substance, and a share that must be redeemed for cash is a liability while a perpetual bond with fully discretionary interest is closer to equity.",
        },
        {
          kind: "table",
          caption: "Applying the test",
          head: ["Instrument", "Classification", "Reason"],
          rows: [
            ["Ordinary shares", "**EQUITY**", "No obligation to deliver cash. Dividends are discretionary"],
            ["**REDEEMABLE** preference shares", "**LIABILITY**", "The entity must repay the capital — an unavoidable obligation. The 'dividend' is presented as a FINANCE COST"],
            ["**IRREDEEMABLE** preference shares with a discretionary dividend", "**EQUITY**", "No obligation to repay and none to pay a dividend"],
            ["**IRREDEEMABLE** preference shares with a **CUMULATIVE, mandatory** dividend", "**LIABILITY**", "The obligation to pay the dividend stream is unavoidable, even though the capital is never repaid. The liability is the present value of the perpetual dividend"],
            ["A bond redeemable at par", "**LIABILITY**", "Obligation to deliver cash"],
            ["Shares redeemable **at the HOLDER's option**", "**LIABILITY**", "The entity cannot avoid the obligation, because the choice is not its own"],
            ["Shares redeemable **at the ISSUER's option**", "**EQUITY**", "The entity can avoid redemption, so no obligation exists"],
          ],
        },
        {
          kind: "illustration",
          title: "The same money, two gearing ratios",
          md: "An entity with $10m of ordinary equity raises a further $5m.\n\nIf it issues **irredeemable preference shares with a discretionary dividend**, equity becomes $15m, debt stays at nil, and gearing (debt ÷ equity) is 0%.\n\nIf it issues **redeemable preference shares** on otherwise identical commercial terms, equity stays at $10m, debt becomes $5m, and gearing is 50%.\n\nThe cash raised is the same, the cost of it is similar, and the entity's operations are unchanged. But the second version reports 50% gearing, a finance cost in profit or loss that reduces profit, and interest cover where the first has none. Any covenant expressed in terms of gearing is engaged by one and not the other.\n\nThis is why the classification is examined in Section C interpretation requirements, and why 'redeemable' is the single most important word in a question about preference shares."
        },
      ],
      check: {
        q: "An entity issues irredeemable preference shares carrying a mandatory cumulative dividend of 6%. How are they classified?",
        options: [
          "A financial liability, because the obligation to pay the dividend cannot be avoided",
          "Equity, because the shares are irredeemable so no capital is repayable",
          "Split between liability and equity components",
          "Equity, with the dividend presented as a distribution",
        ],
        correct: 0,
        explain:
          "Irredeemability removes the obligation to repay capital, but a mandatory cumulative dividend is itself an unavoidable obligation to deliver cash. The instrument is a liability measured at the present value of the dividend stream, and the dividend is a finance cost.",
      },
    },
    {
      id: "amortised-cost",
      heading: "Measuring a financial liability at amortised cost",
      blocks: [
        {
          kind: "text",
          md: "Financial liabilities are measured at **amortised cost** unless designated at fair value through profit or loss. Amortised cost spreads the **total** finance cost of the instrument — the coupon, the issue costs and any premium on redemption — over its life at a constant rate on the carrying amount.",
        },
        {
          kind: "formula",
          name: "Amortised cost",
          expr: "INITIAL MEASUREMENT  =  fair value (normally net proceeds)\n                          LESS transaction costs\n\nEACH PERIOD:\n\n   Opening carrying amount\n   +  finance cost at the EFFECTIVE INTEREST RATE\n   −  cash interest actually paid (the coupon)\n   =  Closing carrying amount\n\nThe closing balance in the final period equals the amount repayable.\n\nEFFECTIVE INTEREST RATE = the rate that discounts the expected cash\nflows to the initial carrying amount. In FR it is always GIVEN.",
          note: "Note that issue costs are DEDUCTED from the liability, not capitalised as an asset and not expensed. They are recovered through a higher effective rate over the instrument's life.",
        },
        {
          kind: "example",
          title: "A bond issued at a discount with issue costs",
          scenario:
            "Pochard Co issued a bond with a nominal value of $10,000,000, redeemable at par in three years. It received net proceeds of $9,000,000 after issue costs. The coupon is 5% a year, paid annually in arrears. The effective interest rate is 8.95%.",
          steps: [
            { label: "Recognise the liability at net proceeds", detail: "$9,000,000. Not $10,000,000 — the nominal value is what is repayable, not what was received. Issue costs are already deducted." },
            { label: "Identify the cash coupon", detail: "$10,000,000 × 5% = $500,000 a year. The coupon is always computed on NOMINAL value, and the effective rate is always applied to the CARRYING amount. Mixing them up is the classic error." },
            { label: "Build the table", detail: "\n  Year  Opening      Finance cost   Coupon paid   Closing\n         (× 8.95%)\n   1    9,000,000       805,500       (500,000)   9,305,500\n   2    9,305,500       832,842       (500,000)   9,638,342\n   3    9,638,342       862,632       (500,000)  10,000,974\n\nThe closing balance of $10,000,974 is $974 above the $10,000,000 repayable — rounding from the two-decimal effective rate. Expected, and not an error." },
            { label: "Reconcile the total finance cost", detail: "$805,500 + $832,842 + $862,632 = $2,500,974, against cash coupons of $1,500,000. The $1,000,000 difference is the discount and issue costs, spread over the three years — which is exactly what amortised cost is for." },
            { label: "State the presentation", detail: "Profit or loss bears the EFFECTIVE finance cost, not the coupon: $805,500 in year 1, not $500,000. The liability is split between current and non-current, with the current portion being the amount repayable within twelve months — nil here until year 3, when the whole $10,000,000 becomes current." },
          ],
          result:
            "**Finance cost $805,500 in year 1, and a liability of $9,305,500.** Charging the $500,000 coupon and carrying the liability at $10,000,000 understates the finance cost by $305,500 and overstates the liability by $694,500.",
        },
      ],
      check: {
        q: "A bond with a nominal value of $5m and a 4% coupon is issued for net proceeds of $4.6m. The effective rate is 7%. What is the finance cost in year 1 and the closing liability?",
        options: [
          "Finance cost $322,000; liability $4,722,000",
          "Finance cost $200,000; liability $4,600,000",
          "Finance cost $350,000; liability $4,750,000",
          "Finance cost $322,000; liability $5,000,000",
        ],
        correct: 0,
        explain:
          "The finance cost is the effective rate on the carrying amount: $4,600,000 × 7% = $322,000. The coupon paid is $5,000,000 × 4% = $200,000. Closing liability is $4,600,000 + $322,000 − $200,000 = $4,722,000.",
      },
    },
    {
      id: "compound",
      heading: "Compound instruments: splitting a convertible",
      blocks: [
        {
          kind: "text",
          md: "A **convertible bond** gives the holder a choice: take cash on redemption, or convert into a fixed number of shares. It therefore contains **both** a financial liability and an equity instrument, and IAS 32 requires the two to be **presented separately**.",
        },
        {
          kind: "formula",
          name: "The residual method",
          expr: "STEP 1   Measure the LIABILITY component:\n            the present value of the cash flows the entity would\n            have to pay if NOBODY converted — the coupons and the\n            redemption amount — discounted at the market rate for\n            SIMILAR DEBT WITHOUT the conversion option\n\nSTEP 2   The EQUITY component is the RESIDUAL:\n            total proceeds  −  liability component\n\nThe equity component is NOT remeasured, ever. It stays at its\ninitial amount in equity whether or not conversion occurs.",
          note: "Always the liability first and equity as the residual — never the other way round. The equity component has no observable value of its own, which is exactly why it is the residual.",
        },
        {
          kind: "example",
          title: "Splitting a convertible bond",
          scenario:
            "Shoveler Co issued $10,000,000 of 5% convertible bonds at par on 1 January 20X1. They are redeemable at par after three years or convertible into ordinary shares at the holder's option. The market rate for similar bonds without the conversion option is 9%. The three-year annuity factor at 9% is 2.531 and the three-year discount factor at 9% is 0.772.",
          steps: [
            { label: "Compute the cash flows if nobody converts", detail: "Interest of $10,000,000 × 5% = $500,000 in each of three years, plus $10,000,000 repayable at the end of year 3." },
            { label: "Discount them at the rate for similar debt WITHOUT the option", detail: "Interest: $500,000 × 2.531 = $1,265,500.\nPrincipal: $10,000,000 × 0.772 = $7,720,000.\nLiability component = $1,265,500 + $7,720,000 = $8,985,500.\nNote the 9% rate is used, not the 5% coupon — the coupon is low precisely BECAUSE of the conversion option, so discounting at 5% would value the option at nil." },
            { label: "Take the equity component as the residual", detail: "$10,000,000 − $8,985,500 = $1,014,500, credited to equity as 'other components of equity' or a convertible option reserve. It is never remeasured." },
            { label: "Build the liability table", detail: "\n  Year  Opening      Finance cost   Coupon      Closing\n         (× 9%)\n   1    8,985,500       808,695     (500,000)   9,294,195\n   2    9,294,195       836,478     (500,000)   9,630,673\n   3    9,630,673       866,761     (500,000)   9,997,433\n\nThe closing $9,997,433 approaches the $10,000,000 redeemable, the $2,567 difference being rounding from the three-decimal table factors." },
            { label: "Note what happens on conversion or redemption", detail: "If holders CONVERT, the liability balance and the equity component are both transferred to share capital and share premium; no gain or loss arises. If holders take CASH, the liability is settled and the equity component simply remains in equity — it is not released to profit or loss." },
            { label: "Note the effect that makes this examinable", detail: "The split reduces reported debt by $1,014,500 and increases equity by the same, so gearing improves on both numerator and denominator. It also increases the annual finance cost from the $500,000 coupon to $808,695, cutting profit. Treating the whole $10,000,000 as debt is the common error and moves gearing materially." },
          ],
          result:
            "**Liability $8,985,500 and equity $1,014,500; year 1 finance cost $808,695.** Three separate marks: using the non-convertible market rate, taking equity as the residual, and charging the effective rather than the coupon interest.",
        },
      ],
      check: {
        q: "An entity issues $8m of convertible bonds at par. The present value of the cash flows, discounted at the rate for similar non-convertible debt, is $7.1m. What is credited to equity?",
        options: ["$900,000", "$8,000,000", "Nil — the whole instrument is a liability until conversion", "$7,100,000"],
        correct: 0,
        explain:
          "The liability component is measured first at $7.1m, and the equity component is the residual: $8,000,000 − $7,100,000 = $900,000. It is credited to equity and is never remeasured, whether or not conversion occurs.",
      },
    },
  ],
  examTraps: [
    { trap: "Classifying preference shares by their name rather than their terms.", fix: "Redeemable, or carrying a mandatory dividend, means a LIABILITY. Look for 'redeemable' and for 'cumulative and mandatory'." },
    { trap: "Presenting a redeemable preference dividend as a distribution.", fix: "It is a FINANCE COST in profit or loss, because the instrument is a liability." },
    { trap: "Treating shares redeemable at the holder's option as equity.", fix: "The entity cannot avoid the obligation when the choice belongs to the holder, so it is a liability." },
    { trap: "Applying the coupon rate to the carrying amount, or the effective rate to nominal value.", fix: "Coupon on NOMINAL; effective rate on CARRYING AMOUNT." },
    { trap: "Recognising issue costs as an asset or as an immediate expense.", fix: "They are deducted from the initial liability and recovered through a higher effective rate." },
    { trap: "Discounting a convertible's cash flows at the coupon rate.", fix: "Use the market rate for SIMILAR DEBT WITHOUT the conversion option. The coupon is low because of the option." },
    { trap: "Computing the equity component directly and the liability as the residual.", fix: "Liability first, equity as the residual." },
    { trap: "Remeasuring or releasing the equity component.", fix: "It is never remeasured, and on redemption for cash it simply stays in equity." },
  ],
  keyTerms: [
    { term: "Financial liability", def: "A contractual obligation to deliver cash or another financial asset, or to exchange financial instruments on potentially unfavourable terms." },
    { term: "Equity instrument", def: "A contract evidencing a residual interest in the assets of an entity after deducting all of its liabilities." },
    { term: "Amortised cost", def: "The initial amount, adjusted for the effective interest charged and the cash paid, so that the total finance cost is spread at a constant rate over the instrument's life." },
    { term: "Effective interest rate", def: "The rate that exactly discounts the expected cash flows to the initial carrying amount of the instrument." },
    { term: "Compound instrument", def: "A financial instrument containing both a liability and an equity component, such as a convertible bond, which must be presented separately." },
    { term: "Residual method", def: "Measuring a compound instrument's liability component at the present value of its cash flows using the rate for similar non-convertible debt, and taking the equity component as the balance of the proceeds." },
  ],
  summary: [
    "One test: does the entity have an unavoidable contractual obligation to deliver cash? Yes → liability; no → equity.",
    "Redeemable preference shares, and irredeemable ones with a mandatory cumulative dividend, are LIABILITIES — and the dividend is a finance cost.",
    "Redeemable at the holder's option → liability. At the issuer's option → equity.",
    "Financial liabilities are at amortised cost: opening balance + effective interest − coupon paid.",
    "The coupon is computed on nominal value; the effective rate is applied to the carrying amount. Issue costs are deducted from the liability.",
    "A convertible is split: liability at the present value of the cash flows discounted at the rate for similar NON-convertible debt, equity as the residual.",
    "The equity component is never remeasured, and it stays in equity even if holders take cash.",
    "The classification moves gearing, interest cover and profit — which is why it is examined in interpretation questions as well as in preparation ones.",
  ],
  knowledgeDiagnostic: [
    { q: "What single question determines whether an instrument is debt or equity?", a: "Whether the entity has an unavoidable contractual obligation to deliver cash or another financial asset." },
    { q: "How are redeemable preference shares and their dividends presented?", a: "As a financial liability, with the dividend as a finance cost in profit or loss." },
    { q: "On what amount is the coupon computed, and on what amount the effective interest?", a: "The coupon on nominal value; the effective interest on the carrying amount." },
    { q: "How are issue costs on a bond treated?", a: "Deducted from the initial carrying amount of the liability and recovered through a higher effective interest rate." },
    { q: "Which rate is used to measure a convertible's liability component?", a: "The market rate for similar debt WITHOUT the conversion option." },
    { q: "What happens to the equity component of a convertible if holders take cash instead of shares?", a: "Nothing — it remains in equity. It is never remeasured and never released to profit or loss." },
  ],
  furtherStudy: [
    "Chapter 19 — the financial ASSET side of IFRS 9, and expected credit losses",
    "Chapter 30 — gearing and interest cover, the ratios this classification moves",
    "Chapter 24 — where each component appears in the statement of financial position and the statement of changes in equity",
  ],
}
