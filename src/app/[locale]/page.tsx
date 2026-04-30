"use client"

import * as React from "react"
import { useAutoDownload } from "@/hooks/useAutoDownload"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import dynamic from "next/dynamic"

const CategoryCards = dynamic(() => import("@/components/layout/CategoryCards").then(mod => mod.CategoryCards))
const DownloadPreview = dynamic(() => import("@/components/layout/DownloadPreview").then(mod => mod.DownloadPreview), { ssr: false })
const StructuredData = dynamic(() => import("@/components/shared/StructuredData").then(mod => mod.StructuredData))
const PlatformTabs = dynamic(() => import("@/components/shared/PlatformTabs").then(mod => mod.PlatformTabs))
const SocialServiceBar = dynamic(() => import("@/components/layout/SocialServiceBar").then(mod => mod.SocialServiceBar))
const VisualGuide = dynamic(() => import("@/components/shared/VisualGuide").then(mod => mod.VisualGuide))
const PopularTools = dynamic(() => import("@/components/layout/PopularTools").then(mod => mod.PopularTools))
const SmartClipboard = dynamic(() => import("@/components/ui/SmartClipboard").then(mod => mod.SmartClipboard), { ssr: false })
import { type Locale } from "@/i18n"
import { getDictionary } from "@/dictionaries/client"

const TrendingBar = dynamic(() => import("@/components/layout/TrendingBar").then(mod => mod.TrendingBar))
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
const RelatedTools = dynamic(() => import("@/components/shared/RelatedTools").then(mod => mod.RelatedTools))
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { SocialProof } from "@/components/shared/SocialProof"
import { Camera, PlaySquare, StopCircle, Film, CheckCircle2, ShieldCheck, Zap, HelpCircle, Info, Music as MusicIcon } from "lucide-react"
import { isValidInstaUrl } from "@/utils/cn"
import { ToolSubNav } from "@/components/layout/ToolSubNav"
import { toast } from "react-hot-toast"
import { getPlatformFromUrl, getLocalizedRoute, isAnyPlatformUrl, isSmartInput, handleSmartRedirect } from "@/utils/platform-detector"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const HeroQuickGuide = dynamic(() => import("@/components/shared/HeroQuickGuide").then(mod => mod.HeroQuickGuide), { ssr: false })
const TrustBadges = dynamic(() => import("@/components/ui/TrustBadges").then(mod => mod.TrustBadges), { ssr: false })
const ChromeExtensionBanner = dynamic(() => import("@/components/layout/ChromeExtensionBanner").then(mod => mod.ChromeExtensionBanner))
import { ExpandableSection } from "@/components/ui/ExpandableSection"
import { type PlatformResult } from "@/types/download"
import Image from "next/image"

