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
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-xl group-hover:scale-110 transition-transform">
                <Image 
                  src="/icon.png" 
                  alt="SavClip Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
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
            
            <h2 className="text-lg font-black text-neutral-900 dark:text-white tracking-tighter uppercase italic leading-tight">
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
          </div>          {/* Column 2: Quick Links & Legal */}
          <div className="lg:col-span-3">
             <h3 className="text-[11px] font-black tracking-[0.3em] text-neutral-900 dark:text-white mb-8 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded inline-block">
                Company & Legal
             </h3>
             <ul className="grid grid-cols-1 gap-4">
                {[
                       { name: "About SavClip", href: "/about" },
                       { name: "Contact Support", href: "/contact" },
                       { name: "Official Blog", href: "/blog" },
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

          {/* Column 3: Premium Features */}
          <div className="lg:col-span-4">
             <h3 className="text-[11px] font-black tracking-[0.3em] text-neutral-900 dark:text-white mb-8 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded inline-block">
                Premium Tools
             </h3>
             <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                       { name: "Reel Script AI", href: "/reel-script" },
                       { name: "Viral Hook AI", href: "/viral-hooks" },
                       { name: "Trending AI", href: "/trending" },
                       { name: "Pro Bulk Downloader", href: "/bulk-downloader" },
                       { name: "No Ads Facebook", href: "/facebook-no-ads-downloader" },
                       { name: "YouTube MP3 320k", href: "/youtube-mp3-320kbps" },
                       { name: "4K Insta Saver", href: "/instagram-4k-video-downloader" },
                       { name: "Link-in-Bio", href: "/bio" },
                       { name: "AI Hashtags", href: "/hashtags" },
                ].map((link) => (
                  <Link key={link.name} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-black tracking-widest uppercase italic text-neutral-400 hover:text-pink-600 transition-colors">
                    {link.name}
                  </Link>
                ))}
             </div>
          </div>
        </div>

        {/* --- GLOBAL TOOLS EXPLORER (Platform-Centric) --- */}
        <div className="mt-20 space-y-24 border-t border-neutral-100 dark:border-neutral-800 pt-20">
                   {/* 1. Instagram Section */}
          {/* 1. Instagram Section */}
          <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.4em] text-neutral-900 dark:text-white bg-pink-50 dark:bg-pink-900/20 px-5 py-2.5 rounded-full inline-flex items-center gap-3 border border-pink-100 dark:border-pink-800/30">
                   <Instagram className="w-4 h-4 text-pink-600" />
                   Instagram Platform Explorer
                </h3>
                <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400" suppressHydrationWarning={true}>80+ Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                 {[
                       { name: "Instagram Downloader", href: "/instagram-downloader" },
                       { name: "Reels Download", href: "/instagram-reels-download" },
                       { name: "Story Download", href: "/instagram-story-download" },
                       { name: "Video Download", href: "/instagram-video-download" },
                       { name: "Photo Download", href: "/instagram-photo-download" },
                       { name: "IGTV Download", href: "/instagram-igtv-download" },
                       { name: "Highlights Save", href: "/instagram-highlights-download" },
                       { name: "Audio Download", href: "/instagram-audio-download" },
                       { name: "Album Download", href: "/instagram-album-download" },
                       { name: "Carousel Save", href: "/instagram-carousel-download" },
                       { name: "Profile Picture", href: "/instagram-profile-picture-download" },
                       { name: "DP Download HD", href: "/instagram-dp-download-hd" },
                       { name: "Private Video", href: "/instagram-private-video-download" },
                       { name: "Private Story", href: "/instagram-private-story-download" },
                       { name: "Bulk Download", href: "/instagram-bulk-download" },
                       { name: "Bulk Reels", href: "/instagram-bulk-reels-download" },
                       { name: "Bulk Video", href: "/instagram-bulk-video-download" },
                       { name: "Anonymous Viewer", href: "/instagram-anonymous-story-viewer" },
                       { name: "Profile Viewer", href: "/instagram-profile-viewer" },
                       { name: "Story Viewer", href: "/instagram-story-viewer-anonymous" },
                       { name: "Reel Converter", href: "/instagram-reel-converter" },
                       { name: "Video Converter", href: "/instagram-video-converter" },
                       { name: "MP3 Converter", href: "/instagram-mp3-converter-downloader" },
                       { name: "MP4 Converter", href: "/instagram-mp4-converter-downloader" },
                       { name: "4K Downloader", href: "/instagram-4k-video-downloader" },
                       { name: "HD Video Download", href: "/instagram-video-download-hd" },
                       { name: "HD Photo Download", href: "/instagram-photo-download-hd" },
                       { name: "HD Story Download", href: "/instagram-story-download-hd" },
                       { name: "No Watermark", href: "/instagram-reels-download-without-watermark" },
                       { name: "No Ads Downloader", href: "/instagram-no-ads-downloader" },
                       { name: "High Speed", href: "/instagram-high-speed-downloader" },
                       { name: "Unlimited Save", href: "/instagram-unlimited-downloader" },
                       { name: "Safe Downloader", href: "/instagram-safe-downloader" },
                       { name: "Gallery Saver", href: "/instagram-gallery-saver-downloader" },
                       { name: "Thumbnail Downloader", href: "/instagram-thumbnail-downloader" },
                       { name: "Video MP4 Save", href: "/instagram-video-mp4" },
                       { name: "Reels MP4 Save", href: "/instagram-reels-mp4" },
                       { name: "Reels to MP3", href: "/instagram-reels-to-mp3" },
                       { name: "Audio HD Save", href: "/instagram-hd-audio-downloader" },
                       { name: "Link Downloader", href: "/instagram-link-downloader" },
                       { name: "Video Saver", href: "/instagram-video-saver" },
                       { name: "Reels Saver", href: "/instagram-reels-saver" },
                       { name: "Story Saver", href: "/instagram-story-saver" },
                       { name: "IGTV Saver", href: "/instagram-igtv-saver" },
                       { name: "India Special", href: "/instagram-downloader-india" },
                       { name: "USA Special", href: "/instagram-downloader-usa" },
                       { name: "Brazil Special", href: "/instagram-downloader-brazil" },
                       { name: "Indonesia Special", href: "/instagram-downloader-indonesia" },
                       { name: "Turkey Special", href: "/instagram-downloader-turkey" },
                       { name: "Russia Special", href: "/instagram-downloader-russia" },
                       { name: "Japan Special", href: "/instagram-downloader-japan" },
                       { name: "Germany Special", href: "/instagram-downloader-germany" },
                       { name: "France Special", href: "/instagram-downloader-france" },
                       { name: "Italy Special", href: "/instagram-downloader-italy" },
                       { name: "Spain Special", href: "/instagram-downloader-spain" },
                       { name: "Mexico Special", href: "/instagram-downloader-mexico" },
                       { name: "Canada Special", href: "/instagram-downloader-canada" },
                       { name: "Australia Special", href: "/instagram-downloader-australia" },
                       { name: "Korea Special", href: "/instagram-downloader-korea" },
                       { name: "Thailand Special", href: "/instagram-downloader-thailand" },
                       { name: "Vietnam Special", href: "/instagram-downloader-vietnam" },
                       { name: "Egypt Special", href: "/instagram-downloader-egypt" },
                       { name: "Nigeria Special", href: "/instagram-downloader-nigeria" },
                       { name: "South Africa Special", href: "/instagram-downloader-south-africa" },
                       { name: "Philippines Special", href: "/instagram-downloader-philippines" },
                       { name: "4K Video Pro", href: "/instagram-video-download-4k" },
                       { name: "HD Photo Pro", href: "/instagram-photo-downloader" },
                       { name: "Private Pro", href: "/instagram-private-video" },
                       { name: "Story No Watermark", href: "/instagram-story-download-without-watermark" },
                       { name: "Reels No Watermark", href: "/instagram-video-without-watermark" },
                       { name: "Video APK", href: "/instagram-video-apk" },
                       { name: "Downloader APK", href: "/instagram-video-downloader-apk" },
                       { name: "No Login Reels", href: "/instagram-reels-no-login" },
                       { name: "Short Video Save", href: "/instagram-short-video-download" },
                       { name: "DP Saver", href: "/instagram-dp-download" },
                       { name: "IGTV Downloader", href: "/instagram-igtv-downloader" },
                       { name: "Image Downloader", href: "/instagram-image-downloader" },
                       { name: "Reels Download HD", href: "/instagram-reels-download-hd" },
                 ].map((link) => (
                   <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-pink-600 dark:text-neutral-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2 group">
                     <div className="w-1 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-pink-600 transition-colors" />
                     {link.name}
                   </Link>
                 ))}
              </div>
          </div>

          {/* 2. Facebook Section */}
          <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.4em] text-neutral-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 px-5 py-2.5 rounded-full inline-flex items-center gap-3 border border-blue-100 dark:border-blue-800/30">
                   <Globe className="w-4 h-4 text-blue-600" />
                   Facebook Platform Explorer
                </h3>
                <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400" suppressHydrationWarning={true}>60+ Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                 {[
                       { name: "Facebook Downloader", href: "/facebook-downloader" },
                       { name: "Video Download HD", href: "/facebook-video-download-hd" },
                       { name: "Reels Download", href: "/facebook-reels-download" },
                       { name: "Story Download", href: "/facebook-story-download" },
                       { name: "Video Saver Online", href: "/facebook-video-saver-online" },
                       { name: "Reels Downloader", href: "/facebook-reels-downloader" },
                       { name: "Story Downloader", href: "/facebook-story-downloader" },
                       { name: "Live Video Save", href: "/facebook-live-video-downloader" },
                       { name: "Private Video Pro", href: "/facebook-private-video-downloader" },
                       { name: "HD Video Downloader", href: "/facebook-hd-video-downloader" },
                       { name: "Online Video Save", href: "/download-facebook-video-online" },
                       { name: "Reels No Watermark", href: "/facebook-reels-no-watermark" },
                       { name: "Gallery Saver", href: "/facebook-gallery-saver-downloader" },
                       { name: "No Login Save", href: "/facebook-video-download-without-login" },
                       { name: "Video HD 1080p", href: "/facebook-video-download-hd-1080p" },
                       { name: "4K Downloader", href: "/facebook-video-download-4k" },
                       { name: "MP3 Converter", href: "/facebook-video-to-mp3-converter" },
                       { name: "Audio Downloader", href: "/facebook-audio-downloader" },
                       { name: "Thumbnail Save", href: "/facebook-video-thumbnail-downloader" },
                       { name: "Video Saver", href: "/facebook-video-saver" },
                       { name: "Australia Special", href: "/facebook-downloader-australia" },
                       { name: "Canada Special", href: "/facebook-downloader-canada" },
                       { name: "Egypt Special", href: "/facebook-downloader-egypt" },
                       { name: "France Special", href: "/facebook-downloader-france" },
                       { name: "Germany Special", href: "/facebook-downloader-germany" },
                       { name: "Italy Special", href: "/facebook-downloader-italy" },
                       { name: "Japan Special", href: "/facebook-downloader-japan" },
                       { name: "Korea Special", href: "/facebook-downloader-korea" },
                       { name: "Mexico Special", href: "/facebook-downloader-mexico" },
                       { name: "Nigeria Special", href: "/facebook-downloader-nigeria" },
                       { name: "Philippines Special", href: "/facebook-downloader-philippines" },
                       { name: "Russia Special", href: "/facebook-downloader-russia" },
                       { name: "South Africa Special", href: "/facebook-downloader-south-africa" },
                       { name: "Spain Special", href: "/facebook-downloader-spain" },
                       { name: "Thailand Special", href: "/facebook-downloader-thailand" },
                       { name: "Turkey Special", href: "/facebook-downloader-turkey" },
                       { name: "Vietnam Special", href: "/facebook-downloader-vietnam" },
                       { name: "4K Video Pro", href: "/facebook-4k-video-downloader" },
                       { name: "HD Audio Save", href: "/facebook-hd-audio-downloader" },
                       { name: "High Speed Pro", href: "/facebook-high-speed-downloader" },
                       { name: "Link Downloader", href: "/facebook-link-video-downloader" },
                       { name: "MP3 Converter Pro", href: "/facebook-mp3-converter-downloader" },
                       { name: "MP4 Converter Pro", href: "/facebook-mp4-converter-downloader" },
                       { name: "No Ads Downloader", href: "/facebook-no-ads-downloader" },
                       { name: "Photo Download", href: "/facebook-photo-download" },
                       { name: "Private Story", href: "/facebook-private-story-download" },
                       { name: "Private Video HD", href: "/facebook-private-video-downloader-hd" },
                       { name: "Profile Picture", href: "/facebook-profile-picture-viewer" },
                       { name: "Safe Downloader", href: "/facebook-safe-downloader" },
                       { name: "Short Video Save", href: "/facebook-short-video-download" },
                       { name: "Story No Login", href: "/facebook-story-download-without-login" },
                       { name: "Trending Reels", href: "/facebook-trending-reels-download" },
                       { name: "Unlimited Save", href: "/facebook-unlimited-downloader" },
                       { name: "Video India", href: "/facebook-video-download-india" },
                       { name: "Video Link Save", href: "/facebook-video-download-using-link" },
                       { name: "Video APK Save", href: "/facebook-video-downloader-apk" },
                       { name: "Viral Reels Save", href: "/facebook-viral-reels" },
                       { name: "Funny Videos", href: "/facebook-funny-videos-download" },
                       { name: "Bulk Downloader", href: "/facebook-bulk-downloader" },
                 ].map((link) => (
                   <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                     <div className="w-1 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-blue-600 transition-colors" />
                     {link.name}
                   </Link>
                 ))}
              </div>
          </div>          {/* 3. TikTok Section */}
          <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.4em] text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 px-5 py-2.5 rounded-full inline-flex items-center gap-3 border border-neutral-100 dark:border-neutral-800/30">
                   <Music className="w-4 h-4 text-neutral-900 dark:text-white" />
                   TikTok Platform Explorer
                </h3>
                <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400" suppressHydrationWarning={true}>42+ Professional Tools</span>
              </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                    {[
                       { name: "TikTok Downloader", href: "/tiktok" },
                       { name: "HD Video Download", href: "/tiktok/hd" },
                       { name: "Photo Downloader", href: "/tiktok/photo" },
                       { name: "MP3 Downloader", href: "/tiktok/mp3" },
                       { name: "Story Downloader", href: "/tiktok/story" },
                       { name: "Without Watermark", href: "/tiktok-video-download-without-watermark" },
                       { name: "HD TikTok Download", href: "/tiktok-video-download-hd" },
                       { name: "MP4 Video Download", href: "/tiktok-mp4-download" },
                       { name: "TikTok Video Saver", href: "/tiktok-video-saver" },
                       { name: "Online Downloader", href: "/download-tiktok-video-online" },
                       { name: "TikTok Reels Save", href: "/tiktok-reels-download" },
                       { name: "Private Video Save", href: "/tiktok-private-video-download" },
                       { name: "4K Video Pro", href: "/tiktok-4k-video-downloader" },
                       { name: "High Speed Pro", href: "/tiktok-high-speed-downloader" },
                       { name: "No Ads Version", href: "/tiktok-no-ads-downloader" },
                       { name: "Unlimited Downloads", href: "/tiktok-unlimited-downloader" },
                       { name: "Safe & Secure Pro", href: "/tiktok-safe-downloader" },
                       { name: "TikTok to MP3", href: "/tiktok-mp3-converter-downloader" },
                       { name: "Gallery Posts Saver", href: "/tiktok-gallery-saver-downloader" },
                       { name: "TikTok USA Special", href: "/tiktok-download-usa" },
                       { name: "Using Link Pro", href: "/tiktok-video-download-using-link" },
                       { name: "TikTok APK Pro", href: "/tiktok-video-downloader-apk" },
                       { name: "Save from URL", href: "/tiktok-video-download-using-link-v2" },
                       { name: "Short Video Pro", href: "/tiktok-short-video-download" },
                       { name: "No Watermark Pro", href: "/tiktok-download-without-watermark" },
                       { name: "Free Online Save", href: "/tiktok-download-online" },
                       { name: "TikTok Music Save", href: "/tiktok-music" },
                       { name: "Story HD Pro", href: "/tiktok-story" },
                       { name: "MP3 Fast Pro", href: "/tiktok-mp3-download" },
                       { name: "Story Fast Pro", href: "/tiktok-story-download" },
                       { name: "Saver No Login", href: "/tiktok-video-saver-no-login" },
                       { name: "MP4 Converter Pro", href: "/tiktok-mp4-converter-downloader" },
                       { name: "HD Audio Pro", href: "/tiktok-hd-audio-downloader" },
                       { name: "Downloader No Login", href: "/tiktok-video-downloader-without-login" },
                       { name: "No Watermark Fix", href: "/save-tiktok-video-without-watermark" },
                       { name: "HD Video Online", href: "/tiktok-video-download-hd-alt" },
                       { name: "TikTok Free Tool", href: "/tiktok-download" },
                       { name: "Download Using URL", href: "/tiktok-video-download-using-link-alt" },
                       { name: "Music Fast Pro", href: "/tiktok-music-saver" },
                       { name: "HD Quality Save", href: "/tiktok-video-saver-hd" },
                       { name: "Free Pro Downloads", href: "/tiktok-free-downloader" },
                       { name: "Fast Pro Downloads", href: "/tiktok-fast-downloader" },
                    ].map((link) => (
                      <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-cyan-600 transition-colors flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-cyan-500 transition-colors" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
          </div>

          {/* 4. YouTube Section */}
          <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.4em] text-neutral-900 dark:text-white bg-red-50 dark:bg-red-900/20 px-5 py-2.5 rounded-full inline-flex items-center gap-3 border border-red-100 dark:border-red-800/30">
                   <Play className="w-4 h-4 text-red-600 fill-current" />
                   YouTube Platform Explorer
                </h3>
                <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400">62+ Professional Tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                 {[
                       { name: "YouTube Downloader", href: "/youtube" },
                       { name: "Shorts Download", href: "/youtube/shorts" },
                       { name: "Music Download", href: "/youtube/music" },
                       { name: "Thumbnail Save", href: "/youtube/thumbnail" },
                       { name: "YouTube Shorts Download", href: "/youtube-shorts-download" },
                       { name: "YouTube Video Download", href: "/youtube-video-download" },
                       { name: "YouTube Downloader", href: "/youtube-downloader" },
                       { name: "YouTube Video Downloader", href: "/youtube-video-downloader" },
                       { name: "YouTube MP4 Download", href: "/youtube-mp4-download" },
                       { name: "YouTube to MP4", href: "/youtube-to-mp4-key" },
                       { name: "YouTube Download Video", href: "/youtube-download-video-alt" },
                       { name: "YouTube Video Download HD", href: "/youtube-video-download-hd" },
                       { name: "YouTube Videos Without Watermark", href: "/youtube-video-download-without-watermark" },
                       { name: "YouTube MP4 Downloader", href: "/youtube-mp4-downloader-key" },
                       { name: "YouTube Video Saver", href: "/youtube-video-saver" },
                       { name: "YouTube Short Video Download", href: "/youtube-short-video-download" },
                       { name: "YouTube Playlist Download", href: "/youtube-playlist-download" },
                       { name: "YouTube Clips Download", href: "/youtube-clips-download" },
                       { name: "YouTube Video Clips", href: "/youtube-video-clips-key" },
                       { name: "Channel Video Downloader", href: "/youtube-channel-video-download" },
                       { name: "YouTube Audio Download", href: "/youtube-audio-download" },
                       { name: "YouTube Downloader No Login", href: "/youtube-video-downloader-without-login" },
                       { name: "Private Video Download", href: "/youtube-private-video-download" },
                       { name: "YouTube Video Downloader APK", href: "/youtube-video-downloader-apk" },
                       { name: "YouTube Link Downloader", href: "/youtube-link-video-downloader" },
                       { name: "YouTube Video Using Link", href: "/youtube-video-download-using-link-v2" },
                       { name: "YouTube Video to MP3", href: "/youtube-video-to-mp3" },
                       { name: "YouTube Download Video", href: "/youtube-download-video" },
                       { name: "YouTube MP4 Downloader", href: "/youtube-mp4-downloader" },
                       { name: "YouTube to MP4", href: "/youtube-to-mp4" },
                       { name: "YouTube Video Clips", href: "/youtube-video-clips" },
                       { name: "Youtube Video Download Using Link | Fast & Secure", href: "/youtube-video-download-using-link" },
                       { name: "YouTube Shorts India", href: "/youtube-shorts-download-india" },
                       { name: "YouTube to MP3 320kbps", href: "/youtube-to-mp3-320kbps" },
                       { name: "HD MP4 Downloader", href: "/youtube-mp4-downloader-hd" },
                       { name: "YouTube 4K Video Downloader", href: "/youtube-4k-video-downloader" },
                       { name: "High Speed YouTube Downloader", href: "/youtube-high-speed-downloader" },
                       { name: "No Ads YouTube Downloader", href: "/youtube-no-ads-downloader" },
                       { name: "Unlimited YouTube Downloader", href: "/youtube-unlimited-downloader" },
                       { name: "Safe YouTube Downloader", href: "/youtube-safe-downloader" },
                       { name: "HD Audio Downloader", href: "/youtube-hd-audio-downloader" },
                       { name: "YouTube MP3 Converter", href: "/youtube-mp3-converter-downloader" },
                       { name: "YouTube MP4 Converter", href: "/youtube-mp4-converter-downloader" },
                       { name: "YouTube Gallery Saver", href: "/youtube-gallery-saver-downloader" },
                       { name: "YouTube Thumbnail Download", href: "/youtube-thumbnail-download" },
                       { name: "YT Shorts Saver", href: "/yt-shorts-saver" },
                       { name: "Download YT Video", href: "/download-yt-video" },
                       { name: "YouTube Shorts Downloader", href: "/youtube-shorts-downloader" },
                       { name: "Download YouTube Shorts in HD (Fast & Free) – SavClip", href: "/youtube-shorts" },
                       { name: "High-Quality YouTube to MP3", href: "/youtube-music" },
                       { name: "YouTube Music Downloader", href: "/youtube-music-downloader" },
                       { name: "YouTube Videos Without Watermark", href: "/youtube-videos-without-watermark" },
                       { name: "YouTube Downloader No Login", href: "/youtube-downloader-no-login" },
                       { name: "YouTube Link Downloader", href: "/youtube-link-downloader" },
                       { name: "YouTube Video Using Link", href: "/youtube-video-using-link" },
                       { name: "YouTube Shorts India", href: "/youtube-shorts-india" },
                       { name: "YouTube MP3 Converter", href: "/youtube-mp3-converter" },
                       { name: "YouTube MP4 Converter", href: "/youtube-mp4-converter" },
                       { name: "YouTube Gallery Saver", href: "/youtube-gallery-saver" },
                  ].map((link) => (
                    <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-red-600 transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-red-600 transition-colors" />
                      {link.name}
                    </Link>
                  ))}
              </div>
          </div>

          {/* 5. Snapchat, X (Twitter), & Telegram Section */}
          <div className="space-y-16">
              {/* Snapchat Explorer */}
              <div className="space-y-10">
                 <div className="flex items-center justify-between">
                   <h4 className="text-[11px] font-black tracking-[0.4em] text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-5 py-2.5 rounded-full inline-flex items-center gap-3 border border-yellow-100 dark:border-yellow-800/30">
                      <Ghost className="w-4 h-4" />
                      Snapchat Platform Explorer
                   </h4>
                   <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400">41+ Professional Tools</span>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                    {[
                       { name: "Snapchat Downloader", href: "/snapchat" },
                       { name: "Spotlight Downloader", href: "/snapchat/spotlight" },
                       { name: "Story Downloader", href: "/snapchat/story" },
                       { name: "MP3 Downloader", href: "/snapchat/mp3" },
                       { name: "Photo Downloader", href: "/snapchat/photo" },
                       { name: "Video Download", href: "/snapchat-video-download" },
                       { name: "No Watermark", href: "/snapchat-video-download-without-watermark" },
                       { name: "HD Video Download", href: "/snapchat-video-download-hd" },
                       { name: "4K Video Pro", href: "/snapchat-4k-video-downloader" },
                       { name: "Online Saver", href: "/snapchat-video-saver-online" },
                       { name: "MP4 Download", href: "/snapchat-mp4-download" },
                       { name: "Private Video Save", href: "/snapchat-private-video-download" },
                       { name: "Link Downloader", href: "/snapchat-link-downloader" },
                       { name: "High Speed Pro", href: "/snapchat-high-speed-downloader" },
                       { name: "No Ads Version", href: "/snapchat-no-ads-downloader" },
                       { name: "Unlimited Save", href: "/snapchat-unlimited-downloader" },
                       { name: "Safe & Secure Pro", href: "/snapchat-safe-downloader" },
                       { name: "HD Audio Pro", href: "/snapchat-hd-audio-downloader" },
                       { name: "MP3 Converter", href: "/snapchat-mp3-converter-downloader" },
                       { name: "Gallery Saver", href: "/snapchat-gallery-saver-downloader" },
                       { name: "Video to MP4", href: "/snapchat-to-mp4" },
                       { name: "Snapchat APK Pro", href: "/snapchat-video-downloader-apk" },
                       { name: "Without Login Pro", href: "/snapchat-video-downloader-without-login" },
                       { name: "Spotlight HD Pro", href: "/snapchat-spotlight-saver-hd" },
                       { name: "Video from URL", href: "/snapchat-video-download-using-link-v2" },
                       { name: "Story Saver HD", href: "/snapchat-story-downloader" },
                       { name: "Bulk Downloader", href: "/snapchat-bulk-downloader" },
                       { name: "Online Pro Saver", href: "/snapchat-downloader-online" },
                       { name: "Download Video HD", href: "/download-snapchat-video-hd" },
                       { name: "Save Story Fast", href: "/save-snapchat-story-fast" },
                       { name: "Spotlight Online", href: "/download-snapchat-spotlight-online" },
                       { name: "Video Link Save", href: "/snapchat-video-link-saver" },
                       { name: "Video Saver Pro", href: "/snapchat-video-saver-pro" },
                       { name: "Download MP4 HD", href: "/download-snapchat-mp4-hd" },
                       { name: "Save Video Online", href: "/save-snapchat-video-online" },
                       { name: "Fast Pro Save", href: "/snapchat-fast-downloader" },
                       { name: "Free Pro Save", href: "/snapchat-free-downloader" },
                       { name: "Music Save Pro", href: "/snapchat-music" },
                       { name: "Story Pro Saver", href: "/snapchat-story-pro-saver" },
                       { name: "Spotlight Pro", href: "/snapchat-spotlight-pro-saver" },
                       { name: "Premium Save", href: "/snapchat-premium-downloader" },
                    ].map((link) => (
                      <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-yellow-600 transition-colors flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-yellow-500 transition-colors" />
                        {link.name}
                      </Link>
                    ))}
                 </div>
              </div>

              {/* X (Twitter) Explorer */}
              <div className="space-y-10">
                 <div className="flex items-center justify-between">
                   <h4 className="text-[11px] font-black tracking-[0.4em] text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 px-5 py-2.5 rounded-full inline-flex items-center gap-3 border border-neutral-100 dark:border-neutral-800/30">
                      <Hash className="w-4 h-4" />
                      X (Twitter) Platform Explorer
                   </h4>
                   <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400">28+ Professional Tools</span>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                    {[
                       { name: "Twitter Downloader", href: "/twitter" },
                       { name: "GIF Downloader", href: "/twitter/gif" },
                       { name: "Photo Downloader", href: "/twitter/photo" },
                       { name: "Media Downloader", href: "/twitter/media" },
                       { name: "Video Download", href: "/twitter-video-download" },
                       { name: "X Video Save", href: "/x-video-download" },
                       { name: "HD Video Save", href: "/twitter-video-downloader-hd" },
                       { name: "4K Video Pro", href: "/twitter-4k-video-downloader" },
                       { name: "Online Video Saver", href: "/twitter-video-saver" },
                       { name: "MP4 Download", href: "/twitter-video-mp4-download" },
                       { name: "GIF Saver Online", href: "/twitter-gif-download" },
                       { name: "MP3 Converter", href: "/twitter-mp3-converter-downloader" },
                       { name: "HD Audio Save", href: "/twitter-hd-audio-downloader" },
                       { name: "X Video Saver Pro", href: "/twitter-video-saver-x" },
                       { name: "High Speed Pro", href: "/twitter-high-speed-downloader" },
                       { name: "Safe & Secure", href: "/twitter-safe-downloader" },
                       { name: "No Ads Version", href: "/twitter-no-ads-downloader" },
                       { name: "Unlimited Save", href: "/twitter-unlimited-downloader" },
                       { name: "Gallery Saver", href: "/twitter-gallery-saver-downloader" },
                       { name: "Video Link Save", href: "/twitter-video-download-link" },
                       { name: "MP4 Pro Converter", href: "/twitter-mp4-converter-downloader" },
                       { name: "Online Pro Saver", href: "/twitter-downloader-online" },
                       { name: "Bulk Downloader", href: "/twitter-bulk-downloader" },
                       { name: "Video to Phone", href: "/save-twitter-video-to-phone" },
                       { name: "Fast Pro Save", href: "/twitter-fast-downloader" },
                       { name: "Music Save Pro", href: "/twitter-music" },
                       { name: "GIF Online Pro", href: "/download-twitter-gif" },
                       { name: "HD Pro Downloader", href: "/twitter-video-downloader-hd-pro" }
                     ].map((link) => (
                      <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-black dark:group-hover:bg-white transition-colors" />
                        {link.name}
                      </Link>
                    ))}
                 </div>
              </div>

              {/* Telegram Explorer */}
              <div className="space-y-10">
                 <div className="flex items-center justify-between">
                   <h4 className="text-[11px] font-black tracking-[0.4em] text-sky-600 bg-sky-50 dark:bg-sky-900/20 px-5 py-2.5 rounded-full inline-flex items-center gap-3 border border-sky-100 dark:border-sky-800/30">
                      <Send className="w-4 h-4" />
                      Telegram Platform Explorer
                   </h4>
                   <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400">15+ Professional Tools</span>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4" suppressHydrationWarning={true}>
                    {[
                       { name: "Video Save Pro", href: "/telegram-video-download" },
                                                                     { name: "Video Downloader", href: "/telegram" },
                       { name: "Media Downloader", href: "/telegram/mp3" },
                       { name: "Photo Downloader", href: "/telegram/photo" },
                       { name: "File Downloader", href: "/telegram/files" },
                       { name: "HD Video Saver", href: "/telegram-video-download-hd" },
                       { name: "No Watermark", href: "/telegram-video-download-without-watermark" },
                       { name: "Online Video Saver", href: "/telegram-video-saver" },
                       { name: "MP4 Download", href: "/telegram-download-video" },
                       { name: "Music Download", href: "/telegram-music" },
                       { name: "Fast Pro Saver", href: "/telegram-video-saver-online" },
                       { name: "Video Link Save", href: "/telegram-video-download-link" },
                       { name: "MP4 Online Pro", href: "/download-telegram-video-online" },
                       { name: "Video to Phone", href: "/save-telegram-video-to-phone" },
                       { name: "Online Pro Save", href: "/telegram-downloader-online" }
                    ].map((link) => (
                      <Link key={link.href} href={getLocalizedHref(link.href)} prefetch={true} className="text-[10px] font-bold text-neutral-400 hover:text-sky-600 transition-colors flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-sky-500 transition-colors" />
                        {link.name}
                      </Link>
                    ))}
                 </div>
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
          
          <div className="w-full max-w-6xl mb-16 px-4">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black tracking-[0.4em] text-neutral-400 dark:text-neutral-500 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-full border border-neutral-100 dark:border-neutral-700/50">
                   Global Language Index
                </h3>
                <span className="text-[9px] font-black tracking-widest uppercase italic text-neutral-400">23+ International Versions</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                 {locales.map((loc) => (
                   <Link 
                     key={loc} 
                     href={`/${loc}`} 
                     prefetch={true}
                     className="group flex items-center gap-3 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-pink-200 dark:hover:border-pink-900/50 hover:bg-white dark:hover:bg-neutral-900 shadow-xs transition-all active:scale-95"
                   >
                     <span className="text-lg group-hover:scale-125 transition-transform">{languageFlags[loc]}</span>
                     <div className="flex flex-col">
                       <span className="text-[10px] font-black text-neutral-900 dark:text-white group-hover:text-pink-600 transition-colors">{languageNames[loc]}</span>
                       <span className="text-[8px] font-bold text-neutral-400 tracking-tighter uppercase italic">{loc}</span>
                     </div>
                   </Link>
                 ))}
              </div>
          </div>

          <p className="text-[11px] font-black tracking-[0.3em] text-neutral-900 dark:text-white">
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
          
          <p className="max-w-5xl text-[9px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase italic px-4 leading-relaxed opacity-40">
            Disclaimer: SavClip is an independent tool and is not affiliated, associated, or endorsed by YouTube, Instagram, TikTok, Facebook, Snapchat, X, or Telegram.
          </p>
        </div>
      </div>
    </footer>
  )
}
