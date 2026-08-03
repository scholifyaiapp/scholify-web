import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-GLOBAL · Areas C and D question kit — chapters 14 to 21.
 *
 * Transport documents and payment mechanisms (Area C, which has no counterpart in
 * LW-ENG), then agency, partnerships, corporate personality and company formation.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 14 · Bills of lading ───────────────────────────────── */

const CH14: AccaQuestion[] = [
  q1("LWGK-14-01", "LWG-14", "C", "easy",
    "Which function of a bill of lading allows a cargo to be resold while still at sea?",
    ["Receipt for the goods", "Document of title", "Evidence of the contract of carriage", "Record of apparent condition"],
    1,
    "Its function as a DOCUMENT OF TITLE. Because the bill stands for the goods, transferring it transfers the right to take delivery — which is also what makes the trade financeable by a bank."),

  q1("LWGK-14-02", "LWG-14", "C", "easy",
    "Who issues a bill of lading?",
    ["The buyer", "The carrier, to the shipper", "The buyer's bank", "The port authority"],
    1,
    "The CARRIER issues it TO THE SHIPPER, acknowledging receipt of the goods and setting out the terms of carriage."),

  q1("LWGK-14-03", "LWG-14", "C", "medium",
    "Which transport document is NON-negotiable and serves only as a receipt?",
    ["Ocean bill of lading", "Through bill of lading", "Airway bill", "Inland bill of lading"],
    2,
    "The AIRWAY BILL. It is not negotiable and not a document of title, so it gives a bank no control over delivery and cannot support the same financing."),

  q1("LWGK-14-04", "LWG-14", "C", "medium",
    "What is a claused (or dirty) bill of lading?",
    [
      "One issued after the vessel has sailed",
      "One recording damage or defective packaging at shipment",
      "One made out to bearer",
      "One covering more than one leg of carriage",
    ],
    1,
    "One recording DAMAGE OR DEFECTIVE PACKAGING in the apparent condition of the goods at shipment. It will normally be rejected under a documentary credit, which requires a clean bill."),

  q2("LWGK-14-05", "LWG-14", "C", "hard",
    "A credit requires a clean negotiable bill of lading. The seller ships by air and tenders an airway bill noting the goods in good order. Are the documents compliant?",
    [
      "Yes, since the goods are recorded in good order",
      "No — an airway bill is non-negotiable and not a document of title, so it does not satisfy a requirement for a negotiable bill of lading",
      "Yes, as both are transport documents",
      "Only if the buyer consents afterwards",
    ],
    1,
    "NOT COMPLIANT. The airway bill gives the bank no control over delivery, whatever condition it records. The buyer could waive the discrepancy, but that is a concession rather than compliance."),

  q2("LWGK-14-06", "LWG-14", "C", "medium",
    "Which type of bill of lading covers both the inland and the international carriage?",
    ["Ocean bill of lading", "Inland bill of lading", "Through bill of lading", "Airway bill"],
    2,
    "A THROUGH bill of lading covers both legs under one document. An ocean bill covers the overseas leg alone and an inland bill the overland leg to the international carrier."),

  q2("LWGK-14-07", "LWG-14", "C", "medium",
    "A clean bill of lading is issued on shipment and the goods arrive water-damaged. What does the bill establish?",
    [
      "That the seller is liable for the damage",
      "That the goods were in apparent good order at shipment, so the damage occurred afterwards",
      "That the carrier has no liability",
      "That risk had not passed",
    ],
    1,
    "That the goods were in APPARENT GOOD ORDER AT SHIPMENT — so the damage happened after. Under a C-group term that is also the moment risk passed, so the two documents together decide who carries the loss."),

  q2("LWGK-14-08", "LWG-14", "C", "hard",
    "Does transferring a bill of lading transfer the risk of loss?",
    [
      "Yes, risk follows the document",
      "No — the bill controls delivery; risk passes under the Incoterm or the Convention",
      "Yes, but only under FOB",
      "Only where the bill is negotiable",
    ],
    1,
    "NO. The bill controls DELIVERY of the goods. Risk passes under the Incoterm the parties adopted or, failing one, under the Convention's rules — and retention of the bill does not affect it."),

  q1("LWGK-14-09", "LWG-14", "C", "medium",
    "How is a negotiable bill of lading transferred?",
    ["By notifying the carrier", "By endorsement and delivery", "By registration", "By assignment in writing to the carrier"],
    1,
    "By ENDORSEMENT AND DELIVERY, which passes the right to take delivery of the goods with it. A straight bill naming a consignee cannot be transferred that way."),

  multi2("LWGK-14-10", "LWG-14", "C", "hard",
    "Which TWO are functions of a bill of lading?",
    [
      "A receipt by the carrier for the goods",
      "A guarantee of the goods' quality",
      "Evidence of the contract of carriage",
      "An undertaking by a bank to pay",
    ],
    [0, 2],
    "A RECEIPT and EVIDENCE OF THE CONTRACT OF CARRIAGE, the third function being document of title. It guarantees nothing about quality — only apparent condition — and a banking undertaking is a letter of credit."),
]

/* ── Chapter 15 · Bank transfers and credit transfers ───────────── */

