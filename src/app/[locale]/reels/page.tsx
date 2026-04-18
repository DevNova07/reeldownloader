"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { DownloadPreview } from "@/components/layout/DownloadPreview"
import { type PlatformResult } from "@/types/download"
import { StructuredData } from "@/components/shared/StructuredData"
import { PlatformTabs } from "@/components/shared/PlatformTabs"
import { SocialServiceBar } from "@/components/layout/SocialServiceBar"
import { VisualGuide } from "@/components/shared/VisualGuide"
import { usePathname } from "next/navigation"
import { locales, type Locale } from "@/i18n"
import { dictionaries } from "@/dictionaries/client"
import { PlaySquare, Film, StopCircle, Music as MusicIcon, ShieldCheck, Zap, CheckCircle2, HelpCircle, Info } from "lucide-react"
import { ToolSubNav } from "@/components/layout/ToolSubNav"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { isValidInstaUrl } from "@/utils/cn"
import { toast } from "react-hot-toast"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"

import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"

export default function ReelsPage() {
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale
    const dict = (dictionaries as Record<Locale, any>)[locale] || dictionaries.en
  const { history: recentDownloads, addToHistory, clearHistory } = useDownloadHistory("instagram")

  const handleSearch = async (url: string) => {
    const cached = getCached(url)
    if (cached) {
      setDownloadData(cached)
      return
    }

    setIsLoading(true)
    setDownloadData(null)

    const searchPromise = async () => {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const result = await response.json()
      if (result.success) {
        setDownloadData(result.data)
        setCached(url, result.data)
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title })
        return result
      } else {
        throw new Error(result.error || "Failed to fetch content")
      }
    }

    try {
      await searchPromise()
    } catch (err: unknown) {
    } finally {
      setIsLoading(false)
    }
  }

  const instaDict = dict.platforms.instagram;

  return (
    <div className="flex flex-col">
      <ToolSubNav />
      <StructuredData
        type="HowTo"
        data={{
          name: instaDict.reels.howTo.name,
          description: instaDict.reels.howTo.description,
          steps: instaDict.reels.howTo.steps
        }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-rose-500 via-purple-600 to-indigo-700 px-4 pt-14 pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-pink-400" intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialServiceBar   activeId="instagram" />
          <PlatformTabs   
            activeId="reels" 
            activeColor="text-pink-600"
            tabs={dict.tabs}
            items={[
              { id: "video", label: dict.tabs.video, href: "/", icon: <Film className="h-4 w-4" /> },
              { id: "reels", label: dict.tabs.reels, href: "/reels", icon: <PlaySquare className="h-4 w-4" /> },
              { id: "story", label: dict.tabs.story, href: "/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "music", label: dict.tabs.music, href: "/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic">
              {instaDict.reels.title}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              {instaDict.reels.subtitle}
            </p>
          </motion.div>

          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            dict={dict}
            validate={isValidInstaUrl}
          />

          <TrustBadges dict={dict} />

          <DownloadCounter accentColor="text-pink-300" />
          <TrendingBar />

          <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-rose-500 via-pink-500 to-purple-500" />
          
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            buttonStyle="bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500"
            accentText="text-pink-600"
            accentBg="bg-pink-600/10"
            accentBorder="border-pink-600"
          />
        </div>
      </section>

      <RelatedTools currentPlatform="reels" />
      <CategoryCards />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">{dict.features.title}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { icon: <Zap className="h-8 w-8 text-pink-600" /> },
              { icon: <ShieldCheck className="h-8 w-8 text-pink-600" /> },
              { icon: <CheckCircle2 className="h-8 w-8 text-pink-600" /> },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-2xl bg-white p-5 shadow-2xl dark:bg-black transition-all hover:scale-110 hover:-rotate-3 border border-neutral-100 dark:border-neutral-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase italic">{dict.features.items[idx].title}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{dict.features.items[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisualGuide 
        platformName={`${dict.categories.insta} ${dict.tabs.reels}`}
        accentColor="text-pink-600"
        bgAccentColor="bg-pink-600"
        Icon={PlaySquare}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', 'Reels'), desc: instaDict.reels.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', 'Reels'), desc: instaDict.reels.howTo.steps[1] + " " + instaDict.reels.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', 'Reels'), desc: instaDict.reels.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      <section className="px-4 py-4 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
              <Info className="h-8 w-8 text-pink-600" />
              {instaDict.reels.seo.title}
            </h2>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed italic border-l-4 border-pink-500 pl-8 font-medium">
              {instaDict.reels.seo.desc}
            </p>
          </div>

          <div className="mt-44">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
              <HelpCircle className="h-8 w-8 text-pink-600" />
              {dict.faq.title}
            </h2>
            <div className="mt-12 space-y-6">
              {dict.faq.items.map((faq: { q: string; a: string }, idx: number) => (
                <div key={idx} className="group rounded-[2rem] border border-neutral-200 p-8 dark:border-neutral-800 hover:border-pink-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                  <h4 className="font-black text-neutral-900 dark:text-white group-hover:text-pink-600 transition-colors uppercase italic tracking-tighter text-lg">{faq.q}</h4>
                  <p className="mt-4 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 group-hover:opacity-100 transition-opacity">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
