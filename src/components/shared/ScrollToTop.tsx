"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // We use requestAnimationFrame to ensure the scroll reset happens after the DOM has been updated
    // and after any browser/Next.js default scroll restoration.
    // behavior: "instant" is used to make it fast as requested by the user.
    const scrollReset = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

    };

    // Run immediately
    scrollReset();
    
    // Also run on next frame as a fallback to ensure it catches any post-render scroll restoration
    const id = requestAnimationFrame(scrollReset);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
