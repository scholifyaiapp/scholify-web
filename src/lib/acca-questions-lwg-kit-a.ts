import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-GLOBAL · Area A question kit — chapters 1 to 5.
 *
 * Legal systems and the separation of powers, the three legal traditions, conflict of
 * laws and the institutions of world trade, dispute resolution, and international
 * commercial arbitration under the UNCITRAL Model Law.
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 1 · Law, politics and the separation of powers ─────── */

const CH01: AccaQuestion[] = [
  q1("LWGK-01-01", "LWG-01", "A", "easy",
    "Which branch of state INTERPRETS and applies the law?",
    ["The legislature", "The executive", "The judiciary", "The civil service"],
    2,
    "The JUDICIARY interprets and applies the law and resolves disputes about it. The legislature makes law and the executive implements it."),

  q1("LWGK-01-02", "LWG-01", "A", "easy",
    "Who brings criminal proceedings?",
    ["The victim of the offence", "The state, through a prosecutor", "The judiciary", "Any interested member of the public"],
    1,
    "The STATE prosecutes, through a prosecutor. That is why the victim cannot decide to drop the case or settle it, which distinguishes criminal from civil proceedings."),

  q1("LWGK-01-03", "LWG-01", "A", "easy",
    "What is the standard of proof in civil proceedings?",
    ["Beyond reasonable doubt", "On the balance of probabilities", "Absolute certainty", "Whatever the parties agree"],
    1,
    "ON THE BALANCE OF PROBABILITIES — more likely than not. Beyond reasonable doubt is the higher, criminal standard."),

  q1("LWGK-01-04", "LWG-01", "A", "medium",
    "A minister makes detailed regulations under a power granted by an Act. This is best described as:",
    ["A breach of the separation of powers", "Delegated legislation by the executive", "A judicial act", "An ultra vires act by definition"],
    1,
    "DELEGATED LEGISLATION: the executive making detailed rules under authority the legislature granted. Every real system permits it; the safeguard is that a court may review whether the regulation exceeded the power conferred."),

  q2("LWGK-01-05", "LWG-01", "A", "medium",
    "A director is acquitted of theft from her company because the prosecution cannot exclude a reasonable doubt. The company wants its money back. What is the position?",
    [
      "The acquittal defeats any civil claim on the same facts",
      "The company may still succeed civilly, needing only to prove its case on the balance of probabilities",
      "The company must wait for a retrial",
      "The company can recover only if it was the prosecutor",
    ],
    1,
    "The civil claim survives. It needs only the BALANCE OF PROBABILITIES, so the same evidence that left a reasonable doubt in the criminal court may comfortably tip the civil balance. Different parties, different standard, independent outcomes."),

  q2("LWGK-01-06", "LWG-01", "A", "medium",
    "Which outcome is characteristic of CIVIL rather than criminal proceedings?",
    [
      "A fine payable to the state",
      "An order that the defendant pay damages to the claimant",
      "Imprisonment",
      "A criminal record",
    ],
    1,
    "DAMAGES payable to the CLAIMANT. Civil law compensates the wronged party; criminal law punishes, and a fine goes to the state. Distinguishing purpose is what distinguishes the two systems."),

  q2("LWGK-01-07", "LWG-01", "A", "hard",
    "A company challenges a ministry's refusal of an import licence. What will the court decide?",
    [
      "Whether requiring import licences is good policy",
      "Whether the ministry acted within the power the legislature granted and followed a fair procedure",
      "Whether the company deserves a licence on commercial grounds",
      "Whether the legislature should repeal the licensing Act",
    ],
    1,
    "Whether the executive stayed WITHIN ITS POWER and acted fairly. Whether licensing is good policy is the legislature's business, and the merits of the commercial case are the ministry's — that boundary is exactly what the separation of powers draws."),

  q2("LWGK-01-08", "LWG-01", "A", "medium",
    "Why is legal certainty described as an economic asset rather than an administrative cost?",
    [
      "Because courts generate fee income for the state",
      "Because capital flows to jurisdictions where rules are predictable and courts independent",
      "Because litigation increases economic activity",
      "Because legislation is cheaper than regulation",
    ],
    1,
    "Because investors will commit capital where contracts are enforceable and outcomes predictable. Legal certainty reduces the risk premium on every transaction, which is why the legal, political and economic systems are interdependent rather than merely coexisting."),

  q1("LWGK-01-09", "LWG-01", "A", "medium",
    "What is the practical core of the separation of powers?",
    [
      "That ministers may not sit in the legislature",
      "Judicial independence",
      "That the executive cannot make any rules",
      "That the legislature cannot be dissolved",
    ],
    1,
    "JUDICIAL INDEPENDENCE — judges must be able to decide against the government without risk to their position. Ministers sitting in the legislature and executive rule-making are universal, and neither destroys the doctrine."),

  multi2("LWGK-01-10", "LWG-01", "A", "hard",
    "Which TWO statements about criminal and civil law are correct?",
    [
      "The same facts may give rise to both a prosecution and a civil claim",
      "A civil claimant must prove the case beyond reasonable doubt",
      "The victim of a crime may settle the prosecution with the accused",
      "A fine is paid to the state, while damages are paid to the claimant",
    ],
    [0, 3],
    "The same facts CAN produce both, independently — and a FINE goes to the state while DAMAGES go to the claimant. A civil claimant needs only the balance of probabilities, and the victim cannot settle a prosecution because the decision to prosecute belongs to the state."),
]

