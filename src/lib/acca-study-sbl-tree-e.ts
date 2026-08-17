import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area E — Technology and data analytics.
 *
 * The shim relabelled legacy chapter SBL_D as the whole of Area E. Kaplan spends
 * three chapters and 116 pages on this material (e-business 36pp, using IT 54pp,
 * e-marketing 26pp) — and the 2021-22 texts predate E3 entirely, since machine
 * learning, AI and robotics became a named sub-topic afterwards. E3 and the
 * current form of E5 are therefore authored from the syllabus alone.
 *
 *   SBL-22  Cloud, mobile and smart technology         (E1)
 *   SBL-23  Big data and data analytics                (E2)
 *   SBL-24  Machine learning, AI and robotics          (E3)
 *   SBL-25  E-business, e-marketing and the value chain (E4)
 *   SBL-26  IT systems security, control and cyber      (E5)
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 */

const SBL_TREE_22: StudyChapter = {
  paper: "SBL",
  id: "SBL-22",
  number: 22,
  area: "E",
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)"],
  title: "Cloud, mobile and smart technology",
  minutes: 17,
  intro:
    "SBL never asks what the cloud is. It asks whether this organisation should move to it, what that would cost it in control, and what a board should insist on before agreeing — which is a governance question wearing a technology costume.",
  outcomes: [
    "Argue from a board's point of view why an organisation should keep looking at new technology at all",
    "Weigh what cloud, mobile and smart technology give an organisation against what they take away",
    "Advise on renting capability instead of owning hardware and software, and say what the board must fix first",
    "Spot the exposures a technology decision creates that its business case leaves out",
  ],
  sections: [
    {
      id: "why-look",
      heading: "Why a board has to keep looking",
      blocks: [
        {
          kind: "text",
          md: "Technology decisions reach the board because they change the cost base, the customer experience and the risk profile at once — and because the cost of arriving late is asymmetric. An organisation that adopts something useful a year early gains a year of advantage; one that adopts it three years late may find its cost base uncompetitive and its customers already accustomed to someone else's service.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The strategic framing that earns marks",
          md: "Never argue for technology on the grounds that it is modern. Tie it to something in the case: a cost the organisation cannot otherwise reduce, a capability a competitor already has, a scale constraint it has hit, a customer expectation it is failing, or a risk it cannot currently see. If none of those apply, the honest advice is that the spending is not yet justified — and saying so is worth more than enthusiasm.",
        },
        {
          kind: "table",
          caption: "Three technologies, and what each actually changes",
          head: ["Technology", "What it is", "What it changes strategically"],
          rows: [
            ["Cloud computing", "Computing, storage and applications rented over a network rather than owned", "Converts capital cost to operating cost; removes capacity limits; moves control to a supplier"],
            ["Mobile technology", "Access to systems and services from anywhere, on a personal device", "Changes how staff work and how customers buy; widens the security perimeter"],
            ["Smart technology", "Connected devices that sense, report and sometimes act on their own", "Creates operational data that did not previously exist; enables new services and new failure modes"],
          ],
        },
        {
          kind: "text",
          md: "Smart technology is worth dwelling on because candidates under-use it. Connected equipment generates a continuous record of how a product is actually used, which supports a genuinely different business model: selling availability or outcomes rather than machines, pricing by usage, and servicing before a failure rather than after it. Where a case describes a manufacturer facing commoditisation, that shift is often the strongest strategic recommendation available.",
        },
      ],
      check: {
        q: "Which argument for adopting cloud infrastructure would earn marks in an SBL answer?",
        options: [
          "Cloud computing is the current industry standard and the company appears outdated without it",
          "The company's own data centre is at capacity, a refresh needs $6m of capital it cannot fund, and demand is seasonal — so rented capacity that flexes matches both the constraint and the demand pattern",
          "Cloud computing reduces costs for all organisations",
          "Competitors have moved to the cloud, so the company should follow",
        ],
        correct: 1,
        explain:
          "Only option 1 names the constraint in the case, the funding problem and the demand characteristic that makes rented capacity the right answer. The others are true-sounding generalities that would appear in any answer about any company — and 'competitors have done it' is a reason to investigate, not a business case.",
      },
    },
    {
      id: "cloud-tradeoffs",
      heading: "What the cloud gives, and what it costs",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Owned infrastructure against rented",
            data: {
              leftTitle: "Own it",
              rightTitle: "Rent it",
              rows: [
                { aspect: "Cost shape", left: "Large capital outlay, then low running cost", right: "No capital, continuing operating cost that scales with use" },
                { aspect: "Capacity", left: "Fixed until the next investment; idle or short", right: "Flexes with demand, including downward" },
                { aspect: "Speed to change", left: "Procurement and installation lead times", right: "Provision in hours" },
                { aspect: "Control", left: "Complete — configuration, location, timing of change", right: "Constrained by the provider's platform and roadmap" },
                { aspect: "Expertise needed", left: "In-house infrastructure skills", right: "Contract, architecture and vendor-management skills" },
                { aspect: "Principal risk", left: "Obsolescence; capital tied up; capacity mismatch", right: "Dependence, data location, availability, exit difficulty" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The trade-off is genuinely a trade-off, and a balanced answer says so. Renting removes capital risk and capacity constraints and buys speed; it accepts dependence on a third party for something the organisation cannot operate without. Neither is automatically right — what makes it right is whether the organisation has addressed the specific exposures the choice creates.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The five conditions to attach to any cloud recommendation",
          md: "**Availability** — what uptime is contracted, and what happens when it is missed. **Data location and protection** — where data physically sits, and whether that satisfies the applicable regime. **Security responsibility** — precisely which party secures what, because the split is where breaches happen. **Exit** — how data is retrieved in a usable form, and how long a migration would take. **Continuity** — what the organisation does if the provider fails or is compromised. A recommendation without these is incomplete, and they are where the marks sit.",
        },
        {
          kind: "text",
          md: "The exit condition deserves emphasis because it converts a technology choice into a supplier-power problem, which links straight back to SBL-14. Once an organisation's data and processes sit on a platform it cannot practically leave, the provider's bargaining power rises at every renewal — and the eventual price increases are a foreseeable consequence of a decision taken years earlier on cost grounds.",
        },
      ],
      check: {
        q: "A board is told a cloud migration will 'transfer IT risk to the provider'. How should an adviser respond?",
        options: [
          "Confirm it, since the provider operates the infrastructure",
          "Correct it — operation transfers, but accountability for availability, data protection and continuity stays with the organisation, and dependence adds a new risk that must be contracted for and planned around",
          "Advise against migration because risk cannot be transferred",
          "Recommend transferring the residual risk through insurance instead",
        ],
        correct: 1,
        explain:
          "This is the same accountability point as outsourcing in SBL-14: customers and regulators hold the organisation responsible, whoever runs the servers. Migration can still be right — but on the basis that the exposures are contracted for, not that they have gone away.",
      },
    },
    {
      id: "mobile-and-smart",
      heading: "Mobile working and connected devices",
      blocks: [
        {
          kind: "text",
          md: "Mobile access changes the security problem qualitatively rather than quantitatively. When systems are reachable only from an office, the perimeter is a place; once they are reachable from any personal device on any network, there is no perimeter and control has to move to identity, the device and the data itself.",
        },
        {
          kind: "table",
          caption: "Mobile: benefit against exposure",
          head: ["Benefit", "Exposure it creates", "Control that answers it"],
          rows: [
            ["Staff productive anywhere", "Devices lost, stolen or shared", "Encryption, remote wipe, screen locks, device registration"],
            ["Faster field decisions with live data", "Corporate data on personal hardware", "Containerised apps; restrict local storage"],
            ["Lower premises cost", "Insecure networks in use", "Enforced VPN, certificate-based access"],
            ["Customer self-service", "Wider attack surface, weak credentials", "Multi-factor authentication, rate limiting, monitoring"],
            ["Recruitment reach", "Weaker supervision and culture transmission", "Clear expectations, output measures, deliberate contact"],
          ],
        },
        {
          kind: "text",
          md: "Connected — 'smart' — devices raise two further points a board should hear. First, they are often deployed by operational teams as equipment rather than as IT, so they escape the organisation's normal security and change controls entirely; a networked sensor with a default password is a route into the network that no one has recorded. Second, they generate data whose value depends on someone having decided in advance what decision it will inform, which is the subject of SBL-23.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The unregistered device is the classic case finding",
          md: "When an exhibit mentions building-management sensors, vehicle trackers, production monitors or similar installed by an operational function, ask whether they appear in the asset register, whether anyone patches them, and who holds their credentials. In most cases the honest answer is nobody — and that is a control gap with a route to the core network attached.",
        },
      ],
      check: {
        q: "Production monitoring sensors were installed by the operations team, are connected to the corporate network, and are not in the IT asset register. What is the primary concern?",
        options: [
          "The sensors may produce inaccurate production data",
          "Unpatched, unregistered network-connected devices with unmanaged credentials create an entry route to the corporate network that no one is monitoring",
          "The operations team lacked authority to purchase equipment",
          "The data will duplicate what the ERP system already records",
        ],
        correct: 1,
        explain:
          "Devices bought as equipment bypass the change and security controls that would apply to IT, so nobody patches them and default credentials often survive. Data accuracy matters, but the network exposure is the finding that could cost the organisation everything else.",
      },
    },
  ],
  examTraps: [
    { trap: "Arguing for technology because it is modern or because competitors have it.", fix: "Tie it to a constraint, cost, capability gap, customer expectation or risk stated in the case." },
    { trap: "Claiming a cloud migration transfers risk to the provider.", fix: "Operation transfers; accountability does not, and dependence is a new risk to contract for." },
    { trap: "Recommending cloud adoption with no conditions attached.", fix: "Specify availability, data location, the security responsibility split, exit and continuity." },
    { trap: "Ignoring operationally-installed connected devices.", fix: "Check the asset register, patching and credentials — they usually bypass IT control entirely." },
  ],
  keyTerms: [
    { term: "Cloud computing", def: "Computing, storage and applications consumed as a rented service over a network rather than owned and operated in-house." },
    { term: "Smart technology", def: "Connected devices that sense and report, and sometimes act, generating operational data that did not previously exist." },
    { term: "Exit provision", def: "Contracted arrangements for retrieving data in usable form and migrating away from a provider." },
    { term: "Shared responsibility", def: "The division of security duties between a cloud provider and its customer — the boundary where breaches commonly occur." },
    { term: "Attack surface", def: "The total set of points at which a system can be reached and therefore attacked." },
  ],
  summary: [
    "Justify technology from a constraint in the case, never from novelty or imitation.",
    "Renting removes capital and capacity risk and buys speed, at the price of dependence and control.",
    "Attach five conditions: availability, data location, security split, exit and continuity.",
    "Mobile working dissolves the perimeter, so control moves to identity, device and data.",
    "Operationally-installed connected devices routinely escape IT control and are a live network route.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes a technology argument strategic rather than promotional?", a: "It is tied to a cost, constraint, capability gap, customer expectation or unmanaged risk that the case actually establishes." },
    { q: "What does a cloud migration transfer, and what does it not?", a: "It transfers operation of the infrastructure; accountability for availability, data protection and continuity stays with the organisation." },
    { q: "Name the five conditions to attach to a cloud recommendation.", a: "Contracted availability, data location and protection, the security responsibility split, exit arrangements, and continuity if the provider fails." },
    { q: "Why does exit difficulty matter beyond IT?", a: "It raises the provider's bargaining power at every renewal, converting a technology decision into a supplier-power problem." },
  ],
  furtherStudy: [
    "SBL-23 covers the analytics that make device and system data useful",
    "SBL-26 covers IT security and control in depth",
    "SBL-14 covers the supplier power that exit difficulty creates",
    "SBL-32 covers investment appraisal of a technology business case",
  ],
}

