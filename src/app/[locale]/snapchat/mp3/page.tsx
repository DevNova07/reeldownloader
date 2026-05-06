import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import SnapchatPageTemplate from "@/components/templates/SnapchatPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Snapchat MP3 Downloader - Convert Video to Audio",
    description: "Extract high-quality MP3 audio from Snapchat videos. Free and fast Snapchat audio downloader.",
    alternates: getSeoAlternates("snapchat/mp3", locale),
  };
}

export default async function SnapchatMP3Page(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="music"
      content={{ 
        ...platforms?.snapchat, 
        title: "Snapchat MP3 Downloader", 
        subtitle: "Download Snapchat Audio & MP3 Fast" 
      }} 
    />
  )
}
