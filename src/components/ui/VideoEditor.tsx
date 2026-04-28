"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Scissors, Music, Download, Loader2, Play, Pause, Settings2 } from "lucide-react"
import { useFFmpeg } from "@/hooks/useFFmpeg"
import { fetchFile } from "@ffmpeg/util"
import { cn } from "@/utils/cn"
import { DownloadProgress } from "./DownloadProgress"

interface VideoEditorProps {
  videoUrl: string
  thumbnail: string
  isOpen: boolean
  onClose: () => void
  onComplete: (blob: Blob, type: "video" | "audio") => void
}

export function VideoEditor({ videoUrl, thumbnail, isOpen, onClose, onComplete }: VideoEditorProps) {
  const { ffmpeg, loaded, loading, load } = useFFmpeg()
  const [startTime, setStartTime] = React.useState(0)
  const [endTime, setEndTime] = React.useState(10)
  const [duration, setDuration] = React.useState(0)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [status, setStatus] = React.useState("Ready")
  const [format, setFormat] = React.useState<"mp4" | "mp3">("mp4")
  
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      load()
    }
  }, [isOpen])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const d = videoRef.current.duration
      setDuration(d)
      setEndTime(Math.min(d, 15)) // Default 15s trim
    }
  }

  const processMedia = async () => {
    setIsProcessing(true)
    setProgress(0)
    setStatus("Downloading source...")
    
    try {
      const inputName = "input.mp4"
      const outputName = format === "mp4" ? "output.mp4" : "output.mp3"
      
      // Load the file into ffmpeg
      await ffmpeg.writeFile(inputName, await fetchFile(videoUrl))
      
      setStatus("Processing media...")
      
      // Command for trimming and conversion
      const args = format === "mp4" 
        ? ["-ss", startTime.toString(), "-to", endTime.toString(), "-i", inputName, "-c", "copy", outputName]
        : ["-ss", startTime.toString(), "-to", endTime.toString(), "-i", inputName, "-vn", "-ab", "320k", "-ar", "44100", "-y", outputName]

      // Progress listener (approximate)
      const interval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 2 : prev))
      }, 200)

      await ffmpeg.exec(args)
      
      clearInterval(interval)
      setProgress(100)
      setStatus("Finishing...")

      const data = await ffmpeg.readFile(outputName)
      const blob = new Blob([data as any], { type: format === "mp4" ? "video/mp4" : "audio/mp3" })
      
      onComplete(blob, format === "mp4" ? "video" : "audio")
      setIsProcessing(false)
      onClose()
      
    } catch (error) {
      console.error("FFmpeg error:", error)
      setStatus("Error processing")
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-pink-500/10 text-pink-500">
              <Scissors className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase italic tracking-widest">Smart Editor</h3>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Trim & Convert • Client-Side</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white/40 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Preview Window */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
            <video
              ref={videoRef}
              src={videoUrl}
              onLoadedMetadata={handleLoadedMetadata}
              className="h-full w-full object-contain"
              muted
              playsInline
            />
            {!loading && !loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Start Time (sec)</label>
                <input 
                  type="number" 
                  value={startTime} 
                  onChange={(e) => setStartTime(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white font-bold"
                  max={endTime}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">End Time (sec)</label>
                <input 
                  type="number" 
                  value={endTime} 
                  onChange={(e) => setEndTime(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white font-bold"
                  max={duration}
                  min={startTime}
                />
              </div>
            </div>

            {/* Format Selection */}
            <div className="flex gap-4">
              <button
                onClick={() => setFormat("mp4")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                  format === "mp4" ? "bg-white text-black" : "bg-white/5 text-white/40 border border-white/10"
                )}
              >
                <Play className="h-4 w-4" /> MP4 Video
              </button>
              <button
                onClick={() => setFormat("mp3")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                  format === "mp3" ? "bg-pink-600 text-white" : "bg-white/5 text-white/40 border border-white/10"
                )}
              >
                <Music className="h-4 w-4" /> MP3 Audio (320k)
              </button>
            </div>

            {isProcessing ? (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <DownloadProgress progress={progress} status={status} accentColor="bg-pink-500" />
              </div>
            ) : (
              <button
                onClick={processMedia}
                disabled={!loaded || isProcessing}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg uppercase italic tracking-tighter flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                <Download className="h-6 w-6" />
                {loaded ? "Export & Download" : "Loading Engine..."}
              </button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-6 bg-white/5 flex items-center gap-3 border-t border-white/5">
          <Settings2 className="h-4 w-4 text-white/20" />
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            Processing happens entirely on your device. Zero server load.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
