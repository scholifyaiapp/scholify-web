import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Areas E and F — reconciliations, and preparing a trial balance.
 * Chapters 20–23 of the FA reading tree.
 *
 * These four chapters are the paper's control layer: they are how a business finds
 * out that its own records are wrong, and how it corrects them without making the
 * position worse. Two ideas run through all four — that a difference is explained
 * item by item rather than plugged, and that only errors affecting ONE side of the
 * double entry can reach a suspense account.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 20 · E1 ───────────────────────────────────────────── */

export const FA_TREE_20: StudyChapter = {
  id: "FA-20",
  number: 20,
  paper: "FA",
  area: "E",
  title: "Bank reconciliations",
  minutes: 17,
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)", "E1(d)", "E1(e)", "E1(f)"],
  intro:
    "Two records of the same cash, kept by two different organisations, and neither is automatically right. The reconciliation decides which one is wrong about each individual difference.",
  outcomes: [
    "Explain the purpose of a bank reconciliation",
    "Identify the main reasons the bank ledger account and the bank statement differ",
    "Identify and correct errors and omissions in the bank general ledger account",
    "Prepare a reconciliation of the corrected ledger balance to the bank statement balance",
    "Derive a missing bank statement or ledger balance from given information, and identify the balance to report",
  ],
  sections: [
    {
      id: "why-they-differ",
      heading: "Why the two records differ",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The single distinction the whole topic rests on",
          md: "Differences fall into exactly two groups, and they are treated completely differently.\n\n**Group 1 — the ledger is wrong.** Items the bank has processed and the business has not recorded, plus the business's own errors. These are **corrected in the ledger** by journal entry, changing the reported cash figure.\n\n**Group 2 — timing.** Items the business has correctly recorded but the bank has not yet processed. These are **not** corrected; they appear in the reconciliation statement as the explanation of the remaining difference.",
        },
        {
          kind: "table",
          caption: "Which group each difference belongs to",
          head: ["Difference", "Group", "Treatment"],
          rows: [
            ["Bank charges and interest debited by the bank", "Ledger is wrong", "**Correct the ledger** — debit the expense, credit bank"],
            ["Direct debits and standing orders not entered", "Ledger is wrong", "**Correct the ledger**"],
            ["Direct credits received straight into the account", "Ledger is wrong", "**Correct the ledger** — debit bank, credit the income or receivable"],
            ["A dishonoured (returned) customer cheque", "Ledger is wrong", "**Correct the ledger** — reinstate the receivable"],
            ["An arithmetic or posting error in the cash book", "Ledger is wrong", "**Correct the ledger**"],
            ["Unpresented cheques the business has issued", "Timing", "**Reconciliation only** — deduct from the statement balance"],
            ["Outstanding lodgements banked but not yet credited", "Timing", "**Reconciliation only** — add to the statement balance"],
            ["An error made by the BANK", "Bank is wrong", "**Reconciliation only** — adjust the statement side and notify the bank"],
          ],
        },
        {
          kind: "definition",
          term: "Unpresented cheques and outstanding lodgements",
          md: "**Unpresented cheques** are payments the business has correctly recorded but which the payee has not yet banked, so the bank has not taken the money out. **Outstanding lodgements** are receipts the business has correctly recorded and paid in, which the bank has not yet credited. Both are pure timing, and both will clear on their own.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Never plug the difference",
          md: "A reconciliation that ends by writing \"difference\" against an unexplained amount has not reconciled anything. Each item is identified individually — and an amount that cannot be explained is a candidate for a fraud or a serious error, which is exactly what the procedure exists to surface.",
        },
      ],
      check: {
        q: "The bank statement shows charges of $180 that are not in the cash book, and the business has issued cheques of $2,400 not yet presented. How is each dealt with?",
        options: [
          "Both are corrected in the cash book",
          "Both appear in the reconciliation statement only",
          "The $180 is corrected in the cash book; the $2,400 appears in the reconciliation statement",
          "The $2,400 is corrected in the cash book; the $180 appears in the reconciliation statement",
        ],
        correct: 2,
        explain:
          "Bank charges are a genuine cost the business has failed to record, so the LEDGER is wrong and is corrected — debit charges, credit bank. Unpresented cheques were recorded correctly by the business; the bank simply has not processed them yet, so they are pure TIMING and belong in the reconciliation statement alone.",
      },
    },
    {
      id: "doing-it",
      heading: "Preparing the reconciliation",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The method, in the order that keeps it straight",
          items: [
            "Start from the **cash book balance** as it stands.",
            "**Correct the cash book** for everything in group 1 — charges, interest, unrecorded direct debits and credits, dishonoured cheques, and the business's own errors. This gives the **corrected ledger balance**.",
            "Start a **reconciliation statement** from the **bank statement balance**.",
            "**Add** outstanding lodgements and **deduct** unpresented cheques, plus any correction for a bank error.",
            "The reconciliation statement must arrive at the **corrected ledger balance**. That balance — not the statement balance — is the cash figure reported in the financial statements.",
          ],
        },
        {
          kind: "formula",
          name: "The reconciliation",
          expr: "Balance per bank statement + Outstanding lodgements − Unpresented cheques (± bank errors) = Corrected balance per the bank ledger account",
          note: "Signs reverse throughout if the statement shows an overdraft: work with the overdraft as a negative figure and the same arithmetic holds.",
        },
        {
          kind: "example",
          title: "A full reconciliation, with a dishonoured cheque and a transposition",
          scenario:
            "Halden Co's bank ledger account shows a balance of $12,480 at 31 May. The bank statement shows $14,220. Investigation reveals: bank charges of $215 and loan interest of $460 not recorded; a standing order of $340 not recorded; a direct credit from a customer of $1,900 not recorded; a customer's cheque for $780 returned unpaid and not yet reversed; a receipt of $2,300 entered in the cash book as $3,200; cheques totalling $3,655 issued but not presented; and a lodgement of $1,120 paid in on 31 May and not yet credited by the bank.",
          steps: [
            { label: "Correct the cash book — items the bank has processed", detail: "Deduct charges $215, loan interest $460 and the standing order $340; add the direct credit $1,900. Net effect +$885." },
            { label: "Correct the cash book — the dishonoured cheque", detail: "The receipt never happened, so deduct $780 from the bank and reinstate the receivable: debit trade receivables $780, credit bank $780." },
            { label: "Correct the cash book — the transposition", detail: "$3,200 was recorded for a $2,300 receipt, so the bank is overstated by $900. Deduct $900." },
            { label: "Arrive at the corrected ledger balance", detail: "$12,480 + $885 − $780 − $900 = $11,685. This is the figure that will be reported." },
            { label: "Build the reconciliation statement", detail: "Bank statement $14,220 + outstanding lodgement $1,120 − unpresented cheques $3,655 = $11,685." },
            { label: "Confirm the agreement", detail: "The reconciliation reaches exactly the corrected ledger balance of $11,685, so every difference has been accounted for." },
          ],
          result:
            "Cash of $11,685 is reported, and the two records are fully reconciled. Two checks matter here. First, the timing items — the $3,655 and the $1,120 — appear ONLY in the reconciliation statement and never adjust the ledger. Second, if the reconciliation had not landed on $11,685, the correct answer would be to report the unexplained residual and investigate it, not to adjust either side until the figures agreed.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Which balance is reported",
          md: "The **corrected bank ledger balance** goes into the statement of financial position — as a current asset if it is a debit, as an overdraft in current liabilities if it is a credit. The bank statement balance is never the reported figure, because it excludes items the business has correctly recorded and the bank has not yet processed.",
        },
        {
          kind: "example",
          title: "Deriving a missing balance",
          scenario:
            "Kirkbride Co's bank statement at 30 June shows an overdraft of $2,340. Unpresented cheques total $4,180, and outstanding lodgements total $6,050. There are no errors and no unrecorded items. What is the balance on the bank ledger account?",
          steps: [
            { label: "Set the statement balance as a negative", detail: "An overdraft of $2,340 is −$2,340." },
            { label: "Add outstanding lodgements", detail: "−$2,340 + $6,050 = $3,710. The business has recorded these receipts; the bank has not." },
            { label: "Deduct unpresented cheques", detail: "$3,710 − $4,180 = −$470." },
            { label: "Interpret the answer", detail: "A negative ledger balance means the bank ledger account is also overdrawn — by $470." },
            { label: "Check by working back", detail: "−$470 + $4,180 − $6,050 = −$2,340, the statement overdraft. The reconciliation runs both ways, which is the check." },
          ],
          result:
            "The bank ledger account is overdrawn by $470, reported as a $470 bank overdraft in current liabilities. Working the reconciliation backwards is the reliable check on a derived balance — and treating the overdraft as a positive figure would have produced $8,180, a swing of more than $8,600 from one sign.",
        },
      ],
      check: {
        q: "A cash book shows $8,900. Bank charges of $120 are unrecorded, unpresented cheques total $1,450 and outstanding lodgements total $600. What balance appears in the statement of financial position?",
        options: ["$8,900", "$8,780", "$9,630", "$7,930"],
        correct: 1,
        explain:
          "The reported figure is the CORRECTED LEDGER balance: $8,900 less the $120 of unrecorded charges = $8,780. The unpresented cheques and outstanding lodgements are timing differences that explain the gap to the bank statement — they never adjust the ledger, so they do not change the figure reported.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Adjusting the cash book for unpresented cheques or outstanding lodgements.",
      fix: "Those are timing differences the business has already recorded correctly. They belong in the reconciliation statement only.",
    },
    {
      trap: "Reporting the bank statement balance as cash in the statement of financial position.",
      fix: "Report the CORRECTED LEDGER balance. The statement excludes items the bank has not yet processed.",
    },
    {
      trap: "Leaving a dishonoured cheque as a receipt.",
      fix: "The money never arrived: credit bank and debit trade receivables to reinstate the debt.",
    },
    {
      trap: "Treating an overdraft as a positive number in the reconciliation.",
      fix: "Work with it as a negative balance. The arithmetic is unchanged and the sign of the answer tells you which side it falls.",
    },
    {
      trap: "Plugging an unexplained residual to make the reconciliation agree.",
      fix: "Say that it does not reconcile and quantify the difference. An unexplained amount is the finding, not an inconvenience.",
    },
  ],
  keyTerms: [
    { term: "Bank reconciliation", def: "The procedure comparing the bank ledger account with the bank statement, correcting the ledger and explaining the remaining timing differences." },
    { term: "Unpresented cheque", def: "A payment correctly recorded by the business but not yet presented to and processed by the bank." },
    { term: "Outstanding lodgement", def: "A receipt correctly recorded and banked by the business but not yet credited by the bank." },
    { term: "Dishonoured cheque", def: "A customer's cheque returned unpaid, requiring the receipt to be reversed and the receivable reinstated." },
    { term: "Corrected bank ledger balance", def: "The ledger balance after adjusting for items the bank has processed and for the business's own errors; the figure reported as cash." },
  ],
  summary: [
    "Differences split into items the ledger has wrong, which are corrected, and timing items, which are explained.",
    "Charges, interest, unrecorded standing orders and direct credits, dishonoured cheques and own errors all correct the ledger.",
    "Unpresented cheques and outstanding lodgements never touch the ledger.",
    "The reconciliation runs from the statement balance, adding lodgements and deducting unpresented cheques, to the corrected ledger balance.",
    "The corrected ledger balance is the figure reported — as a current asset, or as an overdraft in current liabilities.",
    "An unexplained residual is a finding to report, never an amount to plug.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two groups a bank difference can fall into?", a: "Items the ledger has wrong, which are corrected by journal, and timing items the bank has not yet processed, which are shown in the reconciliation statement." },
    { q: "How is a dishonoured cheque dealt with?", a: "Reverse the receipt — credit bank and debit trade receivables, reinstating the debt, because the money never arrived." },
    { q: "Which balance is reported as cash in the financial statements?", a: "The corrected bank ledger balance, not the bank statement balance." },
    { q: "How does the reconciliation work when the statement shows an overdraft?", a: "Treat the overdraft as a negative figure and apply the same arithmetic; the sign of the result shows whether the ledger is also overdrawn." },
    { q: "What should be done when a reconciliation does not agree?", a: "Report and quantify the unexplained difference and investigate it. It must never be plugged to force agreement." },
  ],
  furtherStudy: [
    "Chapter 21 applies the same logic to the payables ledger and supplier statements.",
    "Chapter 23 handles the errors this reconciliation may reveal.",
  ],
}

