"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { DownloadPreview } from "@/components/layout/DownloadPreview"
import { type PlatformResult } from "@/types/download"
import { StructuredData } from "@/components/shared/StructuredData"
import { PlatformTabs } from "@/components/shared/PlatformTabs"
import { SocialPlatformBar } from "@/components/layout/SocialPlatformBar"
import { VisualGuide } from "@/components/shared/VisualGuide"
import { type Locale } from "@/i18n"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { Camera, CheckCircle2, Film, Hash, HelpCircle, Info, Music as MusicIcon, ShieldCheck, User, Zap } from "lucide-react"
import { toast } from "react-hot-toast"
import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"
import { useSearchParams } from "next/navigation"
import { useAutoDownload } from "@/hooks/useAutoDownload"

import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { InternalToolLinks } from "@/components/shared/InternalToolLinks"

interface TwitterPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  locale: string;
  themeColor?: string;
  dict: any;
}

function TwitterPageContent({ content, locale, dict }: TwitterPageProps) {
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)
  
  const { addToHistory } = useDownloadHistory("twitter")
  const searchParams = useSearchParams()

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1)
    setAutoTriggerDownload(isAutoTrigger)
    const cached = getCached(url)
    if (cached) {
      setDownloadData(cached)
      return
    }

    setIsLoading(true)
    setDownloadData(null)
    setError(null)

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, platform: "twitter" }),
      })
      const result = await response.json()
      if (result.success) {
        setDownloadData(result.data)
        setCached(url, result.data)
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title })
      } else {
        throw new Error(result.error || "Failed to fetch content")
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to process the link. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "twitter")

  return (
    <div className="flex flex-col">
      <StructuredData type="SoftwareApplication" data={{ title: content?.title || "Twitter Downloader" }} />
      {content?.howTo?.steps && (
        <StructuredData
          type="HowTo"
          data={{
            name: content.howTo.name || (content.title || "Twitter Downloader"),
            description: content.howTo.description || (content.subtitle || "Fast and secure Twitter downloader."),
            steps: content.howTo.steps || (dict.guide?.steps || [])
          }}
        />
      )}
      {content.faq && <StructuredData type="FAQPage" data={content.faq} />}
      
      <section className="relative overflow-hidden bg-linear-to-r from-slate-800 to-slate-950 px-4 pt-10 pb-6 sm:pt-16 sm:pb-20 sm:px-6 lg:px-8">
        <HeroEffect color="bg-slate-500" intensity="medium" />
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <SocialPlatformBar activeId="twitter" />
          <PlatformTabs   
            activeId="video" 
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
            <h1 className="mb-3 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic">
              {content?.title || "Twitter Downloader"}
            </h1>
            
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              initialValue={searchParams.get('url') || ""}
              buttonClass="bg-white text-black hover:bg-neutral-200"
              iconClass="text-slate-800"
            />

            <p className="mx-auto mb-4 max-w-2xl mt-8 mb-2 text-sm font-bold text-white/60 uppercase tracking-widest hidden sm:block">
              {content?.subtitle || content?.seo?.desc || "Fast and secure Twitter downloader."}
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mx-auto max-w-3xl mt-4 p-4 rounded-2xl bg-red-500/20 border-2 border-red-500/50 text-white font-black uppercase italic tracking-wider shadow-2xl backdrop-blur-md text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 p-1.5 rounded-lg shrink-0">
                      <Info className="h-5 w-5 text-white" />
                    </div>
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!downloadData && !isLoading && (
              <div className="overflow-hidden">
                <TrustBadges dict={dict} />
                <TrendingBar accentColor="bg-slate-500" />
                <DownloadCounter accentColor="text-slate-400" />
              </div>
            )}
            <LoadingBar isLoading={isLoading} gradient="from-slate-600 via-slate-500 to-neutral-400" />
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

      {content.title && (
        <Breadcrumbs 
          locale={locale}
          platform="Twitter"
          platformPath="twitter"
          toolTitle={content.title}
        />
      )}
      <RelatedTools currentPlatform="twitter" />
      <CategoryCards />
      <InternalToolLinks currentPlatform="twitter" dict={dict} accentColor="text-slate-500" />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">{dict.features?.title || "Features"}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[Zap, ShieldCheck, CheckCircle2].map((Icon, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-2xl bg-white p-5 shadow-2xl dark:bg-black transition-all hover:scale-110 hover:-rotate-3 border border-neutral-100 dark:border-neutral-800">
                  <Icon className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase italic">{dict.features?.items?.[idx]?.title || "Feature"}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{dict.features?.items?.[idx]?.desc || "Description"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content?.howTo?.steps && content.howTo.steps.length >= 3 && (
        <VisualGuide 
          platformName="Twitter / X"
          accentColor="text-slate-800"
          bgAccentColor="bg-slate-800"
          Icon={Hash}
          steps={[
            { title: dict.guide?.steps?.[0]?.title?.replace('{platform}', dict.categories?.tw || "Twitter") || "Step 1", desc: content.howTo.steps[0] || "", image: "/images/how-to/step1.webp" },
            { title: dict.guide?.steps?.[1]?.title?.replace('{platform}', dict.categories?.tw || "Twitter") || "Step 2", desc: (content.howTo.steps[1] || "") + " " + (content.howTo.steps[2] || ""), image: "/images/how-to/step2.webp" },
            { title: dict.guide?.steps?.[2]?.title?.replace('{platform}', dict.categories?.tw || "Twitter") || "Step 3", desc: content.howTo.steps[3] || content.howTo.steps[2] || "", image: "/images/how-to/step3.webp" },
          ]}
        />
      )}

      <ChromeExtensionBanner dict={dict} />

      <section className="px-4 py-4 sm:py-12 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
              <Info className="h-8 w-8 text-slate-800" />
              {content?.seo?.title || content?.title || "Twitter Guide"}
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium italic opacity-80 sm:hidden hidden sm:block">{content?.seo?.desc || content?.subtitle || "Detailed information about downloading from Twitter."}</p>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-slate-500 pl-8 font-medium">
              {content?.seo?.desc || content?.subtitle || "Detailed information about downloading from Twitter."}
            </p>

            {content?.article_content && (
              <div className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
                <div className="rounded-4xl bg-linear-to-br from-neutral-50 to-white p-8 sm:p-12 dark:from-neutral-900/40 dark:to-neutral-900/20 border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl">
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest mb-6">Expert Guide & Information</h3>
                  <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium opacity-90 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-slate-800">
                    {content.article_content}
                  </p>
                </div>
              </div>
            )}

            {content.seo?.features && (
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {content.seo.features.map((feature: any, idx: number) => (
                  <div key={idx} className="rounded-[2rem] bg-neutral-50 p-8 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-2xl">
                    <h3 className="font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter text-lg">{feature.title}</h3>
                    <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-20">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
              <HelpCircle className="h-8 w-8 text-slate-800" />
              {content.faq?.title || dict.faq?.title || "FAQ"}
            </h2>
            <div className="mt-12 space-y-6">
              {(content.faq?.items || dict.faq?.items || []).map((faq: any, idx: number) => (
                <div key={idx} className="group rounded-[2rem] border border-neutral-200 p-8 dark:border-neutral-800 hover:border-slate-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                  <h3 className="font-black text-neutral-900 dark:text-white group-hover:text-slate-600 transition-colors uppercase italic tracking-tighter text-lg">{faq.q}</h3>
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

export default function TwitterPage(props: TwitterPageProps) {
  return (
    <React.Suspense fallback={null}>
      <TwitterPageContent {...props} />
    </React.Suspense>
  )
}
