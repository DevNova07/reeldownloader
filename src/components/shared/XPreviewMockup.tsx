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
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl group flex items-center justify-center p-4 sm:p-8 border border-neutral-800">
      {/* Moving Ambient Glows */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-neutral-800/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-neutral-900/40 blur-3xl animate-pulse" />
      </div>

      {/* Main Glass Player Container */}
      <div className="relative z-10 w-full h-full rounded-2xl border border-white/10 bg-white/5 dark:bg-black/40 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between shadow-2xl">
        {/* Top Header */}
        <div className="flex justify-between items-center w-full">
          {/* Creator Profile Mock */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[10px] font-black text-white shadow-inner">
              X
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-black text-white leading-none">@savclip_x <CheckCircle2 className="w-3 h-3 inline text-blue-400 ml-0.5" /></span>
              <span className="text-[9px] font-medium text-white/70">X Saver</span>
            </div>
          </div>
          {/* Pro Pill */}
          <div className="px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-[0.15em] flex items-center gap-1 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            SavClip <span className="text-white">Pro</span>
          </div>
        </div>

        {/* Center Media Actions */}
        <div className="flex flex-col items-center justify-center my-auto py-1 sm:py-2">
          {/* Pulsing Play / Icon button */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative cursor-pointer group/btn"
          >
            <div className="absolute inset-0 rounded-full bg-white/5 blur-md group-hover/btn:scale-125 transition-transform duration-300" />
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300">
              {getIcon()}
            </div>
          </motion.div>
          {/* Badge */}
          <span className="mt-3 px-4 py-1.5 rounded-full bg-white text-black font-extrabold uppercase tracking-wider text-[10px] sm:text-xs shadow-lg">
            {getLabel()}
          </span>
        </div>

        {/* Bottom Bar: Simulated Downloading Status */}
        <div className="w-full bg-neutral-900/50 border border-white/5 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Download Icon */}
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Download className="w-4 h-4 animate-bounce" />
            </div>
            {/* File info / Progress */}
            <div className="flex flex-col text-left w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-white uppercase tracking-wider">Ready to Download</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[9px] font-bold text-white/80">HD MP4</span>
              </div>
              {/* Fake Progress Bar */}
              <div className="w-full sm:w-44 h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-full" />
              </div>
            </div>
          </div>
          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-white/80 border-t border-white/5 pt-2 sm:pt-0 sm:border-0 w-full sm:w-auto justify-around sm:justify-end shrink-0">
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="text-[10px] font-bold">45K</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-neutral-400 fill-neutral-800" />
              <span className="text-[10px] font-bold">12K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
