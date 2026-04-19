"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/utils/cn"
import { Skeleton } from "@/components/ui/Skeleton"
import { Download, Copy, Check, RefreshCcw, Clock, Heart, MessageCircle, Music, Loader2, Share2, Send } from "lucide-react"
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
    timestamp?: string
    comments?: Array<{ username: string; text: string; mention?: string }>
  } | null
  isLoading?: boolean
  buttonStyle?: string
  audioButtonStyle?: string
  accentText?: string
  accentBg?: string
  accentBorder?: string
}

export function DownloadPreview({
  data,
  isLoading,
  audioButtonStyle = "bg-linear-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400",
  accentText = "text-[#f01783]",
}: DownloadPreviewProps) {
  const [isDownloading, setIsDownloading] = React.useState<string | null>(null);
  const [isSharing, setIsSharing] = React.useState(false);
  const [showFullCaption, setShowFullCaption] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (data && !isLoading) {
      const handleTransition = () => {
        const element = document.getElementById("download-preview");
        if (element) {
          // Scrolling past the header (+100px) to show more of the bottom actions
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition + 100;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      };

      // 300ms delay for a smooth entry (SnapInsta Style)
      const timer = setTimeout(handleTransition, 300);
      return () => clearTimeout(timer);
    }
  }, [data, isLoading]);

  const displayCaption = data?.caption || DEFAULT_CAPTION;
  const displayLikes = data?.likes || 15420;
  const displayCommentCount = data?.commentCount || 842;
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
      className="w-full scroll-mt-24 sm:scroll-mt-32"
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
            className="mx-auto mt-20 w-full max-w-5xl rounded-3xl bg-white/10 p-0 shadow-3xl backdrop-blur-3xl md:p-12 border border-white/20 overflow-hidden relative min-h-[70vh] flex flex-col justify-center"
          >
            {/* Background Glow for Direct View */}
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

            <div className="mx-auto flex w-full flex-col gap-10 p-4 md:p-0">
              <div className="relative group mx-auto w-full max-w-2xl">
                {data.medias?.some((m: Media) => m.type === "video") ? (
                  <video
                    src={`/api/proxy-download?url=${encodeURIComponent(data.medias.find((m: Media) => m.type === "video")?.url || "")}&type=video&inline=true`}
                    controls
                    autoPlay
                    playsInline
                    className="h-auto max-h-[85vh] w-full rounded-2xl md:rounded-3xl object-contain shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-[1.01]"
                    poster={data.thumbnail ? `/api/proxy-download?url=${encodeURIComponent(data.thumbnail)}&type=image&inline=true` : undefined}
                  >
                    Your browser does not support the video tag.
                  </video>
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

              <div className="flex flex-col gap-6">
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

                <button
                  onClick={() => window.location.reload()}
                  className="flex w-full items-center justify-center rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 shadow-lg transition-all hover:bg-white/10 hover:text-white border border-white/10 bg-white/5 active:scale-95"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Get Another Link
                </button>
              </div>
            </div>

            <div className="mx-auto mt-16 flex w-full flex-col gap-6">
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
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Captured</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white/60" />
                    <span className="text-sm font-black uppercase tracking-tighter">{displayTimestamp}</span>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8 flex flex-col gap-6">
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
