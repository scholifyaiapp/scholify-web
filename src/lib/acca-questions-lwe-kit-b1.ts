import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · Area B question kit, part 1 — chapters 7 to 14.
 *
 * Formation of contract (the essential elements, offer and invitation to treat,
 * termination of an offer, acceptance, consideration, privity and intention), then the
 * content of contracts (terms and representations, the classification of terms, and
 * exclusion clauses under the CRA 2015 and UCTA 1977).
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 7 · The nature of a simple contract ────────────────── */

const CH07: AccaQuestion[] = [
  q1("LWEK-07-01", "LWE-07", "B", "easy",
    "Which contract must be made by DEED?",
    ["A contract of employment", "A lease for more than three years", "A contract for the sale of goods", "A guarantee"],
    1,
    "A LEASE OVER THREE YEARS must be by deed. A guarantee needs only to be EVIDENCED IN WRITING; employment and sale of goods contracts need no particular form."),

  q1("LWEK-07-02", "LWE-07", "B", "easy",
    "How can a gratuitous promise be made binding?",
    ["By putting it in writing", "By making it in a deed", "By having it witnessed", "It cannot be made binding at all"],
    1,
    "By DEED, which dispenses with the need for consideration. Writing alone is not enough — English law will not enforce a bare promise without consideration."),

  q2("LWEK-07-03", "LWE-07", "B", "medium",
    "Two businesses agree a supply contract orally and both begin performing. Is there a contract?",
    [
      "No, because a business contract must be in writing",
      "Yes — a simple contract needs no particular form if the six elements are present",
      "No, unless later confirmed in writing",
      "Only once the first payment is made",
    ],
    1,
    "YES. A simple contract requires NO PARTICULAR FORM and may be made orally or by conduct. The absence of a document is an evidential difficulty, not a defect in validity."),

  q2("LWEK-07-04", "LWE-07", "B", "hard",
    "A seller is induced to sell by fraudulent misrepresentation. Before he avoids the contract the buyer resells to an innocent third party. Who owns the goods?",
    [
      "The original seller, the contract having been procured by fraud",
      "The innocent third party — misrepresentation makes the contract voidable, so title passed before avoidance",
      "Nobody, the contract being void from the outset",
      "The original seller, provided he avoids within a reasonable time",
    ],
    1,
    "The INNOCENT THIRD PARTY. Misrepresentation makes a contract VOIDABLE, not void, so it was valid until avoided and title PASSED. A good-faith buyer purchasing BEFORE avoidance keeps the goods; the seller's remedy is against the fraudster."),

  q2("LWEK-07-05", "LWE-07", "B", "medium",
    "A 17-year-old apprentice electrician agrees to buy professional hand tools for his trade. Is he bound?",
    [
      "No — a minor is never bound by any contract",
      "Yes, as a contract for necessaries or a beneficial contract of service",
      "No, but the adult seller is bound",
      "Only once he reaches 18",
    ],
    1,
    "YES. A minor IS bound by contracts for NECESSARIES and BENEFICIAL CONTRACTS OF SERVICE, and tools for his trade fall within that. Note also that a minor's incapacity never releases the ADULT party."),

  multi2("LWEK-07-06", "LWE-07", "B", "medium",
    "Which TWO contracts must be in writing?",
    [
      "A disposition of land",
      "A consumer credit agreement",
      "A contract of employment",
      "A partnership agreement",
    ],
    [0, 1],
    "A DISPOSITION OF LAND must be in writing incorporating all the terms and signed, and a CONSUMER CREDIT agreement must be in a statutorily prescribed form. Employment and partnership agreements need no form at all — a partnership can exist purely from conduct."),
]

/* ── Chapter 8 · Offer and the invitation to treat ──────────────── */

