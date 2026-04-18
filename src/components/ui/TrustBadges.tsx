import React from "react"
import { ShieldCheck, Zap, Diamond } from "lucide-react"

interface TrustBadgesProps {
    dict?: any
}

export function TrustBadges({ dict }: TrustBadgesProps) {
  const t = dict?.trust || {
    safe: "Safe & Private",
    fast: "Ultra Fast",
    watermark: "No Watermark"
  }

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8">
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
  )
}
