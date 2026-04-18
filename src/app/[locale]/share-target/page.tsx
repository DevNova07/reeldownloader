"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { getPlatformFromUrl, getLocalizedRoute } from "@/utils/platform-detector"

function ShareTargetContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [status, setStatus] = React.useState("Detecting...")

  React.useEffect(() => {
    // Extract shared text/url
    const text = searchParams.get('text') || ""
    const urlParam = searchParams.get('url') || ""
    const title = searchParams.get('title') || ""
    const combined = `${title} ${text} ${urlParam}`.trim()

    // Robust URL Extraction
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const matches = combined.match(urlRegex)
    const sharedUrl = matches ? matches[0] : null

    if (!sharedUrl) {
      router.replace("/")
      return
    }

    // Get current locale
    const pathParts = window.location.pathname.split('/')
    const locale = (pathParts[1] && pathParts[1].length === 2) ? pathParts[1] : 'en'

    const detectedPlatform = getPlatformFromUrl(sharedUrl)
    
    if (detectedPlatform) {
      const target = getLocalizedRoute(detectedPlatform, locale)
      if (target) {
        setStatus(`Launching ${detectedPlatform}...`)
        router.replace(`${target}?url=${encodeURIComponent(sharedUrl)}`)
        return
      }
    }

    // Fallback: Home
    router.replace(`/${locale}?url=${encodeURIComponent(sharedUrl)}`)
  }, [router, searchParams])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white selection:bg-pink-500/30">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 ring-1 ring-white/10">
          <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        </div>
        <div className="text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] animate-pulse">
            {status}
          </h2>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-neutral-500">
            Speed Engine Active
          </p>
        </div>
      </div>
    </div>
  )
}

function ShareTargetPageInner() {
  return (
    <React.Suspense fallback={
      <div className="flex h-screen w-screen animate-pulse flex-col items-center justify-center bg-slate-900 text-white">
        <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
      </div>
    }>
      <ShareTargetContent />
    </React.Suspense>
  )
}


export default function ShareTargetPage() {
  return (
    <React.Suspense fallback={null}>
      <ShareTargetPageInner  />
    </React.Suspense>
  )
}