function HomeContent() {
  const router = useRouter()
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = pathname.split('/')[1] as Locale
  const dict = getDictionary(locale)
  const { history: recentDownloads, addToHistory, clearHistory } = useDownloadHistory("instagram")

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1)
    setAutoTriggerDownload(isAutoTrigger)

    if (handleSmartRedirect(url, locale, router)) {
      toast.success("Profile detected! Opening Bulk Downloader...")
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
      toast.error(err?.message || "Failed to process the link. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  const sharedUrl = searchParams.get('url') || ""

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "instagram")

  const instaDict = dict.platforms.instagram;

  return (
    <div className="flex flex-col">
      <ToolSubNav />
      <StructuredData
        type="HowTo"
        data={{
          name: instaDict.howTo.name,
          description: instaDict.howTo.description,
          steps: instaDict.howTo.steps
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-rose-500 to-purple-600 px-4 pt-14 pb-8 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8">
        <HeroEffect color="bg-pink-400" intensity="high" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialServiceBar   activeId="instagram" />
          <PlatformTabs  
            activeId="video"
            activeColor="text-pink-600"
            tabs={dict.tabs}
            items={[
              { id: "video", label: dict.tabs.video, href: "/", icon: <Camera className="h-4 w-4" /> },
              { id: "reels", label: dict.tabs.reels, href: "/reels", icon: <PlaySquare className="h-4 w-4" /> },
              { id: "story", label: dict.tabs.story, href: "/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "music", label: dict.tabs.music, href: "/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic">
              {instaDict.title}
            </h1>
            <h2 className="sr-only">SavClip - Instagram Downloader</h2>
            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              {instaDict.subtitle}
            </p>
          </motion.div>

          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            dict={dict}
            validate={isSmartInput}
            initialValue={sharedUrl}
          />

          <HeroQuickGuide steps={dict.guide.steps} accentColor="text-pink-400" />

          <TrustBadges dict={dict} />

          <DownloadCounter accentColor="text-pink-400" />
          <TrendingBar />

          <LoadingBar
            isLoading={isLoading}
            label={dict.common.analyzing}
            gradient="from-pink-500 via-purple-500 to-blue-500"
          />

          <DownloadPreview
            data={downloadData}
            isLoading={isLoading}
            autoTriggerDownload={autoTriggerDownload}
            searchCounter={searchCounter}
            buttonStyle="bg-linear-to-br from-rose-600 via-pink-600 to-purple-600 text-white shadow-[0_20px_50px_rgba(225,10,94,0.3)] ring-1 ring-inset ring-white/20 hover:brightness-110 active:scale-95"
            accentText="text-pink-600"
            accentBg="bg-pink-600/10"
            accentBorder="border-pink-600"
          />

          {/* Recent Downloads Section */}
          <AnimatePresence>
            {!isLoading && !downloadData && recentDownloads.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-16 w-full max-w-4xl"
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-4 text-white">
                  <h3 className="text-xl font-black tracking-widest uppercase italic">{dict.common.recent}</h3>
                  <button
                    onClick={clearHistory}
                    className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter"
                  >
                    {dict.common.clear}
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {recentDownloads.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSearch(item.url)}
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-white/10 p-1 shadow-2xl ring-1 ring-white/20 backdrop-blur-md transition-all hover:ring-pink-500/50"
                    >
                      <Image
                        src={item.thumbnail ? `/api/proxy-download?url=${encodeURIComponent(item.thumbnail)}&type=image&inline=true` : "/window.svg"}
                        alt={item.title || "Thumbnail"}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, 15vw"
                        quality={60}
                        className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 p-3 text-left z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="line-clamp-1 text-[10px] font-black text-white uppercase italic">{item.title}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <RelatedTools currentPlatform="instagram" />

      <PopularTools />

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
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{dict.features.items[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisualGuide
        platformName={dict.categories.insta}
        accentColor="text-pink-600"
        bgAccentColor="bg-pink-600"
        Icon={Film}
        steps={[
          { title: dict.guide.steps[0].title.replace('{platform}', dict.categories.insta), desc: instaDict.howTo.steps[0], image: "/images/how-to/step1.webp" },
          { title: dict.guide.steps[1].title.replace('{platform}', dict.categories.insta), desc: instaDict.howTo.steps[1] + " " + instaDict.howTo.steps[2], image: "/images/how-to/step2.webp" },
          { title: dict.guide.steps[2].title.replace('{platform}', dict.categories.insta), desc: instaDict.howTo.steps[3], image: "/images/how-to/step3.webp" },
        ]}
      />

      <SocialProof dict={dict} />

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      <section className="px-4 py-4 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-10">
            <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
              <Info className="h-8 w-8 text-pink-600" />
              {instaDict.seo.title}
            </h2>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed italic border-l-4 border-pink-500 pl-8 font-medium">
              {instaDict.seo.desc}
            </p>

            <ExpandableSection maxHeight={400} className="mt-12">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {instaDict.seo.features.map((feature: { title: string; desc: string }, idx: number) => (
                  <div key={idx} className="rounded-4xl bg-neutral-50 p-8 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-2xl">
                    <h4 className="font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter text-lg">{feature.title}</h4>
                    <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-20">
                <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
                  <HelpCircle className="h-8 w-8 text-pink-600" />
                  {dict.faq.title}
                </h2>
                <div className="mt-12 space-y-6">
                  {dict.faq.items.map((faq: { q: string; a: string }, idx: number) => (
                    <div key={idx} className="group rounded-4xl border border-neutral-200 p-8 dark:border-neutral-800 hover:border-pink-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                      <h4 className="font-black text-neutral-900 dark:text-white group-hover:text-pink-600 transition-colors uppercase italic tracking-tighter text-lg">{faq.q}</h4>
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

export default function HomePage() {
  return (
    <React.Suspense fallback={null}>
      <HomeContent />
    </React.Suspense>
  )
}
