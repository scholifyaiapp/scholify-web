import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW · Area B — The law of obligations: contract & tort.
 * Rich study chapter: formation, content, breach & remedies, discharge, and an
 * introduction to negligence. Original scenario facts throughout; references only
 * to well-known, generic legal principles. Syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const LW_B: StudyChapter = {
  paper: "LW",
  area: "B",
  title: "The law of obligations: contract & tort",
  minutes: 17,
  intro: "A contract is a promise the law will enforce; a tort is a wrong the law will compensate. Master when a promise binds, what it contains, what happens when it breaks — and when carelessness alone is enough to make you pay.",
  outcomes: [
    "Explain the elements that must be present for a valid contract to form",
    "Distinguish an offer from an invitation to treat, and apply the rules on acceptance",
    "Explain consideration, past consideration, and the effect of promissory estoppel",
    "Classify contract terms and predict the consequence of breaching each type",
    "State the remedies for breach and the rules on remoteness and mitigation",
    "Apply the four-part negligence test and the neighbour principle to a scenario",
  ],
  sections: [
    {
      id: "formation",
      heading: "Formation — building a valid contract",
      blocks: [
        { kind: "text", md: "Not every promise is a contract. If a friend promises to help you move house on Saturday and then sleeps in, you cannot sue. The law only enforces a promise when a specific set of ingredients is present. Miss one and, however sincere the deal felt, there is **no contract** to enforce." },
        { kind: "text", md: "Think of formation as an assembly line. An **offer** meets a matching **acceptance** to form an agreement; **consideration** shows each side is paying a price for the other's promise; an **intention to create legal relations** shows they meant the deal to be binding in law; and both parties must have the **capacity** to contract. Only when all four (five, counting agreement's two halves) are present does a legally binding contract exist." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The road to a valid contract",
          caption: "Each stage must be satisfied. A gap at any point means no enforceable contract.",
          data: {
            steps: [
              { label: "Offer", sub: "a definite promise, ready to be accepted" },
              { label: "Acceptance", sub: "unqualified agreement to those terms" },
              { label: "Consideration", sub: "each side gives something of value" },
              { label: "Intention", sub: "parties meant it to bind in law" },
              { label: "Capacity", sub: "both legally able to contract" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "A contract = **agreement** (offer + acceptance) + **consideration** + **intention to create legal relations** + **capacity**. Remove any single element and the deal is not a binding contract." },
      ],
    },
    {
      id: "offer-acceptance",
      heading: "Offer, invitation to treat and acceptance",
      blocks: [
        { kind: "text", md: "An **offer** is a definite statement of terms that the offeror is prepared to be bound by the moment it is accepted. It must be distinguished from an **invitation to treat** — a mere invitation to others to make offers. Goods in a shop window, items priced on a shelf, catalogues, price lists and most advertisements are invitations to treat, **not** offers. The shopper makes the offer at the till; the shop may accept or refuse it." },
        { kind: "text", md: "Why does this matter? Because only an offer can be accepted into a contract. If a display were an offer, a shop that ran out of stock would be in breach for every customer it turned away. Treating it as an invitation to treat keeps control of the deal with the seller until the last moment." },
        { kind: "callout", tone: "rule", title: "The mirror-image rule", md: "**Acceptance** must be a complete, unqualified agreement to **all** the terms of the offer. Any change of terms is a **counter-offer**, which destroys the original offer and cannot later be accepted." },
        { kind: "example", title: "Worked example — offer, counter-offer and the postal rule", scenario: "On Monday, Priya emails Devon offering to sell her second-hand espresso machine for $600. On Tuesday, Devon replies: \"I'll give you $500.\" Priya says no. On Wednesday, Devon posts a letter saying \"Fine — I accept your $600.\" The letter is posted at 4pm Wednesday and reaches Priya on Friday. Is there a contract, and when?", steps: [
          { label: "The offer", detail: "Priya's $600 email is a definite offer, capable of acceptance." },
          { label: "The counter-offer", detail: "Devon's \"$500\" is a counter-offer. It rejects and destroys the original $600 offer — that offer is now dead." },
          { label: "Can Wednesday's letter revive it?", detail: "No. Once destroyed by a counter-offer, the original offer cannot be accepted. Devon's Wednesday letter is a fresh offer to buy at $600." },
          { label: "The postal rule", detail: "The postal rule (acceptance effective when posted) only applies to an actual acceptance of a live offer. Here there is no live offer to accept, so it does not help Devon." },
        ], result: "There is no contract yet. Devon's Wednesday letter is a new offer at $600 which Priya is free to accept or reject. The postal rule would only bite once a valid acceptance of a live offer is posted." },
        { kind: "callout", tone: "tip", md: "The **postal rule** is an exception: a posted acceptance takes effect the **moment it is posted**, not when received — provided post was a reasonable means of reply and the letter was properly addressed and stamped. Revocation of an offer, by contrast, is only effective when it **actually reaches** the offeree." },
      ],
      check: {
        q: "Sam offers to sell his van to Lee for $4,000. Lee replies, \"I'll pay $3,500.\" Sam refuses. Lee then says, \"OK, I'll pay the full $4,000.\" What is the legal position?",
        options: [
          "A contract exists at $4,000 — Lee accepted the original offer",
          "A contract exists at $3,500 — that was Lee's acceptance",
          "There is no contract; Lee's $3,500 reply was a counter-offer that destroyed the original offer",
          "Sam must sell at $4,000 because he named that price first",
        ],
        correct: 2,
        explain: "Lee's \"$3,500\" was a counter-offer. A counter-offer rejects and destroys the original offer, so the $4,000 offer no longer exists to be accepted. Lee's later \"$4,000\" is a fresh offer that Sam is free to accept or reject — there is no contract unless Sam agrees.",
      },
    },
    {
      id: "consideration",
      heading: "Consideration, intention and capacity",
      blocks: [
        { kind: "text", md: "English law does not enforce bare promises. Each party must give **consideration** — something of value in the eyes of the law — in exchange for the other's promise. It is the price you pay for the other side's promise, whether money, goods, a service, or a promise to do (or not do) something." },
        { kind: "callout", tone: "rule", title: "Sufficient, not adequate", md: "Consideration must be **sufficient** (real and of some value) but need not be **adequate** (a fair or market price). The courts enforce a bad bargain: selling a working car for $1 is a valid contract, because $1 is sufficient consideration even though it is nowhere near adequate." },
        { kind: "text", md: "Two rules trip people up. First, **past consideration is not good consideration**: if the act was already done **before** any promise to pay for it, that past act cannot support the later promise. Second, at common law, **part-payment of a debt is not consideration** for a promise to forgo the balance — paying part of what you already owe gives the creditor nothing new, so the creditor can still claim the rest." },
        { kind: "example", title: "Worked example — past consideration", scenario: "Over a quiet weekend, Noor voluntarily repaints the fence of her neighbour Ravi while he is away. When Ravi returns and sees the fence, he is delighted and promises, \"I'll pay you $200 for that.\" He later refuses to pay. Can Noor enforce the $200 promise?", steps: [
          { label: "When was the act done?", detail: "Noor painted the fence BEFORE Ravi made any promise. The work was complete and freely given." },
          { label: "Is there consideration for the promise?", detail: "Ravi's promise came after the act. The only thing Noor points to is work already finished — that is past consideration." },
          { label: "Apply the rule", detail: "Past consideration is not good consideration. There was no bargain: Noor did not paint the fence in exchange for a promise of $200." },
        ], result: "Noor cannot enforce the $200. The painting was past consideration, so Ravi's promise to pay is a bare, unenforceable promise — however unfair that feels." },
        { kind: "callout", tone: "warn", title: "Promissory estoppel — a shield, not a sword", md: "Where a creditor freely promises to accept less, and the debtor **relies** on that promise, **promissory estoppel** may stop the creditor going back on their word and claiming the balance. But it is only a **defence** (a shield): it prevents enforcement of the original right — it does not create a brand-new cause of action the promisee can sue on." },
        { kind: "text", md: "The final two elements are quicker. An **intention to create legal relations** is presumed in **commercial** agreements (the parties are assumed to mean business) but presumed **absent** in purely **social or domestic** arrangements — though either presumption can be rebutted by evidence. **Capacity** asks whether a party is legally able to contract: contracts with minors, and with those lacking mental capacity, are subject to special protective rules and may be unenforceable against the protected party." },
      ],
      check: {
        q: "Which statement about consideration is correct?",
        options: [
          "Consideration must always be a fair market price to be valid",
          "Consideration must be sufficient (of some value) but need not be adequate (a fair price)",
          "A past act done before any promise is always good consideration",
          "Part-payment of a debt is, at common law, always full consideration for waiving the balance",
        ],
        correct: 1,
        explain: "Consideration must be sufficient but need not be adequate — the courts enforce a bad bargain, so even $1 for a valuable item is valid. Past consideration is NOT good consideration, and part-payment of a debt is NOT generally consideration for giving up the balance (subject to promissory estoppel as a defence).",
      },
    },
    {
      id: "content",
      heading: "The content of a contract — terms and exclusion clauses",
      blocks: [
        { kind: "text", md: "Once a contract exists, the question becomes: what did the parties actually promise? Statements made during negotiation split into **terms** (part of the contract, so breaking one is a breach) and **representations** (statements that induced the contract but are not part of it; a false one is a **misrepresentation**, not a breach). Whether a statement is a term turns on factors such as the importance the parties placed on it, their relative expertise, and whether it was later written into the contract." },
        { kind: "text", md: "Terms themselves are either **express** (actually stated, written or spoken) or **implied** (read into the contract by statute, by custom, or by the courts to give the deal business efficacy). Not all terms carry equal weight — and their weight decides the remedy when they are broken." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Conditions vs warranties",
          caption: "The classification of a term decides what the innocent party can do when it is breached.",
          data: {
            leftTitle: "Condition",
            rightTitle: "Warranty",
            rows: [
              { aspect: "Importance", left: "Goes to the root of the contract", right: "Minor / subsidiary term" },
              { aspect: "If breached", left: "Repudiate (end the contract) AND claim damages", right: "Claim damages only" },
              { aspect: "Contract survives?", left: "Innocent party may treat it as ended", right: "Contract continues" },
              { aspect: "Example", left: "A hired band fails to turn up at all", right: "The band arrives 10 minutes late" },
            ],
          },
        } },
        { kind: "text", md: "Some terms cannot be labelled in advance because the seriousness of a breach varies. These are **innominate (intermediate) terms**: the court looks at the **effect** of the breach after the event. If the breach deprives the innocent party of substantially the whole benefit of the contract, they may treat it like a condition and end the contract; if the consequences are trivial, the remedy is damages only, as with a warranty." },
        { kind: "callout", tone: "rule", title: "Exclusion clauses — two hurdles", md: "A clause trying to **exclude or limit** liability is only effective if it is (1) properly **incorporated** into the contract (by signature, reasonable notice given **before** the contract, or a consistent course of dealing) and (2) clearly **worded** to cover the loss. Even then, statute controls or forbids many exclusions — especially against consumers and for personal injury caused by negligence." },
        { kind: "example", title: "Worked example — an exclusion clause on a car-park ticket", scenario: "Ade drives into an unattended car park. A ticket pops out of a machine at the barrier; only after taking it does he see, in small print on the back, \"The company accepts no liability for any loss or damage howsoever caused.\" A falling sign later dents his car. The company points to the clause. Is Ade bound by it?", steps: [
          { label: "When was the contract formed?", detail: "The contract is formed as the machine issues the ticket at the barrier — that is the point of no return." },
          { label: "Was notice given before that moment?", detail: "Ade only saw the clause on the ticket AFTER the contract was formed. Notice given after the contract cannot incorporate a term." },
          { label: "Effect on incorporation", detail: "Because reasonable notice was not given before or at the time of contracting, the exclusion clause is not part of the contract." },
        ], result: "The clause is not incorporated, so the company cannot rely on it. Even if it had been incorporated, statutory controls on excluding liability for negligence would still have to be cleared." },
      ],
    },
    {
      id: "breach-remedies",
      heading: "Breach, remedies and discharge",
      blocks: [
        { kind: "text", md: "A **breach** occurs when a party fails to perform an obligation without lawful excuse. Breach of a **condition** (or a sufficiently serious breach of an innominate term) is **repudiatory**: the innocent party may choose to end the contract and claim damages, or affirm it and claim damages. Breach of a **warranty** lets the innocent party claim damages only — the contract lives on. A party can also commit an **anticipatory breach** by making clear, before performance is due, that they will not perform — the innocent party can sue at once rather than wait." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Types of breach",
          data: {
            items: [
              { title: "Breach of condition", sub: "Root of the contract — repudiate and/or claim damages" },
              { title: "Breach of warranty", sub: "Minor term — damages only; contract continues" },
              { title: "Breach of innominate term", sub: "Remedy depends on how serious the effect turns out to be" },
              { title: "Anticipatory breach", sub: "Party signals in advance they will not perform — sue now" },
            ],
          },
        } },
        { kind: "text", md: "The primary remedy for breach is **damages** — a sum of money to put the innocent party, so far as money can, in the position they would have been in **had the contract been performed**. Two rules keep damages fair. First, **remoteness**: a loss is only recoverable if it arises naturally from the breach, or was within the reasonable contemplation of both parties when they contracted (the rule associated with **Hadley v Baxendale**). A loss the defendant could not reasonably have foreseen is too remote. Second, **mitigation**: the innocent party must take **reasonable steps to reduce** their loss — they cannot sit back, let losses pile up and claim the lot." },
        { kind: "callout", tone: "warn", title: "Remoteness in action", md: "If unusual, out-of-the-ordinary losses are only recoverable where the special circumstances were **made known** to the other party at the time of contracting. A supplier told only \"deliver this part\" is not liable for the exceptionally lucrative contract they never knew the buyer would lose." },
        { kind: "text", md: "Where damages are inadequate, **equitable remedies** may be available at the court's discretion: **specific performance** orders a party actually to perform (used for unique subject matter such as land, never for personal-service contracts), and an **injunction** orders a party to stop breaching a negative promise. Being equitable, both are discretionary and refused where damages would do or where the claimant has behaved unfairly." },
        { kind: "text", md: "Finally, a contract can come to an end — be **discharged** — in four main ways. By **performance** (both sides do exactly what they promised — the normal, tidy ending); by **agreement** (the parties agree to release each other); by **frustration** (an outside event, without either party's fault, makes performance impossible or radically different from what was undertaken — the contract ends automatically); and by **breach** (a repudiatory breach that the innocent party accepts as ending the contract)." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Four ways a contract is discharged",
          data: {
            items: [
              { title: "Performance", sub: "Both parties fully perform their obligations" },
              { title: "Agreement", sub: "Parties mutually agree to release the contract" },
              { title: "Frustration", sub: "An outside, no-fault event makes performance impossible" },
              { title: "Breach", sub: "A repudiatory breach accepted by the innocent party" },
            ],
          },
        } },
      ],
      check: {
        q: "A caterer breaches a supply contract. The customer could easily have bought identical goods elsewhere at a small extra cost but instead did nothing and let a large loss build up. Which principle limits what the customer can recover?",
        options: [
          "Remoteness — the loss was not foreseeable",
          "Mitigation — the innocent party must take reasonable steps to reduce loss",
          "Frustration — the contract ended automatically",
          "Consideration — the customer gave nothing of value",
        ],
        correct: 1,
        explain: "This is the duty to mitigate. The innocent party cannot recover losses they could reasonably have avoided. Because identical goods were readily available at small extra cost, the customer can only recover that reasonable extra cost — not the larger loss they let accumulate by doing nothing.",
      },
    },
    {
      id: "tort-negligence",
      heading: "An introduction to tort — negligence",
      blocks: [
        { kind: "text", md: "Contract enforces obligations you **agreed** to. **Tort** imposes obligations the law places on everyone, whether or not they ever made a promise. The most important tort is **negligence**: careless conduct that causes foreseeable harm to another. Crucially, there is no contract between the parties — a passer-by injured by a badly stacked display never agreed to anything, yet may still recover." },
        { kind: "text", md: "The foundation of negligence is the **neighbour principle**: you must take reasonable care to avoid acts or omissions you can reasonably foresee would be likely to injure your \"neighbour\" — meaning anyone so closely and directly affected by your act that you ought reasonably to have them in mind. From that idea grew a structured, **four-part test** a claimant must prove." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The negligence test — four elements the claimant must prove",
          caption: "Every element must be established. Fail one and the claim in negligence fails.",
          data: {
            steps: [
              { label: "Duty of care", sub: "defendant owed the claimant a duty" },
              { label: "Breach", sub: "fell below the standard of the reasonable person" },
              { label: "Causation", sub: "the breach factually caused the loss" },
              { label: "Damage", sub: "foreseeable, not-too-remote harm resulted" },
            ],
          },
        } },
        { kind: "text", md: "**Duty of care** asks whether the law recognises a relationship close enough to require care — judged by foreseeability of harm, proximity between the parties, and whether it is fair, just and reasonable to impose a duty. **Breach** measures the defendant's conduct against the **reasonable person**: an objective standard (a professional is judged against the reasonable professional in that field). **Causation** has two parts — factual causation (the \"but for\" test: but for the breach, would the loss have happened?) and legal causation, which excludes damage that is **too remote** — only reasonably foreseeable kinds of harm are recoverable. **Damage** requires actual, foreseeable loss; negligence is not actionable without proof of harm." },
        { kind: "callout", tone: "rule", title: "Defences", md: "Even a proven breach may be reduced or defeated. **Contributory negligence** — where the claimant's own carelessness contributed to the harm — reduces damages proportionately. **Consent (volenti non fit injuria)** — where the claimant freely and knowingly accepted the risk — can defeat the claim entirely." },
        { kind: "example", title: "Worked example — applying the four-part test", scenario: "A supermarket's cleaner mops a walkway during opening hours, leaves no warning sign, and takes a long break. Ten minutes later a shopper, Tomas, slips on the wet floor and breaks his wrist. There is no CCTV dispute: the facts are agreed. Advise whether the supermarket is liable in negligence.", steps: [
          { label: "Duty of care", detail: "An occupier owes its lawful visitors a duty to take reasonable care for their safety — Tomas is plainly a foreseeable neighbour. Duty established." },
          { label: "Breach", detail: "Leaving a wet floor unmarked, then walking away, falls below the standard of the reasonable supermarket. A reasonable operator would sign or cordon the area. Breach established." },
          { label: "Causation", detail: "But for the unmarked wet floor, Tomas would not have slipped. Factual causation established, and the harm is not too remote." },
          { label: "Damage", detail: "A broken wrist is actual, foreseeable physical harm — exactly the kind of injury a wet floor risks." },
        ], result: "All four elements are made out, so the supermarket is liable. If Tomas had been running while looking at his phone, the defence of contributory negligence could reduce — but not necessarily eliminate — his damages." },
      ],
      check: {
        q: "In the negligence test, what does the \"but for\" test establish?",
        options: [
          "Whether the defendant owed the claimant a duty of care",
          "Whether the defendant's conduct fell below the reasonable-person standard",
          "Factual causation — but for the breach, would the loss have occurred?",
          "Whether the claimant consented to the risk",
        ],
        correct: 2,
        explain: "The \"but for\" test establishes factual causation: but for the defendant's breach, would the claimant's loss have happened? If the loss would have occurred anyway, causation fails. Duty, breach and defences are separate elements of the negligence analysis.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a shop display or advertisement as an offer.", fix: "Displays, price lists and most adverts are invitations to treat. The customer makes the offer; the shop accepts or refuses it." },
    { trap: "Thinking a counter-offer can later be 'taken back' and the original accepted.", fix: "A counter-offer destroys the original offer for good. The original cannot be revived — only a fresh offer can restart the deal." },
    { trap: "Saying consideration must be a fair or adequate price.", fix: "Consideration must be sufficient (real value) but NOT adequate. The courts enforce a bad bargain — even $1 for a valuable item is valid." },
    { trap: "Assuming any breach lets the innocent party walk away from the contract.", fix: "Only breach of a CONDITION (or a serious innominate-term breach) allows repudiation. Breach of a warranty gives damages only — the contract continues." },
    { trap: "Forgetting an element of the negligence test — usually causation or damage.", fix: "The claimant must prove ALL four: duty, breach, causation AND damage. No provable loss, or loss too remote, means no negligence claim." },
  ],
  keyTerms: [
    { term: "Invitation to treat", def: "An invitation for others to make an offer (e.g. goods on display), not an offer itself — so it cannot be accepted into a contract." },
    { term: "Counter-offer", def: "A reply that changes the terms of an offer. It rejects and destroys the original offer, which can no longer be accepted." },
    { term: "Consideration", def: "The price each party pays for the other's promise; must be sufficient (of real value) but need not be adequate (a fair price)." },
    { term: "Condition", def: "A term going to the root of the contract; breach lets the innocent party repudiate the contract and claim damages." },
    { term: "Remoteness", def: "The rule that damages are recoverable only for losses arising naturally or within both parties' reasonable contemplation when contracting." },
    { term: "Negligence", def: "A tort: a breach of a duty of care that factually causes reasonably foreseeable damage to the claimant." },
  ],
  summary: [
    "A valid contract needs offer + acceptance (agreement), consideration, intention to create legal relations and capacity — miss one and there is no contract.",
    "Displays and adverts are invitations to treat; acceptance must mirror the offer, and a counter-offer destroys the original offer.",
    "Consideration must be sufficient but not adequate; past consideration is not good consideration, and promissory estoppel is only a defence.",
    "Conditions let the innocent party repudiate; warranties give damages only; innominate terms depend on the seriousness of the breach.",
    "Damages aim to fulfil the bargain, limited by remoteness (Hadley v Baxendale) and mitigation; equitable remedies and frustration are the exceptions.",
    "Negligence needs all four of duty, breach, causation and damage, built on the neighbour principle — with contributory negligence and consent as defences.",
  ],
}