const CH08: AccaQuestion[] = [
  q1("LWEK-08-01", "LWE-08", "B", "easy",
    "Goods are displayed on a shop shelf with a price. What is the display?",
    ["An offer", "An invitation to treat", "An acceptance", "A unilateral contract"],
    1,
    "An INVITATION TO TREAT. The customer OFFERS at the till and the shop accepts there — which is why a shop is not bound by a mispriced ticket."),

  q1("LWEK-08-02", "LWE-08", "B", "easy",
    "At an auction, when is a bid accepted?",
    ["When the bid is made", "On the fall of the hammer", "When the lot is advertised", "When payment is tendered"],
    1,
    "On the FALL OF THE HAMMER. Each bid is an OFFER, so it may be WITHDRAWN at any time before then."),

  q2("LWEK-08-03", "LWE-08", "B", "medium",
    "A seller replies to an enquiry, \"The lowest price I would accept is £9,000.\" The buyer answers, \"I accept — £9,000.\" Is there a contract?",
    [
      "Yes, the seller made an offer which was accepted",
      "No — the reply was a mere supply of information, so the buyer's message is the offer",
      "Yes, because a stated price is always an offer",
      "No, because price alone cannot form a contract",
    ],
    1,
    "NO CONTRACT. A statement of the lowest price one would accept is a MERE SUPPLY OF INFORMATION, lacking the language of commitment. The buyer's \"I accept\" is itself the OFFER, and until the seller accepts it there is no contract."),

  q2("LWEK-08-04", "LWE-08", "B", "medium",
    "A company advertises a £50 payment to any customer who refers a business placing an order over £1,000. A customer makes such a referral. What is the position?",
    [
      "The advertisement was an invitation to treat, so nothing is owed",
      "It was a unilateral offer, accepted by performing the act, so the £50 is payable",
      "No contract exists until the company confirms the referral",
      "The customer must first have communicated an intention to accept",
    ],
    1,
    "A UNILATERAL OFFER, accepted by PERFORMANCE. No separate communication of acceptance is needed, and the offer cannot generally be revoked once performance has begun. The £50 is payable."),

  q2("LWEK-08-05", "LWE-08", "B", "medium",
    "An invitation to tender states that the highest bid received will be accepted. What is its effect?",
    [
      "It remains an invitation to treat, as all tenders are",
      "The commitment converts it into an offer, so submitting the highest bid accepts",
      "It creates a binding contract with every bidder",
      "It is void for uncertainty",
    ],
    1,
    "The COMMITMENT converts it into an OFFER, and submitting the highest bid ACCEPTS it. An ordinary invitation to tender is an invitation to treat, each tender being an offer the inviter may accept or refuse."),

  q2("LWEK-08-06", "LWE-08", "B", "hard",
    "Why is a priced shop window display treated as an invitation to treat rather than an offer?",
    [
      "Because the price is not sufficiently certain",
      "So the shop remains the offeree and can decline — it is not bound by a mispricing or to sell its last item to everyone",
      "Because a display cannot be communicated to a specific person",
      "Because retail sales are governed exclusively by statute",
    ],
    1,
    "So the SHOP REMAINS THE OFFEREE and can decline. Were the display an offer, a customer's acceptance would bind the shop instantly — to a mispriced ticket, and to every person who accepted. The commercial logic is the reason for the rule."),
]

/* ── Chapter 9 · Termination of an offer ────────────────────────── */

