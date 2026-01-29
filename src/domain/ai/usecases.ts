import { AI_PROVIDER } from "@/app/config"
import { Meal } from "@/domain/meal/model"

export async function estimateMeal(text: string): Promise<Pick<Meal, "name" | "calories">> {
  const res = await AI_PROVIDER.estimateMeal(text)

  return {
    name: res.name,
    calories: res.calories,
  }
}
