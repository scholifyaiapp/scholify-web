import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fr-kit-builders"

/*
 * FR · Area B question kit, part 2 — chapters 13 to 18.
 *
 * Leases, revenue, provisions and the debt/equity classification. This is where FR's Section
 * B cases most often sit, because each of these standards produces a chain of linked
 * figures — a lease liability table, an allocation across performance obligations, a
 * convertible split — which is exactly the shape an OT case needs.
 *
 * The lease and convertible tables in this file are the same arithmetic the exam sets, and
 * the numeric items ask for the specific figure at a specific point in the table rather than
 * for a total, because that is how the CBE asks and because it tests whether the candidate
 * built the table rather than guessing its shape.
 *
 * All figures verified by script before authoring.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 13 · IFRS 16 lessee ── */

const CH13: AccaQuestion[] = [
  num("FRK-13-01", "FR-13", "B", "medium",
    "An entity leases equipment for four years with annual payments of $30,000 in arrears. The rate implicit in the lease is 7% and the four-year annuity factor at 7% is 3.387. It also incurred $4,000 of legal fees arranging the lease. Calculate the initial carrying amount of the RIGHT-OF-USE ASSET, in $.",
    105610, "$", 1,
    "$105,610. The lease liability is $30,000 × 3.387 = $101,610, and the right-of-use asset is the liability PLUS the $4,000 of initial direct costs. The two figures are not the same, and answering $101,610 by treating them as equal is the commonest error in the topic. Prepayments and restoration costs are added on the same basis; incentives received are deducted."),

  num("FRK-13-02", "FR-13", "B", "medium",
    "Using the lease in the previous question, calculate the lease liability at the end of YEAR 1, in $.",
    78723, "$", 2,
    "$78,723. Opening $101,610, plus interest at 7% of $7,113, less the $30,000 payment. Build the table rather than estimating: opening balance, add interest, deduct payment, carry forward. Each closing balance becomes the next opening balance."),

  num("FRK-13-03", "FR-13", "B", "hard",
    "Continuing the same lease, the liability is $78,723 at the end of year 1 and $54,233 at the end of year 2. Calculate the CURRENT liability at the end of year 1, in $.",
    24490, "$", 2,
    "$24,490. The non-current portion is the balance still outstanding a year later — $54,233 — so the current portion is $78,723 − $54,233 = $24,490. It is NOT the $30,000 cash payment, because part of that payment is interest which has not yet accrued at the reporting date. Equivalently: $30,000 − $5,511 of year 2 interest = $24,489, the $1 difference being rounding."),

  q("FRK-13-04", "FR-13", "B", "easy",
    "Under IFRS 16, how does a lessee decide whether to recognise a right-of-use asset and a lease liability?",
    [
      "It recognises them for every lease, unless a recognition exemption is taken",
      "By assessing whether substantially all the risks and rewards of ownership have transferred",
      "By comparing the present value of the lease payments with the asset's fair value",
      "By assessing whether the lease term covers the major part of the asset's economic life",
    ],
    0,
    "EVERY LEASE, UNLESS AN EXEMPTION APPLIES. There is no lessee classification test under IFRS 16. The other three options are all part of the SUPERSEDED finance/operating distinction — which survives for LESSORS but not for lessees. An answer built on risks and rewards is answering the old standard."),

  q("FRK-13-05", "FR-13", "B", "medium",
    "An entity leases scaffolding for ten months, with an option to purchase it at the end of the lease. Can the short-term exemption be applied?",
    [
      "No — the exemption is unavailable where the lease contains a purchase option, whatever the term",
      "Yes — the term is under twelve months",
      "Yes, provided the purchase option is not reasonably certain to be exercised",
      "Only if the entity applies the exemption to all leases of scaffolding",
    ],
    0,
    "NO — THE PURCHASE OPTION DISQUALIFIES IT. The short-term exemption requires a term of twelve months or less AND no purchase option. Both conditions, so a ten-month lease with an option goes on balance sheet. Note the exemption is elected by CLASS of asset, whereas the low-value exemption is elected lease by lease."),

  q("FRK-13-06", "FR-13", "B", "medium",
    "An entity leases 150 identical printers, each worth $700 when new, on three-year leases. Total payments are $210,000. Can the low-value exemption be applied?",
    [
      "Yes — the exemption is assessed per underlying asset when new, and elected lease by lease",
      "No — the aggregate value of $210,000 is not low",
      "No — the exemption applies only to leases of twelve months or less",
      "Only if the entity also applies the short-term exemption to the same class",
    ],
    0,
    "YES. The test is the value of the INDIVIDUAL underlying asset when new, and the election is made lease by lease, so the aggregate is irrelevant. There is no term condition attached to this exemption. Note the standard distractor: a CAR is never low value however cheap, because a car is not an asset of low value when new."),

  q("FRK-13-07", "FR-13", "B", "medium",
    "Over what period is a right-of-use asset depreciated where ownership does NOT transfer at the end of the lease?",
    [
      "The shorter of the lease term and the asset's useful life",
      "The asset's useful life",
      "The lease term, always",
      "The longer of the lease term and the asset's useful life",
    ],
    0,
    "THE SHORTER OF THE TWO. Where ownership IS expected to transfer, or a purchase option is reasonably certain to be exercised, the useful life is used instead — because the entity will retain the asset beyond the lease. Using the useful life when ownership does not transfer understates the charge, sometimes substantially."),

  q("FRK-13-08", "FR-13", "B", "hard",
    "A contract entitles an entity to the use of a lorry for two years, but the haulier may substitute any lorry from its fleet at any time. Is this a lease?",
    [
      "No — the haulier's substantive substitution right means there is no identified asset",
      "Yes — the entity has the right to use a lorry for two years in exchange for consideration",
      "Yes, but the low-value exemption applies",
      "Only if the entity directs where and when the lorry is used",
    ],
    0,
    "NOT A LEASE. A lease requires an IDENTIFIED asset, and a substantive supplier right of substitution defeats that. It is a service contract, expensed as incurred. Note why this matters more than it used to: under the old standard the interesting question was how to CLASSIFY a lease; under IFRS 16 it is whether the contract is a lease at all, because that is now the difference between on and off balance sheet."),

  q("FRK-13-09", "FR-13", "B", "medium",
    "Which of the following is EXCLUDED from the lease payments used to measure the lease liability?",
    [
      "Variable payments that depend on the lessee's sales or usage",
      "Variable payments that depend on an index or a rate",
      "Amounts expected to be payable under a residual value guarantee",
      "The exercise price of a purchase option reasonably certain to be exercised",
    ],
    0,
    "USAGE- AND SALES-LINKED VARIABLE PAYMENTS. They are excluded from the liability and expensed as incurred, because their amount depends on future activity rather than on the passage of time. INDEX-linked variable payments ARE included, using the index at commencement, as are residual value guarantees and reasonably-certain purchase options."),
]

