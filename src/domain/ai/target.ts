import { AI_PROVIDER } from "@/app/config"
import { UserProfile } from "@/domain/user/profile"

export async function calculateDailyTarget(profile: UserProfile) {
  const prompt = `
Thông tin:
- Giới tính: ${profile.gender}
- Tuổi: ${profile.age}
- Chiều cao: ${profile.height}
- Cân nặng: ${profile.weight}
- Vận động: ${profile.activity}
- Mục tiêu: ${profile.goal}

Hãy tính TDEE và lượng calo mục tiêu mỗi ngày.
`

  // 🔹 AI đã trả về object, không còn string
  const result = await AI_PROVIDER.calculateTarget(prompt)

  return {
    targetCalories: result.targetCalories,
    explanation: result.explanation,
  }
}
