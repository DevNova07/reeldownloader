"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SocialPlatformBar } from "./SocialPlatformBar"
import { PlatformTabs } from "../shared/PlatformTabs"
import { getPlatformFromPath } from "@/utils/platform-detector"
import { Camera, Film, Hash, Music as MusicIcon, PlaySquare, ShieldCheck, StopCircle } from "lucide-react"

interface GlobalPlatformNavProps {
  dict: any
  locale: string
}

export function GlobalPlatformNav({ dict, locale }: GlobalPlatformNavProps) {
  const pathname = usePathname()
  const platform = getPlatformFromPath(pathname) || "instagram"

  // Define tab items for each platform
  const getTabItems = (p: string) => {
    switch (p) {
      case "facebook":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/facebook-video-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/facebook-reels-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "story", label: dict?.tabs?.story || "Story", href: "/facebook-story-saver", icon: <StopCircle className="h-4 w-4" /> },
          { id: "private", label: dict?.tabs?.private || "Private", href: "/facebook-private-video-downloader", icon: <ShieldCheck className="h-4 w-4" /> },
        ]
      case "twitter":
      case "x":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/x-video-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "gif", label: dict?.tabs?.gif || "GIF", href: "/x-gif-downloader", icon: <Hash className="h-4 w-4" /> },
          { id: "photo", label: dict?.tabs?.photo || "Photo", href: "/x-profile-picture-downloader", icon: <Camera className="h-4 w-4" /> },
          { id: "audio", label: dict?.tabs?.audio || "Audio", href: "/x-audio-downloader", icon: <MusicIcon className="h-4 w-4" /> },
        ]
      case "tiktok":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/tiktok-video-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "story", label: dict?.tabs?.story || "Story", href: "/tiktok-story-saver", icon: <StopCircle className="h-4 w-4" /> },
          { id: "music", label: dict?.tabs?.music || "Music", href: "/tiktok-mp3-downloader", icon: <MusicIcon className="h-4 w-4" /> },
          { id: "photo", label: dict?.tabs?.photo || "Photo", href: "/tiktok-photo-downloader", icon: <Camera className="h-4 w-4" /> },
        ]
      case "youtube":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/youtube-video-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "shorts", label: dict?.tabs?.shorts || "Shorts", href: "/youtube-shorts-downloader", icon: <PlaySquare className="h-4 w-4" /> },
          { id: "music", label: dict?.tabs?.music || "Music", href: "/youtube-to-mp3-converter", icon: <MusicIcon className="h-4 w-4" /> },
          { id: "thumbnail", label: "Thumbnail", href: "/youtube-thumbnail-downloader", icon: <Camera className="h-4 w-4" /> },
        ]
      case "snapchat":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/snapchat-video-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "spotlight", label: dict?.tabs?.spotlight || "Spotlight", href: "/snapchat-spotlight-downloader", icon: <PlaySquare className="h-4 w-4" /> },
          { id: "story", label: dict?.tabs?.story || "Story", href: "/snapchat-stories-downloader", icon: <StopCircle className="h-4 w-4" /> },
          { id: "photo", label: dict?.tabs?.photo || "Photo", href: "/snapchat-photo-downloader", icon: <Camera className="h-4 w-4" /> },
        ]
      case "telegram":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/telegram-video-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "audio", label: dict?.tabs?.audio || "Audio", href: "/telegram-audio-downloader", icon: <MusicIcon className="h-4 w-4" /> },
          { id: "file", label: "Files", href: "/telegram-file-downloader", icon: <Hash className="h-4 w-4" /> },
          { id: "story", label: dict?.tabs?.story || "Story", href: "/telegram-story-saver", icon: <StopCircle className="h-4 w-4" /> },
        ]
      case "instagram":
      default:
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/instagram-video-downloader", icon: <Camera className="h-4 w-4" /> },
          { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/instagram-reels-downloader", icon: <PlaySquare className="h-4 w-4" /> },
          { id: "story", label: dict?.tabs?.story || "Story", href: "/instagram-story-viewer", icon: <StopCircle className="h-4 w-4" /> },
          { id: "photo", label: dict?.tabs?.photo || "Photo", href: "/instagram-photo-downloader", icon: <Camera className="h-4 w-4" /> },
        ]
    }
  }

  // Determine active tab ID based on path
  const getActiveTabId = (path: string, p: string) => {
    const pLower = path.toLowerCase();
    if (pLower.includes("reels")) return "reels"
    if (pLower.includes("story") || pLower.includes("saver")) return "story"
    if (pLower.includes("music") || pLower.includes("mp3") || pLower.includes("audio")) return "music"
    if (pLower.includes("private")) return "private"
    if (pLower.includes("gif")) return "gif"
    if (pLower.includes("photo") || pLower.includes("dp") || pLower.includes("thumbnail")) return "photo"
    if (pLower.includes("shorts") || pLower.includes("spotlight")) return "shorts"
    if (pLower.includes("watermark")) return "no-watermark"
    if (pLower.includes("file")) return "file"
    return "video"
  }

  const activeTabId = getActiveTabId(pathname, platform)
  const items = getTabItems(platform)

  // Colors for each platform
  const colors: Record<string, string> = {
    instagram: "text-pink-600",
    facebook: "text-blue-600",
    twitter: "text-slate-500",
    x: "text-slate-500",
    tiktok: "text-pink-600",
    youtube: "text-red-600",
    snapchat: "text-yellow-600",
    telegram: "text-sky-600",
  }

  const activeColor = colors[platform] || "text-pink-600"

  return (
    <div className="w-full bg-linear-to-b from-neutral-100/50 to-transparent dark:from-neutral-900/50 pt-6 pb-2">
      <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-4">
        <SocialPlatformBar activeId={platform} />
        <PlatformTabs 
          activeId={activeTabId}
          activeColor={activeColor}
          tabs={dict?.tabs}
          items={items}
          locale={locale}
        />
      </div>
    </div>
  )
}
