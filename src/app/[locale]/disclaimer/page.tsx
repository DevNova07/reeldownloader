"use client"

import * as React from "react"
import { Scale, Info } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-14 w-14 flex items-center justify-center rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 shadow-sm">
             <Scale className="h-7 w-7" />
           </div>
           <div>
             <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white uppercase italic">Legal Disclaimer</h1>
             <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-1 hidden sm:block">Platform Affiliation & Usage Rights</p>
           </div>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-12 text-neutral-600 dark:text-neutral-400">
          <section className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800">
            <p className="text-lg font-bold leading-relaxed italic border-l-4 border-pink-600 pl-8 m-0">
              Please read this legal disclaimer carefully before using the services provided by SavClip (savclip.net).
            </p>
          </section>

          <section>
             <div className="flex items-center gap-3 text-pink-600 mb-6">
                <Info className="h-6 w-6" />
                <h2 className="text-2xl font-black uppercase italic tracking-widest m-0">1. No Official Affiliation</h2>
             </div>
             <p className="font-medium leading-relaxed">
               SavClip is an independent, third-party web utility. We are **NOT affiliated, associated, authorized, endorsed by**, or in any way officially connected with Instagram, Facebook, TikTok, YouTube, Snapchat, Twitter (X), Telegram, or any of their parent companies (e.g., Meta, ByteDance, Google). The names of these platforms, as well as related names, marks, emblems, and images, are registered trademarks of their respective owners.
             </p>
          </section>

          <section>
             <h2 className="text-2xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white mb-6">2. Fair Use & Legal Compliance</h2>
             <p className="font-medium leading-relaxed">
               This tool is intended strictly for personal use and ethical archiving. Users are solely responsible for ensuring that they have the legal right or explicit permission from the original content creator before downloading any media. SavClip does not encourage, condone, or provide tools for the unauthorized distribution of copyrighted material.
             </p>
          </section>

          <section className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800">
             <h2 className="text-2xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white mb-6 m-0">3. Technical Operation (No Hosting)</h2>
             <p className="font-medium leading-relaxed mt-4">
               We do not host any media files on our servers. SavClip operates as a technical bridge that fetches data directly from the respective social platform's servers at the time of a user's request. No database of downloaded content is maintained on our infrastructure.
             </p>
          </section>

          <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800 text-center">
             <p className="text-sm font-black uppercase tracking-widest text-neutral-400">
               By using SavClip, you acknowledge that you have read and understood this disclaimer.
             </p>
          </section>
        </div>
      </div>
    </div>
  )
}
