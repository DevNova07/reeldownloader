"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { type Locale } from "@/i18n"
import { getDictionary } from "@/dictionaries/client"
import { ChromeExtensionBanner } from "@/components/layout/ChromeExtensionBanner"
import Link from "next/link"

export default function PostPage() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale
    const dict = getDictionary(locale)

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white mb-4 uppercase">Post Downloader</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-md mx-auto hidden sm:block">
            Our specialized tool for downloading Instagram posts is currently under development. Stay tuned!
          </p>
          <div className="mt-4">
            <Link href="/" className="inline-flex h-12 items-center justify-center rounded-xl bg-pink-600 px-8 text-sm font-bold text-white shadow-lg hover:bg-pink-700 transition-all">
              Go back Home
            </Link>
          </div>
        </div>
      </div>
      <ChromeExtensionBanner dict={dict} />
    </div>
  )
}
