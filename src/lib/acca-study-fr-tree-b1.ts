import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 7 and 8: IAS 16 Property, plant and equipment.
 *
 * Two chapters, not one, and the split is at the point where the examinable difficulty
 * changes. Chapter 7 is RECOGNITION AND COST — what goes into the figure, which is a list
 * of inclusions and exclusions plus one genuinely tricky area (subsequent expenditure).
 * Chapter 8 is DEPRECIATION AND REVALUATION, which is where the arithmetic and the double
 * entry live, and where most marks are lost.
 *
 * IAS 16 is worth splitting because it is the most frequently examined standard in FR. It
 * appears in Section A almost every sitting, it is a standing candidate for a Section B
 * case, and it is embedded in every Section C preparation question — a trial balance
 * without a depreciation adjustment has not been set.
 *
 * All figures in the worked examples were verified by script before authoring.
 * All wording is ORIGINAL Scholify teaching text.
 */

export const FR_TREE_07: StudyChapter = {
  id: "FR-07",
  number: 7,
  paper: "FR",
  area: "B",
  title: "IAS 16: recognition, initial cost and subsequent expenditure",
  minutes: 18,
  syllabusRefs: ["B1(a)", "B1(b)", "B1(c)"],
  intro:
    "Almost every mark in the first half of IAS 16 comes from deciding whether one specific cost belongs in the asset or in the income statement.",
  outcomes: [
    "Apply the recognition criteria for an item of property, plant and equipment",
    "Build the initial cost of an asset, distinguishing directly attributable costs from those excluded",
    "Apply the 2020 amendment on proceeds from items produced before an asset is ready for use",
    "Include a dismantling obligation in cost, and explain the corresponding provision",
    "Distinguish subsequent expenditure that is capitalised from repairs, and apply component accounting",
  ],
  sections: [
    {
      id: "recognition",
      heading: "What qualifies as property, plant and equipment",
      blocks: [
        {
          kind: "definition",
          term: "Property, plant and equipment",
          md: "Tangible items **held for use** in the production or supply of goods or services, for rental to others, or for administrative purposes, and **expected to be used during more than one period**.",
        },
        {
          kind: "list",
          title: "What that definition excludes, and where those items go instead",
          items: [
            "**Held for SALE in the ordinary course of business** → inventory, IAS 2. A property developer's buildings are inventory, not PPE.",
            "**Held to earn rentals or for capital appreciation** → investment property, IAS 40. Note the overlap: PPE includes assets held for rental to others, so the distinction turns on whether the property is owner-occupied or held as an investment.",
            "**Intangible** → IAS 38. A licence to operate a plant is intangible even though the plant is not.",
            "**Held for sale as a single asset or disposal group, with a plan to sell** → IFRS 5, at which point depreciation stops.",
          ],
        },
        {
          kind: "text",
          md: "Recognition follows the framework: the cost of an item is recognised as an asset if it is **probable** that future economic benefits will flow to the entity and the **cost can be measured reliably**. In practice for PPE, both are almost always satisfied at the point of purchase, so recognition is rarely the difficulty. Measurement is.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Two recognition points that DO get examined",
          md: "**Safety and environmental assets.** Equipment acquired only to comply with a regulation may produce no direct benefit at all — a chemical plant's new filtration unit does not increase output. It is still recognised, because without it the entity could not operate the rest of the plant, so the benefits flow indirectly. Test the asset as part of the operation, not in isolation.\n\n**Spare parts and servicing equipment.** These are inventory when consumed within a period, but PPE when the entity expects to use them over more than one period. A major spare rotor held for a turbine, expected to be used in five years' time, is PPE and is depreciated.",
        },
      ],
    },
    {
      id: "initial-cost",
      heading: "Building the initial cost",
      blocks: [
        {
          kind: "table",
          caption: "In the cost of the asset, or not",
          head: ["Item", "Treatment", "Why"],
          rows: [
            ["Purchase price **net of trade discounts and rebates**", "**INCLUDE**", "Cost is what the entity actually gave up"],
            ["Import duties and **non-refundable** purchase taxes", "**INCLUDE**", "Unavoidable to obtain the asset. Refundable VAT is excluded — it is recovered"],
            ["Delivery and handling", "**INCLUDE**", "Directly attributable to bringing the asset to its location"],
            ["Site preparation, installation and assembly", "**INCLUDE**", "Directly attributable to bringing it to working condition"],
            ["**Professional fees** — architects, engineers, legal fees on a property purchase", "**INCLUDE**", "Directly attributable"],
            ["**Testing** whether the asset functions properly", "**INCLUDE**", "Part of bringing it to the condition necessary for its intended use"],
            ["**Employee costs** arising directly from construction or acquisition", "**INCLUDE**", "Directly attributable; but only the directly attributable element"],
            ["Initial estimate of **dismantling and site restoration**, discounted", "**INCLUDE**", "IAS 16 requires it, with a matching provision under IAS 37"],
            ["**Staff training** on how to operate the asset", "**EXCLUDE — expense**", "The benefit attaches to the employees, who can leave. The entity does not control it"],
            ["**Administration and other general overheads**", "**EXCLUDE — expense**", "Not directly attributable to this asset"],
            ["**Advertising and promotional** costs for the new operation", "**EXCLUDE — expense**", "Relates to selling the output, not to acquiring the asset"],
            ["Costs of **relocating or reorganising** part of the operation", "**EXCLUDE — expense**", "Expressly excluded by IAS 16"],
            ["**Operating losses** while demand builds up", "**EXCLUDE — expense**", "The asset is already available for use; these are trading losses"],
            ["**Maintenance contracts** and insurance", "**EXCLUDE — expense**", "Cost of running the asset, not of acquiring it"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The 2020 amendment: proceeds from items produced during testing",
          md: "This is a change of treatment and it is examined precisely because candidates learned the old rule.\n\nWhen an entity tests an asset and the testing produces saleable output — a mine's first ore, a plant's trial production run — the **proceeds and the cost of those items go to PROFIT OR LOSS**. They are **not** deducted from the cost of the asset.\n\nThe old treatment netted the proceeds against cost, which had the odd effect that two entities with identical assets reported different carrying amounts because one happened to sell its trial output. If a question gives you \"proceeds from selling samples produced while testing the machine\", the answer is revenue in profit or loss and no reduction in cost. The cost of producing those items is measured under IAS 2 and expensed against the revenue.",
        },
        {
          kind: "example",
          title: "Building the cost of a machine",
          scenario:
            "Kestrel Co acquired a machine during the year. The following costs were incurred:\n\n  List price                                                    $840,000\n  Trade discount obtained                                       5%\n  Import duties                                                 $32,000\n  Non-refundable purchase taxes                                 $18,000\n  Delivery to the factory                                       $14,000\n  Installation and assembly by the supplier's engineers         $26,000\n  Preparation of the factory floor and services                 $22,000\n  Testing that the machine functions properly                   $9,000\n  Proceeds from selling samples produced during testing         $3,000\n  Training the production team to operate the machine           $12,000\n  Apportioned general administrative overheads                  $8,000\n  Three-year maintenance contract, paid in advance              $15,000\n\nThe machine must be dismantled and the site restored at the end of its life. The present value of that obligation is $40,000.\n\nCalculate the initial cost of the machine.",
          steps: [
            { label: "Start with the purchase price net of trade discount", detail: "$840,000 × 95% = $798,000. The discount is deducted because cost is what the entity gave up, not what was invoiced before discount." },
            { label: "Add the unavoidable taxes and duties", detail: "Import duties $32,000 and non-refundable purchase taxes $18,000. Running total $848,000. Had the tax been refundable it would be excluded — the entity recovers it and so has not given it up." },
            { label: "Add the costs of getting it there and working", detail: "Delivery $14,000, installation and assembly $26,000, site preparation $22,000. Running total $910,000. All directly attributable to bringing the asset to its location and working condition." },
            { label: "Add testing — but not net of the sample proceeds", detail: "Testing $9,000 is included, giving $919,000. The $3,000 of sample proceeds goes to PROFIT OR LOSS as revenue, with the cost of producing the samples expensed. Deducting it would give $916,000, which is the trap." },
            { label: "Add the dismantling obligation at present value", detail: "$40,000, giving $959,000. The corresponding entry is a PROVISION under IAS 37, which will then be unwound to its future value through finance costs over the asset's life." },
            { label: "Exclude the four remaining items", detail: "Training $12,000 — the benefit attaches to employees the entity does not control. General overheads $8,000 — not directly attributable. Maintenance contract $15,000 — cost of running, not acquiring, and it is also a prepayment spread over three years. All are expensed (the maintenance over the contract term)." },
          ],
          result:
            "**Initial cost $959,000.** The two figures a marker is watching for are the $40,000 dismantling provision, which candidates omit, and the $3,000 sample proceeds, which candidates deduct. Getting both right is worth more than the ten easy additions.",
        },
      ],
      check: {
        q: "During the commissioning of a new plant, an entity sells trial production output for $50,000. Under IAS 16 as amended, how is this treated?",
        options: [
          "Recognised as revenue in profit or loss, with the cost of the items expensed",
          "Deducted from the cost of the plant",
          "Credited to other comprehensive income",
          "Deferred and released over the plant's useful life",
        ],
        correct: 0,
        explain:
          "The 2020 amendment requires proceeds from selling items produced before an asset is ready for its intended use to be recognised in profit or loss, with the cost of those items measured under IAS 2 and expensed. Deducting the proceeds from cost is the superseded treatment.",
      },
    },
    {
      id: "subsequent-expenditure",
      heading: "Subsequent expenditure, and component accounting",
      blocks: [
        {
          kind: "text",
          md: "Once an asset is in use, further spending on it must be either **capitalised** — added to the carrying amount — or **expensed**. The test is the recognition criteria again: does the expenditure produce future economic benefits beyond those already expected from the asset?",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Capitalise, or expense",
            data: {
              leftTitle: "CAPITALISE",
              rightTitle: "EXPENSE",
              rows: [
                { aspect: "Effect on the asset", left: "Enhances it — greater capacity, longer life, better quality of output, lower running costs", right: "Restores it to its previously assessed standard of performance" },
                { aspect: "Typical description", left: "Upgrade, extension, modification, major inspection or overhaul that was identified as a component", right: "Repair, service, redecoration, replacement of a worn part with an identical one" },
                { aspect: "The question to ask", left: "Does the entity now expect MORE than it did before?", right: "Is the entity merely getting back what it already expected?" },
                { aspect: "Watch for", left: "Expenditure that includes both — split it if the elements can be identified", right: "\"Major\" repairs. Size does not make a repair an asset" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Replacement: derecognise the old part first",
          md: "This is the step candidates skip. When a significant part of an asset is replaced and the new part is capitalised, the **carrying amount of the part replaced must be DERECOGNISED**, whether or not it was accounted for as a separate component.\n\nIf the replaced part's carrying amount is not separately known, IAS 16 permits using the cost of the replacement as an indication of what the old part cost when acquired, depreciated to the date of replacement. Failing to remove the old part leaves the asset carrying two roofs, two engines, or two furnace linings — and overstates assets by exactly the amount of the omission.",
        },
        {
          kind: "text",
          md: "**Component accounting** follows from the same idea. Where an item of PPE has parts with **significantly different useful lives**, each significant part is depreciated separately. An aircraft is not one asset with one life: the airframe may run 25 years, the engines 8 years, and the interior fittings 5 years. Depreciating the whole cost over 25 years would understate the charge in early years and leave a fully depreciated interior still carried at cost.",
        },
        {
          kind: "example",
          title: "A furnace relining, done properly",
          scenario:
            "Warbler Co owns a furnace bought five years ago for $3,000,000, depreciated over 20 years on the straight line basis with no residual value. The furnace requires a new lining every five years; the original lining's cost is not separately recorded. A new lining has just been fitted at a cost of $500,000, and the entity expects the furnace to continue for its remaining 15 years.",
          steps: [
            { label: "Decide whether to capitalise the new lining", detail: "The lining is a significant part with a life (five years) very different from the furnace as a whole (20 years). It should have been treated as a separate component from the start, and the replacement is capitalised — the entity now expects five more years of operation it did not have without it." },
            { label: "Identify the carrying amount of the OLD lining", detail: "It was not separately recorded, so IAS 16 permits using the replacement cost as an indication of the original cost of the part: take $500,000 as the old lining's cost when the furnace was acquired." },
            { label: "Depreciate that notional cost to the date of replacement", detail: "The old lining had a five-year life and has been in use for five years, so it is fully depreciated. Its carrying amount is NIL and there is nothing to derecognise." },
            { label: "Vary the facts to see why the step matters", detail: "Suppose instead the lining had been replaced after only three years because of an unexpected failure. The old lining's carrying amount would be $500,000 × 2/5 = $200,000, which must be DERECOGNISED as a loss in profit or loss. Capitalising the new lining without removing the old would overstate PPE by $200,000 and overstate profit by the same." },
            { label: "Set up the ongoing accounting", detail: "Carry the lining as a separate component of $500,000 depreciated over five years, $100,000 a year. The remainder of the furnace continues on its original basis: $2,500,000 over 20 years is $125,000 a year, of which 15 years remain." },
          ],
          result:
            "**Capitalise $500,000 as a component depreciated over five years; nothing to derecognise here because the old lining was fully depreciated.** The examinable discipline is that the derecognition step must be CONSIDERED every time, even when the answer is nil — because when the replacement is early, it is not nil, and that is the version that appears in a Section C question.",
        },
        {
          kind: "activity",
          title: "Capitalise or expense?",
          prompt:
            "Classify each, with a reason:\n\n(i) $180,000 spent replacing a factory roof with an identical specification, after storm damage.\n(ii) $250,000 spent adding a mezzanine floor to a warehouse, increasing storage capacity by 30%.\n(iii) $40,000 annual service of a production line, required by the manufacturer.\n(iv) $310,000 on a five-yearly statutory inspection of a ship, without which it cannot sail. The entity treats the inspection as a component.\n(v) $95,000 repainting the head office.",
          answer:
            "(i) CAPITALISE the new roof and DERECOGNISE the old one. It restores rather than enhances, which sounds like a repair — but a roof is a significant part with its own life, so the replacement is capitalised and the remaining carrying amount of the old roof is written off. The insurance recovery, if any, is accounted for separately and not netted against the cost.\n\n(ii) CAPITALISE. Capacity has increased, so the entity expects benefits beyond those originally assessed. Textbook enhancement.\n\n(iii) EXPENSE. Routine servicing restores the previously assessed standard of performance. Being contractually required does not change that.\n\n(iv) CAPITALISE, as a component depreciated over five years to the next inspection, and derecognise the carrying amount of the previous inspection component. This is the classic major-inspection treatment, and note that it works only because the entity identified the inspection as a component — otherwise there would be nothing to derecognise and the cost would be an expense.\n\n(v) EXPENSE. Redecoration maintains; it does not enhance.\n\nThe pattern worth taking away: 'restores' points to expense UNLESS the thing restored is a significant part with its own life, in which case capitalise-and-derecognise.",
        },
      ],
      check: {
        q: "An entity replaces a significant component of a machine. The new part costs $120,000 and is capitalised. The old part had a carrying amount of $35,000. What is the effect on profit or loss?",
        options: [
          "A loss of $35,000 on derecognition of the old component",
          "No effect — the whole $120,000 is capitalised",
          "A loss of $120,000, since the replacement restores performance",
          "A loss of $85,000, being the excess of the new cost over the old carrying amount",
        ],
        correct: 0,
        explain:
          "The new component is capitalised at $120,000 and the carrying amount of the part replaced must be derecognised, giving a $35,000 loss in profit or loss. Failing to derecognise leaves the asset carrying both components and overstates both assets and profit.",
      },
    },
  ],
  examTraps: [
    { trap: "Deducting proceeds from trial production from the cost of the asset.", fix: "Since the 2020 amendment they go to profit or loss as revenue, with the cost of the items expensed. Cost is unaffected." },
    { trap: "Omitting the discounted dismantling obligation from cost.", fix: "IAS 16 requires the initial estimate to be included, with a matching IAS 37 provision that then unwinds through finance costs." },
    { trap: "Capitalising staff training.", fix: "The benefit attaches to employees the entity does not control. Expense it — the same reasoning that keeps a workforce off the balance sheet." },
    { trap: "Capitalising initial operating losses or advertising for the new operation.", fix: "The asset is already available for use; these relate to trading, not to acquisition." },
    { trap: "Capitalising a replacement without derecognising the part replaced.", fix: "Always consider the derecognition. Where the old part's carrying amount is unknown, use the replacement cost as an indication of its original cost, depreciated to date." },
    { trap: "Treating a large repair as capital because of its size.", fix: "The test is enhancement against restoration, not amount. A $2m repair that restores previously assessed performance is an expense." },
    { trap: "Including refundable VAT in cost.", fix: "Only NON-refundable purchase taxes are included. Refundable tax is recovered, so nothing was given up." },
  ],
  keyTerms: [
    { term: "Property, plant and equipment", def: "Tangible items held for use in production or supply of goods or services, for rental to others or for administration, expected to be used for more than one period." },
    { term: "Directly attributable costs", def: "Costs of bringing an asset to the location and condition necessary for its intended use — delivery, installation, site preparation, testing, professional fees and directly attributable employee costs." },
    { term: "Dismantling provision", def: "The initial estimate of the cost of dismantling and removing an item and restoring the site, discounted to present value, included in cost with a matching IAS 37 provision." },
    { term: "Subsequent expenditure", def: "Spending on an asset after initial recognition; capitalised only where it produces benefits beyond those originally assessed, otherwise expensed." },
    { term: "Component accounting", def: "Depreciating separately each significant part of an item of PPE that has a useful life different from that of the item as a whole." },
    { term: "Derecognition of a replaced part", def: "Removing the carrying amount of a part that has been replaced, whether or not it was separately identified as a component." },
  ],
  summary: [
    "PPE is tangible, held for use (not for sale or as an investment), and expected to last more than one period.",
    "Cost includes purchase price net of trade discount, non-refundable taxes and duties, delivery, installation, site preparation, testing, professional fees, directly attributable employee costs and the discounted dismantling obligation.",
    "Cost EXCLUDES training, general overheads, advertising, relocation, initial operating losses, maintenance and insurance.",
    "Proceeds from items produced during testing go to profit or loss and do NOT reduce cost — the 2020 amendment.",
    "Subsequent expenditure is capitalised only if it enhances; restoration is an expense unless the part restored is a significant component.",
    "Every capitalised replacement requires the carrying amount of the part replaced to be derecognised.",
    "Significant parts with different useful lives are depreciated separately.",
  ],
  knowledgeDiagnostic: [
    { q: "Is staff training on a new machine part of its cost?", a: "No. The benefit attaches to employees the entity does not control, so it is expensed." },
    { q: "An entity sells output produced while testing a new plant. What happens to the proceeds?", a: "They are recognised in profit or loss, with the cost of the items expensed. They do not reduce the cost of the plant." },
    { q: "How is a dismantling obligation dealt with on initial recognition?", a: "The discounted estimate is included in the cost of the asset, with a matching provision under IAS 37 that unwinds to finance costs over the asset's life." },
    { q: "What must happen when a capitalised component is replaced?", a: "The carrying amount of the part replaced is derecognised, using the replacement cost as an indication of its original cost if not separately recorded." },
    { q: "When are significant parts of an asset depreciated separately?", a: "When they have useful lives significantly different from that of the item as a whole." },
  ],
  furtherStudy: [
    "Chapter 8 — depreciating and revaluing the asset whose cost this chapter built",
    "Chapter 9 — IAS 23, which adds capitalised borrowing costs to the cost of a qualifying asset",
    "Chapter 17 — IAS 37, the source of the dismantling provision and of its unwinding",
  ],
}

export const FR_TREE_08: StudyChapter = {
  id: "FR-08",
  number: 8,
  paper: "FR",
  area: "B",
  title: "IAS 16: depreciation and the revaluation model",
  minutes: 20,
  syllabusRefs: ["B1(d)", "B1(e)", "B1(f)", "B1(g)"],
  intro:
    "Depreciation is not a valuation exercise, and a revaluation gain is not profit. Both misconceptions cost marks every sitting.",
  outcomes: [
    "Calculate depreciation on the straight line and reducing balance bases, including part-year charges",
    "Account for a change in useful life, residual value or method as a change in estimate",
    "Account for an upward revaluation, including the surplus in other comprehensive income",
    "Account for a downward revaluation, splitting it correctly between OCI and profit or loss",
    "Deal with the transfer of excess depreciation and with the disposal of a revalued asset",
  ],
  sections: [
    {
      id: "depreciation",
      heading: "Depreciation: what it is, and what it is not",
      blocks: [
        {
          kind: "definition",
          term: "Depreciation",
          md: "The **systematic allocation of the depreciable amount** of an asset **over its useful life**. Depreciable amount is cost (or revalued amount) **less residual value**.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Depreciation is allocation, not valuation",
          md: "This distinction answers a whole family of exam statements.\n\n**\"The asset's market value exceeds its carrying amount, so no depreciation is needed.\"** Wrong. Depreciation allocates cost over the period the entity consumes the asset's benefits. A rising market value does not mean the entity has consumed nothing.\n\n**\"The asset is fully depreciated but still in use, so we should stop.\"** The charge does stop — the depreciable amount is exhausted — but this is a signal that the useful life estimate was wrong and should have been revised earlier.\n\n**\"Depreciation provides cash for replacement.\"** No. It is a non-cash allocation. It reduces distributable profit, which may indirectly preserve cash, but it creates no fund.",
        },
        {
          kind: "list",
          title: "Rules that generate Section A questions",
          items: [
            "**Depreciation begins when the asset is AVAILABLE for use** — in the location and condition necessary for its intended use — not when it is actually brought into use. An installed machine idle awaiting an order is depreciated.",
            "**Depreciation continues while the asset is idle** or retired from active use, unless it is fully depreciated. It stops only on derecognition, or on classification as held for sale under IFRS 5.",
            "**LAND is not depreciated**, because its useful life is indefinite. A building on it is. Where land and buildings are acquired together, the cost must be split.",
            "**The residual value and useful life must be reviewed at least at each financial year end**, and the depreciation method too.",
            "**Depreciation is charged even if the asset is revalued upwards** — on the revalued amount over the remaining life.",
          ],
        },
        {
          kind: "example",
          title: "A change in estimate",
          scenario:
            "Linnet Co bought a machine on 1 January 20X1 for $600,000, estimating a ten-year useful life and a residual value of $50,000. It depreciates on the straight line basis. On 1 January 20X5, following a review, the directors conclude that the machine will last only four more years and that its residual value will be $30,000.",
          steps: [
            { label: "Compute the original annual charge", detail: "($600,000 − $50,000) ÷ 10 = $55,000 a year." },
            { label: "Compute the carrying amount at the date of change", detail: "Four years have been charged: $600,000 − (4 × $55,000) = $600,000 − $220,000 = $380,000." },
            { label: "Identify what kind of change this is", detail: "A change in ACCOUNTING ESTIMATE under IAS 8, not a change of policy and not an error. So it is applied PROSPECTIVELY — prior periods are not restated and no comparative is adjusted." },
            { label: "Compute the revised charge", detail: "The new depreciable amount is the current carrying amount less the revised residual: ($380,000 − $30,000) ÷ 4 remaining years = $87,500 a year." },
            { label: "Note the trap", detail: "The commonest wrong answer recomputes from ORIGINAL cost: ($600,000 − $30,000) ÷ 8 total revised years = $71,250, or applies the new life to cost without deducting accumulated depreciation. Always start from the CURRENT carrying amount." },
          ],
          result:
            "**$87,500 a year for the remaining four years, applied prospectively.** No restatement, and the change is disclosed — its nature and amount — under IAS 8.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "A change of METHOD is also a change of estimate",
          md: "Switching from reducing balance to straight line is **not** a change of accounting policy, even though it feels like one. IAS 16 treats the depreciation method as reflecting the expected pattern of consumption of benefits, so a change of method is a change in **estimate** — prospective, no restatement.\n\nThis is a favourite two-mark Section A question, and the wrong answer (retrospective restatement) is chosen more often than the right one.",
        },
      ],
      check: {
        q: "An entity changes its depreciation method for plant from reducing balance to straight line. How is the change accounted for?",
        options: [
          "Prospectively, as a change in accounting estimate, with no restatement of comparatives",
          "Retrospectively, as a change in accounting policy, restating comparatives",
          "Retrospectively, as the correction of a prior period error",
          "Prospectively, but only from the start of the next accounting period",
        ],
        correct: 0,
        explain:
          "The depreciation method reflects the expected pattern of consumption of the asset's benefits, so a change of method is a change in accounting ESTIMATE. It is applied prospectively from the date of change, with disclosure of its nature and amount.",
      },
    },
    {
      id: "revaluation-up",
      heading: "The revaluation model, and an upward revaluation",
      blocks: [
        {
          kind: "text",
          md: "IAS 16 permits an accounting policy choice for each **class** of PPE: the **cost model** (cost less accumulated depreciation and impairment) or the **revaluation model** (fair value at the date of revaluation, less subsequent depreciation and impairment).",
        },
        {
          kind: "list",
          title: "The conditions attached to the revaluation model",
          items: [
            "It must be applied to the **WHOLE CLASS**, not to selected assets. An entity cannot revalue the three properties that have risen and leave the two that have fallen at cost — that would be exactly the bias neutrality prohibits.",
            "Revaluations must be **kept up to date**, with a frequency depending on how volatile fair values are. Some classes need annual revaluation; others every three to five years.",
            "The asset continues to be **depreciated**, over its remaining useful life, on the revalued amount.",
            "It is an **accounting policy** choice, so moving from cost to revaluation is a change of policy — but IAS 8 exempts the first adoption of the revaluation model from retrospective restatement. It is applied from the date of revaluation.",
          ],
        },
        {
          kind: "formula",
          name: "Accounting for a revaluation",
          expr: "UPWARD (a gain)\n   Dr  Asset (to bring carrying amount to fair value)\n   Cr  Other comprehensive income  →  REVALUATION SURPLUS in equity\n\n   ... unless it REVERSES a previous downward revaluation of the\n   same asset that was charged to profit or loss, in which case\n   credit profit or loss up to the amount of that earlier charge,\n   and take only the excess to OCI.\n\nDOWNWARD (a loss)\n   Dr  Other comprehensive income, to the extent of any credit\n       balance in the revaluation surplus FOR THAT ASSET\n   Dr  Profit or loss, with any remaining amount\n   Cr  Asset\n\nEACH ASSET IS TRACKED SEPARATELY. A surplus on one asset cannot\nabsorb a deficit on another.",
          note: "The single most important word in this is 'asset'. The revaluation surplus is not a general reserve to be drawn on: the offset is available only against the surplus previously recognised on the SAME asset.",
        },
        {
          kind: "example",
          title: "An upward revaluation, and the years that follow",
          scenario:
            "Redwing Co bought a building on 1 January 20X1 for $2,000,000 and depreciates it over 50 years on the straight line basis with no residual value. On 31 December 20X4 it adopts the revaluation model for its properties. The building's fair value at that date is $2,300,000.",
          steps: [
            { label: "Compute the carrying amount immediately before revaluation", detail: "Annual depreciation $2,000,000 ÷ 50 = $40,000. Four years charged: $160,000. Carrying amount $2,000,000 − $160,000 = $1,840,000." },
            { label: "Compute and record the surplus", detail: "$2,300,000 − $1,840,000 = $460,000. Dr Building $460,000, Cr Other comprehensive income $460,000, accumulating in the revaluation surplus within equity. It does NOT go to profit or loss, so it does not increase EPS or distributable profit." },
            { label: "Recompute depreciation for the remaining life", detail: "46 years remain. $2,300,000 ÷ 46 = $50,000 a year, up from $40,000. Revaluing an asset upwards INCREASES the future depreciation charge and so reduces future reported profit — a point Section C interpretation questions turn on." },
            { label: "Deal with the excess depreciation transfer", detail: "The charge is now $10,000 a year higher than it would have been under the cost model. IAS 16 PERMITS a transfer of that excess from the revaluation surplus to retained earnings each year: $10,000, a reserve-to-reserve movement in the statement of changes in equity. It is optional, it never touches profit or loss, and its purpose is to make the surplus available for distribution as it is realised through use." },
            { label: "State the disclosure", detail: "The effective date of revaluation, whether an independent valuer was involved, the carrying amount that would have been recognised under the cost model, and the movement on the revaluation surplus for the period." },
          ],
          result:
            "**Surplus $460,000 to OCI; depreciation rises from $40,000 to $50,000; an optional $10,000 annual transfer to retained earnings.** The point most often missed is the last one — the transfer is between reserves, never through profit.",
        },
      ],
      check: {
        q: "An asset with a carrying amount of $1,840,000 is revalued to $2,300,000. Its remaining useful life is 46 years. What is the effect on profit or loss in the year of revaluation and in the following year?",
        options: [
          "No gain in profit or loss in either year; the annual depreciation charge rises from $40,000 to $50,000",
          "A gain of $460,000 in profit or loss in the year of revaluation, then depreciation of $50,000",
          "No gain in profit or loss; depreciation continues at $40,000 because cost has not changed",
          "A gain of $460,000 in other comprehensive income and a matching $460,000 credit to retained earnings",
        ],
        correct: 0,
        explain:
          "The $460,000 surplus goes to other comprehensive income, not profit or loss. Depreciation is then charged on the revalued amount over the remaining life: $2,300,000 ÷ 46 = $50,000. Any transfer of the $10,000 excess depreciation is between reserves and never passes through profit.",
      },
    },
    {
      id: "revaluation-down",
      heading: "Downward revaluations, and disposal",
      blocks: [
        {
          kind: "example",
          title: "A fall in value, and the line between OCI and profit",
          scenario:
            "Continuing from the previous example. Redwing carries the building at $2,300,000 from 31 December 20X4, depreciating $50,000 a year, and makes the optional $10,000 annual transfer to retained earnings. On 31 December 20X9 — five years later — the building's fair value has fallen to $1,700,000.",
          steps: [
            { label: "Compute the carrying amount before the new revaluation", detail: "$2,300,000 − (5 × $50,000) = $2,300,000 − $250,000 = $2,050,000." },
            { label: "Compute the fall", detail: "$2,050,000 − $1,700,000 = $350,000." },
            { label: "Find the revaluation surplus remaining ON THIS ASSET", detail: "Original surplus $460,000, less five annual transfers of $10,000 = $410,000." },
            { label: "Allocate the fall", detail: "The loss of $350,000 is less than the $410,000 surplus available, so the WHOLE loss goes to other comprehensive income, reducing the surplus to $60,000. Nothing reaches profit or loss." },
            { label: "Vary the facts to find the boundary", detail: "Had fair value been $1,600,000, the fall would be $450,000. The first $410,000 goes to OCI, extinguishing the surplus, and the remaining $40,000 is charged to PROFIT OR LOSS. The surplus is the buffer, and only the excess over it hits earnings." },
            { label: "Note what the transfers did", detail: "The optional transfers reduced the buffer from $460,000 to $410,000, so an entity that made them absorbs less of a future fall in OCI. That is a real consequence of an optional policy, and a good discussion point." },
          ],
          result:
            "**All $350,000 to other comprehensive income; the surplus falls to $60,000.** At a fair value of $1,600,000 instead, $410,000 would go to OCI and $40,000 to profit or loss. The buffer is asset-specific — a surplus on a different building could not have absorbed any of it.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Disposal of a revalued asset: two things happen, and they are separate",
          md: "**The gain or loss on disposal** is proceeds less carrying amount, recognised in **profit or loss**. The carrying amount used is the revalued figure less subsequent depreciation — so an asset revalued upwards shows a SMALLER gain on disposal than it would have under the cost model.\n\n**The revaluation surplus** relating to that asset is transferred **directly to retained earnings**. It is a reserve-to-reserve transfer within the statement of changes in equity, and it does **not** pass through profit or loss.\n\nThe error is to recycle the surplus into profit on disposal, which double counts: the uplift was already recognised in OCI when it arose. IAS 16 does not permit recycling, and this is the difference between a revaluation surplus and, say, a cash flow hedge reserve.",
        },
        {
          kind: "activity",
          title: "Trace a full revaluation history",
          prompt:
            "An asset cost $900,000 with a 30-year life and no residual value.\n\n· After 10 years it is revalued to $800,000.\n· After a further 5 years it is revalued to $500,000.\n· After a further 2 years it is sold for $520,000.\n\nNo excess depreciation transfers are made. Set out the effect on profit or loss and on other comprehensive income at each date.",
          answer:
            "AFTER 10 YEARS. Depreciation $900,000 ÷ 30 = $30,000 a year; carrying amount $900,000 − $300,000 = $600,000. Revalued to $800,000, so a surplus of $200,000 to OCI. Remaining life 20 years, so depreciation becomes $800,000 ÷ 20 = $40,000 a year.\n\nAFTER A FURTHER 5 YEARS. Carrying amount $800,000 − (5 × $40,000) = $600,000. Fair value $500,000, so a fall of $100,000. The surplus on this asset is $200,000, which is more than enough, so the whole $100,000 goes to OCI and the surplus falls to $100,000. Nothing in profit or loss. Remaining life 15 years, so depreciation becomes $500,000 ÷ 15 = $33,333 a year.\n\nAFTER A FURTHER 2 YEARS. Carrying amount $500,000 − (2 × $33,333) = $433,334. Sold for $520,000, giving a gain on disposal of $86,666 in PROFIT OR LOSS. Separately, the remaining revaluation surplus of $100,000 is transferred to retained earnings within equity — not to profit.\n\nThe two things to check in your own answer: that the $100,000 fall never touched profit because the buffer covered it, and that the $100,000 surplus went to retained earnings rather than being recycled into the disposal gain.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Not depreciating an asset because its market value exceeds carrying amount.", fix: "Depreciation allocates cost over the period of consumption. It is not a valuation adjustment." },
    { trap: "Starting depreciation when the asset is first used rather than when available for use.", fix: "The charge begins when the asset is in the location and condition necessary for its intended use, even if idle." },
    { trap: "Recomputing a revised depreciation charge from original cost.", fix: "Start from the CURRENT carrying amount, deduct the revised residual, and divide by the revised remaining life." },
    { trap: "Treating a change of depreciation method as a change of policy.", fix: "It is a change of ESTIMATE — prospective, no restatement." },
    { trap: "Taking a revaluation gain to profit or loss.", fix: "It goes to other comprehensive income, unless it reverses a previous downward revaluation charged to profit — then to profit up to that amount." },
    { trap: "Offsetting a fall on one asset against a surplus on another.", fix: "The surplus is tracked asset by asset. Only the surplus on the SAME asset can absorb a fall." },
    { trap: "Recycling the revaluation surplus into profit on disposal.", fix: "It transfers directly to retained earnings. Recycling it would double count the uplift already recognised in OCI." },
    { trap: "Forgetting that revaluing upwards increases future depreciation.", fix: "It does, on the revalued amount over the remaining life — which reduces future profit and is often the point of an interpretation requirement." },
  ],
  keyTerms: [
    { term: "Depreciation", def: "The systematic allocation of the depreciable amount of an asset over its useful life." },
    { term: "Depreciable amount", def: "Cost, or revalued amount, less residual value." },
    { term: "Residual value", def: "The estimated amount the entity would obtain now from disposing of the asset, if it were already of the age and condition expected at the end of its useful life." },
    { term: "Useful life", def: "The period over which the asset is expected to be available for use by the entity, or the number of production units expected to be obtained from it." },
    { term: "Revaluation model", def: "Carrying an asset at fair value at the date of revaluation less subsequent depreciation and impairment; applied to a whole class and kept up to date." },
    { term: "Revaluation surplus", def: "The cumulative gain on revaluation recognised in other comprehensive income and held in equity, tracked asset by asset." },
    { term: "Excess depreciation transfer", def: "The optional annual reserve-to-reserve transfer from revaluation surplus to retained earnings of the difference between depreciation on the revalued amount and on original cost." },
  ],
  summary: [
    "Depreciation allocates the depreciable amount over the useful life. It is not valuation, it creates no cash fund, and a rising market value does not stop it.",
    "It begins when the asset is AVAILABLE for use and continues while the asset is idle; land is not depreciated.",
    "Changes to useful life, residual value or method are changes in ESTIMATE — prospective, computed from the current carrying amount.",
    "The revaluation model is a policy choice per CLASS, requires the class to be kept up to date, and requires continued depreciation on the revalued amount.",
    "An upward revaluation goes to OCI, except to the extent it reverses a previous charge to profit for the same asset.",
    "A downward revaluation goes to OCI up to the surplus on THAT asset, then to profit or loss.",
    "On disposal, the gain or loss goes to profit or loss and the remaining surplus transfers directly to retained earnings — never recycled.",
  ],
  knowledgeDiagnostic: [
    { q: "When does depreciation begin?", a: "When the asset is available for use — in the location and condition necessary for its intended use — not when it is first used." },
    { q: "An asset's useful life is revised. From what figure is the new charge computed?", a: "From the current carrying amount, less the revised residual value, over the revised remaining life. Prospectively." },
    { q: "Where does an upward revaluation go?", a: "To other comprehensive income and the revaluation surplus, unless it reverses an earlier downward revaluation charged to profit, in which case to profit up to that amount." },
    { q: "A revalued asset falls in value by more than its surplus. What happens to the excess?", a: "It is charged to profit or loss. Only the surplus on the same asset can be absorbed in OCI." },
    { q: "What happens to the revaluation surplus when the asset is sold?", a: "It transfers directly to retained earnings within equity. It is not recycled through profit or loss." },
    { q: "Does revaluing upwards affect future profit?", a: "Yes — depreciation is charged on the higher revalued amount over the remaining life, so future profit is lower." },
  ],
  furtherStudy: [
    "Chapter 11 — IAS 36, where an impairment of a revalued asset follows the same OCI-then-profit ordering",
    "Chapter 22 — IFRS 5, which stops depreciation when an asset is classified as held for sale",
    "Chapter 30 — why a revalued asset base depresses ROCE and distorts comparison with an entity on the cost model",
  ],
}
