"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/utils/cn"

interface PremiumInfoSectionProps {
  title: string
  description: string
  imageSrc?: string
  accentColor?: string
  className?: string
}

export function PremiumInfoSection({
  title,
  description,
  imageSrc = "/images/platforms/instagram-logo.webp",
  accentColor = "text-pink-600",
  className
}: PremiumInfoSectionProps) {
  return (
    <section className={cn("px-4 py-12 sm:py-24 overflow-hidden", className)}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex flex-col items-center gap-12">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center w-full"
          >
            <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl leading-[1.1] text-center">
              {title}
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium max-w-4xl whitespace-pre-line text-center">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
               <span className="inline-flex items-center rounded-full bg-pink-100 px-6 py-2 text-xs font-black uppercase tracking-widest text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 shadow-sm">
                 <span className="mr-2 h-2 w-2 rounded-full bg-pink-600 animate-pulse" />
                 Verified Secure
               </span>
               <span className="inline-flex items-center rounded-full bg-purple-100 px-6 py-2 text-xs font-black uppercase tracking-widest text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 shadow-sm">
                 HD Quality
               </span>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative flex justify-center"
          >
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-[450px] lg:w-[450px]">
               {/* Decorative background effects */}
               <div className="absolute inset-0 bg-linear-to-tr from-pink-500/20 to-purple-500/20 blur-3xl rounded-full animate-pulse" />
               
               <Image
                 src={imageSrc}
                 alt={title}
                 fill
                 className="object-contain drop-shadow-[0_35px_35px_rgba(255,0,128,0.3)] hover:scale-105 transition-transform duration-500"
                 sizes="(max-width: 768px) 256px, 384px"
               />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
