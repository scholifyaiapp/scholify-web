import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area A — Business organisation & its environment.
 * Source-mapped to ACCA BT/FBT syllabus and study guide, September 2025 to
 * August 2026, official Area A (topic groups A1-A9). Original Scholify wording;
 * no ACCA/Kaplan/BPP text.
 */

export const BT_A: StudyChapter = {
  paper: "BT",
  area: "A",
  title: "Business organisation & its environment",
  minutes: 28,
  intro: "A business is never a closed box. It is a group of people pursuing a shared goal, surrounded by parties who want something from it and by forces it cannot control. Area A is the map of that whole system.",
  outcomes: [
    "Distinguish the main types of business organisation and why the choice matters",
    "Identify internal, connected and external stakeholders and map them with Mendelow's matrix",
    "Explain how political, legal, macroeconomic, social, demographic and technological forces affect organisations",
    "Apply demand, supply, elasticity, market structure and cost behaviour to a business scenario",
    "Explain environmental and sustainability impacts on organisations and their stakeholders",
    "Assess competitiveness using Porter's value chain, value networks and five forces",
  ],
  sections: [
    {
      id: "what-is-org",
      heading: "What an organisation is — and the forms it takes",
      blocks: [
        { kind: "text", md: "An **organisation** is a social arrangement that pursues **collective goals**, controls its own performance, and has a **boundary** separating it from its environment. That last idea matters more than it sounds: the boundary is where the business meets everything it cannot command — customers, rivals, regulators, the economy. Most of Area A is about managing across that boundary." },
        { kind: "text", md: "Organisations differ in why they exist and how they are owned. A corner shop, a global bank and a children's charity are all organisations, but they answer to very different masters. The starting question is always **who owns it and who is it run for?**" },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The main types of business organisation",
          caption: "Ownership and purpose drive everything else — liability, finance, and who the accounts serve.",
          data: {
            items: [
              { title: "Sole trader", sub: "One owner, unlimited liability. Simple, cheap, but the owner is the business." },
              { title: "Partnership", sub: "Two or more owners sharing profit and (usually) unlimited liability." },
              { title: "Limited company", sub: "A separate legal person; owners' liability limited to their shares." },
              { title: "Not-for-profit", sub: "Charities, mutuals, public bodies — run for a mission, not owner profit." },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one distinction to fix first", md: "A **limited company** has its own **separate legal personality** — it can own assets, owe money and be sued in its own name. A sole trader and a traditional partnership do **not**: the owners and the business are legally the same, so the owners carry **unlimited liability** for its debts." },
        { kind: "table", caption: "Comparing the forms on the points examiners test", head: ["Feature", "Sole trader", "Partnership", "Limited company"], rows: [
          ["Legal identity", "Same as owner", "Same as partners", "Separate legal person"],
          ["Liability for debts", "Unlimited", "Usually unlimited", "Limited to share capital"],
          ["Ease of setting up", "Very easy", "Easy", "Formal registration required"],
          ["Access to finance", "Limited", "Moderate", "Widest — can issue shares"],
          ["Ownership vs control", "Same person", "Usually the same", "Can be separated (the agency issue)"],
        ] },
        { kind: "text", md: "The company form introduces a theme that runs through the whole exam: the **separation of ownership and control**. Shareholders **own** the company but directors **run** it. That gap creates the need for governance, stewardship reporting and the stakeholder thinking we turn to next." },
      ],
    },
    {
      id: "stakeholders",
      heading: "Stakeholders — internal, connected, external",
      blocks: [
        { kind: "text", md: "A **stakeholder** is any party with an interest in what the organisation does — anyone who affects it or is affected by it. They are grouped by how close they sit to the business. **Internal** stakeholders are inside it (employees, managers, directors). **Connected** stakeholders have a contractual or financial link (shareholders, lenders, customers, suppliers). **External** stakeholders sit outside with no direct contract but a real interest (government, the community, pressure groups)." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "Three rings of stakeholders",
          caption: "The closer the ring, the more direct the relationship — and usually the more power.",
          data: {
            centre: "The organisation",
            nodes: [
              { label: "Employees", sub: "internal — pay, security" },
              { label: "Managers & directors", sub: "internal — run the business" },
              { label: "Shareholders", sub: "connected — return on investment" },
              { label: "Lenders", sub: "connected — repayment" },
              { label: "Customers", sub: "connected — value, quality" },
              { label: "Suppliers", sub: "connected — timely payment" },
              { label: "Government", sub: "external — tax, regulation" },
              { label: "Community & pressure groups", sub: "external — impact" },
            ],
          },
        } },
        { kind: "text", md: "Stakeholders' interests often **conflict**. Shareholders may want higher dividends while employees want higher pay and customers want lower prices — the same pound cannot go to all three. Managing an organisation is partly the art of **balancing** these competing claims, and the first step is working out **whose claim carries most weight**." },
        { kind: "callout", tone: "warn", title: "Don't confuse the rings", md: "**Customers and suppliers are connected, not external** — they have a contract with the business. \"External\" is reserved for parties with an interest but no direct contractual link, such as government or the local community. This exact distinction is a favourite distractor." },
      ],
      check: {
        q: "A bank that has lent a company a five-year loan is best classified as which type of stakeholder?",
        options: [
          "Internal, because it monitors the company closely",
          "Connected, because it has a financial/contractual link",
          "External, because it is a separate organisation",
          "It is not a stakeholder — only owners are stakeholders",
        ],
        correct: 1,
        explain: "A lender has a direct financial contract with the business, which makes it a CONNECTED stakeholder — alongside shareholders, customers and suppliers. It is not internal (it is not part of the organisation) and not external (external parties have no contractual link). And stakeholders are far wider than owners: anyone affecting or affected by the business qualifies.",
      },
    },
    {
      id: "mendelow",
      heading: "Mendelow's matrix — mapping power and interest",
      blocks: [
        { kind: "text", md: "Once you have listed stakeholders, **Mendelow's power–interest matrix** tells you how to manage each one. It plots two things: **power** (the ability to influence the organisation) against **interest** (how much the stakeholder cares about a given decision). The combination sorts every stakeholder into one of four boxes, each with its own strategy." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Mendelow's four quadrants",
          caption: "The strategy for each stakeholder depends on the COMBINATION of power and interest.",
          data: {
            leftTitle: "Low interest",
            rightTitle: "High interest",
            rows: [
              { aspect: "High power", left: "Keep SATISFIED — powerful but not yet engaged; could become a threat", right: "KEY PLAYERS — manage closely; involve in decisions" },
              { aspect: "Low power", left: "Minimal EFFORT — monitor at low cost", right: "Keep INFORMED — brief them; they can lobby the powerful" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The four strategies", md: "**High power + high interest → key players (manage closely).** **High power + low interest → keep satisfied.** **Low power + high interest → keep informed.** **Low power + low interest → minimal effort (monitor).** Memorise which strategy sits in which corner — questions test the pairing directly." },
        { kind: "example", title: "Worked example — mapping stakeholders for a factory closure", scenario: "GreenFab plans to close an ageing factory and move production overseas. Map four stakeholders onto Mendelow's matrix and state how to manage each: (1) a major institutional shareholder, (2) the local council, (3) the factory's employees, (4) a small supplier of cleaning materials.", steps: [
          { label: "Major shareholder", detail: "High power (large voting block) and high interest (the move affects returns) → KEY PLAYER. Consult and involve them in the decision." },
          { label: "Local council", detail: "High interest (local jobs, local economy) but relatively low direct power over the company → KEEP INFORMED, as it could lobby government or the press." },
          { label: "Employees", detail: "Very high interest (their jobs) but individually low power → KEEP INFORMED; collectively, via a union, their power could rise and shift them toward key players." },
          { label: "Small supplier", detail: "Low power and low interest in this specific decision → MINIMAL EFFORT; simply monitor." },
        ], result: "The same event places stakeholders in different quadrants, and the quadrant — not the person — dictates the management strategy. Note how power can change: unionised employees can move from 'keep informed' to 'key players'." },
      ],
      check: {
        q: "In Mendelow's matrix, a stakeholder with HIGH power but LOW interest should be managed by which strategy?",
        options: [
          "Manage closely as a key player",
          "Keep satisfied",
          "Keep informed",
          "Minimal effort — just monitor",
        ],
        correct: 1,
        explain: "High power + low interest = KEEP SATISFIED. They are not interested enough today to be key players, but their power means a poorly-handled decision could rouse them into opposition, so keep them content. 'Manage closely' is high power + high interest; 'keep informed' is low power + high interest; 'minimal effort' is low power + low interest.",
      },
    },
    {
      id: "pestel",
      heading: "The macro environment — PESTEL",
      blocks: [
        { kind: "text", md: "Beyond its stakeholders, every organisation sits inside a **macro environment** of large forces it cannot control but must respond to. **PESTEL** is the checklist that ensures you scan all six: **P**olitical, **E**conomic, **S**ocial, **T**echnological, **E**nvironmental and **L**egal. It is a tool for **analysis and forecasting**, not for solving — it surfaces the threats and opportunities coming from outside the industry." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The six PESTEL factors",
          caption: "Macro forces that shape every industry, from the outside in.",
          data: {
            items: [
              { title: "Political", sub: "Government stability, trade policy, tax stance, public spending" },
              { title: "Economic", sub: "Interest rates, inflation, exchange rates, growth, unemployment" },
              { title: "Social", sub: "Demographics, lifestyles, attitudes, education, culture" },
              { title: "Technological", sub: "Automation, R&D, new platforms, rate of obsolescence" },
              { title: "Environmental", sub: "Climate, sustainability pressure, waste and emissions rules" },
              { title: "Legal", sub: "Employment law, health & safety, consumer and competition law" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Political vs Legal — the classic mix-up", md: "**Political** is about the stance and actions of government (trade wars, subsidies, political stability). **Legal** is about the specific **laws** a business must obey (minimum wage, data protection, safety rules). If it is a rule you can be sued or fined for breaking, it is Legal; if it is a policy direction, it is Political." },
        { kind: "example", title: "Worked example — applying PESTEL to a home-delivery grocer", scenario: "QuickCart is a fast-growing online supermarket. Identify one factor under each PESTEL heading that could materially affect it.", steps: [
          { label: "Political", detail: "A government push on gig-economy worker rights could force it to reclassify delivery drivers as employees." },
          { label: "Economic", detail: "Rising interest rates squeeze consumer spending and raise the cost of the debt funding its warehouse expansion." },
          { label: "Social", detail: "A lasting shift to convenience and at-home living expands its addressable market." },
          { label: "Technological", detail: "Route-optimisation AI and automated pick-and-pack can cut its cost per order." },
          { label: "Environmental", detail: "Pressure to cut packaging waste and switch to electric delivery vans raises cost but also brand appeal." },
          { label: "Legal", detail: "Tighter data-protection law affects how it stores customer purchase histories." },
        ], result: "PESTEL forces a 360° scan, so no whole category of threat or opportunity is missed. Note that one real-world issue (gig-worker status) can appear under more than one heading — Political and Legal both — which is normal." },
      ],
      check: {
        q: "A new law raising the national minimum wage is best classified under which PESTEL heading?",
        options: [
          "Economic, because it affects wage costs",
          "Legal, because it is a law the business must obey",
          "Social, because it concerns workers",
          "Political, because the government passed it",
        ],
        correct: 1,
        explain: "Although a minimum-wage rise clearly has economic effects, PESTEL classifies it by its NATURE — it is a specific law the business is legally required to comply with, so it sits under LEGAL. The exam rewards classifying by what the factor IS (a binding rule) rather than by the effects it happens to have.",
      },
    },
    {
      id: "porter",
      heading: "The competitive environment — Porter's five forces",
      blocks: [
        { kind: "text", md: "PESTEL scans the whole macro world; **Porter's five forces** zooms into the **industry** to judge how attractive — how profitable — it is likely to be. The stronger the forces, the more they squeeze industry profits. There are exactly **five** forces: get the count and the names right, because a common trap adds a bogus sixth or renames one." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Porter's five forces",
          caption: "The stronger each force, the LESS attractive (less profitable) the industry.",
          data: {
            items: [
              { title: "Threat of new entrants", sub: "How easily can newcomers join? Low barriers = high threat." },
              { title: "Bargaining power of suppliers", sub: "Few, strong suppliers can push up input prices." },
              { title: "Bargaining power of buyers", sub: "Few, large or price-sensitive buyers force prices down." },
              { title: "Threat of substitutes", sub: "Alternatives from OTHER industries that meet the same need." },
              { title: "Competitive rivalry", sub: "Intensity of competition among existing firms — the central force." },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Read the direction of each force", md: "A **strong** force is **bad** for the industry: strong buyer power, strong supplier power, easy entry, many substitutes and fierce rivalry all **erode profit**. An attractive industry is one where the forces are **weak** — high barriers, dependent suppliers and buyers, few substitutes, gentle rivalry." },
        { kind: "text", md: "Watch the **substitutes** force closely: it means a product from a **different** industry that satisfies the **same customer need** — video calls substituting for air travel, streaming for cinema. It is not simply another brand of the same product (that is rivalry). Mixing up substitutes and rivalry is one of the most common errors on this model." },
      ],
      check: {
        q: "In an industry where a few enormous retail chains buy most of the output, which of Porter's five forces is strong — and what is the effect?",
        options: [
          "Threat of new entrants is strong, raising industry profit",
          "Bargaining power of buyers is strong, reducing industry profit",
          "Bargaining power of suppliers is strong, raising industry profit",
          "Threat of substitutes is strong, raising industry profit",
        ],
        correct: 1,
        explain: "A handful of huge customers gives BUYERS strong bargaining power — they can demand lower prices and better terms, which REDUCES the industry's profitability. Remember the direction: any strong force is bad news for industry profit. Strong buyer power never raises profit for the sellers.",
      },
    },
    {
      id: "economic-environment",
      heading: "The economic environment — from national policy to customer demand",
      blocks: [
        { kind: "text", md: "**Macroeconomics** studies the economy as a whole. Governments normally pursue growth, high employment, stable prices and a sustainable external position, but those goals can conflict. Expansion may reduce unemployment while adding inflationary pressure; measures that restrain inflation may slow activity." },
        { kind: "table", caption: "The two principal policy levers", head: ["", "Fiscal policy", "Monetary policy"], rows: [
          ["Tools", "Government spending, taxation and borrowing", "Interest rates, money and credit conditions"],
          ["Expansion", "Higher spending or lower taxes", "Lower rates generally encourage borrowing and demand"],
          ["Contraction", "Lower spending or higher taxes", "Higher rates generally restrain borrowing and demand"],
        ] },
        { kind: "text", md: "At the **microeconomic** level, demand describes how much buyers are willing and able to purchase at different prices; supply describes how much sellers offer. A change in the product's own price normally causes movement along a curve. A change in income, tastes, technology or the price of related goods shifts a whole curve." },
        { kind: "callout", tone: "key", title: "Elasticity changes the commercial response", md: "Demand is **price elastic** when quantity demanded changes proportionately more than price, and **price inelastic** when it changes less. Substitutes normally increase price sensitivity; necessity, loyalty or few alternatives normally reduce it. Complements are consumed together, so demand for one is linked to demand for the other." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Four market structures",
          caption: "Distinguish them by number of sellers, product differences and barriers to entry.",
          data: { items: [
            { title: "Perfect competition", sub: "Many sellers, homogeneous output, easy entry and firms are price takers." },
            { title: "Monopolistic competition", sub: "Many sellers with differentiated products and some pricing discretion." },
            { title: "Oligopoly", sub: "A few interdependent firms; each anticipates competitors' reactions." },
            { title: "Monopoly", sub: "One dominant supplier protected by substantial barriers to entry." },
          ] },
        } },
        { kind: "callout", tone: "tip", title: "Short run versus long run", md: "In the **short run**, at least one factor of production is fixed. In the **long run**, all factors can change and the organisation can alter its scale. The distinction is about flexibility of inputs, not a fixed number of months or years." },
      ],
      check: {
        q: "A product has many close substitutes. All else equal, what is most likely about demand for that product?",
        options: [
          "It is relatively price elastic because customers can switch",
          "It is relatively price inelastic because customers can switch",
          "Supply must be perfectly inelastic",
          "Demand cannot respond to a price change",
        ],
        correct: 0,
        explain: "Close substitutes make switching easier, so a price rise is more likely to produce a proportionately large fall in quantity demanded. Demand is therefore relatively price elastic.",
      },
    },
    {
      id: "change-sustainability",
      heading: "Social, technological and environmental change",
      blocks: [
        { kind: "text", md: "Demographic patterns—age, migration, household composition, education and workforce participation—change both the labour available to organisations and the products households demand. Businesses respond through product design, location, recruitment and working practices; governments may respond through education, pensions, migration and labour-market policy." },
        { kind: "text", md: "Technology can automate work, reduce layers, enable remote coordination and change the accountant's role from transaction processing toward analysis, control and decision support. **Downsizing** reduces headcount, **delayering** removes management levels, and **outsourcing** transfers an activity to an external provider. They are related responses, not synonyms." },
        { kind: "callout", tone: "rule", title: "Sustainability is both impact and dependency", md: "An organisation affects the physical environment through resource use, emissions, waste and products; it also depends on climate, energy, water, ecosystems and regulation. A complete answer considers both directions and connects them to stakeholder expectations, cost, resilience and reputation." },
        { kind: "text", md: "Porter's **value chain** separates primary activities— inbound logistics, operations, outbound logistics, marketing and sales, and service—from support activities such as infrastructure, human resources, technology development and procurement. A **value network** extends the view beyond one organisation to the suppliers, partners and channels that jointly create value." },
      ],
      check: {
        q: "A company contracts an independent specialist to operate its payroll function. Which change is this?",
        options: ["Delayering", "Downsizing only", "Outsourcing", "Centralisation"],
        correct: 2,
        explain: "The activity is transferred to an external provider, so this is outsourcing. Headcount reduction alone describes downsizing; delayering specifically removes management levels.",
      },
    },
    {
      id: "area-b-preview",
      heading: "Bridge to Area B — structure and culture",
      blocks: [
        { kind: "callout", tone: "tip", title: "Next syllabus area", md: "The official Area A ends with competitiveness. This short bridge previews **official Area B**, where organisational structure, culture, governance and sustainability are studied and assessed in their own right." },
        { kind: "text", md: "Having looked outward, we turn inward: **how the organisation is built** and **how it behaves**. Structure is the formal skeleton — who reports to whom; culture is the informal personality — \"the way we do things around here\"." },
        { kind: "text", md: "**Mintzberg** described any organisation as five **building blocks**. The **strategic apex** (senior management) sets direction; the **operating core** does the basic work; the **middle line** links the two; the **technostructure** designs systems and standards (analysts, planners); and the **support staff** provide indirect services (HR, legal, catering). Different organisations lean on different blocks — a consultancy is dominated by its operating core of professionals, a mass factory by its technostructure." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Tall vs flat structures",
          caption: "The number of management layers — and the span of control — shapes how an organisation feels to work in.",
          data: {
            leftTitle: "Tall structure",
            rightTitle: "Flat structure",
            rows: [
              { aspect: "Layers of management", left: "Many", right: "Few" },
              { aspect: "Span of control", left: "Narrow (few reports each)", right: "Wide (many reports each)" },
              { aspect: "Supervision", left: "Close, tight control", right: "Looser; relies on delegation" },
              { aspect: "Communication", left: "Slow — long chain of command", right: "Fast — short chain" },
              { aspect: "Cost & promotion", left: "Costly; clear promotion ladder", right: "Cheaper; fewer promotion rungs" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Centralisation vs decentralisation", md: "A **centralised** organisation keeps decision-making at the top — consistent and tightly controlled, but slower and less responsive locally. A **decentralised** one pushes decisions down to lower levels — faster, more motivating and locally responsive, but harder to coordinate and control." },
        { kind: "text", md: "**Culture** is the shared values and norms that guide behaviour. **Handy** named four cultural types. **Power culture** radiates from one central figure (a small entrepreneurial firm). **Role culture** runs on rules, procedures and job descriptions (a classic bureaucracy). **Task culture** forms teams around projects, prizing expertise and results (a matrix or project firm). **Person culture** exists to serve the individuals within it (a barristers' chambers or a doctors' partnership)." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Handy's four cultural types",
          caption: "Culture is 'the way we do things around here' — Handy gives it four recognisable shapes.",
          data: {
            items: [
              { title: "Power culture", sub: "One central source of power; few rules; fast decisions. Symbol: a web." },
              { title: "Role culture", sub: "Rules, hierarchy and job roles rule; stable and bureaucratic. Symbol: a Greek temple." },
              { title: "Task culture", sub: "Teams built around projects; expertise and results matter most. Symbol: a net/matrix." },
              { title: "Person culture", sub: "The organisation exists to serve its individual members. Symbol: a cluster/stars." },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Structure and culture must fit", md: "A **role culture** naturally pairs with a **tall, centralised** structure; a **task culture** pairs with a **flat, decentralised** one. Forcing a fast-moving task culture into a rigid role structure — or vice versa — is a classic cause of organisational friction that scenarios love to describe." },
      ],
      check: {
        q: "A long-established civil-service department runs strictly on written procedures, defined job roles and a clear hierarchy. Which of Handy's cultural types does it best illustrate?",
        options: [
          "Power culture",
          "Role culture",
          "Task culture",
          "Person culture",
        ],
        correct: 1,
        explain: "Rules, hierarchy and defined job roles are the hallmarks of a ROLE culture — Handy's 'Greek temple', a stable bureaucracy where position and procedure matter more than personality. Power culture centres on one individual; task culture forms around project teams; person culture exists to serve its members. A civil-service department is the textbook role culture.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying a sole trader or partnership has limited liability, or its own legal identity.", fix: "Only a limited company is a separate legal person with limited liability. Sole traders and traditional partnerships carry unlimited liability — owner and business are legally one." },
    { trap: "Classifying customers or suppliers as 'external' stakeholders.", fix: "They have a contract with the business, so they are CONNECTED. 'External' means an interest but no contractual link — government, community, pressure groups." },
    { trap: "Muddling Mendelow's quadrants — e.g. treating high power + low interest as 'key players'.", fix: "Key players = high power + high interest. High power + low interest = keep satisfied. Low power + high interest = keep informed. Low power + low interest = minimal effort." },
    { trap: "Filing a factor under the wrong PESTEL letter — classifying a new law as 'Economic' or 'Political'.", fix: "Classify by what the factor IS. A binding law = Legal; a government stance/policy = Political; wage/price/rate effects = Economic." },
    { trap: "Confusing Porter's 'substitutes' with 'competitive rivalry', or inventing a sixth force.", fix: "There are exactly five forces. Substitutes come from a DIFFERENT industry meeting the same need; rivalry is competition among existing firms in the same industry." },
    { trap: "Reading a 'strong' Porter force as good for the industry.", fix: "Every strong force squeezes industry profit. An attractive, profitable industry is one where the five forces are WEAK." },
    { trap: "Treating fiscal and monetary policy as interchangeable.", fix: "Fiscal policy uses government spending, taxation and borrowing; monetary policy primarily uses interest rates and monetary or credit conditions." },
    { trap: "Calling every reduction in staff 'delayering'.", fix: "Downsizing reduces headcount; delayering removes management levels; outsourcing transfers an activity to an external provider." },
  ],
  keyTerms: [
    { term: "Separate legal personality", def: "The status of a company as a legal person distinct from its owners, able to own assets, owe debts and be sued in its own name — the basis of limited liability." },
    { term: "Connected stakeholder", def: "A party with a contractual or financial link to the organisation — shareholders, lenders, customers and suppliers — sitting between internal and external groups." },
    { term: "Mendelow's matrix", def: "A tool that maps stakeholders by power and interest into four quadrants (key players, keep satisfied, keep informed, minimal effort) to decide how to manage each." },
    { term: "PESTEL analysis", def: "A framework for scanning the macro environment across six factors: Political, Economic, Social, Technological, Environmental and Legal." },
    { term: "Porter's five forces", def: "A model assessing industry attractiveness through five forces: threat of new entrants, supplier power, buyer power, threat of substitutes and competitive rivalry." },
    { term: "Fiscal policy", def: "Government decisions on expenditure, taxation and borrowing used to influence economic activity and welfare." },
    { term: "Price elasticity of demand", def: "The responsiveness of quantity demanded to a change in price; demand is elastic when the proportionate quantity response is greater than the proportionate price change." },
    { term: "Value chain", def: "Porter's model of the linked primary and support activities through which an organisation creates value." },
  ],
  summary: [
    "Business forms differ by ownership and liability: only a limited company is a separate legal person with limited liability; sole traders and partnerships carry unlimited liability.",
    "Stakeholders are internal, connected (contractual link) or external, and their interests conflict — Mendelow's power–interest matrix decides how to manage each of the four quadrants.",
    "PESTEL scans the macro environment across Political, Economic, Social, Technological, Environmental and Legal factors; classify each factor by what it is.",
    "Porter's five forces judge industry attractiveness — new entrants, supplier power, buyer power, substitutes and rivalry; strong forces erode profit.",
    "Macroeconomic policy affects overall activity: fiscal policy changes spending, taxation and borrowing, while monetary policy works mainly through interest rates and credit conditions.",
    "Demand, supply, elasticity, costs and market structure explain how customers and competitors respond at business level.",
    "Social, demographic, technological and environmental changes alter demand, work, organisational design and long-term resilience.",
    "Porter's value chain explains internal value creation; a value network extends the analysis across connected organisations.",
    "Internally, Mintzberg's five building blocks, tall vs flat structures and centralisation describe the skeleton, while Handy's four cultures (power, role, task, person) describe the personality — and the two must fit.",
  ],
}
