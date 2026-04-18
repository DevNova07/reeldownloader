"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { dictionaries } from "@/dictionaries/client"
import { type Locale } from "@/i18n"

interface TrendingBarProps {
  accentColor?: string
}

const COUNTRIES = [
  "India", "USA", "UK", "Russia", "Brazil", "Indonesia", "France", "Japan", "Turkey", "Germany", "Mexico", "Thailand", "Vietnam", "Pakistan", "Bangladesh"
]

const MEDIA_TYPES = [
  "Reel", "Video", "Story", "Audio", "Photo", "Viral Clip", "Short", "TikTok", "FB Reel"
]

export function TrendingBar({ accentColor = "bg-pink-600" }: TrendingBarProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale
    const dict = (dictionaries as Record<string, typeof dictionaries.en>)[locale] || dictionaries.en
  
  const [items, setItems] = React.useState<string[]>([])
  
  const COUNTRIES = React.useMemo(() => [
    "USA", "UK", "Canada", "Germany", "France", "Japan", "Australia", "Brazil", "Mexico", "Spain", "Italy", "Netherlands", "Turkey", "UAE", "Singapore"
  ], [])

  const MEDIA_TYPES = React.useMemo(() => [
    dict.tabs?.video || "Video", 
    dict.tabs?.reels || "Reels", 
    dict.tabs?.story || "Story", 
    dict.tabs?.photo || "Photo", 
    "Viral Clip", "Short", "Media"
  ], [dict])

  // Seed initial random items
  React.useEffect(() => {
    const generateItems = () => {
      const template = dict.trending?.template || "⚡ Someone from {country} saved a {type}...";
      return Array.from({ length: 10 }).map(() => {
        const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
        const type = MEDIA_TYPES[Math.floor(Math.random() * MEDIA_TYPES.length)]
        return template.replace('{country}', country).replace('{type}', type)
      })
    }
    setItems(generateItems())
  }, [dict, COUNTRIES, MEDIA_TYPES])

  if (items.length === 0) return null

  return (
    <div className="hidden md:block mx-auto mt-6 w-full max-w-4xl overflow-hidden rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-md will-change-contents">
      <div className="flex items-center gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
            {dict.trending?.label || "Trending Now"}
          </span>
        </div>
        
        <div className="h-4 w-px bg-white/10" />

        <div className="relative flex-1 overflow-hidden">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ translateZ: 0 }}
            className="flex gap-12 whitespace-nowrap will-change-transform"
          >
            {[...items, ...items].map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-bold text-white/70"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

