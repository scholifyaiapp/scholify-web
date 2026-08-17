import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area D — Risk.
 *
 * The shim served the whole of Area D from three sections of legacy chapter
 * SBL_C, taking `outcomes.slice(0, 3)` — and gave the OTHER half of the same
 * chapter to Area F. Two syllabus areas were therefore two slices of one body of
 * text. Area D has fifteen learning outcomes between D1 and D2, and Kaplan gives
 * risk 90 pages across two chapters.
 *
 *   SBL-18  Risk, strategy and enterprise risk management  (D1a, D1b, D1d, D1f)
 *   SBL-19  Assessing and measuring risk                   (D1c, D1e, D1g, D1h)
 *   SBL-20  Managing and mitigating risk: TARA and ALARP    (D2a, D2b, D2d, D2e, D2f)
 *   SBL-21  Risk culture and assurance mapping              (D2c, D2g)
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text. Note that
 * D2(g) — assurance mapping and the four lines of defence — postdates the
 * 2021-22 provider texts, so it is authored from the syllabus alone.
 */

const SBL_TREE_18: StudyChapter = {
  paper: "SBL",
  id: "SBL-18",
  number: 18,
  area: "D",
  syllabusRefs: ["D1(a)", "D1(b)", "D1(d)", "D1(f)"],
  title: "Risk, strategy and enterprise risk management",
  minutes: 17,
  intro:
    "Risk management is not a department that says no. It is the discipline that tells a board how much of a chosen strategy it can actually afford to carry — which is why this chapter starts with the link between the two.",
  outcomes: [
    "Explain how an organisation's strategy and its approach to risk depend on each other",
    "Apply an enterprise-wide approach to risk management and to establishing risk systems",
    "Distinguish strategic from operational risk, and say why the distinction changes who acts",
    "Explain how risk varies with an organisation's size, structure, sector and stage of development",
  ],
  sections: [
    {
      id: "strategy-and-risk",
      heading: "Why strategy and risk are one conversation",
      blocks: [
        {
          kind: "text",
          md: "Every strategy is a decision to accept particular risks in exchange for particular returns. A growth strategy funded by debt accepts financial risk; entering a new territory accepts political and currency risk; automating a process accepts implementation and cyber risk while reducing labour-cost risk. So risk management cannot sensibly be a separate exercise performed after the strategy is chosen — the risk profile *is* a description of the strategy.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two-way relationship, which is what D1(a) is asking for",
          md: "Strategy determines the risks the organisation faces. Equally, the organisation's **capacity and appetite for risk** determine which strategies are available to it: a business with thin cash headroom and covenant pressure cannot pursue a strategy whose payoff arrives in year four, however attractive it looks. Say both directions — most answers give only the first.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Where risk belongs in the strategic cycle",
            data: {
              steps: [
                { label: "Objectives", sub: "What we are trying to achieve" },
                { label: "Options", sub: "Routes available" },
                { label: "Risk of each option", sub: "Exposure created, and by whom borne" },
                { label: "Appetite and capacity", sub: "How much we are willing and able to carry" },
                { label: "Choice", sub: "The option whose risk we can afford" },
                { label: "Monitor and revise", sub: "Risk changes as the strategy runs" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Two terms are worth keeping apart, because cases exploit the difference. **Risk appetite** is how much risk an organisation is *willing* to accept in pursuit of its objectives — a matter of choice, set by the board. **Risk capacity** is how much it could *survive* — a matter of fact, determined by cash, capital, covenants and insurance. An organisation whose appetite exceeds its capacity is the setup for a great many SBL scenarios, and naming that mismatch is often the central finding.",
        },
        {
          kind: "text",
          md: "**Risk attitude** adds the human layer: individuals within the organisation are risk-averse, risk-neutral or risk-seeking, and their attitudes shape decisions regardless of stated policy. A founder-chief executive with a high personal appetite will pursue exposures the board's own policy excludes — and the mechanism is usually that nobody has quantified the exposure against a stated limit.",
        },
      ],
      check: {
        q: "A board's risk policy caps exposure at a level the proposed acquisition would exceed, but the chief executive argues the opportunity is too good to miss. What is the core issue to put to the board?",
        options: [
          "The chief executive is being irresponsible and should be overruled",
          "Appetite is the board's to set and capacity is a matter of fact — the board must either revise the policy explicitly, with reasons, or decline the acquisition; it cannot simply ignore its own limit",
          "The policy should be suspended for attractive opportunities",
          "Risk policies are advisory and need not constrain strategic decisions",
        ],
        correct: 1,
        explain:
          "The defect is not the ambition but the silent breach: a limit that bends whenever a proposal is attractive is not a limit at all. The board may legitimately change its appetite — that is its decision — but it must do so openly and against its capacity, not by exception.",
      },
    },
    {
      id: "erm",
      heading: "Enterprise risk management",
      blocks: [
        {
          kind: "text",
          md: "An enterprise-wide approach treats risk as a portfolio held by the whole organisation, rather than as a set of separate problems each managed inside its own function. D1(b) asks you to apply it, so the useful thing to know is what changes when an organisation adopts it.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Siloed against enterprise-wide",
            data: {
              leftTitle: "Risk managed in silos",
              rightTitle: "Enterprise-wide",
              rows: [
                { aspect: "Scope", left: "Each function manages its own risks", right: "One view across the whole organisation" },
                { aspect: "Aggregation", left: "Nobody sees the total", right: "Exposures are added up and compared to capacity" },
                { aspect: "Correlation", left: "Missed — two 'small' risks share one cause", right: "Common causes and correlations identified" },
                { aspect: "Ownership", left: "Whoever noticed it", right: "Named owner for each significant risk" },
                { aspect: "Appetite", left: "Implicit and inconsistent", right: "Set by the board and applied consistently" },
                { aspect: "Upside", left: "Risk treated only as threat", right: "Opportunity considered alongside downside" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Aggregation is the whole argument for ERM",
          md: "Ten risks each judged tolerable in isolation may be intolerable together, especially if they share a driver. A supplier concentration risk, a currency risk and a credit risk can all trace back to a single overseas region — so one political event triggers all three at once. Only an enterprise view sees that, which is why siloed risk management fails precisely when it matters most.",
        },
        {
          kind: "list",
          style: "number",
          title: "Establishing a risk management system",
          items: [
            "**Board sets appetite** and the framework, and takes responsibility for it",
            "**Identify** risks systematically — by process, by objective, by scenario, and from external sources",
            "**Assess** each for severity and probability, and record it with an owner",
            "**Respond** using a consistent set of strategies, proportionate to the exposure",
            "**Embed** the responses in normal operations — controls, limits, approvals, incentives",
            "**Monitor and report** — register, heat map, key risk indicators, escalation route",
            "**Review** the framework itself, and test whether it caught what actually happened",
          ],
        },
        {
          kind: "text",
          md: "The last step is where SBL cases usually fail. An organisation has a register, a committee and a policy — and the loss that occurred was not on the register, or was on it and rated low. The finding is then about the *process* for identifying and rating risk, not about the specific loss: a framework that did not see this coming will not see the next one either.",
        },
      ],
      check: {
        q: "A company's supplier concentration, currency exposure and customer credit risk all relate to one overseas region, and each was individually rated 'moderate'. What does an enterprise-wide view add?",
        options: [
          "Nothing — each risk has already been assessed and rated",
          "That the three are correlated through a common cause, so a single regional event triggers all of them together and the aggregate exposure may exceed capacity",
          "That each rating should be increased to high",
          "That the company should exit the region entirely",
        ],
        correct: 1,
        explain:
          "Correlation through a shared driver is exactly what silos cannot see. The individual ratings may each be right; the error is that nobody added them up, so the combined exposure was never compared with what the organisation could survive.",
      },
    },
    {
      id: "strategic-operational",
      heading: "Strategic and operational risk, and how risk varies",
      blocks: [
        {
          kind: "table",
          caption: "Two categories, two different responses",
          head: ["Feature", "Strategic risk", "Operational risk"],
          rows: [
            ["Source", "The choices made about direction and position", "Processes, people, systems and external events in delivery"],
            ["Effect", "Threatens the viability of the strategy or organisation", "Threatens performance, cost or service in the near term"],
            ["Horizon", "Years; often slow to become visible", "Immediate or short term"],
            ["Owner", "The board", "Operational management, within delegated limits"],
            ["Response", "Change the strategy, or accept and monitor deliberately", "Controls, procedures, training, insurance, continuity plans"],
            ["Example", "Backing a technology the market abandons", "A payment control failure; a warehouse fire"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The distinction decides who must act — get it wrong and the recommendation goes to the wrong person",
          md: "Recommending better controls for a strategic risk is a category error: no control procedure protects a company that has chosen the wrong market. Equally, escalating every operational failure to the board wastes the board's limited attention and undermines delegation. Say which kind of risk you are describing, and therefore who owns the response.",
        },
        {
          kind: "text",
          md: "Note also that operational risks can *aggregate into* a strategic one. Repeated service failures are individually operational; sustained they destroy the reputation on which a differentiation strategy depends, at which point they have become strategic. Spotting that escalation in a case is a strong observation.",
        },
        {
          kind: "text",
          md: "D1(f) asks how risk varies with the organisation. It is worth being concrete about this, because it explains why a recommendation that suits one case would be wrong in another.",
        },
        {
          kind: "table",
          caption: "What changes the risk profile",
          head: ["Factor", "Effect on risk"],
          rows: [
            ["Size", "Larger organisations absorb shocks but carry complexity and slower response; small ones are agile and fragile"],
            ["Structure", "Diversified groups spread risk; single-site or single-product organisations concentrate it"],
            ["Industry", "Regulated industries carry compliance risk; technology-driven ones carry obsolescence risk"],
            ["Sector", "Public bodies face political and funding risk rather than insolvency; charities face donor-dependency risk"],
            ["Stage of development", "Start-ups face survival and financing risk; mature organisations face drift and disruption risk"],
            ["Gearing and liquidity", "High debt reduces capacity to absorb any risk at all, whatever its source"],
          ],
        },
        {
          kind: "text",
          md: "Risk is also **dynamic**: the profile changes as the organisation and its environment change, so an assessment has a shelf life. A register reviewed annually in a fast-moving sector is describing last year's organisation — and where a case gives you the review frequency, comparing it to the pace of change in that industry is a fair and easily-made point.",
        },
      ],
      check: {
        q: "Persistent delivery failures over two years have begun to cost a company contracts in the premium segment its strategy depends on. How is this best characterised?",
        options: [
          "Purely operational — the response is tighter process control",
          "Operational failures that have aggregated into a strategic risk, because they now threaten the differentiation the strategy relies on; the board must own it as well as management",
          "Purely strategic — the delivery process is irrelevant",
          "A compliance matter for the risk function",
        ],
        correct: 1,
        explain:
          "The failures began operational and became strategic once they attacked the basis of competitive position. That escalation changes the owner: management still fixes the process, and the board must now treat the reputational exposure as a strategic matter.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating risk management as an exercise performed after the strategy is chosen.", fix: "The risk profile describes the strategy; and capacity limits which strategies are available at all." },
    { trap: "Confusing risk appetite with risk capacity.", fix: "Appetite is willingness and is the board's choice; capacity is what the organisation could survive and is a fact." },
    { trap: "Assessing risks individually and never aggregating.", fix: "Look for a shared driver — correlated risks fire together and the total may exceed capacity." },
    { trap: "Recommending controls for a strategic risk.", fix: "Strategic risks are answered by changing or deliberately accepting the strategy, not by procedure." },
  ],
  keyTerms: [
    { term: "Risk appetite", def: "How much risk an organisation is willing to accept in pursuit of its objectives — a board decision." },
    { term: "Risk capacity", def: "How much risk the organisation could actually survive, determined by cash, capital, covenants and insurance." },
    { term: "Risk attitude", def: "An individual's disposition towards risk — averse, neutral or seeking — which shapes decisions regardless of policy." },
    { term: "Enterprise risk management", def: "Managing risk as one portfolio across the whole organisation, so exposures can be aggregated and correlations seen." },
    { term: "Strategic risk", def: "Risk arising from the choices made about direction and position, threatening the strategy's viability." },
    { term: "Operational risk", def: "Risk arising from processes, people, systems and events in delivery, threatening near-term performance." },
  ],
  summary: [
    "Strategy creates risk, and risk capacity limits which strategies are available — say both.",
    "Appetite is willingness and is chosen; capacity is survivability and is a fact.",
    "ERM exists to aggregate: correlated risks sharing a driver fire together.",
    "Strategic and operational risk have different owners and different responses.",
    "Risk varies with size, structure, industry, sector, stage and gearing — and it is dynamic.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the two-way relationship between strategy and risk?", a: "Strategy determines the risks faced; risk appetite and capacity determine which strategies can be pursued." },
    { q: "Distinguish risk appetite from risk capacity.", a: "Appetite is how much risk the board is willing to accept; capacity is how much the organisation could survive, set by cash, capital and covenants." },
    { q: "What does an enterprise-wide view add that siloed management cannot?", a: "Aggregation and correlation — seeing that separately tolerable risks share a driver and may together exceed capacity." },
    { q: "Why does the strategic/operational distinction matter practically?", a: "It determines who owns the response: strategic risks go to the board and are answered by changing or accepting the strategy, operational ones to management via controls." },
  ],
  furtherStudy: [
    "SBL-19 covers assessing and measuring the risks identified here",
    "SBL-20 covers the response strategies",
    "SBL-21 covers embedding risk in culture, and assurance mapping",
    "SBL-16 covers the option evaluation this feeds into",
  ],
}

const SBL_TREE_19: StudyChapter = {
  paper: "SBL",
  id: "SBL-19",
  number: 19,
  area: "D",
  syllabusRefs: ["D1(c)", "D1(e)", "D1(g)", "D1(h)"],
  title: "Assessing and measuring risk",
  minutes: 18,
  intro:
    "Severity times probability is the easy part. The marks are in what the case supplies around it: which risks are genuinely material to this organisation, how climate and environmental exposure is assessed, and why two risks that look independent are not.",
  outcomes: [
    "Pick out the risks that genuinely matter to an organisation and its projects, climate and environmental exposure included",
    "Judge how bad and how likely a risk event is, and use that judgement to rank what gets attention",
    "Assess attitudes to risk and appetite, and how these shape risk policy",
    "Explain and evaluate related and correlated risk factors, and why they defeat simple assessment",
  ],
  sections: [
    {
      id: "identifying-key-risks",
      heading: "Identifying the risks that matter",
      blocks: [
        {
          kind: "text",
          md: "A key risk is one whose occurrence would materially affect the organisation's objectives — not merely one that is likely, and not merely one that is severe. The discipline in SBL is to derive risks from the *case*, because a generic list applies to every organisation and therefore helps none.",
        },
        {
          kind: "table",
          caption: "Where to look in the exhibits",
          head: ["Source in the case", "Risk it reveals"],
          rows: [
            ["Revenue concentrated in few customers", "Loss of a single relationship is existential"],
            ["Single site, supplier or system", "No redundancy; one event stops everything"],
            ["Covenant headroom stated", "Financial risk with a defined trigger point"],
            ["A key person named as indispensable", "Knowledge and continuity risk"],
            ["Regulatory change dated in the future", "Compliance risk with a known deadline"],
            ["A major project underway", "Delivery, cost and benefit-realisation risk"],
            ["Physical assets in exposed locations", "Climate and physical environmental risk"],
            ["Manual processes at scale", "Error, fraud and capacity risk"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Environmental and climate risk splits in two, and the syllabus expects both",
          md: "**Physical** risk is direct damage or disruption — flooding a site, drought interrupting supply, heat affecting operations or yields. **Transition** risk is the cost of moving to a lower-carbon economy — carbon pricing, regulation, technology becoming obsolete, customers and investors shifting away, and assets losing value before the end of their useful lives. Naming which of the two applies is what turns a vague mention of climate into an assessed exposure.",
        },
        {
          kind: "text",
          md: "Both types reach **projects** as well as operations, which D1(c) mentions specifically. A twenty-year infrastructure investment appraised on today's regulatory and energy assumptions carries transition risk that a three-year project does not, and that difference belongs in the appraisal rather than in a narrative afterwards.",
        },
      ],
      check: {
        q: "A manufacturer's principal plant sits on a flood plain, and its main product line depends on a process facing carbon pricing from 2029. How should these be classified?",
        options: [
          "Both are physical climate risks",
          "Both are transition risks arising from decarbonisation",
          "The flood exposure is physical risk; the carbon pricing is transition risk — different time profiles and different responses",
          "Neither is a risk until it actually occurs",
        ],
        correct: 2,
        explain:
          "Keeping them apart matters because the responses differ entirely: flood exposure calls for defences, insurance and continuity planning, whereas carbon pricing calls for process change, repricing or reconsidering the product's future. Treating them as one thing produces a recommendation that fits neither.",
      },
    },
    {
      id: "severity-probability",
      heading: "Severity, probability and prioritising",
      blocks: [
        {
          kind: "text",
          md: "Assessing a risk means estimating how likely it is and how bad it would be, then using the combination to decide how much attention and resource it deserves. Both halves need to be expressed in terms the organisation can act on: severity as an amount — cash, lost revenue, days of disruption — rather than as the word 'high'.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The risk map, and what each quadrant demands",
            data: {
              leftTitle: "Low probability",
              rightTitle: "High probability",
              rows: [
                { aspect: "High severity", left: "TRANSFER or plan — insurance, contingency, continuity; do not ignore because it is unlikely", right: "AVOID or REDUCE urgently — this is the priority; may make the strategy untenable" },
                { aspect: "Low severity", left: "ACCEPT — monitor at low cost", right: "REDUCE — usually cheap process fixes; frequent so it accumulates" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The low-probability, high-severity quadrant is where organisations fail",
          md: "It is psychologically easy to discount: it has not happened, so attention goes to the frequent irritations instead. But these are the events that end organisations, and they are precisely what insurance, contingency funding and continuity planning exist for. When a case shows an unlikely but catastrophic exposure with no plan, that is the finding — regardless of how well the frequent risks are managed.",
        },
        {
          kind: "text",
          md: "Two cautions on measurement. First, an **expected value** — probability multiplied by impact — is a useful ranking device and a poor decision rule on its own, because a 1% chance of a loss that would be fatal cannot be netted off against a 99% chance of comfort. Where survival is at stake, capacity matters more than expectation. Second, probabilities for rare events are estimates, often from limited history, and history is a weak guide where the environment is changing — which is exactly the position with climate exposure.",
        },
        {
          kind: "example",
          title: "Assessing with the case's own numbers",
          scenario:
            "A distributor holds 62% of inventory in one warehouse. Management rates fire risk as 'low probability, high impact' and holds insurance covering rebuilding and stock. Contracts carry penalties for late delivery, and the nearest alternative capacity is three weeks away.",
          steps: [
            { label: "Quantify severity properly", detail: "Insurance covers assets; it does not cover three weeks of undeliverable contracts, penalties, or customers who switch permanently." },
            { label: "Test the response", detail: "Transfer has been used for the measurable loss and nothing addresses business interruption or customer retention." },
            { label: "Name the gap", detail: "The residual exposure is continuity, not property — and it is the part that threatens the customer relationships the business runs on." },
            { label: "Recommend", detail: "Business interruption cover, a second stockholding location or reciprocal arrangement, and a tested continuity plan with contractual force-majeure review." },
          ],
          result:
            "The assessment moves from 'insured, therefore managed' to the specific unmanaged consequence — which is what the marks are for.",
        },
      ],
      check: {
        q: "Why is expected value an insufficient basis for deciding on a low-probability, catastrophic risk?",
        options: [
          "Because probabilities cannot be estimated for rare events",
          "Because a small chance of an organisation-ending loss cannot be offset against a large chance of no loss — survival is not an averageable outcome",
          "Because expected value overstates the risk of rare events",
          "Because insurance always removes the exposure",
        ],
        correct: 1,
        explain:
          "Expected value assumes the organisation can absorb the outcome and repeat the gamble, which is untrue when one occurrence is fatal. That is why capacity, not expectation, governs decisions in this quadrant.",
      },
    },
    {
      id: "related-correlated",
      heading: "Related and correlated risk",
      blocks: [
        {
          kind: "definition",
          term: "Correlated risks",
          md: "Risks that move together, so that the occurrence of one makes the others more likely — usually because they share an underlying driver.",
        },
        {
          kind: "definition",
          term: "Related risks",
          md: "Risks connected because one directly causes or triggers another, producing a chain rather than a set of independent events.",
        },
        {
          kind: "text",
          md: "This is D1(h), and it is the most analytically valuable idea in Area D. Simple risk assessment treats each risk as independent, which understates total exposure whenever risks are connected — and in real organisations they usually are, because they trace back to the same customers, the same region, the same technology or the same balance sheet.",
        },
        {
          kind: "table",
          caption: "How connection understates exposure",
          head: ["Situation", "Assessed separately", "Actual exposure"],
          rows: [
            ["Recession hits demand and customer credit", "Two moderate risks", "One event; revenue falls as receivables turn bad"],
            ["One region supplies stock, sales and currency exposure", "Three moderate risks", "One political event triggers all three together"],
            ["Debt-funded expansion in a rising-rate environment", "Financing risk; demand risk", "Interest cost rises as demand falls — covenant breach"],
            ["Cyber incident stops operations and exposes data", "IT risk", "Operational loss, regulatory penalty and reputational damage in one chain"],
            ["A key person leaves and takes client relationships", "Staffing risk", "Revenue loss follows the departure — a related chain"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Diversification only reduces risk where risks are NOT correlated",
          md: "This is the point that makes the concept examinable. Spreading across three product lines sold to the same customers in the same economy diversifies very little, because the driver is shared. Genuine diversification requires exposures that respond to *different* drivers — and a case that claims to have diversified while every line depends on one sector has not. SBL-20 develops the response side.",
        },
        {
          kind: "text",
          md: "The practical technique is to ask, for each significant risk, *what would have to happen for this to occur* — and then to look for risks whose answers name the same event. Where several do, they should be assessed as one scenario against risk capacity rather than as separate register entries, because that is how they will arrive.",
        },
      ],
      check: {
        q: "A group argues it is diversified because it operates three distinct product lines. All three sell to construction firms in one national market. What is the assessment?",
        options: [
          "Genuinely diversified, since the products are distinct",
          "Barely diversified — the three lines share a driver, so a construction downturn hits all of them together and the risks are highly correlated",
          "Diversified in operational risk but not strategic risk",
          "Diversification is irrelevant to a group structure",
        ],
        correct: 1,
        explain:
          "Diversification depends on exposures responding to different drivers, not on products being different. One sector in one economy means one driver, so the three revenue streams will fall at the same time — which is precisely when the group needs them not to.",
      },
    },
  ],
  examTraps: [
    { trap: "Producing a generic list of risks any organisation faces.", fix: "Derive each risk from a stated fact in the exhibits, and say why it is material to this organisation." },
    { trap: "Rating severity as 'high' without quantifying it.", fix: "Express severity in cash, lost revenue or days of disruption using the case's own figures." },
    { trap: "Discounting low-probability catastrophic risks because they have not happened.", fix: "That quadrant is what continuity planning, contingency funding and insurance exist for." },
    { trap: "Treating insurance as removing an exposure.", fix: "Check what it does not cover — interruption, penalties, lost customers and reputation usually remain." },
    { trap: "Assessing risks as independent.", fix: "Ask what would have to happen for each; risks naming the same event should be assessed as one scenario." },
  ],
  keyTerms: [
    { term: "Key risk", def: "A risk whose occurrence would materially affect the organisation's objectives." },
    { term: "Physical climate risk", def: "Direct damage or disruption from climate effects, such as flood, drought or heat." },
    { term: "Transition risk", def: "Exposure arising from the shift to a lower-carbon economy — carbon pricing, regulation, obsolescence and assets losing value early." },
    { term: "Expected value", def: "Probability multiplied by impact; useful for ranking, unsafe as a decision rule where an outcome could be fatal." },
    { term: "Correlated risk", def: "Risks that move together because they share an underlying driver." },
    { term: "Related risk", def: "Risks where one directly triggers another, producing a chain of consequences." },
  ],
  summary: [
    "Derive key risks from the case's own facts, and quantify severity in usable units.",
    "Split climate exposure into physical and transition risk — the responses differ.",
    "The low-probability, high-severity quadrant is where organisations actually fail.",
    "Expected value ranks risks; capacity decides them where survival is at stake.",
    "Correlated and related risks understate exposure, and defeat apparent diversification.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes a risk a key risk?", a: "That its occurrence would materially affect the organisation's objectives — not merely that it is likely or severe." },
    { q: "Distinguish physical from transition climate risk.", a: "Physical is direct damage or disruption from climate effects; transition is the cost of moving to a lower-carbon economy — pricing, regulation, obsolescence and early asset devaluation." },
    { q: "Why can expected value mislead on catastrophic risk?", a: "It averages outcomes as though the organisation could absorb and repeat them, but a single fatal loss cannot be offset by a high chance of comfort." },
    { q: "When does diversification actually reduce risk?", a: "Only where the exposures respond to different drivers; sharing a driver means they fall together however distinct they look." },
  ],
  furtherStudy: [
    "SBL-18 covers appetite and capacity, against which these assessments are judged",
    "SBL-20 covers the response strategies including TARA and ALARP",
    "SBL-26 covers cyber risk in detail",
    "SBL-10 covers reporting climate and sustainability exposure to stakeholders",
  ],
}

const SBL_TREE_20: StudyChapter = {
  paper: "SBL",
  id: "SBL-20",
  number: 20,
  area: "D",
  syllabusRefs: ["D2(a)", "D2(b)", "D2(d)", "D2(e)", "D2(f)"],
  title: "Managing and mitigating risk: TARA and ALARP",
  minutes: 18,
  intro:
    "The response half of risk management, and the half where SBL wants a decision. TARA gives you four options; ALARP explains why the answer is never 'eliminate all risk'; the register and heat map are how the board keeps watching.",
  outcomes: [
    "Say what a risk manager is for, and where the post is set up so it cannot work",
    "Judge whether a register is managing anything, and read a heat map to prioritise and track movement",
    "Explain spreading and diversifying risk, and when each is appropriate",
    "Advise on risk management strategies using the TARA model",
    "Assess the benefits of accepting some risk, applying the ALARP principle",
  ],
  sections: [
    {
      id: "tara",
      heading: "TARA: four responses, and choosing between them",
      blocks: [
        {
          kind: "table",
          caption: "The TARA responses",
          head: ["Response", "What it means", "Appropriate when", "Cost"],
          rows: [
            ["Transfer", "Move the financial consequence to someone else — insurance, contract, hedge", "Severity high, probability low, and the loss is insurable or contractible", "Premium or price; residual uninsured elements"],
            ["Avoid", "Do not undertake the activity, or exit it", "Severity high and probability high; or the risk exceeds capacity", "Forgone return; may mean abandoning a strategy"],
            ["Reduce", "Lower probability or impact through controls and design", "Probability high, severity manageable", "Control cost; ongoing effort"],
            ["Accept", "Bear it consciously, and monitor", "Severity low, or the cost of response exceeds the exposure", "The loss itself, when it occurs"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Map the response to the position on the risk map, and say why",
          md: "The four responses correspond to the four quadrants of severity and probability, which is what makes TARA more than a list. A recommendation that says \"transfer the risk\" without establishing that severity is high and probability low has not used the model. And note that accept is a *decision*, not a failure to decide — accepted risks still need an owner, a limit and monitoring.",
        },
        {
          kind: "text",
          md: "Two refinements worth carrying into an answer. First, responses **combine**: a single risk is often reduced through controls, transferred for the residue, and the remainder accepted — and saying so is more realistic than picking one. Second, transfer moves the financial consequence but rarely the whole exposure: insurance does not restore a lost customer relationship, and a contractual indemnity is only as good as the counterparty behind it.",
        },
        {
          kind: "example",
          title: "Combining responses on one risk",
          scenario:
            "A logistics business faces the risk of a serious data breach. It holds customer addresses and payment details, has ageing perimeter security, and operates under a regime imposing significant penalties for inadequate protection.",
          steps: [
            { label: "Reduce", detail: "Patch and segment systems, enforce multi-factor access, encrypt data at rest, remove data no longer needed — probability falls and the volume at stake shrinks." },
            { label: "Transfer", detail: "Cyber cover for investigation, notification and third-party claims. Note that regulatory penalties are often uninsurable." },
            { label: "Avoid", detail: "Stop retaining payment details at all, using a tokenised processor — the cleanest response, because it removes the asset rather than protecting it." },
            { label: "Accept and monitor", detail: "Residual risk remains; assign an owner, set indicators and report to the audit committee." },
          ],
          result:
            "Four responses on one risk, with the strongest — avoidance through not holding the data — identified explicitly rather than defaulting to more security spending.",
        },
      ],
      check: {
        q: "A risk has high potential severity but low probability, and the loss is insurable. Which TARA response is indicated, and what caveat applies?",
        options: [
          "Avoid — the severity is too high to accept under any circumstances",
          "Transfer, with the caveat that insurance covers the financial consequence and not interruption, reputation or uninsurable penalties",
          "Reduce, since controls are always the cheapest response",
          "Accept, because the probability is low",
        ],
        correct: 1,
        explain:
          "High severity with low probability is the classic transfer quadrant. The caveat matters because candidates treat insurance as closing the exposure, when the operational and reputational consequences remain with the organisation.",
      },
    },
    {
      id: "alarp",
      heading: "ALARP, and why some risk should be accepted",
      blocks: [
        {
          kind: "text",
          md: "The **as low as reasonably practicable** principle holds that risk should be reduced until the cost, effort or difficulty of further reduction becomes disproportionate to the benefit gained. It matters in SBL because it supplies the argument against the instinctive but wrong recommendation to eliminate risk.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The ALARP judgement",
            data: {
              levels: [
                { label: "Intolerable", sub: "Must be reduced whatever the cost, or the activity stops" },
                { label: "Tolerable if ALARP", sub: "Reduce until further reduction is disproportionate — the judgement zone" },
                { label: "Broadly acceptable", sub: "No further action needed beyond monitoring" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Risk-taking is how value is created — say this explicitly",
          md: "An organisation that eliminated risk would forgo return: no new product, no new market, no investment whose outcome is uncertain. Accepting risk deliberately, within a stated appetite and with the exposure understood, is competent management rather than negligence. The failure mode is not accepting risk — it is accepting it *unknowingly*, or beyond capacity.",
        },
        {
          kind: "text",
          md: "There is an important limit. ALARP is a proportionality test, not a licence to trade off anything against cost: where the exposure is to human safety, or where a legal requirement sets an absolute standard, cost does not justify falling below it. In those cases the risk is intolerable and the activity must change. Recognising that boundary is what separates a professional application of ALARP from an excuse.",
        },
      ],
      check: {
        q: "Management proposes spending a further $2m to reduce an already low residual operational risk, while a significant uncontrolled exposure elsewhere goes unfunded. What principle applies?",
        options: [
          "All identified risks must be reduced to the lowest achievable level regardless of cost",
          "ALARP — further reduction here is disproportionate to the benefit, and the resource should address the larger uncontrolled exposure instead",
          "The spending should proceed, as reducing any risk is beneficial",
          "Residual risk indicates the earlier controls failed",
        ],
        correct: 1,
        explain:
          "ALARP is about proportionality, and its practical use is exactly this: it identifies over-investment in an already-managed risk as a misallocation, especially while a material exposure is unaddressed. Option 0 is the instinct the principle exists to correct.",
      },
    },
    {
      id: "spreading-diversifying",
      heading: "Spreading and diversifying risk",
      blocks: [
        {
          kind: "text",
          md: "**Spreading** risk means avoiding concentration within an exposure — several suppliers rather than one, several customers rather than three, two sites rather than a single warehouse. **Diversifying** means holding exposures that respond to different drivers, so that a bad outcome in one is not accompanied by bad outcomes in the rest.",
        },
        {
          kind: "table",
          caption: "When each is appropriate",
          head: ["Technique", "Use when", "Cost or limitation"],
          rows: [
            ["Multiple suppliers", "A single source could halt operations", "Loses volume discounts; more relationships to manage"],
            ["Broader customer base", "Revenue concentration is existential", "Cost of acquiring smaller customers; possibly lower margin"],
            ["Multiple sites or systems", "One event could stop everything", "Duplication; capital and overhead"],
            ["Geographic diversification", "Exposure to one economy or regime", "Complexity, unfamiliar risk, management attention"],
            ["Product or sector diversification", "Demand driven by one cycle", "Only works if drivers genuinely differ (see SBL-19)"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Diversification at corporate level is often the wrong answer",
          md: "For *operational* exposures — supply, sites, systems, customers — spreading is straightforward good practice. For *investment* risk, remember shareholders diversify their own portfolios far more cheaply than a company can diversify its operations, so unrelated diversification needs a synergy justification rather than a risk one. This connects directly to SBL-17.",
        },
      ],
      check: {
        q: "A company sources a critical component from one supplier at a favourable price. What is the balanced recommendation?",
        options: [
          "Retain the single supplier, since the price is the best available",
          "Weigh the discount against the cost of a halt in operations — qualify a second source, or agree buffer stock and contractual protection, accepting a modest price increase",
          "Immediately move to three suppliers regardless of cost",
          "Acquire the supplier to remove the risk",
        ],
        correct: 1,
        explain:
          "This is a proportionality judgement, not an absolute. The answer prices the exposure against the discount and offers graduated responses — a qualified second source, buffer stock, contractual protection — rather than either ignoring the concentration or over-correcting.",
      },
    },
    {
      id: "register-heatmap-manager",
      heading: "The risk register, heat maps and the risk manager",
      blocks: [
        {
          kind: "text",
          md: "A **risk register** records each identified risk with its assessment and its response, so that management of risk becomes visible and reviewable rather than remembered. D2(b) asks you to *evaluate* one, which means judging whether it is doing its job.",
        },
        {
          kind: "table",
          caption: "Evaluating a risk register",
          head: ["What a sound entry contains", "Defect to look for in a case"],
          rows: [
            ["A specific risk, described as an event", "Vague headings — 'reputation', 'IT' — that cannot be acted on"],
            ["Assessed severity and probability, quantified", "Colour or 'high/medium/low' with no basis"],
            ["Gross and residual assessment", "Only one figure, so the controls' effect is invisible"],
            ["A named owner", "Ownership by committee or by function, so nobody acts"],
            ["The agreed response and its status", "Responses listed as intentions with no date"],
            ["Review date and last review", "Reviewed annually in a fast-moving sector"],
            ["Key risk indicators", "No leading measure, so change is noticed only after the event"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Gross and residual is the distinction that earns marks",
          md: "Gross (or inherent) risk is the exposure before controls; residual is what remains after them. Recording only one number hides whether the controls are doing anything — and a register showing every risk as low residual with no supporting control evidence is describing an aspiration. Where a case gives both figures, the gap is the measured value of the control.",
        },
        {
          kind: "text",
          md: "A **heat map** plots the register on severity against probability, which turns a long list into a picture a board can prioritise from and, plotted over successive periods, shows whether exposure is moving. Its weakness is that it compresses judgement into position, so it should support the register rather than replace it — and correlated risks appear as separate dots when they will arrive as one event.",
        },
        {
          kind: "text",
          md: "The **risk manager** coordinates all of this: maintaining the framework and register, supporting managers in identifying and assessing their own risks, aggregating exposure across the organisation, reporting to the board or risk committee, and challenging optimistic assessments. The crucial point about the role is what it is *not*: the risk manager does not own the business risks. Ownership sits with the managers who run the activities, and a risk function that accepts ownership lets the rest of the organisation stop thinking about risk — which makes matters worse, not better.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Check who the risk manager reports to",
          md: "A risk manager reporting to the executive whose strategy they must challenge cannot perform the challenge — the same structural point as internal audit's line to the audit committee. Access to the board or risk committee is what makes the role effective, and its absence is a finding.",
        },
      ],
      check: {
        q: "A risk register shows every risk as 'green' after controls, with no gross assessment, no owners and an annual review. What is the most fundamental defect?",
        options: [
          "The colour scheme is insufficiently granular",
          "Without gross assessments, owners or meaningful review the register cannot show what the controls achieve or who must act — it documents comfort rather than managing risk",
          "Annual review is adequate for most organisations",
          "The register should be maintained by internal audit",
        ],
        correct: 1,
        explain:
          "Each omission removes a different function: no gross figure hides the controls' effect, no owner means nothing happens, and infrequent review means the assessment describes the past. Together they leave a document that reassures without managing anything.",
      },
    },
  ],
  examTraps: [
    { trap: "Naming a TARA response without linking it to severity and probability.", fix: "Map the response to the quadrant and justify it; and note that responses usually combine on one risk." },
    { trap: "Treating transfer as removing the exposure.", fix: "Insurance covers financial loss, not interruption, reputation or uninsurable penalties." },
    { trap: "Recommending elimination of all risk.", fix: "Apply ALARP — reduce until further reduction is disproportionate — but never below an absolute safety or legal standard." },
    { trap: "Claiming diversification from products sharing one driver.", fix: "Spreading suits operational concentration; corporate diversification needs a synergy case, not a risk one." },
    { trap: "Accepting a register at face value.", fix: "Check gross versus residual, named owners, response status, review frequency and leading indicators." },
  ],
  keyTerms: [
    { term: "TARA", def: "Transfer, avoid, reduce, accept — the four responses to an assessed risk." },
    { term: "ALARP", def: "Reducing risk until the cost or difficulty of further reduction is disproportionate to the benefit — subject to absolute safety and legal standards." },
    { term: "Spreading risk", def: "Avoiding concentration within an exposure, such as using several suppliers, customers or sites." },
    { term: "Gross (inherent) risk", def: "Exposure before the effect of controls." },
    { term: "Residual risk", def: "Exposure remaining after controls, whose gap from gross measures what the controls achieve." },
    { term: "Heat map", def: "A plot of risks by severity and probability, used to prioritise and to show movement over time." },
    { term: "Key risk indicator", def: "A leading measure signalling that an exposure is changing before the risk event occurs." },
  ],
  summary: [
    "TARA maps to the risk map's quadrants; responses combine, and transfer leaves a residue.",
    "ALARP justifies accepting risk proportionately — but not below absolute safety or legal standards.",
    "Deliberate, understood risk-taking within appetite is how value is created.",
    "Spread operational concentrations; corporate diversification needs a synergy argument.",
    "Evaluate a register on gross versus residual, owners, response status, review and indicators.",
    "The risk manager coordinates and challenges; line management owns the risks.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four TARA responses and their quadrants?", a: "Transfer for high severity/low probability; avoid for high/high or beyond capacity; reduce for high probability/manageable severity; accept for low severity or where response costs exceed exposure." },
    { q: "State the ALARP principle and its limit.", a: "Reduce risk until further reduction is disproportionate to the benefit — but cost never justifies falling below an absolute safety requirement or legal standard." },
    { q: "Why does a register need gross as well as residual assessments?", a: "The gap between them is the measured effect of the controls; one figure alone hides whether the controls achieve anything." },
    { q: "What does the risk manager NOT do?", a: "Own the business risks — ownership belongs to the managers running the activities, or the rest of the organisation stops thinking about risk." },
  ],
  furtherStudy: [
    "SBL-19 covers the assessment these responses answer",
    "SBL-21 covers embedding risk in culture and mapping assurance over it",
    "SBL-27 covers the internal control systems that deliver risk reduction",
    "SBL-39 covers monitoring and controlling project risk specifically",
  ],
}

const SBL_TREE_21: StudyChapter = {
  paper: "SBL",
  id: "SBL-21",
  number: 21,
  area: "D",
  syllabusRefs: ["D2(c)", "D2(g)"],
  title: "Risk culture and assurance mapping",
  minutes: 16,
  intro:
    "Two outcomes that decide whether everything in the previous three chapters actually works: whether people behave as the framework assumes when nobody is looking, and whether the assurance the board relies on covers what it thinks it covers.",
  outcomes: [
    "Judge what it takes for risk thinking to become part of how an organisation actually behaves",
    "Recognise the symptoms of a weak risk culture in case evidence",
    "Apply assurance mapping to an organisation's risks using the four lines of defence",
    "Identify gaps and duplication in assurance, and advise the audit committee accordingly",
  ],
  sections: [
    {
      id: "embedding",
      heading: "Embedding risk in culture and values",
      blocks: [
        {
          kind: "text",
          md: "A risk framework describes what should happen. Culture determines what actually happens between the framework's touchpoints — which is most of the time. Embedding risk means that considering exposure becomes part of how ordinary decisions are made, rather than a form completed afterwards for the register.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Embedded against bolted on",
            data: {
              leftTitle: "Risk bolted on",
              rightTitle: "Risk embedded",
              rows: [
                { aspect: "When risk is considered", left: "After the decision, for the paperwork", right: "As part of making the decision" },
                { aspect: "Who owns it", left: "The risk function", right: "The manager who runs the activity" },
                { aspect: "Bad news", left: "Travels slowly, or not at all", right: "Escalates quickly and is rewarded" },
                { aspect: "Incentives", left: "Reward outcomes only", right: "Reward how the outcome was achieved" },
                { aspect: "Register", left: "An annual compliance exercise", right: "A live management tool" },
                { aspect: "Near misses", left: "Unreported, because nothing happened", right: "Reported and analysed as free information" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Near misses are the test of a risk culture",
          md: "An organisation that hears about the failures that *almost* happened is learning cheaply; one that hears only about realised losses is paying full price for every lesson. So when a case mentions that an incident 'had happened several times before without being reported', that is not background — it is the central evidence about the culture.",
        },
        {
          kind: "table",
          caption: "Symptoms of a weak risk culture, and what to recommend",
          head: ["Symptom in an exhibit", "What it shows", "Recommendation"],
          rows: [
            ["Concerns raised and not acted on", "Escalation is pointless, so it stops", "Close the loop visibly — respond to every escalation"],
            ["Reward based purely on results", "Risk-taking to hit a number is rational", "Include how results were achieved in appraisal and reward"],
            ["Senior override of controls, unrecorded", "The rules apply to juniors only", "Log overrides and report them to the audit committee"],
            ["Risk seen as the risk function's job", "Nobody in the business is thinking about it", "Assign ownership to line management with real accountability"],
            ["Register updated once a year for the board", "Compliance theatre", "Tie risk review to actual decision points"],
            ["Bearer of bad news treated as the problem", "Information stops flowing upward", "Protect and visibly value early warning" ],
          ],
        },
        {
          kind: "text",
          md: "The tone from the top does most of the work here, which links this chapter back to SBL-01 and SBL-02. If executives are seen to bypass a limit, break a control, or punish a challenge, that behaviour teaches the organisation more than any policy document, and it does so immediately.",
        },
      ],
      check: {
        q: "An investigation finds the control failure that caused a loss had occurred repeatedly before without being reported, because previous occurrences caused no damage. What is the primary cultural finding?",
        options: [
          "The control itself was poorly designed and should be replaced",
          "Near misses are not being reported or analysed, so the organisation only learns when a failure becomes expensive",
          "Staff should be disciplined for the earlier failures to reinforce compliance",
          "The loss was unforeseeable and no cultural issue arises",
        ],
        correct: 1,
        explain:
          "The information existed inside the organisation several times over and never reached anyone who could act. Option 2 is actively counterproductive: punishing the earlier occurrences guarantees the next set go unreported too.",
      },
    },
    {
      id: "assurance-mapping",
      heading: "Assurance mapping and the four lines of defence",
      blocks: [
        {
          kind: "text",
          md: "Boards rely on assurance — statements that risks are being managed and controls are working. **Assurance mapping** sets the organisation's significant risks against the sources of assurance covering each, so the board can see where it is genuinely informed, where nobody is looking, and where several functions are duplicating each other's work.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The four lines of defence",
            data: {
              levels: [
                { label: "Fourth line — external assurance", sub: "External audit, regulators, independent certification and review" },
                { label: "Third line — internal audit", sub: "Independent assurance to the audit committee on the first two lines" },
                { label: "Second line — risk and compliance functions", sub: "Set policy and framework, oversee and challenge the first line" },
                { label: "First line — operational management", sub: "Owns the risks and operates the controls day to day" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "What each line does, and how each fails",
          head: ["Line", "Role", "Characteristic failure"],
          rows: [
            ["First — operational management", "Identify, own and control risk within the activity", "Treats risk as somebody else's job; overrides controls under pressure"],
            ["Second — risk and compliance", "Set framework and policy; monitor and challenge the first line", "Drifts into doing the first line's work, so nobody owns anything"],
            ["Third — internal audit", "Independent assurance on the design and operation of the first two lines", "Loses independence — reports to management, or audits what it designed"],
            ["Fourth — external assurance", "External audit, regulatory inspection, independent certification", "Its scope is narrower than the board assumes"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The second line must not absorb the first",
          md: "This is the failure mode most worth naming. When a risk or compliance function starts performing controls rather than overseeing them, two things break at once: the business stops owning its own risk, and the second line can no longer challenge work it now performs itself. That is a self-review problem at the organisational level, and it hollows out the whole model.",
        },
        {
          kind: "text",
          md: "Building the map is straightforward and the conclusions are what matter. List the significant risks; for each, record which lines provide assurance, how recently, at what depth, and to whom it was reported. Then read the map for two things.",
        },
        {
          kind: "list",
          style: "number",
          title: "What an assurance map reveals",
          items: [
            "**Gaps** — significant risks with no assurance from any line, or only from the first line reporting on itself",
            "**Over-reliance on the first line** — management assuring the board that management's controls work",
            "**Duplication** — several functions covering the same ground while a gap sits elsewhere, which is a cost issue as well as a coverage one",
            "**Stale assurance** — coverage that exists but is years old in a changed environment",
            "**Scope misunderstanding** — the board believing external audit or a certification covers something it does not",
            "**Reporting gaps** — assurance obtained but never reaching the audit committee",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The commonest real-world gap",
          md: "The board's most significant risks are frequently the least assured, because assurance naturally concentrates where work is measurable and familiar — financial controls, regulatory compliance — while strategic, technology and third-party risks are covered by nobody independent. If a case gives you a list of risks and a description of assurance activity, that mismatch is the answer.",
        },
      ],
      check: {
        q: "An assurance map shows the organisation's three highest-rated risks are covered only by first-line management self-assessment, while financial controls are covered by the second line, internal audit and external audit. What should be advised?",
        options: [
          "Assurance is adequate overall, given the volume of coverage",
          "Assurance is misallocated — the most significant risks have no independent coverage while financial controls are triplicated; redirect internal audit's plan to the highest risks",
          "External audit should be asked to extend its opinion to all three risks",
          "The three risks should be downgraded to match available assurance",
        ],
        correct: 1,
        explain:
          "Total assurance activity says nothing about whether it is pointed at the right things. Self-assessment by the people operating the controls is not independent assurance, so the board is least informed exactly where its exposure is greatest — and the remedy is reallocating the internal audit plan, not stretching the external auditor's scope.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending a risk framework without addressing culture.", fix: "Culture governs behaviour between the framework's touchpoints; check escalation, reward, override and near-miss reporting." },
    { trap: "Treating unreported near misses as unimportant because no loss occurred.", fix: "They are the cheapest information available, and their absence is a cultural finding." },
    { trap: "Letting the risk function own business risks.", fix: "Line management owns risk; the second line oversees and challenges, and must not absorb the first." },
    { trap: "Reading volume of assurance as adequacy.", fix: "Map assurance against the significant risks — look for gaps, over-reliance on the first line, duplication and stale coverage." },
  ],
  keyTerms: [
    { term: "Risk culture", def: "The shared attitudes and habits determining how risk is actually considered, escalated and acted on day to day." },
    { term: "Near miss", def: "A failure that occurred without causing loss — free information about a control weakness." },
    { term: "Assurance mapping", def: "Setting significant risks against the sources of assurance covering each, to reveal gaps, duplication and over-reliance." },
    { term: "First line of defence", def: "Operational management, which owns the risks and operates the controls." },
    { term: "Second line of defence", def: "Risk and compliance functions, which set the framework and oversee and challenge the first line." },
    { term: "Third line of defence", def: "Internal audit, providing independent assurance to the audit committee on the first two lines." },
    { term: "Fourth line of defence", def: "External assurance — external audit, regulators and independent certification." },
  ],
  summary: [
    "Culture decides whether the risk framework works between its formal touchpoints.",
    "Unreported near misses, punished messengers and unrecorded overrides are the key symptoms.",
    "The four lines are operational management, risk and compliance, internal audit, and external assurance.",
    "The second line must oversee, not perform — absorbing the first line hollows out ownership.",
    "Map assurance to risks: gaps, first-line over-reliance, duplication, staleness and scope misunderstanding.",
  ],
  knowledgeDiagnostic: [
    { q: "What does embedding risk in culture actually mean?", a: "That exposure is considered as part of making ordinary decisions, owned by line management, with bad news escalating quickly and rewarded." },
    { q: "Why do near misses matter so much?", a: "They are information about a control weakness obtained without paying for the loss; not reporting them means every lesson costs full price." },
    { q: "Name the four lines of defence.", a: "Operational management; risk and compliance functions; internal audit; and external assurance such as external audit and regulators." },
    { q: "What happens when the second line absorbs the first?", a: "The business stops owning its risk, and the second line can no longer challenge work it now performs itself — self-review at organisational level." },
    { q: "What are the two main findings an assurance map produces?", a: "Gaps — significant risks with no independent coverage — and duplication, where several functions cover the same ground while a gap sits elsewhere." },
  ],
  furtherStudy: [
    "SBL-02 covers culture and the cultural web this chapter applies to risk",
    "SBL-20 covers the responses whose operation these lines assure",
    "SBL-27 to SBL-29 cover internal control, internal audit and reporting (Area F)",
    "SBL-09 covers the audit committee that receives third-line assurance",
  ],
}

export const SBL_TREE_AREA_D: StudyChapter[] = [SBL_TREE_18, SBL_TREE_19, SBL_TREE_20, SBL_TREE_21]