/* ── Chapter 2 · Common law, civil law and Sharia traditions ────── */

const CH02: AccaQuestion[] = [
  q1("LWGK-02-01", "LWG-02", "A", "easy",
    "In a common law system, which part of a judgment binds later courts?",
    ["The whole judgment", "The ratio decidendi", "The obiter dicta", "The headnote"],
    1,
    "The RATIO DECIDENDI — the legal reasoning essential to the decision. Obiter dicta, remarks made in passing, are persuasive only."),

  q1("LWGK-02-02", "LWG-02", "A", "easy",
    "What is the primary source of law in a civil law system?",
    ["Binding judicial precedent", "A comprehensive enacted code", "Custom recorded by professional bodies", "Arbitral awards"],
    1,
    "A comprehensive enacted CODE. Earlier judgments show how the code has been understood but are persuasive rather than binding — that is the defining contrast with a common law system."),

  q1("LWGK-02-03", "LWG-02", "A", "easy",
    "Which is prohibited under Sharia principles in a commercial context?",
    ["Profit from trade", "Riba (interest)", "Partnership", "Leasing"],
    1,
    "RIBA — interest. Profit from genuine trade and risk-sharing is permitted, which is why compliant finance is structured through sale, lease or partnership rather than lending at interest."),

  q1("LWGK-02-04", "LWG-02", "A", "medium",
    "How may a common law court avoid following an apparently binding precedent?",
    [
      "By ignoring it, since precedent is only persuasive",
      "By distinguishing it on a material factual difference",
      "By asking the legislature to repeal it",
      "By referring it to arbitration",
    ],
    1,
    "By DISTINGUISHING it — identifying a material factual difference so that the earlier ratio does not apply. Precedent is binding, not merely persuasive, so it cannot simply be ignored."),

  q2("LWGK-02-05", "LWG-02", "A", "medium",
    "A supply contract is silent on what happens if a port closure prevents delivery. Which is more likely to supply an answer?",
    [
      "A common law system, because judges may create a new remedy",
      "A civil law system, because the code is likely to contain a general provision on impossibility or changed circumstances",
      "Neither system can assist",
      "Only an arbitral tribunal could decide",
    ],
    1,
    "A CIVIL LAW system: the code is likely to fill the gap with a general provision the parties never wrote. Under common law the starting point is the bargain as made, which is precisely why common-law-drafted contracts carry long force majeure clauses."),

  q2("LWGK-02-06", "LWG-02", "A", "medium",
    "Which statement about the two traditions is correct?",
    [
      "Common law systems have no legislation",
      "Civil law judges never consider earlier decisions",
      "Both use legislation and case law; they differ over which is authoritative in a conflict and whether earlier decisions bind",
      "The traditions produce identical outcomes in practice",
    ],
    2,
    "Both use both. The distinction is which source is AUTHORITATIVE when they conflict, and whether earlier decisions BIND. Claiming civil law ignores case law, or that common law has no statute, overstates the divide and loses the mark."),

  q2("LWGK-02-07", "LWG-02", "A", "hard",
    "A lender in a common law jurisdiction proposes an interest-bearing loan to a borrower in a Sharia jurisdiction. What is the practical consequence?",
    [
      "The loan is unenforceable everywhere",
      "The transaction may need restructuring as a sale, lease or partnership to be enforceable in the borrower's jurisdiction",
      "Sharia principles prohibit any commercial return, so no deal is possible",
      "The governing law clause makes the point irrelevant",
    ],
    1,
    "It may need RESTRUCTURING. Sharia prohibits riba, not profit, so compliant structures use sale, lease or partnership. A governing law clause does not make the point irrelevant, because enforcement will be sought where the borrower's assets are."),

  q1("LWGK-02-08", "LWG-02", "A", "medium",
    "Which is a source of Sharia law?",
    ["Binding precedent of senior courts", "The Qur'an and the Sunna", "A comprehensive civil code", "Model laws prepared by UNCITRAL"],
    1,
    "The QUR'AN and the SUNNA, developed through scholarly reasoning and consensus. Precedent belongs to common law, codes to civil law, and model laws are instruments states may enact."),

  q2("LWGK-02-09", "LWG-02", "A", "medium",
    "Why do contracts drafted under common law tend to be longer than those drafted under civil law?",
    [
      "Common law requires a prescribed form",
      "There is no code to fill gaps, so the parties must provide for contingencies themselves",
      "Civil law prohibits detailed drafting",
      "Common law contracts must be notarised",
    ],
    1,
    "There is NO CODE to fill the gaps. Civil law supplies general provisions the parties can rely on; common law starts from the bargain as made, so the parties must anticipate the contingencies expressly."),

  multi2("LWGK-02-10", "LWG-02", "A", "hard",
    "Which TWO features characterise a common law system?",
    [
      "Judicial decisions of superior courts bind lower courts",
      "Earlier judgments are persuasive only",
      "Reasoning proceeds by analogy with decided cases",
      "The law develops principally by amending a code",
    ],
    [0, 2],
    "Superior courts' decisions BIND, and reasoning is ANALOGICAL — is this case like or unlike a decided one. Persuasive-only judgments and development by amending a code are the civil law pattern."),
]

