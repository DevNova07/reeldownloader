"use client"

import * as React from "react"
import { useAutoDownload } from "@/hooks/useAutoDownload"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import { type PlatformResult } from "@/types/download"
import dynamic from "next/dynamic"

const DownloadPreview = dynamic(() => import("@/components/layout/DownloadPreview").then(m => m.DownloadPreview), { ssr: false })
const StructuredData = dynamic(() => import("@/components/shared/StructuredData").then(m => m.StructuredData))
const PlatformTabs = dynamic(() => import("@/components/shared/PlatformTabs").then(m => m.PlatformTabs))
const SocialServiceBar = dynamic(() => import("@/components/layout/SocialServiceBar").then(m => m.SocialServiceBar))
import { type Locale } from "@/i18n"
import { getDictionary } from "@/dictionaries/client"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { Ghost, StopCircle, Zap, ShieldCheck, CheckCircle2, HelpCircle, Info, ShieldAlert } from "lucide-react"
import { ToolSubNav } from "@/components/layout/ToolSubNav"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { toast } from "react-hot-toast"
const TrustBadges = dynamic(() => import("@/components/ui/TrustBadges").then(m => m.TrustBadges))
const RichArticle = dynamic(() => import("../shared/RichArticle").then(m => m.RichArticle))
const InternalToolLinks = dynamic(() => import("../shared/InternalToolLinks").then(m => m.InternalToolLinks))
import { ExpandableSection } from "@/components/ui/ExpandableSection"
import { HeroQuickGuide } from "../shared/HeroQuickGuide"
import { useSearchParams, useRouter } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute, isAnyPlatformUrl } from "@/utils/platform-detector"

// Dynamic imports for improved performance (below-the-fold content)
const CategoryCards = dynamic(() => import("@/components/layout/CategoryCards").then(m => m.CategoryCards));
const TrendingBar = dynamic(() => import("@/components/layout/TrendingBar").then(m => m.TrendingBar));
const RelatedTools = dynamic(() => import("@/components/shared/RelatedTools").then(m => m.RelatedTools));
const VisualGuide = dynamic(() => import("@/components/shared/VisualGuide").then(m => m.VisualGuide));
const ChromeExtensionBanner = dynamic(() => import("@/components/layout/ChromeExtensionBanner").then(m => m.ChromeExtensionBanner));

interface SnapchatPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  locale: string;
  themeColor?: string;
}

