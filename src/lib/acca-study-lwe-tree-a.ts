import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area A — essential elements of the legal system.
 * Chapters 1–6 of the LW-ENG reading tree, mapped to syllabus groups A1–A2.
 *
 * ── Why this is a separate tree from LW-GLOBAL ─────────────────
 * LW is one paper id with two genuinely different syllabuses. Area A overlaps in
 * THEME — both variants ask what law is and where it comes from — but not in content:
 * Global teaches legal traditions, conflict of laws and the international
 * institutions, because a Global learner cannot be assumed to sit in any one court
 * system. ENG teaches ONE system, and teaches it concretely: the English courts by
 * name, precedent as it actually binds them, English statutory interpretation, and
 * the Human Rights Act. Where the Global tree says "the rule the scenario supplies",
 * this tree names the rule.
 *
 * ── What earns marks in a law paper ───────────────────────────
 * Nothing here is computed. Marks come from applying a rule to facts and reaching a
 * conclusion, so these chapters lean on `definition` blocks for the rule,
 * `illustration` for a concrete instance, and `example` steppers that build an answer
 * the way an examiner wants one: identify the rule, state its elements, apply each
 * element to the facts, conclude. Every worked example ends on the point that DECIDES
 * the answer, not a restatement of the rule.
 *
 * Structure follows the official ACCA LW-ENG study guide. All wording is ORIGINAL
 * Scholify teaching text — the approved-provider texts were used only as a benchmark
 * for structure and depth, never as a source of prose. Statutory wording and the
 * standard case formulas are quoted as quotations, with the section or case named.
 */

/* ── Chapter 1 · A1(a) ─────────────────────────────────────────── */

