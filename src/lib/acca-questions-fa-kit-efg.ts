import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fa-kit-builders"

/*
 * FA · Areas E, F and G question kit — chapters 20 to 27.
 *
 * Reconciliations, the trial balance and error correction, then the preparation of
 * the financial statements, the statement of cash flows and incomplete records.
 *
 * Original Scholify content. No ACCA, Kaplan or BPP question is reproduced.
 */

/* ── Chapter 20 · Bank reconciliations ── */

const CH20: AccaQuestion[] = [
  num("FAK-20-01", "FA-20", "E", "medium",
    "A cash book shows $14,300. Bank charges of $260 are unrecorded, unpresented cheques total $2,180 and outstanding lodgements $940. What balance is reported as cash in the statement of financial position, in $?",
    14040, "$", 1,
    "The reported figure is the CORRECTED LEDGER balance: $14,300 − $260 of unrecorded charges = $14,040. Unpresented cheques and outstanding lodgements are timing differences that explain the gap to the bank statement and never adjust the ledger."),

  q("FAK-20-02", "FA-20", "E", "medium",
    "Which of these requires an adjustment to the bank general ledger account?",
    [
      "Cheques issued but not yet presented",
      "A direct debit taken by the bank and not recorded by the business",
      "A lodgement paid in on the last day and not yet credited",
      "An error made by the bank",
    ],
    1,
    "An unrecorded DIRECT DEBIT means the LEDGER is wrong, so it is corrected by journal. Unpresented cheques and uncredited lodgements are pure timing, and a bank error is adjusted on the statement side and notified to the bank."),

  q("FAK-20-03", "FA-20", "E", "medium",
    "A customer's cheque for $940 has been returned unpaid. What entry is required?",
    [
      "Debit bank $940, credit trade receivables $940",
      "Debit trade receivables $940, credit bank $940",
      "Debit irrecoverable debts $940, credit bank $940",
      "No entry — the bank will re-present it",
    ],
    1,
    "The receipt never happened, so it is reversed: debit TRADE RECEIVABLES to reinstate the debt and credit BANK. Writing it off to irrecoverable debts would be premature — the customer still owes the money and may yet pay."),

  num("FAK-20-04", "FA-20", "E", "hard",
    "A bank statement shows an overdraft of $3,100. Unpresented cheques are $5,400 and outstanding lodgements $7,200, with no errors. What is the balance on the bank ledger account, in $ (enter an overdraft as a negative)?",
    -1300, "$", 1,
    "Work with the overdraft as negative: −$3,100 + lodgements $7,200 − unpresented cheques $5,400 = −$1,300, so the ledger is also overdrawn, by $1,300. Check backwards: −1,300 + 5,400 − 7,200 = −3,100."),

  q("FAK-20-05", "FA-20", "E", "easy",
    "What is the purpose of a bank reconciliation?",
    [
      "To make the bank statement agree with the ledger by adjusting whichever is convenient",
      "To correct the ledger for items the bank has processed, and explain the remaining timing differences",
      "To calculate interest payable to the bank",
      "To replace the need for a cash book",
    ],
    1,
    "It CORRECTS the ledger for items the bank has processed and the business has not, and EXPLAINS the rest as timing. Neither record is adjusted for convenience, and a residual that cannot be explained is a finding to investigate."),

  q("FAK-20-06", "FA-20", "E", "hard",
    "A reconciliation leaves $640 unexplained. What is the correct response?",
    [
      "Post $640 to sundry expenses to make it agree",
      "Report and quantify the difference and investigate it",
      "Adjust the bank statement side by $640",
      "Ignore it if it is less than 1% of the balance",
    ],
    1,
    "REPORT AND INVESTIGATE. An unexplained residual is the finding, not an inconvenience — it may be an error or a fraud, which is exactly what the procedure exists to surface. Plugging it defeats the whole control."),

  multi("FAK-20-07", "FA-20", "E", "medium",
    "Which TWO appear in the reconciliation statement rather than as ledger adjustments?",
    [
      "Bank interest charged and not recorded",
      "Cheques issued but not yet presented",
      "A standing order not entered in the cash book",
      "Lodgements banked but not yet credited",
    ],
    [1, 3],
    "UNPRESENTED CHEQUES and UNCREDITED LODGEMENTS were both recorded correctly by the business — the bank has simply not processed them yet, so they are timing items. Unrecorded interest and standing orders mean the ledger is wrong and must be corrected."),

  num("FAK-20-08", "FA-20", "E", "hard",
    "A cash book shows $8,600 before adjustment. Unrecorded items are: charges $180, a direct credit received $1,450, a standing order $320, and a receipt of $1,900 entered as $1,090. What is the corrected ledger balance, in $?",
    10360, "$", 1,
    "$8,600 − $180 − $320 + $1,450 = $9,550, then add the $810 understatement of the receipt ($1,900 − $1,090) = $10,360. A transposition understating a receipt means the bank is understated, so it is ADDED back."),

  q("FAK-20-09", "FA-20", "E", "medium",
    "Which balance is reported as cash in the financial statements?",
    [
      "The bank statement balance",
      "The corrected bank ledger account balance",
      "The uncorrected cash book balance",
      "Whichever is lower",
    ],
    1,
    "The CORRECTED LEDGER balance — as a current asset if it is a debit, or as an overdraft in current liabilities if it is a credit. The statement balance excludes items the business correctly recorded that the bank has not yet processed."),

  q("FAK-20-10", "FA-20", "E", "medium",
    "How is an overdraft treated in a reconciliation?",
    [
      "As a positive figure, since the arithmetic reverses",
      "As a negative balance, applying the same arithmetic throughout",
      "It cannot be reconciled",
      "By reversing the treatment of lodgements and cheques",
    ],
    1,
    "Treat it as a NEGATIVE figure and apply the same arithmetic: statement balance plus lodgements less unpresented cheques. The sign of the answer then tells you whether the ledger is also overdrawn."),
]

