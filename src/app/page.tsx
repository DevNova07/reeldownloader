import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import { HomeView } from "./HomeView"

import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const locale = 'en';
  const dict = await getDictionary(locale);
  return {
    title: dict.seo?.title || "SavClip: Free HD Social Media Video Downloader Online",
    description: dict.seo?.description || "Download high-quality HD videos from Instagram, TikTok, YouTube, and more for free. Fast, secure, no watermark video downloader online by SavClip.",
    alternates: getSeoAlternates("", locale),
  }
}

export default async function HomePage() {
  const locale = 'en';
  const fullDict = await getDictionary(locale);
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      instagram: platforms?.instagram
    }
  };

  return <HomeView locale={locale} dict={dict} />
}
