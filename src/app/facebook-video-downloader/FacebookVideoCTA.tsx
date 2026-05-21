"use client"

import * as React from "react"

export function FacebookVideoCTA() {
  return (
    <section className="py-24 bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 text-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
          Ready to Save Your Favorite FB Videos?
        </h2>
        <p className="text-xl font-bold mb-12 opacity-90">
          Join millions of users and start downloading high-quality Facebook videos and reels without watermarks today.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-12 py-5 bg-white text-blue-700 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          Download Now
        </button>
      </div>
    </section>
  )
}
