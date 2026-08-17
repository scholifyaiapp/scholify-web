import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area A — Fundamental ethical and professional principles.
 *
 * SBR had ONE ethics section, carved out of the legacy conceptual-framework
 * chapter by acca-study-sbr-official.ts — an area worth twenty guaranteed marks
 * (question two ALWAYS pairs reporting implications with ethical implications)
 * was served by a single section written for a different area.
 *
 *   SBR-01  The preparer's ethical duty in corporate reporting   (A1a)
 *   SBR-02  Ethical pressure and creative accounting             (A1a applied)
 *   SBR-03  The consequences of unethical reporting              (A1b)
 *
 * Written against the official ACCA SBR-INT syllabus and study guide for
 * September 2026 to June 2027. Not derived from any approved-provider text —
 * no SBR provider book is held, so this area is authored from the public
 * syllabus, IFRS Accounting Standards and the IESBA Code's public structure.
 *
 * House style for SBR: this is a standards-application paper examined entirely
 * through scenarios. A treatment is never taught as a rule to recite — every
 * section says what the standard requires, what management's incentive does to
 * that requirement in practice, and what the marker pays for when the two
 * collide. Question two (20 marks) is the home of this area: reporting
 * implications first, ethical analysis second, consequences and actions third.
 */

const SBR_TREE_01: StudyChapter = {
  paper: "SBR",
  id: "SBR-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A1(a)"],
  title: "The preparer's ethical duty in corporate reporting",
  minutes: 16,
  intro:
    "SBR opens with ethics because every judgement the rest of the syllabus teaches can be exercised honestly or exploited. The exam never asks you to recite a code — it shows you a director under pressure and asks what the accountant should do.",
  outcomes: [
    "Explain why ethical behaviour by preparers is what makes corporate reports worth relying on at all",
    "Translate the five fundamental principles into the specific judgements a reporting accountant makes",
    "Recognise where an accounting or sustainability disclosure requirement is being met in letter and defeated in substance",
    "Distinguish legitimate professional judgement from biased reporting, using intent and disclosure as the tests",
    "Frame an ethical analysis the way SBR's question two rewards — principles applied to the scenario's facts, not listed",
  ],
  sections: [
    {
      id: "why-ethics-carries-marks",
      heading: "Why reporting depends on the preparer's honesty",
      blocks: [
        {
          kind: "text",
          md: "Financial statements are prepared by the people whose performance they measure. That single fact is why ethics sits at the front of the SBR syllabus. Investors and lenders — the primary users — cannot observe the entity directly; they see what management chooses to show them, filtered through estimates management makes and policies management selects. Auditing narrows that gap but cannot close it, because an audit samples and challenges rather than re-performs. The system only works if the preparer intends the report to be faithful.",
        },
        {
          kind: "text",
          md: "SBR makes this concrete through **stewardship**: the accounts exist partly so that owners can judge how well management has looked after resources entrusted to it. A management team that shades the numbers is not merely bending a technical rule — it is corrupting the evidence on which its own accountability rests. That is why the examiner treats a misstatement's *direction of benefit* as evidence: an error that happens to rescue the CEO's bonus is not read as an accident.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Where the preparer sits in the chain of trust",
            data: {
              steps: [
                { label: "Transactions", sub: "What actually happened" },
                { label: "Judgements", sub: "Estimates, policies, classification — made by management" },
                { label: "The report", sub: "What users are shown" },
                { label: "User decisions", sub: "Buy, sell, lend, price the risk" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The duty now extends past the financial statements. Sustainability disclosures under IFRS S1 and S2 rest on exactly the same judgement-and-honesty problem — arguably more so, because metrics like emissions or climate resilience are harder for a user to verify than a cash balance. A company polishing its climate story while its financing depends on looking green is the same ethical problem as profit smoothing, wearing newer clothes. Expect contemporary scenarios to test both in one exhibit.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Ethics answers start from the user, not the code",
          md: "The strongest opening move in any SBR ethics requirement is to say **who relies on this figure and what decision it feeds**. A misstatement matters because a lender prices a loan on it or an investor holds shares on it. Candidates who begin from the harm write analysis; candidates who begin by listing five principles write a glossary.",
        },
      ],
      check: {
        q: "A finance director argues that an aggressive revenue estimate is acceptable because the auditors did not object to it. What is the best response to this argument?",
        options: [
          "It is sound — audit clearance is the test of acceptable reporting",
          "It fails — the preparer's duty of faithful reporting is primary and is not discharged by surviving audit sampling and challenge",
          "It is sound provided the estimate is disclosed in the accounting policies note",
          "It fails only if the amount is material to profit",
        ],
        correct: 1,
        explain:
          "The audit is a check on the preparer's work, not a substitute for the preparer's honesty — auditors test on a sample basis against evidence management largely supplies. Disclosure (option 2) does not neutralise a biased number, and materiality (option 3) misses that the director's *reasoning* is the ethical failure: the test being applied is 'what can we get past the auditor', which is a threat to integrity regardless of size.",
      },
    },
    {
      id: "principles-into-judgements",
      heading: "The fundamental principles, translated into reporting work",
      blocks: [
        {
          kind: "text",
          md: "The IESBA fundamental principles bind every professional accountant, but SBR examines them in one specific habitat: the preparation of corporate reports. The skill the paper rewards is translation — taking a principle that sounds like a poster slogan and stating what it demands of the person closing this year-end.",
        },
        {
          kind: "table",
          caption: "Each principle, as a preparer's obligation",
          head: ["Principle", "What it requires when reporting", "The scenario that tests it"],
          rows: [
            ["Integrity", "Straightforward and honest reporting — no number you know paints a false picture", "An instruction to book revenue on goods the customer can still return"],
            ["Objectivity", "Estimates made on evidence, not on the answer management needs", "A discount rate chosen because it avoids an impairment"],
            ["Professional competence and due care", "Current knowledge of the standards actually applied, applied carefully", "A treatment carried over from an outdated standard, or a complex instrument nobody re-examined"],
            ["Confidentiality", "Entity information neither disclosed improperly nor used for advantage", "Trading shares, or tipping a friend, ahead of unpublished results"],
            ["Professional behaviour", "Nothing that discredits the profession, including how disputes are handled", "Signing a report you believe misleads, to keep the client or the job"],
          ],
        },
        {
          kind: "text",
          md: "Notice that **objectivity does the heaviest lifting** in this paper. Almost every SBR ethics scenario turns on an estimate — an expected credit loss, a fair value in a thin market, a provision, a deferred tax asset's recoverability — because estimates are where the standards *require* judgement and therefore where bias can hide. The ethical question is rarely whether an estimate is permitted; it is whether this estimate was made to inform or to achieve.",
        },
        {
          kind: "definition",
          term: "Threat to compliance",
          md: "A circumstance that could push the accountant away from the fundamental principles: **self-interest** (bonus, job security), **self-review** (checking your own earlier work), **advocacy** (promoting the entity's position), **familiarity** (relationships dulling challenge), and **intimidation** (pressure from a dominant director). SBR scenarios usually run self-interest and intimidation together — the CFO who controls your appraisal instructs you to change a number.",
        },
        {
          kind: "text",
          md: "When you identify a threat, the marker expects the next move: is there a **safeguard** that reduces it to an acceptable level — consultation with a second partner, the audit committee, the professional body's helpline, documentation of the objection — or is the only remaining answer to refuse, escalate or ultimately resign? An analysis that stops at naming the threat has done half the job.",
        },
      ],
      check: {
        q: "A group accountant is asked to review the goodwill impairment model she herself built last year, in a year when any impairment would breach a loan covenant. Which pair of threats is most precisely engaged?",
        options: [
          "Advocacy and familiarity",
          "Self-review and self-interest",
          "Intimidation and confidentiality",
          "Familiarity and professional behaviour",
        ],
        correct: 1,
        explain:
          "She is checking her own prior work (self-review) in circumstances where the entity — and plausibly her own standing — benefits from one particular answer (self-interest via the covenant). Nothing in the facts yet involves promoting the entity externally (advocacy) or pressure from another person (intimidation), though an SBR scenario will often add the intimidating CFO in the next paragraph.",
      },
    },
    {
      id: "judgement-or-bias",
      heading: "The line between judgement and manipulation",
      blocks: [
        {
          kind: "text",
          md: "IFRS Accounting Standards are principles-based: they leave room for judgement deliberately, because a rule precise enough to need no judgement is precise enough to be engineered around. That room is not a flaw — but it is exactly where manipulation lives. SBR expects you to hold both ideas at once: defend the *existence* of judgement while challenging the *exercise* of it in the scenario.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Signals that judgement has become bias",
          items: [
            "**Direction** — the judgements all fall on the side that helps management's target, covenant or bonus; honest estimation error scatters",
            "**Timing** — the policy or estimate changes in the period that needs it, not when the underlying facts changed",
            "**Asymmetry of rigour** — bad news is investigated until it goes away; good news is booked on the first supportable number",
            "**Disclosure that thins as sensitivity grows** — the more a figure matters, the less the notes say about how it was reached",
            "**Substance offside** — the structure satisfies a standard's words while producing the opposite of its intent",
          ],
        },
        {
          kind: "illustration",
          title: "Same standard, two different accountants",
          md: "Two entities each hold a portfolio of receivables and must estimate expected credit losses. The first builds its estimate from ageing, default history and forward-looking indicators, and discloses the sensitivity honestly — a user can disagree with the number but can see how it was made. The second starts from the loss allowance that keeps the loan covenant intact and works backwards to assumptions that produce it. Both files contain a model; both models are arithmetically correct. The difference is not technical competence but **intent**, and the second entity's disclosure will usually be the thinner of the two — which is why the examiner so often plants a disclosure clue in the exhibit.",
        },
        {
          kind: "examQuestion",
          title: "Discuss the ethical issues raised by a proposed accounting treatment",
          format: "written",
          marks: 8,
          requirement: "Discuss the ethical issues arising from the finance director's proposed treatment, and the actions the accountant should take.",
          plan: [
            { step: "Establish the correct treatment first", detail: "One or two sentences on what the relevant standard requires. The ethical analysis has no anchor until the technically right answer is on the page." },
            { step: "Name the gap and who it misleads", detail: "State what the proposal misstates — profit, gearing, a covenant ratio — and which primary user relies on that figure for which decision." },
            { step: "Diagnose motive and threats", detail: "Link the direction of the misstatement to the incentive in the scenario (bonus, covenant, listing) and name the threats to the accountant: typically self-interest plus intimidation." },
            { step: "Apply the principles, don't list them", detail: "Pick the two or three fundamental principles actually engaged and apply each to a fact. Integrity and objectivity almost always; competence where a standard is being misread." },
            { step: "End with actions in escalation order", detail: "Raise it with the director with reasons → escalate to the board or audit committee → seek advice from the professional body → decline association, and document each step." },
          ],
          answer:
            "IFRS 15 permits revenue to be recognised only as performance obligations are satisfied, and goods shipped on a sale-or-return basis do not transfer control while the customer's right of return makes the consideration reversible. Recognising the full amount now therefore overstates revenue and profit, and the timing — two weeks before the year end, in a year when the profit target funds the directors' bonuses — indicates the motive is the target rather than a view on the accounting.\n\nThe misstatement is not victimless. Investors and lenders assess performance and price risk on reported revenue; a lender extending facilities on inflated figures bears real, uncompensated risk, and investors trading at a price built on those figures transfer wealth to better-informed insiders.\n\nFor the accountant the instruction creates a self-interest threat (her appraisal and career sit with the finance director) and an intimidation threat (the instruction is framed as a test of loyalty). Complying would breach integrity — she would be associated with information she knows to be misleading — and objectivity, since the number is chosen for its effect rather than its truth.\n\nShe should first put the correct treatment to the finance director in writing, with the standard's reasoning. If he insists, she should escalate to the audit committee or the board, and may take confidential advice from her professional body. If the entity still proceeds she must refuse to be associated with the misstatement, and resignation becomes the final safeguard. Each step, and its response, should be documented.",
          earns: [
            "The correct IFRS treatment stated before any ethical discussion",
            "A named user and the decision the misstated figure feeds",
            "Motive linked to a fact in the scenario, not asserted",
            "Principles applied individually to facts",
            "Actions in escalation order, ending with dissociation",
          ],
          loses: [
            "Listing all five principles with definitions and no facts",
            "Moralising ('this is wrong and unprofessional') without the technical anchor",
            "Jumping straight to resignation — the marker wants the graduated route",
            "Forgetting the accountant's own threats and discussing only the director's conduct",
          ],
        },
      ],
      check: {
        q: "An entity changes its depreciation method in the same period a loss threatens a covenant, producing a gain in reported profit. Management notes that the new method is permitted by IAS 16. What best captures the ethical position?",
        options: [
          "No issue — a permitted method cannot be unethical",
          "The permission is necessary but not sufficient: the change's timing and direction indicate it was made for its effect, which objectivity prohibits",
          "The change is unethical because depreciation methods may never be changed",
          "The change is acceptable if the auditors are informed",
        ],
        correct: 1,
        explain:
          "IAS 16 permits a change when the pattern of consumption of benefits has changed — a fact about the asset, not about the covenant. Compliance with the letter of a standard does not immunise a decision made to mislead; that is precisely the judgement-versus-bias line. Option 0 is the classic distractor: 'permitted' answers a different question from 'honest'.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Writing an ethics answer that never states the correct accounting treatment.",
      fix: "Anchor first: one or two sentences on what the standard requires, then build the ethical analysis on the gap.",
    },
    {
      trap: "Listing the five fundamental principles with textbook definitions.",
      fix: "Choose the two or three actually engaged and apply each one to a named fact in the scenario.",
    },
    {
      trap: "Treating 'the standard permits it' as the end of the ethical question.",
      fix: "Ask why this choice, in this period, in this direction — permission and honesty are different tests.",
    },
    {
      trap: "Recommending immediate resignation or whistleblowing as the first response.",
      fix: "Follow the graduated route: challenge with reasons, escalate internally, take professional advice, dissociate last.",
    },
  ],
  keyTerms: [
    { term: "Stewardship", def: "Management's accountability to owners for the resources entrusted to it — one of the purposes reported information serves." },
    { term: "Primary users", def: "Existing and potential investors, lenders and other creditors, who rely on general purpose financial reports because they cannot demand bespoke information." },
    { term: "Objectivity", def: "Making reporting judgements on evidence and analysis, uncontaminated by bias, conflict of interest or pressure." },
    { term: "Self-interest threat", def: "The risk that a personal stake — bonus, job security, reputation — inappropriately influences professional judgement." },
    { term: "Intimidation threat", def: "The risk that actual or perceived pressure, typically from a dominant senior figure, deters the accountant from acting properly." },
  ],
  summary: [
    "Reports are prepared by the people they measure, so their value rests on preparer honesty that audit can test but not replace.",
    "The fundamental principles become concrete in reporting judgements — objectivity over estimates does most of the work in SBR.",
    "Threats come paired in scenarios: self-interest and intimidation usually arrive together, and safeguards or escalation must follow their naming.",
    "Judgement becomes bias when direction, timing and asymmetric rigour all point at management's target.",
    "The rewarded answer structure is: correct treatment → who is misled → motive and threats → principles applied → actions in escalation order.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does SBR treat the direction of a misstatement as ethical evidence?", a: "Honest error scatters; bias clusters on the side that serves management's incentive. Judgements that consistently fall where the bonus or covenant needs them indicate intent." },
    { q: "Which fundamental principle is most often engaged by estimate scenarios, and why?", a: "Objectivity — standards require judgement over estimates, so estimates are where a chosen answer can be dressed as an honest one." },
    { q: "What is the graduated response to an unethical instruction?", a: "Challenge the instruction with technical reasons, escalate to the board or audit committee, take confidential advice from the professional body, and finally refuse association or resign — documenting every step." },
    { q: "How does the ethical duty extend to sustainability reporting?", a: "IFRS S1 and S2 disclosures rest on the same judgement-and-honesty problem as financial figures, and are harder for users to verify — so bias in a climate narrative is the same failure as bias in profit." },
  ],
  furtherStudy: [
    "SBR-02 examines the pressures and the creative-accounting toolkit this chapter's principles are tested against",
    "SBR-03 develops the consequences of unethical reporting for stakeholders and for the accountant",
    "Area B's chapters supply the Conceptual Framework reasoning an ethics answer anchors to",
    "Question two of every SBR exam pairs reporting implications with ethical implications — practise them together",
  ],
}

const SBR_TREE_02: StudyChapter = {
  paper: "SBR",
  id: "SBR-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A1(a)"],
  title: "Ethical pressure and creative accounting",
  minutes: 17,
  intro:
    "Every manipulated set of accounts starts with a reason. This chapter maps the incentives that bend reporting, the techniques they produce, and the routine that gets an accountant from 'I've been told to do this' to a defensible position.",
  outcomes: [
    "Trace a proposed treatment back to the incentive that produced it, using the scenario's own facts",
    "Recognise the classic earnings-management techniques and name the standard each one abuses",
    "Explain why creative accounting escalates period on period rather than staying small",
    "Apply a structured resolution routine to an ethical conflict, from challenge through to dissociation",
    "Write the 'what should the accountant do' half of question two so that it earns its marks",
  ],
  sections: [
    {
      id: "why-management-bends",
      heading: "The incentives that bend the numbers",
      blocks: [
        {
          kind: "text",
          md: "SBR scenarios rarely announce a fraud; they plant an incentive and let you find it. The reliable ones are few enough to learn. **Compensation** — bonuses and share awards tied to profit, EPS or revenue targets. **Debt** — covenants on gearing, interest cover or net assets, where a breach triggers renegotiation or default. **Capital markets** — a listing, rights issue or sale process that a good-looking year would price higher. **Expectations** — the analyst consensus a CEO has publicly promised to beat. **Job security** — a new CFO clearing the decks, or an old one whose story cannot survive a bad year.",
        },
        {
          kind: "text",
          md: "The incentive tells you where to look. Bonus targets produce revenue and profit games; covenants produce classification and off-balance-sheet games, because the ratio is the target rather than the profit; a sale process produces both plus optimistic fair values. When an exhibit gives you the incentive, the marker expects the connection made explicitly: *the proposed treatment increases interest cover, which is the covenant under pressure* is a scoring sentence.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "Follow the incentive to the technique",
            data: {
              centre: "Pressure on reported numbers",
              nodes: [
                { label: "Bonus and share awards", sub: "Revenue and profit inflation" },
                { label: "Loan covenants", sub: "Classification and off-balance-sheet" },
                { label: "Listing or sale", sub: "Optimistic fair values, polished trend" },
                { label: "Analyst expectations", sub: "Smoothing to the consensus" },
                { label: "New management", sub: "Big-bath write-offs to reset the base" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The 'new CFO big bath' reads the other way",
          md: "Most manipulation flatters the current year — but incoming management is tempted to *overstate* losses: write everything off, blame the predecessors, and enjoy the flattering rebound the reversal of over-provisions will fund. Direction of benefit still exposes it; the beneficiary is simply next year's story rather than this year's.",
        },
      ],
      check: {
        q: "An entity close to its gearing covenant proposes to classify a new obligation as equity and a sale-and-leaseback as an outright sale. Which incentive best explains this pair of choices?",
        options: [
          "A profit-linked bonus scheme, because both treatments increase profit",
          "The covenant, because both treatments improve the balance-sheet ratio regardless of their profit effect",
          "Analyst expectations, because both treatments smooth earnings",
          "Tax minimisation, because both treatments reduce taxable profit",
        ],
        correct: 1,
        explain:
          "Neither choice is primarily about profit — both work on the statement of financial position, which is what a gearing covenant measures. That is the diagnostic habit the paper rewards: identify the metric under pressure, then check that the proposed treatments move that metric. Choices that would puzzle a profit-focused reading make immediate sense against the ratio.",
      },
    },
    {
      id: "the-toolkit",
      heading: "The creative-accounting toolkit, standard by standard",
      blocks: [
        {
          kind: "text",
          md: "Creative accounting is rarely invention; it is the misuse of room the standards legitimately leave. Each classic technique has a standard whose judgement it abuses, and naming that standard is what turns an ethics point into an SBR answer.",
        },
        {
          kind: "table",
          caption: "Technique, mechanism, and the standard it abuses",
          head: ["Technique", "How it works", "Where the standard pushes back"],
          rows: [
            ["Premature revenue", "Recognise before control transfers — channel stuffing, sale or return, bill-and-hold", "IFRS 15's control model and constraint on variable consideration"],
            ["Provision games", "Over-provide in good years, release in bad ones; or omit a provision that is genuinely probable", "IAS 37's present-obligation and best-estimate tests"],
            ["Big bath", "Bundle exaggerated write-offs into one already-bad year to flatter the future", "IAS 36's evidence-based impairment; IAS 8's error discipline"],
            ["Classification games", "Dress financing as operating cash flow, debt as equity, recurring costs as one-off", "IAS 7, IAS 32's substance tests, IFRS 18 presentation and MPM discipline"],
            ["Off-balance-sheet structures", "Park debt or assets in vehicles the entity in substance controls", "IFRS 10's control model looks at returns and power, not legal form"],
            ["Optimistic estimates", "Discount rates, growth rates, ECLs and fair values chosen for their answer", "IFRS 13's market-participant view; IAS 36 and IFRS 9 disclosure of sensitivity"],
          ],
        },
        {
          kind: "text",
          md: "Two features make the toolkit examinable. First, **every technique leaves a trace in the notes** — thinning disclosure, a changed assumption, a reconciliation that no longer reconciles — and SBR exhibits plant those traces. Second, **techniques compound**: premature revenue this year becomes a shortfall next year, which needs a bigger intervention, which is why manipulation escalates rather than staying a one-off. A scenario that shows a small historic adjustment plus current pressure is showing you the escalator, and saying so earns analysis marks.",
        },
        {
          kind: "illustration",
          title: "The escalator in one company",
          md: "Year one: a genuine shortfall of $1m is covered by holding the period open a week — small, rationalised as timing. Year two starts $1m short before trading begins, and the target has risen; covering both takes channel stuffing with extended return rights. Year three opens with returns flowing back in and a receivables balance ageing visibly, so the entity turns to a structure — sales to a reseller it quietly finances. Each step was 'one last time'. The lesson the examiner wants drawn is that the first accommodation is the decision; everything after it is arithmetic.",
        },
      ],
      check: {
        q: "A retailer facing a poor year writes off its entire IT asset base, doubles every restructuring provision, and impairs goodwill to zero, explaining that the market 'expects a kitchen-sink year'. Profit rebounds strongly the following year. What is the most precise objection?",
        options: [
          "None — prudence supports recognising losses early",
          "The write-offs exceed what the evidence supports, converting future costs into this year's loss and manufacturing next year's rebound — misstating both periods",
          "Impairments may not be recognised in a loss-making year",
          "The treatment is acceptable if disclosed as an alternative performance measure",
        ],
        correct: 1,
        explain:
          "Prudence in the Framework is caution under uncertainty, not deliberate overstatement of losses — asymmetric 'caution' this year is what funds the flattering reversal next year, so both years mislead. Options 2 and 3 are invented rules: impairment follows evidence whenever it arises, and disclosure does not launder a misstatement.",
      },
    },
    {
      id: "resolution-routine",
      heading: "From instruction to defensible position",
      blocks: [
        {
          kind: "text",
          md: "When the scenario puts the instruction on the accountant's desk, the marker wants a routine, not an outburst. The routine has a fixed order because each step both protects the accountant and gives the entity a chance to correct itself before the stakes rise.",
        },
        {
          kind: "list",
          style: "number",
          title: "The resolution routine",
          items: [
            "**Establish the facts and the technical position** — what does the standard require, and is the proposal actually non-compliant or merely aggressive-but-arguable? The routes differ.",
            "**Identify who is affected and how** — users, colleagues who would inherit the problem, the entity itself.",
            "**Name your threats** — usually self-interest and intimidation — and consider the safeguards available.",
            "**Challenge with reasons, in writing** — put the correct treatment and its basis to the person instructing you.",
            "**Escalate internally** — finance director, then audit committee or board; use any ethics hotline the governance structure provides.",
            "**Take advice** — the professional body's confidential helpline, or legal advice where fraud or regulatory breach is in play.",
            "**Dissociate** — refuse to prepare or sign the misleading information; resignation is the last safeguard, documented like the rest.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Confidentiality survives resignation",
          md: "Walking out does not license walking to the press. Confidentiality continues after the employment ends, and disclosure to regulators is governed by law and professional guidance, not by grievance. An answer that ends 'and report the company to the media' has replaced one ethical breach with another.",
        },
        {
          kind: "examQuestion",
          title: "Advise the accountant facing an instruction to misstate",
          format: "written",
          marks: 10,
          requirement: "Discuss the ethical issues for the group accountant and advise on the actions she should take.",
          plan: [
            { step: "Separate the technical from the ethical", detail: "First establish that the instructed treatment is wrong under the relevant standard — if it is defensible, the problem is judgement pressure, not misstatement, and the answer changes." },
            { step: "Read the power structure", detail: "Who instructs, who appraises, who else knows? The scenario's org-chart facts feed the intimidation analysis and determine the escalation route." },
            { step: "Apply principles to her position", detail: "Integrity (association with misleading information), objectivity (pressure on her judgement), competence (letting a known misstatement stand)." },
            { step: "Sequence the actions", detail: "Written challenge → audit committee → professional body advice → dissociation. Note documentation at every step." },
            { step: "Address the consequence she fears", detail: "The marker rewards acknowledging the real cost — her job — and stating why the principles still hold: association would make the misstatement hers." },
          ],
          answer:
            "The consolidation adjustment she has been told to omit is required by IFRS 10; omitting it overstates group profit, and the chief financial officer's instruction is explicitly linked to the refinancing. The treatment is therefore a misstatement made for its effect on lenders, not a judgement on which reasonable preparers differ.\n\nFor the group accountant the instruction creates an intimidation threat — the CFO controls her role and has framed compliance as loyalty — and a self-interest threat, since refusing may cost her the promotion she has been offered. Preparing the consolidation as instructed would associate her with information she knows to be misleading, breaching integrity, and would substitute the CFO's required answer for her own judgement, breaching objectivity.\n\nShe should first set out to the CFO, in writing, the treatment IFRS 10 requires and the effect of the omission. If he maintains the instruction she should escalate to the audit committee, whose function includes exactly this challenge, and may seek confidential advice from her professional body. She should document each conversation contemporaneously.\n\nIf the group nonetheless issues the misleading consolidation she must decline to be associated with it, and resignation becomes the final safeguard. The personal cost is real, but preparing the figures would make the misstatement her own: the lenders pricing the refinancing would be relying on her work.",
          earns: [
            "The IFRS anchor stated before the ethics",
            "Threats tied to the scenario's power structure",
            "A sequenced escalation ending in dissociation",
            "Documentation mentioned as a running safeguard",
            "The personal cost acknowledged and answered",
          ],
          loses: [
            "Generic 'she should be ethical' assertions with no actions",
            "Escalating outside the entity before any internal route is used",
            "Treating resignation as step one",
            "Ignoring the refinancing — the fact that tells you who is harmed",
          ],
        },
      ],
      check: {
        q: "An accountant challenges an improper treatment in writing; the finance director rejects the challenge. The entity has an audit committee of independent non-executives. What is the next step the routine requires?",
        options: [
          "Resign immediately to avoid association",
          "Report the entity to its regulator",
          "Escalate to the audit committee, documenting the referral",
          "Accept the decision — the finance director outranks her",
        ],
        correct: 2,
        explain:
          "The internal governance route exists precisely for this, and using it gives the entity the chance to correct itself while protecting the accountant's position. Resignation and regulatory disclosure sit later in the sequence; hierarchy (option 3) is an explanation of the pressure, not a defence to association with a misstatement.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Spotting the manipulation but not the incentive that explains it.",
      fix: "Tie the treatment to the metric under pressure — bonus, covenant, valuation — using a fact from the exhibit.",
    },
    {
      trap: "Calling every aggressive judgement a fraud.",
      fix: "Grade it: defensible judgement, bias within the standard's room, or non-compliance — the advice differs for each.",
    },
    {
      trap: "Writing the resolution routine as a list of everything simultaneously.",
      fix: "Sequence it — challenge, escalate, advise, dissociate — and say why the order protects both accountant and entity.",
    },
    {
      trap: "Ending an answer with disclosure to the press or a public denunciation.",
      fix: "Confidentiality survives the dispute; external disclosure runs through regulators and legal advice, not the media.",
    },
  ],
  keyTerms: [
    { term: "Earnings management", def: "Using the judgement room in standards to steer reported results towards a target rather than towards faithful representation." },
    { term: "Big bath", def: "Deliberately overstating losses in an already-poor period so that reversals and a lowered base flatter future results." },
    { term: "Channel stuffing", def: "Pushing excess goods to distributors near period end, with return rights or incentives, to recognise revenue early." },
    { term: "Off-balance-sheet finance", def: "Structuring obligations so that debt an entity in substance bears does not appear on its statement of financial position." },
    { term: "Dissociation", def: "The accountant's refusal to prepare, sign or be linked with information known to be misleading — the final safeguard after challenge and escalation." },
  ],
  summary: [
    "Find the incentive first: bonuses drive profit games, covenants drive balance-sheet games, transactions drive valuation games.",
    "Each classic technique abuses a specific standard's judgement room — name the standard to convert the point into marks.",
    "Manipulation escalates because each period inherits the last one's borrowed performance.",
    "The resolution routine is sequenced: written challenge, internal escalation, professional advice, dissociation — documented throughout.",
    "Confidentiality survives both the dispute and the employment; external disclosure is a legal route, not a personal one.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do covenant scenarios produce different techniques from bonus scenarios?", a: "Covenants measure balance-sheet ratios, so the games are classification and off-balance-sheet structures; bonuses measure profit or revenue, so the games are recognition and estimates." },
    { q: "What single feature exposes a big bath as manipulation rather than prudence?", a: "Evidence: write-offs beyond what the facts support, whose later reversal funds the rebound — prudence is caution under uncertainty, not deliberate overstatement of losses." },
    { q: "Why does the resolution routine escalate internally before externally?", a: "Internal governance — the audit committee especially — exists to correct exactly this, and using it protects the accountant while giving the entity the chance to fix the reporting before harm reaches users." },
    { q: "What does 'techniques compound' mean and why does it matter in an answer?", a: "Borrowed performance must be repaid next period, so each intervention needs a larger successor; a scenario showing past small adjustments plus present pressure is showing the escalator, and naming it demonstrates analysis." },
  ],
  furtherStudy: [
    "SBR-01 supplies the principles and threats this chapter's routine applies",
    "SBR-03 follows the consequences when the routine fails and misreporting reaches users",
    "The revenue, provisions and instruments chapters in Area C teach the standards each technique abuses",
    "Area C's fair value and impairment chapters cover the estimate judgements most often biased",
  ],
}

const SBR_TREE_03: StudyChapter = {
  paper: "SBR",
  id: "SBR-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A1(b)"],
  title: "The consequences of unethical reporting",
  minutes: 15,
  intro:
    "The syllabus asks one deceptively simple thing here: assess what unethical behaviour by management actually costs. The answer runs from a mispriced share to a collapsed company — and question two expects you to trace it stakeholder by stakeholder.",
  outcomes: [
    "Trace the harm from a misstatement to each class of stakeholder and the decision it corrupts",
    "Explain how misreporting destroys the entity's own access to capital, credit and talent",
    "Set out the regulatory, professional and personal consequences that follow discovery",
    "Explain why concealment compounds original misconduct once misreporting starts",
    "Structure the consequences half of an SBR ethics requirement so each consequence is tied to a scenario fact",
  ],
  sections: [
    {
      id: "harm-by-stakeholder",
      heading: "Who is harmed, and through which decision",
      blocks: [
        {
          kind: "text",
          md: "A misstatement does its damage through the decisions built on it. That is why the strongest consequence analysis is organised by **stakeholder and decision**, not by adjective: name the user, name the decision the false figure feeds, and the harm states itself.",
        },
        {
          kind: "table",
          caption: "The harm map question two rewards",
          head: ["Stakeholder", "Decision corrupted", "The harm"],
          rows: [
            ["Investors", "Buy, hold or sell at a price reflecting reported performance", "Wealth transfers from outsiders to insiders trading on the truth; losses crystallise on restatement"],
            ["Lenders", "Advance funds and price risk on covenant metrics", "Credit extended at a price that never reflected the real risk; security and recovery prospects misjudged"],
            ["Employees and pension scheme", "Stay, invest careers and savings in the entity's health", "Jobs and retirement funds exposed to a weaker entity than reported"],
            ["Suppliers and customers", "Extend trade credit, commit to long-term contracts", "Counterparty risk taken unknowingly; supply chains hurt on failure"],
            ["Governments and society", "Tax, regulate and rely on markets allocating capital honestly", "Revenue misstated to authorities; capital misallocated to the dishonest entity's advantage"],
          ],
        },
        {
          kind: "text",
          md: "Beyond the named parties stands the market itself. Trust in reported information is what lets capital flow at reasonable cost to entities strangers have never met; every exposed manipulation raises the scepticism — and therefore the price — applied to everyone else's honest reports. This is the public-interest dimension the syllabus points at: the accountant's duty runs to the reliability of reporting as a system, not only to this period's readers.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Tie each harm to a scenario fact",
          md: "Generic harm lists score generically. The exhibit will tell you who is exposed — a refinancing in progress means lenders, a planned float means incoming investors, a large defined-benefit scheme means employees. Two or three harms with named victims and live decisions beat six abstractions every time.",
        },
      ],
      check: {
        q: "An entity overstates profit during a period in which its founders sell 30% of their shares to new investors. Which statement most precisely captures the harm to those investors?",
        options: [
          "They may feel misled, which damages the entity's reputation",
          "They paid a price reflecting reported performance that did not exist — a direct wealth transfer to the sellers who knew the truth",
          "They will be unable to sell their shares in future",
          "No harm arises unless the entity later becomes insolvent",
        ],
        correct: 1,
        explain:
          "The mechanism matters: price formed on false figures moves real money at the moment of the trade, from the misled buyers to the informed sellers. Options 0 and 3 defer or dilute the harm — reputation and insolvency are additional consequences, not the core one — and option 2 invents a different injury.",
      },
    },
    {
      id: "what-discovery-triggers",
      heading: "What discovery triggers — entity, directors, accountant",
      blocks: [
        {
          kind: "text",
          md: "For the **entity**, discovery usually begins with restatement of prior periods under IAS 8 — a public admission that previous reports cannot be relied on. What follows is commercial as much as legal: lenders reprice or call facilities, the share price absorbs both the correction and a lasting credibility discount, regulators investigate, listing authorities may suspend, insurers and counterparties retreat, and recruitment of a credible CFO and non-executives becomes harder precisely when it matters most.",
        },
        {
          kind: "text",
          md: "For **directors and management**, consequences range from dismissal and clawback of incentive pay through regulatory fines and disqualification from office to, where dishonesty is proved, criminal prosecution for fraud or false accounting. For a **professional accountant** involved, the professional body's disciplinary process runs alongside: investigation, fines, suspension or exclusion from membership — the loss of the qualification that makes the career possible. An accountant who merely *stayed silent* can face discipline for association; the Code does not require authorship, only association, for the breach.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The usual sequence after discovery",
            data: {
              steps: [
                { label: "Restatement", sub: "IAS 8 prior period error, publicly corrected" },
                { label: "Market response", sub: "Repricing, credibility discount, funding stress" },
                { label: "Regulatory action", sub: "Investigation, fines, listing consequences" },
                { label: "Personal consequences", sub: "Dismissal, clawback, disqualification, prosecution, professional discipline" },
              ],
            },
          },
        },
        {
          kind: "illustration",
          title: "Why concealment outgrows the original sin",
          md: "Most corporate reporting scandals follow the same arc: the initial misstatement is modest, but sustaining it requires new and larger interventions each period, and eventually the concealment — falsified confirmations, misled auditors, backdated documents — constitutes offences graver than the original overstatement. When a scenario shows an entity two or three periods into a scheme, the consequence analysis should say this: the choice is no longer between confession and continuation at the original size, because the scheme has grown, and every additional period adds counts to the eventual reckoning.",
        },
      ],
      check: {
        q: "A group accountant did not design the CFO's misstatement but processed the entries knowing their purpose, reasoning that responsibility lay with the CFO who instructed them. On discovery, what is her professional position?",
        options: [
          "Safe — professional discipline requires having designed the scheme",
          "Exposed — knowingly being associated with misleading information is itself a breach, and following instructions is not a defence",
          "Safe if the auditors also failed to detect the misstatement",
          "Exposed only if she personally profited",
        ],
        correct: 1,
        explain:
          "The integrity principle prohibits association with information the accountant knows to be misleading — processing entries with knowledge of their purpose is association. Instruction, audit failure and absence of personal profit may mitigate sanction but none of them removes the breach. This is exactly why the resolution routine in SBR-02 ends with dissociation.",
      },
    },
    {
      id: "writing-the-consequences-half",
      heading: "Writing consequences for marks in question two",
      blocks: [
        {
          kind: "text",
          md: "SBR's second question pairs the reporting implications of specific events with their ethical implications, and the consequence analysis is where weaker answers dissolve into adjectives. The discipline that scores: for each consequence, a **victim or forum** (a named stakeholder, a regulator, the professional body), a **mechanism** (the decision corrupted or process triggered), and where possible a **scenario fact** that makes it live rather than theoretical.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "A consequence paragraph that earns",
          items: [
            "**Anchor**: the misstatement and its size or direction, from your reporting analysis",
            "**Users harmed**: the two or three the exhibit makes live, each with the decision corrupted",
            "**Entity consequences**: restatement, funding and credibility effects — tied to any live transaction in the scenario",
            "**Personal and professional consequences**: for the directors and for the accountant, including discipline for association",
            "**The compounding point**: why delay raises the cost of every option except correction",
          ],
        },
        {
          kind: "examQuestion",
          title: "Assess the consequences of the directors' behaviour",
          format: "written",
          marks: 6,
          requirement: "Assess the potential consequences of the directors' behaviour for the company and its stakeholders.",
          plan: [
            { step: "State what was misreported", detail: "One sentence from your technical analysis — the anchor every consequence hangs on." },
            { step: "Pick the live stakeholders", detail: "Scan the scenario for transactions in motion: refinancing, float, acquisition, pension scheme. Those name your victims." },
            { step: "Trace decision-level harm", detail: "For each stakeholder: the decision made on false figures and what that costs them." },
            { step: "Turn to the entity and the individuals", detail: "Restatement, repricing and credibility for the company; dismissal, disqualification, discipline and prosecution for those responsible." },
            { step: "Close on compounding", detail: "Why continuation is the most expensive option on the table." },
          ],
          answer:
            "The overstated profit misled two groups whose decisions were live during the period. The bank advanced the new facility on interest-cover figures that did not exist, so it bears credit risk it never priced; on restatement it is likely to reprice or call the facility precisely when the company can least refinance. Employees whose share-save scheme bought at the inflated price have transferred part of their savings to better-informed sellers.\n\nFor the company, correction means an IAS 8 restatement announcing that prior reports cannot be relied on. The predictable sequel is a credibility discount in the share price beyond the arithmetic correction, regulatory investigation, and a lasting rise in its cost of borrowing — lenders reprice dishonesty, not just risk.\n\nThe directors face dismissal, clawback of profit-linked bonuses, regulatory fines and potential disqualification; if dishonest intent is established, prosecution for false accounting follows. The finance director, as a professional accountant, additionally faces his body's disciplinary process and potential exclusion.\n\nEvery further period of concealment enlarges all of this: the misstatement must grow to sustain itself, and the concealment itself becomes the graver misconduct. The cheapest available consequence is the earliest correction.",
          earns: [
            "Stakeholders chosen from the scenario's live transactions",
            "Harm expressed through the corrupted decision, not adjectives",
            "Entity, director and professional consequences separated",
            "The compounding point made explicitly",
          ],
          loses: [
            "A generic list of every conceivable stakeholder",
            "'Reputational damage' asserted without a mechanism",
            "Omitting the professional-body consequence for a qualified accountant",
            "No link back to the technical misstatement being discussed",
          ],
        },
      ],
      check: {
        q: "In a consequences answer, why is 'the bank advanced the facility on interest cover that did not exist' stronger than 'the company's reputation with lenders will suffer'?",
        options: [
          "It is longer and uses more technical vocabulary",
          "It names the victim, the corrupted decision and the mechanism of harm, tied to a live scenario fact — the reputational point is a conclusion without a mechanism",
          "Banks are more important stakeholders than others",
          "It avoids mentioning reputation, which markers penalise",
        ],
        correct: 1,
        explain:
          "The difference is analytical machinery: victim, decision, mechanism, fact. Reputation is real but it is the *result* of such mechanisms — stated alone it is an assertion. Option 3 overcorrects: reputation can appear, but as a consequence of a traced harm rather than a substitute for one.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Writing consequence lists made of adjectives — 'reputational damage, loss of trust, fines'.",
      fix: "Give each consequence a victim or forum, a mechanism, and a scenario fact that makes it live.",
    },
    {
      trap: "Forgetting the professional accountant's own exposure.",
      fix: "Where a qualified accountant is involved, discipline for association — up to exclusion — belongs in the answer.",
    },
    {
      trap: "Treating harm as arising only if the entity collapses.",
      fix: "The harm happens at the decision built on false figures: a mispriced trade or misjudged loan is complete harm on its own.",
    },
    {
      trap: "Ignoring time — analysing the misstatement as a single event.",
      fix: "Make the compounding point: sustaining a misstatement requires growing it, and concealment becomes the graver misconduct.",
    },
  ],
  keyTerms: [
    { term: "Prior period error", def: "A misstatement in issued financial statements arising from failure to use reliable information that was available — corrected retrospectively with restatement under IAS 8." },
    { term: "Restatement", def: "The public correction of previously issued financial statements, signalling that they could not be relied upon." },
    { term: "Clawback", def: "Recovery of incentive pay from executives when the results it rewarded prove to have been misstated." },
    { term: "Disqualification", def: "A regulatory or court order barring an individual from acting as a company director for a period." },
    { term: "Association", def: "The Code's test for an accountant's link to misleading information — preparing, signing or knowingly facilitating it, regardless of who designed it." },
  ],
  summary: [
    "Harm runs through decisions: name the stakeholder, the decision corrupted and the mechanism, anchored to a scenario fact.",
    "The market-level harm — costlier capital for every honest entity — is the public-interest point the syllabus expects.",
    "Discovery triggers restatement, repricing and regulatory action for the entity; dismissal, clawback, disqualification and prosecution for individuals.",
    "A professional accountant is exposed by association, not only authorship — silence while processing known misstatements is a breach.",
    "Concealment compounds: the misstatement must grow to survive, so the earliest correction is always the cheapest consequence available.",
  ],
  knowledgeDiagnostic: [
    { q: "What three elements make a consequence point score?", a: "A named victim or forum, the mechanism — the decision corrupted or process triggered — and a scenario fact that makes it live." },
    { q: "When does the harm from a misstatement occur?", a: "At each decision built on the false figures — a trade priced, a loan advanced — not only if the entity later fails." },
    { q: "What exposure does an accountant who only processed the entries face?", a: "Professional discipline for association with misleading information: knowledge plus facilitation is the breach; instruction from above mitigates sanction, not liability." },
    { q: "Why does the consequence analysis end with the compounding point?", a: "Because misreporting must grow to sustain itself and concealment becomes the graver misconduct — which is why early correction is the least costly path, the advice the answer should land on." },
  ],
  furtherStudy: [
    "SBR-01 and SBR-02 supply the principles, pressures and resolution routine these consequences enforce",
    "Area C's chapter on accounting policies, estimates and errors covers the IAS 8 restatement machinery discovery triggers",
    "Area E's chapters show the analyst's view — how users detect the earnings quality problems this area names",
    "Question two of every sitting pairs these consequences with live reporting implications — practise the pairing",
  ],
}

export const SBR_TREE_AREA_A: StudyChapter[] = [SBR_TREE_01, SBR_TREE_02, SBR_TREE_03]
