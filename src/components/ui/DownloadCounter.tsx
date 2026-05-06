"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Download, TrendingUp } from "lucide-react"

// Realistic base number that animates up
const BASE_COUNT = 1_247_382
const UPDATE_INTERVAL = 2000 // Update every 2 seconds instead of 3x per second

function useAnimatedCount(target: number, duration = 1500) {
  const [display, setDisplay] = React.useState(target - 50)
  const prevTargetRef = React.useRef(target)

  React.useEffect(() => {
    if (target === prevTargetRef.current) return
    
    const start = display
    const end = target
    const startTime = performance.now()

    let frameId: number
    const frame = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(start + (end - start) * eased))
      
      if (progress < 1) {
        frameId = requestAnimationFrame(frame)
      }
    }

    frameId = requestAnimationFrame(frame)
    prevTargetRef.current = target
    
    return () => cancelAnimationFrame(frameId)
  }, [target, duration, display])

  return display
}

export function DownloadCounter({ accentColor = "text-pink-400" }: { accentColor?: string }) {
  const [count, setCount] = React.useState(BASE_COUNT)

  // Increment count realistically every few seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 8 + 2))
    }, UPDATE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const displayed = useAnimatedCount(count)

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="hidden md:flex mx-auto mt-2 w-fit items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 backdrop-blur-md will-change-transform"
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>

      <div className="flex items-center gap-2">
        <Download className={`h-4 w-4 ${accentColor}`} />
        <span className="text-sm font-black text-white tabular-nums">
          {displayed.toLocaleString()}
        </span>
        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
          videos downloaded today
        </span>
      </div>

      <TrendingUp className="h-4 w-4 text-green-400 ml-1" />
    </motion.div>
  )
}
