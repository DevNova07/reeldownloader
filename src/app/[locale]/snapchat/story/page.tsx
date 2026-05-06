import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import SnapchatPageTemplate from "@/components/templates/SnapchatPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Snapchat Story Downloader - Save Snapchat Stories",
    description: "Download and save Snapchat stories in high resolution. Fast and anonymous story saver.",
    alternates: getSeoAlternates("snapchat/story", locale),
  };
}

export default async function SnapchatStoryPage(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="story"
      content={{ 
        ...platforms?.snapchat, 
        title: "Snapchat Story Downloader", 
        subtitle: "Save Snapchat Stories Online Free" 
      }} 
    />
  )
}
