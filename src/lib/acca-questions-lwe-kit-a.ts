import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · Area A question kit — chapters 1 to 6.
 *
 * The English legal system: types of law and the criminal/civil divide, the courts and
 * tribunals, judicial precedent, legislation and delegated legislation, statutory
 * interpretation, and the Human Rights Act 1998.
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 1 · What law is, and the criminal/civil divide ─────── */

const CH01: AccaQuestion[] = [
  q1("LWEK-01-01", "LWE-01", "A", "easy",
    "What is the standard of proof in CIVIL proceedings?",
    ["Beyond reasonable doubt", "On the balance of probabilities", "Absolute certainty", "Whatever the parties agree"],
    1,
    "ON THE BALANCE OF PROBABILITIES — more likely than not. Beyond reasonable doubt is the higher CRIMINAL standard, set high because the state is seeking to punish."),

  q1("LWEK-01-02", "LWE-01", "A", "easy",
    "Who are the parties called in civil proceedings?",
    ["Prosecutor and defendant", "Claimant and defendant", "Appellant and respondent", "Plaintiff and accused"],
    1,
    "CLAIMANT and DEFENDANT. Prosecutor and defendant are the criminal parties; appellant and respondent are the parties on an appeal, whichever kind of case it is."),

  q1("LWEK-01-03", "LWE-01", "A", "easy",
    "Which remedy originated in EQUITY rather than at common law?",
    ["Damages", "An injunction", "A fine", "A declaration of incompatibility"],
    1,
    "An INJUNCTION. Equity's remedies — injunction, specific performance, rescission, rectification — are DISCRETIONARY. Damages are the common law remedy and follow as of right once the wrong is proved."),

  q2("LWEK-01-04", "LWE-01", "A", "medium",
    "A driver is acquitted of causing death by dangerous driving. The victim's family sues in negligence on the same facts. What is the effect of the acquittal?",
    [
      "It defeats the civil claim, the facts having been decided",
      "None in itself — the civil claim applies the lower balance-of-probabilities standard and may succeed",
      "It reverses the burden of proof in the civil claim",
      "It requires the civil claim to be stayed pending an appeal",
    ],
    1,
    "NO EFFECT in itself. The acquittal shows only that the prosecution could not prove its case BEYOND REASONABLE DOUBT. The family need prove liability only ON THE BALANCE OF PROBABILITIES, so the same evidence may comfortably tip the civil balance."),

  q2("LWEK-01-05", "LWE-01", "A", "medium",
    "A supplier proves a buyer breached a contract and wants the contract actually performed. What is the position?",
    [
      "Specific performance follows automatically from proof of breach",
      "Damages are available as of right, but specific performance is discretionary and must be argued for",
      "Only specific performance is available, damages being a fallback",
      "Neither remedy is available without proof of loss",
    ],
    1,
    "DAMAGES as of right, because they are the COMMON LAW remedy. SPECIFIC PERFORMANCE is EQUITABLE and therefore DISCRETIONARY — the court weighs whether damages would be adequate and how the claimant has behaved. Wanting performance is not the same as being entitled to it."),

  q2("LWEK-01-06", "LWE-01", "A", "medium",
    "Which statement about the relationship between statute and common law is correct?",
    [
      "Common law prevails over statute where the two conflict",
      "Statute prevails over any inconsistent judge-made rule",
      "The two have equal authority and the later in time prevails",
      "Statute may only supplement common law, never override it",
    ],
    1,
    "STATUTE PREVAILS. Parliament is the highest source of law, so an Act overrides any inconsistent common law rule. The reverse proposition is the classic distractor."),
]

/* ── Chapter 2 · The courts and tribunals ───────────────────────── */

