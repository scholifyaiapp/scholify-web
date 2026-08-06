import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 11 and 12: IAS 36 impairment, and IAS 2 / IAS 41 inventories and
 * biological assets.
 *
 * IAS 36 gets a chapter of its own because the allocation of a cash-generating unit
 * impairment is the single most mechanical piece of arithmetic in Area B, and because the
 * asymmetry in reversals (never for goodwill) is examined every few sittings.
 *
 * Chapter 12 pairs IAS 2 with IAS 41 because they meet: harvested agricultural produce
 * leaves IAS 41 and becomes IAS 2 inventory at the point of harvest, and a candidate who
 * learns them separately loses that handover.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_11: StudyChapter = {
  id: "FR-11",
  number: 11,
  paper: "FR",
  area: "B",
  title: "IAS 36: impairment of assets",
  minutes: 20,
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)", "B3(d)"],
  intro:
    "One test, one comparison, and one allocation order. The comparison is where the reasoning marks are; the allocation is where the arithmetic marks are.",
  outcomes: [
    "Identify internal and external indicators of impairment, and the assets tested annually regardless",
    "Compute recoverable amount as the higher of fair value less costs of disposal and value in use",
    "Recognise an impairment loss for an individual asset, including a revalued one",
    "Identify a cash-generating unit and allocate an impairment loss in the correct order",
    "Apply the rules on reversing an impairment loss, and explain why goodwill is excluded",
  ],
  sections: [
    {
      id: "when-to-test",
      heading: "When to test",
      blocks: [
        {
          kind: "text",
          md: "IAS 36 requires an entity to assess **at each reporting date** whether there is any **indication** that an asset may be impaired. If there is, the asset is tested. Three categories of asset are tested **annually whether or not there is any indication**.",
        },
        {
          kind: "table",
          caption: "Indicators of impairment",
          head: ["External indicators", "Internal indicators"],
          rows: [
            ["A significant decline in market value", "Physical damage or obsolescence"],
            ["Significant adverse changes in technology, markets, the economy or the law", "The asset is idle, or part of a restructuring or a plan to dispose of it earlier than expected"],
            ["Market interest rates have increased, raising the discount rate and so reducing value in use", "Operating results are significantly worse than budgeted, or cash outflows for operating or maintaining the asset are significantly higher than budgeted"],
            ["The entity's net assets exceed its market capitalisation", "Evidence that the asset's economic performance is, or will be, worse than expected"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Tested ANNUALLY, indicator or not",
          md: "· **Goodwill** acquired in a business combination.\n· An **intangible asset with an indefinite useful life**.\n· An **intangible asset not yet available for use**.\n\nThe common thread is that none of them is being amortised, so nothing is systematically reducing the carrying amount. Without a mandatory annual test they could sit at cost indefinitely while their value evaporated.\n\nThe test may be performed **at any time during the annual period, provided it is at the same time each year** — which lets an entity do the work when its resources allow rather than in the year-end crush.",
        },
      ],
    },
    {
      id: "recoverable-amount",
      heading: "Recoverable amount: the higher of two figures",
      blocks: [
        {
          kind: "formula",
          name: "The impairment test",
          expr: "RECOVERABLE AMOUNT  =  HIGHER of\n\n   FAIR VALUE LESS COSTS OF DISPOSAL\n      market-based exit price, less the incremental costs\n      directly attributable to disposal\n      (NOT finance costs or income tax expense)\n\n   VALUE IN USE\n      present value of the future cash flows the ENTITY\n      expects from continuing use and ultimate disposal\n\nIMPAIRMENT LOSS  =  CARRYING AMOUNT  −  RECOVERABLE AMOUNT\n                      ... and only if positive",
          note: "HIGHER, not lower. A rational entity takes the better of selling and keeping, so an asset is impaired only if BOTH routes fall short of carrying amount. Using the lower figure is the most expensive single error in this standard.",
        },
        {
          kind: "list",
          title: "Computing value in use — the rules that get tested",
          items: [
            "Use the **asset in its CURRENT condition**. Exclude cash flows from a future restructuring to which the entity is not yet committed, and from enhancing the asset's performance beyond its current standard.",
            "Include the cash flows from the asset's **ultimate disposal**.",
            "**EXCLUDE** cash flows from financing activities and income tax receipts or payments — the discount rate is a pre-tax rate, so including tax would double count.",
            "The **discount rate** is a pre-tax rate reflecting current market assessments of the time value of money and the risks specific to the asset for which the cash flow estimates have not been adjusted.",
            "Cash flow projections are based on **reasonable and supportable assumptions**, normally covering a maximum of five years unless a longer period can be justified."
          ],
        },
        {
          kind: "example",
          title: "Impairing an individual asset",
          scenario:
            "Kittiwake Co has a specialised machine with a carrying amount of $800,000. Following the loss of a major contract the directors test it for impairment. The machine could be sold for $620,000, with disposal costs of $20,000. If retained, it is expected to generate net cash inflows of $180,000 a year for five years, with no residual value. The appropriate pre-tax discount rate is 10%; the five-year annuity factor at 10% is 3.791.",
          steps: [
            { label: "Compute fair value less costs of disposal", detail: "$620,000 − $20,000 = $600,000." },
            { label: "Compute value in use", detail: "$180,000 × 3.791 = $682,380." },
            { label: "Take the HIGHER as recoverable amount", detail: "$682,380 exceeds $600,000, so recoverable amount is $682,380. The entity would rationally keep using the machine rather than sell it, and the accounting follows that." },
            { label: "Compute the impairment loss", detail: "$800,000 − $682,380 = $117,620." },
            { label: "Record it", detail: "Dr Impairment loss (profit or loss) $117,620, Cr Machine $117,620. The charge is presented within the function to which the asset relates — usually cost of sales for a production machine." },
            { label: "Reset depreciation", detail: "Depreciation from now on is based on the revised carrying amount of $682,380 over the remaining useful life, less any residual value. Continuing to depreciate the original figure is a common follow-through error." },
            { label: "Note the trap", detail: "Using the LOWER of the two measures would give recoverable amount $600,000 and an impairment of $200,000 — overstating the loss by $82,380." },
          ],
          result:
            "**Impairment loss $117,620, and depreciation is recalculated on $682,380.** For a REVALUED asset the loss would go first against the revaluation surplus on that asset in OCI, and only the excess to profit or loss — the same ordering as a downward revaluation.",
        },
      ],
      check: {
        q: "An asset has a carrying amount of $500,000, a fair value less costs of disposal of $460,000 and a value in use of $410,000. What impairment loss is recognised?",
        options: ["$40,000", "$90,000", "$50,000", "Nil"],
        correct: 0,
        explain:
          "Recoverable amount is the HIGHER of the two measures — $460,000 — so the loss is $500,000 − $460,000 = $40,000. Using value in use because it is lower would give $90,000 and overstate the loss.",
      },
    },
    {
      id: "cgus",
      heading: "Cash-generating units, and the allocation order",
      blocks: [
        {
          kind: "definition",
          term: "Cash-generating unit",
          md: "The **smallest identifiable group of assets** that generates cash inflows **largely independent** of the cash inflows from other assets or groups of assets.",
        },
        {
          kind: "text",
          md: "Value in use has to be computed from cash flows, and many assets do not generate cash flows on their own. A conveyor belt in a factory produces nothing by itself. Where an asset's recoverable amount cannot be determined individually, it is tested as part of the smallest group that does generate independent inflows.\n\nGoodwill is the extreme case: it never generates cash flows independently, so it **must** be allocated to CGUs or groups of CGUs expected to benefit from the synergies of the combination, and tested at that level.",
        },
        {
          kind: "formula",
          name: "Allocating a CGU impairment loss",
          expr: "STEP 1   Reduce the carrying amount of any GOODWILL\n         allocated to the unit — first, and in full if necessary\n\nSTEP 2   Allocate the remainder to the unit's OTHER ASSETS\n         PRO RATA on their carrying amounts\n\nLIMIT    No individual asset may be reduced below the highest of\n            ·  its own fair value less costs of disposal\n            ·  its own value in use\n            ·  zero\n         Any amount that cannot be allocated because of the limit\n         is reallocated pro rata to the other assets of the unit\n\nEXCLUDED from the allocation: assets outside the scope of IAS 36 —\ninventories (IAS 2), receivables and other financial assets\n(IFRS 9), deferred tax assets (IAS 12), assets held for sale\n(IFRS 5). They are already measured under their own standard.",
          note: "Goodwill first, then pro rata, subject to the floor. Candidates who allocate pro rata across everything including goodwill get every figure wrong.",
        },
        {
          kind: "example",
          title: "Allocating a CGU impairment",
          scenario:
            "Fulmar Co has a cash-generating unit whose assets at the reporting date are:\n\n  Goodwill                                    $200,000\n  Other intangible assets                     $150,000\n  Property, plant and equipment               $900,000\n  Inventory                                   $250,000\n\nThe recoverable amount of the unit is assessed at $980,000. The inventory is carried at the lower of cost and net realisable value, and no individual asset's own recoverable amount is below the amount it would be reduced to.",
          steps: [
            { label: "Exclude the inventory from the allocation", detail: "Inventory is outside the scope of IAS 36 — it is already measured at the lower of cost and NRV under IAS 2. The carrying amount subject to allocation is $200,000 + $150,000 + $900,000 = $1,250,000." },
            { label: "Compute the impairment loss", detail: "$1,250,000 − $980,000 = $270,000. Note the recoverable amount of the unit is compared with the carrying amount of the assets WITHIN scope." },
            { label: "Step 1 — write off goodwill first", detail: "The whole $200,000 of goodwill is eliminated. This is not pro rata: goodwill absorbs the loss first and in full if the loss is large enough." },
            { label: "Step 2 — allocate the remaining $70,000 pro rata", detail: "The remaining assets total $150,000 + $900,000 = $1,050,000.\n  Other intangibles: $70,000 × $150,000/$1,050,000 = $10,000\n  PPE:               $70,000 × $900,000/$1,050,000 = $60,000\nCheck: $10,000 + $60,000 = $70,000." },
            { label: "State the revised carrying amounts", detail: "Goodwill nil; other intangibles $140,000; PPE $840,000; inventory unchanged at $250,000. Total within scope $980,000, which equals the recoverable amount — a useful arithmetic check." },
            { label: "Note where the limit would bite", detail: "If the PPE included a building whose own fair value less costs of disposal were $870,000, it could only be reduced to $870,000 — a $30,000 reduction instead of $60,000 — and the unallocated $30,000 would be reallocated to the other intangibles, subject to their own floor." },
          ],
          result:
            "**Goodwill written off in full ($200,000), other intangibles reduced by $10,000 and PPE by $60,000.** Total charge $270,000 to profit or loss. The three marks most often lost are excluding the inventory, taking goodwill first, and reconciling the revised total back to the recoverable amount.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Goodwill in a partly-owned subsidiary",
          md: "Where non-controlling interest is measured at the **proportionate share of net assets** — the partial goodwill method — only the parent's share of the subsidiary's goodwill is recognised. For an impairment test the goodwill must therefore be **notionally grossed up** to 100% before comparing with the unit's recoverable amount, and the resulting impairment then **restricted to the group's share** for recognition.\n\nWhere NCI is measured at **fair value** — the full goodwill method — all of the goodwill is already recognised, no grossing up is needed, and the impairment is allocated between the parent and the NCI in the same proportion as profit.",
        },
      ],
      check: {
        q: "A CGU comprises goodwill $80,000, PPE $400,000 and inventory $120,000. Its recoverable amount is $380,000. How is the impairment allocated?",
        options: [
          "Goodwill $80,000 and PPE $20,000; inventory is unaffected",
          "Goodwill $80,000, PPE $15,385 and inventory $4,615, pro rata",
          "Pro rata across all three assets in proportion to carrying amount",
          "PPE $100,000, since goodwill cannot be impaired on its own",
        ],
        correct: 0,
        explain:
          "Inventory is outside IAS 36's scope, so the carrying amount tested is $80,000 + $400,000 = $480,000, giving a loss of $100,000. Goodwill absorbs the first $80,000 in full, and the remaining $20,000 reduces the PPE.",
      },
    },
    {
      id: "reversals",
      heading: "Reversing an impairment loss",
      blocks: [
        {
          kind: "list",
          title: "The rules",
          items: [
            "At each reporting date, assess whether there is any indication that a **previously recognised** impairment loss has **decreased or no longer exists**. The indicators are the mirror image of the impairment indicators.",
            "A reversal is recognised **only if the estimates used to determine recoverable amount have changed**. The mere passage of time — which increases value in use because the cash flows are closer — is **not** a reason to reverse.",
            "The increased carrying amount **must not exceed** what the carrying amount would have been, net of depreciation or amortisation, had no impairment loss been recognised.",
            "The reversal goes to **profit or loss**, except for a revalued asset, where it is treated as a revaluation increase and goes to OCI to the extent it reverses an earlier OCI charge.",
            "**An impairment loss on GOODWILL is NEVER reversed.**",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why goodwill impairments are never reversed",
          md: "Because it would be impossible to tell whether the recovery relates to the purchased goodwill that was impaired, or to **internally generated goodwill** created since — and internally generated goodwill may not be recognised at all. Permitting reversals would let an entity recognise internally generated goodwill through the back door.\n\nThis is a two-mark question waiting to be asked, and the answer is the reason, not just the rule.",
        },
        {
          kind: "activity",
          title: "Can it be reversed, and by how much?",
          prompt:
            "An asset cost $1,000,000 on 1 January 20X1 with a ten-year life and no residual value. On 31 December 20X3 it was impaired to $560,000, its remaining life unchanged at seven years. On 31 December 20X5 the conditions causing the impairment have reversed and its recoverable amount is $700,000.\n\nWhat carrying amount is recognised at 31 December 20X5?",
          answer:
            "Carrying amount before reversal: $560,000 depreciated over seven years is $80,000 a year, so after two years $560,000 − $160,000 = $400,000.\n\nThe ceiling: what the carrying amount would have been with no impairment. Original depreciation $1,000,000 ÷ 10 = $100,000 a year, so after five years $1,000,000 − $500,000 = $500,000.\n\nRecoverable amount is $700,000, but the reversal is capped at the $500,000 ceiling. So the carrying amount becomes $500,000 and the reversal recognised in profit or loss is $500,000 − $400,000 = $100,000.\n\nThe $200,000 by which recoverable amount exceeds the ceiling is NOT recognised — recognising it would be revaluing the asset above depreciated cost, which the cost model does not permit. And had the impaired asset been goodwill, the answer would be nil regardless of the recoverable amount.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Using the LOWER of fair value less costs of disposal and value in use.", fix: "Recoverable amount is the HIGHER. An asset is impaired only if both routes fall short." },
    { trap: "Including tax cash flows or finance costs in value in use.", fix: "Both are excluded; the discount rate is pre-tax and financing is dealt with through the rate." },
    { trap: "Including cash flows from a planned enhancement or an uncommitted restructuring.", fix: "Value in use uses the asset in its CURRENT condition." },
    { trap: "Allocating a CGU impairment pro rata across all assets including goodwill.", fix: "Goodwill first and in full; then pro rata to the remaining in-scope assets, subject to each asset's own floor." },
    { trap: "Including inventory, receivables or deferred tax in the CGU allocation.", fix: "They are outside IAS 36 and already measured under their own standards." },
    { trap: "Continuing to depreciate the pre-impairment carrying amount.", fix: "Depreciation is recalculated on the revised carrying amount over the remaining life." },
    { trap: "Reversing an impairment because time has passed and value in use has risen.", fix: "A reversal requires a change in the ESTIMATES used, not the unwinding of the discount." },
    { trap: "Reversing a goodwill impairment.", fix: "Never permitted — the recovery cannot be distinguished from internally generated goodwill, which may not be recognised." },
    { trap: "Reversing an impairment above depreciated historical cost.", fix: "The ceiling is what the carrying amount would have been had no impairment been recognised." },
  ],
  keyTerms: [
    { term: "Recoverable amount", def: "The higher of an asset's fair value less costs of disposal and its value in use." },
    { term: "Fair value less costs of disposal", def: "The price obtainable in an orderly market transaction, less the incremental costs directly attributable to disposal, excluding finance costs and income tax." },
    { term: "Value in use", def: "The present value of the future cash flows expected from an asset in its current condition, including its ultimate disposal, at a pre-tax discount rate." },
    { term: "Cash-generating unit", def: "The smallest identifiable group of assets generating cash inflows largely independent of those from other assets or groups." },
    { term: "Impairment loss", def: "The amount by which the carrying amount of an asset or CGU exceeds its recoverable amount." },
    { term: "Allocation floor", def: "The limit on reducing an individual asset within a CGU: no lower than the highest of its own fair value less costs of disposal, its own value in use, and zero." },
  ],
  summary: [
    "Test when there is an indicator; test goodwill, indefinite-life intangibles and intangibles not yet available for use ANNUALLY regardless.",
    "Recoverable amount is the HIGHER of fair value less costs of disposal and value in use.",
    "Value in use uses the asset in its current condition, excludes tax and financing flows, and uses a pre-tax rate.",
    "Where an asset generates no independent cash flows, test the smallest CGU that does. Goodwill must be allocated to CGUs and tested there.",
    "Allocate a CGU loss to goodwill first and in full, then pro rata to other in-scope assets, subject to each asset's own floor.",
    "Assets outside IAS 36 — inventory, financial assets, deferred tax, held-for-sale assets — are excluded from the allocation.",
    "Reversals require a change in estimates, are capped at depreciated historical cost, and are NEVER permitted for goodwill.",
  ],
  knowledgeDiagnostic: [
    { q: "Define recoverable amount.", a: "The higher of fair value less costs of disposal and value in use." },
    { q: "Which assets are tested for impairment annually regardless of indicators?", a: "Goodwill, intangibles with an indefinite useful life, and intangibles not yet available for use." },
    { q: "In what order is a CGU impairment loss allocated?", a: "Goodwill first and in full, then pro rata to the unit's other in-scope assets on their carrying amounts, subject to each asset's own floor." },
    { q: "Why is inventory excluded from a CGU allocation?", a: "It is outside IAS 36's scope, being already measured at the lower of cost and net realisable value under IAS 2." },
    { q: "Can an impairment loss be reversed because the discount has unwound?", a: "No. A reversal requires a change in the estimates used to determine recoverable amount." },
    { q: "Why can a goodwill impairment never be reversed?", a: "Because the recovery could not be distinguished from internally generated goodwill, which is not permitted to be recognised." },
  ],
  furtherStudy: [
    "Chapter 8 — the OCI-then-profit ordering that applies when a revalued asset is impaired",
    "Chapter 27 — allocating goodwill to CGUs in a group, and the grossing up required under the partial goodwill method",
    "Chapter 10 — the three categories of intangible that trigger the mandatory annual test",
  ],
}

export const FR_TREE_12: StudyChapter = {
  id: "FR-12",
  number: 12,
  paper: "FR",
  area: "B",
  title: "IAS 2 inventories and IAS 41 biological assets",
  minutes: 17,
  syllabusRefs: ["B4(a)", "B4(b)", "B4(c)", "B4(d)"],
  intro:
    "Inventory is measured at the lower of cost and net realisable value — item by item, not in total. Biological assets break the rule entirely.",
  outcomes: [
    "Build the cost of inventory, distinguishing included from excluded costs",
    "Absorb fixed production overheads on the basis of normal capacity",
    "Apply the lower of cost and net realisable value on an item-by-item basis",
    "Apply FIFO and weighted average cost, and explain why LIFO is prohibited",
    "Measure biological assets and agricultural produce, and identify the point at which IAS 2 takes over",
  ],
  sections: [
    {
      id: "cost-of-inventory",
      heading: "The cost of inventory",
      blocks: [
        {
          kind: "formula",
          name: "Cost of inventories",
          expr: "COST  =  COST OF PURCHASE\n            purchase price\n            + import duties and non-recoverable taxes\n            + transport, handling and other directly attributable costs\n            − trade discounts, rebates and similar items\n\n      +  COST OF CONVERSION\n            direct labour and other direct costs\n            + VARIABLE production overheads\n            + FIXED production overheads, absorbed on the basis of\n              NORMAL CAPACITY\n\n      +  OTHER COSTS incurred in bringing inventories to their\n         present location and condition",
          note: "Note what is absent: selling costs, storage of finished goods, administrative overheads and abnormal waste. All four are expenses of the period.",
        },
        {
          kind: "table",
          caption: "Excluded from the cost of inventory",
          head: ["Excluded item", "Why"],
          rows: [
            ["**Abnormal** amounts of wasted material, labour or other costs", "Not a cost of bringing the inventory to its present condition — normal waste IS included, abnormal is not"],
            ["**Storage costs**", "Excluded, UNLESS necessary in the production process before a further stage — maturing whisky or ageing cheese qualify; a warehouse of finished goods does not"],
            ["**Administrative overheads** not contributing to bringing inventories to their present location and condition", "Not attributable to production"],
            ["**Selling and distribution costs**", "Incurred to dispose of the inventory, not to create it"],
            ["**Interest**, unless the inventory is a qualifying asset under IAS 23", "Financing is not a cost of the goods, except where production takes a substantial period"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Normal capacity, and why it matters",
          md: "Fixed production overheads are absorbed on the basis of **NORMAL capacity** — the production expected to be achieved on average over a number of periods, taking planned maintenance into account.\n\nThe consequence is asymmetric and is examined:\n\n· If actual production is **BELOW** normal capacity, the absorption rate is **NOT increased**. The unabsorbed overhead is **expensed in the period**, so a period of low production produces a charge rather than more expensive inventory. This prevents an entity capitalising the cost of idle capacity.\n\n· If actual production is **ABOVE** normal capacity, the rate **IS reduced** so that inventory is not measured above cost.",
        },
        {
          kind: "example",
          title: "Absorbing fixed overheads",
          scenario:
            "Petrel Co has fixed production overheads of $480,000 a year and normal capacity of 40,000 units. In 20X4 it produced only 32,000 units because of a strike. In 20X5 it produced 48,000 units.",
          steps: [
            { label: "Compute the rate at normal capacity", detail: "$480,000 ÷ 40,000 = $12 a unit." },
            { label: "20X4 — production below normal", detail: "Absorb 32,000 × $12 = $384,000 into the cost of production. The remaining $480,000 − $384,000 = $96,000 is EXPENSED in 20X4. The rate is not increased to $15 ($480,000 ÷ 32,000), because that would capitalise the cost of the strike." },
            { label: "20X5 — production above normal", detail: "The rate is reduced to actual: $480,000 ÷ 48,000 = $10 a unit, so all $480,000 is absorbed and no inventory is carried above cost. Using $12 would absorb $576,000, which exceeds the overhead actually incurred." },
            { label: "State the principle in one line", detail: "The rate is the lower of the normal-capacity rate and the actual-production rate. Under-absorption is an expense; over-absorption is not permitted." },
          ],
          result:
            "**20X4: absorb $12 a unit and expense $96,000. 20X5: absorb $10 a unit.** The asymmetry is the examinable point — low production creates a period charge, high production reduces the unit rate.",
        },
        {
          kind: "example",
          title: "Building the cost of purchased inventory",
          scenario:
            "Gannet Co buys a consignment of goods. The supplier's invoice is $60,000 before a 10% trade discount. Import duties are $4,000 and inward freight $2,500. The entity also incurred $3,000 storing the finished goods in its distribution warehouse, $5,000 clearing up an abnormal spillage, and $1,800 of delivery costs to customers.",
          steps: [
            { label: "Start with the purchase price net of trade discount", detail: "$60,000 × 90% = $54,000. Trade discounts are always deducted." },
            { label: "Add the directly attributable costs of purchase", detail: "Import duties $4,000 and inward freight $2,500. Cost is $54,000 + $4,000 + $2,500 = $60,500." },
            { label: "Exclude the three remaining items", detail: "Storage of FINISHED goods $3,000 — excluded, as no further production stage requires it. Abnormal spillage $5,000 — abnormal waste is always an expense. Outward delivery to customers $1,800 — a selling cost." },
            { label: "Note the distinction that carries the mark", detail: "Freight IN is part of cost; freight OUT is a selling expense. Candidates who net them or include both lose the point." },
          ],
          result:
            "**Cost $60,500; expense $9,800.** The excluded items are worth as many marks as the included ones.",
        },
      ],
      check: {
        q: "An entity's fixed production overheads are $600,000 with normal capacity of 50,000 units. It produces 40,000 units. What is absorbed into inventory cost and what is expensed?",
        options: [
          "Absorb $12 a unit, so $480,000; expense $120,000",
          "Absorb $15 a unit, so $600,000; expense nil",
          "Absorb $12 a unit, so $480,000; carry $120,000 forward as a prepayment",
          "Absorb nothing — fixed overheads are always expensed",
        ],
        correct: 0,
        explain:
          "The rate is based on NORMAL capacity: $600,000 ÷ 50,000 = $12. At 40,000 units, $480,000 is absorbed and the unabsorbed $120,000 is expensed in the period. Increasing the rate to $15 would capitalise the cost of idle capacity.",
      },
    },
    {
      id: "nrv",
      heading: "Net realisable value, item by item",
      blocks: [
        {
          kind: "definition",
          term: "Net realisable value",
          md: "The **estimated selling price** in the ordinary course of business, **less** the estimated **costs of completion** and the estimated **costs necessary to make the sale**.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Item by item, never in total",
          md: "The comparison of cost with net realisable value is made for **each item** of inventory, or each group of similar items. It is **not** made on the total.\n\nThe difference is not academic. Comparing totals lets a write-down on one line be absorbed by an unrealised gain on another, which understates the write-down and overstates inventory. An entity with cost of $100,000 and NRV of $110,000 in total may still need a write-down if one line's NRV is below its cost.\n\nA Section A question that gives you two lines — one where NRV exceeds cost and one where it does not — is testing exactly this.",
        },
        {
          kind: "list",
          title: "Points on NRV that appear in questions",
          items: [
            "**Selling price is not NRV.** Deduct costs of completion and costs necessary to make the sale — rectification, repackaging, commission, delivery.",
            "**A firm sales contract fixes the selling price** to be used, even if the general market price is different.",
            "**Raw materials are not written down below cost** if the finished products in which they will be incorporated are expected to be sold at or above cost. Replacement cost is the best available evidence of raw materials' NRV where a write-down IS needed.",
            "**A write-down is reversed** if the circumstances change and NRV recovers — but only up to the original cost. Inventory is never carried above cost.",
          ],
        },
        {
          kind: "example",
          title: "A damaged batch",
          scenario:
            "Sanderling Co holds 5,000 units of a product at a cost of $18 each. The normal selling price is $22. Of these, 800 units were damaged in the warehouse; they can be sold for $12 each, but only after rectification work costing $2 a unit. The remaining units are unaffected and will sell normally.",
          steps: [
            { label: "Split the inventory into the two groups", detail: "4,200 good units and 800 damaged units. Applying one calculation to all 5,000 is the error the question is built to catch." },
            { label: "Test the good units", detail: "Cost $18; NRV based on a $22 selling price is above cost. Carry at COST: 4,200 × $18 = $75,600." },
            { label: "Test the damaged units", detail: "NRV = $12 selling price − $2 rectification = $10, which is below the $18 cost. Carry at NRV: 800 × $10 = $8,000." },
            { label: "Compute closing inventory and the write-down", detail: "Closing inventory $75,600 + $8,000 = $83,600. Cost was 5,000 × $18 = $90,000, so the write-down charged to profit or loss is $6,400." },
            { label: "Show why the total-basis answer is wrong", detail: "On a total basis, cost $90,000 against total NRV of (4,200 × $22) + (800 × $10) = $92,400 + $8,000 = $100,400 — which exceeds cost, suggesting NO write-down at all. That understates the loss by $6,400 and is precisely what the item-by-item rule prohibits." },
          ],
          result:
            "**Closing inventory $83,600, with a $6,400 write-down.** The write-down is recognised as an expense in the period, normally within cost of sales.",
        },
        {
          kind: "text",
          md: "**Cost formulas.** Where items are not individually identifiable, cost is assigned using **FIFO** or **weighted average cost**, applied consistently for inventories of a similar nature and use. **LIFO is prohibited** by IAS 2, because in a period of rising prices it leaves the oldest and least relevant costs in the statement of financial position while charging the most recent costs to profit — the balance sheet figure becomes progressively less useful.\n\nSpecific identification is required where items are not ordinarily interchangeable, or are goods produced and segregated for specific projects.",
        },
      ],
      check: {
        q: "Inventory line X has cost $40,000 and NRV $46,000. Line Y has cost $30,000 and NRV $22,000. At what amount is inventory carried?",
        options: ["$62,000", "$70,000", "$68,000", "$52,000"],
        correct: 0,
        explain:
          "The lower of cost and NRV is applied item by item: X at cost $40,000, Y at NRV $22,000, total $62,000. Comparing totals ($70,000 cost against $68,000 NRV) would suggest a write-down of only $2,000 and is not permitted.",
      },
    },
    {
      id: "biological",
      heading: "IAS 41: biological assets and agricultural produce",
      blocks: [
        {
          kind: "text",
          md: "IAS 41 applies to **biological assets** — living animals and plants — and to **agricultural produce** at the point of harvest, where these arise from **agricultural activity**: the management by an entity of the biological transformation and harvest of biological assets for sale, or for conversion into agricultural produce or into additional biological assets.",
        },
        {
          kind: "formula",
          name: "Measurement under IAS 41",
          expr: "BIOLOGICAL ASSETS\n   Fair value LESS COSTS TO SELL, at each reporting date\n   Gains AND losses  →  PROFIT OR LOSS\n   No depreciation, and no lower-of test\n\nAGRICULTURAL PRODUCE\n   Fair value less costs to sell AT THE POINT OF HARVEST\n   That amount then becomes its COST for IAS 2 purposes\n\nBEARER PLANTS  (a vine, a fruit tree, a tea bush)\n   OUTSIDE IAS 41 — accounted for as PPE under IAS 16\n   ... but the FRUIT growing on them IS a biological asset\n\nExemption: where fair value cannot be reliably measured on initial\nrecognition, measure at cost less accumulated depreciation and\nimpairment until it can.",
          note: "Note the direction of the exception: gains go through PROFIT OR LOSS, not OCI, and there is no cost-versus-NRV test. IAS 41 is the clearest example in FR of fair value accounting with no ceiling at cost.",
        },
        {
          kind: "example",
          title: "A dairy herd across a year",
          scenario:
            "Dunlin Co holds a dairy herd. At 1 January it had 200 cows with a fair value less costs to sell of $900 each. During the year 10 calves were born and none were sold. At 31 December the herd of 210 animals had a fair value less costs to sell of $960 each. Milk harvested during the year had a fair value less costs to sell at the point of harvest of $85,000; $70,000 of it was sold during the year for $78,000 and the rest remained in inventory at the year end.",
          steps: [
            { label: "Measure the herd at both dates", detail: "Opening 200 × $900 = $180,000. Closing 210 × $960 = $201,600." },
            { label: "Recognise the change in profit or loss", detail: "$201,600 − $180,000 = a gain of $21,600 in PROFIT OR LOSS. It is not split between the price change and the physical change for FR purposes, though IAS 41 encourages that analysis in disclosure." },
            { label: "Recognise the milk at harvest", detail: "$85,000 is recognised as income in profit or loss at the point of harvest, and the milk becomes INVENTORY at a cost of $85,000. This is where IAS 41 hands over to IAS 2." },
            { label: "Account for the milk thereafter under IAS 2", detail: "Milk with a cost of $70,000 was sold for $78,000, giving a further $8,000 in profit. The remaining $15,000 is closing inventory, carried at the lower of that $85,000-derived cost and its net realisable value." },
            { label: "Note what does NOT happen", detail: "The herd is not depreciated, and it is not written down to the lower of cost and NRV. And the calves are simply part of the closing fair value — there is no separate 'cost' of a calf to recognise." },
          ],
          result:
            "**A $21,600 gain on the herd plus $85,000 of harvest income, both in profit or loss; closing inventory of milk at $15,000.** The handover at the point of harvest is the mechanic most often missed.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The bearer plant distinction",
          md: "A **bearer plant** — one used in the production or supply of agricultural produce, expected to bear produce for more than one period, and with a remote likelihood of being sold as produce except as incidental scrap — is **PPE under IAS 16**, depreciated like any other asset.\n\nSo an apple orchard's **trees** are PPE and are depreciated; the **apples growing on them** are biological assets at fair value less costs to sell; and the **apples once picked** are inventory at their fair value less costs to sell at harvest. Three standards, one orchard, and a two-mark question that catches most candidates.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Comparing total cost with total NRV.", fix: "The test is item by item, or by group of similar items. Comparing totals lets gains mask write-downs." },
    { trap: "Using selling price as NRV.", fix: "Deduct costs of completion and costs necessary to make the sale." },
    { trap: "Increasing the overhead absorption rate when production is below normal capacity.", fix: "The rate stays at the normal-capacity rate and the unabsorbed amount is expensed." },
    { trap: "Including storage of finished goods, selling costs, administrative overheads or abnormal waste in cost.", fix: "All four are period expenses. Storage is included only where a further production stage requires it." },
    { trap: "Including freight out in the cost of inventory.", fix: "Freight IN is a cost of purchase; freight OUT is a selling cost." },
    { trap: "Using LIFO.", fix: "Prohibited by IAS 2. Use FIFO or weighted average cost." },
    { trap: "Writing down raw materials whose finished products will still sell profitably.", fix: "No write-down is required in that case." },
    { trap: "Taking IAS 41 fair value movements to other comprehensive income.", fix: "They go to profit or loss, and there is no cost ceiling." },
    { trap: "Accounting for bearer plants under IAS 41.", fix: "They are PPE under IAS 16. Only the produce growing on them is a biological asset." },
  ],
  keyTerms: [
    { term: "Net realisable value", def: "Estimated selling price in the ordinary course of business less the estimated costs of completion and the estimated costs necessary to make the sale." },
    { term: "Normal capacity", def: "The production expected to be achieved on average over a number of periods, taking planned maintenance into account; the basis for absorbing fixed production overheads." },
    { term: "Under-absorption", def: "The fixed production overhead not absorbed because actual production fell below normal capacity; expensed in the period rather than capitalised." },
    { term: "Biological asset", def: "A living animal or plant, measured at fair value less costs to sell with changes in profit or loss." },
    { term: "Agricultural produce", def: "The harvested product of a biological asset, measured at fair value less costs to sell at the point of harvest, which then becomes its cost under IAS 2." },
    { term: "Bearer plant", def: "A living plant used in producing agricultural produce over more than one period, unlikely to be sold as produce; accounted for as PPE under IAS 16." },
  ],
  summary: [
    "Inventory is measured at the LOWER of cost and net realisable value, ITEM BY ITEM.",
    "Cost = cost of purchase (net of trade discount, plus duties and inward transport) + cost of conversion (labour, variable overheads and fixed overheads at NORMAL capacity) + other costs of bringing it to its present condition.",
    "Excluded: abnormal waste, storage of finished goods, non-attributable administration, selling costs, and interest outside IAS 23.",
    "Under-absorbed fixed overhead is expensed; over-absorption is not permitted, so the rate falls when production exceeds normal capacity.",
    "NRV is selling price less costs of completion and costs to sell. A firm contract price governs. Raw materials are not written down if the finished goods remain profitable.",
    "FIFO or weighted average cost; LIFO is prohibited.",
    "Biological assets are at fair value less costs to sell with movements in PROFIT OR LOSS, no depreciation and no cost ceiling.",
    "Agricultural produce is measured at fair value less costs to sell at harvest, which becomes its IAS 2 cost. Bearer plants are IAS 16 PPE.",
  ],
  knowledgeDiagnostic: [
    { q: "Is the lower of cost and NRV applied to the total or item by item?", a: "Item by item, or by group of similar items. Never on the total." },
    { q: "What happens to fixed production overhead not absorbed because production was below normal capacity?", a: "It is expensed in the period. The absorption rate is not increased." },
    { q: "Give three costs excluded from the cost of inventory.", a: "Abnormal waste, storage of finished goods where no further production stage requires it, selling and distribution costs — administrative overheads not attributable to production also qualify." },
    { q: "Why does IAS 2 prohibit LIFO?", a: "In a period of rising prices it leaves the oldest and least relevant costs in the statement of financial position, making that figure progressively less useful." },
    { q: "How are biological assets measured, and where do the gains go?", a: "At fair value less costs to sell, with gains and losses in profit or loss. No depreciation and no lower-of test." },
    { q: "At what amount does harvested produce enter inventory?", a: "Its fair value less costs to sell at the point of harvest, which becomes its cost under IAS 2." },
  ],
  furtherStudy: [
    "Chapter 9 — IAS 23, and the inventories that can be qualifying assets",
    "Chapter 24 — the cost of sales working in a single-entity preparation question, where the inventory write-down lands",
    "Chapter 30 — inventory days, and why a write-down distorts it",
  ],
}
