import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area B, fourth part — discharge, breach and remedies.
 * Chapters 15–18 of the LW-ENG reading tree, mapped to syllabus group B3.
 *
 * Chapter 13 built the classification of terms; this part spends it. The order is
 * deliberate: how a contract ENDS (15), what a breach entitles you to DO (16), how
 * damages are MEASURED (17), and what equity adds when damages are inadequate (18).
 * Remoteness and mitigation live in 17 rather than 16, because they are rules about
 * quantifying loss rather than about the right to a remedy.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Case names are citations for a
 * proposition, never a source of prose.
 */

/* ── Chapter 15 · B3(a) ────────────────────────────────────────── */

export const LWE_TREE_15: StudyChapter = {
  id: "LWE-15",
  number: 15,
  paper: "LW",
  area: "B",
  title: "Discharge of a contract",
  minutes: 16,
  syllabusRefs: ["B3(a)"],
  intro:
    "Most contracts end because both sides did what they promised. The interesting cases are the other four routes — and frustration is the one that decides who bears a loss neither party caused.",
  outcomes: [
    "List the ways a contract may be discharged",
    "Explain the rule on complete performance and the exceptions to it",
    "Explain discharge by agreement, and the need for consideration or a deed",
    "Explain frustration, identify what does not frustrate a contract, and state its effects",
    "Decide how a contract was discharged on given facts",
  ],
  sections: [
    {
      id: "performance-agreement",
      heading: "Performance, and agreement",
      blocks: [
        {
          kind: "table",
          caption: "The four routes to discharge",
          head: ["Route", "How it works"],
          rows: [
            ["**Performance**", "Both parties do what they promised. The general rule is that performance must be **complete and exact**"],
            ["**Agreement**", "The parties agree to release each other — but the release needs **consideration**, or must be by **deed**"],
            ["**Frustration**", "An outside event, the fault of neither party, makes performance **impossible or radically different**"],
            ["**Breach**", "A breach of condition, or a sufficiently serious breach of an innominate term, entitles the injured party to **terminate** (chapter 16)"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Performance must be complete — and the exceptions matter more than the rule",
          md: "The strict rule is that a party who performs only part of their obligation is entitled to **nothing**, which can be harsh where substantial work has been done. Five exceptions soften it: a **divisible** contract, where each severable part is paid for as completed; **substantial performance**, where the price is recoverable less the cost of putting the defects right; **acceptance of partial performance**, where the other party freely accepts the benefit and must pay a reasonable sum; **prevention of performance** by the other party, which allows a claim for work done; and a **tender of performance** properly made but refused, which discharges the tendering party.",
        },
        {
          kind: "list",
          title: "Discharge by agreement",
          items: [
            "**Bilateral discharge** — both parties still have obligations outstanding, so each gives up something and there is consideration on both sides.",
            "**Unilateral discharge** — only one party has obligations left, so the release is a gift of a promise and needs **consideration** (accord and satisfaction) or a **deed** (chapter 11).",
            "**A condition in the contract itself** may provide for discharge on a stated event, such as a termination clause or a fixed expiry date.",
            "**Novation** substitutes a new contract, or a new party, for the old one.",
          ],
        },
      ],
      check: {
        q: "A builder has completed a contract except for minor defects costing £900 to remedy, against a price of £60,000. What can the builder recover?",
        options: [
          "Nothing, because performance must be complete and exact",
          "The £60,000 price less the £900 cost of remedying the defects, under substantial performance",
          "A reasonable sum for the work done, at the client's discretion",
          "£900 only",
        ],
        correct: 1,
        explain:
          "The PRICE LESS THE COST OF REMEDY — £59,100 — under the SUBSTANTIAL PERFORMANCE exception. The strict rule requires complete and exact performance, but where performance is substantial and only minor defects remain the price is recoverable subject to a deduction for putting them right.",
      },
    },
    {
      id: "frustration",
      heading: "Frustration",
      blocks: [
        {
          kind: "definition",
          term: "Frustration",
          md: "A contract is frustrated where, **after formation** and **without the fault of either party**, an event occurs that makes performance **impossible, illegal, or radically different** from what was undertaken. The contract is **automatically terminated from the moment of the frustrating event** — neither party chooses it, and neither is in breach.",
        },
        {
          kind: "table",
          caption: "What frustrates, and what does not",
          head: ["Frustrating", "NOT frustrating"],
          rows: [
            ["**Destruction of the subject matter** — the hall to be hired burns down", "**Self-induced** impossibility — a party's own act or default caused it"],
            ["**Subsequent illegality** — a change in the law makes performance unlawful", "The contract has become **more expensive** or less profitable"],
            ["**Death or incapacity**, where personal performance was required", "The contract has become **more onerous or difficult** to perform"],
            ["**Non-occurrence of the event** that was the whole basis of the contract", "An event the contract **expressly provided for**, in a force majeure clause"],
            ["**Government intervention** or requisition preventing performance", "An event that was **foreseeable** and that the party took the risk of"],
            ["**Unavailability** for so long that performance would be radically different", "Merely **one method** of performance becoming unavailable, where another remains"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Hardship is not frustration",
          md: "This is the trap the syllabus keeps returning to. A contract that has become **much more expensive**, or much harder, is **not** frustrated — the party bears the loss and must still perform, because frustration requires performance to be impossible or **radically different in kind**, not merely worse in degree. A supplier facing a tripled raw-material price has no frustration argument; a supplier whose factory has been requisitioned does.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The effects, and what statute changed",
          md: "At common law the contract ends **from the frustrating event** — it is not void from the beginning, so obligations already accrued stand. That produced arbitrary results, because a party who had paid in advance could recover only on a total failure of consideration, and a party who had done work could recover nothing. The **Law Reform (Frustrated Contracts) Act 1943** provides the adjustment: **sums paid before** the event may be **recovered**, **sums payable** cease to be payable, and a party who has incurred **expenses** or conferred a **valuable benefit** before the event may be allowed a just sum for it. So the modern answer is: contract ends prospectively, then adjust under the 1943 Act.",
        },
        {
          kind: "example",
          title: "Distinguishing frustration from hardship",
          scenario:
            "Camberhill Events contracts with Loxley Hall to hire the Hall on 3 July for a trade exhibition, paying a £12,000 deposit of the £30,000 fee. Loxley Hall spends £4,000 building bespoke display stands. Consider four separate developments: (a) the Hall is destroyed by fire on 20 June; (b) a new statutory instrument prohibits indoor gatherings of that size from 1 July; (c) Camberhill's costs rise sharply because its exhibitors withdraw, making the event unprofitable; (d) the Hall's caretaker, whose personal supervision the contract required, negligently starts the fire.",
          steps: [
            { label: "Test (a) destruction of the subject matter", detail: "The very thing contracted for no longer exists, so performance is IMPOSSIBLE. The contract is FRUSTRATED and automatically terminated from 20 June. Neither party is in breach." },
            { label: "Adjust (a) under the 1943 Act", detail: "Camberhill may RECOVER the £12,000 deposit, and the £18,000 balance ceases to be payable. But Loxley may be allowed a just sum for the £4,000 of EXPENSES incurred before the frustrating event, so Camberhill is unlikely to get the whole deposit back." },
            { label: "Test (b) subsequent illegality", detail: "A change in the law making performance UNLAWFUL frustrates the contract. Same analysis and the same 1943 Act adjustment as (a)." },
            { label: "Test (c) unprofitability", detail: "NOT FRUSTRATED. The contract has become less profitable, which is hardship, not impossibility, and performance is not radically different in kind. Camberhill must pay the full £30,000 or be in breach — and cannot recover its deposit." },
            { label: "Test (d) self-induced", detail: "The fire was caused by the NEGLIGENCE of Loxley's own caretaker, so the impossibility is SELF-INDUCED. Loxley cannot rely on frustration; it is in BREACH, and Camberhill recovers its deposit and damages for its wasted expenditure and lost profit." },
          ],
          result:
            "Two frustrations, one hardship, one breach — from a single set of facts. The two decisive questions are always **whose fault was it** and **is performance impossible or merely worse**.",
        },
      ],
      check: {
        q: "A supplier's raw material costs treble, making a fixed-price contract heavily loss-making. Is the contract frustrated?",
        options: [
          "Yes, because performance has become commercially impossible",
          "No — increased expense is hardship, not frustration, and the supplier must still perform",
          "Yes, if the price rise was unforeseeable",
          "Only if the supplier gives notice before performance falls due",
        ],
        correct: 1,
        explain:
          "NO. Frustration requires performance to be IMPOSSIBLE, ILLEGAL or RADICALLY DIFFERENT in kind — not merely more expensive or more onerous. The supplier bears the loss and must perform, or be in breach. Protection against price movements has to come from a price-variation or force majeure clause in the contract.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a contract that has become expensive or difficult as frustrated.",
      fix: "Hardship is not frustration. Performance must be impossible, illegal or radically different in kind.",
    },
    {
      trap: "Allowing a party to rely on frustration it caused.",
      fix: "Self-induced impossibility is not frustration — that party is in breach.",
    },
    {
      trap: "Saying a frustrated contract is void from the beginning.",
      fix: "It ends from the frustrating event, and the 1943 Act then adjusts payments, expenses and benefits.",
    },
    {
      trap: "Awarding nothing for part performance.",
      fix: "Check the exceptions: divisible obligations, substantial performance, accepted partial performance, prevention, and tender refused.",
    },
    {
      trap: "Applying frustration where a force majeure clause covers the event.",
      fix: "An event the contract expressly provided for does not frustrate it — the clause governs.",
    },
  ],
  keyTerms: [
    { term: "Frustration", def: "Termination by an outside event, after formation and without either party's fault, making performance impossible, illegal or radically different." },
    { term: "Substantial performance", def: "An exception allowing recovery of the price less the cost of remedying minor defects." },
    { term: "Divisible contract", def: "A contract whose obligations are severable, so each completed part earns its own payment." },
    { term: "Self-induced frustration", def: "Impossibility caused by a party's own act or default; it is a breach, not frustration." },
    { term: "Law Reform (Frustrated Contracts) Act 1943", def: "Allows recovery of sums paid, ends sums payable, and permits a just sum for expenses or benefits conferred before the frustrating event." },
    { term: "Force majeure clause", def: "A term providing for specified disruptive events, which displaces frustration for those events." },
  ],
  summary: [
    "A contract is discharged by performance, agreement, frustration or breach.",
    "Performance must be complete and exact, subject to five exceptions including substantial performance.",
    "A unilateral release needs consideration or a deed.",
    "Frustration requires impossibility, illegality or radical difference — never mere hardship — and must not be self-induced.",
    "A frustrated contract ends from the frustrating event, with adjustment under the 1943 Act.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five exceptions to complete performance.", a: "Divisible obligations, substantial performance, accepted partial performance, prevention of performance by the other party, and a tender of performance refused." },
    { q: "Why is increased cost not frustration?", a: "Because frustration requires performance to be impossible, illegal or radically different in kind, not simply more expensive or onerous." },
    { q: "From when does a frustrated contract end?", a: "From the moment of the frustrating event, prospectively — it is not void from the beginning." },
    { q: "What does the 1943 Act allow?", a: "Recovery of sums already paid, cesser of sums payable, and a just sum for expenses incurred or a valuable benefit conferred before the event." },
  ],
}

/* ── Chapter 16 · B3(b) ────────────────────────────────────────── */

export const LWE_TREE_16: StudyChapter = {
  id: "LWE-16",
  number: 16,
  paper: "LW",
  area: "B",
  title: "Breach of contract and the common law remedies",
  minutes: 15,
  syllabusRefs: ["B3(b)"],
  intro:
    "Breach always gives damages. Whether it also lets the injured party walk away depends entirely on the classification of the term broken — which is why chapter 13 comes before this one.",
  outcomes: [
    "Identify the forms a breach may take, including anticipatory breach",
    "State when the injured party may terminate, and when they are confined to damages",
    "Explain the election open to a party facing anticipatory breach, and its risk",
    "Distinguish a liquidated damages clause from a penalty",
    "Decide what an injured party may do about a given breach",
  ],
  sections: [
    {
      id: "forms-and-election",
      heading: "The forms of breach, and the right to terminate",
      blocks: [
        {
          kind: "list",
          title: "How a contract may be broken",
          items: [
            "**Non-performance** — failing to perform at all.",
            "**Defective performance** — performing, but not to the standard the contract required.",
            "**Late performance**, where time was of the essence or lateness has serious consequences.",
            "**Incapacitating oneself** from performing.",
            "**Anticipatory breach** — declaring in advance, by words or conduct, that one will not perform.",
          ],
        },
        {
          kind: "table",
          caption: "What the injured party may do",
          head: ["Term broken", "Damages", "Terminate?"],
          rows: [
            ["**Condition**", "Yes", "**Yes** — may treat the contract as at an end and refuse further performance"],
            ["**Warranty**", "Yes", "**No** — must continue to perform"],
            ["**Innominate term**, serious consequences", "Yes", "**Yes**"],
            ["**Innominate term**, trivial consequences", "Yes", "**No**"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Termination is a choice, and getting it wrong is expensive",
          md: "Even where the injured party is **entitled** to terminate, they need not: they may **affirm** the contract and claim damages instead. But the choice cuts both ways. A party who terminates when they were **not** entitled to — because the term was a warranty, or the breach of an innominate term was trivial — is itself in **repudiatory breach**, and becomes the defendant. That is why the safe answer in a marginal case is to perform and sue for damages.",
        },
        {
          kind: "definition",
          term: "Anticipatory breach",
          md: "Where a party makes clear, **before performance is due**, that it will not perform. The injured party has an **election**: sue **immediately**, without waiting for the date of performance; or **affirm** the contract, wait for the performance date, and sue then.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The risk in waiting",
          md: "Affirming and waiting can be attractive — the other party may change its mind, and the loss may be easier to quantify at the due date. But it carries a real danger: if the contract is **frustrated** in the meantime (chapter 15), both parties are discharged and the injured party **loses its claim entirely**. Suing immediately avoids that. Scenarios that mention an intervening event are testing exactly this.",
        },
      ],
      check: {
        q: "A buyer tells a seller in advance that it will not accept delivery. What are the seller's options?",
        options: [
          "It must wait until the delivery date before it can sue",
          "It may sue immediately, or affirm and wait — but waiting risks losing the claim if the contract is later frustrated",
          "It must terminate immediately or lose the right to damages",
          "It may only claim the deposit",
        ],
        correct: 1,
        explain:
          "It has an ELECTION: sue at once on the anticipatory breach, or affirm and wait for the performance date. Waiting is riskier — if the contract is FRUSTRATED in the meantime both parties are discharged and the seller loses its claim altogether.",
      },
    },
    {
      id: "liquidated-damages",
      heading: "Liquidated damages and penalties",
      blocks: [
        {
          kind: "table",
          caption: "The distinction, and why it matters",
          head: ["", "Liquidated damages clause", "Penalty clause"],
          rows: [
            ["**What it is**", "A genuine **pre-estimate** of the loss likely to flow from breach, agreed in advance", "A sum fixed to **deter** breach, out of all proportion to any legitimate interest"],
            ["**Enforceable?**", "**Yes** — the agreed sum is recoverable, and neither party may go behind it", "**No** — struck down, leaving the injured party to prove its actual loss"],
            ["**Practical effect**", "Certainty: recoverable even if the actual loss turns out **smaller**", "Uncertainty: the injured party must prove loss in the ordinary way"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The commercial advantage of a valid clause",
          md: "A genuine liquidated damages clause is recoverable **even if the actual loss proves to be less** — that is the whole point of agreeing it, and it saves both sides the cost of proving loss. Conversely it **caps** recovery, so an injured party whose real loss exceeds the agreed figure is confined to it. So the clause allocates risk in both directions, and a party who wants more than the agreed sum must attack its own clause as a penalty, which rarely succeeds.",
        },
        {
          kind: "example",
          title: "Deciding termination and testing a clause",
          scenario:
            "Marlbury Ltd contracts with Denhurst Systems to install a warehouse management system by 1 October, the contract stating that time of delivery is a condition. It also provides for \"liquidated damages of £2,000 for each week of delay\", Marlbury's genuine estimate of the additional agency staffing a delay would require. On 20 August Denhurst emails that it will not be able to do the work at all. Marlbury waits, hoping Denhurst will relent. On 25 September Denhurst's premises are destroyed by an earthquake. The system is delivered by nobody, and Marlbury's actual staffing cost turns out to be £1,200 a week.",
          steps: [
            { label: "Identify the breach on 20 August", detail: "A clear statement before performance is due that it will not perform is an ANTICIPATORY BREACH. Marlbury could have sued immediately." },
            { label: "Evaluate Marlbury's decision to wait", detail: "Marlbury AFFIRMED and waited. That was its right, but it took the risk of an intervening event." },
            { label: "Apply the intervening event", detail: "The earthquake destroying Denhurst's premises after affirmation but before the performance date FRUSTRATES the contract — an outside event, neither party's fault, making performance impossible. The contract is automatically discharged from 25 September." },
            { label: "State the consequence of frustration", detail: "Because Marlbury affirmed rather than suing, BOTH parties are discharged and Marlbury LOSES ITS CLAIM. Had it sued on 20 August its right to damages would already have accrued. This is the risk of waiting, and it has crystallised." },
            { label: "Test the liquidated damages clause anyway", detail: "The clause is a GENUINE PRE-ESTIMATE of staffing cost, not a deterrent out of proportion to a legitimate interest, so it is a valid LIQUIDATED DAMAGES clause rather than a penalty — and it would have been recoverable at £2,000 a week even though actual loss was only £1,200. But it is academic: frustration has removed the claim." },
          ],
          result:
            "Marlbury recovers **nothing**, because affirming an anticipatory breach left it exposed to the frustrating event. The valid clause would have paid **£2,000 a week rather than the actual £1,200** — which shows both why such clauses are worth having and why the election on anticipatory breach must be taken carefully.",
        },
      ],
      check: {
        q: "A contract fixes damages at £5,000 per week of delay as a genuine pre-estimate. The actual loss proves to be £3,000 per week. What is recoverable?",
        options: [
          "£3,000 per week, being the actual loss",
          "£5,000 per week — a valid liquidated damages clause is recoverable even if the actual loss is smaller",
          "Nothing, since the clause overstates the loss and is therefore a penalty",
          "£5,000 per week, but only if the injured party proves the loss",
        ],
        correct: 1,
        explain:
          "£5,000 PER WEEK. A genuine pre-estimate is a valid LIQUIDATED DAMAGES clause, and the agreed sum is recoverable without proof of loss and even where the actual loss turns out smaller — that certainty is the purpose of the clause. It becomes a PENALTY only if fixed to deter breach and out of all proportion to any legitimate interest.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Allowing termination for any breach.",
      fix: "Only breach of a condition, or a serious breach of an innominate term, permits termination. Warranty gives damages only.",
    },
    {
      trap: "Terminating in a marginal case without considering the risk.",
      fix: "Wrongful termination is itself a repudiatory breach. In a marginal case, perform and sue for damages.",
    },
    {
      trap: "Assuming an injured party must wait for the performance date.",
      fix: "Anticipatory breach can be sued on immediately — and waiting risks losing the claim to a later frustration.",
    },
    {
      trap: "Reducing a liquidated damages clause to the actual loss.",
      fix: "A valid clause is recoverable as agreed, higher or lower than the actual loss.",
    },
  ],
  keyTerms: [
    { term: "Repudiatory breach", def: "A breach entitling the injured party to treat the contract as at an end." },
    { term: "Anticipatory breach", def: "A declaration before performance is due that a party will not perform, giving the injured party an immediate right to sue." },
    { term: "Affirmation", def: "Choosing to keep the contract alive despite a repudiatory breach, and claim damages instead." },
    { term: "Liquidated damages clause", def: "An agreed genuine pre-estimate of loss, recoverable as agreed without proof of actual loss." },
    { term: "Penalty clause", def: "A sum fixed to deter breach and out of proportion to any legitimate interest; unenforceable." },
  ],
  summary: [
    "Breach may be non-performance, defective or late performance, self-incapacitation, or anticipatory.",
    "Damages always follow; termination requires breach of a condition or a serious breach of an innominate term.",
    "Wrongful termination is itself a repudiatory breach, so a marginal case calls for performance and a damages claim.",
    "Anticipatory breach may be sued on at once; affirming and waiting risks losing the claim to frustration.",
    "A genuine pre-estimate is enforceable as agreed; a deterrent sum is a penalty and is struck down.",
  ],
  knowledgeDiagnostic: [
    { q: "When may an injured party terminate?", a: "For breach of a condition, or a breach of an innominate term whose consequences deprive them of substantially the whole benefit of the contract." },
    { q: "What is the risk in affirming an anticipatory breach?", a: "If the contract is frustrated before the performance date, both parties are discharged and the injured party loses its claim." },
    { q: "Distinguish liquidated damages from a penalty.", a: "Liquidated damages are a genuine pre-estimate of loss and are enforceable as agreed; a penalty is a deterrent out of proportion to any legitimate interest and is void." },
    { q: "What happens if a party terminates when not entitled to?", a: "It is itself in repudiatory breach and becomes liable to the other party." },
  ],
}

export const LWE_TREE_AREA_B_PART4: StudyChapter[] = [LWE_TREE_15, LWE_TREE_16]
