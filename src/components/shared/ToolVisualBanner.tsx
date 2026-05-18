"use client"

import React from "react"
import { Ghost, Download, Shield, Zap, Eye, Video, Image as ImageIcon, Music, Lock, Star, PlaySquare } from "lucide-react"

interface ToolVisualBannerProps {
  platform: string
}

export function ToolVisualBanner({ platform }: ToolVisualBannerProps) {
  const p = platform.toLowerCase()
  
  let icon = <Video className="h-12 w-12 text-white" />
  let iconBg = "bg-indigo-600"
  let bgGradient = "from-indigo-50 to-white dark:from-indigo-950/20 dark:to-neutral-950"
  let title = "Premium Downloader"
  let subtitle = "Fast and secure downloads for your favorite content in HD quality."
  
  let features = [
    { label: "HD Quality", icon: <Zap className="h-5 w-5" /> },
    { label: "Fast Save", icon: <Download className="h-5 w-5" /> },
    { label: "Secure", icon: <Shield className="h-5 w-5" /> },
    { label: "Free", icon: <Star className="h-5 w-5" /> }
  ]

  if (p.includes("story") || p.includes("anonymous") || p.includes("viewer")) {
    icon = <Ghost className="h-12 w-12 text-white" />
    iconBg = "bg-purple-600"
    bgGradient = "from-purple-50 to-white dark:from-purple-950/20 dark:to-neutral-950"
    title = "Anonymous Viewer & Saver"
    subtitle = "Watch and save stories without being seen. 100% private and secure browsing."
    features = [
      { label: "Anonymous", icon: <Eye className="h-5 w-5" /> },
      { label: "HD Quality", icon: <Zap className="h-5 w-5" /> },
      { label: "No Watermark", icon: <Shield className="h-5 w-5" /> },
      { label: "Fast Save", icon: <Download className="h-5 w-5" /> }
    ]
  } else if (p.includes("audio") || p.includes("mp3")) {
    icon = <Music className="h-12 w-12 text-white" />
    iconBg = "bg-sky-600"
    bgGradient = "from-sky-50 to-white dark:from-sky-950/20 dark:to-neutral-950"
    title = "HD Audio Extractor"
    subtitle = "Extract crystal clear audio. Supports 320kbps high-fidelity MP3 format."
    features = [
      { label: "320kbps MP3", icon: <Zap className="h-5 w-5" /> },
      { label: "Original Audio", icon: <Music className="h-5 w-5" /> },
      { label: "Fast Convert", icon: <Download className="h-5 w-5" /> },
      { label: "Secure", icon: <Shield className="h-5 w-5" /> }
    ]
  } else if (p.includes("photo") || p.includes("dp") || p.includes("thumbnail") || p.includes("carousel") || p.includes("image")) {
    icon = <ImageIcon className="h-12 w-12 text-white" />
    iconBg = "bg-pink-600"
    bgGradient = "from-pink-50 to-white dark:from-pink-950/20 dark:to-neutral-950"
    title = "HD Image Saver"
    subtitle = "Save photos and carousels in original high resolution. Professional and fast."
    features = [
      { label: "Original Size", icon: <ImageIcon className="h-5 w-5" /> },
      { label: "HD Quality", icon: <Zap className="h-5 w-5" /> },
      { label: "No Loss", icon: <Shield className="h-5 w-5" /> },
      { label: "Fast Save", icon: <Download className="h-5 w-5" /> }
    ]
  } else if (p.includes("private") || p.includes("restricted")) {
    icon = <Lock className="h-12 w-12 text-white" />
    iconBg = "bg-emerald-600"
    bgGradient = "from-emerald-50 to-white dark:from-emerald-950/20 dark:to-neutral-950"
    title = "Private Downloader"
    subtitle = "Download private videos securely without logging in. Untraceable and safe."
    features = [
      { label: "100% Private", icon: <Lock className="h-5 w-5" /> },
      { label: "Secure", icon: <Shield className="h-5 w-5" /> },
      { label: "Untraceable", icon: <Eye className="h-5 w-5" /> },
      { label: "HD Video", icon: <Video className="h-5 w-5" /> }
    ]
  } else if (p.includes("shorts") || p.includes("reels")) {
    icon = <PlaySquare className="h-12 w-12 text-white" />
    iconBg = "bg-rose-600"
    bgGradient = "from-rose-50 to-white dark:from-rose-950/20 dark:to-neutral-950"
    title = "HD Short Video Saver"
    subtitle = "Download short videos and reels in perfect HD quality. Fast and no watermarks."
    features = [
      { label: "No Watermark", icon: <Shield className="h-5 w-5" /> },
      { label: "HD Quality", icon: <Video className="h-5 w-5" /> },
      { label: "Lightning Fast", icon: <Zap className="h-5 w-5" /> },
      { label: "Easy Save", icon: <Download className="h-5 w-5" /> }
    ]
  } else {
    title = "Fast Video Downloader"
    subtitle = "Save videos in MP4 format with original HD quality. No watermark and 100% secure."
    features = [
      { label: "No Watermark", icon: <Zap className="h-5 w-5" /> },
      { label: "HD Quality", icon: <Video className="h-5 w-5" /> },
      { label: "Secure", icon: <Shield className="h-5 w-5" /> },
      { label: "Fastest", icon: <Download className="h-5 w-5" /> }
    ]
    if (p.includes("tiktok")) {
      iconBg = "bg-black dark:bg-neutral-800"
      bgGradient = "from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950"
    } else if (p.includes("youtube")) {
      iconBg = "bg-red-600"
      bgGradient = "from-red-50 to-white dark:from-red-950/20 dark:to-neutral-950"
    } else if (p.includes("facebook")) {
      iconBg = "bg-blue-600"
      bgGradient = "from-blue-50 to-white dark:from-blue-950/20 dark:to-neutral-950"
    } else if (p.includes("snapchat")) {
      iconBg = "bg-yellow-500"
      bgGradient = "from-yellow-50 to-white dark:from-yellow-950/20 dark:to-neutral-950"
    } else if (p.includes("telegram")) {
      iconBg = "bg-sky-500"
      bgGradient = "from-sky-50 to-white dark:from-sky-950/20 dark:to-neutral-950"
    }
  }

  return (
    <div className={`mt-10 mb-10 rounded-4xl overflow-hidden shadow-xl border border-neutral-100 dark:border-neutral-800 bg-linear-to-br ${bgGradient} p-8 md:p-12 flex flex-col items-center text-center`}>
      <div className={`w-20 h-20 sm:w-24 sm:h-24 ${iconBg} rounded-3xl flex items-center justify-center shadow-2xl mb-8 animate-[pulse_3s_ease-in-out_infinite]`}>
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-sm sm:text-lg text-neutral-500 dark:text-neutral-400 font-bold max-w-2xl mb-10">
        {subtitle}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl">
        {features.map((item, i) => (
          <div key={i} className="p-4 sm:p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-md border border-neutral-100 dark:border-neutral-700 flex flex-col items-center gap-2 transition-transform hover:scale-105">
            <div className={`text-opacity-90 ${iconBg.replace('bg-', 'text-')}`}>{item.icon}</div>
            <span className="text-[10px] sm:text-xs font-black uppercase italic text-neutral-900 dark:text-white text-center leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
