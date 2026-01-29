import { Meal } from "@/data/storage/mealLog"

export interface DaySummary {
  target: number
  eaten: number
  burned: number
  remaining: number
  message: string
}

export function summarizeDay(input: {
  meals: Meal[]
  target: number
  burned: number
}): DaySummary {
  const eaten =
    input.meals.reduce((sum, m) => sum + (m.calories || 0), 0) || 0

  const burned = input.burned || 0
  const target = input.target || 0

  const remaining = target - eaten - burned

  let message = "Hôm nay vẫn trong ngưỡng tốt 👍"
  if (remaining < 0) {
    message = "Bạn đã vượt target hôm nay ⚠️"
  }

  return {
    target,
    eaten,
    burned,
    remaining,
    message,
  }
}
