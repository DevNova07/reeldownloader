import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import YoutubePageTemplate from "@/components/templates/YoutubePage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const youtube = dict.platforms.youtube;
  return {
    title: youtube.thumbnail.seo.title,
    description: youtube.thumbnail.seo.desc,
    alternates: getSeoAlternates("youtube/thumbnail", locale),
  };
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      youtube: platforms?.youtube
    }
  };

  return (
    <YoutubePageTemplate 
      locale={locale} 
      dict={dict} 
      content={{ ...platforms?.youtube?.thumbnail, title: "YouTube Thumbnail Download", subtitle: "Download HD Video Thumbnails" }}
      activeTab="thumbnail"
      themeColor="red"
    />
  )
}
