import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import { YoutubeView } from "./YoutubeView"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const yt = dict.platforms.youtube;
  return {
    title: yt.title,
    description: yt.subtitle,
  };
}

export default async function YoutubePage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  // Filter dictionary to reduce client-side payload
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      youtube: platforms?.youtube
    }
  };

  return <YoutubeView locale={locale} dict={dict} />
}