function SnapchatContent({
  content = {},
  locale,
  themeColor = "amber",
}: SnapchatPageProps) {
  const router = useRouter()
  // Defensive check to prevent crashes if dictionary is missing for a slug
  const pageTitle = content?.title || "Snapchat Downloader";
  const pageSeo = content?.seo || { title: pageTitle, desc: "Fast and secure media extraction tool." };
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  
  const dict = getDictionary(locale);
  const { addToHistory } = useDownloadHistory("snapchat");
  const searchParams = useSearchParams()



  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setAutoTriggerDownload(isAutoTrigger)
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
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "snapchat")

  const colors: Record<string, any> = {
    yellow: { text: "text-black", bg: "bg-yellow-400", border: "border-black", bgAccent: "bg-yellow-500/10", ribbon: "from-yellow-400 to-yellow-500", gradient: "from-yellow-400 via-yellow-300 to-amber-300", effect: "bg-yellow-300", shadow: "shadow-2xl" },
    amber: { text: "text-black", bg: "bg-amber-400", border: "border-black", bgAccent: "bg-amber-500/10", ribbon: "from-amber-400 to-orange-500", gradient: "from-amber-400 via-yellow-400 to-orange-400", effect: "bg-amber-300", shadow: "shadow-2xl" },
    black: { text: "text-yellow-400", bg: "bg-black", border: "border-yellow-500", bgAccent: "bg-yellow-500/5", ribbon: "from-neutral-900 to-black", gradient: "from-neutral-800 via-neutral-900 to-black", effect: "bg-yellow-500", shadow: "shadow-[0_20px_50px_rgba(0,0,0,0.5)]" },
    cyan: { text: "text-black", bg: "bg-cyan-400", border: "border-black", bgAccent: "bg-cyan-500/10", ribbon: "from-cyan-400 to-blue-500", gradient: "from-cyan-400 via-sky-400 to-blue-400", effect: "bg-cyan-200", shadow: "shadow-2xl" },
  };
  const cx = colors[themeColor] || colors.yellow;

  return (
    <div className="flex flex-col">
      <ToolSubNav />
      {content.title && (
        <Breadcrumbs 
          locale={locale}
          platform="Snapchat"
          platformPath="snapchat"
          toolTitle={content.title}
        />
      )}
      {content?.howTo?.steps && (
        <StructuredData
          type="HowTo"
          data={{
            name: content.howTo.name || pageTitle,
            description: content.howTo.description || pageSeo.desc,
            steps: content.howTo.steps
          }}
        />
      )}
      
      {/* Hero Section */}
      <section className={`relative bg-linear-to-r ${cx.ribbon} px-4 pt-14 pb-8 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8`}>
        <HeroEffect color={cx.effect} intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialServiceBar activeId="snapchat" />
          <PlatformTabs   
            activeId="video" 
            activeColor={cx.text}
            tabs={dict.tabs}
            locale={locale}
            items={[
              { id: "video", label: dict.tabs?.video || "Video", href: "/snapchat", icon: <Ghost className="h-4 w-4" /> },
              { id: "story", label: dict.tabs?.story || "Story", href: "/snapchat/story", icon: <StopCircle className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic">
              {pageTitle}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              {content?.subtitle || pageSeo?.desc || "Fast and secure Snapchat downloader."}
            </p>
          </motion.div>
          
          <div className="mx-auto max-w-3xl">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              dict={dict}
              validate={isAnyPlatformUrl}
              buttonClass={`bg-linear-to-br ${cx.ribbonAcc} text-white ${cx.shadow} ring-1 ring-inset ring-white/20`}
              iconClass={cx.text}
              initialValue={searchParams.get('url') || ""}
            />

            <HeroQuickGuide steps={dict?.guide?.steps || []} accentColor={cx.text} />

            <TrustBadges dict={dict} />
            <TrendingBar accentColor="bg-black" />
            <DownloadCounter accentColor={cx.text} />
            
            <LoadingBar isLoading={isLoading} label={dict.common?.analyzing || "Analyzing..."} gradient={cx.gradient} />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            autoTriggerDownload={autoTriggerDownload}
            buttonStyle={`bg-black text-white hover:bg-neutral-800 ${cx.shadow}`}
            accentText={cx.text}
            accentBg={cx.bgAccent}
            accentBorder={cx.border}
          />
        </div>
      </section>

      <RelatedTools currentPlatform="snapchat" />
      <CategoryCards />

      <InternalToolLinks currentPlatform="snapchat" dict={dict} accentColor={cx.text} />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">{dict.features?.title || "Features"}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { icon: <Zap className={`h-8 w-8 ${cx.text}`} /> },
              { icon: <ShieldCheck className={`h-8 w-8 ${cx.text}`} /> },
              { icon: <CheckCircle2 className={`h-8 w-8 ${cx.text}`} /> },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-2xl bg-white p-5 shadow-2xl dark:bg-black transition-all hover:scale-110 hover:-rotate-3 border border-neutral-100 dark:border-neutral-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase italic">{dict.features?.items?.[idx]?.title || "Feature"}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{dict.features?.items?.[idx]?.desc || "Description"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content?.howTo?.steps && content.howTo.steps.length >= 3 && (
        <VisualGuide 
          platformName={dict.categories?.snapchat || "Snapchat"}
          accentColor={cx.text}
          bgAccentColor={cx.bg}
          Icon={Ghost}
          steps={[
            { title: dict.guide?.steps?.[0]?.title?.replace('{platform}', 'Snapchat') || "Step 1", desc: dict.guide?.steps?.[0]?.desc?.replace('{platform}', 'Snapchat') || "Open app and copy link.", image: "/images/how-to/step1.webp" },
            { title: dict.guide?.steps?.[1]?.title?.replace('{platform}', 'Snapchat') || "Step 2", desc: dict.guide?.steps?.[1]?.desc?.replace('{platform}', 'Snapchat') || "Paste the link here.", image: "/images/how-to/step2.webp" },
            { title: dict.guide?.steps?.[2]?.title?.replace('{platform}', 'Snapchat') || "Step 3", desc: dict.guide?.steps?.[2]?.desc?.replace('{platform}', 'Snapchat') || "Download the media.", image: "/images/how-to/step3.webp" },
          ]}
        />
      )}

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      {content.seo && (
        <section className="px-4 py-4 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mt-10">
              <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
                <Info className={`h-8 w-8 ${cx.text}`} />
                {content.seo.title}
              </h2>
              <p className={`mt-4 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 ${cx.border} pl-8 font-medium`}>
                {content?.seo?.desc || pageSeo?.desc}
              </p>
              
              <ExpandableSection maxHeight={400} className="mt-16">
                {content?.article_content && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`p-3 rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 ${cx.text}`}>
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">Expert Guide & Safety</h3>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mt-1">Verified Secure • Ethical Usage • HD Quality</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <RichArticle 
                      sections={content.article_content}
                      accentColor={cx.text}
                      boilerplate={dict.common?.boilerplates?.snapchat}
                    />
                    </div>
                  </div>
                )}
      
                {content.seo?.features && (
                  <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {content.seo.features.map((feature: any, idx: number) => (
                      <div key={idx} className="rounded-4xl bg-neutral-50 p-8 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-2xl">
                        <h4 className="font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter text-lg">{feature.title}</h4>
                        <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 sm:mt-20">
                  <h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">
                    <HelpCircle className={`h-8 w-8 ${cx.text}`} />
                    {content.faq?.title || dict.faq?.title || "FAQ"}
                  </h2>
                  <div className="mt-12 space-y-6">
                    {(content.faq?.items || dict.faq?.items || []).map((faq: any, idx: number) => (
                      <div key={idx} className={`group rounded-[2rem] border border-neutral-200 p-8 dark:border-neutral-800 hover:${cx.border}/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl`}>
                  </div>
                ))}
              </div>
            </div>
          </ExpandableSection>
          </div>
        </div>
      </section>
    )}
    </div>
  )
}

function SnapchatPageInner(props: SnapchatPageProps) {
  return (
    <React.Suspense fallback={<LoadingBar isLoading={true} />}>
      <SnapchatContent {...props} />
    </React.Suspense>
  )
}


export default function SnapchatPage(props: SnapchatPageProps) {
  return (
    <React.Suspense fallback={null}>
      <SnapchatPageInner {...props} />
    </React.Suspense>
  )
}
