import { type NextRequest, NextResponse } from "next/server"
import { getHuggingFaceClient } from "@/lib/huggingface-client"

export async function POST(request: NextRequest) {
  try {
    const { message, language = "en" } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 })
    }

    const client = getHuggingFaceClient()
    if (!client) {
      return NextResponse.json(
        { error: "Hugging Face client not configured. Please set HUGGINGFACE_API_KEY environment variable." },
        { status: 500 },
      )
    }

    const response = await client.generateResponse(message, language)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
