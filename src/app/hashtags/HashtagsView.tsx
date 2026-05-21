"use client"

import * as React from "react"
import { AISearchBar } from "@/components/shared/AISearchBar"

export function HashtagsView() {
  const [query, setQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSearch = () => {
    if (!query.trim()) return
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="bg-neutral-950 py-12 -mt-8 relative z-20">
      <AISearchBar 
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Enter your post topic or niche (e.g., travel photography)..."
        buttonText="Generate Viral Hashtags"
        isLoading={isLoading}
        variant="blue"
      />
    </div>
  )
}