/* ── Chapter 3 · Conflict of laws and the institutions ──────────── */

const CH03: AccaQuestion[] = [
  q1("LWGK-03-01", "LWG-03", "A", "easy",
    "Which body administers the multilateral trade agreements and resolves trade disputes between STATES?",
    ["UNCITRAL", "The WTO", "The ICC", "UNIDROIT"],
    1,
    "The WTO. It handles complaints between member states about trade measures — never private commercial claims, which go to arbitration or a national court."),

  q1("LWGK-03-02", "LWG-03", "A", "easy",
    "Which organisation produces the Incoterms?",
    ["UNCITRAL", "The International Chamber of Commerce", "The WTO", "The OECD"],
    1,
    "The ICC — a BUSINESS organisation, not a state body. That is why Incoterms bind only because the parties incorporate them into their contract."),

  q1("LWGK-03-03", "LWG-03", "A", "medium",
    "What makes a model law binding in a particular state?",
    [
      "Its adoption by UNCITRAL",
      "That the state has enacted it",
      "Ratification by a majority of states",
      "Incorporation by the parties into their contract",
    ],
    1,
    "That the STATE HAS ENACTED it — and states may modify the text, so the result is harmonisation rather than uniformity. UNCITRAL drafts but cannot impose."),

  q1("LWGK-03-04", "LWG-03", "A", "medium",
    "Which of these is NOT a question answered by conflict of laws?",
    [
      "Which country's courts may hear the dispute",
      "Whose substantive law governs the parties' rights",
      "Whether a judgment can be enforced where the assets are",
      "Whether the contract represents good commercial value",
    ],
    3,
    "Commercial value is not a legal question at all. Conflict of laws answers JURISDICTION, APPLICABLE LAW and RECOGNITION AND ENFORCEMENT — three separate questions a well-drafted contract settles in advance."),

  q2("LWGK-03-05", "LWG-03", "A", "medium",
    "A contract between parties in different states contains a governing law clause but no jurisdiction or arbitration clause. What remains uncertain?",
    [
      "Nothing — the governing law clause settles everything",
      "Which courts may hear a dispute, and whether a resulting judgment will be enforceable where the assets are",
      "Only the language of any proceedings",
      "Whether the contract was validly formed",
    ],
    1,
    "FORUM and ENFORCEMENT remain open. A governing law clause settles which law applies, not which court decides or whether its judgment travels — which is why arbitration is attractive, since awards enforce far more widely than judgments."),

  q2("LWGK-03-06", "LWG-03", "A", "medium",
    "An exporter is owed money by a foreign buyer. Which forum can resolve the dispute?",
    [
      "The WTO, as it concerns international trade",
      "Arbitration or a competent national court, according to the contract's dispute clause",
      "UNCITRAL, as author of the applicable convention",
      "The OECD, under its guidance on multinational conduct",
    ],
    1,
    "Whichever forum the CONTRACT provides for. The WTO resolves disputes between STATES about trade measures; UNCITRAL drafts instruments but decides nothing; the OECD issues guidance and does not adjudicate."),

  q2("LWGK-03-07", "LWG-03", "A", "hard",
    "A sale is governed by the CISG, uses CIF terms, and provides for arbitration under a national law based on the UNCITRAL Model Law. What makes each instrument binding?",
    [
      "All three bind because UNCITRAL and the ICC published them",
      "The CISG because the states ratified it, CIF because the parties adopted it, and the arbitration law because that state enacted it",
      "All three bind only because the parties incorporated them",
      "None binds unless expressly restated in the contract",
    ],
    1,
    "Three different sources of authority: a CONVENTION binds because states ratified it; INCOTERMS bind because the parties adopted them; a MODEL LAW binds because a state enacted it. Asking what makes an instrument binding on these parties is the reliable route through any question of this shape."),

  q1("LWGK-03-08", "LWG-03", "A", "medium",
    "Which UNCITRAL instrument governs international commercial arbitration?",
    [
      "The CISG",
      "The Model Law on International Commercial Arbitration",
      "The Principles of International Commercial Contracts",
      "The Incoterms",
    ],
    1,
    "The MODEL LAW ON INTERNATIONAL COMMERCIAL ARBITRATION. The CISG governs international sales, the Principles are UNIDROIT's, and Incoterms are the ICC's."),

  q2("LWGK-03-09", "LWG-03", "A", "medium",
    "Why do states negotiate conventions harmonising trade law?",
    [
      "To increase the tax collected on cross-border trade",
      "To reduce transaction costs and supply predictability and neutrality, so that remedies are enforceable",
      "To require all states to adopt one legal tradition",
      "To transfer jurisdiction to international courts",
    ],
    1,
    "To cut the cost of legal uncertainty, give both sides predictability, offer NEUTRALITY so neither must accept the other's domestic law, and make remedies enforceable. Harmonisation does not impose a single tradition or move jurisdiction."),

  multi2("LWGK-03-10", "LWG-03", "A", "hard",
    "Which TWO statements are correct?",
    [
      "UNIDROIT is best known for the Principles of International Commercial Contracts",
      "The ICC International Court of Arbitration decides disputes between states",
      "A convention applies automatically to transactions in its scope once ratified and implemented",
      "The WTO can hear a private seller's claim for an unpaid invoice",
    ],
    [0, 2],
    "UNIDROIT produced the PRINCIPLES, and a ratified CONVENTION applies automatically within its scope. The ICC arbitration court administers PRIVATE commercial arbitrations — the ICJ handles state disputes — and the WTO has no route for a private invoice claim."),
]

