import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-GLOBAL · Area A — essential elements of legal systems.
 * Chapters 1–5 of the LW-Global reading tree, mapped to syllabus groups A1–A3.
 *
 * ── Why this is a separate tree from LW-ENG ────────────────────
 * LW is one paper id with TWO genuinely different syllabuses. Areas A, D, E, F and H
 * overlap between the variants; Areas B, C and G do not. LW-Global's Area B is the
 * CISG and Incoterms, its Area C is transport documents and payment mechanisms, and
 * its Area G is companies in difficulty or in crisis — where LW-ENG has the law of
 * obligations, employment law and insolvency law. A Global learner taught from the
 * ENG tree would be studying two areas that are not on their exam and missing two
 * that are.
 *
 * ── How a LAW paper's chapters differ from FA's ────────────────
 * There is nothing to compute. What earns the marks is applying a rule to facts and
 * reaching a conclusion, so these chapters lean on `definition` blocks for the rule,
 * `illustration` for a concrete instance, and `example` steppers that work a scenario
 * the way an answer should be built: identify the rule, state its elements, apply each
 * element to the facts, then conclude. Every worked example ends with the point that
 * decides the answer rather than a restatement of the rule.
 *
 * Structure follows the official ACCA LW-GLO study guide. All wording is ORIGINAL
 * Scholify teaching text — the approved-provider texts were used only as a benchmark
 * for structure and depth, never as a source of prose.
 */

/* ── Chapter 1 · A1(a), A1(b), A1(c) ───────────────────────────── */

