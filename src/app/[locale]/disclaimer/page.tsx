"use client"

import * as React from "react"
import { Scale, Info } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-100 dark:border-neutral-800">
             <Scale className="h-6 w-6" />
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase italic">Disclaimer</h1>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <p className="text-lg font-bold text-neutral-600 dark:text-neutral-400 leading-relaxed italic border-l-4 border-neutral-200 dark:border-neutral-800 pl-8">
            Please read this disclaimer carefully before using SavClip.
          </p>

          <section className="space-y-4">
             <div className="flex items-center gap-3 text-pink-600">
                <Info className="h-5 w-5" />
                <h2 className="text-xl font-black uppercase italic tracking-widest m-0">No Affiliation</h2>
             </div>
             <p className="text-neutral-500 dark:text-neutral-400 font-medium">
               SavClip is an independent web-based tool. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with YouTube, Instagram, TikTok, Facebook, Snapchat, X (Twitter), Telegram, or any of their subsidiaries or affiliates. The official websites for these platforms can be found at their respective domains.
             </p>
          </section>

          <section className="space-y-4">
             <h2 className="text-xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white">Legal Use</h2>
             <p className="text-neutral-500 dark:text-neutral-400 font-medium">
               This tool is intended to help users download media for their own personal use and fair-use educational purposes. Users are responsible for ensuring that they have the right to download the content they are accessing. SavClip does not encourage or condone the unauthorized downloading of copyrighted material.
             </p>
          </section>

          <section className="space-y-4">
             <h2 className="text-xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white">No Content Hosting</h2>
             <p className="text-neutral-500 dark:text-neutral-400 font-medium">
               We do not host any videos, photos, or media files on our servers. All media is fetched directly from the third-party platform servers at the time of the user's request. We do not maintain any database of downloaded content.
             </p>
          </section>

          <section className="space-y-4">
             <h2 className="text-xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white">Warranties</h2>
             <p className="text-neutral-500 dark:text-neutral-400 font-medium">
               SavClip is provided "as is" without any warranties of any kind, express or implied. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free.
             </p>
          </section>
        </div>
      </div>
    </div>
  )
}
