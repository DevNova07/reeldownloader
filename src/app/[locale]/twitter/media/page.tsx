import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import TwitterPageTemplate from "@/components/templates/TwitterPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Twitter Media Downloader - Save X Videos & Images",
    description: "Download Twitter videos, GIFs, and photos in HD quality. All-in-one Twitter media extraction tool.",
    alternates: getSeoAlternates("twitter/media", locale),
  };
}

export default async function TwitterMediaPage(props: { params: Promise<{ locale: string }> }) {
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
      activeTab="media"
      content={{ 
        ...platforms?.twitter, 
        title: "Twitter Media Downloader", 
        subtitle: "Download Twitter Media Fast" 
      }} 
    />
  )
}
