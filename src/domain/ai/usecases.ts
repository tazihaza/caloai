import type { AICalculator } from "./ports"
import type { Meal } from "@/domain/meal/model"

export async function estimateMealWithAI(
  ai: AICalculator,
  input: { text: string }
): Promise<Meal> {
  const res = await ai.estimateMeal({
    description: input.text,
  })

  return {
    id: crypto.randomUUID(),
    name: res.name,
    calories: res.calories,
    confidence: res.confidence,
    createdAt: new Date().toISOString(),
  }
}
