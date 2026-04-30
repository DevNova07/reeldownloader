import * as React from "react"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-4">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-pink-500/20" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-pink-500/10" />
        <Loader2 className="h-12 w-12 animate-spin text-pink-600" />
      </div>
      
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white">
          Preparing Sav<span className="text-pink-600">Clip</span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-1 w-12 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
             <div className="h-full w-full animate-progress-shimmer bg-linear-to-r from-pink-500 to-rose-600" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Loading Tool...</span>
        </div>
      </div>
    </div>
  )
}
