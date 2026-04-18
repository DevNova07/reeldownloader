"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/utils/cn"

interface ExpandableSectionProps {
  children: React.ReactNode
  maxHeight?: number
  labelOpen?: string
  labelClose?: string
  className?: string
  gradientClassName?: string
}

export function ExpandableSection({
  children,
  maxHeight = 350,
  labelOpen = "More",
  labelClose = "Less",
  className,
  gradientClassName,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [shouldShowButton, setShouldShowButton] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      setShouldShowButton(contentRef.current.scrollHeight > maxHeight)
    }
  }, [children, maxHeight])

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : (shouldShowButton ? maxHeight : "auto") 
        }}
        className="overflow-hidden relative"
        transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <div ref={contentRef}>
          {children}
        </div>
        
        {/* Gradient Overlay */}
        <AnimatePresence>
          {!isExpanded && shouldShowButton && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white via-white/90 to-transparent dark:from-black dark:via-black/90 pointer-events-none",
                gradientClassName
              )} 
            />
          )}
        </AnimatePresence>
      </motion.div>

      {shouldShowButton && (
        <div className="flex justify-center mt-6 relative z-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 active:scale-95 shadow-sm"
          >
            {isExpanded ? labelClose : labelOpen}
            <ChevronDown className={cn("h-3 w-3 transition-transform duration-500", isExpanded && "rotate-180")} />
          </button>
        </div>
      )}
    </div>
  )
}
