import { requestAI } from "@/data/ai/lmstudio"

/* ------------------ utils ------------------ */
function safeParseJSON<T>(text: string): T {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  return JSON.parse(cleaned)
}

/* ------------------ providers ------------------ */
async function estimateMeal(prompt: string) {
  const res = await requestAI([
    {
      role: "system",
      content:
        'Bạn là AI tính calo. Chỉ trả về JSON: { "name": string, "calories": number, "confidence": number }',
    },
    { role: "user", content: prompt },
  ])

  return safeParseJSON<{
    name: string
    calories: number
    confidence: number
  }>(res)
}

async function estimateActivity(prompt: string) {
  const res = await requestAI([
    {
      role: "system",
      content:
        'Bạn là AI phân tích hoạt động. Chỉ trả về JSON: { "type": string, "minutes": number, "calories": number }',
    },
    { role: "user", content: prompt },
  ])

  return safeParseJSON<{
    type: string
    minutes: number
    calories: number
  }>(res)
}

async function calculateTarget(profile: any) {
  const res = await requestAI([
    {
      role: "system",
      content:
        'Bạn là AI tính target calo mỗi ngày. Trả về JSON: { "targetCalories": number, "explanation": string }',
    },
    {
      role: "user",
      content: JSON.stringify(profile),
    },
  ])

  return safeParseJSON<{
    targetCalories: number
    explanation: string
  }>(res)
}

/* ------------------ EXPORT ------------------ */
export const AI_PROVIDER = {
  estimateMeal,
  estimateActivity,
  calculateTarget,
}
