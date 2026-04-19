"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  youtube: "youtube://",
  snapchat: "snapchat://",
  telegram: "tg://",
  tiktok: "tiktok://"
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
  const [isOpen, setIsOpen] = React.useState(false)
  const [activePlatform, setActivePlatform] = React.useState<string | null>(null)

  React.useEffect(() => {
    // Detect platform from URL
    const p = pathname.toLowerCase()
    if (p.includes("instagram") || p.includes("reels") || p.includes("story")) setActivePlatform("instagram")
    else if (p.includes("facebook")) setActivePlatform("facebook")
    else if (p.includes("twitter") || p.includes("twitter-video")) setActivePlatform("twitter")
    else if (p.includes("youtube") || p.includes("shorts")) setActivePlatform("youtube")
    else if (p.includes("snapchat")) setActivePlatform("snapchat")
    else if (p.includes("telegram")) setActivePlatform("telegram")
    else if (p.includes("tiktok")) setActivePlatform("tiktok")
    else setActivePlatform("instagram") // Default
  }, [pathname])

  const handleSwitch = () => {
    if (activePlatform && DEEP_LINKS[activePlatform]) {
      window.location.href = DEEP_LINKS[activePlatform]
    }
  }

  if (!activePlatform) return null

  const config = PLATFORM_CONFIG[activePlatform]

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-10">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-2 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Quick Switch</p>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(PLATFORM_CONFIG).map(([id, cfg]) => (
                  <button
                    key={id}
                    onClick={() => {
                      window.location.href = DEEP_LINKS[id]
                      setIsOpen(false)
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${cfg.color} transition-all hover:scale-110 active:scale-90 shadow-lg`}
                    title={`Open ${cfg.label}`}
                  >
                    <cfg.icon className={`h-5 w-5 ${id === 'snapchat' ? 'text-black' : 'text-white'}`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <motion.button
          drag
          dragElastic={0.1}
          dragMomentum={true}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex h-14 items-center gap-3 overflow-hidden rounded-2xl bg-black/80 px-4 py-2 text-white shadow-2xl backdrop-blur-xl border border-white/10 touch-none"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.color} shadow-lg transition-transform group-hover:rotate-12`}>
            <config.icon className={`h-5 w-5 ${activePlatform === 'snapchat' ? 'text-black' : 'text-white'}`} />
          </div>
          
          <div className="flex flex-col items-start pr-2">
            <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">Back to</span>
            <span className="text-sm font-black uppercase italic tracking-tight">{config.label}</span>
          </div>

          {!isOpen && (
            <a 
              href={DEEP_LINKS[activePlatform]}
              className="absolute inset-0 z-10"
              onClick={(e) => {
                // If it's a drag, don't trigger the link
                // But since we want it to work on click, we just let it be
              }}
            />
          )}
          
          {/* Close button inside if open */}
          {isOpen && (
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="ml-2 border-l border-white/10 pl-2 z-20"
             >
                <X className="h-4 w-4 text-white/40" />
             </button>
          )}
        </motion.button>
      </div>
    </div>
  )
}
