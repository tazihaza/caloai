import { useState } from "react"
import { nanoid } from "nanoid"
import { parseActivityWithAI } from "@/domain/activity/ai"
import { createActivity } from "@/domain/activity/activity"

export default function AddActivity() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAdd() {
    if (!text.trim() || loading) return
    setLoading(true)
    setError(null)

    try {
      const ai = await parseActivityWithAI(text)

      createActivity({
        id: nanoid(),
        name: ai.type,
        minutes: ai.minutes,
        calories: ai.calories,
        date: new Date().toISOString().slice(0, 10),
      })

      setText("")
    } catch {
      setError("Không phân tích được hoạt động.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-4">
      <h1 className="text-lg font-semibold mb-4">🔥 Thêm hoạt động</h1>

      <div className="bg-slate-800/70 rounded-2xl p-4 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="VD: chạy bộ 30 phút"
          rows={3}
          className="w-full rounded-xl bg-slate-900 p-3 text-sm outline-none resize-none"
          disabled={loading}
        />

        {error && (
          <div className="text-sm text-red-400 bg-red-950/40 p-2 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-orange-500 text-black font-semibold"
        >
          {loading ? "Đang tính..." : "Thêm hoạt động"}
        </button>
      </div>
    </div>
  )
}
