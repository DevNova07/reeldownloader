"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/utils/cn"
import { motion } from "framer-motion"

export interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

interface PlatformTabsProps {
  items: TabItem[]
  activeId: string
  activeColor?: string
  tabs?: Record<string, string>
  className?: string
  locale?: string
  indicatorColor?: string
}

export function PlatformTabs({ items, activeId, activeColor = "text-pink-600", tabs, className, locale = "en", indicatorColor = "bg-white" }: PlatformTabsProps) {
  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
  }
  return (
    <div className={cn("mt-3 mb-6 sm:mb-10 flex justify-center w-full px-2 sm:px-0", className)}>
      <div className="grid grid-cols-4 items-center gap-0.5 rounded-2xl bg-black/20 p-1 backdrop-blur-xl border border-white/10 shadow-2xl outline-hidden ring-1 ring-white/5 w-full max-w-2xl mx-auto">
        {items.map((item) => {
          const isActive = item.id === activeId
          const label = tabs?.[item.id] || item.label
          return (
            <Link
              key={item.id}
              href={getLocalizedHref(item.href)}
              prefetch={true}
              className={cn(
                "group relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-xl py-2 sm:py-2.5 text-[10px] sm:text-[13px] font-black tracking-tight transition-all duration-300 w-full",
                isActive ? activeColor : "text-white/60 hover:text-white"
              )}
            >
              <div className={cn("relative z-10 shrink-0 transition-all duration-300", isActive ? "scale-110 rotate-3" : "opacity-70 group-hover:opacity-100 group-hover:scale-105")}>
                {item.icon}
              </div>
              <span className="relative z-10 transition-colors duration-300 text-center line-clamp-1">{label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className={cn("absolute inset-0 rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.4)]", indicatorColor)}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
