import { AI_PROVIDER } from "@/app/config"

export async function estimateMealWithAI(text: string) {
  return AI_PROVIDER.estimateMeal(text)
}
