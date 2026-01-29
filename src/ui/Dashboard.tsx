import { useEffect, useState } from "react"
import { getMealsByDate } from "@/data/storage/mealLog"
import { getActivitiesByDate } from "@/data/storage/activityLog"
import { loadTarget } from "@/data/storage/target"

export default function Dashboard() {
  const [target, setTarget] = useState(0)
  const [eaten, setEaten] = useState(0)
  const [burned, setBurned] = useState(0)

  function reload() {
    const today = new Date().toISOString().slice(0, 10)

    const meals = getMealsByDate(today)
    const activities = getActivitiesByDate(today)

    setEaten(meals.reduce((s, m) => s + m.calories, 0))
    setBurned(activities.reduce((s, a) => s + a.calories, 0))
    setTarget(loadTarget())
  }

  useEffect(() => {
    reload()
    const fn = () => reload()
    window.addEventListener("caloai:meal-log-updated", fn)
    window.addEventListener("caloai:activity-log-updated", fn)
    return () => {
      window.removeEventListener("caloai:meal-log-updated", fn)
      window.removeEventListener("caloai:activity-log-updated", fn)
    }
  }, [])

  const remain = target - eaten + burned

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 to-slate-950 text-white p-4">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm text-slate-400">Hôm nay</h2>
        <h1 className="text-lg font-semibold">Tổng quan năng lượng</h1>
      </div>

      {/* Main Card */}
      <div className="relative rounded-2xl bg-slate-800/70 p-6 shadow-lg">
        {/* Semi circle */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-56 h-28 border-t-8 border-slate-600 rounded-t-full"></div>
          <div className="absolute text-center">
            <div className="text-4xl font-bold">{remain}</div>
            <div className="text-slate-400 text-sm">kcal còn lại</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <div className="text-slate-400">🎯 Target</div>
            <div className="font-medium">{target}</div>
          </div>
          <div>
            <div className="text-slate-400">🍽 Đã ăn</div>
            <div className="font-medium">{eaten}</div>
          </div>
          <div>
            <div className="text-slate-400">🔥 Đã tiêu</div>
            <div className="font-medium">{burned}</div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="mt-6 text-center text-slate-500 text-sm">
        Nhấn <span className="font-semibold text-white">+ Add</span> để ghi bữa ăn hoặc hoạt động
      </div>
    </div>
  )
}
