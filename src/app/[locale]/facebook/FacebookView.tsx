"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { DownloadPreview } from "@/components/layout/DownloadPreview"
import { type PlatformResult } from "@/types/download"
import { StructuredData } from "@/components/shared/StructuredData"
import { PlatformTabs } from "@/components/shared/PlatformTabs"
import { VisualGuide } from "@/components/shared/VisualGuide"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { locales, type Locale } from "@/i18n"
import { dictionaries } from "@/dictionaries/client"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { CheckCircle2, Film, HelpCircle, Info, Music as MusicIcon, ShieldCheck, StopCircle, Zap } from "lucide-react"
import { toast } from "react-hot-toast"
import { getPlatformFromUrl, getLocalizedRoute, isAnyPlatformUrl, isSmartInput, handleSmartRedirect } from "@/utils/platform-detector"

import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"

import { useAutoDownload } from "@/hooks/useAutoDownload"

export default function FacebookView({ dict, locale }: { dict: any, locale: string }) {
  const router = useRouter()
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sharedUrl = searchParams.get('url') || ""
  const { addToHistory } = useDownloadHistory("facebook")

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1)
    setAutoTriggerDownload(isAutoTrigger)

    if (handleSmartRedirect(url, locale, router)) {
      toast.success("Profile detected! Opening Bulk Downloader...")
      return
    }

    setIsLoading(true)
    setDownloadData(null)
    setError(null)

    const cached = getCached(url)
    if (cached) {
      setDownloadData(cached)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setDownloadData(null)
    setError(null)

    const searchPromise = async () => {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, platform: "facebook" }),
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
        throw new Error(result.error || "Failed to fetch content")
      }
    }
    try {
      await searchPromise()
    } catch (err: any) {
      const msg = err?.message || "Failed to process the link. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale as Locale, "facebook")

  const fbDict = dict.platforms.facebook;

  return (
    <div className="flex flex-col">
      <StructuredData
        type="HowTo"
        data={{
          name: fbDict.howTo.name,
          description: fbDict.howTo.description,
          steps: fbDict.howTo.steps
        }}
      />
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: fbDict.seo.title,
          description: fbDict.seo.desc
        }}
      />
      <StructuredData
        type="FAQPage"
        data={fbDict.faq}
      />
      
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-600 to-cyan-500 px-4 pt-10 pb-6 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-blue-400" intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          
          <PlatformTabs   
            activeId="video" 
            activeColor="text-blue-600"
            tabs={dict.tabs}
            items={[
              { id: "video", label: dict?.tabs?.video || "Video", href: "/facebook", icon: <Film className="h-4 w-4" /> },
              { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/facebook-reels-downloader", icon: <Film className="h-4 w-4" /> },
              { id: "story", label: dict?.tabs?.story || "Story", href: "/facebook-story-downloader", icon: <StopCircle className="h-4 w-4" /> },
              { id: "private", label: dict?.tabs?.private || "Private", href: "/facebook-private-video-downloader", icon: <ShieldCheck className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <h1 className="mb-0 text-xl min-[400px]:text-2xl font-black tracking-tight lowercase italic text-white sm:text-5xl drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] whitespace-nowrap">
              {fbDict.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium text-center max-w-3xl px-4 mt-0 mb-2">
              Download Facebook videos, reels & stories — fast, free and secure
            </p>
          </motion.div>

          
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              validate={isSmartInput}
              buttonClass="bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] ring-1 ring-inset ring-white/20"
              iconClass="text-blue-600"
              initialValue={sharedUrl}
            />

            <p className="mx-auto mb-4 max-w-2xl mt-8 mb-2 text-sm font-bold text-white/60 tracking-widest uppercase italic hidden sm:block">
              {fbDict.subtitle}
            </p>

            <AnimatePresence>
            </AnimatePresence>

            <TrustBadges dict={dict} />
            <TrendingBar accentColor="bg-blue-600" />
            <DownloadCounter accentColor="text-blue-300" />
            
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-blue-600 via-blue-500 to-cyan-500" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            autoTriggerDownload={autoTriggerDownload}
            searchCounter={searchCounter}
            buttonStyle="bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:brightness-110 active:scale-95"
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
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">{dict.features.title}</h2>
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
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">{dict.features.items[idx].title}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{dict.features.items[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisualGuide 
        platformName={dict.categories.fb}
        accentColor="text-blue-600"
        bgAccentColor="bg-blue-600"
        Icon={Film}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', dict.categories.fb), desc: fbDict.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', dict.categories.fb), desc: fbDict.howTo.steps[1] + " " + fbDict.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', dict.categories.fb), desc: fbDict.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      <section className="px-4 py-4 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">
              <Info className="h-8 w-8 text-blue-600" />
              {fbDict.seo.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium opacity-80  sm:hidden hidden sm:block">{fbDict.subtitle}</p>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-blue-500 pl-8 font-medium">
              {fbDict.seo.desc}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {fbDict.seo.features.map((feature: any, idx: number) => (
                <div key={idx} className="rounded-4xl bg-neutral-50 p-8 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-2xl">
                  <h3 className="font-black text-neutral-900 dark:text-white tracking-tight uppercase italicer text-lg">{feature.title}</h3>
                  <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-44">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">
              <HelpCircle className="h-8 w-8 text-blue-600" />
              {dict.faq.title}
            </h2>
            <div className="mt-12 space-y-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {dict.faq.items.map((faq: any, idx: number) => (
                <div key={idx} className="group rounded-[2rem] border border-neutral-200 p-8 dark:border-neutral-800 hover:border-blue-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                  <h3 className="font-black text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors tracking-tight uppercase italicer text-lg">{faq.q}</h3>
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
