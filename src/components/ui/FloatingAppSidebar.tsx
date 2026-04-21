"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Instagram, Facebook, Youtube, Music, Ghost } from "lucide-react"
import { cn } from "@/utils/cn"

const PLATFORMS = [
  { id: "instagram", icon: Instagram, color: "bg-linear-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045]", link: "https://www.instagram.com", deep: "instagram://" },
  { id: "facebook", icon: Facebook, color: "bg-[#1877F2]", link: "https://www.facebook.com", deep: "fb://" },
  { id: "youtube", icon: Youtube, color: "bg-[#FF0000]", link: "https://www.youtube.com", deep: "vnd.youtube://" },
  { id: "tiktok", icon: Music, color: "bg-black", link: "https://www.tiktok.com", deep: "snssdk1128://" },
  { id: "snapchat", icon: Ghost, color: "bg-[#FFFC00] text-black", link: "https://www.snapchat.com", deep: "snapchat://" }
]

export function FloatingAppSidebar() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-row items-center gap-4 bg-black/60 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {PLATFORMS.map((platform, idx) => {
        const Icon = platform.icon
        return (
          <motion.button
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = platform.deep
                setTimeout(() => window.open(platform.link, "_blank"), 1000)
              } else {
                window.open(platform.link, "_blank")
              }
            }}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl shadow-xl transition-all border border-white/20",
              platform.color
            )}
          >
            <Icon className="h-6 w-6" />
          </motion.button>
        )
      })}
    </div>
  )
}