const CH15: AccaQuestion[] = [
  q1("LWGK-15-01", "LWG-15", "C", "easy",
    "Who is the \"originator\" of a credit transfer?",
    ["The beneficiary's bank", "The issuer of the first payment order", "The intermediary bank", "The person to be paid"],
    1,
    "The issuer of the FIRST payment order — in a sale, the buyer. The person to be paid is the beneficiary."),

  q1("LWGK-15-02", "LWG-15", "C", "easy",
    "Which bank is an \"intermediary bank\"?",
    [
      "The originator's bank",
      "Any receiving bank other than the originator's bank and the beneficiary's bank (art 2(f))",
      "The beneficiary's bank",
      "Any bank charging a fee",
    ],
    1,
    "Art 2(f): ANY RECEIVING BANK OTHER THAN the originator's bank and the beneficiary's bank. The definition is exclusionary, so a chain may have several intermediaries or none."),

  q1("LWGK-15-03", "LWG-15", "C", "medium",
    "What is the purpose of a credit transfer, as defined?",
    [
      "Debiting the originator's account",
      "Placing funds at the disposal of a beneficiary",
      "Issuing a payment order",
      "Confirming the originator's identity",
    ],
    1,
    "PLACING FUNDS AT THE DISPOSAL of the beneficiary. So a transfer is not complete merely because the buyer's account has been debited — which is what brings a stranded payment within the Model Law."),

  q1("LWGK-15-04", "LWG-15", "C", "medium",
    "What must a receiving bank do if a payment order contains insufficient data to execute?",
    ["Return the funds without explanation", "Notify the sender", "Execute it as best it can", "Hold the funds indefinitely"],
    1,
    "NOTIFY THE SENDER, rather than simply doing nothing. It must also give notice of a delay or of non-execution so the sender can take other steps."),

  q2("LWGK-15-05", "LWG-15", "C", "hard",
    "A credit transfer is never completed and the beneficiary is not paid. What is the originator's primary remedy?",
    [
      "To sue whichever bank in the chain caused the failure, wherever it is",
      "A refund from its own bank with interest, that bank then looking to the bank it paid",
      "A claim against the beneficiary's bank only",
      "None, once its account has been debited",
    ],
    1,
    "The MONEY-BACK GUARANTEE: a refund with interest from its OWN bank, each bank then looking to the bank it paid. The originator does not have to identify or sue a foreign bank, which is the risk allocation that makes cross-border transfers usable."),

  q2("LWGK-15-06", "LWG-15", "C", "hard",
    "An intermediary bank mislays a payment order for eleven days and does not tell its sender. The transfer eventually completes. What is the remedy?",
    [
      "A full refund of the transferred sum",
      "Interest for the period of the delay, payable by the bank responsible",
      "Damages for all consequential loss suffered by both parties",
      "Nothing, as the transfer completed",
    ],
    1,
    "INTEREST for the period of the delay. Because the transfer COMPLETED, the money-back guarantee is not engaged; and the Model Law is deliberately thin on consequential loss, which is why a party for whom the payment date is critical should not rely on a bare transfer."),

  q2("LWGK-15-07", "LWG-15", "C", "medium",
    "Why does a bank transfer give a seller less security than a documentary credit?",
    [
      "Transfers are slower",
      "Payment depends on the buyer choosing to instruct it, whereas a credit substitutes a bank's own undertaking",
      "Transfers cannot cross borders",
      "Banks charge more for transfers",
    ],
    1,
    "Because payment depends on the BUYER'S INSTRUCTION. A documentary credit replaces that with a bank's own undertaking payable against complying documents, which is why it suits a new or high-value relationship."),

  q2("LWGK-15-08", "LWG-15", "C", "medium",
    "Which obligation does a beneficiary's bank have once it accepts a payment order?",
    [
      "To verify the underlying sale contract",
      "To place the funds at the beneficiary's disposal, or otherwise apply them, by the required time",
      "To confirm the goods have been shipped",
      "To obtain the originator's consent again",
    ],
    1,
    "To PLACE THE FUNDS AT THE BENEFICIARY'S DISPOSAL by the required time. A bank in a credit transfer has no concern with the underlying sale — that is the difference from a documentary credit, where documents evidencing shipment are the trigger."),

  q1("LWGK-15-09", "LWG-15", "C", "medium",
    "If a transfer is executed for an incorrect amount, what must the bank do?",
    ["Nothing, if the error was innocent", "Correct the error, refunding or paying the difference", "Await instructions from the beneficiary", "Cancel the transfer entirely"],
    1,
    "CORRECT THE ERROR — refunding an overpayment or paying the shortfall as the case requires. Execution to the wrong beneficiary likewise obliges the bank to refund, and recovering from the misdirected recipient is the bank's problem."),

  multi2("LWGK-15-10", "LWG-15", "C", "hard",
    "Which TWO are duties of a receiving bank that has accepted a payment order?",
    [
      "To issue a payment order carrying out the one it received, within the time required",
      "To verify the commercial purpose of the payment",
      "To follow the originator's instructions as to routing",
      "To insure the funds in transit",
    ],
    [0, 2],
    "ACTING ON THE ORDER within time and FOLLOWING ROUTING INSTRUCTIONS are both duties, along with notifying insufficient data, delay or non-execution. Verifying commercial purpose and insuring the funds are not part of the regime."),
]

/* ── Chapter 16 · Bills of exchange, credits and comfort ────────── */

