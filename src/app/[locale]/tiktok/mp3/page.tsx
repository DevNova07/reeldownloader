import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import TiktokPageTemplate from "@/components/templates/TiktokPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const tiktok = dict.platforms.tiktok;
  return {
    title: "TikTok MP3 Downloader - Extract High-Quality Audio",
    description: "Convert TikTok videos to MP3 audio files in high bitrate. Safe, fast, and free TikTok audio extractor.",
    alternates: getSeoAlternates("tiktok/mp3", locale),
  };
}

export default async function TikTokMP3Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      tiktok: platforms?.tiktok
    }
  };

  return (
    <TiktokPageTemplate 
      locale={locale} 
      dict={dict} 
      activeTab="music"
      content={{ 
        ...platforms?.tiktok, 
        title: "TikTok MP3 Downloader", 
        subtitle: "Download TikTok Audio & MP3 Fast" 
      }} 
    />
  )
}
