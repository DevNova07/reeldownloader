import * as React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute, getPlatformFromPath, getPreciseRouteFromUrl } from "@/utils/platform-detector"
import { toast } from "react-hot-toast"

/**
 * useAutoDownload Hook
 * Automatically handles '?url=' query parameters from PWA shares or direct links.
 */
export function useAutoDownload(
  onSearch: (url: string, autoTrigger?: boolean) => void,
  locale: string,
  currentPlatform: string | null = null
) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const hasTriggered = React.useRef<string | null>(null)

  React.useEffect(() => {
    let isMounted = true
    
    // Some apps share the link in the 'text' parameter instead of 'url'
    const rawUrl = searchParams.get('url')
    const rawText = searchParams.get('text')
    
    let extractedUrl = rawUrl
    if (!extractedUrl && rawText) {
      // Try to extract a URL from the text (e.g. "Check out this video! https://...")
      const urlRegex = /(https?:\/\/[^\s]+)/g
      const matches = rawText.match(urlRegex)
      if (matches && matches.length > 0) {
        extractedUrl = matches[0]
      }
    }

    if (!extractedUrl || extractedUrl === hasTriggered.current) return

    const sharedUrl = extractedUrl;

    const targetPath = getPreciseRouteFromUrl(sharedUrl)
    if (!targetPath) return

    const relativePath = (pathname || "").replace(`/${locale}`, "") || "/"

    // Scenario: Wrong sub-page tool - Redirect to the exact target page
    if (relativePath !== targetPath) {
      hasTriggered.current = sharedUrl
      const displayLabel = targetPath.replace('/', '').replace(/-/g, ' ').replace('downloader', '').trim()
      toast(`Switching to ${displayLabel.toUpperCase()}...`, { 
        icon: '🚀',
        duration: 3000,
        style: {
          borderRadius: '16px',
          background: '#111',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      })
      const targetRoute = `/${locale}${targetPath === '/' ? '' : targetPath}`
      router.replace(`${targetRoute}?url=${encodeURIComponent(sharedUrl)}`)
    } else {
      // Correct platform or root page - trigger search directly with a slight delay for reliability
      const autoDownload = searchParams.get('autodownload') === 'true'
      hasTriggered.current = sharedUrl
      setTimeout(() => {
        if (isMounted) {
          onSearch(sharedUrl, autoDownload)
        }
      }, 300) // Small delay to ensure everything is initialized
    }

    return () => {
      isMounted = false
    }
  }, [searchParams, locale, router, pathname, onSearch])
}
