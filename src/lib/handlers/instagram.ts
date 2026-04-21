import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";
import { fetchWithRotation } from "@/lib/api-utils";

/**
 * Optimized Instagram Downloader Handler.
 * Uses multiple APIs for maximum reliability and speed.
 */
export async function instagramHandler(url: string): Promise<PlatformResult> {
  const cached = cacheManager.get(url);
  if (cached) return cached;

  // --- PREMIUM API (Highest Success Rate) ---
  try {
    const premiumHost = "instagram-downloader-v2.p.rapidapi.com";
    const premiumUrl = `https://${premiumHost}/media?url=${encodeURIComponent(url)}`;
    const response = await fetchWithRotation(premiumUrl, {
      headers: { "x-rapidapi-host": premiumHost }
    }, "instagram");

    if (response.ok) {
      const data = await response.json();
      if (data && data.data && (data.data.video_url || data.data.image_url)) {
        const formattedData: PlatformResult = {
          thumbnail: data.data.thumbnail_url || "",
          title: data.data.caption?.substring(0, 50) || "Instagram Content",
          medias: [{
            id: `ig-premium-${Date.now()}`,
            url: data.data.video_url || data.data.image_url,
            quality: "HD",
            type: data.data.video_url ? "video" : "image",
            extension: data.data.video_url ? "mp4" : "jpg"
          }],
          caption: data.data.caption || "Downloaded via InstaSnap",
          author: data.data.owner?.username || "Instagram User",
          authorId: `@${data.data.owner?.username || "instagram"}`,
          likes: data.data.like_count || 0,
          commentCount: data.data.comment_count || 0
        };
        statsManager.trackDownload(url, formattedData.title, "instagram");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (error) {
    console.warn("Premium Instagram API failed, trying others...", error);
  }

  // --- PRIMARY API (Fast Reels & Videos) ---
  try {
    const primaryUrl = `https://insta-reels-downloader-the-fastest-hd-reels-fetcher-api.p.rapidapi.com/unified/index?url=${encodeURIComponent(url)}`;
    const response = await fetchWithRotation(primaryUrl, {
      headers: {
        "x-rapidapi-host": "insta-reels-downloader-the-fastest-hd-reels-fetcher-api.p.rapidapi.com"
      }
    }, "instagram");

    const data = await response.json();

    if (data.success && data.data?.content?.items) {
      const formattedData: PlatformResult = {
        thumbnail: data.data.content.cover_thumbnail || data.data.content.items[0].thumbnail_url,
        title: data.data.title || "Instagram Content",
        medias: data.data.content.items.map((item: any, index: number) => ({
          id: `ig-primary-${index}-${Date.now()}`,
          url: item.media_url,
          quality: "HD",
          type: item.type === "video" ? "video" : "image",
          extension: item.type === "video" ? "mp4" : "jpg"
        })),
        caption: data.data.title || "Downloaded via InstaSnap",
        author: "Instagram User",
        authorId: "@instagram",
        likes: 0,
        commentCount: 0
      };

      statsManager.trackDownload(url, formattedData.title, "instagram");
      cacheManager.set(url, formattedData);
      return formattedData;
    }
  } catch (error) {
    console.warn("Fast Reels API failed, trying All-in-One fallback...", error);
  }

  // --- SECONDARY API (All-in-One Downloader - Backup) ---
  try {
    const allInOneHost = "all-in-one-video-downloader-api-tiktok-ig-fb.p.rapidapi.com";
    const allInOneUrl = `https://${allInOneHost}/all-downloader.php?url=${encodeURIComponent(url)}`;
    
    const response = await fetchWithRotation(allInOneUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-host": allInOneHost
      }
    }, "instagram");

    if (response.ok) {
      const data = await response.json();
      
      if (data && data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
        const medias: Media[] = data.videos.map((item: any, index: number) => ({
          id: `ig-allinone-${index}-${Date.now()}`,
          url: item.download_url,
          quality: item.resolution === "no_watermark" ? "HD" : item.resolution,
          type: item.resolution === "audio" ? "audio" : "video",
          extension: item.extension || "mp4"
        }));

        const formattedData: PlatformResult = {
          thumbnail: data.thumbnail?.startsWith('data:') ? data.thumbnail : (data.thumbnail || ""),
          title: data.title || "Instagram Content",
          medias: medias,
          caption: data.title || "Downloaded via InstaSnap",
          author: "Instagram User",
          authorId: "@instagram",
          likes: 0,
          commentCount: 0
        };

        statsManager.trackDownload(url, formattedData.title, "instagram");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (error) {
    console.warn("All-in-One Instagram API backup failed, trying next fallback...", error);
  }

  // --- FALLBACK API ---
  try {
    const fallbackUrl = `https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert?url=${encodeURIComponent(url)}`;
    const response = await fetchWithRotation(fallbackUrl, {
      headers: {
        "x-rapidapi-host": "instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com"
      }
    }, "instagram");

    const data = await response.json();

    if (data && data.media && Array.isArray(data.media) && data.media.length > 0) {
      const formattedData: PlatformResult = {
        thumbnail: data.media[0].thumbnail || data.media[0].url,
        title: "Instagram Post",
        medias: data.media.map((item: any, index: number) => ({
          id: `ig-fallback-${index}-${Date.now()}`,
          url: item.url,
          quality: item.quality || "HD",
          type: item.type === "video" ? "video" : "image",
          extension: item.type === "video" ? "mp4" : "jpg"
        })),
        caption: "Downloaded via InstaSnap",
        author: "Instagram User",
        authorId: "@instagram",
        likes: 0,
        commentCount: 0
      };

      statsManager.trackDownload(url, formattedData.title, "instagram");
      cacheManager.set(url, formattedData);
      return formattedData;
    }
  } catch (error) {
    console.warn("Instagram Fallback Handler Error, trying Elite...", error);
  }

  // --- ELITE API (High Reliability Backup - Now Last) ---
  try {
    const eliteHost = "instagram-media-downloader.p.rapidapi.com";
    const eliteUrl = `https://${eliteHost}/rapid/video?url=${encodeURIComponent(url)}`;
    const response = await fetchWithRotation(eliteUrl, {
      headers: { "x-rapidapi-host": eliteHost }
    }, "instagram");

    if (response.ok) {
      const data = await response.json();
      if (data.video || data.image) {
        const formattedData: PlatformResult = {
          thumbnail: data.video_thumbnail || data.thumbnail || "",
          title: data.title || "Instagram Post",
          medias: [{
            id: `ig-elite-${Date.now()}`,
            url: data.video || data.image,
            quality: "HD",
            type: data.video ? "video" : "image",
            extension: data.video ? "mp4" : "jpg"
          }],
          caption: data.title || "Downloaded via InstaSnap",
          author: "Instagram User",
          authorId: "@instagram",
          likes: 0,
          commentCount: 0
        };
        statsManager.trackDownload(url, formattedData.title, "instagram");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (error) {
    console.error("Instagram Elite Handler Error:", error);
    throw new Error("Failed to fetch Instagram content. Please check the URL and try again.");
  }

  throw new Error("No media found for this Instagram URL.");
}
