"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Search } from "lucide-react"
import { cn } from "@/utils/cn"

const SUB_NAV = [
    { id: "instagram", name: "Instagram", href: "/" },
    { id: "hashtags",  name: "AI Hashtag", href: "/hashtags" },
    { id: "captions",  name: "AI Caption", href: "/captions" },
    { id: "bio",       name: "Bio",        href: "/bio" },
    { id: "bulk",      name: "Bulk Downloader", href: "/bulk-downloader" },
    { id: "reel-script", name: "Reel Script", href: "/reel-script" },
    { id: "viral-hooks", name: "Viral Hook", href: "/viral-hooks" },
    { id: "trending",  name: "Trending",   href: "/trending" },
    { id: "facebook",  name: "Facebook",  href: "/facebook" },
    { id: "tiktok",    name: "TikTok",    href: "/tiktok" },
]

export function ToolSubNav() {
  const pathname = usePathname() || ""
  const locale = pathname.split('/')[1] || 'en'
  
  return (
    <nav suppressHydrationWarning className="sticky top-14 sm:top-16 z-40 border-b border-white/10 dark:border-black/10 bg-black/95 dark:bg-white/95 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
            <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                {SUB_NAV.map((item) => {
                    const fullHref = `/${locale}${item.href === '/' ? '' : item.href}`
                    const isActive = pathname === fullHref || (item.href === '/' && pathname === `/${locale}`)
                    
                    return (
                        <Link
                            prefetch={true}
                            key={item.id}
                            href={fullHref}
                            className={cn(
                                "group flex shrink-0 items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] transition-all",
                                isActive 
                                    ? "text-white dark:text-black scale-105" 
                                    : "text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-black"
                            )}
                        >
                            {item.name}
                            <ChevronRight className={cn(
                                "h-3 w-3 transition-opacity",
                                isActive ? "opacity-100 text-white dark:text-black" : "opacity-30 group-hover:opacity-100 text-neutral-500 dark:text-neutral-400 group-hover:text-white dark:group-hover:text-black"
                            )} />
                        </Link>
                    )
                })}
            </div>
            
            {/* Search Bar for Desktop (Matching Mockup functionality) */}
            <div className="relative hidden lg:block w-72 group">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300 group-focus-within:text-rose-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search tools or blog..." 
                    className="h-11 w-full rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 pl-11 pr-12 text-[11px] font-bold text-neutral-900 dark:text-white outline-none ring-offset-2 transition-all focus:ring-2 focus:ring-rose-500 focus:bg-white dark:focus:bg-black"
                />
                <button className="absolute right-1.5 top-1.5 h-8 w-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg">
                    <Search className="h-4 w-4" />
                </button>
            </div>
        </div>
    </nav>
  )
}
