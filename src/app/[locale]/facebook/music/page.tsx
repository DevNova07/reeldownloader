"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { DownloadPreview } from "@/components/layout/DownloadPreview"
import { StructuredData } from "@/components/shared/StructuredData"
import { PlatformTabs } from "@/components/shared/PlatformTabs"
import { SocialServiceBar } from "@/components/layout/SocialServiceBar"
import { VisualGuide } from "@/components/shared/VisualGuide"
import { usePathname } from "next/navigation"
import { type Locale } from "@/i18n"
import { dictionaries } from "@/dictionaries/client"
import { Film, StopCircle, Music as MusicIcon, Zap, ShieldCheck, CheckCircle2, HelpCircle, Info } from "lucide-react"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { ToolSubNav } from "@/components/layout/ToolSubNav"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"

export default function FacebookMusicPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [downloadData, setDownloadData] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale
    const dict = (dictionaries as Record<string, typeof dictionaries.en>)[locale] || dictionaries.en
  const { addToHistory } = useDownloadHistory("facebook")

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
        body: JSON.stringify({ url, type: "audio", platform: "facebook" }),
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

  const fbDict = dict.platforms.facebook;

  return (
    <div className="flex flex-col">
      <ToolSubNav />
      <StructuredData
        type="HowTo"
        data={{
          name: fbDict.music.howTo.name,
          description: fbDict.music.howTo.description,
          steps: fbDict.music.howTo.steps
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-blue-600 to-cyan-500 px-4 pt-14 pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-blue-400" intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialServiceBar   activeId="facebook" />
          <PlatformTabs   
            activeId="music" 
            activeColor="text-blue-600"
            tabs={dict.tabs}
            items={[
               { id: "video", label: dict.tabs.video, href: "/facebook", icon: <Film className="h-4 w-4" /> },
               { id: "reels", label: dict.tabs.reels, href: "/facebook/reels", icon: <Film className="h-4 w-4" /> },
               { id: "story", label: dict.tabs.story, href: "/facebook/story", icon: <StopCircle className="h-4 w-4" /> },
               { id: "music", label: dict.tabs.music, href: "/facebook/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic">
              {fbDict.music.title}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              {fbDict.music.subtitle}
            </p>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              buttonClass="bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white"
              iconClass="text-blue-500"
            />

            <TrustBadges dict={dict} />
            <TrendingBar accentColor="bg-blue-600" />
            <DownloadCounter accentColor="text-blue-300" />
            
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-blue-600 via-blue-500 to-cyan-500" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            buttonStyle="bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
            accentText="text-blue-600"
            accentBg="bg-blue-600/10"
            accentBorder="border-blue-600"
          />
        </div>
      </section>

      <RelatedTools currentPlatform="facebook" />
      <CategoryCards />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">{dict.features.title}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { icon: <Zap className="h-8 w-8 text-blue-600" /> },
              { icon: <ShieldCheck className="h-8 w-8 text-blue-600" /> },
              { icon: <CheckCircle2 className="h-8 w-8 text-blue-600" /> },
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
        platformName={`Facebook ${dict.tabs.music}`}
        accentColor="text-blue-600"
        bgAccentColor="bg-blue-600"
        Icon={MusicIcon}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', 'Music'), desc: fbDict.music.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', 'Music'), desc: fbDict.music.howTo.steps[1] + " " + fbDict.music.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', 'Music'), desc: fbDict.music.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />
    </div>
  )
}
