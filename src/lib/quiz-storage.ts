// Local-only quiz storage layer.
// When Supabase + Anthropic tokens land, swap the three exported functions
// (generateWeeklyQuiz / loadResult / saveResult) for real API calls — the
// component API will stay identical.

export type QuizQuestion = {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export type QuizPayload = {
  weekNumber: number
  goal: string
  questions: QuizQuestion[]
}

export type QuizAnswer = {
  selected: number | null
  correct: number
  timeMs: number
}

export type QuizResult = {
  weekNumber: number
  goal: string
  score: number
  totalQuestions: number
  timeTakenSeconds: number
  averageAnswerMs: number
  answers: QuizAnswer[]
  badgeEarned: boolean
  createdAt: string
}

const COMPLETED_KEY = (week: number) => `scholify.quiz.completed.${week}`
const RESULT_KEY = (week: number) => `scholify.quiz.result.${week}`
const DISMISS_KEY = (week: number) => `scholify.quiz.bannerDismissed.${week}`

export function getISOWeek(d: Date = new Date()): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function isSunday(d: Date = new Date()): boolean {
  return d.getDay() === 0
}

export function isQuizCompleted(weekNumber: number): boolean {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(COMPLETED_KEY(weekNumber)) === "1"
}

export function isBannerDismissed(weekNumber: number): boolean {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(DISMISS_KEY(weekNumber)) === "1"
}

export function dismissBanner(weekNumber: number): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(DISMISS_KEY(weekNumber), "1")
}

export function loadResult(weekNumber: number): QuizResult | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(RESULT_KEY(weekNumber))
  if (!raw) return null
  try {
    return JSON.parse(raw) as QuizResult
  } catch {
    return null
  }
}

export function saveResult(result: QuizResult): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(RESULT_KEY(result.weekNumber), JSON.stringify(result))
  window.localStorage.setItem(COMPLETED_KEY(result.weekNumber), "1")
}

// Deterministic mock generator. Will be replaced by /api/weekly-quiz call.
const QUIZ_TEMPLATE: QuizQuestion[][] = [
  [
    {
      question: "Which technique do active recall studies show consistently outperforms re-reading?",
      options: [
        "A) Highlighting passages",
        "B) Testing yourself from memory",
        "C) Listening to lectures twice",
        "D) Summarizing into bullet points",
      ],
      correct: 1,
      explanation: "Retrieval practice strengthens long-term memory more than passive review.",
    },
    {
      question: "Spaced repetition is most effective when reviews are scheduled…",
      options: [
        "A) Right before sleep every night",
        "B) At expanding intervals over days",
        "C) In one long weekly block",
        "D) Only after you forget the material",
      ],
      correct: 1,
      explanation: "Expanding intervals match the forgetting curve and stabilize recall.",
    },
    {
      question: "You learned a new formula this week. Which study move best tests transfer?",
      options: [
        "A) Re-copying the formula 10 times",
        "B) Solving a problem in a new context",
        "C) Reading the textbook chapter again",
        "D) Watching a video on the same topic",
      ],
      correct: 1,
      explanation: "Applying knowledge to a new context proves real understanding.",
    },
    {
      question: "Deliberate practice differs from regular practice mostly because it…",
      options: [
        "A) Lasts longer per session",
        "B) Targets specific weaknesses with feedback",
        "C) Always uses flashcards",
        "D) Requires a teacher present",
      ],
      correct: 1,
      explanation: "Deliberate practice isolates a weakness and iterates with feedback.",
    },
    {
      question: "Which schedule produces the strongest long-term retention?",
      options: [
        "A) 1 × 4-hour cram session",
        "B) 4 × 1-hour sessions over a week",
        "C) 2 × 2-hour sessions back-to-back",
        "D) 8 × 30-minute sessions in one day",
      ],
      correct: 1,
      explanation: "Distributed practice across days beats massed practice every time.",
    },
  ],
  [
    {
      question: "Interleaving means…",
      options: [
        "A) Studying one topic until mastered, then the next",
        "B) Mixing related topics within one session",
        "C) Switching subjects every five minutes",
        "D) Reviewing only the hardest material",
      ],
      correct: 1,
      explanation: "Interleaving forces you to discriminate between problem types.",
    },
    {
      question: "The Feynman technique asks you to…",
      options: [
        "A) Memorize key formulas first",
        "B) Explain a concept simply, as if to a child",
        "C) Read the source three times slowly",
        "D) Take dense notes during lectures",
      ],
      correct: 1,
      explanation: "Plain-language teaching exposes the gaps in your understanding.",
    },
    {
      question: "A 'productive struggle' during learning usually signals…",
      options: [
        "A) Your material is too hard — switch topics",
        "B) Effective encoding is happening",
        "C) You should take a long break",
        "D) The technique is wrong",
      ],
      correct: 1,
      explanation: "Desirable difficulty produces deeper, more durable learning.",
    },
    {
      question: "Apply it: you just finished a chapter. The best next 5-minute move is…",
      options: [
        "A) Reread the highlights",
        "B) Close the book and write what you remember",
        "C) Move on to the next chapter",
        "D) Watch a summary video",
      ],
      correct: 1,
      explanation: "Free recall right after exposure cements what you learned.",
    },
    {
      question: "Sleep mostly consolidates learning by…",
      options: [
        "A) Erasing irrelevant memories only",
        "B) Replaying neural patterns from the day",
        "C) Allowing more practice time tomorrow",
        "D) Reducing stress hormones",
      ],
      correct: 1,
      explanation: "Slow-wave and REM sleep replay and stabilize new memory traces.",
    },
  ],
]

export function generateWeeklyQuiz(weekNumber: number, goal: string): QuizPayload {
  const template = QUIZ_TEMPLATE[weekNumber % QUIZ_TEMPLATE.length]
  return {
    weekNumber,
    goal,
    questions: template,
  }
}
