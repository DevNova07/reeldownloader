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
const SocialPlatformBar = dynamic(() => import("@/components/layout/SocialPlatformBar").then(m => m.SocialPlatformBar))
const SmartClipboard = dynamic(() => import("@/components/ui/SmartClipboard").then(m => m.SmartClipboard), { ssr: false });
import { type Locale } from "@/i18n"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { Camera, CheckCircle2, Film, HelpCircle, Info, Music as MusicIcon, ShieldCheck, StopCircle, Zap } from "lucide-react"
import { cn } from "@/utils/cn"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { toast } from "react-hot-toast"
const TrustBadges = dynamic(() => import("@/components/ui/TrustBadges").then(m => m.TrustBadges))
const RichArticle = dynamic(() => import("../shared/RichArticle").then(m => m.RichArticle))
const InternalToolLinks = dynamic(() => import("../shared/InternalToolLinks").then(m => m.InternalToolLinks))
import { ExpandableSection } from "@/components/ui/ExpandableSection"
import { HeroQuickGuide } from "../shared/HeroQuickGuide"
import { useSearchParams, useRouter } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute, isAnyPlatformUrl } from "@/utils/platform-detector"
import { PremiumInfoSection } from "../shared/PremiumInfoSection"
import { PurpleStepGuide } from "../shared/PurpleStepGuide"

// Dynamic imports for improved performance (below-the-fold content)
const CategoryCards = dynamic(() => import("@/components/layout/CategoryCards").then(m => m.CategoryCards));
const TrendingBar = dynamic(() => import("@/components/layout/TrendingBar").then(m => m.TrendingBar));
const RelatedTools = dynamic(() => import("@/components/shared/RelatedTools").then(m => m.RelatedTools));
const VisualGuide = dynamic(() => import("@/components/shared/VisualGuide").then(m => m.VisualGuide));
const ChromeExtensionBanner = dynamic(() => import("@/components/layout/ChromeExtensionBanner").then(m => m.ChromeExtensionBanner));

interface TiktokPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  locale: string;
  themeColor?: string;
  dict: any;
  activeTab?: string;
}

