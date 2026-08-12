/*
 * LW-Global Area A — essential elements of the legal system, and international
 * trade regulation.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * LW sets objective tests at 1 and 2 marks plus five multi-task questions at 6
 * marks. So nothing here is written as an essay — the paper has never set one.
 *
 * A law paper's distractors are almost never factually absurd; they are the RIGHT
 * RULE APPLIED TO THE WRONG THING. An arbitral tribunal's power offered as a
 * court's, a convention's exclusion offered as its scope, avoidance offered where
 * only price reduction is available. So nearly every plan here begins by fixing
 * WHICH instrument or body the question is about, because the rule cannot be
 * chosen until that is settled.
 *
 * Where an instrument's own wording is quoted, the article is cited beside it —
 * that is the condition on which quoting statute is legitimate at all.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWG_PLANS_A: ExamPlanMap = {
  /* ── LWG-01 · Law, politics and the separation of powers ─────── */

  "LWG-01::three-systems": {
    title: "How the legal, political and economic systems depend on each other",
    format: "ot",
    marks: 2,
    requirement:
      "Why does a functioning legal system matter to international trade?\n\nA  It guarantees that every contract will be profitable\nB  It makes obligations enforceable, so parties will deal with strangers across borders\nC  It removes the need for written contracts\nD  It fixes the prices at which goods may be sold",
    plan: [
      {
        step: "Identify the problem law solves for a trader",
        detail:
          "Trade requires performing before, or without, being certain the other side will perform. Without enforceability, only parties who already trust each other would deal — which excludes almost every cross-border transaction.",
      },
      {
        step: "Name what enforceability actually buys",
        detail:
          "A remedy if the other side fails. That is what makes it rational to ship goods to a stranger in another jurisdiction, and it is the whole commercial function of contract law.",
      },
      {
        step: "Reject the two options claiming law guarantees outcomes",
        detail:
          "Law does not make a contract profitable and does not fix prices. It supplies the framework within which a bargain is made and enforced, leaving the bargain itself to the parties.",
      },
      {
        step: "Reject the option that inverts the position",
        detail:
          "A functioning legal system makes written contracts MORE useful, not less, because writing is the evidence a court or tribunal will act on.",
      },
    ],
    answer:
      "**B — it makes obligations enforceable, so parties will deal with strangers across borders.**\n\nTrade almost always requires one side to perform before it is certain the other will. Without an enforceable obligation, only parties who already trust one another would deal — which excludes nearly every cross-border transaction.\n\nWhat law supplies is a **remedy** if the other side fails, and that is what makes it rational to ship goods to a stranger in another jurisdiction.\n\nA and D claim law guarantees outcomes. It does not: it provides the framework within which a bargain is struck and enforced, and leaves the bargain to the parties. C inverts the position — a functioning legal system makes writing more valuable, because writing is the evidence a court or tribunal will act on.",
    earns: ["Framing law's function as supplying a remedy rather than guaranteeing a result"],
    loses: ["Choosing an option in which law determines the commercial terms"],
  },

  "LWG-01::separation-of-powers": {
    title: "Which branch of the state performs which function",
    format: "ot",
    marks: 1,
    requirement:
      "Under the separation of powers, the function of the **judiciary** is to:\n\nA  Make new law by statute\nB  Interpret and apply the law to disputes\nC  Administer government policy\nD  Negotiate treaties with other states",
    plan: [
      {
        step: "Name the three branches and their functions",
        detail:
          "Legislature: makes law. Executive: administers government and policy. Judiciary: interprets and applies the law to disputes. Three branches, three functions, deliberately separated.",
      },
      {
        step: "Match the stem's branch to its function",
        detail:
          "The judiciary interprets and applies. It does not legislate, though in a common law system its decisions develop the law through precedent — which is a different thing from enacting statute.",
      },
      {
        step: "Place the two executive options",
        detail:
          "Administering policy and negotiating treaties are both executive functions. On a one-mark question, matching branch to function and moving on is the whole task.",
      },
    ],
    answer:
      "**B — interpret and apply the law to disputes.**\n\nThe three branches are the **legislature** (makes law), the **executive** (administers government and policy, including treaty negotiation) and the **judiciary** (interprets and applies the law).\n\nThe separation exists so that no single body both makes the rules and decides how they apply to itself — which is what makes judicial independence the guarantee behind every other protection.\n\nIn a common law system judicial decisions do **develop** the law through precedent, and that is worth keeping distinct from enacting statute: the judiciary declares what the law is, the legislature changes it.",
    earns: ["Distinguishing developing law by precedent from enacting it by statute"],
    loses: ["Attributing an executive function to the judiciary"],
  },

  "LWG-01::criminal-and-civil": {
    title: "Telling a criminal matter from a civil one",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following most reliably distinguishes criminal from civil proceedings?\n\nA  Criminal cases involve larger sums of money\nB  Criminal proceedings are brought by the state and aim to punish; civil proceedings are brought by a party and aim to compensate\nC  Only criminal cases are heard by a judge\nD  Civil proceedings require proof beyond reasonable doubt",
    plan: [
      {
        step: "Sort the distinction on two axes: who sues, and what for",
        detail:
          "Criminal: brought by the state, aimed at punishment. Civil: brought by the wronged party, aimed at compensation or another remedy. Both axes point the same way and together they are decisive.",
      },
      {
        step: "Add the standard of proof",
        detail:
          "Criminal requires proof BEYOND REASONABLE DOUBT. Civil requires proof on the BALANCE OF PROBABILITIES. Option D reverses them, which is the standard trap.",
      },
      {
        step: "Reject the two irrelevancies",
        detail:
          "Amount of money does not classify a case — a theft of a small sum is criminal and a large commercial claim is civil. And judges sit in both.",
      },
      {
        step: "Note that one act can produce both",
        detail:
          "A fraud can be prosecuted by the state AND sued on by the victim. The two proceedings are independent, so an acquittal does not bar a civil claim on the same facts, because the standard of proof is lower.",
      },
    ],
    answer:
      "**B — criminal proceedings are brought by the state and aim to punish; civil proceedings are brought by a party and aim to compensate.**\n\nBoth axes — who brings the action, and what it seeks — point the same way, which makes the pairing decisive.\n\nThe **standard of proof** completes it: criminal requires proof **beyond reasonable doubt**, civil proof **on the balance of probabilities**. Option D reverses them.\n\nThe amount of money classifies nothing: a small theft is criminal, a large commercial claim is civil. Judges sit in both.\n\nThe consequence worth holding is that one act can generate **both** proceedings independently — a fraud may be prosecuted by the state and sued on by the victim. An acquittal does not bar the civil claim, precisely because the civil standard of proof is lower.",
    earns: [
      "Using who brings the action and what it seeks together",
      "Getting the two standards of proof the right way round",
    ],
    loses: ["Reversing the standards of proof, which option D is built on"],
  },

  /* ── LWG-02 · Legal traditions ───────────────────────────────── */

  "LWG-02::common-law": {
    title: "What makes a system a common law system",
    format: "ot",
    marks: 2,
    requirement:
      "The defining feature of a common law legal system is that:\n\nA  All law is contained in a single written code\nB  Judicial decisions bind lower courts in later similar cases\nC  Judges investigate the facts themselves rather than hearing the parties' cases\nD  There is no legislation",
    plan: [
      {
        step: "Name the mechanism, not the geography",
        detail:
          "The doctrine of PRECEDENT — decisions of higher courts bind lower ones on similar facts. That is the defining mechanism, and it is what makes case law a source of law.",
      },
      {
        step: "Contrast with the codified tradition",
        detail:
          "A civil law system starts from a comprehensive written code, and judicial decisions are not formally binding in the same way. Option A describes that tradition, which is the intended confusion.",
      },
      {
        step: "Reject the procedural option",
        detail:
          "Judges investigating the facts themselves is the INQUISITORIAL procedure associated with civil law systems. Common law systems are adversarial — the parties present their cases and the judge decides between them.",
      },
      {
        step: "Reject the absolute claim",
        detail:
          "Common law systems have a great deal of legislation, and statute prevails over case law where they conflict. What distinguishes the system is that case law is ALSO a source, not that statute is absent.",
      },
    ],
    answer:
      "**B — judicial decisions bind lower courts in later similar cases.**\n\nThe defining mechanism is the doctrine of **precedent**, which makes case law a source of law in its own right.\n\nOption A describes the **civil law** tradition, which starts from a comprehensive written code with judicial decisions not formally binding in the same way. Option C describes the **inquisitorial** procedure associated with that tradition; common law procedure is **adversarial**, with the parties presenting their cases and the judge deciding between them.\n\nD overreaches: common law systems have extensive legislation, and statute prevails over case law where the two conflict. What distinguishes the system is that case law is **also** a source, not that statute is absent.\n\nThe practical significance for a trader is predictability from a body of decided cases, at the cost of having to find the relevant ones.",
    earns: ["Naming precedent as the mechanism and keeping it separate from adversarial procedure"],
    loses: ["Reading \"common law\" as meaning the absence of legislation"],
  },

  "LWG-02::civil-and-sharia": {
    title: "Recognising a feature of the civil law or Sharia tradition",
    format: "ot",
    marks: 2,
    requirement:
      "Which is a characteristic of a legal system based on Sharia principles, as relevant to commercial transactions?\n\nA  The prohibition of interest (riba), requiring transactions to be structured on profit and risk sharing\nB  The binding force of previous judicial decisions on lower courts\nC  The absence of any written sources of law\nD  A prohibition on all forms of commercial contract",
    plan: [
      {
        step: "Recall the commercially relevant principle",
        detail:
          "The prohibition of riba — interest — which requires financing to be structured around profit and loss sharing or asset-based arrangements rather than a lending charge.",
      },
      {
        step: "Reject the option belonging to the common law tradition",
        detail:
          "Binding precedent is the common law's mechanism. Importing it here is the same category error the previous question tested from the other direction.",
      },
      {
        step: "Reject the two overstatements",
        detail:
          "There are written sources, and commercial contract is not prohibited — the tradition regulates HOW transactions are structured rather than forbidding trade. Trade is expressly contemplated.",
      },
      {
        step: "Note why an accountant needs this",
        detail:
          "A financing arrangement in a jurisdiction applying these principles will be structured differently from a conventional loan, which changes both the legal analysis and the accounting.",
      },
    ],
    answer:
      "**A — the prohibition of interest (riba), requiring transactions to be structured on profit and risk sharing.**\n\nThat prohibition is the feature with the most direct commercial consequence: financing is structured around profit and loss sharing or asset-based arrangements rather than a charge for lending.\n\nOption B imports the **common law's** doctrine of precedent. Options C and D overstate: there are written sources, and commercial contract is not prohibited — the tradition regulates how transactions are structured, and trade is expressly contemplated.\n\nWhy it matters to an accountant is that a financing arrangement in such a jurisdiction is legally and commercially different from a conventional loan, which changes both the analysis and the accounting even where the economic effect resembles borrowing.\n\nThe three traditions are examined comparatively, so keeping each one's own mechanism attached to it is what the questions test.",
    earns: ["Keeping each tradition's defining mechanism attached to the right tradition"],
    loses: ["Attributing binding precedent to a system that is not a common law system"],
  },

  /* ── LWG-03 · Conflict of laws, treaties, institutions ───────── */

  "LWG-03::conflict-of-laws": {
    title: "What the conflict of laws problem actually is",
    format: "ot",
    marks: 2,
    requirement:
      "A seller in State A contracts with a buyer in State B. A dispute arises. The \"conflict of laws\" question is:\n\nA  Whether the contract is profitable\nB  Which state's law governs the contract, and which state's courts have jurisdiction\nC  Whether the goods conform to the contract\nD  Whether the parties acted in good faith",
    plan: [
      {
        step: "Separate the two questions conflict of laws answers",
        detail:
          "APPLICABLE LAW — which system's rules govern the contract — and JURISDICTION — which forum will hear the dispute. They are distinct and can point to different states.",
      },
      {
        step: "See why it arises at all",
        detail:
          "Two states' laws may both plausibly apply and may give different answers on the same facts. Until it is settled, no one knows what the obligations are.",
      },
      {
        step: "Reject the substantive questions",
        detail:
          "Conformity of goods and good faith are questions of substance, decided ONCE the applicable law is known. They are not the conflict question, they are what it unlocks.",
      },
      {
        step: "Name how commercial parties avoid it",
        detail:
          "An express **choice of law** clause and a **jurisdiction** or **arbitration** clause. Deciding it in advance is cheaper than litigating it, and this is the practical point the topic exists for.",
      },
    ],
    answer:
      "**B — which state's law governs the contract, and which state's courts have jurisdiction.**\n\nTwo distinct questions, which can point to different states: the **applicable law** and the **forum**.\n\nThe problem arises because two systems may both plausibly apply and may give different answers on identical facts — so until it is settled, neither party knows what its obligations are.\n\nConformity and good faith are questions of **substance**, answered once the applicable law is known. They are what the conflict question unlocks, not the question itself.\n\nCommercial parties resolve it in advance with an express **choice of law** clause and a **jurisdiction** or **arbitration** clause. Doing so is far cheaper than litigating it, and it is precisely why harmonising instruments such as the CISG exist — they reduce how much turns on the answer.",
    earns: [
      "Splitting applicable law from jurisdiction as two separate questions",
      "Naming choice of law and jurisdiction clauses as the practical answer",
    ],
    loses: ["Choosing a substantive question, which can only be answered after the conflict is resolved"],
  },

  "LWG-03::instruments": {
    title: "Telling a convention from a model law",
    format: "ot",
    marks: 2,
    requirement:
      "A **model law** differs from a convention in that a model law:\n\nA  Binds every state automatically\nB  Is a template states may adopt, adapt or ignore when legislating\nC  Can only be used by developing countries\nD  Has no legal effect once enacted by a state",
    plan: [
      {
        step: "Distinguish the two by how each takes effect",
        detail:
          "A CONVENTION is a treaty: a state that ratifies it is bound by its terms. A MODEL LAW is a template a state may enact, adapt or ignore, and it binds nobody until enacted.",
      },
      {
        step: "Note the consequence for uniformity",
        detail:
          "A convention produces closer uniformity, since ratifying states take the same text. A model law produces variation, since each state may adapt it — which is the price of its flexibility.",
      },
      {
        step: "Reject the option denying legal effect",
        detail:
          "Once a state enacts a model law it becomes that state's law and has full effect. Option D confuses the template's status with the enacted statute's.",
      },
      {
        step: "Attach an example to each",
        detail:
          "The CISG is a convention. The UNCITRAL Model Law on International Commercial Arbitration and the Model Law on International Credit Transfers are model laws. Knowing which is which is examined directly.",
      },
    ],
    answer:
      "**B — is a template states may adopt, adapt or ignore when legislating.**\n\nA **convention** is a treaty: a state that ratifies it is bound by its terms. A **model law** is a template that binds nobody until a state enacts it, and the state may adapt it in doing so.\n\nThe trade-off is uniformity against flexibility. A convention produces closer uniformity because ratifying states take the same text; a model law produces variation, which is the cost of being easier to adopt.\n\nOption D confuses the template with the enacted statute — once enacted it is that state's law and has full effect.\n\nThe examples matter and are tested directly: the **CISG** is a convention, while the **UNCITRAL Model Law on International Commercial Arbitration** and the **Model Law on International Credit Transfers** are model laws.",
    earns: [
      "Distinguishing the two by how each takes effect, and naming an example of each",
      "Stating the uniformity-versus-flexibility trade-off",
    ],
    loses: ["Denying legal effect to an enacted model law"],
  },

  "LWG-03::institutions": {
    title: "Matching an institution to what it actually does",
    format: "ot",
    marks: 2,
    requirement:
      "Which body's principal function is to prepare and promote instruments harmonising international trade law?\n\nA  The World Trade Organization\nB  UNCITRAL\nC  The International Chamber of Commerce\nD  The International Monetary Fund",
    plan: [
      {
        step: "Give each institution a one-line function",
        detail:
          "WTO: negotiates trade agreements and settles trade disputes between states. UNCITRAL: prepares harmonising instruments — conventions and model laws. ICC: produces commercial rules and practices such as Incoterms, and runs arbitration. IMF: monetary stability and balance of payments support.",
      },
      {
        step: "Read the stem for the function described",
        detail:
          "Preparing and promoting harmonising INSTRUMENTS is UNCITRAL's mandate — the United Nations Commission on International Trade Law, and the name states the function.",
      },
      {
        step: "Split UNCITRAL from the WTO carefully",
        detail:
          "The WTO also concerns international trade, but its work is agreements between STATES about trade barriers and their enforcement, not harmonising the private law of commercial transactions.",
      },
      {
        step: "Place the ICC precisely",
        detail:
          "The ICC is a private body of business, not an intergovernmental one. Incoterms and the UCP for letters of credit are its products, and they take effect by the parties incorporating them into contracts.",
      },
    ],
    answer:
      "**B — UNCITRAL.**\n\nThe United Nations Commission on International Trade Law prepares and promotes harmonising instruments — the CISG, the Model Law on International Commercial Arbitration, the Model Law on International Credit Transfers.\n\nThe **WTO** also concerns international trade, which is the intended confusion, but its work is agreements between **states** about trade barriers and the settlement of state-to-state disputes — not the private law of commercial transactions.\n\nThe **ICC** is a private body of business rather than an intergovernmental one, and its products — **Incoterms**, and the UCP for letters of credit — take effect because parties incorporate them into their contracts. That is a genuinely different route to legal effect and is examined in its own right.\n\nThe **IMF** deals with monetary stability and balance of payments support.",
    earns: [
      "Splitting UNCITRAL's private-law harmonisation from the WTO's state-to-state work",
      "Knowing ICC products bind through incorporation into the contract",
    ],
    loses: ["Choosing the WTO because the question mentions international trade"],
  },

  /* ── LWG-04 · Resolving a cross-border dispute ───────────────── */

  "LWG-04::the-options": {
    title: "Ranking the dispute resolution options by how binding they are",
    format: "ot",
    marks: 2,
    requirement:
      "Which dispute resolution process produces an outcome that is **not** binding on the parties unless they agree to it?\n\nA  Litigation\nB  Arbitration\nC  Mediation\nD  Expert determination",
    plan: [
      {
        step: "Rank the options by the outcome each produces",
        detail:
          "Negotiation and mediation: no binding outcome unless the parties agree one. Expert determination and arbitration: a binding decision. Litigation: a binding judgment enforceable by the state.",
      },
      {
        step: "Identify what a mediator does",
        detail:
          "A mediator FACILITATES a settlement. They have no power to decide and impose nothing — so the only binding thing that can emerge is an agreement the parties themselves reach.",
      },
      {
        step: "Split mediation from arbitration deliberately",
        detail:
          "An arbitrator DECIDES and the award is binding. Both are private and confidential, so candidates group them — but the power to impose an outcome is the whole difference.",
      },
      {
        step: "Note that expert determination is binding",
        detail:
          "An expert determines a technical question and the parties agree in advance to be bound. It is often confused with mediation because both involve a neutral third party.",
      },
    ],
    answer:
      "**C — mediation.**\n\nA mediator **facilitates** a settlement and has no power to decide. Nothing is imposed, so the only binding outcome is an agreement the parties reach themselves — which they may record as a settlement contract.\n\nAn **arbitrator decides**, and the award is binding and enforceable. Both processes are private and confidential, which is why they get grouped together, but the power to impose an outcome is the entire difference.\n\n**Expert determination** is also binding: the expert resolves a technical question and the parties agree in advance to accept it.\n\n**Litigation** produces a judgment enforceable by the state.\n\nThe practical ranking runs from negotiation, through mediation, to expert determination, arbitration and litigation — increasing in cost, formality and bindingness together.",
    earns: ["Ranking by whether a third party can impose an outcome"],
    loses: ["Grouping mediation with arbitration because both are private processes"],
  },

  "LWG-04::comparing": {
    title: "Choosing arbitration over litigation on commercial grounds",
    format: "mtq",
    marks: 6,
    requirement:
      "A company in State A has a supply contract with a company in State B. The contract is being negotiated and the parties must choose a dispute resolution clause.\n\n(i) State THREE advantages of arbitration over litigation for a cross-border contract of this kind.\n(ii) State TWO disadvantages of arbitration.\n(iii) State ONE matter the arbitration clause itself should specify.",
    plan: [
      {
        step: "Count the marks against the items asked for",
        detail:
          "Three advantages, two disadvantages, one clause matter — six items for six marks. That is one mark per item, so each needs a stated point and no more; writing a paragraph on the first earns one mark and costs the time for the rest.",
      },
      {
        step: "Choose advantages that matter to a CROSS-BORDER contract",
        detail:
          "The question names a cross-border contract, so generic advantages score less than the ones specific to it: enforceability of awards across borders, a neutral forum belonging to neither party's state, and choice of an arbitrator with relevant expertise.",
      },
      {
        step: "Give disadvantages that are real rather than the mirror of an advantage",
        detail:
          "Cost — arbitrators and the venue must be paid, while a court is provided by the state — and limited rights of appeal, since an award can normally be challenged only on narrow procedural grounds.",
      },
      {
        step: "Make part (iii) concrete",
        detail:
          "The seat of the arbitration, the number of arbitrators, the appointing institution, the procedural rules, or the language. Any one specified precisely; \"that disputes go to arbitration\" is the clause, not a matter within it.",
      },
    ],
    answer:
      "**(i) Three advantages of arbitration for a cross-border contract**\n\n**Enforceability across borders.** An arbitral award is enforceable in the many states party to the New York Convention, often more readily than a foreign court judgment — the single strongest commercial argument.\n\n**A neutral forum.** Neither party litigates in the other's home courts, removing the perception and the risk of home advantage.\n\n**Expertise and confidentiality.** The parties can appoint an arbitrator who understands the trade, and the proceedings are private, so a commercial dispute does not become public.\n\n**(ii) Two disadvantages**\n\n**Cost.** The parties pay the arbitrators, the institution and the venue; a court is provided by the state.\n\n**Limited appeal.** An award can normally be challenged only on narrow procedural grounds, so an arbitrator's error of substance may be final.\n\n**(iii) One matter the clause should specify**\n\nThe **seat** of the arbitration — which determines the procedural law and the courts that supervise the arbitration. The number of arbitrators, the appointing institution, the rules or the language would each also be acceptable.",
    earns: [
      "Giving exactly the number of items asked for, one mark each",
      "Choosing advantages specific to a cross-border contract rather than generic ones",
      "Naming the seat, or another specific term, rather than restating that there will be arbitration",
    ],
    loses: [
      "Writing three paragraphs on enforceability and never reaching parts (ii) and (iii)",
      "Offering \"it is quicker\" as an advantage without qualification — arbitration is not reliably quicker, and the marks are for defensible points",
    ],
  },

  /* ── LWG-05 · Arbitration under the UNCITRAL Model Law ───────── */

  "LWG-05::agreement": {
    title: "What an arbitration agreement takes away from the courts",
    format: "ot",
    marks: 2,
    requirement:
      "Under the UNCITRAL Model Law, where parties have a valid arbitration agreement and one party nevertheless sues in court, the court must:\n\nA  Hear the case, as court jurisdiction cannot be excluded\nB  Refer the parties to arbitration, if a party so requests not later than submitting its first statement on the substance\nC  Decide the dispute itself and then send it to arbitration\nD  Declare the arbitration agreement void",
    plan: [
      {
        step: "State the effect of a valid arbitration agreement",
        detail:
          "It removes the dispute from the courts. The Model Law requires a court before which an action is brought to refer the parties to arbitration where a valid agreement exists.",
      },
      {
        step: "Note the timing condition, which is what the question tests",
        detail:
          "The referral is on a party's request made not later than when it submits its first statement on the substance of the dispute (Article 8). A party that litigates the merits first has lost the point.",
      },
      {
        step: "Reject the option denying the agreement's effect",
        detail:
          "Option A says court jurisdiction cannot be excluded. Excluding it is precisely what an arbitration agreement does, and that is the foundation of the whole system.",
      },
      {
        step: "Reject the incoherent and the destructive options",
        detail:
          "C would have the court decide and then refer, which is meaningless. D would void the agreement, which the Model Law is designed to uphold rather than defeat.",
      },
    ],
    answer:
      "**B — refer the parties to arbitration, if a party so requests not later than submitting its first statement on the substance.**\n\nA valid arbitration agreement removes the dispute from the courts, and **Article 8** of the Model Law requires a court before which an action is brought to refer the parties to arbitration where such an agreement exists.\n\nThe **timing condition** is what the question turns on: the request must be made not later than when that party submits its first statement on the substance of the dispute. A party that litigates the merits and objects afterwards has lost the point.\n\nOption A denies that court jurisdiction can be excluded, which is the very thing an arbitration agreement does. C is incoherent, and D would defeat an agreement the Model Law exists to uphold.\n\nThe agreement must be in **writing**, and the doctrine of **separability** means it survives even if the main contract is held invalid.",
    earns: [
      "Knowing the timing limit on the request, not just that referral happens",
      "Naming separability, which keeps the agreement alive if the main contract fails",
    ],
    loses: ["Answering that court jurisdiction cannot be excluded by agreement"],
  },

  "LWG-05::tribunal": {
    title: "Composition of the tribunal and challenges to an arbitrator",
    format: "ot",
    marks: 2,
    requirement:
      "Under the UNCITRAL Model Law, where the parties have not agreed the number of arbitrators, the number is:\n\nA  One\nB  Three\nC  Five\nD  Determined by the court in every case",
    plan: [
      {
        step: "Recall the default rule",
        detail:
          "Failing agreement, the number of arbitrators is **three** (Article 10). Party autonomy comes first — the default applies only where the parties have not agreed.",
      },
      {
        step: "Understand why three is the default",
        detail:
          "Each party appoints one and those two appoint the third, so neither side faces a sole arbitrator it had no hand in choosing. Neutrality is what the number is protecting.",
      },
      {
        step: "Note the cost consequence, since it is examinable",
        detail:
          "Three arbitrators cost roughly three times one, which is why commercial parties often agree on a sole arbitrator for smaller disputes — an express choice that displaces the default.",
      },
      {
        step: "Reject the option removing party autonomy",
        detail:
          "Option D gives the court the decision in every case. The court's role is to assist where the appointment mechanism fails, not to determine composition as a matter of course.",
      },
    ],
    answer:
      "**B — three.**\n\n**Article 10** of the Model Law provides that failing agreement, the number of arbitrators is three. Party autonomy comes first, and the default only fills a gap.\n\nThree protects neutrality: each party appoints one arbitrator and those two appoint the presiding arbitrator, so neither side faces a sole arbitrator it had no part in choosing.\n\nThe cost consequence is why the default is often displaced — three arbitrators cost roughly three times one, so commercial parties frequently agree a sole arbitrator for smaller disputes.\n\nOption D misstates the court's role: it assists where the appointment mechanism fails, rather than determining composition as a matter of course.\n\nAn arbitrator may be **challenged** where circumstances give rise to justifiable doubts as to impartiality or independence, or where they lack qualifications the parties agreed.",
    earns: [
      "Knowing the default is three, and that party agreement displaces it",
      "Naming the grounds on which an arbitrator may be challenged",
    ],
    loses: ["Answering one, which is common in practice but is not the Model Law default"],
  },

  "LWG-05::proceedings-and-awards": {
    title: "On what grounds an award can be set aside",
    format: "ot",
    marks: 2,
    requirement:
      "Under the UNCITRAL Model Law, an arbitral award may be set aside by a court on the ground that:\n\nA  The tribunal reached the wrong conclusion on the facts\nB  A party was not given proper notice of the proceedings and so was unable to present its case\nC  One party is dissatisfied with the amount awarded\nD  The tribunal applied the law incorrectly",
    plan: [
      {
        step: "Fix the character of the grounds before reading the options",
        detail:
          "The grounds are essentially PROCEDURAL and jurisdictional, not substantive. A court reviewing an award does not re-decide the dispute, which is the whole reason arbitration is final.",
      },
      {
        step: "Recall the grounds themselves",
        detail:
          "Incapacity or an invalid agreement, lack of proper notice or inability to present a case, an award beyond the scope of the submission, improper composition or procedure, non-arbitrable subject matter, or conflict with public policy (Article 34).",
      },
      {
        step: "Test each option against that character",
        detail:
          "Wrong on the facts, wrong on the law, and dissatisfaction with the amount are all SUBSTANTIVE. None is a ground, however unjust the outcome may feel.",
      },
      {
        step: "Say why the grounds are so narrow",
        detail:
          "Finality is what the parties bargained for. If awards could be reviewed on the merits, arbitration would become a first stage of litigation and lose the advantage it was chosen for.",
      },
    ],
    answer:
      "**B — a party was not given proper notice of the proceedings and so was unable to present its case.**\n\nThe grounds in **Article 34** are procedural and jurisdictional: incapacity or an invalid arbitration agreement, lack of proper notice or inability to present a case, an award going beyond the scope of the submission, improper composition or procedure, subject matter not capable of arbitration, or conflict with public policy.\n\nOptions A, C and D are all **substantive**. A court reviewing an award does not re-decide the dispute, so being wrong on the facts or the law is not a ground however unjust it feels.\n\nThe narrowness is deliberate: **finality** is what the parties bargained for, and if awards could be reviewed on the merits, arbitration would become the first stage of litigation and lose the advantage it was chosen for.\n\nThe grounds for **refusing enforcement** are substantially the same, which is why the New York Convention makes awards so widely enforceable.",
    earns: [
      "Recognising the grounds as procedural and jurisdictional only",
      "Explaining the narrowness by reference to finality",
    ],
    loses: ["Treating an error of law as a ground, which would convert review into an appeal"],
  },
}
