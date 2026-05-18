"use client";

import React, { Suspense } from "react";
import { SearchBar } from "@/components/layout/SearchBar";
import { Camera, Film, Image as ImageIcon, Music, Lock, PlaySquare, Eye, UserCircle, Layers, Globe, Download, Video, Hash, Type, Link2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlatformTabs } from "@/components/shared/PlatformTabs";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { isSmartInput } from "@/utils/platform-detector";
import { useAutoDownload } from "@/hooks/useAutoDownload";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import { LoadingBar } from "@/components/ui/LoadingBar";

const DownloadPreview = dynamic(
  () => import("@/components/layout/DownloadPreview").then((mod) => mod.DownloadPreview),
  { ssr: false }
);

function getPlatformTabs(title: string, pathname: string) {
  const t = title.toLowerCase();
  const p = pathname.toLowerCase();
  
  if (t.includes('instagram') || p.includes('instagram') || p.includes('/ig-')) {
    return [
      { id: 'reels', label: 'Reels', icon: <PlaySquare className="w-4 h-4" />, href: '/instagram-reels-downloader' },
      { id: 'video', label: 'Videos', icon: <Film className="w-4 h-4" />, href: '/instagram-video-downloader' },
      { id: 'story', label: 'Stories', icon: <Camera className="w-4 h-4" />, href: '/instagram-story-downloader' },
      { id: 'photo', label: 'Photos', icon: <ImageIcon className="w-4 h-4" />, href: '/instagram-photo-downloader' },
      { id: 'audio', label: 'MP3', icon: <Music className="w-4 h-4" />, href: '/instagram-audio-downloader' },
      { id: 'carousel', label: 'Carousel', icon: <Layers className="w-4 h-4" />, href: '/instagram-carousel-downloader' },
      { id: 'dp', label: 'DP', icon: <UserCircle className="w-4 h-4" />, href: '/instagram-dp-downloader' },
    ];
  }
  if (t.includes('facebook') || t.includes('fb ') || p.includes('facebook') || p.includes('/fb-')) {
    return [
      { id: 'video', label: 'Videos', icon: <Film className="w-4 h-4" />, href: '/facebook-video-downloader' },
      { id: 'reels', label: 'Reels', icon: <PlaySquare className="w-4 h-4" />, href: '/facebook-reels-downloader' },
      { id: 'story', label: 'Stories', icon: <Camera className="w-4 h-4" />, href: '/facebook-story-saver' },
      { id: 'photo', label: 'Photos', icon: <ImageIcon className="w-4 h-4" />, href: '/facebook-photo-downloader' },
      { id: 'audio', label: 'MP3', icon: <Music className="w-4 h-4" />, href: '/facebook-audio-downloader' },
      { id: 'dp', label: 'DP', icon: <UserCircle className="w-4 h-4" />, href: '/facebook-dp-downloader' },
      { id: 'private', label: 'Private', icon: <Lock className="h-4 w-4" />, href: '/facebook-private-video-downloader' },
    ];
  }
  if (t.includes('tiktok') || p.includes('tiktok')) {
    return [
      { id: 'video', label: 'Videos', icon: <Film className="w-4 h-4" />, href: '/tiktok-video-downloader' },
      { id: 'nowatermark', label: 'No Watermark', icon: <Video className="w-4 h-4" />, href: '/tiktok-downloader-without-watermark' },
      { id: 'photo', label: 'Photos', icon: <ImageIcon className="w-4 h-4" />, href: '/tiktok-photo-downloader' },
      { id: 'audio', label: 'MP3', icon: <Music className="w-4 h-4" />, href: '/tiktok-mp3-downloader' },
      { id: 'dp', label: 'Profile Viewer', icon: <UserCircle className="w-4 h-4" />, href: '/tiktok-dp-downloader' },
    ];
  }
  if (t.includes('youtube') || t.includes('yt ') || p.includes('youtube') || p.includes('/yt-')) {
    return [
      { id: 'video', label: 'Videos', icon: <Film className="w-4 h-4" />, href: '/youtube-video-downloader' },
      { id: 'shorts', label: 'Shorts', icon: <PlaySquare className="w-4 h-4" />, href: '/youtube-shorts-downloader' },
      { id: 'thumbnail', label: 'Thumbnails', icon: <ImageIcon className="w-4 h-4" />, href: '/youtube-thumbnail-downloader' },
      { id: 'audio', label: 'MP3', icon: <Music className="w-4 h-4" />, href: '/youtube-to-mp3-converter' },
      { id: 'playlist', label: 'Playlists', icon: <Layers className="w-4 h-4" />, href: '/youtube-playlist-downloader' },
    ];
  }
  if (t.includes('snapchat') || p.includes('snapchat')) {
    return [
      { id: 'spotlight', label: 'Spotlight', icon: <PlaySquare className="w-4 h-4" />, href: '/snapchat-spotlight-downloader' },
      { id: 'story', label: 'Stories', icon: <Camera className="w-4 h-4" />, href: '/snapchat-stories-downloader' },
      { id: 'video', label: 'Videos', icon: <Film className="w-4 h-4" />, href: '/snapchat-video-downloader' },
      { id: 'photo', label: 'Photos', icon: <ImageIcon className="w-4 h-4" />, href: '/snapchat-photo-downloader' },
      { id: 'audio', label: 'MP3', icon: <Music className="w-4 h-4" />, href: '/snapchat-audio-downloader' },
    ];
  }
  if (t.includes(' x ') || t.startsWith('x ') || t.includes('twitter') || t === 'x-video-downloader' || p.includes('/x-') || p.includes('twitter') || p.includes('download-x-')) {
    return [
      { id: 'video', label: 'Videos', icon: <Film className="w-4 h-4" />, href: '/x-video-downloader' },
      { id: 'gif', label: 'GIFs', icon: <PlaySquare className="w-4 h-4" />, href: '/x-gif-downloader' },
      { id: 'photo', label: 'Photos', icon: <ImageIcon className="w-4 h-4" />, href: '/x-profile-picture-downloader' },
      { id: 'media', label: 'Media', icon: <Layers className="w-4 h-4" />, href: '/x-media-downloader' },
      { id: 'audio', label: 'MP3', icon: <Music className="w-4 h-4" />, href: '/x-audio-downloader' },
    ];
  }
  if (t.includes('telegram') || p.includes('telegram') || p.includes('/tg-')) {
    return [
      { id: 'video', label: 'Videos', icon: <Film className="w-4 h-4" />, href: '/telegram-video-downloader' },
      { id: 'file', label: 'Files', icon: <Download className="w-4 h-4" />, href: '/telegram-file-downloader' },
      { id: 'photo', label: 'Photos', icon: <ImageIcon className="w-4 h-4" />, href: '/telegram-photo-downloader' },
      { id: 'media', label: 'Media', icon: <Layers className="w-4 h-4" />, href: '/telegram-restricted-content-downloader' },
      { id: 'audio', label: 'MP3', icon: <Music className="w-4 h-4" />, href: '/telegram-audio-downloader' },
    ];
  }
  if (t.includes('hashtags') || t.includes('caption') || t.includes('bio') || p.includes('hashtags') || p.includes('caption') || p.includes('bio')) {
    return [
      { id: 'hashtags', label: 'AI Hashtags', icon: <Hash className="w-4 h-4" />, href: '/hashtags' },
      { id: 'captions', label: 'Caption AI', icon: <Type className="w-4 h-4" />, href: '/captions' },
      { id: 'bio', label: 'Link-in-Bio', icon: <Link2 className="w-4 h-4" />, href: '/bio' },
    ];
  }
  return [];
}

