"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight, Copy, Check, RefreshCcw, MoveLeft, Video, Mic, Target } from "lucide-react"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/dictionaries/client"
import { type Locale } from "@/i18n"
import { toast } from "react-hot-toast"

export default function ReelScriptGenerator() {
  const pathname = usePathname()
  const [step, setStep] = React.useState(1)
  const [topic, setTopic] = React.useState("")
  const [tone, setTone] = React.useState("Energetic")
  const [duration, setDuration] = React.useState("30s")
  const [result, setResult] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [copyStatus, setCopyStatus] = React.useState(false)

  const locale = (pathname.split('/')[1] || 'en') as Locale
  const dict = getDictionary(locale)

  const handleGenerate = () => {
    if (!topic.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      const hooksMap = {
        Energetic: [
          `"Stop scrolling! If you're not doing ${topic}, you're falling behind!"`,
          `"Listen up! This is the only ${topic} hack you'll ever need!"`
        ],
        Educational: [
          `"Did you know that ${topic} is actually easier than you think?"`,
          `"The science behind ${topic} is finally out, and here is how it works."`
        ],
        Funny: [
          `"POV: You finally tried ${topic} and your life is a mess (just kidding, it's great)."`,
          `"Me thinking ${topic} was hard... versus me finding this hack."`
        ],
        Serious: [
          `"The truth about ${topic} that most people aren't ready to hear."`,
          `"If you want to master ${topic}, you need to stop doing this one thing."`
        ]
      }
      
      const selectedHooks = hooksMap[tone as keyof typeof hooksMap] || ["Stop everything!"]
      const selectedHook = selectedHooks[Math.floor(Math.random() * selectedHooks.length)]

      setResult(`🎬 **VIRAL SCRIPT: ${topic.toUpperCase()}** (${duration})\n\n` +
        `🪝 **THE HOOK (0-3s):**\n${selectedHook} (Point at text overlay on screen)\n\n` +
        `📝 **THE BODY (3-25s):**\n1. Visual: Quick cuts of you doing [Action related to ${topic}].\n2. Key Insight: "Most people focus on X, but real growth happens when you apply ${topic} to Y."\n3. Proof: Show a 'before/after' result or a screenshot of success.\n\n` +
        `📣 **THE CTA (25-30s):**\n"If you want my full ${topic} guide, comment 'READY' below and I'll DM it to you!"\n\n` +
        `#${topic.replace(/\s+/g, '')} #reels #viral #growth #tips #creatoreconomy`)
      setIsGenerating(false)
      setStep(3)
      toast.success("Viral Script Ready!")
    }, 2500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopyStatus(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopyStatus(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] px-4 py-12 dark:bg-black sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-20 space-y-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-pink-600 dark:bg-pink-900/30"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Content Studio
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-neutral-900 uppercase italic leading-[0.8] dark:text-white">
            Reel <br className="sm:hidden" /> <span className="text-pink-600">Script</span>
          </h1>
          <p className="text-lg font-bold text-neutral-500 tracking-tight opacity-70 max-w-2xl mx-auto px-4">
            High-conversion scripts for Reels, TikToks, and Shorts in seconds.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 flex items-center justify-between gap-3 max-w-[280px] mx-auto">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-pink-600 shadow-lg shadow-pink-500/20" : "bg-neutral-200 dark:bg-neutral-800"}`}
            />
          ))}
        </div>

        <section className="rounded-[40px] bg-white p-6 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                   <h2 className="text-2xl font-black tracking-tighter text-neutral-900 uppercase italic dark:text-white flex items-center gap-2">
                     <Target className="h-6 w-6 text-pink-600" />
                     Topic?
                   </h2>
                   <p className="text-sm font-bold text-neutral-500 tracking-tight opacity-70">
                     What is your video about?
                   </p>
                </div>
                <textarea 
                  placeholder="e.g. 3 Morning habits to double your productivity..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-48 w-full rounded-3xl border-none bg-neutral-100 p-6 text-lg font-bold tracking-tight outline-none ring-2 ring-transparent transition-all focus:bg-white focus:ring-pink-600/20 dark:bg-neutral-800 dark:focus:bg-neutral-800"
                />
                <button
                  onClick={() => topic.trim() && setStep(2)}
                  disabled={!topic.trim()}
                  className="group w-full h-16 items-center justify-center gap-4 rounded-2xl bg-black text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-black disabled:opacity-50 flex"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-2">
                      <Mic className="h-3.5 w-3.5" /> Script Tone
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["Energetic", "Educational", "Funny", "Serious"].map((t) => (
                        <button 
                          key={t}
                          onClick={() => setTone(t)}
                          className={`rounded-2xl border-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${tone === t ? "border-pink-600 bg-pink-600 text-white shadow-lg shadow-pink-500/20" : "border-neutral-100 bg-neutral-100 text-neutral-500 hover:border-pink-200 dark:border-neutral-800 dark:bg-neutral-800"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-2">
                      <Video className="h-3.5 w-3.5" /> Duration
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["15s", "30s", "60s", "90s"].map((d) => (
                        <button 
                          key={d}
                          onClick={() => setDuration(d)}
                          className={`rounded-2xl border-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${duration === d ? "border-pink-600 bg-pink-600 text-white shadow-lg shadow-pink-500/20" : "border-neutral-100 bg-neutral-100 text-neutral-500 hover:border-pink-200 dark:border-neutral-800 dark:bg-neutral-800"}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(1)} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900 transition-all hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white">
                    <MoveLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="group flex-1 h-16 items-center justify-center gap-4 rounded-2xl bg-linear-to-tr from-rose-500 to-pink-600 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-rose-500/30 transition-all hover:scale-[1.02] active:scale-95 flex"
                  >
                    {isGenerating ? "Creating..." : "Magic"}
                    <Sparkles className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-black tracking-tighter text-neutral-900 uppercase italic dark:text-white">
                    Ready to <span className="text-pink-600">Shoot</span>
                  </h2>
                </div>

                <div className="relative rounded-[32px] bg-neutral-950 p-6 md:p-12 text-base md:text-lg font-medium leading-relaxed tracking-tight text-white shadow-2xl border border-white/10">
                   <div className="absolute top-4 right-4 md:top-6 md:right-6">
                     <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)]" />
                   </div>
                   <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-neutral-300 bg-transparent p-0 text-sm md:text-base">
                        {result}
                      </pre>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-pink-600 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-pink-500/30 transition-all active:scale-95"
                  >
                    {copyStatus ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copyStatus ? "Copied" : "Copy Script"}
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-900 transition-all dark:bg-neutral-800 dark:text-white"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" />
                    New Idea
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SEO CONTENT SECTION */}
        <div className="mt-32 space-y-24">
          {/* How it Works */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
                How to Use <span className="text-pink-600">Reel AI</span>
              </h2>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">3 Simple Steps to Virality</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Input Topic", desc: "Type what your video is about. Be specific for better AI results." },
                { step: "02", title: "Pick Your Vibe", desc: "Choose a tone and duration that matches your personal brand." },
                { step: "03", title: "Shoot & Win", desc: "Copy the script and start recording. AI handles the retention hooks." }
              ].map((item) => (
                <div key={item.step} className="p-8 rounded-[32px] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-xl">
                  <span className="text-5xl font-black text-pink-600/20 mb-4 block">{item.step}</span>
                  <h3 className="text-xl font-black uppercase italic mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-sm font-bold text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-12">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-center dark:text-white">
              Common <span className="text-pink-600">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "Is this tool free to use?", a: "Yes, our AI Reel Script Generator is 100% free for all creators." },
                { q: "Does it work for YouTube Shorts?", a: "Absolutely. The scripts are optimized for all short-form platforms including TikTok and Shorts." },
                { q: "How many scripts can I generate?", a: "There are no limits. You can generate as many scripts as you need for your content calendar." }
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2 dark:text-white">Q: {faq.q}</h4>
                  <p className="text-sm font-medium text-neutral-500 leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