const CH16: AccaQuestion[] = [
  q1("LWGK-16-01", "LWG-16", "C", "easy",
    "What distinguishes a bill of exchange from a promissory note?",
    [
      "A bill is oral and a note is written",
      "A bill is an order by the drawer to a drawee; a note is a promise by the maker itself",
      "A bill is negotiable and a note is not",
      "A bill requires a bank and a note does not",
    ],
    1,
    "A bill is an ORDER addressed by the drawer to a drawee; a note is a PROMISE by the maker to pay. Both are written and both may be negotiable."),

  q1("LWGK-16-02", "LWG-16", "C", "easy",
    "Which principle means a bank must pay under a letter of credit despite a dispute about the goods?",
    ["Strict compliance", "Autonomy of credits", "Privity", "Good faith"],
    1,
    "AUTONOMY. The credit is an independent transaction, so conditions and disputes in the underlying sale are irrelevant to the bank's obligation to pay against complying documents."),

  q1("LWGK-16-03", "LWG-16", "C", "medium",
    "In a letter of credit, what is the buyer called?",
    ["The beneficiary", "The applicant", "The issuer", "The advising party"],
    1,
    "The APPLICANT. The buyer's bank is the issuing bank, the seller is the beneficiary, and the beneficiary's bank may be advising or confirming."),

  q1("LWGK-16-04", "LWG-16", "C", "medium",
    "What does an ADVISING bank do?",
    [
      "Adds its own undertaking to pay",
      "Transmits the credit and checks its apparent authenticity",
      "Issues the credit",
      "Guarantees the goods conform",
    ],
    1,
    "TRANSMITS the credit and checks its apparent authenticity. Only a CONFIRMING bank adds its own undertaking, giving the seller a paying bank in its own jurisdiction."),

  q2("LWGK-16-05", "LWG-16", "C", "hard",
    "A credit names \"Pentland Inspectorate\" as the inspecting body. The seller tenders a certificate from \"Pentland Inspection Services Ltd\", and the buyer separately complains the goods are off-specification. May the bank refuse to pay?",
    [
      "Yes, because the goods are defective",
      "Yes, because the documents do not strictly comply with the credit",
      "No, because the discrepancy is trivial",
      "No, because autonomy obliges it to pay regardless",
    ],
    1,
    "Yes — on the DOCUMENTS, not the goods. Autonomy disposes of the buyer's complaint about the fabric, but STRICT COMPLIANCE entitles the bank to refuse on the mismatched inspecting body. That two-step is the classic shape of a credit question."),

  q2("LWGK-16-06", "LWG-16", "C", "hard",
    "A document orders a bank to pay $80,000 on 30 September \"subject to the seller confirming all goods have been despatched\". Is it a bill of exchange?",
    [
      "Yes — it is written, for a specified sum, on a specified date",
      "No — the order is conditional, and a bill of exchange must be unconditional",
      "Yes, once the confirmation is given",
      "No, because a bank cannot be a drawee",
    ],
    1,
    "NO. The order must be UNCONDITIONAL. A condition destroys the instrument's character, because a holder could not rely on it without investigating the underlying deal — which is the whole point of negotiability. Banks can perfectly well be drawees."),

  q2("LWGK-16-07", "LWG-16", "C", "medium",
    "A parent writes: \"It is our current policy to ensure our subsidiary can meet its debts to you.\" The subsidiary defaults. Can the creditor enforce it?",
    [
      "Yes — a letter of comfort is a guarantee",
      "Generally no — a statement of present policy or intention creates no enforceable obligation",
      "Yes, for half the debt",
      "No — letters of comfort are void",
    ],
    1,
    "GENERALLY NOT. A statement of present POLICY or INTENTION is a statement of fact the parent may change, and creates no enforceable obligation. Wording amounting to a PROMISE to provide funds may be construed as a guarantee — the effect turns on the words used."),

  q2("LWGK-16-08", "LWG-16", "C", "medium",
    "Why should a seller ask for a credit to be CONFIRMED rather than merely advised?",
    [
      "To reduce the bank charges",
      "So that a bank in the seller's own jurisdiction undertakes to pay, rather than only the issuing bank abroad",
      "To remove the need for complying documents",
      "To extend the credit's validity",
    ],
    1,
    "So the seller has an undertaking from a bank in its OWN jurisdiction. An advising bank adds nothing to the seller's security, so where the issuing bank or its country carries risk, confirmation is what the seller should insist on. Documents must still comply."),

  q1("LWGK-16-09", "LWG-16", "C", "medium",
    "What happens when a drawee ACCEPTS a bill of exchange?",
    [
      "The bill is discharged",
      "It undertakes to pay the bill, becoming the acceptor",
      "The drawer is released from all liability",
      "The bill ceases to be negotiable",
    ],
    1,
    "It UNDERTAKES TO PAY, becoming the acceptor. That converts the seller's commercial claim into an instrument the market will buy, which is why an accepted bill can be discounted for cash."),

  multi2("LWGK-16-10", "LWG-16", "C", "hard",
    "Which TWO principles govern letters of credit?",
    [
      "Autonomy of the credit from the underlying sale",
      "That the bank must verify the goods conform",
      "Strict compliance of the documents with the credit's terms",
      "That the buyer may cancel an irrevocable credit at will",
    ],
    [0, 2],
    "AUTONOMY and STRICT COMPLIANCE. A bank deals in documents, not goods, and an irrevocable credit cannot be cancelled at the applicant's will — that is what makes it worth having."),
]

