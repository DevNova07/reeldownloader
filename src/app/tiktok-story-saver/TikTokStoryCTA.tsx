"use client"

import * as React from "react"

export function TikTokStoryCTA() {
  return (
    <section className="py-24 bg-linear-to-r from-pink-500 via-indigo-500 to-purple-600 text-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
          View & Save TT Stories Anonymously
        </h2>
        <p className="text-xl font-bold mb-12 opacity-90">
          Join millions of users and start downloading high-quality TikTok Stories in HD today.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-12 py-5 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          Start Saving Stories
        </button>
      </div>
    </section>
  )
}
