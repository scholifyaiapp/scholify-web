import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · Area B question kit, part 2 — chapters 15 to 22.
 *
 * Discharge of contract, breach and the common law remedies, damages, the equitable
 * remedies, then tort: passing off, negligence and vicarious liability, causation,
 * remoteness and defences, and the duty of care of accountants and auditors.
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 15 · Discharge of a contract ───────────────────────── */

const CH15: AccaQuestion[] = [
  q1("LWEK-15-01", "LWE-15", "B", "easy",
    "Which is NOT a way a contract may be discharged?",
    ["Performance", "Agreement", "Frustration", "A unilateral change of mind"],
    3,
    "A UNILATERAL CHANGE OF MIND discharges nothing — it is a breach. The four routes are performance, agreement, frustration and breach."),

  q1("LWEK-15-02", "LWE-15", "B", "easy",
    "From when does a frustrated contract end?",
    ["From the date it was made", "From the frustrating event", "From the date proceedings begin", "From the date the court so declares"],
    1,
    "From the FRUSTRATING EVENT, prospectively. It is NOT void from the beginning, which is why obligations already accrued stand and the 1943 Act is needed to adjust matters."),

  q2("LWEK-15-03", "LWE-15", "B", "medium",
    "A builder completes a contract except for minor defects costing £900 to remedy, against a £60,000 price. What can the builder recover?",
    [
      "Nothing, performance having to be complete and exact",
      "£59,100 — the price less the cost of remedying the defects, under substantial performance",
      "A reasonable sum at the client's discretion",
      "£900 only",
    ],
    1,
    "The PRICE LESS THE COST OF REMEDY, under the SUBSTANTIAL PERFORMANCE exception. The strict rule requires complete and exact performance, but substantial performance with only minor defects allows recovery subject to a deduction."),

  q2("LWEK-15-04", "LWE-15", "B", "medium",
    "A supplier's raw material costs treble, making a fixed-price contract heavily loss-making. Is the contract frustrated?",
    [
      "Yes, performance having become commercially impossible",
      "No — increased expense is hardship, not frustration",
      "Yes, if the rise was unforeseeable",
      "Only if the supplier gives notice before performance falls due",
    ],
    1,
    "NO. Frustration needs performance to be IMPOSSIBLE, ILLEGAL or RADICALLY DIFFERENT IN KIND — not merely more expensive or onerous. Protection against price movements must come from a price-variation or force majeure clause."),

  q2("LWEK-15-05", "LWE-15", "B", "medium",
    "A hall is destroyed by fire caused by the negligence of the hall owner's own caretaker. Can the owner rely on frustration?",
    [
      "Yes, destruction of the subject matter always frustrates",
      "No — the impossibility is self-induced, so the owner is in breach",
      "Yes, provided the negligence was not the owner's personally",
      "Only if the hirer had already paid",
    ],
    1,
    "NO. SELF-INDUCED impossibility is not frustration. Because the owner's own employee caused it, the owner is in BREACH and liable in damages, rather than both parties being discharged."),

  q2("LWEK-15-06", "LWE-15", "B", "hard",
    "A contract is frustrated after the hirer paid a deposit and the owner incurred preparation costs. What does the Law Reform (Frustrated Contracts) Act 1943 allow?",
    [
      "Nothing — losses lie where they fall",
      "Recovery of sums paid, cesser of sums payable, and a just sum for expenses or benefits conferred before the event",
      "Full recovery of the deposit regardless of the owner's expenditure",
      "Damages for breach against whichever party benefited",
    ],
    1,
    "Recovery of SUMS PAID, cesser of SUMS PAYABLE, and a JUST SUM for expenses incurred or a valuable benefit conferred before the event. So the hirer is unlikely to get the whole deposit back where real preparation costs were incurred."),
]

/* ── Chapter 16 · Breach and the common law remedies ────────────── */