/* ── Chapter 17 · Agency ────────────────────────────────────────── */

const CH17: AccaQuestion[] = [
  q1("LWGK-17-01", "LWG-17", "D", "easy",
    "What does an agent do?",
    [
      "Contracts on its own account",
      "Acts so as to affect the principal's legal relations with third parties",
      "Guarantees the principal's obligations",
      "Supervises the principal's employees",
    ],
    1,
    "Affects the PRINCIPAL'S LEGAL RELATIONS with third parties, bringing principal and third party into a contractual relationship rather than contracting on its own account."),

  q1("LWGK-17-02", "LWG-17", "D", "easy",
    "Whose representation creates apparent authority?",
    ["The agent's", "The principal's", "The third party's", "Either the agent's or the principal's"],
    1,
    "The PRINCIPAL'S. An agent cannot manufacture its own apparent authority by asserting it — the holding out must come from the principal and be relied on by the third party."),

  q1("LWGK-17-03", "LWG-17", "D", "medium",
    "What must an agent do with a commission received from a supplier without the principal's knowledge?",
    ["Keep it, as it came from a third party", "Account for it to the principal", "Split it with the principal", "Declare it for tax only"],
    1,
    "ACCOUNT for it. It is a secret profit received by virtue of the position, and the absence of loss to the principal is no defence."),

  q1("LWGK-17-04", "LWG-17", "D", "medium",
    "What is implied authority?",
    [
      "Authority the agent assumes it has",
      "Authority to do what is incidental or necessary to carrying out the express authority",
      "Authority arising from the principal's holding out",
      "Authority conferred by a court",
    ],
    1,
    "Authority to do what is INCIDENTAL OR NECESSARY to the express authority. Note that an express EXCLUSION defeats an implied authority that would contradict it."),

  q2("LWGK-17-05", "LWG-17", "D", "hard",
    "A depot manager's written appointment excludes vehicle purchases, but the company has let her buy four vans from one supplier and ratified each without comment. She now orders two more from that supplier. Is the company bound?",
    [
      "No, because her appointment excluded vehicle purchases",
      "Yes — the course of dealing is a holding out by the principal, relied on by the supplier",
      "No, unless the board ratifies again",
      "Yes, because she is an employee",
    ],
    1,
    "BOUND, by APPARENT AUTHORITY. Letting her buy four vans and ratifying each is a holding out by the principal that she may buy vehicles, and the supplier relied on it. She remains liable to the company internally for exceeding her actual authority."),

  q2("LWGK-17-06", "LWG-17", "D", "hard",
    "The same manager tells a NEW supplier \"I have full authority for plant purchases\" and orders a forklift. Is the company bound?",
    [
      "Yes, because she is the depot manager",
      "No — there is no holding out by the principal, and an agent cannot create its own apparent authority",
      "Yes, because the supplier acted in good faith",
      "Yes, up to a reasonable value",
    ],
    1,
    "NOT BOUND. There is no course of dealing and no representation by the PRINCIPAL — only the agent's own assertion. The supplier's recourse is against the AGENT, for breach of warranty of authority."),

  q2("LWGK-17-07", "LWG-17", "D", "medium",
    "An agent contracts without authority. What must be true before the principal can ratify?",
    [
      "Only that the principal wishes to be bound",
      "The agent purported to act for the principal, the principal existed and was ascertainable at the time, and it ratifies with full knowledge of the material facts",
      "That the third party consents",
      "That the agent is subsequently appointed",
    ],
    1,
    "Those three conditions. The third party's consent is not needed — though ratification comes too late once the third party has withdrawn — and the agent need not be appointed afterwards. Partial ratification is not permitted."),

  q2("LWGK-17-08", "LWG-17", "D", "hard",
    "An agent contracts within authority for a principal whose existence it did not disclose. The third party later discovers the principal. Whom may it sue?",
    ["The principal only", "The agent only", "Either, at its election, but not both", "Neither"],
    2,
    "It may ELECT between them, but cannot recover from both. With an UNDISCLOSED principal the agent contracted personally and remains liable until the election is made; non-disclosure does not void the contract."),

  q1("LWGK-17-09", "LWG-17", "D", "medium",
    "Which of these is an agent of the firm for the purposes of the partnership business?",
    ["A partnership's auditor", "Each partner", "The firm's bank", "A partnership's landlord"],
    1,
    "EACH PARTNER is an agent of the firm and of the other partners for the purpose of the partnership business — which is why one partner's contract can bind them all."),

  multi2("LWGK-17-10", "LWG-17", "D", "hard",
    "Which TWO duties does an agent owe its principal?",
    [
      "Not to make a secret profit",
      "To guarantee the principal's contracts",
      "To act in the principal's interests, avoiding a conflict",
      "To indemnify the principal against all losses",
    ],
    [0, 2],
    "NOT MAKING A SECRET PROFIT and acting in the principal's interests are both fiduciary duties, along with performing with reasonable care, acting personally and accounting. An agent does not guarantee or indemnify the principal generally."),
]

