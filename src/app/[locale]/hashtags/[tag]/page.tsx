"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Instagram, 
  PenLine, 
  Heart, 
  MessageCircle, 
  Copy, 
  Check,
  ChevronRight,
  TrendingUp,
  LineChart
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { cn } from "@/utils/cn"

import { ToolSubNav } from "@/components/layout/ToolSubNav"

import { ALL_HASHTAGS, NICHE_TAGS, HashtagNiche } from "@/data/hashtags"

export default function HashtagDetailPage() {
  const params = useParams()
  const locale = params.locale as string
  const tag = params.tag as string
  
  const [copyStatus, setCopyStatus] = React.useState<Record<string, boolean>>({})

  // Dynamic Content Logic
  const currentTagData = ALL_HASHTAGS.find(h => h.tag.toLowerCase() === `#${tag.toLowerCase()}` || h.tag.toLowerCase() === tag.toLowerCase())
  const niche: HashtagNiche = currentTagData?.niche || "viral"
  
  // Get specialized tags for this niche
  const nicheRelated = NICHE_TAGS[niche] || NICHE_TAGS["viral"]
  
  // Split into primary and secondary for the UI
  const primaryHashtags = nicheRelated.slice(0, 10).map(t => t.startsWith('#') ? t : `#${t}`)
  const secondaryHashtags = nicheRelated.slice(10, 20).map(t => t.startsWith('#') ? t : `#${t}`)

  const handleCopy = (tags: string[], id: string) => {
    navigator.clipboard.writeText(tags.join(" "))
    setCopyStatus({ ...copyStatus, [id]: true })
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, [id]: false })
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-white">
      <ToolSubNav />
      {/* Breadcrumbs / Header Bar */}
      <div className="w-full border-b border-neutral-100 bg-neutral-50/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-8">
          <h1 className="text-xl font-bold text-neutral-600 tracking-tight">
            Hashtags for #{tag}
          </h1>
          <nav className="flex items-center gap-2 text-sm font-medium text-neutral-400">
            <Link href={`/${locale}/hashtags`} className="hover:text-neutral-900 transition-colors">home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${locale}/hashtags/best`} className="hover:text-neutral-900 transition-colors">hashtags</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#a4d444] font-bold">{tag}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 md:pt-16 pb-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Stats */}
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden md:block text-4xl md:text-5xl font-black text-neutral-800 tracking-tighter uppercase italic"
              >
                BEST #{tag} HASHTAGS
              </motion.h2>
              <div className="space-y-4">
                <p className="text-xl font-bold text-neutral-700">
                    #{tag} - <span className="text-[#a4d444]">4.1M</span> uses in the last 7 days
                </p>
                <p className="text-lg font-medium text-neutral-500 max-w-2xl leading-relaxed">
                    Grow your instagram using the most popular <span className="font-black text-neutral-800 uppercase italic">{tag}</span> hashtags
                </p>
              </div>
            </div>

            {/* Primary Hashtag Cloud */}
            <div className="relative group mt-20 md:mt-24">
              <button 
                onClick={() => handleCopy(primaryHashtags, 'primary')}
                className={cn(
                    "absolute -top-10 left-0 flex items-center gap-2 px-6 py-2 rounded-t-lg transition-all font-black uppercase text-sm tracking-widest",
                    copyStatus['primary'] ? "bg-emerald-500 text-white" : "bg-[#a4d444] text-white hover:bg-[#8bc33e]"
                )}
              >
                {copyStatus['primary'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copyStatus['primary'] ? "Copied" : "Copy"}
              </button>
              <div className="border border-neutral-100 bg-neutral-50 p-4 pt-8 md:p-8 md:pt-10 rounded-none shadow-sm">
                <div className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4">
                  {primaryHashtags.map((h, i) => (
                    <span key={i} className="text-[15px] md:text-[17px] font-medium text-neutral-600 hover:text-black transition-colors cursor-default">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary Hashtag Cloud */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-neutral-500 max-w-2xl">
                Second most liked instagram hashtags used with <span className="font-black text-neutral-800 uppercase italic">{tag}</span>
              </h3>
              <div className="relative group mt-20 md:mt-24">
                <button 
                  onClick={() => handleCopy(secondaryHashtags, 'secondary')}
                  className={cn(
                      "absolute -top-10 left-0 flex items-center gap-2 px-6 py-2 rounded-t-lg transition-all font-black uppercase text-sm tracking-widest",
                      copyStatus['secondary'] ? "bg-emerald-500 text-white" : "bg-[#a4d444] text-white hover:bg-[#8bc33e]"
                  )}
                >
                  {copyStatus['secondary'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copyStatus['secondary'] ? "Copied" : "Copy"}
                </button>
                <div className="border border-neutral-100 bg-neutral-50 p-4 pt-8 md:p-8 md:pt-10 rounded-none shadow-sm">
                  <div className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4">
                    {secondaryHashtags.map((h, i) => (
                      <span key={i} className="text-[15px] md:text-[17px] font-medium text-neutral-600 hover:text-black transition-colors cursor-default">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Report (Right) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 mb-4">
                <LineChart className="h-6 w-6 text-neutral-300" />
                <h3 className="text-3xl font-black text-neutral-800 tracking-tighter uppercase italic">Hashtag report</h3>
            </div>
            
            <div className="space-y-10">
              {/* Stat 1 */}
              <div className="flex items-start gap-6 group">
                <div className="shrink-0 h-16 w-16 bg-[#4e5661] text-white flex items-center justify-center rounded-sm group-hover:bg-neutral-800 transition-colors">
                  <Instagram className="h-8 w-8" />
                </div>
                <div className="flex-1 space-y-3 pt-2">
                  <p className="text-lg font-bold text-neutral-600">Post using this hashtag: <span className="text-neutral-900 font-black">2,147,483,647</span></p>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1 }}
                        className="h-full bg-[#a4d444]" 
                    />
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-start gap-6 group">
                <div className="shrink-0 h-16 w-16 bg-[#4e5661] text-white flex items-center justify-center rounded-sm group-hover:bg-neutral-800 transition-colors">
                  <PenLine className="h-8 w-8" />
                </div>
                <div className="flex-1 space-y-3 pt-2">
                  <p className="text-lg font-bold text-neutral-600">Posts per hour: <span className="text-neutral-900 font-black">24,498</span></p>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="h-full bg-[#a4d444]" 
                    />
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-start gap-6 group">
                <div className="shrink-0 h-16 w-16 bg-[#4e5661] text-white flex items-center justify-center rounded-sm group-hover:bg-neutral-800 transition-colors">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="flex-1 space-y-3 pt-2">
                  <p className="text-lg font-bold text-neutral-600">Average likes per post: <span className="text-neutral-900 font-black">68</span></p>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '45%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-[#a4d444]" 
                    />
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-start gap-6 group">
                <div className="shrink-0 h-16 w-16 bg-[#4e5661] text-white flex items-center justify-center rounded-sm group-hover:bg-neutral-800 transition-colors">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <div className="flex-1 space-y-3 pt-2">
                  <p className="text-lg font-bold text-neutral-600">Average comments per post: <span className="text-neutral-900 font-black">2</span></p>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '20%' }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-[#a4d444]" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-info Section */}
            <div className="mt-12 p-8 border border-neutral-100 bg-neutral-50 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-[#a4d444]">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-black uppercase tracking-widest text-sm">Engagement Insights</span>
                </div>
                <p className="text-[15px] font-medium text-neutral-500 leading-relaxed">
                    Posts using <span className="text-neutral-900 font-black">#{tag}</span> typically see a higher reach during peak hours between 6PM and 9PM EST. Using this tag alongside related hashtags can boost visibility by up to 40%.
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA / Promotion Section */}
      <section className="bg-[#fcfdfa] pt-32 pb-20 overflow-hidden border-t border-neutral-100/50">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center pb-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-300 mb-8"
            >
                <Heart className="h-10 w-10 fill-current" />
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-neutral-800 tracking-tighter uppercase italic mb-6 leading-none"
            >
                Get more <span className="text-[#a4d444]">Likes</span>
            </motion.h2>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mx-auto max-w-2xl text-lg font-medium text-neutral-500 leading-relaxed mb-6"
            >
                Boost your reach and gain more likes by using top trending hashtags for your specific content.
            </motion.p>
        </div>

        {/* Full Width Image Container */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full overflow-hidden"
        >
            <div className="absolute inset-0 bg-linear-to-t from-[#fcfdfa] via-transparent to-transparent z-10 h-24 bottom-0 top-auto" />
            <Image 
                src="/images/mockups/snap_premium_devices.webp" 
                alt="Snap Multi-Device Mockup" 
                width={1200}
                height={800}
                className="w-full h-[300px] md:h-[450px] object-cover object-top drop-shadow-2xl"
            />
        </motion.div>
      </section>
    </main>
  )
}