const CH02: AccaQuestion[] = [
  q1("LWEK-02-01", "LWE-02", "A", "easy",
    "Which court is the final appeal court for the United Kingdom?",
    ["The Court of Appeal", "The Supreme Court", "The High Court", "The Crown Court"],
    1,
    "The SUPREME COURT, whose decisions bind every court below it."),

  q1("LWEK-02-02", "LWE-02", "A", "easy",
    "Which High Court division would ordinarily hear a company or insolvency dispute?",
    ["King's Bench Division", "Chancery Division", "Family Division", "The Administrative Court"],
    1,
    "The CHANCERY DIVISION, which takes company, insolvency, partnership, trust, land and intellectual property work. King's Bench handles substantial contract and tort claims."),

  q1("LWEK-02-03", "LWE-02", "A", "easy",
    "In which court are indictable criminal offences tried with a jury?",
    ["The magistrates' court", "The Crown Court", "The County Court", "The High Court"],
    1,
    "The CROWN COURT. The magistrates' court tries summary offences and the less serious either-way offences, and sits without a jury."),

  q2("LWEK-02-04", "LWE-02", "A", "medium",
    "Which feature most affects an employee's decision to bring an Employment Tribunal claim?",
    [
      "That the tribunal must apply the strict rules of evidence",
      "That costs are not normally awarded against the losing party",
      "That the tribunal sits with a jury",
      "That there is no appeal from its decisions",
    ],
    1,
    "COSTS are not normally awarded against the loser, which removes the main financial deterrent to claiming. Tribunal procedure is deliberately LESS formal than a court's, it never sits with a jury, and appeals do lie."),

  q2("LWEK-02-05", "LWE-02", "A", "medium",
    "A High Court case raises a point of law of general public importance. Which route may be available?",
    [
      "A direct appeal to the Supreme Court, with permission — a leapfrog appeal",
      "A direct appeal to the Supreme Court as of right",
      "Referral to the Administrative Court",
      "No appeal, the High Court being final on points of law",
    ],
    1,
    "A LEAPFROG APPEAL direct from the High Court to the Supreme Court, where a point of law of general public importance is involved AND the Supreme Court gives PERMISSION. It is an exception, not a right."),

  multi2("LWEK-02-06", "LWE-02", "A", "medium",
    "Which TWO are characteristic of a tribunal rather than a court?",
    [
      "It may sit with non-legal members bringing industry expertise",
      "Its procedure is deliberately less formal",
      "Costs normally follow the event",
      "It has general jurisdiction over all civil disputes",
    ],
    [0, 1],
    "Tribunals sit with NON-LEGAL MEMBERS and use LESS FORMAL procedure, being designed for unrepresented parties. Costs following the event is the COURT position, and a tribunal's jurisdiction is confined to its specialist field, not general."),
]

/* ── Chapter 3 · Case law and judicial precedent ────────────────── */

