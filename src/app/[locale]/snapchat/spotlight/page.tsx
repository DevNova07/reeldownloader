import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import SnapchatPageTemplate from "@/components/templates/SnapchatPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Snapchat Spotlight Downloader - Save Spotlight Videos",
    description: "Download Snapchat Spotlight videos in HD quality. Fast, free, and no watermark.",
    alternates: getSeoAlternates("snapchat/spotlight", locale),
  };
}

export default async function SnapchatSpotlightPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      snapchat: platforms?.snapchat
    }
  };

  return (
    <SnapchatPageTemplate 
      locale={locale} 
      dict={dict} 
      activeTab="spotlight"
      content={{ 
        ...platforms?.snapchat, 
        title: "Snapchat Spotlight Downloader", 
        subtitle: "Download Snapchat Spotlight Videos in HD" 
      }} 
    />
  )
}
