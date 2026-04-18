"use client"

import * as React from "react"

export interface HistoryEntry {
  id: number
  url: string
  thumbnail: string
  title: string
  timestamp: string
  platform?: string
}

import { PlatformResult } from "@/types/download";

const STORAGE_KEY = "snap_download_history"
const MAX_HISTORY_PER_PLATFORM = 8
const MAX_GLOBAL_HISTORY = 100

// ─── In-memory API cache (cleared on page refresh) ───────────────────────────
const apiCache = new Map<string, PlatformResult>()

export function useDownloadHistory(platform?: string) {
  const [allHistory, setAllHistory] = React.useState<HistoryEntry[]>([])

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setAllHistory(JSON.parse(raw))
    } catch {
      // ignore parse errors
    }
  }, [])

  // Derived history for the specific platform
  const history = React.useMemo(() => {
    if (!platform) return allHistory
    return allHistory
      .filter((item) => item.platform === platform)
      .slice(0, MAX_HISTORY_PER_PLATFORM)
  }, [allHistory, platform])

  const addToHistory = React.useCallback(
    (url: string, data: { thumbnail?: string; title?: string }) => {
      const entry: HistoryEntry = {
        id: Date.now(),
        url,
        thumbnail: data.thumbnail || "",
        title: data.title || "Downloaded Content",
        timestamp: new Date().toISOString(),
        platform: platform || "unknown",
      }
      
      setAllHistory((prev) => {
        const updated = [
          entry,
          ...prev.filter((item) => item.url !== url),
        ].slice(0, MAX_GLOBAL_HISTORY)
        
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch (err: unknown) {
          console.error("Failed to save history:", (err as Error).message)
        }
        return updated
      })
    },
    [platform]
  )

  const clearHistory = React.useCallback(() => {
    setAllHistory((prev) => {
      // If platform is specified, only clear history for that platform
      const updated = platform 
        ? prev.filter((item) => item.platform !== platform)
        : []
        
      try {
        if (updated.length === 0) {
          localStorage.removeItem(STORAGE_KEY)
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        }
      } catch {}
      return updated
    })
  }, [platform])

  return { history, addToHistory, clearHistory }
}

// ─── API Cache helpers ────────────────────────────────────────────────────────
export function getCached(url: string) {
  return apiCache.get(url) ?? null
}

export function setCached(url: string, data: PlatformResult) {
  apiCache.set(url, data)
}