export const LWG_TREE_01: StudyChapter = {
  id: "LWG-01",
  number: 1,
  paper: "LW",
  area: "A",
  title: "Law, politics and the separation of powers",
  minutes: 15,
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)"],
  intro:
    "Law does not arrive from nowhere. It is made by institutions that answer to a political system and pay for themselves out of an economy — and knowing which institution made a rule tells you how much weight it carries.",
  outcomes: [
    "Explain how economic, political and legal systems depend on one another",
    "Explain the doctrine of the separation of powers and what it is for",
    "Identify the three branches of state and the function each performs",
    "Distinguish criminal from civil law by purpose, parties, standard of proof and outcome",
    "Classify a given dispute as criminal, civil, or both",
  ],
  sections: [
    {
      id: "three-systems",
      heading: "Three systems that hold each other up",
      blocks: [
        {
          kind: "text",
          md: "A business decision is never taken in a purely commercial space. Whether a contract can be enforced, whether property can be owned, whether a debt survives insolvency — all of these are answers the **legal** system supplies, and it can only supply them because a **political** system gave it authority and an **economic** system funds it.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "The interdependence the syllabus asks you to explain",
            caption: "Remove any one and the other two stop working.",
            data: {
              steps: [
                { label: "Economic system creates wealth and trade" },
                { label: "Trade needs enforceable rules" },
                { label: "Political system enacts and legitimises them" },
                { label: "Legal system applies and enforces them" },
                { label: "Certainty encourages investment" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "What each system contributes to the other two",
          items: [
            "**The economy needs the law** for enforceable contracts, secure property rights, a currency people trust, and a way of resolving disputes that does not depend on force.",
            "**The law needs the political system** for its authority: someone must have the recognised power to make a rule binding, and to change it when it stops working.",
            "**The political system needs the economy** to fund courts, regulators and enforcement — and needs a functioning economy to stay legitimate with the people it governs.",
            "**Investors read all three together.** Capital moves toward jurisdictions where the rules are predictable and the courts independent, which is why legal certainty is an economic asset rather than an administrative cost.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this matters for a cross-border question",
          md: "When a scenario involves two countries, the commercial risk is not only that the other party defaults — it is that the **rules and the enforcement machinery differ**. That is the whole reason Areas B and C of this syllabus exist: international conventions and standardised trade terms are attempts to supply certainty that no single domestic legal system can give to a cross-border deal.",
        },
      ],
    },
    {
      id: "separation-of-powers",
      heading: "The separation of powers",
      blocks: [
        {
          kind: "definition",
          term: "The separation of powers",
          md: "The principle that the state's authority should be divided between **three distinct branches**, each with its own function and each able to check the others, so that no single body both makes the rules and decides how they apply to it.",
        },
        {
          kind: "table",
          caption: "The three branches and what each one does",
          head: ["Branch", "Function", "Typical body"],
          rows: [
            ["**Legislature**", "**Makes** the law — enacts, amends and repeals it", "Parliament, congress or national assembly"],
            ["**Executive**", "**Implements** the law and administers the state day to day", "Government, ministries, regulators, police"],
            ["**Judiciary**", "**Interprets and applies** the law, and resolves disputes about it", "The courts and tribunals"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "What the doctrine is trying to prevent, and how",
          items: [
            "**Arbitrary power.** If the body that makes a rule also judges whether it has been broken, there is no independent check on either.",
            "**Judicial independence** is the practical core: judges must be able to decide against the government without losing their position.",
            "**Checks and balances** run in every direction — courts can review the legality of executive action, the legislature can change the law a court has interpreted, and the executive answers to the legislature.",
            "**In practice the separation is never complete.** Ministers usually sit in the legislature, and the executive often has delegated power to make detailed regulations. The doctrine is a standard to measure a system against, not a description of any real one.",
          ],
        },
        {
          kind: "illustration",
          title: "The doctrine doing real work",
          md: "A ministry issues a regulation requiring every importer to hold a licence, and refuses a licence to one company without giving reasons.\n\nThe company cannot ask the ministry to overturn its own decision fairly — that is the problem the doctrine identifies. It can ask a **court** to review whether the ministry acted within the power the **legislature** actually granted it, and whether it followed a fair procedure.\n\nNotice what the court does not do: it does not decide whether requiring licences is good policy. That is the legislature's business. The court decides whether the executive stayed inside the law — which is exactly the boundary the separation of powers draws.",
        },
      ],
      check: {
        q: "A government department makes detailed regulations under a power granted to it by an Act of the legislature. Which branch is exercising which function?",
        options: [
          "The judiciary is legislating, which breaches the separation of powers",
          "The executive is exercising delegated legislative power, which the doctrine tolerates provided the courts can review whether it stayed within the Act",
          "The legislature is acting as the executive",
          "No branch is involved, because regulations are not law",
        ],
        correct: 1,
        explain:
          "This is DELEGATED legislation: the EXECUTIVE making detailed rules under authority the LEGISLATURE granted. A strict separation would forbid it, but every real system permits it — the safeguard is that a court can review whether the regulation went beyond the power actually granted. Regulations made within the power are fully law.",
      },
    },
    {
      id: "criminal-and-civil",
      heading: "Criminal law and civil law",
      blocks: [
        {
          kind: "definition",
          term: "Criminal and civil law",
          md: "**Criminal** law defines conduct so harmful that the **state** itself takes action, in order to punish and deter. **Civil** law governs the rights and obligations between **private parties**, and exists to compensate or otherwise put right a wrong done to one of them.",
        },
        {
          kind: "table",
          caption: "The comparison examiners return to most often",
          head: ["", "Criminal", "Civil"],
          rows: [
            ["**Purpose**", "Punish and deter conduct harmful to society", "Compensate the claimant and enforce private rights"],
            ["**Who brings it**", "The **state**, through a prosecutor", "The **wronged party** (the claimant)"],
            ["**Parties named**", "Prosecutor against the accused (the defendant)", "Claimant against defendant"],
            ["**Standard of proof**", "**Beyond reasonable doubt** — the higher standard", "**On the balance of probabilities** — more likely than not"],
            ["**Outcome if proved**", "Conviction: a fine, disqualification, imprisonment", "Liability: damages, an injunction, specific performance, rescission"],
            ["**Who benefits**", "Society; a fine goes to the state", "The claimant, who receives the remedy"],
            ["**Can it be settled?**", "Not by the victim — the decision to prosecute is the state's", "Yes, the parties can settle at any point"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The same facts can be both",
          md: "One set of events routinely gives rise to **both** a prosecution and a civil claim, and the two are independent: different parties, different standards of proof, different remedies. A director who takes company money commits a criminal offence **and** breaches a civil duty to the company. An acquittal does not defeat the civil claim, because the civil claim only has to be proved on the **balance of probabilities** — the lower standard.",
        },
        {
          kind: "example",
          title: "Working a scenario that is both",
          scenario:
            "Ravi, the finance director of Meridian Trading, transfers $180,000 of company funds to an account he controls, and conceals it with false ledger entries. The company discovers the transfers, dismisses him and reports the matter to the authorities. Ravi is prosecuted; the company also wants its money back. He is acquitted at trial because the prosecution cannot exclude the possibility that a colleague made the entries.",
          steps: [
            { label: "Identify the criminal dimension", detail: "Taking company money dishonestly and falsifying records are offences against the state's rules. The PROSECUTOR brings the case, and must prove dishonesty BEYOND REASONABLE DOUBT." },
            { label: "Explain the acquittal", detail: "Acquittal does not mean the court found Ravi honest. It means the prosecution failed to reach the high criminal standard — an unresolved possibility that someone else made the entries is enough to defeat it." },
            { label: "Identify the civil dimension", detail: "Separately, Ravi owed the COMPANY duties as a director and as its agent. The company is the claimant in its own right, and it need only prove its case on the BALANCE OF PROBABILITIES." },
            { label: "Apply the lower standard", detail: "On the evidence — the transfers went to an account he controlled, and he had access to the ledger — the company can readily show it is MORE LIKELY THAN NOT that Ravi took the money, even though that fell short of the criminal standard." },
            { label: "Identify the remedy sought", detail: "The company wants COMPENSATION and recovery, not punishment: damages for breach of duty, an account of the money received, and potentially a freezing order over the account." },
            { label: "State the conclusion", detail: "The acquittal is no answer to the civil claim. The two proceedings ask different questions, of different parties, to different standards." },
          ],
          result:
            "Ravi is not convicted but can still be held civilly liable to repay the $180,000. The point that decides it is the **standard of proof**: the same evidence that leaves reasonable doubt in a criminal court can comfortably tip the balance of probabilities in a civil one. A candidate who answers \"he was acquitted, so the company cannot recover\" has treated one set of facts as producing only one legal answer.",
        },
      ],
      check: {
        q: "Which statement about the standard of proof is correct?",
        options: [
          "Both criminal and civil cases require proof beyond reasonable doubt",
          "Criminal cases require proof beyond reasonable doubt; civil cases require proof on the balance of probabilities",
          "Civil cases require the higher standard because money is at stake",
          "The standard is set by the parties in both types of case",
        ],
        correct: 1,
        explain:
          "CRIMINAL cases require proof BEYOND REASONABLE DOUBT, because a conviction can take away liberty. CIVIL cases require only the BALANCE OF PROBABILITIES — more likely than not. That difference is why the same facts can produce an acquittal and civil liability at the same time.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying an acquittal defeats a civil claim on the same facts.",
      fix: "The civil claim needs only the BALANCE OF PROBABILITIES. Different parties, different standard, independent outcome.",
    },
    {
      trap: "Describing the separation of powers as absolute.",
      fix: "It is a standard, not a description. Delegated legislation and ministers sitting in the legislature are universal; the safeguard is judicial review.",
    },
    {
      trap: "Naming the victim as the party who brings a prosecution.",
      fix: "The STATE prosecutes. The victim cannot decide to drop it, and cannot settle it — that distinguishes criminal from civil proceedings.",
    },
    {
      trap: "Treating a fine and damages as the same kind of outcome.",
      fix: "A fine PUNISHES and goes to the state. Damages COMPENSATE and go to the claimant. The purpose distinguishes them.",
    },
    {
      trap: "Answering a \"which branch\" question by naming the person rather than the function.",
      fix: "Classify by FUNCTION — making, implementing or interpreting the law. A minister who makes regulations is the executive exercising delegated legislative power.",
    },
  ],
  keyTerms: [
    { term: "Separation of powers", def: "The division of state authority between legislature, executive and judiciary so that no one body both makes the rules and judges their application to itself." },
    { term: "Legislature", def: "The branch that enacts, amends and repeals law." },
    { term: "Executive", def: "The branch that implements the law and administers the state, often including delegated power to make detailed regulations." },
    { term: "Judiciary", def: "The branch that interprets and applies the law and resolves disputes, independently of the other two." },
    { term: "Criminal law", def: "Law defining conduct harmful to society, enforced by the state to punish and deter, proved beyond reasonable doubt." },
    { term: "Civil law (as opposed to criminal)", def: "Law governing rights and obligations between private parties, enforced by the wronged party to obtain a remedy, proved on the balance of probabilities." },
    { term: "Balance of probabilities", def: "The civil standard of proof: the claimant's version must be more likely than not." },
  ],
  summary: [
    "Economic, political and legal systems depend on one another; legal certainty is an economic asset.",
    "The separation of powers divides authority between legislature, executive and judiciary, with judicial independence as its practical core.",
    "No real system separates the three completely; delegated legislation is universal and judicial review is the safeguard.",
    "Criminal law is brought by the state to punish, and must be proved beyond reasonable doubt.",
    "Civil law is brought by the wronged party to obtain a remedy, and need only be proved on the balance of probabilities.",
    "One set of facts can give rise to both, and an acquittal is no answer to the civil claim.",
    "Cross-border trade is risky partly because rules and enforcement differ between jurisdictions — which is what Areas B and C address.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a functioning economy depend on the legal system?", a: "It supplies enforceable contracts, secure property rights and a way of resolving disputes without force — the certainty that makes trade and investment possible." },
    { q: "Name the three branches of state and each one's function.", a: "The legislature makes law, the executive implements it, and the judiciary interprets and applies it." },
    { q: "What is the practical core of the separation of powers?", a: "Judicial independence — judges must be able to decide against the government without risk to their position." },
    { q: "Give three differences between criminal and civil proceedings.", a: "Who brings them (state vs wronged party), the standard of proof (beyond reasonable doubt vs balance of probabilities), and the outcome (punishment vs a compensatory remedy)." },
    { q: "Can a defendant acquitted of a crime still be liable in civil law on the same facts?", a: "Yes. The civil claim need only be proved on the balance of probabilities, which the same evidence may well satisfy." },
  ],
  furtherStudy: [
    "Chapter 2 compares the legal traditions a cross-border scenario may put on either side of a deal.",
    "Chapter 3 explains why international regulation exists at all.",
    "Area H returns to criminal liability in a corporate setting.",
  ],
}

/* ── Chapter 2 · A1(d) ─────────────────────────────────────────── */

export const LWG_TREE_02: StudyChapter = {
  id: "LWG-02",
  number: 2,
  paper: "LW",
  area: "A",
  title: "Common law, civil law and Sharia traditions",
  minutes: 14,
  syllabusRefs: ["A1(d)"],
  intro:
    "In a cross-border deal the two parties may be reasoning from completely different ideas about where law comes from. Recognising which tradition you are in tells you what an argument will be built out of.",
  outcomes: [
    "Outline the operation of a common law system, and the role of binding precedent within it",
    "Outline the operation of a civil law system, and the role of codes within it",
    "Outline the operation of a Sharia law system and its principal sources",
    "Compare the three traditions on sources, the role of the judge and the treatment of earlier decisions",
    "Explain why the distinction matters to an international commercial contract",
  ],
  sections: [
    {
      id: "common-law",
      heading: "The common law tradition",
      blocks: [
        {
          kind: "definition",
          term: "Common law system",
          md: "A system in which **judicial decisions are themselves a source of law**. Where a superior court decides a point of principle, that decision **binds** lower courts in later cases with materially similar facts — so the law develops case by case alongside legislation.",
        },
        {
          kind: "definition",
          term: "Binding precedent, and the part that binds",
          md: "Only the **ratio decidendi** — the legal reasoning essential to the decision — binds. Remarks made in passing, the **obiter dicta**, are persuasive only. Whether a precedent binds at all depends on the **hierarchy** of the courts and on whether the material facts are sufficiently similar; a court may **distinguish** a precedent by identifying a relevant factual difference.",
        },
        {
          kind: "list",
          title: "How a common law system operates in practice",
          items: [
            "**Legislation ranks above case law.** Where a statute covers the point, it prevails, and the courts' role becomes interpreting it.",
            "**Precedent supplies certainty** — parties can predict an outcome from decided cases — and **flexibility**, because a court can distinguish, and a senior court can depart from, an earlier decision.",
            "**The judge is an adjudicator** between two opposing cases presented by the parties, rather than an investigator.",
            "**Reasoning is analogical**: the argument is that this case is like, or unlike, a decided one.",
          ],
        },
      ],
    },
    {
      id: "civil-and-sharia",
      heading: "The civil law and Sharia traditions",
      blocks: [
        {
          kind: "definition",
          term: "Civil law system",
          md: "A system in which the primary source of law is a **comprehensive written code** enacted by the legislature, intended to cover the field systematically. Earlier judgments help show how the code has been understood, but they are **persuasive rather than binding** — the judge's task is to apply the code to the facts.",
        },
        {
          kind: "definition",
          term: "Sharia law system",
          md: "A system deriving law from religious sources — principally the **Qur'an** and the **Sunna** (the practice of the Prophet), developed through scholarly reasoning and consensus. In commercial matters its distinctive rules include the prohibition of **riba** (interest), of excessive uncertainty in a contract, and of speculation, which shapes how finance is structured rather than forbidding profit.",
        },
        {
          kind: "table",
          caption: "The three traditions compared",
          head: ["", "Common law", "Civil law", "Sharia"],
          rows: [
            ["**Primary source**", "Legislation plus judicial decisions", "A comprehensive enacted **code**", "Religious sources, principally the Qur'an and Sunna"],
            ["**Earlier decisions**", "**Binding** on lower courts (precedent)", "**Persuasive** only", "Scholarly reasoning and consensus are highly influential"],
            ["**The judge's role**", "Adjudicates between the parties' cases", "Applies the code, often more investigative", "Applies religious law, assisted by scholarly opinion"],
            ["**How law develops**", "Case by case, incrementally", "By **amending the code**", "Through scholarly interpretation of the sources"],
            ["**Typical reasoning**", "Analogy with decided cases", "Deduction from a general rule in the code", "Derivation from the sources and established consensus"],
            ["**Commercial signature**", "Detailed contracts anticipating disputes", "Reliance on the code to fill gaps", "Structures avoiding interest and excessive uncertainty"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why an exam scenario raises this at all",
          md: "Two consequences matter commercially. First, in a **civil law** jurisdiction the code fills gaps the contract left open, so a short contract may still be workable; in a **common law** jurisdiction the parties are expected to have provided for the point themselves, which is why common-law-drafted contracts run long. Second, if the deal is with a party in a **Sharia** jurisdiction, an interest-bearing loan may need restructuring as a sale or lease to be enforceable there.",
        },
        {
          kind: "illustration",
          title: "The same silence, two answers",
          md: "A supply contract says nothing about what happens if delivery is delayed by a port closure.\n\nIn a **civil law** jurisdiction, the code is likely to contain a general provision on impossibility or changed circumstances, and the court applies it — the gap is filled by law the parties never wrote.\n\nIn a **common law** jurisdiction, the starting point is the bargain as made. The party seeking relief must fit the facts into an established doctrine, and if it cannot, the obligation stands. That is precisely why a common-law-drafted contract carries a long force majeure clause: the parties cannot rely on a code to rescue them.\n\nNeither answer is more sophisticated. They allocate the same risk by different means, and the practical lesson is to **read the governing law clause before assuming which one applies**.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not overstate the divide",
          md: "Civil law jurisdictions publish and follow leading decisions closely, and common law jurisdictions are now heavily statutory. The distinction is about **what is authoritative when they conflict**, not about whether the other source is used at all. An answer claiming that civil law judges ignore earlier cases, or that common law has no legislation, will lose the mark.",
        },
      ],
      check: {
        q: "In a civil law system, what weight does an earlier decision of a senior court carry?",
        options: [
          "It binds all lower courts, as in a common law system",
          "It is persuasive but not binding; the code remains the primary source",
          "It has no relevance whatever",
          "It binds only if the code expressly says so",
        ],
        correct: 1,
        explain:
          "In a civil law system earlier judgments are PERSUASIVE — they show how the code has been understood — but the CODE is the primary source and the judge applies it to the facts. Treating them as binding describes a common law system, and saying they are irrelevant overstates the divide.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying a common law system has no legislation, or a civil law system no case law.",
      fix: "Both use both. The distinction is which is AUTHORITATIVE when they conflict, and whether earlier decisions BIND.",
    },
    {
      trap: "Treating obiter dicta as binding.",
      fix: "Only the RATIO DECIDENDI binds. Remarks in passing are persuasive.",
    },
    {
      trap: "Describing Sharia law as prohibiting profit.",
      fix: "It prohibits RIBA (interest), excessive contractual uncertainty and speculation. Profit from genuine trade and risk-sharing is permitted.",
    },
    {
      trap: "Assuming the parties' nationalities decide which system governs.",
      fix: "The contract's governing law clause does, subject to conflict-of-laws rules. Chapter 3 develops this.",
    },
    {
      trap: "Confusing \"civil law\" the tradition with \"civil law\" as opposed to criminal.",
      fix: "Read the context. One contrasts with common law; the other contrasts with criminal law. The exam uses both senses.",
    },
  ],
  keyTerms: [
    { term: "Common law system", def: "A system in which judicial decisions of superior courts bind lower courts, developing the law case by case alongside legislation." },
    { term: "Binding precedent", def: "The rule that a superior court's legal reasoning must be followed by lower courts in materially similar cases." },
    { term: "Ratio decidendi", def: "The legal reasoning essential to a decision — the only part that binds." },
    { term: "Obiter dicta", def: "Remarks made in passing in a judgment, persuasive but not binding." },
    { term: "Civil law system", def: "A system whose primary source is a comprehensive enacted code, with earlier judgments persuasive rather than binding." },
    { term: "Sharia law", def: "A system deriving law from religious sources, principally the Qur'an and Sunna, prohibiting riba, excessive uncertainty and speculation in commerce." },
    { term: "Riba", def: "Interest, prohibited under Sharia principles, which is why compliant finance is structured through sale, lease or partnership rather than lending at interest." },
  ],
  summary: [
    "In a common law system, superior courts' decisions bind lower courts and the law develops case by case.",
    "Only the ratio decidendi binds; obiter dicta are persuasive, and a precedent can be distinguished on the facts.",
    "In a civil law system a comprehensive code is the primary source and earlier judgments are persuasive only.",
    "Sharia law derives from religious sources and, commercially, prohibits interest, excessive uncertainty and speculation.",
    "Civil law codes fill gaps the contract left; common law expects the parties to have provided for the point themselves.",
    "The traditions differ over what is authoritative in a conflict, not over whether the other source is used.",
  ],
  knowledgeDiagnostic: [
    { q: "What binds in a common law precedent, and what does not?", a: "The ratio decidendi — the reasoning essential to the decision — binds. Obiter dicta, remarks in passing, do not." },
    { q: "What is the primary source of law in a civil law system?", a: "A comprehensive enacted code. Earlier judgments show how it has been understood but are persuasive only." },
    { q: "Name the principal sources of Sharia law and one commercial consequence.", a: "The Qur'an and the Sunna, developed by scholarly reasoning and consensus. Commercially, riba (interest) is prohibited, so finance is structured through sale, lease or partnership." },
    { q: "Why do common-law-drafted contracts tend to be longer?", a: "There is no code to fill gaps, so the parties must provide for contingencies — force majeure and similar — themselves." },
    { q: "How can a common law court avoid following an apparently binding precedent?", a: "By distinguishing it — identifying a material factual difference so that the earlier ratio does not apply." },
  ],
  furtherStudy: [
    "Chapter 3 explains how a governing law is chosen and what happens when systems conflict.",
    "Area B shows the CISG doing what neither tradition can do alone: supplying one rule for both sides of a cross-border sale.",
  ],
}

/* ── Chapter 3 · A2 ────────────────────────────────────────────── */

export const LWG_TREE_03: StudyChapter = {
  id: "LWG-03",
  number: 3,
  paper: "LW",
  area: "A",
  title: "Conflict of laws, treaties and the institutions of world trade",
  minutes: 16,
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)"],
  intro:
    "Two parties, two legal systems, one deal. Somebody has to decide whose law applies and whose court decides — and that question is worth as much commercially as the price.",
  outcomes: [
    "Explain the need for international legal regulation in the context of conflict of laws",
    "Explain the function of international treaties, conventions and model codes, and how they differ",
    "Explain the roles of the UN, ICC, WTO, OECD, UNIDROIT and UNCITRAL in regulating and promoting international trade",
    "Identify what a well-drafted international contract should settle in advance",
  ],
  sections: [
    {
      id: "conflict-of-laws",
      heading: "Conflict of laws: the problem international regulation exists to solve",
      blocks: [
        {
          kind: "definition",
          term: "Conflict of laws",
          md: "The body of rules that decides, where a dispute touches more than one jurisdiction, **which system's law governs** the issue, **which country's courts** may hear it, and whether a judgment obtained in one country can be **enforced** in another.",
        },
        {
          kind: "list",
          style: "number",
          title: "The three questions, in the order they arise",
          items: [
            "**Jurisdiction** — which country's courts are entitled to hear this dispute at all?",
            "**Applicable (governing) law** — whose substantive rules decide the parties' rights? This need not be the law of the court hearing the case.",
            "**Recognition and enforcement** — will the judgment be recognised and enforced where the losing party's assets actually are? A judgment that cannot be enforced is worth nothing.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why parties choose in advance",
          md: "Left to the conflict-of-laws rules, all three questions are uncertain and each side will argue for its home forum. So commercial parties settle them **in the contract**: a **governing law** clause, a **jurisdiction or arbitration** clause, and often a choice of language and place of performance. That is cheaper than litigating about where to litigate — and it is the single most examinable practical point in this area.",
        },
        {
          kind: "illustration",
          title: "What is at stake in the choice",
          md: "A seller in country A ships machinery to a buyer in country B. The goods arrive damaged. The contract says nothing about law or forum.\n\nThe buyer sues at home, where the courts may apply their own rules on inspection periods and limitation. The seller argues the case belongs in country A, whose law may give a shorter period for complaint and a different measure of damages. Before anyone addresses whether the machinery was actually damaged, the parties spend a year and substantial costs arguing about **where** and **under what law**.\n\nAnd if the buyer wins in country B, it still has to have that judgment recognised in country A to reach the seller's assets. Three separate risks, all avoidable by two clauses.",
        },
      ],
      check: {
        q: "A contract between parties in different countries contains a governing law clause but no jurisdiction or arbitration clause. What remains uncertain?",
        options: [
          "Nothing — the governing law clause settles every question",
          "Which country's courts may hear a dispute, and whether a resulting judgment can be enforced where the assets are",
          "Only the language of the proceedings",
          "Whether the contract is valid at all",
        ],
        correct: 1,
        explain:
          "A governing law clause settles WHICH LAW applies, but not WHICH COURT may hear the case or whether a judgment will be ENFORCED elsewhere. Those are separate questions, which is why commercial contracts address forum and law separately — and why arbitration is attractive, since awards enforce more widely than judgments.",
      },
    },
    {
      id: "instruments",
      heading: "Treaties, conventions and model codes",
      blocks: [
        {
          kind: "table",
          caption: "Three instruments, three different effects",
          head: ["Instrument", "What it is", "How it takes effect"],
          rows: [
            ["**Treaty / convention**", "A binding agreement between states on a defined subject", "A state **ratifies** it and gives it effect domestically; it then binds that state and generally applies automatically to transactions within its scope"],
            ["**Model law / model code**", "A recommended text prepared for states to adopt", "**Not binding.** A state enacts it, with modifications if it wishes, so the outcome is harmonisation rather than uniformity"],
            ["**Standard terms and rules of practice**", "Definitions and rules produced by a commercial body, not a state", "Binding only because **the parties incorporate them** into their contract — Incoterms are the leading example"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction the exam tests",
          md: "A **convention** binds because a **state** agreed to it. A **model law** binds only where a state has chosen to enact it, and states may vary the text. **Incoterms** bind only because the **parties** wrote them into their contract. So the right question about any instrument is: *what makes this binding on these parties?* — a treaty ratified by their states, legislation enacting a model law, or their own contract.",
        },
        {
          kind: "list",
          title: "Why states bother",
          items: [
            "**Reduced transaction costs** — one known rule instead of two unknown ones, so parties do not have to price legal uncertainty into every deal.",
            "**Predictability** for both sides, which makes cross-border credit and long supply chains possible.",
            "**Neutrality** — neither party has to accept the other's domestic law, which matters when bargaining power is unequal.",
            "**Enforceability** — conventions on recognition of awards and judgments are what make a remedy real rather than theoretical.",
          ],
        },
      ],
    },
    {
      id: "institutions",
      heading: "The institutions, and what each is actually for",
      blocks: [
        {
          kind: "table",
          caption: "Who does what",
          head: ["Body", "Nature", "Role in international trade"],
          rows: [
            ["**UN** (United Nations)", "Inter-governmental", "The framework under which trade conventions are negotiated and adopted; parent of UNCITRAL"],
            ["**UNCITRAL**", "UN commission", "Prepares **conventions and model laws** to harmonise trade law — the CISG, the Model Law on International Commercial Arbitration, the Model Law on International Credit Transfers, cross-border insolvency"],
            ["**UNIDROIT**", "Inter-governmental organisation", "Studies and prepares **uniform private law**, notably the Principles of International Commercial Contracts — persuasive restatements the parties may adopt"],
            ["**ICC** (International Chamber of Commerce)", "**Business** organisation, not a state body", "Produces **Incoterms** and standard practice for documentary credits, and runs the **International Court of Arbitration**"],
            ["**WTO**", "Inter-governmental", "Administers the multilateral trade agreements and resolves disputes **between states** over trade barriers — not between private traders"],
            ["**OECD**", "Inter-governmental", "Develops standards and guidance on governance, bribery, tax transparency and multinational conduct"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Three confusions worth pre-empting",
          md: "**The WTO does not resolve private commercial disputes.** It handles complaints between member STATES about trade measures. A seller with an unpaid invoice has no route to the WTO.\n\n**The ICC is a business body, not a state body.** Its output binds only through the parties' contract — but its arbitration court is one of the leading institutions for resolving private disputes.\n\n**UNCITRAL drafts, states enact.** UNCITRAL has no power to impose anything; a model law has effect only where a legislature has adopted it.",
        },
        {
          kind: "example",
          title: "Tracing a single deal through the institutions",
          scenario:
            "Kestrel Machines, in a state that has ratified the CISG, sells equipment to Halvard Imports, in another CISG state. The contract says delivery is CIF, payment is by documentary credit, and disputes go to arbitration in a third country under that country's arbitration legislation, which is based on the UNCITRAL Model Law. A dispute arises over conformity of the goods.",
          steps: [
            { label: "Which rules govern the sale?", detail: "The **CISG**, a UN convention prepared by UNCITRAL. It applies because both states have ratified it and the contract is within its scope — the parties did not have to copy its terms in." },
            { label: "What does CIF mean here?", detail: "An **ICC Incoterm**. It binds because the parties WROTE it into the contract, not because any state enacted it. It allocates cost, risk and the duty to insure." },
            { label: "What governs the payment mechanism?", detail: "The documentary credit operates under the bank's undertaking and ICC standard practice incorporated by the parties and the banks — again contractual in origin." },
            { label: "Where is the dispute decided?", detail: "In **arbitration**, under the arbitration law of the seat. That law is based on the UNCITRAL **Model Law** — which binds because that state ENACTED it, not because UNCITRAL wrote it." },
            { label: "Can the award be enforced?", detail: "Yes, and this is arbitration's decisive advantage: awards are enforceable across a very wide range of states under the convention on recognition of arbitral awards, far more readily than a foreign court judgment." },
            { label: "Where does the WTO come in?", detail: "**Nowhere.** No state measure is in issue and neither party is a state. If Halvard's government imposed a discriminatory tariff, that could concern the WTO — the private conformity dispute cannot." },
          ],
          result:
            "One transaction, governed by a **convention** (because states ratified it), **Incoterms** (because the parties adopted them), and a national arbitration law **based on a model law** (because that state enacted it). The point that decides every question of this kind is *what makes this instrument binding on these parties* — and the WTO's absence is as examinable as the others' presence.",
        },
      ],
      check: {
        q: "A private seller wants to complain that a foreign buyer has not paid. Which body can resolve that dispute?",
        options: [
          "The WTO, since it concerns international trade",
          "An arbitral institution or a competent national court, depending on the contract's dispute clause",
          "UNCITRAL, as the author of the relevant convention",
          "The OECD, under its guidance on multinational conduct",
        ],
        correct: 1,
        explain:
          "A private commercial dispute goes to whichever forum the CONTRACT provides for — arbitration or a national court. The WTO resolves complaints between STATES about trade measures; UNCITRAL drafts instruments but decides nothing; the OECD issues guidance and does not adjudicate.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Sending a private commercial dispute to the WTO.",
      fix: "The WTO handles disputes between STATES about trade measures. Private disputes go to arbitration or a national court.",
    },
    {
      trap: "Treating a model law as binding of itself.",
      fix: "It binds only where a state has ENACTED it, and states may modify the text — so the result is harmonisation, not uniformity.",
    },
    {
      trap: "Treating Incoterms as legislation.",
      fix: "They are ICC standard terms and bind only because the PARTIES incorporate them into the contract.",
    },
    {
      trap: "Assuming a governing law clause also settles jurisdiction.",
      fix: "Law, forum and enforcement are three separate questions. A well-drafted contract addresses all three.",
    },
    {
      trap: "Confusing UNCITRAL with UNIDROIT.",
      fix: "UNCITRAL is a UN commission producing conventions and model laws; UNIDROIT is a separate organisation best known for the Principles of International Commercial Contracts.",
    },
    {
      trap: "Forgetting enforcement when advising on a remedy.",
      fix: "Ask where the assets are. An arbitral award is enforceable far more widely than a foreign judgment, which is often the reason to arbitrate.",
    },
  ],
  keyTerms: [
    { term: "Conflict of laws", def: "The rules deciding which jurisdiction's courts may hear a cross-border dispute, whose law governs it, and whether a judgment can be enforced elsewhere." },
    { term: "Governing law clause", def: "A contractual term choosing the substantive law that decides the parties' rights." },
    { term: "Convention (treaty)", def: "A binding agreement between states which, once ratified and implemented, applies to transactions within its scope." },
    { term: "Model law", def: "A recommended text prepared for states to enact, with modifications if they wish; not binding of itself." },
    { term: "UNCITRAL", def: "The UN commission that prepares conventions and model laws to harmonise international trade law." },
    { term: "ICC", def: "The International Chamber of Commerce, a business organisation that produces Incoterms and standard banking practice and runs the International Court of Arbitration." },
    { term: "WTO", def: "The inter-governmental body administering multilateral trade agreements and resolving trade disputes between states." },
  ],
  summary: [
    "Conflict of laws answers three separate questions: jurisdiction, governing law, and recognition and enforcement.",
    "Commercial parties settle those questions in the contract rather than leaving them to conflict rules.",
    "A convention binds because states ratified it; a model law binds only where enacted; Incoterms bind because the parties adopted them.",
    "International regulation exists to cut transaction costs, supply predictability and neutrality, and make remedies enforceable.",
    "UNCITRAL drafts conventions and model laws; UNIDROIT prepares uniform private law; the ICC produces trade terms and runs an arbitration court.",
    "The WTO resolves disputes between states about trade measures, never private commercial claims.",
    "An arbitral award is enforceable far more widely than a foreign court judgment.",
  ],
  knowledgeDiagnostic: [
    { q: "What three questions does conflict of laws answer?", a: "Which courts have jurisdiction, which law governs the substance, and whether a judgment will be recognised and enforced where the assets are." },
    { q: "How does a convention differ from a model law?", a: "A convention binds states that ratify it. A model law is a recommended text with no force until a state enacts it, and states may vary it." },
    { q: "Why do Incoterms bind the parties?", a: "Because the parties incorporate them into their contract. They are ICC standard terms, not legislation." },
    { q: "What kind of dispute does the WTO resolve?", a: "Disputes between member states about trade measures and barriers — not private commercial claims." },
    { q: "Name two UNCITRAL instruments on this syllabus.", a: "The CISG, and the Model Law on International Commercial Arbitration. The Model Law on International Credit Transfers is a third." },
  ],
  furtherStudy: [
    "Chapter 4 compares litigation with the ADR options a dispute clause may choose between.",
    "Chapter 5 works through arbitration under the UNCITRAL Model Law in detail.",
    "Area B applies the CISG, the convention this chapter introduces.",
  ],
}

/* ── Chapter 4 · A3(a), A3(b) ──────────────────────────────────── */

export const LWG_TREE_04: StudyChapter = {
  id: "LWG-04",
  number: 4,
  paper: "LW",
  area: "A",
  title: "Resolving a cross-border dispute: courts and ADR",
  minutes: 15,
  syllabusRefs: ["A3(a)", "A3(b)"],
  intro:
    "Litigation is not the default for international trade — it is one option among several, and usually not the one commercial parties choose. Knowing the trade-offs is what lets you advise on a dispute clause.",
  outcomes: [
    "Explain the operation of court-based adjudication in a commercial dispute",
    "Explain the operation of negotiation, mediation, conciliation, expert determination and arbitration",
    "Evaluate the distinct merits of each against court adjudication",
    "Explain the role of the international courts of trade, including the ICC International Court of Arbitration",
    "Recommend a dispute resolution route for given commercial facts",
  ],
  sections: [
    {
      id: "the-options",
      heading: "The options, from least to most binding",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The escalation a commercial dispute clause usually builds",
            caption: "Each step costs more and takes more control away from the parties.",
            data: {
              steps: [
                { label: "Negotiation", sub: "Parties only; no third party" },
                { label: "Mediation", sub: "Neutral facilitates; no decision" },
                { label: "Conciliation", sub: "Neutral proposes terms" },
                { label: "Expert determination", sub: "Expert decides a technical point" },
                { label: "Arbitration", sub: "Tribunal makes a binding award" },
                { label: "Litigation", sub: "Court gives a binding judgment" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "What each process actually does",
          head: ["Process", "Third party's role", "Outcome"],
          rows: [
            ["**Negotiation**", "None", "Whatever the parties agree; nothing if they do not"],
            ["**Mediation**", "**Facilitates** a settlement; expresses no view on the merits", "A settlement, binding as a contract once made — the mediator decides nothing"],
            ["**Conciliation**", "More interventionist: may **propose** terms", "Proposed terms the parties may accept or reject"],
            ["**Expert determination**", "An **expert** decides a defined technical question", "A determination, binding if the parties agreed it would be"],
            ["**Arbitration**", "A **tribunal** hears both sides and decides", "An **award**, binding and widely enforceable"],
            ["**Litigation**", "A **judge** decides in public", "A **judgment**, binding, with rights of appeal"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction most often got wrong",
          md: "**A mediator does not decide anything.** Mediation succeeds only if the parties themselves agree, and what binds them afterwards is their **settlement agreement**, not the mediator's view. An **arbitrator** does decide, and the **award** binds whether or not the loser agrees with it. If a question asks who determines the outcome, that is the line being tested.",
        },
      ],
      check: {
        q: "In a mediation, the mediator forms a clear view that one party's case is weak. What is the effect of that view?",
        options: [
          "It becomes a binding determination of the dispute",
          "It has no binding effect — the mediator facilitates and only a settlement agreed by the parties binds them",
          "It binds unless appealed within a set period",
          "It converts the mediation into an arbitration",
        ],
        correct: 1,
        explain:
          "A mediator FACILITATES and decides nothing. Only a settlement the PARTIES agree binds them, and it binds as a contract. A neutral who determines the dispute is an arbitrator or an expert, and the process is then a different one entirely.",
      },
    },
    {
      id: "comparing",
      heading: "Comparing the routes on the grounds that matter commercially",
      blocks: [
        {
          kind: "table",
          caption: "Litigation against arbitration and mediation",
          head: ["", "Litigation", "Arbitration", "Mediation"],
          rows: [
            ["**Who decides**", "A judge assigned by the court", "A tribunal the **parties help choose**", "Nobody — the parties settle or they do not"],
            ["**Expertise**", "General commercial, not necessarily technical", "Can require **specific expertise** in the trade", "Not applicable"],
            ["**Privacy**", "Normally **public**", "**Private and confidential**", "Private and confidential"],
            ["**Speed and cost**", "Slowest and often dearest", "Usually faster; not always cheap", "Fastest and cheapest"],
            ["**Flexibility of procedure**", "Fixed by court rules", "**Agreed by the parties**", "Entirely flexible"],
            ["**Appeal**", "Rights of appeal exist", "**Very limited** grounds to challenge", "Not applicable"],
            ["**Cross-border enforcement**", "Depends on treaties; often difficult", "**Widely enforceable** under the awards convention", "Enforced as a contract"],
            ["**Preserves the relationship**", "Rarely", "Better than litigation", "**Best** — the parties keep control"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why international parties so often choose arbitration",
          md: "Two reasons dominate, and both should appear in an answer. **Neutrality**: neither side has to litigate in the other's home courts, before a judge applying an unfamiliar procedure. **Enforceability**: an award can be enforced against assets in a very wide range of states under the convention on recognition of arbitral awards, whereas a foreign judgment may need a fresh action. Privacy, choice of tribunal and procedural flexibility reinforce the choice.",
        },
        {
          kind: "list",
          title: "What arbitration is NOT good for",
          items: [
            "**It is not always cheap.** The parties pay the tribunal and the institution, costs a court would absorb.",
            "**It cannot easily bind third parties.** Its authority comes from the agreement, so a party who never agreed cannot be joined.",
            "**Interim relief may still need a court** — freezing assets, for instance, before a tribunal is even constituted.",
            "**The very limited appeal cuts both ways.** A tribunal that gets the law wrong will usually not be corrected.",
            "**It develops no public precedent**, so the trade gains no settled guidance from it.",
          ],
        },
        {
          kind: "definition",
          term: "The international courts of trade",
          md: "Bodies that administer or decide international commercial disputes. The **ICC International Court of Arbitration** does not itself decide cases: it **administers** arbitrations — scrutinising the terms of reference, confirming arbitrators, reviewing draft awards — under the ICC rules. Distinguish it from the **International Court of Justice**, which resolves disputes between **states**, and from national commercial courts.",
        },
        {
          kind: "example",
          title: "Advising on a dispute clause",
          scenario:
            "Solvent Dynamics, in state A, is negotiating a three-year supply agreement with Arbor Chemicals, in state B. The goods are technically specialised. Arbor insists any dispute be heard in its home courts; Solvent is uneasy because state B's judgments are difficult to enforce elsewhere and its courts are slow. The relationship is expected to be long-term, and neither party wants the terms of the deal public. Advise on the dispute clause.",
          steps: [
            { label: "Identify what each party actually fears", detail: "Arbor wants a familiar forum. Solvent fears a home-court advantage, delay, and an unenforceable outcome. Both fears are about FORUM, not about the substantive law." },
            { label: "Rule out litigation in either home court", detail: "Whichever is chosen gives one side an advantage and leaves the other with an enforcement problem. Litigation is also public, which neither wants." },
            { label: "Test arbitration against those concerns", detail: "A NEUTRAL seat answers the home-advantage point; the parties can appoint arbitrators with the relevant technical expertise; proceedings are confidential; and the award is enforceable in both states under the awards convention." },
            { label: "Build in an escalation", detail: "Because the relationship is long-term, provide for NEGOTIATION between senior managers, then MEDIATION, before arbitration is commenced. Most disputes in a continuing supply relationship are better settled than decided." },
            { label: "Preserve access to a court for one purpose", detail: "Expressly allow either party to seek INTERIM relief from a national court — an injunction or a freezing order — without breaching the arbitration agreement. A tribunal takes time to constitute." },
            { label: "Settle the other clauses that go with it", detail: "Choose the governing LAW, the SEAT of arbitration, the institutional rules, the number of arbitrators and the LANGUAGE. Leaving any of these open reintroduces the argument the clause exists to prevent." },
          ],
          result:
            "A tiered clause: negotiation, then mediation, then confidential arbitration at a neutral seat under institutional rules, with an express carve-out for interim court relief. The reasoning that earns the marks is matching the **mechanism to the parties' actual concerns** — neutrality, expertise, confidentiality, enforceability and preserving the relationship — rather than reciting that arbitration is cheaper, which it may well not be.",
        },
      ],
      check: {
        q: "Which is the strongest reason for two parties in different states to choose arbitration over litigation?",
        options: [
          "Arbitration is always cheaper than going to court",
          "An arbitral award is enforceable across a wide range of states, and the seat can be neutral to both parties",
          "Arbitration creates precedent that guides the trade",
          "An arbitral award can be appealed on the merits more easily",
        ],
        correct: 1,
        explain:
          "ENFORCEABILITY and NEUTRALITY are the decisive advantages. Arbitration is not always cheaper — the parties pay the tribunal; it is private so it creates NO public precedent; and the grounds for challenging an award are very LIMITED, not wider than for a judgment.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying a mediator determines the dispute.",
      fix: "A mediator FACILITATES. Only a settlement the parties agree binds them, and it binds as a contract.",
    },
    {
      trap: "Asserting that arbitration is always cheaper and faster.",
      fix: "It is usually faster and more flexible, but the parties fund the tribunal and institution. Its decisive advantages are neutrality and enforceability.",
    },
    {
      trap: "Claiming arbitration produces precedent.",
      fix: "It is private and confidential, so it develops no public precedent — one of its genuine disadvantages.",
    },
    {
      trap: "Confusing the ICC International Court of Arbitration with the International Court of Justice.",
      fix: "The ICC body ADMINISTERS private commercial arbitrations. The ICJ resolves disputes between STATES.",
    },
    {
      trap: "Assuming an arbitration clause bars any recourse to a court.",
      fix: "Interim relief such as a freezing order is normally still sought from a national court, and a well-drafted clause says so expressly.",
    },
    {
      trap: "Recommending a route without reference to the parties' concerns.",
      fix: "Match the mechanism to what they actually fear — home-court advantage, publicity, delay, enforcement, or damage to a continuing relationship.",
    },
  ],
  keyTerms: [
    { term: "Alternative dispute resolution (ADR)", def: "Processes for resolving a dispute otherwise than by court adjudication, ranging from negotiation to arbitration." },
    { term: "Mediation", def: "A process in which a neutral facilitates a settlement without deciding the dispute or expressing a determination on the merits." },
    { term: "Conciliation", def: "A more interventionist facilitated process in which the neutral may propose terms of settlement." },
    { term: "Expert determination", def: "Referral of a defined technical question to an expert whose determination binds if the parties so agreed." },
    { term: "Arbitration", def: "A private process in which a tribunal chosen by or for the parties hears the dispute and makes a binding, widely enforceable award." },
    { term: "ICC International Court of Arbitration", def: "The ICC body that administers arbitrations under the ICC rules — confirming arbitrators and scrutinising awards — rather than deciding cases itself." },
    { term: "Seat of arbitration", def: "The legal place of the arbitration, which determines the national arbitration law governing the process and the courts that may supervise it." },
  ],
  summary: [
    "The options escalate from negotiation through mediation and conciliation to expert determination, arbitration and litigation.",
    "A mediator decides nothing; only the parties' settlement binds them. An arbitrator decides and the award binds.",
    "Litigation is public, procedurally fixed, appealable and often hard to enforce across borders.",
    "Arbitration offers a neutral seat, a chosen and expert tribunal, confidentiality and wide enforceability of the award.",
    "Its drawbacks are cost, difficulty binding third parties, reliance on courts for interim relief, very limited appeal and no precedent.",
    "The ICC International Court of Arbitration administers arbitrations; the International Court of Justice decides disputes between states.",
    "A good dispute clause tiers the process and settles law, seat, rules, number of arbitrators and language.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between mediation and arbitration in terms of outcome?", a: "Mediation produces a settlement only if the parties agree, and it binds as a contract. Arbitration produces an award that binds whether or not the loser agrees." },
    { q: "Give the two strongest commercial reasons for choosing arbitration in a cross-border deal.", a: "A neutral forum, so neither party litigates in the other's home courts; and wide enforceability of the award under the recognition convention." },
    { q: "Name three disadvantages of arbitration.", a: "The parties fund the tribunal so it is not necessarily cheap; third parties cannot easily be joined; and the grounds to challenge an award are very limited. It also creates no precedent." },
    { q: "What does the ICC International Court of Arbitration do?", a: "It administers arbitrations under the ICC rules — confirming arbitrators, scrutinising terms of reference and reviewing draft awards. It does not decide the cases itself." },
    { q: "Why does an arbitration clause usually preserve access to a national court?", a: "For interim relief such as freezing orders or injunctions, which may be needed before a tribunal can be constituted." },
  ],
  furtherStudy: [
    "Chapter 5 works through arbitration itself under the UNCITRAL Model Law.",
    "Chapter 3 supplies the conflict-of-laws context a dispute clause is drafted against.",
  ],
}

/* ── Chapter 5 · A3(c), A3(d), A3(e) ───────────────────────────── */

export const LWG_TREE_05: StudyChapter = {
  id: "LWG-05",
  number: 5,
  paper: "LW",
  area: "A",
  title: "International commercial arbitration under the UNCITRAL Model Law",
  minutes: 17,
  syllabusRefs: ["A3(c)", "A3(d)", "A3(e)"],
  intro:
    "The Model Law is the text most national arbitration statutes are built from, and the syllabus asks you to apply it rather than describe it. Almost everything in it follows from one idea: the parties' agreement governs, and the court's role is limited to supporting it.",
  outcomes: [
    "Explain and apply the provisions of the UNCITRAL Model Law on International Commercial Arbitration",
    "Explain the requirements and effect of an arbitration agreement",
    "Describe the arbitral tribunal: composition, appointment, challenge and jurisdiction",
    "Describe the conduct of proceedings and the limits on court intervention",
    "Explain arbitral awards, their form and effect, and the grounds for setting an award aside or refusing recognition",
  ],
  sections: [
    {
      id: "agreement",
      heading: "The arbitration agreement, and what it takes away from the courts",
      blocks: [
        {
          kind: "definition",
          term: "Arbitration agreement",
          md: "An agreement by which the parties submit to arbitration all or certain disputes between them, whether contractual or not. It may be a **clause within a contract** or a **separate agreement**, and the Model Law requires it to be **in writing** — a requirement satisfied by an exchange of communications recording it.",
        },
        {
          kind: "list",
          style: "number",
          title: "Four consequences of a valid arbitration agreement",
          items: [
            "**A court must refer the parties to arbitration** where an action is brought on a matter covered by the agreement and a party asks it to, unless the agreement is null and void, inoperative or incapable of being performed.",
            "**Separability.** The arbitration agreement is treated as **independent** of the contract containing it, so an allegation that the main contract is invalid does not by itself destroy the tribunal's authority.",
            "**Competence-competence.** The tribunal may **rule on its own jurisdiction**, including on objections to the existence or validity of the arbitration agreement.",
            "**Interim measures remain available from a court.** Requesting them is **not incompatible** with the arbitration agreement — which is why the carve-out in chapter 4's dispute clause is orthodox rather than a concession.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why separability matters so much",
          md: "Without it, the easiest way to sabotage an arbitration would be to argue that the whole contract was void — because if the arbitration clause fell with it, there would be no tribunal to decide the point, and the dispute would land back in court. Separability closes that escape: the clause survives to let the tribunal decide the very question of the contract's validity.",
        },
      ],
      check: {
        q: "A buyer sued in court argues that the entire supply contract, including its arbitration clause, is void for misrepresentation. What is the effect on the arbitration?",
        options: [
          "The arbitration clause falls with the contract, so the court must hear the dispute",
          "The arbitration clause is separable and survives, and the tribunal may rule on its own jurisdiction and on the contract's validity",
          "The arbitration can proceed only if both parties now agree in writing",
          "The court must decide the validity question before any arbitration can begin",
        ],
        correct: 1,
        explain:
          "SEPARABILITY means the arbitration agreement is independent of the contract containing it, and COMPETENCE-COMPETENCE lets the tribunal rule on its own jurisdiction. So the clause survives the allegation and the tribunal decides. Otherwise any party could escape arbitration simply by attacking the main contract.",
      },
    },
    {
      id: "tribunal",
      heading: "The arbitral tribunal",
      blocks: [
        {
          kind: "table",
          caption: "Composition and appointment",
          head: ["Issue", "The Model Law's approach"],
          rows: [
            ["**Number of arbitrators**", "As the parties agree; **failing agreement, three**"],
            ["**Appointment**", "By the procedure the parties agreed. In a three-arbitrator case without agreement, each party appoints one and those two appoint the third"],
            ["**Failure of the procedure**", "A **court or other designated authority** appoints, so a party cannot stall the arbitration by refusing to co-operate"],
            ["**Qualifications**", "No nationality bar — a person of any nationality may act unless the parties agreed otherwise"],
            ["**Required qualities**", "**Impartiality and independence**, and any qualifications the parties agreed"],
          ],
        },
        {
          kind: "list",
          title: "Challenging an arbitrator",
          items: [
            "The grounds are **justifiable doubts as to impartiality or independence**, or failure to possess qualifications the parties agreed.",
            "An arbitrator has a **continuing duty to disclose** circumstances likely to give rise to such doubts.",
            "A party may not challenge an arbitrator **it appointed** on grounds it knew about at the time of appointment.",
            "The challenge goes first to the **tribunal** (or the agreed institution); if unsuccessful, the challenging party may ask the **court** to decide, and the arbitration may continue meanwhile.",
            "An arbitrator who becomes unable to act, or fails to act without undue delay, may be **replaced** by the same procedure that produced the original appointment.",
          ],
        },
        {
          kind: "definition",
          term: "Competence-competence and its limits",
          md: "The tribunal may rule on its own jurisdiction. A plea that it **lacks** jurisdiction must be raised **no later than the defence**, and a plea that it is **exceeding** its authority as soon as the matter arises. The tribunal may rule on the plea as a **preliminary question** or in the **award on the merits** — and where it rules as a preliminary question, a party may ask the court to decide the point.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Raise the objection early or lose it",
          md: "Jurisdictional objections are subject to strict timing. A party that participates in the arbitration without objecting, and only complains at the enforcement stage, will usually be held to have **waived** the point. In a scenario where a party \"took a full part in the hearing and then challenged the tribunal's authority\", the timing is the answer.",
        },
      ],
      check: {
        q: "The parties' arbitration agreement is silent on the number of arbitrators and they cannot agree. Under the Model Law, how many are there?",
        options: ["One", "Two", "Three", "The arbitration cannot proceed"],
        correct: 2,
        explain:
          "Failing agreement the number is THREE. The appointment mechanism then follows: each party appoints one arbitrator and those two appoint the third — and if a party will not co-operate, a court or designated authority appoints, so the arbitration cannot be stalled.",
      },
    },
    {
      id: "proceedings-and-awards",
      heading: "Proceedings, awards, and challenging them",
      blocks: [
        {
          kind: "list",
          title: "How the proceedings are conducted",
          items: [
            "**Equal treatment and a full opportunity to present its case** for each party — the one requirement the parties cannot contract out of, and the ground on which awards are most often attacked.",
            "**Party autonomy over procedure**: the parties may agree the rules, the place and the language; failing agreement the tribunal decides.",
            "**The seat matters** because it fixes the arbitration law governing the process and the courts that may supervise or set aside the award. Hearings may physically take place elsewhere without changing the seat.",
            "**Evidence and hearings** are as the parties agree or the tribunal directs; the tribunal may need **court assistance** to compel evidence.",
            "**Default does not stop the arbitration.** If the respondent fails to submit a defence, the tribunal continues rather than treating the claim as admitted.",
          ],
        },
        {
          kind: "definition",
          term: "The award",
          md: "The tribunal's decision. It must be **in writing and signed**, must **state the reasons** unless the parties agreed otherwise or it records a settlement, and must give its **date** and the **place** of arbitration. Where there is more than one arbitrator, a **majority** decision suffices. An award is **final and binding**, and the tribunal's authority ends with it, subject to limited powers to correct or interpret it.",
        },
        {
          kind: "table",
          caption: "The narrow grounds for setting aside — and why they are narrow",
          head: ["Ground", "What it is not"],
          rows: [
            ["A party was under an **incapacity**, or the arbitration agreement is **invalid**", "Not an opportunity to re-argue whether the agreement was wise"],
            ["A party was **not given proper notice** or was **unable to present its case**", "Not a complaint that the tribunal preferred the other side's evidence"],
            ["The award deals with matters **beyond the scope** of the submission", "Not a complaint that the tribunal reached the wrong result on matters within scope"],
            ["The **composition of the tribunal or the procedure** did not accord with the parties' agreement", "Not a complaint about procedural choices the agreement permitted"],
            ["The subject matter is **not capable of settlement by arbitration**, or the award conflicts with **public policy**", "Not a general appeal on the merits — public policy is construed narrowly"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "There is no appeal on the merits",
          md: "Every ground above is about **jurisdiction, due process or fundamental policy** — never about whether the tribunal weighed the evidence correctly or applied the law well. An application to set aside must also be brought within a **short time limit** running from receipt of the award. A party that wanted a right of appeal on the merits should not have agreed to arbitrate.",
        },
        {
          kind: "example",
          title: "Applying the Model Law to a contested award",
          scenario:
            "Northvale Steel and Cormar Fabrication agreed to arbitration, seat in state S, whose arbitration statute is based on the Model Law. Their agreement was silent on the number of arbitrators; Cormar refused to participate in appointment, so a court in S appointed a three-member tribunal. Cormar filed a defence without objecting to jurisdiction, argued the merits over a four-day hearing, and lost. The award is in writing, signed by two of the three arbitrators, gives reasons, and awards Northvale $2.4m. Cormar now applies to set the award aside on three grounds: that it never agreed to three arbitrators; that the award is invalid because only two arbitrators signed; and that the tribunal misunderstood the engineering evidence.",
          steps: [
            { label: "The number of arbitrators", detail: "Failing agreement the Model Law supplies THREE, and where a party will not co-operate the court appoints. The tribunal was properly constituted, so this ground fails on the law." },
            { label: "The timing point against Cormar", detail: "Even if there had been a defect, Cormar filed a defence WITHOUT OBJECTING and argued the merits. A jurisdictional plea must be raised no later than the defence, so the objection is waived." },
            { label: "Two signatures out of three", detail: "A MAJORITY decision suffices, and the award is in writing, signed, reasoned and dated. The absence of the third signature does not invalidate it — a reason for the omission would ordinarily be stated." },
            { label: "The engineering evidence", detail: "This is an attack on the MERITS. It is not within any setting-aside ground: not jurisdiction, not due process, not scope, not composition, not public policy. There is no appeal on the merits." },
            { label: "Test the due process alternative", detail: "Cormar could only succeed by showing it was denied proper notice or a full opportunity to present its case. It participated fully across a four-day hearing, so that route is closed too." },
            { label: "Consider enforcement", detail: "The grounds for refusing RECOGNITION AND ENFORCEMENT in another state closely mirror the setting-aside grounds, so Cormar gains nothing by waiting to resist enforcement instead." },
          ],
          result:
            "All three grounds fail and the award stands. The reasoning worth internalising: two of Cormar's complaints are answered by **default provisions** of the Model Law, and the third by the fact that **misunderstanding the evidence is not a ground at all**. When a scenario has a party attacking an award, sort its complaints into jurisdiction, due process, scope, composition and public policy — anything that fits none of those five is an appeal on the merits, and there is no such appeal.",
        },
      ],
      check: {
        q: "A losing party argues that the tribunal applied the governing law incorrectly. Is that a ground to set the award aside?",
        options: [
          "Yes — an error of law is always reviewable",
          "No — the grounds concern jurisdiction, due process, scope, composition and public policy, not the merits",
          "Yes, but only if the error exceeds a stated value",
          "Only if the tribunal gave no reasons",
        ],
        correct: 1,
        explain:
          "NO. Every setting-aside ground concerns JURISDICTION, DUE PROCESS, SCOPE, COMPOSITION or PUBLIC POLICY. An error of law or a misreading of evidence is an appeal on the MERITS, and arbitration does not provide one — which is a trade-off the parties accepted when they agreed to arbitrate.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying an allegation that the main contract is void destroys the tribunal's authority.",
      fix: "SEPARABILITY keeps the arbitration agreement independent, and the tribunal may rule on its own jurisdiction.",
    },
    {
      trap: "Assuming one arbitrator where the agreement is silent.",
      fix: "Failing agreement the Model Law supplies THREE, with a court or designated authority appointing if a party will not co-operate.",
    },
    {
      trap: "Treating an error of law or fact as a ground to set aside an award.",
      fix: "There is no appeal on the merits. The grounds are jurisdiction, due process, scope, composition and public policy.",
    },
    {
      trap: "Letting a party raise a jurisdictional objection late.",
      fix: "It must be raised no later than the DEFENCE. Full participation without objection waives it.",
    },
    {
      trap: "Saying an award needs every arbitrator's signature.",
      fix: "A MAJORITY decision suffices. The award must be written, signed, dated, reasoned and state the place of arbitration.",
    },
    {
      trap: "Treating a request for interim court relief as a repudiation of the arbitration agreement.",
      fix: "It is expressly NOT incompatible with it.",
    },
    {
      trap: "Confusing the seat with the venue of hearings.",
      fix: "The SEAT fixes the governing arbitration law and the supervising courts. Hearings may be held elsewhere without changing it.",
    },
  ],
  keyTerms: [
    { term: "Arbitration agreement", def: "A written agreement to submit present or future disputes to arbitration, whether as a contract clause or a separate agreement." },
    { term: "Separability", def: "The principle that the arbitration agreement is independent of the contract containing it, so it survives an attack on that contract's validity." },
    { term: "Competence-competence", def: "The tribunal's power to rule on its own jurisdiction, including on the existence and validity of the arbitration agreement." },
    { term: "Seat of arbitration", def: "The legal place of the arbitration, fixing the arbitration law that governs the process and the courts that may set the award aside." },
    { term: "Arbitral award", def: "The tribunal's binding decision: in writing, signed, dated, stating the place and, unless agreed otherwise, the reasons." },
    { term: "Setting aside", def: "The limited court process for annulling an award, available only on grounds of jurisdiction, due process, scope, composition or public policy." },
  ],
  summary: [
    "An arbitration agreement must be in writing and obliges a court to refer the parties to arbitration.",
    "Separability keeps the clause alive when the main contract is attacked; competence-competence lets the tribunal rule on its own jurisdiction.",
    "Interim relief from a court is expressly compatible with an arbitration agreement.",
    "Failing agreement there are three arbitrators, and a court appoints if a party will not co-operate.",
    "Arbitrators must be impartial and independent, must disclose, and may be challenged on justifiable doubts.",
    "Equal treatment and a full opportunity to present its case are the requirements the parties cannot waive.",
    "An award must be written, signed, dated and reasoned; a majority suffices; and it may be set aside only on narrow grounds that never include the merits.",
  ],
  knowledgeDiagnostic: [
    { q: "What does separability protect against?", a: "A party escaping arbitration by arguing the whole contract, including the arbitration clause, is void. The clause is independent and survives, so the tribunal can decide the point." },
    { q: "How many arbitrators are there if the agreement is silent and the parties disagree?", a: "Three. Each party appoints one and those two appoint the third; a court or designated authority appoints if a party refuses to co-operate." },
    { q: "By when must a plea that the tribunal lacks jurisdiction be raised?", a: "No later than the defence. Participating fully and objecting afterwards waives the point." },
    { q: "List the grounds for setting an award aside.", a: "Incapacity or an invalid arbitration agreement; lack of proper notice or inability to present a case; matters beyond the scope of the submission; a tribunal or procedure contrary to the parties' agreement; a non-arbitrable subject matter or conflict with public policy." },
    { q: "Must every arbitrator sign the award?", a: "No — a majority decision suffices, and the award remains valid provided it is written, signed, dated, states the place and gives reasons unless the parties agreed otherwise." },
  ],
  furtherStudy: [
    "Chapter 4 sets arbitration against the alternatives a dispute clause chooses between.",
    "Area B supplies the substantive law an international sale arbitration usually applies.",
  ],
}

/** Chapters 1–5 — LW-Global Area A, in reading order. */
export const LWG_TREE_AREA_A: StudyChapter[] = [
  LWG_TREE_01,
  LWG_TREE_02,
  LWG_TREE_03,
  LWG_TREE_04,
  LWG_TREE_05,
]
