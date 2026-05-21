"use client"

import * as React from "react"

export function PhotoCTA() {
  return (
    <section className="py-24 bg-linear-to-r from-sky-600 via-blue-600 to-indigo-600 text-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
          Ready to Save High-Quality Photos?
        </h2>
        <p className="text-xl font-bold mb-12 opacity-90">
          Join millions of users and start downloading high-resolution Instagram photos and galleries today.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-12 py-5 bg-white text-sky-600 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          Download Now
        </button>
      </div>
    </section>
  )
}