const CH16: AccaQuestion[] = [
  q1("LWEK-16-01", "LWE-16", "B", "easy",
    "What is an anticipatory breach?",
    [
      "A breach that causes no loss",
      "A declaration before performance is due that a party will not perform",
      "A breach of an implied term",
      "A breach the injured party has affirmed",
    ],
    1,
    "A declaration, by words or conduct, BEFORE performance is due, that a party will not perform. The injured party may sue immediately or affirm and wait."),

  q1("LWEK-16-02", "LWE-16", "B", "easy",
    "What is the effect of a valid liquidated damages clause?",
    [
      "The agreed sum is recoverable without proof of actual loss",
      "The claimant must still prove its actual loss",
      "The clause is void as a penalty",
      "Recovery is limited to the lower of the agreed sum and the actual loss",
    ],
    0,
    "The AGREED SUM is recoverable without proof of loss, and even where the actual loss proves SMALLER — that certainty is the purpose of the clause. It also CAPS recovery where the real loss is larger."),

  q2("LWEK-16-03", "LWE-16", "B", "medium",
    "A buyer tells a seller in advance it will not accept delivery. What are the seller's options?",
    [
      "It must wait until the delivery date before suing",
      "Sue immediately, or affirm and wait — but waiting risks losing the claim if the contract is later frustrated",
      "Terminate at once or lose the right to damages",
      "Claim the deposit only",
    ],
    1,
    "An ELECTION: sue at once on the anticipatory breach, or affirm and wait for the performance date. Waiting is riskier — if the contract is FRUSTRATED meanwhile, both parties are discharged and the seller loses its claim."),

  q2("LWEK-16-04", "LWE-16", "B", "medium",
    "A party terminates for breach of a term that was in fact a warranty. What is the consequence?",
    [
      "Nothing — termination for any breach is permitted",
      "It is itself in repudiatory breach and becomes liable to the other party",
      "The contract is discharged by agreement",
      "The contract is frustrated",
    ],
    1,
    "It is ITSELF IN REPUDIATORY BREACH and becomes the defendant. Breach of warranty gives DAMAGES ONLY, so wrongful termination is a serious risk — which is why the safe course in a marginal case is to perform and sue."),

  q2("LWEK-16-05", "LWE-16", "B", "medium",
    "A contract fixes damages at £5,000 a week for delay as a genuine pre-estimate. Actual loss is £3,000 a week. What is recoverable?",
    ["£3,000 a week", "£5,000 a week", "Nothing, the clause being a penalty", "£5,000 a week only on proof of loss"],
    1,
    "£5,000 A WEEK. A genuine pre-estimate is a valid LIQUIDATED DAMAGES clause, recoverable as agreed even where the actual loss is smaller. It becomes a PENALTY only if fixed to deter and out of all proportion to any legitimate interest."),

  q2("LWEK-16-06", "LWE-16", "B", "hard",
    "An injured party affirms an anticipatory breach and waits. Before the performance date the contract is frustrated. What is the position?",
    [
      "The claim survives, having accrued at the date of the anticipatory breach",
      "Both parties are discharged and the injured party loses its claim",
      "The injured party may still sue for its wasted expenditure only",
      "The frustrating event is treated as the other party's breach",
    ],
    1,
    "BOTH PARTIES ARE DISCHARGED and the claim is LOST. That is the risk of affirming: suing immediately would have crystallised the right to damages. This is why the election on anticipatory breach must be taken carefully."),
]

/* ── Chapter 17 · The award of damages ──────────────────────────── */

