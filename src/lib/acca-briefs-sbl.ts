/*
 * Topic Briefs — Strategic Business Leader (SBL).
 * One brief per syllabus area: the concept in plain language, the
 * frameworks/models/rules as scannable lists, a short worked scenario,
 * and the classic traps the exam distractors are built on.
 */

import type { TopicBrief } from "@/lib/acca-briefs"

export const SBL_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── A — Leadership & governance ───────────────────────── */
  {
    paper: "SBL",
    area: "A",
    title: "Leadership & governance",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why governance exists",
        body: `Picture a large company. The people who own it — thousands of shareholders — are not the people who run it. The owners hand their money to directors and managers and then go home. This gap is the root of everything in governance: the agency problem. The owners (principals) hire directors (agents) to act for them, but the agents may chase their own interests — bigger salaries, empire-building, avoiding risk that would protect their jobs but shrink returns. Governance is the system of rules, relationships and checks that keeps agents accountable to the people whose money they spend.

Good governance is not box-ticking. Its purpose is to make the exercise of power visible and answerable, so that resources are stewarded well and long-term value is created rather than quietly destroyed. That is why it rests on named principles — integrity, accountability, transparency, independence, probity, fairness and judgement — rather than on a single rule. Leadership sits alongside this: a board sets the tone, culture and ethical climate of the whole organisation, and a healthy culture does more to prevent scandal than any control ever will.

Governance also has to answer a harder question: for whom is the company run? The narrow shareholder view says the board's job is to maximise owner returns within the law. The broader stakeholder view says employees, customers, suppliers, communities and the environment all have legitimate claims the board must weigh. SBL expects you to hold both views and to reason about the specific stakeholders in the scenario in front of you, not to recite a preference.`,
      },
      {
        kind: "structure",
        heading: "The governance toolkit",
        body: `Governance codes — most listed-company codes work on comply or explain: follow the code's provisions or explain publicly why you have not. They are principles-based (flexible, judgement-led), unlike rules-based regimes such as Sarbanes-Oxley (legal, mandatory, US).

Board structure:
Unitary board — one board of executive and non-executive directors together (UK model).
Two-tier board — a separate supervisory board oversees a management board (German model).
Split the roles of chair and chief executive so no one person dominates.
Non-executive directors (NEDs) bring independence, scrutiny and outside experience.

Principal board committees, each staffed mainly by independent NEDs:
Audit committee — oversees financial reporting, internal control and the external auditor.
Remuneration committee — sets executive pay, aligning it with long-term performance.
Nomination committee — plans board succession and appointments.
Risk committee — oversees the risk management framework.

Mendelow's matrix — map each stakeholder on power (vertical) against level of interest (horizontal):
High power, high interest — Key players: manage closely, engage directly.
High power, low interest — Keep satisfied.
Low power, high interest — Keep informed.
Low power, low interest — Minimal effort.

Integrated reporting <IR> — reports value creation across six capitals: financial, manufactured, intellectual, human, social and relationship, and natural.`,
      },
      {
        kind: "example",
        heading: "Worked example — a chair who is also the CEO",
        body: `A listed retailer's founder holds both chair and chief executive roles. The board has two NEDs, both former colleagues of the founder, and no separate audit committee. A large expansion is proposed and the board approves it in one meeting with little challenge.

Apply the principles:
Concentration of power — combining chair and CEO removes the check the chair is meant to provide over the executive. Recommend splitting the roles.
Independence — NEDs who are long-standing associates are not independent; their scrutiny is compromised. Appoint genuinely independent NEDs.
Accountability — with no audit committee, financial reporting and control lack independent oversight. Establish one, staffed by independent NEDs.
Judgement — a major decision waved through in a single meeting shows the board is not challenging management.

Now Mendelow. The founder is high power, high interest — a key player who must be engaged directly. Institutional shareholders are high power but currently low interest; a governance failure will raise their interest fast, so keep them satisfied before they act. Each recommendation ties to a named principle and a named stakeholder — that is what earns marks, not a generic call for better governance.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Treating comply or explain as optional or as a soft rule — a company may depart from a provision, but it must explain the departure publicly; silence is a breach.

Confusing rules-based and principles-based regimes — Sarbanes-Oxley is legal and mandatory; most governance codes are principles-based and flexible.

Calling any non-executive director independent — independence is judged on relationships (former employment, close ties, long tenure, cross-directorships), not just on the non-executive label.

Reading Mendelow's axes as importance versus size — the axes are power and level of interest, and the high-power low-interest quadrant is Keep satisfied, not Minimal effort.

Recommending governance improvements with no link to a principle or a stakeholder — the marks are in the reasoning, not in listing best practice.

Assuming the shareholder view is always correct — SBL rewards weighing the actual stakeholders in the scenario.`,
      },
    ],
  },

  /* ───────────────────────── B — Strategy ───────────────────────── */
  {
    paper: "SBL",
    area: "B",
    title: "Strategy",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "What strategy actually is",
        body: `Strategy answers three linked questions: where are we now, where do we want to be, and how do we get there? It is the pattern of decisions that positions an organisation in its environment so it can create value that rivals cannot easily copy. Without it, a business is just reacting — busy but drifting.

The classic view is rational planning: analyse the environment, set objectives, generate and choose options, then implement and control. It is disciplined and gives you a clear order of analysis, which is why exam scenarios often follow it. But strategy also emerges — real direction is shaped by learning, culture and events, not only by a plan on a page. A strong answer uses the tools to structure thinking while staying alert to what is actually happening in the case.

Two ideas underpin the whole area. Strategic fit means aligning the organisation's resources and capabilities with the opportunities and threats outside it — you win where your strengths meet a real market need. Competitive advantage is what lets you earn more than rivals over time; it comes either from being genuinely cheaper to run or from offering something customers value enough to pay a premium for. Every model below is really a way of testing whether that advantage exists and can last.`,
      },
      {
        kind: "structure",
        heading: "The strategy toolkit",
        body: `Position audit — three lenses:
External macro-environment: PESTEL — Political, Economic, Social, Technological, Environmental, Legal.
Industry: Porter's Five Forces.
Internal: resources and competences, often via the value chain and SWOT.

Porter's Five Forces — the stronger each force, the less profitable the industry:
Threat of new entrants.
Bargaining power of suppliers.
Bargaining power of buyers.
Threat of substitute products.
Competitive rivalry among existing firms.

Porter's generic strategies — how to compete:
Cost leadership — be the lowest-cost producer.
Differentiation — offer something distinctive customers pay more for.
Focus — apply cost or differentiation to a narrow segment.
Being stuck in the middle — neither cheap nor distinctive — is the failure state.

Porter's value chain — where value is added:
Primary activities: inbound logistics, operations, outbound logistics, marketing and sales, service.
Support activities: firm infrastructure, human resource management, technology development, procurement.

Direction of growth — Ansoff's matrix:
Market penetration (existing product, existing market), market development (existing product, new market), product development (new product, existing market), diversification (new product, new market).

BCG matrix — portfolio by market share and growth: stars, cash cows, question marks, dogs.`,
      },
      {
        kind: "example",
        heading: "Worked example — a regional airline weighing growth",
        body: `A profitable regional airline wants to grow. Work the tools in order.

Five Forces on its industry: rivalry is intense, buyers are price-sensitive with low switching costs, and substitutes (rail, video calls) are real. This is a low-margin industry, so the generic strategy matters.

Generic strategy: the airline currently competes on low fares — cost leadership. Growing by adding premium lounges and business seats would push it toward differentiation, risking being stuck in the middle: higher costs without a clear premium position.

Ansoff for the growth options:
Fly existing routes more frequently — market penetration, lowest risk.
Open new international routes with the same aircraft — market development, moderate risk.
Launch a cargo service — product development.
Buy a hotel chain — diversification, highest risk and far from its core capabilities.

Conclusion: penetration and cautious market development fit its cost-leadership position and its existing resources; diversification into hotels breaks strategic fit. The recommendation flows from the analysis, not from ambition.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Listing every factor a model can hold instead of applying it — a PESTEL or SWOT that is a generic checklist earns little; the marks are in the factors that matter to this organisation.

Confusing the Five Forces with PESTEL — Five Forces analyses the industry (suppliers, buyers, entrants, substitutes, rivalry); PESTEL analyses the wider macro-environment.

Recommending both cost leadership and differentiation at once — that is Porter's stuck in the middle, the position to avoid, not a clever hybrid to aim for.

Muddling Ansoff's quadrants — new product plus new market is diversification and the riskiest, not market development.

Treating SWOT as the analysis rather than a summary — SWOT organises findings from other tools; on its own it explains nothing.

Ignoring strategic fit — an option that stretches beyond the organisation's resources and capabilities is a warning sign, however attractive the market looks.`,
      },
    ],
  },

  /* ───────────────────────── C — Risk & control ───────────────────────── */
  {
    paper: "SBL",
    area: "C",
    title: "Risk & control",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why risk is managed, not banished",
        body: `Every business decision is a bet on an uncertain future, so risk is not a problem to eliminate — it is the raw material of return. The board's job is not to avoid all risk but to take the right risks knowingly, within an appetite it has chosen, and to be confident that the ones it does not want are being controlled. That is risk management: identifying what could go wrong (and right), assessing how likely and how damaging it is, deciding what to do about it, and monitoring the result.

Risk appetite is the amount and type of risk an organisation is willing to seek or accept in pursuit of its objectives. Sit above appetite and you are gambling; sit far below it and you leave value on the table. Directors are accountable for setting appetite and for the control system that keeps the business inside it.

Internal control is how that intention becomes reality on the ground. It is the set of policies, procedures and behaviours — from board tone down to a clerk checking an invoice — that give reasonable, not absolute, assurance that objectives are met, assets are safeguarded, reporting is reliable and laws are obeyed. Two mindsets matter throughout SBL. Prudence, so risks are not understated, and professional scepticism, so managers do not simply trust that controls are working without evidence.`,
      },
      {
        kind: "structure",
        heading: "The risk & control toolkit",
        body: `The risk management cycle: identify, assess, respond, monitor and report — then repeat.

Assess each risk on two axes — likelihood (how probable) and impact (how severe) — and plot it on a risk map.

Risk responses — TARA, also taught as the 4 Ts:
Transfer (Transfer) — share or shift the risk, e.g. insurance or outsourcing. Best for low-likelihood, high-impact risks.
Avoid (Terminate) — stop the activity causing the risk. Best for high-likelihood, high-impact risks.
Reduce (Treat) — put in controls that lower likelihood or impact. Best for high-likelihood, low-impact risks.
Accept (Tolerate) — bear it because it is within appetite. Best for low-likelihood, low-impact risks.

COSO internal control framework — five components:
Control environment — the tone, integrity and governance culture at the top.
Risk assessment — identifying and analysing risks to objectives.
Control activities — the policies and procedures that carry out responses.
Information and communication — capturing and sharing relevant information.
Monitoring activities — checking the controls keep working.

Lines of defence: operational management owns and manages risk (first); risk and compliance functions oversee it (second); internal audit gives independent assurance (third).`,
      },
      {
        kind: "example",
        heading: "Worked example — a manufacturer maps its risks",
        body: `A manufacturer identifies four risks. Place each on the likelihood-impact map and choose a TARA response.

A fire destroying the main plant — low likelihood, high impact. Transfer: insure the plant, because reducing it fully is impractical and the cost of a hit is severe.

Operating in a country whose government may seize foreign assets — high likelihood, high impact. Avoid: exit or do not enter that market; the exposure is too great to control.

Frequent minor defects on the production line — high likelihood, low impact. Reduce: introduce quality checks and staff training to lower the frequency.

Occasional short delays from a reliable supplier — low likelihood, low impact. Accept: it sits within appetite, so bear it and monitor.

Now the control layer. COSO's control environment sets the tone that makes staff report defects honestly; control activities are the quality checks themselves; monitoring confirms the checks keep working. Note how the response follows directly from where the risk sits on the map — that mapping is what the examiner wants to see, not a generic call to reduce every risk.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Treating the goal as zero risk — the board's job is to manage risk to within appetite, not to eliminate it and forgo return.

Mismatching the response to the risk map — high-likelihood high-impact risks are avoided, not merely insured; low-likelihood high-impact risks are typically transferred, not accepted.

Claiming internal control gives absolute assurance — it gives reasonable assurance only; controls can be overridden, collude around, or fail.

Forgetting the human components of COSO — the control environment and monitoring matter as much as the procedural control activities; a tick-box system with a rotten culture still fails.

Confusing gross and net risk — TARA responses reduce gross (inherent) risk to net (residual) risk; the residual is what must sit within appetite.

Blurring the three lines of defence — internal audit provides independent assurance and must not own or run the controls it reviews.`,
      },
    ],
  },

  /* ───────────────────────── D — Technology, data & innovation ───────────────────────── */
  {
    paper: "SBL",
    area: "D",
    title: "Technology, data & innovation",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Why technology is a board issue",
        body: `Technology used to be something the IT department looked after. It is now a strategic question the board cannot delegate, because digital change can rewrite an entire industry's economics almost overnight. Firms that treated the internet, smartphones or streaming as a side issue were overtaken by ones that built their strategy around them. Disruption is the pattern: a new technology or business model serves customers in a way incumbents cannot match, and the market tips.

Data sits at the centre of this. Organisations now generate and capture enormous volumes of information — from transactions, sensors, social media and more — and the ones that turn it into insight gain a real edge. Big data analytics finds patterns humans would miss: which customers are about to leave, which machine is about to fail, which price will sell. But data creates duties as well as advantages. Poor-quality data leads to confident, wrong decisions, and holding personal data brings legal and ethical obligations to keep it secure and use it fairly.

Innovation is the wider capability behind all this: the organised pursuit of better products, processes and business models. The board's role is to build a culture and a resource base that can adopt and exploit new technology deliberately — while managing the risks that come with it, above all cyber risk, which is now one of the most significant threats most organisations face.`,
      },
      {
        kind: "structure",
        heading: "The technology & data toolkit",
        body: `Big data — the defining characteristics, the Vs:
Volume — the sheer quantity of data.
Velocity — the speed at which it is generated and must be processed.
Variety — the range of types and sources, from structured tables to text, images and video.
Veracity — the trustworthiness and quality of the data.
(A fifth, Value, is often added — data is worthless unless it yields useful insight.)

Data analytics — four ascending questions:
Descriptive — what happened?
Diagnostic — why did it happen?
Predictive — what is likely to happen?
Prescriptive — what should we do about it?

Enabling technologies to recognise: cloud computing, artificial intelligence and machine learning, automation and robotic process automation, the Internet of Things, blockchain, and mobile and e-business platforms.

Technology in Porter's value chain — technology development is a support activity that can strengthen every primary activity, and information systems can create advantage across the chain.

Cyber and data risk: threats include data breaches, ransomware, fraud and system failure; controls include access controls, encryption, staff training, backups and incident response planning. Holding personal data also brings data-protection duties — lawful, fair, secure use.`,
      },
      {
        kind: "example",
        heading: "Worked example — a retailer exploits its data",
        body: `A supermarket chain holds years of loyalty-card transactions and wants value from them. Work through the analytics ladder.

Descriptive — dashboards show what sold, where and when. Useful, but only a rear-view mirror.
Diagnostic — analysis reveals why sales dipped in one region: a competitor opened nearby.
Predictive — a model flags which loyalty customers are likely to stop shopping there next quarter.
Prescriptive — the system recommends a targeted offer to those at-risk customers.

Test the data against the Vs. Volume and velocity are high — millions of transactions a day — so the chain needs scalable systems, likely cloud-based. Variety is rising as it adds app and web behaviour. Veracity is the risk: duplicate or out-of-date records would target the wrong people, so data cleansing comes first. And Value only appears if the insight changes a decision — here, the retention offer.

Finally the duties. The loyalty data is personal data, so the chain must secure it and use it within data-protection law; a breach would bring legal penalties and reputational damage far larger than any campaign's gain. The board, not the IT team, owns that trade-off.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Treating technology as an operational IT matter rather than a strategic, board-level one — digital disruption changes strategy, so the board must own it.

Reciting the big-data Vs without applying them — the marks come from showing which V is the real issue for this organisation, not from defining volume, velocity, variety and veracity in the abstract.

Confusing the levels of analytics — describing what happened (descriptive) is not the same as predicting what will happen (predictive) or recommending action (prescriptive).

Assuming more data automatically means better decisions — poor veracity means confident, wrong conclusions; quality and relevance beat quantity.

Ignoring the risk and ethics side — cyber risk, data security and data-protection duties are part of the answer, not an afterthought.

Confusing digital transformation with simply buying software — it is a change in strategy, processes and culture, not a one-off purchase.`,
      },
    ],
  },

  /* ───────────────────────── E — Professional skills ───────────────────────── */
  {
    paper: "SBL",
    area: "E",
    title: "Professional skills",
    minutes: 5,
    sections: [
      {
        kind: "concept",
        heading: "Why skills carry their own marks",
        body: `SBL is unusual: a large share of the marks — twenty out of the hundred available — is awarded not for technical knowledge but for how you behave as a professional. The exam simulates a real role. You are given a company, a set of exhibits and a task from a named person, and you must respond as an adviser would. The professional skills marks reward doing that convincingly.

The point is that in practice, being right is not enough. A brilliant analysis in the wrong format, aimed at the wrong reader, or delivered with no commercial sense, fails the person who asked for it. Employers do not want a walking textbook; they want someone who can take ambiguous information, weigh it, spot what does not add up, judge what matters, and communicate a recommendation the reader can act on. The professional skills are ACCA's way of testing exactly that alongside the technical content.

So they are not a separate topic to revise but a way of working that must show through every answer. You earn them by responding to the specific scenario — using its facts, its people and its exhibits — rather than writing a generic essay. Technical marks and skills marks are won together, in the same words, when your analysis is applied, sceptical, well judged and clearly expressed.`,
      },
      {
        kind: "structure",
        heading: "The five professional skills",
        body: `SBL awards professional skills marks across five named skills:

Communication — convey information clearly, persuasively and in a format and tone that fits the audience and the task. Use the requested output (report, letter, briefing notes, email) and write to the named reader.

Commercial acumen — show business awareness and judgement. Recognise the organisation's wider context, use the industry realities in the scenario, and make recommendations that are practical and cost-aware, not just theoretically correct.

Analysis — examine and interpret the data in the exhibits to understand the situation. Break problems into parts, use the numbers and facts provided, and draw out what they mean rather than restating them.

Scepticism — probe and challenge. Question the reliability of information, spot inconsistencies, bias, hidden assumptions or missing evidence, and do not take management's assertions at face value.

Evaluation — weigh evidence and options to reach a balanced, well-reasoned judgement. Consider strengths and weaknesses, appreciate the situation as a whole, and come to a clear, supported conclusion.

Underpinning all five: apply everything to the specific scenario, and act ethically and with integrity throughout.`,
      },
      {
        kind: "example",
        heading: "Worked example — reviewing a rushed acquisition case",
        body: `A finance director asks you to comment on a proposed acquisition, attaching the target's forecasts and a glowing board paper. See how each skill shows up.

Analysis — you interrogate the forecasts: revenue is projected to double in a year with no explanation, and the margins assumed are far above the industry norm in the exhibits.

Scepticism — you challenge the source. The forecasts were prepared by the target's own management, who benefit from the sale, and the board paper omits any downside case. You flag this bias and the missing evidence rather than accepting the numbers.

Evaluation — you weigh both sides: real strategic fit and market access against fragile forecasts and integration risk, and reach a balanced judgement rather than a simple yes or no.

Commercial acumen — you note the price implied by these forecasts and whether the group can fund it without straining cash, keeping the advice practical.

Communication — you deliver it as the briefing notes the FD asked for, in a clear professional tone, so the FD can act. Notice that every skill is earned by using the specific exhibits, never by writing in general terms.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Ignoring the requested format — being asked for a report and writing an essay, or dropping the letter or email layout, loses communication marks that were free to take.

Writing generically — professional skills are earned by applying points to the scenario's facts, people and exhibits; a textbook answer scores technical marks at best.

Accepting the exhibits at face value — scepticism marks reward challenging the reliability, source and bias of information, especially figures prepared by an interested party.

Restating the numbers instead of analysing them — analysis means interpreting what the data means for the decision, not copying it out.

Sitting on the fence — evaluation marks require a balanced judgement and a clear, supported conclusion, not an endless list of pros and cons with no verdict.

Forgetting commercial reality — a recommendation that ignores cost, cash or practicality misses the commercial acumen marks, however sound the theory.`,
      },
    ],
  },
]
