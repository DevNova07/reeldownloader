"use client"

import { useEffect, useRef } from "react"

export function TrackVisit() {
  const hasTracked = useRef(false)

  useEffect(() => {
    if (hasTracked.current) return
    
    const track = async () => {
      try {
        await fetch("/api/admin/track-visit", { method: "POST" })
        hasTracked.current = true
      } catch (err) {
        // Silently fail tracking if needed
      }
    }

    track()
  }, [])

  return null
}
