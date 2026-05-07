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
import { type Locale } from "@/i18n"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { Camera, CheckCircle2, FileText, HelpCircle, Info, Megaphone, Music as MusicIcon, Send, ShieldCheck, Users, Zap } from "lucide-react"
import { toast } from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute, isAnyPlatformUrl } from "@/utils/platform-detector"
import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"
import { ExpandableSection } from "@/components/ui/ExpandableSection"
import { useAutoDownload } from "@/hooks/useAutoDownload"
import { PremiumInfoSection } from "../shared/PremiumInfoSection"
import { PurpleStepGuide } from "../shared/PurpleStepGuide"
import { cn } from "@/utils/cn"

import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { InternalToolLinks } from "@/components/shared/InternalToolLinks"

interface TelegramPageProps {
  content: any
  locale: string
  dict: any
  activeTab?: string
}

function TelegramPageContent({ content, locale, dict, activeTab = "media" }: TelegramPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)
  
  const { addToHistory } = useDownloadHistory("telegram")

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1)
    setAutoTriggerDownload(isAutoTrigger)
    const detectedPlatform = getPlatformFromUrl(url);
    if (detectedPlatform && detectedPlatform !== 'telegram') {
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
      return
    }

    setIsLoading(true)
    setDownloadData(null)
    setError(null)

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, platform: "telegram" }),
      })
      const result = await response.json()
      if (result.success) {
        setDownloadData(result.data)
        setCached(url, result.data)
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title })
      } else {
        throw new Error(result.error || "Failed to fetch media")
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
  useAutoDownload(handleSearch, locale, "telegram")

  return (
    <div className="flex flex-col">
      <StructuredData type="SoftwareApplication" data={{ title: content?.title || "Telegram Downloader" }} />
      {content?.howTo?.steps && (
        <StructuredData
          type="HowTo"
          data={{
            name: content.howTo.name || (content.title || "Telegram Downloader"),
            description: content.howTo.description || (content.subtitle || "Fast and secure Telegram downloader."),
            steps: content.howTo.steps || (dict.guide?.steps || [])
          }}
        />
      )}
      
      <section className={`relative overflow-hidden bg-linear-to-br from-fuchsia-600 via-purple-600 to-sky-500 px-4 pt-10 pb-10 sm:pt-16 sm:pb-24 sm:px-6 lg:px-8 shadow-[inset_0_-20px_60px_rgba(0,0,0,0.1)]`}>
        <HeroEffect color="bg-indigo-400" intensity="high" />
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <PlatformTabs   
            activeId={activeTab} 
            activeColor="text-pink-600"
            items={[
              { id: "video", label: "Video", href: "/telegram", icon: <Send className="h-4 w-4" /> },
              { id: "music", label: "MP3", href: "/telegram/mp3", icon: <MusicIcon className="h-4 w-4" /> },
              { id: "photo", label: "Photo", href: "/telegram/photo", icon: <Camera className="h-4 w-4" /> },
              { id: "files", label: "Files", href: "/telegram/files", icon: <FileText className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full"
          >
            <h1 className="font-black tracking-tighter text-white leading-tight whitespace-nowrap drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] px-2 text-[clamp(1.5rem,7vw,4.5rem)] sm:text-7xl md:text-8xl lg:text-9xl text-center">
              {content?.title || "Telegram Downloader"}
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(0.85rem,3.5vw,1.1rem)] sm:text-xl font-medium text-white/80 tracking-tight italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] px-4 mt-2">
              {content?.subtitle || "Download Telegram videos and files in HD quality."}
            </p>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              validate={isAnyPlatformUrl}
              buttonClass="bg-linear-to-br from-pink-600 via-rose-600 to-pink-700 text-white font-black uppercase tracking-widest shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all active:translate-y-[2px] active:shadow-none"
              iconClass="text-sky-500"
              initialValue={searchParams.get('url') || ""}
            />




            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mx-auto max-w-3xl mt-4 p-4 rounded-2xl bg-red-500/20 border-2 border-red-500/50 text-white font-black tracking-wider shadow-2xl backdrop-blur-md text-left"
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
            <TrustBadges dict={dict} />
            <TrendingBar accentColor="bg-fuchsia-600" />
            <DownloadCounter accentColor="text-fuchsia-200" />
            <LoadingBar isLoading={isLoading} gradient="from-indigo-500 via-purple-500 to-rose-500" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            autoTriggerDownload={autoTriggerDownload}
            searchCounter={searchCounter}
            buttonStyle="bg-linear-to-br from-pink-600 via-rose-600 to-pink-700 text-white font-black uppercase tracking-widest shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all active:translate-y-[2px] active:shadow-none"
            accentText="text-cyan-400"
            accentBg="bg-cyan-500/10"
            accentBorder="border-pink-600"
          />
        </div>
      </section>

      <PremiumInfoSection 
        title={content?.title || "Telegram Downloader"}
        description={content?.seo?.desc || content?.subtitle || "Fast and secure Telegram downloader."}
        imageSrc="/images/telegram-3d-logo.png"
      />

      <PurpleStepGuide 
        title={`How to Download ${dict.categories?.tele || "Telegram"} Videos`}
        steps={[
          {
            title: dict.guide?.steps?.[0]?.title?.replace('{platform}', 'Telegram') || "Copy the URL",
            description: dict.guide?.steps?.[0]?.desc?.replace('{platform}', 'Telegram') || "Open the Telegram app, go to the video or file you want to download. Tap the 'Share' or 'Menu' button and select 'Copy Link'."
          },
          {
            title: dict.guide?.steps?.[1]?.title?.replace('{platform}', 'Telegram') || "Paste the Link",
            description: dict.guide?.steps?.[1]?.desc?.replace('{platform}', 'Telegram') || "Come back to SavClip, paste the copied link into the input field at the top of the page and click the 'Download' button."
          },
          {
            title: dict.guide?.steps?.[2]?.title?.replace('{platform}', 'Telegram') || "Download Your Media",
            description: dict.guide?.steps?.[2]?.desc?.replace('{platform}', 'Telegram') || "Review the results and find the file you want to save. Click the 'Download' button. Done!"
          }
        ]}
      />

      <RelatedTools currentPlatform="telegram" />
      <CategoryCards />
      <InternalToolLinks currentPlatform="telegram" dict={dict} accentColor="text-sky-500" />

      <section className="bg-neutral-50 px-4 py-12 dark:bg-neutral-950 sm:px-6 lg:px-8 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-white tracking-widest uppercase italic">{dict.features.title}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[Zap, ShieldCheck, CheckCircle2].map((Icon, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-md dark:bg-black">
                  <Icon className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{dict.features.items[idx]?.title}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{dict.features.items[idx]?.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content?.howTo?.steps && content.howTo.steps.length >= 3 && (
        <VisualGuide 
          platformName={dict.categories?.tele || "Telegram"}
          accentColor="text-sky-600"
          bgAccentColor="bg-sky-600"
          Icon={Send}
          steps={[
            { title: dict.guide?.steps?.[0]?.title?.replace('{platform}', dict.categories?.tele || "Telegram") || "Step 1", desc: content.howTo.steps[0] || "", image: "/images/how-to/step1.webp" },
            { title: dict.guide?.steps?.[1]?.title?.replace('{platform}', dict.categories?.tele || "Telegram") || "Step 2", desc: (content.howTo.steps[1] || "") + " " + (content.howTo.steps[2] || ""), image: "/images/how-to/step2.webp" },
            { title: dict.guide?.steps?.[2]?.title?.replace('{platform}', dict.categories?.tele || "Telegram") || "Step 3", desc: content.howTo.steps[3] || content.howTo.steps[2] || "", image: "/images/how-to/step3.webp" },
          ]}
        />
      )}

      <ChromeExtensionBanner dict={dict} />

      <section className="px-4 py-4 sm:py-12 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
            <div className="mt-10">
              <h2 className="flex items-center justify-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic text-center">
                <Info className="h-8 w-8 text-sky-600" />
                {content?.seo?.title || content?.title || "Telegram Guide"}
              </h2>
              <p className={cn("mt-6 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium text-center max-w-3xl mx-auto opacity-90")}>
                {content?.seo?.desc || content?.subtitle || "Detailed information about downloading from Telegram."}
              </p>

            <ExpandableSection maxHeight={400} className="mt-16">
              {content.seo?.features && (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 text-center">
                  {content.seo.features.map((feature: any, idx: number) => (
                    <div key={idx} className="rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 flex flex-col items-center">
                      <h3 className="font-black text-neutral-900 dark:text-white tracking-tight uppercase italicer">{feature.title}</h3>
                      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-40">
                <h2 className="flex items-center justify-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic text-center">
                  <HelpCircle className="h-8 w-8 text-sky-600" />
                  {dict.faq.title}
                </h2>
                <div className="mt-10 space-y-6 text-center">
                  {(dict.faq.items || []).map((faq: any, idx: number) => (
                    <div key={idx} className="group rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 hover:border-sky-400/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                      <h3 className="font-black text-neutral-900 dark:text-white group-hover:text-sky-500 transition-colors tracking-tight uppercase italicer text-lg">{faq.q}</h3>
                      <p className="mt-4 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 group-hover:opacity-100 transition-opacity">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableSection>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 border-t border-neutral-100 dark:border-neutral-800 pt-10">
        <Breadcrumbs 
          items={[
            { name: "Home", item: `/${locale}` },
            { name: "Telegram", item: `/${locale}/telegram` },
            { name: content.title || "Telegram Downloader", item: `/${locale}/${content.slug || ""}` }
          ]}
          rating="4.9"
          reviewCount="1,500"
        />
      </div>
    </div>
  )
}

export default function TelegramPage(props: TelegramPageProps) {
  return (
    <React.Suspense fallback={null}>
      <TelegramPageContent {...props} />
    </React.Suspense>
  )
}
