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
const SocialServiceBar = dynamic(() => import("@/components/layout/SocialServiceBar").then(m => m.SocialServiceBar));
import { type Locale } from "@/i18n";
import { getDictionary } from "@/dictionaries/client";
import { LoadingBar } from "@/components/ui/LoadingBar";
import { DownloadCounter } from "@/components/ui/DownloadCounter";
import { useDownloadHistory, getCached, setCached } from "@/hooks/useDownloadHistory";
import { HeroEffect } from "@/components/shared/HeroEffect";
import { Camera, PlaySquare, StopCircle, Film, CheckCircle2, ShieldCheck, Zap, HelpCircle, Info, ShieldAlert } from "lucide-react";
import { isValidInstaUrl } from "@/utils/cn";
import { ToolSubNav } from "@/components/layout/ToolSubNav";
const TrustBadges = dynamic(() => import("@/components/ui/TrustBadges").then(m => m.TrustBadges));
const RichArticle = dynamic(() => import("../shared/RichArticle").then(m => m.RichArticle));
const InternalToolLinks = dynamic(() => import("../shared/InternalToolLinks").then(m => m.InternalToolLinks));
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ExpandableSection } from "@/components/ui/ExpandableSection";
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
}

export default function InstagramPage({
  content = {},
  locale,
  themeColor = "pink",
}: InstagramPageProps) {
  const router = useRouter()
  // Defensive check to prevent crashes if dictionary is missing for a slug
  const pageTitle = content?.title || "Instagram Downloader";
  const pageSeo = content?.seo || { title: pageTitle, desc: "Fast and secure media extraction tool." };
  const [downloadData, setDownloadData] = React.useState<PlatformResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false);
  const [searchCounter, setSearchCounter] = React.useState(0);

    const dict = getDictionary(locale);
  const { history: recentDownloads, addToHistory, clearHistory } = useDownloadHistory("instagram");
  const searchParams = useSearchParams()



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
    } catch (err: unknown) {
    } finally {
      setIsLoading(false);
    }
  };

  const sharedUrl = searchParams.get('url') || ""

  // Auto-download logic for PWA Share Target
  useAutoDownload(handleSearch, locale, "instagram")

  const colors: Record<string, any> = {
    amber: { text: "text-amber-600", bg: "bg-amber-600", border: "border-amber-600", bgAccent: "bg-amber-600/10", ribbon: "from-orange-500 to-amber-600", gradient: "from-amber-600 via-orange-500 to-yellow-500", effect: "bg-amber-400" },
    pink: { text: "text-pink-600", bg: "bg-pink-600", border: "border-pink-600", bgAccent: "bg-pink-600/10", ribbon: "from-rose-500 to-purple-600", gradient: "from-pink-500 via-purple-500 to-blue-500", effect: "bg-pink-400" },
    purple: { text: "text-purple-600", bg: "bg-purple-600", border: "border-purple-600", bgAccent: "bg-purple-600/10", ribbon: "from-purple-500 to-indigo-600", gradient: "from-purple-500 via-indigo-500 to-blue-500", effect: "bg-purple-400" },
  };
  const cx = colors[themeColor] || colors.pink;

  return (
    <div className="flex flex-col">
      <StructuredData type="SoftwareApplication" data={pageSeo} />
      {/* Hero Section */}
      <section className={`relative bg-linear-to-r ${cx.ribbon} px-4 pt-14 pb-8 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8`}>
        <HeroEffect color={cx.effect} intensity="high" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <SocialServiceBar activeId="instagram" />
          <PlatformTabs
            activeId="reels"
            activeColor={cx.text}
            tabs={dict.tabs}
            locale={locale}
            items={[
              { id: "video", label: dict.tabs?.video || "Video", href: "/", icon: <Camera className="h-4 w-4" /> },
              { id: "reels", label: dict.tabs?.reels || "Reels", href: "/reels", icon: <PlaySquare className="h-4 w-4" /> },
              { id: "story", label: dict.tabs?.story || "Story", href: "/story", icon: <StopCircle className="h-4 w-4" /> },
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
              {content?.subtitle || pageSeo?.desc || "Fast and secure Instagram downloader."}
            </p>
          </motion.div>

          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            dict={dict}
            validate={isAnyPlatformUrl}
            initialValue={sharedUrl}
          />

          <TrustBadges dict={dict} />
          <DownloadCounter accentColor={cx.text} />
          <TrendingBar />

          <LoadingBar
            isLoading={isLoading}
            gradient={cx.gradient}
          />

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

          {/* Recent Downloads Section */}
          <AnimatePresence>
            {!isLoading && !downloadData && recentDownloads.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-16 w-full max-w-4xl"
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-4 text-white">
                  <h3 className="text-xl font-black tracking-widest uppercase italic">{dict.common?.recent || "Recent"}</h3>
                  <button
                    onClick={clearHistory}
                    className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter"
                  >
                    {dict.common?.clear || "Clear"}
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

      <ToolSubNav />
      {content.title && (
        <Breadcrumbs 
          locale={locale}
          platform="Instagram"
          platformPath="instagram"
          toolTitle={content.title}
        />
      )}

      <RelatedTools currentPlatform="instagram" />
      <CategoryCards />

      <InternalToolLinks currentPlatform="instagram" dict={dict} accentColor={cx.text} />

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
          platformName={dict.categories?.insta || "Instagram"}
          accentColor={cx.text}
          bgAccentColor={cx.bg}
          Icon={Film}
          steps={[
            { title: dict.guide?.steps?.[0]?.title?.replace('{platform}', 'Instagram') || "Step 1", desc: content.howTo.steps[0] || "", image: "/images/how-to/step1.webp" },
            { title: dict.guide?.steps?.[1]?.title?.replace('{platform}', 'Instagram') || "Step 2", desc: (content.howTo.steps[1] || "") + " " + (content.howTo.steps[2] || ""), image: "/images/how-to/step2.webp" },
            { title: dict.guide?.steps?.[2]?.title?.replace('{platform}', 'Instagram') || "Step 3", desc: content.howTo.steps[3] || content.howTo.steps[2] || "", image: "/images/how-to/step3.webp" },
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
                      boilerplate={dict.common?.boilerplates?.instagram}
                    />
                    </div>
                  </div>
                )}

                {content.seo.features && (
                  <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {content.seo.features.map((feature: { title: string; desc: string }, idx: number) => (
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
                    {(content.faq?.items || dict.faq?.items || []).map((faq: { q: string; a: string }, idx: number) => (
                      <div key={idx} className="group rounded-4xl border border-neutral-200 p-8 dark:border-neutral-800 hover:border-pink-500/50 transition-all bg-white dark:bg-transparent hover:shadow-2xl">
                        <h4 className={`font-black text-neutral-900 dark:text-white group-hover:${cx.text} transition-colors uppercase italic tracking-tighter text-lg`}>{faq.q}</h4>
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
  );
}
