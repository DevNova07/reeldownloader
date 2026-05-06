import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import TwitterPageTemplate from "@/components/templates/TwitterPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Twitter Photo Downloader - Save X Images",
    description: "Save high-resolution Twitter photos and images directly to your device. Fast and free Twitter image downloader.",
    alternates: getSeoAlternates("twitter/photo", locale),
  };
}

export default async function TwitterPhotoPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      twitter: platforms?.twitter
    }
  };

  return (
    <TwitterPageTemplate 
      locale={locale} 
      dict={dict} 
      activeTab="photo"
      content={{ 
        ...platforms?.twitter, 
        title: "Twitter Photo Downloader", 
        subtitle: "Save Photos & Gallery Posts" 
      }} 
    />
  )
}
