import React from "react"
import { Check, ShieldCheck, Zap, Diamond, Star } from "lucide-react"

interface TrustBadgesProps {
    dict?: any
}

export function TrustBadges({ dict }: TrustBadgesProps) {
  const trustDict = dict?.trust || {}
  const t = {
    no_login: trustDict.no_login || "No Login",
    free: trustDict.free || "100% Free",
    unlimited: trustDict.unlimited || "Unlimited",
    users: trustDict.users || "Trusted By 800,000+ Users",
    safe: trustDict.safe || "Safe",
    fast: trustDict.fast || "Fast",
    watermark: trustDict.watermark || "No Watermark"
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-6 z-10 relative">
      {/* Trusted By Pill */}
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-1.5 py-1 pr-5 backdrop-blur-sm">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 border-blue-500 bg-neutral-200/90"
            />
          ))}
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-wider text-white/90 uppercase">
          {t.users || "Trusted By 800,000+ Users"}
        </span>
      </div>

      {/* New Features List */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-xl">
        {[
          t.no_login || "No Login",
          t.free || "100% Free",
          t.unlimited || "Unlimited"
        ].map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/20">
              <Check className="h-3 w-3 text-blue-300" strokeWidth={2.5} />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wide text-white/80 uppercase">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Original Features List */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-2">
        <div className="flex items-center gap-2 text-white/80">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold sm:text-sm">{t.safe}</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Zap className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-bold sm:text-sm">{t.fast}</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Diamond className="h-4 w-4 text-sky-400" />
          <span className="text-xs font-bold sm:text-sm">{t.watermark}</span>
        </div>
      </div>
    </div>
  )
}
