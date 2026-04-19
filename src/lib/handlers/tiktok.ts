import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

/**
 * Optimized TikTok Downloader Handler.
 * modularized for speed and maintainability.
 */
interface TikTokFreeAPIResponse {
  status: string;
  video_url: string;
  cover: string;
  music: string;
  title: string;
  author: string;
  author_id: string;
  like_count: number;
  share_count: number;
  comment_count: number;
}

interface TikTokAllInOneResponse {
  error?: boolean;
  thumbnail?: string;
  title?: string;
  medias?: Array<{ url: string; type: string; quality?: string; extension?: string }>;
}

export async function tiktokHandler(url: string): Promise<PlatformResult> {
  let finalUrl = url;
  const lastErrorMessage = "Could not fetch TikTok media details. Please try again later.";

  // --- URL RESOLVER (for v.tiktok.com short links) ---
  if (url.includes("v.tiktok.com")) {
    try {
      const headRes = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (headRes.url) {
        finalUrl = headRes.url.split('?')[0];
      }
    } catch (e) {
      console.warn("URL resolution failed, using original:", e);
    }
  }

  // --- PRIMARY TIKTOK API (User-Provided High Success API) ---
  try {
    const primaryHost = "tiktok-video-downloader-7690-video-per-months-for-free.p.rapidapi.com";
    const primaryUrl = `https://${primaryHost}/tiktok-video.php?url=${encodeURIComponent(finalUrl)}`;
    
    
    const response = await fetchWithRotation(primaryUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": primaryHost },
    }, "tiktok");

    if (response.ok) {
      const rawData = (await response.json()) as TikTokFreeAPIResponse;
      
      if (rawData.status === "success" && rawData.video_url) {
        const medias: Media[] = [];
        
        // Add Video
        medias.push({
          id: (rawData.author_id || "v1") + "_video",
          url: rawData.video_url,
          quality: "HD Video (No Watermark)",
          type: "video",
          extension: "mp4"
        });

        // Add Audio
        if (rawData.music) {
          medias.push({
            id: (rawData.author_id || "v1") + "_music",
            url: rawData.music,
            quality: "Audio (MP3)",
            type: "audio",
            extension: "mp3"
          });
        }

        const formattedData: PlatformResult = {
          thumbnail: rawData.cover || "",
          title: rawData.title || "TikTok Video",
          medias: medias,
          caption: rawData.title || "",
          likes: rawData.like_count || 0,
          commentCount: rawData.comment_count || 0,
        };

        statsManager.trackDownload(url, formattedData.title, "tiktok");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    const error = e as Error;
    console.error("TikTok API failed:", error.message);
  }

  // --- SECONDARY TIKTOK API (Social Download All-in-One Fallback) ---
  try {
    const fallbackHost = "social-download-all-in-one.p.rapidapi.com";
    const fallbackUrl = `https://${fallbackHost}/v1/social/autolink`;


    const response = await fetchWithRotation(fallbackUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": fallbackHost,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: finalUrl }),
    }, "tiktok_v2");

    if (response.ok) {
      const data = (await response.json()) as TikTokAllInOneResponse;

      if (!data.error && data.medias && data.medias.length > 0) {
        const formattedData: PlatformResult = {
          thumbnail: data.thumbnail || "",
          title: data.title || "TikTok Video",
          medias: data.medias.map((m) => ({
            id: Math.random().toString(36).substring(7),
            url: m.url,
            quality: m.quality || "HD Video",
            type: "video",
            extension: m.extension || "mp4",
          })),
          caption: data.title || "",
          likes: 0,
          commentCount: 0,
        };

        statsManager.trackDownload(url, formattedData.title, "tiktok_v2");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    const error = e as Error;
    console.error("All TikTok clusters failed:", error.message);
  }

  throw new Error(lastErrorMessage);
}
