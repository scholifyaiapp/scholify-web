import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area C, part 1 — Revenue and non-current assets.
 *
 * Area C is the technical heart of SBR: eleven study-guide subsections, served
 * until now by one spliced shim chapter (legacy performance + instruments
 * chapters relabelled). The authored tree covers it in sixteen chapters across
 * three modules. This one:
 *
 *   SBR-09  Revenue: the five-step control model          (C1a, C1b)
 *   SBR-10  Revenue: the hard applications                (C1c)
 *   SBR-11  PPE, revaluation and borrowing costs          (C2a, C2e)
 *   SBR-12  Impairment of assets                          (C2a)
 *   SBR-13  Held for sale, investment property and intangibles (C2b, C2c, C2d)
 *
 * Written against the official ACCA SBR-INT syllabus and study guide for
 * September 2026 to June 2027. Not derived from any approved-provider text.
 * House style: SBR assumes the FR-level mechanics and examines the JUDGEMENT —
 * every section leads with the principle, shows the scenario that stresses it,
 * and names the misreporting incentive the examiner has planted.
 */

const SBR_TREE_09: StudyChapter = {
  paper: "SBR",
  id: "SBR-09",
  number: 9,
  area: "C",
  syllabusRefs: ["C1(a)", "C1(b)"],
  title: "Revenue: the five-step control model",
  minutes: 17,
  intro:
    "Revenue is the number management most wants and users most watch, which is why IFRS 15 rebuilt it around one idea: revenue follows the transfer of control, not the signing of contracts or the shipping of boxes. SBR examines the model at its judgement points.",
  outcomes: [
    "Apply the five steps to a scenario contract, identifying where each step's judgement bites",
    "Determine whether performance obligations are distinct, and why bundling or unbundling changes profit timing",
    "Decide between over-time and point-in-time recognition using the three over-time criteria",
    "Handle contract modifications as separate contracts, terminations-and-replacements, or cumulative catch-ups",
    "Connect each judgement to the incentive it serves when management leans on it",
  ],
  sections: [
    {
      id: "the-model",
      heading: "One principle, five steps",
      blocks: [
        {
          kind: "text",
          md: "IFRS 15's core principle: recognise revenue to depict the transfer of promised goods or services, at the amount of consideration the entity expects to be entitled to. The five steps operationalise it — identify the **contract**; identify the **performance obligations**; determine the **transaction price**; **allocate** the price to the obligations; recognise revenue as each obligation is **satisfied**. At SBR level the steps are assumed knowledge; the marks are at the judgement points inside them.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The five steps, with the judgement inside each",
            data: {
              steps: [
                { label: "Contract", sub: "Enforceable rights? Collection probable?" },
                { label: "Obligations", sub: "Distinct promises, or one combined output?" },
                { label: "Price", sub: "Variable consideration, constrained" },
                { label: "Allocation", sub: "Stand-alone selling prices, estimated if unobservable" },
                { label: "Satisfaction", sub: "Over time or at a point — control decides" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Step one already filters: a 'contract' with a customer whose ability and intention to pay is doubtful fails the collectability gate — probable collection is a precondition, not an afterthought, which is how the model blocks revenue booked on sales to customers the entity is in substance financing into existence. Step two asks whether each promise is **distinct**: capable of benefiting the customer on its own or with readily available resources, *and* separately identifiable in the contract's context. A licence plus updates plus support may be three obligations — or one, where the promises are inputs to a single combined output the customer actually bought.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Bundling is a profit-timing lever",
          md: "Whether promises are distinct decides when margin lands. Combine everything into one over-time obligation and early-period revenue smooths; split out a delivered 'licence' from years of undelivered service and revenue front-loads. When a scenario's management argues hard for one reading, price the argument: which reading books more revenue *now*, and does the contract's substance actually support it?",
        },
      ],
      check: {
        q: "A software house sells a licence 'plus' customisation so extensive that the standard product cannot run without it. Management wants the licence recognised on delivery and the customisation over time. What is the correct analysis?",
        options: [
          "Two obligations — a licence is always distinct from services",
          "One obligation — the customer cannot benefit from the licence without the customisation, and the promises are inputs to one combined functional system, so revenue follows the combined obligation's satisfaction",
          "Two obligations, but both recognised over time for prudence",
          "One obligation recognised on final delivery, as combination always means point-in-time",
        ],
        correct: 1,
        explain:
          "'Capable of benefiting on its own' fails on the facts — the product does not run — and the significant integration means the promises are not separately identifiable. Management's split would front-load the licence margin, which is the incentive to name. Option 3 overshoots: a combined obligation still takes the over-time test on its own terms and may well pass it.",
      },
    },
    {
      id: "price-and-allocation",
      heading: "Transaction price: variable, constrained, financed",
      blocks: [
        {
          kind: "text",
          md: "The transaction price is what the entity **expects to be entitled to** — which is rarely the invoice total. **Variable consideration** (bonuses, penalties, rebates, refunds) is estimated by expected value or most-likely amount, then **constrained**: include variable amounts only to the extent it is highly probable that a significant reversal of cumulative revenue will not occur when the uncertainty resolves. The constraint is the anti-optimism device, and it is asymmetric on purpose — doubt excludes.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The other price adjustments SBR scenarios use",
          items: [
            "**Significant financing** — payment more than a year apart from transfer means the price embeds interest: discount, and unwind through finance income or expense",
            "**Consideration payable to the customer** — slotting fees and rebates reduce revenue, unless they buy a distinct service at fair value",
            "**Non-cash consideration** — measured at fair value of what is received",
            "**Allocation** — by relative stand-alone selling prices, estimated (adjusted market, cost-plus, residual only when prices are highly variable or uncertain) where unobservable; discounts allocated proportionately unless evidence ties them to specific obligations",
          ],
        },
        {
          kind: "illustration",
          title: "The constraint doing its job",
          md: "A contractor's contract carries a $5m completion bonus dependent on a regulator's approval, historically granted in about half of similar cases. Expected value says include $2.5m; the constraint says include nothing — a binary, out-of-the-entity's-control outcome at roughly even odds cannot make a *significant reversal* 'highly improbable'. The bonus enters revenue when the uncertainty resolves. Management's model 'including the bonus because we are confident' is precisely what the constraint exists to strip out.",
        },
      ],
      check: {
        q: "An entity sells equipment for $2m payable in three years, when its incremental borrowing rate implies a cash selling price of about $1.65m. How should revenue be reported?",
        options: [
          "Revenue of $2m on delivery — that is the contract price",
          "Revenue of about $1.65m on transfer of control, with roughly $0.35m unwinding as finance income over the three years",
          "Revenue of $2m spread evenly over three years",
          "Revenue of $1.65m in three years' time when cash is received",
        ],
        correct: 1,
        explain:
          "A three-year gap between transfer and payment is a significant financing component: the entity has sold equipment and lent money, and reporting $2m as revenue overstates the sale by the interest it contains. Control transferred on delivery, so options 2 and 3 misplace the timing; the two elements are reported as what they are — sale now, financing over time.",
      },
    },
    {
      id: "satisfaction-and-modifications",
      heading: "Over time or at a point — then the contract changes",
      blocks: [
        {
          kind: "text",
          md: "An obligation is satisfied **over time** if any one of three criteria holds: the customer **simultaneously receives and consumes** the benefits (routine services); the entity's work **creates or enhances an asset the customer controls** as it is built (a building on the customer's land); or the asset has **no alternative use** to the entity *and* the entity has an **enforceable right to payment for performance to date** including a reasonable margin (bespoke construction with the right contractual terms). Fail all three and revenue waits for the point at which control passes — with control read through the indicators: present right to payment, legal title, physical possession, risks and rewards, acceptance.",
        },
        {
          kind: "text",
          md: "The third criterion is where scenarios live, because both limbs are drafting-sensitive. A vessel built to a customer's unique specification has no alternative use; whether progress payments are 'costs plus a reasonable margin to date' or merely 'refundable deposits' decides the limb — and therefore whether years of work report smoothly or in one final-year spike. SBR expects you to read the contract terms in the exhibit and say which reporting pattern they produce, and what a management keen on early revenue would want redrafted.",
        },
        {
          kind: "table",
          caption: "Contract modifications — the three routes",
          head: ["Modification", "Treatment", "Why"],
          rows: [
            ["Adds distinct goods at their stand-alone price", "Separate new contract", "Economically a fresh sale; the old contract is undisturbed"],
            ["Adds distinct goods, not at stand-alone price", "Terminate old, new contract for the remainder", "Remaining goods repriced prospectively over what is left"],
            ["Remaining goods not distinct (continuous obligation)", "Cumulative catch-up", "One measure of progress — adjust revenue to date through P&L now"],
          ],
        },
        {
          kind: "examQuestion",
          title: "Advise on revenue recognition for a scenario contract",
          format: "written",
          marks: 10,
          requirement: "Advise the directors on the revenue recognition for the contract, including the proposed modification.",
          plan: [
            { step: "Steps one and two on the facts", detail: "Confirm the contract and separate the promises — argue distinctness from the customer's ability to benefit and the contract's context, not from the price list." },
            { step: "Build the transaction price", detail: "Strip financing, estimate variable amounts, and apply the constraint explicitly — say what is excluded and why." },
            { step: "Take the over-time test criterion by criterion", detail: "Tie each limb to a quoted contract term; conclude on the recognition pattern and the measure of progress." },
            { step: "Classify the modification", detail: "Distinct additions at stand-alone price → separate contract; otherwise termination-and-replacement or catch-up — and show the number it moves." },
            { step: "Name the incentive", detail: "Say which judgement management is leaning on and what the balanced reading reports." },
          ],
          answer:
            "The arrangement is a contract within IFRS 15: enforceable, with commercial substance, and collection is probable. It contains two promises — the plant's construction, and five years of maintenance — which are distinct: the maintenance is sold separately by the entity and the plant functions without it, so the promises are separately identifiable.\n\nThe price allocates by stand-alone selling prices. The $2m early-completion bonus is variable consideration: completion depends substantially on weather and third-party consents, so it is not highly probable that including it would avoid a significant reversal, and it is excluded until the uncertainty resolves.\n\nThe construction obligation is satisfied over time: the plant is built on the customer's site, so the customer controls the asset as it is created — the first and second criteria are engaged, and the right-to-payment analysis is not needed. Revenue is recognised on an input measure of progress, with uninstalled materials carried at zero margin. The maintenance obligation is a series of distinct daily services recognised evenly, or by usage where effort tracks usage.\n\nThe proposed modification adds a second, materially identical plant at a price below its stand-alone selling price. The added plant is distinct, so the discount cannot be swept into the existing contract's measure of progress: the original contract terminates as modified and the unrecognised consideration plus the new price spreads over the remaining goods — the directors' preference for a cumulative catch-up, which would accelerate revenue into the current period, applies only where the remaining goods are not distinct, which is not the case here.",
          earns: [
            "Distinctness argued on both limbs with facts",
            "The constraint applied and its exclusion stated",
            "Over-time criteria tied to quoted terms",
            "The modification routed correctly with the directors' preferred route rebutted",
          ],
          loses: [
            "Reciting five steps without touching the scenario",
            "Including the bonus because management is 'confident'",
            "Asserting over-time recognition without naming a criterion",
            "Missing that the modification adds distinct goods",
          ],
        },
      ],
      check: {
        q: "A shipbuilder constructs a vessel to a customer's unique specification. The contract lets the customer cancel at any time, forfeiting only its 10% deposit. Which recognition pattern do these terms produce?",
        options: [
          "Over time — bespoke assets always qualify",
          "Point in time on delivery: no alternative use is met, but there is no enforceable right to payment for performance to date, so the third criterion fails and no other applies",
          "Over time — the deposit is a right to payment",
          "No revenue until the cancellation right lapses",
        ],
        correct: 1,
        explain:
          "The third criterion needs both limbs. Uniqueness delivers no-alternative-use, but a cancellation exposing the builder to everything beyond a 10% deposit is not a right to payment for work done plus margin. With the customer controlling nothing during the build and consuming nothing, the vessel's revenue arrives at delivery — the lumpy pattern management least likes, which is why the payment clause is the term to renegotiate, not the accounting.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Arguing recognition timing from delivery, invoicing or cash.",
      fix: "Control is the only test — apply the over-time criteria, then the point-in-time indicators, to the contract's terms.",
    },
    {
      trap: "Including variable consideration because management expects to earn it.",
      fix: "Apply the constraint: only amounts highly unlikely to significantly reverse enter revenue; binary external outcomes stay out.",
    },
    {
      trap: "Treating every modification as a cumulative catch-up.",
      fix: "Route it first: distinct additions never touch revenue already recognised — catch-up is only for continuing, non-distinct work.",
    },
    {
      trap: "Ignoring the financing inside long payment terms.",
      fix: "More than a year between transfer and payment means discounting, with the difference reported as interest, not revenue.",
    },
  ],
  keyTerms: [
    { term: "Performance obligation", def: "A promise to transfer a distinct good or service — the unit revenue recognition attaches to." },
    { term: "Distinct", def: "Capable of benefiting the customer alone or with readily available resources, and separately identifiable within the contract's context." },
    { term: "Variable consideration constraint", def: "Variable amounts enter the price only to the extent a significant revenue reversal is highly improbable when the uncertainty resolves." },
    { term: "Control (of a good or service)", def: "The ability to direct the use of, and obtain substantially all the remaining benefits from, the asset — the trigger for revenue." },
    { term: "Cumulative catch-up", def: "Adjusting revenue recognised to date, through current profit or loss, when a modification changes a single continuing performance obligation." },
  ],
  summary: [
    "Revenue depicts the transfer of control at the amount the entity expects to be entitled to — every judgement hangs off that sentence.",
    "Distinctness is a profit-timing lever; argue it from the customer's ability to benefit and the contract's context.",
    "The constraint is deliberately asymmetric: optimistic variable amounts stay out until reversal risk is remote.",
    "Over-time recognition needs a criterion, and the third one turns on the payment clause's drafting.",
    "Modifications route three ways — separate contract, terminate-and-replace, catch-up — and only the last touches recognised revenue.",
  ],
  knowledgeDiagnostic: [
    { q: "What single principle organises IFRS 15?", a: "Recognise revenue to depict the transfer of promised goods or services to the customer, at the consideration the entity expects to be entitled to — control transferring, not risk-and-reward or invoicing." },
    { q: "State the two limbs of distinctness.", a: "The customer can benefit from the good or service on its own or with readily available resources, and the promise is separately identifiable from other promises in the contract." },
    { q: "When does a bespoke asset fail over-time recognition?", a: "When the enforceable-right-to-payment limb fails — cancellation terms that leave the builder with only a deposit mean no right to cost plus margin for performance to date." },
    { q: "How does a modification adding distinct goods at a discount get treated?", a: "Terminate-and-replace: the old contract ends, and remaining consideration plus the new price spreads prospectively over the remaining goods — never a catch-up through current revenue." },
  ],
  furtherStudy: [
    "SBR-10 takes this model into the structures built to game it — returns, repurchases, agents, warranties",
    "SBR-02's toolkit shows premature revenue as the flagship earnings-management technique",
    "Area D applies control thinking to whole entities; the concept is the same lever at a larger scale",
    "SBR-04's substance-over-form critique is the fallback when a structure defeats the words",
  ],
}

const SBR_TREE_10: StudyChapter = {
  paper: "SBR",
  id: "SBR-10",
  number: 10,
  area: "C",
  syllabusRefs: ["C1(c)"],
  title: "Revenue: the hard applications",
  minutes: 17,
  intro:
    "The syllabus lists them by name — rights of return, repurchases, consignment, bill-and-hold, warranties, principal versus agent, up-front fees — because each is a structure where legal form and revenue substance separate. Learn the diagnostic for each, and the incentive it defeats.",
  outcomes: [
    "Account for sales with a right of return using refund liabilities and return assets",
    "Read repurchase agreements as leases or financings from the repurchase price and option-holder",
    "Distinguish consignment and bill-and-hold arrangements from completed sales using control indicators",
    "Split assurance from service warranties and account for each correctly",
    "Determine principal versus agent from control of the specified good or service, and report gross or net accordingly",
    "Treat non-refundable up-front fees as advance payment for future goods unless a distinct service transfers",
  ],
  sections: [
    {
      id: "returns-repurchases",
      heading: "Returns and repurchase agreements",
      blocks: [
        {
          kind: "text",
          md: "A **right of return** makes part of the consideration variable. Revenue is recognised only for goods expected to be kept: the expected returns become a **refund liability**, and a **return asset** is recognised for the right to recover the goods, measured at former carrying amount less recovery costs. The mechanics matter less than the diagnostic: an entity that ships heavily near period end on generous return terms has manufactured revenue exactly as far as the constraint lets it — estimated honestly, most of that revenue never existed.",
        },
        {
          kind: "text",
          md: "**Repurchase agreements** are read from two facts: who holds the repurchase right, and the repurchase price relative to the original selling price and expected market value. An entity **obligation or right to repurchase** (forward or call) means the customer never obtained control: below original price, the arrangement is a **lease**; at or above, a **financing** — the asset stays, the cash is a liability, the excess is interest. A **customer put** is subtler: if the customer has significant economic incentive to exercise (repurchase price above expected market value), it will — treat as lease or financing; if not, it is a sale with a right of return.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Repurchase diagnostic",
            data: {
              steps: [
                { label: "Who can compel repurchase?", sub: "Entity forward/call vs customer put" },
                { label: "Entity holds it", sub: "Customer never controls: price < original → lease; ≥ original → financing" },
                { label: "Customer holds it", sub: "Significant incentive to exercise? Yes → lease/financing; no → sale with return right" },
                { label: "Report substance", sub: "Asset retained, liability and interest — or a genuine sale" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The year-end 'sale' to a friendly buyer",
          md: "The classic plant: sell inventory to a bank or related intermediary just before year end, with repurchase next period at cost plus a lender's margin. Both readings of the diagnostic land on financing — the 'buyer' bears no inventory risk and earns interest. Revenue reverses, inventory returns, and a borrowing appears; the scenario usually adds a covenant or bonus to explain the enthusiasm.",
        },
      ],
      check: {
        q: "An entity sells goods for $10m with the customer holding a put to sell them back in one year at $10.4m. Expected market value at that date is $8m. How should the arrangement be reported?",
        options: [
          "A sale of $10m with a disclosed contingency",
          "As a financing: the customer's put is deeply in the money against expected market value, so exercise is economically compelled — the entity retains the goods, records a $10m liability and accrues $0.4m interest",
          "A sale with a right of return, since the customer chooses",
          "A lease, because the repurchase price exceeds the original price",
        ],
        correct: 1,
        explain:
          "A put the customer would be irrational not to exercise binds like a forward: $10.4m back against goods worth $8m means the goods are coming back, and the $0.4m is the customer's lending return. The choice in option 2 is nominal, not economic. Option 3 misapplies the price test — above original price with compelled exercise is financing, not lease.",
      },
    },
    {
      id: "consignment-billhold-warranties",
      heading: "Consignment, bill-and-hold, warranties",
      blocks: [
        {
          kind: "text",
          md: "**Consignment** — product delivered to a dealer who sells on the entity's behalf — is not a sale on delivery: the entity controls the product until the dealer sells it (indicators: entity can require return or transfer, dealer has no unconditional payment obligation). Revenue waits for the end sale. **Channel stuffing** often hides behind consignment-like terms: 'sales' to distributors with full return rights and payment due only on resale are consignment in substance whatever the invoice says.",
        },
        {
          kind: "text",
          md: "**Bill-and-hold** — the customer asks the entity to hold purchased goods — can be a genuine sale, but only where the reason is substantive (customer's warehouse burned down, not year-end accommodation), the product is identified separately and ready, and the entity cannot use or redirect it. Absent those, revenue is being recognised on inventory that merely changed labels in the warehouse. The examiner's tell is who *requested* the arrangement and when.",
        },
        {
          kind: "table",
          caption: "Warranties — the split that matters",
          head: ["Type", "Test", "Accounting"],
          rows: [
            ["Assurance warranty", "Promises the good complies with agreed specification", "Not a performance obligation — an IAS 37 provision at expected cost"],
            ["Service warranty", "Provides a service beyond spec-compliance, or is separately purchasable", "A distinct performance obligation — allocate price, recognise over the service period"],
            ["Mixed", "Extended cover bundled 'free' with the product", "Split: the extension is a service warranty deferring part of the price"],
          ],
        },
        {
          kind: "illustration",
          title: "The free five-year warranty that defers revenue",
          md: "A machinery seller advertises 'five-year warranty included' where the market norm and its own legal obligation run to one year. Year one is assurance — provision for expected claims. Years two to five are a service the customer effectively paid for inside the price: a separate performance obligation, so part of the transaction price defers and unwinds over four years. Management's preference for calling the whole thing assurance books everything today and provisions cheaply — the split is worth revenue timing, which is why the examiner keeps setting it.",
        },
      ],
      check: {
        q: "On 30 December an entity invoices a customer for goods, moves them to a 'sold goods' bay in its own warehouse, and recognises revenue. The customer did not request the arrangement and collection is scheduled for February. Is the revenue properly recognised?",
        options: [
          "Yes — invoicing plus segregation transfers control",
          "No — the bill-and-hold criteria fail: there is no substantive customer reason for the arrangement, so control has not transferred and the goods are still inventory",
          "Yes, provided the goods are insured by the customer",
          "No — bill-and-hold sales are never permitted",
        ],
        correct: 1,
        explain:
          "The first bill-and-hold criterion is a substantive reason for the customer — and here the arrangement exists because the seller wanted December revenue. Segregating shelves does not give the customer the ability to direct the goods' use. Option 3 overcorrects: with a genuine customer request and the criteria met, bill-and-hold revenue is legitimate.",
      },
    },
    {
      id: "agent-and-upfront",
      heading: "Principal versus agent; up-front fees",
      blocks: [
        {
          kind: "text",
          md: "When another party is involved in providing goods or services, the entity asks: do I **control the specified good or service before it transfers** to the customer? A **principal** does — and reports gross revenue with cost of sales. An **agent** merely arranges — and reports its fee. The indicators (primary responsibility for fulfilment, inventory risk, discretion over pricing) are evidence of control, not a scorecard: the conclusion follows the control analysis, and the standard is explicit that they carry different weight in different facts.",
        },
        {
          kind: "text",
          md: "The stakes are optics: gross versus net does not change profit, but it changes **revenue** — the growth metric platforms are valued on. A marketplace booking $100m gross with $97m 'cost of sales' looks thirty times larger than the $3m agent it is. SBR scenarios put a listing or acquisition nearby and let you infer why management prefers gross. The answer states the control test, works the indicators, and names the valuation incentive.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Non-refundable up-front fees — the questions to ask",
          items: [
            "**Does the fee transfer a distinct service?** Joining work that gives the customer nothing on its own (account setup, connection) is not a performance obligation — the fee is an advance on future goods or services",
            "**Over what period does it defer?** The contract term — extended to expected renewals where the fee gives renewing customers a material right they would otherwise pay for again",
            "**What would gaming look like?** Recognising 'activation' fees on day one front-loads revenue for work that benefits nobody but the seller's ledger",
          ],
        },
        {
          kind: "examQuestion",
          title: "Discuss gross versus net presentation for an intermediary",
          format: "written",
          marks: 8,
          requirement: "Discuss whether the entity should report revenue as principal or agent for its platform sales, and the implications of the directors' preferred treatment.",
          plan: [
            { step: "State the control test first", detail: "Principal status turns on controlling the specified good or service before transfer — the indicators serve the test, not the other way round." },
            { step: "Work the indicators on the facts", detail: "Who fulfils, who bears inventory risk, who prices? Weigh them; do not count them." },
            { step: "Conclude gross or net", detail: "Commit, and quantify what each presentation reports for the scenario's volumes." },
            { step: "Name the incentive and the characteristic offended", detail: "Revenue-multiple valuation or growth story; faithful representation is the Framework hook." },
            { step: "Sweep the disclosure", detail: "Judgement disclosure for the conclusion, and consistency with how the entity describes itself outside the accounts." },
          ],
          answer:
            "Principal-versus-agent is decided by control: does the entity control the ticket before it transfers to the traveller? The airlines set prices and remaining capacity, fulfil the flight, and bear the cost of failure to perform; the platform never holds tickets, cannot redirect them, and earns a fixed 4% regardless of fare. Its service to the traveller is arrangement. On these facts the entity does not control the specified service and is an agent.\n\nRevenue is therefore the commission — approximately $12m on the $300m of bookings — not the gross fare. The directors' preferred gross presentation would report revenue twenty-five times larger with identical profit, and the timing of their preference, ahead of a listing priced on a revenue multiple, indicates the motive. Gross presentation here would not faithfully represent the entity's activity: users would read $300m as the scale of business the entity performs, which it does not.\n\nThe conclusion is a significant judgement requiring disclosure, and the description of the business model in the prospectus should match the accounting — an entity marketing itself as a marketplace while reporting like a carrier invites regulatory challenge on both documents.\n\nIf contract terms changed — the platform taking inventory risk on committed seat blocks, setting fares, and bearing refund risk — the control conclusion could genuinely differ; the analysis follows the arrangement's substance, not the label preferred for it.",
          earns: [
            "Control test stated before indicators",
            "Indicators weighed on facts, with a committed conclusion",
            "The valuation incentive named with the presentation quantified",
            "Judgement disclosure and prospectus consistency swept",
          ],
          loses: [
            "Scoring indicators three-to-two like a checklist",
            "Concluding 'it depends' after listing both readings",
            "Missing that profit is unchanged — the issue is faithful representation of scale",
            "No disclosure point",
          ],
        },
      ],
      check: {
        q: "A gym charges a $200 non-refundable joining fee plus $50 monthly, cancellable after the 12-month minimum term. Most members stay about three years, and rejoining requires paying the fee again. Over what period should the joining fee be recognised?",
        options: [
          "Immediately — it is non-refundable and joining work is complete",
          "Over the expected three-year membership: the fee transfers no distinct service and gives renewing members a material right, so it is an advance recognised over the period it covers in substance",
          "Over the 12-month minimum term in all cases",
          "When the member eventually cancels",
        ],
        correct: 1,
        explain:
          "Processing a joining form benefits nobody but the gym — no distinct service transfers, so the fee is an advance on gym access. Because renewal without re-paying the fee is a material right, the recognition period extends past the minimum term to expected membership. Non-refundability (option 0) governs cash, never revenue timing.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Reading a repurchase clause as a detail rather than the transaction's identity.",
      fix: "Run the diagnostic first: who compels repurchase and at what price decides sale, lease or financing before anything else matters.",
    },
    {
      trap: "Recognising revenue on deliveries the customer has no unconditional obligation to pay for.",
      fix: "Return rights, resale-contingent payment and consignment indicators mean control stayed — revenue waits for the end sale.",
    },
    {
      trap: "Calling every warranty an IAS 37 provision.",
      fix: "Split assurance from service: anything beyond spec-compliance defers revenue as a separate obligation.",
    },
    {
      trap: "Deciding principal versus agent by who invoices the customer.",
      fix: "Invoicing is administration; control of the specified good or service before transfer is the test.",
    },
  ],
  keyTerms: [
    { term: "Refund liability", def: "The portion of consideration received or receivable that the entity expects to return to customers — recognised instead of revenue for expected returns." },
    { term: "Bill-and-hold", def: "A sale where the entity retains physical possession at the customer's substantive request — revenue only where the customer controls the identified, ready goods." },
    { term: "Assurance warranty", def: "A promise that the product meets agreed specification — a cost provision, not a performance obligation." },
    { term: "Principal", def: "An entity that controls the specified good or service before it transfers to the customer, reporting revenue gross." },
    { term: "Material right", def: "An option granted with a purchase that the customer would not receive otherwise — a separate performance obligation deferring part of the price." },
  ],
  summary: [
    "Returns convert revenue to refund liabilities to the extent goods are expected back; heavy period-end shipping on soft terms is the tell.",
    "Repurchase terms decide identity: entity-held rights mean lease or financing; customer puts follow economic compulsion.",
    "Consignment and cosmetic bill-and-hold keep control — and revenue — with the seller.",
    "Warranties split at spec-compliance: beyond it, revenue defers as a service obligation.",
    "Principal-versus-agent follows control and moves the revenue line only — which is exactly why it gets litigated before listings.",
  ],
  knowledgeDiagnostic: [
    { q: "How does a customer put become a financing?", a: "When the repurchase price sits above the asset's expected market value, exercise is economically compelled — the entity keeps the asset, records a liability, and the excess accrues as interest." },
    { q: "Name the three bill-and-hold essentials.", a: "A substantive customer reason for holding, goods separately identified and ready for transfer, and no ability for the entity to use or redirect them." },
    { q: "What makes a warranty a performance obligation?", a: "Service beyond assurance that the product meets specification — including any warranty the customer could buy separately — which defers allocated revenue over the cover period." },
    { q: "Why do up-front fees usually defer?", a: "Because joining or activation work transfers nothing distinct to the customer; the fee is advance consideration for the future goods or services, spread over the period including renewals it effectively covers." },
  ],
  furtherStudy: [
    "SBR-09 supplies the model these structures try to bend",
    "SBR-02 files each of these under its earnings-management technique",
    "SBR-06's derecognition analysis is the same substance discipline applied to assets generally",
    "Area E's earnings-quality analysis reads these structures from the investor's side",
  ],
}

const SBR_TREE_11: StudyChapter = {
  paper: "SBR",
  id: "SBR-11",
  number: 11,
  area: "C",
  syllabusRefs: ["C2(a)", "C2(e)"],
  title: "PPE, revaluation and borrowing costs",
  minutes: 15,
  intro:
    "Property, plant and equipment looks like assumed knowledge — until the exam asks which costs stop capitalising, what a revaluation does to future profit, and why a components policy changes reported earnings. SBR tests the judgements inside the familiar mechanics.",
  outcomes: [
    "Determine what capitalises into PPE and, as importantly, when capitalisation stops",
    "Account for revaluations both directions, including the reserve's interaction with profit or loss",
    "Explain the profit consequences of the revaluation choice — depreciation drag with no P&L upside",
    "Apply component accounting and overhaul capitalisation, and connect them to earnings quality",
    "Capitalise borrowing costs for qualifying assets, handling specific and general borrowings and suspension",
  ],
  sections: [
    {
      id: "cost-and-components",
      heading: "Cost, components, and where capitalisation ends",
      blocks: [
        {
          kind: "text",
          md: "PPE is recognised at cost: purchase price plus **directly attributable** costs of bringing the asset to the location and condition for intended operation — site preparation, professional fees, testing (net of sale proceeds from items produced while testing, which are income, not cost offsets at SBR's level of currency), and the initial estimate of dismantling obligations. Capitalisation **stops** when the asset is capable of operating as intended — not when management starts using it fully. Costs of running below capacity, initial losses and relocation are expenses, and scenarios plant them inside a proudly capitalised 'project cost' total.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The lines the examiner draws through a capitalised total",
          items: [
            "**Abnormal waste** — the flood damage rework capitalised as 'construction cost' is an expense",
            "**Training** — a capability of people, not a condition of the asset: always expense",
            "**Pre-opening marketing and launch events** — expense, however 'directly attributable' management calls them",
            "**Administration and general overhead** — expense unless genuinely construction-specific",
            "**Post-readiness costs** — once capable of intended operation, everything runs through profit even if commissioning continues",
          ],
        },
        {
          kind: "text",
          md: "**Component accounting** depreciates each significant part over its own life: an aircraft's frame, engines and cabin fit run on different clocks, and a major **overhaul** that restores a component is capitalised while the replaced part is derecognised. This is not bookkeeping pedantry — a whole-asset policy with a blended life understates depreciation early and forces spikes at overhauls, while components smooth honestly. When management resists componentisation 'for simplicity', check what the blended life does to the current year's charge.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Depreciation judgements are estimates in play",
          md: "Useful lives, residual values and methods are reviewed annually, and changes apply prospectively as changes in estimate. A sudden doubling of lives in a bad year is arithmetically legitimate and directionally suspicious — the SBR-01 direction test applies to depreciation as much as to provisions.",
        },
      ],
      check: {
        q: "A new plant reached its intended operating capability on 1 March but ran at 30% capacity until June while customers were found, losing $2m in the period. Management capitalised the $2m as 'commissioning costs'. What is correct?",
        options: [
          "Capitalisation is correct — the plant was still ramping up",
          "The $2m is an operating loss: capitalisation ended on 1 March when the plant was capable of intended operation, and low utilisation is a market condition, not an asset cost",
          "The $2m should be added to inventory",
          "The $2m should be deferred and amortised over the plant's life",
        ],
        correct: 1,
        explain:
          "The boundary is capability, not utilisation: from 1 March the plant could operate as intended, and losses from running it below capacity are period expenses. 'Commissioning' is the label management gives the loss it would rather not report — options 2 and 3 relocate rather than recognise it.",
      },
    },
    {
      id: "revaluation",
      heading: "Revaluation — mechanics, and what it does to profit",
      blocks: [
        {
          kind: "text",
          md: "The revaluation model carries a class of PPE at fair value less subsequent depreciation, revalued with sufficient regularity, applied **class by class** — cherry-picking the appreciating building out of its class is not available. Upward movements credit **OCI** into the revaluation surplus (reversing any previous P&L deficit first); downward movements charge **P&L** (consuming any existing surplus for that asset through OCI first). The asymmetry is deliberate: gains park in equity, losses reach profit.",
        },
        {
          kind: "text",
          md: "The strategic consequences are the SBR material. Revaluing **raises depreciation** on a bigger carrying amount, dragging future profit, while the surplus **never reaches P&L** — it transfers directly within equity as realised (annually for the excess depreciation, or on disposal). So revaluation improves gearing and asset backing but *costs* earnings — which is why entities gear-conscious revalue and earnings-conscious do not, and why a scenario's sudden enthusiasm for revaluation usually coincides with a covenant measured on net assets.",
        },
        {
          kind: "table",
          caption: "What the revaluation choice moves",
          head: ["Metric", "Cost model", "Revaluation model (rising prices)"],
          rows: [
            ["Carrying amounts / net assets", "Historic, lower", "Current, higher — gearing improves"],
            ["Depreciation charge", "Lower", "Higher — EPS drags every period"],
            ["Disposal gains", "Larger (low base)", "Smaller — the surplus bypasses P&L to retained earnings"],
            ["Volatility", "None from prices", "OCI absorbs swings; deficits can hit P&L"],
          ],
        },
        {
          kind: "illustration",
          title: "The disposal that 'lost' its profit",
          md: "A property bought at $10m and revalued to $18m sells for $19m. Management expected a $9m headline gain; the statements show $1m in profit or loss, with the $8m surplus transferring within equity. Nothing was lost — the gain was reported as it accrued, in OCI — but a board using disposals to manufacture profit has mislaid its lever. That, and not the journal entries, is the exam point: revaluation pre-commits gains away from the earnings line.",
        },
      ],
      check: {
        q: "An entity revalues a property upwards by $5m; two years later the market falls and the same property's value drops $7m. How is the $7m movement reported (surplus balance $5m, before transfer policy effects)?",
        options: [
          "$7m charged to profit or loss",
          "$7m charged to OCI",
          "$5m against the revaluation surplus through OCI, and $2m charged to profit or loss",
          "Deferred until disposal",
        ],
        correct: 2,
        explain:
          "Deficits first consume the surplus standing for that asset (through OCI), and only the excess reaches profit or loss. The asymmetry runs both ways in sequence: earlier P&L deficits would be reversed through profit before any new surplus builds. Answers 0 and 1 each apply half the rule everywhere.",
      },
    },
    {
      id: "borrowing-costs",
      heading: "Borrowing costs — capitalisation with edges",
      blocks: [
        {
          kind: "text",
          md: "Borrowing costs **directly attributable** to acquiring or constructing a **qualifying asset** — one taking a substantial period to ready — capitalise as part of its cost. For **specific borrowings**, capitalise actual interest less investment income on temporarily surplus funds. For **general borrowings**, apply the weighted-average capitalisation rate of the entity's general pool to expenditure on the asset, capped at actual borrowing costs incurred. Capitalisation starts when expenditure, borrowing costs and preparation activities are all under way; it **suspends** during extended interruptions of active development; it **ceases** when the asset is substantially ready.",
        },
        {
          kind: "text",
          md: "The judgement edges the exam uses: a **land bank held for future development** is not a qualifying asset while nothing happens to it — capitalising interest onto idle land converts financing cost into 'asset' without any activity to justify it. A project **paused for a redesign** required by the development itself continues capitalising; one paused because funding dried up suspends. And capitalisation cannot rescue recoverability: interest piled onto a project whose value has fallen simply enlarges the impairment SBR-12 will measure.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Interest capitalisation as earnings management",
          md: "Every dollar capitalised is a dollar missing from finance costs — so aggressive readings of 'active development' and generous capitalisation rates flatter both profit and interest cover, the covenant metric. The direction test applies: an entity that suspends slowly, resumes quickly and applies its highest-rate debt to the calculation is optimising, not accounting.",
        },
      ],
      check: {
        q: "A developer funds a two-year project from its general borrowing pool (weighted average rate 7%). During year one, work halts for five months when the entity's funding is withdrawn, resuming after a refinancing. How should year-one borrowing costs be treated?",
        options: [
          "Capitalise the full year at 7% — the project remained intended for completion",
          "Capitalise at 7% on project expenditure for the active months only: the five-month funding stoppage is an extended interruption of active development, so capitalisation suspends and those months' interest is expensed",
          "Expense everything — general borrowings never capitalise",
          "Capitalise the full year but at a reduced rate",
        ],
        correct: 1,
        explain:
          "Suspension is the rule for extended interruptions that are not necessary parts of readying the asset — a funding failure stops development in fact, whatever the intention. General borrowings do capitalise (option 2 is wrong) via the weighted-average rate on the asset's expenditure; there is no 'reduced rate' mechanism, only on and off.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting capitalisation run past the asset's readiness.",
      fix: "The boundary is capable of intended operation — ramp-up losses, under-utilisation and launch costs are expenses.",
    },
    {
      trap: "Revaluing a single favourite asset.",
      fix: "The model applies to the whole class, revalued with regularity — selective revaluation is the abuse the rule blocks.",
    },
    {
      trap: "Routing revaluation surpluses to profit on disposal.",
      fix: "The surplus transfers within equity, never through P&L — disposal gains are measured from the revalued amount.",
    },
    {
      trap: "Capitalising interest on stalled or idle projects.",
      fix: "Suspension during extended inactivity, cessation at substantial readiness, and no qualifying asset without activity.",
    },
  ],
  keyTerms: [
    { term: "Directly attributable cost", def: "A cost necessarily incurred to bring an asset to the location and condition for its intended operation — the capitalisation test." },
    { term: "Component accounting", def: "Depreciating each significant part of an asset over its own useful life, with replaced components derecognised at overhaul." },
    { term: "Revaluation surplus", def: "The equity reserve accumulating upward revaluations through OCI — realised by transfer within equity, never through profit or loss." },
    { term: "Qualifying asset", def: "An asset that necessarily takes a substantial period to get ready for its intended use or sale — the gate for borrowing-cost capitalisation." },
    { term: "Capitalisation rate", def: "The weighted average rate of the entity's general borrowings, applied to expenditure on a qualifying asset, capped at actual costs incurred." },
  ],
  summary: [
    "Capitalisation ends at capability, not utilisation — the boundary most 'project cost' totals cross.",
    "Components and overhauls put depreciation on honest clocks; blended lives are a smoothing choice.",
    "Revaluation trades earnings for gearing: higher depreciation forever, surpluses that never touch P&L.",
    "Deficits consume the surplus first, then hit profit — the asymmetry that stops losses hiding in equity.",
    "Borrowing costs capitalise on active qualifying assets only, suspend in stoppages, and never cure impairment.",
  ],
  knowledgeDiagnostic: [
    { q: "Name four costs commonly smuggled into a capitalised project total.", a: "Training, abnormal wastage and rework, pre-opening marketing, and post-readiness operating losses labelled commissioning." },
    { q: "What does choosing revaluation do to future reported profit?", a: "Lowers it: depreciation runs on the higher carrying amount every period, and the accumulated surplus bypasses P&L entirely, shrinking disposal gains." },
    { q: "How do general borrowings capitalise?", a: "Weighted-average rate of the general pool applied to expenditure on the qualifying asset, capped at borrowing costs actually incurred; specific borrowings capitalise actual interest net of temporary investment income." },
    { q: "When does interest capitalisation suspend versus continue through a pause?", a: "Suspend for extended interruptions extraneous to the work — funding failures, market delays; continue where the pause is a necessary part of readying the asset, like an engineering redesign." },
  ],
  furtherStudy: [
    "SBR-12 takes the carrying amounts built here through the impairment test",
    "SBR-13 covers the exits: held-for-sale reclassification and investment property transfers",
    "SBR-08 explains the OCI mechanics the revaluation reserve depends on",
    "Area C's fair value chapter supplies the measurement machinery revaluation borrows",
  ],
}

const SBR_TREE_12: StudyChapter = {
  paper: "SBR",
  id: "SBR-12",
  number: 12,
  area: "C",
  syllabusRefs: ["C2(a)"],
  title: "Impairment of assets",
  minutes: 16,
  intro:
    "Impairment is where optimism meets arithmetic: an asset may not be carried above what it can recover through use or sale. The mechanics are simple; the exam lives in the assumptions — and in management's reluctance to run the test at all.",
  outcomes: [
    "Identify impairment indicators and explain when testing is mandatory regardless of indicators",
    "Measure recoverable amount as the higher of fair value less costs of disposal and value in use, and say when each dominates",
    "Construct and challenge a value-in-use calculation — the cash flows, the horizon, the rate",
    "Allocate impairment within a cash-generating unit, respecting goodwill's position and the floor",
    "Reverse impairments correctly — and never for goodwill",
    "Audit a scenario's model the way the examiner intends: assumption by assumption, against the exhibit's facts",
  ],
  sections: [
    {
      id: "when-and-what",
      heading: "When to test, and against what",
      blocks: [
        {
          kind: "text",
          md: "Assets are tested when **indicators** exist — external (market falls, rate rises, technological or legal shifts) or internal (damage, idle capacity, restructuring plans, worse-than-budget performance). Three cases test **annually regardless**: goodwill, indefinite-life intangibles, and intangibles not yet available for use. An entity that 'found no indicators' while losing its largest customer has answered the wrong question — the exam expects indicators read from the scenario, not from management's summary.",
        },
        {
          kind: "text",
          md: "**Recoverable amount** is the higher of **fair value less costs of disposal** — the market's answer, from SBR-22's hierarchy — and **value in use** — the entity's answer: present value of the cash flows from continuing use and ultimate disposal. The 'higher of' matters: an asset a rational owner would sell is not impaired down to a pessimistic use value, and one worth keeping is not impaired to a fire-sale price. Impairment loss = carrying amount minus recoverable amount, charged to P&L (against any revaluation surplus through OCI first for revalued assets).",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The two recoverable amounts",
            data: {
              leftTitle: "Fair value less costs of disposal",
              rightTitle: "Value in use",
              rows: [
                { aspect: "Perspective", left: "Market participants — entity-neutral", right: "This entity's planned use — entity-specific" },
                { aspect: "Inputs", left: "Observable prices where they exist", right: "Management's forecasts, discounted" },
                { aspect: "Manipulable via", left: "Stale or selective 'comparables'", right: "Growth, margins, horizon, rate" },
                { aspect: "Wins when", left: "Asset is worth more sold", right: "Asset is worth more used" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Value in use has rules, not just a formula",
          md: "Cash flows come from **approved budgets, maximum five years** (longer only if justified), extrapolated at a **steady or declining** growth rate not exceeding the long-term rate for the market; they reflect the asset's **current condition** — no unauthorised-restructuring benefits, no enhancement capex; they exclude financing and tax; and the **pre-tax discount rate** reflects the market's view of the asset's risks — not the entity's cost of capital if the asset is riskier, and never a rate chosen for its answer.",
        },
      ],
      check: {
        q: "Testing a struggling division, management's value-in-use model uses ten years of cash flows growing 8% annually (market long-term growth: 2%), including $30m of benefits from a reorganisation the board has not approved. Which challenges are valid?",
        options: [
          "Only the growth rate is challengeable",
          "The horizon exceeds five years without justification, growth exceeds the long-term market rate, and unapproved restructuring benefits must come out — each error inflates the value and defers the loss",
          "The model is acceptable if the auditors approve the assumptions",
          "Value in use may not use growth assumptions at all",
        ],
        correct: 1,
        explain:
          "All three breaches are IAS 36's own rules, and all three point the same way — upwards — which is the bias fingerprint from SBR-01. The steady-or-declining extrapolation cap and the current-condition rule exist precisely because horizon, growth and imagined restructurings are the levers a reluctant impairer reaches for.",
      },
    },
    {
      id: "cgus-and-goodwill",
      heading: "Cash-generating units and goodwill's position",
      blocks: [
        {
          kind: "text",
          md: "Where an asset generates no independent cash inflows, testing moves to its **cash-generating unit** — the smallest group of assets with largely independent inflows. CGU identification is itself a judgement with stakes: bigger units let strong assets shelter weak ones. A loss-making store tested inside a national 'retail network CGU' may never show impairment; tested alone, it does. The standard requires the smallest independent level, and scenario management usually prefers the largest defensible one.",
        },
        {
          kind: "text",
          md: "**Goodwill** cannot be tested alone — it has no cash flows — so it is allocated to the CGUs (or groups, no larger than an operating segment) expected to benefit from the combination, and tested annually with them. An impairment loss in a CGU allocates **first to goodwill**, then pro rata across other assets on carrying amounts — but no asset falls below the highest of its own fair value less costs of disposal, its value in use, and zero: the **floor** redistributes the excess to the remaining assets.",
        },
        {
          kind: "example",
          title: "Allocating a CGU impairment",
          scenario: "A CGU carries goodwill $20m, plant $60m, and a licence $40m (carrying total $120m). Recoverable amount is $75m. The licence's own fair value less costs of disposal is reliably $36m.",
          steps: [
            { label: "Total loss", detail: "$120m − $75m = $45m to allocate." },
            { label: "Goodwill first", detail: "Goodwill absorbs its full $20m; $25m remains." },
            { label: "Pro rata", detail: "Plant and licence share $25m on 60:40 — plant $15m, licence $10m." },
            { label: "Apply the floor", detail: "Licence would fall to $30m, below its $36m floor — cap its loss at $4m; the $6m excess reallocates to plant." },
            { label: "Result", detail: "Goodwill nil; licence $36m; plant $60m − $15m − $6m = $39m. Total $75m ✓." },
          ],
          result: "Goodwill absorbs first and vanishes; the floor protects assets with demonstrable stand-alone value; the residual burden lands on the assets without one.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why goodwill impairment arrives late",
          md: "Goodwill testing has a structural softness the examiner likes discussed: acquired goodwill shelters inside CGUs alongside *internally generated* headroom the entity could never recognise directly — so a failing acquisition can hide behind the organic growth of the unit it was bolted to. Late, lumpy goodwill write-offs that confirm what the market priced years earlier are the predictable result, and citing this dynamic in an evaluation answer scores.",
        },
      ],
      check: {
        q: "Management tests goodwill from a failing acquisition inside a CGU that also contains the group's thriving original business, and finds ample headroom. What is the analytical objection?",
        options: [
          "None — goodwill must be tested within a CGU",
          "If the acquired operations form a separate CGU, or the goodwill was allocated at too high a level, the thriving business's internally generated headroom is sheltering the failed acquisition — allocation must follow the level at which the goodwill is monitored, at the smallest group benefiting from the synergies",
          "Goodwill should be tested as a stand-alone asset",
          "The original business must be written down instead",
        ],
        correct: 1,
        explain:
          "The rule is a compromise (goodwill genuinely cannot cash-flow alone), but it has limits: allocation no larger than an operating segment, at the level management actually monitors the goodwill. Testing a bolt-on inside the whole group's strongest unit converts unrecognisable internal goodwill into a shield for a real loss — the structural critique worth writing.",
      },
    },
    {
      id: "reversals-and-reading",
      heading: "Reversals, and reading a model like the examiner",
      blocks: [
        {
          kind: "text",
          md: "Impairment losses reverse when the estimates that produced them improve — but only up to the carrying amount the asset would have had (net of depreciation) had no impairment occurred: recovery restores, it never creates. **Goodwill impairments never reverse** — a rebound would be internally generated goodwill wearing the old goodwill's number. Reversals share the direction problem in mirror image: a big-bath year's over-impairment converts into future 'recoveries' precisely when management needs them, which is why reversal timing deserves the same scepticism as loss timing.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The assumption audit — run it on every scenario model",
          items: [
            "**Cash flows vs recent actuals** — forecasts that hockey-stick off a declining base need a stated reason",
            "**Growth vs market** — extrapolation above long-term market growth breaches the cap",
            "**Horizon** — more than five years of detailed forecast requires justification",
            "**Restructuring and capex** — only committed restructurings and maintenance capex belong; enhancements do not",
            "**Rate** — pre-tax, asset-risk-specific; the entity's WACC understates for riskier-than-average assets",
            "**Internal consistency** — inflation in flows must match inflation in the rate; currency of flows must match currency of rate",
            "**Sensitivity disclosure** — thin sensitivity language around a nil-headroom conclusion is a finding in itself",
          ],
        },
        {
          kind: "illustration",
          title: "The model that survives every check and still smells",
          md: "A scenario model can pass each mechanical rule — five-year horizon, 2% terminal growth, plausible rate — and still deserve challenge because its year-one forecast assumes the loss-making contract renews at triple margin, contradicting the exhibit's statement that the customer is retendering. The examiner's highest marks sit there: not in the rulebook, but in reading the model *against the rest of the scenario*. Every impairment answer should end by checking the assumptions against facts stated elsewhere in the question.",
        },
      ],
      check: {
        q: "Two years after impairing a plant by $10m, demand recovers and management reverses $14m, citing improved forecasts, bringing the plant above its depreciated historical-cost path. Is this acceptable?",
        options: [
          "Yes — recoverable amount now supports the higher figure",
          "No — a reversal is capped at the carrying amount the plant would have had, net of depreciation, absent the original impairment; the excess is an upward revaluation only available under the revaluation model through OCI",
          "No — impairment losses can never reverse",
          "Yes, provided the reversal goes through OCI",
        ],
        correct: 1,
        explain:
          "The cap preserves the cost model's integrity: impairment reflects evidence, and its reversal restores the path the asset would have walked — it cannot mint gains above it through profit. Option 2 overshoots (non-goodwill reversals are required when estimates change); option 3 confuses the cost and revaluation models' channels.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Accepting 'no indicators were identified' from a scenario full of them.",
      fix: "Read the exhibit: lost customers, rate rises, idle lines and missed budgets are indicators whoever identifies them.",
    },
    {
      trap: "Impairing to value in use without checking the selling alternative.",
      fix: "Recoverable amount is the HIGHER of the two — a rational sale can rescue a pessimistic use value, and vice versa.",
    },
    {
      trap: "Allocating CGU losses pro rata from the start.",
      fix: "Goodwill absorbs first, then pro rata with the floor — no asset falls below its own defensible stand-alone value.",
    },
    {
      trap: "Reversing goodwill impairment, or reversing others above the no-impairment path.",
      fix: "Goodwill never reverses; everything else reverses only to depreciated historical carrying amount.",
    },
  ],
  keyTerms: [
    { term: "Recoverable amount", def: "The higher of an asset's (or CGU's) fair value less costs of disposal and its value in use." },
    { term: "Cash-generating unit", def: "The smallest identifiable group of assets generating cash inflows largely independent of other assets — the testing level when assets don't cash-flow alone." },
    { term: "Value in use", def: "The present value of future cash flows from an asset's continued use and disposal, built on current-condition forecasts and a pre-tax, risk-appropriate rate." },
    { term: "Impairment floor", def: "In CGU allocation, no asset is written below the highest of its own fair value less costs of disposal, value in use, and zero." },
    { term: "Headroom", def: "The excess of recoverable amount over carrying amount — the buffer whose disappearance sensitivity disclosure is supposed to reveal." },
  ],
  summary: [
    "Test on indicators; goodwill, indefinite-life and not-yet-ready intangibles test annually regardless.",
    "Recoverable amount is the higher of market exit and entity use — check both directions before concluding.",
    "Value in use has rules — horizon, growth cap, current condition, pre-tax risk-matched rate — and each is a lever to audit.",
    "CGU losses hit goodwill first, then pro rata with the floor; goodwill's shelter inside strong units explains why its impairments arrive late.",
    "Reversals restore, never create — and never for goodwill; reversal timing gets the same direction test as loss timing.",
  ],
  knowledgeDiagnostic: [
    { q: "Which assets are tested annually without indicators?", a: "Goodwill, intangibles with indefinite useful lives, and intangibles not yet available for use." },
    { q: "State the value-in-use forecast disciplines.", a: "Approved budgets to a maximum of five years, extrapolation at steady or declining growth capped at the market's long-term rate, current-condition cash flows excluding unapproved restructurings and enhancement capex, financing and tax excluded, discounted pre-tax at the asset's risk." },
    { q: "How does a CGU impairment allocate?", a: "Goodwill to zero first; the remainder pro rata over other assets by carrying amount, subject to the floor — no asset below its own fair value less costs of disposal, value in use, or zero — with the excess redistributed." },
    { q: "Why does acquired goodwill's testing regime let losses arrive late?", a: "Goodwill shelters inside CGUs alongside internally generated headroom that could never be recognised directly, so a failing acquisition hides behind the organic strength of the unit it joined until the gap grows too big to shelter." },
  ],
  furtherStudy: [
    "Area C's fair value chapter supplies the fair-value half of recoverable amount",
    "SBR-11 built the carrying amounts this chapter tests; SBR-13 covers the held-for-sale exit",
    "Area D's goodwill chapters show where the tested goodwill comes from",
    "SBR-07's uncertainty disclosures are where a nil-headroom conclusion must show itself",
  ],
}

const SBR_TREE_13: StudyChapter = {
  paper: "SBR",
  id: "SBR-13",
  number: 13,
  area: "C",
  syllabusRefs: ["C2(b)", "C2(c)", "C2(d)"],
  title: "Held for sale, investment property and intangibles",
  minutes: 16,
  intro:
    "Three classification regimes where what an asset is for determines how it is measured — and where reclassification changes the numbers without changing the asset. The exam tests the gates: qualification for held-for-sale, use-change for investment property, and the recognition wall for intangibles.",
  outcomes: [
    "Apply the held-for-sale criteria strictly, and account for classification, measurement and cessation of depreciation",
    "Identify discontinued operations and explain what their separate presentation protects",
    "Classify investment property, account under both models, and handle transfers at use-change with their asymmetric mechanics",
    "Apply the intangibles recognition wall: purchased versus internally generated, and the six development criteria",
    "Evaluate what these regimes do to profit when management steers classification",
  ],
  sections: [
    {
      id: "held-for-sale",
      heading: "Held for sale — a strict gate, then a different measurement",
      blocks: [
        {
          kind: "text",
          md: "A non-current asset (or disposal group) classifies as **held for sale** when its carrying amount will be recovered principally through sale rather than use. The gate is deliberately strict: **available for immediate sale** in present condition, and the sale **highly probable** — management committed, an active programme to locate a buyer, active marketing at a **reasonable price**, completion expected within **one year**, and withdrawal unlikely. On classification: measure at the **lower of carrying amount and fair value less costs to sell**, and **stop depreciating**.",
        },
        {
          kind: "text",
          md: "Each criterion blocks an abuse. 'Immediate availability' stops factories 'held for sale' while still fulfilling three years of orders. 'Reasonable price' stops entities marketing at fantasy prices to hold the classification — and its depreciation holiday — indefinitely. The one-year clock (extendable only for delays outside the entity's control where the entity remains committed) forces the classification to mean something. The examiner's scenario usually fails one criterion quietly; the answer is to name it and reverse the accounting: back to cost-model measurement as if never classified, with depreciation caught up.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Discontinued operations protect the trend",
          md: "A component that is a separate major line of business or geographical area (or a subsidiary acquired for resale), disposed of or held for sale, presents as a **discontinued operation**: one line after tax on the face, restated comparatives. The point is predictive value — continuing results are what users project forwards, so leaving a dying division tangled inside them misleads twice: this year's total looks worse, and next year's 'improvement' is just the deconsolidation. Watch the reverse game too: management labelling a struggling-but-staying unit 'discontinued' to quarantine its losses from the continuing story.",
        },
        {
          kind: "table",
          caption: "What held-for-sale classification changes",
          head: ["Item", "Before", "After classification"],
          rows: [
            ["Measurement", "Cost/revaluation model per IAS 16 etc.", "Lower of carrying amount and fair value less costs to sell"],
            ["Depreciation", "Charged", "Ceases — the profit sweetener that motivates early classification"],
            ["Presentation", "Within PPE etc.", "Separate line, current, on the statement of financial position"],
            ["Impairment", "IAS 36 regime", "Write-downs to FVLCS in P&L; later gains only to cumulative losses recognised"],
          ],
        },
      ],
      check: {
        q: "In November, a board resolves to sell a factory 'once the current order book is fulfilled', expected in about 18 months, and classifies it as held for sale, ceasing depreciation. Which criteria fail?",
        options: [
          "None — board commitment is sufficient",
          "The factory is not available for immediate sale in its present condition (it must first work through the order book), and completion within one year is not expected — the classification and depreciation holiday both reverse",
          "Only the one-year test fails, which the order book excuses",
          "Held for sale never applies to factories",
        ],
        correct: 1,
        explain:
          "Two independent failures: immediate availability (the entity's own planned use blocks sale now) and the one-year expectation (18 months, from a cause inside the entity's control — the exception covers external delays like regulatory approval, not the seller's own scheduling). The motive is the depreciation holiday; the correction is measurement as if never classified.",
      },
    },
    {
      id: "investment-property",
      heading: "Investment property — purpose decides the regime",
      blocks: [
        {
          kind: "text",
          md: "**Investment property** is land or buildings held to earn rentals or for capital appreciation, rather than for use in operations or sale in the ordinary course. The classification matters because IAS 40 offers a choice IAS 16 does not: the **fair value model**, carrying the property at fair value with **all changes in profit or loss** — no depreciation, no OCI. One model per portfolio (with rare exceptions), disclosed either way; under the cost model, fair values still disclose.",
        },
        {
          kind: "text",
          md: "The judgement edges: **dual-use property** splits if the portions could be sold separately, otherwise investment classification requires the own-use portion to be insignificant. **Ancillary services** (cleaning, security) do not defeat the classification unless significant enough to make the entity an operator (a hotel) rather than a landlord. **Group twist**: property leased to a subsidiary is investment property in the parent's separate statements but owner-occupied in the consolidated ones — the group occupies its own building.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Transfers at change of use — the asymmetric mechanics",
          items: [
            "**Owner-occupied → investment (fair value model)**: revalue under IAS 16 first — uplift to OCI/revaluation surplus — *then* transfer; the gain does not touch P&L",
            "**Investment (fair value) → owner-occupied or inventory**: fair value at transfer date becomes deemed cost; prior fair value movements have already been through P&L",
            "**Inventory → investment (fair value)**: difference to P&L at transfer — the route with the profit temptation",
            "**Only actual change of use** — management intention alone does not transfer; evidence of use change does",
          ],
        },
        {
          kind: "illustration",
          title: "The developer's reclassification gain",
          md: "A property developer holds completed unsold flats as inventory at cost of $30m; the market values them at $45m. Selling them books the $15m as it sells. 'Deciding' to hold them for rental instead transfers them to investment property at fair value — $15m through profit or loss immediately, no buyers required. The standard's defence is the evidence test: a genuine letting programme (tenants, agents, refurbishment for rental) versus a paper intention that will quietly reverse when the market recovers. The exhibit's facts about actual lettings are what your answer weighs.",
        },
      ],
      check: {
        q: "An entity using the fair value model moves its head office (carrying amount $20m, fair value $28m) out and lets the building to third parties. How is the $8m uplift reported at transfer?",
        options: [
          "In profit or loss — fair value model gains are always P&L",
          "In OCI as a revaluation surplus: the property revalues under IAS 16 up to the moment of transfer, and only subsequent fair value changes reach profit or loss",
          "Not recognised — transfers occur at carrying amount",
          "Deferred and amortised over the lease term",
        ],
        correct: 1,
        explain:
          "The direction of transfer decides the channel: gains that accrued while the building was owner-occupied belong to the IAS 16 regime it is leaving, so the uplift is a revaluation through OCI. Booking pre-transfer appreciation in P&L is exactly the free-profit move the asymmetry blocks — from here on, as investment property, changes do hit profit.",
      },
    },
    {
      id: "intangibles",
      heading: "Intangibles — the recognition wall and its gate",
      blocks: [
        {
          kind: "text",
          md: "An intangible asset — identifiable (separable, or from contractual/legal rights), controlled, carrying future benefits — recognises when benefits are probable and cost measures reliably. The regime's shape: **purchased intangibles recognise** (the price proves value and measures cost, including in business combinations, where acquired brands, customer lists and in-process research capitalise at fair value); **internally generated brands, mastheads, customer lists and goodwill never do** (their cost cannot be distinguished from the cost of growing the business); and internally generated **development** spending crosses the wall only through the six criteria.",
        },
        {
          kind: "text",
          md: "**Research** — original investigation for new knowledge — is always expensed. **Development** — applying findings to produce new or substantially improved outputs — capitalises from the date all six criteria hold: technical **feasibility** of completion, **intention** to complete, **ability** to use or sell, demonstration of **probable economic benefits** (a market, or internal usefulness), adequate **resources** to complete, and reliable **measurement** of the attributable expenditure. Costs expensed before the date the criteria were met stay expensed — no retrospective capitalisation.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The criteria are a self-assessment — audit the direction",
          md: "Whether 'technical feasibility' is demonstrated is management's judgement about its own project, which makes development capitalisation a favourite profit lever: a loss-making year discovers feasibility early; a profitable one finds prudent reasons to keep expensing. The tells: capitalisation starting the month a covenant tightened, projects capitalised while the exhibit describes unresolved technical problems, and amortisation lives stretching beyond the product cycle the scenario describes. Subsequent measurement offers cost or (rarely usable) revaluation via an active market; amortisation over useful life, or annual impairment testing while indefinite or not yet available for use.",
        },
      ],
      check: {
        q: "A pharmaceutical entity capitalises $40m spent on a compound that has passed early trials; regulatory approval — historically achieved by a minority of compounds at this stage — is pending. Is capitalisation appropriate?",
        options: [
          "Yes — passing early trials demonstrates technical feasibility",
          "No — with approval statistically unlikely at this stage, probable future economic benefits are not demonstrated, so the criteria are not yet met and the spending remains research-phase expense",
          "Yes, provided the entity intends to complete development",
          "No — pharmaceutical development can never be capitalised",
        ],
        correct: 1,
        explain:
          "All six criteria must hold, and the binding one here is probable benefits: a minority approval rate means the asset's benefits are possible, not probable. Intention (option 2) is one criterion of six. When approval arrives, capitalisation starts from that date forward — the $40m already expensed does not come back, which is the no-retrospection rule scenarios test.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Granting held-for-sale on board intention alone.",
      fix: "Walk the criteria — immediate availability, active marketing at a reasonable price, one-year completion — and reverse the accounting when one fails.",
    },
    {
      trap: "Reporting pre-transfer gains in P&L when owner-occupied property becomes investment property.",
      fix: "Revalue under IAS 16 through OCI up to the transfer; only post-transfer fair value changes reach profit.",
    },
    {
      trap: "Capitalising a project retrospectively once the criteria are met.",
      fix: "Capitalisation runs from the date all six criteria hold — earlier spending stays expensed.",
    },
    {
      trap: "Recognising internally generated brands because 'they are clearly valuable'.",
      fix: "Value is not the issue; the inability to separate their cost from the cost of the business is — the wall is absolute.",
    },
  ],
  keyTerms: [
    { term: "Held for sale", def: "Classification for assets whose carrying amount will be recovered principally through a highly probable sale within one year — measured at the lower of carrying amount and fair value less costs to sell, undepreciated." },
    { term: "Discontinued operation", def: "A disposed-of or held-for-sale component representing a separate major line of business or geography — presented as one after-tax line with restated comparatives." },
    { term: "Investment property", def: "Land or buildings held for rentals or capital appreciation rather than use or ordinary-course sale — eligible for the fair value model with changes in profit or loss." },
    { term: "Development", def: "Application of research findings to produce new or substantially improved outputs — capitalised from the date six criteria (feasibility, intention, ability, probable benefits, resources, measurement) are all demonstrated." },
    { term: "Identifiability", def: "The intangible-asset requirement of being separable or arising from contractual or legal rights — what distinguishes a recognisable intangible from goodwill." },
  ],
  summary: [
    "Held-for-sale is a strict gate — availability, marketing, price, one year — bought with a depreciation holiday that reverses if the gate was never passed.",
    "Discontinued presentation protects the continuing trend; both directions of misuse (hiding and quarantining) are examinable.",
    "Investment property's fair value model routes changes to P&L — and transfers in are asymmetric precisely to stop free gains.",
    "The intangibles wall: purchased recognises, internally generated brands never, development only through six forward-looking criteria.",
    "All three regimes are classification levers; the direction test from SBR-01 applies to each.",
  ],
  knowledgeDiagnostic: [
    { q: "List the held-for-sale criteria.", a: "Available for immediate sale in present condition; sale highly probable — committed management, active buyer search, marketing at a price reasonable relative to fair value, completion expected within a year, withdrawal unlikely." },
    { q: "How do transfers into and out of fair-value-model investment property differ?", a: "Owner-occupied in: revalue through OCI under IAS 16 first, then transfer. Investment property out: transfer-date fair value becomes deemed cost. Inventory in: difference to P&L — the route needing genuine use-change evidence." },
    { q: "Why can purchased brands recognise while identical internally built ones cannot?", a: "Purchase provides a transaction that both proves benefits and measures cost; an internal brand's cost is inseparable from the general cost of building the business, so any figure would be arbitrary." },
    { q: "When does development capitalisation start and what happens to earlier costs?", a: "From the date all six criteria are demonstrated; everything expensed before that date remains expensed permanently." },
  ],
  furtherStudy: [
    "SBR-12's impairment regime applies to intangibles and pre-sale write-downs alike",
    "Area C's fair value chapter supplies the measurement machinery all three regimes lean on",
    "Area D's business-combination chapters show acquired intangibles crossing the wall at fair value",
    "SBR-11 covers the IAS 16 regime property enters and leaves",
  ],
}

export const SBR_TREE_AREA_C1: StudyChapter[] = [SBR_TREE_09, SBR_TREE_10, SBR_TREE_11, SBR_TREE_12, SBR_TREE_13]
