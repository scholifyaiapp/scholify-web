import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area B, fifth part — damages and the equitable remedies.
 * Chapters 17–18 of the LW-ENG reading tree, completing syllabus group B3.
 *
 * Chapter 16 established WHETHER a remedy is available; these two chapters are about
 * HOW MUCH and WHAT ELSE. Remoteness and mitigation sit here rather than with breach
 * because they limit the quantum, not the right. Chapter 18 then covers what equity
 * adds when money is not an adequate answer — and every equitable remedy carries the
 * same health warning, that it is discretionary and can be refused.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Case names are citations for a
 * proposition, never a source of prose.
 */

/* ── Chapter 17 · B3(c) ────────────────────────────────────────── */

export const LWE_TREE_17: StudyChapter = {
  id: "LWE-17",
  number: 17,
  paper: "LW",
  area: "B",
  title: "The rules on the award of damages",
  minutes: 17,
  syllabusRefs: ["B3(c)"],
  intro:
    "Damages put the injured party where performance would have left them — not where they were before, and not into profit. Three filters then cut the claim down: causation, remoteness, and the duty to mitigate.",
  outcomes: [
    "State the compensatory principle and distinguish expectation from reliance loss",
    "Apply the two limbs of the remoteness rule",
    "Explain the duty to mitigate and its effect on recovery",
    "Explain how damages are measured, including loss of amenity and non-pecuniary loss",
    "Quantify a claim on given facts, applying all three filters",
  ],
  sections: [
    {
      id: "the-principle",
      heading: "The compensatory principle, and what is recoverable",
      blocks: [
        {
          kind: "definition",
          term: "The compensatory principle",
          md: "Damages aim to put the injured party, **so far as money can**, in the position they would have occupied **had the contract been performed**. They are **compensatory**, not punitive: the object is to make good the loss, not to punish the defendant or strip its profit.",
        },
        {
          kind: "table",
          caption: "The two measures a claimant may seek",
          head: ["Measure", "What it gives", "When it is used"],
          rows: [
            ["**Expectation loss**", "The value of the **benefit expected** from performance — typically lost profit", "The normal measure, where the expected gain can be established"],
            ["**Reliance loss**", "**Wasted expenditure** incurred in reliance on the contract", "Where the expected profit is too speculative to prove"],
          ],
        },
        {
          kind: "list",
          title: "The heads of recoverable loss",
          items: [
            "**Loss of profit** or of a bargain, being the ordinary expectation measure.",
            "**Cost of cure** — what it costs to put defective performance right, provided that cost is not wholly disproportionate to the benefit.",
            "**Difference in value** between what was promised and what was delivered, used where cure would be disproportionate.",
            "**Wasted expenditure** thrown away by the breach.",
            "**Loss of amenity**, a modest sum where the contract's object was a pleasurable or non-commercial benefit and cure would be disproportionate.",
            "**Non-pecuniary loss** — normally **irrecoverable** in contract, except where the very object of the contract was pleasure, relaxation or peace of mind, such as a ruined holiday.",
            "**Nominal damages**, where a breach is proved but no loss followed.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Distress and injured feelings are normally irrecoverable",
          md: "Contract damages do not usually compensate for disappointment, injured feelings or damage to reputation — a point that comes up in employment scenarios (chapter 25), where wrongful dismissal recovers the notice period and nothing for the manner of dismissal. The exception is narrow: where the **very object** of the contract was to provide pleasure, relaxation or peace of mind, as with a holiday or a wedding, disappointment **is** recoverable.",
        },
      ],
      check: {
        q: "A commercial contract is breached, causing lost profit and considerable annoyance to the claimant's directors. What is recoverable?",
        options: [
          "Both the lost profit and a sum for the annoyance",
          "The lost profit only — non-pecuniary loss is not recoverable in an ordinary commercial contract",
          "The annoyance only, the profit being too speculative",
          "Nominal damages, since the breach caused no physical loss",
        ],
        correct: 1,
        explain:
          "The LOST PROFIT only. Damages in contract are compensatory and non-pecuniary loss such as annoyance or injured feelings is NOT recoverable in an ordinary commercial contract. The narrow exception is where the very object of the contract was pleasure, relaxation or peace of mind, which a commercial supply contract is not.",
      },
    },
    {
      id: "remoteness-mitigation",
      heading: "Remoteness, causation and mitigation",
      blocks: [
        {
          kind: "definition",
          term: "Remoteness of damage",
          md: "Loss is recoverable only if it was **not too remote**. *Hadley v Baxendale* set two limbs: loss arising **naturally**, in the **ordinary course of things**, from the breach; **or** loss which, though unusual, was within the **reasonable contemplation of both parties** at the time of contracting because of **special circumstances known** to the defendant.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The second limb turns on what the defendant KNEW at the time of contracting",
          md: "This is where the marks are. Ordinary loss is recoverable without more. **Unusual** loss — an exceptionally profitable sub-contract, a plant standing idle for want of one component — is recoverable only if the defendant **knew of the special circumstances when the contract was made**. Telling the supplier afterwards is too late, and so is a supplier who could have guessed. So in any scenario with an unusually large loss, hunt for what the defendant was **told, and when**.",
        },
        {
          kind: "table",
          caption: "The three filters, in order",
          head: ["Filter", "The question", "Effect if it fails"],
          rows: [
            ["**Causation**", "Did the breach **cause** this loss in fact?", "The loss is irrecoverable altogether"],
            ["**Remoteness**", "Was the loss **ordinary**, or within the parties' contemplation from known special circumstances?", "That head of loss is irrecoverable"],
            ["**Mitigation**", "Did the claimant take **reasonable steps** to reduce the loss?", "The avoidable part of the loss is not recoverable"],
          ],
        },
        {
          kind: "definition",
          term: "The duty to mitigate",
          md: "The claimant must take **reasonable steps** to minimise its loss, and cannot recover for loss it could reasonably have avoided. It is not a demanding standard — the claimant need not take **risky or unreasonable** steps, need not damage its own commercial reputation, and is judged on what was reasonable at the time, not with hindsight. A claimant who **does** mitigate successfully recovers less, because the loss is smaller.",
        },
        {
          kind: "example",
          title: "Quantifying through all three filters",
          scenario:
            "Penrose Bakery orders a replacement industrial oven from Ashfold Ltd for delivery on 1 March, telling Ashfold only that it is \"for the bakery\". Ashfold delivers on 22 March. Penrose claims: (a) £9,000 of ordinary profit lost on normal trade during the three weeks; (b) £48,000 of profit lost on an exceptionally lucrative contract to supply a music festival, which Penrose had signed in January but never mentioned to Ashfold; (c) £6,000 paid to hire a substitute oven for two of the three weeks; and (d) £11,000 of further ordinary profit lost in the third week, when Penrose could have extended the substitute hire for another £2,000 but chose not to.",
          steps: [
            { label: "Test (a) ordinary lost profit", detail: "Loss of ordinary trading profit from late delivery of a bakery oven arises NATURALLY in the ordinary course of things — the FIRST LIMB of Hadley v Baxendale. Ashfold knew it was for a bakery. RECOVERABLE: £9,000." },
            { label: "Test (b) the festival contract", detail: "This is UNUSUAL loss, so it needs the SECOND LIMB — special circumstances KNOWN TO ASHFOLD AT THE TIME OF CONTRACTING. Penrose said only that the oven was \"for the bakery\" and never mentioned the festival contract. TOO REMOTE: the £48,000 is irrecoverable." },
            { label: "Test (c) the substitute hire", detail: "Hiring a substitute is exactly what MITIGATION requires, and the cost of reasonable mitigation is recoverable as part of the loss. RECOVERABLE: £6,000." },
            { label: "Test (d) the third week", detail: "Penrose could have avoided £11,000 of loss by spending £2,000 to extend the hire, which was plainly reasonable given it had already done so for two weeks. It FAILED TO MITIGATE, so it cannot recover the avoidable £11,000 — but it can recover the £2,000 it should have spent." },
            { label: "Add it up", detail: "£9,000 ordinary profit + £6,000 hire + £2,000 notional extension = £17,000. The £48,000 fails on REMOTENESS and the £11,000 on MITIGATION." },
          ],
          result:
            "**£17,000**, against a claim of £74,000. Two facts did all the damage: Penrose **never told Ashfold about the festival contract**, and it **stopped mitigating** when continuing was cheap and obvious.",
        },
      ],
      check: {
        q: "A buyer suffers unusually large losses because the goods were needed for an exceptionally profitable sub-contract, which it never told the seller about. Are those losses recoverable?",
        options: [
          "Yes, because the seller's breach caused them",
          "No — unusual loss needs the second limb of Hadley v Baxendale, requiring the special circumstances to be known to the seller when contracting",
          "Yes, if the seller could have guessed the goods were for resale",
          "Only up to the value of the goods themselves",
        ],
        correct: 1,
        explain:
          "NO — TOO REMOTE. Ordinary loss is recoverable under the FIRST limb of HADLEY v BAXENDALE. Unusual loss requires the SECOND limb: the special circumstances must have been KNOWN to the defendant AT THE TIME OF CONTRACTING. Telling the seller later, or the seller merely being able to guess, is not enough.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Awarding unusual loss without asking what the defendant knew when contracting.",
      fix: "The second limb of Hadley v Baxendale requires knowledge of the special circumstances AT THE TIME OF CONTRACTING.",
    },
    {
      trap: "Allowing recovery of loss the claimant could easily have avoided.",
      fix: "The duty to mitigate bars the avoidable part — though the cost of reasonable mitigation IS recoverable.",
    },
    {
      trap: "Awarding damages for distress in a commercial contract.",
      fix: "Non-pecuniary loss is irrecoverable unless the very object of the contract was pleasure, relaxation or peace of mind.",
    },
    {
      trap: "Using cost of cure where it is wildly disproportionate.",
      fix: "Then the measure is the difference in value, or a modest sum for loss of amenity.",
    },
    {
      trap: "Treating damages as punishing the defendant.",
      fix: "They are compensatory — the aim is the position performance would have produced.",
    },
  ],
  keyTerms: [
    { term: "Compensatory principle", def: "Damages put the claimant, so far as money can, in the position performance would have produced." },
    { term: "Expectation loss", def: "The value of the benefit expected from performance, typically lost profit." },
    { term: "Reliance loss", def: "Wasted expenditure incurred in reliance on the contract, used where profit is too speculative." },
    { term: "Remoteness", def: "The Hadley v Baxendale limits: ordinary loss, or unusual loss within the parties' contemplation from known special circumstances." },
    { term: "Mitigation", def: "The duty to take reasonable steps to reduce loss; avoidable loss is irrecoverable but reasonable mitigation costs are recoverable." },
    { term: "Nominal damages", def: "A token sum where breach is proved but no loss resulted." },
    { term: "Loss of amenity", def: "A modest award where the contract's object was a non-commercial benefit and cure would be disproportionate." },
  ],
  summary: [
    "Damages are compensatory and aim at the position performance would have produced.",
    "The claimant may seek expectation loss, or reliance loss where profit is too speculative.",
    "Remoteness allows ordinary loss, and unusual loss only where special circumstances were known at the time of contracting.",
    "The claimant must mitigate, and cannot recover avoidable loss — but recovers the cost of reasonable mitigation.",
    "Non-pecuniary loss is irrecoverable unless the contract's very object was pleasure or peace of mind.",
  ],
  knowledgeDiagnostic: [
    { q: "State the two limbs of Hadley v Baxendale.", a: "Loss arising naturally in the ordinary course of things, and unusual loss within the reasonable contemplation of both parties from special circumstances known to the defendant at the time of contracting." },
    { q: "What is the effect of failing to mitigate?", a: "The avoidable portion of the loss is irrecoverable, though the cost of taking reasonable mitigating steps is itself recoverable." },
    { q: "When can a claimant recover for disappointment?", a: "Only where the very object of the contract was pleasure, relaxation or peace of mind, such as a holiday." },
    { q: "When is reliance loss claimed instead of expectation loss?", a: "Where the profit expected from performance is too speculative to prove, so wasted expenditure is claimed instead." },
  ],
}

/* ── Chapter 18 · B3(d) ────────────────────────────────────────── */

export const LWE_TREE_18: StudyChapter = {
  id: "LWE-18",
  number: 18,
  paper: "LW",
  area: "B",
  title: "The equitable remedies",
  minutes: 15,
  syllabusRefs: ["B3(d)"],
  intro:
    "Equity steps in where damages are not an adequate answer — but every remedy it offers is discretionary, so the question is never simply whether the claimant deserves it.",
  outcomes: [
    "Explain specific performance and identify when it will be refused",
    "Explain the types of injunction and their use",
    "Explain rescission and the bars to it",
    "Explain rectification and a quantum meruit claim",
    "Choose the appropriate remedy on given facts and justify it",
  ],
  sections: [
    {
      id: "the-remedies",
      heading: "What equity offers, and the strings attached",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Every equitable remedy is discretionary — say so in the answer",
          md: "Damages follow **as of right** once breach is proved (chapter 1). An equitable remedy must be **persuaded** out of the court, and it will be refused where **damages are an adequate remedy**, where the claimant has **delayed** unreasonably (*laches*), where the claimant has behaved badly — \"he who comes to equity must come with clean hands\" — or where the order would be **impossible or oppressive** to supervise. An answer that awards specific performance without addressing adequacy of damages is incomplete.",
        },
        {
          kind: "definition",
          term: "Specific performance",
          md: "An order compelling a party to **perform its contractual obligation**. It is exceptional, granted only where **damages would be inadequate** — most typically for **land**, which is unique, or for genuinely **unique goods**.",
        },
        {
          kind: "list",
          title: "When specific performance is refused",
          items: [
            "**Damages would be adequate** — which covers most contracts for ordinary goods, since a substitute can be bought.",
            "**Contracts of personal service.** A court will not compel a person to work, or an employer to keep an employee, because it amounts to compulsory service.",
            "**Contracts requiring constant supervision**, which the court cannot practically police.",
            "**Where the claimant has not performed** its own obligations, or comes without clean hands.",
            "**Where enforcement would be oppressive** to the defendant, or cause hardship out of proportion to the benefit.",
            "**Against a minor**, since it could not be enforced mutually.",
          ],
        },
        {
          kind: "table",
          caption: "The injunctions",
          head: ["Type", "What it does"],
          rows: [
            ["**Prohibitory**", "Restrains a party from doing something — breaching a restraint of trade clause, or misusing confidential information"],
            ["**Mandatory**", "Requires a party to undo something already done. Granted sparingly"],
            ["**Interim (interlocutory)**", "Holds the position until trial, where the balance of convenience favours it"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "An injunction can do indirectly what specific performance cannot",
          md: "A court will not order an employee to work. But it **may** grant a **prohibitory injunction** restraining the employee from working for a competitor, where a valid and reasonable restraint of trade clause exists (chapter 24). The limit is that the injunction must not, in practice, leave the employee with no way of earning a living — at that point it becomes indirect compulsion to perform, and equity refuses it. That boundary is regularly examined.",
        },
        {
          kind: "table",
          caption: "The remaining remedies",
          head: ["Remedy", "What it does", "Key limit"],
          rows: [
            ["**Rescission**", "Sets the contract aside and restores the parties to their pre-contract position — the usual remedy for **misrepresentation**", "Barred by **affirmation**, unreasonable **delay**, where **restoration is impossible**, or where a **third party** has acquired rights (chapter 7)"],
            ["**Rectification**", "Corrects a **written document** that fails to record what the parties actually agreed", "Needs clear evidence of the true common intention; it does not rewrite a bad bargain"],
            ["**Quantum meruit**", "A reasonable sum for **work actually done**, where no price was agreed or the contract is unenforceable", "Not a contractual remedy as such — it is restitutionary, and gives value received rather than expectation"],
          ],
        },
        {
          kind: "example",
          title: "Choosing among the remedies",
          scenario:
            "Four disputes reach a solicitor on the same morning. (a) Halvey agreed to sell a specific warehouse to Trentham for £900,000 and now refuses to complete, the market having risen. (b) Marsden, a graphic designer, has resigned from Corven Ltd two years into a three-year contract and joined a competitor; her contract contains a clause restraining her from working for a competitor within five miles for six months. (c) Ferrers bought a company after the seller falsely stated its main customer contract was secure; Ferrers has since sold the company on to an innocent buyer. (d) Ockley did agreed building work for Selby but the parties never fixed a price, and Selby now refuses to pay anything.",
          steps: [
            { label: "Advise on (a) the warehouse", detail: "SPECIFIC PERFORMANCE. Land is UNIQUE, so damages are inadequate — Trentham cannot simply buy an identical warehouse. The rising market is no defence, and there is no hardship or supervision difficulty." },
            { label: "Advise on (b) the designer", detail: "Specific performance is NOT available: this is a CONTRACT OF PERSONAL SERVICE and no court will compel her to work for Corven. But a PROHIBITORY INJUNCTION may restrain her from working for the competitor, IF the restraint is reasonable — five miles and six months is modest and likely enforceable, and it does not deprive her of all means of earning a living." },
            { label: "Advise on (c) the misrepresented company", detail: "The natural remedy for MISREPRESENTATION is RESCISSION, but it is BARRED here: Ferrers has resold to an INNOCENT THIRD PARTY, so restoration is impossible and third-party rights have intervened. Ferrers is confined to DAMAGES for misrepresentation." },
            { label: "Advise on (d) the unpriced building work", detail: "QUANTUM MERUIT — a reasonable sum for the work actually done. No price was agreed, so there is no contractual sum to sue for, and the claim is restitutionary: Ockley recovers the value of the benefit conferred, not an expected profit." },
            { label: "State the common thread", detail: "Each of the first three turns on a DIFFERENT bar: adequacy of damages in (a), personal service in (b), and third-party rights in (c). Naming the bar is what earns the mark, not naming the remedy." },
          ],
          result:
            "**Specific performance**, an **injunction**, **damages** (rescission being barred), and **quantum meruit** — four different answers, each decided by the limit that applies rather than by the merits of the complaint.",
        },
      ],
      check: {
        q: "An employee leaves mid-contract to join a competitor. What can the former employer realistically obtain?",
        options: [
          "Specific performance compelling the employee to return to work",
          "A prohibitory injunction restraining work for the competitor, if a reasonable restraint clause exists",
          "Rescission of the employment contract",
          "Rectification of the contract to extend its term",
        ],
        correct: 1,
        explain:
          "A PROHIBITORY INJUNCTION, provided a REASONABLE restraint of trade clause exists. Specific performance is never granted for a CONTRACT OF PERSONAL SERVICE, since it would amount to compulsory labour. The injunction must not in practice leave the employee unable to earn a living, or equity will refuse it as indirect compulsion.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Granting specific performance for ordinary goods.",
      fix: "Damages are adequate where a substitute can be bought. Specific performance is for land and genuinely unique goods.",
    },
    {
      trap: "Ordering specific performance of an employment contract.",
      fix: "Never available for personal service. Consider a prohibitory injunction on a reasonable restraint clause instead.",
    },
    {
      trap: "Awarding rescission after a third party has acquired rights.",
      fix: "Rescission is barred by affirmation, delay, impossibility of restoration, and intervening third-party rights.",
    },
    {
      trap: "Using rectification to improve a bad bargain.",
      fix: "It corrects a document that misrecords the actual common intention — nothing more.",
    },
    {
      trap: "Treating an equitable remedy as available as of right.",
      fix: "All are DISCRETIONARY, and subject to adequacy of damages, laches and clean hands.",
    },
  ],
  keyTerms: [
    { term: "Specific performance", def: "An order to perform a contractual obligation, granted only where damages are inadequate." },
    { term: "Prohibitory injunction", def: "An order restraining a party from acting, such as breaching a restraint of trade clause." },
    { term: "Mandatory injunction", def: "An order requiring a party to undo something already done; granted sparingly." },
    { term: "Rescission", def: "Setting a contract aside and restoring the pre-contract position; the usual remedy for misrepresentation." },
    { term: "Rectification", def: "Correction of a written document that fails to record the parties' actual common intention." },
    { term: "Quantum meruit", def: "A reasonable sum for work actually done, where no price was agreed or the contract is unenforceable." },
    { term: "Laches", def: "Unreasonable delay, which bars an equitable remedy." },
  ],
  summary: [
    "Equitable remedies are discretionary and refused where damages are adequate, after delay, or without clean hands.",
    "Specific performance suits land and unique goods, and is never granted for contracts of personal service.",
    "A prohibitory injunction can restrain competition where a reasonable restraint clause exists.",
    "Rescission is barred by affirmation, delay, impossible restoration, or intervening third-party rights.",
    "Rectification corrects a misrecorded agreement; quantum meruit pays a reasonable sum for work done.",
  ],
  knowledgeDiagnostic: [
    { q: "When is specific performance available?", a: "Where damages would be inadequate — typically for land or genuinely unique goods — and not for personal service or where constant supervision would be needed." },
    { q: "Name the four bars to rescission.", a: "Affirmation of the contract, unreasonable delay, impossibility of restoring the parties, and the intervention of third-party rights." },
    { q: "How can an employer restrain a departing employee?", a: "By a prohibitory injunction on a reasonable restraint of trade clause — not by specific performance, which is never ordered for personal service." },
    { q: "What does quantum meruit give?", a: "A reasonable sum for the value of work actually done, where no price was agreed or the contract is unenforceable." },
  ],
}

export const LWE_TREE_AREA_B_PART5: StudyChapter[] = [LWE_TREE_17, LWE_TREE_18]
