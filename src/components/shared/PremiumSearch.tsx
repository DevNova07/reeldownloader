"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search, Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/utils/cn"

interface PremiumSearchProps {
  value: string
  onChange: (val: string) => void
  onSearch: () => void
  placeholder?: string
  isLoading?: boolean
  accentColor?: string // e.g., "text-[#a4d444]" or "#a4d444"
  buttonColor?: string // e.g., "bg-[#a4d444]"
  className?: string
}

export function PremiumSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Enter keyword...",
  isLoading = false,
  accentColor = "text-[#a4d444]",
  buttonColor = "bg-[#a4d444]",
  className
}: PremiumSearchProps) {
  return (
    <div className={cn("relative w-full max-w-2xl mx-auto px-4", className)}>
      {/* Outer Glow / Ambient Light */}
      <div className={cn(
        "absolute -inset-1 opacity-20 blur-xl transition-all duration-500 group-focus-within:opacity-40",
        buttonColor
      )} />

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="relative group flex items-center bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-800 p-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#a4d444]"
      >
        <div className="flex-1 flex items-center px-4 sm:px-6">
          <Search className={cn("h-5 w-5 mr-3 transition-colors", value ? accentColor : "text-neutral-400")} />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="w-full bg-transparent border-none outline-none py-4 text-base sm:text-lg font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 italic"
          />
          {value && (
            <button 
              onClick={() => onChange("")}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors mr-2"
            >
              <Sparkles className="h-4 w-4 text-neutral-300" />
            </button>
          )}
        </div>

        <button
          onClick={onSearch}
          disabled={isLoading || !value.trim()}
          className={cn(
            "h-14 px-6 sm:px-10 rounded-xl text-white font-black transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest text-sm",
            buttonColor
          )}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Search</span>
              <Search className="h-5 w-5" />
            </>
          )}
        </button>
      </motion.div>

      {/* Suggested Tags / Micro-labels below */}
      <motion.div 
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex flex-wrap justify-center gap-2"
      >
        <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Popular:</span>
        {["Viral", "Attitude", "Love", "Success"].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              onChange(tag)
              onSearch()
            }}
            className="text-[10px] font-bold text-white/80 hover:text-[#a4d444] uppercase tracking-widest transition-colors"
          >
            #{tag}
          </button>
        ))}
      </motion.div>
    </div>
  )
}