const CH03: AccaQuestion[] = [
  q1("LWEK-03-01", "LWE-03", "A", "easy",
    "Which part of a judgment is capable of BINDING a later court?",
    ["The obiter dicta", "The ratio decidendi", "The whole judgment equally", "The judge's summary of the facts"],
    1,
    "The RATIO DECIDENDI — the legal reasoning necessary to the decision. Obiter dicta are persuasive only, however senior the judge."),

  q1("LWEK-03-02", "LWE-03", "A", "easy",
    "What does it mean to DISTINGUISH a precedent?",
    [
      "To declare it wrong in law",
      "To hold that the material facts differ, so the earlier ratio does not apply",
      "To change the outcome of the same case on appeal",
      "To refer it to Parliament",
    ],
    1,
    "To hold that the MATERIAL FACTS DIFFER, so the earlier ratio does not apply. It is open to ANY court, which is what makes it the commonest way round an inconvenient precedent."),

  q2("LWEK-03-03", "LWE-03", "A", "medium",
    "A judge decides a case on the ground that a clause was not incorporated, then remarks that had it been incorporated it would have been unreasonable. What is the status of the remark?",
    [
      "Ratio, because the judge dealt with the point expressly",
      "Obiter, because the decision did not depend on it — persuasive only",
      "Binding on all lower courts",
      "Of no legal significance whatever",
    ],
    1,
    "OBITER. Remove the remark and the decision still stands, so it was not necessary to the result. It is PERSUASIVE ONLY — though influential obiter is regularly adopted as ratio in a later case."),

  q2("LWEK-03-04", "LWE-03", "A", "medium",
    "The Court of Appeal, in a later case on different facts, declares an earlier High Court decision wrong in law. What has it done?",
    ["Reversed it", "Overruled it", "Distinguished it", "Nothing effective"],
    1,
    "OVERRULED it. Overruling operates ACROSS cases and changes the law prospectively, leaving the earlier parties unaffected. REVERSING means changing the outcome of the SAME case on appeal."),

  q2("LWEK-03-05", "LWE-03", "A", "medium",
    "A County Court is faced with a High Court decision that appears to have been reached in ignorance of a relevant statute. What can it do?",
    [
      "Overrule the decision",
      "Treat it as decided per incuriam and therefore not binding",
      "Nothing — it must apply the decision",
      "Refer the case to the Supreme Court",
    ],
    1,
    "Treat it as PER INCURIAM — decided in ignorance of a relevant statute or binding authority — and therefore not binding. A lower court can never OVERRULE a higher one; distinguishing and per incuriam are its legitimate routes."),

  q2("LWEK-03-06", "LWE-03", "A", "hard",
    "Which is a genuine DRAWBACK of the doctrine of precedent?",
    [
      "It makes outcomes unpredictable",
      "Overruling operates retrospectively, changing the law for conduct already past",
      "It prevents the law developing without legislation",
      "It treats like cases differently",
    ],
    1,
    "The RETROSPECTIVE effect of overruling. Precedent's virtues are certainty, consistency and practicality; its drawbacks are rigidity, bulk, artificial distinctions and retrospectivity. Distinguishing and overruling DO allow development without legislation, so that option is a benefit stated as a fault."),
]

/* ── Chapter 4 · Legislation and delegated legislation ──────────── */

const CH04: AccaQuestion[] = [
  q1("LWEK-04-01", "LWE-04", "A", "easy",
    "At which stage is the general PRINCIPLE of a Bill debated and voted on?",
    ["First reading", "Second reading", "Committee stage", "Royal Assent"],
    1,
    "The SECOND READING, where the House debates the principle — the stage at which a Bill is most likely to be defeated. The first reading is a formal introduction with no debate."),

  q1("LWEK-04-02", "LWE-04", "A", "easy",
    "Who makes a statutory instrument?",
    ["A local authority", "A government minister", "The Privy Council", "The judiciary"],
    1,
    "A GOVERNMENT MINISTER. Bye-laws are made by local authorities, and Orders in Council by the Privy Council."),

  q1("LWEK-04-03", "LWE-04", "A", "medium",
    "From what date does an Act of Parliament bind?",
    [
      "The date of Royal Assent, always",
      "The commencement date, which may be later and may differ between sections",
      "The date of the second reading",
      "The date it is first printed",
    ],
    1,
    "The COMMENCEMENT date. Royal Assent makes the Bill an Act, but commencement provisions may bring it into force later, in stages, or not at all for a given section."),

  q2("LWEK-04-04", "LWE-04", "A", "medium",
    "A minister makes regulations imposing a levy, where the enabling Act gave power only to prescribe standards. What can a court do?",
    [
      "Nothing — delegated legislation has the same force as an Act",
      "Declare the levy ultra vires and void",
      "Amend the regulations so they fall within the power",
      "Refer the regulations to Parliament for a further vote",
    ],
    1,
    "Declare it ULTRA VIRES and void. Delegated legislation has force only WITHIN the powers the parent Act conferred, and a power to prescribe standards does not imply a power to tax. Contrast an ACT, which no court may set aside."),

  q2("LWEK-04-05", "LWE-04", "A", "medium",
    "An enabling Act requires consultation before regulations are made, and no consultation took place. Are the regulations valid?",
    [
      "Yes, provided their content is within the substantive power",
      "No — failure to follow a required procedure is an independent ground of ultra vires",
      "Yes, consultation being a matter of good practice only",
      "Only if the affected parties later approve them",
    ],
    1,
    "NO. Ultra vires covers PROCEDURAL failure as well as excess of substantive power, so a breach of a statutory duty to consult invalidates the instrument even where its content was within the power."),

  q2("LWEK-04-06", "LWE-04", "A", "hard",
    "Which is a genuine DRAWBACK of delegated legislation?",
    [
      "It consumes excessive Parliamentary time",
      "The volume produced makes effective scrutiny difficult",
      "It cannot respond quickly to an emergency",
      "It cannot be reviewed by the courts",
    ],
    1,
    "The VOLUME, which makes scrutiny difficult — alongside weak democratic accountability and sub-delegation. The other three options are its ADVANTAGES stated backwards: it SAVES Parliamentary time, IS fast in an emergency, and IS reviewable for ultra vires."),
]

