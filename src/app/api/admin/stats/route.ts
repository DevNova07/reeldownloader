import { NextResponse } from "next/server"
import { statsManager } from "@/utils/stats"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const password = searchParams.get("password")

    // Password check (Hardcoded for now as per user request)
    if (password !== "1KINGkhan#") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      stats: statsManager.getStats()
    })
  } catch (error) {
    console.error("Admin Stats API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Internal Server Error",
      stats: null 
    }, { status: 500 })
  }
}
