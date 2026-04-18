"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Clock, Download, Trash2, RefreshCcw, History, ExternalLink, Camera, Globe, Ghost, Send, Music, Play, Hash } from "lucide-react"
import { useDownloadHistory } from "@/hooks/useDownloadHistory"
import { toast } from "react-hot-toast"
import Link from "next/link"
import Image from "next/image"
import { ToolSubNav } from "@/components/layout/ToolSubNav"

const PLATFORM_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode; href: string }> = {
  instagram: { label: "Instagram", color: "text-pink-600", bg: "bg-pink-600/10 border-pink-600/20", icon: <Camera className="h-4 w-4" />, href: "/" },
  reels:     { label: "Reels",     color: "text-purple-600", bg: "bg-purple-600/10 border-purple-600/20", icon: <Camera className="h-4 w-4" />, href: "/reels" },
  story:     { label: "Story",     color: "text-pink-500", bg: "bg-pink-500/10 border-pink-500/20", icon: <Camera className="h-4 w-4" />, href: "/story" },
  photo:     { label: "Photo",     color: "text-rose-600", bg: "bg-rose-600/10 border-rose-600/20", icon: <Camera className="h-4 w-4" />, href: "/photo" },
  youtube:   { label: "YouTube",   color: "text-red-600",  bg: "bg-red-600/10 border-red-600/20",   icon: <Play className="h-4 w-4" />,   href: "/youtube" },
  facebook:  { label: "Facebook",  color: "text-blue-600", bg: "bg-blue-600/10 border-blue-600/20", icon: <Globe className="h-4 w-4" />,  href: "/facebook" },
  tiktok:    { label: "TikTok",    color: "text-neutral-800 dark:text-white", bg: "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700", icon: <Music className="h-4 w-4" />, href: "/tiktok" },
  snapchat:  { label: "Snapchat",  color: "text-yellow-600", bg: "bg-yellow-400/10 border-yellow-400/20", icon: <Ghost className="h-4 w-4" />, href: "/snapchat" },
  telegram:  { label: "Telegram",  color: "text-sky-600",  bg: "bg-sky-500/10 border-sky-500/20",   icon: <Send className="h-4 w-4" />,   href: "/telegram" },
  twitter:   { label: "Twitter/X", color: "text-neutral-800 dark:text-neutral-300", bg: "bg-neutral-100 dark:bg-neutral-800 border-neutral-200", icon: <Hash className="h-4 w-4" />, href: "/twitter" },
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function HistoryPage() {
  const { history, clearHistory } = useDownloadHistory()
  const pathname = usePathname()
  const router = useRouter()
  const locale = pathname.split("/")[1]

  const getLocalizedHref = (href: string) => {
    if (locale === "en") return href
    return `/${locale}${href}`
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <ToolSubNav />
      <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-pink-600 to-purple-600 shadow-lg">
              <History className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 dark:text-white">Download History</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{history.length} saved items</p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={() => {
                clearHistory()
                toast.success("History cleared!")
              }}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-bold text-neutral-600 shadow-sm transition-all hover:border-red-200 hover:text-red-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </button>
          )}
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {history.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-white py-24 text-center dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                <Clock className="h-10 w-10 text-neutral-400" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">No downloads yet</h2>
              <p className="mt-4 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                Your download history will appear here. Go search for any video, reel, or story!
              </p>
              <Link
                href={getLocalizedHref("/")}
                className="mt-4 flex items-center gap-2 rounded-xl bg-linear-to-r from-pink-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <RefreshCcw className="h-4 w-4" />
                Start Downloading
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Grid */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {history.map((item, idx) => {
              const platform = PLATFORM_CONFIG[item.platform || "instagram"] || PLATFORM_CONFIG.instagram
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex gap-4 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    {item.thumbnail ? (
                      <Image
                        src={`/api/proxy-download?url=${encodeURIComponent(item.thumbnail)}&type=image&inline=true`}
                        alt={item.title}
                        width={80}
                        height={80}
                        unoptimized
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Download className="h-6 w-6 text-neutral-400" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between overflow-hidden">
                    <div>
                      <div className={`mb-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${platform.bg} ${platform.color}`}>
                        {platform.icon}
                        {platform.label}
                      </div>
                      <p className="line-clamp-2 text-sm font-bold text-neutral-900 dark:text-white">{item.title}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-neutral-400">
                        <Clock className="mr-1 inline h-3 w-3" />
                        {timeAgo(item.timestamp)}
                      </span>
                      <button
                        onClick={() => router.push(getLocalizedHref(`${platform.href}?url=${encodeURIComponent(item.url)}`))}
                        className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-black transition-all hover:scale-105 active:scale-95 text-white ${
                          item.platform === "youtube" ? "bg-red-600 hover:bg-red-500" :
                          item.platform === "facebook" ? "bg-blue-600 hover:bg-blue-500" :
                          item.platform === "snapchat" ? "bg-yellow-400 hover:bg-yellow-300 text-black" :
                          item.platform === "tiktok" ? "bg-black hover:bg-neutral-800" :
                          "bg-pink-600 hover:bg-pink-500"
                        }`}
                      >
                        <RefreshCcw className="h-3 w-3" />
                        Re-download
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