/* ── Chapter 14 · Sale and leaseback, and the lessor ── */

const CH14: AccaQuestion[] = [
  num("FRK-14-01", "FR-14", "B", "hard",
    "An asset with a carrying amount of $1,200,000 is sold for its fair value of $1,600,000 and leased back. The present value of the lease payments is $400,000, and the transfer qualifies as a sale. Calculate the RIGHT-OF-USE ASSET recognised, in $.",
    300000, "$", 1,
    "$300,000. It is the proportion of the PREVIOUS CARRYING AMOUNT relating to the rights retained: $1,200,000 × $400,000/$1,600,000 = $300,000. Using FAIR VALUE as the base would give $400,000 and would recognise part of the gain on the retained rights, which is precisely what the standard prevents."),

  num("FRK-14-02", "FR-14", "B", "hard",
    "Using the same facts, calculate the GAIN recognised on the sale and leaseback, in $.",
    300000, "$", 1,
    "$300,000. The total gain is $1,600,000 − $1,200,000 = $400,000, and only the part relating to rights TRANSFERRED is recognised: $400,000 × ($1,600,000 − $400,000)/$1,600,000 = $300,000. Recognising the whole $400,000 overstates profit by $100,000 and treats a financing transaction as a realised disposal. The unrecognised $100,000 is absorbed into the lower right-of-use asset and emerges as reduced depreciation."),

  q("FRK-14-03", "FR-14", "B", "medium",
    "A sale and leaseback transaction does NOT satisfy the IFRS 15 requirements for a sale. How does the seller-lessee account for it?",
    [
      "It keeps the asset and recognises a financial liability equal to the proceeds received",
      "It derecognises the asset and recognises a gain restricted to the rights transferred",
      "It derecognises the asset and defers the whole gain over the lease term",
      "It recognises a right-of-use asset and a lease liability as in a normal lease",
    ],
    0,
    "KEEP THE ASSET, RECOGNISE A FINANCIAL LIABILITY. No sale has occurred, so there is nothing to derecognise and no gain at all — in substance the entity has taken a secured loan, and that is how it is reported. The payments split between interest and principal under IFRS 9. The buyer correspondingly recognises a financial asset rather than the asset itself."),

  q("FRK-14-04", "FR-14", "B", "medium",
    "Which statement about lease classification is correct?",
    [
      "Lessors still classify leases as finance or operating; lessees do not",
      "Neither lessors nor lessees classify leases under IFRS 16",
      "Both lessors and lessees classify leases under IFRS 16",
      "Lessees classify leases; lessors recognise a net investment in every lease",
    ],
    0,
    "LESSORS STILL CLASSIFY. IFRS 16 removed the distinction for LESSEES only. The asymmetry is deliberate: the lessee balance sheet was the problem the IASB set out to fix, and requiring lessors to derecognise assets they had genuinely retained would have created a new one. An answer saying 'classification no longer exists' is right for one side and wrong for the other."),

  num("FRK-14-05", "FR-14", "B", "medium",
    "A lessor grants a five-year operating lease with the first year rent free and $75,000 payable in each of years 2 to 5. Calculate the lease income recognised in YEAR 1, in $.",
    60000, "$", 1,
    "$60,000. Total consideration is 4 × $75,000 = $300,000 spread straight line over the FIVE-year term, so $60,000 a year including the rent-free year, with a matching accrued income receivable. Recognising nil in year 1 and $75,000 thereafter misstates both income and assets — the rent-free period is an incentive spread over the term, not a year without income."),

  multi("FRK-14-06", "FR-14", "B", "medium",
    "Which THREE of the following indicate a FINANCE lease from the LESSOR's perspective?",
    [
      "The lease term is for the major part of the asset's economic life",
      "The present value of the lease payments amounts to substantially all of the asset's fair value",
      "The asset is so specialised that only the lessee can use it without major modification",
      "The lessor retains responsibility for insuring and maintaining the asset",
      "The lease is cancellable by the lessee at any time without penalty",
      "The lessor expects to re-lease the asset to a different customer after the term",
    ],
    [0, 1, 2],
    "THE FIRST THREE. Each shows that substantially all the risks and rewards of ownership have passed. The last three point the other way: retained maintenance responsibility, free cancellability and an expectation of re-leasing all indicate the lessor has kept a real residual interest, which is an OPERATING lease."),

  q("FRK-14-07", "FR-14", "B", "medium",
    "How does a lessor account for an asset under a FINANCE lease?",
    [
      "It derecognises the asset and recognises a net investment in the lease, with finance income at a constant rate of return",
      "It retains and depreciates the asset, recognising lease income straight line",
      "It retains the asset but does not depreciate it, recognising the whole rental as income",
      "It recognises a right-of-use asset and a lease liability",
    ],
    0,
    "DERECOGNISE AND RECOGNISE A RECEIVABLE. Under a finance lease the lessor has in substance sold the asset and is financing the purchase, so the asset goes and a net investment in the lease replaces it. Retaining and depreciating the asset is the OPERATING lease treatment, and confusing the two is what the classification question exists to prevent."),
]

