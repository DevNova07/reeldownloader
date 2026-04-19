"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import * as Icons from "lucide-react"
import {
  Zap,
  Star,
  Search,
  ChevronRight,
  ChevronDown,
  Hash,
  Copy,
  Check,
  Music
} from "lucide-react"
import { cn } from "@/utils/cn"
import { dictionaries } from "@/dictionaries/client"
import { type Locale } from "@/i18n"
import { ToolSubNav } from "@/components/layout/ToolSubNav"
import bioData from "@/data/bios.json"
import { PremiumSearch } from "@/components/shared/PremiumSearch"
import { LeftSidebar, RightSidebar } from "./sidebars"

// Dynamic Icon Helper
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[name] || Icons.Hash
  return <IconComponent className={className} />
}

export default function BioLandingPage() {
  const router = useRouter()
  const pathname = usePathname()

  const locale = (pathname.split('/')[1] || 'en') as Locale
    const dict = (dictionaries as Record<Locale, any>)[locale] || dictionaries.en

  // States for AI Bio Generator
  const [bioDescription, setBioDescription] = React.useState("")
  const [isGeneratingBio, setIsGeneratingBio] = React.useState(false)

  // Refs & Copy State
  const resultsSectionRef = React.useRef<HTMLElement>(null)
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)

  // Filtered Categories logic
  const filteredCategories = React.useMemo(() => {
    if (!bioDescription.trim()) return bioData.categories

    const query = bioDescription.toLowerCase().trim()
    return bioData.categories.filter(cat => {
      const nameMatch = cat.name.toLowerCase().includes(query)
      const catBios = (bioData.bios as Record<string, string[]>)[cat.id] || []
      const bioMatch = catBios.some((b: string) => b.toLowerCase().includes(query))
      return nameMatch || bioMatch
    })
  }, [bioDescription])


  const handleGenerateBio = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bioDescription) return
    
    // Just scroll to results instead of redirecting
    resultsSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  // Auto-scroll logic when typing
  React.useEffect(() => {
    if (bioDescription.trim()) {
      resultsSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [bioDescription])


  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-lime-500/30">
      <ToolSubNav />

      {/* 1. AI BIO GENERATOR HERO */}
      <section className="relative overflow-hidden min-h-[460px] flex items-center justify-center text-center px-4 border-b border-white/5">
        <div
          className="absolute inset-0 z-0 bg-neutral-900"
          style={{
            backgroundImage: "url('/images/bio-hub-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl space-y-6 pt-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-4xl sm:text-7xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-white uppercase leading-[1.1] drop-shadow-2xl">
              TRENDING <span className="text-[#a4d444] italic">CATEGORIES</span><br />
              <span className="text-[#d9f99d]">BIO</span>
            </h1>
          </motion.div>

          <PremiumSearch 
            value={bioDescription}
            onChange={setBioDescription}
            onSearch={() => handleGenerateBio({ preventDefault: () => {} } as React.FormEvent)}
            placeholder="Enter Keyword (e.g. Attitude, Boys, Life)..."
            isLoading={isGeneratingBio}
            accentColor="text-[#d9f99d]"
            buttonColor="bg-[#d9f99d]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] sm:text-[11px] font-light text-white/90 tracking-[0.2em] sm:tracking-[0.25em] uppercase max-w-3xl mx-auto drop-shadow-md leading-relaxed"
          >
            GENERATE THE MOST VIRAL BIOS FOR YOUR REELS, TIKTOK, AND SHORTS USING OUR SMART AI ALGORITHM.
          </motion.p>
        </div>
      </section>

      {/* 2. EXPLORE BY MOOD SECTION */}
      <section 
        ref={resultsSectionRef}
        className={cn(
          "bg-white px-4 transition-all duration-500 scroll-mt-24",
          bioDescription.trim() ? "py-12" : "py-24 min-h-screen"
        )}
      >
        <div className="max-w-4xl mx-auto relative group">
          
          {/* Memoized Sidebars */}
          <LeftSidebar locale={locale} />
          <RightSidebar locale={locale} />

          {/* Heading Block */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tight leading-none">
              EXPLORE BY <span className="text-[#a4d444]">MOOD</span>
            </h2>
            {!bioDescription.trim() && (
              <p className="text-[10px] sm:text-[12px] font-light text-neutral-400 uppercase tracking-[0.4em]">
                RESULTS WILL APPEAR BELOW AS YOU TYPE
              </p>
            )}
          </div>

          {/* Dynamic Profile List */}
          <div className="space-y-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <div key={cat.id} className="overflow-hidden">
                  <div className="max-w-2xl mx-auto w-full flex items-center justify-between py-6 px-4 sm:px-8 text-left border-b border-neutral-100/60">
                    <div className="flex items-center gap-6">
                      <span className={cn("text-xl", cat.color)}>
                        <DynamicIcon name={cat.icon} className="h-6 w-6 opacity-40" />
                      </span>
                      <span className="text-xl sm:text-3xl font-black text-black uppercase tracking-tighter">
                        {cat.name}
                      </span>
                    </div>
                  </div>

                  <div className="bg-neutral-50/50">
                    <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4 p-4 sm:p-8">
                      {((bioData.bios as Record<string, string[]>)[cat.id] || []).length > 0 ? (
                        (bioData.bios as Record<string, string[]>)[cat.id]
                          .filter((bio: string) => !bioDescription.trim() || bio.toLowerCase().includes(bioDescription.toLowerCase().trim()))
                          .map((bio: string, index: number) => (
                            <motion.div
                              key={`${cat.id}-${index}`}
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="group relative p-6 rounded-2xl bg-white border border-neutral-200/60 shadow-sm hover:border-[#a4d444]/40 hover:shadow-md transition-all flex flex-col justify-between"
                            >
                              <p className="text-neutral-600 font-medium text-base whitespace-pre-line leading-relaxed mb-6">
                                {bio}
                              </p>
                              <div className="flex justify-end border-t border-neutral-50 pt-4">
                                <button
                                  onClick={() => copyToClipboard(bio, `${cat.id}-${index}`)}
                                  className={cn(
                                    "p-2 rounded-lg transition-all flex items-center gap-2",
                                    copiedKey === `${cat.id}-${index}`
                                      ? "bg-[#a4d444] text-white"
                                      : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
                                  )}
                                >
                                  {copiedKey === `${cat.id}-${index}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                  <span className="text-[10px] font-bold uppercase tracking-widest">
                                    {copiedKey === `${cat.id}-${index}` ? "Copied" : "Copy Profile"}
                                  </span>
                                </button>
                              </div>
                            </motion.div>
                          ))
                      ) : (
                        <div className="col-span-full py-20 text-center space-y-4">
                          <Icons.Search className="h-12 w-12 text-neutral-200 mx-auto" />
                          <p className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Generating bios...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-20 text-center border-2 border-dashed border-neutral-100 rounded-3xl">
                <div className="bg-neutral-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-neutral-300" />
                </div>
                <h3 className="text-2xl font-bold text-black uppercase tracking-tight mb-2">
                  No match for &quot;{bioDescription}&quot;
                </h3>
                <button onClick={() => setBioDescription("")} className="bg-black text-[#d9f99d] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                  Clear Search
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
