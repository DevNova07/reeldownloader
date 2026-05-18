"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { History, Heart, X, Trash2, Download, PlayCircle, ExternalLink, Instagram, Facebook, Youtube, Twitter } from "lucide-react"
import { useDownloadHistory } from "@/hooks/useDownloadHistory"
import { cn } from "@/utils/cn"

function HistoryImage({ src, platform }: { src: string; platform?: string }) {
  const [error, setError] = React.useState(false)

  if (error || !src) {
    const lowerPlatform = platform?.toLowerCase() || ""
    if (lowerPlatform.includes("instagram")) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-linear-to-tr from-purple-500/10 via-pink-500/10 to-orange-500/10 text-pink-500">
          <Instagram className="h-8 w-8 animate-pulse" />
        </div>
      )
    }
    if (lowerPlatform.includes("facebook")) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-blue-500/10 text-blue-600">
          <Facebook className="h-8 w-8" />
        </div>
      )
    }
    if (lowerPlatform.includes("youtube")) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-red-500/10 text-red-600">
          <Youtube className="h-8 w-8" />
        </div>
      )
    }
    if (lowerPlatform.includes("twitter") || lowerPlatform.includes("x")) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-neutral-900/10 dark:bg-white/10 text-neutral-900 dark:text-white">
          <Twitter className="h-8 w-8" />
        </div>
      )
    }
    return (
      <div className="flex items-center justify-center w-full h-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
        <PlayCircle className="h-8 w-8" />
      </div>
    )
  }

  return (
    <img 
      src={src} 
      alt="" 
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
      className="object-cover w-full h-full transition-transform group-hover:scale-105" 
    />
  )
}

export function HistoryDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'recent' | 'favorites'>('recent')
  const { allHistory, favorites, clearHistory, toggleFavorite } = useDownloadHistory()

  const displayData = activeTab === 'recent' ? allHistory : favorites

  React.useEffect(() => {
    const handleToggle = () => setIsOpen(true)
    window.addEventListener('toggle-history-drawer', handleToggle)
    return () => window.removeEventListener('toggle-history-drawer', handleToggle)
  }, [])

  return (
    <>
      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl flex flex-col h-full border-l border-neutral-100 dark:border-neutral-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-100 dark:border-neutral-800">
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
                  My <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-violet-500">Hub</span>
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-95 bg-neutral-50 dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700"
                  aria-label="Close"
                >
                  <X className="h-6 w-6 text-neutral-900 dark:text-white" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex p-2 bg-neutral-100 dark:bg-neutral-950 mx-6 mt-6 rounded-2xl">
                <button
                  onClick={() => setActiveTab('recent')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all",
                    activeTab === 'recent' 
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" 
                      : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  )}
                >
                  <History className="h-4 w-4" /> Recent
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all",
                    activeTab === 'favorites' 
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" 
                      : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  )}
                >
                  <Heart className="h-4 w-4" /> Favorites
                </button>
              </div>

              {/* Content List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {displayData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                    {activeTab === 'recent' ? <History className="h-16 w-16 mb-4" /> : <Heart className="h-16 w-16 mb-4" />}
                    <p className="text-lg font-bold uppercase tracking-widest">No Items Yet</p>
                    <p className="text-sm font-medium mt-2">Your downloaded {activeTab === 'favorites' ? 'favorites' : 'history'} will appear here.</p>
                  </div>
                ) : (
                  displayData.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 group hover:border-pink-500 transition-all">
                      <div className="relative h-20 w-20 rounded-2xl bg-neutral-200 dark:bg-neutral-800 overflow-hidden shrink-0">
                        <HistoryImage src={item.thumbnail} platform={item.platform} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <p className="font-bold text-neutral-900 dark:text-white text-sm line-clamp-2 leading-snug mb-1">
                          {item.title || "Social Media Content"}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-pink-600 mb-auto">
                          {item.platform || "Direct"}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-[10px] font-bold uppercase tracking-wider"
                          >
                            <ExternalLink className="h-3 w-3" /> Visit
                          </a>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
                          >
                            <Heart className={cn("h-4 w-4", item.isFavorite ? "fill-pink-600 text-pink-600" : "text-neutral-400")} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {allHistory.length > 0 && (
                <div className="p-6 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => clearHistory()}
                    className="flex w-full items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold uppercase tracking-wider text-xs hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" /> Clear All History
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
