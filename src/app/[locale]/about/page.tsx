"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Camera, ShieldCheck, Zap, Globe, Mail, Rocket, Target, Award } from "lucide-react"
import { useParams } from "next/navigation"
import { dictionaries } from "@/dictionaries/client"
import Image from "next/image"

export default function AboutPage() {
  const params = useParams()
  const locale = params.locale as string
  const dict = (dictionaries as Record<string, any>)[locale] || dictionaries.en
  const content = (dict.about_page || dictionaries.en.about_page) as any

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Hero Section with Glassmorphism Overlay */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-96 bg-linear-to-b from-pink-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Founder & Identity */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-linear-to-tr from-pink-600 to-purple-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-neutral-900 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image 
                    src="/images/founder_portrait.webp" 
                    alt="Ramzan Ahmad - Founder of SavClip"
                    fill
                    style={{ objectFit: "cover" }}
                    className="grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                
                {/* Float Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-2xl border border-neutral-100 dark:border-neutral-800 backdrop-blur-xl">
                   <p className="text-[10px] font-black tracking-widest uppercase italic text-pink-600 mb-1">Founder / CEO</p>
                   <h3 className="text-xl font-black text-neutral-900 dark:text-white">Ramzan Ahmad</h3>
                </div>
              </motion.div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-colors group-hover:bg-pink-600 group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase italic">General Inquiry</p>
                    <p className="text-sm font-black text-neutral-900 dark:text-white">ramzaan0043@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase italic">Global HQ</p>
                    <p className="text-sm font-black text-neutral-900 dark:text-white">Kolkata, WB, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Content */}
            <div className="lg:col-span-7 space-y-16">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-pink-600" />
                  <span className="text-xs font-black tracking-[0.4em] text-pink-600">The Legend behind SavClip</span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-black tracking-tight uppercase italicer text-neutral-900 dark:text-white mb-8">
                  {content.title}
                </h1>
                <div className="flex items-center gap-4 py-4 mb-8">
                   <div className="px-4 py-2 rounded-full border-2 border-pink-600 text-pink-600 font-black text-xs tracking-widest uppercase italic animate-pulse">
                      Professional Web Developer
                   </div>
                   <div className="px-4 py-2 rounded-full border-2 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-black text-xs tracking-widest uppercase italic">
                      3+ Years Exp.
                   </div>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl border-l-4 border-pink-600 pl-8">
                  {content.intro}
                </p>
              </motion.div>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
                   {content.founder_story}
                </p>
                <div className="p-8 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 my-12">
                   <p className="text-lg leading-relaxed text-neutral-900 dark:text-white font-bold mb-4">
                      "SavClip is not just a tool; it's a testament to what we can build when we prioritize the user's need for speed and the creator's need for respect."
                   </p>
                   <p className="text-sm font-black text-pink-600 tracking-widest uppercase italic">— Ramzan Ahmad</p>
                </div>
                <p className="text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 font-semibold">
                   {content.differentiator}
                </p>
              </div>

              {/* Offerings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                 <div className="space-y-6">
                    <h3 className="flex items-center gap-3 text-xl font-black tracking-widest uppercase italic text-neutral-900 dark:text-white">
                      <Zap className="h-6 w-6 text-pink-600" />
                      {content.offerings.title}
                    </h3>
                    <ul className="space-y-3">
                      {content.offerings.items ? content.offerings.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-500 dark:text-neutral-400">
                          <div className="h-2 w-2 rounded-full bg-pink-600" />
                          {item}
                        </li>
                      )) : null}
                    </ul>
                 </div>
                 
                 <div className="space-y-12">
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-3 text-xl font-black tracking-widest uppercase italic text-neutral-900 dark:text-white">
                        <Target className="h-6 w-6 text-pink-600" />
                        {content.mission.title}
                      </h3>
                      <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {content.mission.desc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="flex items-center gap-3 text-xl font-black tracking-widest uppercase italic text-neutral-900 dark:text-white">
                        <Award className="h-6 w-6 text-pink-600" />
                        {content.vision.title}
                      </h3>
                      <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {content.vision.desc}
                      </p>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 py-16 border-y border-neutral-100 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: "Daily Users", val: "50K+" },
            { label: "Successful Saves", val: "2M+" },
            { label: "Supported Tools", val: "186+" },
            { label: "Uptime", val: "99.9%" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight uppercase italicer mb-2">{stat.val}</p>
              <p className="text-[10px] font-black tracking-widest uppercase italic text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
