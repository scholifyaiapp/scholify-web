/*
 * LW-Global Areas C and D — transportation and payment of international business,
 * and the formation and constitution of business organisations.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area C's distractors mostly confuse WHO IS LIABLE TO WHOM in a chain of banks or
 * carriers, so those plans identify the parties before applying any rule. Area D's
 * distractors mostly confuse the AGENT with the PRINCIPAL, or the company with its
 * members — so those plans fix which legal person is being asked about first.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWG_PLANS_CD: ExamPlanMap = {
  /* ── LWG-14 · Bills of lading ────────────────────────────────── */

  "LWG-14::what-it-is": {
    title: "The three functions of a bill of lading",
    format: "ot",
    marks: 2,
    requirement:
      "A bill of lading performs which three functions?\n\nA  Receipt for the goods, evidence of the contract of carriage, and document of title\nB  Insurance policy, receipt, and invoice\nC  Document of title, invoice, and export licence\nD  Contract of sale, receipt, and customs declaration",
    plan: [
      {
        step: "Learn the three as a set",
        detail:
          "A receipt for the goods shipped, evidence of the contract of carriage, and a document of title to the goods. The third is what makes it commercially special.",
      },
      {
        step: "Understand why the title function matters",
        detail:
          "Because it is a document of title, transferring the bill transfers the right to the goods. So goods can be sold while at sea, and a bank can hold the bill as security — neither is possible with an ordinary receipt.",
      },
      {
        step: "Reject the options importing other documents",
        detail:
          "An invoice, an insurance policy, an export licence and a customs declaration are separate documents in the shipping set. Each option except the first mixes in at least one of them.",
      },
      {
        step: "Note it is not the contract of sale",
        detail:
          "It is evidence of the contract of CARRIAGE between shipper and carrier, not the sale contract between seller and buyer. Option D makes exactly that substitution.",
      },
    ],
    answer:
      "**A — receipt for the goods, evidence of the contract of carriage, and document of title.**\n\nThe third function is what makes the bill commercially special. Because it is a **document of title**, transferring it transfers the right to the goods — so goods can be sold while still at sea, and a bank can take the bill as **security** for financing the transaction. Neither is possible with an ordinary receipt.\n\nThe other options each import a separate document from the shipping set: the invoice, the insurance policy, the export licence, the customs declaration.\n\nOption D makes a specific substitution worth noticing: the bill evidences the contract of **carriage** between shipper and carrier, not the contract of **sale** between seller and buyer.\n\nA **clean** bill states no defect in the goods or packaging; a **claused** or dirty bill notes one, and a bank will normally refuse it under a letter of credit.",
    earns: [
      "Naming all three functions and explaining why the title function matters commercially",
      "Distinguishing the contract of carriage from the contract of sale",
    ],
    loses: ["Treating the bill as evidence of the sale contract"],
  },

  "LWG-14::types": {
    title: "Which transport documents are negotiable",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** a document of title, so that transferring it does not transfer rights to the goods?\n\nA  A bearer bill of lading\nB  An order bill of lading\nC  A sea waybill\nD  A bill of lading endorsed in blank",
    plan: [
      {
        step: "Split the documents by whether they are negotiable",
        detail:
          "Negotiable: order bills and bearer bills, which can be transferred by endorsement or delivery. Non-negotiable: straight bills naming a consignee, and sea waybills.",
      },
      {
        step: "Identify what a sea waybill does",
        detail:
          "It is a receipt and evidence of the contract of carriage, but NOT a document of title. Goods are released to the named consignee on identification rather than against surrender of the document.",
      },
      {
        step: "Note why waybills are used at all",
        detail:
          "Speed. On short voyages the goods arrive before the documents could, so a document that need not be presented avoids delay — at the cost of losing the ability to sell in transit or to use it as security.",
      },
      {
        step: "Check the endorsed-in-blank option",
        detail:
          "An order bill endorsed in blank becomes transferable by delivery, effectively a bearer bill. So it is still a document of title, and option D is negotiable rather than not.",
      },
    ],
    answer:
      "**C — a sea waybill.**\n\nA sea waybill is a receipt and evidence of the contract of carriage, but **not a document of title**. The goods are released to the named consignee on identification rather than against surrender of the document.\n\nSo it cannot be used to sell goods in transit, and a bank cannot take it as security — which is the commercial consequence.\n\nWaybills are used for **speed**: on short voyages the goods arrive before the documents could, and a document that need not be presented avoids the delay. The trade is convenience against the loss of the title function.\n\n**Order** bills and **bearer** bills are negotiable, and an order bill **endorsed in blank** becomes transferable by delivery — effectively a bearer bill, and still a document of title, which is why option D does not answer the question.\n\nA **straight** bill naming a consignee is likewise not negotiable.",
    earns: [
      "Splitting the documents on negotiability and knowing what a waybill sacrifices",
      "Recognising that endorsement in blank keeps the document negotiable",
    ],
    loses: ["Treating every document called a bill of lading as negotiable"],
  },

  /* ── LWG-15 · Bank transfers ─────────────────────────────────── */

  "LWG-15::the-mechanism": {
    title: "Identifying the parties to a credit transfer",
    format: "ot",
    marks: 2,
    requirement:
      "In a credit transfer under the UNCITRAL Model Law on International Credit Transfers, the party who issues the first payment order is the:\n\nA  Beneficiary\nB  Originator\nC  Receiving bank\nD  Intermediary bank",
    plan: [
      {
        step: "Set the chain out in order",
        detail:
          "ORIGINATOR issues the first payment order → originator's bank → any intermediary banks → beneficiary's bank → BENEFICIARY receives the funds. The vocabulary follows the direction of the money.",
      },
      {
        step: "Match the stem to the start of the chain",
        detail:
          "The first payment order comes from the party paying, which is the originator. Every other option is somewhere further along the chain.",
      },
      {
        step: "Note what a receiving bank is",
        detail:
          "\"Receiving bank\" is a role rather than a fixed party: each bank in the chain is the receiving bank of the order sent to it. It is a relative term, which is what makes it a plausible distractor.",
      },
      {
        step: "Fix the completion moment",
        detail:
          "The transfer is complete when the beneficiary's bank ACCEPTS the payment order for the beneficiary's benefit. Not when the originator issues it, and not when funds physically move.",
      },
    ],
    answer:
      "**B — the originator.**\n\nThe chain runs: **originator** issues the first payment order → **originator's bank** → any **intermediary banks** → **beneficiary's bank** → **beneficiary** receives the funds. The vocabulary follows the direction of the money, so learning it in order is enough.\n\n\"**Receiving bank**\" is a relative role rather than a fixed party — each bank in the chain is the receiving bank of the order sent to it — which is what makes it a plausible distractor.\n\nThe moment that matters for completion is worth holding separately: the transfer is complete when the **beneficiary's bank accepts** the payment order for the beneficiary's benefit. Not when the originator issues it, and not when funds physically move.\n\nThat matters because completion determines when the originator has discharged its payment obligation to the beneficiary under the underlying sale contract.",
    earns: [
      "Learning the chain in order and knowing \"receiving bank\" is a relative role",
      "Knowing completion turns on acceptance by the beneficiary's bank",
    ],
    loses: ["Treating completion as the moment the originator issues the order"],
  },

  "LWG-15::obligations": {
    title: "Who is liable when a transfer goes wrong",
    format: "ot",
    marks: 2,
    requirement:
      "A credit transfer is delayed by an intermediary bank. Under the Model Law the intermediary bank is liable to:\n\nA  The originator only\nB  The beneficiary, by paying interest for the period of delay\nC  Nobody, as banks act only as agents\nD  The originator's bank only",
    plan: [
      {
        step: "State the general rule on delay",
        detail:
          "A receiving bank that fails to execute a payment order within the required time is liable to pay INTEREST for the period of delay. Interest is the measure, because the loss is the use of the money.",
      },
      {
        step: "Identify to whom the interest is payable",
        detail:
          "To the beneficiary, if the transfer is completed, since the beneficiary is the party deprived of the funds. That is the point the question tests, because candidates assume liability runs back up the chain.",
      },
      {
        step: "Reject the no-liability option",
        detail:
          "Option C treats banks as mere agents with no responsibility. The Model Law imposes duties directly on each receiving bank, precisely so that liability does not disappear into the chain.",
      },
      {
        step: "Note the completion consequence for the originator",
        detail:
          "If the transfer is NOT completed, the originator is entitled to a refund of the amount paid with interest — the money-back guarantee, which sits alongside the interest remedy for delay.",
      },
    ],
    answer:
      "**B — the beneficiary, by paying interest for the period of delay.**\n\nA receiving bank that fails to execute a payment order within the required time is liable to pay **interest** for the period of the delay. Interest is the right measure because the loss caused by delay is the loss of the use of the money.\n\nWhere the transfer is completed, that interest is payable to the **beneficiary** — the party actually deprived of the funds. Candidates assume liability runs back up the chain to whoever gave the order, which is what the question is testing.\n\nOption C treats banks as mere agents with no responsibility; the Model Law imposes duties on each receiving bank directly, so that liability cannot disappear into the chain.\n\nAlongside this sits the **money-back guarantee**: where the transfer is **not completed**, the originator is entitled to a refund of the amount paid, with interest.",
    earns: [
      "Knowing interest is the measure for delay and to whom it is payable",
      "Naming the money-back guarantee for a transfer that is never completed",
    ],
    loses: ["Assuming each bank is liable only to the party immediately above it"],
  },

  /* ── LWG-16 · Bills of exchange, credits, comfort letters ────── */

  "LWG-16::bills-and-notes": {
    title: "Distinguishing a bill of exchange from a promissory note",
    format: "ot",
    marks: 2,
    requirement:
      "The essential difference between a bill of exchange and a promissory note is that a bill of exchange:\n\nA  Is an order by one party to another to pay, whereas a note is a promise by the maker to pay\nB  Cannot be transferred\nC  Is always payable on demand\nD  Does not need to be in writing",
    plan: [
      {
        step: "Reduce each instrument to its form",
        detail:
          "A bill of exchange is an ORDER: the drawer orders the drawee to pay the payee. A promissory note is a PROMISE: the maker undertakes to pay. Three parties against two.",
      },
      {
        step: "Count the parties as the quick test",
        detail:
          "A bill involves three parties, a note two. Counting them separates the instruments faster than recalling any definition.",
      },
      {
        step: "Reject the transferability claim",
        detail:
          "Both are negotiable instruments and both may be transferred by endorsement and delivery. Negotiability is what they have in common, not what separates them.",
      },
      {
        step: "Reject the timing and form claims",
        detail:
          "A bill may be payable on demand or at a determinable future time — a time bill is the commercially important case. And both must be in writing and signed.",
      },
    ],
    answer:
      "**A — is an order by one party to another to pay, whereas a note is a promise by the maker to pay.**\n\nA **bill of exchange** is an order involving three parties: the **drawer** orders the **drawee** to pay the **payee**. A **promissory note** is a promise involving two: the **maker** undertakes to pay the payee. Counting the parties is the fastest test.\n\nBoth are **negotiable instruments** transferable by endorsement and delivery, so negotiability is what they share rather than what separates them.\n\nA bill may be payable **on demand** or at a **determinable future time**, and the time bill is the commercially important case: it gives the buyer credit while letting the seller discount the bill for cash before maturity. Both must be in writing and signed.\n\n**Acceptance** is the drawee signing the bill to undertake payment, which is what makes an accepted bill valuable to a discounting bank.",
    earns: [
      "Counting the parties, and knowing why a time bill is commercially useful",
      "Naming acceptance and its effect",
    ],
    loses: ["Assuming a bill of exchange is always payable on demand"],
  },

  "LWG-16::letters-of-credit": {
    title: "Why a documentary credit is autonomous of the sale contract",
    format: "ot",
    marks: 2,
    requirement:
      "A bank has issued an irrevocable documentary credit. The buyer claims the goods are defective and instructs the bank not to pay. The bank must:\n\nA  Refuse payment, as instructed by its customer\nB  Pay against documents that conform to the credit, regardless of the dispute about the goods\nC  Investigate the quality of the goods before deciding\nD  Pay only half the amount",
    plan: [
      {
        step: "State the autonomy principle",
        detail:
          "The credit is a separate undertaking by the BANK to the seller, independent of the sale contract. The bank's obligation is to pay against conforming DOCUMENTS, not against conforming goods.",
      },
      {
        step: "Say what the bank does and does not examine",
        detail:
          "It examines the documents for conformity with the credit's terms. It does not inspect goods, and it is not concerned with whether the underlying sale has been properly performed.",
      },
      {
        step: "See why the rule must be this way",
        detail:
          "The seller's whole reason for requiring a credit is a payment undertaking that cannot be blocked by the buyer's allegations. A bank that could be instructed to refuse would provide no security at all.",
      },
      {
        step: "Note the buyer's actual remedy",
        detail:
          "The buyer's complaint about the goods lies against the SELLER under the sale contract. It does not run against the bank, and pursuing it does not suspend the credit.",
      },
    ],
    answer:
      "**B — pay against documents that conform to the credit, regardless of the dispute about the goods.**\n\nThe **autonomy** principle is the whole point of a documentary credit: it is a separate undertaking by the **bank** to the seller, independent of the sale contract. The bank's obligation is to pay against conforming **documents**, and it deals in documents rather than goods.\n\nSo the bank examines the documents for compliance with the credit's terms. It does not inspect the goods and is not concerned with whether the sale was properly performed.\n\nThe rule must be this way because the seller's reason for requiring a credit is a payment undertaking that the buyer cannot block by allegation. A bank that could be instructed to refuse would provide no security at all — and no seller would ship against one.\n\nThe buyer's remedy for defective goods lies against the **seller** under the sale contract, and pursuing it does not suspend the credit. **Irrevocable** means the credit cannot be amended or cancelled without the beneficiary's agreement.",
    earns: [
      "Naming autonomy and stating that the bank deals in documents, not goods",
      "Directing the buyer's remedy to the seller rather than the bank",
    ],
    loses: ["Allowing the applicant to stop payment, which would destroy the credit's function"],
  },

  "LWG-16::letters-of-comfort": {
    title: "Whether a letter of comfort creates a legal obligation",
    format: "ot",
    marks: 2,
    requirement:
      "A parent company gives a lender a letter stating that it is its \"present policy\" to ensure its subsidiary can meet its obligations. The subsidiary defaults. The lender:\n\nA  Can enforce the letter as a guarantee\nB  Generally cannot enforce it, as such wording indicates no intention to create a legal obligation\nC  Can enforce it only if the letter is signed\nD  Can enforce it against the subsidiary",
    plan: [
      {
        step: "Read the wording for what it commits to",
        detail:
          "\"Present policy\" is a statement of current intention, not a promise about the future. A policy can change, and the wording is chosen precisely so that it can.",
      },
      {
        step: "Apply the intention test",
        detail:
          "Whether a letter of comfort binds depends on whether the words show an intention to create a legal obligation. A statement of policy generally does not; an undertaking to ensure payment generally does.",
      },
      {
        step: "Contrast with a guarantee",
        detail:
          "A guarantee is a legally binding secondary obligation to pay if the principal debtor does not. A comfort letter is usually a moral assurance, which is why parents give one instead.",
      },
      {
        step: "Note why the parent prefers it",
        detail:
          "It reassures the lender without creating a liability that must be recognised or disclosed as a guarantee. That commercial motive is what the wording is engineered to achieve.",
      },
    ],
    answer:
      "**B — generally cannot enforce it, as such wording indicates no intention to create a legal obligation.**\n\n\"**Present policy**\" states a current intention rather than promising anything about the future, and a policy can change. The wording is chosen precisely so that it can.\n\nWhether a comfort letter binds turns on whether the words show an **intention to create a legal obligation**. A statement of policy generally does not; a clear undertaking to ensure the subsidiary meets its obligations generally does. So the letter must be read closely rather than classified by its title.\n\nThe contrast is with a **guarantee** — a legally binding secondary obligation to pay if the principal debtor does not.\n\nThe parent's motive explains the whole device: a comfort letter reassures the lender without creating a liability the parent must recognise or disclose as a guarantee. The lender's protection is worth less than it appears, which is the practical lesson.",
    earns: [
      "Applying the intention test to the actual words rather than to the document's title",
      "Naming the parent's motive for using a comfort letter instead of a guarantee",
    ],
    loses: ["Treating a comfort letter as a guarantee because it was given to a lender"],
  },

  /* ── LWG-17 · Agency ─────────────────────────────────────────── */

  "LWG-17::formation": {
    title: "How an agency relationship arises",
    format: "ot",
    marks: 2,
    requirement:
      "An agency relationship may arise by:\n\nA  Express or implied agreement, ratification, or necessity\nB  Express agreement only\nC  Written agreement only\nD  Court order only",
    plan: [
      {
        step: "Recall the routes as a list",
        detail:
          "Express agreement, implied agreement from conduct or relationship, ratification of an unauthorised act, and agency of necessity. Estoppel or holding out is sometimes added.",
      },
      {
        step: "Note that writing is not required",
        detail:
          "Agency needs no formality in general, so options requiring writing or a court order are wrong on their face.",
      },
      {
        step: "Understand ratification's timing rules",
        detail:
          "The principal must have existed and had capacity at the time of the act, must ratify within a reasonable time, and must adopt the whole transaction — it cannot ratify the good parts only.",
      },
      {
        step: "Note the narrowness of necessity",
        detail:
          "Agency of necessity requires a genuine emergency, an inability to communicate with the principal, and action in the principal's interests. It is rare and is not a general power to act helpfully.",
      },
    ],
    answer:
      "**A — express or implied agreement, ratification, or necessity.**\n\nThe routes are **express** agreement, **implied** agreement from conduct or relationship, **ratification** of an act done without authority, and agency of **necessity**. Estoppel — holding someone out as an agent — is sometimes listed as a fifth.\n\nNo formality is required in general, so B, C and D are wrong on their face.\n\n**Ratification** has strict conditions and is examined for them: the principal must have existed and had capacity at the time of the act, must ratify within a reasonable time, and must adopt the **whole** transaction — a principal cannot ratify the profitable parts and disclaim the rest.\n\n**Necessity** is narrow: a genuine emergency, an inability to communicate with the principal, and action taken in the principal's interests. It is not a general licence to act helpfully.",
    earns: [
      "Naming all four routes and the conditions on ratification",
      "Knowing ratification must cover the whole transaction",
    ],
    loses: ["Requiring writing for an agency that needs no formality"],
  },

  "LWG-17::authority": {
    title: "Which kind of authority binds the principal",
    format: "ot",
    marks: 2,
    requirement:
      "A principal has privately instructed its agent not to exceed $10,000, but agents in that trade customarily contract up to $50,000. The agent contracts for $30,000 with a third party who knows nothing of the private limit. The principal is:\n\nA  Not bound, because the agent exceeded its actual authority\nB  Bound, because the agent had apparent authority\nC  Bound only up to $10,000\nD  Not bound, unless it ratifies",
    plan: [
      {
        step: "Separate the two kinds of authority",
        detail:
          "ACTUAL authority is what the principal in fact conferred, express or implied. APPARENT (or ostensible) authority is what the third party is entitled to believe the agent has, from the principal's own representation or from usual authority in the trade.",
      },
      {
        step: "Ask what the third party knew",
        detail:
          "The limit was PRIVATE and the third party knew nothing of it. A restriction the third party is unaware of cannot reduce the authority the third party may rely on.",
      },
      {
        step: "Apply the trade custom",
        detail:
          "$30,000 is within what agents in that trade customarily do, so it falls within apparent authority. The principal is bound to the third party on the contract.",
      },
      {
        step: "Note the principal's separate remedy",
        detail:
          "The principal is bound to the third party AND may sue the agent for breach of the agency agreement. Two relationships, two different answers — which is what option C tries to merge.",
      },
    ],
    answer:
      "**B — bound, because the agent had apparent authority.**\n\n**Actual** authority is what the principal in fact conferred. **Apparent** or ostensible authority is what the third party is entitled to believe the agent has, from the principal's own representation or from the authority usual for such an agent in that trade.\n\nThe limit here was **private**, and the third party knew nothing of it. A restriction the third party is unaware of cannot cut down the authority it may rely on, and $30,000 is within the trade's customary range — so the principal is bound.\n\nOption C tries to split the contract at $10,000, which confuses two separate relationships. The principal is bound to the **third party** on the whole contract, and may separately sue the **agent** for exceeding its instructions. Two relationships, two different answers.\n\nThe practical lesson is that a private limit is worthless against a third party unless the third party is told of it.",
    earns: [
      "Splitting the principal–third party relationship from the principal–agent one",
      "Testing apparent authority by what the third party knew",
    ],
    loses: ["Letting a private instruction defeat the third party's reliance"],
  },

  "LWG-17::liability": {
    title: "Who the third party can sue",
    format: "ot",
    marks: 2,
    requirement:
      "An agent contracts with a third party without disclosing that it is acting for a principal or that a principal exists. On discovering the principal, the third party may:\n\nA  Sue only the agent\nB  Sue only the principal\nC  Elect to sue either the agent or the principal\nD  Sue neither, as the contract is void",
    plan: [
      {
        step: "Classify the disclosure situation",
        detail:
          "Three cases: DISCLOSED and named, DISCLOSED but unnamed, and UNDISCLOSED — where the third party does not know a principal exists at all. The stem describes the third.",
      },
      {
        step: "Apply the rule for an undisclosed principal",
        detail:
          "The agent contracted apparently on its own account, so the agent is personally liable. On discovering the principal, the third party may ELECT to sue either — but not both.",
      },
      {
        step: "Contrast with a disclosed principal",
        detail:
          "Where the principal is disclosed and the agent acted within authority, the principal is liable and the agent generally is not. That is the ordinary case, and it is why the undisclosed case is examined.",
      },
      {
        step: "Note that election is final",
        detail:
          "Once the third party elects, it is bound by the choice. It cannot pursue the agent, fail to recover, and then turn to the principal — which is why the choice matters commercially.",
      },
    ],
    answer:
      "**C — elect to sue either the agent or the principal.**\n\nWith an **undisclosed** principal the agent appeared to contract on its own account, so the agent is personally liable on the contract. On discovering the principal the third party may **elect** to sue either — but not both, and the election is final. It cannot pursue the agent, fail to recover, and then turn to the principal.\n\nThe three disclosure situations are worth holding together. Principal **disclosed and named**: the principal is liable and the agent generally is not. Principal **disclosed but unnamed**: usually the same, though the agent may be liable depending on the circumstances. Principal **undisclosed**: the election above.\n\nThe agent is also personally liable where it acts **without authority** and the principal does not ratify, and where it signs in a way that assumes personal liability.",
    earns: [
      "Classifying the disclosure situation before applying a rule",
      "Knowing the election is final and cannot be reversed",
    ],
    loses: ["Making the principal liable regardless of whether the third party knew it existed"],
  },

  /* ── LWG-18 · Partnerships ──────────────────────────────────── */

  "LWG-18::formation-and-types": {
    title: "What makes a partnership, and what limits liability",
    format: "ot",
    marks: 2,
    requirement:
      "The essential distinction between a general partnership and a limited liability partnership is that in an LLP:\n\nA  There must be at least ten partners\nB  The LLP has separate legal personality and the partners' liability is limited\nC  No written agreement is required\nD  Profits need not be shared",
    plan: [
      {
        step: "State what a general partnership is",
        detail:
          "The relation between persons carrying on a business in common with a view of profit. It has no separate legal personality and the partners are jointly liable for its debts without limit.",
      },
      {
        step: "State what an LLP changes",
        detail:
          "It has separate legal personality, so it owns its assets and owes its own debts, and the members' liability is limited. That is one change with two consequences.",
      },
      {
        step: "Reject the numerical and formality options",
        detail:
          "No minimum number of ten applies, and a written agreement is not required for a general partnership either — so C states something true of both and distinguishes nothing.",
      },
      {
        step: "Note the price of limited liability",
        detail:
          "An LLP must register and file accounts publicly, because outsiders bear the risk of the liability limit. The same trade-off appears with companies.",
      },
    ],
    answer:
      "**B — the LLP has separate legal personality and the partners' liability is limited.**\n\nA **general partnership** is the relation between persons carrying on a business in common with a view of profit. It has no separate legal personality, and the partners are jointly liable for its debts **without limit** — each partner's personal assets are exposed.\n\nAn **LLP** has separate legal personality, so it owns its assets and owes its own debts, and its members' liability is limited. One change, two consequences.\n\nOption C states something true of a general partnership as well, so it distinguishes nothing — a partnership agreement is advisable but not required, and default rules fill the gaps.\n\nThe price of the liability limit is **disclosure**: an LLP must register and file accounts publicly, because outsiders bear the risk of that limit. The same trade-off runs through company law.",
    earns: [
      "Naming both consequences of separate personality, and the disclosure price of the liability limit",
      "Noticing an option that is true of both forms",
    ],
    loses: ["Treating the absence of a written agreement as a distinguishing feature"],
  },

  "LWG-18::authority-and-liability": {
    title: "When a partner's act binds the firm",
    format: "ot",
    marks: 2,
    requirement:
      "A partner in a firm of accountants borrows $50,000 in the firm's name for a purpose unconnected with the business, from a lender who is unaware of this. The firm is:\n\nA  Bound, because a partner can always bind the firm\nB  Bound, because the act appeared to be in the ordinary course of the firm's business and the lender did not know otherwise\nC  Not bound, because the purpose was unconnected with the business\nD  Not bound, unless all partners consented",
    plan: [
      {
        step: "Recognise the partner as an agent of the firm",
        detail:
          "Every partner is an agent of the firm and of the other partners. So the whole question is one of agency authority, and the apparent authority analysis applies directly.",
      },
      {
        step: "Apply the ordinary course test",
        detail:
          "An act done in the ordinary course of the firm's kind of business binds the firm, unless the partner had no authority AND the third party knew that, or did not know they were a partner.",
      },
      {
        step: "Test the third party's knowledge",
        detail:
          "Borrowing is ordinary for a business, and the lender was unaware of the improper purpose. So it appeared within the ordinary course and the firm is bound.",
      },
      {
        step: "Separate the firm's liability from the partner's",
        detail:
          "The firm is bound to the lender, and the partner is liable to the other partners for the misuse. Option C confuses the internal wrong with the external liability.",
      },
    ],
    answer:
      "**B — bound, because the act appeared to be in the ordinary course of the firm's business and the lender did not know otherwise.**\n\nEvery partner is an **agent** of the firm and of the other partners, so this is the apparent authority analysis applied to a partnership.\n\nAn act done in the ordinary course of the firm's kind of business binds the firm, **unless** the partner had no authority and the third party knew that, or did not know they were dealing with a partner. Borrowing is ordinary for a business, and the lender was unaware of the improper purpose — so the firm is bound.\n\nOption C confuses the internal wrong with the external liability. The firm is bound to the **lender**; the partner is separately liable to the **other partners** for misusing the firm's name. Two relationships again, and only one of them concerns the lender.\n\nOption A overstates: a partner does not bind the firm for acts plainly outside its kind of business.",
    earns: [
      "Treating a partner as an agent and applying the ordinary course test with the third party's knowledge",
      "Keeping the firm's external liability separate from the partner's internal one",
    ],
    loses: ["Letting the partner's improper purpose defeat an innocent lender"],
  },

  "LWG-18::termination": {
    title: "What happens on dissolution",
    format: "ot",
    marks: 2,
    requirement:
      "On the dissolution of a general partnership, the assets are applied first to:\n\nA  Repaying partners' capital\nB  Paying the firm's debts to outside creditors\nC  Distributing profits between the partners\nD  Paying the partners' salaries",
    plan: [
      {
        step: "Recall the order of application",
        detail:
          "Outside creditors first; then advances or loans made by partners; then partners' capital; then any surplus divided as profits in the profit-sharing ratio.",
      },
      {
        step: "See why outsiders rank first",
        detail:
          "Partners are the owners, and owners rank behind creditors on a winding up. This is the same principle as the order of payment in a corporate liquidation.",
      },
      {
        step: "Note the partner-as-lender distinction",
        detail:
          "A partner who LENT money to the firm ranks after outside creditors but before capital. A partner wears two hats and the loan is treated differently from the capital contribution.",
      },
      {
        step: "Note the deficiency rule",
        detail:
          "If the assets are insufficient, the partners must contribute to make up the shortfall in the ratio in which they share profits — which is where unlimited liability actually bites.",
      },
    ],
    answer:
      "**B — paying the firm's debts to outside creditors.**\n\nThe order is: **outside creditors**, then **advances or loans** made by partners, then partners' **capital**, then any surplus divided as **profits** in the profit-sharing ratio.\n\nOutsiders rank first because partners are the owners, and owners rank behind creditors on a winding up — the same principle as the order of payment in a corporate liquidation.\n\nThe partner-as-lender distinction is examined: a partner who **lent** money ranks after outside creditors but **before** capital, because a partner can wear two hats and the loan is not a capital contribution.\n\nWhere the assets are insufficient, the partners must contribute to make up the deficiency in the ratio in which they share **profits** — which is where unlimited liability actually bites, and it is the practical difference from an LLP.",
    earns: [
      "Knowing the full order, including where a partner's loan ranks",
      "Naming the deficiency contribution as where unlimited liability operates",
    ],
    loses: ["Putting partners' capital ahead of outside creditors"],
  },

  /* ── LWG-19 · Corporations and the veil ─────────────────────── */

  "LWG-19::separate-personality": {
    title: "The consequences of separate legal personality",
    format: "ot",
    marks: 2,
    requirement:
      "A sole shareholder and director insures the company's timber in her own name. The timber is destroyed. The insurer is:\n\nA  Liable, since she owns the company and therefore the timber\nB  Not liable, because the timber belonged to the company and she had no insurable interest in it\nC  Liable, but only for half the loss\nD  Not liable, because insurance of business assets is never enforceable",
    plan: [
      {
        step: "Identify who owns the asset",
        detail:
          "The company owns its own assets. A shareholder owns SHARES in the company, not the company's property — that is the first consequence of separate legal personality.",
      },
      {
        step: "Apply the insurable interest requirement",
        detail:
          "A person can only insure property in which they have an insurable interest. Owning all the shares does not give an interest in the company's timber, so the policy fails.",
      },
      {
        step: "Notice that the principle can cut against the shareholder",
        detail:
          "Separate personality is usually pleaded to protect members. Here it defeats one — which is the point of the illustration: the principle applies whether or not it suits the person invoking it.",
      },
      {
        step: "Reject the ownership option",
        detail:
          "Option A is the intuitive answer and the one the doctrine exists to correct. Even a sole shareholder is a different legal person from the company.",
      },
    ],
    answer:
      "**B — not liable, because the timber belonged to the company and she had no insurable interest in it.**\n\nA company owns its own assets. A shareholder owns **shares**, not the company's property, and that holds even for a sole shareholder who is also the sole director.\n\nSince a person may only insure property in which they have an **insurable interest**, the policy in her own name fails.\n\nWhat makes this the standard illustration is that separate personality is usually pleaded to **protect** members, and here it **defeats** one. The principle applies whether or not it suits the person invoking it.\n\nOption A is the intuitive answer and precisely the reasoning the doctrine corrects.\n\nThe other consequences follow from the same idea: the company contracts in its own name, sues and is sued in its own name, has perpetual succession unaffected by the death of members, and its members' liability is limited to the amount unpaid on their shares.",
    earns: [
      "Distinguishing ownership of shares from ownership of the company's assets",
      "Noticing the principle can operate against a member as well as for one",
    ],
    loses: ["Treating a sole shareholder as the owner of the company's property"],
  },

  "LWG-19::types": {
    title: "Distinguishing a public company from a private one",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following applies to a **public** company but not to a private company?\n\nA  It has separate legal personality\nB  It may offer its shares to the public\nC  It must have at least one director\nD  Its members' liability is limited",
    plan: [
      {
        step: "Identify what is common to both",
        detail:
          "Separate legal personality, limited liability of members, and the need for at least one director are features of companies generally. None distinguishes public from private.",
      },
      {
        step: "Identify the distinguishing feature",
        detail:
          "Only a public company may offer its shares to the public. A private company is prohibited from doing so, which is the core of the distinction.",
      },
      {
        step: "List what follows from that",
        detail:
          "Higher minimum share capital, at least two directors and a qualified company secretary, more onerous filing and disclosure, and the obligation to hold an annual general meeting.",
      },
      {
        step: "Explain why the extra burden exists",
        detail:
          "Public investors cannot negotiate their protection individually, so it is supplied by regulation. The additional requirements are the price of access to public capital.",
      },
    ],
    answer:
      "**B — it may offer its shares to the public.**\n\nSeparate legal personality, limited liability and the need for at least one director are features of companies generally, so A, C and D distinguish nothing.\n\nOnly a **public** company may offer its shares to the public; a private company is prohibited from doing so. Everything else about the distinction flows from that one difference: a higher minimum share capital, at least two directors and a qualified company secretary, more onerous filing and disclosure, and the obligation to hold an annual general meeting.\n\nThe reason for the extra burden is that **public investors cannot negotiate their own protection**. A private company's members can, so the law leaves more to them. The additional requirements are the price of access to public capital.\n\nNote that being a public company is not the same as being **listed** — a public company may be unlisted, and listing adds a further layer of exchange rules.",
    earns: [
      "Identifying the public-offer capacity as the source of every other difference",
      "Distinguishing being a public company from being listed",
    ],
    loses: ["Choosing a feature common to all companies"],
  },

  "LWG-19::lifting-the-veil": {
    title: "When the veil of incorporation is lifted",
    format: "ot",
    marks: 2,
    requirement:
      "A court is most likely to lift the veil of incorporation where:\n\nA  The company has made a loss\nB  The corporate form has been used to evade an existing legal obligation or to perpetrate a fraud\nC  The company has only one shareholder\nD  The shareholders are all members of one family",
    plan: [
      {
        step: "State the starting position",
        detail:
          "The veil is the rule, and lifting it is exceptional. Courts begin from separate legal personality and depart from it only for a recognised reason.",
      },
      {
        step: "Name the recognised grounds",
        detail:
          "Fraud or evasion of an existing obligation, statutory provisions such as fraudulent and wrongful trading, and a small number of specific situations. Fraud or evasion is the clearest.",
      },
      {
        step: "Reject the options describing ordinary facts",
        detail:
          "A loss, a single shareholder and a family shareholding are all perfectly ordinary. None is a ground, and treating them as one would make the veil meaningless for small companies.",
      },
      {
        step: "Note the limit courts insist on",
        detail:
          "The veil is not lifted merely because the result seems unjust or because the company is part of a group. \"In the interests of justice\" has been repeatedly rejected as a free-standing ground.",
      },
    ],
    answer:
      "**B — the corporate form has been used to evade an existing legal obligation or to perpetrate a fraud.**\n\nThe veil is the **rule** and lifting it is exceptional. The recognised grounds are narrow: fraud or evasion of an existing obligation, and statutory provisions such as **fraudulent** and **wrongful trading**, which impose personal liability on directors directly.\n\nA loss, a sole shareholder and a family shareholding are all ordinary facts. Treating any of them as a ground would make the veil meaningless for exactly the small companies that rely on it most.\n\nThe limit courts insist on is worth stating: the veil is not lifted merely because the outcome seems unjust, or because the company belongs to a group. \"**In the interests of justice**\" has been repeatedly rejected as a free-standing ground, because a discretionary exception would destroy the certainty that makes incorporation useful.",
    earns: [
      "Treating the veil as the rule and lifting it as exceptional",
      "Knowing that \"the interests of justice\" is not a ground on its own",
    ],
    loses: ["Treating a sole shareholder or a group structure as a reason to lift the veil"],
  },

  /* ── LWG-20 · Promoters and pre-incorporation contracts ──────── */

  "LWG-20::promoters": {
    title: "What a promoter owes the company",
    format: "ot",
    marks: 2,
    requirement:
      "A promoter sells property she already owns to the company she is forming, at a profit, without disclosing the profit. The company may:\n\nA  Do nothing, as the promoter owed it no duty\nB  Rescind the contract or recover the undisclosed profit\nC  Only claim damages for negligence\nD  Have the promoter imprisoned",
    plan: [
      {
        step: "Identify the duty",
        detail:
          "A promoter owes the company a fiduciary duty. The core of it is not to make a secret profit from the promotion, and to disclose any interest in a transaction with the company.",
      },
      {
        step: "Note that the profit is not the wrong",
        detail:
          "Making a profit is permitted; making an UNDISCLOSED one is not. Disclosure to an independent board or to the members cures it, which is what the remedy is aimed at.",
      },
      {
        step: "State the remedies",
        detail:
          "The company may rescind the contract, or recover the undisclosed profit. It elects between them rather than having both.",
      },
      {
        step: "Reject the two misstatements of the duty's nature",
        detail:
          "Option A denies the duty entirely. Option C recasts a fiduciary breach as negligence, which understates it — the wrong is disloyalty, not carelessness.",
      },
    ],
    answer:
      "**B — rescind the contract or recover the undisclosed profit.**\n\nA promoter owes the company a **fiduciary** duty, whose core is not to make a **secret** profit from the promotion and to disclose any interest in a transaction with the company.\n\nThe profit itself is not the wrong. Making one is permitted; making an **undisclosed** one is not, and disclosure to an independent board or to the members cures it. That is why the remedy targets the non-disclosure.\n\nThe company elects between rescinding the contract and recovering the profit, rather than taking both.\n\nOption C recasts a fiduciary breach as negligence, which understates it — the wrong is **disloyalty**, not carelessness, and the remedies differ accordingly.\n\nA promoter is anyone who takes steps to form the company and set it going, and the label attaches by **conduct** rather than by title.",
    earns: [
      "Locating the wrong in the non-disclosure rather than in the profit",
      "Naming both remedies and that the company elects between them",
    ],
    loses: ["Treating a fiduciary breach as mere negligence"],
  },

  "LWG-20::pre-incorporation": {
    title: "Who is liable on a contract made before incorporation",
    format: "ot",
    marks: 2,
    requirement:
      "A person contracts on behalf of a company that has not yet been incorporated. Unless otherwise agreed, the contract is:\n\nA  Binding on the company once it is incorporated\nB  Binding on the person who purported to act for the company, who is personally liable\nC  Void\nD  Binding on the company only if it later ratifies it",
    plan: [
      {
        step: "Ask whether the principal existed",
        detail:
          "An agent needs a principal. A company that has not been incorporated does not exist, so there is no principal to be bound — the agency analysis fails at the first step.",
      },
      {
        step: "Follow that to the consequence",
        detail:
          "The person who purported to act is personally liable on the contract, unless otherwise agreed. The contract is not void — someone is bound, and it is the individual.",
      },
      {
        step: "Explain why ratification does not work",
        detail:
          "Ratification requires the principal to have existed at the time of the act. A company cannot ratify a contract made before it existed, so option D fails on the same point as A.",
      },
      {
        step: "Name the practical solution",
        detail:
          "After incorporation the company enters a NEW contract on the same terms — novation — releasing the individual. Or the individual contracts expressly subject to being released once the company is formed.",
      },
    ],
    answer:
      "**B — binding on the person who purported to act for the company, who is personally liable.**\n\nAn agent needs a principal, and a company that has not been incorporated does not exist. So the agency analysis fails at the first step and the individual is personally liable, unless otherwise agreed.\n\nThe contract is **not void** — someone is bound, and it is the person who signed.\n\nRatification cannot save it, which is why options A and D both fail on the same point: **ratification requires the principal to have existed at the time of the act**. A company cannot ratify what was done before it existed.\n\nThe practical solution is a **novation** — after incorporation the company enters a new contract on the same terms, releasing the individual — or the individual contracts expressly on terms that they are released once the company is formed and adopts the agreement.",
    earns: [
      "Explaining the outcome from the absence of a principal, and why ratification cannot cure it",
      "Naming novation as the practical solution",
    ],
    loses: ["Assuming incorporation or ratification retrospectively binds the company"],
  },

  "LWG-20::registration-and-records": {
    title: "What must be delivered to the registrar",
    format: "ot",
    marks: 1,
    requirement:
      "Which of the following must be delivered to the registrar to incorporate a company?\n\nA  An application for registration, a statement of capital and initial shareholdings, and a statement of compliance\nB  Audited financial statements for the first year\nC  A business plan approved by the registrar\nD  A tax clearance certificate",
    plan: [
      {
        step: "Recall what incorporation requires",
        detail:
          "An application for registration with the company's name, registered office and whether liability is limited; a statement of capital and initial shareholdings; a statement of the proposed officers; and a statement of compliance.",
      },
      {
        step: "Reject the option that is impossible in sequence",
        detail:
          "Audited financial statements for the first year cannot exist before the company does. Options that require something the company could not yet have are free eliminations.",
      },
      {
        step: "Reject the discretionary options",
        detail:
          "The registrar does not approve business plans, and no tax clearance is needed to incorporate. Registration is administrative rather than a merits assessment.",
      },
    ],
    answer:
      "**A — an application for registration, a statement of capital and initial shareholdings, and a statement of compliance.**\n\nIncorporation requires the **application for registration** — naming the company, its registered office and whether liability is limited — together with a **statement of capital and initial shareholdings**, a **statement of the proposed officers**, and a **statement of compliance**. The articles are delivered unless model articles are adopted.\n\nOption B is impossible in sequence: audited financial statements for the first year cannot exist before the company does.\n\nThe registrar does not approve business plans and no tax clearance is required — registration is **administrative**, not a merits assessment, which is why incorporation is quick and cheap.\n\nOnce registered the company must keep statutory registers — members, directors, charges — and file annual accounts and a confirmation statement, because the price of limited liability is public information.",
    earns: ["Eliminating an option that requires something the company could not yet possess"],
    loses: ["Assuming the registrar assesses the merits of the proposed business"],
  },

  /* ── LWG-21 · Constitution, articles and names ───────────────── */

  "LWG-21::the-constitution": {
    title: "Whom the articles bind",
    format: "ot",
    marks: 2,
    requirement:
      "The articles of association constitute a contract:\n\nA  Between the company and its members, and between the members themselves, in respect of their rights as members\nB  Between the company and anyone who deals with it\nC  Between the directors and the company's creditors\nD  That may be enforced by any third party named in them",
    plan: [
      {
        step: "State whom the constitutional contract runs between",
        detail:
          "The company and its members, and the members among themselves — but only in respect of rights AS MEMBERS. That qualification is what most of the question turns on.",
      },
      {
        step: "Apply the membership-capacity limit",
        detail:
          "A provision conferring a right in some other capacity — appointing someone as the company's solicitor, for instance — is not enforceable through the articles, even by a member.",
      },
      {
        step: "Reject the third-party options",
        detail:
          "Outsiders and creditors are not parties to the constitutional contract. Naming a third party in the articles does not give them a right to enforce them.",
      },
      {
        step: "Note what the constitution consists of",
        detail:
          "The articles, plus certain resolutions and agreements. The articles govern the internal affairs of the company — directors' powers, meetings, share transfers, dividends.",
      },
    ],
    answer:
      "**A — between the company and its members, and between the members themselves, in respect of their rights as members.**\n\nThe qualification carries the marks: the contract binds only in respect of rights **as members**. A provision conferring a right in some other capacity — appointing a named person as the company's solicitor is the classic example — is not enforceable through the articles even by someone who happens also to be a member.\n\nOutsiders and creditors are not parties, and naming a third party in the articles does not give them a right to enforce them. Options B, C and D all extend the contract beyond the membership.\n\nThe **constitution** consists of the articles together with certain resolutions and agreements, and the articles govern the company's internal affairs: directors' powers, the conduct of meetings, share transfers and dividends. Model articles apply so far as they are not excluded or modified.",
    earns: ["Applying the \"as members\" limitation, not just naming the parties"],
    loses: ["Extending the constitutional contract to outsiders named in the articles"],
  },

  "LWG-21::altering-articles": {
    title: "How the articles may be changed, and the limit on it",
    format: "ot",
    marks: 2,
    requirement:
      "The articles of a company may be altered by:\n\nA  A decision of the board of directors\nB  Special resolution of the members, subject to the alteration being bona fide in the interests of the company as a whole\nC  Ordinary resolution of the members\nD  Agreement of a majority of creditors",
    plan: [
      {
        step: "Identify who has the power",
        detail:
          "The MEMBERS, not the board. The articles are the members' constitutional bargain, so directors cannot alter them — a point option A is built on.",
      },
      {
        step: "State the majority required",
        detail:
          "A special resolution, requiring a 75% majority. An ordinary resolution's simple majority is insufficient for a constitutional change.",
      },
      {
        step: "Add the substantive limit",
        detail:
          "The power must be exercised bona fide in the interests of the company as a whole. So a formally valid special resolution can still be challenged if it is not.",
      },
      {
        step: "Note the entrenchment mechanism",
        detail:
          "Provisions may be ENTRENCHED so that they need more than a special resolution to change. Entrenchment cannot prevent alteration by unanimous agreement of all members.",
      },
    ],
    answer:
      "**B — special resolution of the members, subject to the alteration being bona fide in the interests of the company as a whole.**\n\nThe power belongs to the **members**, not the board — the articles are the members' constitutional bargain, and directors cannot alter them. And it requires a **special resolution** at 75%; an ordinary resolution's simple majority is insufficient for a constitutional change.\n\nThe **substantive limit** is what makes this more than a procedural question. The power must be exercised bona fide in the interests of the company as a whole, so a formally valid special resolution can still be challenged — which protects a minority against a majority altering the articles to expropriate it.\n\nProvisions may be **entrenched**, requiring more than a special resolution, though entrenchment cannot prevent alteration by the unanimous agreement of all members.\n\nA member cannot be required by an alteration to take more shares or increase their liability without consenting in writing.",
    earns: [
      "Naming the special resolution AND the bona fide limit",
      "Knowing entrenchment yields to unanimous agreement",
    ],
    loses: ["Giving the power to the board, or accepting an ordinary resolution"],
  },

  "LWG-21::names": {
    title: "Controls over a company's name",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would prevent the registration of a proposed company name?\n\nA  It is the same as a name already on the register\nB  It is difficult to pronounce\nC  It does not describe the company's business\nD  It is longer than twenty characters",
    plan: [
      {
        step: "Recall the grounds of refusal",
        detail:
          "The same as a name already registered, offensive, constituting an offence, or suggesting a connection with government without approval. Certain sensitive words also need approval.",
      },
      {
        step: "Match the option to the list",
        detail:
          "\"The same as\" a registered name is the first ground, and it exists to prevent confusion between distinct legal persons.",
      },
      {
        step: "Reject the three invented requirements",
        detail:
          "Pronounceability, descriptiveness and length are not grounds. A company name need not describe the business at all, and many deliberately do not.",
      },
      {
        step: "Note the other name obligations",
        detail:
          "The name must end with an indicator of limited liability, must be displayed at the registered office and on documents, and may be changed by special resolution.",
      },
    ],
    answer:
      "**A — it is the same as a name already on the register.**\n\nThe grounds of refusal are that the name is the **same as** one already registered, that it is **offensive**, that its use would **constitute an offence**, or that it suggests a **connection with government** without approval. Certain sensitive words also require approval before use.\n\nThe same-as ground exists to prevent confusion between distinct legal persons, which matters because each is separately liable.\n\nOptions B, C and D invent requirements. A name need not be pronounceable, need not describe the business — many deliberately do not — and is not limited to twenty characters.\n\nThe other obligations: the name must end with an indicator of limited liability, must be **displayed** at the registered office and on the company's documents, and may be **changed** by special resolution. A company may also be directed to change a name too like an existing one, or be sued for **passing off**.",
    earns: ["Recalling the grounds as a closed list rather than reasoning from plausibility"],
    loses: ["Requiring a company name to describe its business"],
  },
}
