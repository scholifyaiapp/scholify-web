/*
 * LW-ENG Area B, second half — discharge and breach of contract, damages and the
 * equitable remedies, then tort: passing off, negligence, causation, defences, and
 * the duty of care of accountants and auditors.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * The professional negligence sections are the highest-value block in this area for
 * an accountancy student, because they are about the reader's own exposure. Their
 * plans therefore end at what a firm actually does about it, not at the rule.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWE_PLANS_B2: ExamPlanMap = {
  /* ── LWE-15 · Discharge of a contract ───────────────────────── */

  "LWE-15::performance-agreement": {
    title: "Whether partial performance discharges an obligation",
    format: "ot",
    marks: 2,
    requirement:
      "The general rule on discharge by performance is that performance must be:\n\nA  Substantially complete\nB  Complete and exact, subject to recognised exceptions\nC  Complete only as to the essential terms\nD  Accepted by the other party before it counts",
    plan: [
      {
        step: "State the strict rule first",
        detail:
          "Performance must be complete and exact. A party who performs only part of an entire obligation is generally entitled to nothing — which is harsh, and the exceptions exist because of that harshness.",
      },
      {
        step: "Name the exceptions, since the rule is unusable without them",
        detail:
          "Divisible obligations, substantial performance, acceptance of partial performance by the other party, wrongful prevention of performance, and a tender of performance that is refused.",
      },
      {
        step: "Reject the options that state an exception as the rule",
        detail:
          "Substantial performance and acceptance are both EXCEPTIONS. Options A and D promote an exception to the general rule, which inverts the structure.",
      },
      {
        step: "Note the other routes to discharge",
        detail:
          "Performance, agreement, frustration and breach. Discharge by AGREEMENT itself needs consideration or a deed, since releasing an obligation is a promise like any other.",
      },
    ],
    answer:
      "**B — complete and exact, subject to recognised exceptions.**\n\nThe strict rule is that performance must be complete and exact, so a party who performs only part of an **entire** obligation is generally entitled to nothing. It is a harsh rule, and the exceptions exist precisely because of that harshness:\n\n**Divisible** obligations, where each part is paid for separately; **substantial performance**, where the work is essentially done and payment is due less a deduction for defects; **acceptance** of partial performance by the other party; **wrongful prevention** of performance by the other party; and a **tender** of performance that is refused.\n\nOptions A and D each promote an exception to the status of the general rule, which inverts the structure — and the structure is what the question tests.\n\nThe four routes to discharge are **performance**, **agreement**, **frustration** and **breach**. Discharge by agreement itself requires consideration or a deed, because releasing an obligation is a promise like any other.",
    earns: [
      "Stating the strict rule and then the exceptions, in that order",
      "Knowing discharge by agreement needs consideration or a deed",
    ],
    loses: ["Stating substantial performance as the general rule"],
  },

  "LWE-15::frustration": {
    title: "What frustration requires, and what it does not cover",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would frustrate a contract?\n\nA  Performance has become more expensive than expected\nB  The subject matter of the contract has been destroyed without either party's fault\nC  One party has made a bad bargain\nD  A party has changed its mind about wanting the goods",
    plan: [
      {
        step: "State what frustration requires",
        detail:
          "An event after formation, outside the control and fault of either party, which makes performance impossible, illegal, or radically different from what was contemplated.",
      },
      {
        step: "Apply the radical difference threshold",
        detail:
          "Increased cost, inconvenience and a bad bargain do NOT frustrate. Performance must become radically different, not merely worse — which is what defeats options A and C.",
      },
      {
        step: "Confirm the surviving option meets all limbs",
        detail:
          "Destruction of the subject matter without fault is the paradigm case: performance is impossible, the event is after formation, and neither party is at fault.",
      },
      {
        step: "Note the effect and what limits it",
        detail:
          "Frustration discharges the contract automatically from the moment of the event — it is not elective. It does not apply where the event was foreseen, provided for in a force majeure clause, or self-induced.",
      },
    ],
    answer:
      "**B — the subject matter of the contract has been destroyed without either party's fault.**\n\nFrustration requires an event **after formation**, outside the control and fault of either party, making performance **impossible, illegal, or radically different** from what was contemplated. Destruction of the subject matter without fault meets every limb.\n\nThe threshold is what defeats the other options: increased cost, inconvenience and a bad bargain do **not** frustrate. Performance must become radically different, not merely worse — otherwise every unprofitable contract could be escaped.\n\nTwo features of the effect matter. Frustration discharges the contract **automatically** from the moment of the event — it is not elective, unlike termination for breach. And it does **not** apply where the event was **foreseen**, where the parties **provided for it** in a force majeure clause, or where it was **self-induced**.\n\nThe Law Reform (Frustrated Contracts) Act 1943 then allows recovery of money paid and a just allowance for benefits conferred, mitigating an otherwise arbitrary loss allocation.",
    earns: [
      "Applying the radical difference threshold rather than asking whether performance got harder",
      "Knowing frustration operates automatically and is displaced by a force majeure clause",
    ],
    loses: ["Treating increased cost as frustration, which would let any bad bargain be escaped"],
  },

  /* ── LWE-16 · Breach and the common law remedies ────────────── */

  "LWE-16::forms-and-election": {
    title: "When breach gives a right to terminate",
    format: "ot",
    marks: 2,
    requirement:
      "A party commits a **repudiatory** breach. The injured party:\n\nA  Must terminate the contract\nB  May elect to terminate and claim damages, or to affirm and claim damages\nC  May terminate but cannot claim damages\nD  Has no remedy until performance falls due",
    plan: [
      {
        step: "Define repudiatory breach",
        detail:
          "A breach of condition, a sufficiently serious breach of an innominate term, or a renunciation of the contract. It gives a RIGHT to terminate, not an automatic termination.",
      },
      {
        step: "State the election",
        detail:
          "The injured party may terminate and claim damages, or affirm the contract and claim damages. Damages are available on either route — only the contract's survival differs.",
      },
      {
        step: "Note that election is a real decision with consequences",
        detail:
          "Affirming keeps the contract alive, so the injured party must continue performing. Terminating ends future obligations. Once made with knowledge, the election generally binds.",
      },
      {
        step: "Address anticipatory breach",
        detail:
          "Option D is wrong: where a party renounces before performance falls due, the injured party may sue IMMEDIATELY without waiting for the due date — or may wait and hold the other to the contract.",
      },
    ],
    answer:
      "**B — may elect to terminate and claim damages, or to affirm and claim damages.**\n\nA **repudiatory** breach — breach of a condition, a sufficiently serious breach of an innominate term, or renunciation of the contract — gives a **right** to terminate, not an automatic termination.\n\nDamages are available on either route; only the contract's survival differs. Affirming keeps it alive, so the injured party must continue performing; terminating ends future obligations. Once made with knowledge of the breach, the election generally **binds**.\n\nOption D is the anticipatory breach point, and it is wrong. Where a party renounces the contract **before** performance falls due, the injured party may sue **immediately** without waiting for the due date — or may wait and hold the other party to the contract, at the risk that an intervening frustrating event discharges it.\n\nBreach of a **warranty** gives damages only, with no right to terminate.",
    earns: [
      "Knowing damages survive both routes and that the election binds once made",
      "Knowing an anticipatory breach can be sued on immediately",
    ],
    loses: ["Treating termination as automatic, or as excluding damages"],
  },

  "LWE-16::liquidated-damages": {
    title: "Whether an agreed sum is enforceable or a penalty",
    format: "ot",
    marks: 2,
    requirement:
      "A contract provides that £50,000 is payable on any breach, however minor, where the largest loss any breach could cause is £2,000. The clause is:\n\nA  Enforceable, because the parties agreed it\nB  Unenforceable as a penalty, being out of all proportion to any legitimate interest\nC  Enforceable up to £2,000\nD  Enforceable only if the breach was deliberate",
    plan: [
      {
        step: "Split the two categories",
        detail:
          "LIQUIDATED DAMAGES: a genuine pre-estimate of loss, or a sum protecting a legitimate interest proportionately. Enforceable as agreed. PENALTY: out of all proportion, designed to deter. Unenforceable.",
      },
      {
        step: "Apply the proportionality test to the figures",
        detail:
          "£50,000 against a maximum possible loss of £2,000 is twenty-five times the greatest conceivable loss, and it applies to any breach however minor. That is deterrence rather than compensation.",
      },
      {
        step: "State what happens when the clause falls",
        detail:
          "The clause is unenforceable and the claimant must prove its ACTUAL loss in the ordinary way. It is not rewritten down to a reasonable figure, which is what option C assumes.",
      },
      {
        step: "Note the commercial value of a valid clause",
        detail:
          "A valid liquidated damages clause is recoverable without proving loss, which gives certainty and avoids litigating quantum. That is why parties want them and why the courts police them.",
      },
    ],
    answer:
      "**B — unenforceable as a penalty, being out of all proportion to any legitimate interest.**\n\nA **liquidated damages** clause is a genuine pre-estimate of loss, or a sum protecting a legitimate interest proportionately, and is enforceable as agreed. A **penalty** is out of all proportion and designed to deter rather than compensate, and is unenforceable.\n\n£50,000 against a maximum conceivable loss of £2,000, payable on **any** breach however minor, is twenty-five times the greatest possible loss. That is deterrence.\n\nOption C is the important error: when the clause falls, it is **not rewritten** down to a reasonable figure. It is unenforceable, and the claimant must prove its **actual loss** in the ordinary way — which may be more or less than the clause specified.\n\nThe reason parties want a valid clause is that liquidated damages are recoverable **without proving loss**, which gives certainty and avoids litigating quantum. That commercial value is exactly why courts police the boundary.",
    earns: [
      "Knowing a penalty clause is struck out rather than reduced",
      "Naming the commercial advantage of a valid clause — recovery without proof of loss",
    ],
    loses: ["Assuming the court scales the clause down to a reasonable amount"],
  },

  /* ── LWE-17 · The award of damages ──────────────────────────── */

  "LWE-17::the-principle": {
    title: "What damages are meant to achieve",
    format: "ot",
    marks: 2,
    requirement:
      "The compensatory principle in contract damages aims to put the claimant:\n\nA  In a better position than if the contract had been performed\nB  In the position they would have been in had the contract been performed\nC  In the position they were in before the contract was made\nD  In whatever position the court considers fair",
    plan: [
      {
        step: "State the measure",
        detail:
          "Damages put the claimant in the position they would have occupied had the contract been performed — the expectation measure. Contract protects the expectation of performance.",
      },
      {
        step: "Contrast with the tort measure",
        detail:
          "Tort damages put the claimant in the position they would have been in had the tort NOT been committed — restoring the pre-tort position. Option C states the tort measure, which is the deliberate confusion.",
      },
      {
        step: "Reject punishment and discretion",
        detail:
          "Contract damages are compensatory, not punitive, so the claimant is not put in a better position. And the measure is a legal principle rather than a discretion.",
      },
      {
        step: "Name what is recoverable under it",
        detail:
          "Loss of bargain, loss of profit, and in appropriate cases the cost of cure, wasted expenditure, and damages for distress in the narrow categories where they are allowed.",
      },
    ],
    answer:
      "**B — in the position they would have been in had the contract been performed.**\n\nThat is the **expectation** measure, and it is what makes contract different from tort: contract protects the expectation of **performance**, so damages give the claimant the benefit of the bargain.\n\nOption C states the **tort** measure — the position the claimant would have been in had the tort not been committed — which is the deliberate confusion, and the reason the same facts can yield different sums depending on which action is brought.\n\nContract damages are **compensatory, not punitive**, so the claimant is not put in a better position than performance would have given. And the measure is a legal principle rather than a judicial discretion.\n\nWhat is recoverable under it: **loss of bargain** and **loss of profit**, and in appropriate cases the **cost of cure** or **wasted expenditure**. Damages for **distress** are available only in narrow categories, since the ordinary rule excludes them.",
    earns: [
      "Distinguishing the expectation measure from the tort measure",
      "Knowing contract damages are compensatory rather than punitive",
    ],
    loses: ["Stating the tort measure for a contract claim"],
  },

  "LWE-17::remoteness-mitigation": {
    title: "Which losses are too remote to recover",
    format: "ot",
    marks: 2,
    requirement:
      "A carrier delays delivery of a machine. The buyer loses ordinary trading profit, and also an exceptionally lucrative contract the carrier knew nothing about. The buyer may recover:\n\nA  Both losses in full\nB  The ordinary trading profit, but not the exceptional loss the carrier did not know of\nC  Neither loss\nD  Only the exceptional loss",
    plan: [
      {
        step: "State the two limbs of the remoteness rule",
        detail:
          "Hadley v Baxendale: losses arising naturally from the breach in the ordinary course of things, AND losses within the parties' reasonable contemplation because of special circumstances known to them.",
      },
      {
        step: "Apply each limb to each loss",
        detail:
          "Ordinary trading profit arises naturally from delayed delivery, so it falls in the first limb. The exceptional contract falls in the second limb only if the carrier knew of it — and it did not.",
      },
      {
        step: "Note the practical lesson",
        detail:
          "A party with an unusually valuable interest must TELL the other side before contracting. Knowledge at the time of contracting is what brings the second limb into play.",
      },
      {
        step: "Add mitigation and causation",
        detail:
          "The claimant must take reasonable steps to MITIGATE and cannot recover loss it could reasonably have avoided. And the breach must have CAUSED the loss.",
      },
    ],
    answer:
      "**B — the ordinary trading profit, but not the exceptional loss the carrier did not know of.**\n\n*Hadley v Baxendale* gives two limbs: losses arising **naturally** from the breach in the ordinary course of things, and losses within the parties' **reasonable contemplation** because of special circumstances **known to them**.\n\nOrdinary trading profit arises naturally from delayed delivery, so the first limb covers it. The exceptionally lucrative contract falls under the second limb only if the carrier knew of it — and it did not, so that loss is too remote.\n\nThe practical lesson is the point worth carrying: a party with an unusually valuable interest must **tell the other side before contracting**. Knowledge at the time of contracting is what brings the second limb into play, and silence is what makes the loss irrecoverable.\n\nTwo further limits: the claimant must take reasonable steps to **mitigate** and cannot recover loss it could reasonably have avoided, and the breach must have **caused** the loss.",
    earns: [
      "Applying each limb to each head of loss separately",
      "Naming the practical lesson: disclose the special circumstance before contracting",
    ],
    loses: ["Recovering an exceptional loss the defendant knew nothing about"],
  },

  /* ── LWE-18 · Equitable remedies ────────────────────────────── */

  "LWE-18::the-remedies": {
    title: "When an equitable remedy is available",
    format: "ot",
    marks: 2,
    requirement:
      "Specific performance is most likely to be ordered where:\n\nA  Damages would be an adequate remedy\nB  The subject matter is unique, so damages would not adequately compensate\nC  The contract is one of personal service\nD  The claimant delayed for several years before applying",
    plan: [
      {
        step: "State the governing principle",
        detail:
          "Equitable remedies are DISCRETIONARY and are granted only where damages would be inadequate. So the availability of adequate damages is a bar, not a reason.",
      },
      {
        step: "Identify what makes damages inadequate",
        detail:
          "Uniqueness. Land and a unique chattel cannot be replaced with money, so damages would not put the claimant in the position performance would have given.",
      },
      {
        step: "Recall what specific performance will not be ordered for",
        detail:
          "Contracts of personal service — a court will not compel someone to work — and contracts requiring constant supervision. Option C names a recognised bar.",
      },
      {
        step: "Note the equitable bars generally",
        detail:
          "Delay (laches), lack of clean hands, absence of mutuality, and hardship. Option D names delay, which defeats a claim rather than supporting one.",
      },
    ],
    answer:
      "**B — the subject matter is unique, so damages would not adequately compensate.**\n\nEquitable remedies are **discretionary** and available only where damages would be **inadequate**. So option A is a bar rather than a reason: adequate damages defeat the application.\n\nUniqueness is what makes damages inadequate — land and a unique chattel cannot be replaced with money, so damages would not deliver what performance would have.\n\nOption C names a recognised **bar**: specific performance is not ordered for contracts of **personal service**, because a court will not compel a person to work, nor for contracts requiring constant supervision.\n\nOption D names another bar. The equitable bars are **delay** (laches), lack of **clean hands**, absence of **mutuality**, and **hardship** — and \"he who comes to equity must come with clean hands\" is doing real work in practice.\n\nThe other equitable remedies are **injunction**, **rescission** and **rectification**.",
    earns: [
      "Treating adequate damages as a bar rather than a reason",
      "Naming personal service and delay as recognised bars",
    ],
    loses: ["Selecting an option that states a bar to the remedy as a ground for it"],
  },

  /* ── LWE-19 · Tort and passing off ──────────────────────────── */

  "LWE-19::what-tort-is": {
    title: "How tortious liability differs from contractual",
    format: "ot",
    marks: 2,
    requirement:
      "The principal difference between liability in contract and liability in tort is that in tort:\n\nA  The duty is imposed by law rather than voluntarily assumed\nB  Damages are always higher\nC  No proof of loss is required\nD  There is no limitation period",
    plan: [
      {
        step: "Identify the source of the obligation",
        detail:
          "Contractual duties are voluntarily ASSUMED by agreement. Tortious duties are IMPOSED by law on people who never agreed anything. That is the structural difference.",
      },
      {
        step: "Derive the consequence for who can sue",
        detail:
          "Because tort duties are imposed, no privity is needed — a stranger may owe and be owed a duty. That is why tort reaches third parties contract cannot.",
      },
      {
        step: "Reject the option denying proof of loss",
        detail:
          "Negligence requires damage: duty, breach, causation and loss. A negligent act causing no loss gives no claim, so option C is wrong.",
      },
      {
        step: "Reject the limitation claim",
        detail:
          "Tort has limitation periods — generally six years from when the cause of action accrued, with special rules for latent damage and personal injury.",
      },
    ],
    answer:
      "**A — the duty is imposed by law rather than voluntarily assumed.**\n\nContractual duties are **voluntarily assumed** by agreement; tortious duties are **imposed by law** on people who never agreed anything. That is the structural difference and everything else follows from it.\n\nThe consequence that matters commercially is **who can sue**. Because tort duties are imposed, no privity is required — a stranger may owe and be owed a duty, which is how tort reaches third parties that contract cannot. That is precisely the route by which an auditor can owe a duty to someone who never engaged them.\n\nOption C is wrong: negligence requires **damage**, so the elements are duty, breach, causation and loss, and a negligent act causing no loss gives no claim. Option D is wrong too — tort has limitation periods, generally **six years** from accrual, with special rules for latent damage and personal injury.\n\nThe same facts can found claims in both, and a claimant may plead both.",
    earns: [
      "Deriving the absence of a privity requirement from the imposed nature of the duty",
      "Knowing loss is an element of negligence",
    ],
    loses: ["Assuming tort requires no proof of loss"],
  },

  "LWE-19::passing-off": {
    title: "What passing off requires",
    format: "ot",
    marks: 2,
    requirement:
      "To succeed in passing off, a claimant must establish:\n\nA  A registered trade mark\nB  Goodwill, a misrepresentation likely to deceive, and damage or likely damage\nC  That the defendant acted dishonestly\nD  That the businesses are in the same town",
    plan: [
      {
        step: "Name the three elements",
        detail:
          "Goodwill or reputation attaching to the claimant's goods or services; a misrepresentation by the defendant likely to deceive the public; and damage, or the likelihood of damage, to that goodwill.",
      },
      {
        step: "Note that registration is not required",
        detail:
          "Passing off protects goodwill built by trading, not a registered right. That is its value — it protects an unregistered name or get-up, which trade mark infringement cannot.",
      },
      {
        step: "Note that dishonesty is not required",
        detail:
          "The misrepresentation need not be deliberate. An innocent trader who adopts a confusingly similar name can be liable, because the wrong is the deception of the public.",
      },
      {
        step: "Reject the geographic requirement",
        detail:
          "There is no such element. What matters is whether the public is likely to be deceived, which may occur nationally or online regardless of location.",
      },
    ],
    answer:
      "**B — goodwill, a misrepresentation likely to deceive, and damage or likely damage.**\n\nThe three elements are **goodwill** or reputation attaching to the claimant's goods or services, a **misrepresentation** by the defendant likely to deceive the public, and **damage** or the likelihood of damage to that goodwill.\n\nRegistration is **not** required, and that is where the tort's value lies: it protects an unregistered name, logo or get-up built up by trading, which a trade mark infringement claim cannot reach.\n\n**Dishonesty is not required** either. The misrepresentation need not be deliberate, so an innocent trader adopting a confusingly similar name can be liable — because the wrong is the deception of the **public**, not the defendant's state of mind.\n\nThere is no geographic element; what matters is the likelihood of deception, which may arise nationally or online.\n\nThe remedies are an **injunction** — usually the commercially important one — and **damages** or an account of profits.",
    earns: [
      "Knowing neither registration nor dishonesty is required, and why that matters",
      "Naming the injunction as the commercially important remedy",
    ],
    loses: ["Requiring a registered trade mark, which is the other cause of action entirely"],
  },

  /* ── LWE-20 · Negligence: duty, breach, vicarious liability ─── */

  "LWE-20::duty-and-breach": {
    title: "Establishing a duty of care and its breach",
    format: "ot",
    marks: 2,
    requirement:
      "The standard of care in negligence is that of:\n\nA  The most careful person imaginable\nB  A reasonable person in the defendant's position, judged objectively\nC  Whatever standard the defendant personally thought appropriate\nD  Perfection, so any harm proves breach",
    plan: [
      {
        step: "State the standard",
        detail:
          "The reasonable person in the defendant's position, judged OBJECTIVELY. The defendant's own view of what was appropriate is irrelevant.",
      },
      {
        step: "Note how the standard adjusts",
        detail:
          "It rises where the defendant holds a special skill — a professional is judged by the standard of a reasonably competent member of that profession. So an accountant is judged against accountants.",
      },
      {
        step: "Name the factors that fix the standard in a case",
        detail:
          "The likelihood of harm, the seriousness of potential harm, the cost and practicability of precautions, and the social utility of the activity. These are how breach is actually argued.",
      },
      {
        step: "Reject the two absolutes",
        detail:
          "Neither perfection nor the most careful person imaginable is the standard. Reasonable care is not a guarantee of safety, and harm occurring does not itself prove breach.",
      },
    ],
    answer:
      "**B — a reasonable person in the defendant's position, judged objectively.**\n\nThe standard is **objective**: the defendant's own view of what was appropriate is irrelevant, which is what makes negligence a workable test.\n\nIt **adjusts** to the defendant's position. Where the defendant holds a special skill, they are judged by the standard of a reasonably competent member of that profession — so an accountant is judged against accountants, and inexperience is no defence.\n\nThe factors that fix the standard in a given case are the **likelihood** of harm, the **seriousness** of the potential harm, the **cost and practicability** of precautions, and the **social utility** of the activity. That is how breach is argued in practice.\n\nNeither perfection nor the most careful person imaginable is the standard: reasonable care is not a guarantee of safety, and harm occurring does not itself prove breach.\n\nDuty is established by **foreseeability**, **proximity**, and whether it is **fair, just and reasonable** to impose one.",
    earns: [
      "Knowing the standard rises for a professional and that inexperience is no defence",
      "Naming the factors by which breach is actually argued",
    ],
    loses: ["Treating the occurrence of harm as proof of breach"],
  },

  "LWE-20::vicarious": {
    title: "When an employer is liable for an employee's tort",
    format: "ot",
    marks: 2,
    requirement:
      "An employer is vicariously liable for an employee's tort where the tort was committed:\n\nA  At any time while the person was employed\nB  In the course of employment, or closely connected with what the employee was employed to do\nC  Only if the employer authorised it\nD  Only if the employer was itself negligent",
    plan: [
      {
        step: "State the two requirements",
        detail:
          "An employment relationship, and a tort committed in the course of that employment — extended by the close connection test. Both are needed.",
      },
      {
        step: "Note that authorisation is not required",
        detail:
          "An employer can be liable for an act it expressly forbade, if the act was a wrongful mode of doing authorised work. Option C would make vicarious liability almost never arise.",
      },
      {
        step: "Distinguish vicarious from primary liability",
        detail:
          "Vicarious liability is liability WITHOUT fault on the employer's part. Option D describes the employer's own primary negligence, which is a separate route.",
      },
      {
        step: "Note the independent contractor position",
        detail:
          "There is generally no vicarious liability for an independent contractor, which is why the employee/self-employed distinction in Area C carries so much weight.",
      },
    ],
    answer:
      "**B — in the course of employment, or closely connected with what the employee was employed to do.**\n\nTwo requirements: an **employment relationship**, and a tort **in the course of employment** — extended by the **close connection** test, which covers acts closely connected to what the employee was employed to do even where they were plainly improper.\n\nAuthorisation is **not** required. An employer can be liable for an act it expressly forbade, where the act was a wrongful **mode** of doing authorised work — otherwise vicarious liability would almost never arise, since employers rarely authorise torts.\n\nOption D describes the employer's **own primary negligence**, which is a separate route to liability. Vicarious liability is liability **without fault** on the employer's part, imposed because the employer created the risk and takes the benefit of the work.\n\nThere is generally **no** vicarious liability for an **independent contractor**, which is why the employee versus self-employed distinction carries so much weight in Area C.",
    earns: [
      "Knowing an expressly forbidden act can still be in the course of employment",
      "Separating vicarious liability from the employer's own negligence",
    ],
    loses: ["Requiring the employer to have authorised the act"],
  },

  /* ── LWE-21 · Causation, remoteness and defences ────────────── */

  "LWE-21::causation-remoteness": {
    title: "Testing causation and remoteness in negligence",
    format: "ot",
    marks: 2,
    requirement:
      "In negligence, the test for remoteness of damage is whether the damage was:\n\nA  Directly caused, however unforeseeable\nB  Of a reasonably foreseeable kind\nC  Financially significant\nD  Intended by the defendant",
    plan: [
      {
        step: "Separate causation from remoteness",
        detail:
          "CAUSATION asks whether the breach caused the loss in fact — the 'but for' test. REMOTENESS asks whether the loss is of a kind the law will compensate. Two separate hurdles, both required.",
      },
      {
        step: "State the remoteness test",
        detail:
          "Damage of a reasonably foreseeable KIND is recoverable. The precise extent need not be foreseeable, and the manner of its occurrence need not be either.",
      },
      {
        step: "Note the kind-versus-extent distinction",
        detail:
          "This is where the marks are. If the kind of damage was foreseeable, the defendant is liable for the full extent even if it is far greater than expected — the eggshell skull principle.",
      },
      {
        step: "Note what breaks the chain",
        detail:
          "A NOVUS ACTUS INTERVENIENS — a new intervening act — may break causation, whether the act of a third party, a natural event, or in some cases the claimant.",
      },
    ],
    answer:
      "**B — of a reasonably foreseeable kind.**\n\nCausation and remoteness are two separate hurdles and both must be cleared. **Causation** asks whether the breach caused the loss in fact, tested by asking whether the loss would have occurred **but for** the breach. **Remoteness** asks whether the loss is of a kind the law will compensate.\n\nThe distinction carrying the marks is **kind versus extent**: if the kind of damage was reasonably foreseeable, the defendant is liable for the **full extent** even where it far exceeds what anyone would have expected. That is the **eggshell skull** principle — a defendant takes the victim as they find them.\n\nOption A states the older directness test, which foreseeability replaced.\n\nCausation can be broken by a **novus actus interveniens** — a new intervening act, whether by a third party, a natural event, or in some cases the claimant themselves.",
    earns: [
      "Keeping causation and remoteness as separate hurdles",
      "Knowing the kind must be foreseeable but the extent need not be",
    ],
    loses: ["Applying a directness test, which foreseeability superseded"],
  },

  "LWE-21::defences": {
    title: "The effect of each defence to negligence",
    format: "ot",
    marks: 2,
    requirement:
      "A claimant is found 30% responsible for their own injury through contributory negligence. The effect is that damages are:\n\nA  Refused entirely\nB  Reduced by 30%\nC  Unaffected\nD  Increased by 30%",
    plan: [
      {
        step: "Classify the defence as partial or complete",
        detail:
          "CONTRIBUTORY NEGLIGENCE is a PARTIAL defence: damages are reduced by the claimant's share of responsibility. VOLENTI and illegality are COMPLETE defences, defeating the claim entirely.",
      },
      {
        step: "Apply the apportionment",
        detail:
          "30% responsibility means a 30% reduction, under the Law Reform (Contributory Negligence) Act 1945. The claim succeeds; only the sum falls.",
      },
      {
        step: "Reject the complete-defence answer",
        detail:
          "Option A treats contributory negligence as defeating the claim. Before 1945 it did — knowing that the statute changed it to apportionment is what the question tests.",
      },
      {
        step: "Note what volenti requires",
        detail:
          "Full knowledge of the nature and extent of the risk, and a voluntary acceptance of it. It is narrow, and rarely available against an employee, since consent must be genuinely free.",
      },
    ],
    answer:
      "**B — reduced by 30%.**\n\n**Contributory negligence** is a **partial** defence: under the Law Reform (Contributory Negligence) Act 1945 damages are reduced by the claimant's share of responsibility. The claim still **succeeds**; only the sum falls.\n\nOption A treats it as a complete defence. Before the 1945 Act it was — so knowing that the statute converted it to apportionment is exactly what the question tests.\n\nThe **complete** defences are **volenti non fit injuria** and **illegality**, which defeat the claim entirely.\n\nVolenti is narrow and its requirements are examined: **full knowledge** of the nature and extent of the risk, and a **voluntary** acceptance of it. It is rarely available against an employee, because consent given under the economic pressure of keeping a job is not genuinely free.\n\nA valid **exclusion clause** may also limit liability, subject to the statutory controls — and liability for death or personal injury from negligence can never be excluded.",
    earns: [
      "Classifying the defence as partial and naming the 1945 Act",
      "Knowing volenti requires full knowledge and genuinely free consent",
    ],
    loses: ["Treating contributory negligence as a complete defence"],
  },

  /* ── LWE-22 · The duty of care of accountants and auditors ───── */

  "LWE-22::client-and-third-parties": {
    title: "To whom an auditor owes a duty of care",
    format: "mtq",
    marks: 6,
    requirement:
      "An audit firm gives an unqualified opinion on a company's financial statements. The statements materially overstate profit. An investor who read the published accounts buys shares and loses money. The investor sues the audit firm in negligence.\n\n(i) State the test for whether the audit firm owes the investor a duty of care.\n(ii) Apply it to these facts and state the likely outcome.\n(iii) State ONE circumstance in which the outcome would differ.",
    plan: [
      {
        step: "Answer part (i) with the test, not with the outcome",
        detail:
          "Foreseeability of reliance, proximity between the parties, and whether it is fair, just and reasonable to impose a duty — narrowed for negligent misstatement by asking whether the statement was made for the PURPOSE on which the claimant relied.",
      },
      {
        step: "Identify the audit's statutory purpose, because it decides the case",
        detail:
          "An audit report is made to the MEMBERS AS A BODY, so the company's shareholders can assess stewardship. It is not prepared to guide investment decisions by individuals, and Caparo turns on exactly that.",
      },
      {
        step: "Apply it and give a definite answer",
        detail:
          "The investor relied on the report for a purpose it was not made for, so there is no proximity and no duty. State the conclusion — an application that trails off without one loses the application marks.",
      },
      {
        step: "Make part (iii) a change that reverses the analysis",
        detail:
          "The auditor knowing the identity of the claimant and the specific transaction, and intending them to rely — for instance a report prepared for a named bidder. That supplies the proximity Caparo found missing.",
      },
    ],
    answer:
      "**(i) The test**\n\nA duty of care requires **foreseeability** of reliance, **proximity** between the parties, and that it be **fair, just and reasonable** to impose a duty. For negligent misstatement the decisive question is narrower: was the statement made for the **purpose** on which the claimant relied, and did the maker know it would be communicated to that claimant for that purpose?\n\n**(ii) Application, and the outcome**\n\nAn audit report is made to the **members as a body**, so that the shareholders can assess the directors' stewardship. It is **not** prepared to guide the investment decisions of individuals contemplating buying shares.\n\nThe investor therefore relied on it for a purpose it was not made for. There is no **proximity**, and no duty is owed — *Caparo Industries plc v Dickman*. **The claim would fail.**\n\nThe reason is policy as much as principle: a duty to every reader of published accounts would expose auditors to an indeterminate class of claimants for an indeterminate amount.\n\n**(iii) One circumstance in which the outcome would differ**\n\nWhere the auditor **knew the identity of the claimant and the specific transaction** and intended them to rely — for example a report prepared for a named bidder in an identified takeover. That supplies the proximity *Caparo* found missing, and a duty would arise.",
    earns: [
      "Stating the purpose test as the decisive question for negligent misstatement",
      "Identifying the audit's statutory purpose — the members as a body — and reasoning from it",
      "Reaching a definite conclusion on the facts",
      "Making (iii) a change that supplies proximity, not merely a different set of facts",
    ],
    loses: [
      "Finding a duty because reliance was foreseeable — foreseeability alone is never enough",
      "Setting out the three-stage test and never applying it, which loses the application marks",
      "Answering (iii) with \"if the accounts were more wrong\", which does not change the duty analysis",
    ],
  },

  "LWE-22::managing-exposure": {
    title: "How a firm actually limits its professional exposure",
    format: "ot",
    marks: 2,
    requirement:
      "Which is the most effective step an accountancy firm can take to limit its liability to a third party who may read its report?\n\nA  Buying professional indemnity insurance\nB  Including a clear disclaimer identifying the purpose of the report and the persons entitled to rely on it\nC  Doing the work more quickly\nD  Refusing to give any written report",
    plan: [
      {
        step: "Ask what actually prevents the duty arising",
        detail:
          "A duty for negligent misstatement turns on the PURPOSE of the statement and who was intended to rely. A disclaimer addresses exactly that, so it can stop the duty arising at all.",
      },
      {
        step: "Distinguish preventing liability from paying for it",
        detail:
          "Insurance meets a claim after it succeeds; it does not stop the claim. Both matter, but only one limits liability, which is what the stem asks about.",
      },
      {
        step: "Reject the option that would prevent the work",
        detail:
          "Refusing to give any written report avoids liability by not doing the job. Option D is not a way of managing exposure, it is a way of having no practice.",
      },
      {
        step: "Name the rest of the toolkit",
        detail:
          "A clear engagement letter defining the scope, an agreed liability cap where permitted, quality control and review procedures, and declining work outside the firm's competence.",
      },
    ],
    answer:
      "**B — including a clear disclaimer identifying the purpose of the report and the persons entitled to rely on it.**\n\nA duty for negligent misstatement turns on the **purpose** of the statement and who was intended to rely on it. A disclaimer addresses precisely that, so it can prevent the duty **arising at all** — which is more valuable than any remedy after the event.\n\n**Insurance** is essential but does something different: it meets a claim once it has succeeded, rather than preventing it. The stem asks about limiting liability, not funding it.\n\nOption D avoids liability by not doing the work, which is not managing exposure.\n\nThe rest of the toolkit: a clear **engagement letter** defining scope and purpose, an agreed **liability cap** where the law permits one, **quality control and review** procedures, and **declining** work outside the firm's competence.\n\nA disclaimer is not absolute — its effect depends on its clarity and on the statutory controls on excluding liability — but it is the step that goes to the existence of the duty.",
    earns: [
      "Distinguishing preventing the duty from funding the claim",
      "Naming the engagement letter and scope definition alongside the disclaimer",
    ],
    loses: ["Answering insurance, which pays for liability rather than limiting it"],
  },
}