const SBL_TREE_23: StudyChapter = {
  paper: "SBL",
  id: "SBL-23",
  number: 23,
  area: "E",
  syllabusRefs: ["E2(a)", "E2(b)", "E2(c)"],
  title: "Big data and data analytics",
  minutes: 17,
  intro:
    "Data is worth nothing until a decision changes because of it. This chapter is about making that link explicit — which is also the fastest way to expose the case where an organisation is collecting a great deal and deciding nothing differently.",
  outcomes: [
    "Show how data and analysis can be used to shape and deliver an organisation's strategy",
    "Describe what makes data 'big', and weigh the openings and the dangers it brings",
    "Pick out the data that would actually inform a decision on a new product, a market or a price",
    "Judge whether an organisation's data is fit to be relied on before advising that it is used",
  ],
  sections: [
    {
      id: "what-makes-it-big",
      heading: "What makes data 'big', and why it matters",
      blocks: [
        {
          kind: "text",
          md: "Big data is usually characterised by a handful of properties, and each one carries a practical consequence rather than being a label to memorise.",
        },
        {
          kind: "table",
          caption: "The characteristics, and what each demands",
          head: ["Property", "Meaning", "Consequence for the organisation"],
          rows: [
            ["Volume", "Far more data than conventional systems handle", "Storage and processing architecture must change"],
            ["Velocity", "Arriving continuously, often in real time", "Value decays quickly; batch reporting misses it"],
            ["Variety", "Structured and unstructured — text, image, sensor, log", "Cannot be forced into a conventional table"],
            ["Veracity", "Uncertain accuracy and provenance", "Conclusions inherit the data's unreliability"],
            ["Value", "Only realised when a decision changes", "Collection without a decision is pure cost"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Veracity and value are where the marks are",
          md: "Volume, velocity and variety describe the data. Veracity and value describe whether it is any use — and those are the two an adviser is paid to raise. A board proposing a data programme should be asked what decision will be made differently, and how reliable the inputs are, before it is asked about platforms.",
        },
        {
          kind: "text",
          md: "It is worth naming the four levels of analysis too, because they escalate in usefulness and in demands. **Descriptive** analysis says what happened; **diagnostic** says why; **predictive** estimates what may happen; **prescriptive** recommends what to do. Most organisations in SBL cases are firmly at the descriptive level while describing themselves as data-driven, and the gap between the two is a fair observation.",
        },
      ],
      check: {
        q: "A company has invested heavily in collecting customer behaviour data. Reports are produced monthly and circulated, but no pricing, product or marketing decision has changed. What is the assessment?",
        options: [
          "The investment is sound; benefits will emerge over time",
          "Value has not been realised — data creates value only when a decision changes, so the programme is currently a cost with a reporting output",
          "More data should be collected to reach a useful volume",
          "The reports should be circulated more widely",
        ],
        correct: 1,
        explain:
          "The point of the value characteristic is exactly this test. Circulating reports is activity, not value; until a price, a product or a campaign changes because of what the data showed, the organisation has bought a cost. Collecting more, as option 2 suggests, compounds it.",
      },
    },
    {
      id: "analytics-and-strategy",
      heading: "Using analysis to shape strategy",
      blocks: [
        {
          kind: "text",
          md: "E2(a) asks how data and analysis inform and implement strategy, and the honest answer is that they do so in a small number of recognisable ways. Knowing them means you can propose something specific when a case asks what the organisation should do with its data.",
        },
        {
          kind: "table",
          caption: "Where analysis changes a strategic decision",
          head: ["Use", "The decision it informs", "Data it needs"],
          rows: [
            ["Customer segmentation and value", "Which segments to serve, and at what price", "Purchase history, cost to serve, retention"],
            ["Churn prediction", "Where to intervene before a customer leaves", "Usage patterns, service contacts, payment behaviour"],
            ["Pricing", "What to charge, by segment, channel and time", "Elasticity, competitor prices, willingness to pay"],
            ["New product development", "What to build, and for whom", "Unmet needs from search, service logs, usage gaps"],
            ["Demand forecasting", "Capacity, inventory and staffing", "Historic demand, seasonality, external signals"],
            ["Predictive maintenance", "When to service before failure", "Sensor and condition data, failure history"],
            ["Credit and risk", "Which counterparties to accept, on what terms", "Payment history, external indicators"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Start from the decision, then name the data",
          md: "The reliable structure for any analytics recommendation: state the **decision** to be improved, the **data** that would inform it, whether the organisation **has** that data or must obtain it, the **analysis** required, and **who acts** on the output. Reversing the order — describing available data and hoping a use appears — is how organisations end up in the position described in the check above.",
        },
        {
          kind: "text",
          md: "One caution that separates a professional answer: correlation is not causation, and analytics is very good at producing convincing correlations. A finding that customers who use one feature renew more often may mean the feature causes loyalty, or that loyal customers explore more features. The recommendation differs completely — build the feature, or stop inferring causation from behaviour — so the analysis has to be tested before it drives spending.",
        },
      ],
      check: {
        q: "Analysis shows customers who use the mobile app renew at twice the rate of those who do not. Management proposes major investment in the app to raise retention. What should be raised first?",
        options: [
          "The analysis proves the app drives retention, so the investment is justified",
          "Whether the app causes loyalty or already-committed customers are simply more likely to install it — the direction of causation determines whether the spending will work",
          "The sample is too small to be meaningful",
          "Retention is not a suitable objective for app investment",
        ],
        correct: 1,
        explain:
          "Both explanations fit the same correlation and they imply opposite decisions. Testing causation — for instance by encouraging adoption among a comparable group and observing what happens — costs a fraction of the proposed investment and is what makes the recommendation defensible.",
      },
    },
    {
      id: "opportunities-threats-data",
      heading: "Openings, dangers and data quality",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "What data offers and what it exposes",
            data: {
              leftTitle: "Openings",
              rightTitle: "Dangers",
              rows: [
                { aspect: "Customers", left: "Personalisation, retention, better pricing", right: "Intrusion, loss of trust, regulatory breach" },
                { aspect: "Operations", left: "Efficiency, forecasting, maintenance before failure", right: "Decisions built on unreliable inputs" },
                { aspect: "Strategy", left: "Earlier sight of shifts in demand", right: "False confidence from spurious patterns" },
                { aspect: "Competition", left: "A capability rivals lack", right: "Rivals with better data compete on knowledge, not price" },
                { aspect: "Holding it", left: "An asset with option value", right: "A liability — breach exposure and compliance cost" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The bottom row is the one boards least expect to hear. Personal data held without a current purpose is a liability with a cost of carry: it must be secured, it must be governed, it increases the damage of any breach, and in many regimes retaining it without justification is itself a breach. **Deleting data the organisation has no use for is a risk-reduction measure**, and recommending it is often better advice than recommending more security around it.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Test the data before relying on it",
          md: "Before any analysis is trusted, ask: where did it come from, how is each field defined, who maintains it, how complete is it, how current is it, and do two systems holding the same fact agree? SBL exhibits routinely contain two figures for the same measure on different bases — and reconciling them, rather than averaging them, is the professional response. That is also a scepticism mark, which SBL-43 develops.",
        },
        {
          kind: "text",
          md: "Governance closes the loop. Data needs ownership at senior level, defined definitions, retention rules, quality measures and a lawful basis for holding personal information. Without those an analytics programme produces contested numbers, and contested numbers get ignored — which returns the organisation to deciding on instinct while paying for a data platform.",
        },
      ],
      check: {
        q: "A retailer holds fifteen years of customer transaction and contact data, and uses three years of it. What advice follows?",
        options: [
          "Retain everything — historic data may prove valuable later",
          "The unused twelve years is a liability carrying security, governance and breach exposure with no offsetting use; establish a retention policy and delete what has no lawful, current purpose",
          "Move the older data to cheaper storage and retain it indefinitely",
          "Sell the older data to offset its cost",
        ],
        correct: 1,
        explain:
          "Data with no current use still has to be secured and governed, magnifies any breach, and in many regimes cannot lawfully be retained without a purpose. Cheaper storage addresses only the smallest of those costs, which is why option 2 misses the point.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing data characteristics without reaching veracity and value.", fix: "Ask what decision changes and how reliable the inputs are — those are the adviser's questions." },
    { trap: "Recommending analytics from available data rather than from a decision.", fix: "Name the decision, the data, whether it exists, the analysis, and who acts." },
    { trap: "Reading a correlation as causation.", fix: "State both explanations and how to test which holds before committing spending." },
    { trap: "Treating retained data purely as an asset.", fix: "Unused personal data is a liability; recommend retention rules and deletion." },
    { trap: "Averaging two conflicting figures for the same measure.", fix: "Reconcile the bases and state what remains uncertain." },
  ],
  keyTerms: [
    { term: "Big data", def: "Data whose volume, velocity and variety exceed conventional handling, and whose veracity and value determine whether it is useful." },
    { term: "Descriptive analysis", def: "Analysis establishing what happened." },
    { term: "Predictive analysis", def: "Analysis estimating what may happen, based on patterns in past data." },
    { term: "Prescriptive analysis", def: "Analysis recommending which action to take." },
    { term: "Data provenance", def: "The traceable origin, ownership, definition and transformation history of data." },
    { term: "Retention policy", def: "Rules setting how long each category of data is kept and when it is deleted." },
  ],
  summary: [
    "Volume, velocity and variety describe data; veracity and value decide whether it helps.",
    "Value is realised only when a decision changes — reports circulating are not value.",
    "Structure any analytics advice as decision, data, gap, analysis, owner.",
    "Correlation is not causation, and the two readings imply opposite decisions.",
    "Unused personal data is a liability; test provenance and quality before relying on anything.",
  ],
  knowledgeDiagnostic: [
    { q: "Which two data characteristics should an adviser raise first, and why?", a: "Veracity and value — whether the data can be relied on, and what decision will change because of it. The rest describe the data rather than its usefulness." },
    { q: "What are the four levels of analysis?", a: "Descriptive — what happened; diagnostic — why; predictive — what may happen; prescriptive — what to do." },
    { q: "How should an analytics recommendation be structured?", a: "The decision to be improved, the data needed, whether the organisation holds it, the analysis required, and who will act on the output." },
    { q: "Why is unused personal data a liability?", a: "It must still be secured and governed, it increases the damage of a breach, and retention without a current lawful purpose may itself breach the applicable regime." },
  ],
  furtherStudy: [
    "SBL-24 covers machine learning built on this data",
    "SBL-26 covers securing it",
    "SBL-33 covers performance measurement and KPI definition",
    "SBL-43 develops the scepticism this material is examined through",
  ],
}

const SBL_TREE_24: StudyChapter = {
  paper: "SBL",
  id: "SBL-24",
  number: 24,
  area: "E",
  syllabusRefs: ["E3(a)", "E3(b)"],
  title: "Machine learning, AI and robotics",
  minutes: 17,
  intro:
    "A sub-topic that postdates the older provider texts, and one SBL examines at level 3 on the risk and ethics side. The board question is not whether the technology works — it is who remains accountable for a decision a model produced.",
  outcomes: [
    "Explain what artificial intelligence, machine learning and robotics can contribute to strategic decisions and corporate objectives",
    "Assess the risk, control and ethical consequences of relying on them",
    "Advise on the governance a board needs before a model influences decisions affecting people",
    "Recognise where automation shifts rather than removes a risk",
  ],
  sections: [
    {
      id: "what-they-offer",
      heading: "What these technologies contribute",
      blocks: [
        {
          kind: "text",
          md: "It helps to keep three things apart, because their risks differ. **Robotic process automation** applies rules to structured, repetitive work — it does exactly what it is told, at volume, without tiring. **Machine learning** infers patterns from data and produces estimates or classifications rather than following stated rules. **Artificial intelligence** is the broader field, including systems that generate content or handle language.",
        },
        {
          kind: "table",
          caption: "Contribution, and the exposure that comes with it",
          head: ["Application", "Contribution", "Exposure"],
          rows: [
            ["Automating routine processing", "Cost, speed, consistency; staff redirected to judgement work", "Automates an error at scale; controls designed for humans stop working"],
            ["Forecasting demand or failure", "Earlier, better-informed capacity and maintenance decisions", "Confident output from a model trained on a past that no longer applies"],
            ["Credit, pricing or screening decisions", "Consistency and volume", "Bias against groups; inability to explain a decision to the person affected"],
            ["Customer interaction", "Availability, lower service cost", "Wrong answers given confidently; poor handling of vulnerable customers"],
            ["Document and contract review", "Speed across large volumes", "Plausible output that is wrong, accepted because it reads well"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Automation does not remove risk, it relocates it",
          md: "A manual process carries the risk of individual error, caught by review. An automated one removes those errors and introduces a new class: a single fault, applied uniformly and at speed, to every transaction. So the control question changes from 'did someone check this?' to 'who validated the logic, who monitors the output, and how would we know if it drifted?' Saying that explicitly is the most transferable point in this chapter.",
        },
      ],
      check: {
        q: "A company automates invoice processing, removing manual keying errors. What new control requirement arises?",
        options: [
          "None — removing human error improves control unambiguously",
          "Validation of the automated logic, monitoring of its output, and exception handling — because a single fault now applies uniformly to every transaction at speed",
          "More frequent manual re-keying to verify the automation",
          "Only that staff should be retrained",
        ],
        correct: 1,
        explain:
          "Individual keying errors are replaced by systematic ones, which are rarer but far larger when they occur. Option 2 would discard the benefit entirely; the answer is control over the logic and its output, not a return to manual work.",
      },
    },
    {
      id: "risk-control-ethics",
      heading: "Risk, control and ethics",
      blocks: [
        {
          kind: "text",
          md: "E3(b) is examined at the highest level, so it repays knowing the failure modes specifically rather than in general terms.",
        },
        {
          kind: "table",
          caption: "How model-driven decisions fail",
          head: ["Failure", "Mechanism", "What a board should require"],
          rows: [
            ["Bias", "Training data reflects past decisions, including discriminatory ones", "Testing of outcomes across relevant groups, not just overall accuracy"],
            ["Opacity", "The basis of an individual decision cannot be explained", "Explainability proportionate to the consequence for the person affected"],
            ["Drift", "Relationships change after deployment; accuracy silently decays", "Monitoring against actual outcomes, with a retraining trigger"],
            ["Overfitting", "The model learned noise in its training data", "Validation on data the model has never seen"],
            ["Automation bias", "Staff defer to the output because it appears authoritative", "A real, used route to challenge and override, with records"],
            ["Data protection", "Personal data used beyond the basis on which it was collected", "A lawful basis for the specific processing, and transparency about it"],
            ["Confident error", "Generative systems produce fluent, plausible, wrong output", "Verification before use, and clarity about where it may not be used"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Accountability cannot be delegated to a model",
          md: "If a decision harms someone — a refused loan, an unfair price, a wrongly flagged transaction — the organisation is accountable, and \"the system decided\" is not a defence to a customer, a regulator or a court. So governance must name a human owner for every model in use, define what it may and may not decide alone, and record overrides. This is the same principle as management override in SBL-04 and outsourcing in SBL-14: activity moves, accountability does not.",
        },
        {
          kind: "text",
          md: "The bias mechanism is worth stating carefully because candidates often describe it as a data-quality problem. It is subtler: a model trained on an organisation's own past decisions will reproduce the pattern of those decisions faithfully, including any discrimination they contained — and it will do so while appearing objective, because it is arithmetic. Accuracy testing will not reveal it, since the model is accurately predicting what the organisation used to do. Only testing *outcomes across groups* will.",
        },
        {
          kind: "example",
          title: "Advising on a recruitment screening model",
          scenario:
            "A group proposes screening applications with a model trained on ten years of its own hiring decisions, to cut shortlisting time. Historically, senior technical roles have been filled almost entirely by one demographic.",
          steps: [
            { label: "Name the mechanism", detail: "The model will learn the historic pattern and reproduce it — accurately, which is the problem. High accuracy against past decisions is evidence it has absorbed them." },
            { label: "Legal and ethical exposure", detail: "Systematic exclusion of a group risks discrimination liability, reputational damage and the loss of the diversity SBL-08 explains a board needs." },
            { label: "Test the right thing", detail: "Measure selection rates and outcomes by group, not overall accuracy; test on data withheld from training." },
            { label: "Constrain its role", detail: "Use it to rank and surface candidates, never to reject; require human decision with recorded reasons on every rejection." },
            { label: "Govern it", detail: "Name an owner, document the lawful basis for processing applicant data, monitor for drift, and review outcomes periodically at committee level." },
          ],
          result:
            "The advice permits the efficiency gain while removing the decision that carries the harm — a much stronger answer than either endorsing or refusing the proposal outright.",
        },
      ],
      check: {
        q: "A screening model achieves 94% accuracy against historic hiring decisions. Why is that figure not reassuring?",
        options: [
          "94% is too low for a decision affecting individuals",
          "Accuracy measures agreement with past decisions, so a high score shows the model has faithfully absorbed them — including any bias they contained",
          "Accuracy cannot be measured for recruitment models",
          "The figure is reassuring; the remaining 6% is within tolerance",
        ],
        correct: 1,
        explain:
          "The benchmark is the problem. Agreeing with historic decisions is exactly what a biased model does well, so accuracy confirms replication rather than fairness — which is why outcome testing across groups is the measure that matters.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing benefits of AI without the accountability question.", fix: "Name a human owner, define what the model may decide alone, and record overrides." },
    { trap: "Treating bias as a data-quality problem.", fix: "A model trained on past decisions reproduces them accurately; only outcome testing across groups reveals it." },
    { trap: "Citing model accuracy as evidence of fairness or fitness.", fix: "Ask what it was measured against, and whether the validation data was genuinely unseen." },
    { trap: "Assuming automation reduces control risk.", fix: "It replaces individual errors with systematic ones applied at scale — validate logic, monitor output, handle exceptions." },
  ],
  keyTerms: [
    { term: "Robotic process automation", def: "Software applying defined rules to structured, repetitive work at volume." },
    { term: "Machine learning", def: "Systems that infer patterns from data to produce estimates or classifications, rather than following stated rules." },
    { term: "Model drift", def: "Silent decay in accuracy after deployment as the relationships in the real world change." },
    { term: "Overfitting", def: "A model that has learned noise in its training data and therefore fails on new data." },
    { term: "Explainability", def: "The ability to account for how an individual decision was reached, proportionate to its consequences." },
    { term: "Automation bias", def: "The tendency to defer to a system's output because it appears authoritative." },
  ],
  summary: [
    "Keep rule-based automation, machine learning and generative AI apart — their risks differ.",
    "Automation relocates risk: individual errors become systematic ones applied at scale.",
    "Bias arises from faithfully learning past decisions, and accuracy testing conceals it.",
    "Drift, overfitting, opacity and automation bias each need a specific control.",
    "Accountability stays with the organisation — name a model owner and constrain what it may decide.",
  ],
  knowledgeDiagnostic: [
    { q: "How does automation change the control question?", a: "From whether someone checked a transaction to who validated the logic, who monitors the output, and how drift would be detected." },
    { q: "Why does high model accuracy not demonstrate fairness?", a: "Accuracy measures agreement with the historic decisions used for training, so a biased model scores well precisely because it reproduces them." },
    { q: "What is model drift, and what controls it?", a: "Silent decay in accuracy as real-world relationships change; monitoring against actual outcomes with a defined retraining trigger." },
    { q: "What governance should a board require before a model affects people?", a: "A named human owner, limits on what it may decide alone, explainability proportionate to consequence, outcome testing across groups, a lawful processing basis, and recorded overrides." },
  ],
  furtherStudy: [
    "SBL-23 covers the data these models depend on",
    "SBL-26 covers the security and control environment around them",
    "SBL-35 covers disruptive technology at strategic level",
    "SBL-04 covers the accountability principle this chapter applies",
  ],
}

const SBL_TREE_25: StudyChapter = {
  paper: "SBL",
  id: "SBL-25",
  number: 25,
  area: "E",
  syllabusRefs: ["E4(a)", "E4(b)", "E4(c)", "E4(d)", "E4(e)"],
  title: "E-business, e-marketing and the value chain",
  minutes: 18,
  intro:
    "Selling online is not a channel bolted onto an existing business — it changes the value chain, the cost structure and who owns the customer relationship. That is why the syllabus places e-business under the value chain rather than under marketing.",
  outcomes: [
    "Assess how well an organisation is set up to trade and operate electronically",
    "Advise where technology should support electronic trading, and what it must be joined to",
    "Explain what makes marketing online different, using the six I's",
    "Weigh online branding against traditional branding",
    "Advise on acquiring and managing suppliers and customers through electronic means",
  ],
  sections: [
    {
      id: "e-business-value-chain",
      heading: "E-business as a change to the value chain",
      blocks: [
        {
          kind: "text",
          md: "**E-commerce** is buying and selling electronically. **E-business** is wider: using electronic means throughout the organisation's activities and its relationships with suppliers and customers. The distinction matters in SBL because cases regularly show an organisation that has added a website — e-commerce — while its warehouse, stock records, pricing and service processes still assume a shop or a sales representative.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The recurring case failure: an unintegrated channel",
          md: "Symptoms to look for: stock shown online that is not really available, online prices that differ from in-store, orders re-keyed by hand into another system, delivery promises the warehouse cannot meet, and a customer who cannot return an online purchase to a branch. Each is a **linkage** failure in value-chain terms — the channel exists and is not connected to the activities that must fulfil it. That is a much sharper diagnosis than 'the website needs improving'.",
        },
        {
          kind: "table",
          caption: "Where electronic operation changes each activity",
          head: ["Activity", "What changes", "New requirement"],
          rows: [
            ["Inbound logistics", "Supplier ordering and forecasts shared electronically", "Data standards; supplier capability"],
            ["Operations", "Orders arrive continuously, in small quantities", "Real-time stock accuracy; pick-and-pack rather than bulk"],
            ["Outbound logistics", "Many small parcels to individuals, plus returns", "Carrier management; a returns process that was never needed"],
            ["Marketing and sales", "Search, content and data replace footfall and territory", "Analytics and content capability"],
            ["Service", "Self-service expected; complaints are public", "Knowledge base; monitored channels; response times"],
            ["Procurement", "Wider supplier reach, electronic tendering", "Due diligence at distance"],
            ["Infrastructure", "Payment, security, availability become core", "Resilience; a payment and fraud control environment"],
          ],
        },
        {
          kind: "text",
          md: "The economics change too, and saying how earns marks. Direct selling can remove intermediary margin, extend reach beyond a physical catchment, and let capacity scale without proportionate cost. Against that: fulfilment and returns are genuinely expensive per order, price transparency compresses margins because comparison is trivial, and the organisation may be competing with its own distributors — a channel conflict that has to be managed rather than ignored.",
        },
      ],
      check: {
        q: "A retailer's new website shows stock that is often unavailable, and orders are re-keyed into the warehouse system by staff. In value-chain terms, what is the defect?",
        options: [
          "The website's design is inadequate and should be rebuilt",
          "A linkage failure — the channel is not integrated with stock records and fulfilment, so the activities that must deliver the promise are not connected to the one making it",
          "The warehouse should hold more stock",
          "Customers should be warned that stock data is indicative",
        ],
        correct: 1,
        explain:
          "Nothing is wrong with the website as a website; the failure sits between activities, which is exactly what the value chain's linkages describe. Adding stock or disclaimers manages the symptom while leaving the disconnection in place.",
      },
    },
    {
      id: "six-is",
      heading: "The six I's of e-marketing",
      blocks: [
        {
          kind: "text",
          md: "The six I's set out what makes marketing electronically different in kind, not just in medium. Each has a practical consequence, which is what to write about.",
        },
        {
          kind: "table",
          caption: "The six I's",
          head: ["I", "What it means", "Consequence"],
          rows: [
            ["Interactivity", "The customer initiates and responds, rather than receiving a broadcast", "Marketing becomes a dialogue; silence is visible"],
            ["Intelligence", "Behaviour is captured cheaply and continuously", "Decisions can be evidenced — and data must be governed"],
            ["Individualisation", "The offer can differ for each customer", "Personalisation raises relevance and can feel intrusive"],
            ["Integration", "Channels combine into one experience", "Inconsistency between channels is exposed immediately"],
            ["Industry structure", "Intermediaries are removed, or new ones inserted", "Position in the chain can change; platforms may capture the relationship"],
            ["Independence of location", "Reach is not limited by geography", "New markets, and new competitors from anywhere"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Industry structure is the strategic one",
          md: "The other five describe better marketing; this one changes who holds the customer. Electronic trading can **disintermediate** — remove a distributor and sell direct — or **reintermediate**, inserting a new intermediary such as a comparison site or marketplace between the organisation and its customer. The second is the danger: it delivers volume while taking the relationship, the data and a share of the margin, and it gets harder to leave each year. That is the strategic cost to weigh against a marketplace's convenience.",
        },
        {
          kind: "text",
          md: "On branding, the online setting shifts the balance of control. Traditional branding is largely what the organisation says about itself through media it buys; online, the brand is substantially what customers say about it in public, at length and permanently. Reviews, ratings and social commentary are searchable at the moment of purchase, so service quality feeds the brand directly and quickly. The practical consequences are that response speed becomes a brand activity, that consistency across channels matters more than campaign polish, and that a brand can be damaged faster than any advertising can repair.",
        },
      ],
      check: {
        q: "A manufacturer's sales through a large online marketplace are growing quickly. What is the principal strategic risk?",
        options: [
          "The marketplace's commission reduces gross margin",
          "Reintermediation — the marketplace owns the customer relationship and the data, so the manufacturer's dependence and the platform's bargaining power both rise over time",
          "Online customers are less loyal than traditional ones",
          "The marketplace may sell competing products",
        ],
        correct: 1,
        explain:
          "Commission is a visible cost and a manageable one; losing the relationship and the data is the structural loss, because it removes the manufacturer's ability to sell directly later and strengthens the platform at every renegotiation. That is why this is the strategic risk rather than the margin.",
      },
    },
    {
      id: "managing-relationships",
      heading: "Acquiring and managing customers and suppliers electronically",
      blocks: [
        {
          kind: "text",
          md: "E4(e) asks how electronic means change the acquisition and management of both sides of the chain. Treating them together is deliberate: the same capabilities serve each.",
        },
        {
          kind: "table",
          caption: "Both sides of the chain",
          head: ["Aspect", "Customers", "Suppliers"],
          rows: [
            ["Acquisition", "Search, content, referral, marketplaces, targeted advertising", "Electronic tendering, wider geographic reach, exchanges"],
            ["Selection", "Segment by value and cost to serve, not volume", "Due diligence at distance — capability, standards, financial health"],
            ["Transacting", "Self-service ordering, payment, tracking", "Electronic ordering, shared forecasts, automated invoicing"],
            ["Managing", "Service history, personalisation, retention intervention", "Performance measurement against contracted terms"],
            ["Retaining", "Loyalty through relevance and convenience, not just price", "Collaboration, longer-term commitments, joint improvement"],
            ["Risk", "Data protection, fraud, dependence on a platform", "Standards and conduct along the chain remain yours"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Retention is usually the stronger recommendation",
          md: "Acquiring a customer electronically is measurable and often expensive, while a small improvement in retention compounds across the customer's whole remaining lifetime. Where a case supplies churn or repeat-purchase data alongside acquisition cost, comparing the two and recommending retention effort is normally better advised than more acquisition spending — and it is a commercial-acumen point as well as a marketing one.",
        },
        {
          kind: "text",
          md: "Finally, remember the accountability rule from SBL-14 applies along the electronic chain too. Sourcing from a distant supplier found through an exchange does not reduce responsibility for labour standards, product safety or data handling in that supplier's operations. Due diligence at distance is harder and therefore needs to be deliberate, not assumed.",
        },
      ],
      check: {
        q: "A business spends heavily acquiring online customers while 40% do not purchase again. What is the better-advised priority?",
        options: [
          "Increase acquisition spending to offset the loss rate",
          "Investigate and address why repeat purchase fails — retention improvements compound over each customer's remaining lifetime, and acquisition is being spent to replace customers already won",
          "Raise prices to improve margin on first purchases",
          "Accept the rate as normal for online trading",
        ],
        correct: 1,
        explain:
          "Spending to replace customers the business already acquired is the most expensive way to stand still. Fixing the cause of non-repeat — service, fulfilment, product fit — improves the return on all past and future acquisition at once.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating an online channel as a marketing matter.", fix: "It changes stock accuracy, fulfilment, returns, service and pricing — diagnose the linkage that is failing." },
    { trap: "Listing the six I's without consequences.", fix: "Each has a practical effect; industry structure is the strategically significant one, because it changes who holds the customer." },
    { trap: "Treating a marketplace as simply a sales channel.", fix: "Reintermediation transfers the customer relationship and data, and raises the platform's power over time." },
    { trap: "Recommending more acquisition spending where retention is the problem.", fix: "Compare acquisition cost with repeat-purchase and churn data; retention compounds." },
    { trap: "Assuming distance reduces responsibility for suppliers' conduct.", fix: "Standards travel along the chain; due diligence must be deliberate." },
  ],
  keyTerms: [
    { term: "E-commerce", def: "Buying and selling by electronic means." },
    { term: "E-business", def: "Using electronic means across the organisation's activities and its supplier and customer relationships." },
    { term: "Disintermediation", def: "Removing an intermediary to deal directly with the end customer." },
    { term: "Reintermediation", def: "A new intermediary — a marketplace or comparison site — inserting itself between the organisation and its customer." },
    { term: "Six I's", def: "Six properties that make electronic marketing different in kind — interactivity, intelligence, individualisation, integration, industry structure, and freedom from geography." },
    { term: "Channel conflict", def: "Competition between an organisation's own direct channel and the distributors who also sell its products." },
  ],
  summary: [
    "E-business changes the whole value chain; an unintegrated channel is a linkage failure.",
    "Direct selling removes intermediary margin but adds fulfilment, returns and price transparency.",
    "The six I's differ in kind from traditional marketing; industry structure is the strategic one.",
    "Marketplaces deliver volume and take the relationship, the data and future bargaining power.",
    "Online branding is largely what customers say publicly, so service speed becomes brand management.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish e-commerce from e-business.", a: "E-commerce is electronic buying and selling; e-business is using electronic means across all activities and supplier and customer relationships." },
    { q: "What are the symptoms of an unintegrated online channel?", a: "Inaccurate stock display, price inconsistency between channels, re-keyed orders, undeliverable promises, and returns that cannot cross channels." },
    { q: "Name the six I's.", a: "Interactivity, intelligence and individualisation; integration across channels; industry structure; and independence of location." },
    { q: "Why is reintermediation a strategic risk rather than a cost?", a: "The new intermediary holds the customer relationship and data, so dependence and its bargaining power grow, removing the option to sell directly later." },
    { q: "How does online branding differ from traditional branding?", a: "Control shifts — the brand is substantially what customers say publicly and permanently, searchable at the point of purchase, so service quality and response speed become brand activities." },
  ],
  furtherStudy: [
    "SBL-14 covers the value chain and value networks this applies",
    "SBL-23 covers the customer analytics electronic trading produces",
    "SBL-26 covers payment security and availability",
    "SBL-35 covers disruptive technology and new business models",
  ],
}

const SBL_TREE_26: StudyChapter = {
  paper: "SBL",
  id: "SBL-26",
  number: 26,
  area: "E",
  syllabusRefs: ["E5(a)", "E5(b)", "E5(c)", "E5(d)"],
  title: "IT systems security, control and cyber security",
  minutes: 18,
  intro:
    "Examined at level 3 throughout, and the syllabus singles out cyber security for growing importance. The board question is not which technical controls exist but whether the organisation would know it had been attacked, and what it would do next.",
  outcomes: [
    "Argue why effective information systems control remains a strategic matter, not a technical one",
    "Assess whether an organisation's IT and systems security controls are adequate for what it must protect",
    "Recommend practical ways to strengthen cyber security, including detection and response",
    "Recommend improvements to the safeguarding of IT assets so business objectives are met",
  ],
  sections: [
    {
      id: "why-strategic",
      heading: "Why systems control is a board matter",
      blocks: [
        {
          kind: "text",
          md: "Information systems control reaches the board for three reasons. Systems now carry the operations themselves, so a systems failure is an operational halt rather than an inconvenience. The data held creates legal obligations whose breach carries penalties and mandatory disclosure. And the loss of trust following an incident affects customers, lenders and regulators simultaneously — which makes it a strategic exposure rather than an IT cost.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "What security has to protect",
            data: {
              items: [
                { title: "Confidentiality", sub: "Only those entitled can see the information" },
                { title: "Integrity", sub: "The information is accurate and has not been altered" },
                { title: "Availability", sub: "Systems and data are accessible when needed" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Those three make a useful diagnostic in a case, because organisations protect them unequally. A business that has invested in preventing data theft may have no answer at all to a loss of availability — no tested recovery, no alternative site, no manual fallback — and ransomware attacks precisely that gap. Asking which of the three is weakest is a quick route to the finding.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Proportionality: protect according to what is at stake",
          md: "Not all data and systems deserve equal protection. The board should know which systems the organisation cannot trade without, and which data would cause the most harm if exposed — and concentrate control there. An answer that recommends uniform controls across everything is both unaffordable and worse than one that prioritises.",
        },
      ],
      check: {
        q: "A company has strong data-loss prevention and encryption, but no tested recovery plan and a single data centre. Which security objective is weakest, and what exploits it?",
        options: [
          "Confidentiality — exploited by insider theft",
          "Availability — exploited by ransomware, hardware failure or site loss, none of which encryption addresses",
          "Integrity — exploited by unauthorised change",
          "All three are equally protected",
        ],
        correct: 1,
        explain:
          "Encryption and data-loss prevention protect confidentiality and do nothing for availability. With one site and no tested recovery, an event that merely stops access — rather than stealing anything — halts the business, which is exactly the ransomware model.",
      },
    },
    {
      id: "assessing-controls",
      heading: "Assessing the controls",
      blocks: [
        {
          kind: "table",
          caption: "Control layers, and the case evidence of failure",
          head: ["Layer", "Controls", "Exhibit signal that it is weak"],
          rows: [
            ["Access", "Unique identity, least privilege, multi-factor, prompt removal of leavers", "Shared accounts; leavers' access still active; wide administrator rights"],
            ["Change", "Testing, approval, segregation of development from live, rollback", "Developers with live access; changes applied directly at month end"],
            ["Network", "Segmentation, firewalls, monitoring, secured remote access", "One flat network; unregistered devices; open remote access"],
            ["Data", "Encryption at rest and in transit, minimisation, retention rules", "Unencrypted backups; data retained without purpose"],
            ["Operations", "Patching, backup, tested restoration, secure configuration", "Unsupported software; backups never restored in a test"],
            ["People", "Training, phishing simulation, clear reporting route", "No training; staff unsure how to report a suspected incident"],
            ["Third parties", "Due diligence, contracted standards, limited access, monitoring", "Suppliers with standing access to internal systems"],
            ["Detection and response", "Logging, alerting, a tested incident plan, defined responsibilities", "No monitoring; nobody named to lead an incident"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two findings almost always available",
          md: "**Untested backups**: a backup nobody has restored is an assumption, not a control, and organisations routinely discover at the worst moment that theirs was incomplete or encrypted along with everything else. **Excessive privilege**: administrator rights held broadly, or a leaver whose access persists, converts one compromised credential into a whole-network event. If a case gives you either, use it.",
        },
        {
          kind: "text",
          md: "Segregation of development from live deserves specific mention because it is where control and governance meet. A developer who can change live systems can also change the records of what they changed, which removes the audit trail on which every other control depends — the same self-review logic as SBL-04, expressed in systems terms.",
        },
      ],
      check: {
        q: "A company backs up nightly to a network location and has never performed a restoration test. How should this be assessed?",
        options: [
          "Adequate — backups are being taken regularly",
          "Not a control until it is tested: completeness and recoverability are unverified, and a network-connected backup may be encrypted by the same ransomware event",
          "Backup frequency should be increased to hourly",
          "Backups are an IT operational matter, not a board concern",
        ],
        correct: 1,
        explain:
          "An untested backup is an assumption about recoverability. The network location compounds it, because ransomware reaching the live systems commonly reaches the backup too — which is why an isolated or immutable copy plus a periodic restoration test is what makes it a control.",
      },
    },
    {
      id: "cyber-and-response",
      heading: "Cyber security: detection, response and the human layer",
      blocks: [
        {
          kind: "text",
          md: "E5(c) asks for ways to promote cyber security, and the most valuable framing for SBL is that prevention alone is an incomplete strategy. A determined attacker, a new vulnerability or one member of staff clicking one link will eventually succeed, so the organisation's resilience depends as much on **how quickly it notices and how well it responds** as on the strength of its perimeter.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "A complete cyber posture",
            data: {
              steps: [
                { label: "Identify", sub: "What we hold, what matters most, who has access" },
                { label: "Protect", sub: "Access, patching, encryption, segmentation, training" },
                { label: "Detect", sub: "Logging and alerting — would we know?" },
                { label: "Respond", sub: "Tested plan, named roles, communications, legal duties" },
                { label: "Recover", sub: "Restoration, continuity, return to normal operation" },
                { label: "Learn", sub: "Post-incident review feeding controls and training" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Common attacks, and the control that actually addresses each",
          head: ["Attack", "How it works", "Control that answers it"],
          rows: [
            ["Phishing", "A convincing message obtains credentials or triggers payment", "Training and simulation; multi-factor authentication; payment verification"],
            ["Ransomware", "Data encrypted and operations halted until payment", "Isolated, tested backups; segmentation; rapid detection"],
            ["Business email compromise", "A supplier's or executive's account is used to redirect payment", "Out-of-band verification of any change to bank details"],
            ["Credential reuse", "A password exposed elsewhere is tried here", "Multi-factor authentication; monitoring for unusual sign-in"],
            ["Supply-chain compromise", "Access arrives through a trusted supplier or product", "Vendor due diligence; limited and monitored third-party access"],
            ["Insider misuse", "Legitimate access used improperly", "Least privilege; logging; segregation of duties"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The board's own duties do not stop at prevention",
          md: "An incident triggers obligations that must be planned for in advance: notifying a regulator within a defined period, telling affected individuals, preserving evidence, deciding what to disclose publicly and to whom first, and briefing staff who will face customer questions. Organisations that have never rehearsed this improvise badly under pressure — and the improvisation, not the breach, is often what does the reputational damage.",
        },
        {
          kind: "text",
          md: "Two points make a cyber answer noticeably more mature. First, people are the most exploited layer and also the cheapest to strengthen: training, simulation and a blame-free reporting route buy more risk reduction per unit of spending than most technology. Second, the payment-diversion attacks in the table above are defeated by a **process** control — verifying any change of bank details through a channel other than the one requesting it — which costs nothing and is more effective than any security product.",
        },
      ],
      check: {
        q: "A finance clerk receives an email from a known supplier's genuine address asking that future payments go to a new account. What single control most reliably prevents loss?",
        options: [
          "Stronger email filtering to block compromised senders",
          "Verifying the change by contacting the supplier on previously held contact details, through a different channel from the request",
          "Requiring the clerk to check the sender's address carefully",
          "Encrypting all outgoing payment instructions",
        ],
        correct: 1,
        explain:
          "The address is genuine because the supplier's account is compromised, so scrutiny of the sender and filtering both fail — which is what makes this attack effective. Out-of-band verification is the one control that does not depend on the request being identifiably false.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating systems security as a technical matter for IT.", fix: "Systems carry operations, data creates legal duties, and incidents affect trust — it is a strategic exposure." },
    { trap: "Recommending uniform controls across all systems and data.", fix: "Prioritise by what the organisation cannot trade without and what would cause most harm if exposed." },
    { trap: "Accepting that backups exist as evidence of recoverability.", fix: "Untested and network-connected backups fail exactly when needed; require isolation and restoration testing." },
    { trap: "Recommending only prevention.", fix: "Cover detection, response, recovery and learning — including regulatory notification and communications." },
    { trap: "Answering payment-diversion fraud with email filtering.", fix: "The sender is genuine; out-of-band verification of bank-detail changes is the control that works." },
  ],
  keyTerms: [
    { term: "Confidentiality, integrity, availability", def: "The three objectives of information security — organisations commonly protect them unequally." },
    { term: "Least privilege", def: "Granting each user only the access their role requires, limiting the damage from any one compromised account." },
    { term: "Segregation of development from live", def: "Preventing those who build systems from changing live data or the records of change, preserving the audit trail." },
    { term: "Immutable backup", def: "A backup copy that cannot be altered or deleted, and so survives an attack that reaches live systems." },
    { term: "Business email compromise", def: "Use of a genuine but compromised account to redirect payments or obtain information." },
    { term: "Out-of-band verification", def: "Confirming a request through a different channel from the one it arrived on, using previously held contact details." },
  ],
  summary: [
    "Systems control is strategic: operations, legal duties and trust all depend on it.",
    "Test which of confidentiality, integrity and availability is weakest — it is rarely all three.",
    "Untested backups and excessive privilege are the two findings almost always available.",
    "Prevention is incomplete; detection, response, recovery and learning complete the posture.",
    "People are the most exploited and cheapest layer, and out-of-band verification defeats payment fraud.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three objectives of information security?", a: "Confidentiality, integrity and availability — and organisations typically protect them unequally, which is where the finding is." },
    { q: "Why is an untested backup not a control?", a: "Completeness and recoverability are unverified, and a network-connected backup can be encrypted by the same event as the live systems." },
    { q: "Why is prevention alone an incomplete cyber strategy?", a: "A determined attacker or a single mistake will eventually succeed, so resilience depends on how quickly the organisation detects and how well it responds and recovers." },
    { q: "Which control defeats business email compromise?", a: "Out-of-band verification of any change to payment details, using previously held contact details through a different channel." },
    { q: "What must a board plan for before an incident occurs?", a: "Regulatory notification within defined periods, telling affected individuals, preserving evidence, deciding public disclosure and sequencing, and briefing staff." },
  ],
  furtherStudy: [
    "SBL-22 covers the cloud and mobile exposures this must control",
    "SBL-24 covers governance of models built on protected data",
    "SBL-19 and SBL-20 cover assessing and responding to cyber risk",
    "SBL-27 covers the internal control framework this sits within",
  ],
}

export const SBL_TREE_AREA_E: StudyChapter[] = [
  SBL_TREE_22, SBL_TREE_23, SBL_TREE_24, SBL_TREE_25, SBL_TREE_26,
]
