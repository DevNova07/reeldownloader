"use client"

import * as React from "react"
import { Clipboard, AlertCircle, Loader2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute, getPlatformFromPath, isAnyPlatformUrl } from "@/utils/platform-detector"
import { toast } from "react-hot-toast"

interface SearchBarProps {
  onSearch: (url: string) => void
  isLoading?: boolean
  placeholder?: string
  dict: {
    search: {
      placeholder: string;
      button: string;
      error_empty: string;
      error_invalid: string;
    };
  };
  validate?: (url: string) => boolean
  errorMsg?: string
  buttonClass?: string
  iconClass?: string
  initialValue?: string
}

function SearchBarInner({ 
  onSearch, 
  isLoading, 
  placeholder,
  dict,
  validate = isAnyPlatformUrl,
  errorMsg,
  buttonClass = "bg-linear-to-br from-rose-600 via-pink-600 to-purple-600 text-white shadow-[0_20px_50px_rgba(225,10,94,0.3)] ring-1 ring-inset ring-white/20",
  iconClass = "text-pink-600",
  initialValue = ""
}: SearchBarProps) {
  const [url, setUrl] = React.useState(initialValue)
  const [error, setError] = React.useState<string | null>(null)

  // Sync state with initialValue if it changes (e.g. from PWA Share Target)
  React.useEffect(() => {
    if (initialValue && initialValue !== url) {
      setUrl(initialValue)
    }
  }, [initialValue])
  
  // Use translated placeholder from dict if not explicitly provided as a prop
  const displayPlaceholder = placeholder || dict?.search?.placeholder || "Paste link here..."
  const displayErrorMsg = errorMsg || dict?.search?.error_invalid || "Invalid URL. Please check and try again."

  const inputRef = React.useRef<HTMLInputElement>(null)
  const hasSubmitted = React.useRef<string | null>(null)
 
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Smart Redirection helper
  const checkAndRedirect = React.useCallback((inputUrl: string) => {
    const detected = getPlatformFromUrl(inputUrl)
    if (!detected) return false

    const currentPlat = getPlatformFromPath(pathname || "")
    const locale = (pathname || "").split('/')[1] || 'en'

    if (currentPlat && detected !== currentPlat) {
      const target = getLocalizedRoute(detected, locale)
      if (target) {
        router.push(`${target}?url=${encodeURIComponent(inputUrl)}`)
        return true
      }
    }
    return false
  }, [pathname, router])

  // Smart Feature: Auto-submit if the pasted/typed text is a valid URL
  React.useEffect(() => {
    if (url && url !== hasSubmitted.current) {
      // First check for cross-platform redirection
      if (checkAndRedirect(url)) {
        hasSubmitted.current = url;
        return;
      }

      // Then check for normal auto-submission
      if (validate(url) && (url.startsWith('http://') || url.startsWith('https://'))) {
        hasSubmitted.current = url;
        inputRef.current?.blur(); // Hide keyboard
        onSearch(url);
      }
    }
  }, [url, validate, onSearch, checkAndRedirect]);

  // Note: Auto-download logic for PWA Share Target is now managed by the parent page/template 
  // via the useAutoDownload hook for better architectural consistency.

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (!text) return
      
      setUrl(text)
      if (error) setError(null)
      
      // Immediate submission if it's a valid URL for a snappier feel
      if (validate(text) && (text.startsWith('http://') || text.startsWith('https://'))) {
        if (checkAndRedirect(text)) {
          hasSubmitted.current = text;
          return;
        }
        hasSubmitted.current = text;
        onSearch(text);
        inputRef.current?.blur();
      }
    } catch (err) {
      console.error("Paste failed:", err)
      // Fallback: focus the input so the user can use native paste
      inputRef.current?.focus();
    }
  }

  const handleClear = () => {
    setUrl("")
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      setError(dict?.search?.error_empty || "Please paste a URL first!")
      return
    }
    if (checkAndRedirect(url)) return
    
    if (!validate(url)) {
      setError(displayErrorMsg)
      return
    }
    setError(null)
    inputRef.current?.blur(); // Hide keyboard
    onSearch(url)
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-2 sm:py-4 relative group">
      {/* Background Glow matching Platform */}
      <div className={cn("absolute inset-0 -top-10 -bottom-10 opacity-30 blur-3xl rounded-full transition-all duration-700", 
        iconClass.includes('pink') ? "bg-pink-500/20" :
        iconClass.includes('red') ? "bg-red-500/20" :
        iconClass.includes('blue') ? "bg-blue-500/20" :
        iconClass.includes('yellow') ? "bg-yellow-500/20" :
        iconClass.includes('slate') ? "bg-slate-500/20" :
        "bg-white/5"
      )} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0">
          <div className="relative flex-1 flex items-center overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-r-none border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-pink-500/20 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                if (error) setError(null)
              }}
              placeholder={displayPlaceholder}
              className={cn(
                "w-full bg-transparent py-5 pl-6 pr-32 text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-white dark:placeholder:text-neutral-400 sm:text-lg",
                error && "ring-2 ring-inset ring-red-500"
              )}
            />
            <div className="absolute right-2 flex items-center gap-2">
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-all flex items-center justify-center shadow-sm"
                  title="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handlePaste}
                className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-neutral-50 to-white px-4 py-2.5 text-sm font-black text-neutral-800 shadow-sm transition-all hover:scale-105 active:scale-95 border border-neutral-200 dark:from-neutral-800 dark:to-neutral-900 dark:text-white dark:border-neutral-700"
                title="Smart Paste"
              >
                <Clipboard className={cn("h-4 w-4 transition-transform group-hover:rotate-12", iconClass)} />
                <span className="hidden sm:inline font-black tracking-tight">{dict?.search?.placeholder?.split(' ')[0] || 'Paste'}</span>
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={cn("flex items-center justify-center rounded-2xl sm:rounded-l-none shadow-2xl px-12 py-5 font-black tracking-widest transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 sm:py-0 overflow-hidden relative group", buttonClass)}
          >
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : (
              <span className="relative z-10 flex items-center gap-2 uppercase">
                {dict?.search?.button || "Download"}
              </span>
            )}
            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 flex items-center gap-2 text-sm text-red-100" // lighter text since bg will be gradient
            >
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium bg-red-600 px-2 py-0.5 rounded">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-[9px] font-black text-white/50 uppercase tracking-[0.2em] leading-relaxed text-center drop-shadow-sm">
          Zero Hosting Policy: We do not host any files on our servers. Content belongs to respective owners. For educational and personal use only.
        </p>
      </motion.div>
    </div>
  )
}


const MemoizedSearchBarInner = React.memo(SearchBarInner);

export function SearchBar(props: SearchBarProps) {
  return (
    <React.Suspense fallback={null}>
      <MemoizedSearchBarInner {...props} />
    </React.Suspense>
  )
}