function TiktokContent({
  content = {},
  locale,
  themeColor = "pink",
  dict,
  activeTab = "video",
}: TiktokPageProps) {
  const router = useRouter()
  // Defensive check to prevent crashes if dictionary is missing for a slug
  const pageTitle = content?.title || "TikTok Downloader";
  const pageSeo = content?.seo || { title: pageTitle, desc: "Fast and secure media extraction tool." };
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)
  
  const { addToHistory } = useDownloadHistory("tiktok");
  const searchParams = useSearchParams()

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1);
    setAutoTriggerDownload(isAutoTrigger)
    const cached = getCached(url)
    if (cached) {
      setDownloadData(cached)
      return
    }

    setIsLoading(true)
    setDownloadData(null)
    setError(null)

    const searchPromise = async () => {
      // Use a timeout for the fetch
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 20000); // 20s timeout

      try {
        const response = await fetch("/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, platform: "tiktok" }),
          signal: controller.signal,
        })
        clearTimeout(id);

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
      } catch (e: any) {
        if (e.name === 'AbortError') {
          throw new Error("Request timed out. TikTok API is taking too long. Please try again.");
        }
        throw e;
      }
    }

    try {
      await searchPromise()
    } catch (err: any) {
      console.error("Client Search Error:", err);
      const msg = err?.message || "Failed to process the link. Please try again.";
      setError(msg);
      toast.error(msg, { duration: 5000 });
      // Fallback: Direct browser alert if toast is somehow hidden
      if (typeof window !== "undefined") {
        window.alert("ERROR: " + msg);
      }
    } finally {
      setIsLoading(false)
    }
  }

  const sharedUrl = searchParams.get('url') || ""

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "tiktok")

  const colors: Record<string, any> = {
    pink: { text: "text-cyan-400", bg: "bg-cyan-500", border: "border-pink-600", bgAccent: "bg-cyan-500/10", ribbon: "from-black via-slate-900 to-cyan-900", gradient: "from-pink-600 via-pink-500 to-rose-500", ribbonAcc: "from-pink-600 via-rose-600 to-pink-700", shadow: "shadow-[0_20px_50px_rgba(219,39,119,0.3)]", effect: "bg-cyan-500", mainText: "text-pink-300" },
    fuchsia: { text: "text-fuchsia-400", bg: "bg-fuchsia-500", border: "border-fuchsia-600", bgAccent: "bg-fuchsia-500/10", ribbon: "from-black via-slate-900 to-purple-900", gradient: "from-fuchsia-600 via-fuchsia-500 to-purple-500", ribbonAcc: "from-fuchsia-600 via-purple-600 to-fuchsia-700", shadow: "shadow-[0_20px_50px_rgba(217,70,239,0.3)]", effect: "bg-fuchsia-500", mainText: "text-fuchsia-300" },
    rose: { text: "text-rose-400", bg: "bg-rose-500", border: "border-rose-600", bgAccent: "bg-rose-500/10", ribbon: "from-black via-slate-900 to-rose-900", gradient: "from-rose-600 via-rose-500 to-red-500", ribbonAcc: "from-rose-600 via-red-600 to-rose-700", shadow: "shadow-[0_20px_50px_rgba(225,29,72,0.3)]", effect: "bg-rose-500", mainText: "text-rose-300" },
    blue: { text: "text-blue-400", bg: "bg-cyan-500", border: "border-blue-600", bgAccent: "bg-blue-500/10", ribbon: "from-black via-slate-900 to-blue-900", gradient: "from-blue-600 via-blue-500 to-cyan-500", ribbonAcc: "from-blue-600 via-cyan-600 to-blue-700", shadow: "shadow-[0_20px_50px_rgba(37,99,235,0.3)]", effect: "bg-blue-500", mainText: "text-blue-300" },
  };
  const cx = colors[themeColor] || colors.pink;

  return (
    <div className="flex flex-col">
      <StructuredData type="SoftwareApplication" data={pageSeo} />
      {content.faq && <StructuredData type="FAQPage" data={content.faq} />}
      {content.howTo && <StructuredData type="HowTo" data={content.howTo} />}
      {/* Hero Section */}
      <section className={`relative bg-linear-to-r ${cx.ribbon} px-4 pt-10 pb-6 sm:pt-16 sm:pb-20 sm:px-6 lg:px-8`}>
        <HeroEffect color={cx.effect} intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <SocialPlatformBar activeId="tiktok" />
          <PlatformTabs   
            activeId={activeTab} 
            activeColor={cx.text}
            tabs={dict.tabs}
            locale={locale}
            items={[
              { id: "video", label: dict.tabs?.video || "Video", href: "/tiktok", icon: <Film className="h-4 w-4" /> },
              { id: "story", label: dict.tabs?.story || "Story", href: "/tiktok/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "music", label: dict.tabs?.music || "Music", href: "/tiktok/music", icon: <MusicIcon className="h-4 w-4" /> },
              { id: "photo", label: dict.tabs?.photo || "Photo", href: "/tiktok/photo", icon: <Camera className="h-4 w-4" /> },
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-2 text-3xl min-[400px]:text-4xl font-black tracking-tight uppercase italic text-white sm:text-7xl drop-shadow-2xl">
              {pageTitle}
            </h1>
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

            <p className="mx-auto mb-4 max-w-2xl mt-8 mb-2 text-sm font-bold text-white/60 tracking-widest uppercase italic hidden sm:block">
              {content?.subtitle || pageSeo?.desc || "Fast and secure TikTok downloader."}
            </p>



            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-3xl mt-4 p-4 rounded-2xl bg-red-500/20 border-2 border-red-500/50 text-white font-black tracking-wider shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 p-1.5 rounded-lg">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  {error}
                </div>
              </motion.div>
            )}

            <HeroQuickGuide steps={dict?.guide?.steps || []} accentColor={cx.text} />

            <TrustBadges dict={dict} />
            <TrendingBar accentColor={cx.bg} />
            <DownloadCounter accentColor={cx.mainText} />
            
            <LoadingBar isLoading={isLoading} gradient={cx.gradient} />
          </div>
          <DownloadPreview 
            data={downloadData} 
            isLoading={isLoading} 
            autoTriggerDownload={autoTriggerDownload}
            searchCounter={searchCounter}
            buttonStyle={`bg-linear-to-br ${cx.ribbonAcc} text-white ${cx.shadow} hover:brightness-110 active:scale-95`}
            accentText={cx.text}
            accentBg={cx.bgAccent}
            accentBorder={cx.border}
          />
        </div>
      </section>

      <PremiumInfoSection 
        title={pageTitle}
        description={content?.seo?.desc || pageSeo?.desc}
        imageSrc="/images/tiktok-3d-logo.png"
      />

      <PurpleStepGuide 
        title={`How to Download ${dict.categories?.tiktok || "TikTok"} Videos`}
        steps={[
          {
            title: dict.guide?.steps?.[0]?.title?.replace('{platform}', 'TikTok') || "Copy the URL",
            description: dict.guide?.steps?.[0]?.desc?.replace('{platform}', 'TikTok') || "Open the TikTok app or website, go to the video you want to download. Tap the 'Share' button and select 'Copy Link'."
          },
          {
            title: dict.guide?.steps?.[1]?.title?.replace('{platform}', 'TikTok') || "Paste the Link",
            description: dict.guide?.steps?.[1]?.desc?.replace('{platform}', 'TikTok') || "Come back to SavClip, paste the copied link into the input field at the top of the page and click the 'Download' button."
          },
          {
            title: dict.guide?.steps?.[2]?.title?.replace('{platform}', 'TikTok') || "Download Your Video",
            description: dict.guide?.steps?.[2]?.desc?.replace('{platform}', 'TikTok') || "Review the results and find the file you want to save. Click the 'Download' button. Done!"
          }
        ]}
      />

      <RelatedTools currentPlatform="tiktok" />
      <CategoryCards />

      <InternalToolLinks currentPlatform="tiktok" dict={dict} accentColor={cx.text} />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">{dict.features?.title || "Features"}</h2>
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
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">{dict.features?.items?.[idx]?.title || "Feature"}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{dict.features?.items?.[idx]?.desc || "Description"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content?.howTo?.steps && content.howTo.steps.length >= 3 && (
        <VisualGuide 
          platformName={dict.categories?.tiktok || "TikTok"}
          accentColor={cx.text}
          bgAccentColor={cx.bg}
          Icon={MusicIcon}
          steps={[
            { title: dict.guide?.steps?.[0]?.title?.replace('{platform}', 'TikTok') || "Step 1", desc: dict.guide?.steps?.[0]?.desc?.replace('{platform}', 'TikTok') || "Open app and copy link.", image: "/images/how-to/step1.webp" },
            { title: dict.guide?.steps?.[1]?.title?.replace('{platform}', 'TikTok') || "Step 2", desc: dict.guide?.steps?.[1]?.desc?.replace('{platform}', 'TikTok') || "Paste the link here.", image: "/images/how-to/step2.webp" },
            { title: dict.guide?.steps?.[2]?.title?.replace('{platform}', 'TikTok') || "Step 3", desc: dict.guide?.steps?.[2]?.desc?.replace('{platform}', 'TikTok') || "Download the media.", image: "/images/how-to/step3.webp" },
          ]}
        />
      )}

      <ChromeExtensionBanner dict={dict} />

      {/* Info Section (SEO) */}
      {content.seo && (
        <section className="px-4 py-4 sm:py-12 bg-white dark:bg-black sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mt-10">
              <h2 className="flex items-center justify-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic text-center">
                <Info className={`h-8 w-8 ${cx.text}`} />
                {content.seo.title}
              </h2>
              <p className={cn("mt-6 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium text-center max-w-3xl mx-auto opacity-90")}>
                {content?.seo?.desc || pageSeo?.desc}
              </p>
              
              <ExpandableSection maxHeight={400} className="mt-16">
                {content?.article_content && (
                  <div>
                    <div className="flex flex-col items-center mb-8">
                      <div className={`p-3 rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 ${cx.text} mb-4`}>
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic text-center">Expert Guide & Safety</h3>
                        <p className="text-xs font-black text-neutral-400 tracking-widest uppercase italic mt-1 text-center">Verified Secure • Ethical Usage • HD Quality</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <RichArticle 
                      sections={content.article_content}
                      accentColor={cx.text}
                      boilerplate={dict.common?.boilerplates?.tiktok}
                    />
                    </div>
                  </div>
                )}
      
                {content.seo?.features && (
                  <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 text-center">
                    {content.seo.features.map((feature: any, idx: number) => (
                      <div key={idx} className="rounded-4xl bg-neutral-50 p-8 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-2xl flex flex-col items-center">
                        <h3 className="font-black text-neutral-900 dark:text-white tracking-tight uppercase italicer text-lg">{feature.title}</h3>
                        <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 hidden sm:block">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 sm:mt-20">
                  <h2 className="flex items-center justify-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic text-center">
                    <HelpCircle className={`h-8 w-8 ${cx.text}`} />
                    {content.faq?.title || dict.faq?.title || "FAQ"}
                  </h2>
                  <div className="mt-12 space-y-6 text-center">
                    {(content.faq?.items || dict.faq?.items || []).map((faq: any, idx: number) => (
                      <div key={idx} className={`group rounded-[2rem] border border-neutral-200 p-8 dark:border-neutral-800 hover:${cx.border}/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl`}>
                        <h3 className={`font-black text-neutral-900 dark:text-white group-hover:${cx.text} transition-colors tracking-tight uppercase italicer text-lg`}>{faq.q || faq.title}</h3>
                        <p className="mt-4 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 leading-relaxed hidden sm:block">{faq.a || faq.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
          </ExpandableSection>
          </div>
        </div>
      </section>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 border-t border-neutral-100 dark:border-neutral-800 pt-10">
        <Breadcrumbs 
          items={[
            { name: "Home", item: `/${locale}` },
            { name: "TikTok", item: `/${locale}/tiktok` },
            { name: pageTitle, item: `/${locale}/${content.slug || ""}` }
          ]}
          rating="4.9"
          reviewCount="15,200"
        />
      </div>
    </div>
  )
}

function TiktokPageInner(props: TiktokPageProps) {
  return (
    <React.Suspense fallback={null}>
      <TiktokContent {...props} />
    </React.Suspense>
  )
}


export default function TiktokPage(props: TiktokPageProps) {
  return (
    <React.Suspense fallback={null}>
      <TiktokPageInner {...props} />
    </React.Suspense>
  )
}