const CH17: AccaQuestion[] = [
  q1("LWEK-17-01", "LWE-17", "B", "easy",
    "What do contract damages aim to do?",
    [
      "Punish the defendant",
      "Put the claimant in the position performance would have produced",
      "Restore the claimant to the position before the contract",
      "Strip the defendant of its profit",
    ],
    1,
    "Put the claimant, so far as money can, in the position PERFORMANCE would have produced. They are COMPENSATORY, not punitive, and restoring the pre-contract position is the TORT measure."),

  q1("LWEK-17-02", "LWE-17", "B", "easy",
    "When is RELIANCE loss claimed instead of expectation loss?",
    [
      "Where the claimant prefers it",
      "Where the expected profit is too speculative to prove",
      "Where the breach was deliberate",
      "Where the contract was made by deed",
    ],
    1,
    "Where the expected PROFIT IS TOO SPECULATIVE to prove, so wasted expenditure is claimed instead."),

  q2("LWEK-17-03", "LWE-17", "B", "medium",
    "A buyer suffers unusually large losses because the goods were needed for an exceptionally profitable sub-contract it never mentioned. Are those losses recoverable?",
    [
      "Yes, the breach caused them",
      "No — unusual loss needs the second limb of Hadley v Baxendale, requiring knowledge of the special circumstances when contracting",
      "Yes, if the seller could have guessed the goods were for resale",
      "Only up to the value of the goods",
    ],
    1,
    "NO — TOO REMOTE. Ordinary loss is recoverable under the FIRST limb. Unusual loss needs the SECOND: the special circumstances must have been KNOWN to the defendant AT THE TIME OF CONTRACTING. Telling them later, or their being able to guess, is not enough."),

  q2("LWEK-17-04", "LWE-17", "B", "medium",
    "A claimant could have avoided £11,000 of loss by spending £2,000 on a substitute. It did neither. What is recoverable?",
    [
      "£11,000, the loss having been caused by the breach",
      "£2,000 — the avoidable loss is irrecoverable, but the cost of reasonable mitigation is",
      "Nothing, for failure to mitigate",
      "£13,000",
    ],
    1,
    "£2,000. Failure to MITIGATE bars the AVOIDABLE part of the loss, but the cost of taking reasonable mitigating steps IS recoverable — so the claimant recovers what it should have spent, not what it let happen."),

  q2("LWEK-17-05", "LWE-17", "B", "medium",
    "A commercial contract is breached, causing lost profit and considerable annoyance to the claimant's directors. What is recoverable?",
    [
      "Both the lost profit and a sum for the annoyance",
      "The lost profit only — non-pecuniary loss is not recoverable in an ordinary commercial contract",
      "The annoyance only, the profit being speculative",
      "Nominal damages",
    ],
    1,
    "The LOST PROFIT only. Non-pecuniary loss such as annoyance is NOT recoverable in an ordinary commercial contract. The narrow exception is where the very object of the contract was pleasure, relaxation or peace of mind."),

  q2("LWEK-17-06", "LWE-17", "B", "hard",
    "Defective work could be cured at a cost wildly disproportionate to the benefit. What is the measure of damages?",
    [
      "The full cost of cure regardless of proportionality",
      "The difference in value, or a modest sum for loss of amenity",
      "Nothing, the claimant having received substantial performance",
      "The contract price",
    ],
    1,
    "The DIFFERENCE IN VALUE, or a modest sum for LOSS OF AMENITY where the contract's object was a non-commercial benefit. Cost of cure is the normal measure but not where it is wholly disproportionate to what would be gained."),
]

/* ── Chapter 18 · The equitable remedies ────────────────────────── */

