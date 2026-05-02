"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

const ALL_TOOLS = [
  {
    id: "instagram",
    name: "Instagram Video",
    desc: "Download Reels, Stories & Posts",
    href: "/",
    gradient: "from-rose-500 to-purple-600",
    emoji: "📸",
  },
  {
    id: "reels",
    name: "Instagram Reels",
    desc: "Save Reels in HD without watermark",
    href: "/reels",
    gradient: "from-purple-500 to-pink-500",
    emoji: "🎬",
  },
  {
    id: "youtube",
    name: "YouTube",
    desc: "Download videos, Shorts & music",
    href: "/youtube",
    gradient: "from-red-600 to-red-800",
    emoji: "▶️",
  },
  {
    id: "tiktok",
    name: "TikTok",
    desc: "Download without watermark",
    href: "/tiktok",
    gradient: "from-neutral-800 to-black",
    emoji: "🎵",
  },
  {
    id: "facebook",
    name: "Facebook",
    desc: "Save FB videos & Reels offline",
    href: "/facebook",
    gradient: "from-blue-600 to-blue-800",
    emoji: "👤",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    desc: "Save Spotlights & Stories",
    href: "/snapchat",
    gradient: "from-yellow-400 to-yellow-500",
    emoji: "👻",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    desc: "Download tweets & video clips",
    href: "/twitter",
    gradient: "from-neutral-700 to-black",
    emoji: "𝕏",
  },
  {
    id: "telegram",
    name: "Telegram",
    desc: "Save Telegram videos & media",
    href: "/telegram",
    gradient: "from-sky-500 to-blue-600",
    emoji: "✈️",
  },
]

interface RelatedToolsProps {
  /** The current platform id to exclude from suggestions */
  currentPlatform?: string
  /** Max number of tools to show */
  max?: number
}

export function RelatedTools({ currentPlatform, max = 4 }: RelatedToolsProps) {
  const pathname = usePathname()
  const locale = pathname.split("/")[1]

  const getLocalizedHref = (href: string) => {
    const cleanHref = href === "/" ? "" : href
    return `/${locale}${cleanHref}`
  }

  const tools = ALL_TOOLS.filter((t) => t.id !== currentPlatform).slice(0, max)

  return (
    <section className="px-4 pt-10 pb-4 sm:py-20 relative overflow-hidden">
      {/* Subtle background decorative element */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-linear-to-bl from-pink-500/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="mb-4 sm:mb-12 flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight uppercase italic">
              Explore More Tools
            </h2>
            <p className="mt-2 text-base font-medium text-neutral-500 dark:text-neutral-400">
              High-performance downloaders for all your favorite social platforms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 15 }}
            >
              <Link
                prefetch={true}
                href={getLocalizedHref(tool.href)}
                className="group flex flex-col items-center text-center gap-5 rounded-3xl p-6 shadow-sm transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 dark:backdrop-blur-sm"
              >
                {/* Icon / Gradient Badge */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${tool.gradient} text-3xl shadow-lg ring-4 ring-white dark:ring-neutral-800 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="drop-shadow-md">{tool.emoji}</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-neutral-900 dark:text-white text-base leading-tight tracking-tight uppercase">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                    {tool.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 transition-all group-hover:text-pink-600 dark:group-hover:text-pink-400">
                  Try Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
