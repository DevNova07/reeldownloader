"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Camera, Download, Play, Shield, Zap, Sparkles, Heart, MessageCircle, Send, Bookmark, Music, Layers } from "lucide-react"

interface InstagramPreviewMockupProps {
  type?: 'video' | 'reels' | 'story' | 'photo' | 'audio' | 'profile' | 'carousel' | 'private'
}

export function InstagramPreviewMockup({ type = 'video' }: InstagramPreviewMockupProps) {
  const getIcon = () => {
    switch (type) {
      case 'reels': return <Play className="w-12 h-12 text-white" />
      case 'story': return <Camera className="w-12 h-12 text-white" />
      case 'photo': return <Camera className="w-12 h-12 text-white" />
      case 'audio': return <Music className="w-12 h-12 text-white" />
      case 'carousel': return <Layers className="w-12 h-12 text-white" />
      case 'profile': return <Sparkles className="w-12 h-12 text-white" />
      case 'private': return <Shield className="w-12 h-12 text-white" />
      default: return <Play className="w-12 h-12 text-white" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'reels': return "Reels HD"
      case 'story': return "Story Anonymous"
      case 'photo': return "High Res Photo"
      case 'audio': return "320kbps MP3"
      case 'carousel': return "All Slides"
      case 'profile': return "Full Profile"
      case 'private': return "Private Content"
      default: return "4K Video"
    }
  }

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-linear-to-tr from-pink-600 via-purple-600 to-orange-500 shadow-2xl">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-orange-400/40 via-transparent to-transparent" />
      </div>

      {/* Interface Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
            {getIcon()}
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-pink-600 font-black uppercase italic tracking-widest text-sm shadow-xl">
            {getLabel()}
          </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">12.5k</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">842</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Send className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">Send</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-2xl bg-white text-pink-600 flex items-center justify-center shadow-2xl border border-white/50">
            <Download className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Download</span>
        </div>
      </div>

      {/* Glass Corner Tag */}
      <div className="absolute top-8 right-8">
        <div className="px-4 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] italic">
          SavClip <span className="text-orange-400">Pro</span>
        </div>
      </div>
    </div>
  )
}