const CH18: AccaQuestion[] = [
  q1("LWEK-18-01", "LWE-18", "B", "easy",
    "For which contract is specific performance most likely to be granted?",
    ["A contract for ordinary goods", "A contract for the sale of land", "A contract of employment", "A contract requiring constant supervision"],
    1,
    "A contract for the sale of LAND, which is unique so damages are inadequate. Ordinary goods can be replaced; personal service and constant-supervision contracts are never specifically enforced."),

  q1("LWEK-18-02", "LWE-18", "B", "easy",
    "What does quantum meruit provide?",
    ["Expectation loss", "A reasonable sum for work actually done", "Rescission of the contract", "An account of profits"],
    1,
    "A REASONABLE SUM for work actually done, where no price was agreed or the contract is unenforceable. It is restitutionary — value received, not expected profit."),

  q2("LWEK-18-03", "LWE-18", "B", "medium",
    "An employee leaves mid-contract to join a competitor. What can the former employer realistically obtain?",
    [
      "Specific performance compelling a return to work",
      "A prohibitory injunction restraining work for the competitor, if a reasonable restraint clause exists",
      "Rescission of the employment contract",
      "Rectification extending the contract's term",
    ],
    1,
    "A PROHIBITORY INJUNCTION, if a REASONABLE restraint of trade clause exists. Specific performance is never granted for a CONTRACT OF PERSONAL SERVICE, and the injunction must not leave the employee unable to earn a living."),

  q2("LWEK-18-04", "LWE-18", "B", "medium",
    "A buyer induced by misrepresentation has since resold the company to an innocent third party. Is rescission available?",
    [
      "Yes, misrepresentation always entitles the representee to rescind",
      "No — restoration is impossible and third-party rights have intervened, so damages only",
      "Yes, provided the resale is unwound first",
      "Only if the misrepresentation was fraudulent",
    ],
    1,
    "NO. Rescission is BARRED by affirmation, delay, impossibility of restoration, and INTERVENING THIRD-PARTY RIGHTS — two of which apply here. The claimant is confined to DAMAGES for misrepresentation."),

  q2("LWEK-18-05", "LWE-18", "B", "hard",
    "Which statement about equitable remedies is correct?",
    [
      "They are available as of right once the wrong is proved",
      "They are discretionary and may be refused where damages are adequate, after delay, or for unclean hands",
      "They are available only where the contract is in writing",
      "They may not be granted against a company",
    ],
    1,
    "They are DISCRETIONARY, and refused where DAMAGES ARE ADEQUATE, after unreasonable DELAY (laches), or where the claimant lacks CLEAN HANDS. Damages are the remedy available as of right."),
]

/* ── Chapter 19 · Tort and passing off ──────────────────────────── */

const CH19: AccaQuestion[] = [
  q1("LWEK-19-01", "LWE-19", "B", "easy",
    "What do TORT damages aim to do?",
    [
      "Put the claimant in the position performance would have produced",
      "Restore the claimant to the position as if the tort had not been committed",
      "Punish the defendant",
      "Strip the defendant of its profit",
    ],
    1,
    "RESTORE THE STATUS QUO — the position had the tort not been committed. The other measure, the position performance would have produced, is the CONTRACT measure."),

  q1("LWEK-19-02", "LWE-19", "B", "easy",
    "Is intention required for passing off?",
    ["Yes, always", "No — innocent passing off is actionable", "Only for an injunction", "Only where no trade mark is registered"],
    1,
    "NO. The elements are GOODWILL, MISREPRESENTATION and DAMAGE. Intention is not among them, so innocent passing off is actionable."),

  q2("LWEK-19-03", "LWE-19", "B", "medium",
    "A trader adopts a name confusingly similar to an established competitor's. Companies House accepted the name and the competitor has no registered trade mark. Is the trader liable in passing off?",
    [
      "No, having not intended to deceive",
      "Yes — passing off needs no intention, registration by Companies House is no defence, and the tort protects unregistered goodwill",
      "No, because the competitor never registered a trade mark",
      "Only on proof of actual lost sales",
    ],
    1,
    "YES on all three points. Intention is not an element; acceptance by the registrar authorises nothing; and passing off exists precisely to protect UNREGISTERED goodwill. The LIKELIHOOD of damage suffices."),

  q2("LWEK-19-04", "LWE-19", "B", "medium",
    "How does passing off differ from trade mark infringement?",
    [
      "Passing off is statutory; infringement is a common law tort",
      "Passing off protects unregistered goodwill and requires proof of goodwill, misrepresentation and damage; infringement depends on registration",
      "Passing off requires intention; infringement does not",
      "Only passing off allows an injunction",
    ],
    1,
    "Passing off is the COMMON LAW tort protecting UNREGISTERED goodwill, with a heavier burden of proof; infringement is STATUTORY and depends on REGISTRATION, which is why registering a mark is worth the trouble."),

  q2("LWEK-19-05", "LWE-19", "B", "hard",
    "Why can a tort claim reach a defendant where a contract claim cannot?",
    [
      "Because tort damages are larger",
      "Because a tort duty is imposed by law, so it can be owed to someone who never dealt with the defendant and gave no consideration",
      "Because tort has no limitation period",
      "Because tort liability is strict",
    ],
    1,
    "Because the duty is IMPOSED BY LAW rather than agreed, so it can be owed to a person who never dealt with the defendant. Privity and consideration confine a contract claim to the parties; tort is not so limited."),
]

