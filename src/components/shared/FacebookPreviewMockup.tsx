"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Camera, Download, Play, Shield, Zap, Sparkles, Heart, MessageCircle, Share2, Bookmark, Music, Layers, Video, Users } from "lucide-react"

interface FacebookPreviewMockupProps {
  type?: 'video' | 'reels' | 'story' | 'photo' | 'audio' | 'profile' | 'group' | 'private' | 'live'
}

export function FacebookPreviewMockup({ type = 'video' }: FacebookPreviewMockupProps) {
  const getIcon = () => {
    switch (type) {
      case 'reels': return <Play className="w-12 h-12 text-white" />
      case 'story': return <Camera className="w-12 h-12 text-white" />
      case 'photo': return <Camera className="w-12 h-12 text-white" />
      case 'audio': return <Music className="w-12 h-12 text-white" />
      case 'group': return <Users className="w-12 h-12 text-white" />
      case 'live': return <Video className="w-12 h-12 text-white" />
      case 'profile': return <Sparkles className="w-12 h-12 text-white" />
      case 'private': return <Shield className="w-12 h-12 text-white" />
      default: return <Play className="w-12 h-12 text-white" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'reels': return "FB Reels HD"
      case 'story': return "Story Saver"
      case 'photo': return "Full Res Photo"
      case 'audio': return "Facebook MP3"
      case 'group': return "Group Video"
      case 'live': return "Live Stream"
      case 'profile': return "Profile Data"
      case 'private': return "Private Video"
      default: return "HD Video"
    }
  }

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-linear-to-tr from-blue-700 via-blue-600 to-sky-500 shadow-2xl">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-blue-400/40 via-transparent to-transparent" />
      </div>

      {/* Interface Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl mb-6">
            {getIcon()}
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-blue-700 font-black uppercase italic tracking-widest text-sm shadow-xl">
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
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">45k</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">2.4k</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">Share</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-2xl bg-white text-blue-700 flex items-center justify-center shadow-2xl border border-white/50">
            <Download className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Download</span>
        </div>
      </div>

      {/* Glass Corner Tag */}
      <div className="absolute top-8 right-8">
        <div className="px-4 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] italic">
          SavClip <span className="text-blue-400">FB</span>
        </div>
      </div>
    </div>
  )
}
