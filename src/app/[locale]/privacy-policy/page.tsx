import * as React from "react"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-[60vh] px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-pink dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
          <p className="text-lg leading-relaxed mb-4">
            At SavClip, we take your privacy seriously. This document outlines the types of personal information that is received and collected and how it is used.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-4 mb-4">1. Information Collection</h2>
          <p>
            We do not log any URLs you download, nor do we track your device data tied to individual identities. 
            All processing is done statelessly, meaning your downloads are private.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-4 mb-4">2. Cookies</h2>
          <p>
            We use minimal cookies necessary for the functioning of the website and basic analytical tracking (to see aggregate site usage, not personal usage).
          </p>
          <p className="mt-4 text-sm opacity-60">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  )
}
