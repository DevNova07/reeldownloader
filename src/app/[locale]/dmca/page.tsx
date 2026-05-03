"use client"

import * as React from "react"
import { AlertTriangle, Mail } from "lucide-react"

export default function DMCAPage() {
  return (
    <div className="flex flex-col min-h-screen px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-14 w-14 flex items-center justify-center rounded-3xl bg-red-500/10 text-red-600 border border-red-500/20 shadow-lg">
             <AlertTriangle className="h-7 w-7" />
           </div>
           <div>
             <h1 className="text-4xl font-black tracking-tight uppercase italic text-neutral-900 dark:text-white">DMCA Policy</h1>
             <p className="text-sm font-bold text-neutral-500 tracking-widest uppercase italic mt-1 hidden sm:block">Copyright Compliance & Takedown</p>
           </div>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-12 text-neutral-600 dark:text-neutral-400">
          <section className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800">
            <p className="text-lg font-bold leading-relaxed m-0">
              SavClip respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we have established a strict procedure for reporting and handling alleged copyright infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black tracking-widest uppercase italic text-neutral-900 dark:text-white mb-6">1. Reporting Infringement</h2>
            <p className="font-medium leading-relaxed mb-6">
              If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, please submit a formal notification containing the following:
            </p>
            <ul className="list-disc pl-8 space-y-4 font-bold text-sm">
              <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the specific URL or material that is claimed to be infringing.</li>
              <li>Sufficient contact information including your address, telephone number, and email.</li>
              <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner.</li>
            </ul>
          </section>

          <div className="relative group overflow-hidden p-10 rounded-[3rem] bg-[#0a0a0a] border border-white/10 shadow-2xl">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Mail className="h-24 w-24 text-pink-600" />
             </div>
             <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3 relative z-10">
               <Mail className="h-6 w-6 text-pink-600" />
               Submit a Takedown Request
             </h3>
             <p className="text-white/60 font-medium leading-relaxed relative z-10 max-w-lg mb-6">
               Our legal team will review and process all valid DMCA requests within 48-72 business hours. Please ensure your request is complete to avoid processing delays.
             </p>
             <div className="bg-white/5 inline-block px-6 py-3 rounded-2xl border border-white/10 relative z-10">
                <span className="text-pink-500 font-black text-lg">ramzaan0043@gmail.com</span>
             </div>
          </div>

          <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
             <h2 className="text-2xl font-black tracking-widest uppercase italic text-neutral-900 dark:text-white mb-4">2. Counter-Notification</h2>
             <p className="font-medium leading-relaxed">
               If you believe that your material was removed by mistake or misidentification, you may submit a counter-notification to our copyright agent with the required legal statements.
             </p>
          </section>
        </div>
      </div>
    </div>
  )
}