/* ── Chapter 15 · IFRS 15 the five-step model ── */

const CH15: AccaQuestion[] = [
  num("FRK-15-01", "FR-15", "B", "medium",
    "An entity sells a machine together with two years of servicing for a combined $700,000. Its standalone selling prices are $600,000 for the machine and $150,000 for the servicing. Control of the machine passes on delivery. Calculate the revenue recognised on DELIVERY, in $.",
    560000, "$", 1,
    "$560,000. Total standalone selling prices are $750,000, so the machine is allocated $700,000 × $600,000/$750,000 = $560,000 and the servicing $140,000. Only the machine's allocation is recognised on delivery; the servicing is recognised over two years at $70,000 a year, with a $140,000 contract liability initially. Recognising the whole $700,000 overstates revenue by $140,000."),

  q("FRK-15-02", "FR-15", "B", "easy",
    "On what basis is the transaction price allocated between performance obligations?",
    [
      "Relative standalone selling prices",
      "The prices stated for each item in the contract",
      "The relative cost of satisfying each obligation",
      "Equally between the obligations",
    ],
    0,
    "RELATIVE STANDALONE SELLING PRICES — the prices at which the entity would sell each item separately. Where one is not directly observable it must be ESTIMATED, using an adjusted market assessment or an expected cost plus margin approach, with a residual approach only where neither is feasible. Allocating on cost or on the contract's own stated split is not permitted."),

  q("FRK-15-03", "FR-15", "B", "medium",
    "An entity has 400 similar contracts, each with a $10,000 penalty if delivery is late. It expects 15% to be late. How should the variable consideration be estimated?",
    [
      "Expected value — a large number of similar contracts, so reduce each transaction price by $1,500",
      "Most likely amount — most contracts will be on time, so no reduction",
      "The maximum penalty on every contract, for prudence",
      "No adjustment until a penalty is actually incurred",
    ],
    0,
    "EXPECTED VALUE, at 15% × $10,000 = $1,500 a contract. With a large population the probability-weighted figure is what the entity will actually realise in aggregate. The MOST LIKELY AMOUNT method is for situations with only TWO possible outcomes; assuming the worst is not prudence but bias; and waiting for the penalty defeats the point of variable consideration."),

  q("FRK-15-04", "FR-15", "B", "medium",
    "A single contract has a $2m base price plus a $200,000 bonus for early completion, assessed at 80% probable. Which estimation method applies and what is the transaction price before the constraint?",
    [
      "Most likely amount — $2,200,000, since there are only two possible outcomes",
      "Expected value — $2,160,000",
      "Most likely amount — $2,000,000, since the bonus is not certain",
      "Expected value — $2,200,000",
    ],
    0,
    "MOST LIKELY AMOUNT, $2,200,000. With only two possible outcomes the single most likely figure better predicts the consideration. Expected value would give $2,160,000 — an amount the entity can NEVER actually receive, which is why the method is reserved for populations. The constraint is then applied as a separate step: include the bonus only if a significant revenue reversal is highly probable not to occur."),

  num("FRK-15-05", "FR-15", "B", "hard",
    "An entity transfers control of equipment immediately but the customer will pay $874,800 in two years. A rate of 8% reflects the customer's credit characteristics. Calculate the REVENUE recognised on transfer, in $.",
    750000, "$", 1,
    "$750,000. The significant financing component is separated: $874,800 ÷ 1.08² = $750,000. The remaining $124,800 is INTEREST INCOME, recognised as the receivable unwinds — $60,000 in year 1 and $64,800 in year 2. Recognising the whole $874,800 as revenue overstates revenue by $124,800 and distorts gross margin, which an interpretation requirement would pick up."),

  q("FRK-15-06", "FR-15", "B", "medium",
    "When is a promised good or service a SEPARATE performance obligation?",
    [
      "When it is capable of being distinct AND distinct within the context of the contract",
      "When it is capable of being distinct",
      "When it is separately priced in the contract",
      "When the customer could have bought it from another supplier",
    ],
    0,
    "BOTH LIMBS. Capable of being distinct — the customer can benefit from it alone or with readily available resources — AND separately identifiable within the contract. The second limb is what catches candidates: bricks and labour are each capable of being distinct, but in a contract to build a house they are inputs to a single combined output and so one obligation."),

  multi("FRK-15-07", "FR-15", "B", "hard",
    "Which THREE conditions, any ONE of which is sufficient, allow revenue to be recognised OVER TIME?",
    [
      "The customer simultaneously receives and consumes the benefits as the entity performs",
      "The entity's performance creates or enhances an asset the customer controls as it is created",
      "The asset has no alternative use to the entity AND there is an enforceable right to payment for performance to date",
      "The contract price exceeds the entity's costs incurred to date",
      "The contract runs for more than twelve months",
      "The customer has paid a non-refundable deposit",
    ],
    [0, 1, 2],
    "THE FIRST THREE. Note that the third has TWO limbs joined by AND — a specialised asset with NO enforceable right to interim payment does NOT give over-time recognition, and that is the version examiners set. Contract length, profitability and deposits are all irrelevant to the test."),

  q("FRK-15-08", "FR-15", "B", "medium",
    "An entity delivers goods to a customer whose ability to pay is doubtful at the outset. What does IFRS 15 require?",
    [
      "No revenue is recognised, because there is no contract until collection is probable",
      "Revenue is recognised in full, with an expected credit loss allowance",
      "Revenue is recognised to the extent of the amount expected to be collected",
      "Revenue is recognised and immediately reversed",
    ],
    0,
    "NO CONTRACT, SO NO REVENUE. Collectability is one of the five criteria that must ALL be met for a contract to exist under IFRS 15, and until it is met there is nothing to recognise — any cash received is a liability. This differs from recognising revenue and then providing against it, which is what happens when the doubt arises AFTER the contract was validly established."),
]

