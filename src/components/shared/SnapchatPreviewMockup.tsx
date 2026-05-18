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
    <div className="relative w-full aspect-[9/16] max-h-[600px] md:aspect-video rounded-3xl overflow-hidden bg-linear-to-tr from-yellow-500 via-yellow-400 to-amber-300 shadow-2xl">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-yellow-200/40 via-transparent to-transparent" />
      </div>

      {/* Interface Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-2xl mb-6">
            {getIcon()}
          </div>
          <div className="px-6 py-2 rounded-full bg-black text-yellow-400 font-black uppercase italic tracking-widest text-sm shadow-xl">
            {getLabel()}
          </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-black/10">
              <Heart className="w-5 h-5 text-black" />
            </div>
            <span className="text-[10px] font-bold text-black/80 tracking-tighter">5M</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-black/10">
              <Share2 className="w-5 h-5 text-black" />
            </div>
            <span className="text-[10px] font-bold text-black/80 tracking-tighter">Share</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-2xl bg-black text-yellow-400 flex items-center justify-center shadow-2xl border border-white/20">
            <Download className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-[10px] font-black text-black uppercase tracking-widest">Save</span>
        </div>
      </div>

      {/* Glass Corner Tag */}
      <div className="absolute top-8 right-8">
        <div className="px-4 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] italic">
          SavClip <span className="text-yellow-400">SNAP</span>
        </div>
      </div>
    </div>
  )
}
