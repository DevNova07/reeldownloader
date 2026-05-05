"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface TrustBadgeProps {
  userCount: string
  className?: string
}

export function TrustBadge({ userCount, className }: TrustBadgeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className={`mt-10 mb-4 flex flex-col items-center gap-6 ${className}`}
    >
      {/* Trust Avatars */}
      <div className="inline-flex items-center gap-4 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 backdrop-blur-md">
        <div className="flex -space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-6 w-6 rounded-full border-2 border-blue-500 bg-neutral-200" />
          ))}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Trusted by {userCount} users</span>
      </div>

      {/* Strong Trust Signals */}
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 px-4">
        <div className="flex items-center gap-2 group">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
            <Check className="h-3 w-3" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-white/90">No Login Required</span>
        </div>
        <div className="flex items-center gap-2 group">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
            <Check className="h-3 w-3" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-white/90">100% Free</span>
        </div>
        <div className="flex items-center gap-2 group">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
            <Check className="h-3 w-3" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-white/90 whitespace-nowrap">Unlimited Downloads</span>
        </div>
      </div>
    </motion.div>
  )
}
