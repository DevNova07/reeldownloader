"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/utils/cn"
import { Skeleton } from "@/components/ui/Skeleton"
import { Download, Copy, Check, RefreshCcw, Clock, Heart, MessageCircle, Music, Loader2, Share2, Send, Instagram, Facebook, Youtube, Twitter, X, Ghost } from "lucide-react"
import { requestNotificationPermission, sendDownloadCompleteNotification } from "@/utils/notifications"
import { toast } from "react-hot-toast"

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

  const scrollRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    // Ultimate reliability scroll
    if (searchCounter > 0) {
      const performScroll = () => {
        const target = document.getElementById("download-preview");
        if (target) {
          const topOffset = 20; // 20px gap from top
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      };

      // Two attempts for maximum reliability (mobile often needs a slight extra delay)
      const t1 = setTimeout(performScroll, 100);
      const t2 = setTimeout(performScroll, 350);
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [searchCounter]);



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

    try {
      // 1. Request/Ensure notification permission
      await requestNotificationPermission();

      // 2. Trigger the browser download immediately 
      const link = document.createElement('a');
      link.href = url;
      link.download = `SavClip_${type}_${id}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Send the native notification (short delay to feel like "finished")
      setTimeout(() => {
        sendDownloadCompleteNotification();
        setIsDownloading(null);
      }, 1500);

    } catch (error) {
      console.error("Download handling failed:", error);
      setIsDownloading(null);
    }
  };

  const handleNativeShare = async (url: string, title: string) => {
    if (typeof navigator === 'undefined' || !navigator.share) {
      toast.error("Sharing is not supported on this browser.");
      return;
    }

    setIsSharing(true);
    try {
      // Fetch the file as a blob to enable file sharing
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], `${title.slice(0, 50)}.mp4`, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: title,
          text: "Check out this media I downloaded via SavClip! 🚀"
        });
      } else {
        // Fallback to text sharing if file sharing is not supported
        await navigator.share({
          title: title,
          text: "Check out this media I downloaded via SavClip! 🚀",
          url: window.location.origin
        });
      }
    } catch (error) {
       if ((error as Error).name !== 'AbortError') {
         console.error("Share failed:", error);
         toast.error("Sharing failed. Try manual download.");
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
            className="mx-auto mt-8 flex w-full max-w-[320px] flex-col gap-4"
          >
            <Skeleton className="h-[450px] w-full rounded-xl bg-white/20 shadow-md" />
            <Skeleton className="h-[50px] w-full rounded-lg bg-white/20" />
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
              "mx-auto mt-10 w-full max-w-7xl rounded-[2.5rem] p-4 md:p-8 border border-white/20 overflow-hidden relative min-h-[50vh]",
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
                    <p className="mt-2 text-white/50 font-bold uppercase tracking-widest text-xs">
                      {data.items?.length || 0} Videos found in this channel
                    </p>
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
              <div className="mx-auto flex w-full flex-col gap-10 p-4 md:p-0 relative z-10">
                <div className="relative group mx-auto w-full max-w-2xl">
                  {data.medias?.some((m: Media) => m.type === "video") ? (
                    (() => {
                      const videoMedia = data.medias.find((m: Media) => m.type === "video");
                      const isDirectSafe = videoMedia?.url.includes("tiktokcdn") || videoMedia?.url.includes("fbcdn");
                      
                      const videoSrc = isDirectSafe
                        ? videoMedia?.url 
                        : `/api/proxy-download?url=${encodeURIComponent(videoMedia?.url || "")}&type=video&inline=true`;

                      return (
                        <video
                          src={videoSrc}
                          controls
                          autoPlay
                          muted
                          loop
                          playsInline
                          crossOrigin="anonymous"
                          preload="auto"
                          className="h-auto max-h-[85vh] w-full rounded-2xl md:rounded-3xl object-contain shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-[1.01]"
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
                      priority // "Smooth/Fast": Load result preview immediately
                      unoptimized
                      className="h-auto max-h-[85vh] w-full rounded-2xl md:rounded-3xl object-contain shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-[1.01]"
                    />
                  )}

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
                      const finalMedias = (videos.length > 0 ? videos : visualMedias).slice(0, 1);

                      return finalMedias.map((media: Media, index: number) => {
                        const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(media.url)}&type=${media.type}`;
                        const currentId = media.id || index;
                        const isThisDownloading = isDownloading === `video-${currentId}`;

                        return (
                          <div key={currentId} className="flex gap-4">
                            <button
                              onClick={() => handleDownload(proxyUrl, 'video', currentId)}
                              disabled={!!isDownloading}
                              className="group relative flex flex-1 items-center justify-center gap-4 rounded-2xl bg-white py-5 text-2xl font-black text-blue-600 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-70 disabled:scale-100"
                            >
                              <div className="absolute inset-0 bg-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                              {isThisDownloading ? (
                                <Loader2 className="h-7 w-7 text-blue-600 animate-spin" />
                              ) : (
                                <Download className="h-7 w-7 text-blue-600 stroke-[2.5]" />
                              )}
                              <span className="relative z-10">{isThisDownloading ? "Processing..." : "Download Video"}</span>
                              {/* Glossy overlay */}
                              <div className="absolute inset-0 bg-linear-to-tr from-white/30 via-transparent to-transparent pointer-events-none opacity-40" />
                            </button>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {(() => {
                    const audioUrl = `/api/proxy-download?url=${encodeURIComponent(data.medias.find((m: Media) => m.type === "video")?.url || data.medias[0].url)}&type=audio`;
                    const isAudioDownloading = isDownloading === 'audio-main';
                    
                    return (
                      <button
                        onClick={() => handleDownload(audioUrl, 'audio', 'main')}
                        disabled={!!isDownloading}
                        className={cn("group relative flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-xl font-black text-white shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-70 disabled:scale-100", audioButtonStyle)}
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

                  {/* Native Share Button */}
                  <button
                    onClick={() => {
                      const videoMedia = data.medias.find((m: Media) => m.type === "video");
                      const shareUrl = `/api/proxy-download?url=${encodeURIComponent(videoMedia?.url || data.medias[0].url)}&type=${videoMedia?.type || 'video'}`;
                      handleNativeShare(shareUrl, data.title || "Shared Content");
                    }}
                    disabled={isSharing}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-xl font-black text-white shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden bg-linear-to-r from-emerald-600 to-teal-500 disabled:opacity-70"
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
                  <div className="rounded-5xl bg-white p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] text-[16px] font-bold leading-relaxed text-neutral-800 border-b-8 border-neutral-100/50">
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
                  <div className="flex items-center justify-between rounded-3xl bg-white/10 p-8 text-[15px] font-black text-white shadow-2xl backdrop-blur-xl border border-white/10">
                    <div className="flex items-center gap-10">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Engagement</span>
                        <div className="flex items-center gap-2.5">
                          <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
                          <span className="text-xl tabular-nums">{displayLikes.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Comments</span>
                        <div className="flex items-center gap-2.5">
                          <MessageCircle className="h-6 w-6 text-sky-400 fill-sky-400" />
                          <span className="text-xl tabular-nums">{displayCommentCount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Shares</span>
                        <div className="flex items-center gap-2.5">
                          <Send className="h-6 w-6 text-emerald-400 fill-emerald-400" />
                          <span className="text-xl tabular-nums">{displayShareCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-white/40">Creator</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black uppercase tracking-tighter text-white">{displayAuthor}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-white/60" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">{displayTimestamp}</span>
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
                            className="flex items-start gap-4 rounded-4xl bg-white shadow-xl p-6 transition-all hover:translate-x-1 cursor-default border border-transparent hover:border-neutral-100"
                          >
                            <div className={cn("h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-inner", avatarColor)}>
                              {initials}
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">{c.username}</span>
                              {c.mention ? (
                                <span className={cn("text-[16px] font-black underline decoration-2 underline-offset-4", accentText)}>{c.mention}</span>
                              ) : (
                                <p className="text-[16px] font-bold text-neutral-800 leading-snug">{c.text}</p>
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
    </div>
  );
}
