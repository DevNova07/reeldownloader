"use client"

import React, { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
  className?: string;
}

export function AdUnit({ slot, format = 'auto', responsive = true, className = '' }: AdUnitProps) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    // Only push ads if the AdSense ID is configured and we are in the browser
    if (adClientId && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [adClientId]);

  // If no AdSense ID is set in .env, we don't render anything (keeps UI clean before approval)
  if (!adClientId) {
    return null;
  }

  return (
    <div className={`w-full overflow-hidden flex justify-center my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
