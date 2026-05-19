"use client"

import * as React from "react"
import { useAutoDownload } from "@/hooks/useAutoDownload"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/layout/SearchBar"
import Link from "next/link"
import dynamic from "next/dynamic"

const CategoryCards = dynamic(() => import("@/components/layout/CategoryCards").then(mod => mod.CategoryCards))
const DownloadPreview = dynamic(() => import("@/components/layout/DownloadPreview").then(mod => mod.DownloadPreview), { ssr: false })
const StructuredData = dynamic(() => import("@/components/shared/StructuredData").then(mod => mod.StructuredData))
const SocialPlatformBar = dynamic(() => import("@/components/layout/SocialPlatformBar").then(mod => mod.SocialPlatformBar))
import { type Locale } from "@/i18n"
import { LoadingBar } from "@/components/ui/LoadingBar"
import { DownloadCounter } from "@/components/ui/DownloadCounter"
import { useDownloadHistory } from "@/hooks/useDownloadHistory"
import { HeroEffect } from "@/components/shared/HeroEffect"
import { ArrowRight, CheckCircle2, HelpCircle, Hash, Type, Link2, Download, ShieldCheck, Zap, Globe, Smartphone, Monitor, Video, Layers, Lock } from "lucide-react"
import { toast } from "react-hot-toast"
import { isSmartInput, handleSmartRedirect } from "@/utils/platform-detector"
import { useRouter, useSearchParams } from "next/navigation"

