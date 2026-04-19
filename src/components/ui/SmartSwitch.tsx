"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Send, 
  Ghost, 
  Zap,
  ArrowRightLeft,
  X
} from "lucide-react"

// Real Deep Links for Mobile Apps
const DEEP_LINKS: Record<string, string> = {
  instagram: "instagram://",
  facebook: "fb://",
  twitter: "twitter://",
  youtube: "vnd.youtube://",
  snapchat: "snapchat://",
  telegram: "tg://",
  tiktok: "snssdk1128://"
}

const PLATFORM_CONFIG: Record<string, { color: string, icon: any, label: string }> = {
  instagram: { color: "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600", icon: Instagram, label: "Instagram" },
  facebook: { color: "bg-[#1877F2]", icon: Facebook, label: "Facebook" },
  twitter: { color: "bg-black", icon: Twitter, label: "Twitter / X" },
  youtube: { color: "bg-[#FF0000]", icon: Youtube, label: "YouTube" },
  snapchat: { color: "bg-[#FFFC00] text-black", icon: Ghost, label: "Snapchat" },
  telegram: { color: "bg-[#229ED9]", icon: Send, label: "Telegram" },
  tiktok: { color: "bg-black", icon: Zap, label: "TikTok" }
}

export function SmartSwitch() {
  const pathname = usePathname()
  const [activePlatform, setActivePlatform] = React.useState<string | null>(null)
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    // Detect platform from URL with priority to avoid false positives
    const p = pathname.toLowerCase()
    
    if (p.includes("youtube") || p.includes("shorts")) setActivePlatform("youtube")
    else if (p.includes("facebook") || p.includes("fb-")) setActivePlatform("facebook")
    else if (p.includes("tiktok")) setActivePlatform("tiktok")
    else if (p.includes("twitter") || p.includes("x.com")) setActivePlatform("twitter")
    else if (p.includes("snapchat")) setActivePlatform("snapchat")
    else if (p.includes("telegram")) setActivePlatform("telegram")
    else if (p.includes("instagram") || p.includes("reels") || p.includes("story") || p === "/" || p.length <= 4) setActivePlatform("instagram")
    else setActivePlatform("instagram") // Default
  }, [pathname])

  if (!activePlatform || !isVisible) return null

  const config = PLATFORM_CONFIG[activePlatform]

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-10">
      <div className="flex items-center gap-2">
        <motion.div
          drag
          dragElastic={0.1}
          dragMomentum={true}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onTap={() => {
            if (activePlatform && DEEP_LINKS[activePlatform]) {
              window.location.href = DEEP_LINKS[activePlatform]
            }
          }}
          className="group relative flex h-14 items-center gap-3 overflow-hidden rounded-2xl bg-black/80 px-4 py-2 text-white shadow-2xl backdrop-blur-xl border border-white/10 touch-none cursor-pointer"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.color} shadow-lg transition-transform group-hover:rotate-12`}>
            <config.icon className={`h-5 w-5 ${activePlatform === 'snapchat' ? 'text-black' : 'text-white'}`} />
          </div>
          
          <div className="flex flex-col items-start pr-2">
            <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">Back to</span>
            <span className="text-sm font-black uppercase italic tracking-tight">{config.label}</span>
          </div>
          
          <button 
             onPointerDown={(e) => e.stopPropagation()}
             onClick={(e) => {
               e.stopPropagation();
               setIsVisible(false);
             }}
             className="ml-2 border-l border-white/10 pl-2 z-20 relative hover:bg-white/5 rounded-md p-1 transition-colors"
          >
             <X className="h-4 w-4 text-white/40" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
