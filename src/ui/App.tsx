import { useState } from "react"
import Dashboard from "@/ui/Dashboard"
import AddMeal from "@/ui/AddMeal"
import AddActivity from "@/ui/AddActivity"
import Diary from "@/ui/Diary"
import ProfileSetup from "@/ui/ProfileSetup"

type Tab = "dashboard" | "addMeal" | "addActivity" | "diary" | "profile"

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-md mx-auto p-4 flex justify-between items-center">
          <h1 className="font-bold text-lg">caloai</h1>

          <nav className="flex gap-3 text-sm">
            <button onClick={() => setTab("dashboard")}>Home</button>
            <button onClick={() => setTab("diary")}>Diary</button>
            <button onClick={() => setTab("addMeal")}>+ Meal</button>
            <button onClick={() => setTab("addActivity")}>+ Activity</button>
            <button onClick={() => setTab("profile")}>Profile</button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto">
        {tab === "dashboard" && <Dashboard />}
        {tab === "diary" && <Diary />}
        {tab === "addMeal" && <AddMeal />}
        {tab === "addActivity" && <AddActivity />}
        {tab === "profile" && <ProfileSetup />}
      </main>
    </div>
  )
}
