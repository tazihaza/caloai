// src/domain/ai/activity.ts
import { AI_PROVIDER } from "@/app/config";

export type ActivityAIResult = {
  type: string;
  minutes: number;
  calories: number;
};

export async function parseActivityWithAI(text: string): Promise<ActivityAIResult> {
  const result = await AI_PROVIDER.estimateActivity(text);
  
  return {
    type: result.type || text,
    minutes: Number(result.minutes) || 0,
    calories: Number(result.calories) || 0,
  };
}