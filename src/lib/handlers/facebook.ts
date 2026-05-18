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

  let comments: Array<{ username: string; text: string; mention?: string }> = [];

  try {
    if (result.id) {
       console.log(`[API] Fetching Facebook comments for post ID: ${result.id}`);
       const commentsUrl = `https://facebook-data-api2.p.rapidapi.com/graph/${result.id}/comments?limit=5&fields=created_time,from,message,can_remove,like_count`;
       
       const controller = new AbortController();
       const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second strict timeout

       const commentsResponse = await fetchWithRotation(commentsUrl, {
         method: 'GET',
         headers: {
           'x-rapidapi-host': 'facebook-data-api2.p.rapidapi.com'
         },
         signal: controller.signal
       }, "facebook");
       
       clearTimeout(timeoutId);

       const commentsJson = await commentsResponse.json();
       if (commentsJson.success && commentsJson.data?.data) {
          comments = commentsJson.data.data
            .filter((c: any) => c.message && c.from?.name)
            .map((c: any) => ({
              username: `@${c.from.name.replace(/\s+/g, '').toLowerCase()}`,
              text: c.message
            }));
       }
    }
  } catch (e) {
    console.error("[API] Failed to fetch Facebook comments (Timeout or Error):", e);
    // Ignore error, return video anyway
  }

  return {
    title: result.title || "Facebook Video",
    thumbnail: "https://www.facebook.com/images/fb_icon_325x325.png",
    medias,
    caption: `Facebook Video - ${result.id}`,
    likes: 0,
    commentCount: comments.length > 0 ? comments.length * 100 : 0, // Fake a realistic number or use length
    comments: comments.length > 0 ? comments : undefined
  };
}
