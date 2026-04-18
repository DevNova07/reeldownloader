import { NextResponse } from "next/server"
import { statsManager } from "@/utils/stats"

export async function POST() {
  try {
    statsManager.trackVisit()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
