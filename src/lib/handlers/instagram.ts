import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

/**
 * Optimized Instagram Downloader Handler.
 * Prioritizing "Unified v1" format as requested.
 */
interface InstagramUnifiedResponse {
  success: boolean;
  media_type?: string;
  shortcode?: string;
  data?: {
    title?: string;
    content?: {
      cover_thumbnail?: string;
      total_items?: number;
      items: Array<{
        media_url: string;
        type: "video" | "photo" | "image";
        thumbnail_url?: string;
      }>;
    };
    metadata?: {
      api_version: string;
      processed_at: string;
    };
  };
}

interface InstagramAllInOneResponse {
  error?: boolean;
  thumbnail?: string;
  title?: string;
  medias: Array<{
    url: string;
    type: "video" | "image" | "photo";
    quality?: string;
    extension?: string;
  }>;
}

interface Instagram120Response {
  result?: {
    edges?: Array<{
      node: {
        media: {
          pk: string;
          code: string;
          media_type: number;
          video_versions?: Array<{
            url: string;
            width: number;
            height: number;
          }>;
          image_versions2?: {
            candidates: Array<{
              url: string;
              width: number;
              height: number;
            }>;
          };
          caption?: {
            text: string;
          };
          like_count?: number;
          comment_count?: number;
        };
      };
    }>;
    node?: {
       video_versions?: Array<{ url: string; width: number; height: number }>;
       image_versions2?: { candidates: Array<{ url: string; width: number; height: number }> };
       pk: string;
       caption?: { text: string };
       like_count?: number;
       comment_count?: number;
    }
  };
}

export async function instagramHandler(url: string): Promise<PlatformResult> {
  // --- CLUSTER 1: Primary Instagram API (Unified HD / insta-reels-downloader) ---
  // This format produces the most consistent HD results for Reels/Posts.
  try {
    const primaryHost = "insta-reels-downloader-the-fastest-hd-reels-fetcher-api.p.rapidapi.com";
    const primaryUrl = `https://${primaryHost}/unified/index?url=${encodeURIComponent(url)}`;
    
    
    const response = await fetchWithRotation(primaryUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": primaryHost },
    }, "instagram");

    if (response.ok) {
      const rawData = (await response.json()) as InstagramUnifiedResponse;

      if (rawData.success && rawData.data && rawData.data.content && rawData.data.content.items) {
        const items = rawData.data.content.items;
        const formattedData: PlatformResult = {
          thumbnail: rawData.data.content.cover_thumbnail || items[0].thumbnail_url || "",
          title: rawData.data.title || "Instagram Content",
          medias: items.map((m) => ({
            id: Math.random().toString(36).substring(7),
            url: m.media_url,
            quality: m.type === "video" ? "HD Video" : "HD Image",
            type: m.type === "video" ? "video" : "image",
            extension: m.type === "video" ? "mp4" : "jpg",
            thumbnail: m.thumbnail_url
          })),
          caption: rawData.data.title || "Instagram Content",
          likes: 0,
          commentCount: 0,
        };

        statsManager.trackDownload(url, formattedData.title, "instagram");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    const error = e as Error;
    console.warn("Primary Unified API Cluster 1 failed, attempting Cluster 2 (Fallback)...", error.message);
  }

  // --- CLUSTER 2: Backup Premium Instagram API (instagram120) ---
  try {
    const premiumHost = "instagram120.p.rapidapi.com";
    const premiumUrl = `https://${premiumHost}/api/instagram/info`; 


    const response = await fetchWithRotation(premiumUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": premiumHost,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url }),
    }, "instagram_premium");

    if (response.ok) {
      const data = (await response.json()) as Instagram120Response;

      let mediaNode = null;
      if (data.result?.edges && data.result.edges.length > 0) {
        mediaNode = data.result.edges[0].node.media;
      } else if (data.result?.node) {
        mediaNode = data.result.node;
      }

      if (mediaNode) {
        interface MediaVersion { url: string; width: number; height: number }
        const videoUrl = (mediaNode.video_versions as MediaVersion[])?.sort((a, b) => b.width - a.width)[0]?.url;
        const thumbUrl = (mediaNode.image_versions2?.candidates as MediaVersion[])?.sort((a, b) => b.width - a.width)[0]?.url;

        const medias: Media[] = [];
        if (videoUrl) {
          medias.push({
            id: mediaNode.pk,
            url: videoUrl,
            quality: "HD Video",
            type: "video",
            extension: "mp4"
          });
        } else if (thumbUrl) {
           medias.push({
            id: mediaNode.pk,
            url: thumbUrl,
            quality: "HD Image",
            type: "image",
            extension: "jpg"
          });
        }

        if (medias.length > 0) {
          const formattedData: PlatformResult = {
            thumbnail: thumbUrl || "",
            title: mediaNode.caption?.text?.substring(0, 100) || "Instagram Content",
            medias: medias,
            caption: mediaNode.caption?.text || "",
            likes: mediaNode.like_count || 0,
            commentCount: mediaNode.comment_count || 0,
          };

          statsManager.trackDownload(url, formattedData.title, "instagram_premium");
          cacheManager.set(url, formattedData);
          return formattedData;
        }
      }
    }
  } catch (e) {
    const error = e as Error;
    console.warn("Backup Cluster 2 (instagram120) failed, attempting Cluster 3...", error.message);
  }

  // --- CLUSTER 3: Fallback Backup Instagram API (All-in-One) ---
  try {
    const backupHost = "social-download-all-in-one.p.rapidapi.com";
    const backupUrl = `https://${backupHost}/v1/social/autolink`;


    const response = await fetchWithRotation(backupUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": backupHost,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url }),
    }, "instagram_v2");

    if (response.ok) {
      const data = (await response.json()) as InstagramAllInOneResponse;
      if (!data.error && data.medias && data.medias.length > 0) {
        const formattedData: PlatformResult = {
          thumbnail: data.thumbnail || "",
          title: data.title || "Instagram Content",
          medias: data.medias.map((m) => ({
            id: Math.random().toString(36).substring(7),
            url: m.url,
            quality: m.quality || (m.type === "video" ? "HD Video" : "HD Image"),
            type: m.type === "image" ? "image" : "video",
            extension: m.extension || (m.type === "image" ? "jpg" : "mp4"),
          })),
          caption: data.title || "",
          likes: 0,
          commentCount: 0,
        };

        statsManager.trackDownload(url, formattedData.title, "instagram_v2");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    const error = e as Error;
    console.error("All Instagram clusters failed:", error.message);
  }

  throw new Error("Could not fetch Instagram content from any available API.");
}
