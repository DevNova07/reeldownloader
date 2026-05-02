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
}

export function PlatformTabs({ items, activeId, activeColor = "text-pink-600", tabs, className, locale = "en" }: PlatformTabsProps) {
  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
  }
  return (
    <div className={cn("mt-3 mb-6 sm:mb-10 flex justify-center w-full px-2 sm:px-0", className)}>
      <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-0.5 rounded-full bg-black/20 p-1 backdrop-blur-xl border border-white/10 shadow-2xl overflow-x-auto no-scrollbar whitespace-nowrap outline-hidden ring-1 ring-white/5 max-w-[calc(100vw-1rem)] sm:max-w-fit">
        {items.map((item) => {
          const isActive = item.id === activeId
          const label = tabs?.[item.id] || item.label
          return (
            <Link
              key={item.id}
              href={getLocalizedHref(item.href)}
              className={cn(
                "group relative flex shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[11px] sm:text-[13px] font-black tracking-tight transition-all duration-300",
                isActive ? activeColor : "text-white/60 hover:text-white"
              )}
            >
              <div className={cn("relative z-10 shrink-0 transition-all duration-300", isActive ? "scale-110 rotate-3" : "opacity-70 group-hover:opacity-100 group-hover:scale-105")}>
                {item.icon}
              </div>
              <span className="relative z-10 transition-colors duration-300">{label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_4px_20px_rgba(255,255,255,0.4)]"
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