/* ── Chapter 21 · Control accounts and the payables reconciliation ── */

const CH21: AccaQuestion[] = [
  q("FAK-21-01", "FA-21", "E", "medium",
    "The purchases day book has been overcast by $840 and the total posted. Which record is wrong?",
    [
      "The individual supplier accounts, each of which must be reduced",
      "The payables control account, which is overstated",
      "Both records equally",
      "Neither — a casting error has no effect on balances",
    ],
    1,
    "Individual supplier accounts are posted from the INDIVIDUAL INVOICES, so a day book total error never reaches them. It is the CONTROL ACCOUNT — posted from the total — that is overstated. Knowing which record an error reaches is the whole skill here."),

  q("FAK-21-02", "FA-21", "E", "medium",
    "Which item appears in the RECEIVABLES control account?",
    [
      "Discounts received",
      "Irrecoverable debts written off",
      "The allowance for receivables",
      "Purchase returns",
    ],
    1,
    "IRRECOVERABLE DEBTS WRITTEN OFF are credited to the receivables control account, removing the debt. Discounts received and purchase returns belong to PAYABLES, and the allowance for receivables sits outside any control account — it is deducted on presentation."),

  q("FAK-21-03", "FA-21", "E", "hard",
    "Why is the allowance for receivables excluded from the receivables control account?",
    [
      "Because it is immaterial",
      "Because it is an estimate rather than a transaction with a customer, and including it would break agreement with the individual accounts",
      "Because it is a liability, not an asset",
      "Because it is charged to equity",
    ],
    1,
    "It is an ESTIMATE made outside the ledger of receivables, not a transaction with any customer. The individual accounts between them owe the FULL amount, so an allowance inside the control account would guarantee a difference on every reconciliation."),

  num("FAK-21-04", "FA-21", "E", "hard",
    "Opening payables were $52,000, closing payables $61,000, payments to suppliers $318,000, purchase returns $9,400 and discounts received $4,100. What were credit purchases, in $?",
    340500, "$", 1,
    "Credit purchases = closing $61,000 + payments $318,000 + returns $9,400 + discounts $4,100 − opening $52,000 = $340,500. Prove it: 52,000 + 340,500 − 318,000 − 9,400 − 4,100 = 61,000."),

  q("FAK-21-05", "FA-21", "E", "medium",
    "A payment sent before the year end has not been recorded by the supplier. How is it treated in the supplier statement reconciliation?",
    [
      "Adjust the business's own ledger",
      "Show it as a timing difference in the reconciliation statement",
      "Write it off as a discount received",
      "Record the invoice again",
    ],
    1,
    "It is a TIMING difference: the business recorded it correctly and the supplier has not processed it yet. The reconciliation explains the gap; no adjustment is made to the business's records."),

  q("FAK-21-06", "FA-21", "E", "medium",
    "What is the difference between a control account and the memorandum ledger?",
    [
      "The memorandum ledger is part of the double entry; the control account is not",
      "The control account holds the total and is part of the double entry; the memorandum ledger holds individual accounts outside it",
      "They are two names for the same record",
      "The control account holds only credit balances",
    ],
    1,
    "The CONTROL ACCOUNT holds the total and sits INSIDE the double entry, which is why its balance is the reported figure. The memorandum ledger holds one account per customer or supplier and is outside the double entry — it is the check, not the record."),

  q("FAK-21-07", "FA-21", "E", "hard",
    "A supplier's statement shows an invoice the business disputes. How is it dealt with?",
    [
      "Record the invoice so the statement agrees",
      "Identify it in the reconciliation as a disputed item, without recording it",
      "Deduct it from the supplier's next payment with no entry",
      "Record half of it as a provision",
    ],
    1,
    "IDENTIFY IT AS A DISPUTE in the reconciliation. It is not recorded until accepted — recording a disputed invoice to force agreement would overstate both purchases and payables on the strength of the supplier's assertion."),

  q("FAK-21-08", "FA-21", "E", "medium",
    "Which figure is reported as trade payables in the statement of financial position?",
    [
      "The total of the individual supplier accounts",
      "The corrected payables control account balance",
      "The total of the supplier statements",
      "The purchases day book total for the year",
    ],
    1,
    "The corrected CONTROL ACCOUNT balance, because that is the account inside the double entry. The list of individual balances is the check on it and the supplier statements are external evidence — neither is the reported figure."),

  num("FAK-21-09", "FA-21", "E", "medium",
    "A contra of $7,300 is agreed with a party who is both a customer and a supplier. By how much do total assets fall, in $?",
    7300, "$", 1,
    "Receivables (an asset) fall by $7,300 and payables (a liability) fall by the same amount, so total assets fall by $7,300 and total liabilities by $7,300. NET assets, and therefore profit, are unchanged — no income or expense arises."),

  q("FAK-21-10", "FA-21", "E", "hard",
    "A credit note was entered in the supplier's individual account but omitted from the purchases returns day book total. Which record needs correcting?",
    [
      "The individual supplier account, which is understated",
      "The payables control account, which is overstated",
      "Both records",
      "Neither — the two errors cancel",
    ],
    1,
    "The individual account already reflects the credit note. The CONTROL ACCOUNT, posted from the day book total, missed it — so payables are OVERSTATED there. Day book errors reach the control account; individual posting errors reach the list."),
]

