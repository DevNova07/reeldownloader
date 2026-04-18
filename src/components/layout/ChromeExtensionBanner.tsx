"use client"

import React from "react"
import { motion } from "framer-motion"
import { Chrome, Rocket } from "lucide-react"

interface ChromeExtensionBannerProps {
    dict?: any
}

export function ChromeExtensionBanner({ dict }: ChromeExtensionBannerProps) {
  const t = dict?.banner || {
    badge: "Coming Soon",
    title: "Our Google Chrome Extension",
    desc: "Download any video or story with just one click directly from your browser. Stay tuned for the launch!"
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-4xl bg-linear-to-r from-neutral-900 via-[#1a1a1a] to-neutral-900 p-8 sm:p-12 border border-white/5 shadow-2xl"
      >
        <div className="absolute top-0 right-0 -m-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -m-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
        
        <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:text-left md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-black text-blue-400 uppercase tracking-widest border border-blue-500/20">
              <Rocket className="h-4 w-4" />
              {t.badge}
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-md text-lg font-medium text-neutral-400">
              {t.desc}
            </p>
          </div>
          
          <div className="flex shrink-0 items-center justify-center rounded-3xl bg-linear-to-tr from-white/5 to-white/10 p-8 shadow-2xl backdrop-blur-xl border border-white/10 ring-1 ring-white/5">
            <Chrome className="h-20 w-20 text-white animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
