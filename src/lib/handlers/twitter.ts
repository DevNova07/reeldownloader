import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Twitter Download Handler using RapidAPI
 * Host: snap-video3.p.rapidapi.com
 */
export async function twitterHandler(url: string): Promise<PlatformResult> {
  // Resolve short links (t.co, etc.)
  let resolvedUrl = await resolveUrl(url);

  // Clean URL: Remove query params for better API parsing
  if (resolvedUrl.includes("?")) {
    resolvedUrl = resolvedUrl.split("?")[0];
  }

  const apiUrl = "https://snap-video3.p.rapidapi.com/download";
  const body = new URLSearchParams({ url: resolvedUrl }).toString();

  const response = await fetchWithRotation(apiUrl, {
    method: "POST",
    headers: {
      "x-rapidapi-host": "snap-video3.p.rapidapi.com",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  }, "twitter");

  const result = await response.json();
  console.log("[DEBUG] Twitter API Response:", JSON.stringify(result).substring(0, 500));

  if (!result || !result.medias || result.medias.length === 0) {
    throw new Error("Failed to fetch Twitter video. Please ensure the URL is correct and public.");
  }

  const medias: Media[] = result.medias.map((media: any, index: number) => {
    let qualityStr = media.quality || (media.videoAvailable ? "Video" : "Audio");
    if (qualityStr.toLowerCase() === '128kbps') {
      qualityStr = '128kbps Audio';
    } else {
      qualityStr = qualityStr.split(' ').map((w: string) => w.toUpperCase() === 'HD' ? 'HD' : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    let isActuallyAudio = qualityStr.toLowerCase().includes('audio') || qualityStr.toLowerCase().includes('kbps');
    let isVideo = media.videoAvailable !== false && !isActuallyAudio;

    return {
      id: `twitter-media-${index}`,
      url: media.url,
      quality: qualityStr,
      type: isVideo ? "video" : "audio",
      extension: media.extension || (isVideo ? "mp4" : "mp3")
    };
  });

  // Sort medias: Standard videos (720p/HD) first for best browser compatibility
  medias.sort((a, b) => {
    if (a.type === "video" && b.type === "audio") return -1;
    if (a.type === "audio" && b.type === "video") return 1;
    
    const qA = a.quality.toLowerCase();
    const qB = b.quality.toLowerCase();
    
    const score = (q: string) => {
      if (q.includes("720") || q.includes("hd")) return 10;
      if (q.includes("360") || q.includes("sd")) return 8;
      if (q.includes("1080") || q.includes("full hd")) return 5;
      if (q.includes("4k")) return 3;
      return 1;
    };
    
    return score(qB) - score(qA);
  });

  // Try to extract username from URL
  let authorId = "twitter";
  const usernameMatch = resolvedUrl.match(/twitter\.com\/([^\/]+)/) || resolvedUrl.match(/x\.com\/([^\/]+)/);
  if (usernameMatch && usernameMatch[1]) {
    authorId = usernameMatch[1];
  }

  return {
    title: result.title || "Twitter Video",
    caption: result.title || "",
    thumbnail: result.thumbnail || "https://abs.twimg.com/favicons/twitter.2.ico",
    medias,
    author: authorId,
    authorId: authorId,
    likes: 0,
    commentCount: 0,
    shareCount: 0,
  };
}
