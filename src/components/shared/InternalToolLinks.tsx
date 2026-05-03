"use client"
import { type Dictionary } from "@/dictionaries/client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { ArrowRight, Link2 } from "lucide-react"

interface ToolLink {
  key: string
  title: string
  href: string
}

interface InternalToolLinksProps {
  currentPlatform: string
  currentToolKey?: string
  dict: Dictionary
  accentColor?: string
}

export function InternalToolLinks({ currentPlatform, dict, accentColor = "text-pink-600" }: InternalToolLinksProps) {
  const pathname = usePathname() || ""
  const params = useParams()
  const locale = params?.locale as string || "en"

  // Detect current ToolKey from URL (e.g., /en/instagram-reels-download -> instagram_reels_download)
  const currentToolKey = React.useMemo(() => {
    const parts = pathname.split('/')
    const lastPart = parts[parts.length - 1]
    return lastPart ? lastPart.replaceAll('-', '_') : ""
  }, [pathname])

  const seoPages = (dict?.platforms?.seo_pages as any) || {}
  
  const relatedTools = React.useMemo(() => {
    return Object.keys(seoPages)
      .filter(key => {
        const k = key.toLowerCase()
        let platform = "other"
        
        // Robust platform detection
        if (k.includes("instagram") || k.includes("insta") || k.includes("reels") || k.includes("igtv") || k.includes("photo") || k.includes("image")) {
          platform = "instagram"
        } else if (k.includes("facebook") || k.includes("fb-") || k.includes("fb_")) {
          platform = "facebook"
        } else if (k.includes("tiktok")) {
          platform = "tiktok"
        } else if (k.includes("youtube") || k.includes("yt-") || k.includes("yt_")) {
          platform = "youtube"
        } else if (k.includes("snapchat") || k.includes("snap-") || k.includes("snap_")) {
          platform = "snapchat"
        } else if (k.includes("twitter") || k.includes("x-video") || k.includes("x_video")) {
          platform = "twitter"
        } else if (k.includes("telegram") || k.includes("tg-") || k.includes("tg_")) {
          platform = "telegram"
        }
        
        return platform === currentPlatform && key !== currentToolKey
      })
      .map(key => ({
        key,
        title: seoPages?.[key]?.title || "Tool",
        href: `/${locale}/${key.replaceAll('_', '-')}`
      }))
      .slice(0, 24) // Show more tools for better SEO internal linking
  }, [dict, currentPlatform, currentToolKey, locale])

  if (relatedTools.length === 0) return null

  return (
    <section className="px-4 py-12 sm:py-24 bg-neutral-50/50 dark:bg-neutral-900/20 border-y border-neutral-100 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-black shadow-xl border border-neutral-100 dark:border-neutral-800 ${accentColor}`}>
            <Link2 className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest text-center">
            More {currentPlatform.charAt(0).toUpperCase() + currentPlatform.slice(1)} Tools
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-neutral-500 dark:text-neutral-400">
            Explore our other specialized downloaders to get the most out of your social media experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool, idx) => (
            <motion.div
              key={tool.key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={tool.href}
                prefetch={true}
                className="group flex items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm border border-neutral-100 transition-all hover:shadow-2xl hover:border-pink-500/20 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-pink-500/30"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-pink-500 transition-colors">
                    Tool
                  </span>
                  <h3 className="mt-1 font-black text-neutral-900 dark:text-white text-sm tracking-tight line-clamp-1">
                    {tool.title}
                  </h3>
                </div>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-800 transition-all group-hover:bg-pink-500 group-hover:text-white`}>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