/* ── Chapter 16 · IFRS 15 in application ── */

const CH16: AccaQuestion[] = [
  q("FRK-16-01", "FR-16", "B", "medium",
    "An online marketplace lists third-party sellers' goods, sets no prices, never holds inventory, and remits customer payments less a 12% fee. Gross transaction value is $40m. What revenue does it report?",
    ["$4.8m", "$40m", "$40m with cost of sales of $35.2m", "$35.2m"],
    0,
    "$4.8m — it is an AGENT. It never obtains control of the goods, has no inventory risk, no pricing discretion, and is not primarily responsible for fulfilment. Collecting the cash is not control. Note the consequence: PROFIT is identical either way, but revenue differs by $35.2m and gross margin by most of a hundred percentage points."),

  multi("FRK-16-02", "FR-16", "B", "medium",
    "Which THREE indicate that an entity is acting as a PRINCIPAL rather than an agent?",
    [
      "It is primarily responsible for fulfilling the promise to the customer",
      "It bears inventory risk before or after transfer to the customer",
      "It has discretion in establishing the price",
      "It collects the cash from the customer before paying the supplier",
      "It is named in the contract with the customer",
      "It earns a fixed percentage of the transaction value",
    ],
    [0, 1, 2],
    "PRIMARY RESPONSIBILITY, INVENTORY RISK and PRICING DISCRETION. The others are neutral or point the other way: collecting cash is not control, being named in a contract proves nothing, and a fixed percentage fee is the classic AGENT arrangement."),

  q("FRK-16-03", "FR-16", "B", "medium",
    "A product carries a legally required warranty that it will function as specified. How is it accounted for?",
    [
      "As an IAS 37 provision for expected repair costs; no part of the transaction price is allocated to it",
      "As a separate performance obligation, with part of the transaction price deferred",
      "As a contingent liability, disclosed only",
      "As a reduction of revenue equal to the expected repair costs",
    ],
    0,
    "AN IAS 37 PROVISION. This is an ASSURANCE-type warranty: it promises only that the product complies with agreed specifications, so no separate service has been sold. A legally required warranty is always assurance-type, because the customer had no choice. A warranty that is OPTIONAL or separately priced is service-type and IS a performance obligation."),

  num("FRK-16-04", "FR-16", "B", "hard",
    "An entity sells 1,000 units at $150 each, each costing $90. Customers have a right of return and the entity expects 8% to be returned; returned goods can be resold at full price. Calculate the REVENUE recognised, in $.",
    138000, "$", 1,
    "$138,000. Revenue is recognised only for the 920 units NOT expected to be returned: 920 × $150. A refund liability of 80 × $150 = $12,000 is recognised, cost of sales is 920 × $90 = $82,800, and an asset for the right to recover products of 80 × $90 = $7,200 is recognised separately. Four entries, not two — the recovery asset is the one most often omitted."),

  num("FRK-16-05", "FR-16", "B", "medium",
    "Using the same facts, calculate the asset recognised for the RIGHT TO RECOVER products from customers, in $.",
    7200, "$", 1,
    "$7,200. It is measured at the former CARRYING AMOUNT of the inventory expected back — 80 units × $90 — less any expected costs of recovery and any expected reduction in value. It is presented separately from inventory, so the balance sheet grosses up rather than netting the refund liability against it."),

  q("FRK-16-06", "FR-16", "B", "medium",
    "An entity pays a $9,000 sales commission to win a three-year service contract, and also incurred $15,000 preparing the unsuccessful parts of its tender. How are these treated?",
    [
      "Capitalise the $9,000 commission and amortise it over three years; expense the $15,000 tender costs",
      "Capitalise both and amortise over three years",
      "Expense both as incurred",
      "Capitalise the $15,000 and expense the $9,000",
    ],
    0,
    "CAPITALISE THE COMMISSION, EXPENSE THE TENDER COSTS. Only INCREMENTAL costs of obtaining a contract — those that would not have been incurred had the contract not been won — are capitalised, where recovery is expected. Tender costs would have been incurred regardless, so they are expensed even though the contract was won. The one-year practical expedient does not help here, the amortisation period being three years."),

  q("FRK-16-07", "FR-16", "B", "hard",
    "An entity has satisfied a performance obligation but cannot invoice until it completes a later obligation. What balance does it recognise?",
    [
      "A contract asset, because the right to consideration is conditional on further performance",
      "A trade receivable, because revenue has been recognised",
      "Nothing until the invoice can be issued",
      "A contract liability, because the customer has not yet paid",
    ],
    0,
    "A CONTRACT ASSET. Where the right to consideration is conditional on anything other than the passage of time, the balance is a contract asset and is presented separately — because it carries PERFORMANCE risk as well as credit risk. It becomes a receivable only when the right becomes unconditional, at which point IFRS 9 and expected credit losses apply."),

  q("FRK-16-08", "FR-16", "B", "medium",
    "A customer pays $90,000 in advance for services to be delivered over the next nine months. What is recognised at the date of receipt?",
    [
      "A contract liability of $90,000",
      "Revenue of $90,000",
      "A contract asset of $90,000",
      "Deferred revenue within equity",
    ],
    0,
    "A CONTRACT LIABILITY. The entity has received consideration before satisfying the obligation, so it owes the customer a service. It is released to revenue as the services are delivered — $10,000 a month here. Note that where the advance is long-dated it may also contain a significant financing component, with interest EXPENSE increasing the liability so that the revenue eventually recognised exceeds the cash received."),
]

