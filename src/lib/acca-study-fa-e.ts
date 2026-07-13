import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area E — Preparing a trial balance.
 * Rich study chapter: the trial balance, the two families of error, the
 * suspense account, control-account reconciliations and bank reconciliations.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Every journal and
 * reconciliation is figure-checked to balance.
 */

export const FA_E: StudyChapter = {
  paper: "FA",
  area: "E",
  title: "Preparing a trial balance",
  minutes: 15,
  intro: "Every ledger balance in the business has to line up in two columns that agree to the penny. When they don't, the trial balance becomes a detective's tool — and the suspense account is where the clues wait.",
  outcomes: [
    "Explain what a trial balance is and how it is extracted from the ledgers",
    "Distinguish the six errors that leave the trial balance balanced from the three that break it",
    "Open, use and clear a suspense account with correcting journals",
    "Reconcile a receivables or payables control account to the list of balances",
    "Prepare a bank reconciliation using unpresented cheques and outstanding lodgements",
  ],
  sections: [
    {
      id: "what-is-tb",
      heading: "What a trial balance is — and how it is extracted",
      blocks: [
        { kind: "text", md: "Double entry has a built-in safety net: every transaction is recorded as an equal **debit and credit**. So if you take the closing balance of **every** ledger account and sort them into two columns — debits on the left, credits on the right — the two totals should be **identical**. That listing is the **trial balance** (TB)." },
        { kind: "text", md: "Extracting it is mechanical. You go through each account in the general ledger, strike its balance (balance carried down), and drop that figure into the debit or credit column. Assets and expenses carry **debit** balances; liabilities, capital and income carry **credit** balances. Add up each column. If they agree, you have a first — but not a full — check that the books are arithmetically sound, and a tidy springboard for preparing the financial statements." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Where the trial balance sits in the process",
          caption: "Balances feed the TB; if it won't agree, a suspense account holds the gap until the statements are drawn up.",
          data: {
            steps: [
              { label: "Ledger balances", sub: "each account balanced off" },
              { label: "Trial balance", sub: "debits vs credits listed" },
              { label: "Suspense account", sub: "only if the columns disagree" },
              { label: "Financial statements", sub: "position & profit or loss" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "A balanced TB is not a clean TB", md: "Equal columns prove the debits and credits **total** the same — nothing more. A whole family of errors leaves both columns equal while the numbers are still wrong. So \"the trial balance balances\" never means \"the accounts are correct\"." },
      ],
    },
    {
      id: "errors-no-effect",
      heading: "Errors that do NOT affect the trial balance",
      blocks: [
        { kind: "text", md: "Some mistakes keep a **debit equal to a credit**, so the TB still agrees and the error hides in plain sight. There are six classic types — learn them as a set, because the exam loves asking which family an error belongs to." },
        { kind: "table", caption: "The six errors that leave the trial balance balanced", head: ["Error", "What happened", "Why the TB still agrees"], rows: [
          ["Omission", "A transaction is left out **completely** — both the debit and the credit.", "Both columns fall by the same amount, so they stay equal."],
          ["Commission", "Right **type** of account, wrong account — e.g. cash from J. Smith posted to J. Smyth.", "Still one debit and one equal credit; only the wrong customer is affected."],
          ["Principle", "Wrong **class** of account — e.g. a machine (asset) posted to repairs (expense).", "A debit and an equal credit were still made — just to the wrong kind of account."],
          ["Original entry", "The **wrong figure** is used for BOTH sides — e.g. a $560 sale entered as $650 throughout.", "Both entries are wrong by the same amount, so they still match."],
          ["Compensating", "Two unrelated errors of **equal value** cancel out — one on each side.", "The overstatement on one side offsets the understatement on the other."],
          ["Complete reversal", "Debit and credit are **swapped** — the entry is made the wrong way round.", "There is still one debit and one credit of equal value in the TB totals."],
        ] },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two families of error",
          data: {
            leftTitle: "Does NOT break the TB",
            rightTitle: "DOES break the TB",
            rows: [
              { aspect: "Column totals", left: "Debits still equal credits", right: "Debits and credits disagree" },
              { aspect: "Typical members", left: "Omission, commission, principle, original entry, compensating, reversal", right: "Single-sided entry, transposition, wrong addition (casting)" },
              { aspect: "Suspense account?", left: "No — nothing to hold", right: "Yes — the difference sits there" },
              { aspect: "How it is found", left: "Reviews, reconciliations, customer queries", right: "The TB simply will not agree" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "A quick test: ask **\"is there still one debit and one matching credit?\"** If yes, the TB balances (one of the six above). If an entry is single-sided, uneven, or added up wrong, the TB breaks — and a suspense account appears." },
      ],
      check: {
        q: "A company buys a machine (a non-current asset) but debits the purchases account instead. What type of error is this, and does the trial balance still agree?",
        options: [
          "Error of commission; the trial balance will not agree",
          "Error of principle; the trial balance still agrees",
          "Error of omission; the trial balance still agrees",
          "Transposition error; the trial balance will not agree",
        ],
        correct: 1,
        explain: "Posting an asset to an expense account is using the wrong CLASS of account — an error of principle. A debit and an equal credit were still made (just to purchases rather than to the asset), so the two columns still total the same. Commission is wrong account, right class; this is wrong class entirely.",
      },
    },
    {
      id: "errors-and-suspense",
      heading: "Errors that DO break the TB — and the suspense account",
      blocks: [
        { kind: "text", md: "The three troublemakers all leave the debits and credits **unequal**: a **single-sided entry** (only one half posted), a **transposition** (digits reversed, e.g. $470 posted as $740 on one side), and a **casting error** (a column or day book added up wrong). When the TB won't agree, you cannot wait to find the cause — the accounts must still be usable — so the difference is parked in a **suspense account**." },
        { kind: "text", md: "The suspense simply plugs the gap. If the **debit** column is short, you put the difference on the debit side of suspense; if the **credit** column is short, on the credit side. Then, as each error is found, a **correcting journal** puts the real account right and takes the other leg to suspense — so the suspense empties itself to **nil**. When suspense is zero, every error has been found." },
        { kind: "callout", tone: "rule", title: "Golden rule of suspense", md: "A suspense account is **only ever** used for errors that unbalance the trial balance. It is **never** used to correct an omission, commission, principle, reversal, original-entry or compensating error — those keep the TB balanced, so there is no difference to hold." },
        { kind: "example", title: "Worked example — clearing a suspense account", scenario: "Priya extracts her trial balance and the DEBIT column exceeds the CREDIT column by $360. She opens a suspense account to make the TB agree, then investigates. She finds two errors: (1) rent paid of $470 was posted to the rent account as $740; (2) the sales account was undercast (added up short) by $90. Clear the suspense.", steps: [
          { label: "Open the suspense", detail: "Debits are $360 too high, so the credit column is $360 short. Insert a $360 credit balance in suspense — now the TB agrees." },
          { label: "Error 1 — the transposition", detail: "Rent was recorded as $740 instead of $470, so the rent (debit) is overstated by $740 − $470 = $270. To fix: **Dr Suspense $270, Cr Rent $270** — this removes the extra rent." },
          { label: "Error 2 — the undercast", detail: "Sales (a credit) was added up $90 short, so income is understated by $90. To fix: **Dr Suspense $90, Cr Sales $90** — this adds the missing sales." },
          { label: "Check the suspense clears", detail: "Suspense: opening credit $360; corrections debit it $270 + $90 = $360. Credit $360 − debit $360 = nil." },
        ], result: "Both errors explain exactly why the debit side was $360 too high (rent overstated $270 + sales understated $90 = $360). The correcting journals debit suspense by $360 in total, clearing the $360 opening credit to zero — proof that no further errors remain." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "The suspense account, cleared to nil",
          caption: "Opening difference on the credit side; each correction debits it away until it is empty.",
          data: {
            name: "Suspense account",
            debits: [
              { label: "Rent (correct transposition)", amount: 270 },
              { label: "Sales (correct undercast)", amount: 90 },
            ],
            credits: [
              { label: "Difference on TB (balance b/d)", amount: 360 },
            ],
          },
        } },
      ],
      check: {
        q: "A trial balance fails to agree: the credit column totals $200 MORE than the debit column. A suspense account is opened. On which side does the opening suspense balance go?",
        options: [
          "Debit side, $200",
          "Credit side, $200",
          "Debit side, $400",
          "No suspense entry is needed",
        ],
        correct: 0,
        explain: "The debit column is the short one (it is $200 less than the credit column), so a $200 DEBIT entry in suspense makes the two columns equal. The later correcting journals will then credit the suspense to clear it. Always put the suspense balance on whichever side is short.",
      },
    },
    {
      id: "control-accounts",
      heading: "Control accounts and reconciling them",
      blocks: [
        { kind: "text", md: "Individual customer and supplier accounts live in the **receivables ledger** and **payables ledger** (the memorandum ledgers). To keep the general ledger tidy, their totals are summarised in two **control accounts**: the **receivables (sales) ledger control account** and the **payables (purchases) ledger control account**. The control account is the figure that appears in the trial balance and the statement of financial position." },
        { kind: "text", md: "Two independent records now describe the same thing: the **control account** (fed by day-book and cash-book **totals**) and the **list of balances** (the sum of every **individual** account). They should match. When they don't, you reconcile them — and the side an error lands on tells you which one to adjust: **totals, castings and day-book errors hit the control account; errors in one customer's or supplier's account hit the list of balances.**" },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Receivables ledger control account",
          caption: "Sales and dishonoured cheques increase it (debits); receipts, discounts, returns and contras reduce it (credits).",
          data: {
            name: "Receivables control",
            debits: [
              { label: "Balance b/d (opening owed)", amount: 9400 },
              { label: "Credit sales", amount: 42000 },
            ],
            credits: [
              { label: "Cash received", amount: 38600 },
              { label: "Discounts allowed", amount: 700 },
              { label: "Sales returns", amount: 1560 },
              { label: "Balance c/d (closing owed)", amount: 10540 },
            ],
          },
        } },
        { kind: "example", title: "Worked example — reconciling the control account", scenario: "The receivables control account shows $10,540. The list of balances from the receivables ledger totals $9,850. They disagree by $690. On investigation: (a) the sales day book was overcast by $500; (b) discounts allowed of $40 were omitted from the control account; (c) a debtor's balance of $200 was left off the list of balances; (d) a credit note for $50 was never posted to the customer's individual account. Reconcile both to a common figure.", steps: [
          { label: "Fix the control account (a)", detail: "The overcast day-book total was posted to the control, overstating it. $10,540 − $500 = $10,040." },
          { label: "Fix the control account (b)", detail: "Discounts allowed reduce receivables but were omitted. $10,040 − $40 = $10,000 adjusted control." },
          { label: "Fix the list of balances (c)", detail: "A missing debtor understates the list. $9,850 + $200 = $10,050." },
          { label: "Fix the list of balances (d)", detail: "The credit note should reduce that customer's balance. $10,050 − $50 = $10,000 adjusted list." },
        ], result: "Adjusted control = $10,000 and adjusted list = $10,000 — they now agree. Casting and total errors (a, b) were corrected in the control account; individual-account errors (c, d) were corrected in the list of balances. That split is the whole skill." },
        { kind: "callout", tone: "key", title: "Which record do I adjust?", md: "Ask where the error occurred. A **day book, cast or bulk-posting** mistake feeds the **control account**. A mistake in **one person's account** — a balance omitted, mis-added or a note not posted — belongs to the **list of balances**. Never adjust both for the same error." },
      ],
      check: {
        q: "The sales day book was overcast by $500. Which figure needs correcting in a receivables reconciliation?",
        options: [
          "Reduce the list of balances by $500",
          "Reduce the receivables control account by $500",
          "Increase the control account by $500",
          "No adjustment — it corrects itself",
        ],
        correct: 1,
        explain: "The day-book TOTAL is posted to the control account, so an overcast overstates the control account only. The individual customer accounts (the list of balances) are recorded from separate invoices and are unaffected. Reduce the control account by $500.",
      },
    },
    {
      id: "bank-rec",
      heading: "Bank reconciliations",
      blocks: [
        { kind: "text", md: "The business keeps its own record of the bank — the **cash book** — and the bank sends a **bank statement**. They rarely agree on any given day, for two honest reasons. First, **timing differences**: cheques the business has written but the bank has not yet paid (**unpresented cheques**), and money paid in but not yet processed (**outstanding lodgements**). Second, items the **bank knows about but the business hasn't recorded yet**: bank charges, interest, standing orders, direct debits and dishonoured cheques." },
        { kind: "text", md: "The method has two clean stages. **Stage 1 — update the cash book** for everything the business simply didn't know about (charges, interest, direct debits). This gives the **corrected cash book balance** — the figure that goes in the accounts. **Stage 2 — reconcile the bank statement** to that corrected balance using only the **timing differences**, which will clear themselves in a few days. Timing differences never touch the cash book." },
        { kind: "example", title: "Worked example — a bank reconciliation", scenario: "Tom's cash book shows a balance of $3,200. The bank statement shows $3,450. He finds: bank charges $50 and a direct debit for insurance $180 (both on the statement, not in the cash book); interest received $30 (on the statement, not in the cash book); unpresented cheques $600; and an outstanding lodgement $150. Reconcile.", steps: [
          { label: "Stage 1 — correct the cash book", detail: "Start $3,200, less charges $50, less direct debit $180, add interest $30 = $3,000 corrected cash book balance." },
          { label: "Stage 2 — start from the statement", detail: "Bank statement balance = $3,450." },
          { label: "Add outstanding lodgement", detail: "The $150 paid in is already in the cash book but not yet on the statement, so add it: $3,450 + $150 = $3,600." },
          { label: "Subtract unpresented cheques", detail: "The $600 of cheques written will reduce the bank balance once presented, so subtract them: $3,600 − $600 = $3,000." },
        ], result: "The reconciled bank statement figure ($3,450 + $150 − $600 = $3,000) equals the corrected cash book balance ($3,200 − $50 − $180 + $30 = $3,000). Both land on $3,000, so the reconciliation is complete." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Which item goes where",
          caption: "Bank-side timing items adjust the statement; things the business hadn't recorded adjust the cash book.",
          data: {
            items: [
              { title: "Unpresented cheques", sub: "Statement side: subtract from bank balance" },
              { title: "Outstanding lodgements", sub: "Statement side: add to bank balance" },
              { title: "Bank charges & direct debits", sub: "Cash book: reduce the balance" },
              { title: "Interest received", sub: "Cash book: increase the balance" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Don't cross the streams", md: "Timing differences (unpresented cheques, outstanding lodgements) **only** adjust the bank statement side — they are already in the cash book. Items the business missed (charges, interest, direct debits) **only** adjust the cash book. Putting either on the wrong side is the classic exam slip." },
      ],
      check: {
        q: "In a bank reconciliation, what is an unpresented cheque?",
        options: [
          "Money paid into the bank that has not yet been credited",
          "A cheque the business has written that the bank has not yet paid",
          "A bank charge the business did not know about",
          "A cheque received that has bounced",
        ],
        correct: 1,
        explain: "An unpresented cheque is one the business has already recorded in its cash book (reducing its balance) but the payee has not yet banked, so it has not reached the bank statement. Because it will lower the bank balance once presented, you SUBTRACT it from the bank statement figure in the reconciliation.",
      },
    },
  ],
  examTraps: [
    { trap: "Using a suspense account to correct an error of omission, commission or principle.", fix: "Suspense is ONLY for errors that unbalance the TB. The six balanced-TB errors leave no difference to hold, so they are corrected by journal without any suspense entry." },
    { trap: "Assuming a balanced trial balance proves the accounts are correct.", fix: "Six error types keep the columns equal. A balanced TB checks arithmetic, not accuracy — always still review and reconcile." },
    { trap: "Adjusting the list of balances for a day-book casting error.", fix: "Day-book totals and castings feed the CONTROL account; only errors inside one customer's or supplier's account touch the list of balances." },
    { trap: "Adding unpresented cheques to the bank statement balance.", fix: "Unpresented cheques will REDUCE the bank balance once paid, so subtract them from the statement. Outstanding lodgements are the ones you add." },
    { trap: "Putting bank charges or interest on the bank-statement side of the reconciliation.", fix: "Those are items the business had not recorded — they correct the CASH BOOK, not the statement side." },
  ],
  keyTerms: [
    { term: "Trial balance", def: "A list of every ledger balance split into debit and credit columns; equal totals are a first arithmetic check that double entry is intact." },
    { term: "Suspense account", def: "A temporary account holding the difference on a trial balance that does not agree, cleared to nil by correcting journals as each error is found." },
    { term: "Error of principle", def: "Posting to the wrong CLASS of account (e.g. an asset treated as an expense); a debit and equal credit are still made, so the TB still balances." },
    { term: "Control account", def: "A general-ledger summary of the receivables or payables ledger, fed by day-book and cash-book totals and reconciled to the list of individual balances." },
    { term: "Bank reconciliation", def: "A statement agreeing the corrected cash book balance to the bank statement, using unpresented cheques and outstanding lodgements as timing differences." },
  ],
  summary: [
    "A trial balance lists all ledger balances in two columns; equal totals check arithmetic but never guarantee the accounts are correct.",
    "Six errors leave the TB balanced (omission, commission, principle, original entry, compensating, complete reversal); three break it (single entry, transposition, wrong casting).",
    "A suspense account holds the TB difference on the short side and is cleared to nil by correcting journals — never used for balanced-TB errors.",
    "Control accounts are reconciled to the list of balances: casting and day-book errors hit the control account, individual-account errors hit the list.",
    "Bank rec has two stages — correct the cash book for missed items, then reconcile the statement using unpresented cheques (subtract) and outstanding lodgements (add).",
  ],
}