/* ── Chapter 20 · Negligence and vicarious liability ────────────── */

const CH20: AccaQuestion[] = [
  q1("LWEK-20-01", "LWE-20", "B", "easy",
    "Which are the three limbs of the Caparo test for a duty of care?",
    [
      "Foreseeability, proximity, and that it is fair, just and reasonable",
      "Duty, breach and damage",
      "Foreseeability, causation and remoteness",
      "Control, integration and economic reality",
    ],
    0,
    "Reasonable FORESEEABILITY, sufficient PROXIMITY, and that it is FAIR, JUST AND REASONABLE to impose a duty. Duty, breach and damage are the three elements of the tort itself."),

  q1("LWEK-20-02", "LWE-20", "B", "easy",
    "What is the standard of care in negligence?",
    [
      "The standard the defendant could personally manage",
      "The objective standard of the reasonable person doing that activity",
      "Perfection",
      "Whatever the trade customarily does, conclusively",
    ],
    1,
    "OBJECTIVE — the reasonable person doing that activity. Inexperience is no defence, and where a special skill is held out the standard is that of a reasonably competent member of that profession. Common practice is strong evidence but not conclusive."),

  q2("LWEK-20-03", "LWE-20", "B", "medium",
    "A driver expressly forbidden to carry passengers gives a lift while making deliveries and injures the passenger by careless driving. Is the employer liable?",
    [
      "No, the driver breached an express prohibition",
      "Yes — the driver was doing the authorised job by a forbidden method, so it was in the course of employment",
      "No, the passenger having no contract with the employer",
      "Only if the employer knew lifts were given",
    ],
    1,
    "YES. The driver was DOING THE JOB by a FORBIDDEN METHOD. A prohibition on the MANNER of performing work does not take the employee outside the course of employment; only one defining its SCOPE would."),

  q2("LWEK-20-04", "LWE-20", "B", "medium",
    "An employer engages a self-employed electrician without checking his non-existent qualifications, and his careless work causes a fire. Is the employer liable?",
    [
      "Yes, vicariously, as for an employee",
      "Yes, but directly — for its own negligence in selecting an incompetent contractor",
      "No, an employer is never liable for a contractor",
      "No, unless it supervised the work",
    ],
    1,
    "Yes, but DIRECTLY rather than vicariously. An employer is generally not vicariously liable for an INDEPENDENT CONTRACTOR, but may be liable for its OWN negligence in SELECTING or supervising one, or where the duty is non-delegable."),

  q2("LWEK-20-05", "LWE-20", "B", "medium",
    "A driver finishes his round, drives 30 miles in the opposite direction on a personal visit, and negligently damages a car there. Is the employer vicariously liable?",
    [
      "Yes, he was still employed that day",
      "No — that is a new and independent journey, outside the course of employment",
      "Yes, driving being what he was employed to do",
      "Only if the employer owned the vehicle",
    ],
    1,
    "NO. A substantial departure on a purely personal errand is a NEW AND INDEPENDENT JOURNEY, not a deviation incidental to the work. Compare a driver who merely detours while still doing the job, who remains within the course of employment."),

  q2("LWEK-20-06", "LWE-20", "B", "hard",
    "What is the effect of res ipsa loquitur?",
    [
      "It proves the claimant's case conclusively",
      "The court may infer negligence, so the defendant must explain the accident",
      "It reverses the standard of care",
      "It removes the need to prove damage",
    ],
    1,
    "The court may INFER negligence and the DEFENDANT MUST EXPLAIN, where the thing was under its control and such accidents do not ordinarily happen without negligence. It helps a claimant who cannot show exactly what went wrong."),
]