interface SearchHeaderProps {
  title: string;
  subtitle: string;
  title1?: string;
  title2?: string;
  title3?: string;
  hideSearchBar?: boolean;
}

function SearchHeaderContent({
  title,
  subtitle,
  hideSearchBar = false
}: SearchHeaderProps) {
  const pathname = usePathname() || "";
  const tabs = getPlatformTabs(title, pathname);
  const locale = pathname.split('/')[1] || "en";

  const [downloadData, setDownloadData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchCounter, setSearchCounter] = React.useState(0);
  const [autoTriggerDownload, setAutoTriggerDownload] = React.useState(false);

  const searchParams = useSearchParams();
  const sharedUrl = searchParams.get('url') || "";
  const { addToHistory } = useDownloadHistory("search-header");

  const handleSearch = React.useCallback(async (url: string, isAutoTrigger = false) => {
    setSearchCounter((prev) => prev + 1);
    setAutoTriggerDownload(isAutoTrigger);

    setIsLoading(true);
    setDownloadData(null);

    try {
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
        addToHistory(url, { thumbnail: result.data.thumbnail, title: result.data.title });
      } else {
        throw new Error(result.error || "Failed to fetch content");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to process the link.");
    } finally {
      setIsLoading(false);
    }
  }, [addToHistory]);

  useAutoDownload(handleSearch, locale, "search-header");
  
  // Find active tab ID by checking the current pathname against hrefs
  let activeId = "";
  for (const tab of tabs) {
    if (pathname === `/${locale}${tab.href}` || (pathname === `/${locale}` && tab.href === '/')) {
      activeId = tab.id;
      break;
    }
  }

  // Limit tabs to maximum of 5, ensuring active tab is always visible
  let displayTabs = [...tabs];
  const activeIndex = displayTabs.findIndex(t => t.id === activeId);

  if (displayTabs.length > 5) {
    if (activeIndex !== -1 && activeIndex >= 4) {
      const activeTab = displayTabs[activeIndex];
      displayTabs = displayTabs.slice(0, 4);
      displayTabs.push(activeTab);
    } else {
      displayTabs = displayTabs.slice(0, 5);
    }
  }

  return (
    <section className="pt-10 pb-8 sm:pt-20 sm:pb-12 px-4 text-center bg-linear-to-r from-fuchsia-600 via-purple-600 to-sky-500 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-1/4 -left-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-sky-500/30 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Core Pages Tabs exactly like before */}
        {displayTabs.length > 0 && (
          <PlatformTabs 
            items={displayTabs} 
            activeId={activeId} 
            locale={locale} 
            activeColor="text-pink-600" 
            indicatorColor="bg-white"
          />
        )}

        <div className="w-full max-w-4xl md:max-w-3xl mx-auto px-4 md:px-0 flex flex-col items-center [container-type:inline-size]">
          <div className="w-full flex justify-center">
            <h1 
              className="font-bold text-white mb-3 drop-shadow-md text-center tracking-tight leading-none whitespace-nowrap inline-block text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm md:text-lg text-white/90 mb-5 sm:mb-8 font-medium drop-shadow-sm text-center w-full max-w-2xl px-4 leading-relaxed">
            {subtitle}
          </p>
        </div>
        {!hideSearchBar && (
          <div className="w-full max-w-3xl">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              validate={isSmartInput}
              initialValue={sharedUrl}
              buttonClass="bg-pink-600 text-white font-bold uppercase"
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
        )}

        {/* Loading Bar and Download Preview dynamic rendering */}
        {!hideSearchBar && (
          <div className="mt-4 flex flex-col items-center gap-8 w-full max-w-3xl">
            <LoadingBar isLoading={isLoading} label="Analyzing media..." gradient="from-indigo-500 via-purple-500 to-rose-500" />
            <DownloadPreview 
              data={downloadData} 
              isLoading={isLoading} 
              autoTriggerDownload={autoTriggerDownload} 
              searchCounter={searchCounter} 
              buttonStyle="bg-linear-to-br from-pink-600 via-rose-600 to-pink-700 text-white font-bold uppercase tracking-wider shadow-lg" 
              accentText="text-cyan-400" 
              accentBg="bg-cyan-500/10" 
              accentBorder="border-pink-600" 
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function SearchHeader(props: SearchHeaderProps) {
  return (
    <Suspense fallback={
      <section className="pt-10 pb-8 sm:pt-20 sm:pb-12 px-4 text-center bg-linear-to-r from-fuchsia-600 via-purple-600 to-sky-500 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h1 className="font-bold text-white mb-3 drop-shadow-md text-center tracking-tight leading-none whitespace-nowrap inline-block text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
              {props.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm md:text-lg text-white/90 mb-5 sm:mb-8 font-medium drop-shadow-sm text-center w-full max-w-2xl px-4 leading-relaxed">
            {props.subtitle}
          </p>
        </div>
      </section>
    }>
      <SearchHeaderContent {...props} />
    </Suspense>
  );
}
