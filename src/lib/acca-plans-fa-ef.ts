/*
 * FA Areas E and F — reconciliations, and the correction of errors.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * These two areas share one examinable idea: a difference between two records
 * tells you something exists, and nothing about where it is. Almost every plan
 * here therefore turns on classifying the difference first — is this a timing
 * difference or an error, does it belong in our books or theirs, will the trial
 * balance catch it — because the correcting entry follows automatically once the
 * classification is right, and cannot be reasoned out until it is.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FA_PLANS_EF: ExamPlanMap = {
  /* ── FA-20 · Bank reconciliations ────────────────────────────── */

  "FA-20::why-they-differ": {
    title: "Which side of the reconciliation a difference belongs on",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following requires an adjustment to the **cash book** rather than appearing as a reconciling item?\n\nA  A cheque paid to a supplier that has not yet been presented\nB  A lodgement made on the last day of the month, not yet credited by the bank\nC  Bank charges shown on the bank statement but not yet recorded\nD  An error made by the bank in crediting another customer's receipt to the account",
    plan: [
      {
        step: "Split every difference into two categories first",
        detail:
          "TIMING differences — correctly recorded by us, not yet by the bank — are reconciling items. Items WE have not recorded, or errors WE made, require an adjustment to the cash book.",
      },
      {
        step: "Ask of each item: has our cash book got it right?",
        detail:
          "Unpresented cheques and outstanding lodgements are correctly recorded by us; the bank simply has not processed them yet. Nothing in our books needs changing.",
      },
      {
        step: "Identify what we did not know about",
        detail:
          "Bank charges appear on the statement first, because the bank imposed them. We only learn of them on receiving the statement, so the cash book must be updated.",
      },
      {
        step: "Handle the bank's own error correctly",
        detail:
          "An error made by the BANK is corrected by the bank and appears as a reconciling item until it is. We never adjust our books for someone else's mistake.",
      },
    ],
    answer:
      "**C — bank charges shown on the bank statement but not yet recorded.**\n\nSplit every difference in two. **Timing differences** — items we recorded correctly that the bank has not yet processed — are reconciling items: unpresented cheques and outstanding lodgements. **Items we have not recorded**, or errors we made, require the cash book to be corrected.\n\nBank charges, direct debits, standing orders, interest and dishonoured cheques all appear on the statement first, because the bank initiated them. We learn of them only on receiving the statement, so the cash book is updated.\n\nAn error made by the **bank** is a reconciling item until the bank corrects it — we never adjust our records for someone else's mistake.\n\nThe corrected cash book balance is what appears in the statement of financial position, not the balance per the bank statement.",
    earns: [
      "Classifying every difference as timing or as unrecorded before deciding the treatment",
      "Knowing the corrected cash book balance is the one that is reported",
    ],
    loses: ["Adjusting the cash book for an unpresented cheque, which we already recorded correctly"],
  },

  "FA-20::doing-it": {
    title: "Working from the bank statement back to the cash book",
    format: "ot",
    marks: 2,
    requirement:
      "The bank statement shows a balance of $4,200 in hand. Unpresented cheques total $1,900 and outstanding lodgements total $700. The corrected cash book balance is:\n\nA  $3,000\nB  $5,400\nC  $4,200\nD  $6,800",
    plan: [
      {
        step: "Decide the direction of each adjustment by reasoning, not memory",
        detail:
          "An unpresented cheque has left our cash book but not the bank, so the bank balance is too HIGH by that amount — deduct it. An outstanding lodgement is in our books but not yet at the bank, so the bank is too LOW — add it.",
      },
      {
        step: "Apply both to the statement balance",
        detail:
          "$4,200 − $1,900 unpresented + $700 outstanding = **$3,000**.",
      },
      {
        step: "Sanity-check the size of the movement",
        detail:
          "The larger adjustment is the deduction, so the answer must be below $4,200. Option B, $5,400, reverses both signs and can be struck on that alone.",
      },
      {
        step: "State the direction of the reconciliation you are performing",
        detail:
          "The stem starts from the bank statement, so the signs are as above. Starting from the cash book reverses both, and reading which end you are starting from is what decides the whole question.",
      },
    ],
    answer:
      "**A — $3,000.**\n\nBalance per bank statement $4,200\nLess unpresented cheques ($1,900) — we have recorded them, the bank has not, so the bank balance is too high\nAdd outstanding lodgements $700 — we have recorded them, the bank has not, so the bank balance is too low\n**Corrected cash book balance $3,000**\n\nThe sanity check disposes of option B: the deduction is larger than the addition, so the answer must fall below $4,200. $5,400 reverses both signs.\n\nThe direction matters more than the arithmetic. Starting from the **bank statement** the signs are as above; starting from the **cash book** they reverse. Reading which end the stem starts from is the whole question, and deriving each sign by asking who has recorded what beats memorising a layout.\n\nHere the corrected cash book equals the reconciled figure because no unrecorded items were given; where bank charges or direct debits appear, the cash book is adjusted for those first.",
    earns: [
      "Deriving each sign by asking which record is missing the item",
      "Checking the direction of the reconciliation the stem asks for",
    ],
    loses: ["Reversing both signs by working the reconciliation from the wrong end"],
  },

  /* ── FA-21 · Control accounts and reconciliations ────────────── */

  "FA-21::control-accounts": {
    title: "What belongs in the receivables control account",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would be entered on the **credit** side of the receivables control account?\n\nA  Credit sales\nB  Cash received from customers and discounts allowed\nC  Interest charged to customers on overdue accounts\nD  A dishonoured cheque from a customer",
    plan: [
      {
        step: "Establish which side increases the balance",
        detail:
          "Receivables is an asset with a debit balance. So DEBITS increase what customers owe, and CREDITS reduce it. Classify every item by whether it raises or reduces the debt.",
      },
      {
        step: "Sort the four items by that test",
        detail:
          "Credit sales raise the debt — debit. Interest charged raises it — debit. A dishonoured cheque reinstates a debt previously cleared — debit. Cash received and discounts allowed reduce it — credit.",
      },
      {
        step: "Give the dishonoured cheque extra attention",
        detail:
          "It feels like money coming in, so candidates credit it. But the cheque failed, so the customer owes again — it is a debit, reversing the earlier receipt.",
      },
      {
        step: "Recall the full credit side, since MTQs need it",
        detail:
          "Cash received, discounts allowed, sales returns, irrecoverable debts written off, and contras against the payables ledger.",
      },
    ],
    answer:
      "**B — cash received from customers and discounts allowed.**\n\nReceivables is an asset with a debit balance, so debits increase what customers owe and credits reduce it.\n\n**Debit side:** opening balance, credit sales, dishonoured cheques, interest charged on overdue accounts.\n**Credit side:** cash received, discounts allowed, sales returns, irrecoverable debts written off, contras against the payables ledger.\n\nThe **dishonoured cheque** is the item most often placed wrongly. It feels like money arriving, but the cheque failed — the customer owes again, so it is a debit reversing the earlier receipt.\n\nA **contra** is worth knowing too: where the same party is both customer and supplier, the balances are offset with a credit to receivables and a debit to payables.",
    earns: [
      "Classifying each item by whether it raises or reduces the debt",
      "Treating a dishonoured cheque as a debit",
    ],
    loses: ["Crediting the dishonoured cheque because it involves a receipt"],
  },

  "FA-21::the-reconciliations": {
    title: "Which record a discrepancy has to be corrected in",
    format: "ot",
    marks: 2,
    requirement:
      "The receivables control account balance is $52,000 and the total of the sales ledger balances is $51,400. An invoice for $600 was correctly entered in the sales day book but was not posted to the customer's account. The corrected figure for receivables is:\n\nA  $51,400\nB  $52,000\nC  $52,600\nD  $50,800",
    plan: [
      {
        step: "Work out which record contains the error",
        detail:
          "The day book was correct, so the control account — built from day book totals — is right. The omission is in the individual customer's account, so the SALES LEDGER is wrong.",
      },
      {
        step: "Correct the record that is wrong",
        detail:
          "Add $600 to the ledger total: $51,400 + $600 = $52,000, which now agrees with the control account. The control account needs no adjustment.",
      },
      {
        step: "Read the corrected figure off the agreed position",
        detail:
          "Both records now show **$52,000**, which is the figure reported in the statement of financial position.",
      },
      {
        step: "Know the general rule for these questions",
        detail:
          "Errors in a day book TOTAL affect the control account. Errors in posting to an INDIVIDUAL account affect the ledger listing. Identifying which is the entire task.",
      },
    ],
    answer:
      "**B — $52,000.**\n\nThe day book entry was correct, so the control account — built from day book totals — is right at $52,000. The omission is in the individual customer's account, so the **sales ledger listing** is understated: $51,400 + $600 = $52,000, and the two now agree.\n\nThe general rule settles every question of this type:\n\n**Errors in a day book total** → the control account is wrong and must be corrected\n**Errors in posting to an individual account** → the ledger listing is wrong\n\nThe reconciliation works because the two records are built independently from the same transactions, so disagreement proves an error exists — though not where it is.\n\nThe same structure applies to the **payables** ledger, and separately to the **supplier statement** reconciliation, which compares our record of a supplier with theirs.",
    earns: [
      "Identifying which record contains the error before correcting anything",
      "Knowing the day-book-total versus individual-posting rule",
    ],
    loses: ["Adjusting the control account for an error made only in the individual ledger"],
  },

  /* ── FA-22 · The trial balance and types of error ────────────── */

  "FA-22::the-trial-balance": {
    title: "What a balanced trial balance does and does not prove",
    format: "ot",
    marks: 2,
    requirement:
      "A trial balance balances. This proves that:\n\nA  No errors have been made in the accounting records\nB  Total debits equal total credits, but errors that do not affect the equality may still exist\nC  The financial statements will show a true and fair view\nD  All transactions have been recorded",
    plan: [
      {
        step: "State exactly what the trial balance tests",
        detail:
          "That the sum of debit balances equals the sum of credit balances. That is arithmetic, and it is the entire claim — no more.",
      },
      {
        step: "Name the errors it cannot detect",
        detail:
          "Omission, commission, principle, original entry, compensating errors, and reversal of entries. Each leaves debits equal to credits, so each passes the test undetected.",
      },
      {
        step: "Reject the three overstatements",
        detail:
          "A, C and D all claim more than equality can establish. A balanced trial balance says nothing about completeness, nothing about correct classification, and nothing about a true and fair view.",
      },
      {
        step: "Say what it IS useful for",
        detail:
          "It catches one-sided entries, transpositions in one account, and addition errors — the arithmetic faults. That is genuinely useful, and it is a starting point for preparing the statements rather than a verification of them.",
      },
    ],
    answer:
      "**B — total debits equal total credits, but errors that do not affect the equality may still exist.**\n\nThe trial balance tests one thing: that the sum of debit balances equals the sum of credit balances. It is an **arithmetic** check.\n\nSix classes of error leave that equality intact and pass undetected: **omission** (a transaction left out entirely), **commission** (right type of account, wrong account), **principle** (wrong type of account), **original entry** (wrong amount on both sides), **compensating** (two errors cancelling), and **reversal of entries** (debit and credit transposed).\n\nWhat it does catch is one-sided entries, a transposition in one account only, and addition errors. That is genuinely useful — it is the starting point for preparing the financial statements, and not a verification of them.",
    earns: ["Naming the six undetectable error types rather than asserting the limitation generally"],
    loses: ["Reading a balanced trial balance as evidence the records are correct"],
  },

  "FA-22::types-of-error": {
    title: "Naming the class of error from what went wrong",
    format: "ot",
    marks: 2,
    requirement:
      "The purchase of a motor vehicle for $18,000 was debited to motor expenses. This is an error of:\n\nA  Omission\nB  Commission\nC  Principle\nD  Original entry",
    plan: [
      {
        step: "Establish what should have happened",
        detail:
          "A vehicle is a non-current ASSET, so the debit belongs in a non-current asset account. It was debited to an EXPENSE account instead.",
      },
      {
        step: "Split commission from principle, which is where the marks are",
        detail:
          "COMMISSION: right type of account, wrong account within it — a supplier's invoice posted to the wrong supplier. PRINCIPLE: wrong TYPE of account entirely — an asset posted as an expense.",
      },
      {
        step: "Classify on that distinction",
        detail:
          "Asset posted as expense is a change of category, not a misdirection within a category. So it is an error of principle.",
      },
      {
        step: "State the consequences, since they are examined together",
        detail:
          "Expenses are overstated $18,000 and assets understated $18,000, so profit is understated. And no depreciation will be charged, so the error propagates into every later year until corrected.",
      },
    ],
    answer:
      "**C — principle.**\n\nA vehicle is a non-current **asset**; it was debited to an **expense** account. That is a change of category, which is an error of **principle**.\n\nThe distinction from **commission** is where the marks sit: commission is the right type of account but the wrong one within that type — an invoice posted to the wrong supplier. Principle crosses the category boundary.\n\nThe trial balance still balances, because the debit exists and is the right amount — it is simply in the wrong account.\n\nThe consequences are what make it serious. Expenses are overstated by $18,000 and non-current assets understated by $18,000, so profit is **understated**. And because no asset was recorded, no depreciation will be charged — so the error propagates into every subsequent year until it is found.",
    earns: [
      "Splitting principle from commission on whether the account TYPE changed",
      "Naming the depreciation consequence, which makes the error persist",
    ],
    loses: ["Choosing commission, since both involve posting to the wrong account"],
  },

  "FA-22::locating-a-difference": {
    title: "Using the size of a difference to find its cause",
    format: "ot",
    marks: 2,
    requirement:
      "A trial balance has debits exceeding credits by $180. Which error would produce a difference of exactly this kind?\n\nA  A transaction omitted entirely from the records\nB  A payment of $90 debited to the bank instead of credited\nC  A sale of $180 posted to the wrong customer's account\nD  Two compensating errors of $180 each",
    plan: [
      {
        step: "Identify the two useful arithmetic signatures",
        detail:
          "A difference divisible by 9 suggests a TRANSPOSITION (a figure entered with two digits swapped). A difference that is an EVEN number, half of which is a recognisable amount, suggests a one-sided or reversed entry.",
      },
      {
        step: "Test the reversal option against the figures",
        detail:
          "A $90 payment debited instead of credited removes a $90 credit and adds a $90 debit — a swing of $180, exactly the difference observed. Half the difference is the transaction amount.",
      },
      {
        step: "Eliminate the errors that leave the trial balance balanced",
        detail:
          "An omission, a posting to the wrong customer and two compensating errors all keep debits equal to credits. None of them can produce any difference at all.",
      },
      {
        step: "Note the systematic search order",
        detail:
          "Check the additions, then look for a difference equal to a single balance (omitted), then half the difference (reversed or one-sided), then divisibility by 9 (transposition).",
      },
    ],
    answer:
      "**B — a payment of $90 debited to the bank instead of credited.**\n\nA reversed entry produces a difference of **twice** the transaction: the $90 credit is missing and a $90 debit is added, a swing of $180. So half the difference — $90 — is the amount to look for.\n\nOptions A, C and D all leave the trial balance **balanced** and therefore cannot produce a difference of any size. That is the quickest route through the question: only one option is capable of causing a difference at all.\n\nThe systematic search order is worth holding:\n\n1. Check the additions of the trial balance and the ledger accounts\n2. Look for a balance equal to the difference — an omitted balance\n3. Halve the difference — a reversed or one-sided entry\n4. Test divisibility by 9 — a transposition, since swapping two digits always gives a multiple of 9\n\nWhatever cannot be found is posted to a **suspense account** so the statements can be prepared.",
    earns: [
      "Eliminating every option that cannot cause a difference at all",
      "Knowing half the difference points at a reversed entry and divisibility by 9 at a transposition",
    ],
    loses: ["Choosing an error type the trial balance is structurally incapable of detecting"],
  },

  /* ── FA-23 · Correcting errors and the suspense account ──────── */

  "FA-23::suspense": {
    title: "When a correction goes through suspense and when it does not",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following errors would require an entry in the **suspense** account when corrected?\n\nA  A purchase of $400 completely omitted from the records\nB  Rent of $700 debited to the insurance account\nC  A sale of $250 recorded as $520 in both the sales account and the customer's account\nD  Discounts allowed of $310 debited to the discounts received account",
    plan: [
      {
        step: "State the rule in one line",
        detail:
          "Suspense is used only where the error caused the trial balance NOT to balance. If debits still equalled credits, the correction is a two-sided journal and suspense is not involved.",
      },
      {
        step: "Test each option for whether it unbalanced the trial balance",
        detail:
          "Omission, wrong expense account and a wrong amount posted to both sides all leave debits equal to credits. None of them touches suspense.",
      },
      {
        step: "Identify the option that broke the equality",
        detail:
          "Discounts ALLOWED is an expense and should be debited; discounts RECEIVED is income. Debiting the received account puts the entry in an account that should carry a credit, and the correction is one-sided.",
      },
      {
        step: "Check the correcting entry actually needs suspense",
        detail:
          "Correcting it means crediting discounts received $310 and debiting discounts allowed $310 — but if only one side was ever posted, the balancing figure has been sitting in suspense.",
      },
    ],
    answer:
      "**D — discounts allowed of $310 debited to the discounts received account.**\n\nThe rule is that **suspense is used only where the error caused the trial balance not to balance**. If debits still equalled credits, the correction is a straightforward two-sided journal.\n\nOptions A, B and C all leave the trial balance balanced: an omission leaves out both sides, a rent-to-insurance posting is the wrong expense account but the right amount and side, and a wrong amount posted consistently to both sides keeps the equality. Each is corrected by journal without suspense.\n\nThe discounts error crosses between an expense (allowed) and an income (received), which is where the one-sided entry arises and the difference goes to suspense.\n\nA suspense account is **temporary**. It must be cleared before the financial statements are prepared, because it is not an asset or a liability and cannot appear in them.",
    earns: [
      "Applying the balanced-or-not test rather than judging how serious the error is",
      "Knowing suspense must be cleared before the statements are prepared",
    ],
    loses: ["Sending every error correction through suspense"],
  },

  "FA-23::clearing": {
    title: "Writing the journal that clears a suspense balance",
    format: "ot",
    marks: 2,
    requirement:
      "A suspense account has a credit balance of $1,000. It is found that a payment of $500 for repairs was debited to the bank account instead of being credited, the repairs expense having been correctly debited, and no other error exists. The journal to clear the suspense account is:\n\nA  Debit suspense $500, credit bank $500\nB  Debit suspense $1,000, credit bank $1,000\nC  Debit bank $1,000, credit suspense $1,000\nD  Debit repairs $500, credit suspense $500",
    plan: [
      {
        step: "Write down what was posted and what should have been posted",
        detail:
          "Posted: debit bank $500. Should have been: credit bank $500 (and debit repairs, which the stem implies was done). The bank account is out by $1,000, not $500.",
      },
      {
        step: "Compute the size of the correction",
        detail:
          "Removing the wrong $500 debit and adding the correct $500 credit is a **$1,000** credit to bank. A reversal always needs twice the amount to correct.",
      },
      {
        step: "Check the suspense balance corroborates your figure",
        detail:
          "The trial balance was out by $1,000 with debits too high, so suspense carries a $1,000 credit — which matches the correction you have just computed. If the suspense balance and your correction disagree, one of them is wrong or a second error exists.",
      },
      {
        step: "Confirm the suspense account is left at nil",
        detail:
          "Whatever the correction, the test is that suspense clears to zero. If a journal leaves a balance in suspense, either the error has been misidentified or a second error exists.",
      },
    ],
    answer:
      "**B — debit suspense $1,000, credit bank $1,000.**\n\nA **reversed entry always needs twice the amount to correct**, which is the single point of this question. The bank was debited $500 when it should have been credited $500, so it is overstated by **$1,000**:\n\nRemove the incorrect debit $500\nPost the correct credit $500\n**Total credit to bank $1,000**\n\nThe debit side goes to suspense, clearing it.\n\nOption A corrects only half the error and would leave the bank overstated by $500 and suspense still carrying a balance — which is the diagnostic. **The test of any correcting journal is that suspense finishes at nil.** If it does not, either the error has been misidentified or a second error remains undiscovered.\n\nWrite out what was posted and what should have been posted, on two lines, before drafting the journal. The correction is the difference between them, and reversals are where that difference is twice what it first appears.",
    earns: [
      "Knowing a reversal costs twice the amount to correct",
      "Using \"does suspense clear to nil?\" as the check on the journal",
    ],
    loses: ["Correcting a reversal with a single-value entry, which fixes half the error"],
  },

  "FA-23::effect-on-the-position": {
    title: "The effect of a correction on profit and net assets",
    format: "ot",
    marks: 2,
    requirement:
      "A company capitalised $12,000 of repair costs as part of the cost of a machine. Correcting this error will:\n\nA  Increase profit and increase net assets\nB  Decrease profit and decrease net assets\nC  Decrease profit and increase net assets\nD  Have no effect on profit",
    plan: [
      {
        step: "Describe what the error did",
        detail:
          "Repairs were treated as an asset. So an expense was omitted from profit or loss and an asset was overstated — profit too high, net assets too high.",
      },
      {
        step: "Reverse that to get the correction's effect",
        detail:
          "Correcting it charges the $12,000 as an expense and removes it from the asset. Profit **decreases** and net assets **decrease**.",
      },
      {
        step: "Use the structural check",
        detail:
          "Profit flows into retained earnings and equity equals net assets, so the two effects must move in the same direction. Option C has them opposed and can be struck without any reasoning.",
      },
      {
        step: "Note the depreciation consequence",
        detail:
          "The wrongly capitalised amount will also have been depreciated, so strictly the correction must reverse that depreciation too — which partly offsets the reduction in profit.",
      },
    ],
    answer:
      "**B — decrease profit and decrease net assets.**\n\nThe error treated an expense as an asset, so profit was overstated by $12,000 and non-current assets were overstated by $12,000. Correcting it charges the expense and removes the asset, so both fall.\n\nThe structural check disposes of option C instantly: profit flows into retained earnings and equity equals net assets, so the two effects must move in the **same direction**. Any option showing them opposed is wrong.\n\nOne refinement completes the answer. The wrongly capitalised $12,000 will also have been **depreciated**, so the full correction reverses that depreciation as well — which partly offsets the reduction in profit and means the net effect is $12,000 less the depreciation already charged.",
    earns: [
      "Describing the error's effect first, then reversing it",
      "Remembering the wrongly capitalised amount has also been depreciated",
    ],
    loses: ["Choosing an option where profit and net assets move in opposite directions"],
  },
}
