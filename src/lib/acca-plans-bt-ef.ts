/*
 * BT Areas E and F — Personal effectiveness and communication, and professional
 * ethics. The exam-plan layer: what each section is examined by, and how.
 *
 * Area F is the highest-yield block in BT relative to its size, and it is where
 * imprecision costs most: the five fundamental principles must be named in the
 * examiner's words, threats must be identified by TYPE, and a safeguard has to be
 * a response to the specific threat rather than good practice in general. Almost
 * every plan in Area F therefore names the principle or the threat before the
 * option list is allowed to influence anything.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const BT_PLANS_EF: ExamPlanMap = {
  /* ── BT-23 · Personal effectiveness, competence, conflict ────── */

  "BT-23::time-management": {
    title: "Prioritising with the urgent–important distinction",
    format: "ot",
    marks: 2,
    requirement:
      "In time management, a task that is **important but not urgent** should be:\n\nA  Done immediately, ahead of everything else\nB  Scheduled, so it receives time before it becomes urgent\nC  Delegated to someone else\nD  Left undone until it becomes urgent",
    plan: [
      {
        step: "Separate the two words, which are not synonyms",
        detail:
          "Urgent means it demands attention NOW. Important means it contributes to objectives. A task can be either, both or neither, and the whole technique rests on the two being independent.",
      },
      {
        step: "Set out the four combinations and their responses",
        detail:
          "Important and urgent: do it now. Important, not urgent: schedule it. Urgent, not important: delegate it if possible. Neither: drop it.",
      },
      {
        step: "Read the stem's combination and take the matching response",
        detail:
          "Important but not urgent maps to scheduling. It is the quadrant where planning, development and prevention live — the work that never shouts and always matters.",
      },
      {
        step: "Understand why this quadrant is the point of the technique",
        detail:
          "Neglecting it is what generates tomorrow's crises: a task left until it becomes urgent is then handled worse and under pressure. D is the behaviour the technique exists to prevent.",
      },
    ],
    answer:
      "**B — scheduled, so it receives time before it becomes urgent.**\n\nUrgency and importance are independent. Important and urgent work is done now; urgent but unimportant work is delegated where possible; work that is neither is dropped. Important but not urgent work must be **scheduled**, because nothing else will force it to happen.\n\nThis is the quadrant the technique exists for: planning, development, relationship-building and preventive work never announce themselves, and neglecting them is what manufactures the next crisis. Option D describes exactly the behaviour the method is designed to break.",
    earns: ["Treating urgency and importance as two independent axes"],
    loses: ["Using \"important\" as a synonym for \"urgent\", which collapses all four quadrants into two"],
  },

  "BT-23::ineffectiveness": {
    title: "Recognising the organisational cost of personal ineffectiveness",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a consequence for the ORGANISATION, rather than for the individual, of poor personal effectiveness?\n\nA  Increased personal stress\nB  Missed deadlines that delay other departments' work\nC  Reduced job satisfaction\nD  Loss of confidence",
    plan: [
      {
        step: "Read whose consequences the stem asks for",
        detail:
          "The organisation's. Three options will be consequences for the individual, and every option will be a genuine consequence — the sorting is by who bears it.",
      },
      {
        step: "Test each option for where the harm lands",
        detail:
          "Stress, reduced satisfaction and loss of confidence are all experienced by the person. Only B describes harm crossing to other people and other parts of the organisation.",
      },
      {
        step: "Recall the organisational list, so it is available",
        detail:
          "Missed deadlines, poor quality work needing redoing, knock-on delays to colleagues, damaged customer relationships, higher costs, and lost opportunities.",
      },
      {
        step: "Note that individual harms become organisational eventually",
        detail:
          "Stress leads to absence and turnover, which cost the organisation. But the stem asks which is an organisational consequence directly, so answer at the level asked.",
      },
    ],
    answer:
      "**B — missed deadlines that delay other departments' work.**\n\nOrganisational consequences are those borne beyond the individual: missed deadlines with knock-on delays, work of poor quality needing to be redone, damaged customer relationships, higher costs and lost opportunities.\n\nStress, reduced job satisfaction and loss of confidence are all real, and all fall on the person. They reach the organisation eventually through absence and turnover, but the stem asks which is directly an organisational consequence.",
    earns: ["Sorting the consequences by who bears them rather than by how serious they sound"],
    loses: ["Choosing stress because it is the most familiar consequence of overload"],
  },

  "BT-23::competence": {
    title: "What a competence framework is used for",
    format: "ot",
    marks: 2,
    requirement:
      "A competence framework is most directly used to:\n\nA  Set the organisation's strategic objectives\nB  Define the skills and behaviours a role requires, so gaps can be identified\nC  Determine the level of dividend to pay shareholders\nD  Allocate overheads between departments",
    plan: [
      {
        step: "Read the term literally",
        detail:
          "A framework of competences — the skills, knowledge and behaviours a role requires, set out in a structured way. The definition is contained in the name.",
      },
      {
        step: "Name what having such a framework enables",
        detail:
          "Comparing an individual against the standard, which identifies gaps. Those gaps drive recruitment criteria, training needs, appraisal standards and development plans.",
      },
      {
        step: "Dismiss the two options from unrelated topics",
        detail:
          "Dividends and overhead allocation belong to finance and management accounting. Options drawn from a different syllabus area are free eliminations.",
      },
      {
        step: "Distinguish it from strategy",
        detail:
          "Strategic objectives set what the organisation is trying to achieve; a competence framework describes what people must be able to do. It supports strategy without being it.",
      },
    ],
    answer:
      "**B — define the skills and behaviours a role requires, so gaps can be identified.**\n\nA competence framework sets out the skills, knowledge and behaviours a role requires in a structured form. Its value is comparative: an individual can be assessed against the standard, and the gap becomes the development need.\n\nThat single artefact then supports recruitment criteria, training needs analysis, appraisal standards and personal development planning — which is why it appears in this chapter and again beside training. It supports strategy rather than setting it, and the remaining options come from other syllabus areas entirely.",
    earns: ["Naming the comparative use — the framework is a standard to measure against"],
    loses: ["Treating it as a strategic planning tool"],
  },

  "BT-23::conflict": {
    title: "Identifying a conflict-handling strategy from behaviour",
    format: "ot",
    marks: 2,
    requirement:
      "Two departments in dispute reach an agreement in which each gives up part of what it wanted. This approach to conflict is:\n\nA  Avoidance\nB  Compromise\nC  Collaboration\nD  Accommodation",
    plan: [
      {
        step: "Set out the strategies by who gets what",
        detail:
          "Avoidance: the issue is not addressed. Accommodation: one side gives way entirely. Competition: one side wins. Compromise: both give something up. Collaboration: a solution is found that meets both sets of needs.",
      },
      {
        step: "Read the outcome the stem describes",
        detail:
          "Each side gives up part of what it wanted. That is a partial loss on both sides, which is compromise's definition.",
      },
      {
        step: "Split compromise from collaboration deliberately",
        detail:
          "This is where the marks go. Compromise splits the difference and both sides lose something. Collaboration finds an option that satisfies both, so neither has to give ground.",
      },
      {
        step: "Rule out the two one-sided options",
        detail:
          "Avoidance would leave the dispute unaddressed and accommodation would have one side giving way completely. The stem says both gave something up, which excludes both.",
      },
    ],
    answer:
      "**B — compromise.**\n\nCompromise is the middle ground: each party gives up part of what it wanted, so each is partly satisfied and partly not. It is quick and often practical, and it is not the best available outcome.\n\n**Collaboration** is the distinction that carries the marks — it works the problem until a solution is found that meets both sets of needs, so neither side has to give ground. It takes longer and produces a better result, which is why the two are always offered together.\n\nAvoidance leaves the issue unaddressed and accommodation has one side giving way entirely.",
    earns: ["Splitting compromise from collaboration on whether anyone had to give something up"],
    loses: ["Using compromise and collaboration interchangeably, since both sound co-operative"],
  },

  /* ── BT-24 · Communicating in business ───────────────────────── */

  "BT-24::the-process": {
    title: "Naming the element of the communication process",
    format: "ot",
    marks: 1,
    requirement:
      "In the communication process, the response that tells the sender their message has been understood is called:\n\nA  Encoding\nB  The medium\nC  Feedback\nD  Noise",
    plan: [
      {
        step: "Set out the process in order",
        detail:
          "Sender → encodes the message → transmits through a medium → receiver decodes → feedback returns to the sender. Noise is anything that interferes at any point along the way.",
      },
      {
        step: "Match the stem's description to the element",
        detail:
          "A response returning to the sender confirming understanding is feedback, and the stem's wording paraphrases the definition directly.",
      },
      {
        step: "Confirm the distractors are other elements of the same model",
        detail:
          "Encoding turns the idea into a message, the medium carries it, and noise is interference. All three are genuine parts of the model, which is what makes them plausible.",
      },
    ],
    answer:
      "**C — feedback.**\n\nThe process runs: the sender encodes an idea into a message, transmits it through a medium, and the receiver decodes it. **Feedback** is the response returning to the sender, and it is the only element that confirms whether the message that arrived is the message that was sent.\n\nThat is why one-way media are risky for anything complex — without feedback the sender cannot know whether decoding matched encoding. **Noise** is anything interfering along the way, from a poor line to jargon the receiver does not share.",
    earns: ["Recognising feedback as the only element that verifies understanding"],
    loses: ["Spending two-mark time on a one-mark recall question"],
  },

  "BT-24::formal-informal": {
    title: "Recognising the grapevine and what to do about it",
    format: "ot",
    marks: 2,
    requirement:
      "Information about a forthcoming reorganisation spreads through the workforce before any announcement is made. The most appropriate management response is to:\n\nA  Attempt to prohibit informal discussion of the matter\nB  Communicate accurate information promptly through formal channels\nC  Ignore it, as informal communication is unimportant\nD  Identify and discipline whoever started it",
    plan: [
      {
        step: "Recognise the informal channel for what it is",
        detail:
          "The grapevine is fast, reaches everyone, and carries information that may be accurate or badly distorted. It exists in every organisation and cannot be abolished.",
      },
      {
        step: "Ask what actually feeds it",
        detail:
          "Rumour fills a vacuum. Where formal communication is slow or absent, people construct an explanation from fragments, and that construction spreads faster than the eventual announcement.",
      },
      {
        step: "Choose the response that removes the cause",
        detail:
          "Prompt accurate information through formal channels removes the vacuum the rumour is feeding on. Prohibition and discipline attack the symptom and confirm that something is being concealed.",
      },
      {
        step: "Reject the dismissive option",
        detail:
          "Ignoring it is wrong on the facts: informal communication moves faster than formal, and a distorted version left uncorrected becomes what people believe and act on.",
      },
    ],
    answer:
      "**B — communicate accurate information promptly through formal channels.**\n\nThe grapevine is fast, reaches everyone, and carries whatever people have constructed from fragments. It cannot be abolished, and it is fed by the absence of authoritative information — rumour fills a vacuum.\n\nSo the effective response removes the cause rather than the symptom. Prohibiting discussion is unenforceable and confirms that something is being hidden; disciplining a source treats a predictable consequence of poor communication as misconduct. Ignoring it leaves the distorted version to become what people believe.",
    earns: ["Reasoning from what feeds the rumour rather than from how to suppress it"],
    loses: ["Choosing an enforcement response, which raises suspicion instead of settling it"],
  },

  "BT-24::directions": {
    title: "Classifying the direction a communication travels",
    format: "ot",
    marks: 2,
    requirement:
      "The production manager sends the sales manager a note about next month's output schedule. This communication is:\n\nA  Vertical (downward)\nB  Vertical (upward)\nC  Lateral (horizontal)\nD  Diagonal",
    plan: [
      {
        step: "Fix what each direction means in terms of the hierarchy",
        detail:
          "Downward: senior to junior. Upward: junior to senior. Lateral: between people at the same level. Diagonal: between different levels in different departments.",
      },
      {
        step: "Establish the relative levels of the two parties",
        detail:
          "Two managers of comparable seniority in different functions. Same level, different department, which is lateral communication.",
      },
      {
        step: "Split lateral from diagonal precisely",
        detail:
          "Both cross departments. The difference is level: lateral is the same level, diagonal is a different one. A production manager writing to a sales ASSISTANT would be diagonal.",
      },
      {
        step: "Name what lateral communication is for",
        detail:
          "Co-ordination between functions — which is exactly the case here, since sales cannot promise what production will not make.",
      },
    ],
    answer:
      "**C — lateral (horizontal).**\n\nLateral communication runs between people at the same level, typically in different functions, and its purpose is co-ordination — sales cannot promise what production will not make.\n\n**Diagonal** is the distinction to hold: it also crosses departments but between DIFFERENT levels, so a production manager writing to a sales assistant would be diagonal. Downward carries instructions and policy; upward carries reporting and feedback, and is the direction most often blocked, because subordinates hesitate to pass bad news up.",
    earns: ["Splitting lateral from diagonal on level rather than on department"],
    loses: ["Reading any cross-department message as diagonal"],
  },

  "BT-24::media": {
    title: "Choosing the medium the situation requires",
    format: "ot",
    marks: 2,
    requirement:
      "A manager must tell an employee that their role is being made redundant. The most appropriate medium is:\n\nA  An email to the employee\nB  A face-to-face meeting, confirmed in writing\nC  A notice on the staff intranet\nD  A message to the employee's team leader to pass on",
    plan: [
      {
        step: "Judge the message on sensitivity and complexity",
        detail:
          "The two properties that drive the choice. This message is highly sensitive and will provoke questions, so it needs immediate feedback and the ability to respond to reaction.",
      },
      {
        step: "Rank the media by richness",
        detail:
          "Face-to-face is richest — tone, body language, immediate two-way response. Telephone next, then written, then a general notice, which is the poorest for anything personal.",
      },
      {
        step: "Notice the option that combines two media",
        detail:
          "B is face-to-face AND written confirmation. That covers both needs: the conversation handles the reaction, the written record gives the employee the terms accurately and creates evidence.",
      },
      {
        step: "Reject the impersonal and the second-hand",
        detail:
          "Email and an intranet notice deliver serious personal news without any means of responding. Passing it through a team leader adds a relay who did not make the decision and cannot answer for it.",
      },
    ],
    answer:
      "**B — a face-to-face meeting, confirmed in writing.**\n\nMedium follows the message's sensitivity and complexity. Redundancy is highly sensitive and will provoke questions, so it needs the richest medium available: face-to-face, where tone and body language are present and the manager can respond to the reaction as it happens.\n\nThe written confirmation is the second half and matters as much. It gives the employee accurate terms to read once the shock has passed, and creates a record.\n\nEmail and an intranet notice deliver serious personal news with no means of responding. Passing it through a team leader inserts a relay who cannot answer for the decision.",
    earns: [
      "Choosing on sensitivity and complexity rather than on speed or convenience",
      "Recognising that the written confirmation is part of the answer, not an alternative to the meeting",
    ],
    loses: ["Selecting the fastest medium for the most sensitive message"],
  },

  "BT-24::barriers": {
    title: "Naming the barrier and matching it to a remedy",
    format: "mtq",
    marks: 4,
    requirement:
      "Identify the barrier to communication in each situation.\n\n(i) A finance manager explains a variance to the sales team using technical accounting terms\n(ii) A subordinate does not tell the manager that a project is failing, fearing blame\n(iii) A manager receives 200 emails a day and misses an important one\n(iv) A message is passed verbally through four people before reaching its destination\n\nBarriers: Jargon · Status difference · Information overload · Distortion · Physical noise",
    plan: [
      {
        step: "Give each barrier the point in the process at which it acts",
        detail:
          "Jargon fails at DECODING. Status difference stops the message being sent. Overload means it is never attended to. Distortion corrupts it in transmission. Physical noise interferes with the channel.",
      },
      {
        step: "Read each situation for where the failure occurred",
        detail:
          "The terms were not understood; the message was never sent; it arrived and was not noticed; it changed shape on the way. Each maps to a different point, which is how the task is built.",
      },
      {
        step: "Separate distortion from jargon carefully",
        detail:
          "Both leave the receiver with the wrong understanding. Jargon means the message was clear but the receiver lacked the vocabulary; distortion means the message itself changed as it was relayed.",
      },
      {
        step: "Note the unused option",
        detail:
          "Physical noise is offered and not needed. Do not force it in — a matching task routinely offers more options than items, and displacing a correct answer to use them all costs marks.",
      },
    ],
    answer:
      "**(i) Jargon.** The message was clear to the sender but the receivers lacked the vocabulary, so decoding failed. The remedy is to use the audience's language, not the speaker's.\n\n**(ii) Status difference.** The hierarchy suppressed the message entirely. This is the classic barrier to UPWARD communication and the reason bad news travels up so slowly.\n\n**(iii) Information overload.** The message arrived and was never attended to, because volume exceeded the capacity to process it.\n\n**(iv) Distortion.** Each relay changed the message slightly, so what arrived is not what was sent — which is why long chains of verbal communication are unreliable.\n\nPhysical noise is not present in any of the four.",
    earns: [
      "Locating each failure at a specific point in the communication process",
      "Leaving the unused option unused",
    ],
    loses: [
      "Answering (i) as distortion, when the message was accurate and merely not understood",
      "Treating (ii) as a personality issue rather than the recognised status barrier",
    ],
  },

  /* ── BT-25 · Fundamental principles of ethical behaviour ─────── */

  "BT-25::why-ethics": {
    title: "Why ethics is a professional obligation rather than a preference",
    format: "ot",
    marks: 2,
    requirement:
      "A professional accountant complies with an ethical code principally because:\n\nA  It is a legal requirement in every country\nB  Public trust in the profession depends on it, and membership requires it\nC  It increases the firm's profits\nD  Clients insist upon it",
    plan: [
      {
        step: "Identify what the profession's status rests on",
        detail:
          "Accountants report on matters the public relies on and cannot verify. That reliance is the profession's asset, and it survives only while the profession is trusted.",
      },
      {
        step: "Add the membership obligation",
        detail:
          "A professional body requires adherence to its code as a condition of membership, and can discipline or expel for breach. So compliance is an obligation, not a preference.",
      },
      {
        step: "Reject the overreaching legal claim",
        detail:
          "Ethical codes are not law in every country, and much of what a code requires goes beyond what law compels. That is the point of having one.",
      },
      {
        step: "Reject the two commercial rationales",
        detail:
          "Ethical behaviour may protect reputation and therefore profit, and clients may indeed expect it, but neither is the reason the obligation exists — and both would evaporate whenever the commercial case did.",
      },
    ],
    answer:
      "**B — public trust in the profession depends on it, and membership requires it.**\n\nAccountants report on matters the public relies on and cannot verify for itself, so the profession's standing rests entirely on being trusted. The code protects that, and adherence is a condition of membership enforceable by discipline up to expulsion.\n\nThe codes are not law in every jurisdiction, and much of what they require goes beyond what law compels. Reputation and client expectation are real, but grounding the obligation there would make it disappear whenever the commercial case did — which is precisely when it matters.",
    earns: ["Grounding the obligation in public interest and membership rather than in commercial benefit"],
    loses: ["Choosing the legal option, which overstates the position and misses the point of a code"],
  },

  "BT-25::five-principles": {
    title: "Naming the fundamental principle a situation engages",
    format: "ot",
    marks: 2,
    requirement:
      "An accountant discusses a client's forthcoming acquisition with a friend outside the firm. Which fundamental principle has been breached?\n\nA  Objectivity\nB  Confidentiality\nC  Professional competence and due care\nD  Professional behaviour",
    plan: [
      {
        step: "Name all five principles before reading the options",
        detail:
          "Integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour. If a principle is not brought to mind it cannot be selected, and this is the highest-yield recall in BT.",
      },
      {
        step: "Match the facts to the principle they most directly offend",
        detail:
          "Client information disclosed outside the firm without authority is confidentiality, exactly and without ambiguity.",
      },
      {
        step: "Check whether professional behaviour also fits",
        detail:
          "It is the catch-all — complying with laws and regulations and avoiding conduct that discredits the profession. It applies to many breaches, so choose it only when no specific principle fits.",
      },
      {
        step: "Know the duty's boundaries, since the follow-on asks for them",
        detail:
          "Confidentiality continues after the relationship ends, extends to prospective clients, and is not absolute — disclosure may be required by law or permitted where there is a professional duty.",
      },
    ],
    answer:
      "**B — confidentiality.**\n\nConfidentiality requires that information acquired professionally is not disclosed without proper authority, and is not used for personal advantage. Discussing a client's forthcoming acquisition outside the firm breaches it directly.\n\nThree points about its scope are examined regularly: it **continues after the relationship ends**, it extends to **prospective** clients, and it is **not absolute** — disclosure may be required by law or permitted where there is a professional right or duty.\n\nProfessional behaviour is the catch-all and applies to many breaches, so it is only the answer when no specific principle fits.",
    earns: [
      "Reciting all five principles before matching",
      "Preferring the specific principle over the catch-all",
    ],
    loses: ["Answering professional behaviour whenever conduct is poor"],
  },

  "BT-25::threats-and-safeguards": {
    title: "Identifying the threat by type and applying a safeguard to it",
    format: "mtq",
    marks: 4,
    requirement:
      "Identify the category of threat to the fundamental principles in each situation.\n\n(i) An audit firm's fees from one client represent 40% of its total income\n(ii) An accountant is asked to review a system they designed the previous year\n(iii) A client's finance director is the audit engagement partner's sister\n(iv) A client threatens to sue the firm unless a particular accounting treatment is accepted",
    plan: [
      {
        step: "Name the five threats with the question each answers",
        detail:
          "Self-interest: does the accountant benefit financially? Self-review: are they reviewing their own work? Familiarity: are they too close to the client? Intimidation: are they being pressured? Advocacy: are they promoting the client's position?",
      },
      {
        step: "Read each scenario for the mechanism, not the outcome",
        detail:
          "All five threats end in the same place — impaired objectivity. What differs is HOW, and the category is named after the mechanism.",
      },
      {
        step: "Watch fee dependence, which is regularly misnamed",
        detail:
          "40% of income from one client is self-interest: the firm has a financial interest in keeping that client. It reads as intimidation because the client has leverage, but no threat has been made.",
      },
      {
        step: "Be ready to pair each threat with a matching safeguard",
        detail:
          "Self-interest from fee dependence: reduce dependence, independent review. Self-review: use a different team. Familiarity: rotate the partner or remove them. Intimidation: escalate, take legal advice, resign if unresolved.",
      },
    ],
    answer:
      "**(i) Self-interest.** The firm depends financially on the client, so it has an interest in keeping them satisfied. Safeguards: reduce the dependence and obtain an independent quality review.\n\n**(ii) Self-review.** The accountant would be evaluating their own prior work and is unlikely to report their own error. Safeguard: use a team with no involvement in the original engagement.\n\n**(iii) Familiarity.** A close family relationship makes it hard to remain sceptical. Safeguard: remove the partner from the engagement — rotation alone does not cure a family tie.\n\n**(iv) Intimidation.** The accountant is being deterred from acting objectively by an explicit threat. Safeguards: escalate within the firm, take legal advice, and resign if it cannot be resolved.",
    earns: [
      "Naming the threat by its mechanism, since all five end in impaired objectivity",
      "Giving a safeguard that answers the specific threat rather than good practice generally",
    ],
    loses: [
      "Calling fee dependence intimidation because the client holds leverage",
      "Offering \"act with integrity\" as a safeguard — a principle is not a safeguard",
    ],
  },

  "BT-25::rules-vs-principles": {
    title: "Why the profession uses a principles-based framework",
    format: "ot",
    marks: 2,
    requirement:
      "The main advantage of a **principles-based** ethical code over a rules-based one is that it:\n\nA  Is easier to enforce in a disciplinary hearing\nB  Applies to situations the code's authors did not anticipate\nC  Removes the need for professional judgement\nD  Provides certainty about exactly what is permitted",
    plan: [
      {
        step: "State how each approach works",
        detail:
          "Rules-based lists what is prohibited. Principles-based states the principles and requires the accountant to identify threats and apply safeguards, using judgement.",
      },
      {
        step: "Name the fatal weakness of rules",
        detail:
          "A list is finite. Anything not on it is permitted by implication, so a rules-based code invites compliance with the letter while defeating the purpose — and it dates as soon as circumstances change.",
      },
      {
        step: "Derive the principles-based advantage from that weakness",
        detail:
          "Because principles are general, they reach situations nobody foresaw. That coverage is the advantage, and B states it.",
      },
      {
        step: "Recognise the two options that describe the RULES-based approach",
        detail:
          "Certainty and ease of enforcement are what rules give up flexibility to buy. C is simply false — a principles-based code requires MORE judgement, which is its main cost.",
      },
    ],
    answer:
      "**B — applies to situations the code's authors did not anticipate.**\n\nA rules-based code lists what is prohibited, so anything omitted is permitted by implication and the code invites compliance with the letter while defeating the spirit. It also dates as soon as circumstances change.\n\nA principles-based code states the principles and requires the accountant to identify threats and apply safeguards, so it reaches situations nobody foresaw.\n\nA and D are the **rules-based** advantages — certainty and ease of enforcement — which is what the profession gives up. C inverts the position: a principles-based code requires more judgement, and that is its main cost.",
    earns: ["Deriving the advantage from the specific weakness of a finite list"],
    loses: ["Choosing certainty, which is what the principles-based approach sacrifices"],
  },

  "BT-25::professional-bodies": {
    title: "Which body does what in the regulation of the profession",
    format: "ot",
    marks: 1,
    requirement:
      "A professional accountancy body's disciplinary process can result in:\n\nA  A criminal conviction\nB  Exclusion from membership of the body\nC  A prison sentence\nD  The winding up of the member's firm by the body",
    plan: [
      {
        step: "Identify what authority a professional body actually holds",
        detail:
          "It controls membership. It can admit, sanction, suspend and exclude. It cannot exercise powers belonging to the courts or to a statutory regulator.",
      },
      {
        step: "Strike the two criminal options",
        detail:
          "Convictions and prison sentences come from courts. A body may report matters to the authorities, and the criminal process is separate from its own.",
      },
      {
        step: "Test the remaining distractor",
        detail:
          "Winding up a firm is a matter for the courts or an insolvency process, not for a membership body — even though exclusion of its members may be fatal to the firm in practice.",
      },
    ],
    answer:
      "**B — exclusion from membership of the body.**\n\nA professional body's authority runs to membership: it can reprimand, fine, impose conditions, suspend or exclude. For a qualified accountant, exclusion is severe, since it removes the designation and with it the right to hold certain roles.\n\nCriminal convictions and prison sentences are for the courts, and winding up a firm is a court or insolvency matter. The body may report conduct to the authorities, but that process runs separately from its own.",
    earns: ["Answering from the limits of a membership body's authority"],
    loses: ["Attributing court powers to a professional body"],
  },

  /* ── BT-26 · Corporate codes and resolving dilemmas ──────────── */

  "BT-26::corporate-codes": {
    title: "Telling a corporate code from a professional one",
    format: "ot",
    marks: 2,
    requirement:
      "A company's own code of ethics differs from a professional body's code principally in that the company's code:\n\nA  Has legal force, while the professional code does not\nB  Applies to all its employees, not only to qualified accountants\nC  Cannot address ethical matters\nD  Overrides the professional code where the two conflict",
    plan: [
      {
        step: "Identify who each code binds",
        detail:
          "A professional code binds members of that body wherever they work. A corporate code binds everyone employed by that organisation, whatever their profession or qualification.",
      },
      {
        step: "Handle the conflict question directly, since it is the trap",
        detail:
          "Where the two conflict the professional code prevails for a member. An employer's instruction never relieves a professional of their own obligations, and that is exactly what D denies.",
      },
      {
        step: "Reject the legal-force claim",
        detail:
          "Neither code is law. A corporate code may be incorporated into contracts of employment, but that gives it contractual rather than legal force, and does not make it superior.",
      },
      {
        step: "Dismiss the option that is simply false",
        detail:
          "Addressing ethical matters is what a corporate code is for — conduct, gifts, conflicts of interest, whistleblowing and the treatment of stakeholders.",
      },
    ],
    answer:
      "**B — applies to all its employees, not only to qualified accountants.**\n\nA professional code binds members of the body wherever they work; a corporate code binds everyone the organisation employs, whatever their profession.\n\nD is the important trap: where the two conflict, the **professional code prevails** for a member. An employer's instruction does not relieve a professional of obligations owed to their body and to the public, and a corporate code that required otherwise would be one an accountant could not follow.\n\nNeither code is law, though a corporate code may be incorporated into employment contracts.",
    earns: ["Knowing that the professional code prevails in a conflict"],
    loses: ["Assuming the employer's code governs because it is the employer's"],
  },

  "BT-26::sources-of-dilemma": {
    title: "Recognising where an ethical conflict comes from",
    format: "ot",
    marks: 2,
    requirement:
      "A management accountant is instructed by their line manager to present a forecast they believe is unrealistically optimistic. The conflict here is between:\n\nA  Two of the accountant's own personal values\nB  The accountant's professional obligations and their duty to their employer\nC  Two different professional bodies' codes\nD  The company's code and the law",
    plan: [
      {
        step: "Name both parties and what each requires",
        detail:
          "The employer requires the forecast be presented as instructed. The professional obligation requires integrity and objectivity — not being associated with information believed to be misleading.",
      },
      {
        step: "Recognise the standard shape of the BT dilemma",
        detail:
          "Almost every ethical scenario in BT is professional obligation against employer instruction. Recognising the shape identifies the answer before the options are weighed.",
      },
      {
        step: "Check the alternatives against the facts",
        detail:
          "Nothing suggests two personal values in tension, a second professional body, or any question of legality. Each of those is a different conflict, and none is described.",
      },
      {
        step: "Know the resolution, since it is the follow-on",
        detail:
          "Establish the facts, raise it with the manager, escalate internally, take advice from the professional body, document each step — and be prepared to resign if it cannot be resolved.",
      },
    ],
    answer:
      "**B — the accountant's professional obligations and their duty to their employer.**\n\nThe employer requires the forecast to be presented as instructed; **integrity** and **objectivity** require that the accountant not be knowingly associated with information that is misleading. That is the standard shape of an ethical dilemma in employment, and the great majority of BT's ethics scenarios take it.\n\nThe resolution follows a defined route: establish the facts, raise it with the manager, escalate internally through governance channels, take confidential advice from the professional body, document every step — and be prepared to resign if it cannot be resolved.",
    earns: ["Recognising the professional-versus-employer shape immediately"],
    loses: ["Reading it as a personal values conflict, which makes it look like a matter of preference"],
  },

  "BT-26::resolving": {
    title: "The order of steps in resolving an ethical conflict",
    format: "ot",
    marks: 2,
    requirement:
      "An accountant believes they are being asked to act unethically. Which should they do **first**?\n\nA  Resign from their position\nB  Establish the relevant facts and raise the matter with their immediate superior\nC  Report the matter to the professional body's disciplinary committee\nD  Inform the external auditor",
    plan: [
      {
        step: "Recall the sequence, because the question is about order",
        detail:
          "Establish the facts; raise it internally, starting with the immediate superior unless they are the problem; escalate through governance; take confidential advice; document throughout; resign only as a last resort.",
      },
      {
        step: "Notice that all four options may eventually be right",
        detail:
          "Resignation, external advice and disclosure can all be appropriate later. The word FIRST is the question, and answering with a valid later step is the usual error.",
      },
      {
        step: "See why facts come before everything",
        detail:
          "A belief that something is unethical may rest on a misunderstanding. Acting on an unverified belief can damage a colleague unfairly and destroy the accountant's own position if they are wrong.",
      },
      {
        step: "Note why resignation is last",
        detail:
          "It resolves nothing — the conduct continues without anyone raising it — and it forfeits the accountant's ability to influence the outcome. It is the response when internal routes are exhausted.",
      },
    ],
    answer:
      "**B — establish the relevant facts and raise the matter with their immediate superior.**\n\nThe sequence is: establish the facts; raise it internally, beginning with the immediate superior unless they are the source of the problem; escalate through governance channels; take confidential advice from the professional body; document every step; and resign only as a last resort.\n\nFacts come first because a belief may rest on a misunderstanding, and acting on an unverified one can damage a colleague unfairly. Resignation is last because it resolves nothing — the conduct continues, unraised — and it removes any influence over the outcome.",
    earns: ["Answering the word FIRST rather than naming a step that is valid later"],
    loses: ["Choosing resignation, which is the last resort rather than the first response"],
  },

  "BT-26::consequences": {
    title: "The consequences of unethical behaviour, and who bears them",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a consequence of unethical behaviour borne by the **profession as a whole**, rather than by the individual or the firm?\n\nA  Exclusion of the individual from membership\nB  A general loss of public confidence in accountants' reports\nC  Loss of the firm's clients\nD  A fine imposed on the firm",
    plan: [
      {
        step: "Set out the three levels the consequences fall on",
        detail:
          "The individual: discipline, exclusion, loss of career, possible prosecution. The firm: lost clients, fines, reputational damage, possible failure. The profession: loss of public confidence and increased regulation.",
      },
      {
        step: "Read which level the stem asks for",
        detail:
          "The profession as a whole. Three options will be consequences at the other two levels, and all four will be genuine — this is a sorting question, like the health and safety duties.",
      },
      {
        step: "Sort the options by level",
        detail:
          "Exclusion falls on the individual. Lost clients and a fine fall on the firm. Only a general loss of public confidence reaches beyond the parties involved.",
      },
      {
        step: "Add the second profession-level consequence",
        detail:
          "Scandals reliably produce tighter regulation for everyone, including firms that did nothing wrong. That is the other consequence at this level and often earns the follow-on mark.",
      },
    ],
    answer:
      "**B — a general loss of public confidence in accountants' reports.**\n\nConsequences fall at three levels. The **individual** faces discipline, exclusion, loss of career and possibly prosecution. The **firm** faces lost clients, fines, reputational damage and sometimes failure. The **profession** faces loss of public confidence and, reliably, tighter regulation imposed on everyone including firms that did nothing wrong.\n\nThat third level is why the profession polices itself: the cost of one member's misconduct is borne by every member, because what is being damaged is the reliance the profession exists on.",
    earns: [
      "Sorting consequences by the level that bears them",
      "Adding increased regulation as the second profession-level consequence",
    ],
    loses: ["Choosing a firm-level consequence because a firm is larger than an individual"],
  },
}
