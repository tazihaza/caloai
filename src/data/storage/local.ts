import type { Meal } from "@/domain/meal/model"

const KEY = "caloai_meals"

export function loadMeals(): Meal[] {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveMeal(meal: Meal) {
  const meals = loadMeals()
  meals.unshift(meal)
  localStorage.setItem(KEY, JSON.stringify(meals))

  // 🔥 notify dashboard
  window.dispatchEvent(new Event("caloai:meal-updated"))
}

export function loadMealsToday(): Meal[] {
  const today = new Date().toDateString()
  return loadMeals().filter(
    (m) => new Date(m.createdAt).toDateString() === today
  )
}