/* ── Chapter 21 · Causation, remoteness and defences ────────────── */

const CH21: AccaQuestion[] = [
  q1("LWEK-21-01", "LWE-21", "B", "easy",
    "What is the effect of contributory negligence?",
    ["It defeats the claim entirely", "It reduces damages proportionately", "It reverses the burden of proof", "It has no effect on damages"],
    1,
    "It REDUCES damages in proportion to the claimant's share of responsibility. It is a PARTIAL defence and never defeats the claim — that is volenti."),

  q1("LWEK-21-02", "LWE-21", "B", "easy",
    "In tort, what must be foreseeable for damage to be recoverable?",
    ["The exact extent of the damage", "The kind of damage", "The identity of the claimant", "The precise mechanism of injury"],
    1,
    "The KIND of damage. Once that is foreseeable the defendant is liable for its FULL EXTENT, which is the basis of the thin skull rule."),

  q2("LWEK-21-03", "LWE-21", "B", "medium",
    "A defendant foreseeably causes a minor injury, but the claimant's rare condition makes the consequences catastrophic. What is the defendant liable for?",
    [
      "Only the injury an ordinary person would have suffered",
      "The full extent of the harm — only the kind of damage need be foreseeable",
      "Nothing, the outcome being unforeseeable",
      "Half the loss",
    ],
    1,
    "The FULL EXTENT, under the THIN SKULL rule. The defendant takes the victim as it finds them and cannot rely on an unusual susceptibility, because only the KIND of damage must be foreseeable."),

  q2("LWEK-21-04", "LWE-21", "B", "medium",
    "An employee knows a safety guard is missing but keeps working because output targets are enforced, and is injured. Does volenti apply?",
    [
      "Yes, he knew of the risk and continued",
      "No — knowledge is not consent, and acceptance under economic pressure is not free and voluntary",
      "Yes, if he was warned in writing",
      "No, volenti never applying to any employee in any circumstances",
    ],
    1,
    "NO. VOLENTI needs full knowledge AND FREE, VOLUNTARY acceptance. Knowledge alone is not consent, and continuing under instruction or economic pressure is not a free choice. The employer's best outcome is a partial CONTRIBUTORY NEGLIGENCE reduction."),

  q2("LWEK-21-05", "LWE-21", "B", "medium",
    "A colleague is injured rescuing a worker endangered by the employer's breach. Can the employer rely on volenti against the rescuer?",
    [
      "Yes, the rescuer chose to enter the danger",
      "No — a rescuer acting under a moral duty is not treated as freely accepting the risk",
      "Yes, if the rescue was unnecessary",
      "Only if the rescuer was also an employee",
    ],
    1,
    "NO. A RESCUER acting under a moral duty in an emergency has not freely accepted the risk, and the employer's own breach created the danger prompting the rescue. Courts are also slow to find a rescuer contributorily negligent."),

  q2("LWEK-21-06", "LWE-21", "B", "hard",
    "Following a negligently caused injury, a hospital negligently misreads an X-ray and the outcome worsens. Is the original defendant liable for the worsened outcome?",
    [
      "No, the medical negligence breaks the chain of causation",
      "Yes — negligent medical treatment following an injury is generally foreseeable and does not break the chain",
      "No, liability passes entirely to the hospital",
      "Only for the injury as it stood before treatment",
    ],
    1,
    "YES. A FORESEEABLE intervening act does NOT break the chain, and negligent treatment after an injury is generally regarded as foreseeable — though the hospital is ALSO liable and liability may be apportioned. Only a genuinely independent, unforeseeable act is a novus actus interveniens."),
]

/* ── Chapter 22 · The duty of care of accountants and auditors ─── */

