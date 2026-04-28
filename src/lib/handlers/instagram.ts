import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

/**
 * Instagram Download Handler using RapidAPI
 * Host: insta-reels-downloader-the-fastest-hd-reels-fetcher-api.p.rapidapi.com
 */
export async function instagramHandler(url: string): Promise<PlatformResult> {
  const resolvedUrl = await resolveUrl(url);

  const apiUrl = `https://insta-reels-downloader-the-fastest-hd-reels-fetcher-api.p.rapidapi.com/unified/index?url=${encodeURIComponent(resolvedUrl)}`;

  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "insta-reels-downloader-the-fastest-hd-reels-fetcher-api.p.rapidapi.com",
    }
  }, "instagram");

  const result = await response.json();
  console.log("[DEBUG] Instagram API Response:", JSON.stringify(result, null, 2));
  
  if (!result.success || !result.data) {
    throw new Error("Failed to fetch Instagram data. The account might be private or the link is invalid.");
  }

  const { data, media_type, shortcode } = result;
  const medias: Media[] = [];
  const items = data.content?.items || [];
  
  // Handle Sidecar/Carousel (multiple items) vs Single Item
  if ((media_type === "sidecar" || items.length > 1) && items.length > 0) {
    const listItems = items.map((item: any, index: number) => ({
      id: `${shortcode}-${index}`,
      title: `${data.title || 'Instagram Post'} - Item ${index + 1}`,
      thumbnail: item.thumbnail_url || data.cover_thumbnail || item.media_url,
      url: item.media_url
    }));

    return {
      title: data.title || "Instagram Carousel",
      thumbnail: data.cover_thumbnail || (items[0]?.thumbnail_url) || "https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico",
      medias: [], // Used for list items
      type: "list",
      items: listItems,
      caption: data.title || `Instagram Post - ${shortcode}`,
      likes: 0,
      commentCount: 0
    };
  } else {
    // Single media
    let item = items[0];
    
    // Fallback if the API returns the video directly in data.content instead of items array
    if (!item) {
      item = {
        type: media_type === 'video' || data.content?.type === 'video' ? 'video' : 'photo',
        media_url: data.content?.media_url || data.media_url,
        thumbnail_url: data.content?.thumbnail_url || data.cover_thumbnail || data.thumbnail_url
      };
    }
    
    if (item && item.media_url) {
      medias.push({
        id: `${shortcode}-main`,
        url: item.media_url,
        quality: "HD",
        type: item.type === "video" ? "video" : "image",
        extension: item.type === "video" ? "mp4" : "jpg"
      });
    }

    return {
      title: data.title || "Instagram Post",
      thumbnail: data.cover_thumbnail || item?.thumbnail_url || "https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico",
      medias,
      caption: data.title || `Instagram Post - ${shortcode}`,
      likes: 0,
      commentCount: 0
    };
  }
}