/* ── Chapter 22 · The trial balance and types of error ── */

const CH22: AccaQuestion[] = [
  q("FAK-22-01", "FA-22", "F", "easy",
    "In a trial balance, which of these is a CREDIT balance?",
    ["Prepayments", "Drawings", "Accumulated depreciation", "Sales returns"],
    2,
    "ACCUMULATED DEPRECIATION is a credit balance, even though it relates to an asset — it is deducted from cost when presented. Prepayments are an asset, drawings reduce capital and are debited, and sales returns reduce income and are debited."),

  q("FAK-22-02", "FA-22", "F", "medium",
    "A payment of $920 for vehicle insurance was debited to the motor vehicles account and credited to bank. What type of error is this?",
    [
      "Error of commission; the trial balance still agrees",
      "Error of principle; the trial balance still agrees",
      "Error of principle; the trial balance does not agree",
      "A one-sided entry; the trial balance does not agree",
    ],
    1,
    "An expense debited to an ASSET account is a wrong TYPE of account — an error of PRINCIPLE. Both a debit and a credit of $920 were posted, so the trial balance still agrees, which is why this class of error is dangerous. Commission would be a wrong account of the SAME type."),

  q("FAK-22-03", "FA-22", "F", "medium",
    "Which error would be revealed by extracting a trial balance?",
    [
      "A purchase invoice omitted entirely",
      "Rent debited to the insurance account",
      "A $340 payment debited to the expense account but not credited to bank",
      "A $270 receipt recorded as $720 on both sides",
    ],
    2,
    "Only the ONE-SIDED entry leaves debits and credits unequal. Omission, commission and an error of original entry all keep the two columns equal — and that is the single question to ask of any error."),

  q("FAK-22-04", "FA-22", "F", "hard",
    "A trial balance is out by exactly $1,480, and a $740 balance is known to exist. What does this suggest?",
    [
      "A $1,480 transaction has been omitted entirely",
      "The $740 balance has been entered on the wrong side or in the wrong column",
      "Two compensating errors of $740",
      "A casting error of $1,480 in one ledger account",
    ],
    1,
    "A difference of exactly TWICE a known figure is the signature of a wrong-side or wrong-column entry: the balance is missing from where it should be and present where it should not, so the gap is double. An omission would leave the columns equal."),

  q("FAK-22-05", "FA-22", "F", "medium",
    "What are the limitations of a trial balance?",
    [
      "It cannot be prepared from a computerised system",
      "It is only an arithmetic check on the double entry, and six classes of error leave it in agreement",
      "It cannot include income and expense balances",
      "It only detects errors of principle",
    ],
    1,
    "It is an ARITHMETIC check that debits equal credits, and nothing more. Omission, commission, principle, original entry, reversal and compensating errors all leave it agreeing — including errors that badly misstate profit and assets."),

  q("FAK-22-06", "FA-22", "F", "medium",
    "Rent of $600 was debited to the insurance account. What type of error is this?",
    ["Error of principle", "Error of commission", "Error of original entry", "Reversal of entries"],
    1,
    "An error of COMMISSION — the right amount on the right side, but in the wrong account of the SAME type (one expense instead of another). It would be an error of PRINCIPLE if the wrong account were of a different type, such as an asset."),

  q("FAK-22-07", "FA-22", "F", "hard",
    "Purchases were overstated by $500 and rent understated by $500. What type of error is this and is the trial balance affected?",
    [
      "Compensating errors; the trial balance still agrees",
      "Error of original entry; the trial balance does not agree",
      "Reversal of entries; the trial balance does not agree",
      "Error of omission; the trial balance still agrees",
    ],
    0,
    "Two unrelated errors of equal amount on opposite sides are COMPENSATING errors, and they cancel out in the trial balance so it agrees. Both accounts are wrong, and only a review of the individual accounts will find them."),

  multi("FAK-22-08", "FA-22", "F", "medium",
    "Which TWO errors would cause a trial balance NOT to agree?",
    [
      "A transaction omitted from the records entirely",
      "A balance omitted from the trial balance",
      "Entries posted to the same side twice",
      "The correct amount posted to the wrong account of the same type",
    ],
    [1, 2],
    "An OMITTED BALANCE leaves one column short, and a SAME-SIDE double posting leaves one column over by twice the amount. A wholly omitted transaction and an error of commission both keep debits equal to credits."),

  q("FAK-22-09", "FA-22", "F", "easy",
    "What is the purpose of a trial balance?",
    [
      "To prove that the accounting records contain no errors",
      "To check that debits equal credits and to provide the raw material for the financial statements",
      "To record transactions as they occur",
      "To reconcile the bank account",
    ],
    1,
    "To check the ARITHMETIC of the double entry and to provide the balances from which the statements are prepared. It cannot prove the records are free of errors — six classes of error survive it untouched."),

  q("FAK-22-10", "FA-22", "F", "hard",
    "A $270 receipt was recorded as $720 in both the bank and the receivables account. What type of error is this?",
    ["Error of commission", "Error of original entry", "One-sided entry", "Compensating errors"],
    1,
    "An error of ORIGINAL ENTRY — the wrong amount entered on BOTH sides. Because both sides carry the same wrong figure the trial balance still agrees, and correcting it means reversing $450 on both sides."),
]

