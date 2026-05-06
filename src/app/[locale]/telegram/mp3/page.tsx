import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import TelegramPageTemplate from "@/components/templates/TelegramPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Telegram MP3 Downloader - Extract Audio from Telegram",
    description: "Download high-quality MP3 audio from Telegram videos and voice messages. Fast and free audio extraction.",
    alternates: getSeoAlternates("telegram/mp3", locale),
  };
}

export default async function TelegramMP3Page(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="music"
      content={{ 
        ...platforms?.telegram, 
        title: "Telegram MP3 Downloader", 
        subtitle: "Download high-quality audio and MP3 from Telegram videos." 
      }} 
    />
  )
}
