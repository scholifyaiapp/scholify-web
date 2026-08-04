import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area F, final part — other company officers, and meetings and resolutions.
 * Chapters 39–40 of the LW-ENG reading tree, completing syllabus groups F2–F3.
 *
 * Forked from the Global tree and specialised to the Companies Act 2006. Meetings is
 * the area where the specialisation matters most mechanically: ENG is examined on the
 * actual percentages, notice periods and majorities, and a Global chapter that defers
 * to "the threshold the scenario supplies" cannot teach a learner to work out whether a
 * resolution was validly passed.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 39 · F2 ───────────────────────────────────────────── */

export const LWE_TREE_39: StudyChapter = {
  id: "LWE-39",
  number: 39,
  paper: "LW",
  area: "F",
  title: "The company secretary and the auditor",
  minutes: 15,
  syllabusRefs: ["F2(a)", "F2(b)"],
  intro:
    "Two officers with very different jobs: one is the company's administrative conscience, the other its independent check — and the law protects the auditor's independence precisely because the people being checked appoint them.",
  outcomes: [
    "Explain the appointment, duties and powers of a company secretary",
    "Explain the appointment of an auditor and who may not be one",
    "State the auditor's duties, rights and powers",
    "Explain the removal and resignation of an auditor and the safeguards involved",
    "Advise on the consequences for a company that obstructs its auditor",
  ],
  sections: [
    {
      id: "secretary",
      heading: "The company secretary",
      blocks: [
        {
          kind: "table",
          caption: "Appointment",
          head: ["", "Private company", "Public company"],
          rows: [
            ["**Required?**", "**Optional** — a private company need not have one, and its functions fall to the directors if it does not", "**Required**"],
            ["**Qualification**", "None prescribed", "Must be **qualified** — by relevant professional membership, employment experience, or by appearing to the directors capable of discharging the functions"],
            ["**Appointed by**", "The **directors**, as the articles provide", "The **directors**"],
            ["**Registered?**", "In the register of secretaries, and notified to the registrar", "Same"],
          ],
        },
        {
          kind: "list",
          title: "What the secretary does",
          items: [
            "**Maintains the statutory registers and records** (chapter 33).",
            "**Files** the accounts, the confirmation statement and other returns with the registrar, on time.",
            "**Organises meetings** — issuing notices, preparing agendas, taking and keeping **minutes**.",
            "**Advises the board** on its legal and procedural obligations, and on corporate governance requirements.",
            "**Signs** certain documents and returns on the company's behalf.",
            "Has **apparent authority** in relation to the **administrative** side of the business, so a contract for office supplies or the hire of cars will bind the company — but **not** authority over trading or borrowing decisions.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The secretary is an officer, so liability follows",
          md: "A company secretary is an **officer** of the company, which matters in two ways. They can be **personally liable** for defaults where the Act imposes liability on officers — late filings, for instance — and they are exposed to **disqualification** for persistent breach of the filing requirements (chapter 37). Their apparent authority also has a real boundary: **administrative** matters bind the company, **commercial** ones do not.",
        },
      ],
      check: {
        q: "A private company has no company secretary. What is the position?",
        options: [
          "It is in breach of the Companies Act and must appoint one",
          "That is permitted — a private company need not have one, and the functions fall to the directors",
          "It may only trade once one is appointed",
          "Its filings are invalid",
        ],
        correct: 1,
        explain:
          "PERMITTED. A private company is not required to have a secretary, and where it has none the secretarial functions fall to the DIRECTORS. A PUBLIC company must have one, and that person must be QUALIFIED.",
      },
    },
    {
      id: "auditor",
      heading: "The auditor",
      blocks: [
        {
          kind: "list",
          title: "Appointment",
          items: [
            "Normally appointed by **ordinary resolution** of the members; the **directors** may appoint the **first** auditor and fill a casual vacancy.",
            "For a **private** company an auditor is **deemed reappointed** each year unless a resolution is passed or members holding at least **5%** of the voting rights object.",
            "The **Secretary of State** may appoint where no auditor has been appointed.",
            "**Small companies** meeting the statutory conditions may be **exempt from audit** altogether.",
          ],
        },
        {
          kind: "table",
          caption: "Who may NOT be the auditor",
          head: ["Disqualification", "Why"],
          rows: [
            ["An **officer or employee** of the company", "The auditor cannot check their own work — independence"],
            ["A **partner or employee** of such a person, or a partnership including one", "The same reason, extended"],
            ["A person **lacking the required professional qualification** or not registered with a recognised supervisory body", "Competence and regulation"],
            ["A person with a **connection** to the company of a kind the regulations prohibit", "Independence"],
          ],
        },
        {
          kind: "list",
          title: "Duties, rights and powers",
          items: [
            "**Report** under **s.495** to the members on whether the accounts give a **true and fair view** and have been properly prepared in accordance with the applicable framework.",
            "**Form an opinion** on whether **proper accounting records** were kept, whether the accounts **agree with** those records, and whether the information and explanations needed were received — and state in the report if any of those is unsatisfactory.",
            "A **right of access at all times** to the company's books, accounts and vouchers.",
            "A **right to require** information and explanations from officers and employees, and it is a **criminal offence** to make a knowingly or recklessly misleading statement to an auditor.",
            "A **s.502 right to receive notice of, attend and speak at** general meetings on any matter concerning them as auditor.",
            "A **right to be heard** on their removal, and to have representations circulated.",
          ],
        },
        {
          kind: "table",
          caption: "Leaving office",
          head: ["Route", "The safeguards"],
          rows: [
            ["**Removal by the members**", "By **ordinary resolution** at any time, on **28 days' special notice**. The auditor may make **written representations** and be **heard** at the meeting, and the registrar must be notified"],
            ["**Resignation**", "By written notice to the company, accompanied by a **statement of the circumstances** connected with the resignation, or a statement that there are none. The auditor may **requisition a meeting** to explain"],
            ["**Not reappointed**", "The safeguards on statements of circumstances apply so that reasons reach the members and, where required, the appropriate audit authority"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The statement of circumstances is the real protection",
          md: "Members appoint the auditor, but the **directors** are the people being audited — so an auditor who presses an awkward point is vulnerable. The safeguards answer that. Removal requires **special notice** and the auditor may **circulate representations and be heard**; resignation must be accompanied by a **statement of the circumstances**, which cannot simply be buried. The effect is that an auditor cannot be quietly got rid of: the reasons reach the members. That is why a scenario in which a board \"decides to change auditors\" after a disagreement is testing the safeguards, not the appointment rules.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Obstructing an auditor is a criminal matter",
          md: "The auditor's rights of access and to require information are not courtesies. **Knowingly or recklessly making a misleading, false or deceptive statement to an auditor is a criminal offence**, and failing to provide information the auditor requires exposes officers and employees to liability. Where the auditor cannot obtain what it needs, it must say so **in the report** — which is itself a signal to the members and to any lender reading the accounts.",
        },
        {
          kind: "example",
          title: "Advising on an auditor dispute",
          scenario:
            "Kirkbourne Ltd's auditor, Vasey & Co, has repeatedly asked for documentation supporting a £700,000 related-party balance. The finance director tells the audit team the file has been lost and that the balance is \"definitely recoverable\", which he knows to be doubtful. The board then calls a general meeting for eight days' time to remove Vasey & Co by ordinary resolution and appoint another firm, and instructs the secretary not to circulate anything from Vasey & Co. Vasey & Co asks what it can do.",
          steps: [
            { label: "Test the notice for the removal", detail: "Removal of an auditor requires 28 DAYS' SPECIAL NOTICE to the company. Eight days is insufficient, so the resolution would be INVALID." },
            { label: "Assert the auditor's procedural rights", detail: "Vasey & Co is entitled to make WRITTEN REPRESENTATIONS and to have them CIRCULATED to the members, and to be HEARD at the meeting. The instruction to the secretary not to circulate anything is a breach of those rights." },
            { label: "Address the finance director's statement", detail: "Telling the auditor the balance is \"definitely recoverable\" while KNOWING it is doubtful is a KNOWINGLY MISLEADING STATEMENT TO AN AUDITOR — a CRIMINAL OFFENCE. Withholding the file also breaches the duty to provide information the auditor requires." },
            { label: "Advise on the audit report", detail: "If Vasey & Co cannot obtain the information and explanations it needs, it must SAY SO IN ITS REPORT, and report on whether proper accounting records were kept and whether the accounts agree with them. It should consider a QUALIFIED opinion." },
            { label: "Advise on the exit route if removed", detail: "Whether removed or resigning, Vasey & Co may deliver a STATEMENT OF THE CIRCUMSTANCES, which reaches the members and where required the appropriate audit authority — so the reasons cannot be suppressed. On resignation it could also REQUISITION A MEETING to explain." },
            { label: "Note the wider exposure", detail: "The directors risk BREACH OF DUTY under s.174 and s.172 (chapter 38), and if the balance is misstated the accounts may support an UNLAWFUL DISTRIBUTION (chapter 36). Persistent failure could also ground DISQUALIFICATION for unfitness (chapter 37)." },
          ],
          result:
            "The removal **fails on notice** at eight days, Vasey & Co's **representations must be circulated**, the finance director has committed a **criminal offence**, and the **statement of circumstances** means the reasons reach the members whatever the board does. The safeguards make a quiet dismissal impossible.",
        },
      ],
      check: {
        q: "A board wants to remove its auditor after a disagreement, calling a meeting on ten days' notice and declining to circulate the auditor's representations. What is the position?",
        options: [
          "Valid, since members may remove an auditor by ordinary resolution at any time",
          "Invalid — removal requires 28 days' special notice, and the auditor may make representations and be heard",
          "Valid, provided a replacement is appointed at the same meeting",
          "Invalid, because an auditor can only be removed by special resolution",
        ],
        correct: 1,
        explain:
          "INVALID. Removal is by ORDINARY resolution but requires 28 DAYS' SPECIAL NOTICE, and the auditor may make WRITTEN REPRESENTATIONS, have them circulated, and be HEARD at the meeting. Those safeguards exist because the people being audited are the ones seeking the removal.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring every company to have a secretary.",
      fix: "Only a PUBLIC company must, and that secretary must be qualified.",
    },
    {
      trap: "Giving the secretary authority over trading or borrowing.",
      fix: "Apparent authority extends to ADMINISTRATIVE matters only.",
    },
    {
      trap: "Removing an auditor by ordinary resolution without special notice.",
      fix: "28 days' special notice is required, with the auditor's right to representations and to be heard.",
    },
    {
      trap: "Treating an auditor's resignation as ending matters quietly.",
      fix: "A statement of the circumstances must accompany it, so the reasons reach the members.",
    },
    {
      trap: "Overlooking the criminal offence of misleading an auditor.",
      fix: "Knowingly or recklessly misleading an auditor is an offence, quite apart from any civil consequence.",
    },
  ],
  keyTerms: [
    { term: "Company secretary", def: "An officer maintaining the registers, filings and meeting records; mandatory and qualified in a public company." },
    { term: "Deemed reappointment", def: "The automatic annual reappointment of a private company's auditor unless a resolution is passed or 5% of members object." },
    { term: "True and fair view", def: "The standard on which the auditor reports to the members." },
    { term: "Statement of circumstances", def: "The statement an auditor must give on leaving office, so the reasons reach the members." },
    { term: "Special notice", def: "The 28 days' notice to the company required to remove an auditor or a director." },
  ],
  summary: [
    "A public company must have a qualified secretary; a private company need not have one at all.",
    "The secretary's apparent authority covers administrative but not commercial matters, and they are an officer for liability purposes.",
    "An auditor is appointed by ordinary resolution, with deemed reappointment in a private company unless 5% object.",
    "Officers and employees of the company cannot be its auditor, and misleading an auditor is a criminal offence.",
    "Removal needs 28 days' special notice with rights to represent and be heard, and departure requires a statement of circumstances.",
  ],
  knowledgeDiagnostic: [
    { q: "Which companies must have a secretary, and with what qualification?", a: "Public companies must, and the secretary must be qualified; private companies need not have one." },
    { q: "How far does a secretary's apparent authority extend?", a: "To administrative matters such as office supplies or hiring cars, not to trading or borrowing decisions." },
    { q: "State the safeguards on removing an auditor.", a: "28 days' special notice, the auditor's right to make written representations and have them circulated, the right to be heard, and notification to the registrar." },
    { q: "What must accompany an auditor's resignation?", a: "A statement of the circumstances connected with it, or a statement that there are none, so the reasons reach the members." },
  ],
}

/* ── Chapter 40 · F3 ───────────────────────────────────────────── */

export const LWE_TREE_40: StudyChapter = {
  id: "LWE-40",
  number: 40,
  paper: "LW",
  area: "F",
  title: "Company meetings and resolutions",
  minutes: 17,
  syllabusRefs: ["F3(a)", "F3(b)", "F3(c)"],
  intro:
    "Procedure decides these questions. Get the type of resolution, the majority and the notice right and the answer follows — and a resolution passed on defective notice is liable to be worth nothing.",
  outcomes: [
    "Distinguish a general meeting from an annual general meeting",
    "Distinguish ordinary, special and written resolutions and state the majorities",
    "State the notice required, and who may call or requisition a meeting",
    "Explain quorum, proxies, and voting on a show of hands or a poll",
    "Decide whether a resolution was validly passed",
  ],
  sections: [
    {
      id: "meetings",
      heading: "The meetings, and who can call them",
      blocks: [
        {
          kind: "table",
          caption: "AGM and general meeting",
          head: ["", "Annual general meeting", "General meeting"],
          rows: [
            ["**Required?**", "**Public companies must** hold one within six months of the financial year end. A **private company need not**, unless its articles require it", "Held **as needed**"],
            ["**Usual business**", "Accounts and reports, appointment of auditor, election of directors, declaring a final dividend", "Whatever business is put to it"],
            ["**Notice**", "**21 days** for a plc's AGM", "**14 days** for any other general meeting of a private or public company"],
          ],
        },
        {
          kind: "list",
          title: "Who may call a meeting",
          items: [
            "**The directors**, which is the normal route.",
            "**The members, by requisition**: holders of at least **5%** of the paid-up voting capital may require the directors to call a general meeting. The directors must call it **within 21 days**, to be held **within 28 days** of that notice — and if they fail, the requisitionists may call it themselves and recover their expenses.",
            "**The court**, which may order a meeting where it is impracticable to call one otherwise.",
            "**The auditor**, on resigning, may requisition a meeting to explain the circumstances (chapter 39).",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Short notice",
          md: "Notice periods may be **shortened by consent**. A general meeting may be held on short notice with the agreement of a **majority in number** of the members holding at least **90%** of the voting shares in a **private** company, or **95%** in a **public** company. For a **plc's AGM** the requirement is agreement of **all** the members entitled to attend and vote. That is why the percentage in the scenario matters: 92% will do for a private company and not for a plc.",
        },
      ],
      check: {
        q: "Members holding 6% of the paid-up voting capital requisition a general meeting. What must the directors do?",
        options: [
          "Nothing — only the board may call a general meeting",
          "Call it within 21 days, to be held within 28 days of that notice, failing which the requisitionists may call it themselves",
          "Call it within six months",
          "Put the matter to the next AGM instead",
        ],
        correct: 1,
        explain:
          "Holders of at least 5% of the paid-up voting capital may REQUISITION a meeting. The directors must CALL it within 21 DAYS, to be HELD within 28 DAYS of that notice. If they fail, the REQUISITIONISTS MAY CALL IT THEMSELVES and recover their expenses from the company.",
      },
    },
    {
      id: "resolutions",
      heading: "The resolutions, and how they are passed",
      blocks: [
        {
          kind: "table",
          caption: "The types of resolution",
          head: ["Type", "Majority", "Used for"],
          rows: [
            ["**Ordinary**", "**Over 50%** of votes cast", "The default — appointing and **removing directors**, removing an auditor, declaring a final dividend, approving substantial property transactions and loans, and authorising allotments"],
            ["**Special**", "**Not less than 75%** of votes cast", "Constitutional and capital matters — **altering the articles**, changing the name, reducing capital, disapplying pre-emption rights, and a **voluntary winding up**"],
            ["**Written**", "The same majorities, but of the **total voting rights**, not merely of votes cast", "**Private companies only.** Cannot be used to remove a **director** or an **auditor**, both of which require a meeting"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The written resolution's two limits",
          md: "Both are examinable. First, the majority is measured against the **total voting rights** of eligible members, not against those who happen to respond — so silence counts as a **no**, and an ordinary written resolution needs **over 50% of all** the votes. Second, a written resolution **cannot** remove a **director** or an **auditor**: those need a **meeting**, because the person concerned has a right to be **heard** and to circulate representations, which a written procedure would defeat. That is the reason for the exception, and saying why earns the mark.",
        },
        {
          kind: "list",
          title: "Points of procedure that decide questions",
          items: [
            "**Special notice** of 28 days to the company is required to remove a **director** or an **auditor** — distinct from the notice of the meeting itself.",
            "**A special resolution must be reproduced word for word** in the notice, and cannot then be altered at the meeting in any way that matters.",
            "**Quorum** is **two** members present in person or by proxy, unless the articles say otherwise; a **single-member** company's quorum is one.",
            "**Proxies.** Any member may appoint a proxy, who may attend, speak and vote, and may demand a poll.",
            "**Voting** is normally on a **show of hands** — one vote per member — until a **poll** is demanded, when votes follow **shareholdings**. A poll may be demanded by not fewer than **five** members having the right to vote, or members representing at least **10%** of the total voting rights, or holders of shares conferring a right to vote on which at least 10% of the sums paid up has been paid.",
            "**Filing.** Special resolutions, and certain ordinary ones, must be filed with the registrar within **15 days**.",
            "**Unanimous informal agreement** of all members entitled to vote can be effective even without the formal procedure — but it cannot cure a defect where the procedure protects an **outsider's** right to be heard.",
            "**Effect of a defect.** A resolution passed without proper notice or without a quorum is liable to be **invalid**, and anything done under it may fall with it.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Show of hands against a poll — the trap in voting",
          md: "On a **show of hands** every member present has **one vote**, so a member with 70% of the shares counts once, exactly like a member with a single share. That means a majority shareholder can **lose** a show of hands and then **demand a poll**, on which votes follow **shareholdings** and they will win. So a scenario in which a resolution is defeated on a show of hands is usually asking whether a poll can be demanded — and by whom.",
        },
        {
          kind: "example",
          title: "Deciding whether resolutions were validly passed",
          scenario:
            "Fernlea Ltd, a private company, has four members: Ashby with 6,000 shares, Brill with 2,500, Coleman with 1,000 and Dacre with 500. The directors give 14 days' notice of a general meeting to (i) alter the articles, (ii) remove Coleman as a director, and (iii) approve a loan of £40,000 to Ashby. Notice of the meeting is given but no special notice is served in relation to Coleman. At the meeting all four attend. On a show of hands the article alteration is defeated 3-1, Ashby alone voting in favour. Ashby demands a poll. Separately, the board later circulates a written resolution to remove the company's auditor, and members holding 55% of the total voting rights sign it.",
          steps: [
            { label: "The article alteration — type and majority", detail: "Altering the articles needs a SPECIAL resolution, so not less than 75% of votes cast. On a SHOW OF HANDS Ashby has ONE vote like everyone else and loses 3-1." },
            { label: "The poll", detail: "Ashby holds 6,000 of 10,000 shares — 60% — and may DEMAND A POLL, being a member representing at least 10% of the total voting rights. On a poll votes follow SHAREHOLDINGS, so he casts 60%. But a special resolution needs 75%, and 60% FALLS SHORT. The alteration FAILS even on the poll." },
            { label: "Removing Coleman as a director", detail: "Removal is by ORDINARY resolution — Ashby's 60% would suffice — but it requires 28 DAYS' SPECIAL NOTICE to the company, and none was given. The resolution is therefore INVALID and must be re-run with proper special notice, Coleman being entitled to be heard and to circulate representations." },
            { label: "The loan to Ashby", detail: "A loan to a director needs approval by ORDINARY resolution of the members (chapter 38). Ashby's 60% on a poll carries it, so the loan is validly approved — assuming the memorandum of terms was made available." },
            { label: "The written resolution removing the auditor", detail: "INVALID whatever the percentage. A WRITTEN RESOLUTION is unavailable for removing an AUDITOR — or a director — because both are entitled to be heard and to have representations circulated, which requires a MEETING." },
            { label: "Summarise", detail: "The article alteration fails on the 75% threshold even after the poll; the removal of Coleman fails for want of special notice; the loan is approved; and the auditor removal fails because the wrong procedure was used entirely." },
          ],
          result:
            "**One of four succeeds.** Note how each failed for a different reason — a **majority threshold**, a **notice requirement**, and a **prohibited procedure** — which is exactly how these questions are constructed. Ashby's 60% is enough for ordinary business and never enough for a special resolution.",
        },
      ],
      check: {
        q: "A private company circulates a written resolution to remove a director, signed by holders of 80% of the total voting rights. Is the director removed?",
        options: [
          "Yes, since 80% exceeds the required majority",
          "No — a written resolution cannot be used to remove a director, because they are entitled to be heard at a meeting",
          "Yes, provided the director was sent a copy",
          "No, because removal requires a special resolution",
        ],
        correct: 1,
        explain:
          "NO. A WRITTEN RESOLUTION CANNOT remove a DIRECTOR or an AUDITOR, whatever the majority, because both are entitled to be HEARD and to have written representations circulated — which requires a MEETING. Removal is by ORDINARY resolution at a meeting, on 28 days' special notice.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using a written resolution to remove a director or auditor.",
      fix: "Prohibited. Both need a meeting, because they have a right to be heard.",
    },
    {
      trap: "Measuring a written resolution against the votes returned.",
      fix: "The majority is of the TOTAL voting rights, so silence counts against it.",
    },
    {
      trap: "Forgetting special notice when removing a director or auditor.",
      fix: "28 days' special notice to the company, separate from the notice of the meeting.",
    },
    {
      trap: "Treating a show of hands as reflecting shareholdings.",
      fix: "One vote per member on a show of hands; only on a POLL do votes follow shareholdings.",
    },
    {
      trap: "Assuming a majority shareholder can pass anything.",
      fix: "60% carries ordinary business but never a special resolution, which needs not less than 75%.",
    },
  ],
  keyTerms: [
    { term: "Annual general meeting", def: "The meeting a public company must hold within six months of its financial year end; not required of a private company." },
    { term: "Ordinary resolution", def: "A resolution passed by over 50% of votes cast." },
    { term: "Special resolution", def: "A resolution passed by not less than 75% of votes cast, needed for constitutional and capital matters." },
    { term: "Written resolution", def: "A private company procedure measured against total voting rights, unavailable to remove a director or auditor." },
    { term: "Requisition", def: "The right of members holding at least 5% of paid-up voting capital to require a general meeting." },
    { term: "Poll", def: "A vote in which votes follow shareholdings, replacing the one-member-one-vote show of hands." },
    { term: "Quorum", def: "Two members present in person or by proxy unless the articles provide otherwise; one for a single-member company." },
  ],
  summary: [
    "A public company must hold an AGM within six months of its year end; a private company need not.",
    "Notice is 21 days for a plc's AGM and 14 days for other general meetings, shortenable by consent at 90% or 95%.",
    "Ordinary resolutions need over 50% of votes cast, special resolutions not less than 75%.",
    "A written resolution is measured against total voting rights and cannot remove a director or auditor.",
    "On a show of hands each member has one vote; only on a poll do votes follow shareholdings.",
  ],
  knowledgeDiagnostic: [
    { q: "State the majorities for ordinary, special and written resolutions.", a: "Over 50% of votes cast, not less than 75% of votes cast, and the same proportions of the TOTAL voting rights for a written resolution." },
    { q: "Why can a written resolution not remove a director or auditor?", a: "Because both are entitled to be heard and to have written representations circulated, which requires a meeting." },
    { q: "What can members holding 5% of the voting capital do?", a: "Requisition a general meeting; the directors must call it within 21 days to be held within 28 days, failing which the members may call it and recover expenses." },
    { q: "Who may demand a poll?", a: "Not fewer than five members with the right to vote, or members representing at least 10% of the total voting rights, or holders of shares on which at least 10% of the sums paid up has been paid." },
  ],
}

export const LWE_TREE_AREA_F_PART2: StudyChapter[] = [LWE_TREE_39, LWE_TREE_40]
