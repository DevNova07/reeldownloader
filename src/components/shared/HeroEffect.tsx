"use client"

import * as React from "react"
import { cn } from "@/utils/cn"

interface HeroEffectProps {
  color?: string
  intensity?: "low" | "medium" | "high"
}

export function HeroEffect({ color = "bg-pink-500", intensity = "medium" }: HeroEffectProps) {
  const opacities = {
    low: "opacity-10",
    medium: "opacity-15",
    high: "opacity-25"
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Mesh Overlay - simplified */}
      <div className="mesh-gradient-overlay opacity-50" />
      
      {/* Floating Blobs - hidden on mobile to prevent lag / optimized for PC */}
      <div className="hidden md:block absolute top-0 -left-10 w-72 h-72 md:w-96 md:h-96 filter blur-2xl animate-blob will-change-transform">
        <div className={cn("w-full h-full rounded-full", color, opacities[intensity])} />
      </div>
      
      <div className="hidden md:block absolute top-1/4 -right-10 w-72 h-72 md:w-96 md:h-96 filter blur-2xl animate-blob animation-delay-2000 will-change-transform">
        <div className={cn("w-full h-full rounded-full bg-cyan-500", opacities[intensity])} />
      </div>
      
      <div className="hidden md:block absolute -bottom-10 left-1/3 w-72 h-72 md:w-96 md:h-96 filter blur-2xl animate-blob animation-delay-4000 will-change-transform">
        <div className={cn("w-full h-full rounded-full bg-purple-500", opacities[intensity])} />
      </div>

      {/* Grid Pattern Overlay - fixed opacity */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.05]" />
    </div>
  )
}
