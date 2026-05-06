import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import SnapchatPageTemplate from "@/components/templates/SnapchatPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Snapchat Photo Downloader - Save Snapchat Images",
    description: "Save high-resolution Snapchat photos and images directly to your device. Fast and free.",
    alternates: getSeoAlternates("snapchat/photo", locale),
  };
}

export default async function SnapchatPhotoPage(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="photo"
      content={{ 
        ...platforms?.snapchat, 
        title: "Snapchat Photo Downloader", 
        subtitle: "Save Photos & Gallery Posts" 
      }} 
    />
  )
}
