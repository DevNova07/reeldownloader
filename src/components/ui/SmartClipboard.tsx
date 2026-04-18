"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clipboard, Zap, X, ChevronRight } from "lucide-react"
import { isAnyPlatformUrl, getPlatformFromUrl } from "@/utils/platform-detector"
import { toast } from "react-hot-toast"

interface SmartClipboardProps {
  onDetect: (url: string) => void
}

export function SmartClipboard({ onDetect }: SmartClipboardProps) {
  // Disabled globally to prevent intrusive popups as requested
  return null;
}
