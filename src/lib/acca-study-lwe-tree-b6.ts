import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area B, final part — the law of torts and professional negligence.
 * Chapters 19–22 of the LW-ENG reading tree, mapped to syllabus group B4.
 *
 * ── Why chapter 22 matters more than its size suggests ─────────
 * B4(f) — the duty of care of accountants and auditors — is the part of the ENG
 * syllabus that speaks directly to the learner's own professional exposure, and it is
 * a reliable Section B topic. It is given its own chapter rather than a section inside
 * negligence, because the whole difficulty is the CAPARO proximity question: to whom,
 * beyond the client, does an auditor owe a duty? That needs room to work through.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Case names are citations for a
 * proposition, never a source of prose.
 */

/* ── Chapter 19 · B4(a), B4(b) ─────────────────────────────────── */

export const LWE_TREE_19: StudyChapter = {
  id: "LWE-19",
  number: 19,
  paper: "LW",
  area: "B",
  title: "The nature of tort, and passing off",
  minutes: 14,
  syllabusRefs: ["B4(a)", "B4(b)"],
  intro:
    "Tort liability arises whether or not the parties ever agreed anything — which is exactly why it reaches people a contract cannot, and why it matters so much to a professional adviser.",
  outcomes: [
    "Define tort and distinguish tortious from contractual liability",
    "Identify the main torts relevant to business",
    "Explain the tort of passing off and its three elements",
    "Distinguish passing off from trade mark infringement",
    "Identify the remedies available in tort",
  ],
  sections: [
    {
      id: "what-tort-is",
      heading: "Tort, and how it differs from contract",
      blocks: [
        {
          kind: "definition",
          term: "Tort",
          md: "A **civil wrong**, independent of contract, for which the law provides a remedy. The duty is **imposed by law** rather than assumed by agreement, so it can be owed to a person the defendant has never dealt with — which is the whole reason tort reaches further than contract.",
        },
        {
          kind: "table",
          caption: "Tort and contract compared",
          head: ["", "Tort", "Contract"],
          rows: [
            ["**Source of the duty**", "**Imposed by law**", "**Agreed** by the parties"],
            ["**Who is owed it**", "Anyone within the scope of the duty, whether or not they dealt with the defendant", "Only a **party** to the contract (chapter 12)"],
            ["**Consideration**", "**Not required**", "**Required**, unless by deed"],
            ["**Aim of damages**", "Put the claimant in the position they would have been in had the tort **not been committed** — restoring the status quo", "Put them in the position **performance** would have produced"],
            ["**Limitation**", "Generally six years from when the damage occurred, with special rules for latent damage and personal injury", "Generally six years from the breach"],
          ],
        },
        {
          kind: "list",
          title: "The torts that matter to business",
          items: [
            "**Negligence** — by far the most important, and the subject of chapters 20 to 22.",
            "**Passing off** — protecting the goodwill in a business's name, get-up or reputation.",
            "**Defamation** — libel and slander, protecting reputation.",
            "**Nuisance** — unreasonable interference with the use of land.",
            "**Trespass** — to land, to goods, or to the person.",
            "**Deceit** — fraudulent misrepresentation causing loss.",
            "**Breach of statutory duty**, where a statute imposes a duty and gives a civil remedy.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The same facts can give both claims — and it usually pays to plead both",
          md: "A negligent professional adviser may be liable to its **client in contract** and to a **third party in tort**, on the same facts. The claims are not identical: the contractual duty is defined by the engagement, the tortious duty by the law; and the **measure of damages differs**, contract aiming at expectation and tort at restoring the position before the wrong. Where limitation is tight, the different starting points can also matter. So an answer that spots both routes is worth more than one that picks a side.",
        },
      ],
      check: {
        q: "How does the measure of damages differ between tort and contract?",
        options: [
          "There is no difference — both compensate for loss",
          "Tort restores the position as if the wrong had not occurred; contract gives the position performance would have produced",
          "Tort damages are punitive; contract damages are compensatory",
          "Contract damages are always larger",
        ],
        correct: 1,
        explain:
          "TORT restores the claimant to the position they would have occupied had the tort NOT BEEN COMMITTED — the status quo before the wrong. CONTRACT gives the position PERFORMANCE would have produced, which includes the expected profit. That difference is why the two claims can be worth different amounts on identical facts.",
      },
    },
    {
      id: "passing-off",
      heading: "Passing off",
      blocks: [
        {
          kind: "definition",
          term: "Passing off",
          md: "A tort committed where a trader **misrepresents** its goods, services or business as being those of another, damaging that other's **goodwill**. It protects the **reputation a business has built**, not a registered right — so it is available to a trader who never registered anything.",
        },
        {
          kind: "list",
          style: "number",
          title: "The three elements — all required",
          items: [
            "**Goodwill or reputation** attached to the claimant's goods or services, so that the name, mark or get-up is recognised by the public as distinctive of the claimant.",
            "**A misrepresentation** by the defendant, leading or likely to lead the public to believe its goods or services are the claimant's. **Intention is not required** — innocent passing off is still actionable.",
            "**Damage, or the likelihood of damage**, to the claimant's goodwill — lost sales, or the claimant's reputation being harmed by association with inferior goods.",
          ],
        },
        {
          kind: "table",
          caption: "Passing off against trade mark infringement",
          head: ["", "Passing off", "Trade mark infringement"],
          rows: [
            ["**Basis**", "**Common law** tort protecting goodwill", "**Statutory** right arising from registration"],
            ["**Registration needed?**", "**No**", "**Yes**"],
            ["**What must be proved**", "Goodwill, misrepresentation and damage — a heavier burden", "Use of an identical or similar mark on relevant goods; goodwill need not be proved"],
            ["**Practical point**", "The fallback where there is no registration", "Easier to enforce, which is why registration is worth having"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Registration of a company name is no defence",
          md: "A point that recurs in company-law scenarios too (chapter 33). The registrar of companies accepting a name does **not** authorise its use: the new company may still be liable in **passing off**, and for **trade mark infringement**, and the registrar may separately direct a change where a name is the same as or too like an existing one. So \"Companies House allowed it\" answers nothing.",
        },
        {
          kind: "list",
          title: "Remedies in tort",
          items: [
            "**Damages**, to restore the claimant to the position before the wrong.",
            "**Injunction** — often the real objective in passing off, since stopping the conduct matters more than compensation.",
            "**Account of profits**, requiring the defendant to give up gains made from the wrong.",
            "**Delivery up or destruction** of offending materials.",
          ],
        },
        {
          kind: "example",
          title: "Testing a passing off claim",
          scenario:
            "Corveley's Bakehouse has traded in one city for 14 years under a distinctive script logo and dark green packaging, and is well known locally. Fennmoor Ltd registers a company called Corvelay Bakehouse Limited at Companies House, opens two shops in the same city, and uses a similar script and dark green boxes. Some customers complain to Corveley's about the quality of goods they in fact bought from Fennmoor. Fennmoor says it chose the name independently, that Companies House approved it, and that Corveley's has never registered a trade mark.",
          steps: [
            { label: "Test element 1 — goodwill", detail: "Fourteen years' trading in the city under a DISTINCTIVE script and colour scheme, well known locally, establishes GOODWILL attached to that name and get-up. No registration is needed for this." },
            { label: "Test element 2 — misrepresentation", detail: "A near-identical name, similar script and the same dark green packaging is likely to lead the public to believe Fennmoor's shops are Corveley's. That customers ACTUALLY COMPLAINED to Corveley's about Fennmoor's goods is direct evidence of confusion." },
            { label: "Deal with the claim of independent choice", detail: "Irrelevant. Passing off does NOT require INTENTION — innocent passing off is still actionable. Fennmoor's honest belief is no defence." },
            { label: "Test element 3 — damage", detail: "Both limbs are present: LOST SALES from diverted custom, and DAMAGE TO REPUTATION from being associated with goods customers thought inferior. The complaints prove the second." },
            { label: "Dispose of the Companies House point", detail: "Acceptance of the name by the registrar is NO DEFENCE. It does not authorise use, and the registrar may in any event direct a change where a name is the same as or too like an existing one." },
            { label: "Identify the remedies", detail: "An INJUNCTION restraining use of the name and get-up is the main objective, with DAMAGES or an ACCOUNT OF PROFITS, and DELIVERY UP of the offending packaging. The absence of a registered trade mark costs Corveley's the easier statutory route but not this claim." },
          ],
          result:
            "Passing off is **made out** on all three elements. Fennmoor's three defences all fail: **intention is irrelevant**, **registration by Companies House authorises nothing**, and the **absence of a trade mark** is precisely why the common law tort exists.",
        },
      ],
      check: {
        q: "A trader innocently adopts a name confusingly similar to an established competitor's, and Companies House accepted the name. Is it liable in passing off?",
        options: [
          "No, because it did not intend to deceive",
          "Yes — passing off needs no intention, and registration by Companies House is no defence",
          "No, because the competitor never registered a trade mark",
          "Only if the competitor can prove actual lost sales",
        ],
        correct: 1,
        explain:
          "YES. Passing off requires goodwill, misrepresentation and damage — NOT intention, so innocent passing off is actionable. Acceptance by Companies House does not authorise use of a name. And the tort exists precisely to protect unregistered goodwill, so the absence of a trade mark is no answer; the LIKELIHOOD of damage suffices.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring intention to deceive in passing off.",
      fix: "Intention is not an element. Innocent passing off is actionable.",
    },
    {
      trap: "Treating registration of a company name as permission to use it.",
      fix: "It authorises nothing. Passing off and trade mark infringement remain available, and the registrar may direct a change.",
    },
    {
      trap: "Saying no claim lies without a registered trade mark.",
      fix: "Passing off protects unregistered goodwill at common law — that is its purpose.",
    },
    {
      trap: "Using the contractual measure of damages for a tort claim.",
      fix: "Tort restores the position before the wrong; contract gives the position performance would have produced.",
    },
  ],
  keyTerms: [
    { term: "Tort", def: "A civil wrong independent of contract, where the duty is imposed by law rather than agreed." },
    { term: "Passing off", def: "Misrepresenting one's goods or business as another's, damaging that other's goodwill." },
    { term: "Goodwill", def: "The reputation attached to a business's name, mark or get-up, recognised by the public as distinctive of it." },
    { term: "Account of profits", def: "A remedy requiring the wrongdoer to give up gains made from the wrong." },
    { term: "Deceit", def: "The tort of fraudulent misrepresentation causing loss." },
  ],
  summary: [
    "Tort duties are imposed by law, so they reach people no contract could.",
    "Tort damages restore the position before the wrong; contract damages give the position performance would have produced.",
    "The same facts may give a contractual claim to the client and a tortious claim to a third party.",
    "Passing off requires goodwill, misrepresentation and damage, and needs no intention.",
    "Registration of a company name is no defence to passing off or trade mark infringement.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three elements of passing off.", a: "Goodwill or reputation in the claimant's name or get-up, a misrepresentation likely to mislead the public, and damage or the likelihood of damage to that goodwill." },
    { q: "Is intention required for passing off?", a: "No. Innocent passing off is actionable." },
    { q: "How does passing off differ from trade mark infringement?", a: "Passing off is a common law tort protecting unregistered goodwill and requires proof of goodwill, misrepresentation and damage; infringement is statutory and depends on registration." },
    { q: "Why can tort reach further than contract?", a: "Because the duty is imposed by law rather than agreed, so it can be owed to someone who never dealt with the defendant and gave no consideration." },
  ],
}

/* ── Chapter 20 · B4(c) ────────────────────────────────────────── */

export const LWE_TREE_20: StudyChapter = {
  id: "LWE-20",
  number: 20,
  paper: "LW",
  area: "B",
  title: "Negligence: duty, breach and vicarious liability",
  minutes: 17,
  syllabusRefs: ["B4(c)"],
  intro:
    "Negligence has three ingredients and the claimant must prove all of them. Duty is where the argument usually is, breach is where the standard of care bites — and vicarious liability is what makes the employer, rather than the employee, the defendant worth suing.",
  outcomes: [
    "State the three elements of negligence",
    "Apply the Caparo test for a duty of care",
    "Apply the objective standard of care and the factors that adjust it",
    "Explain res ipsa loquitur and its effect",
    "Explain vicarious liability and the course of employment test",
  ],
  sections: [
    {
      id: "duty-and-breach",
      heading: "Duty of care, and breach of it",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The three elements of negligence",
            caption: "The claimant must prove all three.",
            data: {
              steps: [
                { label: "1 · Duty of care", sub: "The defendant owed the claimant a duty" },
                { label: "2 · Breach", sub: "The defendant fell below the standard of care" },
                { label: "3 · Damage", sub: "Caused by the breach and not too remote (chapter 21)" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "The Caparo test for a duty of care",
          md: "Three requirements, from *Caparo Industries v Dickman*: the damage was **reasonably foreseeable**; there was sufficient **proximity** between the parties; and it is **fair, just and reasonable** to impose a duty. The third limb is the policy control — it is where the courts refuse a duty that the first two would otherwise create.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Proximity is where the argument almost always is",
          md: "Foreseeability is usually easy — most harm is foreseeable in some sense. **Proximity** is what limits liability to a manageable class, and the \"fair, just and reasonable\" limb then guards against **indeterminate liability** to the world. That combination is precisely what defeats most claims against auditors (chapter 22), and it is why *Donoghue v Stevenson* is remembered for establishing that a manufacturer owes a duty to the **ultimate consumer** — it settled proximity where no contract existed.",
        },
        {
          kind: "definition",
          term: "The standard of care",
          md: "The standard is **objective**: that of the **reasonable person** doing that activity. The defendant's own inexperience is **no defence**, because the standard does not drop to meet them. Where the defendant holds themselves out as having a **special skill**, the standard is that of a reasonably competent member of **that profession**.",
        },
        {
          kind: "table",
          caption: "What adjusts the standard",
          head: ["Factor", "Effect"],
          rows: [
            ["**Probability of harm**", "The more likely harm is, the more care is required"],
            ["**Seriousness of potential harm**", "Greater potential injury demands greater care — more so where the defendant knows of a particular vulnerability"],
            ["**Cost and practicability of precautions**", "A defendant need not take precautions grossly disproportionate to the risk"],
            ["**Social utility of the activity**", "A socially valuable activity, such as an emergency response, may justify a greater risk"],
            ["**Common practice** in the trade", "Compliance with accepted practice is strong evidence of reasonable care, but not conclusive"],
            ["**The state of knowledge at the time**", "Judged on what was known then, not with hindsight"],
          ],
        },
        {
          kind: "definition",
          term: "Res ipsa loquitur",
          md: "\"The thing speaks for itself.\" Where the **thing causing harm was under the defendant's control**, and the accident is of a kind that **does not ordinarily happen** without negligence, and there is **no other explanation**, the burden effectively shifts: the court may infer negligence and the **defendant must explain**. It helps a claimant who cannot show exactly what went wrong.",
        },
      ],
      check: {
        q: "An inexperienced trainee causes loss by doing a job less competently than an experienced person would. Is inexperience a defence?",
        options: [
          "Yes, the standard is adjusted to the defendant's actual experience",
          "No — the standard is objective, that of the reasonable person doing that activity",
          "Yes, provided the trainee was supervised",
          "Only if the claimant knew the defendant was a trainee",
        ],
        correct: 1,
        explain:
          "NO. The standard of care is OBJECTIVE — that of the reasonable person carrying out the activity — and it does not drop to accommodate the defendant's inexperience. Where a special skill is held out, the standard is that of a reasonably competent member of that profession.",
      },
    },
    {
      id: "vicarious",
      heading: "Vicarious liability",
      blocks: [
        {
          kind: "definition",
          term: "Vicarious liability",
          md: "The liability of an **employer** for a tort committed by an **employee** in the **course of employment**. The employer is liable **in addition** to the employee, not instead — the employee remains personally liable, but the claimant sues the employer because it is far more likely to be able to pay and to be insured.",
        },
        {
          kind: "list",
          title: "What must be established",
          items: [
            "The tortfeasor was an **employee**, not an independent contractor — which sends you back to the status tests in chapter 23.",
            "A **tort** was committed.",
            "It was committed **in the course of employment**, judged by whether the wrongful conduct was **closely connected** with what the employee was employed to do.",
          ],
        },
        {
          kind: "table",
          caption: "In the course of employment, or not",
          head: ["Within the course of employment", "Outside it"],
          rows: [
            ["Doing the authorised job **carelessly**", "Acting on a **wholly independent** errand of the employee's own"],
            ["Doing the job by an **unauthorised method**, or contrary to instructions, where the act was still the job", "Conduct with **no connection** to the employment at all"],
            ["A **deviation** from the route that is still incidental to the work", "A substantial departure amounting to a **new and independent journey**"],
            ["Wrongful acts **closely connected** with the duties entrusted, including some deliberate wrongdoing", "Acts done purely for the employee's own purposes and unconnected with the role"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An express prohibition does not automatically get the employer off",
          md: "The instinctive answer — \"the employee was told not to do that, so the employer is not liable\" — is usually **wrong**. If the employee was doing **the job they were employed to do**, merely by a **forbidden method**, the employer remains vicariously liable. The prohibition matters only if it defines the **scope** of the employment rather than the **manner** of doing it. So a driver told not to give lifts who injures a passenger while making deliveries is doing the job badly, and the employer is liable.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Independent contractors, and the exceptions",
          md: "An employer is generally **not** liable for the torts of an **independent contractor** — that is one of the practical consequences of the status distinction in chapter 23. But it may be **directly** liable for its **own** negligence in **selecting** an incompetent contractor, in failing to supervise where supervision was needed, or where the duty is **non-delegable** because the activity is inherently hazardous.",
        },
        {
          kind: "example",
          title: "Finding the right defendant",
          scenario:
            "Ashgrove Contractors employs Melling as a delivery driver, with a written instruction never to carry passengers. Making a delivery, Melling gives a lift to Priestly, drives carelessly, and injures him. On the same day another Ashgrove driver, Corbin, finishes his round, drives 30 miles in the opposite direction to visit a relative, and there negligently damages a parked car. Ashgrove also engaged Denny, a self-employed electrician, to rewire its depot; Denny's careless work causes a fire. Ashgrove had not checked Denny's qualifications, which were non-existent.",
          steps: [
            { label: "Melling — is he an employee?", detail: "Yes, employed as a delivery driver. The first requirement of vicarious liability is satisfied." },
            { label: "Melling — course of employment?", detail: "He was MAKING A DELIVERY — doing the very job he was employed to do — merely by a FORBIDDEN METHOD. The prohibition went to the MANNER of doing the job, not its scope, so he was acting in the course of employment. Ashgrove IS vicariously liable to Priestly, and Melling remains personally liable too." },
            { label: "Corbin — course of employment?", detail: "He had FINISHED his round and driven 30 miles in the OPPOSITE direction on a purely personal visit. That is a NEW AND INDEPENDENT JOURNEY, not a deviation incidental to the work, so it falls OUTSIDE the course of employment. Ashgrove is NOT vicariously liable; Corbin alone is." },
            { label: "Denny — employee or contractor?", detail: "Self-employed, so an INDEPENDENT CONTRACTOR. Ashgrove is NOT vicariously liable for his torts." },
            { label: "Denny — is Ashgrove liable another way?", detail: "YES, but DIRECTLY rather than vicariously. Ashgrove failed to check the qualifications of a contractor engaged for hazardous electrical work, so it is liable for ITS OWN negligence in SELECTING an incompetent contractor." },
          ],
          result:
            "Ashgrove is **vicariously liable** for Melling, **not liable** for Corbin, and **directly liable** for its own negligent selection of Denny. Three different answers from the two questions that decide every such problem: **employee or contractor**, and **course of employment or not**.",
        },
      ],
      check: {
        q: "A driver, expressly forbidden to carry passengers, gives a lift while making deliveries and injures the passenger through careless driving. Is the employer liable?",
        options: [
          "No, because the driver breached an express prohibition",
          "Yes — the driver was doing the authorised job by a forbidden method, so it was within the course of employment",
          "No, because the passenger had no contract with the employer",
          "Only if the employer knew lifts were being given",
        ],
        correct: 1,
        explain:
          "YES. The driver was DOING THE JOB — making deliveries — merely by a FORBIDDEN METHOD. A prohibition on the MANNER of performing the work does not take the employee outside the course of employment; only one defining the SCOPE of the employment would. The absence of a contract is irrelevant, since tort duties are imposed by law.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating an express prohibition as ending vicarious liability.",
      fix: "If the employee was doing the job by a forbidden METHOD, the employer remains liable. Only a prohibition defining the SCOPE of employment helps.",
    },
    {
      trap: "Lowering the standard of care for an inexperienced defendant.",
      fix: "The standard is objective and does not drop. A professional is judged as a reasonably competent member of that profession.",
    },
    {
      trap: "Finding a duty on foreseeability alone.",
      fix: "Caparo requires proximity and that it be fair, just and reasonable as well.",
    },
    {
      trap: "Holding an employer vicariously liable for an independent contractor.",
      fix: "Generally not liable — but it may be DIRECTLY liable for negligent selection or supervision, or where the duty is non-delegable.",
    },
    {
      trap: "Assuming a socially useful activity or common trade practice is a complete answer.",
      fix: "Both adjust the standard and are strong evidence, but neither is conclusive.",
    },
  ],
  keyTerms: [
    { term: "Caparo test", def: "Reasonable foreseeability, proximity, and that it is fair, just and reasonable to impose a duty." },
    { term: "Standard of care", def: "The objective standard of the reasonable person doing that activity; a professional is judged against competent members of that profession." },
    { term: "Res ipsa loquitur", def: "Where the thing was under the defendant's control and the accident does not ordinarily happen without negligence, the defendant must explain." },
    { term: "Vicarious liability", def: "An employer's liability for an employee's tort committed in the course of employment, in addition to the employee's own liability." },
    { term: "Course of employment", def: "Conduct closely connected with what the employee was employed to do, including doing the job by an unauthorised method." },
    { term: "Non-delegable duty", def: "A duty an employer cannot discharge by engaging a contractor, typically for inherently hazardous activities." },
  ],
  summary: [
    "Negligence requires a duty of care, breach of it, and consequent damage that is not too remote.",
    "Caparo requires foreseeability, proximity, and that a duty be fair, just and reasonable.",
    "The standard of care is objective and is not lowered by the defendant's inexperience.",
    "Res ipsa loquitur requires the defendant to explain an accident that does not ordinarily happen without negligence.",
    "An employer is vicariously liable for an employee's tort in the course of employment, and a prohibition on the method of working does not displace that.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three limbs of the Caparo test.", a: "Reasonable foreseeability of the damage, sufficient proximity between the parties, and that it is fair, just and reasonable to impose a duty." },
    { q: "Does an express prohibition prevent vicarious liability?", a: "Not if the employee was doing the authorised job by a forbidden method. Only a prohibition defining the scope of employment takes the act outside it." },
    { q: "What is the effect of res ipsa loquitur?", a: "The court may infer negligence, so the defendant must explain the accident, where the thing was under its control and such accidents do not ordinarily happen without negligence." },
    { q: "Is an employer liable for an independent contractor's torts?", a: "Generally not vicariously, but it may be directly liable for negligent selection or supervision, or where the duty is non-delegable." },
  ],
}

export const LWE_TREE_AREA_B_PART6: StudyChapter[] = [LWE_TREE_19, LWE_TREE_20]