/* ── Chapter 23 · Correcting errors and the suspense account ── */

const CH23: AccaQuestion[] = [
  q("FAK-23-01", "FA-23", "F", "hard",
    "A $560 cash receipt from a customer was debited to trade receivables and credited to bank. What journal corrects it?",
    [
      "Debit bank $560, credit trade receivables $560",
      "Debit bank $1,120, credit trade receivables $1,120",
      "Debit suspense $1,120, credit trade receivables $1,120",
      "Debit bank $560, credit suspense $560",
    ],
    1,
    "The entries were REVERSED, so the correction is DOUBLE: $560 to cancel the wrong entries and $560 to make the right ones. Suspense is not involved, because both a debit and a credit were originally posted and the trial balance never went out."),

  q("FAK-23-02", "FA-23", "F", "medium",
    "Which error is corrected through the suspense account?",
    [
      "A purchase invoice omitted entirely",
      "A payment debited to the correct expense with no credit posted",
      "Rent debited to the insurance account",
      "Capital expenditure charged to repairs",
    ],
    1,
    "Only the ONE-SIDED entry, which made debits differ from credits. Omission, commission and principle all have a proper debit and credit of their own, so there was no imbalance for suspense to hold."),

  q("FAK-23-03", "FA-23", "F", "medium",
    "What is the only acceptable closing balance on a suspense account?",
    ["The trial balance difference", "Nil", "Whatever remains unexplained", "The total of all corrections"],
    1,
    "NIL. A residual balance means a one-sided error has not yet been found, and in an exam question saying so IS the answer. A suspense balance must never appear in finalised financial statements."),

  num("FAK-23-04", "FA-23", "F", "hard",
    "Draft profit is $186,000. Corrections: $9,200 of plant installation was charged to repairs; closing inventory was overstated by $2,800; an accrual of $3,400 was omitted. What is the revised profit, in $?",
    189000, "$", 1,
    "$186,000 + $9,200 (expenses reduced by capitalising) − $2,800 (cost of sales rises) − $3,400 (missing expense) = $189,000. Ask of each correction which two accounts it touches, and whether either is an income or expense account."),

  q("FAK-23-05", "FA-23", "F", "medium",
    "Which correction has NO effect on profit?",
    [
      "Capitalising $4,000 of plant wrongly charged to repairs",
      "Correcting a $700 payment posted to receivables instead of payables",
      "Recording an omitted accrual of $1,500",
      "Writing off an irrecoverable debt of $900 not previously recorded",
    ],
    1,
    "A payment posted to receivables instead of payables moves an amount between an ASSET and a LIABILITY, so profit is untouched. Each of the other three moves an expense: capitalising reduces one, an accrual adds one and a write-off adds one."),

  q("FAK-23-06", "FA-23", "F", "medium",
    "What is the purpose of a suspense account?",
    [
      "To hold amounts whose accounting treatment is uncertain indefinitely",
      "To hold the difference on an unbalanced trial balance temporarily, so draft statements can be prepared",
      "To record all corrections of error",
      "To accumulate immaterial differences",
    ],
    1,
    "It TEMPORARILY holds the trial balance difference so that draft statements can be prepared while the error is found. It is not a real asset or liability and it must be cleared to nil before the statements are finalised."),

  num("FAK-23-07", "FA-23", "F", "hard",
    "A trial balance shows debits exceeding credits by $2,100, posted to suspense. Two one-sided errors are then found: a $1,300 payment debited with no credit posted, and discounts received of $450 credited to income but not debited to payables. What suspense balance remains, in $?",
    1250, "$", 1,
    "Suspense opens with a $2,100 CREDIT balance to make the trial balance agree. Completing the missing credit of $1,300 debits suspense, leaving $800 credit. Debiting payables $450 credits suspense, taking it to $1,250 credit. The residual means at least one further one-sided error is still undiscovered — which is the answer the question wants."),

  multi("FAK-23-08", "FA-23", "F", "medium",
    "Which TWO statements about correcting errors are correct?",
    [
      "A reversal of entries is corrected using double the original amount",
      "Every correction passes through the suspense account",
      "A two-sided error is corrected with its own debit and credit, without suspense",
      "Corrections never affect profit",
    ],
    [0, 2],
    "A REVERSAL needs DOUBLE the amount, and a TWO-SIDED error is corrected with its own debit and credit and never touches suspense. Only one-sided errors clear suspense, and corrections touching an income or expense account do change profit."),

  q("FAK-23-09", "FA-23", "F", "medium",
    "How is a suspense account presented in finalised financial statements?",
    [
      "As a current asset if it is a debit balance",
      "It is never presented — it must have been cleared to nil",
      "As a current liability if it is a credit balance",
      "Within equity as an unexplained reserve",
    ],
    1,
    "It is NEVER presented. A suspense balance is a temporary holding figure, and its presence in finalised statements would mean an unexplained error remains. Clearing it to nil is a precondition of finalising the accounts."),

  q("FAK-23-10", "FA-23", "F", "hard",
    "The sales day book was undercast by $700 and the total posted. How is this corrected?",
    [
      "Debit each individual customer account with its share",
      "Debit the receivables control account $700 and credit suspense $700",
      "Debit the receivables control account $700 and credit revenue $700",
      "No correction is needed",
    ],
    2,
    "The undercast total was posted to BOTH the receivables control account and revenue, so both are understated by $700 and the trial balance still agreed — a two-sided error, corrected without suspense. Individual customer accounts came from the invoices and are unaffected."),
]

