"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Hash, Settings, Workflow, Heart, Tag, Star, User, MessageCircle, Send, Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"
import { type Locale } from "@/i18n"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { PremiumSearch } from "@/components/shared/PremiumSearch"

export function HashtagView({ locale, dict }: { locale: Locale, dict: any }) {
  const router = useRouter()
  const [keyword, setKeyword] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)

  // Defensive fallback to prevent crashes
  const hashtagDict = dict || {
    trending_title: "Trending New Hashtags",
    title: "AI Hashtags",
    placeholder: "Enter keyword...",
    subtitle: "Grow your reach with trending tags."
  }

  const handleGenerate = () => {
    if (!keyword.trim()) return
    const cleanTag = keyword.trim().replace(/^#/, "")
    router.push(`/${locale}/hashtags/${cleanTag}`)
  }

  return (
    <main className="min-h-screen bg-white pb-12 selection:bg-neutral-100 dark:bg-black">
      {/* Sub-Navbar */}

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden min-h-[450px] flex items-center justify-center text-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-neutral-900"
          style={{
            backgroundImage: "url('/images/hashtag-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-light tracking-[0.2em] text-white md:text-5xl"
          >
            {(hashtagDict?.trending_title || 'TRENDING').split(' ')[0]} <span className="text-[#a4d444] font-normal">{(hashtagDict?.trending_title || 'NEW').split(' ')[1] || 'NEW'}</span> {(hashtagDict?.title || 'HASHTAGS').split(' ')[1] || 'HASHTAGS'}
          </motion.h1>

          {/* Search Bar Container */}
          <PremiumSearch 
            value={keyword}
            onChange={setKeyword}
            onSearch={handleGenerate}
            placeholder={hashtagDict.placeholder}
            isLoading={isGenerating}
            accentColor="text-[#a4d444]"
            buttonColor="bg-[#a4d444]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium text-white/90 tracking-wide brightness-110 hidden sm:block"
          >
            {hashtagDict.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Sub-navigation Bar */}
      <nav className="w-full border-b border-neutral-100 bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-5 md:gap-x-20">
          {[
            { name: "NEW HASHTAGS", href: `/${locale}/hashtags/new` },
            { name: "BEST HASHTAGS", href: `/${locale}/hashtags/best` },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="whitespace-nowrap text-[13px] font-bold tracking-widest uppercase italic text-neutral-400 transition-colors hover:text-[#a4d444]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Grid Container (Side-by-Side on PC) */}
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[1fr_470px] lg:gap-16 lg:items-start lg:px-8">
        <p className="px-4 mt-8 text-lg text-neutral-500 dark:text-neutral-400 font-medium opacity-80 sm:hidden text-center hidden sm:block">{hashtagDict.subtitle}</p>
        
        {/* Left Column: Core Tool Information & Reviews */}
        <div className="space-y-24 pt-16">
          
          {/* Benefit Sections */}
          <section className="px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Best Hashtags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                  <Settings className="h-10 w-10 text-neutral-400" strokeWidth={1} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight uppercase italic">Best Hashtags for your posts</h3>
                  <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[320px] mx-auto">
                    Our algorithm calculates the best hashtags for you based on historical data. For TikTok you can try <span className="text-[#a4d444] font-medium cursor-pointer hover:underline">tiktok hashtags</span>.
                  </p>
                </div>
              </motion.div>

              {/* More Comments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                  <Workflow className="h-10 w-10 text-neutral-400" strokeWidth={1} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight uppercase italic">Get more Comments</h3>
                  <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[320px] mx-auto">
                    Increase comments and engagement by using the hashtags chosen by our algorithm
                  </p>
                </div>
              </motion.div>

              {/* More Likes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                  <Heart className="h-10 w-10 text-neutral-400" strokeWidth={1} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight uppercase italic">Get more Likes</h3>
                  <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[320px] mx-auto">
                    Boost your reach and gain more likes by using top trending hashtags for your specific content.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Responsive Mockup Section - (Kept full width of column) */}
          <section className="relative w-full py-0 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100/50 dark:border-neutral-800 overflow-hidden h-[400px] md:h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center p-0"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#a4d444]/5 blur-[150px] pointer-events-none" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/images/responsive-mockup.webp"
                  alt="Snap Responsive Platform"
                  width={1200}
                  height={800}
                  className="w-full min-w-full h-full object-cover object-center scale-[1.1] drop-shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
                />
              </div>
            </motion.div>
          </section>

          {/* Instagram Hashtags Info Section */}
          <section className="px-4 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 space-y-4"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight uppercase italic underline decoration-[#a4d444] decoration-2 underline-offset-12">Instagram Hashtags</h2>
              <p className="max-w-2xl text-[11px] font-bold text-neutral-400 pt-4 tracking-[0.2em]">
                Receives 10 times more likes to your posts on Instagram using the hashtags suggested by us.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
              {[
                { title: "Hashtags", tags: "americanstyle, usafood, tiktok", desc: "The best hashtags to use on February" },
                { title: "Top Hashtags", tags: "love, instagood, photooftheday", desc: "Most popular Instagram hashtags on the planet" },
                { title: "Trending Hashtags", tags: "stayhome, likes, quotes", desc: "Trending hashtags on Instagram" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                  <div className="h-0.5 w-10 bg-black dark:bg-white" />
                  <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                    <Tag className="h-3.5 w-3.5 text-[#a4d444]" />
                    <span className="uppercase tracking-widest uppercase italic">{item.tags}</span>
                  </div>
                  <p className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400 tracking-tight uppercase italic hidden sm:block">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* User Reviews Section */}
          <section className="px-4 text-left border-t border-neutral-100/50 dark:border-neutral-800 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 space-y-4"
            >
              <h2 className="text-3xl font-bold text-neutral-800 dark:text-white tracking-tight uppercase italic underline decoration-[#a4d444] decoration-2 underline-offset-12">What Our Users Say</h2>
              <p className="max-w-2xl text-[11px] font-bold text-neutral-500 dark:text-neutral-400 pt-4 tracking-[0.2em]">
                Thousands of creators trust Snap for their hashtag strategy and growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                { name: "Alex Rivera", handle: "@arivera", text: "Finally a tool that actually understands my niche! My reach has literally doubled in two weeks.", color: "bg-blue-500/10 text-blue-500" },
                { name: "Sarah Jenkins", handle: "@sarah.j", text: "The hashtag cloud feature is a game-changer for my food blog. Super easy to use.", color: "bg-pink-500/10 text-pink-500" },
                { name: "Marcus Chen", handle: "@mchen_studio", text: "Best hashtag generator I've used. No junk tags, just high-performance results.", color: "bg-emerald-500/10 text-emerald-500" },
                { name: "Elena Gomez", handle: "@elena_g", text: "I love how it categorizes tags. It's so much faster to plan my posts now!", color: "bg-purple-500/10 text-purple-500" }
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white dark:bg-neutral-900 p-6 rounded-none border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4 text-[#a4d444]">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-[14px] text-neutral-600 dark:text-neutral-400 mb-6 font-medium leading-relaxed">&quot;{review.text}&quot;</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-neutral-50 dark:border-neutral-800">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${review.color} border border-current`}>
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-neutral-900 dark:text-white leading-tight">{review.name}</span>
                      <span className="text-[9px] text-neutral-400 font-bold tracking-widest uppercase italic">{review.handle} • Verified</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Discovery Sidebar (PC Only) */}
        <aside className="hidden lg:block sticky top-32 pt-16">
          <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[470px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none overflow-hidden shadow-3xl"
          >
              {/* Instagram Header Mockup */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-neutral-50 dark:bg-black p-0.5 border border-neutral-100 dark:border-neutral-800">
                          <div className="h-full w-full rounded-full bg-[#f8faf2] dark:bg-neutral-950 flex items-center justify-center">
                              <Hash className="h-5 w-5 text-[#a4d444]" />
                              </div>
                      </div>
                      <div className="leading-tight">
                          <p className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1">snaphashtags_official</p>
                          <p className="text-xs font-medium text-neutral-400">1.1M followers</p>
                      </div>
                  </div>
                  <button className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-1.5 text-xs font-bold text-neutral-900 dark:text-white transition-colors hover:bg-neutral-50 dark:hover:bg-black">
                      View profile
                  </button>
              </div>

              {/* The Post Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-800">
                  <Image 
                      src="/images/instagram-sample.webp" 
                      alt="Snap Hashtags Discovery Ad" 
                      width={500}
                      height={500}
                      className="h-full w-full object-cover"
                  />
                  
                  {/* Visual Branding Overlays */}
                  <div className="absolute left-6 top-[72%] bg-white/95 dark:bg-black/95 px-2 py-0.5 rounded-[2px] shadow-sm border border-neutral-100 dark:border-neutral-800">
                      <span className="text-[12px] font-bold text-[#a4d444]">snaphashtags.com</span>
                  </div>
                  <div className="absolute left-6 top-[78%] bg-[#a4d444] px-4 py-1.5 rounded-[2px] shadow-lg">
                      <span className="text-3xl font-bold text-white tracking-tight uppercase italicer">#foodie</span>
                  </div>
              </div>

              {/* Interaction Row */}
              <div className="p-4 bg-white dark:bg-neutral-900">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                          <Heart className="h-7 w-7 text-neutral-900 dark:text-white" />
                          <MessageCircle className="h-7 w-7 text-neutral-900 dark:text-white" />
                          <Send className="h-7 w-7 text-neutral-900 dark:text-white" />
                      </div>
                      <Bookmark className="h-7 w-7 text-neutral-900 dark:text-white" />
                  </div>

                  {/* Likes & Caption Text */}
                  <div className="space-y-2">
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">42,704 likes</p>
                      <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                          <span className="font-bold mr-2">snaphashtags_official</span>
                          Hashtags for your posts
                      </p>
                      
                      {/* The Massive Hashtag Cloud */}
                      <p className="text-[14px] font-bold text-[#00376b] dark:text-sky-400 mt-3 leading-relaxed tracking-tight uppercase italic">
                          #foodie #food #foodporn #instafood #foodphotography #foodstagram #foodblogger #yummy #foodlover #delicious #foodgasm #instagood #foodies #homemade #healthyfood #tasty #foodpics #dinner #foodiesofinstagram #love #lunch #yum #dessert #cooking #breakfast #foodblog #chef #eat #restaurant #bhfyp
                      </p>
                      
                      <p className="text-sm font-medium text-neutral-400 mt-4">View all 97 comments</p>
                  </div>
              </div>
          </motion.div>
        </aside>
      </div>
    </main>
  )
}
