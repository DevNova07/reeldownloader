"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Plus, Trash2, Smartphone, Monitor, CheckCircle2, Layout, Palette, Zap, Link as LinkIcon, Instagram, Twitter, Youtube, ExternalLink, Sparkles } from "lucide-react"
import { cn } from "@/utils/cn"

import { ToolSubNav } from "@/components/layout/ToolSubNav"

interface BioLink {
  id: string
  title: string
  url: string
}

type Theme = "glass" | "midnight" | "neon" | "sunset"

function BioBuilderContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialUsername = searchParams.get("username") || ""

  // State
  const [displayName, setDisplayName] = React.useState(initialUsername || "Your Name")
  const [bioText, setBioText] = React.useState("This is my stunning bio link page. ✨")
  const [links, setLinks] = React.useState<BioLink[]>([
    { id: "1", title: "My Latest Video", url: "https://youtube.com" },
    { id: "2", title: "Join My Newsletter", url: "#" }
  ])
  const [theme, setTheme] = React.useState<Theme>("glass")
  const [activeTab, setActiveTab] = React.useState<"links" | "design" | "settings">("links")
  const [isFinished, setIsFinished] = React.useState(false)

  // Handlers
  const addLink = () => {
    setLinks([...links, { id: Math.random().toString(36).substr(2, 9), title: "New Link", url: "" }])
  }

  const updateLink = (id: string, field: keyof BioLink, value: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  const removeLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id))
  }

  // Theme Styles Mapper
  const getThemeStyles = () => {
    switch (theme) {
      case "midnight":
        return {
          bg: "bg-neutral-950",
          card: "bg-neutral-900 border-white/5",
          btn: "bg-white text-black border-transparent",
          text: "text-white",
          sub: "text-neutral-400"
        }
      case "neon":
        return {
          bg: "bg-black",
          card: "bg-black border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]",
          btn: "bg-transparent text-purple-400 border-purple-500 hover:bg-purple-500/10",
          text: "text-white",
          sub: "text-purple-300"
        }
      case "sunset":
        return {
          bg: "bg-linear-to-br from-orange-500 to-rose-600",
          card: "bg-white/10 backdrop-blur-xl border-white/20",
          btn: "bg-white text-rose-600 border-transparent",
          text: "text-white",
          sub: "text-orange-100"
        }
      default: // glass
        return {
          bg: "bg-neutral-950",
          card: "bg-white/5 backdrop-blur-xl border-white/10",
          btn: "bg-white/10 text-white border-white/10 hover:bg-white/20",
          text: "text-white",
          sub: "text-neutral-400"
        }
    }
  }

  const s = getThemeStyles()

  if (isFinished) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
        >
            <div className="h-24 w-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-black italic mb-4">YOUR PAGE IS LIVE!</h1>
            <p className="text-neutral-400 mb-8 font-medium">Your stunning bio link has been created successfully. Share it with the world!</p>
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-8">
                <span className="font-bold text-blue-400">instasnap.me/{initialUsername || displayName.toLowerCase().replace(/\s/g, '')}</span>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                    <ExternalLink className="h-5 w-5" />
                </button>
            </div>

            <button 
                onClick={() => router.push(`/bio`)}
                className="w-full py-4 rounded-xl bg-white text-black font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform"
            >
                Back to Dashboard
            </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100svh-100px)] sm:h-[calc(100vh-64px)] bg-neutral-950 text-white overflow-hidden">
      <ToolSubNav />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Navigation (Desktop only) */}
        <div className="hidden sm:flex w-20 border-r border-white/5 flex-col items-center py-8 gap-8 bg-neutral-900/50">
            <div className="h-10 w-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                <Zap className="h-6 w-6 fill-white" />
            </div>
            <div className="flex flex-col gap-4 mt-8">
                {[
                  { id: "links" as const, icon: <LinkIcon className="h-5 w-5" /> },
                  { id: "design" as const, icon: <Palette className="h-5 w-5" /> },
                  { id: "settings" as const, icon: <Layout className="h-5 w-5" /> }
                ].map(tab => (
                  <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                          "p-3 rounded-xl transition-all",
                          activeTab === tab.id ? "bg-white text-black" : "text-neutral-500 hover:text-white hover:bg-white/5"
                      )}
                  >
                      {tab.icon}
                  </button>
                ))}
            </div>
        </div>

        <div className="fixed bottom-0 inset-x-0 h-20 bg-neutral-900/80 backdrop-blur-2xl border-t border-white/5 z-50 flex items-center justify-around sm:hidden px-6 pb-2">
            {[
              { id: "links" as const, icon: <LinkIcon className="h-5 w-5" />, label: "Links" },
              { id: "design" as const, icon: <Palette className="h-5 w-5" />, label: "Design" },
              { id: "settings" as const, icon: <Layout className="h-5 w-5" />, label: "Setup" }
            ].map(tab => (
              <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex flex-col items-center gap-1.5 transition-all active:scale-90"
              >
                  <div className={cn(
                      "p-2.5 rounded-2xl transition-all relative z-10",
                      activeTab === tab.id ? "text-black" : "text-neutral-500"
                  )}>
                      <div className="relative z-20">{tab.icon}</div>
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="activeTabMobile"
                          className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] z-0"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                  </div>
                  <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", activeTab === tab.id ? "text-white" : "text-neutral-500")}>
                      {tab.label}
                  </span>
              </button>
            ))}
        </div>

      {/* Center Panel - Editor */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-8 py-8 sm:py-12 pb-24 sm:pb-12">
        <div className="max-w-2xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase">Build Your Bio</h1>
              <p className="text-sm sm:text-base text-neutral-500 font-medium">Customize your link-in-bio page in real-time.</p>
            </div>
            <button 
                onClick={() => setIsFinished(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 text-white font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-purple-600/20 flex items-center justify-center gap-2"
            >
                Publish <Sparkles className="h-4 w-4" />
            </button>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === "links" && (
              <motion.div 
                key="links"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Profile Info */}
                <div className="p-8 rounded-3xl bg-neutral-900 border border-white/5 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500">Profile Details</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400">Display Name</label>
                            <input 
                                type="text" 
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400">Bio</label>
                            <textarea 
                                value={bioText}
                                onChange={(e) => setBioText(e.target.value)}
                                className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 font-bold resize-none h-24"
                            />
                        </div>
                    </div>
                </div>

                {/* Links Management */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500">Your Links</h3>
                        <button 
                            onClick={addLink}
                            className="text-xs font-black uppercase tracking-widest text-purple-500 flex items-center gap-1 hover:underline"
                        >
                            <Plus className="h-4 w-4" /> Add Link
                        </button>
                    </div>

                    <div className="space-y-3">
                        {links.map((link) => (
                            <div key={link.id} className="p-4 rounded-2xl bg-neutral-900 border border-white/5 flex gap-4 group">
                                <div className="h-12 w-12 rounded-xl bg-neutral-950 flex items-center justify-center border border-white/5 shrink-0 cursor-grab active:cursor-grabbing">
                                    <Layout className="h-5 w-5 text-neutral-600" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input 
                                        type="text" 
                                        placeholder="Title"
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, "title", e.target.value)}
                                        className="bg-transparent border-b border-white/5 py-1 focus:outline-none focus:border-purple-500/50 font-bold text-sm"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                        className="bg-transparent border-b border-white/5 py-1 focus:outline-none focus:border-purple-500/50 text-xs text-neutral-500"
                                    />
                                </div>
                                <button 
                                    onClick={() => removeLink(link.id)}
                                    className="p-3 text-neutral-600 hover:text-rose-500 transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
              </motion.div>
            )}

            {activeTab === "design" && (
              <motion.div 
                key="design"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                  <div className="p-8 rounded-3xl bg-neutral-900 border border-white/5">
                      <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-6">Choose Theme</h3>
                      <div className="grid grid-cols-2 gap-4">
                          {[
                              { id: "glass" as const, name: "Glassmorphism", colors: "bg-white/20" },
                              { id: "midnight" as const, name: "Midnight Sky", colors: "bg-neutral-950" },
                              { id: "neon" as const, name: "Cyber Neon", colors: "bg-purple-900" },
                              { id: "sunset" as const, name: "Crimson Sunset", colors: "bg-orange-500" }
                          ].map(t => (
                              <button 
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={cn(
                                    "p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all",
                                    theme === t.id ? "border-purple-500 bg-purple-500/10" : "border-white/5 bg-neutral-950 hover:bg-white/5"
                                )}
                              >
                                  <div className={cn("h-12 w-full rounded-lg", t.colors)} />
                                  <span className="text-xs font-black uppercase">{t.name}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="hidden lg:flex w-[460px] border-l border-white/5 bg-neutral-900/30 items-center justify-center relative">
          <div className="absolute top-8 flex gap-2 p-1 rounded-xl bg-white/5 border border-white/10 z-20">
              <button className="px-3 py-1.5 rounded-lg bg-white text-black text-[10px] font-black uppercase">Mobile</button>
              <button className="px-3 py-1.5 rounded-lg text-neutral-500 text-[10px] font-black uppercase hover:text-white">Desktop</button>
          </div>

          <div className="relative aspect-9/16 h-[720px] w-[340px] shadow-2xl">
              {/* iPhone Frame */}
              <div className="absolute inset-0 border-10 border-neutral-800 rounded-[3.5rem] bg-neutral-900 overflow-hidden shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30">
                      <div className="w-24 h-4 bg-neutral-800 rounded-b-2xl" />
                  </div>

                  {/* Content Preview */}
                  <div className={cn("h-full w-full flex flex-col p-6 items-center gap-6 pt-16 transition-colors duration-500 overflow-y-auto scrollbar-hide", s.bg)}>
                      {/* Avatar */}
                      <div className="flex flex-col items-center gap-4 text-center">
                          <div className={cn("h-24 w-24 rounded-full p-1", s.card)}>
                              <div className="h-full w-full rounded-full bg-black flex items-center justify-center p-1 relative overflow-hidden">
                                  <Image 
                                    src={`https://ui-avatars.com/api/?name=${displayName}&background=random`} 
                                    alt="Creator Preview" 
                                    fill 
                                    className="object-cover rounded-full"
                                  />
                              </div>
                          </div>
                          <div>
                              <h2 className={cn("text-2xl font-black italic tracking-tighter", s.text)}>{displayName}</h2>
                              <p className={cn("text-[11px] font-bold tracking-[0.2em] uppercase opacity-60 mt-1", s.text)}>@{initialUsername || "yourname"}</p>
                          </div>
                          <p className={cn("text-xs font-medium leading-relaxed max-w-[200px]", s.sub)}>
                              {bioText}
                          </p>
                      </div>

                      {/* Social Icons row */}
                      <div className="flex gap-4 py-2 opacity-60">
                          {[Instagram, Twitter, Youtube].map((Icon, i) => (
                              <Icon key={i} className={cn("h-5 w-5", s.text)} />
                          ))}
                      </div>

                      {/* Links container */}
                      <div className="w-full flex flex-col gap-3">
                          {links.map((link) => (
                              <div 
                                  key={link.id} 
                                  className={cn("w-full py-3.5 px-6 rounded-2xl border transition-all text-center", s.card)}
                              >
                                  <span className={cn("text-xs font-black uppercase tracking-wider", s.text)}>{link.title || "Untitled Link"}</span>
                              </div>
                          ))}
                      </div>

                      <div className="mt-auto pb-6">
                        <span className={cn("text-[8px] font-black uppercase tracking-[0.2em] opacity-30", s.text)}>⚡ CREATED WITH INSTASNAP</span>
                      </div>
                  </div>
              </div>

              {/* Reflections/Glare */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none rounded-[3.5rem] z-20" />
          </div>
      </div>
      </div>
    </div>
  )
}

function BioBuilderPageInner() {
  return (
    <React.Suspense fallback={<div className="h-screen bg-neutral-950 flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>}>
      <BioBuilderContent />
    </React.Suspense>
  )
}


export default function BioBuilderPage() {
  return (
    <React.Suspense fallback={null}>
      <BioBuilderPageInner  />
    </React.Suspense>
  )
}
