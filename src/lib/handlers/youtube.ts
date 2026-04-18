import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

interface YouTubeMediaDownloaderResponse {
  errorId?: string;
  title: string;
  thumbnails?: Array<{ url: string }>;
  likeCount?: number;
  videos?: {
    items: Array<{
      hasAudio: boolean;
      url: string;
      quality?: string;
      sizeText?: string;
      extension?: string;
    }>;
  };
  audios?: {
    items: Array<{
      url: string;
      sizeText?: string;
    }>;
  };
}

interface YouTubeNewAPIResponse {
  status: string;
  status_code: number;
  title?: string;
  duration?: number;
  thumbnail?: string;
  results?: Array<{
    has_audio: boolean;
    mime: string;
    quality: string;
    url: string;
  }>;
}

interface YouTubeDownloadAPI3Response {
  video_id: string;
  title: string;
  author: string;
  length_seconds: number;
  duration: string;
  thumbnail: string;
  streams: {
    video: {
      url: string;
      format: {
        quality_label: string;
        mime_type: string;
        bitrate: number;
        width: number;
        height: number;
      };
    };
    audio: {
      url: string;
      format: {
        mime_type: string;
        bitrate: number;
      };
    };
  };
}

interface YouTubeFallbackMedia {
  url?: string;
  label?: string;
  quality?: string;
  extension?: string;
  type?: string;
  text?: string;
  downloadUrl?: string;
  link?: string;
}

interface YouTubeFallbackContent {
  metadata?: {
    channel?: {
      videos?: {
        contents?: Array<{
          videos?: YouTubeFallbackMedia[];
          audios?: YouTubeFallbackMedia[];
          thumbnail?: string;
          title?: string;
          url?: string;
          links?: Array<{ link: string }>;
          formats?: Array<{ url: string }>;
          quality?: string;
          extension?: string;
        }>;
      };
    };
  };
  contents?: Array<{
    videos?: YouTubeFallbackMedia[];
    audios?: YouTubeFallbackMedia[];
    thumbnail?: string;
    title?: string;
    url?: string;
    links?: Array<{ link: string }>;
    formats?: Array<{ url: string }>;
    quality?: string;
    extension?: string;
    endpoint?: {
      payload?: {
        watchEndpointSupportedOnesieConfig?: {
          html5PlaybackOnesieConfig?: {
            commonConfig?: {
              url: string;
            };
          };
        };
      };
    };
  }>;
  data?: Record<string, unknown>;
  thumbnails?: Array<{ url: string }>;
  thumbnail?: string;
  cover?: string;
  title?: string | { text: string };
  url?: string;
  links?: Array<{ link: string }>;
  formats?: Array<{ url: string }>;
  medias?: YouTubeFallbackMedia[];
  quality?: string;
  extension?: string;
  endpoint?: {
    payload?: {
      watchEndpointSupportedOnesieConfig?: {
        html5PlaybackOnesieConfig?: {
          commonConfig?: {
            url: string;
          };
        };
      };
    };
  };
}

/**
 * YouTube Downloader Handler.
 * modularized for speed and maintainability.
 */
