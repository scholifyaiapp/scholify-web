/*
 * FA Area D, second half — intangibles and amortisation, the four period-end
 * adjustments, receivables and allowances, payables and provisions, and capital
 * structure. The exam-plan layer: what each section is examined by, and how.
 *
 * The accruals and prepayments block is where FA sets its highest-yield OTs,
 * because a candidate can know what an accrual is and still get the direction
 * wrong. So those plans all impose the same discipline: decide whether the
 * adjustment increases or decreases profit BEFORE computing anything, then check
 * the answer against that decision.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FA_PLANS_D2: ExamPlanMap = {
  /* ── FA-15 · Intangible non-current assets ───────────────────── */

  "FA-15::what-they-are": {
    title: "Which intangibles get recognised",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would be recognised as an intangible asset?\n\nA  Internally generated goodwill\nB  A brand name purchased from another company for $2m\nC  The value of a highly regarded internal training programme\nD  Expenditure on advertising to build brand awareness",
    plan: [
      {
        step: "State the recognition tests",
        detail:
          "Identifiable — separable or arising from contractual rights — controlled by the entity, expected to generate future economic benefits, and with a cost that can be measured reliably.",
      },
      {
        step: "Apply the purchased-versus-internal split",
        detail:
          "A purchase price supplies reliable measurement. Internally generated goodwill and brands have no reliable cost, so they are never recognised however valuable they plainly are.",
      },
      {
        step: "Reject the two internal items",
        detail:
          "Internally generated goodwill is explicitly prohibited. A training programme fails on control — the staff who benefit can leave — and on reliable measurement.",
      },
      {
        step: "Reject the advertising",
        detail:
          "Advertising is expensed as incurred. The benefit is real but cannot be separated from the business or measured reliably, so no asset arises.",
      },
    ],
    answer:
      "**B — a brand name purchased from another company for $2m.**\n\nRecognition requires the asset to be **identifiable** (separable or arising from contractual rights), **controlled**, expected to generate **future economic benefits**, and to have a **cost measurable reliably**. A purchase price supplies the last of these.\n\n**Internally generated goodwill** is explicitly prohibited — it has no reliable cost, and recognising it would let an entity write up its own value. Purchased goodwill, by contrast, is recognised in a business combination because a price was paid.\n\nThe **training programme** fails on control: the staff who carry the benefit can resign. **Advertising** is expensed as incurred — the benefit is real but inseparable from the business and not reliably measurable.\n\nThis is why the statement of financial position understates many businesses: their most valuable resources cannot be recognised.",
    earns: [
      "Splitting purchased from internally generated on reliable measurement",
      "Contrasting purchased goodwill with internally generated goodwill",
    ],
    loses: ["Recognising something valuable that cannot be measured or controlled"],
  },

  "FA-15::research-development": {
    title: "Deciding whether development expenditure is capitalised",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following must be **expensed** rather than capitalised?\n\nA  Development costs where the project is technically feasible and the entity intends and is able to complete it\nB  Research costs incurred investigating whether a new material has commercial potential\nC  Development costs where the entity can demonstrate a market for the output\nD  Development costs where adequate resources exist to complete the project",
    plan: [
      {
        step: "Separate research from development by certainty",
        detail:
          "RESEARCH is investigation with no certainty of outcome and is always expensed. DEVELOPMENT applies research findings to a plan for a product and is capitalised if every recognition criterion is met.",
      },
      {
        step: "Read the stem for which side it is asking about",
        detail:
          "Which must be expensed. Research is always expensed, so an option describing genuine research answers the question without needing any criteria tested.",
      },
      {
        step: "Recall the development criteria",
        detail:
          "Technical feasibility, intention to complete, ability to use or sell, probable future benefits including a market, adequate resources, and reliable measurement of the expenditure. All must be met.",
      },
      {
        step: "Notice each development option names one criterion",
        detail:
          "A, C and D each state a criterion being satisfied. Since all the criteria must be met, none of them alone settles anything — but each describes capitalisation, not expensing.",
      },
    ],
    answer:
      "**B — research costs incurred investigating whether a new material has commercial potential.**\n\n**Research** is investigation with no certainty of outcome and is **always expensed**, because the future benefit is too uncertain to recognise an asset.\n\n**Development** applies research findings to a plan for a specific product or process, and is **capitalised** only if every criterion is met: technical feasibility, intention to complete, ability to use or sell, probable future economic benefits including the existence of a market, adequate resources to complete, and expenditure measurable reliably.\n\nOptions A, C and D each state one criterion being satisfied. All of them must be met, so no single one is sufficient — but each describes the capitalisation side rather than the expensing side.\n\nOnce capitalised, development costs are amortised over the period the product generates benefits, beginning when commercial production starts.",
    earns: [
      "Splitting research from development on certainty of outcome",
      "Knowing every development criterion must be met, not just one",
    ],
    loses: ["Treating any expenditure on a new product as capitalisable development"],
  },

  "FA-15::amortisation": {
    title: "Amortising an intangible with an indefinite life",
    format: "ot",
    marks: 2,
    requirement:
      "An intangible asset is assessed as having an indefinite useful life. It should be:\n\nA  Amortised over a maximum of ten years\nB  Not amortised, but tested for impairment annually\nC  Written off in full immediately\nD  Amortised over twenty years",
    plan: [
      {
        step: "Understand what indefinite means here",
        detail:
          "Not infinite — it means there is no foreseeable limit to the period over which the asset will generate benefits. So no sensible amortisation period can be determined.",
      },
      {
        step: "Derive the treatment from that",
        detail:
          "If no period can be determined, no amortisation charge can be calculated. So the asset is not amortised — but it cannot simply go unexamined.",
      },
      {
        step: "Supply what replaces amortisation",
        detail:
          "An **annual impairment test**, comparing carrying amount with recoverable amount. That is the control that stops an unamortised asset sitting on the statement of financial position unchallenged.",
      },
      {
        step: "Reject the arbitrary periods",
        detail:
          "Ten and twenty years are arbitrary limits, and inventing a period contradicts the assessment that no limit is foreseeable. Writing it off immediately would deny an asset that genuinely exists.",
      },
    ],
    answer:
      "**B — not amortised, but tested for impairment annually.**\n\n**Indefinite** does not mean infinite — it means no foreseeable limit to the period over which the asset will generate benefits, so no amortisation period can be determined. If no period can be determined, no charge can be calculated.\n\nThe **annual impairment test** is what replaces amortisation: carrying amount compared with recoverable amount, with any shortfall written off. Without it an unamortised asset would sit unchallenged indefinitely.\n\nGoodwill acquired in a business combination is the leading example.\n\nOptions A and D invent arbitrary periods, which contradicts the assessment that no limit is foreseeable. Assets with a **finite** life are amortised over that life, usually straight line, with the charge beginning when the asset is available for use.",
    earns: [
      "Reading indefinite as \"no foreseeable limit\" rather than \"forever\"",
      "Naming the impairment test as what replaces amortisation",
    ],
    loses: ["Inventing an arbitrary amortisation period, or writing the asset off entirely"],
  },

  /* ── FA-16 · Accruals, prepayments, accrued and deferred income ─ */

  "FA-16::the-four": {
    title: "Identifying which of the four adjustments applies",
    format: "ot",
    marks: 2,
    requirement:
      "A company receives $6,000 in November for services it will provide next February. At the 31 December year end this is:\n\nA  Accrued income, a current asset\nB  Deferred income, a current liability\nC  A prepayment, a current asset\nD  Revenue of the current year",
    plan: [
      {
        step: "Set the four out on two axes before reading the options",
        detail:
          "EXPENSES: accrual — incurred, not yet paid → liability. Prepayment — paid, not yet incurred → asset. INCOME: accrued income — earned, not yet received → asset. Deferred income — received, not yet earned → liability.",
      },
      {
        step: "Establish whether this is income or expense",
        detail:
          "Cash is coming in for services the company will provide, so it is income. That eliminates accrual and prepayment immediately, halving the list.",
      },
      {
        step: "Establish whether it has been earned",
        detail:
          "The service is provided next February, so nothing has been earned by 31 December. Cash received but not yet earned is deferred income.",
      },
      {
        step: "Confirm the classification as a liability",
        detail:
          "The company owes a service, not money — but it is an obligation arising from a past event, so a liability. Money received for nothing yet delivered is not revenue.",
      },
    ],
    answer:
      "**B — deferred income, a current liability.**\n\nThe four adjustments on two axes:\n\n**Accrual** — expense incurred, not yet paid → liability\n**Prepayment** — expense paid, not yet incurred → asset\n**Accrued income** — income earned, not yet received → asset\n**Deferred income** — income received, not yet earned → liability\n\nCash in for a future service is income, which removes half the list. Nothing has been earned by 31 December, so it is **deferred income**.\n\nIt is a liability because the company has an obligation — to provide the service — arising from a past event. Recognising it as revenue would breach accruals and overstate this year's profit by $6,000.\n\nAsking \"income or expense?\" then \"earned or incurred yet?\" resolves every question in this family in two steps.",
    earns: ["Resolving income-or-expense first, then earned-or-not, as two separate steps"],
    loses: ["Confusing deferred income with a prepayment, which is the expense-side equivalent"],
  },

  "FA-16::computing": {
    title: "Computing an accrual from an irregular payment pattern",
    format: "ot",
    marks: 2,
    requirement:
      "A company's year ends 31 December. It pays rent quarterly in arrears of $9,000 per quarter, with payments made on 31 March, 30 June, 30 September and 31 December. Rent increased from $9,000 to $10,500 per quarter with effect from 1 October. The rent expense for the year is:\n\nA  $36,000\nB  $37,500\nC  $38,500\nD  $42,000",
    plan: [
      {
        step: "Work from the expense INCURRED, not the cash paid",
        detail:
          "Accruals requires the charge to be the cost of occupying the property for the twelve months, regardless of when the cash left. Adding up the payments answers a different question.",
      },
      {
        step: "Split the year at the date the rate changed",
        detail:
          "January to September is three quarters at $9,000. October to December is one quarter at $10,500. The change takes effect from 1 October, so exactly one quarter falls at the new rate.",
      },
      {
        step: "Compute each period and total",
        detail:
          "(3 × $9,000) + (1 × $10,500) = $27,000 + $10,500 = **$37,500**.",
      },
      {
        step: "Check whether any accrual or prepayment remains",
        detail:
          "Rent is paid in arrears and the final payment falls on 31 December, so the year is fully paid and no accrual remains. Had the year ended 30 November, one month would be accrued.",
      },
    ],
    answer:
      "**B — $37,500.**\n\nCharge the expense **incurred**, split at the date the rate changed:\n\nJanuary–September: 3 quarters × $9,000 = $27,000\nOctober–December: 1 quarter × $10,500 = $10,500\n**Total rent expense $37,500**\n\nOption A, $36,000, is four quarters at the old rate — ignoring the increase. Option D annualises the new rate across the whole year.\n\nBecause rent is paid **in arrears** and the final payment falls on the year end itself, the year is fully paid and no accrual remains. That is worth checking rather than assuming: had the year ended 30 November, one month at the new rate would be accrued as a liability.\n\nThe general discipline is to compute the expense for the period first and treat the accrual or prepayment as the difference between that and the cash paid.",
    earns: [
      "Charging the expense incurred and treating cash as a separate matter",
      "Checking explicitly whether an accrual remains rather than assuming",
    ],
    loses: ["Totalling the payments made, or applying one rate to the whole year"],
  },

  "FA-16::effects": {
    title: "The effect of an omitted adjustment on profit and net assets",
    format: "ot",
    marks: 2,
    requirement:
      "A company has failed to record an accrual for $4,000 of electricity consumed but not yet invoiced. The effect is that profit and net assets are:\n\nA  Profit overstated $4,000, net assets overstated $4,000\nB  Profit understated $4,000, net assets understated $4,000\nC  Profit overstated $4,000, net assets understated $4,000\nD  Both correctly stated",
    plan: [
      {
        step: "State what the missing entry would have done",
        detail:
          "Debit electricity expense $4,000, credit accruals $4,000. So the omission means an expense is missing and a liability is missing.",
      },
      {
        step: "Take the profit effect from the missing expense",
        detail:
          "An expense not recorded means profit is too high. Profit is **overstated** by $4,000.",
      },
      {
        step: "Take the net assets effect from the missing liability",
        detail:
          "A liability not recorded means net assets are too high. Net assets are **overstated** by $4,000. Both move the same way, which is the pattern for an omitted accrual.",
      },
      {
        step: "Sanity-check against the equation",
        detail:
          "Profit flows into equity, and equity equals net assets. So the two effects must agree in direction — options showing them moving oppositely can be struck on that basis alone.",
      },
    ],
    answer:
      "**A — profit overstated $4,000, net assets overstated $4,000.**\n\nThe missing entry is debit electricity expense, credit accruals. So an **expense** is missing, which overstates profit, and a **liability** is missing, which overstates net assets.\n\nThe structural check disposes of option C without any reasoning about accruals: profit flows into retained earnings, equity equals net assets, so the two effects must move in the **same direction**. Any option showing them opposed is wrong.\n\nThe pattern across all four adjustments:\n\nAccrual omitted → profit and net assets **overstated**\nPrepayment omitted → profit and net assets **understated**\nAccrued income omitted → profit and net assets **understated**\nDeferred income omitted → profit and net assets **overstated**",
    earns: [
      "Writing the missing entry, then reading both effects off it",
      "Using the equation to strike any option where the two effects oppose",
    ],
    loses: ["Getting the direction backwards by reasoning about the adjustment rather than the omission"],
  },

  "FA-16::across-two-years": {
    title: "Following an adjustment into the following year",
    format: "ot",
    marks: 2,
    requirement:
      "At 31 December 20X4 a company had a prepayment of insurance of $2,000. During 20X5 it paid insurance of $9,000, and at 31 December 20X5 the prepayment was $1,500. The insurance expense for 20X5 is:\n\nA  $8,500\nB  $9,000\nC  $9,500\nD  $12,500",
    plan: [
      {
        step: "Set up a T-account rather than trying to reason the signs",
        detail:
          "Opening prepayment is a debit brought down. Cash paid is a debit. Closing prepayment is a debit carried down. The expense is the balancing credit — and the account cannot produce a wrong sign.",
      },
      {
        step: "Enter the three known figures",
        detail:
          "Debits: opening prepayment $2,000 and cash paid $9,000, totalling $11,000. Credit side needs the closing prepayment $1,500 carried down.",
      },
      {
        step: "Take the expense as the balancing figure",
        detail:
          "$11,000 − $1,500 = **$9,500** charged to profit or loss.",
      },
      {
        step: "Sanity-check with the direction of the movement",
        detail:
          "The prepayment fell by $500, so $500 of last year's prepayment has been consumed this year on top of the cash paid. Expense must exceed cash by $500 — $9,500 ✓.",
      },
    ],
    answer:
      "**C — $9,500.**\n\nThe T-account removes any risk of a sign error:\n\nOpening prepayment (debit) $2,000\nCash paid (debit) $9,000\n**Total $11,000**\nLess closing prepayment carried down ($1,500)\n**Expense charged to profit or loss $9,500**\n\nThe sanity check confirms it: the prepayment **fell** by $500, so $500 of last year's prepayment was consumed this year in addition to the cash paid, and the expense must exceed cash by exactly that. Option A, $8,500, is that adjustment made in the wrong direction.\n\nThe general rule is that an opening prepayment becomes part of THIS year's expense, and a closing prepayment is removed from it. The same T-account handles accruals with the balances on the credit side — which is why building the account beats memorising four sign rules.",
    earns: [
      "Building a T-account rather than reasoning the signs from memory",
      "Checking the answer against the direction the balance moved",
    ],
    loses: ["Adjusting in the wrong direction, which is the offered $8,500"],
  },

  /* ── FA-17 · Receivables, irrecoverable debts and allowances ──── */

  "FA-17::credit-control": {
    title: "Why credit is controlled, and how",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is the most effective control against irrecoverable debts arising?\n\nA  Writing off old balances promptly\nB  Assessing a customer's creditworthiness before granting credit, and setting a credit limit\nC  Making an allowance for receivables each year\nD  Producing an aged receivables analysis",
    plan: [
      {
        step: "Read the stem's word: against debts ARISING",
        detail:
          "That means prevention, not detection or accounting. Three options deal with debts that already exist, which cannot prevent anything.",
      },
      {
        step: "Sort the options into prevention, detection and accounting",
        detail:
          "Credit assessment and limits are preventive. An aged analysis is detective. Writing off and making an allowance are accounting responses to a loss that has already occurred.",
      },
      {
        step: "Confirm the preventive option is the only one that stops the loss",
        detail:
          "Refusing or limiting credit to a poor risk prevents the exposure existing. Everything else manages a loss the business has already taken on.",
      },
      {
        step: "Acknowledge the value of the detective control",
        detail:
          "An aged analysis is genuinely useful and identifies problems early — it is the strongest distractor. But identifying a problem is not preventing it, and the stem asked about arising.",
      },
    ],
    answer:
      "**B — assessing a customer's creditworthiness before granting credit, and setting a credit limit.**\n\nThe stem asks about debts **arising**, which is prevention. Credit assessment — references, credit agency reports, published accounts — plus a credit limit is the only option that acts before the exposure exists.\n\nThe others sit downstream. An **aged receivables analysis** is a detective control and the strongest distractor: it identifies overdue balances early and drives the chasing. But identifying a problem is not preventing one.\n\n**Writing off** and **making an allowance** are accounting responses to a loss already suffered — they change how it is reported, not whether it happened.\n\nThe rest of the preventive framework is credit limits, clear terms, prompt invoicing, systematic chasing and withholding further supply once a limit is breached.",
    earns: ["Sorting controls into preventive, detective and accounting before choosing"],
    loses: ["Choosing an accounting treatment as a control against a loss occurring"],
  },

  "FA-17::irrecoverable-debts": {
    title: "Writing off a debt and recovering one already written off",
    format: "ot",
    marks: 2,
    requirement:
      "A debt of $800 written off two years ago is unexpectedly received in cash. The entries are:\n\nA  Debit bank $800, credit receivables $800\nB  Debit bank $800, credit irrecoverable debts expense $800\nC  Debit receivables $800, credit bank $800\nD  Debit irrecoverable debts expense $800, credit bank $800",
    plan: [
      {
        step: "Establish what the receivables account currently shows",
        detail:
          "Nothing. The debt was written off two years ago, so the customer's balance was removed then. There is no receivable to credit, which disposes of option A.",
      },
      {
        step: "Identify the two real effects",
        detail:
          "Cash has increased — debit bank. And a cost previously charged has turned out not to be a cost — so the expense account is credited, reducing this year's charge.",
      },
      {
        step: "Confirm the credit goes to the expense, not to revenue",
        detail:
          "It reverses a previously recognised expense rather than creating income, so it is credited to irrecoverable debts expense. Some entities use a separate \"debts recovered\" account, credited the same way.",
      },
      {
        step: "Note why the earlier write-off is not reversed",
        detail:
          "The write-off was correct on the information then available. Reversing it would restate a prior period for what was a reasonable judgement, so the recovery is recognised when it occurs.",
      },
    ],
    answer:
      "**B — debit bank $800, credit irrecoverable debts expense $800.**\n\nThe receivable no longer exists — it was removed when the debt was written off two years ago — so there is nothing to credit there, which rules out option A immediately.\n\nCash has increased, so debit bank. And a cost previously charged has turned out not to be a cost, so the credit reduces the irrecoverable debts expense. Some entities credit a separate \"debts recovered\" account, which has the same effect on profit.\n\nThe earlier write-off is **not** reversed: it was correct on the information available at the time, and restating a prior period would treat a reasonable judgement as an error. The recovery is recognised in the period it occurs.\n\nThe write-off itself is debit irrecoverable debts expense, credit receivables.",
    earns: [
      "Checking what the receivables account actually contains before crediting it",
      "Knowing the prior write-off stands rather than being reversed",
    ],
    loses: ["Crediting receivables, when the balance was removed at the write-off"],
  },

  "FA-17::allowance": {
    title: "Charging only the MOVEMENT in the allowance",
    format: "ot",
    marks: 2,
    requirement:
      "The allowance for receivables was $3,400 at the start of the year and is to be $4,100 at the end. Irrecoverable debts written off during the year were $2,600. The charge to profit or loss for the year is:\n\nA  $700\nB  $2,600\nC  $3,300\nD  $6,700",
    plan: [
      {
        step: "Separate the two components of the charge",
        detail:
          "The debts actually WRITTEN OFF in the year, plus the MOVEMENT in the allowance. Two distinct items, and both belong in the charge.",
      },
      {
        step: "Charge only the movement in the allowance, never the closing balance",
        detail:
          "$4,100 − $3,400 = **$700 increase**. The allowance is a balance carried forward; only the change passes through profit. Charging the whole $4,100 would double-count last year's allowance.",
      },
      {
        step: "Add the write-offs",
        detail:
          "$2,600 written off + $700 increase in the allowance = **$3,300** charged to profit or loss.",
      },
      {
        step: "Read the distractors as the missing components",
        detail:
          "$700 is the movement alone, $2,600 the write-offs alone, and $6,700 charges the full closing allowance plus write-offs. Each is one component wrong.",
      },
    ],
    answer:
      "**C — $3,300.**\n\nIrrecoverable debts written off $2,600\nIncrease in allowance ($4,100 − $3,400) $700\n**Charge to profit or loss $3,300**\n\nThe critical point is that only the **movement** in the allowance is charged. The allowance is a balance carried forward, so charging the full $4,100 would recognise last year's allowance a second time — which is option D, at $6,700.\n\nA **decrease** in the allowance is credited to profit or loss, reducing the charge and possibly producing a net credit.\n\nThe difference between the two mechanisms is worth holding: a **write-off** removes a specific balance believed to be uncollectable, while an **allowance** is an estimate against receivables in general and does not remove any customer's balance. In the statement of financial position, receivables are presented net of the allowance.",
    earns: [
      "Charging the movement in the allowance, not the closing balance",
      "Knowing a decrease in the allowance is credited to profit or loss",
    ],
    loses: ["Charging the whole closing allowance, which recognises last year's estimate twice"],
  },

  /* ── FA-18 · Payables, provisions and contingencies ──────────── */

  "FA-18::payables": {
    title: "What separates a provision from a payable",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following distinguishes a **provision** from a trade payable?\n\nA  A provision is always larger\nB  A provision is uncertain as to amount or timing, while a trade payable is not\nC  A provision is a non-current liability and a payable is current\nD  A provision is not a liability at all",
    plan: [
      {
        step: "Define both",
        detail:
          "A trade payable is an amount owed for goods or services received, known in amount and due date. A provision is a liability of uncertain timing or amount.",
      },
      {
        step: "Identify uncertainty as the discriminator",
        detail:
          "Both are liabilities and both will require an outflow. What separates them is that a provision's amount or date has to be estimated, which is exactly why it needs recognition criteria at all.",
      },
      {
        step: "Reject the size and the classification claims",
        detail:
          "Size is irrelevant. And a provision may be current or non-current, just as a payable may be — the classification follows the expected settlement date, not the type of liability.",
      },
      {
        step: "Reject the option denying it is a liability",
        detail:
          "A provision IS a liability, recognised in the statement of financial position. What is not recognised is a contingent liability, which is disclosed instead.",
      },
    ],
    answer:
      "**B — a provision is uncertain as to amount or timing, while a trade payable is not.**\n\nA **trade payable** is an amount owed for goods or services received, known in amount and due date. A **provision** is a liability of uncertain timing or amount — and that uncertainty is the reason it needs recognition criteria at all, while a payable simply arises.\n\nSize is irrelevant, and either can be current or non-current depending on the expected settlement date.\n\nOption D confuses a provision with a **contingent liability**. A provision is recognised in the statement of financial position; a contingent liability is a possible obligation, or one whose outflow is not probable, and it is **disclosed** in the notes rather than recognised — or ignored entirely if the possibility is remote.",
    earns: ["Naming uncertainty as the discriminator and keeping provisions distinct from contingencies"],
    loses: ["Classifying provisions as non-current by definition"],
  },

  "FA-18::provisions": {
    title: "Applying the three recognition conditions",
    format: "ot",
    marks: 2,
    requirement:
      "A company is being sued. Its lawyers advise there is a 30% chance the claim will succeed, in which case damages of $500,000 would be payable. The company should:\n\nA  Recognise a provision of $500,000\nB  Recognise a provision of $150,000\nC  Disclose a contingent liability\nD  Make no provision and no disclosure",
    plan: [
      {
        step: "State the three conditions for a provision",
        detail:
          "A present obligation arising from a past event, a PROBABLE outflow of economic benefits, and an amount that can be estimated reliably. All three must be met.",
      },
      {
        step: "Test the probability condition",
        detail:
          "Probable means more likely than not — above 50%. A 30% chance fails it, so no provision may be recognised however large the potential amount.",
      },
      {
        step: "Decide what happens instead",
        detail:
          "Where the outflow is possible but not probable, a **contingent liability** is disclosed in the notes: the nature of the obligation and, where practicable, an estimate of the financial effect.",
      },
      {
        step: "Reject the expected value answer",
        detail:
          "Option B, $150,000, is 30% of $500,000. Expected value is not how a single obligation is measured — the entity will either pay $500,000 or nothing, never $150,000.",
      },
    ],
    answer:
      "**C — disclose a contingent liability.**\n\nA provision requires all three conditions: a **present obligation** from a past event, a **probable** outflow, and a **reliable estimate**. Probable means more likely than not, so 30% fails the second condition and no provision may be recognised.\n\nWhere the outflow is **possible but not probable**, a contingent liability is disclosed: the nature of the obligation and, where practicable, an estimate of the financial effect. Only where the possibility is **remote** is nothing done at all, which is why option D is wrong.\n\nOption B, $150,000, applies expected value. That is not how a single obligation is measured — the company will pay $500,000 or nothing, never $150,000. Expected value belongs to a **population** of similar items, such as a warranty provision over thousands of units.\n\nContingent **assets** are treated asymmetrically: disclosed only when probable, recognised only when virtually certain.",
    earns: [
      "Testing probable as \"more likely than not\" and stopping there",
      "Knowing expected value applies to a population, not to a single obligation",
    ],
    loses: ["Providing for 30% of the claim, which is a figure the company can never pay"],
  },

  "FA-18::measuring-a-provision": {
    title: "Measuring a provision once recognition is established",
    format: "ot",
    marks: 2,
    requirement:
      "A company sells 10,000 units with a warranty. It expects 4% to need a minor repair costing $30 and 1% to need a major repair costing $200. The warranty provision is:\n\nA  $6,000\nB  $20,000\nC  $32,000\nD  $2,300,000",
    plan: [
      {
        step: "Recognise that this IS an expected value case",
        detail:
          "A large population of similar obligations, so the provision is measured at the expected value across the population. This is the opposite of the single lawsuit, and the distinction is what the pair of questions tests.",
      },
      {
        step: "Compute each category separately",
        detail:
          "Minor: 4% × 10,000 = 400 units × $30 = $12,000. Major: 1% × 10,000 = 100 units × $200 = $20,000.",
      },
      {
        step: "Add both categories",
        detail:
          "$12,000 + $20,000 = **$32,000**. Both must be included — option B is the major repairs alone, which is the standard omission.",
      },
      {
        step: "Sanity-check the magnitude",
        detail:
          "95% of units need nothing, so the provision should be a small fraction of what repairing everything would cost. $2,300,000 assumes every unit needs both repairs, which the percentages contradict.",
      },
    ],
    answer:
      "**C — $32,000.**\n\nMinor repairs: 4% × 10,000 = 400 units × $30 = **$12,000**\nMajor repairs: 1% × 10,000 = 100 units × $200 = **$20,000**\n**Provision $32,000**\n\nThis is where **expected value** is the correct measurement basis, and it is the exact opposite of a single lawsuit: with a large population of similar obligations, the expected value is a reliable estimate of the total outflow, even though no individual unit will cost $3.20.\n\nOption B is the major repairs alone — the standard omission. Option A is the minor repairs at half the rate. Option D assumes every unit needs both repairs, which the sanity check kills: 95% of units need nothing.\n\nWhere the outflow is more than a year away, the provision is discounted to present value.",
    earns: [
      "Recognising a population as the case where expected value is correct",
      "Including every category, and sanity-checking the magnitude against the percentages",
    ],
    loses: ["Including only one category, which is the offered $20,000"],
  },

  /* ── FA-19 · Capital structure, shares, dividends ────────────── */

  "FA-19::equity-or-debt": {
    title: "Classifying an instrument as equity or as a liability",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is classified as a **liability** rather than equity?\n\nA  Ordinary shares\nB  Share premium\nC  Redeemable preference shares\nD  Retained earnings",
    plan: [
      {
        step: "Apply the obligation test",
        detail:
          "If the entity has an obligation to deliver cash or another financial asset, the instrument is a liability. If the holder's return depends on the entity's success and nothing must be repaid, it is equity.",
      },
      {
        step: "Test the ordinary share",
        detail:
          "No obligation to repay capital and no obligation to pay a dividend. So equity — the holder bears the risk, which is what equity means.",
      },
      {
        step: "Test the redeemable preference share",
        detail:
          "Redeemable means the entity MUST repay it at a set date. That is an obligation to deliver cash, so it is a liability despite being called a share.",
      },
      {
        step: "Note the presentation consequence",
        detail:
          "Its dividend is presented as a FINANCE COST in profit or loss, not as a distribution. Substance over form, and it is what the question is really testing.",
      },
    ],
    answer:
      "**C — redeemable preference shares.**\n\nThe test is **obligation**: an instrument requiring the entity to deliver cash is a liability, whatever it is called. Redeemable preference shares must be repaid at a set date, so they are a liability — **substance over form**.\n\nThe consequence follows and is examined as often as the classification: their dividend is presented as a **finance cost** in profit or loss, not as a distribution in the statement of changes in equity. So it reduces profit, unlike an ordinary dividend.\n\nOrdinary shares, share premium and retained earnings are all equity: there is no obligation to repay ordinary capital and no obligation to pay a dividend.\n\n**Irredeemable** preference shares are equity, since nothing must ever be repaid — the single word changes the classification and the presentation of the dividend.",
    earns: [
      "Applying the obligation test rather than reading the instrument's name",
      "Knowing the dividend on a liability instrument is a finance cost",
    ],
    loses: ["Classifying anything called a share as equity"],
  },

  "FA-19::bonus-and-rights": {
    title: "Distinguishing a bonus issue from a rights issue",
    format: "ot",
    marks: 2,
    requirement:
      "A company makes a 1 for 4 bonus issue. The effect on the statement of financial position is that:\n\nA  Cash increases and share capital increases\nB  Share capital increases and reserves decrease by the same amount\nC  Share capital increases and total equity increases\nD  There is no effect on any balance",
    plan: [
      {
        step: "Establish whether cash comes in",
        detail:
          "A BONUS issue is free to shareholders — no cash is received. A RIGHTS issue is a sale at a discount to market and does raise cash. That single fact separates the two.",
      },
      {
        step: "Identify where the credit to share capital comes from",
        detail:
          "If no cash arrives, share capital must be increased from a reserve. It is capitalised out of share premium first if available, otherwise from retained earnings.",
      },
      {
        step: "Read the effect on total equity",
        detail:
          "One component of equity rises and another falls by the same amount, so **total equity is unchanged**. Nothing has entered or left the entity.",
      },
      {
        step: "Reject the two overstatements and the understatement",
        detail:
          "A and C assume something arrives from outside. D says nothing changes at all, but the composition of equity has changed even though the total has not.",
      },
    ],
    answer:
      "**B — share capital increases and reserves decrease by the same amount.**\n\nA **bonus** issue is free to shareholders, so no cash is received. Share capital must therefore be credited out of a reserve — share premium first if available, otherwise retained earnings. One component of equity rises, another falls, and **total equity is unchanged**.\n\nNothing of value has been created: each shareholder holds more shares in the same company, so the share price falls proportionately. The purposes are to make the shares more marketable at a lower price and to bring share capital into line with the assets financed by it.\n\nOption D is close but wrong — the **composition** of equity has changed even though the total has not.\n\nA **rights** issue is the contrast: shares offered to existing shareholders at a discount to market, and it does raise cash, increasing both share capital and total equity.",
    earns: [
      "Asking whether cash arrives as the first question",
      "Distinguishing no change in total equity from no change at all",
    ],
    loses: ["Treating a bonus issue as raising finance"],
  },

  "FA-19::dividends-tax-socie": {
    title: "Where a dividend and a tax charge each appear",
    format: "ot",
    marks: 2,
    requirement:
      "A company's income tax charge for the year and its ordinary dividend paid appear, respectively, in:\n\nA  Profit or loss, and profit or loss\nB  Profit or loss, and the statement of changes in equity\nC  The statement of changes in equity, and profit or loss\nD  The statement of changes in equity, and the statement of changes in equity",
    plan: [
      {
        step: "Classify the tax charge",
        detail:
          "Income tax on profits is an EXPENSE of the entity, so it appears in profit or loss, presented as the last line before profit for the year.",
      },
      {
        step: "Classify the ordinary dividend",
        detail:
          "A dividend is a DISTRIBUTION of profit to owners, not a cost of earning it. So it never touches profit or loss and appears in the statement of changes in equity.",
      },
      {
        step: "Combine and check the pairing",
        detail:
          "Tax in profit or loss, dividend in changes in equity — option B. Each half must be right, so the pairing has to be checked rather than either half alone.",
      },
      {
        step: "Note the exception that trips candidates",
        detail:
          "A dividend on REDEEMABLE preference shares is a finance cost in profit or loss, because the instrument is a liability. The ordinary dividend rule does not extend to it.",
      },
    ],
    answer:
      "**B — profit or loss, and the statement of changes in equity.**\n\n**Income tax** on profits is an expense of the entity and appears in profit or loss, as the last line before profit for the year.\n\nAn **ordinary dividend** is a distribution of profit to owners rather than a cost of earning it, so it never appears in profit or loss. It is shown in the **statement of changes in equity** as a deduction from retained earnings, and only when **paid** or declared — a proposed dividend not yet declared is neither recognised nor a liability, because no obligation exists.\n\nThe exception worth holding: a dividend on **redeemable** preference shares is a **finance cost** in profit or loss, because that instrument is a liability rather than equity. The ordinary dividend rule does not extend to it.",
    earns: [
      "Splitting an expense of the entity from a distribution to owners",
      "Knowing the redeemable preference dividend exception",
    ],
    loses: ["Treating a dividend as an expense, which understates profit and misstates equity"],
  },
}
