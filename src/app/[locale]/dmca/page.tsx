"use client"

import * as React from "react"
import { ShieldAlert, Mail } from "lucide-react"

export default function DMCAPage() {
  return (
    <div className="flex flex-col min-h-screen px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600">
             <ShieldAlert className="h-6 w-6" />
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase italic">DMCA Policy</h1>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <p className="text-lg font-bold text-neutral-600 dark:text-neutral-400 leading-relaxed">
            InstaSnap respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we have established the following procedure for reporting alleged copyright infringement.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase italic tracking-widest text-neutral-900 dark:text-white">Reporting Infringement</h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">
              If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, you may notify our copyright agent. For your complaint to be valid under the DMCA, you must provide the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm font-bold text-neutral-500 dark:text-neutral-400">
              <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material that is claimed to be infringing and that is to be removed or access to which is to be disabled.</li>
              <li>Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and email address.</li>
            </ul>
          </section>

          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
             <h3 className="text-lg font-black uppercase italic text-neutral-900 dark:text-white mb-4 flex items-center gap-3">
               <Mail className="h-5 w-5 text-pink-600" />
               Submit a Takedown Request
             </h3>
             <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
               Please send all DMCA notices to our official legal contact:
               <br />
               <span className="text-pink-600 font-black">ramzaan0043@gmail.com</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
