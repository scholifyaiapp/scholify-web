import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-GLOBAL · the rest of Area F, and Areas G and H.
 * Chapters 27–33: other company officers and company meetings; liquidation and
 * administration; and corporate fraudulent and criminal behaviour.
 *
 * Note on Area G. In LW-GLOBAL this area is "legal implications relating to companies
 * in difficulty or in crisis", where LW-ENG has "insolvency law". The syllabus content
 * is close, but the Global framing is deliberately broader and jurisdiction-neutral,
 * so these two chapters teach the principle and the order of priority rather than one
 * country's insolvency statute.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 27 · F2 ───────────────────────────────────────────── */

export const LWG_TREE_27: StudyChapter = {
  id: "LWG-27",
  number: 27,
  paper: "LW",
  area: "F",
  title: "The company secretary and the auditor",
  minutes: 14,
  syllabusRefs: ["F2(a)", "F2(b)"],
  intro:
    "Two officers who exist to make the board answerable: one keeps the company's procedure honest, the other keeps its numbers honest.",
  outcomes: [
    "Discuss the appointment procedure relating to a company secretary, and their duties and powers",
    "Discuss the appointment procedure relating to an auditor, and their duties and rights",
    "Explain the removal and resignation of an auditor and the protections attaching to it",
  ],
  sections: [
    {
      id: "secretary",
      heading: "The company secretary",
      blocks: [
        {
          kind: "list",
          title: "Appointment and status",
          items: [
            "Appointed by the **directors**, on the terms they determine, and the appointment is **filed** and entered in the register of secretaries.",
            "**Required** for a public company, and generally **optional** for a private one — where a private company has none, the duties fall on the directors.",
            "A public company's secretary must be suitably **qualified**, by professional membership or relevant experience.",
            "The secretary is an **officer** of the company, and so exposed to liability for certain defaults alongside the directors.",
            "**A sole director cannot also be the secretary** where the roles must be held by different people — a point scenarios use to invalidate a purported signing.",
          ],
        },
        {
          kind: "table",
          caption: "Duties and powers",
          head: ["Duties", "Powers"],
          rows: [
            ["Maintain the **statutory registers** and minute books", "**Administrative authority** over the company's office and staff"],
            ["Give **notice** of, and record, members' and board meetings", "**Usual authority** to make contracts of an administrative kind on the company's behalf"],
            ["Make **filings** with the registrar within time", "Authority to sign certain documents and certify copies"],
            ["Advise the board on **procedure and compliance**, and ensure decisions are properly taken and recorded", "No authority to commit the company to **commercial** transactions"],
            ["Keep the company's **constitution** and governance arrangements in order", "—"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The secretary's usual authority is administrative, not commercial",
          md: "A secretary has usual authority to make contracts **incidental to running the office** — hiring a car, engaging temporary staff, ordering supplies. It does **not** extend to borrowing, selling assets or entering trading contracts. So a company is bound by the secretary's administrative dealings and not by a purported commercial commitment, which is the distinction a scenario is testing when a secretary signs something substantial.",
        },
      ],
      check: {
        q: "A company secretary, without board authority, hires temporary office staff and separately signs a $400,000 loan agreement. Which binds the company?",
        options: [
          "Both, as the secretary is an officer of the company",
          "The staffing arrangement, being administrative and within the secretary's usual authority; not the loan",
          "Neither, without a board resolution",
          "The loan only, as it is in writing",
        ],
        correct: 1,
        explain:
          "The STAFFING arrangement binds: a secretary has usual authority for contracts incidental to running the office. The LOAN does not — usual authority is administrative, not commercial, so borrowing needs actual authority from the board.",
      },
    },
    {
      id: "auditor",
      heading: "The auditor: appointment, rights and departure",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Appointment",
          items: [
            "Ordinarily appointed by the **members** by ordinary resolution, for each financial year.",
            "The **directors** may appoint the **first** auditor, and may fill a casual vacancy.",
            "Where no appointment is made, a **default power** typically allows the relevant authority to appoint.",
            "**Small or dormant companies** may be **exempt from audit** where the jurisdiction so provides, on criteria the scenario will state.",
            "The auditor must be **eligible and independent**: professionally qualified, and not an officer or employee of the company, nor connected in a way that compromises independence.",
          ],
        },
        {
          kind: "table",
          caption: "Duties and rights",
          head: ["Duties", "Rights"],
          rows: [
            ["**Report** to the members whether the financial statements give a true and fair view and comply with the applicable framework", "**Access** to the company's books, accounts and vouchers at all times"],
            ["Form a view on whether **adequate accounting records** have been kept and whether the accounts agree with them", "**Require information and explanations** from officers and employees"],
            ["State in the report if the required information was **not obtained**, or records were inadequate", "**Receive notice of, attend and speak** at any general meeting on matters concerning them as auditor"],
            ["Comply with **auditing standards** and exercise professional scepticism", "Receive notice of a proposed **written resolution** of a private company"],
            ["Consider whether the directors' report is **consistent** with the accounts", "Be **heard** on any resolution to remove or replace them"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The auditor reports to the MEMBERS, not to the board",
          md: "The audit exists because the members have entrusted their money to directors who prepare the accounts. So the report is addressed to the **members**, and the auditor's independence from the board is what gives it value. A scenario in which directors pressure an auditor to modify a report, or refuse information, is engaging both the auditor's **rights** and the directors' **duties**.",
        },
        {
          kind: "list",
          style: "number",
          title: "Removal and resignation — and the protections",
          items: [
            "**Removal** is by **ordinary resolution** of the members on **special notice**, at any time before the term expires. The auditor may make **written representations** and require them to be circulated, and may be **heard** at the meeting.",
            "**Resignation** is by written notice to the company, which must be accompanied by a **statement of the circumstances** connected with the resignation, or a statement that there are none.",
            "**Notification.** The company must notify the registrar, and in many systems the appropriate audit authority must be informed where an auditor ceases to hold office before the end of the term.",
            "**The auditor may requisition a meeting** to explain the circumstances of a resignation.",
            "**Removal does not deprive** the auditor of any claim for compensation or damages in respect of the termination.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why the departure procedure is so elaborate",
          md: "An auditor who is about to qualify a report is exactly the auditor a delinquent board wants gone. The procedure — special notice, written representations, the right to be heard, a statement of circumstances, notification to the authority — exists to make a **quiet dismissal impossible**. When a scenario has directors moving to replace an auditor shortly before signing the accounts, the protections are the answer.",
        },
        {
          kind: "example",
          title: "Working an auditor problem",
          scenario:
            "Denmoor plc's auditor, Vance & Co, has told the finance director that it cannot obtain evidence for $3.2m of claimed inventory and is likely to modify its report. The board proposes an ordinary resolution to remove Vance & Co and appoint a new firm, giving the auditor no advance warning, and instructs staff not to answer further audit queries pending the meeting. Vance & Co asks what it can do.",
          steps: [
            { label: "Test the removal procedure", detail: "Removal is by ordinary resolution on SPECIAL NOTICE. Proceeding without giving the auditor the notice and opportunity the procedure requires is defective, and the resolution may be ineffective." },
            { label: "Identify the auditor's procedural rights", detail: "Vance & Co may make WRITTEN REPRESENTATIONS and require them to be circulated to members, and may be HEARD at the meeting. So the members will learn why the auditor is going." },
            { label: "Deal with the instruction to withhold information", detail: "The auditor has a RIGHT to access the books and to require information and explanations from officers and employees. Obstructing it is a serious matter, and the auditor must STATE IN ITS REPORT that the required information was not obtained." },
            { label: "Note the directors' exposure", detail: "Instructing staff to obstruct the audit engages the directors' duties to act within powers and to promote the company's success, and in many systems it is an offence to make a misleading statement or fail to provide information to an auditor." },
            { label: "Deal with the inventory itself", detail: "Lack of evidence over $3.2m of inventory goes to whether ADEQUATE ACCOUNTING RECORDS have been kept and whether the accounts agree with them — matters the auditor must report on, quite apart from the true and fair opinion." },
            { label: "Set out the practical course", detail: "Insist on special notice, submit representations for circulation, attend and speak at the meeting, and — if it ceases to hold office — deliver a statement of the circumstances and notify the appropriate authority." },
          ],
          result:
            "The board cannot remove Vance & Co quietly. The protections convert an attempted concealment into a **disclosure to the members**, which is exactly their purpose. The point to hold on to is that the auditor's **rights of access and to information** are independent of its tenure — obstruction is itself reportable, so silencing the auditor makes the position worse rather than better.",
        },
      ],
      check: {
        q: "Directors move to remove the auditor shortly before it qualifies its report. What is the auditor entitled to do?",
        options: [
          "Nothing — removal is a matter for the members alone",
          "Require special notice, make written representations circulated to members, and be heard at the meeting",
          "Veto the resolution",
          "Continue in office regardless of the members' vote",
        ],
        correct: 1,
        explain:
          "The auditor cannot VETO removal, but the procedure protects it: removal needs SPECIAL NOTICE, and the auditor may make WRITTEN REPRESENTATIONS to be circulated and be HEARD at the meeting. On ceasing to hold office it must also deliver a statement of the circumstances.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Giving a company secretary authority over commercial transactions.",
      fix: "Usual authority is ADMINISTRATIVE. Borrowing, selling assets or trading contracts need actual authority.",
    },
    {
      trap: "Saying the auditor reports to the directors.",
      fix: "The report is to the MEMBERS. Independence from the board is what gives it value.",
    },
    {
      trap: "Requiring a special resolution to remove an auditor.",
      fix: "An ORDINARY resolution on special notice, with the auditor's rights to representations and to be heard.",
    },
    {
      trap: "Treating a refusal to give the auditor information as a private matter.",
      fix: "The auditor has a right to information and must STATE in its report that it was not obtained.",
    },
    {
      trap: "Assuming every private company needs a secretary.",
      fix: "A secretary is required for a public company and generally optional for a private one, where the duties fall on the directors.",
    },
  ],
  keyTerms: [
    { term: "Company secretary", def: "An officer appointed by the directors, responsible for registers, minutes, filings and procedural compliance, with administrative usual authority." },
    { term: "Auditor", def: "An independent, qualified person appointed by the members to report to them on whether the financial statements give a true and fair view and comply with the framework." },
    { term: "Special notice", def: "The extended notice required for a resolution to remove an auditor or a director, triggering the officer's right to respond." },
    { term: "Statement of circumstances", def: "The statement an auditor must deliver on ceasing to hold office, setting out the circumstances connected with it or confirming there are none." },
    { term: "Auditor's right to information", def: "The right of access to books and to require information and explanations from officers and employees, whose obstruction must be reported." },
  ],
  summary: [
    "A secretary is appointed by the directors, required for public companies and generally optional for private ones.",
    "The secretary maintains registers and minutes, makes filings and advises on procedure, with administrative usual authority only.",
    "An auditor is appointed by the members, must be qualified and independent, and reports to the members.",
    "The auditor has rights of access to books, to information from officers and employees, and to attend and speak at general meetings.",
    "Removal is by ordinary resolution on special notice, with rights to written representations and to be heard.",
    "Resignation requires a statement of the circumstances, and departure before the term ends must be notified.",
    "Obstructing the audit must be reported and exposes the directors.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the extent of a company secretary's usual authority?", a: "Administrative contracts incidental to running the office. It does not extend to commercial transactions such as borrowing or selling assets." },
    { q: "To whom does the auditor report, and why does that matter?", a: "To the members. The members entrusted their money to the directors who prepare the accounts, so independence from the board is what gives the report value." },
    { q: "How is an auditor removed?", a: "By ordinary resolution of the members on special notice, with the auditor entitled to make written representations for circulation and to be heard at the meeting." },
    { q: "What must an auditor do if it cannot obtain required information?", a: "State that fact in its report — and consider whether adequate accounting records have been kept." },
    { q: "What must accompany an auditor's resignation?", a: "A statement of the circumstances connected with it, or a statement that there are none, with notification to the registrar and often the audit authority." },
  ],
  furtherStudy: [
    "Chapter 28 covers the meetings and resolutions the secretary administers.",
    "Chapter 26 covers the directors' duties that obstructing an audit engages.",
  ],
}

/* ── Chapter 28 · F3 ───────────────────────────────────────────── */

export const LWG_TREE_28: StudyChapter = {
  id: "LWG-28",
  number: 28,
  paper: "LW",
  area: "F",
  title: "Company meetings and resolutions",
  minutes: 15,
  syllabusRefs: ["F3(a)", "F3(b)", "F3(c)"],
  intro:
    "Members exercise their power almost exclusively by voting on resolutions, so the procedure is not a formality — a defect in it can invalidate the decision entirely.",
  outcomes: [
    "Distinguish general meetings from annual general meetings",
    "Distinguish ordinary, special and written resolutions",
    "Explain the procedure for calling and conducting company meetings",
    "Identify the consequences of a procedural defect",
  ],
  sections: [
    {
      id: "meetings",
      heading: "The types of meeting, and calling one",
      blocks: [
        {
          kind: "table",
          caption: "Annual general meeting and general meeting",
          head: ["", "Annual general meeting", "General meeting"],
          rows: [
            ["**When**", "Once in each period, within the prescribed time after the year end", "Whenever needed"],
            ["**Required for**", "**Public** companies typically; often **not** required for a private company", "Both, as and when business requires"],
            ["**Typical business**", "Accounts and reports laid, auditor appointed, directors retiring by rotation re-elected, dividend approved", "Any business — a special resolution, a removal, an approval"],
            ["**Who may call**", "The **directors**; failing that, the members or the relevant authority may compel one", "The **directors**, or the members on a valid **requisition**"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Calling and conducting a meeting",
          items: [
            "**Notice** of the required length must be given to every person entitled — the members, the directors and the **auditor** — stating the time, date, place and the general nature of the business, and setting out the text of any special resolution.",
            "**Members holding the prescribed proportion** of the paid-up voting capital may **requisition** a general meeting, and if the directors do not call it the requisitionists may do so themselves and recover the expense.",
            "**Quorum** must be present, as the articles provide; without it the meeting cannot transact business.",
            "**A chair** conducts the meeting, keeps order, decides points of procedure and may have a **casting vote** where the articles allow.",
            "**Voting** is normally by show of hands, one vote per member, unless a **poll** is demanded — on a poll votes are counted by **shareholding**, which is why a poll can reverse the result of a show of hands.",
            "**Proxies.** A member may appoint a proxy to attend, speak and vote; the notice must say so.",
            "**Minutes** must be kept.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The show of hands and the poll can differ — deliberately",
          md: "On a **show of hands** each member present has **one vote** regardless of holding; on a **poll** votes are counted by **shares held**. So a resolution carried by a majority of individuals present can be defeated on a poll by one large holder. Knowing who may demand a poll, and that it may be demanded before or immediately after the show of hands, is the practical point.",
        },
      ],
      check: {
        q: "A resolution is carried on a show of hands by seven members to three. One of the three holds 60% of the shares and demands a poll. What is the likely outcome?",
        options: [
          "The show of hands stands, as it was taken first",
          "On a poll the votes are counted by shareholding, so the resolution is likely to be defeated",
          "The poll can only confirm the show of hands",
          "The chair decides which result applies",
        ],
        correct: 1,
        explain:
          "On a POLL votes are counted by SHAREHOLDING, not by heads. A member with 60% will defeat the resolution notwithstanding the show of hands, which gave each member present a single vote. That reversal is exactly why the right to demand a poll exists.",
      },
    },
    {
      id: "resolutions",
      heading: "The resolutions",
      blocks: [
        {
          kind: "table",
          caption: "The three types",
          head: ["Type", "Majority", "Used for"],
          rows: [
            ["**Ordinary resolution**", "A **simple majority** of votes cast", "Most business: appointing and **removing directors**, **removing an auditor**, approving a dividend, ordinary approvals"],
            ["**Special resolution**", "A **supermajority** of votes cast — the scenario will state the percentage", "**Altering the articles**, changing the name, reducing capital, winding up voluntarily, disapplying pre-emption rights"],
            ["**Written resolution**", "Passed without a meeting by the required proportion of eligible members signifying agreement", "Available to a **private** company for anything except **removing a director or an auditor**"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "A written resolution cannot remove a director or an auditor",
          md: "The exclusion exists because both have a **right to be heard** before the members vote (chapters 25 and 27), and a written resolution circulated for signature gives them no forum. So a private company wanting to remove either must **hold a meeting**. This is the single most examinable exception in the topic.",
        },
        {
          kind: "list",
          title: "Points of procedure that decide questions",
          items: [
            "**Special notice** is required for resolutions to remove a director or an auditor — extended notice to the company, distinct from the notice of the meeting.",
            "**A special resolution must be reproduced word for word** in the notice, and cannot then be altered at the meeting in any way that matters.",
            "**Filing.** Special resolutions, and certain ordinary ones, must be filed with the registrar within the prescribed period.",
            "**Unanimous informal agreement.** Where **all** members entitled to vote agree, a decision may be effective even without the formal procedure — but this cannot cure a defect where the procedure protects an **outsider's** right to be heard.",
            "**Effect of a defect.** A resolution passed without proper notice or without a quorum is liable to be **invalid**, and anything done under it may fall with it.",
          ],
        },
        {
          kind: "example",
          title: "Testing a set of resolutions",
          scenario:
            "Ellersby Ltd, a private company with five members, wishes to (a) alter its articles to remove a pre-emption clause, (b) remove a director, Tarn, and (c) remove its auditor. To save time the board circulates written resolutions for all three, obtains signatures from four of the five members representing 82% of the voting shares, and treats all three as passed. No notice was given to Tarn or to the auditor.",
          steps: [
            { label: "Test the alteration of articles", detail: "Altering the articles needs a SPECIAL resolution. A written resolution may be used by a private company for this, and 82% will satisfy the supermajority if that is the required threshold — so (a) is likely VALID, subject to filing." },
            { label: "Test the removal of the director", detail: "INVALID. A written resolution CANNOT be used to remove a director. It requires a meeting, on SPECIAL NOTICE, with Tarn entitled to be heard." },
            { label: "Test the removal of the auditor", detail: "INVALID for the same reason. A written resolution cannot remove an auditor, who is entitled to special notice, to make written representations for circulation, and to be heard." },
            { label: "Consider whether unanimity would have saved them", detail: "It would not. Even unanimous informal agreement cannot cure a defect where the procedure exists to protect an OUTSIDER's right to be heard — and in any event only four of the five members signed." },
            { label: "Identify the consequences", detail: "Tarn remains a director and the auditor remains in office. Anything done on the footing that they had been removed — a board decision taken without Tarn, or accounts signed off by a replacement firm — is exposed." },
            { label: "State the correct course", detail: "Call a general meeting on proper notice, give SPECIAL NOTICE of both removal resolutions, circulate the auditor's representations if any, allow both to be heard, and vote by ordinary resolution at the meeting." },
          ],
          result:
            "One resolution good, two bad. The distinction is the **right to be heard**: altering the articles affects only the members, so the written procedure serves; removing a director or an auditor affects a person entitled to address the members, and the written procedure is therefore unavailable. Procedure here is substantive, not clerical.",
        },
      ],
      check: {
        q: "A private company wants to remove a director without holding a meeting, and all members are willing to sign. Can it use a written resolution?",
        options: [
          "Yes, since all members agree",
          "No — a written resolution cannot be used to remove a director, who is entitled to be heard at a meeting",
          "Yes, provided special notice is given",
          "Only if the director consents in writing",
        ],
        correct: 1,
        explain:
          "NO. Removing a director (or an auditor) is expressly outside the written resolution procedure, because both are entitled to be HEARD before the members vote. Unanimity does not cure it, since the protection exists for the director rather than for the members.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using a written resolution to remove a director or an auditor.",
      fix: "Both are excluded, because each is entitled to be heard at a meeting.",
    },
    {
      trap: "Treating a show of hands as conclusive.",
      fix: "A POLL counts votes by shareholding and can reverse it.",
    },
    {
      trap: "Confusing special notice with notice of the meeting.",
      fix: "Special notice is extended notice TO THE COMPANY of an intended resolution, and is additional to notice of the meeting.",
    },
    {
      trap: "Amending the text of a special resolution at the meeting.",
      fix: "The text must be set out in the notice and cannot be materially amended.",
    },
    {
      trap: "Assuming a procedural defect is harmless if everyone agrees.",
      fix: "Unanimous informal agreement cannot cure a defect where the procedure protects an outsider's right to be heard.",
    },
    {
      trap: "Forgetting the auditor is entitled to notice of general meetings.",
      fix: "The auditor is entitled to notice, to attend and to speak on matters concerning them as auditor.",
    },
  ],
  keyTerms: [
    { term: "Annual general meeting", def: "The periodic members' meeting, typically required of public companies, at which accounts are laid and routine business transacted." },
    { term: "Requisition", def: "The members' right, holding the prescribed proportion of paid-up voting capital, to compel the directors to call a general meeting." },
    { term: "Quorum", def: "The minimum attendance required by the articles before a meeting can transact business." },
    { term: "Poll", def: "A vote counted by shareholding rather than by show of hands, which may reverse the apparent result." },
    { term: "Ordinary resolution", def: "A resolution passed by a simple majority of votes cast." },
    { term: "Special resolution", def: "A resolution requiring a supermajority, used for altering the articles, reducing capital and similar constitutional matters." },
    { term: "Written resolution", def: "A private company's resolution passed without a meeting, unavailable for removing a director or an auditor." },
  ],
  summary: [
    "An AGM is typically required of public companies; general meetings are held as business requires.",
    "Notice must go to members, directors and the auditor, stating the business and the text of any special resolution.",
    "Members holding the prescribed proportion may requisition a meeting and, if ignored, call it themselves.",
    "A show of hands gives one vote per member; a poll counts shares and may reverse the result.",
    "Ordinary resolutions need a simple majority; special resolutions a supermajority.",
    "A private company may use written resolutions, except to remove a director or an auditor.",
    "Special notice is required for those removals, and a procedural defect can invalidate the resolution.",
  ],
  knowledgeDiagnostic: [
    { q: "What can a written resolution NOT be used for, and why?", a: "Removing a director or an auditor, because each is entitled to be heard by the members before the vote and a circulated resolution gives no forum." },
    { q: "How does a poll differ from a show of hands?", a: "A show of hands gives each member present one vote; a poll counts votes by shareholding, so a large holder can reverse the outcome." },
    { q: "Which resolutions require a supermajority?", a: "Special resolutions — altering the articles, changing the name, reducing capital, voluntary winding up, disapplying pre-emption rights." },
    { q: "Who is entitled to notice of a general meeting?", a: "Every member entitled to attend, the directors, and the auditor." },
    { q: "Can unanimous informal agreement cure any procedural defect?", a: "No. It cannot cure a defect where the procedure protects an outsider's right to be heard, such as a director's or auditor's." },
  ],
  furtherStudy: [
    "Chapter 25 explains the removal procedure the written resolution exclusion protects.",
    "Chapter 21 covers the articles that regulate meeting procedure.",
  ],
}

/* ── Chapter 29 · G1(a)–(c) ────────────────────────────────────── */

export const LWG_TREE_29: StudyChapter = {
  id: "LWG-29",
  number: 29,
  paper: "LW",
  area: "G",
  title: "Liquidation: voluntary, compulsory, and the order of payment",
  minutes: 17,
  syllabusRefs: ["G1(a)", "G1(b)", "G1(c)"],
  intro:
    "Liquidation is the end of the company's life, and the whole exercise is about one question: who gets paid, and in what order.",
  outcomes: [
    "Explain the meaning of, and the procedure in, voluntary liquidation, distinguishing members' from creditors' voluntary liquidation",
    "Say what compulsory liquidation is, on what grounds a court orders it, and how it runs",
    "Explain the order in which company debts are paid on liquidation",
    "Apply the order of priority to distribute a liquidation estate",
  ],
  sections: [
    {
      id: "voluntary",
      heading: "Voluntary liquidation",
      blocks: [
        {
          kind: "definition",
          term: "Voluntary liquidation",
          md: "A winding up commenced by the **members**, by passing a resolution — ordinarily a **special resolution** — to wind the company up. It takes one of two forms depending on **solvency**, and the difference decides who controls the process.",
        },
        {
          kind: "table",
          caption: "Members' against creditors' voluntary liquidation",
          head: ["", "Members' voluntary liquidation", "Creditors' voluntary liquidation"],
          rows: [
            ["**Company is**", "**Solvent**", "**Insolvent**"],
            ["**Trigger**", "The directors make a **statutory declaration of solvency** — that the company can pay its debts in full within a stated period", "**No** declaration of solvency is made, or one cannot be made"],
            ["**Who appoints the liquidator**", "The **members**", "The **creditors**, whose choice prevails over the members'"],
            ["**Who controls**", "The members, through the liquidator they appointed", "The **creditors**, often through a liquidation committee"],
            ["**If it turns out insolvent**", "It **converts** into a creditors' voluntary liquidation", "—"],
            ["**Directors' exposure**", "A declaration of solvency made without reasonable grounds is an **offence**", "Conduct in the run-up is examined for wrongful trading (chapter 33)"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The declaration of solvency is the pivot",
          md: "Everything about a voluntary liquidation follows from whether the directors can honestly declare solvency. Make it, and the **members** keep control. Fail to make it, and the **creditors** take over — because it is now their money at stake. And a declaration made **without reasonable grounds** is an offence, so it is not a formality to be signed lightly.",
        },
      ],
      check: {
        q: "Directors make a declaration of solvency and the members appoint a liquidator. The liquidator then finds the company cannot pay its debts in full. What happens?",
        options: [
          "The liquidation continues unchanged",
          "It converts into a creditors' voluntary liquidation, with the creditors taking control",
          "The liquidation is void and must be restarted",
          "The court must wind the company up compulsorily",
        ],
        correct: 1,
        explain:
          "It CONVERTS into a creditors' voluntary liquidation and the CREDITORS take control, because it is now their money at risk. The directors also face exposure for having made a declaration of solvency without reasonable grounds.",
      },
    },
    {
      id: "compulsory",
      heading: "Compulsory liquidation",
      blocks: [
        {
          kind: "definition",
          term: "Compulsory liquidation",
          md: "A winding up **ordered by the court** on a petition. The petitioner is usually a **creditor**, but may be the company itself, the directors, a member, or a public authority. On the order the court appoints an official to act, and a liquidator is then appointed.",
        },
        {
          kind: "table",
          caption: "The grounds",
          head: ["Ground", "Detail"],
          rows: [
            ["**The company is unable to pay its debts**", "The most common ground, typically evidenced by an unsatisfied statutory demand for a sum above a prescribed minimum, or by proof that liabilities exceed assets"],
            ["**The members have resolved** by special resolution that the company be wound up by the court", "An alternative to voluntary winding up"],
            ["**The company has not commenced business** within a prescribed period of incorporation, or has suspended business", "For a prescribed period"],
            ["**It is just and equitable** to wind the company up", "A residual ground — deadlock, loss of substratum, exclusion from management in a quasi-partnership, or justifiable loss of confidence in management"],
            ["**The number of members has fallen below the statutory minimum**, where one applies", "—"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "The effects of a winding-up order",
          items: [
            "The **liquidator takes control** of the company's assets; the directors' powers **cease**.",
            "**Legal proceedings** against the company are stayed, and none may be commenced without leave.",
            "**Employees** are typically dismissed by the order.",
            "**Dispositions of property** after the commencement of winding up are void unless the court orders otherwise.",
            "**The liquidator investigates** the company's affairs, may set aside certain transactions, and reports on the directors' conduct — which can lead to disqualification or to wrongful trading proceedings.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The liquidator can look backwards",
          md: "A liquidator is not confined to selling what is left. It may attack transactions entered into before the liquidation — a **preference** given to one creditor over others, or a **transaction at an undervalue** that stripped assets — and may pursue directors for **wrongful trading**. So advising a struggling company to move assets or pay a favoured creditor is advising it into a worse position.",
        },
      ],
      check: {
        q: "Two equal shareholder-directors of a small company are in complete deadlock and neither will sell to the other. On what ground might the company be wound up?",
        options: [
          "Inability to pay debts",
          "That it is just and equitable to do so",
          "Failure to commence business",
          "There is no ground; deadlock is not a basis for winding up",
        ],
        correct: 1,
        explain:
          "The JUST AND EQUITABLE ground — the residual basis covering deadlock, loss of the company's substratum, exclusion from management in a quasi-partnership, and justifiable loss of confidence in management. The company may be perfectly solvent, so inability to pay debts does not arise.",
      },
    },
    {
      id: "priority",
      heading: "The order of payment",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The order of priority",
          items: [
            "**Fixed charge holders**, out of the proceeds of the assets subject to their charge — effectively outside the estate to the extent of their security.",
            "**Liquidation expenses**, including the liquidator's remuneration.",
            "**Preferential creditors** — typically certain employee claims such as arrears of wages up to a limit and holiday pay, and some taxes, ranking equally among themselves and abating proportionately if insufficient.",
            "**Floating charge holders**, subject in many systems to a **prescribed part** of the floating charge assets being set aside for unsecured creditors.",
            "**Unsecured (ordinary) creditors**, sharing pro rata.",
            "**Interest** on debts, for the period after the commencement of winding up.",
            "**Members**, in accordance with their rights — preference shareholders' capital priority first, then the ordinary shareholders taking the surplus.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two things to hold on to",
          md: "**A fixed charge holder is paid out of its security before the estate is distributed at all** — the asset never really enters the pool. And **preferential creditors rank ahead of a floating charge**, which is the structural weakness of floating security noted in chapter 23. Getting those two right resolves most priority questions.",
        },
        {
          kind: "example",
          title: "Distributing a liquidation estate",
          scenario:
            "Alderwood Ltd is in creditors' voluntary liquidation. Its assets realise: freehold premises $700,000, subject to a registered fixed charge securing $450,000; plant, inventory and receivables $380,000, subject to a registered floating charge securing $500,000. Liquidation expenses are $60,000. Preferential employee claims are $110,000. Unsecured trade creditors are owed $900,000. There are 100,000 $1 ordinary shares and 50,000 $1 preference shares carrying priority for capital repayment. Assume no prescribed part applies.",
          steps: [
            { label: "Apply the fixed charge to its security", detail: "The fixed charge holder takes $450,000 out of the $700,000 premises. It is paid in FULL, and the surplus of $250,000 falls into the general estate." },
            { label: "Assemble the estate", detail: "Surplus from the premises $250,000 plus floating charge assets $380,000 = $630,000 available before the ranking begins." },
            { label: "Pay liquidation expenses", detail: "$60,000 of expenses come next, leaving $570,000." },
            { label: "Pay preferential creditors", detail: "Preferential employee claims of $110,000 rank AHEAD of the floating charge. Paid in full, leaving $460,000." },
            { label: "Pay the floating charge holder", detail: "The floating charge secures $500,000 but only $460,000 remains — it recovers $460,000, leaving a SHORTFALL of $40,000 which becomes an unsecured claim." },
            { label: "Deal with the unsecured pool and the members", detail: "Nothing remains. Unsecured creditors — $900,000 of trade creditors plus the floating charge holder's $40,000 shortfall — receive NOTHING, and the members receive nothing at all. The preference shareholders' capital priority is worthless where creditors are unpaid." },
          ],
          result:
            "Fixed charge $450,000, expenses $60,000, preferential $110,000, floating charge $460,000, everyone else nil. Two features carry the marks: the **fixed charge holder is satisfied from its own security first**, and **preferential creditors outrank the floating charge** — so the floating charge holder bears the shortfall. Members rank last and, in an insolvent liquidation, almost always receive nothing whatever their class rights say.",
        },
      ],
      check: {
        q: "In a liquidation, who ranks immediately ahead of a floating charge holder?",
        options: [
          "Ordinary unsecured creditors",
          "Preferential creditors, after liquidation expenses",
          "The members",
          "Nobody — a floating charge holder ranks first",
        ],
        correct: 1,
        explain:
          "PREFERENTIAL CREDITORS, coming after liquidation expenses and after any fixed charge holder has been satisfied from its own security. This subordination is the structural weakness of a floating charge, and unsecured creditors rank BELOW it, not above.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Confusing members' and creditors' voluntary liquidation.",
      fix: "The DECLARATION OF SOLVENCY decides it. With one, the members appoint the liquidator; without one, the creditors do.",
    },
    {
      trap: "Ranking unsecured creditors ahead of a floating charge holder.",
      fix: "The floating charge ranks ahead of unsecured creditors but BEHIND preferential creditors and expenses.",
    },
    {
      trap: "Putting a fixed charge holder into the general ranking.",
      fix: "It is paid out of the proceeds of ITS OWN security first; only the surplus joins the estate.",
    },
    {
      trap: "Treating deadlock as no ground for winding up.",
      fix: "The JUST AND EQUITABLE ground covers deadlock, exclusion from management and justifiable loss of confidence.",
    },
    {
      trap: "Assuming a solvent liquidation cannot become insolvent.",
      fix: "A members' voluntary liquidation CONVERTS into a creditors' one, and the directors face exposure for the declaration.",
    },
    {
      trap: "Paying members their capital priority ahead of creditors.",
      fix: "Members rank LAST. A preference share's capital priority operates only among members.",
    },
  ],
  keyTerms: [
    { term: "Members' voluntary liquidation", def: "A solvent winding up following a directors' declaration of solvency, with the members appointing the liquidator." },
    { term: "Creditors' voluntary liquidation", def: "An insolvent winding up where no declaration of solvency is made, with the creditors appointing the liquidator." },
    { term: "Declaration of solvency", def: "The directors' statutory declaration that the company can pay its debts in full within a stated period; an offence if made without reasonable grounds." },
    { term: "Compulsory liquidation", def: "A winding up ordered by the court on a petition, most often for inability to pay debts." },
    { term: "Just and equitable ground", def: "The residual ground for compulsory winding up, covering deadlock, loss of substratum, exclusion from management and justifiable loss of confidence." },
    { term: "Preferential creditors", def: "Creditors ranking after liquidation expenses but ahead of a floating charge, typically including limited employee claims and some taxes." },
  ],
  summary: [
    "Voluntary liquidation begins with a members' resolution, and the declaration of solvency decides which form it takes.",
    "In a members' voluntary liquidation the members appoint the liquidator; in a creditors' one the creditors do.",
    "A members' voluntary liquidation converts if the company proves insolvent, and the declaration exposes the directors.",
    "Compulsory liquidation is by court order, most often for inability to pay debts, with the just and equitable ground as a residual basis.",
    "On a winding-up order the liquidator takes control, directors' powers cease and proceedings are stayed.",
    "The order of payment is fixed charges from their security, expenses, preferential creditors, floating charges, unsecured creditors, interest, then members.",
    "A liquidator may attack preferences and undervalue transactions and pursue directors for wrongful trading.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes a members' from a creditors' voluntary liquidation?", a: "Whether the directors make a declaration of solvency. With one the members appoint the liquidator; without one the creditors do and control the process." },
    { q: "Name three grounds for compulsory liquidation.", a: "Inability to pay debts, a members' special resolution for winding up by the court, and that it is just and equitable. Failure to commence or suspension of business is another." },
    { q: "Give the order of payment on liquidation.", a: "Fixed charge holders from their security, liquidation expenses, preferential creditors, floating charge holders, unsecured creditors, post-commencement interest, then members." },
    { q: "Why is a floating charge weaker than a fixed charge in a liquidation?", a: "It ranks behind liquidation expenses and preferential creditors, and behind a fixed charge over the same assets." },
    { q: "What can a liquidator do about transactions before the liquidation?", a: "Attack a preference given to one creditor, or a transaction at an undervalue, and pursue the directors for wrongful trading." },
  ],
  furtherStudy: [
    "Chapter 30 covers administration, the alternative to liquidation.",
    "Chapter 23 explains the charges whose priority this chapter applies.",
    "Chapter 33 covers the wrongful trading a liquidator may pursue.",
  ],
}

/* ── Chapter 30 · G1(d), G1(e) ─────────────────────────────────── */

export const LWG_TREE_30: StudyChapter = {
  id: "LWG-30",
  number: 30,
  paper: "LW",
  area: "G",
  title: "Administration as an alternative to liquidation",
  minutes: 14,
  syllabusRefs: ["G1(d)", "G1(e)"],
  intro:
    "Liquidation kills the company. Administration is the attempt to save it, or at least to get more for the creditors than a break-up would — and the moratorium is what buys the time to try.",
  outcomes: [
    "Explain administration as an alternative to liquidation",
    "Explain the ways in which an administrator may be appointed",
    "Explain the effects of the appointment, including the moratorium",
    "Explain the powers and duties of an administrator",
  ],
  sections: [
    {
      id: "purpose-and-appointment",
      heading: "The purpose, and how an administrator is appointed",
      blocks: [
        {
          kind: "definition",
          term: "Administration",
          md: "A procedure placing a company under the control of an **administrator**, an insolvency practitioner acting as an **officer of the court**, with the object of achieving one of a **statutory hierarchy of purposes** — and with a **moratorium** protecting the company from creditor action while the attempt is made.",
        },
        {
          kind: "list",
          style: "number",
          title: "The hierarchy of purposes",
          items: [
            "**Rescuing the company as a going concern** — the primary objective, and the one that distinguishes administration from liquidation.",
            "**Achieving a better result for the creditors as a whole** than would be likely on a winding up (Sch B1 para 3(1)(b)) — pursued only if the first is not reasonably practicable.",
            "**Realising property to make a distribution to secured or preferential creditors** — pursued only if neither of the first two is reasonably practicable, and only without unnecessarily harming the interests of the creditors as a whole.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The hierarchy is not a menu",
          md: "An administrator must pursue the **first** objective unless it is not reasonably practicable, and only then move down. That matters in an exam scenario because it constrains what the administrator may do: selling the business immediately to a connected party, when a rescue was realistically available, is a failure to follow the hierarchy — not merely a commercial judgement.",
        },
        {
          kind: "table",
          caption: "Three routes to appointment",
          head: ["Appointed by", "How, and the constraint"],
          rows: [
            ["**The court**", "On an **administration application** by the company, the directors or a creditor. Under Sch B1 para 11 the court must be satisfied the company \"is or is likely to become unable to pay its debts\" and that administration is likely to achieve its purpose"],
            ["**The holder of a qualifying floating charge**", "**Out of court**, by filing the prescribed documents. It must give notice to any prior qualifying charge holder"],
            ["**The company or its directors**", "**Out of court**, by filing, having given notice to any qualifying floating charge holder — who may then appoint its own choice instead. Not available where a winding-up petition is pending"],
          ],
        },
      ],
      check: {
        q: "An administrator concludes that rescuing the company is realistically achievable but that selling the business quickly would be simpler. What must it do?",
        options: [
          "Choose whichever course it prefers commercially",
          "Pursue the rescue, because the objectives are a hierarchy and a lower one may be pursued only if the higher is not reasonably practicable",
          "Seek the members' approval for either course",
          "Pursue whichever gives secured creditors the most",
        ],
        correct: 1,
        explain:
          "PURSUE THE RESCUE. The purposes are a HIERARCHY: rescuing the company as a going concern comes first, and a lower objective may be pursued only if the higher is not reasonably practicable. Convenience does not justify moving down it, and the secured creditors' interests come lowest.",
      },
    },
    {
      id: "effects-and-powers",
      heading: "The effects of appointment, and the administrator's powers and duties",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The effects — the moratorium above all",
          items: [
            "**A moratorium.** No resolution or order for winding up may be made; **no legal process, enforcement or repossession** may be begun or continued against the company or its property, and **no security may be enforced**, without the administrator's consent or the court's permission.",
            "**Directors' powers are suspended** to the extent that they may not be exercised without the administrator's consent, though the directors remain in office.",
            "**A floating charge crystallises**, and the administrator may deal with charged property, applying proceeds according to priority.",
            "**Company documents** must state that the company is in administration and name the administrator.",
            "**A pending winding-up petition** is generally dismissed or suspended.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The moratorium is the whole point",
          md: "Without it, the first creditor to act would seize an asset and the rescue would collapse. The moratorium **freezes the creditors collectively** so that the company has breathing space and no one can improve their position by moving fastest. Everything else in administration is machinery to make use of the time the moratorium buys.",
        },
        {
          kind: "table",
          caption: "The administrator's powers and duties",
          head: ["Powers", "Duties"],
          rows: [
            ["Do **anything necessary or expedient** for the management of the company's affairs, business and property", "Act in the interests of the **creditors as a whole**, not of the appointor"],
            ["**Remove and appoint directors**", "Pursue the **hierarchy** of objectives"],
            ["**Carry on the business**, sell assets, and dispose of property subject to a charge with the court's permission or the holder's consent", "**Take custody** of the company's property"],
            ["**Call meetings** of members or creditors", "Prepare and send **proposals** to creditors within the prescribed period, and seek their approval"],
            ["**Make distributions** to secured and preferential creditors, and to unsecured creditors with the court's permission", "Perform functions **as quickly and efficiently as reasonably practicable**"],
            ["**Apply to the court** for directions", "**Report** on the directors' conduct, which may lead to disqualification"],
          ],
        },
        {
          kind: "example",
          title: "Working an administration scenario",
          scenario:
            "Marchant Engineering is insolvent but has a full order book and a profitable core division. Its bank, holding a qualifying floating charge, appoints an administrator out of court. On appointment: a trade creditor is midway through proceedings for $80,000; an equipment lessor arrives to repossess machines essential to the profitable division; and the bank presses the administrator to sell the whole business immediately to recover its debt. The directors want to continue running the company.",
          steps: [
            { label: "The trade creditor's proceedings", detail: "STAYED by the moratorium. No legal process may be continued against the company without the administrator's consent or the court's permission." },
            { label: "The lessor's repossession", detail: "BLOCKED. No repossession of goods in the company's possession may be effected without consent or permission — which is what allows the profitable division to keep operating." },
            { label: "The bank's pressure to sell", detail: "The administrator owes its duty to the CREDITORS AS A WHOLE, not to its appointor. With a full order book and a profitable core, RESCUING the company may well be reasonably practicable, and the hierarchy requires that to be pursued first." },
            { label: "The directors' position", detail: "They remain in office but may not exercise their powers without the administrator's consent, and the administrator may remove them. Running the company is now the administrator's function." },
            { label: "The administrator's immediate obligations", detail: "Take custody of the property, form a view on which objective is achievable, and send PROPOSALS to creditors within the prescribed period for approval." },
            { label: "Note what the administrator must also do", detail: "Report on the directors' conduct. If they continued to incur credit after insolvency was plain, that report may lead to disqualification or wrongful trading proceedings (chapter 33)." },
          ],
          result:
            "Proceedings stayed, repossession blocked, and the bank's preference resisted in favour of the statutory hierarchy. The examinable core is the **moratorium** — which produces the answer to both creditor questions — and the administrator's duty to the **creditors as a whole**, which is what stops the appointing charge holder from directing the outcome.",
        },
      ],
      check: {
        q: "A lessor tries to repossess equipment from a company in administration. Can it?",
        options: [
          "Yes, because it owns the equipment",
          "Not without the administrator's consent or the court's permission, because of the moratorium",
          "Yes, if it acts within 14 days of the appointment",
          "Only if the equipment is not essential to the business",
        ],
        correct: 1,
        explain:
          "NOT WITHOUT CONSENT OR PERMISSION. The moratorium prevents repossession of goods in the company's possession, as well as enforcement of security and legal process. Ownership does not override it — that is precisely what makes a rescue possible.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating the administrator's objectives as alternatives to choose between.",
      fix: "They are a HIERARCHY. A lower objective may be pursued only if the higher is not reasonably practicable.",
    },
    {
      trap: "Saying the appointing charge holder's interests govern.",
      fix: "The administrator owes its duty to the creditors AS A WHOLE, not to its appointor.",
    },
    {
      trap: "Allowing repossession or enforcement during administration.",
      fix: "The moratorium blocks it without the administrator's consent or the court's permission.",
    },
    {
      trap: "Saying the directors are removed by the appointment.",
      fix: "They remain in office but cannot exercise their powers without consent, and the administrator MAY remove them.",
    },
    {
      trap: "Confusing administration with liquidation.",
      fix: "Liquidation ends the company; administration attempts rescue or a better outcome for creditors, protected by a moratorium.",
    },
  ],
  keyTerms: [
    { term: "Administration", def: "A procedure placing a company under an administrator, an officer of the court, to pursue a statutory hierarchy of purposes under the protection of a moratorium." },
    { term: "Moratorium", def: "The freeze on legal process, enforcement, repossession and winding up during administration, without the administrator's consent or the court's permission." },
    { term: "Qualifying floating charge holder", def: "A charge holder entitled to appoint an administrator out of court, on notice to any prior qualifying charge holder." },
    { term: "Hierarchy of purposes", def: "Rescue as a going concern; failing that a better result for creditors as a whole than winding up; failing that a distribution to secured or preferential creditors." },
    { term: "Administrator's proposals", def: "The statement of how the administrator intends to achieve the purpose, sent to creditors within the prescribed period for approval." },
  ],
  summary: [
    "Administration seeks to rescue the company or improve the creditors' outcome, rather than to end the company.",
    "The purposes form a hierarchy, and a lower one may be pursued only if the higher is not reasonably practicable.",
    "An administrator may be appointed by the court, by a qualifying floating charge holder, or by the company or directors out of court.",
    "The moratorium halts legal process, enforcement, repossession and winding up.",
    "Directors remain in office but cannot act without consent, and may be removed by the administrator.",
    "The administrator acts as an officer of the court in the interests of the creditors as a whole, not of its appointor.",
    "It must send proposals to creditors within the prescribed period and report on the directors' conduct.",
  ],
  knowledgeDiagnostic: [
    { q: "State the hierarchy of administration purposes.", a: "Rescue the company as a going concern; failing that, achieve a better result for creditors as a whole than on winding up; failing that, realise property for secured or preferential creditors." },
    { q: "What does the moratorium prevent?", a: "Winding up, and any legal process, enforcement of security or repossession against the company or its property without the administrator's consent or the court's permission." },
    { q: "To whom does the administrator owe its duty?", a: "To the creditors as a whole — not to the charge holder or other party that appointed it." },
    { q: "What happens to the directors on appointment of an administrator?", a: "They remain in office but may not exercise their powers without the administrator's consent, and the administrator may remove them." },
    { q: "Name the three routes to appointing an administrator.", a: "By the court on an application; out of court by a qualifying floating charge holder; and out of court by the company or its directors." },
  ],
  furtherStudy: [
    "Chapter 29 covers the liquidation administration is an alternative to.",
    "Chapter 33 covers the conduct an administrator's report on the directors may expose.",
  ],
}

/* ── Chapter 31 · H1(a), H1(b) ─────────────────────────────────── */

export const LWG_TREE_31: StudyChapter = {
  id: "LWG-31",
  number: 31,
  paper: "LW",
  area: "H",
  title: "Insider dealing and market abuse",
  minutes: 15,
  syllabusRefs: ["H1(a)", "H1(b)"],
  intro:
    "Both offences protect the same thing: confidence that the price of a security reflects information everybody has, rather than information a few people have.",
  outcomes: [
    "Recognise the nature of, and legal control over, insider dealing",
    "Identify inside information and who counts as an insider",
    "Recognise the nature of, and legal control over, market abuse",
    "Distinguish insider dealing from market abuse and identify the defences and consequences",
  ],
  sections: [
    {
      id: "insider-dealing",
      heading: "Insider dealing",
      blocks: [
        {
          kind: "definition",
          term: "Inside information",
          md: "On the **s.56(1)** definition, information is inside information where it is **specific or precise**, **not made public**, relates to particular securities or a particular issuer, and \"if made public would be likely to have a significant effect on the price\" of those securities. All four elements are needed — drop any one and the offence cannot be made out.",
        },
        {
          kind: "table",
          caption: "The three forms of the offence",
          head: ["Conduct", "Detail"],
          rows: [
            ["**Dealing** — s.52(1)", "Acquiring or disposing of price-affected securities while in possession of inside information as an insider"],
            ["**Encouraging**", "Encouraging another to deal in those securities, knowing or having reasonable cause to believe they would deal"],
            ["**Disclosing**", "Disclosing the information to another otherwise than in the proper performance of one's employment, office or profession — a **tip-off**"],
          ],
        },
        {
          kind: "list",
          title: "Who is an insider",
          items: [
            "A person who has information **as an insider** — that is, who knows it is inside information and knows the source is an inside source.",
            "**Primary insiders** (s.57(2)): those with the information through being a **director, employee or shareholder** of an issuer, or through their **employment, office or profession**.",
            "**Secondary insiders**: those whose **direct or indirect source** is a primary insider — the tippee.",
            "**It applies to price-affected securities** traded on a regulated market, or where a professional intermediary is involved.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The tippee is caught, and so is the tipper",
          md: "A person who never worked for the company and simply received a tip is a **secondary insider** and commits the offence by dealing. And the person who told them commits the **disclosure** offence even if they never traded a share themselves. Scenarios routinely involve a director mentioning something to a friend at dinner — both are exposed, on different limbs.",
        },
        {
          kind: "list",
          style: "number",
          title: "The general defences",
          items: [
            "Under s.53, the person **did not expect** the dealing to result in a profit or the avoidance of a loss attributable to the price-sensitive nature of the information.",
            "They **believed on reasonable grounds** that the information had been **disclosed widely enough** that no participant would be prejudiced (s.53).",
            "They **would have done what they did** even if they had not had the information — for example completing a pre-existing obligation.",
            "Special defences exist for **market makers** acting in good faith in the course of business, and for **price stabilisation** and **market information** in defined circumstances.",
          ],
        },
      ],
      check: {
        q: "A director tells a friend, over dinner, that the company will announce a large contract next week. The friend buys shares; the director buys none. Who is exposed?",
        options: [
          "Only the friend, having dealt",
          "Only the director, having disclosed",
          "Both — the friend for dealing as a secondary insider, the director for disclosing otherwise than in the proper performance of their office",
          "Neither, as the information was given socially",
        ],
        correct: 2,
        explain:
          "BOTH. The friend is a SECONDARY INSIDER whose source was a primary insider, and deals while in possession of inside information. The director commits the DISCLOSURE offence, telling someone otherwise than in the proper performance of their office — and not dealing personally is no defence to that limb.",
      },
    },
    {
      id: "market-abuse",
      heading: "Market abuse",
      blocks: [
        {
          kind: "definition",
          term: "Market abuse",
          md: "A **regulatory** regime — generally imposing **civil** liability enforced by a market regulator — prohibiting behaviour that undermines the integrity of a market. It overlaps with insider dealing but is **wider**, and does **not** require the criminal standard of proof or proof of a criminal state of mind.",
        },
        {
          kind: "table",
          caption: "The principal forms of market abuse",
          head: ["Form", "What it involves"],
          rows: [
            ["**Insider dealing**", "Dealing, or attempting to deal, on inside information"],
            ["**Unlawful disclosure**", "Disclosing inside information outside the normal exercise of employment, profession or duties"],
            ["**Market manipulation**", "Transactions or orders giving **false or misleading signals** as to supply, demand or price, or securing the price at an abnormal or artificial level"],
            ["**Dissemination of false information**", "Giving out information likely to give a false or misleading impression, where the person knew or ought to have known it was false"],
            ["**Misleading behaviour and distortion** — s.118", "Behaviour likely to give a regular user a false or misleading impression, or to distort the market"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction that earns the mark",
          md: "**Insider dealing** is a **criminal** offence, requiring proof **beyond reasonable doubt** and a guilty state of mind, and carries fines and imprisonment. **Market abuse** is a **civil and regulatory** regime, proved to the **civil** standard, capable of catching conduct that was careless rather than deliberate, and enforced by financial penalties, public censure, restitution orders and prohibition from the industry. The **same conduct can be both**.",
        },
        {
          kind: "list",
          title: "The controls that sit alongside the offences",
          items: [
            "**Disclosure obligations** on issuers to announce inside information promptly, which removes the informational advantage rather than policing its use.",
            "**Insider lists** identifying who has access to inside information.",
            "**Closed periods** preventing directors and senior managers from dealing before results.",
            "**Notification of managers' transactions**, so the market sees insiders' dealings.",
            "**Internal controls** — restricted lists, information barriers, personal account dealing rules and pre-clearance.",
          ],
        },
        {
          kind: "example",
          title: "Applying both regimes to one set of facts",
          scenario:
            "Halversham plc is about to announce a failed clinical trial that will move its share price sharply. Its research director, Kell, sells her own shares two days before the announcement. Her colleague Prewitt, who knows of the failure, posts anonymously on an investor forum that \"the trial data looks outstanding\", hoping to hold the price up until he can sell. A third employee, Latham, who has heard only office rumours and has no access to the data, sells shares because he wants to buy a house.",
          steps: [
            { label: "Kell — inside information?", detail: "The trial failure is SPECIFIC, NOT PUBLIC, relates to the issuer, and would be likely to have a SIGNIFICANT EFFECT on price. All four elements are present." },
            { label: "Kell — the offence", detail: "She is a PRIMARY INSIDER (director, information through her office) and DEALT in price-affected securities. That is insider dealing, criminal, and also market abuse under the civil regime." },
            { label: "Kell — any defence?", detail: "She cannot say she did not expect to avoid a loss attributable to the information — avoiding that loss is plainly why she sold. Nor was the information public, nor was she under a pre-existing obligation." },
            { label: "Prewitt — which regime?", detail: "Posting a false statement to support the price is DISSEMINATION OF FALSE INFORMATION and MARKET MANIPULATION — squarely market abuse. He has not yet dealt, so the dealing offence may not be complete, but the abuse is." },
            { label: "Latham — test carefully", detail: "He had only RUMOURS and no access to the data, so he does not have information \"as an insider\" from an inside source. He is not an insider, and selling to buy a house is an ordinary personal decision — NO liability." },
            { label: "Note the issuer's own position", detail: "Halversham must announce the inside information PROMPTLY. Delay creates the very window in which Kell and Prewitt acted, and the issuer's disclosure obligation is part of the control framework." },
          ],
          result:
            "Kell liable under both regimes, Prewitt for market abuse, Latham not liable. The reasoning worth carrying: test the **four elements of inside information** first, then ask whether the person had it **as an insider** — a rumour without an inside source is not enough — and remember that **market abuse catches conduct the criminal offence may miss**, including manipulation by someone who has not yet traded.",
        },
      ],
      check: {
        q: "Which statement correctly distinguishes insider dealing from market abuse?",
        options: [
          "They are the same offence under different names",
          "Insider dealing is criminal and requires proof beyond reasonable doubt; market abuse is a civil and regulatory regime proved to the civil standard and wider in scope",
          "Market abuse is criminal and insider dealing is civil",
          "Market abuse applies only to directors",
        ],
        correct: 1,
        explain:
          "INSIDER DEALING is CRIMINAL, needing proof beyond reasonable doubt and a guilty mind. MARKET ABUSE is a CIVIL and regulatory regime, proved to the civil standard, wider in scope — covering manipulation and dissemination of false information — and applying to anyone, not just directors. The same conduct can amount to both.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring the tippee to have worked for the company.",
      fix: "A SECONDARY insider whose source was a primary insider commits the offence by dealing.",
    },
    {
      trap: "Saying the person who only tipped off a friend is not liable.",
      fix: "DISCLOSURE otherwise than in the proper performance of employment, office or profession is itself an offence.",
    },
    {
      trap: "Treating market abuse as criminal.",
      fix: "It is a civil and regulatory regime with financial penalties and censure. Insider dealing is the criminal offence.",
    },
    {
      trap: "Finding insider dealing where the person acted on rumour.",
      fix: "The person must have the information AS AN INSIDER, from an inside source. Market rumour is not enough.",
    },
    {
      trap: "Overlooking manipulation by someone who has not traded.",
      fix: "Disseminating false information and manipulating the price are market abuse whether or not the person has dealt.",
    },
    {
      trap: "Forgetting the issuer's own disclosure duty.",
      fix: "Prompt announcement of inside information is part of the control framework, and delay creates the window for abuse.",
    },
  ],
  keyTerms: [
    { term: "Inside information", def: "Specific or precise information, not public, relating to particular securities or an issuer, which if public would likely have a significant effect on price." },
    { term: "Primary insider", def: "s.57(2) — a person with inside information through being a director, employee or shareholder of an issuer, or through their employment, office or profession." },
    { term: "Secondary insider", def: "A person whose direct or indirect source of inside information is a primary insider — the tippee." },
    { term: "Insider dealing", def: "The criminal offence of dealing, encouraging another to deal, or disclosing inside information improperly." },
    { term: "Market abuse", def: "A civil and regulatory regime prohibiting insider dealing, unlawful disclosure, manipulation and dissemination of false information." },
    { term: "Market manipulation", def: "Transactions or orders giving false or misleading signals as to supply, demand or price, or securing an artificial price level." },
  ],
  summary: [
    "Inside information is specific, non-public, issuer-related and price-significant — all four elements are needed.",
    "The offence takes three forms: dealing, encouraging another to deal, and improper disclosure.",
    "Both primary insiders and tippees are caught, and the tipper is liable for disclosure even without dealing.",
    "Defences include no expectation of profit from the price-sensitive quality, reasonable belief in wide disclosure, and pre-existing obligations.",
    "Market abuse is a civil regulatory regime, wider than the criminal offence and proved to the civil standard.",
    "It covers manipulation and dissemination of false information as well as insider dealing.",
    "Prompt issuer disclosure, insider lists, closed periods and internal controls sit alongside the offences.",
  ],
  knowledgeDiagnostic: [
    { q: "State the four elements of inside information.", a: "Specific or precise; not made public; relating to particular securities or an issuer; and likely, if public, to have a significant effect on price." },
    { q: "Is a person who merely passes on inside information liable?", a: "Yes — disclosure otherwise than in the proper performance of employment, office or profession is itself an offence, even if they never deal." },
    { q: "How does market abuse differ from insider dealing?", a: "It is civil and regulatory rather than criminal, proved to the civil standard, and wider — covering manipulation and false information as well as insider dealing." },
    { q: "Is someone who deals on market rumour guilty of insider dealing?", a: "Not without having the information as an insider from an inside source. Rumour alone is insufficient." },
    { q: "Name three preventive controls.", a: "Prompt issuer disclosure of inside information, insider lists, and closed periods before results. Notification of managers' dealings and internal pre-clearance are others." },
  ],
  furtherStudy: [
    "Chapter 32 covers money laundering, the other main regulatory offence in this area.",
    "Chapter 26 covers the directors' duties an insider also breaches.",
  ],
}

/* ── Chapter 32 · H1(c) ────────────────────────────────────────── */

export const LWG_TREE_32: StudyChapter = {
  id: "LWG-32",
  number: 32,
  paper: "LW",
  area: "H",
  title: "Money laundering",
  minutes: 15,
  syllabusRefs: ["H1(c)"],
  intro:
    "Money laundering is the process of making criminal proceeds look legitimate, and the law tackles it by conscripting the businesses that handle money into policing it.",
  outcomes: [
    "Recognise the nature of, and legal control over, money laundering",
    "Explain the three stages of laundering and the principal offences",
    "Explain the required policies, procedures and controls, including risk management and internal controls",
    "Explain customer due diligence, reliance and record keeping",
    "Explain the monitoring, management and internal communication of compliance",
  ],
  sections: [
    {
      id: "the-offences",
      heading: "The process, and the offences",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The three stages",
            caption: "Detection is easiest at placement and hardest at integration.",
            data: {
              steps: [
                { label: "Placement", sub: "Criminal cash enters the financial system" },
                { label: "Layering", sub: "Transfers and transactions obscure its origin" },
                { label: "Integration", sub: "It re-emerges as apparently legitimate wealth" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The principal offences",
          head: ["Offence", "What it covers"],
          rows: [
            ["**Concealing**", "Concealing, disguising, converting, transferring or removing criminal property"],
            ["**Arranging**", "Entering into or becoming concerned in an arrangement known or suspected to facilitate the acquisition, retention, use or control of criminal property by or on behalf of another"],
            ["**Acquisition, use or possession**", "Acquiring, using or possessing criminal property"],
            ["**Failure to disclose**", "Failing to make a required disclosure where a person in the **regulated sector** knows or suspects, or has reasonable grounds to know or suspect, money laundering"],
            ["**Tipping off**", "Disclosing that a report has been made, or that an investigation is contemplated, where that is likely to prejudice the investigation"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two offences that catch the honest professional",
          md: "**Failure to disclose** is committed by not reporting a suspicion — so an accountant who says nothing to avoid embarrassing a client commits an offence, and the objective \"reasonable grounds to suspect\" test means that failing to notice is no answer. **Tipping off** is committed by warning the client that a report has been made. Together they put the professional in a position where the only safe course is to **report internally and say nothing to the client**.",
        },
        {
          kind: "list",
          title: "Points that decide questions",
          items: [
            "**Criminal property** includes property representing the benefit of **any** criminal conduct, however small — there is no de minimis threshold in the substantive offences.",
            "**A protected or authorised disclosure** provides a defence to the principal offences where it is made in the required manner.",
            "**Legal professional privilege and similar exemptions** may apply narrowly to information received in privileged circumstances — but never where the adviser is being used to further a criminal purpose.",
            "**The offences apply to individuals**, so an employee cannot shelter behind the firm.",
          ],
        },
      ],
      check: {
        q: "An accountant suspects a client's funds derive from tax evasion, says nothing to the authorities to avoid damaging the relationship, and warns the client to expect questions. What offences arise?",
        options: [
          "None, as the accountant did not handle the money",
          "Failure to disclose, and tipping off",
          "Only tipping off",
          "Concealing, because they kept quiet",
        ],
        correct: 1,
        explain:
          "FAILURE TO DISCLOSE — a person in the regulated sector who knows, suspects, or has reasonable grounds to suspect must report — and TIPPING OFF, by warning the client in a way likely to prejudice an investigation. Not handling the money is no defence to either.",
      },
    },
    {
      id: "the-controls",
      heading: "The required policies, procedures and controls",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "What a regulated business must have in place",
          items: [
            "**Risk management practices.** A documented, risk-based assessment of where the business is exposed — by customer, product, delivery channel, jurisdiction and transaction type — used to direct effort where the risk is greatest.",
            "**Internal controls.** A nominated officer to receive internal reports, screening of employees, an independent audit of the systems, and controls proportionate to the assessed risk.",
            "**Customer due diligence.** Identifying and verifying the customer and any beneficial owner, and understanding the purpose and intended nature of the relationship.",
            "**Reliance and record keeping.** Reliance on a third party's due diligence in defined circumstances — while **retaining responsibility** — and retention of records for the prescribed period.",
            "**Monitoring, management and internal communication of compliance.** Ongoing monitoring of the relationship and of transactions, management review of the arrangements, and **training and communication** so that staff know their obligations.",
          ],
        },
        {
          kind: "table",
          caption: "Customer due diligence, scaled to risk",
          head: ["Level", "When", "What it involves"],
          rows: [
            ["**Simplified**", "Where the assessed risk is **low** and the jurisdiction permits it", "Reduced verification, but never none — and monitoring continues"],
            ["**Standard**", "The default", "Identify and verify the customer and any beneficial owner; understand the purpose of the relationship"],
            ["**Enhanced**", "**Higher-risk** situations — a politically exposed person, a high-risk jurisdiction, unusually complex or opaque structures, non-face-to-face onboarding", "Additional information and verification, senior approval, and closer ongoing monitoring, including the **source of funds and wealth**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Beneficial ownership is the heart of due diligence",
          md: "Identifying the person in front of you is straightforward; identifying **who ultimately owns or controls** the customer is the point. That is why chains of companies are a laundering red flag, and why the **register of people with significant control** from chapter 20 belongs to the same policy. When a scenario gives a layered offshore structure with no apparent commercial rationale, the expected answer is **enhanced due diligence** and consideration of a report.",
        },
        {
          kind: "list",
          title: "Reliance and record keeping",
          items: [
            "**Reliance** on another regulated person's due diligence is permitted in defined circumstances, but the relying business **remains responsible** for compliance — so it must be able to obtain the underlying information on request.",
            "**Records** of due diligence and of transactions must be kept for the **prescribed period** after the relationship ends, so that a later investigation can reconstruct what was known and when.",
            "**Ongoing monitoring** means keeping the due diligence up to date and scrutinising transactions for consistency with what is known of the customer — not a one-off check at onboarding.",
          ],
        },
        {
          kind: "example",
          title: "Applying the controls",
          scenario:
            "Corvale Accountants is approached by a new client, Meridian Holdings, which is owned through three intermediate companies in different jurisdictions, one of them a high-risk jurisdiction. The person presenting themselves is a director of the top company and declines to identify the ultimate owners, saying it is \"commercially sensitive\". The proposed work is straightforward bookkeeping, and the fee offered is three times Corvale's normal rate, payable in advance. A junior member of staff wants to accept and start work.",
          steps: [
            { label: "Classify the risk", detail: "A layered ownership structure across jurisdictions, one high-risk, with an unexplained rationale. That is a HIGH-RISK situation calling for ENHANCED due diligence, not the standard level." },
            { label: "Deal with the refusal to identify beneficial owners", detail: "Identifying the BENEFICIAL OWNER is a core requirement. A refusal means due diligence CANNOT BE COMPLETED, so the relationship must not be entered into and the work must not begin." },
            { label: "Assess the fee", detail: "A fee at three times the normal rate, paid in advance, for routine work is a classic RED FLAG — payment for the appearance of legitimacy rather than for the service. It reinforces the suspicion rather than justifying the engagement." },
            { label: "Identify the reporting obligation", detail: "On these facts there are REASONABLE GROUNDS TO SUSPECT money laundering. The staff member must report internally to the nominated officer, who considers an external disclosure." },
            { label: "Deal with what must NOT be said", detail: "Nobody may tell Meridian that a report has been made or is contemplated — that would be TIPPING OFF. Declining the engagement must be handled without disclosing the reason." },
            { label: "Note the systemic failings to fix", detail: "A junior wanting to accept the work signals inadequate TRAINING and INTERNAL COMMUNICATION, and the absence of an escalation step. Both are part of the required controls, not optional good practice." },
          ],
          result:
            "Decline the engagement, report internally, and say nothing to the client. The three reasons the answer is clear: **beneficial ownership could not be established**, the **fee and structure are red flags**, and there is no discretion to proceed on the basis that the work itself is innocuous. Note also that the staff member's instinct to accept is itself a **control failure** to be addressed.",
        },
      ],
      check: {
        q: "A prospective client refuses to identify its ultimate beneficial owners. What should the business do?",
        options: [
          "Proceed, since the work requested is routine",
          "Not enter the relationship, because due diligence cannot be completed, and consider an internal report",
          "Proceed but keep extra records",
          "Ask the client to sign a declaration instead",
        ],
        correct: 1,
        explain:
          "DO NOT PROCEED. Identifying the beneficial owner is a core due diligence requirement; if it cannot be completed the relationship must not be entered into. The refusal is itself grounds for suspicion, so an internal report should be considered — and the client must not be told about it.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring the professional to have handled the money.",
      fix: "FAILURE TO DISCLOSE is committed by not reporting a suspicion, whether or not the person touched the funds.",
    },
    {
      trap: "Warning the client that a report has been made.",
      fix: "That is TIPPING OFF. Report internally and say nothing to the client.",
    },
    {
      trap: "Applying a de minimis threshold to criminal property.",
      fix: "There is none in the substantive offences — property representing the benefit of any criminal conduct is caught.",
    },
    {
      trap: "Treating due diligence as a one-off exercise at onboarding.",
      fix: "ONGOING MONITORING is required, keeping information current and scrutinising transactions for consistency.",
    },
    {
      trap: "Assuming reliance on another firm's due diligence transfers responsibility.",
      fix: "The relying business REMAINS RESPONSIBLE and must be able to obtain the underlying information.",
    },
    {
      trap: "Accepting a client whose beneficial owners cannot be identified.",
      fix: "Due diligence cannot be completed, so the relationship must not be entered into.",
    },
  ],
  keyTerms: [
    { term: "Money laundering", def: "The process of making the proceeds of crime appear legitimate, through placement, layering and integration." },
    { term: "Criminal property", def: "Property constituting or representing the benefit of any criminal conduct, with no de minimis threshold." },
    { term: "Failure to disclose", def: "The offence of not reporting where a person in the regulated sector knows, suspects, or has reasonable grounds to suspect money laundering." },
    { term: "Tipping off", def: "The offence of disclosing that a report has been made or an investigation is contemplated, where that is likely to prejudice it." },
    { term: "Customer due diligence", def: "Identifying and verifying the customer and any beneficial owner and understanding the purpose of the relationship, scaled to risk." },
    { term: "Enhanced due diligence", def: "Additional verification, senior approval and closer monitoring, including source of funds and wealth, required in higher-risk situations." },
    { term: "Nominated officer", def: "The person appointed to receive internal money laundering reports and decide on external disclosure." },
  ],
  summary: [
    "Laundering proceeds in three stages: placement, layering and integration.",
    "The offences are concealing, arranging, acquisition use or possession, failure to disclose, and tipping off.",
    "Failure to disclose uses an objective test, so not noticing is no defence for someone in the regulated sector.",
    "A regulated business needs risk management, internal controls, due diligence, record keeping and monitoring with training.",
    "Due diligence is scaled — simplified, standard or enhanced — and identifying the beneficial owner is its core.",
    "Reliance on another's due diligence does not transfer responsibility.",
    "Where due diligence cannot be completed the relationship must not be entered into, and the client must not be tipped off.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the three stages of money laundering.", a: "Placement, layering and integration." },
    { q: "What makes failure to disclose so wide?", a: "It applies where a person in the regulated sector knows, suspects, OR HAS REASONABLE GROUNDS to know or suspect — an objective test, so failing to notice is no defence." },
    { q: "What are the five required elements of a regulated business's controls?", a: "Risk management practices, internal controls, customer due diligence, reliance and record keeping, and monitoring, management and internal communication of compliance." },
    { q: "When is enhanced due diligence required?", a: "In higher-risk situations — a politically exposed person, a high-risk jurisdiction, complex or opaque structures, or non-face-to-face onboarding." },
    { q: "What must a business do if it cannot identify a customer's beneficial owner?", a: "Not enter the relationship, and consider an internal report — without telling the customer, which would be tipping off." },
  ],
  furtherStudy: [
    "Chapter 20's register of people with significant control serves the same transparency purpose.",
    "Chapter 33 covers bribery and the other corporate offences in this area.",
  ],
}

/* ── Chapter 33 · H1(d), H1(e), H1(f) ──────────────────────────── */

export const LWG_TREE_33: StudyChapter = {
  id: "LWG-33",
  number: 33,
  paper: "LW",
  area: "H",
  title: "Bribery, fraudulent and wrongful trading",
  minutes: 16,
  syllabusRefs: ["H1(d)", "H1(e)", "H1(f)"],
  intro:
    "The offences that attach to running a company badly or dishonestly — and the one place where the corporate veil is lifted by statute rather than by the court's discretion.",
  outcomes: [
    "Recognise the nature of, and legal control over, bribery",
    "Discuss the crimes that can arise while a company is run, managed and wound up",
    "Recognise the nature of, and legal control over, fraudulent and wrongful trading",
    "Explain the corporate offence of failing to stop tax evasion being facilitated, and who counts as a relevant body",
    "Distinguish fraudulent from wrongful trading and identify the consequences of each",
  ],
  sections: [
    {
      id: "bribery",
      heading: "Bribery, and the corporate offences",
      blocks: [
        {
          kind: "table",
          caption: "The bribery offences",
          head: ["Offence", "What it covers"],
          rows: [
            ["**Active bribery**", "Offering, promising or giving a financial or other advantage to induce improper performance of a relevant function or activity, or to reward it"],
            ["**Passive bribery**", "Requesting, agreeing to receive or accepting such an advantage"],
            ["**Bribery of a foreign public official**", "Offering an advantage to influence an official in their capacity, intending to obtain or retain business or an advantage in business"],
            ["**Failure of a commercial organisation to prevent bribery**", "A **corporate** offence where a person associated with the organisation bribes intending to obtain or retain business for it — with a defence of having **adequate procedures** in place"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The corporate offence, and the only defence",
          md: "The failure-to-prevent offence does **not** require the board to have known. It is committed where an **associated person** — an employee, agent, subsidiary or anyone performing services for the organisation — bribes to win business for it. The single defence is that the organisation had **adequate procedures** designed to prevent it: risk assessment, top-level commitment, due diligence on associated persons, proportionate policies, training, and monitoring and review. So the answer to \"what should the company have done?\" is always the procedures.",
        },
        {
          kind: "definition",
          term: "Failure to prevent the facilitation of tax evasion",
          md: "A **corporate** offence committed where a person **associated** with a **relevant body** criminally facilitates another person's tax evasion while acting in that capacity. A **relevant body** is a **body corporate or a partnership** — not an individual. As with bribery, the defence is having had **reasonable prevention procedures** in place, and the board's ignorance is not itself an answer.",
        },
        {
          kind: "list",
          title: "Other crimes arising while a company is run, managed and wound up",
          items: [
            "**Fraudulent trading**, and **wrongful trading** — below.",
            "**Falsification, destruction or concealment of company records**, and making false statements to an auditor or a liquidator.",
            "**Transactions defrauding creditors**, and giving a **preference** to one creditor — attackable by a liquidator or administrator.",
            "**Acting while disqualified**, or while an undischarged bankrupt.",
            "**Failure to co-operate** with a liquidator or administrator, or to deliver up property and records.",
            "**Misapplication of company property** by directors, which is both a breach of duty and potentially theft or fraud.",
          ],
        },
      ],
      check: {
        q: "An agent of a company pays a bribe to win a contract for it. The board knew nothing. Is the company liable?",
        options: [
          "No, because the board did not know",
          "Yes, under the failure-to-prevent offence, unless it had adequate procedures in place",
          "Only if the agent was an employee",
          "Only if the contract was actually won",
        ],
        correct: 1,
        explain:
          "YES, subject to the ADEQUATE PROCEDURES defence. The corporate failure-to-prevent offence does not require board knowledge, and an ASSOCIATED PERSON includes agents and subsidiaries, not only employees. Whether the contract was won is irrelevant — the intention to obtain business is enough.",
      },
    },
    {
      id: "fraudulent-and-wrongful",
      heading: "Fraudulent and wrongful trading",
      blocks: [
        {
          kind: "table",
          caption: "The distinction that carries the marks",
          head: ["", "Fraudulent trading", "Wrongful trading"],
          rows: [
            ["**Test**", "s.213 — carrying on business with **intent to defraud** creditors, or for any fraudulent purpose; **dishonesty** required", "Continuing to trade when the director **knew or ought to have concluded** there was **no reasonable prospect** of avoiding insolvent liquidation — **no dishonesty required**"],
            ["**Standard of proof**", "High, because dishonesty must be proved", "**Civil** standard, on the balance of probabilities"],
            ["**Who is liable**", "Any person **knowingly party** to the carrying on of the business", "**Directors**, including de facto and shadow directors"],
            ["**Nature of liability**", "**Civil** contribution and a **criminal** offence", "**Civil** contribution only"],
            ["**Consequence**", "Contribution to the assets, fines and imprisonment, disqualification", "Contribution to the assets, and disqualification"],
            ["**Defence**", "Honesty — absence of intent to defraud", "Taking **every step** to minimise the potential loss to creditors once the conclusion was or should have been reached"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Wrongful trading is the one that actually bites",
          md: "Fraudulent trading requires **dishonesty**, which is hard to prove, so it is rarely used. Wrongful trading requires only that a director **ought to have concluded** insolvent liquidation was unavoidable — an **objective** test judged with the benefit of the general knowledge and skill expected of someone in that role, plus the director's own. That is why the practical advice to a director of a struggling company is always the same: **take advice, minimise creditor loss, and document the reasoning**.",
        },
        {
          kind: "list",
          style: "number",
          title: "What \"every step to minimise loss\" looks like",
          items: [
            "**Taking professional advice** promptly, and acting on it.",
            "**Ceasing to incur new credit** that cannot realistically be paid.",
            "**Convening board meetings** and recording the information considered and the reasons for decisions.",
            "**Monitoring the position continuously** — up-to-date figures, cash flow forecasts, not last quarter's accounts.",
            "**Considering administration** or another formal process at the right time rather than trading on in hope.",
            "**Not preferring** connected creditors or the directors' own loans.",
          ],
        },
        {
          kind: "example",
          title: "Working a wrongful trading problem",
          scenario:
            "Harbrook Ltd's management accounts for March show it is balance-sheet insolvent and cannot meet its liabilities. Its three directors are Vance (a chartered accountant and the finance director), Doyle (managing director) and Reese (a non-executive who attends board meetings and receives the accounts). The board decides to \"trade through it\". Between April and September the company takes $480,000 of new supplies on credit and repays a $90,000 loan Doyle had made to the company. In October it enters insolvent liquidation with $610,000 of unsecured debt. Vance had circulated a note in April warning that continued trading was not viable; Doyle overruled it; Reese said nothing.",
          steps: [
            { label: "Identify the point of knowledge", detail: "By March the management accounts showed insolvency, and Vance's April note names the conclusion. From April the directors knew, or plainly ought to have concluded, that there was NO REASONABLE PROSPECT of avoiding insolvent liquidation." },
            { label: "Apply the test to Doyle", detail: "He OVERRULED the warning and continued to incur credit for six months. He is liable to contribute, and the measure is the increase in the deficiency caused by continuing — the $480,000 of new supplies is the starting point." },
            { label: "Apply the test to Vance", detail: "Identifying the problem is not enough. He remained a director while the company incurred the credit, and the standard is RAISED by his own qualification as an accountant. Unless he took EVERY STEP to minimise loss — pressing the point, refusing to approve new credit, resigning, or seeking administration — he too is exposed." },
            { label: "Apply the test to Reese", detail: "A NON-EXECUTIVE is still a director. Receiving the accounts and saying nothing is not a defence; the objective limb asks what a director in that role ought to have concluded. Passivity does not discharge the duty." },
            { label: "Deal with the repayment to Doyle", detail: "Repaying Doyle's own loan while trade creditors went unpaid is a PREFERENCE to a connected person, separately attackable by the liquidator — and it is powerful evidence against the directors on the wrongful trading claim." },
            { label: "Consider fraudulent trading", detail: "Only if DISHONESTY can be proved. On these facts the directors appear to have been over-optimistic rather than dishonest, so wrongful trading is the realistic claim — with disqualification proceedings alongside." },
          ],
          result:
            "All three directors are exposed, the repayment to Doyle is attackable as a preference, and disqualification is likely. Three points to carry away: the **objective** test catches the honest optimist, a **non-executive is a director** for this purpose, and the professionally qualified director is held to a **higher** standard — so Vance's warning, without action, may protect him least of all.",
        },
      ],
      check: {
        q: "Directors continue trading in the honest but mistaken belief the company will recover, incurring further credit. It enters insolvent liquidation. Which claim is realistic?",
        options: [
          "Fraudulent trading, because creditors lost money",
          "Wrongful trading, because it requires no dishonesty — only that they knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation",
          "Neither, as they were honest",
          "Both, automatically",
        ],
        correct: 1,
        explain:
          "WRONGFUL TRADING. It needs no dishonesty and applies an OBJECTIVE test — what the director knew or OUGHT to have concluded. Fraudulent trading requires intent to defraud, which honest optimism negates, so honesty is a defence to that claim but not to wrongful trading.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring board knowledge for the corporate failure-to-prevent offences.",
      fix: "Neither bribery nor tax-evasion facilitation requires it. The defence is having had adequate or reasonable PROCEDURES.",
    },
    {
      trap: "Limiting \"associated person\" to employees.",
      fix: "It covers anyone performing services for the organisation — agents, subsidiaries, intermediaries.",
    },
    {
      trap: "Treating honesty as a defence to wrongful trading.",
      fix: "It is not. The test is objective; honesty defeats FRAUDULENT trading only.",
    },
    {
      trap: "Excusing a non-executive director from wrongful trading.",
      fix: "A non-executive is a director, and so are de facto and shadow directors. Passivity is not a defence.",
    },
    {
      trap: "Applying the same standard to every director.",
      fix: "The standard is raised by the director's own knowledge, skill and experience — a qualified accountant is held to more.",
    },
    {
      trap: "Overlooking a repayment to a director as a separate wrong.",
      fix: "It may be an attackable PREFERENCE, and it is strong evidence on the wrongful trading claim.",
    },
    {
      trap: "Saying a relevant body includes an individual.",
      fix: "It means a body corporate or a partnership.",
    },
  ],
  keyTerms: [
    { term: "Active bribery", def: "Offering, promising or giving an advantage to induce or reward improper performance of a relevant function." },
    { term: "Failure to prevent bribery", def: "The corporate offence where an associated person bribes to obtain business for the organisation, with a defence of adequate procedures." },
    { term: "Associated person", def: "Anyone performing services for an organisation — employee, agent, subsidiary or intermediary." },
    { term: "Relevant body", def: "A body corporate or a partnership, for the purposes of the failure to prevent the facilitation of tax evasion." },
    { term: "Fraudulent trading", def: "s.213 — carrying on business with intent to defraud creditors or for a fraudulent purpose; requires dishonesty and is both civil and criminal." },
    { term: "Wrongful trading", def: "Continuing to trade when a director knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation; civil only, no dishonesty required." },
    { term: "Preference", def: "A transaction putting one creditor in a better position than others before insolvency, attackable by a liquidator or administrator." },
  ],
  summary: [
    "Bribery covers giving, receiving and bribing a foreign public official, plus a corporate failure-to-prevent offence.",
    "The corporate offences require no board knowledge; the defence is adequate or reasonable prevention procedures.",
    "An associated person includes agents and subsidiaries, and a relevant body means a body corporate or partnership.",
    "Fraudulent trading requires dishonesty and is both a civil liability and a criminal offence.",
    "Wrongful trading requires no dishonesty and applies an objective test to directors, including de facto, shadow and non-executive directors.",
    "The wrongful trading defence is taking every step to minimise potential loss to creditors.",
    "Repaying a director's own loan while trade creditors go unpaid may be an attackable preference and evidence of wrongdoing.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the defence to the corporate failure-to-prevent offences?", a: "Having had adequate — or, for tax evasion facilitation, reasonable — prevention procedures in place. Board ignorance is not a defence." },
    { q: "Distinguish fraudulent from wrongful trading.", a: "Fraudulent trading requires dishonest intent to defraud and is criminal as well as civil. Wrongful trading requires no dishonesty, applies an objective test, and is civil only." },
    { q: "Who can be liable for wrongful trading?", a: "Directors, including de facto, shadow and non-executive directors. Passivity is no defence." },
    { q: "What is the wrongful trading defence?", a: "Taking every step the director ought to have taken to minimise the potential loss to creditors, once the conclusion was or should have been reached." },
    { q: "What is a relevant body?", a: "A body corporate or a partnership — not an individual." },
  ],
  furtherStudy: [
    "Chapter 29 covers the liquidation in which these claims are brought.",
    "Chapter 25 covers the disqualification that usually follows.",
    "Chapter 26 covers the duties a director in this position has already breached.",
  ],
}

/** Chapters 27–33 — the rest of Areas F, G and H, in reading order. */
export const LWG_TREE_AREA_F_PART2: StudyChapter[] = [LWG_TREE_27, LWG_TREE_28]
export const LWG_TREE_AREA_G: StudyChapter[] = [LWG_TREE_29, LWG_TREE_30]
export const LWG_TREE_AREA_H: StudyChapter[] = [LWG_TREE_31, LWG_TREE_32, LWG_TREE_33]
