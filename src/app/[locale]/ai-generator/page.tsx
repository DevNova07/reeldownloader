"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight, Copy, Check, RefreshCcw, MoveLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import { dictionaries } from "@/dictionaries/client"
import { type Locale } from "@/i18n"
import { toast } from "react-hot-toast"
import Link from "next/link"

export default function AIGenerator() {
  const pathname = usePathname()
  const [step, setStep] = React.useState(1)
  const [topic, setTopic] = React.useState("")
  const [platform, setPlatform] = React.useState("Instagram")
  const [mood, setMood] = React.useState("Funny")
  const [result, setResult] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [copyStatus, setCopyStatus] = React.useState(false)

  const locale = (pathname.split('/')[1] || 'en') as Locale
    const dict = (dictionaries as Record<string, typeof dictionaries.en>)[locale] || dictionaries.en

  const handleGenerate = () => {
    if (!topic.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setResult(`🔥 Custom ${mood} caption for ${platform}: \n\n"Success is not final, failure is not fatal: it is the courage to continue that counts." #${topic.replace(/\s+/g, '')} #viral #trending`)
      setIsGenerating(false)
      setStep(3)
      toast.success("AI Caption Generated!")
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopyStatus(true)
    toast.success("Copied!")
    setTimeout(() => setCopyStatus(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] px-4 py-20 dark:bg-black">
      <div className="mx-auto max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-12 flex items-center justify-between gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-pink-600 shadow-lg shadow-pink-500/20" : "bg-neutral-200 dark:bg-neutral-800"}`}
            />
          ))}
        </div>

        <section className="rounded-[40px] bg-white p-10 shadow-2xl dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                   <h1 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase italic dark:text-white">
                     What&apos;s the <span className="text-pink-600">Vibe?</span>
                   </h1>
                   <p className="text-lg font-bold text-neutral-500 tracking-tight opacity-70">
                     Tell us what your post is about in a few words.
                   </p>
                </div>
                <textarea 
                  placeholder="e.g. My weekend trip to the mountains..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-40 w-full rounded-3xl border-none bg-neutral-100 p-8 text-lg font-bold tracking-tight outline-none ring-2 ring-transparent transition-all focus:bg-white focus:ring-pink-600/20 dark:bg-neutral-800 dark:focus:bg-neutral-800"
                />
                <button
                  onClick={() => topic.trim() && setStep(2)}
                  disabled={!topic.trim()}
                  className="group inline-flex h-16 items-center gap-4 rounded-2xl bg-black px-10 text-xs font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-black disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Select Platform</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {["Instagram", "TikTok", "YouTube", "Facebook"].map((p) => (
                      <button 
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`rounded-2xl border-2 px-6 py-4 text-xs font-black uppercase tracking-widest transition-all ${platform === p ? "border-pink-600 bg-pink-600 text-white shadow-lg shadow-pink-500/20" : "border-neutral-100 bg-neutral-100 text-neutral-500 hover:border-pink-200 dark:border-neutral-800 dark:bg-neutral-800"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Choose Mood</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Funny", "Motivational", "Sassy", "Deep", "Minimalist"].map((m) => (
                      <button 
                        key={m}
                        onClick={() => setMood(m)}
                        className={`rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${mood === m ? "bg-neutral-900 text-white shadow-xl dark:bg-white dark:text-black" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800"}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(1)} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900 transition-all hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white">
                    <MoveLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="group inline-flex h-16 flex-1 items-center justify-center gap-4 rounded-2xl bg-linear-to-tr from-rose-500 to-pink-600 px-12 text-xs font-black uppercase tracking-widest text-white shadow-2xl shadow-rose-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    {isGenerating ? "Processing..." : "Create Magic"}
                    <Sparkles className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="space-y-4 text-center">
                  <h2 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase italic dark:text-white">
                    Your <span className="text-pink-600">Masterpiece</span>
                  </h2>
                  <p className="text-lg font-bold text-neutral-500 tracking-tight opacity-70">
                    Hand-crafted by Snap AI for maximum engagement.
                  </p>
                </div>

                <div className="relative rounded-3xl bg-neutral-950 p-10 text-xl font-bold leading-relaxed tracking-tight text-white shadow-2xl">
                   <div className="absolute top-6 right-6">
                     <Sparkles className="h-6 w-6 text-pink-500 opacity-50" />
                   </div>
                   <p className="whitespace-pre-wrap">{result}</p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={handleCopy}
                    className="flex h-16 flex-1 items-center justify-center gap-3 rounded-2xl bg-pink-600 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-pink-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    {copyStatus ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copyStatus ? "Copied Forever" : "Copy to Clipboard"}
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-neutral-100 px-10 text-xs font-black uppercase tracking-widest text-neutral-900 transition-all hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  )
}
