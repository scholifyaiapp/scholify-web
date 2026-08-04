import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area F, first part — directors.
 * Chapters 37–38 of the LW-ENG reading tree, mapped to syllabus group F1.
 *
 * Forked from the Global tree and specialised to the Companies Act 2006. The general
 * duties are the clearest gain from forking: CA 2006 CODIFIED them in ss.171–177, so an
 * ENG learner is examined on seven named duties with a section each, where the Global
 * chapter can only describe them generically. Disqualification likewise runs on the
 * CDDA 1986 with real periods.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 37 · F1(a), F1(b) ─────────────────────────────────── */

export const LWE_TREE_37: StudyChapter = {
  id: "LWE-37",
  number: 37,
  paper: "LW",
  area: "F",
  title: "Directors: types, appointment, loss of office and disqualification",
  minutes: 17,
  syllabusRefs: ["F1(a)", "F1(b)"],
  intro:
    "A director is anyone occupying the position, whatever they are called — which is why a person who never signed anything can still be liable for everything.",
  outcomes: [
    "Distinguish executive, non-executive, de jure, de facto and shadow directors",
    "Explain how directors are appointed and the rules on their service contracts",
    "Explain the ways a director leaves office, including removal by ordinary resolution",
    "Explain disqualification under the CDDA 1986, its grounds and periods",
    "Advise on the consequences of acting while disqualified",
  ],
  sections: [
    {
      id: "types-appointment",
      heading: "Who counts as a director, and how they get there",
      blocks: [
        {
          kind: "definition",
          term: "Director",
          md: "**Section 250** defines a director to include **any person occupying the position of director, by whatever name called**. So the label is irrelevant: what matters is the **function performed**. That definition is what pulls de facto and shadow directors into the same duties and the same liabilities as properly appointed ones.",
        },
        {
          kind: "table",
          caption: "The types the syllabus names",
          head: ["Type", "What it is"],
          rows: [
            ["**Executive**", "A director with a **management role** in the company, usually under a service contract — a finance director, for instance"],
            ["**Non-executive**", "A director with **no management role**, bringing independent judgement and oversight. Owes the **same duties**, judged against what is reasonably expected of that role"],
            ["**Managing director / chief executive**", "An executive director to whom the board has **delegated** wide powers, and who accordingly has broad **usual authority** to bind the company (chapter 28)"],
            ["**De jure**", "**Properly appointed** and registered"],
            ["**De facto**", "**Acts as a director** without valid appointment — and owes the **full duties** because of what they do"],
            ["**Shadow director**", "A person **whose directions or instructions the board is accustomed to follow**. Professional advice given in a professional capacity is excluded"],
            ["**Alternate**", "A person appointed by a director to attend and vote in their place, where the articles permit"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "De facto and shadow directors are the examinable ones",
          md: "The point of these categories is that **liability follows function, not title**. A dominant shareholder who does not join the board but tells the directors what to do is a **shadow director**, and is exposed to the general duties, to **wrongful trading** (chapter 46) and to **disqualification** — precisely because a person should not escape a director's obligations by declining the appointment. A scenario describing someone \"not on the board but really running the company\" is asking for this.",
        },
        {
          kind: "list",
          title: "Appointment, and service contracts",
          items: [
            "The **first directors** are named in the statement of proposed officers on registration (chapter 33).",
            "Later appointments are made as the **articles** provide — typically by the board or by ordinary resolution of the members.",
            "A **public company** must appoint directors by **separate resolution** for each, unless the meeting agrees otherwise without objection.",
            "Appointments must be **notified to the registrar** and entered in the **register of directors**.",
            "A director must be at least **16**, and under **s.155** a company must have at least one director who is a **natural person**.",
            "A service contract for a **guaranteed term of more than two years** requires **approval by ordinary resolution** of the members; without it the term is void and the contract terminable on reasonable notice.",
            "Members may **inspect** directors' service contracts.",
          ],
        },
      ],
      check: {
        q: "A major shareholder never joins the board, but the directors are accustomed to acting on his instructions. What is his position?",
        options: [
          "He has no liability, since he is not a director",
          "He is a shadow director, and exposed to the general duties, wrongful trading and disqualification",
          "He is liable only if he is also an employee",
          "He becomes a de jure director automatically",
        ],
        correct: 1,
        explain:
          "He is a SHADOW DIRECTOR — a person whose directions or instructions the board is accustomed to follow. Liability follows FUNCTION, not title, so he is exposed to the general duties, to wrongful trading and to disqualification. Declining the formal appointment is no escape.",
      },
    },
    {
      id: "leaving-disqualification",
      heading: "Leaving office, and disqualification",
      blocks: [
        {
          kind: "table",
          caption: "How a director leaves office",
          head: ["Route", "What it involves"],
          rows: [
            ["**Removal by the members** — s.168", "By **ordinary resolution**, at any time, **notwithstanding anything in the articles or in any agreement**. **Special notice** of 28 days must be given to the company, and the director is entitled to be heard and to have written representations circulated"],
            ["**Resignation**", "As the articles provide"],
            ["**Retirement by rotation**", "Where the articles require it"],
            ["**Vacation of office** under the articles", "On bankruptcy, prolonged absence, ill health, or a court order"],
            ["**Disqualification**", "Under the CDDA 1986 — below"],
            ["**Dissolution** of the company", "Office ends with the company"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Section 168 cannot be excluded — but it can be made expensive",
          md: "The members' power to remove a director by **ordinary resolution** overrides the articles and any agreement, so a provision purporting to make a director irremovable is ineffective. Two qualifications matter. **Special notice** of 28 days is required, and skipping it invalidates the resolution. And removal from **office** does not end the director's **service contract**, so a removed executive may still sue for **wrongful dismissal** (chapter 25) — which is why long service contracts and weighted voting rights are used to make removal costly rather than impossible.",
        },
        {
          kind: "definition",
          term: "Disqualification (CDDA 1986)",
          md: "A court may make an order disqualifying a person from being a **director**, or from otherwise being **concerned or taking part in the promotion, formation or management of a company**, without the court's permission. The maximum period is **15 years**, and for the most serious cases — such as conviction of an indictable offence connected with company management or fraudulent trading — that is the ceiling.",
        },
        {
          kind: "table",
          caption: "The grounds and the periods",
          head: ["Ground", "Maximum period"],
          rows: [
            ["**Conviction of an indictable offence** connected with the promotion, formation, management or liquidation of a company", "**15 years**"],
            ["**Persistent breach** of companies legislation on filings and returns", "**5 years**"],
            ["**Fraudulent trading**, whether or not the company is being wound up", "**15 years**"],
            ["Being found, under **s.6**, **\"unfit to be concerned in the management of a company\"** — the commonest ground, following the company's insolvency", "**Minimum 2 years, maximum 15**"],
            ["**Wrongful trading** — the court may disqualify as well as order a contribution", "**15 years**"],
            ["**Breach of competition law**", "**15 years**"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Acting while disqualified is a criminal offence AND personal liability",
          md: "Two consequences, and answers routinely give only the first. A person who acts as a director or takes part in management while **disqualified** commits a **criminal offence**, punishable by fine or imprisonment. They also become **personally liable, jointly and severally with the company, for the debts incurred while they were so acting** — which is one of the **statutory** veil-lifting grounds (chapter 31). Anyone who acts on that person's instructions knowing of the disqualification can be liable too.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Section 6 is the ground to expect",
          md: "The overwhelming majority of disqualifications follow an **insolvency** and are made under **s.6** on the footing that the director's conduct makes them **unfit**. Note two features: it carries a **minimum** period of two years, unlike the other grounds, and the conduct examined includes trading while insolvent, failing to keep proper accounting records, failing to file, taking excessive remuneration, and paying some creditors in preference to others. A scenario ending in insolvent liquidation is pointing at s.6.",
        },
        {
          kind: "example",
          title: "Advising on removal and exposure",
          scenario:
            "Nashwood Ltd's members are unhappy with Vance, a director with a five-year service contract entered into two years ago without any members' resolution. They call a general meeting for next week and propose an ordinary resolution removing him; the articles state that Vance may be removed only by special resolution and only with his consent. Meanwhile Nashwood's other director, Ridsdale, was disqualified for six years eighteen months ago but has continued to run the business, instructing Vance throughout; Nashwood has since incurred £400,000 of new debt and is now insolvent. Vance knew of the disqualification.",
          steps: [
            { label: "Test the articles' restriction on removal", detail: "INEFFECTIVE. Section 168 allows removal by ORDINARY resolution NOTWITHSTANDING anything in the articles or any agreement, so neither the special-resolution requirement nor the consent requirement can stand." },
            { label: "Test the notice given", detail: "This is the members' problem. SPECIAL NOTICE of 28 DAYS must be given to the company, and the meeting is next week. The resolution would be INVALID for want of special notice — they must wait." },
            { label: "Advise on Vance's service contract", detail: "A guaranteed term of MORE THAN TWO YEARS needed approval by ORDINARY RESOLUTION of the members. None was obtained, so the term is VOID and the contract is terminable on REASONABLE NOTICE — which sharply reduces what Vance can claim." },
            { label: "Separate removal from the contract", detail: "Removal from OFFICE does not terminate the service CONTRACT. Vance could ordinarily sue for wrongful dismissal for the unexpired term — but because the five-year term is void, his claim is limited to reasonable notice." },
            { label: "Advise on Ridsdale", detail: "Acting as a director while DISQUALIFIED is a CRIMINAL OFFENCE, and he is PERSONALLY LIABLE, jointly and severally with the company, for the £400,000 of debts incurred while he was so acting. This is statutory veil-lifting." },
            { label: "Advise on Vance's own exposure", detail: "Vance KNEW of the disqualification and acted on Ridsdale's instructions, so he too may be personally liable for those debts. He is separately exposed to a s.6 UNFITNESS disqualification given the insolvency, with a MINIMUM two-year period." },
          ],
          result:
            "The articles cannot protect Vance, but the members have **got the notice wrong** and must wait 28 days. His compensation is small because the **five-year term is void** for want of members' approval. And both Ridsdale and Vance face **personal liability for the £400,000** — Ridsdale for acting while disqualified, Vance for knowingly acting on his instructions.",
        },
      ],
      check: {
        q: "A disqualified person continues to manage a company, which incurs further debts. What is the position?",
        options: [
          "Only the company is liable for the debts",
          "It is a criminal offence, and the person is personally liable jointly and severally for the debts incurred while so acting",
          "The disqualification lapses once they resume management",
          "They are liable only if the company becomes insolvent",
        ],
        correct: 1,
        explain:
          "Both a CRIMINAL OFFENCE and PERSONAL LIABILITY, jointly and severally with the company, for the debts incurred while acting — one of the statutory veil-lifting grounds. Anyone who knowingly acts on the disqualified person's instructions can be liable too, and insolvency is not a precondition.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating an article making a director irremovable as effective.",
      fix: "Section 168 permits removal by ordinary resolution notwithstanding the articles or any agreement.",
    },
    {
      trap: "Removing a director without special notice.",
      fix: "28 days' special notice to the company is required, and the director may be heard and circulate representations.",
    },
    {
      trap: "Assuming removal from office ends the service contract.",
      fix: "It does not — the director may claim wrongful dismissal for the unexpired term unless the term was void for want of approval.",
    },
    {
      trap: "Letting someone escape directors' duties by not being appointed.",
      fix: "De facto and shadow directors owe the same duties, because liability follows function not title.",
    },
    {
      trap: "Giving only the criminal consequence of acting while disqualified.",
      fix: "There is also personal liability for the debts incurred while so acting.",
    },
  ],
  keyTerms: [
    { term: "Director", def: "s.250 — any person occupying the position of director, by whatever name called." },
    { term: "De facto director", def: "A person who acts as a director without valid appointment, owing the full duties." },
    { term: "Shadow director", def: "A person whose directions or instructions the board is accustomed to follow, excluding professional advisers." },
    { term: "Section 168 removal", def: "Removal by ordinary resolution notwithstanding the articles or any agreement, on 28 days' special notice." },
    { term: "Special notice", def: "The 28 days' notice to the company required for certain resolutions, including removal of a director or auditor." },
    { term: "CDDA 1986", def: "The Company Directors Disqualification Act, under which a court may disqualify for up to 15 years." },
    { term: "Section 6 unfitness", def: "The commonest disqualification ground, following insolvency, with a minimum two-year period." },
  ],
  summary: [
    "A director is anyone occupying the position, so de facto and shadow directors owe the same duties.",
    "A service contract guaranteed for more than two years needs members' approval, failing which the term is void.",
    "Members may remove a director by ordinary resolution notwithstanding the articles, on 28 days' special notice.",
    "Removal from office does not end the service contract, so a wrongful dismissal claim may follow.",
    "Disqualification runs up to 15 years, with s.6 unfitness the commonest ground and carrying a two-year minimum.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a shadow director be liable?", a: "Because a director is anyone occupying the position by whatever name called, so liability follows function; the board being accustomed to follow their instructions is enough." },
    { q: "What is needed to remove a director under s.168?", a: "An ordinary resolution, effective notwithstanding the articles or any agreement, with 28 days' special notice to the company and the director's right to be heard." },
    { q: "What happens to a service contract guaranteed for more than two years without members' approval?", a: "The guaranteed term is void and the contract becomes terminable on reasonable notice." },
    { q: "State the two consequences of acting while disqualified.", a: "A criminal offence, and personal liability jointly and severally with the company for the debts incurred while so acting." },
  ],
}

/* ── Chapter 38 · F1(c), F1(d) ─────────────────────────────────── */

export const LWE_TREE_38: StudyChapter = {
  id: "LWE-38",
  number: 38,
  paper: "LW",
  area: "F",
  title: "Directors' powers and the general duties",
  minutes: 18,
  syllabusRefs: ["F1(c)", "F1(d)"],
  intro:
    "The board's power to manage is nearly unlimited, which is exactly why the duties are strict. Almost every question here is about a director who had the power to do something and should not have used it.",
  outcomes: [
    "Distinguish the powers of the board, the managing director and an individual director to bind the company",
    "State the seven general duties and the section under which each arises",
    "Apply the conflict and benefits duties, including the declaration of interest",
    "Explain the statutory controls over substantial property transactions and loans",
    "Decide whether a director has breached a duty and what follows",
  ],
  sections: [
    {
      id: "powers",
      heading: "Who can bind the company",
      blocks: [
        {
          kind: "table",
          caption: "The three levels of power",
          head: ["Who", "Power to bind"],
          rows: [
            ["**The board collectively**", "Manages the company's business and may exercise all its powers, subject to the articles. This is the **primary** authority"],
            ["**The managing director / chief executive**", "Wide **delegated** and **usual** authority, so third parties may generally rely on it (chapter 28)"],
            ["**An individual director**", "**No general authority** to bind the company alone, unless given actual authority or clothed with apparent authority by the board's conduct"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "A single director is not the company",
          md: "The instinctive assumption that any director can commit the company is **wrong**. Management power is vested in the **board collectively**, and one director acting alone has authority only if it was **actually delegated** or if the board's conduct **held them out** as having it. Third parties are protected by **apparent authority** and by the rule that a good-faith outsider is unaffected by constitutional limits on the directors' powers — but the starting point is that the individual has none.",
        },
      ],
      check: {
        q: "A single director, with no delegated authority and no history of acting alone, signs a large contract. Is the company bound?",
        options: [
          "Yes, because a director always represents the company",
          "Not on actual authority — management power is vested in the board collectively, so it turns on whether apparent authority was created",
          "Yes, provided the contract benefits the company",
          "No, and apparent authority can never apply to a director",
        ],
        correct: 1,
        explain:
          "NOT on actual authority. Management power belongs to the BOARD COLLECTIVELY, and an individual director has none alone unless it was delegated. The company may still be bound by APPARENT authority — but that needs a holding out BY THE BOARD, and on these facts there is no delegation and no history of acquiescence.",
      },
    },
    {
      id: "duties",
      heading: "The seven general duties",
      blocks: [
        {
          kind: "table",
          caption: "The codified duties, CA 2006 ss.171-177",
          head: ["Section", "Duty", "What it means in practice"],
          rows: [
            ["**s.171**", "Act **within powers**", "Act in accordance with the constitution, and exercise powers only for the **purposes for which they are conferred**"],
            ["**s.172**", "Promote the **success of the company**", "Act in the way the director considers, **in good faith**, would most likely promote the success of the company for the benefit of the **members as a whole**, having regard to the listed factors — long-term consequences, employees' interests, relationships with suppliers and customers, the community and the environment, and the company's reputation"],
            ["**s.173**", "Exercise **independent judgement**", "Do not fetter discretion, though acting under an agreement properly entered into by the company is permitted"],
            ["**s.174**", "Exercise **reasonable care, skill and diligence**", "\"The care of a reasonably diligent person with the general knowledge, skill and experience\" reasonably expected of someone in that role, **and** with the director's **own actual** knowledge, skill and experience"],
            ["**s.175**", "**Avoid conflicts of interest**", "Avoid a situation in which the director has, or can have, a direct or indirect interest conflicting with the company's — including the exploitation of property, information or opportunity"],
            ["**s.176**", "**Not accept benefits from third parties**", "Do not accept a benefit conferred by reason of being a director or of doing anything as a director"],
            ["**s.177**", "**Declare an interest** in a proposed transaction", "Declare the nature and extent of any interest to the other directors before the company enters the transaction"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The section 174 standard has two limbs, and the second only raises it",
          md: "The test is **objective and subjective at once**. The **objective** limb asks what a reasonably diligent person with the knowledge, skill and experience reasonably expected of someone in that **role** would have done — so ignorance is no defence and a non-executive cannot plead that they never looked. The **subjective** limb adds the director's **own actual** knowledge and skill, and it can only **raise** the standard: a qualified accountant on the board is judged by what an accountant should have seen. It never lowers the bar.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Section 172 is subjective in form — which is why claims are pleaded under 174",
          md: "Section 172 asks what the director **considered in good faith** would promote the company's success, so a court is slow to second-guess a commercial judgement honestly reached. That makes s.172 hard to breach on its own. **Section 174** is where claims actually succeed, because it is measured **objectively** — a director who acted honestly but without informing themselves, reading the accounts, or asking obvious questions breaches s.174 whatever their good faith. When a scenario stresses a director's honesty, look at s.174 rather than s.172.",
        },
        {
          kind: "table",
          caption: "The statutory controls on dealings between director and company",
          head: ["Transaction", "What is required"],
          rows: [
            ["**Declaration of interest** in a proposed transaction — s.177", "Declare nature and extent to the other directors **before** the company enters it. An existing transaction must be declared under a separate provision"],
            ["**Substantial property transaction**", "Acquisition or disposal of a **non-cash asset of substantial value** between company and director requires **approval by ordinary resolution** of the members. Without it the transaction is **voidable** and the director must account for gains and indemnify losses"],
            ["**Loans** to a director", "Require **members' approval by ordinary resolution**, with a memorandum of terms made available. A public company faces tighter rules extending to quasi-loans and credit transactions. Certain small or business-expenditure exceptions apply"],
            ["**Long service contracts**", "A guaranteed term over two years needs members' approval (chapter 37)"],
            ["**Payments for loss of office**", "Require members' approval"],
          ],
        },
        {
          kind: "list",
          title: "Consequences of breach",
          items: [
            "**Account for profits** made from the breach, and repay any secret benefit.",
            "**Damages or compensation** to the company for its loss.",
            "**Rescission** of the affected contract, or it is **voidable** in the case of an unapproved substantial property transaction.",
            "**Injunction** to restrain a threatened breach, and **restoration** of company property.",
            "**Ratification** by the members is possible for some breaches, but the votes of the **interested director and connected persons are disregarded**.",
            "**Relief by the court**, which may excuse a director who acted honestly and reasonably.",
            "The company is normally the proper claimant, though a member may bring a **derivative claim** with the court's permission.",
          ],
        },
        {
          kind: "example",
          title: "Testing a director's conduct",
          scenario:
            "Orrell, a director of Sedgemoor Ltd and a qualified accountant, learns through the company of a contract opportunity with a large retailer. He forms his own company and takes the contract himself, without telling the board. He also arranges for Sedgemoor to buy a warehouse from him for £480,000 — a substantial non-cash asset — mentioning at a board meeting only that he \"has an interest in the property\", with no members' resolution taken. Sedgemoor also lends him £60,000 with no members' approval. Orrell never reads the monthly management accounts, and Sedgemoor pays a dividend on figures he never checked, which turn out to have been overstated.",
          steps: [
            { label: "The diverted contract", detail: "Breach of s.175 — he failed to AVOID A CONFLICT and exploited an OPPORTUNITY that came to him through the company. He must ACCOUNT for the profits of his own company's contract, and the fact that Sedgemoor might not have taken it is no defence." },
            { label: "The warehouse — declaration", detail: "Section 177 requires the NATURE AND EXTENT of the interest to be declared. Saying he \"has an interest\" discloses neither, so the declaration is INADEQUATE and s.177 is breached." },
            { label: "The warehouse — members' approval", detail: "This is a SUBSTANTIAL PROPERTY TRANSACTION, which needed approval by ORDINARY RESOLUTION of the members. None was obtained, so the transaction is VOIDABLE and Orrell must account for any gain and indemnify Sedgemoor's loss." },
            { label: "The £60,000 loan", detail: "A loan to a director requires MEMBERS' APPROVAL. Without it the transaction is voidable and Orrell must repay and account, subject to the limited statutory exceptions." },
            { label: "Not reading the accounts", detail: "Breach of s.174. The OBJECTIVE limb alone would catch a director who never reads the management accounts; and because Orrell is a QUALIFIED ACCOUNTANT the SUBJECTIVE limb RAISES the standard further. His honesty is irrelevant, which is why the claim lies under s.174 rather than s.172." },
            { label: "The overstated dividend", detail: "If the distribution exceeded distributable profits it was UNLAWFUL, and the directors who authorised it are liable for breach of duty and may be ordered to REPAY it; members who knew or had reasonable grounds to believe must repay under s.847 (chapter 36)." },
            { label: "Note who can sue, and the ratification limit", detail: "SEDGEMOOR is the proper claimant, though a member could seek permission for a DERIVATIVE CLAIM. The members could ratify some breaches — but ORRELL'S OWN VOTES AND THOSE OF CONNECTED PERSONS ARE DISREGARDED, so he cannot approve his own conduct." },
          ],
          result:
            "Breaches of **ss.174, 175 and 177**, plus an unapproved **substantial property transaction** and an unapproved **loan**, and exposure on the **unlawful dividend**. Two details do the work: \"an interest\" is not a declaration of **nature and extent**, and being an accountant **raises** the s.174 standard rather than explaining the failure away.",
        },
      ],
      check: {
        q: "A director acts honestly but never informs himself about the company's finances, and loss follows. Which duty is breached?",
        options: [
          "None, since he acted in good faith",
          "Section 174 — the care, skill and diligence duty is measured objectively, so good faith is no answer",
          "Section 172 only, for failing to promote the company's success",
          "Section 176, for accepting a benefit",
        ],
        correct: 1,
        explain:
          "SECTION 174. Its objective limb asks what a reasonably diligent person with the knowledge and experience expected of that role would have done, so HONESTY IS NO DEFENCE. Section 172 is subjective in form and hard to breach where the director genuinely believed they were promoting success — which is exactly why claims are pleaded under s.174.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Assuming any single director can bind the company.",
      fix: "Management power is vested in the BOARD. An individual needs actual or apparent authority.",
    },
    {
      trap: "Letting a director's own actual skill lower the s.174 standard.",
      fix: "The subjective limb can only RAISE it. The objective limb sets the floor.",
    },
    {
      trap: "Pleading s.172 where the director acted honestly.",
      fix: "Section 172 is subjective in form. Use s.174, which is measured objectively.",
    },
    {
      trap: "Treating a vague mention of \"an interest\" as a s.177 declaration.",
      fix: "The NATURE AND EXTENT must be declared, before the company enters the transaction.",
    },
    {
      trap: "Letting the interested director's votes ratify his own breach.",
      fix: "The votes of the director and connected persons are disregarded.",
    },
  ],
  keyTerms: [
    { term: "Section 171", def: "The duty to act within powers and for the purposes for which they were conferred." },
    { term: "Section 172", def: "The duty to promote the success of the company for the members as a whole, having regard to the listed factors." },
    { term: "Section 174", def: "The duty of reasonable care, skill and diligence, objective with a subjective limb that can only raise the standard." },
    { term: "Section 175", def: "The duty to avoid conflicts of interest, including exploitation of property, information or opportunity." },
    { term: "Section 177", def: "The duty to declare the nature and extent of an interest in a proposed transaction before the company enters it." },
    { term: "Substantial property transaction", def: "An acquisition or disposal of a substantial non-cash asset between company and director, requiring members' approval." },
    { term: "Derivative claim", def: "A claim brought by a member on the company's behalf for a wrong to the company, requiring the court's permission." },
  ],
  summary: [
    "Management power belongs to the board collectively; an individual director needs actual or apparent authority.",
    "The seven general duties are codified in ss.171-177 of the Companies Act 2006.",
    "Section 174 sets an objective standard raised, never lowered, by the director's own knowledge and skill.",
    "Substantial property transactions, loans, long service contracts and payments for loss of office need members' approval.",
    "Breach leads to accounting for profits, damages, rescission or avoidance, with the interested director's votes disregarded on ratification.",
  ],
  knowledgeDiagnostic: [
    { q: "State the seven general duties and their sections.", a: "Act within powers (171), promote the company's success (172), exercise independent judgement (173), exercise reasonable care, skill and diligence (174), avoid conflicts of interest (175), not accept benefits from third parties (176), declare an interest in a proposed transaction (177)." },
    { q: "How do the two limbs of s.174 interact?", a: "The objective limb sets the standard of a reasonably diligent person in that role; the director's own actual knowledge and skill can only raise it." },
    { q: "What does a s.177 declaration have to state?", a: "The nature and extent of the interest, declared to the other directors before the company enters the transaction." },
    { q: "What follows from an unapproved substantial property transaction?", a: "It is voidable, and the director must account for any gain and indemnify the company for its loss." },
    { q: "Whose votes are disregarded when members ratify a breach of duty?", a: "Those of the director in breach and of persons connected with them." },
  ],
}

export const LWE_TREE_AREA_F_PART1: StudyChapter[] = [LWE_TREE_37, LWE_TREE_38]
