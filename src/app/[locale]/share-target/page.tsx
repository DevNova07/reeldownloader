"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getPlatformFromUrl, getLocalizedRoute } from "@/utils/platform-detector"
import { Loader2 } from "lucide-react"

function ShareTargetContent(props: { params: Promise<{ locale: string }> }) {
  const params = React.use(props.params);
  const locale = params.locale;
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    // PWA Share Target sends data in text, title, or url params
    const sharedUrl = searchParams.get("url") || searchParams.get("text") || searchParams.get("title");
    
    if (!sharedUrl) {
      router.replace(`/${locale}`);
      return;
    }

    // Attempt to extract URL from text (some apps send "Check this out: https://...")
    const urlMatch = sharedUrl.match(/https?:\/\/[^\s]+/);
    const finalUrl = urlMatch ? urlMatch[0] : sharedUrl;

    const detectedPlatform = getPlatformFromUrl(finalUrl);
    
    if (detectedPlatform) {
      const targetRoute = getLocalizedRoute(detectedPlatform, locale);
      if (targetRoute) {
        // Redirect to the platform page with the URL pre-filled
        router.replace(`${targetRoute}?url=${encodeURIComponent(finalUrl)}&autodownload=true`);
        return;
      }
    }

    // Fallback to home if no platform detected
    router.replace(`/${locale}?url=${encodeURIComponent(finalUrl)}`);
  }, [searchParams, locale, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
           <div className="absolute -inset-4 bg-pink-500/20 blur-2xl rounded-full animate-pulse" />
           <Loader2 className="h-12 w-12 animate-spin text-pink-500 relative z-10" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">Initializing Download</h1>
          <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px] hidden sm:block">Processing your shared content...</p>
        </div>
      </div>
    </div>
  );
}

export default function ShareTargetPage(props: { params: Promise<{ locale: string }> }) {
  return (
    <React.Suspense fallback={null}>
      <ShareTargetContent params={props.params} />
    </React.Suspense>
  );
}
