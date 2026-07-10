/*
 * Topic Briefs — the instruction layer of the Learn stage (2026-07-10).
 * Each brief opens a topic BEFORE any question: the concept in plain
 * language, the structures/formulas, worked examples, and the classic
 * traps (the same nameable errors the question distractors are built on).
 */

export interface TopicBrief {
  paper: string // "FA" | "FR"
  area: string // syllabus area code
  title: string // human title, e.g. "Double-entry & accounting systems"
  minutes: number // realistic reading time, 4-7
  /** Markdown-ish sections rendered in order. */
  sections: {
    kind: "concept" | "structure" | "example" | "traps"
    heading: string
    body: string // plain text with \n\n paragraphs; formulas as plain text lines; NO markdown syntax like ** or #
  }[]
}

export const TOPIC_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── FA — Financial Accounting ───────────────────────── */
  {
    paper: "FA",
    area: "A",
    title: "Context & purpose of financial reporting",
    minutes: 5,
    sections: [
      {
        kind: "concept",
        heading: "Why financial reporting exists",
        body: `Imagine you lend money to a friend's coffee shop. A year later you want to know one thing: how is my money doing? You cannot stand behind the counter every day, so you need a report — a fair, honest summary of what the business owns, what it owes, and whether it made a profit. That is financial reporting in one sentence: it lets people OUTSIDE a business see inside it.

The people who need this view are called users. Investors and lenders are the primary ones — they decide whether to buy shares or lend money — but suppliers, employees, customers, governments and the public all care too. Because managers run the business with other people's money, reporting is also about stewardship: showing the owners how well their resources have been looked after. This is why the statements are prepared to a common set of rules (IFRS Accounting Standards, issued by the IASB) rather than however each manager fancies.

It also helps to separate financial accounting from management accounting early. Financial accounting looks backwards, follows rules, and is prepared for outsiders, usually once a year. Management accounting looks forwards (budgets, forecasts), follows no external rules, and is prepared for insiders whenever they need it. FA is about the first kind.`,
      },
      {
        kind: "structure",
        heading: "The reporting toolkit",
        body: `Main financial statements and what each answers:
Statement of financial position — what does the business own and owe at a point in time?
Statement of profit or loss — what did it earn over the period?
Statement of cash flows — where did cash come from and go to?
Statement of changes in equity — how did the owners' interest move?
Notes — the detail and the accounting policies behind the numbers.

Primary users: existing and potential investors, lenders and other creditors.

Financial vs management accounting:
Financial — external users, annual, governed by IFRS, historical.
Management — internal users, any frequency, no external rules, forward-looking.

Regulation: IFRS Accounting Standards are issued by the IASB; national law (e.g. companies legislation) adds requirements such as audit for many companies.

Key idea: profit is measured on the accruals basis — income earned and expenses incurred — not on cash moving.`,
      },
      {
        kind: "example",
        heading: "Worked example — profit is not cash",
        body: `In its first month a new business: sells goods on credit for $10,000; collects $7,000 of that from customers; buys goods for cash costing $6,000, of which goods costing $4,000 are the ones sold; pays rent of $1,000.

Step 1 — profit (accruals basis):
Revenue earned = $10,000 (all sales made, regardless of cash collected)
Cost of sales = $4,000 (only the cost of goods actually sold)
Rent = $1,000
Profit = 10,000 − 4,000 − 1,000 = $5,000

Step 2 — cash movement:
Cash in 7,000 − cash out (6,000 + 1,000) = $0

Step 3 — statement of financial position proof:
Receivables 3,000 (10,000 − 7,000) + inventory 2,000 (6,000 − 4,000) + cash 0 = assets $5,000
Capital introduced 0 + retained profit 5,000 = $5,000. It balances.

The business made $5,000 profit and has not a single dollar in the bank — which is exactly why users need a full set of statements, not just one number.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Treating profit and cash as the same thing — a profitable business can still run out of cash.

Naming managers as the primary users of financial statements — the Framework says investors, lenders and other creditors; managers already have internal information.

Mixing up financial and management accounting — budgets and forecasts belong to management accounting, not the annual report.

Saying IFRS Accounting Standards are issued by IFAC or a government — they are issued by the IASB.

Assuming every business must be audited — audit requirements come from national law and typically apply to companies, not every small trader.`,
      },
    ],
  },
  {
    paper: "FA",
    area: "B",
    title: "Qualitative characteristics of financial information",
    minutes: 4,
    sections: [
      {
        kind: "concept",
        heading: "What makes information useful",
        body: `Suppose two reports land on your desk. One is a rambling, out-of-date estimate; the other is a clear, verifiable statement of what actually happened, delivered in time to act on it. You would use the second without thinking. The Conceptual Framework simply writes down WHY: it lists the qualities that make financial information worth having, so preparers and standard-setters have a shared yardstick.

The Framework splits these qualities into two ranks. Two are fundamental — without them the information is useless, full stop. Information must be relevant (capable of changing a user's decision) and it must faithfully represent what it claims to represent (the numbers reflect the real economics). Four more are enhancing — they make already-useful information better: comparability, verifiability, timeliness and understandability. Enhancing characteristics can be traded off; fundamental ones cannot.

Inside relevance sits one of the most examined ideas in the paper: materiality. Information is material if omitting, misstating or obscuring it could reasonably be expected to influence users' decisions. Materiality is entity-specific — a $10,000 error is a rounding difference to a multinational and a catastrophe to a corner shop — so there is no universal threshold, only judgement.

Finally, remember that quality has a price. The Framework accepts a cost constraint: information should only be demanded where the benefit to users justifies the cost of producing it. That is why small entities face lighter reporting requirements, and why perfect information is never the goal — decision-USEFUL information is.`,
      },
      {
        kind: "structure",
        heading: "The characteristics, ranked",
        body: `FUNDAMENTAL characteristics (must have both):
Relevance — predictive value and/or confirmatory value; includes materiality.
Faithful representation — complete, neutral, free from error (neutrality is supported by prudence: caution under uncertainty).

ENHANCING characteristics (make useful information more useful):
Comparability — like with like, across time and across entities.
Verifiability — independent observers could agree the depiction is faithful.
Timeliness — available in time to influence decisions.
Understandability — clear and concise for users with reasonable business knowledge.

Constraint: cost — the benefit of information should justify the cost of producing it.

Underlying assumption: going concern — statements assume the entity will continue for the foreseeable future.

Materiality test: could omitting, misstating or obscuring it influence the decisions of primary users? Judged by size AND nature.`,
      },
      {
        kind: "example",
        heading: "Worked example — applying materiality",
        body: `Harlow Co has draft profit before tax of $200,000. Its auditors treat misstatements above 5% of profit before tax as material.

Step 1 — set the threshold:
5% × 200,000 = $10,000

Step 2 — test error A: stationery of $800 was posted to the wrong expense account.
800 ÷ 200,000 = 0.4% — well below the threshold, and profit is unchanged anyway. Not material; no adjustment needed.

Step 3 — test error B: a $24,000 electricity accrual was omitted entirely.
24,000 ÷ 200,000 = 12% — above the threshold. Material; the accrual must be recognised.

Step 4 — corrected profit:
200,000 − 24,000 = $176,000

Note the judgement layer: even a tiny error can be material by NATURE — for example a $500 payment that turns a reported profit into a loss, a transaction with a director, or any misstatement that hides wrongdoing. Size is only half of the materiality test; the other half is what the item IS.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Listing comparability or timeliness as a fundamental characteristic — only relevance and faithful representation are fundamental.

Defining faithful representation as accuracy alone — it means complete, neutral and free from error, which is not the same as perfectly precise.

Treating materiality as a fixed percentage for every company — it is entity-specific and depends on nature as well as size.

Confusing prudence with deliberate understatement — prudence is caution under uncertainty, not building in hidden reserves.

Calling going concern a qualitative characteristic — it is the underlying assumption, a different part of the Framework.`,
      },
    ],
  },
  {
    paper: "FA",
    area: "C",
    title: "Double-entry & accounting systems",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Every transaction has two sides",
        body: `Here is the single most important idea in accounting: every transaction affects two things. Buy a van for cash and you gain a van but lose cash. Take a bank loan and you gain cash but gain a debt too. Double-entry bookkeeping simply records BOTH sides, every time, as a debit in one account and a credit in another. Because the two sides are always equal, the whole system stays in balance — and that balance is what makes errors detectable.

Behind this sits the accounting equation: assets = capital + liabilities. Everything the business owns was financed either by the owner (capital) or by someone else (liabilities). Every transaction, however exotic, just rearranges this equation without breaking it. Profit belongs to the owner, so income increases capital and expenses decrease it — which is why income and expense accounts behave like extensions of the capital account.

The system that captures all this has a standard shape. Transactions are first listed in books of prime entry (day books) — high-volume lists, not double entry yet. Totals are then posted to the nominal (general) ledger, where the real double entry lives. Personal ledgers track individual customers and suppliers, with control accounts in the nominal ledger summarising them. The whole machine exists so that thousands of transactions can be recorded quickly and still be provably complete.`,
      },
      {
        kind: "structure",
        heading: "The rules of the game",
        body: `The accounting equation:
Assets = Capital + Liabilities
Capital = opening capital + capital introduced + profit − drawings

Debits and credits:
DEBIT increases: assets, expenses, drawings.
CREDIT increases: liabilities, income, capital.
(Decreases are the opposite side.)

Books of prime entry and what they list:
Sales day book — credit sales. Purchase day book — credit purchases.
Sales returns day book — returns in. Purchase returns day book — returns out.
Cash book — all bank/cash receipts and payments. Petty cash book — small cash items.
Journal — everything else (corrections, depreciation, one-offs).

Ledgers:
Nominal (general) ledger — the double-entry accounts.
Receivables ledger / payables ledger — one account per customer/supplier (memorandum).
Control accounts in the nominal ledger summarise the personal ledgers.

Balancing an account: total both sides; the difference is the balance carried down.`,
      },
      {
        kind: "example",
        heading: "Worked example — four transactions, one balanced business",
        body: `Mia starts a business. Record each transaction, then prove the equation.

1) Mia pays $10,000 of her own money into the business bank account.
Dr Bank 10,000, Cr Capital 10,000

2) Buys goods on credit for $3,000.
Dr Purchases (inventory) 3,000, Cr Payables 3,000

3) Sells goods for $5,000 cash; the goods sold had cost $2,000.
Dr Bank 5,000, Cr Sales 5,000 (the $2,000 cost becomes cost of sales)

4) Pays the supplier $1,000.
Dr Payables 1,000, Cr Bank 1,000

Step-by-step balances:
Bank = 10,000 + 5,000 − 1,000 = $14,000
Inventory remaining = 3,000 − 2,000 = $1,000
Payables = 3,000 − 1,000 = $2,000
Profit = sales 5,000 − cost of sales 2,000 = $3,000
Capital = 10,000 + 3,000 = $13,000

Prove the equation:
Assets = 14,000 + 1,000 = $15,000
Capital + liabilities = 13,000 + 2,000 = $15,000. It balances — as it always must.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Reversing the entry — debiting bank when cash is paid out, or crediting an expense when it is incurred.

Treating a book of prime entry as part of the double entry — day books are lists; the double entry happens when totals are posted to the ledger.

Forgetting that drawings reduce capital rather than being an expense in profit or loss.

Putting credit sales through the cash book — they belong in the sales day book until cash is received.

Confusing the receivables ledger (one account per customer) with the receivables control account (one summary account in the nominal ledger).`,
      },
    ],
  },
  {
    paper: "FA",
    area: "D",
    title: "Recording transactions & events",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "From bookkeeping to real events",
        body: `Once you can do double entry, the question becomes: what exactly do we record, and when? Real businesses buy machines that last ten years, collect sales tax for the government, get invoices after the year end for electricity already used, and sell to customers who never pay. This area is the toolkit for those everyday events — and it supplies most of the marks in the FA exam.

The thread joining every topic here is the accruals concept: record income when it is EARNED and expenses when they are INCURRED, not when cash moves. Depreciation spreads the cost of a non-current asset over the years that benefit from it. Accruals and prepayments shift expenses into the period they belong to. The inventory adjustment makes sure this year's cost of sales contains only this year's goods. Irrecoverable debts recognise that some earned income will never turn into cash.

Sales tax adds one more idea: the business is only a collector. Tax charged on sales (output tax) is owed to the authorities; tax paid on purchases (input tax) is claimed back; only the difference is paid over. So sales and purchases are recorded NET of tax, and the tax itself sits in a liability account, never in profit or loss.`,
      },
      {
        kind: "structure",
        heading: "The formulas that carry this area",
        body: `Sales tax:
Net = gross ÷ (1 + tax rate). Tax = gross − net.
Record sales and purchases net; the sales tax account is a liability (usually).

Depreciation:
Straight line = (cost − residual value) ÷ useful life.
Reducing balance = carrying amount × percentage.
Carrying amount = cost − accumulated depreciation.
Profit or loss on disposal = proceeds − carrying amount at disposal.

Accruals and prepayments:
Expense for the year = cash paid + closing accrual − opening accrual.
Expense for the year = cash paid − closing prepayment + opening prepayment.
Accrual = current liability. Prepayment = current asset.

Inventory (IAS 2):
Value at the LOWER of cost and net realisable value (NRV).
NRV = selling price − costs to complete − costs to sell.

Receivables:
Write off irrecoverable debts first, THEN calculate any allowance on the remainder.
Only the MOVEMENT in the allowance goes to profit or loss.`,
      },
      {
        kind: "example",
        heading: "Worked example — depreciation and disposal",
        body: `Rono Co buys a machine on 1 January 20X1 for $20,000. Residual value is estimated at $2,000 and useful life at 6 years, straight line. On 31 December 20X4 (after exactly 4 years) the machine is sold for $9,500.

Step 1 — annual depreciation:
(20,000 − 2,000) ÷ 6 = $3,000 per year

Step 2 — accumulated depreciation at disposal:
3,000 × 4 years = $12,000

Step 3 — carrying amount at disposal:
20,000 − 12,000 = $8,000

Step 4 — profit or loss on disposal:
Proceeds 9,500 − carrying amount 8,000 = $1,500 PROFIT on disposal.

Step 5 — the ledger view:
Dr Bank 9,500; Dr Accumulated depreciation 12,000; Cr Machine cost 20,000; Cr Profit on disposal 1,500. The entry balances (21,500 each side), which is your built-in arithmetic check.

Notice the residual value did two jobs: it reduced each year's charge, and it explains why the carrying amount never depreciates to nil.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Multiplying the gross (tax-inclusive) figure by the tax rate instead of dividing by one-plus-the-rate to find the net amount.

Forgetting to deduct residual value in straight-line depreciation — or deducting it in the reducing-balance method, which never uses it.

Adding the accrual instead of subtracting it (or the reverse) when converting cash paid into the expense for the year.

Valuing inventory at selling price, or at cost when NRV has fallen below it.

Calculating the receivables allowance before removing irrecoverable debts, and charging the whole closing allowance to profit or loss instead of just the movement.`,
      },
    ],
  },
  {
    paper: "FA",
    area: "E",
    title: "Preparing a trial balance",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "The system checks itself",
        body: `If every transaction is recorded with equal debits and credits, then the total of all debit balances in the ledger must equal the total of all credit balances. The trial balance is simply that test: list every account balance in two columns and see whether they agree. If they do not, something has gone mechanically wrong — a one-sided posting, a transposed figure, an addition slip — and we know to hunt for it.

But here is the subtlety examiners love: a balanced trial balance does NOT mean the books are correct. Whole categories of error leave the columns in perfect agreement — a transaction omitted entirely, an amount posted to the wrong account, or a debit and credit simply swapped. Balancing proves equality, not accuracy.

When the trial balance does disagree, we park the difference in a suspense account so that draft statements can be prepared while the errors are traced. Each error found is corrected with a journal entry; errors that caused the imbalance clear part of the suspense balance, and when every one is fixed the suspense account closes to nil. The same self-checking spirit drives two other reconciliations in this area: agreeing control accounts to the personal ledgers, and agreeing the cash book to the bank statement.`,
      },
      {
        kind: "structure",
        heading: "Errors, suspense and reconciliations",
        body: `Errors NOT revealed by a trial balance (it still balances):
Omission — transaction left out entirely.
Commission — right amount, wrong account of the SAME type.
Principle — right amount, wrong TYPE of account (e.g. expense posted as an asset).
Original entry — wrong amount used on both sides.
Complete reversal — debit and credit swapped.
Compensating — two errors that cancel.

Errors that DO throw the trial balance out: one-sided postings, two debits or two credits, transposition on one side only, addition errors.

Suspense account: opened for the difference; debit suspense if credits exceed debits, credit suspense if debits exceed credits. Corrections clear it; it must end at nil.

Bank reconciliation:
Adjust the CASH BOOK for: bank charges, direct debits/standing orders, dishonoured cheques, cash book errors.
Adjust the BANK STATEMENT for timing only: unpresented cheques (deduct), outstanding lodgements (add).

Control account reconciliation: correct the control account for ledger-side errors, correct the list of balances for personal-ledger errors, until they agree.`,
      },
      {
        kind: "example",
        heading: "Worked example — clearing a suspense account",
        body: `Tavey Co's trial balance shows total debits of $100,000 and total credits of $99,100. A suspense account is opened with a CREDIT of $900 so the columns agree. Investigation finds two errors.

Error 1: a cash sale of $300 was debited to bank but never posted to the sales account.
Correction: Dr Suspense 300, Cr Sales 300.

Error 2: an electricity bill of $300 was correctly credited to bank but was debited to the electricity account as $900 (a transposition), overstating debits by $600.
Correction: Dr Suspense 600, Cr Electricity 600.

Step-by-step suspense account:
Opening credit balance = 900
Less Dr from error 1 = 900 − 300 = 600
Less Dr from error 2 = 600 − 600 = 0. Cleared.

Effect on profit: sales rise by $300 and electricity expense falls by $600, so profit increases by 300 + 600 = $900.

Check the logic: debits originally exceeded credits by 300 (missing sales credit) + 600 (excess electricity debit) = $900 — exactly the suspense balance. Every suspense question can be sanity-checked this way.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Assuming a balanced trial balance means the records are error-free — six whole classes of error leave it balanced.

Opening the suspense account on the wrong side — the suspense entry fills the SMALLER column.

Correcting an error of commission or omission through the suspense account — errors that never unbalanced the books do not touch suspense.

Adjusting the cash book for unpresented cheques or outstanding lodgements — those are timing items that belong on the bank statement side.

Forgetting that a correction can change profit — sales, purchases and expense corrections flow straight into the statement of profit or loss.`,
      },
    ],
  },
  {
    paper: "FA",
    area: "F",
    title: "Preparing basic financial statements",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "From trial balance to statements",
        body: `Everything so far has been preparation. This area is the payoff: taking a trial balance, applying the year-end adjustments, and producing the two statements that summarise the business — the statement of profit or loss (performance over the period) and the statement of financial position (position at the year end). Every FA exam builds questions from this journey, because it forces you to know where every balance lands.

The routine is always the same. Start with the trial balance. Apply the adjustments given in the question — closing inventory, depreciation, accruals, prepayments, irrecoverable debts and allowances, tax. Each adjustment has TWO effects, one in each statement: closing inventory reduces cost of sales AND appears as a current asset; an accrual increases an expense AND appears as a current liability. Miss one side and your statement of financial position will not balance.

For a company (rather than a sole trader) the same statements gain some formality: share capital and share premium replace the owner's capital account, retained earnings accumulate undistributed profits, dividends paid reduce retained earnings rather than being an expense, and a statement of changes in equity tracks the movements. FA also introduces the statement of cash flows, which reorganises the same events by cash effect rather than by accrual.`,
      },
      {
        kind: "structure",
        heading: "The proformas and where things go",
        body: `Statement of profit or loss:
Revenue − cost of sales = gross profit
Gross profit − operating expenses + other income = profit before tax
Profit before tax − income tax expense = profit for the year

Cost of sales = opening inventory + purchases (+ carriage inwards) − closing inventory.
Carriage OUTWARDS is a selling expense, not cost of sales.

Statement of financial position:
Non-current assets (at carrying amount) + current assets (inventory, receivables less allowance, prepayments, cash)
= Equity (share capital + share premium + retained earnings) + non-current liabilities + current liabilities (payables, accruals, tax payable).

Each adjustment hits both statements:
Closing inventory — reduces cost of sales / current asset.
Depreciation — expense / reduces carrying amount.
Accrual — add to expense / current liability.
Prepayment — deduct from expense / current asset.
Irrecoverable debt — expense / reduces receivables.

Dividends paid — statement of changes in equity, never profit or loss.`,
      },
      {
        kind: "example",
        heading: "Worked example — a full mini statement of profit or loss",
        body: `Petra's trial balance shows: sales $100,000; opening inventory $8,000; purchases $60,000; rent paid $12,000; wages paid $15,000. Adjustments: closing inventory is $10,000; rent includes $2,000 paid in advance for next year; wages of $1,000 for the last week of the year are unpaid.

Step 1 — cost of sales:
8,000 + 60,000 − 10,000 = $58,000

Step 2 — gross profit:
100,000 − 58,000 = $42,000

Step 3 — rent expense (remove the prepayment):
12,000 − 2,000 = $10,000

Step 4 — wages expense (add the accrual):
15,000 + 1,000 = $16,000

Step 5 — profit for the year:
42,000 − 10,000 − 16,000 = $16,000

Step 6 — the other statement: closing inventory $10,000 and the prepayment $2,000 appear as current assets; the accrual $1,000 appears as a current liability. Every adjustment landed twice — once in each statement.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Adding closing inventory to cost of sales instead of deducting it (or deducting opening inventory).

Adjusting the expense for an accrual or prepayment but forgetting the matching liability or asset in the statement of financial position.

Putting carriage outwards into cost of sales — only carriage inwards belongs there.

Showing dividends paid as an expense in profit or loss instead of a deduction in the statement of changes in equity.

Listing revenue or the year's depreciation charge in the statement of financial position — performance items live in profit or loss; only balances live in the position statement.`,
      },
    ],
  },
  {
    paper: "FA",
    area: "G",
    title: "Simple consolidated financial statements",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Two companies, one story",
        body: `When one company (the parent) controls another (the subsidiary), the legal picture shows two separate companies — but the economic reality is a single business run by one management team. Consolidated financial statements report that reality: they combine the parent and subsidiary line by line, as if the group were one entity. Control normally means owning more than half the voting shares.

Two adjustments make the combination honest. First, the parent's investment in the subsidiary and the subsidiary's share capital and pre-acquisition reserves are not added across — they are replaced by goodwill, the premium paid above the fair value of the identifiable net assets acquired. Second, anything the group did with ITSELF must vanish: intragroup sales, intragroup balances, and any profit sitting in inventory that one group company bought from another (the provision for unrealised profit, or PURP). You cannot make a profit trading with yourself.

If the parent owns less than 100%, outside shareholders own the rest of the subsidiary. Their slice is the non-controlling interest (NCI). Crucially, consolidation still adds 100% of the subsidiary's assets, liabilities, income and expenses — control is all-or-nothing — and the NCI line then shows how much of the resulting equity and profit belongs to those outsiders.`,
      },
      {
        kind: "structure",
        heading: "The consolidation mechanics",
        body: `Goodwill at acquisition:
Goodwill = consideration transferred + NCI at acquisition − fair value of identifiable net assets acquired.
NCI at acquisition is measured either at FAIR VALUE (full goodwill) or at the NCI share of net assets (proportionate goodwill).

Consolidated statement of profit or loss:
Add 100% of parent + 100% of subsidiary, line by line.
Remove intragroup sales from BOTH revenue and cost of sales.
Deduct PURP from cost of sales (via the seller's results).

PURP (profit still in group inventory):
Margin: profit = selling price × margin %.
Mark-up: profit = selling price × mark-up ÷ (100 + mark-up).
PURP = that profit × proportion still held in inventory.

Consolidated statement of financial position:
Assets and liabilities: parent + subsidiary in full (no investment line, no intragroup balances).
Equity: parent's share capital only + group retained earnings + NCI.
Group retained earnings = parent's + parent's share of subsidiary's POST-acquisition profits − PURP (if parent is seller).

NCI share of profit for the year = NCI % × subsidiary's adjusted profit.`,
      },
      {
        kind: "example",
        heading: "Worked example — goodwill, revenue and PURP",
        body: `On 1 January, Pine Co buys 80% of Slate Co for $100,000. The NCI is measured at its fair value of $24,000. The fair value of Slate's identifiable net assets at acquisition is $110,000. During the year Pine sells goods to Slate for $20,000 at a 25% margin; half of these goods are still in Slate's inventory at the year end. Revenue for the year: Pine $500,000, Slate $300,000.

Step 1 — goodwill:
100,000 + 24,000 − 110,000 = $14,000

Step 2 — consolidated revenue:
500,000 + 300,000 − 20,000 intragroup = $780,000

Step 3 — unrealised profit (PURP):
Profit in the intragroup sale = 20,000 × 25% = 5,000
Still in inventory = half, so PURP = 5,000 × 1/2 = $2,500
Add $2,500 to consolidated cost of sales and deduct it from group inventory (Pine is the seller, so it reduces group retained earnings, not NCI).

Step 4 — sense check: NCI at fair value means the goodwill of $14,000 is FULL goodwill, covering both owners. Had NCI been measured proportionately (20% × 110,000 = 22,000), goodwill would be 100,000 + 22,000 − 110,000 = $12,000.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Consolidating only the parent's share of the subsidiary's revenue and expenses — control means 100% is added, with NCI shown separately.

Using proportionate goodwill when the question says NCI is at fair value (or vice versa).

Forgetting to remove intragroup sales from both revenue and cost of sales — removing one side double-counts.

Calculating PURP on the whole intragroup sale instead of only the goods still in inventory.

Confusing margin with mark-up — 25% margin on a $20,000 sale is $5,000, but 25% mark-up is 20,000 × 25 ÷ 125 = $4,000.

Including the subsidiary's PRE-acquisition profits in group retained earnings — only post-acquisition profits belong to the group.`,
      },
    ],
  },
  {
    paper: "FA",
    area: "H",
    title: "Interpretation of financial statements",
    minutes: 5,
    sections: [
      {
        kind: "concept",
        heading: "Making the numbers talk",
        body: `A statement of profit or loss tells you a company made $60,000. Is that good? You cannot say — not until you compare it with something. Interpretation is the craft of turning raw figures into judgements by computing ratios and comparing them: against last year, against a competitor, against an industry average. A ratio on its own is a number; a ratio in context is an insight.

Ratios cluster around the questions users actually ask. Profitability ratios ask: how well does the business turn activity into profit? Liquidity ratios ask: can it pay its bills as they fall due? Efficiency (or activity) ratios ask: how hard are its assets working — how fast does inventory sell, how quickly do customers pay? Gearing asks: how much of the business is financed by debt, and how risky is that?

The examiner's favourite twist is interpretation, not calculation: given a movement in a ratio, choose the most plausible cause, or predict how a transaction shifts a ratio. The skill is to think through the fraction — what happens to the top, what happens to the bottom — rather than memorising outcomes. Paying a supplier from cash, for instance, shrinks both sides of the current ratio, which PUSHES the ratio further from 1 in whichever direction it already leans.`,
      },
      {
        kind: "structure",
        heading: "The core ratio set",
        body: `Profitability:
Gross profit margin = gross profit ÷ revenue × 100
Operating (net) profit margin = operating profit ÷ revenue × 100
ROCE = operating profit ÷ capital employed × 100, where capital employed = equity + non-current borrowings.

Liquidity:
Current ratio = current assets ÷ current liabilities
Quick (acid-test) ratio = (current assets − inventory) ÷ current liabilities

Efficiency:
Receivables collection period = trade receivables ÷ credit sales × 365 days
Inventory holding period = inventory ÷ cost of sales × 365 days
Payables payment period = trade payables ÷ credit purchases × 365 days

Gearing:
Gearing = debt ÷ (debt + equity) × 100 (or debt ÷ equity — read the question).

Reading a movement: work the fraction. Anything that raises the numerator or lowers the denominator raises the ratio, and vice versa.`,
      },
      {
        kind: "example",
        heading: "Worked example — a quick ratio profile",
        body: `Extracts from Larkin Co: revenue (all on credit) $200,000; gross profit $60,000; inventory $15,000; trade receivables $20,000; cash $10,000; current liabilities $30,000.

Step 1 — gross profit margin:
60,000 ÷ 200,000 × 100 = 30%

Step 2 — cost of sales (needed for inventory days):
200,000 − 60,000 = $140,000

Step 3 — current ratio:
Current assets = 15,000 + 20,000 + 10,000 = 45,000
45,000 ÷ 30,000 = 1.5 : 1

Step 4 — quick ratio:
(45,000 − 15,000) ÷ 30,000 = 30,000 ÷ 30,000 = 1.0 : 1

Step 5 — receivables collection period:
20,000 ÷ 200,000 × 365 = 36.5 days

Step 6 — inventory holding period:
15,000 ÷ 140,000 × 365 = 39.1 days

Reading: margins of 30% with a quick ratio of exactly 1.0 and customers paying in about five weeks — a business that looks profitable and just-adequately liquid. Whether that is GOOD still depends on the comparator: last year's figures, a close competitor, and the industry norm. A supermarket would be delighted with 30% margins; a jeweller would be alarmed.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Dividing inventory days by revenue instead of cost of sales — inventory is carried at cost, so the denominator must be cost of sales.

Forgetting to exclude inventory from the quick ratio — that is the whole point of the acid test.

Using profit AFTER tax and interest in ROCE — ROCE uses operating profit (profit before interest and tax) over equity plus long-term debt.

Judging a ratio in isolation — a current ratio of 1.5 means little without a comparator or trend.

Assuming a rising current ratio is always good — it may signal unsold inventory piling up or uncollected receivables.`,
      },
    ],
  },

  /* ───────────────────────── FR — Financial Reporting ───────────────────────── */
  {
    paper: "FR",
    area: "A",
    title: "The conceptual & regulatory framework",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Principles before rules",
        body: `You met the Conceptual Framework in FA as a list of qualitative characteristics. In FR it becomes something more powerful: the reasoning engine behind every standard. When a transaction is unusual — a sale that is really a loan, an obligation with no invoice attached — the Framework tells you how to think: identify the elements (assets, liabilities, equity, income, expenses), test recognition, choose a measurement basis, and above all report the economic SUBSTANCE of the arrangement rather than its legal form.

Substance over form is the idea FR examines hardest. A transaction's paperwork can say 'sale' while its economics say 'secured borrowing'. Faithful representation demands we account for what actually happened to risks and rewards, not what the contract is labelled. This principle is why a sale-and-repurchase agreement is booked as a loan, and why standards such as IFRS 15 and IFRS 16 are built around control rather than legal title.

The regulatory side gives the principles teeth. The IFRS Foundation oversees the IASB, which issues IFRS Accounting Standards after public due process; the IFRS Interpretations Committee handles ambiguities. A principles-based system like IFRS relies on judgement guided by the Framework, in contrast to rules-based regimes that try to legislate for every case — and inevitably invite structuring around the rules.`,
      },
      {
        kind: "structure",
        heading: "Definitions, recognition and measurement",
        body: `Element definitions (2018 Framework):
Asset — a present economic resource controlled by the entity as a result of past events; an economic resource is a right with the potential to produce economic benefits.
Liability — a present obligation to transfer an economic resource as a result of past events.
Equity — assets minus liabilities. Income and expenses — changes in assets/liabilities other than from owners.

Recognition: recognise an element when doing so gives users RELEVANT information that FAITHFULLY REPRESENTS the item (subject to cost). Probability and reliable measurement feed into that judgement rather than being standalone hurdles.

Measurement bases:
Historical cost. Fair value — exit price in an orderly transaction between market participants. Value in use — present value of expected cash flows. Current cost.

Substance over form checkpoints: who controls the asset? who bears the risks and enjoys the rewards? is there an unavoidable obligation?

Standard-setting chain: IFRS Foundation (oversight) → IASB (issues standards) → IFRS Interpretations Committee (interpretations).`,
      },
      {
        kind: "example",
        heading: "Worked example — a sale that is really a loan",
        body: `Kelwick Co 'sells' inventory with a carrying amount of $400,000 to a bank for $400,000 cash, and must repurchase it in exactly two years for $484,000. Kelwick keeps the goods in its own warehouse throughout.

Step 1 — substance: Kelwick retains the risks and rewards of the inventory and is obliged to buy it back, so no sale has occurred. The cash received is a secured LOAN with the inventory as collateral.

Step 2 — find the effective interest rate:
484,000 ÷ 400,000 = 1.21 over two years.
The annual rate r satisfies (1 + r)² = 1.21, so 1 + r = 1.1, giving r = 10%.

Step 3 — accounting at inception:
Dr Cash 400,000, Cr Loan 400,000. Inventory stays on the books at $400,000. No revenue.

Step 4 — year 1:
Finance cost = 400,000 × 10% = $40,000. Loan balance = $440,000.

Step 5 — year 2:
Finance cost = 440,000 × 10% = $44,000. Loan balance = 440,000 + 44,000 = $484,000 — exactly the repurchase price, which extinguishes the loan. Total finance cost of $84,000 replaces the fake 'profit on sale' the legal form would have shown.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Recognising revenue on a sale-and-repurchase arrangement — the substance is a secured loan, so inventory stays on the books and a liability is recognised.

Quoting the old liability definition ('expected outflow of economic benefits') — the current Framework says a present OBLIGATION to TRANSFER an economic resource.

Treating probability and reliable measurement as absolute recognition criteria — under the 2018 Framework recognition rests on relevance and faithful representation.

Defining fair value as an entry price or entity-specific value — it is the EXIT price market participants would agree at the measurement date.

Saying the IFRS Interpretations Committee or IFRS Foundation issues the standards — the IASB does.`,
      },
    ],
  },
  {
    paper: "FR",
    area: "B",
    title: "Accounting for transactions (IFRS)",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "The standards toolkit",
        body: `This is the widest area of FR: a set of IFRS Accounting Standards, each solving one recurring measurement problem. How much of an asset's cost do we capitalise (IAS 16, IAS 23, IAS 38)? What if its value collapses (IAS 36)? When is revenue earned (IFRS 15)? Is that rental contract really an asset and a debt (IFRS 16)? When does an uncertain obligation become a liability (IAS 37)? The exam mixes these freely, so the skill is recognising WHICH standard a scenario is invoking.

Two themes tie the toolkit together. The first is control and obligation, inherited from the Framework: IFRS 15 recognises revenue when CONTROL of a good or service passes; IFRS 16 puts a right-of-use asset and a lease liability on the lessee's books because signing the lease creates a controlled resource and an unavoidable obligation. The second is time value: money promised later is worth less than money now, so leases, provisions settled far in the future, and loan notes issued at a discount are all measured using present values and unwound using effective interest.

Do not try to memorise the standards as isolated lists. Learn each one's trigger question and its single core calculation — that combination answers most OT questions, and the structure section below is exactly that map.`,
      },
      {
        kind: "structure",
        heading: "One line per standard",
        body: `IAS 16 PPE — capitalise costs directly attributable to bringing the asset to use (incl. dismantling obligations); revaluation gains go to OCI (revaluation surplus), losses to P/L unless reversing a surplus.
IAS 23 — CAPITALISE borrowing costs on qualifying assets during construction; deduct investment income on surplus borrowed funds.
IAS 38 — research is EXPENSED; development is capitalised only once all criteria are met (probable benefits, intention, resources, ability, measurable, feasible).
IAS 36 — impair when carrying amount exceeds recoverable amount = HIGHER of fair value less costs of disposal and value in use.
IAS 40 — investment property: fair value model takes gains/losses to P/L (not OCI).
IFRS 15 — five steps: contract → performance obligations → transaction price → allocate (by standalone selling prices) → recognise when/as obligations are satisfied. Agent recognises commission only.
IFRS 16 — lease liability = PV of lease payments; right-of-use asset = liability + payments before commencement + initial direct costs + restoration estimate. Interest unwinds; asset depreciates.
IAS 37 — provision needs present obligation + probable outflow + reliable estimate; large populations use expected values.
IAS 10 — adjusting events give evidence of conditions AT the year end; non-adjusting events are disclosed only.
IFRS 9 — amortised cost: opening + effective interest − cash paid = closing.
IAS 12 — deferred tax = (carrying amount − tax base) × tax rate; CA above tax base of an asset → liability.
IAS 20 — grants matched to related costs; deferred income released over the asset's life.`,
      },
      {
        kind: "example",
        heading: "Worked example — a lease from day one",
        body: `On 1 January 20X5 Selden Co leases a machine for 4 years at $50,000 per annum, payable in arrears each 31 December. The interest rate implicit in the lease is 8% (4-year annuity factor 3.312). Selden pays initial direct costs of $4,400.

Step 1 — lease liability at commencement:
50,000 × 3.312 = $165,600

Step 2 — right-of-use asset:
165,600 + 4,400 initial direct costs = $170,000

Step 3 — depreciation for 20X5 (shorter of lease term and useful life; here 4 years):
170,000 ÷ 4 = $42,500

Step 4 — finance cost for 20X5:
165,600 × 8% = $13,248

Step 5 — liability at 31 December 20X5:
165,600 + 13,248 − 50,000 = $128,848

Step 6 — total P/L charge for 20X5:
42,500 + 13,248 = $55,748

Notice the shape: the total expense is front-loaded (interest is highest in year 1) even though the cash rental is flat — exactly the pattern IFRS 16 intends.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Adding initial direct costs to the lease liability instead of the right-of-use asset.

Capitalising research, or capitalising development costs incurred BEFORE the IAS 38 criteria were met.

Taking a first-time revaluation gain to profit or loss instead of other comprehensive income — and doing the reverse for investment property under the fair value model.

Using the lower of fair value less costs of disposal and value in use as the recoverable amount — IAS 36 takes the HIGHER.

Recognising gross sales as revenue when the entity is an agent — only the commission is revenue.

Providing for future operating losses or unlikely lawsuits — IAS 37 requires a present obligation and a probable outflow, not mere expectation.`,
      },
    ],
  },
  {
    paper: "FR",
    area: "C",
    title: "Analysing & interpreting financial statements",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "From ratios to judgement",
        body: `FA taught you to compute ratios; FR expects you to argue with them. At this level the examiner gives you a scenario — a revaluation part-way through the year, a change of year end, an acquisition, a policy choice — and asks how it DISTORTS the comparison you are trying to make. The calculation is the easy 20%; the interpretation is the mark-scoring 80%.

The centrepiece is the ROCE relationship. Return on capital employed decomposes into two drivers: operating profit margin (how much profit each dollar of sales earns) multiplied by net asset turnover (how many dollars of sales each dollar of capital generates). Two companies can share the same ROCE with opposite business models — a jeweller with fat margins and slow turnover, a supermarket with thin margins and rapid turnover — so decomposition tells you WHERE performance changed, not just that it did. Whenever ROCE moves, your first question should be: was it the margin, the turnover, or the capital base?

Just as important are the limitations. Ratios compare accounting numbers, and accounting numbers depend on policies (cost vs revaluation), estimates (useful lives), one-off events, seasonality and deliberate window dressing around the year end. A good FR answer computes the ratio, then immediately asks: is this comparison fair, and what would make it misleading?`,
      },
      {
        kind: "structure",
        heading: "The analyst's formula sheet",
        body: `The key relationship:
ROCE = operating profit margin × net asset turnover
ROCE = operating profit (PBIT) ÷ capital employed × 100
Capital employed = equity + non-current borrowings (= total assets − current liabilities).
Net asset turnover = revenue ÷ capital employed.

Performance:
Gross margin = gross profit ÷ revenue. Operating margin = PBIT ÷ revenue.

Position and risk:
Gearing = debt ÷ (debt + equity), or debt ÷ equity — state which.
Interest cover = PBIT ÷ finance costs.
Quick ratio = (current assets − inventory) ÷ current liabilities.

Common distortions to name in answers:
Upward revaluation — capital employed rises, so ROCE and asset turnover FALL with no real change in performance.
Year-end choice/seasonality — a low-inventory year end flatters liquidity and inventory days.
Mid-year acquisition — full statement of financial position but only part-year profits.
Policy differences (cost vs revaluation, leasing) break comparability between companies.`,
      },
      {
        kind: "example",
        heading: "Worked example — decomposing ROCE",
        body: `Extracts from Varno Co: revenue $2,000,000; operating profit (PBIT) $240,000; equity $800,000; non-current borrowings $400,000.

Step 1 — capital employed:
800,000 + 400,000 = $1,200,000

Step 2 — ROCE:
240,000 ÷ 1,200,000 × 100 = 20%

Step 3 — operating profit margin:
240,000 ÷ 2,000,000 × 100 = 12%

Step 4 — net asset turnover:
2,000,000 ÷ 1,200,000 = 1.67 times (2,000 ÷ 1,200 = 1.6667)

Step 5 — prove the relationship:
12% × 1.6667 = 20% — margin times turnover reproduces ROCE.

Step 6 — gearing for the risk picture:
400,000 ÷ (400,000 + 800,000) = 33.3%

Reading: if next year ROCE falls to 16% because Varno revalues its properties upwards, nothing operational has changed — capital employed grew. The decomposition would show margin steady at 12% and turnover falling, pointing you straight at the denominator, not at trading performance.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Using profit after tax (or after interest) in ROCE — the numerator is operating profit before interest and tax, matching a capital base that includes debt.

Blaming trading performance for a ratio change caused by a revaluation, an acquisition or a policy difference.

Comparing two companies' inventory days or liquidity without checking for different year ends or seasonality.

Mixing gearing definitions mid-answer — debt over equity and debt over debt-plus-equity give different numbers from the same figures.

Reading a rising gross margin with a falling operating margin as one story — it usually means overheads grew, not that trading deteriorated.`,
      },
    ],
  },
  {
    paper: "FR",
    area: "D",
    title: "Preparation of financial statements",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Assembling a full set of company statements",
        body: `This area is where the individual standards from area B come together: you start from a draft trial balance or draft profit, apply a handful of adjustments — depreciation, revaluations, effective interest, tax, provisions — and produce a complete, correctly presented set of IAS 1 financial statements. Nothing here is new accounting; the skill is routing each adjustment to the right statement and the right line.

The presentation layer matters more than in FA. Profit or loss captures realised performance; other comprehensive income (OCI) captures specific remeasurements that standards keep out of profit — most importantly revaluation surpluses on property, plant and equipment. Together they form the statement of profit or loss and other comprehensive income, whose bottom line is total comprehensive income. The statement of changes in equity then reconciles each component of equity — share capital, share premium, revaluation surplus, retained earnings — showing profit, OCI, dividends and share issues in their own columns.

The statement of cash flows completes the set by undoing accruals accounting: starting from profit before tax, the indirect method adds back non-cash charges (depreciation, amortisation), removes non-operating items (interest, disposal profits), and adjusts for working capital movements, before showing investing and financing flows. Examiners love it precisely because every adjustment tests whether you understand what accruals did in the first place.`,
      },
      {
        kind: "structure",
        heading: "Where every adjustment lands",
        body: `Statement of profit or loss and OCI:
Revenue − cost of sales = gross profit; then operating expenses, finance costs, income tax expense → profit for the year.
OCI: revaluation gains on PPE (and their reversals). Total comprehensive income = profit + OCI.

Routing rules:
Depreciation → cost of sales or operating expenses (per use of asset).
Effective interest on loan notes → finance costs (accrue even if unpaid).
Revaluation gain → OCI and revaluation surplus, never profit.
Income tax = current estimate ± prior-year under/over-provision ± deferred tax movement.
Dividends paid → statement of changes in equity only.

Statement of changes in equity: one column per component; rows for profit, OCI, dividends, share issues.

Statement of cash flows (indirect method), operating section:
Profit before tax
+ depreciation/amortisation + finance costs − investment income
− profit on disposal (+ loss)
− increase in inventory/receivables (+ decrease)
+ increase in payables (− decrease)
= cash generated from operations; then deduct interest and tax PAID.`,
      },
      {
        kind: "example",
        heading: "Worked example — from draft profit to total comprehensive income",
        body: `Marden Co's draft profit before tax is $500,000, before the following: (1) depreciation on its building, cost $900,000 with a 30-year life, has not been charged; (2) $200,000 6% loan notes were issued half-way through the year and no interest has been recognised; (3) the income tax charge is estimated at $90,000; (4) land was revalued upwards by $40,000 at the year end.

Step 1 — building depreciation:
900,000 ÷ 30 = $30,000

Step 2 — loan interest (half a year):
200,000 × 6% × 6/12 = $6,000, accrued as a liability and charged to finance costs.

Step 3 — adjusted profit before tax:
500,000 − 30,000 − 6,000 = $464,000

Step 4 — profit for the year:
464,000 − 90,000 = $374,000

Step 5 — other comprehensive income:
Revaluation gain = $40,000 (to OCI and the revaluation surplus — not profit).

Step 6 — total comprehensive income:
374,000 + 40,000 = $414,000

In the statement of changes in equity, retained earnings rise by $374,000 and the revaluation surplus rises by $40,000 — the two amounts never mix.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Putting a revaluation gain through profit or loss — for owner-occupied PPE it belongs in OCI and the revaluation surplus.

Charging a full year's interest on loan notes issued part-way through the year, or recognising only the interest actually PAID instead of the effective/accrued amount.

Showing dividends paid as an expense — they appear only in the statement of changes in equity.

Getting the working-capital signs backwards in the cash flow statement — an INCREASE in receivables or inventory REDUCES cash.

Forgetting to add back depreciation, or to remove a profit on disposal, when reconciling profit before tax to cash generated from operations.`,
      },
    ],
  },
  {
    paper: "FR",
    area: "E",
    title: "Consolidated financial statements",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Groups at full strength",
        body: `FR takes the FA consolidation core and adds the machinery real groups need. Control is defined properly by IFRS 10 — power over the investee, exposure to variable returns, and the ability to use that power to affect them — which usually, but not automatically, means over 50% of the votes. At acquisition, the subsidiary's identifiable assets and liabilities are measured at FAIR VALUE, so fair-value uplifts (and the extra depreciation they cause) flow through every later consolidation.

Goodwill is measured once, at acquisition, and then tested for impairment rather than amortised. The NCI policy chosen at acquisition matters for the whole story: NCI at fair value produces full goodwill, and any goodwill impairment is then shared between group and NCI; proportionate NCI produces goodwill attributable to the parent only, which therefore bears impairments alone. Mid-year acquisitions add a time-apportionment layer — only post-acquisition results are consolidated.

Not every investment is a subsidiary. Significant influence (typically 20% to 50%) makes an investee an ASSOCIATE, accounted for by the equity method: one line in the statement of financial position (cost plus share of post-acquisition profits, less impairment) and one line of share-of-profit in the statement of profit or loss. Associates are never consolidated line by line — that distinction is one of the most reliable exam questions in the paper.`,
      },
      {
        kind: "structure",
        heading: "The group formula sheet",
        body: `Goodwill = consideration transferred + NCI at acquisition − fair value of identifiable net assets acquired.
NCI at acquisition: fair value (full goodwill) OR NCI % × fair value of net assets (proportionate goodwill).

Impairment of goodwill: reduces goodwill; charged to group P/L. Shared with NCI only under the FAIR VALUE (full goodwill) method.

Fair-value adjustments: uplift the subsidiary's assets at acquisition; depreciate the uplift over the asset's remaining life, reducing post-acquisition profits.

PURP: intragroup profit × proportion still in inventory; adjust the SELLER's profits (affects NCI only if the subsidiary is the seller).
Margin: profit = price × margin %. Mark-up: profit = price × mark-up ÷ (100 + mark-up).

NCI share of profit for the year = NCI % × (subsidiary's profit − PURP if sub is seller − FV-uplift depreciation − impairment if full-goodwill method).

Mid-year acquisition: consolidate revenue and expenses × months controlled ÷ 12.

Associate (equity method):
Investment in associate = cost + share of post-acquisition retained profits − impairment.
P/L: single line = investor's share of associate's profit. No line-by-line adding, no intragroup elimination of trading — but remove the investor's share of unrealised profit.`,
      },
      {
        kind: "example",
        heading: "Worked example — goodwill, impairment, PURP and NCI",
        body: `On 1 January Prax Co buys 75% of Sorel Co for $600,000, when the fair value of Sorel's identifiable net assets is $700,000. The NCI is measured at its fair value of $190,000. By 31 December, goodwill is impaired by $10,000. During the year Sorel sold goods to Prax for $24,000 at a mark-up of 20%; half remain in Prax's inventory. Sorel's profit for the year is $80,000.

Step 1 — goodwill at acquisition:
600,000 + 190,000 − 700,000 = $90,000

Step 2 — goodwill after impairment:
90,000 − 10,000 = $80,000 in the consolidated statement of financial position.

Step 3 — PURP (Sorel is the seller):
Profit in the sale = 24,000 × 20 ÷ 120 = $4,000
Still held = half, so PURP = 4,000 × 1/2 = $2,000

Step 4 — Sorel's adjusted profit:
80,000 − 2,000 PURP − 10,000 impairment (shared, because NCI is at fair value) = $68,000

Step 5 — NCI share of profit for the year:
25% × 68,000 = $17,000

Check the method choice: had NCI been proportionate (25% × 700,000 = 175,000), goodwill would be 600,000 + 175,000 − 700,000 = $75,000, and the $10,000 impairment would be borne by the parent's shareholders alone — NCI would then be 25% × (80,000 − 2,000) = $19,500.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Using proportionate goodwill when NCI is at fair value — and forgetting that only the fair-value method shares goodwill impairment with the NCI.

Adjusting the parent's profit for a PURP when the SUBSIDIARY was the seller — the PURP hits the seller's results, and therefore the NCI, only when the sub sold the goods.

Consolidating a full year of a mid-year subsidiary's results instead of time-apportioning from the acquisition date.

Forgetting the extra depreciation on fair-value uplifts when computing post-acquisition profits and NCI.

Consolidating an associate line by line or cancelling its balances — the equity method is one line in each statement.

Confusing mark-up with margin — 20% mark-up on a $24,000 sale is $4,000, but a 20% margin would be $4,800.`,
      },
    ],
  },
]

import { SKILLS_BRIEFS } from "@/lib/acca-briefs-skills"
import { AAFM_BRIEFS } from "@/lib/acca-briefs-aafm"
import { KNOWLEDGE_BRIEFS } from "@/lib/acca-briefs-knowledge"

/** Look up the brief for a paper + syllabus area, if one exists. */
export function getTopicBrief(paperId: string, area: string): TopicBrief | undefined {
  return (
    TOPIC_BRIEFS.find((b) => b.paper === paperId && b.area === area) ??
    SKILLS_BRIEFS.find((b) => b.paper === paperId && b.area === area) ??
    AAFM_BRIEFS.find((b) => b.paper === paperId && b.area === area) ??
    KNOWLEDGE_BRIEFS.find((b) => b.paper === paperId && b.area === area)
  )
}
