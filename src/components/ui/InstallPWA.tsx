"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

export function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = React.useState(false)

  React.useEffect(() => {
    // Detect if already installed (display-mode standalone)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) return;

    const handleSuccessEvent = () => {
      // Only show if not already dismissed or if we want to remind them
      setShowInstallPrompt(true);
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowInstallPrompt(false);
      }, 3000);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // We don't show it immediately here anymore
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('savclip_download_success', handleSuccessEvent);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('savclip_download_success', handleSuccessEvent);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
    if (outcome === 'accepted') {
      localStorage.setItem('savclip_pwa_installed', 'true')
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('savclip_pwa_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-[400px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/80 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl sm:left-auto sm:right-6 sm:translate-x-0"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black border border-white/10 overflow-hidden">
               <Image src="/icon-192x192.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain" />
            </div>
            
            <div className="flex-1 min-w-0">
               <h4 className="text-[14px] font-black text-white italic tracking-tight leading-tight uppercase">SavClip App</h4>
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] mt-0.5 truncate">Desktop & Mobile Native Experience</p>
            </div>

            <div className="flex items-center gap-2">
               <button
                  onClick={handleInstallClick}
                  className="rounded-xl bg-pink-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-pink-600/20 hover:bg-pink-500 transition-all active:scale-95"
                >
                  Install
                </button>
                <button 
                  onClick={handleDismiss}
                  className="rounded-xl bg-white/5 p-2 text-white/40 hover:bg-white/10 hover:text-white transition-all"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
