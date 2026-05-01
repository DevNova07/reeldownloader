import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import { HashtagView } from "./HashtagView"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const tag = dict.common.hashtag;
  return {
    title: tag.trending_title,
    alternates: getSeoAlternates("hashtags", locale),
  };
}

export default async function HashtagPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  // Pass only the slice to avoid large serialization payload
  const dict = fullDict?.common?.hashtag || {};
  return <HashtagView locale={locale} dict={dict} />
}
