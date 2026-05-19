import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Parses raw Tweet object data from standard Twitter API schemas
 */
function parseTweetData(tweetData: any): PlatformResult {
  // Unwrap if nested in result/tweetResult/tweet
  if (tweetData.result) {
    tweetData = tweetData.result;
  }
  if (tweetData.tweet) {
    tweetData = tweetData.tweet;
  }

  const text = tweetData.text || tweetData.legacy?.full_text || "";
  const user = tweetData.user || tweetData.core?.user_results?.result?.legacy || {};
  const authorId = user.screen_name || user.screenName || "x_user";
  const authorName = user.name || authorId;
  const profilePic = user.profile_image_url_https || "https://abs.twimg.com/favicons/twitter.2.ico";

  const mediaDetails = tweetData.mediaDetails || tweetData.legacy?.extended_entities?.media || tweetData.legacy?.entities?.media || [];
  const medias: Media[] = [];

  mediaDetails.forEach((media: any, index: number) => {
    const mediaType = media.type || media.mediaType || "";
    
    if (mediaType === "video" || mediaType === "animated_gif") {
      const videoInfo = media.video_info || {};
      const variants = videoInfo.variants || [];
      
      // Filter for mp4 variants
      const mp4Variants = variants.filter((v: any) => 
        (v.content_type === "video/mp4" || v.contentType === "video/mp4" || v.type === "video/mp4") && 
        v.url
      );

      mp4Variants.forEach((variant: any, vIndex: number) => {
        const variantUrl = variant.url || variant.src;
        let quality = "SD Video";
        const bitrate = variant.bitrate || variant.bitRate || 0;

        if (bitrate > 2000000) quality = "1080p HD Video";
        else if (bitrate > 1000000) quality = "720p HD Video";
        else if (bitrate > 500000) quality = "480p SD Video";
        else quality = "360p SD Video";

        // Try to parse dimensions from URL if possible
        const dimensionsMatch = variantUrl.match(/\/(\d+x\d+)\//);
        if (dimensionsMatch && dimensionsMatch[1]) {
          const dims = dimensionsMatch[1].split('x');
          const height = Math.min(Number(dims[0]), Number(dims[1]));
          quality = `${height}p Video`;
          if (height >= 720) quality += " HD";
        }

        medias.push({
          id: `x-video-${index}-${vIndex}`,
          url: variantUrl,
          quality: quality,
          type: "video",
          extension: "mp4"
        });
      });
    } else if (mediaType === "photo" || mediaType === "image") {
      const imgUrl = media.media_url_https || media.mediaUrlHttps || media.url;
      if (imgUrl) {
        medias.push({
          id: `x-photo-${index}`,
          url: imgUrl,
          quality: "High Quality Photo",
          type: "image",
          extension: "jpg"
        });
      }
    }
  });

  if (medias.length === 0) {
    throw new Error("No download link found. Please make sure the tweet has a video, GIF, or image.");
  }

  // Sort medias: HD videos first, then SD, then photos/gifs
  medias.sort((a, b) => {
    if (a.type === "video" && b.type === "image") return -1;
    if (a.type === "image" && b.type === "video") return 1;
    
    const qA = a.quality.toLowerCase();
    const qB = b.quality.toLowerCase();
    
    const score = (q: string) => {
      if (q.includes("1080")) return 100;
      if (q.includes("720") || q.includes("hd")) return 80;
      if (q.includes("480")) return 60;
      if (q.includes("360") || q.includes("sd")) return 40;
      return 10;
    };
    
    return score(qB) - score(qA);
  });

  const thumbnail = mediaDetails[0]?.media_url_https || mediaDetails[0]?.mediaUrlHttps || profilePic;

  return {
    title: text.length > 80 ? text.substring(0, 80) + "..." : text || "X Post",
    caption: text || "",
    thumbnail: thumbnail,
    medias,
    author: `@${authorId}`,
    authorId: authorId,
    likes: tweetData.favorite_count || tweetData.legacy?.favorite_count || 0,
    commentCount: tweetData.reply_count || tweetData.legacy?.reply_count || 0,
    shareCount: tweetData.retweet_count || tweetData.legacy?.retweet_count || 0,
  };
}

/**
 * Twitter/X Download Handler using dual-host RapidAPI configurations
 * Handles both twitter135 and twitter-x API schemas dynamically
 */
export async function twitterHandler(url: string): Promise<PlatformResult> {
  // Resolve short links (t.co, x.co, etc.)
  let resolvedUrl = await resolveUrl(url);

  // Clean URL: Remove query params for better API parsing
  if (resolvedUrl.includes("?")) {
    resolvedUrl = resolvedUrl.split("?")[0];
  }

  // Extract Tweet ID
  let tweetId = "";
  if (/^\d+$/.test(url.trim())) {
    tweetId = url.trim();
  } else {
    const tweetIdMatch = resolvedUrl.match(/(?:status|statuses)\/(\d+)/);
    if (!tweetIdMatch) {
      throw new Error("Invalid X/Twitter URL. Please provide a valid tweet link.");
    }
    tweetId = tweetIdMatch[1];
  }

  console.log(`[TwitterHandler] Extracted Tweet ID: ${tweetId}`);
  let lastError: any = null;

  // Option 1: Try twitter135.p.rapidapi.com API
  try {
    console.log("[TwitterHandler] Attempting twitter135.p.rapidapi.com...");
    const apiUrl = `https://twitter135.p.rapidapi.com/v2/Tweet/?id=${tweetId}`;
    const response = await fetchWithRotation(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "twitter135.p.rapidapi.com"
      }
    }, "twitter");

    const result = await response.json();
    console.log("[TwitterHandler] twitter135 API Raw Response keys:", Object.keys(result));

    let tweetData = result;
    if (result.data?.tweetResult?.result) {
      tweetData = result.data.tweetResult.result;
    } else if (result.data?.tweet) {
      tweetData = result.data.tweet;
    }

    if (tweetData) {
      return parseTweetData(tweetData);
    }
  } catch (err: any) {
    console.warn(`[TwitterHandler] twitter135 failed: ${err.message}`);
    lastError = err;
  }

  // Option 2: Try twitter-x.p.rapidapi.com API (fallback/alternate)
  try {
    console.log("[TwitterHandler] Attempting twitter-x.p.rapidapi.com...");
    const apiUrl = `https://twitter-x.p.rapidapi.com/tweet/details?tweet_id=${tweetId}`;
    const response = await fetchWithRotation(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "twitter-x.p.rapidapi.com"
      }
    }, "twitter");

    const result = await response.json();
    console.log("[TwitterHandler] twitter-x API Raw Response keys:", Object.keys(result));

    let instructions = result?.data?.threaded_conversation_with_injections_v2?.instructions || [];
    if (instructions.length === 0) {
      instructions = result?.data?.threaded_conversation_with_injections?.instructions || [];
    }

    let mainTweet = null;
    for (const inst of instructions) {
      if (inst.type === "TimelineAddEntries") {
        for (const entry of inst.entries || []) {
          const entryId = entry.entryId || "";
          if (entryId.includes(tweetId)) {
            mainTweet = entry.content?.itemContent?.tweet_results?.result;
            break;
          }
        }
      }
    }

    if (!mainTweet) {
      for (const inst of instructions) {
        if (inst.type === "TimelineAddEntries") {
          for (const entry of inst.entries || []) {
            const resultObj = entry.content?.itemContent?.tweet_results?.result;
            if (resultObj) {
              mainTweet = resultObj;
              break;
            }
          }
        }
      }
    }

    if (mainTweet) {
      return parseTweetData(mainTweet);
    }
  } catch (err: any) {
    console.error(`[TwitterHandler] twitter-x failed: ${err.message}`);
    lastError = err;
  }

  throw new Error(
    lastError?.message || 
    "Failed to fetch tweet details. Please verify the URL is public and correct."
  );
}