const CH09: AccaQuestion[] = [
  q1("LWEK-09-01", "LWE-09", "B", "easy",
    "When does a posted REVOCATION of an offer take effect?",
    ["On posting", "When it actually arrives", "24 hours after posting", "When the offeree replies"],
    1,
    "When it ACTUALLY ARRIVES. The postal rule applies to ACCEPTANCE only, which is what produces the classic timing problem in these questions."),

  q1("LWEK-09-02", "LWE-09", "B", "easy",
    "A reply varies one term of an offer. What happens to that offer?",
    ["It suspends it", "It destroys it", "It accepts it conditionally", "It has no effect"],
    1,
    "It DESTROYS it, so the offeree cannot afterwards change their mind and accept the original terms."),

  q2("LWEK-09-03", "LWE-09", "B", "medium",
    "An offeror posts a revocation on Monday. The offeree posts an acceptance on Tuesday. The revocation arrives on Wednesday. What is the position?",
    [
      "No contract — the revocation was posted first",
      "A contract formed on Tuesday: acceptance is effective on posting, revocation only on arrival",
      "No contract, the two having cancelled each other out",
      "A contract formed on Wednesday",
    ],
    1,
    "A CONTRACT on TUESDAY. Two different rules apply: acceptance is effective ON POSTING, revocation only when it ACTUALLY ARRIVES. The acceptance took effect while the revocation was still in the post."),

  q2("LWEK-09-04", "LWE-09", "B", "medium",
    "An offeree asks whether delivery could be spread over two months. Does this destroy the offer?",
    [
      "Yes, any response other than acceptance destroys an offer",
      "No — it is a request for information, which leaves the offer standing",
      "Yes, because it proposes a different performance",
      "Only if the offeror declines the request",
    ],
    1,
    "NO. A REQUEST FOR INFORMATION seeks clarification and leaves the offer alive. Only a reply PROPOSING DIFFERENT TERMS is a counter-offer. \"Would you take £950?\" is a question; \"I'll pay £950\" is a counter-offer."),

  q2("LWEK-09-05", "LWE-09", "B", "medium",
    "An offeree learns from a reliable mutual contact that the property has been sold to someone else. Has the offer been revoked?",
    [
      "No, revocation must come from the offeror personally",
      "Yes — revocation may be communicated by a reliable third party",
      "No, unless the offeror confirms it in writing",
      "Only if the offeree had not yet begun to consider the offer",
    ],
    1,
    "YES. Revocation may be communicated by a RELIABLE THIRD PARTY, so the offeror need not do it personally. The source must be reliable — a vague rumour will not do."),

  q2("LWEK-09-06", "LWE-09", "B", "hard",
    "An offeror dies before the offeree accepts. What is the position?",
    [
      "The offer ends immediately regardless of the offeree's knowledge",
      "The offer ends once the offeree learns of the death, unless personal performance was required",
      "The offer continues and binds the estate in every case",
      "The offer is automatically transferred to the personal representatives",
    ],
    1,
    "It ends once the OFFEREE KNOWS of the death, unless the contract required PERSONAL performance. So an offeree who is ignorant of the offeror's death may still be able to accept. Death of the OFFEREE, by contrast, ends the offer at once."),
]

/* ── Chapter 10 · Acceptance and the postal rule ────────────────── */

const CH10: AccaQuestion[] = [
  q1("LWEK-10-01", "LWE-10", "B", "easy",
    "Can silence amount to acceptance?",
    ["Yes, if the offeror says so", "No, some positive act is required", "Yes, after a reasonable time", "Only in a commercial contract"],
    1,
    "NO. An offeror cannot impose a duty to reply, so \"if I hear nothing I shall treat the goods as sold\" creates no contract. Some POSITIVE act is needed."),

  q1("LWEK-10-02", "LWE-10", "B", "easy",
    "When does an emailed acceptance take effect?",
    ["On sending", "On receipt in the offeror's system", "When the offeror reads it", "24 hours after sending"],
    1,
    "ON RECEIPT. Email is treated as effectively INSTANTANEOUS rather than postal, so the postal rule does not apply to it."),

  q2("LWEK-10-03", "LWE-10", "B", "medium",
    "An offeree posts an acceptance which is lost in the post. Post was reasonable and the offer did not require receipt. Is there a contract?",
    [
      "No, the offeror never learned of the acceptance",
      "Yes — the postal rule completed acceptance on posting, and the risk falls on the offeror",
      "Yes, but only once the offeree proves posting",
      "No, unless the offeree posts again",
    ],
    1,
    "YES. The POSTAL RULE makes acceptance complete ON POSTING, and it applies even where the letter is delayed or LOST — so the risk of the post falls on the OFFEROR. An offeror who dislikes that must require actual receipt."),

  q2("LWEK-10-04", "LWE-10", "B", "medium",
    "An offer states \"notice of acceptance must reach us by 5pm Friday\". A letter is posted Thursday and arrives Monday. Is there a contract?",
    [
      "Yes, acceptance was complete on posting",
      "No — the wording required actual receipt, which displaces the postal rule",
      "Yes, provided the delay was the post's fault",
      "No, because acceptance must always be instantaneous",
    ],
    1,
    "NO. Requiring notice to REACH the offeror displaces the postal rule, so ACTUAL COMMUNICATION is needed. That single drafting point is often the difference between a contract and none."),

  q2("LWEK-10-05", "LWE-10", "B", "medium",
    "An offeree posts an acceptance during a widely reported national postal strike. Does the postal rule apply?",
    [
      "Yes, the rule applies to all posted acceptances",
      "No — post was not a reasonable means in the circumstances",
      "Yes, but acceptance is deferred until the strike ends",
      "Only if the offeror also used the post",
    ],
    1,
    "NO. The postal rule applies only where post is a REASONABLE MEANS of acceptance, and a widely reported strike means it was not. The acceptance takes effect, if at all, only on actual receipt."),

  q2("LWEK-10-06", "LWE-10", "B", "hard",
    "An offer asks for a reply by post. The offeree accepts by telephone, which is no slower. Is the acceptance valid?",
    [
      "No, the prescribed mode must be followed exactly",
      "Yes — an equally effective and no slower method suffices unless the mode was made mandatory",
      "No, unless the offeror consents afterwards",
      "Yes, because a prescribed mode is never binding",
    ],
    1,
    "YES. Specifying a method is usually a SUGGESTION, so an equally effective and no slower method is valid. Only wording making the mode EXCLUSIVE — \"by recorded delivery and no other means\" — turns it into a condition."),
]

