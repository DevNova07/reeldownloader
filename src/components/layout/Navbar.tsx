"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Camera, ChevronDown, ChevronRight, Menu, X, Globe, Ghost, Send, Play, Hash, Music, History, Sparkles, Compass, TrendingUp, Layers, FileText, LayoutGrid, PenTool, Zap, BookOpen, Scale, AlertCircle, ShieldAlert, Settings, Info, Type, Link2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn"
import { usePathname, useRouter } from "next/navigation"
import { locales, languageNames, languageFlags, type Locale } from "@/i18n"
import { PLATFORM_NAV_CONFIG } from "@/lib/nav-config"

export function Navbar({ dict }: { dict: any }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLangOpen, setIsLangOpen] = React.useState(false)
  const [isSettingsExpanded, setIsSettingsExpanded] = React.useState(false)
  const [isAIToolsExpanded, setIsAIToolsExpanded] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentLocale = React.useMemo(() => {
    if (!pathname) return 'en';
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
    if (currentLocale === 'en') return cleanPath
    return `/${currentLocale}${cleanPath === '/' ? '' : cleanPath}`
  }

  const handleLanguageChange = (locale: string) => {
    if (!pathname) return;
    setIsLangOpen(false);
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    const targetPath = segments.join('/') || '/';
    router.push(targetPath.startsWith('/') ? targetPath : `/${targetPath}`);
  };

  const openHistory = () => {
    window.dispatchEvent(new CustomEvent('toggle-history-drawer'));
  };

  const services = React.useMemo(() => [
    { name: dict?.navbar?.home || "Home", href: "/", icon: <Compass className="h-4 w-4" />, color: "text-indigo-600", category: 'home', group: 'other' },
    { name: "Blog", href: "/blog", icon: <BookOpen className="h-4 w-4" />, color: "text-orange-600", category: 'blog', group: 'other' },
    { name: dict?.categories?.insta || "Instagram", href: "/instagram-video-downloader", icon: <Camera className="h-4 w-4" />, color: "text-pink-600", category: 'insta', group: 'downloader' },
    { name: dict?.categories?.fb || "Facebook", href: "/facebook-video-downloader", icon: <Globe className="h-4 w-4" />, color: "text-blue-600", category: 'fb', group: 'downloader' },
    { name: dict?.categories?.snap || "Snapchat", href: "/snapchat-video-downloader", icon: <Ghost className="h-4 w-4" />, color: "text-yellow-500", category: 'snap', group: 'downloader' },
    { name: dict?.categories?.tele || "Telegram", href: "/telegram-video-downloader", icon: <Send className="h-4 w-4" />, color: "text-sky-500", category: 'tele', group: 'downloader' },
    { name: dict?.categories?.tiktok || "TikTok", href: "/tiktok-video-downloader", icon: <Music className="h-4 w-4" />, color: "text-neutral-900 dark:text-white", category: 'tiktok', group: 'downloader' },
    { name: dict?.categories?.yt || "YouTube", href: "/youtube-video-downloader", icon: <Play className="h-4 w-4 fill-current" />, color: "text-red-600", category: 'yt', group: 'downloader' },
    { name: dict?.categories?.tw || "Twitter", href: "/x-video-downloader", icon: <Hash className="h-4 w-4" />, color: "text-neutral-800 dark:text-neutral-400", category: 'tw', group: 'downloader' },
    { name: dict?.categories?.hashtags || "Hashtags", href: "/hashtags", icon: <Hash className="h-4 w-4" />, color: "text-blue-500", category: 'hashtags', group: 'ai_tools' },
    { name: dict?.categories?.captions || "Captions", href: "/captions", icon: <Type className="h-4 w-4" />, color: "text-purple-500", category: 'captions', group: 'ai_tools' },
    { name: dict?.categories?.bio || "Bio Link", href: "/bio", icon: <Link2 className="h-4 w-4" />, color: "text-green-500", category: 'bio', group: 'ai_tools' },
  ], [dict])


  const platform = React.useMemo(() => {
    const pathWithoutLocale = pathname ? pathname.replace(/^\/[a-z]{2}/, '') || '/' : '/';

    if (pathWithoutLocale.startsWith('/instagram')) return { id: dict?.categories?.insta || "Instagram", prefix: 'Sav', suffix: 'Clip', icon: Camera, bg: 'from-pink-500 to-rose-600', text: 'text-pink-600' }
    if (pathWithoutLocale.startsWith('/facebook')) return { id: dict?.categories?.fb || "Facebook", prefix: 'FB', suffix: 'Clip', icon: Globe, bg: 'from-blue-600 to-blue-800', text: 'text-blue-600' }
    if (pathWithoutLocale.startsWith('/youtube')) return { id: dict?.categories?.yt || "YouTube", prefix: 'YT', suffix: 'Clip', icon: Play, bg: 'from-red-600 to-red-800', text: 'text-red-600' }
    if (pathWithoutLocale.startsWith('/tiktok')) return { id: dict?.categories?.tiktok || "TikTok", prefix: 'Tik', suffix: 'Clip', icon: Music, bg: 'from-neutral-800 to-black', text: 'text-pink-600' }
    if (pathWithoutLocale.startsWith('/twitter')) return { id: dict?.categories?.tw || "Twitter", prefix: 'X', suffix: 'Clip', icon: Hash, bg: 'from-neutral-800 to-black', text: 'text-neutral-900 dark:text-neutral-400' }
    if (pathWithoutLocale.startsWith('/snapchat')) return { id: dict?.categories?.snap || "Snapchat", prefix: 'Snap', suffix: 'Clip', icon: Ghost, bg: 'from-yellow-400 to-yellow-500', text: 'text-yellow-500' }
    if (pathWithoutLocale.startsWith('/telegram')) return { id: dict?.categories?.tele || "Telegram", prefix: 'Tele', suffix: 'Clip', icon: Send, bg: 'from-sky-500 to-blue-600', text: 'text-sky-500' }
    // Default (Home / Generic)
    return { id: "SavClip", prefix: 'Sav', suffix: 'Clip', icon: Sparkles, bg: 'from-indigo-600 to-violet-700', text: 'text-indigo-600' }
  }, [pathname, dict?.categories])

  const sortedServices = React.useMemo(() => {
    return [...services].sort((a, b) => {
      if (a.name === platform.id) return -1
      if (b.name === platform.id) return 1
      return 0
    })
  }, [platform.id, services])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/70 backdrop-blur-xl shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-2 sm:hidden">
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 px-3 py-1.5 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 transition-all bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md shadow-xs active:scale-95"
                >
                  <Globe className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span className="text-xs font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-tight">{currentLocale}</span>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={false}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute inset-inline-start-0 mt-3 w-[min(90vw,320px)] max-h-[80vh] overflow-y-auto rounded-2xl border border-neutral-100 bg-white/80 p-3 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90 z-50"
                    >
                      <div className="grid grid-cols-1 gap-1.5">
                        {locales.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => handleLanguageChange(loc)}
                            className={cn(
                              "group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-bold transition-all",
                              currentLocale === loc
                                ? "bg-linear-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/20"
                                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                            )}
                          >
                            <span className="flex-1 text-left truncate">{languageNames[loc]}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Link prefetch={true} href={getLocalizedHref("/")} className="flex items-center gap-2 group shrink-0 sm:static absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0">
              <div className="hidden sm:flex relative h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-xl group-hover:scale-110 transition-transform bg-white dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20">
                <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 dark:opacity-100" />
                <Image 
                  src="/assets/logo.png" 
                  alt="SavClip Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain relative z-10 dark:brightness-125 dark:drop-shadow-[0_0_8_rgba(59,130,246,0.5)]"
                />
              </div>
              <span className="text-[21px] sm:text-2xl font-black tracking-[0.12em] uppercase text-neutral-900 dark:text-white transition-all duration-300">
                SAV<span className={cn("bg-clip-text text-transparent bg-gradient-to-r inline-block", 
                  platform.text.includes('pink') ? "from-pink-500 via-rose-500 to-rose-600 drop-shadow-[0_2px_10px_rgba(244,63,94,0.4)]" :
                  platform.text.includes('blue') ? "from-blue-500 via-indigo-500 to-indigo-600 drop-shadow-[0_2px_10px_rgba(59,130,246,0.4)]" :
                  platform.text.includes('red') ? "from-red-500 via-rose-500 to-rose-600 drop-shadow-[0_2px_10px_rgba(239,68,68,0.4)]" :
                  platform.text.includes('yellow') ? "from-yellow-400 via-amber-500 to-amber-600 drop-shadow-[0_2px_10px_rgba(234,179,8,0.4)]" :
                  platform.text.includes('sky') ? "from-sky-400 via-blue-500 to-blue-600 drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]" :
                  "from-pink-500 via-purple-500 to-indigo-600 drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)]"
                )}>{platform.suffix}</span>
              </span>
            </Link>

            {/* Desktop Service Links */}
            <div className="hidden xl:flex items-center gap-5 ms-4">
              {sortedServices
                .filter(s => s.category !== 'captions' && s.category !== 'bio')
                .map((service) => {
                  const navData = PLATFORM_NAV_CONFIG[service.category];
                return (
                  <div key={service.name} className="relative group/item">
                    <Link
                      prefetch={true}
                      href={getLocalizedHref(service.href)}
                      className="flex items-center gap-1.5 text-[13px] font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all hover:scale-105 py-4"
                    >
                      <span className={cn("opacity-70", service.color)}>{service.icon}</span>
                      <span className="hidden 2xl:inline">
                        {service.name}
                      </span>
                      {navData && <ChevronDown className="h-3 w-3 opacity-50 group-hover/item:rotate-180 transition-transform" />}
                    </Link>

                    {/* Desktop Hover Dropdown */}
                    {navData && (
                      <div className="absolute top-full left-0 hidden group-hover/item:block pt-2">
                        <div className={cn("w-[600px] grid grid-cols-2 gap-8 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-neutral-100 dark:border-neutral-800", navData.borderColor)}>
                           {navData.categories.map((cat) => (
                             <div key={cat.titleKey} className="flex flex-col gap-4">
                               <p className="text-[10px] font-black tracking-widest text-neutral-400">
                                 {dict.navbar?.[cat.titleKey as keyof typeof dict.navbar] || cat.titleKey}
                               </p>
                               <ul className="flex flex-col gap-2.5">
                                 {cat.links.map((link) => (
                                   <li key={link.label}>
                                     <Link
                                       prefetch={true}
                                       href={getLocalizedHref(link.href)}
                                       className={cn("text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:translate-x-1 transition-all inline-block", navData.hoverColor)}
                                     >
                                       {isMounted ? getLabel(link.href, link.label) : link.label}
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

            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2.5 py-1.5 sm:px-3 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-all hover:scale-105 bg-neutral-50 dark:bg-neutral-900/50 shadow-xs active:scale-95"
              >
                <Globe className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-tight">{currentLocale}</span>
                <ChevronDown className="h-3 w-3 text-neutral-400" />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={false}
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
              onClick={openHistory}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50/40 dark:bg-neutral-900/40 border border-neutral-200/30 dark:border-neutral-800/30 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60 transition-all active:scale-95 text-neutral-600 dark:text-neutral-400 shadow-xs"
              title="My History"
            >
              <History className="h-[18px] w-[18px]" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50/40 dark:bg-neutral-900/40 border border-neutral-200/30 dark:border-neutral-800/30 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60 transition-all active:scale-95 text-neutral-800 dark:text-neutral-200 shadow-xs"
            >
              {isOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-neutral-100 bg-white/95 backdrop-blur-lg dark:border-neutral-800 dark:bg-black/95"
          >
            <div className="mx-auto max-w-7xl px-4 py-8 space-y-10 h-full overflow-y-auto pb-24 scrollbar-none">
              {/* Primary Navigation */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push(getLocalizedHref("/"));
                    }}
                    className="flex items-center gap-4 rounded-3xl border border-pink-500/10 bg-linear-to-br from-pink-50/80 to-white dark:from-pink-900/10 dark:to-neutral-900 px-4 py-4 hover:border-pink-500/30 transition-all cursor-pointer group active:scale-[0.98] shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-pink-600 to-rose-600 text-white shadow-xl shadow-pink-500/30 group-hover:scale-110 transition-transform">
                      <Compass className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-tight">Home</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openHistory();
                    }}
                    className="flex items-center gap-4 rounded-3xl border border-violet-500/10 bg-linear-to-br from-violet-50/80 to-white dark:from-violet-900/10 dark:to-neutral-900 px-4 py-4 hover:border-violet-500/30 transition-all cursor-pointer group active:scale-[0.98] shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/30 group-hover:scale-110 transition-transform">
                      <History className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-tight">History</span>
                  </button>
                </div>
              </div>

              {/* Tools Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                  <div className="h-[2px] w-8 bg-pink-600 rounded-full" />
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400">Download Tools</p>
                </div>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {services.filter(s => s.group === 'downloader').map((service) => (
                    <button
                      key={service.name}
                      onClick={() => {
                        setIsOpen(false);
                        router.push(getLocalizedHref(service.href));
                      }}
                      className="flex items-center justify-between rounded-2xl p-4 transition-all hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700 group active:scale-[0.99] bg-neutral-50/50 dark:bg-neutral-900/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-neutral-200/50 dark:ring-neutral-700/50 transition-all group-hover:scale-110 group-hover:shadow-md", service.color)}>
                          {service.icon}
                        </div>
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-tight">{service.name}</span>
                          <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-tight">Fast Downloader</span>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 group-hover:bg-pink-600 group-hover:text-white transition-all">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences & Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                  <div className="h-[2px] w-8 bg-neutral-400 rounded-full" />
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400">Preferences</p>
                </div>
                
                <button
                  onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl p-4 transition-all border group active:scale-[0.99]",
                    isSettingsExpanded 
                      ? "bg-white dark:bg-neutral-800 border-pink-500/20 shadow-lg shadow-pink-500/5" 
                      : "bg-neutral-50/50 dark:bg-neutral-900/30 border-transparent hover:border-neutral-100 dark:hover:border-neutral-700"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl transition-all shadow-sm",
                      isSettingsExpanded 
                        ? "bg-pink-600 text-white shadow-pink-500/30 scale-110" 
                        : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 ring-1 ring-neutral-200/50 dark:ring-neutral-700/50"
                    )}>
                      <Settings className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-tight">SETTINGS & INFO</span>
                      <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-tight">App Preferences</span>
                    </div>
                  </div>
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                    isSettingsExpanded ? "bg-pink-600 text-white rotate-180" : "bg-neutral-100 dark:bg-neutral-800"
                  )}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isSettingsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 space-y-6 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-2xl shadow-pink-500/5 mx-1">
                        {/* Toggles */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-1">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                                <LayoutGrid className="h-5 w-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-tight">Media Previews</span>
                                <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Show thumbnails</span>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer scale-110">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-pink-600 shadow-inner"></div>
                            </label>
                          </div>
                        </div>

                        {/* Footer Links */}
                        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4 px-1 text-center">Company Info</p>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { name: "About Us", href: "/about", icon: <Info className="h-3 w-3" /> },
                              { name: "Contact", href: "/contact", icon: <Hash className="h-3 w-3" /> },
                              { name: "Privacy", href: "/privacy-policy", icon: <ShieldAlert className="h-3 w-3" /> },
                              { name: "Terms", href: "/terms", icon: <Scale className="h-3 w-3" /> },
                              { name: "Disclaimer", href: "/disclaimer", icon: <AlertCircle className="h-3 w-3" /> },
                              { name: "DMCA", href: "/dmca", icon: <AlertCircle className="h-3 w-3" /> }
                            ].map((link) => (
                              <button
                                key={link.name}
                                onClick={() => {
                                  setIsOpen(false);
                                  router.push(getLocalizedHref(link.href));
                                }}
                                className="flex items-center gap-2.5 rounded-xl px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 transition-all text-neutral-500 dark:text-neutral-400"
                              >
                                {link.icon}
                                <span className="text-[11px] font-black uppercase tracking-tighter">{link.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
