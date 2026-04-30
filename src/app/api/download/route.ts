import { NextResponse } from "next/server";
import { statsManager } from "@/utils/stats";
import { facebookHandler } from "@/lib/handlers/facebook";
import { tiktokHandler } from "@/lib/handlers/tiktok";
import { youtubeHandler } from "@/lib/handlers/youtube";
import { twitterHandler } from "@/lib/handlers/twitter";
import { telegramHandler } from "@/lib/handlers/telegram";

/**
 * In-Memory Rate Limiter Settings
 * Limits each IP to 20 requests per minute to protect the API quota.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_MINUTE = 20;
const WINDOW_MS = 60 * 1000; // 1 minute

/**
 * Main Download API Route.
 */
export async function POST(request: Request) {
  console.log("[API_ROUTE] Received download request");
  
  // 1. Get the user's IP Address
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  
  // 2. Rate Limiting Logic
  if (ip !== "unknown") {
    const now = Date.now();
    const userRecord = rateLimitMap.get(ip);

    if (!userRecord || now > userRecord.resetTime) {
      // First request or window expired: Reset
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    } else {
      // Within window
      if (userRecord.count >= MAX_REQUESTS_PER_MINUTE) {
        console.warn(`[RATE_LIMIT] Blocked IP: ${ip}. Exceeded ${MAX_REQUESTS_PER_MINUTE} req/min.`);
        return NextResponse.json(
          { error: "Too many requests. Please wait 1 minute before trying again." },
          { status: 429 }
        );
      }
      // Increment count
      userRecord.count += 1;
    }
  }

  // 3. Track user activity
  statsManager.trackActivity(ip);

  try {
    const { url, platform } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const lowerUrl = url.toLowerCase();
    let result = null;

    // Platform Dispatcher
    if (platform === "facebook" || lowerUrl.includes("facebook.com") || lowerUrl.includes("fb.watch") || lowerUrl.includes("fb.gg")) {
      result = await facebookHandler(url);
    } else if (platform === "tiktok" || lowerUrl.includes("tiktok.com")) {
      result = await tiktokHandler(url);
    } else if (platform === "youtube" || lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
      result = await youtubeHandler(url);
    } else if (platform === "twitter" || lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) {
      result = await twitterHandler(url);
    } else if (platform === "instagram" || lowerUrl.includes("instagram.com") || lowerUrl.includes("ig.me")) {
      const { instagramHandler } = await import("@/lib/handlers/instagram");
      result = await instagramHandler(url);
    } else if (platform === "telegram" || lowerUrl.includes("t.me") || lowerUrl.includes("telegram.me")) {
      result = await telegramHandler(url);
    } else {
      return NextResponse.json({ 
        error: "Currently only Instagram, Facebook, TikTok, YouTube, Twitter, and Telegram are supported." 
      }, { status: 400 });
    }

    if (result) {
      result.url = url;
      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    return NextResponse.json({ error: "Failed to process the requested URL." }, { status: 400 });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