/* ── Chapter 18 · Partnerships ──────────────────────────────────── */

const CH18: AccaQuestion[] = [
  q1("LWGK-18-01", "LWG-18", "D", "easy",
    "What are the three elements of a partnership?",
    [
      "A written agreement, registration and shared capital",
      "A business, carried on in common, with a view of profit",
      "Two or more persons, a bank account and a trading name",
      "Joint ownership, shared receipts and a common purpose",
    ],
    1,
    "A BUSINESS, carried on IN COMMON, with a VIEW OF PROFIT. No written agreement, registration or formality is required — a partnership can exist because of what people do."),

  q1("LWGK-18-02", "LWG-18", "D", "easy",
    "What does a limited partner risk by taking part in management?",
    ["Nothing", "Liability as a general partner for debts incurred while doing so", "Loss of their capital only", "Expulsion from the firm"],
    1,
    "Liability AS A GENERAL PARTNER for the debts incurred while managing. The protection is conditional on staying out of management."),

  q1("LWGK-18-03", "LWG-18", "D", "medium",
    "Is a new partner liable for debts incurred before joining?",
    ["Yes, automatically", "No, unless they agree to be", "Yes, for half", "Only after two years"],
    1,
    "NO, unless they AGREE to be. Conversely a retiring partner remains liable for debts incurred while a partner unless released."),

  q1("LWGK-18-04", "LWG-18", "D", "medium",
    "On dissolution, in what order are the firm's assets applied?",
    [
      "Capital, then advances, then outside creditors",
      "Outside creditors, then partners' advances, then capital, then any surplus",
      "Partners' advances, then outside creditors, then capital",
      "Equally between creditors and partners",
    ],
    1,
    "OUTSIDE CREDITORS, then partners' ADVANCES, then CAPITAL, then any surplus in profit-sharing proportions. A partner's loan ranks ahead of the return of capital, which is why the distinction matters."),

  q2("LWGK-18-05", "LWG-18", "D", "hard",
    "A partnership agreement caps each partner at $10,000. A partner signs a $60,000 contract of the kind the firm ordinarily makes, with a supplier who knows nothing of the cap. Is the firm bound?",
    [
      "No, the partner exceeded the agreed limit",
      "Yes — an internal restriction binds only a third party who knew of it or did not believe them to be a partner",
      "Yes, but only up to $10,000",
      "No, unless the other partners ratify",
    ],
    1,
    "BOUND. A partner binds the firm for acts done in the usual way of its business unless the third party KNEW of the lack of authority or did not believe them to be a partner. The contract is not scaled down, and the partner is liable to the others internally."),

  q2("LWGK-18-06", "LWG-18", "D", "hard",
    "A partner retires and no notice is given to clients. A long-standing client later engages the firm and is owed damages for work done after the retirement. Is the retired partner liable?",
    [
      "No, liability ends on retirement",
      "Potentially yes, to a client who still believed them to be a partner, because no notice was given",
      "No, unless they returned to the firm",
      "Only for debts incurred in the first month",
    ],
    1,
    "POTENTIALLY YES. Without notice, a retiring partner may be caught by LATER obligations owed to those who reasonably still treat them as a partner. Giving notice on retirement is the single most practical point in the topic."),

  q2("LWGK-18-07", "LWG-18", "D", "medium",
    "Two people jointly own a building and divide the rent. Are they partners?",
    [
      "Yes, they share income equally",
      "No — joint ownership and sharing receipts is not \"carrying on a business in common with a view of profit\" under s.1(1)",
      "Yes, letting property is a business",
      "Only with a written agreement",
    ],
    1,
    "NOT PARTNERS. Under s.1(1), joint ownership and division of receipts is not carrying on a BUSINESS IN COMMON with a view of profit, and sharing gross returns is expressly insufficient."),

  q2("LWGK-18-08", "LWG-18", "D", "hard",
    "On dissolution assets are $300,000. Outside creditors are owed $180,000, a partner made a $50,000 loan to the firm, and capital contributions totalled $120,000. What is the position?",
    [
      "Capital is returned first, then the loan, then creditors",
      "Creditors take $180,000, the loan is repaid $50,000, and $70,000 goes to capital, leaving a $50,000 shortfall borne in profit-sharing proportions",
      "The loan ranks equally with capital",
      "Creditors and the loan rank equally",
    ],
    1,
    "Creditors first, then the ADVANCE, then capital. Only $70,000 remains against $120,000 of capital, and the $50,000 shortfall falls on the partners in their profit-sharing proportions — which is where unlimited liability bites."),

  q1("LWGK-18-09", "LWG-18", "D", "medium",
    "Which event does NOT of itself dissolve a partnership?",
    ["Death of a partner", "Bankruptcy of a partner", "Illegality of the business", "A partner going on extended leave"],
    3,
    "EXTENDED LEAVE. Death, bankruptcy (subject to contrary agreement) and illegality all dissolve the firm, as do expiry of a fixed term, notice in a partnership at will, and a court order."),

  multi2("LWGK-18-10", "LWG-18", "D", "hard",
    "Which TWO statements about partners' liability are correct?",
    [
      "Every partner in a general partnership is liable for the firm's debts without limit",
      "A partnership must register to exist",
      "A person held out as a partner may be liable to a third party who gave credit on that appearance",
      "Partners' liability is capped at their capital contribution",
    ],
    [0, 2],
    "UNLIMITED liability and liability by HOLDING OUT are both correct. No registration is needed for a general partnership, and there is no cap at the capital contribution — that is the limited partner's position, and only while they stay out of management."),
]