export const LWE_TREE_01: StudyChapter = {
  id: "LWE-01",
  number: 1,
  paper: "LW",
  area: "A",
  title: "What law is, and the criminal/civil divide",
  minutes: 15,
  syllabusRefs: ["A1(a)"],
  intro:
    "Two courts can hear the same set of facts and reach opposite results without either being wrong — because they are asking different questions, to different standards, for different purposes. Getting that divide right is the first mark on the paper and the foundation of every answer after it.",
  outcomes: [
    "Define law and say what makes a rule a legal rule rather than a social one",
    "Separate criminal from civil liability by purpose, parties, standard of proof and outcome",
    "Distinguish public from private law, and common law from equity",
    "Decide, on given facts, whether the matter is criminal, civil, or both at once",
  ],
  sections: [
    {
      id: "what-law-is",
      heading: "What makes a rule a legal rule",
      blocks: [
        {
          kind: "definition",
          term: "Law",
          md: "A body of rules **enforceable by the state**, governing the conduct of people and organisations, and imposing consequences where they are broken. The enforceability is the whole distinction: a social convention may carry a real cost in reputation, but only a legal rule can be enforced through a court against an unwilling party.",
        },
        {
          kind: "table",
          caption: "The classifications the syllabus expects",
          head: ["Division", "What separates the two"],
          rows: [
            ["**Criminal** and **civil**", "Whether the state is punishing an offence, or one party is seeking a remedy from another"],
            ["**Public** and **private**", "Whether the state is a party in its governing capacity (constitutional, administrative, criminal) or the dispute is between private persons (contract, tort, property)"],
            ["**Common law** and **equity**", "Whether the rule came from the old common-law courts, with **damages** as its remedy, or from Chancery, with **discretionary** remedies such as injunction and specific performance"],
            ["**Common law** and **statute**", "Whether the rule was made by judges deciding cases, or enacted by Parliament — and statute prevails over any inconsistent judge-made rule"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why equity still matters as a separate idea",
          md: "Equity was built to fix the common law's rigidity, and it kept two features that still decide exam questions. Its remedies are **discretionary** — a claimant is *entitled* to damages once a breach is proved, but must *persuade* a court to grant specific performance. And it acts on conscience, so a claimant who has behaved badly may be refused a remedy that a strict legal right would have given. When a question asks why a claimant got damages rather than the performance they actually wanted, this is the reason.",
        },
      ],
      check: {
        q: "A supplier proves that a buyer breached a contract. What is the supplier entitled to, and what must it argue for?",
        options: [
          "It must argue for both damages and specific performance",
          "It is entitled to damages as of right; specific performance is discretionary and must be argued for",
          "It is entitled to specific performance, damages being a fallback",
          "Both remedies follow automatically from proof of breach",
        ],
        correct: 1,
        explain:
          "DAMAGES follow as of right once breach is proved, because damages are the COMMON LAW remedy. SPECIFIC PERFORMANCE is EQUITABLE and therefore DISCRETIONARY — the court weighs whether damages would be adequate and how the claimant has behaved. That is why a claimant who wants the actual performance cannot simply demand it.",
      },
    },
    {
      id: "criminal-civil",
      heading: "Criminal and civil liability, side by side",
      blocks: [
        {
          kind: "table",
          caption: "The comparison that decides these questions",
          head: ["", "Criminal", "Civil"],
          rows: [
            ["**Purpose**", "**Punish** the offender and deter others", "**Compensate** the claimant, or otherwise put matters right"],
            ["**Who brings it**", "The state, normally through the **Crown Prosecution Service**", "The injured party, as **claimant**"],
            ["**Name of the parties**", "**Prosecutor** and **defendant**", "**Claimant** and **defendant**"],
            ["**Standard of proof**", "**Beyond reasonable doubt** — deliberately high", "**On the balance of probabilities** — more likely than not"],
            ["**Where it starts**", "**Magistrates' court**, serious cases going to the **Crown Court**", "**County Court** or the **High Court**, by value and complexity"],
            ["**Outcome**", "**Conviction** and a sentence — imprisonment, fine, community order", "**Judgment** for the claimant — damages, injunction, or another remedy"],
            ["**If it fails**", "**Acquittal** — the defendant is not guilty", "Claim **dismissed** — no liability established"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "One set of facts can produce both, and the results need not match",
          md: "The same conduct frequently gives rise to a prosecution **and** a civil claim, and because the **standards of proof differ** the two can come out differently without contradiction. A driver acquitted of causing death by dangerous driving may still be held liable in negligence, because the prosecution could not prove its case beyond reasonable doubt while the claimant only had to show it was more likely than not. Scenarios exploit this constantly: an acquittal is **not** an answer to a civil claim.",
        },
        {
          kind: "example",
          title: "Sorting one set of facts into two actions",
          scenario:
            "Halloway drives a delivery van for Trentmoor Logistics while over the drink-drive limit and collides with a parked car belonging to Ferris, injuring Ferris's passenger. Halloway is prosecuted for driving with excess alcohol. Ferris wants the cost of the repairs, and the passenger wants compensation for the injury. Halloway is acquitted of the driving offence because of a defect in the breath-test procedure.",
          steps: [
            { label: "Identify the criminal action and its purpose", detail: "The prosecution for excess alcohol is CRIMINAL, brought by the state to PUNISH. It must be proved BEYOND REASONABLE DOUBT, and the procedural defect in the evidence means that standard is not met." },
            { label: "Identify the civil actions", detail: "Ferris's claim for the repairs and the passenger's claim for the injury are CIVIL claims in NEGLIGENCE, brought by the injured parties to obtain COMPENSATION, and proved ON THE BALANCE OF PROBABILITIES." },
            { label: "Ask whether the acquittal defeats the civil claims", detail: "It does NOT. The acquittal means the higher criminal standard was not satisfied, not that Halloway drove carefully. On the balance of probabilities the claimants can still show a breach of the duty of care." },
            { label: "Identify who else may be liable", detail: "Halloway was driving in the course of employment, so Trentmoor may be VICARIOUSLY liable to both claimants — which usually matters commercially, since the employer is more likely to be able to pay (chapter 20)." },
          ],
          result:
            "The acquittal disposes of the criminal case only. Both civil claims may succeed, and Trentmoor may be liable alongside Halloway. The lesson to carry into every scenario is that **different standards of proof produce different answers on identical facts**.",
        },
      ],
      check: {
        q: "A defendant is acquitted of a criminal charge arising from an accident. What is the effect on a civil negligence claim on the same facts?",
        options: [
          "The civil claim must be dismissed, since the facts have been decided",
          "None in itself — the civil claim applies the lower balance-of-probabilities standard and may still succeed",
          "The civil claim can proceed only if the acquittal is appealed",
          "The civil claim automatically succeeds, because the matter has been to court",
        ],
        correct: 1,
        explain:
          "NO EFFECT in itself. An acquittal means the prosecution failed to prove its case BEYOND REASONABLE DOUBT. A civil claimant only has to prove liability ON THE BALANCE OF PROBABILITIES, so the same facts can produce civil liability after a criminal acquittal. Neither does the acquittal help the claimant — it decides nothing in the civil action.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a criminal acquittal as a defence to a civil claim on the same facts.",
      fix: "The standards of proof differ. An acquittal shows only that the criminal standard was not met.",
    },
    {
      trap: "Saying the claimant is entitled to specific performance once breach is proved.",
      fix: "Damages are available as of right; equitable remedies are DISCRETIONARY.",
    },
    {
      trap: "Confusing the public/private division with the criminal/civil one.",
      fix: "Criminal law is a branch of PUBLIC law, but public law also covers constitutional and administrative matters that are not criminal at all.",
    },
  ],
  keyTerms: [
    { term: "Law", def: "Rules enforceable by the state, imposing consequences where they are broken." },
    { term: "Criminal law", def: "Law under which the state prosecutes an offence to punish and deter, proved beyond reasonable doubt." },
    { term: "Civil law", def: "Law under which one party claims a remedy from another, proved on the balance of probabilities." },
    { term: "Public law", def: "Law governing the state acting in its governing capacity — constitutional, administrative and criminal law." },
    { term: "Private law", def: "Law governing disputes between private persons — contract, tort and property." },
    { term: "Equity", def: "Rules developed in Chancery to relieve the common law's rigidity, whose remedies are discretionary." },
    { term: "Beyond reasonable doubt", def: "The criminal standard of proof, deliberately set high because the state seeks to punish." },
    { term: "Balance of probabilities", def: "The civil standard of proof — the claimant's version is more likely than not." },
  ],
  summary: [
    "Law is distinguished from other rules by being enforceable by the state.",
    "Criminal law punishes at the state's suit; civil law compensates at the injured party's suit.",
    "The standards of proof differ, so identical facts can produce an acquittal and civil liability.",
    "Common law gives damages as of right; equity gives discretionary remedies such as injunction and specific performance.",
    "Criminal law sits inside public law, which also covers constitutional and administrative matters.",
  ],
  knowledgeDiagnostic: [
    { q: "State the two standards of proof and which action each belongs to.", a: "Beyond reasonable doubt in criminal cases; on the balance of probabilities in civil cases." },
    { q: "Why can a defendant be acquitted yet held civilly liable?", a: "Because the civil standard is lower, so a claimant may prove liability on facts that did not support a conviction." },
    { q: "What is the practical difference between a common law and an equitable remedy?", a: "Damages follow as of right once the wrong is proved; equitable remedies are discretionary and may be refused." },
    { q: "Name the parties in each type of action.", a: "Prosecutor and defendant in criminal proceedings; claimant and defendant in civil proceedings." },
  ],
}

/* ── Chapter 2 · A1(b) ─────────────────────────────────────────── */

export const LWE_TREE_02: StudyChapter = {
  id: "LWE-02",
  number: 2,
  paper: "LW",
  area: "A",
  title: "The courts and tribunals, and how appeals run",
  minutes: 16,
  syllabusRefs: ["A1(b)"],
  intro:
    "The court hierarchy is not trivia. It decides which decisions bind which courts, so you cannot answer a precedent question without it — and it is the reason the same argument can win in the Court of Appeal and lose in the Supreme Court.",
  outcomes: [
    "Set out the civil and criminal court structures and the route of appeal through each",
    "Identify which court hears a claim at first instance, by value and complexity",
    "Explain what the tribunal system does and how it differs from a court",
    "Place the Supreme Court, Court of Appeal and High Court correctly for a precedent question",
  ],
  sections: [
    {
      id: "civil-courts",
      heading: "The civil courts, from first instance upwards",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The civil hierarchy",
            caption: "Read upwards — each court is bound by those above it.",
            data: {
              items: [
                { title: "Supreme Court", sub: "The final appeal court for the United Kingdom; binds every court below it" },
                { title: "Court of Appeal (Civil Division)", sub: "Hears appeals from the High Court and the County Court" },
                { title: "High Court", sub: "Three divisions — King's Bench, Chancery, Family. Higher-value and complex claims" },
                { title: "County Court", sub: "The bulk of civil claims, including the small claims track" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The three High Court divisions and what each takes",
          head: ["Division", "Its work"],
          rows: [
            ["**King's Bench**", "Contract and tort claims of substance, plus the **Administrative Court** for judicial review, and the Commercial and Admiralty courts"],
            ["**Chancery**", "Companies, insolvency, trusts, partnership, land, intellectual property and tax — **the division most LW disputes reach**"],
            ["**Family**", "Family proceedings"],
          ],
        },
        {
          kind: "list",
          title: "Where a civil claim starts",
          items: [
            "**Small claims track** in the County Court for low-value claims — designed to be used without lawyers, and costs are not generally recoverable, which is the point of it.",
            "**Fast track and intermediate track** for moderate claims with limited trial time.",
            "**Multi-track** for the highest-value or most complex claims, in the County Court or the High Court.",
            "**The choice is driven by value and complexity**, and a company disputing a debt or a shareholder bringing a claim will normally be in the County Court or Chancery.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "\"Leapfrog\" appeals",
          md: "An appeal normally goes to the next court up, but a case may go **directly from the High Court to the Supreme Court** where a point of law of general public importance is involved and the Supreme Court gives permission. It is worth knowing because it is the exception that shows the hierarchy is about **binding authority**, not a fixed queue.",
        },
      ],
      check: {
        q: "A shareholder brings a claim about the conduct of a company's affairs. Which High Court division would ordinarily hear it?",
        options: ["King's Bench Division", "Chancery Division", "Family Division", "The Administrative Court"],
        correct: 1,
        explain:
          "The CHANCERY DIVISION, which takes company, insolvency, partnership, trust and intellectual property work. King's Bench handles contract and tort claims of substance; the Administrative Court sits within King's Bench and does judicial review, which is a public-law challenge rather than a shareholder dispute.",
      },
    },
    {
      id: "criminal-courts-tribunals",
      heading: "The criminal courts, and the tribunal system",
      blocks: [
        {
          kind: "table",
          caption: "Criminal courts and appeal routes",
          head: ["Court", "Its role"],
          rows: [
            ["**Magistrates' court**", "Tries **summary** offences and the less serious either-way offences, and conducts committal for the rest. No jury"],
            ["**Crown Court**", "Tries **indictable** offences **with a jury**, and hears appeals from the magistrates"],
            ["**High Court (King's Bench)**", "Hears appeals by way of **case stated** on a point of law from the magistrates"],
            ["**Court of Appeal (Criminal Division)**", "Hears appeals against conviction and sentence from the Crown Court"],
            ["**Supreme Court**", "Final appeal on a point of law of general public importance"],
          ],
        },
        {
          kind: "definition",
          term: "Tribunal",
          md: "A specialist body, outside the ordinary court structure, that decides disputes in a defined field — **employment**, tax, immigration, social security. Tribunals are organised as a **First-tier Tribunal** with an **Upper Tribunal** above it, and appeals go on to the Court of Appeal.",
        },
        {
          kind: "table",
          caption: "Tribunal against court",
          head: ["", "Tribunal", "Court"],
          rows: [
            ["**Membership**", "A judge, often sitting with **non-legal members** who bring industry expertise", "A judge alone, or with a jury in the Crown Court"],
            ["**Procedure**", "**Less formal**, designed to be usable without representation", "Formal rules of evidence and procedure"],
            ["**Cost**", "Generally **cheaper**, and costs are not usually awarded against the loser", "Costs normally follow the event"],
            ["**Speed**", "Usually **faster**", "Slower, particularly in the higher courts"],
            ["**Specialism**", "**Confined to its field**, and expert in it", "General jurisdiction"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the Employment Tribunal matters to this paper",
          md: "Every claim in Area C — unfair dismissal, wrongful dismissal, redundancy — is heard in the **Employment Tribunal**, not a court. Two consequences follow that scenarios test. Costs are **not** normally awarded against the losing party, so an employee can bring a claim without risking the employer's legal bill; and the tribunal includes members with **industry experience**, which is why its procedure is designed for unrepresented claimants. When chapter 26 gets to unfair dismissal remedies, this is the forum granting them.",
        },
      ],
      check: {
        q: "Which feature of the Employment Tribunal most affects an employee's decision to bring a claim?",
        options: [
          "That it must follow the strict rules of evidence",
          "That costs are not normally awarded against the losing party, so the employee does not risk the employer's costs",
          "That it always sits with a jury",
          "That there is no appeal from its decisions",
        ],
        correct: 1,
        explain:
          "COSTS are not normally awarded against the loser, which removes the main financial deterrent to claiming. Tribunal procedure is deliberately LESS formal than a court's, it never sits with a jury, and appeals do lie — to the Employment Appeal Tribunal and onwards.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Sending a company or insolvency dispute to the King's Bench Division.",
      fix: "Company, insolvency, partnership and trust work is CHANCERY.",
    },
    {
      trap: "Describing a tribunal as a court with a different name.",
      fix: "Tribunals are specialist, less formal, cheaper, and do not normally award costs against the loser.",
    },
    {
      trap: "Assuming every appeal goes to the next court up.",
      fix: "A leapfrog appeal can run from the High Court straight to the Supreme Court on a point of general public importance, with permission.",
    },
  ],
  keyTerms: [
    { term: "Supreme Court", def: "The final appeal court for the United Kingdom, whose decisions bind all lower courts." },
    { term: "Court of Appeal", def: "The appeal court sitting in Civil and Criminal Divisions, below the Supreme Court." },
    { term: "High Court", def: "A first-instance and appellate court in three divisions: King's Bench, Chancery and Family." },
    { term: "County Court", def: "The court hearing the bulk of civil claims, including the small claims track." },
    { term: "Chancery Division", def: "The High Court division handling company, insolvency, partnership, trust, land and IP disputes." },
    { term: "Tribunal", def: "A specialist decision-making body outside the court structure, less formal and usually cheaper." },
    { term: "Leapfrog appeal", def: "An appeal direct from the High Court to the Supreme Court on a point of general public importance, with permission." },
  ],
  summary: [
    "The civil hierarchy runs County Court and High Court, then Court of Appeal, then Supreme Court.",
    "Company, insolvency and partnership disputes belong to the Chancery Division.",
    "Criminal cases start in the magistrates' court, with indictable offences tried by jury in the Crown Court.",
    "Tribunals are specialist, informal and cheap, and do not normally award costs against the loser.",
    "Every Area C employment claim is heard in the Employment Tribunal rather than a court.",
  ],
  knowledgeDiagnostic: [
    { q: "Which High Court division hears company and insolvency work?", a: "The Chancery Division." },
    { q: "What is a leapfrog appeal?", a: "An appeal direct from the High Court to the Supreme Court on a point of law of general public importance, with permission." },
    { q: "Give three ways a tribunal differs from a court.", a: "It is specialist rather than general, its procedure is less formal, and costs are not normally awarded against the losing party." },
    { q: "Where are unfair dismissal claims heard?", a: "In the Employment Tribunal." },
  ],
}

/* ── Chapter 3 · A2(a) ─────────────────────────────────────────── */

export const LWE_TREE_03: StudyChapter = {
  id: "LWE-03",
  number: 3,
  paper: "LW",
  area: "A",
  title: "Case law and judicial precedent",
  minutes: 17,
  syllabusRefs: ["A2(a)"],
  intro:
    "Precedent is what makes the common law predictable, and the whole doctrine turns on one distinction: the part of a judgment that binds, and the part that does not. Nearly every mark in this chapter comes from telling those two apart and then finding a legitimate way round the binding part.",
  outcomes: [
    "Explain the doctrine of binding precedent and what makes a decision bind",
    "Separate the ratio decidendi from obiter dicta, and say why only one of them binds",
    "Distinguish binding from merely persuasive authority",
    "Apply the ways a court may legitimately escape an earlier decision — distinguishing, overruling, reversing",
    "Weigh the advantages of precedent against its drawbacks",
  ],
  sections: [
    {
      id: "ratio-obiter",
      heading: "What actually binds: ratio and obiter",
      blocks: [
        {
          kind: "definition",
          term: "Ratio decidendi",
          md: "The **legal reasoning necessary to the decision** — the rule the judge had to apply to reach the result on those facts. This, and only this, is capable of **binding** a later court.",
        },
        {
          kind: "definition",
          term: "Obiter dicta",
          md: "Everything else the judge said \"by the way\": observations on facts that were not before the court, on how a different case might be decided, or on the law generally. Obiter is **persuasive only**, never binding — though obiter from a senior judge can be highly influential and is sometimes later adopted as ratio.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The test to apply, every time",
          md: "Ask: **if this proposition were removed, would the decision still stand?** If the result depends on it, it is **ratio** and it binds. If the case would have come out the same way regardless, it is **obiter** and it does not. This single question answers most precedent questions in the exam, and it is more reliable than looking at where in the judgment the words appear.",
        },
        {
          kind: "table",
          caption: "Binding and persuasive authority",
          head: ["Source", "Weight"],
          rows: [
            ["**Ratio of a superior court** in the same hierarchy", "**Binding**"],
            ["**Obiter dicta**, from any court", "Persuasive only"],
            ["Decisions of a **court of equal standing**", "Generally binding on itself, subject to limited exceptions; the Supreme Court is not bound by its own decisions"],
            ["Decisions of a **lower** court", "Persuasive only"],
            ["Decisions of courts in **other jurisdictions**, and dissenting judgments", "Persuasive only"],
          ],
        },
      ],
      check: {
        q: "A judge decides a case on the ground that the exclusion clause was not incorporated, then adds that had it been incorporated it would have been unreasonable. What is the status of the second statement?",
        options: [
          "Ratio, because the judge dealt with the point expressly",
          "Obiter, because the decision did not depend on it — it is persuasive only",
          "Binding on all lower courts, as it came from a senior judge",
          "Of no legal significance whatever",
        ],
        correct: 1,
        explain:
          "OBITER. The case was decided on incorporation, so the observation about reasonableness was not necessary to the result — remove it and the decision still stands. It is therefore PERSUASIVE ONLY. That does not make it worthless: influential obiter is regularly adopted as ratio in a later case.",
      },
    },
    {
      id: "escaping-precedent",
      heading: "How a court escapes an earlier decision",
      blocks: [
        {
          kind: "table",
          caption: "The four routes, and who can use each",
          head: ["Route", "What it means"],
          rows: [
            ["**Distinguishing**", "Holding that the **material facts differ**, so the earlier ratio does not apply. Open to **any** court, and by far the most common route"],
            ["**Overruling**", "A **higher** court declaring the earlier decision wrong in law, so it ceases to be authority for the future. The earlier parties are unaffected"],
            ["**Reversing**", "An appeal court changing the outcome of **the same case** on appeal"],
            ["**Statute**", "Parliament legislating to change the rule — statute always prevails over judge-made law"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Overruling and reversing are constantly confused",
          md: "**Reversing** happens **within one case**: the Court of Appeal reverses the High Court's decision in *that* litigation, and the parties' positions change. **Overruling** happens **across cases**: a higher court in a *later*, different case declares an earlier decision wrong, which changes the law going forward but leaves the earlier parties alone. If the question mentions two separate sets of facts, it is overruling.",
        },
        {
          kind: "list",
          title: "When a precedent does not bind at all",
          items: [
            "It was decided **per incuriam** — in ignorance of a relevant statute or binding authority.",
            "The **material facts differ**, so it can be distinguished.",
            "It has been **overruled** by a higher court, or displaced by **statute**.",
            "It is not part of the **ratio** — obiter never binds.",
            "There are **conflicting decisions** of equal standing, leaving the later court to choose.",
          ],
        },
        {
          kind: "example",
          title: "Working a precedent problem",
          scenario:
            "In an earlier High Court case, a hotel was held liable for a guest's stolen property because a notice disclaiming liability was displayed only in the bedroom, after the contract had been made. The judge added that a notice at reception would have been effective. Kelbrook Hotels now faces a claim by a guest whose laptop was stolen; Kelbrook displayed its notice at the reception desk, and the guest read it before signing the register. The claim is in the County Court. Kelbrook also argues the earlier decision was made without reference to a statutory provision on hotel liability.",
          steps: [
            { label: "Identify the ratio of the earlier case", detail: "The decision turned on the notice being displayed AFTER the contract was made, so the ratio is that a disclaimer given after contracting is not incorporated. That part binds a County Court, being a High Court decision." },
            { label: "Identify the obiter", detail: "The remark that a notice at reception WOULD have been effective was not necessary to the result — the case was decided the other way. It is OBITER, and so persuasive only." },
            { label: "Apply the ratio to Kelbrook's facts", detail: "Kelbrook's notice was displayed at reception and READ BEFORE the guest signed, so it was brought to the guest's attention BEFORE contracting. The material facts DIFFER from the earlier case, so the earlier ratio can be DISTINGUISHED." },
            { label: "Deal with the per incuriam argument", detail: "If the earlier court genuinely overlooked a relevant statutory provision, the decision was made PER INCURIAM and does not bind at all. Kelbrook does not need this argument if distinguishing succeeds, but it is a second, independent route." },
            { label: "Note what the County Court cannot do", detail: "It CANNOT overrule the High Court decision — only a higher court can. Its legitimate options are to distinguish it, or to hold it per incuriam." },
          ],
          result:
            "Kelbrook succeeds by **distinguishing**: the timing of the notice is the material fact the earlier ratio turned on, and here it differs. The obiter supports Kelbrook but does not bind, and the County Court has no power to overrule.",
        },
        {
          kind: "table",
          caption: "Precedent weighed up",
          head: ["Advantages", "Drawbacks"],
          rows: [
            ["**Certainty** — parties can predict the outcome and settle accordingly", "**Rigidity** — a bad decision may stand until a suitable appeal arrives"],
            ["**Consistency and fairness** — like cases are treated alike", "**Bulk and complexity** — the volume of reported cases is enormous"],
            ["**Practicality** — rules develop from real facts rather than in the abstract", "**Illogical distinctions** — courts may distinguish artificially to avoid an unwelcome result"],
            ["**Flexibility** — distinguishing and overruling allow development without legislation", "**Retrospective effect** — overruling changes the law for conduct already past"],
          ],
        },
      ],
      check: {
        q: "The Court of Appeal, in a later case with different facts, declares an earlier High Court decision wrong in law. What has it done?",
        options: [
          "Reversed the earlier decision",
          "Overruled it — the law changes for the future, but the earlier parties are unaffected",
          "Distinguished it",
          "Nothing effective, since only the Supreme Court can do this",
        ],
        correct: 1,
        explain:
          "OVERRULED it. Overruling operates ACROSS cases: a higher court in a later, separate case declares the earlier decision wrong, changing the law prospectively while leaving the earlier parties' positions alone. REVERSING would mean changing the outcome of the SAME case on appeal.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating everything in a judgment as binding.",
      fix: "Only the RATIO binds. Test it by asking whether the decision would stand without the proposition.",
    },
    {
      trap: "Using \"overrule\" and \"reverse\" interchangeably.",
      fix: "Reversing changes the outcome of the SAME case on appeal; overruling changes the law in a LATER, different case.",
    },
    {
      trap: "Having a lower court overrule a higher one.",
      fix: "A lower court can only distinguish, or hold the decision per incuriam.",
    },
  ],
  keyTerms: [
    { term: "Judicial precedent", def: "The doctrine that the reasoning of a superior court binds lower courts in the same hierarchy." },
    { term: "Ratio decidendi", def: "The legal reasoning necessary to the decision; the only part capable of binding." },
    { term: "Obiter dicta", def: "Statements not necessary to the decision, which are persuasive only." },
    { term: "Distinguishing", def: "Holding that the material facts differ so an earlier ratio does not apply; open to any court." },
    { term: "Overruling", def: "A higher court in a later case declaring an earlier decision wrong, changing the law prospectively." },
    { term: "Reversing", def: "An appeal court changing the outcome of the same case." },
    { term: "Per incuriam", def: "Decided in ignorance of a relevant statute or binding authority, and therefore not binding." },
  ],
  summary: [
    "Only the ratio decidendi binds; obiter dicta are persuasive only.",
    "Test ratio by asking whether the decision would stand without the proposition.",
    "Any court may distinguish on material facts; only a higher court may overrule.",
    "Reversing operates within one case, overruling across cases.",
    "Precedent buys certainty and consistency at the cost of rigidity and retrospective change.",
  ],
  knowledgeDiagnostic: [
    { q: "How do you tell ratio from obiter?", a: "Ask whether the decision would still stand if the proposition were removed. If not, it is ratio." },
    { q: "Distinguish overruling from reversing.", a: "Reversing changes the result of the same case on appeal; overruling is a higher court in a later case declaring an earlier decision wrong." },
    { q: "What can a lower court do with an inconvenient binding precedent?", a: "Distinguish it on the material facts, or argue it was decided per incuriam." },
    { q: "Give two drawbacks of precedent.", a: "Rigidity, since a bad decision may stand until a suitable appeal arises, and the retrospective effect of overruling." },
  ],
}

/* ── Chapter 4 · A2(b) ─────────────────────────────────────────── */

export const LWE_TREE_04: StudyChapter = {
  id: "LWE-04",
  number: 4,
  paper: "LW",
  area: "A",
  title: "Legislation and delegated legislation",
  minutes: 15,
  syllabusRefs: ["A2(b)"],
  intro:
    "Parliament makes the primary rules, but most of the detail is made by somebody else under powers Parliament handed over. That delegation is efficient and slightly uncomfortable in equal measure, and the syllabus asks you to evaluate it rather than just describe it.",
  outcomes: [
    "Explain Parliamentary supremacy and what follows from it",
    "Describe how an Act of Parliament is made",
    "Define delegated legislation and identify its three main forms",
    "Evaluate delegated legislation, and set out the controls over it",
    "Explain when delegated legislation can be challenged as ultra vires",
  ],
  sections: [
    {
      id: "primary-legislation",
      heading: "Acts of Parliament, and supremacy",
      blocks: [
        {
          kind: "definition",
          term: "Parliamentary supremacy",
          md: "Parliament is the **highest source of law**. It may enact or repeal any law; **no Parliament can bind a future one**; and no court may set aside an Act as invalid. A judge faced with a clear statute must apply it, however unattractive the result — the remedy lies with Parliament, not the court.",
        },
        {
          kind: "list",
          style: "number",
          title: "How a Bill becomes an Act",
          items: [
            "**First reading** — the Bill is formally introduced and printed; no debate.",
            "**Second reading** — the principle of the Bill is debated and voted on. This is where a Bill is most likely to fail.",
            "**Committee stage** — detailed clause-by-clause examination, and amendment.",
            "**Report stage** — the amended Bill is reported back to the House and further amendments considered.",
            "**Third reading** — a final review, usually with no substantial amendment.",
            "**The other House** — the whole process repeats in the Commons or the Lords, as the case may be.",
            "**Royal Assent** — the Bill becomes an Act, though it may come into force later, or in stages, by commencement order.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Royal Assent is not the same as coming into force",
          md: "An Act may receive Royal Assent and yet bind nobody for months, because the commencement provisions bring it into force on an appointed day — often in stages, and sometimes never for a particular section. So the date to look for in a scenario is the **commencement** date, not the date of Assent. Candidates lose marks by assuming an Act applies from the moment it is passed.",
        },
      ],
      check: {
        q: "At which stage is the general principle of a Bill debated and voted on?",
        options: ["First reading", "Second reading", "Committee stage", "Royal Assent"],
        correct: 1,
        explain:
          "The SECOND READING, where the House debates the Bill's principle and votes — the stage at which a Bill is most likely to be defeated. First reading is a formal introduction with no debate; the committee stage examines the detail clause by clause; Royal Assent is the final formality.",
      },
    },
    {
      id: "delegated-legislation",
      heading: "Delegated legislation, its forms and its controls",
      blocks: [
        {
          kind: "definition",
          term: "Delegated legislation",
          md: "Law made by a body **other than Parliament**, under authority conferred by an **enabling (parent) Act**. It has the same force as the Act itself — but only **within** the powers granted.",
        },
        {
          kind: "table",
          caption: "The three forms",
          head: ["Form", "Who makes it, and what for"],
          rows: [
            ["**Statutory instruments**", "**Government ministers**, filling in the detail of an Act. By far the largest category in volume"],
            ["**Bye-laws**", "**Local authorities** and some public bodies, for matters within their area"],
            ["**Orders in Council**", "The **Privy Council**, used for certain constitutional matters and in emergencies"],
          ],
        },
        {
          kind: "table",
          caption: "Evaluating delegated legislation",
          head: ["Advantages", "Drawbacks"],
          rows: [
            ["**Saves Parliamentary time**, which is a genuinely scarce resource", "**Lack of democratic accountability** — the maker is usually unelected"],
            ["**Technical expertise** — detail is set by those who understand the field", "**Volume** makes it hard for anyone, including Parliament, to keep track"],
            ["**Speed**, including the ability to respond to an emergency", "**Insufficient scrutiny** — much of it is never actively debated"],
            ["**Flexibility** — amendable without a new Act", "**Sub-delegation** can put law-making at a further remove still"],
          ],
        },
        {
          kind: "list",
          title: "The controls",
          items: [
            "**Parliamentary control.** The enabling Act sets the procedure — **affirmative** resolution requires an active approving vote, while the more common **negative** resolution means the instrument stands unless Parliament objects within a period. A **Joint Committee on Statutory Instruments** scrutinises instruments and reports on those needing attention.",
            "**Judicial control.** The courts may declare delegated legislation **ultra vires** — beyond the powers granted — and therefore void. Grounds include exceeding the substantive power in the parent Act, and failing to follow a **procedural** requirement such as a duty to consult.",
            "**Publication**, so that those affected can find the rule.",
            "**Consultation** with affected interests, where the parent Act requires it.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Ultra vires is the point where delegated and primary legislation part company",
          md: "A court can never strike down an **Act of Parliament** — that is what supremacy means. But it **can** strike down a statutory instrument or bye-law, because that instrument only has force so far as the parent Act allowed. So the same court is powerless against one and decisive against the other, and questions test exactly that asymmetry.",
        },
        {
          kind: "example",
          title: "Testing an instrument",
          scenario:
            "The Waste Handling Act empowers the Secretary of State to \"make regulations prescribing standards for the storage of commercial waste\", after consulting representative trade bodies. The Secretary of State makes regulations that prescribe storage standards, and also impose a levy of £400 per business to fund inspections. No trade body was consulted. Marnehill Ltd, fined under the levy provision, challenges the regulations.",
          steps: [
            { label: "Identify the source and its limits", detail: "These are REGULATIONS — a statutory instrument, and so DELEGATED legislation. They have force only so far as the enabling Act permits." },
            { label: "Test the storage standards against the power", detail: "Prescribing storage standards is squarely within the words of the power, so that part of the regulations is INTRA VIRES and valid." },
            { label: "Test the levy", detail: "The power is to prescribe STANDARDS. It says nothing about imposing a charge, and a power to tax is not implied. The levy is therefore SUBSTANTIVELY ULTRA VIRES and void." },
            { label: "Test the procedure", detail: "The Act required CONSULTATION with representative trade bodies and none took place. That is a PROCEDURAL failure, an independent ground of invalidity affecting the regulations as made." },
            { label: "Note what the court cannot do", detail: "If the levy had been imposed by the ACT itself, the court could do nothing — Parliamentary supremacy means an Act cannot be set aside. The challenge works precisely because the levy is in delegated legislation." },
          ],
          result:
            "The levy is **void** on two independent grounds — beyond the substantive power, and made without the required consultation — while the storage standards stand. Marnehill's fine, imposed under the levy provision, cannot be enforced.",
        },
      ],
      check: {
        q: "A minister makes a statutory instrument imposing a duty the enabling Act gave no power to impose. What can a court do?",
        options: [
          "Nothing, since the instrument has the same force as an Act",
          "Declare it ultra vires and therefore void",
          "Refer it back to Parliament for a further vote",
          "Amend it so that it falls within the power",
        ],
        correct: 1,
        explain:
          "Declare it ULTRA VIRES and void. Delegated legislation only has force within the powers the parent Act conferred, so exceeding them makes it invalid. Contrast an ACT of Parliament, which no court may set aside. Courts do not amend instruments or refer them back for a vote.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Assuming an Act binds from the date of Royal Assent.",
      fix: "Look for the COMMENCEMENT provisions — an Act may come into force later, in stages, or not at all for a given section.",
    },
    {
      trap: "Saying a court can strike down an Act that produces an unjust result.",
      fix: "Parliamentary supremacy means no court may set aside an Act. Only DELEGATED legislation can be held ultra vires.",
    },
    {
      trap: "Treating ultra vires as covering only excess of substantive power.",
      fix: "Failure to follow a required PROCEDURE, such as a duty to consult, is an independent ground.",
    },
  ],
  keyTerms: [
    { term: "Parliamentary supremacy", def: "Parliament is the highest source of law; no court may set aside an Act and no Parliament binds its successor." },
    { term: "Delegated legislation", def: "Law made under authority conferred by an enabling Act, valid only within the powers granted." },
    { term: "Statutory instrument", def: "Delegated legislation made by a government minister, the largest category by volume." },
    { term: "Bye-law", def: "Delegated legislation made by a local authority or public body for its own area." },
    { term: "Order in Council", def: "Delegated legislation made by the Privy Council, used for constitutional matters and emergencies." },
    { term: "Ultra vires", def: "Beyond the powers conferred, and therefore void; covers both excess of substantive power and procedural failure." },
    { term: "Enabling Act", def: "The parent Act that confers the power to make delegated legislation and sets its limits." },
  ],
  summary: [
    "Parliament is supreme: it can make or unmake any law, and no court may set an Act aside.",
    "A Bill passes three readings plus committee and report stages in each House, then receives Royal Assent — but commencement may be later.",
    "Delegated legislation comes as statutory instruments, bye-laws and Orders in Council.",
    "It saves time and brings expertise, at the cost of accountability, volume and scrutiny.",
    "Courts control it through ultra vires, on substantive and procedural grounds alike.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the three forms of delegated legislation and who makes each.", a: "Statutory instruments by ministers, bye-laws by local authorities, and Orders in Council by the Privy Council." },
    { q: "Why can a court void a statutory instrument but not an Act?", a: "An instrument has force only within the powers the enabling Act granted; Parliamentary supremacy puts an Act beyond judicial challenge." },
    { q: "Give two grounds on which delegated legislation may be ultra vires.", a: "Exceeding the substantive power conferred, and failing to follow a required procedure such as consultation." },
    { q: "Distinguish affirmative from negative resolution procedure.", a: "Affirmative requires an active approving vote; under negative resolution the instrument stands unless Parliament objects within a set period." },
  ],
}

export const LWE_TREE_AREA_A_PART1: StudyChapter[] = [
  LWE_TREE_01,
  LWE_TREE_02,
  LWE_TREE_03,
  LWE_TREE_04,
]