/* ── Chapter 5 · Statutory interpretation ───────────────────────── */

const CH05: AccaQuestion[] = [
  q1("LWEK-05-01", "LWE-05", "A", "easy",
    "What does the LITERAL rule require?",
    [
      "Giving words their ordinary plain meaning, even if the result seems poor",
      "Reading words so as to cure the defect in the old law",
      "Departing from the plain meaning to avoid absurdity",
      "Giving effect to the purpose of the Act as a whole",
    ],
    0,
    "Give the words their ORDINARY PLAIN MEANING. It is the starting point, because Parliament is supreme and is taken to have meant what it said. The other three describe the mischief rule, the golden rule and the purposive approach."),

  q1("LWEK-05-02", "LWE-05", "A", "easy",
    "Which is an INTRINSIC aid to statutory interpretation?",
    ["A dictionary", "Hansard", "The Act's preamble", "A law reform report"],
    2,
    "The PREAMBLE, being inside the Act itself — as are the title, definition sections, headings and schedules. Dictionaries, Hansard and law reform reports are EXTRINSIC."),

  q2("LWEK-05-03", "LWE-05", "A", "medium",
    "A statute regulates \"lorries, vans, buses and other vehicles\". Does it catch a bicycle?",
    [
      "Yes, a bicycle being a vehicle in ordinary language",
      "No — under ejusdem generis the general words are limited to the class of the list",
      "No, because expressio unius makes the list exhaustive",
      "Yes, because the purposive approach always extends a list",
    ],
    1,
    "NO, under EJUSDEM GENERIS. The general words follow a list of MOTOR vehicles, so they are confined to that class. Expressio unius is the wrong tool — it applies where there are NO general catch-all words."),

  q2("LWEK-05-04", "LWE-05", "A", "medium",
    "A statute lists \"land, houses and coalmines\" with no general words. Does it cover a tin mine?",
    [
      "Yes, by ejusdem generis",
      "No — expressio unius est exclusio alterius treats the list as closed",
      "Yes, on a purposive reading",
      "Only if the preamble mentions mining generally",
    ],
    1,
    "NO. With no general catch-all words, EXPRESSIO UNIUS applies and the list is treated as exhaustive, so specifying coalmines excludes other kinds of mine. Ejusdem generis needs general words to narrow."),

  q2("LWEK-05-05", "LWE-05", "A", "medium",
    "A statute is silent on whether an offence requires a guilty mind. What does a court presume?",
    [
      "That the offence is one of strict liability, to make enforcement effective",
      "That mens rea is required, though the presumption yields to clear statutory words",
      "That the offence is void for uncertainty",
      "That the common law offence applies instead",
    ],
    1,
    "That MENS REA IS REQUIRED. There is a presumption against criminal liability without fault. Like every presumption it is REBUTTABLE — Parliament may create strict liability offences, but must use clear words."),

  q2("LWEK-05-06", "LWE-05", "A", "hard",
    "Which statement about the presumptions of interpretation is correct?",
    [
      "They are absolute and cannot be overridden by Parliament",
      "They are rebuttable by sufficiently clear statutory wording",
      "They apply only to criminal statutes",
      "They are extrinsic aids to interpretation",
    ],
    1,
    "They are REBUTTABLE by clear words. That is why the answer to \"can Parliament legislate retrospectively, or create strict liability?\" is almost always yes, if it says so plainly. The presumptions decide what happens when the words are UNCLEAR."),
]