/* ── Chapter 24 · Preparing the financial statements ── */

const CH24: AccaQuestion[] = [
  q("FAK-24-01", "FA-24", "G", "easy",
    "Which item is presented BELOW operating profit?",
    ["Carriage outwards", "Loan note interest", "Depreciation of office equipment", "An increase in the allowance for receivables"],
    1,
    "LOAN NOTE INTEREST is a finance cost, presented below operating profit to reach profit before tax. Carriage outwards is a distribution cost, and depreciation and the allowance movement are operating expenses — all three sit above operating profit."),

  num("FAK-24-02", "FA-24", "G", "medium",
    "Revenue is $760,000, cost of sales $494,000, distribution costs $88,000, administrative expenses $121,000 and finance costs $18,000. What is operating profit, in $?",
    57000, "$", 1,
    "Gross profit = $760,000 − $494,000 = $266,000. Operating profit = $266,000 − $88,000 − $121,000 = $57,000. Finance costs sit BELOW operating profit, so profit before tax is $39,000 — including them in operating expenses is the standard error."),

  num("FAK-24-03", "FA-24", "G", "medium",
    "Opening retained earnings were $214,000, profit for the year $96,000, dividends paid $34,000, and a property was revalued upward by $60,000. What are closing retained earnings, in $?",
    276000, "$", 1,
    "$214,000 + $96,000 − $34,000 = $276,000. The $60,000 revaluation goes to the REVALUATION SURPLUS as other comprehensive income, not to retained earnings — including it would overstate distributable reserves by an unrealised gain."),

  q("FAK-24-04", "FA-24", "G", "medium",
    "Land and buildings cost $900,000, of which land is $350,000. Buildings are depreciated at 2.5% on cost. What is the annual depreciation charge?",
    ["$22,500", "$13,750", "$8,750", "Nil"],
    1,
    "Only the BUILDINGS depreciate: $550,000 × 2.5% = $13,750. Land has no limited useful life so it is not depreciated. Applying the rate to the combined $900,000 gives $22,500 and overstates the charge by $8,750."),

  q("FAK-24-05", "FA-24", "G", "hard",
    "A statement of financial position does not balance. Which is the LEAST likely cause?",
    [
      "An adjustment posted to profit or loss but not to the position statement",
      "Profit for the year not carried into retained earnings",
      "A balance placed on the wrong side",
      "The depreciation rate used being commercially inappropriate",
    ],
    3,
    "An inappropriate RATE gives the wrong figure but still balances, because the entry has two equal sides. The other three are the standard causes — an adjustment posted once, a wrong-side balance, or profit not carried down."),

  q("FAK-24-06", "FA-24", "G", "medium",
    "Which of these never appears in profit or loss?",
    ["An irrecoverable debt written off", "A dividend paid to ordinary shareholders", "A loss on disposal of a machine", "An increase in a warranty provision"],
    1,
    "A DIVIDEND to ordinary shareholders is a distribution to owners, shown in the statement of changes in equity. Irrecoverable debts, disposal losses and provision increases are all expenses in profit or loss."),

  num("FAK-24-07", "FA-24", "G", "hard",
    "Trade receivables are $148,000 before adjustment, including a $5,000 debt to be written off. The allowance is to be 3% of the remainder. What figure appears in current assets, in $?",
    138710, "$", 1,
    "Write off $5,000, leaving $143,000. Allowance = $143,000 × 3% = $4,290. Reported figure = $143,000 − $4,290 = $138,710. The percentage is applied AFTER the specific write-off, so the same debt is not provided for twice."),

  q("FAK-24-08", "FA-24", "G", "medium",
    "Why must every year-end adjustment be posted to both statements?",
    [
      "Because standards require duplicate disclosure",
      "Because each adjustment has an effect on performance and on position — an accrual is an expense and a liability",
      "Because the trial balance would otherwise not agree",
      "Because the auditor tests both statements",
    ],
    1,
    "Each adjustment affects PERFORMANCE and POSITION: closing inventory reduces cost of sales and is an asset; depreciation is an expense and increases accumulated depreciation. Asking \"where is the other half?\" is the most effective discipline in a preparation question."),

  multi("FAK-24-09", "FA-24", "G", "medium",
    "Which TWO are presented within current liabilities?",
    [
      "The portion of a five-year loan repayable within twelve months",
      "The revaluation surplus",
      "Income tax payable on the year's profit",
      "Prepayments",
    ],
    [0, 2],
    "The loan instalment DUE WITHIN TWELVE MONTHS and INCOME TAX PAYABLE are both current liabilities. The revaluation surplus is equity and prepayments are a current asset."),

  num("FAK-24-10", "FA-24", "G", "hard",
    "A company has $300,000 of 8% loan notes on which one half-year's interest of $12,000 has been paid and the other is unpaid at the year end. What finance cost is charged for the year, in $?",
    24000, "$", 1,
    "The full year's interest is $300,000 × 8% = $24,000, charged whether or not it has been paid. The unpaid $12,000 is an ACCRUAL in current liabilities — charging only the amount paid would understate finance costs and omit the liability."),
]