/* ── Chapter 19 · Corporations and the veil ─────────────────────── */

const CH19: AccaQuestion[] = [
  q1("LWGK-19-01", "LWG-19", "D", "easy",
    "Whose liability does \"limited liability\" limit?",
    ["The company's", "The member's", "The directors'", "The creditors'"],
    1,
    "The MEMBER'S, to the amount unpaid on their shares — nothing further where the shares are fully paid. The company remains liable for its debts in full; it simply may be unable to pay them."),

  q1("LWGK-19-02", "LWG-19", "D", "easy",
    "What is perpetual succession?",
    [
      "That directors serve for life",
      "That the company continues in existence regardless of changes in its membership",
      "That shares cannot be transferred",
      "That the company's objects cannot be altered",
    ],
    1,
    "That the COMPANY CONTINUES regardless of who owns or runs it — a consequence of separate legal personality, and one of incorporation's practical advantages over a partnership."),

  q1("LWGK-19-03", "LWG-19", "D", "medium",
    "Which is generally available to a PRIVATE company but not a public one?",
    ["Separate legal personality", "A written resolution instead of a meeting", "Limited liability", "Filing accounts"],
    1,
    "WRITTEN RESOLUTIONS. Separate personality, limited liability and filing obligations apply to both, and a public company faces a capital minimum and heavier disclosure besides."),

  q1("LWGK-19-04", "LWG-19", "D", "medium",
    "In a company limited by guarantee, what do members undertake?",
    [
      "To pay the amount unpaid on their shares",
      "To contribute a nominal sum on winding up",
      "To indemnify creditors in full",
      "Nothing at all",
    ],
    1,
    "To contribute a NOMINAL SUM on winding up. Companies limited by guarantee are typically used for non-profit bodies; a company limited by shares works on the amount unpaid on the shares."),

  q2("LWGK-19-05", "LWG-19", "D", "hard",
    "A sole shareholder and director insures the company's plant in their own name. It is destroyed. Can they claim?",
    [
      "Yes, they own the whole company",
      "No — the plant belongs to the company, a separate legal person, so they have no insurable interest",
      "Yes, up to the value of their shares",
      "Only if the company is private",
    ],
    1,
    "NO. The plant belongs to the COMPANY. The shareholder owns SHARES, not assets, so has no insurable interest in the plant — and the same separation is what keeps their personal assets beyond the company's creditors."),

  q2("LWGK-19-06", "LWG-19", "D", "hard",
    "A company owes a judgment debt. Its owner incorporates a new company, transfers the assets to it for a nominal sum, and carries on the identical business from the same premises. Can the creditor reach the new company?",
    [
      "No, each company is a separate legal person",
      "Realistically yes — using incorporation to evade a liability already incurred is a recognised ground for lifting the veil",
      "Only if the two companies have the same name",
      "Only with the owner's consent",
    ],
    1,
    "REALISTICALLY YES. Moving assets into a new shell to escape a liability ALREADY INCURRED is evasion, a recognised ground, and the new company looks like a façade. The transfer is also likely attackable as a transaction defrauding creditors."),

  q2("LWGK-19-07", "LWG-19", "D", "hard",
    "A creditor of one group company argues the court should treat the group as one economic unit and make the profitable parent liable. Will that succeed?",
    [
      "Yes, groups are always treated as one entity",
      "Generally no — common ownership and control are not a ground for lifting the veil",
      "Yes, if the parent owns more than 75%",
      "Only if the subsidiary is insolvent",
    ],
    1,
    "GENERALLY NO. Single-economic-unit reasoning is not itself a ground. A recognised ground is needed — statute, fraud or a sham, evasion of an existing liability, or genuine agency. The subsidiary's insolvency is the usual reason for trying, not a ground."),

  q2("LWGK-19-08", "LWG-19", "D", "medium",
    "Which is a recognised ground for lifting the veil of incorporation?",
    [
      "That the outcome would otherwise be unfair",
      "An express statutory provision, such as liability for wrongful trading",
      "That the company has only one shareholder",
      "That the company is loss-making",
    ],
    1,
    "An express STATUTORY provision. Fraud or a sham, evasion of an existing liability and genuine agency are the others. General unfairness, single membership and losses are not grounds — using a company to limit exposure is what incorporation is for."),

  q1("LWGK-19-09", "LWG-19", "D", "medium",
    "Who owns a company's business assets?",
    ["The shareholders, in proportion to their holdings", "The company itself", "The directors, as trustees", "The creditors"],
    1,
    "The COMPANY ITSELF. Members own shares, not the underlying assets — which is why a member cannot use company property as their own or insure it personally."),

  multi2("LWGK-19-10", "LWG-19", "D", "hard",
    "Which TWO differences distinguish a company from a general partnership?",
    [
      "The company is a separate legal person",
      "The company's members manage the business personally",
      "The company continues regardless of changes in membership",
      "The company's members are liable without limit",
    ],
    [0, 2],
    "SEPARATE LEGAL PERSONALITY and PERPETUAL SUCCESSION. A company is managed by DIRECTORS, who need not be members, and its members' liability is LIMITED — unlimited liability is the partnership position."),
]