const CH22: AccaQuestion[] = [
  q1("LWEK-22-01", "LWE-22", "B", "easy",
    "For whose benefit is a statutory audit prepared?",
    [
      "Any person who reads the published accounts",
      "The company and its members as a body",
      "Prospective investors",
      "The company's lenders",
    ],
    1,
    "The COMPANY AND ITS MEMBERS AS A BODY, to enable them to exercise governance rights — NOT as a guide to investment. That is the foundation of the Caparo limitation."),

  q1("LWEK-22-02", "LWE-22", "B", "medium",
    "Which liability can a firm never exclude?",
    [
      "Liability for economic loss to a third party",
      "Liability for death or personal injury caused by its negligence",
      "Liability for late delivery of a report",
      "Liability for a negligent misstatement to its client",
    ],
    1,
    "Liability for DEATH OR PERSONAL INJURY caused by negligence, which is void by statute. A firm may also not contract out of its statutory duties as auditor or its professional obligations."),

  q2("LWEK-22-03", "LWE-22", "B", "medium",
    "A bidder reads a company's published audited accounts, launches a takeover, and loses money because the accounts were negligently prepared. Can it sue the auditor?",
    [
      "Yes, reliance on published accounts being entirely foreseeable",
      "No — on Caparo the audit is for the company and members as a body, so proximity is absent",
      "Yes, an auditor owing a duty to anyone who reads the accounts",
      "Yes, but for half the loss only",
    ],
    1,
    "NO. On CAPARO the audit serves the company and MEMBERS AS A BODY, not investment or takeover decisions. Foreseeability alone is insufficient — PROXIMITY is missing and a duty would create indeterminate liability to the world."),

  q2("LWEK-22-04", "LWE-22", "B", "medium",
    "An auditor sends the accounts directly to a named bank, attends a meeting with it, and confirms in writing that the figures may be relied on for a specific lending decision. Is a duty owed to the bank?",
    [
      "No, the bank is not the client",
      "Yes — the auditor knew the relier's identity and purpose and assumed responsibility",
      "No, unless the bank paid a fee",
      "Only if the engagement letter names the bank",
    ],
    1,
    "YES. Run the three questions: the auditor knew the RELIER'S IDENTITY, knew the SPECIFIC PURPOSE, and positively ASSUMED RESPONSIBILITY. That is the Hedley Byrne special relationship, and it is what distinguishes this from the Caparo situation."),

  q2("LWEK-22-05", "LWE-22", "B", "medium",
    "An existing shareholder reads the audited accounts and buys more shares, losing money because they were negligently prepared. Can she sue the auditor?",
    [
      "Yes, as a member the audit was prepared for her",
      "No — the duty runs to members as a body for governance, not to an individual's investment decision",
      "Yes, provided she voted at the AGM",
      "Only if she held more than 5% of the shares",
    ],
    1,
    "NO. The audit exists so members AS A BODY can exercise governance rights, not to guide an individual decision to increase a holding. Her existing shareholding does not improve the position."),

  q2("LWEK-22-06", "LWE-22", "B", "hard",
    "A firm's engagement letter disclaims all responsibility to third parties, but its partner attends a lender's meeting and confirms the figures may be relied on. What is the effect of the disclaimer?",
    [
      "It is conclusive and defeats any third-party claim",
      "It may be defeated by the firm's own conduct, which can amount to an assumption of responsibility",
      "It is void, disclaimers being unenforceable",
      "It applies only if the third party read it",
    ],
    1,
    "It may be DEFEATED BY THE FIRM'S OWN CONDUCT. Attending the meeting and confirming reliance can amount to an ASSUMPTION OF RESPONSIBILITY despite boilerplate to the contrary — conduct beats small print. Disclaimers are also subject to statutory control and reasonableness."),
]

export const LWE_KIT_AREA_B_PART2: AccaQuestion[] = [
  ...CH15,
  ...CH16,
  ...CH17,
  ...CH18,
  ...CH19,
  ...CH20,
  ...CH21,
  ...CH22,
]
