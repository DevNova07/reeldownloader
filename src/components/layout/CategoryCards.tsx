"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import { Film, PlaySquare, StopCircle, Music as MusicIcon, Camera, ImageIcon, Send, Ghost, Hash, ShieldCheck, Compass, Zap, TrendingUp, Layers } from "lucide-react"
import { getDictionary } from "@/dictionaries/client"

interface CategoryCardsProps {
  hoverShadow?: string
  hoverText?: string
  hoverBg?: string
}

export function CategoryCards({
  hoverShadow = "hover:shadow-pink-500/10",
  hoverText = "group-hover:text-pink-500",
  hoverBg = "from-pink-500/0 to-pink-500/5"
}: CategoryCardsProps = {}) {
  const pathname = usePathname() || ""
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locale = (pathname.split('/')[1] || 'en') as any
  const dict = getDictionary(locale)

  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
  }

  const categories = React.useMemo(() => [
    {
      name: dict.categories?.insta || "Instagram Downloader",
      desc: dict.categories?.insta_desc || "Download Instagram Reels, Stories, and Videos in high resolution.",
      href: "/instagram",
      icon: Camera,
      bg: "bg-linear-to-tr from-pink-600 to-purple-600 shadow-pink-500/20"
    },
    {
      name: dict.categories?.fb || "Facebook Downloader",
      desc: dict.categories?.fb_desc || "Save Facebook videos and Reels directly to your device gallery.",
      href: "/facebook",
      icon: PlaySquare,
      bg: "bg-linear-to-tr from-blue-600 to-blue-700 shadow-blue-500/20"
    },
    {
      name: dict.categories?.tiktok || "TikTok Downloader",
      desc: dict.categories?.tiktok_desc || "Download TikTok videos without watermark in original HD quality.",
      href: "/tiktok",
      icon: MusicIcon,
      bg: "bg-linear-to-tr from-neutral-900 to-neutral-800 shadow-white/5"
    },
    {
      name: dict.categories?.yt || "YouTube Download",
      desc: dict.categories?.yt_desc || "Get YouTube Shorts and Music in high-bitrate MP3 or MP4 formats.",
      href: "/youtube",
      icon: Film,
      bg: "bg-linear-to-tr from-red-600 to-red-700 shadow-red-500/20"
    },
    {
      name: dict.categories?.tw || "Twitter / X Saver",
      desc: dict.categories?.tw_desc || "Download videos and GIFs from X (Twitter) safely and quickly.",
      href: "/twitter",
      icon: Hash,
      bg: "bg-linear-to-tr from-neutral-800 to-black shadow-white/5"
    },
    {
      name: dict.categories?.snap || "Snapchat Downloader",
      desc: dict.categories?.snap_desc || "Save Snapchat Spotlights and Stories in original source quality.",
      href: "/snapchat",
      icon: Ghost,
      bg: "bg-linear-to-tr from-yellow-400 to-yellow-500 shadow-yellow-500/20"
    },
    {
      name: dict.categories?.bio || "Link-in-Bio Maker",
      desc: dict.categories?.bio_desc || "Create a beautiful, customizable Link-in-Bio page for your social profiles.",
      href: "/bio",
      icon: Compass,
      bg: "bg-linear-to-tr from-purple-600 to-pink-500 shadow-purple-500/20"
    },
    {
      name: dict.categories?.tele || "Telegram Media",
      desc: dict.categories?.tele_desc || "Download files and videos from any public Telegram channel.",
      href: "/telegram",
      icon: Send,
      bg: "bg-linear-to-tr from-sky-500 to-blue-500 shadow-sky-500/20"
    },
    {
      name: dict.categories?.music || "Music & MP3",
      desc: dict.categories?.music_desc || "Extract high-quality audio and MP3 from TikTok and YouTube.",
      href: "/music",
      icon: MusicIcon,
      bg: "bg-linear-to-tr from-purple-500 to-indigo-600 shadow-purple-500/20"
    },
    {
      name: "Reel Script AI",
      desc: "Generate viral scripts for your Reels and TikToks in seconds.",
      href: "/reel-script",
      icon: PlaySquare,
      bg: "bg-linear-to-tr from-rose-500 to-pink-600 shadow-rose-500/20"
    },
    {
      name: "Viral Hook Finder",
      desc: "Stop the scroll with AI-powered viral hooks for your videos.",
      href: "/viral-hooks",
      icon: Zap,
      bg: "bg-linear-to-tr from-yellow-400 to-orange-500 shadow-yellow-500/20"
    },
    {
      name: dict.categories?.bulk || "Bulk Downloader",
      desc: dict.categories?.bulk_desc || "Save all reels from any profile or hashtag in one go.",
      href: "/bulk-downloader",
      icon: Layers,
      bg: "bg-linear-to-tr from-rose-500 to-pink-600 shadow-rose-500/20",
    },
    {
      name: "Trending Content",
      desc: "Discover what's trending right now across social platforms.",
      href: "/trending",
      icon: TrendingUp,
      bg: "bg-linear-to-tr from-blue-500 to-indigo-600 shadow-blue-500/20"
    },
    {
      name: dict.categories?.private || "Private Downloader",
      desc: dict.categories?.private_desc || "Securely download content from your own saved and liked posts.",
      href: "/history",
      icon: ShieldCheck,
      bg: "bg-linear-to-tr from-neutral-700 to-neutral-800 shadow-white/5"
    }
  ], [dict])

  return (
    <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, idx) => {
            const Icon = category.icon
            return (
              <motion.div
                key={idx}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative h-full"
              >
                <Link
                  href={getLocalizedHref(category.href)}
                  className="flex flex-col items-center text-center h-full rounded-4xl p-6 sm:p-10 transition-all border border-neutral-100 dark:border-neutral-800/50 hover:border-pink-500/20 bg-white dark:bg-neutral-900/40 backdrop-blur-xl hover:shadow-2xl overflow-hidden relative"
                >
                  <div className={cn("inline-flex p-5 rounded-2xl mb-8 shadow-2xl transition-all group-hover:scale-110 group-hover:-rotate-3", category.bg)}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-neutral-900 dark:text-white tracking-widest uppercase italic">
                    {category.name}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                    {category.desc}
                  </p>

                  {/* Decorative Background Element */}
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity bg-pink-500 rounded-full blur-3xl pointer-events-none" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


