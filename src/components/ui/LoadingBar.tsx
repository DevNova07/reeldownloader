"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingBarProps {
  isLoading: boolean
  label?: string
  /** Tailwind gradient classes e.g. "from-pink-500 via-purple-500 to-blue-500" */
  gradient?: string
}

export function LoadingBar({
  isLoading,
  label = "Analyzing...",
  gradient = "from-pink-500 via-purple-500 to-blue-500",
}: LoadingBarProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex w-full flex-col items-center justify-center space-y-4 px-4 py-6"
        >
          {/* Minimal High-Speed Loader */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`h-4 w-4 rounded-full bg-linear-to-r ${gradient} shadow-[0_0_15px_rgba(236,72,153,0.5)]`}
            />
            <motion.div
              animate={{
                scale: [1, 2],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className={`absolute h-8 w-8 rounded-full border border-pink-500/30`}
            />
          </div>

          {/* Status Text Area removed as per user request */}

          {/* Fast Progress Indicator */}
          <div className="h-1 w-40 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
             <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                className={`h-full bg-linear-to-r ${gradient}`}
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