/* ── Chapter 25 · Disclosure notes and events after the reporting period ── */

const CH25: AccaQuestion[] = [
  q("FAK-25-01", "FA-25", "G", "medium",
    "After the year end but before authorisation, a customer owing $60,000 at the reporting date goes into liquidation. How is this treated?",
    [
      "Non-adjusting — disclose the event",
      "Adjusting — write the receivable down to its recoverable amount",
      "Ignored, since the liquidation occurred after the year end",
      "Adjusting only if the amount exceeds 5% of profit",
    ],
    1,
    "ADJUSTING. The customer's financial condition existed AT the reporting date and the liquidation confirms the debt was already impaired. The year-end figures are changed. Materiality affects separate disclosure, not whether the adjustment is required."),

  q("FAK-25-02", "FA-25", "G", "medium",
    "A fire destroys a warehouse two months after the year end. How is this treated?",
    [
      "Adjusting — write the asset down at the reporting date",
      "Non-adjusting — disclose the nature of the event and its financial effect if material",
      "Adjusting only if the asset was uninsured",
      "Ignored entirely",
    ],
    1,
    "NON-ADJUSTING. The warehouse existed and was intact at the reporting date, so the condition arose afterwards. The year-end figures stand and a material event is DISCLOSED with an estimate of its effect."),

  q("FAK-25-03", "FA-25", "G", "easy",
    "What period do events after the reporting period cover?",
    [
      "The three months following the reporting date",
      "From the reporting date to the date the statements are authorised for issue",
      "From the reporting date until the annual general meeting",
      "The whole of the following financial year",
    ],
    1,
    "From the REPORTING DATE to the date the statements are AUTHORISED FOR ISSUE. An event after authorisation is out of scope entirely, which is why the exam gives you the authorisation date."),

  q("FAK-25-04", "FA-25", "G", "hard",
    "Which event is ADJUSTING?",
    [
      "A share issue after the year end",
      "The settlement of a court case that was outstanding at the year end",
      "A major acquisition after the year end",
      "A dividend declared after the year end",
    ],
    1,
    "The COURT SETTLEMENT confirms the amount of an obligation that already existed at the reporting date, so it is adjusting. A share issue, an acquisition and a dividend declaration are all new conditions arising afterwards — non-adjusting, and disclosed if material."),

  q("FAK-25-05", "FA-25", "G", "medium",
    "Directors declare a final dividend of $80,000 three weeks after the reporting date. How is it treated?",
    [
      "Recognised as a liability at the reporting date",
      "Disclosed but not recognised, because no obligation existed at the reporting date",
      "Deducted from the year's profit",
      "Recognised as an expense",
    ],
    1,
    "DISCLOSED, NOT RECOGNISED. There was no obligation at the reporting date, so there is no liability at that date — and a dividend is never an expense in any case."),

  q("FAK-25-06", "FA-25", "G", "hard",
    "After the year end management concludes the entity is no longer a going concern. What follows?",
    [
      "A disclosure only, as the condition arose after the year end",
      "The statements are not prepared on a going concern basis, overriding the ordinary adjusting analysis",
      "The statements are prepared on the cash basis",
      "No change, because the year end preceded the decision",
    ],
    1,
    "GOING CONCERN OVERRIDES the ordinary classification. Because the whole basis of measurement is affected rather than one figure, the statements are reprepared on a different basis regardless of when the condition arose."),

  q("FAK-25-07", "FA-25", "G", "medium",
    "What does the non-current assets disclosure note reconcile?",
    [
      "The carrying amount to the market value",
      "Opening to closing cost or valuation, and opening to closing accumulated depreciation",
      "The asset register to the bank statement",
      "Depreciation to the tax allowances claimed",
    ],
    1,
    "It reconciles OPENING TO CLOSING cost or valuation — through additions, revaluations and disposals — and opening to closing accumulated depreciation, giving the carrying amount. It is built directly from the non-current asset register."),

  multi("FAK-25-08", "FA-25", "G", "medium",
    "Which TWO are purposes of the notes to the financial statements?",
    [
      "To state the accounting policies applied",
      "To replace figures that are difficult to measure",
      "To disaggregate a single line on the face of the statements",
      "To provide a forecast of next year's results",
    ],
    [0, 2],
    "Notes state POLICIES and DISAGGREGATE the face of the statements, as well as carrying contingencies and events after the reporting period. A note never SUBSTITUTES for correct recognition, and general-purpose statements contain no forecast."),

  q("FAK-25-09", "FA-25", "G", "hard",
    "Inventory held at the year end is sold after the year end for less than cost. What is the treatment?",
    [
      "Non-adjusting — disclose the sale",
      "Adjusting — write the year-end inventory down to net realisable value",
      "No treatment; the loss belongs to the following year",
      "Adjusting only if the sale was to a related party",
    ],
    1,
    "ADJUSTING. The sale is evidence of the inventory's NET REALISABLE VALUE at the reporting date — the condition that it was worth less than cost already existed. Write the year-end figure down."),

  q("FAK-25-10", "FA-25", "G", "medium",
    "What does the provisions note disclose?",
    [
      "Only the closing balance",
      "Opening balance, amounts provided, amounts used or released, closing balance, and the nature, timing and uncertainties",
      "The names of the parties involved in each claim",
      "The auditor's assessment of each provision",
    ],
    1,
    "The MOVEMENT — opening, provided, used or released, closing — plus the NATURE of the obligation, expected timing and the uncertainties. Naming counterparties is not required, and the auditor's view belongs in the audit report."),
]

