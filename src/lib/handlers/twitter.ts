import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

interface TwitterAPIResponse {
  error?: boolean;
  thumbnail?: string;
  title?: string;
  medias?: Array<{
    url: string;
    type?: "video" | "image";
    quality?: string;
    extension?: string;
  }>;
  success?: boolean;
  data?: {
    thumbnail?: string;
    title?: string;
    description?: string;
    medias?: Array<{
      url: string;
      quality?: string;
    }>;
  };
}

/**
 * Twitter / X Downloader Handler.
 * modularized for speed and maintainability.
 */
export async function twitterHandler(url: string): Promise<PlatformResult> {
  // --- CLUSTER 1: All-in-One (Primary) ---
  try {
    const rapidApiHost = "social-download-all-in-one.p.rapidapi.com";
    const apiUrl = `https://${rapidApiHost}/v1/social/autolink`;

    console.log("Fetching from X / Twitter API (Primary):", apiUrl);

    const response = await fetchWithRotation(apiUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": rapidApiHost,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url }),
    }, "twitter");

    if (response.ok) {
      const data = await response.json();
      if (!data.error && data.medias && data.medias.length > 0) {
        const formattedMedias: Media[] = data.medias.map((m: { type?: string; url: string; quality?: string; extension?: string }) => {
          const isImage = m.type === "image" || m.url.includes(".webp") || m.url.includes(".webp") || m.url.includes(".webp") || m.url.includes("pbs.twimg.com/media/");
          return {
            id: Math.random().toString(36).substring(7),
            url: m.url,
            quality: m.quality || (isImage ? "HD Image" : "HD Video"),
            type: isImage ? "image" : "video",
            extension: m.extension || (isImage ? "jpg" : "mp4"),
          };
        });

        // Remove image if video is present (User preference)
        const videoOnly = formattedMedias.filter((m) => m.type === "video");
        const finalMedias = videoOnly.length > 0 ? videoOnly : formattedMedias;

        const formattedData: PlatformResult = {
          thumbnail: data.thumbnail || (formattedMedias.find((m) => m.type === "image")?.url || formattedMedias[0]?.url || ""),
          title: data.title || "X / Twitter Content",
          medias: finalMedias,
          caption: data.title || "",
          likes: 0,
          commentCount: 0,
        };

        statsManager.trackDownload(url, formattedData.title, "twitter");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    console.warn("Primary X API failed, attempting Backup node...", e);
  }

  // --- CLUSTER 2: Twitter Video Downloader (Fallback) ---
  try {
    const fallbackHost = "twitter-video-downloader-api.p.rapidapi.com";
    const fallbackUrl = `https://${fallbackHost}/api/v1/twitter/details?url=${encodeURIComponent(url)}`;
    
    console.log("Fetching from X / Twitter API (Fallback):", fallbackUrl);
    
    const response = await fetchWithRotation(fallbackUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": fallbackHost },
    }, "twitter");

    if (response.ok) {
      const data = (await response.json()) as TwitterAPIResponse;
      if (data.success && data.data && data.data.medias) {
        const tkMedias: Media[] = data.data.medias.map((m: { type?: string; url: string; quality?: string }) => {
           const isVideo = m.type === "video" || m.url.includes(".mp4");
           return {
            id: Math.random().toString(36).substring(7),
            url: m.url,
            quality: m.quality || (isVideo ? "HD Video" : "HD Image"),
            type: isVideo ? "video" : "image",
            extension: isVideo ? "mp4" : "jpg",
           };
        });

        const formattedData: PlatformResult = {
          thumbnail: data.data.thumbnail || "",
          title: data.data.title || "X / Twitter Video",
          medias: tkMedias,
          caption: data.data.description || "",
          likes: 0,
          commentCount: 0,
        };

        statsManager.trackDownload(url, formattedData.title, "twitter");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    console.error("All X / Twitter clusters failed:", e);
    throw new Error("Could not fetch X content from any cluster.");
  }

  throw new Error("No downloadable content found on X / Twitter.");
}
