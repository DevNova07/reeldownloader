"use client"

import * as React from "react"
import { useAutoDownload } from "@/hooks/useAutoDownload"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { cn } from "@/utils/cn"
import Link from "next/link"
import dynamic from "next/dynamic"

const CategoryCards = dynamic(() => import("@/components/layout/CategoryCards").then(mod => mod.CategoryCards))
const DownloadPreview = dynamic(() => import("@/components/layout/DownloadPreview").then(mod => mod.DownloadPreview), { ssr: false })
const StructuredData = dynamic(() => import("@/components/shared/StructuredData").then(mod => mod.StructuredData))
const PlatformTabs = dynamic(() => import("@/components/shared/PlatformTabs").then(mod => mod.PlatformTabs))
const SocialPlatformBar = dynamic(() => import("@/components/layout/SocialPlatformBar").then(mod => mod.SocialPlatformBar))
const VisualGuide = dynamic(() => import("@/components/shared/VisualGuide").then(mod => mod.VisualGuide))
const PopularTools = dynamic(() => import("@/components/layout/PopularTools").then(mod => mod.PopularTools))
const SmartClipboard = dynamic(() => import("@/components/ui/SmartClipboard").then(mod => mod.SmartClipboard), { ssr: false })
import { type Locale } from "@/i18n"

const TrendingBar = dynamic(() => import("@/components/layout/TrendingBar").then(mod => mod.TrendingBar))
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
const RelatedTools = dynamic(() => import("@/components/shared/RelatedTools").then(mod => mod.RelatedTools))
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { SocialProof } from "@/components/shared/SocialProof"
import { Camera, CheckCircle2, Film, HelpCircle, Info, Music as MusicIcon, PlaySquare, ShieldCheck, StopCircle, Zap } from "lucide-react"
import { toast } from "react-hot-toast"
import { isSmartInput, handleSmartRedirect } from "@/utils/platform-detector"
import { useRouter, useSearchParams } from "next/navigation"

const HeroQuickGuide = dynamic(() => import("@/components/shared/HeroQuickGuide").then(mod => mod.HeroQuickGuide), { ssr: false })
const TrustBadges = dynamic(() => import("@/components/ui/TrustBadges").then(mod => mod.TrustBadges), { ssr: false })
const ChromeExtensionBanner = dynamic(() => import("@/components/layout/ChromeExtensionBanner").then(mod => mod.ChromeExtensionBanner))
import { ExpandableSection } from "@/components/ui/ExpandableSection"
import { type PlatformResult } from "@/types/download"
import Image from "next/image"
import { PremiumInfoSection } from "@/components/shared/PremiumInfoSection"
import { PurpleStepGuide } from "@/components/shared/PurpleStepGuide"

