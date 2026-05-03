"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Compass, Bookmark, User, Hash } from "lucide-react"
import { cn } from "@/utils/cn"
import { type Locale } from "@/i18n"

export function BottomNav() {
  const pathname = usePathname()
  const locale = (pathname.split('/')[1] || 'en') as Locale

  const navItems = [
    { name: "Home", href: `/${locale}`, icon: Home },
    { name: "Captions", href: `/${locale}/captions`, icon: Compass, primary: true },
    { name: "Hashtags", href: `/${locale}/hashtags`, icon: Hash },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}` && pathname === `/${locale}`) return true
    if (href !== `/${locale}` && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-neutral-100 bg-white/90 pb-safe shadow-2xl backdrop-blur-xl md:hidden dark:border-neutral-800 dark:bg-black/90">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-8">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon

          return (
            <Link 
              key={item.href} 
              href={item.href}
              prefetch={true}
              className="relative flex flex-col items-center justify-center gap-1 group"
            >
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
                item.primary 
                   ? "bg-linear-to-tr from-pink-600 to-rose-600 text-white shadow-lg -translate-y-2" 
                   : active ? "text-pink-600 dark:text-pink-400" : "text-neutral-400 group-hover:text-black dark:group-hover:text-white"
              )}>
                <Icon className={cn("h-6 w-6 transition-transform", active && !item.primary && "scale-110")} />
                
                {/* Active Indicator Dot */}
                {active && !item.primary && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-pink-600"
                  />
                )}
              </div>
              {!item.primary && (
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest transition-colors",
                  active ? "text-pink-600 dark:text-pink-400" : "text-neutral-400"
                )}>
                  {item.name}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
