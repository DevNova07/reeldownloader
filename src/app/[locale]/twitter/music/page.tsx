"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { DownloadPreview } from "@/components/layout/DownloadPreview"
import { StructuredData } from "@/components/shared/StructuredData"
import { PlatformTabs } from "@/components/shared/PlatformTabs"
import { VisualGuide } from "@/components/shared/VisualGuide"
import { usePathname } from "next/navigation"
import { type Locale } from "@/i18n"
import { getDictionary } from "@/dictionaries/client"
import { Camera, CheckCircle2, Film, Hash, HelpCircle, Image as ImageIcon, Info, Music as MusicIcon, ShieldCheck, Twitter, Zap } from "lucide-react"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"

export default function TwitterMusicPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [downloadData, setDownloadData] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale
    const dict = getDictionary(locale)
  const { addToHistory } = useDownloadHistory("twitter")

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
        body: JSON.stringify({ url, type: "audio", platform: "twitter" }),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
    } finally {
      setIsLoading(false)
    }
  }

  const twDict = dict.platforms.twitter;

  return (
    <div className="flex flex-col">
      <StructuredData
        type="HowTo"
        data={{
          name: twDict.music.howTo.name,
          description: twDict.music.howTo.description,
          steps: twDict.music.howTo.steps
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-slate-800 to-black px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <HeroEffect color="bg-slate-400" intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <PlatformTabs   
            activeId="music" 
            activeColor="text-slate-200"
            tabs={dict.tabs}
            items={[
              { id: "video", label: dict.tabs?.video || "Video", href: "/twitter", icon: <Film className="h-4 w-4" /> },
              { id: "gif", label: dict.tabs?.gif || "GIF", href: "/twitter/gif", icon: <Hash className="h-4 w-4" /> },
              { id: "photo", label: dict.tabs?.photo || "Photo", href: "/twitter/photo", icon: <Camera className="h-4 w-4" /> },
              { id: "music", label: dict.tabs?.music || "Music", href: "/twitter/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-2 text-3xl min-[400px]:text-4xl font-black tracking-tight uppercase italic text-white sm:text-7xl drop-shadow-2xl">
              {twDict.music.title}
            </h1>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              buttonClass="bg-white text-black hover:bg-neutral-100"
              iconClass="text-slate-600"
            />

            <p className="mx-auto mb-4 max-w-2xl mt-8 mb-2 text-sm font-bold text-white/60 tracking-widest uppercase italic hidden sm:block">
              {twDict.music.subtitle}
            </p>

            <TrustBadges dict={dict} />
            <TrendingBar accentColor="bg-slate-700" />
            <DownloadCounter accentColor="text-slate-400" />
            
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-slate-700 via-slate-500 to-slate-900" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            buttonStyle="bg-white text-black hover:bg-neutral-100 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            accentText="text-slate-900"
            accentBg="bg-slate-100"
            accentBorder="border-slate-800"
          />
        </div>
      </section>

      <RelatedTools currentPlatform="twitter" />
      <CategoryCards />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">{dict.features.title}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { icon: <Zap className="h-8 w-8 text-slate-800 dark:text-slate-200" /> },
              { icon: <ShieldCheck className="h-8 w-8 text-slate-800 dark:text-slate-200" /> },
              { icon: <CheckCircle2 className="h-8 w-8 text-slate-800 dark:text-slate-200" /> },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-2xl bg-white p-5 shadow-2xl dark:bg-black transition-all hover:scale-110 hover:-rotate-3 border border-neutral-100 dark:border-neutral-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">{dict.features.items[idx].title}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{dict.features.items[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisualGuide 
        platformName={`Twitter ${dict.tabs.music}`}
        accentColor="text-slate-800 dark:text-slate-200"
        bgAccentColor="bg-slate-800"
        Icon={MusicIcon}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', 'Music'), desc: twDict.music.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', 'Music'), desc: twDict.music.howTo.steps[1] + " " + twDict.music.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', 'Music'), desc: twDict.music.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />
    </div>
  )
}
