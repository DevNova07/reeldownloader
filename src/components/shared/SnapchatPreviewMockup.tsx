"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play, Download, Zap, Shield, Heart, MessageCircle, Share2, Ghost, Camera, Music, Image as ImageIcon, EyeOff, User, MapPin, Sparkles, History, Film } from "lucide-react"

interface SnapchatPreviewMockupProps {
  type?: 'video' | 'spotlight' | 'story' | 'photo' | 'audio' | 'dp' | 'map' | 'lens' | 'private' | 'anonymous' | 'compressor' | 'converter' | 'profile' | 'memories' | 'safe'
}

export function SnapchatPreviewMockup({ type = 'video' }: SnapchatPreviewMockupProps) {
  const getIcon = () => {
    switch (type) {
      case 'video': return <Ghost className="w-12 h-12 text-black" />
      case 'spotlight': return <Play className="w-12 h-12 text-black" />
      case 'story': return <Camera className="w-12 h-12 text-black" />
      case 'photo': return <ImageIcon className="w-12 h-12 text-black" />
      case 'audio': return <Music className="w-12 h-12 text-black" />
      case 'dp': return <User className="w-12 h-12 text-black" />
      case 'map': return <MapPin className="w-12 h-12 text-black" />
      case 'lens': return <Sparkles className="w-12 h-12 text-black" />
      case 'private': return <Shield className="w-12 h-12 text-black" />
      case 'anonymous': return <EyeOff className="w-12 h-12 text-black" />
      case 'compressor': return <Zap className="w-12 h-12 text-black" />
      case 'converter': return <Film className="w-12 h-12 text-black" />
      case 'profile': return <User className="w-12 h-12 text-black" />
      case 'memories': return <History className="w-12 h-12 text-black" />
      case 'safe': return <Shield className="w-12 h-12 text-black" />
      default: return <Ghost className="w-12 h-12 text-black" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'video': return "Snap Video"
      case 'spotlight': return "Spotlight HD"
      case 'story': return "Story Saver"
      case 'photo': return "HQ Snap"
      case 'audio': return "Snap Audio"
      case 'dp': return "Profile Pic"
      case 'map': return "Map Snaps"
      case 'lens': return "Lens Saver"
      case 'private': return "Private Snap"
      case 'anonymous': return "Secret View"
      case 'compressor': return "Compress"
      case 'converter': return "Convert MP4"
      case 'profile': return "Profile Data"
      case 'memories': return "Memory Saver"
      case 'safe': return "Secure Save"
      default: return "HD Video"
    }
  }

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-linear-to-tr from-yellow-400 via-yellow-300 to-amber-200 shadow-2xl group flex items-center justify-center p-4 sm:p-8">
      {/* Moving Ambient Glows */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-yellow-400/40 blur-3xl animate-pulse" />
      </div>

      {/* Main Glass Player Container */}
      <div className="relative z-10 w-full h-full rounded-2xl border border-white/30 bg-white/20 dark:bg-black/30 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between shadow-2xl">
        {/* Top Header */}
        <div className="flex justify-between items-center w-full">
          {/* Creator Profile Mock */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-black/20 bg-black/10 flex items-center justify-center text-[10px] font-black text-black shadow-inner">
              SC
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-black text-black leading-none">@savclip_snap</span>
              <span className="text-[9px] font-semibold text-black/70">Snapchat Saver</span>
            </div>
          </div>
          {/* Pro Pill */}
          <div className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-[0.15em] flex items-center gap-1 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            SavClip <span className="text-yellow-400">Pro</span>
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
            <div className="absolute inset-0 rounded-full bg-white/40 blur-md group-hover/btn:scale-125 transition-transform duration-300" />
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/30 backdrop-blur-xs border border-white/40 flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300">
              {getIcon()}
            </div>
          </motion.div>
          {/* Badge */}
          <span className="mt-3 px-4 py-1.5 rounded-full bg-black text-yellow-400 font-extrabold uppercase italic tracking-wider text-[10px] sm:text-xs shadow-lg">
            {getLabel()}
          </span>
        </div>

        {/* Bottom Bar: Simulated Downloading Status */}
        <div className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Download Icon */}
            <div className="w-9 h-9 rounded-lg bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
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
                <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full w-full" />
              </div>
            </div>
          </div>
          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-white/80 border-t border-white/5 pt-2 sm:pt-0 sm:border-0 w-full sm:w-auto justify-around sm:justify-end shrink-0">
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="text-[10px] font-bold">5M</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-bold">250k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
