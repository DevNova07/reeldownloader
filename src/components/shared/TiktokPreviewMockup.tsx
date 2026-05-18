"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play, Download, Zap, Shield, Heart, MessageCircle, Share2, Music, Camera, EyeOff, User, Image as ImageIcon, Film, Hash, Lock, CheckCircle2 } from "lucide-react"

interface TiktokPreviewMockupProps {
  type?: 'video' | 'no-watermark' | 'shorts' | 'mp3' | 'story' | 'photo' | 'dp' | 'anonymous' | 'private' | 'hashtag' | 'caption' | 'converter' | 'compressor' | 'song' | 'safe'
}

export function TiktokPreviewMockup({ type = 'video' }: TiktokPreviewMockupProps) {
  const getIcon = () => {
    switch (type) {
      case 'video': return <Play className="w-12 h-12 text-white" />
      case 'no-watermark': return <CheckCircle2 className="w-12 h-12 text-white" />
      case 'shorts': return <Film className="w-12 h-12 text-white" />
      case 'mp3': return <Music className="w-12 h-12 text-white" />
      case 'story': return <Camera className="w-12 h-12 text-white" />
      case 'photo': return <ImageIcon className="w-12 h-12 text-white" />
      case 'dp': return <User className="w-12 h-12 text-white" />
      case 'anonymous': return <EyeOff className="w-12 h-12 text-white" />
      case 'private': return <Lock className="w-12 h-12 text-white" />
      case 'hashtag': return <Hash className="w-12 h-12 text-white" />
      case 'caption': return <MessageCircle className="w-12 h-12 text-white" />
      case 'converter': return <Zap className="w-12 h-12 text-white" />
      case 'compressor': return <Download className="w-12 h-12 text-white" />
      case 'song': return <Music className="w-12 h-12 text-white" />
      case 'safe': return <Shield className="w-12 h-12 text-white" />
      default: return <Play className="w-12 h-12 text-white" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'video': return "HD Video"
      case 'no-watermark': return "No Watermark"
      case 'shorts': return "Shorts Save"
      case 'mp3': return "MP3 Audio"
      case 'story': return "Story Saver"
      case 'photo': return "Slide Save"
      case 'dp': return "Profile Pic"
      case 'anonymous': return "Secret View"
      case 'private': return "Private Save"
      case 'hashtag': return "Hashtag AI"
      case 'caption': return "Caption Gen"
      case 'converter': return "To MP4"
      case 'compressor': return "Compress"
      case 'song': return "Find Song"
      case 'safe': return "Safe DL"
      default: return "TT Download"
    }
  }

  return (
    <div className="relative w-full aspect-[9/16] max-h-[600px] md:aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl">
      {/* Dynamic Background Pattern - TikTok Style Cyan/Pink */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_30%,_var(--tw-gradient-stops))] from-cyan-500/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_70%_70%,_var(--tw-gradient-stops))] from-pink-500/50 via-transparent to-transparent" />
      </div>

      {/* Interface Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl mb-6 overflow-hidden">
             {/* TikTok Glitch Effect Simulation */}
             <div className="absolute inset-0 bg-cyan-500/20 translate-x-[2px] mix-blend-screen" />
             <div className="absolute inset-0 bg-pink-500/20 -translate-x-[2px] mix-blend-screen" />
            {getIcon()}
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-black font-black uppercase italic tracking-widest text-sm shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            {getLabel()}
          </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute right-4 bottom-1/4 flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-tighter shadow-sm">1.2M</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-tighter shadow-sm">45K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-tighter shadow-sm">Share</span>
          </div>
      </div>

      {/* Main CTA */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-white animate-spin-slow" />
                <span className="text-xs font-bold text-white truncate max-w-[150px]">Original Sound - Creator</span>
            </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="px-6 py-3 rounded-xl bg-pink-600 text-white flex items-center justify-center shadow-2xl border border-pink-400/50 hover:bg-pink-500 transition-colors">
            <Download className="w-6 h-6 mr-2 animate-bounce" />
            <span className="text-sm font-black uppercase tracking-widest">Save</span>
          </div>
        </div>
      </div>

      {/* Glass Corner Tag */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] italic flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <div className="px-4 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] italic shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          SavClip <span className="text-cyan-400">TT</span>
        </div>
      </div>
    </div>
  )
}
