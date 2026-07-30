import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area C — the use of double-entry and accounting systems.
 * Chapters 6–8 of the FA reading tree, mapped to syllabus groups C1 and C2.
 *
 * This is the mechanical heart of the paper, and the place where a candidate
 * either builds a reliable habit or spends the rest of the syllabus guessing which
 * side an entry goes. So these three chapters are deliberately drill-shaped: the
 * accounting equation is derived, then applied to transaction after transaction,
 * and every worked example ends with the CHECK that catches the error — the
 * equation still balances, the ledger still totals, the journal still has equal
 * debits and credits.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 6 · C1(a), C1(b), C1(d), C1(e), C1(f) ─────────────── */

export const FA_TREE_06: StudyChapter = {
  id: "FA-06",
  number: 6,
  paper: "FA",
  area: "C",
  title: "Business documentation and the accounting system",
  minutes: 14,
  syllabusRefs: ["C1(a)", "C1(b)", "C1(d)", "C1(e)", "C1(f)", "A3(b)"],
  intro:
    "Nothing enters an accounting system because someone remembered it. Every entry starts as a document, and knowing which document proves which fact is what stops a ledger from becoming fiction.",
  outcomes: [
    "Identify the main data sources in an accounting system and explain the function of each",
    "Summarise the contents and purpose of the principal business documents",
    "Identify the main types of business transaction and the document that evidences each",
    "Set out what a computerised accounting system does differently, including where data is held when an external provider hosts it",
    "Explain how an accounting system produces useful information and meets organisational policies and deadlines",
  ],
  sections: [
    {
      id: "the-documents",
      heading: "The documents, in the order a trade actually happens",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "timeline",
            title: "One credit sale, from enquiry to settlement",
            caption: "Each document evidences a different fact, which is why the exam asks which one you would look at.",
            data: {
              points: [
                { label: "Quotation", sub: "Seller states a price — no commitment yet" },
                { label: "Purchase order", sub: "Buyer commits to buy" },
                { label: "Goods despatched note", sub: "Seller records what left" },
                { label: "Goods received note", sub: "Buyer records what arrived" },
                { label: "Sales invoice", sub: "The amount becomes due — this is what is recorded" },
                { label: "Credit note", sub: "If goods are returned or overcharged" },
                { label: "Remittance advice", sub: "Buyer says what the payment covers" },
                { label: "Receipt", sub: "Seller confirms cash received" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "What each document contains and what it is for",
          head: ["Document", "Raised by", "Purpose and key contents"],
          rows: [
            ["**Quotation**", "Seller", "An offer of price, quantity and terms in response to an enquiry. No transaction yet, so nothing is recorded."],
            ["**Sales order**", "Seller", "The seller's internal record of a customer's confirmed order, used to trigger despatch."],
            ["**Purchase order**", "Buyer", "The buyer's formal commitment to buy: description, quantity, agreed price, delivery date, order number."],
            ["**Goods received note (GRN)**", "Buyer", "Evidence of what physically arrived and its condition — matched to the purchase order and the supplier's invoice before payment."],
            ["**Goods despatched note (GDN)**", "Seller", "Evidence of what left, usually signed by the carrier or customer as proof of delivery."],
            ["**Sales invoice**", "Seller", "The demand for payment: invoice number and date, customer, description, quantity, unit price, discounts, sales tax, total and payment terms. **This is the document the sale is recorded from.**"],
            ["**Supplier (purchase) invoice**", "Supplier", "The same document seen from the buyer's side — the basis for recording a purchase and a payable."],
            ["**Supplier statement**", "Supplier", "A periodic list of invoices, credit notes and payments on the account, with the balance owed. The basis of the payables reconciliation in chapter 21."],
            ["**Credit note**", "Seller", "Reduces an amount previously invoiced — returns, shortages, damage or an overcharge."],
            ["**Debit note**", "Buyer", "The buyer's formal claim that an invoice is overstated or goods are being returned, requesting a credit note."],
            ["**Remittance advice**", "Buyer", "Accompanies a payment and identifies which invoices it settles — what makes cash allocation possible."],
            ["**Receipt**", "Seller", "Confirmation that a payment has been received."],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two documents candidates confuse",
          md: "A **credit note** is issued by the **seller** and actually reduces the debt. A **debit note** is issued by the **buyer** and merely asks for that reduction. So a buyer disputing an invoice sends a debit note; the reduction is only recorded when the seller's credit note arrives.\n\nAnd note what is NOT recorded: a quotation and a purchase order create no accounting entry. The transaction is recorded from the **invoice**, not from the order.",
        },
        {
          kind: "illustration",
          title: "Why the three-way match exists",
          md: "Before paying a supplier's invoice for $4,800 covering 400 units, the payables clerk pulls two other documents.\n\nThe **purchase order** says 400 units were ordered at $12 — so the price is right. The **goods received note** says 360 units arrived and 40 were damaged and refused — so the quantity is not.\n\nThe invoice is therefore overstated by $480. The buyer raises a **debit note** for $480 and withholds that amount until the supplier's **credit note** arrives. Without the GRN, $480 would have been paid for goods the business never received — which is why the match of order to GRN to invoice is the standard control over purchases.",
        },
      ],
      check: {
        q: "A customer returns goods originally invoiced at $600 because they were the wrong specification. Which document does the SELLER issue, and what is its effect?",
        options: [
          "A debit note, which increases the amount owed",
          "A credit note, which reduces the amount the customer owes",
          "A remittance advice, which records the return",
          "A goods received note, which cancels the invoice",
        ],
        correct: 1,
        explain:
          "The SELLER issues a CREDIT NOTE, reducing the receivable and reversing the sale. A debit note goes the other way — the BUYER raises one to request the credit. A remittance advice accompanies a payment, and a goods received note is the buyer's record of what arrived.",
      },
    },
    {
      id: "the-system",
      heading: "What an accounting system has to do",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The five things any accounting system must deliver",
          items: [
            "**Capture** every transaction, once, from a source document.",
            "**Classify** it — which account, which period, which customer or supplier.",
            "**Record** it in the books of prime entry and post it to the general ledger.",
            "**Summarise** it into a trial balance and then the financial statements.",
            "**Control** it — so that what was captured is complete, authorised and unaltered, and so that the reports arrive by the deadlines the organisation has set.",
          ],
        },
        {
          kind: "definition",
          term: "Main data sources in an accounting system",
          md: "**Sales and purchase invoices and credit notes** (what was traded and on what terms), **bank statements and internet banking records** (what actually moved), **payroll records** (what employees earned and what was deducted), **cash records and petty cash vouchers**, and **internal documents** such as journals, timesheets and inventory counts.",
        },
        {
          kind: "table",
          caption: "The main types of business transaction, and where each begins",
          head: ["Transaction", "Source document", "First recorded in"],
          rows: [
            ["Credit sale", "Sales invoice", "Sales day book"],
            ["Credit purchase", "Supplier invoice", "Purchases day book"],
            ["Sales return", "Credit note issued", "Sales returns day book"],
            ["Purchase return", "Credit note received", "Purchases returns day book"],
            ["Receipt from a customer", "Remittance advice and bank record", "Cash book (receipts side)"],
            ["Payment to a supplier", "Bank record, cheque or transfer record", "Cash book (payments side)"],
            ["Small cash expense", "Petty cash voucher", "Petty cash book"],
            ["Wages and salaries", "Payroll records", "Journal"],
            ["A correction or a year-end adjustment", "Journal voucher", "Journal"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Computerised systems: what changes and what does not",
          md: "A computerised system changes the **speed, volume and integration** of processing — one entry from an invoice updates the customer's account, the sales ledger control account, inventory and the sales tax account at once, and reports can be produced on demand. What does **not** change is the underlying double entry: the debits and credits are identical, and so is the requirement for a source document. Software cannot detect a transaction nobody entered.",
        },
        {
          kind: "list",
          title: "Features of a computerised system — and the risks that come with them",
          items: [
            "**Integrated modules** (sales, purchases, cash, payroll, inventory) sharing one database, so a single entry updates everything affected.",
            "**Standing data** — customer, supplier and product records — entered once and reused, which removes repetition but makes a wrong standing record repeat itself indefinitely.",
            "**Automatic postings, totals and reports**, eliminating arithmetic error while making a mis-set parameter systematic rather than occasional.",
            "**Access controls, passwords and audit trails**, so entries are authorised and traceable to the person who made them.",
            "**External servers — the cloud.** Data is held by a third-party provider: access from anywhere, automatic backup and no local hardware to maintain, against dependence on the internet connection, on the provider's own security and continuity, and questions about where data is physically held.",
            "**Backup and recovery** as a routine, not an afterthought: the cost of losing the ledger is the cost of reconstructing the year.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Garbage in, garbage out — faster",
          md: "Automation does not improve the quality of the input. If a sales invoice is keyed to the wrong customer, a computerised system will faithfully chase the wrong customer, age the wrong balance and reconcile the wrong statement. That is why input controls and the reconciliations in Area E exist, and why they matter more in a computerised system, not less.",
        },
      ],
      check: {
        q: "Which of the following is a genuine limitation of a computerised accounting system?",
        options: [
          "It cannot produce a trial balance without manual totalling",
          "It applies different double-entry rules from a manual system",
          "It processes an incorrectly entered transaction consistently and at speed, so one input error is repeated wherever it flows",
          "It cannot handle sales tax",
        ],
        correct: 2,
        explain:
          "The limitation is that automation carries an INPUT ERROR everywhere at once and does so consistently — a wrongly keyed customer is chased, aged and reconciled wrongly throughout. The other three options are simply false: the double entry is identical to a manual system, and totals, trial balances and sales tax are exactly what the software handles best.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Recording a transaction from the purchase order or the quotation.",
      fix: "No entry arises until the INVOICE. An order is a commitment to trade, not a completed transaction, and a quotation is not even that.",
    },
    {
      trap: "Reversing credit notes and debit notes.",
      fix: "The SELLER issues a credit note, which reduces the debt. The BUYER issues a debit note, which only requests that reduction.",
    },
    {
      trap: "Saying a computerised system uses different double entry.",
      fix: "The debits and credits are identical. What changes is speed, integration and the availability of reports.",
    },
    {
      trap: "Treating the cloud as risk-free because backups are automatic.",
      fix: "It shifts dependence to the provider and the internet connection, and raises questions about security and where data is held. Those are the examinable drawbacks.",
    },
    {
      trap: "Confusing the goods despatched note with the goods received note.",
      fix: "The GDN is the SELLER's record of what left; the GRN is the BUYER's record of what arrived. The GRN is what the buyer matches to the invoice before paying.",
    },
  ],
  keyTerms: [
    { term: "Quotation", def: "A seller's statement of price, quantity and terms in response to an enquiry, creating no accounting entry." },
    { term: "Purchase order", def: "The buyer's formal commitment to buy specified goods at an agreed price and date." },
    { term: "Goods received note", def: "The buyer's record of what physically arrived and in what condition, matched to the order and invoice before payment." },
    { term: "Sales invoice", def: "The seller's demand for payment and the document from which a sale and a receivable are recorded." },
    { term: "Credit note", def: "A document issued by the seller reducing an amount previously invoiced, for returns, shortages or overcharges." },
    { term: "Debit note", def: "A document issued by the buyer claiming that an invoice is overstated or goods are being returned, requesting a credit note." },
    { term: "Remittance advice", def: "A document sent with a payment identifying which invoices it settles." },
    { term: "Standing data", def: "Reusable master records — customers, suppliers, products — entered once in a computerised system and applied to every subsequent transaction." },
  ],
  summary: [
    "A trade generates a sequence of documents, and each evidences a different fact; the accounting entry comes from the invoice.",
    "A credit note is issued by the seller and reduces the debt; a debit note is issued by the buyer and only requests it.",
    "Matching the purchase order, goods received note and supplier invoice is the standard control over purchases.",
    "An accounting system must capture, classify, record, summarise and control — and meet the organisation's reporting deadlines.",
    "Computerisation changes speed, volume and integration; the double entry underneath is unchanged.",
    "Cloud storage buys access and automatic backup and brings dependence on the provider, the connection and their security.",
    "Automation repeats an input error consistently and everywhere, which is why input controls and reconciliations matter more, not less.",
  ],
  knowledgeDiagnostic: [
    { q: "Which document is a credit sale recorded from, and why not the order?", a: "The sales invoice. An order is only a commitment to trade; the invoice establishes the amount now due." },
    { q: "Who issues a debit note and what does it achieve?", a: "The buyer, to claim that an invoice is overstated or goods are being returned. It requests a credit note; only the seller's credit note reduces the debt." },
    { q: "What three documents make up the standard purchases match?", a: "The purchase order (price and quantity ordered), the goods received note (what actually arrived) and the supplier invoice (what is being charged)." },
    { q: "State two benefits and two drawbacks of holding accounting data on external servers.", a: "Benefits: access from anywhere and automatic backup with no local hardware. Drawbacks: dependence on the internet connection and on the provider's security and continuity, plus questions over where data is held." },
    { q: "Does computerisation change the double entry for a transaction?", a: "No. The debits and credits are identical; what changes is the speed, integration and reporting." },
  ],
  furtherStudy: [
    "Chapter 7 turns the accounting equation into the rule that decides which side each entry goes.",
    "Chapter 8 follows these documents into the books of prime entry and the general ledger.",
    "Area E reconciles what the system recorded against what the bank and suppliers say happened.",
  ],
}

/* ── Chapter 7 · C1(c) ─────────────────────────────────────────── */

export const FA_TREE_07: StudyChapter = {
  id: "FA-07",
  number: 7,
  paper: "FA",
  area: "C",
  title: "The accounting equation and the logic of double entry",
  minutes: 18,
  syllabusRefs: ["C1(c)", "B1(a)"],
  intro:
    "One equation, applied without exception, generates every debit and credit in this paper. Get this chapter properly and you will never again have to memorise which side something goes on.",
  outcomes: [
    "State and apply the accounting equation in each of its forms",
    "Show the dual effect of a transaction on the accounting equation",
    "Derive the debit and credit rules from the equation rather than memorising them",
    "Record a series of transactions and prove that the equation still balances",
    "Explain the effect of profit, drawings and capital introduced on the equation",
  ],
  sections: [
    {
      id: "the-equation",
      heading: "The equation, and why it can never fail",
      blocks: [
        {
          kind: "formula",
          name: "The accounting equation",
          expr: "Assets = Capital (equity) + Liabilities",
          note: "Rearranged: Capital = Assets − Liabilities. Both forms are examined, and the second is how net assets are found.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "scale",
            title: "Two claims on one set of resources",
            caption: "Everything the business controls was funded by an owner or by someone else.",
            data: {
              assets: "Assets — what the business controls",
              liabilities: "Liabilities — the outsiders' claim",
              equity: "Capital — the owner's residual claim",
            },
          },
        },
        {
          kind: "text",
          md: "The equation is not a rule imposed on accounting; it is a restatement of the fact that resources have to come from somewhere. Every asset the business controls was funded either by the owner or by a third party, so the total of the resources must equal the total of the claims on them. That is why it holds after every transaction — and why a set of books that does not balance contains an error rather than an exception.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Duality, stated usefully",
          md: "Every transaction changes **exactly two** items in the equation, by **equal amounts**, in whichever directions keep the equation true. There are only four possibilities: an asset up and another asset down; an asset up and a claim up; an asset down and a claim down; one claim up and another claim down. Every entry you will ever make is one of those four.",
        },
      ],
    },
    {
      id: "deriving-debits",
      heading: "Deriving debit and credit from the equation",
      blocks: [
        {
          kind: "text",
          md: "Assets sit on the left of the equation, and claims on the right. Accounting simply names those two sides: an increase on the left is a **debit**, and an increase on the right is a **credit**. Everything else follows, including the treatment of income and expenses, which are the routes by which profit changes capital.",
        },
        {
          kind: "table",
          caption: "The rule, derived — not memorised",
          head: ["Element", "Side of the equation", "Increase", "Decrease"],
          rows: [
            ["**Asset**", "Left", "**Debit**", "Credit"],
            ["**Expense** (reduces capital, so a left-hand movement)", "Left", "**Debit**", "Credit"],
            ["**Drawings** (reduces capital)", "Left", "**Debit**", "Credit"],
            ["**Liability**", "Right", "Credit", "Debit"],
            ["**Capital**", "Right", "Credit", "Debit"],
            ["**Income**", "Right", "Credit", "Debit"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The memory aid, and its limits",
          md: "**DEAD CLIC** — **D**ebit **E**xpenses, **A**ssets, **D**rawings; **C**redit **L**iabilities, **I**ncome, **C**apital. Useful, but it is a summary of the table above, and the table is a consequence of the equation. When a transaction is unfamiliar, go back to the equation and ask which two items move and in which direction; the aid will not help you with a part-exchange or a rights issue, and the equation always will.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "tAccount",
            title: "The shape of a ledger account",
            caption: "Debits on the left, credits on the right, in every account without exception.",
            data: {
              name: "Bank",
              debits: [
                { label: "Capital introduced", amount: 20000 },
                { label: "Receipt from customer", amount: 3400 },
              ],
              credits: [
                { label: "Rent paid", amount: 1800 },
                { label: "Payment to supplier", amount: 2600 },
              ],
            },
          },
        },
        {
          kind: "example",
          title: "Eight transactions, proved against the equation",
          scenario:
            "Ravi starts a trading business. (1) He pays $30,000 of his own money in as capital. (2) The business borrows $12,000 from a bank. (3) It buys shop fittings for $9,000 cash. (4) It buys inventory for $8,000 on credit. (5) It sells goods that cost $5,000 for $7,500 on credit. (6) It pays the supplier $6,000. (7) It receives $4,000 from the customer. (8) Ravi withdraws $1,500 for personal use.",
          steps: [
            { label: "1 · Capital introduced $30,000", detail: "Bank (asset) up $30,000, debit. Capital (claim) up $30,000, credit. Assets 30,000 = Capital 30,000 + Liabilities 0." },
            { label: "2 · Bank loan $12,000", detail: "Bank up $12,000, debit. Loan (liability) up $12,000, credit. Assets 42,000 = Capital 30,000 + Liabilities 12,000." },
            { label: "3 · Fittings $9,000 for cash", detail: "One asset up, another down — fittings debit $9,000, bank credit $9,000. Totals unchanged at 42,000. Note that buying an asset is not an expense." },
            { label: "4 · Inventory $8,000 on credit", detail: "Inventory up $8,000, debit. Trade payable up $8,000, credit. Assets 50,000 = Capital 30,000 + Liabilities 20,000." },
            { label: "5 · Sale for $7,500, goods cost $5,000", detail: "Two entries. Receivable up $7,500 debit, revenue $7,500 credit; then cost of sales $5,000 debit, inventory down $5,000 credit. Profit of $2,500 increases capital: Assets 52,500 = Capital 32,500 + Liabilities 20,000." },
            { label: "6 · Pay supplier $6,000", detail: "Payable down $6,000, debit. Bank down $6,000, credit. Assets 46,500 = Capital 32,500 + Liabilities 14,000." },
            { label: "7 · Receive $4,000 from customer", detail: "Bank up, receivable down — both assets, so totals unchanged. This is settlement of an existing debt, NOT new income." },
            { label: "8 · Drawings $1,500", detail: "Bank down $1,500, credit. Drawings debit $1,500, reducing capital. Assets 45,000 = Capital 31,000 + Liabilities 14,000." },
          ],
          result:
            "Final position: assets of $45,000 (fittings 9,000 + inventory 3,000 + receivables 3,500 + bank 29,500) = capital of $31,000 (30,000 introduced + 2,500 profit − 1,500 drawings) + liabilities of $14,000 (payables 2,000 + loan 12,000). The three checks worth internalising: transaction 3 changed no total because it swapped one asset for another; transaction 7 was NOT income because it settled an existing receivable; and profit reached capital without any entry being made directly to capital.",
        },
      ],
      check: {
        q: "A business buys a delivery van for $18,000, paying $5,000 in cash and taking a loan for the balance. What is the effect on the accounting equation?",
        options: [
          "Assets increase by $18,000 and liabilities increase by $18,000",
          "Assets increase by $13,000 and liabilities increase by $13,000",
          "Assets increase by $18,000, capital increases by $13,000 and liabilities increase by $5,000",
          "Assets are unchanged and liabilities increase by $13,000",
        ],
        correct: 1,
        explain:
          "Three movements: van up $18,000, bank down $5,000 — a NET asset increase of $13,000 — and a loan liability up $13,000. Capital is untouched, because buying an asset is not an expense and no owner transaction occurred. Option 1 forgets that $5,000 of cash left; the equation is the fastest way to see that.",
      },
    },
    {
      id: "profit-and-capital",
      heading: "How profit, drawings and capital move the equation",
      blocks: [
        {
          kind: "formula",
          name: "Capital reconciliation for a sole trader",
          expr: "Closing capital = Opening capital + Capital introduced + Profit − Drawings",
          note: "A staple exam question runs this backwards to find a missing profit figure, and chapter 27 uses it for incomplete records.",
        },
        {
          kind: "text",
          md: "Income and expenses are not a separate part of the equation — they are the accounts through which profit is accumulated before it is added to capital. That is why they are closed off at the year end while assets, liabilities and capital are carried forward: a period's income and expenses have done their job once the profit they produce has reached capital.",
        },
        {
          kind: "example",
          title: "Finding profit when only the position is known",
          scenario:
            "Ilona's business had net assets of $84,000 at the start of the year and $107,000 at the end. During the year she paid in a further $10,000 and withdrew $2,000 a month.",
          steps: [
            { label: "Identify opening and closing capital", detail: "Capital = assets − liabilities = net assets. So opening capital $84,000 and closing capital $107,000." },
            { label: "Quantify the owner transactions", detail: "Capital introduced $10,000. Drawings $2,000 × 12 = $24,000." },
            { label: "Rearrange the reconciliation", detail: "Profit = closing capital − opening capital − capital introduced + drawings." },
            { label: "Substitute", detail: "Profit = 107,000 − 84,000 − 10,000 + 24,000 = $37,000." },
            { label: "Prove it forwards", detail: "84,000 + 10,000 + 37,000 − 24,000 = 107,000. It reconciles." },
          ],
          result:
            "Profit for the year is $37,000. Note that the business grew its net assets by only $23,000 while earning $37,000, because $24,000 of drawings left and $10,000 came in. Working forwards as a check is what catches the commonest error here — adding drawings instead of subtracting them, which would have given $19,000 and a reconciliation that does not prove.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two transactions that look like income and are not",
          md: "**Cash received from a customer** settles a receivable already recorded — one asset for another. Recording it as income counts the same sale twice.\n\n**Capital introduced** is an owner transaction. Recording it as income inflates profit by money the business never earned. Both are tested by a stem that mentions cash arriving in the bank, and the equation settles both instantly.",
        },
      ],
      check: {
        q: "A sole trader's opening capital was $52,000. She introduced $6,000 during the year and withdrew $18,000, and closing capital was $61,000. What was the profit for the year?",
        options: ["$21,000", "$3,000", "$41,000", "$15,000"],
        correct: 0,
        explain:
          "Profit = closing 61,000 − opening 52,000 − introduced 6,000 + drawings 18,000 = $21,000. Check it forwards: 52,000 + 6,000 + 21,000 − 18,000 = 61,000. The $3,000 answer comes from omitting both owner transactions, which is the error the forward check exists to catch.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Recording cash received from a customer as income.",
      fix: "It settles an existing receivable: one asset up, another down. The income was recognised when the sale was made.",
    },
    {
      trap: "Treating the purchase of a non-current asset as an expense.",
      fix: "It swaps one asset for another (or creates a liability). Only the depreciation of that asset is an expense, and only over its life.",
    },
    {
      trap: "Adding drawings instead of subtracting them in the capital reconciliation.",
      fix: "Closing = opening + introduced + profit − drawings. Always prove the answer forwards; the arithmetic will not reconcile if a sign is wrong.",
    },
    {
      trap: "Reaching for DEAD CLIC on an unfamiliar transaction.",
      fix: "Go back to the equation: which two items move, and in which direction does each have to move for it to still balance? The aid is a summary, not the reasoning.",
    },
    {
      trap: "Forgetting the second entry when a sale is made from inventory.",
      fix: "A credit sale is TWO pairs: receivable and revenue, then cost of sales and inventory. Omitting the second overstates both inventory and profit.",
    },
  ],
  keyTerms: [
    { term: "Accounting equation", def: "Assets = Capital + Liabilities; equivalently Capital = Assets − Liabilities." },
    { term: "Duality (dual aspect)", def: "Every transaction changes exactly two items in the equation by equal amounts, in directions that keep it balanced." },
    { term: "Debit", def: "An entry recording an increase in an asset or expense, or a decrease in a liability, capital or income." },
    { term: "Credit", def: "An entry recording an increase in a liability, capital or income, or a decrease in an asset or expense." },
    { term: "Net assets", def: "Assets less liabilities — numerically equal to capital or equity." },
    { term: "Drawings", def: "Value withdrawn from the business by its owner, reducing capital and never appearing as an expense." },
  ],
  summary: [
    "Assets = Capital + Liabilities holds after every transaction, because resources must equal the claims on them.",
    "Every transaction moves exactly two items by equal amounts, in one of only four possible patterns.",
    "Increases on the left of the equation are debits; increases on the right are credits — which is where DEAD CLIC comes from.",
    "Income and expenses are the accounts through which profit accumulates before reaching capital.",
    "Closing capital = opening capital + capital introduced + profit − drawings, and the exam runs it backwards to find profit.",
    "Cash from a customer and capital introduced both increase the bank and neither is income.",
    "Buying a non-current asset is not an expense; only its depreciation is.",
  ],
  knowledgeDiagnostic: [
    { q: "State the accounting equation and its rearrangement for capital.", a: "Assets = Capital + Liabilities, so Capital = Assets − Liabilities, which is also net assets." },
    { q: "Why is an increase in an asset a debit?", a: "Assets sit on the left of the equation, and an increase on the left side is what a debit records. The whole debit/credit convention is this one fact." },
    { q: "What are the two entries for a credit sale of goods?", a: "Debit receivables and credit revenue with the selling price; then debit cost of sales and credit inventory with the cost." },
    { q: "How do you find profit from opening and closing capital?", a: "Profit = closing capital − opening capital − capital introduced + drawings. Prove it forwards to check the signs." },
    { q: "Give two receipts of cash that are not income.", a: "A receipt from a customer settling an existing receivable, and capital introduced by the owner." },
  ],
  furtherStudy: [
    "Chapter 8 puts these entries into books of prime entry and ledger accounts and balances them off.",
    "Chapter 22 extracts the balances into a trial balance, which is only possible because every entry obeyed this chapter.",
    "Chapter 27 uses the capital reconciliation to reconstruct incomplete records.",
  ],
}

/* ── Chapter 8 · C2 ────────────────────────────────────────────── */

export const FA_TREE_08: StudyChapter = {
  id: "FA-08",
  number: 8,
  paper: "FA",
  area: "C",
  title: "Books of prime entry, ledger accounts and journals",
  minutes: 17,
  syllabusRefs: ["C2(a)", "C2(b)", "C2(c)", "C2(d)", "C2(e)"],
  intro:
    "Between the invoice and the financial statements sit two layers of books. Knowing what each layer is for is how you answer a question about where a transaction is first recorded — and how you write a journal that a marker can follow.",
  outcomes: [
    "Describe the main types of general ledger account and the function of each",
    "Explain how financial data is initially recorded in the books of prime entry",
    "Explain the use of journal entries and how they are posted to the general ledger",
    "Identify the correct journal from a given narrative",
    "Balance off and close general ledger accounts at the year end",
  ],
  sections: [
    {
      id: "the-layers",
      heading: "The two layers of books, and what each one is for",
      blocks: [
        {
          kind: "definition",
          term: "Books of prime entry",
          md: "The books in which transactions are **first listed**, from the source documents, before anything is posted to the general ledger. There is one for each high-volume type of transaction, and their purpose is to summarise: posting 900 individual invoices to the general ledger would be unmanageable, so the day book is totalled and the total is posted.",
        },
        {
          kind: "definition",
          term: "General ledger (nominal ledger)",
          md: "The complete set of **accounts** in which double entry is performed and from which the trial balance and the financial statements are drawn. Every account in it is an asset, liability, capital, income or expense account.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "From document to financial statements",
            caption: "Two summarising steps, and the double entry happens at the second one.",
            data: {
              steps: [
                { label: "Source document", sub: "Invoice, credit note, bank record, voucher" },
                { label: "Book of prime entry", sub: "Listed and totalled — no double entry yet" },
                { label: "General ledger", sub: "Posted as debits and credits" },
                { label: "Trial balance", sub: "Every balance, listed" },
                { label: "Financial statements", sub: "Summarised for the user" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The books of prime entry, and what goes in each",
          head: ["Book", "Records", "From"],
          rows: [
            ["**Sales day book**", "Credit sales", "Sales invoices issued"],
            ["**Purchases day book**", "Credit purchases", "Supplier invoices received"],
            ["**Sales returns day book**", "Goods returned by customers", "Credit notes issued"],
            ["**Purchases returns day book**", "Goods returned to suppliers", "Credit notes received"],
            ["**Cash book**", "All receipts and payments through the bank", "Bank statements, remittance advices, paying-in and payment records"],
            ["**Petty cash book**", "Small cash payments", "Petty cash vouchers"],
            ["**Journal**", "Everything that does not fit the others — corrections, year-end adjustments, payroll, opening balances, non-routine transfers", "Journal vouchers with a narrative"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Credit transactions and cash transactions go to different books",
          md: "A **credit** sale goes to the sales day book; the later **receipt** goes to the cash book. A cash sale — paid at the point of sale — goes straight to the cash book and never touches the sales day book. Questions on \"which book of prime entry\" are almost always testing whether you noticed the word **credit**.",
        },
        {
          kind: "definition",
          term: "Receivables and payables ledgers (memorandum ledgers)",
          md: "Separate records of **each individual** customer and supplier account, kept so the business knows who owes what. They are **memorandum** records: the double entry lives in the general ledger's receivables and payables control accounts, and chapter 21 reconciles the two.",
        },
      ],
      check: {
        q: "A business sells goods for $400 to a customer who pays immediately by bank transfer. In which book of prime entry is this first recorded?",
        options: ["Sales day book", "Cash book", "Journal", "Sales returns day book"],
        correct: 1,
        explain:
          "The CASH BOOK. The sales day book records CREDIT sales — those creating a receivable. Here no receivable ever exists, so the transaction is a receipt in the cash book with the credit going to revenue. The presence or absence of the word \"credit\" is the whole question.",
      },
    },
    {
      id: "ledger-accounts",
      heading: "Types of general ledger account, and balancing them off",
      blocks: [
        {
          kind: "list",
          title: "The five families of account, and what happens to each at the year end",
          items: [
            "**Asset accounts** — bank, receivables, inventory, non-current assets. Usually a debit balance, **carried forward** to next year.",
            "**Liability accounts** — payables, accruals, loans, sales tax owed. Usually a credit balance, **carried forward**.",
            "**Capital accounts** — capital, share capital, retained earnings, revaluation surplus. Credit balance, **carried forward**.",
            "**Income accounts** — revenue, discounts received, sundry income. Credit balance, **closed** to profit or loss.",
            "**Expense accounts** — purchases, wages, rent, depreciation, irrecoverable debts. Debit balance, **closed** to profit or loss.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction that decides the year-end entries",
          md: "Assets, liabilities and capital are **position** accounts: they describe a state, so their balances carry forward as next year's opening balances. Income and expenses are **performance** accounts: they describe a period, so they are transferred to profit or loss and start the next year at nil. A candidate who carries a rent expense balance forward reports last year's rent twice.",
        },
        {
          kind: "example",
          title: "Balancing off a ledger account",
          scenario:
            "Sundale Co's rent expense account for the year shows payments of $2,400 in April, $2,400 in July, $2,400 in October and $2,400 in January. At the year end of 31 December there is an accrual of $800 for December rent not yet paid.",
          steps: [
            { label: "Total the debit side", detail: "Four payments of $2,400 = $9,600 debited to rent during the year." },
            { label: "Add the year-end adjustment", detail: "December's rent of $800 has been incurred but not paid, so debit rent $800 and credit accruals $800. Rent debits now total $10,400." },
            { label: "Transfer the balance to profit or loss", detail: "Credit rent expense $10,400 and debit profit or loss $10,400. This CLOSES the account." },
            { label: "Confirm the account is nil", detail: "Debits $10,400 and credits $10,400 — the rent account starts the next year at zero, which is correct for a performance account." },
            { label: "Carry forward what remains", detail: "The accruals account keeps its $800 credit balance as an opening liability, because it is a position account." },
          ],
          result:
            "Rent expense of $10,400 goes to profit or loss and the account closes to nil; an accrual of $800 is carried forward as a current liability. The check that matters: an expense account left with a balance after the year-end transfer has not been closed, and that balance will be double-counted next year — so after closing off, every income and expense account must read nil.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Balance carried down, balance brought down",
          md: "The convention is to insert the balancing figure on the smaller side as **balance c/d** so both sides total the same, then bring the same amount down on the opposite side as **balance b/d**. Two things to hold on to: the balance b/d is always on the side that made the account bigger, and its side tells you the type of balance — a debit b/d is an asset or expense, a credit b/d is a liability, capital or income.",
        },
      ],
      check: {
        q: "At the year end, which of these accounts is closed to profit or loss rather than carried forward?",
        options: ["Trade payables", "Accumulated depreciation", "Discounts received", "Share premium"],
        correct: 2,
        explain:
          "DISCOUNTS RECEIVED is income, and income accounts describe a PERIOD, so the balance is transferred to profit or loss and the account restarts at nil. Trade payables and accumulated depreciation are position accounts, and share premium is part of equity — all three carry forward.",
      },
    },
    {
      id: "journals",
      heading: "The journal: writing an entry a marker can follow",
      blocks: [
        {
          kind: "definition",
          term: "Journal entry",
          md: "A formal instruction to make a double entry, showing the **accounts** to be debited and credited, the **amounts**, and a **narrative** explaining why. It is the book of prime entry for everything that has no routine home: corrections, year-end adjustments, payroll, opening balances and transfers between accounts.",
        },
        {
          kind: "list",
          style: "number",
          title: "How to write one that earns full marks",
          items: [
            "Name the **exact account**, not a category. \"Debit motor vehicles\", not \"debit assets\".",
            "Put **debits first**, then credits, and make the two totals equal. An unequal journal is wrong on its face.",
            "Use the **amount that is actually being corrected**, which for a one-sided error is the amount needed to put it right — not always the original figure.",
            "Add a **narrative** that says what the entry does. A marker reading only the narrative should know what happened.",
            "Where the entry reverses something, say so — \"to reverse the accrual raised at 31 December\".",
          ],
        },
        {
          kind: "table",
          caption: "Common narratives and the journal each one requires",
          head: ["Narrative", "Debit", "Credit"],
          rows: [
            ["Wages of $14,200 for the month are recorded", "Wages expense $14,200", "Bank / wages payable $14,200"],
            ["A receivable of $900 is written off as irrecoverable", "Irrecoverable debts expense $900", "Trade receivables $900"],
            ["Depreciation of $3,600 is charged for the year", "Depreciation expense $3,600", "Accumulated depreciation $3,600"],
            ["Closing inventory of $22,000 is recognised", "Inventory (asset) $22,000", "Cost of sales $22,000"],
            ["$600 of repairs was wrongly debited to plant", "Repairs expense $600", "Plant and machinery $600"],
            ["A rent prepayment of $1,500 is carried forward", "Prepayments $1,500", "Rent expense $1,500"],
            ["The owner takes $2,000 of goods for personal use", "Drawings $2,000", "Purchases / inventory $2,000"],
          ],
        },
        {
          kind: "illustration",
          title: "Reading the narrative carefully",
          md: "Two narratives that look similar and need different journals.\n\n\"A payment of $700 for insurance was **omitted entirely** from the books.\" Nothing was recorded, so both sides are missing: debit insurance $700, credit bank $700.\n\n\"A payment of $700 for insurance was correctly credited to bank but **debited to rent**.\" The bank side is right and only the debit is in the wrong account: debit insurance $700, credit rent $700 — the bank is not touched at all.\n\nThe difference is worth the whole mark, and it comes from asking which sides were already recorded before writing anything.",
        },
      ],
      check: {
        q: "A payment of $450 for office stationery was correctly recorded in the bank account but debited to the purchases account. What journal corrects it?",
        options: [
          "Debit stationery $450, credit bank $450",
          "Debit stationery $450, credit purchases $450",
          "Debit purchases $450, credit stationery $450",
          "Debit stationery $900, credit purchases $900",
        ],
        correct: 1,
        explain:
          "Only the DEBIT is in the wrong account, so only the debit needs moving: debit stationery and credit purchases with $450. The bank entry was correct and must not be touched — touching it would create a new error. And $900 would be right only for an error where the original entry was posted to the wrong SIDE, which is not what happened here.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Putting a cash sale in the sales day book.",
      fix: "Day books record CREDIT transactions. A sale paid immediately goes in the cash book.",
    },
    {
      trap: "Carrying an income or expense balance forward to next year.",
      fix: "Performance accounts are closed to profit or loss and start at nil. Only assets, liabilities and capital carry forward.",
    },
    {
      trap: "Correcting a wrong-account error by touching the side that was already right.",
      fix: "Move only the incorrect side. Ask which entries were made before writing the journal; a correct bank entry stays untouched.",
    },
    {
      trap: "Writing a journal that debits and credits different totals.",
      fix: "Every journal must balance. If it does not, the analysis is wrong, not the arithmetic.",
    },
    {
      trap: "Treating the receivables ledger as part of the double entry.",
      fix: "Individual customer accounts are MEMORANDUM records. The double entry is in the general ledger's receivables control account.",
    },
    {
      trap: "Posting each invoice individually to the general ledger.",
      fix: "The day book is totalled and the TOTAL is posted. That summarising step is the reason books of prime entry exist.",
    },
  ],
  keyTerms: [
    { term: "Books of prime entry", def: "The books in which transactions are first listed from source documents, before totals are posted to the general ledger." },
    { term: "General ledger", def: "The complete set of accounts in which double entry is performed and from which the trial balance is extracted." },
    { term: "Cash book", def: "The book of prime entry for all receipts and payments through the bank, including cash sales and cash purchases." },
    { term: "Journal", def: "The book of prime entry for non-routine entries — corrections, year-end adjustments, payroll and transfers — showing debits, credits and a narrative." },
    { term: "Memorandum ledger", def: "The receivables or payables ledger of individual customer and supplier accounts, kept outside the double entry." },
    { term: "Balance carried down", def: "The figure inserted on the smaller side of an account to make both sides equal, brought down on the opposite side as the opening balance." },
  ],
  summary: [
    "Transactions are listed first in a book of prime entry, then posted to the general ledger, where the double entry happens.",
    "There is one day book per high-volume transaction type; the journal takes everything non-routine.",
    "Credit transactions go to the day books and the later cash movement goes to the cash book; a cash sale goes only to the cash book.",
    "Individual customer and supplier accounts are memorandum records; the double entry sits in the control accounts.",
    "Asset, liability and capital accounts carry their balances forward; income and expense accounts are closed to profit or loss and restart at nil.",
    "A journal names exact accounts, lists debits first, balances, and carries a narrative that explains the entry.",
    "For a wrong-account error, correct only the side that was wrong.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do books of prime entry exist at all?", a: "To summarise. High-volume transactions are listed and totalled so that one total is posted to the general ledger instead of hundreds of individual entries." },
    { q: "In which book is a cash purchase first recorded?", a: "The cash book. The purchases day book records credit purchases only." },
    { q: "Which types of account are closed off at the year end, and which carry forward?", a: "Income and expense accounts are closed to profit or loss and restart at nil; asset, liability and capital accounts carry their balances forward." },
    { q: "What are the four features of a well-written journal?", a: "Exact account names, debits before credits with equal totals, the amount actually needed to correct or record, and a narrative explaining the entry." },
    { q: "A cost was correctly credited to bank but debited to the wrong expense account. How much of the entry is corrected?", a: "Only the debit — debit the right expense account and credit the wrong one. The bank entry was correct and is left alone." },
  ],
  furtherStudy: [
    "Chapters 9–19 apply these journals to every transaction type in the syllabus.",
    "Chapter 21 reconciles the memorandum ledgers to the control accounts.",
    "Chapters 22–23 use the journal to correct errors and clear a suspense account.",
  ],
}

/** Chapters 6–8 — Area C, in reading order. */
export const FA_TREE_AREA_C: StudyChapter[] = [FA_TREE_06, FA_TREE_07, FA_TREE_08]
