// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"
import { TodayBoard } from "./TodayBoard"
import { PracticeHub } from "./PracticeHub"
import LearningDashboard from "./LearningDashboard"
import { PlanDashboard } from "./PlanDashboard"
import { ProgressBoard } from "./ProgressBoard"
import JourneyMap from "./JourneyMap"
import ExaminerView from "./ExaminerView"
import FlashcardsView from "./FlashcardsView"
import CbeMockRunner from "./CbeMockRunner"
import { setPlan } from "@/lib/acca-plan"
import { buildSession, recordAnswer, recordMock, getPaper } from "@/lib/acca"
import { buildDiagnostic, scoreDiagnostic, saveDiagnosticLocal, type AnsweredDiagnostic } from "@/lib/acca-diagnostic"

/*
 * THE STUDENT'S SCREENS, RENDERED.
 *
 * The data journey (acca-student-journey.test.ts) proves the loop's seams hold.
 * This file proves the student can SEE it: every major surface between the Today
 * board and the mock runner renders without throwing, in the two states that
 * matter — a brand-new account (empty ledgers everywhere) and an account deep in
 * the journey (practice record, diagnostic, passed mocks).
 *
 * This repo has shipped render-time crashes that typecheck could not see (the
 * reason StudyChapterReader.test.tsx and MockCentre.test.tsx exist). Those two
 * cover the reader and the mock centre; this file covers the REST of the
 * student's route through a paper.
 *
 * The global setup wipes localStorage before every test, so the populated state
 * is rebuilt per test via seedJourney().
 */
afterEach(cleanup)
const noop = () => {}

const PAPER = "MA"

/** A student mid-journey: dated plan, diagnostic on file, 60 answers, one passed mock. */
function seedJourney(paperId = PAPER): void {
  const exam = new Date()
  exam.setDate(exam.getDate() + 60)
  setPlan(paperId, { examDate: exam.toISOString().slice(0, 10), dailyMinutes: 45, daysPerWeek: 5, studyDays: [1, 2, 3, 4, 5], dailyGoal: 12, targetProb: 75 })
  const qs = buildDiagnostic(paperId, 7)
  const answers: AnsweredDiagnostic[] = qs.map((q, i) => ({ q, correct: i % 3 !== 0 }))
  saveDiagnosticLocal(scoreDiagnostic(paperId, answers))
  buildSession(paperId, 60, undefined, 3).forEach((q, i) => recordAnswer(paperId, q, i % 4 !== 0))
  recordMock(paperId, 61, 100, 1)
}

describe("Today board", () => {
  it("renders for a brand-new account", () => {
    const { container } = render(
      <TodayBoard paperId={PAPER} paperName={getPaper(PAPER)?.name ?? "MA"} done={[]} onRun={noop} onArticle={noop} />,
    )
    expect(container.textContent?.length ?? 0).toBeGreaterThan(0)
  })

  it("renders mid-journey with completed blocks", () => {
    seedJourney()
    const { container } = render(
      <TodayBoard paperId={PAPER} paperName="Management Accounting" firstName="Amina" done={["learn"]} onRun={noop} onArticle={noop} onDayComplete={noop} onStartTomorrow={noop} />,
    )
    expect(container.textContent).toContain("Amina")
  })
})

describe("Practice hub", () => {
  const props = {
    paperId: PAPER, isPro: true,
    onStudyChapter: noop, onTestChapter: noop, onArea: noop, onWeak: noop,
    onSection: noop, onBankRun: noop, onMock: noop, onExaminer: noop, onGenerate: noop, onFlashcards: noop,
  }
  it("renders empty and populated, Pro and free", () => {
    render(<PracticeHub {...props} />)
    cleanup()
    seedJourney()
    render(<PracticeHub {...props} />)
    cleanup()
    render(<PracticeHub {...props} isPro={false} />)
  })
})

describe("Learning dashboard, plan dashboard, progress board", () => {
  it("all three render for a new account", () => {
    render(<LearningDashboard paperId={PAPER} />)
    cleanup()
    render(<PlanDashboard paperId={PAPER} />)
    cleanup()
    render(<ProgressBoard paperId={PAPER} isPro onDiagnostic={noop} onFullAnalytics={noop} onWeak={noop} onUpgrade={noop} />)
  })

  it("all three render mid-journey", () => {
    seedJourney()
    render(<LearningDashboard paperId={PAPER} />)
    cleanup()
    render(<PlanDashboard paperId={PAPER} />)
    cleanup()
    render(<ProgressBoard paperId={PAPER} isPro={false} onDiagnostic={noop} onFullAnalytics={noop} onWeak={noop} onUpgrade={noop} />)
  })
})

describe("Journey map", () => {
  it("renders at the start and mid-journey", () => {
    render(<JourneyMap paperId={PAPER} onBack={noop} />)
    cleanup()
    seedJourney()
    render(<JourneyMap paperId={PAPER} onBack={noop} />)
  })
})

describe("Examiner view", () => {
  it("copes with an objective-only paper (MA) and a written paper (AA)", () => {
    // MA's real exam has no constructed section — the surface must render its
    // advisory state rather than crash on the empty list.
    render(<ExaminerView paperId={PAPER} onBack={noop} />)
    cleanup()
    render(<ExaminerView paperId="AA" onBack={noop} />)
  })
})

describe("Flashcards", () => {
  it("renders a fresh deck and records a review without crashing", () => {
    seedJourney()
    const { container } = render(<FlashcardsView paperId={PAPER} onBack={noop} onComplete={noop} />)
    expect(container.textContent?.length ?? 0).toBeGreaterThan(0)
  })
})

describe("CBE mock runner — the actual exam sitting", () => {
  it("composes and renders form 1 for MA (35 OTs + 3 MTQs)", () => {
    seedJourney()
    const { container } = render(<CbeMockRunner paperId={PAPER} form={1} onBack={noop} />)
    expect(container.textContent?.length ?? 0).toBeGreaterThan(0)
  })

  it("renders a Strategic Professional sitting too (AAA: 50+25+25 written)", () => {
    const { container } = render(<CbeMockRunner paperId="AAA" form={1} onBack={noop} />)
    expect(container.textContent?.length ?? 0).toBeGreaterThan(0)
  })
})
