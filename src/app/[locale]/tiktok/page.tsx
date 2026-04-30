import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import { TikTokView } from "./TikTokView"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const tiktok = dict.platforms.tiktok;
  return {
    title: tiktok.title,
    description: tiktok.subtitle,
  };
}

export default async function TikTokPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  // Filter dictionary to reduce client-side payload
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      tiktok: platforms?.tiktok
    }
  };

  return <TikTokView locale={locale} dict={dict} />
}
