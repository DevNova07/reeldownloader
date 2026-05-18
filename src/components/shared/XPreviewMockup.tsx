"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play, Download, Zap, Shield, Heart, MessageCircle, Repeat2, Image as ImageIcon, Film, Hash, Lock, CheckCircle2, User, FileText, Music, BarChart3, Edit3 } from "lucide-react"

interface XPreviewMockupProps {
  type?: 'video' | 'gif' | 'media' | 'thread' | 'audio' | 'dp' | 'space' | 'private' | 'banner' | 'hashtag' | 'analytics' | 'converter' | 'compressor' | 'bio' | 'safe'
}

export function XPreviewMockup({ type = 'video' }: XPreviewMockupProps) {
  const getIcon = () => {
    switch (type) {
      case 'video': return <Play className="w-12 h-12 text-white" />
      case 'gif': return <Film className="w-12 h-12 text-white" />
      case 'media': return <ImageIcon className="w-12 h-12 text-white" />
      case 'thread': return <FileText className="w-12 h-12 text-white" />
      case 'audio': return <Music className="w-12 h-12 text-white" />
      case 'dp': return <User className="w-12 h-12 text-white" />
      case 'space': return <Music className="w-12 h-12 text-white" />
      case 'private': return <Lock className="w-12 h-12 text-white" />
      case 'banner': return <ImageIcon className="w-12 h-12 text-white" />
      case 'hashtag': return <Hash className="w-12 h-12 text-white" />
      case 'analytics': return <BarChart3 className="w-12 h-12 text-white" />
      case 'converter': return <Zap className="w-12 h-12 text-white" />
      case 'compressor': return <Download className="w-12 h-12 text-white" />
      case 'bio': return <Edit3 className="w-12 h-12 text-white" />
      case 'safe': return <Shield className="w-12 h-12 text-white" />
      default: return <Play className="w-12 h-12 text-white" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'video': return "X Video DL"
      case 'gif': return "GIF Saver"
      case 'media': return "Media Fetch"
      case 'thread': return "Thread Save"
      case 'audio': return "Audio Rip"
      case 'dp': return "Profile Pic"
      case 'space': return "Space DL"
      case 'private': return "Private Save"
      case 'banner': return "Banner Fetch"
      case 'hashtag': return "Trend Hash"
      case 'analytics': return "X Analytics"
      case 'converter': return "To MP4"
      case 'compressor': return "Compress"
      case 'bio': return "Bio Gen"
      case 'safe': return "Safe DL"
      default: return "X Download"
    }
  }

  return (
    <div className="relative w-full aspect-[9/16] max-h-[600px] md:aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-neutral-800">
      {/* Dynamic Background Pattern - X Minimalist Theme */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-600/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-neutral-500/30 via-transparent to-transparent" />
      </div>

      {/* Interface Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl mb-6">
            {getIcon()}
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {getLabel()}
          </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute right-4 bottom-1/4 flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center border border-white/5">
              <MessageCircle className="w-5 h-5 text-neutral-400" />
            </div>
            <span className="text-[10px] font-bold text-neutral-400">12K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center border border-white/5">
              <Repeat2 className="w-5 h-5 text-neutral-400" />
            </div>
            <span className="text-[10px] font-bold text-neutral-400">5K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center border border-white/5">
              <Heart className="w-5 h-5 text-neutral-400" />
            </div>
            <span className="text-[10px] font-bold text-neutral-400">45K</span>
          </div>
      </div>

      {/* Main CTA */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-800" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">X Creator <CheckCircle2 className="w-3 h-3 inline text-blue-400"/></span>
                    <span className="text-[10px] text-neutral-500">@xcreator</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="px-6 py-3 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-neutral-200 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            <span className="text-sm font-black uppercase tracking-wider">Save</span>
          </div>
        </div>
      </div>

      {/* Glass Corner Tag */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/5 text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3 fill-current text-white"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg> Premium
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <div className="px-4 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/5 text-[10px] font-black text-white uppercase tracking-[0.2em]">
          SavClip
        </div>
      </div>
    </div>
  )
}