/* ── Chapter 11 · Consideration ─────────────────────────────────── */

const CH11: AccaQuestion[] = [
  q1("LWEK-11-01", "LWE-11", "B", "easy",
    "Consideration must be:",
    ["Adequate but not sufficient", "Sufficient but need not be adequate", "Both adequate and sufficient", "Neither, provided the promise is serious"],
    1,
    "SUFFICIENT but not ADEQUATE. Sufficiency means having some recognised legal value; adequacy means economic equivalence, which the law does not require."),

  q1("LWEK-11-02", "LWE-11", "B", "easy",
    "Why is past consideration not good consideration?",
    [
      "Because it is too small",
      "Because the act was not given in exchange for the promise, so there was no bargain",
      "Because it cannot be proved",
      "Because it must be in writing",
    ],
    1,
    "Because there was NO BARGAIN — the act was already done, so it was not given in exchange for the promise. The exception is where the act was done at the promisor's REQUEST with payment understood."),

  q2("LWEK-11-03", "LWE-11", "B", "medium",
    "A seller agrees to sell machinery worth £30,000 for £5,000. Is the contract binding?",
    [
      "No, £5,000 is not adequate consideration",
      "Yes — consideration must be sufficient, and courts do not reopen the parties' bargain",
      "No, unless the seller received independent advice",
      "Yes, but only up to the value actually given",
    ],
    1,
    "BINDING. Consideration must be SUFFICIENT, not ADEQUATE, and courts do not assess whether a bargain was economically sensible. An undervalue might matter to undue influence, but not to consideration."),

  q2("LWEK-11-04", "LWE-11", "B", "medium",
    "A subcontractor threatens to stop work unless paid more. The main contractor agrees, because delay would trigger a penalty under its head contract. Is the promise binding?",
    [
      "No — the subcontractor is only doing what it already agreed to do",
      "Yes, if the main contractor gained a practical benefit and there was no economic duress",
      "Yes, because any agreed renegotiation binds",
      "No, because a threat to breach can never support a promise",
    ],
    1,
    "YES, where the promisor obtained a PRACTICAL BENEFIT — here avoiding the head-contract penalty — and there was NO ECONOMIC DURESS. Performing an existing duty is not normally consideration, but practical benefit can supply it."),

  q2("LWEK-11-05", "LWE-11", "B", "medium",
    "A creditor accepts £600 in full settlement of £1,000, paid on the original due date with nothing else changing. Can the creditor sue for the balance?",
    [
      "No, having agreed to accept the lesser sum",
      "Yes — part payment is not consideration for releasing the balance",
      "No, the agreement being a binding compromise",
      "Yes, but only after giving notice",
    ],
    1,
    "YES. Part payment of a debt is NOT consideration for a promise to forgo the balance, because the debtor gives nothing new. The creditor would be bound only by accord and satisfaction, a third-party payment, a composition, a deed, or estoppel."),

  q2("LWEK-11-06", "LWE-11", "B", "hard",
    "Which statement about promissory estoppel is correct?",
    [
      "It creates a cause of action on which a claimant may sue",
      "It is a defence only, and generally suspends rather than extinguishes rights",
      "It applies only to contracts made by deed",
      "It requires consideration to have been given",
    ],
    1,
    "It is a SHIELD, NOT A SWORD — a defence preventing enforcement, creating no cause of action — and it is generally SUSPENSORY, so rights may be resumed on reasonable notice. Its whole point is to operate where consideration is absent."),

  q2("LWEK-11-07", "LWE-11", "B", "medium",
    "A debtor pays part of a debt EARLY, at the creditor's request, in full settlement. Can the creditor sue for the balance?",
    [
      "Yes, part payment is never consideration",
      "No — early payment at the creditor's request is something different, amounting to accord and satisfaction",
      "Yes, unless the agreement was in writing",
      "No, because the creditor cannot go back on any promise",
    ],
    1,
    "NO. Paying EARLY at the creditor's request is something DIFFERENT from what was owed, so it is good consideration by ACCORD AND SATISFACTION. That is one of the recognised escapes from the part-payment rule."),
]

