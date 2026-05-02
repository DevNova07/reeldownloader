"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { DownloadPreview } from "@/components/layout/DownloadPreview"
import { StructuredData } from "@/components/shared/StructuredData"
import { PlatformTabs } from "@/components/shared/PlatformTabs"
import { SocialPlatformBar } from "@/components/layout/SocialPlatformBar"
import { VisualGuide } from "@/components/shared/VisualGuide"
import { usePathname } from "next/navigation"
import { type Locale } from "@/i18n"
import { getDictionary } from "@/dictionaries/client"
import { Camera, CheckCircle2, Film, HelpCircle, Info, Music as MusicIcon, ShieldCheck, StopCircle, Zap } from "lucide-react"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { toast } from "react-hot-toast"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"

export default function TikTokStoryPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [downloadData, setDownloadData] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale
    const dict = getDictionary(locale)
  const { addToHistory } = useDownloadHistory("tiktok")

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
        body: JSON.stringify({ url, platform: "tiktok" }),
      })
      const result = await response.json()
      if (result.success) {
        setDownloadData(result.data)
        setCached(url, result.data)
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title })
        return result
      } else {
        throw new Error(result.error || "Failed to fetch story")
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

  const tiktokDict = dict.platforms.tiktok;

  return (
    <div className="flex flex-col">
      <StructuredData
        type="HowTo"
        data={{
          name: tiktokDict.story.howTo.name,
          description: tiktokDict.story.howTo.description,
          steps: tiktokDict.story.howTo.steps
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-neutral-900 via-neutral-900 to-pink-700 px-4 pt-10 pb-6 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-pink-400" intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <SocialPlatformBar   activeId="tiktok" />
          <PlatformTabs   
            activeId="story" 
            activeColor="text-pink-600"
            tabs={dict.tabs}
            items={[
              { id: "video", label: dict.tabs?.video || "Video", href: "/tiktok", icon: <Film className="h-4 w-4" /> },
              { id: "story", label: dict.tabs?.story || "Story", href: "/tiktok/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "music", label: dict.tabs?.music || "Music", href: "/tiktok/music", icon: <MusicIcon className="h-4 w-4" /> },
              { id: "photo", label: dict.tabs?.photo || "Photo", href: "/tiktok/photo", icon: <Camera className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-2 text-3xl min-[400px]:text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic text-balance">
              {tiktokDict.story.title}
            </h1>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
            />

            <TrustBadges dict={dict} />

            <TrendingBar accentColor="bg-pink-600" />
            <DownloadCounter accentColor="text-pink-300" />
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-pink-600 via-pink-500 to-rose-500" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            buttonStyle="bg-linear-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600"
            accentText="text-pink-600"
            accentBg="bg-pink-600/10"
            accentBorder="border-pink-600"
          />
        </div>
      </section>

      <RelatedTools currentPlatform="tiktok" />
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
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{dict.features.items[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisualGuide 
        platformName={`TikTok ${dict.tabs.story}`}
        accentColor="text-pink-600"
        bgAccentColor="bg-pink-600"
        Icon={StopCircle}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', 'Story'), desc: tiktokDict.story.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', 'Story'), desc: tiktokDict.story.howTo.steps[1] + " " + tiktokDict.story.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', 'Story'), desc: tiktokDict.story.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />
    </div>
  )
}
