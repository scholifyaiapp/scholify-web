/*
 * Smart local fallbacks for Lara's daily message.
 *
 * A generic line ("Amazing work!", "You're crushing it!") is the fastest way
 * to break trust. When the Claude API is unavailable we still say something
 * specific — the user's name, streak, goal, today's task, minutes — so the
 * coach never sounds like a template.
 */

export interface FallbackContext {
  name: string
  streak: number
  goal: string
  taskTitle: string
  minutes: number
  completedToday: boolean
  totalSessions: number
}

export function getLaraFallback(ctx: FallbackContext): string {
  const { name, streak, goal, taskTitle, minutes, completedToday, totalSessions } = ctx
  const who = (name || "").trim() || "Hey"

  if (completedToday) {
    if (streak >= 30)
      return `${who}, Day ${streak}. ${totalSessions} sessions total — that's a level most people never reach.`
    if (streak >= 14)
      return `${who}, Day ${streak}. 14+ days means this is becoming real. Tomorrow: ${taskTitle}.`
    if (streak >= 7)
      return `${who}, Day ${streak} done. You're past the point where most people quit. Tomorrow: ${taskTitle}.`
    return `${who}, Day ${streak} complete. ${taskTitle} done. Same time tomorrow.`
  }

  // Not completed yet.
  if (streak >= 14)
    return `${who}, Day ${streak} is waiting. ${taskTitle}. ${minutes} minutes. You've done this ${totalSessions} times before.`
  if (streak >= 7)
    return `${who}, ${taskTitle} today. ${minutes} minutes. Your ${streak}-day streak is still alive.`
  if (streak >= 3)
    return `${who}, Day ${streak + 1}. ${taskTitle}. ${minutes} minutes. You came back yesterday — come back today.`
  if (streak >= 1)
    return `${who}, Day ${streak + 1} of "${goal}". ${taskTitle}. ${minutes} minutes and the chain stays alive.`
  return `${who}, today: ${taskTitle}. ${minutes} minutes. That's all it takes to start.`
}
