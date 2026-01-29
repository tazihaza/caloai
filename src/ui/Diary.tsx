import { useEffect, useState } from "react"
import { getMealsByDate } from "@/data/storage/mealLog"
import { loadTarget } from "@/data/storage/target"
import { summarizeDay } from "@/domain/daylog/summary"

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function Diary() {
  const [date, setDate] = useState(today())
  const [meals, setMeals] = useState<any[]>([])
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    const mealsByDay = getMealsByDate(date)
    setMeals(mealsByDay)

    const target = loadTarget() ?? 0
    setSummary(
      summarizeDay({
        meals: mealsByDay,
        target,
        burned: 0,
      })
    )
  }, [date])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-4">
      <h1 className="text-lg font-semibold mb-4">📔 Nhật ký</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-4 bg-slate-800 rounded-xl p-2 text-sm"
      />

      {summary && (
        <div className="bg-slate-800/70 rounded-2xl p-4 mb-4 space-y-1">
          <div>🎯 Target: {summary.target}</div>
          <div>🍽 Đã ăn: {summary.eaten}</div>
          <div className="font-semibold">
            🔵 Còn lại: {summary.remaining}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {meals.map((m) => (
          <div
            key={m.id}
            className="bg-slate-800/60 rounded-xl p-3 flex justify-between"
          >
            <span>{m.name}</span>
            <span className="font-medium">{m.calories} kcal</span>
          </div>
        ))}

        {meals.length === 0 && (
          <div className="text-slate-500 text-sm">
            Chưa có bữa ăn nào
          </div>
        )}
      </div>
    </div>
  )
}
