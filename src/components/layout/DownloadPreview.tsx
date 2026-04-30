"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/utils/cn"
import { Skeleton } from "@/components/ui/Skeleton"
import { Download, Copy, Check, RefreshCcw, Clock, Heart, MessageCircle, Music, Loader2, Share2, Send, Instagram, Facebook, Youtube, Twitter, X, Ghost } from "lucide-react"
import { requestNotificationPermission, sendDownloadCompleteNotification } from "@/utils/notifications"
import { toast } from "react-hot-toast"
import { DownloadProgress } from "@/components/ui/DownloadProgress"
import { downloadFile } from "@/utils/client-download"
import confetti from 'canvas-confetti'




const MOCK_COMMENTS = [
  { username: "@alex_smith_22", text: "Truly incredible content! 🔥", mention: "" },
  { username: "@travel_vlogger", text: "This place looks like a dream 😍", mention: "" },
  { username: "@tech_enthusiast", text: "Innovation at its best! 🚀", mention: "" },
  { username: "@daily_viral", text: "Who else is watching this in 2026? 😂", mention: "" },
  { username: "@nature_lover", text: "The quality is absolutely stunning!", mention: "" },
  { username: "@creative_soul", text: "", mention: "@best_moments_daily" },
];

const DEFAULT_CAPTION = "Experience the most amazing moments from around the world. Our platform lets you save and share these incredible highlights in high-definition (HD) quality with just one click. Don't miss out on the latest trends and viral stories! 🌟";

interface Comment {
  username: string;
  text: string;
  mention?: string;
}

interface Media {
  id: string
  url: string
  quality: string
  type: string
  extension: string
}

interface DownloadPreviewProps {
  data: {
    id?: string
    url?: string
    title?: string
    thumbnail: string
    medias: Media[]
    caption?: string
    likes?: number
    commentCount?: number
    shareCount?: number
    author?: string
    authorId?: string
    timestamp?: string
    comments?: Array<{ username: string; text: string; mention?: string }>
    type?: "single" | "list"
    items?: Array<{ id: string; title: string; thumbnail: string; url: string }>
  } | null
  isLoading?: boolean
  onSearch?: (url: string) => void
  buttonStyle?: string
  audioButtonStyle?: string
  accentText?: string
  accentBg?: string
  accentBorder?: string
  autoTriggerDownload?: boolean
  searchCounter?: number
}

const DEEP_LINKS: Record<string, string> = {
  instagram: "instagram://",
  facebook: "fb://",
  twitter: "twitter://",
  youtube: "vnd.youtube://",
  snapchat: "snapchat://",
  telegram: "tg://",
  tiktok: "snssdk1128://"
};

