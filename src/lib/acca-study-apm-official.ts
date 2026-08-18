import type { StudyChapter } from "@/lib/acca-study-content"
import { APM_TREE_AREA_A_PART1 } from "@/lib/acca-study-apm-tree-a"
import { APM_TREE_AREA_A_PART2 } from "@/lib/acca-study-apm-tree-a2"
import { APM_TREE_AREA_B_PART1 } from "@/lib/acca-study-apm-tree-b"
import { APM_TREE_AREA_B_PART2 } from "@/lib/acca-study-apm-tree-b2"
import { APM_B } from "@/lib/acca-study-apm-b"

/*
 * APM's rebuild is IN PROGRESS — and its shim was the worst in the library.
 *
 * Areas A and B were never relabelled chapters. They were COMPOSITES: a local
 * `take()` helper cherry-picked sections out of three different legacy chapters
 * and concatenated them, so Area A was built from parts of APM_A and APM_C
 * while Area B drew on APM_A, APM_B, APM_C and the whole of APM_D. Area D went
 * further still and reached inside one of APM_B's sections to lift its blocks.
 * That composition had already produced a silent defect: APM_A and APM_C each
 * had a section keyed "frameworks", so the composed Area A carried two sections
 * with the same id and the reader — which keys progress off that id — could not
 * distinguish them.
 *
 * A SECOND DEFECT, found on reading the official syllabus: APM has SIX areas
 * (A–F), and Area F, employability and technology skills, was missing entirely.
 * Every other Strategic Professional paper carries that area. It is authored as
 * part of this rebuild.
 *
 *   Area A  DONE — APM-01..14, acca-study-apm-tree-a.ts + -a2.ts
 *   Area B  DONE — APM-15..27, acca-study-apm-tree-b.ts + -b2.ts
 *   Area C  authored — performance reporting (below)
 *   Area D  authored — data science and technology (below)
 *   Area E  authored — professional skills (below)
 *   Area F  MISSING — to be authored
 *
 * Do not reintroduce `take()` or any helper that derives one area's content
 * from another's.
 */

/* Area A is a fourteen-chapter authored tree in two modules, split for file
   size only. It replaces a composite assembled from two legacy chapters that
   between them left A5 (sustainability) with no coverage at all. */
export const APM_OFFICIAL_A: StudyChapter[] = [...APM_TREE_AREA_A_PART1, ...APM_TREE_AREA_A_PART2]
/* Area B is a thirteen-chapter authored tree in two modules, split for file
   size only. It replaces a composite that drew sections from all four legacy
   chapters at once — APM_A, APM_B, APM_C and the whole of APM_D — and it is
   the largest area in the paper, with four subsections and twenty-four
   learning outcomes. With Area A it supplies the 50-mark Section A case study
   every sitting.

     B1  budgetary planning and control        APM-15..17
     B2  performance and reward                APM-18..19
     B3  improvement models and techniques     APM-20..24
     B4  optimisation in specific contexts     APM-25..27 */
export const APM_OFFICIAL_B: StudyChapter[] = [...APM_TREE_AREA_B_PART1, ...APM_TREE_AREA_B_PART2]

/* The last surviving use of `take()`. Area D still lifts the blocks out of one
   legacy section (APM_B's "it-information"); this and the APM_B import go when
   Area D is authored. */
const take=(base:StudyChapter,ids:string[])=>base.sections.filter(s=>ids.includes(s.id))

export const APM_OFFICIAL_C: StudyChapter={paper:"APM",area:"C",title:"Performance reporting",minutes:17,intro:"A performance report succeeds only when a defined user can see what matters, understand why it matters and act. Evaluate the report itself—not merely whether the organisation performed well.",outcomes:["Evaluate performance reports against user and strategic needs","Control information overload and KPI comparability","Assess data visualisation without distortion","Write useful narrative commentary and recommendations"],sections:[{id:"report-design",heading:"Decision-useful performance reporting",blocks:[{kind:"text",md:"Start with the **user, decision and strategic objectives**. A report should select material KPIs, show targets and trends, highlight exceptions and connect outcomes to drivers and accountable action. Completeness does not mean including every available measure."},{kind:"table",caption:"Report-quality test",head:["Test","Question"],rows:[["Relevance","Does it address the user's objectives and decisions?"],["Balance","Are financial/non-financial and leading/lagging signals represented?"],["Comparability","Are definitions, scope, periods and targets consistent?"],["Clarity","Are hierarchy, exceptions, units and visuals immediately intelligible?"],["Actionability","Are causes, owners, responses and uncertainties explained?"]]},{kind:"callout",tone:"warn",title:"Evaluate the report, not only performance",md:"If the task asks whether a dashboard is fit for purpose, rising profit is evidence inside the report—not proof that its design is good."}]},{id:"visual-commentary",heading:"Visualisation and narrative insight",blocks:[{kind:"text",md:"Choose the visual for the relationship: lines for time, bars for category comparisons and scatterplots for association. Use honest axes, readable labels and consistent colour meaning. Narrative should explain significant exceptions, causes, limitations and actions rather than restate the chart."},{kind:"example",title:"A broken trend",scenario:"Customer retention appears to rise from 78% to 86%, but the definition changed from all customers to subscribers active for six months.",steps:[{label:"Challenge",detail:"The series is not comparable across the definition change."},{label:"Repair",detail:"Restate prior periods on the new basis where possible or show a visible break."},{label:"Explain",detail:"Quantify the definition effect and separate it from operational movement."},{label:"Act",detail:"Assign one governed KPI definition and owner."}],result:"Management receives a defensible trend rather than a visually persuasive fiction."}]}],examTraps:[{trap:"Evaluating company results when asked to evaluate the report.",fix:"Test relevance, balance, comparability, clarity and actionability."},{trap:"Treating more measures as better reporting.",fix:"Prioritise strategic and material insight and manage overload."}],keyTerms:[{term:"Information overload",def:"Excess volume or detail that obscures material issues and reduces decision usefulness."},{term:"Narrative commentary",def:"Context explaining significant results, causes, uncertainty and intended response."}],summary:["Design from user, strategy and decision.","Keep KPI definitions comparable and governed.","Use visuals honestly.","Turn exceptions into explanation and action."]}

