import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

interface StorySnap {
  snapUrls?: {
    mediaUrl?: string;
    mediaPreviewUrl?: { value: string };
  };
  snapMediaType?: number;
  snapId?: { value: string };
}

interface StoryObject {
  snapList?: StorySnap[];
}

/**
 * Snapchat Downloader Handler with native HTML fallback scraping.
 * modularized for speed and maintainability.
 */
export async function snapchatHandler(url: string): Promise<PlatformResult> {
  let username = url;
  if (url.includes("snapchat.com")) {
    if (url.includes("/add/")) {
      username = url.split("/add/")[1].split("?")[0].split("/")[0];
    } else if (url.includes("@")) {
      username = url.split("@")[1].split("?")[0].split("/")[0];
    } else if (url.includes("/s/") || url.includes("/p/")) {
      const parts = url.split("?")[0].split("/").filter(Boolean);
      const pIndex = parts.indexOf("s") !== -1 ? parts.indexOf("s") : parts.indexOf("p");
      if (pIndex !== -1 && parts[pIndex + 1]) {
        username = parts[pIndex + 1];
      } else {
        username = parts[parts.length - 1];
      }
    } else {
      const parts = url.split("?")[0].split("/").filter(Boolean);
      username = parts[parts.length - 1] || username;
    }
  }

  const rapidApiHost = "snapchat3.p.rapidapi.com";
  const apiUrl = `https://${rapidApiHost}/getFullProfile?username=${username}`;

  console.log("Fetching from Snapchat API:", apiUrl);

  const medias: Media[] = [];
  let mainTitle = `Snapchat: ${username}`;
  let thumbnail = "";
  let caption = "";
  let commentCount = 0;

  try {
    const response = await fetchWithRotation(apiUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": rapidApiHost },
    }, "snapchat");

    const rawData = await response.json();

    if (rawData.success && rawData.data) {
      const snapData = rawData.data;

      if (snapData.profile && snapData.profile.info) {
        const info = snapData.profile.info;
        mainTitle = info.title || info.username || mainTitle;
        thumbnail = info.profilePictureUrl || "";
        commentCount = parseInt(info.subscriberCount) || 0;
      }

      caption = snapData?.profile?.metadata?.pageDescription?.value || mainTitle;

      const allCollections = [];
      if (snapData.curatedHighlights) allCollections.push(...snapData.curatedHighlights);
      if (snapData.spotlightHighlights) allCollections.push(...snapData.spotlightHighlights);
      if (snapData.story) {
        if (Array.isArray(snapData.story)) allCollections.push(...snapData.story);
        else allCollections.push(snapData.story);
      }

      allCollections.forEach((storyObj: StoryObject) => {
        const snapList = storyObj.snapList;
        if (!snapList || !Array.isArray(snapList)) return;

        snapList.forEach((snap: StorySnap) => {
          if (snap.snapUrls && snap.snapUrls.mediaUrl) {
            const mediaUrl = snap.snapUrls.mediaUrl;
            const isVideo = snap.snapMediaType === 1 || mediaUrl.includes(".mp4");
            medias.push({
              id: snap.snapId?.value || Math.random().toString(36).substring(7),
              url: mediaUrl,
              quality: isVideo ? "HD Video" : "HD Image", 
              type: isVideo ? "video" : "image",
              extension: isVideo ? "mp4" : "jpg",
            });
          }
        });
      });
    }
  } catch (e) {
    const error = e as Error;
    console.warn("Snapchat API failed, attempting Native Fallback...", error.message);
  }

  // FALLBACK: If API yielded nothing (likely because the url was a direct video), attempt scraping
  if (medias.length === 0 && url.includes("snapchat.com/")) {
    console.log("No profile media found. Falling back to native HTML scraping for direct URL:", url);
    try {
      const fallbackResponse = await fetch(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } 
      });
      const html = await fallbackResponse.text();
      
      const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      if (nextDataMatch && nextDataMatch[1]) {
        const parsed = JSON.parse(nextDataMatch[1]);
        
                const extractSnaps = (obj: any) => {
          if (!obj) return;
          if (Array.isArray(obj)) obj.forEach(extractSnaps);
          else if (typeof obj === 'object') {
            if (obj.snapUrls && obj.snapUrls.mediaUrl) {
              const mediaUrl = obj.snapUrls.mediaUrl;
              const isVideo = obj.snapMediaType === 1 || mediaUrl.includes(".mp4");
                            if (!medias.find((m: any) => m.url === mediaUrl)) {
                medias.push({
                  id: obj.snapId?.value || Math.random().toString(36).substring(7),
                  url: mediaUrl,
                  quality: isVideo ? "HD Video" : "HD Image", 
                  type: isVideo ? "video" : "image",
                  extension: isVideo ? "mp4" : "jpg",
                });
              }
              if (!thumbnail && obj.snapUrls?.mediaPreviewUrl?.value) {
                thumbnail = obj.snapUrls.mediaPreviewUrl.value;
              }
            }
            Object.values(obj).forEach(extractSnaps);
          }
        };
        
        extractSnaps(parsed.props);
        
        if (!caption) caption = parsed.props?.pageProps?.pageMetadata?.pageDescription?.value || "Snapchat Video";
        if (mainTitle === `Snapchat: ${username}`) {
          mainTitle = parsed.props?.pageProps?.pageMetadata?.pageTitle || mainTitle;
        }
      }
    } catch (e) {
      console.error("Native HTML fallback failed:", e);
    }
  }

  if (medias.length === 0) {
    throw new Error("No stories or spotlights found for this Snapchat link.");
  }

  const uniqueMedias = Array.from(new Map(medias.map(m => [m.url, m])).values());

  const formattedData: PlatformResult = {
    thumbnail: thumbnail,
    title: mainTitle,
    medias: uniqueMedias,
    caption: caption,
    likes: 0,
    commentCount: commentCount, 
  };

  statsManager.trackDownload(url, mainTitle, "snapchat");
  cacheManager.set(url, formattedData);
  return formattedData;
}
