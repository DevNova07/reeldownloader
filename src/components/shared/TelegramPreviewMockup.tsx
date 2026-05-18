"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play, Download, Zap, Shield, Heart, MessageCircle, Send, ImageIcon, Film, Hash, Lock, CheckCircle2, User, FileText, Music, BarChart3, Edit3 } from "lucide-react"

interface TelegramPreviewMockupProps {
  type?: 'video' | 'photo' | 'media' | 'audio' | 'file' | 'story' | 'dp' | 'private' | 'gif' | 'channels' | 'analytics' | 'converter' | 'compressor' | 'bio' | 'safe'
}

export function TelegramPreviewMockup({ type = 'video' }: TelegramPreviewMockupProps) {
  const getIcon = () => {
    switch (type) {
      case 'video': return <Play className="w-12 h-12 text-white" />
      case 'photo': return <ImageIcon className="w-12 h-12 text-white" />
      case 'media': return <ImageIcon className="w-12 h-12 text-white" />
      case 'audio': return <Music className="w-12 h-12 text-white" />
      case 'file': return <FileText className="w-12 h-12 text-white" />
      case 'story': return <Heart className="w-12 h-12 text-white" />
      case 'dp': return <User className="w-12 h-12 text-white" />
      case 'private': return <Lock className="w-12 h-12 text-white" />
      case 'gif': return <Film className="w-12 h-12 text-white" />
      case 'channels': return <Hash className="w-12 h-12 text-white" />
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
      case 'video': return "TG Video DL"
      case 'photo': return "Photo Saver"
      case 'media': return "Media Fetch"
      case 'audio': return "Audio Rip"
      case 'file': return "File Save"
      case 'story': return "Story Saver"
      case 'dp': return "Profile Pic"
      case 'private': return "Private Save"
      case 'gif': return "GIF Saver"
      case 'channels': return "TG Channels"
      case 'analytics': return "TG Analytics"
      case 'converter': return "To MP4"
      case 'compressor': return "Compress"
      case 'bio': return "Bio Gen"
      case 'safe': return "Safe DL"
      default: return "TG Download"
    }
  }

  return (
    <div className="relative w-full aspect-[9/16] max-h-[600px] md:aspect-video rounded-3xl overflow-hidden bg-sky-900 shadow-2xl border border-sky-800">
      {/* Dynamic Background Pattern - Telegram Sky Blue Theme */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-sky-500/30 via-transparent to-transparent" />
      </div>

      {/* Interface Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl mb-6">
            {getIcon()}
          </div>
          <div className="px-6 py-2 rounded-full bg-sky-500 text-white font-black uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(14,165,233,0.4)] border border-white/20">
            {getLabel()}
          </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute right-4 bottom-1/4 flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-sky-800/80 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <MessageCircle className="w-5 h-5 text-sky-100" />
            </div>
            <span className="text-[10px] font-bold text-sky-100/60">8K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-sky-800/80 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Send className="w-5 h-5 text-sky-100" />
            </div>
            <span className="text-[10px] font-bold text-sky-100/60">15K</span>
          </div>
      </div>

      {/* Main CTA */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-700" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">TG Channel <CheckCircle2 className="w-3 h-3 inline text-sky-300"/></span>
                    <span className="text-[10px] text-sky-300/60">@tgchannel</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="px-6 py-3 rounded-full bg-white text-sky-600 flex items-center justify-center shadow-lg hover:bg-sky-50 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            <span className="text-sm font-black uppercase tracking-wider">Save</span>
          </div>
        </div>
      </div>

      {/* Glass Corner Tag */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-sky-800/80 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-1.5">
          <Send className="w-3 h-3 text-sky-300" /> Premium
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <div className="px-4 py-1.5 rounded-full bg-sky-800/80 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em]">
          SavClip
        </div>
      </div>
    </div>
  )
}
