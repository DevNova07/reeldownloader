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
import { type Locale } from "@/i18n"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { CheckCircle2, Film, HelpCircle, Image, Info, Music as MusicIcon, PlaySquare, ShieldCheck, Youtube, Zap } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { cn } from "@/utils/cn"
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

interface YoutubePageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  locale: string;
  themeColor?: string;
  dict: any;
  activeTab?: string;
}

function YoutubeContent({
  content = {},
  locale,
  themeColor = "red",
  dict,
  activeTab = "video",
}: YoutubePageProps) {
  const router = useRouter()
  // Defensive check to prevent crashes if dictionary is missing for a slug
  const pageTitle = content?.title || "YouTube Downloader";
  const pageSeo = content?.seo || { title: pageTitle, desc: "Fast and secure media extraction tool." };
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false)
  const [searchCounter, setSearchCounter] = React.useState(0)
  
  const { addToHistory } = useDownloadHistory("youtube");
  const searchParams = useSearchParams()
  const sharedUrl = searchParams.get('url') || "";

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

    const searchPromise = async () => {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
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
    } catch (err: any) {
      const msg = err?.message || "Failed to process the link. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "youtube")

  const colors: Record<string, any> = {
    red: { text: "text-red-500", bg: "bg-red-600", border: "border-red-600", bgAccent: "bg-red-600/10", ribbon: "from-red-600 to-red-800", gradient: "from-red-600 via-red-500 to-orange-500", effect: "bg-red-500" },
    red: { text: "text-red-500", bg: "bg-red-600", border: "border-red-600", bgAccent: "bg-red-600/10", ribbon: "from-red-600 to-red-800", ribbonAcc: "from-red-600 to-amber-500", gradient: "from-red-600 via-red-500 to-orange-500", effect: "bg-red-500", shadow: "shadow-[0_20px_50px_rgba(220,38,38,0.3)]" },
    orange: { text: "text-orange-500", bg: "bg-orange-600", border: "border-orange-600", bgAccent: "bg-orange-600/10", ribbon: "from-orange-600 to-red-700", ribbonAcc: "from-orange-600 to-red-600", gradient: "from-orange-600 via-orange-500 to-red-500", effect: "bg-orange-500", shadow: "shadow-[0_20px_50px_rgba(249,115,22,0.3)]" },
    amber: { text: "text-amber-500", bg: "bg-amber-600", border: "border-amber-600", bgAccent: "bg-amber-600/10", ribbon: "from-amber-600 to-orange-700", gradient: "from-amber-600 via-amber-500 to-orange-500", effect: "bg-amber-500" },
    rose: { text: "text-rose-500", bg: "bg-rose-600", border: "border-rose-600", bgAccent: "bg-rose-600/10", ribbon: "from-rose-600 to-red-800", gradient: "from-rose-600 via-rose-500 to-red-500", effect: "bg-rose-500" },
  };
  const cx = colors[themeColor] || colors.red;

  const infoData = React.useMemo(() => {
    switch (activeTab) {
      case "thumbnail":
        return {
          title: "Download YouTube Thumbnails in HD & 4K",
          desc: "Save high-quality YouTube thumbnails and video covers directly to your device with SavClip. Our tool extracts the original image file in the highest resolution available, including HD, 4K, and MQ formats.\n\nPerfect for creators, researchers, and designers. Simply paste the YouTube video link above and get the thumbnail image instantly for free. No registration or software installation required."
        };
      case "shorts":
        return {
          title: "YouTube Shorts Downloader Online",
          desc: "Download YouTube Shorts in high resolution instantly with SavClip. Our specialized shorts downloader allows you to save viral vertical videos directly to your device for offline viewing.\n\nThe tool is completely free, secure, and works on all devices without requiring any software installation. Simply paste the YouTube Shorts link above and get your video in seconds."
        };
      case "music":
        return {
          title: "YouTube to MP3 Converter Pro",
          desc: "Extract high-quality audio and MP3 from any YouTube video with SavClip. Our professional YouTube to MP3 converter is perfect for saving music, podcasts, or lectures in crystal clear bitrates up to 320kbps.\n\nEnjoy fast and unlimited audio extractions for free. No registration or login is required. Just paste the YouTube URL above and choose the MP3 format to start your download."
        };
      case "video":
      default:
        return {
          title: "YouTube Video Downloader Online",
          desc: "Download YouTube videos in 4K, 1080p, and HD quality quickly and securely with SavClip. Our YouTube video downloader is the most reliable tool for saving videos for offline viewing without any hassle.\n\nEnjoy unlimited downloads with no login required. Simply paste the video URL above and click the download button to get high-quality MP4 files in seconds. SavClip works perfectly on mobile, tablet, and desktop."
        };
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col">
      <StructuredData type="SoftwareApplication" data={pageSeo} />
      {content.faq && <StructuredData type="FAQPage" data={content.faq} />}
      {content.howTo && <StructuredData type="HowTo" data={content.howTo} />}
      {/* Hero Section */}
      <section className={`relative bg-linear-to-r ${cx.ribbon} px-4 pt-10 pb-6 sm:pt-16 sm:pb-20 sm:px-6 lg:px-8`}>
        <HeroEffect color={cx.effect} intensity="high" />
        
        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <PlatformTabs   
            activeId={activeTab} 
            activeColor={cx.text}
            tabs={dict?.tabs}
            locale={locale}
            items={[
              { id: "video", label: dict?.tabs?.video || "Video", href: "/youtube", icon: <Film className="h-4 w-4" /> },
              { id: "shorts", label: dict?.tabs?.shorts || "Shorts", href: "/youtube-shorts-downloader", icon: <PlaySquare className="h-4 w-4" /> },
              { id: "music", label: dict?.tabs?.music || "Music", href: "/youtube-to-mp3", icon: <MusicIcon className="h-4 w-4" /> },
              { id: "thumbnail", label: "Thumbnail", href: "/youtube-thumbnail-downloader", icon: <Image className="h-4 w-4" /> },
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
              iconClass={`text-white`}
              initialValue={sharedUrl}
            />

            <p className="mx-auto mb-4 max-w-2xl mt-8 mb-2 text-sm font-bold text-white/60 tracking-widest uppercase italic hidden sm:block">
              {content?.subtitle || pageSeo?.desc || "Fast and secure YouTube downloader."}
            </p>



            <AnimatePresence>
            </AnimatePresence>

            <HeroQuickGuide steps={dict?.guide?.steps || []} accentColor={cx.text} />

            <TrustBadges dict={dict} />
            <TrendingBar accentColor={cx.bg} />
            <DownloadCounter accentColor={cx.text} />
            
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
        title={infoData.title}
        description={infoData.desc}
        imageSrc="/images/youtube-3d-logo.png"
      />

      <PurpleStepGuide 
        title={`How to Download ${dict.categories?.yt || "YouTube"} Videos`}
        steps={[
          {
            title: dict.guide?.steps?.[0]?.title?.replace('{platform}', 'YouTube') || "Copy the URL",
            description: dict.guide?.steps?.[0]?.desc?.replace('{platform}', 'YouTube') || "Open the YouTube app or website, go to the video or Short you want to download. Tap the 'Share' button and select 'Copy Link'."
          },
          {
            title: dict.guide?.steps?.[1]?.title?.replace('{platform}', 'YouTube') || "Paste the Link",
            description: dict.guide?.steps?.[1]?.desc?.replace('{platform}', 'YouTube') || "Come back to SavClip, paste the copied link into the input field at the top of the page and click the 'Download' button."
          },
          {
            title: dict.guide?.steps?.[2]?.title?.replace('{platform}', 'YouTube') || "Download Your Video",
            description: dict.guide?.steps?.[2]?.desc?.replace('{platform}', 'YouTube') || "Review the results and find the file you want to save. Click the 'Download' button. Done!"
          }
        ]}
      />

      <RelatedTools currentPlatform="youtube" />
      <CategoryCards />

      <InternalToolLinks currentPlatform="youtube" dict={dict} accentColor={cx.text} />

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
          platformName={dict.categories?.yt || "YouTube"}
          accentColor={cx.text}
          bgAccentColor={cx.bg}
          Icon={Youtube}
          steps={[
            { title: dict.guide?.steps?.[0]?.title?.replace('{platform}', 'YouTube') || "Step 1", desc: content.howTo.steps[0] || "", image: "/images/how-to/step1.webp" },
            { title: dict.guide?.steps?.[1]?.title?.replace('{platform}', 'YouTube') || "Step 2", desc: (content.howTo.steps[1] || "") + " " + (content.howTo.steps[2] || ""), image: "/images/how-to/step2.webp" },
            { title: dict.guide?.steps?.[2]?.title?.replace('{platform}', 'YouTube') || "Step 3", desc: content.howTo.steps[3] || content.howTo.steps[2] || "", image: "/images/how-to/step3.webp" },
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
                      boilerplate={dict.common?.boilerplates?.youtube}
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
                    <h3 className={`font-black text-neutral-900 dark:text-white group-hover:${cx.text} transition-colors tracking-tight uppercase italicer text-lg`}>{faq.q}</h3>
                    <p className="mt-4 text-neutral-500 dark:text-neutral-400 font-bold opacity-80 group-hover:opacity-100 transition-opacity">{faq.a}</p>
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
            { name: "YouTube", item: `/${locale}/youtube` },
            { name: pageTitle, item: `/${locale}/${content.slug || ""}` }
          ]}
          rating="4.9"
          reviewCount="21,500"
        />
      </div>
    </div>
  )
}

function YoutubePageInner(props: YoutubePageProps) {
  return (
    <React.Suspense fallback={null}>
      <YoutubeContent {...props} />
    </React.Suspense>
  )
}


export default function YoutubePage(props: YoutubePageProps) {
  return (
    <React.Suspense fallback={null}>
      <YoutubePageInner {...props} />
    </React.Suspense>
  )
}