/* ── Chapter 21 · E2 ───────────────────────────────────────────── */

export const FA_TREE_21: StudyChapter = {
  id: "FA-21",
  number: 21,
  paper: "FA",
  area: "E",
  title: "Control accounts and the trade payables reconciliation",
  minutes: 17,
  syllabusRefs: ["E2(a)", "E2(b)", "E2(c)", "E2(d)", "E2(e)", "D8(k)"],
  intro:
    "The general ledger holds one total for all suppliers; the payables ledger holds one account for each. Reconciling the two is how a business discovers that its own arithmetic has drifted.",
  outcomes: [
    "Say what the payables control account is for, and where it sits in the double entry",
    "Explain why the control account is reconciled to external documents and to the individual accounts",
    "Prepare a reconciliation of individual supplier accounts to supplier statements",
    "Identify and correct the errors a payables reconciliation highlights",
    "Decide which payables figure is the one that gets reported",
  ],
  sections: [
    {
      id: "control-accounts",
      heading: "What a control account is, and what it controls",
      blocks: [
        {
          kind: "definition",
          term: "Control account",
          md: "A general ledger account holding the **total** of many individual balances — trade receivables or trade payables. It is part of the **double entry**, and its balance is the figure reported in the financial statements.",
        },
        {
          kind: "text",
          md: "Alongside it sits the **memorandum ledger**: one account per customer or supplier, recording the same transactions individually so the business knows who owes what. Because both are built from the same source documents, the total of the memorandum accounts should equal the control account balance — and where it does not, there is an error in one of them.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two records of the same balances",
            caption: "Same transactions, two levels of detail — and one of them is the double entry.",
            data: {
              leftTitle: "Payables control account",
              rightTitle: "Payables (memorandum) ledger",
              rows: [
                { aspect: "Holds", left: "One total for all suppliers", right: "One account per supplier" },
                { aspect: "Part of the double entry?", left: "Yes", right: "No — memorandum only" },
                { aspect: "Built from", left: "Day book TOTALS", right: "INDIVIDUAL invoices and payments" },
                { aspect: "Used for", left: "The reported figure and the trial balance", right: "Knowing who to pay and how much" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The payables control account",
          head: ["Debit the control account", "Credit the control account"],
          rows: [
            ["Payments made to suppliers", "Balance b/d (owed at the start)"],
            ["Purchase returns", "Credit purchases (from the purchases day book total)"],
            ["Discounts received", "Interest or charges levied by a supplier"],
            ["Contras against receivables", ""],
            ["Balance c/d (owed at the end)", ""],
          ],
        },
        {
          kind: "table",
          caption: "The receivables control account, for comparison",
          head: ["Debit the control account", "Credit the control account"],
          rows: [
            ["Balance b/d (owed to us at the start)", "Cash received from customers"],
            ["Credit sales (from the sales day book total)", "Sales returns"],
            ["Dishonoured cheques", "Discounts allowed"],
            ["Interest charged to customers", "Irrecoverable debts written off"],
            ["", "Contras against payables"],
            ["", "Balance c/d"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The allowance for receivables is not in the control account",
          md: "The allowance is an **estimate** made outside the ledger of receivables, not a transaction with a customer. It never enters the receivables control account; it is deducted from the control account balance when the figure is **presented**. Putting it inside the control account destroys the agreement with the individual customer accounts, which between them owe the full amount.",
        },
      ],
      check: {
        q: "Which of these entries appears in the payables control account?",
        options: [
          "The allowance for receivables",
          "Discounts received from suppliers",
          "Depreciation for the year",
          "Irrecoverable debts written off",
        ],
        correct: 1,
        explain:
          "DISCOUNTS RECEIVED reduce what is owed to suppliers, so they are debited to the payables control account. The allowance for receivables sits outside any control account, irrecoverable debts belong to the RECEIVABLES control account, and depreciation has nothing to do with either.",
      },
    },
    {
      id: "the-reconciliations",
      heading: "Two reconciliations: to the ledger, and to the supplier",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Reconciling the control account to the individual accounts",
          items: [
            "Total the balances on all the **individual supplier accounts**.",
            "Compare with the **control account** balance.",
            "Errors in **day book totals**, in posting the totals, or in the control account itself change the **control account**.",
            "Errors in posting an **individual invoice, payment or credit note** change the **individual account**, and the list total.",
            "An error that affects **both** — a transaction omitted entirely — changes both.",
          ],
        },
        {
          kind: "definition",
          term: "Supplier statement reconciliation",
          md: "A comparison of the balance on the business's own account for a supplier with the **statement the supplier has sent**. The two are kept by different organisations from the same trade, so it works exactly like a bank reconciliation: some differences mean the business's record is wrong, and some are pure timing.",
        },
        {
          kind: "table",
          caption: "Why a supplier statement disagrees with your payables ledger",
          head: ["Difference", "Whose record", "Treatment"],
          rows: [
            ["An invoice received and not yet recorded", "**Ours is wrong**", "Record the invoice"],
            ["A credit note the supplier has issued and we have not recorded", "**Ours is wrong**", "Record the credit note"],
            ["An invoice or payment posted to the wrong supplier's account", "**Ours is wrong**", "Correct the individual accounts"],
            ["A payment we have sent that the supplier has not yet received or recorded", "Timing", "Reconciliation only"],
            ["Goods returned that the supplier has not yet credited", "Timing", "Reconciliation only, and chase the credit note"],
            ["An invoice the supplier has raised that we dispute", "Dispute", "Reconciliation only, with the dispute identified"],
            ["An error made by the supplier", "**Theirs**", "Reconciliation only, and notify them"],
          ],
        },
        {
          kind: "example",
          title: "Reconciling a control account, then a supplier statement",
          scenario:
            "At 31 October, Wilbury Co's payables control account shows $86,400, while the total of the individual supplier accounts is $84,950. Investigation finds: the purchases day book was undercast by $900; a credit note for $260 was entered in the supplier's individual account but omitted from the day book total; a payment of $1,340 was posted to the individual account twice; and discounts received of $450 were entered in the control account only. Separately, Wilbury's own account for Denner Ltd shows $7,180, while Denner's statement shows $8,940; an invoice for $1,600 issued by Denner on 29 October has not reached Wilbury, and Wilbury sent a payment of $2,900 on 30 October that Denner has not recorded. Wilbury also disputes a $3,060 charge on the statement.",
          steps: [
            { label: "Control account — the undercast day book", detail: "Purchases were understated by $900, so the control account is understated: add $900, giving $87,300. Individual accounts were posted from the invoices, so they are unaffected." },
            { label: "Control account — the omitted credit note", detail: "The day book total missed a $260 credit note, so the control account is overstated: deduct $260, giving $87,040. The individual account already has it." },
            { label: "Control account — discounts in one place only", detail: "Discounts received of $450 were debited to the control account but not entered in the individual account, so the LIST is overstated: the list becomes $84,950 − $450 = $84,500." },
            { label: "List — the duplicated payment", detail: "A $1,340 payment posted twice to an individual account understates the list: add $1,340, giving $85,840." },
            { label: "Compare the two", detail: "Control account $87,040 against a list of $85,840 — a residual difference of $1,200, which must be investigated before the payables figure is reported." },
            { label: "Supplier statement — Denner", detail: "Record the unrecorded invoice: Wilbury's balance becomes $7,180 + $1,600 = $8,780. Then reconcile: statement $8,940 − payment in transit $2,900 − disputed charge $3,060 = $2,980, which does not agree with $8,780 either, so the dispute and the timing items must both be confirmed with Denner before the account is settled." },
          ],
          result:
            "Neither reconciliation agrees, and both residuals — $1,200 on the control account and the Denner difference — are findings to pursue. That is deliberate: the marks in this topic are for knowing WHICH record each error belongs to, and for saying plainly that an unexplained residual remains. The pattern to internalise is that day book and total-posting errors move the CONTROL ACCOUNT, while individual posting errors move the LIST.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The figure that gets reported",
          md: "Trade payables in the statement of financial position is the **corrected control account balance**, because that is the account inside the double entry. The list of individual balances is the check on it, and the supplier statements are the external evidence — neither is the reported figure.",
        },
      ],
      check: {
        q: "The purchases day book has been overcast by $700. Which record is wrong and how is it corrected?",
        options: [
          "The individual supplier accounts, which must each be reduced",
          "The payables control account, which is overstated by $700",
          "Both records equally",
          "Neither — an overcast day book has no effect on balances",
        ],
        correct: 1,
        explain:
          "The individual accounts are posted from the INDIVIDUAL INVOICES, so a day book total error does not touch them. It is the CONTROL ACCOUNT — posted from the day book total — that is overstated by $700 and must be reduced. Recognising which record a given error reaches is the whole skill in this topic.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Adjusting the individual supplier accounts for a day book casting error.",
      fix: "Individual accounts come from individual invoices. A day book total error affects only the CONTROL account.",
    },
    {
      trap: "Putting the allowance for receivables inside the receivables control account.",
      fix: "The allowance is deducted on presentation. Inside the control account it would break agreement with the individual customer accounts.",
    },
    {
      trap: "Adjusting your own ledger for a payment the supplier has not yet recorded.",
      fix: "That is a timing difference and belongs in the reconciliation statement only.",
    },
    {
      trap: "Reporting the total of individual balances as trade payables.",
      fix: "Report the corrected CONTROL ACCOUNT balance — that is the account inside the double entry.",
    },
    {
      trap: "Recording a disputed supplier invoice to make the statement agree.",
      fix: "A disputed item is disclosed in the reconciliation as a dispute. It is not recorded until it is accepted.",
    },
    {
      trap: "Putting a contra in only one of the two control accounts.",
      fix: "A contra debits the payables control account and credits the receivables control account, by the same amount.",
    },
  ],
  keyTerms: [
    { term: "Control account", def: "A general ledger account holding the total of many individual balances and forming part of the double entry." },
    { term: "Memorandum ledger", def: "The individual customer or supplier accounts, kept outside the double entry as a record of who owes what." },
    { term: "Supplier statement", def: "The supplier's own periodic list of invoices, credit notes and payments on the account, used as external evidence." },
    { term: "Contra", def: "A set-off between a receivable and a payable for the same party, debited to payables and credited to receivables." },
    { term: "Undercast", def: "A total added up to less than the correct figure, understating whatever was posted from it." },
  ],
  summary: [
    "A control account holds the total inside the double entry; the memorandum ledger holds the individual accounts.",
    "Day book and total-posting errors affect the control account; individual posting errors affect the list of balances.",
    "The allowance for receivables never enters the control account — it is deducted on presentation.",
    "A supplier statement reconciliation separates items the business has failed to record from timing and disputes.",
    "Payments in transit, uncredited returns and disputed charges are reconciliation items, not adjustments.",
    "The reported trade payables figure is the corrected control account balance.",
  ],
  knowledgeDiagnostic: [
    { q: "Why should the control account equal the total of the individual accounts?", a: "Both are built from the same source documents — the control account from day book totals and the individual accounts from individual invoices — so a difference means one of them contains an error." },
    { q: "A credit note is omitted from the purchases returns day book but entered in the supplier's account. Which record is wrong?", a: "The control account, which is posted from the day book total and is therefore overstated." },
    { q: "How is a payment in transit at the reporting date handled in a supplier reconciliation?", a: "As a timing difference in the reconciliation statement. The business has recorded it correctly; the supplier has not yet." },
    { q: "Where does the allowance for receivables appear?", a: "As a deduction from the receivables control account balance on presentation, never inside the control account itself." },
    { q: "Which figure is reported as trade payables?", a: "The corrected payables control account balance, since that is the account within the double entry." },
  ],
  furtherStudy: [
    "Chapter 23 corrects the errors these reconciliations expose.",
    "Chapter 27 uses control accounts in reverse to derive missing sales or purchases figures.",
  ],
}

/* ── Chapter 22 · F1, F2(a)–(b) ────────────────────────────────── */

export const FA_TREE_22: StudyChapter = {
  id: "FA-22",
  number: 22,
  paper: "FA",
  area: "F",
  title: "The trial balance and the types of error",
  minutes: 15,
  syllabusRefs: ["F1(a)", "F1(b)", "F1(c)", "F1(d)", "F2(a)", "F2(b)"],
  intro:
    "A trial balance that balances proves one thing only: that debits equal credits. Six kinds of error survive that test untouched, and knowing which six is the whole of this chapter.",
  outcomes: [
    "Describe the purpose of a trial balance and extract general ledger balances into one",
    "Prepare extracts of an opening trial balance",
    "Explain the limitations of a trial balance",
    "Identify the types of error that may occur in accounting systems",
    "Distinguish errors that a trial balance reveals from those it does not",
  ],
  sections: [
    {
      id: "the-trial-balance",
      heading: "What the trial balance is for",
      blocks: [
        {
          kind: "definition",
          term: "Trial balance",
          md: "A list of **every balance** in the general ledger at a date, with debits in one column and credits in the other. Its purposes are to check that the two columns agree, and to provide the raw material from which the financial statements are prepared.",
        },
        {
          kind: "table",
          caption: "Which column each balance falls in",
          head: ["Debit column", "Credit column"],
          rows: [
            ["Assets — non-current assets at cost, inventory, receivables, prepayments, bank (if positive), cash", "Liabilities — payables, accruals, loans, overdraft, tax payable, provisions"],
            ["Expenses — purchases, wages, rent, depreciation, irrecoverable debts", "Capital and reserves — capital, share capital, share premium, retained earnings, revaluation surplus"],
            ["Drawings", "Income — revenue, discounts received, other income"],
            ["Sales returns", "Purchases returns"],
            ["", "Accumulated depreciation, allowance for receivables"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two entries candidates most often place wrongly",
          md: "**Accumulated depreciation** and the **allowance for receivables** are both CREDIT balances, even though they relate to assets. They are deducted from the asset when presented, but in the trial balance they sit in the credit column. Putting either on the debit side throws the trial balance out by twice its amount — a useful diagnostic when a difference is exactly double a familiar figure.",
        },
        {
          kind: "example",
          title: "Extracting an opening trial balance",
          scenario:
            "At 1 January a business has: premises at cost $260,000; accumulated depreciation on premises $52,000; inventory $34,500; trade receivables $61,200; allowance for receivables $2,400; bank overdraft $7,800; trade payables $44,300; accruals $3,100; a bank loan repayable in four years $80,000; share capital $100,000; retained earnings $66,100.",
          steps: [
            { label: "Place the debits", detail: "Premises at cost $260,000, inventory $34,500 and trade receivables $61,200 — total debits $355,700." },
            { label: "Place the credits", detail: "Accumulated depreciation $52,000, allowance for receivables $2,400, overdraft $7,800, trade payables $44,300, accruals $3,100, loan $80,000, share capital $100,000, retained earnings $66,100." },
            { label: "Total the credits", detail: "52,000 + 2,400 + 7,800 + 44,300 + 3,100 + 80,000 + 100,000 + 66,100 = $355,700." },
            { label: "Confirm the agreement", detail: "Debits $355,700 = credits $355,700." },
            { label: "Sanity-check with the equation", detail: "Assets: 260,000 − 52,000 + 34,500 + 61,200 − 2,400 = $301,300. Liabilities: 7,800 + 44,300 + 3,100 + 80,000 = $135,200. Equity: 100,000 + 66,100 = $166,100. And $301,300 − $135,200 = $166,100." },
          ],
          result:
            "A trial balance totalling $355,700 on each side, corroborated by the accounting equation. The check that matters: the four credit-side items that look like assets or reductions of assets — accumulated depreciation, the allowance, the overdraft and accruals — are all credits. Misplacing any one of them breaks the agreement by exactly twice that amount, which is how the error is found.",
        },
      ],
      check: {
        q: "In a trial balance, which of the following is a CREDIT balance?",
        options: ["Prepayments", "Sales returns", "Allowance for receivables", "Drawings"],
        correct: 2,
        explain:
          "The ALLOWANCE FOR RECEIVABLES is a credit balance — it is deducted from receivables when presented but sits on the credit side of the trial balance. Prepayments are an asset, drawings reduce capital and so are debited, and sales returns reduce income and are debited. All three of those are debits.",
      },
    },
    {
      id: "types-of-error",
      heading: "The types of error, and which the trial balance catches",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The organising principle",
          md: "A trial balance detects an error **only if it makes debits differ from credits**. So the question to ask about any error is: **did the double entry stay equal?** If it did, the trial balance still balances and the error is invisible to it — however serious the error is.",
        },
        {
          kind: "table",
          caption: "Errors that do NOT affect the trial balance",
          head: ["Error", "What happened", "Example"],
          rows: [
            ["**Error of omission**", "A transaction left out entirely, so both sides are missing", "A $500 purchase invoice never entered"],
            ["**Error of commission**", "Right amount, right side, wrong account of the SAME type", "Rent debited to the insurance account"],
            ["**Error of principle**", "Right amount, right side, wrong TYPE of account", "A machine purchase debited to repairs"],
            ["**Error of original entry**", "The wrong amount entered on BOTH sides", "A $270 payment recorded as $720 in both accounts"],
            ["**Reversal of entries**", "Debit and credit the correct amount but the wrong way round", "Cash received from a customer debited to receivables and credited to bank"],
            ["**Compensating errors**", "Two unrelated errors of equal amount on opposite sides", "Purchases overstated $300 and rent understated $300"],
          ],
        },
        {
          kind: "table",
          caption: "Errors that DO affect the trial balance",
          head: ["Error", "Why the columns disagree"],
          rows: [
            ["A one-sided entry — only the debit or only the credit posted", "One column short by the amount"],
            ["Different amounts posted to the two sides", "The columns differ by the difference between them"],
            ["An entry posted to the same side twice", "One column exceeds the other by twice the amount"],
            ["A casting error in totalling a ledger account or the trial balance", "The affected column is wrong"],
            ["A balance omitted from the trial balance", "That column is short by the balance"],
            ["A balance entered in the wrong COLUMN of the trial balance", "The columns differ by twice the amount"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why \"it balances\" is such a weak assurance",
          md: "An error of principle — capitalising a repair, or expensing a machine — leaves the trial balance in perfect agreement while misstating profit, assets and every future year's depreciation. So does an error of omission, however large. The trial balance is an **arithmetic** check on the double entry, not a check that the accounting is right, and stating that limitation is regularly worth a mark of its own.",
        },
        {
          kind: "illustration",
          title: "Two errors, one visible and one not",
          md: "**Error A.** A $3,000 payment for a new machine is debited to the repairs account and credited to bank.\n\nDebits equal credits, so the trial balance agrees perfectly. But profit is understated by $3,000, non-current assets are understated by $3,000, and no depreciation will ever be charged on the machine. This is an error of **principle**, and only someone reading the repairs account will find it.\n\n**Error B.** A $300 receipt from a customer is debited to bank and no credit is posted at all.\n\nDebits now exceed credits by $300 and the trial balance does not agree. The difference is visible immediately, and its size points straight at the entry.\n\nError B is trivial and gets found. Error A is serious and does not. That asymmetry is the point of this chapter.",
        },
      ],
      check: {
        q: "A payment of $840 for vehicle insurance was debited to the motor vehicles account and credited to bank. What type of error is this, and does the trial balance still agree?",
        options: [
          "Error of commission; the trial balance still agrees",
          "Error of principle; the trial balance still agrees",
          "Error of principle; the trial balance does not agree",
          "One-sided entry; the trial balance does not agree",
        ],
        correct: 1,
        explain:
          "An expense has been debited to an ASSET account — a wrong TYPE of account, so this is an error of PRINCIPLE. Both a debit and a credit of $840 were posted, so the trial balance still agrees perfectly, which is precisely why this class of error is dangerous. An error of commission would be a wrong account of the same type, such as insurance debited to rent.",
      },
    },
    {
      id: "locating-a-difference",
      heading: "Locating a difference systematically",
      blocks: [
        {
          kind: "text",
          md: "When the two columns disagree, the difference itself carries information. Reading it before starting to search saves most of the work, because the arithmetic of a wrong entry leaves a signature.",
        },
        {
          kind: "list",
          style: "number",
          title: "What the difference tells you, in the order to check it",
          items: [
            "**Is the difference exactly a familiar balance?** Then that balance has probably been **omitted** from the trial balance, or posted on one side only.",
            "**Is it exactly twice a familiar figure?** Then that figure is on the **wrong side** or in the wrong column — it is missing from where it belongs and present where it does not, so the gap is double.",
            "**Is it divisible by 9?** That is the signature of a **transposition** — $540 entered as $450 gives a difference of $90; $1,286 as $1,268 gives $18. Not conclusive, but a fast filter.",
            "**Is it a round figure — 10, 100, 1,000?** Look for a **casting error** in totalling an account or the trial balance itself.",
            "**Does it match a day book total?** Then the total may have been posted to one side only, or posted twice.",
            "**None of these?** Re-add both columns first, then check that each ledger account's balance has been carried to the right column, then work back through the postings from the day books.",
          ],
        },
        {
          kind: "example",
          title: "Reading three differences",
          scenario:
            "Three trial balances fail to agree. In the first, debits exceed credits by $4,600, and the allowance for receivables is $2,300. In the second, credits exceed debits by $270, and a receipt of $1,530 was recorded in the cash book. In the third, debits exceed credits by $9,000, and the sales day book total for the month was $9,000.",
          steps: [
            { label: "First — test for double", detail: "$4,600 is exactly twice the $2,300 allowance. The allowance is a CREDIT balance; putting it in the debit column removes $2,300 from credits and adds it to debits, a swing of $4,600." },
            { label: "First — the fix", detail: "Move the allowance for receivables to the credit column. No journal is needed — the ledger was right and only the trial balance was wrong." },
            { label: "Second — test for a transposition", detail: "$270 is divisible by 9. A receipt of $1,530 recorded as $1,260 would understate the debit side by $270 — consistent with credits exceeding debits." },
            { label: "Second — the fix", detail: "Correct the cash book entry to $1,530. This one IS a ledger error, so it needs a journal, and it also affects the bank reconciliation in chapter 20." },
            { label: "Third — test for a one-sided posting", detail: "$9,000 equals the sales day book total exactly. The total appears to have been debited to receivables with no credit to revenue — a one-sided posting." },
            { label: "Third — the fix", detail: "Credit revenue $9,000 and debit SUSPENSE $9,000, because this error made debits differ from credits. Chapter 23 handles what happens next." },
          ],
          result:
            "Three differences, three different diagnoses, and only two of them needed a journal at all. The habit worth building is to **read the difference before searching**: exactly-double points to a wrong side, divisible-by-nine points to a transposition, and a difference matching a day book total points to a one-sided posting of that total.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A trial balance error is not always a ledger error",
          md: "A balance listed in the wrong column, or omitted from the list, is an error in the **trial balance** — the ledger is correct and no journal is required. A one-sided posting, a transposition or a casting error inside an account is a **ledger** error and does need one. Confusing the two produces a journal that breaks a ledger that was right.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Putting accumulated depreciation or the allowance for receivables in the debit column.",
      fix: "Both are CREDIT balances. Each misplacement throws the trial balance out by twice the amount.",
    },
    {
      trap: "Confusing an error of commission with an error of principle.",
      fix: "Commission is the wrong account of the SAME type; principle is the wrong TYPE of account — an expense treated as an asset, or the reverse.",
    },
    {
      trap: "Assuming a balanced trial balance means the accounts are correct.",
      fix: "Six classes of error leave the columns equal, including omission and principle. It is an arithmetic check, nothing more.",
    },
    {
      trap: "Treating a reversal of entries as detectable by the trial balance.",
      fix: "Both a debit and a credit of the right amount were posted, so the columns agree. Only the accounts are wrong.",
    },
    {
      trap: "Forgetting that a balance in the wrong column is out by DOUBLE.",
      fix: "A difference that is exactly twice a familiar figure is the signature of a wrong-column or wrong-side entry.",
    },
  ],
  keyTerms: [
    { term: "Trial balance", def: "A list of every general ledger balance at a date, split into debit and credit columns, used to check the double entry and to prepare the financial statements." },
    { term: "Error of omission", def: "A transaction left out of the records entirely, so both sides are missing and the trial balance still agrees." },
    { term: "Error of commission", def: "The right amount posted to the wrong account of the same type." },
    { term: "Error of principle", def: "The right amount posted to a wrong TYPE of account, such as capital expenditure charged as an expense." },
    { term: "Error of original entry", def: "The wrong amount entered on both sides of the double entry." },
    { term: "Reversal of entries", def: "The correct amount posted, but with the debit and credit the wrong way round." },
    { term: "Compensating errors", def: "Two unrelated errors of equal amount on opposite sides that cancel out in the trial balance." },
  ],
  summary: [
    "The trial balance lists every ledger balance and checks that debits equal credits.",
    "Accumulated depreciation and the allowance for receivables are credit balances despite relating to assets.",
    "Six error types leave the trial balance in agreement: omission, commission, principle, original entry, reversal and compensating errors.",
    "Errors that do break the agreement are one-sided entries, unequal amounts, same-side postings, casting errors and omitted or misplaced balances.",
    "A difference of exactly twice a familiar figure points to a wrong-side or wrong-column entry.",
    "A balanced trial balance is an arithmetic check only, and says nothing about whether the accounting is right.",
  ],
  knowledgeDiagnostic: [
    { q: "What single question decides whether the trial balance detects an error?", a: "Did the double entry stay equal? If debits still equal credits, the trial balance cannot see the error." },
    { q: "Name the six error types the trial balance does not reveal.", a: "Omission, commission, principle, original entry, reversal of entries and compensating errors." },
    { q: "What distinguishes an error of principle from an error of commission?", a: "Principle uses the wrong TYPE of account — an expense as an asset, say. Commission uses the wrong account of the same type." },
    { q: "Which two credit balances relate to assets?", a: "Accumulated depreciation and the allowance for receivables. Both are deducted from an asset on presentation but are credits in the trial balance." },
    { q: "A trial balance is out by exactly twice $460. What does that suggest?", a: "A $460 balance or entry has been placed on the wrong side or in the wrong column, which shifts the difference by double the amount." },
  ],
  furtherStudy: [
    "Chapter 23 corrects these errors and clears the suspense account they create.",
    "Chapter 24 uses the corrected trial balance to prepare the financial statements.",
  ],
}

/* ── Chapter 23 · F2(c)–(d), F3 ────────────────────────────────── */

export const FA_TREE_23: StudyChapter = {
  id: "FA-23",
  number: 23,
  paper: "FA",
  area: "F",
  title: "Correcting errors and the suspense account",
  minutes: 17,
  syllabusRefs: ["F2(c)", "F2(d)", "F3(a)", "F3(b)", "F3(c)", "F3(d)"],
  intro:
    "A suspense account is a holding pen for an unbalanced entry, and its only acceptable closing balance is nil. Clearing it means finding every one-sided error — and only the one-sided errors.",
  outcomes: [
    "Prepare journal entries to correct each type of error",
    "Explain the purpose of a suspense account and identify the errors that create one",
    "Record entries in a suspense account and prepare the journals to clear it",
    "Calculate the impact of errors and their correction on profit and on the statement of financial position",
    "Distinguish corrections that pass through suspense from those that do not",
  ],
  sections: [
    {
      id: "suspense",
      heading: "The suspense account and what belongs in it",
      blocks: [
        {
          kind: "definition",
          term: "Suspense account",
          md: "A temporary account opened to hold the **difference** when a trial balance does not agree, so that draft statements can be prepared while the error is found. It is not a real asset or liability and it must be **cleared to nil** before the financial statements are finalised.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The rule that decides every question in this chapter",
          md: "**Only an error that made debits differ from credits passes through suspense.** A correction with a proper debit and credit of its own — an error of omission, commission, principle, original entry or reversal — never touches suspense, because there was no imbalance to hold.\n\nSo when correcting a list of errors, sort them first: the one-sided ones clear suspense, the two-sided ones do not. Routing a two-sided correction through suspense leaves suspense with a balance that can never be explained.",
        },
        {
          kind: "table",
          caption: "Correcting each error type",
          head: ["Error", "Correction", "Through suspense?"],
          rows: [
            ["Transaction omitted entirely ($600 purchase)", "Debit purchases $600, credit payables $600", "**No**"],
            ["Rent $400 debited to insurance", "Debit rent $400, credit insurance $400", "**No**"],
            ["Machine $9,000 debited to repairs", "Debit plant $9,000, credit repairs $9,000", "**No**"],
            ["$270 recorded as $720 on both sides", "Reverse $450 on both sides", "**No**"],
            ["Entries reversed: receipt of $500 debited to receivables, credited to bank", "Debit bank $1,000, credit receivables $1,000 — DOUBLE, to undo and redo", "**No**"],
            ["Only the debit posted for a $350 payment", "Credit suspense $350 and complete the missing credit", "**Yes**"],
            ["$180 debited to the correct account and $810 credited to the other", "Correct the $630 difference against suspense", "**Yes**"],
            ["Sales day book undercast by $200 and posted", "Correct the affected account against suspense", "**Yes**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Reversals need double the amount",
          md: "If $500 was debited where it should have been credited, the correction is **$1,000** — $500 to cancel the wrong entry and $500 to make the right one. Correcting with $500 leaves the account at nil instead of at the correct figure. Any question involving \"the entries were reversed\" is testing this doubling, and it is the single most reliable trap in the topic.",
        },
      ],
      check: {
        q: "A $700 cash receipt from a customer was debited to trade receivables and credited to bank. What journal corrects it?",
        options: [
          "Debit bank $700, credit trade receivables $700",
          "Debit bank $1,400, credit trade receivables $1,400",
          "Debit suspense $1,400, credit trade receivables $1,400",
          "Debit bank $700, credit suspense $700",
        ],
        correct: 1,
        explain:
          "The entries were REVERSED, so the correction is DOUBLE: $700 to cancel the wrong entries and $700 to record them properly — debit bank $1,400 and credit trade receivables $1,400. Suspense is not involved, because both a debit and a credit of $700 were posted, so the trial balance never went out of agreement.",
      },
    },
    {
      id: "clearing",
      heading: "Clearing the suspense account",
      blocks: [
        {
          kind: "example",
          title: "A suspense account cleared, with two errors that do not belong in it",
          scenario:
            "Fenholme Co's trial balance shows total debits exceeding total credits by $1,540, and the difference has been posted to a suspense account. Investigation reveals five errors. (1) A payment of $960 for repairs was debited to repairs but no credit was posted. (2) Discounts received of $310 were credited to the discounts received account but not debited to payables. (3) A purchase invoice for $1,250 was omitted from the records entirely. (4) The purchases day book was overcast by $580, and the total was posted. (5) Rent of $470 was debited to the insurance account.",
          steps: [
            { label: "Set up the suspense account", detail: "Debits exceed credits by $1,540, so suspense holds a CREDIT balance of $1,540 to make the trial balance agree." },
            { label: "1 · The missing credit", detail: "One-sided: complete the entry with credit bank $960 and debit suspense $960. Suspense falls to $580 credit." },
            { label: "2 · Discounts received not debited to payables", detail: "One-sided: debit payables $310 and credit suspense $310. Suspense becomes $890 credit." },
            { label: "3 · The omitted invoice", detail: "Debit purchases $1,250, credit payables $1,250. BOTH sides were missing, so the trial balance was never out on this — suspense is not touched." },
            { label: "4 · The overcast day book", detail: "The inflated total was posted to BOTH purchases (debit) and the payables control account (credit), so debits and credits stayed equal. Two-sided: debit payables $580, credit purchases $580, and leave suspense alone." },
            { label: "5 · Rent in the insurance account", detail: "Error of commission, two-sided: debit rent $470, credit insurance $470. Suspense untouched." },
            { label: "Test whether suspense clears", detail: "After the two one-sided corrections, suspense stands at $890 credit — it has NOT cleared, so at least one further one-sided error remains to be found before the accounts can be finalised." },
          ],
          result:
            "Two of the five errors cleared $1,270 of the suspense balance and three did not touch it at all, leaving $890 outstanding. The check that matters: **suspense must end at nil**, and a residual balance means a one-sided error is still undiscovered. Sorting the list into one-sided and two-sided errors BEFORE writing any journals is what makes this reliable — a candidate who pushes all five through suspense will appear to clear it while corrupting five accounts.",
        },
        {
          kind: "formula",
          name: "Effect of corrections on profit",
          expr: "Revised profit = Draft profit + Corrections that increase income or reduce expenses − Corrections that reduce income or increase expenses",
          note: "Corrections between two asset accounts, or between an asset and a liability, do not change profit at all — a common source of marks.",
        },
        {
          kind: "example",
          title: "Restating profit after corrections",
          scenario:
            "Draft profit for the year is $214,000. Then: repairs of $8,400 were correctly recorded, but $8,400 of machine installation costs were also charged to repairs; closing inventory was overstated by $3,700; an accrual for wages of $2,900 was omitted; a $1,600 receipt from a customer was credited to revenue instead of to receivables; and a $700 payment posted only to the debit side of the motor expenses account has now been completed against suspense.",
          steps: [
            { label: "The installation cost", detail: "Capital expenditure charged as repairs: remove $8,400 from expenses and capitalise it. Profit INCREASES by $8,400." },
            { label: "Overstated closing inventory", detail: "Reducing closing inventory increases cost of sales. Profit DECREASES by $3,700." },
            { label: "The omitted accrual", detail: "An expense is missing. Profit DECREASES by $2,900." },
            { label: "Receipt credited to revenue", detail: "This was settlement of a receivable, not a sale. Remove $1,600 from revenue: profit DECREASES by $1,600." },
            { label: "The completed one-sided entry", detail: "The debit to motor expenses was already recorded, so the expense is already in profit. Completing the credit affects bank only — profit is UNCHANGED." },
            { label: "Restate", detail: "$214,000 + $8,400 − $3,700 − $2,900 − $1,600 = $214,200." },
          ],
          result:
            "Revised profit of $214,200. The check that matters: the one-sided error changed the trial balance but NOT profit, because the missing side was the bank. Assuming every correction moves profit is the commonest error here — always ask which two accounts the correction touches, and whether either of them is an income or expense account.",
        },
      ],
      check: {
        q: "Which of these corrections has NO effect on profit?",
        options: [
          "Capitalising $5,000 of plant wrongly charged to repairs",
          "Recording an omitted accrual of $2,000",
          "Correcting a $900 payment posted to receivables instead of payables",
          "Writing off an irrecoverable debt of $1,200 not previously recorded",
        ],
        correct: 2,
        explain:
          "A payment posted to receivables instead of payables moves an amount between two BALANCE SHEET accounts — an asset and a liability — so profit is untouched. Each of the other three moves an expense: capitalising reduces expenses, an accrual adds one, and a write-off adds one.",
      },
    },
    {
      id: "effect-on-the-position",
      heading: "The effect of corrections on the statement of financial position",
      blocks: [
        {
          kind: "text",
          md: "Questions ask for the effect of corrections on profit **and** on net assets, and the two are not always the same. Working out which is affected comes down to naming the two accounts the correction touches.",
        },
        {
          kind: "table",
          caption: "What each correction moves",
          head: ["Correction", "Profit", "Net assets"],
          rows: [
            ["Capitalise expenditure wrongly charged to repairs", "**Up**", "**Up** — an asset is created"],
            ["Recognise an omitted accrual", "**Down**", "**Down** — a liability is created"],
            ["Recognise an omitted prepayment", "**Up**", "**Up** — an asset is created"],
            ["Reduce overstated closing inventory", "**Down**", "**Down** — the asset falls"],
            ["Write off an unrecorded irrecoverable debt", "**Down**", "**Down** — receivables fall"],
            ["Increase the allowance for receivables", "**Down**", "**Down** — net receivables fall"],
            ["Move a payment wrongly debited to receivables so it debits payables", "**No change**", "**No change** — an asset and a liability both fall by the same amount"],
            ["Complete a one-sided entry where the expense was already recorded", "**No change**", "**Down** — the missing credit reduces the bank"],
            ["Reclassify a long-term loan instalment as current", "**No change**", "**No change** — both are liabilities"],
          ],
        },
        {
          kind: "example",
          title: "Restating both figures",
          scenario:
            "Brantham Co's draft accounts show profit of $158,000 and net assets of $624,000. Then: $22,000 of plant installation was charged to repairs; an accrual for electricity of $4,300 was omitted; a $7,000 receivable is irrecoverable and has not been written off; closing inventory was overstated by $5,100; and a $2,600 payment to a supplier was correctly credited to bank but debited to trade receivables.",
          steps: [
            { label: "The installation cost", detail: "Capitalise it: expenses fall $22,000 and an asset of $22,000 appears. Profit +$22,000; net assets +$22,000." },
            { label: "The omitted accrual", detail: "An expense and a liability appear. Profit −$4,300; net assets −$4,300." },
            { label: "The irrecoverable debt", detail: "An expense appears and receivables fall. Profit −$7,000; net assets −$7,000." },
            { label: "Overstated inventory", detail: "Cost of sales rises and the asset falls. Profit −$5,100; net assets −$5,100." },
            { label: "The misposted payment", detail: "Debit trade payables $2,600 and credit trade receivables $2,600. Profit unchanged — but receivables fall $2,600 AND payables fall $2,600, so net assets are unchanged as well. The draft had overstated both an asset and a liability by $2,600." },
            { label: "Restate", detail: "Profit = $158,000 + $22,000 − $4,300 − $7,000 − $5,100 = $163,600. Net assets = $624,000 + $22,000 − $4,300 − $7,000 − $5,100 = $629,600." },
          ],
          result:
            "Revised profit of $163,600 and revised net assets of $629,600. Note that they moved by the SAME amount here, which is usual — most corrections touch one profit account and one balance sheet account. The instructive case is the fifth: it changed neither figure, because it moved an amount between two balance sheet accounts on opposite sides of the statement.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two-account test",
          md: "For any correction, name the **two accounts** in the journal. If **one** of them is an income or expense account, profit moves. If **either** is an asset or liability account, net assets move. If both are balance sheet accounts on the same side — receivables and inventory, say — net assets do not move at all. That test is faster and more reliable than trying to remember a table.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Correcting a reversal with the original amount instead of double.",
      fix: "Use twice the amount — once to cancel the wrong entry and once to make the right one.",
    },
    {
      trap: "Routing a two-sided correction through the suspense account.",
      fix: "Only errors that made debits differ from credits pass through suspense. Omission, commission, principle, original entry and reversal never do.",
    },
    {
      trap: "Leaving a balance in the suspense account.",
      fix: "It must clear to nil. A residual means a one-sided error has not been found, and that is the answer the question wants.",
    },
    {
      trap: "Assuming every correction changes profit.",
      fix: "Ask which two accounts it touches. Corrections between two asset accounts, or an asset and a liability, leave profit unchanged.",
    },
    {
      trap: "Treating a suspense balance as a real asset or liability in the statement of financial position.",
      fix: "It is a temporary holding account and must never appear in finalised statements.",
    },
  ],
  keyTerms: [
    { term: "Suspense account", def: "A temporary account holding the difference on an unbalanced trial balance, which must be cleared to nil before finalising the statements." },
    { term: "One-sided error", def: "An error that left debits and credits unequal, and which therefore clears against suspense when corrected." },
    { term: "Reversal of entries", def: "An error where the debit and credit were transposed, corrected with double the original amount." },
    { term: "Error of principle", def: "The right amount posted to a wrong type of account, corrected without touching suspense." },
    { term: "Draft profit", def: "The profit figure before error corrections, restated by adjusting for each correction that touches an income or expense account." },
  ],
  summary: [
    "A suspense account temporarily holds the difference on an unbalanced trial balance and must be cleared to nil.",
    "Only one-sided errors pass through suspense; two-sided errors are corrected with their own debit and credit.",
    "A reversal of entries is corrected with double the original amount.",
    "Sorting the error list into one-sided and two-sided before writing journals is what makes clearing suspense reliable.",
    "A residual suspense balance means a one-sided error remains undiscovered.",
    "Only corrections touching an income or expense account change profit.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the only acceptable closing balance on a suspense account?", a: "Nil. Any residual means a one-sided error has not yet been found." },
    { q: "Which errors pass through suspense?", a: "Only those that made debits differ from credits — one-sided entries, unequal amounts and casting errors on a posted total." },
    { q: "How much is used to correct a reversal of entries?", a: "Double the original amount: once to cancel the wrong entry and once to make the correct one." },
    { q: "Why does completing a one-sided entry often leave profit unchanged?", a: "Because the side already recorded was frequently the expense or income, and the missing side was a balance sheet account such as bank." },
    { q: "How is draft profit restated?", a: "Add corrections that increase income or reduce expenses, deduct those that reduce income or increase expenses, and ignore corrections between two balance sheet accounts." },
  ],
  furtherStudy: [
    "Chapter 24 prepares the statements from the corrected trial balance.",
    "Chapter 27 uses the same journal discipline to reconstruct incomplete records.",
  ],
}

/** Chapters 20–23 — Areas E and F, in reading order. */
export const FA_TREE_AREA_E: StudyChapter[] = [FA_TREE_20, FA_TREE_21]
export const FA_TREE_AREA_F: StudyChapter[] = [FA_TREE_22, FA_TREE_23]