/* ── Chapter 12 · Privity and intention ─────────────────────────── */

const CH12: AccaQuestion[] = [
  q1("LWEK-12-01", "LWE-12", "B", "easy",
    "What does privity of contract mean?",
    [
      "Only a party to a contract may sue or be sued on it",
      "A contract must be kept confidential",
      "Only written contracts are enforceable",
      "Consideration must move to the promisor",
    ],
    0,
    "Only a PARTY may sue or be sued on the contract. A third party acquires no right of enforcement at common law, however much they stand to gain."),

  q1("LWEK-12-02", "LWE-12", "B", "easy",
    "What is the presumption for a social or domestic agreement?",
    ["That it is binding", "That there was no intention to create legal relations", "That it must be in writing", "That consideration is presumed"],
    1,
    "That there was NO INTENTION to create legal relations, so the agreement is not binding. The presumption is rebuttable — most obviously where the parties had separated and negotiated at arm's length."),

  q2("LWEK-12-03", "LWE-12", "B", "medium",
    "A contract between A and B states that C, named in it, may enforce the warranty. Can C sue?",
    [
      "No, privity confines enforcement to A and B",
      "Yes, under the Contracts (Rights of Third Parties) Act 1999",
      "Only if C provided consideration",
      "Only with A and B's consent at the time of the claim",
    ],
    1,
    "YES, under the CONTRACTS (RIGHTS OF THIRD PARTIES) ACT 1999, which lets a third party enforce a term where the contract EXPRESSLY PROVIDES they may. C is identified by name, and no consideration from C is required."),

  q2("LWEK-12-04", "LWE-12", "B", "medium",
    "A substantial commercial agreement states it is \"binding in honour only\". What is its status?",
    [
      "Binding, the commercial presumption being irrebuttable",
      "Unenforceable — the honour clause rebuts the presumption of intention",
      "Binding as to terms already performed only",
      "Void for uncertainty",
    ],
    1,
    "UNENFORCEABLE. In commerce intention IS presumed, but the presumption is REBUTTABLE by clear words, and an honour clause is exactly that. It is not void for uncertainty — the parties simply chose not to create legal relations."),

  q2("LWEK-12-05", "LWE-12", "B", "medium",
    "A separated couple agree that the husband will transfer the house if the wife pays off the mortgage. She does so. Is the agreement binding?",
    [
      "No, domestic agreements are never binding",
      "Yes — separation and arm's-length dealing rebut the domestic presumption, and she performed",
      "Only if the agreement was witnessed",
      "No, because there was no consideration",
    ],
    1,
    "YES. The domestic presumption is REBUTTED where the parties have SEPARATED and negotiated at arm's length — quite unlike a couple living amicably. Paying off the mortgage is also plainly consideration."),

  multi2("LWEK-12-06", "LWE-12", "B", "hard",
    "Which TWO are recognised routes round the privity rule?",
    [
      "Assignment of the benefit of the contract",
      "A claim in tort where an independent duty of care is owed",
      "Proof that the third party would benefit from performance",
      "The third party's own offer to provide consideration",
    ],
    [0, 1],
    "ASSIGNMENT and a claim in TORT. Agency, trusts, collateral contracts, negotiable instruments, statute and the 1999 Act are the others. Merely standing to benefit is exactly what privity says is NOT enough, and a belated offer of consideration does not make a third party a party."),
]

