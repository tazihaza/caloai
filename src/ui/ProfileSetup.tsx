import { useState } from "react"
import { calculateDailyTarget } from "@/domain/ai/target"
import { saveProfile } from "@/data/storage/profile"

type GoalUI = "cut" | "maintain" | "bulk"
type ActivityUI = "low" | "medium" | "high"

export default function ProfileSetup() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [activity, setActivity] = useState<ActivityUI>("medium")
  const [goal, setGoal] = useState<GoalUI>("cut")
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    try {
      const profile = { gender, age, height, weight, activity, goal }
      const result = await calculateDailyTarget(profile)

      saveProfile({
        ...profile,
        targetCalories: result.targetCalories,
        explanation: result.explanation,
      })

      window.dispatchEvent(new Event("caloai:profile-updated"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-4">
      <h1 className="text-lg font-semibold mb-4 flex items-center gap-2">
        👤 Hồ sơ cá nhân
      </h1>

      {/* FORM */}
      <div className="space-y-3 max-w-md mx-auto">

        {/* Gender */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as any)}
          className="w-full bg-slate-800 p-3 rounded-xl outline-none"
        >
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>

        {/* Age */}
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
          placeholder="Tuổi"
          className="w-full bg-slate-800 p-3 rounded-xl outline-none"
        />

        {/* Height */}
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(+e.target.value)}
          placeholder="Chiều cao (cm)"
          className="w-full bg-slate-800 p-3 rounded-xl outline-none"
        />

        {/* Weight */}
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(+e.target.value)}
          placeholder="Cân nặng (kg)"
          className="w-full bg-slate-800 p-3 rounded-xl outline-none"
        />

        {/* Activity */}
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityUI)}
          className="w-full bg-slate-800 p-3 rounded-xl outline-none"
        >
          <option value="low">Ít vận động</option>
          <option value="medium">Vừa</option>
          <option value="high">Nhiều</option>
        </select>

        {/* Goal */}
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value as GoalUI)}
          className="w-full bg-slate-800 p-3 rounded-xl outline-none"
        >
          <option value="cut">Giảm cân</option>
          <option value="maintain">Giữ cân</option>
          <option value="bulk">Tăng cân</option>
        </select>

        {/* Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-orange-500 text-black py-3 rounded-xl font-semibold text-center whitespace-nowrap"
        >
          {loading ? "Đang tính target..." : "Lưu & tính target"}
        </button>
      </div>
    </div>
  )
}
