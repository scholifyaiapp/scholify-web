/*
 * FR Area B, first block — IAS 16, investment property, grants, borrowing costs,
 * intangibles, impairment, inventories and lessee accounting.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area B is half the paper, and its objective tests almost never ask what a standard
 * says. They give a transaction and offer four treatments, one of which is right.
 * So every plan here goes from the facts to the entries, and the distractors are the
 * standard's own boundary cases — capitalise against expense, profit or loss against
 * other comprehensive income, the higher of two figures against the lower.
 *
 * Where a plan quotes a threshold it is one the standard fixes and does not change
 * annually, unlike TX's rates.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FR_PLANS_B1: ExamPlanMap = {
  /* ── FR-07 · IAS 16 recognition and initial cost ───────────── */

  "FR-07::recognition": {
    title: "What qualifies as property, plant and equipment",
    format: "ot",
    marks: 2,
    requirement:
      "Which item should be recognised as property, plant and equipment?\n\nA  A machine held for sale in the ordinary course of business\nB  A machine used in production, expected to be used for several periods\nC  A building held to earn rentals\nD  Spare parts consumed within one period",
    plan: [
      {
        step: "State the definition's two limbs",
        detail:
          "Tangible items HELD FOR USE in production or supply of goods or services, for rental to others, or for administrative purposes; AND expected to be used during more than one period.",
      },
      {
        step: "Use \"held for use\" to eliminate",
        detail:
          "A machine held for SALE in the ordinary course is inventory, not PPE — the same asset can be either, depending on why it is held. Purpose classifies, not the nature of the item.",
      },
      {
        step: "Note the investment property boundary",
        detail:
          "A building held to earn RENTALS or for capital appreciation is investment property under IAS 40, not PPE. A building the entity occupies itself is PPE.",
      },
      {
        step: "Note the one-period limb",
        detail:
          "Spare parts consumed within one period are inventory. Major spare parts expected to be used over more than one period are PPE, so the same category splits on expected life.",
      },
    ],
    answer:
      "**B — a machine used in production, expected to be used for several periods.**\n\nThe definition has two limbs: tangible items **held for use** in production or supply of goods or services, for rental to others, or for administrative purposes; **and** expected to be used during **more than one period**.\n\n**Purpose classifies, not the nature of the item.** The same machine is **inventory** if held for sale in the ordinary course of business and **PPE** if held for use — so option A fails on purpose rather than on anything about the machine.\n\nA building held to earn **rentals** or for **capital appreciation** is **investment property** under IAS 40; a building the entity **occupies itself** is PPE. That boundary is examined directly, and a building used partly for each may need splitting.\n\nSpare parts consumed within one period are inventory, while **major spare parts** expected to be used over more than one period are PPE — so the category splits on **expected life** as well as purpose.\n\nRecognition then requires the general criteria: probable future economic benefits and cost measurable reliably.",
    earns: [
      "Using purpose rather than the nature of the item to classify",
      "Knowing the same building can be PPE or investment property depending on use",
    ],
    loses: ["Classifying by what the item is rather than why it is held"],
  },

  "FR-07::initial-cost": {
    title: "Building the initial cost of an asset",
    format: "ot",
    marks: 2,
    requirement:
      "Which cost should **not** be capitalised as part of the cost of a machine?\n\nA  Site preparation and installation\nB  Initial delivery and handling\nC  Staff training on how to operate the machine\nD  Testing whether the machine functions properly",
    plan: [
      {
        step: "State the capitalisation test",
        detail:
          "Purchase price plus any cost DIRECTLY ATTRIBUTABLE to bringing the asset to the location and condition necessary for it to operate as intended, plus dismantling and restoration obligations.",
      },
      {
        step: "Apply it to each option",
        detail:
          "Site preparation, delivery and handling, and testing all bring the MACHINE into working condition. Training brings the STAFF into working condition, which is a different thing.",
      },
      {
        step: "See why training fails",
        detail:
          "The benefit attaches to the employees, who can leave. It is not a cost of the asset and is expensed — the same reasoning that keeps an internally trained workforce off the statement of financial position.",
      },
      {
        step: "Note where capitalisation stops",
        detail:
          "Capitalisation ceases once the asset is in the location and condition to operate as intended. Costs of operating below capacity, initial losses and relocation afterwards are all expensed.",
      },
    ],
    answer:
      "**C — staff training on how to operate the machine.**\n\nCapitalise the purchase price plus any cost **directly attributable to bringing the asset to the location and condition necessary for it to operate as intended** — plus the initial estimate of any **dismantling and site restoration** obligation.\n\nSite preparation, delivery and handling, installation and **testing** all bring the **machine** into working condition. **Training brings the staff** into working condition, which is a different thing: the benefit attaches to **employees who can leave**, so it is expensed. That is the same reasoning that keeps an internally trained workforce off the statement of financial position.\n\nWhere capitalisation **stops** is examined as often as what goes in: once the asset is in the location and condition to operate as intended, capitalisation **ceases**. So costs of operating below capacity, **initial operating losses**, and **relocation** or reorganisation afterwards are all expensed — even where they were plainly caused by the acquisition.\n\nProceeds from selling items produced during testing go to **profit or loss** and are not deducted from the asset's cost.",
    earns: [
      "Distinguishing bringing the asset into use from bringing the staff into use",
      "Knowing capitalisation stops once the asset is ready, so initial losses are expensed",
    ],
    loses: ["Capitalising training because it was necessary before the machine could be used"],
  },

  "FR-07::subsequent-expenditure": {
    title: "Capitalising subsequent expenditure, and component accounting",
    format: "ot",
    marks: 2,
    requirement:
      "An aircraft's engines are replaced at a cost of $4m. The engines were identified as a separate component with a carrying amount of $0.5m. The correct treatment is to:\n\nA  Expense the $4m as a repair\nB  Capitalise the $4m and derecognise the $0.5m carrying amount of the old engines\nC  Capitalise the $4m with no other entry\nD  Capitalise $3.5m",
    plan: [
      {
        step: "Establish that the replacement qualifies for capitalisation",
        detail:
          "The engines are a separately identified component with their own carrying amount, and replacing them provides future economic benefits over more than one period. So the $4m is capitalised.",
      },
      {
        step: "Identify the entry candidates forget",
        detail:
          "DERECOGNISING the old component. Leaving the $0.5m on the statement of financial position would carry two sets of engines for one aircraft.",
      },
      {
        step: "State both entries together",
        detail:
          "Capitalise $4m as an addition; derecognise the old engines' $0.5m carrying amount, taking any resulting loss to profit or loss. Two entries, not one.",
      },
      {
        step: "Note what component accounting requires",
        detail:
          "Where parts of an asset have significantly different useful lives, each is depreciated SEPARATELY. That is what makes a replacement capitalisable with a clean derecognition rather than a repair.",
      },
    ],
    answer:
      "**B — capitalise the $4m and derecognise the $0.5m carrying amount of the old engines.**\n\nTwo entries are required, and option C is wrong precisely because it makes only one. Capitalising $4m without **derecognising** the old component would carry **two sets of engines for one aircraft**, overstating assets by $0.5m indefinitely.\n\nSo: capitalise **$4m** as an addition, and **derecognise** the old engines' **$0.5m** carrying amount with any resulting loss to profit or loss.\n\nWhat makes this capitalisable rather than a repair is **component accounting**: where parts of an asset have **significantly different useful lives**, each part is **depreciated separately**. Once the engines are a component with their own carrying amount, replacing them is the disposal of one asset and the acquisition of another — not maintenance of a single item.\n\nWithout component accounting the same spend would be far harder to justify capitalising, which is why the standard requires the split.\n\n**Major inspections** and **overhauls** that are a condition of continued use follow the same pattern, with the previous inspection's carrying amount derecognised.",
    earns: [
      "Making both entries, and explaining what leaving the old component would overstate",
      "Naming component accounting as what makes the replacement capitalisable",
    ],
    loses: ["Capitalising the replacement without derecognising what it replaced"],
  },

  /* ── FR-08 · Depreciation and revaluation ──────────────────── */

  "FR-08::depreciation": {
    title: "What depreciation is, and what it is not",
    format: "ot",
    marks: 2,
    requirement:
      "A property's fair value has risen every year since acquisition. Under the cost model the property:\n\nA  Is not depreciated, because its value has not fallen\nB  Is depreciated over its useful life regardless of the rise in fair value\nC  Is revalued upward\nD  Is tested for impairment instead of being depreciated",
    plan: [
      {
        step: "State what depreciation measures",
        detail:
          "The systematic ALLOCATION of the depreciable amount over the useful life. It reflects consumption of the asset's economic benefits, not a fall in its value.",
      },
      {
        step: "Apply it to a rising asset",
        detail:
          "A rise in fair value does not stop the entity consuming the asset, so depreciation continues. The two measure different things and do not offset.",
      },
      {
        step: "Note the one part that is not depreciated",
        detail:
          "LAND normally has an indefinite useful life and is not depreciated. So a property must be SPLIT between land and buildings, and only the buildings element is depreciated.",
      },
      {
        step: "Note when depreciation starts and stops",
        detail:
          "It starts when the asset is AVAILABLE for use, not when used, and continues while the asset is idle. It stops only on derecognition or classification as held for sale.",
      },
    ],
    answer:
      "**B — is depreciated over its useful life regardless of the rise in fair value.**\n\nDepreciation is the **systematic allocation of the depreciable amount over the useful life**. It reflects the entity **consuming** the asset's economic benefits, not a fall in the asset's value — so the two measure different things and do not offset. A rising fair value does not stop the entity using up the building.\n\nOption A is the most common misconception in the topic, and stating that distinction is the answer.\n\nThe exception worth knowing: **land** normally has an **indefinite** useful life and is **not depreciated**. So a property must be **split between land and buildings**, with only the buildings element depreciated — a question giving a single property figure and a land value is testing that split.\n\nDepreciation **starts when the asset is available for use**, not when it is first used, and **continues while the asset is idle**. It stops only on **derecognition** or on classification as **held for sale** under IFRS 5.\n\nThe method, useful life and residual value are **reviewed annually**, and a change is a change in **estimate** — applied prospectively.",
    earns: [
      "Separating consumption from a change in value, and knowing land is not depreciated",
      "Knowing depreciation begins when the asset is available for use and continues while idle",
    ],
    loses: ["Suspending depreciation because the asset's value has risen"],
  },

  "FR-08::revaluation-up": {
    title: "Recording an upward revaluation",
    format: "ot",
    marks: 2,
    requirement:
      "An asset with a carrying amount of $800,000 is revalued to $1,100,000. There have been no previous revaluations. The gain is recognised:\n\nA  In profit or loss\nB  In other comprehensive income, and accumulated in a revaluation surplus within equity\nC  Directly in retained earnings\nD  As deferred income",
    plan: [
      {
        step: "Identify why the gain does not go to profit or loss",
        detail:
          "It is UNREALISED — the asset has not been sold and no cash has arisen. So it is recognised in other comprehensive income and accumulated in a revaluation surplus.",
      },
      {
        step: "Reject the retained earnings route and say why it matters",
        detail:
          "Retained earnings holds REALISED profits available for distribution. Routing an unrealised gain there would let a dividend be paid on a valuation.",
      },
      {
        step: "Note the consequence for depreciation",
        detail:
          "Depreciation is then charged on the REVALUED amount, so the annual charge rises. The excess over the old charge may be transferred from the surplus to retained earnings as it is realised through use.",
      },
      {
        step: "Note that the model applies to a whole class",
        detail:
          "If one asset in a class is revalued, the ENTIRE class must be, and revaluations must be kept sufficiently up to date. Cherry-picking a single favourable asset is not permitted.",
      },
    ],
    answer:
      "**B — in other comprehensive income, and accumulated in a revaluation surplus within equity.**\n\nThe gain is **unrealised** — the asset has not been sold and no cash has arisen — so it goes to **other comprehensive income** and accumulates in a **revaluation surplus**.\n\nOption C is the one with real consequences. **Retained earnings holds realised profits available for distribution**, so routing an unrealised gain there would allow a **dividend to be paid on a valuation**. That is why the surplus is a separate reserve.\n\nDepreciation then follows the **revalued** amount, so the annual charge **rises**. The **excess depreciation** — the difference between the new charge and what the old carrying amount would have produced — **may** be transferred from the revaluation surplus to retained earnings, recognising the gain as it is **realised through use**. That transfer is a reserves movement, not income.\n\nTwo constraints on the model: if one asset in a class is revalued, the **entire class** must be, and revaluations must be kept **sufficiently up to date** — so an entity cannot cherry-pick a single favourable asset or revalue once and leave it.",
    earns: [
      "Explaining why the gain cannot go to retained earnings — distributability",
      "Knowing depreciation follows the revalued amount and the excess may be transferred",
    ],
    loses: ["Recognising the gain in profit or loss or in retained earnings"],
  },

  "FR-08::revaluation-down": {
    title: "A downward revaluation, and disposal of a revalued asset",
    format: "ot",
    marks: 2,
    requirement:
      "An asset carried at a revalued amount, with a revaluation surplus of $200,000 relating to it, falls in value by $300,000. The decrease is recognised as:\n\nA  $300,000 in profit or loss\nB  $200,000 against the revaluation surplus in other comprehensive income, and $100,000 in profit or loss\nC  $300,000 against the revaluation surplus\nD  $300,000 in other comprehensive income",
    plan: [
      {
        step: "State the order in which a decrease is absorbed",
        detail:
          "A decrease is set FIRST against any revaluation surplus relating to THAT asset, in other comprehensive income. Only the excess goes to profit or loss.",
      },
      {
        step: "Apply the order to the figures",
        detail:
          "$200,000 of surplus exists, so $200,000 goes to other comprehensive income and reverses it. The remaining $100,000 has no surplus to absorb it and goes to profit or loss.",
      },
      {
        step: "Note the asymmetry with an increase",
        detail:
          "An increase goes to other comprehensive income UNLESS it reverses a previous decrease charged to profit or loss, in which case it is recognised in profit or loss to that extent. The two rules mirror each other.",
      },
      {
        step: "Note what happens on disposal",
        detail:
          "The gain or loss on disposal is proceeds less carrying amount, and goes to profit or loss. Any remaining revaluation surplus is transferred to RETAINED EARNINGS — never through profit or loss.",
      },
    ],
    answer:
      "**B — $200,000 against the revaluation surplus in other comprehensive income, and $100,000 in profit or loss.**\n\nA decrease is absorbed in a fixed order: **first** against any revaluation surplus relating to **that asset**, through other comprehensive income; **only the excess** goes to profit or loss. So $200,000 reverses the surplus and the remaining $100,000 is charged to profit or loss.\n\nThe **asymmetry** with an increase mirrors this and is examined alongside: an increase goes to other comprehensive income **unless** it reverses a previous decrease charged to profit or loss, in which case it is recognised **in profit or loss** to that extent. So the two rules are symmetrical — each reverses through the same statement the original went to.\n\n**Disposal** is where candidates lose marks. The gain or loss is **proceeds less carrying amount** and goes to **profit or loss**. Any **remaining revaluation surplus** is transferred to **retained earnings** as a reserves movement — it is **never recycled through profit or loss**, so an entity cannot bank a revaluation gain in equity and then report it as profit on sale.\n\nThat is why the profit on disposal of a revalued asset is usually small.",
    earns: [
      "Applying the absorption order, and knowing the increase rule mirrors it",
      "Knowing the remaining surplus goes to retained earnings and is never recycled through profit or loss",
    ],
    loses: ["Charging the whole decrease to profit or loss, or recycling the surplus on disposal"],
  },

  /* ── FR-09 · Investment property, grants, borrowing costs ──── */

  "FR-09::investment-property": {
    title: "The fair value model for investment property",
    format: "ot",
    marks: 2,
    requirement:
      "An investment property measured under the fair value model rises in value by $150,000. The gain is recognised:\n\nA  In other comprehensive income\nB  In profit or loss\nC  In a revaluation surplus\nD  Not at all until sale",
    plan: [
      {
        step: "Distinguish this from IAS 16's revaluation model",
        detail:
          "Under IAS 40's FAIR VALUE model, changes in fair value go to PROFIT OR LOSS. Under IAS 16's revaluation model an increase goes to other comprehensive income. Same idea, opposite destination.",
      },
      {
        step: "Note the second difference",
        detail:
          "An investment property under the fair value model is NOT DEPRECIATED. So the two models differ on both destination and depreciation, which is why the classification matters so much.",
      },
      {
        step: "Note the cost model alternative",
        detail:
          "IAS 40 permits a cost model, under which the property IS depreciated and fair value is disclosed. The model chosen applies to all investment property.",
      },
      {
        step: "Note the classification boundary",
        detail:
          "Investment property is held to earn rentals or for capital appreciation. Owner-occupied property is PPE. A transfer between the two on a change of use is a recognition event.",
      },
    ],
    answer:
      "**B — in profit or loss.**\n\nThis is the distinction most worth holding in Area B. Under **IAS 40's fair value model**, changes in fair value go to **profit or loss**. Under **IAS 16's revaluation model**, an increase goes to **other comprehensive income**. Same economic event, opposite destination — decided entirely by how the property is **classified**.\n\nThe second difference compounds it: an investment property under the fair value model is **not depreciated** at all, whereas a revalued IAS 16 building is depreciated on its revalued amount. So misclassifying a property gets both the gain and the charge wrong.\n\nIAS 40 also permits a **cost model**, under which the property **is** depreciated and fair value is **disclosed**. The model chosen applies to **all** of the entity's investment property.\n\nThe classification boundary: investment property is held to earn **rentals** or for **capital appreciation**; **owner-occupied** property is PPE. A **change of use** triggers a transfer between the two, and that transfer is a recognition event with its own rules.\n\nWhere a property is partly let and partly occupied, the portions are accounted for separately if they could be sold separately.",
    earns: [
      "Contrasting IAS 40's profit or loss destination with IAS 16's other comprehensive income",
      "Knowing fair value model investment property is not depreciated",
    ],
    loses: ["Applying IAS 16's revaluation treatment to an investment property"],
  },

  "FR-09::government-grants": {
    title: "Recognising a government grant",
    format: "ot",
    marks: 2,
    requirement:
      "A government grant received towards the cost of an asset is recognised in profit or loss:\n\nA  Immediately on receipt\nB  Over the periods in which the related costs are recognised, matching the grant to those costs\nC  When the conditions attached to it are met\nD  Never — it is credited directly to equity",
    plan: [
      {
        step: "State the recognition principle",
        detail:
          "A grant is recognised in profit or loss on a SYSTEMATIC BASIS over the periods in which the entity recognises the related costs. It is a matching rule.",
      },
      {
        step: "Note the two presentation options for an asset grant",
        detail:
          "Either present it as DEFERRED INCOME released over the asset's life, or DEDUCT it from the asset's carrying amount so the depreciation charge is reduced. Both give the same profit effect.",
      },
      {
        step: "Reject immediate recognition",
        detail:
          "Recognising the grant on receipt would credit profit in a period bearing none of the related cost — the opposite of matching, and it would flatter the year of receipt.",
      },
      {
        step: "Reject the direct-to-equity option",
        detail:
          "A grant is not a contribution from an owner, so it cannot go to equity. It is income, recognised over time.",
      },
    ],
    answer:
      "**B — over the periods in which the related costs are recognised, matching the grant to those costs.**\n\nThe rule is a **matching** rule: a grant is recognised in profit or loss on a **systematic basis** over the periods in which the entity recognises the **related costs**. So a grant towards an asset is recognised over the asset's **useful life**, and a grant towards wages over the periods the wages are incurred.\n\nOption A would credit profit in a period bearing **none** of the related cost, flattering the year of receipt — the opposite of matching.\n\nOption D fails on the definition: a grant is **not a contribution from an owner**, so it cannot be credited to equity. It is income.\n\nFor an **asset** grant there are **two permitted presentations**, and both give the **same profit effect**: present the grant as **deferred income** released over the asset's life, or **deduct** it from the asset's carrying amount so that a reduced depreciation charge does the releasing. The choice affects the statement of financial position, not profit.\n\nA grant is recognised only when there is **reasonable assurance** the conditions will be met and the grant received. Where a grant becomes **repayable**, it is treated as a **change in estimate**.",
    earns: [
      "Naming both presentations for an asset grant and knowing they give the same profit effect",
      "Knowing repayment is treated as a change in estimate",
    ],
    loses: ["Crediting the grant to profit on receipt or to equity"],
  },

  "FR-09::borrowing-costs": {
    title: "When borrowing costs must be capitalised",
    format: "ot",
    marks: 2,
    requirement:
      "Borrowing costs directly attributable to the construction of a qualifying asset must be:\n\nA  Expensed as incurred\nB  Capitalised as part of the cost of that asset\nC  Capitalised at the entity's option\nD  Deducted from the asset's carrying amount",
    plan: [
      {
        step: "State the requirement and note it is mandatory",
        detail:
          "Borrowing costs directly attributable to the acquisition, construction or production of a QUALIFYING ASSET MUST be capitalised. It is not a choice, which is what option C gets wrong.",
      },
      {
        step: "Define a qualifying asset",
        detail:
          "One that necessarily takes a SUBSTANTIAL PERIOD of time to get ready for its intended use or sale. An asset ready for use when acquired does not qualify.",
      },
      {
        step: "State when capitalisation begins, pauses and ends",
        detail:
          "Begins when expenditure and borrowing costs are being incurred AND activities to prepare the asset are in progress — all three. SUSPENDED during extended periods when active development is interrupted. CEASES when substantially all activities are complete.",
      },
      {
        step: "Note that other borrowing costs are expensed",
        detail:
          "Borrowing costs not attributable to a qualifying asset are expensed as incurred. So the same interest can be split between capitalisation and expense.",
      },
    ],
    answer:
      "**B — capitalised as part of the cost of that asset.**\n\nCapitalisation is **mandatory**, not optional, for borrowing costs **directly attributable** to the acquisition, construction or production of a **qualifying asset** — which is what option C gets wrong.\n\nA **qualifying asset** is one that necessarily takes a **substantial period of time** to get ready for its intended use or sale. An asset ready for use when acquired does not qualify, so ordinary purchases are unaffected.\n\nThe timing rules are where the marks are, and all three conditions must hold for capitalisation to **begin**: expenditure is being incurred, **borrowing costs** are being incurred, **and** activities necessary to prepare the asset are **in progress**. Capitalisation is **suspended** during extended periods in which active development is **interrupted** — so a construction halted for a season stops capitalising. And it **ceases** when substantially all the activities necessary to prepare the asset are complete.\n\nBorrowing costs **not** attributable to a qualifying asset are **expensed as incurred**, so the same year's interest can be split between capitalisation and expense.\n\nWhere funds are borrowed **generally**, a **weighted average** capitalisation rate is applied to the expenditure on the asset.",
    earns: [
      "Knowing capitalisation is mandatory, and all three conditions for it to begin",
      "Knowing it is suspended during an interruption and ceases on substantial completion",
    ],
    loses: ["Treating capitalisation as an accounting policy choice"],
  },

  /* ── FR-10 · IAS 38 intangibles ────────────────────────────── */

  "FR-10::definition": {
    title: "The word that decides whether an intangible is recognised",
    format: "ot",
    marks: 2,
    requirement:
      "An intangible asset must be identifiable. This means it must be:\n\nA  Physically separable from the entity\nB  Separable, or arise from contractual or other legal rights\nC  Capable of being valued\nD  Recognised by a third party",
    plan: [
      {
        step: "State the identifiability test's two limbs",
        detail:
          "SEPARABLE — capable of being separated and sold, transferred or licensed, individually or with a related contract — OR arising from CONTRACTUAL or other legal rights. Either limb suffices.",
      },
      {
        step: "See why identifiability is the operative requirement",
        detail:
          "It is what distinguishes an intangible asset from GOODWILL. Goodwill is precisely the part of an acquired business's value that cannot be identified separately.",
      },
      {
        step: "Apply the internally generated prohibition",
        detail:
          "Internally generated goodwill, brands, mastheads, publishing titles and customer lists must NOT be recognised, because their cost cannot be distinguished from the cost of developing the business as a whole.",
      },
      {
        step: "Contrast with a purchased intangible",
        detail:
          "The same brand PURCHASED is recognised, because a purchase price supplies reliable measurement. So identical assets are treated differently depending on how they were obtained.",
      },
    ],
    answer:
      "**B — separable, or arise from contractual or other legal rights.**\n\nEither limb suffices: **separable** means capable of being separated from the entity and sold, transferred, licensed or exchanged — individually or together with a related contract. Or the asset **arises from contractual or other legal rights**, whether or not those rights are separable.\n\nWhy identifiability is the operative requirement: it is what **distinguishes an intangible asset from goodwill**. Goodwill is by definition the part of an acquired business's value that **cannot** be identified separately, which is why it is only ever recognised in a business combination.\n\nThe consequence is the prohibition: **internally generated goodwill, brands, mastheads, publishing titles and customer lists must not be recognised**, because their cost cannot be distinguished from the cost of developing the business as a whole.\n\nAnd the contrast that makes it stark — the **same brand purchased** is recognised, because a purchase price supplies reliable measurement. So two identical assets are treated differently according to how they were obtained, which is a real limitation of the statement of financial position rather than an inconsistency.\n\nRecognition also requires **control** and **probable future economic benefits**.",
    earns: [
      "Knowing either limb suffices, and that identifiability is what separates an intangible from goodwill",
      "Explaining why the same brand is recognised if purchased and not if internally generated",
    ],
    loses: ["Requiring physical separability, which no intangible has"],
  },

  "FR-10::research-development": {
    title: "When development expenditure must be capitalised",
    format: "ot",
    marks: 2,
    requirement:
      "Development expenditure must be capitalised where all the recognition criteria are met. Which is **not** one of those criteria?\n\nA  Technical feasibility of completing the asset\nB  Intention to complete and ability to use or sell it\nC  That the project is expected to be highly profitable\nD  Availability of adequate resources to complete the project",
    plan: [
      {
        step: "Recall the criteria, commonly remembered as PIRATE",
        detail:
          "Probable future economic benefits, Intention to complete, Resources adequate, Ability to use or sell, Technical feasibility, Expenditure measurable reliably. Six, and all must be met.",
      },
      {
        step: "Note the strength of the benefits criterion",
        detail:
          "PROBABLE future economic benefits, demonstrated by the existence of a market or the asset's usefulness internally. Not high profitability — that is a stronger test than the standard sets.",
      },
      {
        step: "Note that capitalisation is mandatory once the criteria are met",
        detail:
          "It is not a choice. So an entity cannot expense qualifying development costs to be prudent, nor capitalise costs failing the criteria to flatter profit.",
      },
      {
        step: "Contrast research",
        detail:
          "RESEARCH must always be EXPENSED, because the future benefit is too uncertain. Where the two phases cannot be distinguished, the whole is treated as research.",
      },
    ],
    answer:
      "**C — that the project is expected to be highly profitable.**\n\nThe criteria are commonly remembered as **PIRATE**: **P**robable future economic benefits, **I**ntention to complete, **R**esources adequate to complete, **A**bility to use or sell, **T**echnical feasibility, **E**xpenditure measurable reliably. All six must be met.\n\nThe benefits criterion requires **probable** future economic benefits — demonstrated by the existence of a **market** for the output or, for internal use, the asset's **usefulness**. \"Highly profitable\" is a **stronger** test than the standard sets, which is what makes it the outsider.\n\nTwo points that follow. Capitalisation is **mandatory** once the criteria are met, so an entity **cannot** expense qualifying development costs in the name of prudence — nor capitalise costs that fail the criteria to flatter profit. Both directions are non-compliance.\n\nAnd **research must always be expensed**, because the future benefit is too uncertain. Where the research and development phases **cannot be distinguished**, the whole expenditure is treated as **research** and expensed.\n\nCosts expensed before the criteria were met **cannot** be reinstated later.",
    earns: [
      "Knowing capitalisation is mandatory in both directions once the criteria are tested",
      "Knowing indistinguishable phases are treated wholly as research, and earlier costs cannot be reinstated",
    ],
    loses: ["Requiring high profitability, a higher threshold than the standard sets"],
  },

  "FR-10::measurement": {
    title: "Amortising an intangible, and the indefinite life case",
    format: "ot",
    marks: 2,
    requirement:
      "An intangible asset assessed as having an indefinite useful life is:\n\nA  Amortised over a maximum of ten years\nB  Not amortised, but tested for impairment annually and whenever there is an indication of impairment\nC  Written off immediately\nD  Amortised over twenty years",
    plan: [
      {
        step: "Read indefinite correctly",
        detail:
          "Not infinite. It means there is NO FORESEEABLE LIMIT to the period over which the asset is expected to generate net cash inflows, so no amortisation period can be determined.",
      },
      {
        step: "Supply what replaces amortisation",
        detail:
          "An impairment test ANNUALLY and whenever there is an indication of impairment. That is the control preventing an unamortised asset sitting unchallenged.",
      },
      {
        step: "Note that the assessment is reviewed",
        detail:
          "The useful life is reassessed each period. If it becomes finite, the asset begins to be amortised — a change in ESTIMATE, applied prospectively.",
      },
      {
        step: "Note the finite-life rules for contrast",
        detail:
          "A finite-life intangible is amortised over its useful life, usually straight line, with residual value normally assumed to be NIL — because a second-hand market for a specific intangible rarely exists.",
      },
    ],
    answer:
      "**B — not amortised, but tested for impairment annually and whenever there is an indication of impairment.**\n\n**Indefinite does not mean infinite.** It means there is **no foreseeable limit** to the period over which the asset is expected to generate net cash inflows, so **no amortisation period can be determined** — and if no period can be determined, no charge can be calculated.\n\nThe **annual impairment test** is what replaces amortisation, and it applies **regardless** of whether there is any indication of impairment. Without it an unamortised asset would sit on the statement of financial position unchallenged indefinitely.\n\nThe assessment is **reviewed each period**. If the life becomes **finite**, amortisation begins — a change in **estimate**, applied **prospectively**.\n\nFor contrast, a **finite-life** intangible is amortised over its useful life, usually straight line, and its **residual value is normally assumed to be nil** — because a second-hand market for a specific intangible rarely exists. That assumption makes intangible amortisation simpler than PPE depreciation.\n\nAmortisation **begins when the asset is available for use**, and a **revaluation model** is permitted only where an **active market** exists, which is rare.",
    earns: [
      "Reading indefinite as no foreseeable limit, and knowing the annual test is unconditional",
      "Knowing residual value is normally nil for a finite-life intangible",
    ],
    loses: ["Inventing an amortisation period, which contradicts the indefinite assessment"],
  },

  /* ── FR-11 · IAS 36 impairment ─────────────────────────────── */

  "FR-11::when-to-test": {
    title: "When an impairment test is required",
    format: "ot",
    marks: 2,
    requirement:
      "Which asset must be tested for impairment **annually**, whether or not there is any indication of impairment?\n\nA  A machine carried at cost less depreciation\nB  Goodwill acquired in a business combination\nC  Inventory\nD  A building carried at a revalued amount",
    plan: [
      {
        step: "State the general rule and the exception",
        detail:
          "GENERAL: test only when there is an INDICATION of impairment. EXCEPTION: goodwill, intangibles with indefinite lives, and intangibles not yet available for use must be tested ANNUALLY regardless.",
      },
      {
        step: "See why goodwill is in the exception",
        detail:
          "It is not amortised, so nothing systematically reduces its carrying amount. Without a mandatory annual test it could remain at cost indefinitely however the business had deteriorated.",
      },
      {
        step: "Note that inventory is outside IAS 36",
        detail:
          "Inventory is measured at the lower of cost and net realisable value under IAS 2, which performs the same function through a different mechanism. So option C is outside the standard's scope.",
      },
      {
        step: "Recall the indicators for the general rule",
        detail:
          "EXTERNAL: a fall in market value, adverse changes in the market or technology, rising interest rates. INTERNAL: physical damage, obsolescence, worse economic performance than expected, or a plan to discontinue.",
      },
    ],
    answer:
      "**B — goodwill acquired in a business combination.**\n\nThe **general** rule is to test only where there is an **indication** of impairment. The **exception** requires an **annual** test regardless: **goodwill**, **intangibles with indefinite useful lives**, and **intangibles not yet available for use**.\n\nGoodwill is in the exception because it is **not amortised**, so nothing systematically reduces its carrying amount. Without a mandatory annual test it could remain at its original figure indefinitely, however far the acquired business had deteriorated — which is exactly the risk the requirement addresses.\n\n**Inventory** is outside IAS 36 altogether: it is measured at the **lower of cost and net realisable value** under IAS 2, which achieves the same protection by a different mechanism. Receivables, deferred tax and financial assets are similarly outside scope.\n\nThe **indicators** for the general rule are worth being able to list. **External**: a significant fall in market value, adverse changes in the market, technology or the legal environment, and increases in interest rates. **Internal**: physical damage or obsolescence, worse economic performance than expected, and a plan to discontinue or restructure the operation.",
    earns: [
      "Knowing all three items in the annual-test exception, and why goodwill is among them",
      "Knowing inventory is outside IAS 36 and protected by IAS 2 instead",
    ],
    loses: ["Applying the annual test to ordinary PPE, which is tested only on indication"],
  },

  "FR-11::recoverable-amount": {
    title: "Recoverable amount is the higher of two figures",
    format: "ot",
    marks: 2,
    requirement:
      "An asset has a carrying amount of $500,000, a fair value less costs of disposal of $420,000, and a value in use of $460,000. The impairment loss is:\n\nA  $80,000\nB  $40,000\nC  $120,000\nD  Nil",
    plan: [
      {
        step: "State the definition and note the direction",
        detail:
          "Recoverable amount is the HIGHER of fair value less costs of disposal and value in use. Higher, not lower — because a rational entity will pursue whichever route recovers more.",
      },
      {
        step: "Identify the recoverable amount",
        detail:
          "The higher of $420,000 and $460,000 is **$460,000** — value in use. The entity would keep using the asset rather than sell it.",
      },
      {
        step: "Compute the loss",
        detail:
          "Carrying amount $500,000 less recoverable amount $460,000 = **$40,000** impairment loss.",
      },
      {
        step: "Identify the wrong-direction answer",
        detail:
          "Taking the LOWER figure gives $500,000 − $420,000 = $80,000, which is option A. That single reversal is the most common error in the topic.",
      },
    ],
    answer:
      "**B — $40,000.**\n\nRecoverable amount is the **higher** of fair value less costs of disposal and value in use: the higher of $420,000 and $460,000 is **$460,000**.\n\nImpairment loss = carrying amount $500,000 − recoverable amount $460,000 = **$40,000**.\n\nThe direction is the whole question, and taking the **lower** figure gives $500,000 − $420,000 = **$80,000**, which is option A and the most common error in the topic. The logic behind \"higher\" is worth holding: a rational entity pursues whichever route **recovers more**, so the asset is only impaired to the extent that **neither** route recovers its carrying amount.\n\nHere the entity would **keep using** the asset rather than sell it, because using it recovers more.\n\nOne practical consequence: it is **not always necessary to compute both**. If either figure exceeds the carrying amount, the asset is not impaired and the other need not be calculated.\n\nThe loss is recognised in **profit or loss**, unless the asset is carried at a **revalued** amount — in which case it is treated as a revaluation decrease and absorbed against that asset's surplus first.",
    earns: [
      "Taking the higher of the two, and explaining why the standard uses higher",
      "Knowing only one figure need be computed if it exceeds the carrying amount",
    ],
    loses: ["Taking the lower of the two, which is the offered $80,000"],
  },

  "FR-11::cgus": {
    title: "Allocating an impairment loss within a cash-generating unit",
    format: "ot",
    marks: 2,
    requirement:
      "An impairment loss on a cash-generating unit containing goodwill is allocated:\n\nA  Pro rata across all assets in the unit\nB  First to goodwill, then pro rata to the other assets in the unit\nC  First to the other assets, then to goodwill\nD  To whichever assets management selects",
    plan: [
      {
        step: "State the allocation order",
        detail:
          "FIRST to goodwill until it is eliminated, THEN pro rata to the other assets of the unit based on their carrying amounts. The order is fixed.",
      },
      {
        step: "See why goodwill is first",
        detail:
          "It is the most uncertain asset in the unit and cannot be sold separately. Where a unit is impaired, the acquisition premium is the most likely thing to have proved unfounded.",
      },
      {
        step: "Note the floor on the pro rata allocation",
        detail:
          "No individual asset may be written below the HIGHER of its own fair value less costs of disposal, its value in use, and zero. Any unallocated amount is reallocated to the remaining assets.",
      },
      {
        step: "Note why a CGU is needed at all",
        detail:
          "Because value in use often cannot be determined for a single asset that does not generate independent cash inflows. The CGU is the smallest group that does.",
      },
    ],
    answer:
      "**B — first to goodwill, then pro rata to the other assets in the unit.**\n\nThe order is fixed: **goodwill first**, until eliminated, **then pro rata** to the other assets of the unit based on their carrying amounts.\n\nGoodwill goes first because it is the **most uncertain** asset in the unit and **cannot be sold separately**. Where a unit turns out to be impaired, the **premium paid on acquisition** is the most likely thing to have proved unfounded — so writing it off first reflects the economics rather than being an arbitrary convention.\n\nThe **floor** on the pro rata step is the detail most often missed: **no individual asset may be written below the higher of its own fair value less costs of disposal, its value in use, and zero**. Any amount that cannot be allocated because of that floor is **reallocated** to the remaining assets of the unit.\n\nWhy a **CGU** is needed at all: value in use frequently **cannot be determined for a single asset** that does not generate cash inflows independently of others. The CGU is the **smallest identifiable group** of assets that does — so a single machine on a production line is normally tested as part of the line.\n\nGoodwill is allocated to the units expected to benefit from the combination.",
    earns: [
      "Knowing the order and the floor on the pro rata step, with reallocation of the excess",
      "Explaining why goodwill absorbs the loss first",
    ],
    loses: ["Allocating pro rata across everything, which ignores goodwill's position"],
  },

  "FR-11::reversals": {
    title: "Which impairment losses may be reversed",
    format: "ot",
    marks: 2,
    requirement:
      "An impairment loss previously recognised on **goodwill** may be reversed:\n\nA  Where the recoverable amount subsequently increases\nB  Never\nC  Only up to the original carrying amount\nD  Only in other comprehensive income",
    plan: [
      {
        step: "State the rule for goodwill",
        detail:
          "An impairment loss on goodwill is NEVER reversed. That is an absolute prohibition and the one asset for which the general reversal rule does not apply.",
      },
      {
        step: "Say why the prohibition exists",
        detail:
          "Any subsequent increase in the unit's recoverable amount is likely to reflect INTERNALLY GENERATED goodwill, which may not be recognised. Reversing would recognise it by the back door.",
      },
      {
        step: "State the rule for other assets",
        detail:
          "A reversal IS permitted where the estimates used to determine recoverable amount have changed — but only up to what the carrying amount WOULD have been had no impairment been recognised.",
      },
      {
        step: "Note the cap's purpose",
        detail:
          "The cap includes the depreciation that would have been charged in the meantime, so a reversal can never restore the asset above its depreciated historical cost.",
      },
    ],
    answer:
      "**B — never.**\n\nAn impairment loss on **goodwill is never reversed**, and the prohibition is absolute. The reason is the examinable point: any subsequent increase in the unit's recoverable amount is likely to reflect **internally generated goodwill**, which **may not be recognised** — so permitting a reversal would recognise it by the back door.\n\nFor **other assets** a reversal **is** permitted, but only where the **estimates** used to determine recoverable amount have changed — not merely because time has passed or a discount rate has moved favourably.\n\nAnd it is **capped**: the increased carrying amount may not exceed what the carrying amount **would have been** had no impairment loss been recognised. That figure includes the **depreciation that would have been charged in the meantime**, so a reversal can never restore an asset above its **depreciated historical cost**.\n\nThe reversal is recognised in **profit or loss**, unless the asset is carried at a revalued amount, in which case it is treated as a revaluation increase.\n\nSo the topic has an asymmetry worth stating plainly: impairment can be reversed for most assets and never for goodwill.",
    earns: [
      "Explaining the prohibition through internally generated goodwill",
      "Knowing the reversal cap includes the depreciation that would have been charged",
    ],
    loses: ["Reversing goodwill impairment when recoverable amount recovers"],
  },

  /* ── FR-12 · Inventories and biological assets ─────────────── */

  "FR-12::cost-of-inventory": {
    title: "What is included in the cost of inventory",
    format: "ot",
    marks: 2,
    requirement:
      "Which cost should be **excluded** from the cost of inventory?\n\nA  Purchase price and import duties\nB  Conversion costs, including a systematic allocation of fixed production overheads\nC  Storage costs of finished goods awaiting sale\nD  Costs of bringing the inventory to its present location and condition",
    plan: [
      {
        step: "State what cost comprises",
        detail:
          "All costs of PURCHASE, costs of CONVERSION, and other costs incurred in bringing the inventories to their present location and condition.",
      },
      {
        step: "Name the specific exclusions",
        detail:
          "Abnormal waste, STORAGE costs unless necessary in the production process, administrative overheads not contributing to bringing inventory to its present condition, and selling costs.",
      },
      {
        step: "Split necessary storage from finished goods storage",
        detail:
          "Storage necessary to the production PROCESS — maturing whisky, seasoning timber — is included. Storage of finished goods awaiting sale is excluded, because the inventory is already in its present condition.",
      },
      {
        step: "Note the fixed overhead allocation rule",
        detail:
          "Fixed production overheads are allocated on NORMAL CAPACITY, not actual. So a period of low production does not increase the cost per unit — the unabsorbed amount is expensed.",
      },
    ],
    answer:
      "**C — storage costs of finished goods awaiting sale.**\n\nCost comprises costs of **purchase**, costs of **conversion**, and other costs incurred in bringing the inventories to their **present location and condition**.\n\nThe exclusions are specific: **abnormal waste**, **storage** costs unless necessary in the production process, **administrative** overheads not contributing to bringing inventory to its present condition, and **selling** costs.\n\nThe storage distinction is the one examined: storage **necessary to the production process** — maturing whisky, seasoning timber — **is** included, because the inventory is not yet in its final condition. Storage of **finished goods awaiting sale** is excluded, because the inventory is already in its present condition and the cost adds nothing to it.\n\nThe **fixed overhead** rule matters and is a favourite: fixed production overheads are allocated on the basis of **normal capacity**, not actual production. So a period of unusually **low** production does **not** increase the cost per unit — the unabsorbed overhead is **expensed**. That prevents idle capacity being capitalised into inventory.\n\nCost is measured by **FIFO** or **weighted average**; **LIFO is not permitted**.",
    earns: [
      "Splitting necessary process storage from finished goods storage",
      "Knowing fixed overheads are absorbed on normal capacity so idle capacity is expensed",
    ],
    loses: ["Including finished goods storage because it was incurred before sale"],
  },

  "FR-12::nrv": {
    title: "Applying the lower of cost and net realisable value",
    format: "ot",
    marks: 2,
    requirement:
      "Inventory comprises two lines: X at cost $30,000 with NRV $34,000, and Y at cost $20,000 with NRV $14,000. Inventory should be measured at:\n\nA  $50,000\nB  $48,000\nC  $44,000\nD  $54,000",
    plan: [
      {
        step: "Apply the rule line by line, not to the total",
        detail:
          "The comparison is made for each item or group of similar items separately. Comparing totals would let a profitable line absorb a loss-making one.",
      },
      {
        step: "Take the lower figure for each line",
        detail:
          "X: lower of $30,000 and $34,000 = $30,000. Y: lower of $20,000 and $14,000 = **$14,000**, written down by $6,000.",
      },
      {
        step: "Add the chosen figures",
        detail:
          "$30,000 + $14,000 = **$44,000**.",
      },
      {
        step: "Compute the aggregate answer to expose the trap",
        detail:
          "Total cost $50,000 against total NRV $48,000 would give $48,000 — option B. That understates the write-down by $4,000 by letting X's headroom absorb Y's loss.",
      },
    ],
    answer:
      "**C — $44,000.**\n\nApply the rule **line by line**:\n\nX: lower of $30,000 and $34,000 = **$30,000**\nY: lower of $20,000 and $14,000 = **$14,000** (written down $6,000)\n**Total $44,000**\n\nOption B, $48,000, is the trap: comparing **total cost** $50,000 with **total NRV** $48,000. That understates the write-down by $4,000 by letting X's **headroom absorb Y's loss** — and it recognises an unrealised profit on X, which is why aggregating is prohibited.\n\n**NRV** is the estimated selling price **less** the estimated costs of completion **and** the costs necessary to make the sale, so selling costs must be deducted before the comparison.\n\nA write-down is recognised as an **expense** in the period. A **reversal** is permitted where the circumstances that caused the write-down no longer exist — but only up to the **original cost**, so inventory can never be written back above cost.\n\nMaterials are not written below cost where the finished goods they will produce are expected to sell at or above cost.",
    earns: [
      "Applying the rule line by line and naming what aggregating conceals",
      "Knowing a reversal is permitted only up to original cost",
    ],
    loses: ["Comparing totals, which is the offered $48,000"],
  },

  "FR-12::biological": {
    title: "Measuring biological assets and agricultural produce",
    format: "ot",
    marks: 2,
    requirement:
      "Under IAS 41, a biological asset is measured at:\n\nA  Cost less accumulated depreciation\nB  Fair value less costs to sell, with changes recognised in profit or loss\nC  Fair value, with changes recognised in other comprehensive income\nD  The lower of cost and net realisable value",
    plan: [
      {
        step: "State the measurement basis and the destination",
        detail:
          "Fair value less costs to sell, both on initial recognition and at each reporting date, with changes recognised in PROFIT OR LOSS.",
      },
      {
        step: "See why the standard departs from cost",
        detail:
          "A biological asset transforms — it grows, degenerates and reproduces — so cost bears no relation to its value. Historical cost would report a mature herd at the cost of the calves.",
      },
      {
        step: "Note the consequence for profit",
        detail:
          "Gains are recognised as the asset GROWS, before any sale. So profit arises from biological transformation rather than from a transaction, which makes reported profit more volatile.",
      },
      {
        step: "Note what happens at harvest",
        detail:
          "Agricultural produce is measured at fair value less costs to sell AT HARVEST, and that becomes its cost on entering IAS 2 as inventory. IAS 41 stops at the point of harvest.",
      },
    ],
    answer:
      "**B — fair value less costs to sell, with changes recognised in profit or loss.**\n\nThe measurement applies **both on initial recognition and at each reporting date**, with changes going to **profit or loss** — not to other comprehensive income, which is what option C gets wrong.\n\nThe standard departs from cost because a biological asset **transforms**: it grows, degenerates, produces and reproduces. Cost therefore bears no relation to its value — historical cost would report a mature herd at the cost of the calves, which tells a user nothing.\n\nThe consequence for profit is worth stating: **gains are recognised as the asset grows**, before any sale occurs. So profit arises from **biological transformation** rather than from a transaction, and reported profit is more **volatile** than a cost-based measure would produce. That volatility is the standard's accepted cost for relevance.\n\nAt **harvest**, agricultural produce is measured at **fair value less costs to sell at that date**, and that amount becomes its **cost** on entering **IAS 2** as inventory. IAS 41 stops at the point of harvest, and everything after it is ordinary inventory accounting.\n\nWhere fair value cannot be measured reliably on initial recognition, cost less depreciation and impairment is used until it can.",
    earns: [
      "Explaining why cost is inappropriate for a transforming asset, and that gains arise before sale",
      "Knowing fair value at harvest becomes cost for IAS 2 purposes",
    ],
    loses: ["Routing fair value changes to other comprehensive income"],
  },

  /* ── FR-13 · IFRS 16 lessee accounting ─────────────────────── */

  "FR-13::identifying-a-lease": {
    title: "Whether a contract contains a lease",
    format: "ot",
    marks: 2,
    requirement:
      "A contract contains a lease if it conveys the right to control the use of an identified asset for a period in exchange for consideration. Control requires the right to:\n\nA  Own the asset at the end of the term\nB  Obtain substantially all the economic benefits from use, and direct the use of the asset\nC  Use the asset without restriction\nD  Purchase the asset at a discount",
    plan: [
      {
        step: "State the two limbs of control",
        detail:
          "The right to obtain substantially all the ECONOMIC BENEFITS from use of the identified asset, AND the right to DIRECT the use of it. Both are required.",
      },
      {
        step: "Note that ownership is irrelevant",
        detail:
          "A lease conveys a right of USE, not ownership. Requiring ownership would defeat the whole standard — the point of IFRS 16 is that a right of use is an asset.",
      },
      {
        step: "Note that the asset must be identified",
        detail:
          "Where the supplier has a SUBSTANTIVE RIGHT TO SUBSTITUTE the asset, there is no identified asset and therefore no lease. That is what distinguishes a lease from a service contract.",
      },
      {
        step: "Note why the distinction matters now",
        detail:
          "Under IFRS 16 a lessee recognises a right-of-use asset and a lease liability for almost all leases. So identifying a lease inside a contract puts assets and liabilities on the statement of financial position.",
      },
    ],
    answer:
      "**B — obtain substantially all the economic benefits from use, and direct the use of the asset.**\n\nBoth limbs are required: the right to obtain **substantially all the economic benefits** from use of the identified asset, **and** the right to **direct** its use.\n\n**Ownership is irrelevant.** A lease conveys a right of **use**, and requiring ownership would defeat the standard's whole purpose — IFRS 16 exists because a **right of use is an asset** even though the lessee owns nothing.\n\nThe asset must be **identified**, and this is what separates a lease from a **service** contract: where the supplier has a **substantive right to substitute** the asset, there is **no identified asset** and therefore no lease. So a contract for warehouse space in a specified unit may be a lease, while one for \"space in any of our warehouses\" is a service.\n\nWhy the distinction matters more than it used to: under IFRS 16 a lessee recognises a **right-of-use asset** and a **lease liability** for almost all leases, so finding a lease inside a contract puts both onto the statement of financial position — and changes gearing, EBITDA and asset turnover with it.\n\nThe old operating and finance lease split has gone **for lessees**, though it survives for lessors.",
    earns: [
      "Requiring both limbs, and using substitution rights to separate a lease from a service",
      "Knowing the operating/finance split survives for lessors but not lessees",
    ],
    loses: ["Requiring ownership or an option to purchase, neither of which a lease needs"],
  },

  "FR-13::initial-recognition": {
    title: "Measuring the lease liability and the right-of-use asset",
    format: "ot",
    marks: 2,
    requirement:
      "On commencement of a lease, the right-of-use asset is measured at the amount of the lease liability plus:\n\nA  Nothing further\nB  Initial direct costs, payments made at or before commencement, and any estimated dismantling or restoration costs, less lease incentives received\nC  The asset's fair value\nD  All lease payments over the term",
    plan: [
      {
        step: "Measure the liability first",
        detail:
          "The present value of the lease payments not yet paid, discounted at the rate implicit in the lease or, if not determinable, the lessee's INCREMENTAL BORROWING RATE.",
      },
      {
        step: "Build the asset from the liability",
        detail:
          "Liability, PLUS payments made at or before commencement, PLUS initial direct costs, PLUS estimated dismantling and restoration costs, LESS lease incentives received.",
      },
      {
        step: "Note why the two figures differ",
        detail:
          "The asset and the liability are equal only where none of those adjustments exists. Assuming they must be equal is the standard error.",
      },
      {
        step: "State the subsequent measurement of each",
        detail:
          "The ASSET is depreciated, normally over the shorter of the lease term and useful life. The LIABILITY is unwound at the discount rate, with the interest charged to profit or loss and payments reducing the balance.",
      },
    ],
    answer:
      "**B — initial direct costs, payments made at or before commencement, and any estimated dismantling or restoration costs, less lease incentives received.**\n\nThe **liability** comes first: the **present value** of the lease payments not yet paid, discounted at the **rate implicit in the lease** or, where that is not readily determinable, the lessee's **incremental borrowing rate**.\n\nThe **asset** is then built from it: liability **plus** payments made at or before commencement, **plus** initial direct costs, **plus** estimated dismantling and restoration costs, **less** lease incentives received.\n\nSo the asset and the liability are **equal only where none of those adjustments exists** — and assuming they must be equal is the standard error, because a question supplying a direct cost or an incentive is testing exactly that.\n\nSubsequent measurement runs on **two separate tracks**, which is the other thing to keep straight. The **asset** is **depreciated**, normally over the **shorter of the lease term and the useful life** — over the useful life where ownership transfers at the end. The **liability** is **unwound** at the discount rate, with the interest charged to profit or loss and the payments reducing the balance.\n\nThat is why the total expense is front-loaded: depreciation is even but interest falls.",
    earns: [
      "Building the asset from the liability and knowing they are rarely equal",
      "Knowing the asset and liability are measured on separate tracks afterwards",
    ],
    loses: ["Assuming the right-of-use asset equals the lease liability"],
  },

  "FR-13::exemptions": {
    title: "The recognition exemptions and how they work",
    format: "ot",
    marks: 2,
    requirement:
      "A lessee may elect not to recognise a right-of-use asset and lease liability for:\n\nA  Any lease it considers immaterial\nB  Short-term leases of twelve months or less, and leases of low-value assets\nC  All leases of property\nD  Leases where the asset is not owned at the end of the term",
    plan: [
      {
        step: "State the two exemptions precisely",
        detail:
          "SHORT-TERM leases — a term of twelve months or less at commencement, with no purchase option — and leases of LOW-VALUE assets. Both are elections, not requirements.",
      },
      {
        step: "State what happens if the exemption is taken",
        detail:
          "The payments are recognised as an EXPENSE on a straight line basis over the lease term. So the effect resembles the old operating lease treatment.",
      },
      {
        step: "Note how each election is applied",
        detail:
          "The short-term exemption is applied by CLASS of underlying asset. The low-value exemption is applied LEASE BY LEASE. That difference is examined directly.",
      },
      {
        step: "Note the purchase option point",
        detail:
          "A lease containing a purchase option is NOT short-term regardless of its length, because the option indicates the lessee may obtain the asset itself.",
      },
    ],
    answer:
      "**B — short-term leases of twelve months or less, and leases of low-value assets.**\n\nTwo exemptions, both **elections** rather than requirements. A **short-term** lease has a term of **twelve months or less at commencement** and contains **no purchase option** — and the purchase option condition matters, because a lease with one is **not short-term regardless of its length**, since the option indicates the lessee may obtain the asset itself.\n\nA **low-value** asset lease covers items such as laptops, phones and small office equipment.\n\nWhere an exemption is taken, the payments are recognised as an **expense on a straight line basis** over the lease term — so the effect resembles the old operating lease treatment, which is why these exemptions exist at all.\n\nHow each election is applied differs, and it is examined directly: the **short-term** exemption is applied **by class of underlying asset**, so it must be taken consistently across similar assets. The **low-value** exemption is applied **lease by lease**.\n\nOption A is wrong as stated: materiality is a general concept, not a recognition exemption in the standard, so an entity cannot elect out of a material lease by calling it immaterial.",
    earns: [
      "Knowing a purchase option disqualifies the short-term exemption whatever the length",
      "Knowing one exemption applies by class and the other lease by lease",
    ],
    loses: ["Treating materiality as an exemption in the standard"],
  },
}
