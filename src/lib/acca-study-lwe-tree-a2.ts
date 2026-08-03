import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area A, second half — statutory interpretation and human rights.
 * Chapters 5–6 of the LW-ENG reading tree, mapped to syllabus groups A2(c)–A2(d).
 *
 * Split from `acca-study-lwe-tree-a.ts` only for file size. The two chapters here are
 * the ones a Global learner never meets: Global's Area A ends with arbitration and the
 * conflict of laws, where ENG ends with how an English judge reads an English statute
 * and what the Human Rights Act does to that reading.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 5 · A2(c) ─────────────────────────────────────────── */

export const LWE_TREE_05: StudyChapter = {
  id: "LWE-05",
  number: 5,
  paper: "LW",
  area: "A",
  title: "Statutory interpretation: the rules and the presumptions",
  minutes: 16,
  syllabusRefs: ["A2(c)"],
  intro:
    "Parliament writes the words; judges decide what they mean when the words run out or point two ways. The rules of interpretation are the tools for that, and questions almost always hinge on which tool a judge reached for and what it produced.",
  outcomes: [
    "Apply the literal, golden and mischief rules, and the purposive approach",
    "Use the three rules of language — ejusdem generis, noscitur a sociis, expressio unius",
    "Identify the presumptions a court starts from, and that they are rebuttable",
    "Distinguish intrinsic from extrinsic aids to interpretation",
    "Choose and justify an approach on given statutory wording",
  ],
  sections: [
    {
      id: "the-rules",
      heading: "The four approaches to meaning",
      blocks: [
        {
          kind: "table",
          caption: "The rules of interpretation, and what each does with the words",
          head: ["Approach", "How the judge proceeds", "Its weakness"],
          rows: [
            ["**Literal rule**", "Give the words their **ordinary, plain meaning**, even if the result seems poor. Parliament is taken to have meant what it said", "Can produce an absurd or unjust outcome that Parliament plainly never intended"],
            ["**Golden rule**", "Start literally, but **depart from the plain meaning where it would produce an absurdity** or an obviously repugnant result — modifying the words no further than necessary", "\"Absurdity\" is a matter of judgement, so the rule gives the judge real latitude"],
            ["**Mischief rule**", "Ask what **defect in the old law** Parliament was trying to cure, and read the words so as to cure it", "Requires the court to identify the mischief, which may not be obvious"],
            ["**Purposive approach**", "Read the provision so as to give effect to the **purpose of the legislation as a whole**. Now the dominant approach", "Shades into the court supplying policy rather than finding it"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "How the four relate to each other",
          md: "They are not four alternatives a judge picks at random. The literal rule is the **starting point** — if the words are clear, that is the end of it, because Parliament is supreme. The golden rule is a **safety valve** on the literal rule. The mischief rule and the purposive approach both look **outside** the words to what the Act is for, the mischief rule looking backwards to the defect being cured and the purposive approach forwards to the object being achieved. Modern courts lean purposive, but a clear statute is still applied as written.",
        },
        {
          kind: "illustration",
          title: "The same words, three approaches",
          md: "A statute makes it an offence to \"use a vehicle on a road while it is in a dangerous condition\". A lorry with a defective brake is being **pushed** along the road by three employees, its engine off.\n\nOn the **literal rule**, \"use\" in its ordinary sense may well not cover a vehicle nobody is driving, so no offence.\n\nOn the **golden rule**, a judge who thought that result absurd — a dangerous lorry moving on a public road escaping the provision — could depart from the plain meaning to avoid it.\n\nOn the **mischief rule** or a **purposive** reading, the defect Parliament was curing is dangerous vehicles on public roads endangering others. A lorry with failed brakes being pushed along creates exactly that danger, so \"use\" is read to cover it and the offence is committed.\n\nNotice that the approach chosen, not the facts, decides the case."
        },
        {
          kind: "table",
          caption: "The three rules of language",
          head: ["Rule", "What it means", "Worked instance"],
          rows: [
            ["**Ejusdem generis** — \"of the same kind\"", "General words following a list of specific ones are read as limited to the **same class** as the list", "\"Cats, dogs, and other animals\" is read as other **domestic** animals, so it does not catch a wild badger"],
            ["**Noscitur a sociis** — \"known by its associates\"", "A word takes colour from the **words around it** and from its context in the Act", "\"Charges\" in a section otherwise about interest and fees means monetary charges, not a charge over property"],
            ["**Expressio unius est exclusio alterius**", "**Expressly listing** some things excludes those not listed — the list is taken as exhaustive", "\"Land, houses and coalmines\" excludes other kinds of mine, because coalmines were specified"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Ejusdem generis and expressio unius pull in opposite directions",
          md: "Both operate on a list, and they give **opposite** answers, so the distinction matters. **Ejusdem generis** applies where the list is followed by **general words** (\"… and other vehicles\"), and it *narrows* those general words to the class of the list. **Expressio unius** applies where there are **no** general words, and it treats the list as *closed*. Look for the general catch-all phrase: if it is there, ejusdem generis; if it is absent, expressio unius.",
        },
      ],
      check: {
        q: "A statute regulates \"lorries, vans, buses and other vehicles\". Does it catch a bicycle?",
        options: [
          "Yes, because a bicycle is a vehicle in ordinary language",
          "No — under ejusdem generis the general words are limited to the class of the list, which is motor vehicles",
          "No, because expressio unius makes the list exhaustive",
          "Yes, because the purposive approach always extends a list",
        ],
        correct: 1,
        explain:
          "NO, under EJUSDEM GENERIS. The general words \"other vehicles\" follow a list of MOTOR vehicles, so they are read as confined to that class, and a bicycle falls outside. Expressio unius is the wrong tool here — it applies where there are NO general catch-all words and the list is treated as closed.",
      },
    },
    {
      id: "presumptions-aids",
      heading: "The presumptions, and the aids a judge may use",
      blocks: [
        {
          kind: "list",
          title: "The presumptions the court starts from",
          items: [
            "**Against changing the common law** — Parliament is presumed not to have altered established judge-made law unless it says so.",
            "**Against retrospective effect** — a statute is presumed to operate on the future only.",
            "**Against removing an existing right**, including a right of access to the courts.",
            "**Against imposing criminal liability without fault** — *mens rea* is presumed to be required unless the statute makes the offence one of strict liability.",
            "**Against depriving a person of property without compensation**.",
            "**That the Crown is not bound**, unless the Act says otherwise.",
            "**That the statute applies to the whole of the jurisdiction**, and not beyond it.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Every presumption is rebuttable, and that is the examinable point",
          md: "A presumption is a **starting position**, not a rule of law. If the statute uses **clear enough words**, the presumption is displaced — Parliament may legislate retrospectively, may create strict liability offences, and may bind the Crown, provided it says so plainly. So the answer to \"can Parliament do this?\" is almost always **yes, if it says so clearly enough**. The presumption decides what happens when the words are *unclear*.",
        },
        {
          kind: "table",
          caption: "Intrinsic and extrinsic aids",
          head: ["Intrinsic — inside the Act itself", "Extrinsic — outside it"],
          rows: [
            ["The **long and short title**", "**Dictionaries**, for the ordinary meaning of a word"],
            ["The **preamble**, where there is one, stating the Act's purpose", "The **Interpretation Act 1978**, which defines recurring terms"],
            ["**Definition or interpretation sections**", "**Reports** of law reform bodies, showing the mischief"],
            ["**Headings, side-notes and marginal notes**", "**Hansard**, the record of Parliamentary debate — admissible in limited circumstances"],
            ["**Schedules** to the Act", "**Earlier statutes** on the same subject, and decided cases interpreting them"],
          ],
        },
        {
          kind: "example",
          title: "Interpreting a provision from scratch",
          scenario:
            "The Trading Standards Act creates an offence for a business to \"display for sale any knife, blade or other article capable of causing injury\" in premises accessible to under-18s. Ashcombe Crafts displays knitting needles and a decorative letter-opener in an open shop area. It is prosecuted. The Act has no definition section; its preamble refers to \"curbing the availability of offensive weapons to young persons\". The company also argues it did not know the display was unlawful.",
          steps: [
            { label: "Start with the literal rule", detail: "Read literally, \"other article capable of causing injury\" is extremely wide — a knitting needle plainly CAN cause injury, and so could countless shop items. The literal reading produces a near-absurd width." },
            { label: "Apply ejusdem generis to the general words", detail: "The general words follow \"knife, blade\", a list of BLADED articles. Under EJUSDEM GENERIS the general words are confined to that class, so \"other article capable of causing injury\" means other bladed or similar weapons — which excludes knitting needles but may catch the letter-opener." },
            { label: "Use the preamble as an intrinsic aid", detail: "The preamble names the mischief as the availability of OFFENSIVE WEAPONS to young persons. On the mischief rule and a purposive reading this confirms the narrower construction: knitting needles are not offensive weapons, and Parliament was not legislating about haberdashery." },
            { label: "Test the letter-opener", detail: "A decorative letter-opener is bladed and, on the ejusdem generis construction, arguably within the class. Whether it is an OFFENSIVE weapon on the purposive reading is the real question, and the answer turns on whether it is sharpened and usable as such." },
            { label: "Deal with the knowledge argument", detail: "Ignorance of the law is no defence. But the presumption AGAINST liability without fault means MENS REA is presumed necessary unless the Act clearly imposes strict liability — so whether Ashcombe knew the article was within the prohibition may matter, depending on the statute's wording." },
          ],
          result:
            "The knitting needles fall outside the section once **ejusdem generis** and the **preamble** narrow the general words; the letter-opener is arguable and turns on whether it is a weapon in substance. The general lesson is that the literal rule opened the question and the **rules of language plus the stated purpose** closed it.",
        },
      ],
      check: {
        q: "A statute is silent on whether an offence requires a guilty mind. What does the court presume?",
        options: [
          "That the offence is one of strict liability, to make enforcement effective",
          "That mens rea is required — though the presumption yields to sufficiently clear statutory words",
          "That the offence is void for uncertainty",
          "That the common law offence applies instead",
        ],
        correct: 1,
        explain:
          "That MENS REA IS REQUIRED. There is a presumption against criminal liability without fault, so silence is read as requiring a guilty mind. Like every presumption it is REBUTTABLE — Parliament can create a strict liability offence, but it must use clear enough words to displace the presumption.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using expressio unius where the list ends with general catch-all words.",
      fix: "General words present means EJUSDEM GENERIS, narrowing them to the class. Expressio unius is for lists with NO catch-all.",
    },
    {
      trap: "Treating a presumption as an absolute rule Parliament cannot override.",
      fix: "Every presumption is rebuttable by sufficiently clear statutory wording.",
    },
    {
      trap: "Reaching for the mischief rule when the words are perfectly clear.",
      fix: "Clear words are applied as written — the literal rule is the starting point, because Parliament is supreme.",
    },
  ],
  keyTerms: [
    { term: "Literal rule", def: "Giving statutory words their ordinary plain meaning, even where the outcome seems poor." },
    { term: "Golden rule", def: "Departing from the plain meaning only so far as needed to avoid an absurd or repugnant result." },
    { term: "Mischief rule", def: "Reading the words so as to cure the defect in the old law that Parliament was addressing." },
    { term: "Purposive approach", def: "Reading a provision to give effect to the purpose of the legislation as a whole; now dominant." },
    { term: "Ejusdem generis", def: "General words following a list are limited to the same class as the items listed." },
    { term: "Noscitur a sociis", def: "A word takes its meaning from the words around it and its context." },
    { term: "Expressio unius est exclusio alterius", def: "Expressly listing some things excludes those not listed, the list being treated as closed." },
    { term: "Intrinsic aid", def: "An aid to interpretation found inside the Act — title, preamble, definition sections, schedules." },
    { term: "Extrinsic aid", def: "An aid found outside the Act — dictionaries, the Interpretation Act 1978, law reform reports, Hansard." },
  ],
  summary: [
    "The literal rule starts the exercise; the golden rule relieves absurdity; the mischief rule and purposive approach look to what the Act is for.",
    "Ejusdem generis narrows general words following a list; expressio unius closes a list with no general words.",
    "Noscitur a sociis reads a word in the light of its neighbours.",
    "The presumptions — against retrospectivity, against liability without fault, against removing rights — are all rebuttable by clear words.",
    "Intrinsic aids sit inside the Act; extrinsic aids, including Hansard in limited circumstances, sit outside it.",
  ],
  knowledgeDiagnostic: [
    { q: "When does ejusdem generis apply rather than expressio unius?", a: "When the list is followed by general catch-all words, which it confines to the class of the list. Expressio unius applies where there are no such words." },
    { q: "What does the golden rule allow a judge to do?", a: "Depart from the plain meaning where it would produce an absurd or repugnant result, modifying the words no more than necessary." },
    { q: "Is the presumption against retrospective effect absolute?", a: "No. Like every presumption it is rebuttable, and Parliament may legislate retrospectively using clear words." },
    { q: "Give three intrinsic aids to interpretation.", a: "The long and short title, the preamble, and definition or interpretation sections; headings and schedules also qualify." },
  ],
}

/* ── Chapter 6 · A2(d) ─────────────────────────────────────────── */

export const LWE_TREE_06: StudyChapter = {
  id: "LWE-06",
  number: 6,
  paper: "LW",
  area: "A",
  title: "Human rights law and its impact",
  minutes: 14,
  syllabusRefs: ["A2(d)"],
  intro:
    "The Human Rights Act reaches into every corner of English law without displacing Parliamentary supremacy — a balance struck by giving courts a strong duty to interpret and a deliberately weak power to invalidate.",
  outcomes: [
    "Explain how the European Convention takes effect in English law through the Human Rights Act 1998",
    "Identify the Convention rights that most affect business",
    "Explain the interpretive obligation on courts and its limits",
    "Distinguish a declaration of incompatibility from a power to strike down",
    "Explain who a claim under the Act can be brought against",
  ],
  sections: [
    {
      id: "the-mechanism",
      heading: "How Convention rights bite in English law",
      blocks: [
        {
          kind: "definition",
          term: "The Human Rights Act 1998",
          md: "The Act that gives **effect in English law** to most rights in the European Convention on Human Rights. Before it, the Convention bound the United Kingdom in international law but a claimant had to go to Strasbourg; the Act lets Convention rights be argued in an English court.",
        },
        {
          kind: "list",
          style: "number",
          title: "The four mechanisms that matter",
          items: [
            "**The interpretive obligation (s.3).** So far as it is possible to do so, legislation must be read and given effect **compatibly with Convention rights**. This is a strong duty and does much of the Act's real work, because a court will strain a reading to achieve compatibility.",
            "**Public authorities bound (s.6).** It is unlawful for a **public authority** to act incompatibly with a Convention right, which gives a direct claim against the authority. Courts are themselves public authorities, which is how the Act reaches private disputes indirectly.",
            "**Declaration of incompatibility (s.4).** Where a statutory provision simply **cannot** be read compatibly, a higher court may declare it incompatible. The declaration does **not** affect the provision's validity or the parties' rights — it signals to Parliament, which may then amend the law.",
            "**Statements of compatibility (s.19).** A minister introducing a Bill must state whether it is compatible with Convention rights, which puts the question on the record before enactment.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why a declaration of incompatibility is deliberately weak",
          md: "This is the point candidates most often get wrong. A court **cannot strike down an Act** for breaching Convention rights — that would destroy Parliamentary supremacy (chapter 4). What it can do is interpret hard under s.3, and if that fails, declare the incompatibility and leave the remedy to Parliament. Contrast **delegated** legislation, which the court *can* invalidate, and which it can hold ultra vires for incompatibility. The asymmetry is the same one as ultra vires: primary legislation is untouchable, secondary is not.",
        },
        {
          kind: "table",
          caption: "The Convention rights that most often arise in a business context",
          head: ["Right", "Where it touches business"],
          rows: [
            ["**Article 6** — right to a fair trial", "Disciplinary and regulatory proceedings, tribunal procedure, and the conduct of investigations"],
            ["**Article 8** — respect for private life, home and correspondence", "Employee monitoring, surveillance, and the handling of personal data"],
            ["**Article 10** — freedom of expression", "Whistleblowing, and the limits of confidentiality obligations"],
            ["**Article 11** — freedom of assembly and association", "Trade union membership and activity"],
            ["**Article 14** — prohibition of discrimination in the enjoyment of Convention rights", "Employment practices"],
            ["**Article 1 of the First Protocol** — peaceful enjoyment of possessions", "Property rights, and interference with them by the state"],
          ],
        },
        {
          kind: "example",
          title: "Running a Convention argument",
          scenario:
            "Redhaven NHS Trust dismisses Okonjo, an employee, after reading personal emails she sent from a work account, having given no notice that private correspondence would be monitored. A statutory provision requires an employment tribunal to dismiss any claim not brought within a fixed period, and Okonjo is two days late because the Trust delayed giving her the dismissal letter. She wishes to challenge both the monitoring and the time limit.",
          steps: [
            { label: "Identify whether the Act applies to the employer", detail: "An NHS Trust is a PUBLIC AUTHORITY, so under s.6 it acts unlawfully if it acts incompatibly with a Convention right — Okonjo has a direct claim. Against a purely private employer she would have to rely on s.3 interpretation of the employment legislation instead." },
            { label: "Identify the right engaged by the monitoring", detail: "ARTICLE 8, respect for private life and correspondence. Reading personal emails without notice engages it; the Trust would have to justify the interference as lawful, necessary and proportionate, and the absence of any monitoring policy makes that hard." },
            { label: "Attack the time limit under s.3 first", detail: "Under s.3 the tribunal must read the time-limit provision compatibly with ARTICLE 6 SO FAR AS POSSIBLE. If the words admit a reading that allows an extension where the employer's own delay caused the lateness, the tribunal must adopt it. This is the route that actually helps Okonjo." },
            { label: "Consider a declaration only if interpretation fails", detail: "If the provision is so clear that no compatible reading is possible, a HIGHER court may make a DECLARATION OF INCOMPATIBILITY. But that would not let Okonjo's claim in — the provision stays valid and binding, and only Parliament can change it." },
            { label: "State the correct conclusion on remedies", detail: "Her real prospects lie in the Article 8 claim against the Trust as a public authority, and in a compatible reading of the time limit under s.3. A declaration would be a hollow victory." },
          ],
          result:
            "Section 3 is the workhorse and section 4 is the last resort. The Trust's status as a **public authority** is what gives Okonjo a direct claim, and the **absence of a monitoring policy** is what makes the Article 8 interference hard to justify.",
        },
      ],
      check: {
        q: "A court finds that an Act of Parliament cannot be read compatibly with a Convention right. What can it do?",
        options: [
          "Strike the provision down as invalid",
          "Make a declaration of incompatibility, which leaves the provision valid and binding",
          "Refer the Act back to Parliament for a compulsory second vote",
          "Disapply the provision in the case before it",
        ],
        correct: 1,
        explain:
          "Make a DECLARATION OF INCOMPATIBILITY. It does NOT affect the provision's validity or the parties' rights — the court must still apply the Act, because Parliamentary supremacy is preserved. The declaration signals the problem to Parliament, which may choose to amend the law.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying a court can strike down an Act that breaches Convention rights.",
      fix: "It cannot. The court interprets compatibly under s.3 if possible, and otherwise declares incompatibility under s.4, leaving the Act valid.",
    },
    {
      trap: "Assuming the Act gives a direct claim against any employer.",
      fix: "Section 6 binds PUBLIC authorities. Against a private party the Act works indirectly, through the s.3 duty on the court interpreting the legislation.",
    },
    {
      trap: "Treating a declaration of incompatibility as a win for the claimant.",
      fix: "It changes nothing for the parties. The provision continues to bind until Parliament amends it.",
    },
  ],
  keyTerms: [
    { term: "Human Rights Act 1998", def: "The Act giving effect in English law to most European Convention rights." },
    { term: "Interpretive obligation (s.3)", def: "The duty to read and give effect to legislation compatibly with Convention rights so far as possible." },
    { term: "Public authority (s.6)", def: "A body, including a court, which acts unlawfully if it acts incompatibly with a Convention right." },
    { term: "Declaration of incompatibility (s.4)", def: "A higher court's declaration that a provision cannot be read compatibly; it leaves the provision valid and binding." },
    { term: "Statement of compatibility (s.19)", def: "A minister's statement, on introducing a Bill, as to whether it is compatible with Convention rights." },
  ],
  summary: [
    "The Human Rights Act 1998 lets Convention rights be argued in an English court rather than only in Strasbourg.",
    "Section 3 requires legislation to be read compatibly so far as possible, and does most of the Act's work.",
    "Section 6 makes it unlawful for a public authority to act incompatibly, giving a direct claim.",
    "A section 4 declaration of incompatibility leaves the Act valid — Parliamentary supremacy is preserved.",
    "Articles 6, 8, 10, 11 and 14, and Article 1 of the First Protocol, are the rights that most affect business.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the effect of a declaration of incompatibility?", a: "None on validity or on the parties. The provision remains binding and it is for Parliament to decide whether to amend it." },
    { q: "Which section does most of the Act's practical work, and why?", a: "Section 3, because courts must read legislation compatibly with Convention rights so far as possible, and will strain a reading to do so." },
    { q: "How does the Act reach a dispute between two private parties?", a: "Indirectly. A court is itself a public authority under s.6, and must interpret the applicable legislation compatibly under s.3." },
    { q: "Which Convention right is engaged by monitoring an employee's personal correspondence?", a: "Article 8, respect for private life and correspondence." },
  ],
}

export const LWE_TREE_AREA_A_PART2: StudyChapter[] = [LWE_TREE_05, LWE_TREE_06]
