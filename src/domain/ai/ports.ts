export interface AICalculator {
  complete(prompt: string): unknown
  calculateDailyTarget(input: any): Promise<{
    targetCalories: number
    explanation: string
  }>

  estimateMeal(input: any): Promise<{
    name: string
    calories: number
    confidence: number
  }>

  estimateActivity(input: any): Promise<number>
}
