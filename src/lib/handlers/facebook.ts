import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

interface FacebookFreeResponse {
  success: boolean;
  id: string;
  title: string;
  links: {
    "Download Low Quality"?: string;
    "Download High Quality"?: string;
    [key: string]: string | undefined;
  };
}

interface FacebookV1Response {
  status: string;
  data?: {
    video?: {
      thumbnail_url?: string;
      title?: string;
      description?: string;
    };
    download?: {
      hd?: { url: string; quality?: string };
      sd?: { url: string; quality?: string };
    };
  };
}

interface FacebookAllInOneResponse {
  error?: boolean;
  thumbnail?: string;
  title?: string;
  medias?: Array<{ url: string; type: string; quality?: string; extension?: string }>;
}

/**
 * Facebook Downloader Handler.
 * 3-node fallback chain for maximum reliability.
 * Node 1: free-facebook-downloader (primary)
 * Node 2: facebook-video-downloader9 (fallback)
 * Node 3: social-download-all-in-one (last resort — shared with Instagram backup)
 */
export async function facebookHandler(url: string): Promise<PlatformResult> {
  // --- PRIMARY NODE: Free Facebook Downloader (POST) ---
  try {
    const primaryHost = "free-facebook-downloader.p.rapidapi.com";
    const primaryUrl = `https://${primaryHost}/external-api/facebook-video-downloader?url=${encodeURIComponent(url)}`;
    
    
    const response = await fetchWithRotation(primaryUrl, {
      method: "POST",
      headers: { 
        "x-rapidapi-host": primaryHost,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key1: "value" }) // Dummy body as required by some POST endpoints
    }, "facebook");

    if (response.ok) {
      const data = (await response.json()) as FacebookFreeResponse;
      if (data.success && data.links) {
        const medias: Media[] = [];
        
        if (data.links["Download High Quality"]) {
          medias.push({
            id: Math.random().toString(36).substring(7),
            url: data.links["Download High Quality"],
            quality: "1080p (HD)",
            type: "video",
            extension: "mp4",
          });
        }
        
        if (data.links["Download Low Quality"]) {
          medias.push({
            id: Math.random().toString(36).substring(7),
            url: data.links["Download Low Quality"],
            quality: "720p (SD)",
            type: "video",
            extension: "mp4",
          });
        }

        if (medias.length > 0) {
          const formattedData: PlatformResult = {
            thumbnail: "", // New API doesn't provide thumbnail directly in this call
            title: data.title || "Facebook Video",
            medias: medias,
            caption: data.title || "",
            likes: 0,
            commentCount: 0,
          };

          statsManager.trackDownload(url, formattedData.title, "facebook");
          cacheManager.set(url, formattedData);
          return formattedData;
        }
      }
      throw new Error("Primary Facebook API reported failure or missing links");
    }
  } catch (e) {
    const error = e as Error;
    console.warn("Primary Facebook API (Free) failed, attempting Fallback...", error.message);
  }

  // --- FALLBACK NODE: Facebook Video Downloader V9 (GET) ---
  try {
    const fallbackHost = "facebook-video-downloader9.p.rapidapi.com";
    const fallbackUrl = `https://${fallbackHost}/api/v1/videos/download?url=${encodeURIComponent(url)}`;


    const response = await fetchWithRotation(fallbackUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": fallbackHost },
    }, "facebook");

    if (response.ok) {
      const data = (await response.json()) as FacebookV1Response;
      if (data.status === "success" && data.data?.video) {
        const videoData = data.data.video;
        const downloadData = data.data.download;
        const medias: Media[] = [];

        if (downloadData) {
          if (downloadData.hd?.url) {
            medias.push({
              id: Math.random().toString(36).substring(7),
              url: downloadData.hd.url,
              quality: downloadData.hd.quality || "HD",
              type: "video",
              extension: "mp4",
            });
          }
          if (downloadData.sd?.url) {
            medias.push({
              id: Math.random().toString(36).substring(7),
              url: downloadData.sd.url,
              quality: downloadData.sd.quality || "SD",
              type: "video",
              extension: "mp4",
            });
          }
        }

        if (medias.length > 0) {
          const formattedData: PlatformResult = {
            thumbnail: videoData.thumbnail_url || "",
            title: videoData.title || "Facebook Video",
            medias: medias,
            caption: videoData.description || videoData.title || "",
            likes: 0,
            commentCount: 0,
          };

          statsManager.trackDownload(url, videoData.title || "Facebook Video", "facebook");
          cacheManager.set(url, formattedData);
          return formattedData;
        }
      }
      throw new Error("Fallback Facebook API reported failure");
    }
  } catch (e) {
    const error = e as Error;
    console.warn("Fallback Facebook API (V9) failed, trying All-in-One...", error.message);
  }

  // --- LAST RESORT: Social Download All-in-One ---
  // Same API already active for Instagram backup — no extra subscription needed
  try {
    const allInOneHost = "social-download-all-in-one.p.rapidapi.com";


    const response = await fetchWithRotation(`https://${allInOneHost}/v1/social/autolink`, {
      method: "POST",
      headers: {
        "x-rapidapi-host": allInOneHost,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }, "instagram_v2"); // reuse instagram_v2 key pool — same API host

    if (response.ok) {
      const data = (await response.json()) as FacebookAllInOneResponse;

      if (!data.error && data.medias && data.medias.length > 0) {
        const formattedData: PlatformResult = {
          thumbnail: data.thumbnail || "",
          title: data.title || "Facebook Video",
          medias: data.medias.map((m) => ({
            id: Math.random().toString(36).substring(7),
            url: m.url,
            quality: m.quality || "HD",
            type: "video" as const,
            extension: m.extension || "mp4",
          })),
          caption: data.title || "",
          likes: 0,
          commentCount: 0,
        };
        statsManager.trackDownload(url, formattedData.title, "facebook");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    const error = e as Error;
    console.error("All Facebook clusters failed:", error.message);
    throw new Error("Could not fetch Facebook video from any available API.");
  }

  throw new Error("Facebook content not found.");
}
