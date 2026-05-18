import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Extracts the 11-character YouTube video ID from various URL formats.
 */
function extractYoutubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Helper to parse ISO 8601 duration (e.g. PT3M45S) to human readable format (3:45)
 */
function parseISO8601Duration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * New Primary Metadata API: youtube-api52.p.rapidapi.com
 * High speed and reliable metadata from v3 proxy.
 */
async function metadataApi52(videoId: string): Promise<PlatformResult> {
  const apiUrl = `https://youtube-api52.p.rapidapi.com/videos?id=${videoId}&part=snippet,contentDetails,statistics`;
  
  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "youtube-api52.p.rapidapi.com"
    }
  }, "youtube");

  const result = await response.json();
  if (!result || !result.items || result.items.length === 0) {
    throw new Error("API52 returned no items for this video ID.");
  }

  const video = result.items[0];
  const snippet = video.snippet;
  const stats = video.statistics;
  
  return {
    title: snippet.title || "YouTube Video",
    caption: snippet.description || snippet.title || "",
    thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    medias: [], // Formats will be filled by fallback
    likes: parseInt(stats?.likeCount || "0"),
    commentCount: parseInt(stats?.commentCount || "0"),
    duration: video.contentDetails?.duration ? parseISO8601Duration(video.contentDetails.duration) : "0:00",
    author: snippet.channelTitle
  };
}

/**
 * Search API: youtube-api52.p.rapidapi.com
 * Supports searching for videos with high speed.
 */
async function searchApi52(query: string): Promise<any> {
  const apiUrl = `https://youtube-api52.p.rapidapi.com/search?q=${encodeURIComponent(query)}&type=video&maxResults=10&part=snippet`;
  
  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "youtube-api52.p.rapidapi.com"
    }
  }, "youtube");

  return await response.json();
}

/**
 * High-Speed Metadata API: simple-youtube-search.p.rapidapi.com
 * Used for instant metadata retrieval (Title, Thumbnails, Channel)
 */
async function searchMetadataYoutubeApi(urlOrId: string): Promise<PlatformResult> {
  const videoId = extractYoutubeId(urlOrId) || urlOrId;
  
  const apiUrl = `https://simple-youtube-search.p.rapidapi.com/search?query=${encodeURIComponent(videoId)}&type=video&safesearch=false`;
  
  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "simple-youtube-search.p.rapidapi.com"
    }
  }, "youtube");

  const result = await response.json();
  if (!result || !result.results || result.results.length === 0) {
    throw new Error("Search API returned no results.");
  }

  // Find the exact match or take the first result
  const video = result.results.find((v: any) => v.id === videoId) || result.results[0];

  return {
    title: video.title || "YouTube Video",
    caption: video.description || video.title || "",
    thumbnail: video.thumbnail?.url || `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    medias: [], // Formats will be filled by fallback
    likes: video.views || 0,
    commentCount: 0,
    duration: video.duration_formatted,
    author: video.channel?.name
  };
}

/**
 * Faster Primary YouTube API: snap-video3.p.rapidapi.com
 */
async function fastYoutubeApi(url: string): Promise<PlatformResult> {
  let finalUrl = url;
  const videoId = extractYoutubeId(url);
  
  if (videoId) {
    finalUrl = `https://www.youtube.com/watch?v=${videoId}`;
  } else {
    finalUrl = await resolveUrl(url);
  }

  const apiUrl = "https://snap-video3.p.rapidapi.com/download";
  const body = new URLSearchParams({ url: finalUrl }).toString();

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

  // Sort by resolution
  medias.sort((a, b) => {
    const qA = parseInt(a.quality) || 0;
    const qB = parseInt(b.quality) || 0;
    if (qA !== qB) return qB - qA;
    if (a.type === "video" && b.type === "audio") return -1;
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

  const videoId = extractYoutubeId(url);
  if (!videoId) throw new Error("Invalid YouTube URL.");

  const apiUrl = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${encodeURIComponent(videoId)}`;
  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: { "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com" }
  }, "youtube");

  const result = await response.json();
  if (!result || !result.formats) {
    if (result.reason) throw new Error(`Comprehensive API failed: ${result.reason}`);
    throw new Error("Comprehensive API failed to return media formats.");
  }

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

  medias.sort((a: any, b: any) => {
    const qA = parseInt(a.quality) || 0;
    const qB = parseInt(b.quality) || 0;
    if (qA !== qB) return qB - qA; // Sort by resolution (1080 > 720)
    
    const aCombined = a.hasVideo && a.hasAudio;
    const bCombined = b.hasVideo && b.hasAudio;
    if (aCombined && !bCombined) return -1;
    if (!aCombined && bCombined) return 1;
    if (a.hasVideo && !b.hasVideo) return -1;
    if (a.extension === "mp4" && b.extension !== "mp4") return -1;
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
  const isChannelOrPost = url.includes("/@") || url.includes("/channel/") || url.includes("/post/") || url.includes("/c/") || url.includes("/user/");
  
  if (isChannelOrPost) {
    return await comprehensiveYoutubeApi(url);
  }

  let videoId = extractYoutubeId(url);
  let finalUrl = url;
  
  if (videoId) {
    finalUrl = `https://www.youtube.com/watch?v=${videoId}`;
  } else {
    finalUrl = await resolveUrl(url);
    videoId = extractYoutubeId(finalUrl);
  }

  const vId = videoId || extractYoutubeId(url);
  
  let baseData: PlatformResult | null = null;
  if (vId) {
    try {
      console.log(`[API] Trying API52 for metadata: ${vId}`);
      baseData = await metadataApi52(vId);
    } catch (err: any) {
      console.warn(`[API] API52 failed: ${err.message}. Falling back to Search API.`);
      try {
        baseData = await searchMetadataYoutubeApi(vId);
      } catch (searchErr: any) {
        console.warn(`[API] Search API failed: ${searchErr.message}`);
      }
    }
  }

  // To fix "video quality kam hai", we try Comprehensive API (high quality) first, then Fast API
  try {
    console.log("[API] Attempting Comprehensive API for high quality formats...");
    const compData = await comprehensiveYoutubeApi(finalUrl);
    if (compData && compData.medias && compData.medias.length > 0) {
      if (baseData) {
        return {
          ...compData,
          title: baseData.title || compData.title,
          thumbnail: baseData.thumbnail || compData.thumbnail,
          likes: baseData.likes || compData.likes,
          caption: baseData.caption || compData.caption,
          author: baseData.author || (compData as any).author,
          duration: baseData.duration || compData.duration
        };
      }
      return compData;
    }
  } catch (err: any) {
    console.warn(`[API] Comprehensive API failed: ${err.message}. Falling back to Fast API.`);
  }

  try {
    const formatData = await fastYoutubeApi(finalUrl);
    if (formatData && formatData.medias && formatData.medias.length > 0) {
      if (baseData) {
        return {
          ...formatData,
          title: baseData.title || formatData.title,
          thumbnail: baseData.thumbnail || formatData.thumbnail,
          likes: baseData.likes || formatData.likes,
          caption: baseData.caption || formatData.caption,
          author: baseData.author || (formatData as any).author,
          duration: baseData.duration || (formatData as any).duration
        };
      }
      return formatData;
    }
    throw new Error("All format APIs returned no usable formats.");
  } catch (err: any) {
    throw err;
  }
}

