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
      console.error("HUGGINGFACE_API_KEY not found in environment variables")
      return NextResponse.json(
        {
          error: "AI service not configured. Please add HUGGINGFACE_API_KEY to environment variables.",
          details: "Contact administrator to configure the API key.",
        },
        { status: 503 },
      )
    }

    const response = await client.generateResponse(message, language)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
