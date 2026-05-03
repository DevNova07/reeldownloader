import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import TiktokPageTemplate from "@/components/templates/TiktokPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const tiktok = dict.platforms.tiktok;
  return {
    title: tiktok.seo?.title || tiktok.title,
    description: tiktok.seo?.desc,
    alternates: getSeoAlternates("tiktok", locale),
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

  return <TiktokPageTemplate locale={locale} dict={dict} content={platforms?.tiktok} />
}
