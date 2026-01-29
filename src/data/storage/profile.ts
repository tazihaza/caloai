import { UserProfile } from "@/domain/user/profile"

const KEY = "caloai:profile"

export type StoredProfile = UserProfile & {
  targetCalories: number
  explanation: string
}

export function saveProfile(profile: StoredProfile) {
  localStorage.setItem(KEY, JSON.stringify(profile))
}

export function loadProfile(): StoredProfile | null {
  const raw = localStorage.getItem(KEY)
  if (!raw) return null
  return JSON.parse(raw)
}
