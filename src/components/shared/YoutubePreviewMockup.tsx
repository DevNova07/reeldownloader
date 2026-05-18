"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play, Download, Zap, Shield, Heart, MessageCircle, Share2, Youtube, Music, Image as ImageIcon, CheckCircle2, Scissors, ListVideo, Tags, AlignLeft, Type } from "lucide-react"

interface YoutubePreviewMockupProps {
  type?: 'video' | 'shorts' | 'audio' | 'thumbnail' | 'playlist' | 'subtitle' | 'audit' | 'tag' | 'description' | 'title' | 'region' | 'cutter' | 'comment' | 'safe'
}

export function YoutubePreviewMockup({ type = 'video' }: YoutubePreviewMockupProps) {
  const getIcon = () => {
    switch (type) {
      case 'video': return <Youtube className="w-12 h-12 text-white" />
      case 'shorts': return <Play className="w-12 h-12 text-white" />
      case 'audio': return <Music className="w-12 h-12 text-white" />
      case 'thumbnail': return <ImageIcon className="w-12 h-12 text-white" />
      case 'playlist': return <ListVideo className="w-12 h-12 text-white" />
      case 'subtitle': return <AlignLeft className="w-12 h-12 text-white" />
      case 'audit': return <CheckCircle2 className="w-12 h-12 text-white" />
      case 'tag': return <Tags className="w-12 h-12 text-white" />
      case 'description': return <AlignLeft className="w-12 h-12 text-white" />
      case 'title': return <Type className="w-12 h-12 text-white" />
      case 'region': return <Shield className="w-12 h-12 text-white" />
      case 'cutter': return <Scissors className="w-12 h-12 text-white" />
      case 'comment': return <MessageCircle className="w-12 h-12 text-white" />
      case 'safe': return <Shield className="w-12 h-12 text-white" />
      default: return <Youtube className="w-12 h-12 text-white" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'video': return "4K Video"
      case 'shorts': return "YT Shorts HD"
      case 'audio': return "320kbps MP3"
      case 'thumbnail': return "HQ Thumbnail"
      case 'playlist': return "Full Playlist"
      case 'subtitle': return "CC Extractor"
      case 'audit': return "Channel Audit"
      case 'tag': return "SEO Tags"
      case 'description': return "Smart Desc"
      case 'title': return "Click Title"
      case 'region': return "Global Check"
      case 'cutter': return "Precise Cut"
      case 'comment': return "Comment Picker"
      case 'safe': return "Safe Save"
      default: return "HD Video"
    }
  }

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-linear-to-tr from-red-700 via-red-600 to-rose-500 shadow-2xl">
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
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl mb-6">
            {getIcon()}
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-red-700 font-black uppercase italic tracking-widest text-sm shadow-xl">
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
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">1.2M</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">15k</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">Share</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-2xl bg-white text-red-700 flex items-center justify-center shadow-2xl border border-white/50">
            <Download className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Download</span>
        </div>
      </div>

      {/* Glass Corner Tag */}
      <div className="absolute top-8 right-8">
        <div className="px-4 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] italic">
          SavClip <span className="text-red-300">YT</span>
        </div>
      </div>
    </div>
  )
}
