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
    title: "TikTok Photo & Carousel Downloader - Save HD Photos",
    description: "Download TikTok photos and carousels in high resolution. Save TikTok images instantly for free.",
    alternates: getSeoAlternates("tiktok/photo", locale),
  };
}

export default async function TikTokPhotoPage(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="photo"
      content={{ 
        ...platforms?.tiktok, 
        title: "TikTok Photo Downloader", 
        subtitle: "Download TikTok Photos in HD Quality" 
      }} 
    />
  )
}
