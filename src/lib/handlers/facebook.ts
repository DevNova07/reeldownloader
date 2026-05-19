import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Facebook Download Handler using RapidAPI
 * Host: free-facebook-downloader.p.rapidapi.com
 */
export async function facebookHandler(url: string): Promise<PlatformResult> {
  // Resolve short links (fb.watch, etc.)
  let resolvedUrl = await resolveUrl(url);

  // Clean URL: Remove unnecessary tracking params but keep the ID structure
  try {
    const urlObj = new URL(resolvedUrl);
    // Keep only essential path and video ID
    const v = urlObj.searchParams.get("v");
    if (v) {
      resolvedUrl = `${urlObj.origin}${urlObj.pathname}?v=${v}`;
    } else {
      resolvedUrl = `${urlObj.origin}${urlObj.pathname}`;
    }
  } catch (e) {
    // Keep original if parsing fails
  }

  // Primary API: free-facebook-downloader.p.rapidapi.com
  const apiUrl = `https://free-facebook-downloader.p.rapidapi.com/external-api/facebook-video-downloader?url=${encodeURIComponent(resolvedUrl)}`;

  const response = await fetchWithRotation(apiUrl, {
    method: "POST", // The API uses POST with URL params
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "free-facebook-downloader.p.rapidapi.com",
    },
    body: JSON.stringify({ url: resolvedUrl }), 
  }, "facebook");

  const result = await response.json();
  console.log("[DEBUG] Facebook API Response:", JSON.stringify(result).substring(0, 500));

  if (!result.success || !result.links) {
    throw new Error(result.message || "Failed to fetch Facebook video. Please ensure the post is public.");
  }

  const medias: Media[] = [];
  
  // High Quality Mapping
  if (result.links["Download High Quality"]) {
    medias.push({
      id: `${result.id || Date.now()}-hd`,
      url: result.links["Download High Quality"],
      quality: "High Quality (HD)",
      type: "video",
      extension: "mp4"
    });
  }

  // Low Quality Mapping
  if (result.links["Download Low Quality"]) {
    medias.push({
      id: `${result.id || Date.now()}-sd`,
      url: result.links["Download Low Quality"],
      quality: "Normal Quality (SD)",
      type: "video",
      extension: "mp4"
    });
  }

  // Optimized: Removed the slow comments fetching to provide near-instant response times.
  // The frontend automatically falls back to beautiful MOCK_COMMENTS if real comments are not provided.
  return {
    title: result.title || "Facebook Video",
    thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png",
    medias,
    caption: `Facebook Video - ${result.id || 'Post'}`,
    likes: 0,
    commentCount: 0,
    comments: undefined
  };
}