/* ── Chapter 4 · Courts and ADR ─────────────────────────────────── */

const CH04: AccaQuestion[] = [
  q1("LWGK-04-01", "LWG-04", "A", "easy",
    "What does a mediator do?",
    [
      "Decides the dispute and issues a binding award",
      "Facilitates a settlement without deciding the dispute",
      "Determines a technical question referred to them",
      "Issues a judgment enforceable as a court order",
    ],
    1,
    "FACILITATES. A mediator decides nothing; only a settlement the parties agree binds them, and it binds as a contract. A neutral who determines the dispute is an arbitrator or an expert."),

  q1("LWGK-04-02", "LWG-04", "A", "easy",
    "What does an arbitral tribunal produce?",
    ["A recommendation", "A binding award", "A settlement agreement", "A judgment"],
    1,
    "A binding AWARD, which binds whether or not the loser agrees and is widely enforceable. A judgment comes from a court, and a settlement requires the parties' agreement."),

  q1("LWGK-04-03", "LWG-04", "A", "medium",
    "What does the ICC International Court of Arbitration do?",
    [
      "Decides private commercial disputes itself",
      "Administers arbitrations under the ICC rules",
      "Resolves disputes between states",
      "Hears appeals from national courts",
    ],
    1,
    "It ADMINISTERS arbitrations — confirming arbitrators, scrutinising terms of reference, reviewing draft awards — rather than deciding cases. Disputes between states go to the International Court of Justice."),

  q1("LWGK-04-04", "LWG-04", "A", "medium",
    "Which is a genuine DISADVANTAGE of arbitration?",
    [
      "Awards are hard to enforce across borders",
      "It develops no public precedent to guide the trade",
      "The parties cannot choose the tribunal",
      "Proceedings are always public",
    ],
    1,
    "It creates NO PUBLIC PRECEDENT, because it is private and confidential. Awards enforce very widely, the parties do choose the tribunal, and confidentiality is one of arbitration's attractions."),

  q2("LWGK-04-05", "LWG-04", "A", "medium",
    "Two parties in different states are negotiating a long-term supply agreement and neither will accept the other's home courts. Which feature of arbitration most directly answers that concern?",
    [
      "That it is always cheaper than litigation",
      "That the seat can be neutral to both parties",
      "That there is a wide right of appeal",
      "That third parties can readily be joined",
    ],
    1,
    "A NEUTRAL SEAT. Arbitration is not always cheaper — the parties fund the tribunal — the grounds to challenge an award are very narrow, and third parties cannot easily be joined because the tribunal's authority comes from the agreement."),

  q2("LWGK-04-06", "LWG-04", "A", "medium",
    "Why does a well-drafted arbitration clause expressly preserve access to a national court?",
    [
      "Because arbitration agreements are otherwise unenforceable",
      "For interim relief such as a freezing order, which may be needed before a tribunal can be constituted",
      "To allow an appeal on the merits",
      "Because national courts must approve every award",
    ],
    1,
    "For INTERIM RELIEF. Constituting a tribunal takes time, and a request for interim measures is expressly compatible with an arbitration agreement. There is no appeal on the merits, and awards need no advance court approval."),

  q2("LWGK-04-07", "LWG-04", "A", "hard",
    "In a mediation the mediator forms the clear view that one party's case is weak and says so. What is the effect?",
    [
      "It becomes a binding determination",
      "None in itself — only a settlement the parties agree binds them",
      "It converts the mediation into an expert determination",
      "It binds unless challenged within a set period",
    ],
    1,
    "NONE in itself. A mediator facilitates and determines nothing, so the view carries only persuasive weight. What binds the parties afterwards is their own SETTLEMENT AGREEMENT, enforceable as a contract."),

  q2("LWGK-04-08", "LWG-04", "A", "medium",
    "Which process is most appropriate where the parties dispute a single technical valuation but agree on everything else?",
    ["Full litigation", "Expert determination", "Mediation", "Arbitration before a three-member tribunal"],
    1,
    "EXPERT DETERMINATION: a defined technical question referred to an expert whose determination binds if the parties so agreed. It is faster and cheaper than convening a tribunal or issuing proceedings for one narrow issue."),

  q1("LWGK-04-09", "LWG-04", "A", "medium",
    "What distinguishes conciliation from mediation?",
    [
      "Conciliation produces a binding award",
      "The conciliator may propose terms of settlement",
      "Conciliation is conducted in public",
      "Conciliation requires a court order",
    ],
    1,
    "The conciliator is more interventionist and may PROPOSE TERMS, which the parties may accept or reject. Neither process produces a binding determination, and both are private."),

  multi2("LWGK-04-10", "LWG-04", "A", "hard",
    "Which TWO are advantages of arbitration over litigation for an international commercial dispute?",
    [
      "The award is enforceable across a wide range of states",
      "It creates precedent that guides the trade",
      "The tribunal can be chosen for its expertise in the trade",
      "There is a broad right of appeal on the merits",
    ],
    [0, 2],
    "WIDE ENFORCEABILITY and a CHOSEN, EXPERT tribunal. Arbitration is private so it produces no precedent, and the grounds for challenging an award are deliberately narrow — there is no appeal on the merits."),
]

