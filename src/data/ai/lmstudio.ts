// src/data/ai/lmstudio.ts

// Sử dụng địa chỉ IP máy tính nếu bạn test trên điện thoại, 
// hoặc localhost nếu test trên trình duyệt máy tính.
const API_URL = "http://localhost:1234/v1/chat/completions";

type Message = {
  role: "system" | "user";
  content: string;
};

export async function requestAI(messages: Message[]): Promise<string> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        model: "qwen/qwen3-vl-4b", // Đảm bảo tên này giống hệt trong LM Studio
        messages: messages,
        temperature: 0.2
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`LM Studio API error: ${res.status} - ${errorText}`);
    }

    const json = await res.json();
    return json.choices[0].message.content;
  } catch (error) {
    console.error("Lỗi fetch AI:", error);
    // Nếu bị "Failed to fetch", lỗi sẽ rơi vào đây
    throw new Error("Không thể kết nối tới LM Studio. Hãy kiểm tra xem Server đã chạy và bật CORS chưa.");
  }
}