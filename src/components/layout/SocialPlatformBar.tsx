"use client"
// Refreshed layout to fix sticky hydration cache
// Force re-compilation


import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"

const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    href: "/instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "text-pink-600",
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "/facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "text-blue-600",
  },
  {
    id: "tiktok",
    name: "TikTok",
    href: "/tiktok",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.6 8.6 0 01-1.87-1.46v9.06c0 1.7-.58 3.33-1.63 4.67-1.04 1.33-2.52 2.29-4.16 2.72-1.64.43-3.4.3-4.9-0.34-1.5-.64-2.75-1.83-3.45-3.32-0.7-1.49-0.88-3.23-0.52-4.83.36-1.6 1.25-3.06 2.51-4.04 1.26-.98 2.87-1.48 4.47-1.42 1.35.05 2.65.48 3.75 1.25V0.02c-.32 0-.64 0-.97 0z" />
      </svg>
    ),
    color: "text-black dark:text-pink-600",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "/youtube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "text-red-600",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    href: "/snapchat",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current scale-[2] translate-y-[8px]">
        <path d="M12.015 1.5c-3.13 0-5.69 2.115-5.69 4.71 0 .235.02.46.06.678C6.31 7.02 6.13 7.15 5.92 7.15c-.4 0-.82-.285-1.12-.51-.155-.12-.305-.235-.43-.3-.135-.075-.24-.105-.33-.105-.26 0-.44.24-.44.605 0 .39.195.83.565 1.275.25.3.56.55.88.745.2.11.41.19.62.24-.03.11-.05.18-.08.28-.15.54-.425 1.05-.725 1.505-.18.275-.37.535-.555.77-.04.05-.07.1-.11.16-.27.35-.38.64-.38.93 0 .265.08.435.24.52.12.06.27.1.47.1.75 0 1.94-.48 2.76-.84.22-.095.4-.18.53-.25.105-.05.16-.08.175-.085.12.04.14.05.16.06l.03.01c.21.09.43.155.65.205.42.09.84.14 1.28.14.44 0 .86-.05 1.28-.14.22-.05.44-.115.65-.205l.03-.01c.02-.01.04-.02.16-.06l.175.085c.13.07.31.155.53.25.825.36 2.015.84 2.765.84.2 0 .35-.04.47-.1.16-.085.24-.255.24-.52 0-.29-.11-.58-.38-.93-.04-.06-.07-.11-.11-.16-.185-.235-.375-.495-.555-.77-.3-.455-.575-.965-.725-1.505-.03-.1-.05-.17-.08-.28.21-.05.42-.13.62-.24.32-.195.63-.445.88-.745.37-.445.565-.885.565-1.275 0-.365-.18-.605-.44-.605-.09 0-.195.03-.33.105-.125.065-.275.18-.43.3-.3.225-.72.51-1.12.51-.21 0-.39-.13-.465-.262.04-.218.06-.443.06-.678 0-2.595-2.56-4.71-5.69-4.71z" />
      </svg>
    ),
    color: "text-yellow-600",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    href: "/twitter",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
      </svg>
    ),
    color: "text-black",
  },
  {
    id: "telegram",
    name: "Telegram",
    href: "/telegram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.294.294-.603.294l.213-3.033 5.52-4.99c.24-.213-.054-.33-.373-.112L9.415 12.55l-2.94-.917c-.64-.2-.65-.64.133-.946l11.49-4.43c.532-.193 1 .126.806.964z" />
      </svg>
    ),
    color: "text-sky-600",
  },
]

export function SocialPlatformBar({ activeId, className }: { activeId: string, className?: string }) {
  const pathname = usePathname() || ""
  const locale = pathname.split('/')[1] || "en"
  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
  }

  return (
    <div 
      suppressHydrationWarning={true}
      className={cn("flex items-center justify-center gap-3.5 sm:gap-7 px-4 sm:px-8 py-2 sm:py-3 rounded-2xl bg-black/10 dark:bg-white/5 backdrop-blur-xl border border-white/10 w-full sm:w-fit max-w-[calc(100vw-1.5rem)] md:max-w-none mx-auto", className)}
    >
      {PLATFORMS.map((platform) => {
        const isActive = platform.id === activeId
        return (
          <Link
            key={platform.id}
            href={getLocalizedHref(platform.href)}
            className="relative group shrink-0"
          >
            <motion.div
              className={cn(
                "flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-all duration-300",
                isActive 
                  ? cn("bg-white shadow-xl shadow-white/20 scale-105", platform.color) 
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <div className={cn("transition-transform duration-300 group-hover:scale-110 flex items-center justify-center", isActive && "scale-90")}>
                {platform.icon}
              </div>
            </motion.div>
            {isActive && (
              <motion.div
                layoutId="activeDot"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}
