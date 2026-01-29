const KEY = "caloai.target"

export function saveTarget(calories: number) {
  localStorage.setItem(KEY, String(calories))
}

export function loadTarget(): number {
  return Number(localStorage.getItem(KEY) || 0)
}
