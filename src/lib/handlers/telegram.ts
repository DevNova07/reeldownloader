import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Telegram Download Handler using RapidAPI
 * Host: telegram-public-channel-scraper.p.rapidapi.com
 */
export async function telegramHandler(url: string): Promise<PlatformResult> {
  // If it's already a direct media URL (from gallery selection)
  if (url.match(/\.(jpg|jpeg|png|webp|gif)/i) || (url.includes("rapidapi.com") && url.includes("image"))) {
    return {
      title: "Telegram Image",
      thumbnail: url,
      medias: [{
        id: `tg-direct-${Date.now()}`,
        url: url,
        quality: "Original",
        type: "image",
        extension: "jpg"
      }],
      caption: "Telegram Media Preview",
      likes: 0,
      commentCount: 0,
    };
  }

  let channelName = "";

  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "t.me" || urlObj.hostname === "telegram.me") {
      const parts = urlObj.pathname.split('/').filter(Boolean);
      if (parts[0] === 's') {
        channelName = parts[1];
      } else {
        channelName = parts[0];
      }
    } else {
        // Just try to use the last part if it's not a full URL
        channelName = url.split('/').pop()?.replace('@', '') || "";
    }
  } catch (e) {
    channelName = url.replace('@', '').split('/').pop() || "";
  }

  // Basic cleanup
  channelName = channelName.split('?')[0].split('#')[0];

  if (!channelName) {
    throw new Error("Invalid Telegram URL or channel name.");
  }

  const apiUrl = `https://telegram-public-channel-scraper.p.rapidapi.com/telegramimage.php?channel=${encodeURIComponent(channelName)}`;

  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "telegram-public-channel-scraper.p.rapidapi.com",
    },
  }, "telegram");

  const result = await response.json();
  console.log("[DEBUG] Telegram API Response:", JSON.stringify(result, null, 2));

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch Telegram channel images.");
  }

  if (!result.results || result.results.length === 0) {
    throw new Error("No images found in this Telegram channel or the channel is private.");
  }

  const items = result.results.map((item: any, index: number) => ({
    id: `tg-${channelName}-${index}`,
    title: item.caption || `Image ${index + 1}`,
    thumbnail: item.image_url,
    url: item.image_url, // For direct preview/download
  }));

  // If only one item, return as single, otherwise return as list
  if (items.length === 1) {
    return {
      title: `Telegram Image from @${channelName}`,
      thumbnail: items[0].thumbnail,
      medias: [{
        id: items[0].id,
        url: items[0].url,
        quality: "Original",
        type: "image",
        extension: "jpg"
      }],
      caption: items[0].title,
      likes: 0,
      commentCount: 0,
    };
  }

  return {
    title: `Telegram Channel: ${result.channel || channelName}`,
    thumbnail: items[0]?.thumbnail || "https://telegram.org/img/t_logo.png",
    medias: [], 
    caption: `Latest ${items.length} images from Telegram channel @${channelName}`,
    likes: 0,
    commentCount: 0,
    type: "list",
    items: items
  };
}
