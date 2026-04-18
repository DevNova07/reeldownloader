"use client"

import * as React from "react"
import * as Icons from "lucide-react"
import { useRouter } from "next/navigation"
import { Music, Hash, Star } from "lucide-react"
import { cn } from "@/utils/cn"

interface SidebarProps {
  locale: string
}

export const LeftSidebar = React.memo(({ locale }: SidebarProps) => {
  const router = useRouter()
  
  return (
    <aside className="hidden 2xl:block absolute -left-[380px] top-0 w-80 space-y-12 h-fit select-none">
      <div className="p-8 rounded-4xl bg-neutral-50 border border-neutral-100 shadow-sm space-y-8">
        <div className="space-y-2">
          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em]">Instagram Suite</h4>
          <div className="h-0.5 w-12 bg-lime-500" />
        </div>
        <nav className="space-y-2">
          {[
            { n: "Reels Downloader", i: Icons.Clapperboard, h: `/${locale}/reels` },
            { n: "Story Saver", i: Icons.Play, h: `/${locale}/story` },
            { n: "Photo Downloader", i: Icons.Image, h: `/${locale}/photo` },
          ].map(tool => (
            <button key={tool.n} onClick={() => router.push(tool.h)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all group/item">
              <tool.i className="h-4 w-4 text-neutral-400 group-hover/item:text-lime-500" />
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider group-hover/item:text-black">{tool.n}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-2 pt-4">
          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em]">Multi-Platform</h4>
          <div className="h-0.5 w-12 bg-lime-500" />
        </div>
        <nav className="space-y-2">
          {[
            { n: "YouTube Video", i: Icons.Youtube, h: `/${locale}/youtube` },
            { n: "TikTok No MW", i: Music, h: `/${locale}/tiktok` },
            { n: "Facebook Video", i: Icons.Facebook, h: `/${locale}/facebook` },
            { n: "Snapchat Story", i: Icons.Ghost, h: `/${locale}/snapchat` },
            { n: "X (Twitter) Link", i: Icons.Twitter, h: `/${locale}/twitter` },
            { n: "Telegram Media", i: Icons.Send, h: `/${locale}/telegram` },
          ].map(tool => (
            <button key={tool.n} onClick={() => router.push(tool.h)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all group/item">
              <tool.i className="h-4 w-4 text-neutral-400 group-hover/item:text-lime-500" />
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider group-hover/item:text-black">{tool.n}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-8 rounded-4xl bg-neutral-900 text-white shadow-xl space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-lime-500">Systems Operational</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["INSTAGRAM", "TIKTOK", "YOUTUBE", "FACEBOOK"].map(sys => (
            <div key={sys} className="space-y-1">
              <p className="text-[9px] font-bold text-neutral-500">{sys}</p>
              <p className="text-[10px] font-black text-lime-400">ONLINE</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-4xl bg-neutral-50 border border-neutral-100 shadow-sm space-y-6">
        <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] border-b border-neutral-200 pb-4">
          Trending Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "#ReelsDownloader", "#InstaSnap", "#ViralBio", "#InstagramStatus", 
            "#TikTokSaver", "#NoWatermark", "#RoyalBio", "#SavageCaption",
            "#StorySaver", "#YouTubeDownloader", "#CreatorTools", "#SnapchatStory"
          ].map(tag => (
            <span key={tag} className="text-[9px] font-bold text-neutral-400 hover:text-lime-600 transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-4xl bg-black text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-lime-500/10 blur-[80px] -mr-20 -mt-20" />
        <div className="relative z-10 space-y-4">
          <p className="text-[9px] font-black text-lime-500 uppercase tracking-widest">Global Reach</p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <Icons.Globe className="h-5 w-5 text-lime-500" />
              </div>
              <div>
                <p className="text-xl font-black tracking-tighter">190+</p>
                <p className="text-[9px] font-bold text-neutral-500 uppercase">Countries Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-8 rounded-4xl border border-dashed border-neutral-200 space-y-6">
        <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Browse More Collections</h4>
        <nav className="grid grid-cols-1 gap-3">
          {[
            "Sigma Collections", "Travel Aesthetics", "Gym Motivation", "Life Quotes",
            "Premium English", "Savage Boys", "Cute Girls", "Minimalist Tech",
            "Anime Vibe", "Success Habits", "Luxury Lifestyle", "Aesthetic Art"
          ].map(coll => (
            <div key={coll} className="flex items-center justify-between group cursor-pointer">
              <span className="text-[10px] font-bold text-neutral-500 group-hover:text-black transition-colors">{coll}</span>
              <Icons.ChevronRight className="h-3 w-3 text-neutral-300 group-hover:text-lime-500" />
            </div>
          ))}
        </nav>
      </div>

      <div className="p-8 rounded-4xl bg-neutral-50 border border-neutral-100 shadow-sm space-y-8 pb-12">
         <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] border-b border-neutral-200 pb-4">
          Growth Glossary
        </h4>
        <div className="grid grid-cols-1 gap-6">
          {[
            { t: "Algorithm", d: "The logic that decides what content stays on top." },
            { t: "Bio Optimization", d: "Using keywords to index your profile better." },
            { t: "CTR (Click-Through)", d: "Percentage of users who click your bio link." },
            { t: "Dark Post", d: "An ad that doesn't appear on your main timeline." },
            { t: "Engagement Rate", d: "The total interactions vs your follower count." },
            { t: "Impression", d: "Total times your content was seen on-screen." },
            { t: "Shadowban", d: "A temporary restriction on your content's reach." },
            { t: "Viral Loop", d: "When shares lead to more shares exponentially." }
          ].map((term, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[10px] font-black text-black uppercase tracking-tighter">{term.t}</p>
              <p className="text-[9px] text-neutral-400 leading-relaxed font-medium">{term.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-4xl bg-neutral-900 text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] text-center italic">
        Empowering 1M+ Creators Globally
      </div>
    </aside>
  )
})

LeftSidebar.displayName = "LeftSidebar"

export const RightSidebar = React.memo(({ locale }: SidebarProps) => {
  const router = useRouter()
  
  return (
    <aside className="hidden 2xl:block absolute -right-[380px] top-20 w-80 space-y-12 h-fit select-none">
      <div className="p-8 rounded-4xl bg-neutral-50 border border-neutral-100 shadow-sm space-y-8">
        <div className="space-y-2">
          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em]">Creator Toolbox</h4>
          <div className="h-0.5 w-12 bg-lime-500" />
        </div>
        <nav className="space-y-2">
          {[
            { n: "AI Caption Gen", i: Icons.Type, h: `/${locale}/captions` },
            { n: "Hashtag Creator", i: Hash, h: `/${locale}/hashtags` },
            { n: "Bio Ideas Hub", i: Star, h: `/${locale}/bio` },
            { n: "AI Creator Blog", i: Icons.Newspaper, h: `/${locale}/blog` },
          ].map(tool => (
            <button key={tool.n} onClick={() => router.push(tool.h)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all group/item">
              <tool.i className="h-4 w-4 text-neutral-400 group-hover/item:text-lime-500" />
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider group-hover/item:text-black">{tool.n}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 rounded-3xl bg-white border border-neutral-100 shadow-sm space-y-4 pt-6">
          <h5 className="text-[10px] font-black text-black uppercase tracking-widest">Growth Analytics</h5>
          <div className="space-y-4">
            <div className="flex items-center justify-between group/stat">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Copy Accuracy</span>
              <span className="text-xs font-black text-lime-600">99.8%</span>
            </div>
            <div className="flex items-center justify-between group/stat">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Daily Users</span>
              <span className="text-xs font-black text-black">12.5K+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-4xl bg-lime-50/30 border border-lime-100 shadow-sm space-y-6">
         <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] border-b border-lime-200 pb-4">
          Optimization Guide
        </h4>
        <div className="space-y-6">
          {[
            { q: "Keyword Density", a: "Use your main niche in the first 50 characters." },
            { q: "Emoji Balance", a: "Symmetry works best for professional aesthetics." },
            { q: "CTA Impact", a: "Always end with a clear link or action word." }
          ].map((guide, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[11px] font-black text-black uppercase tracking-tight">{guide.q}</p>
              <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">{guide.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-4xl bg-neutral-900 text-white shadow-xl space-y-6">
         <h4 className="text-[10px] font-black text-lime-500 uppercase tracking-[0.4em] border-b border-white/10 pb-4">
          Viral Calendar
        </h4>
        <div className="grid grid-cols-1 gap-4">
          {[
            { d: "MON", h: "#Motivation", v: "Reels" },
            { d: "TUE", h: "#Tips & Tech", v: "Post" },
            { d: "WED", h: "#MidWeekVibe", v: "Story" },
            { d: "THU", h: "#Throwback", v: "Reels" },
            { d: "FRI", h: "#FunFriday", v: "Viral" }
          ].map(day => (
            <div key={day.d} className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-black text-white">{day.d}</span>
              <span className="text-[9px] font-bold text-neutral-400">{day.h}</span>
              <span className="text-[8px] font-black px-2 py-0.5 bg-lime-500 text-black rounded-full">{day.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-4xl bg-neutral-50 border border-neutral-100 shadow-sm space-y-6">
        <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] border-b border-neutral-200 pb-4">
          Infinite SEO Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "#RoyalBio", "#SigmaRule", "#AttitudeBio", "#InstaCreator", "#ViralNow",
            "#GrowthHacks", "#SocialExpert", "#TrendSetter", "#BioDesigns", "#EmojiArt",
            "#ContentMaster", "#InstaSnap", "#BioGen", "#CaptionKing", "#StatusMaker",
            "#Profiles", "#Influence", "#DigitalGrowth", "#ViralStrategies", "#CreatorEconomy"
          ].map(tag => (
             <span key={tag} className="px-2 py-1 bg-white border border-neutral-200 rounded-lg text-[8px] font-black text-neutral-400 uppercase tracking-tighter shadow-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-4xl bg-black text-white shadow-2xl space-y-6 pb-12">
         <h4 className="text-[10px] font-black text-lime-500 uppercase tracking-[0.4em]">Creator Manifesto</h4>
         <div className="space-y-6 italic">
            <p className="text-[10px] leading-relaxed text-neutral-400">
              &quot;Success on social media is a marathon, not a sprint. Focus on providing value, maintaining authenticity, and using the right tools to power your growth.&quot;
            </p>
            <p className="text-[10px] leading-relaxed text-neutral-100">
              Join the 50K+ creators who trust InstaSnap every single day for their profile optimization.
            </p>
         </div>
      </div>

      <div className="p-12 rounded-4xl border-2 border-dashed border-neutral-100 flex flex-col items-center justify-center text-center space-y-4">
         <Icons.ShieldCheck className="h-10 w-10 text-lime-500 opacity-20" />
         <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">End of Portal Reach</p>
      </div>
    </aside>
  )
})

RightSidebar.displayName = "RightSidebar"
