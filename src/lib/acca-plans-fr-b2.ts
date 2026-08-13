/*
 * FR Area B, second block — sale and leaseback and lessor accounting, IFRS 15
 * revenue, IAS 37 provisions and IAS 10, and financial instruments under IAS 32
 * and IFRS 9.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * IFRS 15 and the financial instruments standards are where FR sets its hardest
 * objective tests, because both turn on a classification made before any figure is
 * calculated: principal or agent, debt or equity, amortised cost or fair value. Get
 * the classification wrong and every subsequent number is wrong in a way that looks
 * internally consistent. So these plans settle the classification first and say what
 * evidence decides it.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FR_PLANS_B2: ExamPlanMap = {
  /* ── FR-14 · Sale and leaseback, and lessor accounting ─────── */

  "FR-14::sale-and-leaseback": {
    title: "Why the gain on a sale and leaseback is restricted",
    format: "ot",
    marks: 2,
    requirement:
      "An entity sells a building and leases it back for part of its remaining life. Where the transfer qualifies as a sale, the seller-lessee recognises:\n\nA  The whole gain on disposal\nB  Only the gain relating to the rights transferred to the buyer-lessor\nC  No gain at all\nD  The gain in other comprehensive income",
    plan: [
      {
        step: "Identify what the seller-lessee has actually given up",
        detail:
          "Not the whole building. It has transferred the rights it did NOT retain, and kept a right of use for the lease term. So only part of the asset has left.",
      },
      {
        step: "Derive the gain restriction from that",
        detail:
          "A gain can only be recognised on the portion transferred. Recognising the whole gain would report a profit on a right the entity still holds and will consume.",
      },
      {
        step: "Note how the right-of-use asset is measured here",
        detail:
          "At the RETAINED PROPORTION of the previous carrying amount, not at the present value of the lease payments. That is the mechanism that restricts the gain automatically.",
      },
      {
        step: "Note the prior question that must be settled first",
        detail:
          "Whether the transfer qualifies as a SALE under IFRS 15 at all. If it does not, the seller keeps the asset and accounts for the proceeds as a FINANCIAL LIABILITY — no disposal, no gain.",
      },
    ],
    answer:
      "**B — only the gain relating to the rights transferred to the buyer-lessor.**\n\nThe seller-lessee has not given up the whole building: it has transferred the rights it did **not retain** and kept a **right of use** for the lease term. So only part of the asset has left, and a gain can only be recognised on that part.\n\nRecognising the **whole** gain would report a profit on a right the entity **still holds and will consume** — which is precisely the abuse the rule prevents, since a sale and leaseback would otherwise be a way of crystallising a revaluation gain through profit or loss.\n\nThe mechanism does this automatically: the **right-of-use asset is measured at the retained proportion of the previous carrying amount**, not at the present value of the lease payments. So the restriction falls out of the measurement rather than needing a separate calculation.\n\nThe **prior question** must be settled first, and a stem often turns on it: does the transfer qualify as a **sale** under IFRS 15? If it does **not**, there is **no disposal at all** — the seller keeps the asset on its statement of financial position and accounts for the proceeds as a **financial liability**. No gain arises in that case, which is option C's scenario applied to different facts.",
    earns: [
      "Deriving the restriction from what was actually transferred, and knowing the measurement mechanism",
      "Settling whether a sale occurred before considering any gain",
    ],
    loses: ["Recognising the full gain, which reports profit on a right still held"],
  },

  "FR-14::lessor-classification": {
    title: "Why lessors still classify leases",
    format: "ot",
    marks: 2,
    requirement:
      "A lessor classifies a lease as a finance lease where:\n\nA  The lease term exceeds twelve months\nB  It transfers substantially all the risks and rewards incidental to ownership of the underlying asset\nC  The lessee has an option to purchase at market value\nD  The asset is specialised",
    plan: [
      {
        step: "Note that classification survives for lessors",
        detail:
          "IFRS 16 removed the operating and finance lease distinction FOR LESSEES only. Lessors still classify, so the same lease can be a right-of-use asset to one party and an operating lease to the other.",
      },
      {
        step: "State the classification test",
        detail:
          "Whether the lease transfers SUBSTANTIALLY ALL the risks and rewards incidental to ownership. It is a substance test, not a checklist.",
      },
      {
        step: "Recall the indicators",
        detail:
          "Ownership transfers by the end of the term, a bargain purchase option, the term covers the major part of the economic life, the present value of payments amounts to substantially all the fair value, or the asset is so specialised only that lessee could use it.",
      },
      {
        step: "State the accounting each produces",
        detail:
          "FINANCE lease: the lessor derecognises the asset and recognises a receivable, with finance income over the term. OPERATING lease: the lessor keeps the asset, depreciates it, and recognises lease income normally straight line.",
      },
    ],
    answer:
      "**B — it transfers substantially all the risks and rewards incidental to ownership of the underlying asset.**\n\nThe first thing to know is that **classification survives for lessors**. IFRS 16 removed the operating and finance lease distinction **for lessees only** — so the same lease can be a **right-of-use asset and liability** to the lessee and an **operating lease** to the lessor, and there is no requirement for the two parties to mirror each other.\n\nThe test is **substance**: whether substantially all the **risks and rewards incidental to ownership** transfer. Option C fails because a purchase option at **market value** transfers nothing — only a **bargain** option does, since that is what makes exercise likely.\n\nThe indicators are: ownership **transfers** by the end of the term; a **bargain purchase option**; the term covers the **major part** of the economic life; the present value of the payments amounts to **substantially all** the fair value; or the asset is so **specialised** that only that lessee could use it.\n\nThe accounting differs completely. **Finance lease**: the lessor **derecognises the asset** and recognises a **receivable**, with finance income over the term. **Operating lease**: the lessor **keeps and depreciates** the asset and recognises lease income, normally straight line.",
    earns: [
      "Knowing classification survives for lessors and the two sides need not mirror",
      "Knowing a market-value purchase option is not an indicator but a bargain one is",
    ],
    loses: ["Assuming IFRS 16 removed the distinction for both parties"],
  },

  /* ── FR-15 · IFRS 15 the five-step model ───────────────────── */

  "FR-15::the-five-steps": {
    title: "The five steps, and what each one settles",
    format: "ot",
    marks: 2,
    requirement:
      "Under IFRS 15, the second step of the revenue recognition model is to:\n\nA  Determine the transaction price\nB  Identify the performance obligations in the contract\nC  Recognise revenue\nD  Allocate the transaction price",
    plan: [
      {
        step: "Learn the five steps in order",
        detail:
          "1 Identify the contract. 2 Identify the PERFORMANCE OBLIGATIONS. 3 Determine the transaction price. 4 Allocate the price to the obligations. 5 Recognise revenue as each obligation is satisfied.",
      },
      {
        step: "See why step 2 comes before pricing",
        detail:
          "The obligations determine WHAT is being sold. Until they are identified there is nothing to allocate a price to, and a contract that looks like one sale may contain three.",
      },
      {
        step: "Note what makes an obligation distinct",
        detail:
          "The customer can benefit from the good or service on its own or with readily available resources, AND the promise is separately identifiable from other promises in the contract.",
      },
      {
        step: "Note why the identification step carries so much",
        detail:
          "Unbundling changes the TIMING of revenue. A sale with a two-year service contract bundled in is two obligations, so part of the price is deferred over two years rather than recognised now.",
      },
    ],
    answer:
      "**B — identify the performance obligations in the contract.**\n\nThe five steps in order: **identify the contract**; **identify the performance obligations**; **determine the transaction price**; **allocate** the price to the obligations; **recognise** revenue as each obligation is satisfied.\n\nStep 2 comes before pricing because the obligations determine **what is being sold**. Until they are identified there is nothing to allocate a price **to** — and a contract that looks like one sale may contain three.\n\nAn obligation is **distinct** where two conditions hold: the customer can **benefit** from the good or service on its own or with readily available resources, **and** the promise is **separately identifiable** from other promises in the contract.\n\nWhy this step carries so much weight is the practical point: **unbundling changes the timing of revenue**. A machine sold with a two-year service contract bundled into the price is **two** obligations, so part of the price is **deferred over two years** rather than recognised on delivery. An entity that treats it as one obligation recognises everything now and overstates the current year.\n\nSo the commonest IFRS 15 error is not a calculation — it is failing to unbundle.",
    earns: [
      "Knowing the order and why obligations must be identified before pricing",
      "Naming unbundling as what changes the timing of revenue",
    ],
    loses: ["Pricing before identifying what is being sold, which cannot be allocated"],
  },

  "FR-15::transaction-price": {
    title: "Determining the transaction price",
    format: "ot",
    marks: 2,
    requirement:
      "A contract includes a performance bonus the entity may or may not earn. In determining the transaction price, the bonus is:\n\nA  Excluded entirely until received\nB  Included as variable consideration, but only to the extent it is highly probable that including it would not result in a significant revenue reversal\nC  Included in full\nD  Recognised in other comprehensive income",
    plan: [
      {
        step: "Identify the bonus as variable consideration",
        detail:
          "Bonuses, penalties, discounts, rebates, refunds and price concessions are all variable consideration. It must be ESTIMATED rather than ignored.",
      },
      {
        step: "State the constraint on including it",
        detail:
          "Include it only to the extent it is HIGHLY PROBABLE that a significant reversal of cumulative revenue will not occur. That is a deliberately high threshold.",
      },
      {
        step: "Note the two estimation methods",
        detail:
          "EXPECTED VALUE where there is a large number of similar contracts, and MOST LIKELY AMOUNT where there are only two possible outcomes. The method must fit the pattern of outcomes.",
      },
      {
        step: "Note the other adjustments to the price",
        detail:
          "A SIGNIFICANT FINANCING COMPONENT is discounted, so a two-year interest-free credit sale recognises less revenue and interest income over the term. Non-cash consideration is measured at fair value.",
      },
    ],
    answer:
      "**B — included as variable consideration, but only to the extent it is highly probable that including it would not result in a significant revenue reversal.**\n\nA bonus is **variable consideration**, alongside penalties, discounts, rebates, refunds and price concessions — and it must be **estimated** rather than ignored, so option A is wrong in principle even though it feels prudent.\n\nThe **constraint** is deliberately demanding: include the amount only to the extent it is **highly probable** that a **significant reversal** of cumulative revenue will not occur. So an uncertain bonus is partly or wholly excluded — not because uncertainty is fatal but because recognising revenue that later has to be reversed misleads twice.\n\nTwo **estimation methods**, and the method must fit the pattern of outcomes: **expected value** where there is a large number of similar contracts, and **most likely amount** where there are only two possible outcomes. Using expected value on a binary bonus produces a figure that can never occur.\n\nThe other adjustments to the price matter too. A **significant financing component** is **discounted**, so a two-year interest-free credit sale recognises **less revenue** at the point of sale and **interest income** over the term. **Non-cash** consideration is measured at fair value, and amounts payable to the customer normally **reduce** the price.",
    earns: [
      "Estimating rather than excluding, and applying the highly probable constraint",
      "Matching the estimation method to the pattern of outcomes",
    ],
    loses: ["Excluding variable consideration until received, which defers revenue incorrectly"],
  },

  "FR-15::allocate-and-recognise": {
    title: "When revenue is recognised over time rather than at a point",
    format: "ot",
    marks: 2,
    requirement:
      "Revenue is recognised **over time** where:\n\nA  The contract lasts more than one year\nB  The customer simultaneously receives and consumes the benefits, or the entity's performance creates an asset the customer controls, or the asset has no alternative use and the entity has an enforceable right to payment\nC  The customer pays in instalments\nD  The entity chooses to do so",
    plan: [
      {
        step: "State the three criteria and note that any one suffices",
        detail:
          "The customer simultaneously receives and consumes the benefits; OR the entity's performance creates or enhances an asset the CUSTOMER controls as it is created; OR the asset has no alternative use to the entity and the entity has an enforceable right to payment for work done.",
      },
      {
        step: "Note the default",
        detail:
          "If none of the three is met, revenue is recognised at a POINT IN TIME — when control of the good or service transfers. Over time is the exception requiring justification.",
      },
      {
        step: "Reject duration and payment pattern as tests",
        detail:
          "A long contract can still be point-in-time, and instalment payment says nothing about when control transfers. Neither duration nor cash flow decides it.",
      },
      {
        step: "Note how progress is measured where over time applies",
        detail:
          "By an OUTPUT method (units delivered, surveys of work performed) or an INPUT method (costs incurred, labour hours). The method chosen must depict the transfer of control faithfully.",
      },
    ],
    answer:
      "**B — the customer simultaneously receives and consumes the benefits, or the entity's performance creates an asset the customer controls, or the asset has no alternative use and the entity has an enforceable right to payment.**\n\nThree criteria and **any one suffices**. A cleaning service satisfies the first; construction on the customer's land satisfies the second; a specialised asset with no alternative use plus an enforceable right to payment satisfies the third.\n\nThe **default** is the point most often missed: if **none** of the three is met, revenue is recognised at a **point in time**, when **control** of the good or service transfers. So over time is the **exception** that requires justification, not the normal treatment for anything long.\n\nDuration and payment pattern decide nothing. A three-year contract can still be point-in-time, and instalment payment says nothing about when control transfers — which is why options A and C are wrong even though both feel relevant.\n\nWhere over time applies, **progress** is measured by an **output** method (units delivered, surveys of work performed, milestones) or an **input** method (costs incurred, labour hours), and the method must **faithfully depict** the transfer of control. Input methods need adjusting where costs are incurred that do not reflect progress — uninstalled materials, for instance.\n\n**Control** indicators for a point in time: legal title, physical possession, the significant risks and rewards, acceptance, and a present right to payment.",
    earns: [
      "Knowing any one criterion suffices and that point in time is the default",
      "Knowing input methods need adjusting for costs that do not reflect progress",
    ],
    loses: ["Treating a long contract as automatically recognised over time"],
  },

  /* ── FR-16 · IFRS 15 in application ────────────────────────── */

  "FR-16::principal-agent": {
    title: "The largest single revenue judgement",
    format: "ot",
    marks: 2,
    requirement:
      "An entity arranges for a third party to supply goods to a customer. It should recognise revenue at the **gross** amount only if it:\n\nA  Collects the cash from the customer\nB  Controls the goods before they are transferred to the customer\nC  Sets the price charged to the customer\nD  Issues the invoice",
    plan: [
      {
        step: "State the test",
        detail:
          "CONTROL of the good or service before it is transferred to the customer. A principal controls it and recognises revenue GROSS; an agent does not and recognises only its COMMISSION.",
      },
      {
        step: "See why the difference is so large",
        detail:
          "It changes reported revenue by the whole cost of the goods while leaving profit unchanged. So an agent reporting gross overstates revenue enormously without misstating profit at all.",
      },
      {
        step: "Reject the cash and invoicing indicators",
        detail:
          "Collecting cash and issuing invoices are administrative and are exactly what an agent does. Neither indicates control, which is why they are offered.",
      },
      {
        step: "Note the genuine indicators of control",
        detail:
          "Primary responsibility for fulfilling the promise, INVENTORY RISK before or after transfer, and discretion in establishing the price. Price discretion is an indicator, not the test.",
      },
    ],
    answer:
      "**B — controls the goods before they are transferred to the customer.**\n\nThe test is **control**. A **principal** controls the good or service before transfer and recognises revenue **gross**; an **agent** does not and recognises only its **commission or fee**.\n\nWhy this is the largest single revenue judgement in the standard: it changes reported **revenue by the whole cost of the goods** while leaving **profit unchanged**. So an agent reporting gross overstates revenue enormously and misstates profit not at all — which makes it attractive to an entity judged on revenue growth, and invisible in the profit figure.\n\nOptions A and D are what an agent **does**: collecting cash and issuing invoices are administrative, and neither indicates control. They are offered precisely because they feel like signs of being the seller.\n\nThe genuine **indicators** are **primary responsibility** for fulfilling the promise, **inventory risk** before or after transfer, and **discretion in establishing the price**. Note that price discretion is an **indicator, not the test** — which is why option C is close but insufficient on its own.\n\nInventory risk is usually the most telling: an entity that never bears the risk of unsold goods is rarely a principal.",
    earns: [
      "Naming control as the test and price discretion as only an indicator",
      "Explaining that the error inflates revenue while leaving profit correct",
    ],
    loses: ["Treating cash collection or invoicing as evidence of being the principal"],
  },

  "FR-16::warranties": {
    title: "Two kinds of warranty, two standards",
    format: "ot",
    marks: 2,
    requirement:
      "A customer can purchase an extended warranty separately from the product. The extended warranty is:\n\nA  A provision under IAS 37\nB  A separate performance obligation under IFRS 15, with revenue deferred and recognised over the warranty period\nC  Not accounted for until a claim arises\nD  Deducted from the product's revenue",
    plan: [
      {
        step: "Split warranties into the two kinds",
        detail:
          "An ASSURANCE warranty — that the product conforms to specification — is a cost of the sale and gives a PROVISION under IAS 37. A SERVICE warranty provides a service beyond that and is a separate performance obligation under IFRS 15.",
      },
      {
        step: "Identify the deciding evidence",
        detail:
          "Whether the warranty can be PURCHASED SEPARATELY. If it can, it is a service warranty — the separate price proves the customer is buying something additional.",
      },
      {
        step: "State the consequence for revenue",
        detail:
          "Part of the transaction price is ALLOCATED to the warranty and DEFERRED, recognised over the warranty period. So revenue is lower now and higher later.",
      },
      {
        step: "Contrast with the assurance warranty's accounting",
        detail:
          "No revenue is deferred. Instead a PROVISION is recognised for the expected cost of honouring it, charged as an expense — which affects cost, not revenue.",
      },
    ],
    answer:
      "**B — a separate performance obligation under IFRS 15, with revenue deferred and recognised over the warranty period.**\n\nTwo kinds of warranty, two standards. An **assurance** warranty — a promise that the product conforms to agreed specifications — is a **cost of the sale** and gives rise to a **provision under IAS 37**. A **service** warranty provides a service **beyond** that assurance and is a **separate performance obligation under IFRS 15**.\n\nThe deciding evidence is whether the warranty **can be purchased separately**: if it can, it is a service warranty, because the separate price proves the customer is buying something **additional** rather than reassurance about the product itself.\n\nThe consequence for revenue is what the marks are for: part of the transaction price is **allocated** to the warranty and **deferred**, then recognised over the warranty period. So revenue is **lower now and higher later** than treating the whole receipt as product revenue.\n\nThe contrast is complete: an **assurance** warranty defers **no revenue** at all. Instead a **provision** is recognised for the expected cost of honouring it, charged as an **expense** — so it affects **cost**, not revenue.\n\nOther indicators of a service warranty are a period **longer than legally required** and warranty terms covering matters beyond conformity.",
    earns: [
      "Splitting the two kinds and using separate purchasability as the deciding evidence",
      "Knowing one defers revenue and the other creates a cost provision",
    ],
    loses: ["Providing under IAS 37 for a warranty the customer bought separately"],
  },

  "FR-16::returns": {
    title: "Accounting for a sale with a right of return",
    format: "ot",
    marks: 2,
    requirement:
      "An entity sells goods with a right of return and expects 5% to be returned. It should:\n\nA  Recognise revenue on all sales and provide for the expected returns as an expense\nB  Recognise revenue on 95% of the sales, recognise a refund liability for the expected refunds, and recognise an asset for the goods expected to be recovered\nC  Recognise no revenue until the return period expires\nD  Recognise revenue on all sales with no further entries",
    plan: [
      {
        step: "Recognise the expected returns as a constraint on revenue, not a cost",
        detail:
          "Revenue is recognised only for the goods NOT expected to be returned. The expected returns are variable consideration excluded by the constraint, so they never become revenue at all.",
      },
      {
        step: "Identify the liability",
        detail:
          "A REFUND LIABILITY for the amount expected to be repaid to customers. It is a liability rather than a provision, because it is measured under IFRS 15.",
      },
      {
        step: "Identify the asset candidates forget",
        detail:
          "An ASSET for the entity's right to RECOVER the goods, measured at the former carrying amount of the inventory less any expected costs of recovery. Three entries, not two.",
      },
      {
        step: "See why option A gives the wrong revenue",
        detail:
          "Providing for returns as an expense recognises 100% of revenue and a matching cost. Revenue is then overstated even though profit may be similar — the same failure as the principal-agent error.",
      },
    ],
    answer:
      "**B — recognise revenue on 95% of the sales, recognise a refund liability for the expected refunds, and recognise an asset for the goods expected to be recovered.**\n\nThree entries, and the **asset** is the one most often omitted.\n\nExpected returns are **variable consideration** excluded by the constraint, so revenue is recognised only for the goods **not expected to be returned** — they never become revenue at all. A **refund liability** is recognised for the amount expected to be repaid. And an **asset** is recognised for the entity's right to **recover the goods**, measured at the former carrying amount of the inventory **less** any expected costs of recovery and any expected reduction in value.\n\nOption A is the important error and repeats the shape of the principal-agent mistake: providing for returns as an **expense** recognises **100% of revenue** with a matching cost, so **revenue is overstated** even though profit may come out similar. IFRS 15 treats returns as a revenue question, not a cost question.\n\nOption C defers everything until the return period expires, which ignores that 95% is not expected to be returned and understates revenue.\n\nBoth the liability and the asset are **remeasured** at each reporting date as the expectation changes.",
    earns: [
      "Making all three entries, including the asset for goods expected to be recovered",
      "Knowing returns reduce revenue rather than creating a cost",
    ],
    loses: ["Providing for returns as an expense, which overstates revenue"],
  },

  "FR-16::costs-and-balances": {
    title: "Telling a contract asset from a receivable",
    format: "ot",
    marks: 2,
    requirement:
      "An entity has satisfied a performance obligation but its right to consideration is conditional on completing a further obligation. It recognises:\n\nA  A trade receivable\nB  A contract asset\nC  A contract liability\nD  Nothing until the further obligation is satisfied",
    plan: [
      {
        step: "Define the three contract balances",
        detail:
          "CONTRACT ASSET: a right to consideration conditional on something other than the passage of time. RECEIVABLE: an UNCONDITIONAL right to consideration. CONTRACT LIABILITY: an obligation to transfer goods for consideration already received or due.",
      },
      {
        step: "Apply the conditionality test",
        detail:
          "The right here is conditional on completing a further obligation, so it is not unconditional. That makes it a contract asset rather than a receivable.",
      },
      {
        step: "Note why the distinction matters",
        detail:
          "A receivable carries only CREDIT risk. A contract asset carries credit risk AND performance risk — the entity may fail to complete. So they are presented separately.",
      },
      {
        step: "Note the contract cost rules alongside",
        detail:
          "Costs of OBTAINING a contract are capitalised if incremental and expected to be recovered. Costs of FULFILLING a contract are capitalised only if they relate directly to it, generate resources, and are expected to be recovered.",
      },
    ],
    answer:
      "**B — a contract asset.**\n\nThe three balances turn on **conditionality**. A **contract asset** is a right to consideration conditional on something **other than the passage of time**. A **receivable** is an **unconditional** right — only time stands between the entity and payment. A **contract liability** is an obligation to transfer goods or services for consideration already received or due.\n\nHere the right is conditional on completing a **further obligation**, so it is not unconditional and cannot be a receivable.\n\nWhy the distinction matters is the examinable point: a **receivable** carries only **credit** risk, while a **contract asset** carries credit risk **and performance** risk — the entity may still fail to complete and lose the right altogether. They are therefore **presented separately**, and a user reading contract assets is reading a different quality of claim.\n\nThe **contract cost** rules complete the topic. Costs of **obtaining** a contract are capitalised where they are **incremental** and expected to be **recovered** — so a sales commission is capitalised and amortised, while a salary paid regardless is expensed. Costs of **fulfilling** a contract are capitalised only where they relate **directly** to it, **generate or enhance resources**, and are expected to be recovered.",
    earns: [
      "Applying conditionality, and knowing a contract asset carries performance risk as well as credit risk",
      "Knowing an incremental commission is capitalised while a fixed salary is not",
    ],
    loses: ["Recognising a receivable where the right is still conditional on performance"],
  },

  /* ── FR-17 · IAS 37 and IAS 10 ─────────────────────────────── */

  "FR-17::recognition": {
    title: "The three conditions for recognising a provision",
    format: "ot",
    marks: 2,
    requirement:
      "A company plans to relocate next year at a cost of $2m. No commitments have been entered into. It should:\n\nA  Recognise a provision of $2m\nB  Recognise no provision, because there is no present obligation\nC  Disclose a contingent liability\nD  Recognise a provision of the discounted amount",
    plan: [
      {
        step: "State the three conditions",
        detail:
          "A PRESENT OBLIGATION arising from a past event, a PROBABLE outflow of economic benefits, and a RELIABLE ESTIMATE. All three are required.",
      },
      {
        step: "Test the first condition on these facts",
        detail:
          "There is a PLAN, not an obligation. No commitments have been entered into, so the entity could still change its mind — and an intention to spend is never a liability.",
      },
      {
        step: "Reject the contingent liability answer",
        detail:
          "A contingent liability is a POSSIBLE obligation arising from a past event, or one whose outflow is not probable. Here there is no obligation at all, so there is nothing to disclose.",
      },
      {
        step: "Note the general rule this illustrates",
        detail:
          "No provision may be made for FUTURE OPERATING LOSSES or for costs of continuing operations, however certain they seem. The entity can avoid them by ceasing the activity.",
      },
    ],
    answer:
      "**B — recognise no provision, because there is no present obligation.**\n\nThree conditions must all be met: a **present obligation** arising from a **past event**, a **probable** outflow of economic benefits, and a **reliable estimate**.\n\nHere there is a **plan**, not an obligation. No commitments have been entered into, so the entity **could still change its mind** — and an intention to spend is **never** a liability, which is the Framework's liability definition doing the work.\n\nOption C is wrong for a reason worth stating precisely: a **contingent liability** is a **possible** obligation arising from a **past event**, or a present obligation whose outflow is not probable. Here there is **no obligation at all**, so there is nothing to disclose — not even as a contingency.\n\nThe general rule this illustrates is the one examined most: **no provision may be made for future operating losses**, or for the costs of **continuing** operations, however certain they appear. The entity can always avoid them by ceasing the activity, so there is no obligation it cannot avoid.\n\nAn obligation may be **legal** or **constructive** — a constructive obligation arising where the entity's established practice or public statements create a valid expectation in others.",
    earns: [
      "Testing the present obligation condition first, and distinguishing no obligation from a contingency",
      "Knowing future operating losses can never be provided for",
    ],
    loses: ["Providing for a plan, or disclosing a contingency where no obligation exists"],
  },

  "FR-17::measurement": {
    title: "Measuring a provision",
    format: "ot",
    marks: 2,
    requirement:
      "A provision should be measured at:\n\nA  The maximum possible outflow\nB  The best estimate of the expenditure required to settle the obligation at the reporting date\nC  The minimum possible outflow\nD  The amount the entity intends to pay",
    plan: [
      {
        step: "State the measurement objective",
        detail:
          "The BEST ESTIMATE of the expenditure required to settle the present obligation at the reporting date — the amount an entity would rationally pay to settle or transfer it.",
      },
      {
        step: "Note the two estimation techniques",
        detail:
          "EXPECTED VALUE for a large POPULATION of similar items — a warranty provision. MOST LIKELY OUTCOME for a SINGLE obligation, such as one lawsuit. Using expected value on a single obligation gives a figure that can never be paid.",
      },
      {
        step: "Note discounting",
        detail:
          "Where the effect is material, the provision is DISCOUNTED to present value, and the unwinding of the discount is a FINANCE COST in later periods.",
      },
      {
        step: "Note the treatment of a reimbursement",
        detail:
          "An expected reimbursement is recognised as a SEPARATE ASSET only when virtually certain, and is NOT netted against the provision — so the gross liability remains visible.",
      },
    ],
    answer:
      "**B — the best estimate of the expenditure required to settle the obligation at the reporting date.**\n\nThe objective is the amount an entity would **rationally pay to settle or transfer** the obligation at the reporting date — neither the maximum nor the minimum, and not what the entity **intends** to pay.\n\nTwo estimation techniques, and matching them to the situation is where the marks are. **Expected value** for a large **population** of similar items, such as a warranty provision over thousands of units. **Most likely outcome** for a **single** obligation, such as one lawsuit. Using expected value on a single obligation produces a figure that **can never be paid** — the entity will pay the full claim or nothing.\n\nWhere the effect is material the provision is **discounted** to present value, and the **unwinding of the discount** is recognised as a **finance cost** in later periods — so a provision grows each year even where the estimate has not changed.\n\nAn expected **reimbursement** is recognised as a **separate asset** only where receipt is **virtually certain**, and is **not netted** against the provision. So the gross liability stays visible, which matters because the entity remains liable for the whole amount if the reimbursement fails.\n\nProvisions are **reviewed each reporting date** and adjusted.",
    earns: [
      "Matching expected value to a population and most likely outcome to a single obligation",
      "Knowing the discount unwind is a finance cost and reimbursements are not netted",
    ],
    loses: ["Using expected value for a single obligation, giving an amount that cannot arise"],
  },

  "FR-17::specific-applications": {
    title: "Restructuring provisions and onerous contracts",
    format: "ot",
    marks: 2,
    requirement:
      "A restructuring provision may be recognised only when the entity has:\n\nA  A board decision to restructure\nB  A detailed formal plan and has raised a valid expectation in those affected, by starting to implement it or announcing its main features\nC  Identified the costs involved\nD  Consulted its auditors",
    plan: [
      {
        step: "State what creates the obligation",
        detail:
          "A DETAILED FORMAL PLAN and a VALID EXPECTATION raised in those affected — by beginning to implement the plan or announcing its main features to them. Both limbs are required.",
      },
      {
        step: "See why a board decision is not enough",
        detail:
          "A decision can be reversed, so it creates no obligation the entity cannot avoid. The obligation arises only once others have been led to expect it — which is the constructive obligation test.",
      },
      {
        step: "Note what may and may not be included",
        detail:
          "Only DIRECT expenditures necessarily entailed by the restructuring. NOT retraining or relocating continuing staff, marketing, or investment in new systems — those relate to the future conduct of the business.",
      },
      {
        step: "State the onerous contract rule",
        detail:
          "Where the unavoidable costs of meeting a contract EXCEED the benefits expected from it, the obligation is recognised as a provision at the lower of the cost of fulfilling and the cost of terminating.",
      },
    ],
    answer:
      "**B — a detailed formal plan and has raised a valid expectation in those affected, by starting to implement it or announcing its main features.**\n\nBoth limbs are required, and the second is what creates the obligation. A **board decision alone is not enough** because a decision **can be reversed** — so it creates no obligation the entity cannot avoid. The obligation arises only once **others have been led to expect** the restructuring, which is the **constructive obligation** test applied to a specific case.\n\nWhat may be **included** is tightly drawn: only **direct expenditures necessarily entailed** by the restructuring. **Excluded** are retraining or relocating **continuing** staff, marketing, and investment in new systems — because those relate to the **future conduct** of the business rather than to the restructuring itself. A question listing a mix of costs is testing that filter.\n\nThe **onerous contract** rule sits alongside: where the **unavoidable costs** of meeting a contract **exceed** the economic benefits expected from it, a provision is recognised at the **lower of the cost of fulfilling it and the cost of terminating it**.\n\nAnd what may **never** be provided for: **future operating losses**, and **repairs or maintenance** of the entity's own assets, since the entity could sell the asset instead.",
    earns: [
      "Knowing a board decision alone creates no obligation, and why",
      "Applying the direct-expenditure filter, and knowing an onerous contract is the lower of fulfil and terminate",
    ],
    loses: ["Providing on a board decision, or including continuing-operations costs"],
  },

  "FR-17::ias-10": {
    title: "Adjusting and non-adjusting events",
    format: "ot",
    marks: 2,
    requirement:
      "After the reporting date but before the financial statements are authorised, inventory held at the year end is sold below cost. This is:\n\nA  A non-adjusting event, disclosed only\nB  An adjusting event — it provides evidence of the net realisable value at the reporting date\nC  Ignored\nD  An adjusting event only if material to profit",
    plan: [
      {
        step: "State the test",
        detail:
          "An ADJUSTING event provides evidence of conditions that existed AT the reporting date. A NON-ADJUSTING event concerns conditions arising AFTER it. The question is when the CONDITION existed.",
      },
      {
        step: "Apply it to the inventory sale",
        detail:
          "A sale below cost shortly after the year end is evidence of the inventory's NET REALISABLE VALUE at the reporting date. The condition — that it was worth less than cost — existed then.",
      },
      {
        step: "Contrast with the standard non-adjusting example",
        detail:
          "A fire destroying inventory after the year end is NON-adjusting: the inventory genuinely existed and was worth its carrying amount at the reporting date, and the loss arose afterwards.",
      },
      {
        step: "Note the one event that always adjusts",
        detail:
          "A determination that the entity is NO LONGER A GOING CONCERN. That changes the entire basis of preparation regardless of when the deterioration occurred.",
      },
    ],
    answer:
      "**B — an adjusting event: it provides evidence of the net realisable value at the reporting date.**\n\nThe test is **when the condition existed**, not when the event happened. An **adjusting** event provides evidence of conditions that existed **at** the reporting date; a **non-adjusting** event concerns conditions arising **after** it.\n\nA sale below cost shortly after the year end is evidence of the inventory's **net realisable value at the reporting date** — the condition, that it was worth less than cost, existed then and the sale merely revealed it. So the inventory is written down in the financial statements.\n\nThe contrast fixes the principle: a **fire** destroying that same inventory after the year end is **non-adjusting**, because the inventory genuinely existed and was worth its carrying amount at the reporting date and the loss arose afterwards. It is **disclosed** if material.\n\nOption D adds a materiality condition to the classification, which does not belong: materiality determines whether an item need be treated precisely, not whether an event adjusts.\n\nThe **other adjusting events** are the settlement of a court case confirming a present obligation, the bankruptcy of a customer, the determination of consideration for an asset bought or sold, and the discovery of fraud or error.\n\nAnd one event **always** adjusts: a determination that the entity is **no longer a going concern**, because it changes the entire basis of preparation.",
    earns: [
      "Asking when the condition existed, and giving the non-adjusting counterpart as a contrast",
      "Knowing going concern always adjusts regardless of category",
    ],
    loses: ["Treating the event as non-adjusting because it occurred after the year end"],
  },

  /* ── FR-18 · Liabilities, equity, compound instruments ─────── */

  "FR-18::debt-or-equity": {
    title: "Classifying an instrument as debt or equity",
    format: "ot",
    marks: 2,
    requirement:
      "Preference shares that are **redeemable** at a fixed date are classified as:\n\nA  Equity, because they are shares\nB  A financial liability, because the entity has a contractual obligation to deliver cash\nC  A compound instrument\nD  Equity, with the dividend as a distribution",
    plan: [
      {
        step: "State the test",
        detail:
          "Whether there is a CONTRACTUAL OBLIGATION to deliver cash or another financial asset. If there is, the instrument is a liability whatever it is called.",
      },
      {
        step: "Apply it to redeemable preference shares",
        detail:
          "Redemption at a fixed date is an obligation to deliver cash, so the instrument is a LIABILITY. Substance over form, and the word \"shares\" is irrelevant.",
      },
      {
        step: "State the consequence for the dividend",
        detail:
          "The dividend is a FINANCE COST in profit or loss, not a distribution in the statement of changes in equity. So it reduces profit — which is what option D gets wrong.",
      },
      {
        step: "Contrast irredeemable shares",
        detail:
          "IRREDEEMABLE preference shares are EQUITY, because nothing need ever be repaid, and their dividend is a distribution. One word changes both the classification and the presentation of the dividend.",
      },
    ],
    answer:
      "**B — a financial liability, because the entity has a contractual obligation to deliver cash.**\n\nThe test is whether there is a **contractual obligation to deliver cash or another financial asset**. Redemption at a fixed date is exactly that, so the instrument is a **liability** whatever it is called — **substance over form**, and the word \"shares\" carries no weight.\n\nThe consequence follows and is examined as often as the classification: the **dividend is a finance cost in profit or loss**, not a distribution in the statement of changes in equity. So it **reduces profit**, which is what option D gets wrong — and an entity that classifies these shares as equity overstates profit and understates gearing simultaneously.\n\nThe contrast is one word: **irredeemable** preference shares are **equity**, because nothing need ever be repaid, and their dividend **is** a distribution. So the same instrument name gives opposite answers depending on redeemability.\n\nEquity is the **residual** — an instrument is equity only if it contains **no** obligation to deliver cash. An instrument settled by delivering a **variable number** of the entity's own shares is also a liability, because the variability makes it a claim for a fixed value rather than an ownership interest.",
    earns: [
      "Applying the obligation test, and knowing the dividend becomes a finance cost",
      "Knowing a variable number of own shares is also a liability",
    ],
    loses: ["Classifying by the instrument's name rather than by the obligation it carries"],
  },

  "FR-18::amortised-cost": {
    title: "Measuring a financial liability at amortised cost",
    format: "ot",
    marks: 2,
    requirement:
      "A bond is issued at a discount, with issue costs incurred. In measuring it at amortised cost, the effective interest rate is applied to:\n\nA  The nominal value of the bond\nB  The opening carrying amount of the liability each period\nC  The cash proceeds received\nD  The redemption amount",
    plan: [
      {
        step: "State the mechanism",
        detail:
          "The effective rate is applied to the OPENING CARRYING AMOUNT each period. The resulting finance cost is added, and the cash interest paid is deducted, giving the closing carrying amount.",
      },
      {
        step: "Establish the initial carrying amount",
        detail:
          "Proceeds received LESS transaction costs. Issue costs are DEDUCTED from the liability rather than expensed, which is why they raise the effective rate.",
      },
      {
        step: "Note why the effective rate exceeds the coupon",
        detail:
          "The entity received less than it must repay, because of the discount and the issue costs. The effective rate spreads that shortfall over the term as additional finance cost.",
      },
      {
        step: "Note the direction of the carrying amount",
        detail:
          "It RISES each period toward the redemption amount, because the finance cost charged exceeds the cash paid. A carrying amount that falls indicates an error in the table.",
      },
    ],
    answer:
      "**B — the opening carrying amount of the liability each period.**\n\nThe mechanism runs as a table: apply the **effective rate** to the **opening carrying amount** to give the finance cost, **add** it, **deduct** the cash interest paid, and the result is the closing carrying amount — which becomes next period's opening figure.\n\nThe **initial** carrying amount is **proceeds received less transaction costs**. Issue costs are **deducted from the liability** rather than expensed, and that is why they **raise the effective rate**: the entity has less cash and the same obligation.\n\nWhy the effective rate **exceeds the coupon**: the entity received less than it must repay, because of both the discount and the issue costs. The effective rate spreads that shortfall over the term as **additional finance cost**, so the total charged over the life is the coupon payments **plus** the discount **plus** the issue costs.\n\nThe **direction** is a free check on any table: the carrying amount **rises each period** toward the redemption amount, because the finance cost charged **exceeds** the cash paid. A carrying amount that falls means an error — usually the rate applied to the wrong figure.\n\nAt redemption the carrying amount should equal the **redemption amount**, which is the second check.",
    earns: [
      "Knowing issue costs are deducted from the liability and therefore raise the effective rate",
      "Using the rising carrying amount and the redemption figure as checks on the table",
    ],
    loses: ["Applying the effective rate to nominal value, which ignores the discount and costs"],
  },

  "FR-18::compound": {
    title: "Splitting a convertible instrument",
    format: "ot",
    marks: 2,
    requirement:
      "On issuing a convertible bond, the equity component is measured as:\n\nA  The fair value of the conversion option, measured directly\nB  The proceeds less the present value of the cash flows discounted at the rate for a similar non-convertible bond\nC  The nominal value of the shares into which it converts\nD  Nil, as the whole instrument is a liability",
    plan: [
      {
        step: "Identify the instrument as compound",
        detail:
          "A convertible bond contains a LIABILITY component — the obligation to pay interest and principal — and an EQUITY component, the holder's option to convert. Both must be recognised.",
      },
      {
        step: "State the order of measurement",
        detail:
          "Measure the LIABILITY first, as the present value of the cash flows discounted at the market rate for a SIMILAR NON-CONVERTIBLE bond. The equity component is then the RESIDUAL.",
      },
      {
        step: "See why the residual approach is used",
        detail:
          "Equity is defined as a residual, so measuring it directly would contradict the Framework. And a market rate for a similar plain bond is observable, whereas the option's fair value often is not.",
      },
      {
        step: "Note what happens afterwards",
        detail:
          "The liability is measured at AMORTISED COST using that market rate, so a finance cost above the coupon is charged. The equity component is NOT remeasured, whether or not conversion occurs.",
      },
    ],
    answer:
      "**B — the proceeds less the present value of the cash flows discounted at the rate for a similar non-convertible bond.**\n\nA convertible bond is a **compound instrument**: a **liability** component — the obligation to pay interest and principal — and an **equity** component, being the holder's **option to convert**. Both must be recognised, so option D is wrong.\n\nThe **order** is fixed and it is what the question tests. Measure the **liability first**, as the present value of the cash flows discounted at the market rate for a **similar non-convertible** bond. The **equity component is the residual** — proceeds less that liability figure.\n\nTwo reasons for the residual approach. **Equity is defined as a residual** in the Framework, so measuring it directly would contradict the definition. And a market rate for a similar plain bond is **observable**, whereas the conversion option's fair value frequently is not.\n\nWhat happens afterwards completes the topic. The liability is measured at **amortised cost** using that market rate, so a **finance cost above the coupon** is charged — the convertible looks cheap in cash terms and is not cheap in profit terms. The **equity component is never remeasured**, whether conversion happens or not.\n\nOn conversion, the liability and the equity component are both transferred to share capital and premium; on redemption, the equity component remains in equity.",
    earns: [
      "Measuring the liability first and taking equity as the residual, with both reasons",
      "Knowing the equity component is never remeasured and the finance cost exceeds the coupon",
    ],
    loses: ["Measuring the option directly, which contradicts equity being a residual"],
  },

  /* ── FR-19 · IFRS 9 financial assets ──────────────────────── */

  "FR-19::classification": {
    title: "Classifying a financial asset",
    format: "ot",
    marks: 2,
    requirement:
      "A debt instrument is held in a business model whose objective is to collect contractual cash flows, and its cash flows are solely payments of principal and interest. It is measured at:\n\nA  Fair value through profit or loss\nB  Amortised cost\nC  Fair value through other comprehensive income\nD  Cost",
    plan: [
      {
        step: "State the two tests for a debt instrument",
        detail:
          "The BUSINESS MODEL test — hold to collect, hold to collect and sell, or other — and the CONTRACTUAL CASH FLOW test, whether the cash flows are solely payments of principal and interest.",
      },
      {
        step: "Map the combinations",
        detail:
          "Hold to collect + SPPI = AMORTISED COST. Hold to collect and sell + SPPI = fair value through other comprehensive income. Anything else = fair value through profit or loss.",
      },
      {
        step: "Note that failing either test forces fair value through profit or loss",
        detail:
          "So a debt instrument whose cash flows are not solely principal and interest is at fair value through profit or loss however it is held. Both tests must pass for the other categories.",
      },
      {
        step: "Note the separate treatment of equity investments",
        detail:
          "Equity investments are at fair value through PROFIT OR LOSS by default, with an IRREVOCABLE election available at initial recognition to present changes in other comprehensive income — and no recycling on disposal.",
      },
    ],
    answer:
      "**B — amortised cost.**\n\nTwo tests apply to a debt instrument, and **both must pass** for anything other than fair value through profit or loss. The **business model** test — hold to collect, hold to collect and sell, or other — and the **contractual cash flow** test, whether the cash flows are **solely payments of principal and interest**.\n\nThe combinations map cleanly. Hold to collect **plus** SPPI gives **amortised cost**. Hold to collect **and sell** plus SPPI gives **fair value through other comprehensive income**. Anything else gives **fair value through profit or loss**.\n\nSo failing **either** test forces fair value through profit or loss: a convertible bond held as an asset, or an instrument with cash flows linked to a commodity price, is at fair value through profit or loss however the entity holds it.\n\n**Equity** investments follow a separate rule worth keeping apart: **fair value through profit or loss by default**, with an **irrevocable election** available at initial recognition to present changes in **other comprehensive income** — and where that election is made, the gains are **never recycled** to profit or loss on disposal. So an entity choosing it permanently forgoes reporting those gains as profit.\n\nThat election is not available for equity **held for trading**.",
    earns: [
      "Requiring both tests to pass, and knowing failure of either forces fair value through profit or loss",
      "Knowing the equity election is irrevocable and gains are never recycled",
    ],
    loses: ["Applying only the business model test, which cannot decide the category alone"],
  },

  "FR-19::amortised-cost-asset": {
    title: "Measuring a debt instrument asset at amortised cost",
    format: "ot",
    marks: 2,
    requirement:
      "Transaction costs incurred on acquiring a financial asset measured at amortised cost are:\n\nA  Expensed immediately\nB  Added to the initial carrying amount, which reduces the effective interest rate\nC  Deducted from the initial carrying amount\nD  Recognised in other comprehensive income",
    plan: [
      {
        step: "State the direction for an asset",
        detail:
          "Transaction costs are ADDED to the initial carrying amount of a financial asset. The entity has paid more to acquire the same stream of cash flows.",
      },
      {
        step: "Derive the effect on the effective rate",
        detail:
          "Paying more for the same cash flows means a LOWER return, so the effective interest rate FALLS. That is the opposite direction from a liability, where costs raise the rate.",
      },
      {
        step: "Contrast with fair value through profit or loss",
        detail:
          "For an asset at fair value through profit or loss, transaction costs are EXPENSED immediately. So the treatment depends on the classification, which is why classification comes first.",
      },
      {
        step: "Note the symmetry worth holding",
        detail:
          "ASSET: costs added, effective rate falls. LIABILITY: costs deducted, effective rate rises. In both cases the costs worsen the entity's position, and the rate moves accordingly.",
      },
    ],
    answer:
      "**B — added to the initial carrying amount, which reduces the effective interest rate.**\n\nTransaction costs are **added** to the initial carrying amount of a financial **asset**: the entity has paid **more** to acquire the same stream of cash flows. Paying more for the same cash flows means a **lower return**, so the **effective interest rate falls**.\n\nThe **symmetry with liabilities** is what makes this memorable rather than arbitrary:\n\n**Asset** — costs **added**, effective rate **falls**\n**Liability** — costs **deducted**, effective rate **rises**\n\nIn both cases the transaction costs **worsen** the entity's position, and the effective rate moves in whichever direction reflects that. So the two rules are the same idea seen from opposite sides, and remembering one gives the other.\n\nThe treatment depends on the **classification**, which is why classification is settled first: for an asset at **fair value through profit or loss**, transaction costs are **expensed immediately** rather than capitalised — because the asset is about to be remeasured to fair value anyway, so capitalising them would achieve nothing.\n\nAmortised cost is then applied the same way as for a liability: effective rate on the opening carrying amount, less cash received.",
    earns: [
      "Deriving the rate direction from the economics, and holding the asset/liability symmetry",
      "Knowing costs are expensed where the asset is at fair value through profit or loss",
    ],
    loses: ["Deducting the costs, which is the liability rule applied to an asset"],
  },

  "FR-19::ecl": {
    title: "The expected credit loss model",
    format: "ot",
    marks: 2,
    requirement:
      "Under IFRS 9, a loss allowance for expected credit losses is recognised:\n\nA  Only once a default has occurred\nB  From initial recognition, before any credit event, and updated each period\nC  Only where the asset is past due\nD  Only for assets measured at fair value",
    plan: [
      {
        step: "State what the model changed",
        detail:
          "IFRS 9 replaced an INCURRED loss model with an EXPECTED loss model. An allowance is recognised from initial recognition, before any credit event has occurred.",
      },
      {
        step: "Say why the change was made",
        detail:
          "The incurred model recognised losses too late — allowances were built only once a loss event had happened, so losses were understated exactly when conditions were deteriorating.",
      },
      {
        step: "State the three-stage general model",
        detail:
          "Stage 1: 12-month expected losses. Stage 2, where credit risk has increased significantly: LIFETIME expected losses. Stage 3, credit-impaired: lifetime losses, with interest on the NET carrying amount.",
      },
      {
        step: "Note the simplified approach for receivables",
        detail:
          "For trade receivables without a significant financing component, LIFETIME expected losses are recognised from the outset — no stage assessment, usually via a provision matrix.",
      },
    ],
    answer:
      "**B — from initial recognition, before any credit event, and updated each period.**\n\nIFRS 9 replaced an **incurred** loss model with an **expected** loss model, so an allowance exists from **day one** — before anything has gone wrong.\n\nThe reason for the change is the examinable point: the incurred model recognised losses **too late**, building allowances only once a loss event had occurred. That meant losses were **understated exactly when conditions were deteriorating**, which is when the information matters most.\n\nThe **general model** has three stages. **Stage 1**: **12-month** expected credit losses, with interest on the gross carrying amount. **Stage 2**, where credit risk has increased **significantly** since initial recognition: **lifetime** expected losses, interest still on the gross amount. **Stage 3**, credit-impaired: **lifetime** losses, with interest calculated on the **net** carrying amount — which is the stage most often missed.\n\nSo movement from stage 1 to stage 2 is a **significant increase in credit risk**, not a default.\n\nThe **simplified approach** applies to trade receivables without a significant financing component: **lifetime** expected losses from the outset, with **no stage assessment**, usually computed through a **provision matrix** by ageing band.",
    earns: [
      "Explaining why the incurred model was replaced, and the interest basis changing at stage 3",
      "Knowing the simplified approach recognises lifetime losses with no stage assessment",
    ],
    loses: ["Waiting for a default or a past-due status, which is the superseded model"],
  },
}
