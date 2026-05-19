"use client"

import Image from "next/image"
import Link from "next/link"
import { Camera, Send, Mail, Globe, ShieldCheck, Zap, HelpCircle, HardDrive, Share2, Apple as AppleIcon, Music, Play, Ghost, Hash, Instagram } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import { locales, languageNames, languageFlags, type Locale } from "@/i18n"
import { ReactNode } from "react"

export function Footer({ locale, dict }: { locale: string, dict: any }) {
  const normalizedLocale = (locales.includes(locale as any) ? locale : 'en') as Locale;
  const pathname = usePathname() || "";
  
  const branding = dict?.footer_branding || {
    title: "SavClip – Fast & Secure",
    desc: "A trusted platform to save and manage social media content.",
    platforms_title: "Supported Platforms",
    features_title: "Features",
    features: ["No Login", "Fast", "HD", "Multi-Platform"]
  }

  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    if (normalizedLocale === 'en') return cleanPath
    return `/${normalizedLocale}${cleanPath === '/' ? '' : cleanPath}`
  }

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-900 dark:bg-black/95 relative overflow-hidden">
      {/* Structural Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-pink-500/50 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Branding & Philosophy */}
          <div className="lg:col-span-8 space-y-8">
            <Link href={getLocalizedHref("/")} className="flex items-center gap-3 group">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <Image 
                  src="/assets/logo.png" 
                  alt="SavClip Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain dark:brightness-125"
                />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic text-neutral-900 dark:text-white">
                Sav<span className={
                  pathname.includes('/facebook') ? 'text-blue-600' :
                  pathname.includes('/youtube') ? 'text-red-600' :
                  pathname.includes('/tiktok') ? 'text-blue-600' :
                  pathname.includes('/snapchat') ? 'text-yellow-500' :
                  pathname.includes('/telegram') ? 'text-sky-500' :
                  pathname.includes('/twitter') ? 'text-neutral-900 dark:text-white' :
                  'text-blue-600'
                }>Clip</span>
              </span>
            </Link>
            
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white uppercase tracking-tight leading-tight">
              {branding.title}
            </h2>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-neutral-500 dark:text-neutral-400 opacity-90">
              {branding.desc}
            </p>

            {/* App Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
               <div className="h-9 w-28 bg-black rounded-lg border border-white/10 flex items-center justify-center p-1.5 cursor-pointer hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-1.5">
                     <Globe className="w-3.5 h-3.5 text-white" />
                     <div className="flex flex-col">
                        <span className="text-[5px] font-black text-white/50 leading-none">Get it on</span>
                        <span className="text-[10px] font-black text-white leading-none">Google Play</span>
                     </div>
                  </div>
               </div>
               <div className="h-9 w-28 bg-black rounded-lg border border-white/10 flex items-center justify-center p-1.5 cursor-pointer hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-1.5">
                     <AppleIcon className="w-3.5 h-3.5 text-white" />
                     <div className="flex flex-col">
                        <span className="text-[5px] font-black text-white/50 leading-none">Download on</span>
                        <span className="text-[10px] font-black text-white leading-none">App Store</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
               <div className="flex flex-col">
                  <p className="text-[10px] font-black tracking-widest uppercase italic text-neutral-400 mb-1">Founder / CEO</p>
                  <p className="text-sm font-black text-neutral-900 dark:text-white">Ramzan Ahmad</p>
                  <p className="text-[9px] font-bold text-neutral-500 tracking-tighter uppercase italic">Web Developer | 3+ Years Exp.</p>
               </div>
               <div className="hidden sm:block h-12 w-px bg-neutral-100 dark:bg-neutral-800" />
               <div className="flex flex-col">
                  <p className="text-[10px] font-black tracking-widest uppercase italic text-neutral-400 mb-1">Direct Contact</p>
                  <Link href="mailto:ramzaan0043@gmail.com" className="text-sm font-black text-pink-600 hover:underline">ramzaan0043@gmail.com</Link>
                  <p className="text-[9px] font-bold text-neutral-500 tracking-tighter uppercase italic">Response Time: 24h</p>
               </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Legal */}
          <div className="lg:col-span-4">
             <h3 className="text-sm font-bold tracking-wider text-neutral-900 dark:text-white mb-8 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded inline-block">
                Company & Legal
             </h3>
             <ul className="grid grid-cols-1 gap-4">
                {[
                        { name: "About SavClip", href: "/about" },
                        { name: "SavClip Blog", href: "/blog" },
                        { name: "Contact Support", href: "/contact" },
                        { name: "Privacy Policy", href: "/privacy-policy" },
                        { name: "Terms & Service", href: "/terms" },
                        { name: "Disclaimer", href: "/disclaimer" },
                        { name: "DMCA Report", href: "/dmca" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={getLocalizedHref(link.href)} prefetch={true} className="text-sm font-bold text-neutral-500 hover:text-pink-600 dark:text-neutral-400 transition-all hover:translate-x-1 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>
        </div>

        {/* --- GLOBAL TOOLS EXPLORER (Platform-Centric) --- */}
        <div className="mt-20 space-y-24 border-t border-neutral-100 dark:border-neutral-800 pt-20">

          {/* Instagram Section */}
          <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start">
                <h3 className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.4em] text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-2.5 border border-pink-100 dark:border-pink-800/30">
                   <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                   Instagram Platform Explorer
                </h3>
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-400" suppressHydrationWarning={true}>14 Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                  {[
                        { name: "Instagram Video Downloader", href: "/instagram-video-downloader" },
                        { name: "Instagram Reels Downloader", href: "/instagram-reels-downloader" },
                        { name: "Instagram Photo Downloader", href: "/instagram-photo-downloader" },
                        { name: "Instagram Highlights Downloader", href: "/instagram-highlights-downloader" },
                        { name: "Instagram Audio Downloader", href: "/instagram-audio-downloader" },
                        { name: "Instagram Private Downloader", href: "/instagram-private-downloader" },
                        { name: "Instagram Video Compressor", href: "/instagram-video-compressor" },
                        { name: "Instagram Carousel Downloader", href: "/instagram-carousel-downloader" },
                        { name: "Instagram Profile Viewer", href: "/instagram-profile-viewer" },
                        { name: "Instagram Story Viewer", href: "/instagram-story-viewer" },
                        ].map((link) => (
                  <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-xs font-medium text-neutral-400 hover:text-pink-600 transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-pink-600 transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>


          {/* Facebook Section */}
          <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start">
                <h3 className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.4em] text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-2.5 border border-blue-100 dark:border-blue-800/30">
                   <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                   Facebook Platform Explorer
                </h3>
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-400" suppressHydrationWarning={true}>15 Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                  {[
                        { name: "Facebook Video Downloader", href: "/facebook-video-downloader" },
                        { name: "Facebook Reels Downloader", href: "/facebook-reels-downloader" },
                        { name: "Facebook Story Saver", href: "/facebook-story-saver" },
                        { name: "Facebook Private Video Downloader", href: "/facebook-private-video-downloader" },
                        { name: "Facebook Photo Downloader", href: "/facebook-photo-downloader" },
                        { name: "Facebook Album Downloader", href: "/facebook-album-downloader" },
                        { name: "Facebook Live Video Downloader", href: "/facebook-live-video-downloader" },
                        { name: "Facebook DP Downloader", href: "/facebook-dp-downloader" },
                        { name: "Facebook Group Video Downloader", href: "/facebook-group-video-downloader" },
                        { name: "Facebook Audio Downloader", href: "/facebook-audio-downloader" },
                        { name: "Facebook Profile Viewer", href: "/facebook-profile-viewer" },
                        { name: "Facebook Video Compressor", href: "/facebook-video-compressor" },
                        { name: "Facebook Page Audit Tool", href: "/facebook-page-audit-tool" }
                  ].map((link) => (
                    <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-blue-600 transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>


          {/* TikTok Section */}
          <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start">
                <h3 className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.4em] text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-2.5 border border-neutral-100 dark:border-neutral-800/30">
                   <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                   TikTok Platform Explorer
                </h3>
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-400" suppressHydrationWarning={true}>15 Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                  {[
                        { name: "TikTok Video Downloader", href: "/tiktok-video-downloader" },
                        { name: "TikTok Shorts Downloader", href: "/tiktok-shorts-downloader" },
                        { name: "TikTok MP3 Downloader", href: "/tiktok-mp3-downloader" },
                        { name: "TikTok Story Saver", href: "/tiktok-story-saver" },
                        { name: "TikTok Photo Downloader", href: "/tiktok-photo-downloader" },
                        { name: "TikTok DP Downloader", href: "/tiktok-dp-downloader" },
                        { name: "Anonymous TikTok Viewer", href: "/anonymous-tiktok-viewer" },
                        { name: "TikTok Private Video Downloader", href: "/tiktok-private-video-downloader" },
                        { name: "TikTok Trending Hashtag Generator", href: "/tiktok-trending-hashtag-generator" },
                        { name: "TikTok Caption Generator", href: "/tiktok-caption-generator" },
                        { name: "TikTok Video Compressor", href: "/tiktok-video-compressor" },
                        { name: "TikTok Song Finder", href: "/tiktok-song-finder" },
                        ].map((link) => (
                    <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-black dark:group-hover:bg-white transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>


          {/* YouTube Section */}
          <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start">
                <h3 className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.4em] text-red-600 bg-red-50 dark:bg-red-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-2.5 border border-red-100 dark:border-red-800/30">
                   <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                   YouTube Platform Explorer
                </h3>
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-400" suppressHydrationWarning={true}>12 Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                  {[
                        { name: "YouTube Video Downloader", href: "/youtube-video-downloader" },
                        { name: "YouTube Shorts Downloader", href: "/youtube-shorts-downloader" },
                        { name: "YouTube to MP3 Converter", href: "/youtube-to-mp3-converter" },
                        { name: "YouTube Thumbnail Downloader", href: "/youtube-thumbnail-downloader" },
                        { name: "YouTube Playlist Downloader", href: "/youtube-playlist-downloader" },
                        { name: "YouTube Subtitle Downloader", href: "/youtube-subtitle-downloader" },
                        { name: "YouTube Channel Audit Tool", href: "/youtube-channel-audit-tool" },
                        { name: "YouTube Region Restriction Checker", href: "/youtube-region-restriction-checker" },
                        { name: "YouTube Video Cutter", href: "/youtube-video-cutter" },
                        { name: "YouTube Comment Picker", href: "/youtube-comment-picker" },
                        ].map((link) => (
                    <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-red-600 transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-red-600 transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>


          {/* Snapchat Section */}
          <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start">
                <h3 className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.4em] text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-2.5 border border-yellow-100 dark:border-yellow-800/30">
                   <Ghost className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                   Snapchat Platform Explorer
                </h3>
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-400" suppressHydrationWarning={true}>15 Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                  {[
                        { name: "Snapchat Video Downloader", href: "/snapchat-video-downloader" },
                        { name: "Snapchat Spotlight Downloader", href: "/snapchat-spotlight-downloader" },
                        { name: "Snapchat Story Downloader", href: "/snapchat-stories-downloader" },
                        { name: "Snapchat Photo Downloader", href: "/snapchat-photo-downloader" },
                        { name: "Snapchat MP3 Downloader", href: "/snapchat-audio-downloader" },
                        { name: "Snapchat DP Downloader", href: "/snapchat-dp-downloader" },
                        { name: "Snapchat Map Downloader", href: "/snapchat-map-downloader" },
                        { name: "Snapchat Lens Saver", href: "/snapchat-lens-saver" },
                        { name: "Snapchat Private Story Downloader", href: "/snapchat-private-story-downloader" },
                        { name: "Snapchat Video Compressor", href: "/snapchat-video-compressor" },
                        { name: "Snapchat Profile Viewer", href: "/snapchat-profile-viewer" },
                        { name: "Snapchat Memories Downloader", href: "/snapchat-memories-downloader" },
                        ].map((link) => (
                    <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-yellow-600 transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-yellow-600 transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>


          {/* X Section */}
          <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start">
                <h3 className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.4em] text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-2.5 border border-neutral-100 dark:border-neutral-800/30">
                   <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                   X Platform Explorer
                </h3>
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-400" suppressHydrationWarning={true}>15 Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                  {[
                        { name: "X Video Downloader", href: "/x-video-downloader" },
                        { name: "X GIF Downloader", href: "/x-gif-downloader" },
                        { name: "X Media Downloader", href: "/x-media-downloader" },
                        { name: "X Thread Downloader", href: "/x-thread-downloader" },
                        { name: "X Audio Downloader", href: "/x-audio-downloader" },
                        { name: "X Profile Picture Downloader", href: "/x-profile-picture-downloader" },
                        { name: "X Space Downloader", href: "/x-space-downloader" },
                        { name: "X Private Video Downloader", href: "/x-private-video-downloader" },
                        { name: "X Banner Downloader", href: "/x-banner-downloader" },
                        { name: "X Trending Hashtag Finder", href: "/x-trending-hashtag-finder" },
                        { name: "X Analytics Viewer", href: "/x-analytics-viewer" },
                        { name: "X Video Compressor", href: "/x-video-compressor" },
                        { name: "X Bio Generator", href: "/x-bio-generator" },
                        ].map((link) => (
                    <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-black dark:group-hover:bg-white transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>


          {/* Telegram Section */}
          <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start">
                <h3 className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.4em] text-sky-600 bg-sky-50 dark:bg-sky-900/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-2.5 border border-sky-100 dark:border-sky-800/30">
                   <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                   Telegram Platform Explorer
                </h3>
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-400" suppressHydrationWarning={true}>14 Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                  {[
                         { name: "Telegram Video Downloader", href: "/telegram-video-downloader" },
                         { name: "Telegram Photo Downloader", href: "/telegram-photo-downloader" },
                         { name: "Telegram Audio Downloader", href: "/telegram-audio-downloader" },
                         { name: "Telegram Story Saver", href: "/telegram-story-saver" },
                         { name: "Telegram DP Downloader", href: "/telegram-dp-downloader" },
                         { name: "Telegram Private Downloader", href: "/telegram-private-video-downloader" },
                         { name: "Telegram Restricted Content", href: "/telegram-restricted-content-downloader" },
                         { name: "Telegram File Downloader", href: "/telegram-file-downloader" },
                         { name: "Telegram GIF Downloader", href: "/telegram-gif-downloader" },
                         { name: "Telegram Trending Channels", href: "/telegram-trending-channel-finder" },
                         { name: "Telegram Link Generator", href: "/telegram-channel-link-generator" },
                         { name: "Telegram Video Compressor", href: "/telegram-video-compressor" },
                         { name: "Telegram Bio Generator", href: "/telegram-bio-generator" }
                  ].map((link) => (
                    <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-sky-600 transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-sky-600 transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>
        </div>


        {/* Bottom Bar: Final Trust Sign-off */}
        <div suppressHydrationWarning className="mt-4 pt-4 flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2 mb-4">
             <div className="flex h-3 w-3">
                <span className="inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
             </div>
             <p className="text-[10px] font-black tracking-[0.4em] text-neutral-400">
                System Status: <span className="text-green-500">Fully Operational</span>
             </p>
          </div>
          
          <p className="max-w-4xl text-[10px] font-black tracking-[0.2em] text-pink-600/80 mb-6 px-4">
            SavClip is maintained by Ramzan Ahmad, built with Next.js for ultimate speed & security.
          </p>
          


          <p className="text-sm font-bold tracking-wider text-neutral-900 dark:text-white" suppressHydrationWarning>
            © {new Date().getFullYear()} SavClip. Global Authority in Media Extraction.
          </p>

          <div className="max-w-4xl w-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 p-8 rounded-3xl space-y-6">
             <div className="flex items-center justify-center gap-4 text-pink-600">
                <ShieldCheck className="h-5 w-5" />
                <h4 className="text-xs font-black tracking-[0.4em] m-0">Legal Protection Shield</h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-neutral-900 dark:text-white">Zero Hosting Policy</p>
                   <p className="text-[9px] font-bold text-neutral-400 leading-relaxed">We do not host any files or media on our servers. All content is fetched directly from social platforms.</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-neutral-900 dark:text-white">Ownership Rights</p>
                   <p className="text-[9px] font-bold text-neutral-400 leading-relaxed">All content and trademarks belong to their respective owners. We respect intellectual property rights.</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-neutral-900 dark:text-white">Ethical Usage</p>
                   <p className="text-[9px] font-bold text-neutral-400 leading-relaxed">This tool is intended for educational and personal use only. Unauthorized distribution is discouraged.</p>
                </div>
             </div>
          </div>
          
          <p className="max-w-5xl text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase px-4 leading-relaxed opacity-60">
            Disclaimer: SavClip is an independent tool and is not affiliated, associated, or endorsed by YouTube, Instagram, TikTok, Facebook, Snapchat, X, or Telegram.
          </p>
        </div>
      </div>
    </footer>
  )
}
