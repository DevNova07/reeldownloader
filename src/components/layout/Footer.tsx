"use client"

import Link from "next/link"
import { Camera, Send, Mail, Globe, ShieldCheck, Zap, HelpCircle, HardDrive, Share2, CloudDownload, Apple as AppleIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { locales, type Locale } from "@/i18n"
import { ReactNode } from "react"

export function Footer({ children, locale, dict }: { children?: React.ReactNode, locale: string, dict: any }) {
  const normalizedLocale = (locales.includes(locale as any) ? locale : 'en') as Locale;
  
  const branding = dict.footer_branding || {
    title: "SavClip – Fast & Secure",
    desc: "A trusted platform to save and manage social media content.",
    platforms_title: "Supported Platforms",
    features_title: "Features",
    features: ["No Login", "Fast", "HD", "Multi-Platform"]
  }

  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    if (normalizedLocale === 'en' && cleanPath === '/') return '/'
    return `/${normalizedLocale}${cleanPath === '/' ? '' : cleanPath}`
  }

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-900 dark:bg-black/95 relative overflow-hidden">
      {/* Structural Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-pink-500/50 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Branding & Philosophy */}
          <div className="lg:col-span-4 space-y-8">
            <Link href={getLocalizedHref("/")} className="flex items-center gap-3 group">
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.25rem] bg-linear-to-tr from-[#cc00ff] to-[#ff0080] shadow-2xl group-hover:scale-105 transition-transform duration-500">
                 <CloudDownload className="h-7 w-7 text-white" />
                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase italic">
                Sav<span className="text-pink-600">Clip</span>
              </span>
            </Link>
            
            <h2 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter leading-tight">
              {branding.title}
            </h2>
            <p className="max-w-sm text-sm font-bold leading-relaxed text-neutral-500 dark:text-neutral-400 opacity-90">
              {branding.desc}
            </p>

            {/* App Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
               <div className="h-9 w-28 bg-black rounded-lg border border-white/10 flex items-center justify-center p-1.5 cursor-pointer hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-1.5">
                     <Globe className="w-3.5 h-3.5 text-white" />
                     <div className="flex flex-col">
                        <span className="text-[5px] font-black text-white/50 uppercase leading-none">Get it on</span>
                        <span className="text-[10px] font-black text-white leading-none">Google Play</span>
                     </div>
                  </div>
               </div>
               <div className="h-9 w-28 bg-black rounded-lg border border-white/10 flex items-center justify-center p-1.5 cursor-pointer hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-1.5">
                     <AppleIcon className="w-3.5 h-3.5 text-white" />
                     <div className="flex flex-col">
                        <span className="text-[5px] font-black text-white/50 uppercase leading-none">Download on</span>
                        <span className="text-[10px] font-black text-white leading-none">App Store</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
               <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Founder / CEO</p>
                  <p className="text-sm font-black text-neutral-900 dark:text-white italic">Ramzan Ahmad</p>
                  <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">Web Developer | 3+ Years Exp.</p>
               </div>
               <div className="h-12 w-px bg-neutral-100 dark:bg-neutral-800" />
               <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Direct Contact</p>
                  <Link href="mailto:ramzaan0043@gmail.com" className="text-sm font-black text-pink-600 hover:underline">ramzaan0043@gmail.com</Link>
                  <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">Response Time: 24h</p>
               </div>
            </div>
          </div>

          {/* Column 2: Supported Platforms */}
          <div className="lg:col-span-3">
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900 dark:text-white mb-8 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded inline-block">
                {branding.platforms_title}
             </h3>
             <ul id="footer-platforms-list" suppressHydrationWarning={true} className="grid grid-cols-1 gap-4">
                {[
                  { name: "YouTube", icon: <Zap className="h-4 w-4" />, href: "/youtube" },
                  { name: "Instagram", icon: <Camera className="h-4 w-4" />, href: "/instagram" },
                  { name: "TikTok", icon: <Share2 className="h-4 w-4" />, href: "/tiktok" },
                  { name: "Facebook", icon: <Globe className="h-4 w-4" />, href: "/facebook" },
                  { name: "Snapchat", icon: <Camera className="h-4 w-4" />, href: "/snapchat" },
                  { name: "Twitter / X", icon: <Share2 className="h-4 w-4" />, href: "/twitter" },
                  { name: "Telegram", icon: <Send className="h-4 w-4" />, href: "/telegram" }
                ].map((plat) => (
                  <li key={plat.name}>
                    <Link href={getLocalizedHref(plat.href)} className="flex items-center gap-3 text-sm font-bold text-neutral-500 hover:text-pink-600 dark:text-neutral-400 transition-all hover:translate-x-1 group">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-500">{plat.icon}</span>
                      {plat.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div className="lg:col-span-2">
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900 dark:text-white mb-8 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded inline-block">
                Quick Links
             </h3>
             <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms & Service", href: "/terms" },
                  { name: "Disclaimer", href: "/disclaimer" },
                  { name: "DMCA", href: "/dmca" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={getLocalizedHref(link.href)} className="text-sm font-bold text-neutral-500 hover:text-pink-600 dark:text-neutral-400 transition-all hover:translate-x-1 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* New Column: Top Locations */}
          <div className="lg:col-span-3">
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900 dark:text-white mb-8 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded inline-block">
                Top Locations
             </h3>
             <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
                {[
                  { name: "India", href: "/instagram-downloader-india" },
                  { name: "USA", href: "/facebook-downloader-usa" },
                  { name: "Brazil", href: "/instagram-downloader-brazil" },
                  { name: "Indonesia", href: "/instagram-downloader-indonesia" },
                  { name: "Pakistan", href: "/reels-downloader-pakistan" },
                  { name: "Mexico", href: "/instagram-downloader-mexico" },
                  { name: "Turkey", href: "/instagram-downloader-turkey" },
                  { name: "Germany", href: "/instagram-downloader-germany" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={getLocalizedHref(link.href)} className="text-[12px] font-bold text-neutral-500 hover:text-pink-600 dark:text-neutral-400 transition-all hover:translate-x-1 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* New Column: Premium Tools */}
          <div className="lg:col-span-12 mt-10">
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900 dark:text-white mb-8 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded inline-block">
                Premium Tools
             </h3>
             <div className="flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { name: "4K Video Downloader", href: "/instagram-4k-video-downloader" },
                  { name: "No Ads Facebook Saver", href: "/facebook-no-ads-downloader" },
                  { name: "YouTube MP3 320kbps", href: "/youtube-mp3-320kbps" },
                  { name: "TikTok No Login", href: "/tiktok-video-saver-no-login" },
                  { name: "Bulk Reels Saver", href: "/instagram-bulk-reels-download" },
                  { name: "Snapchat Spotlight HD", href: "/snapchat-spotlight-saver-hd" },
                  { name: "Private Insta Saver", href: "/instagram-private-instagram-video-saver" },
                  { name: "Twitter X Video Saver", href: "/twitter-video-saver-x" },
                  { name: "High Speed Insta", href: "/instagram-high-speed-downloader" },
                ].map((link) => (
                  <Link key={link.name} href={getLocalizedHref(link.href)} className="text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-pink-600 transition-colors">
                    {link.name}
                  </Link>
                ))}
             </div>
          </div>
        </div>

        {/* Dynamic Mega Map Injection */}
        {children && (
          <div suppressHydrationWarning className="mt-0 pt-0">
             {children}
          </div>
        )}

        {/* Bottom Bar: Final Trust Sign-off */}
        <div suppressHydrationWarning className="mt-4 pt-4 flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2 mb-4">
             <div className="flex h-3 w-3">
                <span className="inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">
                System Status: <span className="text-green-500">Fully Operational</span>
             </p>
          </div>
          
          <p className="max-w-4xl text-[10px] font-black uppercase tracking-[0.2em] text-pink-600/80 mb-6 px-4">
            SavClip is maintained by Ramzan Ahmad, built with Next.js for ultimate speed & security.
          </p>
          
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900 dark:text-white">
            © {new Date().getFullYear()} SavClip. Global Authority in Media Extraction.
          </p>
          
          <p className="max-w-4xl text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest px-4 leading-relaxed opacity-60">
            Disclaimer: SavClip is not affiliated with YouTube, Instagram, TikTok, Facebook, Snapchat, X, or Telegram. We do not host any copyrighted content on our servers. This tool is intended for personal use and fair-use educational purposes.
          </p>
        </div>
      </div>
    </footer>
  )
}