/* ── Chapter 13 · Terms, representations and classification ─────── */

const CH13: AccaQuestion[] = [
  q1("LWEK-13-01", "LWE-13", "B", "easy",
    "What is the remedy for breach of a WARRANTY?",
    ["Damages only", "Damages and termination", "Termination only", "Rescission"],
    0,
    "DAMAGES ONLY. The contract continues and must still be performed. Only breach of a CONDITION, or a serious breach of an innominate term, permits termination."),

  q1("LWEK-13-02", "LWE-13", "B", "easy",
    "Which is a source of IMPLIED terms?",
    ["The parties' negotiations", "Trade custom", "The claimant's expectations", "The court's view of fairness alone"],
    1,
    "TRADE CUSTOM — along with statute, the courts, and a previous consistent course of dealing. Negotiations produce EXPRESS terms, and a court does not imply terms merely because it would be fairer."),

  q2("LWEK-13-03", "LWE-13", "B", "medium",
    "A car dealer tells a private buyer the car has done 20,000 miles. It has done 90,000. Is the statement a term or a representation?",
    [
      "A representation, having been made during negotiations",
      "A term — the dealer had the special expertise and the statement was central to the purchase",
      "Neither, mileage being a matter of opinion",
      "A term only if written into the contract",
    ],
    1,
    "A TERM. The statement came from the party with SPECIAL KNOWLEDGE and was central to the decision to buy. Reverse the parties — a private seller telling a dealer — and the same words are far more likely a mere representation."),

  q2("LWEK-13-04", "LWE-13", "B", "medium",
    "A term can be breached trivially or seriously, and the actual breach caused minor inconvenience only. What can the injured party do?",
    [
      "Terminate, if the contract labelled the term a condition",
      "Claim damages only — for an innominate term the remedy follows the consequences",
      "Terminate, any breach permitting it",
      "Nothing, the breach being minor",
    ],
    1,
    "DAMAGES ONLY. For an INNOMINATE term the remedy depends on the CONSEQUENCES of the actual breach, and termination requires being deprived of substantially the whole benefit. A contractual label cannot manufacture a right to terminate."),

  q2("LWEK-13-05", "LWE-13", "B", "hard",
    "A supply contract labels a delivery date \"a condition\". Delivery is two days late and causes no disruption. Can the buyer terminate?",
    [
      "Yes, the label makes it a condition and any breach permits termination",
      "Unlikely — the label is persuasive but the court looks at substance and the consequences of the actual breach",
      "Yes, because time is always of the essence in commercial contracts",
      "No, and the buyer has no remedy at all",
    ],
    1,
    "UNLIKELY. A label is PERSUASIVE but not conclusive, and a court will not let it make a trivial breach terminable. The buyer is confined to DAMAGES for any loss actually caused — which on these facts is minimal."),

  q2("LWEK-13-06", "LWE-13", "B", "medium",
    "Which type of implied term is NOT displaced by a contrary express agreement?",
    [
      "A term implied by trade custom",
      "The Consumer Rights Act terms as to satisfactory quality against a consumer",
      "A term implied by the courts to give effect to the parties' intention",
      "A term implied from a previous course of dealing",
    ],
    1,
    "The CRA 2015 quality and fitness terms CANNOT be excluded against a consumer at all. Terms implied by the courts, by custom or by a course of dealing all yield to contrary express agreement, because they exist only to fill gaps."),
]

/* ── Chapter 14 · Exclusion clauses and unfair terms ────────────── */

