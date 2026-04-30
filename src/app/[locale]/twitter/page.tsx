import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import { TwitterView } from "./TwitterView"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const twitter = dict.platforms.twitter;
  return {
    title: twitter.title,
    description: twitter.subtitle,
  };
}

export default async function TwitterPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  // Filter dictionary to reduce client-side payload
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      twitter: platforms?.twitter
    }
  };

  return <TwitterView locale={locale} dict={dict} />
}
