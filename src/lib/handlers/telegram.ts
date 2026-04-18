import { fetchWithRotation } from "../api-utils";
import { type PlatformResult, type Media } from "@/types/download";
import { statsManager } from "@/utils/stats";
import { cacheManager } from "@/utils/cache";

interface TelegramAPIResponse {
  error?: boolean;
  title?: string;
  image?: string;
  description?: string;
  type?: "group" | "channel" | "user";
  members?: string;
  "members(int)"?: number;
}

/**
 * Telegram Downloader Handler.
 * modularized for speed and maintainability.
 */
export async function telegramHandler(url: string): Promise<PlatformResult> {
  const rapidApiHost = "telegram-index.p.rapidapi.com";
  const apiUrl = `https://${rapidApiHost}/fetch?link=${encodeURIComponent(url)}`;

  console.log("Fetching from Telegram Index API:", apiUrl);

  const response = await fetchWithRotation(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": rapidApiHost,
      "Content-Type": "application/json"
    },
  }, "telegram");

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Telegram Index API returned an invalid response.");
  }

  const data = (await response.json()) as TelegramAPIResponse;

  if (data.error || !data.title) {
    throw new Error("No Telegram info found for this link.");
  }

  const medias: Media[] = [
    {
      id: "profile-image",
      url: data.image || "",
      quality: "Profile Image",
      type: "image",
      extension: "jpg"
    }
  ];

  if (data.type === "group") {
    medias.push({
      id: "members",
      url: "#",
      quality: `Members: ${data.members || "Unknown"}`,
      type: "text",
      extension: "txt"
    });
  }

  const formattedData: PlatformResult = {
    thumbnail: data.image || "https://telegram.org/img/t_logo.webp",
    title: data.title || "Telegram Channel/Group",
    medias: medias,
    caption: data.description || `Type: ${data.type || "Unknown"}`,
    likes: data["members(int)"] || 0,
    commentCount: 0,
  };

  statsManager.trackDownload(url, data.title || "Telegram Link", "telegram");
  cacheManager.set(url, formattedData);
  return formattedData;
}
