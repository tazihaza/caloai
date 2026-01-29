import { AI_PROVIDER } from "@/app/config"

export type ActivityAIResult = {
  type: string
  minutes: number
  calories: number
}

export async function parseActivityWithAI(
  text: string
): Promise<ActivityAIResult> {
  return AI_PROVIDER.estimateActivity(text)
}
