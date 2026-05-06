"use client";

import * as React from "react";
import { useAutoDownload } from "@/hooks/useAutoDownload";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/layout/SearchBar";
import { type PlatformResult } from "@/types/download";
import dynamic from "next/dynamic";

const DownloadPreview = dynamic(() => import("@/components/layout/DownloadPreview").then(m => m.DownloadPreview), { ssr: false });
const StructuredData = dynamic(() => import("@/components/shared/StructuredData").then(m => m.StructuredData));
const SmartClipboard = dynamic(() => import("@/components/ui/SmartClipboard").then(m => m.SmartClipboard), { ssr: false });
import Image from "next/image";
const PlatformTabs = dynamic(() => import("@/components/shared/PlatformTabs").then(m => m.PlatformTabs));
import { type Locale } from "@/i18n";
import { LoadingBar } from "@/components/ui/LoadingBar";
import { DownloadCounter } from "@/components/ui/DownloadCounter";
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory";
import { HeroEffect } from "@/components/shared/HeroEffect";
import { Camera, PlaySquare, Film, StopCircle, Zap, ShieldCheck, CheckCircle2, HelpCircle, Info, Music as MusicIcon, ChevronRight } from "lucide-react";
import { cn, isValidInstaUrl } from "@/utils/cn";
import Link from "next/link";

import { MobileAccordion } from "@/components/ui/MobileAccordion";
const TrustBadges = dynamic(() => import("@/components/ui/TrustBadges").then(m => m.TrustBadges));

const RichArticle = dynamic(() => import("../shared/RichArticle").then(m => m.RichArticle));
const InternalToolLinks = dynamic(() => import("../shared/InternalToolLinks").then(m => m.InternalToolLinks));
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ExpandableSection } from "@/components/ui/ExpandableSection";
import { HeroQuickGuide } from "../shared/HeroQuickGuide"
import { PremiumInfoSection } from "../shared/PremiumInfoSection"
import { PurpleStepGuide } from "../shared/PurpleStepGuide"
import { toast } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { getPlatformFromUrl, getLocalizedRoute, isAnyPlatformUrl } from "@/utils/platform-detector";

// Dynamic imports for improved performance (below-the-fold content)
const CategoryCards = dynamic(() => import("@/components/layout/CategoryCards").then(m => m.CategoryCards));
const TrendingBar = dynamic(() => import("@/components/layout/TrendingBar").then(m => m.TrendingBar));
const RelatedTools = dynamic(() => import("@/components/shared/RelatedTools").then(m => m.RelatedTools));
const VisualGuide = dynamic(() => import("@/components/shared/VisualGuide").then(m => m.VisualGuide));
const ChromeExtensionBanner = dynamic(() => import("@/components/layout/ChromeExtensionBanner").then(m => m.ChromeExtensionBanner));

interface InstagramPageProps {
  content: any; // eslint-disable-line @typescript-eslint/no-explicit-any 
  // The SEO page content object
  locale: string;
  themeColor?: string;
  dict: any;
  activeTab?: string;
}