/* ── Chapter 17 · IAS 37 and IAS 10 ── */

const CH17: AccaQuestion[] = [
  num("FRK-17-01", "FR-17", "B", "medium",
    "An entity sold 150,000 units carrying a one-year warranty. Experience indicates 86% will have no defect, 10% a minor defect costing $30 and 4% a major defect costing $180. Calculate the warranty provision, in $.",
    1530000, "$", 1,
    "$1,530,000. This is a LARGE POPULATION of similar obligations, so EXPECTED VALUE applies: (10% × $30) + (4% × $180) = $3.00 + $7.20 = $10.20 a unit, times 150,000. Using the most likely outcome would give NIL, because 86% of units have no defect — which is precisely why the population rule exists."),

  q("FRK-17-02", "FR-17", "B", "easy",
    "An entity is being sued. Its lawyers assess the probability of losing at 35% and the likely cost at $2m. What is the treatment?",
    [
      "Disclose a contingent liability",
      "Provide $2m",
      "Provide $700,000, being 35% of $2m",
      "No provision and no disclosure",
    ],
    0,
    "DISCLOSE A CONTINGENT LIABILITY. At 35% the outflow is POSSIBLE but not probable, so no provision arises. Probability weighting a SINGLE obligation is wrong — expected value is for populations, and a single obligation uses the most likely outcome. And a possible outflow is always disclosed, unlike a possible INFLOW which gets no disclosure at all."),

  q("FRK-17-03", "FR-17", "B", "medium",
    "How is a PROBABLE inflow of economic benefits from a contingent asset treated?",
    [
      "Disclosed, but not recognised",
      "Recognised as an asset",
      "Neither recognised nor disclosed",
      "Recognised only to the extent of any related provision",
    ],
    0,
    "DISCLOSED ONLY. The asymmetry with liabilities is deliberate: a probable OUTFLOW is provided for, a probable INFLOW is merely disclosed, and an inflow is recognised only when it becomes VIRTUALLY CERTAIN — at which point it is no longer contingent. The corollary catches candidates: a POSSIBLE inflow gets no disclosure at all, whereas a possible outflow does."),

  num("FRK-17-04", "FR-17", "B", "hard",
    "An entity is obliged to decommission a plant in ten years at an estimated cost of $900,000. The discount rate is 10% and the ten-year discount factor is 0.386. Calculate the FINANCE COST arising from unwinding the discount in year 1, in $.",
    34740, "$", 1,
    "$34,740. The provision is recognised at $900,000 × 0.386 = $347,400, added to the cost of the asset under IAS 16, and unwound at 10%: $347,400 × 10% = $34,740. It is a FINANCE COST, not an additional decommissioning expense and not capitalised — only the INITIAL estimate is added to the asset."),

  q("FRK-17-05", "FR-17", "B", "medium",
    "An entity has a contract that will produce a loss of $32,000 if fulfilled. It can cancel on payment of a $25,000 penalty. What provision is recognised?",
    ["$25,000", "$32,000", "$57,000", "Nil — future losses are not provided for"],
    0,
    "$25,000. An onerous contract provision is measured at the LEAST NET COST OF EXITING — the lower of the cost of fulfilling the contract and any penalty for failing to fulfil it. Providing the full $32,000 overstates it whenever a cheaper exit exists. And note the order of operations: any asset DEDICATED to the contract is tested for impairment FIRST."),

  multi("FRK-17-06", "FR-17", "B", "medium",
    "Which THREE of the following may NOT be provided for?",
    [
      "Future operating losses of a loss-making division",
      "Future repairs and maintenance on the entity's own assets",
      "Staff retraining costs forming part of an announced restructuring",
      "Redundancy costs directly entailed by an announced restructuring",
      "A legal claim where the outflow is probable and estimable",
      "Decommissioning costs the entity is legally obliged to incur",
    ],
    [0, 1, 2],
    "THE FIRST THREE. Future operating losses have no past event and the entity could cease operating; future repairs can be avoided by disposing of the asset and are dealt with by componentised depreciation; and retraining relates to the FUTURE conduct of the business, so IAS 37 expressly excludes it from a restructuring provision even though redundancy costs are included."),

  q("FRK-17-07", "FR-17", "B", "medium",
    "When does a restructuring obligation arise?",
    [
      "When there is a detailed formal plan AND a valid expectation has been raised in those affected",
      "When the board formally approves the plan",
      "When the costs can be reliably estimated",
      "When the restructuring begins to be implemented, and not before",
    ],
    0,
    "A DETAILED PLAN **AND** A VALID EXPECTATION RAISED. A board decision alone creates nothing, because the board can reverse it — the entity retains a practical ability to avoid the transfer. The expectation is normally raised by announcing the plan's main features to those affected, OR by starting to implement it, so implementation is one route rather than the only one."),

  q("FRK-17-08", "FR-17", "B", "medium",
    "After the reporting date but before the financial statements are authorised, the directors declare a dividend for the year just ended. What is the treatment?",
    [
      "Disclose in the notes; no liability is recognised",
      "Recognise a liability, since it relates to the reported year",
      "Recognise it as a deduction from retained earnings in the reported year",
      "Recognise a liability only if it is paid before authorisation",
    ],
    0,
    "DISCLOSE ONLY. IAS 10 says so expressly: no obligation existed at the reporting date, because a dividend can be withdrawn until declared. This is one of two rules in IAS 10 that override the ordinary adjusting/non-adjusting analysis — the other being that a determination the entity is no longer a going concern changes the whole basis of preparation."),

  q("FRK-17-09", "FR-17", "B", "hard",
    "Which of the following is an ADJUSTING event after the reporting period?",
    [
      "A customer who owed money at the year end goes into administration two weeks later",
      "A warehouse is destroyed by fire a month after the year end",
      "A major business combination is announced after the year end",
      "The market value of the entity's investments falls sharply after the year end",
    ],
    0,
    "THE CUSTOMER'S ADMINISTRATION. It provides evidence of the customer's financial condition AT the reporting date, so the receivable was already impaired and the statements are adjusted. The other three all reflect conditions arising AFTER the reporting date — the warehouse existed and was intact, the combination is a new transaction, and the fall in value is a later event. All three are disclosed if material, not adjusted."),
]

