"use client"

import * as React from "react"
import { Loader2, Search } from "lucide-react"
import { cn } from "@/utils/cn"
import { motion } from "framer-motion"

interface AISearchBarProps {
  value: string
  onChange: (val: string) => void
  onSearch: () => void
  placeholder: string
  buttonText: string
  isLoading: boolean
  variant: "blue" | "pink" | "red"
}

export function AISearchBar({ 
  value, 
  onChange, 
  onSearch, 
  placeholder, 
  buttonText, 
  isLoading,
  variant
}: AISearchBarProps) {


  return (
    <div className="mx-auto w-full max-w-4xl px-4 space-y-4">
      {/* Input Group */}
      <motion.div 
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center rounded-3xl border border-neutral-800 bg-[#0a0a0a] p-1.5 shadow-2xl ring-1 ring-white/5 transition-all focus-within:ring-2 focus-within:ring-white/10"
      >
        <div className="flex flex-1 items-center gap-4 pl-8">
           <Search className="h-6 w-6 text-neutral-600" />
           <input
             type="text"
             value={value}
             onChange={(e) => onChange(e.target.value)}
             placeholder={placeholder}
             onKeyDown={(e) => e.key === "Enter" && onSearch()}
             className="flex-1 bg-transparent py-4 pr-8 text-xl font-bold text-white placeholder:text-neutral-500 outline-none sm:text-2xl"
           />
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onClick={onSearch}
        disabled={isLoading || !value.trim()}
        className={cn(
          "w-full rounded-3xl py-5 text-2xl font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center overflow-hidden relative group",
          variant === "blue" 
            ? "bg-linear-to-r from-blue-700 via-blue-600 to-blue-500 shadow-blue-500/30" :
          variant === "pink" 
            ? "bg-linear-to-r from-rose-600 via-pink-600 to-purple-600 shadow-pink-500/30" :
            "bg-linear-to-r from-red-700 via-red-600 to-red-500 shadow-red-500/30"
        )}
      >
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        ) : (
          <span className="relative z-10">{buttonText}</span>
        )}
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  )
}
