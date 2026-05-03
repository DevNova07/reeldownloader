"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import { Link2, ClipboardCheck, Download, Sparkles } from "lucide-react"

interface Step {
  title: string
  description: string
}

interface PurpleStepGuideProps {
  title: string
  steps: Step[]
  className?: string
}

export function PurpleStepGuide({ title, steps, className }: PurpleStepGuideProps) {
  const icons = [
    <Link2 key="1" className="h-8 w-8" />,
    <ClipboardCheck key="2" className="h-8 w-8" />,
    <Download key="3" className="h-8 w-8" />
  ]

  return (
    <section className={cn("px-4 py-12 sm:py-24", className)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-5xl rounded-[3rem] bg-linear-to-br from-indigo-600 via-violet-700 to-purple-900 p-8 sm:p-20 shadow-[0_40px_100px_-15px_rgba(79,70,229,0.5)] relative overflow-hidden border border-white/10"
      >
        {/* Animated Decorative Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-linear-to-br from-pink-500/20 to-purple-500/20 blur-3xl rounded-full" 
        />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-linear-to-tr from-blue-500/20 to-indigo-500/20 blur-3xl rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <Sparkles className="h-6 w-6 text-indigo-200 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-200/80">Pro Guide</span>
          </motion.div>

          <h2 className="text-center text-3xl font-black text-white sm:text-5xl lg:text-7xl mb-16 uppercase italic tracking-tighter leading-[0.95]">
            {title}
          </h2>

          <div className="grid grid-cols-1 gap-12 sm:gap-20 w-full">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step Number Background */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10rem] font-black text-white/5 select-none pointer-events-none italic">
                  0{idx + 1}
                </div>

                <div className="flex flex-col items-center gap-6 relative">
                  {/* Icon Circle */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3">
                    {icons[idx]}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white sm:text-4xl uppercase italic tracking-tighter drop-shadow-md">
                      {step.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-indigo-100/90 font-medium leading-relaxed max-w-2xl mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
                      {step.description}
                    </p>
                  </div>
                </div>

                {idx !== steps.length - 1 && (
                  <div className="mt-16 sm:mt-24 h-px w-2/3 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
