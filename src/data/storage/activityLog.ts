// src/data/storage/activityLog.ts

export type Activity = {
  id: string
  name: string
  calories: number
  date: string
}

const KEY = "caloai.activities"

function load(): Activity[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}

export function addActivity(a: Activity) {
  const list = load()
  list.push(a)
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getActivitiesByDate(date: string): Activity[] {
  return load().filter(a => a.date === date)
}