/* ── Chapter 20 · Promoters, pre-incorporation contracts, registration ── */

const CH20: AccaQuestion[] = [
  q1("LWGK-20-01", "LWG-20", "D", "easy",
    "Who is liable on a contract made in a company's name before it is incorporated?",
    ["The company, once registered", "The person who signed it", "Nobody — the contract is void", "The registrar"],
    1,
    "The PERSON WHO SIGNED, personally — and they are correspondingly entitled to enforce it. The company did not exist, so it had no capacity to contract and no agent could act for it."),

  q1("LWGK-20-02", "LWG-20", "D", "easy",
    "What is the legal effect of the certificate of incorporation?",
    [
      "Evidence of the company's solvency",
      "Conclusive evidence that the company exists and has been duly registered",
      "Authority for a public company to trade",
      "Adoption of pre-incorporation contracts",
    ],
    1,
    "CONCLUSIVE EVIDENCE of existence and due registration — nothing more. A public company may still need a separate trading certificate before it may trade."),

  q1("LWGK-20-03", "LWG-20", "D", "medium",
    "When may a promoter keep a profit made from a transaction with the company?",
    ["Never", "Where it has been fully disclosed to an independent board or the members", "Where the company benefits overall", "Where it is under 10% of the price"],
    1,
    "Where it has been FULLY DISCLOSED to an independent board or to the members. A promoter is not forbidden to profit — only to profit SECRETLY."),

  q1("LWGK-20-04", "LWG-20", "D", "medium",
    "Why must a company keep a register of people with significant control?",
    [
      "To calculate dividends accurately",
      "To make beneficial ownership transparent, because chains of companies can conceal who ultimately owns or controls the business",
      "To record employees' shareholdings",
      "To satisfy the auditor",
    ],
    1,
    "For BENEFICIAL OWNERSHIP TRANSPARENCY. It addresses the same concerns as the money laundering controls: layered structures can otherwise hide who ultimately benefits."),

  q2("LWGK-20-05", "LWG-20", "D", "hard",
    "A promoter signs a lease in the name of a company not yet incorporated. After registration the board resolves to \"ratify and adopt\" it. Who is liable?",
    [
      "The company, having ratified",
      "The promoter personally — a company cannot ratify a contract made before it existed",
      "Neither, the contract being void",
      "Both jointly and severally",
    ],
    1,
    "The PROMOTER. Ratification needs a principal IN EXISTENCE at the time of the act, and the company was not. The board resolution achieves nothing; only NOVATION or a fresh contract can bind the company."),

  q2("LWGK-20-06", "LWG-20", "D", "hard",
    "How can a pre-incorporation contract be made binding on the company?",
    [
      "By a board resolution adopting it",
      "By novation — a fresh agreement between company, third party and promoter releasing the promoter",
      "By filing it with the registrar",
      "By the company performing part of it",
    ],
    1,
    "By NOVATION, or by a new contract after incorporation. A board resolution does not bind the third party, who must be party to any replacement — which is why the third party's co-operation is essential."),

  q2("LWGK-20-07", "LWG-20", "D", "medium",
    "A promoter sells their own property to the company at an undisclosed mark-up. What remedies has the company?",
    [
      "None, as the promoter owned the property",
      "Rescission of the contract, recovery of the secret profit, or damages for breach of fiduciary duty",
      "Only a claim for the mark-up",
      "Only rescission",
    ],
    1,
    "All three are available: RESCISSION, RECOVERY of the secret profit, or DAMAGES. The breach is the non-disclosure, not the profit itself — disclosure to an independent board or the members would have cured it."),

  q2("LWGK-20-08", "LWG-20", "D", "medium",
    "What is the trade-off of streamlined electronic company registration?",
    [
      "It costs more",
      "Less flexibility, because it depends on adopting the model articles unamended",
      "The certificate has weaker legal effect",
      "The company cannot later alter its articles",
    ],
    1,
    "LESS FLEXIBILITY: it depends on adopting the MODEL ARTICLES without amendment, so bespoke articles or unusual share classes need the full procedure. The certificate and its effect are identical either way, and the articles can still be altered later."),

  q1("LWGK-20-09", "LWG-20", "D", "medium",
    "Is a solicitor who simply carries out instructions to form a company a promoter?",
    ["Yes, always", "Generally no, acting purely in a professional capacity", "Only if paid a fee", "Only if they become a director"],
    1,
    "GENERALLY NO. Promoter status is a question of FACT, not title, and a person acting purely in a professional capacity on instructions is not one."),

  multi2("LWGK-20-10", "LWG-20", "D", "hard",
    "Which TWO must a company keep or make?",
    [
      "A register of members",
      "A register of its customers",
      "A confirmation statement to the registrar",
      "A register of its competitors",
    ],
    [0, 2],
    "A REGISTER OF MEMBERS and a periodic CONFIRMATION STATEMENT, along with registers of directors, secretaries, significant control and charges, minute books and accounting records. Customers and competitors are not statutory registers."),
]

/* ── Chapter 21 · The constitution and names ────────────────────── */

