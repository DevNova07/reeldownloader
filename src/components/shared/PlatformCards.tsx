import React from "react";
import Link from "next/link";
import { Camera, Film, Globe, Ghost, Send, Music, Play, Hash, PlaySquare, Type, Link2 } from "lucide-react";
import { cn } from "@/utils/cn";

const platforms = [
  {
    name: "Instagram",
    desc: "Download Instagram Reels, Stories, and Videos in high resolution.",
    href: "/instagram-video-downloader",
    icon: Camera,
    bg: "bg-linear-to-tr from-pink-600 to-purple-600 shadow-pink-500/20"
  },
  {
    name: "Facebook",
    desc: "Save Facebook videos and Reels directly to your device gallery.",
    href: "/facebook-video-downloader",
    icon: PlaySquare,
    bg: "bg-linear-to-tr from-blue-600 to-blue-700 shadow-blue-500/20"
  },
  {
    name: "TikTok",
    desc: "Download TikTok videos without watermark in original HD quality.",
    href: "/tiktok-video-downloader",
    icon: Music,
    bg: "bg-linear-to-tr from-neutral-900 to-neutral-800 shadow-white/5"
  },
  {
    name: "YouTube",
    desc: "Get YouTube Shorts and Music in high-bitrate MP3 or MP4 formats.",
    href: "/youtube-video-downloader",
    icon: Film,
    bg: "bg-linear-to-tr from-red-600 to-red-700 shadow-red-500/20"
  },
  {
    name: "Twitter / X",
    desc: "Download videos and GIFs from X (Twitter) safely and quickly.",
    href: "/x-video-downloader",
    icon: Hash,
    bg: "bg-linear-to-tr from-neutral-800 to-black shadow-white/5"
  },
  {
    name: "Snapchat",
    desc: "Save Snapchat Spotlights and Stories in original source quality.",
    href: "/snapchat-video-downloader",
    icon: Ghost,
    bg: "bg-linear-to-tr from-yellow-400 to-yellow-500 shadow-yellow-500/20"
  },
  {
    name: "Telegram",
    desc: "Download files and videos from any public Telegram channel.",
    href: "/telegram-video-downloader",
    icon: Send,
    bg: "bg-linear-to-tr from-sky-500 to-blue-500 shadow-sky-500/20"
  },
  {
    name: "AI Hashtags",
    desc: "Generate viral hashtags to boost your Instagram and TikTok reach.",
    href: "/hashtags",
    icon: Hash,
    bg: "bg-linear-to-tr from-fuchsia-500 to-pink-500 shadow-fuchsia-500/20"
  },
  {
    name: "AI Captions",
    desc: "Write engaging captions that drive comments and shares instantly.",
    href: "/captions",
    icon: Type,
    bg: "bg-linear-to-tr from-cyan-500 to-blue-500 shadow-cyan-500/20"
  },
  {
    name: "AI Bio Maker",
    desc: "Craft the perfect Link-in-Bio profile to turn visitors into followers.",
    href: "/bio",
    icon: Link2,
    bg: "bg-linear-to-tr from-emerald-500 to-teal-500 shadow-emerald-500/20"
  }
];

export function PlatformCards({ locale }: { locale: string }) {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-4 leading-tight">
            All Video Downloader
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-bold max-w-2xl mx-auto">
            One multi-platform social media downloader for all your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {platforms.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Link
                key={idx}
                href={`/${locale}${category.href}`}
                className="group flex flex-col items-center text-center h-full rounded-4xl p-6 sm:p-10 transition-all border border-neutral-100 dark:border-neutral-800/50 hover:border-pink-500/20 bg-white dark:bg-neutral-900/40 backdrop-blur-xl hover:shadow-2xl overflow-hidden relative hover:-translate-y-2"
              >
                <div className={cn("inline-flex p-5 rounded-2xl mb-8 shadow-2xl transition-all group-hover:scale-110 group-hover:-rotate-3", category.bg)}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-neutral-900 dark:text-white tracking-widest uppercase italic">
                  {category.name}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                  {category.desc}
                </p>

                {/* Decorative Background Element */}
                <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity bg-pink-500 rounded-full blur-3xl pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
