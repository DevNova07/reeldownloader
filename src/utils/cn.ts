import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidInstaUrl(url: string) {
  // Broadened to accept any link that looks like it's from Instagram to avoid blocking valid sharing links
  if (!url || typeof url !== 'string') return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes("instagram.com") || lowerUrl.includes("instagr.am");
}

export function getUrlType(url: string) {
  if (url.includes("/reels/") || url.includes("/reel/")) return "reels"
  if (url.includes("/stories/")) return "stories"
  if (url.includes("/p/") || url.includes("/tv/")) return "post"
  if (url.includes("/music/")) return "music"
  return "unknown"
}
