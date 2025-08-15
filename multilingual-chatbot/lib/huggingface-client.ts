interface HuggingFaceResponse {
  generated_text?: string
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export class HuggingFaceClient {
  private apiKey: string
  private apiUrl: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.apiUrl = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
  }

  private getPromptByLanguage(lang: string, prompt: string): string {
    const prompts = {
      uz: `Savolga do'stona, tushunarli, faktlarga asoslangan va emojili tarzda javob yozing.\n\nSavol: ${prompt}\nJavob:`,
      ru: `Ответь на вопрос дружелюбно, точно, с фактами и смайликами.\n\nВопрос: ${prompt}\nОтвет:`,
      en: `Answer in a friendly, factual way with emojis.\n\nQuestion: ${prompt}\nAnswer:`,
    }
    return prompts[lang as keyof typeof prompts] || prompts.en
  }

  async generateResponse(message: string, language = "en"): Promise<string> {
    try {
      const prompt = this.getPromptByLanguage(language, message)

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false,
          },
        }),
      })

      if (response.status === 503) {
        return language === "uz"
          ? "⏳ Model yuklanmoqda, qayta urinib ko'ring."
          : language === "ru"
            ? "⏳ Модель загружается, попробуйте еще раз."
            : "⏳ Model is loading, please try again."
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      if (Array.isArray(data) && data[0]?.generated_text) {
        return this.cleanResponse(data[0].generated_text, language)
      } else if (data.generated_text) {
        return this.cleanResponse(data.generated_text, language)
      } else {
        return language === "uz"
          ? "😕 Javobni tushunmadim."
          : language === "ru"
            ? "😕 Не понял ответ."
            : "😕 Could not understand the response."
      }
    } catch (error) {
      console.error("HuggingFace API Error:", error)
      return language === "uz"
        ? "⚠️ Xatolik yuz berdi. Qayta urinib ko'ring."
        : language === "ru"
          ? "⚠️ Произошла ошибка. Попробуйте еще раз."
          : "⚠️ An error occurred. Please try again."
    }
  }

  private cleanResponse(text: string, language: string): string {
    // Remove the prompt part and clean up the response
    const markers = ["Javob:", "Ответ:", "Answer:"]
    let cleaned = text

    for (const marker of markers) {
      if (cleaned.includes(marker)) {
        cleaned = cleaned.split(marker).pop() || cleaned
        break
      }
    }

    return cleaned.trim()
  }
}

// Singleton instance
let huggingFaceClient: HuggingFaceClient | null = null

export function getHuggingFaceClient(): HuggingFaceClient | null {
  if (typeof window !== "undefined") {
    // Client-side: API key should be passed from server
    return null
  }

  const apiKey = process.env.HUGGINGFACE_API_KEY
  if (!apiKey) {
    console.warn("HUGGINGFACE_API_KEY not found in environment variables")
    return null
  }

  if (!huggingFaceClient) {
    huggingFaceClient = new HuggingFaceClient(apiKey)
  }

  return huggingFaceClient
}
