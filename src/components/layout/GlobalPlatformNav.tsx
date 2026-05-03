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
          { id: "video", label: dict?.tabs?.video || "Video", href: "/facebook", icon: <Film className="h-4 w-4" /> },
          { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/facebook-reels-downloader", icon: <Film className="h-4 w-4" /> },
          { id: "story", label: dict?.tabs?.story || "Story", href: "/facebook-story-downloader", icon: <StopCircle className="h-4 w-4" /> },
          { id: "private", label: dict?.tabs?.private || "Private", href: "/facebook-private-video-downloader", icon: <ShieldCheck className="h-4 w-4" /> },
        ]
      case "twitter":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/twitter", icon: <Film className="h-4 w-4" /> },
          { id: "gif", label: dict?.tabs?.gif || "GIF", href: "/twitter/gif", icon: <Hash className="h-4 w-4" /> },
          { id: "photo", label: dict?.tabs?.photo || "Photo", href: "/twitter/photo", icon: <Camera className="h-4 w-4" /> },
          { id: "music", label: dict?.tabs?.music || "Music", href: "/twitter/music", icon: <MusicIcon className="h-4 w-4" /> },
        ]
      case "tiktok":
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/tiktok", icon: <Film className="h-4 w-4" /> },
          { id: "music", label: dict?.tabs?.music || "Music", href: "/tiktok/music", icon: <MusicIcon className="h-4 w-4" /> },
        ]
      case "instagram":
      default:
        return [
          { id: "video", label: dict?.tabs?.video || "Video", href: "/", icon: <Camera className="h-4 w-4" /> },
          { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/reels", icon: <PlaySquare className="h-4 w-4" /> },
          { id: "story", label: dict?.tabs?.story || "Story", href: "/story", icon: <StopCircle className="h-4 w-4" /> },
          { id: "music", label: dict?.tabs?.music || "Music", href: "/music", icon: <MusicIcon className="h-4 w-4" /> },
        ]
    }
  }

  // Determine active tab ID based on path
  const getActiveTabId = (path: string, p: string) => {
    if (path.includes("reels")) return "reels"
    if (path.includes("story")) return "story"
    if (path.includes("music")) return "music"
    if (path.includes("private")) return "private"
    if (path.includes("gif")) return "gif"
    if (path.includes("photo")) return "photo"
    return "video"
  }

  const activeTabId = getActiveTabId(pathname, platform)
  const items = getTabItems(platform)

  // Colors for each platform
  const colors: Record<string, string> = {
    instagram: "text-pink-600",
    facebook: "text-blue-600",
    twitter: "text-slate-500",
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
