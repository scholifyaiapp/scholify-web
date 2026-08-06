import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area B — chapters 15 and 16: IFRS 15 Revenue from Contracts with Customers.
 *
 * Chapter 15 is the five-step model. Chapter 16 is the applications that the model does not
 * make obvious — principal against agent, warranties, rights of return, contract costs and
 * the contract asset / receivable / liability distinction.
 *
 * The split matters because the five steps are learnable in an hour and the applications
 * are what the exam actually asks about. A candidate who can recite the steps but cannot
 * say whether a travel agent reports $1,000,000 or $150,000 of revenue has learned the
 * wrong half.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_15: StudyChapter = {
  id: "FR-15",
  number: 15,
  paper: "FR",
  area: "B",
  title: "IFRS 15: the five-step model",
  minutes: 20,
  syllabusRefs: ["B9(a)", "B9(b)", "B9(c)"],
  intro:
    "Five steps, and the fourth one — allocating the price across the promises — is where most of the arithmetic marks are.",
  outcomes: [
    "Apply the five-step model to a contract with a customer",
    "Identify separate performance obligations and explain the 'distinct' test",
    "Estimate variable consideration and apply the constraint",
    "Identify and account for a significant financing component",
    "Allocate the transaction price on relative standalone selling prices and determine when each obligation is satisfied",
  ],
  sections: [
    {
      id: "the-five-steps",
      heading: "The model",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The IFRS 15 five-step model",
            caption: "Work through them in order. Step 4 depends on step 2, and step 5 depends on step 4.",
            data: {
              steps: [
                { label: "1 · Identify the CONTRACT", sub: "Approved, rights identifiable, payment terms identifiable, commercial substance, collection probable" },
                { label: "2 · Identify the PERFORMANCE OBLIGATIONS", sub: "Each distinct good or service, or series of substantially the same" },
                { label: "3 · Determine the TRANSACTION PRICE", sub: "Including variable consideration, subject to the constraint, and any financing component" },
                { label: "4 · ALLOCATE the price to the obligations", sub: "On relative STANDALONE SELLING PRICES" },
                { label: "5 · Recognise revenue as each obligation is SATISFIED", sub: "At a point in time, or over time" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "Step 1 — the contract",
          items: [
            "All five criteria must be met: the parties have **approved** it, each party's **rights are identifiable**, the **payment terms are identifiable**, it has **commercial substance**, and it is **probable that the entity will COLLECT** the consideration.",
            "The collectability criterion is the one that bites. Where collection is not probable at inception, there is no contract under IFRS 15 and no revenue — however clearly the goods have been delivered. Cash received is a liability until the criteria are met.",
            "Two or more contracts with the same customer are **combined** where they are negotiated as a package with a single commercial objective, the consideration in one depends on the other, or the goods and services form a single performance obligation.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Step 2 — the 'distinct' test, in two parts",
          md: "A promised good or service is a **separate performance obligation** if it is **DISTINCT**, which requires **both**:\n\n**Capable of being distinct** — the customer can benefit from it on its own or with resources readily available to it. A machine the customer could use without the entity's installation service is capable of being distinct.\n\n**Distinct within the CONTEXT of the contract** — the promise is separately identifiable from the other promises. It is **not** where the entity provides a significant integration service, where one item significantly modifies or customises another, or where the items are highly interdependent.\n\nThe second limb is what catches candidates. Bricks and labour are each capable of being distinct, but in a contract to build a house they are inputs to a single combined output — one performance obligation, not two.",
        },
      ],
    },
    {
      id: "transaction-price",
      heading: "Step 3 — the transaction price",
      blocks: [
        {
          kind: "formula",
          name: "Determining the transaction price",
          expr: "TRANSACTION PRICE  =  the consideration the entity EXPECTS TO BE\n                       ENTITLED to, excluding amounts collected on\n                       behalf of third parties (e.g. sales tax)\n\n   Adjusted for:\n\n   VARIABLE CONSIDERATION — bonuses, discounts, rebates, penalties,\n      refunds, price concessions. Estimate using either\n         EXPECTED VALUE — probability weighted; use where there is a\n            large number of similar contracts\n         MOST LIKELY AMOUNT — the single most likely outcome; use\n            where there are only TWO possible outcomes\n      ... then apply the CONSTRAINT: include only to the extent it\n      is HIGHLY PROBABLE that a significant REVERSAL of cumulative\n      revenue will not occur\n\n   SIGNIFICANT FINANCING COMPONENT — discount to present value where\n      the timing of payment gives the customer or the entity a\n      significant financing benefit. Not required where the period\n      between transfer and payment is one year or less\n\n   NON-CASH CONSIDERATION — at fair value\n\n   CONSIDERATION PAYABLE TO A CUSTOMER — deduct from the transaction\n      price, unless it is payment for a distinct good or service",
          note: "The choice of estimation method is not free: expected value for many similar contracts, most likely amount for a binary outcome. Using expected value on a single binary contract produces a figure that could never actually arise.",
        },
        {
          kind: "example",
          title: "Estimating variable consideration",
          scenario:
            "Bittern Co enters a single contract to construct an asset for $2,000,000, with a bonus of $200,000 payable if the work is completed by a specified date. Bittern assesses the probability of earning the bonus at 80%. It has no comparable contracts.",
          steps: [
            { label: "Identify the possible outcomes", detail: "There are exactly TWO: $2,000,000 or $2,200,000. Nothing in between can occur — the bonus is all or nothing." },
            { label: "Choose the estimation method", detail: "With only two possible outcomes, the MOST LIKELY AMOUNT better predicts the consideration. At 80% the bonus is more likely than not to be earned, so the most likely amount is $2,200,000." },
            { label: "Show why expected value is wrong here", detail: "Expected value would give $2,000,000 + (80% × $200,000) = $2,160,000 — an amount the entity can never actually receive. Expected value is appropriate where a large number of similar contracts means the average is what the entity will realise in aggregate." },
            { label: "Apply the constraint", detail: "Include the $200,000 only if it is HIGHLY PROBABLE that including it will not lead to a significant reversal of cumulative revenue. At 80%, with the entity's own assessment and no history of comparable contracts, that judgement is finely balanced — factors against include the entity's limited experience and the fact that the outcome depends on factors outside its control." },
            { label: "Reach a defensible conclusion", detail: "If the constraint is satisfied, the transaction price is $2,200,000. If it is not, the price is $2,000,000 and the bonus is recognised when it becomes highly probable — which may be before it is actually received. Either conclusion earns the marks if the reasoning names the method and the constraint." },
          ],
          result:
            "**Most likely amount $2,200,000, subject to the constraint.** The marks are in choosing the method for the right reason and in applying the constraint as a separate step, not in the arithmetic.",
        },
        {
          kind: "example",
          title: "A significant financing component",
          scenario:
            "Shelduck Co sells specialist equipment to a customer, with control transferring immediately. Instead of the cash price, the customer will pay $1,123,600 in two years' time. A rate of 6% reflects the customer's credit characteristics.",
          steps: [
            { label: "Identify the financing", detail: "The customer receives the equipment now and pays in two years. The entity is financing the customer, and two years is well beyond the one-year practical expedient, so the component is significant." },
            { label: "Discount to find the revenue", detail: "$1,123,600 ÷ 1.06² = $1,123,600 ÷ 1.1236 = $1,000,000. This is the revenue recognised on transfer of control." },
            { label: "Recognise the financing separately over the two years", detail: "Year 1: $1,000,000 × 6% = $60,000 of interest income, taking the receivable to $1,060,000. Year 2: $1,060,000 × 6% = $63,600, taking it to $1,123,600. Check: $1,000,000 + $60,000 + $63,600 = $1,123,600." },
            { label: "State the presentation", detail: "The $1,000,000 is REVENUE; the $60,000 and $63,600 are INTEREST INCOME, presented separately from revenue. Recognising the full $1,123,600 as revenue overstates revenue by $123,600 and understates finance income by the same — and it distorts gross margin, which is exactly what an interpretation requirement would pick up." },
            { label: "Note the reverse case", detail: "Where the CUSTOMER pays in advance, the entity is being financed. It recognises a contract liability that is increased by interest EXPENSE, so the revenue eventually recognised is MORE than the cash received." },
          ],
          result:
            "**Revenue $1,000,000, with interest income of $60,000 and $63,600 in the two following years.** The financing component is separated from revenue in both directions.",
        },
      ],
      check: {
        q: "An entity has 400 similar contracts, each with a $10,000 penalty payable if delivery is late. It expects 15% to be late. How should the variable consideration be estimated?",
        options: [
          "Expected value — a large number of similar contracts, so reduce the transaction price by $1,500 per contract",
          "Most likely amount — most contracts will be on time, so no reduction",
          "The maximum possible penalty on every contract, for prudence",
          "No adjustment until a penalty is actually incurred",
        ],
        correct: 0,
        explain:
          "With a large number of similar contracts the expected value method better predicts the consideration to which the entity will be entitled: 15% × $10,000 = $1,500 a contract. The most likely amount method is for situations with only two possible outcomes, and prudence is not a licence to assume the worst.",
      },
    },
    {
      id: "allocate-and-recognise",
      heading: "Steps 4 and 5 — allocation, and when revenue is recognised",
      blocks: [
        {
          kind: "text",
          md: "The transaction price is allocated to each performance obligation in proportion to their **standalone selling prices** — the price at which the entity would sell that good or service **separately** to a customer.\n\nWhere a standalone selling price is not directly observable it must be **estimated**, using an adjusted market assessment approach, an expected cost plus a margin approach, or — only where the other two are not feasible — a **residual approach**, which takes the total price less the observable standalone prices of the other obligations.",
        },
        {
          kind: "example",
          title: "Allocating across two obligations",
          scenario:
            "Teal Co sells a piece of equipment together with two years of servicing for a combined price of $500,000. It sells the equipment separately for $440,000 and equivalent two-year servicing separately for $110,000. Control of the equipment passes on delivery, at the start of the contract.",
          steps: [
            { label: "Identify the performance obligations", detail: "TWO. The customer can benefit from the equipment without the servicing, and from the servicing separately, and neither significantly modifies the other — so both limbs of the distinct test are satisfied." },
            { label: "Total the standalone selling prices", detail: "$440,000 + $110,000 = $550,000. This exceeds the $500,000 contract price, so the customer has received a discount of $50,000 — which is allocated proportionately unless there is evidence it relates to a specific obligation." },
            { label: "Allocate the transaction price", detail: "Equipment: $500,000 × $440,000/$550,000 = $400,000.\nServicing: $500,000 × $110,000/$550,000 = $100,000.\nCheck: $400,000 + $100,000 = $500,000." },
            { label: "Recognise the equipment revenue", detail: "$400,000 at the point control passes — on delivery. This is a point-in-time obligation." },
            { label: "Recognise the servicing revenue", detail: "$100,000 over two years, so $50,000 a year. This is an over-time obligation because the customer simultaneously receives and consumes the benefit." },
            { label: "State the year 1 position", detail: "Revenue $400,000 + $50,000 = $450,000. A CONTRACT LIABILITY of $50,000 for the unperformed second year of servicing. Recognising the whole $500,000 in year 1 overstates revenue by $50,000 and omits the liability." },
          ],
          result:
            "**Year 1 revenue $450,000, with a $50,000 contract liability.** The allocation on relative standalone selling prices, not on cost and not on the contract's own stated split, is the mark-bearing step.",
        },
        {
          kind: "formula",
          name: "Step 5 — over time, or at a point in time?",
          expr: "REVENUE IS RECOGNISED OVER TIME if ANY ONE of these holds:\n\n   1  The customer simultaneously RECEIVES AND CONSUMES the\n      benefits as the entity performs\n         — routine or recurring services, e.g. cleaning, servicing\n\n   2  The entity's performance CREATES OR ENHANCES AN ASSET THE\n      CUSTOMER CONTROLS as it is created\n         — construction on the customer's own land\n\n   3  The entity's performance creates an asset with NO ALTERNATIVE\n      USE to the entity, AND the entity has an ENFORCEABLE RIGHT TO\n      PAYMENT for performance completed to date\n         — a specialised asset built to the customer's specification\n\nOTHERWISE at a POINT IN TIME, when CONTROL transfers. Indicators:\n   the customer has a present obligation to pay\n   legal title has passed\n   physical possession has transferred\n   the significant risks and rewards of ownership have transferred\n   the customer has accepted the asset\n\nMEASURING PROGRESS over time: an OUTPUT method (surveys, units\ndelivered, milestones) or an INPUT method (costs incurred, labour\nhours). Apply one method consistently to each obligation.",
          note: "Note that condition 3 has TWO limbs joined by AND. A specialised asset with no enforceable right to interim payment does NOT give over-time recognition, and that is a common trap.",
        },
        {
          kind: "activity",
          title: "Over time or at a point in time?",
          prompt:
            "For each, state whether revenue is recognised over time or at a point in time, and which condition you rely on:\n\n(i) A three-year office cleaning contract.\n(ii) Construction of a warehouse on the customer's land.\n(iii) Manufacture of a standard machine in the entity's factory, delivered on completion.\n(iv) Manufacture of a bespoke machine usable only by this customer, with a contractual right to payment for work done to date if the customer cancels.\n(v) The same bespoke machine, but with no right to payment on cancellation.",
          answer:
            "(i) OVER TIME, condition 1. The customer receives and consumes the benefit of cleaning as it is performed.\n\n(ii) OVER TIME, condition 2. The customer controls the asset as it is created because it is being built on land the customer owns.\n\n(iii) POINT IN TIME. The machine has an alternative use — the entity could sell it to someone else — so none of the three conditions is met. Revenue on transfer of control, normally delivery.\n\n(iv) OVER TIME, condition 3. Both limbs are satisfied: no alternative use, and an enforceable right to payment for performance to date.\n\n(v) POINT IN TIME. This is the trap. The asset has no alternative use, but the second limb fails — without an enforceable right to interim payment, condition 3 is not met and revenue is deferred until control transfers on completion.\n\n(iv) and (v) differ by one contractual clause and produce completely different revenue profiles. That is why the question asks about the contract terms rather than the nature of the asset.",
        },
      ],
      check: {
        q: "An entity sells a product for $80,000 with a two-year service plan. Standalone selling prices are $70,000 for the product and $14,000 for the plan. How much revenue is recognised on delivery of the product?",
        options: ["$66,667", "$70,000", "$80,000", "$73,333"],
        correct: 0,
        explain:
          "Total standalone selling prices are $84,000, so the product is allocated $80,000 × $70,000/$84,000 = $66,667 and the plan $80,000 × $14,000/$84,000 = $13,333. Only the product's allocation is recognised on delivery; the plan's is recognised over the two years.",
      },
    },
  ],
  examTraps: [
    { trap: "Recognising revenue where collection is not probable.", fix: "There is no contract under IFRS 15 until all five criteria including collectability are met. Cash received is a liability." },
    { trap: "Treating every promised item as a separate performance obligation.", fix: "The item must be capable of being distinct AND distinct within the context of the contract. Inputs to a combined output are one obligation." },
    { trap: "Using expected value for a single contract with a binary outcome.", fix: "Use the most likely amount. Expected value suits a large number of similar contracts." },
    { trap: "Omitting the constraint after estimating variable consideration.", fix: "It is a separate step: include the estimate only to the extent a significant reversal of cumulative revenue is highly probable not to occur." },
    { trap: "Recognising deferred consideration in full as revenue.", fix: "Separate the significant financing component: discount to present value and recognise the unwinding as interest income." },
    { trap: "Allocating the transaction price on cost, or on the contract's stated prices.", fix: "Allocate on relative STANDALONE SELLING PRICES." },
    { trap: "Applying condition 3 for over-time recognition on the 'no alternative use' limb alone.", fix: "It also requires an enforceable right to payment for performance completed to date. Both limbs, or point in time." },
  ],
  keyTerms: [
    { term: "Performance obligation", def: "A promise in a contract to transfer to the customer a distinct good or service, or a series of substantially the same goods or services transferred in the same way." },
    { term: "Distinct", def: "Capable of being distinct — the customer can benefit from it on its own or with readily available resources — and distinct within the context of the contract." },
    { term: "Transaction price", def: "The consideration the entity expects to be entitled to in exchange for transferring the promised goods or services, excluding amounts collected for third parties." },
    { term: "Constraint on variable consideration", def: "Variable consideration is included only to the extent that it is highly probable a significant reversal of cumulative revenue recognised will not occur." },
    { term: "Standalone selling price", def: "The price at which the entity would sell a promised good or service separately to a customer." },
    { term: "Significant financing component", def: "The financing benefit given to or received from a customer through the timing of payment; separated from revenue and recognised as interest. Not required where the period is one year or less." },
    { term: "Contract liability", def: "An obligation to transfer goods or services for which the entity has received, or is unconditionally entitled to, consideration." },
  ],
  summary: [
    "Five steps: identify the contract, identify the performance obligations, determine the transaction price, allocate it, recognise revenue as each obligation is satisfied.",
    "The contract exists only if all five criteria are met, including that collection is probable.",
    "An obligation is separate only if the good or service is distinct on BOTH limbs of the test.",
    "Variable consideration: expected value for many similar contracts, most likely amount for a binary outcome — then apply the constraint.",
    "A significant financing component is separated from revenue and recognised as interest, in either direction.",
    "Allocate on RELATIVE STANDALONE SELLING PRICES, estimating them where not observable.",
    "Recognise over time if any of the three conditions holds — noting condition 3 has two limbs — otherwise at the point control transfers.",
  ],
  knowledgeDiagnostic: [
    { q: "List the five steps of IFRS 15.", a: "Identify the contract; identify the performance obligations; determine the transaction price; allocate the price to the obligations; recognise revenue as each obligation is satisfied." },
    { q: "What are the two limbs of the 'distinct' test?", a: "Capable of being distinct — the customer can benefit from it alone or with readily available resources — and distinct within the context of the contract." },
    { q: "When is the most likely amount method used for variable consideration?", a: "Where there are only two possible outcomes." },
    { q: "On what basis is the transaction price allocated?", a: "Relative standalone selling prices." },
    { q: "Give the three conditions for over-time recognition.", a: "The customer simultaneously receives and consumes the benefits; the entity's performance creates or enhances an asset the customer controls; or the asset has no alternative use to the entity AND there is an enforceable right to payment for work done to date." },
    { q: "Is a financing component always separated?", a: "No — it need not be where the period between transfer and payment is one year or less." },
  ],
  furtherStudy: [
    "Chapter 16 — the applications: agents, warranties, rights of return, contract costs and contract balances",
    "Chapter 14 — IFRS 15's control test, which decides whether a sale and leaseback involves a sale",
    "Chapter 30 — why an IFRS 15 judgement on gross against net revenue changes margin without changing profit",
  ],
}

export const FR_TREE_16: StudyChapter = {
  id: "FR-16",
  number: 16,
  paper: "FR",
  area: "B",
  title: "IFRS 15 in application: agents, warranties, returns and contract balances",
  minutes: 19,
  syllabusRefs: ["B9(d)", "B9(e)", "B9(f)"],
  intro:
    "The five steps do not tell you whether a travel agent's revenue is $1,000,000 or $150,000. These applications do.",
  outcomes: [
    "Distinguish a principal from an agent and measure revenue accordingly",
    "Distinguish an assurance-type from a service-type warranty and account for each",
    "Account for a sale with a right of return, including the refund liability and the recovery asset",
    "Determine which contract costs may be capitalised",
    "Distinguish a contract asset from a receivable and from a contract liability",
  ],
  sections: [
    {
      id: "principal-agent",
      heading: "Principal or agent: the largest single revenue judgement",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The test is CONTROL before transfer",
          md: "An entity is a **PRINCIPAL** if it **controls** the specified good or service **before** it is transferred to the customer. It then recognises revenue **GROSS** — the whole consideration — with the cost of the good or service as an expense.\n\nAn entity is an **AGENT** if its performance obligation is to **arrange** for another party to provide the good or service. It recognises revenue **NET** — its fee or commission only.\n\nIndicators that the entity is a **principal**: it is primarily responsible for fulfilling the promise; it bears **inventory risk** before or after transfer; and it has **discretion in establishing the price**.",
        },
        {
          kind: "example",
          title: "The same cash, two revenue figures",
          scenario:
            "Godwit Co operates a travel website. During the year customers paid it $1,000,000 for flights, and it remitted $850,000 to the airlines. Consider both possible fact patterns: (a) Godwit buys blocks of seats in advance, bears the loss on unsold seats and sets its own prices; (b) Godwit lists the airlines' own fares, takes a fixed 15% commission, and cancels bookings back to the airline at no cost if a customer withdraws.",
          steps: [
            { label: "Analyse (a)", detail: "Godwit obtains control of the seats before transferring them — it has inventory risk on unsold seats and discretion over pricing. It is a PRINCIPAL." },
            { label: "Report (a)", detail: "Revenue $1,000,000; cost of sales $850,000; gross profit $150,000. Gross margin 15%." },
            { label: "Analyse (b)", detail: "Godwit never controls the seats. It is not primarily responsible for providing the flight, bears no inventory risk, and does not set the price. It is an AGENT." },
            { label: "Report (b)", detail: "Revenue $150,000, being the commission. No cost of sales for the flights, because the $850,000 was never Godwit's to spend. Gross profit $150,000. Gross margin 100%." },
            { label: "Compare", detail: "PROFIT IS IDENTICAL at $150,000. Revenue differs by $850,000 and gross margin by 85 percentage points. Every revenue-based ratio, every growth measure and every revenue-linked covenant is affected, while profit is not." },
            { label: "Draw the exam point", detail: "This is why the principal/agent judgement is the most consequential in IFRS 15 and why it appears in interpretation questions. An entity that changes from agent to principal presentation reports revenue growth of 567% on no change in activity." },
          ],
          result:
            "**$1,000,000 as principal against $150,000 as agent, with identical profit of $150,000.** State the indicators you are relying on — inventory risk, primary responsibility and pricing discretion — rather than asserting the conclusion.",
        },
      ],
      check: {
        q: "An online marketplace lists third-party sellers' goods, sets no prices, never holds inventory, and passes customer payments on less a 12% fee. Annual gross transaction value is $40m. What revenue does it report?",
        options: [
          "$4.8m — it is an agent, so revenue is the fee only",
          "$40m — it collects the cash from customers, so it is a principal",
          "$40m of revenue with $35.2m of cost of sales",
          "$4.8m, but only if the sellers agree to the presentation",
        ],
        correct: 0,
        explain:
          "The marketplace never controls the goods, has no inventory risk, no pricing discretion and is not primarily responsible for fulfilment. It is an agent and reports the $4.8m fee as revenue. Collecting the cash is not control of the goods.",
      },
    },
    {
      id: "warranties",
      heading: "Warranties: two kinds, two standards",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Assurance-type against service-type warranty",
            data: {
              leftTitle: "ASSURANCE-type",
              rightTitle: "SERVICE-type",
              rows: [
                { aspect: "What it promises", left: "That the product complies with agreed specifications — it works as it should", right: "An additional service beyond that assurance" },
                { aspect: "Is it a performance obligation?", left: "NO", right: "YES — a separate performance obligation" },
                { aspect: "Standard applied", left: "**IAS 37** — recognise a provision for expected repair costs", right: "**IFRS 15** — allocate part of the transaction price to it" },
                { aspect: "Effect on revenue", left: "None; the whole price is allocated to the product", right: "Part of the price is deferred and recognised over the warranty period" },
                { aspect: "Indicators", left: "Required by law; short duration; covers only latent defects", right: "Sold separately or optionally; long duration; covers accidental damage or provides maintenance" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The quickest discriminator",
          md: "**Could the customer have chosen NOT to buy it?** If the warranty is optional or separately priced, it is almost always a service-type warranty and a separate performance obligation. If it comes with the product automatically and simply promises the product is not defective, it is assurance-type and gives rise to an IAS 37 provision.\n\nA legally required warranty is always assurance-type — the customer had no choice, so no separate service was sold.",
        },
      ],
    },
    {
      id: "returns",
      heading: "Sales with a right of return",
      blocks: [
        {
          kind: "formula",
          name: "Accounting for expected returns",
          expr: "At the point of sale, recognise:\n\n   REVENUE          only for the goods NOT expected to be returned\n   REFUND LIABILITY for the consideration expected to be repaid\n   COST OF SALES    only for the goods NOT expected to be returned\n   RECOVERY ASSET   for the right to recover products from\n                    customers, at the former CARRYING AMOUNT of the\n                    inventory, less any expected recovery costs\n\nA right of return is NOT a separate performance obligation. It is\nvariable consideration, so the constraint applies.\n\nRemeasure the liability and the asset at each reporting date as\nexpectations change.",
          note: "Four entries, not two. Candidates routinely record the revenue reduction and forget the recovery asset, which understates assets and overstates cost of sales.",
        },
        {
          kind: "example",
          title: "A sale with expected returns",
          scenario:
            "Whimbrel Co sells 1,000 units at $100 each, all delivered before the year end. Each unit cost $60. Customers have a 30-day right of return, and Whimbrel expects 5% of the units to be returned. Returned goods can be resold at full price and no recovery costs are expected.",
          steps: [
            { label: "Split the units by expected outcome", detail: "950 units expected to be retained, 50 expected to be returned." },
            { label: "Recognise revenue on the retained units only", detail: "950 × $100 = $95,000. Recognising the full $100,000 overstates revenue by $5,000." },
            { label: "Recognise the refund liability", detail: "50 × $100 = $5,000. This is a liability, not a reduction of receivables — the entity expects to repay cash it has a right to collect." },
            { label: "Recognise cost of sales on the retained units only", detail: "950 × $60 = $57,000." },
            { label: "Recognise the recovery asset", detail: "50 × $60 = $3,000, at the former carrying amount of the inventory. This is presented separately from inventory, and would be reduced by any expected costs of recovery or any expected reduction in value of returned goods." },
            { label: "Check the gross profit", detail: "$95,000 − $57,000 = $38,000, which is 950 units × $40 margin. The 50 units expected back generate no profit and no loss, which is the correct outcome — nothing has been earned on them." },
          ],
          result:
            "**Revenue $95,000, refund liability $5,000, cost of sales $57,000, recovery asset $3,000.** Note that the transaction affects four line items and that the balance sheet grosses up rather than netting — the refund liability and the recovery asset are presented separately.",
        },
      ],
      check: {
        q: "An entity sells 500 units at $40 each, cost $25 each, and expects 8% to be returned. What is recognised as revenue and as the recovery asset?",
        options: [
          "Revenue $18,400 and a recovery asset of $1,000",
          "Revenue $20,000 and a recovery asset of $1,000",
          "Revenue $18,400 and no recovery asset until goods are returned",
          "Revenue $18,400 and a recovery asset of $1,600",
        ],
        correct: 0,
        explain:
          "460 units are expected to be retained, so revenue is 460 × $40 = $18,400 with a refund liability of $1,600. The recovery asset is the 40 expected returns at their former carrying amount: 40 × $25 = $1,000. The asset is recognised at the point of sale, not when goods come back.",
      },
    },
    {
      id: "costs-and-balances",
      heading: "Contract costs, and the three contract balances",
      blocks: [
        {
          kind: "list",
          title: "Which contract costs may be capitalised",
          items: [
            "**INCREMENTAL costs of OBTAINING a contract** — costs that would not have been incurred had the contract not been won, typically a sales commission. **Capitalised** if the entity expects to recover them. A practical expedient permits expensing where the resulting asset would be amortised within one year.",
            "**Costs that would have been incurred regardless** of whether the contract was won — for example the cost of preparing a tender — are **EXPENSED**, even if the contract is won.",
            "**Costs of FULFILLING a contract** are capitalised only where they relate directly to the contract, **generate or enhance resources** that will be used in satisfying the obligation, and are **expected to be recovered**.",
            "Expressly **expensed**: general and administrative costs, wasted materials and labour, costs relating to obligations already satisfied, and costs the entity cannot distinguish between satisfied and unsatisfied obligations.",
            "A capitalised contract cost asset is **amortised** on a basis consistent with the transfer of the goods or services, and tested for **impairment**.",
          ],
        },
        {
          kind: "table",
          caption: "Contract asset, receivable, contract liability",
          head: ["Balance", "Arises when", "The key distinction"],
          rows: [
            ["**Contract asset**", "The entity has satisfied a performance obligation but its right to consideration is **conditional on something other than the passage of time** — typically further performance", "It carries **performance risk** as well as credit risk. Presented separately from receivables"],
            ["**Receivable**", "The entity has an **unconditional right** to consideration — only the passage of time stands between it and payment", "Carries credit risk only. Accounted for under IFRS 9, including expected credit losses"],
            ["**Contract liability**", "The entity has received, or is unconditionally entitled to, consideration **before** satisfying the obligation", "The old 'deferred income'. Released to revenue as the obligation is satisfied"],
          ],
        },
        {
          kind: "illustration",
          title: "Why the contract asset / receivable line matters",
          md: "An entity contracts to deliver two machines for $200,000, payable only when BOTH are delivered. It delivers the first, worth $120,000 on a standalone basis.\n\nIt has satisfied a performance obligation, so it recognises revenue of $120,000. But it has no right to any cash until the second machine is delivered, so the corresponding debit is a **CONTRACT ASSET**, not a receivable.\n\nWhen the second machine is delivered, the entity recognises the remaining $80,000 of revenue and the whole $200,000 becomes an unconditional **RECEIVABLE** — the contract asset is reclassified.\n\nWhy it matters: the contract asset carries the risk that the entity fails to deliver the second machine, in which case it may receive nothing at all for the first. That is a different risk from a customer failing to pay, and IFRS 15 requires it to be presented separately so a user can see it."
        },
        {
          kind: "activity",
          title: "Name the balance",
          prompt:
            "For each, state which balance arises:\n\n(i) A customer pays $60,000 in advance for services to be delivered over the next six months.\n(ii) An entity has completed and invoiced a service; payment is due in 30 days.\n(iii) An entity has completed the design phase of a contract but is entitled to bill only on completion of the build phase.\n(iv) An entity paid a $9,000 sales commission to win a three-year contract.",
          answer:
            "(i) A CONTRACT LIABILITY of $60,000, released to revenue as the services are delivered.\n\n(ii) A RECEIVABLE. The right to consideration is unconditional — only time stands between the entity and payment — so it falls under IFRS 9 and attracts an expected credit loss allowance.\n\n(iii) A CONTRACT ASSET. Revenue for the design phase is recognised if it is a separate performance obligation satisfied, but the right to bill is conditional on further performance, so it is not yet a receivable.\n\n(iv) A CAPITALISED CONTRACT COST asset of $9,000, amortised over the three years on a basis consistent with the transfer of the services — assuming recovery is expected. The one-year practical expedient does not help here because the amortisation period exceeds a year.",
        },
      ],
      check: {
        q: "An entity satisfies a performance obligation but cannot invoice until it completes a later obligation. What does it recognise for the amount earned?",
        options: [
          "A contract asset, because the right to consideration is conditional on further performance",
          "A trade receivable, because revenue has been recognised",
          "Nothing until the invoice can be issued",
          "A contract liability, because the customer has not yet paid",
        ],
        correct: 0,
        explain:
          "Where the right to consideration is conditional on anything other than the passage of time, the balance is a contract asset. It becomes a receivable only when the right becomes unconditional, and it is presented separately because it carries performance risk as well as credit risk.",
      },
    },
  ],
  examTraps: [
    { trap: "Deciding principal or agent by who collects the cash.", fix: "The test is control of the good or service before transfer. Look for inventory risk, primary responsibility and pricing discretion." },
    { trap: "Treating a legally required warranty as a performance obligation.", fix: "It is assurance-type: no revenue is allocated to it, and an IAS 37 provision is recognised for expected repair costs." },
    { trap: "Recognising full revenue on sales with a right of return.", fix: "Recognise revenue only for units not expected to be returned, with a refund liability for the rest." },
    { trap: "Omitting the recovery asset on expected returns.", fix: "Recognise an asset at the former carrying amount of the inventory expected back, less expected recovery costs — separately from inventory." },
    { trap: "Capitalising tender costs.", fix: "Only INCREMENTAL costs of obtaining a contract are capitalised. Costs that would have been incurred anyway are expensed even if the contract is won." },
    { trap: "Presenting a conditional right to consideration as a receivable.", fix: "It is a contract asset until the right becomes unconditional, because it carries performance risk as well as credit risk." },
  ],
  keyTerms: [
    { term: "Principal", def: "An entity that controls a specified good or service before transferring it to a customer; recognises revenue gross." },
    { term: "Agent", def: "An entity whose performance obligation is to arrange for another party to provide the good or service; recognises revenue net, as a fee or commission." },
    { term: "Assurance-type warranty", def: "A promise that the product complies with agreed specifications. Not a performance obligation; gives rise to an IAS 37 provision." },
    { term: "Service-type warranty", def: "A warranty providing a service beyond the assurance that the product functions as specified; a separate performance obligation under IFRS 15." },
    { term: "Refund liability", def: "The consideration received or receivable that the entity expects to refund to customers." },
    { term: "Recovery asset", def: "The entity's right to recover products from customers on settling a refund liability, measured at the former carrying amount of the inventory less expected recovery costs." },
    { term: "Contract asset", def: "A right to consideration in exchange for goods or services transferred, where that right is conditional on something other than the passage of time." },
    { term: "Contract liability", def: "An obligation to transfer goods or services for which consideration has been received or is unconditionally due." },
  ],
  summary: [
    "Principal or agent turns on CONTROL before transfer. Gross against net changes revenue and margin dramatically while leaving profit unchanged.",
    "An assurance-type warranty is an IAS 37 provision; a service-type warranty is a separate performance obligation under IFRS 15.",
    "The quickest warranty discriminator: could the customer have declined to buy it?",
    "Rights of return produce four entries: revenue and cost of sales on retained units only, a refund liability, and a recovery asset at former carrying amount.",
    "Incremental costs of obtaining a contract are capitalised if recoverable; costs incurred regardless, such as tender costs, are expensed.",
    "Fulfilment costs are capitalised only if directly related, resource-generating and recoverable.",
    "A contract asset is a conditional right; a receivable is unconditional; a contract liability is consideration received before performance.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes a principal from an agent?", a: "Whether the entity controls the good or service before it is transferred to the customer." },
    { q: "Give three indicators that an entity is a principal.", a: "It is primarily responsible for fulfilling the promise, it bears inventory risk, and it has discretion in establishing the price." },
    { q: "How is an assurance-type warranty accounted for?", a: "As an IAS 37 provision for expected repair costs. No part of the transaction price is allocated to it." },
    { q: "What four items arise on a sale with expected returns?", a: "Revenue and cost of sales for the units not expected to be returned, a refund liability, and an asset for the right to recover products at their former carrying amount." },
    { q: "Which costs of obtaining a contract are capitalised?", a: "Incremental costs that would not have been incurred had the contract not been obtained, where recovery is expected." },
    { q: "When does a contract asset become a receivable?", a: "When the right to consideration becomes unconditional — only the passage of time remaining." },
  ],
  furtherStudy: [
    "Chapter 15 — the five-step model these applications sit inside",
    "Chapter 17 — IAS 37, the standard that governs assurance-type warranties",
    "Chapter 19 — IFRS 9, which governs receivables once the right becomes unconditional, including expected credit losses",
  ],
}