const CH21: AccaQuestion[] = [
  q1("LWGK-21-01", "LWG-21", "D", "easy",
    "In what capacity are the articles of association enforceable?",
    ["By anyone named in them", "Qua member — in respect of membership rights", "By creditors", "By employees"],
    1,
    "QUA MEMBER, in respect of MEMBERSHIP rights. An outsider cannot enforce the articles, and neither can a member acting in some other capacity."),

  q1("LWGK-21-02", "LWG-21", "D", "easy",
    "How are the articles altered?",
    ["By ordinary resolution", "By special resolution", "By the directors alone", "By the registrar"],
    1,
    "By SPECIAL RESOLUTION, filed with the registrar — subject to any entrenchment and to the Allen v Gold Reefs requirement that the alteration be bona fide for the benefit of the company as a whole."),

  q1("LWGK-21-03", "LWG-21", "D", "medium",
    "Does registration of a company name protect it against a passing off claim?",
    ["Yes", "No — it only means the name passed the registration controls", "Yes, for five years", "Only for a public company"],
    1,
    "NO. Acceptance by the registrar is no defence to passing off or trade mark infringement, and under s.67 the registrar may still direct a change where a name is the same as or too like an existing one."),

  q1("LWGK-21-04", "LWG-21", "D", "medium",
    "Does a change of company name create a new legal person?",
    ["Yes", "No — rights, obligations and proceedings are unaffected", "Yes, for tax purposes only", "Only where the objects also change"],
    1,
    "NO. It is the SAME legal person; rights, obligations and legal proceedings are unaffected, and the change takes effect when a new certificate is issued."),

  q2("LWGK-21-05", "LWG-21", "D", "hard",
    "The articles state that a named shareholder shall be the company's solicitor for life. The company engages another firm. Can the shareholder sue on the articles?",
    [
      "Yes, the articles are a contract binding the company",
      "No — the articles bind only in respect of membership rights, and being the company's solicitor is not one",
      "Yes, because they are a member",
      "Only if they hold a majority",
    ],
    1,
    "NO. A right to be engaged as solicitor is not a MEMBERSHIP right, so it is unenforceable under the articles even though the claimant is a shareholder. The size of the holding makes no difference."),

  q2("LWGK-21-06", "LWG-21", "D", "hard",
    "A special resolution alters the articles to require each member to subscribe for more shares. One member did not consent in writing. Is that member bound?",
    [
      "Yes, a special resolution binds all members",
      "No — a member's liability to contribute to share capital cannot be increased without their written consent",
      "Yes, if the alteration benefits the company",
      "Only if they attended the meeting",
    ],
    1,
    "NOT BOUND. An alteration cannot increase a member's liability to contribute to SHARE CAPITAL without that member's WRITTEN CONSENT, whatever majority was obtained and whatever the benefit to the company."),

  q2("LWGK-21-07", "LWG-21", "D", "medium",
    "A company contracts with a member not to alter a particular article. It then alters it anyway. What is the position?",
    [
      "The alteration is void",
      "The alteration is valid, but the company may be liable in damages for breach of contract",
      "The member may have the alteration set aside",
      "The contract prevents any alteration",
    ],
    1,
    "The alteration is VALID and the company may owe DAMAGES. A company cannot deprive itself of the statutory power to alter its articles by contract — distinguishing \"invalid\" from \"valid but actionable\" is the point being tested."),

  q2("LWGK-21-08", "LWG-21", "D", "hard",
    "The articles entrench a pre-emption clause, alterable only with all members' consent. Three of four members pass a special resolution deleting it so one of them can sell to an outsider. Is the deletion effective?",
    [
      "Yes, a special resolution suffices",
      "No — the entrenchment condition was not met, and the alteration is also hard to justify as bona fide for the company as a whole",
      "Yes, because the majority decided",
      "Only if the fourth member is compensated",
    ],
    1,
    "NOT EFFECTIVE. The ENTRENCHMENT required all members' consent, which was not obtained; and stripping a minority of a pre-emption right so a majority member can sell at a premium is difficult to justify as BONA FIDE for the company as a whole."),

  q1("LWGK-21-09", "LWG-21", "D", "medium",
    "Which is a restriction on the name a company may use?",
    [
      "It must not be in a foreign language",
      "It must not be the same as an existing registered name",
      "It must include the founder's surname",
      "It must not exceed twenty characters",
    ],
    1,
    "It must not be THE SAME AS an existing registered name. It must also not be offensive, must not imply a government connection without approval, needs approval for sensitive words, and must carry the appropriate status indicator."),

  multi2("LWGK-21-10", "LWG-21", "D", "hard",
    "Which TWO matters do model articles typically cover?",
    [
      "Directors' decision-making, including quorum and conflicts",
      "The company's commercial pricing policy",
      "Members' decision-making, including notice and voting",
      "The auditor's fee scale",
    ],
    [0, 2],
    "DIRECTORS' and MEMBERS' DECISION-MAKING, along with appointments, shares, dividends and administrative arrangements. Commercial pricing and audit fees are not constitutional matters."),
]

/** LW-Global's authored question kit for Areas C and D — chapters 14 to 21. */
export const LWG_KIT_CD: AccaQuestion[] = [
  ...CH14,
  ...CH15,
  ...CH16,
  ...CH17,
  ...CH18,
  ...CH19,
  ...CH20,
  ...CH21,
]
