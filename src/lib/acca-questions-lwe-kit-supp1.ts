import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · supplementary question kit, part 1 — chapters 1 to 22 (Areas A and B).
 *
 * The per-chapter kits carry roughly six questions each, which covers the syllabus but
 * leaves the bank thin for repeat practice: a learner who works a chapter twice starts
 * seeing the same items. This file adds a second pass over every chapter, deliberately
 * weighted towards the ONE-mark end, because a real sitting has twenty of them and the
 * first pass came out heavier on two-mark applied items.
 *
 * Authored, applied, exam-standard. Original Scholify content. No ACCA or Kaplan
 * question is reproduced.
 */

const AREA_A: AccaQuestion[] = [
  /* Chapter 1 */
  q1("LWEK-S1-01-01", "LWE-01", "A", "easy",
    "Criminal law sits within which broader division?",
    ["Private law", "Public law", "Equity", "The law of obligations"],
    1,
    "PUBLIC law, which also covers constitutional and administrative matters that are not criminal at all. Private law covers contract, tort and property."),

  q2("LWEK-S1-01-02", "LWE-01", "A", "medium",
    "Why may a court refuse an equitable remedy to a claimant with a valid legal right?",
    [
      "Because equitable remedies require the defendant's consent",
      "Because equity acts on conscience, so a claimant who has behaved badly may be refused",
      "Because equitable remedies expire after six years",
      "Because equity applies only to land",
    ],
    1,
    "Because EQUITY ACTS ON CONSCIENCE — \"he who comes to equity must come with clean hands\". Damages would still follow as of right, but a discretionary remedy may be withheld from a claimant whose own conduct has been poor."),

  /* Chapter 2 */
  q1("LWEK-S1-02-01", "LWE-02", "A", "easy",
    "Which track in the County Court is designed to be used without lawyers?",
    ["The multi-track", "The small claims track", "The fast track", "The intermediate track"],
    1,
    "The SMALL CLAIMS TRACK, where costs are not generally recoverable — which is the whole point of it."),

  q1("LWEK-S1-02-02", "LWE-02", "A", "medium",
    "Which court hears an appeal by way of case stated on a point of law from the magistrates?",
    ["The Crown Court", "The High Court", "The Court of Appeal Criminal Division", "The Supreme Court"],
    1,
    "The HIGH COURT (King's Bench). The Crown Court hears general appeals from the magistrates; the Court of Appeal Criminal Division hears appeals from the Crown Court."),

  /* Chapter 3 */
  q1("LWEK-S1-03-01", "LWE-03", "A", "easy",
    "Which authority is PERSUASIVE only?",
    ["The ratio of a superior court in the same hierarchy", "A dissenting judgment", "A statute on the same subject", "A binding precedent not yet overruled"],
    1,
    "A DISSENTING JUDGMENT — as are obiter dicta, decisions of lower courts, and decisions of courts in other jurisdictions."),

  q2("LWEK-S1-03-02", "LWE-03", "A", "medium",
    "Two decisions of courts of equal standing conflict. What may a later court of lower standing do?",
    [
      "It must follow the earlier decision",
      "It may choose between them",
      "It must refer the conflict to the Supreme Court",
      "It must follow neither and decide the case afresh",
    ],
    1,
    "It MAY CHOOSE between them. Conflicting decisions of equal standing are one of the situations in which a precedent does not bind, alongside obiter, per incuriam decisions, overruled decisions and material factual differences."),

  /* Chapter 4 */
  q1("LWEK-S1-04-01", "LWE-04", "A", "easy",
    "Under NEGATIVE resolution procedure, what happens to a statutory instrument?",
    [
      "It requires an active approving vote in Parliament",
      "It stands unless Parliament objects within a set period",
      "It takes effect only after judicial approval",
      "It lapses automatically after one year",
    ],
    1,
    "It STANDS UNLESS PARLIAMENT OBJECTS within the period. AFFIRMATIVE resolution requires an active approving vote, which is why negative resolution is the more common and the less scrutinised."),

  q1("LWEK-S1-04-02", "LWE-04", "A", "medium",
    "Which body scrutinises statutory instruments and reports on those needing attention?",
    ["The Law Commission", "The Joint Committee on Statutory Instruments", "The Administrative Court", "The Privy Council"],
    1,
    "The JOINT COMMITTEE ON STATUTORY INSTRUMENTS — one of the Parliamentary controls, alongside the affirmative and negative resolution procedures."),

  /* Chapter 5 */
  q1("LWEK-S1-05-01", "LWE-05", "A", "easy",
    "What does noscitur a sociis mean?",
    [
      "General words are limited to the class of the preceding list",
      "A word takes its meaning from the words around it",
      "Expressly listing some things excludes others",
      "The literal meaning must always prevail",
    ],
    1,
    "A word takes COLOUR FROM ITS NEIGHBOURS and its context in the Act. The first option is ejusdem generis and the third expressio unius."),

  q2("LWEK-S1-05-02", "LWE-05", "A", "medium",
    "Which approach to interpretation is now dominant in the English courts?",
    ["The literal rule", "The golden rule", "The mischief rule", "The purposive approach"],
    3,
    "The PURPOSIVE approach — reading a provision to give effect to the purpose of the legislation as a whole. The literal rule remains the starting point where words are clear, because Parliament is supreme."),

  /* Chapter 6 */
  q1("LWEK-S1-06-01", "LWE-06", "A", "easy",
    "What must a minister do on introducing a Bill, under s.19 of the Human Rights Act 1998?",
    [
      "Obtain the court's approval of its compatibility",
      "State whether it is compatible with Convention rights",
      "Publish a compatibility assessment by the Law Commission",
      "Nothing — compatibility is assessed only after enactment",
    ],
    1,
    "STATE whether it is compatible with Convention rights, which puts the question on the record before enactment."),

  q2("LWEK-S1-06-02", "LWE-06", "A", "medium",
    "Can a court invalidate DELEGATED legislation for incompatibility with a Convention right?",
    [
      "No, the same protection applies as to an Act",
      "Yes — unlike primary legislation, delegated legislation may be held invalid",
      "Only the Supreme Court may do so",
      "Only if Parliament first passes a remedial order",
    ],
    1,
    "YES. The asymmetry mirrors ultra vires: PRIMARY legislation is beyond judicial challenge, so only a s.4 declaration is available, but DELEGATED legislation can be held invalid."),
]

