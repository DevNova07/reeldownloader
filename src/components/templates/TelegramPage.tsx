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
import { type Locale } from "@/i18n"
import { dictionaries } from "@/dictionaries/client"
import { TrendingBar } from "@/components/layout/TrendingBar"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { RelatedTools } from "@/components/shared/RelatedTools"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { Send, FileText, Zap, ShieldCheck, CheckCircle2, HelpCircle, Info } from "lucide-react"
import { ToolSubNav } from "@/components/layout/ToolSubNav"
import { toast } from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute, isAnyPlatformUrl } from "@/utils/platform-detector"
import { TrustBadges } from "@/components/ui/TrustBadges"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"
import { ExpandableSection } from "@/components/ui/ExpandableSection"

interface TelegramPageProps {
  content: any
  locale: Locale
}

export default function TelegramPage({ content, locale }: TelegramPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dict = (dictionaries as any)[locale] || dictionaries.en

  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const { addToHistory } = useDownloadHistory("telegram")

  const handleSearch = async (url: string) => {
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
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    const sharedUrl = searchParams.get('url')
    if (sharedUrl && (sharedUrl.startsWith('http') || sharedUrl.includes('t.me') || sharedUrl.includes('telegram'))) {
      handleSearch(sharedUrl)
    }
  }, [searchParams])

  return (
    <div className="flex flex-col">
      <ToolSubNav />
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
      
      <section className="relative overflow-hidden bg-linear-to-r from-sky-500 to-blue-600 px-4 pt-14 pb-8 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-sky-400" intensity="high" />
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialServiceBar activeId="telegram" />
          <PlatformTabs   
            activeId="media" 
            activeColor="text-sky-600"
            tabs={dict.tabs}
            items={[
              { id: "media", label: dict.tabs.video, href: "/telegram", icon: <Send className="h-4 w-4" /> },
              { id: "file", label: "Files", href: "/telegram", icon: <FileText className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic">
              {content?.title || "Telegram Downloader"}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              {content?.subtitle || content?.seo?.desc || "Fast and secure Telegram downloader."}
            </p>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              dict={dict}
              validate={isAnyPlatformUrl}
              buttonClass={`bg-sky-500 text-white shadow-2xl`}
              iconClass="text-sky-500"
              initialValue={searchParams.get('url') || ""}
            />
            <TrustBadges dict={dict} />
            <TrendingBar accentColor="bg-sky-400" />
            <DownloadCounter accentColor="text-sky-200" />
            <LoadingBar isLoading={isLoading} label={dict.common.analyzing} gradient="from-sky-500 via-sky-400 to-blue-400" />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            buttonStyle="bg-white text-sky-600 hover:bg-neutral-100"
            accentText="text-sky-600"
            accentBg="bg-sky-600/10"
            accentBorder="border-sky-600"
          />
        </div>
      </section>

      <RelatedTools currentPlatform="telegram" />
      <CategoryCards />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-white uppercase italic tracking-widest">{dict.features.title}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[Zap, ShieldCheck, CheckCircle2].map((Icon, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-md dark:bg-black">
                  <Icon className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white uppercase italic">{dict.features.items[idx]?.title}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{dict.features.items[idx]?.desc}</p>
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

      <section className="px-4 py-4 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-3xl font-bold text-neutral-900 dark:text-white uppercase italic tracking-widest">
              <Info className="h-8 w-8 text-sky-600" />
              {content?.seo?.title || content?.title || "Telegram Guide"}
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-sky-400 pl-6 font-medium">
              {content?.seo?.desc || content?.subtitle || "Detailed information about downloading from Telegram."}
            </p>

            <ExpandableSection maxHeight={400} className="mt-16">
              {content.seo?.features && (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {content.seo.features.map((feature: any, idx: number) => (
                    <div key={idx} className="rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105">
                      <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-tighter">{feature.title}</h4>
                      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-40">
                <h2 className="flex items-center gap-2 text-3xl font-bold text-neutral-900 dark:text-white uppercase italic tracking-widest">
                  <HelpCircle className="h-8 w-8 text-sky-600" />
                  {dict.faq.title}
                </h2>
                <div className="mt-10 space-y-6">
                  {dict.faq.items.map((faq: any, idx: number) => (
                    <div key={idx} className="group rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 hover:border-sky-400/50 transition-all">
                      <h4 className="font-bold text-neutral-900 dark:text-white group-hover:text-sky-500 transition-colors uppercase italic tracking-tighter text-lg">{faq.q}</h4>
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
