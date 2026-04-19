import { NextResponse } from "next/server";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";
import { instagramHandler } from "@/lib/handlers/instagram";
import { tiktokHandler } from "@/lib/handlers/tiktok";
import { youtubeHandler } from "@/lib/handlers/youtube";
import { facebookHandler } from "@/lib/handlers/facebook";
import { snapchatHandler } from "@/lib/handlers/snapchat";
import { twitterHandler } from "@/lib/handlers/twitter";
import { telegramHandler } from "@/lib/handlers/telegram";
import { type PlatformResult } from "@/types/download";

/**
 * Optimized Main Download API Route.
 * fully modularized for high performance, type safety, and maintainability.
 */
export async function POST(request: Request) {
  // Track user activity
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  statsManager.trackActivity(ip);

  try {
    const { url, platform } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // --- CACHE CHECK ---
    const cachedData = cacheManager.get(url);
    if (cachedData) {
      statsManager.trackCacheHit();
      return NextResponse.json({ success: true, data: cachedData, cached: true });
    }

    let result: PlatformResult | null = null;
    const lowerUrl = url.toLowerCase();

    try {
      // Platform Dispatcher Logic
      if (platform === "instagram" || lowerUrl.includes("instagram.com")) {
        result = await instagramHandler(url);
      } else if (platform === "tiktok" || lowerUrl.includes("tiktok.com")) {
        result = await tiktokHandler(url);
      } else if (platform === "youtube" || lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
        result = await youtubeHandler(url);
      } else if (platform === "facebook" || lowerUrl.includes("facebook.com") || lowerUrl.includes("fb.watch") || lowerUrl.includes("fb.gg")) {
        result = await facebookHandler(url);
      } else if (platform === "snapchat" || lowerUrl.includes("snapchat.com")) {
        result = await snapchatHandler(url);
      } else if (platform === "twitter" || lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) {
        result = await twitterHandler(url);
      } else if (platform === "telegram" || lowerUrl.includes("t.me/") || lowerUrl.includes("telegram.me/")) {
        result = await telegramHandler(url);
      } else {
        return NextResponse.json({ 
          error: "Platform not supported OR automatic detection failed. Please try a different link." 
        }, { status: 400 });
      }

      if (result) {
        return NextResponse.json({
          success: true,
          data: result,
        });
      }

        } catch (handlerError: any) {
      console.error("Handler Error:", handlerError.message);
      return NextResponse.json({ error: handlerError.message || "Failed to process the requested media." }, { status: 400 });
    }

    return NextResponse.json({ error: "Platform not supported or invalid URL" }, { status: 400 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
