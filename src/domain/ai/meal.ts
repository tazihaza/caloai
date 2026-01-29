import { AI_PROVIDER } from "@/app/config"

export async function estimateMealWithAI(text: string): Promise<{
  name: string
  calories: number
  confidence?: number
}> {
  return AI_PROVIDER.estimateMeal({ text })
}
