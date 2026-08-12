/*
 * LW-ENG Area A — essential elements of the English legal system.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * LW sets objective tests at 1 and 2 marks plus five multi-task questions at 6
 * marks, so nothing here is written as an essay.
 *
 * An English law paper's distractors are mostly a REAL RULE FROM AN ADJACENT
 * DOCTRINE: obiter offered as ratio, the literal rule offered as the mischief
 * rule, a county court's jurisdiction offered as the High Court's. So these plans
 * fix which doctrine or court is in issue before any rule is selected.
 *
 * Where a statute's wording or a case's formula is quoted, the section or case is
 * cited beside it — the condition on which quoting authority is legitimate.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWE_PLANS_A: ExamPlanMap = {
  /* ── LWE-01 · What law is, and the criminal/civil divide ─────── */

  "LWE-01::what-law-is": {
    title: "What distinguishes a legal rule from any other rule",
    format: "ot",
    marks: 2,
    requirement:
      "What distinguishes a rule of law from a rule of morality or of a private club?\n\nA  It is always written down\nB  It is enforced by the state through its courts, and carries a sanction the state will apply\nC  Everybody agrees with it\nD  It cannot be changed",
    plan: [
      {
        step: "Identify the feature that is unique to law",
        detail:
          "State enforcement. A moral rule may be widely held and a club rule may bind members, but neither can be enforced by the courts with a sanction the state applies.",
      },
      {
        step: "Reject the written-form option",
        detail:
          "Much English law is unwritten in the statutory sense — the common law is made by judicial decision. So being written down cannot be the distinguishing feature.",
      },
      {
        step: "Reject the consensus option",
        detail:
          "Law does not require agreement. Contested statutes remain law, and unpopularity is not invalidity — which is the practical point behind parliamentary supremacy.",
      },
      {
        step: "Reject the immutability option",
        detail:
          "Law changes constantly, by statute and by judicial development. Changeability is a feature of law, not a disqualification from it.",
      },
    ],
    answer:
      "**B — it is enforced by the state through its courts, and carries a sanction the state will apply.**\n\nEnforceability by the state is the feature unique to law. A moral rule may be more widely held and a club rule may genuinely bind its members, but neither can be enforced by a court with a sanction the state will apply.\n\nMuch English law is unwritten in the statutory sense — the **common law** is made by judicial decision — so being written down is not the test. Law does not require consensus: a contested statute is still law, which is what parliamentary supremacy means in practice. And law changes constantly, by statute and by judicial development.\n\nThe sources of English law are **legislation**, **case law**, and **EU-derived and Convention rights** as they continue to operate, with **custom** and **equity** in the historical background.",
    earns: ["Naming state enforcement as the distinguishing feature"],
    loses: ["Requiring law to be written, which would exclude the common law"],
  },

  "LWE-01::criminal-civil": {
    title: "Reading the two liabilities as independent",
    format: "ot",
    marks: 2,
    requirement:
      "A driver is prosecuted for careless driving and acquitted. The person injured in the same incident then sues in negligence. The civil claim:\n\nA  Must fail, because the driver was acquitted\nB  May succeed, because the civil standard of proof is lower\nC  Cannot be brought at all\nD  Must succeed, because proceedings were brought",
    plan: [
      {
        step: "Separate the two proceedings",
        detail:
          "A prosecution is brought by the state to punish. A negligence claim is brought by the injured party to compensate. Different claimants, different purposes, different outcomes possible.",
      },
      {
        step: "Compare the standards of proof",
        detail:
          "Criminal: beyond reasonable doubt. Civil: on the balance of probabilities. So conduct not proved to the criminal standard may still be proved to the civil one.",
      },
      {
        step: "Read the acquittal for what it means",
        detail:
          "An acquittal means the prosecution failed to prove guilt beyond reasonable doubt. It is not a finding that the driver was careful, so it does not settle the civil question.",
      },
      {
        step: "Reject the option that assumes proceedings decide anything",
        detail:
          "Bringing a claim proves nothing. Option D reverses the burden of proof, which always rests on the claimant in a civil action.",
      },
    ],
    answer:
      "**B — may succeed, because the civil standard of proof is lower.**\n\nThe two proceedings are independent. A prosecution is brought by the **state** to punish, on proof **beyond reasonable doubt**. A negligence claim is brought by the **injured party** to compensate, on the **balance of probabilities**.\n\nAn acquittal means the prosecution failed to prove guilt to the criminal standard. It is **not** a finding that the driver was careful, so it leaves the civil question open — and conduct not provable beyond reasonable doubt may well be provable on the balance of probabilities.\n\nOption D reverses the burden, which always rests on the claimant in a civil action.\n\nThe vocabulary differs too and is examined: prosecutor and defendant, guilty or not guilty, punishment — against claimant and defendant, liable or not liable, and a remedy.",
    earns: [
      "Reading an acquittal as a failure of proof rather than a finding of innocence",
      "Using the difference in standards to explain how both outcomes coexist",
    ],
    loses: ["Treating an acquittal as binding on the civil court"],
  },

  /* ── LWE-02 · Courts, tribunals and appeals ─────────────────── */

  "LWE-02::civil-courts": {
    title: "Where a civil claim starts, and where an appeal goes",
    format: "ot",
    marks: 2,
    requirement:
      "An appeal from a decision of the High Court in a civil matter normally goes to:\n\nA  The County Court\nB  The Court of Appeal (Civil Division)\nC  The Supreme Court directly\nD  The Crown Court",
    plan: [
      {
        step: "Set the civil hierarchy out in order",
        detail:
          "County Court and High Court at first instance → Court of Appeal (Civil Division) → Supreme Court. Appeals travel upward, never sideways or down.",
      },
      {
        step: "Reject the downward and sideways options",
        detail:
          "The County Court is below the High Court, so an appeal cannot go there. The Crown Court is a criminal court and has no place in a civil appeal at all.",
      },
      {
        step: "Handle the Supreme Court option precisely",
        detail:
          "The Supreme Court is the final appellate court, but the normal route runs through the Court of Appeal. A direct appeal — the leapfrog procedure — is exceptional and requires permission.",
      },
      {
        step: "Note what determines the court of first instance",
        detail:
          "Value and complexity. Smaller and simpler claims go to the County Court, larger and more complex ones to the High Court and its divisions — Chancery, King's Bench and Family.",
      },
    ],
    answer:
      "**B — the Court of Appeal (Civil Division).**\n\nThe civil hierarchy runs: **County Court** and **High Court** at first instance → **Court of Appeal (Civil Division)** → **Supreme Court**. Appeals travel upward only.\n\nThe County Court sits below the High Court, so an appeal cannot go there, and the Crown Court is a criminal court with no role in a civil appeal.\n\nThe Supreme Court is the final appellate court but is not the normal next step: a direct appeal bypassing the Court of Appeal is the **leapfrog** procedure and is exceptional, requiring permission.\n\nWhich court hears a claim at first instance turns on **value and complexity** — smaller and simpler claims in the County Court, larger and more complex ones in the High Court's Chancery, King's Bench and Family Divisions.\n\nThis hierarchy is also what makes precedent work, since a court is bound by those above it.",
    earns: [
      "Knowing the leapfrog route exists but is exceptional",
      "Connecting the hierarchy to how precedent operates",
    ],
    loses: ["Sending a civil appeal to the Crown Court"],
  },

  "LWE-02::criminal-courts-tribunals": {
    title: "Which court tries which criminal offence",
    format: "ot",
    marks: 2,
    requirement:
      "An indictable-only offence is tried in the:\n\nA  Magistrates' Court\nB  Crown Court, before a judge and jury\nC  County Court\nD  Employment Tribunal",
    plan: [
      {
        step: "Classify offences by mode of trial",
        detail:
          "Summary: Magistrates' Court only. Either-way: Magistrates' or Crown Court. Indictable-only: Crown Court, before a judge and jury.",
      },
      {
        step: "Match the stem's classification",
        detail:
          "Indictable-only means the Crown Court and nowhere else. Every criminal case still begins in the Magistrates' Court, but an indictable-only offence is sent up for trial.",
      },
      {
        step: "Strike the two civil forums",
        detail:
          "The County Court is civil and the Employment Tribunal hears employment claims. Neither tries crime, so both can be eliminated without any knowledge of offence classification.",
      },
      {
        step: "Note what tribunals do, since Area C depends on it",
        detail:
          "Tribunals are specialist bodies. The Employment Tribunal hears unfair dismissal, redundancy and discrimination claims, with appeal to the Employment Appeal Tribunal on a point of law.",
      },
    ],
    answer:
      "**B — the Crown Court, before a judge and jury.**\n\nOffences are classified by mode of trial: **summary** offences in the Magistrates' Court only; **either-way** offences in either court; **indictable-only** offences in the Crown Court before a judge and jury.\n\nEvery criminal case begins in the Magistrates' Court, but an indictable-only offence is **sent up** for trial rather than tried there.\n\nThe County Court and the Employment Tribunal are civil forums and try no crime at all, so both can be struck without knowing anything about offence classification.\n\nTribunals matter for Area C: the **Employment Tribunal** hears unfair dismissal, redundancy and discrimination claims, with appeal to the **Employment Appeal Tribunal** on a point of law. They are cheaper, quicker and less formal than courts, which is why employment disputes are routed there.",
    earns: [
      "Eliminating civil forums first, then classifying by mode of trial",
      "Knowing the Employment Tribunal route and its appeal on a point of law",
    ],
    loses: ["Trying an indictable-only offence in the Magistrates' Court because cases start there"],
  },

  /* ── LWE-03 · Case law and judicial precedent ────────────────── */

  "LWE-03::ratio-obiter": {
    title: "What part of a judgment actually binds",
    format: "ot",
    marks: 2,
    requirement:
      "The binding element of a judicial decision is the:\n\nA  Obiter dicta — the judge's observations on hypothetical facts\nB  Ratio decidendi — the legal reasoning essential to the decision on the facts\nC  Whole of the judgment, including every remark\nD  Judge's summary of the parties' arguments",
    plan: [
      {
        step: "Define the two terms against each other",
        detail:
          "RATIO DECIDENDI: the legal reasoning necessary to reach the decision on these facts. It binds. OBITER DICTA: everything said by the way. It persuades but does not bind.",
      },
      {
        step: "Apply the necessity test",
        detail:
          "Ask whether the statement was essential to the outcome. If the decision would have been the same without it, it is obiter — which is how a judgment is dissected in practice.",
      },
      {
        step: "Note that obiter is not worthless",
        detail:
          "Obiter from a senior court carries considerable persuasive weight and is frequently followed. Persuasive is not the same as binding, and the difference is what the question tests.",
      },
      {
        step: "Reject the whole-judgment option",
        detail:
          "If everything bound, a judge could legislate on any subject in passing. Restricting the binding element to what was necessary keeps precedent tied to decided facts.",
      },
    ],
    answer:
      "**B — ratio decidendi, the legal reasoning essential to the decision on the facts.**\n\nThe **ratio decidendi** is the legal reasoning necessary to reach the decision on those facts, and only that binds. **Obiter dicta** — remarks said by the way, including observations on hypothetical facts — persuade but do not bind.\n\nThe working test is **necessity**: would the decision have been the same without this statement? If so, it is obiter.\n\nObiter is not worthless. Obiter from the Supreme Court carries substantial persuasive weight and is often followed — but persuasive and binding are different things, which is the whole point.\n\nOption C would let a judge legislate on any subject in passing. Confining the binding element to what was necessary keeps precedent tied to decided facts, which is what makes the doctrine workable rather than arbitrary.",
    earns: [
      "Applying the necessity test rather than reciting the definitions",
      "Knowing obiter is persuasive without being binding",
    ],
    loses: ["Treating the whole judgment as binding"],
  },

  "LWE-03::escaping-precedent": {
    title: "How a court avoids an earlier decision",
    format: "ot",
    marks: 2,
    requirement:
      "A court finds that the material facts before it differ from those of an apparently binding earlier decision, and declines to apply it. This is:\n\nA  Overruling\nB  Distinguishing\nC  Reversing\nD  Disapproving",
    plan: [
      {
        step: "Define each technique by who does what to which decision",
        detail:
          "DISTINGUISHING: the material facts differ, so the precedent does not apply. OVERRULING: a higher court declares an earlier decision in a DIFFERENT case wrong. REVERSING: an appeal court changes the outcome in the SAME case.",
      },
      {
        step: "Match the stem's mechanism",
        detail:
          "The facts differ and the precedent is not applied. That is distinguishing, and it is the technique available to a court of any level.",
      },
      {
        step: "Split overruling from reversing on which case",
        detail:
          "Overruling concerns a different, earlier case. Reversing concerns the same case on appeal. Candidates use the words interchangeably, and the distinction is examined directly.",
      },
      {
        step: "Note why distinguishing matters practically",
        detail:
          "A lower court cannot overrule, so distinguishing is its only legitimate escape from an inconvenient precedent — which is why the flexibility of the doctrine largely rests on it.",
      },
    ],
    answer:
      "**B — distinguishing.**\n\nThe material facts differ, so the precedent does not apply. **Distinguishing** is available to a court of any level, which matters because a lower court **cannot overrule** — so distinguishing is its only legitimate escape from an inconvenient precedent, and most of the doctrine's flexibility rests on it.\n\nThe two words candidates use interchangeably must be kept apart. **Overruling** is a higher court declaring an earlier decision in a **different** case wrong. **Reversing** is an appeal court changing the outcome in the **same** case. Different cases, different mechanisms.\n\n**Disapproving** falls short of overruling: the court expresses doubt without deciding the point.\n\nThe advantages of precedent are certainty, consistency and efficiency; its disadvantages are rigidity, the bulk of case law, and the risk that distinguishing is used artificially to escape a precedent the court simply dislikes.",
    earns: [
      "Splitting overruling from reversing on whether it is the same case",
      "Knowing distinguishing is the only route open to a lower court",
    ],
    loses: ["Using overruling and reversing as synonyms"],
  },

  /* ── LWE-04 · Legislation and delegated legislation ──────────── */

  "LWE-04::primary-legislation": {
    title: "What parliamentary supremacy means for a court",
    format: "ot",
    marks: 2,
    requirement:
      "A court finds that a clear provision of an Act of Parliament produces a result the judges consider unjust. The court must:\n\nA  Refuse to apply the Act\nB  Apply the Act, since Parliament is supreme, though it may express its concerns\nC  Amend the Act to remove the injustice\nD  Refer the Act to the Supreme Court for cancellation",
    plan: [
      {
        step: "State what supremacy entails",
        detail:
          "Parliament may make or unmake any law, and no court may set aside an Act of Parliament. A court's function is to interpret and apply, not to review validity.",
      },
      {
        step: "Identify what the court can legitimately do",
        detail:
          "Apply the Act, and say in its judgment that the result is unsatisfactory. Judicial criticism is a recognised prompt for legislative amendment, and it is the honest route.",
      },
      {
        step: "Reject the three options that assume a striking-down power",
        detail:
          "Refusing to apply, amending, or referring for cancellation all assume a power over primary legislation that no English court has.",
      },
      {
        step: "Note the one genuine qualification",
        detail:
          "Under the Human Rights Act 1998 a court may make a DECLARATION OF INCOMPATIBILITY, which does not invalidate the Act or affect the parties — it signals to Parliament and leaves the Act in force.",
      },
    ],
    answer:
      "**B — apply the Act, since Parliament is supreme, though it may express its concerns.**\n\nParliamentary supremacy means Parliament may make or unmake any law and **no court may set aside an Act of Parliament**. The court's function is to interpret and apply, not to review validity — so options A, C and D all assume a power no English court has.\n\nWhat a court can legitimately do is apply the Act and say in its judgment that the result is unsatisfactory. Judicial criticism is a recognised prompt for amendment.\n\nThe one genuine qualification is worth stating precisely: under the **Human Rights Act 1998** a court may make a **declaration of incompatibility**. That does **not** invalidate the Act, does not change the outcome for the parties, and leaves the provision in force — it signals to Parliament and leaves the remedy to Parliament.\n\n**Delegated** legislation is different: it can be struck down as **ultra vires**, because it is made under a power with limits.",
    earns: [
      "Knowing a declaration of incompatibility leaves the Act in force",
      "Distinguishing primary legislation from delegated legislation, which can be ultra vires",
    ],
    loses: ["Attributing a striking-down power over statute to the courts"],
  },

  "LWE-04::delegated-legislation": {
    title: "How delegated legislation is controlled",
    format: "ot",
    marks: 2,
    requirement:
      "A statutory instrument goes beyond the power conferred by its enabling Act. A court may:\n\nA  Do nothing, as it is legislation\nB  Declare it void as ultra vires\nC  Amend it to bring it within the power\nD  Only refer it back to the minister",
    plan: [
      {
        step: "Identify the source of the difference from primary legislation",
        detail:
          "Delegated legislation is made under a power granted by an enabling Act. A power has limits, so an instrument exceeding them is void — which is exactly what cannot be said of the Act itself.",
      },
      {
        step: "Name the ground",
        detail:
          "ULTRA VIRES — beyond the powers. It covers exceeding the substantive power and failing to follow a required procedure.",
      },
      {
        step: "Reject the amendment option",
        detail:
          "A court declares the instrument void; it does not redraft it. Amending would put the court in the legislator's position, which judicial review deliberately avoids.",
      },
      {
        step: "Recall the parliamentary controls as well",
        detail:
          "Affirmative and negative resolution procedures, scrutiny committees, and the enabling Act's own limits. Judicial control operates alongside parliamentary control rather than instead of it.",
      },
    ],
    answer:
      "**B — declare it void as ultra vires.**\n\nDelegated legislation is made under a power conferred by an **enabling Act**, and a power has limits. An instrument exceeding them is void as **ultra vires** — which covers both exceeding the substantive power and failing to follow a required procedure.\n\nThat is precisely the difference from primary legislation, which no court may set aside.\n\nA court **declares** the instrument void; it does not redraft it, because amending would put the court in the legislator's position — which judicial review exists to avoid.\n\nThe **parliamentary** controls run alongside: affirmative and negative resolution procedures, scrutiny committees, and the limits written into the enabling Act itself.\n\nThe forms are statutory instruments, byelaws and Orders in Council. Delegated legislation exists because Parliament has neither the time nor the technical expertise for every detail, and it allows rapid amendment — at the cost of volume and limited scrutiny.",
    earns: [
      "Grounding the difference in the enabling Act's limits",
      "Knowing the court declares void rather than amending",
    ],
    loses: ["Treating delegated legislation as immune in the way primary legislation is"],
  },

  /* ── LWE-05 · Statutory interpretation ──────────────────────── */

  "LWE-05::the-rules": {
    title: "Identifying the approach a court has taken",
    format: "ot",
    marks: 2,
    requirement:
      "A judge identifies the defect in the previous law that an Act was passed to remedy, and interprets the Act so as to cure that defect. The approach is the:\n\nA  Literal rule\nB  Golden rule\nC  Mischief rule\nD  Ejusdem generis rule",
    plan: [
      {
        step: "Match each approach to what the judge looks at",
        detail:
          "LITERAL: the ordinary meaning of the words. GOLDEN: the literal meaning, departed from where it produces an absurdity. MISCHIEF: the defect the Act was passed to cure. PURPOSIVE: the Act's broader purpose.",
      },
      {
        step: "Read the stem for what the judge examined",
        detail:
          "The defect in the previous law that the Act was passed to remedy. That is the mischief rule stated in its own terms.",
      },
      {
        step: "Split the mischief rule from the golden rule",
        detail:
          "The golden rule starts from the literal meaning and departs only to avoid absurdity. The mischief rule looks outside the words from the start, to the problem being solved.",
      },
      {
        step: "Strike the option that is a different kind of rule",
        detail:
          "Ejusdem generis is a rule of LANGUAGE — general words following specific ones take their meaning from those specifics — not an approach to meaning. An option from the wrong category is a free elimination.",
      },
    ],
    answer:
      "**C — the mischief rule.**\n\nThe judge looked at the defect in the previous law that the Act was passed to remedy, which is the mischief rule in its own terms.\n\nThe approaches differ by what the judge examines. **Literal**: the ordinary meaning of the words. **Golden**: the literal meaning, departed from where it would produce an absurdity. **Mischief**: the defect being cured. **Purposive**: the Act's broader purpose, now the dominant approach.\n\nThe golden and mischief rules are the pair to keep apart: the golden rule **starts** from the literal meaning and departs only to avoid absurdity, while the mischief rule looks outside the words from the beginning.\n\n**Ejusdem generis** belongs to a different category — it is a rule of **language**, under which general words following specific ones take their meaning from those specifics — alongside *noscitur a sociis* and *expressio unius est exclusio alterius*.",
    earns: [
      "Splitting the golden rule from the mischief rule on where the judge starts",
      "Recognising an option drawn from the rules of language rather than the approaches to meaning",
    ],
    loses: ["Choosing the golden rule, which also departs from the literal words"],
  },

  "LWE-05::presumptions-aids": {
    title: "The presumptions a court applies to a statute",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a presumption applied in statutory interpretation?\n\nA  That a statute does not apply retrospectively unless it says so\nB  That a statute always favours the individual over the state\nC  That a statute expires after ten years\nD  That a statute may be ignored if unclear",
    plan: [
      {
        step: "Recall the presumptions",
        detail:
          "Against retrospective effect; against altering the common law more than necessary; against removing an established right; in favour of requiring mens rea in a criminal offence; against ousting the courts' jurisdiction; that the Crown is not bound unless stated.",
      },
      {
        step: "Match the option to the list",
        detail:
          "Non-retrospectivity is the first and most frequently examined. Its rationale is fairness — conduct should be judged by the law in force when it occurred.",
      },
      {
        step: "Note that presumptions are rebuttable",
        detail:
          "Each yields to clear contrary wording. A presumption is a starting point, not a rule, and Parliament may displace it expressly.",
      },
      {
        step: "Reject the three inventions",
        detail:
          "No presumption favours the individual generally, statutes do not expire on a timetable, and an unclear statute must still be interpreted and applied rather than ignored.",
      },
    ],
    answer:
      "**A — that a statute does not apply retrospectively unless it says so.**\n\nThe recognised presumptions are: against **retrospective** effect; against altering the **common law** more than necessary; against removing an **established right**; in favour of requiring **mens rea** in a criminal offence; against **ousting** the courts' jurisdiction; and that the **Crown** is not bound unless stated.\n\nNon-retrospectivity rests on fairness — conduct should be judged by the law in force when it occurred.\n\nEvery presumption is **rebuttable** by clear contrary wording: it is a starting point, not a rule, and Parliament may displace it expressly.\n\nThe other options are inventions. An unclear statute must still be interpreted and applied — a court cannot decline.\n\nThe **aids** available are worth holding separately: intrinsic aids such as the long title, preamble, headings and interpretation sections, and extrinsic aids such as dictionaries, the Interpretation Act 1978, and Hansard within limits.",
    earns: [
      "Knowing presumptions are rebuttable starting points",
      "Keeping the presumptions distinct from the intrinsic and extrinsic aids",
    ],
    loses: ["Inventing a presumption that a statute favours the individual"],
  },

  /* ── LWE-06 · Human rights ──────────────────────────────────── */

  "LWE-06::the-mechanism": {
    title: "How Convention rights operate in English law",
    format: "ot",
    marks: 2,
    requirement:
      "Under the Human Rights Act 1998, where a statutory provision cannot be read compatibly with a Convention right, a higher court may:\n\nA  Strike down the provision\nB  Make a declaration of incompatibility, leaving the provision in force\nC  Amend the provision\nD  Award damages against Parliament",
    plan: [
      {
        step: "State the interpretive obligation first",
        detail:
          "So far as it is possible to do so, legislation must be read and given effect compatibly with Convention rights (s3). Interpretation comes first, and it resolves most cases.",
      },
      {
        step: "Say what happens when interpretation cannot bridge the gap",
        detail:
          "A higher court may make a declaration of incompatibility (s4). It does not invalidate the provision, does not bind the parties to a different outcome, and leaves the remedy to Parliament.",
      },
      {
        step: "Connect it to parliamentary supremacy",
        detail:
          "The Act was deliberately designed this way. A striking-down power would subordinate Parliament to the courts, so the declaration signals without overriding.",
      },
      {
        step: "Note the obligation on public authorities",
        detail:
          "It is unlawful for a public authority to act incompatibly with a Convention right (s6), and a victim may bring proceedings. That is where the Act bites directly, unlike the declaration.",
      },
    ],
    answer:
      "**B — make a declaration of incompatibility, leaving the provision in force.**\n\nThe Act works in two stages. First, **section 3**: so far as it is possible to do so, legislation must be read and given effect compatibly with Convention rights — and interpretation resolves most cases. Where it cannot, **section 4** allows a higher court to make a **declaration of incompatibility**.\n\nThat declaration does **not** invalidate the provision, does not change the outcome for the parties, and leaves the remedy to Parliament.\n\nThe design is deliberate: a striking-down power would subordinate Parliament to the courts, so the declaration signals without overriding — which is the whole architecture of the Act.\n\nWhere the Act does bite directly is **section 6**: it is unlawful for a **public authority** to act incompatibly with a Convention right, and a victim may bring proceedings and obtain a remedy.\n\nThe rights most relevant commercially are a fair trial (Article 6), privacy (Article 8) and peaceful enjoyment of possessions.",
    earns: [
      "Setting out the section 3 interpretive duty before the section 4 declaration",
      "Knowing section 6 is where the Act creates a directly enforceable claim",
    ],
    loses: ["Attributing a striking-down power to the Human Rights Act"],
  },
}