/* ── Chapter 18 · Financial liabilities, equity and compound instruments ── */

const CH18: AccaQuestion[] = [
  q("FRK-18-01", "FR-18", "B", "easy",
    "An entity issues REDEEMABLE preference shares carrying a 6% dividend. How are the shares and the dividend presented?",
    [
      "The shares as a financial liability and the dividend as a finance cost",
      "The shares as equity and the dividend as a distribution",
      "The shares split between liability and equity components",
      "The shares as equity and the dividend as a finance cost",
    ],
    0,
    "LIABILITY, AND THE DIVIDEND IS A FINANCE COST. IAS 32 looks at substance: the entity has an unavoidable obligation to repay the capital, so the instrument is debt whatever it is called. 'Redeemable' is the single most important word in any question about preference shares, and it moves gearing, interest cover and profit all at once."),

  q("FRK-18-02", "FR-18", "B", "medium",
    "An entity issues IRREDEEMABLE preference shares carrying a mandatory cumulative 6% dividend. How are they classified?",
    [
      "A financial liability, because the obligation to pay the dividend cannot be avoided",
      "Equity, because the shares are irredeemable so no capital is repayable",
      "Split between liability and equity components",
      "Equity, with the dividend presented as a finance cost",
    ],
    0,
    "A LIABILITY. Irredeemability removes the obligation to repay CAPITAL, but a mandatory cumulative dividend is itself an unavoidable obligation to deliver cash. The liability is measured at the present value of the perpetual dividend stream. Contrast irredeemable shares with a DISCRETIONARY dividend, which are equity — the entity can avoid every payment."),

  q("FRK-18-03", "FR-18", "B", "medium",
    "Shares are redeemable at the HOLDER's option. How are they classified?",
    [
      "A financial liability, because the entity cannot avoid the obligation",
      "Equity, because redemption may never occur",
      "Equity until the holder gives notice of redemption",
      "Split between liability and equity components",
    ],
    0,
    "A LIABILITY. The test is whether the ENTITY can avoid the obligation, and it cannot when the choice belongs to someone else. The mirror case is instructive: shares redeemable at the ISSUER's option are EQUITY, because the entity can simply decline to redeem."),

  num("FRK-18-04", "FR-18", "B", "medium",
    "A bond with a nominal value of $5,000,000 and a 5% annual coupon is issued for net proceeds of $4,700,000, redeemable at par in three years. The effective interest rate is 8%. Calculate the FINANCE COST in year 1, in $.",
    376000, "$", 1,
    "$376,000. The effective rate is applied to the CARRYING AMOUNT: $4,700,000 × 8%. The coupon of $5,000,000 × 5% = $250,000 is what is PAID, and the closing liability is $4,700,000 + $376,000 − $250,000 = $4,826,000. Charging the coupon and carrying the liability at $5,000,000 understates the finance cost by $126,000 and overstates the liability by $174,000."),

  q("FRK-18-05", "FR-18", "B", "medium",
    "How are issue costs on a bond treated?",
    [
      "Deducted from the initial carrying amount of the liability and recovered through a higher effective interest rate",
      "Recognised as an asset and amortised over the bond's life",
      "Expensed immediately in profit or loss",
      "Deducted from equity, as with share issue costs",
    ],
    0,
    "DEDUCTED FROM THE LIABILITY. So the liability is initially recognised at net proceeds, and the costs emerge as part of the total finance cost over the instrument's life through the effective rate. Neither capitalising them as an asset nor expensing them at once is permitted."),

  num("FRK-18-06", "FR-18", "B", "hard",
    "An entity issues $8,000,000 of 5% convertible bonds at par, redeemable at par in three years or convertible at the holder's option. The market rate for similar NON-convertible debt is 8%; the three-year annuity factor at 8% is 2.487 and the three-year discount factor is 0.751. Calculate the amount credited to EQUITY, in $.",
    997200, "$", 5,
    "$997,200. The liability component is measured first: interest $400,000 × 2.487 = $994,800 plus principal $8,000,000 × 0.751 = $6,008,000, giving $7,002,800. Equity is the RESIDUAL: $8,000,000 − $7,002,800 = $997,200. Note the 8% rate is used, not the 5% coupon — the coupon is low precisely BECAUSE of the conversion option, so discounting at 5% would value the option at nil."),

  q("FRK-18-07", "FR-18", "B", "medium",
    "In splitting a convertible instrument, which component is measured first?",
    [
      "The liability, at the present value of the cash flows discounted at the rate for similar non-convertible debt; equity is the residual",
      "The equity component, by reference to the value of the conversion option; the liability is the residual",
      "Both are measured independently at fair value",
      "The liability, using the coupon rate stated in the instrument",
    ],
    0,
    "LIABILITY FIRST, EQUITY AS THE RESIDUAL. The equity component has no directly observable value of its own, which is exactly why it is derived by subtraction. And the discount rate must be the market rate for similar debt WITHOUT the option."),

  q("FRK-18-08", "FR-18", "B", "hard",
    "Holders of a convertible bond take CASH on redemption rather than converting. What happens to the equity component recognised on issue?",
    [
      "It remains in equity; it is never remeasured or released to profit or loss",
      "It is released to profit or loss as a gain",
      "It is transferred to share capital and share premium",
      "It is reversed through other comprehensive income",
    ],
    0,
    "IT STAYS IN EQUITY. The equity component is never remeasured, whatever happens. On CONVERSION, the liability balance and the equity component are both transferred to share capital and share premium with no gain or loss. On REDEMPTION FOR CASH, the liability is settled and the equity component simply remains — releasing it to profit would recognise a gain on the entity's own equity."),
]

export const FR_KIT_B2: AccaQuestion[] = [...CH13, ...CH14, ...CH15, ...CH16, ...CH17, ...CH18]
