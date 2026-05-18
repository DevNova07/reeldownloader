import { Metadata } from "next";

export const SITE_URL = "https://savclip.com";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SavClip - Best Social Media Downloader",
    template: "%s | SavClip"
  },
  description: "Download videos, reels, stories and music from Instagram, TikTok, YouTube, Facebook, Snapchat, Telegram and X.",
  openGraph: {
    siteName: "SavClip",
    type: "website",
    locale: "en",
    images: [
      {
        url: `${SITE_URL}/icon-512x512.png`,
        width: 512,
        height: 512,
        alt: "SavClip Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
