/*
 * LW-ENG Area B, first half — the law of obligations: formation of a contract,
 * consideration, privity, terms and exclusion clauses.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Contract formation is where LW-ENG sets more objective tests than anywhere else,
 * and its distractors are overwhelmingly the ADJACENT DOCTRINE: an invitation to
 * treat offered as an offer, past consideration offered as good consideration, a
 * warranty offered as a condition. So each plan names the doctrine before applying
 * any rule.
 *
 * Cases are cited beside their formula, which is the standard form for a law paper
 * and the condition on which quoting a formula is legitimate.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWE_PLANS_B1: ExamPlanMap = {
  /* ── LWE-07 · The nature of a simple contract ───────────────── */

  "LWE-07::the-elements": {
    title: "Which element a set of facts is missing",
    format: "ot",
    marks: 2,
    requirement:
      "Two friends agree that one will drive the other to the airport, with nothing given in return and no suggestion of legal consequences. There is no contract, principally because there is no:\n\nA  Offer\nB  Acceptance\nC  Consideration, and no intention to create legal relations\nD  Capacity",
    plan: [
      {
        step: "List the elements before reading the facts",
        detail:
          "Offer, acceptance, consideration, intention to create legal relations, capacity, and legality. Six, and a question of this shape always removes one or two.",
      },
      {
        step: "Check each element against the facts",
        detail:
          "There is an offer and an acceptance — they agreed. Both have capacity and the arrangement is lawful. What is absent is anything given in return, and any legal intention.",
      },
      {
        step: "Note that domestic arrangements carry a presumption",
        detail:
          "In social and domestic agreements there is a presumption AGAINST intention to create legal relations; in commercial agreements the presumption runs the other way. Both are rebuttable by evidence.",
      },
      {
        step: "Confirm the option names both missing elements",
        detail:
          "Two elements fail here, and the correct option names both. An option naming only one would be incomplete rather than wrong, which is why reading all four matters.",
      },
    ],
    answer:
      "**C — consideration, and no intention to create legal relations.**\n\nThe elements are **offer**, **acceptance**, **consideration**, **intention to create legal relations**, **capacity** and **legality**. Here there is an offer and an acceptance, both parties have capacity, and the arrangement is lawful — what is missing is anything given in return, and any legal intention.\n\nThe presumption is what decides the intention point: in **social and domestic** agreements there is a presumption **against** an intention to create legal relations, while in **commercial** agreements the presumption runs the other way. Both are rebuttable by evidence, so a domestic arrangement with clear legal intent can bind.\n\nTwo elements fail here and the correct option names both, which is why all four options must be read rather than stopping at the first plausible one.",
    earns: [
      "Testing every element against the facts rather than stopping at the first failure",
      "Naming the domestic and commercial presumptions and that both are rebuttable",
    ],
    loses: ["Choosing an option that names only one of two missing elements"],
  },

  "LWE-07::validity-capacity": {
    title: "Telling a void contract from a voidable one",
    format: "ot",
    marks: 2,
    requirement:
      "A contract induced by a misrepresentation is:\n\nA  Void, so it never existed\nB  Voidable, so it is valid until the innocent party rescinds\nC  Unenforceable, but otherwise valid\nD  Illegal",
    plan: [
      {
        step: "Define the three states precisely",
        detail:
          "VOID: no contract ever existed, and no rights pass. VOIDABLE: a valid contract that one party may set aside. UNENFORCEABLE: valid but a court will not enforce it, often for want of required form.",
      },
      {
        step: "Place misrepresentation",
        detail:
          "It makes the contract voidable. So it is valid and binding until the misled party elects to rescind, and rights can pass in the meantime.",
      },
      {
        step: "See why the distinction has practical bite",
        detail:
          "Under a voidable contract, title can pass to a third party who buys in good faith before rescission. Under a void contract nothing passes at all — so the third party's position turns entirely on which it was.",
      },
      {
        step: "Note that the right to rescind can be lost",
        detail:
          "By affirmation, by lapse of time, or where restitution has become impossible. So voidable does not mean indefinitely escapable.",
      },
    ],
    answer:
      "**B — voidable, so it is valid until the innocent party rescinds.**\n\nThe three states: **void** means no contract ever existed and no rights pass; **voidable** means a valid contract one party may set aside; **unenforceable** means valid but not enforceable by a court, usually for want of required form.\n\nMisrepresentation makes a contract **voidable**, so it binds until the misled party elects to rescind.\n\nThe practical bite is third-party title. Under a **voidable** contract, title can pass to someone who buys in good faith before rescission, and that buyer keeps the goods. Under a **void** contract nothing passes at all. So a rogue's victim recovers the goods or does not, depending entirely on which state applies.\n\nThe right to rescind can be **lost**: by affirmation, by lapse of time, or where restitution has become impossible.",
    earns: [
      "Explaining the distinction through third-party title rather than as a definition",
      "Knowing the right to rescind can be lost",
    ],
    loses: ["Treating a misrepresented contract as void, which would defeat an innocent buyer"],
  },

  /* ── LWE-08 · Offer and invitation to treat ─────────────────── */

  "LWE-08::offer-vs-itt": {
    title: "Whether a communication is an offer or an invitation to treat",
    format: "ot",
    marks: 2,
    requirement:
      "Goods are displayed in a shop window with a price ticket. In contract law this is:\n\nA  An offer, which a customer accepts by tendering the price\nB  An invitation to treat, so the customer makes the offer at the till\nC  A binding contract with anyone who sees it\nD  A unilateral contract",
    plan: [
      {
        step: "Define the two",
        detail:
          "An OFFER can be accepted to form a contract. An INVITATION TO TREAT invites others to make offers and cannot be accepted. The classification decides who offers and who accepts.",
      },
      {
        step: "Recall the settled categories",
        detail:
          "Invitations to treat: goods on display, advertisements, an auctioneer's request for bids, an invitation to tender. Offers: a bid at auction, a tender submitted, and an advertisement of a unilateral promise.",
      },
      {
        step: "Apply it and note who does what",
        detail:
          "A window display is an invitation to treat. The customer makes the offer at the till and the shop may accept or refuse — which is why a mispriced item need not be sold.",
      },
      {
        step: "Note the unilateral exception",
        detail:
          "An advertisement promising a reward for performing an act can be an OFFER accepted by performance — Carlill v Carbolic Smoke Ball Co. So option D describes a real category, applied to the wrong facts.",
      },
    ],
    answer:
      "**B — an invitation to treat, so the customer makes the offer at the till.**\n\nAn **offer** can be accepted to form a contract; an **invitation to treat** invites others to make offers and cannot be accepted. The classification decides who offers and who accepts, and therefore who can walk away.\n\nGoods on display, advertisements, an auctioneer's request for bids and an invitation to tender are all invitations to treat. A **bid** at auction and a **tender** submitted are offers.\n\nThe practical consequence is the one to state: because the customer makes the offer, the shop may **refuse** it — so a mispriced item need not be sold at the marked price.\n\nOption D names a real category applied to the wrong facts. An advertisement promising a reward for performing an act can be an offer accepted by **performance** — *Carlill v Carbolic Smoke Ball Co* — which is a unilateral contract, but a window display is not one.",
    earns: [
      "Naming the consequence: the shop can refuse, so a misprice need not be honoured",
      "Recognising the unilateral contract category and why it does not apply here",
    ],
    loses: ["Treating a display as an offer, which would force the shop to sell at any marked price"],
  },

  /* ── LWE-09 · Termination of an offer ───────────────────────── */

  "LWE-09::the-routes": {
    title: "How an offer comes to an end",
    format: "ot",
    marks: 2,
    requirement:
      "An offeree replies to an offer proposing different terms. The original offer is:\n\nA  Still open for acceptance\nB  Terminated, because a counter-offer destroys the original offer\nC  Accepted on the original terms\nD  Suspended until the offeror replies",
    plan: [
      {
        step: "List the ways an offer ends",
        detail:
          "Acceptance, rejection, counter-offer, revocation before acceptance, lapse of time, failure of a condition, and death of a party. Seven routes, and the counter-offer is the one examined most.",
      },
      {
        step: "State the counter-offer rule",
        detail:
          "A counter-offer destroys the original offer, which cannot then be accepted — Hyde v Wrench. The offeree has become the offeror, and the roles have swapped.",
      },
      {
        step: "Distinguish a counter-offer from a request for information",
        detail:
          "Merely asking whether a different term would be acceptable does NOT destroy the offer. This is the distinction the marks turn on, and a stem's wording is what decides it.",
      },
      {
        step: "Note the revocation rule alongside it",
        detail:
          "An offer may be revoked any time before acceptance, but revocation must be COMMUNICATED to be effective — and there is no postal rule for revocation.",
      },
    ],
    answer:
      "**B — terminated, because a counter-offer destroys the original offer.**\n\nA counter-offer destroys the original offer, which cannot afterwards be accepted — *Hyde v Wrench*. The offeree has become the offeror and the roles have swapped, so the original offeror is now free to accept or refuse.\n\nThe distinction the marks turn on is between a counter-offer and a **request for information**: merely asking whether a different term would be acceptable does **not** destroy the offer. The stem's wording decides it, so \"would you consider £900?\" and \"I will pay £900\" have opposite effects.\n\nThe other routes are acceptance, rejection, **revocation** before acceptance, lapse of time, failure of a condition, and death. Revocation must be **communicated** to be effective, and there is no postal rule for revocation — so a posted revocation bites only on arrival.",
    earns: [
      "Distinguishing a counter-offer from a request for information",
      "Knowing revocation must be communicated and has no postal rule",
    ],
    loses: ["Treating any reply mentioning different terms as leaving the offer open"],
  },

  /* ── LWE-10 · Acceptance and the postal rule ────────────────── */

  "LWE-10::requirements": {
    title: "When acceptance takes effect",
    format: "ot",
    marks: 2,
    requirement:
      "Acceptance is posted on Monday and arrives on Wednesday. The offeror posts a revocation on Tuesday, which arrives on Thursday. There is:\n\nA  No contract, because the revocation was posted before acceptance arrived\nB  A contract, formed on Monday when the acceptance was posted\nC  A contract, formed on Thursday\nD  No contract, because the parties never agreed",
    plan: [
      {
        step: "Apply the postal rule to the acceptance",
        detail:
          "Where post is a reasonable means of acceptance, acceptance takes effect when POSTED — Adams v Lindsell. So the contract is formed on Monday, before anything else happens.",
      },
      {
        step: "Apply the ordinary rule to the revocation",
        detail:
          "Revocation is effective only on COMMUNICATION, with no postal rule. The revocation posted Tuesday could not take effect before Thursday — by which time a contract had existed for three days.",
      },
      {
        step: "Lay the dates out to see the asymmetry",
        detail:
          "Monday acceptance posted → contract. Tuesday revocation posted → too late, and ineffective anyway until received. The asymmetry between the two rules is the whole question.",
      },
      {
        step: "Note when the postal rule does not apply",
        detail:
          "Where the offer requires actual notice, where post is not reasonable, or where the letter is incorrectly addressed by the offeree. And instantaneous communications follow the receipt rule instead.",
      },
    ],
    answer:
      "**B — a contract, formed on Monday when the acceptance was posted.**\n\nThe two rules are **asymmetric**, and that asymmetry is the question. Where post is a reasonable means of acceptance, acceptance takes effect **on posting** — *Adams v Lindsell*. Revocation takes effect only on **communication**, with no postal rule.\n\nSo: Monday, acceptance posted and the contract is formed. Tuesday, a revocation posted that was already too late and could not have bitten until Thursday in any event.\n\nThe postal rule does **not** apply where the offer requires actual notice of acceptance, where post is not a reasonable means, or where the offeree addressed the letter incorrectly. **Instantaneous** communications — telephone, email, instant message — follow the ordinary **receipt** rule.\n\nAcceptance must also be **unqualified** and must be **communicated**: silence is not acceptance, and an offeror cannot impose a contract by deeming silence to be agreement.",
    earns: [
      "Applying the posting rule to acceptance and the receipt rule to revocation",
      "Knowing when the postal rule is displaced",
    ],
    loses: ["Applying the postal rule to the revocation as well, which removes the asymmetry"],
  },

  /* ── LWE-11 · Consideration ─────────────────────────────────── */

  "LWE-11::sufficiency": {
    title: "Sufficiency against adequacy",
    format: "ot",
    marks: 2,
    requirement:
      "A owns a house worth £300,000 and agrees to sell it to B for £1. As to consideration, the agreement is:\n\nA  Unenforceable, because £1 is not adequate\nB  Enforceable, because consideration must be sufficient but need not be adequate\nC  Unenforceable, because consideration must reflect market value\nD  Enforceable only if a court approves the price",
    plan: [
      {
        step: "Separate the two words, which are not synonyms in law",
        detail:
          "SUFFICIENT means it must have some value recognised by law. ADEQUATE means proportionate. The law requires sufficiency and does not require adequacy.",
      },
      {
        step: "Apply it to the facts",
        detail:
          "£1 has value recognised by law, so it is sufficient. Whether it is a good bargain is not the court's concern — the parties set their own price.",
      },
      {
        step: "State why the law takes this position",
        detail:
          "Freedom of contract. A court that policed adequacy would be resetting prices the parties agreed, so it looks only for the presence of value, not its amount.",
      },
      {
        step: "Note where an undervalue does matter",
        detail:
          "Not in consideration, but in doctrines such as duress, undue influence and misrepresentation, and in insolvency where a transaction at an undervalue may be set aside. Route the concern to the right doctrine.",
      },
    ],
    answer:
      "**B — enforceable, because consideration must be sufficient but need not be adequate.**\n\nThe two words are not synonyms in law. **Sufficient** means the consideration must have some value recognised by law. **Adequate** means proportionate — and the law does not require it.\n\n£1 has value recognised by law, so it is sufficient. Whether the bargain is a good one is not the court's concern.\n\nThe reason is **freedom of contract**: a court policing adequacy would be resetting prices the parties agreed, so it looks for the presence of value rather than its amount.\n\nA gross undervalue is not irrelevant — it just belongs to other doctrines. It may evidence **duress**, **undue influence** or **misrepresentation**, and under the **Insolvency Act 1986** a transaction at an undervalue may be set aside. Routing the concern to the right doctrine is what a good answer does.",
    earns: [
      "Distinguishing sufficiency from adequacy and explaining why the law draws the line there",
      "Routing an undervalue concern to duress, undue influence or insolvency",
    ],
    loses: ["Requiring consideration to be proportionate to what is received"],
  },

  "LWE-11::past-and-existing": {
    title: "Whether past consideration or an existing duty will support a promise",
    format: "ot",
    marks: 2,
    requirement:
      "B repairs A's car as a favour. A week later A promises to pay B £200 for the work already done. The promise is:\n\nA  Enforceable, because B conferred a benefit\nB  Unenforceable, because the consideration is past\nC  Enforceable, because A intended to pay\nD  Enforceable, because £200 is a fair price",
    plan: [
      {
        step: "Fix the timing rule",
        detail:
          "Consideration must be given in return for the promise. Something already completed before the promise was made is PAST consideration and is not good consideration.",
      },
      {
        step: "Apply it to the sequence",
        detail:
          "The work was done first, and the promise came a week later. So the work was not given in exchange for the promise, and nothing supports it.",
      },
      {
        step: "Reject the options based on fairness or intention",
        detail:
          "A benefit conferred, a genuine intention to pay and a fair price do not supply consideration. The law asks whether something was given IN RETURN, not whether the promise is deserved.",
      },
      {
        step: "Note the existing duty rules alongside it",
        detail:
          "Performing an existing public duty or an existing contractual duty to the same party is generally not good consideration — unless a PRACTICAL BENEFIT is conferred, which is where the exception operates.",
      },
    ],
    answer:
      "**B — unenforceable, because the consideration is past.**\n\nConsideration must be given **in return for** the promise. Work already completed before the promise was made is **past consideration** and will not support it — the sequence is what decides the case, not the merits.\n\nA benefit conferred, a genuine intention to pay and a fair price all fail for the same reason: the law asks whether something was given in exchange, not whether the promise deserves to be kept.\n\nThe **existing duty** rules sit alongside. Performing an existing **public** duty is generally not good consideration, nor is performing an existing **contractual** duty owed to the same party — unless a **practical benefit** is conferred on the promisor, which is where the exception operates and is heavily examined.\n\nA promise made where work was requested and payment was always implied can be enforceable, because the request supplies the exchange the bare gratuitous favour lacks.",
    earns: [
      "Deciding on the sequence rather than on the fairness of the promise",
      "Knowing the practical benefit exception to the existing duty rule",
    ],
    loses: ["Enforcing a promise because a benefit was conferred, which is not consideration"],
  },

  "LWE-11::part-payment": {
    title: "Part payment of a debt, and what promissory estoppel does",
    format: "ot",
    marks: 2,
    requirement:
      "A creditor agrees to accept £600 in full settlement of a £1,000 debt, and the debtor pays £600. At common law the creditor:\n\nA  Cannot sue for the balance, because there was an agreement\nB  May sue for the remaining £400, as part payment is not consideration for the release of the whole debt\nC  Must repay the £600\nD  May sue only if the agreement was in writing",
    plan: [
      {
        step: "State the common law rule",
        detail:
          "Part payment of a debt is not consideration for a promise to release the balance — Pinnel's Case, affirmed in Foakes v Beer. So the creditor may still sue for the remainder.",
      },
      {
        step: "Recall what WOULD make the release binding",
        detail:
          "Payment early, in a different form, by a third party, or as part of a composition with creditors. Each supplies something the debtor was not already bound to give.",
      },
      {
        step: "Introduce promissory estoppel as the equitable answer",
        detail:
          "Where the creditor's promise was relied on, equity may prevent them going back on it. It is a shield and not a sword — it defends against the claim rather than founding one.",
      },
      {
        step: "Note the limits on the estoppel",
        detail:
          "It requires a clear promise, reliance, and that it would be inequitable to resile. It may only suspend rather than extinguish the right, and the party seeking it must have acted equitably.",
      },
    ],
    answer:
      "**B — may sue for the remaining £400, as part payment is not consideration for the release of the whole debt.**\n\nThat is the common law rule from *Pinnel's Case*, affirmed in *Foakes v Beer*: the debtor gave nothing beyond part of what was already owed, so nothing supports the release.\n\nThe release **would** bind if the debtor gave something extra — payment **early**, in a **different form**, by a **third party**, or as part of a **composition** with creditors. Each supplies what the debtor was not already bound to give.\n\nEquity then qualifies the rule through **promissory estoppel**: where the creditor's promise was relied on, equity may prevent them resiling. Its limits matter — it requires a clear promise, reliance, and that resiling would be inequitable; it is a **shield and not a sword**, defending against a claim rather than founding one; and it may merely **suspend** the right rather than extinguish it.\n\nSo the common law answer and the equitable answer can differ, which is why the question specifies \"at common law\".",
    earns: [
      "Answering the common law question asked, then adding the equitable qualification",
      "Knowing estoppel is a shield not a sword and may only suspend the right",
    ],
    loses: ["Treating the agreement as binding without asking what the debtor gave for it"],
  },

  /* ── LWE-12 · Privity and intention ─────────────────────────── */

  "LWE-12::privity": {
    title: "Whether a third party can enforce a contract",
    format: "ot",
    marks: 2,
    requirement:
      "A contract between A and B expressly confers a benefit on C and states that C may enforce it. C:\n\nA  Cannot enforce it, as privity is absolute\nB  May enforce it under the Contracts (Rights of Third Parties) Act 1999\nC  May enforce it only by suing A and B jointly\nD  May enforce it only if C provided consideration",
    plan: [
      {
        step: "State the common law rule first",
        detail:
          "At common law only a party to a contract can enforce it — the doctrine of privity. So the starting position is that C cannot sue.",
      },
      {
        step: "Apply the statutory exception",
        detail:
          "The Contracts (Rights of Third Parties) Act 1999 lets a third party enforce a term where the contract expressly provides they may, or where the term purports to confer a benefit on them.",
      },
      {
        step: "Check the stem satisfies the Act",
        detail:
          "The contract expressly says C may enforce it, which is the clearest route under the Act. C need not have provided consideration, so option D imports a requirement the Act removes.",
      },
      {
        step: "Recall the other exceptions",
        detail:
          "Agency, assignment, trusts, collateral contracts, and statutory exceptions such as motor insurance. Privity has never been as absolute as option A suggests.",
      },
    ],
    answer:
      "**B — may enforce it under the Contracts (Rights of Third Parties) Act 1999.**\n\nAt common law only a party can enforce a contract — the doctrine of **privity** — so the starting position is that C cannot sue.\n\nThe **Contracts (Rights of Third Parties) Act 1999** changes that: a third party may enforce a term where the contract **expressly provides** they may, or where the term **purports to confer a benefit** on them and the contract does not show a contrary intention. The stem satisfies the first route directly.\n\nOption D imports a requirement the Act removes — C need not have provided consideration, and that is much of the point of the statute.\n\nOption A overstates privity, which has never been absolute. The other routes round it are **agency**, **assignment**, **trusts**, **collateral contracts**, and statutory exceptions such as motor insurance.",
    earns: [
      "Stating the common law rule and then the statutory exception that displaces it",
      "Knowing the third party need not have given consideration",
    ],
    loses: ["Treating privity as absolute, or requiring the third party to have provided consideration"],
  },

  "LWE-12::intention": {
    title: "Rebutting the presumption on legal intention",
    format: "ot",
    marks: 2,
    requirement:
      "A commercial agreement states that it is \"binding in honour only and not subject to legal jurisdiction\". The agreement is:\n\nA  Binding, because commercial agreements are always intended to be legally binding\nB  Not legally binding, because the express words rebut the commercial presumption\nC  Binding, because such a clause is void\nD  Binding only on the party that drafted it",
    plan: [
      {
        step: "Identify the presumption and its direction",
        detail:
          "In commercial agreements there is a presumption that the parties INTENDED legal relations. It is a presumption, so it starts the analysis rather than ending it.",
      },
      {
        step: "Ask whether the presumption is rebutted",
        detail:
          "Express words are the strongest possible rebuttal. \"Binding in honour only\" states directly that legal consequences were not intended, so the presumption falls.",
      },
      {
        step: "Reject the option treating the presumption as a rule",
        detail:
          "Option A says commercial agreements are ALWAYS binding. That converts a rebuttable presumption into an irrebuttable rule, which is the error the question tests.",
      },
      {
        step: "Note the commercial use of such clauses",
        detail:
          "Comfort letters and letters of intent are drafted in the same way and for the same purpose — reassurance without obligation. The wording is engineered, not accidental.",
      },
    ],
    answer:
      "**B — not legally binding, because the express words rebut the commercial presumption.**\n\nIn commercial agreements there is a **presumption** that the parties intended legal relations, and in social and domestic agreements the presumption runs the other way. Both start the analysis rather than ending it.\n\nExpress words are the strongest possible rebuttal, and \"binding in honour only and not subject to legal jurisdiction\" states directly that legal consequences were not intended.\n\nOption A converts a rebuttable presumption into an irrebuttable rule, which is precisely the error the question tests.\n\nThe commercial context is worth naming: **comfort letters** and **letters of intent** are drafted the same way and for the same purpose — reassurance without obligation. The wording is engineered rather than careless, which is why a court gives effect to it.",
    earns: [
      "Treating the presumption as rebuttable and identifying express words as the rebuttal",
      "Connecting the drafting to comfort letters and letters of intent",
    ],
    loses: ["Reading the commercial presumption as a rule that cannot be displaced"],
  },

  /* ── LWE-13 · Terms and their classification ────────────────── */

  "LWE-13::terms-v-representations": {
    title: "Whether a statement became a term of the contract",
    format: "ot",
    marks: 2,
    requirement:
      "Which factor points most strongly to a pre-contractual statement being a **term** rather than a mere representation?\n\nA  It was made a long time before the contract\nB  The maker had special knowledge or skill relating to the statement\nC  It was made orally\nD  The other party did not rely on it",
    plan: [
      {
        step: "Understand why the classification matters",
        detail:
          "A term gives a contractual claim for breach. A representation gives a misrepresentation claim with different remedies. So the label decides which action lies.",
      },
      {
        step: "Recall the factors courts weigh",
        detail:
          "The relative knowledge and skill of the parties, the importance attached to the statement, the time between statement and contract, whether it was reduced to writing, and whether the maker invited verification.",
      },
      {
        step: "Apply the special knowledge factor",
        detail:
          "Where the maker has special knowledge and the other party does not, the statement is more likely a term — the party in a position to know is taken to be warranting what they say.",
      },
      {
        step: "Check the direction of the other options",
        detail:
          "A long interval points AWAY from a term. Oral form is neutral at best. And absence of reliance points away from any claim at all — each option runs in the wrong direction.",
      },
    ],
    answer:
      "**B — the maker had special knowledge or skill relating to the statement.**\n\nWhere the maker has special knowledge the other party lacks, the statement is more likely to be a **term**: the party in a position to know is taken to be warranting what they say. Where the roles are reversed — a private seller telling a dealer about a car — it is more likely a representation.\n\nThe classification matters because it decides which action lies: a **term** gives a contractual claim for breach, a **representation** gives a misrepresentation claim with different remedies.\n\nThe other factors are the importance attached to the statement, the **time** between statement and contract, whether it was reduced to **writing**, and whether the maker invited verification.\n\nEach wrong option runs in the wrong direction: a long interval points **away** from a term, oral form is neutral at best, and absence of reliance points away from any claim at all.",
    earns: [
      "Explaining the knowledge factor by who is in a position to warrant the statement",
      "Noticing that each distractor points the opposite way",
    ],
    loses: ["Treating an oral statement as incapable of being a term"],
  },

  "LWE-13::classification": {
    title: "Condition, warranty or innominate term",
    format: "ot",
    marks: 2,
    requirement:
      "Breach of a **condition** entitles the injured party to:\n\nA  Damages only\nB  Terminate the contract and claim damages\nC  Terminate only, with no damages\nD  Nothing, unless the loss is serious",
    plan: [
      {
        step: "Set out the three classes and their consequences",
        detail:
          "CONDITION: a term so important that breach entitles the injured party to terminate AND claim damages. WARRANTY: a lesser term, giving damages only. INNOMINATE: consequences depend on the seriousness of the actual breach.",
      },
      {
        step: "Note that termination is a right, not an obligation",
        detail:
          "The injured party ELECTS whether to terminate or affirm and claim damages. Breach of condition does not end the contract automatically.",
      },
      {
        step: "Reject the option denying damages",
        detail:
          "Option C offers termination without damages. Termination and damages are cumulative on breach of a condition, not alternatives.",
      },
      {
        step: "Note why the innominate category exists",
        detail:
          "Classifying every term in advance produced harsh results — a trivial breach of a condition allowing termination. The innominate approach looks at the consequences of the breach that actually happened.",
      },
    ],
    answer:
      "**B — terminate the contract and claim damages.**\n\nThe three classes and their consequences: a **condition** is a term so important that breach entitles the injured party to terminate **and** claim damages; a **warranty** is a lesser term giving **damages only**; an **innominate** term takes its consequences from the seriousness of the breach that actually occurred.\n\nTermination is a **right, not an obligation** — the injured party elects whether to terminate or to affirm and claim damages. Breach of a condition does not end the contract automatically, and an affirming party keeps the contract alive.\n\nOption C treats termination and damages as alternatives; on breach of a condition they are cumulative.\n\nThe **innominate** category exists because classifying every term in advance produced harsh results, allowing termination for a trivial breach of a term labelled a condition. Looking at the actual consequences keeps the remedy proportionate.",
    earns: [
      "Knowing termination and damages are cumulative and that termination is elective",
      "Explaining why the innominate category was developed",
    ],
    loses: ["Treating breach of a condition as automatically ending the contract"],
  },

  /* ── LWE-14 · Exclusion clauses and unfair terms ────────────── */

  "LWE-14::three-hurdles": {
    title: "The order in which an exclusion clause is tested",
    format: "mtq",
    marks: 6,
    requirement:
      "A commercial supplier's standard terms contain a clause excluding all liability for defective goods. The clause was in a document the buyer signed. A dispute arises.\n\n(i) State, in order, the THREE hurdles the clause must clear to be effective.\n(ii) For each hurdle, state briefly what the court asks.",
    plan: [
      {
        step: "Count the marks against the structure",
        detail:
          "Three hurdles, each named and each explained — six marks, so one for naming and one for explaining each. Naming all three and explaining none scores half.",
      },
      {
        step: "Get the ORDER right, because it is part of the answer",
        detail:
          "Incorporation, then construction, then statutory control. The order is logical: a clause that is not part of the contract never needs construing, and one that does not cover the loss never needs testing for fairness.",
      },
      {
        step: "Give each hurdle its own question",
        detail:
          "Incorporation: is the clause part of the contract at all — by signature, notice given before or at the time of contracting, or a consistent course of dealing? Construction: does it actually cover this loss, read contra proferentem? Statutory: does the legislation permit it?",
      },
      {
        step: "Name the statutory regime for the right party",
        detail:
          "The scenario is business-to-business, so the Unfair Contract Terms Act 1977 applies and the reasonableness test governs. The Consumer Rights Act 2015 would apply to a consumer, and it is a different regime — naming the wrong one loses the mark.",
      },
    ],
    answer:
      "**(i) and (ii) The three hurdles, in order**\n\n**1. Incorporation — is the clause part of the contract at all?**\nBy **signature** (as here, which is the strongest route), by **notice** given before or at the time of contracting, or by a **consistent course of dealing**. Notice given after the contract is formed comes too late.\n\n**2. Construction — does the clause actually cover this loss?**\nThe clause is read strictly and, where ambiguous, **contra proferentem** — against the party relying on it. A clause excluding \"liability for negligence\" will not be read to cover a fundamentally different breach unless the words clearly do so.\n\n**3. Statutory control — does legislation permit the exclusion?**\nThis is a **business-to-business** contract, so the **Unfair Contract Terms Act 1977** applies. Liability for death or personal injury from negligence can **never** be excluded. Other exclusions, including for defective goods in a business contract, must satisfy the **reasonableness** test, judged on the parties' relative bargaining strength, whether the buyer had an alternative, and whether they knew of the clause.\n\nHad the buyer been a **consumer**, the **Consumer Rights Act 2015** would govern instead, with its fairness test and its non-excludable statutory rights.",
    earns: [
      "Setting the hurdles out in order, and explaining why the order is logical",
      "Naming contra proferentem as the rule of construction",
      "Applying the 1977 Act because the parties are businesses, not the 2015 Act",
      "Knowing liability for death or personal injury from negligence can never be excluded",
    ],
    loses: [
      "Naming the three hurdles without saying what the court asks at each — half the marks",
      "Applying the Consumer Rights Act to a business-to-business contract",
      "Jumping to reasonableness without first asking whether the clause was incorporated and whether it covers the loss",
    ],
  },
}
