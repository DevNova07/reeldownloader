import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

/**
 * Optimized YouTube Downloader Handler.
 * Primary: YouTube Media Downloader (High Performance & Direct Links)
 */
export async function youtubeHandler(url: string): Promise<PlatformResult> {
  const cached = cacheManager.get(url);
  if (cached) return cached;

  const videoId = extractYouTubeVideoId(url);
  if (!videoId) {
    throw new Error("Invalid YouTube URL. Please provide a valid video or shorts link.");
  }

  try {
    const primaryHost = "youtube-media-downloader.p.rapidapi.com";
    const primaryUrl = `https://${primaryHost}/v2/video/details?videoId=${videoId}`;
    
    const response = await fetchWithRotation(primaryUrl, {
      headers: {
        "x-rapidapi-host": primaryHost
      }
    }, "youtube");

    if (response.ok) {
      const data = await response.json();
      if (data && data.errorId === "Success") {
        const medias: Media[] = [];

        // Extract Video formats
        if (data.videos?.items) {
          data.videos.items.forEach((item: any, index: number) => {
            medias.push({
              id: `yt-video-${index}-${Date.now()}`,
              url: item.url,
              quality: `${item.quality} ${item.hasAudio ? "" : "(No Audio)"}`,
              type: "video",
              extension: item.extension || "mp4",
              size: item.sizeText
            });
          });
        }

        // Extract Audio formats
        if (data.audios?.items) {
          data.audios.items.forEach((item: any, index: number) => {
            medias.push({
              id: `yt-audio-${index}-${Date.now()}`,
              url: item.url,
              quality: "Audio Only",
              type: "audio",
              extension: item.extension || "mp3",
              size: item.sizeText
            });
          });
        }

        if (medias.length > 0) {
          const formattedData: PlatformResult = {
            thumbnail: data.thumbnails?.[data.thumbnails.length - 1]?.url || data.thumbnails?.[0]?.url,
            title: data.title || "YouTube Video",
            medias: medias,
            caption: data.description?.substring(0, 200) + "...",
            author: data.channel?.name || "YouTube Creator",
            authorId: data.channel?.handle || "",
            likes: 0,
            commentCount: 0
          };

          statsManager.trackDownload(url, formattedData.title, "youtube");
          cacheManager.set(url, formattedData);
          return formattedData;
        }
      }
    }
  } catch (error) {
    console.warn("Primary YouTube API failed, trying fallback...", error);
  }

  // --- FALLBACK API (Social Media Video Downloader) ---
  try {
    const fallbackHost = "social-media-video-downloader.p.rapidapi.com";
    const fallbackUrl = `https://${fallbackHost}/smvd/get/all?url=${encodeURIComponent(url)}`;
    
    const response = await fetchWithRotation(fallbackUrl, {
      headers: {
        "x-rapidapi-host": fallbackHost
      }
    }, "youtube");

    if (response.ok) {
      const data = await response.json();
      if (data && data.links && Array.isArray(data.links) && data.links.length > 0) {
        const medias: Media[] = data.links.map((link: any, index: number) => ({
          id: `yt-fallback-${index}-${Date.now()}`,
          url: link.link,
          quality: link.quality || "HD",
          type: "video",
          extension: "mp4"
        }));

        const formattedData: PlatformResult = {
          thumbnail: data.picture || "",
          title: data.title || "YouTube Video",
          medias: medias,
          caption: "Downloaded via InstaSnap",
          author: "YouTube Creator",
          authorId: "",
          likes: 0,
          commentCount: 0
        };

        statsManager.trackDownload(url, formattedData.title, "youtube");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (error) {
    console.error("YouTube Fallback Error:", error);
  }

  throw new Error("Could not download YouTube video. Please try again later.");
}




/**
 * Helper to extract Video ID from various YouTube URL formats.
 */
function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:v=|\/v\/|embed\/|shorts\/|youtu\.be\/|\/v=|^)([^#&?]*)/,
    /youtube\.com\/watch\?v=([^#&?]*)/,
    /youtube\.com\/shorts\/([^#&?]*)/,
    /youtu\.be\/([^#&?]*)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }

  // Handle mobile share links and others
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") return urlObj.pathname.slice(1);
    const v = urlObj.searchParams.get("v");
    if (v) return v;
    
    // Check for /shorts/id
    if (urlObj.pathname.startsWith('/shorts/')) {
      return urlObj.pathname.split('/')[2];
    }
  } catch {
    // fallback to regex
  }
  
  return null;
}



