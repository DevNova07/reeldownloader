"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import dynamic from "next/dynamic"

const CategoryCards = dynamic(() => import("@/components/layout/CategoryCards").then(mod => mod.CategoryCards))
const DownloadPreview = dynamic(() => import("@/components/layout/DownloadPreview").then(mod => mod.DownloadPreview))
const StructuredData = dynamic(() => import("@/components/shared/StructuredData").then(mod => mod.StructuredData))
const PlatformTabs = dynamic(() => import("@/components/shared/PlatformTabs").then(mod => mod.PlatformTabs))
const SocialPlatformBar = dynamic(() => import("@/components/layout/SocialPlatformBar").then(mod => mod.SocialPlatformBar))
const VisualGuide = dynamic(() => import("@/components/shared/VisualGuide").then(mod => mod.VisualGuide))

import { useRouter, useSearchParams } from "next/navigation"
import { type Locale } from "@/i18n"
import { Hash, Film, Zap, ShieldCheck, CheckCircle2, HelpCircle, Info, Music as MusicIcon } from "lucide-react"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
const RelatedTools = dynamic(() => import("@/components/shared/RelatedTools").then(mod => mod.RelatedTools))
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { toast } from "react-hot-toast"
import { getPlatformFromUrl, getLocalizedRoute, isSmartInput, handleSmartRedirect } from "@/utils/platform-detector"

import { TrustBadges } from "@/components/ui/TrustBadges"
const ChromeExtensionBanner = dynamic(() => import("@/components/layout/ChromeExtensionBanner").then(mod => mod.ChromeExtensionBanner))
import { ExpandableSection } from "@/components/ui/ExpandableSection"

import { useAutoDownload } from "@/hooks/useAutoDownload"
import { type PlatformResult } from "@/types/download"

export function TwitterView({ locale, dict }: { locale: Locale, dict: any }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)
  
  const { history: recentDownloads, addToHistory } = useDownloadHistory("twitter")

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1)
    setAutoTriggerDownload(isAutoTrigger)
    setIsLoading(true)

    if (handleSmartRedirect(url, locale, router)) {
      toast.success("Profile detected! Opening Bulk Downloader...")
      return
    }

    // Cross-platform detection and redirection
    const detectedPlatform = getPlatformFromUrl(url);
    if (detectedPlatform && detectedPlatform !== 'twitter') {
      const targetRoute = getLocalizedRoute(detectedPlatform, locale);
      if (targetRoute) {
        toast(`Redirecting to ${detectedPlatform} downloader...`, { icon: '🚀' });
        router.push(`${targetRoute}?url=${encodeURIComponent(url)}`);
        return;
      }
    }

    const cached = getCached(url)
    if (cached) {
      setDownloadData(cached)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setDownloadData(null)

    const searchPromise = async () => {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, platform: "twitter" }),
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
    } catch (err: unknown) {
        toast.error("Failed to fetch Twitter video. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "twitter")

  const twDict = dict.platforms.twitter;

  return (
    <div className="flex flex-col">
      <StructuredData
        type="HowTo"
        data={{
          name: twDict.howTo.name,
          description: twDict.howTo.description,
          steps: twDict.howTo.steps
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-slate-800 to-slate-950 px-4 pt-14 pb-8 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-slate-500" intensity="medium" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialPlatformBar   activeId="twitter" />
          <PlatformTabs   
            activeId="video" 
            activeColor="text-slate-500"
            tabs={dict.tabs}
            items={[
              { id: "video", label: dict.tabs.video, href: "/twitter", icon: <Film className="h-4 w-4" /> },
              { id: "gif", label: dict.tabs.gif, href: "/twitter/gif", icon: <Hash className="h-4 w-4" /> },
              { id: "music", label: dict.tabs.music, href: "/twitter/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
           <h1 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic">
              {twDict.title}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/80 sm:text-xl">
              {twDict.subtitle}
            </p>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              dict={dict}
              validate={isSmartInput}
              buttonClass="bg-linear-to-br from-blue-600 to-sky-500 text-white shadow-[0_20px_50px_rgba(14,165,233,0.3)] ring-1 ring-inset ring-white/20"
              iconClass="text-sky-500"
            />

            {!downloadData && !isLoading && (
              <div className="overflow-hidden">
                <TrustBadges dict={dict} />
                <TrendingBar accentColor="bg-slate-500" />
                <DownloadCounter accentColor="text-slate-400" />
              </div>
            )}
            
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-slate-600 via-slate-500 to-neutral-400" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            autoTriggerDownload={autoTriggerDownload}
            searchCounter={searchCounter}
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
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">{dict.features.title}</h2>
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
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase italic">{dict.features.items[idx].title}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{dict.features.items[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisualGuide 
        platformName="Twitter / X"
        accentColor="text-slate-800"
        bgAccentColor="bg-slate-800"
        Icon={Hash}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', dict.categories.tw), desc: twDict.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', dict.categories.tw), desc: twDict.howTo.steps[1] + " " + twDict.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', dict.categories.tw), desc: twDict.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      <section className="px-4 py-4 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
              <Info className="h-8 w-8 text-slate-800" />
              {twDict.seo.title}
            </h2>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed italic border-l-4 border-slate-500 pl-8 font-medium">
              {twDict.seo.desc}
            </p>

              <ExpandableSection maxHeight={400} className="mt-16">
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {twDict.seo.features.map((feature: any, idx: number) => (
                    <div key={idx} className="rounded-[2rem] bg-neutral-50 p-8 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-2xl">
                      <h4 className="font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter text-lg">{feature.title}</h4>
                      <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-44">
                  <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
                    <HelpCircle className="h-8 w-8 text-slate-800" />
                    {dict.faq.title}
                  </h2>
                  <div className="mt-12 space-y-6">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {dict.faq.items.map((faq: any, idx: number) => (
                      <div key={idx} className="group rounded-[2rem] border border-neutral-200 p-8 dark:border-neutral-800 hover:border-slate-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                        <h4 className="font-black text-neutral-900 dark:text-white group-hover:text-slate-600 transition-colors uppercase italic tracking-tighter text-lg">{faq.q}</h4>
                        <p className="mt-4 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 group-hover:opacity-100 transition-opacity">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ExpandableSection>
          </div>
        </div>
      </section>
    </div>
  )
}
