"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Link, Send, DownloadCloud, ArrowRight } from "lucide-react"
import { cn } from "@/utils/cn"

interface Step {
  title: string
  desc: string
}

interface HeroQuickGuideProps {
  steps: Step[]
  accentColor?: string
  className?: string
}

export function HeroQuickGuide({ steps, accentColor = "text-white", className }: HeroQuickGuideProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !steps || steps.length < 3) return null

  const icons = [
    <Link key="1" className="h-5 w-5" />,
    <Send key="2" className="h-5 w-5" />,
    <DownloadCloud key="3" className="h-5 w-5" />
  ]

  return (
    <div className={cn("mt-12 mb-4 hidden sm:block", className)}>
      <div className="flex items-center justify-center gap-4">
        {steps.slice(0, 3).map((step, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-2.5 backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/20"
            >
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-white/20", accentColor)}>
                {icons[idx]}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none mb-1">
                  Step 0{idx + 1}
                </p>
                <p className="text-xs font-black uppercase tracking-tighter text-white whitespace-nowrap leading-none">
                  {step.title}
                </p>
              </div>
            </motion.div>
            
            {idx < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <ArrowRight className="h-4 w-4 text-white" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
