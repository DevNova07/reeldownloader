"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Layers, 
  Download, 
  Check, 
  X, 
  Search, 
  Sparkles, 
  Filter, 
  Trash2, 
  List, 
  Grid, 
  Info, 
  ShieldCheck, 
  Zap, 
  PlaySquare 
} from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import { getDictionary } from "@/dictionaries/client"
import { type Locale } from "@/i18n"
import { toast } from "react-hot-toast"
import Image from "next/image"

interface MediaItem {
  id: string
  thumbnail: string
  previewUrl: string
  type: "video" | "image"
  selected: boolean
  title: string
}

export default function BulkDownloader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [input, setInput] = React.useState("")
  const [isFetching, setIsFetching] = React.useState(false)
  const [items, setItems] = React.useState<MediaItem[]>([])
  const [view, setView] = React.useState<"grid" | "list">("grid")
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [activePreview, setActivePreview] = React.useState<MediaItem | null>(null)

  const locale = (pathname.split('/')[1] || 'en') as Locale
  const dict = getDictionary(locale)

  // Auto-fetch if username in URL
  React.useEffect(() => {
    const user = searchParams.get('username')
    if (user) {
      setInput(user)
      const timer = setTimeout(() => {
        const fetchBtn = document.getElementById('fetch-btn')
        fetchBtn?.click()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleFetch = () => {
    if (!input.trim()) return
    setIsFetching(true)
    setItems([])
    
    const isUrl = /^(https?:\/\/)?(www\.)?(instagram\.com|facebook\.com|tiktok\.com)/.test(input.toLowerCase())
    const cleanInput = input.trim().replace('@', '')

    setTimeout(() => {
      if (isUrl) {
        setItems([{
          id: "single-1",
          thumbnail: `https://picsum.photos/seed/${Math.random()}/400/600`,
          previewUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          type: "video",
          selected: true,
          title: "Detected: Single Video"
        }])
        toast.success("Single Video Detected!")
      } else {
        const mockItems: MediaItem[] = Array.from({ length: 12 }).map((_, i) => ({
          id: `media-${i}`,
          thumbnail: `https://picsum.photos/seed/${cleanInput}-${i}/400/600`,
          previewUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          type: "video",
          selected: true,
          title: `@${cleanInput} Reel #${i + 1}`
        }))
        setItems(mockItems)
        toast.success(`Found 12 videos for @${cleanInput}`)
      }
      setIsFetching(false)
    }, 2500)
  }

  const toggleSelect = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  const toggleAll = () => {
    const allSelected = items.every(i => i.selected)
    setItems(prev => prev.map(i => ({ ...i, selected: !allSelected })))
  }

  // Watch progress to finish download
  React.useEffect(() => {
    if (progress >= 100 && isDownloading) {
      setIsDownloading(false)
      toast.success(`Successfully downloaded items!`)
      // Reset progress after a delay
      setTimeout(() => setProgress(0), 1000)
    }
  }, [progress, isDownloading])

  const handleBulkDownload = () => {
    const selectedCount = items.filter(i => i.selected).length
    if (selectedCount === 0) return
    
    setIsDownloading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const selectedCount = items.filter(i => i.selected).length

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black text-neutral-900 dark:text-white pb-32 selection:bg-pink-100 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-24">
        {/* Header Section */}
        <div className="relative text-center mb-10 sm:mb-28 space-y-4 sm:space-y-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-500/10 to-rose-500/10 px-4 py-1.5 sm:px-6 sm:py-2 border border-pink-500/20 backdrop-blur-md shadow-sm"
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 bg-pink-500 rounded-full"
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-pink-600 dark:text-pink-400">
              Smart Engine v2.0
            </span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.9] sm:leading-[0.85] dark:text-white px-6 sm:px-12">
            <span className="block text-neutral-400/20 dark:text-white/10 absolute -top-2 sm:-top-8 left-1/2 -translate-x-1/2 select-none -z-10">STREAMLINE</span>
            Bulk <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 via-rose-500 to-orange-500 drop-shadow-sm pr-2">Downloader</span>
          </h1>
          
          <p className="text-base sm:text-xl font-bold text-neutral-500 tracking-tight opacity-80 max-w-2xl mx-auto leading-relaxed px-4 hidden sm:block">
            Unleash the power of batch downloading. Paste a profile link or username to grab everything in high definition instantly.
          </p>
        </div>

        {/* Search Experience */}
        <section className="mb-10 sm:mb-24 max-w-4xl mx-auto relative">
          <div className="absolute -inset-4 bg-linear-to-r from-pink-600/20 via-purple-600/20 to-blue-600/20 blur-3xl opacity-30 animate-pulse" />
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 rounded-[24px] sm:rounded-[40px] bg-white/70 dark:bg-neutral-900/70 p-2 sm:p-4 backdrop-blur-3xl shadow-2xl border border-white dark:border-neutral-800"
          >
            <div className="flex-1 flex items-center gap-3 sm:gap-4 px-3 sm:px-4">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600 dark:text-pink-400" />
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Username or link..."
                className="flex-1 bg-transparent py-2.5 sm:py-4 text-base sm:text-xl font-black outline-none placeholder:text-neutral-300 dark:placeholder:text-neutral-700 tracking-tight"
              />
            </div>
            <button 
              id="fetch-btn"
              onClick={handleFetch}
              disabled={isFetching || !input.trim()}
              className="flex h-12 sm:h-16 items-center justify-center gap-2 sm:gap-3 rounded-[18px] sm:rounded-[32px] bg-black dark:bg-white px-8 sm:px-12 text-[10px] sm:text-[12px] font-black uppercase tracking-widest text-white dark:text-black transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">{isFetching ? "Analyzing..." : "Batch Fetch"}</span>
              {!isFetching && <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 relative z-10 animate-bounce" />}
            </button>
          </motion.div>
        </section>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {isFetching ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-[24px] sm:rounded-[32px] bg-neutral-200/50 dark:bg-neutral-800/50 overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
                  />
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="h-3 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                    <div className="h-2 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : items.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 sm:space-y-10"
            >
              {/* Ultra-Modern Control Panel */}
              <div className="sticky top-4 z-40 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] border border-white/50 dark:border-neutral-800 shadow-2xl">
                 <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8">
                    <button 
                      onClick={toggleAll} 
                      className="group flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-pink-600"
                    >
                      <motion.div 
                        whileTap={{ scale: 0.8 }}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 border-pink-500 flex items-center justify-center transition-all ${items.every(i => i.selected) ? "bg-pink-500" : ""}`}
                      >
                        <AnimatePresence>
                          {items.every(i => i.selected) && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white stroke-[3]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      {items.every(i => i.selected) ? "Deselect All" : "Select All"}
                    </button>
                    <div className="flex flex-col">
                       <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Scan Results</span>
                       <span className="text-base sm:text-xl font-black italic tracking-tighter">{items.length} Items Found</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-4">
                    <div className="flex bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 backdrop-blur-md">
                       <button onClick={() => setView("grid")} className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all ${view === "grid" ? "bg-white dark:bg-neutral-700 shadow-lg text-pink-600 scale-105 sm:scale-110" : "text-neutral-500"}`}>
                         <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                       </button>
                       <button onClick={() => setView("list")} className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all ${view === "list" ? "bg-white dark:bg-neutral-700 shadow-lg text-pink-600 scale-105 sm:scale-110" : "text-neutral-500"}`}>
                         <List className="h-4 w-4 sm:h-5 sm:w-5" />
                       </button>
                    </div>
                    <button 
                      onClick={handleBulkDownload}
                      disabled={selectedCount === 0 || isDownloading}
                      className="hidden sm:flex h-16 items-center gap-4 rounded-3xl bg-linear-to-r from-pink-600 to-rose-600 px-10 text-[11px] font-black uppercase tracking-widest text-white shadow-2xl shadow-pink-500/40 transition-all hover:scale-[1.05] hover:rotate-1 active:scale-95 disabled:opacity-20"
                    >
                      {isDownloading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Processing {progress}%</span>
                        </div>
                      ) : (
                        <>
                          <span>Download {selectedCount} Clips</span>
                          <Download className="h-5 w-5" />
                        </>
                      )}
                    </button>
                 </div>
              </div>

              {/* Dynamic Grid */}
              {view === "grid" ? (
                <motion.div 
                  layout
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
                >
                  {items.map((item, idx) => (
                    <motion.div 
                      layout
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`relative aspect-[3/4] rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer group transition-all duration-500 ${item.selected ? "ring-4 ring-pink-600 ring-offset-4 dark:ring-offset-black" : "hover:shadow-2xl hover:shadow-pink-500/10"}`}
                    >
                      <Image 
                        src={item.thumbnail} 
                        alt={item.title} 
                        fill 
                        className={`object-cover transition-all duration-700 group-hover:scale-110 ${item.selected ? "brightness-50 grayscale-[0.3]" : ""}`} 
                      />
                      
                      {/* Selection Overlay */}
                      <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${item.selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                      
                      <div className="absolute top-4 right-4">
                        <motion.div 
                          initial={false}
                          animate={item.selected ? { scale: 1.1, rotate: 0 } : { scale: 1, rotate: -10 }}
                          className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-500 ${item.selected ? "bg-pink-600 text-white shadow-xl" : "bg-black/20 backdrop-blur-xl text-white/50 border border-white/20"}`}
                        >
                          <AnimatePresence mode="wait">
                            {item.selected ? (
                              <motion.div key="checked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <Check className="h-5 w-5 stroke-[3]" />
                              </motion.div>
                            ) : (
                              <motion.div key="unchecked" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="h-4 w-4 rounded-full border-2 border-white/30" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/90 drop-shadow-md truncate max-w-[100px]">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-pink-600/90 backdrop-blur-md px-2 py-1 rounded-lg text-white w-fit shadow-lg">
                            {item.type}
                          </span>
                        </div>
                        {item.type === 'video' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              setActivePreview(item)
                            }}
                            className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-pink-600 transition-colors shadow-lg active:scale-90"
                          >
                            <PlaySquare className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`flex items-center justify-between p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border-2 transition-all cursor-pointer group ${item.selected ? "border-pink-600 bg-pink-600/5 shadow-xl shadow-pink-500/5" : "border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"}`}
                    >
                      <div className="flex items-center gap-5 sm:gap-6">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden shrink-0 shadow-2xl">
                          <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          {item.type === 'video' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setActivePreview(item)
                              }}
                              className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <PlaySquare className="h-8 w-8 text-white" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-1">
                           <p className="text-base sm:text-lg font-black tracking-tighter uppercase italic hidden sm:block">{item.title}</p>
                           <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Media Hash: {item.id}</p>
                           <div className="flex gap-2">
                             <span className="text-[8px] font-black uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-500">4K ULTRA</span>
                             <span className="text-[8px] font-black uppercase bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 rounded text-pink-600">PRO GRADE</span>
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         {item.type === 'video' && (
                           <button 
                             onClick={(e) => {
                               e.stopPropagation()
                               setActivePreview(item)
                             }}
                             className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-pink-600 transition-colors"
                           >
                             <PlaySquare className="h-5 w-5" />
                           </button>
                         )}
                        <motion.div 
                          animate={item.selected ? { scale: 1.1 } : { scale: 1 }}
                          className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${item.selected ? "bg-pink-600 text-white shadow-lg" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-300"}`}
                        >
                          {item.selected ? <Check className="h-5 w-5 stroke-[3]" /> : <div className="h-5 w-5 rounded-full border-2 border-current opacity-20" />}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-24 sm:py-32 text-center space-y-8"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-8 bg-pink-500/10 blur-[60px] rounded-full" />
                <div className="relative h-32 w-32 rounded-[48px] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center mx-auto text-neutral-200 dark:text-neutral-800 shadow-2xl rotate-3">
                   <Layers className="h-14 w-14" />
                </div>
              </div>
              <div className="space-y-3">
                 <h3 className="text-3xl font-black uppercase italic tracking-tighter">Engine Standby</h3>
                 <p className="text-lg font-bold text-neutral-400 max-w-sm mx-auto">Input a valid Instagram username or reel link to initialize the batch processor.</p>
              </div>
              <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-neutral-300">
                <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Encrypted</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
                <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Ultra Fast</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Preview Modal */}
        <AnimatePresence>
          {activePreview && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
              onClick={() => setActivePreview(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg aspect-[9/16] bg-black rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(236,72,153,0.3)] border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <video 
                  src={activePreview.previewUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  controls
                  playsInline
                />
                <button 
                  onClick={() => setActivePreview(null)}
                  className="absolute top-6 right-6 h-12 w-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-pink-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="absolute bottom-10 left-10 right-10">
                   <p className="text-xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">{activePreview.title}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Highlights */}
        <div className="mt-48 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: <ShieldCheck className="h-7 w-7" />, title: "Secure Fetch", desc: "Military-grade encryption ensures your profile browsing stays private and secure." },
             { icon: <Sparkles className="h-7 w-7" />, title: "AI Enhancement", desc: "Our algorithm automatically detects and selects the highest bitrate available." },
             { icon: <Filter className="h-7 w-7" />, title: "Smart Sorting", desc: "Automatically organizes Reels, Stories, and Posts into a clean, unified grid." }
           ].map((card, i) => (
             <motion.div 
               whileHover={{ y: -10 }}
               key={i} 
               className="p-10 rounded-[48px] bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-white dark:border-neutral-800 shadow-2xl space-y-6"
             >
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                  {card.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">{card.title}</h3>
                  <p className="text-base font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed opacity-80">{card.desc}</p>
                </div>
             </motion.div>
           ))}
        </div>

        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div 
              initial={{ y: 100, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 100, scale: 0.9 }}
              className="fixed bottom-6 left-4 right-4 z-50 sm:hidden"
            >
              <div className="flex items-center justify-between gap-4 bg-black/90 dark:bg-white/95 backdrop-blur-2xl p-3 px-4 rounded-[28px] border border-white/10 dark:border-black/5 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                 <div className="flex flex-col pl-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.1em] text-pink-500 leading-none mb-1">Ready to save</span>
                    <span className="text-base font-black text-white dark:text-black italic tracking-tighter leading-none">{selectedCount} Clips</span>
                 </div>
                 <button 
                   onClick={handleBulkDownload}
                   disabled={isDownloading}
                   className="flex h-12 items-center gap-2 rounded-[20px] bg-pink-600 px-6 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-pink-600/30 active:scale-95 transition-all"
                 >
                   {isDownloading ? (
                     <div className="flex items-center gap-2">
                       <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                       <span>{progress}%</span>
                     </div>
                   ) : (
                     <>
                       <span>Download</span>
                       <Download className="h-4 w-4" />
                     </>
                   )}
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
