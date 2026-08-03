import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area B, final chapters — causation, remoteness, defences, and the duty of
 * care of accountants and auditors.
 * Chapters 21–22 of the LW-ENG reading tree, completing syllabus group B4 and Area B.
 *
 * Chapter 22 is the one that speaks to the learner's own professional exposure, and a
 * reliable Section B topic. It gets a full chapter because the difficulty is entirely
 * in the CAPARO proximity question — to whom, beyond the client, is a duty owed — and
 * that needs a decision procedure rather than a paragraph.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Case names are citations for a
 * proposition, never a source of prose.
 */

/* ── Chapter 21 · B4(d), B4(e) ─────────────────────────────────── */

export const LWE_TREE_21: StudyChapter = {
  id: "LWE-21",
  number: 21,
  paper: "LW",
  area: "B",
  title: "Causation, remoteness and the defences",
  minutes: 16,
  syllabusRefs: ["B4(d)", "B4(e)"],
  intro:
    "A proven duty and a proven breach still win nothing unless the breach caused damage of a kind the law will compensate. Then two defences can cut the award down, or remove it entirely.",
  outcomes: [
    "Apply the \"but for\" test of factual causation",
    "Explain a novus actus interveniens and its effect on the chain of causation",
    "Apply the remoteness test in tort and distinguish it from the contractual rule",
    "Explain contributory negligence and its effect on damages",
    "Explain volenti non fit injuria and the narrow circumstances in which it applies",
  ],
  sections: [
    {
      id: "causation-remoteness",
      heading: "Causation, and remoteness of damage",
      blocks: [
        {
          kind: "definition",
          term: "Factual causation — the \"but for\" test",
          md: "Would the claimant have suffered the damage **but for** the defendant's breach? If the loss would have happened **anyway**, the breach did not cause it and the claim fails, however careless the defendant was.",
        },
        {
          kind: "definition",
          term: "Novus actus interveniens",
          md: "A **new intervening act** that breaks the chain of causation, so the defendant is not liable for what follows. It must be genuinely independent: the act of a **third party**, of the **claimant**, or a **natural event**, that was not a foreseeable consequence of the defendant's breach. A foreseeable intervening act does **not** break the chain.",
        },
        {
          kind: "table",
          caption: "Remoteness in tort and in contract",
          head: ["", "Tort", "Contract"],
          rows: [
            ["**The test**", "Was the **kind of damage** reasonably **foreseeable**?", "The two limbs of *Hadley v Baxendale* (chapter 17)"],
            ["**Extent of the damage**", "**Irrelevant** — if the kind of harm was foreseeable, the defendant is liable for its full extent", "Unusual loss needs knowledge of special circumstances at the time of contracting"],
            ["**Why they differ**", "The parties never chose the relationship, so foreseeability alone is the control", "The parties allocated risk when contracting, so what was known then governs"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Foreseeable KIND, unlimited extent — and the thin skull rule",
          md: "Only the **type** of damage must be foreseeable; once it is, the defendant is liable for **however much** of it occurs. That principle has a well-known application: the **\"thin skull\"** rule, under which a defendant who foreseeably causes some injury is liable for the **full extent** of the harm even where the claimant's unusual susceptibility made it far worse than expected. The defendant takes the victim as it finds them, and cannot complain that an ordinary person would have suffered less.",
        },
        {
          kind: "example",
          title: "Following the chain",
          scenario:
            "Kelworth Ltd negligently leaves an unlit excavation across a pavement. Ambrose falls in and breaks an ankle. At hospital, a doctor negligently misreads the X-ray, and the delay in treatment means the ankle has to be pinned, leaving Ambrose with a permanent limp. Ambrose also has a rare bone condition, unknown to anyone, which made the original fracture far worse than it would have been for most people. Weeks later, walking with a stick, Ambrose ignores a clearly marked wet floor in a shop, slips, and breaks a wrist.",
          steps: [
            { label: "Apply \"but for\" to the broken ankle", detail: "BUT FOR the unlit excavation Ambrose would not have fallen, so Kelworth's breach caused the fracture. Factual causation is established." },
            { label: "Test remoteness of the fracture", detail: "Physical injury from falling into an unlit hole in a pavement is plainly a FORESEEABLE KIND of damage. Recoverable." },
            { label: "Apply the thin skull rule", detail: "The rare bone condition made the injury much worse, but only the KIND of damage need be foreseeable and its EXTENT is irrelevant. Kelworth takes Ambrose as it finds him and is liable for the FULL severity." },
            { label: "Test the doctor's negligence", detail: "Negligent medical treatment following an injury is generally regarded as FORESEEABLE and does not break the chain, so Kelworth remains liable for the worsened outcome including the limp — though the doctor and the hospital are ALSO liable, and liability may be apportioned between them." },
            { label: "Test the wrist injury", detail: "Ambrose IGNORED A CLEARLY MARKED hazard. That is his own unreasonable conduct, independent of Kelworth's breach, and amounts to a NOVUS ACTUS INTERVENIENS breaking the chain. Kelworth is NOT liable for the wrist." },
          ],
          result:
            "Kelworth is liable for the **fracture and the limp**, at their **full extent** despite the bone condition, but **not for the wrist**. The medical negligence was foreseeable and did not break the chain; the claimant's own disregard of a marked hazard did.",
        },
      ],
      check: {
        q: "A defendant foreseeably causes a minor injury, but the claimant's rare condition makes the consequences catastrophic. What is the defendant liable for?",
        options: [
          "Only the injury an ordinary person would have suffered",
          "The full extent of the harm — only the kind of damage need be foreseeable, not its extent",
          "Nothing, since the outcome was unforeseeable",
          "Half the loss, apportioned for the claimant's condition",
        ],
        correct: 1,
        explain:
          "The FULL EXTENT. Only the KIND of damage must be reasonably foreseeable; once it is, the defendant is liable for however much occurs. This is the THIN SKULL rule — the defendant takes the victim as it finds them and cannot rely on the claimant's unusual susceptibility.",
      },
    },
    {
      id: "defences",
      heading: "The defences",
      blocks: [
        {
          kind: "definition",
          term: "Contributory negligence",
          md: "Where the claimant's **own carelessness contributed** to the damage, the court **reduces** the damages by a proportion reflecting their share of responsibility. It is a **partial** defence — it never defeats the claim, it only cuts the award, so a finding of 25% contributory negligence means the claimant recovers 75%.",
        },
        {
          kind: "definition",
          term: "Volenti non fit injuria",
          md: "Consent to the risk — a **complete** defence, so it defeats the claim entirely. It requires that the claimant had **full knowledge** of the nature and extent of the risk and **freely and voluntarily** accepted it. Because the consequences are total, the courts construe it **very narrowly**.",
        },
        {
          kind: "table",
          caption: "The two defences compared",
          head: ["", "Contributory negligence", "Volenti"],
          rows: [
            ["**Effect**", "**Partial** — damages reduced proportionately", "**Complete** — claim defeated entirely"],
            ["**What must be shown**", "The claimant's carelessness contributed to the damage", "Full knowledge of the risk AND free, voluntary acceptance of it"],
            ["**How readily applied**", "Commonly — a finding of some contribution is routine", "**Rarely**, because the courts construe it narrowly"],
            ["**Employees**", "May be reduced, but courts are slow to blame an employee heavily for the pressures of the job", "Almost never succeeds — an employee who works under protest or economic pressure has not freely consented"],
            ["**Rescuers**", "Rarely reduced", "Does not apply — a rescuer acting under a moral duty has not freely accepted the risk"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Knowledge of a risk is not consent to it",
          md: "This is the distinction that decides most *volenti* questions. An employee who **knows** the machine guard is missing but keeps working because they need the job has **knowledge** — but has not **freely and voluntarily accepted** the risk, because economic pressure is not free choice. So *volenti* fails, and the most the employer gets is a **contributory negligence** reduction. The same reasoning protects **rescuers**: someone who runs into danger to help has not consented to being injured. A scenario mentioning pressure of work or a rescue is signalling that *volenti* is the wrong answer.",
        },
        {
          kind: "list",
          title: "Other points on defences",
          items: [
            "**Exclusion of liability** is heavily restricted: liability for death or personal injury caused by negligence cannot be excluded at all (chapter 14).",
            "**Illegality** may bar a claim where the claimant was engaged in a criminal enterprise from which the loss arose.",
            "**Limitation** — a negligence claim is generally barred after six years from the damage, with special rules for latent damage and a three-year period for personal injury.",
            "**Statutory authority** may justify conduct that would otherwise be tortious.",
          ],
        },
        {
          kind: "example",
          title: "Applying the defences",
          scenario:
            "Threlkeld Ltd removes the guard from a cutting machine to speed up production. Nunn, an operator, points out the danger; his supervisor tells him output targets must be met. Nunn continues to use the machine, and also removes his safety gloves because they slow him down. He is injured. A colleague, Vesey, reaches into the machine to pull Nunn clear and is also injured. Threlkeld pleads volenti against both, and contributory negligence in the alternative.",
          steps: [
            { label: "Establish the breach", detail: "Removing the guard breaches Threlkeld's duty to provide a SAFE SYSTEM OF WORK (chapter 24) and its duty of care in negligence. Breach is clear." },
            { label: "Test volenti against Nunn", detail: "Nunn KNEW of the risk — he raised it. But he continued under INSTRUCTION and under pressure of output targets, so his acceptance was NOT FREE AND VOLUNTARY. Knowledge is not consent. VOLENTI FAILS." },
            { label: "Test contributory negligence against Nunn", detail: "SUCCEEDS in part. Removing his own safety gloves was careless and contributed to the injury, so his damages will be REDUCED by a proportion — but not extinguished, since the primary fault was removing the guard." },
            { label: "Test volenti against Vesey", detail: "FAILS. Vesey is a RESCUER acting under a moral duty in an emergency, and a rescuer is not treated as freely accepting the risk. Threlkeld's own breach created the danger that prompted the rescue." },
            { label: "Test contributory negligence against Vesey", detail: "Very unlikely to succeed. Courts are slow to find a rescuer contributorily negligent for acting instinctively to save a colleague, unless the attempt was wholly reckless." },
            { label: "State the outcome", detail: "Threlkeld is liable to BOTH. Nunn recovers with a reduction for the gloves; Vesey recovers in full." },
          ],
          result:
            "*Volenti* fails against both — **economic pressure is not free consent** and **a rescuer does not consent**. Only Nunn's award is reduced, and only for the one thing that was genuinely his own choice.",
        },
      ],
      check: {
        q: "An employee, knowing a safety guard is missing, keeps working because output targets are enforced, and is injured. Does volenti apply?",
        options: [
          "Yes, since the employee knew of the risk and continued",
          "No — knowledge is not consent, and acceptance under economic pressure is not free and voluntary",
          "Yes, provided the employee was warned in writing",
          "No, because volenti never applies to any employee in any circumstances",
        ],
        correct: 1,
        explain:
          "NO. VOLENTI needs full knowledge AND FREE, VOLUNTARY acceptance of the risk. Knowledge alone is not consent, and continuing under instruction or economic pressure is not a free choice. The employer's best outcome is a CONTRIBUTORY NEGLIGENCE reduction, which is partial only.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Denying recovery because the damage was more severe than expected.",
      fix: "Only the KIND of damage need be foreseeable. The thin skull rule makes the defendant liable for the full extent.",
    },
    {
      trap: "Treating foreseeable medical negligence as breaking the chain.",
      fix: "A foreseeable intervening act does NOT break it. Only a genuinely independent, unforeseeable act does.",
    },
    {
      trap: "Allowing volenti wherever the claimant knew of the risk.",
      fix: "Knowledge is not consent. Acceptance must be free and voluntary, which economic pressure negates.",
    },
    {
      trap: "Applying volenti to a rescuer.",
      fix: "A rescuer acting under a moral duty has not freely accepted the risk.",
    },
    {
      trap: "Treating contributory negligence as defeating the claim.",
      fix: "It is PARTIAL — damages are reduced proportionately, never extinguished.",
    },
  ],
  keyTerms: [
    { term: "But for test", def: "Asks whether the claimant would have suffered the damage but for the defendant's breach." },
    { term: "Novus actus interveniens", def: "A new, independent and unforeseeable intervening act that breaks the chain of causation." },
    { term: "Remoteness in tort", def: "Damage is recoverable if its KIND was reasonably foreseeable; the extent is irrelevant." },
    { term: "Thin skull rule", def: "A defendant is liable for the full extent of foreseeable harm even where the claimant's unusual susceptibility magnified it." },
    { term: "Contributory negligence", def: "A partial defence reducing damages in proportion to the claimant's own share of responsibility." },
    { term: "Volenti non fit injuria", def: "A complete defence requiring full knowledge of the risk and its free, voluntary acceptance; construed narrowly." },
  ],
  summary: [
    "Factual causation asks whether the damage would have occurred but for the breach.",
    "Only a genuinely independent and unforeseeable intervening act breaks the chain of causation.",
    "In tort the kind of damage must be foreseeable; its extent is irrelevant, hence the thin skull rule.",
    "Contributory negligence reduces damages proportionately and never defeats the claim.",
    "Volenti is complete but rare — knowledge is not consent, and it fails against employees under pressure and against rescuers.",
  ],
  knowledgeDiagnostic: [
    { q: "State the test for remoteness in tort and how it differs from contract.", a: "In tort the kind of damage must be reasonably foreseeable and the extent is irrelevant; in contract the Hadley v Baxendale limbs apply, with unusual loss needing knowledge of special circumstances at the time of contracting." },
    { q: "What breaks the chain of causation?", a: "A novus actus interveniens — a new, independent and unforeseeable act of a third party, the claimant, or nature." },
    { q: "Distinguish the effect of contributory negligence from volenti.", a: "Contributory negligence is partial and reduces damages proportionately; volenti is complete and defeats the claim entirely." },
    { q: "Why does volenti usually fail against an employee?", a: "Because knowledge of a risk is not consent to it, and continuing to work under instruction or economic pressure is not a free and voluntary acceptance." },
  ],
}

/* ── Chapter 22 · B4(f) ────────────────────────────────────────── */

export const LWE_TREE_22: StudyChapter = {
  id: "LWE-22",
  number: 22,
  paper: "LW",
  area: "B",
  title: "The duty of care of accountants and auditors",
  minutes: 17,
  syllabusRefs: ["B4(f)"],
  intro:
    "This is the chapter about your own exposure. An auditor plainly owes duties to its client — the hard question, and the examinable one, is which of the many people who read the accounts can sue when they are wrong.",
  outcomes: [
    "Explain the auditor's duty to the client in contract and in tort",
    "Apply the Caparo analysis to a claim by a third party",
    "Explain when a duty is assumed to a specific third party for a known purpose",
    "Explain how a professional can limit exposure, and what cannot be excluded",
    "Decide whether a duty is owed to a given claimant",
  ],
  sections: [
    {
      id: "client-and-third-parties",
      heading: "The client, and everybody else",
      blocks: [
        {
          kind: "table",
          caption: "Who the auditor owes what",
          head: ["Claimant", "Basis of any duty"],
          rows: [
            ["**The client company**", "**Contract** — the engagement letter — **and** tort. The duty is to exercise reasonable skill and care as a reasonably competent auditor"],
            ["**The company's shareholders as a body**", "The statutory audit is for the members **as a body**, so the company is the proper claimant for negligent audit work"],
            ["**An individual shareholder** buying more shares", "Generally **no duty** — the audit was not produced to guide individual investment decisions"],
            ["**A takeover bidder** relying on published accounts", "Generally **no duty**, absent knowledge that the accounts would be relied on for that purpose"],
            ["**A lender or investor** to whom the accounts were **specifically supplied** for a **known purpose**", "**Duty may be owed**, on an assumption of responsibility"],
          ],
        },
        {
          kind: "definition",
          term: "The Caparo position on third parties",
          md: "*Caparo Industries v Dickman* settled that a statutory audit is prepared for the **company and its members as a body**, to enable them to exercise their governance rights — **not** as a guide to investment. So an auditor owes **no general duty** to the wide and indeterminate class of people who may read published accounts, however foreseeable their reliance. **Proximity** is what is missing, and imposing a duty would not be **fair, just and reasonable** because it would expose the auditor to **indeterminate liability**.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The three questions that decide a third-party claim",
          md: "Work them in order and the answer follows. **First: did the auditor know the identity of the person, or of a narrow identifiable class, who would rely?** Second: **did the auditor know the specific transaction or purpose** the statement was wanted for? Third: **did the auditor know reliance was likely without independent enquiry, and do anything to assume responsibility** — supplying the accounts directly, giving a reference, attending a meeting with the lender? A **yes** to all three usually means a duty; a claimant who merely picked up published accounts fails at the first.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Hedley Byrne is the reason a duty can exist at all",
          md: "*Hedley Byrne v Heller* established that a duty of care **can** arise for a **negligent misstatement** causing purely financial loss, where there is a **special relationship** — an assumption of responsibility by the maker of the statement and reasonable reliance on it. *Caparo* then set the **limits** for auditors. So the two cases work together: *Hedley Byrne* opens the door for a specifically advised third party, and *Caparo* closes it against the world at large. A disclaimer of responsibility, clearly given, is also capable of preventing the assumption of responsibility on which *Hedley Byrne* depends.",
        },
        {
          kind: "example",
          title: "Deciding who can sue",
          scenario:
            "Marlowe & Rye audits Pinfold Ltd and negligently fails to detect an overstatement of inventory, so the accounts show a healthy profit where there was a loss. Four claims follow. (a) Pinfold itself, which paid dividends it could not afford. (b) Trelawn plc, which read the published accounts at Companies House and launched a takeover of Pinfold. (c) Bexon Bank, which lent £2m after Marlowe & Rye sent it the accounts directly, attended a meeting with the bank, and confirmed in writing that the figures could be relied on for the lending decision. (d) Weald, an existing shareholder who bought a further 5,000 shares after reading the accounts.",
          steps: [
            { label: "Advise on (a) the client", detail: "A duty is owed in CONTRACT under the engagement letter and in TORT. Marlowe & Rye fell below the standard of a reasonably competent auditor, so Pinfold recovers its loss — including the unlawful dividends paid out on the overstated figures (chapter 36)." },
            { label: "Advise on (b) the takeover bidder", detail: "NO DUTY. This is CAPARO squarely: Trelawn simply read PUBLISHED accounts, which were prepared for the company and its members as a body, not to guide a takeover. Marlowe & Rye did not know Trelawn's identity or its purpose, so PROXIMITY is absent and indeterminate liability would follow." },
            { label: "Advise on (c) the bank", detail: "DUTY OWED. Run the three questions: Marlowe & Rye knew the IDENTITY of the relier, knew the SPECIFIC PURPOSE — the £2m lending decision — and positively ASSUMED RESPONSIBILITY by sending the accounts, attending the meeting and confirming reliance in writing. This is the HEDLEY BYRNE special relationship, and Bexon recovers." },
            { label: "Advise on (d) the shareholder", detail: "NO DUTY on the Caparo reasoning. The audit exists so members as a body can exercise governance rights, NOT to guide an individual's decision to increase their holding. Weald's existing shareholding does not improve the position." },
            { label: "Draw the distinction that decides it", detail: "The only successful third-party claim is the one where the auditor STEPPED OUTSIDE the statutory audit and gave the accounts to a KNOWN person for a KNOWN transaction. Everything else fails on proximity." },
          ],
          result:
            "Pinfold and **Bexon Bank** succeed; Trelawn and Weald do not. The lesson for the profession is that liability follows from **direct engagement with an identified relier for a known purpose** — which is exactly the conduct a firm should control.",
        },
      ],
      check: {
        q: "A bidder reads a company's published audited accounts, launches a takeover, and loses money because the accounts were negligently prepared. Can it sue the auditor?",
        options: [
          "Yes, because reliance on published accounts is entirely foreseeable",
          "No — on Caparo the audit is for the company and members as a body, so proximity is absent and liability would be indeterminate",
          "Yes, because the auditor owes a duty to anyone who reads the accounts",
          "Yes, but only for half the loss",
        ],
        correct: 1,
        explain:
          "NO. On CAPARO a statutory audit is prepared for the company and its MEMBERS AS A BODY to exercise governance rights, not to guide investment or takeover decisions. Foreseeability alone is not enough — PROXIMITY is missing, and imposing a duty would not be fair, just and reasonable because it would create indeterminate liability to the world.",
      },
    },
    {
      id: "managing-exposure",
      heading: "Managing professional exposure",
      blocks: [
        {
          kind: "list",
          title: "What a firm can legitimately do",
          items: [
            "**Define the engagement precisely** in an engagement letter — the scope of work, its purpose, and the limits of the opinion.",
            "**Disclaim responsibility to third parties**, clearly and prominently, which can prevent the assumption of responsibility *Hedley Byrne* requires. Such a disclaimer is still subject to the statutory controls on exclusion clauses (chapter 14) and to being reasonable.",
            "**Agree a liability cap** with the client where permitted, subject to the applicable statutory and regulatory constraints.",
            "**Refuse to give assurances directly to lenders or investors** unless the firm intends to accept the duty, and price that risk if it does.",
            "**Maintain professional indemnity insurance**, which the relevant professional body requires in any event.",
            "**Document the work** thoroughly, since the standard is that of a reasonably competent auditor and the file is the evidence of it.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "What cannot be excluded",
          md: "A firm cannot exclude liability for **death or personal injury caused by negligence** (chapter 14), and it cannot contract out of its **statutory duties as auditor** or its **professional and ethical obligations**. Nor will a disclaimer help where the firm's own conduct **contradicts** it — attending a lender's meeting and confirming figures may be found to be an assumption of responsibility despite boilerplate to the contrary. Conduct beats small print.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "How this connects to the rest of the paper",
          md: "The auditor's negligence in the example above produced an **unlawful distribution**, because the dividend was paid on overstated profits (chapter 36), which in turn exposes the **directors** to a claim to repay it and to breach of their duty to exercise reasonable care, skill and diligence (chapter 38). If insolvency follows, the same facts feed **wrongful trading** (chapter 46). One negligent audit therefore reaches into Areas E, F, G and H — which is precisely how Section B scenarios are constructed.",
        },
      ],
      check: {
        q: "Which of these can a firm NOT do to manage its exposure?",
        options: [
          "Define the scope and purpose of the engagement in an engagement letter",
          "Exclude liability for personal injury caused by its own negligence",
          "Disclaim responsibility to third parties, clearly and prominently",
          "Maintain professional indemnity insurance",
        ],
        correct: 1,
        explain:
          "It CANNOT exclude liability for DEATH OR PERSONAL INJURY caused by negligence — that exclusion is void, and no reasonableness argument saves it. Defining the engagement, disclaiming third-party responsibility (subject to statutory control and reasonableness) and insuring are all legitimate.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Finding a duty to anyone who foreseeably reads published accounts.",
      fix: "Caparo requires proximity too. The audit is for the company and its members as a body.",
    },
    {
      trap: "Treating an individual shareholder as automatically owed a duty for an investment decision.",
      fix: "The duty runs to members AS A BODY for governance, not to an individual buying more shares.",
    },
    {
      trap: "Ignoring conduct that assumes responsibility.",
      fix: "Sending accounts to a named lender for a known transaction and confirming reliance creates a Hedley Byrne duty, whatever the boilerplate says.",
    },
    {
      trap: "Assuming a disclaimer always works.",
      fix: "It is subject to statutory control and reasonableness, and can be contradicted by the firm's own conduct.",
    },
  ],
  keyTerms: [
    { term: "Caparo", def: "Authority that a statutory audit is for the company and its members as a body, so no general duty is owed to third-party readers." },
    { term: "Hedley Byrne", def: "Authority that a duty for negligent misstatement causing financial loss can arise from a special relationship and an assumption of responsibility." },
    { term: "Assumption of responsibility", def: "Conduct by which a professional accepts that a specific third party may rely on its statement for a known purpose." },
    { term: "Engagement letter", def: "The contract defining the scope, purpose and limits of the professional work." },
    { term: "Disclaimer of responsibility", def: "A clear statement that no duty is accepted to third parties; subject to statutory control and reasonableness." },
  ],
  summary: [
    "An auditor owes its client duties in contract and tort, to the standard of a reasonably competent auditor.",
    "On Caparo the audit serves the company and members as a body, so no duty is owed to takeover bidders or individual investors.",
    "A duty to a third party arises where the auditor knew the relier's identity and purpose and assumed responsibility.",
    "Hedley Byrne opens the door to such a claim; Caparo closes it against the world at large.",
    "Exposure is managed by a precise engagement letter, clear disclaimers, caps where permitted, and insurance — but injury liability and statutory duties cannot be excluded.",
  ],
  knowledgeDiagnostic: [
    { q: "For whose benefit is a statutory audit prepared?", a: "For the company and its members as a body, to enable them to exercise governance rights — not to guide investment decisions." },
    { q: "State the three questions deciding a third-party claim against an auditor.", a: "Did the auditor know the relier's identity or narrow class, know the specific transaction or purpose, and assume responsibility for reliance without independent enquiry?" },
    { q: "How do Hedley Byrne and Caparo fit together?", a: "Hedley Byrne allows a duty for negligent misstatement where a special relationship and assumption of responsibility exist; Caparo limits that for auditors by denying proximity to the general readership of accounts." },
    { q: "What can a firm never exclude?", a: "Liability for death or personal injury caused by its negligence, its statutory duties as auditor, and its professional and ethical obligations." },
  ],
}

export const LWE_TREE_AREA_B_PART7: StudyChapter[] = [LWE_TREE_21, LWE_TREE_22]
