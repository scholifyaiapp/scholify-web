import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-GLOBAL · Area C — transportation and payment of international business
 * transactions. Chapters 14–16 of the LW-Global reading tree, mapped to group C1.
 *
 * Another area with no counterpart in LW-ENG, whose Area C is employment law. Here
 * the question is mechanical: the goods have to move, and the money has to move the
 * other way, and neither party trusts the other enough to go first. Every instrument
 * in this area is an answer to that problem — a document that stands for the goods, a
 * banking undertaking that stands for the price.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 14 · C1(a) ────────────────────────────────────────── */

export const LWG_TREE_14: StudyChapter = {
  id: "LWG-14",
  number: 14,
  paper: "LW",
  area: "C",
  title: "Bills of lading and transport documents",
  minutes: 15,
  syllabusRefs: ["C1(a)"],
  intro:
    "A bill of lading does three jobs at once, and the third — that it represents the goods themselves — is what makes international trade financeable.",
  outcomes: [
    "Define a bill of lading and explain how it is issued",
    "Explain the three functions a bill of lading performs",
    "Distinguish the four types of bill of lading",
    "Distinguish a negotiable from a non-negotiable transport document",
    "Explain how a bill of lading connects to payment and to the passing of risk",
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What a bill of lading is, and the three jobs it does",
      blocks: [
        {
          kind: "definition",
          term: "Bill of lading",
          md: "A document **issued by a carrier to the shipper** acknowledging that it has received the shipment of goods, that they have been placed on board a **named vessel** bound for a **named destination**, and stating the **terms on which they are carried**.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The three functions",
            caption: "The third is the one that matters commercially.",
            data: {
              items: [
                { title: "Receipt", sub: "The carrier acknowledges the goods, their apparent condition and quantity" },
                { title: "Evidence of the contract of carriage", sub: "It sets out the terms between shipper and carrier" },
                { title: "Document of title", sub: "Transferring it can transfer the right to take delivery of the goods" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why \"document of title\" changes everything",
          md: "Because the bill stands for the goods, it can be **sold, pledged or used as security while the goods are still at sea**. That is what lets a buyer resell a cargo in transit, and what lets a bank finance the trade — the bank holds a document that controls delivery. Take that function away and international trade would have to wait for arrival before anyone could deal with the goods or lend against them.",
        },
        {
          kind: "list",
          title: "What the bill records, and why the detail matters",
          items: [
            "**Apparent condition of the goods on shipment.** A bill noting no defects is a **clean** bill; one recording damage or defective packaging is **claused** or **dirty** — and a claused bill will normally be rejected under a documentary credit.",
            "**Quantity and description**, which is the receipt function and the starting point for any claim against the carrier.",
            "**The named vessel and destination**, which is how shipment is proved for the purpose of an F or C group Incoterm.",
            "**The terms of carriage**, including the carrier's exclusions and limits of liability.",
          ],
        },
      ],
      check: {
        q: "Which function of a bill of lading allows a buyer to resell a cargo while it is still at sea?",
        options: [
          "That it is a receipt for the goods",
          "That it is a document of title, so transferring it transfers the right to take delivery",
          "That it evidences the contract of carriage",
          "That it records the apparent condition of the goods",
        ],
        correct: 1,
        explain:
          "Its function as a DOCUMENT OF TITLE. Because the bill stands for the goods, it can be transferred, pledged or used as security while the goods are in transit — which is also what makes the trade financeable by a bank.",
      },
    },
    {
      id: "types",
      heading: "The four types, and negotiability",
      blocks: [
        {
          kind: "table",
          caption: "The four types of bill of lading",
          head: ["Type", "What it covers"],
          rows: [
            ["**Inland** bill of lading", "Transport of the goods **overland** to the exporter's international carrier"],
            ["**Ocean** bill of lading", "Transport **overseas**, from the exporter to a specified foreign market"],
            ["**Through** bill of lading", "**Both** the inland and the international legs under one document"],
            ["**Airway bill**", "Carriage by air, domestic or international, to a specified destination. It is **non-negotiable** and serves only as a **receipt** for the shipper"],
          ],
        },
        {
          kind: "definition",
          term: "Negotiable and non-negotiable documents",
          md: "A **negotiable** bill is made out to order and can be **transferred by endorsement and delivery**, passing the right to take delivery of the goods with it. A **non-negotiable** document — a straight bill made out to a named consignee, or an **airway bill** — cannot be transferred in that way: only the named consignee may take delivery, and the document works as a receipt rather than as a key to the goods.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An airway bill will not support the same financing",
          md: "Because an airway bill is **not negotiable and not a document of title**, a bank holding one does **not** control delivery of the goods. So a seller shipping by air cannot offer the same security, and a documentary credit calling for a negotiable bill of lading is not satisfied by tendering an airway bill. Scenarios that switch the mode of transport from sea to air are testing precisely this.",
        },
        {
          kind: "example",
          title: "Following the bill through a financed sale",
          scenario:
            "Tarnhill Produce (state D) sells 900 cartons of preserved fruit to Verrow Wholesale (state E) on terms CIF, payment by irrevocable documentary credit. Tarnhill ships on the Aurelia, and the carrier issues a clean ocean bill of lading made out to order. Tarnhill endorses the bill and presents it, with the invoice and insurance policy, to the bank. While the vessel is at sea Verrow agrees to resell 400 cartons to Merrow Retail. On arrival the cartons are found to have been damaged by seawater; the insurance covers it.",
          steps: [
            { label: "What the bill proves at shipment", detail: "As a RECEIPT it records that the carrier took 900 cartons in apparently good order — a CLEAN bill, which is what the credit requires. As EVIDENCE OF THE CONTRACT OF CARRIAGE it sets the terms against the carrier." },
            { label: "How the bank gets paid comfortable", detail: "As a DOCUMENT OF TITLE, the endorsed bill gives the bank control over delivery of the goods. That is the security that lets the bank pay Tarnhill against the documents." },
            { label: "How Verrow can resell in transit", detail: "Verrow does not need the goods to arrive. Once it takes up the endorsed bill it can transfer the right to take delivery of the goods to Merrow by endorsement and delivery of the bill." },
            { label: "Who bears the seawater damage", detail: "The term is CIF, so risk passed ON SHIPMENT (chapter 8). The loss is the buyer side's, and the claim is on the INSURANCE Tarnhill was obliged to arrange and to tender with the documents." },
            { label: "Whether the bill affects that", detail: "It does not. The bill controls DELIVERY and evidences condition at shipment; it does not shift risk. Because the bill was clean, it is also good evidence that the damage happened AFTER shipment." },
            { label: "Note what would have changed", detail: "Had the carrier issued a CLAUSED bill noting wet cartons, the bank would have rejected the documents, and Tarnhill would have faced an argument that the goods were already non-conforming when risk passed." },
          ],
          result:
            "The bill does all three jobs in a single transaction: it proves what was shipped and in what condition, sets the carriage terms, and gives first the bank and then the sub-buyer control over the goods. The point worth holding on to is that a **clean bill is evidence of apparent condition at shipment**, which is exactly the moment risk passes under a C-group term — so the two documents together decide who carries the loss.",
        },
      ],
      check: {
        q: "A documentary credit requires a clean negotiable bill of lading. The seller ships by air and tenders an airway bill noting the goods in good order. Are the documents compliant?",
        options: [
          "Yes, because the airway bill records the goods in good order",
          "No — an airway bill is non-negotiable and is not a document of title, so it does not satisfy a requirement for a negotiable bill of lading",
          "Yes, because both are transport documents",
          "Only if the buyer consents after the event",
        ],
        correct: 1,
        explain:
          "NOT COMPLIANT. An airway bill is NON-NEGOTIABLE and functions only as a receipt — it does not give the bank control over delivery. A credit calling for a negotiable bill of lading is not satisfied by it, however good the condition noted. The buyer could of course waive the discrepancy, but that is a concession, not compliance.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Naming only two functions of a bill of lading.",
      fix: "Three: receipt, evidence of the contract of carriage, and document of title. The third is the commercially decisive one.",
    },
    {
      trap: "Treating an airway bill as equivalent to a bill of lading.",
      fix: "It is non-negotiable and not a document of title. It serves as a receipt only, so it cannot support the same financing.",
    },
    {
      trap: "Assuming transfer of the bill transfers risk.",
      fix: "The bill controls DELIVERY. Risk passes under the Incoterm or the Convention, and retention of documents does not affect it.",
    },
    {
      trap: "Overlooking the difference between a clean and a claused bill.",
      fix: "A claused bill records defects at shipment and will normally be rejected under a documentary credit.",
    },
    {
      trap: "Confusing a through bill with an ocean bill.",
      fix: "A THROUGH bill covers the inland AND international legs; an ocean bill covers the overseas leg alone.",
    },
  ],
  keyTerms: [
    { term: "Bill of lading", def: "A document issued by a carrier to the shipper acknowledging receipt of goods shipped on a named vessel to a named destination, and stating the terms of carriage." },
    { term: "Document of title", def: "The bill's function of standing for the goods, so that transferring it transfers the right to take delivery." },
    { term: "Clean bill of lading", def: "A bill recording no defect in the apparent condition or packaging of the goods at shipment." },
    { term: "Claused (dirty) bill", def: "A bill recording damage or defective packaging, which a documentary credit will normally reject." },
    { term: "Through bill of lading", def: "A bill covering both the inland and the international carriage under one document." },
    { term: "Airway bill", def: "A transport document for carriage by air, non-negotiable and serving only as a receipt for the shipper." },
  ],
  summary: [
    "A bill of lading is issued by the carrier to the shipper and records the goods, the vessel, the destination and the carriage terms.",
    "It performs three functions: receipt, evidence of the contract of carriage, and document of title.",
    "The document of title function is what allows resale in transit and bank financing of the trade.",
    "The four types are inland, ocean, through and airway bill.",
    "An airway bill is non-negotiable, is not a document of title, and cannot support the same financing.",
    "A clean bill notes no defect at shipment; a claused bill does and will normally be rejected under a credit.",
    "The bill controls delivery, not risk — risk passes under the Incoterm or the Convention.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three functions of a bill of lading.", a: "A receipt for the goods, evidence of the contract of carriage, and a document of title." },
    { q: "Why is the document of title function commercially decisive?", a: "It lets the goods be resold, pledged or used as security while still in transit, which is what makes the trade financeable." },
    { q: "Name the four types of bill of lading.", a: "Inland, ocean, through, and airway bill." },
    { q: "What is the practical limitation of an airway bill?", a: "It is non-negotiable and not a document of title, so it works only as a receipt and gives a bank no control over delivery." },
    { q: "What is a claused bill and why does it matter?", a: "One recording damage or defective packaging at shipment. It will normally be rejected under a documentary credit and undermines the seller's position on conformity." },
  ],
  furtherStudy: [
    "Chapter 16 explains the documentary credit the bill is presented under.",
    "Chapter 13 fixes the passing of risk that the bill evidences but does not control.",
  ],
}

/* ── Chapter 15 · C1(b), C1(c) ─────────────────────────────────── */

export const LWG_TREE_15: StudyChapter = {
  id: "LWG-15",
  number: 15,
  paper: "LW",
  area: "C",
  title: "Bank transfers and the Model Law on International Credit Transfers",
  minutes: 14,
  syllabusRefs: ["C1(b)", "C1(c)"],
  intro:
    "The simplest way to pay: money moves from the buyer's bank to the seller's. The Model Law exists because in a cross-border chain there may be several banks in between, and something can go wrong at any of them.",
  outcomes: [
    "Explain the operation of a bank transfer as a means of international payment",
    "Define a credit transfer and identify the parties to one",
    "Explain and apply the rules of the UNCITRAL Model Law on International Credit Transfers",
    "Explain the obligations of a receiving bank and the consequences of delay or error",
    "Compare a bank transfer with a documentary credit as a payment method",
  ],
  sections: [
    {
      id: "the-mechanism",
      heading: "How a credit transfer works, and who the parties are",
      blocks: [
        {
          kind: "definition",
          term: "Credit transfer",
          md: "**Article 2(a)** of the Model Law puts it this way: \"the series of operations, beginning with the originator's payment order, made for the purpose of placing funds at the disposal of a beneficiary\", and adds that it \"includes any payment order issued by the originator's bank or by an intermediary bank in order to carry out the originator's payment order\". Read the definition carefully: the credit transfer is the **whole chain**, not the single debit at one end of it.",
        },
        {
          kind: "table",
          caption: "The parties, as article 2 defines them",
          head: ["Party", "Who it is"],
          rows: [
            ["**Originator** — art 2(b)", "\"The issuer of the first payment order in a credit transfer\" — in a sale, the buyer"],
            ["**Originator's bank**", "The bank that receives the originator's payment order"],
            ["**Intermediary bank** — art 2(f)", "\"Any receiving bank other than the originator's bank and the beneficiary's bank\""],
            ["**Beneficiary's bank**", "The bank that receives the payment order for the beneficiary's account"],
            ["**Beneficiary**", "The person to be paid — in a sale, the seller"],
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "A payment order down the chain",
            caption: "Each bank in the chain issues its own payment order to carry out the last one.",
            data: {
              steps: [
                { label: "Originator", sub: "Issues the first payment order" },
                { label: "Originator's bank", sub: "Accepts and issues its own order" },
                { label: "Intermediary bank", sub: "May be one or several" },
                { label: "Beneficiary's bank", sub: "Accepts and credits the account" },
                { label: "Beneficiary", sub: "Funds at its disposal" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the definition is worth learning precisely",
          md: "Two examinable consequences follow from it. The transfer is a **series of operations**, so a failure anywhere in the chain is part of one transfer rather than a separate matter. And the purpose is **placing funds at the disposal of the beneficiary**, so the transfer is not complete merely because the buyer's account has been debited — a scenario in which the money has left the buyer but not reached the seller is squarely within the Model Law.",
        },
      ],
      check: {
        q: "In a credit transfer, which bank is an \"intermediary bank\"?",
        options: [
          "The originator's bank, because it stands between the originator and the beneficiary",
          "Any receiving bank other than the originator's bank and the beneficiary's bank (art 2(f))",
          "Only the last bank before the beneficiary's bank",
          "Any bank that charges a fee for the transfer",
        ],
        correct: 1,
        explain:
          "Article 2(f): \"any receiving bank other than the originator's bank and the beneficiary's bank\". The definition works by EXCLUSION, so a chain may contain several intermediaries or none — and the originator's own bank is never one.",
      },
    },
    {
      id: "obligations",
      heading: "The banks' obligations, and what happens when something goes wrong",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The core obligations of a receiving bank",
          items: [
            "**Act on the payment order** it has accepted, by issuing a payment order that carries out the one it received, to the appropriate bank and within the time required.",
            "**Follow the originator's instructions** as to the route and the means of transfer where they are given.",
            "**Notify** the sender where the order contains **insufficient data**, or data that is inconsistent, and the bank cannot execute it — rather than simply doing nothing.",
            "**Give notice of a delay or of non-execution** so the sender can take other steps.",
            "**A beneficiary's bank that accepts** the order must **place the funds at the beneficiary's disposal**, or otherwise apply them, by the required time.",
          ],
        },
        {
          kind: "table",
          caption: "The consequences when a transfer goes wrong",
          head: ["Failure", "Consequence"],
          rows: [
            ["The transfer is **not completed**", "The originator's bank must **refund** the originator, with **interest** for the period the funds were held — and each bank in the chain has the corresponding obligation to its own sender. This is the **money-back guarantee** at the heart of the Model Law"],
            ["**Delay** in completing the transfer", "The bank responsible is liable to pay **interest** for the period of delay, generally to the beneficiary"],
            ["The order is executed for an **incorrect amount**", "The bank must correct the error, refunding or paying the difference as the case requires"],
            ["Execution to the **wrong beneficiary**", "The bank must refund; recovering from the misdirected recipient is the bank's problem, not the originator's"],
            ["Loss beyond interest and refund", "The Model Law's remedies are **limited**; consequential loss is generally recoverable only where the bank acted with the requisite degree of fault or the parties agreed otherwise"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The money-back guarantee is the point",
          md: "If the credit transfer is not completed, the **originator gets its money back with interest** from its own bank, and each bank in the chain looks to the bank it paid. The originator does not have to identify which bank in a foreign chain failed, or sue it. That allocation of risk to the banks — who are far better placed to sort it out among themselves — is what makes cross-border bank transfers commercially usable.",
        },
        {
          kind: "example",
          title: "Applying the Model Law to a failed transfer",
          scenario:
            "Halbrook Trading, in state F, owes $310,000 to Norvale Supplies in state G. On 4 May Halbrook instructs its bank, Bank F, to transfer the sum, specifying a routing through Bank H. Bank F debits Halbrook's account on 4 May and issues a payment order to Bank H. Bank H mislays the order and takes no action for eleven days; it does not tell Bank F. On 15 May Bank H issues the order to Norvale's bank, which credits Norvale on 16 May. Norvale, having been unpaid for twelve days, has incurred $4,000 of extra borrowing costs and Halbrook has lost a discount worth $9,000 that depended on payment by 8 May.",
          steps: [
            { label: "Characterise the transaction", detail: "A CREDIT TRANSFER: the series of operations beginning with Halbrook's payment order, for the purpose of placing funds at Norvale's disposal. Halbrook is the ORIGINATOR, Bank F the originator's bank, Bank H an INTERMEDIARY BANK, and Norvale's bank the beneficiary's bank." },
            { label: "Identify the breach", detail: "Bank H accepted a payment order and failed to act on it for eleven days, and failed to NOTIFY its sender of the delay. Both are breaches of a receiving bank's obligations." },
            { label: "Apply the delay remedy", detail: "The transfer WAS eventually completed, so the money-back guarantee is not engaged. The remedy for delay is INTEREST for the period of the delay, payable by the bank responsible — Bank H — generally to the beneficiary, Norvale." },
            { label: "Deal with Norvale's borrowing costs", detail: "Interest for the period of delay is the Model Law's measure. Norvale's $4,000 of borrowing costs will largely be met by that interest; anything beyond it is consequential loss, recoverable only on the limited basis the Model Law allows." },
            { label: "Deal with Halbrook's lost discount", detail: "The $9,000 lost discount is CONSEQUENTIAL loss to the originator, and is the hardest item to recover. The Model Law deliberately limits banks' exposure to it — the lesson for Halbrook is to build payment timing into the sale contract or use a mechanism with a firmer date." },
            { label: "Note the counterfactual", detail: "Had the funds NEVER reached Norvale, the analysis would change entirely: Bank F would have had to REFUND Halbrook with interest, and would then look to Bank H. Halbrook would not have had to pursue a bank in another state." },
          ],
          result:
            "Interest for the eleven-day delay, and a difficult claim for the lost discount. Two points decide questions of this shape: **completion or non-completion** determines whether you are in the money-back guarantee or the interest-for-delay rule, and the Model Law is deliberately **thin on consequential loss** — which is why a party for whom the payment date is critical should not rely on a bare bank transfer.",
        },
        {
          kind: "table",
          caption: "Bank transfer against documentary credit",
          head: ["", "Bank transfer", "Documentary credit"],
          rows: [
            ["**What triggers payment**", "The buyer's instruction", "**Presentation of complying documents**"],
            ["**Seller's security**", "**Weak** — depends on the buyer choosing to pay", "**Strong** — a bank's own undertaking"],
            ["**Buyer's security**", "Weak if it pays before shipment", "The documents evidence shipment before the bank pays"],
            ["**Cost and complexity**", "**Low**", "Higher — bank charges and strict document handling"],
            ["**When it suits**", "An established relationship where trust exists", "A **new or high-value** relationship, or where the parties are in different legal systems"],
          ],
        },
      ],
      check: {
        q: "A credit transfer is never completed and the beneficiary is not paid. What is the originator's primary remedy?",
        options: [
          "To sue whichever bank in the chain caused the failure, wherever it is",
          "A refund from its own bank with interest, that bank then looking to the bank it paid",
          "To claim against the beneficiary's bank only",
          "It has no remedy once its account has been debited",
        ],
        correct: 1,
        explain:
          "A REFUND WITH INTEREST from its OWN bank — the money-back guarantee. Each bank in the chain then looks to the bank it paid. The originator does not have to identify or sue a foreign bank, which is precisely the risk allocation that makes cross-border transfers workable.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Calling the originator's bank an intermediary bank.",
      fix: "Art 2(f): an intermediary is any receiving bank OTHER THAN the originator's bank and the beneficiary's bank.",
    },
    {
      trap: "Treating the transfer as complete when the buyer's account is debited.",
      fix: "The purpose is placing funds at the BENEFICIARY's disposal. A debit without a credit is an incomplete transfer.",
    },
    {
      trap: "Sending the originator off to sue a foreign bank in the chain.",
      fix: "The money-back guarantee gives it a refund with interest from ITS OWN bank, which then looks up the chain.",
    },
    {
      trap: "Expecting full consequential loss for a delayed transfer.",
      fix: "The measure is interest for the period of delay. The Model Law deliberately limits banks' exposure beyond that.",
    },
    {
      trap: "Recommending a bank transfer where the seller needs security of payment.",
      fix: "A transfer depends on the buyer choosing to pay. Where security matters, a documentary credit substitutes a bank's undertaking.",
    },
  ],
  keyTerms: [
    { term: "Credit transfer", def: "Art 2(a) — the series of operations beginning with the originator's payment order, made to place funds at the disposal of a beneficiary." },
    { term: "Originator", def: "Art 2(b) — the issuer of the first payment order in a credit transfer." },
    { term: "Intermediary bank", def: "Art 2(f) — any receiving bank other than the originator's bank and the beneficiary's bank." },
    { term: "Money-back guarantee", def: "The rule that where a credit transfer is not completed the originator's bank must refund the originator with interest, each bank looking to the bank it paid." },
    { term: "Payment order", def: "An instruction to a receiving bank to place a sum at the disposal of a beneficiary, which the bank must act on once accepted." },
  ],
  summary: [
    "A credit transfer is the series of operations from the originator's payment order to funds reaching the beneficiary.",
    "Art 2(f): an intermediary bank is any receiving bank other than the originator's bank and the beneficiary's bank.",
    "A receiving bank must act on an accepted order, follow routing instructions, and notify insufficient data, delay or non-execution.",
    "If the transfer is not completed the originator's bank refunds with interest, and each bank looks to the bank it paid.",
    "Delay attracts interest for the period of delay; consequential loss is only narrowly recoverable.",
    "A bank transfer is cheap but gives the seller little security, because payment depends on the buyer's instruction.",
    "Where security matters, a documentary credit substitutes a bank's undertaking for the buyer's willingness to pay.",
  ],
  knowledgeDiagnostic: [
    { q: "Define a credit transfer.", a: "Art 2(a) — the series of operations, beginning with the originator's payment order, made for the purpose of placing funds at the disposal of a beneficiary." },
    { q: "Who is an intermediary bank?", a: "Art 2(f) — any receiving bank other than the originator's bank and the beneficiary's bank." },
    { q: "What is the money-back guarantee?", a: "Where the transfer is not completed, the originator's bank must refund the originator with interest, and each bank in the chain looks to the bank it paid." },
    { q: "What is the remedy for a delayed but completed transfer?", a: "Interest for the period of the delay, payable by the bank responsible, generally to the beneficiary. Consequential loss is only narrowly recoverable." },
    { q: "Why does a bank transfer give a seller less security than a documentary credit?", a: "Payment depends on the buyer instructing it. A credit substitutes a bank's own undertaking, payable against complying documents." },
  ],
  furtherStudy: [
    "Chapter 16 covers the documentary credit this chapter compares the transfer with.",
    "Chapter 11 explains why a documentary credit displaces the buyer's right to examine before paying.",
  ],
}

/* ── Chapter 16 · C1(d), C1(e) ─────────────────────────────────── */

export const LWG_TREE_16: StudyChapter = {
  id: "LWG-16",
  number: 16,
  paper: "LW",
  area: "C",
  title: "Bills of exchange, letters of credit and letters of comfort",
  minutes: 16,
  syllabusRefs: ["C1(d)", "C1(e)"],
  intro:
    "Three instruments, three quite different levels of protection — and the difference between the strongest and the weakest of them is the difference between a bank's promise and a parent company's good intentions.",
  outcomes: [
    "Define a bill of exchange and a promissory note and identify the parties to each",
    "Apply the 1988 UN Convention that governs international bills and notes",
    "Explain the operation of a letter of credit and identify the four parties",
    "Explain the principles of autonomy and strict compliance",
    "Explain the operation and legal effect of a letter of comfort",
  ],
  sections: [
    {
      id: "bills-and-notes",
      heading: "Bills of exchange and promissory notes",
      blocks: [
        {
          kind: "definition",
          term: "Bill of exchange",
          md: "A written instruction, carrying **no condition of any kind**, by which one party directs another to hand over a **fixed amount of money** — on demand, or on a named future date — to a party the document identifies or to whoever holds it. In substance it is a transferable IOU that the market will buy and sell; a cheque is the version everyone has already used.",
        },
        {
          kind: "table",
          caption: "The parties, and the two instruments compared",
          head: ["", "Bill of exchange", "Promissory note"],
          rows: [
            ["**Nature**", "An **order** to pay, addressed by one party to another", "A **promise** to pay, made by the person who will pay"],
            ["**Who creates it**", "The **drawer** (typically the seller)", "The **maker** (the debtor)"],
            ["**Who must pay**", "The **drawee**, who becomes the **acceptor** on accepting the bill", "The **maker** itself"],
            ["**Who is paid**", "The **payee**, or a **holder** to whom it is transferred", "The payee or a holder"],
            ["**Number of parties at creation**", "Three roles — drawer, drawee, payee", "Two roles — maker and payee"],
          ],
        },
        {
          kind: "list",
          title: "The features that make these instruments useful",
          items: [
            "**Transferability.** A bill or note can be **negotiated** — transferred by endorsement and delivery — so the seller can turn a future payment into cash now by discounting it with a bank.",
            "**Acceptance.** When the drawee **accepts** a bill it undertakes to pay it, which converts the seller's commercial claim into an instrument the market will buy.",
            "**A protected holder.** The Convention gives a holder who took the instrument in good faith, without notice of defences, a **stronger position than the original payee** — a defect in the underlying transaction may not be raised against it. That protection is what makes the instrument liquid.",
            "**Dishonour and recourse.** If the instrument is not paid at maturity it is **dishonoured**, and the holder may have recourse against parties who signed it earlier, subject to giving the required notice.",
            "**Unconditionality is essential.** An order to pay \"provided the goods are satisfactory\" is not a bill of exchange at all — the condition destroys the character of the instrument.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The condition point is the usual trap",
          md: "Scenarios add a qualification to the order — \"pay $50,000 on 1 June if the shipment has been approved\" — and ask whether the document is a bill of exchange. It is **not**: the order must be **unconditional**. That matters because the whole commercial value of the instrument lies in a holder being able to rely on it without investigating the underlying deal.",
        },
      ],
      check: {
        q: "A document orders a buyer's bank to pay $80,000 to the seller on 30 September, \"subject to the seller confirming that all goods have been despatched\". Is it a bill of exchange?",
        options: [
          "Yes — it is in writing, for a specified sum, on a specified date",
          "No — the order is conditional, and a bill of exchange must be an unconditional order",
          "Yes, once the seller gives the confirmation",
          "No, because a bank cannot be a drawee",
        ],
        correct: 1,
        explain:
          "NO. A bill of exchange must be an UNCONDITIONAL order to pay. The confirmation requirement makes it conditional, so the document is not a bill and a holder could not rely on it without investigating whether the condition was met — which destroys the instrument's whole commercial purpose. Banks can perfectly well be drawees.",
      },
    },
    {
      id: "letters-of-credit",
      heading: "Letters of credit",
      blocks: [
        {
          kind: "definition",
          term: "Letter of credit (documentary credit)",
          md: "A promise given by a bank, at the buyer's request, to pay the seller a **stated amount within a stated period** — releasing the money only when the seller tenders paperwork that matches what the credit demands, with **no discrepancies**. The bank owes that promise in its own right, and it answers to the documents rather than to the goods.",
        },
        {
          kind: "table",
          caption: "The four parties",
          head: ["Party", "Role"],
          rows: [
            ["**Applicant**", "The **buyer**, who asks its bank to issue the credit"],
            ["**Issuing bank**", "The **buyer's bank**, which gives the undertaking"],
            ["**Beneficiary**", "The **seller**, who will be paid on presenting the documents"],
            ["**Beneficiary's bank**", "The correspondent bank, which may be merely **advising** the credit or may **confirm** it — adding its own undertaking"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "The two principles that decide every letter of credit question",
          items: [
            "**Autonomy.** The credit is an **independent transaction**, separate from the underlying sale. Conditions and disputes in the sale contract are **irrelevant** to the bank's obligation — so a bank must pay against complying documents even if the buyer says the goods are defective.",
            "**Strict compliance.** The documents must comply **strictly** with the terms of the credit. A discrepancy — a misdescription, a missing certificate, a late presentation, a claused bill where a clean one was required — entitles the bank to **refuse** payment, however commercially trivial it looks.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Advising versus confirming is worth real money",
          md: "An **advising** bank merely transmits the credit and checks its apparent authenticity; the seller's protection is still the **issuing** bank's undertaking, in the buyer's country. A **confirming** bank adds its **own** undertaking, so the seller can look to a bank in its own jurisdiction. Where the issuing bank or its country carries risk, a seller should insist the credit be **confirmed** — and that is the advice a scenario about an unfamiliar foreign bank is looking for.",
        },
        {
          kind: "example",
          title: "Applying autonomy and strict compliance",
          scenario:
            "Ashgrove Mills (state J) sells fabric to Duncarrow Apparel (state K) for $420,000, payment by irrevocable letter of credit issued by Duncarrow's bank and advised, but not confirmed, by a bank in state J. The credit requires a clean on-board bill of lading, an invoice, and an inspection certificate issued by \"Pentland Inspectorate\". Ashgrove ships, and presents a clean bill, the invoice, and an inspection certificate from \"Pentland Inspection Services Ltd\". Meanwhile Duncarrow discovers the fabric is a shade off specification and instructs its bank not to pay.",
          steps: [
            { label: "Deal with Duncarrow's instruction first", detail: "AUTONOMY. The credit is independent of the sale, so the buyer's complaint about the goods is IRRELEVANT to the bank's obligation. An instruction not to pay because the goods are defective is not a ground for the bank to refuse." },
            { label: "Then examine the documents", detail: "STRICT COMPLIANCE. The credit named \"Pentland Inspectorate\" and the certificate is from \"Pentland Inspection Services Ltd\". That is a DISCREPANCY, and it is for the bank to decide whether the documents comply on their face." },
            { label: "State the consequence of the discrepancy", detail: "Because the documents do not strictly comply, the issuing bank is ENTITLED TO REFUSE payment — not because of the fabric, but because of the certificate. Ashgrove's own paperwork, not the buyer's complaint, is what defeats it." },
            { label: "Identify Ashgrove's options", detail: "Correct and re-present within the credit's validity and presentation period if time allows; or ask Duncarrow to WAIVE the discrepancy — which it will not, given the shade problem; or fall back on suing Duncarrow under the sale contract." },
            { label: "Note the effect of the credit being unconfirmed", detail: "Even had the documents complied, Ashgrove's undertaking would have come from a bank in state K. An ADVISING bank adds nothing. Had it been CONFIRMED, Ashgrove could have looked to a bank in its own jurisdiction." },
            { label: "Separate the two disputes", detail: "The shade defect remains a live claim under the CISG — conformity, notice, remedies — but it belongs to the sale contract and has nothing to do with the credit." },
          ],
          result:
            "The bank may refuse, on the documents rather than on the goods, and Ashgrove is left suing on the contract. This is the classic shape of a letter of credit question: **autonomy** disposes of the buyer's complaint about the goods, and then **strict compliance** decides the case on a documentary discrepancy the seller could have avoided. Naming the inspecting body exactly as the credit does is the practical lesson.",
        },
      ],
      check: {
        q: "Documents presented under a letter of credit comply strictly, but the buyer tells the issuing bank the goods are defective. What must the bank do?",
        options: [
          "Refuse payment, since the underlying contract has been breached",
          "Pay, because the credit is autonomous and disputes under the sale are irrelevant to it",
          "Pay half and hold the balance pending resolution",
          "Refuse payment unless the seller indemnifies it",
        ],
        correct: 1,
        explain:
          "PAY. AUTONOMY means the credit is an independent transaction, so conditions and disputes in the underlying sale do not affect the bank's obligation to pay against complying documents. The buyer's remedy for defective goods is against the SELLER, under the sale contract.",
      },
    },
    {
      id: "letters-of-comfort",
      heading: "Letters of comfort",
      blocks: [
        {
          kind: "definition",
          term: "Letter of comfort",
          md: "A document used to **assure a creditor** that a third party will see to its debtor's obligations — typically given by a **parent company** to encourage a lender or supplier to extend credit to a **subsidiary**, by stating the parent's **intention** to support it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "A statement of intention is not a guarantee",
          md: "The legal effect of a letter of comfort depends entirely on **what it actually says**. A statement of **present policy or intention** — \"it is our policy to ensure our subsidiaries meet their obligations\" — generally creates **no enforceable obligation**: it is a statement of fact about current intention, which the parent may lawfully change. Wording that amounts to a **promise** to pay, or to maintain the subsidiary's solvency, may be construed as a **guarantee** and be enforceable.",
        },
        {
          kind: "table",
          caption: "Where a letter of comfort sits",
          head: ["Instrument", "Strength of protection", "Why"],
          rows: [
            ["**Confirmed letter of credit**", "**Strongest**", "Two banks' independent undertakings, payable against documents"],
            ["**Unconfirmed letter of credit**", "Strong", "One bank's undertaking, but in the buyer's jurisdiction"],
            ["**Accepted bill of exchange**", "Good", "The acceptor's undertaking on a negotiable instrument, discountable for cash"],
            ["**Guarantee**", "Good", "A legally enforceable secondary obligation"],
            ["**Bank transfer**", "Weak", "Depends on the buyer choosing to instruct payment"],
            ["**Letter of comfort**", "**Weakest**", "Usually only a statement of intention, and commercial rather than legal pressure"],
          ],
        },
        {
          kind: "illustration",
          title: "Two letters, two very different outcomes",
          md: "**Letter A**: \"It is our policy that Northmoor Ltd should at all times be in a position to meet its liabilities to you.\"\n\nThat is a statement of **present policy**. The parent has promised nothing about the future and may change its policy. A creditor relying on it is likely to find it unenforceable when the subsidiary fails.\n\n**Letter B**: \"We undertake that we will provide Northmoor Ltd with the funds necessary to meet its liabilities to you as they fall due.\"\n\nThat is a **promise** about future conduct, and reads as an enforceable undertaking — in substance a guarantee.\n\nThe difference is a few words, and it is worth the whole debt. Which is why the practical advice, whenever a scenario offers a letter of comfort, is to **ask for a guarantee instead** — and why the parent's advisers will resist.",
        },
      ],
      check: {
        q: "A parent company writes: \"It is our current policy to ensure that our subsidiary is able to meet its debts to you.\" The subsidiary defaults. Can the creditor enforce the letter against the parent?",
        options: [
          "Yes — any letter of comfort is enforceable as a guarantee",
          "Generally no — a statement of present policy or intention creates no enforceable obligation, though wording amounting to a promise would",
          "Yes, but only for half the debt",
          "No — letters of comfort are legally void",
        ],
        correct: 1,
        explain:
          "GENERALLY NOT. A statement of present POLICY or INTENTION is a statement of fact about current intention, which the parent may change; it creates no enforceable obligation. Wording that amounts to a PROMISE to provide funds may be construed as a guarantee and enforced — the effect turns on the words used, and the letter is not void either way.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a conditional order to pay as a bill of exchange.",
      fix: "The order must be UNCONDITIONAL. A condition destroys the instrument's character and its transferability.",
    },
    {
      trap: "Letting a bank refuse payment under a credit because the goods are defective.",
      fix: "AUTONOMY: the credit is independent of the sale. Complying documents must be paid, and the buyer's remedy is against the seller.",
    },
    {
      trap: "Excusing a minor documentary discrepancy.",
      fix: "STRICT COMPLIANCE. A misdescribed inspection body or a claused bill where a clean one was required entitles the bank to refuse.",
    },
    {
      trap: "Treating an advising bank as though it had undertaken to pay.",
      fix: "An ADVISING bank only transmits and authenticates. Only a CONFIRMING bank adds its own undertaking.",
    },
    {
      trap: "Reading a letter of comfort as a guarantee.",
      fix: "A statement of present policy or intention is usually unenforceable. Only wording amounting to a promise may be construed as a guarantee.",
    },
    {
      trap: "Confusing a bill of exchange with a promissory note.",
      fix: "A bill is an ORDER by the drawer to the drawee; a note is a PROMISE by the maker itself.",
    },
  ],
  keyTerms: [
    { term: "Bill of exchange", def: "A written, condition-free instruction from one party to another to hand a fixed amount to a named party or to the holder, either on demand or on a set date." },
    { term: "Promissory note", def: "A written, condition-free undertaking by the maker itself to hand a fixed amount to a named party or to the holder." },
    { term: "Acceptance", def: "The drawee's undertaking to pay a bill of exchange, making it the acceptor." },
    { term: "Letter of credit", def: "A bank's own promise, given for the buyer, to pay the seller a stated amount inside a stated period once conforming paperwork is tendered." },
    { term: "Autonomy of credits", def: "The principle that a letter of credit is independent of the underlying sale, so disputes under the sale do not affect the bank's obligation." },
    { term: "Strict compliance", def: "The requirement that documents presented under a credit conform exactly to its terms, any discrepancy entitling the bank to refuse." },
    { term: "Confirming bank", def: "A bank that adds its own undertaking to a credit, giving the beneficiary a paying bank in its own jurisdiction." },
    { term: "Letter of comfort", def: "An assurance, usually from a parent company, about a debtor's obligations — normally a statement of intention rather than an enforceable guarantee." },
  ],
  summary: [
    "A bill of exchange is an unconditional order to pay; a promissory note is an unconditional promise by the maker.",
    "Both are negotiable, so a seller can discount them for cash, and a good-faith holder is protected against defences.",
    "A condition attached to the order destroys the character of the instrument.",
    "A letter of credit is a bank's undertaking to pay against strictly complying documents, with four parties.",
    "Autonomy means disputes under the sale are irrelevant to the bank's obligation.",
    "Strict compliance means any documentary discrepancy entitles the bank to refuse.",
    "An advising bank only transmits; a confirming bank adds its own undertaking.",
    "A letter of comfort is usually a statement of intention and unenforceable; only promissory wording may amount to a guarantee.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes a bill of exchange from a promissory note?", a: "A bill is an ORDER by the drawer to a drawee to pay; a note is a PROMISE to pay made by the maker itself." },
    { q: "Name the four parties to a letter of credit.", a: "The applicant (buyer), the issuing bank (buyer's bank), the beneficiary (seller) and the beneficiary's bank, which may be advising or confirming." },
    { q: "State the two principles governing letters of credit.", a: "Autonomy — the credit is independent of the underlying sale; and strict compliance — documents must conform exactly to the credit's terms." },
    { q: "Why should a seller want a credit confirmed?", a: "A confirming bank adds its own undertaking, so the seller can look to a bank in its own jurisdiction rather than to the issuing bank in the buyer's country." },
    { q: "When is a letter of comfort enforceable?", a: "Only where its wording amounts to a promise — for example to provide funds — rather than a statement of present policy or intention." },
  ],
  furtherStudy: [
    "Chapter 14 covers the bill of lading tendered under a documentary credit.",
    "Chapter 11 explains why a credit displaces the buyer's right to examine before paying.",
  ],
}

/** Chapters 14–16 — LW-Global Area C, in reading order. */
export const LWG_TREE_AREA_C: StudyChapter[] = [LWG_TREE_14, LWG_TREE_15, LWG_TREE_16]
