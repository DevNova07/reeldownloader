"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingUp, Flame, Music, Hash, Eye, ArrowUpRight, ExternalLink, Play, Target, Zap } from "lucide-react"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/dictionaries/client"
import { type Locale } from "@/i18n"

export default function TrendingContentFinder() {
  const pathname = usePathname()
  const locale = (pathname.split('/')[1] || 'en') as Locale
  const dict = getDictionary(locale)

  const trendingTopics = [
    { name: "AI Video Transformation", reach: "4.5M", trend: "+450%", category: "Tech" },
    { name: "Minimalist Living 2026", reach: "2.1M", trend: "+210%", category: "Life" },
    { name: "Organic Bio-Hacking", reach: "1.8M", trend: "+180%", category: "Health" },
    { name: "Space Tourism Vlogs", reach: "1.5M", trend: "+150%", category: "Travel" }
  ]

  const trendingSounds = [
    { name: "Neon Dreams (Slowed)", usage: "1.2M+", link: "#" },
    { name: "Cyberpunk Pulse", usage: "850K+", link: "#" },
    { name: "Atmospheric Echo", usage: "500K+", link: "#" }
  ]

  const trendingHashtags = [
    "#AIVideo", "#Creative2026", "#GrowthMindset", "#ViralTrends", "#FutureTech", "#ContentStrategy"
  ]

  return (
    <main className="min-h-screen bg-[#f9fafb] px-4 py-12 dark:bg-black text-neutral-900 dark:text-white sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 sm:mb-20 gap-8">
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-rose-700 dark:bg-rose-900/30"
            >
              <Flame className="h-3.5 w-3.5" />
              Live Trends
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] dark:text-white">
              Trending <br className="sm:hidden" /> <span className="text-pink-600">Now</span>
            </h1>
            <p className="text-lg font-bold text-neutral-500 tracking-tight opacity-70">
              Real-time data for viral topics, sounds, and tags.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-neutral-900 p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] shadow-2xl border border-neutral-100 dark:border-neutral-800 w-full sm:w-auto">
             <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" />
             </div>
             <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Database</p>
                <p className="text-base sm:text-lg font-black uppercase italic">Updated 2m ago</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-32">
          {/* Main Trending Topics */}
          <section className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                 <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
                 Viral Topics
               </h3>
               <button className="text-[10px] font-black uppercase tracking-widest text-neutral-400">View All</button>
            </div>
            <div className="grid gap-4">
              {trendingTopics.map((topic, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex items-center justify-between p-5 sm:p-8 bg-white dark:bg-neutral-900 rounded-[32px] sm:rounded-[40px] shadow-sm hover:shadow-2xl border border-neutral-100 dark:border-neutral-800 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-3xl sm:text-4xl font-black text-neutral-100 dark:text-neutral-800 group-hover:text-pink-600/20 transition-colors">0{idx + 1}</span>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-pink-600 mb-1 block">{topic.category}</span>
                      <h4 className="text-lg sm:text-xl font-black uppercase italic group-hover:text-pink-600 transition-colors leading-tight">{topic.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-8">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Reach</p>
                      <p className="font-black italic">{topic.reach}</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-xl text-green-600 font-black text-[10px] sm:text-xs flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" /> {topic.trend}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Side Panels */}
          <aside className="lg:col-span-4 space-y-6 sm:space-y-8">
            {/* Trending Sounds */}
            <div className="p-8 sm:p-10 bg-black text-white rounded-[32px] sm:rounded-[40px] shadow-2xl relative overflow-hidden group border border-white/5">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <Music className="h-16 w-16 sm:h-20 sm:w-20 text-pink-600" />
               </div>
               <h3 className="text-lg sm:text-xl font-black uppercase italic tracking-tighter mb-6 sm:mb-8 flex items-center gap-3">
                 <Music className="h-4 w-4 sm:h-5 w-5 text-pink-500" />
                 Viral Sounds
               </h3>
               <div className="space-y-5 sm:space-y-6 relative z-10">
                  {trendingSounds.map((sound, idx) => (
                    <div key={idx} className="flex items-center justify-between group/item">
                       <div>
                          <p className="text-sm font-black uppercase italic group-hover/item:text-pink-500 transition-colors leading-tight">{sound.name}</p>
                          <p className="text-[9px] font-bold text-neutral-500 uppercase">{sound.usage} Videos</p>
                       </div>
                       <button className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-all">
                          <ExternalLink className="h-3.5 w-3.5" />
                       </button>
                    </div>
                  ))}
               </div>
            </div>

            {/* Trending Hashtags */}
            <div className="p-8 sm:p-10 bg-white dark:bg-neutral-900 rounded-[32px] sm:rounded-[40px] shadow-xl border border-neutral-100 dark:border-neutral-800">
               <h3 className="text-lg sm:text-xl font-black uppercase italic tracking-tighter mb-6 sm:mb-8 flex items-center gap-3">
                 <Hash className="h-4 w-4 sm:h-5 w-5 text-pink-600" />
                 Best Tags
               </h3>
               <div className="flex flex-wrap gap-2">
                  {trendingHashtags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-2 rounded-xl bg-neutral-50 dark:bg-black text-[9px] font-black uppercase tracking-widest text-neutral-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 cursor-pointer transition-all border border-neutral-100 dark:border-neutral-800">
                       {tag}
                    </span>
                  ))}
               </div>
            </div>
          </aside>
        </div>

        {/* SEO CONTENT SECTION */}
        <div className="mt-32 space-y-24">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
                How to Find <span className="text-pink-600">Trending Content</span>
              </h2>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Stay Ahead of the Curve</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Sound First", desc: "Always check the trending sounds list. Using a viral audio increases your chance of hitting the Explore page by 60%." },
                { title: "Topic Velocity", desc: "Look for topics with high growth percentages (+200% or more). These are currently being favored by the algorithm." },
                { title: "Niche Focus", desc: "Don't just chase generic trends. Find trends within your specific niche for higher conversion and quality followers." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-lg">
                  <h3 className="text-lg font-black uppercase italic mb-3 dark:text-white text-pink-600">{item.title}</h3>
                  <p className="text-sm font-bold text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-12 pb-20">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-center dark:text-white">
              Trending <span className="text-pink-600">FAQs</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "How often is trend data updated?", a: "Our AI scouts the platforms every 6 hours to provide the most fresh and relevant data." },
                { q: "Can I use these trends for YouTube Shorts?", a: "Yes, the trends we display are highly correlated across Reels, TikTok, and Shorts." },
                { q: "What does 'Viral Alert' mean?", a: "A Viral Alert means a specific topic is showing exponential growth in the last 24 hours and is likely to hit millions of views soon." }
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2 dark:text-white">Q: {faq.q}</h4>
                  <p className="text-sm font-medium text-neutral-500 leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
