"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Star, TrendingUp, Zap } from "lucide-react"
import { getDictionary } from "@/dictionaries/client"

export function PopularTools() {
  const pathname = usePathname()
  const locale = (pathname.split('/')[1] || 'en') as any
  const dict = getDictionary(locale)

  const tools = [
    { name: "Reel Script AI", slug: "reel-script" },
    { name: "Viral Hook Finder", slug: "viral-hooks" },
    { name: "Trending Content", slug: "trending" },
    { name: "Instagram Reels Download", slug: "instagram-reels-download" },
    { name: "Snapchat Video Download", slug: "snapchat-video-download" },
    { name: "TikTok No Watermark", slug: "tiktok-video-download-without-watermark" },
    { name: "Facebook Video Downloader", slug: "facebook-video-download" },
    { name: "YouTube Shorts Download", slug: "youtube-shorts-download" },
    { name: "Reels Save", slug: "reels-download" },
    { name: "IGTV Downloader", slug: "instagram-igtv-download" }
  ]

  return (
    <section className="py-16 bg-white dark:bg-black px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest flex items-center justify-center sm:justify-start gap-3">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              Popular Tools
            </h2>
            <p className="mt-2 text-neutral-500 font-bold uppercase tracking-tighter opacity-60">Most searched by our global users</p>
          </div>
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2 rounded-full">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Live Trending</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.slug}
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={`/${locale}/${tool.slug}`}
                className="flex flex-col h-full p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl hover:border-pink-500/30 hover:shadow-2xl transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-white dark:bg-black shadow-sm flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
                  <Zap className="h-5 w-5 text-pink-600 group-hover:text-white" />
                </div>
                <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase italic leading-tight group-hover:text-pink-600 transition-colors">
                  {tool.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
