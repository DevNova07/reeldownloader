import * as React from "react"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-[60vh] px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white mb-8">Terms of Service</h1>
        <div className="prose prose-pink dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
          <p className="text-lg leading-relaxed mb-4">
            By accessing and using SavClip, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-4 mb-4">1. Use License</h2>
          <p>
            SavClip is a service intended strictly for personal use. You must have the legal right or permission from the original creator to download their content. We do not endorse piracy or copyright infringement.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-4 mb-4">2. Disclaimer</h2>
          <p>
            The materials on SavClip&apos;s website are provided on an &apos;as is&apos; basis. SavClip makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p className="mt-4 text-sm opacity-60">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  )
}
