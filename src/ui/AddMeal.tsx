import { useState } from "react"
import { nanoid } from "nanoid"
import { addMeal } from "@/data/storage/mealLog"
import { estimateMealWithAI } from "@/domain/ai/meal"

export default function AddMeal() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAdd() {
    if (!text.trim() || loading) return
    setLoading(true)
    setError(null)

    try {
      const res = await estimateMealWithAI(text)

      addMeal({
        id: nanoid(),
        name: res.name,
        calories: res.calories,
        date: new Date().toISOString().slice(0, 10),
      })

      setText("")
    } catch {
      setError("Không ước lượng được món ăn, kiểm tra LM Studio nhé.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-4">
      <h1 className="text-lg font-semibold mb-4">🍽 Thêm bữa ăn</h1>

      <div className="bg-slate-800/70 rounded-2xl p-4 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="VD: 1 tô phở bò, 2 trứng luộc..."
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
          {loading ? "Đang phân tích..." : "Thêm bữa ăn"}
        </button>
      </div>
    </div>
  )
}
