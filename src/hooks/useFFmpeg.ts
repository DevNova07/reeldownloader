"use client"

import { useState } from "react"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL } from "@ffmpeg/util"

export function useFFmpeg() {
  const [loaded, setLoaded] = useState(false)
  const [ffmpeg] = useState(() => new FFmpeg())
  const [loading, setLoading] = useState(false)

  const load = async () => {
    if (loaded || loading) return
    
    setLoading(true)
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd"
    
    // Set up message listener for progress
    ffmpeg.on("log", ({ message }) => {
      console.log(message)
    })

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    })
    
    setLoaded(true)
    setLoading(false)
  }

  return { ffmpeg, loaded, loading, load }
}
