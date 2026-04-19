"use client"

import * as React from "react"
import Link from "next/link"
import { Camera, ChevronDown, Menu, X, Globe, Ghost, Send, Play, Hash, Music, History, Sparkles, Compass } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn"
import { usePathname, useRouter } from "next/navigation"
import { locales, languageNames, languageFlags, type Locale } from "@/i18n"
import { PLATFORM_NAV_CONFIG } from "@/lib/nav-config"

export function Navbar({ dict }: { dict: any }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLangOpen, setIsLangOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentLocale = React.useMemo(() => {
    const segment = pathname.split('/')[1];
    return locales.includes(segment as Locale) ? segment as Locale : 'en';
  }, [pathname]);

  const getLabel = (href: string, fallback: string) => {
    if (!dict || !dict.platforms) return fallback;
    const slug = href.replace('/', '').replace(/-/g, '_');
    const platforms = dict.platforms as any;
    for (const p of ['instagram', 'facebook', 'tiktok', 'youtube', 'snapchat', 'telegram', 'twitter']) {
      if (platforms?.[p]?.[slug]?.title) {
        return platforms[p][slug].title;
      }
    }
    return fallback;
  };

  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    if (currentLocale === 'en' && cleanPath === '/') return '/'
    return `/${currentLocale}${cleanPath === '/' ? '' : cleanPath}`
  }

  const handleLanguageChange = (locale: string) => {
    setIsLangOpen(false);
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    router.push(segments.join('/') || '/');
  };

  const services = React.useMemo(() => [
    { name: dict.categories.insta, href: "/", icon: <Camera className="h-4 w-4" />, color: "text-pink-600", category: 'insta' },
    { name: dict.categories.fb, href: "/facebook", icon: <Globe className="h-4 w-4" />, color: "text-blue-600", category: 'fb' },
    { name: dict.categories.snap, href: "/snapchat", icon: <Ghost className="h-4 w-4" />, color: "text-yellow-500", category: 'snap' },
    { name: dict.categories.tele, href: "/telegram", icon: <Send className="h-4 w-4" />, color: "text-sky-500", category: 'tele' },
    { name: dict.categories.tiktok, href: "/tiktok", icon: <Music className="h-4 w-4" />, color: "text-neutral-900 dark:text-white", category: 'tiktok' },
    { name: dict.categories.yt, href: "/youtube", icon: <Play className="h-4 w-4 fill-current" />, color: "text-red-600", category: 'yt' },
    { name: dict.categories.tw, href: "/twitter", icon: <Hash className="h-4 w-4" />, color: "text-neutral-800 dark:text-neutral-400", category: 'tw' },
    { name: dict.categories.hashtags, href: "/hashtags", icon: <Hash className="h-4 w-4" />, color: "text-neutral-900 dark:text-neutral-400", category: 'hashtags' },
    { name: dict.categories.bio || "Link-in-Bio", href: "/bio", icon: <Compass className="h-4 w-4" />, color: "text-purple-500", category: 'bio' },
    { name: dict.categories.blog, href: "/blog", icon: <Hash className="h-4 w-4" />, color: "text-emerald-500", category: 'blog' },
    { name: "Caption AI", href: "/captions", icon: <Compass className="h-4 w-4" />, color: "text-pink-600", category: 'captions' },
  ], [dict])


  const platform = React.useMemo(() => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'

    if (pathWithoutLocale.startsWith('/facebook')) return { id: dict.categories.fb, prefix: 'FB', suffix: 'Clip', icon: Globe, bg: 'from-blue-600 to-blue-800', text: 'text-blue-600' }
    if (pathWithoutLocale.startsWith('/youtube')) return { id: dict.categories.yt, prefix: 'YT', suffix: 'Clip', icon: Play, bg: 'from-red-600 to-red-800', text: 'text-red-600' }
    if (pathWithoutLocale.startsWith('/tiktok')) return { id: dict.categories.tiktok, prefix: 'Tik', suffix: 'Clip', icon: Music, bg: 'from-neutral-800 to-black', text: 'text-pink-600' }
    if (pathWithoutLocale.startsWith('/hashtags')) return { id: dict.categories.hashtags, prefix: 'AI ', suffix: 'Hashtag', icon: Hash, bg: 'from-neutral-800 to-black', text: 'text-neutral-900 dark:text-neutral-400' }
    if (pathWithoutLocale.startsWith('/twitter')) return { id: dict.categories.tw, prefix: 'X', suffix: 'Clip', icon: Hash, bg: 'from-neutral-800 to-black', text: 'text-neutral-900 dark:text-neutral-400' }
    if (pathWithoutLocale.startsWith('/snapchat')) return { id: dict.categories.snap, prefix: 'Snap', suffix: 'Clip', icon: Ghost, bg: 'from-yellow-400 to-yellow-500', text: 'text-yellow-500' }
    if (pathWithoutLocale.startsWith('/telegram')) return { id: dict.categories.tele, prefix: 'Tele', suffix: 'Clip', icon: Send, bg: 'from-sky-500 to-blue-600', text: 'text-sky-500' }
    if (pathWithoutLocale.startsWith('/captions')) return { id: 'AI Caption', prefix: 'AI ', suffix: 'Caption', icon: Sparkles, bg: 'from-pink-600 to-rose-600', text: 'text-pink-600' }

    // Default (Instagram)
    return { id: dict.categories.insta, prefix: 'Sav', suffix: 'Clip', icon: Camera, bg: 'from-[#cc00ff] to-[#ff0080]', text: 'text-pink-600' }
  }, [pathname, dict.categories])

  const sortedServices = React.useMemo(() => {
    return [...services].sort((a, b) => {
      if (a.name === platform.id) return -1
      if (b.name === platform.id) return 1
      return 0
    })
  }, [platform.id, services])

  const LogoIcon = platform.icon

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 shadow-xs backdrop-blur-md dark:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href={getLocalizedHref("/")} className="flex items-center gap-2 group shrink-0">
              <div className={cn("relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-linear-to-tr shadow-xl group-hover:scale-110 transition-transform", platform.bg)}>
                <LogoIcon className={cn("h-6 w-6 text-white", (pathname.includes('/youtube')) && "fill-white")} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-neutral-900 dark:text-white">
                Sav<span className="text-pink-600">Clip</span>
              </span>
            </Link>

            {/* Desktop Service Links */}
            <div className="hidden xl:flex items-center gap-5 ms-4">
              {sortedServices.map((service) => {
                const navData = PLATFORM_NAV_CONFIG[service.category];
                return (
                  <div key={service.name} className="relative group/item">
                    <Link
                      href={getLocalizedHref(service.href)}
                      className="flex items-center gap-1.5 text-[13px] font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all hover:scale-105 py-4"
                    >
                      <span className={cn("opacity-70", service.color)}>{service.icon}</span>
                      <span className="hidden 2xl:inline">
                        {isMounted ? service.name : (service.href === '/bio' ? 'Bio' : service.name)}
                      </span>
                      {navData && <ChevronDown className="h-3 w-3 opacity-50 group-hover/item:rotate-180 transition-transform" />}
                    </Link>

                    {/* Desktop Hover Dropdown */}
                    {navData && (
                      <div className="absolute top-full left-0 hidden group-hover/item:block pt-2">
                        <div className={cn("w-[600px] grid grid-cols-2 gap-8 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-neutral-100 dark:border-neutral-800", navData.borderColor)}>
                           {navData.categories.map((cat) => (
                             <div key={cat.titleKey} className="flex flex-col gap-4">
                               <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                 {dict.navbar?.[cat.titleKey as keyof typeof dict.navbar] || cat.titleKey}
                               </p>
                               <ul className="flex flex-col gap-2.5">
                                 {cat.links.slice(0, 6).map((link) => (
                                   <li key={link.href}>
                                     <Link
                                       href={getLocalizedHref(link.href)}
                                       className={cn("text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:translate-x-1 transition-all inline-block", navData.hoverColor)}
                                     >
                                       {getLabel(link.href, link.label)}
                                     </Link>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href={getLocalizedHref("/history")}
              title="Download History"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-pink-200 hover:text-pink-600 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:text-pink-400 transition-all"
            >
              <History className="h-4 w-4" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2.5 py-1.5 sm:px-3 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-all hover:scale-105 bg-neutral-50 dark:bg-neutral-900/50 shadow-xs active:scale-95"
              >
                <span className="text-sm">{languageFlags[currentLocale]}</span>
                <span className="text-xs sm:text-[11px] font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-tighter">{currentLocale}</span>
                <ChevronDown className="h-3 w-3 text-neutral-400" />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute inset-inline-end-0 mt-3 w-[min(90vw,320px)] max-h-[80vh] overflow-y-auto rounded-2xl border border-neutral-100 bg-white/80 p-3 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={cn(
                            "group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98]",
                            currentLocale === loc
                              ? "bg-linear-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/20"
                              : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                          )}
                        >
                          <span className="text-base origin-left group-hover:scale-110 transition-transform">{languageFlags[loc]}</span>
                          <span className="flex-1 text-left truncate">{languageNames[loc]}</span>
                          {currentLocale === loc && (
                            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-neutral-100 bg-white/95 backdrop-blur-lg dark:border-neutral-800 dark:bg-black/95"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{dict.navbar.services}</p>
              <div className="grid grid-cols-1 gap-1">
                {sortedServices.map((service) => (
                  <div
                    key={service.name}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(getLocalizedHref(service.href));
                    }}
                    className="flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 transition-transform group-hover:scale-110", service.color)}>
                          {service.icon}
                      </div>
                      <span className="text-base font-bold text-neutral-900 dark:text-white">
                          {isMounted ? service.name : (service.href === '/bio' ? 'Bio' : service.name)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