/* ── Chapter 5 · Arbitration under the UNCITRAL Model Law ───────── */

const CH05: AccaQuestion[] = [
  q1("LWGK-05-01", "LWG-05", "A", "easy",
    "Under the Model Law, how many arbitrators are there if the agreement is silent and the parties cannot agree?",
    ["One", "Two", "Three", "The arbitration cannot proceed"],
    2,
    "THREE. Each party then appoints one and those two appoint the third; if a party will not co-operate a court or designated authority appoints, so the arbitration cannot be stalled."),

  q1("LWGK-05-02", "LWG-05", "A", "easy",
    "On what ground may an arbitrator be challenged?",
    [
      "That a party dislikes their previous awards",
      "Justifiable doubts as to impartiality or independence",
      "That they are of a different nationality from the parties",
      "That they have decided a similar case before",
    ],
    1,
    "JUSTIFIABLE DOUBTS as to impartiality or independence, or failure to hold qualifications the parties agreed. There is no nationality bar, and having decided similar cases is not itself a ground."),

  q1("LWGK-05-03", "LWG-05", "A", "medium",
    "By when must a plea that the tribunal lacks jurisdiction be raised?",
    ["At any time before the award", "No later than the statement of defence", "Only at the enforcement stage", "Within a year of the award"],
    1,
    "No later than the STATEMENT OF DEFENCE. A party that participates fully and objects afterwards will usually be held to have waived the point."),

  q1("LWGK-05-04", "LWG-05", "A", "medium",
    "Must every arbitrator sign the award?",
    [
      "Yes, or the award is void",
      "No — a majority decision suffices",
      "Only where there are three arbitrators",
      "Only if the parties so agreed in writing",
    ],
    1,
    "NO — a MAJORITY suffices. The award must be in writing, signed, dated, state the place of arbitration and give reasons unless the parties agreed otherwise."),

  q2("LWGK-05-05", "LWG-05", "A", "hard",
    "A buyer sued in court argues that the whole supply contract, including its arbitration clause, is void for misrepresentation. What follows?",
    [
      "The arbitration clause falls with the contract, so the court must hear the dispute",
      "The clause is separable and survives, and the tribunal may rule on its own jurisdiction and on the contract's validity",
      "The arbitration may proceed only if both parties now agree afresh",
      "The court must determine validity before any arbitration begins",
    ],
    1,
    "SEPARABILITY keeps the arbitration agreement independent of the contract containing it, and COMPETENCE-COMPETENCE lets the tribunal rule on its own jurisdiction. Otherwise any party could escape arbitration simply by attacking the main contract."),

  q2("LWGK-05-06", "LWG-05", "A", "hard",
    "A losing party seeks to set an award aside because the tribunal misunderstood the expert evidence. Will it succeed?",
    [
      "Yes — an error of that kind is always reviewable",
      "No — the grounds concern jurisdiction, due process, scope, composition and public policy, not the merits",
      "Yes, if the sum in dispute is large enough",
      "Only if the tribunal gave no reasons",
    ],
    1,
    "NO. Every setting-aside ground concerns JURISDICTION, DUE PROCESS, SCOPE, COMPOSITION or PUBLIC POLICY. Misreading the evidence is an appeal on the MERITS, and arbitration provides none — a trade-off the parties accepted by agreeing to arbitrate."),

  q2("LWGK-05-07", "LWG-05", "A", "medium",
    "Which requirement of arbitral procedure can the parties NOT contract out of?",
    [
      "The number of arbitrators",
      "Equal treatment and a full opportunity for each party to present its case",
      "The language of the proceedings",
      "The place at which hearings are held",
    ],
    1,
    "EQUAL TREATMENT and a full opportunity to present its case. Everything else — number, language, venue, procedural rules — is within the parties' autonomy, which is why awards are most often attacked on this ground."),

  q2("LWGK-05-08", "LWG-05", "A", "medium",
    "Why does the seat of an arbitration matter?",
    [
      "It determines where all hearings must physically take place",
      "It fixes the national arbitration law governing the process and the courts that may set the award aside",
      "It determines the substantive law of the contract",
      "It fixes the nationality of the arbitrators",
    ],
    1,
    "The SEAT fixes the governing arbitration law and the supervising courts. Hearings may be held elsewhere without changing it, the substantive law is a separate choice, and there is no nationality requirement for arbitrators."),

  q1("LWGK-05-09", "LWG-05", "A", "medium",
    "Is a request to a national court for interim measures compatible with an arbitration agreement?",
    [
      "No — it repudiates the agreement",
      "Yes — it is expressly not incompatible with it",
      "Only after the tribunal is constituted",
      "Only if the other party consents",
    ],
    1,
    "YES, expressly. Interim relief is often needed before a tribunal can be constituted, which is why a well-drafted clause preserves it and why seeking it is no breach."),

  multi2("LWGK-05-10", "LWG-05", "A", "hard",
    "Which TWO are grounds on which an award may be set aside?",
    [
      "A party was not given proper notice of the proceedings",
      "The tribunal applied the governing law incorrectly",
      "The award deals with matters beyond the scope of the submission",
      "The tribunal preferred one side's witnesses",
    ],
    [0, 2],
    "LACK OF PROPER NOTICE (due process) and matters BEYOND THE SCOPE of the submission are both grounds. Misapplying the law or weighing the evidence differently are merits complaints, and there is no appeal on the merits."),
]

/** LW-Global's authored question kit for Area A — chapters 1 to 5. */
export const LWG_KIT_A: AccaQuestion[] = [...CH01, ...CH02, ...CH03, ...CH04, ...CH05]
