"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { DownloadPreview } from "@/components/layout/DownloadPreview"
import { type PlatformResult } from "@/types/download"
import { StructuredData } from "@/components/shared/StructuredData"
import { PlatformTabs } from "@/components/shared/PlatformTabs"
import { SocialServiceBar } from "@/components/layout/SocialServiceBar"
import { VisualGuide } from "@/components/shared/VisualGuide"
import { usePathname } from "next/navigation"
import { type Locale } from "@/i18n"
import { getDictionary } from "@/dictionaries/client"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { Ghost, StopCircle, Zap, ShieldCheck, CheckCircle2, HelpCircle, Info, Music as MusicIcon } from "lucide-react"
import { ToolSubNav } from "@/components/layout/ToolSubNav"
import { toast } from "react-hot-toast"

import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"

export default function SnapchatPage() {
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale
    const dict = getDictionary(locale)
  const { addToHistory } = useDownloadHistory("snapchat")

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
        body: JSON.stringify({ url, platform: "snapchat" }),
      })
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Client fetch received non-JSON:", text)
        throw new Error("Server returned an invalid response. Please try again later.")
      }
      
      const result = await response.json()
      if (result.success) {
        setDownloadData(result.data)
        setCached(url, result.data)
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title })
        return result
      } else {
        throw new Error(result.error || "Failed to fetch spotlight")
      }
    }

    try {
      await searchPromise()
    } catch (err: unknown) {
    } finally {
      setIsLoading(false)
    }
  }

  const snapDict = dict.platforms.snapchat;

  return (
    <div className="flex flex-col">
      <ToolSubNav />
      <StructuredData
        type="HowTo"
        data={{
          name: snapDict.howTo.name,
          description: snapDict.howTo.description,
          steps: snapDict.howTo.steps
        }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-yellow-400 to-yellow-500 px-4 pt-14 pb-8 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-yellow-300" intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialServiceBar   activeId="snapchat" />
          <PlatformTabs   
            activeId="spotlight" 
            activeColor="text-yellow-600"
            tabs={dict.tabs}
            items={[
              { id: "spotlight", label: "Spotlight", href: "/snapchat", icon: <Ghost className="h-4 w-4" /> },
              { id: "story", label: dict.tabs.story, href: "/snapchat/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "music", label: dict.tabs.music, href: "/snapchat/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-2 text-4xl font-black tracking-tight text-black sm:text-7xl drop-shadow-2xl uppercase italic">
              {snapDict.title}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-black/80 sm:text-xl">
              {snapDict.subtitle}
            </p>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              buttonClass="bg-black text-white hover:bg-neutral-800"
              iconClass="text-yellow-500"
            />

            {!downloadData && !isLoading && (
              <div className="overflow-hidden">
                <TrustBadges dict={dict} />
                <TrendingBar accentColor="bg-black" />
                <DownloadCounter accentColor="text-yellow-900" />
              </div>
            )}
            
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-yellow-400 via-yellow-300 to-amber-300" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            buttonStyle="bg-black text-white hover:bg-neutral-800"
            accentText="text-yellow-600"
            accentBg="bg-yellow-500/10"
            accentBorder="border-yellow-500"
          />
        </div>
      </section>

      <RelatedTools currentPlatform="snapchat" />

      <CategoryCards />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-white">{dict.features.title}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { icon: <Zap className="h-8 w-8 text-yellow-500" /> },
              { icon: <ShieldCheck className="h-8 w-8 text-yellow-500" /> },
              { icon: <CheckCircle2 className="h-8 w-8 text-yellow-500" /> },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-md dark:bg-black">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{dict.features.items[idx].title}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400">{dict.features.items[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisualGuide 
        platformName={dict.categories.snap}
        accentColor="text-yellow-500"
        bgAccentColor="bg-yellow-500"
        Icon={Ghost}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', dict.categories.snap), desc: snapDict.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', dict.categories.snap), desc: snapDict.howTo.steps[1] + " " + snapDict.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', dict.categories.snap), desc: snapDict.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      <section className="px-4 py-4 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-3xl font-bold text-neutral-900 dark:text-white">
              <Info className="h-8 w-8 text-yellow-500" />
              {snapDict.seo.title}
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed italic border-l-4 border-yellow-500 pl-6">
              {snapDict.seo.desc}
            </p>

            {snapDict.seo.features && (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {snapDict.seo.features.map((feature: any, idx: number) => (
                  <div key={idx} className="rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-110">
                    <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-tighter italic">{feature.title}</h4>
                    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 sm:mt-40">
            <h2 className="flex items-center gap-2 text-3xl font-bold text-neutral-900 dark:text-white">
              <HelpCircle className="h-8 w-8 text-yellow-500" />
              {dict.faq.title}
            </h2>
            <div className="mt-10 space-y-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {dict.faq.items.map((faq: any, idx: number) => (
                <div key={idx} className="group rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 hover:border-yellow-500/50 transition-all">
                  <h4 className="font-bold text-neutral-900 dark:text-white group-hover:text-yellow-600 transition-colors uppercase italic tracking-tighter">{faq.q}</h4>
                  <p className="mt-4 text-neutral-500 dark:text-neutral-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