export async function youtubeHandler(url: string): Promise<PlatformResult> {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  // --- CLUSTER 1: New Priority Primary (All Media Downloader 4) ---
  try {
    const newPrimaryHost = "all-media-downloader4.p.rapidapi.com";
    const newPrimaryUrl = `https://${newPrimaryHost}/yt/v5/download.php?id=${videoId}`;

    console.log("Fetching from New Priority YouTube API (Cluster 1):", newPrimaryUrl);

    const response = await fetchWithRotation(newPrimaryUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": newPrimaryHost },
    }, "youtube");

    if (response.ok) {
      const data = (await response.json()) as YouTubeNewAPIResponse;
      if (data.status === "ok" && data.results && data.results.length > 0) {
        const formattedData: PlatformResult = {
          thumbnail: data.thumbnail || "",
          title: data.title || "YouTube Video",
          medias: data.results.map((r) => ({
            id: Math.random().toString(36).substring(7),
            url: r.url,
            quality: r.quality,
            type: r.has_audio && r.mime.includes("audio") ? "audio" : "video",
            extension: r.mime.split("/")[1]?.split(";")[0] || (r.has_audio ? "mp3" : "mp4"),
          })),
          caption: data.title || "",
          likes: 0,
          commentCount: 0,
        };

        statsManager.trackDownload(url, formattedData.title, "youtube");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    console.warn("New Priority Cluster 1 failed, trying existing nodes...", e);
  }

  // --- CLUSTER 2: Social Download All-in-One (Secondary Primary) ---
  try {
    const allInOneHost = "social-download-all-in-one.p.rapidapi.com";
    console.log("Fetching from Social All-in-One API (YouTube Cluster 2)");

    const response = await fetchWithRotation(`https://${allInOneHost}/v1/social/autolink`, {
      method: "POST",
      headers: {
        "x-rapidapi-host": allInOneHost,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }, "youtube"); 

    if (response.ok) {
      const data = await response.json();
      if (!data.error && data.medias && data.medias.length > 0) {
        const formattedData: PlatformResult = {
          thumbnail: data.thumbnail || "",
          title: data.title || "YouTube Video",
          medias: data.medias.map((m: { url: string; quality?: string; type?: string; extension?: string }) => ({
            id: Math.random().toString(36).substring(7),
            url: m.url,
            quality: m.quality || "HD",
            type: m.type === "audio" ? "audio" : "video",
            extension: m.extension || (m.type === "audio" ? "mp3" : "mp4"),
          })),
          caption: data.title || "",
          likes: 0,
          commentCount: 0,
        };
        statsManager.trackDownload(url, formattedData.title, "youtube");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    console.warn("Universal Primary node failed, attempting specialized nodes...", e);
  }

  // --- SECONDARY: YouTube Download API3 (50M Limit) ---
  try {
    const api3Host = "youtube-download-api3.p.rapidapi.com";
    const api3Url = `https://${api3Host}/api/v1/download/${videoId}`;

    console.log("Fetching from API3 (High Limit):", api3Url);

    const response = await fetchWithRotation(api3Url, {
      method: "GET",
      headers: { "x-rapidapi-host": api3Host },
    }, "youtube");

    if (response.ok) {
      const data = (await response.json()) as YouTubeDownloadAPI3Response;
      if (data.streams) {
        const medias: Media[] = [];

        if (data.streams.video && data.streams.video.url) {
          medias.push({
            id: Math.random().toString(36).substring(7),
            url: data.streams.video.url,
            quality: `🔥 ${data.streams.video.format.quality_label} HD Video`,
            type: "video",
            extension: "mp4",
          });
        }

        if (data.streams.audio && data.streams.audio.url) {
          medias.push({
            id: Math.random().toString(36).substring(7),
            url: data.streams.audio.url,
            quality: "🎵 High Quality Audio (M4A)",
            type: "audio",
            extension: "m4a",
          });
        }

        if (medias.length > 0) {
          const formattedData: PlatformResult = {
            thumbnail: data.thumbnail || "",
            title: data.title || "YouTube Video",
            medias: medias,
            caption: data.title || "",
            likes: 0,
            commentCount: 0,
          };

          statsManager.trackDownload(url, formattedData.title, "youtube");
          cacheManager.set(url, formattedData);
          return formattedData;
        }
      }
    }
  } catch (e) {
    console.warn("API3 failed, attempting other nodes...", e);
  }

  // --- TERTIARY: YouTube Media Downloader ---
  try {
    const primaryHost = "youtube-media-downloader.p.rapidapi.com";
    const primaryUrl = `https://${primaryHost}/v2/video/details?videoId=${videoId}`;

    console.log("Fetching from Tertiary YouTube API (Media Downloader):", primaryUrl);

    const response = await fetchWithRotation(primaryUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": primaryHost },
    }, "youtube_backup1");

    if (response.ok) {
      const data = (await response.json()) as YouTubeMediaDownloaderResponse;
      if (data.errorId === "Success" || !data.errorId) {
        const medias: Media[] = [];

        if (data.videos && data.videos.items) {
          let hasCombined = false;
          for (const m of data.videos.items) {
            if (m.hasAudio) {
              hasCombined = true;
              medias.push({
                id: Math.random().toString(36).substring(7),
                url: m.url,
                quality: (m.quality || "HD") + (m.sizeText ? ` (${m.sizeText})` : ""),
                type: "video",
                extension: m.extension || "mp4",
              });
            }
          }

          if (!hasCombined) {
            for (const m of data.videos.items) {
              medias.push({
                id: Math.random().toString(36).substring(7),
                url: m.url,
                quality: (m.quality || "HD") + " (No Audio)",
                type: "video",
                extension: m.extension || "mp4",
              });
            }
          }
        }

        if (data.audios && data.audios.items) {
          data.audios.items.forEach((m) => {
            medias.push({
              id: Math.random().toString(36).substring(7),
              url: m.url,
              quality: "Audio Only" + (m.sizeText ? ` (${m.sizeText})` : ""),
              type: "audio",
              extension: "mp3",
            });
          });
        }

        const formattedData: PlatformResult = {
          thumbnail: data.thumbnails && data.thumbnails.length > 0 ? data.thumbnails[data.thumbnails.length - 1].url : "",
          title: data.title,
          medias: medias,
          caption: data.title || "",
          likes: data.likeCount || 0,
          commentCount: 0,
        };

        statsManager.trackDownload(url, data.title, "youtube_backup1");
        cacheManager.set(url, formattedData);
        return formattedData;
      }
    }
  } catch (e) {
    console.warn("Tertiary YouTube API failed, attempting Fallback...", e);
  }

  // --- QUATERNARY: YouTube Video And Shorts Downloader ---
  try {
    const fallbackHost = "youtube-video-and-shorts-downloader1.p.rapidapi.com";
    const fallbackUrl = `https://${fallbackHost}/youtube/v3/video/details?videoId=${videoId}`;

    console.log("Fetching from Quaternary YouTube API (Video & Shorts):", fallbackUrl);

    const response = await fetchWithRotation(fallbackUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": fallbackHost },
    }, "youtube");

    if (response.ok) {
      const rawData = (await response.json()) as YouTubeFallbackContent;

      const medias: Media[] = [];
      let thumbnail = "";
      let title = "YouTube Video";
      let caption = "";

      const metadata = rawData?.metadata;
            const content: any = metadata?.channel?.videos?.contents?.[0] || rawData?.data || rawData;

      if (content) {
        if (Array.isArray(content.contents) && content.contents.length > 0) {
          const firstContent = content.contents[0];
          const videos = firstContent.videos || [];
          const audios = firstContent.audios || [];

          videos.forEach((v: YouTubeFallbackMedia) => {
            if (v.url) {
              medias.push({
                id: Math.random().toString(36).substring(7),
                url: v.url,
                quality: v.label || v.quality || "HD",
                type: "video",
                extension: v.extension || "mp4",
              });
            }
          });

          audios.forEach((a: YouTubeFallbackMedia) => {
            if (a.url) {
              medias.push({
                id: Math.random().toString(36).substring(7),
                url: a.url,
                quality: "Audio Only",
                type: "audio",
                extension: "mp3",
              });
            }
          });
        }

        const streamUrl = content.endpoint?.payload?.watchEndpointSupportedOnesieConfig?.html5PlaybackOnesieConfig?.commonConfig?.url ||
          content.url ||
          content.links?.[0]?.link ||
          content.formats?.[0]?.url;

        if (streamUrl && medias.length === 0) {
          medias.push({
            id: Math.random().toString(36).substring(7),
            url: streamUrl,
            quality: content.quality || "HD Video",
            type: "video",
            extension: content.extension || "mp4",
          });
        }

        const formats = content.formats || content.links || content.medias;
        if (Array.isArray(formats) && medias.length === 0) {
          formats.forEach((f: YouTubeFallbackMedia) => {
            const fUrl = f.url || f.link || f.downloadUrl;
            if (fUrl) {
              medias.push({
                id: Math.random().toString(36).substring(7),
                url: fUrl,
                quality: f.quality || f.text || "HD",
                type: f.type === "audio" ? "audio" : "video",
                extension: f.extension || (f.type === "audio" ? "mp3" : "mp4"),
              });
            }
          });
        }

        thumbnail = content.contents?.[0]?.thumbnail || content.thumbnails?.[0]?.url || content.thumbnail || content.cover || "";
        title = content.contents?.[0]?.title || content.title?.text || content.title || "YouTube Content";
        caption = title;

        if (medias.length > 0) {
          const formattedData: PlatformResult = {
            thumbnail,
            title,
            medias,
            caption,
            likes: 0,
            commentCount: 0,
          };

          statsManager.trackDownload(url, formattedData.title, "youtube");
          cacheManager.set(url, formattedData);
          return formattedData;
        }
      }
    }
  } catch (err: unknown) {
    console.error("All YouTube clusters failed:", err);
  }

  throw new Error("Could not fetch YouTube video from any available cluster.");
}