const AREA_B: AccaQuestion[] = [
  /* Chapter 7 */
  q1("LWEK-S1-07-01", "LWE-07", "B", "easy",
    "Which contract is UNENFORCEABLE rather than void if the required form is missing?",
    ["An illegal contract", "An oral contract for the sale of land", "A contract with a person lacking capacity", "A contract procured by duress"],
    1,
    "An ORAL CONTRACT FOR LAND. It is valid but the court will not enforce it for want of writing. Illegality makes a contract VOID; incapacity and duress make it VOIDABLE."),

  q2("LWEK-S1-07-02", "LWE-07", "B", "medium",
    "A person lacking mental capacity enters a contract. When is it voidable?",
    [
      "Always",
      "Where they did not understand it and the other party knew or ought to have known that",
      "Only if a court has appointed a deputy",
      "Never, capacity being presumed",
    ],
    1,
    "Where they did NOT UNDERSTAND it AND the other party KNEW OR OUGHT TO HAVE KNOWN. Both limbs are needed, so a contract with someone whose incapacity was not apparent stands."),

  /* Chapter 8 */
  q1("LWEK-S1-08-01", "LWE-08", "B", "easy",
    "A company prospectus invites subscriptions for shares. What is it?",
    ["An offer", "An invitation to treat", "A unilateral contract", "An acceptance"],
    1,
    "An INVITATION TO TREAT. The APPLICATION is the offer and the ALLOTMENT is the acceptance."),

  q2("LWEK-S1-08-02", "LWE-08", "B", "medium",
    "An auction is advertised \"without reserve\" and the auctioneer refuses the highest genuine bid. What is the position?",
    [
      "Nothing can be done, an auction advertisement being an invitation to treat",
      "The auctioneer is liable on a collateral offer to sell to the highest bidder",
      "The bidder may compel the sale by specific performance",
      "The advertisement is void for uncertainty",
    ],
    1,
    "The auctioneer is LIABLE on a COLLATERAL OFFER to sell to the highest bidder. The advertisement remains an invitation to treat as to the sale itself, but \"without reserve\" is a separate promise."),

  /* Chapter 9 */
  q1("LWEK-S1-09-01", "LWE-09", "B", "easy",
    "An offer states no deadline. When does it lapse?",
    ["Immediately", "After a reasonable time", "After six months", "It never lapses"],
    1,
    "After a REASONABLE TIME, which depends on the subject matter — days for perishable goods, considerably longer for land."),

  q2("LWEK-S1-09-02", "LWE-09", "B", "medium",
    "An offeree rejects an offer, then changes their mind and purports to accept. Is there a contract?",
    [
      "Yes, the offer having had no deadline",
      "No — rejection ends the offer and cannot be retracted",
      "Yes, if the offeror has not yet withdrawn",
      "Only if the rejection was oral",
    ],
    1,
    "NO. REJECTION ends the offer, and it cannot be retracted — exactly as a counter-offer destroys the original offer. There is nothing left to accept."),

  /* Chapter 10 */
  q1("LWEK-S1-10-01", "LWE-10", "B", "easy",
    "Can a person accept an offer they were unaware of?",
    ["Yes, if they perform the requested act", "No — acceptance must be made in response to the offer", "Yes, in a unilateral contract", "Yes, if the offeror later approves"],
    1,
    "NO. Acceptance must be made IN RESPONSE to the offer, so a person ignorant of it cannot accept even by doing the very act requested."),

  q2("LWEK-S1-10-02", "LWE-10", "B", "medium",
    "An acceptance is stated to be \"subject to contract\". What is its effect?",
    [
      "It is a valid acceptance completing the contract",
      "It is not an acceptance at all — the words show no intention to be bound yet",
      "It is a counter-offer",
      "It is an acceptance conditional on payment",
    ],
    1,
    "NOT AN ACCEPTANCE. \"Subject to contract\" shows the parties do not yet intend to be bound, so no contract is formed. Acceptance must be UNQUALIFIED."),

  /* Chapter 11 */
  q1("LWEK-S1-11-01", "LWE-11", "B", "easy",
    "Can a promise not to sue on a genuine claim be consideration?",
    ["No, forbearance is never consideration", "Yes — forbearance is good consideration", "Only if the claim would have succeeded", "Only if made in a deed"],
    1,
    "YES. FORBEARANCE from suing on a genuine claim is good consideration, because the promisee gives up something of value."),

  q2("LWEK-S1-11-02", "LWE-11", "B", "medium",
    "A person performs a duty owed to a THIRD party, at the promisor's request. Is that consideration?",
    [
      "No, an existing duty is never consideration",
      "Yes — the promisor gains something it had no right to demand",
      "Only where the third party consents",
      "Only if the duty was contractual rather than public",
    ],
    1,
    "YES. Performing a duty owed to a THIRD party is good consideration, because the promisor obtains a benefit it had no right to require. Contrast performing a duty owed to the PROMISOR itself, which is not — absent practical benefit."),

  /* Chapter 12 */
  q1("LWEK-S1-12-01", "LWE-12", "B", "easy",
    "Must a third party exist when a contract conferring a benefit on them is made?",
    ["Yes, always", "No — they must be identified, but need not yet exist", "Yes, unless the contract is by deed", "No, and they need not be identified either"],
    1,
    "They must be IDENTIFIED by name, class or description, but NEED NOT EXIST when the contract is made — which is what allows a benefit to be conferred on a future subsidiary or a class of future purchasers."),

  q2("LWEK-S1-12-02", "LWE-12", "B", "medium",
    "Football pool coupons state that entries are binding in honour only. A claimant sues on a lost coupon. What is the outcome?",
    [
      "The claim succeeds, the arrangement being commercial",
      "The claim fails — the wording negatives the intention to create legal relations",
      "The claim succeeds if the entry can be proved",
      "The claim fails for want of consideration",
    ],
    1,
    "It FAILS. The wording NEGATIVES intention, so there is no contract to sue on. It is not a consideration problem — the entrant paid — but an intention one."),

  /* Chapter 13 */
  q1("LWEK-S1-13-01", "LWE-13", "B", "easy",
    "What is the remedy where a mere representation proves untrue?",
    ["Damages for breach of contract", "Rescission, and damages depending on the type of misrepresentation", "Termination as of right", "Specific performance"],
    1,
    "RESCISSION, with damages depending on whether the misrepresentation was fraudulent, negligent or innocent. Breach of contract is the remedy where the statement was a TERM."),

  q2("LWEK-S1-13-02", "LWE-13", "B", "medium",
    "A seller invites the buyer to have the goods independently inspected before purchase. How does that affect a statement the seller made about them?",
    [
      "It makes the statement a term",
      "It points towards the statement being a mere representation rather than a promise",
      "It has no bearing on the classification",
      "It converts the statement into a warranty",
    ],
    1,
    "It points towards a MERE REPRESENTATION. Inviting verification suggests the seller was not promising the fact — one of the factors alongside importance, relative expertise, timing and whether the statement was reduced to writing."),

  /* Chapter 14 */
  q1("LWEK-S1-14-01", "LWE-14", "B", "easy",
    "Under the CRA 2015, when is a term unfair?",
    [
      "Whenever it favours the trader",
      "Where, contrary to good faith, it causes a significant imbalance to the consumer's detriment",
      "Where it was not individually negotiated",
      "Where the consumer did not read it",
    ],
    1,
    "Where, contrary to GOOD FAITH, it causes a SIGNIFICANT IMBALANCE in the parties' rights to the consumer's detriment. An unfair term is NOT BINDING on the consumer."),

  q2("LWEK-S1-14-02", "LWE-14", "B", "medium",
    "Are a consumer contract's core terms — the main subject matter and the price — subject to the fairness test?",
    [
      "Yes, always",
      "No, provided they are transparent and prominent",
      "Yes, unless individually negotiated",
      "No, in any circumstances",
    ],
    1,
    "NO, PROVIDED they are TRANSPARENT AND PROMINENT. The exemption is conditional — a price buried in small print loses it, and ambiguity in any written term is resolved in the consumer's favour."),

  /* Chapter 15 */
  q1("LWEK-S1-15-01", "LWE-15", "B", "easy",
    "Which exception allows recovery where a party has only partly performed and the other freely accepted the benefit?",
    ["Substantial performance", "Acceptance of partial performance", "Divisible obligations", "Tender of performance"],
    1,
    "ACCEPTANCE OF PARTIAL PERFORMANCE, which entitles the performer to a reasonable sum. Substantial performance is where only minor defects remain against a completed job."),

  q2("LWEK-S1-15-02", "LWE-15", "B", "medium",
    "A contract contains a force majeure clause covering the very event that occurs. Is the contract frustrated?",
    [
      "Yes, frustration operates regardless of the contract's terms",
      "No — an event the contract expressly provided for does not frustrate it, and the clause governs",
      "Yes, but only if the clause is unreasonable",
      "Only if the event was unforeseeable",
    ],
    1,
    "NO. An event the parties EXPRESSLY PROVIDED FOR does not frustrate the contract; the CLAUSE governs the consequences. That is precisely why such clauses are negotiated."),

  /* Chapter 16 */
  q1("LWEK-S1-16-01", "LWE-16", "B", "easy",
    "Which is NOT a form of breach of contract?",
    ["Defective performance", "Incapacitating oneself from performing", "Late performance where lateness has serious consequences", "Performing exactly as agreed"],
    3,
    "PERFORMING EXACTLY AS AGREED is discharge by performance, not breach. The forms of breach are non-performance, defective performance, late performance, self-incapacitation and anticipatory breach."),

  q2("LWEK-S1-16-02", "LWE-16", "B", "medium",
    "An injured party is entitled to terminate but chooses to keep the contract alive. What has it done?",
    ["Waived all remedies", "Affirmed the contract, and may still claim damages", "Rescinded the contract", "Committed a repudiatory breach"],
    1,
    "AFFIRMED the contract, retaining the right to DAMAGES. Termination is a choice, not an obligation — and choosing wrongly to terminate would itself be a repudiatory breach."),

  /* Chapter 17 */
  q1("LWEK-S1-17-01", "LWE-17", "B", "easy",
    "What are damages called where a breach is proved but no loss followed?",
    ["Punitive damages", "Nominal damages", "Liquidated damages", "Aggravated damages"],
    1,
    "NOMINAL damages — a token sum recognising the breach where the claimant suffered no loss."),

  q2("LWEK-S1-17-02", "LWE-17", "B", "medium",
    "A holiday is ruined by the tour operator's breach. Can the claimant recover for disappointment?",
    [
      "No, non-pecuniary loss is never recoverable in contract",
      "Yes — the very object of the contract was pleasure and relaxation",
      "Only if the claimant suffered a physical injury",
      "Only nominal damages are available",
    ],
    1,
    "YES. The narrow exception applies where the VERY OBJECT of the contract was PLEASURE, RELAXATION OR PEACE OF MIND — a holiday or a wedding. In an ordinary commercial contract disappointment is irrecoverable."),

  /* Chapter 18 */
  q1("LWEK-S1-18-01", "LWE-18", "B", "easy",
    "What does rectification do?",
    [
      "Improves a bad bargain",
      "Corrects a written document that fails to record the parties' actual common intention",
      "Sets the contract aside entirely",
      "Compels performance of an obligation",
    ],
    1,
    "CORRECTS A DOCUMENT that misrecords the actual common intention. It needs clear evidence of that intention, and it does not rewrite a bargain a party now regrets."),

  q2("LWEK-S1-18-02", "LWE-18", "B", "medium",
    "Why will a court not order specific performance of a contract requiring constant supervision?",
    [
      "Because damages are always adequate for services",
      "Because the court could not practically police compliance",
      "Because such contracts are void",
      "Because only the parties may enforce them",
    ],
    1,
    "Because the court COULD NOT PRACTICALLY SUPERVISE compliance — one of the recognised grounds for refusing the remedy, alongside adequacy of damages, personal service, unclean hands and oppression."),

  /* Chapter 19 */
  q1("LWEK-S1-19-01", "LWE-19", "B", "easy",
    "Which remedy requires a wrongdoer to give up gains made from the wrong?",
    ["Damages", "An account of profits", "An injunction", "Delivery up"],
    1,
    "An ACCOUNT OF PROFITS — often sought in passing off alongside an injunction, which is usually the real objective."),

  q2("LWEK-S1-19-02", "LWE-19", "B", "medium",
    "A claimant in passing off cannot prove any lost sales yet. Is the claim defeated?",
    [
      "Yes, damage must be proved",
      "No — the LIKELIHOOD of damage to goodwill suffices",
      "Yes, unless a trade mark is registered",
      "No, damage not being an element at all",
    ],
    1,
    "NO. The third element is damage OR THE LIKELIHOOD of damage to goodwill, which covers both diverted custom and reputational harm from association with inferior goods."),

  /* Chapter 20 */
  q1("LWEK-S1-20-01", "LWE-20", "B", "easy",
    "How does compliance with common trade practice affect a negligence claim?",
    [
      "It is a complete defence",
      "It is strong evidence of reasonable care but is not conclusive",
      "It is irrelevant",
      "It reverses the burden of proof",
    ],
    1,
    "STRONG EVIDENCE but NOT CONCLUSIVE. A whole trade may be negligent, so following practice does not automatically discharge the duty."),

  q2("LWEK-S1-20-02", "LWE-20", "B", "medium",
    "When may an employer be liable for the tort of an INDEPENDENT contractor?",
    [
      "Never",
      "Where it was negligent in selecting or supervising the contractor, or the duty is non-delegable",
      "Whenever the contractor works on the employer's premises",
      "Whenever the contractor is paid by the employer",
    ],
    1,
    "Where the employer was NEGLIGENT IN SELECTING OR SUPERVISING, or where the duty is NON-DELEGABLE because the activity is inherently hazardous. That liability is DIRECT, not vicarious."),

  /* Chapter 21 */
  q1("LWEK-S1-21-01", "LWE-21", "B", "easy",
    "What does the \"but for\" test establish?",
    ["Remoteness of damage", "Factual causation", "The standard of care", "Contributory negligence"],
    1,
    "FACTUAL CAUSATION — whether the claimant would have suffered the damage BUT FOR the defendant's breach. If the loss would have happened anyway, the breach did not cause it."),

  q2("LWEK-S1-21-02", "LWE-21", "B", "medium",
    "A claimant is found 25% contributorily negligent. What does she recover?",
    ["Nothing", "75% of her loss", "25% of her loss", "Her full loss, the defence affecting costs only"],
    1,
    "75%. Contributory negligence REDUCES damages in proportion to the claimant's share of responsibility, and never defeats the claim."),

  /* Chapter 22 */
  q1("LWEK-S1-22-01", "LWE-22", "B", "easy",
    "Which case established that a duty may arise for a negligent misstatement causing purely financial loss?",
    ["Caparo v Dickman", "Hedley Byrne v Heller", "Donoghue v Stevenson", "Adams v Cape"],
    1,
    "HEDLEY BYRNE v HELLER, requiring a SPECIAL RELATIONSHIP and an assumption of responsibility. CAPARO then set the limits for auditors."),

  q2("LWEK-S1-22-02", "LWE-22", "B", "medium",
    "Which measure can a firm legitimately use to manage its exposure to third parties?",
    [
      "Excluding liability for personal injury caused by negligence",
      "A clear and prominent disclaimer of responsibility to third parties",
      "Contracting out of its statutory duties as auditor",
      "Excluding its professional and ethical obligations",
    ],
    1,
    "A CLEAR AND PROMINENT DISCLAIMER, which can prevent the assumption of responsibility Hedley Byrne requires — though it is subject to statutory control and reasonableness, and can be contradicted by the firm's own conduct. The other three can never be excluded."),
]

export const LWE_KIT_SUPP_PART1: AccaQuestion[] = [...AREA_A, ...AREA_B]
