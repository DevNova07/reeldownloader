import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-black/50">
      <div className="relative flex flex-col items-center">
        {/* Animated Rings */}
        <div className="absolute h-24 w-24 animate-ping rounded-full border-4 border-pink-500/20" />
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.3)]" />
        
        {/* Text */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white">
            Sav<span className="text-pink-600">Clip</span>
          </span>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-600" />
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-600 [animation-delay:-0.15s]" />
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-600 [animation-delay:-0.3s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
