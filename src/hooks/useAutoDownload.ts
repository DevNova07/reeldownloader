import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute, getPlatformFromPath } from "@/utils/platform-detector"
import { toast } from "react-hot-toast"

/**
 * useAutoDownload Hook
 * Automatically handles '?url=' query parameters from PWA shares or direct links.
 */
export function useAutoDownload(
  onSearch: (url: string) => void,
  locale: string,
  currentPlatform: string | null = null
) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const hasTriggered = React.useRef<string | null>(null)

  React.useEffect(() => {
    const sharedUrl = searchParams.get('url')
    if (!sharedUrl || sharedUrl === hasTriggered.current) return

    const detected = getPlatformFromUrl(sharedUrl)
    if (!detected) return

    // Scenario: Wrong platform - Redirect to the correct one
    if (detected !== currentPlatform && currentPlatform !== null) {
      const targetRoute = getLocalizedRoute(detected, locale)
      if (targetRoute) {
        hasTriggered.current = sharedUrl
        toast(`Switching to ${detected.charAt(0).toUpperCase() + detected.slice(1)} Downloader...`, { 
          icon: '🚀',
          duration: 3000,
          style: {
            borderRadius: '16px',
            background: '#111',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        })
        router.replace(`${targetRoute}?url=${encodeURIComponent(sharedUrl)}`)
      }
    } else {
      // Correct platform or root page - let SearchBar handle it via initialValue
      hasTriggered.current = sharedUrl
    }
  }, [searchParams, locale, router, currentPlatform])
}
