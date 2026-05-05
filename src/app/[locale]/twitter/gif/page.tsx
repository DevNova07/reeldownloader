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
import { Camera, CheckCircle2, Film, Hash, HelpCircle, Info, Music as MusicIcon, ShieldCheck, Zap } from "lucide-react"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { toast } from "react-hot-toast"
import { HeroEffect } from "@/components/shared/HeroEffect"

import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"

export default function TwitterGifPage() {
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
        body: JSON.stringify({ url }),
      })
      const result = await response.json()
      if (result.success) {
        setDownloadData(result.data)
        setCached(url, result.data)
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title })
        return result
      } else {
        throw new Error(result.error || "Failed to fetch GIF")
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
          name: twDict.gif.howTo.name,
          description: twDict.gif.howTo.description,
          steps: twDict.gif.howTo.steps
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-slate-800 to-slate-950 px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <HeroEffect color="bg-slate-500" intensity="medium" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <PlatformTabs   
            activeId="gif" 
            activeColor="text-slate-500"
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
              {twDict.gif.title}
            </h1>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              buttonClass="bg-white text-black hover:bg-neutral-200"
              iconClass="text-slate-800"
            />

            <p className="mx-auto mb-4 max-w-2xl mt-8 mb-2 text-sm font-bold text-white/60 tracking-widest uppercase italic hidden sm:block">
              {twDict.gif.subtitle}
            </p>

            <TrustBadges dict={dict} />

            <TrendingBar accentColor="bg-slate-500" />
            <DownloadCounter accentColor="text-slate-400" />
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-slate-600 via-slate-500 to-neutral-400" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            buttonStyle="bg-white text-black hover:bg-neutral-200"
            accentText="text-slate-600"
            accentBg="bg-slate-500/10"
            accentBorder="border-slate-500"
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
              { icon: <Zap className="h-8 w-8 text-slate-500" /> },
              { icon: <ShieldCheck className="h-8 w-8 text-slate-500" /> },
              { icon: <CheckCircle2 className="h-8 w-8 text-slate-500" /> },
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
        platformName={`X / Twitter ${dict.tabs.gif}`}
        accentColor="text-slate-800"
        bgAccentColor="bg-slate-800"
        Icon={Hash}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', 'GIF'), desc: twDict.gif.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', 'GIF'), desc: twDict.gif.howTo.steps[1] + " " + twDict.gif.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', 'GIF'), desc: twDict.gif.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      <section className="px-4 py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">
              <Info className="h-8 w-8 text-slate-800" />
              {twDict.gif.seo.title}
            </h2>
            {/* Redundant description removed to fix build error */}
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium opacity-80 hidden sm:block">{twDict.gif.subtitle}</p>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-slate-500 pl-8 font-medium">
              {twDict.gif.seo.desc}
            </p>
          </div>

          <div className="mt-44">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">
              <HelpCircle className="h-8 w-8 text-slate-800" />
              {dict.faq.title}
            </h2>
            <div className="mt-12 space-y-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {dict.faq.items.map((faq: any, idx: number) => (
                <div key={idx} className="group rounded-[2rem] border border-neutral-200 p-8 dark:border-neutral-800 hover:border-slate-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                  <h3 className="font-black text-neutral-900 dark:text-white group-hover:text-slate-600 transition-colors tracking-tight uppercase italicer text-lg">{faq.q}</h3>
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
