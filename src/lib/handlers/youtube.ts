import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Faster Primary YouTube API: snap-video3.p.rapidapi.com
 */
async function fastYoutubeApi(url: string): Promise<PlatformResult> {
  const resolvedUrl = await resolveUrl(url);
  const apiUrl = "https://snap-video3.p.rapidapi.com/download";
  const body = new URLSearchParams({ url: resolvedUrl }).toString();

  const response = await fetchWithRotation(apiUrl, {
    method: "POST",
    headers: {
      "x-rapidapi-host": "snap-video3.p.rapidapi.com",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  }, "youtube");

  const result = await response.json();
  if (!result || !result.medias || result.medias.length === 0) {
    throw new Error("Fast YouTube API returned no media.");
  }

  const medias: Media[] = result.medias.map((media: any, index: number) => {
    const qualityStr = (media.quality || "").toLowerCase();
    // Strict audio detection
    const isActuallyAudio = 
      qualityStr.includes("audio") || 
      qualityStr.includes("kbps") || 
      media.type === "audio" ||
      media.extension === "mp3" ||
      media.extension === "m4a";

    const isVideo = !isActuallyAudio && (media.videoAvailable !== false || media.type === "video");

    return {
      id: `fast-yt-${index}`,
      url: media.url,
      quality: media.quality || (isVideo ? "HD" : "128kbps"),
      type: isVideo ? "video" : "audio",
      extension: media.extension || (isVideo ? "mp4" : "mp3")
    };
  });

  // Sort: MP4 Videos with Audio (Combined) -> MP4 Video -> Others
  medias.sort((a, b) => {
    if (a.type === "video" && b.type === "audio") return -1;
    if (a.type === "audio" && b.type === "video") return 1;
    
    // Prioritize mp4 for better browser support
    if (a.extension === "mp4" && b.extension !== "mp4") return -1;
    if (a.extension !== "mp4" && b.extension === "mp4") return 1;

    return 0;
  });

  return {
    title: result.title || "YouTube Video",
    caption: result.title || "",
    thumbnail: result.thumbnail || "https://www.youtube.com/favicon.ico",
    medias,
    likes: 0,
    commentCount: 0,
  };
}

/**
 * Comprehensive Secondary YouTube API (Supports Channels/Posts): youtube-media-downloader.p.rapidapi.com
 */
async function comprehensiveYoutubeApi(url: string): Promise<PlatformResult> {
  const lowercaseUrl = url.toLowerCase();
  const isChannel = /\/(channel|user|c)\/|youtube\.com\/@/.test(lowercaseUrl);

  if (isChannel) {
    let channelId = "";
    if (url.includes("/@")) {
      channelId = "@" + url.split("/@")[1].split("/")[0].split("?")[0];
    } else if (url.includes("/channel/")) {
      channelId = url.split("/channel/")[1].split("/")[0].split("?")[0];
    } else if (url.includes("/user/")) {
      channelId = url.split("/user/")[1].split("/")[0].split("?")[0];
    } else if (url.includes("/c/")) {
      channelId = url.split("/c/")[1].split("/")[0].split("?")[0];
    }

    if (!channelId) throw new Error("Could not extract channel ID.");

    const apiUrl = `https://youtube-media-downloader.p.rapidapi.com/v2/channel/posts?channelId=${encodeURIComponent(channelId)}`;
    const response = await fetchWithRotation(apiUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com" }
    }, "youtube");

    const result = await response.json();
    if (!result.items || result.items.length === 0) throw new Error("No community posts found.");

    const items = result.items.map((item: any) => {
      let thumbnail = "https://www.youtube.com/favicon.ico";
      if (item.images && item.images[0] && item.images[0][0]) {
        const imgSet = item.images[0];
        thumbnail = imgSet[imgSet.length - 1]?.url || imgSet[0]?.url;
      }
      return {
        id: item.id,
        title: item.contentText || "YouTube Post",
        thumbnail: thumbnail,
        url: `https://www.youtube.com/post/${item.id}`,
      };
    });

    return {
      title: `YouTube Channel: ${channelId}`,
      thumbnail: items[0]?.thumbnail || "https://www.youtube.com/favicon.ico",
      medias: [],
      caption: `Latest community posts from ${channelId}`,
      likes: 0,
      commentCount: 0,
      type: "list",
      items
    };
  }

  const apiUrl = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?url=${encodeURIComponent(url)}`;
  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: { "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com" }
  }, "youtube");

  const result = await response.json();
  if (!result || !result.formats) throw new Error("Comprehensive API failed.");

  const medias: Media[] = result.formats.map((format: any, index: number) => {
    const hasVideo = format.hasVideo !== false && !format.mimeType?.includes('audio-only');
    const hasAudio = format.hasAudio !== false;
    
    return {
      id: `yt-comp-${index}`,
      url: format.url,
      quality: format.qualityLabel || format.quality || "Standard",
      type: hasVideo ? "video" : "audio",
      extension: format.mimeType?.includes("mp4") ? "mp4" : "webm",
      hasAudio,
      hasVideo
    };
  });

  // Sort: Combined (Video + Audio) MP4 -> Video MP4 -> Others
  medias.sort((a: any, b: any) => {
    const aCombined = a.hasVideo && a.hasAudio;
    const bCombined = b.hasVideo && b.hasAudio;

    if (aCombined && !bCombined) return -1;
    if (!aCombined && bCombined) return 1;

    if (a.hasVideo && !b.hasVideo) return -1;
    if (!a.hasVideo && b.hasVideo) return 1;

    if (a.extension === "mp4" && b.extension !== "mp4") return -1;
    if (a.extension !== "mp4" && b.extension === "mp4") return 1;

    return 0;
  });

  return {
    title: result.title || "YouTube Video",
    caption: result.description || "",
    thumbnail: result.thumbnails?.[result.thumbnails.length - 1]?.url || "https://www.youtube.com/favicon.ico",
    medias,
    likes: result.viewCount || 0,
    commentCount: 0,
  };
}

export async function youtubeHandler(url: string): Promise<PlatformResult> {
  // If it's likely a channel/post, go direct to comprehensive API
  const isChannelOrPost = url.includes("/@") || url.includes("/channel/") || url.includes("/post/") || url.includes("/c/") || url.includes("/user/");
  
  if (isChannelOrPost) {
    return await comprehensiveYoutubeApi(url);
  }

  // Standard video: Try Fast API first
  try {
    console.log(`[API] Attempting Fast YouTube API for ${url}...`);
    return await fastYoutubeApi(url);
  } catch (err: any) {
    console.warn(`[API] Fast API failed: ${err.message}. Switching to Comprehensive API...`);
    return await comprehensiveYoutubeApi(url);
  }
}