const ChromeExtensionBanner = dynamic(() => import("@/components/layout/ChromeExtensionBanner").then(mod => mod.ChromeExtensionBanner))
import { PurpleStepGuide } from "@/components/shared/PurpleStepGuide"
import { RichArticle } from "@/components/shared/RichArticle"

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

  // Ultimate SEO Content Sections
  const introArticle = [
    {
      type: "paragraph" as const,
      content: "Welcome to SavClip, the ultimate global platform for downloading media across the internet. In today's digital age, content moves faster than ever. Whether you are a digital marketer archiving campaign materials, a content creator remixing trends, or simply someone who wants to save a memorable moment offline, having a reliable social media downloader is essential. SavClip provides a premium, all-in-one solution that allows you to download videos online effortlessly, without the need for installing suspicious apps or dealing with restrictive paywalls."
    },
    {
      type: "paragraph" as const,
      content: "We understand that quality matters. When you use a free video downloader, you shouldn't have to compromise on visual fidelity. That's why our proprietary extraction engine is designed as an HD video downloader, capable of pulling the highest available resolution—including Full HD and 4K—directly from the source servers. Furthermore, for platforms like TikTok where branding can ruin your personal archive, SavClip operates as a powerful tool to download videos without watermark, giving you clean, pure MP4 files every single time."
    },
    {
      type: "paragraph" as const,
      content: "SavClip isn't just a fast video downloader; it is a universal video downloader online. We support all major networks seamlessly. Whether you need an Instagram Reels downloader to save viral clips, a Facebook video downloader for long-form content, or a YouTube to MP4 converter for your favorite vlogs, our platform handles it all through one simple, smart input box. Our system automatically detects the platform—be it Snapchat, Telegram, or X (Twitter)—and routes your request to the optimal extraction protocol."
    },
    {
      type: "paragraph" as const,
      content: "Beyond media extraction, SavClip is pioneering the future of social media growth. We have integrated advanced AI tools directly into our platform. From our viral AI Hashtag Generator to our smart AI Caption Generator and engaging AI Bio Generator, we provide everything you need to not only save social media videos on any device but also to build a powerful online presence of your own. Experience the fastest, most secure video downloader available today, designed to run flawlessly on your iPhone, Android, or desktop PC."
    }
  ];

  const featuresList = [
    { title: "HD Video Downloads", desc: "Save videos in stunning Full HD and 4K quality natively from the source.", icon: <Monitor className="w-6 h-6 text-fuchsia-600" /> },
    { title: "No Watermark", desc: "Download clean videos from TikTok and Instagram without annoying logos.", icon: <Video className="w-6 h-6 text-fuchsia-600" /> },
    { title: "Multi-Platform Support", desc: "Universal downloader for Instagram, TikTok, YouTube, Facebook, X, and more.", icon: <Layers className="w-6 h-6 text-fuchsia-600" /> },
    { title: "Lightning Fast", desc: "Our multi-threaded extraction engine delivers the fastest video downloader experience.", icon: <Zap className="w-6 h-6 text-fuchsia-600" /> },
    { title: "Unlimited Downloads", desc: "Completely free online video saver with zero daily limits or hidden paywalls.", icon: <Download className="w-6 h-6 text-fuchsia-600" /> },
    { title: "Mobile & Desktop", desc: "Perfectly optimized video downloader for iPhone, Android, PC, and Mac.", icon: <Smartphone className="w-6 h-6 text-fuchsia-600" /> },
    { title: "100% Secure", desc: "A safe, secure video downloader with no account login or app installation required.", icon: <ShieldCheck className="w-6 h-6 text-fuchsia-600" /> },
    { title: "AI Tool Suite", desc: "Boost your social growth with our built-in AI Caption, Hashtag, and Bio Generators.", icon: <Type className="w-6 h-6 text-fuchsia-600" /> },
    { title: "Global CDN", desc: "Worldwide server network ensures instant video download speeds wherever you are.", icon: <Globe className="w-6 h-6 text-fuchsia-600" /> }
  ];

  const faqList = [
    { q: "How to download videos online for free?", a: "Simply copy the link of the video from Instagram, TikTok, YouTube, or Facebook, and paste it into the search box on SavClip. Click 'Download' to save the HD video instantly." },
    { q: "Is this a video downloader without watermark?", a: "Yes. SavClip serves as a premium no watermark downloader, especially for platforms like TikTok, ensuring you get a clean, unbranded HD video file." },
    { q: "Does this work as a video downloader for iPhone and Android?", a: "Absolutely. SavClip is a fully responsive mobile video downloader. You can use it directly in Safari, Chrome, or any mobile browser without installing extra apps." },
    { q: "What social media platforms are supported?", a: "SavClip is a universal video downloader supporting Instagram, Facebook, TikTok, YouTube, Snapchat, Telegram, and X (Twitter)." },
    { q: "Are the AI tools free to use?", a: "Yes! Our AI Caption Generator, AI Hashtag Generator, and AI Bio Generator are completely free to use to help you grow your social media presence." },
    { q: "Do I need to create an account?", a: "No. SavClip is a secure video downloader that requires zero login, protecting your privacy and ensuring fast, anonymous downloads." }
  ];

  const howToUseSteps = [
    { title: "Copy the Link", description: "Find the video, reel, or photo you want to download from your favorite app and copy its URL from the share menu." },
    { title: "Paste the Link", description: "Paste the copied URL into the search box at the top of this page." },
    { title: "Download", description: "Click the download button and choose your preferred HD video quality." }
  ];

  return (
    <div className="flex flex-col bg-linear-to-r from-fuchsia-600 via-purple-600 to-sky-500 font-sans">
      <StructuredData type="BreadcrumbList" data={[{ name: "Home", item: `https://savclip.com/${locale}` }]} />
      <StructuredData type="SoftwareApplication" data={{ title: "SavClip Universal Social Media Downloader", description: "Free HD video downloader online without watermark for Instagram, TikTok, YouTube, and Facebook.", ratingValue: "4.9", reviewCount: "25420" }} />
      <StructuredData type="FAQPage" data={{ items: faqList }} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-transparent px-4 pt-12 pb-8 sm:pt-20 sm:pb-12 sm:px-6 lg:px-8">
        <HeroEffect color="bg-fuchsia-400" intensity="high" />
        
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-1/4 -left-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-sky-500/30 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center gap-6 sm:gap-8">
          <SocialPlatformBar 
            activeId="home" 
            className="!justify-center gap-2 sm:!gap-3 !py-3 !px-6 sm:!py-4 sm:!px-8 !w-fit rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl" 
          />
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white text-center tracking-tight leading-tight drop-shadow-lg">
              Universal <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-cyan-300">Video Downloader</span> Online
            </h1>
            <p className="text-sm md:text-xl font-medium text-white/90 text-center px-4 max-w-3xl drop-shadow-md">
              Download HD videos, Reels, Shorts, and Photos from any social platform. Fast, secure, and completely free—with absolutely no watermarks.
            </p>
          </motion.div>

          <div className="w-full max-w-4xl mt-0 sm:mt-4">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              dict={dict}
              validate={isSmartInput}
              initialValue={sharedUrl}
              className="drop-shadow-xl"
              buttonClass="bg-linear-to-br from-pink-600 via-rose-600 to-pink-700 text-white font-bold uppercase tracking-wider shadow-lg transition-all active:translate-y-[2px] active:shadow-none"
              iconClass="text-white"
            />
            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-8 opacity-90">
               {[
                 { label: "No Watermark", icon: <Video className="h-4 w-4" /> },
                 { label: "Secure", icon: <Lock className="h-4 w-4" /> },
                 { label: "100% Free", icon: <Globe className="h-4 w-4" /> }
               ].map((badge, i) => (
                 <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">
                    <span className="p-1 bg-white/20 rounded-lg backdrop-blur-md">{badge.icon}</span>
                    <span className="drop-shadow-sm">{badge.label}</span>
                 </div>
               ))}
            </div>
          </div>

          
            <div className="mt-3 sm:mt-6 flex flex-col items-center">
              <div className="flex -space-x-4 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-12 h-12 rounded-full border-2 border-fuchsia-600 shadow-lg object-cover" />
                ))}
              </div>
              <p className="text-white font-bold tracking-widest uppercase text-sm drop-shadow-md">
                Trusted by <span className="text-fuchsia-300">100,000+</span> creators worldwide
              </p>
            </div>

          <DownloadCounter accentColor="text-fuchsia-200" />

          <div className="mt-1 sm:mt-4 flex flex-col items-center gap-8 w-full">
            <LoadingBar isLoading={isLoading} label={dict?.common?.analyzing || "Analyzing media..."} gradient="from-indigo-500 via-purple-500 to-rose-500" />
            <DownloadPreview data={downloadData} isLoading={isLoading} autoTriggerDownload={autoTriggerDownload} searchCounter={searchCounter} buttonStyle="bg-linear-to-br from-pink-600 via-rose-600 to-pink-700 text-white font-bold uppercase tracking-wider shadow-lg" accentText="text-cyan-400" accentBg="bg-cyan-500/10" accentBorder="border-pink-600" />
          </div>
        </div>
      </section>

      {/* INTRO ARTICLE SECTION (SEO H2s & Semantic Text) */}
      <section className="pt-6 pb-8 bg-white dark:bg-neutral-950 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white uppercase tracking-tight mb-3 text-center leading-tight">
            Download Videos from Social Media
          </h2>
          <RichArticle sections={introArticle} />
        </div>
      </section>

      
      {/* TRENDING TOOLS */}
      <section className="py-16 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Zap className="w-8 h-8 text-fuchsia-600" />
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-wider leading-tight">
              Trending Tools Right Now
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Instagram Reels Downloader', href: '/instagram-reels-downloader' },
              { label: 'TikTok No Watermark', href: '/tiktok-video-downloader' },
              { label: 'YouTube Shorts Downloader', href: '/youtube-shorts-downloader' },
              { label: 'Telegram Video Downloader', href: '/telegram-video-downloader' },
              { label: 'Facebook HD Saver', href: '/facebook-video-downloader' },
              { label: 'Snapchat Spotlight Saver', href: '/snapchat-spotlight-downloader' }
            ].map((tool, i) => (
              <Link key={i} href={`/${locale}${tool.href}`} className="px-6 py-4 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-700 dark:text-neutral-300 hover:bg-fuchsia-600 hover:text-white hover:border-fuchsia-600 transition-colors uppercase tracking-wider text-sm shadow-sm">
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE SECTION */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
        <PurpleStepGuide
          title="How to Use SavClip"
          steps={howToUseSteps}
        />
      </div>

      {/* PLATFORM CARDS SECTION */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900 px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 leading-tight text-center">
              All Video Downloader
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl mx-auto">
              One multi-platform social media downloader for all your needs. From Instagram Reels to YouTube Shorts, we've got you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { id: 'instagram', name: 'Instagram', desc: 'Download Reels, Stories & Photos', icon: '📸', color: 'bg-pink-500', href: '/instagram-video-downloader' },
              { id: 'tiktok', name: 'TikTok', desc: 'No Watermark Video Saver', icon: '🎵', color: 'bg-black', href: '/tiktok-video-downloader' },
              { id: 'youtube', name: 'YouTube', desc: 'Shorts & MP4 Downloader', icon: '▶️', color: 'bg-red-600', href: '/youtube-video-downloader' },
              { id: 'facebook', name: 'Facebook', desc: 'HD Video & Reels Downloader', icon: '🟦', color: 'bg-blue-600', href: '/facebook-video-downloader' },
              { id: 'x', name: 'X (Twitter)', desc: 'GIFs & Media Downloader', icon: '𝕏', color: 'bg-neutral-800', href: '/x-video-downloader' },
              { id: 'telegram', name: 'Telegram', desc: 'Private Video & File Saver', icon: '✈️', color: 'bg-sky-500', href: '/telegram-video-downloader' },
              { id: 'snapchat', name: 'Snapchat', desc: 'Stories & Spotlight Saver', icon: '👻', color: 'bg-yellow-400 text-black', href: '/snapchat-story-downloader' },
              { id: 'ai', name: 'AI Tools', desc: 'Captions, Hashtags & Bio', icon: '🤖', color: 'bg-indigo-600', href: '/tiktok-caption-generator' },
            ].map((p) => (
              <Link key={p.id} href={`/${locale}${p.href}`} className="flex flex-col p-8 rounded-3xl bg-white dark:bg-black shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-2xl hover:scale-[1.02] transition-all group">
                <div className={`w-16 h-16 ${p.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:rotate-6 transition-transform text-white`}>
                  {p.icon}
                </div>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-2">{p.name}</h3>
                <p className="text-neutral-500 font-bold mb-6">{p.desc}</p>
                <div className="mt-auto inline-flex items-center gap-2 text-fuchsia-600 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                  Open Tool <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURES SECTION (SEO Optimized) */}
      <section className="py-24 bg-white dark:bg-black px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 leading-tight text-center">
              Best Free Online Video Downloader
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">Why millions trust SavClip as their primary HD video downloader online.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature, i) => (
              <div key={i} className="p-8 bg-neutral-50 dark:bg-neutral-900/50 rounded-4xl border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-[1.02] hover:shadow-xl group">
                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white uppercase tracking-tight mb-3">{feature.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ SECTION (SEO Optimized) */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-center mb-16 leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqList.map((faq, i) => (
              <div key={i} className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tight mb-2 flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-fuchsia-600 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed ml-8 text-justify md:text-left hyphens-auto">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* BLOG PREVIEWS */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900 px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-wider mb-4 leading-tight text-center">
              Creator Growth Guides
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl mx-auto">
              Master the algorithm and grow your audience with our latest tips and tricks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Best Instagram Captions to Go Viral in 2026", cat: "Instagram Tips", color: "text-pink-500", href: "/blog", image: "/blog/insta_captions.png" },
              { title: "How to Download TikTok Videos Without Watermark Natively", cat: "TikTok Hacks", color: "text-indigo-500", href: "/blog", image: "/blog/tiktok_hacks.png" },
              { title: "The Ultimate Guide to YouTube Shorts Algorithm", cat: "YouTube Growth", color: "text-red-500", href: "/blog", image: "/blog/youtube_shorts.png" }
            ].map((blog, i) => (
              <Link key={i} href={`/${locale}${blog.href}`} className="flex flex-col bg-white dark:bg-black rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-neutral-100 dark:border-neutral-800 group">
                <div className="h-48 bg-neutral-200 dark:bg-neutral-800 w-full relative overflow-hidden">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                        <Type className="w-24 h-24 text-neutral-900 dark:text-white" />
                      </div>
                    </>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className={`text-xs font-black uppercase tracking-widest mb-3 ${blog.color}`}>{blog.cat}</span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-snug mb-6 group-hover:text-fuchsia-600 transition-colors">{blog.title}</h3>
                  <div className="mt-auto inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-xs">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-linear-to-r from-sky-500 to-indigo-600 text-white px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl sm:text-6xl font-bold uppercase tracking-tight mb-8 drop-shadow-lg leading-tight">
            Start Downloading Now
          </h2>
          <p className="text-xl font-medium mb-12 opacity-90">
            Join millions of users utilizing the best free online video downloader and AI growth suite on the internet.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-5 bg-white text-indigo-600 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform inline-block shadow-lg">
            Paste Link Here
          </button>
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