const getPlatformInfo = (url?: string, id?: string) => {
  const fallback = { id: "app", name: "App", icon: RefreshCcw, color: "bg-white/10", link: "#" };
  const lowerUrl = url?.toLowerCase() || "";
  const lowerId = id?.toLowerCase() || "";
  
  if (lowerUrl.includes("instagram.com") || lowerId.startsWith("ig-")) return { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-linear-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045]", link: "https://www.instagram.com" };
  if (lowerUrl.includes("facebook.com") || lowerUrl.includes("fb.watch") || lowerId.startsWith("fb-")) return { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-[#1877F2]", link: "https://www.facebook.com" };
  if (lowerUrl.includes("tiktok.com") || lowerId.startsWith("tt-") || lowerId.startsWith("tiktok-")) return { id: "tiktok", name: "TikTok", icon: Music, color: "bg-black", link: "https://www.tiktok.com" };
  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be") || lowerId.startsWith("yt-")) return { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-[#FF0000]", link: "https://www.youtube.com" };
  if (lowerUrl.includes("snapchat.com") || lowerId.startsWith("sc-") || lowerId.startsWith("snap-")) return { id: "snapchat", name: "Snapchat", icon: Ghost, color: "bg-[#FFFC00] !text-black", link: "https://www.snapchat.com" };
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com") || lowerId.startsWith("tw-") || lowerId.startsWith("x-")) return { id: "twitter", name: "X / Twitter", icon: Twitter, color: "bg-black", link: "https://x.com" };
  
  return fallback;
};

export function DownloadPreview({
  data,
  isLoading,
  onSearch,
  audioButtonStyle = "bg-linear-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400",
  accentText = "text-[#f01783]",
  autoTriggerDownload = false,
  searchCounter = 0
}: DownloadPreviewProps) {
  const [isDownloading, setIsDownloading] = React.useState<string | null>(null);
  const [isSharing, setIsSharing] = React.useState(false);
  const [showFullCaption, setShowFullCaption] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [downloadStatus, setDownloadStatus] = React.useState("Ready");

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const displayCaption = data?.caption || DEFAULT_CAPTION;
  const displayLikes = data?.likes || 15420;
  const displayCommentCount = data?.commentCount || 842;
  const displayShareCount = data?.shareCount || 125;
  const displayAuthor = data?.author || "Creator";
  const displayTimestamp = data?.timestamp || "Today";
  const displayComments = (data && data.comments && data.comments.length > 0) ? data.comments : MOCK_COMMENTS;

  const handleDownload = async (url: string, type: string, id: string | number) => {
    const downloadId = `${type}-${id}`;
    setIsDownloading(downloadId);
    setDownloadProgress(0);
    setDownloadStatus("Connecting to stream...");

    const filename = `SavClip_${type}_${id}.mp4`;
    
    try {
      await downloadFile(url, filename, (progress, status) => {
        setDownloadProgress(progress);
        setDownloadStatus(status);
      });
      
      sendDownloadCompleteNotification(data?.title || "Content");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      console.error("Download error:", error);
      toast.error(error?.message || "Download failed. Please try again.");
    } finally {
      setIsDownloading(null);
      setDownloadProgress(0);
      setDownloadStatus("Ready");
    }
  };

  // Auto-trigger download for PWA Share Target
  React.useEffect(() => {
    if (data && !isLoading && autoTriggerDownload && !isDownloading) {
      const visualMedias = data.medias?.filter((m: Media) => m.type !== "audio") || [];
      const videos = visualMedias.filter((m: Media) => m.type === "video");
      const targetMedia = videos.length > 0 ? videos[0] : visualMedias[0];

      if (targetMedia) {
        const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(targetMedia.url)}&type=${targetMedia.type}`;
        handleDownload(proxyUrl, targetMedia.type, targetMedia.id || 0);
        toast.success("Starting direct download...", { 
          icon: '📥',
          style: { borderRadius: '16px', background: '#111', color: '#fff' }
        });
      }
    }
  }, [data, isLoading, autoTriggerDownload]);

  // Auto-scroll to preview when data arrives
  React.useEffect(() => {
    if (data && !isLoading && scrollRef.current) {
      setTimeout(() => {
        const element = scrollRef.current;
        if (element) {
          const yOffset = -200; // Much further down (Scroll stops 200px before the element)
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 200);
    }
  }, [data, isLoading]);

  // Confetti effect on success
  React.useEffect(() => {
    if (showSuccess) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 150 }; // Above modal

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        
        // Launch from left
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, 
          colors: ['#2563eb', '#c026d3', '#db2777', '#06b6d4'] 
        });
        
        // Launch from right
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, 
          colors: ['#2563eb', '#c026d3', '#db2777', '#06b6d4'] 
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showSuccess]);

  const handleDownloadAll = async () => {
    if (!data?.items || data.items.length === 0) return;
    
    setIsDownloading("all");
    setDownloadProgress(0);
    setDownloadStatus("Preparing ZIP package...");

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const folder = zip.folder("SavClip_Batch");

      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        const progress = ((i / data.items.length) * 100);
        setDownloadProgress(progress);
        setDownloadStatus(`Fetching item ${i + 1}/${data.items.length}...`);

        try {
          // We need to fetch the actual video URL first since items only have post URLs
          const res = await fetch(`/api/download?url=${encodeURIComponent(item.url)}`);
          const downloadData = await res.json();
          const videoUrl = downloadData.medias[0].url;
          
          const fileRes = await fetch(`/api/proxy-download?url=${encodeURIComponent(videoUrl)}&type=video`);
          const blob = await fileRes.blob();
          folder?.file(`video_${i + 1}.mp4`, blob);
        } catch (e) {
          console.error(`Failed to fetch item ${i}:`, e);
        }
      }

      setDownloadStatus("Generating ZIP file...");
      const content = await zip.generateAsync({ type: "blob" }, (metadata) => {
        setDownloadProgress(metadata.percent);
      });

      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SavClip_Batch_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadStatus("Batch Success!");
      toast.success("Batch download complete! 🚀");
    } catch (error) {
      console.error("Batch download failed:", error);
      toast.error("Batch download failed. Try individual items.");
    } finally {
      setIsDownloading(null);
    }
  };

  const handleNativeShare = async (url: string, title: string) => {
    if (typeof navigator === 'undefined' || !navigator.share) {
      // Fallback for desktop: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${title}\n${window.location.origin}`);
        toast.success("Link copied to clipboard! Share with friends. 🚀");
      } catch (e) {
        toast.error("Sharing is not supported on this browser.");
      }
      return;
    }

    setIsSharing(true);
    try {
      // Instant sharing: Share the website link and title
      // This is fast because it doesn't wait for a file download
      await navigator.share({
        title: title,
        text: `Check out this ${data?.title || 'video'} on SavClip! 🚀`,
        url: window.location.origin
      });
      toast.success("Thanks for sharing! 🌟");
    } catch (error) {
       if ((error as Error).name !== 'AbortError') {
         console.error("Share failed:", error);
         toast.error("Sharing failed.");
       }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div
      id="download-preview"
      ref={scrollRef}
      className="w-full scroll-mt-20 sm:scroll-mt-24"
      suppressHydrationWarning
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-10 w-full max-w-5xl rounded-[2.5rem] p-4 md:p-12 bg-white/10 backdrop-blur-3xl border border-white/20 overflow-hidden relative"
          >
            <div className="mx-auto flex w-full flex-col gap-10">
              {/* Media Skeleton */}
              <div className="mx-auto w-full max-w-2xl">
                <Skeleton className="aspect-square w-full rounded-2xl md:rounded-3xl bg-white/10" />
              </div>
              
              {/* Action Buttons Skeleton */}
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[72px] w-full rounded-2xl bg-white/10" />
                <Skeleton className="h-[64px] w-full rounded-2xl bg-white/10" />
                <Skeleton className="h-[64px] w-full rounded-2xl bg-white/10" />
              </div>

              {/* Stats Skeleton */}
              <div className="rounded-3xl bg-white/10 p-8 flex justify-between">
                <div className="flex gap-10">
                  <div className="space-y-2"><Skeleton className="h-3 w-16 bg-white/5" /><Skeleton className="h-6 w-24 bg-white/10" /></div>
                  <div className="space-y-2"><Skeleton className="h-3 w-16 bg-white/5" /><Skeleton className="h-6 w-24 bg-white/10" /></div>
                </div>
                <div className="space-y-2 flex flex-col items-end"><Skeleton className="h-3 w-16 bg-white/5" /><Skeleton className="h-5 w-32 bg-white/10" /></div>
              </div>
            </div>
          </motion.div>
        ) : data ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className={cn(
              "mx-auto mt-10 w-full max-w-7xl rounded-[2.5rem] p-4 md:p-8 border border-white/20 relative min-h-[50vh]",
              data.type === "list" ? "bg-black/40 backdrop-blur-3xl" : "bg-white/10 backdrop-blur-3xl max-w-5xl md:p-12"
            )}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

            {data.type === "list" ? (
              <div className="relative z-10 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                      {data.title || "Channel Feed"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <p className="text-white/50 font-bold uppercase tracking-widest text-xs">
                        {data.items?.length || 0} Videos found in this channel
                      </p>
                      <div className="h-1 w-1 rounded-full bg-white/20" />
                      <button 
                        onClick={handleDownloadAll}
                        disabled={!!isDownloading}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          isDownloading === "all" ? "bg-pink-600 text-white" : "bg-white/10 text-white hover:bg-white/20"
                        )}
                      >
                        {isDownloading === "all" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                        {isDownloading === "all" ? "Packaging ZIP..." : "Download All as ZIP"}
                      </button>
                    </div>
                    {isDownloading === "all" && (
                      <div className="mt-6 max-w-sm">
                        <DownloadProgress progress={downloadProgress} status={downloadStatus} accentColor="bg-pink-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl ring-1 ring-white/10">
                    <Clock className="h-3.5 w-3.5" />
                    Latest Content First
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.items?.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => onSearch?.(item.url)}
                      className="group cursor-pointer bg-white/5 rounded-3xl border border-white/10 overflow-hidden transition-all hover:scale-[1.03] hover:bg-white/10 hover:shadow-2xl active:scale-95 ring-1 ring-transparent hover:ring-white/20"
                    >
                      <div className="relative aspect-video">
                        <Image 
                          src={item.thumbnail} 
                          alt={item.title} 
                          fill 
                          className="object-cover transition-transform group-hover:scale-110"
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl ring-1 ring-white/40">
                            <Download className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-[14px] font-black text-white/90 line-clamp-2 leading-tight uppercase italic group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full flex-col gap-6 p-4 md:p-0 relative z-10">
                <div className="relative group mx-auto w-full max-w-2xl" style={{ perspective: '1200px' }}>
                  {/* Vibrant Aura Glow (Hover) */}
                  <div className="absolute inset-0 bg-linear-to-tr from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-[100px] opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-110 pointer-events-none" />
                  
                  <div 
                    className="relative transform-gpu transition-all duration-700 ease-out group-hover:rotate-x-4 group-hover:scale-[1.03] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden bg-black/20 ring-1 ring-white/20"
                    style={{ 
                      WebkitBoxReflect: 'below 8px linear-gradient(transparent, transparent 60%, rgba(255, 255, 255, 0.35))',
                    }}
                  >
                    {data.medias?.some((m: Media) => m.type === "video") ? (
                      (() => {
                        const videoMedia = data.medias.find((m: Media) => m.type === "video");
                        const videoSrc = `/api/proxy-download?url=${encodeURIComponent(videoMedia?.url || "")}&type=video&inline=true`;

                        return (
                          <video
                            src={videoSrc}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            crossOrigin="anonymous"
                            preload="metadata"
                            className="h-auto max-h-[85vh] w-full object-contain"
                            poster={data.thumbnail ? `/api/proxy-download?url=${encodeURIComponent(data.thumbnail)}&type=image&inline=true` : undefined}
                          >
                            Your browser does not support the video tag.
                          </video>
                        );
                      })()
                    ) : (
                        <Image
                          src={data.thumbnail ? `/api/proxy-download?url=${encodeURIComponent(data.thumbnail)}&type=image&inline=true` : "/window.svg"}
                          alt="Preview"
                          width={400}
                          height={600}
                          priority
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="h-auto max-h-[85vh] w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const platform = getPlatformInfo(data.url, data.id).id;
                            target.src = platform === 'instagram' ? '/instagram.svg' : 
                                         platform === 'facebook' ? '/facebook.svg' : 
                                         platform === 'youtube' ? '/youtube.svg' : 
                                         '/window.svg';
                          }}
                        />
                    )}
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md ring-1 ring-white/20 z-20">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    4K / HD
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="space-y-4">
                    {(() => {
                      const visualMedias = data.medias?.filter((m: Media) => m.type !== "audio") || [];
                      const videos = visualMedias.filter((m: Media) => m.type === "video");
                      // If there are videos, we ignore the images. Then we only take the first one (most relevant).
                      const finalMedias = (videos.length > 0 ? videos : visualMedias);

                      const media = finalMedias[0];
                      if (!media) return null;

                      const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(media.url)}&type=${media.type}`;
                      const currentId = media.id || 0;
                      const isThisDownloading = isDownloading === `video-${currentId}`;

                      return (
                        <div key={currentId} className="flex gap-4">
                          <button
                            onClick={() => handleDownload(proxyUrl, 'video', currentId)}
                            disabled={!!isDownloading}
                            className="group relative flex flex-1 items-center justify-center gap-4 rounded-2xl bg-white py-3 sm:py-5 text-lg sm:text-xl font-black text-blue-600 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-70 disabled:scale-100"
                          >
                            <div className="absolute inset-0 bg-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {isThisDownloading ? (
                              <Loader2 className="h-7 w-7 text-blue-600 animate-spin" />
                            ) : (
                              <Download className="h-7 w-7 text-blue-600 stroke-[2.5]" />
                            )}
                            <span className="relative z-10">{isThisDownloading ? "Processing..." : "Download"}</span>
                            {/* Glossy overlay */}
                            <div className="absolute inset-0 bg-linear-to-tr from-white/30 via-transparent to-transparent pointer-events-none opacity-40" />
                          </button>
                        </div>
                      );
                    })()}
                  </div>

                  {(() => {
                    const videoMedia = data.medias?.find((m: Media) => m.type === "video");
                    const audioTargetUrl = videoMedia?.url || data.medias?.[0]?.url || data.items?.[0]?.url || "";
                    const audioUrl = `/api/proxy-download?url=${encodeURIComponent(audioTargetUrl)}&type=audio`;
                    const isAudioDownloading = isDownloading === 'audio-main';
                    
                    return (
                      <button
                        onClick={() => handleDownload(audioUrl, 'audio', 'main')}
                        disabled={!!isDownloading}
                        className={cn("group relative flex w-full items-center justify-center gap-3 rounded-2xl py-3 sm:py-5 text-lg sm:text-xl font-black text-white shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-70 disabled:scale-100", audioButtonStyle)}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {isAudioDownloading ? (
                          <Loader2 className="h-7 w-7 animate-spin" />
                        ) : (
                          <Music className="h-7 w-7" />
                        )}
                        <span className="relative z-10">{isAudioDownloading ? "Extracting..." : "Save MP3 Audio"}</span>
                      </button>
                    );
                  })()}

                  {isDownloading && (

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <DownloadProgress 
                        progress={downloadProgress} 
                        status={downloadStatus} 
                        accentColor="bg-blue-600"
                      />
                    </motion.div>
                  )}

                  {/* Native Share Button */}
                  <button
                    onClick={() => {
                      const videoMedia = data.medias?.find((m: Media) => m.type === "video");
                      const shareTargetUrl = videoMedia?.url || data.medias?.[0]?.url || data.items?.[0]?.url || "";
                      const shareUrl = `/api/proxy-download?url=${encodeURIComponent(shareTargetUrl)}&type=${videoMedia?.type || 'video'}`;
                      handleNativeShare(shareUrl, data.title || "Shared Content");
                    }}
                    disabled={isSharing}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-2xl py-3 sm:py-5 text-lg sm:text-xl font-black text-white shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden bg-linear-to-r from-emerald-600 to-teal-500 disabled:opacity-70"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isSharing ? (
                      <Loader2 className="h-7 w-7 animate-spin" />
                    ) : (
                      <Share2 className="h-7 w-7" />
                    )}
                    <span className="relative z-10">{isSharing ? "Preparing Video..." : "Share to Friends"}</span>
                  </button>


                  <div className="flex flex-nowrap justify-start sm:justify-center gap-4 sm:gap-6 mt-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
                    {[
                      { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-linear-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045]", link: "https://www.instagram.com", deep: "instagram://" },
                      { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-[#1877F2]", link: "https://www.facebook.com", deep: "fb://" },
                      { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-[#FF0000]", link: "https://www.youtube.com", deep: "vnd.youtube://" },
                      { id: "tiktok", name: "TikTok", icon: Music, color: "bg-black", link: "https://www.tiktok.com", deep: "snssdk1128://" },
                      { id: "snapchat", name: "Snapchat", icon: Ghost, color: "bg-[#FFFC00] text-black", link: "https://www.snapchat.com", deep: "snapchat://" }
                    ].map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <a
                          key={platform.id}
                          href={platform.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col items-center gap-2 transition-all hover:scale-110 active:scale-95 shrink-0 cursor-pointer"
                        >
                          <div className={cn(
                            "flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-2xl shadow-xl transition-all border border-white/20 backdrop-blur-xl",
                            platform.color
                          )}>
                            <Icon className={cn("h-5 w-5 sm:h-8 sm:w-8", platform.id === 'snapchat' ? 'text-black' : 'text-white')} />
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter text-white/60">{platform.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="mx-auto mt-1 flex w-full flex-col gap-4">
                  {/* Caption Card */}
                  <div className="rounded-3xl bg-white/10 backdrop-blur-md p-5 sm:p-8 text-[14px] sm:text-[16px] font-medium leading-relaxed text-white border border-white/10 shadow-2xl">
                    <p className={cn(!showFullCaption && "line-clamp-4")}>{displayCaption}</p>
                    {displayCaption.length > 200 && (
                      <button
                        onClick={() => setShowFullCaption(!showFullCaption)}
                        className={cn("mt-6 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all hover:opacity-80 flex items-center gap-2", accentText)}
                      >
                        <div className={cn("h-px w-8 bg-current opacity-30")} />
                        {showFullCaption ? "Show minimalist view" : "Read full description"}
                      </button>
                    )}
                  </div>

                  {/* Stats Card */}
                  <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
                    <div className="flex flex-col gap-4">
                      {/* Stats Row */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                          <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                            <div className="flex flex-col">
                              <span className="text-[14px] font-black text-white tabular-nums">{displayLikes.toLocaleString()}</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/40">Likes</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-sky-400 fill-sky-400" />
                            <div className="flex flex-col">
                              <span className="text-[14px] font-black text-white tabular-nums">{displayCommentCount.toLocaleString()}</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/40">Comments</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5 text-emerald-400 fill-emerald-400" />
                            <div className="flex flex-col">
                              <span className="text-[14px] font-black text-white tabular-nums">{displayShareCount.toLocaleString()}</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/40">Shares</span>
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Live Stats</span>
                        </div>
                      </div>

                      {/* Creator Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-[8px] font-black text-white uppercase">{displayAuthor.slice(0, 1)}</span>
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-tight text-white/80">{displayAuthor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                          <Clock className="h-3 w-3" />
                          <span className="text-[9px] font-bold uppercase tracking-tighter">{displayTimestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-white/60">Community Feedback</h4>
                      </div>
                      <div className="h-px flex-1 mx-6 bg-white/5" />
                    </div>
                    <div className="flex flex-col gap-4">
                      {displayComments.map((c: Comment, i: number) => {
                        const initials = c.username.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase() || 'US';
                        const colors = ['bg-rose-500', 'bg-sky-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500'];
                        const avatarColor = colors[i % colors.length];

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 rounded-2xl bg-white/5 backdrop-blur-sm p-4 transition-all hover:bg-white/10 cursor-default border border-white/5"
                          >
                            <div className={cn("h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-white font-black text-[10px] shadow-lg", avatarColor)}>
                              {initials}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-black text-white uppercase tracking-tight">{c.username}</span>
                                <span className="h-1 w-1 rounded-full bg-white/20" />
                                <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter">Verified</span>
                              </div>
                              {c.mention ? (
                                <span className={cn("text-[14px] font-black underline decoration-1 underline-offset-4", accentText)}>{c.mention}</span>
                              ) : (
                                <p className="text-[14px] font-medium text-white/90 leading-snug">{c.text}</p>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[3rem] bg-[#0a0a0a] p-8 shadow-[0_0_100px_-20px_rgba(34,197,94,0.3)] border border-white/10"
            >
              {/* Animated Background Glows */}
              <div className="absolute -top-24 -left-24 h-64 w-64 bg-green-500/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />

              <div className="absolute top-0 right-0 p-8">
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="rounded-full bg-white/5 p-2.5 text-white/40 transition-all hover:bg-white/10 hover:text-white border border-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative z-10 text-center">
                <div className="mx-auto mb-8 relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-600 text-white shadow-[0_0_40px_-5px_rgba(34,197,94,0.5)]"
                  >
                    <Check className="h-12 w-12 stroke-[3]" />
                  </motion.div>
                  {/* Outer ring */}
                  <div className="absolute inset-0 mx-auto h-24 w-24 rounded-full border-2 border-green-500/20 scale-125 animate-ping" />
                </div>

                <h3 className="mb-3 text-4xl font-black uppercase italic tracking-tighter bg-linear-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                  Download Success!
                </h3>
                <p className="mb-10 text-white/50 font-bold uppercase tracking-widest text-[10px]">
                  Your media is ready. Spread the love! 🚀
                </p>

                <div className="grid gap-6">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent("Hey! Check out SavClip - The fastest way to download Instagram, TikTok and Facebook videos for free! 🚀 \n\nTry it here: https://savclip.net")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-4 rounded-2xl bg-[#25D366] py-4 text-xl font-black text-white shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)] transition-all hover:scale-[1.02] active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <MessageCircle className="h-7 w-7 fill-white" />
                    Share on WhatsApp
                    <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent pointer-events-none opacity-40" />
                  </a>
                  <button 
                    onClick={() => {
                      setShowSuccess(false);
                      // Custom prompt logic here if needed
                    }}
                    className="w-full text-[10px] font-black uppercase tracking-[0.3em] text-white/20 transition-all hover:text-white/60"
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
