"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/utils/cn"

interface PlatformStatusProps {
  platform: string
  className?: string
}

export function PlatformStatus({ platform, className }: PlatformStatusProps) {
  // In a real app, this would fetch from a status API
  // For now, we simulate a "Healthy" status with occasional "Busy" for realism
  const [status, setStatus] = React.useState<"healthy" | "busy" | "down">("healthy")
  
  React.useEffect(() => {
    // Randomly show "Busy" to make it feel "Live"
    const random = Math.random()
    if (random > 0.95) setStatus("busy")
    else setStatus("healthy")
  }, [platform])

  const config = {
    healthy: {
      icon: CheckCircle2,
      text: "System Operational",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      dot: "bg-emerald-500"
    },
    busy: {
      icon: Clock,
      text: "High Traffic",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      dot: "bg-amber-500"
    },
    down: {
      icon: AlertCircle,
      text: "Maintenance",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      dot: "bg-rose-500"
    }
  }

  const current = config[status]
  const Icon = current.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-md ring-1 ring-inset transition-all",
        current.bg,
        current.color,
        status === "healthy" ? "ring-emerald-500/20" : status === "busy" ? "ring-amber-500/20" : "ring-rose-500/20",
        className
      )}
    >
      <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", current.dot)} />
      {platform} {current.text}
    </motion.div>
  )
}
