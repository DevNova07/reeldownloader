"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Hash } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/utils/cn"

import { ALL_HASHTAGS } from "@/data/hashtags"


export default function BestHashtagsPage() {
  const params = useParams()
  const locale = params.locale as string

  return (
    <main className="min-h-screen bg-white">
      {/* Sub-Navigation */}
      <nav className="w-full border-b border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-5 md:gap-x-20">
          {[
            { name: "NEW HASHTAGS", href: `/${locale}/hashtags/new` },
            { name: "BEST HASHTAGS", href: `/${locale}/hashtags/best` },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                  "whitespace-nowrap text-[13px] font-bold tracking-widest transition-colors uppercase",
                  item.name === "BEST HASHTAGS" ? "text-[#a4d444]" : "text-neutral-500 hover:text-[#a4d444]"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Header Section */}
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 text-center lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-neutral-800 uppercase italic leading-none"
        >
          1000+ Most Popular <span className="text-[#a4d444]">Hashtags</span>
        </motion.h1>
      </section>

      {/* Table Section */}
      <section className="mx-auto max-w-5xl px-4 pb-24 lg:px-8">
        <div className="overflow-x-auto rounded-none border border-neutral-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="px-3 sm:px-8 py-3 text-[10px] sm:text-sm font-black uppercase tracking-widest text-neutral-400 w-16 sm:w-24">Rank</th>
                <th className="px-3 sm:px-8 py-3 text-[10px] sm:text-sm font-black uppercase tracking-widest text-neutral-400">Hashtag</th>
                <th className="px-3 sm:px-8 py-3 text-[10px] sm:text-sm font-black uppercase tracking-widest text-neutral-400 text-right">Post Count</th>
              </tr>
            </thead>
            <tbody>
              {ALL_HASHTAGS.map((item, i) => (
                <motion.tr 
                  key={item.tag}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.01 }}
                  className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/30 transition-colors group"
                >
                  <td className="px-3 sm:px-8 py-3 text-sm sm:text-base font-medium text-neutral-800">{item.rank}</td>
                  <td className="px-3 sm:px-8 py-3">
                    <Link 
                      href={`/${locale}/hashtags/${item.tag.replace('#', '')}`}
                      className="flex items-center gap-2 group/tag w-fit"
                    >
                        <Hash className="h-4 w-4 text-neutral-300 group-hover/tag:text-[#a4d444] transition-colors" />
                        <span className="text-lg font-medium text-neutral-900 tracking-tight group-hover/tag:underline decoration-1 underline-offset-4">{item.tag.replace('#', '')}</span>
                    </Link>
                  </td>
                  <td className="px-3 sm:px-8 py-3 text-sm sm:text-base font-medium text-neutral-500 text-right tabular-nums tracking-tight sm:tracking-wider">{item.count}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
                Last updated: February 2026 • Based on global engagement data
            </p>
        </div>
      </section>
    </main>
  )
}
