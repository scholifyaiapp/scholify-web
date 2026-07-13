import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW (English/UK) · Area A — Essential elements of the legal system.
 * Rich study chapter matching the FA_A exemplar for depth, tone and visuals.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const LW_A: StudyChapter = {
  paper: "LW",
  area: "A",
  title: "Essential elements of the legal system",
  minutes: 15,
  intro: "Before you can argue a contract or challenge a director, you need the ground rules: where English law comes from, who decides disputes, and how much proof it takes to win. This is the map of the whole paper.",
  outcomes: [
    "Describe the nature of English law and distinguish common law from statute",
    "Set out the court hierarchy and separate the civil courts from the criminal courts",
    "Explain judicial precedent — ratio decidendi, obiter dicta, and binding vs persuasive authority",
    "Explain how a court avoids an earlier precedent: distinguishing, overruling and reversing",
    "Apply the rules of statutory interpretation — literal, golden, mischief and the purposive approach",
    "State and contrast the civil and criminal standards and burdens of proof",
  ],
  sections: [
    {
      id: "sources",
      heading: "What English law is, and where it comes from",
      blocks: [
        { kind: "text", md: "English law is unusual. Most of the world runs on **codified** systems where a single written code, drafted in advance, tries to answer every question. England instead grew its law case by case, judge by judge, over centuries — a **common law** system. The rules were never written down in one book; they emerged from the decisions judges made when real disputes came before them, and each decision became a guide for the next. This is why the English legal system exports so easily: much of the Commonwealth, and the United States, inherited it." },
        { kind: "text", md: "Today two great streams feed the law, and you must be able to tell them apart. **Case law** (also called common law) is judge-made: the accumulated reasoning of decided cases. **Statute** is Parliament-made: Acts of Parliament passed by the legislature. The two are not equal partners — when they clash, **statute always wins**, because Parliament is **sovereign**. A judge can develop the common law, but a clear Act of Parliament overrides any case decision, and no court can strike down a valid Act." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The main sources of English law",
          caption: "Statute sits at the top of the domestic hierarchy; the courts interpret and apply it.",
          data: {
            items: [
              { title: "Statute (legislation)", sub: "Acts of Parliament — the supreme domestic source" },
              { title: "Delegated legislation", sub: "Rules made under an Act by ministers or bodies" },
              { title: "Case law / common law", sub: "Judge-made law built from decided cases" },
              { title: "Equity", sub: "Discretionary remedies developed to soften the common law" },
              { title: "Retained EU law", sub: "EU-derived rules kept in force after Brexit, now amendable" },
              { title: "Human rights", sub: "Convention rights given effect by the Human Rights Act 1998" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "English law is a **common law** system built from decided cases, but **Parliament is sovereign**: a valid Act of Parliament overrides any judicial decision, and no court can override it." },
        { kind: "text", md: "Two more sources round out the picture. **Equity** is a separate body of principles that grew up alongside the common law to fix its harshness — where common law offered only money damages, equity added flexible remedies like the **injunction** and **specific performance**, granted at the court's discretion. And since the Human Rights Act 1998, the **European Convention on Human Rights** shapes how all other law is read: courts must interpret legislation compatibly with Convention rights so far as it is possible to do so." },
      ],
    },
    {
      id: "courts",
      heading: "The court structure — and the civil/criminal split",
      blocks: [
        { kind: "text", md: "Disputes are resolved in a **hierarchy** of courts, and the shape of that hierarchy matters for everything that follows — because a court's place in the ladder decides whose decisions bind it. Read the pyramid from the bottom: most cases start in the lower courts, and only a few, on the most important points of law, climb to the top." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The English court hierarchy",
          caption: "Higher courts bind lower ones. The Supreme Court sits above all others.",
          data: {
            levels: [
              { label: "Supreme Court", sub: "Final court of appeal for the whole UK" },
              { label: "Court of Appeal", sub: "Civil Division & Criminal Division" },
              { label: "High Court", sub: "King's Bench, Chancery & Family Divisions" },
              { label: "County Court / Crown Court", sub: "County Court (civil) · Crown Court (serious crime)" },
              { label: "Magistrates' Court / tribunals", sub: "Minor crime, first hearings, small claims" },
            ],
          },
        } },
        { kind: "text", md: "The two great branches of law run through this structure like two separate tracks. **Criminal law** is about wrongs against society: the **state** (through the Crown Prosecution Service) prosecutes a **defendant**, and if the case is proven the outcome is **punishment** — a fine, community order or prison. **Civil law** is about disputes between private parties: a **claimant sues a defendant** to enforce a right, and the outcome is a **remedy** — usually **damages** (money) or an injunction — not punishment. The same act can trigger both: a dangerous driver may be prosecuted by the state **and** sued by the injured pedestrian." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Civil law vs criminal law",
          data: {
            leftTitle: "Civil law",
            rightTitle: "Criminal law",
            rows: [
              { aspect: "Purpose", left: "Resolve disputes, enforce rights", right: "Punish wrongs against society" },
              { aspect: "Who brings it", left: "The claimant (a private party)", right: "The state / Crown Prosecution Service" },
              { aspect: "Parties", left: "Claimant v defendant", right: "R (the Crown) v defendant" },
              { aspect: "Main courts", left: "County Court, High Court", right: "Magistrates' Court, Crown Court" },
              { aspect: "Outcome", left: "Damages or an injunction", right: "Fine, community order, imprisonment" },
              { aspect: "Language of result", left: "Liable / not liable", right: "Guilty / not guilty" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "A fast exam sort: if the language is **\"guilty\", \"prosecute\", \"punish\", \"the Crown\"** you are in **criminal** law. If it is **\"sue\", \"liable\", \"damages\", \"claimant\"** you are in **civil** law. Most of the LW syllabus (contract, employment, company law) is **civil**." },
      ],
      check: {
        q: "A supplier delivers faulty machinery and the buyer takes the supplier to court to recover its losses. Which best describes this action?",
        options: [
          "A criminal prosecution brought by the state to punish the supplier",
          "A civil claim in which the buyer seeks damages from the supplier",
          "A criminal case heard in the Magistrates' Court",
          "A civil case that will result in the supplier being found guilty",
        ],
        correct: 1,
        explain: "This is a private dispute between two businesses over a broken obligation, so it is CIVIL. The buyer is the claimant seeking a remedy (damages), not the state seeking punishment. 'Guilty' and 'prosecution' belong to criminal law, so the other options mislabel the case.",
      },
    },
    {
      id: "precedent",
      heading: "Judicial precedent — how one case binds the next",
      blocks: [
        { kind: "text", md: "The engine of the common law is the doctrine of **judicial precedent**, captured in the Latin phrase **stare decisis** — \"stand by what has been decided.\" The idea is simple and powerful: once a court has settled a point of law, later courts should decide the same point the same way. This gives the law two things people badly need — **consistency** (like cases treated alike) and **predictability** (you can advise a client on the likely outcome)." },
        { kind: "text", md: "But not every word a judge says becomes binding law. A judgment splits into two parts, and telling them apart is one of the most tested skills in this whole area. The **ratio decidendi** is the **reason for the decision** — the legal principle the judge had to decide in order to reach the result on these facts. That, and only that, is **binding** on future courts. Everything else — a judge's asides, hypothetical examples, or comments on what the answer *would* have been on different facts — is **obiter dicta**, \"things said by the way,\" which is only **persuasive**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Ratio decidendi vs obiter dicta",
          data: {
            leftTitle: "Ratio decidendi",
            rightTitle: "Obiter dicta",
            rows: [
              { aspect: "Meaning", left: "The reason for the decision", right: "Things said by the way" },
              { aspect: "What it is", left: "The legal principle the case turned on", right: "Asides, examples, hypotheticals" },
              { aspect: "Authority", left: "Binding on lower courts", right: "Persuasive only" },
              { aspect: "Tied to", left: "The material facts of the case", right: "Not essential to the outcome" },
              { aspect: "Example", left: "\"A duty of care is owed to one's neighbour\"", right: "\"The result might differ if the item were a gift\"" },
            ],
          },
        } },
        { kind: "text", md: "Whether a precedent **binds** or merely **persuades** depends on **which court** decided it. A decision is **binding** if it comes from a court **above** you (or, historically, the same senior court) in the hierarchy: the Supreme Court binds everyone below it; the Court of Appeal binds the High Court and below. A decision is only **persuasive** — worth listening to, but not compulsory — if it comes from a **lower** court, a **different jurisdiction** (say a Commonwealth court), or is **obiter**. The Supreme Court can even depart from its own past decisions when it is right to do so, under the 1966 Practice Statement." },
        { kind: "callout", tone: "rule", title: "The precedent test", md: "Ask two questions of any earlier case. **(1)** Is the point I need part of the **ratio** (binding) or just **obiter** (persuasive)? **(2)** Did it come from a court **above me** in the hierarchy (binding) or elsewhere (persuasive)? Only \"ratio\" **and** \"higher court\" gives a **binding** precedent." },
      ],
      check: {
        q: "A High Court judge is deciding a case. Which of the following is BINDING on that judge?",
        options: [
          "The ratio decidendi of an earlier Court of Appeal decision on the same point",
          "An obiter comment made by a Supreme Court judge in an unrelated case",
          "The decision of a County Court on similar facts",
          "A ruling of the Supreme Court of Canada on the same issue",
        ],
        correct: 0,
        explain: "A precedent binds only when it is the RATIO of a case from a court ABOVE you. The Court of Appeal sits above the High Court, so its ratio binds. Obiter is merely persuasive (even from the Supreme Court); a County Court sits below; and a foreign court's decision is persuasive only, however senior it is abroad.",
      },
    },
    {
      id: "avoiding",
      heading: "Escaping a precedent — distinguishing, overruling, reversing",
      blocks: [
        { kind: "text", md: "Precedent would freeze the law solid if judges could never move away from an earlier case. They can — but only in defined ways, and the exam loves to test whether you can name the right one. There are three routes, and the trick is to notice **who acts, on which case, and when**." },
        { kind: "text", md: "**Distinguishing** is the everyday escape. A judge who does not want to follow a binding case argues that its **material facts are different** from the case in front of them, so the earlier ratio simply does not apply here. The old case stays good law; it just does not govern this situation. Any court can distinguish, which is what makes the common law flexible without being lawless." },
        { kind: "text", md: "**Overruling** is heavier. Here a **higher court, in a later and separate case**, declares that the legal principle in an earlier case was **wrong** and should no longer be followed. It changes the law for the future but does not touch the parties in the original case — that decision, between them, still stands. **Reversing** is different again: it happens **within the same case** on appeal, when a higher court changes the outcome reached by the court below. Same dispute, same parties, decision flipped upstairs." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Three ways a court avoids an earlier decision",
          caption: "Watch whether it is a new case or the same case, and who is acting.",
          data: {
            steps: [
              { label: "Distinguishing", sub: "Any court: facts are materially different, so the ratio doesn't apply" },
              { label: "Overruling", sub: "Higher court, later separate case: the earlier principle was wrong" },
              { label: "Reversing", sub: "Higher court, same case on appeal: the lower court's outcome is flipped" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Don't confuse overruling with reversing", md: "**Overruling** = a **different, later** case; changes the **law** going forward. **Reversing** = the **same** case on appeal; changes the **result** for these parties. If the parties are the same and it's an appeal, it is **reversing**." },
      ],
    },
    {
      id: "interpretation",
      heading: "Reading the words — statutory interpretation",
      blocks: [
        { kind: "text", md: "Statute is supreme, but words are slippery. When an Act's language is unclear or would produce a strange result, judges must decide what Parliament actually meant. Over time the courts developed **rules of interpretation** — not a rigid sequence, but four recognised approaches, and you must be able to describe each and spot which one a judge has used." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The rules of statutory interpretation",
          caption: "From the strictest reading of the words to the broadest search for purpose.",
          data: {
            items: [
              { title: "Literal rule", sub: "Give words their plain, ordinary meaning — even if the result seems odd" },
              { title: "Golden rule", sub: "Start literal, but depart to avoid an absurd or repugnant result" },
              { title: "Mischief rule", sub: "Ask what defect (mischief) the Act was passed to remedy, and read it to cure that" },
              { title: "Purposive approach", sub: "Read the words in light of the Act's broader purpose and spirit" },
            ],
          },
        } },
        { kind: "text", md: "The **literal rule** is the starting point: judges give the words their ordinary dictionary meaning, on the theory that the words Parliament chose are the best evidence of its intention — even if the outcome looks harsh. The **golden rule** is a safety valve on the literal rule: read literally first, but if that produces an **absurdity** or something plainly contrary to sense, adjust the meaning just enough to avoid it." },
        { kind: "text", md: "The **mischief rule** looks behind the words entirely. It asks: what was the law **before** the Act, what **gap or \"mischief\"** was Parliament trying to fix, and what reading of the words best **cures** that mischief? The modern **purposive approach** is its broader descendant — now the dominant style, reinforced by human-rights and formerly EU-influenced interpretation — asking what **purpose** Parliament was pursuing and reading the statute to advance it, rather than defeat it on a technicality." },
        { kind: "example", title: "Worked example — same words, four routes", scenario: "Imagine an Act that bans anyone from \"riding a vehicle\" in a public park, passed after complaints about fast bicycles injuring pedestrians. A person is caught pushing a mobility scooter at walking pace beside them. Would each rule catch this person?", steps: [
          { label: "Literal rule", detail: "Ask only: is a mobility scooter a 'vehicle' being 'ridden'? On plain meaning it arguably is — so the literal rule may catch the person, however odd that feels." },
          { label: "Golden rule", detail: "If applying the literal meaning to a slow mobility scooter is absurd or unjust, the court may read 'ride a vehicle' to exclude it, avoiding the absurd outcome." },
          { label: "Mischief rule", detail: "The mischief was FAST bicycles endangering pedestrians. A scooter at walking pace is not that mischief, so the Act should not catch it." },
          { label: "Purposive approach", detail: "Parliament's purpose was pedestrian safety in parks. Reading the Act to fine a careful, slow scooter user does not serve that purpose, so the person is not caught." },
        ], result: "The literal rule may convict; the golden, mischief and purposive approaches each let the court reach the sensible result Parliament intended. Naming which rule drives which outcome is exactly what the exam rewards." },
        { kind: "callout", tone: "tip", md: "Quick tags: **\"plain / ordinary meaning\"** → literal; **\"absurd result avoided\"** → golden; **\"the gap the Act was meant to fix\"** → mischief; **\"the purpose / spirit of the Act\"** → purposive." },
      ],
      check: {
        q: "A judge decides that the ordinary meaning of a word in an Act would produce a plainly absurd result, so she departs from that meaning just far enough to avoid the absurdity. Which rule is she using?",
        options: [
          "The literal rule",
          "The golden rule",
          "The mischief rule",
          "The purposive approach",
        ],
        correct: 1,
        explain: "The GOLDEN rule begins with the literal meaning but allows the court to move away from it to avoid an absurd or repugnant outcome. The literal rule would apply the plain meaning regardless; the mischief rule looks at the gap the Act was passed to cure; the purposive approach looks to the Act's overall purpose.",
      },
    },
    {
      id: "proof",
      heading: "Winning a case — the burden and standard of proof",
      blocks: [
        { kind: "text", md: "Once you know which court and which branch of law you are in, one practical question decides who wins: **how much proof is needed, and who has to provide it?** Two ideas answer this. The **burden of proof** is about **who must prove** the case — as a rule, the party making the assertion. The **standard of proof** is about **how convincingly** they must prove it — and this is where civil and criminal law part company sharply." },
        { kind: "text", md: "In a **criminal** case the **prosecution** carries the burden, and the standard is high: **beyond reasonable doubt**. The jury must be sure of guilt, because the consequences — loss of liberty, a criminal record — are grave, and we would rather let a guilty person go free than convict an innocent one. In a **civil** case the **claimant** carries the burden, and the standard is lower: the **balance of probabilities** — meaning **more likely than not**, tipping the scales past the 50% line. The stakes are money or an injunction, not liberty, so a simple majority of the evidence is enough." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Standard and burden of proof",
          data: {
            leftTitle: "Civil case",
            rightTitle: "Criminal case",
            rows: [
              { aspect: "Who bears the burden", left: "The claimant", right: "The prosecution" },
              { aspect: "Standard of proof", left: "Balance of probabilities", right: "Beyond reasonable doubt" },
              { aspect: "In plain words", left: "More likely than not (>50%)", right: "The court must be sure" },
              { aspect: "Why it differs", left: "Money / rights at stake", right: "Liberty and reputation at stake" },
              { aspect: "Result if met", left: "Defendant is liable", right: "Defendant is guilty" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The two standards", md: "**Criminal** law demands proof **beyond reasonable doubt** — the court must be sure. **Civil** law demands only the **balance of probabilities** — more likely than not. The higher criminal standard reflects the greater consequences of a conviction." },
      ],
      check: {
        q: "In a civil claim for breach of contract, what standard of proof must the claimant meet to succeed?",
        options: [
          "Beyond reasonable doubt",
          "Beyond all possible doubt",
          "The balance of probabilities",
          "Absolute certainty",
        ],
        correct: 2,
        explain: "Civil cases are decided on the BALANCE OF PROBABILITIES — the claimant must show its version is more likely than not (over 50%). 'Beyond reasonable doubt' is the higher CRIMINAL standard, and 'all possible doubt' or 'absolute certainty' is required by no court at all.",
      },
    },
  ],
  examTraps: [
    { trap: "Thinking the courts can strike down an Act of Parliament they dislike.", fix: "Parliament is sovereign. A court interprets and applies a valid Act; it cannot override it. Only statute beats statute." },
    { trap: "Treating obiter dicta as binding.", fix: "Only the ratio decidendi binds. Obiter — asides, examples, hypotheticals — is persuasive at most, however senior the judge." },
    { trap: "Confusing overruling with reversing.", fix: "Overruling = a later, DIFFERENT case where a higher court says the earlier principle was wrong. Reversing = the SAME case on appeal, where the higher court flips the outcome for those parties." },
    { trap: "Swapping the two standards of proof.", fix: "Criminal = beyond reasonable doubt (the court must be sure). Civil = balance of probabilities (more likely than not). Never apply the criminal standard to a contract or company dispute." },
    { trap: "Mislabelling a private business dispute as 'criminal'.", fix: "Most LW law is civil. If a party is suing for damages, it is civil — 'guilty', 'prosecute' and 'the Crown' belong to criminal law only." },
  ],
  keyTerms: [
    { term: "Common law", def: "Judge-made law built up from the reasoning of decided cases, as opposed to statute passed by Parliament." },
    { term: "Ratio decidendi", def: "The legal reason for a decision — the principle a case turned on, which is binding on lower courts." },
    { term: "Obiter dicta", def: "Statements 'said by the way' in a judgment that were not essential to the decision; persuasive only." },
    { term: "Stare decisis", def: "\"Stand by what is decided\" — the doctrine that courts follow the precedents set by higher courts." },
    { term: "Balance of probabilities", def: "The civil standard of proof: a fact is established if it is more likely than not to be true (over 50%)." },
  ],
  summary: [
    "English law is a common law (case-based) system, but Parliament is sovereign — statute overrides any judicial decision.",
    "Courts run in a hierarchy (Magistrates'/County up to the Supreme Court), split into a civil track (claimant sues for a remedy) and a criminal track (the state prosecutes for punishment).",
    "Under precedent, only the ratio decidendi of a higher court binds; obiter dicta and lower or foreign courts are persuasive only.",
    "A court escapes a precedent by distinguishing (different facts), overruling (a later case says it was wrong) or reversing (the same case flipped on appeal).",
    "Statutes are read using the literal, golden and mischief rules and the purposive approach; and proof needs the balance of probabilities in civil cases but beyond reasonable doubt in criminal ones.",
  ],
}
