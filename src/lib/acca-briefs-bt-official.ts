import type { TopicBrief } from "@/lib/acca-briefs"
import { KNOWLEDGE_BRIEFS } from "@/lib/acca-briefs-knowledge"

function legacy(area: string): TopicBrief {
  const brief = KNOWLEDGE_BRIEFS.find((item) => item.paper === "BT" && item.area === area)
  if (!brief) throw new Error(`BT brief migration: missing former Area ${area}`)
  return brief
}

const OLD_A = legacy("A")
const OLD_PEOPLE = legacy("B")
const OLD_SYSTEMS = legacy("D")

export const BT_OFFICIAL_BRIEFS: TopicBrief[] = [
  {
    ...OLD_A,
    area: "A",
    title: "Business organisation and its external environment",
    sections: [
      ...OLD_A.sections,
      {
        kind: "structure",
        heading: "Economic, technological and sustainability essentials",
        body: `Fiscal policy uses government spending, taxation and borrowing; monetary policy works mainly through interest rates and credit conditions. Inflation, unemployment, growth and external imbalance affect households and business demand.

At market level, distinguish movement along demand or supply from a shift of the whole curve. Price elasticity measures responsiveness; close substitutes generally make demand more elastic. Market structures run from perfect competition through monopolistic competition and oligopoly to monopoly.

Technology can automate work and enable downsizing, delayering or outsourcing. Demographic change alters both labour supply and customer demand. Environmental analysis must consider how the organisation affects the physical environment and how it depends on resources, climate and regulation.

Porter's value chain maps primary and support activities inside one organisation; a value network extends the analysis across suppliers, partners and channels.`,
      },
    ],
  },
  {
    paper: "BT",
    area: "B",
    title: "Structure, culture, governance and sustainability",
    minutes: 6,
    sections: [
      { kind: "concept", heading: "How organisations arrange and govern power", body: `Formal structure allocates authority, responsibility and reporting lines; the informal organisation is the network of relationships and influence that develops in practice. Functional structures pool specialists, divisional structures create market accountability, matrix structures cross functions with projects, and boundaryless forms use networks and external partners.

Span of control, scalar chain, centralisation and decentralisation shape the speed and consistency of decisions. Culture supplies the shared assumptions and norms beneath the chart, so a technically sound structure can still fail when it conflicts with how people actually work.

Governance exists because owners or citizens entrust power to agents. Boards direct and oversee; independent non-executives challenge; audit, remuneration and nomination committees address specific conflicts. Sustainable business extends accountability across long-term economic resilience, stakeholders and environmental impact.` },
      { kind: "structure", heading: "Scenario map", body: `Functional: efficient specialist departments; weak cross-functional product ownership.
Divisional: responsive and accountable by product, geography or customer; duplicates functions.
Matrix: flexible cross-functional coordination; dual authority can create conflict.
Boundaryless: virtual, hollow or modular networks; flexible but dependent on coordination and partners.

Governance safeguards: balanced board, independent challenge, separated chair and chief executive roles, transparent reporting, effective committees, risk oversight and board evaluation.

Sustainability test: identify the organisation's impact on stakeholders and environment, its dependencies and risks, and the long-term response.` },
      { kind: "example", heading: "Quick application", body: `A diversified group with unrelated products needs clear product accountability: divisions may fit better than one functional hierarchy. A founder-controlled board of close associates lacks independent challenge: add suitably skilled non-executives and effective committees. A climate response based only on donations misses operational emissions, resource dependency and resilience.` },
      { kind: "traps", heading: "Classic traps", body: `Calling informal organisation automatically harmful; confusing non-executive oversight with daily management; claiming matrix employees have one boss; and reducing sustainability to philanthropy rather than long-term operations, impact and accountability.` },
    ],
  },
  { ...OLD_SYSTEMS, area: "C", title: "Business functions, regulation and technology" },
  { ...OLD_PEOPLE, area: "D", title: "Leadership and management" },
  {
    paper: "BT",
    area: "E",
    title: "Personal effectiveness and communication",
    minutes: 5,
    sections: [
      { kind: "concept", heading: "Turning professional ability into reliable performance", body: `Personal effectiveness connects objectives, priorities, time and review. Important work should be scheduled before urgency removes choice. Ineffectiveness appears as delay, errors, duplicated work, poor handovers and unresolved conflict, with consequences for cost, control, service and trust.

A competence framework describes required knowledge, skills and behaviours. A personal development plan records the gap, learning action, resources, date and evidence of improvement. Coaching targets performance, mentoring supports broader development, and counselling helps a person explore an issue.

Communication requires encoding, a suitable channel, decoding and feedback. Noise includes jargon, assumptions, status, emotion, overload and poor timing. Sensitive ambiguity needs a richer two-way channel than routine information.` },
      { kind: "structure", heading: "Action checklist", body: `Plan: define the outcome, prioritise, protect time, monitor and review.
Develop: compare evidence with the competence framework, act, gather evidence, review.
Resolve conflict: clarify facts and roles, listen for interests, collaborate or negotiate, mediate or escalate when proportionate.
Communicate: match message, audience and channel; make information accurate, relevant, timely and understandable; seek feedback.` },
      { kind: "example", heading: "Quick application", body: `A six-week exam is important before it is urgent, so schedule preparation now. A restructuring announcement is complex and emotional, so use live discussion with questions and a written follow-up. Two teams fighting over a shared analyst need their priorities and decision authority clarified before personalities are blamed.` },
      { kind: "traps", heading: "Classic traps", body: `Equating urgency with importance; treating coaching, mentoring and counselling as synonyms; assuming a sent message has been understood; and escalating conflict before clarifying facts, interests and authority.` },
    ],
  },
  {
    paper: "BT",
    area: "F",
    title: "Professional ethics",
    minutes: 6,
    sections: [
      { kind: "concept", heading: "Trust, principles and the public interest", body: `The five fundamental principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour. They protect trust in information and decisions, and the professional accountant's duty extends to the public interest—not only an employer or client.

Threats arise through self-interest, self-review, advocacy, familiarity and intimidation. Identify the threat, evaluate its significance and apply safeguards; decline, withdraw or report when safeguards cannot reduce it appropriately. Confidentiality permits or requires disclosure where law, professional duty or authorised consent applies.

Professional bodies set entry, education, ethical and disciplinary expectations. Corporate codes translate values into conduct on conflicts, gifts, information, assets, compliance and speaking up.` },
      { kind: "structure", heading: "Ethical response ladder", body: `1 Establish the facts and affected principles.
2 Identify threats, conflicts and legal or professional duties.
3 Consult authorised guidance without breaching confidentiality.
4 Apply safeguards: disclosure, independent review, separation, rotation or removal from the decision.
5 Document reasoning and escalate through appropriate channels.
6 Decline, withdraw or report externally where required and proportionate.` },
      { kind: "example", heading: "Quick application", body: `An accountant evaluating a supplier owned by a sibling faces self-interest and familiarity threats. Disclose the relationship and leave the decision. Remaining silent does not become objective merely because the accountant believes they can be fair.` },
      { kind: "traps", heading: "Classic traps", body: `Treating confidentiality as permission to hide illegality; jumping directly to resignation without considering safeguards and escalation; confusing integrity (truthfulness) with objectivity (freedom from bias); and assuming a written code works without leadership, advice, reporting and enforcement.` },
    ],
  },
]

