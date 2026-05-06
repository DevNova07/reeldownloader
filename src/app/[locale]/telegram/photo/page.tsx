import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import TelegramPageTemplate from "@/components/templates/TelegramPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Telegram Photo Downloader - Save Images Online",
    description: "Save high-resolution photos and images from Telegram channels and groups directly to your device.",
    alternates: getSeoAlternates("telegram/photo", locale),
  };
}

export default async function TelegramPhotoPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      telegram: platforms?.telegram
    }
  };

  return (
    <TelegramPageTemplate 
      locale={locale} 
      dict={dict} 
      activeTab="photo"
      content={{ 
        ...platforms?.telegram, 
        title: "Telegram Photo Downloader", 
        subtitle: "Save high-quality photos from Telegram groups and channels." 
      }} 
    />
  )
}