/* ── Chapter 6 · Human rights law ───────────────────────────────── */

const CH06: AccaQuestion[] = [
  q1("LWEK-06-01", "LWE-06", "A", "easy",
    "Which Convention right is engaged by an employer reading an employee's personal correspondence?",
    ["Article 6, fair trial", "Article 8, private life and correspondence", "Article 10, freedom of expression", "Article 11, freedom of assembly"],
    1,
    "ARTICLE 8 — respect for private life, home and correspondence. Article 6 covers fair procedure, Article 10 expression and whistleblowing, Article 11 union membership and activity."),

  q1("LWEK-06-02", "LWE-06", "A", "medium",
    "Under section 3 of the Human Rights Act 1998, what must a court do with legislation?",
    [
      "Disapply it where it conflicts with a Convention right",
      "Read and give effect to it compatibly with Convention rights so far as possible",
      "Refer it to Parliament before applying it",
      "Apply it literally, Convention rights being irrelevant to interpretation",
    ],
    1,
    "READ AND GIVE EFFECT TO IT COMPATIBLY so far as it is possible to do so. This is the strong interpretive obligation, and it does most of the Act's practical work — courts will strain a reading to achieve compatibility."),

  q2("LWEK-06-03", "LWE-06", "A", "medium",
    "A court finds an Act cannot be read compatibly with a Convention right. What may it do?",
    [
      "Strike the provision down as invalid",
      "Make a declaration of incompatibility, which leaves the provision valid and binding",
      "Disapply the provision in the case before it",
      "Order Parliament to amend the Act",
    ],
    1,
    "Make a DECLARATION OF INCOMPATIBILITY. It does NOT affect validity or the parties' rights — the court must still apply the Act, so Parliamentary supremacy is preserved. It signals the problem to Parliament, which may choose to amend."),

  q2("LWEK-06-04", "LWE-06", "A", "medium",
    "Against whom does section 6 of the Human Rights Act give a direct claim?",
    ["Any employer", "A public authority acting incompatibly with a Convention right", "Any company with over 250 employees", "Only central government departments"],
    1,
    "A PUBLIC AUTHORITY. Against a purely private party the Act works INDIRECTLY, because a court is itself a public authority and must interpret the applicable legislation compatibly under s.3."),

  q2("LWEK-06-05", "LWE-06", "A", "hard",
    "Why is the remedy under section 4 deliberately weak?",
    [
      "Because Convention rights are not part of English law",
      "To preserve Parliamentary supremacy, since no court may set aside an Act",
      "Because the courts lack the expertise to assess compatibility",
      "Because the Convention is not binding on the United Kingdom",
    ],
    1,
    "To preserve PARLIAMENTARY SUPREMACY. A power to strike down an Act would destroy it, so the Act gives courts a strong INTERPRETIVE duty under s.3 and only a declaratory power under s.4. Note the contrast with DELEGATED legislation, which a court CAN invalidate."),
]

export const LWE_KIT_AREA_A: AccaQuestion[] = [
  ...CH01,
  ...CH02,
  ...CH03,
  ...CH04,
  ...CH05,
  ...CH06,
]