/* ── Chapter 26 · Statements of cash flows ── */

const CH26: AccaQuestion[] = [
  q("FAK-26-01", "FA-26", "G", "medium",
    "In which section do dividends PAID and interest PAID appear?",
    [
      "Both in operating activities",
      "Dividends paid in financing; interest paid in operating",
      "Both in financing activities",
      "Dividends paid in operating; interest paid in financing",
    ],
    1,
    "DIVIDENDS PAID are a return to owners — a FINANCING outflow. INTEREST PAID is presented within OPERATING activities, after cash generated from operations. Grouping the two together is the standard error."),

  num("FAK-26-02", "FA-26", "G", "medium",
    "Inventory rose by $15,000, receivables fell by $9,000 and payables rose by $4,000. What is the net effect on cash generated from operations, in $ (enter an outflow as a negative)?",
    -2000, "$", 1,
    "−$15,000 (asset up is cash down) + $9,000 (asset down is cash up) + $4,000 (liability up is cash up) = an OUTFLOW of $2,000. One principle covers every sign: an asset up is cash down, a liability up is cash up."),

  q("FAK-26-03", "FA-26", "G", "hard",
    "Why is a gain on disposal deducted in the operating reconciliation?",
    [
      "Because the gain is not taxable",
      "Because the full disposal proceeds appear as an investing inflow, so leaving the gain in operating would count part of the same cash twice",
      "Because a gain is not a real profit",
      "Because gains are always non-cash",
    ],
    1,
    "The FULL proceeds go to INVESTING activities, so the gain must come out of the operating reconciliation or part of the same cash is counted twice. The same logic means a LOSS on disposal is added back."),

  num("FAK-26-04", "FA-26", "G", "hard",
    "Profit before tax is $180,000. Depreciation was $54,000, a gain on disposal $7,000 and finance costs $16,000. Inventory rose $11,000, receivables rose $6,000 and payables rose $9,000. What is cash generated from operations, in $?",
    235000, "$", 1,
    "$180,000 + $54,000 depreciation − $7,000 gain + $16,000 finance costs = $243,000. Working capital: −$11,000 − $6,000 + $9,000 = −$8,000. Cash generated from operations = $235,000. Interest and tax PAID are deducted after this subtotal."),

  q("FAK-26-05", "FA-26", "G", "medium",
    "Where does a bonus issue appear in the statement of cash flows?",
    ["Financing activities", "Nowhere — no cash moves", "Operating activities", "Investing activities"],
    1,
    "NOWHERE. A bonus issue capitalises a reserve and involves no cash at all, as does a revaluation. The only test for every item is whether cash actually moved."),

  num("FAK-26-06", "FA-26", "G", "hard",
    "Finance costs charged for the year were $34,000. Interest accrued was $4,000 at the start of the year and $7,000 at the end. What was interest PAID, in $?",
    31000, "$", 1,
    "Interest paid = charge $34,000 + opening accrual $4,000 − closing accrual $7,000 = $31,000. Using the charge itself would overstate the outflow by the $3,000 growth in the accrual."),

  q("FAK-26-07", "FA-26", "G", "medium",
    "Which is a benefit of a statement of cash flows to users?",
    [
      "It forecasts the entity's future cash position",
      "Cash is a fact and is far harder to manipulate than profit, which rests on estimates",
      "It shows the profitability of each product line",
      "It removes the need for the other statements",
    ],
    1,
    "Cash is a FACT, so the statement is much harder to manipulate than a profit figure built on estimates. Its drawbacks are that it is historic, contains no forecast, and can be flattered near the year end by delaying payments."),

  num("FAK-26-08", "FA-26", "G", "medium",
    "Net cash from operating activities was $164,000, investing outflows $210,000 and financing inflows $71,000. Cash at the start of the year was $19,000. What is cash at the end of the year, in $?",
    44000, "$", 1,
    "$164,000 − $210,000 + $71,000 = an increase of $25,000, so closing cash is $19,000 + $25,000 = $44,000. The three sections must sum to the actual movement in cash and cash equivalents — that agreement is the statement's own proof."),

  multi("FAK-26-09", "FA-26", "G", "medium",
    "Which TWO are investing cash flows?",
    [
      "Purchase of property, plant and equipment",
      "Repayment of loan notes",
      "Proceeds from the disposal of a machine",
      "Dividends paid to shareholders",
    ],
    [0, 2],
    "Buying non-current assets and receiving DISPOSAL PROCEEDS are both investing flows. Repaying loan notes and paying dividends are FINANCING flows — raising and returning long-term funding."),

  q("FAK-26-10", "FA-26", "G", "hard",
    "A profitable company has run out of cash. Which is the LEAST likely explanation?",
    [
      "Rapid growth in inventory and receivables",
      "Large capital expenditure funded from operations",
      "Repayment of loan principal",
      "A high depreciation charge",
    ],
    3,
    "DEPRECIATION is a NON-CASH charge — it reduces profit without any payment, so a high charge means reported profit understates cash generation rather than the reverse. Working capital growth, capital expenditure and loan repayments all consume cash without a matching expense."),
]

/* ── Chapter 27 · Incomplete records ── */

