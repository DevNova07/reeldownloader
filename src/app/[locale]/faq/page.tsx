import * as React from "react"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-[60vh] px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="flex items-center gap-3 text-4xl font-black tracking-tight uppercase italic text-neutral-900 dark:text-white mb-12">
           <HelpCircle className="h-10 w-10 text-pink-600" />
           Frequently Asked Questions
        </h1>
        
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h3 className="font-bold text-neutral-900 dark:text-white">Is SavClip completely free?</h3>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">Yes, our services are 100% free with no hidden fees or premium tiers.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h3 className="font-bold text-neutral-900 dark:text-white">Do I need to create an account?</h3>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">No, you can download any public media without having to register or log in.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h3 className="font-bold text-neutral-900 dark:text-white">Are my downloads private?</h3>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">Absolutely. We do not keep logs of the videos or photos you download. All processing happens on the fly.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
