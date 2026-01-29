export async function getTodayTarget() {
  return {
    targetCalories: 1800,
  }
}

export async function getDashboardInsight(input: {
  remaining: number
}) {
  if (input.remaining > 500) {
    return "Hôm nay đang đi đúng hướng 👍"
  }
  if (input.remaining > 0) {
    return "Gần chạm mục tiêu, cân nhắc ăn nhẹ"
  }
  return "Hôm nay đã vượt mục tiêu, nên dừng ăn"
}
