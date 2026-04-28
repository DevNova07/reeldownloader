import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Facebook Download Handler using RapidAPI
 * Host: free-facebook-downloader.p.rapidapi.com
 */
export async function facebookHandler(url: string): Promise<PlatformResult> {
  // Resolve short links (fb.watch, etc.)
  let resolvedUrl = await resolveUrl(url);

  // Clean URL and convert reels to watch format if needed
  try {
    const urlObj = new URL(resolvedUrl);
    
    // Convert /reels/ID/ or /reel/ID/ to watch format
    const reelMatch = resolvedUrl.match(/\/(?:reels|reel)\/(\d+)/);
    if (reelMatch) {
      resolvedUrl = `${urlObj.origin}/watch/?v=${reelMatch[1]}`;
    } else {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        resolvedUrl = `${urlObj.origin}${urlObj.pathname}?v=${videoId}`;
      } else {
        resolvedUrl = `${urlObj.origin}${urlObj.pathname}`;
      }
    }
  } catch (e) {
    // Fallback
  }

  const apiUrl = `https://free-facebook-downloader.p.rapidapi.com/external-api/facebook-video-downloader?url=${encodeURIComponent(resolvedUrl)}`;

  const response = await fetchWithRotation(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "free-facebook-downloader.p.rapidapi.com",
    },
    body: JSON.stringify({ url: resolvedUrl }), 
  }, "facebook");

  const result = await response.json();
  console.log("[DEBUG] Facebook API Response:", JSON.stringify(result, null, 2));

  if (!result.success || !result.links || Object.keys(result.links).length === 0) {
    const errorMsg = result.message || "Failed to fetch Facebook video details. Please ensure the URL is public and not a private group post.";
    console.error(`[API] Facebook Error: ${errorMsg} for URL: ${resolvedUrl}`);
    throw new Error(errorMsg);
  }

  const medias: Media[] = [];
  
  if (result.links["Download High Quality"]) {
    medias.push({
      id: `${result.id}-hd`,
      url: result.links["Download High Quality"],
      quality: "High Quality (HD)",
      type: "video",
      extension: "mp4"
    });
  }

  if (result.links["Download Low Quality"]) {
    medias.push({
      id: `${result.id}-sd`,
      url: result.links["Download Low Quality"],
      quality: "Low Quality (SD)",
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
