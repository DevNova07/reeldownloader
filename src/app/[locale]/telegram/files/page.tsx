import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import TelegramPageTemplate from "@/components/templates/TelegramPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Telegram File Downloader - Save Documents & Files",
    description: "Download all types of files and documents from Telegram easily. Fast and secure file downloader.",
    alternates: getSeoAlternates("telegram/files", locale),
  };
}

export default async function TelegramFilesPage(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="files"
      content={{ 
        ...platforms?.telegram, 
        title: "Telegram File Downloader", 
        subtitle: "Download all types of files from Telegram instantly." 
      }} 
    />
  )
}
