"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
});

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start progress on mount if we're technically in a loading state (though App Router handles this differently)
    // For manual triggers, we can't easily intercept all clicks, but we can complete on mount
    const handleStop = () => {
      NProgress.done();
    };

    handleStop();
    
    // We can't easily intercept the *start* in App Router without custom Link components, 
    // but completing it on route change provides a good "finished" feedback.
  }, [pathname, searchParams]);

  return null;
}