const CH27: AccaQuestion[] = [
  num("FAK-27-01", "FA-27", "G", "medium",
    "A business achieves a mark-up of 25% on cost. Revenue for the period was $450,000. What was cost of sales, in $?",
    360000, "$", 1,
    "A MARK-UP puts COST at 100 and revenue at 125, so cost of sales = $450,000 × 100/125 = $360,000 and gross profit is $90,000 — which is 25% of cost. Treating 25% as a margin would give $337,500."),

  num("FAK-27-02", "FA-27", "G", "medium",
    "A business achieves a gross margin of 30%. Cost of sales was $280,000. What was revenue, in $?",
    400000, "$", 1,
    "A MARGIN puts REVENUE at 100 and cost at 70, so revenue = $280,000 × 100/70 = $400,000, with gross profit of $120,000 — 30% of revenue. Setting the base to 100 before calculating removes this whole class of error."),

  num("FAK-27-03", "FA-27", "G", "hard",
    "Opening receivables were $54,000 and closing receivables $63,000. Receipts from customers were $486,000, discounts allowed $7,200 and irrecoverable debts written off $2,800. All sales are on credit. What were credit sales, in $?",
    505000, "$", 1,
    "Credit sales = closing $63,000 + receipts $486,000 + discounts $7,200 + write-offs $2,800 − opening $54,000 = $505,000. Prove it: 54,000 + 505,000 − 486,000 − 7,200 − 2,800 = 63,000."),

  num("FAK-27-04", "FA-27", "G", "hard",
    "A fire destroyed inventory. Opening inventory was $46,000, purchases to the date of the fire $312,000 and sales $420,000, at a consistent gross margin of 25%. Inventory salvaged and counted was $14,000. What was the cost of the inventory destroyed, in $?",
    29000, "$", 1,
    "Cost of sales = $420,000 × 75/100 = $315,000. Expected closing inventory = $46,000 + $312,000 − $315,000 = $43,000. Destroyed = $43,000 − $14,000 salvaged = $29,000. Read whether the 25% is a margin or a mark-up — it changes the answer materially."),

  q("FAK-27-05", "FA-27", "G", "medium",
    "The owner takes cash from the till before banking receipts. What must be done before reconstructing sales from the receivables control account?",
    [
      "Nothing — the banked figure is the receipts figure",
      "Add the amounts taken back to the banked figure, because money taken is still money received",
      "Deduct the amounts taken from closing receivables",
      "Treat the amounts taken as irrecoverable debts",
    ],
    1,
    "ADD THEM BACK. Money taken before banking was still received from customers, so total receipts exceed the banked figure. Working with the banked amount alone understates the derived sales figure by exactly the drawings taken."),

  num("FAK-27-06", "FA-27", "G", "medium",
    "Net assets were $148,000 at the start of the year and $203,000 at the end. The owner introduced $20,000 and withdrew $3,000 a month. What was the profit for the year, in $?",
    71000, "$", 1,
    "Profit = closing $203,000 − opening $148,000 − introduced $20,000 + drawings ($3,000 × 12 = $36,000) = $71,000. Prove it forwards: 148,000 + 20,000 + 71,000 − 36,000 = 203,000."),

  q("FAK-27-07", "FA-27", "G", "hard",
    "Which technique derives a missing credit purchases figure?",
    [
      "The accounting equation",
      "Balancing the payables control account",
      "A gross profit percentage",
      "The bank reconciliation",
    ],
    1,
    "Balancing the PAYABLES CONTROL ACCOUNT: closing balance plus payments, returns and discounts received, less the opening balance. Each technique fits a particular missing figure — the equation gives profit, and gross profit percentages give sales, cost of sales or inventory."),

  q("FAK-27-08", "FA-27", "G", "medium",
    "What is the difference between margin and mark-up?",
    [
      "Margin applies to services and mark-up to goods",
      "Margin is gross profit as a percentage of revenue; mark-up is gross profit as a percentage of cost",
      "They are the same, expressed differently",
      "Margin includes overheads and mark-up does not",
    ],
    1,
    "MARGIN's base is REVENUE; MARK-UP's base is COST. Same gross profit, different denominators, and different answers. Writing out the 100/75 or 125/100 column before calculating removes the error."),

  num("FAK-27-09", "FA-27", "G", "hard",
    "Cost of sales was $240,000 at a mark-up of 20%. What was gross profit, in $?",
    48000, "$", 1,
    "A mark-up applies to COST, so gross profit = $240,000 × 20% = $48,000 and revenue is $288,000. Check: $48,000 ÷ $288,000 = 16.7%, which is the MARGIN — a useful demonstration that the two percentages are never equal."),

  multi("FAK-27-10", "FA-27", "G", "medium",
    "Which TWO items are ADDED when deriving credit sales from the receivables control account?",
    [
      "The closing receivables balance",
      "The opening receivables balance",
      "Discounts allowed to customers",
      "Cash sales made in the period",
    ],
    [0, 2],
    "The CLOSING balance and DISCOUNTS ALLOWED are both added, along with receipts, returns and write-offs; the OPENING balance is deducted. Cash sales never entered the receivables account at all, so they play no part in this reconstruction."),
]

/** FA's authored question kit for Areas E, F and G — chapters 20 to 27. */
export const FA_KIT_EFG: AccaQuestion[] = [
  ...CH20,
  ...CH21,
  ...CH22,
  ...CH23,
  ...CH24,
  ...CH25,
  ...CH26,
  ...CH27,
]
