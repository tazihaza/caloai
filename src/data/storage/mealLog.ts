// src/data/storage/mealLog.ts

export type Meal = {
  id: string
  name: string
  calories: number
  date: string // YYYY-MM-DD
}

const KEY = "caloai:meals"

function load(): Meal[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}

function save(data: Meal[]) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function addMeal(meal: Meal) {
  const data = load()
  data.push(meal)
  save(data)
}

export function getMealsByDate(date: string): Meal[] {
  return load().filter(m => m.date === date)
}