const CH14: AccaQuestion[] = [
  q1("LWEK-14-01", "LWE-14", "B", "easy",
    "Which statute governs unfair terms in a business-to-CONSUMER contract?",
    ["The Unfair Contract Terms Act 1977", "The Consumer Rights Act 2015", "The Sale of Goods Act 1979", "The Consumer Credit Act 1974"],
    1,
    "The CONSUMER RIGHTS ACT 2015. UCTA 1977 governs business-to-BUSINESS exclusions."),

  q1("LWEK-14-02", "LWE-14", "B", "easy",
    "What does the contra proferentem rule do?",
    [
      "Construes an exclusion clause strictly against the party relying on it",
      "Makes all exclusion clauses void",
      "Requires exclusion clauses to be in writing",
      "Presumes an exclusion clause was incorporated",
    ],
    0,
    "Construes the clause STRICTLY AGAINST the party relying on it, so any ambiguity is resolved against them and a clause will not be read as covering a liability it does not clearly describe."),

  q2("LWEK-14-03", "LWE-14", "B", "medium",
    "A business supplier's standard-form clause excludes all liability, including for personal injury caused by negligence, in a contract with another business. What is the position on the injury?",
    [
      "Effective if the clause was reasonable in the circumstances",
      "Void — UCTA 1977 never permits exclusion of liability for death or personal injury caused by negligence",
      "Effective, both parties being businesses of equal standing",
      "Effective only if the buyer received an inducement",
    ],
    1,
    "VOID. Under UCTA 1977 exclusion of liability for DEATH OR PERSONAL INJURY caused by negligence is void outright, and no reasonableness argument saves it. Reasonableness governs only OTHER loss."),

  q2("LWEK-14-04", "LWE-14", "B", "medium",
    "A hotel guest contracts at reception. A notice excluding liability for stolen property is displayed only in the bedroom. Is the clause incorporated?",
    [
      "Yes, the guest had the opportunity to read it",
      "No — notice must be given before or at the time of contracting, and the contract was made at reception",
      "Yes, provided the notice is prominent",
      "Only if the guest signed a register",
    ],
    1,
    "NO. Notice must come BEFORE OR AT the time of contracting. The contract was concluded at reception, so a bedroom notice comes too late and the clause is not incorporated."),

  q2("LWEK-14-05", "LWE-14", "B", "medium",
    "Who must prove that an exclusion clause is reasonable under UCTA 1977, and as at what date?",
    [
      "The customer, judged with hindsight after the loss",
      "The party relying on the clause, judged as at the time the contract was made",
      "The customer, judged as at the time of contracting",
      "Neither — reasonableness is presumed",
    ],
    1,
    "The party RELYING on the clause bears the burden, and reasonableness is judged as at the TIME OF CONTRACTING, not with hindsight. So where the facts are evenly balanced, the clause fails."),

  q2("LWEK-14-06", "LWE-14", "B", "hard",
    "A buyer signs a supplier's order form without reading the reverse, which contains an exclusion clause. Is the clause incorporated?",
    [
      "No, because the buyer never read it",
      "Yes — a signature binds the signer to the terms, absent misrepresentation of the clause's effect",
      "No, unless the supplier drew attention to it",
      "Only if the buyer is a business",
    ],
    1,
    "YES. SIGNATURE is the strongest route to incorporation and binds whether or not the terms were read. But incorporation is only the FIRST hurdle — the clause must still survive construction and statutory control, which is where such clauses usually fail."),

  multi2("LWEK-14-07", "LWE-14", "B", "medium",
    "Which TWO cannot be excluded against a CONSUMER under the CRA 2015?",
    [
      "The term as to satisfactory quality",
      "Liability for death or personal injury caused by negligence",
      "Liability for late delivery",
      "The obligation to accept returns for change of mind",
    ],
    [0, 1],
    "The terms as to SATISFACTORY QUALITY (and fitness and description) and liability for DEATH OR PERSONAL INJURY from negligence cannot be excluded at all. Late delivery terms are subject to the fairness test rather than an outright ban, and there is no general obligation to accept change-of-mind returns."),
]

export const LWE_KIT_AREA_B_PART1: AccaQuestion[] = [
  ...CH07,
  ...CH08,
  ...CH09,
  ...CH10,
  ...CH11,
  ...CH12,
  ...CH13,
  ...CH14,
]
