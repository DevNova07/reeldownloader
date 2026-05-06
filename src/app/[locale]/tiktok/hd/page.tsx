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
    title: "TikTok HD Video Downloader - Save in Ultra HD",
    description: "Download TikTok videos in original high-definition quality. Fast, free, and no watermark.",
    alternates: getSeoAlternates("tiktok/hd", locale),
  };
}

export default async function TikTokHDPage(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="hd"
      content={{ 
        ...platforms?.tiktok, 
        title: "TikTok HD Video Downloader", 
        subtitle: "Download HD TikTok Videos Online" 
      }} 
    />
  )
}
