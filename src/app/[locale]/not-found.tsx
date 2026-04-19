"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-10 bg-pink-500/20 blur-3xl rounded-full animate-pulse" />
        <AlertTriangle className="relative h-24 w-24 text-pink-600" />
      </div>

      <h1 className="mb-4 text-6xl font-black tracking-tighter text-neutral-900 dark:text-white sm:text-8xl">
        404
      </h1>
      
      <p className="mb-8 max-w-md text-lg font-bold text-neutral-500 dark:text-neutral-400">
        Oops! The clip you're looking for has been moved or deleted. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl bg-pink-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-pink-600/20 transition-all hover:bg-pink-500 active:scale-95"
        >
          <Home className="h-4 w-4" />
          Back Home
        </Link>
        
        <Link
          href="/#search"
          className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-neutral-900 shadow-xl transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 active:scale-95"
        >
          <Search className="h-4 w-4" />
          Try Searching
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 opacity-40">
        <div className="text-[10px] font-black uppercase tracking-[0.2em]">Instagram</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em]">YouTube</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em]">Facebook</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em]">TikTok</div>
      </div>
    </div>
  )
}
