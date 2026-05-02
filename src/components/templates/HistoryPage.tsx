"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDownloadHistory } from "@/hooks/useDownloadHistory"
import { History, Trash2, ExternalLink, Clock, Calendar, Search, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { cn } from "@/utils/cn"

export default function HistoryPage({ dict, locale }: { dict: any, locale: string }) {
  const { history, clearHistory } = useDownloadHistory()
  const [searchTerm, setSearchTerm] = React.useState("")
  const router = useRouter()

  const filteredHistory = React.useMemo(() => {
    return history.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.platform?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [history, searchTerm])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-neutral-900 to-black px-4 pt-16 pb-12 sm:pt-24 sm:pb-20 sm:px-6 lg:px-8">
        <HeroEffect color="bg-pink-500" intensity="medium" />
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 shadow-2xl backdrop-blur-xl ring-1 ring-white/20"
            >
              <History className="h-8 w-8 text-pink-500" />
            </motion.div>
            
            <h1 className="text-4xl font-black text-white sm:text-6xl uppercase italic tracking-tighter">
              {dict.common?.history || "Download History"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-medium text-white/50 uppercase tracking-widest text-xs hidden sm:block">
              Saved locally on your device • No login required
            </p>

            <div className="mt-12 w-full max-w-md relative group">
              <div className="absolute inset-0 bg-pink-500/10 blur-xl rounded-full" />
              <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-1 focus-within:ring-2 focus-within:ring-pink-500/30 transition-all">
                <Search className="h-5 w-5 text-white/30 ml-4" />
                <input 
                  type="text"
                  placeholder="Search history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent py-4 px-4 text-white placeholder:text-white/20 outline-none text-sm font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
             <Clock className="h-4 w-4 text-neutral-400" />
             <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total: {filteredHistory.length} Items</span>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => {
                if(confirm("Are you sure you want to clear your entire history?")) {
                  clearHistory()
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear All
            </button>
          )}
        </div>

        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 rounded-full bg-neutral-100 p-8 dark:bg-neutral-900">
              <History className="h-12 w-12 text-neutral-300 dark:text-neutral-700" />
            </div>
            <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">No history found</h3>
            <p className="mt-2 max-w-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Start downloading content from your favorite social media platforms to see it here.
            </p>
            <Link 
              href="/"
              className="mt-8 rounded-2xl bg-pink-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-pink-600/20 hover:bg-pink-500 transition-all active:scale-95"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredHistory.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative flex flex-col bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={item.thumbnail ? `/api/proxy-download?url=${encodeURIComponent(item.thumbnail)}&type=image&inline=true` : "/window.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Platform Badge */}
                    <div className="absolute top-4 left-4 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white ring-1 ring-white/20">
                      {item.platform || "App"}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                       <div className="flex items-center gap-1.5 text-white">
                          <Calendar className="h-3 w-3 opacity-60" />
                          <span className="text-[9px] font-black uppercase tracking-tighter opacity-80">
                             {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                       </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-sm font-black text-neutral-900 dark:text-white line-clamp-2 leading-snug uppercase italic mb-6">
                      {item.title}
                    </h3>
                    
                    <div className="mt-auto flex gap-2">
                       <button
                         onClick={() => {
                           const platformPath = item.platform === 'instagram' ? '' : `/${item.platform}`;
                           const localePrefix = locale === 'en' ? '' : `/${locale}`;
                           router.push(`${localePrefix}${platformPath}?url=${encodeURIComponent(item.url)}`);
                         }}
                         className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-pink-600/20 hover:bg-pink-500 transition-all active:scale-95"
                       >
                         <Download className="h-3.5 w-3.5" />
                         Redownload
                       </button>
                       <a
                         href={item.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm"
                         title="View Original"
                       >
                         <ExternalLink className="h-4 w-4" />
                       </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
