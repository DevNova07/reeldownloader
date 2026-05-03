"use client"

import React, { useEffect, useState } from "react"
import { Users, Download, Star, ShieldCheck, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SocialProof({ dict }: { dict: any }) {
  const [count, setCount] = useState(142580)
  const [activeReview, setActiveReview] = useState(0)

  // Realistic looking counter increase
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const reviews = [
    {
      name: "Rahul Sharma",
      country: "India",
      text: "Best reels downloader I've ever used! No ads and original quality.",
      stars: 5,
      platform: "Instagram"
    },
    {
      name: "Sarah Johnson",
      country: "USA",
      text: "Finally a tool that works for private stories too. Super fast!",
      stars: 5,
      platform: "Snapchat"
    },
    {
      name: "Ahmed Khan",
      country: "UAE",
      text: "The YouTube Shorts downloader is pixel perfect. Highly recommended.",
      stars: 5,
      platform: "YouTube"
    },
    {
      name: "Maria Garcia",
      country: "Brazil",
      text: "Muito bom! Baixa vídeos do TikTok sem marca d'água instantaneamente.",
      stars: 5,
      platform: "TikTok"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview(prev => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviews.length])

  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Live Stats Card */}
          <div className="relative overflow-hidden group bg-white dark:bg-neutral-900 rounded-[2.5rem] p-8 border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-pink-500/5">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Download className="w-32 h-32 text-pink-500" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-pink-50 dark:bg-pink-500/10 rounded-2xl">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Global Trust</p>
            </div>
            <h3 className="text-4xl font-black tracking-tighter text-neutral-900 dark:text-white mb-2 italic">
              {count.toLocaleString()}
            </h3>
            <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
              Media extracted successfully today across 23 languages.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Live Counter</span>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="md:col-span-2 relative overflow-hidden bg-neutral-900 dark:bg-white rounded-[2.5rem] p-8 border border-neutral-800 dark:border-neutral-100 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 dark:bg-black/5 border border-white/10 dark:border-black/5">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/50 dark:text-black/50">User Review</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="min-h-[100px]"
              >
                <p className="text-xl md:text-2xl font-black text-white dark:text-black tracking-tight leading-tight italic">
                  "{reviews[activeReview].text}"
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-black">
                    {reviews[activeReview].name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white dark:text-black uppercase tracking-tight">
                      {reviews[activeReview].name}
                    </h4>
                    <p className="text-[10px] font-bold text-white/40 dark:text-black/40 uppercase tracking-widest">
                      {reviews[activeReview].country} • {reviews[activeReview].platform} User
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 right-8 flex gap-1.5">
              {reviews.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 w-4 rounded-full transition-all duration-500 ${i === activeReview ? 'bg-pink-600 w-8' : 'bg-white/10 dark:bg-black/10'}`} 
                />
              ))}
            </div>
          </div>

        </div>

        {/* Security Badges Row */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">SSL Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Global CDN</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">4.9/5 Rating</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">10M+ Users</span>
          </div>
        </div>
      </div>
    </div>
  )
}
