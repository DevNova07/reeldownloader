"use client"

import React from 'react';
import { WifiOff, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-black">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-pink-500/20" />
        <div className="relative rounded-full bg-linear-to-br from-pink-500 to-purple-600 p-8 text-white shadow-2xl">
          <WifiOff size={64} strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="mb-4 text-4xl font-black tracking-tight uppercase italic text-neutral-900 dark:text-white">
        You are Offline
      </h1>
      
      <p className="mb-10 max-w-md text-lg font-medium text-neutral-500 dark:text-neutral-400 hidden sm:block">
        It looks like you've lost your internet connection. Don't worry, SavClip will be ready as soon as you're back online.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-8 py-4 text-lg font-black text-white transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
        >
          <RefreshCw size={20} />
          Retry Connection
        </button>
        
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-neutral-200 px-8 py-4 text-lg font-black text-neutral-900 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900"
        >
          <Home size={20} />
          Go Home
        </Link>
      </div>

      <div className="mt-20 flex items-center gap-2 text-sm font-bold text-neutral-400 tracking-widest uppercase italic">
        <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
        Waiting for signal...
      </div>
    </div>
  );
}
