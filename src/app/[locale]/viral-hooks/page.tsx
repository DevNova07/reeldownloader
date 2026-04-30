"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight, Copy, Check, RefreshCcw, MoveLeft, Zap, Magnet, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/dictionaries/client"
import { type Locale } from "@/i18n"
import { toast } from "react-hot-toast"

export default function ViralHookGenerator() {
  const pathname = usePathname()
  const [step, setStep] = React.useState(1)
  const [topic, setTopic] = React.useState("")
  const [style, setStyle] = React.useState("Controversial")
  const [result, setResult] = React.useState<string[]>([])
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [copyIndex, setCopyIndex] = React.useState<number | null>(null)

  const locale = (pathname.split('/')[1] || 'en') as Locale
  const dict = getDictionary(locale)

  const handleGenerate = () => {
    if (!topic.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      const templates = {
        Controversial: [
          `❌ Stop doing [Action] if you want to master ${topic}!`,
          `😱 The controversial truth about ${topic} nobody tells you.`,
          `🤫 I'm going to get in trouble for sharing this ${topic} secret...`
        ],
        Educational: [
          `💡 The simple ${topic} hack that saved me 10 hours a week.`,
          `📖 3 Lessons I learned from failing at ${topic} for a year.`,
          `🧠 How to actually understand ${topic} (explained for beginners).`
        ],
        Curiosity: [
          `⏳ What happens when you try ${topic} for 30 days?`,
          `👀 I found the ultimate ${topic} strategy and it's insane.`,
          `❓ Why does nobody talk about this specific ${topic} trick?`
        ],
        FOMO: [
          `🔥 You're missing out on ${topic} growth if you don't do this.`,
          `🚀 The 2026 guide to ${topic} is finally here. Don't be late.`,
          `💎 Only 1% of creators know this ${topic} hack. Ready?`
        ]
      }[style as keyof typeof templates] || [`🔥 How to win at ${topic} every single time.`]

      setResult(templates)
      setIsGenerating(false)
      setStep(2)
      toast.success("Hooks are Ready!")
    }, 2000)
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopyIndex(index)
    toast.success("Hook Copied!")
    setTimeout(() => setCopyIndex(null), 2000)
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] px-4 py-12 dark:bg-black text-neutral-900 dark:text-white sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-20 space-y-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-700 dark:bg-yellow-900/30"
          >
            <Magnet className="h-4 w-4" />
            Hook Finder
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8]">
            Viral <br className="sm:hidden" /> <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-600">Hooks</span>
          </h1>
          <p className="text-lg font-bold text-neutral-500 tracking-tight opacity-70 max-w-2xl mx-auto px-4">
            Generate scroll-stopping hooks that force engagement.
          </p>
        </div>

        <section className="rounded-[40px] bg-white p-6 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                   <h2 className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-2">
                     <Zap className="h-6 w-6 text-yellow-500" />
                     Niche?
                   </h2>
                   <input 
                    type="text"
                    placeholder="e.g. Fitness, Crypto, Cooking..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-20 w-full rounded-2xl border-none bg-neutral-100 px-6 text-xl font-bold tracking-tight outline-none ring-2 ring-transparent transition-all focus:bg-white focus:ring-yellow-500/20 dark:bg-neutral-800 dark:focus:bg-neutral-800"
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5" /> Style
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Controversial", "Educational", "Curiosity", "FOMO"].map((s) => (
                      <button 
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`rounded-2xl border-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${style === s ? "border-yellow-500 bg-yellow-500 text-white shadow-lg shadow-yellow-500/20" : "border-neutral-100 bg-neutral-100 text-neutral-500 hover:border-yellow-200 dark:border-neutral-800 dark:bg-neutral-800"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="group w-full h-16 items-center justify-center gap-4 rounded-2xl bg-black text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-black disabled:opacity-50 flex"
                >
                  {isGenerating ? "Analyzing..." : "Find Hooks"}
                  <Sparkles className={`h-5 w-5 ${isGenerating ? "animate-spin" : ""}`} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                   <h2 className="text-xl font-black uppercase italic tracking-tighter">
                     Results
                   </h2>
                   <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-yellow-500 transition-colors">
                     <RefreshCcw className="h-3 w-3" /> New
                   </button>
                </div>

                <div className="grid gap-3">
                  {result.map((hook, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative flex items-center justify-between gap-4 rounded-3xl bg-neutral-50 p-6 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800/50 hover:border-yellow-500/30 transition-all active:scale-[0.98]"
                    >
                      <p className="text-base font-bold tracking-tight pr-14 leading-tight">{hook}</p>
                      <button
                        onClick={() => handleCopy(hook, idx)}
                        className={`absolute right-4 h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${copyIndex === idx ? "bg-green-500 text-white" : "bg-white dark:bg-neutral-900 text-neutral-400 shadow-md"}`}
                      >
                        {copyIndex === idx ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SEO CONTENT SECTION */}
        <div className="mt-32 space-y-24">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
                How to Find <span className="text-yellow-500">Viral Hooks</span>
              </h2>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Master the First 3 Seconds</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[40px] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-xl">
                 <h3 className="text-xl font-black uppercase italic mb-4 dark:text-white underline decoration-yellow-500 decoration-4">The 3-Second Rule</h3>
                 <p className="text-sm font-bold text-neutral-500 leading-relaxed">
                   Social media platforms prioritize retention. If you don't grab attention in the first 3 seconds, your video won't go viral. Our AI analyze patterns to give you openers that work.
                 </p>
              </div>
              <div className="p-10 rounded-[40px] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-xl">
                 <h3 className="text-xl font-black uppercase italic mb-4 dark:text-white underline decoration-yellow-500 decoration-4">Style Matters</h3>
                 <p className="text-sm font-bold text-neutral-500 leading-relaxed">
                   Use Controversial hooks for debate, Educational hooks for trust, and Curiosity hooks for high completion rates. Switching styles keeps your audience engaged.
                 </p>
              </div>
            </div>
          </section>

          <section className="space-y-12 pb-20">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-center dark:text-white">
              Hook <span className="text-yellow-500">FAQs</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { q: "What is a hook in a video?", a: "A hook is the very first thing you say or show in a video to grab the viewer's attention and stop them from scrolling." },
                { q: "Why are some hooks better than others?", a: "The best hooks trigger an emotional response—either curiosity, fear of missing out, or a desire to learn something new." },
                { q: "Can I use these hooks for TikTok and Reels?", a: "Yes, these hooks are universal for all short-form video platforms including Shorts, Reels, and TikTok." }
              ].map((faq, i) => (
                <div key={i} className="space-y-2 border-b border-neutral-100 dark:border-neutral-800 pb-6">
                  <h4 className="text-lg font-black uppercase tracking-tight dark:text-white">{faq.q}</h4>
                  <p className="text-sm font-medium text-neutral-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
