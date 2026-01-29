export type Gender = "male" | "female"
export type ActivityLevel = "low" | "medium" | "high"
export type Goal = "cut" | "maintain" | "bulk"

export interface UserProfile {
  gender: Gender
  age: number
  height: number // cm
  weight: number // kg
  activity: ActivityLevel
  goal: Goal
}
