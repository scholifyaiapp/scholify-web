import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 9 and 10.
 *
 * Chapter 9 puts three standards together — IAS 40, IAS 20 and IAS 23 — and that is a
 * deliberate grouping rather than a convenience. All three answer the same question from
 * different angles: what happens to the carrying amount of a non-current asset when
 * something OTHER than a purchase changes it. A change of use (IAS 40), a contribution
 * from government (IAS 20), or the cost of financing its construction (IAS 23). Taught
 * together, the transfers and the netting choices reinforce each other.
 *
 * Chapter 10 is IAS 38 alone, because the recognition analysis for an intangible is the
 * hardest reasoning in Area B and the one most often answered by assertion.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_09: StudyChapter = {
  id: "FR-09",
  number: 9,
  paper: "FR",
  area: "B",
  title: "Investment property, government grants and borrowing costs",
  minutes: 20,
  syllabusRefs: ["B1(h)", "B1(i)", "B10(a)", "B10(b)"],
  intro:
    "Three standards that change the carrying amount of a non-current asset for reasons other than buying it.",
  outcomes: [
    "Distinguish investment property from owner-occupied property and from inventory",
    "Apply the fair value and cost models under IAS 40, and account for a transfer between categories",
    "Account for a government grant under both permitted presentations, and on repayment",
    "Identify a qualifying asset and determine the period over which borrowing costs are capitalised",
    "Compute capitalised borrowing costs on specific and on general borrowings",
  ],
  sections: [
    {
      id: "investment-property",
      heading: "IAS 40: investment property",
      blocks: [
        {
          kind: "definition",
          term: "Investment property",
          md: "Property — land or a building, or part of a building, or both — held to earn **rentals** or for **capital appreciation** or both, rather than for use in the production or supply of goods or services or for administrative purposes, or for sale in the ordinary course of business.",
        },
        {
          kind: "table",
          caption: "Which standard applies to a property",
          head: ["The property is…", "Standard", "Measurement"],
          rows: [
            ["Occupied by the entity for its own operations or administration", "**IAS 16**", "Cost model or revaluation model"],
            ["Held to earn rentals from third parties, or for capital appreciation", "**IAS 40**", "Cost model or **fair value model** — and the choice matters"],
            ["Being constructed for future use as investment property", "**IAS 40**", "Once complete or during construction, as investment property"],
            ["Held for sale in the ordinary course of business (a developer's stock)", "**IAS 2**", "Lower of cost and net realisable value"],
            ["Leased out to another group company, in the CONSOLIDATED statements", "**IAS 16**", "It is owner-occupied from the single economic entity's point of view — a favourite trap"],
            ["Leased out to another group company, in the LESSOR's OWN statements", "**IAS 40**", "In its individual statements the tenant is a third party"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The intra-group letting trap",
          md: "A parent owns a building and lets it to its subsidiary. In the **parent's individual** financial statements this is investment property, because the tenant is a separate legal entity paying rent.\n\nIn the **consolidated** financial statements it is **owner-occupied property under IAS 16**, because the single economic entity concept means the group is occupying its own building. The rental income and expense are eliminated as an intra-group transaction, and any fair value gains previously recognised must come out.\n\nThis is examined regularly and it costs two marks each time. Read whose statements the question is asking about.",
        },
        {
          kind: "list",
          title: "The two models, and the asymmetry between them",
          items: [
            "**FAIR VALUE MODEL.** Remeasure to fair value at each reporting date. Gains and losses go to **PROFIT OR LOSS** — not to OCI, which is the difference from the IAS 16 revaluation model. **No depreciation is charged**, because the asset is not being consumed in the entity's operations; its value is the point.",
            "**COST MODEL.** Cost less accumulated depreciation and impairment, exactly as IAS 16. The fair value must still be **DISCLOSED**, so a user can see what the model is hiding.",
            "The choice is an **accounting policy applied to ALL investment property**, not property by property.",
            "An entity that chooses the fair value model must apply it until disposal, even if comparable market transactions become less frequent — it may not switch models to avoid a fall.",
          ],
        },
        {
          kind: "example",
          title: "The fair value model against the cost model",
          scenario:
            "Osprey Co bought a city-centre building on 1 January 20X4 for $3,000,000 and immediately let it to unconnected tenants. Its fair value was $3,400,000 at 31 December 20X4 and $3,150,000 at 31 December 20X5. Had the building been depreciated, a 40-year life with no residual value would have applied.",
          steps: [
            { label: "Under the FAIR VALUE model — 20X4", detail: "Remeasure from $3,000,000 to $3,400,000. Gain of $400,000 in PROFIT OR LOSS. No depreciation is charged at all." },
            { label: "Under the FAIR VALUE model — 20X5", detail: "Remeasure from $3,400,000 to $3,150,000. Loss of $250,000 in PROFIT OR LOSS. There is no revaluation surplus to absorb it — that mechanism belongs to IAS 16, not IAS 40." },
            { label: "Under the COST model — both years", detail: "Depreciation $3,000,000 ÷ 40 = $75,000 a year. Carrying amount at 31 December 20X5 is $3,000,000 − $150,000 = $2,850,000, with the fair value of $3,150,000 disclosed." },
            { label: "Compare the effect on reported profit", detail: "Fair value model: +$400,000 then −$250,000, and no depreciation. Cost model: −$75,000 in each year. Over the two years the fair value model reports $150,000 of net gains against $150,000 of charges under the cost model — a $300,000 swing on identical facts, and it is entirely a policy choice." },
            { label: "Note the volatility point", detail: "The fair value model puts property market movements straight into earnings. That is more relevant for an entity whose business IS holding property, and it is why an interpretation question comparing two property companies must establish which model each uses before comparing profit." },
          ],
          result:
            "**A $300,000 difference in cumulative reported profit from the same building.** The examinable facts are that fair value changes go to profit or loss and that no depreciation is charged under the fair value model.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Transfers between categories",
          md: "A transfer is made only when there is a **CHANGE OF USE**. Management's intention alone is not enough — there must be evidence, such as the end of owner occupation or the commencement of an operating lease to a third party.\n\n**Owner-occupied (IAS 16) → investment property at fair value.** Apply IAS 16 up to the date of change, then treat the difference between carrying amount and fair value at that date as a **REVALUATION under IAS 16** — so it goes to OCI, not profit. The instinct to put it in profit because the asset is about to be measured through profit is wrong.\n\n**Investment property at fair value → owner-occupied.** The fair value at the date of change becomes the **deemed cost** for IAS 16 going forward.\n\n**Inventory → investment property at fair value.** The difference goes to **PROFIT OR LOSS**, because inventory has always been measured through profit.",
        },
      ],
      check: {
        q: "A parent lets a building to its wholly owned subsidiary at a market rent. How is the building classified in the CONSOLIDATED financial statements?",
        options: [
          "Owner-occupied property under IAS 16",
          "Investment property under IAS 40, at fair value or cost",
          "Investment property under IAS 40, but only if the fair value model is used",
          "Inventory under IAS 2, since it generates trading income",
        ],
        correct: 0,
        explain:
          "Under the single economic entity concept the group occupies its own building, so it is owner-occupied property under IAS 16 in the consolidated statements, and the intra-group rent is eliminated. In the parent's own individual statements it would be investment property, because there the subsidiary is a separate legal entity.",
      },
    },
    {
      id: "government-grants",
      heading: "IAS 20: government grants",
      blocks: [
        {
          kind: "text",
          md: "IAS 20 rests on a single principle: **grants are recognised in profit or loss on a systematic basis over the periods in which the entity recognises the related costs**. Grants are never credited straight to equity, and they are not recognised on receipt of cash if the conditions have not yet been met.",
        },
        {
          kind: "list",
          title: "Recognition, and the two categories",
          items: [
            "**Recognise only when there is reasonable assurance** that the entity will comply with the conditions attached and that the grant will be received. Cash received in advance of that assurance is a liability.",
            "**Grants related to INCOME** — towards revenue expenditure such as wages or training. Recognised in profit or loss over the periods the related costs are incurred, either as other income or as a deduction from the related expense.",
            "**Grants related to ASSETS** — towards the purchase or construction of a non-current asset. Recognised over the asset's useful life, matching the depreciation.",
            "A grant that becomes **repayable** is a change in accounting **estimate**, applied prospectively — not the correction of an error.",
          ],
        },
        {
          kind: "example",
          title: "One grant, two presentations, one profit",
          scenario:
            "Merlin Co received a government grant of $600,000 towards a machine costing $2,400,000. The machine has an eight-year useful life, no residual value, and is depreciated on the straight line basis. Show both permitted presentations for the first year.",
          steps: [
            { label: "Presentation 1 — DEFERRED INCOME", detail: "Carry the machine at its full cost of $2,400,000 and recognise the grant as deferred income of $600,000, split between current and non-current liabilities. Depreciation is $2,400,000 ÷ 8 = $300,000. The grant is released to profit at $600,000 ÷ 8 = $75,000 a year, presented as other income or netted against the depreciation charge." },
            { label: "Presentation 2 — NETTING AGAINST THE ASSET", detail: "Deduct the grant from the cost of the asset: $2,400,000 − $600,000 = $1,800,000. Depreciation is then $1,800,000 ÷ 8 = $225,000 a year. There is no deferred income balance." },
            { label: "Compare the effect on profit", detail: "Presentation 1: $300,000 charge less $75,000 credit = a net $225,000 against profit. Presentation 2: a $225,000 charge. IDENTICAL. The presentations differ only in what appears on the face of the statements." },
            { label: "Compare the effect on the statement of financial position", detail: "Presentation 1 shows PPE of $2,100,000 and deferred income of $525,000 after one year. Presentation 2 shows PPE of $1,575,000 and no liability. Total equity is the same, but gross assets, total liabilities and therefore gearing are NOT — which is exactly why the choice matters to a user even though profit is unaffected." },
            { label: "Now assume the grant becomes repayable at the start of year 3", detail: "Under presentation 1 the deferred income balance is $600,000 − (2 × $75,000) = $450,000. Repaying $600,000 clears that balance and charges the remaining $150,000 to profit or loss immediately. Under presentation 2 the asset's carrying amount is increased by $600,000 and the cumulative extra depreciation of $150,000 is charged to profit at once. Same $150,000 charge either way." },
          ],
          result:
            "**Profit is identical under both presentations; the balance sheet is not.** The examinable content is (i) that both presentations are permitted, (ii) that the net effect on profit is the same, and (iii) that repayment is a prospective change in estimate with a catch-up charge, not a restatement.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The gearing angle",
          md: "Because the deferred income presentation creates a liability and the netting presentation does not, two identical entities can report materially different gearing. If a Section C requirement asks you to compare two entities' gearing, and one has grant-funded assets, say so — it is a limitation of the comparison and it earns a mark that most candidates miss.",
        },
      ],
      check: {
        q: "An entity receives a $400,000 grant towards an asset costing $1,600,000 with a ten-year life. It uses the deferred income presentation. What is the net charge to profit in year 1?",
        options: ["$120,000", "$160,000", "$40,000", "$200,000"],
        correct: 0,
        explain:
          "Depreciation is $1,600,000 ÷ 10 = $160,000, and the grant is released at $400,000 ÷ 10 = $40,000. The net charge is $120,000 — the same as the $1,200,000 ÷ 10 that the netting presentation would produce.",
      },
    },
    {
      id: "borrowing-costs",
      heading: "IAS 23: borrowing costs",
      blocks: [
        {
          kind: "definition",
          term: "Qualifying asset",
          md: "An asset that **necessarily takes a substantial period of time** to get ready for its intended use or sale. Borrowing costs directly attributable to its acquisition, construction or production **MUST** be capitalised — this is a requirement, not a choice.",
        },
        {
          kind: "list",
          title: "What is NOT a qualifying asset",
          items: [
            "Assets **ready for their intended use when acquired** — a machine bought off the shelf, however expensive.",
            "Assets measured at **FAIR VALUE**, such as investment property under the fair value model or a biological asset. Capitalising interest into an asset that is then remeasured to fair value achieves nothing.",
            "**Inventories that are manufactured, or otherwise produced, over a short period** — routine production runs.",
            "Note the corollary: inventories that DO take a substantial period, such as maturing whisky or a long-cycle construction contract, can be qualifying assets."
          ],
        },
        {
          kind: "formula",
          name: "The capitalisation period",
          expr: "CAPITALISATION BEGINS on the date all THREE are satisfied:\n   ·  expenditure on the asset is being incurred\n   ·  borrowing costs are being incurred\n   ·  activities necessary to prepare the asset are IN PROGRESS\n\nCAPITALISATION IS SUSPENDED during EXTENDED PERIODS in which\nactive development is interrupted.\n   ·  a technical or administrative delay, or high water levels that\n      routinely delay construction in that region, do NOT suspend it\n\nCAPITALISATION CEASES when substantially all the activities\nnecessary to prepare the asset are complete.\n   ·  not when the asset is actually brought into use\n   ·  minor outstanding work such as decoration does not delay cessation",
          note: "Most marks in an IAS 23 question come from the PERIOD, not the rate. Read the dates before touching the arithmetic.",
        },
        {
          kind: "example",
          title: "Specific borrowings, with the investment income trap",
          scenario:
            "Harrier Co borrowed $4,000,000 on 1 January 20X6 at 7% a year, specifically to build a new warehouse. Site clearance and construction began on 1 March 20X6 and the warehouse was substantially complete on 30 November 20X6. Until construction began the funds were held on deposit, earning interest of $30,000. The year end is 31 December 20X6.",
          steps: [
            { label: "Identify the capitalisation period", detail: "Borrowing costs are incurred from 1 January, but activities are not in progress until 1 March. Capitalisation runs 1 March to 30 November — NINE months. It ends when construction is substantially complete, not at the year end." },
            { label: "Compute the borrowing cost to capitalise", detail: "$4,000,000 × 7% × 9/12 = $210,000." },
            { label: "Deal with the investment income", detail: "IAS 23 requires investment income on the temporary investment of specific borrowings to be DEDUCTED from the amount capitalised — but only income earned DURING the capitalisation period. The $30,000 was earned in January and February, before capitalisation began, so it is NOT deducted. It is investment income in profit or loss." },
            { label: "Compute the interest expensed", detail: "Total interest for the year is $4,000,000 × 7% = $280,000. Of this, $210,000 is capitalised, so $70,000 is charged to profit or loss — the two months before construction began and the one month after completion. Check: 3 months × $4,000,000 × 7% ÷ 12 = $70,000." },
            { label: "State the effect", detail: "Warehouse cost includes $210,000 of interest; profit or loss bears a $70,000 finance cost and shows $30,000 of investment income. Capitalising the full $280,000 — the commonest error — would overstate the asset by $70,000 and overstate profit by the same amount." },
          ],
          result:
            "**Capitalise $210,000; expense $70,000; recognise $30,000 as investment income.** The two decisions that carry the marks are the nine-month period and the refusal to net off income earned outside it.",
        },
        {
          kind: "example",
          title: "General borrowings",
          scenario:
            "Falcon Co has no borrowings specific to its projects. Its general borrowings throughout 20X7 were a $5,000,000 loan at 8% and a $3,000,000 loan at 6%. It spent $2,000,000 on 1 April 20X7 constructing a qualifying asset, and construction continued to 31 December 20X7.",
          steps: [
            { label: "Compute the capitalisation rate", detail: "The weighted average of the rates on general borrowings outstanding during the period: (($5,000,000 × 8%) + ($3,000,000 × 6%)) ÷ $8,000,000 = ($400,000 + $180,000) ÷ $8,000,000 = 7.25%." },
            { label: "Identify the expenditure and the period", detail: "$2,000,000 from 1 April, so nine months of the year." },
            { label: "Compute the amount to capitalise", detail: "$2,000,000 × 7.25% × 9/12 = $108,750." },
            { label: "Apply the cap", detail: "The amount capitalised may not exceed the total borrowing costs actually incurred in the period — here $580,000, so the cap does not bite. This limit matters where an entity's borrowings are small relative to the expenditure on the asset." },
            { label: "Note the difference from specific borrowings", detail: "With general borrowings the rate is applied to the EXPENDITURE on the asset, not to a loan balance, and investment income is not deducted — there is no identifiable borrowing temporarily on deposit." },
          ],
          result:
            "**Capitalise $108,750.** The remaining interest is expensed. The two mechanics to keep separate: specific borrowings use the loan and deduct qualifying investment income; general borrowings apply a weighted average rate to the expenditure.",
        },
      ],
      check: {
        q: "An entity borrows specifically to construct a factory. Construction is substantially complete on 31 October, but the factory is not brought into use until 1 February. When does capitalisation of borrowing costs cease?",
        options: [
          "31 October, when substantially all activities necessary to prepare the asset are complete",
          "1 February, when the asset is brought into use",
          "At the reporting date, if that falls between the two",
          "When the loan is repaid",
        ],
        correct: 0,
        explain:
          "Capitalisation ceases when substantially all the activities necessary to prepare the asset for its intended use are complete — 31 October. The delay in bringing it into use is irrelevant, and interest from 1 November is expensed.",
      },
    },
  ],
  examTraps: [
    { trap: "Classifying an intra-group letting as investment property in the consolidated statements.", fix: "The group occupies its own building, so IAS 16 applies on consolidation. It is investment property only in the lessor's individual statements." },
    { trap: "Taking an IAS 40 fair value movement to other comprehensive income.", fix: "It goes to PROFIT OR LOSS. The OCI treatment belongs to the IAS 16 revaluation model." },
    { trap: "Depreciating investment property held at fair value.", fix: "No depreciation is charged. Under the cost model it is, and fair value must then be disclosed." },
    { trap: "Taking the uplift on transfer from owner-occupied to investment property to profit.", fix: "Apply IAS 16 to the date of change and treat the difference as a revaluation — so OCI. A transfer from INVENTORY does go to profit." },
    { trap: "Crediting a government grant directly to equity or to profit on receipt.", fix: "Recognise it in profit or loss over the periods in which the related costs are recognised, once there is reasonable assurance of compliance and receipt." },
    { trap: "Treating a repayable grant as a prior period error.", fix: "It is a change in estimate — prospective, with an immediate catch-up charge for the amount already credited." },
    { trap: "Capitalising borrowing costs for the whole accounting period.", fix: "Only over the capitalisation period: from when expenditure, borrowing costs AND activities coincide, to substantial completion." },
    { trap: "Deducting all investment income from capitalised borrowing costs.", fix: "Only income earned on the temporary investment of the specific borrowings DURING the capitalisation period." },
    { trap: "Treating capitalisation of borrowing costs as optional.", fix: "For a qualifying asset it is mandatory." },
  ],
  keyTerms: [
    { term: "Investment property", def: "Property held to earn rentals or for capital appreciation or both, rather than for use in operations or for sale in the ordinary course of business." },
    { term: "Fair value model (IAS 40)", def: "Remeasuring investment property to fair value at each reporting date with gains and losses in PROFIT OR LOSS, and no depreciation." },
    { term: "Government grant", def: "Assistance by government in the form of a transfer of resources in return for past or future compliance with conditions relating to the entity's operating activities." },
    { term: "Deferred income presentation", def: "Presenting a capital grant as a liability released to profit over the asset's life, with the asset carried at full cost." },
    { term: "Qualifying asset", def: "An asset that necessarily takes a substantial period of time to get ready for its intended use or sale." },
    { term: "Capitalisation rate", def: "For general borrowings, the weighted average of the rates applicable to the entity's borrowings outstanding during the period." },
    { term: "Suspension of capitalisation", def: "Ceasing to capitalise borrowing costs during extended periods in which active development is interrupted; routine or expected delays do not suspend it." },
  ],
  summary: [
    "Investment property is held for rentals or capital appreciation. Owner-occupied is IAS 16; a developer's stock is IAS 2; an intra-group letting is IAS 16 on consolidation.",
    "IAS 40 fair value movements go to PROFIT OR LOSS, and no depreciation is charged. The cost model requires fair value disclosure.",
    "On transfer, owner-occupied → investment property is a revaluation (OCI); inventory → investment property goes to profit; investment property → owner-occupied uses fair value as deemed cost.",
    "Government grants are recognised in profit over the periods the related costs arise, once compliance and receipt are reasonably assured.",
    "Capital grants may be presented as deferred income or netted against the asset. Profit is identical; gross assets, liabilities and gearing are not.",
    "A repayable grant is a prospective change in estimate with an immediate catch-up charge.",
    "Borrowing costs on a qualifying asset MUST be capitalised, over the capitalisation period only, with qualifying investment income deducted for specific borrowings.",
    "General borrowings use a weighted average rate applied to the expenditure, capped at total borrowing costs incurred.",
  ],
  knowledgeDiagnostic: [
    { q: "Where do IAS 40 fair value movements go?", a: "To profit or loss — not other comprehensive income." },
    { q: "Is investment property held at fair value depreciated?", a: "No. Under the cost model it is, and fair value is then disclosed." },
    { q: "A building transfers from owner-occupied to investment property at fair value. Where does the uplift go?", a: "To other comprehensive income, treated as an IAS 16 revaluation at the date of change." },
    { q: "Do the two grant presentations give different profits?", a: "No. They give different gross assets and liabilities, and therefore different gearing." },
    { q: "When does capitalisation of borrowing costs begin?", a: "When expenditure is being incurred, borrowing costs are being incurred, and activities to prepare the asset are in progress — the latest of the three." },
    { q: "How is the capitalisation rate found for general borrowings?", a: "The weighted average of the rates on the entity's borrowings outstanding during the period, applied to the expenditure on the asset." },
  ],
  furtherStudy: [
    "Chapter 7 — the cost of PPE, which capitalised borrowing costs are added to",
    "Chapter 22 — IFRS 5, and the different reason depreciation stops there",
    "Chapter 30 — the gearing distortion that the grant presentation choice creates",
  ],
}

export const FR_TREE_10: StudyChapter = {
  id: "FR-10",
  number: 10,
  paper: "FR",
  area: "B",
  title: "IAS 38: intangible assets and development costs",
  minutes: 18,
  syllabusRefs: ["B2(a)", "B2(b)", "B2(c)", "B2(d)"],
  intro:
    "The standard exists to stop entities capitalising hope. Its six development criteria are the mechanism, and they must all be met.",
  outcomes: [
    "Apply the definition of an intangible asset, including the identifiability requirement",
    "Distinguish research from development and account for each",
    "Apply the six criteria for capitalising development expenditure",
    "Explain why internally generated goodwill, brands and customer lists are never recognised",
    "Amortise an intangible with a finite life and account for one with an indefinite life",
  ],
  sections: [
    {
      id: "definition",
      heading: "The definition, and the word that does the work",
      blocks: [
        {
          kind: "definition",
          term: "Intangible asset",
          md: "An **identifiable non-monetary asset without physical substance**.",
        },
        {
          kind: "text",
          md: "\"Asset\" brings in the framework definition — a controlled right from a past event with the potential to produce benefits. \"Without physical substance\" is rarely in doubt. **\"Identifiable\"** is the word that decides most questions.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Identifiable means separable OR arising from contractual or legal rights",
          md: "An asset is identifiable if it is either:\n\n· **SEPARABLE** — capable of being separated from the entity and sold, transferred, licensed, rented or exchanged, either on its own or together with a related contract or asset; **or**\n\n· **arising from CONTRACTUAL OR OTHER LEGAL RIGHTS**, regardless of whether those rights are separable.\n\nThis is why a purchased **licence** is an intangible asset (legal right) and why internally generated **goodwill** is not (neither separable nor a legal right — it is a residual that cannot be detached from the business).",
        },
        {
          kind: "table",
          caption: "Common items, and why they are or are not recognised",
          head: ["Item", "Recognised?", "Reason"],
          rows: [
            ["A purchased patent", "**YES**", "Identifiable through legal rights, and cost is reliably measurable"],
            ["A purchased brand", "**YES**", "Acquired separately or in a business combination, so cost or fair value is measurable"],
            ["An **internally generated** brand", "**NO**", "IAS 38 expressly prohibits it — the cost of building it cannot be distinguished from the cost of developing the business as a whole"],
            ["Internally generated goodwill", "**NO**", "Not identifiable, and not separable from the business. Only PURCHASED goodwill is recognised, under IFRS 3"],
            ["Internally generated mastheads, publishing titles, customer lists", "**NO**", "Expressly prohibited, for the same reason as brands"],
            ["Development expenditure meeting all six criteria", "**YES — must be capitalised**", "At that point the entity has demonstrated an asset rather than an aspiration"],
            ["Research expenditure", "**NO — expense**", "By definition the entity cannot yet demonstrate future benefits"],
            ["Start-up, pre-opening and training costs", "**NO — expense**", "Expressly excluded by IAS 38"],
            ["Advertising and promotional expenditure", "**NO — expense**", "Expressly excluded, even where it demonstrably increases sales"],
            ["A website, where it will generate revenue directly", "**Possibly**", "Development costs may be capitalised where the site is expected to generate revenue directly, such as an e-commerce site; a purely promotional site is an expense"],
          ],
        },
        {
          kind: "illustration",
          title: "Two identical brands, two different balance sheets",
          md: "Company A spends $50m over ten years building a brand through advertising. Company B buys that brand from A for $200m.\n\nA has **nothing** on its balance sheet — every dollar of the $50m was expensed as advertising. B carries an intangible asset of **$200m**.\n\nThis looks perverse and it is a real limitation of financial statements, worth raising in an interpretation answer. But the reason is measurement rather than principle: B's $200m is an observable arm's length price for the brand alone, whereas A's $50m is entangled with the general development of its business and its $200m internal value is unverifiable. IAS 38 chooses a verifiable balance sheet over a complete one, and the disclosure of that choice is what lets a user adjust for it."
        },
      ],
      check: {
        q: "Which of the following would be recognised as an intangible asset?",
        options: [
          "A five-year taxi operating licence purchased from a regulator for $80,000",
          "$300,000 spent advertising a new product range, which measurably increased sales",
          "$500,000 spent training staff to use a newly acquired software system",
          "An internally generated customer list valued by consultants at $1.2m",
        ],
        correct: 0,
        explain:
          "The licence is identifiable through legal rights and its cost is reliably measurable. Advertising, training and internally generated customer lists are all expressly excluded from recognition by IAS 38 — the first two because the benefits cannot be controlled or reliably attributed, the third because its cost cannot be distinguished from developing the business as a whole.",
      },
    },
    {
      id: "research-development",
      heading: "Research and development",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Research against development",
            data: {
              leftTitle: "RESEARCH",
              rightTitle: "DEVELOPMENT",
              rows: [
                { aspect: "Definition", left: "Original and planned investigation undertaken with the prospect of gaining new scientific or technical knowledge and understanding", right: "The application of research findings or other knowledge to a plan or design for the production of new or substantially improved products, processes, systems or services before commercial production or use" },
                { aspect: "Typical activity", left: "Searching for alternatives; formulating and evaluating possibilities", right: "Designing, constructing and testing a pre-production prototype or a pilot plant" },
                { aspect: "Treatment", left: "**EXPENSE as incurred**, always", right: "**CAPITALISE** if all six criteria are met; otherwise expense" },
                { aspect: "Why", left: "The entity cannot demonstrate that benefits will flow — that is what it is investigating", right: "Once the criteria are met the entity has demonstrated an asset, not an aspiration" },
                { aspect: "Reversal", left: "An expensed research cost can NEVER later be capitalised", right: "Only expenditure incurred AFTER the criteria are met is capitalised" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Expenditure before the criteria are met is gone for good",
          md: "This is the mechanical point that decides the arithmetic in most IAS 38 questions. Costs expensed before the date on which all six criteria were satisfied **cannot be reinstated**. So the answer to \"how much is capitalised\" is never the total project cost — it is the cost incurred from the date the criteria were met to the date the asset became available for use.\n\nAnd note the other end: once the asset is **available for use**, further costs are not capitalised either. They are the cost of running it.",
        },
        {
          kind: "formula",
          name: "The six development criteria — all must be met",
          expr: "P  PROBABLE future economic benefits\n      a market exists for the output, or an internal use is demonstrated\n\nI  INTENTION to complete and to use or sell the asset\n\nR  RESOURCES — technical, financial and other — adequate\n      to complete the development and to use or sell the asset\n\nA  ABILITY to use or sell the asset\n\nT  TECHNICAL FEASIBILITY of completing it so that it will be\n      available for use or sale\n\nE  EXPENDITURE attributable to the asset can be measured RELIABLY\n\nAll SIX, or the expenditure is an expense. And if all six ARE met,\ncapitalisation is MANDATORY — it is not a policy choice.",
          note: "The two most commonly failed criteria in exam scenarios are RESOURCES (an entity with no committed funding cannot demonstrate it can complete the project) and TECHNICAL FEASIBILITY (a project still investigating whether the concept works is research).",
        },
        {
          kind: "example",
          title: "Splitting a project across the criteria date",
          scenario:
            "Goshawk Co began a project on 1 January 20X8 to develop a new industrial coating. Costs incurred in the year were:\n\n  1 January to 31 March — investigating whether the chemistry works      $400,000\n  1 April to 31 December — designing and testing a production process    $1,800,000\n\nOn 1 April the directors concluded that the process was technically feasible, approved a budget sufficient to complete it, and identified a committed customer. The $1,800,000 includes $150,000 of training for the production team, $80,000 of allocated selling and administrative overheads, and $120,000 of operating losses incurred while the process was being proved. Commercial production begins on 1 January 20X9, and the process is expected to generate benefits for five years.",
          steps: [
            { label: "Deal with the first three months", detail: "Investigating whether the chemistry works is RESEARCH by definition. The $400,000 is expensed and can never be reinstated, however successful the project becomes." },
            { label: "Confirm the criteria date", detail: "On 1 April technical feasibility, intention, resources and probable benefits were all established, and the ability to use or sell follows from the committed customer. Costs from 1 April are candidates for capitalisation." },
            { label: "Strip out what cannot be capitalised even after that date", detail: "Training $150,000 is expressly excluded by IAS 38. Selling and administrative overheads $80,000 are not directly attributable. Operating losses $120,000 are not a cost of creating the asset. Total excluded $350,000." },
            { label: "Compute the amount capitalised", detail: "$1,800,000 − $150,000 − $80,000 − $120,000 = $1,450,000." },
            { label: "Determine amortisation for 20X8", detail: "NIL. Amortisation begins when the asset is AVAILABLE FOR USE, and commercial production starts on 1 January 20X9. Charging a part-year of amortisation in 20X8 is a common error." },
            { label: "Set the 20X9 charge", detail: "$1,450,000 over five years = $290,000 a year, presented within cost of sales or the function to which it relates. The asset must also be tested for impairment before it is available for use, because an intangible not yet available for use is tested annually under IAS 36 regardless of indicators." },
          ],
          result:
            "**Expense $400,000 + $350,000 = $750,000; capitalise $1,450,000; no amortisation in 20X8.** Three separate decisions and each carries marks: the research cut-off, the excluded categories, and the amortisation start date.",
        },
      ],
      check: {
        q: "A project meets all six IAS 38 development criteria on 1 July. Costs of $200,000 were incurred before that date and $500,000 after it, of which $60,000 was staff training. How much is capitalised?",
        options: ["$440,000", "$500,000", "$640,000", "$700,000"],
        correct: 0,
        explain:
          "Only costs incurred after the criteria are met qualify, so the $200,000 is expensed and cannot be reinstated. Training is expressly excluded even after that date, so $500,000 − $60,000 = $440,000 is capitalised.",
      },
    },
    {
      id: "measurement",
      heading: "Subsequent measurement: amortisation, indefinite lives and revaluation",
      blocks: [
        {
          kind: "list",
          title: "Finite useful life",
          items: [
            "**Amortise** over the useful life, beginning when the asset is **available for use**.",
            "The **residual value is presumed to be NIL** unless there is a commitment by a third party to buy the asset at the end of its useful life, or an active market exists from which a residual can be determined and which is expected to exist at the end of the life.",
            "Review the amortisation period and method **at least at each financial year end**; changes are changes in estimate.",
            "Where the pattern of consumption cannot be determined reliably, use the **straight line** method.",
            "**Legal rights** cap the useful life: a patent with eight years to run cannot be amortised over twelve, though it can be amortised over less if the entity expects to use it for a shorter period. Where renewal is available at insignificant cost and is expected, the renewal periods may be included.",
          ],
        },
        {
          kind: "list",
          title: "Indefinite useful life",
          items: [
            "\"Indefinite\" means there is **no foreseeable limit** on the period over which the asset is expected to generate net cash inflows. It does **NOT** mean infinite.",
            "Such an asset is **NOT amortised**.",
            "It must be tested for **impairment ANNUALLY**, and whenever there is an indicator — regardless of whether any indicator exists. The same rule applies to goodwill and to an intangible not yet available for use.",
            "The indefinite-life assessment is reviewed each period. If the life becomes finite, that is a change in estimate: begin amortising prospectively over the remaining life, after first testing for impairment.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The revaluation model for intangibles exists, and is almost never available",
          md: "IAS 38 permits a revaluation model, but only where fair value can be determined by reference to an **ACTIVE MARKET** for the intangible. Active markets for intangibles are rare, because intangibles are typically unique — that is much of what makes them valuable.\n\nSo the examinable point is the restriction, not the mechanics: an entity generally **cannot** revalue a brand or a patent, because no active market exists for that specific asset. Where the model does apply, it works like IAS 16's — surplus to OCI, deficit against the surplus then to profit.",
        },
        {
          kind: "activity",
          title: "Set the amortisation",
          prompt:
            "State the amortisation treatment for each, with reasons:\n\n(i) A patent with 10 years of legal protection remaining, which the entity expects to exploit for 6 years before its technology is superseded.\n(ii) A taxi licence renewable indefinitely on payment of a nominal administrative fee, which the entity intends to renew.\n(iii) Goodwill of $4m arising on the acquisition of a subsidiary.\n(iv) Capitalised development costs of $900,000 for a product launching in four months' time.",
          answer:
            "(i) Amortise over SIX years. The legal life caps the useful life but does not set it — the useful life is the period over which the entity expects benefits, and it expects six.\n\n(ii) INDEFINITE useful life, so no amortisation. Renewal is available at insignificant cost and the entity intends to renew, so there is no foreseeable limit. Test for impairment annually.\n\n(iii) NOT amortised. Goodwill always has an indefinite life under IFRS and is tested for impairment annually, and whenever an indicator arises. Note this is a difference from some national frameworks that amortise goodwill.\n\n(iv) No amortisation YET — it begins when the asset is available for use, in four months. But the asset must be tested for impairment NOW and every year until then, because an intangible not yet available for use is subject to a mandatory annual test regardless of indicators.\n\nThe pattern: three of the four are not amortised in the current period, for three different reasons. Say which reason applies.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Capitalising the whole cost of a successful project.", fix: "Only costs incurred AFTER all six criteria are met. Research expensed earlier can never be reinstated." },
    { trap: "Treating capitalisation of development costs as a policy choice.", fix: "If all six criteria are met, capitalisation is MANDATORY." },
    { trap: "Capitalising training, selling costs, administrative overheads or initial operating losses within development.", fix: "All are expressly excluded, even after the criteria are met." },
    { trap: "Amortising from the date of capitalisation.", fix: "Amortisation begins when the asset is AVAILABLE FOR USE." },
    { trap: "Recognising an internally generated brand at a valuation.", fix: "Expressly prohibited, along with mastheads, publishing titles and customer lists. Only PURCHASED intangibles of these kinds are recognised." },
    { trap: "Amortising goodwill.", fix: "Goodwill has an indefinite life under IFRS: no amortisation, annual impairment test." },
    { trap: "Assuming a residual value for an intangible.", fix: "It is presumed NIL unless a third party has committed to buy it, or an active market exists and is expected to persist." },
    { trap: "Revaluing an intangible with no active market.", fix: "The revaluation model requires an active market for that intangible, which almost never exists." },
  ],
  keyTerms: [
    { term: "Intangible asset", def: "An identifiable non-monetary asset without physical substance." },
    { term: "Identifiable", def: "Separable — capable of being sold, transferred, licensed, rented or exchanged — or arising from contractual or other legal rights." },
    { term: "Research", def: "Original and planned investigation undertaken with the prospect of gaining new scientific or technical knowledge and understanding. Always expensed." },
    { term: "Development", def: "The application of research findings or other knowledge to a plan or design for new or substantially improved products, processes, systems or services before commercial production or use." },
    { term: "Indefinite useful life", def: "No foreseeable limit on the period over which the asset is expected to generate net cash inflows. Not amortised; tested for impairment annually. Not the same as infinite." },
    { term: "Active market (IAS 38)", def: "The condition for using the revaluation model for an intangible; rarely satisfied because intangibles are typically unique." },
  ],
  summary: [
    "An intangible asset is identifiable — separable or from legal rights — non-monetary, and without physical substance.",
    "Research is always expensed. Development is capitalised if and only if all SIX criteria are met, and then capitalisation is mandatory.",
    "Costs incurred before the criteria are met are expensed permanently; training, selling costs, overheads and start-up losses are excluded even afterwards.",
    "Internally generated goodwill, brands, mastheads, publishing titles and customer lists are never recognised. Purchased ones are.",
    "Amortisation starts when the asset is available for use, with a presumed nil residual value.",
    "An indefinite-life intangible, goodwill, and an intangible not yet available for use are all tested for impairment ANNUALLY.",
    "The revaluation model requires an active market for the intangible, so it is almost never available.",
  ],
  knowledgeDiagnostic: [
    { q: "Give the two ways an asset can be identifiable.", a: "It is separable — capable of being sold, transferred, licensed, rented or exchanged — or it arises from contractual or other legal rights." },
    { q: "Name the six development criteria.", a: "Probable future benefits, intention to complete, adequate resources, ability to use or sell, technical feasibility, and reliable measurement of the expenditure." },
    { q: "If all six criteria are met, may the entity choose to expense the costs?", a: "No. Capitalisation is mandatory." },
    { q: "When does amortisation begin?", a: "When the asset is available for use — not when the cost is capitalised." },
    { q: "Which three categories of asset are tested for impairment annually regardless of indicators?", a: "Goodwill, intangibles with an indefinite useful life, and intangibles not yet available for use." },
    { q: "Why is an internally generated brand not recognised?", a: "Its cost cannot be distinguished from the cost of developing the business as a whole, so no faithful representation is possible. IAS 38 prohibits it outright." },
  ],
  furtherStudy: [
    "Chapter 11 — IAS 36, and the annual test this chapter keeps referring to",
    "Chapter 26 — purchased goodwill on a business combination, the one goodwill that IS recognised",
    "Chapter 3 — the framework analysis that IAS 38's prohibitions implement",
  ],
}
