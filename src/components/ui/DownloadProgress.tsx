"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

interface DownloadProgressProps {
  progress: number
  status: string
  className?: string
  accentColor?: string
}

export function DownloadProgress({ progress, status, className, accentColor = "bg-blue-600" }: DownloadProgressProps) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{status}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white tabular-nums">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className={cn("h-full rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]", accentColor)}
        />
      </div>
    </div>
  )
}
