import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area E, third part — chapter 33, performance measurement in not-for-profit and public
 * sector organisations, plus the external and behavioural considerations that close the
 * paper. Syllabus E4 and E5.
 *
 * This chapter is last because it is the one that most needs the rest of the paper behind
 * it: value for money only makes sense once a learner has seen why profit-based measures
 * work, and the three Es are best taught as the answer to "what do you measure when there
 * is no profit figure at all". It also carries the paper's closing behavioural material,
 * which pulls together the incentive threads running through chapters 20, 26, 29 and 31.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

export const PM_TREE_33: StudyChapter = {
  id: "PM-33",
  number: 33,
  paper: "PM",
  area: "E",
  title: "Not-for-profit and public sector performance, and external considerations",
  minutes: 18,
  syllabusRefs: ["E4(a)", "E4(b)", "E4(c)", "E5(a)", "E5(b)"],
  intro:
    "Take away the profit figure and performance measurement becomes genuinely hard: multiple objectives, no single bottom line, and outputs that resist measurement. Value for money is how it is done.",
  outcomes: [
    "Explain why performance measurement is harder without a profit objective",
    "Apply the three Es — economy, efficiency and effectiveness — to a scenario",
    "Explain and apply value for money analysis",
    "Discuss the use of league tables, targets and benchmarking, and their unintended effects",
    "Explain how external factors and stakeholder expectations affect performance measurement",
  ],
  sections: [
    {
      id: "why-harder",
      heading: "Why it is harder without profit, and the three Es",
      blocks: [
        {
          kind: "list",
          title: "What makes measurement difficult here",
          items: [
            "**Multiple and conflicting objectives.** A hospital must treat more patients, treat them better, treat them sooner and spend less. There is no single figure in which those trade off against one another.",
            "**No profit measure.** Profit conveniently combines revenue and cost into one number. Without it, cost data alone measures only the input side.",
            "**Outputs are hard to quantify.** What is the output of a school, a police force or a museum? Attainment, recorded crime and visitor numbers are all **proxies**, and each can be improved without improving the real outcome.",
            "**Benefits are often non-financial and long-term.** The value of childhood vaccination or of teaching a person to read appears decades later and cannot be reliably priced.",
            "**Funding is fixed in advance.** Money comes from a budget or grant rather than from customers, so revenue carries no information about whether the service is any good.",
            "**Many stakeholders with different definitions of success.** Service users, taxpayers, staff, funders, regulators and government each judge the same organisation on different criteria.",
            "**Political influence.** Objectives can change with a change of administration, and measures can be chosen for their presentational value.",
          ],
        },
        {
          kind: "table",
          caption: "The three Es",
          head: ["E", "Question", "Definition", "Measures"],
          rows: [
            ["**Economy**", "Are the **inputs** obtained cheaply?", "Acquiring resources of the appropriate quality at the lowest cost", "Cost per teacher, price paid per drug, agency staff rate against permanent, cost per square metre of premises"],
            ["**Efficiency**", "Is the **input converted to output** well?", "The relationship between input and output — output per unit of input", "Patients treated per consultant, pupils per teacher, cost per case processed, bed occupancy rate"],
            ["**Effectiveness**", "Are the **objectives** achieved?", "The extent to which outputs achieve the intended outcomes", "Exam results, recovery and readmission rates, crime rates, service user satisfaction, literacy at age 11"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three Es conflict, and the conflict is the answer",
          md: "**Economy pulls against effectiveness.** Buying the cheapest possible input — the least experienced staff, the cheapest materials, the shortest appointment — improves economy and can wreck effectiveness. And **efficiency measured on output pulls against effectiveness measured on outcome**: a hospital can raise patients treated per consultant by discharging people earlier, which improves efficiency and worsens readmission rates. So value for money is not three separate scores to be maximised but a **balance**, and an answer that identifies which E a given decision improves and which it damages is doing exactly what the requirement asks. A single E on its own is always misleading.",
        },
        {
          kind: "example",
          title: "Value for money analysis of a decision",
          scenario:
            "Wickwar Council runs a home care service for 1,200 elderly residents. Last year it spent £4,320,000 delivering 144,000 visits, using permanent staff at £22 an hour. To reduce cost it has replaced a third of permanent staff with agency workers at £18 an hour, shortened the standard visit from 45 to 30 minutes, and now reports: £3,780,000 spent, 168,000 visits delivered. Service user satisfaction has fallen from 82% to 61%, and emergency admissions among service users have risen 14%.",
          steps: [
            { label: "Economy — has the input got cheaper?", detail: "Yes, clearly. Hourly rates fell from £22 to £18 for a third of the workforce, and total spend fell from £4,320,000 to £3,780,000 — a saving of £540,000, or 12.5%. On economy alone this is a success." },
            { label: "Efficiency — is input converting to output better?", detail: "Cost per visit fell from £4,320,000/144,000 = £30.00 to £3,780,000/168,000 = £22.50, a 25% improvement, and visits rose 17% on 12.5% less money. On efficiency this looks even better than the economy figure." },
            { label: "But interrogate the output measure", detail: "The output counted is VISITS, and visits were shortened from 45 to 30 minutes. In visit-HOURS the service delivered 144,000 × 0.75 = 108,000 hours before and 168,000 × 0.5 = 84,000 hours now — a **22% REDUCTION in care hours delivered**. Cost per care hour was £40.00 and is now £45.00, so on the measure that reflects the actual service the cost has RISEN 12.5%. The efficiency gain was an artefact of counting visits rather than care." },
            { label: "Effectiveness — are the objectives achieved?", detail: "The objective is the wellbeing and independence of 1,200 residents. Satisfaction has fallen 21 percentage points and emergency admissions have risen 14%. On the only dimension that matters, performance has deteriorated materially." },
            { label: "Cost the effectiveness failure", detail: "The £540,000 saving must be set against the cost of that 14% rise in emergency admissions, which falls on the health service rather than on the council's own budget. This is **cost shifting**, not saving — and it is invisible in the council's figures precisely because the cost lands on a different organisation." },
            { label: "Conclude and recommend", detail: "Economy improved, apparent efficiency improved, real efficiency worsened, and effectiveness deteriorated sharply. Recommend: measure output in **care hours** rather than visits; report satisfaction and emergency admissions alongside the cost figures with equal weight; restore visit length while testing agency staffing separately, so the two changes stop confounding each other; and obtain the health service's admission cost data so the whole-system effect is visible before the saving is claimed." },
          ],
          result:
            "**A £540,000 saving and a 25% fall in cost per visit — while care hours fell 22%, cost per care HOUR rose from £40.00 to £45.00, satisfaction fell 21 points and emergency admissions rose 14%.** Choosing visits as the output measure is what made a deterioration look like an efficiency gain.",
        },
      ],
      check: {
        q: "Visits rose from 144,000 to 168,000 while visit length fell from 45 to 30 minutes. What happened to care hours delivered?",
        options: [
          "They rose 17%, in line with visits",
          "They fell 22%, from 108,000 to 84,000 hours — so the efficiency gain was an artefact of the output measure",
          "They were unchanged",
          "They cannot be determined",
        ],
        correct: 1,
        explain:
          "They FELL 22%: 144,000 × 0.75 = 108,000 hours against 168,000 × 0.5 = 84,000. Cost per visit improved 25% while cost per care HOUR worsened from £40 to £45. Choosing the wrong output measure turned a reduction in service into a reported efficiency gain.",
      },
    },
    {
      id: "targets-and-external",
      heading: "Targets, league tables, and the external environment",
      blocks: [
        {
          kind: "text",
          md: "Because there is no profit figure, public sector performance management leans heavily on **targets, league tables and benchmarking**. All three are useful and all three are reliably distorted by the behaviour they produce, and a PM answer is expected to give both sides rather than simply condemning them.",
        },
        {
          kind: "table",
          caption: "Targets, league tables and benchmarking",
          head: ["Tool", "What it achieves", "How it distorts"],
          rows: [
            ["**Targets**", "Focus effort, clarify priorities, allow accountability to funders and the public", "**Tunnel vision** — unmeasured aspects are neglected. **Threshold effects** — effort concentrates on cases just below the target and abandons those far from it. **Gaming** — reclassify, redefine, or manage the measure instead of the service"],
            ["**League tables**", "Transparency, informed choice, and pressure to improve on the poorest performers", "Ignore **starting position and case mix**, so an institution serving a harder population looks worse while performing better. Encourage **cream-skimming** — selecting the easiest cases to improve the ranking"],
            ["**Benchmarking**", "Identifies achievable practice, and is the strongest tool where no market comparison exists", "Comparators may not be **comparable** in scale, geography or case mix; it drives towards **average** practice rather than best; and it needs data others may not release"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The classic distortions, named",
          md: "**Tunnel vision** — concentrating on what is measured and neglecting what is not. **Sub-optimisation** — a unit pursues its own target at the expense of the whole, as with the emergency admissions above. **Myopia** — short-term targets crowd out long-term investment (chapter 29). **Measure fixation** — pursuing the measure rather than the objective, as with a four-hour waiting target met by admitting patients who did not need admitting. **Misrepresentation** — creative reclassification of data. **Gaming** — deliberately underperforming this year so next year's target is set lower. Naming the specific distortion in a scenario is worth much more than saying \"targets can be manipulated\", and each has an obvious remedy: **multiple measures**, whole-system measures, longer horizons, and measuring **outcome** rather than **output**.",
        },
        {
          kind: "list",
          title: "External considerations that affect any performance measure",
          items: [
            "**Market conditions.** A fall in volume during a recession is not the sales team's failure, which is the market size and share split of chapter 27.",
            "**Competitor action.** A new entrant or a competitor's price cut changes what good performance looks like mid-year.",
            "**Price changes and inflation.** Comparing figures across years without adjusting for inflation overstates real growth; a cost variance can be entirely input-price inflation.",
            "**Regulation and legislation.** New requirements impose cost that no manager chose and that must be excluded from their appraisal.",
            "**Exchange rates and interest rates.** These move divisional results without any change in operating performance.",
            "**Technology and stage of the life cycle.** A product in decline cannot be judged on the growth targets set when it was launched (chapter 7).",
            "**Stakeholder expectations.** Shareholders, customers, employees, suppliers, regulators, government and communities each define success differently, and the conflicts between them cannot be resolved by a single measure. Environmental and social performance now sits here too, and links back to the environmental management accounting of chapter 9.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The principles that close the paper",
          md: "Everything in Area E reduces to four ideas that are worth carrying into the exam. **What you measure is what you get** — a measure changes behaviour before it reports anything, which is why the sales mix variance of chapter 26 exposes a bonus scheme and the ROI of chapter 31 kills a good project. **Measure outcomes, not just outputs** — visits are not care, and treated patients are not recovered patients. **Use several measures across dimensions**, because any single measure can be improved by damaging something it does not capture. And **hold managers to what they control**, which is the planning and operational split of chapter 27 applied to people rather than to variances. A performance measurement recommendation that reflects those four is a strong answer whatever the scenario.",
        },
      ],
      check: {
        q: "A hospital meets its four-hour waiting target by admitting patients who did not clinically need admission. What is this called?",
        options: [
          "Tunnel vision",
          "Measure fixation — pursuing the measure rather than the objective it was meant to represent",
          "Benchmarking",
          "Economy",
        ],
        correct: 1,
        explain:
          "MEASURE FIXATION: the target is met while the objective — appropriate and timely care — is not. Naming the specific distortion is what earns the mark, and the remedy is to measure the outcome (clinical result, readmission) alongside the output (waiting time).",
      },
    },
  ],
  examTraps: [
    {
      trap: "Assessing a not-for-profit organisation on one of the three Es alone.",
      fix: "Economy pulls against effectiveness. Address all three and state the conflicts explicitly.",
    },
    {
      trap: "Accepting the output measure a scenario offers without interrogating it.",
      fix: "Ask whether the unit counted reflects the actual service. Visits are not care hours.",
    },
    {
      trap: "Comparing league table positions without adjusting for case mix.",
      fix: "Starting position and population served differ; an institution serving harder cases can rank low while performing well.",
    },
    {
      trap: "Saying only that \"targets can be manipulated\".",
      fix: "Name the distortion — tunnel vision, sub-optimisation, myopia, measure fixation, misrepresentation or gaming.",
    },
    {
      trap: "Claiming a saving that has been shifted to another organisation.",
      fix: "Look for whole-system cost. The council's £540,000 saving sat partly in the health service's admissions.",
    },
  ],
  keyTerms: [
    { term: "Economy", def: "Obtaining inputs of appropriate quality at the lowest cost." },
    { term: "Efficiency", def: "The relationship between inputs and outputs — output achieved per unit of input." },
    { term: "Effectiveness", def: "The extent to which outputs achieve the organisation's intended outcomes." },
    { term: "Value for money", def: "The balance of economy, efficiency and effectiveness taken together." },
    { term: "Tunnel vision", def: "Concentrating on measured aspects of performance while neglecting the unmeasured." },
    { term: "Measure fixation", def: "Pursuing the measure rather than the objective it was intended to represent." },
    { term: "Sub-optimisation", def: "A unit pursuing its own target at the expense of the organisation as a whole." },
  ],
  summary: [
    "Without a profit figure, measurement is harder: multiple objectives, unquantifiable outputs, long-term benefits and many stakeholders.",
    "Economy is cheap inputs, efficiency is input-to-output conversion, effectiveness is achieving objectives.",
    "The three Es conflict, and identifying which a decision improves and which it damages is the analysis.",
    "Always interrogate the output measure — visits are not care hours, and the wrong unit turns a cut into an efficiency gain.",
    "Targets and league tables cause tunnel vision, measure fixation, gaming and cream-skimming, remedied by multiple outcome-based measures.",
  ],
  knowledgeDiagnostic: [
    { q: "Define the three Es.", a: "Economy is acquiring inputs of appropriate quality at lowest cost; efficiency is the output achieved per unit of input; effectiveness is the extent to which outputs achieve the intended outcomes." },
    { q: "Why is measurement harder without a profit objective?", a: "There are multiple conflicting objectives, no single figure combining revenue and cost, outputs that resist quantification, long-term non-financial benefits, and many stakeholders defining success differently." },
    { q: "Which two Es most often conflict, and how?", a: "Economy and effectiveness — the cheapest inputs, whether staff, materials or appointment length, can undermine the outcome entirely." },
    { q: "What is cream-skimming?", a: "Selecting the easiest cases in order to improve a measured result or league table position, while the hardest cases are neglected." },
    { q: "Name four principles for designing a performance measurement system.", a: "What you measure is what you get; measure outcomes rather than only outputs; use several measures across dimensions; and hold managers to what they control." },
  ],
}

export const PM_TREE_AREA_E_PART3: StudyChapter[] = [PM_TREE_33]