export const APM_OFFICIAL_D: StudyChapter={paper:"APM",area:"D",title:"Data science and technology for performance and insights",minutes:18,intro:"Technology creates performance insight only when data are reliable, models are valid and outputs are interpreted with ethical, commercial and human judgement.",outcomes:["Evaluate information architecture and data quality","Distinguish descriptive, diagnostic, predictive and prescriptive analytics","Assess machine-learning validity and limitations","Govern AI, privacy, security, bias and human oversight"],sections:[{id:"data-analytics",heading:"From governed data to insight",blocks:[...take(APM_B,["it-information"])[0].blocks,{kind:"table",caption:"Analytics ladder",head:["Type","Management question"],rows:[["Descriptive","What happened?"],["Diagnostic","Why did it happen?"],["Predictive","What may happen?"],["Prescriptive","What action is likely to improve the outcome?"]]},{kind:"text",md:"Data science is iterative: frame the performance question, acquire and clean data, explore patterns, build and validate a model, communicate limitations, deploy with controls and monitor drift. Correlation alone does not prove causation."}]},{id:"responsible-models",heading:"Model validity, responsible AI and control",blocks:[{kind:"text",md:"Separate training, validation and test evidence. Watch for **overfitting**, leakage, unstable proxies, drift and biased outcomes across relevant groups. Accuracy is not the only criterion: consider false-positive costs, explainability, privacy, security and whether a human can challenge the output."},{kind:"diagram",diagram:{type:"flow",title:"Governed analytics lifecycle",data:{steps:[{label:"Decision and purpose"},{label:"Provenance and quality"},{label:"Model and validation"},{label:"Bias and risk review"},{label:"Human decision"},{label:"Monitoring and learning"}]}}},{kind:"callout",tone:"rule",title:"Insight is not authority",md:"A model output informs accountable management judgement. Define who can override it, record decisions and monitor real outcomes."}]}],examTraps:[{trap:"Listing technology benefits without a performance decision.",fix:"Tie data and analytics to the user, action, value and risk."},{trap:"Accepting model accuracy at face value.",fix:"Assess validation, overfitting, bias, drift and consequences of error."}],keyTerms:[{term:"Overfitting",def:"Learning training-data noise so a model fails to generalise."},{term:"Data provenance",def:"Traceable origin, ownership, definitions and transformations of data."},{term:"Model drift",def:"Deterioration as relationships or input distributions change after deployment."}],summary:["Start with a performance decision.","Govern data quality and provenance.","Validate models on unseen evidence.","Control bias, security, ethics and human accountability."]}

export const APM_OFFICIAL_E: StudyChapter={paper:"APM",area:"E",title:"Professional skills",minutes:15,intro:"Professional marks reward how technical knowledge becomes useful senior-management advice through communication, evaluation, scepticism and commercial acumen.",outcomes:["Communicate for the required recipient and format","Analyse and evaluate scenario evidence","Challenge claims and assumptions sceptically","Recommend commercially viable action"],sections:[{id:"professional",heading:"Four lenses in every answer",blocks:[{kind:"table",caption:"Professional evidence",head:["Skill","Demonstration"],rows:[["Communication","Logical structure, appropriate tone and clear conclusion"],["Analysis and evaluation","Relationships, significance, alternatives and judgement"],["Scepticism","Challenge data, causality and assumptions; identify missing evidence"],["Commercial acumen","Connect insight to value, risk, stakeholders, capacity and action"]]},{kind:"example",title:"Causal claim under challenge",scenario:"Sales rose after a dashboard launch, but prices fell and a competitor exited.",steps:[{label:"Analyse",detail:"Separate timing and quantify relevant changes."},{label:"Challenge",detail:"Identify price and competition as confounding factors."},{label:"Seek",detail:"Request segment, cohort or controlled evidence."},{label:"Advise",detail:"Avoid attributing causality; test the dashboard through defined adoption and outcome measures."}],result:"The conclusion is cautious, useful and commercially grounded."}]}],examTraps:[{trap:"Describing a model generically.",fix:"Apply evidence to the exact requirement and recipient."},{trap:"Making unsupported causal claims.",fix:"Test alternatives and identify the evidence needed."}],keyTerms:[{term:"Confounding factor",def:"A variable associated with both a supposed cause and outcome that can create a misleading causal inference."}],summary:["Structure for the recipient.","Evaluate significance and fitness for purpose.","Challenge weak evidence.","Recommend practical action."]}