function HomeViewContent({ locale, dict }: { locale: Locale, dict: any }) {
  const router = useRouter()
  const [downloadData, setDownloadData] = React.useState<any | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)

  const searchParams = useSearchParams()
  const { addToHistory } = useDownloadHistory("home")

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1)
    setAutoTriggerDownload(isAutoTrigger)

    if (handleSmartRedirect(url, locale, router)) {
      toast.success("Profile detected! Opening Bulk Downloader...")
      return
    }

    setIsLoading(true)
    setDownloadData(null)

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response.")
      }

      const result = await response.json()
      if (result.success) {
        setDownloadData(result.data)
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title })
      } else {
        throw new Error(result.error || "Failed to fetch content")
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to process the link.")
    } finally {
      setIsLoading(false)
    }
  }

  const sharedUrl = searchParams.get('url') || ""
  useAutoDownload(handleSearch, locale, "home")

  const homeDict = dict?.home || {
    hero: { 
      title_1: "Video Downloader Online", 
      title_2: "Download Videos, Reels & Shorts", 
      title_3: "Without Watermark (HD)",
      subtitle: "Fast, free and secure video downloader." 
    },
    trust: { users: "Trusted by 100,000+ users", no_login: "No Login Required", free: "100% Free", unlimited: "Unlimited Downloads" },
    intro: "SavClip is a free online video downloader...",
    stats: { downloads: "1.2M+", users: "100K+", uptime: "99.9%" },
    ai_tools: { title: "Fuel Your Viral Growth", desc: "AI tools for creators.", tools: [] }
  };

  return (
    <div className="flex flex-col bg-linear-to-r from-fuchsia-600 via-purple-600 to-sky-500">
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: "Home", item: `https://savclip.com/${locale}` }
        ]}
      />
      <StructuredData
        type="HowTo"
        data={{
          name: dict?.guide?.title?.replace('{platform}', 'Videos') || "How to download",
          description: dict?.guide?.subtitle?.replace('{platform}', 'Videos') || "Simple steps to download",
          steps: dict?.guide?.steps || []
        }}
      />
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: dict?.seo?.title,
          description: dict?.seo?.description,
          ratingValue: "4.9",
          reviewCount: "15420"
        }}
      />
      <StructuredData
        type="FAQPage"
        data={dict.faq}
      />

      <section className="relative overflow-hidden bg-transparent px-4 pt-8 pb-2 sm:pt-10 sm:pb-4 sm:px-6 lg:px-8">
        <HeroEffect color="bg-fuchsia-400" intensity="high" />
        
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-1/4 -left-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-sky-500/30 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <SocialPlatformBar 
            activeId="home" 
            className="!justify-center gap-2 sm:!gap-3 !py-3 !px-6 sm:!py-4 sm:!px-8 !w-fit rounded-2xl mt-4 sm:mt-8 border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl" 
          />
          
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mt-6 sm:mt-14"
          >


            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white text-center whitespace-nowrap">
              {homeDict.hero.title_1}
            </h1>
            <p className="text-[10px] sm:text-sm md:text-lg font-medium text-white/90 text-center px-4 mb-1 whitespace-nowrap">
              {homeDict.hero.title_2} {homeDict.hero.title_3}
            </p>          </motion.div>

          <div className="w-full max-w-4xl mt-0">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              dict={dict}
              validate={isSmartInput}
              initialValue={sharedUrl}
              className="shadow-4xl"
              buttonClass="bg-linear-to-br from-pink-600 via-rose-600 to-pink-700 text-white font-black uppercase tracking-widest shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all active:translate-y-[2px] active:shadow-none"
              iconClass="text-white"
            />
          </div>



          <DownloadCounter accentColor="text-fuchsia-200" />
          <TrendingBar accentColor="bg-fuchsia-600" />

          <div className="mt-8 flex flex-col items-center gap-8 w-full">
            <LoadingBar
              isLoading={isLoading}
              label={dict?.common?.analyzing || "Analyzing..."}
              gradient="from-indigo-500 via-purple-500 to-rose-500"
            />

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
        </div>
      </section>

      <section className="pt-16 pb-20 bg-white dark:bg-neutral-950 px-4 shadow-[0_-20px_60px_rgba(0,0,0,0.1)] relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white italic tracking-tight mb-8">
            Free Video Downloader Online
          </h2>
          <div className="space-y-6">
            {homeDict.intro.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50 dark:bg-neutral-950 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest text-center mb-16">
            Download Videos from All Platforms
          </h2>
          <CategoryCards />
        </div>
      </section>

      <section className="py-20 bg-linear-to-r from-fuchsia-600 to-sky-600 text-white px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-black italic uppercase tracking-tighter mb-2">{homeDict.stats.downloads}</p>
              <p className="text-sm font-black uppercase tracking-widest text-indigo-200 italic">Total Downloads</p>
            </div>
            <div>
              <p className="text-5xl font-black italic uppercase tracking-tighter mb-2">{homeDict.stats.users}</p>
              <p className="text-sm font-black uppercase tracking-widest text-indigo-200 italic">Active Users</p>
            </div>
            <div>
              <p className="text-5xl font-black italic uppercase tracking-tighter mb-2">{homeDict.stats.uptime}</p>
              <p className="text-sm font-black uppercase tracking-widest text-indigo-200 italic">Platform Uptime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-black px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest text-center mb-16">
            {dict?.guide?.title || "How to Download Videos?"}
          </h2>
          <PurpleStepGuide
            title={dict?.guide?.subtitle || "Simple Steps"}
            steps={dict?.guide?.steps || []}
          />
        </div>
      </section>

      <section className="py-20 bg-neutral-50 dark:bg-neutral-950 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest text-center mb-16">
            Why SavClip is Better
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(dict?.features?.items || []).map((feature: any, i: number) => (
              <div key={i} className="p-8 bg-white dark:bg-neutral-900 rounded-4xl shadow-xl border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105">
                <div className="h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tight mb-4">{feature.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-black px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
              {homeDict.ai_tools.title}
            </h2>
            <p className="mt-4 text-xl text-neutral-500 font-bold max-w-2xl">{homeDict.ai_tools.desc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(homeDict.ai_tools.tools || []).map((tool: any, i: number) => (
              <Link
                key={i}
                href={`/${locale}${tool.href}`}
                className="group p-8 bg-neutral-50 dark:bg-neutral-900 rounded-4xl border-2 border-transparent hover:border-indigo-600 transition-all text-center"
              >
                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-black shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 transition-colors">
                  <Zap className="h-6 w-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tight group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50 dark:bg-neutral-950 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest text-center mb-16">
            FAQs
          </h2>
          <div className="space-y-6">
            {(dict?.faq?.items || []).map((faq: any, i: number) => (
              <div key={i} className="p-8 bg-white dark:bg-neutral-900 rounded-4xl shadow-md border border-neutral-100 dark:border-neutral-800 transition-all hover:shadow-2xl">
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tight mb-4 flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-indigo-600" />
                  {faq.q}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChromeExtensionBanner dict={dict} />
    </div>
  )
}

export function HomeView(props: { locale: Locale, dict: any }) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-black" />}>
      <HomeViewContent {...props} />
    </React.Suspense>
  )
}
