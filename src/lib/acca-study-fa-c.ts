import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area C — Double-entry & accounting systems.
 * The mechanical heart of FA: the accounting equation, the duality of every
 * transaction, debits and credits, T-accounts, ledgers, books of prime entry
 * and how it all rolls up into the trial balance.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Every posting is
 * balanced and every total re-checked.
 */

export const FA_C: StudyChapter = {
  paper: "FA",
  area: "C",
  title: "Double-entry & accounting systems",
  minutes: 17,
  intro: "Every transaction has two sides — give and take. Master that single idea and the whole bookkeeping machine, from the first invoice to the trial balance, becomes one long, self-checking chain.",
  outcomes: [
    "State the accounting equation and show why every transaction keeps it in balance",
    "Explain the duality of double-entry and apply DEAD/CLIC to any transaction",
    "Post debits and credits to T-accounts and balance them off",
    "Distinguish the general (nominal), receivables and payables ledgers",
    "Trace a transaction from its book of prime entry through the ledgers",
    "Extract a trial balance and explain what it does — and does not — prove",
  ],
  sections: [
    {
      id: "equation",
      heading: "The accounting equation",
      blocks: [
        { kind: "text", md: "Everything a business owns had to be paid for by someone. Either the **owner** put it in, or an **outsider** lent it. That plain fact is the whole of bookkeeping, written as one line:" },
        { kind: "formula", name: "The accounting equation", expr: "Assets = Capital + Liabilities", note: "What the business controls = what the owner funded + what outsiders funded." },
        { kind: "text", md: "**Assets** are resources the business controls and expects to benefit from — cash, equipment, inventory, money owed to it by customers (receivables). **Liabilities** are amounts it owes to outsiders — loans, and money owed to suppliers (payables). **Capital** is the owner's stake: what would be left for them if every asset were sold and every liability settled." },
        { kind: "callout", tone: "key", title: "Why it can never break", md: "The equation is not a rule you must obey — it is a truth that **cannot** be false. Every asset was funded by exactly one source, so the two sides describe the **same pool of money** from two directions. If your books don't balance, you have made an error, not discovered an exception." },
        { kind: "example", title: "Worked example — three transactions, still balanced", scenario: "Priya starts a business. (1) She pays $50,000 of her own cash into the business bank account. (2) The business buys equipment for $12,000, paying by bank. (3) It takes an $8,000 bank loan, received into the bank. Show the equation after each step.", steps: [
          { label: "After (1) capital introduced", detail: "Assets: bank $50,000. Capital $50,000. Liabilities $0. → 50,000 = 50,000 + 0." },
          { label: "After (2) buy equipment", detail: "One asset swaps for another: bank falls $12,000, equipment rises $12,000. Assets still $50,000 (bank $38,000 + equipment $12,000). → 50,000 = 50,000 + 0." },
          { label: "After (3) take loan", detail: "Bank rises $8,000 and a $8,000 liability appears. Assets $58,000 (bank $46,000 + equipment $12,000). → 58,000 = 50,000 + 8,000." },
        ], result: "At every step the two sides are equal. A transaction can move money around inside the equation, but it can never tip it over." },
        { kind: "diagram", diagram: {
          type: "scale",
          title: "The equation stays level",
          caption: "After Priya's three transactions: assets on one side, capital plus liabilities on the other.",
          data: {
            assets: "$58,000",
            liabilities: "$8,000",
            equity: "$50,000",
          },
        } },
        { kind: "callout", tone: "tip", md: "Profit belongs to the owner, so it lives inside capital. The fuller form is **Assets = Capital + Profit − Drawings + Liabilities**. Earning profit and taking drawings both change the owner's stake, never the outsiders' claim." },
      ],
    },
    {
      id: "duality",
      heading: "Duality — the two sides of every deal",
      blocks: [
        { kind: "text", md: "Because the equation must stay balanced, **every transaction has to touch it in two places** that cancel out. This is the **duality** (or dual effect) principle: give something, get something. Pay $3,000 rent by bank and two things happen at once — the bank asset falls $3,000, and a rent expense of $3,000 is incurred. Record only one side and the books tip over." },
        { kind: "text", md: "Double-entry bookkeeping is simply the system built to capture both sides, every time. One side is written as a **debit**, the other as a **credit**, and for any transaction the total debits **must equal** the total credits. That built-in equality is what lets us check the books later." },
        { kind: "callout", tone: "rule", title: "The golden rule", md: "For **every** transaction: **total debits = total credits**. No exceptions. If a posting has a debit with no matching credit, it is incomplete — not a special case." },
        { kind: "table", caption: "One transaction, two effects", head: ["Transaction", "Effect 1", "Effect 2"], rows: [
          ["Owner pays in $50,000", "Bank asset +$50,000", "Capital +$50,000"],
          ["Buy equipment $12,000 by bank", "Equipment asset +$12,000", "Bank asset −$12,000"],
          ["Buy goods $5,000 on credit", "Purchases (expense) +$5,000", "Payables (liability) +$5,000"],
          ["Pay rent $3,000 by bank", "Rent expense +$3,000", "Bank asset −$3,000"],
        ] },
      ],
      check: {
        q: "A business buys a delivery van for $20,000, paying immediately by bank transfer. Which pair of effects records this correctly?",
        options: [
          "Van asset +$20,000 only",
          "Van asset +$20,000 and Bank asset −$20,000",
          "Van asset +$20,000 and Capital +$20,000",
          "Bank asset −$20,000 and a liability +$20,000",
        ],
        correct: 1,
        explain: "Paying by bank swaps one asset for another: the van (an asset) rises $20,000 and the bank (an asset) falls $20,000. Total assets are unchanged, capital and liabilities are untouched, and the equation stays balanced. Recording only the van (option 1) captures just one side and breaks duality.",
      },
    },
    {
      id: "debits-credits",
      heading: "Debits and credits — DEAD and CLIC",
      blocks: [
        { kind: "text", md: "\"Debit\" and \"credit\" are just the **left** and **right** sides of an account — nothing more sinister. The skill is knowing which side **increases** each type of account. Two memory hooks cover everything:" },
        { kind: "callout", tone: "key", title: "DEAD · CLIC", md: "**DEAD** — **D**ebits increase **E**xpenses, **A**ssets and **D**rawings.\n\n**CLIC** — **C**redits increase **L**iabilities, **I**ncome and **C**apital.\n\nTo **decrease** any account, post to the opposite side." },
        { kind: "text", md: "So a **debit** grows the things the business spends money on or owns (expenses, assets, drawings), while a **credit** grows the sources that funded it (liabilities, income, capital). Every transaction picks one from each list — a debit somewhere and an equal credit somewhere — which is exactly why the books always balance." },
        { kind: "table", caption: "What increases each account", head: ["Account type", "Increased by", "Decreased by", "Normal balance"], rows: [
          ["Asset (e.g. bank, equipment)", "Debit", "Credit", "Debit"],
          ["Expense (e.g. rent, purchases)", "Debit", "Credit", "Debit"],
          ["Drawings", "Debit", "Credit", "Debit"],
          ["Liability (e.g. loan, payables)", "Credit", "Debit", "Credit"],
          ["Income (e.g. sales)", "Credit", "Debit", "Credit"],
          ["Capital", "Credit", "Debit", "Credit"],
        ] },
        { kind: "callout", tone: "warn", title: "Bank feels backwards — here's why", md: "Your bank **statement** shows a deposit as a \"credit\" because it is written from the **bank's** point of view: your money is a liability the bank owes you. In **your** books the bank is an **asset**, so receiving money is a **debit**. Never post from the bank's language." },
      ],
    },
    {
      id: "t-accounts",
      heading: "T-accounts — posting and balancing off",
      blocks: [
        { kind: "text", md: "A ledger account is drawn as a **T**: the account name across the top, **debits on the left**, **credits on the right**. Posting a transaction means writing its two halves into the two accounts it affects — a debit entry in one, a matching credit entry in the other." },
        { kind: "example", title: "Worked example — posting two transactions", scenario: "Show the double entry for: (a) buying goods for resale worth $5,000 on credit from a supplier; (b) later selling goods for $9,000 to a customer on credit.", steps: [
          { label: "(a) identify the two accounts", detail: "Purchases is an expense (DEAD → debit to increase). Payables is a liability (CLIC → credit to increase)." },
          { label: "(a) post it", detail: "Dr Purchases $5,000  |  Cr Payables $5,000. Debits = credits. ✓" },
          { label: "(b) identify the two accounts", detail: "Sales is income (CLIC → credit to increase). Receivables is an asset (DEAD → debit to increase)." },
          { label: "(b) post it", detail: "Dr Receivables $9,000  |  Cr Sales $9,000. Debits = credits. ✓" },
        ], result: "Each transaction produced one debit and one equal credit. Purchases and Receivables carry debit balances; Payables and Sales carry credit balances — exactly as DEAD/CLIC predicts." },
        { kind: "text", md: "**Balancing off** an account turns its many entries into one figure. Add each side; the smaller side gets a **balance carried down (c/d)** to make the two totals equal; that same figure is then **brought down (b/d)** on the opposite side as the account's true balance." },
        { kind: "example", title: "Worked example — balancing the bank account", scenario: "The bank account received: capital $50,000, a loan $8,000 and $4,000 from a customer. It paid out: equipment $12,000, rent $3,000 and a supplier $2,000. Balance it off.", steps: [
          { label: "Total the debit (money-in) side", detail: "$50,000 + $8,000 + $4,000 = $62,000." },
          { label: "Total the credit (money-out) side", detail: "$12,000 + $3,000 + $2,000 = $17,000." },
          { label: "Find the balance c/d", detail: "$62,000 − $17,000 = $45,000. The credit side is smaller, so put $45,000 as the balance c/d on the credit side; both sides now total $62,000." },
          { label: "Bring it down", detail: "The $45,000 comes down on the debit side as the balance b/d — a debit balance, correct for an asset." },
        ], result: "The bank has a $45,000 debit balance: the business holds $45,000 of cash at the bank." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Bank account (an asset)",
          caption: "Debits (money in) on the left, credits (money out) on the right. Balance c/d $45,000 makes both sides total $62,000.",
          data: {
            name: "Bank",
            debits: [
              { label: "Capital", amount: 50000 },
              { label: "Loan", amount: 8000 },
              { label: "Receivable (customer)", amount: 4000 },
            ],
            credits: [
              { label: "Equipment", amount: 12000 },
              { label: "Rent", amount: 3000 },
              { label: "Payable (supplier)", amount: 2000 },
              { label: "Balance c/d", amount: 45000 },
            ],
          },
        } },
      ],
      check: {
        q: "A receivables (trade receivables) account has debit entries of $9,000 and a credit entry of $4,000 (cash received). What is its balance, and on which side is it brought down?",
        options: [
          "$13,000 credit balance, brought down on the credit side",
          "$5,000 debit balance, brought down on the debit side",
          "$5,000 credit balance, brought down on the credit side",
          "$4,000 debit balance, brought down on the debit side",
        ],
        correct: 1,
        explain: "Debits $9,000 minus credits $4,000 = $5,000. Receivables is an asset, and DEAD tells us assets carry a debit balance — so the $5,000 is brought down on the debit side. It represents $5,000 still owed by customers.",
      },
    },
    {
      id: "ledgers-books",
      heading: "Ledgers and books of prime entry",
      blocks: [
        { kind: "text", md: "A real business has thousands of transactions, so it does not post each one straight into the ledger. It first lists them in a **book of prime entry** — a diary of one kind of transaction — and then posts the **totals** into the ledger accounts. This keeps the ledger tidy and spreads the work." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The main books of prime entry",
          caption: "Each book gathers one type of transaction before it reaches the ledger.",
          data: {
            items: [
              { title: "Sales day book", sub: "credit sales — from sales invoices sent out" },
              { title: "Purchases day book", sub: "credit purchases — from invoices received" },
              { title: "Cash book", sub: "all money in and out of bank and cash" },
              { title: "Returns day books", sub: "goods returned in (sales) and out (purchases)" },
              { title: "The journal", sub: "anything unusual — adjustments, corrections, opening entries" },
            ],
          },
        } },
        { kind: "text", md: "From the books of prime entry, postings flow into the **ledgers**. There are three you must know:" },
        { kind: "table", caption: "The three ledgers", head: ["Ledger", "Also called", "What it holds"], rows: [
          ["General ledger", "Nominal ledger", "Every account used in the financial statements — assets, liabilities, capital, income, expenses. The trial balance is drawn from here."],
          ["Receivables ledger", "Sales ledger", "A separate account for each credit customer — how much each one owes."],
          ["Payables ledger", "Purchases ledger", "A separate account for each credit supplier — how much is owed to each one."],
        ] },
        { kind: "callout", tone: "tip", title: "Memory vs machinery", md: "The **general (nominal) ledger** is part of the double-entry system — its balances build the trial balance. The receivables and payables ledgers are usually **memorandum** records: personal detail (who owes what) sitting behind the single Receivables and Payables control accounts in the general ledger." },
        { kind: "text", md: "So the chain runs: a **source document** (an invoice or receipt) is written up in a **book of prime entry**, its figures are **posted as double entry to the ledger accounts**, and finally every ledger balance is listed in the **trial balance**. Each link preserves the debits-equal-credits rule, so an error shows up rather than hiding." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "From transaction to trial balance",
          caption: "The one-way street every figure travels down.",
          data: {
            steps: [
              { label: "Source document", sub: "invoice, receipt, cheque stub" },
              { label: "Book of prime entry", sub: "day book, cash book, journal" },
              { label: "Ledger accounts", sub: "post the double entry" },
              { label: "Trial balance", sub: "list every balance" },
            ],
          },
        } },
      ],
      check: {
        q: "A credit sale to a customer is first recorded in which book of prime entry?",
        options: [
          "The cash book",
          "The purchases day book",
          "The sales day book",
          "The journal",
        ],
        correct: 2,
        explain: "Credit sales — goods sold now, cash later — are listed in the sales day book, written up from the sales invoices sent out. The cash book records money actually received or paid; the purchases day book is for credit purchases; the journal is for one-off adjustments. (Only when the customer pays does the receipt reach the cash book.)",
      },
    },
    {
      id: "trial-balance",
      heading: "The trial balance",
      blocks: [
        { kind: "text", md: "Once every account is balanced off, we list all the balances in two columns — debits and credits — and add them up. This is the **trial balance**. If double-entry has been done correctly, the two columns are **equal**, because every transaction put a debit somewhere and an equal credit somewhere." },
        { kind: "example", title: "Worked example — build the trial balance", scenario: "Post these eight transactions and extract the trial balance: (1) owner pays in $50,000; (2) $8,000 loan received; (3) equipment $12,000 bought by bank; (4) goods $5,000 bought on credit; (5) goods sold $9,000 on credit; (6) rent $3,000 paid by bank; (7) $4,000 received from a customer; (8) $2,000 paid to a supplier.", steps: [
          { label: "Bank balance", detail: "In: 50,000 + 8,000 + 4,000 = 62,000. Out: 12,000 + 3,000 + 2,000 = 17,000. → $45,000 debit." },
          { label: "Receivables balance", detail: "Sale 9,000 (Dr) − cash 4,000 (Cr) = $5,000 debit." },
          { label: "Payables balance", detail: "Purchase 5,000 (Cr) − payment 2,000 (Dr) = $3,000 credit." },
          { label: "The rest", detail: "Equipment $12,000 Dr; Purchases $5,000 Dr; Rent $3,000 Dr; Capital $50,000 Cr; Loan $8,000 Cr; Sales $9,000 Cr." },
        ], result: "Debits: 45,000 + 5,000 + 12,000 + 5,000 + 3,000 = $70,000. Credits: 3,000 + 50,000 + 8,000 + 9,000 = $70,000. The columns agree — $70,000 each." },
        { kind: "table", caption: "Trial balance as at the period end", head: ["Account", "Debit ($)", "Credit ($)"], rows: [
          ["Bank", "45,000", ""],
          ["Receivables", "5,000", ""],
          ["Equipment", "12,000", ""],
          ["Purchases", "5,000", ""],
          ["Rent", "3,000", ""],
          ["Capital", "", "50,000"],
          ["Loan", "", "8,000"],
          ["Payables", "", "3,000"],
          ["Sales", "", "9,000"],
          ["Total", "70,000", "70,000"],
        ] },
        { kind: "callout", tone: "warn", title: "What a trial balance does NOT prove", md: "Agreeing totals prove only that debits **equalled** credits — not that the books are **right**. A transaction posted to the wrong account, omitted entirely, or entered with the debit and credit reversed can all leave the trial balance in perfect balance. It catches arithmetic slips, not errors of judgement." },
        { kind: "text", md: "The trial balance is the launch pad for the financial statements. From it we make year-end **adjustments** (accruals, prepayments, depreciation, irrecoverable debts) and then draft the statement of profit or loss and the statement of financial position — completing the loop that began with a single source document." },
        { kind: "diagram", diagram: {
          type: "cycle",
          title: "The accounting cycle",
          caption: "The repeating loop that turns raw transactions into financial statements.",
          data: {
            steps: [
              { label: "Transaction occurs" },
              { label: "Record in book of prime entry" },
              { label: "Post to the ledgers" },
              { label: "Extract the trial balance" },
              { label: "Make year-end adjustments" },
              { label: "Prepare financial statements" },
            ],
          },
        } },
      ],
      check: {
        q: "A bookkeeper posts a $500 electricity bill by debiting the rent account instead of the electricity account (credit to bank is correct). What happens to the trial balance?",
        options: [
          "The debit column exceeds the credit column by $500",
          "The credit column exceeds the debit column by $500",
          "It still balances — the error is undetected",
          "Both totals rise by $500",
        ],
        correct: 2,
        explain: "The debit is the right amount on the right side — it is just in the wrong account (an error of commission). Total debits are unchanged, so the trial balance still agrees. This is exactly why a balanced trial balance does not guarantee correct books.",
      },
    },
  ],
  examTraps: [
    { trap: "Thinking a debit always means 'money out' or 'bad'.", fix: "A debit is just the left side. Debits INCREASE assets, expenses and drawings (DEAD). Receiving cash is a debit to bank." },
    { trap: "Posting from the bank statement's viewpoint.", fix: "Your statement calls a deposit a 'credit' because it's the bank's liability. In your books the bank is an asset, so money in is a DEBIT." },
    { trap: "Recording only one side of a transaction.", fix: "Duality means every transaction needs a debit AND an equal credit. One-sided entries break the equation." },
    { trap: "Believing a balanced trial balance proves the books are correct.", fix: "It only proves debits = credits. Omissions, wrong-account postings and reversed entries can all still balance." },
    { trap: "Confusing the cash book with the sales/purchases day books.", fix: "Day books record credit transactions from invoices; the cash book records actual money in and out of bank/cash." },
  ],
  keyTerms: [
    { term: "Accounting equation", def: "Assets = Capital + Liabilities — the identity that every transaction keeps in balance." },
    { term: "Duality", def: "The principle that every transaction has two equal and opposite effects, recorded as a debit and a credit." },
    { term: "Debit / credit", def: "The left and right sides of an account. Debits increase expenses, assets and drawings; credits increase liabilities, income and capital." },
    { term: "Book of prime entry", def: "A first-record diary for one type of transaction (sales/purchases day books, cash book, journal) before posting to the ledger." },
    { term: "Trial balance", def: "A list of all ledger balances in debit and credit columns; equal totals confirm debits matched credits, but not that entries are correct." },
  ],
  summary: [
    "The accounting equation — Assets = Capital + Liabilities — stays balanced after every transaction.",
    "Duality: every transaction has two equal, opposite sides, recorded as a debit and a matching credit.",
    "DEAD/CLIC: debits increase expenses, assets and drawings; credits increase liabilities, income and capital.",
    "Transactions flow from source document → book of prime entry → general/receivables/payables ledgers → trial balance.",
    "A trial balance proves debits equalled credits — not that the books are error-free — and launches the financial statements.",
  ],
}