function InstagramPageContent({
  content = {},
  locale,
  themeColor = "pink",
  dict,
  activeTab = "reels",
}: InstagramPageProps) {
  const router = useRouter()
  // Defensive check to prevent crashes if dictionary is missing for a slug
  const pageTitle = content?.title || "Instagram Downloader";
  const pageSeo = content?.seo || { title: pageTitle, desc: "Fast and secure media extraction tool." };
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false);
  const [searchCounter, setSearchCounter] = React.useState(0);

  const { history: recentDownloads, addToHistory, clearHistory } = useDownloadHistory("instagram");
  const searchParams = useSearchParams()
  const sharedUrl = searchParams.get('url') || "";

  const handleSearch = async (url: string, isAutoTrigger = false) => {
    setSearchCounter(prev => prev + 1);
    setAutoTriggerDownload(isAutoTrigger);
    const cached = getCached(url);
    if (cached) {
      setDownloadData(cached);
      return;
    }

    setIsLoading(true);
    setDownloadData(null);
    setError(null);

    const searchPromise = async () => {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response.");
      }

      const result = await response.json();
      if (result.success) {
        setDownloadData(result.data);
        setCached(url, result.data);
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title });
        return result;
      } else {
        throw new Error(result.error || "Failed to fetch content");
      }
    };

    try {
      await searchPromise();
    } catch (err: any) {
      const msg = err?.message || "Failed to process the link. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };


  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "instagram")

  const colors: Record<string, any> = {
    amber: { text: "text-amber-600", bg: "bg-amber-600", border: "border-amber-600", bgAccent: "bg-amber-600/10", ribbon: "from-orange-500 to-amber-600", gradient: "from-amber-600 via-orange-500 to-yellow-500", effect: "bg-amber-400" },
    pink: { text: "text-pink-600", bg: "bg-pink-600", border: "border-pink-600", bgAccent: "bg-pink-600/10", ribbon: "from-rose-500 to-purple-600", gradient: "from-pink-500 via-purple-500 to-blue-500", effect: "bg-pink-400" },
    purple: { text: "text-purple-600", bg: "bg-purple-600", border: "border-purple-600", bgAccent: "bg-purple-600/10", ribbon: "from-purple-500 to-indigo-600", gradient: "from-purple-500 via-indigo-500 to-blue-500", effect: "bg-purple-400" },
  };
  const cx = colors[themeColor] || colors.pink;

  const infoData = React.useMemo(() => {
    switch (activeTab) {
      case "reels":
        return {
          title: "Instagram Reels Downloader Online",
          desc: "SavClip is the ultimate Instagram Reels downloader that lets you save your favorite reels in original HD quality without any watermark. Whether it's trending music, viral challenges, or creative clips, you can download Instagram reels instantly on any device including iPhone, Android, and PC.\n\nOur tool is 100% free, fast, and requires no login or installation. Simply paste the reel link above to enjoy high-speed downloads with no limits. Perfect for creators who want to archive inspiration or share reels offline in crystal clear resolution."
        };
      case "story":
        return {
          title: "Instagram Story Downloader & Saver",
          desc: "Save and watch Instagram stories and highlights anonymously with our professional Instagram story downloader. SavClip allows you to download stories in high resolution without the uploader ever knowing you've viewed or saved them.\n\nWhether you want to preserve a memory or save a tutorial, our anonymous story saver works seamlessly on all browsers. No login is required, ensuring your privacy and security at all times. Simply enter the username or story link to start downloading unlimited Instagram stories and highlights for free."
        };
      case "photo":
        return {
          title: "Instagram Photo & DP Downloader",
          desc: "Download Instagram photos, profile pictures, and carousels in their original high resolution with SavClip. Our Instagram photo downloader ensures you get the maximum quality available, perfect for saving high-res photography, design inspiration, or wallpapers.\n\nYou can download single images or entire carousel posts with just one click. The tool is fast, secure, and completely free to use without any registration. Just paste the image URL above to save Instagram photos directly to your gallery in seconds."
        };
      case "video":
      default:
        return {
          title: "Instagram Video Download Online",
          desc: "Download Instagram videos, reels, stories and IGTV in HD quality without watermark using SavClip. Our Instagram video downloader is fast, free and secure, allowing you to save videos instantly without login.\n\nWith this tool, you can easily download Instagram videos on mobile, desktop, or tablet. Simply paste your Instagram link above and click the download button to get high-quality videos in seconds. SavClip makes it easy to download Instagram content for offline viewing, content creation, or sharing."
        };
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col">
      <StructuredData type="WebSite" data={{}} />
      <StructuredData 
        type="BreadcrumbList" 
        data={[
          { name: "SavClip", item: `https://savclip.com/${locale}` },
          { name: "Instagram", item: `https://savclip.com/${locale}/instagram` },
          { name: pageTitle, item: `https://savclip.com/${locale}/${content.slug || ""}` }
        ]} 
      />
      <StructuredData 
        type="SoftwareApplication" 
        data={{
          ...pageSeo,
          ratingValue: "4.9",
          reviewCount: "12840"
        }} 
      />
      {content.faq && <StructuredData type="FAQPage" data={content.faq} />}
      {content.howTo && <StructuredData type="HowTo" data={content.howTo} />}
      {/* Hero Section */}
      <section className={`relative bg-linear-to-r ${cx.ribbon} px-4 pt-8 pb-8 sm:pt-10 sm:pb-20 sm:px-6 lg:px-8`}>
        <HeroEffect color={cx.effect} intensity="high" />

        <div className="relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">
          <PlatformTabs   
            activeId={activeTab} 
            activeColor={cx.text}
            tabs={dict?.tabs}
            locale={locale}
            items={[
              { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/instagram/reels", icon: <Film className="h-4 w-4" /> },
              { id: "video", label: dict?.tabs?.video || "Video", href: "/instagram", icon: <Film className="h-4 w-4" /> },
              { id: "story", label: dict?.tabs?.story || "Story", href: "/instagram/story", icon: <StopCircle className="h-4 w-4" /> },
              (activeTab === 'audio' || activeTab === 'music' || activeTab === 'mp3') ? (
                { id: "audio", label: dict?.tabs?.audio || "Audio", href: "/instagram/music", icon: <MusicIcon className="h-4 w-4" /> }
              ) : (
                { id: "photo", label: dict?.tabs?.photo || "Photo", href: "/instagram/photo", icon: <Camera className="h-4 w-4" /> }
              ),
            ]} 
          />

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className={cn(
              "font-black tracking-tighter text-white leading-tight whitespace-nowrap drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] px-2",
              pageTitle.length > 25 
                ? "text-[clamp(1.5rem,6.5vw,2.6rem)] sm:text-8xl md:text-9xl" 
                : "text-[1.7rem] min-[400px]:text-[3.2rem] sm:text-9xl md:text-[8rem]"
            )}>
              {pageTitle}
            </h1>
          </motion.div>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-medium text-white/80 tracking-tight italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] px-4 mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {content?.subtitle || pageSeo?.desc || "Fast and secure Instagram downloader."}
          </p>

          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            dict={dict}
            validate={isAnyPlatformUrl}
            initialValue={sharedUrl}
          />

          

          <AnimatePresence>
            {error && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-auto max-w-3xl mt-4 p-4 rounded-2xl bg-red-500/20 border-2 border-red-500/50 text-white font-black tracking-wider shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="bg-red-500 p-1.5 rounded-lg shrink-0">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          <DownloadCounter accentColor={cx.text} />
          <TrendingBar />

          <LoadingBar
            isLoading={isLoading}
            gradient={cx.gradient}
          />

          <div className="grid grid-cols-1 items-start justify-items-center">
            <div className="col-start-1 row-start-1 w-full">
              <DownloadPreview
                data={downloadData}
                isLoading={isLoading}
                autoTriggerDownload={autoTriggerDownload}
                searchCounter={searchCounter}
                buttonStyle="bg-linear-to-br from-rose-600 via-pink-600 to-purple-600 text-white shadow-[0_20px_50px_rgba(225,10,94,0.3)] ring-1 ring-inset ring-white/20 hover:brightness-110 active:scale-95"
                accentText={cx.text}
                accentBg={cx.bgAccent}
                accentBorder={cx.border}
              />
            </div>

            {/* Recent Downloads Section */}
            <div className="col-start-1 row-start-1 w-full">
              <AnimatePresence>
                {!isLoading && !downloadData && recentDownloads.length > 0 && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mx-auto mt-16 w-full max-w-4xl"
                  >
                    <div className="flex items-center justify-between border-b border-white/20 pb-4 text-white">
                    <h3 className="text-xl font-black tracking-widest uppercase italic">{dict?.common?.recent || "Recent"}</h3>
                      <button
                        onClick={clearHistory}
                        className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity tracking-tight uppercase italicer"
                      >
                        {dict?.common?.clear || "Clear"}
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
                            sizes="(max-width: 768px) 50vw, 20vw"
                            className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 p-3 text-left z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="line-clamp-1 text-[10px] font-black text-white hidden sm:block">{item.title}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <PremiumInfoSection 
        title={infoData.title}
        description={infoData.desc}
        imageSrc="/images/instagram-3d-logo.png"
      />

      <PurpleStepGuide 
        title="How to Download Instagram Videos"
        steps={[
          {
            title: "Copy the URL",
            description: "Open the Instagram app or website, go to the video, Reel, IGTV, or Story you want to download. Tap the three dots (...) and select 'Copy Link', or copy the URL from your browser address bar."
          },
          {
            title: "Paste the Link",
            description: "Come back to SavClip, paste the copied link into the input field at the top of the page and click the 'Download' button to start processing."
          },
          {
            title: "Download Your Video",
            description: "Review the results and find the file you want to save. Click the 'Download' button. Done! The video is saved to your device in its original HD quality."
          }
        ]}
      />

      <RelatedTools currentPlatform="instagram" />
      <CategoryCards />
      <InternalToolLinks currentPlatform="instagram" dict={dict} accentColor={cx.text} />

      <section className="bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic">{dict?.features?.title || "Features"}</h2>
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
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">{dict?.features?.items?.[idx]?.title || "Feature"}</h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 font-bold opacity-80">{dict?.features?.items?.[idx]?.desc || "Description"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {content?.howTo?.steps && content.howTo.steps.length >= 3 && (
          <VisualGuide
            platformName={dict.categories?.insta || "Instagram"}
            accentColor={cx.text}
            bgAccentColor={cx.bg}
            Icon={Film}
            steps={[
              { title: dict?.guide?.steps?.[0]?.title?.replace('{platform}', 'Instagram') || "Step 1", desc: content.howTo.steps[0] || "", image: "/images/how-to/step1.webp" },
              { title: dict?.guide?.steps?.[1]?.title?.replace('{platform}', 'Instagram') || "Step 2", desc: (content.howTo.steps[1] || "") + " " + (content.howTo.steps[2] || ""), image: "/images/how-to/step2.webp" },
              { title: dict?.guide?.steps?.[2]?.title?.replace('{platform}', 'Instagram') || "Step 3", desc: content.howTo.steps[3] || content.howTo.steps[2] || "", image: "/images/how-to/step3.webp" },
            ]}
          />
        )}

        <ChromeExtensionBanner dict={dict} />

        {/* Info Section (SEO) */}
        {content.seo && (
          <section className="px-4 py-4 sm:py-12 bg-white dark:bg-black sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mt-10 flex flex-col items-center">
                <h2 className="flex items-center justify-center gap-3 text-3xl font-black text-neutral-900 dark:text-white tracking-widest uppercase italic text-center">
                  <Info className={`h-8 w-8 ${cx.text}`} />
                  {content.seo.title}
                </h2>
                <p className={cn("mt-6 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium text-center max-w-3xl mx-auto opacity-90")}>
                  {content?.seo?.desc || pageSeo?.desc}
                </p>
                
                <ExpandableSection maxHeight={400} className="mt-16 w-full">
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

                      {content?.intro_seo && (
                        <div className="mb-12 px-4 max-w-4xl mx-auto">
                          {Array.isArray(content.intro_seo) ? (
                            content.intro_seo.map((p: string, i: number) => (
                              <p key={i} className="text-neutral-500 dark:text-neutral-400 font-bold opacity-80 leading-relaxed text-center mb-4">
                                {p}
                              </p>
                            ))
                          ) : (
                            <p className="text-neutral-500 dark:text-neutral-400 font-bold opacity-80 leading-relaxed text-center">
                              {content.intro_seo}
                            </p>
                          )}
                        </div>
                      )}
                      
                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <RichArticle 
                        sections={content.article_content}
                        accentColor={cx.text}
                        boilerplate={dict?.common?.boilerplates?.instagram}
                      />
                      </div>
                    </div>
                  )}

                  {content.seo.features && (
                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 text-center">
                      {content.seo.features.map((feature: { title: string; desc: string }, idx: number) => (
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
                      {(content.faq?.items || dict.faq?.items || []).map((faq: { q: string; a: string }, idx: number) => (
                        <div key={idx} className="group rounded-4xl border border-neutral-200 p-8 dark:border-neutral-800 hover:border-pink-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                          <h3 className={`font-black text-neutral-900 dark:text-white group-hover:${cx.text} transition-colors tracking-tight uppercase italicer text-lg mb-4`}>{faq.q}</h3>
                          <p className="text-neutral-500 dark:text-neutral-400 font-bold opacity-80 leading-relaxed hidden sm:block">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ExpandableSection>
              </div>
            </div>
          </section>
        )}

      <MobileAccordion
        accentColor={cx.text}
        items={[
          {
            id: "guide",
            title: dict.guide?.title?.replace("{platform}", "Instagram") || "How to Download",
            icon: HelpCircle,
            children: (
              <div className="space-y-6">
                {content?.howTo?.steps?.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white", cx.bg)}>
                      {i + 1}
                    </div>
                    <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400 leading-relaxed">{step}</p>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-[10px] font-black tracking-widest uppercase italic text-neutral-400 mb-4">Features</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {dict.features?.items?.slice(0, 3).map((f: any, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className={cn("h-4 w-4", cx.text)} />
                        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{f.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: "about",
            title: "Expert Guide & Safety",
            icon: ShieldCheck,
            children: (
              <div className="space-y-4">
                <p className="text-sm font-black text-neutral-500 dark:text-neutral-400 mb-4 sm:hidden">{content?.subtitle}</p>
                {content?.intro_seo && (
                  <div className="mb-4">
                    {Array.isArray(content.intro_seo) ? (
                      content.intro_seo.map((p: string, i: number) => (
                        <p key={i} className="text-xs font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
                          {p}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {content.intro_seo}
                      </p>
                    )}
                  </div>
                )}
                <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                  {content?.seo?.desc || pageSeo?.desc}
                </p>
                {content?.article_content && (
                  <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
                    <RichArticle
                      sections={content.article_content.slice(0, 1)}
                      accentColor={cx.text}
                      boilerplate={dict.common?.boilerplates?.instagram}
                    />
                  </div>
                )}
              </div>
            ),
          },
          {
            id: "faq",
            title: "Frequently Asked Questions",
            icon: HelpCircle,
            children: (
              <div className="space-y-6">
                {(content.faq?.items || dict.faq?.items || []).slice(0, 5).map((faq: { q: string; a: string }, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <h3 className={cn("text-xs font-black", cx.text)}>{faq.q}</h3>
                    <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            ),
          },
          {
            id: "tools",
            title: "Related Tools",
            icon: Zap,
            children: (
              <div className="grid grid-cols-2 gap-3">
                {dict.platforms?.instagram &&
                  Object.entries(dict.platforms.instagram)
                    .slice(0, 6)
                    .map(([key, val]: [string, any]) => {
                      if (typeof val === "string") return null;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            const route = getLocalizedRoute(key.replace(/_/g, "-"), locale);
                            if (route) router.push(route);
                          }}
                          className="text-left p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
                        >
                          <span className="text-[10px] font-black tracking-tight uppercase italicer line-clamp-1">{val.title}</span>
                        </button>
                      );
                    })}
              </div>
            ),
          },
        ]}
      />

      

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 border-t border-neutral-100 dark:border-neutral-800 pt-10">
        <Breadcrumbs 
          items={[
            { name: "SavClip", item: `/${locale}` },
            { name: "Instagram", item: `/${locale}/instagram` },
            { name: pageTitle, item: `/${locale}/${content.slug || ""}` }
          ]}
          rating="4.9"
          reviewCount="12,840"
        />
      </div>
</div>
  );
}

export default function InstagramPage(props: InstagramPageProps) {
  return (
    <React.Suspense fallback={null}>
      <InstagramPageContent {...props} />
    </React.Suspense>
  )
}
